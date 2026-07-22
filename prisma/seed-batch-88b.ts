import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ─── INFRASTRUCTURE NUMÉRIQUE (inf3_) ───
  {
    code: 'inf3_cloud_souverain', name: "Accord de service de cloud computing souverain", category: 'commercial_financier', price: 12000, priceMax: 36000,
    description: "Accord encadrant l'hébergement de données sur infrastructure cloud souveraine hébergée sur le territoire national, conformément aux exigences ARTCI.", templateType: 'pdf', classe: 'B', active: true, popularity: 78,
    fieldsJson: F([
      {key:'prestataire',label:"Nom du prestataire cloud",type:'text',required:true},
      {key:'client',label:"Nom du client",type:'text',required:true},
      {key:'localisation_datacenter',label:"Localisation du datacenter",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'duree_contrat',label:"Durée du contrat",type:'text',required:true},
      {key:'niveaux_sla',label:"Niveaux de SLA garantis",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CLOUD COMPUTING SOUVERAIN</h1><p>Entre <strong>{{prestataire}}</strong> (ci-après «&nbsp;le Prestataire&nbsp;») et <strong>{{client}}</strong> (ci-après «&nbsp;le Client&nbsp;»).</p><h2>Article 1 – Objet</h2><p>Le présent accord définit les conditions de fourniture d'un service de cloud computing souverain, hébergé au datacenter de <strong>{{localisation_datacenter}}</strong>, sur le territoire national, en conformité avec la réglementation de l'ARTCI.</p><h2>Article 2 – Durée</h2><p>Le contrat prend effet le <strong>{{date_debut}}</strong> pour une durée de <strong>{{duree_contrat}}</strong>.</p><h2>Article 3 – Niveaux de service</h2><p>{{niveaux_sla}}</p><h2>Article 4 – Souveraineté des données</h2><p>Les données du Client ne quittent pas le territoire national. Le Prestataire garantit l'absence de transfert hors juridiction sans accord écrit préalable du Client.</p><h2>Article 5 – Droit applicable</h2><p>Le présent accord est régi par le droit ivoirien et les règlements OHADA applicables.</p></div>`
  },
  {
    code: 'inf3_iaas', name: "Accord de service d'IaaS (infrastructure as a service)", category: 'commercial_financier', price: 10000, priceMax: 30000,
    description: "Contrat de fourniture de ressources informatiques virtualisées (compute, stockage, réseau) en mode IaaS, avec engagements de disponibilité et de sécurité.", templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire IaaS",type:'text',required:true},
      {key:'client',label:"Client",type:'text',required:true},
      {key:'ressources_allouees',label:"Ressources allouées (vCPU, RAM, stockage)",type:'textarea',required:true},
      {key:'disponibilite_garantie',label:"Disponibilité garantie (%)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'INFRASTRUCTURE AS A SERVICE (IaaS)</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le Prestataire s'engage à fournir au Client des ressources d'infrastructure virtualisées comprenant : {{ressources_allouees}}.</p><h2>Article 2 – Disponibilité</h2><p>Le Prestataire garantit une disponibilité de <strong>{{disponibilite_garantie}}</strong> mesurée mensuellement, hors maintenances planifiées.</p><h2>Article 3 – Date d'effet</h2><p>Le présent accord entre en vigueur le <strong>{{date_debut}}</strong>.</p><h2>Article 4 – Responsabilités</h2><p>Le Client est responsable de la gestion des systèmes d'exploitation et applications déployées sur l'infrastructure. Le Prestataire est responsable de la couche physique et d'hyperviseur.</p><h2>Article 5 – Droit applicable</h2><p>Droit ivoirien et textes OHADA en vigueur.</p></div>`
  },
  {
    code: 'inf3_paas', name: "Accord de service de PaaS (plateforme as a service)", category: 'commercial_financier', price: 9000, priceMax: 27000,
    description: "Accord définissant la mise à disposition d'une plateforme de développement et de déploiement d'applications en mode PaaS.", templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire PaaS",type:'text',required:true},
      {key:'client',label:"Client",type:'text',required:true},
      {key:'plateforme',label:"Nom et version de la plateforme",type:'text',required:true},
      {key:'environnements',label:"Environnements fournis (dev/test/prod)",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PLATEFORME AS A SERVICE (PaaS)</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le Prestataire met à disposition du Client la plateforme <strong>{{plateforme}}</strong> permettant le développement, le test et le déploiement d'applications.</p><h2>Article 2 – Environnements</h2><p>Les environnements fournis sont : {{environnements}}.</p><h2>Article 3 – Date d'effet</h2><p>Le présent accord prend effet le <strong>{{date_debut}}</strong>.</p><h2>Article 4 – Mises à jour</h2><p>Le Prestataire assure la maintenance et les mises à jour de la plateforme avec un préavis de 72 heures pour les opérations planifiées.</p></div>`
  },
  {
    code: 'inf3_saas', name: "Accord de service de SaaS (logiciel as a service)", category: 'commercial_financier', price: 8000, priceMax: 24000,
    description: "Contrat d'abonnement à un logiciel hébergé et exploité par le prestataire, accessible via internet, avec conditions d'utilisation et engagements de service.", templateType: 'pdf', classe: 'B', active: true, popularity: 80,
    fieldsJson: F([
      {key:'prestataire',label:"Éditeur SaaS",type:'text',required:true},
      {key:'client',label:"Client",type:'text',required:true},
      {key:'logiciel',label:"Nom du logiciel",type:'text',required:true},
      {key:'nombre_utilisateurs',label:"Nombre d'utilisateurs licenciés",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'conditions_utilisation',label:"Conditions particulières d'utilisation",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE LOGICIEL AS A SERVICE (SaaS)</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le Prestataire concède au Client le droit d'utiliser le logiciel <strong>{{logiciel}}</strong> pour <strong>{{nombre_utilisateurs}}</strong> utilisateurs nommés.</p><h2>Article 2 – Accès</h2><p>L'accès est fourni via navigateur web sécurisé (HTTPS). Aucune installation locale n'est requise.</p><h2>Article 3 – Date d'effet</h2><p>Le présent accord prend effet le <strong>{{date_debut}}</strong>.</p><h2>Article 4 – Conditions particulières</h2><p>{{conditions_utilisation}}</p><h2>Article 5 – Protection des données</h2><p>Le Prestataire s'engage à protéger les données conformément à la loi ivoirienne relative à la protection des données à caractère personnel.</p></div>`
  },
  {
    code: 'inf3_datacenter_tier', name: "Accord de service de data center Tier III/IV", category: 'commercial_financier', price: 15000, priceMax: 45000,
    description: "Accord d'hébergement en salle blanche certifiée Tier III ou IV, avec engagements sur la redondance d'alimentation, le refroidissement et la connectivité.", templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'prestataire',label:"Opérateur du datacenter",type:'text',required:true},
      {key:'client',label:"Client",type:'text',required:true},
      {key:'certification_tier',label:"Certification Tier (III ou IV)",type:'text',required:true},
      {key:'surface_baies',label:"Surface/nombre de baies allouées",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DATA CENTER TIER {{certification_tier}}</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le Prestataire met à disposition du Client un espace d'hébergement certifié Tier <strong>{{certification_tier}}</strong> comprenant <strong>{{surface_baies}}</strong>.</p><h2>Article 2 – Engagements de disponibilité</h2><p>La certification Tier garantit une redondance des équipements critiques (alimentation, refroidissement, connectivité réseau) selon les standards internationaux applicables.</p><h2>Article 3 – Date d'effet</h2><p>Le présent accord prend effet le <strong>{{date_debut}}</strong>.</p><h2>Article 4 – Accès physique</h2><p>L'accès aux baies est soumis à authentification biométrique et badge. Tout accès est journalisé.</p></div>`
  },
  {
    code: 'inf3_colocation', name: "Accord de service de colocation de serveurs", category: 'commercial_financier', price: 8000, priceMax: 20000,
    description: "Contrat de colocation permettant au client d'héberger ses propres équipements dans les installations du prestataire, avec accès et services associés.", templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire colocation",type:'text',required:true},
      {key:'client',label:"Client",type:'text',required:true},
      {key:'equipements',label:"Description des équipements hébergés",type:'textarea',required:true},
      {key:'nombre_baies',label:"Nombre de baies",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE COLOCATION DE SERVEURS</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le Prestataire héberge dans ses installations les équipements suivants appartenant au Client : {{equipements}}, répartis dans <strong>{{nombre_baies}}</strong> baie(s).</p><h2>Article 2 – Services inclus</h2><p>Alimentation électrique redondante, refroidissement, connectivité internet, surveillance physique 24h/24.</p><h2>Article 3 – Date d'effet</h2><p>Le présent accord prend effet le <strong>{{date_debut}}</strong>.</p><h2>Article 4 – Responsabilité</h2><p>Le Client reste propriétaire et responsable de ses équipements. Le Prestataire est responsable de l'environnement d'hébergement.</p></div>`
  },
  {
    code: 'inf3_backup_drp', name: "Accord de service de backup et récupération après sinistre (DRP)", category: 'commercial_financier', price: 10000, priceMax: 30000,
    description: "Contrat encadrant les services de sauvegarde des données et le plan de reprise d'activité (DRP) en cas de sinistre informatique.", templateType: 'pdf', classe: 'B', active: true, popularity: 74,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire DRP",type:'text',required:true},
      {key:'client',label:"Client",type:'text',required:true},
      {key:'rto',label:"RTO (Recovery Time Objective)",type:'text',required:true},
      {key:'rpo',label:"RPO (Recovery Point Objective)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'perimetre_systemes',label:"Périmètre des systèmes couverts",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE BACKUP ET RÉCUPÉRATION APRÈS SINISTRE (DRP)</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le Prestataire fournit au Client des services de sauvegarde et de reprise d'activité couvrant : {{perimetre_systemes}}.</p><h2>Article 2 – Objectifs de reprise</h2><p>RTO (durée maximale d'interruption acceptable) : <strong>{{rto}}</strong>.<br/>RPO (perte de données maximale acceptable) : <strong>{{rpo}}</strong>.</p><h2>Article 3 – Date d'effet</h2><p>Le présent accord prend effet le <strong>{{date_debut}}</strong>.</p><h2>Article 4 – Tests de reprise</h2><p>Un test de basculement est réalisé au minimum une fois par an, avec rapport de résultats remis au Client.</p></div>`
  },
  {
    code: 'inf3_mpls_vpn', name: "Accord de service de réseau privé virtuel (MPLS)", category: 'commercial_financier', price: 11000, priceMax: 33000,
    description: "Contrat de fourniture d'un réseau privé virtuel MPLS interconnectant les sites du client avec garanties de bande passante et de qualité de service.", templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'prestataire',label:"Opérateur réseau",type:'text',required:true},
      {key:'client',label:"Client",type:'text',required:true},
      {key:'sites_connectes',label:"Sites à interconnecter",type:'textarea',required:true},
      {key:'bande_passante',label:"Bande passante garantie par lien",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RÉSEAU PRIVÉ VIRTUEL (MPLS)</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le Prestataire fournit un réseau MPLS privé interconnectant les sites suivants : {{sites_connectes}}.</p><h2>Article 2 – Qualité de service</h2><p>Bande passante garantie : <strong>{{bande_passante}}</strong> par lien, avec classes de service (voix, données critiques, données standard).</p><h2>Article 3 – Date d'effet</h2><p>Le présent accord prend effet le <strong>{{date_debut}}</strong>.</p><h2>Article 4 – Supervision</h2><p>Le Prestataire assure une supervision continue du réseau et notifie le Client de tout incident dans un délai de 15 minutes.</p></div>`
  },
  {
    code: 'inf3_firewall_manage', name: "Accord de service de pare-feu (firewall) managé", category: 'commercial_financier', price: 9000, priceMax: 27000,
    description: "Accord de service managé pour la gestion, la supervision et la maintenance de pare-feu réseau, incluant la politique de filtrage et les mises à jour.", templateType: 'pdf', classe: 'B', active: true, popularity: 69,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire firewall managé",type:'text',required:true},
      {key:'client',label:"Client",type:'text',required:true},
      {key:'equipements_firewall',label:"Équipements firewall gérés",type:'textarea',required:true},
      {key:'perimetre_reseaux',label:"Périmètre réseau protégé",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PARE-FEU (FIREWALL) MANAGÉ</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le Prestataire prend en charge la gestion des équipements de pare-feu suivants : {{equipements_firewall}}, protégeant le périmètre : <strong>{{perimetre_reseaux}}</strong>.</p><h2>Article 2 – Prestations incluses</h2><p>Gestion des règles de filtrage, mises à jour des signatures, supervision 24h/24, reporting mensuel.</p><h2>Article 3 – Date d'effet</h2><p>Le présent accord prend effet le <strong>{{date_debut}}</strong>.</p><h2>Article 4 – Changements de politique</h2><p>Toute modification des règles de filtrage fait l'objet d'une demande formelle et d'un délai de mise en œuvre convenu entre les parties.</p></div>`
  },
  {
    code: 'inf3_mdr', name: "Accord de service de détection et réponse aux incidents (MDR)", category: 'commercial_financier', price: 14000, priceMax: 42000,
    description: "Contrat de service MDR (Managed Detection & Response) couvrant la surveillance des menaces, la détection des incidents et la réponse coordonnée.", templateType: 'pdf', classe: 'B', active: true, popularity: 76,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire MDR",type:'text',required:true},
      {key:'client',label:"Client",type:'text',required:true},
      {key:'perimetre',label:"Périmètre surveillé",type:'textarea',required:true},
      {key:'temps_reponse',label:"Temps de réponse garanti",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DÉTECTION ET RÉPONSE AUX INCIDENTS (MDR)</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le Prestataire fournit un service de détection et réponse aux incidents de sécurité couvrant : {{perimetre}}.</p><h2>Article 2 – Niveaux de service</h2><p>Temps de réponse garanti : <strong>{{temps_reponse}}</strong> après détection d'un incident critique.</p><h2>Article 3 – Date d'effet</h2><p>Le présent accord prend effet le <strong>{{date_debut}}</strong>.</p><h2>Article 4 – Processus de réponse</h2><p>En cas d'incident confirmé, le Prestataire active son équipe de réponse et communique un rapport de situation toutes les 2 heures jusqu'à résolution.</p></div>`
  },
  {
    code: 'inf3_iam_sso', name: "Accord de service de gestion des identités (IAM/SSO)", category: 'commercial_financier', price: 9000, priceMax: 27000,
    description: "Accord de service pour la mise en place et la gestion d'une solution IAM (Identity and Access Management) avec authentification unique (SSO).", templateType: 'pdf', classe: 'B', active: true, popularity: 67,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire IAM",type:'text',required:true},
      {key:'client',label:"Client",type:'text',required:true},
      {key:'nombre_comptes',label:"Nombre de comptes gérés",type:'text',required:true},
      {key:'applications_sso',label:"Applications intégrées au SSO",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GESTION DES IDENTITÉS (IAM/SSO)</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le Prestataire déploie et gère une solution IAM/SSO pour <strong>{{nombre_comptes}}</strong> comptes utilisateurs.</p><h2>Article 2 – Applications intégrées</h2><p>{{applications_sso}}</p><h2>Article 3 – Date d'effet</h2><p>Le présent accord prend effet le <strong>{{date_debut}}</strong>.</p><h2>Article 4 – Sécurité des accès</h2><p>L'authentification multifacteur (MFA) est obligatoire pour tous les accès aux applications critiques.</p></div>`
  },
  {
    code: 'inf3_ztna', name: "Accord de service de zero trust network access (ZTNA)", category: 'commercial_financier', price: 12000, priceMax: 36000,
    description: "Contrat de déploiement et gestion d'une architecture Zero Trust Network Access sécurisant les accès distants sans périmètre réseau traditionnel.", templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire ZTNA",type:'text',required:true},
      {key:'client',label:"Client",type:'text',required:true},
      {key:'perimetre_acces',label:"Périmètre des accès sécurisés",type:'textarea',required:true},
      {key:'nombre_utilisateurs',label:"Nombre d'utilisateurs distants",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE ZERO TRUST NETWORK ACCESS (ZTNA)</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le Prestataire met en œuvre une architecture ZTNA pour sécuriser les accès de <strong>{{nombre_utilisateurs}}</strong> utilisateurs distants aux ressources : {{perimetre_acces}}.</p><h2>Article 2 – Principes</h2><p>Aucun accès implicite n'est accordé. Chaque requête est authentifiée, autorisée et chiffrée selon le principe du moindre privilège.</p><h2>Article 3 – Date d'effet</h2><p>Le présent accord prend effet le <strong>{{date_debut}}</strong>.</p><h2>Article 4 – Journalisation</h2><p>Tous les accès sont journalisés et conservés pendant 12 mois minimum.</p></div>`
  },
  {
    code: 'inf3_siem', name: "Accord de service de SIEM (gestion des événements sécurité)", category: 'commercial_financier', price: 13000, priceMax: 39000,
    description: "Accord de service pour le déploiement, la configuration et l'exploitation d'un SIEM centralisant les journaux d'événements de sécurité.", templateType: 'pdf', classe: 'B', active: true, popularity: 71,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire SIEM",type:'text',required:true},
      {key:'client',label:"Client",type:'text',required:true},
      {key:'sources_logs',label:"Sources de journaux intégrées",type:'textarea',required:true},
      {key:'volume_journalier',label:"Volume de logs journalier estimé",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SIEM</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le Prestataire déploie et opère une solution SIEM collectant les journaux des sources suivantes : {{sources_logs}}. Volume estimé : <strong>{{volume_journalier}}</strong>.</p><h2>Article 2 – Corrélation et alertes</h2><p>Le Prestataire configure des règles de corrélation et génère des alertes en temps réel pour les événements de sécurité critiques.</p><h2>Article 3 – Date d'effet</h2><p>Le présent accord prend effet le <strong>{{date_debut}}</strong>.</p><h2>Article 4 – Rapports</h2><p>Un rapport hebdomadaire et un rapport mensuel de synthèse des événements sont remis au Client.</p></div>`
  },
  {
    code: 'inf3_noc', name: "Accord de service de supervision réseau (NOC)", category: 'commercial_financier', price: 10000, priceMax: 30000,
    description: "Contrat de supervision réseau par un centre d'exploitation (NOC) assurant la surveillance continue, la détection des pannes et la gestion des tickets.", templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire NOC",type:'text',required:true},
      {key:'client',label:"Client",type:'text',required:true},
      {key:'equipements_supervises',label:"Équipements supervisés",type:'textarea',required:true},
      {key:'plage_supervision',label:"Plage de supervision",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SUPERVISION RÉSEAU (NOC)</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le Prestataire assure la supervision des équipements réseau suivants : {{equipements_supervises}}, pendant la plage : <strong>{{plage_supervision}}</strong>.</p><h2>Article 2 – Gestion des incidents</h2><p>Tout incident détecté est qualifié, ticketisé et escaladé selon les procédures convenues.</p><h2>Article 3 – Date d'effet</h2><p>Le présent accord prend effet le <strong>{{date_debut}}</strong>.</p><h2>Article 4 – Reporting</h2><p>Un rapport de disponibilité est produit mensuellement avec analyse des incidents et recommandations.</p></div>`
  },
  {
    code: 'inf3_pentest', name: "Accord de service de pentest (test d'intrusion)", category: 'commercial_financier', price: 15000, priceMax: 45000,
    description: "Contrat d'autorisation et d'exécution de tests d'intrusion (pentest) sur les systèmes du client, avec rapport de vulnérabilités et recommandations.", templateType: 'pdf', classe: 'B', active: true, popularity: 82,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire pentest",type:'text',required:true},
      {key:'client',label:"Client",type:'text',required:true},
      {key:'perimetre_test',label:"Périmètre des systèmes testés",type:'textarea',required:true},
      {key:'type_test',label:"Type de test (boîte noire/grise/blanche)",type:'text',required:true},
      {key:'date_test',label:"Date prévue du test",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TEST D'INTRUSION (PENTEST)</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Objet et autorisation</h2><p>Le Client autorise expressément le Prestataire à réaliser des tests d'intrusion de type <strong>{{type_test}}</strong> sur le périmètre suivant : {{perimetre_test}}.</p><h2>Article 2 – Date d'exécution</h2><p>Les tests sont planifiés le <strong>{{date_test}}</strong>.</p><h2>Article 3 – Confidentialité</h2><p>Le Prestataire s'engage à la stricte confidentialité des vulnérabilités découvertes et à n'en faire aucun usage au-delà du périmètre contractuel.</p><h2>Article 4 – Livrables</h2><p>Un rapport détaillé comprenant les vulnérabilités identifiées, leur criticité (CVSS) et les recommandations de remédiation est remis dans les 10 jours ouvrés suivant les tests.</p></div>`
  },
  {
    code: 'inf3_vuln_management', name: "Accord de service de vulnerability management", category: 'commercial_financier', price: 11000, priceMax: 33000,
    description: "Accord de gestion continue des vulnérabilités incluant les scans périodiques, la priorisation et le suivi de la remédiation.", templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire",type:'text',required:true},
      {key:'client',label:"Client",type:'text',required:true},
      {key:'perimetre',label:"Périmètre des actifs couverts",type:'textarea',required:true},
      {key:'frequence_scans',label:"Fréquence des scans",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GESTION DES VULNÉRABILITÉS</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le Prestataire réalise des scans de vulnérabilités sur les actifs suivants : {{perimetre}}, à la fréquence : <strong>{{frequence_scans}}</strong>.</p><h2>Article 2 – Priorisation</h2><p>Les vulnérabilités sont classées selon le score CVSS et priorisées pour remédiation.</p><h2>Article 3 – Date d'effet</h2><p>Le présent accord prend effet le <strong>{{date_debut}}</strong>.</p><h2>Article 4 – Suivi</h2><p>Un tableau de bord de suivi de la remédiation est mis à disposition du Client en temps réel.</p></div>`
  },
  {
    code: 'inf3_pki', name: "Accord de service de PKI (infrastructure à clé publique)", category: 'commercial_financier', price: 12000, priceMax: 36000,
    description: "Contrat de déploiement et gestion d'une infrastructure à clé publique (PKI) pour la gestion des certificats numériques de l'organisation.", templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire PKI",type:'text',required:true},
      {key:'client',label:"Client",type:'text',required:true},
      {key:'usage_certificats',label:"Usages des certificats (TLS, signature, auth)",type:'textarea',required:true},
      {key:'nombre_certificats',label:"Volume estimé de certificats",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'INFRASTRUCTURE À CLÉ PUBLIQUE (PKI)</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le Prestataire déploie et opère une PKI pour les usages suivants : {{usage_certificats}}. Volume estimé : <strong>{{nombre_certificats}}</strong> certificats.</p><h2>Article 2 – Autorité de certification</h2><p>Le Prestataire opère les autorités de certification racine et intermédiaires selon les standards X.509 et les politiques de certification définies avec le Client.</p><h2>Article 3 – Date d'effet</h2><p>Le présent accord prend effet le <strong>{{date_debut}}</strong>.</p><h2>Article 4 – Révocation</h2><p>Un service de révocation (CRL/OCSP) est mis à disposition en permanence.</p></div>`
  },
  {
    code: 'inf3_signature_elec', name: "Accord de service de signature électronique qualifiée", category: 'commercial_financier', price: 8000, priceMax: 24000,
    description: "Accord pour la fourniture de services de signature électronique qualifiée conformes à la législation ivoirienne et aux standards ETSI.", templateType: 'pdf', classe: 'B', active: true, popularity: 77,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire de signature",type:'text',required:true},
      {key:'client',label:"Client",type:'text',required:true},
      {key:'volume_signatures',label:"Volume mensuel estimé de signatures",type:'text',required:true},
      {key:'types_documents',label:"Types de documents à signer",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SIGNATURE ÉLECTRONIQUE QUALIFIÉE</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le Prestataire fournit un service de signature électronique qualifiée pour les documents suivants : {{types_documents}}. Volume estimé : <strong>{{volume_signatures}}</strong> signatures/mois.</p><h2>Article 2 – Valeur juridique</h2><p>Les signatures produites sont conformes à la loi ivoirienne sur les transactions électroniques et disposent d'une valeur juridique équivalente à la signature manuscrite.</p><h2>Article 3 – Date d'effet</h2><p>Le présent accord prend effet le <strong>{{date_debut}}</strong>.</p><h2>Article 4 – Horodatage</h2><p>Chaque signature est accompagnée d'un horodatage électronique qualifié garantissant la date et l'heure de signature.</p></div>`
  },
  {
    code: 'inf3_horodatage', name: "Accord de service de horodatage électronique", category: 'commercial_financier', price: 6000, priceMax: 18000,
    description: "Contrat de fourniture de jetons d'horodatage électronique qualifié pour prouver l'existence et l'intégrité de documents à un instant donné.", templateType: 'pdf', classe: 'B', active: true, popularity: 52,
    fieldsJson: F([
      {key:'prestataire',label:"Autorité d'horodatage",type:'text',required:true},
      {key:'client',label:"Client",type:'text',required:true},
      {key:'volume_jetons',label:"Volume mensuel de jetons",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE HORODATAGE ÉLECTRONIQUE</h1><p>Entre <strong>{{prestataire}}</strong> (Autorité de Horodatage) et <strong>{{client}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le Prestataire émet des jetons d'horodatage électronique qualifié au volume de <strong>{{volume_jetons}}</strong> par mois.</p><h2>Article 2 – Conformité</h2><p>Les jetons sont conformes à la norme RFC 3161 et à la réglementation ivoirienne sur les transactions électroniques.</p><h2>Article 3 – Date d'effet</h2><p>Le présent accord prend effet le <strong>{{date_debut}}</strong>.</p><h2>Article 4 – Archivage</h2><p>Les jetons émis sont archivés pendant une durée minimale de 10 ans.</p></div>`
  },
  {
    code: 'inf3_coffre_numerique', name: "Accord de service de coffre-fort numérique", category: 'commercial_financier', price: 9000, priceMax: 27000,
    description: "Accord de service de coffre-fort numérique pour l'archivage sécurisé et pérenne de documents électroniques avec garantie d'intégrité et d'authenticité.", templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire coffre-fort",type:'text',required:true},
      {key:'client',label:"Client",type:'text',required:true},
      {key:'volume_stockage',label:"Volume de stockage alloué",type:'text',required:true},
      {key:'duree_conservation',label:"Durée de conservation garantie",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE COFFRE-FORT NUMÉRIQUE</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le Prestataire fournit un coffre-fort numérique d'une capacité de <strong>{{volume_stockage}}</strong> pour l'archivage sécurisé des documents du Client.</p><h2>Article 2 – Durée de conservation</h2><p>Les documents sont conservés pendant <strong>{{duree_conservation}}</strong> avec garantie d'intégrité et d'authenticité.</p><h2>Article 3 – Date d'effet</h2><p>Le présent accord prend effet le <strong>{{date_debut}}</strong>.</p><h2>Article 4 – Intégrité</h2><p>Le Prestataire garantit l'intégrité des documents par empreinte cryptographique et horodatage à chaque dépôt.</p></div>`
  },
  {
    code: 'inf3_accord_artci', name: "Accord de partenariat entreprise-ARTCI (conformité)", category: 'commercial_financier', price: 7000, priceMax: 21000,
    description: "Accord formalisant le partenariat entre une entreprise du numérique et l'ARTCI pour la mise en conformité réglementaire des services numériques.", templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'entreprise',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'representant',label:"Représentant légal",type:'text',required:true},
      {key:'services_concernes',label:"Services numériques concernés",type:'textarea',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT ENTREPRISE-ARTCI</h1><p>Entre l'Autorité de Régulation des Télécommunications/TIC de Côte d'Ivoire (ARTCI) et <strong>{{entreprise}}</strong>, représentée par <strong>{{representant}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le présent accord formalise les engagements de conformité réglementaire des services suivants : {{services_concernes}}.</p><h2>Article 2 – Obligations de l'entreprise</h2><p>L'entreprise s'engage à respecter l'ensemble des textes réglementaires édictés par l'ARTCI et à notifier tout changement significatif de ses services.</p><h2>Article 3 – Date d'effet</h2><p>Le présent accord est signé le <strong>{{date_accord}}</strong>.</p><h2>Article 4 – Contrôle</h2><p>L'ARTCI se réserve le droit de procéder à des audits de conformité avec un préavis de 30 jours.</p></div>`
  },
  {
    code: 'inf3_formation_secu', name: "Accord de service de formation en sécurité informatique", category: 'commercial_financier', price: 6000, priceMax: 18000,
    description: "Contrat de prestation de formation en cybersécurité pour les équipes du client, couvrant les bases et les pratiques avancées de sécurité informatique.", templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'prestataire',label:"Organisme de formation",type:'text',required:true},
      {key:'client',label:"Client",type:'text',required:true},
      {key:'nombre_stagiaires',label:"Nombre de stagiaires",type:'text',required:true},
      {key:'programme',label:"Programme de formation",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début de la formation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FORMATION EN SÉCURITÉ INFORMATIQUE</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le Prestataire réalise une formation en sécurité informatique pour <strong>{{nombre_stagiaires}}</strong> stagiaires selon le programme suivant : {{programme}}.</p><h2>Article 2 – Date de début</h2><p>La formation débute le <strong>{{date_debut}}</strong>.</p><h2>Article 3 – Évaluation</h2><p>Une évaluation des acquis est réalisée en fin de formation et une attestation de participation est remise à chaque stagiaire.</p><h2>Article 4 – Confidentialité</h2><p>Les contenus pédagogiques sont confidentiels et ne peuvent être reproduits sans accord écrit du Prestataire.</p></div>`
  },
  {
    code: 'inf3_rapport_perf_it', name: "Rapport de performance infrastructure IT", category: 'commercial_financier', price: 5000, priceMax: 15000,
    description: "Modèle de rapport de performance de l'infrastructure informatique mesurant disponibilité, capacité, incidents et tendances.", templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'redacteur',label:"Rédacteur du rapport",type:'text',required:true},
      {key:'periode',label:"Période couverte",type:'text',required:true},
      {key:'disponibilite_globale',label:"Disponibilité globale (%)",type:'text',required:true},
      {key:'incidents_majeurs',label:"Résumé des incidents majeurs",type:'textarea',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE INFRASTRUCTURE IT</h1><p>Période : <strong>{{periode}}</strong> | Rédacteur : <strong>{{redacteur}}</strong> | Date : <strong>{{date_rapport}}</strong></p><h2>1. Disponibilité globale</h2><p>Disponibilité mesurée sur la période : <strong>{{disponibilite_globale}}</strong></p><h2>2. Incidents majeurs</h2><p>{{incidents_majeurs}}</p><h2>3. Capacité et tendances</h2><p>Analyse de la consommation des ressources et projections pour les prochains mois.</p><h2>4. Recommandations</h2><p>Actions correctives et préventives proposées pour améliorer la performance et la résilience.</p></div>`
  },
  {
    code: 'inf3_plan_transfo_num', name: "Plan de transformation numérique", category: 'commercial_financier', price: 8000, priceMax: 24000,
    description: "Document stratégique définissant la feuille de route de transformation numérique d'une organisation, ses objectifs, ses étapes et ses indicateurs de succès.", templateType: 'pdf', classe: 'B', active: true, popularity: 73,
    fieldsJson: F([
      {key:'organisation',label:"Nom de l'organisation",type:'text',required:true},
      {key:'directeur_numerique',label:"Directeur du numérique",type:'text',required:true},
      {key:'vision',label:"Vision numérique à 3-5 ans",type:'textarea',required:true},
      {key:'axes_prioritaires',label:"Axes prioritaires de transformation",type:'textarea',required:true},
      {key:'date_document',label:"Date du document",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE TRANSFORMATION NUMÉRIQUE</h1><p>Organisation : <strong>{{organisation}}</strong> | Responsable : <strong>{{directeur_numerique}}</strong> | Date : <strong>{{date_document}}</strong></p><h2>1. Vision</h2><p>{{vision}}</p><h2>2. Axes prioritaires</h2><p>{{axes_prioritaires}}</p><h2>3. Gouvernance</h2><p>Un comité de transformation numérique est constitué pour piloter la mise en œuvre du plan et rendre compte trimestriellement à la direction générale.</p><h2>4. Financement et ressources</h2><p>Les ressources nécessaires à la transformation sont identifiées et budgétisées dans le cadre du plan pluriannuel d'investissement.</p></div>`
  },
  {
    code: 'inf3_charte_souv_num', name: "Charte de la souveraineté numérique africaine", category: 'commercial_financier', price: 5000, priceMax: 15000,
    description: "Document de positionnement stratégique affirmant les principes de souveraineté numérique d'une organisation africaine sur ses données et infrastructures.", templateType: 'pdf', classe: 'B', active: true, popularity: 61,
    fieldsJson: F([
      {key:'organisation',label:"Nom de l'organisation",type:'text',required:true},
      {key:'signataire',label:"Signataire",type:'text',required:true},
      {key:'engagements',label:"Engagements de souveraineté numérique",type:'textarea',required:true},
      {key:'date_charte',label:"Date de la charte",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE LA SOUVERAINETÉ NUMÉRIQUE AFRICAINE</h1><p>Adoptée par <strong>{{organisation}}</strong>, représentée par <strong>{{signataire}}</strong>, le <strong>{{date_charte}}</strong>.</p><h2>Préambule</h2><p>Convaincue que la maîtrise des données et des infrastructures numériques constitue un enjeu stratégique pour le développement économique et l'indépendance technologique de l'Afrique, notre organisation adopte la présente charte.</p><h2>Nos engagements</h2><p>{{engagements}}</p><h2>Principes directeurs</h2><p>1. Hébergement prioritaire des données sur le territoire africain.<br/>2. Promotion des technologies et talents africains.<br/>3. Interopérabilité et standards ouverts.<br/>4. Protection des droits numériques des citoyens.</p><h2>Mise en œuvre</h2><p>Les principes de cette charte sont intégrés dans toutes nos décisions d'achat, de déploiement et de gouvernance numérique.</p></div>`
  },

  // ─── SOC / CYBERSÉCURITÉ AVANCÉE (sec3_) ───
  {
    code: 'sec3_soc_service', name: "Accord de service de centre opérationnel de sécurité (SOC)", category: 'commercial_financier', price: 18000, priceMax: 54000,
    description: "Contrat d'externalisation du centre opérationnel de sécurité (SOC) assurant la surveillance continue, la détection et la coordination de la réponse aux incidents.", templateType: 'pdf', classe: 'B', active: true, popularity: 85,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire SOC",type:'text',required:true},
      {key:'client',label:"Client",type:'text',required:true},
      {key:'perimetre',label:"Périmètre surveillé",type:'textarea',required:true},
      {key:'niveau_service',label:"Niveau de service SOC (Tier 1/2/3)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'escalade',label:"Procédure d'escalade",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CENTRE OPÉRATIONNEL DE SÉCURITÉ (SOC)</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le Prestataire opère un SOC de niveau <strong>{{niveau_service}}</strong> couvrant : {{perimetre}}.</p><h2>Article 2 – Surveillance</h2><p>La surveillance est assurée 24h/24, 7j/7, 365j/an par des analystes certifiés.</p><h2>Article 3 – Escalade</h2><p>{{escalade}}</p><h2>Article 4 – Date d'effet</h2><p>Le présent accord prend effet le <strong>{{date_debut}}</strong>.</p><h2>Article 5 – Reporting</h2><p>Un rapport hebdomadaire d'activité SOC est remis au Client avec les métriques de détection et de réponse.</p></div>`
  },
  {
    code: 'sec3_surveillance_24_7', name: "Accord de service de surveillance 24/7 des cybermenaces", category: 'commercial_financier', price: 16000, priceMax: 48000,
    description: "Contrat de surveillance continue 24h/24 des cybermenaces pesant sur le système d'information du client, avec alertes en temps réel.", templateType: 'pdf', classe: 'B', active: true, popularity: 80,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire surveillance",type:'text',required:true},
      {key:'client',label:"Client",type:'text',required:true},
      {key:'sources_surveillance',label:"Sources de surveillance (logs, flux réseaux...)",type:'textarea',required:true},
      {key:'delai_alerte',label:"Délai maximal d'alerte",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SURVEILLANCE 24/7 DES CYBERMENACES</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le Prestataire assure une surveillance continue des sources suivantes : {{sources_surveillance}}.</p><h2>Article 2 – Délai d'alerte</h2><p>Toute menace qualifiée est notifiée au Client dans un délai maximal de <strong>{{delai_alerte}}</strong>.</p><h2>Article 3 – Date d'effet</h2><p>Le présent accord prend effet le <strong>{{date_debut}}</strong>.</p><h2>Article 4 – Qualification des alertes</h2><p>Chaque alerte est qualifiée selon une grille de criticité (P1 à P4) et accompagnée d'une analyse préliminaire et de recommandations immédiates.</p></div>`
  },
  {
    code: 'sec3_csirt', name: "Accord de service de réponse à incident de cybersécurité (CSIRT)", category: 'commercial_financier', price: 15000, priceMax: 45000,
    description: "Contrat de mise à disposition d'une équipe CSIRT pour la gestion et la coordination de la réponse aux incidents de cybersécurité.", templateType: 'pdf', classe: 'B', active: true, popularity: 78,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire CSIRT",type:'text',required:true},
      {key:'client',label:"Client",type:'text',required:true},
      {key:'temps_intervention',label:"Délai d'intervention garanti",type:'text',required:true},
      {key:'perimetre',label:"Périmètre d'intervention",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RÉPONSE À INCIDENT DE CYBERSÉCURITÉ (CSIRT)</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le Prestataire met à disposition une équipe CSIRT pour répondre aux incidents de cybersécurité affectant : {{perimetre}}.</p><h2>Article 2 – Délai d'intervention</h2><p>L'équipe CSIRT est mobilisée dans un délai de <strong>{{temps_intervention}}</strong> après déclaration d'un incident.</p><h2>Article 3 – Date d'effet</h2><p>Le présent accord prend effet le <strong>{{date_debut}}</strong>.</p><h2>Article 4 – Livrables post-incident</h2><p>Un rapport de post-mortem est remis au Client dans les 5 jours ouvrés suivant la clôture de chaque incident majeur.</p></div>`
  },
  {
    code: 'sec3_forensics', name: "Accord de service de forensics numérique (investigation)", category: 'commercial_financier', price: 14000, priceMax: 42000,
    description: "Contrat d'investigation numérique forensique pour la collecte, la préservation et l'analyse de preuves numériques suite à un incident de sécurité.", templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire forensics",type:'text',required:true},
      {key:'client',label:"Client",type:'text',required:true},
      {key:'perimetre_investigation',label:"Périmètre de l'investigation",type:'textarea',required:true},
      {key:'date_mission',label:"Date de la mission",type:'date',required:true},
      {key:'objectif_investigation',label:"Objectif de l'investigation",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FORENSICS NUMÉRIQUE</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le Prestataire réalise une investigation forensique sur le périmètre suivant : {{perimetre_investigation}}.</p><h2>Article 2 – Objectif</h2><p>{{objectif_investigation}}</p><h2>Article 3 – Date de mission</h2><p>La mission débute le <strong>{{date_mission}}</strong>.</p><h2>Article 4 – Chaîne de custody</h2><p>Le Prestataire respecte les procédures de chaîne de custody garantissant la recevabilité des preuves collectées devant les juridictions ivoiriennes.</p><h2>Article 5 – Confidentialité</h2><p>Les résultats de l'investigation sont strictement confidentiels et remis exclusivement au Client.</p></div>`
  },
  {
    code: 'sec3_threat_intel', name: "Accord de service de threat intelligence (renseignement cybermenaces)", category: 'commercial_financier', price: 12000, priceMax: 36000,
    description: "Accord de service de renseignement sur les cybermenaces ciblant le secteur du client, avec flux d'indicateurs de compromission et briefings stratégiques.", templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire threat intelligence",type:'text',required:true},
      {key:'client',label:"Client",type:'text',required:true},
      {key:'secteur_client',label:"Secteur d'activité du client",type:'text',required:true},
      {key:'formats_livraison',label:"Formats de livraison (STIX/TAXII, rapports...)",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE THREAT INTELLIGENCE</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le Prestataire fournit des renseignements sur les cybermenaces ciblant le secteur <strong>{{secteur_client}}</strong>.</p><h2>Article 2 – Livrables</h2><p>{{formats_livraison}}</p><h2>Article 3 – Date d'effet</h2><p>Le présent accord prend effet le <strong>{{date_debut}}</strong>.</p><h2>Article 4 – Fréquence</h2><p>Les indicateurs de compromission sont mis à jour quotidiennement. Un briefing stratégique mensuel est organisé avec les équipes du Client.</p></div>`
  },
  {
    code: 'sec3_red_team', name: "Accord de service de red team (simulation d'attaque)", category: 'commercial_financier', price: 18000, priceMax: 54000,
    description: "Contrat d'autorisation et d'exécution d'exercices red team simulant des attaquants réels pour tester la capacité de détection et de réponse de l'organisation.", templateType: 'pdf', classe: 'B', active: true, popularity: 75,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire red team",type:'text',required:true},
      {key:'client',label:"Client",type:'text',required:true},
      {key:'objectifs_exercice',label:"Objectifs de l'exercice",type:'textarea',required:true},
      {key:'perimetre_autorise',label:"Périmètre autorisé",type:'textarea',required:true},
      {key:'date_exercice',label:"Période de l'exercice",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RED TEAM</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Autorisation</h2><p>Le Client autorise expressément le Prestataire à mener un exercice de simulation d'attaque dans le périmètre : {{perimetre_autorise}}.</p><h2>Article 2 – Objectifs</h2><p>{{objectifs_exercice}}</p><h2>Article 3 – Période</h2><p>L'exercice se déroule à compter du <strong>{{date_exercice}}</strong>.</p><h2>Article 4 – Règles d'engagement</h2><p>Les règles d'engagement sont définies conjointement avant le début de l'exercice et formalisées en annexe. Toute action non couverte requiert une autorisation préalable explicite.</p><h2>Article 5 – Debriefing</h2><p>Un debriefing complet avec le management et les équipes de sécurité est organisé à l'issue de l'exercice.</p></div>`
  },
  {
    code: 'sec3_purple_team', name: "Accord de service de purple team", category: 'commercial_financier', price: 16000, priceMax: 48000,
    description: "Contrat d'exercice purple team combinant les compétences offensives (red team) et défensives (blue team) pour améliorer les capacités de détection et de réponse.", templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire purple team",type:'text',required:true},
      {key:'client',label:"Client",type:'text',required:true},
      {key:'scenarios_attaque',label:"Scénarios d'attaque à tester",type:'textarea',required:true},
      {key:'equipe_blue',label:"Composition de l'équipe blue interne",type:'text',required:true},
      {key:'date_exercice',label:"Date de l'exercice",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PURPLE TEAM</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Objet</h2><p>Exercice collaboratif red/blue team visant à améliorer les capacités de détection et de réponse du Client sur les scénarios suivants : {{scenarios_attaque}}.</p><h2>Article 2 – Équipes</h2><p>Équipe blue interne : <strong>{{equipe_blue}}</strong>. Équipe red : consultants du Prestataire.</p><h2>Article 3 – Date</h2><p>L'exercice est programmé le <strong>{{date_exercice}}</strong>.</p><h2>Article 4 – Amélioration continue</h2><p>Les gaps de détection identifiés sont documentés avec des recommandations de remédiation priorisées selon leur criticité.</p></div>`
  },
  {
    code: 'sec3_phishing_simule', name: "Accord de service de phishing simulé (sensibilisation)", category: 'commercial_financier', price: 6000, priceMax: 18000,
    description: "Contrat de campagnes de phishing simulé pour évaluer et renforcer la vigilance des collaborateurs face aux attaques par hameçonnage.", templateType: 'pdf', classe: 'B', active: true, popularity: 79,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire phishing simulé",type:'text',required:true},
      {key:'client',label:"Client",type:'text',required:true},
      {key:'nombre_cibles',label:"Nombre de destinataires ciblés",type:'text',required:true},
      {key:'frequence_campagnes',label:"Fréquence des campagnes",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PHISHING SIMULÉ</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le Prestataire réalise des campagnes de phishing simulé ciblant <strong>{{nombre_cibles}}</strong> collaborateurs du Client à la fréquence de <strong>{{frequence_campagnes}}</strong>.</p><h2>Article 2 – Confidentialité</h2><p>Les dates et scénarios de campagne sont confidentiels pour garantir l'authenticité des résultats.</p><h2>Article 3 – Date de début</h2><p>Le programme débute le <strong>{{date_debut}}</strong>.</p><h2>Article 4 – Formation</h2><p>Les collaborateurs ayant cliqué sur les liens simulés reçoivent automatiquement un module de sensibilisation en ligne.</p></div>`
  },
  {
    code: 'sec3_patch_management', name: "Accord de service de gestion des vulnérabilités (patch management)", category: 'commercial_financier', price: 9000, priceMax: 27000,
    description: "Accord de gestion des correctifs de sécurité (patch management) couvrant la qualification, le déploiement et le suivi des mises à jour sur le parc informatique.", templateType: 'pdf', classe: 'B', active: true, popularity: 73,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire patch management",type:'text',required:true},
      {key:'client',label:"Client",type:'text',required:true},
      {key:'parc_couvert',label:"Parc informatique couvert",type:'textarea',required:true},
      {key:'sla_patch_critique',label:"SLA patch critique (délai de déploiement)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GESTION DES CORRECTIFS (PATCH MANAGEMENT)</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le Prestataire gère les correctifs de sécurité pour le parc suivant : {{parc_couvert}}.</p><h2>Article 2 – SLA</h2><p>Les correctifs critiques sont déployés dans un délai maximal de <strong>{{sla_patch_critique}}</strong> après leur publication.</p><h2>Article 3 – Date d'effet</h2><p>Le présent accord prend effet le <strong>{{date_debut}}</strong>.</p><h2>Article 4 – Fenêtres de maintenance</h2><p>Les déploiements sont réalisés durant des fenêtres de maintenance planifiées pour minimiser l'impact sur la production.</p></div>`
  },
  {
    code: 'sec3_hardening', name: "Accord de service de durcissement des systèmes (hardening)", category: 'commercial_financier', price: 10000, priceMax: 30000,
    description: "Contrat de prestation de durcissement des configurations systèmes et réseaux selon les référentiels CIS Benchmarks et bonnes pratiques de sécurité.", templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire hardening",type:'text',required:true},
      {key:'client',label:"Client",type:'text',required:true},
      {key:'systemes_cibles',label:"Systèmes à durcir",type:'textarea',required:true},
      {key:'referentiel',label:"Référentiel appliqué (CIS, ANSSI...)",type:'text',required:true},
      {key:'date_mission',label:"Date de mission",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DURCISSEMENT DES SYSTÈMES</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le Prestataire durcit les configurations des systèmes suivants : {{systemes_cibles}}, selon le référentiel <strong>{{referentiel}}</strong>.</p><h2>Article 2 – Méthodologie</h2><p>Un audit de l'état initial est réalisé, suivi d'un plan de remédiation validé avec le Client avant toute modification.</p><h2>Article 3 – Date de mission</h2><p>La mission débute le <strong>{{date_mission}}</strong>.</p><h2>Article 4 – Livrables</h2><p>Rapport d'audit initial, plan de durcissement, rapport post-implémentation avec score de conformité.</p></div>`
  },
  {
    code: 'sec3_waf', name: "Accord de service de sécurité des applications web (WAF)", category: 'commercial_financier', price: 10000, priceMax: 30000,
    description: "Accord de déploiement et gestion d'un pare-feu applicatif web (WAF) protégeant les applications du client contre les attaques OWASP Top 10.", templateType: 'pdf', classe: 'B', active: true, popularity: 71,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire WAF",type:'text',required:true},
      {key:'client',label:"Client",type:'text',required:true},
      {key:'applications_protegees',label:"Applications web protégées",type:'textarea',required:true},
      {key:'mode_waf',label:"Mode WAF (détection/prévention)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SÉCURITÉ DES APPLICATIONS WEB (WAF)</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le Prestataire déploie et gère un WAF en mode <strong>{{mode_waf}}</strong> protégeant les applications : {{applications_protegees}}.</p><h2>Article 2 – Protection</h2><p>Le WAF protège contre les vulnérabilités OWASP Top 10, les attaques DDoS applicatives et les bots malveillants.</p><h2>Article 3 – Date d'effet</h2><p>Le présent accord prend effet le <strong>{{date_debut}}</strong>.</p><h2>Article 4 – Tuning</h2><p>Un processus de tuning régulier est mis en place pour réduire les faux positifs et adapter les règles à l'évolution des applications.</p></div>`
  },
  {
    code: 'sec3_api_security', name: "Accord de service de sécurité des API", category: 'commercial_financier', price: 9000, priceMax: 27000,
    description: "Contrat de sécurisation des API (inventaire, test, protection runtime) pour prévenir les attaques ciblant les interfaces de programmation exposées.", templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire sécurité API",type:'text',required:true},
      {key:'client',label:"Client",type:'text',required:true},
      {key:'api_concernees',label:"API concernées",type:'textarea',required:true},
      {key:'nombre_api',label:"Nombre d'API",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SÉCURITÉ DES API</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le Prestataire sécurise <strong>{{nombre_api}}</strong> API du Client, notamment : {{api_concernees}}.</p><h2>Article 2 – Périmètre</h2><p>Inventaire et classification des API, tests de sécurité automatisés, protection runtime contre les attaques OWASP API Top 10.</p><h2>Article 3 – Date d'effet</h2><p>Le présent accord prend effet le <strong>{{date_debut}}</strong>.</p><h2>Article 4 – Gouvernance API</h2><p>Un portail de gestion API est mis en place pour centraliser l'authentification, la limitation de débit et la journalisation des accès.</p></div>`
  },
  {
    code: 'sec3_mobile_security', name: "Accord de service de sécurité mobile (MAM/MDM)", category: 'commercial_financier', price: 8000, priceMax: 24000,
    description: "Accord de gestion de la sécurité des appareils mobiles (MDM) et des applications mobiles (MAM) du parc de terminaux professionnels.", templateType: 'pdf', classe: 'B', active: true, popularity: 67,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire MDM/MAM",type:'text',required:true},
      {key:'client',label:"Client",type:'text',required:true},
      {key:'nombre_terminaux',label:"Nombre de terminaux gérés",type:'text',required:true},
      {key:'plateformes',label:"Plateformes mobiles (iOS, Android...)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SÉCURITÉ MOBILE (MAM/MDM)</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le Prestataire gère la sécurité de <strong>{{nombre_terminaux}}</strong> terminaux mobiles sur les plateformes <strong>{{plateformes}}</strong>.</p><h2>Article 2 – Fonctionnalités</h2><p>Enrôlement des terminaux, application des politiques de sécurité, effacement à distance, déploiement d'applications, détection de jailbreak/root.</p><h2>Article 3 – Date d'effet</h2><p>Le présent accord prend effet le <strong>{{date_debut}}</strong>.</p><h2>Article 4 – Vie privée</h2><p>Les politiques de gestion respectent la vie privée des utilisateurs et font l'objet d'une charte communiquée à l'ensemble des collaborateurs.</p></div>`
  },
  {
    code: 'sec3_devsecops', name: "Accord de service de DevSecOps", category: 'commercial_financier', price: 13000, priceMax: 39000,
    description: "Contrat d'intégration des pratiques de sécurité dans les pipelines de développement logiciel (DevSecOps) pour sécuriser le cycle de vie applicatif.", templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire DevSecOps",type:'text',required:true},
      {key:'client',label:"Client",type:'text',required:true},
      {key:'pipelines_cibles',label:"Pipelines CI/CD concernés",type:'textarea',required:true},
      {key:'outils_securite',label:"Outils de sécurité intégrés (SAST, DAST, SCA...)",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DEVSECOPS</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le Prestataire intègre des contrôles de sécurité dans les pipelines CI/CD suivants : {{pipelines_cibles}}.</p><h2>Article 2 – Outils intégrés</h2><p>{{outils_securite}}</p><h2>Article 3 – Date d'effet</h2><p>Le présent accord prend effet le <strong>{{date_debut}}</strong>.</p><h2>Article 4 – Security gates</h2><p>Des seuils de sécurité (security gates) sont configurés pour bloquer automatiquement les déploiements présentant des vulnérabilités critiques non remédiées.</p></div>`
  },
  {
    code: 'sec3_iot_security', name: "Accord de service de sécurité IoT", category: 'commercial_financier', price: 11000, priceMax: 33000,
    description: "Accord de sécurisation des objets connectés (IoT) industriels ou commerciaux du client, incluant l'inventaire, le durcissement et la surveillance.", templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire sécurité IoT",type:'text',required:true},
      {key:'client',label:"Client",type:'text',required:true},
      {key:'equipements_iot',label:"Équipements IoT concernés",type:'textarea',required:true},
      {key:'nombre_objets',label:"Nombre d'objets connectés",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SÉCURITÉ IoT</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le Prestataire sécurise <strong>{{nombre_objets}}</strong> objets connectés du Client, notamment : {{equipements_iot}}.</p><h2>Article 2 – Prestations</h2><p>Inventaire et cartographie, évaluation des risques, durcissement des configurations, segmentation réseau, surveillance des communications.</p><h2>Article 3 – Date d'effet</h2><p>Le présent accord prend effet le <strong>{{date_debut}}</strong>.</p><h2>Article 4 – Gestion du cycle de vie</h2><p>Un processus de gestion du cycle de vie des firmwares est mis en place pour garantir la mise à jour régulière des équipements.</p></div>`
  },
  {
    code: 'sec3_ot_ics', name: "Accord de service de sécurité industrielle (OT/ICS)", category: 'commercial_financier', price: 16000, priceMax: 48000,
    description: "Accord de sécurisation des systèmes de contrôle industriel (ICS/SCADA/OT) avec préservation de la disponibilité opérationnelle.", templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire OT/ICS",type:'text',required:true},
      {key:'client',label:"Client",type:'text',required:true},
      {key:'systemes_ot',label:"Systèmes OT/ICS concernés",type:'textarea',required:true},
      {key:'sites_industriels',label:"Sites industriels couverts",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SÉCURITÉ INDUSTRIELLE (OT/ICS)</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le Prestataire sécurise les systèmes OT/ICS suivants : {{systemes_ot}}, sur les sites : <strong>{{sites_industriels}}</strong>.</p><h2>Article 2 – Principes</h2><p>La disponibilité opérationnelle est la priorité absolue. Toute intervention est réalisée sans impact sur la production, hors fenêtres de maintenance planifiées.</p><h2>Article 3 – Date d'effet</h2><p>Le présent accord prend effet le <strong>{{date_debut}}</strong>.</p><h2>Article 4 – Segmentation</h2><p>Une architecture de segmentation OT/IT est mise en place pour isoler les systèmes industriels du réseau d'entreprise.</p></div>`
  },
  {
    code: 'sec3_pam', name: "Accord de service de gestion des accès privilégiés (PAM)", category: 'commercial_financier', price: 11000, priceMax: 33000,
    description: "Contrat de déploiement et gestion d'une solution PAM (Privileged Access Management) contrôlant et traçant les accès des comptes à privilèges élevés.", templateType: 'pdf', classe: 'B', active: true, popularity: 69,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire PAM",type:'text',required:true},
      {key:'client',label:"Client",type:'text',required:true},
      {key:'comptes_privilegies',label:"Comptes privilégiés gérés",type:'textarea',required:true},
      {key:'nombre_comptes',label:"Nombre de comptes",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GESTION DES ACCÈS PRIVILÉGIÉS (PAM)</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le Prestataire déploie une solution PAM gérant <strong>{{nombre_comptes}}</strong> comptes privilégiés, notamment : {{comptes_privilegies}}.</p><h2>Article 2 – Fonctionnalités</h2><p>Coffre-fort de mots de passe, enregistrement des sessions, approbation des accès, rotation automatique des credentials.</p><h2>Article 3 – Date d'effet</h2><p>Le présent accord prend effet le <strong>{{date_debut}}</strong>.</p><h2>Article 4 – Audit</h2><p>Toutes les sessions privilégiées sont enregistrées et conservées pendant 12 mois pour des besoins d'audit et d'investigation.</p></div>`
  },
  {
    code: 'sec3_dlp', name: "Accord de service de DLP (prévention des fuites de données)", category: 'commercial_financier', price: 12000, priceMax: 36000,
    description: "Accord de déploiement et gestion d'une solution DLP (Data Loss Prevention) pour prévenir la divulgation non autorisée de données sensibles.", templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire DLP",type:'text',required:true},
      {key:'client',label:"Client",type:'text',required:true},
      {key:'canaux_surveilles',label:"Canaux surveillés (email, web, USB...)",type:'textarea',required:true},
      {key:'donnees_sensibles',label:"Types de données sensibles protégées",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DLP (PRÉVENTION DES FUITES DE DONNÉES)</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le Prestataire déploie une solution DLP surveill les canaux suivants : {{canaux_surveilles}}, protégeant les données : {{donnees_sensibles}}.</p><h2>Article 2 – Modes de réponse</h2><p>Les politiques DLP sont configurées en mode audit, puis progressivement en mode blocage après validation avec le Client.</p><h2>Article 3 – Date d'effet</h2><p>Le présent accord prend effet le <strong>{{date_debut}}</strong>.</p><h2>Article 4 – Conformité RGPD/loi ivoirienne</h2><p>La solution est configurée dans le respect de la réglementation sur la protection des données à caractère personnel.</p></div>`
  },
  {
    code: 'sec3_casb', name: "Accord de service de CASB (cloud access security broker)", category: 'commercial_financier', price: 11000, priceMax: 33000,
    description: "Contrat de déploiement d'un CASB contrôlant et sécurisant l'utilisation des services cloud par les collaborateurs du client.", templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire CASB",type:'text',required:true},
      {key:'client',label:"Client",type:'text',required:true},
      {key:'services_cloud_couverts',label:"Services cloud couverts",type:'textarea',required:true},
      {key:'nombre_utilisateurs',label:"Nombre d'utilisateurs",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CASB</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le Prestataire déploie un CASB contrôlant l'usage des services cloud suivants pour <strong>{{nombre_utilisateurs}}</strong> utilisateurs : {{services_cloud_couverts}}.</p><h2>Article 2 – Fonctionnalités</h2><p>Visibilité sur le Shadow IT, contrôle des accès, prévention des fuites de données, détection des comportements anormaux.</p><h2>Article 3 – Date d'effet</h2><p>Le présent accord prend effet le <strong>{{date_debut}}</strong>.</p><h2>Article 4 – Shadow IT</h2><p>Un rapport mensuel sur les usages non autorisés de services cloud est fourni au Client avec recommandations.</p></div>`
  },
  {
    code: 'sec3_cert_ci', name: "Accord de partenariat CERT national (CERT-CI)", category: 'commercial_financier', price: 7000, priceMax: 21000,
    description: "Accord formalisant le partenariat entre une organisation et le CERT-CI (Computer Emergency Response Team de Côte d'Ivoire) pour la gestion collaborative des incidents.", templateType: 'pdf', classe: 'B', active: true, popularity: 61,
    fieldsJson: F([
      {key:'organisation',label:"Nom de l'organisation partenaire",type:'text',required:true},
      {key:'representant',label:"Représentant désigné",type:'text',required:true},
      {key:'engagements',label:"Engagements de l'organisation",type:'textarea',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT AVEC LE CERT-CI</h1><p>Entre le CERT-CI (Computer Emergency Response Team de Côte d'Ivoire) et <strong>{{organisation}}</strong>, représentée par <strong>{{representant}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le présent accord formalise le partenariat en matière de gestion collaborative des incidents de cybersécurité et de partage de renseignements sur les menaces.</p><h2>Article 2 – Engagements de l'organisation</h2><p>{{engagements}}</p><h2>Article 3 – Date d'effet</h2><p>Le présent accord est signé le <strong>{{date_accord}}</strong>.</p><h2>Article 4 – Échange d'informations</h2><p>Les informations partagées dans le cadre de ce partenariat sont soumises à la règle du Traffic Light Protocol (TLP) définie conjointement.</p></div>`
  },
  {
    code: 'sec3_iso27001_nis2', name: "Accord de conformité NIS2/ISO 27001", category: 'commercial_financier', price: 12000, priceMax: 36000,
    description: "Contrat d'accompagnement à la mise en conformité avec le cadre ISO 27001 et la directive NIS2 (applicable aux opérateurs de services essentiels).", templateType: 'pdf', classe: 'B', active: true, popularity: 67,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire conseil conformité",type:'text',required:true},
      {key:'client',label:"Organisation cliente",type:'text',required:true},
      {key:'referentiels',label:"Référentiels visés",type:'text',required:true},
      {key:'perimetre_smsi',label:"Périmètre du SMSI",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début de la mission",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CONFORMITÉ NIS2/ISO 27001</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le Prestataire accompagne le Client dans la mise en conformité avec les référentiels <strong>{{referentiels}}</strong> sur le périmètre SMSI suivant : {{perimetre_smsi}}.</p><h2>Article 2 – Méthodologie</h2><p>Analyse des écarts (gap analysis), plan de traitement des risques, mise en œuvre des contrôles, préparation à l'audit de certification.</p><h2>Article 3 – Date d'effet</h2><p>La mission débute le <strong>{{date_debut}}</strong>.</p><h2>Article 4 – Livrables</h2><p>Rapport de gap analysis, politique de sécurité de l'information, plan de traitement des risques, procédures et guides opérationnels.</p></div>`
  },
  {
    code: 'sec3_assurance_cyber', name: "Accord de service d'assurance cyber", category: 'commercial_financier', price: 10000, priceMax: 30000,
    description: "Contrat d'assurance contre les risques cyber couvrant les pertes financières, les frais de gestion d'incident et la responsabilité civile numérique.", templateType: 'pdf', classe: 'B', active: true, popularity: 74,
    fieldsJson: F([
      {key:'assureur',label:"Compagnie d'assurance",type:'text',required:true},
      {key:'assure',label:"Assuré",type:'text',required:true},
      {key:'montant_couverture',label:"Montant de couverture",type:'text',required:true},
      {key:'garanties',label:"Garanties souscrites",type:'textarea',required:true},
      {key:'date_effet',label:"Date d'effet de la police",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D'ASSURANCE CYBER</h1><p>Entre <strong>{{assureur}}</strong> (l'Assureur) et <strong>{{assure}}</strong> (l'Assuré).</p><h2>Article 1 – Objet</h2><p>Le présent contrat garantit l'Assuré contre les conséquences financières des risques cyber à hauteur de <strong>{{montant_couverture}}</strong>.</p><h2>Article 2 – Garanties</h2><p>{{garanties}}</p><h2>Article 3 – Date d'effet</h2><p>La police prend effet le <strong>{{date_effet}}</strong>.</p><h2>Article 4 – Obligations de l'Assuré</h2><p>L'Assuré s'engage à maintenir un niveau de sécurité conforme aux bonnes pratiques et à notifier tout incident susceptible d'engager la garantie dans un délai de 72 heures.</p><h2>Article 5 – Droit applicable</h2><p>Le présent contrat est régi par le droit ivoirien et le Code des assurances CIMA.</p></div>`
  },
  {
    code: 'sec3_rapport_maturite', name: "Rapport de maturité cybersécurité", category: 'commercial_financier', price: 8000, priceMax: 24000,
    description: "Modèle de rapport d'évaluation de la maturité cybersécurité d'une organisation selon un référentiel reconnu (CMMC, C2M2 ou équivalent).", templateType: 'pdf', classe: 'B', active: true, popularity: 76,
    fieldsJson: F([
      {key:'evaluateur',label:"Évaluateur",type:'text',required:true},
      {key:'organisation',label:"Organisation évaluée",type:'text',required:true},
      {key:'referentiel_maturite',label:"Référentiel de maturité utilisé",type:'text',required:true},
      {key:'score_global',label:"Score de maturité global",type:'text',required:true},
      {key:'date_evaluation',label:"Date d'évaluation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE MATURITÉ CYBERSÉCURITÉ</h1><p>Organisation : <strong>{{organisation}}</strong> | Évaluateur : <strong>{{evaluateur}}</strong> | Date : <strong>{{date_evaluation}}</strong></p><h2>1. Méthodologie</h2><p>Évaluation réalisée selon le référentiel <strong>{{referentiel_maturite}}</strong>.</p><h2>2. Score global</h2><p>Niveau de maturité global : <strong>{{score_global}}</strong></p><h2>3. Points forts</h2><p>Domaines où l'organisation démontre un niveau de maturité satisfaisant.</p><h2>4. Axes d'amélioration prioritaires</h2><p>Domaines nécessitant des actions correctives immédiates, classés par criticité et effort estimé.</p><h2>5. Plan de progrès recommandé</h2><p>Feuille de route sur 12 à 24 mois pour atteindre le niveau de maturité cible.</p></div>`
  },
  {
    code: 'sec3_plan_cybersecurite', name: "Plan de cybersécurité", category: 'commercial_financier', price: 7000, priceMax: 21000,
    description: "Document stratégique définissant les objectifs, les actions et les ressources nécessaires pour améliorer la posture de cybersécurité d'une organisation.", templateType: 'pdf', classe: 'B', active: true, popularity: 71,
    fieldsJson: F([
      {key:'organisation',label:"Nom de l'organisation",type:'text',required:true},
      {key:'rssi',label:"Responsable de la sécurité (RSSI)",type:'text',required:true},
      {key:'objectifs_securite',label:"Objectifs de sécurité prioritaires",type:'textarea',required:true},
      {key:'budget_alloue',label:"Budget alloué",type:'text',required:true},
      {key:'date_document',label:"Date du document",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE CYBERSÉCURITÉ</h1><p>Organisation : <strong>{{organisation}}</strong> | RSSI : <strong>{{rssi}}</strong> | Date : <strong>{{date_document}}</strong></p><h2>1. Contexte et enjeux</h2><p>Présentation du contexte de menaces cyber pesant sur l'organisation et des enjeux stratégiques associés.</p><h2>2. Objectifs prioritaires</h2><p>{{objectifs_securite}}</p><h2>3. Budget</h2><p>Budget cybersécurité alloué : <strong>{{budget_alloue}}</strong>, réparti entre les investissements technologiques, les ressources humaines et les formations.</p><h2>4. Gouvernance</h2><p>Le RSSI pilote la mise en œuvre du plan et rend compte trimestriellement au comité de direction.</p><h2>5. Indicateurs de pilotage</h2><p>KPI définis : taux de couverture des actifs critiques, délai moyen de détection (MTTD), délai moyen de réponse (MTTR), nombre de vulnérabilités critiques ouvertes.</p></div>`
  },
  {
    code: 'sec3_charte_cyber_nat', name: "Charte de la cybersécurité nationale", category: 'commercial_financier', price: 5000, priceMax: 15000,
    description: "Document d'adhésion aux principes de la cybersécurité nationale ivoirienne, formalisant les engagements d'une organisation envers la sécurité de l'écosystème numérique.", templateType: 'pdf', classe: 'B', active: true, popularity: 59,
    fieldsJson: F([
      {key:'organisation',label:"Nom de l'organisation",type:'text',required:true},
      {key:'signataire',label:"Signataire",type:'text',required:true},
      {key:'engagements_specifiques',label:"Engagements spécifiques de l'organisation",type:'textarea',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE LA CYBERSÉCURITÉ NATIONALE</h1><p>Signée par <strong>{{organisation}}</strong>, représentée par <strong>{{signataire}}</strong>, le <strong>{{date_signature}}</strong>.</p><h2>Préambule</h2><p>Dans le cadre de la Stratégie Nationale de Cybersécurité de la République de Côte d'Ivoire, notre organisation s'engage à contribuer activement à la sécurité de l'espace numérique national.</p><h2>Nos engagements</h2><p>{{engagements_specifiques}}</p><h2>Engagements généraux</h2><p>1. Signaler tout incident significatif aux autorités compétentes (ARTCI, CERT-CI).<br/>2. Former et sensibiliser nos collaborateurs aux bonnes pratiques de cybersécurité.<br/>3. Appliquer les recommandations de sécurité publiées par les autorités nationales.<br/>4. Participer aux exercices nationaux de cybersécurité.</p><h2>Durée</h2><p>Le présent engagement est reconduit annuellement par tacite reconduction.</p></div>`
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
  console.log(`Batch 88b OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
