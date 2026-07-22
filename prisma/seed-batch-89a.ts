import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);

const templates = [
  // ─── 25 templates Recherche scientifique / Brevets (rech2_, academique) ───

  {
    code: 'rech2_partenariat_univ_entreprise',
    name: "Accord de partenariat de recherche université-entreprise",
    category: 'academique',
    price: 8000,
    priceMax: 28000,
    description: "Convention cadre établissant les modalités de collaboration entre une université et une entreprise pour la conduite de travaux de recherche appliquée en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 72,
    fieldsJson: F([
      { key: 'nom_universite', label: "Nom de l'université", type: 'text', required: true },
      { key: 'nom_entreprise', label: "Nom de l'entreprise", type: 'text', required: true },
      { key: 'objet_recherche', label: "Objet de la recherche", type: 'textarea', required: true },
      { key: 'duree_accord', label: "Durée de l'accord", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT DE RECHERCHE UNIVERSITÉ-ENTREPRISE</h1><p>Entre <strong>{{nom_universite}}</strong> et <strong>{{nom_entreprise}}</strong>, il est convenu ce qui suit :</p><h2>ARTICLE 1 – OBJET</h2><p>{{objet_recherche}}</p><h2>ARTICLE 2 – DURÉE</h2><p>Le présent accord est conclu pour une durée de {{duree_accord}} à compter de sa date de signature.</p><h2>ARTICLE 3 – PROPRIÉTÉ INTELLECTUELLE</h2><p>Les résultats issus des travaux de recherche conjoints feront l'objet d'une copropriété selon les modalités définies à l'annexe PI.</p><h2>ARTICLE 4 – FINANCEMENT</h2><p>Les modalités de financement sont précisées dans le budget prévisionnel annexé.</p><p>Fait à Abidjan, le {{date_signature}}</p></div>`
  },

  {
    code: 'rech2_co_dev_produit_rd',
    name: "Accord de co-développement de produit (R&D)",
    category: 'academique',
    price: 9000,
    priceMax: 32000,
    description: "Contrat encadrant le développement conjoint d'un produit innovant entre deux entités, définissant la répartition des droits de propriété intellectuelle issus de la R&D.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'partie_a', label: "Partie A (nom et qualité)", type: 'text', required: true },
      { key: 'partie_b', label: "Partie B (nom et qualité)", type: 'text', required: true },
      { key: 'description_produit', label: "Description du produit à développer", type: 'textarea', required: true },
      { key: 'repartition_droits', label: "Répartition des droits PI (%)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début du projet", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE CO-DÉVELOPPEMENT DE PRODUIT (R&D)</h1><p>Entre <strong>{{partie_a}}</strong> et <strong>{{partie_b}}</strong>, il est convenu ce qui suit :</p><h2>ARTICLE 1 – OBJET</h2><p>Les parties s'engagent à co-développer le produit suivant : {{description_produit}}</p><h2>ARTICLE 2 – PROPRIÉTÉ INTELLECTUELLE</h2><p>Les droits de propriété intellectuelle issus du co-développement sont répartis comme suit : {{repartition_droits}}</p><h2>ARTICLE 3 – CONFIDENTIALITÉ</h2><p>Toute information échangée dans le cadre de cet accord est strictement confidentielle.</p><p>Fait à Abidjan, le {{date_debut}}</p></div>`
  },

  {
    code: 'rech2_consortium_international',
    name: "Accord de consortium de recherche internationale",
    category: 'academique',
    price: 12000,
    priceMax: 42000,
    description: "Accord multi-parties organisant un consortium de recherche réunissant des institutions de plusieurs pays pour la conduite d'un projet scientifique d'envergure internationale.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 61,
    fieldsJson: F([
      { key: 'nom_consortium', label: "Nom du consortium", type: 'text', required: true },
      { key: 'membres_consortium', label: "Liste des membres (institutions et pays)", type: 'textarea', required: true },
      { key: 'programme_recherche', label: "Programme de recherche", type: 'textarea', required: true },
      { key: 'chef_de_file', label: "Institution chef de file", type: 'text', required: true },
      { key: 'date_constitution', label: "Date de constitution", type: 'date', required: true },
      { key: 'duree_projet', label: "Durée du projet", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE CONSORTIUM DE RECHERCHE INTERNATIONALE</h1><h2>PRÉAMBULE</h2><p>Le consortium dénommé <strong>{{nom_consortium}}</strong>, constitué le {{date_constitution}}, regroupe les institutions suivantes : {{membres_consortium}}</p><h2>ARTICLE 1 – CHEF DE FILE</h2><p>L'institution chef de file est : {{chef_de_file}}</p><h2>ARTICLE 2 – PROGRAMME</h2><p>{{programme_recherche}}</p><h2>ARTICLE 3 – DURÉE</h2><p>Le présent accord est conclu pour une durée de {{duree_projet}}.</p><h2>ARTICLE 4 – GOUVERNANCE</h2><p>Un comité de pilotage composé d'un représentant de chaque membre assure la gouvernance du consortium.</p></div>`
  },

  {
    code: 'rech2_depot_brevet_oapi',
    name: "Accord de service de dépôt de brevet OAPI",
    category: 'academique',
    price: 6000,
    priceMax: 20000,
    description: "Contrat de prestation de services pour le dépôt et le suivi d'une demande de brevet auprès de l'Organisation Africaine de la Propriété Intellectuelle (OAPI) à Yaoundé.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 79,
    fieldsJson: F([
      { key: 'nom_deposant', label: "Nom du déposant", type: 'text', required: true },
      { key: 'titre_invention', label: "Titre de l'invention", type: 'text', required: true },
      { key: 'inventeurs', label: "Nom(s) de(s) inventeur(s)", type: 'text', required: true },
      { key: 'prestataire', label: "Cabinet mandataire OAPI", type: 'text', required: true },
      { key: 'date_mandat', label: "Date du mandat", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DÉPÔT DE BREVET OAPI</h1><p><strong>MANDANT :</strong> {{nom_deposant}}</p><p><strong>MANDATAIRE :</strong> {{prestataire}}</p><h2>ARTICLE 1 – OBJET DU MANDAT</h2><p>Le mandant confie au mandataire le dépôt et le suivi de la demande de brevet OAPI relative à l'invention intitulée : <em>{{titre_invention}}</em>, dont les inventeurs sont : {{inventeurs}}</p><h2>ARTICLE 2 – MISSION</h2><p>Le mandataire est chargé de la préparation des documents, du dépôt auprès de l'OAPI, du paiement des taxes officielles et du suivi de la procédure jusqu'à délivrance.</p><h2>ARTICLE 3 – HONORAIRES</h2><p>Les honoraires et taxes sont détaillés en annexe financière.</p><p>Fait le {{date_mandat}}</p></div>`
  },

  {
    code: 'rech2_depot_marque_oapi',
    name: "Accord de service de dépôt de marque OAPI",
    category: 'academique',
    price: 5000,
    priceMax: 17000,
    description: "Contrat de mandat pour le dépôt et l'enregistrement d'une marque commerciale ou de service auprès de l'OAPI, couvrant les États membres de l'Accord de Bangui.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 75,
    fieldsJson: F([
      { key: 'titulaire_marque', label: "Titulaire de la marque", type: 'text', required: true },
      { key: 'denomination_marque', label: "Dénomination de la marque", type: 'text', required: true },
      { key: 'classes_nice', label: "Classes Nice visées", type: 'text', required: true },
      { key: 'mandataire_oapi', label: "Cabinet mandataire OAPI", type: 'text', required: true },
      { key: 'date_mandat', label: "Date du mandat", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DÉPÔT DE MARQUE OAPI</h1><p><strong>TITULAIRE :</strong> {{titulaire_marque}}</p><p><strong>MANDATAIRE :</strong> {{mandataire_oapi}}</p><h2>ARTICLE 1 – OBJET</h2><p>Le titulaire mandate le cabinet pour déposer la marque <strong>{{denomination_marque}}</strong> dans les classes Nice suivantes : {{classes_nice}}</p><h2>ARTICLE 2 – ÉTENDUE TERRITORIALE</h2><p>Le dépôt couvre l'ensemble des États membres de l'Accord de Bangui révisé administré par l'OAPI.</p><h2>ARTICLE 3 – OBLIGATIONS DU MANDATAIRE</h2><p>Le mandataire s'engage à effectuer le dépôt, payer les taxes et assurer le suivi jusqu'à la délivrance du titre.</p><p>Fait le {{date_mandat}}</p></div>`
  },

  {
    code: 'rech2_depot_dessin_modele_oapi',
    name: "Accord de service de dépôt de dessin et modèle OAPI",
    category: 'academique',
    price: 5000,
    priceMax: 16000,
    description: "Contrat de mandat pour le dépôt d'un dessin industriel ou modèle d'utilité auprès de l'OAPI, protégeant l'apparence ornementale d'un produit dans les États membres.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 58,
    fieldsJson: F([
      { key: 'deposant', label: "Nom du déposant", type: 'text', required: true },
      { key: 'intitule_creation', label: "Intitulé du dessin ou modèle", type: 'text', required: true },
      { key: 'produit_concerne', label: "Produit concerné", type: 'text', required: true },
      { key: 'mandataire', label: "Cabinet mandataire OAPI", type: 'text', required: true },
      { key: 'date_mandat', label: "Date du mandat", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DÉPÔT DE DESSIN ET MODÈLE OAPI</h1><p><strong>DÉPOSANT :</strong> {{deposant}}</p><p><strong>MANDATAIRE :</strong> {{mandataire}}</p><h2>ARTICLE 1 – OBJET</h2><p>Le déposant confie au mandataire le dépôt auprès de l'OAPI du dessin/modèle intitulé : <em>{{intitule_creation}}</em>, appliqué au produit : {{produit_concerne}}</p><h2>ARTICLE 2 – MISSION</h2><p>Préparation du dossier technique, représentations graphiques, dépôt et suivi de procédure.</p><h2>ARTICLE 3 – DURÉE DE PROTECTION</h2><p>La protection accordée est de cinq (5) ans renouvelables conformément à l'Accord de Bangui.</p><p>Fait le {{date_mandat}}</p></div>`
  },

  {
    code: 'rech2_cession_brevet',
    name: "Accord de cession de brevet",
    category: 'academique',
    price: 10000,
    priceMax: 36000,
    description: "Contrat par lequel le titulaire d'un brevet OAPI transfère définitivement la totalité de ses droits de propriété sur le brevet à un cessionnaire, avec prix et modalités.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'cedant', label: "Nom du cédant (titulaire actuel)", type: 'text', required: true },
      { key: 'cessionnaire', label: "Nom du cessionnaire (acquéreur)", type: 'text', required: true },
      { key: 'numero_brevet', label: "Numéro et titre du brevet OAPI", type: 'text', required: true },
      { key: 'prix_cession', label: "Prix de cession (FCFA)", type: 'text', required: true },
      { key: 'date_acte', label: "Date de l'acte", type: 'date', required: true },
      { key: 'modalites_paiement', label: "Modalités de paiement", type: 'textarea', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE CESSION DE BREVET</h1><p><strong>CÉDANT :</strong> {{cedant}}</p><p><strong>CESSIONNAIRE :</strong> {{cessionnaire}}</p><h2>ARTICLE 1 – OBJET DE LA CESSION</h2><p>Le cédant cède au cessionnaire la totalité des droits attachés au brevet OAPI n° {{numero_brevet}}, à titre définitif et irrévocable.</p><h2>ARTICLE 2 – PRIX</h2><p>La cession est consentie moyennant le prix de {{prix_cession}} FCFA.</p><h2>ARTICLE 3 – MODALITÉS DE PAIEMENT</h2><p>{{modalites_paiement}}</p><h2>ARTICLE 4 – GARANTIES</h2><p>Le cédant garantit être le seul titulaire du brevet et qu'il n'est grevé d'aucune charge ou sûreté.</p><p>Fait le {{date_acte}}</p></div>`
  },

  {
    code: 'rech2_licence_brevet_exclusive',
    name: "Accord de licence de brevet exclusive",
    category: 'academique',
    price: 9000,
    priceMax: 33000,
    description: "Contrat par lequel le titulaire d'un brevet concède à un licencié unique le droit exclusif d'exploitation du brevet dans un territoire et pour une durée déterminés.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'donneur_licence', label: "Donneur de licence (titulaire)", type: 'text', required: true },
      { key: 'licencie', label: "Licencié (bénéficiaire)", type: 'text', required: true },
      { key: 'brevet_objet', label: "Référence et objet du brevet", type: 'text', required: true },
      { key: 'territoire', label: "Territoire de la licence", type: 'text', required: true },
      { key: 'redevance', label: "Taux de redevance (%)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE LICENCE DE BREVET EXCLUSIVE</h1><p><strong>DONNEUR DE LICENCE :</strong> {{donneur_licence}}</p><p><strong>LICENCIÉ :</strong> {{licencie}}</p><h2>ARTICLE 1 – OBJET</h2><p>Le donneur de licence accorde au licencié une licence EXCLUSIVE sur le brevet {{brevet_objet}}.</p><h2>ARTICLE 2 – TERRITOIRE</h2><p>La licence est limitée au territoire suivant : {{territoire}}</p><h2>ARTICLE 3 – REDEVANCES</h2><p>En contrepartie, le licencié versera une redevance de {{redevance}}% sur le chiffre d'affaires net réalisé grâce au brevet.</p><h2>ARTICLE 4 – DURÉE</h2><p>La présente licence prend effet le {{date_debut}} et court jusqu'à l'expiration du brevet.</p></div>`
  },

  {
    code: 'rech2_licence_brevet_non_exclusive',
    name: "Accord de licence de brevet non-exclusive",
    category: 'academique',
    price: 7000,
    priceMax: 24000,
    description: "Contrat de licence permettant au donneur de licence de concéder le même brevet à plusieurs licenciés simultanément, sans exclusivité au profit de l'un d'eux.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 66,
    fieldsJson: F([
      { key: 'donneur_licence', label: "Donneur de licence", type: 'text', required: true },
      { key: 'licencie', label: "Licencié", type: 'text', required: true },
      { key: 'brevet_reference', label: "Référence du brevet OAPI", type: 'text', required: true },
      { key: 'champ_exploitation', label: "Champ d'exploitation autorisé", type: 'textarea', required: true },
      { key: 'date_debut', label: "Date d'entrée en vigueur", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE LICENCE DE BREVET NON-EXCLUSIVE</h1><p><strong>DONNEUR DE LICENCE :</strong> {{donneur_licence}}</p><p><strong>LICENCIÉ :</strong> {{licencie}}</p><h2>ARTICLE 1 – NATURE DE LA LICENCE</h2><p>La présente licence est NON-EXCLUSIVE. Le donneur de licence conserve le droit de concéder d'autres licences à des tiers.</p><h2>ARTICLE 2 – BREVET CONCERNÉ</h2><p>Brevet OAPI réf. : {{brevet_reference}}</p><h2>ARTICLE 3 – CHAMP D'EXPLOITATION</h2><p>{{champ_exploitation}}</p><h2>ARTICLE 4 – ENTRÉE EN VIGUEUR</h2><p>Le présent accord prend effet à compter du {{date_debut}}.</p></div>`
  },

  {
    code: 'rech2_licence_marque',
    name: "Accord de licence de marque",
    category: 'academique',
    price: 7000,
    priceMax: 25000,
    description: "Contrat par lequel le titulaire d'une marque enregistrée OAPI autorise un tiers à utiliser la marque dans des conditions définies, avec contrôle qualitatif obligatoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 74,
    fieldsJson: F([
      { key: 'concedant', label: "Concédant (titulaire de la marque)", type: 'text', required: true },
      { key: 'licencie', label: "Licencié", type: 'text', required: true },
      { key: 'marque_concernee', label: "Marque concernée (dénomination et n° OAPI)", type: 'text', required: true },
      { key: 'produits_services', label: "Produits/services autorisés", type: 'textarea', required: true },
      { key: 'redevance_marque', label: "Redevance de marque (FCFA ou %)", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE LICENCE DE MARQUE</h1><p><strong>CONCÉDANT :</strong> {{concedant}}</p><p><strong>LICENCIÉ :</strong> {{licencie}}</p><h2>ARTICLE 1 – MARQUE CONCÉDÉE</h2><p>{{marque_concernee}}</p><h2>ARTICLE 2 – PRODUITS ET SERVICES</h2><p>{{produits_services}}</p><h2>ARTICLE 3 – CONTRÔLE QUALITATIF</h2><p>Le licencié s'engage à maintenir les standards de qualité définis par le concédant. Ce dernier dispose d'un droit d'audit annuel.</p><h2>ARTICLE 4 – REDEVANCE</h2><p>{{redevance_marque}}</p><p>Fait le {{date_signature}}</p></div>`
  },

  {
    code: 'rech2_licence_knowhow',
    name: "Accord de licence de know-how (savoir-faire)",
    category: 'academique',
    price: 8000,
    priceMax: 28000,
    description: "Contrat de communication et d'exploitation de savoir-faire technique non breveté, incluant les obligations de confidentialité et les modalités de transmission.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 62,
    fieldsJson: F([
      { key: 'transmetteur', label: "Transmetteur du savoir-faire", type: 'text', required: true },
      { key: 'beneficiaire', label: "Bénéficiaire", type: 'text', required: true },
      { key: 'description_savoir_faire', label: "Description du savoir-faire transmis", type: 'textarea', required: true },
      { key: 'modalites_transmission', label: "Modalités de transmission (formation, documentation)", type: 'textarea', required: true },
      { key: 'date_debut', label: "Date de début", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE LICENCE DE KNOW-HOW (SAVOIR-FAIRE)</h1><p><strong>TRANSMETTEUR :</strong> {{transmetteur}}</p><p><strong>BÉNÉFICIAIRE :</strong> {{beneficiaire}}</p><h2>ARTICLE 1 – SAVOIR-FAIRE TRANSMIS</h2><p>{{description_savoir_faire}}</p><h2>ARTICLE 2 – MODALITÉS DE TRANSMISSION</h2><p>{{modalites_transmission}}</p><h2>ARTICLE 3 – CONFIDENTIALITÉ</h2><p>Le bénéficiaire s'engage à traiter le savoir-faire comme strictement confidentiel pendant toute la durée de l'accord et pour une période de dix (10) ans après son expiration.</p><h2>ARTICLE 4 – ENTRÉE EN VIGUEUR</h2><p>Le présent accord prend effet le {{date_debut}}.</p></div>`
  },

  {
    code: 'rech2_nda_scientifique',
    name: "Accord de confidentialité de recherche (NDA scientifique)",
    category: 'academique',
    price: 4000,
    priceMax: 13000,
    description: "Accord de non-divulgation adapté au contexte scientifique, protégeant les données de recherche, résultats préliminaires et inventions avant leur dépôt ou publication.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 80,
    fieldsJson: F([
      { key: 'partie_divulgatrice', label: "Partie divulgatrice", type: 'text', required: true },
      { key: 'partie_receptrice', label: "Partie réceptrice", type: 'text', required: true },
      { key: 'informations_confidentielles', label: "Nature des informations confidentielles", type: 'textarea', required: true },
      { key: 'duree_confidentialite', label: "Durée de confidentialité", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE CONFIDENTIALITÉ DE RECHERCHE (NDA SCIENTIFIQUE)</h1><p><strong>PARTIE DIVULGATRICE :</strong> {{partie_divulgatrice}}</p><p><strong>PARTIE RÉCEPTRICE :</strong> {{partie_receptrice}}</p><h2>ARTICLE 1 – INFORMATIONS PROTÉGÉES</h2><p>{{informations_confidentielles}}</p><h2>ARTICLE 2 – OBLIGATIONS</h2><p>La partie réceptrice s'engage à ne pas divulguer, reproduire ou utiliser les informations à des fins autres que celles autorisées.</p><h2>ARTICLE 3 – DURÉE</h2><p>Les obligations de confidentialité courent pendant {{duree_confidentialite}} à compter du {{date_signature}}.</p><h2>ARTICLE 4 – EXCEPTIONS</h2><p>Ne sont pas couverts par la confidentialité les informations tombées dans le domaine public ou connues antérieurement de la partie réceptrice.</p></div>`
  },

  {
    code: 'rech2_co_invention',
    name: "Accord de co-invention (inventeurs multiples)",
    category: 'academique',
    price: 8000,
    priceMax: 27000,
    description: "Convention réglant les droits et obligations de plusieurs co-inventeurs sur une invention commune, notamment la répartition des droits, des coûts et des revenus.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'liste_inventeurs', label: "Liste des co-inventeurs (noms, qualités, institutions)", type: 'textarea', required: true },
      { key: 'titre_invention', label: "Titre de l'invention", type: 'text', required: true },
      { key: 'repartition_droits', label: "Répartition des droits entre co-inventeurs (%)", type: 'text', required: true },
      { key: 'gestionnaire', label: "Gestionnaire désigné du brevet", type: 'text', required: true },
      { key: 'date_accord', label: "Date de l'accord", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE CO-INVENTION (INVENTEURS MULTIPLES)</h1><h2>ARTICLE 1 – PARTIES</h2><p>{{liste_inventeurs}}</p><h2>ARTICLE 2 – INVENTION CONCERNÉE</h2><p>{{titre_invention}}</p><h2>ARTICLE 3 – RÉPARTITION DES DROITS</h2><p>{{repartition_droits}}</p><h2>ARTICLE 4 – GESTION</h2><p>La gestion administrative et financière du brevet est confiée à : {{gestionnaire}}</p><h2>ARTICLE 5 – DÉCISIONS</h2><p>Toute décision relative au brevet (dépôt, cession, licence) requiert l'accord des co-inventeurs représentant plus de 50% des droits.</p><p>Fait le {{date_accord}}</p></div>`
  },

  {
    code: 'rech2_veille_brevetaire',
    name: "Accord de service de veille technologique et brevetaire",
    category: 'academique',
    price: 5000,
    priceMax: 18000,
    description: "Contrat de prestation pour la surveillance continue de l'état de la technique et des dépôts de brevets dans un domaine technologique, avec rapports périodiques.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 55,
    fieldsJson: F([
      { key: 'client', label: "Client (bénéficiaire de la veille)", type: 'text', required: true },
      { key: 'prestataire', label: "Cabinet prestataire", type: 'text', required: true },
      { key: 'domaine_technique', label: "Domaine technique surveillé", type: 'text', required: true },
      { key: 'frequence_rapports', label: "Fréquence des rapports de veille", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début du service", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE VEILLE TECHNOLOGIQUE ET BREVETAIRE</h1><p><strong>CLIENT :</strong> {{client}}</p><p><strong>PRESTATAIRE :</strong> {{prestataire}}</p><h2>ARTICLE 1 – OBJET</h2><p>Le prestataire assure une veille technologique et brevetaire continue dans le domaine : {{domaine_technique}}</p><h2>ARTICLE 2 – LIVRABLES</h2><p>Des rapports de veille seront transmis {{frequence_rapports}}. Chaque rapport comprendra les nouveaux dépôts, l'analyse des tendances et les alertes concurrentielles.</p><h2>ARTICLE 3 – BASES DE DONNÉES</h2><p>La veille couvre les bases OAPI, WIPO-PATENTSCOPE, EPO et les bases nationales pertinentes.</p><p>Début du service : {{date_debut}}</p></div>`
  },

  {
    code: 'rech2_recherche_anteriorite',
    name: "Accord de service de recherche d'antériorité",
    category: 'academique',
    price: 4000,
    priceMax: 14000,
    description: "Mandat confiant à un cabinet spécialisé la réalisation d'une recherche d'antériorité pour évaluer la brevetabilité d'une invention avant son dépôt OAPI.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 67,
    fieldsJson: F([
      { key: 'mandant', label: "Mandant (inventeur ou entreprise)", type: 'text', required: true },
      { key: 'cabinet_recherche', label: "Cabinet mandataire", type: 'text', required: true },
      { key: 'description_invention', label: "Description sommaire de l'invention", type: 'textarea', required: true },
      { key: 'date_mandat', label: "Date du mandat", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RECHERCHE D'ANTÉRIORITÉ</h1><p><strong>MANDANT :</strong> {{mandant}}</p><p><strong>CABINET :</strong> {{cabinet_recherche}}</p><h2>ARTICLE 1 – MISSION</h2><p>Le cabinet est mandaté pour effectuer une recherche d'antériorité sur l'invention décrite ci-après : {{description_invention}}</p><h2>ARTICLE 2 – PÉRIMÈTRE</h2><p>La recherche couvre les bases OAPI, PATENTSCOPE (WIPO), l'état de la technique publié et la littérature technique pertinente.</p><h2>ARTICLE 3 – LIVRABLE</h2><p>Un rapport écrit d'antériorité sera remis dans un délai de vingt et un (21) jours ouvrables à compter du {{date_mandat}}.</p></div>`
  },

  {
    code: 'rech2_valorisation_recherche',
    name: "Accord de service de valorisation de la recherche (transfert)",
    category: 'academique',
    price: 7000,
    priceMax: 24000,
    description: "Contrat de prestation encadrant les activités de valorisation des résultats de la recherche, incluant le brevet, la licence et le transfert vers le secteur économique.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 58,
    fieldsJson: F([
      { key: 'institution_recherche', label: "Institution de recherche", type: 'text', required: true },
      { key: 'structure_valorisation', label: "Structure de valorisation mandatée", type: 'text', required: true },
      { key: 'resultats_valoriser', label: "Résultats de recherche à valoriser", type: 'textarea', required: true },
      { key: 'objectifs_valorisation', label: "Objectifs de valorisation", type: 'textarea', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE VALORISATION DE LA RECHERCHE</h1><p><strong>INSTITUTION :</strong> {{institution_recherche}}</p><p><strong>STRUCTURE DE VALORISATION :</strong> {{structure_valorisation}}</p><h2>ARTICLE 1 – RÉSULTATS CONCERNÉS</h2><p>{{resultats_valoriser}}</p><h2>ARTICLE 2 – OBJECTIFS</h2><p>{{objectifs_valorisation}}</p><h2>ARTICLE 3 – MISSION</h2><p>La structure de valorisation est chargée d'identifier des partenaires industriels, de négocier les accords de licence et de suivre les transferts de technologie.</p><p>Fait le {{date_signature}}</p></div>`
  },

  {
    code: 'rech2_convention_cifre',
    name: "Accord de convention CIFRE (doctorat en entreprise)",
    category: 'academique',
    price: 6000,
    priceMax: 20000,
    description: "Convention tripartite université-entreprise-doctorant organisant le déroulement d'une thèse de doctorat réalisée en entreprise, inspirée du dispositif CIFRE adapté au contexte ivoirien.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 64,
    fieldsJson: F([
      { key: 'universite', label: "Université ou grande école", type: 'text', required: true },
      { key: 'entreprise_accueil', label: "Entreprise d'accueil", type: 'text', required: true },
      { key: 'nom_doctorant', label: "Nom du doctorant", type: 'text', required: true },
      { key: 'sujet_these', label: "Sujet de thèse", type: 'textarea', required: true },
      { key: 'date_debut_these', label: "Date de début de la thèse", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONVENTION CIFRE – DOCTORAT EN ENTREPRISE</h1><p><strong>UNIVERSITÉ :</strong> {{universite}}</p><p><strong>ENTREPRISE :</strong> {{entreprise_accueil}}</p><p><strong>DOCTORANT :</strong> {{nom_doctorant}}</p><h2>ARTICLE 1 – SUJET DE THÈSE</h2><p>{{sujet_these}}</p><h2>ARTICLE 2 – CONDITIONS D'ACCUEIL</h2><p>Le doctorant est accueilli à temps plein au sein de l'entreprise tout en restant rattaché à l'université pour le suivi académique.</p><h2>ARTICLE 3 – RÉMUNÉRATION</h2><p>L'entreprise verse une allocation mensuelle au doctorant selon le barème en vigueur.</p><h2>ARTICLE 4 – PROPRIÉTÉ INTELLECTUELLE</h2><p>Les inventions réalisées dans le cadre de la thèse font l'objet d'une co-titularité université-entreprise.</p><p>Début : {{date_debut_these}}</p></div>`
  },

  {
    code: 'rech2_bourse_fondation',
    name: "Accord de bourse de recherche (fondation)",
    category: 'academique',
    price: 4000,
    priceMax: 14000,
    description: "Convention d'attribution d'une bourse de recherche entre une fondation ou un organisme bailleur et un chercheur ou une équipe de recherche, avec obligations de rapport.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 59,
    fieldsJson: F([
      { key: 'nom_fondation', label: "Nom de la fondation/bailleur", type: 'text', required: true },
      { key: 'beneficiaire_bourse', label: "Bénéficiaire de la bourse", type: 'text', required: true },
      { key: 'programme_recherche', label: "Programme de recherche financé", type: 'textarea', required: true },
      { key: 'montant_bourse', label: "Montant de la bourse (FCFA)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début de la bourse", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE BOURSE DE RECHERCHE</h1><p><strong>FONDATION :</strong> {{nom_fondation}}</p><p><strong>BÉNÉFICIAIRE :</strong> {{beneficiaire_bourse}}</p><h2>ARTICLE 1 – PROGRAMME</h2><p>{{programme_recherche}}</p><h2>ARTICLE 2 – MONTANT</h2><p>La bourse s'élève à {{montant_bourse}} FCFA versés selon le calendrier annexé.</p><h2>ARTICLE 3 – OBLIGATIONS DU BÉNÉFICIAIRE</h2><p>Le bénéficiaire s'engage à consacrer son activité au programme, à transmettre des rapports d'avancement semestriels et à mentionner le soutien de la fondation dans toute publication.</p><p>Début : {{date_debut}}</p></div>`
  },

  {
    code: 'rech2_prototype_experimentation',
    name: "Accord de service de prototype et expérimentation",
    category: 'academique',
    price: 6000,
    priceMax: 22000,
    description: "Contrat de prestation pour la conception, la fabrication d'un prototype et la conduite des tests d'expérimentation en conditions réelles ou en laboratoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 57,
    fieldsJson: F([
      { key: 'commanditaire', label: "Commanditaire du prototype", type: 'text', required: true },
      { key: 'prestataire', label: "Prestataire fabricant", type: 'text', required: true },
      { key: 'description_prototype', label: "Description du prototype à réaliser", type: 'textarea', required: true },
      { key: 'cahier_charges', label: "Référence du cahier des charges", type: 'text', required: true },
      { key: 'date_livraison', label: "Date de livraison prévue", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PROTOTYPE ET EXPÉRIMENTATION</h1><p><strong>COMMANDITAIRE :</strong> {{commanditaire}}</p><p><strong>PRESTATAIRE :</strong> {{prestataire}}</p><h2>ARTICLE 1 – OBJET</h2><p>{{description_prototype}}</p><h2>ARTICLE 2 – CAHIER DES CHARGES</h2><p>La réalisation est encadrée par le cahier des charges réf. {{cahier_charges}} annexé au présent accord.</p><h2>ARTICLE 3 – DÉLAI</h2><p>Le prototype sera livré au plus tard le {{date_livraison}}.</p><h2>ARTICLE 4 – PROPRIÉTÉ</h2><p>Le prototype et les données d'expérimentation sont la propriété exclusive du commanditaire.</p></div>`
  },

  {
    code: 'rech2_publication_open_access',
    name: "Accord de service de publication scientifique (open access)",
    category: 'academique',
    price: 3000,
    priceMax: 10000,
    description: "Contrat entre un auteur chercheur et un éditeur scientifique pour la publication en libre accès d'un article ou d'un ouvrage, avec cession de droits limitée.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 63,
    fieldsJson: F([
      { key: 'auteur', label: "Auteur(s) de la publication", type: 'text', required: true },
      { key: 'editeur', label: "Éditeur ou revue scientifique", type: 'text', required: true },
      { key: 'titre_article', label: "Titre de l'article/ouvrage", type: 'text', required: true },
      { key: 'licence_creative_commons', label: "Licence Creative Commons retenue", type: 'text', required: true },
      { key: 'date_soumission', label: "Date de soumission", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PUBLICATION SCIENTIFIQUE (OPEN ACCESS)</h1><p><strong>AUTEUR(S) :</strong> {{auteur}}</p><p><strong>ÉDITEUR :</strong> {{editeur}}</p><h2>ARTICLE 1 – PUBLICATION</h2><p>L'éditeur s'engage à publier en libre accès l'article/ouvrage intitulé : <em>{{titre_article}}</em></p><h2>ARTICLE 2 – LICENCE</h2><p>La publication est mise à disposition sous licence : {{licence_creative_commons}}</p><h2>ARTICLE 3 – DROITS DE L'AUTEUR</h2><p>L'auteur conserve ses droits moraux et le droit de déposer la version acceptée dans un répertoire institutionnel.</p><p>Soumission : {{date_soumission}}</p></div>`
  },

  {
    code: 'rech2_labo_incubateur',
    name: "Accord de partenariat labo-incubateur",
    category: 'academique',
    price: 6000,
    priceMax: 21000,
    description: "Convention établissant un partenariat entre un laboratoire de recherche universitaire et un incubateur ou accélérateur de startups pour la valorisation de l'innovation.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 66,
    fieldsJson: F([
      { key: 'laboratoire', label: "Laboratoire de recherche", type: 'text', required: true },
      { key: 'incubateur', label: "Incubateur/accélérateur partenaire", type: 'text', required: true },
      { key: 'missions_communes', label: "Missions communes définies", type: 'textarea', required: true },
      { key: 'ressources_partagees', label: "Ressources partagées (équipements, expertises)", type: 'textarea', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT LABO-INCUBATEUR</h1><p><strong>LABORATOIRE :</strong> {{laboratoire}}</p><p><strong>INCUBATEUR :</strong> {{incubateur}}</p><h2>ARTICLE 1 – MISSIONS COMMUNES</h2><p>{{missions_communes}}</p><h2>ARTICLE 2 – RESSOURCES PARTAGÉES</h2><p>{{ressources_partagees}}</p><h2>ARTICLE 3 – FLUX DE PROJETS</h2><p>Le laboratoire s'engage à orienter vers l'incubateur les projets présentant un potentiel de valorisation économique. L'incubateur apporte son réseau et son expertise en développement d'entreprise.</p><p>Fait le {{date_signature}}</p></div>`
  },

  {
    code: 'rech2_labo_essais_analyses',
    name: "Accord de service de laboratoire d'essais et analyses",
    category: 'academique',
    price: 4000,
    priceMax: 14000,
    description: "Contrat de prestation pour la réalisation d'essais et d'analyses techniques en laboratoire accrédité, avec rapport de résultats opposable.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 61,
    fieldsJson: F([
      { key: 'client_essai', label: "Client demandeur", type: 'text', required: true },
      { key: 'laboratoire', label: "Laboratoire d'essais", type: 'text', required: true },
      { key: 'nature_essais', label: "Nature des essais et analyses demandés", type: 'textarea', required: true },
      { key: 'echantillons', label: "Description des échantillons fournis", type: 'text', required: true },
      { key: 'date_depot', label: "Date de dépôt des échantillons", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE LABORATOIRE D'ESSAIS ET ANALYSES</h1><p><strong>CLIENT :</strong> {{client_essai}}</p><p><strong>LABORATOIRE :</strong> {{laboratoire}}</p><h2>ARTICLE 1 – ESSAIS DEMANDÉS</h2><p>{{nature_essais}}</p><h2>ARTICLE 2 – ÉCHANTILLONS</h2><p>{{echantillons}} déposés le {{date_depot}}</p><h2>ARTICLE 3 – RAPPORT</h2><p>Le laboratoire émettra un rapport technique signé par le responsable technique accrédité, opposable aux tiers.</p><h2>ARTICLE 4 – CONFIDENTIALITÉ</h2><p>Les résultats sont confidentiels et ne seront communiqués qu'au client.</p></div>`
  },

  {
    code: 'rech2_rapport_valorisation',
    name: "Rapport de valorisation de la recherche",
    category: 'academique',
    price: 5000,
    priceMax: 16000,
    description: "Document structuré présentant les résultats de la recherche, leur potentiel économique, les pistes de valorisation et la stratégie de transfert technologique recommandée.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 54,
    fieldsJson: F([
      { key: 'institution', label: "Institution de recherche", type: 'text', required: true },
      { key: 'equipe_recherche', label: "Équipe de recherche", type: 'text', required: true },
      { key: 'resultats_principaux', label: "Résultats principaux de la recherche", type: 'textarea', required: true },
      { key: 'potentiel_economique', label: "Potentiel économique identifié", type: 'textarea', required: true },
      { key: 'date_rapport', label: "Date du rapport", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>RAPPORT DE VALORISATION DE LA RECHERCHE</h1><p><strong>INSTITUTION :</strong> {{institution}}</p><p><strong>ÉQUIPE :</strong> {{equipe_recherche}}</p><h2>1. RÉSULTATS SCIENTIFIQUES</h2><p>{{resultats_principaux}}</p><h2>2. POTENTIEL ÉCONOMIQUE</h2><p>{{potentiel_economique}}</p><h2>3. PISTES DE VALORISATION</h2><p>Les pistes identifiées incluent : le dépôt de brevet OAPI, la création de spin-off, les accords de licence avec des industriels régionaux et le co-développement avec des partenaires du secteur privé.</p><h2>4. RECOMMANDATIONS</h2><p>Il est recommandé d'initier les démarches de protection PI dans un délai de 6 mois.</p><p>Date : {{date_rapport}}</p></div>`
  },

  {
    code: 'rech2_strategie_pi',
    name: "Plan de développement de la stratégie PI",
    category: 'academique',
    price: 7000,
    priceMax: 24000,
    description: "Document stratégique définissant la politique de propriété intellectuelle d'une organisation de recherche, incluant les axes de protection, de valorisation et de défense.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 56,
    fieldsJson: F([
      { key: 'organisation', label: "Organisation concernée", type: 'text', required: true },
      { key: 'portefeuille_pi_actuel', label: "État du portefeuille PI actuel", type: 'textarea', required: true },
      { key: 'axes_strategiques', label: "Axes stratégiques PI prioritaires", type: 'textarea', required: true },
      { key: 'budget_pi', label: "Budget PI annuel prévu (FCFA)", type: 'text', required: true },
      { key: 'date_plan', label: "Date du plan", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT DE LA STRATÉGIE PI</h1><p><strong>ORGANISATION :</strong> {{organisation}}</p><h2>1. ÉTAT DES LIEUX</h2><p>{{portefeuille_pi_actuel}}</p><h2>2. AXES STRATÉGIQUES</h2><p>{{axes_strategiques}}</p><h2>3. BUDGET</h2><p>{{budget_pi}} FCFA affectés annuellement à la politique PI.</p><h2>4. MISE EN ŒUVRE</h2><p>Un responsable PI sera désigné pour coordonner les dépôts, assurer la veille et animer la sensibilisation des chercheurs.</p><p>Plan établi le {{date_plan}}</p></div>`
  },

  {
    code: 'rech2_charte_integrite_scientifique',
    name: "Charte de l'intégrité scientifique et de la propriété intellectuelle",
    category: 'academique',
    price: 4000,
    priceMax: 12000,
    description: "Document fondateur établissant les principes d'intégrité scientifique et les règles de propriété intellectuelle applicables à tous les membres d'une institution de recherche.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 71,
    fieldsJson: F([
      { key: 'nom_institution', label: "Nom de l'institution", type: 'text', required: true },
      { key: 'autorite_signataire', label: "Autorité signataire (Président, DG)", type: 'text', required: true },
      { key: 'principes_integrite', label: "Principes d'intégrité adoptés", type: 'textarea', required: true },
      { key: 'date_adoption', label: "Date d'adoption de la charte", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CHARTE DE L'INTÉGRITÉ SCIENTIFIQUE ET DE LA PROPRIÉTÉ INTELLECTUELLE</h1><p><strong>INSTITUTION :</strong> {{nom_institution}}</p><h2>PRÉAMBULE</h2><p>{{nom_institution}}, représentée par {{autorite_signataire}}, adopte la présente charte pour promouvoir l'excellence scientifique et la protection des créations intellectuelles.</p><h2>ARTICLE 1 – PRINCIPES FONDAMENTAUX</h2><p>{{principes_integrite}}</p><h2>ARTICLE 2 – PROPRIÉTÉ INTELLECTUELLE</h2><p>Toute invention ou création réalisée dans le cadre des activités de l'institution appartient à celle-ci, sous réserve des droits moraux des auteurs/inventeurs.</p><h2>ARTICLE 3 – SANCTIONS</h2><p>Toute violation de la présente charte est passible de sanctions disciplinaires conformément au règlement intérieur.</p><p>Adoptée le {{date_adoption}}</p></div>`
  },

  // ─── 25 templates Transfert de technologie (trans_, commercial_financier) ───

  {
    code: 'trans_transfert_pays_dev_afrique',
    name: "Accord de transfert de technologie (pays développé vers Afrique)",
    category: 'commercial_financier',
    price: 14000,
    priceMax: 50000,
    description: "Convention cadre régissant le transfert d'une technologie depuis un pays développé vers une entreprise ou institution africaine, incluant formation, documentation et assistance.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 76,
    fieldsJson: F([
      { key: 'fournisseur_technologie', label: "Fournisseur de technologie (pays d'origine)", type: 'text', required: true },
      { key: 'beneficiaire_africain', label: "Bénéficiaire africain", type: 'text', required: true },
      { key: 'technologie_transferee', label: "Description de la technologie transférée", type: 'textarea', required: true },
      { key: 'conditions_financieres', label: "Conditions financières du transfert", type: 'textarea', required: true },
      { key: 'duree_accord', label: "Durée de l'accord", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE TRANSFERT DE TECHNOLOGIE</h1><p><strong>FOURNISSEUR :</strong> {{fournisseur_technologie}}</p><p><strong>BÉNÉFICIAIRE :</strong> {{beneficiaire_africain}}</p><h2>ARTICLE 1 – TECHNOLOGIE TRANSFÉRÉE</h2><p>{{technologie_transferee}}</p><h2>ARTICLE 2 – CONDITIONS FINANCIÈRES</h2><p>{{conditions_financieres}}</p><h2>ARTICLE 3 – FORMATION ET ASSISTANCE</h2><p>Le fournisseur s'engage à former le personnel du bénéficiaire et à fournir une assistance technique pendant la durée d'adaptation.</p><h2>ARTICLE 4 – DURÉE</h2><p>{{duree_accord}}</p><p>Signé le {{date_signature}}</p></div>`
  },

  {
    code: 'trans_licence_fabrication_sous_licence',
    name: "Accord de licence de technologie (fabrication sous licence)",
    category: 'commercial_financier',
    price: 12000,
    priceMax: 42000,
    description: "Contrat autorisant un fabricant local à produire sous licence un produit selon les spécifications techniques du donneur de licence, moyennant redevances.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 72,
    fieldsJson: F([
      { key: 'donneur_licence', label: "Donneur de licence", type: 'text', required: true },
      { key: 'fabricant_licencie', label: "Fabricant licencié", type: 'text', required: true },
      { key: 'produit_fabriquer', label: "Produit à fabriquer sous licence", type: 'text', required: true },
      { key: 'specifications_techniques', label: "Référence des spécifications techniques", type: 'text', required: true },
      { key: 'taux_redevance', label: "Taux de redevance par unité ou % CA", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début de la fabrication", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE LICENCE DE TECHNOLOGIE – FABRICATION SOUS LICENCE</h1><p><strong>DONNEUR DE LICENCE :</strong> {{donneur_licence}}</p><p><strong>FABRICANT LICENCIÉ :</strong> {{fabricant_licencie}}</p><h2>ARTICLE 1 – PRODUIT</h2><p>Le fabricant est autorisé à produire : {{produit_fabriquer}}</p><h2>ARTICLE 2 – SPÉCIFICATIONS</h2><p>La fabrication doit se conformer aux spécifications techniques réf. {{specifications_techniques}}.</p><h2>ARTICLE 3 – REDEVANCES</h2><p>{{taux_redevance}}</p><h2>ARTICLE 4 – CONTRÔLE QUALITÉ</h2><p>Le donneur de licence dispose d'un droit d'inspection des installations et de contrôle de la qualité.</p><p>Début : {{date_debut}}</p></div>`
  },

  {
    code: 'trans_franchise_technologique',
    name: "Accord de franchise technologique (process industriel)",
    category: 'commercial_financier',
    price: 13000,
    priceMax: 45000,
    description: "Contrat de franchise encadrant le transfert d'un procédé industriel complet (process, savoir-faire, marque) vers un franchisé local en Afrique de l'Ouest.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'franchiseur', label: "Franchiseur (fournisseur du concept)", type: 'text', required: true },
      { key: 'franchisé', label: "Franchisé (exploitant local)", type: 'text', required: true },
      { key: 'process_industriel', label: "Description du procédé industriel franchisé", type: 'textarea', required: true },
      { key: 'droit_entree', label: "Droit d'entrée (FCFA)", type: 'text', required: true },
      { key: 'date_ouverture', label: "Date d'ouverture prévue", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE FRANCHISE TECHNOLOGIQUE (PROCESS INDUSTRIEL)</h1><p><strong>FRANCHISEUR :</strong> {{franchiseur}}</p><p><strong>FRANCHISÉ :</strong> {{franchisé}}</p><h2>ARTICLE 1 – PROCÉDÉ CONCÉDÉ</h2><p>{{process_industriel}}</p><h2>ARTICLE 2 – DROIT D'ENTRÉE</h2><p>{{droit_entree}} FCFA payable à la signature.</p><h2>ARTICLE 3 – ASSISTANCE DU FRANCHISEUR</h2><p>Le franchiseur fournit la formation initiale, les manuels d'exploitation, le suivi qualité et les mises à jour technologiques.</p><h2>ARTICLE 4 – OBLIGATIONS DU FRANCHISÉ</h2><p>Le franchisé exploite le process conformément aux standards du franchiseur et verse les redevances périodiques convenues.</p><p>Ouverture prévue le {{date_ouverture}}</p></div>`
  },

  {
    code: 'trans_assistance_technique_formation',
    name: "Accord de service d'assistance technique et formation (technology transfer)",
    category: 'commercial_financier',
    price: 8000,
    priceMax: 28000,
    description: "Contrat de prestation d'assistance technique et de formation du personnel local dans le cadre d'un projet de transfert de technologie industrielle.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 74,
    fieldsJson: F([
      { key: 'donneur_assistance', label: "Prestataire d'assistance technique", type: 'text', required: true },
      { key: 'beneficiaire', label: "Bénéficiaire de la formation", type: 'text', required: true },
      { key: 'programme_formation', label: "Programme de formation détaillé", type: 'textarea', required: true },
      { key: 'nombre_stagiaires', label: "Nombre de stagiaires à former", type: 'text', required: true },
      { key: 'date_debut_formation', label: "Date de début de la formation", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ASSISTANCE TECHNIQUE ET FORMATION</h1><p><strong>PRESTATAIRE :</strong> {{donneur_assistance}}</p><p><strong>BÉNÉFICIAIRE :</strong> {{beneficiaire}}</p><h2>ARTICLE 1 – PROGRAMME DE FORMATION</h2><p>{{programme_formation}}</p><h2>ARTICLE 2 – EFFECTIFS</h2><p>{{nombre_stagiaires}} stagiaires seront formés par promotion.</p><h2>ARTICLE 3 – MATÉRIEL PÉDAGOGIQUE</h2><p>Le prestataire fournit l'ensemble des manuels, outils et équipements nécessaires à la formation.</p><h2>ARTICLE 4 – CERTIFICATION</h2><p>À l'issue de la formation, une attestation de compétence est délivrée aux stagiaires ayant satisfait aux évaluations.</p><p>Début : {{date_debut_formation}}</p></div>`
  },

  {
    code: 'trans_usine_cle_en_main',
    name: "Accord de service de mise en place d'une usine clé en main (turnkey)",
    category: 'commercial_financier',
    price: 18000,
    priceMax: 65000,
    description: "Contrat EPC/turnkey pour la conception, la construction et la mise en service complète d'une unité industrielle livrée clé en main à l'opérateur local.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'maitre_ouvrage', label: "Maître d'ouvrage (client)", type: 'text', required: true },
      { key: 'contractant_general', label: "Contractant général (fournisseur clé en main)", type: 'text', required: true },
      { key: 'description_unite', label: "Description de l'unité industrielle", type: 'textarea', required: true },
      { key: 'prix_contrat', label: "Prix du contrat clé en main (FCFA)", type: 'text', required: true },
      { key: 'date_mise_en_service', label: "Date de mise en service garantie", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD CLÉS EN MAIN (TURNKEY) – MISE EN PLACE D'USINE</h1><p><strong>MAÎTRE D'OUVRAGE :</strong> {{maitre_ouvrage}}</p><p><strong>CONTRACTANT GÉNÉRAL :</strong> {{contractant_general}}</p><h2>ARTICLE 1 – OBJET</h2><p>{{description_unite}}</p><h2>ARTICLE 2 – PÉRIMÈTRE</h2><p>Le contractant assure la conception, la fourniture des équipements, le génie civil, le montage, les tests et la mise en service complète de l'unité.</p><h2>ARTICLE 3 – PRIX</h2><p>{{prix_contrat}} FCFA, prix ferme et définitif sauf avenants signés.</p><h2>ARTICLE 4 – DATE DE LIVRAISON</h2><p>Mise en service garantie au plus tard le {{date_mise_en_service}}.</p></div>`
  },

  {
    code: 'trans_epc_engineering',
    name: "Accord de service d'engineering et procurement (EPC)",
    category: 'commercial_financier',
    price: 16000,
    priceMax: 58000,
    description: "Contrat EPC (Engineering, Procurement, Construction) pour la réalisation d'un projet industriel ou d'infrastructure selon les standards internationaux.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 63,
    fieldsJson: F([
      { key: 'proprietaire_projet', label: "Propriétaire du projet", type: 'text', required: true },
      { key: 'contractant_epc', label: "Contractant EPC", type: 'text', required: true },
      { key: 'objet_projet', label: "Objet et périmètre du projet EPC", type: 'textarea', required: true },
      { key: 'montant_contrat', label: "Montant du contrat EPC (FCFA)", type: 'text', required: true },
      { key: 'date_commencement', label: "Date de commencement des travaux", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD EPC – ENGINEERING, PROCUREMENT, CONSTRUCTION</h1><p><strong>PROPRIÉTAIRE :</strong> {{proprietaire_projet}}</p><p><strong>CONTRACTANT EPC :</strong> {{contractant_epc}}</p><h2>ARTICLE 1 – PÉRIMÈTRE EPC</h2><p>{{objet_projet}}</p><h2>ARTICLE 2 – PRIX</h2><p>{{montant_contrat}} FCFA payable selon les jalons définis au programme contractuel.</p><h2>ARTICLE 3 – INGÉNIERIE</h2><p>Le contractant réalise les études de détail, prépare les spécifications d'achat et supervise la construction.</p><h2>ARTICLE 4 – GARANTIES</h2><p>Garantie de bonne fin et garantie de performance pendant douze (12) mois après mise en service.</p><p>Commencement : {{date_commencement}}</p></div>`
  },

  {
    code: 'trans_joint_venture_technologique',
    name: "Accord de joint-venture technologique",
    category: 'commercial_financier',
    price: 15000,
    priceMax: 52000,
    description: "Convention de création d'une société commune entre un partenaire technologique étranger et un opérateur local africain pour l'exploitation conjointe d'une technologie.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'partenaire_etranger', label: "Partenaire étranger apporteur de technologie", type: 'text', required: true },
      { key: 'partenaire_local', label: "Partenaire local africain", type: 'text', required: true },
      { key: 'denomination_jv', label: "Dénomination de la joint-venture", type: 'text', required: true },
      { key: 'repartition_capital', label: "Répartition du capital (%)", type: 'text', required: true },
      { key: 'apport_technologique', label: "Description de l'apport technologique", type: 'textarea', required: true },
      { key: 'date_constitution', label: "Date de constitution", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE JOINT-VENTURE TECHNOLOGIQUE</h1><p><strong>PARTENAIRE ÉTRANGER :</strong> {{partenaire_etranger}}</p><p><strong>PARTENAIRE LOCAL :</strong> {{partenaire_local}}</p><h2>ARTICLE 1 – CRÉATION</h2><p>Les parties s'accordent pour créer une entité dénommée <strong>{{denomination_jv}}</strong>.</p><h2>ARTICLE 2 – CAPITAL</h2><p>Répartition : {{repartition_capital}}</p><h2>ARTICLE 3 – APPORT TECHNOLOGIQUE</h2><p>{{apport_technologique}}</p><h2>ARTICLE 4 – GOUVERNANCE</h2><p>La joint-venture est dirigée par un conseil d'administration composé de représentants des deux partenaires en proportion de leurs parts.</p><p>Constitué le {{date_constitution}}</p></div>`
  },

  {
    code: 'trans_localisation_technologie',
    name: "Accord de service de localisation de technologie (adaptation locale)",
    category: 'commercial_financier',
    price: 9000,
    priceMax: 32000,
    description: "Contrat de prestation d'ingénierie pour l'adaptation d'une technologie importée aux conditions locales : matières premières disponibles, normes nationales, compétences locales.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 61,
    fieldsJson: F([
      { key: 'commanditaire', label: "Commanditaire de la localisation", type: 'text', required: true },
      { key: 'bureau_ingenierie', label: "Bureau d'ingénierie", type: 'text', required: true },
      { key: 'technologie_adapter', label: "Technologie à adapter/localiser", type: 'textarea', required: true },
      { key: 'contraintes_locales', label: "Contraintes locales à intégrer", type: 'textarea', required: true },
      { key: 'date_livraison_etude', label: "Date de livraison de l'étude", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE LOCALISATION DE TECHNOLOGIE</h1><p><strong>COMMANDITAIRE :</strong> {{commanditaire}}</p><p><strong>BUREAU D'INGÉNIERIE :</strong> {{bureau_ingenierie}}</p><h2>ARTICLE 1 – TECHNOLOGIE À ADAPTER</h2><p>{{technologie_adapter}}</p><h2>ARTICLE 2 – CONTRAINTES LOCALES</h2><p>{{contraintes_locales}}</p><h2>ARTICLE 3 – LIVRABLES</h2><p>Le bureau fournira les schémas adaptés, la liste des substitutions de matériaux, les procédures révisées et un plan de formation.</p><p>Livraison prévue le {{date_livraison_etude}}</p></div>`
  },

  {
    code: 'trans_formation_ingenieurs_locaux',
    name: "Accord de service de formation d'ingénieurs locaux",
    category: 'commercial_financier',
    price: 7000,
    priceMax: 25000,
    description: "Contrat de formation intensive pour le renforcement des capacités d'ingénieurs locaux dans la maîtrise et l'exploitation d'une technologie industrielle transférée.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 69,
    fieldsJson: F([
      { key: 'organisme_formation', label: "Organisme de formation", type: 'text', required: true },
      { key: 'entreprise_beneficiaire', label: "Entreprise bénéficiaire", type: 'text', required: true },
      { key: 'competences_ciblées', label: "Compétences techniques ciblées", type: 'textarea', required: true },
      { key: 'effectif_ingenieurs', label: "Effectif d'ingénieurs à former", type: 'text', required: true },
      { key: 'date_debut_session', label: "Date de début de la première session", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FORMATION D'INGÉNIEURS LOCAUX</h1><p><strong>ORGANISME :</strong> {{organisme_formation}}</p><p><strong>ENTREPRISE :</strong> {{entreprise_beneficiaire}}</p><h2>ARTICLE 1 – COMPÉTENCES CIBLÉES</h2><p>{{competences_ciblées}}</p><h2>ARTICLE 2 – EFFECTIFS</h2><p>{{effectif_ingenieurs}} ingénieurs à former en plusieurs sessions.</p><h2>ARTICLE 3 – PROGRAMME</h2><p>La formation alterne modules théoriques, travaux pratiques sur équipements réels et mises en situation.</p><h2>ARTICLE 4 – ÉVALUATION</h2><p>Un test de compétences validera chaque module. Une attestation de qualification est délivrée aux reçus.</p><p>Première session le {{date_debut_session}}</p></div>`
  },

  {
    code: 'trans_stages_technologiques',
    name: "Accord de programme de stages technologiques (co-développement)",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 17000,
    description: "Convention organisant un programme de stages technologiques permettant à des étudiants ou jeunes ingénieurs d'acquérir des compétences dans le cadre d'un partenariat de co-développement.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 66,
    fieldsJson: F([
      { key: 'entreprise_accueil', label: "Entreprise d'accueil des stagiaires", type: 'text', required: true },
      { key: 'institution_partenaire', label: "Institution partenaire (université/grande école)", type: 'text', required: true },
      { key: 'domaines_stages', label: "Domaines technologiques des stages", type: 'textarea', required: true },
      { key: 'nombre_places', label: "Nombre de places de stage par an", type: 'text', required: true },
      { key: 'date_debut_programme', label: "Date de début du programme", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE PROGRAMME DE STAGES TECHNOLOGIQUES</h1><p><strong>ENTREPRISE D'ACCUEIL :</strong> {{entreprise_accueil}}</p><p><strong>INSTITUTION :</strong> {{institution_partenaire}}</p><h2>ARTICLE 1 – DOMAINES</h2><p>{{domaines_stages}}</p><h2>ARTICLE 2 – CAPACITÉ</h2><p>{{nombre_places}} places de stage sont proposées chaque année académique.</p><h2>ARTICLE 3 – CONDITIONS D'ACCUEIL</h2><p>L'entreprise fournit un encadrant technique, les équipements nécessaires et une gratification conforme à la réglementation ivoirienne.</p><p>Début du programme : {{date_debut_programme}}</p></div>`
  },

  {
    code: 'trans_partenariat_sud_sud',
    name: "Accord de partenariat Sud-Sud (technologie Afrique-Afrique)",
    category: 'commercial_financier',
    price: 8000,
    priceMax: 29000,
    description: "Convention de transfert de technologie entre pays africains (coopération Sud-Sud), valorisant les innovations développées localement et favorisant leur diffusion continentale.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 64,
    fieldsJson: F([
      { key: 'pays_fournisseur', label: "Pays et entité fournisseur (Afrique)", type: 'text', required: true },
      { key: 'pays_beneficiaire', label: "Pays et entité bénéficiaire (Afrique)", type: 'text', required: true },
      { key: 'technologie_partagee', label: "Technologie ou innovation partagée", type: 'textarea', required: true },
      { key: 'mecanisme_financement', label: "Mécanisme de financement du transfert", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT SUD-SUD – TECHNOLOGIE AFRIQUE-AFRIQUE</h1><p><strong>FOURNISSEUR :</strong> {{pays_fournisseur}}</p><p><strong>BÉNÉFICIAIRE :</strong> {{pays_beneficiaire}}</p><h2>ARTICLE 1 – TECHNOLOGIE TRANSFÉRÉE</h2><p>{{technologie_partagee}}</p><h2>ARTICLE 2 – ESPRIT DU PARTENARIAT</h2><p>Le présent accord s'inscrit dans le cadre de la coopération Sud-Sud et vise à renforcer l'autonomie technologique africaine.</p><h2>ARTICLE 3 – FINANCEMENT</h2><p>{{mecanisme_financement}}</p><h2>ARTICLE 4 – SUIVI</h2><p>Un comité conjoint se réunit semestriellement pour évaluer la mise en œuvre.</p><p>Signé le {{date_signature}}</p></div>`
  },

  {
    code: 'trans_partenariat_cedeao',
    name: "Accord de partenariat technologique CEDEAO",
    category: 'commercial_financier',
    price: 9000,
    priceMax: 32000,
    description: "Accord encadrant un partenariat technologique entre États membres de la CEDEAO, s'inscrivant dans les protocoles communautaires sur la libre circulation des personnes, biens et technologies.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 62,
    fieldsJson: F([
      { key: 'etat_membre_a', label: "État membre CEDEAO A", type: 'text', required: true },
      { key: 'etat_membre_b', label: "État membre CEDEAO B", type: 'text', required: true },
      { key: 'secteur_technologique', label: "Secteur technologique concerné", type: 'text', required: true },
      { key: 'programme_cooperation', label: "Programme de coopération technologique", type: 'textarea', required: true },
      { key: 'date_accord', label: "Date de l'accord", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT TECHNOLOGIQUE CEDEAO</h1><p><strong>ÉTAT MEMBRE A :</strong> {{etat_membre_a}}</p><p><strong>ÉTAT MEMBRE B :</strong> {{etat_membre_b}}</p><h2>ARTICLE 1 – CADRE COMMUNAUTAIRE</h2><p>Le présent accord s'inscrit dans le cadre des traités et protocoles de la CEDEAO relatifs à la coopération technologique.</p><h2>ARTICLE 2 – SECTEUR</h2><p>{{secteur_technologique}}</p><h2>ARTICLE 3 – PROGRAMME</h2><p>{{programme_cooperation}}</p><h2>ARTICLE 4 – FINANCEMENT</h2><p>Le financement peut mobiliser les instruments communautaires CEDEAO et les bailleurs régionaux.</p><p>Accord du {{date_accord}}</p></div>`
  },

  {
    code: 'trans_semences_ameliorees',
    name: "Accord de transfert de semences améliorées (agro)",
    category: 'commercial_financier',
    price: 7000,
    priceMax: 24000,
    description: "Convention de transfert de variétés végétales améliorées entre instituts de recherche agronomique et opérateurs agricoles, incluant les droits d'obtenteur et les conditions de multiplication.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'institut_agro', label: "Institut agronomique fournisseur", type: 'text', required: true },
      { key: 'operateur_agricole', label: "Opérateur agricole bénéficiaire", type: 'text', required: true },
      { key: 'varietes_transferees', label: "Variétés de semences transférées", type: 'text', required: true },
      { key: 'conditions_multiplication', label: "Conditions de multiplication et de distribution", type: 'textarea', required: true },
      { key: 'date_transfert', label: "Date de transfert des semences", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE TRANSFERT DE SEMENCES AMÉLIORÉES</h1><p><strong>FOURNISSEUR :</strong> {{institut_agro}}</p><p><strong>BÉNÉFICIAIRE :</strong> {{operateur_agricole}}</p><h2>ARTICLE 1 – VARIÉTÉS</h2><p>{{varietes_transferees}}</p><h2>ARTICLE 2 – DROITS D'OBTENTEUR</h2><p>Les droits d'obtenteur sur les variétés transférées demeurent la propriété de l'institut fournisseur.</p><h2>ARTICLE 3 – CONDITIONS DE MULTIPLICATION</h2><p>{{conditions_multiplication}}</p><h2>ARTICLE 4 – REDEVANCES</h2><p>L'opérateur versera une redevance d'obtenteur selon le barème convenu en annexe.</p><p>Transfert effectué le {{date_transfert}}</p></div>`
  },

  {
    code: 'trans_technologie_pharmaceutique',
    name: "Accord de transfert de technologie pharmaceutique (génériques)",
    category: 'commercial_financier',
    price: 15000,
    priceMax: 54000,
    description: "Contrat de transfert de technologie de fabrication de médicaments génériques, conforme aux bonnes pratiques de fabrication (BPF) et aux réglementations pharmaceutiques africaines.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 71,
    fieldsJson: F([
      { key: 'laboratoire_source', label: "Laboratoire source de la technologie", type: 'text', required: true },
      { key: 'fabricant_local', label: "Fabricant pharmaceutique local", type: 'text', required: true },
      { key: 'molecules_concernees', label: "Molécules et formes galéniques concernées", type: 'textarea', required: true },
      { key: 'autorite_reglementation', label: "Autorité réglementaire nationale", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début du transfert", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE TRANSFERT DE TECHNOLOGIE PHARMACEUTIQUE (GÉNÉRIQUES)</h1><p><strong>LABORATOIRE SOURCE :</strong> {{laboratoire_source}}</p><p><strong>FABRICANT LOCAL :</strong> {{fabricant_local}}</p><h2>ARTICLE 1 – PRODUITS CONCERNÉS</h2><p>{{molecules_concernees}}</p><h2>ARTICLE 2 – CONFORMITÉ RÉGLEMENTAIRE</h2><p>Le transfert est conduit en conformité avec les exigences de l'autorité {{autorite_reglementation}} et les BPF de l'OMS.</p><h2>ARTICLE 3 – CONTENU DU TRANSFERT</h2><p>Formules maîtresses, procédures de fabrication, méthodes analytiques, dossiers de validation et formation du personnel QA.</p><p>Début : {{date_debut}}</p></div>`
  },

  {
    code: 'trans_energie_renouvelable',
    name: "Accord de transfert de technologie en énergie renouvelable",
    category: 'commercial_financier',
    price: 12000,
    priceMax: 44000,
    description: "Convention de transfert de technologies d'énergie renouvelable (solaire, éolien, biomasse) vers des opérateurs africains, incluant la formation et la maintenance.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 77,
    fieldsJson: F([
      { key: 'fournisseur_tech_er', label: "Fournisseur de technologie EnR", type: 'text', required: true },
      { key: 'operateur_local', label: "Opérateur local bénéficiaire", type: 'text', required: true },
      { key: 'technologie_er', label: "Technologie EnR transférée (type, capacité)", type: 'textarea', required: true },
      { key: 'perimetre_transfert', label: "Périmètre du transfert (équipement, formation, O&M)", type: 'textarea', required: true },
      { key: 'date_mise_en_service', label: "Date de mise en service prévue", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE TRANSFERT DE TECHNOLOGIE EN ÉNERGIE RENOUVELABLE</h1><p><strong>FOURNISSEUR :</strong> {{fournisseur_tech_er}}</p><p><strong>OPÉRATEUR LOCAL :</strong> {{operateur_local}}</p><h2>ARTICLE 1 – TECHNOLOGIE</h2><p>{{technologie_er}}</p><h2>ARTICLE 2 – PÉRIMÈTRE</h2><p>{{perimetre_transfert}}</p><h2>ARTICLE 3 – OBJECTIFS NATIONAUX</h2><p>Le présent transfert s'inscrit dans le Plan National de Développement Énergétique de la Côte d'Ivoire et contribue aux objectifs d'électrification rurale.</p><p>Mise en service prévue le {{date_mise_en_service}}</p></div>`
  },

  {
    code: 'trans_materiaux_construction_locaux',
    name: "Accord de transfert de technologie en construction (matériaux locaux)",
    category: 'commercial_financier',
    price: 9000,
    priceMax: 33000,
    description: "Contrat de transfert de procédés de construction utilisant des matériaux locaux améliorés (terre stabilisée, bambou, pierres locales) pour des bâtiments durables et abordables.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'centre_recherche', label: "Centre de recherche fournisseur du procédé", type: 'text', required: true },
      { key: 'constructeur_local', label: "Constructeur local bénéficiaire", type: 'text', required: true },
      { key: 'procede_construction', label: "Procédé de construction à transférer", type: 'textarea', required: true },
      { key: 'materiaux_locaux', label: "Matériaux locaux utilisés", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE TRANSFERT DE TECHNOLOGIE EN CONSTRUCTION (MATÉRIAUX LOCAUX)</h1><p><strong>CENTRE DE RECHERCHE :</strong> {{centre_recherche}}</p><p><strong>CONSTRUCTEUR LOCAL :</strong> {{constructeur_local}}</p><h2>ARTICLE 1 – PROCÉDÉ TRANSFÉRÉ</h2><p>{{procede_construction}}</p><h2>ARTICLE 2 – MATÉRIAUX</h2><p>Le procédé valorise principalement : {{materiaux_locaux}}</p><h2>ARTICLE 3 – FORMATION</h2><p>Une formation des artisans et techniciens locaux est incluse dans le transfert.</p><h2>ARTICLE 4 – NORMES</h2><p>Le procédé satisfait aux normes de construction en vigueur en Côte d'Ivoire.</p><p>Début : {{date_debut}}</p></div>`
  },

  {
    code: 'trans_technologie_numerique',
    name: "Accord de transfert de technologie numérique (logiciels)",
    category: 'commercial_financier',
    price: 10000,
    priceMax: 36000,
    description: "Contrat de transfert de solutions logicielles et de technologies numériques, incluant la cession ou la licence du code source, la formation et le support technique local.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 78,
    fieldsJson: F([
      { key: 'editeur_logiciel', label: "Éditeur logiciel fournisseur", type: 'text', required: true },
      { key: 'beneficiaire_local', label: "Bénéficiaire local (entreprise ou institution)", type: 'text', required: true },
      { key: 'logiciels_transferes', label: "Logiciels et technologies numériques transférés", type: 'textarea', required: true },
      { key: 'mode_transfert', label: "Mode de transfert (licence, cession code source, SaaS)", type: 'text', required: true },
      { key: 'date_livraison', label: "Date de livraison", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE TRANSFERT DE TECHNOLOGIE NUMÉRIQUE (LOGICIELS)</h1><p><strong>ÉDITEUR :</strong> {{editeur_logiciel}}</p><p><strong>BÉNÉFICIAIRE :</strong> {{beneficiaire_local}}</p><h2>ARTICLE 1 – TECHNOLOGIES TRANSFÉRÉES</h2><p>{{logiciels_transferes}}</p><h2>ARTICLE 2 – MODE DE TRANSFERT</h2><p>{{mode_transfert}}</p><h2>ARTICLE 3 – FORMATION</h2><p>Une formation des équipes techniques est assurée dans les 30 jours suivant la livraison.</p><h2>ARTICLE 4 – MAINTENANCE</h2><p>Un support technique de niveau 2 est garanti pendant 12 mois.</p><p>Livraison : {{date_livraison}}</p></div>`
  },

  {
    code: 'trans_univ_africaines_silicon_valley',
    name: "Accord de partenariat universités africaines-Silicon Valley",
    category: 'commercial_financier',
    price: 11000,
    priceMax: 40000,
    description: "Convention de partenariat entre des universités africaines et des entreprises ou structures de la Silicon Valley pour des échanges technologiques, de programmes et de talents.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 67,
    fieldsJson: F([
      { key: 'universite_africaine', label: "Université africaine partenaire", type: 'text', required: true },
      { key: 'entite_silicon_valley', label: "Entité de la Silicon Valley", type: 'text', required: true },
      { key: 'axes_partenariat', label: "Axes de coopération technologique", type: 'textarea', required: true },
      { key: 'programme_echanges', label: "Programme d'échanges étudiants/chercheurs", type: 'textarea', required: true },
      { key: 'date_signature', label: "Date de signature du partenariat", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT UNIVERSITÉS AFRICAINES – SILICON VALLEY</h1><p><strong>UNIVERSITÉ AFRICAINE :</strong> {{universite_africaine}}</p><p><strong>ENTITÉ PARTENAIRE :</strong> {{entite_silicon_valley}}</p><h2>ARTICLE 1 – AXES DE COOPÉRATION</h2><p>{{axes_partenariat}}</p><h2>ARTICLE 2 – ÉCHANGES</h2><p>{{programme_echanges}}</p><h2>ARTICLE 3 – PROPRIÉTÉ INTELLECTUELLE</h2><p>Toute co-création fera l'objet d'une convention PI spécifique définissant la titularité et le partage des bénéfices.</p><p>Partenariat signé le {{date_signature}}</p></div>`
  },

  {
    code: 'trans_pi_dans_transfert',
    name: "Accord de service de propriété intellectuelle dans le transfert",
    category: 'commercial_financier',
    price: 8000,
    priceMax: 28000,
    description: "Contrat de conseil en propriété intellectuelle pour sécuriser les droits lors d'une opération de transfert de technologie, audit PI, négociation des clauses et enregistrement.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 63,
    fieldsJson: F([
      { key: 'client_pi', label: "Client bénéficiaire du conseil PI", type: 'text', required: true },
      { key: 'conseil_pi', label: "Cabinet conseil en propriété intellectuelle", type: 'text', required: true },
      { key: 'operation_transfert', label: "Description de l'opération de transfert", type: 'textarea', required: true },
      { key: 'droits_securiser', label: "Droits PI à sécuriser", type: 'textarea', required: true },
      { key: 'date_debut_mission', label: "Date de début de la mission", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PROPRIÉTÉ INTELLECTUELLE DANS LE TRANSFERT</h1><p><strong>CLIENT :</strong> {{client_pi}}</p><p><strong>CONSEIL PI :</strong> {{conseil_pi}}</p><h2>ARTICLE 1 – OPÉRATION</h2><p>{{operation_transfert}}</p><h2>ARTICLE 2 – DROITS À SÉCURISER</h2><p>{{droits_securiser}}</p><h2>ARTICLE 3 – MISSION</h2><p>Audit des droits existants, rédaction ou révision des clauses PI, dépôts nécessaires et enregistrement des licences auprès des autorités compétentes.</p><p>Mission débutant le {{date_debut_mission}}</p></div>`
  },

  {
    code: 'trans_audit_technologique',
    name: "Accord de service d'audit technologique avant transfert",
    category: 'commercial_financier',
    price: 7000,
    priceMax: 25000,
    description: "Mission d'audit technique et technologique préalable à un transfert, visant à évaluer la technologie, ses droits, sa maturité et les conditions optimales de transfert.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 59,
    fieldsJson: F([
      { key: 'commanditaire_audit', label: "Commanditaire de l'audit", type: 'text', required: true },
      { key: 'cabinet_auditeur', label: "Cabinet auditeur", type: 'text', required: true },
      { key: 'technologie_auditee', label: "Technologie à auditer", type: 'textarea', required: true },
      { key: 'criteres_evaluation', label: "Critères d'évaluation retenus", type: 'textarea', required: true },
      { key: 'date_remise_rapport', label: "Date de remise du rapport d'audit", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'AUDIT TECHNOLOGIQUE AVANT TRANSFERT</h1><p><strong>COMMANDITAIRE :</strong> {{commanditaire_audit}}</p><p><strong>AUDITEUR :</strong> {{cabinet_auditeur}}</p><h2>ARTICLE 1 – TECHNOLOGIE AUDITÉE</h2><p>{{technologie_auditee}}</p><h2>ARTICLE 2 – CRITÈRES</h2><p>{{criteres_evaluation}}</p><h2>ARTICLE 3 – LIVRABLES</h2><p>Un rapport d'audit complet comprenant : évaluation de la maturité technologique, analyse des droits PI, recommandations sur les conditions de transfert.</p><p>Rapport attendu le {{date_remise_rapport}}</p></div>`
  },

  {
    code: 'trans_hub_technologique',
    name: "Accord de service de centre de technologies (hub technologique)",
    category: 'commercial_financier',
    price: 10000,
    priceMax: 36000,
    description: "Convention encadrant les services d'un hub technologique ou centre de ressources partagées, mettant à disposition équipements, expertise et réseau pour les entreprises innovantes.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 73,
    fieldsJson: F([
      { key: 'gestionnaire_hub', label: "Gestionnaire du hub technologique", type: 'text', required: true },
      { key: 'entreprise_membre', label: "Entreprise membre/utilisatrice", type: 'text', required: true },
      { key: 'services_inclus', label: "Services inclus dans l'adhésion", type: 'textarea', required: true },
      { key: 'cotisation_annuelle', label: "Cotisation annuelle (FCFA)", type: 'text', required: true },
      { key: 'date_adhesion', label: "Date d'adhésion", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – CENTRE DE TECHNOLOGIES (HUB TECHNOLOGIQUE)</h1><p><strong>HUB :</strong> {{gestionnaire_hub}}</p><p><strong>MEMBRE :</strong> {{entreprise_membre}}</p><h2>ARTICLE 1 – SERVICES</h2><p>{{services_inclus}}</p><h2>ARTICLE 2 – COTISATION</h2><p>{{cotisation_annuelle}} FCFA/an, payable en début d'exercice.</p><h2>ARTICLE 3 – UTILISATION DES ÉQUIPEMENTS</h2><p>L'accès aux équipements partagés est soumis au règlement intérieur du hub et aux plages horaires réservées.</p><p>Adhésion effective le {{date_adhesion}}</p></div>`
  },

  {
    code: 'trans_formation_management_techno',
    name: "Accord de service de formation au management de la technologie",
    category: 'commercial_financier',
    price: 6000,
    priceMax: 21000,
    description: "Programme de formation au management de l'innovation et de la technologie destiné aux cadres dirigeants d'entreprises engagées dans des projets de transfert technologique.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 61,
    fieldsJson: F([
      { key: 'organisme_formation', label: "Organisme de formation", type: 'text', required: true },
      { key: 'entreprise_cliente', label: "Entreprise cliente", type: 'text', required: true },
      { key: 'modules_programme', label: "Modules du programme de formation", type: 'textarea', required: true },
      { key: 'nombre_participants', label: "Nombre de participants", type: 'text', required: true },
      { key: 'date_session', label: "Date de la première session", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FORMATION AU MANAGEMENT DE LA TECHNOLOGIE</h1><p><strong>ORGANISME :</strong> {{organisme_formation}}</p><p><strong>CLIENT :</strong> {{entreprise_cliente}}</p><h2>ARTICLE 1 – PROGRAMME</h2><p>{{modules_programme}}</p><h2>ARTICLE 2 – PARTICIPANTS</h2><p>{{nombre_participants}} cadres dirigeants et managers innovation.</p><h2>ARTICLE 3 – PÉDAGOGIE</h2><p>Méthode de cas pratiques africains, études de transferts réussis en Afrique de l'Ouest, ateliers de co-construction de stratégie technologique.</p><p>Première session le {{date_session}}</p></div>`
  },

  {
    code: 'trans_rapport_performance_transfert',
    name: "Rapport de performance transfert de technologie",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 18000,
    description: "Document de bilan évaluant les résultats d'un accord de transfert de technologie : indicateurs de performance, niveau d'appropriation locale, difficultés rencontrées et recommandations.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 55,
    fieldsJson: F([
      { key: 'parties_accord', label: "Parties à l'accord de transfert évalué", type: 'text', required: true },
      { key: 'technologie_evaluee', label: "Technologie transférée évaluée", type: 'text', required: true },
      { key: 'indicateurs_performance', label: "Indicateurs de performance et résultats", type: 'textarea', required: true },
      { key: 'niveau_appropriation', label: "Niveau d'appropriation locale atteint", type: 'textarea', required: true },
      { key: 'date_rapport', label: "Date du rapport", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE – TRANSFERT DE TECHNOLOGIE</h1><p><strong>PARTIES :</strong> {{parties_accord}}</p><p><strong>TECHNOLOGIE :</strong> {{technologie_evaluee}}</p><h2>1. INDICATEURS DE PERFORMANCE</h2><p>{{indicateurs_performance}}</p><h2>2. APPROPRIATION LOCALE</h2><p>{{niveau_appropriation}}</p><h2>3. DIFFICULTÉS RENCONTRÉES</h2><p>Les obstacles identifiés sont documentés en annexe pour alimenter les futures négociations et améliorer les pratiques.</p><h2>4. RECOMMANDATIONS</h2><p>Sur la base de cette évaluation, des ajustements au programme de transfert sont recommandés.</p><p>Rapport établi le {{date_rapport}}</p></div>`
  },

  {
    code: 'trans_plan_national_transfert',
    name: "Plan national de transfert de technologie",
    category: 'commercial_financier',
    price: 12000,
    priceMax: 42000,
    description: "Document stratégique national définissant les orientations, priorités sectorielles, mécanismes institutionnels et financiers pour le transfert de technologie à l'échelle nationale.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 58,
    fieldsJson: F([
      { key: 'autorite_nationale', label: "Autorité nationale portant le plan", type: 'text', required: true },
      { key: 'secteurs_prioritaires', label: "Secteurs prioritaires du plan", type: 'textarea', required: true },
      { key: 'objectifs_strategiques', label: "Objectifs stratégiques à 5 ans", type: 'textarea', required: true },
      { key: 'budget_plan', label: "Budget national alloué (FCFA)", type: 'text', required: true },
      { key: 'date_adoption', label: "Date d'adoption du plan", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>PLAN NATIONAL DE TRANSFERT DE TECHNOLOGIE</h1><p><strong>AUTORITÉ NATIONALE :</strong> {{autorite_nationale}}</p><h2>1. SECTEURS PRIORITAIRES</h2><p>{{secteurs_prioritaires}}</p><h2>2. OBJECTIFS STRATÉGIQUES</h2><p>{{objectifs_strategiques}}</p><h2>3. BUDGET</h2><p>{{budget_plan}} FCFA mobilisés sur la période du plan.</p><h2>4. MÉCANISMES INSTITUTIONNELS</h2><p>Un comité national de pilotage, des agences sectorielles et un fonds de garantie dédié au transfert de technologie seront mis en place.</p><p>Plan adopté le {{date_adoption}}</p></div>`
  },

  {
    code: 'trans_charte_transfert_equitable',
    name: "Charte du transfert de technologie équitable et durable",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 16000,
    description: "Charte définissant les principes d'un transfert de technologie équitable, éthique et durable, respectueux des droits des pays bénéficiaires et de l'environnement.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 66,
    fieldsJson: F([
      { key: 'organisation_promotrice', label: "Organisation promotrice de la charte", type: 'text', required: true },
      { key: 'signataires', label: "Signataires de la charte", type: 'textarea', required: true },
      { key: 'principes_directeurs', label: "Principes directeurs retenus", type: 'textarea', required: true },
      { key: 'mecanisme_suivi', label: "Mécanisme de suivi et de reddition de comptes", type: 'text', required: true },
      { key: 'date_adoption', label: "Date d'adoption de la charte", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CHARTE DU TRANSFERT DE TECHNOLOGIE ÉQUITABLE ET DURABLE</h1><p><strong>ORGANISATION PROMOTRICE :</strong> {{organisation_promotrice}}</p><h2>PRÉAMBULE</h2><p>Les signataires, {{signataires}}, s'engagent à promouvoir un transfert de technologie qui respecte la dignité des peuples, renforce l'autonomie locale et préserve l'environnement.</p><h2>PRINCIPES DIRECTEURS</h2><p>{{principes_directeurs}}</p><h2>ENGAGEMENTS CONCRETS</h2><p>Les parties s'engagent à : transférer réellement les savoir-faire sans créer de dépendance, former en priorité les talents locaux, respecter les droits des communautés et contribuer aux ODD.</p><h2>SUIVI</h2><p>{{mecanisme_suivi}}</p><p>Adoptée le {{date_adoption}}</p></div>`
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
  console.log(`Batch 89a OK — créés:${created} maj:${updated} TOTAL:${total}`);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
