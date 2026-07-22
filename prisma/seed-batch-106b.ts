import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ── 25 Cloud computing / DevOps / Infra IT ──────────────────────────────
  {
    code: 'inf5_iaas_cloud',
    name: "Accord de service de cloud computing IaaS",
    category: 'commercial_financier', price: 8000, priceMax: 24000,
    description: "Contrat de service cloud IaaS portant sur la fourniture de serveurs virtuels, stockage et réseau en Afrique de l'Ouest (OHADA).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'fournisseur_nom',label:"Nom du fournisseur cloud",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'capacite_vcpu',label:"Capacité vCPU allouée",type:'text',required:true},
      {key:'sla_disponibilite',label:"SLA de disponibilité (%)",type:'text',required:true},
      {key:'prix_mensuel',label:"Prix mensuel (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE CLOUD COMPUTING IaaS</h1>
<p>Entre <strong>{{fournisseur_nom}}</strong> (le Prestataire) et <strong>{{client_nom}}</strong> (le Client), il est convenu ce qui suit :</p>
<h2>Article 1 – Objet</h2>
<p>Le Prestataire fournit au Client des ressources d'infrastructure cloud (IaaS) comprenant des serveurs virtuels, du stockage et des services réseau conformément aux spécifications ci-après.</p>
<h2>Article 2 – Ressources allouées</h2>
<p>Capacité vCPU : <strong>{{capacite_vcpu}}</strong>. Le dimensionnement pourra être ajusté par avenant.</p>
<h2>Article 3 – Niveau de service (SLA)</h2>
<p>Le Prestataire s'engage à garantir une disponibilité de <strong>{{sla_disponibilite}}</strong> % mesurée mensuellement, hors maintenances planifiées notifiées 48 h à l'avance.</p>
<h2>Article 4 – Prix</h2>
<p>Le prix mensuel est fixé à <strong>{{prix_mensuel}}</strong> FCFA HT, révisable annuellement selon l'indice ARTCI.</p>
<h2>Article 5 – Durée</h2>
<p>Le présent accord prend effet le <strong>{{date_debut}}</strong> pour une durée d'un (1) an renouvelable par tacite reconduction.</p>
<h2>Article 6 – Droit applicable</h2>
<p>Le présent accord est régi par le droit ivoirien et les Actes Uniformes OHADA applicables.</p></div>`
  },
  {
    code: 'inf5_paas_cloud',
    name: "Accord de service de cloud PaaS",
    category: 'commercial_financier', price: 7000, priceMax: 21000,
    description: "Contrat de fourniture de plateforme de développement en mode PaaS pour équipes DevOps en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'fournisseur_nom',label:"Fournisseur PaaS",type:'text',required:true},
      {key:'plateforme',label:"Nom de la plateforme",type:'text',required:true},
      {key:'date_debut',label:"Date d'entrée en vigueur",type:'date',required:true},
      {key:'environnements',label:"Environnements inclus (dev/staging/prod)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE CLOUD PaaS</h1>
<p>Entre <strong>{{fournisseur_nom}}</strong> et <strong>{{client_nom}}</strong>, il est convenu ce qui suit :</p>
<h2>Article 1 – Objet</h2>
<p>Le Prestataire met à disposition la plateforme <strong>{{plateforme}}</strong> en mode PaaS permettant au Client de déployer, exécuter et gérer ses applications sans gérer l'infrastructure sous-jacente.</p>
<h2>Article 2 – Environnements</h2>
<p>Les environnements fournis sont : <strong>{{environnements}}</strong>.</p>
<h2>Article 3 – Durée</h2>
<p>Accord en vigueur à compter du <strong>{{date_debut}}</strong> pour douze (12) mois.</p>
<h2>Article 4 – Propriété intellectuelle</h2>
<p>Le code source déployé par le Client demeure sa propriété exclusive. Le Prestataire n'acquiert aucun droit sur les applications du Client.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Droit ivoirien et Actes Uniformes OHADA.</p></div>`
  },
  {
    code: 'inf5_saas_logiciel',
    name: "Accord de service SaaS (logiciel en ligne)",
    category: 'commercial_financier', price: 5000, priceMax: 15000,
    description: "Contrat d'abonnement à un logiciel en mode SaaS hébergé dans le cloud, conforme au cadre OHADA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 80,
    fieldsJson: F([
      {key:'client_nom',label:"Client",type:'text',required:true},
      {key:'editeur_nom',label:"Éditeur / Prestataire SaaS",type:'text',required:true},
      {key:'logiciel_nom',label:"Nom du logiciel",type:'text',required:true},
      {key:'nb_utilisateurs',label:"Nombre d'utilisateurs",type:'text',required:true},
      {key:'date_debut',label:"Date de début d'abonnement",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE SaaS</h1>
<p>Entre <strong>{{editeur_nom}}</strong> (l'Éditeur) et <strong>{{client_nom}}</strong> (le Client) :</p>
<h2>Article 1 – Objet</h2>
<p>L'Éditeur accorde au Client un droit d'accès non exclusif et non transférable au logiciel <strong>{{logiciel_nom}}</strong> hébergé en mode SaaS.</p>
<h2>Article 2 – Licences utilisateurs</h2>
<p>Le nombre d'utilisateurs autorisés est de <strong>{{nb_utilisateurs}}</strong>. Tout dépassement fera l'objet d'une facturation complémentaire.</p>
<h2>Article 3 – Disponibilité et maintenance</h2>
<p>L'Éditeur s'engage à maintenir une disponibilité minimale de 99 % hors maintenance planifiée.</p>
<h2>Article 4 – Données personnelles</h2>
<p>Le traitement des données est encadré par la loi n° 2013-450 du 19 juin 2013 relative à la protection des données à caractère personnel en Côte d'Ivoire.</p>
<h2>Article 5 – Durée</h2>
<p>Abonnement prenant effet le <strong>{{date_debut}}</strong> pour un (1) an renouvelable.</p></div>`
  },
  {
    code: 'inf5_cloud_prive',
    name: "Accord de service de cloud privé (datacenter entreprise)",
    category: 'commercial_financier', price: 12000, priceMax: 40000,
    description: "Contrat de déploiement et d'exploitation d'un cloud privé dédié au sein du datacenter du client en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 58,
    fieldsJson: F([
      {key:'client_nom',label:"Entreprise cliente",type:'text',required:true},
      {key:'integrateur_nom',label:"Intégrateur / Prestataire",type:'text',required:true},
      {key:'site_datacenter',label:"Localisation du datacenter",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison prévue",type:'date',required:true},
      {key:'capacite_stockage',label:"Capacité de stockage (To)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE CLOUD PRIVÉ</h1>
<p>Entre <strong>{{integrateur_nom}}</strong> et <strong>{{client_nom}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>Le Prestataire déploie et exploite une infrastructure cloud privée au site <strong>{{site_datacenter}}</strong> avec une capacité de stockage de <strong>{{capacite_stockage}}</strong> To.</p>
<h2>Article 2 – Livraison</h2>
<p>La mise en production est prévue le <strong>{{date_livraison}}</strong>.</p>
<h2>Article 3 – Sécurité</h2>
<p>L'infrastructure est cloisonnée et accessible uniquement aux utilisateurs accrédités du Client. Les données ne quittent pas le périmètre physique du datacenter du Client.</p>
<h2>Article 4 – Droit applicable</h2>
<p>Droit ivoirien et Actes Uniformes OHADA.</p></div>`
  },
  {
    code: 'inf5_cloud_hybride',
    name: "Accord de service de cloud hybride",
    category: 'commercial_financier', price: 10000, priceMax: 30000,
    description: "Contrat encadrant une architecture cloud hybride combinant infrastructure privée on-premise et ressources cloud public.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 61,
    fieldsJson: F([
      {key:'client_nom',label:"Client",type:'text',required:true},
      {key:'prestataire_nom',label:"Prestataire cloud hybride",type:'text',required:true},
      {key:'cloud_public',label:"Fournisseur cloud public retenu",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'repartition_charge',label:"Répartition des charges (%)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE CLOUD HYBRIDE</h1>
<p>Entre <strong>{{prestataire_nom}}</strong> et <strong>{{client_nom}}</strong> :</p>
<h2>Article 1 – Architecture</h2>
<p>Le service combine l'infrastructure privée du Client et les ressources du fournisseur public <strong>{{cloud_public}}</strong> selon une répartition de charge de <strong>{{repartition_charge}}</strong>.</p>
<h2>Article 2 – Gouvernance des données</h2>
<p>Les données sensibles demeurent hébergées en infrastructure privée conformément aux exigences réglementaires ivoiriennes.</p>
<h2>Article 3 – Durée</h2>
<p>Le présent accord prend effet le <strong>{{date_debut}}</strong>.</p>
<h2>Article 4 – Droit applicable</h2>
<p>Droit ivoirien et Actes Uniformes OHADA.</p></div>`
  },
  {
    code: 'inf5_migration_cloud',
    name: "Accord de service de migration vers le cloud",
    category: 'commercial_financier', price: 9000, priceMax: 27000,
    description: "Contrat de prestation de migration d'un système d'information on-premise vers le cloud, incluant audit, plan de migration et tests.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 66,
    fieldsJson: F([
      {key:'client_nom',label:"Client",type:'text',required:true},
      {key:'prestataire_nom',label:"Prestataire migration",type:'text',required:true},
      {key:'perimetre_migration',label:"Périmètre des systèmes à migrer",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début de la migration",type:'date',required:true},
      {key:'date_fin',label:"Date de fin prévisionnelle",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MIGRATION VERS LE CLOUD</h1>
<p>Entre <strong>{{prestataire_nom}}</strong> et <strong>{{client_nom}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>Le Prestataire assure la migration du périmètre suivant : <strong>{{perimetre_migration}}</strong>.</p>
<h2>Article 2 – Phases</h2>
<p>La mission se déroule selon les phases : (i) audit et découverte, (ii) conception de l'architecture cible, (iii) migration pilote, (iv) bascule en production, (v) stabilisation.</p>
<h2>Article 3 – Calendrier</h2>
<p>Début : <strong>{{date_debut}}</strong> — Fin prévisionnelle : <strong>{{date_fin}}</strong>.</p>
<h2>Article 4 – Responsabilité</h2>
<p>Le Prestataire est tenu d'une obligation de moyens. La continuité de service pendant la migration est garantie selon le plan de reprise approuvé par le Client.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Droit ivoirien et Actes Uniformes OHADA.</p></div>`
  },
  {
    code: 'inf5_backup_cloud',
    name: "Accord de service de sauvegarde cloud (backup)",
    category: 'commercial_financier', price: 5000, priceMax: 14000,
    description: "Contrat de service de sauvegarde automatisée des données en cloud, avec politique de rétention et tests de restauration.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 74,
    fieldsJson: F([
      {key:'client_nom',label:"Client",type:'text',required:true},
      {key:'prestataire_nom',label:"Prestataire backup",type:'text',required:true},
      {key:'volume_donnees',label:"Volume de données à sauvegarder (Go)",type:'text',required:true},
      {key:'retention_jours',label:"Durée de rétention (jours)",type:'text',required:true},
      {key:'date_debut',label:"Date d'entrée en vigueur",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SAUVEGARDE CLOUD</h1>
<p>Entre <strong>{{prestataire_nom}}</strong> et <strong>{{client_nom}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>Le Prestataire assure la sauvegarde automatisée de <strong>{{volume_donnees}}</strong> Go de données du Client vers une infrastructure cloud sécurisée.</p>
<h2>Article 2 – Politique de rétention</h2>
<p>Les sauvegardes sont conservées pendant <strong>{{retention_jours}}</strong> jours. Des tests de restauration sont effectués trimestriellement.</p>
<h2>Article 3 – Chiffrement</h2>
<p>Les données sont chiffrées en transit (TLS 1.3) et au repos (AES-256).</p>
<h2>Article 4 – Durée</h2>
<p>Accord en vigueur à compter du <strong>{{date_debut}}</strong>.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Droit ivoirien et Actes Uniformes OHADA.</p></div>`
  },
  {
    code: 'inf5_drp_cloud',
    name: "Accord de service de reprise après sinistre (DRP/PCA cloud)",
    category: 'commercial_financier', price: 11000, priceMax: 33000,
    description: "Contrat de plan de continuité et reprise après sinistre (PCA/DRP) en mode cloud, incluant RTO et RPO contractuels.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      {key:'client_nom',label:"Client",type:'text',required:true},
      {key:'prestataire_nom',label:"Prestataire DRP",type:'text',required:true},
      {key:'rto_heures',label:"RTO contractuel (heures)",type:'text',required:true},
      {key:'rpo_heures',label:"RPO contractuel (heures)",type:'text',required:true},
      {key:'date_debut',label:"Date d'entrée en vigueur",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE REPRISE APRÈS SINISTRE (DRP/PCA CLOUD)</h1>
<p>Entre <strong>{{prestataire_nom}}</strong> et <strong>{{client_nom}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>Le Prestataire assure la mise en œuvre et le maintien d'un plan de reprise après sinistre (DRP) en mode cloud pour le Système d'Information du Client.</p>
<h2>Article 2 – Objectifs de reprise</h2>
<p>RTO (temps de reprise objectif) : <strong>{{rto_heures}}</strong> heures. RPO (point de reprise objectif) : <strong>{{rpo_heures}}</strong> heures.</p>
<h2>Article 3 – Tests</h2>
<p>Des exercices de basculement sont effectués au minimum une (1) fois par an, avec rapport de résultats transmis au Client.</p>
<h2>Article 4 – Durée</h2>
<p>Accord en vigueur à compter du <strong>{{date_debut}}</strong>.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Droit ivoirien et Actes Uniformes OHADA.</p></div>`
  },
  {
    code: 'inf5_securite_cloud',
    name: "Accord de service de sécurité cloud (CASB, CSPM)",
    category: 'commercial_financier', price: 10000, priceMax: 30000,
    description: "Contrat de service de sécurité cloud couvrant la gestion des accès, la conformité et la détection des menaces (CASB/CSPM).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 63,
    fieldsJson: F([
      {key:'client_nom',label:"Client",type:'text',required:true},
      {key:'prestataire_nom',label:"Prestataire sécurité cloud",type:'text',required:true},
      {key:'perimetres',label:"Périmètres cloud couverts",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'rapport_frequence',label:"Fréquence des rapports de sécurité",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SÉCURITÉ CLOUD (CASB / CSPM)</h1>
<p>Entre <strong>{{prestataire_nom}}</strong> et <strong>{{client_nom}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>Le Prestataire déploie et opère des solutions de type CASB (Cloud Access Security Broker) et CSPM (Cloud Security Posture Management) sur les périmètres : <strong>{{perimetres}}</strong>.</p>
<h2>Article 2 – Prestations</h2>
<p>Les prestations comprennent : contrôle des accès, détection des dérives de configuration, gestion des identités cloud et reporting de conformité.</p>
<h2>Article 3 – Rapports</h2>
<p>Des rapports de sécurité sont transmis au Client avec la fréquence suivante : <strong>{{rapport_frequence}}</strong>.</p>
<h2>Article 4 – Durée</h2>
<p>Accord en vigueur à compter du <strong>{{date_debut}}</strong>.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Droit ivoirien et Actes Uniformes OHADA.</p></div>`
  },
  {
    code: 'inf5_devops_cicd',
    name: "Accord de service DevOps (CI/CD pipeline)",
    category: 'commercial_financier', price: 8000, priceMax: 24000,
    description: "Contrat de mise en place et d'exploitation de pipelines CI/CD pour l'automatisation des déploiements logiciels.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'client_nom',label:"Client",type:'text',required:true},
      {key:'prestataire_nom',label:"Prestataire DevOps",type:'text',required:true},
      {key:'outils_cicd',label:"Outils CI/CD retenus",type:'text',required:true},
      {key:'nb_pipelines',label:"Nombre de pipelines",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DEVOPS — CI/CD PIPELINE</h1>
<p>Entre <strong>{{prestataire_nom}}</strong> et <strong>{{client_nom}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>Le Prestataire conçoit, déploie et opère <strong>{{nb_pipelines}}</strong> pipelines CI/CD à l'aide des outils : <strong>{{outils_cicd}}</strong>.</p>
<h2>Article 2 – Périmètre</h2>
<p>Les pipelines couvrent : intégration continue (build, tests unitaires, analyse statique) et déploiement continu (staging, production).</p>
<h2>Article 3 – Indicateurs</h2>
<p>Le délai moyen de déploiement (lead time) et le taux de réussite des déploiements sont suivis mensuellement.</p>
<h2>Article 4 – Durée</h2>
<p>Accord en vigueur à compter du <strong>{{date_debut}}</strong>.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Droit ivoirien et Actes Uniformes OHADA.</p></div>`
  },
  {
    code: 'inf5_conteneurisation',
    name: "Accord de service de conteneurisation (Docker, Kubernetes)",
    category: 'commercial_financier', price: 9000, priceMax: 28000,
    description: "Contrat de déploiement et d'exploitation d'une plateforme de conteneurs Docker/Kubernetes pour les applications du client.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 67,
    fieldsJson: F([
      {key:'client_nom',label:"Client",type:'text',required:true},
      {key:'prestataire_nom',label:"Prestataire conteneurisation",type:'text',required:true},
      {key:'nb_noeuds',label:"Nombre de nœuds Kubernetes",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'environnement',label:"Environnement cible (cloud/on-prem)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CONTENEURISATION (DOCKER / KUBERNETES)</h1>
<p>Entre <strong>{{prestataire_nom}}</strong> et <strong>{{client_nom}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>Le Prestataire déploie et gère un cluster Kubernetes de <strong>{{nb_noeuds}}</strong> nœuds dans l'environnement <strong>{{environnement}}</strong>.</p>
<h2>Article 2 – Prestations incluses</h2>
<p>Conteneurisation des applications, orchestration Kubernetes, gestion des registres d'images, monitoring des pods et mise à jour des versions.</p>
<h2>Article 3 – Sécurité</h2>
<p>Les images sont scannées pour les vulnérabilités avant tout déploiement en production.</p>
<h2>Article 4 – Durée</h2>
<p>Accord en vigueur à compter du <strong>{{date_debut}}</strong>.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Droit ivoirien et Actes Uniformes OHADA.</p></div>`
  },
  {
    code: 'inf5_microservices_api',
    name: "Accord de service de microservices (API gateway)",
    category: 'commercial_financier', price: 9000, priceMax: 27000,
    description: "Contrat de conception et d'exploitation d'une architecture microservices avec passerelle API.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 64,
    fieldsJson: F([
      {key:'client_nom',label:"Client",type:'text',required:true},
      {key:'prestataire_nom',label:"Prestataire microservices",type:'text',required:true},
      {key:'nb_services',label:"Nombre de microservices",type:'text',required:true},
      {key:'api_gateway',label:"Solution API Gateway retenue",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MICROSERVICES ET API GATEWAY</h1>
<p>Entre <strong>{{prestataire_nom}}</strong> et <strong>{{client_nom}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>Le Prestataire conçoit et opère une architecture de <strong>{{nb_services}}</strong> microservices exposés via la passerelle <strong>{{api_gateway}}</strong>.</p>
<h2>Article 2 – Gestion des API</h2>
<p>La passerelle assure : authentification, limitation de débit (rate limiting), journalisation et routage des appels API.</p>
<h2>Article 3 – Évolutivité</h2>
<p>Chaque microservice est déployé de manière indépendante, permettant une mise à l'échelle horizontale sans interruption.</p>
<h2>Article 4 – Durée</h2>
<p>Accord en vigueur à compter du <strong>{{date_debut}}</strong>.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Droit ivoirien et Actes Uniformes OHADA.</p></div>`
  },
  {
    code: 'inf5_monitoring_obs',
    name: "Accord de service de monitoring et observabilité (Grafana, DataDog)",
    category: 'commercial_financier', price: 7000, priceMax: 21000,
    description: "Contrat de mise en place d'une solution de monitoring et d'observabilité (métriques, logs, traces) pour l'infrastructure IT.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'client_nom',label:"Client",type:'text',required:true},
      {key:'prestataire_nom',label:"Prestataire monitoring",type:'text',required:true},
      {key:'outils_monitoring',label:"Outils de monitoring retenus",type:'text',required:true},
      {key:'nb_composants',label:"Nombre de composants surveillés",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MONITORING ET OBSERVABILITÉ</h1>
<p>Entre <strong>{{prestataire_nom}}</strong> et <strong>{{client_nom}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>Le Prestataire déploie et opère une solution de monitoring et d'observabilité basée sur <strong>{{outils_monitoring}}</strong> pour <strong>{{nb_composants}}</strong> composants d'infrastructure.</p>
<h2>Article 2 – Périmètre</h2>
<p>Le périmètre couvre : métriques système, journaux applicatifs (logs), traces distribuées et alertes en temps réel.</p>
<h2>Article 3 – Alertes</h2>
<p>Les alertes critiques sont notifiées sous 5 minutes. Un rapport mensuel de performance est fourni au Client.</p>
<h2>Article 4 – Durée</h2>
<p>Accord en vigueur à compter du <strong>{{date_debut}}</strong>.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Droit ivoirien et Actes Uniformes OHADA.</p></div>`
  },
  {
    code: 'inf5_gitops_source',
    name: "Accord de service de gestion de code source (GitOps)",
    category: 'commercial_financier', price: 5000, priceMax: 15000,
    description: "Contrat de service de gestion du code source et de mise en œuvre d'une pratique GitOps pour les équipes de développement.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 62,
    fieldsJson: F([
      {key:'client_nom',label:"Client",type:'text',required:true},
      {key:'prestataire_nom',label:"Prestataire GitOps",type:'text',required:true},
      {key:'plateforme_git',label:"Plateforme Git retenue",type:'text',required:true},
      {key:'nb_depots',label:"Nombre de dépôts gérés",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GESTION DE CODE SOURCE (GitOps)</h1>
<p>Entre <strong>{{prestataire_nom}}</strong> et <strong>{{client_nom}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>Le Prestataire administre <strong>{{nb_depots}}</strong> dépôts de code source sur la plateforme <strong>{{plateforme_git}}</strong> selon les pratiques GitOps.</p>
<h2>Article 2 – Prestations</h2>
<p>Les prestations incluent : gestion des branches, revue de code (pull requests), contrôle d'accès par rôles et intégration avec les pipelines CI/CD.</p>
<h2>Article 3 – Confidentialité du code</h2>
<p>Le code source du Client est confidentiel. Tout accès par le Prestataire est journalisé et soumis à l'accord préalable du Client.</p>
<h2>Article 4 – Durée</h2>
<p>Accord en vigueur à compter du <strong>{{date_debut}}</strong>.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Droit ivoirien et Actes Uniformes OHADA.</p></div>`
  },
  {
    code: 'inf5_iac_terraform',
    name: "Accord de service d'infrastructure as code (Terraform)",
    category: 'commercial_financier', price: 8000, priceMax: 24000,
    description: "Contrat de mise en place d'une approche Infrastructure as Code (IaC) avec Terraform pour l'automatisation du provisionnement cloud.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      {key:'client_nom',label:"Client",type:'text',required:true},
      {key:'prestataire_nom',label:"Prestataire IaC",type:'text',required:true},
      {key:'fournisseur_cloud',label:"Fournisseur cloud cible",type:'text',required:true},
      {key:'nb_modules',label:"Nombre de modules Terraform",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'INFRASTRUCTURE AS CODE (TERRAFORM)</h1>
<p>Entre <strong>{{prestataire_nom}}</strong> et <strong>{{client_nom}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>Le Prestataire développe et maintient <strong>{{nb_modules}}</strong> modules Terraform pour le provisionnement automatisé de l'infrastructure <strong>{{fournisseur_cloud}}</strong> du Client.</p>
<h2>Article 2 – Livrables</h2>
<p>Les livrables comprennent : modules Terraform versionnés, documentation technique, pipelines d'application automatisés et plan de destruction sécurisé.</p>
<h2>Article 3 – Gouvernance</h2>
<p>Toute modification d'infrastructure est soumise à revue avant application. Un état (state) Terraform centralisé et sécurisé est maintenu.</p>
<h2>Article 4 – Durée</h2>
<p>Accord en vigueur à compter du <strong>{{date_debut}}</strong>.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Droit ivoirien et Actes Uniformes OHADA.</p></div>`
  },
  {
    code: 'inf5_sdn_reseau',
    name: "Accord de service de réseau SDN (software defined networking)",
    category: 'commercial_financier', price: 11000, priceMax: 33000,
    description: "Contrat de déploiement et d'exploitation d'une infrastructure réseau définie par logiciel (SDN) pour l'entreprise.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 55,
    fieldsJson: F([
      {key:'client_nom',label:"Client",type:'text',required:true},
      {key:'prestataire_nom',label:"Prestataire SDN",type:'text',required:true},
      {key:'nb_sites',label:"Nombre de sites couverts",type:'text',required:true},
      {key:'debit_garanti',label:"Débit garanti (Mbps)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE RÉSEAU SDN</h1>
<p>Entre <strong>{{prestataire_nom}}</strong> et <strong>{{client_nom}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>Le Prestataire déploie une infrastructure SDN sur <strong>{{nb_sites}}</strong> sites du Client avec un débit garanti de <strong>{{debit_garanti}}</strong> Mbps.</p>
<h2>Article 2 – Gestion centralisée</h2>
<p>Le réseau est administré via un contrôleur SDN centralisé permettant la segmentation dynamique, le routage intelligent et la détection des intrusions.</p>
<h2>Article 3 – Qualité de service</h2>
<p>Des politiques QoS priorisent les flux critiques (voix, vidéo, ERP) sur l'ensemble du réseau.</p>
<h2>Article 4 – Durée</h2>
<p>Accord en vigueur à compter du <strong>{{date_debut}}</strong>.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Droit ivoirien et Actes Uniformes OHADA.</p></div>`
  },
  {
    code: 'inf5_vpn_cloud',
    name: "Accord de service de VPN entreprise (cloud)",
    category: 'commercial_financier', price: 5000, priceMax: 15000,
    description: "Contrat de fourniture et d'exploitation d'un service VPN d'entreprise hébergé dans le cloud pour sécuriser les accès distants.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 76,
    fieldsJson: F([
      {key:'client_nom',label:"Client",type:'text',required:true},
      {key:'prestataire_nom',label:"Prestataire VPN",type:'text',required:true},
      {key:'nb_utilisateurs_vpn',label:"Nombre d'utilisateurs VPN",type:'text',required:true},
      {key:'protocole',label:"Protocole VPN retenu",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE VPN ENTREPRISE (CLOUD)</h1>
<p>Entre <strong>{{prestataire_nom}}</strong> et <strong>{{client_nom}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>Le Prestataire fournit un service VPN cloud pour <strong>{{nb_utilisateurs_vpn}}</strong> utilisateurs basé sur le protocole <strong>{{protocole}}</strong>.</p>
<h2>Article 2 – Sécurité</h2>
<p>Toutes les connexions sont chiffrées de bout en bout. L'authentification multifacteur (MFA) est obligatoire.</p>
<h2>Article 3 – Disponibilité</h2>
<p>Le service VPN est garanti disponible 99,5 % du temps sur base mensuelle.</p>
<h2>Article 4 – Durée</h2>
<p>Accord en vigueur à compter du <strong>{{date_debut}}</strong>.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Droit ivoirien et Actes Uniformes OHADA.</p></div>`
  },
  {
    code: 'inf5_cdn_diffusion',
    name: "Accord de service de CDN (diffusion de contenu)",
    category: 'commercial_financier', price: 6000, priceMax: 18000,
    description: "Contrat de service de réseau de diffusion de contenu (CDN) pour accélérer la livraison de contenus web et médias en Afrique de l'Ouest.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 63,
    fieldsJson: F([
      {key:'client_nom',label:"Client",type:'text',required:true},
      {key:'prestataire_nom',label:"Prestataire CDN",type:'text',required:true},
      {key:'volume_mensuel_tb',label:"Volume mensuel estimé (To)",type:'text',required:true},
      {key:'zones_geo',label:"Zones géographiques couvertes",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE CDN</h1>
<p>Entre <strong>{{prestataire_nom}}</strong> et <strong>{{client_nom}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>Le Prestataire fournit un service CDN pour la diffusion du contenu du Client dans les zones : <strong>{{zones_geo}}</strong>, pour un volume mensuel estimé de <strong>{{volume_mensuel_tb}}</strong> To.</p>
<h2>Article 2 – Performance</h2>
<p>Le Prestataire garantit un temps de latence inférieur à 50 ms pour 95 % des requêtes depuis les zones couvertes.</p>
<h2>Article 3 – Sécurité</h2>
<p>Le CDN intègre une protection DDoS et des certificats SSL/TLS valides pour tous les domaines du Client.</p>
<h2>Article 4 – Durée</h2>
<p>Accord en vigueur à compter du <strong>{{date_debut}}</strong>.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Droit ivoirien et Actes Uniformes OHADA.</p></div>`
  },
  {
    code: 'inf5_registre_domaine',
    name: "Accord de service de registre de domaines (ARTCI CI)",
    category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Contrat de gestion de noms de domaine conforme aux règles de l'ARTCI (Autorité de Régulation des Télécommunications de Côte d'Ivoire).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 69,
    fieldsJson: F([
      {key:'client_nom',label:"Titulaire du domaine",type:'text',required:true},
      {key:'prestataire_nom',label:"Bureau d'enregistrement",type:'text',required:true},
      {key:'nom_domaine',label:"Nom de domaine (.ci)",type:'text',required:true},
      {key:'date_enregistrement',label:"Date d'enregistrement",type:'date',required:true},
      {key:'duree_annees',label:"Durée d'enregistrement (années)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ENREGISTREMENT DE NOM DE DOMAINE (ARTCI)</h1>
<p>Entre <strong>{{prestataire_nom}}</strong> (Bureau d'enregistrement accrédité ARTCI) et <strong>{{client_nom}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>Le Prestataire procède à l'enregistrement du nom de domaine <strong>{{nom_domaine}}</strong> au nom et pour le compte du Client auprès de l'ARTCI.</p>
<h2>Article 2 – Durée</h2>
<p>L'enregistrement prend effet le <strong>{{date_enregistrement}}</strong> pour une durée de <strong>{{duree_annees}}</strong> an(s), renouvelable.</p>
<h2>Article 3 – Obligations du titulaire</h2>
<p>Le Client s'engage à fournir des informations exactes et à ne pas utiliser le domaine à des fins illicites conformément à la réglementation ARTCI.</p>
<h2>Article 4 – Droit applicable</h2>
<p>Droit ivoirien, règlementation ARTCI et Actes Uniformes OHADA.</p></div>`
  },
  {
    code: 'inf5_hebergement_web',
    name: "Accord de service d'hébergement web (serveur dédié)",
    category: 'commercial_financier', price: 5000, priceMax: 15000,
    description: "Contrat d'hébergement web sur serveur dédié incluant administration système, sauvegarde et support technique.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 78,
    fieldsJson: F([
      {key:'client_nom',label:"Client",type:'text',required:true},
      {key:'hebergeur_nom',label:"Hébergeur",type:'text',required:true},
      {key:'config_serveur',label:"Configuration du serveur dédié",type:'text',required:true},
      {key:'bande_passante',label:"Bande passante (Mbps)",type:'text',required:true},
      {key:'date_debut',label:"Date de mise en service",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'HÉBERGEMENT WEB — SERVEUR DÉDIÉ</h1>
<p>Entre <strong>{{hebergeur_nom}}</strong> et <strong>{{client_nom}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>L'Hébergeur met à disposition du Client un serveur dédié de configuration <strong>{{config_serveur}}</strong> avec une bande passante de <strong>{{bande_passante}}</strong> Mbps.</p>
<h2>Article 2 – Administration</h2>
<p>L'administration système (mises à jour de sécurité, surveillance des ressources) est assurée par l'Hébergeur. Le Client bénéficie d'un accès root.</p>
<h2>Article 3 – Disponibilité</h2>
<p>Une disponibilité de 99,9 % est garantie sur base mensuelle.</p>
<h2>Article 4 – Durée</h2>
<p>Accord en vigueur à compter du <strong>{{date_debut}}</strong>.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Droit ivoirien et Actes Uniformes OHADA.</p></div>`
  },
  {
    code: 'inf5_ssl_tls',
    name: "Accord de service de certification SSL/TLS",
    category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Contrat de fourniture et gestion de certificats SSL/TLS pour la sécurisation des communications web du client.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 66,
    fieldsJson: F([
      {key:'client_nom',label:"Client",type:'text',required:true},
      {key:'autorite_cert',label:"Autorité de certification (CA)",type:'text',required:true},
      {key:'domaines_couverts',label:"Domaines couverts",type:'text',required:true},
      {key:'type_certificat',label:"Type de certificat (DV/OV/EV)",type:'text',required:true},
      {key:'date_emission',label:"Date d'émission",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CERTIFICATION SSL/TLS</h1>
<p>Entre <strong>{{autorite_cert}}</strong> (ou son revendeur agréé) et <strong>{{client_nom}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>Le Prestataire fournit et gère des certificats SSL/TLS de type <strong>{{type_certificat}}</strong> pour les domaines : <strong>{{domaines_couverts}}</strong>.</p>
<h2>Article 2 – Durée de validité</h2>
<p>Les certificats sont émis le <strong>{{date_emission}}</strong> pour une durée d'un (1) an. Le renouvellement automatique est inclus.</p>
<h2>Article 3 – Responsabilité</h2>
<p>Le Prestataire garantit la validité et la conformité des certificats aux standards CA/Browser Forum en vigueur.</p>
<h2>Article 4 – Droit applicable</h2>
<p>Droit ivoirien et Actes Uniformes OHADA.</p></div>`
  },
  {
    code: 'inf5_load_testing',
    name: "Accord de service de test de charge (load testing)",
    category: 'commercial_financier', price: 6000, priceMax: 18000,
    description: "Contrat de prestation de tests de charge et de performance pour les applications web et services cloud.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 57,
    fieldsJson: F([
      {key:'client_nom',label:"Client",type:'text',required:true},
      {key:'prestataire_nom',label:"Prestataire tests de charge",type:'text',required:true},
      {key:'application_cible',label:"Application / service testé",type:'text',required:true},
      {key:'nb_utilisateurs_simules',label:"Nombre d'utilisateurs simulés",type:'text',required:true},
      {key:'date_test',label:"Date prévue des tests",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TEST DE CHARGE (LOAD TESTING)</h1>
<p>Entre <strong>{{prestataire_nom}}</strong> et <strong>{{client_nom}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>Le Prestataire réalise des tests de charge sur <strong>{{application_cible}}</strong> simulant jusqu'à <strong>{{nb_utilisateurs_simules}}</strong> utilisateurs simultanés.</p>
<h2>Article 2 – Livrables</h2>
<p>Un rapport de performance incluant les métriques de temps de réponse, taux d'erreur, goulots d'étranglement et recommandations d'optimisation est remis au Client.</p>
<h2>Article 3 – Calendrier</h2>
<p>Les tests sont planifiés pour le <strong>{{date_test}}</strong>, hors heures d'activité de production.</p>
<h2>Article 4 – Confidentialité</h2>
<p>Les résultats des tests et l'architecture du Client sont strictement confidentiels.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Droit ivoirien et Actes Uniformes OHADA.</p></div>`
  },
  {
    code: 'inf5_partenariat_integrateur',
    name: "Accord de partenariat intégrateur cloud-client",
    category: 'commercial_financier', price: 8000, priceMax: 25000,
    description: "Contrat de partenariat entre un intégrateur cloud certifié et son client pour la co-construction et la gestion d'une infrastructure cloud.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 61,
    fieldsJson: F([
      {key:'client_nom',label:"Entreprise cliente",type:'text',required:true},
      {key:'integrateur_nom',label:"Intégrateur cloud",type:'text',required:true},
      {key:'certification_cloud',label:"Certification cloud de l'intégrateur",type:'text',required:true},
      {key:'duree_partenariat',label:"Durée du partenariat (mois)",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT INTÉGRATEUR CLOUD</h1>
<p>Entre <strong>{{integrateur_nom}}</strong> (certifié <strong>{{certification_cloud}}</strong>) et <strong>{{client_nom}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>Les Parties établissent un partenariat stratégique pour la conception, le déploiement et la gestion continue de l'infrastructure cloud du Client.</p>
<h2>Article 2 – Rôles</h2>
<p>L'Intégrateur apporte son expertise technique et ses certifications. Le Client fournit les accès nécessaires et valide les architectures proposées.</p>
<h2>Article 3 – Durée</h2>
<p>Le partenariat est conclu pour <strong>{{duree_partenariat}}</strong> mois à compter du <strong>{{date_signature}}</strong>.</p>
<h2>Article 4 – Propriété intellectuelle</h2>
<p>Les architectures et configurations développées spécifiquement pour le Client lui appartiennent en propre.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Droit ivoirien et Actes Uniformes OHADA.</p></div>`
  },
  {
    code: 'inf5_rapport_perf_cloud',
    name: "Rapport de performance infrastructure cloud",
    category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Modèle de rapport périodique de performance de l'infrastructure cloud : disponibilité, coûts, incidents et recommandations.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'client_nom',label:"Client",type:'text',required:true},
      {key:'prestataire_nom',label:"Prestataire cloud",type:'text',required:true},
      {key:'periode_rapport',label:"Période couverte (mois/année)",type:'text',required:true},
      {key:'disponibilite_mesuree',label:"Disponibilité mesurée (%)",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE INFRASTRUCTURE CLOUD</h1>
<p>Préparé par <strong>{{prestataire_nom}}</strong> pour <strong>{{client_nom}}</strong> — Période : <strong>{{periode_rapport}}</strong></p>
<h2>1. Disponibilité</h2>
<p>Disponibilité mesurée : <strong>{{disponibilite_mesuree}}</strong> %. Conformité au SLA : voir tableau détaillé en annexe.</p>
<h2>2. Incidents</h2>
<p>Nombre d'incidents P1/P2 : à compléter. Délai moyen de résolution : à compléter.</p>
<h2>3. Consommation et coûts</h2>
<p>Coût total de la période : à compléter. Évolution par rapport à la période précédente : à compléter.</p>
<h2>4. Recommandations</h2>
<p>Les recommandations d'optimisation sont détaillées en annexe.</p>
<p>Rapport établi le <strong>{{date_rapport}}</strong>.</p></div>`
  },
  {
    code: 'inf5_charte_cloud_responsable',
    name: "Charte du cloud responsable et de la souveraineté numérique",
    category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Charte d'engagement pour un usage responsable et souverain du cloud, respectant les données nationales et l'environnement.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 58,
    fieldsJson: F([
      {key:'organisation_nom',label:"Organisation signataire",type:'text',required:true},
      {key:'representant',label:"Représentant légal",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption de la charte",type:'date',required:true},
      {key:'perimetre_cloud',label:"Périmètre cloud concerné",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DU CLOUD RESPONSABLE ET DE LA SOUVERAINETÉ NUMÉRIQUE</h1>
<p>L'organisation <strong>{{organisation_nom}}</strong>, représentée par <strong>{{representant}}</strong>, adopte la présente charte le <strong>{{date_adoption}}</strong>.</p>
<h2>Principe 1 – Souveraineté des données</h2>
<p>Les données sensibles et les données à caractère personnel des citoyens ivoiriens sont hébergées sur le territoire national ou dans des zones conformes aux accords CEDEAO.</p>
<h2>Principe 2 – Efficacité énergétique</h2>
<p>L'organisation privilégie les fournisseurs cloud engagés dans la transition énergétique et affichant un PUE (Power Usage Effectiveness) inférieur à 1,5.</p>
<h2>Principe 3 – Réversibilité</h2>
<p>Tout contrat cloud inclut une clause de portabilité et de réversibilité garantissant la récupération des données sans frais excessifs.</p>
<h2>Périmètre</h2>
<p>La présente charte s'applique au périmètre suivant : <strong>{{perimetre_cloud}}</strong>.</p></div>`
  },

  // ── 25 IA / Machine learning / Data science ─────────────────────────────
  {
    code: 'ia2_modele_ml',
    name: "Accord de service de développement d'un modèle d'IA (ML)",
    category: 'commercial_financier', price: 10000, priceMax: 35000,
    description: "Contrat de développement d'un modèle de machine learning sur mesure, de la collecte des données à la mise en production.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 75,
    fieldsJson: F([
      {key:'client_nom',label:"Client",type:'text',required:true},
      {key:'prestataire_nom',label:"Prestataire IA / Data Science",type:'text',required:true},
      {key:'cas_usage',label:"Cas d'usage du modèle",type:'textarea',required:true},
      {key:'metrique_perf',label:"Métrique de performance cible",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison du modèle",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DÉVELOPPEMENT D'UN MODÈLE D'IA (ML)</h1>
<p>Entre <strong>{{prestataire_nom}}</strong> et <strong>{{client_nom}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>Le Prestataire développe un modèle de machine learning adapté au cas d'usage suivant : <strong>{{cas_usage}}</strong>.</p>
<h2>Article 2 – Performance</h2>
<p>Le modèle doit atteindre la métrique cible : <strong>{{metrique_perf}}</strong> sur l'ensemble de test convenu entre les Parties.</p>
<h2>Article 3 – Livrables</h2>
<p>Les livrables comprennent : le modèle entraîné, le code source documenté, le pipeline de données et le rapport de performance.</p>
<h2>Article 4 – Propriété</h2>
<p>À la livraison finale le <strong>{{date_livraison}}</strong>, le modèle et ses artefacts deviennent propriété du Client.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Droit ivoirien et Actes Uniformes OHADA.</p></div>`
  },
  {
    code: 'ia2_nlp_chatbot',
    name: "Accord de service de traitement du langage naturel (NLP, chatbot)",
    category: 'commercial_financier', price: 9000, priceMax: 27000,
    description: "Contrat de développement d'une solution NLP ou chatbot conversationnel pour automatiser les interactions client.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 78,
    fieldsJson: F([
      {key:'client_nom',label:"Client",type:'text',required:true},
      {key:'prestataire_nom',label:"Prestataire NLP",type:'text',required:true},
      {key:'langues_cibles',label:"Langues cibles (français, dioula…)",type:'text',required:true},
      {key:'canaux_deploiement',label:"Canaux de déploiement",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE NLP / CHATBOT</h1>
<p>Entre <strong>{{prestataire_nom}}</strong> et <strong>{{client_nom}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>Le Prestataire développe une solution de traitement du langage naturel (NLP) et/ou un chatbot conversationnel en <strong>{{langues_cibles}}</strong>, déployé sur : <strong>{{canaux_deploiement}}</strong>.</p>
<h2>Article 2 – Données d'entraînement</h2>
<p>Le Client fournit les données conversationnelles nécessaires à l'entraînement. Ces données restent confidentielles et propriété du Client.</p>
<h2>Article 3 – Performance</h2>
<p>Un taux de compréhension des intentions (intent recognition) supérieur à 85 % est visé sur les jeux de tests convenus.</p>
<h2>Article 4 – Durée</h2>
<p>Accord en vigueur à compter du <strong>{{date_debut}}</strong>.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Droit ivoirien et Actes Uniformes OHADA.</p></div>`
  },
  {
    code: 'ia2_vision_image',
    name: "Accord de service de vision par ordinateur (reconnaissance image)",
    category: 'commercial_financier', price: 11000, priceMax: 33000,
    description: "Contrat de développement d'une solution de vision par ordinateur pour la classification, la détection ou la segmentation d'images.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 67,
    fieldsJson: F([
      {key:'client_nom',label:"Client",type:'text',required:true},
      {key:'prestataire_nom',label:"Prestataire vision IA",type:'text',required:true},
      {key:'application',label:"Application cible (contrôle qualité, sécurité…)",type:'text',required:true},
      {key:'precision_cible',label:"Précision cible du modèle (%)",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — VISION PAR ORDINATEUR</h1>
<p>Entre <strong>{{prestataire_nom}}</strong> et <strong>{{client_nom}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>Le Prestataire développe une solution de vision par ordinateur pour l'application : <strong>{{application}}</strong>, avec une précision cible de <strong>{{precision_cible}}</strong> %.</p>
<h2>Article 2 – Données images</h2>
<p>Le Client fournit un jeu de données images annoté conforme aux spécifications convenues. La qualité des annotations conditionne les performances du modèle.</p>
<h2>Article 3 – Livrables</h2>
<p>Modèle entraîné, API d'inférence, documentation et rapport de performance remis le <strong>{{date_livraison}}</strong>.</p>
<h2>Article 4 – Droit applicable</h2>
<p>Droit ivoirien et Actes Uniformes OHADA.</p></div>`
  },
  {
    code: 'ia2_forecasting_bi',
    name: "Accord de service de prédiction et forecasting (BI)",
    category: 'commercial_financier', price: 8000, priceMax: 24000,
    description: "Contrat de service de modélisation prédictive et de prévision (forecasting) des indicateurs métier clés pour la prise de décision.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'client_nom',label:"Client",type:'text',required:true},
      {key:'prestataire_nom',label:"Prestataire BI / Data Science",type:'text',required:true},
      {key:'indicateurs',label:"Indicateurs à prévoir",type:'textarea',required:true},
      {key:'horizon_prevision',label:"Horizon de prévision (jours/semaines/mois)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRÉDICTION ET FORECASTING (BI)</h1>
<p>Entre <strong>{{prestataire_nom}}</strong> et <strong>{{client_nom}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>Le Prestataire développe des modèles de prévision pour les indicateurs suivants : <strong>{{indicateurs}}</strong>, sur un horizon de <strong>{{horizon_prevision}}</strong>.</p>
<h2>Article 2 – Qualité des données</h2>
<p>Le Client met à disposition les données historiques nécessaires dans un format structuré. La qualité des prévisions dépend de l'exhaustivité et de la fiabilité des données fournies.</p>
<h2>Article 3 – Livrables</h2>
<p>Modèles de prévision, tableaux de bord interactifs et documentation méthodologique.</p>
<h2>Article 4 – Durée</h2>
<p>Accord en vigueur à compter du <strong>{{date_debut}}</strong>.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Droit ivoirien et Actes Uniformes OHADA.</p></div>`
  },
  {
    code: 'ia2_scoring_credit',
    name: "Accord de service de scoring crédit (credit scoring IA)",
    category: 'commercial_financier', price: 12000, priceMax: 38000,
    description: "Contrat de développement et déploiement d'un système de scoring crédit par IA pour les établissements financiers en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'client_nom',label:"Établissement financier",type:'text',required:true},
      {key:'prestataire_nom',label:"Prestataire IA fintech",type:'text',required:true},
      {key:'population_cible',label:"Population cible (PME, particuliers…)",type:'text',required:true},
      {key:'auc_cible',label:"AUC-ROC cible du modèle",type:'text',required:true},
      {key:'date_mise_production',label:"Date de mise en production",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SCORING CRÉDIT PAR IA</h1>
<p>Entre <strong>{{prestataire_nom}}</strong> et <strong>{{client_nom}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>Le Prestataire développe un modèle de scoring crédit par IA ciblant la population : <strong>{{population_cible}}</strong>, avec un AUC-ROC cible de <strong>{{auc_cible}}</strong>.</p>
<h2>Article 2 – Conformité réglementaire</h2>
<p>Le modèle est conforme aux exigences de la BCEAO en matière de gestion du risque de crédit et de non-discrimination algorithmique.</p>
<h2>Article 3 – Explicabilité</h2>
<p>Le Client dispose d'outils d'explicabilité (SHAP, LIME) permettant de justifier les décisions d'octroi ou de refus de crédit.</p>
<h2>Article 4 – Mise en production</h2>
<p>Le modèle est mis en production le <strong>{{date_mise_production}}</strong>.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Droit ivoirien, réglementation BCEAO et Actes Uniformes OHADA.</p></div>`
  },
  {
    code: 'ia2_detection_fraude',
    name: "Accord de service de détection de fraude (IA banque)",
    category: 'commercial_financier', price: 13000, priceMax: 40000,
    description: "Contrat de développement d'un système de détection de fraude en temps réel basé sur l'IA pour le secteur bancaire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 74,
    fieldsJson: F([
      {key:'client_nom',label:"Banque / Institution financière",type:'text',required:true},
      {key:'prestataire_nom',label:"Prestataire IA anti-fraude",type:'text',required:true},
      {key:'volume_transactions',label:"Volume transactions quotidiennes",type:'text',required:true},
      {key:'latence_max',label:"Latence maximale de détection (ms)",type:'text',required:true},
      {key:'date_debut',label:"Date de déploiement",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DÉTECTION DE FRAUDE PAR IA</h1>
<p>Entre <strong>{{prestataire_nom}}</strong> et <strong>{{client_nom}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>Le Prestataire déploie un système de détection de fraude en temps réel capable de traiter <strong>{{volume_transactions}}</strong> transactions quotidiennes avec une latence maximale de <strong>{{latence_max}}</strong> ms.</p>
<h2>Article 2 – Modèle de détection</h2>
<p>Le système combine des règles métier et des modèles d'apprentissage automatique mis à jour mensuellement pour s'adapter aux nouvelles typologies de fraude.</p>
<h2>Article 3 – Faux positifs</h2>
<p>Le taux de faux positifs est contractuellement limité. Tout dépassement donne lieu à un audit du modèle dans les 30 jours.</p>
<h2>Article 4 – Durée</h2>
<p>Accord en vigueur à compter du <strong>{{date_debut}}</strong>.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Droit ivoirien, réglementation BCEAO et Actes Uniformes OHADA.</p></div>`
  },
  {
    code: 'ia2_recommandation_produit',
    name: "Accord de service de recommandation produit (moteur)",
    category: 'commercial_financier', price: 8000, priceMax: 24000,
    description: "Contrat de développement et d'intégration d'un moteur de recommandation produit personnalisé basé sur l'IA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'client_nom',label:"Client (e-commerce / distributeur)",type:'text',required:true},
      {key:'prestataire_nom',label:"Prestataire moteur de recommandation",type:'text',required:true},
      {key:'nb_produits',label:"Nombre de produits dans le catalogue",type:'text',required:true},
      {key:'kpi_cible',label:"KPI cible (taux de clic, panier moyen…)",type:'text',required:true},
      {key:'date_mise_en_ligne',label:"Date de mise en ligne",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — MOTEUR DE RECOMMANDATION PRODUIT IA</h1>
<p>Entre <strong>{{prestataire_nom}}</strong> et <strong>{{client_nom}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>Le Prestataire développe et intègre un moteur de recommandation personnalisé pour un catalogue de <strong>{{nb_produits}}</strong> produits.</p>
<h2>Article 2 – Performance</h2>
<p>Le KPI cible est : <strong>{{kpi_cible}}</strong>. Des tests A/B sont conduits avant la mise en production définitive.</p>
<h2>Article 3 – Données utilisateurs</h2>
<p>Le traitement des données comportementales des utilisateurs est conforme à la loi n° 2013-450 relative à la protection des données personnelles en Côte d'Ivoire.</p>
<h2>Article 4 – Mise en ligne</h2>
<p>Le moteur est mis en ligne le <strong>{{date_mise_en_ligne}}</strong>.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Droit ivoirien et Actes Uniformes OHADA.</p></div>`
  },
  {
    code: 'ia2_chatbot_support',
    name: "Accord de service de chatbot support client (IA)",
    category: 'commercial_financier', price: 7000, priceMax: 21000,
    description: "Contrat de déploiement d'un chatbot IA pour le support client multicanal (web, WhatsApp, SMS).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 80,
    fieldsJson: F([
      {key:'client_nom',label:"Client",type:'text',required:true},
      {key:'prestataire_nom',label:"Prestataire chatbot IA",type:'text',required:true},
      {key:'canaux',label:"Canaux de déploiement",type:'text',required:true},
      {key:'taux_resolution_cible',label:"Taux de résolution automatique cible (%)",type:'text',required:true},
      {key:'date_lancement',label:"Date de lancement",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE CHATBOT SUPPORT CLIENT IA</h1>
<p>Entre <strong>{{prestataire_nom}}</strong> et <strong>{{client_nom}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>Le Prestataire déploie un chatbot IA de support client sur les canaux : <strong>{{canaux}}</strong>, avec un taux de résolution automatique cible de <strong>{{taux_resolution_cible}}</strong> %.</p>
<h2>Article 2 – Escalade humaine</h2>
<p>En cas de demande non résolue par le chatbot, une escalade vers un agent humain est déclenchée automatiquement.</p>
<h2>Article 3 – Amélioration continue</h2>
<p>Le modèle est réentraîné chaque trimestre sur les nouvelles interactions pour améliorer ses performances.</p>
<h2>Article 4 – Durée</h2>
<p>Accord en vigueur à compter du <strong>{{date_lancement}}</strong>.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Droit ivoirien et Actes Uniformes OHADA.</p></div>`
  },
  {
    code: 'ia2_rpa_automation',
    name: "Accord de service d'automatisation de processus (RPA+IA)",
    category: 'commercial_financier', price: 9000, priceMax: 28000,
    description: "Contrat de déploiement de robots logiciels (RPA) augmentés par l'IA pour automatiser les processus administratifs répétitifs.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 71,
    fieldsJson: F([
      {key:'client_nom',label:"Client",type:'text',required:true},
      {key:'prestataire_nom',label:"Prestataire RPA/IA",type:'text',required:true},
      {key:'processus_automatises',label:"Processus à automatiser",type:'textarea',required:true},
      {key:'gain_ftet_estime',label:"Gain FTE estimé",type:'text',required:true},
      {key:'date_mise_production',label:"Date de mise en production",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'AUTOMATISATION DE PROCESSUS (RPA + IA)</h1>
<p>Entre <strong>{{prestataire_nom}}</strong> et <strong>{{client_nom}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>Le Prestataire automatise les processus suivants : <strong>{{processus_automatises}}</strong>, avec un gain FTE estimé de <strong>{{gain_ftet_estime}}</strong>.</p>
<h2>Article 2 – Approche</h2>
<p>La solution combine des robots RPA pour les tâches structurées et des composants IA (OCR, NLP) pour les tâches semi-structurées.</p>
<h2>Article 3 – Gouvernance</h2>
<p>Un Centre d'Excellence RPA est mis en place avec un responsable désigné côté Client pour superviser les robots en production.</p>
<h2>Article 4 – Mise en production</h2>
<p>La mise en production est prévue le <strong>{{date_mise_production}}</strong>.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Droit ivoirien et Actes Uniformes OHADA.</p></div>`
  },
  {
    code: 'ia2_generatif_llm',
    name: "Accord de service d'IA générative (LLM, GPT modèle)",
    category: 'commercial_financier', price: 12000, priceMax: 38000,
    description: "Contrat de développement et de déploiement d'une solution d'IA générative basée sur un grand modèle de langage (LLM).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 82,
    fieldsJson: F([
      {key:'client_nom',label:"Client",type:'text',required:true},
      {key:'prestataire_nom',label:"Prestataire IA générative",type:'text',required:true},
      {key:'modele_llm',label:"Modèle LLM utilisé",type:'text',required:true},
      {key:'cas_usage_gen',label:"Cas d'usage génératif",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'IA GÉNÉRATIVE (LLM)</h1>
<p>Entre <strong>{{prestataire_nom}}</strong> et <strong>{{client_nom}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>Le Prestataire déploie une solution d'IA générative basée sur le modèle <strong>{{modele_llm}}</strong> pour les cas d'usage suivants : <strong>{{cas_usage_gen}}</strong>.</p>
<h2>Article 2 – Guardrails et conformité</h2>
<p>Des filtres de sécurité (guardrails) sont mis en place pour prévenir la génération de contenus illicites, discriminatoires ou contraires aux valeurs de l'organisation.</p>
<h2>Article 3 – Propriété des sorties</h2>
<p>Les contenus générés à la demande du Client sont propriété du Client, sous réserve des conditions d'utilisation du fournisseur du modèle LLM.</p>
<h2>Article 4 – Durée</h2>
<p>Accord en vigueur à compter du <strong>{{date_debut}}</strong>.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Droit ivoirien et Actes Uniformes OHADA.</p></div>`
  },
  {
    code: 'ia2_data_lake',
    name: "Accord de service de data lake et data warehouse (cloud)",
    category: 'commercial_financier', price: 11000, priceMax: 33000,
    description: "Contrat de conception et d'exploitation d'un data lake et/ou data warehouse cloud pour la centralisation et l'analyse des données d'entreprise.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'client_nom',label:"Client",type:'text',required:true},
      {key:'prestataire_nom',label:"Prestataire Data & Cloud",type:'text',required:true},
      {key:'volume_donnees_to',label:"Volume de données estimé (To)",type:'text',required:true},
      {key:'sources_donnees',label:"Sources de données intégrées",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DATA LAKE ET DATA WAREHOUSE CLOUD</h1>
<p>Entre <strong>{{prestataire_nom}}</strong> et <strong>{{client_nom}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>Le Prestataire conçoit et opère un data lake/warehouse cloud pour <strong>{{volume_donnees_to}}</strong> To de données issues des sources : <strong>{{sources_donnees}}</strong>.</p>
<h2>Article 2 – Architecture</h2>
<p>L'architecture suit le principe de séparation des couches : ingestion, stockage brut (lake), transformation (warehouse) et couche analytique.</p>
<h2>Article 3 – Gouvernance</h2>
<p>Un catalogue de données et des règles de qualité sont mis en place pour assurer la fiabilité des données disponibles aux équipes analytiques.</p>
<h2>Article 4 – Durée</h2>
<p>Accord en vigueur à compter du <strong>{{date_debut}}</strong>.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Droit ivoirien et Actes Uniformes OHADA.</p></div>`
  },
  {
    code: 'ia2_pipeline_etl',
    name: "Accord de service de pipelines de données (ETL/ELT)",
    category: 'commercial_financier', price: 8000, priceMax: 24000,
    description: "Contrat de développement et d'exploitation de pipelines ETL/ELT pour l'intégration et la transformation des données d'entreprise.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 66,
    fieldsJson: F([
      {key:'client_nom',label:"Client",type:'text',required:true},
      {key:'prestataire_nom',label:"Prestataire Data Engineering",type:'text',required:true},
      {key:'nb_pipelines',label:"Nombre de pipelines ETL/ELT",type:'text',required:true},
      {key:'frequence_execution',label:"Fréquence d'exécution",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PIPELINES DE DONNÉES (ETL/ELT)</h1>
<p>Entre <strong>{{prestataire_nom}}</strong> et <strong>{{client_nom}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>Le Prestataire développe et opère <strong>{{nb_pipelines}}</strong> pipelines de données ETL/ELT exécutés avec la fréquence suivante : <strong>{{frequence_execution}}</strong>.</p>
<h2>Article 2 – Qualité</h2>
<p>Chaque pipeline inclut des contrôles de qualité automatisés (vérification de schéma, de volumes, de valeurs nulles) et alerte en cas d'anomalie.</p>
<h2>Article 3 – Documentation</h2>
<p>Un dictionnaire de données et une documentation des transformations appliquées sont maintenus à jour.</p>
<h2>Article 4 – Durée</h2>
<p>Accord en vigueur à compter du <strong>{{date_debut}}</strong>.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Droit ivoirien et Actes Uniformes OHADA.</p></div>`
  },
  {
    code: 'ia2_data_governance',
    name: "Accord de service de data governance (qualité données)",
    category: 'commercial_financier', price: 9000, priceMax: 27000,
    description: "Contrat de mise en place d'un programme de gouvernance des données incluant catalogue, qualité, lineage et conformité.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 63,
    fieldsJson: F([
      {key:'client_nom',label:"Client",type:'text',required:true},
      {key:'prestataire_nom',label:"Prestataire Data Governance",type:'text',required:true},
      {key:'domaines_donnees',label:"Domaines de données couverts",type:'textarea',required:true},
      {key:'outil_catalogue',label:"Outil de catalogue de données",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GOUVERNANCE DES DONNÉES</h1>
<p>Entre <strong>{{prestataire_nom}}</strong> et <strong>{{client_nom}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>Le Prestataire met en place un programme de gouvernance des données couvrant les domaines : <strong>{{domaines_donnees}}</strong>, outillé par <strong>{{outil_catalogue}}</strong>.</p>
<h2>Article 2 – Composantes</h2>
<p>Le programme comprend : catalogue de données, règles de qualité, lineage (traçabilité), classification des données sensibles et rôles de Data Stewards.</p>
<h2>Article 3 – Conformité</h2>
<p>Le programme est conforme à la loi ivoirienne n° 2013-450 sur la protection des données personnelles et aux recommandations BCEAO applicables.</p>
<h2>Article 4 – Durée</h2>
<p>Accord en vigueur à compter du <strong>{{date_debut}}</strong>.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Droit ivoirien et Actes Uniformes OHADA.</p></div>`
  },
  {
    code: 'ia2_dashboard_ai',
    name: "Accord de service de tableau de bord IA (dashboard)",
    category: 'commercial_financier', price: 6000, priceMax: 18000,
    description: "Contrat de conception et de déploiement de tableaux de bord analytiques et prédictifs augmentés par l'IA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 73,
    fieldsJson: F([
      {key:'client_nom',label:"Client",type:'text',required:true},
      {key:'prestataire_nom',label:"Prestataire BI / Dashboard IA",type:'text',required:true},
      {key:'outil_dashboard',label:"Outil de visualisation retenu",type:'text',required:true},
      {key:'nb_tableaux_bord',label:"Nombre de tableaux de bord",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE TABLEAU DE BORD IA</h1>
<p>Entre <strong>{{prestataire_nom}}</strong> et <strong>{{client_nom}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>Le Prestataire conçoit et déploie <strong>{{nb_tableaux_bord}}</strong> tableau(x) de bord analytiques et prédictifs sur <strong>{{outil_dashboard}}</strong>.</p>
<h2>Article 2 – Fonctionnalités IA</h2>
<p>Les tableaux de bord intègrent : alertes intelligentes, détection automatique d'anomalies et narratives générés par IA pour l'aide à la décision.</p>
<h2>Article 3 – Formation</h2>
<p>Une formation des utilisateurs finaux est incluse dans la prestation.</p>
<h2>Article 4 – Livraison</h2>
<p>Les tableaux de bord sont livrés le <strong>{{date_livraison}}</strong>.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Droit ivoirien et Actes Uniformes OHADA.</p></div>`
  },
  {
    code: 'ia2_agri_satellite',
    name: "Accord de service d'IA agriculture (satellite, IoT, IA)",
    category: 'commercial_financier', price: 10000, priceMax: 30000,
    description: "Contrat de service d'intelligence artificielle pour l'agriculture de précision utilisant données satellitaires et capteurs IoT en Afrique de l'Ouest.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'client_nom',label:"Agri-entreprise / Coopérative",type:'text',required:true},
      {key:'prestataire_nom',label:"Prestataire AgriTech IA",type:'text',required:true},
      {key:'superficie_ha',label:"Superficie couverte (hectares)",type:'text',required:true},
      {key:'cultures_cibles',label:"Cultures cibles",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE IA AGRICULTURE (SATELLITE, IoT, IA)</h1>
<p>Entre <strong>{{prestataire_nom}}</strong> et <strong>{{client_nom}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>Le Prestataire fournit une solution d'IA pour l'agriculture de précision sur <strong>{{superficie_ha}}</strong> hectares de cultures de <strong>{{cultures_cibles}}</strong>.</p>
<h2>Article 2 – Données</h2>
<p>La solution intègre : images satellites (NDVI, humidité sol), données de capteurs IoT (météo, irrigation) et modèles prédictifs de rendement et de maladies.</p>
<h2>Article 3 – Livrables</h2>
<p>Recommandations agronomiques hebdomadaires, cartes de prescription et alertes phytosanitaires en temps réel.</p>
<h2>Article 4 – Durée</h2>
<p>Accord en vigueur à compter du <strong>{{date_debut}}</strong>.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Droit ivoirien et Actes Uniformes OHADA.</p></div>`
  },
  {
    code: 'ia2_sante_diagnostic',
    name: "Accord de service d'IA santé (diagnostic image, IA médicale)",
    category: 'commercial_financier', price: 14000, priceMax: 42000,
    description: "Contrat de déploiement d'une solution d'IA médicale pour l'aide au diagnostic par analyse d'images radiologiques ou histologiques.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 73,
    fieldsJson: F([
      {key:'client_nom',label:"Établissement de santé",type:'text',required:true},
      {key:'prestataire_nom',label:"Prestataire IA médicale",type:'text',required:true},
      {key:'type_imagerie',label:"Type d'imagerie (radio, écho, histo…)",type:'text',required:true},
      {key:'pathologies_cibles',label:"Pathologies ciblées",type:'text',required:true},
      {key:'date_debut',label:"Date de déploiement",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE IA SANTÉ — AIDE AU DIAGNOSTIC</h1>
<p>Entre <strong>{{prestataire_nom}}</strong> et <strong>{{client_nom}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>Le Prestataire déploie une solution d'IA d'aide au diagnostic par analyse d'imagerie <strong>{{type_imagerie}}</strong> pour la détection de : <strong>{{pathologies_cibles}}</strong>.</p>
<h2>Article 2 – Responsabilité médicale</h2>
<p>La solution est un outil d'aide à la décision. La responsabilité médicale demeure exclusive au médecin praticien qui valide tout diagnostic.</p>
<h2>Article 3 – Données de santé</h2>
<p>Le traitement des données de santé est conforme aux lois ivoiriennes en vigueur et aux recommandations de l'OMS sur l'IA en santé.</p>
<h2>Article 4 – Durée</h2>
<p>Accord en vigueur à compter du <strong>{{date_debut}}</strong>.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Droit ivoirien, réglementation sanitaire nationale et Actes Uniformes OHADA.</p></div>`
  },
  {
    code: 'ia2_juridique_nlp',
    name: "Accord de service d'IA juridique (analyse contrats, NLP OHADA)",
    category: 'commercial_financier', price: 11000, priceMax: 33000,
    description: "Contrat de déploiement d'une solution d'IA pour l'analyse automatisée de contrats et la veille juridique OHADA par NLP.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 69,
    fieldsJson: F([
      {key:'client_nom',label:"Cabinet / Entreprise",type:'text',required:true},
      {key:'prestataire_nom',label:"Prestataire LegalTech IA",type:'text',required:true},
      {key:'corpus_juridique',label:"Corpus juridique couvert (OHADA, CI…)",type:'text',required:true},
      {key:'nb_contrats_mois',label:"Volume de contrats à analyser par mois",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE IA JURIDIQUE (ANALYSE CONTRATS, NLP OHADA)</h1>
<p>Entre <strong>{{prestataire_nom}}</strong> et <strong>{{client_nom}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>Le Prestataire déploie une solution d'IA d'analyse contractuelle couvrant le corpus <strong>{{corpus_juridique}}</strong>, pour un volume de <strong>{{nb_contrats_mois}}</strong> contrats par mois.</p>
<h2>Article 2 – Fonctionnalités</h2>
<p>La solution inclut : extraction automatique des clauses clés, détection des clauses à risque, comparaison avec les standards OHADA et résumé automatique.</p>
<h2>Article 3 – Responsabilité juridique</h2>
<p>Les analyses produites par l'IA sont des aides à la décision. La responsabilité juridique demeure celle du professionnel du droit validant les analyses.</p>
<h2>Article 4 – Durée</h2>
<p>Accord en vigueur à compter du <strong>{{date_debut}}</strong>.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Droit ivoirien et Actes Uniformes OHADA.</p></div>`
  },
  {
    code: 'ia2_formation_datascience',
    name: "Accord de service de formation IA (data science, ML)",
    category: 'commercial_financier', price: 6000, priceMax: 18000,
    description: "Contrat de formation en intelligence artificielle et data science destiné aux équipes techniques d'entreprises africaines.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 75,
    fieldsJson: F([
      {key:'client_nom',label:"Entreprise / Organisation",type:'text',required:true},
      {key:'organisme_formation',label:"Organisme de formation IA",type:'text',required:true},
      {key:'programme',label:"Programme de formation",type:'textarea',required:true},
      {key:'nb_stagiaires',label:"Nombre de stagiaires",type:'text',required:true},
      {key:'date_debut',label:"Date de début de la formation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FORMATION IA ET DATA SCIENCE</h1>
<p>Entre <strong>{{organisme_formation}}</strong> et <strong>{{client_nom}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>L'Organisme dispense une formation en IA/Data Science à <strong>{{nb_stagiaires}}</strong> stagiaires selon le programme : <strong>{{programme}}</strong>.</p>
<h2>Article 2 – Modalités</h2>
<p>La formation est dispensée en présentiel et/ou en ligne. Des exercices pratiques sur cas d'usage africains sont intégrés au programme.</p>
<h2>Article 3 – Certification</h2>
<p>Les stagiaires ayant satisfait aux évaluations reçoivent une attestation de formation délivrée par l'Organisme.</p>
<h2>Article 4 – Durée</h2>
<p>Formation débutant le <strong>{{date_debut}}</strong>.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Droit ivoirien et Actes Uniformes OHADA.</p></div>`
  },
  {
    code: 'ia2_audit_algorithmique',
    name: "Accord de service d'audit algorithmique (biais, éthique IA)",
    category: 'commercial_financier', price: 9000, priceMax: 27000,
    description: "Contrat d'audit indépendant d'un système d'IA pour évaluer les biais algorithmiques, la robustesse et la conformité éthique.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 64,
    fieldsJson: F([
      {key:'client_nom',label:"Commanditaire de l'audit",type:'text',required:true},
      {key:'auditeur_nom',label:"Cabinet d'audit algorithmique",type:'text',required:true},
      {key:'systeme_ia',label:"Système IA audité",type:'text',required:true},
      {key:'criteres_audit',label:"Critères d'audit (biais, sécurité, conformité…)",type:'textarea',required:true},
      {key:'date_rapport',label:"Date du rapport d'audit",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D'AUDIT ALGORITHMIQUE</h1>
<p>Entre <strong>{{auditeur_nom}}</strong> et <strong>{{client_nom}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>L'Auditeur procède à un audit indépendant du système IA : <strong>{{systeme_ia}}</strong> selon les critères : <strong>{{criteres_audit}}</strong>.</p>
<h2>Article 2 – Méthodologie</h2>
<p>L'audit comprend : analyse des données d'entraînement, tests de biais différenciés, évaluation de la robustesse adversariale et revue de la documentation de gouvernance.</p>
<h2>Article 3 – Confidentialité</h2>
<p>L'Auditeur s'engage à la stricte confidentialité des informations techniques et commerciales du Client.</p>
<h2>Article 4 – Livrable</h2>
<p>Un rapport d'audit complet est remis le <strong>{{date_rapport}}</strong>.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Droit ivoirien et Actes Uniformes OHADA.</p></div>`
  },
  {
    code: 'ia2_cloud_ai_sagemaker',
    name: "Accord de service de cloud AI (AWS SageMaker, Azure ML)",
    category: 'commercial_financier', price: 10000, priceMax: 30000,
    description: "Contrat de mise en place et d'exploitation d'une plateforme cloud MLOps pour l'entraînement et le déploiement de modèles IA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 69,
    fieldsJson: F([
      {key:'client_nom',label:"Client",type:'text',required:true},
      {key:'prestataire_nom',label:"Prestataire Cloud AI",type:'text',required:true},
      {key:'plateforme_mlops',label:"Plateforme MLOps retenue",type:'text',required:true},
      {key:'nb_modeles',label:"Nombre de modèles en production",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE CLOUD AI (MLOps)</h1>
<p>Entre <strong>{{prestataire_nom}}</strong> et <strong>{{client_nom}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>Le Prestataire déploie et opère une plateforme MLOps (<strong>{{plateforme_mlops}}</strong>) pour la gestion de <strong>{{nb_modeles}}</strong> modèles IA en production.</p>
<h2>Article 2 – Cycle de vie des modèles</h2>
<p>La plateforme couvre : expérimentation, versionnement, entraînement, validation, déploiement et monitoring des modèles en production.</p>
<h2>Article 3 – SLA</h2>
<p>Les points de terminaison (endpoints) d'inférence sont garantis disponibles à 99,5 % avec une latence p99 inférieure à 200 ms.</p>
<h2>Article 4 – Durée</h2>
<p>Accord en vigueur à compter du <strong>{{date_debut}}</strong>.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Droit ivoirien et Actes Uniformes OHADA.</p></div>`
  },
  {
    code: 'ia2_rgpd_conformite',
    name: "Accord de conformité RGPD/loi CI IA (protection données)",
    category: 'commercial_financier', price: 8000, priceMax: 24000,
    description: "Contrat d'accompagnement à la mise en conformité des systèmes IA avec la loi ivoirienne sur la protection des données personnelles.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 71,
    fieldsJson: F([
      {key:'client_nom',label:"Organisation",type:'text',required:true},
      {key:'consultant_nom',label:"Consultant en conformité données",type:'text',required:true},
      {key:'systemes_ia_concernes',label:"Systèmes IA concernés",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début de la mission",type:'date',required:true},
      {key:'date_fin',label:"Date de fin prévisionnelle",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CONFORMITÉ LOI N° 2013-450 / IA — PROTECTION DES DONNÉES</h1>
<p>Entre <strong>{{consultant_nom}}</strong> et <strong>{{client_nom}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>Le Consultant accompagne le Client dans la mise en conformité de ses systèmes IA (<strong>{{systemes_ia_concernes}}</strong>) avec la loi n° 2013-450 du 19 juin 2013 relative à la protection des données à caractère personnel en Côte d'Ivoire.</p>
<h2>Article 2 – Livrables</h2>
<p>Cartographie des traitements, analyse d'impact (AIPD), registre des traitements, clauses contractuelles types et plan de remédiation.</p>
<h2>Article 3 – Calendrier</h2>
<p>Mission du <strong>{{date_debut}}</strong> au <strong>{{date_fin}}</strong>.</p>
<h2>Article 4 – Droit applicable</h2>
<p>Droit ivoirien, loi n° 2013-450 et Actes Uniformes OHADA.</p></div>`
  },
  {
    code: 'ia2_partenariat_univ',
    name: "Accord de partenariat université-entreprise IA (recherche)",
    category: 'commercial_financier', price: 7000, priceMax: 21000,
    description: "Contrat de partenariat entre une université africaine et une entreprise pour des projets de recherche appliquée en intelligence artificielle.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'universite_nom',label:"Université / Institution de recherche",type:'text',required:true},
      {key:'entreprise_nom',label:"Entreprise partenaire",type:'text',required:true},
      {key:'theme_recherche',label:"Thème de recherche IA",type:'textarea',required:true},
      {key:'duree_mois',label:"Durée du partenariat (mois)",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT UNIVERSITÉ-ENTREPRISE — RECHERCHE IA</h1>
<p>Entre <strong>{{universite_nom}}</strong> et <strong>{{entreprise_nom}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>Les Parties collaborent sur le thème de recherche IA suivant : <strong>{{theme_recherche}}</strong>, pour une durée de <strong>{{duree_mois}}</strong> mois.</p>
<h2>Article 2 – Apports respectifs</h2>
<p>L'Université apporte son expertise académique, ses chercheurs et ses données publiques. L'Entreprise apporte le financement, des données sectorielles et un contexte applicatif.</p>
<h2>Article 3 – Propriété intellectuelle</h2>
<p>Les résultats de la recherche sont co-détenus selon les modalités définies en annexe. Les publications académiques sont autorisées avec un délai d'embargo de six (6) mois.</p>
<h2>Article 4 – Entrée en vigueur</h2>
<p>Accord signé le <strong>{{date_signature}}</strong>.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Droit ivoirien et Actes Uniformes OHADA.</p></div>`
  },
  {
    code: 'ia2_smart_city',
    name: "Accord de service d'IA pour smart city (trafic, énergie)",
    category: 'commercial_financier', price: 15000, priceMax: 45000,
    description: "Contrat de déploiement de solutions d'IA pour la ville intelligente : optimisation du trafic, gestion de l'énergie et services urbains.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'client_nom',label:"Collectivité / Mairie",type:'text',required:true},
      {key:'prestataire_nom',label:"Prestataire Smart City IA",type:'text',required:true},
      {key:'domaines_smart',label:"Domaines smart city couverts",type:'textarea',required:true},
      {key:'nb_capteurs',label:"Nombre de capteurs IoT déployés",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE IA — SMART CITY</h1>
<p>Entre <strong>{{prestataire_nom}}</strong> et <strong>{{client_nom}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>Le Prestataire déploie des solutions d'IA pour la ville intelligente dans les domaines : <strong>{{domaines_smart}}</strong>, avec <strong>{{nb_capteurs}}</strong> capteurs IoT.</p>
<h2>Article 2 – Données urbaines</h2>
<p>Les données collectées (trafic, énergie, déchets, qualité de l'air) sont la propriété de la Collectivité. Le Prestataire est sous-traitant au sens de la loi n° 2013-450.</p>
<h2>Article 3 – Tableau de bord ville</h2>
<p>Un tableau de bord de gestion urbaine en temps réel est mis à disposition des services de la Collectivité.</p>
<h2>Article 4 – Durée</h2>
<p>Accord en vigueur à compter du <strong>{{date_debut}}</strong>.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Droit ivoirien, réglementation ARTCI et Actes Uniformes OHADA.</p></div>`
  },
  {
    code: 'ia2_rapport_perf_modele',
    name: "Rapport de performance modèle IA",
    category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Modèle de rapport périodique de performance d'un système d'IA en production : métriques, dérives, incidents et recommandations.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'client_nom',label:"Client",type:'text',required:true},
      {key:'prestataire_nom',label:"Prestataire IA",type:'text',required:true},
      {key:'modele_nom',label:"Nom du modèle IA",type:'text',required:true},
      {key:'periode_rapport',label:"Période couverte",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE MODÈLE IA</h1>
<p>Préparé par <strong>{{prestataire_nom}}</strong> pour <strong>{{client_nom}}</strong> — Modèle : <strong>{{modele_nom}}</strong> — Période : <strong>{{periode_rapport}}</strong></p>
<h2>1. Métriques de performance</h2>
<p>Précision, rappel, F1-score et AUC mesurés sur la période : à compléter avec les valeurs observées.</p>
<h2>2. Dérive du modèle (Data Drift)</h2>
<p>Analyse de la dérive des distributions des données d'entrée par rapport à la distribution d'entraînement.</p>
<h2>3. Incidents</h2>
<p>Incidents liés au modèle sur la période : nombre, nature, impact et résolution.</p>
<h2>4. Recommandations</h2>
<p>Nécessité de réentraînement, ajustement des seuils ou évolution du modèle.</p>
<p>Rapport établi le <strong>{{date_rapport}}</strong>.</p></div>`
  },
  {
    code: 'ia2_charte_ethique_ia',
    name: "Charte de l'IA éthique et responsable en Afrique",
    category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Charte d'engagement pour le développement et l'usage d'une intelligence artificielle éthique, inclusive et responsable en contexte africain.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 73,
    fieldsJson: F([
      {key:'organisation_nom',label:"Organisation signataire",type:'text',required:true},
      {key:'representant',label:"Représentant légal",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true},
      {key:'perimetre_ia',label:"Périmètre des systèmes IA concernés",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE L'IA ÉTHIQUE ET RESPONSABLE EN AFRIQUE</h1>
<p>L'organisation <strong>{{organisation_nom}}</strong>, représentée par <strong>{{representant}}</strong>, adopte la présente charte le <strong>{{date_adoption}}</strong>.</p>
<h2>Principe 1 – Équité et non-discrimination</h2>
<p>Les systèmes IA ne doivent pas reproduire ni amplifier les biais liés au genre, à l'ethnie, à la langue ou à la région géographique.</p>
<h2>Principe 2 – Transparence</h2>
<p>Les décisions automatisées ayant un impact significatif sur les personnes doivent être explicables et contestables.</p>
<h2>Principe 3 – Souveraineté des données africaines</h2>
<p>Les données collectées en Afrique servent en priorité le développement du continent et restent sous contrôle des États et institutions africaines.</p>
<h2>Principe 4 – Inclusion</h2>
<p>Les solutions IA sont conçues pour être accessibles aux populations rurales, aux personnes peu alphabétisées et aux langues locales.</p>
<h2>Périmètre</h2>
<p>La charte s'applique aux systèmes suivants : <strong>{{perimetre_ia}}</strong>.</p></div>`
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
  console.log(`Batch 106b OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
