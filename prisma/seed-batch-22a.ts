import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // â”€â”€ COMMERCE DE GROS (gros_) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    code: 'gros_fourniture_annuelle',
    name: "Contrat de Fourniture Annuelle",
    category: 'commercial_financier',
    price: 8000, priceMax: 24000,
    description: "Contrat annuel encadrant la fourniture rÃ©guliÃ¨re de marchandises entre fournisseur et grossiste, conforme au droit OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 74,
    fieldsJson: F([
      { key: 'nom_fournisseur', label: "Nom du fournisseur", type: 'text', required: true },
      { key: 'nom_grossiste', label: "Nom du grossiste", type: 'text', required: true },
      { key: 'produits_concernes', label: "Produits concernÃ©s", type: 'textarea', required: true },
      { key: 'volume_annuel', label: "Volume annuel estimÃ©", type: 'text', required: true },
      { key: 'date_debut', label: "Date de dÃ©but", type: 'date', required: true },
      { key: 'date_fin', label: "Date de fin", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>CONTRAT DE FOURNITURE ANNUELLE</h1><p>Entre <strong>{{nom_fournisseur}}</strong> (le Fournisseur) et <strong>{{nom_grossiste}}</strong> (le Grossiste), il est convenu ce qui suit :</p><h2>Article 1 â€“ Objet</h2><p>Le prÃ©sent contrat fixe les conditions de fourniture annuelle des produits suivants : {{produits_concernes}}.</p><h2>Article 2 â€“ Volume</h2><p>Le volume annuel estimÃ© est de {{volume_annuel}}.</p><h2>Article 3 â€“ DurÃ©e</h2><p>Le contrat prend effet le {{date_debut}} et expire le {{date_fin}}, sauf reconduction tacite.</p><h2>Article 4 â€“ Droit applicable</h2><p>Le prÃ©sent contrat est soumis Ã  l'Acte Uniforme OHADA relatif au droit commercial gÃ©nÃ©ral.</p></div>`
  },
  {
    code: 'gros_accord_cadre_distribution',
    name: "Accord-Cadre de Distribution",
    category: 'commercial_financier',
    price: 9000, priceMax: 27000,
    description: "Accord-cadre dÃ©finissant les conditions gÃ©nÃ©rales de distribution entre un fournisseur et un rÃ©seau de grossistes en Afrique francophone.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      { key: 'fournisseur', label: "Fournisseur", type: 'text', required: true },
      { key: 'distributeur', label: "Distributeur", type: 'text', required: true },
      { key: 'territoire', label: "Territoire de distribution", type: 'text', required: true },
      { key: 'conditions_prix', label: "Conditions de prix", type: 'textarea', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD-CADRE DE DISTRIBUTION</h1><p>Entre <strong>{{fournisseur}}</strong> et <strong>{{distributeur}}</strong>, signÃ© le {{date_signature}}.</p><h2>Article 1 â€“ Objet</h2><p>Le prÃ©sent accord-cadre rÃ©git les conditions gÃ©nÃ©rales de distribution sur le territoire : {{territoire}}.</p><h2>Article 2 â€“ Conditions tarifaires</h2><p>{{conditions_prix}}</p><h2>Article 3 â€“ Obligations des parties</h2><p>Chaque partie s'engage Ã  respecter les termes du prÃ©sent accord et la rÃ©glementation OHADA en vigueur.</p></div>`
  },
  {
    code: 'gros_exclusivite_territoriale',
    name: "Contrat d'ExclusivitÃ© Territoriale",
    category: 'commercial_financier',
    price: 10000, priceMax: 30000,
    description: "Contrat accordant Ã  un grossiste l'exclusivitÃ© de distribution sur un territoire dÃ©fini, conforme au droit OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 71,
    fieldsJson: F([
      { key: 'concedant', label: "ConcÃ©dant", type: 'text', required: true },
      { key: 'concessionnaire', label: "Concessionnaire exclusif", type: 'text', required: true },
      { key: 'territoire_exclusif', label: "Territoire exclusif", type: 'text', required: true },
      { key: 'produits', label: "Produits concernÃ©s", type: 'textarea', required: true },
      { key: 'duree_contrat', label: "DurÃ©e du contrat (annÃ©es)", type: 'text', required: true },
      { key: 'date_effet', label: "Date d'effet", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>CONTRAT D'EXCLUSIVITÃ‰ TERRITORIALE</h1><p><strong>{{concedant}}</strong> accorde Ã  <strong>{{concessionnaire}}</strong> l'exclusivitÃ© de distribution sur : {{territoire_exclusif}}.</p><h2>Article 1 â€“ Produits</h2><p>{{produits}}</p><h2>Article 2 â€“ DurÃ©e</h2><p>DurÃ©e : {{duree_contrat}} an(s) Ã  compter du {{date_effet}}.</p><h2>Article 3 â€“ Obligations</h2><p>Le concessionnaire s'engage Ã  atteindre les objectifs de vente fixÃ©s et Ã  ne pas distribuer de produits concurrents sur le territoire.</p></div>`
  },
  {
    code: 'gros_distribution_selective',
    name: "Contrat de Distribution SÃ©lective",
    category: 'commercial_financier',
    price: 8500, priceMax: 25000,
    description: "Contrat de distribution sÃ©lective permettant au fournisseur de choisir ses distributeurs selon des critÃ¨res qualitatifs prÃ©cis.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      { key: 'fournisseur', label: "Fournisseur", type: 'text', required: true },
      { key: 'distributeur_agree', label: "Distributeur agrÃ©Ã©", type: 'text', required: true },
      { key: 'criteres_selection', label: "CritÃ¨res de sÃ©lection", type: 'textarea', required: true },
      { key: 'gamme_produits', label: "Gamme de produits", type: 'text', required: true },
      { key: 'date_agrement', label: "Date d'agrÃ©ment", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>CONTRAT DE DISTRIBUTION SÃ‰LECTIVE</h1><p>Entre <strong>{{fournisseur}}</strong> et <strong>{{distributeur_agree}}</strong>, agrÃ©Ã© le {{date_agrement}}.</p><h2>Article 1 â€“ SÃ©lection</h2><p>CritÃ¨res de sÃ©lection retenus : {{criteres_selection}}</p><h2>Article 2 â€“ Gamme</h2><p>Gamme concernÃ©e : {{gamme_produits}}</p><h2>Article 3 â€“ Engagements</h2><p>Le distributeur s'engage Ã  maintenir les standards de qualitÃ© exigÃ©s et Ã  ne vendre qu'aux consommateurs finals ou Ã  d'autres distributeurs agrÃ©Ã©s.</p></div>`
  },
  {
    code: 'gros_referencement_fournisseur',
    name: "Accord de RÃ©fÃ©rencement Fournisseur",
    category: 'commercial_financier',
    price: 6000, priceMax: 18000,
    description: "Accord formalisant le rÃ©fÃ©rencement d'un fournisseur dans le catalogue d'un grossiste ou d'une centrale d'achat.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      { key: 'centrale_achat', label: "Centrale / Grossiste", type: 'text', required: true },
      { key: 'fournisseur', label: "Fournisseur", type: 'text', required: true },
      { key: 'produits_references', label: "Produits rÃ©fÃ©rencÃ©s", type: 'textarea', required: true },
      { key: 'duree_referencement', label: "DurÃ©e du rÃ©fÃ©rencement", type: 'text', required: true },
      { key: 'date_effet', label: "Date d'effet", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE RÃ‰FÃ‰RENCEMENT FOURNISSEUR</h1><p><strong>{{centrale_achat}}</strong> accepte de rÃ©fÃ©rencer <strong>{{fournisseur}}</strong> Ã  compter du {{date_effet}} pour une durÃ©e de {{duree_referencement}}.</p><h2>Article 1 â€“ Produits rÃ©fÃ©rencÃ©s</h2><p>{{produits_references}}</p><h2>Article 2 â€“ Conditions</h2><p>Le fournisseur s'engage Ã  respecter les cahiers des charges et les dÃ©lais de livraison convenus.</p></div>`
  },
  {
    code: 'gros_centrale_achat',
    name: "Convention de Centrale d'Achat",
    category: 'commercial_financier',
    price: 12000, priceMax: 36000,
    description: "Convention organisant le fonctionnement d'une centrale d'achat groupÃ©e entre plusieurs grossistes membres.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 59,
    fieldsJson: F([
      { key: 'nom_centrale', label: "Nom de la centrale", type: 'text', required: true },
      { key: 'membres', label: "Membres fondateurs", type: 'textarea', required: true },
      { key: 'siege_social', label: "SiÃ¨ge social", type: 'text', required: true },
      { key: 'date_creation', label: "Date de crÃ©ation", type: 'date', required: true },
      { key: 'quota_contribution', label: "Quota de contribution", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>CONVENTION DE CENTRALE D'ACHAT</h1><p>La centrale <strong>{{nom_centrale}}</strong>, dont le siÃ¨ge est Ã  {{siege_social}}, est constituÃ©e entre les membres suivants :</p><p>{{membres}}</p><h2>Article 1 â€“ Objet</h2><p>La centrale a pour objet de nÃ©gocier et d'acheter en commun auprÃ¨s des fournisseurs rÃ©fÃ©rencÃ©s.</p><h2>Article 2 â€“ Contributions</h2><p>Quota de contribution par membre : {{quota_contribution}}</p><h2>Article 3 â€“ Gouvernance</h2><p>Les dÃ©cisions sont prises Ã  la majoritÃ© des membres, chacun disposant d'une voix proportionnelle Ã  sa contribution.</p></div>`
  },
  {
    code: 'gros_remise_fin_annee',
    name: "Contrat de Remise de Fin d'AnnÃ©e",
    category: 'commercial_financier',
    price: 5000, priceMax: 15000,
    description: "Contrat fixant les modalitÃ©s de calcul et de versement des remises de fin d'annÃ©e (RFA) entre fournisseur et grossiste.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      { key: 'fournisseur', label: "Fournisseur", type: 'text', required: true },
      { key: 'grossiste', label: "Grossiste", type: 'text', required: true },
      { key: 'taux_remise', label: "Taux de remise (%)", type: 'text', required: true },
      { key: 'seuil_declenchement', label: "Seuil de dÃ©clenchement (FCFA)", type: 'text', required: true },
      { key: 'date_calcul', label: "Date de calcul", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>CONTRAT DE REMISE DE FIN D'ANNÃ‰E</h1><p>Entre <strong>{{fournisseur}}</strong> et <strong>{{grossiste}}</strong>.</p><h2>Article 1 â€“ Remise accordÃ©e</h2><p>Un taux de remise de <strong>{{taux_remise}}%</strong> est accordÃ© sur le chiffre d'affaires annuel net dÃ©passant {{seuil_declenchement}} FCFA.</p><h2>Article 2 â€“ Calcul</h2><p>La remise est calculÃ©e au {{date_calcul}} sur la base des achats effectifs de l'annÃ©e Ã©coulÃ©e.</p><h2>Article 3 â€“ Versement</h2><p>Le versement intervient dans les 30 jours suivant la date de calcul, par virement bancaire.</p></div>`
  },
  {
    code: 'gros_cooperation_commerciale',
    name: "Accord de CoopÃ©ration Commerciale",
    category: 'commercial_financier',
    price: 7000, priceMax: 21000,
    description: "Accord formalisant les services de coopÃ©ration commerciale (mise en avant, animation, logistique) rendus par le distributeur au fournisseur.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      { key: 'fournisseur', label: "Fournisseur", type: 'text', required: true },
      { key: 'distributeur', label: "Distributeur", type: 'text', required: true },
      { key: 'services_rendus', label: "Services de coopÃ©ration rendus", type: 'textarea', required: true },
      { key: 'remuneration', label: "RÃ©munÃ©ration convenue (FCFA)", type: 'text', required: true },
      { key: 'date_accord', label: "Date de l'accord", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE COOPÃ‰RATION COMMERCIALE</h1><p>Entre <strong>{{fournisseur}}</strong> et <strong>{{distributeur}}</strong>, conclu le {{date_accord}}.</p><h2>Article 1 â€“ Services</h2><p>{{distributeur}} s'engage Ã  fournir les services suivants : {{services_rendus}}</p><h2>Article 2 â€“ RÃ©munÃ©ration</h2><p>En contrepartie, {{fournisseur}} versera la somme de {{remuneration}} FCFA, conformÃ©ment Ã  la rÃ©glementation OHADA sur les pratiques commerciales.</p></div>`
  },
  {
    code: 'gros_stockage_distribution',
    name: "Contrat de Stockage et Distribution",
    category: 'commercial_financier',
    price: 9000, priceMax: 27000,
    description: "Contrat organisant les prestations de stockage et de distribution de marchandises pour le compte d'un fournisseur.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      { key: 'mandant', label: "Mandant (propriÃ©taire des stocks)", type: 'text', required: true },
      { key: 'prestataire', label: "Prestataire logistique", type: 'text', required: true },
      { key: 'entrepot', label: "Adresse de l'entrepÃ´t", type: 'text', required: true },
      { key: 'capacite_stockage', label: "CapacitÃ© de stockage (mÂ³ ou palettes)", type: 'text', required: true },
      { key: 'tarif_stockage', label: "Tarif de stockage mensuel (FCFA)", type: 'text', required: true },
      { key: 'date_prise_effet', label: "Date de prise d'effet", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>CONTRAT DE STOCKAGE ET DISTRIBUTION</h1><p>Entre <strong>{{mandant}}</strong> et <strong>{{prestataire}}</strong>, Ã  compter du {{date_prise_effet}}.</p><h2>Article 1 â€“ EntrepÃ´t</h2><p>Lieu de stockage : {{entrepot}} â€” CapacitÃ© : {{capacite_stockage}}.</p><h2>Article 2 â€“ Tarification</h2><p>Tarif mensuel de stockage : {{tarif_stockage}} FCFA. Les frais de distribution sont facturÃ©s sÃ©parÃ©ment selon barÃ¨me annexÃ©.</p><h2>Article 3 â€“ ResponsabilitÃ©</h2><p>Le prestataire est responsable des marchandises dÃ¨s leur rÃ©ception en entrepÃ´t jusqu'Ã  leur livraison.</p></div>`
  },
  {
    code: 'gros_depositaire_agree',
    name: "Convention de DÃ©positaire AgrÃ©Ã©",
    category: 'commercial_financier',
    price: 8000, priceMax: 24000,
    description: "Convention dÃ©signant un dÃ©positaire agrÃ©Ã© pour la conservation et la redistribution de produits sur une zone gÃ©ographique dÃ©finie.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 57,
    fieldsJson: F([
      { key: 'deposant', label: "DÃ©posant (fournisseur)", type: 'text', required: true },
      { key: 'depositaire', label: "DÃ©positaire agrÃ©Ã©", type: 'text', required: true },
      { key: 'zone_couverture', label: "Zone de couverture", type: 'text', required: true },
      { key: 'commission_depot', label: "Commission de dÃ©pÃ´t (%)", type: 'text', required: true },
      { key: 'date_convention', label: "Date de la convention", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>CONVENTION DE DÃ‰POSITAIRE AGRÃ‰Ã‰</h1><p><strong>{{deposant}}</strong> dÃ©signe <strong>{{depositaire}}</strong> comme dÃ©positaire agrÃ©Ã© sur la zone : {{zone_couverture}}.</p><h2>Article 1 â€“ Mission</h2><p>Le dÃ©positaire assure la rÃ©ception, le stockage, et la redistribution des produits confiÃ©s.</p><h2>Article 2 â€“ RÃ©munÃ©ration</h2><p>Commission de dÃ©pÃ´t : {{commission_depot}}% du chiffre d'affaires rÃ©alisÃ© sur la zone.</p><h2>Article 3 â€“ AgrÃ©ment</h2><p>L'agrÃ©ment est accordÃ© pour un an renouvelable, sous rÃ©serve d'atteinte des objectifs fixÃ©s. SignÃ© le {{date_convention}}.</p></div>`
  },
  {
    code: 'gros_commissionnaire_marchandises',
    name: "Contrat de Commissionnaire en Marchandises",
    category: 'commercial_financier',
    price: 7500, priceMax: 22000,
    description: "Contrat dÃ©signant un commissionnaire chargÃ© d'acheter ou de vendre des marchandises pour le compte d'un commettant.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      { key: 'commettant', label: "Commettant", type: 'text', required: true },
      { key: 'commissionnaire', label: "Commissionnaire", type: 'text', required: true },
      { key: 'nature_operations', label: "Nature des opÃ©rations", type: 'textarea', required: true },
      { key: 'commission_taux', label: "Taux de commission (%)", type: 'text', required: true },
      { key: 'date_contrat', label: "Date du contrat", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>CONTRAT DE COMMISSIONNAIRE EN MARCHANDISES</h1><p><strong>{{commissionnaire}}</strong> agit pour le compte de <strong>{{commettant}}</strong> selon les termes du prÃ©sent contrat signÃ© le {{date_contrat}}.</p><h2>Article 1 â€“ OpÃ©rations</h2><p>{{nature_operations}}</p><h2>Article 2 â€“ Commission</h2><p>Le commissionnaire perÃ§oit une commission de {{commission_taux}}% sur la valeur des opÃ©rations rÃ©alisÃ©es.</p><h2>Article 3 â€“ Reddition de compte</h2><p>Le commissionnaire rend compte mensuellement de toutes les opÃ©rations effectuÃ©es, conformÃ©ment Ã  l'Acte Uniforme OHADA.</p></div>`
  },
  {
    code: 'gros_transport_livraison',
    name: "Accord de Transport et Livraison Grossiste",
    category: 'commercial_financier',
    price: 6000, priceMax: 18000,
    description: "Accord cadrant les conditions de transport et de livraison des marchandises entre un grossiste et un prestataire de transport.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 64,
    fieldsJson: F([
      { key: 'grossiste', label: "Grossiste expÃ©diteur", type: 'text', required: true },
      { key: 'transporteur', label: "Transporteur", type: 'text', required: true },
      { key: 'zone_livraison', label: "Zone de livraison", type: 'text', required: true },
      { key: 'tarif_transport', label: "Tarif transport (FCFA/tonne ou km)", type: 'text', required: true },
      { key: 'date_accord', label: "Date de l'accord", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE TRANSPORT ET LIVRAISON GROSSISTE</h1><p>Entre <strong>{{grossiste}}</strong> et <strong>{{transporteur}}</strong>, conclu le {{date_accord}}.</p><h2>Article 1 â€“ Zone</h2><p>Zone de livraison : {{zone_livraison}}</p><h2>Article 2 â€“ Tarification</h2><p>Tarif convenu : {{tarif_transport}}.</p><h2>Article 3 â€“ DÃ©lais et responsabilitÃ©</h2><p>Le transporteur garantit les dÃ©lais convenus et est responsable des avaries survenant durant le transport.</p></div>`
  },
  {
    code: 'gros_cga_grossiste',
    name: "Conditions GÃ©nÃ©rales d'Achat Grossiste",
    category: 'commercial_financier',
    price: 5500, priceMax: 16000,
    description: "Conditions gÃ©nÃ©rales encadrant tous les achats rÃ©alisÃ©s par un grossiste auprÃ¨s de ses fournisseurs.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      { key: 'nom_grossiste', label: "Nom du grossiste", type: 'text', required: true },
      { key: 'siege_grossiste', label: "SiÃ¨ge du grossiste", type: 'text', required: true },
      { key: 'delai_paiement', label: "DÃ©lai de paiement (jours)", type: 'text', required: true },
      { key: 'penalites_retard', label: "PÃ©nalitÃ©s de retard (%)", type: 'text', required: true },
      { key: 'date_entree_vigueur', label: "Date d'entrÃ©e en vigueur", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>CONDITIONS GÃ‰NÃ‰RALES D'ACHAT</h1><p><strong>{{nom_grossiste}}</strong> â€” {{siege_grossiste}}</p><h2>Article 1 â€“ Commandes</h2><p>Toute commande doit faire l'objet d'un bon de commande signÃ© par un reprÃ©sentant habilitÃ© du grossiste.</p><h2>Article 2 â€“ Paiement</h2><p>DÃ©lai de paiement : {{delai_paiement}} jours date de facture. PÃ©nalitÃ©s de retard : {{penalites_retard}}% par mois.</p><h2>Article 3 â€“ Litiges</h2><p>En cas de litige, les parties s'engagent Ã  recourir Ã  la mÃ©diation avant toute action judiciaire. Applicable Ã  compter du {{date_entree_vigueur}}.</p></div>`
  },
  {
    code: 'gros_reprise_invendus',
    name: "Accord de Reprise des Invendus",
    category: 'commercial_financier',
    price: 4500, priceMax: 13000,
    description: "Accord dÃ©finissant les conditions de reprise des marchandises invendues par le fournisseur auprÃ¨s du grossiste.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 61,
    fieldsJson: F([
      { key: 'fournisseur', label: "Fournisseur", type: 'text', required: true },
      { key: 'grossiste', label: "Grossiste", type: 'text', required: true },
      { key: 'taux_reprise', label: "Taux de reprise (%)", type: 'text', required: true },
      { key: 'delai_retour', label: "DÃ©lai de retour (jours)", type: 'text', required: true },
      { key: 'date_accord', label: "Date de l'accord", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE REPRISE DES INVENDUS</h1><p>Entre <strong>{{fournisseur}}</strong> et <strong>{{grossiste}}</strong>, signÃ© le {{date_accord}}.</p><h2>Article 1 â€“ Conditions de reprise</h2><p>Le fournisseur accepte de reprendre les invendus Ã  hauteur de {{taux_reprise}}% des quantitÃ©s livrÃ©es.</p><h2>Article 2 â€“ DÃ©lai</h2><p>Les invendus doivent Ãªtre retournÃ©s dans un dÃ©lai de {{delai_retour}} jours aprÃ¨s la fin de la pÃ©riode convenue.</p><h2>Article 3 â€“ Ã‰tat des produits</h2><p>Seuls les produits en parfait Ã©tat de conservation et dans leur emballage d'origine sont repris.</p></div>`
  },
  {
    code: 'gros_label_qualite',
    name: "Contrat de Label de QualitÃ© Grossiste",
    category: 'commercial_financier',
    price: 7000, priceMax: 21000,
    description: "Contrat attribuant un label qualitÃ© Ã  un grossiste en reconnaissance de ses standards de service et de stockage.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 53,
    fieldsJson: F([
      { key: 'organisme_label', label: "Organisme Ã©metteur du label", type: 'text', required: true },
      { key: 'grossiste_labellise', label: "Grossiste labellisÃ©", type: 'text', required: true },
      { key: 'criteres_label', label: "CritÃ¨res du label", type: 'textarea', required: true },
      { key: 'validite_label', label: "DurÃ©e de validitÃ© (ans)", type: 'text', required: true },
      { key: 'date_attribution', label: "Date d'attribution", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>CONTRAT DE LABEL DE QUALITÃ‰ GROSSISTE</h1><p><strong>{{organisme_label}}</strong> attribue le label qualitÃ© Ã  <strong>{{grossiste_labellise}}</strong> le {{date_attribution}}.</p><h2>Article 1 â€“ CritÃ¨res</h2><p>{{criteres_label}}</p><h2>Article 2 â€“ ValiditÃ©</h2><p>Le label est valable {{validite_label}} an(s), sous rÃ©serve d'audit annuel de conformitÃ©.</p><h2>Article 3 â€“ Retrait</h2><p>Le label peut Ãªtre retirÃ© en cas de non-conformitÃ© avÃ©rÃ©e aprÃ¨s mise en demeure.</p></div>`
  },
  {
    code: 'gros_reglement_interentreprises',
    name: "Convention de RÃ¨glement Inter-Entreprises",
    category: 'commercial_financier',
    price: 6500, priceMax: 19000,
    description: "Convention organisant les conditions de rÃ¨glement et de compensation entre entreprises partenaires dans un rÃ©seau de grossistes.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      { key: 'entreprise_a', label: "Entreprise A", type: 'text', required: true },
      { key: 'entreprise_b', label: "Entreprise B", type: 'text', required: true },
      { key: 'mode_reglement', label: "Mode de rÃ¨glement", type: 'text', required: true },
      { key: 'periodicite', label: "PÃ©riodicitÃ© de compensation", type: 'text', required: true },
      { key: 'date_convention', label: "Date de la convention", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>CONVENTION DE RÃˆGLEMENT INTER-ENTREPRISES</h1><p>Entre <strong>{{entreprise_a}}</strong> et <strong>{{entreprise_b}}</strong>, signÃ©e le {{date_convention}}.</p><h2>Article 1 â€“ Mode de rÃ¨glement</h2><p>{{mode_reglement}}</p><h2>Article 2 â€“ Compensation</h2><p>Les crÃ©ances et dettes rÃ©ciproques font l'objet d'une compensation {{periodicite}}.</p><h2>Article 3 â€“ Solde</h2><p>Le solde net est rÃ©glÃ© par virement bancaire dans les 5 jours ouvrÃ©s suivant la compensation.</p></div>`
  },
  {
    code: 'gros_garantie_prix',
    name: "Accord de Garantie Prix Fournisseur",
    category: 'commercial_financier',
    price: 5000, priceMax: 15000,
    description: "Accord par lequel un fournisseur garantit la stabilitÃ© de ses prix Ã  un grossiste sur une pÃ©riode dÃ©terminÃ©e.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 67,
    fieldsJson: F([
      { key: 'fournisseur', label: "Fournisseur", type: 'text', required: true },
      { key: 'grossiste', label: "Grossiste bÃ©nÃ©ficiaire", type: 'text', required: true },
      { key: 'produits_garantis', label: "Produits concernÃ©s", type: 'textarea', required: true },
      { key: 'duree_garantie', label: "DurÃ©e de garantie prix (mois)", type: 'text', required: true },
      { key: 'date_debut_garantie', label: "Date de dÃ©but", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE GARANTIE PRIX FOURNISSEUR</h1><p><strong>{{fournisseur}}</strong> garantit ses prix Ã  <strong>{{grossiste}}</strong> pour {{duree_garantie}} mois Ã  compter du {{date_debut_garantie}}.</p><h2>Article 1 â€“ Produits</h2><p>{{produits_garantis}}</p><h2>Article 2 â€“ StabilitÃ©</h2><p>Aucune hausse de prix ne peut intervenir pendant la pÃ©riode de garantie, sauf cas de force majeure dÃ»ment justifiÃ©.</p><h2>Article 3 â€“ Notification</h2><p>Toute rÃ©vision de prix hors garantie requiert un prÃ©avis de 30 jours.</p></div>`
  },
  {
    code: 'gros_bonification',
    name: "Contrat de Bonification",
    category: 'commercial_financier',
    price: 4500, priceMax: 13000,
    description: "Contrat dÃ©finissant les modalitÃ©s d'attribution de bonifications en marchandises ou en numÃ©raire pour atteinte d'objectifs de vente.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      { key: 'fournisseur', label: "Fournisseur", type: 'text', required: true },
      { key: 'grossiste', label: "Grossiste", type: 'text', required: true },
      { key: 'objectif_vente', label: "Objectif de vente (FCFA)", type: 'text', required: true },
      { key: 'type_bonification', label: "Type de bonification (espÃ¨ces / produits)", type: 'text', required: true },
      { key: 'date_contrat', label: "Date du contrat", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>CONTRAT DE BONIFICATION</h1><p>Entre <strong>{{fournisseur}}</strong> et <strong>{{grossiste}}</strong>, signÃ© le {{date_contrat}}.</p><h2>Article 1 â€“ Objectif</h2><p>Pour un chiffre d'affaires annuel dÃ©passant {{objectif_vente}} FCFA, le grossiste bÃ©nÃ©ficie d'une bonification.</p><h2>Article 2 â€“ Nature</h2><p>Type de bonification accordÃ©e : {{type_bonification}}.</p><h2>Article 3 â€“ Versement</h2><p>La bonification est attribuÃ©e dans les 45 jours suivant la clÃ´ture de l'exercice annuel.</p></div>`
  },
  {
    code: 'gros_prime_referencement',
    name: "Accord de Prime de RÃ©fÃ©rencement",
    category: 'commercial_financier',
    price: 5000, priceMax: 15000,
    description: "Accord fixant les conditions de versement d'une prime de rÃ©fÃ©rencement par un fournisseur Ã  une centrale ou un grossiste.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 64,
    fieldsJson: F([
      { key: 'fournisseur', label: "Fournisseur", type: 'text', required: true },
      { key: 'centrale_grossiste', label: "Centrale / Grossiste", type: 'text', required: true },
      { key: 'montant_prime', label: "Montant de la prime (FCFA)", type: 'text', required: true },
      { key: 'modalite_versement', label: "ModalitÃ© de versement", type: 'text', required: true },
      { key: 'date_accord', label: "Date de l'accord", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE PRIME DE RÃ‰FÃ‰RENCEMENT</h1><p><strong>{{fournisseur}}</strong> verse une prime de rÃ©fÃ©rencement Ã  <strong>{{centrale_grossiste}}</strong> selon les modalitÃ©s suivantes.</p><h2>Article 1 â€“ Montant</h2><p>Prime de rÃ©fÃ©rencement : {{montant_prime}} FCFA.</p><h2>Article 2 â€“ Versement</h2><p>{{modalite_versement}}</p><h2>Article 3 â€“ Contrepartie</h2><p>En Ã©change, la centrale garantit le rÃ©fÃ©rencement actif des produits du fournisseur dans son catalogue. SignÃ© le {{date_accord}}.</p></div>`
  },
  {
    code: 'gros_merchandising',
    name: "Contrat de Merchandising",
    category: 'commercial_financier',
    price: 6000, priceMax: 18000,
    description: "Contrat encadrant les prestations de merchandising rÃ©alisÃ©es pour optimiser la prÃ©sentation des produits en point de vente.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      { key: 'fournisseur', label: "Fournisseur (annonceur)", type: 'text', required: true },
      { key: 'prestataire_merch', label: "Prestataire merchandising", type: 'text', required: true },
      { key: 'points_vente', label: "Points de vente concernÃ©s", type: 'textarea', required: true },
      { key: 'budget_merch', label: "Budget merchandising (FCFA)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de dÃ©but", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>CONTRAT DE MERCHANDISING</h1><p>Entre <strong>{{fournisseur}}</strong> et <strong>{{prestataire_merch}}</strong>, Ã  compter du {{date_debut}}.</p><h2>Article 1 â€“ PÃ©rimÃ¨tre</h2><p>Points de vente : {{points_vente}}</p><h2>Article 2 â€“ Prestations</h2><p>Le prestataire assure la mise en rayon, le facing, le balisage prix et l'animation des produits selon les planogrammes fournis.</p><h2>Article 3 â€“ Budget</h2><p>Budget allouÃ© : {{budget_merch}} FCFA, facturÃ© mensuellement.</p></div>`
  },
  {
    code: 'gros_planogramme',
    name: "Accord de Planogramme",
    category: 'commercial_financier',
    price: 4500, priceMax: 13000,
    description: "Accord dÃ©finissant les rÃ¨gles de planogramme pour la disposition des produits d'un fournisseur en linÃ©aire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 51,
    fieldsJson: F([
      { key: 'fournisseur', label: "Fournisseur", type: 'text', required: true },
      { key: 'enseigne', label: "Enseigne distributeur", type: 'text', required: true },
      { key: 'lineaire_alloue', label: "LinÃ©aire allouÃ© (ml)", type: 'text', required: true },
      { key: 'position_rayon', label: "Position en rayon", type: 'text', required: true },
      { key: 'date_mise_en_place', label: "Date de mise en place", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE PLANOGRAMME</h1><p>Entre <strong>{{fournisseur}}</strong> et <strong>{{enseigne}}</strong>, applicable Ã  compter du {{date_mise_en_place}}.</p><h2>Article 1 â€“ LinÃ©aire</h2><p>LinÃ©aire allouÃ© : {{lineaire_alloue}} mÃ¨tres linÃ©aires.</p><h2>Article 2 â€“ Position</h2><p>Position en rayon : {{position_rayon}}.</p><h2>Article 3 â€“ RÃ©vision</h2><p>Le planogramme est rÃ©visÃ© chaque trimestre en fonction des performances de vente enregistrÃ©es.</p></div>`
  },
  {
    code: 'gros_tete_gondole',
    name: "Convention de TÃªte de Gondole",
    category: 'commercial_financier',
    price: 5500, priceMax: 16000,
    description: "Convention rÃ©servant une tÃªte de gondole pour la mise en avant promotionnelle de produits d'un fournisseur.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 59,
    fieldsJson: F([
      { key: 'fournisseur', label: "Fournisseur", type: 'text', required: true },
      { key: 'distributeur', label: "Distributeur / Enseigne", type: 'text', required: true },
      { key: 'magasin_concerne', label: "Magasin concernÃ©", type: 'text', required: true },
      { key: 'duree_occupation', label: "DurÃ©e d'occupation (semaines)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de dÃ©but", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>CONVENTION DE TÃŠTE DE GONDOLE</h1><p>Entre <strong>{{fournisseur}}</strong> et <strong>{{distributeur}}</strong> pour le magasin {{magasin_concerne}}.</p><h2>Article 1 â€“ Objet</h2><p>Une tÃªte de gondole est rÃ©servÃ©e au fournisseur pour une durÃ©e de {{duree_occupation}} semaine(s) Ã  compter du {{date_debut}}.</p><h2>Article 2 â€“ Conditions</h2><p>Le fournisseur fournit le matÃ©riel de PLV et s'engage Ã  garantir l'approvisionnement continu des produits mis en avant.</p></div>`
  },
  {
    code: 'gros_promotion_commerciale',
    name: "Contrat de Promotion Commerciale",
    category: 'commercial_financier',
    price: 6000, priceMax: 18000,
    description: "Contrat organisant les opÃ©rations de promotion commerciale (soldes, offres spÃ©ciales, remises temporaires) entre fournisseur et distributeur.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 73,
    fieldsJson: F([
      { key: 'fournisseur', label: "Fournisseur", type: 'text', required: true },
      { key: 'distributeur', label: "Distributeur", type: 'text', required: true },
      { key: 'produits_promo', label: "Produits en promotion", type: 'textarea', required: true },
      { key: 'taux_remise_promo', label: "Taux de remise promotionnelle (%)", type: 'text', required: true },
      { key: 'date_debut_promo', label: "Date de dÃ©but", type: 'date', required: true },
      { key: 'date_fin_promo', label: "Date de fin", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>CONTRAT DE PROMOTION COMMERCIALE</h1><p>Entre <strong>{{fournisseur}}</strong> et <strong>{{distributeur}}</strong>.</p><h2>Article 1 â€“ Produits</h2><p>{{produits_promo}}</p><h2>Article 2 â€“ Remise</h2><p>Remise promotionnelle accordÃ©e : {{taux_remise_promo}}%.</p><h2>Article 3 â€“ PÃ©riode</h2><p>Du {{date_debut_promo}} au {{date_fin_promo}}. Stocks promotionnels garantis par le fournisseur.</p></div>`
  },
  {
    code: 'gros_publicite_lieu_vente',
    name: "Accord de PublicitÃ© sur Lieu de Vente",
    category: 'commercial_financier',
    price: 5000, priceMax: 15000,
    description: "Accord encadrant la mise en place de supports publicitaires (PLV) dans les points de vente d'un grossiste ou distributeur.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      { key: 'annonceur', label: "Annonceur (fournisseur)", type: 'text', required: true },
      { key: 'support_vente', label: "Point de vente hÃ´te", type: 'text', required: true },
      { key: 'supports_plv', label: "Types de supports PLV", type: 'textarea', required: true },
      { key: 'budget_plv', label: "Budget PLV (FCFA)", type: 'text', required: true },
      { key: 'date_installation', label: "Date d'installation", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE PUBLICITÃ‰ SUR LIEU DE VENTE</h1><p>Entre <strong>{{annonceur}}</strong> et <strong>{{support_vente}}</strong>.</p><h2>Article 1 â€“ Supports</h2><p>{{supports_plv}}</p><h2>Article 2 â€“ Budget</h2><p>Budget PLV : {{budget_plv}} FCFA pris en charge par l'annonceur.</p><h2>Article 3 â€“ Installation</h2><p>Les supports sont installÃ©s le {{date_installation}} et retirÃ©s Ã  la fin de la campagne convenue.</p></div>`
  },
  {
    code: 'gros_performance_fournisseur',
    name: "Rapport de Performance Fournisseur",
    category: 'commercial_financier',
    price: 4000, priceMax: 12000,
    description: "Rapport d'Ã©valuation pÃ©riodique de la performance d'un fournisseur selon des indicateurs clÃ©s dÃ©finis par le grossiste.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      { key: 'grossiste', label: "Grossiste Ã©valuateur", type: 'text', required: true },
      { key: 'fournisseur_evalue', label: "Fournisseur Ã©valuÃ©", type: 'text', required: true },
      { key: 'periode_evaluation', label: "PÃ©riode d'Ã©valuation", type: 'text', required: true },
      { key: 'taux_service', label: "Taux de service (%)", type: 'text', required: true },
      { key: 'date_rapport', label: "Date du rapport", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE FOURNISSEUR</h1><p>Ã‰tabli par <strong>{{grossiste}}</strong> pour <strong>{{fournisseur_evalue}}</strong> â€” PÃ©riode : {{periode_evaluation}}.</p><h2>1. Taux de service</h2><p>{{taux_service}}%</p><h2>2. QualitÃ© des livraisons</h2><p>Ã‰valuation des dÃ©lais, de la conformitÃ© et de l'Ã©tat des marchandises Ã  rÃ©ception.</p><h2>3. Recommandations</h2><p>Actions correctives proposÃ©es et objectifs pour la prochaine pÃ©riode d'Ã©valuation.</p><p><em>Rapport Ã©tabli le {{date_rapport}}.</em></p></div>`
  },

  // â”€â”€ GRANDE DISTRIBUTION / RETAIL (ret_) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    code: 'ret_franchise_retail',
    name: "Contrat de Franchise Retail",
    category: 'commercial_financier',
    price: 15000, priceMax: 45000,
    description: "Contrat de franchise accordant Ã  un franchisÃ© le droit d'exploiter une enseigne commerciale sous les conditions du franchiseur.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 78,
    fieldsJson: F([
      { key: 'franchiseur', label: "Franchiseur", type: 'text', required: true },
      { key: 'franchise', label: "FranchisÃ©", type: 'text', required: true },
      { key: 'enseigne', label: "Enseigne exploitÃ©e", type: 'text', required: true },
      { key: 'droit_entree', label: "Droit d'entrÃ©e (FCFA)", type: 'text', required: true },
      { key: 'redevance_mensuelle', label: "Redevance mensuelle (%)", type: 'text', required: true },
      { key: 'date_contrat', label: "Date du contrat", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>CONTRAT DE FRANCHISE RETAIL</h1><p><strong>{{franchiseur}}</strong> concÃ¨de Ã  <strong>{{franchise}}</strong> le droit d'exploiter l'enseigne <strong>{{enseigne}}</strong>.</p><h2>Article 1 â€“ Droit d'entrÃ©e</h2><p>Droit d'entrÃ©e : {{droit_entree}} FCFA, payable Ã  la signature.</p><h2>Article 2 â€“ Redevances</h2><p>Redevance mensuelle : {{redevance_mensuelle}}% du chiffre d'affaires HT.</p><h2>Article 3 â€“ Obligations</h2><p>Le franchisÃ© s'engage Ã  respecter le concept, la charte graphique et les standards opÃ©rationnels du rÃ©seau. SignÃ© le {{date_contrat}}.</p></div>`
  },
  {
    code: 'ret_concession_commerciale',
    name: "Contrat de Concession Commerciale",
    category: 'commercial_financier',
    price: 12000, priceMax: 36000,
    description: "Contrat de concession par lequel un concÃ©dant autorise un concessionnaire Ã  vendre ses produits en son nom et pour son compte.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      { key: 'concedant', label: "ConcÃ©dant", type: 'text', required: true },
      { key: 'concessionnaire', label: "Concessionnaire", type: 'text', required: true },
      { key: 'gamme_produits', label: "Gamme de produits", type: 'textarea', required: true },
      { key: 'zone_concession', label: "Zone de concession", type: 'text', required: true },
      { key: 'date_debut', label: "Date de dÃ©but", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>CONTRAT DE CONCESSION COMMERCIALE</h1><p><strong>{{concedant}}</strong> accorde Ã  <strong>{{concessionnaire}}</strong> une concession sur la zone : {{zone_concession}}.</p><h2>Article 1 â€“ Produits</h2><p>{{gamme_produits}}</p><h2>Article 2 â€“ Obligations</h2><p>Le concessionnaire s'engage Ã  promouvoir activement les produits et Ã  atteindre les objectifs de vente fixÃ©s annuellement.</p><h2>Article 3 â€“ DurÃ©e</h2><p>Contrat Ã  durÃ©e dÃ©terminÃ©e, prenant effet le {{date_debut}}.</p></div>`
  },
  {
    code: 'ret_gerance_mandat',
    name: "Contrat de GÃ©rance-Mandat Magasin",
    category: 'commercial_financier',
    price: 10000, priceMax: 30000,
    description: "Contrat par lequel un propriÃ©taire confie la gestion de son magasin Ã  un gÃ©rant-mandataire rÃ©munÃ©rÃ© Ã  la commission.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      { key: 'mandant', label: "Mandant (propriÃ©taire)", type: 'text', required: true },
      { key: 'gerant_mandataire', label: "GÃ©rant-mandataire", type: 'text', required: true },
      { key: 'adresse_magasin', label: "Adresse du magasin", type: 'text', required: true },
      { key: 'commission_gerance', label: "Commission de gÃ©rance (%)", type: 'text', required: true },
      { key: 'date_prise_gerance', label: "Date de prise de gÃ©rance", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>CONTRAT DE GÃ‰RANCE-MANDAT MAGASIN</h1><p><strong>{{mandant}}</strong> confie la gestion du magasin sis {{adresse_magasin}} Ã  <strong>{{gerant_mandataire}}</strong> Ã  compter du {{date_prise_gerance}}.</p><h2>Article 1 â€“ Mission</h2><p>Le gÃ©rant-mandataire gÃ¨re le magasin au nom et pour le compte du mandant, en respectant la politique commerciale dÃ©finie.</p><h2>Article 2 â€“ RÃ©munÃ©ration</h2><p>Commission de gÃ©rance : {{commission_gerance}}% du chiffre d'affaires mensuel net.</p></div>`
  },
  {
    code: 'ret_location_gerance',
    name: "Contrat de Location-GÃ©rance Fonds de Commerce",
    category: 'commercial_financier',
    price: 11000, priceMax: 33000,
    description: "Contrat de location-gÃ©rance permettant Ã  un locataire-gÃ©rant d'exploiter un fonds de commerce retail moyennant redevance.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      { key: 'proprietaire_fonds', label: "PropriÃ©taire du fonds", type: 'text', required: true },
      { key: 'locataire_gerant', label: "Locataire-gÃ©rant", type: 'text', required: true },
      { key: 'description_fonds', label: "Description du fonds de commerce", type: 'textarea', required: true },
      { key: 'redevance_mensuelle', label: "Redevance mensuelle (FCFA)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de dÃ©but", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>CONTRAT DE LOCATION-GÃ‰RANCE DE FONDS DE COMMERCE</h1><p><strong>{{proprietaire_fonds}}</strong> donne en location-gÃ©rance Ã  <strong>{{locataire_gerant}}</strong> le fonds de commerce suivant :</p><p>{{description_fonds}}</p><h2>Article 1 â€“ Redevance</h2><p>Redevance mensuelle : {{redevance_mensuelle}} FCFA, payable le 5 de chaque mois.</p><h2>Article 2 â€“ DurÃ©e</h2><p>Le contrat prend effet le {{date_debut}} pour une durÃ©e dÃ©terminÃ©e, renouvelable.</p><h2>Article 3 â€“ Obligations</h2><p>Le locataire-gÃ©rant exploite le fonds Ã  ses risques et pÃ©rils, en maintenant sa valeur commerciale.</p></div>`
  },
  {
    code: 'ret_licence_marque',
    name: "Accord de Licence de Marque Retail",
    category: 'commercial_financier',
    price: 13000, priceMax: 39000,
    description: "Accord accordant Ã  un licenciÃ© le droit d'utiliser une marque commerciale pour ses activitÃ©s de retail.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 67,
    fieldsJson: F([
      { key: 'donneur_licence', label: "Donneur de licence", type: 'text', required: true },
      { key: 'licencie', label: "LicenciÃ©", type: 'text', required: true },
      { key: 'marque', label: "Marque concernÃ©e", type: 'text', required: true },
      { key: 'redevance_licence', label: "Redevance de licence (%)", type: 'text', required: true },
      { key: 'date_accord', label: "Date de l'accord", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE LICENCE DE MARQUE RETAIL</h1><p><strong>{{donneur_licence}}</strong> accorde Ã  <strong>{{licencie}}</strong> le droit d'utiliser la marque <strong>{{marque}}</strong>.</p><h2>Article 1 â€“ Droits accordÃ©s</h2><p>Le licenciÃ© est autorisÃ© Ã  utiliser la marque dans le cadre de ses activitÃ©s de retail, dans les limites gÃ©ographiques dÃ©finies en annexe.</p><h2>Article 2 â€“ Redevance</h2><p>Redevance : {{redevance_licence}}% du chiffre d'affaires net rÃ©alisÃ© sous la marque.</p><h2>Article 3 â€“ ContrÃ´le qualitÃ©</h2><p>Le donneur de licence se rÃ©serve le droit de contrÃ´ler la conformitÃ© des produits et services. SignÃ© le {{date_accord}}.</p></div>`
  },
  {
    code: 'ret_sous_location_commerciale',
    name: "Contrat de Sous-Location Commerciale",
    category: 'commercial_financier',
    price: 8000, priceMax: 24000,
    description: "Contrat de sous-location d'un local commercial dans un centre ou un magasin, avec accord du propriÃ©taire principal.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 61,
    fieldsJson: F([
      { key: 'sous_bailleur', label: "Sous-bailleur", type: 'text', required: true },
      { key: 'sous_locataire', label: "Sous-locataire", type: 'text', required: true },
      { key: 'local_sous_loue', label: "DÃ©signation du local", type: 'text', required: true },
      { key: 'loyer_sous_location', label: "Loyer mensuel (FCFA)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de dÃ©but", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SOUS-LOCATION COMMERCIALE</h1><p><strong>{{sous_bailleur}}</strong> sous-loue Ã  <strong>{{sous_locataire}}</strong> le local suivant : {{local_sous_loue}}.</p><h2>Article 1 â€“ Loyer</h2><p>Loyer mensuel : {{loyer_sous_location}} FCFA, payable d'avance.</p><h2>Article 2 â€“ Autorisation</h2><p>La sous-location est rÃ©alisÃ©e avec l'accord Ã©crit du propriÃ©taire principal, conformÃ©ment Ã  la rÃ©glementation applicable.</p><h2>Article 3 â€“ DurÃ©e</h2><p>DurÃ©e alignÃ©e sur le bail principal, Ã  compter du {{date_debut}}.</p></div>`
  },
  {
    code: 'ret_reglement_centre_commercial',
    name: "RÃ¨glement IntÃ©rieur Centre Commercial",
    category: 'commercial_financier',
    price: 7000, priceMax: 21000,
    description: "RÃ¨glement intÃ©rieur organisant les rÃ¨gles de fonctionnement, d'accÃ¨s et de cohabitation des commerÃ§ants au sein d'un centre commercial.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      { key: 'nom_centre', label: "Nom du centre commercial", type: 'text', required: true },
      { key: 'gestionnaire', label: "Gestionnaire du centre", type: 'text', required: true },
      { key: 'horaires_ouverture', label: "Horaires d'ouverture", type: 'text', required: true },
      { key: 'date_application', label: "Date d'application", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>RÃˆGLEMENT INTÃ‰RIEUR â€” {{nom_centre}}</h1><p>Gestionnaire : <strong>{{gestionnaire}}</strong> â€” En vigueur Ã  compter du {{date_application}}.</p><h2>Article 1 â€“ Horaires</h2><p>Le centre est ouvert aux clients aux horaires suivants : {{horaires_ouverture}}.</p><h2>Article 2 â€“ Comportement des commerÃ§ants</h2><p>Chaque commerÃ§ant doit maintenir son espace propre, respecter la signalÃ©tique commune et participer aux animations collectives.</p><h2>Article 3 â€“ SÃ©curitÃ©</h2><p>L'accÃ¨s aux zones de livraison et aux locaux techniques est rÃ©servÃ© aux personnes autorisÃ©es.</p></div>`
  },
  {
    code: 'ret_bail_commercial_369',
    name: "Contrat de Bail Commercial 3-6-9 Retail",
    category: 'commercial_financier',
    price: 10000, priceMax: 30000,
    description: "Contrat de bail commercial triÃ©nnal pour l'exploitation d'un local Ã  usage commercial (retail), adaptÃ© au droit local et OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 80,
    fieldsJson: F([
      { key: 'bailleur', label: "Bailleur", type: 'text', required: true },
      { key: 'preneur', label: "Preneur (locataire)", type: 'text', required: true },
      { key: 'adresse_local', label: "Adresse du local commercial", type: 'text', required: true },
      { key: 'loyer_annuel', label: "Loyer annuel (FCFA)", type: 'text', required: true },
      { key: 'date_entree', label: "Date d'entrÃ©e dans les lieux", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>BAIL COMMERCIAL 3-6-9 RETAIL</h1><p>Entre <strong>{{bailleur}}</strong> (Bailleur) et <strong>{{preneur}}</strong> (Preneur), pour le local sis {{adresse_local}}.</p><h2>Article 1 â€“ DurÃ©e</h2><p>Bail conclu pour une durÃ©e de 9 ans, divisÃ© en pÃ©riodes triennales, avec possibilitÃ© de rÃ©siliation Ã  chaque pÃ©riode de 3 ans.</p><h2>Article 2 â€“ Loyer</h2><p>Loyer annuel : {{loyer_annuel}} FCFA, rÃ©visable Ã  chaque renouvellement selon l'indice des prix.</p><h2>Article 3 â€“ Prise d'effet</h2><p>Date d'entrÃ©e dans les lieux : {{date_entree}}.</p></div>`
  },
  {
    code: 'ret_charges_communes',
    name: "Accord de Charges Communes Centre Commercial",
    category: 'commercial_financier',
    price: 6000, priceMax: 18000,
    description: "Accord dÃ©finissant la rÃ©partition et les modalitÃ©s de paiement des charges communes entre commerÃ§ants d'un centre commercial.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 56,
    fieldsJson: F([
      { key: 'centre_commercial', label: "Centre commercial", type: 'text', required: true },
      { key: 'gestionnaire', label: "Gestionnaire", type: 'text', required: true },
      { key: 'cle_repartition', label: "ClÃ© de rÃ©partition des charges", type: 'text', required: true },
      { key: 'provision_mensuelle', label: "Provision mensuelle (FCFA)", type: 'text', required: true },
      { key: 'date_accord', label: "Date de l'accord", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE CHARGES COMMUNES â€” {{centre_commercial}}</h1><p>Gestionnaire : <strong>{{gestionnaire}}</strong> â€” SignÃ© le {{date_accord}}.</p><h2>Article 1 â€“ RÃ©partition</h2><p>ClÃ© de rÃ©partition : {{cle_repartition}}.</p><h2>Article 2 â€“ Provision</h2><p>Chaque commerÃ§ant verse une provision mensuelle de {{provision_mensuelle}} FCFA, rÃ©gularisÃ©e annuellement sur la base des dÃ©penses rÃ©elles.</p><h2>Article 3 â€“ Gestion</h2><p>Le gestionnaire rend compte de l'utilisation des charges communes dans un rapport annuel communiquÃ© Ã  tous les commerÃ§ants.</p></div>`
  },
  {
    code: 'ret_animation_centre',
    name: "Contrat d'Animation Centre Commercial",
    category: 'commercial_financier',
    price: 7000, priceMax: 21000,
    description: "Contrat organisant les prestations d'animation commerciale (Ã©vÃ©nements, promotions, spectacles) au sein d'un centre commercial.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      { key: 'centre_commercial', label: "Centre commercial", type: 'text', required: true },
      { key: 'prestataire_animation', label: "Prestataire d'animation", type: 'text', required: true },
      { key: 'types_animations', label: "Types d'animations prÃ©vues", type: 'textarea', required: true },
      { key: 'budget_animation', label: "Budget animation (FCFA)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de dÃ©but", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>CONTRAT D'ANIMATION CENTRE COMMERCIAL</h1><p>Entre <strong>{{centre_commercial}}</strong> et <strong>{{prestataire_animation}}</strong>, Ã  compter du {{date_debut}}.</p><h2>Article 1 â€“ Animations</h2><p>{{types_animations}}</p><h2>Article 2 â€“ Budget</h2><p>Budget allouÃ© : {{budget_animation}} FCFA.</p><h2>Article 3 â€“ Obligations</h2><p>Le prestataire assure la logistique, la sÃ©curitÃ© et la conformitÃ© rÃ©glementaire de chaque Ã©vÃ©nement.</p></div>`
  },
  {
    code: 'ret_copropriete_commerciale',
    name: "RÃ¨glement de CopropriÃ©tÃ© Commerciale",
    category: 'commercial_financier',
    price: 9000, priceMax: 27000,
    description: "RÃ¨glement fixant les droits et obligations des copropriÃ©taires d'un immeuble Ã  usage commercial ou mixte.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 54,
    fieldsJson: F([
      { key: 'nom_copropriete', label: "Nom de la copropriÃ©tÃ©", type: 'text', required: true },
      { key: 'syndic', label: "Syndic de copropriÃ©tÃ©", type: 'text', required: true },
      { key: 'nombre_lots', label: "Nombre de lots", type: 'text', required: true },
      { key: 'date_reglement', label: "Date du rÃ¨glement", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>RÃˆGLEMENT DE COPROPRIÃ‰TÃ‰ COMMERCIALE</h1><p>CopropriÃ©tÃ© : <strong>{{nom_copropriete}}</strong> â€” Syndic : <strong>{{syndic}}</strong> â€” {{nombre_lots}} lots.</p><h2>Article 1 â€“ Parties communes</h2><p>Les parties communes sont la propriÃ©tÃ© indivise de tous les copropriÃ©taires au prorata de leurs tantiÃ¨mes.</p><h2>Article 2 â€“ Charges</h2><p>Chaque copropriÃ©taire participe aux charges communes proportionnellement Ã  ses tantiÃ¨mes.</p><h2>Article 3 â€“ AssemblÃ©e gÃ©nÃ©rale</h2><p>Une assemblÃ©e gÃ©nÃ©rale annuelle est tenue pour valider les comptes et voter le budget prÃ©visionnel. RÃ¨glement Ã©tabli le {{date_reglement}}.</p></div>`
  },
  {
    code: 'ret_prestataire_service',
    name: "Contrat de Prestataire de Service Retail",
    category: 'commercial_financier',
    price: 6000, priceMax: 18000,
    description: "Contrat encadrant les prestations de services (logistique, RH, IT, marketing) fournies Ã  une enseigne retail.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      { key: 'enseigne_cliente', label: "Enseigne cliente", type: 'text', required: true },
      { key: 'prestataire', label: "Prestataire de service", type: 'text', required: true },
      { key: 'nature_service', label: "Nature du service", type: 'textarea', required: true },
      { key: 'tarif_service', label: "Tarif mensuel (FCFA)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de dÃ©but", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>CONTRAT DE PRESTATAIRE DE SERVICE RETAIL</h1><p>Entre <strong>{{enseigne_cliente}}</strong> et <strong>{{prestataire}}</strong>, Ã  compter du {{date_debut}}.</p><h2>Article 1 â€“ Service</h2><p>{{nature_service}}</p><h2>Article 2 â€“ Tarification</h2><p>Tarif mensuel : {{tarif_service}} FCFA, facturÃ© le dernier jour ouvrÃ© du mois.</p><h2>Article 3 â€“ Niveau de service</h2><p>Un SLA est annexÃ© au prÃ©sent contrat et dÃ©finit les indicateurs de performance attendus.</p></div>`
  },
  {
    code: 'ret_maintenance_caisse',
    name: "Contrat de Maintenance SystÃ¨me de Caisse",
    category: 'commercial_financier',
    price: 5500, priceMax: 16000,
    description: "Contrat de maintenance prÃ©ventive et corrective des systÃ¨mes de caisse enregistreuse et logiciels de point de vente.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      { key: 'client_retail', label: "Client retail", type: 'text', required: true },
      { key: 'prestataire_maintenance', label: "Prestataire maintenance", type: 'text', required: true },
      { key: 'systeme_caisse', label: "SystÃ¨me de caisse concernÃ©", type: 'text', required: true },
      { key: 'tarif_maintenance', label: "Tarif de maintenance annuel (FCFA)", type: 'text', required: true },
      { key: 'date_contrat', label: "Date du contrat", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>CONTRAT DE MAINTENANCE SYSTÃˆME DE CAISSE</h1><p>Entre <strong>{{client_retail}}</strong> et <strong>{{prestataire_maintenance}}</strong>.</p><h2>Article 1 â€“ PÃ©rimÃ¨tre</h2><p>SystÃ¨me concernÃ© : {{systeme_caisse}}.</p><h2>Article 2 â€“ Prestations</h2><p>Maintenance prÃ©ventive trimestrielle, hotline tÃ©lÃ©phonique 6j/7, intervention sur site sous 24h en cas de panne critique.</p><h2>Article 3 â€“ Tarif</h2><p>Tarif annuel : {{tarif_maintenance}} FCFA. SignÃ© le {{date_contrat}}.</p></div>`
  },
  {
    code: 'ret_securite_magasin',
    name: "Contrat de SÃ©curitÃ© Magasin",
    category: 'commercial_financier',
    price: 6000, priceMax: 18000,
    description: "Contrat organisant les prestations de gardiennage et de sÃ©curitÃ© d'un magasin retail par une sociÃ©tÃ© de sÃ©curitÃ© agrÃ©Ã©e.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      { key: 'magasin', label: "Magasin Ã  sÃ©curiser", type: 'text', required: true },
      { key: 'societe_securite', label: "SociÃ©tÃ© de sÃ©curitÃ©", type: 'text', required: true },
      { key: 'nombre_agents', label: "Nombre d'agents", type: 'text', required: true },
      { key: 'horaires_surveillance', label: "Horaires de surveillance", type: 'text', required: true },
      { key: 'date_debut', label: "Date de dÃ©but", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SÃ‰CURITÃ‰ MAGASIN</h1><p>Entre <strong>{{magasin}}</strong> et <strong>{{societe_securite}}</strong>, Ã  compter du {{date_debut}}.</p><h2>Article 1 â€“ Dispositif</h2><p>{{nombre_agents}} agent(s) de sÃ©curitÃ© assurent la surveillance aux horaires suivants : {{horaires_surveillance}}.</p><h2>Article 2 â€“ Missions</h2><p>ContrÃ´le des accÃ¨s, prÃ©vention des vols, gestion des incidents, assistance Ã  l'Ã©vacuation en cas d'urgence.</p><h2>Article 3 â€“ AgrÃ©ment</h2><p>La sociÃ©tÃ© de sÃ©curitÃ© atteste disposer de tous les agrÃ©ments lÃ©gaux requis pour exercer son activitÃ©.</p></div>`
  },
  {
    code: 'ret_nettoyage_magasin',
    name: "Contrat de Nettoyage Magasin",
    category: 'commercial_financier',
    price: 4500, priceMax: 13000,
    description: "Contrat de nettoyage et d'entretien quotidien d'un point de vente retail par une sociÃ©tÃ© de nettoyage professionnelle.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 57,
    fieldsJson: F([
      { key: 'magasin', label: "Magasin", type: 'text', required: true },
      { key: 'societe_nettoyage', label: "SociÃ©tÃ© de nettoyage", type: 'text', required: true },
      { key: 'frequence_nettoyage', label: "FrÃ©quence de nettoyage", type: 'text', required: true },
      { key: 'tarif_mensuel', label: "Tarif mensuel (FCFA)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de dÃ©but", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>CONTRAT DE NETTOYAGE MAGASIN</h1><p>Entre <strong>{{magasin}}</strong> et <strong>{{societe_nettoyage}}</strong>, Ã  compter du {{date_debut}}.</p><h2>Article 1 â€“ FrÃ©quence</h2><p>{{frequence_nettoyage}}</p><h2>Article 2 â€“ Prestations</h2><p>Nettoyage des sols, surfaces, vitrines, sanitaires et espaces de stockage selon les normes d'hygiÃ¨ne en vigueur.</p><h2>Article 3 â€“ Tarif</h2><p>Tarif mensuel : {{tarif_mensuel}} FCFA, fournitures incluses.</p></div>`
  },
  {
    code: 'ret_service_client',
    name: "Accord de Service Client Retail",
    category: 'commercial_financier',
    price: 5000, priceMax: 15000,
    description: "Accord dÃ©finissant les standards de service client, les dÃ©lais de traitement des rÃ©clamations et les engagements qualitÃ© d'une enseigne retail.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 71,
    fieldsJson: F([
      { key: 'enseigne', label: "Enseigne retail", type: 'text', required: true },
      { key: 'responsable_service_client', label: "Responsable service client", type: 'text', required: true },
      { key: 'delai_traitement', label: "DÃ©lai de traitement des rÃ©clamations (jours)", type: 'text', required: true },
      { key: 'date_accord', label: "Date de l'accord", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE CLIENT RETAIL</h1><p>Enseigne : <strong>{{enseigne}}</strong> â€” Responsable : <strong>{{responsable_service_client}}</strong>.</p><h2>Article 1 â€“ Engagements</h2><p>Toute rÃ©clamation client est traitÃ©e dans un dÃ©lai maximum de {{delai_traitement}} jours ouvrÃ©s.</p><h2>Article 2 â€“ Canaux</h2><p>RÃ©clamations acceptÃ©es en magasin, par tÃ©lÃ©phone, par e-mail et via l'application mobile de l'enseigne.</p><h2>Article 3 â€“ Satisfaction</h2><p>Un suivi de la satisfaction client est rÃ©alisÃ© trimestriellement et les rÃ©sultats partagÃ©s avec la direction. SignÃ© le {{date_accord}}.</p></div>`
  },
  {
    code: 'ret_charte_deontologie',
    name: "Charte de DÃ©ontologie Commerciale",
    category: 'commercial_financier',
    price: 4000, priceMax: 12000,
    description: "Charte Ã©nonÃ§ant les rÃ¨gles Ã©thiques et dÃ©ontologiques applicables aux Ã©quipes commerciales d'une enseigne retail.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      { key: 'enseigne', label: "Enseigne", type: 'text', required: true },
      { key: 'directeur_general', label: "Directeur gÃ©nÃ©ral", type: 'text', required: true },
      { key: 'date_adoption', label: "Date d'adoption", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>CHARTE DE DÃ‰ONTOLOGIE COMMERCIALE</h1><p><strong>{{enseigne}}</strong> â€” AdoptÃ©e le {{date_adoption}} par {{directeur_general}}.</p><h2>1. HonnÃªtetÃ©</h2><p>Tout collaborateur s'engage Ã  faire preuve d'honnÃªtetÃ© dans ses relations avec les clients, les fournisseurs et ses collÃ¨gues.</p><h2>2. ConfidentialitÃ©</h2><p>Les informations commerciales sensibles sont strictement confidentielles et ne peuvent Ãªtre divulguÃ©es Ã  des tiers.</p><h2>3. Non-discrimination</h2><p>Aucune discrimination fondÃ©e sur l'origine, le genre, la religion ou tout autre critÃ¨re n'est tolÃ©rÃ©e dans l'exercice des activitÃ©s commerciales.</p></div>`
  },
  {
    code: 'ret_politique_retour',
    name: "Politique de Retour Produit en Magasin",
    category: 'commercial_financier',
    price: 3500, priceMax: 10000,
    description: "Document officialisant la politique de retour et d'Ã©change de produits dans les magasins d'une enseigne retail.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 75,
    fieldsJson: F([
      { key: 'enseigne', label: "Enseigne retail", type: 'text', required: true },
      { key: 'delai_retour', label: "DÃ©lai de retour acceptÃ© (jours)", type: 'text', required: true },
      { key: 'conditions_retour', label: "Conditions de retour", type: 'textarea', required: true },
      { key: 'date_application', label: "Date d'application", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>POLITIQUE DE RETOUR PRODUIT EN MAGASIN</h1><p>Enseigne : <strong>{{enseigne}}</strong> â€” En vigueur Ã  compter du {{date_application}}.</p><h2>DÃ©lai de retour</h2><p>{{delai_retour}} jours Ã  compter de la date d'achat.</p><h2>Conditions</h2><p>{{conditions_retour}}</p><h2>Remboursement</h2><p>Les remboursements sont effectuÃ©s selon le mode de paiement initial, dans un dÃ©lai de 7 jours ouvrÃ©s.</p></div>`
  },
  {
    code: 'ret_programme_fidelite',
    name: "RÃ¨glement de Programme FidÃ©litÃ©",
    category: 'commercial_financier',
    price: 5000, priceMax: 15000,
    description: "RÃ¨glement officiel du programme de fidÃ©litÃ© d'une enseigne retail, dÃ©finissant les modalitÃ©s d'adhÃ©sion, d'accumulation et d'utilisation des points.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 77,
    fieldsJson: F([
      { key: 'enseigne', label: "Enseigne", type: 'text', required: true },
      { key: 'nom_programme', label: "Nom du programme", type: 'text', required: true },
      { key: 'taux_accumulation', label: "Taux d'accumulation (points/FCFA)", type: 'text', required: true },
      { key: 'date_lancement', label: "Date de lancement", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>RÃˆGLEMENT DU PROGRAMME FIDÃ‰LITÃ‰ â€” {{nom_programme}}</h1><p>Enseigne : <strong>{{enseigne}}</strong> â€” LancÃ© le {{date_lancement}}.</p><h2>Article 1 â€“ AdhÃ©sion</h2><p>Tout client majeur peut adhÃ©rer gratuitement au programme en magasin ou via l'application mobile.</p><h2>Article 2 â€“ Accumulation</h2><p>{{taux_accumulation}} point(s) par FCFA dÃ©pensÃ© sur les achats Ã©ligibles.</p><h2>Article 3 â€“ Utilisation</h2><p>Les points accumulÃ©s sont convertibles en bons d'achat selon le barÃ¨me en vigueur, sans date d'expiration la premiÃ¨re annÃ©e.</p></div>`
  },
  {
    code: 'ret_collecte_donnees',
    name: "Accord de Collecte de DonnÃ©es Clients",
    category: 'commercial_financier',
    price: 6000, priceMax: 18000,
    description: "Accord encadrant la collecte, le traitement et la protection des donnÃ©es personnelles des clients d'une enseigne retail.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 69,
    fieldsJson: F([
      { key: 'enseigne', label: "Enseigne (responsable traitement)", type: 'text', required: true },
      { key: 'dpo', label: "DÃ©lÃ©guÃ© Ã  la Protection des DonnÃ©es", type: 'text', required: true },
      { key: 'finalites_collecte', label: "FinalitÃ©s de la collecte", type: 'textarea', required: true },
      { key: 'duree_conservation', label: "DurÃ©e de conservation (ans)", type: 'text', required: true },
      { key: 'date_accord', label: "Date de l'accord", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE COLLECTE DE DONNÃ‰ES CLIENTS</h1><p>Responsable du traitement : <strong>{{enseigne}}</strong> â€” DPO : <strong>{{dpo}}</strong>.</p><h2>Article 1 â€“ FinalitÃ©s</h2><p>{{finalites_collecte}}</p><h2>Article 2 â€“ Conservation</h2><p>Les donnÃ©es sont conservÃ©es {{duree_conservation}} an(s) aprÃ¨s la derniÃ¨re interaction client.</p><h2>Article 3 â€“ Droits</h2><p>Tout client dispose d'un droit d'accÃ¨s, de rectification et d'effacement de ses donnÃ©es personnelles sur simple demande. Accord datÃ© du {{date_accord}}.</p></div>`
  },
  {
    code: 'ret_carte_fidelite',
    name: "Contrat Carte de FidÃ©litÃ©",
    category: 'commercial_financier',
    price: 4500, priceMax: 13000,
    description: "Contrat liant l'enseigne et le titulaire d'une carte de fidÃ©litÃ©, prÃ©cisant les avantages, les conditions et les limites d'utilisation.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 73,
    fieldsJson: F([
      { key: 'enseigne', label: "Enseigne Ã©mettrice", type: 'text', required: true },
      { key: 'nom_titulaire', label: "Nom du titulaire", type: 'text', required: true },
      { key: 'numero_carte', label: "NumÃ©ro de carte", type: 'text', required: true },
      { key: 'avantages_carte', label: "Avantages de la carte", type: 'textarea', required: true },
      { key: 'date_adhesion', label: "Date d'adhÃ©sion", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>CONTRAT CARTE DE FIDÃ‰LITÃ‰</h1><p>Enseigne : <strong>{{enseigne}}</strong> â€” Titulaire : <strong>{{nom_titulaire}}</strong> â€” Carte NÂ° {{numero_carte}}.</p><h2>Article 1 â€“ Avantages</h2><p>{{avantages_carte}}</p><h2>Article 2 â€“ Utilisation</h2><p>La carte est strictement personnelle et non cessible. Elle est prÃ©sentÃ©e Ã  chaque achat pour bÃ©nÃ©ficier des avantages associÃ©s.</p><h2>Article 3 â€“ RÃ©siliation</h2><p>Toute partie peut rÃ©silier ce contrat avec un prÃ©avis de 30 jours. AdhÃ©sion effective le {{date_adhesion}}.</p></div>`
  },
  {
    code: 'ret_cgu_application',
    name: "Conditions d'Utilisation Application Retail",
    category: 'commercial_financier',
    price: 5500, priceMax: 16000,
    description: "Conditions gÃ©nÃ©rales d'utilisation de l'application mobile d'une enseigne retail, incluant les rÃ¨gles de confidentialitÃ© et de sÃ©curitÃ©.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      { key: 'enseigne', label: "Enseigne Ã©ditrice", type: 'text', required: true },
      { key: 'nom_application', label: "Nom de l'application", type: 'text', required: true },
      { key: 'version_cgu', label: "Version des CGU", type: 'text', required: true },
      { key: 'date_entree_vigueur', label: "Date d'entrÃ©e en vigueur", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>CONDITIONS D'UTILISATION â€” {{nom_application}}</h1><p>Ã‰diteur : <strong>{{enseigne}}</strong> â€” Version {{version_cgu}} â€” En vigueur le {{date_entree_vigueur}}.</p><h2>Article 1 â€“ AccÃ¨s</h2><p>L'application est accessible gratuitement sur iOS et Android. Son utilisation implique l'acceptation des prÃ©sentes CGU.</p><h2>Article 2 â€“ Compte utilisateur</h2><p>Chaque utilisateur est responsable de la confidentialitÃ© de ses identifiants de connexion.</p><h2>Article 3 â€“ DonnÃ©es personnelles</h2><p>Les donnÃ©es collectÃ©es sont traitÃ©es conformÃ©ment Ã  la politique de confidentialitÃ© disponible dans l'application.</p></div>`
  },
  {
    code: 'ret_vente_correspondance',
    name: "Contrat de Vente par Correspondance",
    category: 'commercial_financier',
    price: 6000, priceMax: 18000,
    description: "Contrat encadrant les ventes Ã  distance rÃ©alisÃ©es par correspondance (catalogue, tÃ©lÃ©phone, internet) par une enseigne retail.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      { key: 'enseigne_vad', label: "Enseigne VAD", type: 'text', required: true },
      { key: 'client', label: "Client", type: 'text', required: true },
      { key: 'produit_commande', label: "Produit commandÃ©", type: 'textarea', required: true },
      { key: 'montant_commande', label: "Montant total (FCFA)", type: 'text', required: true },
      { key: 'date_commande', label: "Date de la commande", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>CONTRAT DE VENTE PAR CORRESPONDANCE</h1><p>Entre <strong>{{enseigne_vad}}</strong> et <strong>{{client}}</strong>, commande du {{date_commande}}.</p><h2>Article 1 â€“ Commande</h2><p>{{produit_commande}}</p><h2>Article 2 â€“ Prix</h2><p>Montant total : {{montant_commande}} FCFA, frais de livraison inclus.</p><h2>Article 3 â€“ RÃ©tractation</h2><p>Le client dispose d'un droit de rÃ©tractation de 14 jours Ã  compter de la rÃ©ception du colis, sans pÃ©nalitÃ©.</p></div>`
  },
  {
    code: 'ret_click_and_collect',
    name: "Accord de Click-and-Collect",
    category: 'commercial_financier',
    price: 5000, priceMax: 15000,
    description: "Accord dÃ©finissant les modalitÃ©s du service click-and-collect d'une enseigne retail (commande en ligne, retrait en magasin).",
    templateType: 'pdf', classe: 'B', active: true, popularity: 74,
    fieldsJson: F([
      { key: 'enseigne', label: "Enseigne", type: 'text', required: true },
      { key: 'points_retrait', label: "Points de retrait disponibles", type: 'textarea', required: true },
      { key: 'delai_preparation', label: "DÃ©lai de prÃ©paration (heures)", type: 'text', required: true },
      { key: 'duree_reservation', label: "DurÃ©e de rÃ©servation en magasin (jours)", type: 'text', required: true },
      { key: 'date_lancement', label: "Date de lancement", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE CLICK-AND-COLLECT</h1><p>Enseigne : <strong>{{enseigne}}</strong> â€” Service lancÃ© le {{date_lancement}}.</p><h2>Article 1 â€“ Points de retrait</h2><p>{{points_retrait}}</p><h2>Article 2 â€“ DÃ©lais</h2><p>PrÃ©paration de la commande : {{delai_preparation}} heure(s). DurÃ©e de rÃ©servation en magasin : {{duree_reservation}} jour(s).</p><h2>Article 3 â€“ Annulation</h2><p>Toute commande non retirÃ©e dans le dÃ©lai imparti est automatiquement annulÃ©e et remboursÃ©e intÃ©gralement.</p></div>`
  },
  {
    code: 'ret_performance_pdv',
    name: "Rapport de Performance Point de Vente",
    category: 'commercial_financier',
    price: 4000, priceMax: 12000,
    description: "Rapport d'Ã©valuation pÃ©riodique des indicateurs clÃ©s de performance d'un point de vente retail.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 76,
    fieldsJson: F([
      { key: 'enseigne', label: "Enseigne", type: 'text', required: true },
      { key: 'nom_magasin', label: "Nom du magasin", type: 'text', required: true },
      { key: 'periode_rapport', label: "PÃ©riode du rapport", type: 'text', required: true },
      { key: 'ca_realise', label: "CA rÃ©alisÃ© (FCFA)", type: 'text', required: true },
      { key: 'taux_conversion', label: "Taux de conversion (%)", type: 'text', required: true },
      { key: 'date_rapport', label: "Date du rapport", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE POINT DE VENTE</h1><p>Enseigne : <strong>{{enseigne}}</strong> â€” Magasin : <strong>{{nom_magasin}}</strong> â€” PÃ©riode : {{periode_rapport}}.</p><h2>1. Chiffre d'affaires</h2><p>CA rÃ©alisÃ© : {{ca_realise}} FCFA</p><h2>2. Taux de conversion</h2><p>{{taux_conversion}}% des visiteurs ont effectuÃ© un achat.</p><h2>3. Analyse et recommandations</h2><p>SynthÃ¨se des performances et actions correctives proposÃ©es pour la prochaine pÃ©riode.</p><p><em>Rapport Ã©tabli le {{date_rapport}}.</em></p></div>`
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
  console.log(`Batch 22a OK â€” crÃ©Ã©s:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
