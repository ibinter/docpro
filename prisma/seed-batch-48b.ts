import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ─── SÉCURITÉ PRIVÉE (25 templates) ───────────────────────────────────────
  {
    code: 'sec_gardiennage_industriel',
    name: "Contrat de gardiennage industriel",
    category: 'commercial_financier',
    price: 8000, priceMax: 24000,
    description: "Contrat de prestation de gardiennage pour site industriel conforme au droit OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 75,
    fieldsJson: F([
      {key:'nom_client',label:"Raison sociale du client",type:'text',required:true},
      {key:'adresse_site',label:"Adresse du site industriel",type:'text',required:true},
      {key:'nombre_agents',label:"Nombre d'agents de sécurité",type:'text',required:true},
      {key:'date_debut',label:"Date de début du contrat",type:'date',required:true},
      {key:'duree_contrat',label:"Durée du contrat (mois)",type:'text',required:true},
      {key:'montant_mensuel',label:"Montant mensuel FCFA",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE GARDIENNAGE INDUSTRIEL</h1>
<p>Entre la société de sécurité, ci-après dénommée le Prestataire, et <strong>{{nom_client}}</strong>, ci-après dénommé le Client.</p>
<h2>Article 1 – Objet</h2>
<p>Le Prestataire s'engage à assurer la surveillance et le gardiennage du site industriel situé à : {{adresse_site}}.</p>
<h2>Article 2 – Effectif</h2>
<p>Le service sera assuré par {{nombre_agents}} agents de sécurité qualifiés, présents selon les horaires convenus.</p>
<h2>Article 3 – Durée</h2>
<p>Le présent contrat prend effet le {{date_debut}} pour une durée de {{duree_contrat}} mois, renouvelable par tacite reconduction.</p>
<h2>Article 4 – Rémunération</h2>
<p>Le Client s'engage à régler la somme de {{montant_mensuel}} FCFA par mois, payable le 5 de chaque mois.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Le présent contrat est régi par les dispositions de l'Acte uniforme OHADA relatif au droit commercial général.</p>
<p class="signature">Fait à Abidjan, le {{date_debut}}</p>
<div class="signatures"><span>Le Prestataire</span><span>Le Client</span></div></div>`,
  },
  {
    code: 'sec_gardiennage_residentiel',
    name: "Contrat de gardiennage résidentiel",
    category: 'commercial_financier',
    price: 4000, priceMax: 12000,
    description: "Contrat de gardiennage pour résidence, villa ou immeuble d'habitation.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'nom_client',label:"Nom du client",type:'text',required:true},
      {key:'adresse_residence',label:"Adresse de la résidence",type:'text',required:true},
      {key:'type_habitation',label:"Type d'habitation (villa, immeuble…)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'montant_mensuel',label:"Montant mensuel FCFA",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE GARDIENNAGE RÉSIDENTIEL</h1>
<p>Le présent contrat est conclu entre le Prestataire de sécurité et <strong>{{nom_client}}</strong>.</p>
<h2>Article 1 – Objet</h2>
<p>Surveillance et gardiennage de la {{type_habitation}} sise à : {{adresse_residence}}.</p>
<h2>Article 2 – Missions</h2>
<p>Contrôle des entrées et sorties, rondes de surveillance, alerte des autorités en cas d'incident.</p>
<h2>Article 3 – Entrée en vigueur</h2>
<p>Contrat effectif à compter du {{date_debut}}.</p>
<h2>Article 4 – Tarif</h2>
<p>Redevance mensuelle : {{montant_mensuel}} FCFA TTC.</p>
<p class="signature">Fait à Abidjan, le {{date_debut}}</p>
<div class="signatures"><span>Le Prestataire</span><span>Le Client</span></div></div>`,
  },
  {
    code: 'sec_evenementiel',
    name: "Contrat de service de sécurité événementiel",
    category: 'commercial_financier',
    price: 5000, priceMax: 15000,
    description: "Contrat de sécurité pour événements (concerts, conférences, mariages, foires).",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'nom_organisateur',label:"Nom de l'organisateur",type:'text',required:true},
      {key:'intitule_evenement',label:"Intitulé de l'événement",type:'text',required:true},
      {key:'lieu_evenement',label:"Lieu de l'événement",type:'text',required:true},
      {key:'date_evenement',label:"Date de l'événement",type:'date',required:true},
      {key:'nombre_agents',label:"Nombre d'agents mobilisés",type:'text',required:true},
      {key:'montant_prestation',label:"Montant de la prestation FCFA",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SÉCURITÉ ÉVÉNEMENTIELLE</h1>
<p>Entre le Prestataire et <strong>{{nom_organisateur}}</strong>, organisateur de l'événement.</p>
<h2>Article 1 – Événement concerné</h2>
<p>Intitulé : {{intitule_evenement}} — Lieu : {{lieu_evenement}} — Date : {{date_evenement}}.</p>
<h2>Article 2 – Prestation</h2>
<p>Déploiement de {{nombre_agents}} agents pour le contrôle d'accès, la gestion des flux et la sécurisation du périmètre.</p>
<h2>Article 3 – Rémunération</h2>
<p>Montant forfaitaire : {{montant_prestation}} FCFA, payable 50 % à la signature, solde le jour J.</p>
<p class="signature">Fait à Abidjan, le {{date_evenement}}</p>
<div class="signatures"><span>Le Prestataire</span><span>L'Organisateur</span></div></div>`,
  },
  {
    code: 'sec_telesurveillance',
    name: "Accord de service de surveillance électronique (télésurveillance)",
    category: 'commercial_financier',
    price: 6000, priceMax: 18000,
    description: "Accord de télésurveillance avec centrale de réception d'alarmes 24h/24.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'nom_abonne',label:"Nom de l'abonné",type:'text',required:true},
      {key:'adresse_site',label:"Adresse du site à surveiller",type:'text',required:true},
      {key:'type_systeme',label:"Type de système d'alarme",type:'text',required:true},
      {key:'date_debut',label:"Date d'entrée en service",type:'date',required:true},
      {key:'abonnement_mensuel',label:"Abonnement mensuel FCFA",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE TÉLÉSURVEILLANCE ÉLECTRONIQUE</h1>
<p>Conclu entre la Centrale de Télésurveillance (Prestataire) et <strong>{{nom_abonne}}</strong> (Abonné).</p>
<h2>Article 1 – Site surveillé</h2>
<p>Adresse : {{adresse_site}} — Système installé : {{type_systeme}}.</p>
<h2>Article 2 – Service</h2>
<p>La centrale assure la réception et le traitement des alarmes 24h/24, 7j/7, avec levée de doute et intervention si nécessaire.</p>
<h2>Article 3 – Durée et abonnement</h2>
<p>Contrat effectif le {{date_debut}}. Abonnement mensuel : {{abonnement_mensuel}} FCFA.</p>
<p class="signature">Fait à Abidjan, le {{date_debut}}</p>
<div class="signatures"><span>Le Prestataire</span><span>L'Abonné</span></div></div>`,
  },
  {
    code: 'sec_transport_fonds',
    name: "Contrat de transport de fonds et valeurs",
    category: 'commercial_financier',
    price: 10000, priceMax: 30000,
    description: "Contrat de transport sécurisé de fonds, billets de banque et valeurs.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      {key:'nom_client',label:"Nom du client (banque, entreprise)",type:'text',required:true},
      {key:'montant_max_transport',label:"Plafond de fonds transportés FCFA",type:'text',required:true},
      {key:'frequence',label:"Fréquence des transports (par semaine)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'tarif_mensuel',label:"Tarif mensuel FCFA",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE TRANSPORT DE FONDS ET VALEURS</h1>
<p>Entre la société de transport de fonds (Prestataire) et <strong>{{nom_client}}</strong> (Client).</p>
<h2>Article 1 – Objet</h2>
<p>Transport sécurisé de fonds jusqu'à {{montant_max_transport}} FCFA par opération, à raison de {{frequence}} fois par semaine.</p>
<h2>Article 2 – Responsabilité</h2>
<p>Le Prestataire est responsable des fonds dès leur prise en charge et jusqu'à leur remise au destinataire désigné.</p>
<h2>Article 3 – Tarification</h2>
<p>Tarif mensuel : {{tarif_mensuel}} FCFA. Contrat en vigueur à compter du {{date_debut}}.</p>
<p class="signature">Fait à Abidjan, le {{date_debut}}</p>
<div class="signatures"><span>Le Prestataire</span><span>Le Client</span></div></div>`,
  },
  {
    code: 'sec_bodyguard',
    name: "Contrat de protection rapprochée (bodyguard)",
    category: 'commercial_financier',
    price: 12000, priceMax: 36000,
    description: "Contrat de protection personnelle rapprochée pour personnalité ou dirigeant.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 55,
    fieldsJson: F([
      {key:'nom_protege',label:"Identité de la personne protégée",type:'text',required:true},
      {key:'profil_agent',label:"Profil et qualification de l'agent",type:'text',required:true},
      {key:'perimetre_mission',label:"Périmètre de la mission",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'tarif_journalier',label:"Tarif journalier FCFA",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE PROTECTION RAPPROCHÉE</h1>
<p>Entre le Prestataire de sécurité et le mandataire de <strong>{{nom_protege}}</strong>.</p>
<h2>Article 1 – Mission</h2>
<p>Protection personnelle rapprochée dans le périmètre suivant : {{perimetre_mission}}.</p>
<h2>Article 2 – Agent assigné</h2>
<p>{{profil_agent}}, habilité et formé aux techniques de protection rapprochée.</p>
<h2>Article 3 – Rémunération</h2>
<p>Tarif : {{tarif_journalier}} FCFA/jour. Mission effective à compter du {{date_debut}}.</p>
<h2>Article 4 – Confidentialité</h2>
<p>L'agent s'engage à la plus stricte confidentialité sur toutes les informations concernant la personne protégée.</p>
<p class="signature">Fait à Abidjan, le {{date_debut}}</p>
<div class="signatures"><span>Le Prestataire</span><span>Le Mandataire</span></div></div>`,
  },
  {
    code: 'sec_aeroport',
    name: "Accord de service de sécurité aéroportuaire",
    category: 'commercial_financier',
    price: 15000, priceMax: 45000,
    description: "Accord de prestation de sécurité en zone aéroportuaire conforme aux normes OACI.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 50,
    fieldsJson: F([
      {key:'aeroport',label:"Nom de l'aéroport",type:'text',required:true},
      {key:'zones_couvertes',label:"Zones couvertes",type:'text',required:true},
      {key:'nombre_agents',label:"Effectif total d'agents",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'montant_mensuel',label:"Montant mensuel FCFA",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SÉCURITÉ AÉROPORTUAIRE</h1>
<p>Entre le Prestataire agréé et l'autorité gestionnaire de <strong>{{aeroport}}</strong>.</p>
<h2>Article 1 – Périmètre</h2>
<p>Zones couvertes : {{zones_couvertes}}. Effectif déployé : {{nombre_agents}} agents certifiés.</p>
<h2>Article 2 – Normes applicables</h2>
<p>Les prestations sont réalisées conformément aux annexe 17 de l'OACI et aux réglementations nationales de l'aviation civile.</p>
<h2>Article 3 – Rémunération</h2>
<p>Montant mensuel : {{montant_mensuel}} FCFA. Contrat effectif le {{date_debut}}.</p>
<p class="signature">Fait à Abidjan, le {{date_debut}}</p>
<div class="signatures"><span>Le Prestataire</span><span>L'Autorité Aéroportuaire</span></div></div>`,
  },
  {
    code: 'sec_controle_acces',
    name: "Contrat de service de contrôle d'accès entreprise",
    category: 'commercial_financier',
    price: 5000, priceMax: 15000,
    description: "Contrat de gestion du contrôle d'accès physique pour entreprise ou administration.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'nom_client',label:"Nom de l'entreprise cliente",type:'text',required:true},
      {key:'adresse_site',label:"Adresse du site",type:'text',required:true},
      {key:'points_controle',label:"Nombre de points de contrôle",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'montant_mensuel',label:"Forfait mensuel FCFA",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE CONTRÔLE D'ACCÈS ENTREPRISE</h1>
<p>Entre le Prestataire et <strong>{{nom_client}}</strong>.</p>
<h2>Article 1 – Objet</h2>
<p>Gestion et contrôle des accès sur le site de {{adresse_site}}, couvrant {{points_controle}} point(s) de contrôle.</p>
<h2>Article 2 – Prestations</h2>
<p>Vérification des badges, filtrage des visiteurs, tenue du registre d'accès, gestion des flux entrants et sortants.</p>
<h2>Article 3 – Tarification</h2>
<p>Forfait mensuel : {{montant_mensuel}} FCFA. Contrat en vigueur à compter du {{date_debut}}.</p>
<p class="signature">Fait à Abidjan, le {{date_debut}}</p>
<div class="signatures"><span>Le Prestataire</span><span>Le Client</span></div></div>`,
  },
  {
    code: 'sec_ssiap',
    name: "Accord de service de sécurité incendie (SSIAP)",
    category: 'commercial_financier',
    price: 7000, priceMax: 21000,
    description: "Accord de mise à disposition d'agents SSIAP pour établissements recevant du public.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'nom_etablissement',label:"Nom de l'établissement",type:'text',required:true},
      {key:'categorie_erp',label:"Catégorie ERP",type:'text',required:true},
      {key:'niveau_ssiap',label:"Niveau SSIAP requis (1/2/3)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'montant_mensuel',label:"Montant mensuel FCFA",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SÉCURITÉ INCENDIE (SSIAP)</h1>
<p>Entre le Prestataire et <strong>{{nom_etablissement}}</strong>, établissement de catégorie {{categorie_erp}}.</p>
<h2>Article 1 – Objet</h2>
<p>Mise à disposition d'agents de niveau SSIAP {{niveau_ssiap}} pour assurer la prévention et la lutte contre l'incendie.</p>
<h2>Article 2 – Missions</h2>
<p>Rondes de surveillance, vérification des extincteurs et issues de secours, évacuation des occupants en cas d'alerte.</p>
<h2>Article 3 – Rémunération</h2>
<p>Montant mensuel : {{montant_mensuel}} FCFA. Contrat effectif le {{date_debut}}.</p>
<p class="signature">Fait à Abidjan, le {{date_debut}}</p>
<div class="signatures"><span>Le Prestataire</span><span>Le Client</span></div></div>`,
  },
  {
    code: 'sec_cynophile',
    name: "Contrat de service de sécurité cynophile (chiens)",
    category: 'commercial_financier',
    price: 9000, priceMax: 27000,
    description: "Contrat de patrouille cynophile pour entrepôts, chantiers et sites sensibles.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 52,
    fieldsJson: F([
      {key:'nom_client',label:"Nom du client",type:'text',required:true},
      {key:'adresse_site',label:"Adresse du site",type:'text',required:true},
      {key:'nombre_equipes',label:"Nombre d'équipes cynophiles",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'montant_mensuel',label:"Montant mensuel FCFA",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SÉCURITÉ CYNOPHILE</h1>
<p>Entre le Prestataire et <strong>{{nom_client}}</strong>.</p>
<h2>Article 1 – Objet</h2>
<p>Surveillance du site de {{adresse_site}} par {{nombre_equipes}} équipe(s) cynophile(s) (maître-chien + chien dressé).</p>
<h2>Article 2 – Responsabilités</h2>
<p>Le Prestataire garantit que les chiens sont vaccinés, assurés et dressés par des professionnels certifiés.</p>
<h2>Article 3 – Rémunération</h2>
<p>Forfait mensuel : {{montant_mensuel}} FCFA. Contrat effectif le {{date_debut}}.</p>
<p class="signature">Fait à Abidjan, le {{date_debut}}</p>
<div class="signatures"><span>Le Prestataire</span><span>Le Client</span></div></div>`,
  },
  {
    code: 'sec_maritime_portuaire',
    name: "Accord de service de sécurité maritime portuaire",
    category: 'commercial_financier',
    price: 12000, priceMax: 36000,
    description: "Accord de sécurité pour zones portuaires et installations maritimes conforme au code ISPS.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 45,
    fieldsJson: F([
      {key:'nom_port',label:"Nom du port ou terminal",type:'text',required:true},
      {key:'zones_securisees',label:"Zones sécurisées",type:'text',required:true},
      {key:'nombre_agents',label:"Nombre d'agents déployés",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'montant_mensuel',label:"Montant mensuel FCFA",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SÉCURITÉ MARITIME PORTUAIRE</h1>
<p>Entre le Prestataire agréé et l'autorité portuaire de <strong>{{nom_port}}</strong>.</p>
<h2>Article 1 – Périmètre</h2>
<p>Zones couvertes : {{zones_securisees}}. Effectif : {{nombre_agents}} agents formés aux exigences du code ISPS.</p>
<h2>Article 2 – Obligations</h2>
<p>Contrôle des accès aux zones à accès restreint, fouille des véhicules et des marchandises, surveillance des navires à quai.</p>
<h2>Article 3 – Rémunération</h2>
<p>Montant mensuel : {{montant_mensuel}} FCFA. Accord effectif le {{date_debut}}.</p>
<p class="signature">Fait à Abidjan, le {{date_debut}}</p>
<div class="signatures"><span>Le Prestataire</span><span>L'Autorité Portuaire</span></div></div>`,
  },
  {
    code: 'sec_vip',
    name: "Contrat de service de sécurité VIP",
    category: 'commercial_financier',
    price: 10000, priceMax: 30000,
    description: "Contrat de sécurité haut de gamme pour personnalités politiques, diplomatiques ou économiques.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 48,
    fieldsJson: F([
      {key:'identite_vip',label:"Identité ou fonction du VIP",type:'text',required:true},
      {key:'perimetre_protection',label:"Périmètre de protection",type:'text',required:true},
      {key:'duree_mission',label:"Durée de la mission",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'montant_total',label:"Montant total FCFA",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SÉCURITÉ VIP</h1>
<p>Entre le Prestataire spécialisé et le mandataire de <strong>{{identite_vip}}</strong>.</p>
<h2>Article 1 – Mission</h2>
<p>Protection intégrale dans le périmètre : {{perimetre_protection}}, pour une durée de {{duree_mission}}.</p>
<h2>Article 2 – Dispositif</h2>
<p>Équipe dédiée, véhicules blindés si requis, coordination avec les services de l'État.</p>
<h2>Article 3 – Rémunération</h2>
<p>Montant forfaitaire : {{montant_total}} FCFA. Mission effective le {{date_debut}}.</p>
<p class="signature">Fait à Abidjan, le {{date_debut}}</p>
<div class="signatures"><span>Le Prestataire</span><span>Le Mandataire</span></div></div>`,
  },
  {
    code: 'sec_agent_cdi',
    name: "Contrat agent de sécurité (CDI)",
    category: 'commercial_financier',
    price: 3000, priceMax: 9000,
    description: "Contrat de travail à durée indéterminée pour agent de sécurité privée conforme au Code du travail ivoirien.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 80,
    fieldsJson: F([
      {key:'nom_agent',label:"Nom et prénoms de l'agent",type:'text',required:true},
      {key:'poste',label:"Poste occupé",type:'text',required:true},
      {key:'lieu_affectation',label:"Lieu d'affectation",type:'text',required:true},
      {key:'date_embauche',label:"Date d'embauche",type:'date',required:true},
      {key:'salaire_mensuel',label:"Salaire mensuel FCFA",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE TRAVAIL À DURÉE INDÉTERMINÉE — AGENT DE SÉCURITÉ</h1>
<p>Entre la société de sécurité (Employeur) et <strong>{{nom_agent}}</strong> (Employé).</p>
<h2>Article 1 – Engagement</h2>
<p>L'Employé est engagé au poste de {{poste}}, affecté à : {{lieu_affectation}}.</p>
<h2>Article 2 – Prise de fonction</h2>
<p>La prise de fonction est fixée au {{date_embauche}}.</p>
<h2>Article 3 – Rémunération</h2>
<p>Salaire mensuel brut : {{salaire_mensuel}} FCFA, soumis aux cotisations sociales CNPS.</p>
<h2>Article 4 – Obligations</h2>
<p>L'agent s'engage à respecter le règlement intérieur, à porter l'uniforme réglementaire et à maintenir la confidentialité sur les informations des clients.</p>
<p class="signature">Fait à Abidjan, le {{date_embauche}}</p>
<div class="signatures"><span>L'Employeur</span><span>L'Employé</span></div></div>`,
  },
  {
    code: 'sec_agent_cdd',
    name: "Contrat agent de sécurité (CDD)",
    category: 'commercial_financier',
    price: 3000, priceMax: 9000,
    description: "Contrat de travail à durée déterminée pour agent de sécurité privée.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 76,
    fieldsJson: F([
      {key:'nom_agent',label:"Nom et prénoms de l'agent",type:'text',required:true},
      {key:'poste',label:"Poste occupé",type:'text',required:true},
      {key:'motif_cdd',label:"Motif du CDD",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'date_fin',label:"Date de fin",type:'date',required:true},
      {key:'salaire_mensuel',label:"Salaire mensuel FCFA",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE TRAVAIL À DURÉE DÉTERMINÉE — AGENT DE SÉCURITÉ</h1>
<p>Entre la société de sécurité (Employeur) et <strong>{{nom_agent}}</strong> (Employé).</p>
<h2>Article 1 – Motif</h2>
<p>CDD conclu pour le motif suivant : {{motif_cdd}}.</p>
<h2>Article 2 – Durée</h2>
<p>Contrat du {{date_debut}} au {{date_fin}}, poste : {{poste}}.</p>
<h2>Article 3 – Rémunération</h2>
<p>Salaire mensuel brut : {{salaire_mensuel}} FCFA.</p>
<p class="signature">Fait à Abidjan, le {{date_debut}}</p>
<div class="signatures"><span>L'Employeur</span><span>L'Employé</span></div></div>`,
  },
  {
    code: 'sec_centrale_alarme',
    name: "Accord de service de centrale d'alarme",
    category: 'commercial_financier',
    price: 4000, priceMax: 12000,
    description: "Accord de gestion et de supervision d'une centrale d'alarme pour client professionnel.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'nom_client',label:"Nom du client",type:'text',required:true},
      {key:'adresse_site',label:"Adresse du site protégé",type:'text',required:true},
      {key:'type_alarme',label:"Type de système d'alarme",type:'text',required:true},
      {key:'date_debut',label:"Date d'activation",type:'date',required:true},
      {key:'abonnement_mensuel',label:"Abonnement mensuel FCFA",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CENTRALE D'ALARME</h1>
<p>Entre la Centrale d'Alarme (Prestataire) et <strong>{{nom_client}}</strong> (Abonné).</p>
<h2>Article 1 – Installation surveillée</h2>
<p>Site : {{adresse_site}} — Système : {{type_alarme}}.</p>
<h2>Article 2 – Prestations</h2>
<p>Réception des signaux d'alarme, levée de doute téléphonique, déclenchement des interventions, transmission aux forces de l'ordre.</p>
<h2>Article 3 – Abonnement</h2>
<p>{{abonnement_mensuel}} FCFA/mois. Accord actif à compter du {{date_debut}}.</p>
<p class="signature">Fait à Abidjan, le {{date_debut}}</p>
<div class="signatures"><span>Le Prestataire</span><span>L'Abonné</span></div></div>`,
  },
  {
    code: 'sec_cctv',
    name: "Contrat de service d'installation de caméras CCTV",
    category: 'commercial_financier',
    price: 6000, priceMax: 18000,
    description: "Contrat d'installation et de mise en service d'un système de vidéosurveillance CCTV.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 78,
    fieldsJson: F([
      {key:'nom_client',label:"Nom du client",type:'text',required:true},
      {key:'adresse_site',label:"Adresse du site",type:'text',required:true},
      {key:'nombre_cameras',label:"Nombre de caméras à installer",type:'text',required:true},
      {key:'date_installation',label:"Date d'installation prévue",type:'date',required:true},
      {key:'montant_installation',label:"Montant de l'installation FCFA",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT D'INSTALLATION DE SYSTÈME CCTV</h1>
<p>Entre l'Installateur agréé et <strong>{{nom_client}}</strong>.</p>
<h2>Article 1 – Objet</h2>
<p>Installation de {{nombre_cameras}} caméra(s) de surveillance sur le site de {{adresse_site}}.</p>
<h2>Article 2 – Délai</h2>
<p>Installation prévue le {{date_installation}}, avec mise en service et formation à l'utilisation incluses.</p>
<h2>Article 3 – Prix</h2>
<p>Montant forfaitaire : {{montant_installation}} FCFA TTC, matériel et main-d'oeuvre inclus.</p>
<p class="signature">Fait à Abidjan, le {{date_installation}}</p>
<div class="signatures"><span>L'Installateur</span><span>Le Client</span></div></div>`,
  },
  {
    code: 'sec_maintenance_systeme',
    name: "Accord de service de maintenance système sécurité",
    category: 'commercial_financier',
    price: 4000, priceMax: 12000,
    description: "Accord de maintenance préventive et curative des systèmes de sécurité électronique.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'nom_client',label:"Nom du client",type:'text',required:true},
      {key:'systemes_concernes',label:"Systèmes couverts (CCTV, alarme, contrôle accès…)",type:'text',required:true},
      {key:'periodicite',label:"Périodicité des visites (mensuelle, trimestrielle…)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'tarif_annuel',label:"Tarif annuel FCFA",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE MAINTENANCE SYSTÈME SÉCURITÉ</h1>
<p>Entre le Mainteneur agréé et <strong>{{nom_client}}</strong>.</p>
<h2>Article 1 – Systèmes couverts</h2>
<p>{{systemes_concernes}}.</p>
<h2>Article 2 – Fréquence des interventions</h2>
<p>Visites {{periodicite}} de maintenance préventive, plus interventions curatives sous 24h en cas de panne.</p>
<h2>Article 3 – Tarification</h2>
<p>Contrat annuel : {{tarif_annuel}} FCFA TTC. Prise d'effet le {{date_debut}}.</p>
<p class="signature">Fait à Abidjan, le {{date_debut}}</p>
<div class="signatures"><span>Le Mainteneur</span><span>Le Client</span></div></div>`,
  },
  {
    code: 'sec_conseil_surete',
    name: "Contrat de service de conseil en sûreté",
    category: 'commercial_financier',
    price: 8000, priceMax: 24000,
    description: "Contrat de conseil et d'expertise en sûreté pour entreprises et organisations.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 50,
    fieldsJson: F([
      {key:'nom_client',label:"Nom de l'organisation cliente",type:'text',required:true},
      {key:'objet_mission',label:"Objet de la mission de conseil",type:'textarea',required:true},
      {key:'duree_mission',label:"Durée estimée de la mission",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'honoraires',label:"Honoraires FCFA",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE CONSEIL EN SÛRETÉ</h1>
<p>Entre le Consultant en sûreté (Prestataire) et <strong>{{nom_client}}</strong> (Client).</p>
<h2>Article 1 – Mission</h2>
<p>{{objet_mission}}</p>
<h2>Article 2 – Durée</h2>
<p>Mission d'une durée de {{duree_mission}}, démarrant le {{date_debut}}.</p>
<h2>Article 3 – Honoraires</h2>
<p>Honoraires convenus : {{honoraires}} FCFA, payables selon l'avancement des livrables.</p>
<h2>Article 4 – Propriété des livrables</h2>
<p>Les rapports et recommandations produits sont la propriété exclusive du Client à compter du solde des honoraires.</p>
<p class="signature">Fait à Abidjan, le {{date_debut}}</p>
<div class="signatures"><span>Le Consultant</span><span>Le Client</span></div></div>`,
  },
  {
    code: 'sec_plan_surete_industriel',
    name: "Plan de sûreté de site industriel",
    category: 'commercial_financier',
    price: 10000, priceMax: 30000,
    description: "Document de plan de sûreté définissant les mesures de sécurité d'un site industriel.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 45,
    fieldsJson: F([
      {key:'nom_site',label:"Nom du site industriel",type:'text',required:true},
      {key:'responsable_surete',label:"Responsable sûreté du site",type:'text',required:true},
      {key:'niveau_menace',label:"Niveau de menace évalué",type:'text',required:true},
      {key:'date_elaboration',label:"Date d'élaboration",type:'date',required:true},
      {key:'mesures_cles',label:"Mesures clés retenues",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>PLAN DE SÛRETÉ DE SITE INDUSTRIEL</h1>
<h2>Site : {{nom_site}}</h2>
<p>Responsable sûreté : {{responsable_surete}} — Document élaboré le {{date_elaboration}}.</p>
<h2>1. Évaluation de la menace</h2>
<p>Niveau de menace : {{niveau_menace}}.</p>
<h2>2. Mesures de sûreté</h2>
<p>{{mesures_cles}}</p>
<h2>3. Organisation de la réponse</h2>
<p>Chaîne de commandement, procédures d'alerte et protocoles d'évacuation définis en annexe.</p>
<h2>4. Révision</h2>
<p>Le présent plan est révisé annuellement ou après tout incident significatif.</p>
<p class="signature">Approuvé le {{date_elaboration}} par {{responsable_surete}}</p></div>`,
  },
  {
    code: 'sec_audit_securite',
    name: "Rapport d'audit de sécurité physique",
    category: 'commercial_financier',
    price: 8000, priceMax: 24000,
    description: "Rapport d'audit des dispositifs de sécurité physique d'un site ou établissement.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 52,
    fieldsJson: F([
      {key:'nom_site_audite',label:"Nom du site audité",type:'text',required:true},
      {key:'nom_auditeur',label:"Nom de l'auditeur",type:'text',required:true},
      {key:'date_audit',label:"Date de l'audit",type:'date',required:true},
      {key:'constatations',label:"Principales constatations",type:'textarea',required:true},
      {key:'recommandations',label:"Recommandations prioritaires",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>RAPPORT D'AUDIT DE SÉCURITÉ PHYSIQUE</h1>
<p>Site audité : <strong>{{nom_site_audite}}</strong> — Auditeur : {{nom_auditeur}} — Date : {{date_audit}}.</p>
<h2>1. Méthodologie</h2>
<p>Visite terrain, entretiens avec le personnel, analyse documentaire des procédures de sécurité existantes.</p>
<h2>2. Constatations</h2>
<p>{{constatations}}</p>
<h2>3. Recommandations</h2>
<p>{{recommandations}}</p>
<h2>4. Conclusion</h2>
<p>Le présent rapport engage la responsabilité professionnelle de l'auditeur et est destiné à l'usage exclusif du commanditaire.</p>
<p class="signature">Rédigé le {{date_audit}} par {{nom_auditeur}}</p></div>`,
  },
  {
    code: 'sec_formation_agents',
    name: "Accord de formation agents de sécurité",
    category: 'commercial_financier',
    price: 5000, priceMax: 15000,
    description: "Accord de formation professionnelle pour agents de sécurité privée.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'organisme_formation',label:"Organisme de formation",type:'text',required:true},
      {key:'societe_cliente',label:"Société cliente (employeur)",type:'text',required:true},
      {key:'nombre_stagiaires',label:"Nombre de stagiaires",type:'text',required:true},
      {key:'programme',label:"Programme de formation",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début de la formation",type:'date',required:true},
      {key:'cout_total',label:"Coût total FCFA",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE FORMATION AGENTS DE SÉCURITÉ</h1>
<p>Entre <strong>{{organisme_formation}}</strong> (Formateur) et {{societe_cliente}} (Employeur).</p>
<h2>Article 1 – Formation</h2>
<p>Formation de {{nombre_stagiaires}} agents. Programme : {{programme}}</p>
<h2>Article 2 – Calendrier</h2>
<p>Début de la formation : {{date_debut}}.</p>
<h2>Article 3 – Coût</h2>
<p>Coût total : {{cout_total}} FCFA, finançable via le dispositif de formation professionnelle.</p>
<p class="signature">Fait à Abidjan, le {{date_debut}}</p>
<div class="signatures"><span>Le Formateur</span><span>L'Employeur</span></div></div>`,
  },
  {
    code: 'sec_rapport_incident',
    name: "Rapport d'incident de sécurité",
    category: 'commercial_financier',
    price: 2000, priceMax: 6000,
    description: "Rapport standardisé de déclaration d'incident de sécurité survenu sur un site gardienné.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 70,
    fieldsJson: F([
      {key:'date_incident',label:"Date de l'incident",type:'date',required:true},
      {key:'lieu_incident',label:"Lieu de l'incident",type:'text',required:true},
      {key:'nature_incident',label:"Nature de l'incident",type:'text',required:true},
      {key:'description_faits',label:"Description détaillée des faits",type:'textarea',required:true},
      {key:'nom_redacteur',label:"Nom du rédacteur",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>RAPPORT D'INCIDENT DE SÉCURITÉ</h1>
<table><tr><td><strong>Date de l'incident :</strong></td><td>{{date_incident}}</td></tr>
<tr><td><strong>Lieu :</strong></td><td>{{lieu_incident}}</td></tr>
<tr><td><strong>Nature :</strong></td><td>{{nature_incident}}</td></tr></table>
<h2>Description des faits</h2>
<p>{{description_faits}}</p>
<h2>Suites données</h2>
<p>Information de la hiérarchie, contact avec les forces de l'ordre si nécessaire, consignation dans le registre de sécurité.</p>
<p class="signature">Rédigé par : {{nom_redacteur}} — Le {{date_incident}}</p></div>`,
  },
  {
    code: 'sec_plan_continuite',
    name: "Plan de continuité de la sécurité",
    category: 'commercial_financier',
    price: 8000, priceMax: 24000,
    description: "Plan définissant la continuité des services de sécurité en cas de crise ou défaillance.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 48,
    fieldsJson: F([
      {key:'nom_entreprise',label:"Nom de l'entreprise de sécurité",type:'text',required:true},
      {key:'scenarios_couverts',label:"Scénarios de crise couverts",type:'textarea',required:true},
      {key:'ressources_secours',label:"Ressources de secours mobilisables",type:'textarea',required:true},
      {key:'date_elaboration',label:"Date d'élaboration",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>PLAN DE CONTINUITÉ DE LA SÉCURITÉ</h1>
<p>Entreprise : <strong>{{nom_entreprise}}</strong> — Élaboré le {{date_elaboration}}.</p>
<h2>1. Scénarios de crise pris en compte</h2>
<p>{{scenarios_couverts}}</p>
<h2>2. Ressources de substitution</h2>
<p>{{ressources_secours}}</p>
<h2>3. Procédure d'activation</h2>
<p>Déclenchement par le Directeur des opérations sur décision du Directeur Général. Notification aux clients dans les 2 heures.</p>
<h2>4. Test et révision</h2>
<p>Exercice de simulation annuel. Révision du plan tous les 18 mois.</p>
<p class="signature">Approuvé le {{date_elaboration}}</p></div>`,
  },
  {
    code: 'sec_partenariat_police',
    name: "Accord de partenariat police-société de sécurité",
    category: 'commercial_financier',
    price: 6000, priceMax: 18000,
    description: "Accord-cadre de coopération entre une société de sécurité privée et les forces de l'ordre.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 42,
    fieldsJson: F([
      {key:'societe_securite',label:"Nom de la société de sécurité",type:'text',required:true},
      {key:'unite_police',label:"Unité de police ou gendarmerie partenaire",type:'text',required:true},
      {key:'zone_collaboration',label:"Zone de collaboration",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT SÉCURITÉ PRIVÉE / FORCES DE L'ORDRE</h1>
<p>Entre <strong>{{societe_securite}}</strong> et <strong>{{unite_police}}</strong>.</p>
<h2>Article 1 – Objet</h2>
<p>Collaboration pour la sécurisation de la zone : {{zone_collaboration}}.</p>
<h2>Article 2 – Engagements réciproques</h2>
<p>La société de sécurité s'engage à signaler immédiatement tout incident aux forces de l'ordre. Ces dernières s'engagent à intervenir en appui dans les délais les plus brefs.</p>
<h2>Article 3 – Durée</h2>
<p>Accord valable un an à compter du {{date_signature}}, renouvelable par accord écrit.</p>
<p class="signature">Fait à Abidjan, le {{date_signature}}</p>
<div class="signatures"><span>La Société de Sécurité</span><span>Le Commandant d'Unité</span></div></div>`,
  },
  {
    code: 'sec_charte_deontologique',
    name: "Charte déontologique société de sécurité privée",
    category: 'commercial_financier',
    price: 3000, priceMax: 9000,
    description: "Charte énonçant les principes éthiques et déontologiques d'une société de sécurité privée.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'nom_societe',label:"Nom de la société de sécurité",type:'text',required:true},
      {key:'directeur_general',label:"Nom du Directeur Général",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption de la charte",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CHARTE DÉONTOLOGIQUE</h1>
<h2>{{nom_societe}}</h2>
<p>Adoptée le {{date_adoption}} par la Direction Générale.</p>
<h2>Préambule</h2>
<p>La présente charte définit les valeurs et principes qui guident l'action de chaque membre de {{nom_societe}}.</p>
<h2>1. Légalité</h2>
<p>Toutes nos actions respectent les lois et réglementations en vigueur en Côte d'Ivoire.</p>
<h2>2. Intégrité</h2>
<p>Nos agents refusent toute forme de corruption, de trafic d'influence ou de comportement contraire à l'éthique.</p>
<h2>3. Confidentialité</h2>
<p>Les informations concernant nos clients sont strictement confidentielles.</p>
<h2>4. Respect de la dignité humaine</h2>
<p>Nos agents traitent toute personne avec respect, sans discrimination aucune.</p>
<h2>5. Professionnalisme</h2>
<p>La formation continue et le maintien des compétences sont une obligation pour chaque agent.</p>
<p class="signature">Le Directeur Général : {{directeur_general}}</p></div>`,
  },

  // ─── NETTOYAGE / FACILITIES MANAGEMENT (25 templates) ─────────────────────
  {
    code: 'fm_nettoyage_bureaux',
    name: "Contrat de nettoyage de bureaux",
    category: 'commercial_financier',
    price: 4000, priceMax: 12000,
    description: "Contrat de prestation de nettoyage quotidien ou hebdomadaire de locaux de bureaux.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 85,
    fieldsJson: F([
      {key:'nom_client',label:"Nom de l'entreprise cliente",type:'text',required:true},
      {key:'adresse_bureaux',label:"Adresse des bureaux",type:'text',required:true},
      {key:'superficie',label:"Superficie en m²",type:'text',required:true},
      {key:'frequence',label:"Fréquence du nettoyage",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'montant_mensuel',label:"Montant mensuel FCFA",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE NETTOYAGE DE BUREAUX</h1>
<p>Entre la société de nettoyage (Prestataire) et <strong>{{nom_client}}</strong> (Client).</p>
<h2>Article 1 – Objet</h2>
<p>Nettoyage des bureaux situés à {{adresse_bureaux}}, surface totale : {{superficie}} m².</p>
<h2>Article 2 – Fréquence et horaires</h2>
<p>Interventions : {{frequence}}, selon les horaires convenus avec le Client.</p>
<h2>Article 3 – Prestations incluses</h2>
<p>Dépoussiérage, aspiration, lavage des sols, nettoyage sanitaires, vidage des poubelles, entretien des surfaces vitrées intérieures.</p>
<h2>Article 4 – Rémunération</h2>
<p>Forfait mensuel : {{montant_mensuel}} FCFA. Contrat effectif le {{date_debut}}.</p>
<p class="signature">Fait à Abidjan, le {{date_debut}}</p>
<div class="signatures"><span>Le Prestataire</span><span>Le Client</span></div></div>`,
  },
  {
    code: 'fm_nettoyage_industriel',
    name: "Contrat de nettoyage industriel",
    category: 'commercial_financier',
    price: 7000, priceMax: 21000,
    description: "Contrat de nettoyage pour usines, entrepôts et sites de production industrielle.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'nom_client',label:"Nom de l'industriel",type:'text',required:true},
      {key:'adresse_usine',label:"Adresse de l'usine",type:'text',required:true},
      {key:'type_activite',label:"Type d'activité industrielle",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'montant_mensuel',label:"Montant mensuel FCFA",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE NETTOYAGE INDUSTRIEL</h1>
<p>Entre le Prestataire industriel et <strong>{{nom_client}}</strong>, exploitant de {{type_activite}}.</p>
<h2>Article 1 – Objet</h2>
<p>Nettoyage de l'unité industrielle sise à {{adresse_usine}}, incluant ateliers, zones de stockage et espaces communs.</p>
<h2>Article 2 – Produits et matériel</h2>
<p>Le Prestataire utilise des produits homologués adaptés aux contraintes industrielles. Le matériel lourd est fourni par le Prestataire.</p>
<h2>Article 3 – Tarification</h2>
<p>Montant mensuel : {{montant_mensuel}} FCFA. Contrat effectif le {{date_debut}}.</p>
<p class="signature">Fait à Abidjan, le {{date_debut}}</p>
<div class="signatures"><span>Le Prestataire</span><span>Le Client</span></div></div>`,
  },
  {
    code: 'fm_haute_pression',
    name: "Accord de service de nettoyage haute pression",
    category: 'commercial_financier',
    price: 3000, priceMax: 9000,
    description: "Accord de nettoyage à haute pression pour façades, parkings, cours et voiries.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 60,
    fieldsJson: F([
      {key:'nom_client',label:"Nom du client",type:'text',required:true},
      {key:'zones_a_nettoyer',label:"Zones à nettoyer",type:'text',required:true},
      {key:'date_intervention',label:"Date d'intervention",type:'date',required:true},
      {key:'montant_prestation',label:"Montant de la prestation FCFA",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE NETTOYAGE HAUTE PRESSION</h1>
<p>Entre le Prestataire et <strong>{{nom_client}}</strong>.</p>
<h2>Article 1 – Zones concernées</h2>
<p>{{zones_a_nettoyer}}.</p>
<h2>Article 2 – Intervention</h2>
<p>Date prévue : {{date_intervention}}. Utilisation de nettoyeurs à haute pression (min. 150 bars), eau propre fournie par le Client.</p>
<h2>Article 3 – Prix</h2>
<p>Forfait : {{montant_prestation}} FCFA TTC.</p>
<p class="signature">Fait à Abidjan, le {{date_intervention}}</p>
<div class="signatures"><span>Le Prestataire</span><span>Le Client</span></div></div>`,
  },
  {
    code: 'fm_desinfection_desinsectisation',
    name: "Contrat de service de désinfection et désinsectisation",
    category: 'commercial_financier',
    price: 4000, priceMax: 12000,
    description: "Contrat de désinfection et de lutte contre les insectes nuisibles pour locaux professionnels.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 68,
    fieldsJson: F([
      {key:'nom_client',label:"Nom du client",type:'text',required:true},
      {key:'adresse_locaux',label:"Adresse des locaux",type:'text',required:true},
      {key:'type_traitement',label:"Type de traitement (désinfection, anti-cafards, anti-moustiques…)",type:'text',required:true},
      {key:'periodicite',label:"Périodicité des interventions",type:'text',required:true},
      {key:'tarif_annuel',label:"Tarif annuel FCFA",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE DÉSINFECTION ET DÉSINSECTISATION</h1>
<p>Entre le Prestataire spécialisé et <strong>{{nom_client}}</strong>.</p>
<h2>Article 1 – Objet</h2>
<p>Traitement des locaux de {{adresse_locaux}} : {{type_traitement}}.</p>
<h2>Article 2 – Fréquence</h2>
<p>Interventions {{periodicite}}, avec rapport écrit après chaque passage.</p>
<h2>Article 3 – Produits</h2>
<p>Utilisation exclusive de produits homologués par le Ministère de la Santé, sans danger pour les occupants après aération.</p>
<h2>Article 4 – Tarif</h2>
<p>Contrat annuel : {{tarif_annuel}} FCFA.</p>
<p class="signature">Fait à Abidjan</p>
<div class="signatures"><span>Le Prestataire</span><span>Le Client</span></div></div>`,
  },
  {
    code: 'fm_deratisation',
    name: "Accord de service de dératisation",
    category: 'commercial_financier',
    price: 3000, priceMax: 9000,
    description: "Accord de lutte contre les rongeurs pour entrepôts, restaurants et sites agroalimentaires.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 62,
    fieldsJson: F([
      {key:'nom_client',label:"Nom du client",type:'text',required:true},
      {key:'adresse_site',label:"Adresse du site",type:'text',required:true},
      {key:'frequence',label:"Fréquence des passages",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'tarif_mensuel',label:"Tarif mensuel FCFA",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE DÉRATISATION</h1>
<p>Entre le Prestataire et <strong>{{nom_client}}</strong>, site de {{adresse_site}}.</p>
<h2>Article 1 – Prestation</h2>
<p>Pose et relevé de pièges, application de rodenticides homologués, bouchage des voies de pénétration.</p>
<h2>Article 2 – Fréquence</h2>
<p>Interventions {{frequence}}. Début : {{date_debut}}.</p>
<h2>Article 3 – Tarif</h2>
<p>{{tarif_mensuel}} FCFA/mois.</p>
<p class="signature">Fait à Abidjan, le {{date_debut}}</p>
<div class="signatures"><span>Le Prestataire</span><span>Le Client</span></div></div>`,
  },
  {
    code: 'fm_vitres_hauteur',
    name: "Contrat de service de nettoyage de vitres en hauteur",
    category: 'commercial_financier',
    price: 5000, priceMax: 15000,
    description: "Contrat de nettoyage de façades vitrées et vitres en hauteur pour immeubles et tours.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'nom_client',label:"Nom du client",type:'text',required:true},
      {key:'adresse_immeuble',label:"Adresse de l'immeuble",type:'text',required:true},
      {key:'nombre_niveaux',label:"Nombre de niveaux",type:'text',required:true},
      {key:'frequence',label:"Fréquence (mensuelle, trimestrielle…)",type:'text',required:true},
      {key:'tarif_intervention',label:"Tarif par intervention FCFA",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE NETTOYAGE DE VITRES EN HAUTEUR</h1>
<p>Entre le Prestataire spécialisé et <strong>{{nom_client}}</strong>.</p>
<h2>Article 1 – Objet</h2>
<p>Nettoyage des façades vitrées de l'immeuble de {{nombre_niveaux}} niveaux situé à {{adresse_immeuble}}.</p>
<h2>Article 2 – Sécurité des interventions</h2>
<p>Utilisation de nacelles ou de cordes conformément à la réglementation sur les travaux en hauteur. Personnel formé et harnais homologués.</p>
<h2>Article 3 – Tarif</h2>
<p>{{tarif_intervention}} FCFA par intervention, fréquence {{frequence}}.</p>
<p class="signature">Fait à Abidjan</p>
<div class="signatures"><span>Le Prestataire</span><span>Le Client</span></div></div>`,
  },
  {
    code: 'fm_chantier_post_travaux',
    name: "Accord de service de nettoyage de chantier post-travaux",
    category: 'commercial_financier',
    price: 4000, priceMax: 12000,
    description: "Accord de nettoyage de fin de chantier après travaux de construction ou rénovation.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 65,
    fieldsJson: F([
      {key:'nom_client',label:"Maître d'ouvrage ou entreprise",type:'text',required:true},
      {key:'adresse_chantier',label:"Adresse du chantier",type:'text',required:true},
      {key:'nature_travaux',label:"Nature des travaux effectués",type:'text',required:true},
      {key:'date_intervention',label:"Date d'intervention nettoyage",type:'date',required:true},
      {key:'montant_forfait',label:"Montant forfaitaire FCFA",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE NETTOYAGE POST-CHANTIER</h1>
<p>Entre le Prestataire et <strong>{{nom_client}}</strong>.</p>
<h2>Article 1 – Objet</h2>
<p>Nettoyage du chantier de {{nature_travaux}} situé à {{adresse_chantier}} après achèvement des travaux.</p>
<h2>Article 2 – Prestations</h2>
<p>Évacuation des gravats résiduels, dépoussiérage, lavage des sols et surfaces, nettoyage des menuiseries et vitrages, élimination des adhésifs de protection.</p>
<h2>Article 3 – Prix</h2>
<p>Forfait : {{montant_forfait}} FCFA TTC. Intervention le {{date_intervention}}.</p>
<p class="signature">Fait à Abidjan, le {{date_intervention}}</p>
<div class="signatures"><span>Le Prestataire</span><span>Le Client</span></div></div>`,
  },
  {
    code: 'fm_blanchisserie_hotel',
    name: "Contrat de service de blanchisserie industrielle (hôtel)",
    category: 'commercial_financier',
    price: 6000, priceMax: 18000,
    description: "Contrat de blanchisserie industrielle pour hôtels, hôpitaux et résidences.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'nom_etablissement',label:"Nom de l'établissement",type:'text',required:true},
      {key:'volume_mensuel',label:"Volume mensuel de linge (kg ou pièces)",type:'text',required:true},
      {key:'types_linge',label:"Types de linge (draps, serviettes, uniformes…)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'tarif_mensuel',label:"Tarif mensuel FCFA",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE BLANCHISSERIE INDUSTRIELLE</h1>
<p>Entre la Blanchisserie (Prestataire) et <strong>{{nom_etablissement}}</strong>.</p>
<h2>Article 1 – Objet</h2>
<p>Collecte, lavage, séchage, repassage et livraison de {{types_linge}}, volume estimé : {{volume_mensuel}}/mois.</p>
<h2>Article 2 – Délais</h2>
<p>Délai standard de traitement : 24 à 48h après collecte.</p>
<h2>Article 3 – Tarif</h2>
<p>Forfait mensuel : {{tarif_mensuel}} FCFA. Contrat effectif le {{date_debut}}.</p>
<p class="signature">Fait à Abidjan, le {{date_debut}}</p>
<div class="signatures"><span>Le Prestataire</span><span>Le Client</span></div></div>`,
  },
  {
    code: 'fm_gestion_dechets_bureau',
    name: "Accord de service de gestion des déchets bureau",
    category: 'commercial_financier',
    price: 3000, priceMax: 9000,
    description: "Accord de collecte et tri sélectif des déchets pour entreprises et administrations.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 62,
    fieldsJson: F([
      {key:'nom_client',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'adresse_site',label:"Adresse du site",type:'text',required:true},
      {key:'types_dechets',label:"Types de déchets collectés",type:'text',required:true},
      {key:'frequence_collecte',label:"Fréquence de collecte",type:'text',required:true},
      {key:'tarif_mensuel',label:"Tarif mensuel FCFA",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE GESTION DES DÉCHETS DE BUREAU</h1>
<p>Entre le Prestataire et <strong>{{nom_client}}</strong>, site de {{adresse_site}}.</p>
<h2>Article 1 – Périmètre</h2>
<p>Collecte et traitement des déchets suivants : {{types_dechets}}.</p>
<h2>Article 2 – Fréquence</h2>
<p>Collecte {{frequence_collecte}}, avec fourniture de contenants adaptés.</p>
<h2>Article 3 – Conformité</h2>
<p>Le Prestataire s'engage à traiter les déchets conformément à la réglementation environnementale en vigueur en Côte d'Ivoire.</p>
<h2>Article 4 – Tarif</h2>
<p>{{tarif_mensuel}} FCFA/mois.</p>
<p class="signature">Fait à Abidjan</p>
<div class="signatures"><span>Le Prestataire</span><span>Le Client</span></div></div>`,
  },
  {
    code: 'fm_collecte_ordures_prive',
    name: "Contrat de service de collecte des ordures (privé)",
    category: 'commercial_financier',
    price: 3000, priceMax: 9000,
    description: "Contrat de collecte privée des ordures ménagères pour résidences et copropriétés.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 65,
    fieldsJson: F([
      {key:'nom_client',label:"Nom du client ou syndicat de copropriété",type:'text',required:true},
      {key:'adresse_site',label:"Adresse du site",type:'text',required:true},
      {key:'frequence_collecte',label:"Fréquence de collecte par semaine",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'tarif_mensuel',label:"Tarif mensuel FCFA",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE COLLECTE PRIVÉE DES ORDURES</h1>
<p>Entre le Prestataire et <strong>{{nom_client}}</strong>.</p>
<h2>Article 1 – Service</h2>
<p>Collecte des ordures sur le site de {{adresse_site}}, {{frequence_collecte}} fois par semaine.</p>
<h2>Article 2 – Obligations du Client</h2>
<p>Mise à disposition des bacs conformes, sortie des bacs aux horaires convenus.</p>
<h2>Article 3 – Tarif</h2>
<p>Forfait mensuel : {{tarif_mensuel}} FCFA. Contrat effectif le {{date_debut}}.</p>
<p class="signature">Fait à Abidjan, le {{date_debut}}</p>
<div class="signatures"><span>Le Prestataire</span><span>Le Client</span></div></div>`,
  },
  {
    code: 'fm_espaces_verts',
    name: "Accord de gestion des espaces verts (jardinage)",
    category: 'commercial_financier',
    price: 3000, priceMax: 9000,
    description: "Accord d'entretien des espaces verts, jardins et pelouses pour entreprises et résidences.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 70,
    fieldsJson: F([
      {key:'nom_client',label:"Nom du client",type:'text',required:true},
      {key:'adresse_site',label:"Adresse du site",type:'text',required:true},
      {key:'superficie_verte',label:"Superficie verte en m²",type:'text',required:true},
      {key:'frequence',label:"Fréquence d'entretien",type:'text',required:true},
      {key:'tarif_mensuel',label:"Tarif mensuel FCFA",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD D'ENTRETIEN DES ESPACES VERTS</h1>
<p>Entre le Prestataire paysagiste et <strong>{{nom_client}}</strong>.</p>
<h2>Article 1 – Périmètre</h2>
<p>Entretien des espaces verts de {{adresse_site}}, superficie : {{superficie_verte}} m².</p>
<h2>Article 2 – Prestations</h2>
<p>Tonte des pelouses, taille des haies et arbustes, désherbage, arrosage, ramassage des feuilles mortes.</p>
<h2>Article 3 – Fréquence et tarif</h2>
<p>Interventions {{frequence}} — Forfait mensuel : {{tarif_mensuel}} FCFA.</p>
<p class="signature">Fait à Abidjan</p>
<div class="signatures"><span>Le Prestataire</span><span>Le Client</span></div></div>`,
  },
  {
    code: 'fm_deneigement',
    name: "Contrat de service de déneigement",
    category: 'commercial_financier',
    price: 4000, priceMax: 12000,
    description: "Contrat de déneigement et d'épandage de sel pour sites exposés aux intempéries.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 30,
    fieldsJson: F([
      {key:'nom_client',label:"Nom du client",type:'text',required:true},
      {key:'adresse_site',label:"Adresse du site",type:'text',required:true},
      {key:'zones_traitees',label:"Zones à déneiger",type:'text',required:true},
      {key:'saison',label:"Saison concernée",type:'text',required:true},
      {key:'tarif_intervention',label:"Tarif par intervention FCFA",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE DÉNEIGEMENT</h1>
<p>Entre le Prestataire et <strong>{{nom_client}}</strong>.</p>
<h2>Article 1 – Zones concernées</h2>
<p>Site : {{adresse_site}} — Zones : {{zones_traitees}}.</p>
<h2>Article 2 – Déclenchement</h2>
<p>Intervention déclenchée automatiquement dès cumul de neige supérieur à 3 cm ou sur appel du Client. Saison : {{saison}}.</p>
<h2>Article 3 – Tarif</h2>
<p>{{tarif_intervention}} FCFA par intervention (déneigement + épandage de sel).</p>
<p class="signature">Fait à Abidjan</p>
<div class="signatures"><span>Le Prestataire</span><span>Le Client</span></div></div>`,
  },
  {
    code: 'fm_global_total',
    name: "Contrat de facilities management global (FM total)",
    category: 'commercial_financier',
    price: 15000, priceMax: 45000,
    description: "Contrat de gestion globale des services généraux (FM total) pour grand compte ou immeuble.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      {key:'nom_client',label:"Nom du client (grand compte)",type:'text',required:true},
      {key:'site_principal',label:"Site principal géré",type:'text',required:true},
      {key:'services_inclus',label:"Services inclus dans le périmètre FM",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'budget_mensuel',label:"Budget mensuel FCFA",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE FACILITIES MANAGEMENT GLOBAL</h1>
<p>Entre le FM Provider et <strong>{{nom_client}}</strong>.</p>
<h2>Article 1 – Périmètre</h2>
<p>Gestion globale du site de {{site_principal}}.</p>
<h2>Article 2 – Services inclus</h2>
<p>{{services_inclus}}</p>
<h2>Article 3 – Gouvernance</h2>
<p>Tableau de bord mensuel, réunion de pilotage trimestrielle, rapport annuel de performance.</p>
<h2>Article 4 – Budget</h2>
<p>Budget mensuel : {{budget_mensuel}} FCFA. Contrat effectif le {{date_debut}}.</p>
<p class="signature">Fait à Abidjan, le {{date_debut}}</p>
<div class="signatures"><span>Le FM Provider</span><span>Le Client</span></div></div>`,
  },
  {
    code: 'fm_maintenance_multitechnique',
    name: "Accord de service de maintenance multi-technique (MMT)",
    category: 'commercial_financier',
    price: 8000, priceMax: 24000,
    description: "Accord de maintenance multi-technique couvrant génie civil, électricité, plomberie et CVC.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'nom_client',label:"Nom du client",type:'text',required:true},
      {key:'adresse_site',label:"Adresse du site",type:'text',required:true},
      {key:'lots_techniques',label:"Lots techniques couverts",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'tarif_mensuel',label:"Tarif mensuel FCFA",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE MAINTENANCE MULTI-TECHNIQUE (MMT)</h1>
<p>Entre le Mainteneur multi-technique et <strong>{{nom_client}}</strong>.</p>
<h2>Article 1 – Site</h2>
<p>{{adresse_site}}.</p>
<h2>Article 2 – Lots techniques</h2>
<p>{{lots_techniques}}</p>
<h2>Article 3 – Niveaux de service</h2>
<p>Maintenance préventive planifiée + maintenance corrective avec délai d'intervention sous 4h (urgences) ou 48h (non urgences).</p>
<h2>Article 4 – Tarif</h2>
<p>{{tarif_mensuel}} FCFA/mois. Contrat effectif le {{date_debut}}.</p>
<p class="signature">Fait à Abidjan, le {{date_debut}}</p>
<div class="signatures"><span>Le Mainteneur</span><span>Le Client</span></div></div>`,
  },
  {
    code: 'fm_plomberie_entretien',
    name: "Contrat de service de plomberie entretien",
    category: 'commercial_financier',
    price: 4000, priceMax: 12000,
    description: "Contrat d'entretien préventif et curatif des installations de plomberie.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 68,
    fieldsJson: F([
      {key:'nom_client',label:"Nom du client",type:'text',required:true},
      {key:'adresse_site',label:"Adresse du site",type:'text',required:true},
      {key:'description_installations',label:"Description des installations",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'tarif_mensuel',label:"Tarif mensuel FCFA",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT D'ENTRETIEN PLOMBERIE</h1>
<p>Entre le Plombier agréé et <strong>{{nom_client}}</strong>.</p>
<h2>Article 1 – Installations</h2>
<p>Site : {{adresse_site}} — Installations : {{description_installations}}.</p>
<h2>Article 2 – Prestations</h2>
<p>Visites préventives, détartrage, vérification des robinetteries et joints, débouchage, intervention curative sous 24h.</p>
<h2>Article 3 – Tarif</h2>
<p>{{tarif_mensuel}} FCFA/mois hors pièces de rechange. Contrat effectif le {{date_debut}}.</p>
<p class="signature">Fait à Abidjan, le {{date_debut}}</p>
<div class="signatures"><span>Le Prestataire</span><span>Le Client</span></div></div>`,
  },
  {
    code: 'fm_electricite_batiment',
    name: "Accord de service d'électricité entretien bâtiment",
    category: 'commercial_financier',
    price: 5000, priceMax: 15000,
    description: "Accord de maintenance électrique des installations bâtiment : tableaux, éclairage, prises.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 72,
    fieldsJson: F([
      {key:'nom_client',label:"Nom du client",type:'text',required:true},
      {key:'adresse_batiment',label:"Adresse du bâtiment",type:'text',required:true},
      {key:'puissance_installee',label:"Puissance installée (kVA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'tarif_mensuel',label:"Tarif mensuel FCFA",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE MAINTENANCE ÉLECTRIQUE BÂTIMENT</h1>
<p>Entre l'Électricien agréé et <strong>{{nom_client}}</strong>.</p>
<h2>Article 1 – Installation</h2>
<p>Bâtiment situé à {{adresse_batiment}} — Puissance installée : {{puissance_installee}} kVA.</p>
<h2>Article 2 – Prestations</h2>
<p>Vérification des tableaux électriques, remplacement des fusibles et disjoncteurs défectueux, entretien de l'éclairage, intervention d'urgence sous 4h.</p>
<h2>Article 3 – Tarif</h2>
<p>{{tarif_mensuel}} FCFA/mois. Effectif le {{date_debut}}.</p>
<p class="signature">Fait à Abidjan, le {{date_debut}}</p>
<div class="signatures"><span>Le Prestataire</span><span>Le Client</span></div></div>`,
  },
  {
    code: 'fm_climatisation',
    name: "Contrat de service de climatisation et froid",
    category: 'commercial_financier',
    price: 5000, priceMax: 15000,
    description: "Contrat de maintenance préventive et curative des systèmes de climatisation et réfrigération.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 75,
    fieldsJson: F([
      {key:'nom_client',label:"Nom du client",type:'text',required:true},
      {key:'adresse_site',label:"Adresse du site",type:'text',required:true},
      {key:'nombre_unites',label:"Nombre d'unités de climatisation",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'tarif_mensuel',label:"Tarif mensuel FCFA",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE MAINTENANCE CLIMATISATION ET FROID</h1>
<p>Entre le Frigoriste agréé et <strong>{{nom_client}}</strong>.</p>
<h2>Article 1 – Équipements</h2>
<p>{{nombre_unites}} unité(s) de climatisation sur le site de {{adresse_site}}.</p>
<h2>Article 2 – Prestations</h2>
<p>Nettoyage des filtres, vérification du niveau de fluide frigorigène, contrôle des compresseurs et sondes, deux visites préventives par an minimum.</p>
<h2>Article 3 – Tarif</h2>
<p>{{tarif_mensuel}} FCFA/mois. Contrat effectif le {{date_debut}}.</p>
<p class="signature">Fait à Abidjan, le {{date_debut}}</p>
<div class="signatures"><span>Le Prestataire</span><span>Le Client</span></div></div>`,
  },
  {
    code: 'fm_ascenseurs',
    name: "Accord de service d'ascenseurs et monte-charges",
    category: 'commercial_financier',
    price: 6000, priceMax: 18000,
    description: "Accord de maintenance réglementaire des ascenseurs et monte-charges pour immeubles.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'nom_client',label:"Nom du propriétaire ou gestionnaire",type:'text',required:true},
      {key:'adresse_immeuble',label:"Adresse de l'immeuble",type:'text',required:true},
      {key:'nombre_appareils',label:"Nombre d'appareils",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'tarif_mensuel',label:"Tarif mensuel FCFA",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE MAINTENANCE ASCENSEURS ET MONTE-CHARGES</h1>
<p>Entre le Mainteneur agréé et <strong>{{nom_client}}</strong>.</p>
<h2>Article 1 – Appareils concernés</h2>
<p>{{nombre_appareils}} appareil(s) installé(s) à {{adresse_immeuble}}.</p>
<h2>Article 2 – Prestations réglementaires</h2>
<p>Visites mensuelles de contrôle, interventions de déblocage 24h/24, essais de sécurité annuels, tenue du carnet d'entretien.</p>
<h2>Article 3 – Tarif</h2>
<p>{{tarif_mensuel}} FCFA/mois. Accord effectif le {{date_debut}}.</p>
<p class="signature">Fait à Abidjan, le {{date_debut}}</p>
<div class="signatures"><span>Le Mainteneur</span><span>Le Client</span></div></div>`,
  },
  {
    code: 'fm_restauration_collective',
    name: "Contrat de service de restauration collective (cantine)",
    category: 'commercial_financier',
    price: 10000, priceMax: 30000,
    description: "Contrat de gestion de cantine d'entreprise et de restauration collective.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'nom_client',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'adresse_cantine',label:"Adresse de la cantine",type:'text',required:true},
      {key:'nombre_repas_jour',label:"Nombre de repas servis par jour",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'prix_repas',label:"Prix par repas FCFA",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE RESTAURATION COLLECTIVE</h1>
<p>Entre le Restaurateur (Prestataire) et <strong>{{nom_client}}</strong>.</p>
<h2>Article 1 – Objet</h2>
<p>Gestion de la cantine de {{adresse_cantine}} : {{nombre_repas_jour}} repas/jour.</p>
<h2>Article 2 – Qualité</h2>
<p>Respect des normes HACCP, équilibre nutritionnel des menus, variété hebdomadaire, traçabilité des denrées.</p>
<h2>Article 3 – Tarif</h2>
<p>Prix par repas : {{prix_repas}} FCFA. Contrat effectif le {{date_debut}}.</p>
<p class="signature">Fait à Abidjan, le {{date_debut}}</p>
<div class="signatures"><span>Le Prestataire</span><span>Le Client</span></div></div>`,
  },
  {
    code: 'fm_vending_distributeurs',
    name: "Accord de service de vending et distributeurs",
    category: 'commercial_financier',
    price: 3000, priceMax: 9000,
    description: "Accord d'installation et d'exploitation de distributeurs automatiques en entreprise.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 55,
    fieldsJson: F([
      {key:'nom_client',label:"Nom de l'entreprise hôte",type:'text',required:true},
      {key:'adresse_site',label:"Adresse du site",type:'text',required:true},
      {key:'nombre_distributeurs',label:"Nombre de distributeurs",type:'text',required:true},
      {key:'date_installation',label:"Date d'installation",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE VENDING ET DISTRIBUTEURS AUTOMATIQUES</h1>
<p>Entre l'Exploitant de vending et <strong>{{nom_client}}</strong>.</p>
<h2>Article 1 – Installation</h2>
<p>Mise en place de {{nombre_distributeurs}} distributeur(s) automatique(s) sur le site de {{adresse_site}}, le {{date_installation}}.</p>
<h2>Article 2 – Obligations de l'Exploitant</h2>
<p>Approvisionnement régulier, maintenance des appareils, hygiène, relevé et versement des commissions convenues.</p>
<h2>Article 3 – Obligations du Client</h2>
<p>Mise à disposition d'un espace approprié avec alimentation électrique. Accès facilité pour les interventions.</p>
<p class="signature">Fait à Abidjan, le {{date_installation}}</p>
<div class="signatures"><span>L'Exploitant</span><span>Le Client Hôte</span></div></div>`,
  },
  {
    code: 'fm_reprographie_impression',
    name: "Contrat de service de reprographie et impression",
    category: 'commercial_financier',
    price: 4000, priceMax: 12000,
    description: "Contrat de gestion des services d'impression, copie et reprographie en entreprise.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 60,
    fieldsJson: F([
      {key:'nom_client',label:"Nom du client",type:'text',required:true},
      {key:'volume_mensuel',label:"Volume mensuel de copies/impressions",type:'text',required:true},
      {key:'types_services',label:"Types de services (NB, couleur, grand format…)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'tarif_mensuel',label:"Forfait mensuel FCFA",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE REPROGRAPHIE ET IMPRESSION</h1>
<p>Entre le Prestataire et <strong>{{nom_client}}</strong>.</p>
<h2>Article 1 – Services</h2>
<p>{{types_services}} — Volume mensuel estimé : {{volume_mensuel}} impressions/copies.</p>
<h2>Article 2 – Niveaux de service</h2>
<p>Délai de traitement standard : 4h. Délai urgent : 1h avec majoration de 30 %.</p>
<h2>Article 3 – Tarif</h2>
<p>Forfait mensuel : {{tarif_mensuel}} FCFA. Contrat effectif le {{date_debut}}.</p>
<p class="signature">Fait à Abidjan, le {{date_debut}}</p>
<div class="signatures"><span>Le Prestataire</span><span>Le Client</span></div></div>`,
  },
  {
    code: 'fm_courrier_navette',
    name: "Accord de service de courrier et navette",
    category: 'commercial_financier',
    price: 3000, priceMax: 9000,
    description: "Accord de gestion du courrier entrant/sortant et de navette inter-sites pour entreprises.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 58,
    fieldsJson: F([
      {key:'nom_client',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'sites_desservis',label:"Sites desservis",type:'text',required:true},
      {key:'frequence_navette',label:"Fréquence des navettes",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'tarif_mensuel',label:"Tarif mensuel FCFA",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE COURRIER ET NAVETTE INTER-SITES</h1>
<p>Entre le Prestataire et <strong>{{nom_client}}</strong>.</p>
<h2>Article 1 – Périmètre</h2>
<p>Sites desservis : {{sites_desservis}}. Fréquence des navettes : {{frequence_navette}}.</p>
<h2>Article 2 – Prestations</h2>
<p>Collecte du courrier sortant, remise du courrier entrant trié, transport de plis et colis inter-sites, traçabilité des envois.</p>
<h2>Article 3 – Tarif</h2>
<p>{{tarif_mensuel}} FCFA/mois. Accord effectif le {{date_debut}}.</p>
<p class="signature">Fait à Abidjan, le {{date_debut}}</p>
<div class="signatures"><span>Le Prestataire</span><span>Le Client</span></div></div>`,
  },
  {
    code: 'fm_rapport_performance',
    name: "Rapport de performance facilities management",
    category: 'commercial_financier',
    price: 4000, priceMax: 12000,
    description: "Rapport périodique de performance des services de facilities management avec KPI.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 50,
    fieldsJson: F([
      {key:'nom_client',label:"Nom du client",type:'text',required:true},
      {key:'periode_rapport',label:"Période couverte",type:'text',required:true},
      {key:'kpi_nettoyage',label:"KPI nettoyage (%)",type:'text',required:true},
      {key:'kpi_maintenance',label:"KPI maintenance (%)",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE FM</h1>
<p>Client : <strong>{{nom_client}}</strong> — Période : {{periode_rapport}} — Édité le {{date_rapport}}.</p>
<h2>1. Indicateurs clés</h2>
<table>
<tr><th>Service</th><th>Taux de réalisation</th></tr>
<tr><td>Nettoyage</td><td>{{kpi_nettoyage}} %</td></tr>
<tr><td>Maintenance</td><td>{{kpi_maintenance}} %</td></tr>
</table>
<h2>2. Incidents et actions correctives</h2>
<p>Détail des incidents, délais de traitement et actions correctives mises en oeuvre durant la période.</p>
<h2>3. Perspectives</h2>
<p>Plan d'amélioration continue et objectifs pour la prochaine période.</p>
<p class="signature">Rapport établi le {{date_rapport}}</p></div>`,
  },
  {
    code: 'fm_plan_developpement',
    name: "Plan de développement FM",
    category: 'commercial_financier',
    price: 8000, priceMax: 24000,
    description: "Document stratégique de développement des services de facilities management.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 45,
    fieldsJson: F([
      {key:'nom_entreprise_fm',label:"Nom de la société FM",type:'text',required:true},
      {key:'axes_developpement',label:"Axes stratégiques de développement",type:'textarea',required:true},
      {key:'budget_prevu',label:"Budget prévisionnel FCFA",type:'text',required:true},
      {key:'horizon_plan',label:"Horizon du plan (années)",type:'text',required:true},
      {key:'date_elaboration',label:"Date d'élaboration",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT FACILITIES MANAGEMENT</h1>
<h2>{{nom_entreprise_fm}}</h2>
<p>Document élaboré le {{date_elaboration}} — Horizon : {{horizon_plan}} ans.</p>
<h2>1. Axes stratégiques</h2>
<p>{{axes_developpement}}</p>
<h2>2. Budget prévisionnel</h2>
<p>Enveloppe globale : {{budget_prevu}} FCFA.</p>
<h2>3. Plan d'action</h2>
<p>Actions prioritaires, responsables, jalons et indicateurs de suivi définis en annexe.</p>
<p class="signature">Approuvé le {{date_elaboration}}</p></div>`,
  },
  {
    code: 'fm_charte_qualite',
    name: "Charte de qualité de service FM",
    category: 'commercial_financier',
    price: 3000, priceMax: 9000,
    description: "Charte définissant les engagements qualité d'une société de facilities management.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 52,
    fieldsJson: F([
      {key:'nom_societe_fm',label:"Nom de la société FM",type:'text',required:true},
      {key:'directeur',label:"Nom du Directeur",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CHARTE DE QUALITÉ DE SERVICE FM</h1>
<h2>{{nom_societe_fm}}</h2>
<p>Adoptée le {{date_adoption}} sous l'autorité de {{directeur}}.</p>
<h2>Notre engagement client</h2>
<p>Nous nous engageons à fournir des services de facilities management conformes aux meilleures pratiques du secteur, dans le respect des délais et des budgets convenus.</p>
<h2>Nos engagements qualité</h2>
<ul>
<li>Réactivité : prise en charge de toute demande en moins de 2 heures ouvrables.</li>
<li>Transparence : reporting mensuel systématique avec KPI documentés.</li>
<li>Amélioration continue : revue qualité semestrielle avec le client.</li>
<li>Développement durable : priorité aux produits écologiques certifiés.</li>
</ul>
<p class="signature">{{directeur}} — Directeur Général</p></div>`,
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
  console.log(`Batch 48b OK — créés:${created} maj:${updated} TOTAL:${total}`);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
