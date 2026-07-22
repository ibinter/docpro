import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  {
    code: 'telco2_fai_haut_debit',
    name: "Accord de service d'accès internet haut débit (FAI)",
    category: 'commercial_financier',
    price: 8000, priceMax: 24000,
    description: "Contrat de fourniture d'accès internet haut débit entre un fournisseur d'accès internet (FAI) et un abonné professionnel, conforme aux exigences de l'ARTCI.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'nom_fai',label:"Nom du FAI",type:'text',required:true},
      {key:'nom_client',label:"Nom du client",type:'text',required:true},
      {key:'debit_garanti',label:"Débit garanti (Mbps)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'duree_contrat',label:"Durée du contrat (mois)",type:'text',required:true},
      {key:'montant_mensuel',label:"Montant mensuel (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ACCÈS INTERNET HAUT DÉBIT</h1><p>Entre le fournisseur d'accès internet <strong>{{nom_fai}}</strong> et le client <strong>{{nom_client}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le présent accord définit les conditions de fourniture d'un accès internet haut débit avec un débit garanti de <strong>{{debit_garanti}} Mbps</strong>.</p><h2>Article 2 – Durée</h2><p>Le contrat prend effet le <strong>{{date_debut}}</strong> pour une durée de <strong>{{duree_contrat}} mois</strong>.</p><h2>Article 3 – Tarification</h2><p>Le montant mensuel est fixé à <strong>{{montant_mensuel}} FCFA</strong>, payable à terme échu.</p><h2>Article 4 – Qualité de service</h2><p>Le FAI s'engage à maintenir une disponibilité minimale de 99,5% conformément aux normes ARTCI.</p><p>Fait à Abidjan, le {{date_debut}}</p></div>`
  },
  {
    code: 'telco2_fibre_optique_ftto',
    name: "Accord de service de fibre optique entreprise (FTTO)",
    category: 'commercial_financier',
    price: 12000, priceMax: 36000,
    description: "Contrat de déploiement et d'exploitation d'une liaison fibre optique dédiée jusqu'aux locaux de l'entreprise (Fiber To The Office), avec garanties de performance.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'operateur',label:"Opérateur télécom",type:'text',required:true},
      {key:'entreprise_cliente',label:"Entreprise cliente",type:'text',required:true},
      {key:'adresse_installation',label:"Adresse d'installation",type:'text',required:true},
      {key:'capacite_bande',label:"Capacité de bande passante (Gbps)",type:'text',required:true},
      {key:'date_mise_service',label:"Date de mise en service",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FIBRE OPTIQUE ENTREPRISE (FTTO)</h1><p>Entre l'opérateur <strong>{{operateur}}</strong> et l'entreprise cliente <strong>{{entreprise_cliente}}</strong>.</p><h2>Article 1 – Objet</h2><p>Déploiement d'une liaison fibre optique dédiée à l'adresse : <strong>{{adresse_installation}}</strong>.</p><h2>Article 2 – Capacité</h2><p>La bande passante garantie est de <strong>{{capacite_bande}} Gbps</strong> symétrique.</p><h2>Article 3 – Mise en service</h2><p>La mise en service est prévue au plus tard le <strong>{{date_mise_service}}</strong>.</p><h2>Article 4 – SLA</h2><p>Le temps de rétablissement garanti (MTTR) est de 4 heures maximum en cas d'incident.</p></div>`
  },
  {
    code: 'telco2_vpn_mpls',
    name: "Accord de service de réseau privé virtuel (VPN MPLS)",
    category: 'commercial_financier',
    price: 10000, priceMax: 30000,
    description: "Contrat de fourniture d'un réseau privé virtuel MPLS reliant les sites d'une entreprise, garantissant confidentialité, qualité de service et performance.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'fournisseur_vpn',label:"Fournisseur VPN",type:'text',required:true},
      {key:'client_vpn',label:"Client VPN",type:'text',required:true},
      {key:'nombre_sites',label:"Nombre de sites à interconnecter",type:'text',required:true},
      {key:'bande_passante_cir',label:"Bande passante CIR (Mbps)",type:'text',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RÉSEAU PRIVÉ VIRTUEL (VPN MPLS)</h1><p>Entre le fournisseur <strong>{{fournisseur_vpn}}</strong> et le client <strong>{{client_vpn}}</strong>.</p><h2>Article 1 – Objet</h2><p>Fourniture d'un VPN MPLS interconnectant <strong>{{nombre_sites}} sites</strong> avec une bande passante CIR de <strong>{{bande_passante_cir}} Mbps</strong>.</p><h2>Article 2 – Sécurité</h2><p>Le trafic est segmenté et isolé des autres clients. Aucune donnée ne transite par l'internet public.</p><h2>Article 3 – QoS</h2><p>Les classes de service (voix, données critiques, best-effort) sont configurées selon les besoins du client.</p><p>Fait à Abidjan, le {{date_contrat}}</p></div>`
  },
  {
    code: 'telco2_datacenter_colocation',
    name: "Accord de service de datacenter (colocation)",
    category: 'commercial_financier',
    price: 15000, priceMax: 45000,
    description: "Contrat d'hébergement d'équipements informatiques dans un datacenter tiers (colocation), incluant baies, alimentation redondante et connectivité.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      {key:'datacenter_nom',label:"Nom du datacenter",type:'text',required:true},
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'surface_baies',label:"Nombre de baies / U alloués",type:'text',required:true},
      {key:'puissance_electrique',label:"Puissance électrique allouée (kW)",type:'text',required:true},
      {key:'date_debut_bail',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DATACENTER (COLOCATION)</h1><p>Entre le datacenter <strong>{{datacenter_nom}}</strong> et le client <strong>{{client_nom}}</strong>.</p><h2>Article 1 – Objet</h2><p>Mise à disposition de <strong>{{surface_baies}}</strong> avec une puissance électrique de <strong>{{puissance_electrique}} kW</strong>.</p><h2>Article 2 – Infrastructure</h2><p>Le datacenter garantit une alimentation redondante (N+1), une climatisation contrôlée et une sécurité physique 24h/24.</p><h2>Article 3 – Accès</h2><p>L'accès aux équipements est possible sur rendez-vous avec accréditation préalable.</p><p>Fait à Abidjan, le {{date_debut_bail}}</p></div>`
  },
  {
    code: 'telco2_cloud_iaas',
    name: "Accord de service de cloud computing (IaaS)",
    category: 'commercial_financier',
    price: 9000, priceMax: 27000,
    description: "Contrat de fourniture d'infrastructure en tant que service (IaaS) : serveurs virtuels, stockage et réseau à la demande, avec engagements de disponibilité.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 74,
    fieldsJson: F([
      {key:'fournisseur_cloud',label:"Fournisseur Cloud",type:'text',required:true},
      {key:'client_cloud',label:"Client",type:'text',required:true},
      {key:'vcpu_alloues',label:"vCPU alloués",type:'text',required:true},
      {key:'stockage_go',label:"Stockage alloué (Go)",type:'text',required:true},
      {key:'date_activation',label:"Date d'activation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CLOUD COMPUTING (IaaS)</h1><p>Entre le fournisseur cloud <strong>{{fournisseur_cloud}}</strong> et le client <strong>{{client_cloud}}</strong>.</p><h2>Article 1 – Ressources allouées</h2><p>Nombre de vCPU : <strong>{{vcpu_alloues}}</strong> — Stockage : <strong>{{stockage_go}} Go</strong>.</p><h2>Article 2 – Disponibilité</h2><p>Disponibilité garantie : 99,9% par mois, hors maintenance planifiée notifiée 48h à l'avance.</p><h2>Article 3 – Facturation</h2><p>La facturation est mensuelle, basée sur la consommation réelle des ressources.</p><p>Activé le {{date_activation}}</p></div>`
  },
  {
    code: 'telco2_cloud_saas',
    name: "Accord de service de cloud computing (SaaS)",
    category: 'commercial_financier',
    price: 7000, priceMax: 21000,
    description: "Contrat de fourniture de logiciel en tant que service (SaaS) accessibles via internet, incluant mises à jour, support et gestion des données utilisateurs.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 78,
    fieldsJson: F([
      {key:'editeur_saas',label:"Éditeur SaaS",type:'text',required:true},
      {key:'client_saas',label:"Client",type:'text',required:true},
      {key:'nom_logiciel',label:"Nom du logiciel",type:'text',required:true},
      {key:'nombre_licences',label:"Nombre de licences",type:'text',required:true},
      {key:'date_souscription',label:"Date de souscription",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CLOUD COMPUTING (SaaS)</h1><p>Entre l'éditeur <strong>{{editeur_saas}}</strong> et le client <strong>{{client_saas}}</strong>.</p><h2>Article 1 – Logiciel concerné</h2><p>Accès au logiciel <strong>{{nom_logiciel}}</strong> pour <strong>{{nombre_licences}} utilisateurs</strong>.</p><h2>Article 2 – Mises à jour</h2><p>L'éditeur s'engage à fournir les mises à jour correctives et évolutives sans surcoût.</p><h2>Article 3 – Données</h2><p>Les données du client restent sa propriété exclusive et peuvent être exportées à tout moment.</p><p>Souscrit le {{date_souscription}}</p></div>`
  },
  {
    code: 'telco2_cloud_paas',
    name: "Accord de service de cloud computing (PaaS)",
    category: 'commercial_financier',
    price: 8500, priceMax: 25000,
    description: "Contrat de plateforme en tant que service (PaaS) pour le développement et déploiement d'applications, avec environnements d'exécution et outils intégrés.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'fournisseur_paas',label:"Fournisseur PaaS",type:'text',required:true},
      {key:'client_paas',label:"Client développeur",type:'text',required:true},
      {key:'environnement',label:"Environnement d'exécution (ex: Node.js, Java)",type:'text',required:true},
      {key:'quota_deploiements',label:"Quota de déploiements/mois",type:'text',required:true},
      {key:'date_ouverture',label:"Date d'ouverture du compte",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CLOUD COMPUTING (PaaS)</h1><p>Entre le fournisseur <strong>{{fournisseur_paas}}</strong> et le client <strong>{{client_paas}}</strong>.</p><h2>Article 1 – Plateforme</h2><p>Accès à un environnement <strong>{{environnement}}</strong> avec un quota de <strong>{{quota_deploiements}} déploiements/mois</strong>.</p><h2>Article 2 – Outils</h2><p>La plateforme inclut des outils de CI/CD, monitoring applicatif et gestion des logs.</p><h2>Article 3 – Scalabilité</h2><p>La mise à l'échelle automatique est activée par défaut selon les seuils de charge définis.</p><p>Compte ouvert le {{date_ouverture}}</p></div>`
  },
  {
    code: 'telco2_iplc_international',
    name: "Accord de service de connectivité internationale (IPLC)",
    category: 'commercial_financier',
    price: 18000, priceMax: 54000,
    description: "Contrat de circuit privé de données international (IPLC) reliant deux points géographiques distincts avec une bande passante garantie et une latence maîtrisée.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 55,
    fieldsJson: F([
      {key:'operateur_a',label:"Opérateur côté A",type:'text',required:true},
      {key:'operateur_b',label:"Opérateur côté B",type:'text',required:true},
      {key:'point_a',label:"Point de présence A (ville/pays)",type:'text',required:true},
      {key:'point_b',label:"Point de présence B (ville/pays)",type:'text',required:true},
      {key:'capacite_mbps',label:"Capacité (Mbps)",type:'text',required:true},
      {key:'date_activation',label:"Date d'activation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CONNECTIVITÉ INTERNATIONALE (IPLC)</h1><p>Entre l'opérateur <strong>{{operateur_a}}</strong> et l'opérateur <strong>{{operateur_b}}</strong>.</p><h2>Article 1 – Circuit</h2><p>Circuit IPLC entre <strong>{{point_a}}</strong> et <strong>{{point_b}}</strong> d'une capacité de <strong>{{capacite_mbps}} Mbps</strong>.</p><h2>Article 2 – Latence</h2><p>La latence aller-retour garantie entre les deux points est inférieure à 150 ms.</p><h2>Article 3 – Disponibilité</h2><p>Disponibilité garantie de 99,7% par mois calendaire.</p><p>Activé le {{date_activation}}</p></div>`
  },
  {
    code: 'telco2_vsat_satellite',
    name: "Accord de service de capacité satellite (VSAT)",
    category: 'commercial_financier',
    price: 14000, priceMax: 42000,
    description: "Contrat de service VSAT pour la fourniture de connectivité par satellite dans les zones non couvertes par le réseau terrestre, avec équipements et bande passante dédiés.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'fournisseur_vsat',label:"Fournisseur VSAT",type:'text',required:true},
      {key:'client_vsat',label:"Client",type:'text',required:true},
      {key:'localisation_site',label:"Localisation du site distant",type:'text',required:true},
      {key:'bande_passante_dl',label:"Bande passante descendante (Mbps)",type:'text',required:true},
      {key:'date_installation',label:"Date d'installation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CAPACITÉ SATELLITE (VSAT)</h1><p>Entre le fournisseur <strong>{{fournisseur_vsat}}</strong> et le client <strong>{{client_vsat}}</strong>.</p><h2>Article 1 – Site desservi</h2><p>Localisation : <strong>{{localisation_site}}</strong> — Bande passante descendante : <strong>{{bande_passante_dl}} Mbps</strong>.</p><h2>Article 2 – Équipements</h2><p>Le fournisseur fournit et installe l'antenne VSAT, le modem et les câblages nécessaires.</p><h2>Article 3 – Disponibilité</h2><p>La disponibilité garantie est de 99% hors événements météorologiques extrêmes.</p><p>Installation prévue le {{date_installation}}</p></div>`
  },
  {
    code: 'telco2_lte_prive',
    name: "Accord de service de réseau mobile privé (LTE privé)",
    category: 'commercial_financier',
    price: 20000, priceMax: 60000,
    description: "Contrat de déploiement et d'exploitation d'un réseau LTE privé pour une entreprise ou une zone industrielle, garantissant couverture, sécurité et performances.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 52,
    fieldsJson: F([
      {key:'integrateur_lte',label:"Intégrateur réseau LTE",type:'text',required:true},
      {key:'client_industriel',label:"Client / Entreprise",type:'text',required:true},
      {key:'superficie_zone',label:"Superficie de la zone couverte (ha)",type:'text',required:true},
      {key:'nombre_equipements',label:"Nombre d'équipements connectés",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison du réseau",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RÉSEAU MOBILE PRIVÉ (LTE PRIVÉ)</h1><p>Entre l'intégrateur <strong>{{integrateur_lte}}</strong> et le client <strong>{{client_industriel}}</strong>.</p><h2>Article 1 – Périmètre</h2><p>Zone couverte : <strong>{{superficie_zone}} hectares</strong> pour <strong>{{nombre_equipements}} équipements connectés</strong>.</p><h2>Article 2 – Sécurité</h2><p>Le réseau LTE privé est isolé de tout réseau public. Authentification des équipements par SIM dédiées.</p><h2>Article 3 – Maintenance</h2><p>La maintenance préventive et corrective est assurée 24h/24 et 7j/7.</p><p>Livraison prévue le {{date_livraison}}</p></div>`
  },
  {
    code: 'telco2_liaison_specialisee',
    name: "Accord de service de transmission données (liaison spécialisée)",
    category: 'commercial_financier',
    price: 9000, priceMax: 27000,
    description: "Contrat de fourniture d'une liaison de données spécialisée point à point, garantissant une bande passante dédiée et une haute disponibilité pour les entreprises.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'operateur_ls',label:"Opérateur",type:'text',required:true},
      {key:'client_ls',label:"Client",type:'text',required:true},
      {key:'site_depart',label:"Site de départ",type:'text',required:true},
      {key:'site_arrivee',label:"Site d'arrivée",type:'text',required:true},
      {key:'date_mise_en_service',label:"Date de mise en service",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TRANSMISSION DONNÉES (LIAISON SPÉCIALISÉE)</h1><p>Entre l'opérateur <strong>{{operateur_ls}}</strong> et le client <strong>{{client_ls}}</strong>.</p><h2>Article 1 – Liaison</h2><p>Liaison spécialisée entre <strong>{{site_depart}}</strong> et <strong>{{site_arrivee}}</strong>.</p><h2>Article 2 – Débit</h2><p>Bande passante garantie et symétrique, avec engagement de niveau de service (SLA) inclus.</p><h2>Article 3 – Supervision</h2><p>La liaison est supervisée en temps réel par le NOC de l'opérateur.</p><p>Mise en service le {{date_mise_en_service}}</p></div>`
  },
  {
    code: 'telco2_voip_toip',
    name: "Accord de service de voix sur IP (VoIP/ToIP)",
    category: 'commercial_financier',
    price: 6000, priceMax: 18000,
    description: "Contrat de fourniture de services de téléphonie sur IP (VoIP/ToIP), incluant trunks SIP, numéros géographiques et garanties de qualité vocale.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'fournisseur_voip',label:"Fournisseur VoIP",type:'text',required:true},
      {key:'client_voip',label:"Client",type:'text',required:true},
      {key:'nombre_canaux',label:"Nombre de canaux simultanés",type:'text',required:true},
      {key:'numeros_geo',label:"Numéros géographiques attribués",type:'text',required:true},
      {key:'date_activation',label:"Date d'activation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE VOIX SUR IP (VoIP/ToIP)</h1><p>Entre le fournisseur <strong>{{fournisseur_voip}}</strong> et le client <strong>{{client_voip}}</strong>.</p><h2>Article 1 – Service</h2><p>Fourniture de <strong>{{nombre_canaux}} canaux simultanés</strong> avec numéros géographiques : <strong>{{numeros_geo}}</strong>.</p><h2>Article 2 – Qualité</h2><p>Le MOS (Mean Opinion Score) garanti est supérieur à 4,0 en conditions normales.</p><h2>Article 3 – Portabilité</h2><p>La portabilité des numéros existants est prise en charge par le fournisseur.</p><p>Activé le {{date_activation}}</p></div>`
  },
  {
    code: 'telco2_call_center',
    name: "Accord de service de centre d'appels (call center)",
    category: 'commercial_financier',
    price: 11000, priceMax: 33000,
    description: "Contrat de prestation de service de centre d'appels externalisé, définissant les volumes d'appels, les niveaux de service (SLA) et les indicateurs de performance.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 67,
    fieldsJson: F([
      {key:'prestataire_cc',label:"Prestataire call center",type:'text',required:true},
      {key:'donneur_ordre',label:"Donneur d'ordre",type:'text',required:true},
      {key:'volume_appels_jour',label:"Volume d'appels par jour",type:'text',required:true},
      {key:'taux_reponse_cible',label:"Taux de réponse cible (%)",type:'text',required:true},
      {key:'date_demarrage',label:"Date de démarrage",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CENTRE D'APPELS (CALL CENTER)</h1><p>Entre le prestataire <strong>{{prestataire_cc}}</strong> et le donneur d'ordre <strong>{{donneur_ordre}}</strong>.</p><h2>Article 1 – Volume</h2><p>Volume journalier cible : <strong>{{volume_appels_jour}} appels</strong>.</p><h2>Article 2 – SLA</h2><p>Taux de réponse cible : <strong>{{taux_reponse_cible}}%</strong> en moins de 20 secondes.</p><h2>Article 3 – Reporting</h2><p>Un rapport d'activité hebdomadaire est transmis au donneur d'ordre chaque lundi avant 10h.</p><p>Démarrage le {{date_demarrage}}</p></div>`
  },
  {
    code: 'telco2_ussd_sms_premium',
    name: "Accord de service de numéro court (USSD, SMS premium)",
    category: 'commercial_financier',
    price: 7500, priceMax: 22000,
    description: "Contrat d'attribution et d'exploitation d'un numéro court USSD ou SMS premium pour des services à valeur ajoutée, conformément à la réglementation de l'ARTCI.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 61,
    fieldsJson: F([
      {key:'operateur_svam',label:"Opérateur télécom",type:'text',required:true},
      {key:'fournisseur_svam',label:"Fournisseur de services à valeur ajoutée",type:'text',required:true},
      {key:'numero_court',label:"Numéro court attribué",type:'text',required:true},
      {key:'type_service',label:"Type de service (USSD/SMS premium)",type:'text',required:true},
      {key:'date_lancement',label:"Date de lancement",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE NUMÉRO COURT (USSD / SMS PREMIUM)</h1><p>Entre l'opérateur <strong>{{operateur_svam}}</strong> et le fournisseur de services <strong>{{fournisseur_svam}}</strong>.</p><h2>Article 1 – Numéro attribué</h2><p>Le numéro court <strong>{{numero_court}}</strong> est attribué pour un service de type <strong>{{type_service}}</strong>.</p><h2>Article 2 – Revenus</h2><p>Le partage des revenus est défini selon la grille tarifaire annexée au présent accord.</p><h2>Article 3 – Conformité</h2><p>Le service doit être conforme aux directives de l'ARTCI sur les services à valeur ajoutée.</p><p>Lancement prévu le {{date_lancement}}</p></div>`
  },
  {
    code: 'telco2_roaming_international',
    name: "Accord de service d'itinérance internationale (roaming)",
    category: 'commercial_financier',
    price: 16000, priceMax: 48000,
    description: "Accord bilatéral d'itinérance (roaming) entre deux opérateurs mobiles permettant à leurs abonnés respectifs d'utiliser les services dans les réseaux partenaires.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 57,
    fieldsJson: F([
      {key:'operateur_hplmn',label:"Opérateur réseau d'origine (HPLMN)",type:'text',required:true},
      {key:'operateur_vplmn',label:"Opérateur réseau visité (VPLMN)",type:'text',required:true},
      {key:'pays_vplmn',label:"Pays du réseau visité",type:'text',required:true},
      {key:'services_actives',label:"Services activés (voix/data/SMS)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ITINÉRANCE INTERNATIONALE (ROAMING)</h1><p>Entre l'opérateur HPLMN <strong>{{operateur_hplmn}}</strong> et l'opérateur VPLMN <strong>{{operateur_vplmn}}</strong> ({{pays_vplmn}}).</p><h2>Article 1 – Services couverts</h2><p>Services activés en itinérance : <strong>{{services_actives}}</strong>.</p><h2>Article 2 – Tarification</h2><p>Les tarifs inter-opérateurs sont définis par l'accord de règlement financier annexé, libellés en euros (clearing GSMA).</p><h2>Article 3 – Tests techniques</h2><p>Des tests de qualification réseau sont réalisés avant l'ouverture commerciale du roaming.</p><p>Accord signé le {{date_accord}}</p></div>`
  },
  {
    code: 'telco2_mutualisation_pylones',
    name: "Accord de service de partage d'infrastructure (mutualisation pylônes)",
    category: 'commercial_financier',
    price: 13000, priceMax: 39000,
    description: "Accord de mutualisation de pylônes et d'infrastructure passive entre opérateurs télécom, conformément aux directives de l'ARTCI sur le partage d'infrastructures.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 54,
    fieldsJson: F([
      {key:'operateur_proprietaire',label:"Opérateur propriétaire de l'infrastructure",type:'text',required:true},
      {key:'operateur_locataire',label:"Opérateur locataire",type:'text',required:true},
      {key:'nombre_pylones',label:"Nombre de pylônes partagés",type:'text',required:true},
      {key:'loyer_mensuel_pylone',label:"Loyer mensuel par pylône (FCFA)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTAGE D'INFRASTRUCTURE PASSIVE (MUTUALISATION PYLÔNES)</h1><p>Entre l'opérateur propriétaire <strong>{{operateur_proprietaire}}</strong> et l'opérateur locataire <strong>{{operateur_locataire}}</strong>.</p><h2>Article 1 – Périmètre</h2><p>Partage de <strong>{{nombre_pylones}} pylônes</strong> au loyer de <strong>{{loyer_mensuel_pylone}} FCFA/pylône/mois</strong>.</p><h2>Article 2 – Responsabilités</h2><p>La maintenance de l'infrastructure passive reste à la charge du propriétaire. Chaque opérateur gère ses équipements actifs.</p><h2>Article 3 – Conformité ARTCI</h2><p>L'accord est notifié à l'ARTCI conformément à la réglementation en vigueur.</p><p>Signé le {{date_accord}}</p></div>`
  },
  {
    code: 'telco2_deploiement_4g5g',
    name: "Accord de service de déploiement réseau 4G/5G",
    category: 'commercial_financier',
    price: 20000, priceMax: 60000,
    description: "Contrat de déploiement et d'intégration d'un réseau mobile 4G ou 5G, incluant la fourniture d'équipements radio, le génie civil et la mise en service des sites.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 66,
    fieldsJson: F([
      {key:'constructeur_reseau',label:"Constructeur réseau (vendeur)",type:'text',required:true},
      {key:'operateur_mobile',label:"Opérateur mobile",type:'text',required:true},
      {key:'nombre_sites',label:"Nombre de sites à déployer",type:'text',required:true},
      {key:'technologie',label:"Technologie (4G/5G/NSA/SA)",type:'text',required:true},
      {key:'date_debut_deploiement',label:"Date de début déploiement",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DÉPLOIEMENT RÉSEAU 4G/5G</h1><p>Entre le constructeur réseau <strong>{{constructeur_reseau}}</strong> et l'opérateur <strong>{{operateur_mobile}}</strong>.</p><h2>Article 1 – Périmètre</h2><p>Déploiement de <strong>{{nombre_sites}} sites</strong> en technologie <strong>{{technologie}}</strong>.</p><h2>Article 2 – Planning</h2><p>Les travaux débutent le <strong>{{date_debut_deploiement}}</strong> selon le plan de déploiement annexé.</p><h2>Article 3 – Acceptance</h2><p>Chaque site fait l'objet d'un test d'acceptance (ATP) avant mise en service commerciale.</p></div>`
  },
  {
    code: 'telco2_concession_frequences',
    name: "Accord de concession fréquences radioélectriques (ARTCI)",
    category: 'commercial_financier',
    price: 18000, priceMax: 54000,
    description: "Convention de concession de fréquences radioélectriques octroyées par l'ARTCI à un opérateur télécom, définissant les bandes assignées, les redevances et les obligations.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 50,
    fieldsJson: F([
      {key:'operateur_beneficiaire',label:"Opérateur bénéficiaire",type:'text',required:true},
      {key:'bandes_frequences',label:"Bandes de fréquences attribuées (MHz)",type:'text',required:true},
      {key:'zone_couverture',label:"Zone de couverture",type:'text',required:true},
      {key:'redevance_annuelle',label:"Redevance annuelle (FCFA)",type:'text',required:true},
      {key:'date_attribution',label:"Date d'attribution",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONVENTION DE CONCESSION DE FRÉQUENCES RADIOÉLECTRIQUES</h1><p>L'ARTCI attribue à l'opérateur <strong>{{operateur_beneficiaire}}</strong> les fréquences suivantes.</p><h2>Article 1 – Fréquences attribuées</h2><p>Bandes assignées : <strong>{{bandes_frequences}} MHz</strong> — Zone : <strong>{{zone_couverture}}</strong>.</p><h2>Article 2 – Redevance</h2><p>Redevance annuelle : <strong>{{redevance_annuelle}} FCFA</strong>, payable avant le 31 janvier de chaque année.</p><h2>Article 3 – Obligations</h2><p>L'opérateur s'engage à respecter les conditions techniques d'utilisation du spectre et à couvrir les zones prioritaires définies par l'ARTCI.</p><p>Attribution le {{date_attribution}}</p></div>`
  },
  {
    code: 'telco2_maintenance_reseau',
    name: "Accord de service de maintenance réseau télécom",
    category: 'commercial_financier',
    price: 8000, priceMax: 24000,
    description: "Contrat de maintenance préventive et corrective des équipements de réseau télécom, incluant les engagements de temps d'intervention et de rétablissement.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 64,
    fieldsJson: F([
      {key:'prestataire_maint',label:"Prestataire de maintenance",type:'text',required:true},
      {key:'client_maint',label:"Client / Opérateur",type:'text',required:true},
      {key:'equipements_couverts',label:"Équipements couverts",type:'textarea',required:true},
      {key:'delai_intervention',label:"Délai d'intervention garanti (heures)",type:'text',required:true},
      {key:'date_debut_contrat',label:"Date de début du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MAINTENANCE RÉSEAU TÉLÉCOM</h1><p>Entre le prestataire <strong>{{prestataire_maint}}</strong> et le client <strong>{{client_maint}}</strong>.</p><h2>Article 1 – Périmètre</h2><p>Équipements couverts : <strong>{{equipements_couverts}}</strong>.</p><h2>Article 2 – Délais</h2><p>Délai d'intervention garanti : <strong>{{delai_intervention}} heures</strong> à compter de la déclaration d'incident.</p><h2>Article 3 – Maintenance préventive</h2><p>Des visites préventives trimestrielles sont planifiées en accord avec le client.</p><p>Contrat débutant le {{date_debut_contrat}}</p></div>`
  },
  {
    code: 'telco2_partenariat_mvno',
    name: "Accord de partenariat opérateur-MVNO",
    category: 'commercial_financier',
    price: 17000, priceMax: 51000,
    description: "Accord cadre entre un opérateur de réseau mobile (MNO) et un opérateur virtuel (MVNO), définissant les conditions d'accès au réseau, le partage des revenus et les droits et obligations des parties.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 53,
    fieldsJson: F([
      {key:'mno_nom',label:"Nom de l'opérateur MNO",type:'text',required:true},
      {key:'mvno_nom',label:"Nom de l'opérateur MVNO",type:'text',required:true},
      {key:'capacite_allouee',label:"Capacité réseau allouée au MVNO (%)",type:'text',required:true},
      {key:'partage_revenus',label:"Taux de partage des revenus (%)",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT OPÉRATEUR MNO – MVNO</h1><p>Entre le MNO <strong>{{mno_nom}}</strong> et le MVNO <strong>{{mvno_nom}}</strong>.</p><h2>Article 1 – Accès réseau</h2><p>Le MNO accorde au MVNO l'accès à <strong>{{capacite_allouee}}%</strong> de sa capacité réseau.</p><h2>Article 2 – Revenus</h2><p>Partage des revenus : <strong>{{partage_revenus}}%</strong> revient au MVNO sur les services commercialisés.</p><h2>Article 3 – Marque</h2><p>Le MVNO commercialise les services sous sa propre marque, de façon indépendante.</p><p>Signé le {{date_signature}}</p></div>`
  },
  {
    code: 'telco2_rapport_qos_kpi',
    name: "Rapport de performance réseau (QoS/KPI)",
    category: 'commercial_financier',
    price: 5000, priceMax: 15000,
    description: "Modèle de rapport périodique de performance réseau télécom, présentant les indicateurs clés (KPI) de qualité de service (QoS) conformément aux exigences réglementaires de l'ARTCI.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 69,
    fieldsJson: F([
      {key:'operateur_rapporteur',label:"Opérateur rapporteur",type:'text',required:true},
      {key:'periode_rapport',label:"Période couverte (ex: T1 2025)",type:'text',required:true},
      {key:'taux_disponibilite',label:"Taux de disponibilité réseau (%)",type:'text',required:true},
      {key:'taux_appels_reussis',label:"Taux d'appels réussis (%)",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE RÉSEAU (QoS / KPI)</h1><p>Opérateur : <strong>{{operateur_rapporteur}}</strong> — Période : <strong>{{periode_rapport}}</strong></p><h2>1. Disponibilité réseau</h2><p>Taux de disponibilité : <strong>{{taux_disponibilite}}%</strong></p><h2>2. Taux d'appels réussis</h2><p>Taux d'appels réussis (CSSR) : <strong>{{taux_appels_reussis}}%</strong></p><h2>3. Analyse et actions correctives</h2><p>Les incidents majeurs survenus durant la période sont détaillés en annexe avec les actions correctives engagées.</p><p>Rapport établi le {{date_rapport}}</p></div>`
  },
  {
    code: 'telco2_plan_deploiement_infra',
    name: "Plan de déploiement infrastructure télécom",
    category: 'commercial_financier',
    price: 10000, priceMax: 30000,
    description: "Document de planification du déploiement d'une infrastructure télécom, incluant le calendrier, les ressources, les jalons et les critères d'acceptance.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'chef_projet',label:"Chef de projet",type:'text',required:true},
      {key:'projet_nom',label:"Nom du projet télécom",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'date_fin_prevue',label:"Date de fin prévisionnelle",type:'date',required:true},
      {key:'budget_total',label:"Budget total (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉPLOIEMENT INFRASTRUCTURE TÉLÉCOM</h1><p>Projet : <strong>{{projet_nom}}</strong> — Chef de projet : <strong>{{chef_projet}}</strong></p><h2>1. Calendrier</h2><p>Début : <strong>{{date_debut}}</strong> — Fin prévisionnelle : <strong>{{date_fin_prevue}}</strong></p><h2>2. Budget</h2><p>Budget total alloué : <strong>{{budget_total}} FCFA</strong></p><h2>3. Jalons clés</h2><p>Les jalons, livrables et critères d'acceptance sont définis dans le planning détaillé annexé au présent document.</p></div>`
  },
  {
    code: 'telco2_cybersecurite_soc',
    name: "Accord de service de cybersécurité réseau (SOC)",
    category: 'commercial_financier',
    price: 15000, priceMax: 45000,
    description: "Contrat de service de centre opérationnel de sécurité (SOC) pour la surveillance, la détection et la réponse aux incidents de cybersécurité du réseau télécom.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 63,
    fieldsJson: F([
      {key:'prestataire_soc',label:"Prestataire SOC",type:'text',required:true},
      {key:'client_soc',label:"Client",type:'text',required:true},
      {key:'perimetre_surveillance',label:"Périmètre de surveillance",type:'textarea',required:true},
      {key:'delai_notification',label:"Délai de notification des incidents (minutes)",type:'text',required:true},
      {key:'date_debut_service',label:"Date de début du service",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CYBERSÉCURITÉ RÉSEAU (SOC)</h1><p>Entre le prestataire SOC <strong>{{prestataire_soc}}</strong> et le client <strong>{{client_soc}}</strong>.</p><h2>Article 1 – Périmètre</h2><p>Périmètre surveillé : <strong>{{perimetre_surveillance}}</strong></p><h2>Article 2 – Surveillance 24/7</h2><p>Le SOC assure une surveillance continue avec notification des incidents en moins de <strong>{{delai_notification}} minutes</strong>.</p><h2>Article 3 – Rapports</h2><p>Un rapport mensuel de sécurité est remis au client avec les statistiques d'incidents et les recommandations.</p><p>Service démarré le {{date_debut_service}}</p></div>`
  },
  {
    code: 'telco2_conformite_artci',
    name: "Accord de conformité ARTCI",
    category: 'commercial_financier',
    price: 8000, priceMax: 24000,
    description: "Document d'engagement de conformité d'un opérateur ou fournisseur de services télécom aux obligations réglementaires de l'ARTCI (Autorité de Régulation des Télécommunications de Côte d'Ivoire).",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'operateur_engage',label:"Opérateur / Fournisseur engagé",type:'text',required:true},
      {key:'numero_agrement',label:"Numéro d'agrément ARTCI",type:'text',required:true},
      {key:'type_service_autorise',label:"Type de service autorisé",type:'text',required:true},
      {key:'date_engagement',label:"Date d'engagement",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>DÉCLARATION DE CONFORMITÉ ARTCI</h1><p>L'opérateur <strong>{{operateur_engage}}</strong>, titulaire de l'agrément ARTCI n° <strong>{{numero_agrement}}</strong>, déclare ce qui suit.</p><h2>Article 1 – Engagement</h2><p>L'opérateur s'engage à respecter l'ensemble des obligations réglementaires liées à l'exercice du service de type <strong>{{type_service_autorise}}</strong>.</p><h2>Article 2 – Obligations</h2><p>Cela inclut la couverture territoriale, la qualité de service, la confidentialité des communications et la coopération avec les autorités compétentes.</p><p>Fait à Abidjan, le {{date_engagement}}</p></div>`
  },
  {
    code: 'telco2_charte_qos',
    name: "Charte de qualité de service télécom",
    category: 'commercial_financier',
    price: 5000, priceMax: 15000,
    description: "Charte de qualité de service engageant un opérateur télécom envers ses clients, définissant les standards de performance, les délais de traitement des réclamations et les compensations.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 71,
    fieldsJson: F([
      {key:'operateur_signataire',label:"Opérateur signataire",type:'text',required:true},
      {key:'directeur_general',label:"Directeur Général",type:'text',required:true},
      {key:'date_charte',label:"Date de la charte",type:'date',required:true},
      {key:'delai_reclamations',label:"Délai de traitement des réclamations (jours)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE QUALITÉ DE SERVICE TÉLÉCOM</h1><p>L'opérateur <strong>{{operateur_signataire}}</strong>, représenté par M./Mme <strong>{{directeur_general}}</strong>, s'engage envers l'ensemble de ses clients.</p><h2>Engagement 1 – Disponibilité</h2><p>L'opérateur s'engage à maintenir une disponibilité de réseau supérieure à 99% par trimestre.</p><h2>Engagement 2 – Réclamations</h2><p>Toute réclamation est traitée dans un délai maximum de <strong>{{delai_reclamations}} jours ouvrables</strong>.</p><h2>Engagement 3 – Compensation</h2><p>En cas de non-respect des engagements, des compensations sont appliquées automatiquement sur la facture du client.</p><p>Charte du {{date_charte}}</p></div>`
  },
  {
    code: 'it2_dev_logiciel_sur_mesure',
    name: "Contrat de développement de logiciel sur mesure",
    category: 'commercial_financier',
    price: 12000, priceMax: 36000,
    description: "Contrat de développement d'un logiciel sur mesure, définissant les spécifications fonctionnelles, les délais, la propriété intellectuelle et les garanties post-livraison.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 80,
    fieldsJson: F([
      {key:'prestataire_dev',label:"Prestataire de développement",type:'text',required:true},
      {key:'client_dev',label:"Client",type:'text',required:true},
      {key:'nom_logiciel',label:"Nom du logiciel",type:'text',required:true},
      {key:'budget_dev',label:"Budget de développement (FCFA)",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison prévue",type:'date',required:true},
      {key:'duree_garantie',label:"Durée de garantie (mois)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE DÉVELOPPEMENT DE LOGICIEL SUR MESURE</h1><p>Entre le prestataire <strong>{{prestataire_dev}}</strong> et le client <strong>{{client_dev}}</strong>.</p><h2>Article 1 – Objet</h2><p>Développement du logiciel <strong>{{nom_logiciel}}</strong> selon le cahier des charges annexé.</p><h2>Article 2 – Budget et délai</h2><p>Budget : <strong>{{budget_dev}} FCFA</strong> — Livraison prévue le : <strong>{{date_livraison}}</strong>.</p><h2>Article 3 – Propriété intellectuelle</h2><p>À la livraison et après paiement intégral, l'ensemble des droits sur le logiciel est transféré au client.</p><h2>Article 4 – Garantie</h2><p>Une garantie de <strong>{{duree_garantie}} mois</strong> couvrant les bugs est accordée sans surcoût.</p></div>`
  },
  {
    code: 'it2_tma_maintenance_applicative',
    name: "Accord de service de maintenance applicative (TMA)",
    category: 'commercial_financier',
    price: 8000, priceMax: 24000,
    description: "Contrat de tierce maintenance applicative (TMA) pour la maintenance corrective, évolutive et adaptative d'une ou plusieurs applications, avec engagements de service.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 74,
    fieldsJson: F([
      {key:'prestataire_tma',label:"Prestataire TMA",type:'text',required:true},
      {key:'client_tma',label:"Client",type:'text',required:true},
      {key:'applications_couvertes',label:"Applications couvertes",type:'textarea',required:true},
      {key:'jours_hommes_mois',label:"Charge mensuelle (jours/homme)",type:'text',required:true},
      {key:'date_debut_tma',label:"Date de début TMA",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MAINTENANCE APPLICATIVE (TMA)</h1><p>Entre le prestataire <strong>{{prestataire_tma}}</strong> et le client <strong>{{client_tma}}</strong>.</p><h2>Article 1 – Périmètre</h2><p>Applications couvertes : <strong>{{applications_couvertes}}</strong>.</p><h2>Article 2 – Charge</h2><p>Charge mensuelle allouée : <strong>{{jours_hommes_mois}} jours/homme</strong>.</p><h2>Article 3 – Types de maintenance</h2><p>La TMA couvre la maintenance corrective (bugs), évolutive (nouvelles fonctionnalités) et adaptative (mises à jour technologiques).</p><p>Démarrage le {{date_debut_tma}}</p></div>`
  },
  {
    code: 'it2_infogérance_outsourcing',
    name: "Accord de service d'infogérance (outsourcing IT)",
    category: 'commercial_financier',
    price: 14000, priceMax: 42000,
    description: "Contrat d'infogérance (outsourcing IT) confiant la gestion totale ou partielle du système d'information d'une entreprise à un prestataire spécialisé.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'prestataire_info',label:"Prestataire d'infogérance",type:'text',required:true},
      {key:'client_info',label:"Client",type:'text',required:true},
      {key:'perimetre_si',label:"Périmètre du SI externalisé",type:'textarea',required:true},
      {key:'nombre_techniciens',label:"Nombre de techniciens dédiés",type:'text',required:true},
      {key:'date_transfert',label:"Date de transfert de responsabilité",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'INFOGÉRANCE (OUTSOURCING IT)</h1><p>Entre le prestataire <strong>{{prestataire_info}}</strong> et le client <strong>{{client_info}}</strong>.</p><h2>Article 1 – Périmètre externalisé</h2><p>Systèmes confiés : <strong>{{perimetre_si}}</strong>.</p><h2>Article 2 – Équipe dédiée</h2><p>Le prestataire mobilise <strong>{{nombre_techniciens}} techniciens dédiés</strong> sur site ou en télégestion.</p><h2>Article 3 – Transfert</h2><p>Le transfert de responsabilité est effectif le <strong>{{date_transfert}}</strong>, après phase de réversibilité de 30 jours.</p></div>`
  },
  {
    code: 'it2_dev_app_mobile',
    name: "Accord de service de développement application mobile",
    category: 'commercial_financier',
    price: 10000, priceMax: 30000,
    description: "Contrat de développement d'une application mobile (iOS/Android), incluant conception UX/UI, développement, tests et déploiement sur les stores.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 82,
    fieldsJson: F([
      {key:'agence_mobile',label:"Agence de développement mobile",type:'text',required:true},
      {key:'client_mobile',label:"Client",type:'text',required:true},
      {key:'nom_app',label:"Nom de l'application",type:'text',required:true},
      {key:'plateformes',label:"Plateformes cibles (iOS/Android/les deux)",type:'text',required:true},
      {key:'date_livraison_app',label:"Date de livraison",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DÉVELOPPEMENT APPLICATION MOBILE</h1><p>Entre l'agence <strong>{{agence_mobile}}</strong> et le client <strong>{{client_mobile}}</strong>.</p><h2>Article 1 – Application</h2><p>Développement de l'application <strong>{{nom_app}}</strong> pour les plateformes <strong>{{plateformes}}</strong>.</p><h2>Article 2 – Livrables</h2><p>Les livrables incluent : maquettes UX/UI validées, code source, application publiée sur les stores officiels.</p><h2>Article 3 – Délai</h2><p>Livraison finale prévue le <strong>{{date_livraison_app}}</strong>.</p></div>`
  },
  {
    code: 'it2_dev_site_web',
    name: "Accord de service de développement site web",
    category: 'commercial_financier',
    price: 7000, priceMax: 21000,
    description: "Contrat de développement d'un site web professionnel ou e-commerce, couvrant la conception graphique, le développement, l'hébergement initial et la formation.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 85,
    fieldsJson: F([
      {key:'agence_web',label:"Agence web",type:'text',required:true},
      {key:'client_web',label:"Client",type:'text',required:true},
      {key:'type_site',label:"Type de site (vitrine/e-commerce/portail)",type:'text',required:true},
      {key:'nombre_pages',label:"Nombre de pages / rubriques",type:'text',required:true},
      {key:'date_mise_en_ligne',label:"Date de mise en ligne prévue",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DÉVELOPPEMENT SITE WEB</h1><p>Entre l'agence <strong>{{agence_web}}</strong> et le client <strong>{{client_web}}</strong>.</p><h2>Article 1 – Site développé</h2><p>Type de site : <strong>{{type_site}}</strong> — Nombre de pages : <strong>{{nombre_pages}}</strong>.</p><h2>Article 2 – Propriété</h2><p>Le code source et les contenus sont la propriété exclusive du client dès règlement complet.</p><h2>Article 3 – Mise en ligne</h2><p>Mise en ligne prévue le <strong>{{date_mise_en_ligne}}</strong>, avec formation des administrateurs incluse.</p></div>`
  },
  {
    code: 'it2_dev_erp',
    name: "Accord de service de développement ERP (SAP, Odoo)",
    category: 'commercial_financier',
    price: 18000, priceMax: 54000,
    description: "Contrat d'implémentation et de paramétrage d'un ERP (SAP, Odoo ou autre), incluant analyse des besoins, configuration, migration des données et formation des utilisateurs.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'integrateur_erp',label:"Intégrateur ERP",type:'text',required:true},
      {key:'client_erp',label:"Client",type:'text',required:true},
      {key:'solution_erp',label:"Solution ERP (SAP/Odoo/autre)",type:'text',required:true},
      {key:'modules_implementes',label:"Modules à implémenter",type:'textarea',required:true},
      {key:'date_go_live',label:"Date de go-live prévue",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'IMPLÉMENTATION ERP</h1><p>Entre l'intégrateur <strong>{{integrateur_erp}}</strong> et le client <strong>{{client_erp}}</strong>.</p><h2>Article 1 – Solution</h2><p>Implémentation de la solution <strong>{{solution_erp}}</strong>.</p><h2>Article 2 – Modules</h2><p>Modules concernés : <strong>{{modules_implementes}}</strong>.</p><h2>Article 3 – Go-live</h2><p>La mise en production est prévue le <strong>{{date_go_live}}</strong>, après recette utilisateurs validée.</p></div>`
  },
  {
    code: 'it2_dev_crm',
    name: "Accord de service de développement CRM",
    category: 'commercial_financier',
    price: 11000, priceMax: 33000,
    description: "Contrat d'implémentation d'un CRM (Customer Relationship Management) pour la gestion de la relation client, incluant paramétrage, intégrations et formation.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 73,
    fieldsJson: F([
      {key:'prestataire_crm',label:"Prestataire CRM",type:'text',required:true},
      {key:'client_crm',label:"Client",type:'text',required:true},
      {key:'solution_crm',label:"Solution CRM retenue",type:'text',required:true},
      {key:'utilisateurs_formes',label:"Nombre d'utilisateurs à former",type:'text',required:true},
      {key:'date_deploiement',label:"Date de déploiement",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DÉPLOIEMENT CRM</h1><p>Entre le prestataire <strong>{{prestataire_crm}}</strong> et le client <strong>{{client_crm}}</strong>.</p><h2>Article 1 – Solution CRM</h2><p>Déploiement de la solution <strong>{{solution_crm}}</strong>.</p><h2>Article 2 – Formation</h2><p>Formation de <strong>{{utilisateurs_formes}} utilisateurs</strong> prévue avant la mise en production.</p><h2>Article 3 – Déploiement</h2><p>Le déploiement est planifié au <strong>{{date_deploiement}}</strong>, avec support post-démarrage de 30 jours inclus.</p></div>`
  },
  {
    code: 'it2_integration_esb_api',
    name: "Accord de service d'intégration de systèmes (ESB/API)",
    category: 'commercial_financier',
    price: 13000, priceMax: 39000,
    description: "Contrat d'intégration de systèmes d'information via bus de services (ESB) ou API, permettant l'interopérabilité entre applications hétérogènes.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'integrateur_si',label:"Intégrateur de systèmes",type:'text',required:true},
      {key:'client_si',label:"Client",type:'text',required:true},
      {key:'systemes_integres',label:"Systèmes à intégrer",type:'textarea',required:true},
      {key:'nombre_flux',label:"Nombre de flux d'échange",type:'text',required:true},
      {key:'date_livraison_integ',label:"Date de livraison",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'INTÉGRATION DE SYSTÈMES (ESB / API)</h1><p>Entre l'intégrateur <strong>{{integrateur_si}}</strong> et le client <strong>{{client_si}}</strong>.</p><h2>Article 1 – Systèmes concernés</h2><p>Systèmes à intégrer : <strong>{{systemes_integres}}</strong>.</p><h2>Article 2 – Flux</h2><p>Nombre de flux d'échange à mettre en place : <strong>{{nombre_flux}}</strong>.</p><h2>Article 3 – Documentation</h2><p>Une documentation technique complète (spécifications API, schémas de flux) est livrée avec les développements.</p><p>Livraison prévue le {{date_livraison_integ}}</p></div>`
  },
  {
    code: 'it2_migration_donnees',
    name: "Accord de service de migration de données",
    category: 'commercial_financier',
    price: 9000, priceMax: 27000,
    description: "Contrat de migration de données d'un système source vers un système cible, incluant analyse, nettoyage, transformation et validation des données migrées.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 67,
    fieldsJson: F([
      {key:'prestataire_migration',label:"Prestataire migration",type:'text',required:true},
      {key:'client_migration',label:"Client",type:'text',required:true},
      {key:'volume_donnees',label:"Volume de données (Go ou enregistrements)",type:'text',required:true},
      {key:'systeme_source',label:"Système source",type:'text',required:true},
      {key:'date_migration',label:"Date de migration prévue",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MIGRATION DE DONNÉES</h1><p>Entre le prestataire <strong>{{prestataire_migration}}</strong> et le client <strong>{{client_migration}}</strong>.</p><h2>Article 1 – Périmètre</h2><p>Migration de <strong>{{volume_donnees}}</strong> depuis le système <strong>{{systeme_source}}</strong>.</p><h2>Article 2 – Méthode</h2><p>La migration est réalisée en plusieurs passes avec validation intermédiaire pour garantir l'intégrité des données.</p><h2>Article 3 – Date</h2><p>La migration de production est planifiée le <strong>{{date_migration}}</strong> avec retour arrière (rollback) garanti.</p></div>`
  },
  {
    code: 'it2_dev_ecommerce',
    name: "Accord de service de développement e-commerce",
    category: 'commercial_financier',
    price: 10000, priceMax: 30000,
    description: "Contrat de développement d'une plateforme de commerce électronique (boutique en ligne), incluant catalogue produits, paiement mobile money et livraison.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 79,
    fieldsJson: F([
      {key:'agence_ecom',label:"Agence e-commerce",type:'text',required:true},
      {key:'marchand',label:"Marchand / Client",type:'text',required:true},
      {key:'nombre_produits',label:"Nombre de produits initial",type:'text',required:true},
      {key:'modes_paiement',label:"Modes de paiement intégrés",type:'text',required:true},
      {key:'date_ouverture',label:"Date d'ouverture de la boutique",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DÉVELOPPEMENT E-COMMERCE</h1><p>Entre l'agence <strong>{{agence_ecom}}</strong> et le marchand <strong>{{marchand}}</strong>.</p><h2>Article 1 – Boutique en ligne</h2><p>Développement d'une boutique en ligne avec <strong>{{nombre_produits}} produits</strong> au lancement.</p><h2>Article 2 – Paiement</h2><p>Modes de paiement intégrés : <strong>{{modes_paiement}}</strong> (inclut Mobile Money CI).</p><h2>Article 3 – Ouverture</h2><p>Ouverture commerciale prévue le <strong>{{date_ouverture}}</strong>.</p></div>`
  },
  {
    code: 'it2_dev_jeux_video',
    name: "Accord de service de développement de jeux vidéo",
    category: 'commercial_financier',
    price: 9000, priceMax: 27000,
    description: "Contrat de développement d'un jeu vidéo (mobile, web ou console), incluant conception, développement, tests et commercialisation.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'studio_jeu',label:"Studio de développement",type:'text',required:true},
      {key:'client_jeu',label:"Client / Éditeur",type:'text',required:true},
      {key:'titre_jeu',label:"Titre du jeu",type:'text',required:true},
      {key:'plateforme_jeu',label:"Plateforme cible (mobile/web/PC)",type:'text',required:true},
      {key:'date_sortie',label:"Date de sortie prévue",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DÉVELOPPEMENT DE JEUX VIDÉO</h1><p>Entre le studio <strong>{{studio_jeu}}</strong> et l'éditeur <strong>{{client_jeu}}</strong>.</p><h2>Article 1 – Jeu</h2><p>Développement du jeu <strong>{{titre_jeu}}</strong> pour la plateforme <strong>{{plateforme_jeu}}</strong>.</p><h2>Article 2 – Propriété</h2><p>Les droits sur le jeu, les actifs graphiques et le code sont cédés à l'éditeur après paiement intégral.</p><h2>Article 3 – Sortie</h2><p>Date de sortie prévue : <strong>{{date_sortie}}</strong>.</p></div>`
  },
  {
    code: 'it2_plateforme_educative',
    name: "Accord de service de développement de plateforme éducative",
    category: 'commercial_financier',
    price: 11000, priceMax: 33000,
    description: "Contrat de développement d'une plateforme d'apprentissage en ligne (LMS/e-learning), incluant gestion des cours, suivi des apprenants et délivrance de certificats.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 64,
    fieldsJson: F([
      {key:'prestataire_lms',label:"Prestataire LMS",type:'text',required:true},
      {key:'institution',label:"Institution / Entreprise cliente",type:'text',required:true},
      {key:'nombre_cours',label:"Nombre de cours à intégrer",type:'text',required:true},
      {key:'nombre_apprenants',label:"Nombre d'apprenants attendus",type:'text',required:true},
      {key:'date_lancement',label:"Date de lancement",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DÉVELOPPEMENT DE PLATEFORME ÉDUCATIVE</h1><p>Entre le prestataire <strong>{{prestataire_lms}}</strong> et l'institution <strong>{{institution}}</strong>.</p><h2>Article 1 – Plateforme</h2><p>Développement d'un LMS intégrant <strong>{{nombre_cours}} cours</strong> pour <strong>{{nombre_apprenants}} apprenants</strong>.</p><h2>Article 2 – Fonctionnalités</h2><p>La plateforme inclut : gestion des inscriptions, suivi de progression, quiz interactifs, délivrance de certificats.</p><h2>Article 3 – Lancement</h2><p>Lancement prévu le <strong>{{date_lancement}}</strong>.</p></div>`
  },
  {
    code: 'it2_hebergement_web',
    name: "Accord de service d'hébergement web (serveur)",
    category: 'commercial_financier',
    price: 5000, priceMax: 15000,
    description: "Contrat de fourniture d'hébergement web sur serveur dédié ou mutualisé, incluant espace disque, bande passante, sauvegardes et support technique.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 77,
    fieldsJson: F([
      {key:'hebergeur',label:"Hébergeur",type:'text',required:true},
      {key:'client_hebergement',label:"Client",type:'text',required:true},
      {key:'type_hebergement',label:"Type d'hébergement (dédié/mutualisé/VPS)",type:'text',required:true},
      {key:'espace_disque',label:"Espace disque alloué (Go)",type:'text',required:true},
      {key:'date_activation_heb',label:"Date d'activation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'HÉBERGEMENT WEB</h1><p>Entre l'hébergeur <strong>{{hebergeur}}</strong> et le client <strong>{{client_hebergement}}</strong>.</p><h2>Article 1 – Hébergement</h2><p>Type : <strong>{{type_hebergement}}</strong> — Espace disque : <strong>{{espace_disque}} Go</strong>.</p><h2>Article 2 – Disponibilité</h2><p>Disponibilité garantie : 99,9% par mois, hors maintenance planifiée.</p><h2>Article 3 – Sauvegardes</h2><p>Des sauvegardes quotidiennes automatiques sont conservées pendant 30 jours.</p><p>Activé le {{date_activation_heb}}</p></div>`
  },
  {
    code: 'it2_nom_de_domaine',
    name: "Accord de service de nom de domaine (.ci, .com)",
    category: 'commercial_financier',
    price: 3000, priceMax: 9000,
    description: "Contrat d'enregistrement et de gestion de nom de domaine (.ci, .com, .net), incluant DNS, renouvellement automatique et protection WHOIS.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 80,
    fieldsJson: F([
      {key:'bureau_enregistrement',label:"Bureau d'enregistrement (registrar)",type:'text',required:true},
      {key:'titulaire_domaine',label:"Titulaire du domaine",type:'text',required:true},
      {key:'nom_domaine',label:"Nom de domaine",type:'text',required:true},
      {key:'duree_enregistrement',label:"Durée d'enregistrement (années)",type:'text',required:true},
      {key:'date_enregistrement',label:"Date d'enregistrement",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE NOM DE DOMAINE</h1><p>Entre le bureau d'enregistrement <strong>{{bureau_enregistrement}}</strong> et le titulaire <strong>{{titulaire_domaine}}</strong>.</p><h2>Article 1 – Domaine</h2><p>Enregistrement du nom de domaine <strong>{{nom_domaine}}</strong> pour une durée de <strong>{{duree_enregistrement}} an(s)</strong>.</p><h2>Article 2 – DNS</h2><p>La gestion des entrées DNS est assurée par le registrar via son interface d'administration.</p><h2>Article 3 – Renouvellement</h2><p>Le renouvellement automatique est activé par défaut avec notification 60 jours avant expiration.</p><p>Enregistré le {{date_enregistrement}}</p></div>`
  },
  {
    code: 'it2_certificat_ssl',
    name: "Accord de service de certificat SSL/TLS",
    category: 'commercial_financier',
    price: 4000, priceMax: 12000,
    description: "Contrat de fourniture et de gestion d'un certificat SSL/TLS pour sécuriser les communications d'un site web ou d'une API, avec renouvellement automatique.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 75,
    fieldsJson: F([
      {key:'autorite_certif',label:"Autorité de certification",type:'text',required:true},
      {key:'client_ssl',label:"Client",type:'text',required:true},
      {key:'domaine_securise',label:"Domaine(s) sécurisé(s)",type:'text',required:true},
      {key:'type_certificat',label:"Type de certificat (DV/OV/EV/Wildcard)",type:'text',required:true},
      {key:'date_emission',label:"Date d'émission",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CERTIFICAT SSL/TLS</h1><p>Entre l'autorité de certification <strong>{{autorite_certif}}</strong> et le client <strong>{{client_ssl}}</strong>.</p><h2>Article 1 – Certificat</h2><p>Type : <strong>{{type_certificat}}</strong> — Domaine(s) sécurisé(s) : <strong>{{domaine_securise}}</strong>.</p><h2>Article 2 – Validité</h2><p>Le certificat est valable 1 an à compter du <strong>{{date_emission}}</strong>, avec renouvellement automatique.</p><h2>Article 3 – Responsabilité</h2><p>Le client est responsable de la véracité des informations fournies lors de la demande de certificat.</p></div>`
  },
  {
    code: 'it2_backup_recuperation',
    name: "Accord de service de sauvegarde et récupération (backup)",
    category: 'commercial_financier',
    price: 6000, priceMax: 18000,
    description: "Contrat de service de sauvegarde automatisée et de récupération de données (backup/restore), avec définition des RPO et RTO garantis.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 71,
    fieldsJson: F([
      {key:'prestataire_backup',label:"Prestataire backup",type:'text',required:true},
      {key:'client_backup',label:"Client",type:'text',required:true},
      {key:'volume_sauvegarde',label:"Volume de données à sauvegarder (To)",type:'text',required:true},
      {key:'rpo_garanti',label:"RPO garanti (heures)",type:'text',required:true},
      {key:'rto_garanti',label:"RTO garanti (heures)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SAUVEGARDE ET RÉCUPÉRATION (BACKUP)</h1><p>Entre le prestataire <strong>{{prestataire_backup}}</strong> et le client <strong>{{client_backup}}</strong>.</p><h2>Article 1 – Volume</h2><p>Volume de données couvert : <strong>{{volume_sauvegarde}} To</strong>.</p><h2>Article 2 – Engagements</h2><p>RPO garanti : <strong>{{rpo_garanti}} heures</strong> — RTO garanti : <strong>{{rto_garanti}} heures</strong>.</p><h2>Article 3 – Tests</h2><p>Des tests de restauration sont réalisés trimestriellement et attestés par un rapport de test.</p></div>`
  },
  {
    code: 'it2_tests_qa',
    name: "Accord de service de tests et qualification logiciel (QA)",
    category: 'commercial_financier',
    price: 8000, priceMax: 24000,
    description: "Contrat de service de tests logiciels et assurance qualité (QA), couvrant tests fonctionnels, tests de performance et tests de sécurité.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'prestataire_qa',label:"Prestataire QA",type:'text',required:true},
      {key:'client_qa',label:"Client",type:'text',required:true},
      {key:'application_testee',label:"Application testée",type:'text',required:true},
      {key:'types_tests',label:"Types de tests (fonctionnels/perf/sécu)",type:'text',required:true},
      {key:'date_debut_tests',label:"Date de début des tests",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TESTS ET QUALIFICATION LOGICIEL (QA)</h1><p>Entre le prestataire QA <strong>{{prestataire_qa}}</strong> et le client <strong>{{client_qa}}</strong>.</p><h2>Article 1 – Périmètre</h2><p>Tests de l'application <strong>{{application_testee}}</strong> — Types : <strong>{{types_tests}}</strong>.</p><h2>Article 2 – Livrables</h2><p>Les livrables incluent : plan de tests, scripts de tests automatisés, rapports de tests et préconisations.</p><h2>Article 3 – Début</h2><p>Les tests démarrent le <strong>{{date_debut_tests}}</strong> après fourniture des accès par le client.</p></div>`
  },
  {
    code: 'it2_devops_cicd',
    name: "Accord de service de DevOps et CI/CD",
    category: 'commercial_financier',
    price: 10000, priceMax: 30000,
    description: "Contrat de mise en place et d'exploitation de pipelines CI/CD (intégration continue / déploiement continu) et de pratiques DevOps pour accélérer les livraisons logicielles.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'prestataire_devops',label:"Prestataire DevOps",type:'text',required:true},
      {key:'client_devops',label:"Client",type:'text',required:true},
      {key:'outils_cicd',label:"Outils CI/CD utilisés (Jenkins, GitLab CI...)",type:'text',required:true},
      {key:'frequence_deploiements',label:"Fréquence cible de déploiements/semaine",type:'text',required:true},
      {key:'date_mise_en_place',label:"Date de mise en place",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DEVOPS ET CI/CD</h1><p>Entre le prestataire <strong>{{prestataire_devops}}</strong> et le client <strong>{{client_devops}}</strong>.</p><h2>Article 1 – Outils</h2><p>Outils CI/CD déployés : <strong>{{outils_cicd}}</strong>.</p><h2>Article 2 – Objectif</h2><p>Fréquence cible de déploiements : <strong>{{frequence_deploiements}} par semaine</strong>.</p><h2>Article 3 – Formation</h2><p>Les équipes du client sont formées aux pratiques DevOps et à l'utilisation des outils déployés.</p><p>Mise en place le {{date_mise_en_place}}</p></div>`
  },
  {
    code: 'it2_formation_informatique',
    name: "Accord de service de formation informatique (certifications)",
    category: 'commercial_financier',
    price: 7000, priceMax: 21000,
    description: "Contrat de formation informatique préparant aux certifications professionnelles (AWS, Azure, Cisco, Microsoft...), incluant cursus, examens blancs et passage de certification.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 73,
    fieldsJson: F([
      {key:'organisme_formation',label:"Organisme de formation",type:'text',required:true},
      {key:'stagiaire_entreprise',label:"Entreprise stagiaire",type:'text',required:true},
      {key:'certification_cible',label:"Certification cible",type:'text',required:true},
      {key:'nombre_stagiaires',label:"Nombre de stagiaires",type:'text',required:true},
      {key:'date_debut_formation',label:"Date de début de la formation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FORMATION INFORMATIQUE</h1><p>Entre l'organisme <strong>{{organisme_formation}}</strong> et l'entreprise <strong>{{stagiaire_entreprise}}</strong>.</p><h2>Article 1 – Formation</h2><p>Préparation à la certification <strong>{{certification_cible}}</strong> pour <strong>{{nombre_stagiaires}} stagiaires</strong>.</p><h2>Article 2 – Programme</h2><p>Le programme inclut cours théoriques, travaux pratiques et examens blancs.</p><h2>Article 3 – Début</h2><p>La formation débute le <strong>{{date_debut_formation}}</strong>. Une attestation de formation est délivrée à chaque participant.</p></div>`
  },
  {
    code: 'it2_support_helpdesk',
    name: "Accord de service de support technique (helpdesk)",
    category: 'commercial_financier',
    price: 6000, priceMax: 18000,
    description: "Contrat de service de support technique informatique (helpdesk), définissant les niveaux de support (N1/N2/N3), les canaux de contact et les SLA de résolution.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 76,
    fieldsJson: F([
      {key:'prestataire_helpdesk',label:"Prestataire helpdesk",type:'text',required:true},
      {key:'client_helpdesk',label:"Client",type:'text',required:true},
      {key:'nombre_utilisateurs_sup',label:"Nombre d'utilisateurs supportés",type:'text',required:true},
      {key:'horaires_support',label:"Horaires de support",type:'text',required:true},
      {key:'date_debut_support',label:"Date de début du support",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SUPPORT TECHNIQUE (HELPDESK)</h1><p>Entre le prestataire <strong>{{prestataire_helpdesk}}</strong> et le client <strong>{{client_helpdesk}}</strong>.</p><h2>Article 1 – Périmètre</h2><p>Support de <strong>{{nombre_utilisateurs_sup}} utilisateurs</strong>, horaires : <strong>{{horaires_support}}</strong>.</p><h2>Article 2 – Niveaux</h2><p>Support N1 (accueil/diagnostic), N2 (résolution technique), N3 (escalade éditeur/constructeur).</p><h2>Article 3 – SLA</h2><p>Délai de prise en charge : 30 min pour incidents critiques, 4h pour incidents standard.</p><p>Démarrage le {{date_debut_support}}</p></div>`
  },
  {
    code: 'it2_rapport_performance_si',
    name: "Rapport de performance système informatique",
    category: 'commercial_financier',
    price: 5000, priceMax: 15000,
    description: "Modèle de rapport de performance du système d'information, présentant la disponibilité, les temps de réponse, la sécurité et les recommandations d'amélioration.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'responsable_si',label:"Responsable SI",type:'text',required:true},
      {key:'entreprise_rapport',label:"Entreprise",type:'text',required:true},
      {key:'periode_rapport',label:"Période couverte",type:'text',required:true},
      {key:'taux_dispo_si',label:"Taux de disponibilité SI (%)",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE SYSTÈME INFORMATIQUE</h1><p>Responsable SI : <strong>{{responsable_si}}</strong> — Entreprise : <strong>{{entreprise_rapport}}</strong></p><p>Période : <strong>{{periode_rapport}}</strong> — Date : <strong>{{date_rapport}}</strong></p><h2>1. Disponibilité</h2><p>Taux de disponibilité du SI : <strong>{{taux_dispo_si}}%</strong></p><h2>2. Incidents</h2><p>Les incidents majeurs survenus et leurs résolutions sont détaillés en annexe.</p><h2>3. Recommandations</h2><p>Des recommandations d'amélioration de l'infrastructure et de la sécurité sont proposées pour la prochaine période.</p></div>`
  },
  {
    code: 'it2_plan_transformation_digitale',
    name: "Plan de transformation digitale",
    category: 'commercial_financier',
    price: 15000, priceMax: 45000,
    description: "Document de planification stratégique de la transformation digitale d'une organisation, définissant la vision, les axes prioritaires, la feuille de route et le budget.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 75,
    fieldsJson: F([
      {key:'directeur_digital',label:"Directeur Digital / CDO",type:'text',required:true},
      {key:'organisation',label:"Organisation",type:'text',required:true},
      {key:'horizon_plan',label:"Horizon du plan (ex: 2025-2027)",type:'text',required:true},
      {key:'budget_digital',label:"Budget digital alloué (FCFA)",type:'text',required:true},
      {key:'date_validation',label:"Date de validation du plan",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE TRANSFORMATION DIGITALE</h1><p>Organisation : <strong>{{organisation}}</strong> — CDO : <strong>{{directeur_digital}}</strong></p><p>Horizon : <strong>{{horizon_plan}}</strong> — Budget : <strong>{{budget_digital}} FCFA</strong></p><h2>1. Vision</h2><p>Faire du digital un levier de croissance et d'efficacité opérationnelle pour l'organisation.</p><h2>2. Axes prioritaires</h2><p>Les axes prioritaires sont définis en annexe : digitalisation des processus, expérience client, data et cybersécurité.</p><h2>3. Gouvernance</h2><p>Un comité de pilotage digital se réunit mensuellement pour suivre l'avancement du plan.</p><p>Plan validé le {{date_validation}}</p></div>`
  },
  {
    code: 'it2_gouvernance_donnees_rgpd',
    name: "Accord de service de gouvernance des données (RGPD)",
    category: 'commercial_financier',
    price: 12000, priceMax: 36000,
    description: "Contrat de mise en conformité et de gouvernance des données personnelles (RGPD / loi ivoirienne sur la protection des données), incluant DPO externalisé et registre des traitements.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'cabinet_dpo',label:"Cabinet DPO externalisé",type:'text',required:true},
      {key:'responsable_traitement',label:"Responsable de traitement",type:'text',required:true},
      {key:'nombre_traitements',label:"Nombre de traitements recensés",type:'text',required:true},
      {key:'autorite_superviseur',label:"Autorité de supervision (ARTCI/APDP)",type:'text',required:true},
      {key:'date_mission',label:"Date de début de mission",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GOUVERNANCE DES DONNÉES</h1><p>Entre le cabinet DPO <strong>{{cabinet_dpo}}</strong> et le responsable de traitement <strong>{{responsable_traitement}}</strong>.</p><h2>Article 1 – Mission DPO</h2><p>Le cabinet assure la fonction de Délégué à la Protection des Données (DPO) externalisé.</p><h2>Article 2 – Registre</h2><p>Recensement et documentation de <strong>{{nombre_traitements}} traitements</strong> de données personnelles.</p><h2>Article 3 – Conformité</h2><p>Les actions de mise en conformité sont conduites vis-à-vis de l'autorité compétente : <strong>{{autorite_superviseur}}</strong>.</p><p>Mission débutée le {{date_mission}}</p></div>`
  },
  {
    code: 'it2_dev_blockchain',
    name: "Accord de service de développement blockchain",
    category: 'commercial_financier',
    price: 15000, priceMax: 45000,
    description: "Contrat de développement d'une solution blockchain (smart contracts, tokens, traçabilité), incluant choix de la chaîne, développement, audit et déploiement.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 62,
    fieldsJson: F([
      {key:'prestataire_blockchain',label:"Prestataire blockchain",type:'text',required:true},
      {key:'client_blockchain',label:"Client",type:'text',required:true},
      {key:'cas_usage',label:"Cas d'usage blockchain",type:'text',required:true},
      {key:'chaine_cible',label:"Blockchain cible (Ethereum, Polygon...)",type:'text',required:true},
      {key:'date_deploiement_bc',label:"Date de déploiement",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DÉVELOPPEMENT BLOCKCHAIN</h1><p>Entre le prestataire <strong>{{prestataire_blockchain}}</strong> et le client <strong>{{client_blockchain}}</strong>.</p><h2>Article 1 – Cas d'usage</h2><p>Développement d'une solution blockchain pour : <strong>{{cas_usage}}</strong>.</p><h2>Article 2 – Blockchain</h2><p>La chaîne cible retenue est <strong>{{chaine_cible}}</strong>.</p><h2>Article 3 – Audit</h2><p>Les smart contracts font l'objet d'un audit de sécurité par un tiers indépendant avant déploiement.</p><p>Déploiement prévu le {{date_deploiement_bc}}</p></div>`
  },
  {
    code: 'it2_charte_dev_responsable',
    name: "Charte de développement logiciel responsable",
    category: 'commercial_financier',
    price: 4000, priceMax: 12000,
    description: "Charte d'engagement pour un développement logiciel éthique, inclusif et durable, couvrant la qualité du code, la sécurité by design, l'accessibilité et l'impact environnemental.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'entreprise_signataire',label:"Entreprise signataire",type:'text',required:true},
      {key:'responsable_tech',label:"Responsable technique (CTO)",type:'text',required:true},
      {key:'date_charte',label:"Date de la charte",type:'date',required:true},
      {key:'nombre_developpeurs',label:"Nombre de développeurs concernés",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE DÉVELOPPEMENT LOGICIEL RESPONSABLE</h1><p>L'entreprise <strong>{{entreprise_signataire}}</strong>, représentée par son CTO <strong>{{responsable_tech}}</strong>, s'engage collectivement.</p><h2>Engagement 1 – Qualité</h2><p>Le code est relu, testé et documenté avant toute mise en production. La dette technique est gérée activement.</p><h2>Engagement 2 – Sécurité</h2><p>La sécurité est intégrée dès la conception (Security by Design). Les vulnérabilités sont traitées en priorité.</p><h2>Engagement 3 – Accessibilité</h2><p>Les interfaces respectent les standards d'accessibilité WCAG 2.1 niveau AA.</p><h2>Engagement 4 – Impact environnemental</h2><p>L'éco-conception logicielle est appliquée pour réduire la consommation d'énergie et les ressources matérielles.</p><p>Charte adoptée le {{date_charte}} — <strong>{{nombre_developpeurs}} développeurs</strong> engagés.</p></div>`
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
  console.log(`Batch 58b OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
