import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ── 25 Télétravail / Travail à distance ──────────────────────────────────
  {
    code: 'tel2_accord_regulier',
    name: "Accord de Télétravail Régulier (Code du Travail CI)",
    category: 'rh_emploi', price: 4000, priceMax: 12000,
    description: "Accord de télétravail régulier conforme au code du travail de Côte d'Ivoire, fixant les modalités, jours et conditions du travail à distance.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 90,
    fieldsJson: F([
      {key:'nom_salarie', label:"Nom complet du salarié", type:'text', required:true},
      {key:'poste', label:"Poste occupé", type:'text', required:true},
      {key:'jours_teletravail', label:"Jours de télétravail par semaine", type:'text', required:true},
      {key:'date_debut', label:"Date de prise d'effet", type:'date', required:true},
      {key:'lieu_teletravail', label:"Lieu habituel de télétravail", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE TÉLÉTRAVAIL RÉGULIER</h1><p>Conformément aux dispositions du Code du Travail de Côte d'Ivoire, il est convenu entre les parties ce qui suit :</p><h2>Article 1 – Salarié concerné</h2><p>Le présent accord s'applique à <strong>{{nom_salarie}}</strong>, occupant le poste de <strong>{{poste}}</strong>.</p><h2>Article 2 – Modalités du télétravail</h2><p>Le salarié exercera ses fonctions en télétravail <strong>{{jours_teletravail}}</strong> jour(s) par semaine, depuis le lieu suivant : {{lieu_teletravail}}.</p><h2>Article 3 – Date d'entrée en vigueur</h2><p>Le présent accord prend effet le <strong>{{date_debut}}</strong>.</p><h2>Article 4 – Obligations du salarié</h2><p>Le salarié s'engage à être joignable pendant les heures de travail habituelles, à respecter les règles de confidentialité et à utiliser les outils mis à disposition par l'employeur.</p><h2>Article 5 – Réversibilité</h2><p>Chacune des parties peut mettre fin au télétravail avec un préavis de 15 jours.</p><p>Fait à Abidjan, le {{date_debut}}</p><p>Signature Employeur : _________________ &nbsp;&nbsp; Signature Salarié : _________________</p></div>`
  },
  {
    code: 'tel2_accord_occasionnel',
    name: "Accord de Télétravail Occasionnel",
    category: 'rh_emploi', price: 3000, priceMax: 8000,
    description: "Accord ponctuel autorisant le salarié à télétravailler de manière exceptionnelle sur demande motivée.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 75,
    fieldsJson: F([
      {key:'nom_salarie', label:"Nom complet du salarié", type:'text', required:true},
      {key:'date_teletravail', label:"Date(s) de télétravail occasionnel", type:'text', required:true},
      {key:'motif', label:"Motif de la demande", type:'textarea', required:true},
      {key:'accord_manager', label:"Nom du responsable hiérarchique", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE TÉLÉTRAVAIL OCCASIONNEL</h1><p>La présente autorisation est accordée à <strong>{{nom_salarie}}</strong> pour exercer ses fonctions en télétravail de façon exceptionnelle.</p><h2>Article 1 – Période concernée</h2><p>Le télétravail occasionnel est autorisé pour la/les date(s) suivante(s) : <strong>{{date_teletravail}}</strong>.</p><h2>Article 2 – Motif</h2><p>{{motif}}</p><h2>Article 3 – Validation</h2><p>Autorisation accordée par <strong>{{accord_manager}}</strong>, responsable hiérarchique.</p><h2>Article 4 – Conditions</h2><p>Le salarié demeure soumis aux règles internes de l'entreprise et doit rester joignable pendant ses heures habituelles de travail.</p><p>Fait à Abidjan</p><p>Signature Responsable : _________________ &nbsp;&nbsp; Signature Salarié : _________________</p></div>`
  },
  {
    code: 'tel2_full_remote',
    name: "Accord de Travail en Full Remote (100% Distanciel)",
    category: 'rh_emploi', price: 5000, priceMax: 14000,
    description: "Contrat encadrant un emploi exercé intégralement à distance, sans présence physique dans les locaux de l'entreprise.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 80,
    fieldsJson: F([
      {key:'nom_salarie', label:"Nom complet du salarié", type:'text', required:true},
      {key:'poste', label:"Intitulé du poste", type:'text', required:true},
      {key:'pays_residence', label:"Pays de résidence du salarié", type:'text', required:true},
      {key:'date_debut', label:"Date de début du contrat", type:'date', required:true},
      {key:'remuneration', label:"Rémunération mensuelle brute (FCFA)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE TRAVAIL EN FULL REMOTE</h1><p>Le présent accord définit les conditions d'un emploi exercé intégralement à distance (100% distanciel).</p><h2>Article 1 – Identification du salarié</h2><p><strong>{{nom_salarie}}</strong>, poste : <strong>{{poste}}</strong>, résidant en <strong>{{pays_residence}}</strong>.</p><h2>Article 2 – Modalités de travail</h2><p>Le salarié exerce l'intégralité de ses fonctions depuis son domicile ou tout espace de travail de son choix, sans obligation de présence physique au siège de l'entreprise.</p><h2>Article 3 – Rémunération</h2><p>Rémunération mensuelle brute : <strong>{{remuneration}}</strong> FCFA, versée selon les modalités prévues au contrat principal.</p><h2>Article 4 – Date d'effet</h2><p>Le présent accord prend effet le <strong>{{date_debut}}</strong>.</p><h2>Article 5 – Droit applicable</h2><p>Le présent accord est soumis au droit ivoirien, conformément au Code du Travail en vigueur.</p><p>Signatures des parties : _________________</p></div>`
  },
  {
    code: 'tel2_nomade_digital',
    name: "Accord de Travail Nomade (Digital Nomad)",
    category: 'rh_emploi', price: 4500, priceMax: 12000,
    description: "Accord encadrant le travail d'un salarié itinérant exerçant depuis différents lieux en Afrique ou dans le monde.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'nom_salarie', label:"Nom du travailleur nomade", type:'text', required:true},
      {key:'poste', label:"Poste et mission", type:'text', required:true},
      {key:'zones_autorisees', label:"Zones géographiques autorisées", type:'textarea', required:true},
      {key:'duree', label:"Durée de l'accord nomade", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE TRAVAIL NOMADE – DIGITAL NOMAD</h1><p>Le présent accord est conclu entre l'employeur et <strong>{{nom_salarie}}</strong>, occupant le poste de <strong>{{poste}}</strong>.</p><h2>Article 1 – Définition</h2><p>Le travail nomade permet au salarié d'exercer ses missions depuis n'importe quel lieu disposant d'une connexion internet adéquate.</p><h2>Article 2 – Zones autorisées</h2><p>{{zones_autorisees}}</p><h2>Article 3 – Durée</h2><p>Le présent accord est valable pour une durée de <strong>{{duree}}</strong>.</p><h2>Article 4 – Obligations</h2><p>Le salarié s'engage à maintenir sa disponibilité pendant les plages horaires convenues, à sécuriser ses connexions et à informer son responsable de tout déplacement à l'étranger.</p><p>Signatures : _________________</p></div>`
  },
  {
    code: 'tel2_materiel_informatique',
    name: "Accord de Mise à Disposition de Matériel Informatique (Télétravail)",
    category: 'rh_emploi', price: 3000, priceMax: 7000,
    description: "Accord formalisant la remise et l'usage du matériel informatique fourni par l'employeur pour le télétravail.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'nom_salarie', label:"Nom du salarié bénéficiaire", type:'text', required:true},
      {key:'materiel', label:"Désignation du matériel remis", type:'textarea', required:true},
      {key:'date_remise', label:"Date de remise du matériel", type:'date', required:true},
      {key:'valeur', label:"Valeur estimée du matériel (FCFA)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE MISE À DISPOSITION DE MATÉRIEL INFORMATIQUE</h1><p>L'employeur met à disposition du salarié <strong>{{nom_salarie}}</strong> le matériel informatique suivant pour l'exercice de ses fonctions en télétravail.</p><h2>Article 1 – Matériel mis à disposition</h2><p>{{materiel}}</p><h2>Article 2 – Date de remise</h2><p>Le matériel a été remis le <strong>{{date_remise}}</strong>.</p><h2>Article 3 – Valeur et responsabilité</h2><p>La valeur estimée du matériel est de <strong>{{valeur}}</strong> FCFA. Le salarié s'engage à en assurer la bonne conservation et à le restituer en bon état à la fin de la relation de travail.</p><h2>Article 4 – Usage exclusif professionnel</h2><p>Le matériel est réservé à un usage strictement professionnel.</p><p>Signatures : _________________</p></div>`
  },
  {
    code: 'tel2_frais_teletravail',
    name: "Accord de Prise en Charge des Frais de Télétravail",
    category: 'rh_emploi', price: 3000, priceMax: 8000,
    description: "Accord définissant les indemnités et remboursements de frais liés au télétravail (internet, électricité, fournitures).",
    templateType: 'pdf', classe: 'B', active: true, popularity: 78,
    fieldsJson: F([
      {key:'nom_salarie', label:"Nom du salarié", type:'text', required:true},
      {key:'indemnite_internet', label:"Indemnité internet mensuelle (FCFA)", type:'text', required:true},
      {key:'indemnite_electricite', label:"Indemnité électricité mensuelle (FCFA)", type:'text', required:true},
      {key:'date_debut', label:"Date de début de prise en charge", type:'date', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PRISE EN CHARGE DES FRAIS DE TÉLÉTRAVAIL</h1><p>Le présent accord précise les modalités de remboursement des frais supportés par le salarié <strong>{{nom_salarie}}</strong> dans le cadre du télétravail.</p><h2>Article 1 – Indemnité internet</h2><p>L'employeur prend en charge les frais de connexion internet à hauteur de <strong>{{indemnite_internet}}</strong> FCFA par mois.</p><h2>Article 2 – Indemnité électricité</h2><p>Une indemnité forfaitaire de <strong>{{indemnite_electricite}}</strong> FCFA par mois est versée pour couvrir les frais d'électricité.</p><h2>Article 3 – Date d'effet</h2><p>Ces prises en charge prennent effet à compter du <strong>{{date_debut}}</strong>.</p><h2>Article 4 – Justificatifs</h2><p>Le salarié fournira sur demande les justificatifs des frais engagés.</p><p>Signatures : _________________</p></div>`
  },
  {
    code: 'tel2_charte_entreprise',
    name: "Accord de Charte de Télétravail Entreprise",
    category: 'rh_emploi', price: 5000, priceMax: 14000,
    description: "Charte collective de télétravail définissant les règles applicables à l'ensemble des salariés d'une entreprise.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 85,
    fieldsJson: F([
      {key:'nom_entreprise', label:"Nom de l'entreprise", type:'text', required:true},
      {key:'secteur', label:"Secteur d'activité", type:'text', required:true},
      {key:'nombre_salaries', label:"Nombre de salariés concernés", type:'text', required:true},
      {key:'date_adoption', label:"Date d'adoption de la charte", type:'date', required:true},
      {key:'referent_teletravail', label:"Nom du référent télétravail", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE TÉLÉTRAVAIL – {{nom_entreprise}}</h1><p>La présente charte définit les règles et bonnes pratiques du télétravail au sein de <strong>{{nom_entreprise}}</strong> (secteur : {{secteur}}).</p><h2>Article 1 – Champ d'application</h2><p>La présente charte s'applique à <strong>{{nombre_salaries}}</strong> salarié(s) éligibles au télétravail.</p><h2>Article 2 – Principes directeurs</h2><p>Le télétravail repose sur la confiance mutuelle, l'autonomie du salarié et le respect des objectifs fixés.</p><h2>Article 3 – Référent télétravail</h2><p>Le référent télétravail est <strong>{{referent_teletravail}}</strong>, chargé de l'application et du suivi de la présente charte.</p><h2>Article 4 – Révision</h2><p>La présente charte est révisable annuellement ou à la demande des parties.</p><p>Adoptée le <strong>{{date_adoption}}</strong>. Signatures : _________________</p></div>`
  },
  {
    code: 'tel2_horaires_flexibles',
    name: "Accord de Gestion des Horaires Flexibles (Flex Time)",
    category: 'rh_emploi', price: 3500, priceMax: 9000,
    description: "Accord définissant les plages horaires fixes et flexibles pour les salariés en télétravail ou en présentiel.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'nom_salarie', label:"Nom du salarié", type:'text', required:true},
      {key:'plage_fixe', label:"Plage horaire fixe obligatoire", type:'text', required:true},
      {key:'plage_flexible', label:"Plage horaire flexible", type:'text', required:true},
      {key:'duree_hebdomadaire', label:"Durée hebdomadaire de travail (heures)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE GESTION DES HORAIRES FLEXIBLES – FLEX TIME</h1><p>Le présent accord est conclu avec <strong>{{nom_salarie}}</strong> afin de définir les modalités des horaires flexibles.</p><h2>Article 1 – Plage fixe</h2><p>La plage horaire fixe, durant laquelle le salarié doit être disponible, est : <strong>{{plage_fixe}}</strong>.</p><h2>Article 2 – Plage flexible</h2><p>En dehors de la plage fixe, le salarié peut organiser librement son temps de travail sur la plage : <strong>{{plage_flexible}}</strong>.</p><h2>Article 3 – Durée hebdomadaire</h2><p>La durée totale de travail hebdomadaire demeure de <strong>{{duree_hebdomadaire}}</strong> heures.</p><h2>Article 4 – Suivi</h2><p>Un outil de suivi du temps de travail est mis en place par l'employeur.</p><p>Signatures : _________________</p></div>`
  },
  {
    code: 'tel2_droit_deconnexion',
    name: "Accord de Droit à la Déconnexion",
    category: 'rh_emploi', price: 3000, priceMax: 7000,
    description: "Accord garantissant au salarié le droit de ne pas être contacté en dehors des heures de travail.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 73,
    fieldsJson: F([
      {key:'nom_entreprise', label:"Nom de l'entreprise", type:'text', required:true},
      {key:'heures_deconnexion', label:"Plages de déconnexion garanties", type:'text', required:true},
      {key:'date_adoption', label:"Date d'adoption", type:'date', required:true},
      {key:'referent', label:"Responsable RH signataire", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD SUR LE DROIT À LA DÉCONNEXION</h1><p>Afin de préserver la santé et l'équilibre vie professionnelle / vie personnelle, <strong>{{nom_entreprise}}</strong> adopte le présent accord.</p><h2>Article 1 – Principe</h2><p>Tout salarié dispose d'un droit à la déconnexion des outils numériques professionnels en dehors de ses heures de travail.</p><h2>Article 2 – Plages de déconnexion</h2><p>Les plages de déconnexion garanties sont : <strong>{{heures_deconnexion}}</strong>.</p><h2>Article 3 – Modalités</h2><p>Aucun salarié ne peut être sanctionné pour ne pas avoir répondu à un message pendant les plages de déconnexion.</p><h2>Article 4 – Entrée en vigueur</h2><p>Adopté le <strong>{{date_adoption}}</strong> par <strong>{{referent}}</strong>.</p><p>Signatures : _________________</p></div>`
  },
  {
    code: 'tel2_transfrontalier_cedeao',
    name: "Accord de Télétravail Transfrontalier (CEDEAO)",
    category: 'rh_emploi', price: 6000, priceMax: 16000,
    description: "Accord encadrant le télétravail d'un salarié exerçant depuis un pays différent de celui de l'employeur, dans l'espace CEDEAO.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'nom_salarie', label:"Nom du salarié", type:'text', required:true},
      {key:'pays_employeur', label:"Pays de l'employeur", type:'text', required:true},
      {key:'pays_salarie', label:"Pays de résidence du salarié", type:'text', required:true},
      {key:'droit_applicable', label:"Droit applicable choisi par les parties", type:'text', required:true},
      {key:'date_debut', label:"Date de début", type:'date', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE TÉLÉTRAVAIL TRANSFRONTALIER – ESPACE CEDEAO</h1><p>Le présent accord régit la situation de <strong>{{nom_salarie}}</strong>, résidant en <strong>{{pays_salarie}}</strong> et employé par une entreprise établie en <strong>{{pays_employeur}}</strong>.</p><h2>Article 1 – Contexte</h2><p>Dans le cadre de la libre circulation des travailleurs dans l'espace CEDEAO, les parties conviennent des modalités de télétravail transfrontalier.</p><h2>Article 2 – Droit applicable</h2><p>Le droit applicable est celui de <strong>{{droit_applicable}}</strong>, sauf disposition légale contraire.</p><h2>Article 3 – Sécurité sociale</h2><p>Les parties veilleront à la régularisation des cotisations sociales conformément aux conventions bilatérales en vigueur.</p><h2>Article 4 – Date d'effet</h2><p>Le présent accord prend effet le <strong>{{date_debut}}</strong>.</p><p>Signatures : _________________</p></div>`
  },
  {
    code: 'tel2_coworking_space',
    name: "Accord de Service de Coworking Space",
    category: 'rh_emploi', price: 3500, priceMax: 9000,
    description: "Convention de mise à disposition d'un espace de coworking pour les salariés ou indépendants en télétravail.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'nom_utilisateur', label:"Nom de l'utilisateur", type:'text', required:true},
      {key:'nom_coworking', label:"Nom de l'espace de coworking", type:'text', required:true},
      {key:'formule', label:"Formule souscrite (journée, semaine, mois)", type:'text', required:true},
      {key:'tarif', label:"Tarif mensuel (FCFA)", type:'text', required:true},
      {key:'date_debut', label:"Date de début", type:'date', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE COWORKING SPACE</h1><p>Le présent accord est conclu entre <strong>{{nom_coworking}}</strong> (prestataire) et <strong>{{nom_utilisateur}}</strong> (utilisateur).</p><h2>Article 1 – Formule</h2><p>L'utilisateur souscrit à la formule <strong>{{formule}}</strong> donnant accès aux espaces de travail partagés.</p><h2>Article 2 – Tarif</h2><p>Le tarif mensuel est de <strong>{{tarif}}</strong> FCFA, payable en début de mois.</p><h2>Article 3 – Services inclus</h2><p>L'abonnement comprend : accès WiFi haut débit, salle de réunion (selon disponibilité), café, adresse postale professionnelle.</p><h2>Article 4 – Durée</h2><p>Débutant le <strong>{{date_debut}}</strong>, renouvelable par tacite reconduction.</p><p>Signatures : _________________</p></div>`
  },
  {
    code: 'tel2_hot_desk',
    name: "Accord de Location de Bureau Partagé (Hot Desk)",
    category: 'rh_emploi', price: 3000, priceMax: 8000,
    description: "Contrat de location flexible de poste de travail non attitré dans un espace de bureaux partagés.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'locataire', label:"Nom du locataire", type:'text', required:true},
      {key:'bailleur', label:"Nom du bailleur / gestionnaire", type:'text', required:true},
      {key:'adresse', label:"Adresse des bureaux", type:'text', required:true},
      {key:'tarif_jour', label:"Tarif à la journée (FCFA)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE LOCATION DE BUREAU PARTAGÉ – HOT DESK</h1><p>Accord entre <strong>{{bailleur}}</strong> et <strong>{{locataire}}</strong> pour l'accès à un poste de travail non attitré.</p><h2>Article 1 – Objet</h2><p>Le bailleur met à disposition du locataire un bureau partagé à l'adresse suivante : <strong>{{adresse}}</strong>.</p><h2>Article 2 – Tarif</h2><p>Le tarif à la journée est de <strong>{{tarif_jour}}</strong> FCFA. La réservation s'effectue en ligne ou par téléphone.</p><h2>Article 3 – Règlement intérieur</h2><p>Le locataire s'engage à respecter le règlement intérieur de l'espace partagé et à laisser le poste propre après usage.</p><h2>Article 4 – Responsabilité</h2><p>Le bailleur n'est pas responsable des effets personnels laissés sur place.</p><p>Signatures : _________________</p></div>`
  },
  {
    code: 'tel2_accelerateur_startups',
    name: "Accord de Service d'Accélérateur de Startups (Résidence)",
    category: 'rh_emploi', price: 5000, priceMax: 14000,
    description: "Convention d'accueil en résidence au sein d'un accélérateur de startups incluant espace de travail, mentorat et ressources.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'nom_startup', label:"Nom de la startup", type:'text', required:true},
      {key:'nom_accelerateur', label:"Nom de l'accélérateur", type:'text', required:true},
      {key:'duree_programme', label:"Durée du programme (mois)", type:'text', required:true},
      {key:'date_debut', label:"Date de début de résidence", type:'date', required:true},
      {key:'contreparties', label:"Contreparties demandées (equity, frais, etc.)", type:'textarea', required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE RÉSIDENCE EN ACCÉLÉRATEUR DE STARTUPS</h1><p>Accord conclu entre <strong>{{nom_accelerateur}}</strong> et la startup <strong>{{nom_startup}}</strong>.</p><h2>Article 1 – Programme</h2><p>La startup est admise en résidence pour une durée de <strong>{{duree_programme}}</strong> mois à compter du <strong>{{date_debut}}</strong>.</p><h2>Article 2 – Services fournis</h2><p>L'accélérateur met à disposition : espace de travail, mentorat expert, accès réseau investisseurs, ateliers de formation et ressources logistiques.</p><h2>Article 3 – Contreparties</h2><p>{{contreparties}}</p><h2>Article 4 – Propriété intellectuelle</h2><p>La startup conserve la pleine propriété de ses innovations développées pendant la résidence.</p><p>Signatures : _________________</p></div>`
  },
  {
    code: 'tel2_bureau_virtuel',
    name: "Accord de Service de Bureau Virtuel",
    category: 'rh_emploi', price: 2500, priceMax: 6000,
    description: "Contrat de prestation de bureau virtuel incluant adresse professionnelle, domiciliation et services associés.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'client', label:"Nom du client / entreprise", type:'text', required:true},
      {key:'prestataire', label:"Nom du prestataire de bureau virtuel", type:'text', required:true},
      {key:'adresse_domiciliation', label:"Adresse de domiciliation fournie", type:'text', required:true},
      {key:'tarif_mensuel', label:"Tarif mensuel (FCFA)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE BUREAU VIRTUEL</h1><p>Accord entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong> pour la fourniture d'un bureau virtuel.</p><h2>Article 1 – Adresse professionnelle</h2><p>Le prestataire fournit au client une adresse professionnelle : <strong>{{adresse_domiciliation}}</strong>.</p><h2>Article 2 – Services inclus</h2><p>Réception et transfert du courrier, numéro de téléphone dédié, accès occasionnel à une salle de réunion sur réservation.</p><h2>Article 3 – Tarif</h2><p>Le tarif mensuel est de <strong>{{tarif_mensuel}}</strong> FCFA.</p><h2>Article 4 – Conformité légale</h2><p>La domiciliation est effectuée conformément aux dispositions du RCCM ivoirien et du droit OHADA.</p><p>Signatures : _________________</p></div>`
  },
  {
    code: 'tel2_telesecrétariat',
    name: "Accord de Service de Télésecrétariat",
    category: 'rh_emploi', price: 3000, priceMax: 8000,
    description: "Contrat de prestation de secrétariat exercé à distance pour le compte d'une entreprise ou d'un professionnel libéral.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'client', label:"Nom du client", type:'text', required:true},
      {key:'prestataire', label:"Nom de la télésecrétaire / société", type:'text', required:true},
      {key:'missions', label:"Missions confiées", type:'textarea', required:true},
      {key:'tarif_horaire', label:"Tarif horaire (FCFA)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TÉLÉSECRÉTARIAT</h1><p>Accord entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong> pour des prestations de secrétariat à distance.</p><h2>Article 1 – Missions</h2><p>{{missions}}</p><h2>Article 2 – Tarif</h2><p>La prestation est facturée au tarif horaire de <strong>{{tarif_horaire}}</strong> FCFA.</p><h2>Article 3 – Confidentialité</h2><p>Le prestataire s'engage à traiter toutes les informations du client avec la plus stricte confidentialité.</p><h2>Article 4 – Résiliation</h2><p>Chaque partie peut mettre fin à l'accord avec un préavis de 15 jours.</p><p>Signatures : _________________</p></div>`
  },
  {
    code: 'tel2_permanence_telephonique',
    name: "Accord de Service de Permanence Téléphonique Externalisée",
    category: 'rh_emploi', price: 4000, priceMax: 10000,
    description: "Contrat de prestation de permanence téléphonique assurée par un prestataire externe au nom de l'entreprise.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'client', label:"Nom de l'entreprise cliente", type:'text', required:true},
      {key:'prestataire', label:"Nom du prestataire", type:'text', required:true},
      {key:'plages_horaires', label:"Plages horaires de la permanence", type:'text', required:true},
      {key:'tarif_mensuel', label:"Tarif mensuel (FCFA)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PERMANENCE TÉLÉPHONIQUE EXTERNALISÉE</h1><p>Accord entre <strong>{{prestataire}}</strong> (prestataire) et <strong>{{client}}</strong> (client).</p><h2>Article 1 – Objet</h2><p>Le prestataire assure la permanence téléphonique au nom du client sur les plages suivantes : <strong>{{plages_horaires}}</strong>.</p><h2>Article 2 – Modalités</h2><p>Les appels sont traités selon le script de réponse fourni par le client. Les messages sont transmis en temps réel par email ou SMS.</p><h2>Article 3 – Tarif</h2><p>Tarif mensuel : <strong>{{tarif_mensuel}}</strong> FCFA.</p><h2>Article 4 – Qualité de service</h2><p>Le prestataire s'engage à décrocher dans un délai maximum de 3 sonneries.</p><p>Signatures : _________________</p></div>`
  },
  {
    code: 'tel2_centre_appel',
    name: "Accord de Service de Centre d'Appel Externalisé (Call Center)",
    category: 'rh_emploi', price: 6000, priceMax: 16000,
    description: "Contrat de sous-traitance de services d'appels entrants et sortants à un prestataire call center.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 67,
    fieldsJson: F([
      {key:'client', label:"Nom de l'entreprise cliente", type:'text', required:true},
      {key:'call_center', label:"Nom du centre d'appel", type:'text', required:true},
      {key:'volume_appels', label:"Volume d'appels mensuel estimé", type:'text', required:true},
      {key:'tarif_appel', label:"Tarif par appel ou tarif forfaitaire (FCFA)", type:'text', required:true},
      {key:'langue', label:"Langue(s) de traitement des appels", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CENTRE D'APPEL EXTERNALISÉ</h1><p>Accord entre <strong>{{call_center}}</strong> (prestataire) et <strong>{{client}}</strong> (donneur d'ordre).</p><h2>Article 1 – Prestations</h2><p>Le prestataire traite les appels entrants et/ou sortants du client. Volume estimé : <strong>{{volume_appels}}</strong> appels par mois. Langue(s) : <strong>{{langue}}</strong>.</p><h2>Article 2 – Tarif</h2><p><strong>{{tarif_appel}}</strong> FCFA.</p><h2>Article 3 – Supervision</h2><p>Des rapports hebdomadaires d'activité sont transmis au client.</p><h2>Article 4 – Confidentialité</h2><p>Le prestataire s'engage à ne pas divulguer les données clients et à respecter les normes de protection des données personnelles.</p><p>Signatures : _________________</p></div>`
  },
  {
    code: 'tel2_traduction_distance',
    name: "Accord de Service de Traduction et Interprétation à Distance",
    category: 'rh_emploi', price: 3500, priceMax: 9000,
    description: "Contrat de prestation de traduction écrite et d'interprétation orale à distance pour entreprises et organisations.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'client', label:"Nom du client", type:'text', required:true},
      {key:'prestataire', label:"Nom du prestataire traducteur", type:'text', required:true},
      {key:'langues', label:"Paires de langues (ex : français-anglais)", type:'text', required:true},
      {key:'tarif_mot', label:"Tarif au mot ou à l'heure (FCFA)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TRADUCTION ET INTERPRÉTATION À DISTANCE</h1><p>Accord entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong> pour des prestations de traduction et interprétation à distance.</p><h2>Article 1 – Langues</h2><p>Paires linguistiques traitées : <strong>{{langues}}</strong>.</p><h2>Article 2 – Délais</h2><p>Les délais de livraison sont convenus au cas par cas lors de chaque commande.</p><h2>Article 3 – Tarif</h2><p><strong>{{tarif_mot}}</strong> FCFA par mot ou par heure d'interprétation.</p><h2>Article 4 – Confidentialité</h2><p>Le prestataire s'engage à ne pas divulguer le contenu des documents traduits.</p><p>Signatures : _________________</p></div>`
  },
  {
    code: 'tel2_elearning_corporate',
    name: "Accord de Service de Formation à Distance (E-Learning Corporate)",
    category: 'rh_emploi', price: 5000, priceMax: 14000,
    description: "Contrat de prestation de formation professionnelle en ligne pour les entreprises souhaitant former leurs équipes à distance.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'entreprise_cliente', label:"Entreprise cliente", type:'text', required:true},
      {key:'organisme_formation', label:"Organisme de formation en ligne", type:'text', required:true},
      {key:'programme', label:"Programme de formation", type:'textarea', required:true},
      {key:'nombre_apprenants', label:"Nombre d'apprenants", type:'text', required:true},
      {key:'tarif_total', label:"Coût total de la formation (FCFA)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FORMATION À DISTANCE – E-LEARNING CORPORATE</h1><p>Accord entre <strong>{{organisme_formation}}</strong> et <strong>{{entreprise_cliente}}</strong>.</p><h2>Article 1 – Programme de formation</h2><p>{{programme}}</p><h2>Article 2 – Apprenants</h2><p>La formation est dispensée à <strong>{{nombre_apprenants}}</strong> apprenants désignés par l'entreprise cliente.</p><h2>Article 3 – Modalités</h2><p>La formation est dispensée 100% en ligne via la plateforme LMS de l'organisme.</p><h2>Article 4 – Coût</h2><p>Coût total : <strong>{{tarif_total}}</strong> FCFA, payable selon l'échéancier convenu.</p><p>Signatures : _________________</p></div>`
  },
  {
    code: 'tel2_helpdesk_distance',
    name: "Accord de Service d'Assistance Technique à Distance (Helpdesk)",
    category: 'rh_emploi', price: 4000, priceMax: 11000,
    description: "Contrat de prestation de support technique informatique à distance pour les entreprises.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'client', label:"Nom de l'entreprise cliente", type:'text', required:true},
      {key:'prestataire', label:"Nom du prestataire helpdesk", type:'text', required:true},
      {key:'perimetre', label:"Périmètre technique couvert", type:'textarea', required:true},
      {key:'sla', label:"Délai d'intervention garanti (SLA)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ASSISTANCE TECHNIQUE À DISTANCE – HELPDESK</h1><p>Accord entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Périmètre</h2><p>{{perimetre}}</p><h2>Article 2 – Niveau de service (SLA)</h2><p>Le prestataire s'engage à intervenir dans un délai de <strong>{{sla}}</strong> suivant l'ouverture d'un ticket.</p><h2>Article 3 – Canaux de support</h2><p>Support disponible par téléphone, email et chat en ligne pendant les heures ouvrables.</p><h2>Article 4 – Tarif</h2><p>Tarif forfaitaire mensuel convenu en annexe du présent accord.</p><p>Signatures : _________________</p></div>`
  },
  {
    code: 'tel2_rapport_performance',
    name: "Rapport de Performance Télétravail",
    category: 'rh_emploi', price: 2500, priceMax: 6000,
    description: "Modèle de rapport d'évaluation des performances d'un salarié en situation de télétravail.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'nom_salarie', label:"Nom du salarié", type:'text', required:true},
      {key:'periode', label:"Période d'évaluation", type:'text', required:true},
      {key:'objectifs_atteints', label:"Objectifs atteints", type:'textarea', required:true},
      {key:'axes_amelioration', label:"Axes d'amélioration identifiés", type:'textarea', required:false}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE TÉLÉTRAVAIL</h1><h2>Informations générales</h2><p>Salarié : <strong>{{nom_salarie}}</strong> | Période : <strong>{{periode}}</strong></p><h2>Objectifs atteints</h2><p>{{objectifs_atteints}}</p><h2>Axes d'amélioration</h2><p>{{axes_amelioration}}</p><h2>Recommandations</h2><p>Le manager formule ses recommandations pour la prochaine période d'évaluation.</p><p>Signé par le responsable hiérarchique : _________________</p></div>`
  },
  {
    code: 'tel2_plan_hybride',
    name: "Plan de Transition vers le Travail Hybride",
    category: 'rh_emploi', price: 4000, priceMax: 11000,
    description: "Document de planification de la transition d'une organisation vers un modèle de travail hybride (présentiel + distanciel).",
    templateType: 'pdf', classe: 'B', active: true, popularity: 74,
    fieldsJson: F([
      {key:'nom_entreprise', label:"Nom de l'entreprise", type:'text', required:true},
      {key:'modele_hybride', label:"Modèle hybride retenu (ex : 3j présentiel / 2j télétravail)", type:'text', required:true},
      {key:'date_transition', label:"Date cible de transition", type:'date', required:true},
      {key:'pilote', label:"Responsable du projet de transition", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE TRANSITION VERS LE TRAVAIL HYBRIDE</h1><p>Ce plan définit la feuille de route de <strong>{{nom_entreprise}}</strong> pour la mise en place du travail hybride.</p><h2>Article 1 – Modèle retenu</h2><p>Le modèle hybride adopté est : <strong>{{modele_hybride}}</strong>.</p><h2>Article 2 – Calendrier</h2><p>La transition est planifiée pour le <strong>{{date_transition}}</strong>.</p><h2>Article 3 – Responsable</h2><p>Le pilotage est confié à <strong>{{pilote}}</strong>.</p><h2>Article 4 – Étapes clés</h2><p>Phase 1 : Audit des postes éligibles. Phase 2 : Formation des managers. Phase 3 : Déploiement progressif. Phase 4 : Bilan et ajustements.</p><p>Approuvé par la Direction : _________________</p></div>`
  },
  {
    code: 'tel2_cybersecurite_salarie',
    name: "Accord de Service de Cybersécurité du Salarié en Télétravail",
    category: 'rh_emploi', price: 4500, priceMax: 12000,
    description: "Accord définissant les obligations et outils de cybersécurité mis en place pour protéger le salarié en télétravail.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'nom_salarie', label:"Nom du salarié", type:'text', required:true},
      {key:'outils_securite', label:"Outils de sécurité fournis (VPN, antivirus, etc.)", type:'textarea', required:true},
      {key:'formation_cyber', label:"Formation cybersécurité suivie", type:'text', required:true},
      {key:'date_signature', label:"Date de signature", type:'date', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CYBERSÉCURITÉ DU SALARIÉ EN TÉLÉTRAVAIL</h1><p>Le présent accord est conclu avec <strong>{{nom_salarie}}</strong> afin de garantir la sécurité informatique dans le cadre du télétravail.</p><h2>Article 1 – Outils de sécurité</h2><p>L'employeur fournit les outils suivants : {{outils_securite}}</p><h2>Article 2 – Formation</h2><p>Le salarié a suivi la formation : <strong>{{formation_cyber}}</strong>.</p><h2>Article 3 – Obligations du salarié</h2><p>Le salarié s'engage à utiliser uniquement les connexions sécurisées approuvées, à ne pas partager ses identifiants et à signaler tout incident de sécurité sans délai.</p><p>Signé le <strong>{{date_signature}}</strong>. Signatures : _________________</p></div>`
  },
  {
    code: 'tel2_management_distance',
    name: "Accord de Service de Management d'Équipes à Distance",
    category: 'rh_emploi', price: 4000, priceMax: 10000,
    description: "Accord de prestation de conseil et d'accompagnement pour le management d'équipes distribuées et le leadership à distance.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'entreprise', label:"Entreprise bénéficiaire", type:'text', required:true},
      {key:'consultant', label:"Consultant en management à distance", type:'text', required:true},
      {key:'programme', label:"Programme d'accompagnement", type:'textarea', required:true},
      {key:'duree', label:"Durée de la prestation", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MANAGEMENT D'ÉQUIPES À DISTANCE</h1><p>Accord entre <strong>{{consultant}}</strong> et <strong>{{entreprise}}</strong>.</p><h2>Article 1 – Programme</h2><p>{{programme}}</p><h2>Article 2 – Durée</h2><p>La prestation s'étend sur une durée de <strong>{{duree}}</strong>.</p><h2>Article 3 – Livrables</h2><p>À l'issue de la mission, le consultant remet un rapport de recommandations et un kit de management à distance personnalisé.</p><p>Signatures : _________________</p></div>`
  },
  {
    code: 'tel2_charte_responsable',
    name: "Charte du Télétravail Responsable",
    category: 'rh_emploi', price: 3000, priceMax: 8000,
    description: "Charte éthique du télétravail responsable précisant les engagements environnementaux, sociaux et de bien-être au travail.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'nom_entreprise', label:"Nom de l'entreprise", type:'text', required:true},
      {key:'valeurs', label:"Valeurs clés de l'entreprise", type:'textarea', required:true},
      {key:'date_adoption', label:"Date d'adoption", type:'date', required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DU TÉLÉTRAVAIL RESPONSABLE</h1><p><strong>{{nom_entreprise}}</strong> adopte la présente charte pour encadrer un télétravail éthique et durable.</p><h2>Nos valeurs</h2><p>{{valeurs}}</p><h2>Engagements environnementaux</h2><p>Réduire les déplacements domicile-travail, limiter l'empreinte numérique, encourager les équipements éco-responsables.</p><h2>Engagements sociaux</h2><p>Garantir l'inclusion de tous les salariés, soutenir l'équilibre vie professionnelle / vie personnelle, lutter contre l'isolement.</p><h2>Bien-être au travail</h2><p>Proposer un suivi psychologique, des ressources de formation et des activités de team building virtuel.</p><p>Adoptée le <strong>{{date_adoption}}</strong>. Signatures : _________________</p></div>`
  },

  // ── 25 Freelance / Portage salarial ─────────────────────────────────────
  {
    code: 'free_mission_consultant',
    name: "Contrat de Mission de Consultant Freelance",
    category: 'rh_emploi', price: 5000, priceMax: 14000,
    description: "Contrat de mission définissant les termes d'une prestation de conseil réalisée par un consultant indépendant.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 88,
    fieldsJson: F([
      {key:'nom_consultant', label:"Nom du consultant", type:'text', required:true},
      {key:'client', label:"Nom du client", type:'text', required:true},
      {key:'mission', label:"Description de la mission", type:'textarea', required:true},
      {key:'honoraires', label:"Honoraires HT (FCFA)", type:'text', required:true},
      {key:'duree', label:"Durée de la mission", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE MISSION DE CONSULTANT FREELANCE</h1><p>Accord entre <strong>{{client}}</strong> (client) et <strong>{{nom_consultant}}</strong> (consultant).</p><h2>Article 1 – Mission</h2><p>{{mission}}</p><h2>Article 2 – Durée</h2><p>La mission s'étend sur <strong>{{duree}}</strong>.</p><h2>Article 3 – Honoraires</h2><p>Les honoraires sont fixés à <strong>{{honoraires}}</strong> FCFA HT, payables sur présentation de facture.</p><h2>Article 4 – Statut</h2><p>Le consultant intervient en qualité de travailleur indépendant. Aucun lien de subordination n'est créé.</p><h2>Article 5 – Propriété intellectuelle</h2><p>Les livrables produits sont la propriété du client après règlement intégral des honoraires.</p><p>Signatures : _________________</p></div>`
  },
  {
    code: 'free_prestation_independant',
    name: "Contrat de Prestation de Service Indépendant",
    category: 'rh_emploi', price: 4000, priceMax: 11000,
    description: "Contrat cadre de prestation de service entre un prestataire indépendant et une entreprise ou particulier.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 85,
    fieldsJson: F([
      {key:'prestataire', label:"Nom du prestataire indépendant", type:'text', required:true},
      {key:'client', label:"Nom du client", type:'text', required:true},
      {key:'service', label:"Nature du service fourni", type:'textarea', required:true},
      {key:'tarif', label:"Tarif convenu (FCFA)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE PRESTATION DE SERVICE INDÉPENDANT</h1><p>Contrat entre <strong>{{client}}</strong> et <strong>{{prestataire}}</strong>.</p><h2>Article 1 – Objet</h2><p>{{service}}</p><h2>Article 2 – Tarif</h2><p><strong>{{tarif}}</strong> FCFA, selon modalités convenues entre les parties.</p><h2>Article 3 – Indépendance</h2><p>Le prestataire exerce son activité en toute indépendance et assume seul la responsabilité fiscale et sociale liée à son activité.</p><h2>Article 4 – Résiliation</h2><p>Résiliation possible par l'une ou l'autre des parties avec un préavis de 15 jours.</p><p>Signatures : _________________</p></div>`
  },
  {
    code: 'free_portage_salarial_consulte',
    name: "Accord de Portage Salarial (Consultant Porté)",
    category: 'rh_emploi', price: 5000, priceMax: 14000,
    description: "Convention tripartite de portage salarial entre la société de portage, le consultant porté et l'entreprise cliente, conforme au droit OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 80,
    fieldsJson: F([
      {key:'consultant_porte', label:"Nom du consultant porté", type:'text', required:true},
      {key:'societe_portage', label:"Nom de la société de portage", type:'text', required:true},
      {key:'entreprise_cliente', label:"Nom de l'entreprise cliente", type:'text', required:true},
      {key:'honoraires_mission', label:"Honoraires de la mission (FCFA HT)", type:'text', required:true},
      {key:'frais_portage', label:"Frais de gestion de portage (%)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PORTAGE SALARIAL</h1><p>Convention tripartite entre <strong>{{societe_portage}}</strong>, <strong>{{consultant_porte}}</strong> et <strong>{{entreprise_cliente}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le consultant porté réalise une mission pour l'entreprise cliente via la société de portage qui l'emploie en qualité de salarié porté.</p><h2>Article 2 – Honoraires et frais</h2><p>Honoraires de mission : <strong>{{honoraires_mission}}</strong> FCFA HT. Frais de portage : <strong>{{frais_portage}}</strong>% du chiffre d'affaires.</p><h2>Article 3 – Statut salarial</h2><p>La société de portage établit un contrat de travail avec le consultant, verse son salaire et assure les charges sociales.</p><h2>Article 4 – Droit applicable</h2><p>Le présent accord est soumis au droit OHADA et au Code du Travail ivoirien.</p><p>Signatures : _________________</p></div>`
  },
  {
    code: 'free_societe_portage',
    name: "Accord de Service de Société de Portage Salarial",
    category: 'rh_emploi', price: 4500, priceMax: 12000,
    description: "Contrat de service entre une société de portage salarial et un consultant indépendant souhaitant bénéficier du statut de salarié porté.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'societe_portage', label:"Nom de la société de portage", type:'text', required:true},
      {key:'consultant', label:"Nom du consultant", type:'text', required:true},
      {key:'ca_minimum', label:"Chiffre d'affaires minimum requis (FCFA)", type:'text', required:true},
      {key:'date_debut', label:"Date de début", type:'date', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SOCIÉTÉ DE PORTAGE SALARIAL</h1><p>Accord entre <strong>{{societe_portage}}</strong> et <strong>{{consultant}}</strong>.</p><h2>Article 1 – Engagement</h2><p>La société de portage s'engage à porter le consultant, à gérer sa facturation, ses charges sociales et à lui verser un salaire.</p><h2>Article 2 – Chiffre d'affaires minimum</h2><p>Le consultant s'engage à générer un chiffre d'affaires minimum de <strong>{{ca_minimum}}</strong> FCFA par mois.</p><h2>Article 3 – Date de démarrage</h2><p>Le partenariat débute le <strong>{{date_debut}}</strong>.</p><h2>Article 4 – Résiliation</h2><p>Résiliable par l'une ou l'autre des parties avec un préavis d'un mois.</p><p>Signatures : _________________</p></div>`
  },
  {
    code: 'free_conseil_strategie',
    name: "Accord de Mission de Conseil en Stratégie (Freelance)",
    category: 'rh_emploi', price: 6000, priceMax: 16000,
    description: "Contrat de mission de conseil stratégique réalisé par un consultant indépendant pour le compte d'une entreprise.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 78,
    fieldsJson: F([
      {key:'consultant', label:"Nom du consultant stratégie", type:'text', required:true},
      {key:'client', label:"Nom de l'entreprise cliente", type:'text', required:true},
      {key:'perimetre', label:"Périmètre de la mission stratégique", type:'textarea', required:true},
      {key:'livrables', label:"Livrables attendus", type:'textarea', required:true},
      {key:'honoraires', label:"Honoraires totaux (FCFA HT)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE MISSION DE CONSEIL EN STRATÉGIE</h1><p>Accord entre <strong>{{consultant}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Périmètre</h2><p>{{perimetre}}</p><h2>Article 2 – Livrables</h2><p>{{livrables}}</p><h2>Article 3 – Honoraires</h2><p><strong>{{honoraires}}</strong> FCFA HT.</p><h2>Article 4 – Confidentialité</h2><p>Le consultant s'engage à une stricte confidentialité sur toutes les informations auxquelles il aura accès dans le cadre de la mission.</p><p>Signatures : _________________</p></div>`
  },
  {
    code: 'free_dev_web',
    name: "Accord de Mission de Développeur Web Freelance",
    category: 'rh_emploi', price: 4500, priceMax: 12000,
    description: "Contrat de mission de développement web et applicatif conclu avec un développeur freelance.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 86,
    fieldsJson: F([
      {key:'developpeur', label:"Nom du développeur", type:'text', required:true},
      {key:'client', label:"Nom du client", type:'text', required:true},
      {key:'projet', label:"Description du projet (technologies, fonctionnalités)", type:'textarea', required:true},
      {key:'delai', label:"Délai de livraison", type:'text', required:true},
      {key:'budget', label:"Budget total (FCFA HT)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE MISSION DE DÉVELOPPEUR WEB FREELANCE</h1><p>Mission confiée par <strong>{{client}}</strong> à <strong>{{developpeur}}</strong>.</p><h2>Article 1 – Projet</h2><p>{{projet}}</p><h2>Article 2 – Délai</h2><p>Livraison prévue dans un délai de <strong>{{delai}}</strong> à compter de la signature.</p><h2>Article 3 – Budget</h2><p><strong>{{budget}}</strong> FCFA HT, versé selon l'échéancier convenu (acompte + solde à la livraison).</p><h2>Article 4 – Recette</h2><p>Le client dispose de 10 jours ouvrables pour valider ou émettre des réserves à la livraison.</p><p>Signatures : _________________</p></div>`
  },
  {
    code: 'free_designer_graphique',
    name: "Accord de Mission de Designer Graphique Freelance",
    category: 'rh_emploi', price: 3500, priceMax: 9000,
    description: "Contrat de mission de création graphique entre un designer indépendant et son client.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 80,
    fieldsJson: F([
      {key:'designer', label:"Nom du designer", type:'text', required:true},
      {key:'client', label:"Nom du client", type:'text', required:true},
      {key:'prestations', label:"Prestations graphiques commandées", type:'textarea', required:true},
      {key:'honoraires', label:"Honoraires (FCFA HT)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE MISSION DE DESIGNER GRAPHIQUE FREELANCE</h1><p>Mission confiée par <strong>{{client}}</strong> à <strong>{{designer}}</strong>.</p><h2>Article 1 – Prestations</h2><p>{{prestations}}</p><h2>Article 2 – Honoraires</h2><p><strong>{{honoraires}}</strong> FCFA HT.</p><h2>Article 3 – Droits d'auteur</h2><p>Les droits de reproduction et d'exploitation des créations sont cédés au client pour l'usage défini à la commande, après règlement intégral.</p><h2>Article 4 – Révisions</h2><p>Deux (2) rounds de modifications sont inclus dans les honoraires.</p><p>Signatures : _________________</p></div>`
  },
  {
    code: 'free_redacteur_traducteur',
    name: "Accord de Mission de Rédacteur-Traducteur Freelance",
    category: 'rh_emploi', price: 3000, priceMax: 8000,
    description: "Contrat de mission de rédaction de contenus et/ou traduction entre un rédacteur indépendant et son client.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 74,
    fieldsJson: F([
      {key:'redacteur', label:"Nom du rédacteur-traducteur", type:'text', required:true},
      {key:'client', label:"Nom du client", type:'text', required:true},
      {key:'commande', label:"Description de la commande (sujet, longueur, langue)", type:'textarea', required:true},
      {key:'tarif_mot', label:"Tarif au mot ou forfait (FCFA)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE MISSION DE RÉDACTEUR-TRADUCTEUR FREELANCE</h1><p>Accord entre <strong>{{client}}</strong> et <strong>{{redacteur}}</strong>.</p><h2>Article 1 – Commande</h2><p>{{commande}}</p><h2>Article 2 – Tarif</h2><p><strong>{{tarif_mot}}</strong> FCFA.</p><h2>Article 3 – Droits</h2><p>Les contenus rédigés sont cédés au client après règlement intégral. Le rédacteur se réserve le droit de mentionner cette mission dans son portfolio.</p><h2>Article 4 – Délais</h2><p>Les délais de livraison sont définis commande par commande.</p><p>Signatures : _________________</p></div>`
  },
  {
    code: 'free_chef_projet',
    name: "Accord de Mission de Chef de Projet Freelance",
    category: 'rh_emploi', price: 5500, priceMax: 15000,
    description: "Contrat de mission d'un chef de projet indépendant chargé de piloter un projet pour le compte d'une entreprise.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 82,
    fieldsJson: F([
      {key:'chef_projet', label:"Nom du chef de projet", type:'text', required:true},
      {key:'client', label:"Nom de l'entreprise cliente", type:'text', required:true},
      {key:'projet', label:"Description du projet à piloter", type:'textarea', required:true},
      {key:'taux_jour', label:"Taux journalier moyen (TJM, FCFA HT)", type:'text', required:true},
      {key:'duree', label:"Durée estimée de la mission (jours)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE MISSION DE CHEF DE PROJET FREELANCE</h1><p>Mission de pilotage confiée par <strong>{{client}}</strong> à <strong>{{chef_projet}}</strong>.</p><h2>Article 1 – Projet</h2><p>{{projet}}</p><h2>Article 2 – Tarif</h2><p>TJM : <strong>{{taux_jour}}</strong> FCFA HT. Durée estimée : <strong>{{duree}}</strong> jours.</p><h2>Article 3 – Responsabilités</h2><p>Le chef de projet assure la planification, le suivi budgétaire, la coordination des équipes et le reporting au commanditaire.</p><h2>Article 4 – Indépendance</h2><p>Le chef de projet intervient en qualité d'indépendant, sans lien de subordination avec le client.</p><p>Signatures : _________________</p></div>`
  },
  {
    code: 'free_formateur',
    name: "Accord de Mission de Formateur Freelance",
    category: 'rh_emploi', price: 4000, priceMax: 11000,
    description: "Contrat de mission d'un formateur indépendant pour la dispense d'une formation professionnelle.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 77,
    fieldsJson: F([
      {key:'formateur', label:"Nom du formateur", type:'text', required:true},
      {key:'client', label:"Organisme ou entreprise cliente", type:'text', required:true},
      {key:'intitule_formation', label:"Intitulé de la formation", type:'text', required:true},
      {key:'nombre_heures', label:"Nombre d'heures de formation", type:'text', required:true},
      {key:'taux_horaire', label:"Taux horaire (FCFA HT)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE MISSION DE FORMATEUR FREELANCE</h1><p>Mission confiée par <strong>{{client}}</strong> à <strong>{{formateur}}</strong>.</p><h2>Article 1 – Formation</h2><p>Intitulé : <strong>{{intitule_formation}}</strong>. Durée : <strong>{{nombre_heures}}</strong> heures.</p><h2>Article 2 – Tarif</h2><p>Taux horaire : <strong>{{taux_horaire}}</strong> FCFA HT.</p><h2>Article 3 – Contenus pédagogiques</h2><p>Le formateur fournit les supports pédagogiques. Les droits de reproduction des contenus restent sa propriété sauf accord contraire.</p><h2>Article 4 – Évaluation</h2><p>Une évaluation de la satisfaction des apprenants est réalisée à l'issue de chaque session.</p><p>Signatures : _________________</p></div>`
  },
  {
    code: 'free_coach',
    name: "Accord de Mission de Coach Freelance",
    category: 'rh_emploi', price: 4000, priceMax: 11000,
    description: "Contrat de mission de coaching professionnel ou de vie entre un coach certifié indépendant et son client.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 74,
    fieldsJson: F([
      {key:'coach', label:"Nom du coach", type:'text', required:true},
      {key:'coache', label:"Nom du coaché (individu ou entreprise)", type:'text', required:true},
      {key:'objectif', label:"Objectif de l'accompagnement", type:'textarea', required:true},
      {key:'nombre_seances', label:"Nombre de séances prévues", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE MISSION DE COACHING FREELANCE</h1><p>Accord entre <strong>{{coach}}</strong> (coach) et <strong>{{coache}}</strong> (coaché).</p><h2>Article 1 – Objectif</h2><p>{{objectif}}</p><h2>Article 2 – Programme</h2><p>Le programme comprend <strong>{{nombre_seances}}</strong> séances de coaching individuel ou collectif.</p><h2>Article 3 – Confidentialité</h2><p>Le coach s'engage à la plus stricte confidentialité sur les échanges et informations partagés pendant les séances.</p><h2>Article 4 – Code déontologique</h2><p>Le coach respecte le code déontologique de sa certification professionnelle (ICF, EMCC ou équivalent).</p><p>Signatures : _________________</p></div>`
  },
  {
    code: 'free_photo_video',
    name: "Accord de Mission de Photographe-Vidéaste Freelance",
    category: 'rh_emploi', price: 3500, priceMax: 10000,
    description: "Contrat de mission pour une prestation photo et/ou vidéo réalisée par un photographe ou vidéaste indépendant.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 79,
    fieldsJson: F([
      {key:'photographe', label:"Nom du photographe-vidéaste", type:'text', required:true},
      {key:'client', label:"Nom du client", type:'text', required:true},
      {key:'evenement', label:"Description de l'événement / prestation", type:'textarea', required:true},
      {key:'date_prestation', label:"Date de la prestation", type:'date', required:true},
      {key:'honoraires', label:"Honoraires (FCFA HT)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE MISSION DE PHOTOGRAPHE-VIDÉASTE FREELANCE</h1><p>Accord entre <strong>{{photographe}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Prestation</h2><p>{{evenement}}</p><h2>Article 2 – Date</h2><p><strong>{{date_prestation}}</strong>.</p><h2>Article 3 – Honoraires</h2><p><strong>{{honoraires}}</strong> FCFA HT. Un acompte de 50% est versé à la signature.</p><h2>Article 4 – Droits d'image</h2><p>Les fichiers bruts restent la propriété du photographe. Les fichiers livrés retouchés sont cédés au client pour l'usage défini à la commande.</p><p>Signatures : _________________</p></div>`
  },
  {
    code: 'free_social_media',
    name: "Accord de Mission de Social Media Manager",
    category: 'rh_emploi', price: 3500, priceMax: 9000,
    description: "Contrat de mission de gestion des réseaux sociaux entre un social media manager freelance et son client.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 82,
    fieldsJson: F([
      {key:'smm', label:"Nom du social media manager", type:'text', required:true},
      {key:'client', label:"Nom du client / entreprise", type:'text', required:true},
      {key:'reseaux', label:"Réseaux sociaux gérés", type:'text', required:true},
      {key:'publications_mois', label:"Nombre de publications par mois", type:'text', required:true},
      {key:'tarif_mensuel', label:"Tarif mensuel (FCFA HT)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE MISSION DE SOCIAL MEDIA MANAGER</h1><p>Accord entre <strong>{{smm}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Périmètre</h2><p>Réseaux gérés : <strong>{{reseaux}}</strong>. Volume : <strong>{{publications_mois}}</strong> publications par mois.</p><h2>Article 2 – Tarif</h2><p><strong>{{tarif_mensuel}}</strong> FCFA HT par mois.</p><h2>Article 3 – Reporting</h2><p>Un rapport mensuel de performance (portée, engagement, croissance) est fourni au client.</p><h2>Article 4 – Accès</h2><p>Le client fournit les accès nécessaires aux comptes et les éléments de charte graphique.</p><p>Signatures : _________________</p></div>`
  },
  {
    code: 'free_auditeur',
    name: "Accord de Mission d'Auditeur Freelance",
    category: 'rh_emploi', price: 6000, priceMax: 16000,
    description: "Contrat de mission d'audit (financier, organisationnel ou technique) réalisé par un auditeur indépendant.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 75,
    fieldsJson: F([
      {key:'auditeur', label:"Nom de l'auditeur", type:'text', required:true},
      {key:'client', label:"Nom de l'entité auditée", type:'text', required:true},
      {key:'type_audit', label:"Type d'audit (financier, organisationnel, etc.)", type:'text', required:true},
      {key:'periode_auditee', label:"Période auditée", type:'text', required:true},
      {key:'honoraires', label:"Honoraires (FCFA HT)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE MISSION D'AUDITEUR FREELANCE</h1><p>Mission confiée par <strong>{{client}}</strong> à <strong>{{auditeur}}</strong>.</p><h2>Article 1 – Nature de la mission</h2><p>Type : <strong>{{type_audit}}</strong>. Période auditée : <strong>{{periode_auditee}}</strong>.</p><h2>Article 2 – Livrables</h2><p>Rapport d'audit avec conclusions et recommandations, remis à l'issue de la mission.</p><h2>Article 3 – Honoraires</h2><p><strong>{{honoraires}}</strong> FCFA HT.</p><h2>Article 4 – Indépendance</h2><p>L'auditeur atteste de son indépendance à l'égard de l'entité auditée conformément aux normes IFAC.</p><p>Signatures : _________________</p></div>`
  },
  {
    code: 'free_juriste_consultant',
    name: "Accord de Mission de Juriste Consultant Externe",
    category: 'rh_emploi', price: 6000, priceMax: 16000,
    description: "Contrat de mission de conseil juridique réalisé par un juriste indépendant externe pour le compte d'une entreprise.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 80,
    fieldsJson: F([
      {key:'juriste', label:"Nom du juriste consultant", type:'text', required:true},
      {key:'client', label:"Nom de l'entreprise cliente", type:'text', required:true},
      {key:'domaine', label:"Domaine juridique concerné", type:'text', required:true},
      {key:'mission', label:"Description de la mission juridique", type:'textarea', required:true},
      {key:'honoraires', label:"Honoraires (FCFA HT)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE MISSION DE JURISTE CONSULTANT EXTERNE</h1><p>Accord entre <strong>{{juriste}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Domaine</h2><p><strong>{{domaine}}</strong>.</p><h2>Article 2 – Mission</h2><p>{{mission}}</p><h2>Article 3 – Honoraires</h2><p><strong>{{honoraires}}</strong> FCFA HT.</p><h2>Article 4 – Secret professionnel</h2><p>Le juriste est soumis au secret professionnel sur toutes les informations recueillies dans le cadre de sa mission.</p><h2>Article 5 – Statut</h2><p>Le juriste intervient en qualité d'indépendant. Il ne représente pas le client en justice, sauf habilitation spécifique.</p><p>Signatures : _________________</p></div>`
  },
  {
    code: 'free_plateforme_mise_relation',
    name: "Accord de Service de Plateforme de Mise en Relation Freelance",
    category: 'rh_emploi', price: 3000, priceMax: 8000,
    description: "Conditions générales d'utilisation et contrat d'adhésion à une plateforme de mise en relation entre freelances et clients.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'plateforme', label:"Nom de la plateforme", type:'text', required:true},
      {key:'utilisateur', label:"Nom du freelance ou client utilisateur", type:'text', required:true},
      {key:'commission', label:"Commission prélevée par la plateforme (%)", type:'text', required:true},
      {key:'date_adhesion', label:"Date d'adhésion", type:'date', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D'UTILISATION DE PLATEFORME DE MISE EN RELATION FREELANCE</h1><p>Accord entre <strong>{{plateforme}}</strong> et <strong>{{utilisateur}}</strong>.</p><h2>Article 1 – Service</h2><p>La plateforme met en relation freelances et clients. Elle ne devient pas partie aux contrats conclus entre eux.</p><h2>Article 2 – Commission</h2><p>Une commission de <strong>{{commission}}</strong>% est prélevée sur chaque transaction réalisée via la plateforme.</p><h2>Article 3 – Responsabilité</h2><p>La plateforme n'est pas responsable de l'exécution des missions. Elle fournit uniquement un service d'intermédiation.</p><p>Adhésion le <strong>{{date_adhesion}}</strong>. Signatures : _________________</p></div>`
  },
  {
    code: 'free_gestion_administrative',
    name: "Accord de Service de Gestion Administrative du Freelance (Comptabilité)",
    category: 'rh_emploi', price: 3500, priceMax: 9000,
    description: "Contrat de service de gestion administrative et comptable d'un travailleur indépendant par un cabinet ou prestataire spécialisé.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'freelance', label:"Nom du freelance", type:'text', required:true},
      {key:'cabinet', label:"Nom du cabinet comptable / prestataire", type:'text', required:true},
      {key:'services', label:"Services inclus (facturation, déclarations, etc.)", type:'textarea', required:true},
      {key:'tarif_mensuel', label:"Tarif mensuel (FCFA HT)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE GESTION ADMINISTRATIVE DU FREELANCE</h1><p>Accord entre <strong>{{cabinet}}</strong> et <strong>{{freelance}}</strong>.</p><h2>Article 1 – Services</h2><p>{{services}}</p><h2>Article 2 – Tarif</h2><p><strong>{{tarif_mensuel}}</strong> FCFA HT par mois.</p><h2>Article 3 – Obligations du freelance</h2><p>Le freelance s'engage à transmettre tous les justificatifs comptables dans les délais convenus.</p><h2>Article 4 – Responsabilité</h2><p>Le prestataire est responsable de la conformité des déclarations qu'il établit au nom du freelance.</p><p>Signatures : _________________</p></div>`
  },
  {
    code: 'free_rc_pro',
    name: "Accord de Service d'Assurance Responsabilité Civile Professionnelle Freelance",
    category: 'rh_emploi', price: 3000, priceMax: 7000,
    description: "Contrat de souscription à une assurance responsabilité civile professionnelle pour travailleur indépendant.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'assure', label:"Nom de l'assuré (freelance)", type:'text', required:true},
      {key:'assureur', label:"Nom de la compagnie d'assurance", type:'text', required:true},
      {key:'activite', label:"Activité professionnelle couverte", type:'text', required:true},
      {key:'plafond', label:"Plafond de garantie (FCFA)", type:'text', required:true},
      {key:'prime_annuelle', label:"Prime annuelle (FCFA)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D'ASSURANCE RESPONSABILITÉ CIVILE PROFESSIONNELLE FREELANCE</h1><p>Contrat entre <strong>{{assureur}}</strong> et <strong>{{assure}}</strong>.</p><h2>Article 1 – Objet</h2><p>L'assureur couvre la responsabilité civile professionnelle du freelance dans l'exercice de son activité de <strong>{{activite}}</strong>.</p><h2>Article 2 – Plafond de garantie</h2><p>Le plafond de garantie est fixé à <strong>{{plafond}}</strong> FCFA par sinistre.</p><h2>Article 3 – Prime</h2><p>Prime annuelle : <strong>{{prime_annuelle}}</strong> FCFA, payable à l'échéance annuelle.</p><h2>Article 4 – Exclusions</h2><p>Sont exclus de la garantie : les fautes intentionnelles, les sanctions pénales et les amendes.</p><p>Signatures : _________________</p></div>`
  },
  {
    code: 'free_prevoyance_independant',
    name: "Accord de Service de Prévoyance Travailleur Indépendant",
    category: 'rh_emploi', price: 3000, priceMax: 7000,
    description: "Contrat de prévoyance couvrant les risques d'incapacité, d'invalidité et de décès pour un travailleur indépendant.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'assure', label:"Nom de l'assuré", type:'text', required:true},
      {key:'assureur', label:"Compagnie d'assurance", type:'text', required:true},
      {key:'garanties', label:"Garanties souscrites (incapacité, invalidité, décès)", type:'textarea', required:true},
      {key:'cotisation_mensuelle', label:"Cotisation mensuelle (FCFA)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PRÉVOYANCE TRAVAILLEUR INDÉPENDANT</h1><p>Contrat entre <strong>{{assureur}}</strong> et <strong>{{assure}}</strong>.</p><h2>Article 1 – Garanties</h2><p>{{garanties}}</p><h2>Article 2 – Cotisation</h2><p>Cotisation mensuelle : <strong>{{cotisation_mensuelle}}</strong> FCFA.</p><h2>Article 3 – Prestations</h2><p>En cas de sinistre garanti, l'assureur verse les indemnités prévues au contrat dans les délais réglementaires.</p><p>Signatures : _________________</p></div>`
  },
  {
    code: 'free_mutuelle_sante',
    name: "Accord de Service de Mutuelle Santé Travailleur Indépendant",
    category: 'rh_emploi', price: 3000, priceMax: 7000,
    description: "Contrat d'adhésion à une mutuelle santé pour travailleur indépendant ou freelance en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'adherent', label:"Nom de l'adhérent", type:'text', required:true},
      {key:'mutuelle', label:"Nom de la mutuelle", type:'text', required:true},
      {key:'formule', label:"Formule souscrite (de base, confort, premium)", type:'text', required:true},
      {key:'cotisation_mensuelle', label:"Cotisation mensuelle (FCFA)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D'ADHÉSION À UNE MUTUELLE SANTÉ – TRAVAILLEUR INDÉPENDANT</h1><p>Contrat entre <strong>{{mutuelle}}</strong> et <strong>{{adherent}}</strong>.</p><h2>Article 1 – Formule</h2><p><strong>{{formule}}</strong>.</p><h2>Article 2 – Cotisation</h2><p>Cotisation mensuelle : <strong>{{cotisation_mensuelle}}</strong> FCFA.</p><h2>Article 3 – Prestations</h2><p>Remboursement des frais médicaux, hospitaliers et pharmaceutiques selon le tableau de garanties annexé au présent contrat.</p><h2>Article 4 – Résiliation</h2><p>Résiliable à l'échéance annuelle avec préavis de 2 mois.</p><p>Signatures : _________________</p></div>`
  },
  {
    code: 'free_stage_longue_duree',
    name: "Accord de Convention de Stage Longue Durée (Étudiant)",
    category: 'rh_emploi', price: 3000, priceMax: 8000,
    description: "Convention de stage de longue durée (plus de 3 mois) encadrant les conditions d'accueil d'un étudiant en entreprise.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 76,
    fieldsJson: F([
      {key:'etudiant', label:"Nom de l'étudiant", type:'text', required:true},
      {key:'etablissement', label:"Établissement de formation", type:'text', required:true},
      {key:'entreprise', label:"Entreprise d'accueil", type:'text', required:true},
      {key:'date_debut', label:"Date de début du stage", type:'date', required:true},
      {key:'date_fin', label:"Date de fin du stage", type:'date', required:true},
      {key:'gratification', label:"Montant de la gratification mensuelle (FCFA)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>CONVENTION DE STAGE LONGUE DURÉE</h1><p>Convention tripartite entre <strong>{{etablissement}}</strong>, <strong>{{entreprise}}</strong> et <strong>{{etudiant}}</strong>.</p><h2>Article 1 – Objet</h2><p>La présente convention encadre un stage de longue durée du <strong>{{date_debut}}</strong> au <strong>{{date_fin}}</strong>.</p><h2>Article 2 – Gratification</h2><p>Gratification mensuelle : <strong>{{gratification}}</strong> FCFA.</p><h2>Article 3 – Encadrement</h2><p>L'étudiant est suivi par un tuteur entreprise et un référent académique tout au long du stage.</p><h2>Article 4 – Rapport de stage</h2><p>Un rapport de stage est remis à l'établissement à l'issue de la période.</p><p>Signatures des trois parties : _________________</p></div>`
  },
  {
    code: 'free_accompagnement_creation',
    name: "Accord de Service d'Accompagnement à la Création d'Entreprise",
    category: 'rh_emploi', price: 4000, priceMax: 11000,
    description: "Contrat de prestation d'accompagnement à la création d'entreprise pour entrepreneur et freelance souhaitant se formaliser.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 73,
    fieldsJson: F([
      {key:'entrepreneur', label:"Nom de l'entrepreneur", type:'text', required:true},
      {key:'structure_accompagnement', label:"Structure d'accompagnement", type:'text', required:true},
      {key:'programme', label:"Programme d'accompagnement", type:'textarea', required:true},
      {key:'duree', label:"Durée de l'accompagnement", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D'ACCOMPAGNEMENT À LA CRÉATION D'ENTREPRISE</h1><p>Accord entre <strong>{{structure_accompagnement}}</strong> et <strong>{{entrepreneur}}</strong>.</p><h2>Article 1 – Programme</h2><p>{{programme}}</p><h2>Article 2 – Durée</h2><p><strong>{{duree}}</strong>.</p><h2>Article 3 – Engagements de l'accompagnateur</h2><p>Conseils en création d'entreprise, aide à la rédaction du business plan, mise en réseau, orientation vers les financements disponibles.</p><h2>Article 4 – Engagements de l'entrepreneur</h2><p>Participation active aux ateliers, transmission des documents requis et respect du calendrier convenu.</p><p>Signatures : _________________</p></div>`
  },
  {
    code: 'free_rapport_performance',
    name: "Rapport de Performance Consultant Freelance",
    category: 'rh_emploi', price: 2500, priceMax: 6000,
    description: "Modèle de rapport d'évaluation de la performance d'un consultant freelance à l'issue d'une mission.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 64,
    fieldsJson: F([
      {key:'consultant', label:"Nom du consultant", type:'text', required:true},
      {key:'client', label:"Nom du client", type:'text', required:true},
      {key:'mission', label:"Intitulé de la mission", type:'text', required:true},
      {key:'evaluation_globale', label:"Évaluation globale (sur 10)", type:'text', required:true},
      {key:'commentaires', label:"Commentaires et recommandations", type:'textarea', required:false}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE – CONSULTANT FREELANCE</h1><p>Évaluation de <strong>{{consultant}}</strong> par <strong>{{client}}</strong> pour la mission : <strong>{{mission}}</strong>.</p><h2>Note globale</h2><p><strong>{{evaluation_globale}}</strong> / 10.</p><h2>Commentaires</h2><p>{{commentaires}}</p><h2>Critères évalués</h2><p>Qualité des livrables, respect des délais, communication, expertise technique, valeur ajoutée.</p><p>Signé par le client : _________________</p></div>`
  },
  {
    code: 'free_plan_carriere_independante',
    name: "Plan de Développement de Carrière Indépendante",
    category: 'rh_emploi', price: 3000, priceMax: 8000,
    description: "Document de planification stratégique pour le développement de la carrière d'un travailleur indépendant ou freelance.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'freelance', label:"Nom du freelance", type:'text', required:true},
      {key:'domaine_expertise', label:"Domaine d'expertise principal", type:'text', required:true},
      {key:'objectifs_1an', label:"Objectifs à 1 an", type:'textarea', required:true},
      {key:'objectifs_3ans', label:"Objectifs à 3 ans", type:'textarea', required:false}
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT DE CARRIÈRE INDÉPENDANTE</h1><p>Plan élaboré par <strong>{{freelance}}</strong>, expert en <strong>{{domaine_expertise}}</strong>.</p><h2>Objectifs à 1 an</h2><p>{{objectifs_1an}}</p><h2>Objectifs à 3 ans</h2><p>{{objectifs_3ans}}</p><h2>Actions prioritaires</h2><p>Formation continue, développement du réseau professionnel, diversification des sources de revenus, construction de la marque personnelle.</p><h2>Indicateurs de succès</h2><p>Chiffre d'affaires cible, nombre de clients récurrents, notoriété dans le domaine.</p></div>`
  },
  {
    code: 'free_charte_professionnelle',
    name: "Charte du Freelance Professionnel en Afrique",
    category: 'rh_emploi', price: 2500, priceMax: 6000,
    description: "Charte éthique et professionnelle définissant les engagements et valeurs du freelance exerçant en Afrique francophone.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'freelance', label:"Nom du freelance signataire", type:'text', required:true},
      {key:'domaine', label:"Domaine d'activité", type:'text', required:true},
      {key:'date_signature', label:"Date de signature", type:'date', required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DU FREELANCE PROFESSIONNEL EN AFRIQUE</h1><p>Je soussigné(e) <strong>{{freelance}}</strong>, freelance en <strong>{{domaine}}</strong>, adhère à la présente charte.</p><h2>Engagement 1 – Excellence professionnelle</h2><p>Je m'engage à délivrer des prestations de qualité, à respecter les délais et à maintenir un haut niveau de compétence par la formation continue.</p><h2>Engagement 2 – Intégrité et éthique</h2><p>Je refuse tout conflit d'intérêts, toute pratique déloyale et tout manquement au secret professionnel.</p><h2>Engagement 3 – Responsabilité sociale</h2><p>Je contribue au développement du tissu économique local, accompagne les jeunes talents et promeut le freelancing comme vecteur de développement en Afrique.</h2><h2>Engagement 4 – Respect de la légalité</h2><p>Je m'acquitte de mes obligations fiscales et sociales conformément au droit en vigueur dans mon pays d'exercice.</p><p>Signé le <strong>{{date_signature}}</strong>. Signature : _________________</p></div>`
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
  console.log(`Batch 76a OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
