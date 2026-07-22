import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [

  // ─── DROIT CIVIL / FAMILLE (25 templates) ───────────────────────────────────

  {
    code: 'droit_mariage_communaute',
    name: "Contrat de mariage - Régime de communauté réduite aux acquêts (OHADA)",
    category: 'juridique_admin', price: 12000, priceMax: 40000,
    description: "Contrat de mariage établissant le régime de communauté réduite aux acquêts conforme au droit OHADA et aux législations en vigueur en Côte d\'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 80,
    fieldsJson: F([
      {key:'epoux_nom',label:"Nom et prénoms de l\'époux",type:'text',required:true},
      {key:'epouse_nom',label:"Nom et prénoms de l\'épouse",type:'text',required:true},
      {key:'date_mariage',label:"Date prévue du mariage",type:'date',required:true},
      {key:'lieu_mariage',label:"Lieu de célébration du mariage",type:'text',required:true},
      {key:'biens_propres',label:"Description des biens propres apportés",type:'textarea',required:false},
      {key:'notaire_nom',label:"Nom du notaire instrumentaire",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE MARIAGE</h1><h2>Régime de communauté réduite aux acquêts — Droit OHADA</h2><p>Entre Monsieur <strong>{{epoux_nom}}</strong> et Madame <strong>{{epouse_nom}}</strong>, futurs époux, ayant convenu de contracter mariage le <strong>{{date_mariage}}</strong> à <strong>{{lieu_mariage}}</strong>.</p><h3>Article 1 — Régime matrimonial choisi</h3><p>Les futurs époux déclarent adopter le régime de la communauté réduite aux acquêts. Seuls les biens acquis ensemble ou séparément pendant le mariage seront communs.</p><h3>Article 2 — Biens propres</h3><p>{{biens_propres}}</p><h3>Article 3 — Gestion des biens communs</h3><p>Chaque époux aura les pouvoirs de gestion sur les biens communs dans les conditions prévues par la loi.</p><p>Reçu en minute par Maître <strong>{{notaire_nom}}</strong>, Notaire.</p></div>`
  },

  {
    code: 'droit_mariage_separation',
    name: "Contrat de mariage - Régime de séparation de biens",
    category: 'juridique_admin', price: 10000, priceMax: 35000,
    description: "Contrat de mariage sous le régime de la séparation de biens, permettant à chaque époux de conserver la propriété exclusive de ses biens présents et futurs.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 75,
    fieldsJson: F([
      {key:'epoux_nom',label:"Nom et prénoms de l\'époux",type:'text',required:true},
      {key:'epouse_nom',label:"Nom et prénoms de l\'épouse",type:'text',required:true},
      {key:'date_mariage',label:"Date prévue du mariage",type:'date',required:true},
      {key:'epoux_profession',label:"Profession de l\'époux",type:'text',required:true},
      {key:'epouse_profession',label:"Profession de l\'épouse",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE MARIAGE</h1><h2>Régime de séparation de biens</h2><p>Entre Monsieur <strong>{{epoux_nom}}</strong>, {{epoux_profession}}, et Madame <strong>{{epouse_nom}}</strong>, {{epouse_profession}}, devant contracter mariage le <strong>{{date_mariage}}</strong>.</p><h3>Article 1 — Principe de la séparation</h3><p>Chaque époux conservera la propriété, l\'administration et la jouissance de ses biens personnels, tant ceux possédés au jour du mariage que ceux acquis postérieurement.</p><h3>Article 2 — Dettes personnelles</h3><p>Chaque époux demeure seul responsable de ses dettes personnelles, présentes et futures.</p><h3>Article 3 — Contribution aux charges du mariage</h3><p>Les époux contribueront aux charges du mariage à proportion de leurs facultés respectives.</p></div>`
  },

  {
    code: 'droit_concubinage',
    name: "Convention de concubinage",
    category: 'juridique_admin', price: 5000, priceMax: 15000,
    description: "Convention organisant les droits et obligations entre partenaires vivant en union libre, notamment la gestion des biens et des charges communes.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'partenaire1_nom',label:"Nom et prénoms du partenaire 1",type:'text',required:true},
      {key:'partenaire2_nom',label:"Nom et prénoms du partenaire 2",type:'text',required:true},
      {key:'adresse_commune',label:"Adresse du domicile commun",type:'text',required:true},
      {key:'date_debut',label:"Date de début de la vie commune",type:'date',required:true},
      {key:'modalites_charges',label:"Modalités de répartition des charges",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>CONVENTION DE CONCUBINAGE</h1><p>Entre <strong>{{partenaire1_nom}}</strong> et <strong>{{partenaire2_nom}}</strong>, vivant en concubinage depuis le <strong>{{date_debut}}</strong> au <strong>{{adresse_commune}}</strong>.</p><h3>Article 1 — Objet</h3><p>La présente convention a pour objet d\'organiser les relations patrimoniales entre les concubins.</p><h3>Article 2 — Répartition des charges</h3><p>{{modalites_charges}}</p><h3>Article 3 — Biens</h3><p>Chaque partenaire conserve la propriété des biens qu\'il possède ou acquiert à titre personnel.</p></div>`
  },

  {
    code: 'droit_pacs_afrique',
    name: "Pacte civil de solidarité (PACS Afrique)",
    category: 'juridique_admin', price: 6000, priceMax: 18000,
    description: "Pacte civil de solidarité adapté au contexte juridique africain, organisant la vie commune et les engagements mutuels entre deux personnes.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'partenaire1_nom',label:"Identité du partenaire 1",type:'text',required:true},
      {key:'partenaire2_nom',label:"Identité du partenaire 2",type:'text',required:true},
      {key:'date_pacte',label:"Date de conclusion du pacte",type:'date',required:true},
      {key:'engagements',label:"Engagements mutuels convenus",type:'textarea',required:true},
      {key:'duree',label:"Durée et conditions de dissolution",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>PACTE CIVIL DE SOLIDARITÉ</h1><p>Conclu le <strong>{{date_pacte}}</strong> entre <strong>{{partenaire1_nom}}</strong> et <strong>{{partenaire2_nom}}</strong>.</p><h3>Article 1 — Engagement mutuel</h3><p>Les partenaires s\'engagent à une vie commune et à une aide matérielle et morale réciproque.</p><h3>Article 2 — Obligations convenues</h3><p>{{engagements}}</p><h3>Article 3 — Dissolution</h3><p>{{duree}}</p></div>`
  },

  {
    code: 'droit_reconnaissance_paternite',
    name: "Accord de reconnaissance de paternité",
    category: 'juridique_admin', price: 4000, priceMax: 12000,
    description: "Document par lequel un homme reconnaît officiellement être le père d\'un enfant, conforme aux dispositions du Code de la Famille applicable en Côte d\'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'pere_nom',label:"Nom et prénoms du père",type:'text',required:true},
      {key:'mere_nom',label:"Nom et prénoms de la mère",type:'text',required:true},
      {key:'enfant_nom',label:"Nom et prénoms de l\'enfant",type:'text',required:true},
      {key:'enfant_naissance',label:"Date de naissance de l\'enfant",type:'date',required:true},
      {key:'lieu_naissance',label:"Lieu de naissance de l\'enfant",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACTE DE RECONNAISSANCE DE PATERNITÉ</h1><p>Je soussigné <strong>{{pere_nom}}</strong>, déclare reconnaître être le père de l\'enfant <strong>{{enfant_nom}}</strong>, né(e) le <strong>{{enfant_naissance}}</strong> à <strong>{{lieu_naissance}}</strong>, de <strong>{{mere_nom}}</strong>.</p><h3>Effets de la reconnaissance</h3><p>La présente reconnaissance emporte tous les effets de la filiation paternelle conformément au droit en vigueur.</p><p>Fait et signé pour valoir ce que de droit.</p></div>`
  },

  {
    code: 'droit_garde_enfant',
    name: "Accord de garde d\'enfant (divorce amiable)",
    category: 'juridique_admin', price: 7000, priceMax: 20000,
    description: "Convention parentale fixant les modalités de garde, d\'hébergement et d\'éducation de l\'enfant dans le cadre d\'un divorce par consentement mutuel.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 78,
    fieldsJson: F([
      {key:'parent1_nom',label:"Nom du parent 1",type:'text',required:true},
      {key:'parent2_nom',label:"Nom du parent 2",type:'text',required:true},
      {key:'enfant_nom',label:"Nom de l\'enfant",type:'text',required:true},
      {key:'modalite_garde',label:"Modalités de garde (résidence principale, alternance...)",type:'textarea',required:true},
      {key:'calendrier_visites',label:"Calendrier de visites et vacances",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>CONVENTION DE GARDE D\'ENFANT</h1><p>Entre <strong>{{parent1_nom}}</strong> et <strong>{{parent2_nom}}</strong>, parents de <strong>{{enfant_nom}}</strong>.</p><h3>Article 1 — Modalités de garde</h3><p>{{modalite_garde}}</p><h3>Article 2 — Droit de visite et calendrier</h3><p>{{calendrier_visites}}</p><h3>Article 3 — Intérêt supérieur de l\'enfant</h3><p>Les parents s\'engagent à placer en toutes circonstances l\'intérêt supérieur de l\'enfant au premier plan.</p></div>`
  },

  {
    code: 'droit_pension_alimentaire',
    name: "Accord de pension alimentaire",
    category: 'juridique_admin', price: 5000, priceMax: 15000,
    description: "Convention fixant le montant et les modalités de versement de la pension alimentaire au profit de l\'enfant ou du conjoint après séparation.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'debiteur_nom',label:"Nom du débiteur de la pension",type:'text',required:true},
      {key:'creancier_nom',label:"Nom du créancier (bénéficiaire)",type:'text',required:true},
      {key:'montant_mensuel',label:"Montant mensuel en FCFA",type:'text',required:true},
      {key:'date_debut',label:"Date de début de versement",type:'date',required:true},
      {key:'modalites_paiement',label:"Modalités de paiement",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PENSION ALIMENTAIRE</h1><p><strong>{{debiteur_nom}}</strong> s\'engage à verser à <strong>{{creancier_nom}}</strong> une pension alimentaire mensuelle de <strong>{{montant_mensuel}} FCFA</strong>, à compter du <strong>{{date_debut}}</strong>.</p><h3>Modalités de paiement</h3><p>{{modalites_paiement}}</p><h3>Révision</h3><p>La pension pourra être révisée en cas de changement substantiel de la situation des parties.</p></div>`
  },

  {
    code: 'droit_droit_visite',
    name: "Accord de droit de visite et d\'hébergement",
    category: 'juridique_admin', price: 5000, priceMax: 15000,
    description: "Convention organisant les droits de visite et d\'hébergement du parent non gardien, dans l\'intérêt de l\'enfant.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'parent_gardien',label:"Nom du parent gardien",type:'text',required:true},
      {key:'parent_visiteur',label:"Nom du parent visiteur",type:'text',required:true},
      {key:'enfant_nom',label:"Nom(s) de l\'enfant / des enfants",type:'text',required:true},
      {key:'planning_visite',label:"Planning détaillé des visites",type:'textarea',required:true},
      {key:'conditions_hebergement',label:"Conditions d\'hébergement durant les vacances",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE DROIT DE VISITE ET D\'HÉBERGEMENT</h1><p>Entre <strong>{{parent_gardien}}</strong> (parent gardien) et <strong>{{parent_visiteur}}</strong> (parent visiteur) concernant <strong>{{enfant_nom}}</strong>.</p><h3>Planning des visites</h3><p>{{planning_visite}}</p><h3>Hébergement durant les vacances</h3><p>{{conditions_hebergement}}</p></div>`
  },

  {
    code: 'droit_mainlevee_tutelle',
    name: "Accord de mainlevée de tutelle",
    category: 'juridique_admin', price: 6000, priceMax: 18000,
    description: "Acte juridique mettant fin à la mesure de tutelle sur un mineur ou un majeur protégé, suite à la disparition des causes ayant justifié son ouverture.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 50,
    fieldsJson: F([
      {key:'tuteur_nom',label:"Nom du tuteur",type:'text',required:true},
      {key:'pupille_nom',label:"Nom du pupille (personne sous tutelle)",type:'text',required:true},
      {key:'date_ouverture',label:"Date d\'ouverture de la tutelle",type:'date',required:true},
      {key:'motif_mainlevee',label:"Motif de la mainlevée",type:'textarea',required:true},
      {key:'date_mainlevee',label:"Date de prise d\'effet de la mainlevée",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE MAINLEVÉE DE TUTELLE</h1><p>Il est mis fin à la mesure de tutelle ouverte le <strong>{{date_ouverture}}</strong> au profit de <strong>{{pupille_nom}}</strong>, placé(e) sous la tutelle de <strong>{{tuteur_nom}}</strong>.</p><h3>Motif</h3><p>{{motif_mainlevee}}</p><p>La mainlevée prend effet au <strong>{{date_mainlevee}}</strong>.</p></div>`
  },

  {
    code: 'droit_curatelle',
    name: "Accord de curatelle simplifiée",
    category: 'juridique_admin', price: 6000, priceMax: 18000,
    description: "Convention instituant une curatelle simplifiée pour assister une personne majeure dont les facultés sont altérées dans les actes de la vie civile.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 48,
    fieldsJson: F([
      {key:'curateur_nom',label:"Nom du curateur désigné",type:'text',required:true},
      {key:'majeur_nom',label:"Nom du majeur protégé",type:'text',required:true},
      {key:'motif_curatelle',label:"Motif de l\'ouverture de la curatelle",type:'textarea',required:true},
      {key:'date_prise_effet',label:"Date de prise d\'effet",type:'date',required:true},
      {key:'actes_concernes',label:"Actes nécessitant l\'assistance du curateur",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CURATELLE SIMPLIFIÉE</h1><p><strong>{{curateur_nom}}</strong> est désigné curateur de <strong>{{majeur_nom}}</strong> à compter du <strong>{{date_prise_effet}}</strong>.</p><h3>Motif</h3><p>{{motif_curatelle}}</p><h3>Actes soumis à assistance</h3><p>{{actes_concernes}}</p></div>`
  },

  {
    code: 'droit_adoption_simple',
    name: "Accord d\'adoption simple",
    category: 'juridique_admin', price: 8000, priceMax: 25000,
    description: "Document relatif à l\'adoption simple d\'un enfant, maintenant des liens juridiques avec la famille d\'origine tout en créant de nouveaux liens de filiation.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 55,
    fieldsJson: F([
      {key:'adoptant_nom',label:"Nom et prénoms de l\'adoptant",type:'text',required:true},
      {key:'adopte_nom',label:"Nom et prénoms de l\'adopté",type:'text',required:true},
      {key:'date_naissance_adopte',label:"Date de naissance de l\'adopté",type:'date',required:true},
      {key:'consentement',label:"Déclaration de consentement des parties",type:'textarea',required:true},
      {key:'conditions_adoption',label:"Conditions et engagements de l\'adoptant",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D\'ADOPTION SIMPLE</h1><p><strong>{{adoptant_nom}}</strong> sollicite l\'adoption simple de <strong>{{adopte_nom}}</strong>, né(e) le <strong>{{date_naissance_adopte}}</strong>.</p><h3>Consentement</h3><p>{{consentement}}</p><h3>Engagements</h3><p>{{conditions_adoption}}</p><h3>Effets de l\'adoption simple</h3><p>L\'adoption simple crée un lien de filiation entre l\'adoptant et l\'adopté tout en maintenant les liens avec la famille d\'origine.</p></div>`
  },

  {
    code: 'droit_adoption_pleniere',
    name: "Accord d\'adoption plénière",
    category: 'juridique_admin', price: 9000, priceMax: 28000,
    description: "Document relatif à l\'adoption plénière, créant un lien de filiation exclusif entre l\'adoptant et l\'adopté, remplaçant la filiation d\'origine.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 52,
    fieldsJson: F([
      {key:'adoptant_nom',label:"Nom et prénoms de l\'adoptant",type:'text',required:true},
      {key:'adopte_nom',label:"Nom et prénoms de l\'adopté",type:'text',required:true},
      {key:'date_naissance_adopte',label:"Date de naissance de l\'adopté",type:'date',required:true},
      {key:'motif_adoption',label:"Motif et circonstances de l\'adoption",type:'textarea',required:true},
      {key:'declaration_rupture',label:"Déclaration de rupture des liens avec la famille d\'origine",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D\'ADOPTION PLÉNIÈRE</h1><p><strong>{{adoptant_nom}}</strong> sollicite l\'adoption plénière de <strong>{{adopte_nom}}</strong>, né(e) le <strong>{{date_naissance_adopte}}</strong>.</p><h3>Motif</h3><p>{{motif_adoption}}</p><h3>Rupture des liens d\'origine</h3><p>{{declaration_rupture}}</p><h3>Effets</h3><p>L\'adoption plénière confère à l\'adopté une filiation se substituant entièrement à la filiation d\'origine.</p></div>`
  },

  {
    code: 'droit_kafala',
    name: "Accord de kafala (recueil légal d\'enfant)",
    category: 'juridique_admin', price: 7000, priceMax: 20000,
    description: "Convention de kafala organisant le recueil légal d\'un enfant par une famille d\'accueil, dans le respect des traditions et du droit applicable.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 45,
    fieldsJson: F([
      {key:'famille_accueil',label:"Nom de la famille d\'accueil (kafil)",type:'text',required:true},
      {key:'enfant_nom',label:"Nom de l\'enfant recueilli (makfoul)",type:'text',required:true},
      {key:'date_prise_en_charge',label:"Date de prise en charge",type:'date',required:true},
      {key:'engagements_famille',label:"Engagements de la famille d\'accueil",type:'textarea',required:true},
      {key:'autorite_competente',label:"Autorité ayant approuvé la kafala",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE KAFALA — RECUEIL LÉGAL D\'ENFANT</h1><p>La famille <strong>{{famille_accueil}}</strong> s\'engage à recueillir et à prendre en charge l\'enfant <strong>{{enfant_nom}}</strong> à compter du <strong>{{date_prise_en_charge}}</strong>, selon les termes approuvés par <strong>{{autorite_competente}}</strong>.</p><h3>Engagements</h3><p>{{engagements_famille}}</p><h3>Nature de la kafala</h3><p>La kafala constitue un recueil légal et ne crée pas de lien d\'adoption au sens du droit civil.</p></div>`
  },

  {
    code: 'droit_changement_prenom',
    name: "Accord de changement de prénom",
    category: 'juridique_admin', price: 4000, priceMax: 12000,
    description: "Demande de changement de prénom motivée par un intérêt légitime, conformément aux dispositions légales en vigueur.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 55,
    fieldsJson: F([
      {key:'demandeur_nom',label:"Nom et prénoms actuels du demandeur",type:'text',required:true},
      {key:'prenom_actuel',label:"Prénom(s) actuel(s) à modifier",type:'text',required:true},
      {key:'nouveau_prenom',label:"Nouveau prénom souhaité",type:'text',required:true},
      {key:'motif',label:"Motif légitime du changement",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>DEMANDE DE CHANGEMENT DE PRÉNOM</h1><p>Je soussigné(e) <strong>{{demandeur_nom}}</strong> sollicite le changement de mon prénom <strong>{{prenom_actuel}}</strong> en <strong>{{nouveau_prenom}}</strong>.</p><h3>Motif</h3><p>{{motif}}</p><p>Je certifie l\'exactitude des informations fournies et sollicite qu\'il soit fait droit à ma demande.</p></div>`
  },

  {
    code: 'droit_changement_nom',
    name: "Accord de changement de nom de famille",
    category: 'juridique_admin', price: 5000, priceMax: 15000,
    description: "Demande de changement de nom de famille pour motif légitime, déposée auprès des autorités compétentes de l\'état civil.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 50,
    fieldsJson: F([
      {key:'demandeur_identite',label:"Identité complète du demandeur",type:'text',required:true},
      {key:'nom_actuel',label:"Nom de famille actuel",type:'text',required:true},
      {key:'nouveau_nom',label:"Nouveau nom souhaité",type:'text',required:true},
      {key:'motif_changement',label:"Motif du changement de nom",type:'textarea',required:true},
      {key:'pieces_jointes',label:"Pièces justificatives jointes",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>DEMANDE DE CHANGEMENT DE NOM DE FAMILLE</h1><p><strong>{{demandeur_identite}}</strong> sollicite le remplacement du nom <strong>{{nom_actuel}}</strong> par le nom <strong>{{nouveau_nom}}</strong>.</p><h3>Motif</h3><p>{{motif_changement}}</p><h3>Pièces jointes</h3><p>{{pieces_jointes}}</p></div>`
  },

  {
    code: 'droit_succession_amiable',
    name: "Accord de succession amiable (partage)",
    category: 'juridique_admin', price: 10000, priceMax: 35000,
    description: "Convention de partage amiable des biens d\'une succession entre héritiers, évitant le recours judiciaire et fixant les droits de chacun.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 74,
    fieldsJson: F([
      {key:'defunt_nom',label:"Nom et prénoms du défunt",type:'text',required:true},
      {key:'date_deces',label:"Date du décès",type:'date',required:true},
      {key:'heritiers',label:"Liste des héritiers et leurs droits",type:'textarea',required:true},
      {key:'biens_a_partager',label:"Description des biens à partager",type:'textarea',required:true},
      {key:'repartition',label:"Modalités de répartition convenues",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SUCCESSION AMIABLE</h1><h2>Partage de la succession de {{defunt_nom}}</h2><p>Décédé(e) le <strong>{{date_deces}}</strong>.</p><h3>Héritiers</h3><p>{{heritiers}}</p><h3>Biens composant la succession</h3><p>{{biens_a_partager}}</p><h3>Répartition convenue</h3><p>{{repartition}}</p><p>Les héritiers déclarent la présente convention de partage amiable définitive et irrévocable.</p></div>`
  },

  {
    code: 'droit_donation_vifs',
    name: "Accord de donation entre vifs",
    category: 'juridique_admin', price: 8000, priceMax: 25000,
    description: "Acte de donation entre personnes vivantes, portant sur des biens mobiliers ou immobiliers, avec acceptation expresse du donataire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'donateur_nom',label:"Nom et prénoms du donateur",type:'text',required:true},
      {key:'donataire_nom',label:"Nom et prénoms du donataire",type:'text',required:true},
      {key:'objet_donation',label:"Description des biens donnés",type:'textarea',required:true},
      {key:'valeur_estimee',label:"Valeur estimée en FCFA",type:'text',required:true},
      {key:'date_prise_effet',label:"Date de prise d\'effet",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACTE DE DONATION ENTRE VIFS</h1><p><strong>{{donateur_nom}}</strong> (donateur) fait donation irrévocable à <strong>{{donataire_nom}}</strong> (donataire) des biens ci-après désignés.</p><h3>Objet de la donation</h3><p>{{objet_donation}}</p><p>Valeur estimée : <strong>{{valeur_estimee}} FCFA</strong>.</p><h3>Prise d\'effet</h3><p>La donation prend effet au <strong>{{date_prise_effet}}</strong>.</p><h3>Acceptation</h3><p>Le donataire déclare accepter la présente donation dans les termes et conditions ci-dessus.</p></div>`
  },

  {
    code: 'droit_donation_partage',
    name: "Accord de donation-partage",
    category: 'juridique_admin', price: 10000, priceMax: 30000,
    description: "Acte par lequel un ascendant distribue de son vivant tout ou partie de ses biens à ses héritiers présomptifs, avec acceptation expresse.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'donateur_nom',label:"Nom du donateur (ascendant)",type:'text',required:true},
      {key:'beneficiaires',label:"Liste des bénéficiaires et lots attribués",type:'textarea',required:true},
      {key:'biens_partages',label:"Description des biens faisant l\'objet du partage",type:'textarea',required:true},
      {key:'date_acte',label:"Date de l\'acte",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACTE DE DONATION-PARTAGE</h1><p><strong>{{donateur_nom}}</strong> procède à la donation-partage de ses biens entre ses héritiers présomptifs, le <strong>{{date_acte}}</strong>.</p><h3>Biens objet du partage</h3><p>{{biens_partages}}</p><h3>Attribution des lots</h3><p>{{beneficiaires}}</p><p>Chaque bénéficiaire déclare accepter son lot tel qu\'attribué, en l\'état.</p></div>`
  },

  {
    code: 'droit_renonciation_succession',
    name: "Accord de déclaration de renonciation à succession",
    category: 'juridique_admin', price: 5000, priceMax: 15000,
    description: "Déclaration par laquelle un héritier renonce expressément à sa part dans une succession, libérant ainsi sa part au profit des autres héritiers.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'renonciateur_nom',label:"Nom et prénoms du renonciateur",type:'text',required:true},
      {key:'defunt_nom',label:"Nom du défunt",type:'text',required:true},
      {key:'date_deces',label:"Date du décès",type:'date',required:true},
      {key:'motif_renonciation',label:"Motif de la renonciation (facultatif)",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>DÉCLARATION DE RENONCIATION À SUCCESSION</h1><p>Je soussigné(e) <strong>{{renonciateur_nom}}</strong>, héritier(ère) de <strong>{{defunt_nom}}</strong>, décédé(e) le <strong>{{date_deces}}</strong>, déclare renoncer expressément à toute part dans la succession du défunt.</p><h3>Motif</h3><p>{{motif_renonciation}}</p><p>La présente renonciation est définitive et irrévocable, faite en connaissance de cause.</p></div>`
  },

  {
    code: 'droit_testament_olographe',
    name: "Accord de testament olographe",
    category: 'juridique_admin', price: 4000, priceMax: 12000,
    description: "Testament entièrement écrit, daté et signé de la main du testateur, exprimant ses dernières volontés concernant la dévolution de ses biens.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'testateur_nom',label:"Nom et prénoms du testateur",type:'text',required:true},
      {key:'date_testament',label:"Date de rédaction du testament",type:'date',required:true},
      {key:'legs_principaux',label:"Description des legs et bénéficiaires désignés",type:'textarea',required:true},
      {key:'dispositions_speciales',label:"Dispositions particulières (funérailles, exécuteur...)",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>TESTAMENT OLOGRAPHE</h1><p>Je soussigné(e) <strong>{{testateur_nom}}</strong>, sain(e) de corps et d\'esprit, rédige le présent testament le <strong>{{date_testament}}</strong>.</p><h3>Mes dernières volontés</h3><p>{{legs_principaux}}</p><h3>Dispositions particulières</h3><p>{{dispositions_speciales}}</p><p>Je révoque par le présent testament tous testaments antérieurs.</p></div>`
  },

  {
    code: 'droit_testament_authentique',
    name: "Accord de testament authentique",
    category: 'juridique_admin', price: 8000, priceMax: 25000,
    description: "Testament reçu par un notaire en présence de témoins, offrant une sécurité juridique maximale quant aux dernières volontés du testateur.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      {key:'testateur_nom',label:"Nom et prénoms du testateur",type:'text',required:true},
      {key:'notaire_nom',label:"Nom du notaire instrumentaire",type:'text',required:true},
      {key:'date_reception',label:"Date de réception par le notaire",type:'date',required:true},
      {key:'legs_principaux',label:"Description des legs et désignation des légataires",type:'textarea',required:true},
      {key:'temoins',label:"Identité des témoins instrumentaires",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>TESTAMENT AUTHENTIQUE</h1><p>Reçu le <strong>{{date_reception}}</strong> par Maître <strong>{{notaire_nom}}</strong>, Notaire, en présence des témoins <strong>{{temoins}}</strong>.</p><p>Le testateur <strong>{{testateur_nom}}</strong> a déclaré ses dernières volontés comme suit :</p><h3>Dispositions testamentaires</h3><p>{{legs_principaux}}</p><p>Lecture faite, le testateur a approuvé le présent testament et l\'a signé avec le notaire et les témoins.</p></div>`
  },

  {
    code: 'droit_fiducie_ohada',
    name: "Accord de fiducie (trust OHADA)",
    category: 'juridique_admin', price: 12000, priceMax: 40000,
    description: "Contrat de fiducie conforme au droit OHADA, par lequel un constituant transfère des biens à un fiduciaire pour la réalisation d\'une mission définie.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 48,
    fieldsJson: F([
      {key:'constituant_nom',label:"Nom du constituant",type:'text',required:true},
      {key:'fiduciaire_nom',label:"Nom du fiduciaire",type:'text',required:true},
      {key:'beneficiaire_nom',label:"Nom du bénéficiaire",type:'text',required:true},
      {key:'biens_transferes',label:"Description des biens transférés en fiducie",type:'textarea',required:true},
      {key:'mission_fiduciaire',label:"Mission et objectifs du fiduciaire",type:'textarea',required:true},
      {key:'duree_fiducie',label:"Durée de la fiducie",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE FIDUCIE — DROIT OHADA</h1><p><strong>{{constituant_nom}}</strong> (constituant) transfère les biens ci-après à <strong>{{fiduciaire_nom}}</strong> (fiduciaire), au profit de <strong>{{beneficiaire_nom}}</strong> (bénéficiaire), pour une durée de <strong>{{duree_fiducie}}</strong>.</p><h3>Biens transférés</h3><p>{{biens_transferes}}</p><h3>Mission du fiduciaire</h3><p>{{mission_fiduciaire}}</p></div>`
  },

  {
    code: 'droit_vente_parts_familiales',
    name: "Accord de vente de parts sociales familiales",
    category: 'juridique_admin', price: 9000, priceMax: 28000,
    description: "Convention de cession de parts sociales entre membres d\'une même famille au sein d\'une société familiale, avec respect du droit de préemption.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'cedant_nom',label:"Nom du cédant",type:'text',required:true},
      {key:'cessionnaire_nom',label:"Nom du cessionnaire",type:'text',required:true},
      {key:'societe_nom',label:"Dénomination sociale de la société",type:'text',required:true},
      {key:'nombre_parts',label:"Nombre de parts cédées",type:'text',required:true},
      {key:'prix_cession',label:"Prix de cession en FCFA",type:'text',required:true},
      {key:'date_cession',label:"Date de la cession",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CESSION DE PARTS SOCIALES FAMILIALES</h1><p><strong>{{cedant_nom}}</strong> cède à <strong>{{cessionnaire_nom}}</strong> un total de <strong>{{nombre_parts}}</strong> parts dans la société <strong>{{societe_nom}}</strong>, au prix de <strong>{{prix_cession}} FCFA</strong>, avec effet au <strong>{{date_cession}}</strong>.</p><h3>Garanties</h3><p>Le cédant garantit la propriété des parts cédées et l\'absence de tout nantissement ou opposition.</p></div>`
  },

  {
    code: 'droit_mediation_familiale',
    name: "Rapport de médiation familiale",
    category: 'juridique_admin', price: 5000, priceMax: 15000,
    description: "Rapport établi à l\'issue d\'une médiation familiale, récapitulant les accords conclus entre les parties sur les points en litige.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'mediateur_nom',label:"Nom du médiateur",type:'text',required:true},
      {key:'parties_noms',label:"Noms des parties en médiation",type:'text',required:true},
      {key:'date_mediation',label:"Date de la séance de médiation",type:'date',required:true},
      {key:'points_accord',label:"Points d\'accord conclus",type:'textarea',required:true},
      {key:'points_desaccord',label:"Points restant en désaccord",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE MÉDIATION FAMILIALE</h1><p>Médiateur : <strong>{{mediateur_nom}}</strong> — Date : <strong>{{date_mediation}}</strong></p><p>Parties : <strong>{{parties_noms}}</strong></p><h3>Points d\'accord</h3><p>{{points_accord}}</p><h3>Points restant en suspens</h3><p>{{points_desaccord}}</p><p>Le présent rapport est signé par toutes les parties présentes.</p></div>`
  },

  {
    code: 'droit_charte_famille_afrique',
    name: "Charte de la famille et de la solidarité en Afrique",
    category: 'juridique_admin', price: 4000, priceMax: 12000,
    description: "Charte énonçant les valeurs, droits et obligations des membres d\'une famille élargie africaine, favorisant la cohésion et la gestion du patrimoine commun.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 55,
    fieldsJson: F([
      {key:'famille_nom',label:"Nom de la famille",type:'text',required:true},
      {key:'date_adoption',label:"Date d\'adoption de la charte",type:'date',required:true},
      {key:'valeurs_fondamentales',label:"Valeurs fondamentales de la famille",type:'textarea',required:true},
      {key:'regles_gestion_patrimoine',label:"Règles de gestion du patrimoine familial",type:'textarea',required:true},
      {key:'mecanisme_resolution_conflits',label:"Mécanisme de résolution des conflits",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>CHARTE DE LA FAMILLE ET DE LA SOLIDARITÉ EN AFRIQUE</h1><h2>Famille {{famille_nom}}</h2><p>Adoptée le <strong>{{date_adoption}}</strong> par les membres de la famille soussignés.</p><h3>Nos valeurs fondamentales</h3><p>{{valeurs_fondamentales}}</p><h3>Gestion du patrimoine familial</h3><p>{{regles_gestion_patrimoine}}</p><h3>Résolution des conflits</h3><p>{{mecanisme_resolution_conflits}}</p></div>`
  },

  // ─── NOTARIAT (25 templates) ─────────────────────────────────────────────────

  {
    code: 'notaire_vente_immobiliere',
    name: "Acte notarié de vente immobilière",
    category: 'juridique_admin', price: 15000, priceMax: 55000,
    description: "Acte authentique de vente immobilière reçu par notaire, constatant le transfert de propriété d\'un bien immeuble et opposable aux tiers.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 90,
    fieldsJson: F([
      {key:'vendeur_nom',label:"Nom et prénoms du vendeur",type:'text',required:true},
      {key:'acquereur_nom',label:"Nom et prénoms de l\'acquéreur",type:'text',required:true},
      {key:'designation_bien',label:"Désignation et description du bien",type:'textarea',required:true},
      {key:'prix_vente',label:"Prix de vente en FCFA",type:'text',required:true},
      {key:'date_acte',label:"Date de signature de l\'acte",type:'date',required:true},
      {key:'notaire_nom',label:"Nom du notaire",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACTE AUTHENTIQUE DE VENTE IMMOBILIÈRE</h1><p>Reçu le <strong>{{date_acte}}</strong> par Maître <strong>{{notaire_nom}}</strong>, Notaire.</p><h3>Parties</h3><p>Vendeur : <strong>{{vendeur_nom}}</strong> — Acquéreur : <strong>{{acquereur_nom}}</strong></p><h3>Désignation du bien</h3><p>{{designation_bien}}</p><h3>Prix</h3><p>Le prix de vente est fixé à <strong>{{prix_vente}} FCFA</strong>, payé comptant ce jour.</p><h3>Transfert de propriété</h3><p>La propriété du bien est transférée à l\'acquéreur à la date de signature du présent acte.</p></div>`
  },

  {
    code: 'notaire_hypotheque',
    name: "Acte notarié d\'hypothèque",
    category: 'juridique_admin', price: 12000, priceMax: 40000,
    description: "Acte authentique constituant une hypothèque sur un bien immeuble en garantie d\'une dette, avec inscription au livre foncier.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 80,
    fieldsJson: F([
      {key:'constituant_nom',label:"Nom du constituant de l\'hypothèque",type:'text',required:true},
      {key:'beneficiaire_nom',label:"Nom du bénéficiaire (créancier)",type:'text',required:true},
      {key:'bien_hypotheque',label:"Description du bien hypothéqué",type:'textarea',required:true},
      {key:'montant_garanti',label:"Montant de la créance garantie en FCFA",type:'text',required:true},
      {key:'date_acte',label:"Date de l\'acte",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACTE NOTARIÉ D\'HYPOTHÈQUE</h1><p><strong>{{constituant_nom}}</strong> constitue une hypothèque sur le bien ci-après désigné en faveur de <strong>{{beneficiaire_nom}}</strong>, en garantie d\'une créance de <strong>{{montant_garanti}} FCFA</strong>.</p><h3>Bien hypothéqué</h3><p>{{bien_hypotheque}}</p><p>Daté du <strong>{{date_acte}}</strong>.</p></div>`
  },

  {
    code: 'notaire_constitution_societe',
    name: "Acte notarié de constitution de société",
    category: 'juridique_admin', price: 13000, priceMax: 45000,
    description: "Acte authentique de constitution d\'une société commerciale (SARL, SA, SAS...) conforme au droit OHADA, avec dépôt des statuts.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 85,
    fieldsJson: F([
      {key:'denomination_sociale',label:"Dénomination sociale",type:'text',required:true},
      {key:'forme_juridique',label:"Forme juridique (SARL, SA, SAS...)",type:'text',required:true},
      {key:'capital_social',label:"Capital social en FCFA",type:'text',required:true},
      {key:'siege_social',label:"Adresse du siège social",type:'text',required:true},
      {key:'associes',label:"Liste des associés et apports",type:'textarea',required:true},
      {key:'date_constitution',label:"Date de constitution",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACTE DE CONSTITUTION DE SOCIÉTÉ</h1><p>Il est constitué entre les soussignés une société de forme <strong>{{forme_juridique}}</strong> dénommée <strong>{{denomination_sociale}}</strong>, au capital de <strong>{{capital_social}} FCFA</strong>, dont le siège social est fixé au <strong>{{siege_social}}</strong>.</p><h3>Associés et apports</h3><p>{{associes}}</p><p>Acte dressé le <strong>{{date_constitution}}</strong>.</p></div>`
  },

  {
    code: 'notaire_dissolution_societe',
    name: "Acte notarié de dissolution de société",
    category: 'juridique_admin', price: 10000, priceMax: 32000,
    description: "Acte authentique constatant la dissolution d\'une société, désignant le liquidateur et fixant les modalités de liquidation.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'societe_nom',label:"Dénomination sociale",type:'text',required:true},
      {key:'date_dissolution',label:"Date de dissolution",type:'date',required:true},
      {key:'motif_dissolution',label:"Motif de la dissolution",type:'textarea',required:true},
      {key:'liquidateur_nom',label:"Nom du liquidateur désigné",type:'text',required:true},
      {key:'modalites_liquidation',label:"Modalités de liquidation",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACTE NOTARIÉ DE DISSOLUTION DE SOCIÉTÉ</h1><p>La société <strong>{{societe_nom}}</strong> est dissoute à compter du <strong>{{date_dissolution}}</strong>.</p><h3>Motif</h3><p>{{motif_dissolution}}</p><h3>Liquidateur</h3><p><strong>{{liquidateur_nom}}</strong> est désigné liquidateur.</p><h3>Modalités de liquidation</h3><p>{{modalites_liquidation}}</p></div>`
  },

  {
    code: 'notaire_donation_immobiliere',
    name: "Acte notarié de donation immobilière",
    category: 'juridique_admin', price: 12000, priceMax: 40000,
    description: "Acte authentique de donation portant sur un bien immeuble, avec acceptation du donataire, transcription et publicité foncière.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'donateur_nom',label:"Nom du donateur",type:'text',required:true},
      {key:'donataire_nom',label:"Nom du donataire",type:'text',required:true},
      {key:'bien_donne',label:"Description du bien immeuble donné",type:'textarea',required:true},
      {key:'valeur_bien',label:"Valeur déclarée du bien en FCFA",type:'text',required:true},
      {key:'date_acte',label:"Date de l\'acte",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACTE NOTARIÉ DE DONATION IMMOBILIÈRE</h1><p><strong>{{donateur_nom}}</strong> fait donation à <strong>{{donataire_nom}}</strong> du bien immeuble suivant :</p><p>{{bien_donne}}</p><p>Valeur déclarée : <strong>{{valeur_bien}} FCFA</strong>.</p><p><strong>{{donataire_nom}}</strong> accepte la présente donation. Acte reçu le <strong>{{date_acte}}</strong>.</p></div>`
  },

  {
    code: 'notaire_partage_successoral',
    name: "Acte notarié de partage successoral",
    category: 'juridique_admin', price: 13000, priceMax: 45000,
    description: "Acte authentique de partage de la succession entre héritiers, constatant l\'attribution définitive des lots et mettant fin à l\'indivision.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 76,
    fieldsJson: F([
      {key:'defunt_nom',label:"Nom du défunt",type:'text',required:true},
      {key:'date_deces',label:"Date du décès",type:'date',required:true},
      {key:'heritiers_lots',label:"Héritiers et lots attribués",type:'textarea',required:true},
      {key:'biens_partages',label:"Description des biens objet du partage",type:'textarea',required:true},
      {key:'notaire_nom',label:"Nom du notaire",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACTE NOTARIÉ DE PARTAGE SUCCESSORAL</h1><p>Succession de <strong>{{defunt_nom}}</strong>, décédé(e) le <strong>{{date_deces}}</strong>, reçue par Maître <strong>{{notaire_nom}}</strong>.</p><h3>Biens partagés</h3><p>{{biens_partages}}</p><h3>Attribution des lots</h3><p>{{heritiers_lots}}</p><p>Le présent partage met fin à l\'indivision successorale.</p></div>`
  },

  {
    code: 'notaire_sci',
    name: "Acte notarié de constitution de SCI (Société Civile Immobilière)",
    category: 'juridique_admin', price: 13000, priceMax: 45000,
    description: "Acte authentique de constitution d\'une Société Civile Immobilière (SCI) pour la gestion collective d\'un patrimoine immobilier.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 78,
    fieldsJson: F([
      {key:'sci_denomination',label:"Dénomination de la SCI",type:'text',required:true},
      {key:'capital_social',label:"Capital social en FCFA",type:'text',required:true},
      {key:'siege_social',label:"Siège social",type:'text',required:true},
      {key:'associes_parts',label:"Associés et répartition des parts",type:'textarea',required:true},
      {key:'gerant_nom',label:"Nom du gérant",type:'text',required:true},
      {key:'date_constitution',label:"Date de constitution",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACTE DE CONSTITUTION DE SCI</h1><p>Société Civile Immobilière dénommée <strong>{{sci_denomination}}</strong>, au capital de <strong>{{capital_social}} FCFA</strong>, dont le siège est fixé au <strong>{{siege_social}}</strong>.</p><h3>Associés et parts</h3><p>{{associes_parts}}</p><h3>Gérance</h3><p><strong>{{gerant_nom}}</strong> est désigné gérant de la SCI.</p><p>Acte constitutif dressé le <strong>{{date_constitution}}</strong>.</p></div>`
  },

  {
    code: 'notaire_bail_commercial_notarie',
    name: "Acte notarié de bail commercial notarié",
    category: 'juridique_admin', price: 10000, priceMax: 32000,
    description: "Bail commercial reçu en forme authentique par notaire, offrant une sécurité juridique renforcée au bailleur et au preneur.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 74,
    fieldsJson: F([
      {key:'bailleur_nom',label:"Nom du bailleur",type:'text',required:true},
      {key:'preneur_nom',label:"Nom du preneur",type:'text',required:true},
      {key:'designation_locaux',label:"Désignation des locaux commerciaux",type:'textarea',required:true},
      {key:'loyer_mensuel',label:"Loyer mensuel en FCFA",type:'text',required:true},
      {key:'duree_bail',label:"Durée du bail",type:'text',required:true},
      {key:'date_prise_effet',label:"Date de prise d\'effet",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>BAIL COMMERCIAL NOTARIÉ</h1><p><strong>{{bailleur_nom}}</strong> donne à bail à <strong>{{preneur_nom}}</strong> les locaux commerciaux suivants :</p><p>{{designation_locaux}}</p><h3>Conditions financières</h3><p>Loyer mensuel : <strong>{{loyer_mensuel}} FCFA</strong>. Durée : <strong>{{duree_bail}}</strong>. Prise d\'effet : <strong>{{date_prise_effet}}</strong>.</p></div>`
  },

  {
    code: 'notaire_pret_hypothecaire',
    name: "Acte notarié de prêt immobilier (prêt hypothécaire)",
    category: 'juridique_admin', price: 12000, priceMax: 40000,
    description: "Acte authentique constatant un prêt immobilier garanti par une hypothèque sur un bien immeuble appartenant à l\'emprunteur.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 82,
    fieldsJson: F([
      {key:'preteur_nom',label:"Nom du prêteur",type:'text',required:true},
      {key:'emprunteur_nom',label:"Nom de l\'emprunteur",type:'text',required:true},
      {key:'montant_pret',label:"Montant du prêt en FCFA",type:'text',required:true},
      {key:'taux_interet',label:"Taux d\'intérêt annuel",type:'text',required:true},
      {key:'duree_remboursement',label:"Durée de remboursement",type:'text',required:true},
      {key:'bien_en_garantie',label:"Description du bien donné en garantie",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACTE DE PRÊT IMMOBILIER HYPOTHÉCAIRE</h1><p><strong>{{preteur_nom}}</strong> consent à <strong>{{emprunteur_nom}}</strong> un prêt de <strong>{{montant_pret}} FCFA</strong> au taux de <strong>{{taux_interet}}</strong>, remboursable sur <strong>{{duree_remboursement}}</strong>.</p><h3>Garantie hypothécaire</h3><p>{{bien_en_garantie}}</p></div>`
  },

  {
    code: 'notaire_cautionnement_reel',
    name: "Acte notarié de cautionnement réel",
    category: 'juridique_admin', price: 9000, priceMax: 28000,
    description: "Acte authentique de cautionnement réel par lequel un tiers offre un bien en garantie d\'une dette d\'autrui, sans s\'engager personnellement.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'caution_nom',label:"Nom de la caution réelle",type:'text',required:true},
      {key:'debiteur_principal_nom',label:"Nom du débiteur principal",type:'text',required:true},
      {key:'creancier_nom',label:"Nom du créancier",type:'text',required:true},
      {key:'bien_affecte',label:"Description du bien affecté en garantie",type:'textarea',required:true},
      {key:'montant_garanti',label:"Montant garanti en FCFA",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACTE DE CAUTIONNEMENT RÉEL</h1><p><strong>{{caution_nom}}</strong> affecte en garantie de la dette de <strong>{{debiteur_principal_nom}}</strong> envers <strong>{{creancier_nom}}</strong> le bien suivant :</p><p>{{bien_affecte}}</p><p>Montant garanti : <strong>{{montant_garanti}} FCFA</strong>.</p><p>La caution réelle ne répond de la dette que sur ce bien et non sur son patrimoine personnel.</p></div>`
  },

  {
    code: 'notaire_ppd',
    name: "Acte notarié de privilège du prêteur de deniers (PPD)",
    category: 'juridique_admin', price: 10000, priceMax: 32000,
    description: "Acte notarié constatant le privilège du prêteur de deniers, garantissant le prêteur qui a financé l\'acquisition d\'un immeuble.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      {key:'preteur_nom',label:"Nom du prêteur de deniers",type:'text',required:true},
      {key:'emprunteur_nom',label:"Nom de l\'emprunteur",type:'text',required:true},
      {key:'immeuble_acquis',label:"Description de l\'immeuble acquis",type:'textarea',required:true},
      {key:'montant_pret',label:"Montant du prêt en FCFA",type:'text',required:true},
      {key:'date_acte',label:"Date de l\'acte",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACTE DE PRIVILÈGE DU PRÊTEUR DE DENIERS</h1><p><strong>{{preteur_nom}}</strong> bénéficie d\'un privilège de prêteur de deniers sur l\'immeuble acquis par <strong>{{emprunteur_nom}}</strong> :</p><p>{{immeuble_acquis}}</p><p>Montant financé : <strong>{{montant_pret}} FCFA</strong>. Acte daté du <strong>{{date_acte}}</strong>.</p></div>`
  },

  {
    code: 'notaire_subrogation',
    name: "Acte notarié de subrogation conventionnelle",
    category: 'juridique_admin', price: 8000, priceMax: 25000,
    description: "Acte authentique de subrogation conventionnelle permettant à un tiers solvens de se substituer au créancier dans ses droits et garanties.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'solvens_nom',label:"Nom du solvens (tiers payeur)",type:'text',required:true},
      {key:'creancier_nom',label:"Nom du créancier originaire",type:'text',required:true},
      {key:'debiteur_nom',label:"Nom du débiteur",type:'text',required:true},
      {key:'montant_paye',label:"Montant payé en FCFA",type:'text',required:true},
      {key:'droits_subroges',label:"Droits et garanties transmis par subrogation",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACTE DE SUBROGATION CONVENTIONNELLE</h1><p><strong>{{creancier_nom}}</strong> subroge <strong>{{solvens_nom}}</strong> dans tous ses droits, actions et garanties contre <strong>{{debiteur_nom}}</strong>, en contrepartie du paiement de <strong>{{montant_paye}} FCFA</strong>.</p><h3>Droits transmis</h3><p>{{droits_subroges}}</p></div>`
  },

  {
    code: 'notaire_cession_fonds_commerce',
    name: "Acte notarié de cession de fonds de commerce",
    category: 'juridique_admin', price: 12000, priceMax: 40000,
    description: "Acte authentique de cession d\'un fonds de commerce incluant la clientèle, le nom commercial, les contrats et le matériel d\'exploitation.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 80,
    fieldsJson: F([
      {key:'cedant_nom',label:"Nom du cédant",type:'text',required:true},
      {key:'cessionnaire_nom',label:"Nom du cessionnaire",type:'text',required:true},
      {key:'fonds_description',label:"Description du fonds de commerce",type:'textarea',required:true},
      {key:'prix_cession',label:"Prix de cession en FCFA",type:'text',required:true},
      {key:'date_cession',label:"Date de cession",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACTE DE CESSION DE FONDS DE COMMERCE</h1><p><strong>{{cedant_nom}}</strong> cède à <strong>{{cessionnaire_nom}}</strong> le fonds de commerce ci-après décrit :</p><p>{{fonds_description}}</p><p>Prix de cession : <strong>{{prix_cession}} FCFA</strong>. Cession effective au <strong>{{date_cession}}</strong>.</p></div>`
  },

  {
    code: 'notaire_cession_parts_sociales',
    name: "Acte notarié de cession de parts sociales",
    category: 'juridique_admin', price: 11000, priceMax: 35000,
    description: "Acte authentique constatant la cession de parts sociales dans une société, avec agrément des associés et mise à jour des registres.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 77,
    fieldsJson: F([
      {key:'cedant_nom',label:"Nom du cédant",type:'text',required:true},
      {key:'cessionnaire_nom',label:"Nom du cessionnaire",type:'text',required:true},
      {key:'societe_nom',label:"Dénomination de la société",type:'text',required:true},
      {key:'nombre_parts',label:"Nombre de parts cédées",type:'text',required:true},
      {key:'prix_unitaire',label:"Prix unitaire par part en FCFA",type:'text',required:true},
      {key:'date_cession',label:"Date de cession",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACTE NOTARIÉ DE CESSION DE PARTS SOCIALES</h1><p><strong>{{cedant_nom}}</strong> cède à <strong>{{cessionnaire_nom}}</strong> un total de <strong>{{nombre_parts}}</strong> parts dans la société <strong>{{societe_nom}}</strong>, au prix unitaire de <strong>{{prix_unitaire}} FCFA</strong>.</p><p>Cession effective au <strong>{{date_cession}}</strong>.</p></div>`
  },

  {
    code: 'notaire_nantissement',
    name: "Acte notarié de constitution de nantissement",
    category: 'juridique_admin', price: 9000, priceMax: 28000,
    description: "Acte authentique de nantissement portant sur des biens incorporels (fonds de commerce, parts sociales, créances), en garantie d\'une dette.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'constituant_nom',label:"Nom du constituant du nantissement",type:'text',required:true},
      {key:'creancier_nom',label:"Nom du créancier nanti",type:'text',required:true},
      {key:'bien_nanti',label:"Description du bien nanti",type:'textarea',required:true},
      {key:'montant_creance',label:"Montant de la créance garantie en FCFA",type:'text',required:true},
      {key:'date_acte',label:"Date de l\'acte",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACTE DE CONSTITUTION DE NANTISSEMENT</h1><p><strong>{{constituant_nom}}</strong> constitue un nantissement sur le bien ci-après désigné en faveur de <strong>{{creancier_nom}}</strong>, en garantie d\'une créance de <strong>{{montant_creance}} FCFA</strong>.</p><h3>Bien nanti</h3><p>{{bien_nanti}}</p><p>Acte daté du <strong>{{date_acte}}</strong>.</p></div>`
  },

  {
    code: 'notaire_procuration_mandat',
    name: "Acte notarié de procuration (mandat général)",
    category: 'juridique_admin', price: 6000, priceMax: 18000,
    description: "Procuration générale reçue par notaire, donnant pouvoir à un mandataire d\'agir au nom et pour le compte du mandant pour tous actes d\'administration.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 75,
    fieldsJson: F([
      {key:'mandant_nom',label:"Nom du mandant",type:'text',required:true},
      {key:'mandataire_nom',label:"Nom du mandataire",type:'text',required:true},
      {key:'etendue_pouvoirs',label:"Étendue des pouvoirs accordés",type:'textarea',required:true},
      {key:'date_procuration',label:"Date de la procuration",type:'date',required:true},
      {key:'duree_validite',label:"Durée de validité",type:'text',required:false}
    ]),
    body: `<div class="doc"><h1>PROCURATION GÉNÉRALE (MANDAT NOTARIÉ)</h1><p><strong>{{mandant_nom}}</strong> donne par les présentes tous pouvoirs à <strong>{{mandataire_nom}}</strong> pour agir en son nom et pour son compte.</p><h3>Pouvoirs accordés</h3><p>{{etendue_pouvoirs}}</p><p>Procuration accordée le <strong>{{date_procuration}}</strong>. Durée : <strong>{{duree_validite}}</strong>.</p></div>`
  },

  {
    code: 'notaire_reconnaissance_dette',
    name: "Acte notarié de reconnaissance de dette",
    category: 'juridique_admin', price: 7000, priceMax: 22000,
    description: "Acte authentique par lequel un débiteur reconnaît être redevable d\'une somme envers son créancier, avec fixation des modalités de remboursement.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 78,
    fieldsJson: F([
      {key:'debiteur_nom',label:"Nom du débiteur",type:'text',required:true},
      {key:'creancier_nom',label:"Nom du créancier",type:'text',required:true},
      {key:'montant_dette',label:"Montant de la dette en FCFA",type:'text',required:true},
      {key:'modalites_remboursement',label:"Modalités de remboursement",type:'textarea',required:true},
      {key:'date_acte',label:"Date de l\'acte",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACTE NOTARIÉ DE RECONNAISSANCE DE DETTE</h1><p>Je soussigné(e) <strong>{{debiteur_nom}}</strong> reconnais devoir à <strong>{{creancier_nom}}</strong> la somme de <strong>{{montant_dette}} FCFA</strong>.</p><h3>Modalités de remboursement</h3><p>{{modalites_remboursement}}</p><p>Acte daté du <strong>{{date_acte}}</strong>.</p></div>`
  },

  {
    code: 'notaire_constat_etat_lieux',
    name: "Acte notarié de constat d\'état des lieux",
    category: 'juridique_admin', price: 8000, priceMax: 25000,
    description: "Constat authentique d\'état des lieux dressé par notaire, offrant une force probante supérieure au constat amiable en cas de litige.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'requérant_nom',label:"Nom du requérant",type:'text',required:true},
      {key:'adresse_bien',label:"Adresse et description du bien",type:'text',required:true},
      {key:'date_constat',label:"Date du constat",type:'date',required:true},
      {key:'etat_constate',label:"Description détaillée de l\'état des lieux",type:'textarea',required:true},
      {key:'reserves',label:"Réserves et observations",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>CONSTAT NOTARIÉ D\'ÉTAT DES LIEUX</h1><p>À la requête de <strong>{{requérant_nom}}</strong>, le notaire soussigné s\'est transporté le <strong>{{date_constat}}</strong> au <strong>{{adresse_bien}}</strong> pour dresser le présent constat.</p><h3>État des lieux constaté</h3><p>{{etat_constate}}</p><h3>Réserves</h3><p>{{reserves}}</p></div>`
  },

  {
    code: 'notaire_servitude_passage',
    name: "Acte notarié de servitude de passage",
    category: 'juridique_admin', price: 9000, priceMax: 28000,
    description: "Acte authentique instituant une servitude de passage sur un fonds servant au profit d\'un fonds dominant enclavé.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 62,
    fieldsJson: F([
      {key:'proprietaire_dominant',label:"Propriétaire du fonds dominant",type:'text',required:true},
      {key:'proprietaire_servant',label:"Propriétaire du fonds servant",type:'text',required:true},
      {key:'description_fonds',label:"Description des fonds concernés",type:'textarea',required:true},
      {key:'modalites_passage',label:"Modalités d\'exercice de la servitude",type:'textarea',required:true},
      {key:'indemnite',label:"Indemnité versée en FCFA",type:'text',required:false}
    ]),
    body: `<div class="doc"><h1>ACTE NOTARIÉ DE SERVITUDE DE PASSAGE</h1><p><strong>{{proprietaire_servant}}</strong> consent au profit de <strong>{{proprietaire_dominant}}</strong> une servitude de passage sur son fonds.</p><h3>Description des fonds</h3><p>{{description_fonds}}</p><h3>Modalités de la servitude</h3><p>{{modalites_passage}}</p><p>Indemnité convenue : <strong>{{indemnite}} FCFA</strong>.</p></div>`
  },

  {
    code: 'notaire_mainlevee_hypotheque',
    name: "Acte notarié de mainlevée d\'hypothèque",
    category: 'juridique_admin', price: 8000, priceMax: 25000,
    description: "Acte authentique par lequel le créancier hypothécaire donne mainlevée de l\'hypothèque inscrite suite au remboursement intégral de la dette.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'creancier_nom',label:"Nom du créancier hypothécaire",type:'text',required:true},
      {key:'debiteur_nom',label:"Nom du débiteur",type:'text',required:true},
      {key:'bien_hypotheque',label:"Description du bien hypothéqué",type:'textarea',required:true},
      {key:'date_inscription',label:"Date d\'inscription de l\'hypothèque",type:'date',required:true},
      {key:'date_mainlevee',label:"Date de mainlevée",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACTE NOTARIÉ DE MAINLEVÉE D\'HYPOTHÈQUE</h1><p><strong>{{creancier_nom}}</strong> donne mainlevée de l\'hypothèque inscrite le <strong>{{date_inscription}}</strong> sur le bien ci-après désigné appartenant à <strong>{{debiteur_nom}}</strong> :</p><p>{{bien_hypotheque}}</p><p>Mainlevée prononcée au <strong>{{date_mainlevee}}</strong>, la dette ayant été intégralement remboursée.</p></div>`
  },

  {
    code: 'notaire_retrait_nantissement',
    name: "Acte notarié de retrait de nantissement",
    category: 'juridique_admin', price: 7000, priceMax: 22000,
    description: "Acte authentique par lequel le créancier nanti accepte la levée du nantissement constitué en sa faveur, suite au remboursement de la créance.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      {key:'creancier_nanti',label:"Nom du créancier nanti",type:'text',required:true},
      {key:'constituant_nom',label:"Nom du constituant",type:'text',required:true},
      {key:'bien_nanti',label:"Description du bien nanti",type:'textarea',required:true},
      {key:'date_constitution',label:"Date de constitution du nantissement",type:'date',required:true},
      {key:'date_retrait',label:"Date du retrait du nantissement",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACTE NOTARIÉ DE RETRAIT DE NANTISSEMENT</h1><p><strong>{{creancier_nanti}}</strong> donne acte du retrait du nantissement constitué le <strong>{{date_constitution}}</strong> par <strong>{{constituant_nom}}</strong> sur :</p><p>{{bien_nanti}}</p><p>Retrait effectif au <strong>{{date_retrait}}</strong>.</p></div>`
  },

  {
    code: 'notaire_testament_authentique_not',
    name: "Acte notarié de testament authentique",
    category: 'juridique_admin', price: 9000, priceMax: 28000,
    description: "Testament reçu par notaire en présence de témoins instrumentaires, conservé au rang des minutes et opposable à tous.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'testateur_nom',label:"Nom et prénoms du testateur",type:'text',required:true},
      {key:'notaire_nom',label:"Nom du notaire",type:'text',required:true},
      {key:'temoins_identite',label:"Identité des deux témoins",type:'text',required:true},
      {key:'dispositions',label:"Dispositions testamentaires",type:'textarea',required:true},
      {key:'date_reception',label:"Date de réception du testament",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>TESTAMENT AUTHENTIQUE NOTARIÉ</h1><p>Reçu le <strong>{{date_reception}}</strong> par Maître <strong>{{notaire_nom}}</strong>, en présence des témoins : <strong>{{temoins_identite}}</strong>.</p><p>Testateur : <strong>{{testateur_nom}}</strong></p><h3>Dispositions</h3><p>{{dispositions}}</p><p>Lecture faite, le testateur a déclaré que tel est son testament et a signé avec le notaire et les témoins.</p></div>`
  },

  {
    code: 'notaire_depot_conservation_actes',
    name: "Accord de dépôt et conservation d\'actes au rang des minutes",
    category: 'juridique_admin', price: 6000, priceMax: 18000,
    description: "Acte par lequel une partie dépose un acte sous seing privé au rang des minutes d\'un notaire pour lui conférer date certaine et force probante.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'deposant_nom',label:"Nom du déposant",type:'text',required:true},
      {key:'notaire_nom',label:"Nom du notaire dépositaire",type:'text',required:true},
      {key:'acte_depose',label:"Description de l\'acte déposé",type:'textarea',required:true},
      {key:'date_depot',label:"Date du dépôt",type:'date',required:true},
      {key:'numero_minute',label:"Numéro de la minute attribué",type:'text',required:false}
    ]),
    body: `<div class="doc"><h1>DÉPÔT AU RANG DES MINUTES</h1><p><strong>{{deposant_nom}}</strong> remet à Maître <strong>{{notaire_nom}}</strong> l\'acte ci-après désigné aux fins de dépôt et conservation au rang des minutes :</p><p>{{acte_depose}}</p><p>Dépôt effectué le <strong>{{date_depot}}</strong>. Numéro de minute : <strong>{{numero_minute}}</strong>.</p></div>`
  },

  {
    code: 'notaire_rapport_diligences',
    name: "Rapport de diligences notariales",
    category: 'juridique_admin', price: 7000, priceMax: 22000,
    description: "Rapport du notaire récapitulant les diligences accomplies dans le cadre d\'un dossier immobilier ou successoral, avec liste des pièces vérifiées.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'notaire_nom',label:"Nom du notaire",type:'text',required:true},
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'nature_dossier',label:"Nature et objet du dossier",type:'textarea',required:true},
      {key:'diligences_accomplies',label:"Diligences accomplies",type:'textarea',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE DILIGENCES NOTARIALES</h1><p>Établi le <strong>{{date_rapport}}</strong> par Maître <strong>{{notaire_nom}}</strong> pour le compte de <strong>{{client_nom}}</strong>.</p><h3>Objet du dossier</h3><p>{{nature_dossier}}</p><h3>Diligences accomplies</h3><p>{{diligences_accomplies}}</p><p>Le notaire certifie avoir accompli l\'ensemble des diligences nécessaires à la sécurisation juridique du dossier.</p></div>`
  },

  {
    code: 'notaire_charte_acces_notariat',
    name: "Charte de l\'accès au notariat et de la sécurité juridique en Afrique",
    category: 'juridique_admin', price: 4000, priceMax: 12000,
    description: "Charte énonçant les principes fondamentaux d\'accès au service notarial, de sécurité juridique et de protection des droits dans le contexte africain.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 52,
    fieldsJson: F([
      {key:'chambre_notaires',label:"Chambre des Notaires ou organisme émetteur",type:'text',required:true},
      {key:'pays',label:"Pays ou ressort territorial",type:'text',required:true},
      {key:'date_adoption',label:"Date d\'adoption de la charte",type:'date',required:true},
      {key:'principes_fondamentaux',label:"Principes fondamentaux d\'accès au notariat",type:'textarea',required:true},
      {key:'engagements_notaires',label:"Engagements des notaires signataires",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE L\'ACCÈS AU NOTARIAT ET DE LA SÉCURITÉ JURIDIQUE EN AFRIQUE</h1><h2>{{chambre_notaires}} — {{pays}}</h2><p>Adoptée le <strong>{{date_adoption}}</strong>.</p><h3>Principes fondamentaux</h3><p>{{principes_fondamentaux}}</p><h3>Engagements des notaires</h3><p>{{engagements_notaires}}</p><p>La présente charte est signée par l\'ensemble des notaires du ressort et publiée pour information du public.</p></div>`
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
  console.log(`Batch 94a OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
