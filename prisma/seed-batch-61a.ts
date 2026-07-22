import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ─── GRANDE DISTRIBUTION / RETAIL (ret_) ───────────────────────────────────
  {
    code: 'ret_ref_fourn',
    name: "Contrat de référencement fournisseur grande distribution",
    category: 'commercial_financier',
    price: 8000, priceMax: 24000,
    description: "Contrat formalisant le référencement d'un fournisseur auprès d'une enseigne de grande distribution en Côte d'Ivoire, conditions d'accès et obligations réciproques.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 78,
    fieldsJson: F([
      {key:'nom_fournisseur', label:"Raison sociale fournisseur", type:'text', required:true},
      {key:'nom_distributeur', label:"Enseigne distributeur", type:'text', required:true},
      {key:'produits_references', label:"Produits référencés", type:'textarea', required:true},
      {key:'date_debut', label:"Date de début", type:'date', required:true},
      {key:'duree_contrat', label:"Durée du contrat (ex: 12 mois)", type:'text', required:true},
      {key:'conditions_paiement', label:"Conditions de paiement", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE RÉFÉRENCEMENT FOURNISSEUR</h1><h2>Grande Distribution – OHADA</h2><p>Entre <strong>{{nom_distributeur}}</strong> (le Distributeur) et <strong>{{nom_fournisseur}}</strong> (le Fournisseur),</p><p>Il est convenu ce qui suit :</p><h3>Article 1 – Objet</h3><p>Le présent contrat a pour objet le référencement des produits suivants : {{produits_references}}</p><h3>Article 2 – Durée</h3><p>Le contrat prend effet le {{date_debut}} pour une durée de {{duree_contrat}}.</p><h3>Article 3 – Conditions de paiement</h3><p>{{conditions_paiement}}</p><h3>Article 4 – Droit applicable</h3><p>Le présent contrat est soumis au droit OHADA et aux lois en vigueur en Côte d'Ivoire.</p></div>`
  },
  {
    code: 'ret_cga_supermarche',
    name: "Accord de conditions générales d'achat supermarché",
    category: 'commercial_financier',
    price: 7000, priceMax: 20000,
    description: "Accord définissant les conditions générales d'achat d'un supermarché ivoirien envers ses fournisseurs, prix, délais, qualité et pénalités.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'nom_supermarche', label:"Nom du supermarché", type:'text', required:true},
      {key:'nom_fournisseur', label:"Nom du fournisseur", type:'text', required:true},
      {key:'categorie_produits', label:"Catégorie de produits", type:'text', required:true},
      {key:'delai_livraison', label:"Délai de livraison standard", type:'text', required:true},
      {key:'date_signature', label:"Date de signature", type:'date', required:true}
    ]),
    body: `<div class="doc"><h1>CONDITIONS GÉNÉRALES D'ACHAT</h1><h2>Supermarché – Côte d'Ivoire</h2><p>Le présent accord est conclu entre <strong>{{nom_supermarche}}</strong> et <strong>{{nom_fournisseur}}</strong>.</p><h3>Article 1 – Champ d'application</h3><p>Ces conditions s'appliquent à toute commande de produits de la catégorie : {{categorie_produits}}.</p><h3>Article 2 – Livraisons</h3><p>Le délai de livraison standard est de {{delai_livraison}}. Tout retard entraîne des pénalités conformément aux usages OHADA.</p><h3>Article 3 – Qualité</h3><p>Les produits doivent être conformes aux normes ivoiriennes en vigueur.</p><p>Signé le {{date_signature}}.</p></div>`
  },
  {
    code: 'ret_tete_gondole',
    name: "Accord de tête de gondole (emplacement privilégié)",
    category: 'commercial_financier',
    price: 5000, priceMax: 15000,
    description: "Accord commercial relatif à l'attribution d'un emplacement tête de gondole à un fournisseur en supermarché ivoirien, durée et contrepartie financière.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'nom_fournisseur', label:"Fournisseur bénéficiaire", type:'text', required:true},
      {key:'nom_magasin', label:"Nom et adresse du magasin", type:'text', required:true},
      {key:'emplacement', label:"Description de l'emplacement", type:'text', required:true},
      {key:'duree', label:"Durée de l'accord", type:'text', required:true},
      {key:'contrepartie', label:"Contrepartie financière (FCFA)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE TÊTE DE GONDOLE</h1><p>Entre <strong>{{nom_magasin}}</strong> et le fournisseur <strong>{{nom_fournisseur}}</strong>,</p><h3>Article 1 – Emplacement</h3><p>Le distributeur réserve l'emplacement suivant : {{emplacement}}.</p><h3>Article 2 – Durée</h3><p>Cet accord est valable pour : {{duree}}.</p><h3>Article 3 – Contrepartie</h3><p>Le fournisseur verse la somme de {{contrepartie}} FCFA en contrepartie de cet emplacement privilégié.</p><h3>Article 4 – Résiliation</h3><p>Tout manquement aux obligations entraîne la résiliation immédiate sans indemnité.</p></div>`
  },
  {
    code: 'ret_promo_animation',
    name: "Accord de promotions et animations commerciales",
    category: 'commercial_financier',
    price: 4500, priceMax: 13000,
    description: "Accord encadrant les opérations promotionnelles et animations en magasin entre un fournisseur et un distributeur en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'nom_fournisseur', label:"Fournisseur", type:'text', required:true},
      {key:'nom_distributeur', label:"Distributeur", type:'text', required:true},
      {key:'type_animation', label:"Type d'animation (dégustation, démonstration…)", type:'text', required:true},
      {key:'date_debut', label:"Date de début de l'opération", type:'date', required:true},
      {key:'date_fin', label:"Date de fin de l'opération", type:'date', required:true},
      {key:'budget_promo', label:"Budget promotionnel (FCFA)", type:'text', required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PROMOTIONS ET ANIMATIONS COMMERCIALES</h1><p><strong>{{nom_fournisseur}}</strong> et <strong>{{nom_distributeur}}</strong> conviennent des termes suivants :</p><h3>Article 1 – Nature de l'animation</h3><p>Type d'animation : {{type_animation}}.</p><h3>Article 2 – Période</h3><p>Du {{date_debut}} au {{date_fin}}.</p><h3>Article 3 – Budget</h3><p>Budget alloué : {{budget_promo}} FCFA.</p><h3>Article 4 – Obligations</h3><p>Le fournisseur met à disposition le personnel et les supports nécessaires. Le distributeur garantit l'espace convenu.</p></div>`
  },
  {
    code: 'ret_mdd',
    name: "Accord de marque distributeur (MDD)",
    category: 'commercial_financier',
    price: 9000, priceMax: 27000,
    description: "Accord de fabrication et commercialisation de produits sous marque distributeur (MDD) entre un industriel et une enseigne de grande distribution en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 74,
    fieldsJson: F([
      {key:'nom_fabricant', label:"Nom du fabricant / industriel", type:'text', required:true},
      {key:'nom_enseigne', label:"Nom de l'enseigne distributeur", type:'text', required:true},
      {key:'produit_mdd', label:"Produit(s) en marque distributeur", type:'textarea', required:true},
      {key:'volume_annuel', label:"Volume annuel estimé", type:'text', required:true},
      {key:'date_debut', label:"Date de début", type:'date', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE MARQUE DISTRIBUTEUR (MDD)</h1><p>Conclu entre <strong>{{nom_fabricant}}</strong> (Fabricant) et <strong>{{nom_enseigne}}</strong> (Distributeur).</p><h3>Article 1 – Objet</h3><p>Le Fabricant produit sous la marque du Distributeur les produits suivants : {{produit_mdd}}.</p><h3>Article 2 – Volume</h3><p>Volume annuel estimé : {{volume_annuel}}.</p><h3>Article 3 – Propriété de la marque</h3><p>La marque, le packaging et les recettes restent la propriété exclusive du Distributeur.</p><h3>Article 4 – Confidentialité</h3><p>Le Fabricant s'engage à une confidentialité totale sur les formulations et volumes produits.</p><p>En vigueur à partir du {{date_debut}}.</p></div>`
  },
  {
    code: 'ret_merchandising',
    name: "Accord de service de merchandising linéaire",
    category: 'commercial_financier',
    price: 4000, priceMax: 12000,
    description: "Accord de prestation de services de merchandising et d'optimisation des linéaires pour une enseigne de grande distribution en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'prestataire', label:"Prestataire merchandising", type:'text', required:true},
      {key:'client_enseigne', label:"Enseigne cliente", type:'text', required:true},
      {key:'perimetre_magasins', label:"Périmètre de magasins concernés", type:'textarea', required:true},
      {key:'frequence_visite', label:"Fréquence des visites", type:'text', required:true},
      {key:'tarif_mensuel', label:"Tarif mensuel (FCFA)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MERCHANDISING LINÉAIRE</h1><p>Entre <strong>{{client_enseigne}}</strong> et le prestataire <strong>{{prestataire}}</strong>.</p><h3>Article 1 – Périmètre</h3><p>Magasins concernés : {{perimetre_magasins}}.</p><h3>Article 2 – Missions</h3><p>Le prestataire assure la mise en rayon, le facing, la rotation des produits et l'implantation selon le planogramme validé.</p><h3>Article 3 – Fréquence</h3><p>Fréquence des visites : {{frequence_visite}}.</p><h3>Article 4 – Rémunération</h3><p>Tarif mensuel : {{tarif_mensuel}} FCFA HT.</p></div>`
  },
  {
    code: 'ret_category_mgmt',
    name: "Accord de service de gestion de catégorie (category management)",
    category: 'commercial_financier',
    price: 7500, priceMax: 22000,
    description: "Accord de gestion de catégorie confiant à un fournisseur chef de file la co-gestion d'un rayon en supermarché ivoirien.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 58,
    fieldsJson: F([
      {key:'fournisseur_chef_file', label:"Fournisseur chef de file", type:'text', required:true},
      {key:'distributeur', label:"Distributeur partenaire", type:'text', required:true},
      {key:'categorie_geree', label:"Catégorie gérée", type:'text', required:true},
      {key:'objectif_ca', label:"Objectif CA catégorie (FCFA)", type:'text', required:true},
      {key:'duree', label:"Durée de l'accord", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE GESTION DE CATÉGORIE</h1><p>Entre <strong>{{distributeur}}</strong> et le fournisseur chef de file <strong>{{fournisseur_chef_file}}</strong>.</p><h3>Article 1 – Catégorie</h3><p>La catégorie gérée est : {{categorie_geree}}.</p><h3>Article 2 – Rôle du chef de file</h3><p>Il assure l'analyse des ventes, la recommandation d'assortiment, la planification promotionnelle et le suivi des performances.</p><h3>Article 3 – Objectifs</h3><p>CA catégorie cible : {{objectif_ca}} FCFA.</p><h3>Article 4 – Durée</h3><p>{{duree}}. Renouvelable par accord exprès des parties.</p></div>`
  },
  {
    code: 'ret_centrale_achat',
    name: "Accord de service de centrale d'achat régionale",
    category: 'commercial_financier',
    price: 8000, priceMax: 24000,
    description: "Accord définissant les services rendus par une centrale d'achat régionale aux enseignes membres en Afrique de l'Ouest (OHADA).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 63,
    fieldsJson: F([
      {key:'nom_centrale', label:"Nom de la centrale d'achat", type:'text', required:true},
      {key:'enseigne_membre', label:"Enseigne membre", type:'text', required:true},
      {key:'services_rendus', label:"Services rendus", type:'textarea', required:true},
      {key:'commission_centrale', label:"Commission centrale (%)", type:'text', required:true},
      {key:'date_adhesion', label:"Date d'adhésion", type:'date', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CENTRALE D'ACHAT RÉGIONALE</h1><p>Entre la centrale <strong>{{nom_centrale}}</strong> et l'enseigne membre <strong>{{enseigne_membre}}</strong>.</p><h3>Article 1 – Services</h3><p>{{services_rendus}}</p><h3>Article 2 – Rémunération</h3><p>Commission : {{commission_centrale}}% sur achats négociés.</p><h3>Article 3 – Adhésion</h3><p>Effective au {{date_adhesion}}.</p><h3>Article 4 – Droit applicable</h3><p>Droit OHADA – Acte Uniforme relatif au droit commercial général.</p></div>`
  },
  {
    code: 'ret_logistique_entrepot',
    name: "Accord de service de logistique entrepôt grande distribution",
    category: 'commercial_financier',
    price: 6000, priceMax: 18000,
    description: "Accord de prestation logistique pour la gestion d'un entrepôt de distribution au profit d'une enseigne de grande distribution en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'prestataire_logistique', label:"Prestataire logistique", type:'text', required:true},
      {key:'enseigne_cliente', label:"Enseigne cliente", type:'text', required:true},
      {key:'adresse_entrepot', label:"Adresse de l'entrepôt", type:'text', required:true},
      {key:'surface_m2', label:"Surface de stockage (m²)", type:'text', required:true},
      {key:'tarif_mensuel', label:"Tarif mensuel (FCFA)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE LOGISTIQUE ENTREPÔT</h1><p>Entre <strong>{{enseigne_cliente}}</strong> et le prestataire <strong>{{prestataire_logistique}}</strong>.</p><h3>Article 1 – Entrepôt</h3><p>Adresse : {{adresse_entrepot}}. Surface : {{surface_m2}} m².</p><h3>Article 2 – Missions</h3><p>Réception, stockage, préparation de commandes, gestion des flux entrants/sortants.</p><h3>Article 3 – Rémunération</h3><p>Tarif mensuel : {{tarif_mensuel}} FCFA HT.</p><h3>Article 4 – Responsabilités</h3><p>Le prestataire est responsable des marchandises sous garde, sauf cas de force majeure.</p></div>`
  },
  {
    code: 'ret_transport_gms',
    name: "Accord de service de transport livraison GMS",
    category: 'commercial_financier',
    price: 5000, priceMax: 15000,
    description: "Accord de transport et livraison de marchandises entre entrepôt et points de vente GMS (Grandes et Moyennes Surfaces) en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 64,
    fieldsJson: F([
      {key:'transporteur', label:"Nom du transporteur", type:'text', required:true},
      {key:'donneur_ordre', label:"Donneur d'ordre", type:'text', required:true},
      {key:'zones_livraison', label:"Zones de livraison", type:'textarea', required:true},
      {key:'tarif_km', label:"Tarif au km (FCFA)", type:'text', required:true},
      {key:'delai_livraison', label:"Délai de livraison contractuel", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TRANSPORT LIVRAISON GMS</h1><p>Entre <strong>{{donneur_ordre}}</strong> et le transporteur <strong>{{transporteur}}</strong>.</p><h3>Article 1 – Zones de livraison</h3><p>{{zones_livraison}}</p><h3>Article 2 – Tarification</h3><p>Tarif : {{tarif_km}} FCFA/km.</p><h3>Article 3 – Délais</h3><p>Délai contractuel : {{delai_livraison}}. Tout retard engage la responsabilité du transporteur.</p><h3>Article 4 – Assurance</h3><p>Le transporteur est couvert par une assurance marchandises transportées en règle.</p></div>`
  },
  {
    code: 'ret_invendus',
    name: "Accord de service de gestion des invendus",
    category: 'commercial_financier',
    price: 3500, priceMax: 10000,
    description: "Accord encadrant la gestion des invendus entre un distributeur et un prestataire (retour fournisseur, destruction, don alimentaire) en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'distributeur', label:"Distributeur", type:'text', required:true},
      {key:'prestataire', label:"Prestataire de gestion des invendus", type:'text', required:true},
      {key:'mode_traitement', label:"Mode de traitement (retour/destruction/don)", type:'text', required:true},
      {key:'frequence', label:"Fréquence de collecte", type:'text', required:true},
      {key:'date_debut', label:"Date de début", type:'date', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GESTION DES INVENDUS</h1><p>Entre <strong>{{distributeur}}</strong> et <strong>{{prestataire}}</strong>.</p><h3>Article 1 – Objet</h3><p>Gestion des produits invendus par le mode suivant : {{mode_traitement}}.</p><h3>Article 2 – Fréquence</h3><p>Collecte : {{frequence}}.</p><h3>Article 3 – Traçabilité</h3><p>Chaque opération fait l'objet d'un bon de retrait signé des deux parties.</p><p>En vigueur à partir du {{date_debut}}.</p></div>`
  },
  {
    code: 'ret_qualite_produits',
    name: "Accord de service de qualité produits référencés",
    category: 'commercial_financier',
    price: 5500, priceMax: 16000,
    description: "Accord de contrôle qualité des produits référencés en grande distribution, définissant les audits, les non-conformités et les sanctions applicables en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 61,
    fieldsJson: F([
      {key:'distributeur', label:"Distributeur", type:'text', required:true},
      {key:'fournisseur', label:"Fournisseur concerné", type:'text', required:true},
      {key:'normes_applicables', label:"Normes qualité applicables", type:'textarea', required:true},
      {key:'frequence_audit', label:"Fréquence des audits qualité", type:'text', required:true},
      {key:'penalite_nc', label:"Pénalité en cas de non-conformité (FCFA)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE QUALITÉ PRODUITS RÉFÉRENCÉS</h1><p>Entre <strong>{{distributeur}}</strong> et <strong>{{fournisseur}}</strong>.</p><h3>Article 1 – Normes</h3><p>{{normes_applicables}}</p><h3>Article 2 – Audits</h3><p>Fréquence : {{frequence_audit}}. Les audits peuvent être inopinés.</p><h3>Article 3 – Non-conformités</h3><p>Pénalité par non-conformité constatée : {{penalite_nc}} FCFA, sans préjudice du droit de déréférencement.</p></div>`
  },
  {
    code: 'ret_local_supply',
    name: "Accord de partenariat producteur-distributeur (approvisionnement local)",
    category: 'commercial_financier',
    price: 6000, priceMax: 18000,
    description: "Accord de partenariat pour l'approvisionnement local en produits agricoles ivoiriens entre un producteur et une enseigne de grande distribution.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 76,
    fieldsJson: F([
      {key:'nom_producteur', label:"Nom du producteur", type:'text', required:true},
      {key:'nom_distributeur', label:"Nom du distributeur", type:'text', required:true},
      {key:'produits', label:"Produits locaux concernés", type:'textarea', required:true},
      {key:'volume_hebdo', label:"Volume hebdomadaire estimé", type:'text', required:true},
      {key:'prix_achat', label:"Prix d'achat convenu (FCFA/kg ou unité)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT PRODUCTEUR-DISTRIBUTEUR</h1><h2>Approvisionnement Local – Côte d'Ivoire</h2><p>Entre <strong>{{nom_producteur}}</strong> et <strong>{{nom_distributeur}}</strong>.</p><h3>Article 1 – Produits</h3><p>{{produits}}</p><h3>Article 2 – Volumes</h3><p>Volume hebdomadaire estimé : {{volume_hebdo}}.</p><h3>Article 3 – Prix</h3><p>Prix d'achat : {{prix_achat}} FCFA.</p><h3>Article 4 – Engagement réciproque</h3><p>Le distributeur s'engage à valoriser l'origine locale en rayon. Le producteur garantit la régularité et la qualité des livraisons.</p></div>`
  },
  {
    code: 'ret_franchise_magasin',
    name: "Contrat de franchise de magasin",
    category: 'commercial_financier',
    price: 12000, priceMax: 35000,
    description: "Contrat de franchise pour l'exploitation d'un magasin sous une enseigne en Côte d'Ivoire, définissant les droits, redevances et obligations du franchisé.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 82,
    fieldsJson: F([
      {key:'franchiseur', label:"Franchiseur (enseigne)", type:'text', required:true},
      {key:'franchisee', label:"Franchisé", type:'text', required:true},
      {key:'adresse_magasin', label:"Adresse du magasin franchisé", type:'text', required:true},
      {key:'droit_entree', label:"Droit d'entrée (FCFA)", type:'text', required:true},
      {key:'redevance_pct', label:"Redevance mensuelle (%CA)", type:'text', required:true},
      {key:'duree_contrat', label:"Durée du contrat", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE FRANCHISE DE MAGASIN</h1><p>Entre <strong>{{franchiseur}}</strong> (le Franchiseur) et <strong>{{franchisee}}</strong> (le Franchisé).</p><h3>Article 1 – Objet</h3><p>Le Franchiseur concède au Franchisé le droit d'exploiter un magasin sous son enseigne à l'adresse : {{adresse_magasin}}.</p><h3>Article 2 – Durée</h3><p>{{duree_contrat}}.</p><h3>Article 3 – Rémunération</h3><p>Droit d'entrée : {{droit_entree}} FCFA. Redevance mensuelle : {{redevance_pct}}% du chiffre d'affaires HT.</p><h3>Article 4 – Obligations du franchisé</h3><p>Respect du concept, de la charte graphique, des standards de service et des procédures du Franchiseur.</p><h3>Article 5 – Droit applicable</h3><p>OHADA – Acte Uniforme relatif au droit commercial général.</p></div>`
  },
  {
    code: 'ret_licence_enseigne',
    name: "Accord de licence d'enseigne",
    category: 'commercial_financier',
    price: 9000, priceMax: 26000,
    description: "Accord de licence d'utilisation d'une enseigne commerciale concédée à un opérateur tiers en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'concedant', label:"Concédant (titulaire de l'enseigne)", type:'text', required:true},
      {key:'licencie', label:"Licencié", type:'text', required:true},
      {key:'territoire', label:"Territoire de la licence", type:'text', required:true},
      {key:'redevance', label:"Redevance annuelle (FCFA)", type:'text', required:true},
      {key:'date_debut', label:"Date de prise d'effet", type:'date', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE LICENCE D'ENSEIGNE</h1><p>Entre <strong>{{concedant}}</strong> et <strong>{{licencie}}</strong>.</p><h3>Article 1 – Licence</h3><p>Le Concédant autorise le Licencié à utiliser son enseigne sur le territoire : {{territoire}}.</p><h3>Article 2 – Redevance</h3><p>Redevance annuelle : {{redevance}} FCFA, payable par trimestre.</p><h3>Article 3 – Conditions d'utilisation</h3><p>L'enseigne est utilisée conformément à la charte graphique. Toute utilisation non conforme entraîne résiliation immédiate.</p><p>En vigueur à partir du {{date_debut}}.</p></div>`
  },
  {
    code: 'ret_caisse_tpe',
    name: "Accord de service de caisse enregistreuse et TPE",
    category: 'commercial_financier',
    price: 3500, priceMax: 10000,
    description: "Accord de fourniture et maintenance de systèmes de caisse enregistreuse et de terminaux de paiement électronique (TPE) pour un point de vente ivoirien.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 57,
    fieldsJson: F([
      {key:'fournisseur_solution', label:"Fournisseur de la solution", type:'text', required:true},
      {key:'client_magasin', label:"Client (magasin)", type:'text', required:true},
      {key:'nombre_caisses', label:"Nombre de caisses / TPE", type:'text', required:true},
      {key:'tarif_mensuel', label:"Tarif mensuel de maintenance (FCFA)", type:'text', required:true},
      {key:'date_installation', label:"Date d'installation prévue", type:'date', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CAISSE ENREGISTREUSE ET TPE</h1><p>Entre <strong>{{fournisseur_solution}}</strong> et <strong>{{client_magasin}}</strong>.</p><h3>Article 1 – Équipements</h3><p>Nombre de caisses et TPE installés : {{nombre_caisses}}.</p><h3>Article 2 – Maintenance</h3><p>Tarif mensuel de maintenance : {{tarif_mensuel}} FCFA.</p><h3>Article 3 – Installation</h3><p>Date d'installation prévue : {{date_installation}}.</p><h3>Article 4 – Données</h3><p>Les données de vente restent la propriété exclusive du Client.</p></div>`
  },
  {
    code: 'ret_wms_retail',
    name: "Accord de service de gestion des stocks (WMS retail)",
    category: 'commercial_financier',
    price: 7000, priceMax: 20000,
    description: "Accord de mise en place et exploitation d'un système de gestion d'entrepôt (WMS) pour une enseigne de grande distribution en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 59,
    fieldsJson: F([
      {key:'editeur_wms', label:"Éditeur / intégrateur WMS", type:'text', required:true},
      {key:'enseigne', label:"Enseigne cliente", type:'text', required:true},
      {key:'perimetre', label:"Périmètre d'application", type:'textarea', required:true},
      {key:'licence_annuelle', label:"Licence annuelle (FCFA)", type:'text', required:true},
      {key:'date_go_live', label:"Date de mise en production prévue", type:'date', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE WMS RETAIL</h1><p>Entre <strong>{{editeur_wms}}</strong> et <strong>{{enseigne}}</strong>.</p><h3>Article 1 – Périmètre</h3><p>{{perimetre}}</p><h3>Article 2 – Licence</h3><p>Licence annuelle : {{licence_annuelle}} FCFA.</p><h3>Article 3 – Mise en production</h3><p>Date de go-live prévue : {{date_go_live}}.</p><h3>Article 4 – Support</h3><p>Support technique garanti 5j/7 de 7h à 20h heure d'Abidjan.</p></div>`
  },
  {
    code: 'ret_fidelite_client',
    name: "Accord de service de programme de fidélité client",
    category: 'commercial_financier',
    price: 5000, priceMax: 15000,
    description: "Accord de conception, déploiement et gestion d'un programme de fidélité client pour une enseigne retail en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 67,
    fieldsJson: F([
      {key:'prestataire', label:"Prestataire du programme", type:'text', required:true},
      {key:'enseigne', label:"Enseigne cliente", type:'text', required:true},
      {key:'mecanisme', label:"Mécanisme de fidélité (points, cashback…)", type:'text', required:true},
      {key:'tarif_setup', label:"Coût d'installation (FCFA)", type:'text', required:false},
      {key:'tarif_mensuel', label:"Tarif mensuel (FCFA)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PROGRAMME DE FIDÉLITÉ CLIENT</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{enseigne}}</strong>.</p><h3>Article 1 – Mécanisme</h3><p>{{mecanisme}}</p><h3>Article 2 – Mise en place</h3><p>Coût d'installation : {{tarif_setup}} FCFA.</p><h3>Article 3 – Exploitation</h3><p>Tarif mensuel d'exploitation : {{tarif_mensuel}} FCFA.</p><h3>Article 4 – Données clients</h3><p>Les données collectées sont protégées conformément aux lois ivoiriennes en vigueur sur la protection des données personnelles.</p></div>`
  },
  {
    code: 'ret_antivol',
    name: "Accord de service de surveillance anti-vol retail",
    category: 'commercial_financier',
    price: 4000, priceMax: 12000,
    description: "Accord de prestation de surveillance et protection anti-vol pour magasins de grande distribution en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'prestataire_securite', label:"Prestataire de sécurité", type:'text', required:true},
      {key:'magasin_client', label:"Magasin client", type:'text', required:true},
      {key:'effectif_agents', label:"Nombre d'agents déployés", type:'text', required:true},
      {key:'plages_horaires', label:"Plages horaires de surveillance", type:'text', required:true},
      {key:'tarif_mensuel', label:"Tarif mensuel (FCFA)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SURVEILLANCE ANTI-VOL RETAIL</h1><p>Entre <strong>{{prestataire_securite}}</strong> et <strong>{{magasin_client}}</strong>.</p><h3>Article 1 – Effectif</h3><p>Nombre d'agents : {{effectif_agents}}.</p><h3>Article 2 – Plages horaires</h3><p>{{plages_horaires}}</p><h3>Article 3 – Rémunération</h3><p>Tarif mensuel : {{tarif_mensuel}} FCFA.</p><h3>Article 4 – Responsabilité</h3><p>Le prestataire est agréé par les autorités compétentes ivoiriennes. Sa responsabilité est limitée à la faute prouvée de ses agents.</p></div>`
  },
  {
    code: 'ret_nettoyage_magasin',
    name: "Accord de service de nettoyage et maintenance magasin",
    category: 'commercial_financier',
    price: 3000, priceMax: 9000,
    description: "Accord de prestation de nettoyage et petite maintenance des locaux d'un magasin de grande distribution en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 54,
    fieldsJson: F([
      {key:'prestataire', label:"Prestataire nettoyage", type:'text', required:true},
      {key:'magasin', label:"Magasin client", type:'text', required:true},
      {key:'frequence', label:"Fréquence des interventions", type:'text', required:true},
      {key:'tarif_mensuel', label:"Tarif mensuel (FCFA)", type:'text', required:true},
      {key:'date_debut', label:"Date de début", type:'date', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE NETTOYAGE ET MAINTENANCE MAGASIN</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{magasin}}</strong>.</p><h3>Article 1 – Prestations</h3><p>Nettoyage des sols, vitrines, sanitaires et espaces de vente. Petites maintenances courantes.</p><h3>Article 2 – Fréquence</h3><p>{{frequence}}</p><h3>Article 3 – Tarif</h3><p>{{tarif_mensuel}} FCFA/mois. En vigueur à partir du {{date_debut}}.</p></div>`
  },
  {
    code: 'ret_perf_magasin',
    name: "Rapport de performance magasin (chiffre d'affaires/m²)",
    category: 'commercial_financier',
    price: 2500, priceMax: 7500,
    description: "Rapport type de performance mensuelle d'un magasin de grande distribution en Côte d'Ivoire, incluant CA/m², taux de transformation et panier moyen.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 58,
    fieldsJson: F([
      {key:'nom_magasin', label:"Nom du magasin", type:'text', required:true},
      {key:'periode', label:"Période analysée", type:'text', required:true},
      {key:'ca_total', label:"Chiffre d'affaires total (FCFA)", type:'text', required:true},
      {key:'surface_vente', label:"Surface de vente (m²)", type:'text', required:true},
      {key:'panier_moyen', label:"Panier moyen (FCFA)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE MAGASIN</h1><h2>{{nom_magasin}} – Période : {{periode}}</h2><h3>Indicateurs clés</h3><p><strong>CA total :</strong> {{ca_total}} FCFA</p><p><strong>Surface de vente :</strong> {{surface_vente}} m²</p><p><strong>CA/m² :</strong> à calculer d'après les données ci-dessus</p><p><strong>Panier moyen :</strong> {{panier_moyen}} FCFA</p><h3>Analyse</h3><p>Ce rapport est établi conformément aux normes de reporting interne de l'enseigne.</p></div>`
  },
  {
    code: 'ret_plan_dev_reseau',
    name: "Plan de développement réseau de magasins",
    category: 'commercial_financier',
    price: 10000, priceMax: 30000,
    description: "Document cadre de planification du développement d'un réseau de magasins en Côte d'Ivoire et en Afrique de l'Ouest, incluant cibles géographiques et modèles d'implantation.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 73,
    fieldsJson: F([
      {key:'nom_enseigne', label:"Enseigne concernée", type:'text', required:true},
      {key:'horizon_plan', label:"Horizon du plan (ex: 3 ans)", type:'text', required:true},
      {key:'cibles_geographiques', label:"Villes / zones cibles", type:'textarea', required:true},
      {key:'nombre_ouvertures', label:"Nombre d'ouvertures prévues", type:'text', required:true},
      {key:'investissement_total', label:"Investissement total estimé (FCFA)", type:'text', required:false}
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT RÉSEAU DE MAGASINS</h1><h2>{{nom_enseigne}} – Horizon {{horizon_plan}}</h2><h3>1. Ambition</h3><p>Ouvertures prévues : {{nombre_ouvertures}} points de vente.</p><h3>2. Cibles géographiques</h3><p>{{cibles_geographiques}}</p><h3>3. Investissement</h3><p>Investissement total estimé : {{investissement_total}} FCFA.</p><h3>4. Modèle d'implantation</h3><p>Chaque ouverture est soumise à une étude de zone de chalandise préalable et à la validation du comité de développement.</p></div>`
  },
  {
    code: 'ret_formation_vente',
    name: "Accord de service de formation personnel de vente",
    category: 'commercial_financier',
    price: 4500, priceMax: 13000,
    description: "Accord de prestation de formation du personnel de vente d'une enseigne de grande distribution en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'organisme_formation', label:"Organisme de formation", type:'text', required:true},
      {key:'enseigne_cliente', label:"Enseigne cliente", type:'text', required:true},
      {key:'thematiques', label:"Thématiques de formation", type:'textarea', required:true},
      {key:'nombre_stagiaires', label:"Nombre de stagiaires", type:'text', required:true},
      {key:'cout_formation', label:"Coût total de la formation (FCFA)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FORMATION PERSONNEL DE VENTE</h1><p>Entre <strong>{{organisme_formation}}</strong> et <strong>{{enseigne_cliente}}</strong>.</p><h3>Article 1 – Thématiques</h3><p>{{thematiques}}</p><h3>Article 2 – Participants</h3><p>Nombre de stagiaires : {{nombre_stagiaires}}.</p><h3>Article 3 – Coût</h3><p>Coût total : {{cout_formation}} FCFA.</p><h3>Article 4 – Attestation</h3><p>Une attestation de formation est remise à chaque stagiaire ayant suivi au moins 80% des heures prévues.</p></div>`
  },
  {
    code: 'ret_conseil_implantation',
    name: "Accord de service de conseil en implantation de magasin",
    category: 'commercial_financier',
    price: 8000, priceMax: 24000,
    description: "Accord de prestation de conseil pour l'implantation d'un nouveau magasin (étude de zone, agencement, concept commercial) en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'cabinet_conseil', label:"Cabinet de conseil", type:'text', required:true},
      {key:'client', label:"Client (enseigne / entrepreneur)", type:'text', required:true},
      {key:'ville_cible', label:"Ville / zone d'implantation", type:'text', required:true},
      {key:'missions', label:"Missions confiées", type:'textarea', required:true},
      {key:'honoraires', label:"Honoraires (FCFA)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CONSEIL EN IMPLANTATION DE MAGASIN</h1><p>Entre <strong>{{cabinet_conseil}}</strong> et <strong>{{client}}</strong>.</p><h3>Article 1 – Zone d'implantation</h3><p>{{ville_cible}}</p><h3>Article 2 – Missions</h3><p>{{missions}}</p><h3>Article 3 – Honoraires</h3><p>{{honoraires}} FCFA, payables en 2 tranches : 50% à la signature, 50% à la remise du rapport final.</p></div>`
  },
  {
    code: 'ret_charte_responsable',
    name: "Charte du commerce de détail responsable",
    category: 'commercial_financier',
    price: 2000, priceMax: 6000,
    description: "Charte d'engagement RSE et de commerce responsable pour les enseignes de détail en Côte d'Ivoire, couvrant environnement, emploi local et éthique des affaires.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 52,
    fieldsJson: F([
      {key:'nom_enseigne', label:"Nom de l'enseigne signataire", type:'text', required:true},
      {key:'date_adoption', label:"Date d'adoption", type:'date', required:true},
      {key:'representant_legal', label:"Représentant légal", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DU COMMERCE DE DÉTAIL RESPONSABLE</h1><h2>{{nom_enseigne}}</h2><p>Adoptée le {{date_adoption}} par {{representant_legal}}.</p><h3>1. Engagement environnemental</h3><p>Réduction des emballages plastiques, tri des déchets, maîtrise de la consommation énergétique.</p><h3>2. Emploi local</h3><p>Priorité à l'embauche locale et à la formation des jeunes ivoiriens.</p><h3>3. Éthique des achats</h3><p>Refus de la corruption, respect des délais de paiement fournisseurs, traçabilité des produits.</p><h3>4. Engagement communautaire</h3><p>Soutien aux initiatives locales et participation au développement économique du quartier.</p></div>`
  },

  // ─── COMMERCE INFORMEL / MARCHÉS (mkt2_) ──────────────────────────────────
  {
    code: 'mkt2_loc_place_marche',
    name: "Accord de location de place de marché municipal",
    category: 'commercial_financier',
    price: 1500, priceMax: 4500,
    description: "Accord de location d'une place dans un marché municipal ivoirien entre la commune et un commerçant, fixant le loyer, les obligations et les règles d'occupation.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 70,
    fieldsJson: F([
      {key:'nom_commune', label:"Commune gestionnaire du marché", type:'text', required:true},
      {key:'nom_commercant', label:"Nom du commerçant", type:'text', required:true},
      {key:'numero_place', label:"Numéro de la place / emplacement", type:'text', required:true},
      {key:'loyer_mensuel', label:"Loyer mensuel (FCFA)", type:'text', required:true},
      {key:'date_debut', label:"Date de prise d'effet", type:'date', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE LOCATION DE PLACE DE MARCHÉ MUNICIPAL</h1><p>Entre la <strong>Mairie de {{nom_commune}}</strong> et <strong>{{nom_commercant}}</strong>.</p><h3>Article 1 – Emplacement</h3><p>Place / emplacement N° {{numero_place}} au marché municipal.</p><h3>Article 2 – Loyer</h3><p>Loyer mensuel : {{loyer_mensuel}} FCFA, payable avant le 5 de chaque mois.</p><h3>Article 3 – Obligations du commerçant</h3><p>Entretien de l'emplacement, respect des horaires d'ouverture du marché, paiement des redevances municipales.</p><p>En vigueur à partir du {{date_debut}}.</p></div>`
  },
  {
    code: 'mkt2_marche_gros',
    name: "Accord de service de marché de gros régional (Bouaké, Man)",
    category: 'commercial_financier',
    price: 3000, priceMax: 9000,
    description: "Accord définissant les conditions d'accès et de service d'un marché de gros régional en Côte d'Ivoire (Bouaké, Man), entre la structure gestionnaire et un grossiste.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 65,
    fieldsJson: F([
      {key:'gestionnaire_marche', label:"Structure gestionnaire du marché de gros", type:'text', required:true},
      {key:'grossiste', label:"Nom du grossiste", type:'text', required:true},
      {key:'ville', label:"Ville du marché de gros", type:'text', required:true},
      {key:'produits_negocies', label:"Produits négociés", type:'textarea', required:true},
      {key:'redevance_annuelle', label:"Redevance annuelle (FCFA)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MARCHÉ DE GROS RÉGIONAL</h1><p>Marché de gros de <strong>{{ville}}</strong> – Géré par <strong>{{gestionnaire_marche}}</strong>.</p><p>Bénéficiaire : <strong>{{grossiste}}</strong>.</p><h3>Article 1 – Produits</h3><p>{{produits_negocies}}</p><h3>Article 2 – Accès</h3><p>Le grossiste bénéficie d'un accès prioritaire aux quais de déchargement et à un espace de stockage temporaire.</p><h3>Article 3 – Redevance</h3><p>Redevance annuelle : {{redevance_annuelle}} FCFA.</p></div>`
  },
  {
    code: 'mkt2_marche_betail',
    name: "Accord de service de marché de bétail hebdomadaire",
    category: 'commercial_financier',
    price: 2000, priceMax: 6000,
    description: "Accord d'utilisation des infrastructures d'un marché de bétail hebdomadaire en Côte d'Ivoire, entre la commune et un éleveur / commerçant de bétail.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 62,
    fieldsJson: F([
      {key:'commune', label:"Commune organisatrice", type:'text', required:true},
      {key:'commercant_betail', label:"Éleveur / commerçant de bétail", type:'text', required:true},
      {key:'type_animaux', label:"Type d'animaux (bovins, ovins…)", type:'text', required:true},
      {key:'droit_marche', label:"Droit de marché par tête (FCFA)", type:'text', required:true},
      {key:'jour_marche', label:"Jour hebdomadaire du marché", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MARCHÉ DE BÉTAIL HEBDOMADAIRE</h1><p>Entre la <strong>Commune de {{commune}}</strong> et <strong>{{commercant_betail}}</strong>.</p><h3>Article 1 – Animaux concernés</h3><p>{{type_animaux}}</p><h3>Article 2 – Jour de marché</h3><p>Chaque {{jour_marche}}.</p><h3>Article 3 – Droits de marché</h3><p>{{droit_marche}} FCFA par tête présentée, payable à l'entrée.</p><h3>Article 4 – Hygiène</h3><p>Le commerçant est responsable de l'état sanitaire de ses animaux. Tout animal suspect peut être refusé par les agents vétérinaires.</p></div>`
  },
  {
    code: 'mkt2_comptoir_zf',
    name: "Accord de service de comptoir commercial en zone franche",
    category: 'commercial_financier',
    price: 6000, priceMax: 18000,
    description: "Accord d'exploitation d'un comptoir commercial en Zone Franche Industrielle de Côte d'Ivoire (ZFICI), conditions d'accès, exonérations et obligations.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'operateur', label:"Opérateur commercial", type:'text', required:true},
      {key:'zone_franche', label:"Zone franche concernée", type:'text', required:true},
      {key:'activite', label:"Activité commerciale exercée", type:'text', required:true},
      {key:'surface_m2', label:"Surface du comptoir (m²)", type:'text', required:true},
      {key:'loyer_annuel', label:"Loyer annuel (FCFA)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE COMPTOIR COMMERCIAL EN ZONE FRANCHE</h1><p>Conclu entre la <strong>{{zone_franche}}</strong> et l'opérateur <strong>{{operateur}}</strong>.</p><h3>Article 1 – Activité</h3><p>{{activite}}</p><h3>Article 2 – Surface</h3><p>Surface du comptoir : {{surface_m2}} m².</p><h3>Article 3 – Loyer</h3><p>Loyer annuel : {{loyer_annuel}} FCFA, bénéficiant des exonérations fiscales attachées au statut de zone franche.</p><h3>Article 4 – Obligations</h3><p>L'opérateur respecte le cahier des charges de la zone franche et les engagements d'emploi local.</p></div>`
  },
  {
    code: 'mkt2_boutique_quartier',
    name: "Accord de service de boutique de quartier (alimentation générale)",
    category: 'commercial_financier',
    price: 2000, priceMax: 6000,
    description: "Accord type encadrant la relation entre un propriétaire de local et un boutiquier en alimentation générale de quartier en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 75,
    fieldsJson: F([
      {key:'proprietaire', label:"Propriétaire du local", type:'text', required:true},
      {key:'boutiquier', label:"Boutiquier locataire", type:'text', required:true},
      {key:'adresse_boutique', label:"Adresse de la boutique", type:'text', required:true},
      {key:'loyer_mensuel', label:"Loyer mensuel (FCFA)", type:'text', required:true},
      {key:'date_debut', label:"Date de début", type:'date', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE BOUTIQUE DE QUARTIER</h1><p>Entre <strong>{{proprietaire}}</strong> et <strong>{{boutiquier}}</strong>.</p><h3>Article 1 – Local</h3><p>Boutique d'alimentation générale sise à {{adresse_boutique}}.</p><h3>Article 2 – Loyer</h3><p>Loyer mensuel : {{loyer_mensuel}} FCFA.</p><h3>Article 3 – Activité</h3><p>Le locataire exerce une activité de commerce d'alimentation générale conformément aux autorisations municipales.</p><p>En vigueur à partir du {{date_debut}}.</p></div>`
  },
  {
    code: 'mkt2_commercant_ambulant',
    name: "Contrat de commerçant ambulant avec commune",
    category: 'commercial_financier',
    price: 1500, priceMax: 4500,
    description: "Contrat d'autorisation d'exercer le commerce ambulant sur le territoire d'une commune ivoirienne, fixant les zones, horaires et redevances.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 68,
    fieldsJson: F([
      {key:'nom_commune', label:"Commune", type:'text', required:true},
      {key:'nom_commercant', label:"Nom du commerçant ambulant", type:'text', required:true},
      {key:'produits_vendus', label:"Produits vendus", type:'text', required:true},
      {key:'zones_autorisees', label:"Zones autorisées", type:'textarea', required:true},
      {key:'redevance_mensuelle', label:"Redevance mensuelle (FCFA)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE COMMERÇANT AMBULANT</h1><p>Délivré par la <strong>Mairie de {{nom_commune}}</strong> à <strong>{{nom_commercant}}</strong>.</p><h3>Article 1 – Produits autorisés</h3><p>{{produits_vendus}}</p><h3>Article 2 – Zones d'exercice</h3><p>{{zones_autorisees}}</p><h3>Article 3 – Redevance</h3><p>Redevance mensuelle : {{redevance_mensuelle}} FCFA.</p><h3>Article 4 – Interdictions</h3><p>Stationnement prolongé interdit. Respect des règles d'hygiène et de propreté obligatoire.</p></div>`
  },
  {
    code: 'mkt2_foire_artisanale',
    name: "Accord de service de foire artisanale locale",
    category: 'commercial_financier',
    price: 2500, priceMax: 7500,
    description: "Accord d'organisation et de participation à une foire artisanale locale en Côte d'Ivoire, entre la structure organisatrice et un artisan exposant.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 60,
    fieldsJson: F([
      {key:'organisateur', label:"Organisateur de la foire", type:'text', required:true},
      {key:'artisan', label:"Artisan exposant", type:'text', required:true},
      {key:'type_artisanat', label:"Type d'artisanat présenté", type:'text', required:true},
      {key:'date_foire', label:"Date de la foire", type:'date', required:true},
      {key:'droit_participation', label:"Droit de participation (FCFA)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTICIPATION À UNE FOIRE ARTISANALE LOCALE</h1><p>Entre <strong>{{organisateur}}</strong> et l'artisan <strong>{{artisan}}</strong>.</p><h3>Article 1 – Artisanat exposé</h3><p>{{type_artisanat}}</p><h3>Article 2 – Date</h3><p>Foire du {{date_foire}}.</p><h3>Article 3 – Droit de participation</h3><p>{{droit_participation}} FCFA, non remboursable.</p><h3>Article 4 – Obligations</h3><p>L'artisan s'engage à occuper son stand durant toute la durée de la foire et à respecter le règlement intérieur.</p></div>`
  },
  {
    code: 'mkt2_marche_communautaire',
    name: "Accord de service de marché communautaire rural",
    category: 'commercial_financier',
    price: 1500, priceMax: 4500,
    description: "Accord de fonctionnement d'un marché communautaire rural entre un comité villageois et les commerçants participants en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 63,
    fieldsJson: F([
      {key:'comite_villageois', label:"Comité villageois gestionnaire", type:'text', required:true},
      {key:'commercant', label:"Commerçant participant", type:'text', required:true},
      {key:'village', label:"Village / localité", type:'text', required:true},
      {key:'jour_marche', label:"Jour du marché", type:'text', required:true},
      {key:'contribution', label:"Contribution au marché (FCFA)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MARCHÉ COMMUNAUTAIRE RURAL</h1><p>Entre le <strong>Comité de {{village}}</strong> et <strong>{{commercant}}</strong>.</p><h3>Article 1 – Marché</h3><p>Marché communautaire de {{village}}, tenu chaque {{jour_marche}}.</p><h3>Article 2 – Contribution</h3><p>Contribution par jour de marché : {{contribution}} FCFA, versée au Comité.</p><h3>Article 3 – Règles</h3><p>Le commerçant respecte les décisions du Comité et participe à l'entretien de l'espace.</p></div>`
  },
  {
    code: 'mkt2_stockage_cereales',
    name: "Accord de service de stockage et vente de céréales",
    category: 'commercial_financier',
    price: 3000, priceMax: 9000,
    description: "Accord de stockage et commercialisation de céréales (maïs, riz, mil) entre un stockeur et un commerçant en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 67,
    fieldsJson: F([
      {key:'stockeur', label:"Nom du stockeur / entrepôt", type:'text', required:true},
      {key:'commercant', label:"Commerçant de céréales", type:'text', required:true},
      {key:'type_cereales', label:"Type de céréales stockées", type:'text', required:true},
      {key:'quantite_tonnes', label:"Quantité (tonnes)", type:'text', required:true},
      {key:'tarif_stockage', label:"Tarif de stockage mensuel (FCFA/tonne)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE STOCKAGE ET VENTE DE CÉRÉALES</h1><p>Entre <strong>{{stockeur}}</strong> et <strong>{{commercant}}</strong>.</p><h3>Article 1 – Céréales</h3><p>Type : {{type_cereales}}. Quantité : {{quantite_tonnes}} tonnes.</p><h3>Article 2 – Tarif de stockage</h3><p>{{tarif_stockage}} FCFA/tonne/mois.</p><h3>Article 3 – Conditions</h3><p>Le stockeur garantit des conditions de stockage préservant la qualité des céréales (humidité, nuisibles). Tout dommage engage sa responsabilité.</p></div>`
  },
  {
    code: 'mkt2_tontine_commerciale',
    name: "Accord de tontine commerciale entre commerçants",
    category: 'commercial_financier',
    price: 2000, priceMax: 6000,
    description: "Accord encadrant une tontine commerciale (système d'épargne rotatif) entre commerçants d'un marché ivoirien, précisant les règles, montants et ordre de bénéfice.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 80,
    fieldsJson: F([
      {key:'nom_tontine', label:"Nom du groupe de tontine", type:'text', required:true},
      {key:'nombre_membres', label:"Nombre de membres", type:'text', required:true},
      {key:'cotisation_mensuelle', label:"Cotisation mensuelle par membre (FCFA)", type:'text', required:true},
      {key:'mode_attribution', label:"Mode d'attribution de la cagnotte (tirage au sort, enchères…)", type:'text', required:true},
      {key:'date_debut', label:"Date de démarrage", type:'date', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE TONTINE COMMERCIALE</h1><h2>Groupe : {{nom_tontine}}</h2><p>Les membres soussignés conviennent des règles suivantes :</p><h3>Article 1 – Composition</h3><p>Nombre de membres : {{nombre_membres}}.</p><h3>Article 2 – Cotisation</h3><p>Cotisation mensuelle : {{cotisation_mensuelle}} FCFA par membre.</p><h3>Article 3 – Attribution</h3><p>Mode : {{mode_attribution}}.</p><h3>Article 4 – Discipline</h3><p>Tout retard de cotisation entraîne une pénalité définie par le groupe. L'exclusion est prononcée après 2 défauts consécutifs.</p><p>Démarrage : {{date_debut}}.</p></div>`
  },
  {
    code: 'mkt2_gie_commercial',
    name: "Accord de groupement d'intérêt économique (GIE) commercial",
    category: 'commercial_financier',
    price: 5000, priceMax: 15000,
    description: "Accord constitutif d'un groupement d'intérêt économique (GIE) entre commerçants ivoiriens conformément à l'Acte Uniforme OHADA relatif au droit des sociétés.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'nom_gie', label:"Nom du GIE", type:'text', required:true},
      {key:'membres_fondateurs', label:"Membres fondateurs (noms)", type:'textarea', required:true},
      {key:'objet_social', label:"Objet du GIE", type:'textarea', required:true},
      {key:'capital_initial', label:"Capital initial (FCFA)", type:'text', required:false},
      {key:'date_creation', label:"Date de création", type:'date', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD CONSTITUTIF DE GIE COMMERCIAL</h1><h2>{{nom_gie}}</h2><p>Constitué le {{date_creation}} par :</p><p>{{membres_fondateurs}}</p><h3>Article 1 – Objet</h3><p>{{objet_social}}</p><h3>Article 2 – Capital</h3><p>Capital initial : {{capital_initial}} FCFA, réparti entre les membres.</p><h3>Article 3 – Droit applicable</h3><p>Acte Uniforme OHADA relatif au droit des sociétés commerciales et du groupement d'intérêt économique.</p></div>`
  },
  {
    code: 'mkt2_assoc_informelle',
    name: "Contrat d'association commerciale informelle",
    category: 'commercial_financier',
    price: 2000, priceMax: 6000,
    description: "Contrat simple d'association commerciale informelle entre deux ou plusieurs commerçants ivoiriens, définissant apports, partage des bénéfices et gouvernance.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 74,
    fieldsJson: F([
      {key:'associe_1', label:"Premier associé", type:'text', required:true},
      {key:'associe_2', label:"Deuxième associé", type:'text', required:true},
      {key:'activite', label:"Activité commerciale commune", type:'text', required:true},
      {key:'partage_benefices', label:"Clé de partage des bénéfices", type:'text', required:true},
      {key:'date_debut', label:"Date de début", type:'date', required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT D'ASSOCIATION COMMERCIALE</h1><p>Entre <strong>{{associe_1}}</strong> et <strong>{{associe_2}}</strong>.</p><h3>Article 1 – Activité</h3><p>{{activite}}</p><h3>Article 2 – Partage</h3><p>Partage des bénéfices : {{partage_benefices}}.</p><h3>Article 3 – Décisions</h3><p>Toute décision importante requiert l'accord des deux associés. En cas de désaccord, les parties font appel à un médiateur de leur choix.</p><p>Effectif à partir du {{date_debut}}.</p></div>`
  },
  {
    code: 'mkt2_caution_mutuelle',
    name: "Accord de service de caution mutuelle commerçants",
    category: 'commercial_financier',
    price: 3500, priceMax: 10000,
    description: "Accord de mise en place d'un fonds de caution mutuelle entre commerçants d'un marché ivoirien pour garantir les crédits fournisseurs et bancaires.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'nom_fonds', label:"Nom du fonds de caution mutuelle", type:'text', required:true},
      {key:'membres', label:"Membres participants", type:'textarea', required:true},
      {key:'cotisation_initiale', label:"Cotisation initiale (FCFA)", type:'text', required:true},
      {key:'plafond_garantie', label:"Plafond de garantie par membre (FCFA)", type:'text', required:true},
      {key:'date_creation', label:"Date de création", type:'date', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CAUTION MUTUELLE COMMERÇANTS</h1><h2>{{nom_fonds}}</h2><p>Créé le {{date_creation}} par les membres suivants :</p><p>{{membres}}</p><h3>Article 1 – Cotisation</h3><p>Cotisation initiale : {{cotisation_initiale}} FCFA par membre.</p><h3>Article 2 – Garantie</h3><p>Plafond de garantie par membre : {{plafond_garantie}} FCFA.</p><h3>Article 3 – Gestion</h3><p>Un comité élu gère le fonds et statue sur les demandes de garantie dans un délai de 5 jours ouvrables.</p></div>`
  },
  {
    code: 'mkt2_credit_fourn_informel',
    name: "Accord de service de crédit fournisseur informel",
    category: 'commercial_financier',
    price: 2500, priceMax: 7500,
    description: "Accord de crédit fournisseur informel entre un grossiste et un détaillant de marché ivoirien, définissant le montant, les délais et les garanties.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 77,
    fieldsJson: F([
      {key:'fournisseur', label:"Fournisseur grossiste", type:'text', required:true},
      {key:'detaillant', label:"Détaillant bénéficiaire", type:'text', required:true},
      {key:'montant_credit', label:"Montant du crédit (FCFA)", type:'text', required:true},
      {key:'delai_remboursement', label:"Délai de remboursement", type:'text', required:true},
      {key:'garantie', label:"Garantie fournie (caution, nantissement…)", type:'text', required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CRÉDIT FOURNISSEUR</h1><p>Entre <strong>{{fournisseur}}</strong> et <strong>{{detaillant}}</strong>.</p><h3>Article 1 – Montant</h3><p>Montant du crédit accordé : {{montant_credit}} FCFA en marchandises.</p><h3>Article 2 – Remboursement</h3><p>Délai : {{delai_remboursement}}.</p><h3>Article 3 – Garantie</h3><p>{{garantie}}</p><h3>Article 4 – Défaut</h3><p>En cas de non-paiement à l'échéance, le fournisseur peut suspendre les livraisons et engager un recouvrement amiable.</p></div>`
  },
  {
    code: 'mkt2_formation_gestion',
    name: "Accord de service de formation à la gestion boutique",
    category: 'commercial_financier',
    price: 3000, priceMax: 9000,
    description: "Accord de formation à la gestion d'une boutique ou commerce de détail, dispensée à des commerçants informels ivoiriens par un organisme spécialisé.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 64,
    fieldsJson: F([
      {key:'organisme', label:"Organisme de formation", type:'text', required:true},
      {key:'beneficiaire', label:"Commerçant bénéficiaire", type:'text', required:true},
      {key:'modules', label:"Modules de formation (comptabilité, stock, achat…)", type:'textarea', required:true},
      {key:'duree_jours', label:"Durée (jours)", type:'text', required:true},
      {key:'cout', label:"Coût de la formation (FCFA)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE FORMATION À LA GESTION BOUTIQUE</h1><p>Entre <strong>{{organisme}}</strong> et <strong>{{beneficiaire}}</strong>.</p><h3>Article 1 – Modules</h3><p>{{modules}}</p><h3>Article 2 – Durée</h3><p>{{duree_jours}} jours de formation.</p><h3>Article 3 – Coût</h3><p>{{cout}} FCFA, dont 50% peuvent être pris en charge par le FDFP (Fonds de Développement de la Formation Professionnelle) sous conditions.</p></div>`
  },
  {
    code: 'mkt2_numerisation_boutique',
    name: "Accord de service de numérisation boutique (POS mobile)",
    category: 'commercial_financier',
    price: 3500, priceMax: 10000,
    description: "Accord de déploiement d'une solution de point de vente mobile (POS) pour la numérisation d'une boutique de quartier ou commerçant de marché ivoirien.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 69,
    fieldsJson: F([
      {key:'fournisseur_pos', label:"Fournisseur de la solution POS", type:'text', required:true},
      {key:'commercant', label:"Commerçant client", type:'text', required:true},
      {key:'solution', label:"Nom de la solution POS", type:'text', required:true},
      {key:'frais_installation', label:"Frais d'installation (FCFA)", type:'text', required:false},
      {key:'abonnement_mensuel', label:"Abonnement mensuel (FCFA)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE NUMÉRISATION BOUTIQUE (POS MOBILE)</h1><p>Entre <strong>{{fournisseur_pos}}</strong> et <strong>{{commercant}}</strong>.</p><h3>Article 1 – Solution</h3><p>Solution déployée : {{solution}}.</p><h3>Article 2 – Frais d'installation</h3><p>{{frais_installation}} FCFA.</p><h3>Article 3 – Abonnement</h3><p>Abonnement mensuel : {{abonnement_mensuel}} FCFA, incluant le support technique.</p><h3>Article 4 – Données</h3><p>Les données de vente appartiennent au commerçant. Le fournisseur ne peut les utiliser à des fins commerciales sans accord écrit préalable.</p></div>`
  },
  {
    code: 'mkt2_transfert_argent',
    name: "Accord de service de transfert d'argent informel (hawala adapté)",
    category: 'commercial_financier',
    price: 2500, priceMax: 7500,
    description: "Accord de service de transfert d'argent entre places commerciales ivoiriennes, inspiré du système hawala, adapté au contexte juridique ivoirien et OHADA.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 61,
    fieldsJson: F([
      {key:'operateur_envoi', label:"Opérateur envoyeur", type:'text', required:true},
      {key:'operateur_reception', label:"Opérateur récepteur", type:'text', required:true},
      {key:'plafond_journalier', label:"Plafond journalier (FCFA)", type:'text', required:true},
      {key:'commission_pct', label:"Commission (%)", type:'text', required:true},
      {key:'date_accord', label:"Date de l'accord", type:'date', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TRANSFERT D'ARGENT</h1><p>Entre <strong>{{operateur_envoi}}</strong> et <strong>{{operateur_reception}}</strong>.</p><h3>Article 1 – Plafond</h3><p>Plafond journalier par opération : {{plafond_journalier}} FCFA.</p><h3>Article 2 – Commission</h3><p>Commission : {{commission_pct}}% du montant transféré.</p><h3>Article 3 – Traçabilité</h3><p>Chaque transfert fait l'objet d'un reçu numéroté conservé par les deux opérateurs.</p><h3>Article 4 – Conformité</h3><p>Cet accord est soumis aux dispositions de l'UEMOA en matière de transfert de fonds. Accord du {{date_accord}}.</p></div>`
  },
  {
    code: 'mkt2_collecte_epargne',
    name: "Accord de service de collecte d'épargne boutiquier",
    category: 'commercial_financier',
    price: 2000, priceMax: 6000,
    description: "Accord de collecte d'épargne journalière (système tontinier ou mobile money) au profit d'un commerçant boutiquier en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 72,
    fieldsJson: F([
      {key:'collecteur', label:"Collecteur d'épargne", type:'text', required:true},
      {key:'boutiquier', label:"Boutiquier épargnant", type:'text', required:true},
      {key:'montant_journalier', label:"Montant journalier collecté (FCFA)", type:'text', required:true},
      {key:'jours_collecte', label:"Nombre de jours de collecte par cycle", type:'text', required:true},
      {key:'frais_collecte', label:"Frais du collecteur (jours de collecte équivalent)", type:'text', required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE COLLECTE D'ÉPARGNE BOUTIQUIER</h1><p>Entre le collecteur <strong>{{collecteur}}</strong> et <strong>{{boutiquier}}</strong>.</p><h3>Article 1 – Collecte</h3><p>Montant journalier : {{montant_journalier}} FCFA pendant {{jours_collecte}} jours.</p><h3>Article 2 – Restitution</h3><p>À la fin du cycle, le collecteur restitue la somme moins ses frais ({{frais_collecte}} équivalent jours).</p><h3>Article 3 – Garantie</h3><p>Le collecteur tient un carnet de bord signé à chaque collecte. Le boutiquier en conserve une copie.</p></div>`
  },
  {
    code: 'mkt2_gestion_dette',
    name: "Accord de service de gestion de dette fournisseur",
    category: 'commercial_financier',
    price: 2500, priceMax: 7500,
    description: "Accord de restructuration et suivi d'une dette fournisseur d'un commerçant de marché ivoirien, avec calendrier de remboursement échelonné.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 66,
    fieldsJson: F([
      {key:'fournisseur_creancier', label:"Fournisseur créancier", type:'text', required:true},
      {key:'debiteur', label:"Commerçant débiteur", type:'text', required:true},
      {key:'montant_dette', label:"Montant de la dette (FCFA)", type:'text', required:true},
      {key:'echeancier', label:"Calendrier de remboursement", type:'textarea', required:true},
      {key:'date_accord', label:"Date de l'accord", type:'date', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE GESTION DE DETTE FOURNISSEUR</h1><p>Entre <strong>{{fournisseur_creancier}}</strong> et <strong>{{debiteur}}</strong>.</p><h3>Article 1 – Montant</h3><p>Montant total de la dette reconnue : {{montant_dette}} FCFA.</p><h3>Article 2 – Échéancier</h3><p>{{echeancier}}</p><h3>Article 3 – Défaut</h3><p>En cas de non-respect de l'échéancier, le solde restant devient immédiatement exigible.</p><p>Accord signé le {{date_accord}}.</p></div>`
  },
  {
    code: 'mkt2_achats_groupes',
    name: "Accord de service de centrale d'achats groupés commerçants",
    category: 'commercial_financier',
    price: 4000, priceMax: 12000,
    description: "Accord de mise en place d'une centrale d'achats groupés entre commerçants d'un marché ivoirien pour négocier de meilleures conditions d'approvisionnement.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'nom_centrale', label:"Nom de la centrale d'achats groupés", type:'text', required:true},
      {key:'membres', label:"Commerçants membres", type:'textarea', required:true},
      {key:'categories_achat', label:"Catégories de produits achetés groupés", type:'textarea', required:true},
      {key:'economie_estimee', label:"Économie estimée par rapport au prix individuel (%)", type:'text', required:false},
      {key:'date_creation', label:"Date de création", type:'date', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CENTRALE D'ACHATS GROUPÉS</h1><h2>{{nom_centrale}}</h2><p>Créée le {{date_creation}} par les membres suivants :</p><p>{{membres}}</p><h3>Article 1 – Catégories</h3><p>{{categories_achat}}</p><h3>Article 2 – Économies</h3><p>Économie estimée : {{economie_estimee}}% par rapport aux achats individuels.</p><h3>Article 3 – Gouvernance</h3><p>Un coordinateur élu gère les commandes et redistribue les marchandises au prorata des engagements de chaque membre.</p></div>`
  },
  {
    code: 'mkt2_perf_marche',
    name: "Rapport de performance marché municipal",
    category: 'commercial_financier',
    price: 2000, priceMax: 6000,
    description: "Rapport de performance d'un marché municipal ivoirien : activité, recettes, commerçants actifs et perspectives de développement.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 57,
    fieldsJson: F([
      {key:'nom_marche', label:"Nom du marché municipal", type:'text', required:true},
      {key:'commune', label:"Commune gestionnaire", type:'text', required:true},
      {key:'periode', label:"Période du rapport", type:'text', required:true},
      {key:'nombre_commercants', label:"Nombre de commerçants actifs", type:'text', required:true},
      {key:'recettes_municipales', label:"Recettes municipales générées (FCFA)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE – MARCHÉ MUNICIPAL</h1><h2>{{nom_marche}} – {{commune}}</h2><h3>Période : {{periode}}</h3><p><strong>Commerçants actifs :</strong> {{nombre_commercants}}</p><p><strong>Recettes municipales générées :</strong> {{recettes_municipales}} FCFA</p><h3>Analyse</h3><p>Ce rapport est soumis au Conseil municipal pour information et décision relative aux investissements d'amélioration du marché.</p></div>`
  },
  {
    code: 'mkt2_formalisation',
    name: "Plan de formalisation du commerce informel",
    category: 'commercial_financier',
    price: 5000, priceMax: 15000,
    description: "Plan d'action pour la formalisation progressive d'un commerce informel ivoirien : enregistrement, fiscalité, comptabilité et accès au crédit formel.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'nom_commercant', label:"Nom du commerçant", type:'text', required:true},
      {key:'activite', label:"Activité concernée", type:'text', required:true},
      {key:'etapes_formalisation', label:"Étapes de formalisation prévues", type:'textarea', required:true},
      {key:'accompagnateur', label:"Structure d'accompagnement (CCI-CI, CEPICI…)", type:'text', required:false},
      {key:'date_debut', label:"Date de début du plan", type:'date', required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE FORMALISATION DU COMMERCE INFORMEL</h1><p>Bénéficiaire : <strong>{{nom_commercant}}</strong> – Activité : {{activite}}</p><h3>Article 1 – Étapes</h3><p>{{etapes_formalisation}}</p><h3>Article 2 – Accompagnement</h3><p>Structure d'accompagnement : {{accompagnateur}}.</p><h3>Article 3 – Calendrier</h3><p>Plan démarré le {{date_debut}}. Des étapes clés sont fixées trimestriellement.</p><h3>Article 4 – Bénéfices attendus</h3><p>Accès au crédit bancaire, sécurisation de l'activité, optimisation fiscale légale et croissance de l'entreprise.</p></div>`
  },
  {
    code: 'mkt2_partenariat_cci',
    name: "Accord de partenariat CCI-CI commerce informel",
    category: 'commercial_financier',
    price: 4000, priceMax: 12000,
    description: "Accord de partenariat entre la Chambre de Commerce et d'Industrie de Côte d'Ivoire (CCI-CI) et un groupement de commerçants informels pour leur accompagnement.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 64,
    fieldsJson: F([
      {key:'groupement', label:"Nom du groupement de commerçants", type:'text', required:true},
      {key:'responsable_groupement', label:"Responsable du groupement", type:'text', required:true},
      {key:'services_cci', label:"Services CCI-CI mobilisés", type:'textarea', required:true},
      {key:'duree_partenariat', label:"Durée du partenariat", type:'text', required:true},
      {key:'date_signature', label:"Date de signature", type:'date', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT CCI-CI / COMMERCE INFORMEL</h1><p>Entre la <strong>Chambre de Commerce et d'Industrie de Côte d'Ivoire (CCI-CI)</strong> et le groupement <strong>{{groupement}}</strong>, représenté par <strong>{{responsable_groupement}}</strong>.</p><h3>Article 1 – Services</h3><p>{{services_cci}}</p><h3>Article 2 – Durée</h3><p>{{duree_partenariat}}.</p><h3>Article 3 – Engagements mutuels</h3><p>La CCI-CI met à disposition son expertise et son réseau. Le groupement s'engage à mobiliser ses membres et à communiquer régulièrement sur les avancées.</p><p>Signé le {{date_signature}}.</p></div>`
  },
  {
    code: 'mkt2_accompagnement_pme',
    name: "Accord de service d'accompagnement PME informelle vers le formel",
    category: 'commercial_financier',
    price: 4500, priceMax: 13000,
    description: "Accord de conseil et d'accompagnement pour aider une PME informelle ivoirienne à se structurer, se formaliser et accéder aux marchés formels.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 71,
    fieldsJson: F([
      {key:'cabinet_accompagnement', label:"Cabinet ou ONG d'accompagnement", type:'text', required:true},
      {key:'pme_beneficiaire', label:"PME bénéficiaire", type:'text', required:true},
      {key:'secteur_activite', label:"Secteur d'activité", type:'text', required:true},
      {key:'missions', label:"Missions d'accompagnement", type:'textarea', required:true},
      {key:'duree_mois', label:"Durée de l'accompagnement (mois)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D'ACCOMPAGNEMENT PME INFORMELLE VERS LE FORMEL</h1><p>Entre <strong>{{cabinet_accompagnement}}</strong> et la PME <strong>{{pme_beneficiaire}}</strong> (secteur : {{secteur_activite}}).</p><h3>Article 1 – Missions</h3><p>{{missions}}</p><h3>Article 2 – Durée</h3><p>{{duree_mois}} mois, avec bilan mensuel.</p><h3>Article 3 – Engagement de la PME</h3><p>La PME s'engage à fournir tous les documents nécessaires et à participer activement au processus de formalisation.</p></div>`
  },
  {
    code: 'mkt2_charte_commerce_equitable',
    name: "Charte du commerce équitable et solidaire africain",
    category: 'commercial_financier',
    price: 2000, priceMax: 6000,
    description: "Charte d'adhésion aux principes du commerce équitable et solidaire adaptés au contexte africain et ivoirien, signée par un commerçant ou groupement.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 56,
    fieldsJson: F([
      {key:'signataire', label:"Commerçant ou groupement signataire", type:'text', required:true},
      {key:'date_adhesion', label:"Date d'adhésion", type:'date', required:true},
      {key:'representant', label:"Représentant légal", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DU COMMERCE ÉQUITABLE ET SOLIDAIRE AFRICAIN</h1><h2>Signée par : {{signataire}}</h2><p>Représenté par <strong>{{representant}}</strong>, le {{date_adhesion}}.</p><h3>1. Prix juste</h3><p>Engagement à pratiquer des prix justes rémunérant dignement les producteurs locaux.</p><h3>2. Conditions de travail</h3><p>Refus du travail des enfants, respect des normes minimales de travail définies par le droit ivoirien et les conventions de l'OIT.</p><h3>3. Environnement</h3><p>Limitation de l'impact environnemental des activités commerciales, favorisation des produits locaux et de saison.</p><h3>4. Transparence</h3><p>Information claire des clients sur l'origine et les conditions de production des marchandises vendues.</p><h3>5. Solidarité</h3><p>Participation à des initiatives communautaires et soutien aux producteurs les plus vulnérables.</p></div>`
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
  console.log(`Batch 61a OK — créés:${created} maj:${updated} TOTAL:${total}`);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
