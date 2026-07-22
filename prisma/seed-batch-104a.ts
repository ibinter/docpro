import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ── 25 templates Immobilier promoteur / Lotissement (préfixe imp2_) ──
  {
    code: 'imp2_vefa_promotion',
    name: "Accord de promotion immobilière (VEFA CI)",
    category: 'immobilier', price: 12000, priceMax: 40000,
    description: "Contrat de promotion immobilière en état futur d'achèvement conforme au droit ivoirien et aux règles OHADA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 90,
    fieldsJson: F([
      {key:'promoteur',label:"Dénomination du promoteur",type:'text',required:true},
      {key:'programme',label:"Nom du programme immobilier",type:'text',required:true},
      {key:'adresse_programme',label:"Adresse du programme",type:'text',required:true},
      {key:'date_livraison',label:"Date prévisionnelle de livraison",type:'date',required:true},
      {key:'montant_total',label:"Montant total de l'opération (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PROMOTION IMMOBILIÈRE (VEFA)</h1>
<h2>Entre les soussignés</h2>
<p><strong>Le Promoteur :</strong> {{promoteur}}</p>
<p><strong>Programme :</strong> {{programme}}, situé à {{adresse_programme}}</p>
<h2>Article 1 – Objet</h2>
<p>Le présent accord a pour objet la réalisation et la commercialisation d'un programme immobilier en état futur d'achèvement conformément aux dispositions du droit ivoirien et des Actes uniformes OHADA applicables.</p>
<h2>Article 2 – Délai de livraison</h2>
<p>La livraison est prévue pour le {{date_livraison}}.</p>
<h2>Article 3 – Montant de l'opération</h2>
<p>Le montant total de l'opération est fixé à {{montant_total}} FCFA.</p>
<h2>Article 4 – Garanties</h2>
<p>Le promoteur fournira une garantie financière d'achèvement (GFA) délivrée par un établissement bancaire agréé par la BCEAO avant tout appel de fonds.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Le présent accord est régi par le droit ivoirien et les Actes uniformes OHADA. Tout litige sera soumis à la juridiction compétente d'Abidjan.</p>
<p class="signature-block">Fait à Abidjan, le ___________</p></div>`
  },
  {
    code: 'imp2_vefa_vente',
    name: "Accord de vente en état futur d'achèvement (VEFA)",
    category: 'immobilier', price: 10000, priceMax: 35000,
    description: "Contrat de vente VEFA fixant les modalités d'acquisition d'un bien immobilier en cours de construction.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 88,
    fieldsJson: F([
      {key:'vendeur',label:"Nom du vendeur / promoteur",type:'text',required:true},
      {key:'acquereur',label:"Nom de l'acquéreur",type:'text',required:true},
      {key:'designation_bien',label:"Désignation du bien (type, superficie, étage)",type:'text',required:true},
      {key:'prix_vente',label:"Prix de vente (FCFA)",type:'text',required:true},
      {key:'date_livraison',label:"Date prévisionnelle de livraison",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE VENTE EN ÉTAT FUTUR D'ACHÈVEMENT (VEFA)</h1>
<h2>Entre les soussignés</h2>
<p><strong>Vendeur :</strong> {{vendeur}}</p>
<p><strong>Acquéreur :</strong> {{acquereur}}</p>
<h2>Article 1 – Désignation du bien</h2>
<p>{{designation_bien}}</p>
<h2>Article 2 – Prix et modalités de paiement</h2>
<p>Le prix de vente est fixé à <strong>{{prix_vente}} FCFA</strong>, payable selon l'échéancier suivant :</p>
<ul><li>30 % à la signature du présent contrat</li><li>40 % à la mise hors d'eau</li><li>25 % à la mise hors d'air</li><li>5 % à la livraison</li></ul>
<h2>Article 3 – Date de livraison</h2>
<p>La livraison est prévue au plus tard le {{date_livraison}}.</p>
<h2>Article 4 – Garanties légales</h2>
<p>Le vendeur garantit l'achèvement des travaux conformément au permis de construire délivré par les autorités ivoiriennes compétentes.</p>
<p class="signature-block">Fait à Abidjan, le ___________</p></div>`
  },
  {
    code: 'imp2_vefa_reservation',
    name: "Accord de réservation en VEFA",
    category: 'immobilier', price: 5000, priceMax: 15000,
    description: "Contrat préliminaire de réservation d'un logement en VEFA avec dépôt de garantie.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 82,
    fieldsJson: F([
      {key:'reservant',label:"Nom du réservant",type:'text',required:true},
      {key:'bien_reserve',label:"Description du bien réservé",type:'text',required:true},
      {key:'prix_previsionnel',label:"Prix prévisionnel (FCFA)",type:'text',required:true},
      {key:'depot_garantie',label:"Montant du dépôt de garantie (FCFA)",type:'text',required:true},
      {key:'delai_signature',label:"Délai pour signature du contrat définitif (jours)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT PRÉLIMINAIRE DE RÉSERVATION EN VEFA</h1>
<h2>Entre les soussignés</h2>
<p><strong>Réservant :</strong> {{reservant}}</p>
<h2>Article 1 – Bien réservé</h2>
<p>{{bien_reserve}}</p>
<h2>Article 2 – Prix prévisionnel</h2>
<p>Le prix prévisionnel de vente est de <strong>{{prix_previsionnel}} FCFA</strong>. Ce prix est susceptible de variation dans une limite de 5 % lors de la signature du contrat définitif.</p>
<h2>Article 3 – Dépôt de garantie</h2>
<p>Un dépôt de garantie de <strong>{{depot_garantie}} FCFA</strong> est versé à la signature du présent contrat et sera imputable sur le prix de vente.</p>
<h2>Article 4 – Délai de réalisation</h2>
<p>Le contrat de vente définitif devra être signé dans un délai de {{delai_signature}} jours à compter de la présente réservation.</p>
<p class="signature-block">Fait à Abidjan, le ___________</p></div>`
  },
  {
    code: 'imp2_gfa',
    name: "Accord de garantie financière d'achèvement (GFA)",
    category: 'immobilier', price: 8000, priceMax: 25000,
    description: "Convention de garantie financière d'achèvement délivrée par un établissement bancaire pour sécuriser les acquéreurs VEFA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 75,
    fieldsJson: F([
      {key:'garant',label:"Nom de l'établissement garant",type:'text',required:true},
      {key:'promoteur',label:"Nom du promoteur garanti",type:'text',required:true},
      {key:'programme',label:"Désignation du programme immobilier",type:'text',required:true},
      {key:'montant_garantie',label:"Montant maximum de la garantie (FCFA)",type:'text',required:true},
      {key:'date_expiration',label:"Date d'expiration de la garantie",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CONVENTION DE GARANTIE FINANCIÈRE D'ACHÈVEMENT (GFA)</h1>
<h2>Entre les soussignés</h2>
<p><strong>L'établissement garant :</strong> {{garant}}</p>
<p><strong>Le promoteur :</strong> {{promoteur}}</p>
<h2>Article 1 – Programme garanti</h2>
<p>{{programme}}</p>
<h2>Article 2 – Montant et conditions de la garantie</h2>
<p>L'établissement garant s'engage à financer l'achèvement des travaux à hauteur de <strong>{{montant_garantie}} FCFA</strong> en cas de défaillance du promoteur.</p>
<h2>Article 3 – Durée de validité</h2>
<p>La présente garantie est valable jusqu'au {{date_expiration}}.</p>
<h2>Article 4 – Conditions de mise en jeu</h2>
<p>La garantie peut être mise en jeu par les acquéreurs en cas d'interruption des travaux constatée par un huissier de justice et confirmée par le maître d'œuvre.</p>
<p class="signature-block">Fait à Abidjan, le ___________</p></div>`
  },
  {
    code: 'imp2_garantie_remboursement',
    name: "Accord de garantie de remboursement (VEFA)",
    category: 'immobilier', price: 7000, priceMax: 22000,
    description: "Convention garantissant le remboursement des sommes versées par les acquéreurs en cas de non-réalisation du programme VEFA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'garant',label:"Nom de la banque garante",type:'text',required:true},
      {key:'promoteur',label:"Nom du promoteur",type:'text',required:true},
      {key:'montant_garanti',label:"Montant total garanti (FCFA)",type:'text',required:true},
      {key:'condition_remboursement',label:"Condition déclenchant le remboursement",type:'textarea',required:true},
      {key:'date_limite',label:"Date limite de réalisation du programme",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CONVENTION DE GARANTIE DE REMBOURSEMENT VEFA</h1>
<h2>Entre les soussignés</h2>
<p><strong>La banque garante :</strong> {{garant}}</p>
<p><strong>Le promoteur :</strong> {{promoteur}}</p>
<h2>Article 1 – Objet</h2>
<p>La présente convention garantit le remboursement de l'ensemble des sommes versées par les acquéreurs du programme, à hauteur de <strong>{{montant_garanti}} FCFA</strong>.</p>
<h2>Article 2 – Conditions de mise en jeu</h2>
<p>{{condition_remboursement}}</p>
<h2>Article 3 – Date limite</h2>
<p>Si le programme n'est pas réalisé avant le {{date_limite}}, la garantie de remboursement est automatiquement activée.</p>
<p class="signature-block">Fait à Abidjan, le ___________</p></div>`
  },
  {
    code: 'imp2_lotissement_autorisation',
    name: "Accord de lotissement (autorisation CI)",
    category: 'immobilier', price: 9000, priceMax: 28000,
    description: "Dossier d'accord de lotissement conforme aux exigences des autorités ivoiriennes (MCLAU, mairie).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 78,
    fieldsJson: F([
      {key:'lotisseur',label:"Nom du lotisseur",type:'text',required:true},
      {key:'localisation',label:"Localisation du terrain à lotir",type:'text',required:true},
      {key:'superficie_totale',label:"Superficie totale (m²)",type:'text',required:true},
      {key:'nombre_lots',label:"Nombre de lots prévus",type:'text',required:true},
      {key:'usage_prevu',label:"Usage prévu (résidentiel, commercial, mixte)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>DOSSIER D'ACCORD DE LOTISSEMENT</h1>
<h2>Demandeur</h2>
<p><strong>Lotisseur :</strong> {{lotisseur}}</p>
<h2>Article 1 – Identification du terrain</h2>
<p>Terrain situé à {{localisation}}, d'une superficie totale de <strong>{{superficie_totale}} m²</strong>.</p>
<h2>Article 2 – Programme de lotissement</h2>
<p>Le programme prévoit la création de <strong>{{nombre_lots}}</strong> lots à usage <strong>{{usage_prevu}}</strong>, conformément au plan de lotissement approuvé.</p>
<h2>Article 3 – Conformité réglementaire</h2>
<p>Le présent lotissement respecte les prescriptions du Code de l'Urbanisme de Côte d'Ivoire et les règlements d'urbanisme locaux applicables.</p>
<h2>Article 4 – Engagement du lotisseur</h2>
<p>Le lotisseur s'engage à réaliser les travaux de voirie et réseaux divers (VRD) avant toute cession de lot.</p>
<p class="signature-block">Fait à Abidjan, le ___________</p></div>`
  },
  {
    code: 'imp2_vrd_viabilisation',
    name: "Accord de viabilisation et VRD de lotissement",
    category: 'immobilier', price: 7500, priceMax: 22000,
    description: "Convention de réalisation des travaux de voirie et réseaux divers (VRD) pour un lotissement en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'maitre_ouvrage',label:"Maître d'ouvrage (lotisseur)",type:'text',required:true},
      {key:'entreprise_vrd',label:"Entreprise de VRD",type:'text',required:true},
      {key:'lotissement',label:"Dénomination du lotissement",type:'text',required:true},
      {key:'montant_vrd',label:"Montant des travaux VRD (FCFA)",type:'text',required:true},
      {key:'delai_travaux',label:"Délai d'exécution des travaux (mois)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CONVENTION DE VIABILISATION ET VRD DE LOTISSEMENT</h1>
<h2>Entre les soussignés</h2>
<p><strong>Maître d'ouvrage :</strong> {{maitre_ouvrage}}</p>
<p><strong>Entreprise VRD :</strong> {{entreprise_vrd}}</p>
<h2>Article 1 – Objet</h2>
<p>Réalisation des travaux de voirie et réseaux divers du lotissement <strong>{{lotissement}}</strong> comprenant : voies, eau potable, assainissement, électricité, éclairage public et espaces verts.</p>
<h2>Article 2 – Montant et délai</h2>
<p>Les travaux sont évalués à <strong>{{montant_vrd}} FCFA</strong> et devront être achevés dans un délai de <strong>{{delai_travaux}} mois</strong>.</p>
<h2>Article 3 – Réception des travaux</h2>
<p>La réception provisoire est prononcée par le maître d'ouvrage assisté du maître d'œuvre. La réception définitive intervient 12 mois après la réception provisoire, après levée de toutes réserves.</p>
<p class="signature-block">Fait à Abidjan, le ___________</p></div>`
  },
  {
    code: 'imp2_vente_lot_viabilise',
    name: "Accord de vente de lot viabilisé",
    category: 'immobilier', price: 6000, priceMax: 18000,
    description: "Contrat de vente d'un lot de terrain viabilisé issu d'un lotissement autorisé en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 80,
    fieldsJson: F([
      {key:'vendeur',label:"Nom du vendeur",type:'text',required:true},
      {key:'acquereur',label:"Nom de l'acquéreur",type:'text',required:true},
      {key:'reference_lot',label:"Référence du lot (numéro, lotissement)",type:'text',required:true},
      {key:'superficie_lot',label:"Superficie du lot (m²)",type:'text',required:true},
      {key:'prix_lot',label:"Prix de vente (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACTE DE VENTE DE LOT VIABILISÉ</h1>
<h2>Entre les soussignés</h2>
<p><strong>Vendeur :</strong> {{vendeur}}</p>
<p><strong>Acquéreur :</strong> {{acquereur}}</p>
<h2>Article 1 – Désignation du lot</h2>
<p>Lot référencé <strong>{{reference_lot}}</strong>, superficie <strong>{{superficie_lot}} m²</strong>, situé dans un lotissement viabilisé disposant des réseaux d'eau, d'électricité et de voirie.</p>
<h2>Article 2 – Prix et paiement</h2>
<p>Prix de vente : <strong>{{prix_lot}} FCFA</strong>, payable comptant à la signature du présent acte.</p>
<h2>Article 3 – Transfert de propriété</h2>
<p>Le transfert de propriété intervient à la date de signature du présent acte, après paiement intégral du prix de vente.</p>
<h2>Article 4 – Documents remis</h2>
<p>Le vendeur remet à l'acquéreur : le titre foncier ou attestation villageoise, le plan de bornage, le certificat de viabilisation et la quittance de paiement des taxes de lotissement.</p>
<p class="signature-block">Fait à Abidjan, le ___________</p></div>`
  },
  {
    code: 'imp2_vente_lot_nu',
    name: "Accord de vente de lot nu",
    category: 'immobilier', price: 5000, priceMax: 15000,
    description: "Contrat de vente d'un lot de terrain nu non encore viabilisé, avec conditions suspensives.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 74,
    fieldsJson: F([
      {key:'vendeur',label:"Nom du vendeur",type:'text',required:true},
      {key:'acquereur',label:"Nom de l'acquéreur",type:'text',required:true},
      {key:'localisation_lot',label:"Localisation et référence du lot",type:'text',required:true},
      {key:'superficie',label:"Superficie (m²)",type:'text',required:true},
      {key:'prix',label:"Prix de cession (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACTE DE VENTE DE LOT NU</h1>
<h2>Entre les soussignés</h2>
<p><strong>Vendeur :</strong> {{vendeur}}</p>
<p><strong>Acquéreur :</strong> {{acquereur}}</p>
<h2>Article 1 – Désignation</h2>
<p>Lot nu situé à {{localisation_lot}}, superficie : <strong>{{superficie}} m²</strong>, non encore raccordé aux réseaux.</p>
<h2>Article 2 – Prix</h2>
<p>Prix de cession : <strong>{{prix}} FCFA</strong>.</p>
<h2>Article 3 – Conditions suspensives</h2>
<p>La vente est conclue sous les conditions suspensives suivantes : obtention du titre foncier ou de l'arrêté de lotissement par le vendeur dans un délai de 90 jours.</p>
<h2>Article 4 – Engagements de l'acquéreur</h2>
<p>L'acquéreur s'engage à respecter les servitudes et obligations du cahier des charges du lotissement une fois celui-ci approuvé.</p>
<p class="signature-block">Fait à Abidjan, le ___________</p></div>`
  },
  {
    code: 'imp2_cahier_charges_lotissement',
    name: "Accord de cahier des charges lotissement",
    category: 'immobilier', price: 8000, priceMax: 24000,
    description: "Cahier des charges réglementant l'usage des lots et les obligations des acquéreurs au sein d'un lotissement.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'lotissement',label:"Dénomination du lotissement",type:'text',required:true},
      {key:'lotisseur',label:"Nom du lotisseur",type:'text',required:true},
      {key:'usage_dominant',label:"Usage dominant (résidentiel, commercial…)",type:'text',required:true},
      {key:'surface_minimale',label:"Surface minimale constructible par lot (m²)",type:'text',required:true},
      {key:'regles_construction',label:"Règles de construction principales",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>CAHIER DES CHARGES DU LOTISSEMENT {{lotissement}}</h1>
<h2>Article 1 – Identification</h2>
<p>Lotisseur : {{lotisseur}}. Usage dominant : {{usage_dominant}}.</p>
<h2>Article 2 – Règles d'occupation du sol</h2>
<p>Surface minimale constructible : <strong>{{surface_minimale}} m²</strong> par lot.</p>
<h2>Article 3 – Règles de construction</h2>
<p>{{regles_construction}}</p>
<h2>Article 4 – Servitudes et espaces communs</h2>
<p>Tous les propriétaires de lots sont copropriétaires indivis des voies, espaces verts et équipements communs du lotissement.</p>
<h2>Article 5 – Obligations des acquéreurs</h2>
<p>Tout acquéreur d'un lot accepte expressément le présent cahier des charges par la signature de son acte de vente. Le non-respect expose à des sanctions civiles.</p>
<p class="signature-block">Fait à Abidjan, le ___________</p></div>`
  },
  {
    code: 'imp2_syndic_copropriete',
    name: "Accord de syndic de copropriété",
    category: 'immobilier', price: 7000, priceMax: 20000,
    description: "Contrat de mandat confiant la gestion d'un immeuble en copropriété à un syndic professionnel.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'syndic',label:"Nom du syndic professionnel",type:'text',required:true},
      {key:'copropriete',label:"Dénomination de la copropriété",type:'text',required:true},
      {key:'adresse_immeuble',label:"Adresse de l'immeuble",type:'text',required:true},
      {key:'honoraires_annuels',label:"Honoraires annuels du syndic (FCFA)",type:'text',required:true},
      {key:'duree_mandat',label:"Durée du mandat (années)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SYNDIC DE COPROPRIÉTÉ</h1>
<h2>Entre les soussignés</h2>
<p><strong>Le syndic :</strong> {{syndic}}</p>
<p><strong>La copropriété :</strong> {{copropriete}}, sise {{adresse_immeuble}}</p>
<h2>Article 1 – Mission du syndic</h2>
<p>Le syndic assure la gestion administrative, financière et technique de la copropriété, conformément au règlement de copropriété et aux décisions de l'assemblée générale.</p>
<h2>Article 2 – Honoraires</h2>
<p>Les honoraires annuels de gestion courante sont fixés à <strong>{{honoraires_annuels}} FCFA</strong> TTC, révisables annuellement selon l'indice BTP.</p>
<h2>Article 3 – Durée</h2>
<p>Le présent mandat est conclu pour une durée de <strong>{{duree_mandat}} an(s)</strong>, renouvelable par décision de l'assemblée générale.</p>
<h2>Article 4 – Révocation</h2>
<p>Le mandat peut être révoqué à tout moment par décision de l'assemblée générale des copropriétaires statuant à la majorité absolue.</p>
<p class="signature-block">Fait à Abidjan, le ___________</p></div>`
  },
  {
    code: 'imp2_reglement_copropriete',
    name: "Accord de règlement de copropriété",
    category: 'immobilier', price: 10000, priceMax: 30000,
    description: "Document constitutif du régime de copropriété fixant les droits et obligations de chaque copropriétaire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'immeuble',label:"Dénomination et adresse de l'immeuble",type:'text',required:true},
      {key:'nombre_lots',label:"Nombre total de lots privatifs",type:'text',required:true},
      {key:'charges_repartition',label:"Clé de répartition des charges",type:'textarea',required:true},
      {key:'regles_usage',label:"Règles d'usage des parties communes",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>RÈGLEMENT DE COPROPRIÉTÉ</h1>
<h2>Article 1 – Objet</h2>
<p>Le présent règlement régit les droits et obligations des copropriétaires de l'immeuble : <strong>{{immeuble}}</strong>, composé de <strong>{{nombre_lots}}</strong> lots privatifs.</p>
<h2>Article 2 – Parties communes et privatives</h2>
<p>Sont parties communes : la structure de l'immeuble, les toitures, les escaliers, les couloirs, les locaux techniques et les espaces verts. Chaque copropriétaire dispose des parties privatives de son lot.</p>
<h2>Article 3 – Répartition des charges</h2>
<p>{{charges_repartition}}</p>
<h2>Article 4 – Usage des parties communes</h2>
<p>{{regles_usage}}</p>
<h2>Article 5 – Assemblée générale</h2>
<p>L'assemblée générale des copropriétaires se réunit au moins une fois par an sur convocation du syndic. Les décisions sont prises selon les règles de majorité applicables.</p>
<p class="signature-block">Fait à Abidjan, le ___________</p></div>`
  },
  {
    code: 'imp2_edd',
    name: "Accord d'état descriptif de division (EDD)",
    category: 'immobilier', price: 9000, priceMax: 27000,
    description: "Acte notarié décrivant la division d'un immeuble en lots et attribuant les tantièmes de copropriété.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 62,
    fieldsJson: F([
      {key:'immeuble',label:"Adresse complète de l'immeuble",type:'text',required:true},
      {key:'promoteur',label:"Nom du promoteur / maître d'ouvrage",type:'text',required:true},
      {key:'description_lots',label:"Description des lots (niveaux, types, superficies)",type:'textarea',required:true},
      {key:'total_tantièmes',label:"Total des tantièmes (généralement 10 000)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ÉTAT DESCRIPTIF DE DIVISION (EDD)</h1>
<h2>Immeuble concerné</h2>
<p><strong>Adresse :</strong> {{immeuble}}</p>
<p><strong>Maître d'ouvrage :</strong> {{promoteur}}</p>
<h2>Article 1 – Description des lots</h2>
<p>{{description_lots}}</p>
<h2>Article 2 – Répartition des tantièmes</h2>
<p>Le total des tantièmes est fixé à <strong>{{total_tantièmes}}</strong>. Chaque lot se voit attribuer un nombre de tantièmes proportionnel à sa valeur relative dans l'ensemble immobilier.</p>
<h2>Article 3 – Parties communes générales et spéciales</h2>
<p>Les parties communes générales sont réparties entre tous les copropriétaires. Les parties communes spéciales ne concernent que certains lots bénéficiaires désignés dans le présent état descriptif.</p>
<p class="signature-block">Fait à Abidjan, le ___________</p></div>`
  },
  {
    code: 'imp2_convention_syndic',
    name: "Accord de convention de syndic",
    category: 'immobilier', price: 6000, priceMax: 18000,
    description: "Convention complémentaire au contrat de syndic précisant les prestations particulières et les tarifs additionnels.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      {key:'syndic',label:"Nom du syndic",type:'text',required:true},
      {key:'copropriete',label:"Nom de la copropriété",type:'text',required:true},
      {key:'prestations_specifiques',label:"Prestations spécifiques convenues",type:'textarea',required:true},
      {key:'tarifs_additionnels',label:"Tarifs additionnels (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CONVENTION COMPLÉMENTAIRE DE SYNDIC</h1>
<h2>Entre les soussignés</h2>
<p><strong>Syndic :</strong> {{syndic}}</p>
<p><strong>Copropriété :</strong> {{copropriete}}</p>
<h2>Article 1 – Prestations spécifiques</h2>
<p>{{prestations_specifiques}}</p>
<h2>Article 2 – Tarifs additionnels</h2>
<p>Les prestations spécifiques visées à l'article 1 sont facturées à hauteur de <strong>{{tarifs_additionnels}} FCFA</strong> par intervention, hors charges courantes couvertes par le contrat principal.</p>
<h2>Article 3 – Durée et révision</h2>
<p>La présente convention est conclue pour la même durée que le contrat de syndic principal et révisable annuellement.</p>
<p class="signature-block">Fait à Abidjan, le ___________</p></div>`
  },
  {
    code: 'imp2_promoteur_constructeur',
    name: "Accord de promoteur-constructeur (marché global)",
    category: 'immobilier', price: 12000, priceMax: 40000,
    description: "Contrat global de promotion-construction confiant à un seul opérateur la promotion et la réalisation d'un programme immobilier.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 73,
    fieldsJson: F([
      {key:'maître_ouvrage',label:"Maître d'ouvrage",type:'text',required:true},
      {key:'promoteur_constructeur',label:"Promoteur-constructeur",type:'text',required:true},
      {key:'programme',label:"Description du programme",type:'textarea',required:true},
      {key:'prix_marche',label:"Prix du marché global (FCFA)",type:'text',required:true},
      {key:'delai_livraison',label:"Délai de livraison",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE PROMOTEUR-CONSTRUCTEUR (MARCHÉ GLOBAL)</h1>
<h2>Entre les soussignés</h2>
<p><strong>Maître d'ouvrage :</strong> {{maître_ouvrage}}</p>
<p><strong>Promoteur-constructeur :</strong> {{promoteur_constructeur}}</p>
<h2>Article 1 – Programme</h2>
<p>{{programme}}</p>
<h2>Article 2 – Prix du marché</h2>
<p>Le prix global et forfaitaire du présent marché est fixé à <strong>{{prix_marche}} FCFA</strong>, toutes taxes comprises.</p>
<h2>Article 3 – Délai de livraison</h2>
<p>Livraison au plus tard le {{delai_livraison}}. Tout retard imputable au promoteur-constructeur donnera lieu à des pénalités de 1/1000 du montant du marché par jour ouvré de retard.</p>
<h2>Article 4 – Assurances</h2>
<p>Le promoteur-constructeur souscrira toutes les assurances obligatoires (décennale, dommages-ouvrage, RC professionnelle) avant le démarrage des travaux.</p>
<p class="signature-block">Fait à Abidjan, le ___________</p></div>`
  },
  {
    code: 'imp2_mod_immobilier',
    name: "Accord de service de maître d'ouvrage délégué (MOD immobilier)",
    category: 'immobilier', price: 8000, priceMax: 24000,
    description: "Convention de délégation de maîtrise d'ouvrage pour un programme immobilier en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 67,
    fieldsJson: F([
      {key:'mandant',label:"Maître d'ouvrage mandant",type:'text',required:true},
      {key:'mod',label:"Maître d'ouvrage délégué (MOD)",type:'text',required:true},
      {key:'programme',label:"Désignation du programme",type:'text',required:true},
      {key:'honoraires_mod',label:"Honoraires du MOD (% du coût des travaux)",type:'text',required:true},
      {key:'perimetre_delegation',label:"Périmètre de la délégation",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>CONVENTION DE MAÎTRISE D'OUVRAGE DÉLÉGUÉE (MOD)</h1>
<h2>Entre les soussignés</h2>
<p><strong>Mandant :</strong> {{mandant}}</p>
<p><strong>MOD :</strong> {{mod}}</p>
<h2>Article 1 – Programme délégué</h2>
<p>{{programme}}</p>
<h2>Article 2 – Périmètre de la délégation</h2>
<p>{{perimetre_delegation}}</p>
<h2>Article 3 – Honoraires</h2>
<p>Les honoraires du MOD sont fixés à <strong>{{honoraires_mod}} %</strong> du coût total hors taxes des travaux réalisés, versés en fonction de l'avancement.</p>
<h2>Article 4 – Responsabilité</h2>
<p>Le MOD agit au nom et pour le compte du mandant dans les limites définies par la présente convention. Il rend compte mensuellement de l'avancement et des dépenses engagées.</p>
<p class="signature-block">Fait à Abidjan, le ___________</p></div>`
  },
  {
    code: 'imp2_commercialisation_programme',
    name: "Accord de commercialisation d'un programme immobilier",
    category: 'immobilier', price: 7000, priceMax: 20000,
    description: "Mandat de commercialisation confié à un agent immobilier agréé pour la vente des lots ou logements d'un programme.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 71,
    fieldsJson: F([
      {key:'promoteur',label:"Nom du promoteur",type:'text',required:true},
      {key:'agent_commercialisation',label:"Agent de commercialisation",type:'text',required:true},
      {key:'programme',label:"Désignation du programme",type:'text',required:true},
      {key:'taux_commission',label:"Taux de commission (% du prix de vente)",type:'text',required:true},
      {key:'duree_mandat',label:"Durée du mandat de commercialisation (mois)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>MANDAT DE COMMERCIALISATION DE PROGRAMME IMMOBILIER</h1>
<h2>Entre les soussignés</h2>
<p><strong>Promoteur mandant :</strong> {{promoteur}}</p>
<p><strong>Agent de commercialisation :</strong> {{agent_commercialisation}}</p>
<h2>Article 1 – Programme concerné</h2>
<p>{{programme}}</p>
<h2>Article 2 – Mission de commercialisation</h2>
<p>L'agent est mandaté pour assurer la prospection, la présentation et la conclusion des ventes des biens composant le programme, conformément aux prix de vente arrêtés par le promoteur.</p>
<h2>Article 3 – Rémunération</h2>
<p>Commission de <strong>{{taux_commission}} %</strong> du prix de vente HT de chaque bien vendu, payable à la signature du contrat de vente notarié.</p>
<h2>Article 4 – Durée</h2>
<p>Mandat conclu pour <strong>{{duree_mandat}} mois</strong>, renouvelable d'accord parties.</p>
<p class="signature-block">Fait à Abidjan, le ___________</p></div>`
  },
  {
    code: 'imp2_reservation_logement_social',
    name: "Accord de réservation logement social (CI-Logement)",
    category: 'immobilier', price: 4000, priceMax: 12000,
    description: "Contrat de réservation d'un logement social dans le cadre des programmes CI-Logement ou SICOGI.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 85,
    fieldsJson: F([
      {key:'beneficiaire',label:"Nom du bénéficiaire",type:'text',required:true},
      {key:'organisme',label:"Organisme (CI-Logement, SICOGI…)",type:'text',required:true},
      {key:'logement',label:"Désignation du logement",type:'text',required:true},
      {key:'loyer_mensuel',label:"Loyer mensuel prévu (FCFA)",type:'text',required:true},
      {key:'apport_initial',label:"Apport personnel initial (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE RÉSERVATION – LOGEMENT SOCIAL</h1>
<h2>Entre les soussignés</h2>
<p><strong>Bénéficiaire :</strong> {{beneficiaire}}</p>
<p><strong>Organisme :</strong> {{organisme}}</p>
<h2>Article 1 – Logement réservé</h2>
<p>{{logement}}</p>
<h2>Article 2 – Conditions financières</h2>
<p>Loyer mensuel prévisionnel : <strong>{{loyer_mensuel}} FCFA</strong>. Apport personnel initial : <strong>{{apport_initial}} FCFA</strong>.</p>
<h2>Article 3 – Conditions d'éligibilité</h2>
<p>Le bénéficiaire certifie remplir les conditions d'éligibilité au logement social définies par les textes en vigueur : plafond de revenus, primo-accédant, résidence principale.</p>
<h2>Article 4 – Engagement de l'organisme</h2>
<p>L'organisme s'engage à affecter le logement réservé au bénéficiaire sous réserve de la vérification de ses justificatifs et de la disponibilité du logement.</p>
<p class="signature-block">Fait à Abidjan, le ___________</p></div>`
  },
  {
    code: 'imp2_protocole_foncier',
    name: "Accord de protocole d'accord foncier (préacquisition)",
    category: 'immobilier', price: 6000, priceMax: 18000,
    description: "Protocole préliminaire encadrant la négociation et l'acquisition d'un foncier avant l'acte définitif.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 76,
    fieldsJson: F([
      {key:'acquereur_potentiel',label:"Acquéreur potentiel",type:'text',required:true},
      {key:'detenteur_foncier',label:"Détenteur du foncier",type:'text',required:true},
      {key:'localisation_terrain',label:"Localisation du terrain",type:'text',required:true},
      {key:'prix_negocie',label:"Prix négocié (FCFA)",type:'text',required:true},
      {key:'conditions_suspensives',label:"Conditions suspensives de l'acquisition",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>PROTOCOLE D'ACCORD FONCIER (PRÉACQUISITION)</h1>
<h2>Entre les soussignés</h2>
<p><strong>Acquéreur potentiel :</strong> {{acquereur_potentiel}}</p>
<p><strong>Détenteur du foncier :</strong> {{detenteur_foncier}}</p>
<h2>Article 1 – Terrain visé</h2>
<p>Terrain situé à {{localisation_terrain}}.</p>
<h2>Article 2 – Prix de cession</h2>
<p>Prix de cession négocié : <strong>{{prix_negocie}} FCFA</strong>, sous réserve de la réalisation des conditions suspensives.</p>
<h2>Article 3 – Conditions suspensives</h2>
<p>{{conditions_suspensives}}</p>
<h2>Article 4 – Délai de réalisation</h2>
<p>Les parties s'engagent à signer l'acte de vente définitif dans un délai de 90 jours à compter de la satisfaction de toutes les conditions suspensives.</p>
<p class="signature-block">Fait à Abidjan, le ___________</p></div>`
  },
  {
    code: 'imp2_portage_foncier',
    name: "Accord de convention de portage foncier",
    category: 'immobilier', price: 8000, priceMax: 25000,
    description: "Convention par laquelle un porteur acquiert un terrain pour le compte d'un bénéficiaire, avec rétrocession ultérieure.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 62,
    fieldsJson: F([
      {key:'porteur',label:"Nom du porteur foncier",type:'text',required:true},
      {key:'beneficiaire',label:"Nom du bénéficiaire",type:'text',required:true},
      {key:'terrain',label:"Désignation du terrain porté",type:'text',required:true},
      {key:'cout_portage',label:"Coût et frais du portage (FCFA)",type:'text',required:true},
      {key:'delai_retrocession',label:"Délai de rétrocession (mois)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CONVENTION DE PORTAGE FONCIER</h1>
<h2>Entre les soussignés</h2>
<p><strong>Porteur foncier :</strong> {{porteur}}</p>
<p><strong>Bénéficiaire :</strong> {{beneficiaire}}</p>
<h2>Article 1 – Terrain porté</h2>
<p>{{terrain}}</p>
<h2>Article 2 – Modalités du portage</h2>
<p>Le porteur acquiert le terrain en son nom propre mais pour le compte exclusif du bénéficiaire. Le coût total du portage, incluant prix d'acquisition et frais, est de <strong>{{cout_portage}} FCFA</strong>.</p>
<h2>Article 3 – Rétrocession</h2>
<p>Le porteur s'engage à rétrocéder le terrain au bénéficiaire ou à tout tiers désigné par lui dans un délai de <strong>{{delai_retrocession}} mois</strong> à compter de la présente convention.</p>
<h2>Article 4 – Rémunération du porteur</h2>
<p>Le bénéficiaire versera au porteur une commission de portage convenue séparément par avenant.</p>
<p class="signature-block">Fait à Abidjan, le ___________</p></div>`
  },
  {
    code: 'imp2_commercialisation_agent_agree',
    name: "Accord de service de commercialisation immobilière (agent agréé)",
    category: 'immobilier', price: 5000, priceMax: 15000,
    description: "Contrat de prestation de commercialisation immobilière par un agent agréé par le Ministère ivoirien de la Construction.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 69,
    fieldsJson: F([
      {key:'client',label:"Nom du client (vendeur ou promoteur)",type:'text',required:true},
      {key:'agent',label:"Nom de l'agent agréé",type:'text',required:true},
      {key:'numero_agrement',label:"Numéro d'agrément de l'agent",type:'text',required:true},
      {key:'biens_a_commercialiser',label:"Description des biens à commercialiser",type:'textarea',required:true},
      {key:'commission',label:"Commission convenue (FCFA ou %)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE COMMERCIALISATION IMMOBILIÈRE – AGENT AGRÉÉ</h1>
<h2>Entre les soussignés</h2>
<p><strong>Client :</strong> {{client}}</p>
<p><strong>Agent agréé :</strong> {{agent}} – Agrément n° {{numero_agrement}}</p>
<h2>Article 1 – Mission</h2>
<p>L'agent est mandaté pour la commercialisation des biens suivants : {{biens_a_commercialiser}}</p>
<h2>Article 2 – Rémunération</h2>
<p>Commission convenue : <strong>{{commission}}</strong>, payable à la réalisation de la vente devant notaire.</p>
<h2>Article 3 – Obligations de l'agent</h2>
<p>L'agent s'engage à respecter les règles déontologiques de la profession, les prix arrêtés par le client et à rendre compte mensuellement de ses démarches.</p>
<p class="signature-block">Fait à Abidjan, le ___________</p></div>`
  },
  {
    code: 'imp2_expertise_immobiliere',
    name: "Accord de service d'expertise immobilière",
    category: 'immobilier', price: 6000, priceMax: 18000,
    description: "Mission d'expertise immobilière pour évaluation de la valeur vénale d'un bien en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 63,
    fieldsJson: F([
      {key:'expert',label:"Nom de l'expert immobilier",type:'text',required:true},
      {key:'commanditaire',label:"Nom du commanditaire",type:'text',required:true},
      {key:'bien_expertiser',label:"Description du bien à expertiser",type:'text',required:true},
      {key:'finalite_expertise',label:"Finalité de l'expertise (vente, succession, garantie…)",type:'text',required:true},
      {key:'honoraires',label:"Honoraires d'expertise (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CONVENTION DE MISSION D'EXPERTISE IMMOBILIÈRE</h1>
<h2>Entre les soussignés</h2>
<p><strong>Expert immobilier :</strong> {{expert}}</p>
<p><strong>Commanditaire :</strong> {{commanditaire}}</p>
<h2>Article 1 – Bien expertisé</h2>
<p>{{bien_expertiser}}</p>
<h2>Article 2 – Finalité</h2>
<p>L'expertise est réalisée dans le cadre de : {{finalite_expertise}}</p>
<h2>Article 3 – Méthodologie</h2>
<p>L'expert appliquera les méthodes d'évaluation reconnues (comparaison, revenu, coût de remplacement) conformément aux normes professionnelles en vigueur en Côte d'Ivoire.</p>
<h2>Article 4 – Honoraires</h2>
<p>Honoraires forfaitaires : <strong>{{honoraires}} FCFA</strong>, payables à la remise du rapport d'expertise.</p>
<p class="signature-block">Fait à Abidjan, le ___________</p></div>`
  },
  {
    code: 'imp2_rapport_programme',
    name: "Rapport de programme immobilier",
    category: 'immobilier', price: 7000, priceMax: 20000,
    description: "Rapport complet de présentation d'un programme immobilier destiné aux investisseurs et partenaires bancaires.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 66,
    fieldsJson: F([
      {key:'programme',label:"Dénomination du programme",type:'text',required:true},
      {key:'promoteur',label:"Promoteur",type:'text',required:true},
      {key:'localisation',label:"Localisation",type:'text',required:true},
      {key:'description_programme',label:"Description détaillée du programme",type:'textarea',required:true},
      {key:'budget_total',label:"Budget total prévisionnel (FCFA)",type:'text',required:true},
      {key:'calendrier',label:"Calendrier de réalisation",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PROGRAMME IMMOBILIER</h1>
<h2>1. Présentation</h2>
<p><strong>Programme :</strong> {{programme}}</p>
<p><strong>Promoteur :</strong> {{promoteur}}</p>
<p><strong>Localisation :</strong> {{localisation}}</p>
<h2>2. Description du programme</h2>
<p>{{description_programme}}</p>
<h2>3. Budget prévisionnel</h2>
<p>Budget total : <strong>{{budget_total}} FCFA</strong></p>
<h2>4. Calendrier de réalisation</h2>
<p>{{calendrier}}</p>
<h2>5. Analyse de marché</h2>
<p>Le programme s'inscrit dans un contexte de forte demande en logements en Côte d'Ivoire, particulièrement dans les zones d'expansion périurbaines d'Abidjan et des villes secondaires.</p>
<p class="signature-block">Établi à Abidjan, le ___________</p></div>`
  },
  {
    code: 'imp2_plan_financement',
    name: "Plan de financement promoteur",
    category: 'immobilier', price: 8000, priceMax: 25000,
    description: "Document structurant le plan de financement d'une opération immobilière pour présentation aux banques partenaires.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 69,
    fieldsJson: F([
      {key:'promoteur',label:"Promoteur",type:'text',required:true},
      {key:'programme',label:"Programme immobilier",type:'text',required:true},
      {key:'cout_foncier',label:"Coût foncier (FCFA)",type:'text',required:true},
      {key:'cout_construction',label:"Coût de construction (FCFA)",type:'text',required:true},
      {key:'recettes_previsionnelles',label:"Recettes prévisionnelles de vente (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>PLAN DE FINANCEMENT – OPÉRATION IMMOBILIÈRE</h1>
<h2>Promoteur : {{promoteur}}</h2>
<h2>Programme : {{programme}}</h2>
<h2>1. Structure des coûts</h2>
<table>
<tr><th>Poste</th><th>Montant (FCFA)</th></tr>
<tr><td>Coût foncier</td><td>{{cout_foncier}}</td></tr>
<tr><td>Coût de construction</td><td>{{cout_construction}}</td></tr>
<tr><td>Honoraires et études</td><td>À préciser</td></tr>
<tr><td>Frais financiers</td><td>À préciser</td></tr>
<tr><td>Frais de commercialisation</td><td>À préciser</td></tr>
</table>
<h2>2. Structure de financement</h2>
<p>Fonds propres du promoteur, crédit bancaire, appels de fonds acquéreurs.</p>
<h2>3. Recettes prévisionnelles</h2>
<p>Recettes totales de vente : <strong>{{recettes_previsionnelles}} FCFA</strong></p>
<h2>4. Équilibre de l'opération</h2>
<p>L'opération est équilibrée dès lors que les recettes de vente couvrent l'intégralité des coûts et génèrent une marge promoteur minimale de 10 %.</p>
<p class="signature-block">Établi à Abidjan, le ___________</p></div>`
  },
  {
    code: 'imp2_charte_promoteur',
    name: "Charte du promoteur immobilier responsable en Côte d'Ivoire",
    category: 'immobilier', price: 4000, priceMax: 12000,
    description: "Charte d'engagement éthique et de responsabilité du promoteur immobilier opérant en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 58,
    fieldsJson: F([
      {key:'promoteur',label:"Nom du promoteur signataire",type:'text',required:true},
      {key:'siege_social',label:"Siège social",type:'text',required:true},
      {key:'date_adhesion',label:"Date d'adhésion à la charte",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CHARTE DU PROMOTEUR IMMOBILIER RESPONSABLE EN CÔTE D'IVOIRE</h1>
<h2>Signataire</h2>
<p><strong>Promoteur :</strong> {{promoteur}}, dont le siège est à {{siege_social}}</p>
<p><strong>Date d'adhésion :</strong> {{date_adhesion}}</p>
<h2>Préambule</h2>
<p>En adhérant à la présente charte, le promoteur s'engage à exercer son activité dans le respect de la loi ivoirienne, des règles de l'art de la construction, de la protection des acquéreurs et du développement durable.</p>
<h2>Engagement 1 – Transparence</h2>
<p>Fournir aux acquéreurs toutes les informations nécessaires à leur décision d'achat, notamment le titre foncier, le permis de construire et les garanties financières.</p>
<h2>Engagement 2 – Qualité de construction</h2>
<p>Respecter les normes techniques ivoiriennes et les DTU applicables à chaque type de construction.</p>
<h2>Engagement 3 – Respect des délais</h2>
<p>Livrer les logements dans les délais contractuels et indemniser les acquéreurs en cas de retard injustifié.</p>
<h2>Engagement 4 – Responsabilité sociale</h2>
<p>Favoriser l'emploi local, la formation des artisans et la construction de logements accessibles.</p>
<p class="signature-block">Signé à Abidjan, le {{date_adhesion}}</p></div>`
  },

  // ── 25 templates Location / Gestion locative avancée (préfixe loc_) ──
  {
    code: 'loc_bail_habitation_ci',
    name: "Accord de bail d'habitation (loi CI)",
    category: 'immobilier', price: 4000, priceMax: 12000,
    description: "Contrat de bail d'habitation conforme au droit ivoirien, pour la location de logement à usage d'habitation principale.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 92,
    fieldsJson: F([
      {key:'bailleur',label:"Nom du bailleur",type:'text',required:true},
      {key:'locataire',label:"Nom du locataire",type:'text',required:true},
      {key:'adresse_bien',label:"Adresse du logement",type:'text',required:true},
      {key:'loyer_mensuel',label:"Loyer mensuel (FCFA)",type:'text',required:true},
      {key:'date_entree',label:"Date d'entrée en jouissance",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE BAIL D'HABITATION</h1>
<h2>Entre les soussignés</h2>
<p><strong>Bailleur :</strong> {{bailleur}}</p>
<p><strong>Locataire :</strong> {{locataire}}</p>
<h2>Article 1 – Désignation du logement</h2>
<p>Le bailleur loue au locataire le logement situé à <strong>{{adresse_bien}}</strong>.</p>
<h2>Article 2 – Loyer et charges</h2>
<p>Loyer mensuel : <strong>{{loyer_mensuel}} FCFA</strong>, payable d'avance le 5 de chaque mois.</p>
<h2>Article 3 – Date d'entrée</h2>
<p>Le présent bail prend effet à compter du {{date_entree}}.</p>
<h2>Article 4 – Durée</h2>
<p>Bail conclu pour une durée d'un (1) an renouvelable par tacite reconduction.</p>
<h2>Article 5 – Dépôt de garantie</h2>
<p>Un dépôt de garantie équivalent à deux (2) mois de loyer est versé à la signature du présent bail.</p>
<h2>Article 6 – Obligations des parties</h2>
<p>Le bailleur s'oblige à délivrer un logement décent, le locataire à user paisiblement des lieux et à payer régulièrement son loyer.</p>
<p class="signature-block">Fait à Abidjan, le ___________</p></div>`
  },
  {
    code: 'loc_bail_commercial_ohada',
    name: "Accord de bail commercial (OHADA)",
    category: 'immobilier', price: 6000, priceMax: 18000,
    description: "Bail commercial conforme à l'Acte uniforme OHADA relatif au droit commercial général, pour usage d'exploitation commerciale.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 88,
    fieldsJson: F([
      {key:'bailleur',label:"Nom du bailleur",type:'text',required:true},
      {key:'preneur',label:"Nom du preneur (locataire commercial)",type:'text',required:true},
      {key:'local_commercial',label:"Désignation et adresse du local commercial",type:'text',required:true},
      {key:'loyer_mensuel',label:"Loyer mensuel hors charges (FCFA)",type:'text',required:true},
      {key:'duree_bail',label:"Durée du bail (années)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE BAIL COMMERCIAL (OHADA)</h1>
<h2>Entre les soussignés</h2>
<p><strong>Bailleur :</strong> {{bailleur}}</p>
<p><strong>Preneur :</strong> {{preneur}}</p>
<h2>Article 1 – Objet du bail</h2>
<p>Le bailleur donne à bail au preneur les locaux commerciaux situés à <strong>{{local_commercial}}</strong>, pour y exercer toute activité commerciale licite.</p>
<h2>Article 2 – Durée</h2>
<p>Bail conclu pour une durée de <strong>{{duree_bail}} an(s)</strong>, avec droit au renouvellement conformément à l'AUDCG-OHADA.</p>
<h2>Article 3 – Loyer</h2>
<p>Loyer mensuel : <strong>{{loyer_mensuel}} FCFA</strong> hors charges, payable d'avance le premier de chaque mois.</p>
<h2>Article 4 – Droit au bail</h2>
<p>Le preneur bénéficie d'un droit au renouvellement du bail à son expiration. Le refus de renouvellement ouvre droit à une indemnité d'éviction conformément à l'AUDCG-OHADA.</p>
<h2>Article 5 – Charges et travaux</h2>
<p>Le preneur prend en charge les impôts locaux, la taxe d'enlèvement des ordures ménagères et l'entretien courant des locaux.</p>
<p class="signature-block">Fait à Abidjan, le ___________</p></div>`
  },
  {
    code: 'loc_bail_professionnel',
    name: "Accord de bail professionnel",
    category: 'immobilier', price: 5000, priceMax: 14000,
    description: "Bail professionnel pour l'usage d'un local à des fins professionnelles libérales (cabinet médical, juridique, comptable…).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 76,
    fieldsJson: F([
      {key:'bailleur',label:"Nom du bailleur",type:'text',required:true},
      {key:'locataire_professionnel',label:"Nom du professionnel locataire",type:'text',required:true},
      {key:'profession',label:"Profession exercée",type:'text',required:true},
      {key:'adresse_local',label:"Adresse du local professionnel",type:'text',required:true},
      {key:'loyer',label:"Loyer mensuel (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE BAIL PROFESSIONNEL</h1>
<h2>Entre les soussignés</h2>
<p><strong>Bailleur :</strong> {{bailleur}}</p>
<p><strong>Locataire professionnel :</strong> {{locataire_professionnel}} – Profession : {{profession}}</p>
<h2>Article 1 – Locaux loués</h2>
<p>Local professionnel situé à {{adresse_local}}, destiné exclusivement à l'exercice de la profession de {{profession}}.</p>
<h2>Article 2 – Loyer</h2>
<p>Loyer mensuel : <strong>{{loyer}} FCFA</strong>, payable d'avance.</p>
<h2>Article 3 – Durée</h2>
<p>Bail conclu pour deux (2) ans renouvelables. Le locataire peut y mettre fin à tout moment avec un préavis de trois (3) mois.</p>
<h2>Article 4 – Destination des lieux</h2>
<p>Les locaux ne peuvent être utilisés qu'à des fins professionnelles libérales, à l'exclusion de toute habitation ou activité commerciale au sens de l'AUDCG-OHADA.</p>
<p class="signature-block">Fait à Abidjan, le ___________</p></div>`
  },
  {
    code: 'loc_bail_precaire',
    name: "Accord de bail précaire (courte durée)",
    category: 'immobilier', price: 3500, priceMax: 10000,
    description: "Convention d'occupation précaire à titre onéreux, pour une durée inférieure à un an, sans droit au renouvellement.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'proprietaire',label:"Nom du propriétaire",type:'text',required:true},
      {key:'occupant',label:"Nom de l'occupant",type:'text',required:true},
      {key:'bien',label:"Description du bien",type:'text',required:true},
      {key:'duree_occupation',label:"Durée de l'occupation (mois)",type:'text',required:true},
      {key:'redevance',label:"Redevance mensuelle (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CONVENTION D'OCCUPATION PRÉCAIRE</h1>
<h2>Entre les soussignés</h2>
<p><strong>Propriétaire :</strong> {{proprietaire}}</p>
<p><strong>Occupant :</strong> {{occupant}}</p>
<h2>Article 1 – Bien occupé</h2>
<p>{{bien}}</p>
<h2>Article 2 – Durée et précarité</h2>
<p>Occupation consentie pour une durée de <strong>{{duree_occupation}} mois</strong>. La présente convention est conclue à titre précaire et révocable ; l'occupant reconnaît expressément ne bénéficier d'aucun droit au renouvellement.</p>
<h2>Article 3 – Redevance</h2>
<p>Redevance mensuelle : <strong>{{redevance}} FCFA</strong>.</p>
<h2>Article 4 – Fin de l'occupation</h2>
<p>À l'expiration du délai, l'occupant s'engage à libérer les lieux sans délai ni indemnité, sous peine d'expulsion par voie de justice.</p>
<p class="signature-block">Fait à Abidjan, le ___________</p></div>`
  },
  {
    code: 'loc_sous_location',
    name: "Accord de sous-location (autorisation bailleur)",
    category: 'immobilier', price: 4000, priceMax: 12000,
    description: "Convention de sous-location avec autorisation expresse du bailleur, conformément aux obligations légales ivoiriennes.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'bailleur',label:"Nom du bailleur principal",type:'text',required:true},
      {key:'locataire_principal',label:"Nom du locataire principal (sous-bailleur)",type:'text',required:true},
      {key:'sous_locataire',label:"Nom du sous-locataire",type:'text',required:true},
      {key:'bien_sous_loue',label:"Description du bien ou de la partie sous-louée",type:'text',required:true},
      {key:'loyer_sous_location',label:"Loyer de sous-location (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SOUS-LOCATION</h1>
<h2>Entre les soussignés</h2>
<p><strong>Bailleur principal :</strong> {{bailleur}} – donne son accord exprès à la présente sous-location.</p>
<p><strong>Locataire principal (sous-bailleur) :</strong> {{locataire_principal}}</p>
<p><strong>Sous-locataire :</strong> {{sous_locataire}}</p>
<h2>Article 1 – Bien sous-loué</h2>
<p>{{bien_sous_loue}}</p>
<h2>Article 2 – Loyer de sous-location</h2>
<p>Loyer mensuel : <strong>{{loyer_sous_location}} FCFA</strong>. Ce loyer ne peut excéder le loyer principal.</p>
<h2>Article 3 – Durée</h2>
<p>La sous-location est consentie pour la durée restant à courir du bail principal, sans pouvoir excéder sa date d'expiration.</p>
<h2>Article 4 – Responsabilité</h2>
<p>Le locataire principal demeure seul responsable envers le bailleur du paiement du loyer principal et du respect du bail.</p>
<p class="signature-block">Fait à Abidjan, le ___________</p></div>`
  },
  {
    code: 'loc_colocation',
    name: "Accord de colocation (plusieurs locataires)",
    category: 'immobilier', price: 4000, priceMax: 12000,
    description: "Contrat de colocation organisant les droits et obligations de plusieurs colocataires partageant un même logement.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'bailleur',label:"Nom du bailleur",type:'text',required:true},
      {key:'colocataires',label:"Noms de tous les colocataires",type:'textarea',required:true},
      {key:'adresse_logement',label:"Adresse du logement",type:'text',required:true},
      {key:'loyer_total',label:"Loyer total mensuel (FCFA)",type:'text',required:true},
      {key:'repartition_charges',label:"Répartition des charges entre colocataires",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE COLOCATION</h1>
<h2>Entre les soussignés</h2>
<p><strong>Bailleur :</strong> {{bailleur}}</p>
<p><strong>Colocataires :</strong> {{colocataires}}</p>
<h2>Article 1 – Logement</h2>
<p>Les colocataires prennent à bail le logement situé à {{adresse_logement}}.</p>
<h2>Article 2 – Loyer total</h2>
<p>Loyer mensuel total : <strong>{{loyer_total}} FCFA</strong>, payable solidairement par l'ensemble des colocataires.</p>
<h2>Article 3 – Solidarité</h2>
<p>Chaque colocataire est solidairement responsable du paiement de l'intégralité du loyer et des charges envers le bailleur.</p>
<h2>Article 4 – Répartition interne</h2>
<p>{{repartition_charges}}</p>
<h2>Article 5 – Départ d'un colocataire</h2>
<p>Le départ d'un colocataire ne met pas fin au bail. Le colocataire sortant doit trouver un remplaçant agréé par le bailleur ou demeurer co-obligé jusqu'à l'accord du bailleur.</p>
<p class="signature-block">Fait à Abidjan, le ___________</p></div>`
  },
  {
    code: 'loc_bail_meuble',
    name: "Accord de bail meublé (logement meublé)",
    category: 'immobilier', price: 4500, priceMax: 13000,
    description: "Bail de logement meublé incluant l'inventaire du mobilier mis à disposition du locataire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 74,
    fieldsJson: F([
      {key:'bailleur',label:"Nom du bailleur",type:'text',required:true},
      {key:'locataire',label:"Nom du locataire",type:'text',required:true},
      {key:'adresse_logement',label:"Adresse du logement meublé",type:'text',required:true},
      {key:'loyer_charges_incluses',label:"Loyer charges incluses (FCFA)",type:'text',required:true},
      {key:'inventaire_mobilier',label:"Inventaire du mobilier fourni",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE BAIL DE LOGEMENT MEUBLÉ</h1>
<h2>Entre les soussignés</h2>
<p><strong>Bailleur :</strong> {{bailleur}}</p>
<p><strong>Locataire :</strong> {{locataire}}</p>
<h2>Article 1 – Logement et mobilier</h2>
<p>Logement meublé situé à {{adresse_logement}}, comprenant le mobilier suivant :</p>
<p>{{inventaire_mobilier}}</p>
<h2>Article 2 – Loyer</h2>
<p>Loyer mensuel toutes charges incluses : <strong>{{loyer_charges_incluses}} FCFA</strong>.</p>
<h2>Article 3 – Durée</h2>
<p>Bail meublé d'une durée d'un (1) an, renouvelable tacitement.</p>
<h2>Article 4 – État du mobilier</h2>
<p>Le locataire s'engage à restituer le mobilier dans l'état de l'inventaire dressé contradictoirement à l'entrée dans les lieux.</p>
<p class="signature-block">Fait à Abidjan, le ___________</p></div>`
  },
  {
    code: 'loc_bail_mobilite',
    name: "Accord de bail mobilité (logement temporaire)",
    category: 'immobilier', price: 4000, priceMax: 12000,
    description: "Bail de courte durée pour un locataire en mobilité professionnelle (expatrié, stagiaire, mission temporaire en Côte d'Ivoire).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'bailleur',label:"Nom du bailleur",type:'text',required:true},
      {key:'locataire',label:"Nom du locataire en mobilité",type:'text',required:true},
      {key:'motif_mobilite',label:"Motif de mobilité (mission, stage, détachement…)",type:'text',required:true},
      {key:'adresse',label:"Adresse du logement",type:'text',required:true},
      {key:'loyer',label:"Loyer mensuel (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>BAIL MOBILITÉ – LOGEMENT TEMPORAIRE</h1>
<h2>Entre les soussignés</h2>
<p><strong>Bailleur :</strong> {{bailleur}}</p>
<p><strong>Locataire :</strong> {{locataire}} – Motif : {{motif_mobilite}}</p>
<h2>Article 1 – Logement</h2>
<p>Logement situé à {{adresse}}, loué meublé pour la durée de la mission.</p>
<h2>Article 2 – Loyer</h2>
<p>Loyer mensuel : <strong>{{loyer}} FCFA</strong>, charges comprises.</p>
<h2>Article 3 – Durée et non-renouvellement</h2>
<p>Le bail mobilité est conclu pour la durée précisée dans le justificatif de mobilité, sans possibilité de renouvellement ni de tacite reconduction. Le locataire ne peut en bénéficier qu'une seule fois pour le même logement.</p>
<p class="signature-block">Fait à Abidjan, le ___________</p></div>`
  },
  {
    code: 'loc_bail_rural',
    name: "Accord de bail rural (exploitation agricole)",
    category: 'immobilier', price: 5000, priceMax: 15000,
    description: "Bail rural pour la mise en location d'une exploitation agricole en Côte d'Ivoire (cacaoyer, palmier, vivrier…).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 67,
    fieldsJson: F([
      {key:'bailleur',label:"Nom du propriétaire bailleur",type:'text',required:true},
      {key:'preneur',label:"Nom du preneur (exploitant agricole)",type:'text',required:true},
      {key:'exploitation',label:"Description et localisation de l'exploitation",type:'text',required:true},
      {key:'superficie',label:"Superficie (hectares)",type:'text',required:true},
      {key:'loyer_annuel',label:"Fermage annuel (FCFA ou en nature)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE BAIL RURAL</h1>
<h2>Entre les soussignés</h2>
<p><strong>Bailleur :</strong> {{bailleur}}</p>
<p><strong>Preneur :</strong> {{preneur}}</p>
<h2>Article 1 – Exploitation louée</h2>
<p>{{exploitation}} – Superficie : <strong>{{superficie}} ha</strong></p>
<h2>Article 2 – Fermage</h2>
<p>Fermage annuel : <strong>{{loyer_annuel}}</strong>, payable à la récolte principale ou au plus tard le 31 décembre de chaque année.</p>
<h2>Article 3 – Durée et renouvellement</h2>
<p>Bail conclu pour une durée de cinq (5) ans renouvelable. Le preneur bénéficie d'un droit de préférence en cas de cession de l'exploitation.</p>
<h2>Article 4 – Obligations du preneur</h2>
<p>Le preneur s'engage à maintenir l'exploitation en bon état cultural, à ne pas modifier la destination des terres et à informer le bailleur de tout sinistre affectant les cultures.</p>
<p class="signature-block">Fait à Abidjan, le ___________</p></div>`
  },
  {
    code: 'loc_bail_emphyteotique',
    name: "Accord de bail emphytéotique (longue durée)",
    category: 'immobilier', price: 9000, priceMax: 28000,
    description: "Bail emphytéotique accordant un droit réel immobilier sur un terrain pour une durée de 18 à 99 ans.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      {key:'bailleur',label:"Nom du propriétaire bailleur",type:'text',required:true},
      {key:'emphyteote',label:"Nom de l'emphytéote",type:'text',required:true},
      {key:'terrain',label:"Description et référence cadastrale du terrain",type:'text',required:true},
      {key:'duree',label:"Durée du bail (années)",type:'text',required:true},
      {key:'redevance',label:"Redevance annuelle (canon emphytéotique, FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>BAIL EMPHYTÉOTIQUE</h1>
<h2>Entre les soussignés</h2>
<p><strong>Bailleur :</strong> {{bailleur}}</p>
<p><strong>Emphytéote :</strong> {{emphyteote}}</p>
<h2>Article 1 – Terrain</h2>
<p>{{terrain}}</p>
<h2>Article 2 – Durée</h2>
<p>Bail emphytéotique consenti pour une durée de <strong>{{duree}} ans</strong>, à compter de la signature des présentes.</p>
<h2>Article 3 – Canon emphytéotique</h2>
<p>Redevance annuelle : <strong>{{redevance}} FCFA</strong>, payable au 1er janvier de chaque année.</p>
<h2>Article 4 – Droit réel</h2>
<p>L'emphytéote dispose d'un droit réel immobilier lui permettant de construire, d'hypothéquer et de sous-louer, dans les limites autorisées par la loi et le présent bail.</p>
<h2>Article 5 – Retour des améliorations</h2>
<p>À l'expiration du bail, les constructions et améliorations reviennent au bailleur sans indemnité, sauf clause contraire.</p>
<p class="signature-block">Fait à Abidjan, le ___________</p></div>`
  },
  {
    code: 'loc_bail_emphyteotique_administratif',
    name: "Accord de bail emphytéotique administratif (BEA)",
    category: 'immobilier', price: 10000, priceMax: 30000,
    description: "Bail emphytéotique administratif accordé par une collectivité publique pour la valorisation d'un terrain domanial en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 58,
    fieldsJson: F([
      {key:'collectivite',label:"Collectivité publique bailleresse",type:'text',required:true},
      {key:'preneur',label:"Preneur (entreprise ou investisseur)",type:'text',required:true},
      {key:'terrain_domanial',label:"Description du terrain domanial",type:'text',required:true},
      {key:'programme_valorisation',label:"Programme de valorisation prévu",type:'textarea',required:true},
      {key:'duree',label:"Durée du BEA (années)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>BAIL EMPHYTÉOTIQUE ADMINISTRATIF (BEA)</h1>
<h2>Entre les soussignés</h2>
<p><strong>Collectivité bailleresse :</strong> {{collectivite}}</p>
<p><strong>Preneur :</strong> {{preneur}}</p>
<h2>Article 1 – Terrain domanial</h2>
<p>{{terrain_domanial}}</p>
<h2>Article 2 – Programme de valorisation</h2>
<p>{{programme_valorisation}}</p>
<h2>Article 3 – Durée</h2>
<p>BEA consenti pour <strong>{{duree}} ans</strong> à compter de sa publication au Journal Officiel.</p>
<h2>Article 4 – Régime administratif</h2>
<p>Le présent bail est soumis au droit administratif ivoirien. En cas de litige, la juridiction administrative compétente est le Conseil d'Etat de Côte d'Ivoire.</p>
<p class="signature-block">Fait à Abidjan, le ___________</p></div>`
  },
  {
    code: 'loc_droit_superficie',
    name: "Accord de constitution de droit de superficie",
    category: 'immobilier', price: 8000, priceMax: 24000,
    description: "Acte constitutif d'un droit de superficie permettant à un tiers de construire sur le terrain d'autrui.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 57,
    fieldsJson: F([
      {key:'proprietaire_sol',label:"Propriétaire du sol (tréfoncier)",type:'text',required:true},
      {key:'superficiaire',label:"Bénéficiaire du droit de superficie",type:'text',required:true},
      {key:'terrain',label:"Description du terrain",type:'text',required:true},
      {key:'redevance',label:"Redevance annuelle (FCFA)",type:'text',required:true},
      {key:'duree',label:"Durée du droit (années)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACTE DE CONSTITUTION DE DROIT DE SUPERFICIE</h1>
<h2>Entre les soussignés</h2>
<p><strong>Propriétaire du sol (tréfoncier) :</strong> {{proprietaire_sol}}</p>
<p><strong>Superficiaire :</strong> {{superficiaire}}</p>
<h2>Article 1 – Terrain concerné</h2>
<p>{{terrain}}</p>
<h2>Article 2 – Droit accordé</h2>
<p>Le tréfoncier concède au superficiaire un droit réel de superficie lui permettant d'édifier et de conserver des constructions sur le terrain désigné.</p>
<h2>Article 3 – Redevance et durée</h2>
<p>Redevance annuelle : <strong>{{redevance}} FCFA</strong>. Durée : <strong>{{duree}} ans</strong>.</p>
<h2>Article 4 – Sort des constructions</h2>
<p>À l'expiration du droit, les constructions reviennent au tréfoncier ou sont démolies aux frais du superficiaire selon la convention des parties.</p>
<p class="signature-block">Fait à Abidjan, le ___________</p></div>`
  },
  {
    code: 'loc_loyer_variable',
    name: "Accord de loyer variable (bail indexé)",
    category: 'immobilier', price: 5000, priceMax: 15000,
    description: "Clause d'indexation du loyer commercial sur un indice de référence pour sécuriser les révisions annuelles.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 64,
    fieldsJson: F([
      {key:'bailleur',label:"Nom du bailleur",type:'text',required:true},
      {key:'preneur',label:"Nom du preneur",type:'text',required:true},
      {key:'loyer_base',label:"Loyer de base initial (FCFA)",type:'text',required:true},
      {key:'indice_reference',label:"Indice de référence retenu (BTP, IPC…)",type:'text',required:true},
      {key:'date_revision',label:"Date de première révision",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>AVENANT – BAIL INDEXÉ (LOYER VARIABLE)</h1>
<h2>Entre les soussignés</h2>
<p><strong>Bailleur :</strong> {{bailleur}}</p>
<p><strong>Preneur :</strong> {{preneur}}</p>
<h2>Article 1 – Loyer de base</h2>
<p>Loyer mensuel de base : <strong>{{loyer_base}} FCFA</strong>.</p>
<h2>Article 2 – Indexation</h2>
<p>Le loyer est révisé annuellement en fonction de l'évolution de l'indice <strong>{{indice_reference}}</strong> publié par l'Institut National de la Statistique de Côte d'Ivoire.</p>
<h2>Article 3 – Date de première révision</h2>
<p>La première révision interviendra le {{date_revision}}.</p>
<h2>Article 4 – Plafonnement</h2>
<p>La révision ne peut excéder +10 % du loyer en vigueur lors de chaque période annuelle, ni être négative.</p>
<p class="signature-block">Fait à Abidjan, le ___________</p></div>`
  },
  {
    code: 'loc_garantie_loyer_impaye',
    name: "Accord de garantie de loyer impayé (GLI)",
    category: 'immobilier', price: 5000, priceMax: 15000,
    description: "Convention de garantie des loyers impayés souscrite par le bailleur auprès d'un assureur ou garant.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'bailleur',label:"Nom du bailleur assuré",type:'text',required:true},
      {key:'garant',label:"Nom du garant / assureur",type:'text',required:true},
      {key:'bien_loue',label:"Désignation du bien loué",type:'text',required:true},
      {key:'loyer_garanti',label:"Loyer mensuel garanti (FCFA)",type:'text',required:true},
      {key:'franchise',label:"Franchise (nombre de mois avant prise en charge)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CONVENTION DE GARANTIE DE LOYERS IMPAYÉS (GLI)</h1>
<h2>Entre les soussignés</h2>
<p><strong>Bailleur :</strong> {{bailleur}}</p>
<p><strong>Garant / Assureur :</strong> {{garant}}</p>
<h2>Article 1 – Bien garanti</h2>
<p>{{bien_loue}}</p>
<h2>Article 2 – Loyer garanti</h2>
<p>Le garant prend en charge les loyers impayés à hauteur de <strong>{{loyer_garanti}} FCFA</strong> par mois, après un délai de franchise de <strong>{{franchise}} mois</strong>.</p>
<h2>Article 3 – Procédure de mise en jeu</h2>
<p>Le bailleur doit justifier la mise en demeure du locataire, l'absence de paiement après 30 jours et transmettre les pièces justificatives au garant pour déclencher la prise en charge.</p>
<h2>Article 4 – Durée de garantie</h2>
<p>La garantie court pour toute la durée du bail et de ses renouvellements, sous réserve de paiement de la cotisation annuelle.</p>
<p class="signature-block">Fait à Abidjan, le ___________</p></div>`
  },
  {
    code: 'loc_caution_solidaire',
    name: "Accord de caution solidaire (garant bail)",
    category: 'immobilier', price: 3500, priceMax: 10000,
    description: "Acte de cautionnement solidaire par lequel un garant s'engage à payer les loyers en cas de défaillance du locataire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 78,
    fieldsJson: F([
      {key:'caution',label:"Nom de la caution (garant)",type:'text',required:true},
      {key:'locataire',label:"Nom du locataire principal",type:'text',required:true},
      {key:'bailleur',label:"Nom du bailleur",type:'text',required:true},
      {key:'montant_garanti',label:"Montant maximum garanti (FCFA)",type:'text',required:true},
      {key:'duree_caution',label:"Durée de l'engagement de caution",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACTE DE CAUTIONNEMENT SOLIDAIRE</h1>
<h2>Entre les soussignés</h2>
<p><strong>La caution :</strong> {{caution}}</p>
<p><strong>Au profit du bailleur :</strong> {{bailleur}}</p>
<p>Pour garantir les obligations du locataire : {{locataire}}</p>
<h2>Article 1 – Engagement de caution</h2>
<p>La caution se porte garante solidaire du paiement des loyers, charges et indemnités d'occupation dus par le locataire, à hauteur de <strong>{{montant_garanti}} FCFA</strong>.</p>
<h2>Article 2 – Solidarité</h2>
<p>La caution renonce expressément au bénéfice de discussion et de division. Le bailleur peut poursuivre la caution directement sans avoir préalablement poursuivi le locataire.</p>
<h2>Article 3 – Durée</h2>
<p>L'engagement de caution court pour une durée de {{duree_caution}}, renouvelable.</p>
<p class="signature-block">Fait à Abidjan, le ___________</p></div>`
  },
  {
    code: 'loc_depot_garantie',
    name: "Accord de dépôt de garantie (état des lieux)",
    category: 'immobilier', price: 3000, priceMax: 9000,
    description: "Document officialisant le versement du dépôt de garantie et consignant l'état des lieux d'entrée.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 82,
    fieldsJson: F([
      {key:'bailleur',label:"Nom du bailleur",type:'text',required:true},
      {key:'locataire',label:"Nom du locataire",type:'text',required:true},
      {key:'bien',label:"Adresse du bien loué",type:'text',required:true},
      {key:'montant_depot',label:"Montant du dépôt de garantie (FCFA)",type:'text',required:true},
      {key:'etat_lieux_entree',label:"Observations état des lieux d'entrée",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>REÇU DE DÉPÔT DE GARANTIE ET ÉTAT DES LIEUX D'ENTRÉE</h1>
<h2>Entre les soussignés</h2>
<p><strong>Bailleur :</strong> {{bailleur}}</p>
<p><strong>Locataire :</strong> {{locataire}}</p>
<h2>Article 1 – Dépôt de garantie</h2>
<p>Le bailleur accuse réception de la somme de <strong>{{montant_depot}} FCFA</strong> à titre de dépôt de garantie pour le logement situé à {{bien}}.</p>
<h2>Article 2 – Restitution</h2>
<p>Ce dépôt sera restitué dans un délai maximum de deux (2) mois après la remise des clés, déduction faite des éventuelles réparations locatives à la charge du locataire.</p>
<h2>Article 3 – État des lieux d'entrée</h2>
<p>{{etat_lieux_entree}}</p>
<p class="signature-block">Fait contradictoirement à Abidjan, le ___________</p></div>`
  },
  {
    code: 'loc_quittance_loyer',
    name: "Accord de quittance de loyer",
    category: 'immobilier', price: 3000, priceMax: 8000,
    description: "Quittance mensuelle attestant le paiement intégral du loyer et des charges par le locataire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 85,
    fieldsJson: F([
      {key:'bailleur',label:"Nom du bailleur",type:'text',required:true},
      {key:'locataire',label:"Nom du locataire",type:'text',required:true},
      {key:'adresse_bien',label:"Adresse du logement",type:'text',required:true},
      {key:'mois_concerne',label:"Mois et année concernés",type:'text',required:true},
      {key:'montant_encaisse',label:"Montant encaissé (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>QUITTANCE DE LOYER</h1>
<h2>Je soussigné(e) {{bailleur}}, bailleur</h2>
<p>reconnais avoir reçu de <strong>{{locataire}}</strong>, locataire du bien situé à {{adresse_bien}},</p>
<p>la somme de <strong>{{montant_encaisse}} FCFA</strong></p>
<p>au titre du loyer et des charges du mois de <strong>{{mois_concerne}}</strong>.</p>
<h2>Décomposition</h2>
<table>
<tr><th>Poste</th><th>Montant (FCFA)</th></tr>
<tr><td>Loyer nu</td><td>À préciser</td></tr>
<tr><td>Charges locatives</td><td>À préciser</td></tr>
<tr><td>TOTAL</td><td>{{montant_encaisse}}</td></tr>
</table>
<p>En foi de quoi, la présente quittance est délivrée pour valoir ce que de droit.</p>
<p class="signature-block">Abidjan, le ___________ – Signature du bailleur : ___________</p></div>`
  },
  {
    code: 'loc_commandement_payer',
    name: "Accord de commandement de payer (impayé)",
    category: 'immobilier', price: 5000, priceMax: 15000,
    description: "Mise en demeure formelle adressée au locataire défaillant de régler les loyers impayés, préalable à toute procédure judiciaire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 73,
    fieldsJson: F([
      {key:'bailleur',label:"Nom du bailleur",type:'text',required:true},
      {key:'locataire',label:"Nom et adresse du locataire",type:'text',required:true},
      {key:'montant_reclame',label:"Montant total réclamé (FCFA)",type:'text',required:true},
      {key:'mois_impayes',label:"Détail des mois de loyers impayés",type:'textarea',required:true},
      {key:'delai_regularisation',label:"Délai accordé pour régularisation (jours)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>COMMANDEMENT DE PAYER</h1>
<h2>De la part de : {{bailleur}}</h2>
<h2>À : {{locataire}}</h2>
<p>Nous vous mettons en demeure de régler sous <strong>{{delai_regularisation}} jours</strong> à compter de la réception du présent commandement la somme de <strong>{{montant_reclame}} FCFA</strong> correspondant aux loyers impayés suivants :</p>
<p>{{mois_impayes}}</p>
<h2>Avertissement</h2>
<p>À défaut de règlement dans le délai imparti, nous nous verrons contraints d'initier une procédure judiciaire en résiliation de bail et expulsion, aux termes de la législation ivoirienne et des dispositions de l'OHADA.</p>
<p>Les frais de procédure resteront à votre charge.</p>
<p class="signature-block">Abidjan, le ___________ – Signature du bailleur ou son mandataire : ___________</p></div>`
  },
  {
    code: 'loc_conge_bailleur',
    name: "Accord de congé donné au locataire",
    category: 'immobilier', price: 4000, priceMax: 12000,
    description: "Lettre de congé remise par le bailleur au locataire pour reprise du bien, vente ou motif légitime.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'bailleur',label:"Nom du bailleur",type:'text',required:true},
      {key:'locataire',label:"Nom du locataire",type:'text',required:true},
      {key:'adresse_bien',label:"Adresse du bien",type:'text',required:true},
      {key:'motif_conge',label:"Motif du congé (reprise, vente, non-renouvellement)",type:'text',required:true},
      {key:'date_fin_bail',label:"Date de fin de bail",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>LETTRE DE CONGÉ DU BAILLEUR AU LOCATAIRE</h1>
<h2>De : {{bailleur}}</h2>
<h2>À : {{locataire}}</h2>
<p>Par la présente, je vous notifie le congé du logement situé à <strong>{{adresse_bien}}</strong>, avec effet au <strong>{{date_fin_bail}}</strong>.</p>
<h2>Motif</h2>
<p>{{motif_conge}}</p>
<h2>Obligations du locataire</h2>
<p>Vous êtes invité à libérer les lieux et remettre les clés au plus tard à la date susvisée, après établissement contradictoire de l'état des lieux de sortie.</p>
<p>Le dépôt de garantie vous sera restitué dans le délai légal, déduction faite des éventuelles dégradations constatées.</p>
<p class="signature-block">Abidjan, le ___________ – Signature du bailleur : ___________</p></div>`
  },
  {
    code: 'loc_conge_locataire',
    name: "Accord de congé donné par le locataire",
    category: 'immobilier', price: 3500, priceMax: 10000,
    description: "Lettre de congé remise par le locataire au bailleur pour mettre fin au bail à l'expiration du préavis.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'locataire',label:"Nom du locataire",type:'text',required:true},
      {key:'bailleur',label:"Nom du bailleur",type:'text',required:true},
      {key:'adresse_bien',label:"Adresse du bien loué",type:'text',required:true},
      {key:'date_depart',label:"Date de départ prévisionnelle",type:'date',required:true},
      {key:'duree_preavis',label:"Durée du préavis (mois)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>LETTRE DE CONGÉ DU LOCATAIRE</h1>
<h2>De : {{locataire}}</h2>
<h2>À : {{bailleur}}</h2>
<p>Par la présente, je vous informe de ma décision de résilier le bail portant sur le logement situé à <strong>{{adresse_bien}}</strong>.</p>
<p>Conformément aux dispositions du contrat de bail et au préavis de <strong>{{duree_preavis}} mois</strong>, mon départ effectif interviendra le <strong>{{date_depart}}</strong>.</p>
<h2>Demande de restitution du dépôt de garantie</h2>
<p>Je vous demande de procéder à la restitution du dépôt de garantie dans le délai légal suivant l'état des lieux de sortie contradictoire.</p>
<p class="signature-block">Abidjan, le ___________ – Signature du locataire : ___________</p></div>`
  },
  {
    code: 'loc_renouvellement_bail',
    name: "Accord de renouvellement de bail",
    category: 'immobilier', price: 4000, priceMax: 12000,
    description: "Avenant de renouvellement du contrat de bail à l'expiration de la période initiale, avec éventuelles modifications.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 75,
    fieldsJson: F([
      {key:'bailleur',label:"Nom du bailleur",type:'text',required:true},
      {key:'locataire',label:"Nom du locataire",type:'text',required:true},
      {key:'adresse_bien',label:"Adresse du bien",type:'text',required:true},
      {key:'nouveau_loyer',label:"Nouveau loyer mensuel (FCFA)",type:'text',required:true},
      {key:'nouvelle_duree',label:"Nouvelle durée du bail renouvelé",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>AVENANT DE RENOUVELLEMENT DE BAIL</h1>
<h2>Entre les soussignés</h2>
<p><strong>Bailleur :</strong> {{bailleur}}</p>
<p><strong>Locataire :</strong> {{locataire}}</p>
<h2>Article 1 – Renouvellement</h2>
<p>Les parties conviennent de renouveler le bail portant sur le bien situé à {{adresse_bien}} pour une nouvelle durée de <strong>{{nouvelle_duree}}</strong>.</p>
<h2>Article 2 – Nouveau loyer</h2>
<p>À compter du renouvellement, le loyer mensuel est fixé à <strong>{{nouveau_loyer}} FCFA</strong>.</p>
<h2>Article 3 – Maintien des conditions</h2>
<p>Toutes les autres clauses et conditions du bail initial demeurent inchangées et pleinement applicables.</p>
<p class="signature-block">Fait à Abidjan, le ___________</p></div>`
  },
  {
    code: 'loc_revision_loyer',
    name: "Accord de révision de loyer",
    category: 'immobilier', price: 3500, priceMax: 10000,
    description: "Avenant de révision annuelle du loyer, fondé sur l'indexation contractuelle ou la réévaluation amiable.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'bailleur',label:"Nom du bailleur",type:'text',required:true},
      {key:'locataire',label:"Nom du locataire",type:'text',required:true},
      {key:'adresse_bien',label:"Adresse du bien",type:'text',required:true},
      {key:'ancien_loyer',label:"Ancien loyer mensuel (FCFA)",type:'text',required:true},
      {key:'nouveau_loyer',label:"Nouveau loyer mensuel (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>AVENANT DE RÉVISION DE LOYER</h1>
<h2>Entre les soussignés</h2>
<p><strong>Bailleur :</strong> {{bailleur}}</p>
<p><strong>Locataire :</strong> {{locataire}}</p>
<h2>Article 1 – Révision</h2>
<p>Pour le bien situé à {{adresse_bien}}, les parties conviennent de fixer le loyer mensuel à <strong>{{nouveau_loyer}} FCFA</strong> (ancien loyer : {{ancien_loyer}} FCFA).</p>
<h2>Article 2 – Prise d'effet</h2>
<p>La révision prend effet à la date de signature du présent avenant et s'applique aux loyers à échoir à compter du mois suivant.</p>
<h2>Article 3 – Maintien des autres clauses</h2>
<p>Toutes les autres dispositions du bail demeurent inchangées.</p>
<p class="signature-block">Fait à Abidjan, le ___________</p></div>`
  },
  {
    code: 'loc_mandat_gestion_locative',
    name: "Accord de mandat de gestion locative",
    category: 'immobilier', price: 6000, priceMax: 18000,
    description: "Mandat confiant à un gestionnaire immobilier la gestion d'un bien locatif (encaissement loyers, suivi locataire, travaux).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 77,
    fieldsJson: F([
      {key:'mandant',label:"Nom du propriétaire mandant",type:'text',required:true},
      {key:'gestionnaire',label:"Nom du gestionnaire mandataire",type:'text',required:true},
      {key:'bien_gere',label:"Description du bien à gérer",type:'text',required:true},
      {key:'honoraires_gestion',label:"Honoraires de gestion (% loyer encaissé)",type:'text',required:true},
      {key:'duree_mandat',label:"Durée du mandat (années)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>MANDAT DE GESTION LOCATIVE</h1>
<h2>Entre les soussignés</h2>
<p><strong>Propriétaire mandant :</strong> {{mandant}}</p>
<p><strong>Gestionnaire mandataire :</strong> {{gestionnaire}}</p>
<h2>Article 1 – Bien géré</h2>
<p>{{bien_gere}}</p>
<h2>Article 2 – Mission du gestionnaire</h2>
<p>Le gestionnaire est chargé de : rechercher et sélectionner les locataires, établir et signer les baux, encaisser les loyers et charges, gérer les impayés, faire réaliser les travaux d'entretien courant et rendre compte au mandant.</p>
<h2>Article 3 – Honoraires</h2>
<p>Honoraires de gestion courante : <strong>{{honoraires_gestion}} %</strong> des loyers encaissés TTC.</p>
<h2>Article 4 – Durée</h2>
<p>Mandat conclu pour <strong>{{duree_mandat}} an(s)</strong>, renouvelable tacitement.</p>
<p class="signature-block">Fait à Abidjan, le ___________</p></div>`
  },
  {
    code: 'loc_rapport_gestion_annuel',
    name: "Rapport de gestion locative annuel",
    category: 'immobilier', price: 5000, priceMax: 15000,
    description: "Rapport annuel de gestion locative adressé au propriétaire, récapitulant les loyers encaissés, les charges et les travaux.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'gestionnaire',label:"Nom du gestionnaire",type:'text',required:true},
      {key:'proprietaire',label:"Nom du propriétaire",type:'text',required:true},
      {key:'bien',label:"Désignation du bien géré",type:'text',required:true},
      {key:'annee',label:"Année de gestion",type:'text',required:true},
      {key:'loyers_encaisses',label:"Total des loyers encaissés (FCFA)",type:'text',required:true},
      {key:'charges_et_travaux',label:"Charges et travaux réalisés (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>RAPPORT ANNUEL DE GESTION LOCATIVE – {{annee}}</h1>
<h2>Gestionnaire : {{gestionnaire}}</h2>
<h2>Propriétaire : {{proprietaire}}</h2>
<h2>Bien géré : {{bien}}</h2>
<h2>1. Loyers encaissés</h2>
<p>Total des loyers et charges locatives encaissés pour l'année {{annee}} : <strong>{{loyers_encaisses}} FCFA</strong></p>
<h2>2. Charges et travaux</h2>
<p>Total des charges et travaux payés pour le compte du propriétaire : <strong>{{charges_et_travaux}} FCFA</strong></p>
<h2>3. Solde net propriétaire</h2>
<p>Solde net reversé ou à reverser au propriétaire : à calculer selon les relevés mensuels annexés.</p>
<h2>4. Situation locative</h2>
<p>Situation du locataire actuel, taux d'occupation annuel, éventuels impayés et actions engagées.</p>
<p class="signature-block">Établi à Abidjan, le ___________</p></div>`
  },
  {
    code: 'loc_charte_bailleur_locataire',
    name: "Charte du bailleur et du locataire responsables",
    category: 'immobilier', price: 3000, priceMax: 9000,
    description: "Charte de bonnes pratiques fixant les engagements réciproques du bailleur et du locataire pour une relation locative apaisée en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      {key:'bailleur',label:"Nom du bailleur signataire",type:'text',required:true},
      {key:'locataire',label:"Nom du locataire signataire",type:'text',required:true},
      {key:'adresse_bien',label:"Adresse du bien loué",type:'text',required:true},
      {key:'date_signature',label:"Date de signature de la charte",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CHARTE DU BAILLEUR ET DU LOCATAIRE RESPONSABLES</h1>
<h2>Parties</h2>
<p><strong>Bailleur :</strong> {{bailleur}}</p>
<p><strong>Locataire :</strong> {{locataire}}</p>
<p><strong>Bien concerné :</strong> {{adresse_bien}}</p>
<p><strong>Date :</strong> {{date_signature}}</p>
<h2>Engagements du bailleur</h2>
<ul>
<li>Délivrer un logement décent, en bon état d'entretien et conforme aux normes d'habitabilité.</li>
<li>Respecter la vie privée du locataire et ne visiter le logement qu'avec son accord préalable.</li>
<li>Restituer le dépôt de garantie dans les délais légaux.</li>
<li>Répondre dans les meilleurs délais aux demandes de réparations urgentes.</li>
</ul>
<h2>Engagements du locataire</h2>
<ul>
<li>Payer son loyer et ses charges aux dates convenues.</li>
<li>User paisiblement du logement et respecter le voisinage.</li>
<li>Entretenir le logement et signaler tout dégât ou sinistre sans délai.</li>
<li>Restituer le logement en bon état à l'issue du bail.</li>
</ul>
<p class="signature-block">Signé à Abidjan, le {{date_signature}}</p></div>`
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
  console.log(`Batch 104a OK — créés:${created} maj:${updated} TOTAL:${total}`);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
