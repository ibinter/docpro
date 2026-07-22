import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ─── SÉCURITÉ PRIVÉE / GARDIENNAGE (sec2_) ───────────────────────────────
  {
    code: 'sec2_gardiennage_site_industriel',
    name: "Contrat de gardiennage de site industriel",
    category: 'commercial_financier', price: 6000, priceMax: 18000,
    description: "Contrat encadrant la prestation de gardiennage et de surveillance d'un site industriel en Côte d'Ivoire, conforme aux exigences OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 75,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client (société)",type:'text',required:true},
      {key:'prestataire_nom',label:"Nom de la société de sécurité",type:'text',required:true},
      {key:'site_adresse',label:"Adresse du site industriel",type:'text',required:true},
      {key:'date_debut',label:"Date de début du contrat",type:'date',required:true},
      {key:'duree_contrat',label:"Durée du contrat (mois)",type:'text',required:true},
      {key:'montant_mensuel',label:"Montant mensuel (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE GARDIENNAGE DE SITE INDUSTRIEL</h1>
<p>Entre les soussignés :</p>
<p><strong>Le Client :</strong> {{client_nom}}, ci-après dénommé "le Client".</p>
<p><strong>Le Prestataire :</strong> {{prestataire_nom}}, société de sécurité privée agréée, ci-après dénommée "le Prestataire".</p>
<h2>Article 1 – Objet du contrat</h2>
<p>Le présent contrat a pour objet la prestation de services de gardiennage et de surveillance du site industriel situé à : {{site_adresse}}.</p>
<h2>Article 2 – Durée</h2>
<p>Le contrat prend effet le {{date_debut}} pour une durée de {{duree_contrat}} mois, renouvelable par tacite reconduction.</p>
<h2>Article 3 – Prestations fournies</h2>
<p>Le Prestataire s'engage à fournir des agents de sécurité qualifiés assurant la surveillance permanente du site, le contrôle des accès, les rondes régulières et la gestion des incidents.</p>
<h2>Article 4 – Rémunération</h2>
<p>Le Client versera au Prestataire la somme de {{montant_mensuel}} FCFA par mois, payable à terme échu dans les 30 jours suivant réception de la facture.</p>
<h2>Article 5 – Obligations du Prestataire</h2>
<p>Le Prestataire s'engage à respecter la réglementation en vigueur relative aux activités de sécurité privée et à fournir du personnel titulaire d'une carte professionnelle valide.</p>
<h2>Article 6 – Responsabilité</h2>
<p>Le Prestataire est responsable des dommages causés par ses agents dans l'exercice de leurs fonctions, dans les limites prévues par la loi.</p>
<h2>Article 7 – Résiliation</h2>
<p>Chaque partie peut résilier le présent contrat avec un préavis de 30 jours notifié par lettre recommandée avec accusé de réception.</p>
<h2>Article 8 – Droit applicable</h2>
<p>Le présent contrat est soumis au droit ivoirien et aux dispositions de l'Acte uniforme OHADA relatif au droit commercial général.</p>
<p>Fait à Abidjan, le {{date_debut}}</p>
<p>Le Client : _________________ &nbsp;&nbsp;&nbsp; Le Prestataire : _________________</p></div>`
  },
  {
    code: 'sec2_gardiennage_residence',
    name: "Contrat de gardiennage de résidence",
    category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Contrat de prestation de gardiennage pour la sécurisation d'une résidence privée ou d'un ensemble résidentiel.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 70,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du propriétaire ou syndic",type:'text',required:true},
      {key:'prestataire_nom',label:"Société de gardiennage",type:'text',required:true},
      {key:'residence_adresse',label:"Adresse de la résidence",type:'text',required:true},
      {key:'nombre_agents',label:"Nombre d'agents affectés",type:'text',required:true},
      {key:'date_debut',label:"Date de prise d'effet",type:'date',required:true},
      {key:'montant_mensuel',label:"Redevance mensuelle (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE GARDIENNAGE DE RÉSIDENCE</h1>
<p><strong>Client :</strong> {{client_nom}}</p>
<p><strong>Prestataire :</strong> {{prestataire_nom}}</p>
<h2>Article 1 – Objet</h2>
<p>Le Prestataire assure la surveillance et la sécurisation de la résidence sise à {{residence_adresse}} par {{nombre_agents}} agents qualifiés.</p>
<h2>Article 2 – Durée</h2>
<p>Contrat à compter du {{date_debut}}, renouvelable annuellement.</p>
<h2>Article 3 – Missions</h2>
<p>Contrôle des entrées et sorties, filtrage des visiteurs, rondes nocturnes, rapport d'activité quotidien.</p>
<h2>Article 4 – Prix</h2>
<p>Redevance mensuelle de {{montant_mensuel}} FCFA, payable le 5 de chaque mois.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Droit ivoirien. Tout litige sera soumis au tribunal compétent d'Abidjan.</p>
<p>Signatures : Client _________________ Prestataire _________________</p></div>`
  },
  {
    code: 'sec2_gardiennage_chantier_btp',
    name: "Contrat de gardiennage de chantier BTP",
    category: 'commercial_financier', price: 5000, priceMax: 15000,
    description: "Contrat de surveillance et de gardiennage adapté aux chantiers de construction, protégeant les matériaux et équipements.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'maitre_ouvrage',label:"Maître d'ouvrage",type:'text',required:true},
      {key:'prestataire_nom',label:"Société de gardiennage",type:'text',required:true},
      {key:'chantier_lieu',label:"Localisation du chantier",type:'text',required:true},
      {key:'date_debut',label:"Date de début de la prestation",type:'date',required:true},
      {key:'duree_chantier',label:"Durée prévisionnelle (mois)",type:'text',required:true},
      {key:'montant_mensuel',label:"Montant mensuel (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE GARDIENNAGE DE CHANTIER BTP</h1>
<p><strong>Maître d'ouvrage :</strong> {{maitre_ouvrage}}</p>
<p><strong>Prestataire :</strong> {{prestataire_nom}}</p>
<h2>Article 1 – Objet</h2>
<p>Surveillance du chantier BTP situé à {{chantier_lieu}}, afin de protéger les matériaux, équipements et infrastructures en cours de construction.</p>
<h2>Article 2 – Durée</h2>
<p>Du {{date_debut}} pour une durée de {{duree_chantier}} mois, ajustable selon l'avancement des travaux.</p>
<h2>Article 3 – Prestations</h2>
<p>Gardiennage 24h/24, 7j/7, contrôle des accès au chantier, surveillance des matériaux stockés, compte-rendu journalier.</p>
<h2>Article 4 – Rémunération</h2>
<p>{{montant_mensuel}} FCFA par mois.</p>
<h2>Article 5 – Fin de mission</h2>
<p>Le contrat prend fin à la réception définitive du chantier ou à tout moment avec préavis de 15 jours.</p>
<p>Abidjan, le {{date_debut}} — Signatures : _________________ _________________</p></div>`
  },
  {
    code: 'sec2_rondes_surveillance',
    name: "Accord de service de rondes de surveillance",
    category: 'commercial_financier', price: 3500, priceMax: 10000,
    description: "Accord définissant les modalités d'exécution de rondes mobiles de surveillance pour des sites multiples.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 62,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'prestataire_nom',label:"Société de sécurité",type:'text',required:true},
      {key:'sites_concernes',label:"Sites concernés par les rondes",type:'textarea',required:true},
      {key:'frequence_rondes',label:"Fréquence des rondes (ex: 3 rondes/nuit)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RONDES DE SURVEILLANCE</h1>
<p><strong>Client :</strong> {{client_nom}} | <strong>Prestataire :</strong> {{prestataire_nom}}</p>
<h2>Article 1 – Objet</h2>
<p>Le Prestataire effectuera des rondes mobiles de surveillance sur les sites suivants : {{sites_concernes}}, à raison de {{frequence_rondes}}.</p>
<h2>Article 2 – Modalités</h2>
<p>Chaque ronde fait l'objet d'un rapport horodaté transmis au Client dans les 2 heures suivant son exécution.</p>
<h2>Article 3 – Entrée en vigueur</h2>
<p>Le présent accord prend effet le {{date_debut}}.</p>
<p>Signatures : Client _________________ Prestataire _________________</p></div>`
  },
  {
    code: 'sec2_telesurveillance_alarmes',
    name: "Accord de service de télésurveillance (alarmes)",
    category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Accord encadrant la prestation de télésurveillance par centrale d'alarme pour des locaux professionnels ou résidentiels.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 65,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'prestataire_nom',label:"Société de télésurveillance",type:'text',required:true},
      {key:'site_protege',label:"Adresse du site protégé",type:'text',required:true},
      {key:'type_alarme',label:"Type de système d'alarme installé",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'montant_abonnement',label:"Abonnement mensuel (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TÉLÉSURVEILLANCE (ALARMES)</h1>
<p><strong>Client :</strong> {{client_nom}} | <strong>Prestataire :</strong> {{prestataire_nom}}</p>
<h2>Article 1 – Objet</h2>
<p>Surveillance à distance du site sis à {{site_adresse}} via le système d'alarme de type {{type_alarme}}, relié à la centrale de télésurveillance du Prestataire.</p>
<h2>Article 2 – Interventions</h2>
<p>En cas d'alarme confirmée, le Prestataire déclenche l'intervention d'une équipe mobile dans les 20 minutes et alerte les autorités compétentes.</p>
<h2>Article 3 – Abonnement</h2>
<p>Abonnement mensuel de {{montant_abonnement}} FCFA, prélèvement automatique le 1er de chaque mois. Début : {{date_debut}}.</p>
<p>Signatures : _________________ _________________</p></div>`
  },
  {
    code: 'sec2_videosurveillance_cctv',
    name: "Accord de service de vidéosurveillance (CCTV)",
    category: 'commercial_financier', price: 5000, priceMax: 15000,
    description: "Accord de prestation pour l'installation, la maintenance et la supervision d'un système de vidéosurveillance CCTV.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'client_nom',label:"Client",type:'text',required:true},
      {key:'prestataire_nom',label:"Prestataire CCTV",type:'text',required:true},
      {key:'site_adresse',label:"Adresse du site",type:'text',required:true},
      {key:'nombre_cameras',label:"Nombre de caméras installées",type:'text',required:true},
      {key:'date_installation',label:"Date d'installation",type:'date',required:true},
      {key:'montant_annuel',label:"Montant annuel de maintenance (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE VIDÉOSURVEILLANCE (CCTV)</h1>
<p><strong>Client :</strong> {{client_nom}} | <strong>Prestataire :</strong> {{prestataire_nom}}</p>
<h2>Article 1 – Objet</h2>
<p>Installation de {{nombre_cameras}} caméras CCTV sur le site de {{site_adresse}} et maintenance annuelle du système.</p>
<h2>Article 2 – Prestations incluses</h2>
<p>Installation, paramétrage, supervision à distance 24h/24, archivage des images 30 jours, maintenance préventive trimestrielle.</p>
<h2>Article 3 – Propriété des données</h2>
<p>Les enregistrements restent la propriété exclusive du Client. Le Prestataire s'engage à la confidentialité stricte.</p>
<h2>Article 4 – Tarif</h2>
<p>Installation initiale facturée séparément. Maintenance annuelle : {{montant_annuel}} FCFA. Début : {{date_installation}}.</p>
<p>Signatures : _________________ _________________</p></div>`
  },
  {
    code: 'sec2_controle_acces_badges',
    name: "Accord de service de contrôle d'accès (badges, biométrie)",
    category: 'commercial_financier', price: 5500, priceMax: 16000,
    description: "Accord pour la mise en place et la gestion d'un système de contrôle d'accès par badges ou biométrie.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 69,
    fieldsJson: F([
      {key:'client_nom',label:"Client",type:'text',required:true},
      {key:'prestataire_nom',label:"Prestataire",type:'text',required:true},
      {key:'site_adresse',label:"Site concerné",type:'text',required:true},
      {key:'technologie',label:"Technologie retenue (badges RFID, biométrie, etc.)",type:'text',required:true},
      {key:'date_debut',label:"Date de mise en service",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CONTRÔLE D'ACCÈS</h1>
<p><strong>Client :</strong> {{client_nom}} | <strong>Prestataire :</strong> {{prestataire_nom}}</p>
<h2>Article 1 – Objet</h2>
<p>Fourniture, installation et maintenance d'un système de contrôle d'accès de type {{technologie}} pour le site de {{site_adresse}}.</p>
<h2>Article 2 – Gestion des droits</h2>
<p>Le Prestataire paramètre les droits d'accès selon les instructions du Client et tient un journal des accès consultable à tout moment.</p>
<h2>Article 3 – Protection des données</h2>
<p>Les données biométriques collectées sont traitées conformément à la réglementation ivoirienne en vigueur sur la protection des données personnelles.</p>
<h2>Article 4 – Mise en service</h2>
<p>Le système est opérationnel à compter du {{date_debut}}.</p>
<p>Signatures : _________________ _________________</p></div>`
  },
  {
    code: 'sec2_protection_rapprochee_vip',
    name: "Accord de service de protection rapprochée (VIP)",
    category: 'commercial_financier', price: 8000, priceMax: 24000,
    description: "Accord de prestation pour la protection rapprochée de personnes à hauts risques (dirigeants, personnalités).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 58,
    fieldsJson: F([
      {key:'client_nom',label:"Nom de la personne protégée ou de son mandataire",type:'text',required:true},
      {key:'prestataire_nom',label:"Société de protection",type:'text',required:true},
      {key:'nombre_gardes',label:"Nombre de gardes du corps affectés",type:'text',required:true},
      {key:'duree_mission',label:"Durée de la mission",type:'text',required:true},
      {key:'date_debut',label:"Date de début de mission",type:'date',required:true},
      {key:'montant_journalier',label:"Tarif journalier (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PROTECTION RAPPROCHÉE (VIP)</h1>
<p><strong>Client :</strong> {{client_nom}} | <strong>Prestataire :</strong> {{prestataire_nom}}</p>
<h2>Article 1 – Objet</h2>
<p>Le Prestataire met à disposition {{nombre_gardes}} agent(s) de protection rapprochée dûment formés pour assurer la sécurité personnelle du bénéficiaire.</p>
<h2>Article 2 – Durée</h2>
<p>Mission du {{date_debut}}, d'une durée de {{duree_mission}}.</p>
<h2>Article 3 – Tarification</h2>
<p>Tarif journalier de {{montant_journalier}} FCFA par agent, incluant les frais de déplacement dans le périmètre convenu.</p>
<h2>Article 4 – Confidentialité</h2>
<p>Le Prestataire s'engage à une confidentialité absolue sur les mouvements, habitudes et informations personnelles du bénéficiaire.</p>
<p>Signatures : _________________ _________________</p></div>`
  },
  {
    code: 'sec2_escorte_convoi_fonds',
    name: "Accord de service d'escorte de convoi de fonds",
    category: 'commercial_financier', price: 6000, priceMax: 18000,
    description: "Accord encadrant les opérations d'escorte sécurisée de convois de fonds et valeurs.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      {key:'client_nom',label:"Client (banque ou entreprise)",type:'text',required:true},
      {key:'prestataire_nom',label:"Société d'escorte",type:'text',required:true},
      {key:'itineraire_habituel',label:"Itinéraire habituel",type:'text',required:true},
      {key:'frequence',label:"Fréquence des convois (ex: 2 fois/semaine)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'montant_par_convoi',label:"Montant par convoi (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ESCORTE DE CONVOI DE FONDS</h1>
<p><strong>Client :</strong> {{client_nom}} | <strong>Prestataire :</strong> {{prestataire_nom}}</p>
<h2>Article 1 – Objet</h2>
<p>Escorte sécurisée des convois de fonds sur l'itinéraire : {{itineraire_habituel}}, à raison de {{frequence}}.</p>
<h2>Article 2 – Moyens déployés</h2>
<p>Véhicule d'escorte blindé ou renforcé, agents armés certifiés, coordination avec les forces de l'ordre si nécessaire.</p>
<h2>Article 3 – Responsabilité</h2>
<p>Le Prestataire est responsable de la sécurité du convoi pendant le transport. Toute perte due à une faute prouvée est indemnisée dans les limites de la police d'assurance souscrite.</p>
<h2>Article 4 – Tarification</h2>
<p>{{montant_par_convoi}} FCFA par opération d'escorte. Facturation mensuelle. Début : {{date_debut}}.</p>
<p>Signatures : _________________ _________________</p></div>`
  },
  {
    code: 'sec2_transport_valeurs_cit',
    name: "Accord de service de transport de valeurs (CIT)",
    category: 'commercial_financier', price: 7000, priceMax: 20000,
    description: "Accord de prestation CIT (Cash-in-Transit) pour le transport sécurisé de fonds et objets de valeur.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 63,
    fieldsJson: F([
      {key:'client_nom',label:"Client",type:'text',required:true},
      {key:'prestataire_nom',label:"Société CIT",type:'text',required:true},
      {key:'type_valeurs',label:"Nature des valeurs transportées",type:'text',required:true},
      {key:'montant_max_transport',label:"Montant maximum par transport (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début du contrat",type:'date',required:true},
      {key:'montant_mensuel',label:"Forfait mensuel (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TRANSPORT DE VALEURS (CIT)</h1>
<p><strong>Client :</strong> {{client_nom}} | <strong>Prestataire :</strong> {{prestataire_nom}}</p>
<h2>Article 1 – Objet</h2>
<p>Transport sécurisé de {{type_valeurs}} dans des véhicules blindés, avec prise en charge jusqu'à {{montant_max_transport}} FCFA par opération.</p>
<h2>Article 2 – Normes de sécurité</h2>
<p>Le Prestataire respecte les normes CIT en vigueur : véhicules homologués, agents armés et formés, protocoles anti-braquage.</p>
<h2>Article 3 – Assurance</h2>
<p>Le Prestataire justifie d'une assurance couvrant la valeur des fonds transportés.</p>
<h2>Article 4 – Tarif</h2>
<p>Forfait mensuel : {{montant_mensuel}} FCFA. Début : {{date_debut}}.</p>
<p>Signatures : _________________ _________________</p></div>`
  },
  {
    code: 'sec2_chien_garde_cynophile',
    name: "Accord de service de chien de garde (cynophile)",
    category: 'commercial_financier', price: 4500, priceMax: 13000,
    description: "Accord pour la mise à disposition d'équipes cynophiles dans le cadre de la surveillance de sites.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 55,
    fieldsJson: F([
      {key:'client_nom',label:"Client",type:'text',required:true},
      {key:'prestataire_nom',label:"Société cynophile",type:'text',required:true},
      {key:'site_adresse',label:"Site à surveiller",type:'text',required:true},
      {key:'nombre_equipes',label:"Nombre d'équipes cynophiles",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE CYNOPHILE</h1>
<p><strong>Client :</strong> {{client_nom}} | <strong>Prestataire :</strong> {{prestataire_nom}}</p>
<h2>Article 1 – Objet</h2>
<p>Mise à disposition de {{nombre_equipes}} équipe(s) cynophile(s) (maître-chien + chien) pour la surveillance du site de {{site_adresse}}.</p>
<h2>Article 2 – Certification</h2>
<p>Les chiens sont certifiés et vaccinés. Les maîtres-chiens sont titulaires des habilitations requises.</p>
<h2>Article 3 – Bien-être animal</h2>
<p>Le Prestataire assure les conditions de travail et de repos conformes aux normes de bien-être animal en vigueur.</p>
<h2>Article 4 – Durée</h2>
<p>Contrat à compter du {{date_debut}}, renouvelable annuellement.</p>
<p>Signatures : _________________ _________________</p></div>`
  },
  {
    code: 'sec2_securite_evenementielle',
    name: "Accord de service de sécurité événementielle",
    category: 'commercial_financier', price: 5000, priceMax: 15000,
    description: "Accord pour la prestation de sécurité lors d'événements (concerts, conférences, cérémonies).",
    templateType: 'pdf', classe: 'C', active: true, popularity: 74,
    fieldsJson: F([
      {key:'organisateur',label:"Nom de l'organisateur",type:'text',required:true},
      {key:'prestataire_nom',label:"Société de sécurité événementielle",type:'text',required:true},
      {key:'evenement_nom',label:"Nom et nature de l'événement",type:'text',required:true},
      {key:'date_evenement',label:"Date de l'événement",type:'date',required:true},
      {key:'lieu',label:"Lieu de l'événement",type:'text',required:true},
      {key:'nombre_agents',label:"Nombre d'agents déployés",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SÉCURITÉ ÉVÉNEMENTIELLE</h1>
<p><strong>Organisateur :</strong> {{organisateur}} | <strong>Prestataire :</strong> {{prestataire_nom}}</p>
<h2>Article 1 – Objet</h2>
<p>Sécurisation de l'événement intitulé "{{evenement_nom}}", qui se tiendra le {{date_evenement}} à {{lieu}}, par {{nombre_agents}} agents de sécurité.</p>
<h2>Article 2 – Missions</h2>
<p>Contrôle d'accès, filtrage des participants, gestion des foules, prévention des incidents, coordination avec les secours.</p>
<h2>Article 3 – Plan de sécurité</h2>
<p>Le Prestataire soumet un plan de sécurité à l'organisateur au moins 7 jours avant l'événement pour validation.</p>
<h2>Article 4 – Responsabilité</h2>
<p>Le Prestataire est responsable de la sécurité des personnes dans les zones qui lui sont confiées.</p>
<p>Signatures : Organisateur _________________ Prestataire _________________</p></div>`
  },
  {
    code: 'sec2_securite_aeroportuaire',
    name: "Accord de service de sécurité aéroportuaire (sous-traitance)",
    category: 'commercial_financier', price: 9000, priceMax: 27000,
    description: "Accord de sous-traitance pour la prestation de services de sécurité dans un environnement aéroportuaire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 52,
    fieldsJson: F([
      {key:'donneur_ordre',label:"Société donneuse d'ordre",type:'text',required:true},
      {key:'sous_traitant',label:"Société sous-traitante",type:'text',required:true},
      {key:'aeroport',label:"Aéroport concerné",type:'text',required:true},
      {key:'missions',label:"Missions confiées en sous-traitance",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SOUS-TRAITANCE — SÉCURITÉ AÉROPORTUAIRE</h1>
<p><strong>Donneur d'ordre :</strong> {{donneur_ordre}} | <strong>Sous-traitant :</strong> {{sous_traitant}}</p>
<h2>Article 1 – Objet</h2>
<p>Sous-traitance des missions suivantes sur l'aéroport {{aeroport}} : {{missions}}.</p>
<h2>Article 2 – Habilitations</h2>
<p>Tous les agents affectés doivent être titulaires des habilitations aéroportuaires requises, délivrées par les autorités compétentes.</p>
<h2>Article 3 – Conformité réglementaire</h2>
<p>Le Sous-traitant respecte les normes OACI et les procédures de sûreté aérienne en vigueur.</p>
<h2>Article 4 – Durée</h2>
<p>Accord à compter du {{date_debut}}, sous réserve du maintien des habilitations.</p>
<p>Signatures : _________________ _________________</p></div>`
  },
  {
    code: 'sec2_securite_portuaire',
    name: "Accord de service de sécurité portuaire",
    category: 'commercial_financier', price: 8000, priceMax: 24000,
    description: "Accord de prestation de sécurité pour la protection d'une zone portuaire selon les normes ISPS.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 50,
    fieldsJson: F([
      {key:'autorite_portuaire',label:"Autorité portuaire ou exploitant",type:'text',required:true},
      {key:'prestataire_nom',label:"Prestataire de sécurité",type:'text',required:true},
      {key:'zone_portuaire',label:"Zone portuaire concernée",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'montant_mensuel',label:"Montant mensuel (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SÉCURITÉ PORTUAIRE</h1>
<p><strong>Autorité portuaire :</strong> {{autorite_portuaire}} | <strong>Prestataire :</strong> {{prestataire_nom}}</p>
<h2>Article 1 – Objet</h2>
<p>Prestation de sécurité sur la zone portuaire de {{zone_portuaire}}, conformément aux exigences du Code ISPS et des réglementations portuaires ivoiriennes.</p>
<h2>Article 2 – Missions</h2>
<p>Contrôle d'accès, surveillance du périmètre, filtrage des entrées de marchandises, patrouilles et rondes, coordination avec la Douane et les Forces de l'ordre.</p>
<h2>Article 3 – Plan de sûreté</h2>
<p>Un plan de sûreté portuaire est établi conjointement et révisé annuellement.</p>
<h2>Article 4 – Durée et tarif</h2>
<p>Contrat annuel à compter du {{date_debut}}. Montant mensuel : {{montant_mensuel}} FCFA.</p>
<p>Signatures : _________________ _________________</p></div>`
  },
  {
    code: 'sec2_securite_hoteliere',
    name: "Accord de service de sécurité hôtelière",
    category: 'commercial_financier', price: 5000, priceMax: 14000,
    description: "Accord de prestation de sécurité adapté aux établissements hôteliers et de tourisme.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 66,
    fieldsJson: F([
      {key:'hotel_nom',label:"Nom de l'hôtel",type:'text',required:true},
      {key:'prestataire_nom',label:"Société de sécurité",type:'text',required:true},
      {key:'hotel_adresse',label:"Adresse de l'hôtel",type:'text',required:true},
      {key:'nombre_agents',label:"Nombre d'agents affectés",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'montant_mensuel',label:"Redevance mensuelle (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SÉCURITÉ HÔTELIÈRE</h1>
<p><strong>Hôtel :</strong> {{hotel_nom}}, {{hotel_adresse}} | <strong>Prestataire :</strong> {{prestataire_nom}}</p>
<h2>Article 1 – Objet</h2>
<p>Fourniture de {{nombre_agents}} agents de sécurité pour la sécurisation de l'établissement hôtelier.</p>
<h2>Article 2 – Missions</h2>
<p>Accueil sécuritaire, contrôle des accès, surveillance des halls et parkings, assistance aux clients, gestion des incidents.</p>
<h2>Article 3 – Discrétion</h2>
<p>Les agents adoptent une tenue et un comportement discrets, conformes aux standards hôteliers de l'établissement.</p>
<h2>Article 4 – Tarif</h2>
<p>{{montant_mensuel}} FCFA/mois. Contrat à compter du {{date_debut}}.</p>
<p>Signatures : _________________ _________________</p></div>`
  },
  {
    code: 'sec2_securite_bancaire',
    name: "Accord de service de sécurité bancaire",
    category: 'commercial_financier', price: 7000, priceMax: 21000,
    description: "Accord de prestation de sécurité pour agences bancaires et établissements financiers.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 71,
    fieldsJson: F([
      {key:'banque_nom',label:"Nom de la banque",type:'text',required:true},
      {key:'prestataire_nom',label:"Société de sécurité",type:'text',required:true},
      {key:'agences_concernees',label:"Agences concernées",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'montant_mensuel',label:"Montant mensuel global (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SÉCURITÉ BANCAIRE</h1>
<p><strong>Banque :</strong> {{banque_nom}} | <strong>Prestataire :</strong> {{prestataire_nom}}</p>
<h2>Article 1 – Objet</h2>
<p>Sécurisation des agences bancaires suivantes : {{agences_concernees}}.</p>
<h2>Article 2 – Agents armés</h2>
<p>Les agents affectés aux caisses et coffres sont habilités au port d'arme conformément à la réglementation ivoirienne.</p>
<h2>Article 3 – Protocoles</h2>
<p>Le Prestataire applique les protocoles anti-braquage et anti-intrusion définis conjointement avec la direction sécurité de la Banque.</p>
<h2>Article 4 – Tarif</h2>
<p>{{montant_mensuel}} FCFA/mois. Début : {{date_debut}}.</p>
<p>Signatures : _________________ _________________</p></div>`
  },
  {
    code: 'sec2_enquete_securite_personnel',
    name: "Accord de service d'enquête de sécurité sur le personnel",
    category: 'commercial_financier', price: 3000, priceMax: 9000,
    description: "Accord pour la réalisation d'enquêtes de sécurité et de vérification d'antécédents sur le personnel.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 57,
    fieldsJson: F([
      {key:'client_nom',label:"Client (employeur)",type:'text',required:true},
      {key:'prestataire_nom',label:"Cabinet d'enquêtes",type:'text',required:true},
      {key:'nombre_enquetes',label:"Nombre d'enquêtes prévues",type:'text',required:true},
      {key:'delai_livraison',label:"Délai de livraison par rapport (jours)",type:'text',required:true},
      {key:'cout_par_enquete',label:"Coût par enquête (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ENQUÊTE DE SÉCURITÉ SUR LE PERSONNEL</h1>
<p><strong>Client :</strong> {{client_nom}} | <strong>Prestataire :</strong> {{prestataire_nom}}</p>
<h2>Article 1 – Objet</h2>
<p>Réalisation d'enquêtes de sécurité sur les candidats et employés du Client, à raison de {{nombre_enquetes}} enquêtes par an.</p>
<h2>Article 2 – Périmètre des vérifications</h2>
<p>Vérification des antécédents judiciaires, des références professionnelles, de l'authenticité des diplômes et des identités déclarées.</p>
<h2>Article 3 – Délais et rapports</h2>
<p>Rapport d'enquête remis dans {{delai_livraison}} jours ouvrables. Chaque rapport est confidentiel et transmis au seul destinataire autorisé.</p>
<h2>Article 4 – Tarif</h2>
<p>{{cout_par_enquete}} FCFA par enquête individuelle.</p>
<p>Signatures : _________________ _________________</p></div>`
  },
  {
    code: 'sec2_formation_agents_securite',
    name: "Accord de service de formation en sécurité (agents)",
    category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Accord encadrant des formations professionnelles destinées aux agents de sécurité privée.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 61,
    fieldsJson: F([
      {key:'client_nom',label:"Société cliente (employeur)",type:'text',required:true},
      {key:'organisme_formation',label:"Organisme de formation",type:'text',required:true},
      {key:'intitule_formation',label:"Intitulé de la formation",type:'text',required:true},
      {key:'nombre_stagiaires',label:"Nombre de stagiaires",type:'text',required:true},
      {key:'date_formation',label:"Date de la formation",type:'date',required:true},
      {key:'cout_total',label:"Coût total de la formation (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FORMATION EN SÉCURITÉ</h1>
<p><strong>Employeur :</strong> {{client_nom}} | <strong>Organisme :</strong> {{organisme_formation}}</p>
<h2>Article 1 – Objet</h2>
<p>Formation intitulée "{{intitule_formation}}" destinée à {{nombre_stagiaires}} agents de sécurité.</p>
<h2>Article 2 – Programme</h2>
<p>Le programme détaillé est annexé au présent accord. La formation comprend des modules théoriques et pratiques.</p>
<h2>Article 3 – Attestation</h2>
<p>Une attestation de formation est délivrée à chaque stagiaire ayant satisfait aux évaluations.</p>
<h2>Article 4 – Coût</h2>
<p>Coût total : {{cout_total}} FCFA. Session du {{date_formation}}.</p>
<p>Signatures : _________________ _________________</p></div>`
  },
  {
    code: 'sec2_partenariat_securite_police',
    name: "Accord de partenariat société de sécurité-police nationale",
    category: 'commercial_financier', price: 2000, priceMax: 6000,
    description: "Accord-cadre de coopération entre une société de sécurité privée et la Police nationale.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 45,
    fieldsJson: F([
      {key:'societe_securite',label:"Société de sécurité privée",type:'text',required:true},
      {key:'unite_police',label:"Unité de Police nationale partenaire",type:'text',required:true},
      {key:'zone_cooperation',label:"Zone géographique de coopération",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT SÉCURITÉ PRIVÉE — POLICE NATIONALE</h1>
<p><strong>Société :</strong> {{societe_securite}} | <strong>Unité police :</strong> {{unite_police}}</p>
<h2>Article 1 – Objet</h2>
<p>Coopération dans la zone de {{zone_cooperation}} pour la prévention de la délinquance et la sécurisation des populations.</p>
<h2>Article 2 – Modalités de coopération</h2>
<p>Échange d'informations sécuritaires dans les limites légales, coordination des interventions, formation croisée des agents.</p>
<h2>Article 3 – Limites</h2>
<p>Le présent accord ne confère aucune prérogative de puissance publique à la société de sécurité privée.</p>
<h2>Article 4 – Durée</h2>
<p>Accord signé le {{date_signature}}, valable 2 ans, renouvelable.</p>
<p>Signatures : _________________ _________________</p></div>`
  },
  {
    code: 'sec2_intelligence_economique',
    name: "Accord de service d'intelligence économique et veille",
    category: 'commercial_financier', price: 6000, priceMax: 18000,
    description: "Accord pour des prestations d'intelligence économique, de veille concurrentielle et de gestion des risques.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 53,
    fieldsJson: F([
      {key:'client_nom',label:"Client",type:'text',required:true},
      {key:'prestataire_nom',label:"Cabinet d'intelligence économique",type:'text',required:true},
      {key:'domaines_veille',label:"Domaines de veille ciblés",type:'textarea',required:true},
      {key:'periodicite_rapport',label:"Périodicité des rapports (ex: mensuelle)",type:'text',required:true},
      {key:'montant_mensuel',label:"Honoraires mensuels (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'INTELLIGENCE ÉCONOMIQUE ET VEILLE</h1>
<p><strong>Client :</strong> {{client_nom}} | <strong>Prestataire :</strong> {{prestataire_nom}}</p>
<h2>Article 1 – Objet</h2>
<p>Prestation de veille stratégique et d'intelligence économique sur les domaines suivants : {{domaines_veille}}.</p>
<h2>Article 2 – Livrables</h2>
<p>Rapports de veille {{periodicite_rapport}}, notes d'alerte en temps réel, tableau de bord des risques.</p>
<h2>Article 3 – Confidentialité</h2>
<p>Toutes les informations collectées et les rapports produits sont strictement confidentiels et réservés au seul usage du Client.</p>
<h2>Article 4 – Honoraires</h2>
<p>{{montant_mensuel}} FCFA/mois.</p>
<p>Signatures : _________________ _________________</p></div>`
  },
  {
    code: 'sec2_cybersecurite_physique_datacenter',
    name: "Accord de service de cybersécurité physique (data center)",
    category: 'commercial_financier', price: 8000, priceMax: 24000,
    description: "Accord de sécurité physique pour la protection d'un centre de données (data center).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 58,
    fieldsJson: F([
      {key:'operateur_dc',label:"Opérateur du data center",type:'text',required:true},
      {key:'prestataire_nom',label:"Prestataire de sécurité physique",type:'text',required:true},
      {key:'site_dc',label:"Localisation du data center",type:'text',required:true},
      {key:'niveau_tier',label:"Niveau Tier du data center (I à IV)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'montant_mensuel',label:"Montant mensuel (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SÉCURITÉ PHYSIQUE — DATA CENTER</h1>
<p><strong>Opérateur :</strong> {{operateur_dc}} | <strong>Prestataire :</strong> {{prestataire_nom}}</p>
<h2>Article 1 – Objet</h2>
<p>Protection physique du data center de niveau Tier {{niveau_tier}} situé à {{site_dc}}.</p>
<h2>Article 2 – Mesures de sécurité</h2>
<p>Contrôle d'accès biométrique multi-facteurs, surveillance vidéo 24h/24, gardiennage armé, journaux d'accès horodatés, procédures de sas de sécurité.</p>
<h2>Article 3 – Conformité</h2>
<p>Les mesures mises en place sont conformes aux normes ISO/IEC 27001 et aux exigences Tier applicables.</p>
<h2>Article 4 – Tarif</h2>
<p>{{montant_mensuel}} FCFA/mois. Début : {{date_debut}}.</p>
<p>Signatures : _________________ _________________</p></div>`
  },
  {
    code: 'sec2_rapport_audit_securite',
    name: "Rapport d'audit de sécurité de site",
    category: 'commercial_financier', price: 5000, priceMax: 15000,
    description: "Modèle de rapport d'audit de sécurité permettant d'évaluer les vulnérabilités d'un site.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 67,
    fieldsJson: F([
      {key:'auditeur_nom',label:"Cabinet ou auditeur",type:'text',required:true},
      {key:'client_nom',label:"Entreprise auditée",type:'text',required:true},
      {key:'site_adresse',label:"Site audité",type:'text',required:true},
      {key:'date_audit',label:"Date de l'audit",type:'date',required:true},
      {key:'principales_vulnerabilites',label:"Principales vulnérabilités identifiées",type:'textarea',required:true},
      {key:'recommandations',label:"Recommandations prioritaires",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT D'AUDIT DE SÉCURITÉ DE SITE</h1>
<p><strong>Auditeur :</strong> {{auditeur_nom}} | <strong>Entreprise auditée :</strong> {{client_nom}}</p>
<p><strong>Site :</strong> {{site_adresse}} | <strong>Date :</strong> {{date_audit}}</p>
<h2>1. Résumé exécutif</h2>
<p>Le présent rapport restitue les résultats de l'audit de sécurité conduit sur le site susmentionné.</p>
<h2>2. Vulnérabilités identifiées</h2>
<p>{{principales_vulnerabilites}}</p>
<h2>3. Recommandations</h2>
<p>{{recommandations}}</p>
<h2>4. Plan d'action</h2>
<p>Un plan d'action corrective doit être établi dans les 30 jours suivant la réception du présent rapport.</p>
<p>Signature de l'auditeur : _________________</p></div>`
  },
  {
    code: 'sec2_plan_securite_pgsse',
    name: "Plan de sécurité et sûreté d'établissement (PGSSE)",
    category: 'commercial_financier', price: 6000, priceMax: 18000,
    description: "Modèle de Plan Général de Sécurité et de Sûreté d'Établissement (PGSSE) pour site sensible.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'etablissement_nom',label:"Nom de l'établissement",type:'text',required:true},
      {key:'responsable_securite',label:"Responsable sécurité",type:'text',required:true},
      {key:'site_adresse',label:"Adresse du site",type:'text',required:true},
      {key:'date_elaboration',label:"Date d'élaboration",type:'date',required:true},
      {key:'menaces_identifiees',label:"Menaces et risques identifiés",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN GÉNÉRAL DE SÉCURITÉ ET SÛRETÉ D'ÉTABLISSEMENT (PGSSE)</h1>
<p><strong>Établissement :</strong> {{etablissement_nom}} | <strong>Site :</strong> {{site_adresse}}</p>
<p><strong>Responsable sécurité :</strong> {{responsable_securite}} | <strong>Date :</strong> {{date_elaboration}}</p>
<h2>1. Analyse des risques</h2>
<p>Menaces et risques identifiés : {{menaces_identifiees}}</p>
<h2>2. Organisation de la sécurité</h2>
<p>Description des postes de sécurité, des zones de contrôle, des procédures d'évacuation et des équipements en place.</p>
<h2>3. Procédures d'urgence</h2>
<p>Protocoles incendie, intrusion, menace terroriste, accident industriel, évacuation des personnes.</p>
<h2>4. Révision du plan</h2>
<p>Le présent PGSSE est révisé annuellement ou après tout incident significatif.</p>
<p>Approbation : _________________</p></div>`
  },
  {
    code: 'sec2_sous_traitance_securite',
    name: "Accord de sous-traitance sécurité (en cascade)",
    category: 'commercial_financier', price: 5000, priceMax: 15000,
    description: "Accord de sous-traitance entre une société de sécurité titulaire d'un marché et un sous-traitant.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'titulaire_marche',label:"Société titulaire du marché",type:'text',required:true},
      {key:'sous_traitant',label:"Société sous-traitante",type:'text',required:true},
      {key:'missions_confiees',label:"Missions confiées au sous-traitant",type:'textarea',required:true},
      {key:'site_concerne',label:"Site concerné",type:'text',required:true},
      {key:'montant_sous_traitance',label:"Montant de la sous-traitance (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SOUS-TRAITANCE — SÉCURITÉ PRIVÉE</h1>
<p><strong>Titulaire :</strong> {{titulaire_marche}} | <strong>Sous-traitant :</strong> {{sous_traitant}}</p>
<h2>Article 1 – Objet</h2>
<p>Sous-traitance des missions suivantes sur le site de {{site_concerne}} : {{missions_confiees}}.</p>
<h2>Article 2 – Agrément</h2>
<p>Le Sous-traitant déclare être titulaire de toutes les autorisations requises pour exercer des activités de sécurité privée.</p>
<h2>Article 3 – Rémunération</h2>
<p>Montant de la sous-traitance : {{montant_sous_traitance}} FCFA. Début : {{date_debut}}.</p>
<h2>Article 4 – Responsabilité</h2>
<p>Le Titulaire reste responsable vis-à-vis du Maître d'ouvrage de la qualité des prestations exécutées par le Sous-traitant.</p>
<p>Signatures : _________________ _________________</p></div>`
  },
  {
    code: 'sec2_charte_deontologie_agent',
    name: "Charte de déontologie agent de sécurité privée",
    category: 'commercial_financier', price: 1500, priceMax: 4500,
    description: "Charte définissant les règles éthiques et déontologiques applicables aux agents de sécurité privée.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 64,
    fieldsJson: F([
      {key:'societe_nom',label:"Nom de la société de sécurité",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption de la charte",type:'date',required:true},
      {key:'directeur_nom',label:"Nom du directeur général",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE DÉONTOLOGIE — AGENT DE SÉCURITÉ PRIVÉE</h1>
<p><strong>Société :</strong> {{societe_nom}} | <strong>Adoptée le :</strong> {{date_adoption}}</p>
<h2>Préambule</h2>
<p>La présente charte définit les valeurs et règles de conduite que tout agent de sécurité de {{societe_nom}} s'engage à respecter.</p>
<h2>Article 1 – Intégrité et honnêteté</h2>
<p>L'agent s'interdit tout acte de corruption, de favoritisme ou de détournement.</p>
<h2>Article 2 – Respect des personnes</h2>
<p>L'agent traite toute personne avec dignité et respect, sans discrimination.</p>
<h2>Article 3 – Confidentialité</h2>
<p>L'agent est tenu au secret professionnel sur toutes les informations dont il a connaissance dans l'exercice de ses fonctions.</p>
<h2>Article 4 – Usage proportionné de la force</h2>
<p>L'agent n'a recours à la force qu'en cas de nécessité absolue et de manière strictement proportionnée.</p>
<h2>Article 5 – Engagement</h2>
<p>Tout agent signe la présente charte lors de son embauche.</p>
<p>Le Directeur Général : {{directeur_nom}} — Signature : _________________</p></div>`
  },

  // ─── NETTOYAGE / FACILITY MANAGEMENT (fm2_) ─────────────────────────────
  {
    code: 'fm2_nettoyage_bureaux',
    name: "Accord de service de nettoyage de bureaux",
    category: 'commercial_financier', price: 3000, priceMax: 9000,
    description: "Accord de prestation de nettoyage et d'entretien courant de locaux de bureaux.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 80,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'prestataire_nom',label:"Société de nettoyage",type:'text',required:true},
      {key:'adresse_locaux',label:"Adresse des locaux",type:'text',required:true},
      {key:'surface_m2',label:"Surface à nettoyer (m²)",type:'text',required:true},
      {key:'frequence',label:"Fréquence de passage (ex: 5 fois/semaine)",type:'text',required:true},
      {key:'montant_mensuel',label:"Montant mensuel (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE NETTOYAGE DE BUREAUX</h1>
<p><strong>Client :</strong> {{client_nom}} | <strong>Prestataire :</strong> {{prestataire_nom}}</p>
<h2>Article 1 – Objet</h2>
<p>Nettoyage et entretien des locaux de bureaux de {{surface_m2}} m² situés à {{adresse_locaux}}, à raison de {{frequence}}.</p>
<h2>Article 2 – Prestations</h2>
<p>Dépoussiérage des surfaces, aspiration des sols, lavage des sols, nettoyage des sanitaires, vidage des corbeilles, nettoyage des espaces communs.</p>
<h2>Article 3 – Produits et matériels</h2>
<p>Le Prestataire fournit tous les produits et matériels nécessaires à l'exécution des prestations.</p>
<h2>Article 4 – Tarif</h2>
<p>{{montant_mensuel}} FCFA par mois. Facturation mensuelle.</p>
<h2>Article 5 – Résiliation</h2>
<p>Préavis de 30 jours par lettre recommandée.</p>
<p>Signatures : _________________ _________________</p></div>`
  },
  {
    code: 'fm2_nettoyage_industriel',
    name: "Accord de service de nettoyage industriel",
    category: 'commercial_financier', price: 5000, priceMax: 15000,
    description: "Accord de nettoyage industriel spécialisé pour usines, entrepôts et zones de production.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'client_nom',label:"Industriel client",type:'text',required:true},
      {key:'prestataire_nom',label:"Société de nettoyage industriel",type:'text',required:true},
      {key:'site_adresse',label:"Site industriel",type:'text',required:true},
      {key:'type_nettoyage',label:"Type de nettoyage (haute pression, chimique, etc.)",type:'text',required:true},
      {key:'frequence',label:"Fréquence des interventions",type:'text',required:true},
      {key:'montant_mensuel',label:"Montant mensuel (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE NETTOYAGE INDUSTRIEL</h1>
<p><strong>Client :</strong> {{client_nom}} | <strong>Prestataire :</strong> {{prestataire_nom}}</p>
<h2>Article 1 – Objet</h2>
<p>Nettoyage industriel du site de {{site_adresse}} par la technique de {{type_nettoyage}}, à raison de {{frequence}}.</p>
<h2>Article 2 – Sécurité et EPI</h2>
<p>Les agents du Prestataire sont équipés des équipements de protection individuelle (EPI) adaptés aux conditions industrielles.</p>
<h2>Article 3 – Gestion des déchets</h2>
<p>Les déchets issus du nettoyage sont collectés et éliminés conformément à la réglementation environnementale ivoirienne.</p>
<h2>Article 4 – Tarif</h2>
<p>{{montant_mensuel}} FCFA par mois.</p>
<p>Signatures : _________________ _________________</p></div>`
  },
  {
    code: 'fm2_nettoyage_vitres',
    name: "Accord de service de nettoyage de surfaces vitrées (lavage vitres)",
    category: 'commercial_financier', price: 3500, priceMax: 10000,
    description: "Accord de prestation pour le lavage de vitres et surfaces vitrées, y compris façades en hauteur.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 65,
    fieldsJson: F([
      {key:'client_nom',label:"Client",type:'text',required:true},
      {key:'prestataire_nom',label:"Société de lavage vitres",type:'text',required:true},
      {key:'batiment_adresse',label:"Adresse du bâtiment",type:'text',required:true},
      {key:'nombre_etages',label:"Nombre d'étages",type:'text',required:true},
      {key:'frequence',label:"Fréquence des interventions",type:'text',required:true},
      {key:'montant_intervention',label:"Coût par intervention (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE LAVAGE DE VITRES</h1>
<p><strong>Client :</strong> {{client_nom}} | <strong>Prestataire :</strong> {{prestataire_nom}}</p>
<h2>Article 1 – Objet</h2>
<p>Lavage des surfaces vitrées du bâtiment de {{nombre_etages}} étages situé à {{batiment_adresse}}, à raison de {{frequence}}.</p>
<h2>Article 2 – Techniques</h2>
<p>Lavage à la perche télescopique, nacelle ou rappel selon la hauteur. Le Prestataire respecte les normes de sécurité au travail en hauteur.</p>
<h2>Article 3 – Tarif</h2>
<p>{{montant_intervention}} FCFA par intervention.</p>
<p>Signatures : _________________ _________________</p></div>`
  },
  {
    code: 'fm2_nettoyage_chantier_apres_travaux',
    name: "Accord de service de nettoyage de chantier (après travaux)",
    category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Accord de prestation de nettoyage après travaux pour remettre un site en état de propreté.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 68,
    fieldsJson: F([
      {key:'client_nom',label:"Maître d'ouvrage ou entrepreneur",type:'text',required:true},
      {key:'prestataire_nom',label:"Société de nettoyage",type:'text',required:true},
      {key:'chantier_adresse',label:"Adresse du chantier",type:'text',required:true},
      {key:'surface_m2',label:"Surface à nettoyer (m²)",type:'text',required:true},
      {key:'date_intervention',label:"Date d'intervention",type:'date',required:true},
      {key:'montant_forfait',label:"Forfait de nettoyage (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE NETTOYAGE DE CHANTIER APRÈS TRAVAUX</h1>
<p><strong>Client :</strong> {{client_nom}} | <strong>Prestataire :</strong> {{prestataire_nom}}</p>
<h2>Article 1 – Objet</h2>
<p>Nettoyage complet après travaux du site de {{surface_m2}} m² sis à {{chantier_adresse}}.</p>
<h2>Article 2 – Prestations incluses</h2>
<p>Débarrassage des gravats, nettoyage des sols, vitrages et menuiseries, dépoussiérage intégral, évacuation des déchets de chantier.</p>
<h2>Article 3 – Délai</h2>
<p>Intervention prévue le {{date_intervention}}. Livraison du site propre dans les 48h.</p>
<h2>Article 4 – Tarif</h2>
<p>Forfait unique de {{montant_forfait}} FCFA.</p>
<p>Signatures : _________________ _________________</p></div>`
  },
  {
    code: 'fm2_nettoyage_centres_commerciaux',
    name: "Accord de service de nettoyage de centres commerciaux",
    category: 'commercial_financier', price: 6000, priceMax: 18000,
    description: "Accord de nettoyage et d'entretien pour grands centres commerciaux et galeries marchandes.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 73,
    fieldsJson: F([
      {key:'gestionnaire',label:"Société gestionnaire du centre",type:'text',required:true},
      {key:'prestataire_nom',label:"Société de nettoyage",type:'text',required:true},
      {key:'centre_nom',label:"Nom du centre commercial",type:'text',required:true},
      {key:'surface_totale',label:"Surface totale (m²)",type:'text',required:true},
      {key:'date_debut',label:"Date de début du contrat",type:'date',required:true},
      {key:'montant_mensuel',label:"Montant mensuel (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE NETTOYAGE — CENTRE COMMERCIAL</h1>
<p><strong>Gestionnaire :</strong> {{gestionnaire}} | <strong>Prestataire :</strong> {{prestataire_nom}}</p>
<h2>Article 1 – Objet</h2>
<p>Nettoyage de l'intégralité des surfaces communes de {{centre_nom}} ({{surface_totale}} m²), y compris allées, sanitaires, parkings et espaces de restauration.</p>
<h2>Article 2 – Horaires</h2>
<p>Les interventions sont planifiées en dehors des heures d'affluence et adaptées aux horaires d'ouverture du centre.</p>
<h2>Article 3 – Supervision</h2>
<p>Un chef d'équipe est présent en permanence pendant les heures d'ouverture du centre pour assurer la propreté en continu.</p>
<h2>Article 4 – Tarif</h2>
<p>{{montant_mensuel}} FCFA/mois. Début : {{date_debut}}.</p>
<p>Signatures : _________________ _________________</p></div>`
  },
  {
    code: 'fm2_nettoyage_hotels_housekeeping',
    name: "Accord de service de nettoyage d'hôtels (housekeeping externalisé)",
    category: 'commercial_financier', price: 5000, priceMax: 15000,
    description: "Accord d'externalisation du service de housekeeping pour établissements hôteliers.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'hotel_nom',label:"Nom de l'hôtel",type:'text',required:true},
      {key:'prestataire_nom',label:"Société de housekeeping",type:'text',required:true},
      {key:'nombre_chambres',label:"Nombre de chambres",type:'text',required:true},
      {key:'nombre_agents',label:"Nombre d'agents affectés",type:'text',required:true},
      {key:'montant_mensuel',label:"Redevance mensuelle (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D'EXTERNALISATION DU HOUSEKEEPING HÔTELIER</h1>
<p><strong>Hôtel :</strong> {{hotel_nom}} | <strong>Prestataire :</strong> {{prestataire_nom}}</p>
<h2>Article 1 – Objet</h2>
<p>Externalisation du service de housekeeping pour {{nombre_chambres}} chambres, par {{nombre_agents}} agents qualifiés.</p>
<h2>Article 2 – Standards</h2>
<p>Le Prestataire respecte les standards de l'hôtel en matière de propreté et de présentation des chambres. Un manuel de procédures est élaboré conjointement.</p>
<h2>Article 3 – Linge et fournitures</h2>
<p>La responsabilité de la fourniture du linge incombe à l'Hôtel, sauf stipulation contraire annexée.</p>
<h2>Article 4 – Tarif</h2>
<p>{{montant_mensuel}} FCFA/mois. Début : {{date_debut}}.</p>
<p>Signatures : _________________ _________________</p></div>`
  },
  {
    code: 'fm2_nettoyage_hopitaux_bionettoyage',
    name: "Accord de service de nettoyage d'hôpitaux (bionettoyage)",
    category: 'commercial_financier', price: 7000, priceMax: 21000,
    description: "Accord de prestation de bionettoyage hospitalier selon les protocoles d'hygiène stricts.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'etablissement_sante',label:"Établissement de santé",type:'text',required:true},
      {key:'prestataire_nom',label:"Société de bionettoyage",type:'text',required:true},
      {key:'zones_concernees',label:"Zones concernées (ex: blocs opératoires, salles, couloirs)",type:'textarea',required:true},
      {key:'protocole_reference',label:"Protocole d'hygiène de référence",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'montant_mensuel',label:"Montant mensuel (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE BIONETTOYAGE HOSPITALIER</h1>
<p><strong>Établissement :</strong> {{etablissement_sante}} | <strong>Prestataire :</strong> {{prestataire_nom}}</p>
<h2>Article 1 – Objet</h2>
<p>Bionettoyage des zones suivantes : {{zones_concernees}}, selon le protocole {{protocole_reference}}.</p>
<h2>Article 2 – Personnels habilités</h2>
<p>Agents formés au bionettoyage hospitalier, portant les EPI adaptés (masques, charlottes, sur-blouses, sur-chaussures).</p>
<h2>Article 3 – Produits désinfectants</h2>
<p>Utilisation exclusive de produits homologués pour l'usage hospitalier, conformes aux normes EN en vigueur.</p>
<h2>Article 4 – Traçabilité</h2>
<p>Tenue d'un registre de nettoyage par zone, contrôle microbiologique trimestriel à la charge du Prestataire.</p>
<h2>Article 5 – Tarif</h2>
<p>{{montant_mensuel}} FCFA/mois. Début : {{date_debut}}.</p>
<p>Signatures : _________________ _________________</p></div>`
  },
  {
    code: 'fm2_desinsectisation_deratisation',
    name: "Accord de service de désinsectisation (dératisation, désinfection)",
    category: 'commercial_financier', price: 3000, priceMax: 9000,
    description: "Accord de prestation 3D (dératisation, désinsectisation, désinfection) pour locaux professionnels.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 70,
    fieldsJson: F([
      {key:'client_nom',label:"Client",type:'text',required:true},
      {key:'prestataire_nom',label:"Société 3D",type:'text',required:true},
      {key:'site_adresse',label:"Adresse du site",type:'text',required:true},
      {key:'type_nuisibles',label:"Type de nuisibles ciblés",type:'text',required:true},
      {key:'frequence',label:"Fréquence des traitements",type:'text',required:true},
      {key:'montant_annuel',label:"Forfait annuel (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE 3D — DÉRATISATION, DÉSINSECTISATION, DÉSINFECTION</h1>
<p><strong>Client :</strong> {{client_nom}} | <strong>Prestataire :</strong> {{prestataire_nom}}</p>
<h2>Article 1 – Objet</h2>
<p>Traitement 3D du site de {{site_adresse}} contre : {{type_nuisibles}}, à raison de {{frequence}}.</p>
<h2>Article 2 – Produits</h2>
<p>Produits homologués par le Ministère de la Santé, sans danger pour les occupants et respectueux de l'environnement.</p>
<h2>Article 3 – Rapport de traitement</h2>
<p>Rapport remis après chaque intervention avec constat de l'état du site et recommandations préventives.</p>
<h2>Article 4 – Tarif</h2>
<p>Forfait annuel : {{montant_annuel}} FCFA.</p>
<p>Signatures : _________________ _________________</p></div>`
  },
  {
    code: 'fm2_termites_nuisibles',
    name: "Accord de service de traitement des termites et nuisibles",
    category: 'commercial_financier', price: 3500, priceMax: 10000,
    description: "Accord de traitement anti-termites et autres nuisibles du bois et structures.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 66,
    fieldsJson: F([
      {key:'client_nom',label:"Client (propriétaire)",type:'text',required:true},
      {key:'prestataire_nom',label:"Société de traitement",type:'text',required:true},
      {key:'bien_adresse',label:"Adresse du bien à traiter",type:'text',required:true},
      {key:'surface_a_traiter',label:"Surface à traiter (m²)",type:'text',required:true},
      {key:'date_traitement',label:"Date de traitement",type:'date',required:true},
      {key:'montant_forfait',label:"Forfait de traitement (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE TRAITEMENT ANTI-TERMITES ET NUISIBLES</h1>
<p><strong>Client :</strong> {{client_nom}} | <strong>Prestataire :</strong> {{prestataire_nom}}</p>
<h2>Article 1 – Objet</h2>
<p>Traitement curatif et préventif contre les termites et nuisibles du bien de {{surface_a_traiter}} m² sis à {{bien_adresse}}.</p>
<h2>Article 2 – Diagnostic préalable</h2>
<p>Un diagnostic préalable est réalisé gratuitement pour déterminer l'étendue de l'infestation et la technique de traitement appropriée.</p>
<h2>Article 3 – Garantie</h2>
<p>Le Prestataire garantit l'efficacité du traitement pendant 5 ans, avec traitement curatif gratuit en cas de réapparition.</p>
<h2>Article 4 – Tarif</h2>
<p>Forfait de traitement : {{montant_forfait}} FCFA. Intervention le {{date_traitement}}.</p>
<p>Signatures : _________________ _________________</p></div>`
  },
  {
    code: 'fm2_maintenance_espaces_verts',
    name: "Accord de service de maintenance des espaces verts",
    category: 'commercial_financier', price: 3000, priceMax: 9000,
    description: "Accord de prestation pour l'entretien régulier des espaces verts d'un site.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 74,
    fieldsJson: F([
      {key:'client_nom',label:"Client",type:'text',required:true},
      {key:'prestataire_nom',label:"Paysagiste prestataire",type:'text',required:true},
      {key:'site_adresse',label:"Adresse du site",type:'text',required:true},
      {key:'surface_verte',label:"Surface d'espaces verts (m²)",type:'text',required:true},
      {key:'frequence',label:"Fréquence d'entretien",type:'text',required:true},
      {key:'montant_mensuel',label:"Montant mensuel (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE MAINTENANCE DES ESPACES VERTS</h1>
<p><strong>Client :</strong> {{client_nom}} | <strong>Prestataire :</strong> {{prestataire_nom}}</p>
<h2>Article 1 – Objet</h2>
<p>Entretien des {{surface_verte}} m² d'espaces verts du site de {{site_adresse}}, à raison de {{frequence}}.</p>
<h2>Article 2 – Prestations</h2>
<p>Tonte des pelouses, taille des haies et arbustes, désherbage, arrosage, ramassage des feuilles mortes, entretien des allées.</p>
<h2>Article 3 – Fournitures</h2>
<p>Les produits phytosanitaires et matériels sont fournis par le Prestataire.</p>
<h2>Article 4 – Tarif</h2>
<p>{{montant_mensuel}} FCFA/mois.</p>
<p>Signatures : _________________ _________________</p></div>`
  },
  {
    code: 'fm2_amenagement_paysager',
    name: "Accord de service d'aménagement paysager",
    category: 'commercial_financier', price: 5000, priceMax: 15000,
    description: "Accord pour la conception et la réalisation d'un aménagement paysager de qualité.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'client_nom',label:"Client",type:'text',required:true},
      {key:'prestataire_nom',label:"Paysagiste concepteur",type:'text',required:true},
      {key:'site_adresse',label:"Site à aménager",type:'text',required:true},
      {key:'description_projet',label:"Description du projet paysager",type:'textarea',required:true},
      {key:'date_debut_travaux',label:"Date de début des travaux",type:'date',required:true},
      {key:'montant_global',label:"Montant global des travaux (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D'AMÉNAGEMENT PAYSAGER</h1>
<p><strong>Client :</strong> {{client_nom}} | <strong>Paysagiste :</strong> {{prestataire_nom}}</p>
<h2>Article 1 – Objet</h2>
<p>Conception et réalisation de l'aménagement paysager du site de {{site_adresse}} : {{description_projet}}.</p>
<h2>Article 2 – Plan de conception</h2>
<p>Un plan d'aménagement est soumis au Client pour validation avant le début des travaux.</p>
<h2>Article 3 – Délais</h2>
<p>Début des travaux le {{date_debut_travaux}}. Délai d'exécution convenu dans le plan annexé.</p>
<h2>Article 4 – Garantie</h2>
<p>Les végétaux plantés sont garantis 1 an (reprise garantie). Le Prestataire assure le remplacement gratuit en cas de non-reprise.</p>
<h2>Article 5 – Tarif</h2>
<p>Montant global : {{montant_global}} FCFA.</p>
<p>Signatures : _________________ _________________</p></div>`
  },
  {
    code: 'fm2_gestion_dechets_bureaux',
    name: "Accord de service de collecte et gestion des déchets bureaux",
    category: 'commercial_financier', price: 2500, priceMax: 7500,
    description: "Accord de collecte, tri et gestion des déchets produits par des bureaux et entreprises tertiaires.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 67,
    fieldsJson: F([
      {key:'client_nom',label:"Entreprise cliente",type:'text',required:true},
      {key:'prestataire_nom',label:"Prestataire gestion déchets",type:'text',required:true},
      {key:'site_adresse',label:"Adresse du site",type:'text',required:true},
      {key:'types_dechets',label:"Types de déchets collectés (papier, cartons, DEEE, etc.)",type:'text',required:true},
      {key:'frequence_collecte',label:"Fréquence de collecte",type:'text',required:true},
      {key:'montant_mensuel',label:"Tarif mensuel (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE COLLECTE ET GESTION DES DÉCHETS DE BUREAUX</h1>
<p><strong>Client :</strong> {{client_nom}} | <strong>Prestataire :</strong> {{prestataire_nom}}</p>
<h2>Article 1 – Objet</h2>
<p>Collecte, tri et gestion des déchets suivants : {{types_dechets}}, produits sur le site de {{site_adresse}}, à raison de {{frequence_collecte}}.</p>
<h2>Article 2 – Tri et valorisation</h2>
<p>Le Prestataire trie les déchets à la source et valorise les filières recyclables conformément à la réglementation ivoirienne.</p>
<h2>Article 3 – Traçabilité</h2>
<p>Bordereau de suivi des déchets (BSD) remis au Client après chaque collecte.</p>
<h2>Article 4 – Tarif</h2>
<p>{{montant_mensuel}} FCFA/mois.</p>
<p>Signatures : _________________ _________________</p></div>`
  },
  {
    code: 'fm2_gestion_fontaines_espaces_eau',
    name: "Accord de service de gestion des fontaines et espaces d'eau",
    category: 'commercial_financier', price: 3000, priceMax: 9000,
    description: "Accord d'entretien et de gestion des fontaines décoratives, bassins et espaces aquatiques.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 52,
    fieldsJson: F([
      {key:'client_nom',label:"Client",type:'text',required:true},
      {key:'prestataire_nom',label:"Prestataire aquatique",type:'text',required:true},
      {key:'site_adresse',label:"Adresse du site",type:'text',required:true},
      {key:'nombre_fontaines',label:"Nombre de fontaines/bassins",type:'text',required:true},
      {key:'frequence',label:"Fréquence d'entretien",type:'text',required:true},
      {key:'montant_mensuel',label:"Tarif mensuel (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE GESTION DES FONTAINES ET ESPACES D'EAU</h1>
<p><strong>Client :</strong> {{client_nom}} | <strong>Prestataire :</strong> {{prestataire_nom}}</p>
<h2>Article 1 – Objet</h2>
<p>Entretien de {{nombre_fontaines}} fontaine(s)/bassin(s) sur le site de {{site_adresse}}, à raison de {{frequence}}.</p>
<h2>Article 2 – Prestations</h2>
<p>Nettoyage et traitement de l'eau, entretien des pompes et filtres, contrôle de la qualité de l'eau, remplacement des pièces défectueuses.</p>
<h2>Article 3 – Tarif</h2>
<p>{{montant_mensuel}} FCFA/mois, pièces de remplacement en sus.</p>
<p>Signatures : _________________ _________________</p></div>`
  },
  {
    code: 'fm2_maintenance_multi_technique',
    name: "Accord de service de maintenance multi-technique (CVC, électricité)",
    category: 'commercial_financier', price: 6000, priceMax: 18000,
    description: "Accord de maintenance multi-technique couvrant CVC, électricité, plomberie et autres corps d'état.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 76,
    fieldsJson: F([
      {key:'client_nom',label:"Client",type:'text',required:true},
      {key:'prestataire_nom',label:"Société de maintenance",type:'text',required:true},
      {key:'site_adresse',label:"Site concerné",type:'text',required:true},
      {key:'domaines_maintenance',label:"Domaines couverts (CVC, élec, plomberie, etc.)",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début du contrat",type:'date',required:true},
      {key:'montant_mensuel',label:"Forfait mensuel (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE MAINTENANCE MULTI-TECHNIQUE</h1>
<p><strong>Client :</strong> {{client_nom}} | <strong>Prestataire :</strong> {{prestataire_nom}}</p>
<h2>Article 1 – Objet</h2>
<p>Maintenance préventive et corrective des installations techniques du site de {{site_adresse}}, couvrant : {{domaines_maintenance}}.</p>
<h2>Article 2 – Maintenance préventive</h2>
<p>Plan de maintenance préventive annuel établi en début de contrat. Visites trimestrielles incluses.</p>
<h2>Article 3 – Maintenance corrective</h2>
<p>Délai d'intervention sur dépannage : 4h en heures ouvrées, 8h en dehors. Permanence téléphonique 24h/24.</p>
<h2>Article 4 – Tarif</h2>
<p>Forfait mensuel : {{montant_mensuel}} FCFA. Début : {{date_debut}}.</p>
<p>Signatures : _________________ _________________</p></div>`
  },
  {
    code: 'fm2_facility_management_global',
    name: "Accord de service de facility management intégré (FM global)",
    category: 'commercial_financier', price: 10000, priceMax: 30000,
    description: "Accord global de facility management intégrant l'ensemble des services de gestion des installations.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'client_nom',label:"Client",type:'text',required:true},
      {key:'fm_provider',label:"Société FM prestataire",type:'text',required:true},
      {key:'site_adresse',label:"Site(s) concerné(s)",type:'textarea',required:true},
      {key:'perimetre_services',label:"Périmètre des services FM inclus",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'montant_mensuel',label:"Montant mensuel global (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE FACILITY MANAGEMENT INTÉGRÉ (FM GLOBAL)</h1>
<p><strong>Client :</strong> {{client_nom}} | <strong>FM Provider :</strong> {{fm_provider}}</p>
<h2>Article 1 – Objet</h2>
<p>Prestation de facility management intégré sur les sites suivants : {{site_adresse}}, couvrant : {{perimetre_services}}.</p>
<h2>Article 2 – Modèle de gouvernance</h2>
<p>Un comité de pilotage mensuel réunit les représentants du Client et du FM Provider pour le suivi des KPIs.</p>
<h2>Article 3 – SLAs et pénalités</h2>
<p>Des niveaux de service (SLAs) sont définis par prestation. Tout SLA non atteint donne lieu à une pénalité plafonnée à 10% du forfait mensuel.</p>
<h2>Article 4 – Tarif</h2>
<p>Forfait mensuel global : {{montant_mensuel}} FCFA. Début : {{date_debut}}.</p>
<p>Signatures : _________________ _________________</p></div>`
  },
  {
    code: 'fm2_gestion_parking',
    name: "Accord de service de gestion de parking",
    category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Accord de gestion et d'exploitation d'un parking d'entreprise ou de centre commercial.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 63,
    fieldsJson: F([
      {key:'client_nom',label:"Propriétaire ou gestionnaire du parking",type:'text',required:true},
      {key:'prestataire_nom',label:"Société de gestion de parking",type:'text',required:true},
      {key:'parking_adresse',label:"Adresse du parking",type:'text',required:true},
      {key:'nombre_places',label:"Nombre de places",type:'text',required:true},
      {key:'date_debut',label:"Date de prise en gestion",type:'date',required:true},
      {key:'montant_mensuel',label:"Redevance mensuelle (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE GESTION DE PARKING</h1>
<p><strong>Client :</strong> {{client_nom}} | <strong>Prestataire :</strong> {{prestataire_nom}}</p>
<h2>Article 1 – Objet</h2>
<p>Gestion du parking de {{nombre_places}} places situé à {{parking_adresse}}, à compter du {{date_debut}}.</p>
<h2>Article 2 – Missions</h2>
<p>Gestion des accès, orientation des usagers, surveillance, encaissement des droits de stationnement, nettoyage des allées.</p>
<h2>Article 3 – Recettes</h2>
<p>Les modalités de partage des recettes de stationnement sont définies en annexe.</p>
<h2>Article 4 – Redevance</h2>
<p>{{montant_mensuel}} FCFA/mois versée par le Client au Prestataire.</p>
<p>Signatures : _________________ _________________</p></div>`
  },
  {
    code: 'fm2_fournitures_hygiene',
    name: "Accord de service de fournitures d'hygiène (papier, savon)",
    category: 'commercial_financier', price: 2000, priceMax: 6000,
    description: "Accord d'approvisionnement régulier en consommables d'hygiène pour locaux professionnels.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 71,
    fieldsJson: F([
      {key:'client_nom',label:"Client",type:'text',required:true},
      {key:'fournisseur_nom',label:"Fournisseur d'hygiène",type:'text',required:true},
      {key:'site_adresse',label:"Adresse de livraison",type:'text',required:true},
      {key:'liste_produits',label:"Liste des produits (papier toilette, essuie-mains, savon, etc.)",type:'textarea',required:true},
      {key:'frequence_livraison',label:"Fréquence de livraison",type:'text',required:true},
      {key:'montant_mensuel',label:"Budget mensuel estimé (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE FOURNITURES D'HYGIÈNE</h1>
<p><strong>Client :</strong> {{client_nom}} | <strong>Fournisseur :</strong> {{fournisseur_nom}}</p>
<h2>Article 1 – Objet</h2>
<p>Approvisionnement en consommables d'hygiène ({{liste_produits}}) sur le site de {{site_adresse}}, livraison {{frequence_livraison}}.</p>
<h2>Article 2 – Qualité</h2>
<p>Les produits fournis sont conformes aux normes sanitaires en vigueur. Le Fournisseur garantit la disponibilité permanente des stocks.</p>
<h2>Article 3 – Tarif</h2>
<p>Budget mensuel estimé : {{montant_mensuel}} FCFA. Facturation sur commande réelle.</p>
<p>Signatures : _________________ _________________</p></div>`
  },
  {
    code: 'fm2_accueil_hotesses_entreprise',
    name: "Accord de service d'accueil et hôtesses d'entreprise",
    category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Accord de prestation d'accueil physique et téléphonique par des hôtesses d'entreprise.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 69,
    fieldsJson: F([
      {key:'client_nom',label:"Entreprise cliente",type:'text',required:true},
      {key:'prestataire_nom',label:"Agence d'hôtesses",type:'text',required:true},
      {key:'site_adresse',label:"Adresse du site",type:'text',required:true},
      {key:'nombre_hotesses',label:"Nombre d'hôtesses affectées",type:'text',required:true},
      {key:'horaires',label:"Horaires de travail",type:'text',required:true},
      {key:'montant_mensuel',label:"Redevance mensuelle (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ACCUEIL ET HÔTESSES D'ENTREPRISE</h1>
<p><strong>Client :</strong> {{client_nom}} | <strong>Prestataire :</strong> {{prestataire_nom}}</p>
<h2>Article 1 – Objet</h2>
<p>Mise à disposition de {{nombre_hotesses}} hôtesse(s) pour l'accueil physique et téléphonique du site de {{site_adresse}}, aux horaires suivants : {{horaires}}.</p>
<h2>Article 2 – Missions</h2>
<p>Accueil et orientation des visiteurs, gestion du standard téléphonique, gestion du courrier, remise des badges visiteurs.</p>
<h2>Article 3 – Présentation</h2>
<p>Les hôtesses respectent le code vestimentaire défini par le Client et font preuve de professionnalisme et de discrétion.</p>
<h2>Article 4 – Tarif</h2>
<p>{{montant_mensuel}} FCFA/mois.</p>
<p>Signatures : _________________ _________________</p></div>`
  },
  {
    code: 'fm2_gestion_archives_physiques',
    name: "Accord de service de gestion des archives physiques",
    category: 'commercial_financier', price: 3500, priceMax: 10000,
    description: "Accord de gestion externalisée des archives physiques d'une entreprise.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 64,
    fieldsJson: F([
      {key:'client_nom',label:"Client",type:'text',required:true},
      {key:'prestataire_nom',label:"Société d'archivage",type:'text',required:true},
      {key:'volume_archives',label:"Volume d'archives (nombre de boîtes ou ml)",type:'text',required:true},
      {key:'delai_restitution',label:"Délai de restitution des documents (heures)",type:'text',required:true},
      {key:'duree_conservation',label:"Durée de conservation contractuelle",type:'text',required:true},
      {key:'montant_mensuel',label:"Coût mensuel de stockage (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE GESTION DES ARCHIVES PHYSIQUES</h1>
<p><strong>Client :</strong> {{client_nom}} | <strong>Prestataire :</strong> {{prestataire_nom}}</p>
<h2>Article 1 – Objet</h2>
<p>Stockage et gestion externalisée de {{volume_archives}} d'archives physiques du Client.</p>
<h2>Article 2 – Conditions de stockage</h2>
<p>Les archives sont conservées dans des locaux sécurisés, à hygrométrie contrôlée, protégés contre l'incendie et le vol.</p>
<h2>Article 3 – Restitution</h2>
<p>Toute demande de restitution de document est honorée dans un délai de {{delai_restitution}} heures ouvrées.</p>
<h2>Article 4 – Durée de conservation</h2>
<p>Conservation garantie pendant {{duree_conservation}}. Destruction des archives en fin de contrat selon protocole validé par le Client.</p>
<h2>Article 5 – Tarif</h2>
<p>{{montant_mensuel}} FCFA/mois.</p>
<p>Signatures : _________________ _________________</p></div>`
  },
  {
    code: 'fm2_demenagement_entreprise',
    name: "Accord de service de déménagement d'entreprise",
    category: 'commercial_financier', price: 5000, priceMax: 15000,
    description: "Accord de prestation pour l'organisation et l'exécution d'un déménagement d'entreprise.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'client_nom',label:"Entreprise déménageante",type:'text',required:true},
      {key:'demenageur_nom',label:"Société de déménagement",type:'text',required:true},
      {key:'adresse_depart',label:"Adresse de départ",type:'text',required:true},
      {key:'adresse_arrivee',label:"Adresse d'arrivée",type:'text',required:true},
      {key:'date_demenagement',label:"Date du déménagement",type:'date',required:true},
      {key:'montant_forfait',label:"Montant forfaitaire (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE DÉMÉNAGEMENT D'ENTREPRISE</h1>
<p><strong>Client :</strong> {{client_nom}} | <strong>Déménageur :</strong> {{demenageur_nom}}</p>
<h2>Article 1 – Objet</h2>
<p>Transport et installation du mobilier et équipements de l'entreprise depuis {{adresse_depart}} vers {{adresse_arrivee}}.</p>
<h2>Article 2 – Inventaire</h2>
<p>Un inventaire contradictoire est réalisé avant et après le déménagement. Tout dommage constaté donne lieu à indemnisation.</p>
<h2>Article 3 – Assurance</h2>
<p>Le Déménageur justifie d'une assurance marchandises transportées couvrant la valeur déclarée des biens.</p>
<h2>Article 4 – Date et tarif</h2>
<p>Déménagement prévu le {{date_demenagement}}. Forfait : {{montant_forfait}} FCFA.</p>
<p>Signatures : _________________ _________________</p></div>`
  },
  {
    code: 'fm2_debarras_liquidation_bureaux',
    name: "Accord de service de débarras et liquidation de bureaux",
    category: 'commercial_financier', price: 3500, priceMax: 10000,
    description: "Accord pour le débarras complet et la liquidation du mobilier et équipements de bureaux.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 60,
    fieldsJson: F([
      {key:'client_nom',label:"Client",type:'text',required:true},
      {key:'prestataire_nom',label:"Prestataire de débarras",type:'text',required:true},
      {key:'site_adresse',label:"Adresse des locaux à débarrasser",type:'text',required:true},
      {key:'surface_m2',label:"Surface concernée (m²)",type:'text',required:true},
      {key:'date_intervention',label:"Date d'intervention",type:'date',required:true},
      {key:'montant_forfait',label:"Forfait de débarras (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE DÉBARRAS ET LIQUIDATION DE BUREAUX</h1>
<p><strong>Client :</strong> {{client_nom}} | <strong>Prestataire :</strong> {{prestataire_nom}}</p>
<h2>Article 1 – Objet</h2>
<p>Débarras complet des locaux de {{surface_m2}} m² situés à {{site_adresse}} : enlèvement du mobilier, équipements, archives et déchets divers.</p>
<h2>Article 2 – Valorisation</h2>
<p>Les éléments récupérables sont triés : dons à des associations, revente, recyclage. Un bordereau de destruction est remis pour les archives.</p>
<h2>Article 3 – Date et tarif</h2>
<p>Intervention le {{date_intervention}}. Forfait : {{montant_forfait}} FCFA. Locaux rendus vides et propres.</p>
<p>Signatures : _________________ _________________</p></div>`
  },
  {
    code: 'fm2_rapport_performance_prestataire',
    name: "Rapport de performance prestataire FM",
    category: 'commercial_financier', price: 2500, priceMax: 7500,
    description: "Modèle de rapport trimestriel d'évaluation de la performance d'un prestataire de facility management.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 62,
    fieldsJson: F([
      {key:'client_nom',label:"Client",type:'text',required:true},
      {key:'prestataire_nom',label:"Prestataire FM évalué",type:'text',required:true},
      {key:'periode_evaluation',label:"Période d'évaluation (ex: T1 2025)",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true},
      {key:'note_globale',label:"Note globale de performance (sur 10)",type:'text',required:true},
      {key:'points_amelioration',label:"Points d'amélioration identifiés",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE PRESTATAIRE FM</h1>
<p><strong>Client :</strong> {{client_nom}} | <strong>Prestataire :</strong> {{prestataire_nom}}</p>
<p><strong>Période :</strong> {{periode_evaluation}} | <strong>Date :</strong> {{date_rapport}}</p>
<h2>1. Synthèse</h2>
<p>Note globale de performance : <strong>{{note_globale}}/10</strong></p>
<h2>2. Résultats par domaine</h2>
<p>Tableau des SLAs atteints vs cibles définis en annexe.</p>
<h2>3. Points d'amélioration</h2>
<p>{{points_amelioration}}</p>
<h2>4. Plan d'action</h2>
<p>Les actions correctives sont formalisées et suivies lors du prochain comité de pilotage.</p>
<p>Validé par le Client : _________________ et le Prestataire : _________________</p></div>`
  },
  {
    code: 'fm2_plan_developpement_societe_fm',
    name: "Plan de développement société de services FM",
    category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Modèle de plan stratégique de développement pour une société de services de facility management.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'societe_nom',label:"Nom de la société FM",type:'text',required:true},
      {key:'dirigeant_nom',label:"Nom du dirigeant",type:'text',required:true},
      {key:'annee_plan',label:"Année du plan (ex: 2025-2027)",type:'text',required:true},
      {key:'date_elaboration',label:"Date d'élaboration",type:'date',required:true},
      {key:'objectifs_strategiques',label:"Objectifs stratégiques clés",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT — SOCIÉTÉ DE SERVICES FM</h1>
<p><strong>Société :</strong> {{societe_nom}} | <strong>Dirigeant :</strong> {{dirigeant_nom}}</p>
<p><strong>Plan :</strong> {{annee_plan}} | <strong>Élaboré le :</strong> {{date_elaboration}}</p>
<h2>1. Diagnostic stratégique</h2>
<p>Analyse SWOT de la société et positionnement sur le marché du FM en Côte d'Ivoire.</p>
<h2>2. Objectifs stratégiques</h2>
<p>{{objectifs_strategiques}}</p>
<h2>3. Plan d'actions commerciales</h2>
<p>Prospection de nouveaux clients, développement de l'offre multi-services, partenariats stratégiques.</p>
<h2>4. Plan RH et formation</h2>
<p>Recrutement, montée en compétences et fidélisation des équipes opérationnelles.</p>
<h2>5. Indicateurs de suivi</h2>
<p>CA, taux de rétention clients, nombre de contrats signés, marge opérationnelle.</p>
<p>Approuvé par le Dirigeant : _________________</p></div>`
  },
  {
    code: 'fm2_certification_iso_41001',
    name: "Accord de service de certification ISO 41001 (FM)",
    category: 'commercial_financier', price: 6000, priceMax: 18000,
    description: "Accord d'accompagnement à la certification ISO 41001 relative au système de management du FM.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 50,
    fieldsJson: F([
      {key:'client_nom',label:"Société candidate à la certification",type:'text',required:true},
      {key:'cabinet_conseil',label:"Cabinet de conseil et accompagnement",type:'text',required:true},
      {key:'organisme_certificateur',label:"Organisme certificateur",type:'text',required:true},
      {key:'date_debut',label:"Date de début de la mission",type:'date',required:true},
      {key:'duree_mission',label:"Durée de la mission d'accompagnement (mois)",type:'text',required:true},
      {key:'montant_honoraires',label:"Honoraires globaux (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D'ACCOMPAGNEMENT — CERTIFICATION ISO 41001 FM</h1>
<p><strong>Client :</strong> {{client_nom}} | <strong>Cabinet :</strong> {{cabinet_conseil}}</p>
<p><strong>Organisme certificateur :</strong> {{organisme_certificateur}}</p>
<h2>Article 1 – Objet</h2>
<p>Accompagnement de {{client_nom}} dans sa démarche de certification ISO 41001 (Facility Management — Système de management).</p>
<h2>Article 2 – Phases de la mission</h2>
<p>Phase 1 : Diagnostic et gap analysis. Phase 2 : Mise en conformité et rédaction des procédures. Phase 3 : Audit blanc. Phase 4 : Audit de certification par {{organisme_certificateur}}.</p>
<h2>Article 3 – Durée</h2>
<p>Mission de {{duree_mission}} mois à compter du {{date_debut}}.</p>
<h2>Article 4 – Honoraires</h2>
<p>{{montant_honoraires}} FCFA TTC, versés selon l'échéancier annexé.</p>
<p>Signatures : _________________ _________________</p></div>`
  },
  {
    code: 'fm2_charte_fm_responsable_durable',
    name: "Charte du facility management responsable et durable",
    category: 'commercial_financier', price: 1500, priceMax: 4500,
    description: "Charte d'engagement RSE d'une société de facility management en faveur du développement durable.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 57,
    fieldsJson: F([
      {key:'societe_nom',label:"Nom de la société FM",type:'text',required:true},
      {key:'dirigeant_nom',label:"Nom du dirigeant signataire",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption de la charte",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DU FACILITY MANAGEMENT RESPONSABLE ET DURABLE</h1>
<p><strong>Société :</strong> {{societe_nom}} | <strong>Adoptée le :</strong> {{date_adoption}}</p>
<h2>Préambule</h2>
<p>{{societe_nom}} s'engage à exercer ses activités de facility management dans le respect de l'environnement, des personnes et des communautés locales.</p>
<h2>Engagement 1 – Réduction de l'empreinte environnementale</h2>
<p>Utilisation préférentielle de produits éco-labellisés, réduction des déchets, optimisation de la consommation d'énergie et d'eau.</p>
<h2>Engagement 2 – Bien-être des collaborateurs</h2>
<p>Conditions de travail dignes, formation continue, respect des droits fondamentaux au travail.</p>
<h2>Engagement 3 – Ancrage local</h2>
<p>Priorité aux recrutements locaux, partenariats avec les PME locales, contribution aux projets communautaires.</p>
<h2>Engagement 4 – Éthique des affaires</h2>
<p>Tolérance zéro pour la corruption, la concurrence déloyale et tout manquement à l'intégrité.</p>
<p>Le Dirigeant : {{dirigeant_nom}} — Signature : _________________</p></div>`
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
  console.log(`Batch 72b OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
