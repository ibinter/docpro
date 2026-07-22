import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ── 25 Établissements scolaires privés (ecol_) ──
  {
    code: 'ecol_contrat_scolarite_primaire',
    name: "Contrat de scolarité école primaire privée",
    category: 'academique', price: 2000, priceMax: 6000,
    description: "Contrat liant les parents d'élèves et l'école primaire privée pour l'année scolaire en cours.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 72,
    fieldsJson: F([
      {key:'nom_ecole',label:"Nom de l'école",type:'text',required:true},
      {key:'nom_eleve',label:"Nom complet de l'élève",type:'text',required:true},
      {key:'classe_eleve',label:"Classe de l'élève",type:'text',required:true},
      {key:'nom_parent',label:"Nom du parent / tuteur",type:'text',required:true},
      {key:'montant_scolarite',label:"Montant annuel de scolarité (FCFA)",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SCOLARITÉ — ÉCOLE PRIMAIRE PRIVÉE</h1>
<p>Entre <strong>{{nom_ecole}}</strong> et le parent/tuteur <strong>{{nom_parent}}</strong>,</p>
<p>pour l'inscription de l'élève <strong>{{nom_eleve}}</strong> en classe de <strong>{{classe_eleve}}</strong>.</p>
<h2>Article 1 — Objet</h2>
<p>Le présent contrat définit les conditions d'accueil et de scolarisation de l'élève pour l'année scolaire en cours.</p>
<h2>Article 2 — Frais de scolarité</h2>
<p>Les frais annuels de scolarité s'élèvent à <strong>{{montant_scolarite}} FCFA</strong>, payables selon les modalités convenues.</p>
<h2>Article 3 — Obligations de l'école</h2>
<p>L'école s'engage à fournir un enseignement de qualité conforme aux programmes officiels du Ministère de l'Éducation Nationale.</p>
<h2>Article 4 — Obligations du parent</h2>
<p>Le parent s'engage à régler les frais de scolarité aux échéances convenues et à veiller à la fréquentation régulière de l'élève.</p>
<p>Fait à Abidjan, le <strong>{{date_signature}}</strong></p>
<p>Signature du Directeur _________________ Signature du Parent _________________</p></div>`
  },
  {
    code: 'ecol_contrat_scolarite_college',
    name: "Contrat de scolarité collège privé",
    category: 'academique', price: 2500, priceMax: 7000,
    description: "Contrat d'inscription et de scolarité pour le cycle collège dans un établissement secondaire privé.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 68,
    fieldsJson: F([
      {key:'nom_college',label:"Nom du collège",type:'text',required:true},
      {key:'nom_eleve',label:"Nom complet de l'élève",type:'text',required:true},
      {key:'niveau',label:"Niveau (6e, 5e, 4e, 3e)",type:'text',required:true},
      {key:'nom_parent',label:"Nom du parent / tuteur",type:'text',required:true},
      {key:'frais_annuels',label:"Frais annuels (FCFA)",type:'text',required:true},
      {key:'annee_scolaire',label:"Année scolaire",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SCOLARITÉ — COLLÈGE PRIVÉ</h1>
<p>Établissement : <strong>{{nom_college}}</strong> — Année scolaire : <strong>{{annee_scolaire}}</strong></p>
<p>Élève : <strong>{{nom_eleve}}</strong> — Niveau : <strong>{{niveau}}</strong></p>
<p>Parent / Tuteur légal : <strong>{{nom_parent}}</strong></p>
<h2>Article 1 — Inscription</h2>
<p>L'élève est admis(e) au sein du collège pour l'année scolaire mentionnée ci-dessus.</p>
<h2>Article 2 — Frais de scolarité</h2>
<p>Les frais annuels s'élèvent à <strong>{{frais_annuels}} FCFA</strong>.</p>
<h2>Article 3 — Règlement intérieur</h2>
<p>L'élève et sa famille s'engagent à respecter le règlement intérieur de l'établissement.</p>
<p>Signatures : Directeur _________________ Parent _________________</p></div>`
  },
  {
    code: 'ecol_contrat_scolarite_lycee',
    name: "Contrat de scolarité lycée privé",
    category: 'academique', price: 3000, priceMax: 8000,
    description: "Contrat d'inscription et de scolarité pour le cycle lycée dans un établissement secondaire supérieur privé.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 65,
    fieldsJson: F([
      {key:'nom_lycee',label:"Nom du lycée",type:'text',required:true},
      {key:'nom_eleve',label:"Nom complet de l'élève",type:'text',required:true},
      {key:'classe',label:"Classe (2nde, 1ère, Tle)",type:'text',required:true},
      {key:'serie',label:"Série (A, C, D, G...)",type:'text',required:true},
      {key:'frais_annuels',label:"Frais annuels (FCFA)",type:'text',required:true},
      {key:'date_inscription',label:"Date d'inscription",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SCOLARITÉ — LYCÉE PRIVÉ</h1>
<p>Le lycée <strong>{{nom_lycee}}</strong> accueille l'élève <strong>{{nom_eleve}}</strong></p>
<p>en classe de <strong>{{classe}}</strong>, série <strong>{{serie}}</strong>.</p>
<h2>Article 1 — Engagement pédagogique</h2>
<p>L'établissement s'engage à préparer l'élève au Baccalauréat selon les programmes officiels de Côte d'Ivoire.</p>
<h2>Article 2 — Frais de scolarité</h2>
<p>Montant annuel : <strong>{{frais_annuels}} FCFA</strong>, payable en trois tranches.</p>
<h2>Article 3 — Discipline</h2>
<p>Tout manquement grave au règlement intérieur peut entraîner l'exclusion temporaire ou définitive.</p>
<p>Signé le <strong>{{date_inscription}}</strong></p></div>`
  },
  {
    code: 'ecol_accord_pension_internat',
    name: "Accord de pension complète (internat)",
    category: 'academique', price: 3500, priceMax: 9000,
    description: "Convention d'internat couvrant hébergement, restauration et encadrement scolaire en pension complète.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 55,
    fieldsJson: F([
      {key:'nom_etablissement',label:"Nom de l'établissement",type:'text',required:true},
      {key:'nom_eleve',label:"Nom de l'élève",type:'text',required:true},
      {key:'date_entree',label:"Date d'entrée en internat",type:'date',required:true},
      {key:'frais_pension',label:"Frais de pension mensuelle (FCFA)",type:'text',required:true},
      {key:'nom_responsable',label:"Nom du responsable légal",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PENSION COMPLÈTE — INTERNAT</h1>
<p>Établissement : <strong>{{nom_etablissement}}</strong></p>
<p>Élève interne : <strong>{{nom_eleve}}</strong> — Entrée le : <strong>{{date_entree}}</strong></p>
<p>Responsable légal : <strong>{{nom_responsable}}</strong></p>
<h2>Article 1 — Prestations incluses</h2>
<p>La pension comprend : hébergement en dortoir, trois repas par jour, encadrement des devoirs, et accès aux installations sportives.</p>
<h2>Article 2 — Tarif</h2>
<p>Frais de pension : <strong>{{frais_pension}} FCFA / mois</strong>, payables avant le 5 de chaque mois.</p>
<h2>Article 3 — Sécurité</h2>
<p>L'établissement assure la sécurité et le bien-être de l'élève interne 24h/24.</p>
<p>Signatures des parties :</p>
<p>Directeur _________________ Responsable légal _________________</p></div>`
  },
  {
    code: 'ecol_reglement_interieur',
    name: "Règlement intérieur école privée",
    category: 'academique', price: 1500, priceMax: 4000,
    description: "Document officiel établissant les règles de vie, de discipline et de fonctionnement d'une école privée.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 80,
    fieldsJson: F([
      {key:'nom_ecole',label:"Nom de l'école",type:'text',required:true},
      {key:'annee_scolaire',label:"Année scolaire",type:'text',required:true},
      {key:'directeur',label:"Nom du directeur",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>RÈGLEMENT INTÉRIEUR</h1>
<h2>{{nom_ecole}}</h2>
<p>Année scolaire : <strong>{{annee_scolaire}}</strong> — Directeur : <strong>{{directeur}}</strong></p>
<h2>Chapitre I — Admission et inscription</h2>
<p>Toute inscription est subordonnée à la production des pièces requises et au paiement de la première tranche des frais de scolarité.</p>
<h2>Chapitre II — Assiduité et ponctualité</h2>
<p>La fréquentation régulière est obligatoire. Toute absence doit être justifiée dans les 48 heures.</p>
<h2>Chapitre III — Discipline</h2>
<p>Le respect mutuel entre élèves et entre élèves et enseignants est exigé en tout temps.</p>
<h2>Chapitre IV — Tenue vestimentaire</h2>
<p>Le port de l'uniforme est obligatoire tous les jours de classe.</p>
<h2>Chapitre V — Sanctions</h2>
<p>Les manquements sont sanctionnés par avertissement, mise à pied ou exclusion selon la gravité.</p>
<p>Adopté le <strong>{{date_adoption}}</strong> — Signature du Directeur _________________</p></div>`
  },
  {
    code: 'ecol_contrat_directeur',
    name: "Contrat de directeur d'école privée",
    category: 'academique', price: 4000, priceMax: 10000,
    description: "Contrat de travail spécifique au poste de directeur d'un établissement scolaire privé en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 50,
    fieldsJson: F([
      {key:'nom_ecole',label:"Nom de l'école",type:'text',required:true},
      {key:'nom_directeur',label:"Nom du directeur",type:'text',required:true},
      {key:'date_prise_poste',label:"Date de prise de poste",type:'date',required:true},
      {key:'salaire_mensuel',label:"Salaire mensuel brut (FCFA)",type:'text',required:true},
      {key:'duree_contrat',label:"Durée du contrat",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE TRAVAIL — DIRECTEUR D'ÉCOLE PRIVÉE</h1>
<p>Entre <strong>{{nom_ecole}}</strong> (employeur) et <strong>{{nom_directeur}}</strong> (directeur),</p>
<p>pour une prise de poste le <strong>{{date_prise_poste}}</strong>.</p>
<h2>Article 1 — Fonctions</h2>
<p>Le directeur assure la gestion pédagogique, administrative et financière de l'établissement.</p>
<h2>Article 2 — Rémunération</h2>
<p>Salaire mensuel brut : <strong>{{salaire_mensuel}} FCFA</strong>.</p>
<h2>Article 3 — Durée</h2>
<p>Contrat d'une durée de <strong>{{duree_contrat}}</strong>, renouvelable par accord exprès des parties.</p>
<h2>Article 4 — Obligations</h2>
<p>Le directeur s'engage à respecter les normes du Ministère de l'Éducation Nationale et à rendre compte à la direction générale.</p>
<p>Signatures : Promoteur _________________ Directeur _________________</p></div>`
  },
  {
    code: 'ecol_contrat_professeur_contractuel',
    name: "Contrat de professeur contractuel",
    category: 'academique', price: 2500, priceMax: 7000,
    description: "Contrat de travail pour enseignant vacataire ou contractuel dans un établissement scolaire privé.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 75,
    fieldsJson: F([
      {key:'nom_ecole',label:"Nom de l'école",type:'text',required:true},
      {key:'nom_professeur',label:"Nom du professeur",type:'text',required:true},
      {key:'matiere',label:"Matière enseignée",type:'text',required:true},
      {key:'heures_hebdo',label:"Nombre d'heures hebdomadaires",type:'text',required:true},
      {key:'remuneration',label:"Rémunération horaire (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE PROFESSEUR CONTRACTUEL</h1>
<p>École : <strong>{{nom_ecole}}</strong> — Professeur : <strong>{{nom_professeur}}</strong></p>
<p>Matière : <strong>{{matiere}}</strong> — Volume horaire : <strong>{{heures_hebdo}} h/semaine</strong></p>
<h2>Article 1 — Mission</h2>
<p>Le professeur s'engage à dispenser les cours selon les programmes officiels et à assurer le suivi pédagogique des élèves.</p>
<h2>Article 2 — Rémunération</h2>
<p>Taux horaire : <strong>{{remuneration}} FCFA</strong>, payable mensuellement sur présentation de feuilles de présence.</p>
<h2>Article 3 — Prise de poste</h2>
<p>Le présent contrat prend effet le <strong>{{date_debut}}</strong>.</p>
<p>Signatures : Directeur _________________ Professeur _________________</p></div>`
  },
  {
    code: 'ecol_accord_surveillance_encadrement',
    name: "Accord de surveillance et encadrement",
    category: 'academique', price: 2000, priceMax: 5000,
    description: "Convention définissant les conditions de surveillance et d'encadrement des élèves hors temps de cours.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 48,
    fieldsJson: F([
      {key:'nom_etablissement',label:"Nom de l'établissement",type:'text',required:true},
      {key:'nom_surveillant',label:"Nom du surveillant",type:'text',required:true},
      {key:'plages_horaires',label:"Plages horaires de surveillance",type:'text',required:true},
      {key:'remuneration_mensuelle',label:"Rémunération mensuelle (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de prise de poste",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SURVEILLANCE ET D'ENCADREMENT</h1>
<p>Établissement : <strong>{{nom_etablissement}}</strong></p>
<p>Surveillant : <strong>{{nom_surveillant}}</strong></p>
<h2>Article 1 — Mission</h2>
<p>Le surveillant assure l'ordre, la sécurité et l'encadrement des élèves pendant les récréations, les permanences et les heures périscolaires.</p>
<h2>Article 2 — Horaires</h2>
<p>Plages de surveillance : <strong>{{plages_horaires}}</strong>.</p>
<h2>Article 3 — Rémunération</h2>
<p>Rémunération mensuelle : <strong>{{remuneration_mensuelle}} FCFA</strong>.</p>
<p>Prise de poste le : <strong>{{date_debut}}</strong></p>
<p>Signatures : Directeur _________________ Surveillant _________________</p></div>`
  },
  {
    code: 'ecol_convention_cantine',
    name: "Convention de cantine scolaire privée",
    category: 'academique', price: 3000, priceMax: 8000,
    description: "Convention de prestation de service de restauration scolaire (cantine) avec un opérateur externe.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 58,
    fieldsJson: F([
      {key:'nom_ecole',label:"Nom de l'école",type:'text',required:true},
      {key:'nom_prestataire',label:"Nom du prestataire de cantine",type:'text',required:true},
      {key:'prix_repas',label:"Prix d'un repas par élève (FCFA)",type:'text',required:true},
      {key:'nb_eleves_estimes',label:"Nombre d'élèves estimés",type:'text',required:true},
      {key:'date_debut',label:"Date de début du service",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CONVENTION DE CANTINE SCOLAIRE</h1>
<p>Entre <strong>{{nom_ecole}}</strong> et le prestataire <strong>{{nom_prestataire}}</strong>.</p>
<h2>Article 1 — Objet</h2>
<p>Le prestataire s'engage à fournir des repas équilibrés aux élèves, aux enseignants et au personnel administratif de l'école.</p>
<h2>Article 2 — Tarification</h2>
<p>Prix par repas : <strong>{{prix_repas}} FCFA</strong> — Effectif estimé : <strong>{{nb_eleves_estimes}} élèves</strong>.</p>
<h2>Article 3 — Hygiène et qualité</h2>
<p>Le prestataire s'engage à respecter les normes d'hygiène alimentaire en vigueur en Côte d'Ivoire.</p>
<h2>Article 4 — Démarrage</h2>
<p>Le service débutera le <strong>{{date_debut}}</strong>.</p>
<p>Signatures : Directeur _________________ Prestataire _________________</p></div>`
  },
  {
    code: 'ecol_accord_transport_scolaire',
    name: "Accord de transport scolaire",
    category: 'academique', price: 2500, priceMax: 7000,
    description: "Convention entre l'école et un transporteur pour la prise en charge des élèves sur un circuit défini.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 60,
    fieldsJson: F([
      {key:'nom_ecole',label:"Nom de l'école",type:'text',required:true},
      {key:'nom_transporteur',label:"Nom du transporteur",type:'text',required:true},
      {key:'circuit',label:"Circuit desservi",type:'text',required:true},
      {key:'tarif_mensuel',label:"Tarif mensuel par élève (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début du service",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE TRANSPORT SCOLAIRE</h1>
<p>École : <strong>{{nom_ecole}}</strong> — Transporteur : <strong>{{nom_transporteur}}</strong></p>
<h2>Article 1 — Objet</h2>
<p>Le transporteur assure le ramassage et le retour quotidien des élèves sur le circuit : <strong>{{circuit}}</strong>.</p>
<h2>Article 2 — Tarif</h2>
<p>Tarif mensuel par élève : <strong>{{tarif_mensuel}} FCFA</strong>.</p>
<h2>Article 3 — Sécurité</h2>
<p>Le transporteur s'engage à utiliser des véhicules en bon état, munis de ceintures de sécurité, et à respecter le code de la route.</p>
<h2>Article 4 — Démarrage</h2>
<p>Le service commence le <strong>{{date_debut}}</strong>.</p>
<p>Signatures : Directeur _________________ Transporteur _________________</p></div>`
  },
  {
    code: 'ecol_contrat_securite',
    name: "Contrat de service de sécurité établissement scolaire",
    category: 'academique', price: 3000, priceMax: 8000,
    description: "Contrat avec une société de gardiennage pour la sécurisation d'un établissement scolaire privé.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 52,
    fieldsJson: F([
      {key:'nom_ecole',label:"Nom de l'école",type:'text',required:true},
      {key:'societe_securite',label:"Société de sécurité",type:'text',required:true},
      {key:'nb_agents',label:"Nombre d'agents",type:'text',required:true},
      {key:'cout_mensuel',label:"Coût mensuel (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE SÉCURITÉ — ÉTABLISSEMENT SCOLAIRE</h1>
<p>Client : <strong>{{nom_ecole}}</strong> — Prestataire : <strong>{{societe_securite}}</strong></p>
<h2>Article 1 — Prestation</h2>
<p>La société de sécurité déploie <strong>{{nb_agents}} agents</strong> qualifiés pour assurer la sécurité du périmètre scolaire.</p>
<h2>Article 2 — Tarif</h2>
<p>Coût mensuel forfaitaire : <strong>{{cout_mensuel}} FCFA</strong>, payable à terme échu.</p>
<h2>Article 3 — Obligations</h2>
<p>Les agents sont tenus de contrôler les entrées/sorties, de surveiller les locaux et de signaler tout incident.</p>
<p>Prise d'effet le <strong>{{date_debut}}</strong></p>
<p>Signatures : Directeur _________________ Responsable sécurité _________________</p></div>`
  },
  {
    code: 'ecol_accord_nettoyage',
    name: "Accord de service de nettoyage école",
    category: 'academique', price: 2000, priceMax: 5000,
    description: "Convention de prestation de nettoyage et d'entretien des locaux scolaires avec un prestataire externe.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 45,
    fieldsJson: F([
      {key:'nom_ecole',label:"Nom de l'école",type:'text',required:true},
      {key:'societe_nettoyage',label:"Société de nettoyage",type:'text',required:true},
      {key:'frequence',label:"Fréquence du service",type:'text',required:true},
      {key:'montant_mensuel',label:"Montant mensuel (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE NETTOYAGE</h1>
<p>École : <strong>{{nom_ecole}}</strong> — Prestataire : <strong>{{societe_nettoyage}}</strong></p>
<h2>Article 1 — Périmètre</h2>
<p>Le service couvre le nettoyage des salles de classe, couloirs, sanitaires, cour et bureaux administratifs.</p>
<h2>Article 2 — Fréquence</h2>
<p>Fréquence : <strong>{{frequence}}</strong> (ex : quotidienne, 3 fois/semaine).</p>
<h2>Article 3 — Tarif</h2>
<p>Montant mensuel : <strong>{{montant_mensuel}} FCFA</strong>.</p>
<p>Date de démarrage : <strong>{{date_debut}}</strong></p>
<p>Signatures : Directeur _________________ Prestataire _________________</p></div>`
  },
  {
    code: 'ecol_contrat_materiel_pedagogique',
    name: "Contrat de fourniture de matériel pédagogique",
    category: 'academique', price: 2500, priceMax: 7000,
    description: "Contrat de fourniture de manuels scolaires, fournitures et équipements pédagogiques à une école privée.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 55,
    fieldsJson: F([
      {key:'nom_ecole',label:"Nom de l'école",type:'text',required:true},
      {key:'nom_fournisseur',label:"Nom du fournisseur",type:'text',required:true},
      {key:'nature_fournitures',label:"Nature des fournitures",type:'text',required:true},
      {key:'montant_total',label:"Montant total (FCFA)",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison prévue",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE FOURNITURE DE MATÉRIEL PÉDAGOGIQUE</h1>
<p>Acheteur : <strong>{{nom_ecole}}</strong> — Fournisseur : <strong>{{nom_fournisseur}}</strong></p>
<h2>Article 1 — Objet</h2>
<p>Le fournisseur s'engage à livrer : <strong>{{nature_fournitures}}</strong>.</p>
<h2>Article 2 — Prix</h2>
<p>Montant total TTC : <strong>{{montant_total}} FCFA</strong>.</p>
<h2>Article 3 — Livraison</h2>
<p>Livraison prévue le <strong>{{date_livraison}}</strong> au siège de l'école.</p>
<h2>Article 4 — Garantie</h2>
<p>Le matériel livré doit être conforme aux spécifications et aux programmes officiels de l'éducation nationale.</p>
<p>Signatures : Directeur _________________ Fournisseur _________________</p></div>`
  },
  {
    code: 'ecol_accord_bibliotheque',
    name: "Accord de partenariat bibliothèque scolaire",
    category: 'academique', price: 2000, priceMax: 5000,
    description: "Convention de partenariat pour la gestion et l'approvisionnement d'une bibliothèque dans un établissement scolaire.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 40,
    fieldsJson: F([
      {key:'nom_ecole',label:"Nom de l'école",type:'text',required:true},
      {key:'partenaire',label:"Partenaire bibliothèque",type:'text',required:true},
      {key:'nb_ouvrages',label:"Nombre d'ouvrages fournis",type:'text',required:true},
      {key:'contribution_annuelle',label:"Contribution annuelle (FCFA)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT — BIBLIOTHÈQUE SCOLAIRE</h1>
<p>École : <strong>{{nom_ecole}}</strong> — Partenaire : <strong>{{partenaire}}</strong></p>
<h2>Article 1 — Objet</h2>
<p>Le partenaire met à disposition <strong>{{nb_ouvrages}} ouvrages</strong> pour enrichir la bibliothèque scolaire.</p>
<h2>Article 2 — Contribution</h2>
<p>L'école verse une contribution annuelle de <strong>{{contribution_annuelle}} FCFA</strong>.</p>
<h2>Article 3 — Gestion</h2>
<p>Un responsable bibliothèque désigné par l'école assure la gestion des prêts et le suivi des collections.</p>
<p>Accord conclu le <strong>{{date_accord}}</strong></p>
<p>Signatures : Directeur _________________ Partenaire _________________</p></div>`
  },
  {
    code: 'ecol_contrat_activites_parascolaires',
    name: "Contrat d'activités parascolaires (sport, art)",
    category: 'academique', price: 2000, priceMax: 6000,
    description: "Contrat d'encadrement des activités parascolaires sportives et artistiques dans un établissement privé.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 62,
    fieldsJson: F([
      {key:'nom_ecole',label:"Nom de l'école",type:'text',required:true},
      {key:'nom_animateur',label:"Nom de l'animateur / coach",type:'text',required:true},
      {key:'type_activite',label:"Type d'activité (sport, musique, art...)",type:'text',required:true},
      {key:'horaires',label:"Horaires des séances",type:'text',required:true},
      {key:'remuneration',label:"Rémunération mensuelle (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT D'ACTIVITÉS PARASCOLAIRES</h1>
<p>École : <strong>{{nom_ecole}}</strong> — Animateur : <strong>{{nom_animateur}}</strong></p>
<p>Activité : <strong>{{type_activite}}</strong> — Horaires : <strong>{{horaires}}</strong></p>
<h2>Article 1 — Mission</h2>
<p>L'animateur assure l'encadrement et l'initiation des élèves à l'activité mentionnée.</p>
<h2>Article 2 — Rémunération</h2>
<p>Rémunération mensuelle : <strong>{{remuneration}} FCFA</strong>.</p>
<h2>Article 3 — Démarrage</h2>
<p>Le présent contrat prend effet le <strong>{{date_debut}}</strong>.</p>
<p>Signatures : Directeur _________________ Animateur _________________</p></div>`
  },
  {
    code: 'ecol_accord_soutien_scolaire',
    name: "Accord de soutien scolaire privé (cours particuliers)",
    category: 'academique', price: 1500, priceMax: 4500,
    description: "Convention entre un enseignant et un parent pour l'organisation de cours particuliers de soutien scolaire.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 70,
    fieldsJson: F([
      {key:'nom_enseignant',label:"Nom de l'enseignant",type:'text',required:true},
      {key:'nom_eleve',label:"Nom de l'élève",type:'text',required:true},
      {key:'matiere',label:"Matière(s) concernée(s)",type:'text',required:true},
      {key:'tarif_horaire',label:"Tarif horaire (FCFA)",type:'text',required:true},
      {key:'nb_heures_semaine',label:"Nombre d'heures par semaine",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SOUTIEN SCOLAIRE PRIVÉ</h1>
<p>Enseignant : <strong>{{nom_enseignant}}</strong> — Élève : <strong>{{nom_eleve}}</strong></p>
<p>Matière(s) : <strong>{{matiere}}</strong></p>
<h2>Article 1 — Objet</h2>
<p>L'enseignant s'engage à dispenser des cours particuliers de soutien scolaire à l'élève.</p>
<h2>Article 2 — Volume et tarif</h2>
<p>Volume hebdomadaire : <strong>{{nb_heures_semaine}} heures</strong> — Tarif horaire : <strong>{{tarif_horaire}} FCFA</strong>.</p>
<h2>Article 3 — Objectifs</h2>
<p>L'objectif est d'améliorer les résultats de l'élève et de combler les lacunes identifiées.</p>
<p>Signatures : Enseignant _________________ Parent _________________</p></div>`
  },
  {
    code: 'ecol_convention_partenariat_internationale',
    name: "Convention de partenariat avec école internationale",
    category: 'academique', price: 5000, priceMax: 12000,
    description: "Convention de coopération éducative entre un établissement local et une école internationale partenaire.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 38,
    fieldsJson: F([
      {key:'ecole_locale',label:"École locale",type:'text',required:true},
      {key:'ecole_internationale',label:"École internationale partenaire",type:'text',required:true},
      {key:'pays_partenaire',label:"Pays de l'école partenaire",type:'text',required:true},
      {key:'domaines_cooperation',label:"Domaines de coopération",type:'textarea',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CONVENTION DE PARTENARIAT ÉDUCATIF INTERNATIONAL</h1>
<p>Entre <strong>{{ecole_locale}}</strong> (Côte d'Ivoire) et <strong>{{ecole_internationale}}</strong> (<strong>{{pays_partenaire}}</strong>).</p>
<h2>Article 1 — Objet</h2>
<p>Les deux établissements s'engagent dans une coopération éducative portant sur les domaines suivants :</p>
<p><strong>{{domaines_cooperation}}</strong></p>
<h2>Article 2 — Échanges pédagogiques</h2>
<p>Les parties peuvent organiser des échanges d'enseignants, des visites d'élèves et des partages de ressources pédagogiques.</p>
<h2>Article 3 — Durée</h2>
<p>Convention valable 3 ans à compter du <strong>{{date_signature}}</strong>, renouvelable par accord mutuel.</p>
<p>Signatures : Directeur local _________________ Directeur international _________________</p></div>`
  },
  {
    code: 'ecol_accord_programme_ib',
    name: "Accord de programme IB (Baccalauréat International)",
    category: 'academique', price: 5000, priceMax: 13000,
    description: "Convention d'adhésion et de mise en oeuvre du programme de Baccalauréat International dans un lycée privé.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 35,
    fieldsJson: F([
      {key:'nom_lycee',label:"Nom du lycée",type:'text',required:true},
      {key:'coordinateur_ib',label:"Coordinateur IB désigné",type:'text',required:true},
      {key:'programmes_retenus',label:"Programmes retenus (PEI, PAI, PD)",type:'text',required:true},
      {key:'frais_adhesion',label:"Frais d'adhésion annuels (USD ou FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début de mise en oeuvre",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PROGRAMME IB — BACCALAURÉAT INTERNATIONAL</h1>
<p>Lycée : <strong>{{nom_lycee}}</strong> — Coordinateur IB : <strong>{{coordinateur_ib}}</strong></p>
<h2>Article 1 — Programmes adoptés</h2>
<p>L'établissement adopte les programmes IB suivants : <strong>{{programmes_retenus}}</strong>.</p>
<h2>Article 2 — Engagements</h2>
<p>L'école s'engage à respecter les standards pédagogiques de l'Organisation du Baccalauréat International, à former ses enseignants et à maintenir l'environnement d'apprentissage requis.</p>
<h2>Article 3 — Frais</h2>
<p>Frais d'adhésion : <strong>{{frais_adhesion}}</strong> par an.</p>
<h2>Article 4 — Mise en oeuvre</h2>
<p>Date de démarrage : <strong>{{date_debut}}</strong>.</p>
<p>Signature du Directeur _________________</p></div>`
  },
  {
    code: 'ecol_contrat_infirmerie',
    name: "Contrat de service d'infirmerie scolaire",
    category: 'academique', price: 3000, priceMax: 8000,
    description: "Contrat de prestation médicale pour la gestion de l'infirmerie d'un établissement scolaire privé.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 50,
    fieldsJson: F([
      {key:'nom_ecole',label:"Nom de l'école",type:'text',required:true},
      {key:'nom_infirmier',label:"Nom de l'infirmier(ière)",type:'text',required:true},
      {key:'numero_ordre',label:"Numéro d'ordre professionnel",type:'text',required:true},
      {key:'horaires',label:"Horaires de présence",type:'text',required:true},
      {key:'remuneration',label:"Rémunération mensuelle (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE D'INFIRMERIE SCOLAIRE</h1>
<p>École : <strong>{{nom_ecole}}</strong> — Infirmier(ière) : <strong>{{nom_infirmier}}</strong></p>
<p>N° d'ordre : <strong>{{numero_ordre}}</strong></p>
<h2>Article 1 — Mission</h2>
<p>L'infirmier(ière) assure les soins de premiers secours, la gestion des trousses de pharmacie et le suivi sanitaire des élèves.</p>
<h2>Article 2 — Présence</h2>
<p>Horaires de service : <strong>{{horaires}}</strong>.</p>
<h2>Article 3 — Rémunération</h2>
<p>Rémunération mensuelle : <strong>{{remuneration}} FCFA</strong>.</p>
<p>Signatures : Directeur _________________ Infirmier(ière) _________________</p></div>`
  },
  {
    code: 'ecol_rapport_performance_annuel',
    name: "Rapport de performance scolaire (bulletin annuel)",
    category: 'academique', price: 1000, priceMax: 3000,
    description: "Bulletin de résultats annuel de l'élève avec appréciation générale et décision du conseil de classe.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 85,
    fieldsJson: F([
      {key:'nom_ecole',label:"Nom de l'école",type:'text',required:true},
      {key:'nom_eleve',label:"Nom de l'élève",type:'text',required:true},
      {key:'classe',label:"Classe",type:'text',required:true},
      {key:'annee_scolaire',label:"Année scolaire",type:'text',required:true},
      {key:'moyenne_annuelle',label:"Moyenne annuelle",type:'text',required:true},
      {key:'decision_conseil',label:"Décision du conseil de classe",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE SCOLAIRE — BULLETIN ANNUEL</h1>
<h2>{{nom_ecole}}</h2>
<p>Élève : <strong>{{nom_eleve}}</strong> — Classe : <strong>{{classe}}</strong> — Année scolaire : <strong>{{annee_scolaire}}</strong></p>
<table border="1" cellpadding="6" style="width:100%;border-collapse:collapse">
  <tr><th>Indicateur</th><th>Résultat</th></tr>
  <tr><td>Moyenne annuelle</td><td><strong>{{moyenne_annuelle}} / 20</strong></td></tr>
  <tr><td>Décision du conseil de classe</td><td><strong>{{decision_conseil}}</strong></td></tr>
</table>
<p>Le Directeur certifie l'authenticité du présent bulletin.</p>
<p>Signature du Directeur _________________ Cachet de l'école</p></div>`
  },
  {
    code: 'ecol_plan_developpement',
    name: "Plan de développement établissement scolaire",
    category: 'academique', price: 4000, priceMax: 10000,
    description: "Document stratégique de planification du développement d'un établissement scolaire privé sur 3 à 5 ans.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 42,
    fieldsJson: F([
      {key:'nom_ecole',label:"Nom de l'école",type:'text',required:true},
      {key:'directeur',label:"Nom du directeur",type:'text',required:true},
      {key:'periode',label:"Période couverte (ex: 2025-2030)",type:'text',required:true},
      {key:'axes_strategiques',label:"Axes stratégiques principaux",type:'textarea',required:true},
      {key:'budget_previsionnel',label:"Budget prévisionnel (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT — ÉTABLISSEMENT SCOLAIRE PRIVÉ</h1>
<h2>{{nom_ecole}}</h2>
<p>Directeur : <strong>{{directeur}}</strong> — Période : <strong>{{periode}}</strong></p>
<h2>I. Vision et Mission</h2>
<p>L'établissement se fixe pour mission de former des élèves compétents, citoyens responsables et ouverts sur le monde.</p>
<h2>II. Axes stratégiques</h2>
<p>{{axes_strategiques}}</p>
<h2>III. Budget prévisionnel</h2>
<p>Budget global estimé : <strong>{{budget_previsionnel}} FCFA</strong>.</p>
<h2>IV. Suivi et évaluation</h2>
<p>Un comité de pilotage se réunit deux fois par an pour évaluer l'avancement du plan.</p>
<p>Signature du Directeur _________________</p></div>`
  },
  {
    code: 'ecol_accord_franchise_reseau',
    name: "Accord de franchise réseau écoles privées",
    category: 'academique', price: 6000, priceMax: 15000,
    description: "Contrat de franchise permettant à un opérateur de développer un réseau d'établissements scolaires privés sous une enseigne commune.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 30,
    fieldsJson: F([
      {key:'franchiseur',label:"Franchiseur (tête de réseau)",type:'text',required:true},
      {key:'franchise',label:"Franchisé (exploitant)",type:'text',required:true},
      {key:'zone_exclusive',label:"Zone d'exclusivité",type:'text',required:true},
      {key:'droit_entree',label:"Droit d'entrée (FCFA)",type:'text',required:true},
      {key:'redevance_annuelle',label:"Redevance annuelle (FCFA)",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE FRANCHISE — RÉSEAU D'ÉCOLES PRIVÉES</h1>
<p>Franchiseur : <strong>{{franchiseur}}</strong> — Franchisé : <strong>{{franchise}}</strong></p>
<h2>Article 1 — Concession</h2>
<p>Le franchiseur concède au franchisé le droit d'exploiter le concept éducatif sous l'enseigne du réseau, dans la zone : <strong>{{zone_exclusive}}</strong>.</p>
<h2>Article 2 — Finances</h2>
<p>Droit d'entrée : <strong>{{droit_entree}} FCFA</strong> — Redevance annuelle : <strong>{{redevance_annuelle}} FCFA</strong>.</p>
<h2>Article 3 — Standards</h2>
<p>Le franchisé s'engage à respecter les standards pédagogiques, les chartes graphiques et les procédures du réseau.</p>
<p>Signé le <strong>{{date_signature}}</strong></p>
<p>Franchiseur _________________ Franchisé _________________</p></div>`
  },
  {
    code: 'ecol_accord_certification_academique',
    name: "Accord de certification académique privée",
    category: 'academique', price: 4000, priceMax: 10000,
    description: "Convention entre un établissement et un organisme certificateur pour la délivrance de certifications académiques privées.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 36,
    fieldsJson: F([
      {key:'etablissement',label:"Nom de l'établissement",type:'text',required:true},
      {key:'organisme',label:"Organisme certificateur",type:'text',required:true},
      {key:'certification',label:"Nom de la certification",type:'text',required:true},
      {key:'frais_certification',label:"Frais de certification (FCFA)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE CERTIFICATION ACADÉMIQUE PRIVÉE</h1>
<p>Établissement : <strong>{{etablissement}}</strong> — Organisme : <strong>{{organisme}}</strong></p>
<h2>Article 1 — Certification</h2>
<p>L'organisme certifie les compétences des apprenants ayant suivi le cursus : <strong>{{certification}}</strong>.</p>
<h2>Article 2 — Conditions de délivrance</h2>
<p>La certification est délivrée après réussite d'une évaluation finale supervisée par l'organisme certificateur.</p>
<h2>Article 3 — Frais</h2>
<p>Frais par candidat : <strong>{{frais_certification}} FCFA</strong>.</p>
<p>Accord signé le <strong>{{date_accord}}</strong></p>
<p>Établissement _________________ Organisme _________________</p></div>`
  },
  {
    code: 'ecol_plan_numerique',
    name: "Plan de numérique éducatif école privée",
    category: 'academique', price: 3500, priceMax: 9000,
    description: "Plan stratégique d'intégration des outils numériques dans les pratiques pédagogiques d'une école privée.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 55,
    fieldsJson: F([
      {key:'nom_ecole',label:"Nom de l'école",type:'text',required:true},
      {key:'responsable_numerique',label:"Responsable numérique",type:'text',required:true},
      {key:'equipements_prevus',label:"Équipements prévus",type:'textarea',required:true},
      {key:'budget_numerique',label:"Budget numérique (FCFA)",type:'text',required:true},
      {key:'calendrier',label:"Calendrier de déploiement",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>PLAN DE NUMÉRIQUE ÉDUCATIF</h1>
<h2>{{nom_ecole}}</h2>
<p>Responsable numérique : <strong>{{responsable_numerique}}</strong></p>
<h2>I. Diagnostic</h2>
<p>L'école identifie les besoins en équipement, formation et connectivité pour intégrer le numérique dans l'enseignement.</p>
<h2>II. Équipements prévus</h2>
<p>{{equipements_prevus}}</p>
<h2>III. Budget</h2>
<p>Enveloppe budgétaire : <strong>{{budget_numerique}} FCFA</strong>.</p>
<h2>IV. Calendrier</h2>
<p>{{calendrier}}</p>
<p>Approuvé par le Directeur _________________</p></div>`
  },
  {
    code: 'ecol_charte_communaute_educative',
    name: "Charte de la communauté éducative",
    category: 'academique', price: 1500, priceMax: 4000,
    description: "Charte définissant les valeurs, droits et devoirs de tous les acteurs de la communauté éducative d'un établissement privé.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 60,
    fieldsJson: F([
      {key:'nom_ecole',label:"Nom de l'école",type:'text',required:true},
      {key:'devise',label:"Devise de l'école",type:'text',required:true},
      {key:'valeurs',label:"Valeurs fondamentales",type:'textarea',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CHARTE DE LA COMMUNAUTÉ ÉDUCATIVE</h1>
<h2>{{nom_ecole}}</h2>
<p>Devise : <em>{{devise}}</em></p>
<h2>Préambule</h2>
<p>La communauté éducative est composée des élèves, des enseignants, des parents d'élèves, du personnel administratif et des partenaires.</p>
<h2>Nos valeurs fondamentales</h2>
<p>{{valeurs}}</p>
<h2>Engagement commun</h2>
<p>Chaque membre de la communauté s'engage à contribuer à un environnement scolaire respectueux, inclusif et propice à l'apprentissage.</p>
<h2>Droits et devoirs</h2>
<p>Chaque acteur a le droit d'être respecté et a le devoir de respecter les autres membres de la communauté.</p>
<p>Adoptée le <strong>{{date_adoption}}</strong> — Signature du Directeur _________________</p></div>`
  },

  // ── 25 Concours / Examens / Certifications (cert_) ──
  {
    code: 'cert_accord_centre_examen_dren',
    name: "Accord de centre d'examen national (DREN)",
    category: 'academique', price: 3000, priceMax: 8000,
    description: "Convention désignant un établissement comme centre d'examen officiel auprès de la Direction Régionale de l'Éducation Nationale.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 65,
    fieldsJson: F([
      {key:'nom_centre',label:"Nom du centre d'examen",type:'text',required:true},
      {key:'dren',label:"DREN de rattachement",type:'text',required:true},
      {key:'examen_concerne',label:"Examen concerné (BEPC, BAC...)",type:'text',required:true},
      {key:'capacite_accueil',label:"Capacité d'accueil (nb candidats)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE CENTRE D'EXAMEN NATIONAL</h1>
<p>Centre : <strong>{{nom_centre}}</strong> — DREN : <strong>{{dren}}</strong></p>
<p>Examen : <strong>{{examen_concerne}}</strong></p>
<h2>Article 1 — Désignation</h2>
<p>La DREN désigne l'établissement susmentionné comme centre officiel d'examen pour la session en cours.</p>
<h2>Article 2 — Capacité</h2>
<p>Nombre maximum de candidats pouvant être accueillis : <strong>{{capacite_accueil}}</strong>.</p>
<h2>Article 3 — Obligations</h2>
<p>Le centre s'engage à mettre à disposition les salles, le mobilier et les équipements nécessaires à l'organisation de l'examen.</p>
<p>Accord signé le <strong>{{date_accord}}</strong></p>
<p>Chef de centre _________________ Représentant DREN _________________</p></div>`
  },
  {
    code: 'cert_contrat_surveillance_examen',
    name: "Contrat de service de surveillance d'examen",
    category: 'academique', price: 2000, priceMax: 5000,
    description: "Contrat de prestation pour la surveillance de salles lors d'un examen officiel ou interne.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 60,
    fieldsJson: F([
      {key:'organisme',label:"Organisme organisateur",type:'text',required:true},
      {key:'nom_surveillant',label:"Nom du surveillant",type:'text',required:true},
      {key:'type_examen',label:"Type d'examen",type:'text',required:true},
      {key:'remuneration',label:"Rémunération journalière (FCFA)",type:'text',required:true},
      {key:'date_examen',label:"Date de l'examen",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SURVEILLANCE D'EXAMEN</h1>
<p>Organisme : <strong>{{organisme}}</strong> — Surveillant : <strong>{{nom_surveillant}}</strong></p>
<p>Examen : <strong>{{type_examen}}</strong> — Date : <strong>{{date_examen}}</strong></p>
<h2>Article 1 — Mission</h2>
<p>Le surveillant est chargé de veiller au bon déroulement de l'examen en salle, de distribuer les sujets et de prévenir toute fraude.</p>
<h2>Article 2 — Rémunération</h2>
<p>Indemnité journalière : <strong>{{remuneration}} FCFA</strong>.</p>
<h2>Article 3 — Confidentialité</h2>
<p>Le surveillant s'engage à la stricte confidentialité des sujets et des copies.</p>
<p>Signatures : Organisateur _________________ Surveillant _________________</p></div>`
  },
  {
    code: 'cert_accord_correction_copies',
    name: "Accord de correction de copies d'examen",
    category: 'academique', price: 2000, priceMax: 5500,
    description: "Convention liant un correcteur à l'organisme organisateur pour la correction des copies d'un examen.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 55,
    fieldsJson: F([
      {key:'organisme',label:"Organisme organisateur",type:'text',required:true},
      {key:'nom_correcteur',label:"Nom du correcteur",type:'text',required:true},
      {key:'matiere',label:"Matière corrigée",type:'text',required:true},
      {key:'nb_copies',label:"Nombre de copies estimé",type:'text',required:true},
      {key:'remuneration_copie',label:"Rémunération par copie (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE CORRECTION DE COPIES D'EXAMEN</h1>
<p>Organisme : <strong>{{organisme}}</strong> — Correcteur : <strong>{{nom_correcteur}}</strong></p>
<p>Matière : <strong>{{matiere}}</strong> — Nombre de copies : <strong>{{nb_copies}}</strong></p>
<h2>Article 1 — Mission</h2>
<p>Le correcteur s'engage à corriger les copies conformément au barème officiel et dans les délais impartis.</p>
<h2>Article 2 — Rémunération</h2>
<p>Rémunération par copie : <strong>{{remuneration_copie}} FCFA</strong>.</p>
<h2>Article 3 — Confidentialité</h2>
<p>Le correcteur est soumis au secret professionnel et s'interdit de divulguer les résultats avant la proclamation officielle.</p>
<p>Signatures : Organisateur _________________ Correcteur _________________</p></div>`
  },
  {
    code: 'cert_accord_deliberation_jury',
    name: "Accord de service de délibération de jury",
    category: 'academique', price: 2500, priceMax: 6000,
    description: "Convention organisant la délibération du jury d'un examen et définissant les rôles des membres.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 48,
    fieldsJson: F([
      {key:'organisme',label:"Organisme organisateur",type:'text',required:true},
      {key:'president_jury',label:"Président du jury",type:'text',required:true},
      {key:'examen',label:"Examen concerné",type:'text',required:true},
      {key:'date_deliberation',label:"Date de délibération",type:'date',required:true},
      {key:'indemnite_jury',label:"Indemnité de jury (FCFA/membre)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE DÉLIBÉRATION DE JURY</h1>
<p>Examen : <strong>{{examen}}</strong> — Président du jury : <strong>{{president_jury}}</strong></p>
<p>Date de délibération : <strong>{{date_deliberation}}</strong></p>
<h2>Article 1 — Composition du jury</h2>
<p>Le jury est composé d'enseignants et d'experts désignés par <strong>{{organisme}}</strong>.</p>
<h2>Article 2 — Délibération</h2>
<p>Le jury statue souverainement sur les résultats et peut accorder des points de jury dans les limites réglementaires.</p>
<h2>Article 3 — Indemnités</h2>
<p>Chaque membre perçoit une indemnité de : <strong>{{indemnite_jury}} FCFA</strong>.</p>
<p>Le Président du jury certifie les résultats. Signature _________________</p></div>`
  },
  {
    code: 'cert_contrat_certification_professionnelle',
    name: "Contrat de service de certification professionnelle (CAP, BT)",
    category: 'academique', price: 3000, priceMax: 8000,
    description: "Contrat de prestation pour l'organisation et la délivrance d'une certification professionnelle (CAP, BT) en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 58,
    fieldsJson: F([
      {key:'organisme',label:"Organisme certificateur",type:'text',required:true},
      {key:'centre_formation',label:"Centre de formation",type:'text',required:true},
      {key:'certification',label:"Certification (CAP, BT, BEP...)",type:'text',required:true},
      {key:'nb_candidats',label:"Nombre de candidats",type:'text',required:true},
      {key:'date_examen',label:"Date de l'examen",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE CERTIFICATION PROFESSIONNELLE</h1>
<p>Organisme : <strong>{{organisme}}</strong> — Centre de formation : <strong>{{centre_formation}}</strong></p>
<p>Certification : <strong>{{certification}}</strong> — Candidats : <strong>{{nb_candidats}}</strong></p>
<h2>Article 1 — Organisation</h2>
<p>L'organisme assure l'organisation de l'épreuve, la correction des travaux et la délivrance du diplôme.</p>
<h2>Article 2 — Centre</h2>
<p>Le centre de formation met à disposition les ateliers, équipements et la documentation nécessaires à l'épreuve pratique.</p>
<h2>Article 3 — Date</h2>
<p>Épreuves prévues le : <strong>{{date_examen}}</strong>.</p>
<p>Signatures : Organisme _________________ Centre _________________</p></div>`
  },
  {
    code: 'cert_accord_reconnaissance_diplome',
    name: "Accord de reconnaissance de diplôme étranger",
    category: 'academique', price: 4000, priceMax: 10000,
    description: "Dossier de demande et accord de reconnaissance d'un diplôme obtenu à l'étranger auprès des autorités compétentes en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 45,
    fieldsJson: F([
      {key:'nom_detenteur',label:"Nom du détenteur du diplôme",type:'text',required:true},
      {key:'diplome',label:"Intitulé du diplôme",type:'text',required:true},
      {key:'pays_obtention',label:"Pays d'obtention",type:'text',required:true},
      {key:'etablissement_delivreur',label:"Établissement délivrant",type:'text',required:true},
      {key:'date_demande',label:"Date de la demande",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>DEMANDE DE RECONNAISSANCE DE DIPLÔME ÉTRANGER</h1>
<p>Demandeur : <strong>{{nom_detenteur}}</strong></p>
<p>Diplôme : <strong>{{diplome}}</strong> — Pays : <strong>{{pays_obtention}}</strong></p>
<p>Établissement délivrant : <strong>{{etablissement_delivreur}}</strong></p>
<h2>Objet de la demande</h2>
<p>Le demandeur sollicite auprès du Ministère de l'Éducation Nationale de Côte d'Ivoire la reconnaissance officielle du diplôme mentionné ci-dessus.</p>
<h2>Pièces jointes</h2>
<p>Copie légalisée du diplôme, relevés de notes, traduction assermentée, fiche de candidature.</p>
<p>Date de dépôt : <strong>{{date_demande}}</strong> — Signature du demandeur _________________</p></div>`
  },
  {
    code: 'cert_contrat_centre_test_langue',
    name: "Contrat de prestation centre de test de langue (DELF, TOEFL)",
    category: 'academique', price: 3500, priceMax: 9000,
    description: "Contrat entre un centre de test agréé et des candidats pour l'organisation de tests de langue certifiants.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 60,
    fieldsJson: F([
      {key:'nom_centre',label:"Nom du centre de test",type:'text',required:true},
      {key:'certification_langue',label:"Certification de langue (DELF, TOEFL, DALF...)",type:'text',required:true},
      {key:'nom_candidat',label:"Nom du candidat",type:'text',required:true},
      {key:'frais_inscription',label:"Frais d'inscription (FCFA)",type:'text',required:true},
      {key:'date_epreuve',label:"Date de l'épreuve",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT D'INSCRIPTION — CENTRE DE TEST DE LANGUE</h1>
<p>Centre : <strong>{{nom_centre}}</strong> — Candidat : <strong>{{nom_candidat}}</strong></p>
<p>Certification : <strong>{{certification_langue}}</strong> — Date : <strong>{{date_epreuve}}</strong></p>
<h2>Article 1 — Inscription</h2>
<p>Le centre enregistre l'inscription du candidat pour la session mentionnée.</p>
<h2>Article 2 — Frais</h2>
<p>Frais d'inscription : <strong>{{frais_inscription}} FCFA</strong>, non remboursables.</p>
<h2>Article 3 — Organisation</h2>
<p>Le centre garantit une organisation conforme aux standards de l'organisme certificateur international.</p>
<p>Signatures : Centre _________________ Candidat _________________</p></div>`
  },
  {
    code: 'cert_accord_evaluation_competences',
    name: "Accord de service d'évaluation de compétences (assessment center)",
    category: 'academique', price: 4000, priceMax: 10000,
    description: "Convention de prestation pour l'organisation d'un assessment center visant l'évaluation de compétences professionnelles.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 40,
    fieldsJson: F([
      {key:'entreprise_cliente',label:"Entreprise cliente",type:'text',required:true},
      {key:'cabinet_evaluation',label:"Cabinet d'évaluation",type:'text',required:true},
      {key:'profils_evalues',label:"Profils évalués",type:'text',required:true},
      {key:'nb_participants',label:"Nombre de participants",type:'text',required:true},
      {key:'cout_total',label:"Coût total (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD D'ÉVALUATION DE COMPÉTENCES — ASSESSMENT CENTER</h1>
<p>Client : <strong>{{entreprise_cliente}}</strong> — Cabinet : <strong>{{cabinet_evaluation}}</strong></p>
<p>Profils évalués : <strong>{{profils_evalues}}</strong> — Participants : <strong>{{nb_participants}}</strong></p>
<h2>Article 1 — Prestation</h2>
<p>Le cabinet organise un assessment center comprenant tests psychométriques, mises en situation et entretiens de compétences.</p>
<h2>Article 2 — Livrables</h2>
<p>Un rapport individuel de compétences est remis à l'entreprise pour chaque participant.</p>
<h2>Article 3 — Honoraires</h2>
<p>Coût total : <strong>{{cout_total}} FCFA</strong>.</p>
<p>Signatures : Client _________________ Cabinet _________________</p></div>`
  },
  {
    code: 'cert_accord_certification_iso9001',
    name: "Accord de certification ISO 9001 organisme de formation",
    category: 'academique', price: 5000, priceMax: 13000,
    description: "Convention entre un organisme de formation et un certificateur accrédité pour l'obtention de la certification ISO 9001.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 35,
    fieldsJson: F([
      {key:'organisme_formation',label:"Organisme de formation",type:'text',required:true},
      {key:'certificateur',label:"Organisme certificateur",type:'text',required:true},
      {key:'perimetre',label:"Périmètre de certification",type:'textarea',required:true},
      {key:'cout_audit',label:"Coût de l'audit (FCFA)",type:'text',required:true},
      {key:'date_audit',label:"Date d'audit prévue",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE CERTIFICATION ISO 9001 — ORGANISME DE FORMATION</h1>
<p>Organisme : <strong>{{organisme_formation}}</strong> — Certificateur : <strong>{{certificateur}}</strong></p>
<h2>Article 1 — Périmètre</h2>
<p>{{perimetre}}</p>
<h2>Article 2 — Audit</h2>
<p>L'audit de certification est prévu le <strong>{{date_audit}}</strong>.</p>
<h2>Article 3 — Coût</h2>
<p>Coût de l'audit : <strong>{{cout_audit}} FCFA</strong>.</p>
<h2>Article 4 — Validité</h2>
<p>La certification est valable 3 ans, avec des audits de surveillance annuels.</p>
<p>Signatures : Organisme _________________ Certificateur _________________</p></div>`
  },
  {
    code: 'cert_contrat_vae',
    name: "Contrat de service de validation des acquis (VAE)",
    category: 'academique', price: 3500, priceMax: 9000,
    description: "Convention d'accompagnement VAE pour la validation des acquis de l'expérience professionnelle.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 42,
    fieldsJson: F([
      {key:'candidat',label:"Nom du candidat",type:'text',required:true},
      {key:'organisme_accompagnement',label:"Organisme d'accompagnement",type:'text',required:true},
      {key:'diplome_vise',label:"Diplôme visé",type:'text',required:true},
      {key:'cout_accompagnement',label:"Coût d'accompagnement (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT D'ACCOMPAGNEMENT VAE</h1>
<p>Candidat : <strong>{{candidat}}</strong> — Organisme : <strong>{{organisme_accompagnement}}</strong></p>
<p>Diplôme visé : <strong>{{diplome_vise}}</strong></p>
<h2>Article 1 — Mission</h2>
<p>L'organisme accompagne le candidat dans la rédaction de son livret de VAE, la préparation du jury et la valorisation de son expérience.</p>
<h2>Article 2 — Coût</h2>
<p>Coût total : <strong>{{cout_accompagnement}} FCFA</strong>.</p>
<h2>Article 3 — Démarrage</h2>
<p>Accompagnement débutant le <strong>{{date_debut}}</strong>.</p>
<p>Signatures : Organisme _________________ Candidat _________________</p></div>`
  },
  {
    code: 'cert_accord_chambre_professionnelle',
    name: "Accord de partenariat avec chambre professionnelle pour certification",
    category: 'academique', price: 4000, priceMax: 10000,
    description: "Convention entre un centre de formation et une chambre professionnelle pour la co-certification de compétences métier.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 38,
    fieldsJson: F([
      {key:'centre_formation',label:"Centre de formation",type:'text',required:true},
      {key:'chambre',label:"Chambre professionnelle partenaire",type:'text',required:true},
      {key:'metier',label:"Métier ou secteur visé",type:'text',required:true},
      {key:'type_certification',label:"Type de certification délivrée",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT — CHAMBRE PROFESSIONNELLE & CERTIFICATION</h1>
<p>Centre : <strong>{{centre_formation}}</strong> — Chambre : <strong>{{chambre}}</strong></p>
<p>Métier : <strong>{{metier}}</strong> — Certification : <strong>{{type_certification}}</strong></p>
<h2>Article 1 — Co-certification</h2>
<p>Les parties co-délivrent une certification reconnue par le secteur professionnel et par le Ministère de l'Emploi.</p>
<h2>Article 2 — Jury paritaire</h2>
<p>Un jury paritaire composé de professionnels et d'enseignants évalue les compétences des candidats.</p>
<h2>Article 3 — Durée</h2>
<p>Accord valable 2 ans à compter du <strong>{{date_accord}}</strong>.</p>
<p>Signatures : Centre _________________ Chambre _________________</p></div>`
  },
  {
    code: 'cert_contrat_cours_preparatoires',
    name: "Contrat de service de cours préparatoires grandes écoles",
    category: 'academique', price: 3000, priceMax: 8000,
    description: "Contrat de prestation de classes préparatoires aux concours des grandes écoles ivoiriennes et sous-régionales.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 55,
    fieldsJson: F([
      {key:'etablissement',label:"Établissement proposant la prépa",type:'text',required:true},
      {key:'nom_etudiant',label:"Nom de l'étudiant",type:'text',required:true},
      {key:'ecoles_ciblees',label:"Grandes écoles ciblées",type:'text',required:true},
      {key:'frais_annuels',label:"Frais annuels (FCFA)",type:'text',required:true},
      {key:'date_rentree',label:"Date de rentrée",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE COURS PRÉPARATOIRES GRANDES ÉCOLES</h1>
<p>Établissement : <strong>{{etablissement}}</strong> — Étudiant : <strong>{{nom_etudiant}}</strong></p>
<p>Grandes écoles ciblées : <strong>{{ecoles_ciblees}}</strong></p>
<h2>Article 1 — Formation</h2>
<p>L'établissement dispense une formation intensive en mathématiques, français, sciences et culture générale visant la réussite aux concours.</p>
<h2>Article 2 — Frais</h2>
<p>Frais annuels : <strong>{{frais_annuels}} FCFA</strong>.</p>
<h2>Article 3 — Rentrée</h2>
<p>Rentrée prévue le <strong>{{date_rentree}}</strong>.</p>
<p>Signatures : Directeur _________________ Étudiant/Parent _________________</p></div>`
  },
  {
    code: 'cert_accord_preparation_concours_fp',
    name: "Accord de service de préparation concours fonction publique",
    category: 'academique', price: 2500, priceMax: 7000,
    description: "Convention de formation préparatoire aux concours de recrutement dans la fonction publique ivoirienne.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 70,
    fieldsJson: F([
      {key:'centre_preparation',label:"Centre de préparation",type:'text',required:true},
      {key:'nom_candidat',label:"Nom du candidat",type:'text',required:true},
      {key:'concours_vise',label:"Concours visé",type:'text',required:true},
      {key:'duree_formation',label:"Durée de la formation",type:'text',required:true},
      {key:'frais_formation',label:"Frais de formation (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PRÉPARATION AUX CONCOURS DE LA FONCTION PUBLIQUE</h1>
<p>Centre : <strong>{{centre_preparation}}</strong> — Candidat : <strong>{{nom_candidat}}</strong></p>
<p>Concours visé : <strong>{{concours_vise}}</strong> — Durée : <strong>{{duree_formation}}</strong></p>
<h2>Article 1 — Programme</h2>
<p>La formation couvre les épreuves écrites et orales du concours : culture générale, rédaction administrative, droit, etc.</p>
<h2>Article 2 — Frais</h2>
<p>Frais de formation : <strong>{{frais_formation}} FCFA</strong>.</p>
<h2>Article 3 — Engagement</h2>
<p>Le candidat s'engage à suivre assidûment les cours et à se présenter aux examens blancs organisés par le centre.</p>
<p>Signatures : Centre _________________ Candidat _________________</p></div>`
  },
  {
    code: 'cert_accord_preparation_bac',
    name: "Accord de service de formation préparation BAC",
    category: 'academique', price: 2000, priceMax: 6000,
    description: "Convention de cours intensifs de préparation au Baccalauréat pour les élèves de terminale.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 75,
    fieldsJson: F([
      {key:'centre_revision',label:"Centre de révision",type:'text',required:true},
      {key:'nom_eleve',label:"Nom de l'élève",type:'text',required:true},
      {key:'serie_bac',label:"Série du BAC (A, C, D, G...)",type:'text',required:true},
      {key:'matieres_renforcees',label:"Matières renforcées",type:'text',required:true},
      {key:'frais',label:"Frais de préparation (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PRÉPARATION AU BACCALAURÉAT</h1>
<p>Centre : <strong>{{centre_revision}}</strong> — Élève : <strong>{{nom_eleve}}</strong></p>
<p>Série : <strong>{{serie_bac}}</strong> — Matières renforcées : <strong>{{matieres_renforcees}}</strong></p>
<h2>Article 1 — Formation</h2>
<p>Le centre organise des cours de révision intensifs couvrant les programmes officiels du Baccalauréat ivoirien.</p>
<h2>Article 2 — Frais</h2>
<p>Frais totaux : <strong>{{frais}} FCFA</strong>.</p>
<h2>Article 3 — Garantie pédagogique</h2>
<p>Des examens blancs corrigés sont organisés pour évaluer les progrès de l'élève.</p>
<p>Signatures : Centre _________________ Parent/Élève _________________</p></div>`
  },
  {
    code: 'cert_contrat_cours_soir',
    name: "Contrat de service de cours du soir lycéens",
    category: 'academique', price: 1500, priceMax: 4500,
    description: "Contrat d'inscription aux cours du soir dispensés dans un lycée ou un centre éducatif privé.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 68,
    fieldsJson: F([
      {key:'etablissement',label:"Établissement dispensant les cours",type:'text',required:true},
      {key:'nom_eleve',label:"Nom de l'élève",type:'text',required:true},
      {key:'niveau',label:"Niveau scolaire",type:'text',required:true},
      {key:'horaires_soir',label:"Horaires des cours du soir",type:'text',required:true},
      {key:'tarif_mensuel',label:"Tarif mensuel (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE COURS DU SOIR — LYCÉENS</h1>
<p>Établissement : <strong>{{etablissement}}</strong> — Élève : <strong>{{nom_eleve}}</strong></p>
<p>Niveau : <strong>{{niveau}}</strong> — Horaires : <strong>{{horaires_soir}}</strong></p>
<h2>Article 1 — Objet</h2>
<p>L'établissement propose des cours du soir complémentaires pour renforcer les acquis des élèves.</p>
<h2>Article 2 — Tarif</h2>
<p>Tarif mensuel : <strong>{{tarif_mensuel}} FCFA</strong>.</p>
<h2>Article 3 — Assiduité</h2>
<p>L'élève s'engage à suivre régulièrement les cours et à informer l'établissement en cas d'absence.</p>
<p>Signatures : Responsable _________________ Parent/Élève _________________</p></div>`
  },
  {
    code: 'cert_accord_cours_rattrapage',
    name: "Accord de cours de rattrapage scolaire",
    category: 'academique', price: 1500, priceMax: 4000,
    description: "Convention d'organisation de cours de rattrapage pour élèves en difficulté scolaire.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 65,
    fieldsJson: F([
      {key:'ecole',label:"Nom de l'école",type:'text',required:true},
      {key:'nom_eleve',label:"Nom de l'élève",type:'text',required:true},
      {key:'matieres_rattrapage',label:"Matières de rattrapage",type:'text',required:true},
      {key:'nb_seances',label:"Nombre de séances prévues",type:'text',required:true},
      {key:'cout_total',label:"Coût total (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE COURS DE RATTRAPAGE</h1>
<p>École : <strong>{{ecole}}</strong> — Élève : <strong>{{nom_eleve}}</strong></p>
<p>Matières : <strong>{{matieres_rattrapage}}</strong> — Séances : <strong>{{nb_seances}}</strong></p>
<h2>Article 1 — Objectif</h2>
<p>Le rattrapage vise à combler les lacunes de l'élève et à le remettre au niveau de sa classe.</p>
<h2>Article 2 — Coût</h2>
<p>Coût total : <strong>{{cout_total}} FCFA</strong>.</p>
<h2>Article 3 — Suivi</h2>
<p>Un bilan de progression est transmis aux parents à l'issue des séances.</p>
<p>Signatures : Enseignant _________________ Parent _________________</p></div>`
  },
  {
    code: 'cert_plan_mentorat',
    name: "Plan de mentorat élèves en difficulté",
    category: 'academique', price: 2000, priceMax: 5500,
    description: "Programme structuré de mentorat pairs pour accompagner les élèves en difficulté scolaire.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 50,
    fieldsJson: F([
      {key:'ecole',label:"Nom de l'école",type:'text',required:true},
      {key:'coordinateur',label:"Coordinateur du programme",type:'text',required:true},
      {key:'nb_eleves_accompagnes',label:"Nombre d'élèves accompagnés",type:'text',required:true},
      {key:'duree_programme',label:"Durée du programme",type:'text',required:true},
      {key:'criteres_selection',label:"Critères de sélection des mentorés",type:'textarea',required:false},
    ]),
    body: `<div class="doc"><h1>PLAN DE MENTORAT — ÉLÈVES EN DIFFICULTÉ</h1>
<p>École : <strong>{{ecole}}</strong> — Coordinateur : <strong>{{coordinateur}}</strong></p>
<h2>I. Présentation</h2>
<p>Ce programme associe des élèves mentors (bons élèves volontaires) à des élèves mentorés en difficulté scolaire.</p>
<h2>II. Bénéficiaires</h2>
<p>Nombre d'élèves accompagnés : <strong>{{nb_eleves_accompagnes}}</strong>.</p>
<p>Critères de sélection : {{criteres_selection}}</p>
<h2>III. Durée</h2>
<p>Programme sur <strong>{{duree_programme}}</strong>.</p>
<h2>IV. Évaluation</h2>
<p>Les résultats des mentorés sont suivis et comparés avant/après le programme.</p>
<p>Approuvé par le Directeur _________________</p></div>`
  },
  {
    code: 'cert_accord_orientation_scolaire',
    name: "Accord de service d'orientation scolaire et professionnelle",
    category: 'academique', price: 2500, priceMax: 7000,
    description: "Convention de prestation d'orientation scolaire et professionnelle pour élèves de collège et lycée.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 55,
    fieldsJson: F([
      {key:'ecole',label:"Nom de l'école",type:'text',required:true},
      {key:'conseiller',label:"Nom du conseiller d'orientation",type:'text',required:true},
      {key:'nb_eleves',label:"Nombre d'élèves à orienter",type:'text',required:true},
      {key:'methodologie',label:"Méthodologie d'orientation",type:'text',required:true},
      {key:'remuneration',label:"Rémunération du conseiller (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD D'ORIENTATION SCOLAIRE ET PROFESSIONNELLE</h1>
<p>École : <strong>{{ecole}}</strong> — Conseiller : <strong>{{conseiller}}</strong></p>
<h2>Article 1 — Mission</h2>
<p>Le conseiller accompagne les élèves dans le choix de leur orientation post-bac ou post-BEPC par des entretiens individuels et collectifs.</p>
<h2>Article 2 — Bénéficiaires</h2>
<p>Nombre d'élèves : <strong>{{nb_eleves}}</strong>.</p>
<h2>Article 3 — Méthode</h2>
<p>Méthodologie : <strong>{{methodologie}}</strong>.</p>
<h2>Article 4 — Rémunération</h2>
<p>Honoraires : <strong>{{remuneration}} FCFA</strong>.</p>
<p>Signatures : Directeur _________________ Conseiller _________________</p></div>`
  },
  {
    code: 'cert_accord_bourse_merite',
    name: "Accord de bourse mérite élève",
    category: 'academique', price: 2000, priceMax: 5000,
    description: "Convention d'attribution d'une bourse au mérite à un élève distingué par ses résultats académiques.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 62,
    fieldsJson: F([
      {key:'ecole',label:"Nom de l'école",type:'text',required:true},
      {key:'nom_eleve',label:"Nom de l'élève boursier",type:'text',required:true},
      {key:'classe',label:"Classe de l'élève",type:'text',required:true},
      {key:'montant_bourse',label:"Montant de la bourse (FCFA)",type:'text',required:true},
      {key:'conditions_maintien',label:"Conditions de maintien de la bourse",type:'textarea',required:false},
    ]),
    body: `<div class="doc"><h1>ACCORD DE BOURSE AU MÉRITE</h1>
<p>École : <strong>{{ecole}}</strong> — Élève boursier : <strong>{{nom_eleve}}</strong> — Classe : <strong>{{classe}}</strong></p>
<h2>Article 1 — Attribution</h2>
<p>La bourse au mérite est attribuée en reconnaissance des excellents résultats de l'élève.</p>
<h2>Article 2 — Montant</h2>
<p>Montant de la bourse : <strong>{{montant_bourse}} FCFA</strong> pour l'année scolaire en cours.</p>
<h2>Article 3 — Conditions de maintien</h2>
<p>{{conditions_maintien}}</p>
<p>Signé par le Directeur _________________ et le parent _________________</p></div>`
  },
  {
    code: 'cert_accord_prix_excellence',
    name: "Accord de prix d'excellence scolaire",
    category: 'academique', price: 1500, priceMax: 4000,
    description: "Acte officiel d'attribution d'un prix d'excellence ou d'une distinction scolaire à un élève méritant.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 58,
    fieldsJson: F([
      {key:'ecole',label:"Nom de l'école",type:'text',required:true},
      {key:'nom_eleve',label:"Nom de l'élève",type:'text',required:true},
      {key:'annee_scolaire',label:"Année scolaire",type:'text',required:true},
      {key:'prix_attribue',label:"Prix attribué (ex : 1er de classe)",type:'text',required:true},
      {key:'date_ceremonie',label:"Date de cérémonie de remise",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ATTESTATION DE PRIX D'EXCELLENCE SCOLAIRE</h1>
<h2>{{ecole}}</h2>
<p>L'école atteste que l'élève <strong>{{nom_eleve}}</strong> a obtenu le prix suivant lors de l'année scolaire <strong>{{annee_scolaire}}</strong> :</p>
<p style="font-size:1.2em;font-weight:bold;text-align:center">{{prix_attribue}}</p>
<p>Ce prix est décerné en reconnaissance de ses efforts et de l'excellence de ses résultats scolaires.</p>
<p>Remis lors de la cérémonie du <strong>{{date_ceremonie}}</strong>.</p>
<p>Signature du Directeur _________________ Cachet de l'école</p></div>`
  },
  {
    code: 'cert_rapport_performance_centre',
    name: "Rapport de performance centre d'examen",
    category: 'academique', price: 2000, priceMax: 6000,
    description: "Rapport statistique et analytique sur les performances d'un centre d'examen à l'issue d'une session.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 45,
    fieldsJson: F([
      {key:'nom_centre',label:"Nom du centre",type:'text',required:true},
      {key:'examen',label:"Examen concerné",type:'text',required:true},
      {key:'session',label:"Session (ex : juin 2025)",type:'text',required:true},
      {key:'nb_inscrits',label:"Nombre d'inscrits",type:'text',required:true},
      {key:'taux_reussite',label:"Taux de réussite (%)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE — CENTRE D'EXAMEN</h1>
<p>Centre : <strong>{{nom_centre}}</strong> — Examen : <strong>{{examen}}</strong> — Session : <strong>{{session}}</strong></p>
<h2>I. Statistiques générales</h2>
<table border="1" cellpadding="6" style="width:100%;border-collapse:collapse">
  <tr><th>Indicateur</th><th>Valeur</th></tr>
  <tr><td>Inscrits</td><td><strong>{{nb_inscrits}}</strong></td></tr>
  <tr><td>Taux de réussite</td><td><strong>{{taux_reussite}} %</strong></td></tr>
</table>
<h2>II. Analyse</h2>
<p>Le centre a maintenu des conditions d'examen conformes aux exigences nationales.</p>
<h2>III. Recommandations</h2>
<p>Le chef de centre formule des recommandations pour améliorer les performances lors de la prochaine session.</p>
<p>Signature du Chef de centre _________________</p></div>`
  },
  {
    code: 'cert_accord_impression_sujets',
    name: "Accord de service d'impression sujets d'examen sécurisés",
    category: 'academique', price: 4000, priceMax: 10000,
    description: "Convention de prestation d'impression sécurisée des sujets d'examen avec protocole de confidentialité renforcée.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 35,
    fieldsJson: F([
      {key:'organisme',label:"Organisme commanditaire",type:'text',required:true},
      {key:'imprimeur',label:"Imprimeur agréé",type:'text',required:true},
      {key:'examen',label:"Examen concerné",type:'text',required:true},
      {key:'nb_copies',label:"Nombre de copies à imprimer",type:'text',required:true},
      {key:'cout_impression',label:"Coût total d'impression (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD D'IMPRESSION DE SUJETS D'EXAMEN SÉCURISÉS</h1>
<p>Organisme : <strong>{{organisme}}</strong> — Imprimeur : <strong>{{imprimeur}}</strong></p>
<p>Examen : <strong>{{examen}}</strong> — Tirage : <strong>{{nb_copies}} copies</strong></p>
<h2>Article 1 — Confidentialité</h2>
<p>L'imprimeur s'engage à traiter les sujets sous la plus stricte confidentialité. Tout personnel impliqué signe un engagement de non-divulgation.</p>
<h2>Article 2 — Sécurité</h2>
<p>Les fichiers sont transmis via canal sécurisé chiffré. Les copies imprimées sont conservées sous scellés jusqu'à distribution.</p>
<h2>Article 3 — Coût</h2>
<p>Coût total : <strong>{{cout_impression}} FCFA</strong>.</p>
<p>Signatures : Organisme _________________ Imprimeur _________________</p></div>`
  },
  {
    code: 'cert_accord_lutte_fraude',
    name: "Accord de lutte contre la fraude aux examens",
    category: 'academique', price: 2000, priceMax: 5000,
    description: "Charte et accord entre acteurs de l'éducation pour la prévention et la lutte contre la fraude aux examens officiels.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 52,
    fieldsJson: F([
      {key:'organisme',label:"Organisme organisateur",type:'text',required:true},
      {key:'partenaires',label:"Partenaires signataires",type:'text',required:true},
      {key:'mesures_prevention',label:"Mesures de prévention prévues",type:'textarea',required:true},
      {key:'sanctions_fraude',label:"Sanctions en cas de fraude",type:'textarea',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE LUTTE CONTRE LA FRAUDE AUX EXAMENS</h1>
<p>Organisme : <strong>{{organisme}}</strong> — Partenaires : <strong>{{partenaires}}</strong></p>
<h2>Article 1 — Mesures de prévention</h2>
<p>{{mesures_prevention}}</p>
<h2>Article 2 — Sanctions</h2>
<p>{{sanctions_fraude}}</p>
<h2>Article 3 — Engagement collectif</h2>
<p>Les signataires s'engagent à mettre tout en oeuvre pour garantir l'intégrité et l'équité des examens.</p>
<p>Signé le <strong>{{date_accord}}</strong></p>
<p>Signatures des parties _________________</p></div>`
  },
  {
    code: 'cert_plan_digitalisation_examens',
    name: "Plan de digitalisation des examens",
    category: 'academique', price: 5000, priceMax: 13000,
    description: "Plan stratégique de transformation numérique des processus d'examens (inscription, correction, résultats en ligne).",
    templateType: 'pdf', classe: 'C', active: true, popularity: 45,
    fieldsJson: F([
      {key:'organisme',label:"Organisme porteur",type:'text',required:true},
      {key:'responsable_projet',label:"Responsable du projet",type:'text',required:true},
      {key:'phases_deploiement',label:"Phases de déploiement",type:'textarea',required:true},
      {key:'budget_digital',label:"Budget digital (FCFA)",type:'text',required:true},
      {key:'date_lancement',label:"Date de lancement",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>PLAN DE DIGITALISATION DES EXAMENS</h1>
<p>Organisme : <strong>{{organisme}}</strong> — Responsable : <strong>{{responsable_projet}}</strong></p>
<h2>I. Vision</h2>
<p>Moderniser l'organisation des examens par la dématérialisation des inscriptions, la correction assistée et la publication des résultats en ligne.</p>
<h2>II. Phases de déploiement</h2>
<p>{{phases_deploiement}}</p>
<h2>III. Budget</h2>
<p>Budget alloué : <strong>{{budget_digital}} FCFA</strong>.</p>
<h2>IV. Lancement</h2>
<p>Date de lancement : <strong>{{date_lancement}}</strong>.</p>
<p>Approuvé par : _________________</p></div>`
  },
  {
    code: 'cert_charte_integrite_examens',
    name: "Charte de l'intégrité aux examens",
    category: 'academique', price: 1500, priceMax: 4000,
    description: "Charte éthique engageant tous les acteurs (candidats, surveillants, correcteurs) à respecter les principes d'intégrité lors des examens.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 68,
    fieldsJson: F([
      {key:'organisme',label:"Organisme émetteur",type:'text',required:true},
      {key:'examen',label:"Examen concerné",type:'text',required:true},
      {key:'session',label:"Session",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CHARTE DE L'INTÉGRITÉ AUX EXAMENS</h1>
<p>Organisme : <strong>{{organisme}}</strong> — Examen : <strong>{{examen}}</strong> — Session : <strong>{{session}}</strong></p>
<h2>Préambule</h2>
<p>L'intégrité académique est le fondement de la valeur des diplômes et certifications. Cette charte engage tous les acteurs à un comportement éthique exemplaire.</p>
<h2>Engagements des candidats</h2>
<p>Les candidats s'engagent à ne recourir à aucune forme de triche, de plagiat ou d'aide non autorisée.</p>
<h2>Engagements des surveillants et correcteurs</h2>
<p>Les personnels s'engagent à exercer leurs fonctions avec impartialité, rigueur et confidentialité.</p>
<h2>Sanctions</h2>
<p>Tout manquement à cette charte peut entraîner l'annulation des résultats et des poursuites disciplinaires.</p>
<p>Signé le <strong>{{date_signature}}</strong> — Signature du responsable _________________</p></div>`
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
  console.log(`Batch 50b OK — créés:${created} maj:${updated} TOTAL:${total}`);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
