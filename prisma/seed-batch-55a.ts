import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ─── HÔTELLERIE (25 templates) ───────────────────────────────────────────
  {
    code: 'hotel_contrat_direction',
    name: "Contrat de Direction Hôtelière",
    category: 'commercial_financier',
    price: 12000,
    priceMax: 40000,
    description: "Contrat encadrant la mission et les responsabilités du directeur d'hôtel, incluant objectifs de performance, rémunération et clause de non-concurrence, conforme au droit OHADA.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 80,
    fieldsJson: F([
      {key:'nom_directeur', label:"Nom complet du directeur", type:'text', required:true},
      {key:'nom_hotel', label:"Dénomination de l'hôtel", type:'text', required:true},
      {key:'date_prise_poste', label:"Date de prise de poste", type:'date', required:true},
      {key:'salaire_mensuel', label:"Salaire mensuel brut (FCFA)", type:'text', required:true},
      {key:'objectifs_annuels', label:"Objectifs annuels assignés", type:'textarea', required:true},
      {key:'duree_preavis', label:"Durée du préavis (mois)", type:'text', required:false},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE DIRECTION HÔTELIÈRE</h1>
<p>Entre la société exploitante de <strong>{{nom_hotel}}</strong>, ci-après dénommée <em>l'Employeur</em>,</p>
<p>et Monsieur / Madame <strong>{{nom_directeur}}</strong>, ci-après dénommé(e) <em>le Directeur</em>,</p>
<h2>Article 1 – Prise de fonctions</h2>
<p>Le Directeur prend ses fonctions le <strong>{{date_prise_poste}}</strong> en qualité de Directeur Général de l'établissement.</p>
<h2>Article 2 – Rémunération</h2>
<p>Le salaire mensuel brut est fixé à <strong>{{salaire_mensuel}} FCFA</strong>, auquel s'ajoutent les avantages en nature définis en annexe.</p>
<h2>Article 3 – Objectifs de performance</h2>
<p>{{objectifs_annuels}}</p>
<h2>Article 4 – Préavis</h2>
<p>En cas de rupture du contrat, un préavis de <strong>{{duree_preavis}} mois</strong> est requis de part et d'autre.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Le présent contrat est régi par le droit OHADA et la législation du travail en vigueur en Côte d'Ivoire.</p>
<p style="margin-top:40px">Fait à Abidjan, le ____________________</p>
<p>Signature Employeur : ____________________&nbsp;&nbsp;&nbsp;Signature Directeur : ____________________</p></div>`
  },
  {
    code: 'hotel_contrat_gestion',
    name: "Contrat de Gestion Hôtelière (Management)",
    category: 'commercial_financier',
    price: 15000,
    priceMax: 50000,
    description: "Contrat de management confiant la gestion opérationnelle d'un hôtel à une société spécialisée, avec répartition des revenus, indicateurs KPI et durée de mission.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 75,
    fieldsJson: F([
      {key:'proprietaire', label:"Nom du propriétaire / bailleur", type:'text', required:true},
      {key:'societe_gestion', label:"Société de gestion hôtelière", type:'text', required:true},
      {key:'nom_hotel', label:"Nom de l'hôtel", type:'text', required:true},
      {key:'duree_contrat', label:"Durée du contrat de gestion (années)", type:'text', required:true},
      {key:'honoraires_gestion', label:"Honoraires de gestion (% du CA)", type:'text', required:true},
      {key:'date_debut', label:"Date de début de la mission", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE GESTION HÔTELIÈRE</h1>
<p><strong>Propriétaire :</strong> {{proprietaire}}</p>
<p><strong>Société de gestion :</strong> {{societe_gestion}}</p>
<p><strong>Établissement concerné :</strong> {{nom_hotel}}</p>
<h2>Article 1 – Objet</h2>
<p>Le Propriétaire confie à la Société de Gestion la direction et l'exploitation complète de l'hôtel {{nom_hotel}} à compter du {{date_debut}}.</p>
<h2>Article 2 – Durée</h2>
<p>Le présent contrat est conclu pour une durée de <strong>{{duree_contrat}} ans</strong>, renouvelable par tacite reconduction.</p>
<h2>Article 3 – Honoraires</h2>
<p>La Société de Gestion percevra des honoraires de <strong>{{honoraires_gestion}} %</strong> du chiffre d'affaires hors taxes réalisé mensuellement.</p>
<h2>Article 4 – Obligations des parties</h2>
<p>La Société de Gestion s'engage à maintenir un taux d'occupation conforme aux standards du marché et à soumettre un rapport mensuel de performance.</p>
<p style="margin-top:40px">Signatures : ____________________</p></div>`
  },
  {
    code: 'hotel_accord_franchise',
    name: "Accord de Franchise Hôtelière Internationale",
    category: 'commercial_financier',
    price: 18000,
    priceMax: 60000,
    description: "Accord encadrant la licence d'exploitation d'une marque hôtelière internationale en Afrique de l'Ouest, incluant redevances, standards de marque et formation.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 70,
    fieldsJson: F([
      {key:'franchiseur', label:"Franchiseur (enseigne internationale)", type:'text', required:true},
      {key:'franchisé', label:"Franchisé (exploitant local)", type:'text', required:true},
      {key:'nom_hotel', label:"Nom de l'hôtel franchisé", type:'text', required:true},
      {key:'redevance_initiale', label:"Droit d'entrée franchise (FCFA)", type:'text', required:true},
      {key:'redevance_annuelle', label:"Redevance annuelle (% du CA)", type:'text', required:true},
      {key:'duree_franchise', label:"Durée de la franchise (années)", type:'text', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE FRANCHISE HÔTELIÈRE INTERNATIONALE</h1>
<p><strong>Franchiseur :</strong> {{franchiseur}}</p>
<p><strong>Franchisé :</strong> {{franchisé}}</p>
<p><strong>Hôtel :</strong> {{nom_hotel}}</p>
<h2>Article 1 – Concession de licence</h2>
<p>Le Franchiseur concède au Franchisé le droit d'exploiter la marque et le concept sous l'enseigne {{nom_hotel}} pour une durée de {{duree_franchise}} ans.</p>
<h2>Article 2 – Droit d'entrée</h2>
<p>Le Franchisé versera un droit d'entrée de <strong>{{redevance_initiale}} FCFA</strong> à la signature du présent accord.</p>
<h2>Article 3 – Redevances</h2>
<p>Une redevance annuelle de <strong>{{redevance_annuelle}} %</strong> du chiffre d'affaires sera versée trimestriellement.</p>
<h2>Article 4 – Standards et contrôle</h2>
<p>Le Franchisé s'engage à respecter les standards de qualité définis dans le manuel de marque et à accepter les audits périodiques du Franchiseur.</p>
<p style="margin-top:40px">Fait à Abidjan, le ____________________</p></div>`
  },
  {
    code: 'hotel_contrat_receptionniste',
    name: "Contrat de Réceptionniste CDI",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 12000,
    description: "Contrat à durée indéterminée pour un(e) réceptionniste d'hôtel, précisant horaires, poste de travail, rémunération et obligations de discrétion.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 85,
    fieldsJson: F([
      {key:'nom_employe', label:"Nom complet du/de la réceptionniste", type:'text', required:true},
      {key:'nom_hotel', label:"Nom de l'hôtel", type:'text', required:true},
      {key:'date_embauche', label:"Date d'embauche", type:'date', required:true},
      {key:'salaire', label:"Salaire mensuel brut (FCFA)", type:'text', required:true},
      {key:'horaires', label:"Horaires de travail (ex. 7h-15h, rotation)", type:'text', required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE TRAVAIL À DURÉE INDÉTERMINÉE – RÉCEPTIONNISTE</h1>
<p><strong>Employeur :</strong> {{nom_hotel}}</p>
<p><strong>Salarié(e) :</strong> {{nom_employe}}</p>
<h2>Article 1 – Engagement</h2>
<p>L'Employeur engage {{nom_employe}} en qualité de Réceptionniste à compter du {{date_embauche}}.</p>
<h2>Article 2 – Rémunération</h2>
<p>Salaire mensuel brut : <strong>{{salaire}} FCFA</strong>.</p>
<h2>Article 3 – Horaires</h2>
<p>{{horaires}}</p>
<h2>Article 4 – Obligations</h2>
<p>Le/la salarié(e) s'engage à assurer l'accueil des clients avec courtoisie, à gérer les réservations et à maintenir la confidentialité des informations des hôtes.</p>
<p style="margin-top:40px">Signatures : ____________________</p></div>`
  },
  {
    code: 'hotel_contrat_chef_cuisinier',
    name: "Contrat de Chef Cuisinier",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 16000,
    description: "Contrat d'emploi pour un chef cuisinier d'hôtel ou de restaurant, intégrant les spécificités de la restauration africaine et internationale, prime de production.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 78,
    fieldsJson: F([
      {key:'nom_chef', label:"Nom complet du chef cuisinier", type:'text', required:true},
      {key:'nom_etablissement', label:"Nom de l'établissement", type:'text', required:true},
      {key:'date_debut', label:"Date de début du contrat", type:'date', required:true},
      {key:'salaire_base', label:"Salaire de base mensuel (FCFA)", type:'text', required:true},
      {key:'specialites', label:"Spécialités culinaires requises", type:'textarea', required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE CHEF CUISINIER</h1>
<p><strong>Établissement :</strong> {{nom_etablissement}}</p>
<p><strong>Chef cuisinier :</strong> {{nom_chef}}</p>
<h2>Article 1 – Poste et missions</h2>
<p>{{nom_chef}} est engagé(e) en qualité de Chef Cuisinier à compter du {{date_debut}}. Il/elle est responsable de l'élaboration des menus, de la gestion des stocks alimentaires et de l'encadrement de la brigade.</p>
<h2>Article 2 – Spécialités</h2>
<p>{{specialites}}</p>
<h2>Article 3 – Rémunération</h2>
<p>Salaire mensuel brut : <strong>{{salaire_base}} FCFA</strong>, complété par une prime de production selon les résultats de la restauration.</p>
<p style="margin-top:40px">Fait à Abidjan, le ____________________</p></div>`
  },
  {
    code: 'hotel_accord_banquet',
    name: "Accord de Service de Restauration Banquet",
    category: 'commercial_financier',
    price: 6000,
    priceMax: 20000,
    description: "Accord entre un hôtel et un organisateur d'événement pour la prestation de restauration lors d'un banquet, précisant menu, nombre de couverts et tarification.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 72,
    fieldsJson: F([
      {key:'nom_hotel', label:"Nom de l'hôtel prestataire", type:'text', required:true},
      {key:'client_organisateur', label:"Client / Organisateur", type:'text', required:true},
      {key:'date_evenement', label:"Date du banquet", type:'date', required:true},
      {key:'nombre_couverts', label:"Nombre de couverts prévus", type:'text', required:true},
      {key:'menu_choisi', label:"Description du menu retenu", type:'textarea', required:true},
      {key:'prix_couvert', label:"Prix par couvert (FCFA)", type:'text', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RESTAURATION BANQUET</h1>
<p><strong>Prestataire :</strong> {{nom_hotel}}</p>
<p><strong>Client :</strong> {{client_organisateur}}</p>
<h2>Article 1 – Prestation</h2>
<p>L'hôtel s'engage à fournir un service de restauration banquet le {{date_evenement}} pour {{nombre_couverts}} couverts.</p>
<h2>Article 2 – Menu</h2>
<p>{{menu_choisi}}</p>
<h2>Article 3 – Tarification</h2>
<p>Prix unitaire par couvert : <strong>{{prix_couvert}} FCFA</strong>. Montant total = nombre de couverts confirmés × prix unitaire.</p>
<h2>Article 4 – Acompte</h2>
<p>Un acompte de 50 % est exigible à la signature du présent accord, le solde étant dû 48 h avant l'événement.</p>
<p style="margin-top:40px">Signatures : ____________________</p></div>`
  },
  {
    code: 'hotel_accord_traiteur',
    name: "Accord de Service Traiteur Événementiel",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 18000,
    description: "Accord de prestation traiteur pour événements d'entreprise, mariages ou cérémonies, incluant logistique de livraison et service sur site.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 68,
    fieldsJson: F([
      {key:'traiteur', label:"Nom du traiteur / hôtel prestataire", type:'text', required:true},
      {key:'client', label:"Nom du client", type:'text', required:true},
      {key:'type_evenement', label:"Type d'événement (mariage, séminaire, etc.)", type:'text', required:true},
      {key:'date_evenement', label:"Date de l'événement", type:'date', required:true},
      {key:'lieu_livraison', label:"Lieu de livraison / service", type:'text', required:true},
      {key:'budget_total', label:"Budget total convenu (FCFA)", type:'text', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE TRAITEUR ÉVÉNEMENTIEL</h1>
<p><strong>Traiteur :</strong> {{traiteur}}</p>
<p><strong>Client :</strong> {{client}}</p>
<h2>Article 1 – Nature de l'événement</h2>
<p>Le traiteur s'engage à fournir ses prestations pour un(e) <strong>{{type_evenement}}</strong> le {{date_evenement}} au lieu suivant : {{lieu_livraison}}.</p>
<h2>Article 2 – Budget</h2>
<p>Le budget total convenu est de <strong>{{budget_total}} FCFA</strong>, incluant la nourriture, le service et la logistique.</p>
<h2>Article 3 – Conditions d'annulation</h2>
<p>Toute annulation moins de 72 h avant l'événement entraîne la facturation de 50 % du montant total.</p>
<p style="margin-top:40px">Fait à Abidjan, le ____________________</p></div>`
  },
  {
    code: 'hotel_accord_housekeeping',
    name: "Contrat de Service de Ménage et Housekeeping",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 13000,
    description: "Contrat de prestation de services de ménage et housekeeping hôtelier, précisant fréquences, standards de propreté et effectifs affectés.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 74,
    fieldsJson: F([
      {key:'prestataire', label:"Nom de la société de housekeeping", type:'text', required:true},
      {key:'nom_hotel', label:"Nom de l'hôtel client", type:'text', required:true},
      {key:'nombre_chambres', label:"Nombre de chambres à entretenir", type:'text', required:true},
      {key:'frequence_nettoyage', label:"Fréquence de nettoyage (ex. quotidien)", type:'text', required:true},
      {key:'montant_mensuel', label:"Montant mensuel de la prestation (FCFA)", type:'text', required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE MÉNAGE ET HOUSEKEEPING HÔTELIER</h1>
<p><strong>Prestataire :</strong> {{prestataire}}</p>
<p><strong>Hôtel client :</strong> {{nom_hotel}}</p>
<h2>Article 1 – Périmètre</h2>
<p>Le prestataire assure le nettoyage et la mise en ordre de <strong>{{nombre_chambres}} chambres</strong> ainsi que des parties communes de l'hôtel.</p>
<h2>Article 2 – Fréquence</h2>
<p>Fréquence de nettoyage : <strong>{{frequence_nettoyage}}</strong>.</p>
<h2>Article 3 – Rémunération</h2>
<p>Montant mensuel forfaitaire : <strong>{{montant_mensuel}} FCFA</strong>, payable à terme échu.</p>
<h2>Article 4 – Standards</h2>
<p>Le prestataire s'engage à respecter les standards de propreté définis dans le cahier des charges annexé.</p>
<p style="margin-top:40px">Signatures : ____________________</p></div>`
  },
  {
    code: 'hotel_accord_blanchisserie',
    name: "Accord de Service de Blanchisserie Hôtelière",
    category: 'commercial_financier',
    price: 3500,
    priceMax: 11000,
    description: "Accord de sous-traitance du linge hôtelier (draps, serviettes, uniformes) à une blanchisserie industrielle, avec délais de rotation et traçabilité.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 60,
    fieldsJson: F([
      {key:'blanchisserie', label:"Nom de la blanchisserie", type:'text', required:true},
      {key:'nom_hotel', label:"Nom de l'hôtel", type:'text', required:true},
      {key:'volume_hebdomadaire', label:"Volume hebdomadaire estimé (kg)", type:'text', required:true},
      {key:'prix_kg', label:"Prix au kilogramme (FCFA)", type:'text', required:true},
      {key:'delai_rotation', label:"Délai de rotation du linge (heures)", type:'text', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE BLANCHISSERIE HÔTELIÈRE</h1>
<p><strong>Blanchisserie :</strong> {{blanchisserie}}</p>
<p><strong>Hôtel :</strong> {{nom_hotel}}</p>
<h2>Article 1 – Objet</h2>
<p>Le présent accord porte sur le lavage, le séchage, le repassage et la livraison du linge hôtelier (draps, serviettes, nappes, uniformes).</p>
<h2>Article 2 – Volume et tarif</h2>
<p>Volume hebdomadaire estimé : <strong>{{volume_hebdomadaire}} kg</strong>. Prix unitaire : <strong>{{prix_kg}} FCFA/kg</strong>.</p>
<h2>Article 3 – Délai de rotation</h2>
<p>La blanchisserie s'engage à restituer le linge propre dans un délai de <strong>{{delai_rotation}} heures</strong> après enlèvement.</p>
<p style="margin-top:40px">Fait à Abidjan, le ____________________</p></div>`
  },
  {
    code: 'hotel_accord_maintenance',
    name: "Accord de Service de Maintenance Hôtelière",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 16000,
    description: "Accord de maintenance préventive et curative des équipements hôteliers (climatisation, piscine, ascenseurs), avec SLA et astreintes.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 65,
    fieldsJson: F([
      {key:'societe_maintenance', label:"Société de maintenance", type:'text', required:true},
      {key:'nom_hotel', label:"Nom de l'hôtel", type:'text', required:true},
      {key:'equipements_couverts', label:"Équipements couverts par le contrat", type:'textarea', required:true},
      {key:'forfait_mensuel', label:"Forfait mensuel maintenance (FCFA)", type:'text', required:true},
      {key:'delai_intervention', label:"Délai d'intervention garanti (heures)", type:'text', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MAINTENANCE HÔTELIÈRE</h1>
<p><strong>Prestataire :</strong> {{societe_maintenance}}</p>
<p><strong>Hôtel :</strong> {{nom_hotel}}</p>
<h2>Article 1 – Périmètre technique</h2>
<p>{{equipements_couverts}}</p>
<h2>Article 2 – Forfait</h2>
<p>Forfait mensuel tout compris : <strong>{{forfait_mensuel}} FCFA</strong> (pièces de remplacement courantes incluses).</p>
<h2>Article 3 – Délai d'intervention</h2>
<p>En cas de panne, le prestataire intervient sous <strong>{{delai_intervention}} heures</strong> ouvrables.</p>
<h2>Article 4 – Rapport mensuel</h2>
<p>Un rapport mensuel d'état technique sera remis à la direction de l'hôtel.</p>
<p style="margin-top:40px">Signatures : ____________________</p></div>`
  },
  {
    code: 'hotel_contrat_securite',
    name: "Contrat de Service de Sécurité Hôtelière",
    category: 'commercial_financier',
    price: 6000,
    priceMax: 20000,
    description: "Contrat de gardiennage et de sécurité privée pour hôtel, conforme à la réglementation ivoirienne sur les sociétés de sécurité privée.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 70,
    fieldsJson: F([
      {key:'societe_securite', label:"Société de sécurité privée", type:'text', required:true},
      {key:'nom_hotel', label:"Nom de l'hôtel", type:'text', required:true},
      {key:'nombre_agents', label:"Nombre d'agents déployés", type:'text', required:true},
      {key:'horaires_surveillance', label:"Horaires de surveillance", type:'text', required:true},
      {key:'montant_mensuel', label:"Montant mensuel (FCFA)", type:'text', required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE SÉCURITÉ HÔTELIÈRE</h1>
<p><strong>Société de sécurité :</strong> {{societe_securite}}</p>
<p><strong>Hôtel client :</strong> {{nom_hotel}}</p>
<h2>Article 1 – Prestation</h2>
<p>La société de sécurité déploie <strong>{{nombre_agents}} agents</strong> qualifiés pour assurer la sécurité des personnes et des biens au sein de l'établissement.</p>
<h2>Article 2 – Horaires</h2>
<p>Surveillance assurée : <strong>{{horaires_surveillance}}</strong>.</p>
<h2>Article 3 – Rémunération</h2>
<p>Montant mensuel forfaitaire : <strong>{{montant_mensuel}} FCFA</strong>.</p>
<h2>Article 4 – Responsabilités</h2>
<p>La société de sécurité est couverte par une assurance responsabilité civile professionnelle dont elle fournira l'attestation annuelle.</p>
<p style="margin-top:40px">Signatures : ____________________</p></div>`
  },
  {
    code: 'hotel_contrat_groupe_booking',
    name: "Contrat de Réservation de Groupe (Group Booking)",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 14000,
    description: "Contrat formalisant la réservation de chambres et services pour un groupe (séminaire, congrès, délégation), avec tarifs négociés, rooming list et politique d'annulation.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 77,
    fieldsJson: F([
      {key:'nom_hotel', label:"Nom de l'hôtel", type:'text', required:true},
      {key:'client_groupe', label:"Organisation / Groupe client", type:'text', required:true},
      {key:'date_arrivee', label:"Date d'arrivée du groupe", type:'date', required:true},
      {key:'date_depart', label:"Date de départ du groupe", type:'date', required:true},
      {key:'nombre_chambres', label:"Nombre de chambres réservées", type:'text', required:true},
      {key:'tarif_chambre', label:"Tarif négocié par chambre/nuit (FCFA)", type:'text', required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE RÉSERVATION DE GROUPE</h1>
<p><strong>Hôtel :</strong> {{nom_hotel}}</p>
<p><strong>Groupe client :</strong> {{client_groupe}}</p>
<h2>Article 1 – Séjour</h2>
<p>Arrivée : {{date_arrivee}} — Départ : {{date_depart}}</p>
<p>Nombre de chambres réservées : <strong>{{nombre_chambres}}</strong></p>
<h2>Article 2 – Tarification</h2>
<p>Tarif négocié par chambre et par nuit : <strong>{{tarif_chambre}} FCFA</strong>, petit-déjeuner inclus.</p>
<h2>Article 3 – Rooming list</h2>
<p>La liste nominative des participants (rooming list) devra être transmise 7 jours avant l'arrivée.</p>
<h2>Article 4 – Annulation</h2>
<p>Toute annulation moins de 30 jours avant l'arrivée entraîne des pénalités de 30 % du montant total.</p>
<p style="margin-top:40px">Signatures : ____________________</p></div>`
  },
  {
    code: 'hotel_accord_agence_voyage',
    name: "Accord de Partenariat Agence de Voyage-Hôtel",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 15000,
    description: "Accord de distribution entre un hôtel et une agence de voyage locale, définissant les commissions, les allotements et les conditions de réservation.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 73,
    fieldsJson: F([
      {key:'nom_hotel', label:"Nom de l'hôtel", type:'text', required:true},
      {key:'agence_voyage', label:"Nom de l'agence de voyage", type:'text', required:true},
      {key:'taux_commission', label:"Taux de commission agence (%)", type:'text', required:true},
      {key:'allotement_chambres', label:"Allotement de chambres réservées à l'agence", type:'text', required:true},
      {key:'delai_paiement', label:"Délai de paiement des commissions (jours)", type:'text', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT AGENCE DE VOYAGE – HÔTEL</h1>
<p><strong>Hôtel :</strong> {{nom_hotel}}</p>
<p><strong>Agence de voyage :</strong> {{agence_voyage}}</p>
<h2>Article 1 – Commission</h2>
<p>L'hôtel versera à l'agence une commission de <strong>{{taux_commission}} %</strong> sur le montant HT des séjours confirmés.</p>
<h2>Article 2 – Allotement</h2>
<p>L'agence dispose d'un allotement de <strong>{{allotement_chambres}} chambres</strong> en priorité, libérable 72 h avant l'arrivée en l'absence de confirmation.</p>
<h2>Article 3 – Paiement des commissions</h2>
<p>Les commissions sont réglées sous <strong>{{delai_paiement}} jours</strong> après le check-out du client.</p>
<p style="margin-top:40px">Fait à Abidjan, le ____________________</p></div>`
  },
  {
    code: 'hotel_accord_ota',
    name: "Accord de Partenariat OTA (Booking, Expedia)",
    category: 'commercial_financier',
    price: 6000,
    priceMax: 18000,
    description: "Accord de distribution en ligne entre un hôtel africain et une plateforme OTA (Online Travel Agency), régissant les conditions de parité tarifaire et de connectivité.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 80,
    fieldsJson: F([
      {key:'nom_hotel', label:"Nom de l'hôtel", type:'text', required:true},
      {key:'nom_ota', label:"Nom de la plateforme OTA", type:'text', required:true},
      {key:'commission_ota', label:"Commission OTA (%)", type:'text', required:true},
      {key:'parite_tarifaire', label:"Engagement de parité tarifaire (oui/non + conditions)", type:'textarea', required:true},
      {key:'duree_accord', label:"Durée de l'accord (mois)", type:'text', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT OTA</h1>
<p><strong>Hôtel :</strong> {{nom_hotel}}</p>
<p><strong>Plateforme OTA :</strong> {{nom_ota}}</p>
<h2>Article 1 – Référencement</h2>
<p>L'hôtel autorise {{nom_ota}} à commercialiser ses chambres et services sur sa plateforme en ligne pour une durée de <strong>{{duree_accord}} mois</strong>.</p>
<h2>Article 2 – Commission</h2>
<p>Commission OTA : <strong>{{commission_ota}} %</strong> du prix de vente HT de chaque réservation confirmée.</p>
<h2>Article 3 – Parité tarifaire</h2>
<p>{{parite_tarifaire}}</p>
<h2>Article 4 – Résiliation</h2>
<p>Chaque partie peut résilier l'accord avec un préavis de 30 jours par notification écrite.</p>
<p style="margin-top:40px">Signatures : ____________________</p></div>`
  },
  {
    code: 'hotel_accord_concierge_vip',
    name: "Accord de Service de Conciergerie VIP",
    category: 'commercial_financier',
    price: 7000,
    priceMax: 22000,
    description: "Accord de prestation de conciergerie haut de gamme pour hôtel 4 ou 5 étoiles, incluant transferts, réservations restaurants et activités personnalisées.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 62,
    fieldsJson: F([
      {key:'nom_hotel', label:"Nom de l'hôtel", type:'text', required:true},
      {key:'prestataire_concierge', label:"Prestataire de conciergerie", type:'text', required:true},
      {key:'services_inclus', label:"Services VIP inclus dans la prestation", type:'textarea', required:true},
      {key:'tarif_mensuel', label:"Tarif mensuel de la prestation (FCFA)", type:'text', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CONCIERGERIE VIP</h1>
<p><strong>Hôtel :</strong> {{nom_hotel}}</p>
<p><strong>Prestataire :</strong> {{prestataire_concierge}}</p>
<h2>Article 1 – Services fournis</h2>
<p>{{services_inclus}}</p>
<h2>Article 2 – Disponibilité</h2>
<p>Le service de conciergerie est disponible 7j/7, 24h/24 pour les hôtes VIP désignés par la direction de l'hôtel.</p>
<h2>Article 3 – Tarification</h2>
<p>Tarif mensuel forfaitaire : <strong>{{tarif_mensuel}} FCFA</strong>.</p>
<h2>Article 4 – Confidentialité</h2>
<p>Le prestataire s'engage à la stricte confidentialité concernant les informations personnelles et les habitudes des hôtes VIP.</p>
<p style="margin-top:40px">Signatures : ____________________</p></div>`
  },
  {
    code: 'hotel_accord_salle_conference',
    name: "Accord de Location de Salle de Conférence Hôtelière",
    category: 'commercial_financier',
    price: 3000,
    priceMax: 10000,
    description: "Accord de mise à disposition d'une salle de conférence hôtelière pour séminaires, formations ou réunions d'entreprise, avec équipements et catering.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 82,
    fieldsJson: F([
      {key:'nom_hotel', label:"Nom de l'hôtel", type:'text', required:true},
      {key:'client_locataire', label:"Entreprise / Client locataire", type:'text', required:true},
      {key:'date_utilisation', label:"Date d'utilisation", type:'date', required:true},
      {key:'capacite_salle', label:"Capacité de la salle (personnes)", type:'text', required:true},
      {key:'tarif_demi_journee', label:"Tarif demi-journée (FCFA)", type:'text', required:true},
      {key:'equipements_requis', label:"Équipements demandés (vidéoprojecteur, etc.)", type:'textarea', required:false},
    ]),
    body: `<div class="doc"><h1>ACCORD DE LOCATION DE SALLE DE CONFÉRENCE</h1>
<p><strong>Hôtel :</strong> {{nom_hotel}}</p>
<p><strong>Client :</strong> {{client_locataire}}</p>
<h2>Article 1 – Réservation</h2>
<p>La salle de conférence d'une capacité de <strong>{{capacite_salle}} personnes</strong> est réservée pour le {{date_utilisation}}.</p>
<h2>Article 2 – Tarif</h2>
<p>Tarif demi-journée : <strong>{{tarif_demi_journee}} FCFA</strong>. La journée complète est facturée au double.</p>
<h2>Article 3 – Équipements</h2>
<p>{{equipements_requis}}</p>
<h2>Article 4 – Catering</h2>
<p>Toute prestation de restauration (pauses-café, déjeuner) fera l'objet d'un bon de commande complémentaire.</p>
<p style="margin-top:40px">Signatures : ____________________</p></div>`
  },
  {
    code: 'hotel_accord_spa',
    name: "Accord de Service de Spa et Bien-être Hôtelier",
    category: 'commercial_financier',
    price: 6000,
    priceMax: 18000,
    description: "Accord de sous-traitance ou de partenariat pour la gestion d'un espace spa et bien-être au sein d'un hôtel, incluant soins, personnel et partage des revenus.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 65,
    fieldsJson: F([
      {key:'gestionnaire_spa', label:"Société gestionnaire du spa", type:'text', required:true},
      {key:'nom_hotel', label:"Nom de l'hôtel", type:'text', required:true},
      {key:'soins_offerts', label:"Liste des soins et services proposés", type:'textarea', required:true},
      {key:'partage_revenus', label:"Répartition des revenus hotel/spa (%)", type:'text', required:true},
      {key:'duree_accord', label:"Durée de l'accord (ans)", type:'text', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SPA ET BIEN-ÊTRE HÔTELIER</h1>
<p><strong>Gestionnaire du spa :</strong> {{gestionnaire_spa}}</p>
<p><strong>Hôtel partenaire :</strong> {{nom_hotel}}</p>
<h2>Article 1 – Exploitation</h2>
<p>{{gestionnaire_spa}} exploite l'espace spa de l'hôtel {{nom_hotel}} pour une durée de <strong>{{duree_accord}} ans</strong>.</p>
<h2>Article 2 – Offre de soins</h2>
<p>{{soins_offerts}}</p>
<h2>Article 3 – Partage des revenus</h2>
<p>Les revenus générés sont répartis selon la clé suivante : <strong>{{partage_revenus}}</strong>.</p>
<p style="margin-top:40px">Signatures : ____________________</p></div>`
  },
  {
    code: 'hotel_accord_room_service',
    name: "Accord de Prestation Mini-Bar et Room Service",
    category: 'commercial_financier',
    price: 3000,
    priceMax: 9000,
    description: "Accord de fourniture et de gestion des mini-bars et du service en chambre (room service) pour un hôtel, avec liste des produits et grilles tarifaires.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 58,
    fieldsJson: F([
      {key:'fournisseur', label:"Fournisseur mini-bar / room service", type:'text', required:true},
      {key:'nom_hotel', label:"Nom de l'hôtel", type:'text', required:true},
      {key:'nombre_chambres', label:"Nombre de chambres équipées", type:'text', required:true},
      {key:'catalogue_produits', label:"Catalogue de produits fournis", type:'textarea', required:true},
      {key:'marge_hotel', label:"Marge appliquée par l'hôtel (%)", type:'text', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PRESTATION MINI-BAR ET ROOM SERVICE</h1>
<p><strong>Fournisseur :</strong> {{fournisseur}}</p>
<p><strong>Hôtel :</strong> {{nom_hotel}}</p>
<h2>Article 1 – Périmètre</h2>
<p>Le fournisseur assure l'approvisionnement des mini-bars de <strong>{{nombre_chambres}} chambres</strong> et la logistique du room service.</p>
<h2>Article 2 – Catalogue</h2>
<p>{{catalogue_produits}}</p>
<h2>Article 3 – Tarification</h2>
<p>L'hôtel applique une marge de <strong>{{marge_hotel}} %</strong> sur le prix d'achat fournisseur pour la facturation aux clients.</p>
<p style="margin-top:40px">Signatures : ____________________</p></div>`
  },
  {
    code: 'hotel_rapport_performance',
    name: "Rapport de Performance Hôtelière (RevPAR, Taux d'Occupation)",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 12000,
    description: "Modèle de rapport mensuel de performance hôtelière incluant les indicateurs clés RevPAR, taux d'occupation, ADR et GOP, adapté aux standards africains.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 70,
    fieldsJson: F([
      {key:'nom_hotel', label:"Nom de l'hôtel", type:'text', required:true},
      {key:'mois_rapport', label:"Mois du rapport (ex. Juin 2025)", type:'text', required:true},
      {key:'taux_occupation', label:"Taux d'occupation moyen (%)", type:'text', required:true},
      {key:'revpar', label:"RevPAR (FCFA)", type:'text', required:true},
      {key:'adr', label:"ADR – Tarif Moyen Journalier (FCFA)", type:'text', required:true},
      {key:'commentaires', label:"Commentaires et analyse de la direction", type:'textarea', required:false},
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE HÔTELIÈRE</h1>
<p><strong>Hôtel :</strong> {{nom_hotel}} — <strong>Période :</strong> {{mois_rapport}}</p>
<h2>Indicateurs Clés</h2>
<table style="width:100%;border-collapse:collapse">
  <tr style="background:#f0f0f0"><th style="border:1px solid #ccc;padding:6px">Indicateur</th><th style="border:1px solid #ccc;padding:6px">Valeur</th></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Taux d'occupation</td><td style="border:1px solid #ccc;padding:6px">{{taux_occupation}} %</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">RevPAR</td><td style="border:1px solid #ccc;padding:6px">{{revpar}} FCFA</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">ADR</td><td style="border:1px solid #ccc;padding:6px">{{adr}} FCFA</td></tr>
</table>
<h2>Analyse</h2>
<p>{{commentaires}}</p>
<p style="margin-top:40px">Directeur : ____________________</p></div>`
  },
  {
    code: 'hotel_plan_developpement',
    name: "Plan de Développement Hôtelier",
    category: 'commercial_financier',
    price: 10000,
    priceMax: 35000,
    description: "Document stratégique de développement d'un projet hôtelier en Côte d'Ivoire, couvrant étude de marché, plan d'investissement, financement et projections financières.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 68,
    fieldsJson: F([
      {key:'porteur_projet', label:"Porteur du projet", type:'text', required:true},
      {key:'nom_hotel', label:"Nom du futur hôtel", type:'text', required:true},
      {key:'localisation', label:"Localisation du projet", type:'text', required:true},
      {key:'nombre_chambres_prevu', label:"Nombre de chambres prévu", type:'text', required:true},
      {key:'investissement_total', label:"Investissement total estimé (FCFA)", type:'text', required:true},
      {key:'axes_strategiques', label:"Axes stratégiques de développement", type:'textarea', required:true},
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT HÔTELIER</h1>
<p><strong>Porteur du projet :</strong> {{porteur_projet}}</p>
<p><strong>Projet :</strong> {{nom_hotel}} — <strong>Localisation :</strong> {{localisation}}</p>
<h2>1. Présentation du projet</h2>
<p>Création d'un hôtel de <strong>{{nombre_chambres_prevu}} chambres</strong> pour un investissement total estimé à <strong>{{investissement_total}} FCFA</strong>.</p>
<h2>2. Axes stratégiques</h2>
<p>{{axes_strategiques}}</p>
<h2>3. Plan de financement</h2>
<p>Le plan de financement distingue fonds propres, emprunts bancaires et éventuels partenaires investisseurs.</p>
<h2>4. Projections financières</h2>
<p>Les projections à 5 ans (RevPAR cible, seuil de rentabilité, TRI) sont jointes en annexe.</p>
<p style="margin-top:40px">Date : ____________________</p></div>`
  },
  {
    code: 'hotel_accord_navette_aeroport',
    name: "Accord de Service de Navette Aéroport",
    category: 'commercial_financier',
    price: 3500,
    priceMax: 11000,
    description: "Accord entre un hôtel et une société de transport pour la mise en place d'une navette aéroport-hôtel, précisant fréquences, véhicules et tarifs.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 72,
    fieldsJson: F([
      {key:'transporteur', label:"Société de transport", type:'text', required:true},
      {key:'nom_hotel', label:"Nom de l'hôtel", type:'text', required:true},
      {key:'frequence_navette', label:"Fréquence des navettes (ex. toutes les 2h)", type:'text', required:true},
      {key:'type_vehicule', label:"Type de véhicule utilisé", type:'text', required:true},
      {key:'tarif_passager', label:"Tarif par passager (FCFA)", type:'text', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE NAVETTE AÉROPORT</h1>
<p><strong>Transporteur :</strong> {{transporteur}}</p>
<p><strong>Hôtel :</strong> {{nom_hotel}}</p>
<h2>Article 1 – Service</h2>
<p>Le transporteur assure les rotations entre l'Aéroport Félix Houphouët-Boigny et l'hôtel {{nom_hotel}} avec une fréquence de <strong>{{frequence_navette}}</strong>.</p>
<h2>Article 2 – Véhicules</h2>
<p>Véhicules utilisés : <strong>{{type_vehicule}}</strong>, en bon état de marche et couverts par une assurance tous risques.</p>
<h2>Article 3 – Tarification</h2>
<p>Tarif par passager : <strong>{{tarif_passager}} FCFA</strong>, payable à la réservation ou en cash dans le véhicule.</p>
<p style="margin-top:40px">Fait à Abidjan, le ____________________</p></div>`
  },
  {
    code: 'hotel_contrat_decoration',
    name: "Contrat de Service de Décoration Hôtelière",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 15000,
    description: "Contrat de prestation de décoration intérieure et événementielle pour hôtel, incluant thèmes africains, fêtes et renouvellement de décor saisonnier.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 60,
    fieldsJson: F([
      {key:'decorateur', label:"Société / Décorateur prestataire", type:'text', required:true},
      {key:'nom_hotel', label:"Nom de l'hôtel", type:'text', required:true},
      {key:'perimetre_decoration', label:"Périmètre de la décoration (espaces concernés)", type:'textarea', required:true},
      {key:'budget_decoration', label:"Budget de la prestation (FCFA)", type:'text', required:true},
      {key:'delai_realisation', label:"Délai de réalisation (jours)", type:'text', required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE DÉCORATION HÔTELIÈRE</h1>
<p><strong>Décorateur :</strong> {{decorateur}}</p>
<p><strong>Hôtel :</strong> {{nom_hotel}}</p>
<h2>Article 1 – Périmètre</h2>
<p>{{perimetre_decoration}}</p>
<h2>Article 2 – Budget et délai</h2>
<p>Budget convenu : <strong>{{budget_decoration}} FCFA</strong>. Délai de réalisation : <strong>{{delai_realisation}} jours</strong> à compter de la validation du concept.</p>
<h2>Article 3 – Propriété des créations</h2>
<p>Les créations décoratives deviennent la propriété de l'hôtel à l'issue du règlement intégral de la facture.</p>
<p style="margin-top:40px">Signatures : ____________________</p></div>`
  },
  {
    code: 'hotel_accord_formation_personnel',
    name: "Accord de Service de Formation du Personnel Hôtelier",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 16000,
    description: "Accord de formation professionnelle continue pour le personnel hôtelier (accueil, service, langue, hygiène), conforme au plan de formation OHADA.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 67,
    fieldsJson: F([
      {key:'organisme_formation', label:"Organisme de formation", type:'text', required:true},
      {key:'nom_hotel', label:"Nom de l'hôtel", type:'text', required:true},
      {key:'modules_formation', label:"Modules et thèmes de formation", type:'textarea', required:true},
      {key:'nombre_stagiaires', label:"Nombre de stagiaires", type:'text', required:true},
      {key:'cout_formation', label:"Coût total de la formation (FCFA)", type:'text', required:true},
      {key:'date_formation', label:"Date de début de la formation", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FORMATION DU PERSONNEL HÔTELIER</h1>
<p><strong>Organisme :</strong> {{organisme_formation}}</p>
<p><strong>Hôtel bénéficiaire :</strong> {{nom_hotel}}</p>
<h2>Article 1 – Objet</h2>
<p>L'organisme dispense une formation professionnelle à <strong>{{nombre_stagiaires}} agents</strong> du personnel hôtelier à partir du {{date_formation}}.</p>
<h2>Article 2 – Contenu pédagogique</h2>
<p>{{modules_formation}}</p>
<h2>Article 3 – Coût</h2>
<p>Coût total de la formation : <strong>{{cout_formation}} FCFA</strong>, prise en charge par l'hôtel avec possibilité de mobilisation des fonds de formation professionnelle.</p>
<p style="margin-top:40px">Signatures : ____________________</p></div>`
  },
  {
    code: 'hotel_accord_compagnie_aerienne',
    name: "Accord de Partenariat Hôtel-Compagnie Aérienne",
    category: 'commercial_financier',
    price: 8000,
    priceMax: 25000,
    description: "Accord de partenariat entre un hôtel et une compagnie aérienne pour l'hébergement des équipages, les bagages retardés et les packages voyage.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 65,
    fieldsJson: F([
      {key:'nom_hotel', label:"Nom de l'hôtel", type:'text', required:true},
      {key:'compagnie_aerienne', label:"Compagnie aérienne partenaire", type:'text', required:true},
      {key:'tarif_equipage', label:"Tarif négocié par chambre équipage/nuit (FCFA)", type:'text', required:true},
      {key:'volume_nuitees', label:"Volume de nuitées estimé par mois", type:'text', required:true},
      {key:'services_inclus', label:"Services inclus pour les équipages", type:'textarea', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT HÔTEL – COMPAGNIE AÉRIENNE</h1>
<p><strong>Hôtel :</strong> {{nom_hotel}}</p>
<p><strong>Compagnie aérienne :</strong> {{compagnie_aerienne}}</p>
<h2>Article 1 – Hébergement des équipages</h2>
<p>L'hôtel s'engage à héberger les équipages de {{compagnie_aerienne}} au tarif de <strong>{{tarif_equipage}} FCFA</strong> par chambre et par nuit.</p>
<h2>Article 2 – Volume estimé</h2>
<p>Volume mensuel estimé : <strong>{{volume_nuitees}} nuitées</strong>.</p>
<h2>Article 3 – Services inclus</h2>
<p>{{services_inclus}}</p>
<h2>Article 4 – Facturation</h2>
<p>La facturation est mensuelle consolidée, payable sous 30 jours à réception de la facture.</p>
<p style="margin-top:40px">Signatures : ____________________</p></div>`
  },
  {
    code: 'hotel_charte_qualite',
    name: "Charte de Qualité de Service Hôtelier",
    category: 'commercial_financier',
    price: 3000,
    priceMax: 9000,
    description: "Charte interne définissant les standards de qualité de service d'un hôtel africain, engagements envers les clients et procédures de gestion des réclamations.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 75,
    fieldsJson: F([
      {key:'nom_hotel', label:"Nom de l'hôtel", type:'text', required:true},
      {key:'directeur_general', label:"Nom du Directeur Général", type:'text', required:true},
      {key:'engagements_qualite', label:"Engagements qualité phares de l'hôtel", type:'textarea', required:true},
      {key:'procedure_reclamation', label:"Procédure de traitement des réclamations", type:'textarea', required:true},
    ]),
    body: `<div class="doc"><h1>CHARTE DE QUALITÉ DE SERVICE HÔTELIER</h1>
<p><strong>{{nom_hotel}}</strong></p>
<p>Sous l'impulsion de <strong>{{directeur_general}}</strong>, Directeur Général, l'ensemble du personnel s'engage à offrir une expérience d'exception à chaque hôte.</p>
<h2>Nos Engagements</h2>
<p>{{engagements_qualite}}</p>
<h2>Gestion des Réclamations</h2>
<p>{{procedure_reclamation}}</p>
<h2>Révision de la Charte</h2>
<p>La présente charte est révisée annuellement et affichée dans toutes les zones accessibles au personnel.</p>
<p style="margin-top:40px">Signé : {{directeur_general}} — Date : ____________________</p></div>`
  },

  // ─── TOURISME / ÉCOTOURISME (25 templates) ───────────────────────────────
  {
    code: 'tour2_guide_touristique',
    name: "Accord de Service de Guide Touristique",
    category: 'commercial_financier',
    price: 3000,
    priceMax: 9000,
    description: "Accord entre une agence ou un hôtel et un guide touristique indépendant pour la conduite de visites, incluant itinéraire, rémunération et assurance.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 78,
    fieldsJson: F([
      {key:'nom_guide', label:"Nom complet du guide touristique", type:'text', required:true},
      {key:'agence_client', label:"Agence / Opérateur client", type:'text', required:true},
      {key:'itineraire', label:"Itinéraire / Destinations couvertes", type:'textarea', required:true},
      {key:'tarif_journalier', label:"Tarif journalier du guide (FCFA)", type:'text', required:true},
      {key:'langues_parles', label:"Langues parlées par le guide", type:'text', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GUIDE TOURISTIQUE</h1>
<p><strong>Guide :</strong> {{nom_guide}}</p>
<p><strong>Client :</strong> {{agence_client}}</p>
<h2>Article 1 – Prestations</h2>
<p>Le guide assure la conduite des circuits touristiques selon l'itinéraire suivant : {{itineraire}}</p>
<h2>Article 2 – Langues</h2>
<p>Langues de guidage : <strong>{{langues_parles}}</strong>.</p>
<h2>Article 3 – Rémunération</h2>
<p>Tarif journalier : <strong>{{tarif_journalier}} FCFA</strong>, frais de déplacement et hébergement en sus si mission hors Abidjan.</p>
<h2>Article 4 – Responsabilités</h2>
<p>Le guide est couvert par une assurance responsabilité civile professionnelle. Il ne saurait être tenu responsable des accidents résultant de la négligence des touristes.</p>
<p style="margin-top:40px">Signatures : ____________________</p></div>`
  },
  {
    code: 'tour2_safari_excursion',
    name: "Contrat de Service de Safari et Excursion",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 18000,
    description: "Contrat de prestation de safari et d'excursion en Afrique de l'Ouest, précisant le programme, les équipements fournis et les conditions de sécurité.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 72,
    fieldsJson: F([
      {key:'operateur_safari', label:"Opérateur de safari / excursion", type:'text', required:true},
      {key:'client', label:"Nom du client / groupe", type:'text', required:true},
      {key:'destination', label:"Destination et itinéraire du safari", type:'textarea', required:true},
      {key:'date_depart', label:"Date de départ", type:'date', required:true},
      {key:'prix_personne', label:"Prix par personne (FCFA)", type:'text', required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE SAFARI ET EXCURSION</h1>
<p><strong>Opérateur :</strong> {{operateur_safari}}</p>
<p><strong>Client :</strong> {{client}}</p>
<h2>Article 1 – Programme</h2>
<p>Départ le {{date_depart}}. Destination et itinéraire : {{destination}}</p>
<h2>Article 2 – Prix</h2>
<p>Prix par personne : <strong>{{prix_personne}} FCFA</strong> tout inclus (transport, guide, repas, hébergement selon formule choisie).</p>
<h2>Article 3 – Sécurité</h2>
<p>L'opérateur respecte les normes de sécurité en vigueur. Chaque participant signe une décharge de responsabilité pour les activités à risque.</p>
<h2>Article 4 – Annulation</h2>
<p>Annulation moins de 15 jours avant le départ : 40 % du montant retenu.</p>
<p style="margin-top:40px">Signatures : ____________________</p></div>`
  },
  {
    code: 'tour2_circuit_cote_ivoire',
    name: "Accord de Service de Circuit Découverte Côte d'Ivoire",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 16000,
    description: "Accord de prestation de circuit touristique couvrant les régions phares de Côte d'Ivoire (Man, Yamoussoukro, San-Pédro, Grand-Bassam).",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 80,
    fieldsJson: F([
      {key:'operateur', label:"Opérateur touristique", type:'text', required:true},
      {key:'client', label:"Nom du client / groupe", type:'text', required:true},
      {key:'regions_visitees', label:"Régions et étapes du circuit", type:'textarea', required:true},
      {key:'duree_circuit', label:"Durée totale du circuit (jours)", type:'text', required:true},
      {key:'tarif_total', label:"Tarif total par personne (FCFA)", type:'text', required:true},
      {key:'date_depart', label:"Date de départ", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CIRCUIT DÉCOUVERTE CÔTE D'IVOIRE</h1>
<p><strong>Opérateur :</strong> {{operateur}}</p>
<p><strong>Client :</strong> {{client}}</p>
<h2>Article 1 – Circuit</h2>
<p>Départ le {{date_depart}} pour un circuit de <strong>{{duree_circuit}} jours</strong>.</p>
<h2>Article 2 – Étapes</h2>
<p>{{regions_visitees}}</p>
<h2>Article 3 – Tarif</h2>
<p>Tarif tout compris par personne : <strong>{{tarif_total}} FCFA</strong> (transport, hébergement, repas, guides).</p>
<p style="margin-top:40px">Signatures : ____________________</p></div>`
  },
  {
    code: 'tour2_tourisme_balneaire',
    name: "Accord de Service de Tourisme Balnéaire",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 13000,
    description: "Accord de prestation de séjour balnéaire sur les côtes ivoiriennes (Assinie, Jacqueville, Grand-Lahou), incluant hébergement, activités nautiques et restauration.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 76,
    fieldsJson: F([
      {key:'operateur', label:"Opérateur balnéaire", type:'text', required:true},
      {key:'client', label:"Nom du client", type:'text', required:true},
      {key:'destination_balneaire', label:"Destination balnéaire choisie", type:'text', required:true},
      {key:'date_sejour', label:"Date de début du séjour", type:'date', required:true},
      {key:'duree_sejour', label:"Durée du séjour (nuits)", type:'text', required:true},
      {key:'prix_personne', label:"Prix par personne tout inclus (FCFA)", type:'text', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TOURISME BALNÉAIRE</h1>
<p><strong>Opérateur :</strong> {{operateur}}</p>
<p><strong>Client :</strong> {{client}}</p>
<h2>Article 1 – Séjour</h2>
<p>Destination : <strong>{{destination_balneaire}}</strong>. Arrivée : {{date_sejour}}. Durée : <strong>{{duree_sejour}} nuits</strong>.</p>
<h2>Article 2 – Prestations incluses</h2>
<p>Hébergement en bungalow ou villa de plage, petit-déjeuner et dîner, accès aux équipements nautiques non motorisés.</p>
<h2>Article 3 – Tarification</h2>
<p>Prix tout compris par personne : <strong>{{prix_personne}} FCFA</strong>.</p>
<p style="margin-top:40px">Signatures : ____________________</p></div>`
  },
  {
    code: 'tour2_tourisme_culturel',
    name: "Accord de Service de Tourisme Culturel (Masques, Danses)",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 13000,
    description: "Accord de prestation de tourisme culturel mettant en valeur les masques sacrés et les danses traditionnelles de Côte d'Ivoire (Pays Dan, Pays Baoulé).",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 74,
    fieldsJson: F([
      {key:'operateur_culturel', label:"Opérateur culturel / agence", type:'text', required:true},
      {key:'client', label:"Nom du client / groupe", type:'text', required:true},
      {key:'communautes_visitees', label:"Communautés et sites culturels visités", type:'textarea', required:true},
      {key:'date_visite', label:"Date de la visite", type:'date', required:true},
      {key:'tarif_groupe', label:"Tarif pour le groupe (FCFA)", type:'text', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TOURISME CULTUREL</h1>
<p><strong>Opérateur :</strong> {{operateur_culturel}}</p>
<p><strong>Client :</strong> {{client}}</p>
<h2>Article 1 – Programme culturel</h2>
<p>Visite le {{date_visite}} des sites et communautés suivants : {{communautes_visitees}}</p>
<h2>Article 2 – Respect des traditions</h2>
<p>Les participants s'engagent à respecter les us et coutumes locaux, notamment les règles de discrétion autour des masques sacrés et les interdits culturels communiqués par le guide.</p>
<h2>Article 3 – Tarif</h2>
<p>Tarif pour le groupe : <strong>{{tarif_groupe}} FCFA</strong>, dont une part revient directement aux communautés hôtes.</p>
<p style="margin-top:40px">Signatures : ____________________</p></div>`
  },
  {
    code: 'tour2_tourisme_memoire',
    name: "Accord de Service de Tourisme de Mémoire (Lieux Historiques)",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 12000,
    description: "Accord de circuit touristique sur les lieux de mémoire de Côte d'Ivoire et d'Afrique de l'Ouest (anciens comptoirs, sites coloniaux, musées d'histoire).",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 65,
    fieldsJson: F([
      {key:'operateur', label:"Opérateur touristique", type:'text', required:true},
      {key:'client', label:"Nom du groupe / client", type:'text', required:true},
      {key:'sites_historiques', label:"Sites historiques au programme", type:'textarea', required:true},
      {key:'date_circuit', label:"Date du circuit", type:'date', required:true},
      {key:'tarif_personne', label:"Tarif par personne (FCFA)", type:'text', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TOURISME DE MÉMOIRE</h1>
<p><strong>Opérateur :</strong> {{operateur}}</p>
<p><strong>Client :</strong> {{client}}</p>
<h2>Article 1 – Sites au programme</h2>
<p>Date : {{date_circuit}}. Sites visités : {{sites_historiques}}</p>
<h2>Article 2 – Médiation culturelle</h2>
<p>Un historien ou médiateur culturel qualifié accompagne le groupe pour contextualiser chaque site dans l'histoire de l'Afrique de l'Ouest.</p>
<h2>Article 3 – Tarif</h2>
<p>Tarif par personne : <strong>{{tarif_personne}} FCFA</strong>, droits d'entrée inclus.</p>
<p style="margin-top:40px">Signatures : ____________________</p></div>`
  },
  {
    code: 'tour2_location_vehicule',
    name: "Accord de Service de Location de Véhicule Touristique",
    category: 'commercial_financier',
    price: 3500,
    priceMax: 11000,
    description: "Accord de location de véhicule avec ou sans chauffeur pour usage touristique, précisant kilométrage, assurance et zones de circulation autorisées.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 80,
    fieldsJson: F([
      {key:'loueur', label:"Société de location de véhicules", type:'text', required:true},
      {key:'client', label:"Nom du client locataire", type:'text', required:true},
      {key:'type_vehicule', label:"Type et immatriculation du véhicule", type:'text', required:true},
      {key:'date_debut_location', label:"Date de début de location", type:'date', required:true},
      {key:'duree_location', label:"Durée de la location (jours)", type:'text', required:true},
      {key:'tarif_journalier', label:"Tarif journalier (FCFA)", type:'text', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE LOCATION DE VÉHICULE TOURISTIQUE</h1>
<p><strong>Loueur :</strong> {{loueur}}</p>
<p><strong>Client :</strong> {{client}}</p>
<h2>Article 1 – Véhicule loué</h2>
<p>Véhicule : <strong>{{type_vehicule}}</strong>. Prise en charge le {{date_debut_location}} pour une durée de <strong>{{duree_location}} jours</strong>.</p>
<h2>Article 2 – Tarif</h2>
<p>Tarif journalier : <strong>{{tarif_journalier}} FCFA</strong>, carburant à la charge du locataire.</p>
<h2>Article 3 – Assurance et responsabilités</h2>
<p>Le véhicule est couvert par une assurance tous risques. Toute infraction au code de la route est à la charge exclusive du locataire.</p>
<p style="margin-top:40px">Signatures : ____________________</p></div>`
  },
  {
    code: 'tour2_partenariat_office_tourisme',
    name: "Accord de Partenariat Office de Tourisme-Opérateur",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 15000,
    description: "Accord-cadre entre un office de tourisme régional et un opérateur privé pour la promotion et la commercialisation conjointe des destinations touristiques.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 65,
    fieldsJson: F([
      {key:'office_tourisme', label:"Office de tourisme", type:'text', required:true},
      {key:'operateur', label:"Opérateur touristique privé", type:'text', required:true},
      {key:'destinations_promues', label:"Destinations et produits touristiques promus", type:'textarea', required:true},
      {key:'contribution_officielle', label:"Contribution de l'office (appuis, subventions)", type:'textarea', required:false},
      {key:'duree_partenariat', label:"Durée du partenariat (ans)", type:'text', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT OFFICE DE TOURISME – OPÉRATEUR PRIVÉ</h1>
<p><strong>Office de tourisme :</strong> {{office_tourisme}}</p>
<p><strong>Opérateur :</strong> {{operateur}}</p>
<h2>Article 1 – Objet</h2>
<p>Les parties s'engagent à promouvoir conjointement les destinations et produits suivants : {{destinations_promues}}</p>
<h2>Article 2 – Engagements de l'Office</h2>
<p>{{contribution_officielle}}</p>
<h2>Article 3 – Durée</h2>
<p>Partenariat d'une durée de <strong>{{duree_partenariat}} ans</strong>, renouvelable par accord exprès.</p>
<p style="margin-top:40px">Signatures : ____________________</p></div>`
  },
  {
    code: 'tour2_camping_bivouac',
    name: "Accord de Service de Camping et Bivouac",
    category: 'commercial_financier',
    price: 3000,
    priceMax: 9000,
    description: "Accord de mise en place de séjours de camping et bivouac en nature en Côte d'Ivoire, précisant équipements fournis, règles de sécurité et impact environnemental.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 60,
    fieldsJson: F([
      {key:'prestataire_camping', label:"Prestataire camping / bivouac", type:'text', required:true},
      {key:'client', label:"Nom du groupe client", type:'text', required:true},
      {key:'site_bivouac', label:"Site de camping / bivouac", type:'text', required:true},
      {key:'date_sejour', label:"Date du séjour", type:'date', required:true},
      {key:'tarif_nuit_personne', label:"Tarif par personne par nuit (FCFA)", type:'text', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CAMPING ET BIVOUAC</h1>
<p><strong>Prestataire :</strong> {{prestataire_camping}}</p>
<p><strong>Client :</strong> {{client}}</p>
<h2>Article 1 – Site et date</h2>
<p>Site retenu : <strong>{{site_bivouac}}</strong>. Date : {{date_sejour}}.</p>
<h2>Article 2 – Équipements fournis</h2>
<p>Le prestataire fournit tentes, sacs de couchage, lampes frontales, kit cuisine et trousse de premiers secours.</p>
<h2>Article 3 – Tarif</h2>
<p>Tarif par personne et par nuit : <strong>{{tarif_nuit_personne}} FCFA</strong>.</p>
<h2>Article 4 – Règles environnementales</h2>
<p>Les participants s'engagent au principe zéro déchet, interdiction de feux sauvages et respect de la faune et de la flore locales.</p>
<p style="margin-top:40px">Signatures : ____________________</p></div>`
  },
  {
    code: 'tour2_ecotourisme_foret',
    name: "Accord de Service d'Écotourisme en Forêt",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 13000,
    description: "Accord de prestation d'écotourisme en milieu forestier (Taï, Banco, Yapo), incluant observation de la biodiversité, guides naturalistes et charte environnementale.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 70,
    fieldsJson: F([
      {key:'operateur_eco', label:"Opérateur écotouristique", type:'text', required:true},
      {key:'client', label:"Nom du groupe / client", type:'text', required:true},
      {key:'foret_visitee', label:"Forêt ou parc naturel visité", type:'text', required:true},
      {key:'date_visite', label:"Date de la visite", type:'date', required:true},
      {key:'tarif_groupe', label:"Tarif pour le groupe (FCFA)", type:'text', required:true},
      {key:'programme_naturaliste', label:"Programme naturaliste prévu", type:'textarea', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ÉCOTOURISME EN FORÊT</h1>
<p><strong>Opérateur :</strong> {{operateur_eco}}</p>
<p><strong>Client :</strong> {{client}}</p>
<h2>Article 1 – Destination</h2>
<p>Visite le {{date_visite}} de : <strong>{{foret_visitee}}</strong>.</p>
<h2>Article 2 – Programme naturaliste</h2>
<p>{{programme_naturaliste}}</p>
<h2>Article 3 – Tarif</h2>
<p>Tarif groupe : <strong>{{tarif_groupe}} FCFA</strong>, dont 10 % reversés au fonds de conservation de la forêt.</p>
<h2>Article 4 – Charte environnementale</h2>
<p>Aucune plante ou animal ne peut être prélevé. Les chemins balisés doivent être respectés en tout temps.</p>
<p style="margin-top:40px">Signatures : ____________________</p></div>`
  },
  {
    code: 'tour2_tourisme_communautaire',
    name: "Accord de Service de Tourisme Communautaire Villageois",
    category: 'commercial_financier',
    price: 3500,
    priceMax: 11000,
    description: "Accord de tourisme communautaire organisant l'accueil de visiteurs dans un village de Côte d'Ivoire avec partage équitable des revenus avec la communauté.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 68,
    fieldsJson: F([
      {key:'operateur', label:"Opérateur touristique partenaire", type:'text', required:true},
      {key:'communaute_villageoise', label:"Nom du village / communauté hôte", type:'text', required:true},
      {key:'activites_proposees', label:"Activités proposées aux visiteurs", type:'textarea', required:true},
      {key:'partage_revenus', label:"Clé de répartition des revenus (% communauté)", type:'text', required:true},
      {key:'capacite_accueil', label:"Capacité d'accueil maximale (visiteurs/jour)", type:'text', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TOURISME COMMUNAUTAIRE VILLAGEOIS</h1>
<p><strong>Opérateur :</strong> {{operateur}}</p>
<p><strong>Communauté hôte :</strong> {{communaute_villageoise}}</p>
<h2>Article 1 – Activités</h2>
<p>{{activites_proposees}}</p>
<h2>Article 2 – Capacité d'accueil</h2>
<p>Capacité maximale : <strong>{{capacite_accueil}} visiteurs par jour</strong> afin de préserver l'authenticité du cadre de vie communautaire.</p>
<h2>Article 3 – Partage des revenus</h2>
<p><strong>{{partage_revenus}} %</strong> des recettes brutes sont reversés directement à la caisse communautaire du village.</p>
<p style="margin-top:40px">Signatures : ____________________</p></div>`
  },
  {
    code: 'tour2_sport_nautique',
    name: "Accord de Service de Sport Nautique (Surf, Plongée)",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 13000,
    description: "Accord de prestation d'activités nautiques sportives (surf, plongée sous-marine, kitesurf) sur les côtes ivoiriennes, avec certification des moniteurs et assurance.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 72,
    fieldsJson: F([
      {key:'centre_nautique', label:"Centre nautique prestataire", type:'text', required:true},
      {key:'client', label:"Nom du client / groupe", type:'text', required:true},
      {key:'activites_nautiques', label:"Activités nautiques souscrites", type:'text', required:true},
      {key:'date_session', label:"Date de la session", type:'date', required:true},
      {key:'tarif_personne', label:"Tarif par personne (FCFA)", type:'text', required:true},
      {key:'niveau_requis', label:"Niveau requis (débutant, intermédiaire, avancé)", type:'text', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SPORT NAUTIQUE</h1>
<p><strong>Centre nautique :</strong> {{centre_nautique}}</p>
<p><strong>Client :</strong> {{client}}</p>
<h2>Article 1 – Activités</h2>
<p>Activités souscrites : <strong>{{activites_nautiques}}</strong>. Niveau requis : <strong>{{niveau_requis}}</strong>.</p>
<h2>Article 2 – Session</h2>
<p>Date de la session : {{date_session}}. Tarif par personne : <strong>{{tarif_personne}} FCFA</strong> (équipements et moniteur certifié inclus).</p>
<h2>Article 3 – Sécurité</h2>
<p>Tous les participants doivent signer une décharge et présenter un certificat médical de non-contre-indication. Le centre dispose d'un dispositif de sauvetage opérationnel.</p>
<p style="margin-top:40px">Signatures : ____________________</p></div>`
  },
  {
    code: 'tour2_peche_sportive',
    name: "Accord de Service de Pêche Sportive Touristique",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 13000,
    description: "Accord de sortie de pêche sportive dans les lagunes ou en mer depuis les côtes ivoiriennes, incluant embarcation, matériel et guide de pêche.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 62,
    fieldsJson: F([
      {key:'prestataire_peche', label:"Prestataire de pêche sportive", type:'text', required:true},
      {key:'client', label:"Nom du client / groupe", type:'text', required:true},
      {key:'type_peche', label:"Type de pêche (mer, lagon, rivière)", type:'text', required:true},
      {key:'date_sortie', label:"Date de la sortie", type:'date', required:true},
      {key:'tarif_demi_journee', label:"Tarif demi-journée par personne (FCFA)", type:'text', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PÊCHE SPORTIVE TOURISTIQUE</h1>
<p><strong>Prestataire :</strong> {{prestataire_peche}}</p>
<p><strong>Client :</strong> {{client}}</p>
<h2>Article 1 – Prestation</h2>
<p>Type de pêche : <strong>{{type_peche}}</strong>. Date de sortie : {{date_sortie}}.</p>
<h2>Article 2 – Tarif</h2>
<p>Tarif demi-journée par personne : <strong>{{tarif_demi_journee}} FCFA</strong> (embarcation, matériel de pêche, guide et boissons fraîches inclus).</p>
<h2>Article 3 – Catch and Release</h2>
<p>Les parties conviennent du principe de pêche responsable : les prises peuvent être remises à l'eau sauf accord contraire du client.</p>
<p style="margin-top:40px">Signatures : ____________________</p></div>`
  },
  {
    code: 'tour2_randonnee_trekking',
    name: "Accord de Service de Randonnée et Trekking",
    category: 'commercial_financier',
    price: 3500,
    priceMax: 11000,
    description: "Accord de prestation de randonnée et trekking en Côte d'Ivoire (région de Man, Tonkpi, chaîne montagneuse), avec guide certifié et équipement de sécurité.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 68,
    fieldsJson: F([
      {key:'prestataire_trek', label:"Prestataire de randonnée / trekking", type:'text', required:true},
      {key:'client', label:"Nom du groupe client", type:'text', required:true},
      {key:'itineraire_trek', label:"Itinéraire et dénivelé du trek", type:'textarea', required:true},
      {key:'date_depart', label:"Date de départ", type:'date', required:true},
      {key:'duree_trek', label:"Durée du trekking (jours)", type:'text', required:true},
      {key:'tarif_personne', label:"Tarif par personne (FCFA)", type:'text', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RANDONNÉE ET TREKKING</h1>
<p><strong>Prestataire :</strong> {{prestataire_trek}}</p>
<p><strong>Client :</strong> {{client}}</p>
<h2>Article 1 – Itinéraire</h2>
<p>Départ le {{date_depart}} pour <strong>{{duree_trek}} jours</strong>. Itinéraire : {{itineraire_trek}}</p>
<h2>Article 2 – Tarif</h2>
<p>Tarif par personne : <strong>{{tarif_personne}} FCFA</strong> (guide, porteurs, hébergement en camp, repas).</p>
<h2>Article 3 – Condition physique</h2>
<p>Le client certifie être en bonne condition physique et aptitude médicale à pratiquer l'activité de randonnée. Un certificat médical peut être exigé.</p>
<p style="margin-top:40px">Signatures : ____________________</p></div>`
  },
  {
    code: 'tour2_visite_plantation',
    name: "Accord de Service de Visite de Plantation (Cacao, Café)",
    category: 'commercial_financier',
    price: 3000,
    priceMax: 9000,
    description: "Accord de prestation de visite touristique dans des plantations de cacao ou de café en Côte d'Ivoire, avec initiation à la filière et dégustation.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 75,
    fieldsJson: F([
      {key:'exploitant_plantation', label:"Exploitant de la plantation", type:'text', required:true},
      {key:'operateur_touristique', label:"Opérateur touristique partenaire", type:'text', required:true},
      {key:'type_culture', label:"Type de culture (cacao, café, autre)", type:'text', required:true},
      {key:'date_visite', label:"Date de la visite", type:'date', required:true},
      {key:'tarif_visiteur', label:"Tarif par visiteur (FCFA)", type:'text', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE VISITE DE PLANTATION</h1>
<p><strong>Plantation :</strong> {{exploitant_plantation}}</p>
<p><strong>Opérateur touristique :</strong> {{operateur_touristique}}</p>
<h2>Article 1 – Visite</h2>
<p>Type de culture : <strong>{{type_culture}}</strong>. Date de la visite : {{date_visite}}.</p>
<h2>Article 2 – Programme</h2>
<p>La visite comprend : tour de la plantation avec le planteur, explication du cycle de culture et de la transformation, dégustation des produits finis.</p>
<h2>Article 3 – Tarif</h2>
<p>Tarif par visiteur : <strong>{{tarif_visiteur}} FCFA</strong>, dont une part revient directement au planteur hôte.</p>
<p style="margin-top:40px">Signatures : ____________________</p></div>`
  },
  {
    code: 'tour2_road_trip_afrique',
    name: "Accord de Service de Road Trip Afrique de l'Ouest",
    category: 'commercial_financier',
    price: 8000,
    priceMax: 25000,
    description: "Accord de prestation de road trip transfrontalier en Afrique de l'Ouest couvrant plusieurs pays (Côte d'Ivoire, Ghana, Burkina Faso, Sénégal), avec carnet de voyage.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 70,
    fieldsJson: F([
      {key:'operateur_road_trip', label:"Opérateur du road trip", type:'text', required:true},
      {key:'client', label:"Nom du client / groupe", type:'text', required:true},
      {key:'pays_traverses', label:"Pays et étapes du road trip", type:'textarea', required:true},
      {key:'date_depart', label:"Date de départ", type:'date', required:true},
      {key:'duree_voyage', label:"Durée totale du voyage (jours)", type:'text', required:true},
      {key:'tarif_personne', label:"Tarif par personne (FCFA)", type:'text', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE ROAD TRIP AFRIQUE DE L'OUEST</h1>
<p><strong>Opérateur :</strong> {{operateur_road_trip}}</p>
<p><strong>Client :</strong> {{client}}</p>
<h2>Article 1 – Itinéraire</h2>
<p>Départ le {{date_depart}} pour un road trip de <strong>{{duree_voyage}} jours</strong> à travers : {{pays_traverses}}</p>
<h2>Article 2 – Documents de voyage</h2>
<p>Le client est responsable de l'obtention de tous les visas et documents de voyage requis pour chaque pays traversé.</p>
<h2>Article 3 – Tarif</h2>
<p>Tarif tout inclus par personne : <strong>{{tarif_personne}} FCFA</strong> (transport, hébergements, repas, guides locaux).</p>
<p style="margin-top:40px">Signatures : ____________________</p></div>`
  },
  {
    code: 'tour2_photographie_tourisme',
    name: "Accord de Service de Photographie et Tourisme Photo",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 13000,
    description: "Accord de prestation de voyage photographique guidé en Côte d'Ivoire, incluant accompagnement par un photographe professionnel et droits d'images.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 65,
    fieldsJson: F([
      {key:'photographe_guide', label:"Photographe guide prestataire", type:'text', required:true},
      {key:'client', label:"Nom du client / groupe", type:'text', required:true},
      {key:'destinations_photo', label:"Destinations et sujets photographiques", type:'textarea', required:true},
      {key:'date_voyage', label:"Date du voyage photo", type:'date', required:true},
      {key:'tarif_personne', label:"Tarif par personne (FCFA)", type:'text', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PHOTOGRAPHIE ET TOURISME PHOTO</h1>
<p><strong>Photographe-guide :</strong> {{photographe_guide}}</p>
<p><strong>Client :</strong> {{client}}</p>
<h2>Article 1 – Programme</h2>
<p>Date : {{date_voyage}}. Destinations et sujets : {{destinations_photo}}</p>
<h2>Article 2 – Accompagnement</h2>
<p>Le photographe-guide accompagne les participants, leur transmet des conseils techniques et négocie les droits de photographie auprès des sujets locaux.</p>
<h2>Article 3 – Droits d'images</h2>
<p>Les photos sont destinées à usage personnel. Toute exploitation commerciale des images des personnes ou lieux photographiés requiert une autorisation distincte.</p>
<h2>Article 4 – Tarif</h2>
<p>Tarif par personne : <strong>{{tarif_personne}} FCFA</strong>.</p>
<p style="margin-top:40px">Signatures : ____________________</p></div>`
  },
  {
    code: 'tour2_tourisme_gastronomique',
    name: "Accord de Service de Tourisme Gastronomique",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 13000,
    description: "Accord de circuit gastronomique découvrant la cuisine traditionnelle ivoirienne et ouest-africaine (attiéké, foutou, aloco, kedjénou), avec cours de cuisine.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 73,
    fieldsJson: F([
      {key:'operateur_gastro', label:"Opérateur gastronomique prestataire", type:'text', required:true},
      {key:'client', label:"Nom du groupe client", type:'text', required:true},
      {key:'plats_programmes', label:"Plats et expériences culinaires au programme", type:'textarea', required:true},
      {key:'date_circuit', label:"Date du circuit gastronomique", type:'date', required:true},
      {key:'tarif_personne', label:"Tarif par personne (FCFA)", type:'text', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TOURISME GASTRONOMIQUE</h1>
<p><strong>Opérateur :</strong> {{operateur_gastro}}</p>
<p><strong>Client :</strong> {{client}}</p>
<h2>Article 1 – Programme culinaire</h2>
<p>Date : {{date_circuit}}. Au menu : {{plats_programmes}}</p>
<h2>Article 2 – Cours de cuisine</h2>
<p>Les participants auront l'occasion de préparer un plat traditionnel accompagnés par un chef cuisinier local.</p>
<h2>Article 3 – Tarif</h2>
<p>Tarif tout compris par personne : <strong>{{tarif_personne}} FCFA</strong> (visites marchés, cours, repas, dégustation, boissons locales).</p>
<p style="margin-top:40px">Signatures : ____________________</p></div>`
  },
  {
    code: 'tour2_reservation_activites_ota',
    name: "Accord de Service de Réservation Activités Touristiques (OTA Locale)",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 15000,
    description: "Accord entre une plateforme OTA locale et un opérateur d'activités touristiques pour la distribution en ligne des expériences en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 70,
    fieldsJson: F([
      {key:'plateforme_ota', label:"Plateforme OTA locale", type:'text', required:true},
      {key:'operateur_activites', label:"Opérateur d'activités touristiques", type:'text', required:true},
      {key:'activites_referencees', label:"Activités référencées sur la plateforme", type:'textarea', required:true},
      {key:'commission_ota', label:"Commission OTA par réservation (%)", type:'text', required:true},
      {key:'delai_paiement', label:"Délai de reversement (jours après prestation)", type:'text', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RÉSERVATION D'ACTIVITÉS TOURISTIQUES (OTA LOCALE)</h1>
<p><strong>Plateforme OTA :</strong> {{plateforme_ota}}</p>
<p><strong>Opérateur :</strong> {{operateur_activites}}</p>
<h2>Article 1 – Référencement</h2>
<p>L'opérateur autorise la plateforme à commercialiser les activités suivantes : {{activites_referencees}}</p>
<h2>Article 2 – Commission</h2>
<p>Commission OTA par réservation confirmée : <strong>{{commission_ota}} %</strong> du prix de vente net.</p>
<h2>Article 3 – Reversement</h2>
<p>Les fonds collectés sont reversés à l'opérateur sous <strong>{{delai_paiement}} jours</strong> après la prestation.</p>
<p style="margin-top:40px">Signatures : ____________________</p></div>`
  },
  {
    code: 'tour2_traduction_guide_culturel',
    name: "Accord de Service de Traduction et Guide Culturel",
    category: 'commercial_financier',
    price: 3000,
    priceMax: 9000,
    description: "Accord de prestation de guide-interprète culturel pour accueillir des groupes étrangers en Côte d'Ivoire, avec traduction simultanée et médiation interculturelle.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 68,
    fieldsJson: F([
      {key:'guide_interprete', label:"Nom du guide-interprète", type:'text', required:true},
      {key:'client_agence', label:"Agence cliente", type:'text', required:true},
      {key:'langues_travail', label:"Langues de travail (source / cible)", type:'text', required:true},
      {key:'dates_mission', label:"Dates de la mission", type:'text', required:true},
      {key:'tarif_journalier', label:"Tarif journalier (FCFA)", type:'text', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TRADUCTION ET GUIDE CULTUREL</h1>
<p><strong>Guide-interprète :</strong> {{guide_interprete}}</p>
<p><strong>Client :</strong> {{client_agence}}</p>
<h2>Article 1 – Mission</h2>
<p>Langues de travail : <strong>{{langues_travail}}</strong>. Mission du {{dates_mission}}.</p>
<h2>Article 2 – Rémunération</h2>
<p>Tarif journalier : <strong>{{tarif_journalier}} FCFA</strong>, frais de déplacement et d'hébergement non inclus.</p>
<h2>Article 3 – Confidentialité</h2>
<p>Le guide-interprète s'engage à la confidentialité sur les conversations et informations confidentielles échangées lors de la mission.</p>
<p style="margin-top:40px">Signatures : ____________________</p></div>`
  },
  {
    code: 'tour2_partenariat_hotel_tour_operator',
    name: "Accord de Partenariat Hôtel-Tour Operator",
    category: 'commercial_financier',
    price: 6000,
    priceMax: 18000,
    description: "Accord-cadre annuel de partenariat entre un hôtel et un tour-opérateur pour l'intégration de l'hôtel dans les circuits et forfaits touristiques commercialisés.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 75,
    fieldsJson: F([
      {key:'nom_hotel', label:"Nom de l'hôtel", type:'text', required:true},
      {key:'tour_operateur', label:"Tour-opérateur partenaire", type:'text', required:true},
      {key:'tarif_contractuel', label:"Tarif contractuel chambre/nuit (FCFA)", type:'text', required:true},
      {key:'volume_annuel_garanti', label:"Volume annuel de nuitées garanti", type:'text', required:true},
      {key:'conditions_release', label:"Conditions de libération des allotements", type:'textarea', required:false},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT HÔTEL – TOUR-OPÉRATEUR</h1>
<p><strong>Hôtel :</strong> {{nom_hotel}}</p>
<p><strong>Tour-opérateur :</strong> {{tour_operateur}}</p>
<h2>Article 1 – Tarification contractuelle</h2>
<p>Tarif chambre/nuit convenu : <strong>{{tarif_contractuel}} FCFA</strong>, valable pour la saison touristique en cours.</p>
<h2>Article 2 – Volume garanti</h2>
<p>Le tour-opérateur garantit un minimum de <strong>{{volume_annuel_garanti}} nuitées</strong> sur l'année civile.</p>
<h2>Article 3 – Allotements</h2>
<p>{{conditions_release}}</p>
<h2>Article 4 – Révision tarifaire</h2>
<p>Les tarifs sont révisables annuellement avec un préavis de 90 jours avant la nouvelle saison.</p>
<p style="margin-top:40px">Signatures : ____________________</p></div>`
  },
  {
    code: 'tour2_rapport_performance_tourisme',
    name: "Rapport de Performance Tourisme",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 12000,
    description: "Modèle de rapport trimestriel de performance pour opérateurs touristiques en Afrique de l'Ouest, incluant fréquentation, revenus, satisfaction client et projections.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 65,
    fieldsJson: F([
      {key:'nom_operateur', label:"Nom de l'opérateur touristique", type:'text', required:true},
      {key:'periode_rapport', label:"Période du rapport (ex. T2 2025)", type:'text', required:true},
      {key:'nombre_touristes', label:"Nombre de touristes accueillis", type:'text', required:true},
      {key:'chiffre_affaires', label:"Chiffre d'affaires de la période (FCFA)", type:'text', required:true},
      {key:'taux_satisfaction', label:"Taux de satisfaction client (%)", type:'text', required:true},
      {key:'analyse_perspectives', label:"Analyse et perspectives", type:'textarea', required:false},
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE TOURISME</h1>
<p><strong>Opérateur :</strong> {{nom_operateur}} — <strong>Période :</strong> {{periode_rapport}}</p>
<h2>Indicateurs Clés</h2>
<table style="width:100%;border-collapse:collapse">
  <tr style="background:#f0f0f0"><th style="border:1px solid #ccc;padding:6px">Indicateur</th><th style="border:1px solid #ccc;padding:6px">Valeur</th></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Touristes accueillis</td><td style="border:1px solid #ccc;padding:6px">{{nombre_touristes}}</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Chiffre d'affaires</td><td style="border:1px solid #ccc;padding:6px">{{chiffre_affaires}} FCFA</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Satisfaction client</td><td style="border:1px solid #ccc;padding:6px">{{taux_satisfaction}} %</td></tr>
</table>
<h2>Analyse et Perspectives</h2>
<p>{{analyse_perspectives}}</p>
<p style="margin-top:40px">Responsable : ____________________</p></div>`
  },
  {
    code: 'tour2_plan_ecotourisme',
    name: "Plan de Développement Écotourisme",
    category: 'commercial_financier',
    price: 10000,
    priceMax: 32000,
    description: "Document stratégique de développement d'un projet écotouristique durable en Côte d'Ivoire, intégrant conservation de la biodiversité et développement économique local.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 68,
    fieldsJson: F([
      {key:'porteur_projet', label:"Porteur du projet écotouristique", type:'text', required:true},
      {key:'zone_projet', label:"Zone géographique du projet", type:'text', required:true},
      {key:'objectifs_conservation', label:"Objectifs de conservation et biodiversité", type:'textarea', required:true},
      {key:'investissement_prevu', label:"Investissement total prévu (FCFA)", type:'text', required:true},
      {key:'partenaires_envisages', label:"Partenaires financiers et institutionnels envisagés", type:'textarea', required:false},
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT ÉCOTOURISME</h1>
<p><strong>Porteur de projet :</strong> {{porteur_projet}}</p>
<p><strong>Zone d'intervention :</strong> {{zone_projet}}</p>
<h2>1. Vision et Objectifs</h2>
<p>{{objectifs_conservation}}</p>
<h2>2. Plan d'investissement</h2>
<p>Investissement total : <strong>{{investissement_prevu}} FCFA</strong> sur 3 à 5 ans, couvrant les infrastructures légères, la formation des guides et la certification écologique.</p>
<h2>3. Partenariats</h2>
<p>{{partenaires_envisages}}</p>
<h2>4. Indicateurs de succès</h2>
<p>Nombre de touristes accueillis, revenus générés pour les communautés locales, surface d'écosystème préservée, satisfaction des visiteurs.</p>
<p style="margin-top:40px">Date : ____________________</p></div>`
  },
  {
    code: 'tour2_labellisation_site',
    name: "Accord de Labellisation Site Touristique",
    category: 'commercial_financier',
    price: 6000,
    priceMax: 18000,
    description: "Accord entre une autorité de labellisation touristique et un site pour l'attribution d'un label de qualité, définissant critères, audit et obligations de maintien du label.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 62,
    fieldsJson: F([
      {key:'organisme_label', label:"Organisme de labellisation", type:'text', required:true},
      {key:'gestionnaire_site', label:"Gestionnaire du site touristique", type:'text', required:true},
      {key:'nom_site', label:"Nom du site touristique", type:'text', required:true},
      {key:'label_attribue', label:"Label attribué (ex. Étoile verte, Site certifié)", type:'text', required:true},
      {key:'criteres_maintien', label:"Critères de maintien du label", type:'textarea', required:true},
      {key:'duree_label', label:"Durée de validité du label (ans)", type:'text', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE LABELLISATION SITE TOURISTIQUE</h1>
<p><strong>Organisme de labellisation :</strong> {{organisme_label}}</p>
<p><strong>Gestionnaire :</strong> {{gestionnaire_site}}</p>
<p><strong>Site :</strong> {{nom_site}}</p>
<h2>Article 1 – Attribution du label</h2>
<p>Le label <strong>{{label_attribue}}</strong> est accordé au site {{nom_site}} pour une durée de <strong>{{duree_label}} ans</strong>.</p>
<h2>Article 2 – Critères de maintien</h2>
<p>{{criteres_maintien}}</p>
<h2>Article 3 – Audit de renouvellement</h2>
<p>Un audit de renouvellement sera conduit 6 mois avant l'expiration du label pour évaluer la conformité du site aux exigences en vigueur.</p>
<p style="margin-top:40px">Signatures : ____________________</p></div>`
  },
  {
    code: 'tour2_charte_tourisme_responsable',
    name: "Charte du Tourisme Responsable en Afrique",
    category: 'commercial_financier',
    price: 2000,
    priceMax: 7000,
    description: "Charte éthique du tourisme responsable et durable en Afrique de l'Ouest, à adopter par les opérateurs touristiques souhaitant s'engager pour un tourisme respectueux des personnes et de l'environnement.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 78,
    fieldsJson: F([
      {key:'operateur_signataire', label:"Opérateur touristique signataire", type:'text', required:true},
      {key:'representant', label:"Nom du représentant légal", type:'text', required:true},
      {key:'engagements_specifiques', label:"Engagements spécifiques pris par l'opérateur", type:'textarea', required:true},
      {key:'date_signature', label:"Date de signature de la charte", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>CHARTE DU TOURISME RESPONSABLE EN AFRIQUE</h1>
<p>Adoptée par <strong>{{operateur_signataire}}</strong>, représenté par <strong>{{representant}}</strong>.</p>
<h2>Préambule</h2>
<p>Conscients de la richesse culturelle, naturelle et humaine de l'Afrique de l'Ouest, nous nous engageons à pratiquer un tourisme qui respecte les communautés locales, préserve l'environnement et génère des bénéfices économiques équitables.</p>
<h2>Principes Fondamentaux</h2>
<ol>
  <li>Respecter les cultures et traditions locales.</li>
  <li>Minimiser l'impact environnemental de nos activités.</li>
  <li>Favoriser l'emploi et les achats locaux.</li>
  <li>Garantir la sécurité et le bien-être des touristes et des hôtes.</li>
  <li>Lutter contre toute forme d'exploitation dans le secteur touristique.</li>
</ol>
<h2>Engagements Spécifiques</h2>
<p>{{engagements_specifiques}}</p>
<p style="margin-top:40px">Signé le {{date_signature}} par {{representant}}</p>
<p>Signature : ____________________</p></div>`
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
  console.log(`Batch 55a OK — créés:${created} maj:${updated} TOTAL:${total}`);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
