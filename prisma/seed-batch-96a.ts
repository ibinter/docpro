import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ============================================================
  // RIZICULTURE / CULTURES VIVRIÈRES (25 templates, préfixe riz_)
  // ============================================================
  {
    code: 'riz_achat_paddy',
    name: "Accord d'achat de riz paddy (producteur-rizerie)",
    category: 'agro_environnement',
    price: 3000, priceMax: 9000,
    description: "Contrat d'achat de riz paddy entre un producteur et une rizerie, précisant quantités, prix au kg, conditions de livraison et de paiement selon les normes OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 75,
    fieldsJson: F([
      {key:'nom_producteur', label:"Nom du producteur", type:'text', required:true},
      {key:'nom_rizerie', label:"Nom de la rizerie", type:'text', required:true},
      {key:'quantite_kg', label:"Quantité de riz paddy (kg)", type:'text', required:true},
      {key:'prix_kg', label:"Prix par kg (FCFA)", type:'text', required:true},
      {key:'date_livraison', label:"Date de livraison prévue", type:'date', required:true},
      {key:'lieu_livraison', label:"Lieu de livraison", type:'text', required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD D'ACHAT DE RIZ PADDY</h1>
<p>Entre le producteur <strong>{{nom_producteur}}</strong> et la rizerie <strong>{{nom_rizerie}}</strong>,</p>
<p>il est convenu ce qui suit :</p>
<h2>Article 1 — Objet</h2>
<p>Le producteur s'engage à vendre à la rizerie une quantité de <strong>{{quantite_kg}} kg</strong> de riz paddy au prix unitaire de <strong>{{prix_kg}} FCFA/kg</strong>.</p>
<h2>Article 2 — Livraison</h2>
<p>La livraison sera effectuée le <strong>{{date_livraison}}</strong> au lieu suivant : <strong>{{lieu_livraison}}</strong>.</p>
<h2>Article 3 — Paiement</h2>
<p>Le paiement interviendra dans un délai de 7 jours ouvrables après réception et contrôle qualité du paddy.</p>
<h2>Article 4 — Droit applicable</h2>
<p>Le présent accord est soumis au droit OHADA et aux lois en vigueur en Côte d'Ivoire.</p>
<p>Fait à Abidjan, le {{date_livraison}}</p>
<p>Signature Producteur : _________________ &nbsp;&nbsp; Signature Rizerie : _________________</p></div>`
  },
  {
    code: 'riz_service_decorticage',
    name: "Accord de service de rizerie (décorticage)",
    category: 'agro_environnement',
    price: 2000, priceMax: 6000,
    description: "Contrat de prestation de service de décorticage du riz paddy entre un client et un prestataire de rizerie, avec tarification au quintal.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'nom_client', label:"Nom du client", type:'text', required:true},
      {key:'nom_prestataire', label:"Nom du prestataire (rizerie)", type:'text', required:true},
      {key:'quantite_quintaux', label:"Quantité à décortiquer (quintaux)", type:'text', required:true},
      {key:'tarif_quintal', label:"Tarif par quintal (FCFA)", type:'text', required:true},
      {key:'date_prestation', label:"Date de la prestation", type:'date', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DÉCORTICAGE DU RIZ</h1>
<p>Entre <strong>{{nom_client}}</strong> (le Client) et <strong>{{nom_prestataire}}</strong> (le Prestataire),</p>
<h2>Article 1 — Prestation</h2>
<p>Le Prestataire s'engage à décortiquer <strong>{{quantite_quintaux}} quintaux</strong> de riz paddy fournis par le Client.</p>
<h2>Article 2 — Tarification</h2>
<p>Le tarif convenu est de <strong>{{tarif_quintal}} FCFA</strong> par quintal décortiqué.</p>
<h2>Article 3 — Date d'exécution</h2>
<p>La prestation sera réalisée le <strong>{{date_prestation}}</strong>.</p>
<h2>Article 4 — Responsabilité</h2>
<p>Le Prestataire est responsable des pertes excédant le taux normal de décorticage fixé à 20 % du poids brut.</p>
<p>Fait à Abidjan, le {{date_prestation}}</p>
<p>Signatures des parties : _________________ / _________________</p></div>`
  },
  {
    code: 'riz_certification_qualite',
    name: "Accord de certification riz local de qualité",
    category: 'agro_environnement',
    price: 4000, priceMax: 12000,
    description: "Accord entre un producteur ou coopérative et un organisme de certification pour la labellisation qualité du riz local ivoirien.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 55,
    fieldsJson: F([
      {key:'nom_operateur', label:"Nom de l'opérateur (producteur/coopérative)", type:'text', required:true},
      {key:'organisme_certification', label:"Organisme de certification", type:'text', required:true},
      {key:'label_vise', label:"Label de qualité visé", type:'text', required:true},
      {key:'date_debut', label:"Date de début de certification", type:'date', required:true},
      {key:'duree_validite', label:"Durée de validité (mois)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CERTIFICATION RIZ LOCAL DE QUALITÉ</h1>
<p>Entre <strong>{{nom_operateur}}</strong> et <strong>{{organisme_certification}}</strong>,</p>
<h2>Article 1 — Objet</h2>
<p>Le présent accord porte sur la certification du riz local produit par l'Opérateur sous le label <strong>{{label_vise}}</strong>.</p>
<h2>Article 2 — Engagements de l'Opérateur</h2>
<p>L'Opérateur s'engage à respecter le cahier des charges du label, à autoriser les contrôles et à tenir un registre de traçabilité.</p>
<h2>Article 3 — Durée</h2>
<p>La certification prend effet le <strong>{{date_debut}}</strong> pour une durée de <strong>{{duree_validite}} mois</strong>, renouvelable après audit.</p>
<h2>Article 4 — Droit applicable</h2>
<p>Accord soumis au droit ivoirien et aux textes OHADA applicables.</p>
<p>Fait à Abidjan, le {{date_debut}}</p>
<p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'riz_stockage_magasin',
    name: "Accord de service de stockage de riz (magasin)",
    category: 'agro_environnement',
    price: 2500, priceMax: 7500,
    description: "Contrat de prestation de stockage de riz en magasin entre un déposant et un gestionnaire d'entrepôt, avec tarif mensuel et conditions de conservation.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'nom_deposant', label:"Nom du déposant", type:'text', required:true},
      {key:'nom_entrepot', label:"Nom du gestionnaire d'entrepôt", type:'text', required:true},
      {key:'quantite_tonnes', label:"Quantité à stocker (tonnes)", type:'text', required:true},
      {key:'tarif_mensuel', label:"Tarif mensuel (FCFA/tonne)", type:'text', required:true},
      {key:'date_depot', label:"Date de dépôt", type:'date', required:true},
      {key:'duree_mois', label:"Durée de stockage (mois)", type:'text', required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE STOCKAGE DE RIZ</h1>
<p>Entre <strong>{{nom_deposant}}</strong> (le Déposant) et <strong>{{nom_entrepot}}</strong> (le Gestionnaire),</p>
<h2>Article 1 — Objet</h2>
<p>Le Gestionnaire s'engage à stocker <strong>{{quantite_tonnes}} tonnes</strong> de riz pour le compte du Déposant à compter du <strong>{{date_depot}}</strong> pour une durée de <strong>{{duree_mois}} mois</strong>.</p>
<h2>Article 2 — Tarification</h2>
<p>Le tarif est fixé à <strong>{{tarif_mensuel}} FCFA/tonne/mois</strong>, payable mensuellement.</p>
<h2>Article 3 — Obligations du Gestionnaire</h2>
<p>Le Gestionnaire garantit une humidité inférieure à 14 %, une protection contre les nuisibles et un accès sécurisé aux stocks.</p>
<p>Fait à Abidjan, le {{date_depot}}</p>
<p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'riz_transformation_locale',
    name: "Accord de service de transformation du riz local (riz blanc, étuvé)",
    category: 'agro_environnement',
    price: 2500, priceMax: 8000,
    description: "Contrat de transformation du riz paddy en riz blanc ou riz étuvé, fixant les modalités techniques, rendements et rémunération du prestataire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'nom_client', label:"Nom du client", type:'text', required:true},
      {key:'nom_transformateur', label:"Nom du transformateur", type:'text', required:true},
      {key:'type_transformation', label:"Type de transformation (riz blanc / étuvé)", type:'text', required:true},
      {key:'quantite_paddy_kg', label:"Quantité de paddy (kg)", type:'text', required:true},
      {key:'prix_transformation', label:"Prix de transformation (FCFA/kg paddy)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TRANSFORMATION DU RIZ LOCAL</h1>
<p>Entre <strong>{{nom_client}}</strong> et <strong>{{nom_transformateur}}</strong>,</p>
<h2>Article 1 — Objet</h2>
<p>Le Transformateur s'engage à réaliser la transformation de <strong>{{quantite_paddy_kg}} kg</strong> de riz paddy en <strong>{{type_transformation}}</strong>.</p>
<h2>Article 2 — Tarification</h2>
<p>Le prix de la prestation est de <strong>{{prix_transformation}} FCFA</strong> par kg de paddy traité.</p>
<h2>Article 3 — Rendement garanti</h2>
<p>Le taux de rendement minimum garanti est de 65 % pour le riz blanc et 70 % pour le riz étuvé.</p>
<h2>Article 4 — Livraison</h2>
<p>Le produit transformé sera remis au Client dans un délai de 48 heures après réception du paddy.</p>
<p>Fait à Abidjan</p>
<p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'riz_distribution_grossiste',
    name: "Accord de service de distribution du riz local (grossiste)",
    category: 'agro_environnement',
    price: 3000, priceMax: 9000,
    description: "Contrat de distribution entre un producteur de riz local et un grossiste distributeur, précisant volumes minimums, prix de cession et zones de distribution.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'nom_producteur', label:"Nom du producteur", type:'text', required:true},
      {key:'nom_grossiste', label:"Nom du grossiste", type:'text', required:true},
      {key:'volume_mensuel_kg', label:"Volume mensuel minimum (kg)", type:'text', required:true},
      {key:'prix_cession', label:"Prix de cession (FCFA/kg)", type:'text', required:true},
      {key:'zone_distribution', label:"Zone de distribution", type:'text', required:true},
      {key:'date_debut', label:"Date de début", type:'date', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DISTRIBUTION DU RIZ LOCAL</h1>
<p>Entre <strong>{{nom_producteur}}</strong> (le Fournisseur) et <strong>{{nom_grossiste}}</strong> (le Distributeur),</p>
<h2>Article 1 — Objet</h2>
<p>Le Fournisseur confie au Distributeur la commercialisation de son riz local dans la zone : <strong>{{zone_distribution}}</strong>.</p>
<h2>Article 2 — Volumes et prix</h2>
<p>Volume mensuel minimum : <strong>{{volume_mensuel_kg}} kg</strong> au prix de cession de <strong>{{prix_cession}} FCFA/kg</strong>.</p>
<h2>Article 3 — Obligations du Distributeur</h2>
<p>Le Distributeur s'engage à assurer la promotion du riz local, à respecter les prix conseillés et à fournir un rapport mensuel des ventes.</p>
<h2>Article 4 — Durée</h2>
<p>Accord conclu pour un an à compter du <strong>{{date_debut}}</strong>, renouvelable par tacite reconduction.</p>
<p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'riz_culture_manioc',
    name: "Accord de service de culture du manioc (contrat de production)",
    category: 'agro_environnement',
    price: 2000, priceMax: 6000,
    description: "Contrat d'agriculture sous contrat pour la production de manioc entre un agroindustriel et un producteur, avec objectifs de rendement et prix d'achat garanti.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'nom_producteur', label:"Nom du producteur", type:'text', required:true},
      {key:'nom_acheteur', label:"Nom de l'acheteur / agroindustriel", type:'text', required:true},
      {key:'superficie_ha', label:"Superficie cultivée (ha)", type:'text', required:true},
      {key:'prix_achat_garanti', label:"Prix d'achat garanti (FCFA/kg)", type:'text', required:true},
      {key:'date_recolte', label:"Date estimée de récolte", type:'date', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CULTURE DU MANIOC</h1>
<p>Entre <strong>{{nom_producteur}}</strong> (le Producteur) et <strong>{{nom_acheteur}}</strong> (l'Acheteur),</p>
<h2>Article 1 — Objet</h2>
<p>Le Producteur s'engage à cultiver <strong>{{superficie_ha}} ha</strong> de manioc selon les itinéraires techniques convenus.</p>
<h2>Article 2 — Prix garanti</h2>
<p>L'Acheteur s'engage à acheter toute la production au prix de <strong>{{prix_achat_garanti}} FCFA/kg</strong>.</p>
<h2>Article 3 — Récolte</h2>
<p>La récolte est prévue le <strong>{{date_recolte}}</strong>. L'Acheteur prend en charge le transport depuis la parcelle.</p>
<p>Fait à Abidjan</p>
<p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'riz_transformation_manioc',
    name: "Accord de service de transformation du manioc (farine, attiéké)",
    category: 'agro_environnement',
    price: 2500, priceMax: 7000,
    description: "Contrat de transformation du manioc en farine ou attiéké entre un fournisseur de tubercules et une unité de transformation artisanale ou industrielle.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'nom_fournisseur', label:"Nom du fournisseur de manioc", type:'text', required:true},
      {key:'nom_transformateur', label:"Nom de l'unité de transformation", type:'text', required:true},
      {key:'produit_fini', label:"Produit fini (farine / attiéké)", type:'text', required:true},
      {key:'quantite_tubercules_kg', label:"Quantité de tubercules (kg)", type:'text', required:true},
      {key:'tarif_transformation', label:"Tarif de transformation (FCFA/kg)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TRANSFORMATION DU MANIOC</h1>
<p>Entre <strong>{{nom_fournisseur}}</strong> et <strong>{{nom_transformateur}}</strong>,</p>
<h2>Article 1 — Objet</h2>
<p>Transformation de <strong>{{quantite_tubercules_kg}} kg</strong> de manioc en <strong>{{produit_fini}}</strong>.</p>
<h2>Article 2 — Tarification</h2>
<p>Tarif : <strong>{{tarif_transformation}} FCFA/kg</strong> de tubercules traités.</p>
<h2>Article 3 — Qualité</h2>
<p>Le Transformateur garantit un produit fini conforme aux normes sanitaires ivoiriennes en vigueur (LANADA).</p>
<p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'riz_culture_mais',
    name: "Accord de service de culture du maïs",
    category: 'agro_environnement',
    price: 2000, priceMax: 6000,
    description: "Contrat d'agriculture sous contrat pour la culture du maïs entre un producteur et un acheteur industriel (aviculteur, amidonnerie), avec prix garanti à la tonne.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'nom_producteur', label:"Nom du producteur", type:'text', required:true},
      {key:'nom_acheteur', label:"Nom de l'acheteur", type:'text', required:true},
      {key:'superficie_ha', label:"Superficie (ha)", type:'text', required:true},
      {key:'prix_tonne', label:"Prix garanti (FCFA/tonne)", type:'text', required:true},
      {key:'saison_culture', label:"Saison de culture (ex: grande saison 2025)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CULTURE DU MAÏS</h1>
<p>Entre <strong>{{nom_producteur}}</strong> et <strong>{{nom_acheteur}}</strong>,</p>
<h2>Article 1 — Objet</h2>
<p>Production de maïs sur <strong>{{superficie_ha}} ha</strong> durant la <strong>{{saison_culture}}</strong>.</p>
<h2>Article 2 — Prix garanti</h2>
<p>Prix d'achat garanti : <strong>{{prix_tonne}} FCFA/tonne</strong> pour une humidité maximale de 14 %.</p>
<h2>Article 3 — Intrants</h2>
<p>L'Acheteur peut fournir des intrants à titre d'avance, à déduire du paiement à la livraison.</p>
<p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'riz_culture_banane',
    name: "Accord de service de culture de la banane plantain",
    category: 'agro_environnement',
    price: 2000, priceMax: 6000,
    description: "Contrat de production de banane plantain sous contrat entre un producteur villageois et un acheteur grossiste ou exportateur.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'nom_producteur', label:"Nom du producteur", type:'text', required:true},
      {key:'nom_acheteur', label:"Nom de l'acheteur", type:'text', required:true},
      {key:'nombre_regimes', label:"Nombre de régimes attendus", type:'text', required:true},
      {key:'prix_regime', label:"Prix par régime (FCFA)", type:'text', required:true},
      {key:'date_collecte', label:"Date de collecte estimée", type:'date', required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CULTURE DE LA BANANE PLANTAIN</h1>
<p>Entre <strong>{{nom_producteur}}</strong> et <strong>{{nom_acheteur}}</strong>,</p>
<h2>Article 1 — Objet</h2>
<p>Le Producteur s'engage à produire et livrer <strong>{{nombre_regimes}} régimes</strong> de banane plantain.</p>
<h2>Article 2 — Prix</h2>
<p>Prix convenu : <strong>{{prix_regime}} FCFA</strong> par régime livré, première qualité.</p>
<h2>Article 3 — Collecte</h2>
<p>La collecte est prévue le <strong>{{date_collecte}}</strong>. L'Acheteur assure le transport.</p>
<p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'riz_culture_igname',
    name: "Accord de service de culture de l'igname",
    category: 'agro_environnement',
    price: 2000, priceMax: 6500,
    description: "Contrat de production d'igname entre un producteur et un acheteur, avec spécification des variétés (Kponan, Florido), quantités et conditions de livraison.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'nom_producteur', label:"Nom du producteur", type:'text', required:true},
      {key:'nom_acheteur', label:"Nom de l'acheteur", type:'text', required:true},
      {key:'variete_igname', label:"Variété d'igname (ex: Kponan)", type:'text', required:true},
      {key:'quantite_kg', label:"Quantité (kg)", type:'text', required:true},
      {key:'prix_kg', label:"Prix (FCFA/kg)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CULTURE DE L'IGNAME</h1>
<p>Entre <strong>{{nom_producteur}}</strong> et <strong>{{nom_acheteur}}</strong>,</p>
<h2>Article 1 — Objet</h2>
<p>Production et vente de <strong>{{quantite_kg}} kg</strong> d'igname variété <strong>{{variete_igname}}</strong>.</p>
<h2>Article 2 — Prix</h2>
<p>Prix : <strong>{{prix_kg}} FCFA/kg</strong>, payable à la livraison.</p>
<h2>Article 3 — Qualité</h2>
<p>Les tubercules devront être sains, entiers, exempts de pourriture et d'un poids minimum de 500 g.</p>
<p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'riz_culture_soja',
    name: "Accord de service de culture du soja",
    category: 'agro_environnement',
    price: 2000, priceMax: 6000,
    description: "Contrat de production de soja entre un producteur et un acheteur industriel (huilerie, aliment bétail), avec prix garanti et fourniture d'intrants.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'nom_producteur', label:"Nom du producteur", type:'text', required:true},
      {key:'nom_acheteur', label:"Nom de l'acheteur industriel", type:'text', required:true},
      {key:'superficie_ha', label:"Superficie (ha)", type:'text', required:true},
      {key:'prix_garanti_kg', label:"Prix garanti (FCFA/kg)", type:'text', required:true},
      {key:'avance_intrants', label:"Avance sur intrants (FCFA)", type:'text', required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CULTURE DU SOJA</h1>
<p>Entre <strong>{{nom_producteur}}</strong> et <strong>{{nom_acheteur}}</strong>,</p>
<h2>Article 1 — Objet</h2>
<p>Culture du soja sur <strong>{{superficie_ha}} ha</strong> avec engagement d'achat intégral de la production.</p>
<h2>Article 2 — Prix</h2>
<p>Prix garanti : <strong>{{prix_garanti_kg}} FCFA/kg</strong> pour un taux d'humidité de 13 % maximum.</p>
<h2>Article 3 — Avance sur intrants</h2>
<p>Une avance de <strong>{{avance_intrants}} FCFA</strong> est consentie par l'Acheteur, à déduire du premier paiement.</p>
<p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'riz_culture_gombo',
    name: "Accord de service de culture du gombo et légumes-feuilles",
    category: 'agro_environnement',
    price: 1500, priceMax: 5000,
    description: "Contrat de production maraîchère de gombo et légumes-feuilles (aubergine africaine, feuilles de patate) entre un maraîcher et un acheteur de marché.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 50,
    fieldsJson: F([
      {key:'nom_maraicher', label:"Nom du maraîcher", type:'text', required:true},
      {key:'nom_acheteur', label:"Nom de l'acheteur", type:'text', required:true},
      {key:'types_legumes', label:"Types de légumes (gombo, feuilles...)", type:'text', required:true},
      {key:'quantite_hebdo_kg', label:"Quantité hebdomadaire (kg)", type:'text', required:true},
      {key:'prix_kg', label:"Prix (FCFA/kg)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CULTURE DU GOMBO ET LÉGUMES-FEUILLES</h1>
<p>Entre <strong>{{nom_maraicher}}</strong> et <strong>{{nom_acheteur}}</strong>,</p>
<h2>Article 1 — Objet</h2>
<p>Fourniture hebdomadaire de <strong>{{quantite_hebdo_kg}} kg</strong> de <strong>{{types_legumes}}</strong>.</p>
<h2>Article 2 — Prix</h2>
<p>Prix convenu : <strong>{{prix_kg}} FCFA/kg</strong>, révisable chaque trimestre par accord mutuel.</p>
<h2>Article 3 — Fréquence</h2>
<p>Livraisons deux fois par semaine (lundi et jeudi), sauf accord contraire.</p>
<p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'riz_maraichage_serre',
    name: "Accord de service de maraîchage (culture sous serre)",
    category: 'agro_environnement',
    price: 3500, priceMax: 10000,
    description: "Contrat de production maraîchère sous serre entre un investisseur et un exploitant, avec partage des revenus et obligations d'entretien des infrastructures.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 52,
    fieldsJson: F([
      {key:'nom_investisseur', label:"Nom de l'investisseur", type:'text', required:true},
      {key:'nom_exploitant', label:"Nom de l'exploitant", type:'text', required:true},
      {key:'surface_serre_m2', label:"Surface de serre (m²)", type:'text', required:true},
      {key:'partage_revenus_pct', label:"Quote-part exploitant (%)", type:'text', required:true},
      {key:'duree_contrat_mois', label:"Durée du contrat (mois)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MARAÎCHAGE SOUS SERRE</h1>
<p>Entre <strong>{{nom_investisseur}}</strong> (l'Investisseur) et <strong>{{nom_exploitant}}</strong> (l'Exploitant),</p>
<h2>Article 1 — Objet</h2>
<p>L'Exploitant prend en charge l'exploitation d'une serre de <strong>{{surface_serre_m2}} m²</strong> appartenant à l'Investisseur.</p>
<h2>Article 2 — Partage des revenus</h2>
<p>L'Exploitant perçoit <strong>{{partage_revenus_pct}} %</strong> des revenus nets des ventes.</p>
<h2>Article 3 — Durée</h2>
<p>Contrat d'une durée de <strong>{{duree_contrat_mois}} mois</strong>.</p>
<p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'riz_horticulture_fleurs',
    name: "Accord de service d'horticulture (fleurs, plantes ornementales)",
    category: 'agro_environnement',
    price: 2500, priceMax: 7000,
    description: "Contrat de production et fourniture de fleurs et plantes ornementales entre un horticulteur et un client (hôtels, événements, fleuristes).",
    templateType: 'pdf', classe: 'C', active: true, popularity: 45,
    fieldsJson: F([
      {key:'nom_horticulteur', label:"Nom de l'horticulteur", type:'text', required:true},
      {key:'nom_client', label:"Nom du client", type:'text', required:true},
      {key:'types_plantes', label:"Types de fleurs/plantes", type:'text', required:true},
      {key:'quantite_mensuelle', label:"Quantité mensuelle", type:'text', required:true},
      {key:'prix_mensuel', label:"Montant mensuel (FCFA)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'HORTICULTURE</h1>
<p>Entre <strong>{{nom_horticulteur}}</strong> et <strong>{{nom_client}}</strong>,</p>
<h2>Article 1 — Objet</h2>
<p>Fourniture mensuelle de <strong>{{quantite_mensuelle}}</strong> de <strong>{{types_plantes}}</strong>.</p>
<h2>Article 2 — Prix</h2>
<p>Montant mensuel : <strong>{{prix_mensuel}} FCFA</strong>, payable le 5 de chaque mois.</p>
<h2>Article 3 — Qualité</h2>
<p>Les plants et fleurs fournis doivent être frais, exempts de maladies, correctement conditionnés.</p>
<p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'riz_financement_microfinance',
    name: "Accord de financement culture maraîchère (microfinance)",
    category: 'agro_environnement',
    price: 3000, priceMax: 9000,
    description: "Convention de financement entre une institution de microfinance et un maraîcher pour le financement d'une campagne agricole, avec tableau de remboursement.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'nom_emprunteur', label:"Nom de l'emprunteur", type:'text', required:true},
      {key:'nom_imf', label:"Nom de l'institution de microfinance", type:'text', required:true},
      {key:'montant_credit', label:"Montant du crédit (FCFA)", type:'text', required:true},
      {key:'taux_interet', label:"Taux d'intérêt mensuel (%)", type:'text', required:true},
      {key:'duree_mois', label:"Durée de remboursement (mois)", type:'text', required:true},
      {key:'date_deblocage', label:"Date de déblocage", type:'date', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE FINANCEMENT CULTURE MARAÎCHÈRE</h1>
<p>Entre <strong>{{nom_imf}}</strong> (le Prêteur) et <strong>{{nom_emprunteur}}</strong> (l'Emprunteur),</p>
<h2>Article 1 — Objet</h2>
<p>Le Prêteur accorde un crédit de campagne agricole maraîchère de <strong>{{montant_credit}} FCFA</strong>.</p>
<h2>Article 2 — Conditions financières</h2>
<p>Taux d'intérêt : <strong>{{taux_interet}} %</strong> par mois. Durée : <strong>{{duree_mois}} mois</strong> à partir du <strong>{{date_deblocage}}</strong>.</p>
<h2>Article 3 — Garantie</h2>
<p>L'Emprunteur affecte en garantie la récolte à venir et s'engage à ouvrir un compte d'épargne de solidarité.</p>
<h2>Article 4 — Droit applicable</h2>
<p>Accord soumis aux dispositions de l'OHADA et de la réglementation BCEAO.</p>
<p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'riz_semences_ameliorees',
    name: "Accord de service de semences améliorées riz (AfricaRice)",
    category: 'agro_environnement',
    price: 2500, priceMax: 7000,
    description: "Contrat de fourniture de semences certifiées de riz (variétés WARDA / AfricaRice) entre un fournisseur agréé et un producteur, avec obligations de traçabilité.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'nom_fournisseur', label:"Nom du fournisseur de semences", type:'text', required:true},
      {key:'nom_producteur', label:"Nom du producteur", type:'text', required:true},
      {key:'variete_riz', label:"Variété de riz (ex: NERICA 14)", type:'text', required:true},
      {key:'quantite_kg', label:"Quantité de semences (kg)", type:'text', required:true},
      {key:'prix_kg', label:"Prix (FCFA/kg)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SEMENCES AMÉLIORÉES RIZ</h1>
<p>Entre <strong>{{nom_fournisseur}}</strong> (le Fournisseur) et <strong>{{nom_producteur}}</strong> (le Producteur),</p>
<h2>Article 1 — Objet</h2>
<p>Fourniture de <strong>{{quantite_kg}} kg</strong> de semences certifiées variété <strong>{{variete_riz}}</strong> au prix de <strong>{{prix_kg}} FCFA/kg</strong>.</p>
<h2>Article 2 — Certification</h2>
<p>Les semences sont certifiées conformément aux normes ISTA et aux réglementations du MINADER de Côte d'Ivoire.</p>
<h2>Article 3 — Traçabilité</h2>
<p>Le Producteur s'engage à conserver les étiquettes de certification et à ne pas commercialiser les semences issues de la récolte comme semences certifiées.</p>
<p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'riz_mecanisation_agricole',
    name: "Accord de service de mécanisation agricole (tracteur, décortiqueuse)",
    category: 'agro_environnement',
    price: 3000, priceMax: 9000,
    description: "Contrat de location de matériel agricole motorisé (tracteur, décortiqueuse) entre un prestataire de mécanisation et un groupement de producteurs.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'nom_prestataire', label:"Nom du prestataire de mécanisation", type:'text', required:true},
      {key:'nom_groupement', label:"Nom du groupement / producteur", type:'text', required:true},
      {key:'type_materiel', label:"Type de matériel (tracteur, décortiqueuse...)", type:'text', required:true},
      {key:'superficie_ou_quantite', label:"Superficie (ha) ou quantité à traiter (kg)", type:'text', required:true},
      {key:'tarif', label:"Tarif (FCFA/ha ou FCFA/kg)", type:'text', required:true},
      {key:'date_intervention', label:"Date d'intervention", type:'date', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MÉCANISATION AGRICOLE</h1>
<p>Entre <strong>{{nom_prestataire}}</strong> et <strong>{{nom_groupement}}</strong>,</p>
<h2>Article 1 — Objet</h2>
<p>Mise à disposition de <strong>{{type_materiel}}</strong> pour une superficie/quantité de <strong>{{superficie_ou_quantite}}</strong>.</p>
<h2>Article 2 — Tarification</h2>
<p>Tarif convenu : <strong>{{tarif}} FCFA</strong>, payable 50 % avant intervention et 50 % à la fin des travaux.</p>
<h2>Article 3 — Responsabilité</h2>
<p>Le Prestataire assure la maintenance du matériel. En cas de panne prolongée (> 4 h), il mobilise un équipement de substitution.</p>
<p>Date d'intervention : <strong>{{date_intervention}}</strong></p>
<p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'riz_irrigation_goutte',
    name: "Accord de service d'irrigation goutte-à-goutte cultures vivrières",
    category: 'agro_environnement',
    price: 3500, priceMax: 10000,
    description: "Contrat d'installation et de maintenance d'un système d'irrigation goutte-à-goutte pour cultures vivrières, entre un fournisseur spécialisé et un exploitant agricole.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 50,
    fieldsJson: F([
      {key:'nom_fournisseur', label:"Nom du fournisseur / installateur", type:'text', required:true},
      {key:'nom_exploitant', label:"Nom de l'exploitant", type:'text', required:true},
      {key:'superficie_irrigable_ha', label:"Superficie irrigable (ha)", type:'text', required:true},
      {key:'cout_installation', label:"Coût d'installation (FCFA)", type:'text', required:true},
      {key:'duree_garantie_mois', label:"Durée de garantie (mois)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'IRRIGATION GOUTTE-À-GOUTTE</h1>
<p>Entre <strong>{{nom_fournisseur}}</strong> et <strong>{{nom_exploitant}}</strong>,</p>
<h2>Article 1 — Objet</h2>
<p>Installation d'un système d'irrigation goutte-à-goutte sur <strong>{{superficie_irrigable_ha}} ha</strong>.</p>
<h2>Article 2 — Coût</h2>
<p>Coût total : <strong>{{cout_installation}} FCFA</strong>, payable en 3 tranches (30 %, 40 %, 30 %).</p>
<h2>Article 3 — Garantie et maintenance</h2>
<p>Garantie de <strong>{{duree_garantie_mois}} mois</strong> couvrant les défauts de matériaux et la main-d'oeuvre d'installation.</p>
<p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'riz_conservation_silo',
    name: "Accord de service de conservation post-récolte (silo, chambre froide)",
    category: 'agro_environnement',
    price: 3000, priceMax: 8000,
    description: "Contrat de conservation post-récolte en silo ou chambre froide entre un producteur et un opérateur d'infrastructure de stockage réfrigéré ou en silo métallique.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'nom_producteur', label:"Nom du producteur", type:'text', required:true},
      {key:'nom_operateur', label:"Nom de l'opérateur de stockage", type:'text', required:true},
      {key:'type_infrastructure', label:"Type d'infrastructure (silo / chambre froide)", type:'text', required:true},
      {key:'quantite_tonnes', label:"Quantité à conserver (tonnes)", type:'text', required:true},
      {key:'duree_mois', label:"Durée de conservation (mois)", type:'text', required:true},
      {key:'tarif_mensuel', label:"Tarif mensuel (FCFA/tonne)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CONSERVATION POST-RÉCOLTE</h1>
<p>Entre <strong>{{nom_producteur}}</strong> et <strong>{{nom_operateur}}</strong>,</p>
<h2>Article 1 — Objet</h2>
<p>Conservation de <strong>{{quantite_tonnes}} tonnes</strong> en <strong>{{type_infrastructure}}</strong> pendant <strong>{{duree_mois}} mois</strong>.</p>
<h2>Article 2 — Tarification</h2>
<p>Tarif : <strong>{{tarif_mensuel}} FCFA/tonne/mois</strong>.</p>
<h2>Article 3 — Responsabilité</h2>
<p>L'Opérateur est responsable des pertes dues aux nuisibles, à l'humidité et aux variations thermiques dépassant les seuils convenus.</p>
<p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'riz_labellisation_local_ci',
    name: "Accord de service de labellisation riz local CI",
    category: 'agro_environnement',
    price: 4000, priceMax: 12000,
    description: "Convention de labellisation du riz local ivoirien entre un groupement de producteurs et l'Agence de Promotion des Produits Agricoles (APROMAC) ou structure équivalente.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 50,
    fieldsJson: F([
      {key:'nom_groupement', label:"Nom du groupement de producteurs", type:'text', required:true},
      {key:'structure_labellisation', label:"Structure de labellisation", type:'text', required:true},
      {key:'label_denomination', label:"Dénomination du label", type:'text', required:true},
      {key:'date_attribution', label:"Date d'attribution du label", type:'date', required:true},
      {key:'conditions_maintien', label:"Conditions de maintien du label", type:'textarea', required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE LABELLISATION RIZ LOCAL CÔTE D'IVOIRE</h1>
<p>Entre <strong>{{nom_groupement}}</strong> et <strong>{{structure_labellisation}}</strong>,</p>
<h2>Article 1 — Label</h2>
<p>Attribution du label <strong>{{label_denomination}}</strong> à compter du <strong>{{date_attribution}}</strong>.</p>
<h2>Article 2 — Conditions de maintien</h2>
<p>{{conditions_maintien}}</p>
<h2>Article 3 — Contrôle</h2>
<p>Des audits annuels seront effectués par la structure de labellisation pour vérifier le respect du cahier des charges.</p>
<p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'riz_partenariat_supermarche',
    name: "Accord de partenariat avec la grande distribution (supermarché)",
    category: 'agro_environnement',
    price: 5000, priceMax: 15000,
    description: "Contrat de référencement et d'approvisionnement en riz local entre une coopérative de producteurs et une chaîne de supermarchés ivoirienne.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 58,
    fieldsJson: F([
      {key:'nom_cooperative', label:"Nom de la coopérative", type:'text', required:true},
      {key:'nom_supermarche', label:"Nom de l'enseigne supermarché", type:'text', required:true},
      {key:'volume_annuel_tonnes', label:"Volume annuel contractualisé (tonnes)", type:'text', required:true},
      {key:'prix_cession_kg', label:"Prix de cession (FCFA/kg)", type:'text', required:true},
      {key:'delai_paiement_jours', label:"Délai de paiement (jours)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT GRANDE DISTRIBUTION — RIZ LOCAL</h1>
<p>Entre <strong>{{nom_cooperative}}</strong> et <strong>{{nom_supermarche}}</strong>,</p>
<h2>Article 1 — Référencement</h2>
<p>Le supermarché référence le riz local de la coopérative dans ses rayons pour un volume annuel de <strong>{{volume_annuel_tonnes}} tonnes</strong>.</p>
<h2>Article 2 — Prix et paiement</h2>
<p>Prix de cession : <strong>{{prix_cession_kg}} FCFA/kg</strong>. Délai de paiement : <strong>{{delai_paiement_jours}} jours</strong> après livraison.</p>
<h2>Article 3 — Promotion</h2>
<p>Le supermarché s'engage à afficher la mention «Riz local de Côte d'Ivoire» et à réserver un espace promotionnel minimum de 1 m linéaire.</p>
<p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'riz_rapport_campagne',
    name: "Rapport de campagne cultures vivrières",
    category: 'agro_environnement',
    price: 2000, priceMax: 6000,
    description: "Modèle de rapport de fin de campagne agricole pour cultures vivrières (riz, manioc, maïs), à l'usage des coopératives et des services agricoles.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 45,
    fieldsJson: F([
      {key:'nom_structure', label:"Nom de la structure (coopérative / DRADER)", type:'text', required:true},
      {key:'periode_campagne', label:"Période de campagne (ex: avril-août 2025)", type:'text', required:true},
      {key:'cultures_concernees', label:"Cultures concernées", type:'text', required:true},
      {key:'superficie_totale_ha', label:"Superficie totale cultivée (ha)", type:'text', required:true},
      {key:'bilan_production', label:"Bilan de production et difficultés rencontrées", type:'textarea', required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE CAMPAGNE — CULTURES VIVRIÈRES</h1>
<p>Structure : <strong>{{nom_structure}}</strong></p>
<p>Période : <strong>{{periode_campagne}}</strong></p>
<h2>1. Cultures et superficies</h2>
<p>Cultures : <strong>{{cultures_concernees}}</strong> — Superficie totale : <strong>{{superficie_totale_ha}} ha</strong></p>
<h2>2. Bilan de production</h2>
<p>{{bilan_production}}</p>
<h2>3. Recommandations</h2>
<p>[À compléter par le rédacteur du rapport]</p>
<p>Établi par : _________________ Date : _________________</p></div>`
  },
  {
    code: 'riz_plan_securite_alimentaire',
    name: "Plan de développement sécurité alimentaire",
    category: 'agro_environnement',
    price: 5000, priceMax: 15000,
    description: "Document-cadre de planification pour la sécurité alimentaire au niveau communal ou régional, couvrant diagnostic, objectifs, activités et budget.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 48,
    fieldsJson: F([
      {key:'nom_collectivite', label:"Nom de la collectivité / région", type:'text', required:true},
      {key:'annee_plan', label:"Année du plan", type:'text', required:true},
      {key:'diagnostic_situation', label:"Diagnostic de la situation alimentaire", type:'textarea', required:true},
      {key:'objectifs_strategiques', label:"Objectifs stratégiques", type:'textarea', required:true},
      {key:'budget_total', label:"Budget total (FCFA)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT — SÉCURITÉ ALIMENTAIRE</h1>
<p>Collectivité : <strong>{{nom_collectivite}}</strong> — Année : <strong>{{annee_plan}}</strong></p>
<h2>1. Diagnostic</h2>
<p>{{diagnostic_situation}}</p>
<h2>2. Objectifs stratégiques</h2>
<p>{{objectifs_strategiques}}</p>
<h2>3. Budget prévisionnel</h2>
<p>Budget total : <strong>{{budget_total}} FCFA</strong></p>
<h2>4. Cadre de suivi-évaluation</h2>
<p>Un comité de pilotage se réunit trimestriellement pour évaluer l'avancement du plan.</p>
<p>Approuvé par : _________________ Date : _________________</p></div>`
  },
  {
    code: 'riz_charte_souverainete',
    name: "Charte de la souveraineté alimentaire en Côte d'Ivoire",
    category: 'agro_environnement',
    price: 4000, priceMax: 12000,
    description: "Document de charte engageant une organisation, coopérative ou institution sur les principes de la souveraineté alimentaire : production locale, accès équitable, biodiversité.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 42,
    fieldsJson: F([
      {key:'nom_organisation', label:"Nom de l'organisation signataire", type:'text', required:true},
      {key:'date_signature', label:"Date de signature", type:'date', required:true},
      {key:'engagements_specifiques', label:"Engagements spécifiques de l'organisation", type:'textarea', required:true},
      {key:'representant', label:"Nom et titre du représentant", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE LA SOUVERAINETÉ ALIMENTAIRE EN CÔTE D'IVOIRE</h1>
<p>L'organisation <strong>{{nom_organisation}}</strong>, représentée par <strong>{{representant}}</strong>, adhère aux principes suivants :</p>
<h2>Principe 1 — Priorité à la production locale</h2>
<p>Nous nous engageons à privilégier les productions locales ivoiriennes dans nos approvisionnements et à soutenir les agriculteurs nationaux.</p>
<h2>Principe 2 — Accès équitable à l'alimentation</h2>
<p>Nous oeuvrons pour que toute personne en Côte d'Ivoire ait accès à une alimentation suffisante, saine et culturellement adaptée.</p>
<h2>Principe 3 — Engagements spécifiques</h2>
<p>{{engagements_specifiques}}</p>
<p>Fait à Abidjan, le <strong>{{date_signature}}</strong></p>
<p>Signature : _________________</p></div>`
  },

  // ============================================================
  // COTON / TEXTILE AGRO (25 templates, préfixe cotton_)
  // ============================================================
  {
    code: 'cotton_achat_graine',
    name: "Accord d'achat de coton graine (producteur-égreneuse)",
    category: 'agro_environnement',
    price: 3000, priceMax: 9000,
    description: "Contrat d'achat de coton graine entre un producteur et une société d'égrenage, précisant la campagne, les volumes, le prix au kg et les modalités de pesée.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'nom_producteur', label:"Nom du producteur", type:'text', required:true},
      {key:'nom_egreneuse', label:"Nom de la société d'égrenage", type:'text', required:true},
      {key:'campagne', label:"Campagne agricole (ex: 2025-2026)", type:'text', required:true},
      {key:'quantite_kg', label:"Quantité de coton graine (kg)", type:'text', required:true},
      {key:'prix_kg', label:"Prix bord champ (FCFA/kg)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D'ACHAT DE COTON GRAINE</h1>
<p>Campagne <strong>{{campagne}}</strong> — Entre <strong>{{nom_producteur}}</strong> et <strong>{{nom_egreneuse}}</strong>,</p>
<h2>Article 1 — Objet</h2>
<p>Le Producteur s'engage à livrer <strong>{{quantite_kg}} kg</strong> de coton graine au prix bord champ de <strong>{{prix_kg}} FCFA/kg</strong>.</p>
<h2>Article 2 — Pesée et classement</h2>
<p>La pesée est effectuée au centre de collecte agréé, en présence du producteur ou de son représentant. Le classement est réalisé selon les normes INTERCOTON.</p>
<h2>Article 3 — Paiement</h2>
<p>Le paiement est effectué dans les 7 jours suivant la livraison, par virement ou en espèces selon accord mutuel.</p>
<p>Fait à Abidjan</p>
<p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'cotton_service_egrenage',
    name: "Accord de service d'égrenage du coton",
    category: 'agro_environnement',
    price: 2500, priceMax: 8000,
    description: "Contrat de prestation d'égrenage du coton graine entre un propriétaire de coton et une usine d'égrenage, avec taux de fibre garanti et tarification.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'nom_client', label:"Nom du client", type:'text', required:true},
      {key:'nom_usine', label:"Nom de l'usine d'égrenage", type:'text', required:true},
      {key:'quantite_coton_graine_kg', label:"Quantité coton graine (kg)", type:'text', required:true},
      {key:'taux_fibre_garanti', label:"Taux de fibre garanti (%)", type:'text', required:true},
      {key:'tarif_egrenage', label:"Tarif d'égrenage (FCFA/kg coton graine)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ÉGRENAGE DU COTON</h1>
<p>Entre <strong>{{nom_client}}</strong> et <strong>{{nom_usine}}</strong>,</p>
<h2>Article 1 — Objet</h2>
<p>Égrenage de <strong>{{quantite_coton_graine_kg}} kg</strong> de coton graine avec un taux de fibre garanti de <strong>{{taux_fibre_garanti}} %</strong>.</p>
<h2>Article 2 — Tarification</h2>
<p>Tarif : <strong>{{tarif_egrenage}} FCFA/kg</strong> de coton graine traité.</p>
<h2>Article 3 — Sous-produits</h2>
<p>Les graines de coton issues de l'égrenage reviennent à l'Usine sauf accord contraire spécifié par avenant.</p>
<p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'cotton_classement_qualite',
    name: "Accord de service de classement et qualité du coton (INTERCOTON CI)",
    category: 'agro_environnement',
    price: 3000, priceMax: 9000,
    description: "Convention de service de classement et contrôle qualité du coton-fibre selon les normes INTERCOTON Côte d'Ivoire, entre un opérateur et un laboratoire agréé.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 55,
    fieldsJson: F([
      {key:'nom_operateur', label:"Nom de l'opérateur cotonnier", type:'text', required:true},
      {key:'laboratoire_classement', label:"Nom du laboratoire / organisme", type:'text', required:true},
      {key:'lots_a_classer', label:"Nombre de lots à classer", type:'text', required:true},
      {key:'norme_reference', label:"Norme de référence (ex: INTERCOTON 2023)", type:'text', required:true},
      {key:'date_classement', label:"Date de classement", type:'date', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CLASSEMENT ET QUALITÉ DU COTON</h1>
<p>Entre <strong>{{nom_operateur}}</strong> et <strong>{{laboratoire_classement}}</strong>,</p>
<h2>Article 1 — Objet</h2>
<p>Classement de <strong>{{lots_a_classer}} lots</strong> de coton-fibre selon la norme <strong>{{norme_reference}}</strong>.</p>
<h2>Article 2 — Paramètres analysés</h2>
<p>Longueur de fibre (UHML), uniformité, résistance (ténacité), micronaire, couleur (Rd et +b).</p>
<h2>Article 3 — Rapport</h2>
<p>Le laboratoire délivre un rapport de classement certifié dans les 5 jours ouvrables suivant la réception des échantillons.</p>
<p>Date prévue : <strong>{{date_classement}}</strong></p>
<p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'cotton_transport_vrac',
    name: "Accord de service de transport du coton en vrac",
    category: 'agro_environnement',
    price: 2500, priceMax: 7500,
    description: "Contrat de transport du coton graine ou coton-fibre en vrac entre un transporteur routier et un opérateur cotonnier, avec clauses d'assurance et de responsabilité.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'nom_transporteur', label:"Nom du transporteur", type:'text', required:true},
      {key:'nom_expediteur', label:"Nom de l'expéditeur", type:'text', required:true},
      {key:'lieu_chargement', label:"Lieu de chargement", type:'text', required:true},
      {key:'lieu_livraison', label:"Lieu de livraison", type:'text', required:true},
      {key:'tonnage', label:"Tonnage (tonnes)", type:'text', required:true},
      {key:'prix_tonne_km', label:"Prix (FCFA/tonne)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TRANSPORT DU COTON EN VRAC</h1>
<p>Entre <strong>{{nom_transporteur}}</strong> et <strong>{{nom_expediteur}}</strong>,</p>
<h2>Article 1 — Trajet</h2>
<p>Transport de <strong>{{tonnage}} tonnes</strong> de coton de <strong>{{lieu_chargement}}</strong> à <strong>{{lieu_livraison}}</strong>.</p>
<h2>Article 2 — Tarification</h2>
<p>Prix : <strong>{{prix_tonne_km}} FCFA/tonne</strong>, tout compris.</p>
<h2>Article 3 — Assurance</h2>
<p>Le Transporteur est tenu de souscrire une assurance marchandises couvrant la valeur totale du chargement.</p>
<p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'cotton_export_fibre',
    name: "Accord d'exportation de coton-fibre",
    category: 'agro_environnement',
    price: 5000, priceMax: 15000,
    description: "Contrat d'exportation de coton-fibre entre un exportateur ivoirien et un acheteur étranger, conforme aux règles OHADA et aux Incoterms 2020.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 62,
    fieldsJson: F([
      {key:'nom_exportateur', label:"Nom de l'exportateur (CI)", type:'text', required:true},
      {key:'nom_acheteur', label:"Nom de l'acheteur étranger", type:'text', required:true},
      {key:'pays_destination', label:"Pays de destination", type:'text', required:true},
      {key:'quantite_balles', label:"Quantité (balles)", type:'text', required:true},
      {key:'prix_usd_kg', label:"Prix (USD/kg, base FOB Abidjan)", type:'text', required:true},
      {key:'date_expedition', label:"Date d'expédition", type:'date', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D'EXPORTATION DE COTON-FIBRE</h1>
<p>Entre <strong>{{nom_exportateur}}</strong> (le Vendeur) et <strong>{{nom_acheteur}}</strong> (l'Acheteur),</p>
<h2>Article 1 — Objet</h2>
<p>Vente et exportation de <strong>{{quantite_balles}} balles</strong> de coton-fibre vers <strong>{{pays_destination}}</strong>.</p>
<h2>Article 2 — Prix et Incoterm</h2>
<p>Prix : <strong>{{prix_usd_kg}} USD/kg</strong>, base FOB Port d'Abidjan (Incoterms 2020).</p>
<h2>Article 3 — Expédition</h2>
<p>Date d'expédition : <strong>{{date_expedition}}</strong>. Le Vendeur remet au transporteur un connaissement net de réserves.</p>
<h2>Article 4 — Droit applicable</h2>
<p>Accord soumis au droit OHADA, les litiges étant soumis à l'arbitrage de la CCJA d'Abidjan.</p>
<p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'cotton_traitement_phyto',
    name: "Accord de service de traitement phytosanitaire coton",
    category: 'agro_environnement',
    price: 2000, priceMax: 6000,
    description: "Contrat de prestation de traitement phytosanitaire des cultures de coton entre un prestataire agréé et un groupement de producteurs cotonniers.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'nom_prestataire', label:"Nom du prestataire phytosanitaire", type:'text', required:true},
      {key:'nom_groupement', label:"Nom du groupement de producteurs", type:'text', required:true},
      {key:'superficie_ha', label:"Superficie à traiter (ha)", type:'text', required:true},
      {key:'programme_traitement', label:"Programme de traitement (nombre de passages)", type:'text', required:true},
      {key:'tarif_ha', label:"Tarif par ha et par passage (FCFA)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TRAITEMENT PHYTOSANITAIRE COTON</h1>
<p>Entre <strong>{{nom_prestataire}}</strong> et <strong>{{nom_groupement}}</strong>,</p>
<h2>Article 1 — Objet</h2>
<p>Traitement phytosanitaire de <strong>{{superficie_ha}} ha</strong> selon un programme de <strong>{{programme_traitement}} passages</strong>.</p>
<h2>Article 2 — Produits homologués</h2>
<p>Seuls des produits homologués par le MINADER et conformes aux listes positives INTERCOTON sont utilisés.</p>
<h2>Article 3 — Tarification</h2>
<p>Tarif : <strong>{{tarif_ha}} FCFA/ha/passage</strong>.</p>
<p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'cotton_culture_biologique',
    name: "Accord de service de culture biologique du coton",
    category: 'agro_environnement',
    price: 3000, priceMax: 9000,
    description: "Contrat de production de coton biologique entre un opérateur de commerce équitable et un groupement de producteurs, avec cahier des charges et prime biologique.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 52,
    fieldsJson: F([
      {key:'nom_operateur', label:"Nom de l'opérateur bio", type:'text', required:true},
      {key:'nom_groupement', label:"Nom du groupement de producteurs", type:'text', required:true},
      {key:'superficie_ha', label:"Superficie en culture biologique (ha)", type:'text', required:true},
      {key:'prime_bio_kg', label:"Prime biologique (FCFA/kg supplémentaire)", type:'text', required:true},
      {key:'annee_conversion', label:"Année de début de conversion", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CULTURE BIOLOGIQUE DU COTON</h1>
<p>Entre <strong>{{nom_operateur}}</strong> et <strong>{{nom_groupement}}</strong>,</p>
<h2>Article 1 — Objet</h2>
<p>Production de coton biologique sur <strong>{{superficie_ha}} ha</strong> à partir de l'année <strong>{{annee_conversion}}</strong>.</p>
<h2>Article 2 — Cahier des charges</h2>
<p>Interdiction stricte de pesticides chimiques de synthèse et d'OGM. Pratiques agroécologiques obligatoires (rotation, compostage, lutte biologique).</p>
<h2>Article 3 — Prime biologique</h2>
<p>Le Producteur perçoit une prime de <strong>{{prime_bio_kg}} FCFA/kg</strong> au-delà du prix conventionnel.</p>
<p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'cotton_certification_bio',
    name: "Accord de certification coton biologique (Textile Exchange)",
    category: 'agro_environnement',
    price: 4000, priceMax: 12000,
    description: "Convention de certification OCS (Organic Content Standard) ou GOTS entre un groupement de producteurs ivoiriens et un organisme certificateur international.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 48,
    fieldsJson: F([
      {key:'nom_groupement', label:"Nom du groupement / opérateur", type:'text', required:true},
      {key:'organisme_certificateur', label:"Organisme certificateur (ex: Control Union)", type:'text', required:true},
      {key:'standard_vise', label:"Standard visé (OCS / GOTS / OEKO-TEX)", type:'text', required:true},
      {key:'date_audit', label:"Date d'audit initial", type:'date', required:true},
      {key:'superficie_certifiee_ha', label:"Superficie certifiée (ha)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CERTIFICATION COTON BIOLOGIQUE</h1>
<p>Entre <strong>{{nom_groupement}}</strong> et <strong>{{organisme_certificateur}}</strong>,</p>
<h2>Article 1 — Standard</h2>
<p>Certification <strong>{{standard_vise}}</strong> pour <strong>{{superficie_certifiee_ha}} ha</strong> de coton biologique.</p>
<h2>Article 2 — Audit</h2>
<p>Un audit initial est planifié le <strong>{{date_audit}}</strong>, suivi d'audits annuels de surveillance.</p>
<h2>Article 3 — Obligations</h2>
<p>Le groupement tient un registre de traçabilité, des bilans de masse et des fiches parcellaires conformes aux exigences du standard.</p>
<p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'cotton_intrant_sofitex',
    name: "Accord de service d'intrant coton (SOFITEX modèle)",
    category: 'agro_environnement',
    price: 2500, priceMax: 7000,
    description: "Contrat de fourniture d'intrants (semences, engrais, pesticides) à crédit à des producteurs cotonniers, remboursable sur la vente du coton graine, inspiré du modèle SOFITEX.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'nom_fournisseur', label:"Nom du fournisseur d'intrants", type:'text', required:true},
      {key:'nom_producteur', label:"Nom du producteur", type:'text', required:true},
      {key:'valeur_intrants', label:"Valeur des intrants (FCFA)", type:'text', required:true},
      {key:'superficie_ha', label:"Superficie cultivée (ha)", type:'text', required:true},
      {key:'campagne', label:"Campagne agricole", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'INTRANT COTON</h1>
<p>Campagne <strong>{{campagne}}</strong> — Entre <strong>{{nom_fournisseur}}</strong> et <strong>{{nom_producteur}}</strong>,</p>
<h2>Article 1 — Objet</h2>
<p>Le Fournisseur met à disposition du Producteur des intrants d'une valeur de <strong>{{valeur_intrants}} FCFA</strong> pour <strong>{{superficie_ha}} ha</strong> de coton.</p>
<h2>Article 2 — Remboursement</h2>
<p>Le remboursement est effectué par déduction directe sur le prix de cession du coton graine à la livraison, sans intérêt.</p>
<h2>Article 3 — Obligation du Producteur</h2>
<p>Le Producteur s'engage à livrer la totalité de sa production au Fournisseur ou à son mandataire désigné.</p>
<p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'cotton_financement_banque',
    name: "Accord de financement campagne cotonnière (banque agricole)",
    category: 'agro_environnement',
    price: 4000, priceMax: 12000,
    description: "Convention de crédit de campagne cotonnière entre une banque agricole et une coopérative cotonnière, avec garanties sur la récolte et mécanisme de retenue à la source.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'nom_banque', label:"Nom de la banque", type:'text', required:true},
      {key:'nom_cooperative', label:"Nom de la coopérative cotonnière", type:'text', required:true},
      {key:'montant_credit', label:"Montant du crédit (FCFA)", type:'text', required:true},
      {key:'taux_annuel', label:"Taux d'intérêt annuel (%)", type:'text', required:true},
      {key:'duree_mois', label:"Durée (mois)", type:'text', required:true},
      {key:'date_deblocage', label:"Date de déblocage", type:'date', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE FINANCEMENT CAMPAGNE COTONNIÈRE</h1>
<p>Entre <strong>{{nom_banque}}</strong> et <strong>{{nom_cooperative}}</strong>,</p>
<h2>Article 1 — Crédit de campagne</h2>
<p>Crédit de <strong>{{montant_credit}} FCFA</strong> débloqué le <strong>{{date_deblocage}}</strong>, au taux de <strong>{{taux_annuel}} %</strong> l'an pour <strong>{{duree_mois}} mois</strong>.</p>
<h2>Article 2 — Garantie</h2>
<p>Nantissement de la récolte de coton graine et cession de créances sur la société d'égrenage bénéficiaire.</p>
<h2>Article 3 — Remboursement</h2>
<p>Remboursement par retenue à la source sur le produit de la vente du coton, domiciliation bancaire obligatoire.</p>
<p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'cotton_formation_producteur',
    name: "Accord de service de formation du producteur coton",
    category: 'agro_environnement',
    price: 2000, priceMax: 6000,
    description: "Contrat de formation technique des producteurs cotonniers (bonnes pratiques agricoles, gestion des intrants, techniques d'application des pesticides) entre un ONG ou centre de formation et une coopérative.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 55,
    fieldsJson: F([
      {key:'nom_formateur', label:"Nom de l'organisme de formation", type:'text', required:true},
      {key:'nom_cooperative', label:"Nom de la coopérative / groupement", type:'text', required:true},
      {key:'nombre_producteurs', label:"Nombre de producteurs à former", type:'text', required:true},
      {key:'thematiques', label:"Thématiques de formation", type:'textarea', required:true},
      {key:'date_formation', label:"Date de début de formation", type:'date', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FORMATION DU PRODUCTEUR COTON</h1>
<p>Entre <strong>{{nom_formateur}}</strong> et <strong>{{nom_cooperative}}</strong>,</p>
<h2>Article 1 — Objet</h2>
<p>Formation de <strong>{{nombre_producteurs}} producteurs</strong> cotonniers à compter du <strong>{{date_formation}}</strong>.</p>
<h2>Article 2 — Thématiques</h2>
<p>{{thematiques}}</p>
<h2>Article 3 — Méthodes pédagogiques</h2>
<p>Champs-écoles paysans (CEP), démonstrations pratiques, supports audiovisuels en langues locales.</p>
<h2>Article 4 — Attestation</h2>
<p>Chaque producteur formé reçoit une attestation de participation signée par les deux parties.</p>
<p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'cotton_filature_locale',
    name: "Accord de service de filature du coton local",
    category: 'agro_environnement',
    price: 3500, priceMax: 10000,
    description: "Contrat de prestation de filature du coton-fibre ivoirien en fil de coton entre une filature industrielle et un donneur d'ordre (tisserand, exportateur de fil).",
    templateType: 'pdf', classe: 'B', active: true, popularity: 50,
    fieldsJson: F([
      {key:'nom_donneur_ordre', label:"Nom du donneur d'ordre", type:'text', required:true},
      {key:'nom_filature', label:"Nom de la filature", type:'text', required:true},
      {key:'quantite_fibre_kg', label:"Quantité de fibre à filer (kg)", type:'text', required:true},
      {key:'titre_fil_nm', label:"Titre du fil (Nm)", type:'text', required:true},
      {key:'tarif_kg', label:"Tarif de filature (FCFA/kg)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FILATURE DU COTON LOCAL</h1>
<p>Entre <strong>{{nom_donneur_ordre}}</strong> et <strong>{{nom_filature}}</strong>,</p>
<h2>Article 1 — Objet</h2>
<p>Filature de <strong>{{quantite_fibre_kg}} kg</strong> de coton-fibre en fil titre <strong>Nm {{titre_fil_nm}}</strong>.</p>
<h2>Article 2 — Tarification</h2>
<p>Tarif : <strong>{{tarif_kg}} FCFA/kg</strong> de fibre traitée.</p>
<h2>Article 3 — Qualité</h2>
<p>Le fil produit devra satisfaire aux tests de régularité Uster et de résistance à la traction convenus.</p>
<p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'cotton_tissage_kita',
    name: "Accord de service de tissage du coton en tissu local (kita)",
    category: 'agro_environnement',
    price: 3000, priceMax: 9000,
    description: "Contrat de tissage artisanal ou semi-industriel de fil de coton en tissu local de type kita ou bandé, entre un artisan tisserand et un donneur d'ordre.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'nom_donneur_ordre', label:"Nom du donneur d'ordre", type:'text', required:true},
      {key:'nom_tisserand', label:"Nom de l'artisan tisserand", type:'text', required:true},
      {key:'quantite_metres', label:"Quantité à tisser (mètres linéaires)", type:'text', required:true},
      {key:'type_tissu', label:"Type de tissu (kita, bandé...)", type:'text', required:true},
      {key:'prix_metre', label:"Prix par mètre (FCFA)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TISSAGE COTON LOCAL</h1>
<p>Entre <strong>{{nom_donneur_ordre}}</strong> et <strong>{{nom_tisserand}}</strong>,</p>
<h2>Article 1 — Objet</h2>
<p>Tissage de <strong>{{quantite_metres}} mètres</strong> de tissu <strong>{{type_tissu}}</strong> à partir de fil de coton fourni par le donneur d'ordre.</p>
<h2>Article 2 — Tarification</h2>
<p>Prix : <strong>{{prix_metre}} FCFA/mètre</strong> linéaire tissé.</p>
<h2>Article 3 — Délai</h2>
<p>Délai de réalisation convenu entre les parties et inscrit sur le bon de commande annexé.</p>
<p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'cotton_teinture_naturelle',
    name: "Accord de service de teinture naturelle du coton",
    category: 'agro_environnement',
    price: 2500, priceMax: 7000,
    description: "Contrat de prestation de teinture naturelle (indigo, bogolan, écorces) sur tissu ou fil de coton entre un artisan teinturier et un client (styliste, exportateur).",
    templateType: 'pdf', classe: 'C', active: true, popularity: 48,
    fieldsJson: F([
      {key:'nom_client', label:"Nom du client", type:'text', required:true},
      {key:'nom_teinturier', label:"Nom de l'artisan teinturier", type:'text', required:true},
      {key:'quantite_kg', label:"Quantité de tissu/fil (kg)", type:'text', required:true},
      {key:'couleurs_teintes', label:"Couleurs et teintes souhaitées", type:'text', required:true},
      {key:'prix_kg', label:"Prix de teinture (FCFA/kg)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TEINTURE NATURELLE DU COTON</h1>
<p>Entre <strong>{{nom_client}}</strong> et <strong>{{nom_teinturier}}</strong>,</p>
<h2>Article 1 — Objet</h2>
<p>Teinture naturelle de <strong>{{quantite_kg}} kg</strong> de tissu/fil de coton en <strong>{{couleurs_teintes}}</strong>.</p>
<h2>Article 2 — Matières colorantes</h2>
<p>Seules des matières colorantes naturelles (indigo naturel, plantes tinctoriales locales) sont utilisées, sans chrome ni produits cancérigènes.</p>
<h2>Article 3 — Tarification</h2>
<p>Prix : <strong>{{prix_kg}} FCFA/kg</strong> teint.</p>
<p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'cotton_broderie_tissu',
    name: "Accord de service de broderie sur tissu coton",
    category: 'agro_environnement',
    price: 2000, priceMax: 6000,
    description: "Contrat de prestation de broderie (main ou mécanique) sur tissu coton entre un atelier de broderie et un donneur d'ordre (couturier, boutique mode).",
    templateType: 'pdf', classe: 'C', active: true, popularity: 45,
    fieldsJson: F([
      {key:'nom_donneur_ordre', label:"Nom du donneur d'ordre", type:'text', required:true},
      {key:'nom_atelier', label:"Nom de l'atelier de broderie", type:'text', required:true},
      {key:'nombre_pieces', label:"Nombre de pièces à broder", type:'text', required:true},
      {key:'motif_description', label:"Description du motif", type:'textarea', required:true},
      {key:'prix_piece', label:"Prix par pièce (FCFA)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE BRODERIE SUR TISSU COTON</h1>
<p>Entre <strong>{{nom_donneur_ordre}}</strong> et <strong>{{nom_atelier}}</strong>,</p>
<h2>Article 1 — Objet</h2>
<p>Broderie de <strong>{{nombre_pieces}} pièces</strong> selon le motif suivant : <strong>{{motif_description}}</strong></p>
<h2>Article 2 — Tarification</h2>
<p>Prix : <strong>{{prix_piece}} FCFA</strong> par pièce brodée.</p>
<h2>Article 3 — Contrôle qualité</h2>
<p>Chaque pièce est contrôlée visuellement avant livraison. Les pièces non conformes sont reprises sans frais supplémentaires.</p>
<p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'cotton_partenariat_cooperative',
    name: "Accord de partenariat égreneuse-coopérative cotonnière",
    category: 'agro_environnement',
    price: 4000, priceMax: 12000,
    description: "Convention de partenariat stratégique entre une société d'égrenage et une coopérative de producteurs cotonniers, définissant les modalités d'encadrement, d'achat garanti et de partage des bénéfices.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'nom_egreneuse', label:"Nom de la société d'égrenage", type:'text', required:true},
      {key:'nom_cooperative', label:"Nom de la coopérative", type:'text', required:true},
      {key:'volume_garanti_tonnes', label:"Volume garanti par campagne (tonnes)", type:'text', required:true},
      {key:'prix_plancher', label:"Prix plancher garanti (FCFA/kg)", type:'text', required:true},
      {key:'services_encadrement', label:"Services d'encadrement fournis", type:'textarea', required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT ÉGRENEUSE-COOPÉRATIVE COTONNIÈRE</h1>
<p>Entre <strong>{{nom_egreneuse}}</strong> et <strong>{{nom_cooperative}}</strong>,</p>
<h2>Article 1 — Volume garanti</h2>
<p>La Société s'engage à acheter un minimum de <strong>{{volume_garanti_tonnes}} tonnes</strong> de coton graine par campagne.</p>
<h2>Article 2 — Prix plancher</h2>
<p>Prix plancher garanti : <strong>{{prix_plancher}} FCFA/kg</strong>, ajusté en cas de hausse du marché mondial.</p>
<h2>Article 3 — Encadrement</h2>
<p>{{services_encadrement}}</p>
<h2>Article 4 — Durée</h2>
<p>Accord renouvelable annuellement par tacite reconduction, sauf dénonciation 3 mois avant la campagne.</p>
<p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'cotton_recherche_varietale',
    name: "Accord de service de recherche variétale coton (CNRA CI)",
    category: 'agro_environnement',
    price: 5000, priceMax: 15000,
    description: "Convention de recherche et développement variétal du coton entre le CNRA (Centre National de Recherche Agronomique) de Côte d'Ivoire et un partenaire privé ou coopération internationale.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 42,
    fieldsJson: F([
      {key:'nom_partenaire', label:"Nom du partenaire", type:'text', required:true},
      {key:'programme_recherche', label:"Programme de recherche variétale", type:'text', required:true},
      {key:'budget_total', label:"Budget total (FCFA)", type:'text', required:true},
      {key:'duree_annees', label:"Durée du programme (années)", type:'text', required:true},
      {key:'date_debut', label:"Date de début", type:'date', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RECHERCHE VARIÉTALE COTON — CNRA CI</h1>
<p>Entre le CNRA Côte d'Ivoire et <strong>{{nom_partenaire}}</strong>,</p>
<h2>Article 1 — Programme</h2>
<p>Programme : <strong>{{programme_recherche}}</strong> — Durée : <strong>{{duree_annees}} ans</strong> à compter du <strong>{{date_debut}}</strong>.</p>
<h2>Article 2 — Budget</h2>
<p>Budget total : <strong>{{budget_total}} FCFA</strong>, réparti selon le plan de financement annexé.</p>
<h2>Article 3 — Propriété intellectuelle</h2>
<p>Les variétés issues du programme sont co-propriété des parties selon les apports respectifs documentés.</p>
<p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'cotton_vente_conventionnel',
    name: "Accord de vente de coton conventionnel (ICE futures)",
    category: 'agro_environnement',
    price: 5000, priceMax: 15000,
    description: "Contrat de vente de coton-fibre conventionnel référencé sur les marchés à terme ICE (New York), entre un exportateur ivoirien et un négociant international.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 52,
    fieldsJson: F([
      {key:'nom_vendeur', label:"Nom du vendeur (exportateur CI)", type:'text', required:true},
      {key:'nom_acheteur', label:"Nom de l'acheteur", type:'text', required:true},
      {key:'qualite_coton', label:"Qualité du coton (grade ICE)", type:'text', required:true},
      {key:'quantite_tonnes', label:"Quantité (tonnes métriques)", type:'text', required:true},
      {key:'prix_base_usd', label:"Prix de base (USD/livre, référence ICE)", type:'text', required:true},
      {key:'date_livraison', label:"Mois de livraison", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE VENTE DE COTON CONVENTIONNEL</h1>
<p>Entre <strong>{{nom_vendeur}}</strong> et <strong>{{nom_acheteur}}</strong>,</p>
<h2>Article 1 — Quantité et qualité</h2>
<p>Vente de <strong>{{quantite_tonnes}} tonnes</strong> de coton grade <strong>{{qualite_coton}}</strong>.</p>
<h2>Article 2 — Prix</h2>
<p>Prix : <strong>{{prix_base_usd}} USD/livre</strong> base ICE + prime/décote qualité et origine, livraison <strong>{{date_livraison}}</strong>.</p>
<h2>Article 3 — Arbitrage</h2>
<p>Tout litige est soumis à l'arbitrage de l'ICA (International Cotton Association) de Liverpool.</p>
<p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'cotton_residus_compostage',
    name: "Accord de service de gestion des résidus de culture coton (compostage)",
    category: 'agro_environnement',
    price: 2000, priceMax: 6000,
    description: "Contrat de collecte et compostage des résidus de culture de coton (tiges, feuilles) entre un groupement de producteurs et un opérateur de compostage, pour valorisation agronomique.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 45,
    fieldsJson: F([
      {key:'nom_groupement', label:"Nom du groupement de producteurs", type:'text', required:true},
      {key:'nom_operateur', label:"Nom de l'opérateur de compostage", type:'text', required:true},
      {key:'quantite_residus_tonnes', label:"Quantité de résidus (tonnes)", type:'text', required:true},
      {key:'prix_compost_retour', label:"Prix du compost en retour (FCFA/tonne)", type:'text', required:false},
      {key:'site_compostage', label:"Site de compostage", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GESTION DES RÉSIDUS DE CULTURE COTON</h1>
<p>Entre <strong>{{nom_groupement}}</strong> et <strong>{{nom_operateur}}</strong>,</p>
<h2>Article 1 — Collecte</h2>
<p>Collecte de <strong>{{quantite_residus_tonnes}} tonnes</strong> de résidus de coton pour compostage sur le site de <strong>{{site_compostage}}</strong>.</p>
<h2>Article 2 — Valorisation</h2>
<p>Le compost produit est restitué aux producteurs au prix de <strong>{{prix_compost_retour}} FCFA/tonne</strong> ou partagé selon un ratio convenu par avenant.</p>
<h2>Article 3 — Environnement</h2>
<p>Le compostage est réalisé selon les bonnes pratiques environnementales, sans brûlage à l'air libre des résidus.</p>
<p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'cotton_huile_trituration',
    name: "Accord de service d'huile de coton (trituration graine)",
    category: 'agro_environnement',
    price: 3500, priceMax: 10000,
    description: "Contrat de trituration de graines de coton pour extraction d'huile brute entre une huilerie industrielle et un fournisseur de graines, avec rendement garanti.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 52,
    fieldsJson: F([
      {key:'nom_fournisseur', label:"Nom du fournisseur de graines", type:'text', required:true},
      {key:'nom_huilerie', label:"Nom de l'huilerie", type:'text', required:true},
      {key:'quantite_graines_tonnes', label:"Quantité de graines (tonnes)", type:'text', required:true},
      {key:'taux_extraction_garanti', label:"Taux d'extraction garanti (%)", type:'text', required:true},
      {key:'tarif_tonne', label:"Tarif de trituration (FCFA/tonne de graines)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'HUILE DE COTON — TRITURATION</h1>
<p>Entre <strong>{{nom_fournisseur}}</strong> et <strong>{{nom_huilerie}}</strong>,</p>
<h2>Article 1 — Objet</h2>
<p>Trituration de <strong>{{quantite_graines_tonnes}} tonnes</strong> de graines de coton avec taux d'extraction garanti de <strong>{{taux_extraction_garanti}} %</strong>.</p>
<h2>Article 2 — Tarification</h2>
<p>Tarif : <strong>{{tarif_tonne}} FCFA/tonne</strong> de graines traitées. L'huile brute et le tourteau reviennent au Fournisseur.</p>
<h2>Article 3 — Qualité</h2>
<p>L'huile produite doit être conforme aux normes ivoiriennes d'huile brute de coton (Codex Alimentarius).</p>
<p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'cotton_tourteau_betail',
    name: "Accord de service de tourteau de coton (alimentation bétail)",
    category: 'agro_environnement',
    price: 2500, priceMax: 7000,
    description: "Contrat de fourniture de tourteau de coton (sous-produit d'huilerie) entre une huilerie et un éleveur ou fabricant d'aliment bétail, avec spécifications nutritionnelles.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'nom_huilerie', label:"Nom de l'huilerie (vendeur)", type:'text', required:true},
      {key:'nom_acheteur', label:"Nom de l'éleveur / fabricant", type:'text', required:true},
      {key:'quantite_tonnes', label:"Quantité de tourteau (tonnes)", type:'text', required:true},
      {key:'teneur_proteines', label:"Teneur en protéines minimale (%)", type:'text', required:true},
      {key:'prix_tonne', label:"Prix (FCFA/tonne)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — TOURTEAU DE COTON (ALIMENTATION BÉTAIL)</h1>
<p>Entre <strong>{{nom_huilerie}}</strong> et <strong>{{nom_acheteur}}</strong>,</p>
<h2>Article 1 — Produit</h2>
<p>Fourniture de <strong>{{quantite_tonnes}} tonnes</strong> de tourteau de coton, teneur minimale en protéines : <strong>{{teneur_proteines}} %</strong>.</p>
<h2>Article 2 — Prix</h2>
<p>Prix : <strong>{{prix_tonne}} FCFA/tonne</strong>, départ usine.</p>
<h2>Article 3 — Analyses</h2>
<p>Un bulletin d'analyse nutritionnelle est fourni par lot par un laboratoire agréé (LANADA ou équivalent).</p>
<p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'cotton_commerce_equitable',
    name: "Accord de service de commerce équitable coton",
    category: 'agro_environnement',
    price: 4000, priceMax: 12000,
    description: "Convention de commerce équitable sur le coton entre une organisation Fairtrade International et une coopérative de producteurs ivoiriens, incluant prime de commerce équitable.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 55,
    fieldsJson: F([
      {key:'nom_organisation_ft', label:"Nom de l'organisation Fairtrade", type:'text', required:true},
      {key:'nom_cooperative', label:"Nom de la coopérative", type:'text', required:true},
      {key:'volume_kg', label:"Volume commercialisé (kg)", type:'text', required:true},
      {key:'prime_ft_kg', label:"Prime Fairtrade (USD/kg)", type:'text', required:true},
      {key:'projet_prime', label:"Utilisation prévue de la prime", type:'textarea', required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE COMMERCE ÉQUITABLE — COTON</h1>
<p>Entre <strong>{{nom_organisation_ft}}</strong> et <strong>{{nom_cooperative}}</strong>,</p>
<h2>Article 1 — Volume et prime</h2>
<p>Commerce de <strong>{{volume_kg}} kg</strong> de coton certifié Fairtrade avec prime de <strong>{{prime_ft_kg}} USD/kg</strong>.</p>
<h2>Article 2 — Utilisation de la prime</h2>
<p>{{projet_prime}}</p>
<h2>Article 3 — Conformité</h2>
<p>La coopérative s'engage à respecter les standards Fairtrade International (travail des enfants, conditions de travail, démocratie interne).</p>
<p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'cotton_rapport_campagne',
    name: "Rapport de campagne cotonnière",
    category: 'agro_environnement',
    price: 2000, priceMax: 6000,
    description: "Modèle de rapport de campagne cotonnière à l'usage des sociétés d'égrenage, des coopératives et des services du MINADER, couvrant production, commercialisation et perspectives.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 48,
    fieldsJson: F([
      {key:'nom_structure', label:"Nom de la structure", type:'text', required:true},
      {key:'campagne', label:"Campagne (ex: 2025-2026)", type:'text', required:true},
      {key:'production_totale_tonnes', label:"Production totale (tonnes coton graine)", type:'text', required:true},
      {key:'superficie_cultivee_ha', label:"Superficie cultivée (ha)", type:'text', required:true},
      {key:'bilan_commercialisation', label:"Bilan commercialisation et difficultés", type:'textarea', required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE CAMPAGNE COTONNIÈRE</h1>
<p>Structure : <strong>{{nom_structure}}</strong> — Campagne : <strong>{{campagne}}</strong></p>
<h2>1. Production</h2>
<p>Production totale : <strong>{{production_totale_tonnes}} tonnes</strong> coton graine sur <strong>{{superficie_cultivee_ha}} ha</strong></p>
<h2>2. Commercialisation</h2>
<p>{{bilan_commercialisation}}</p>
<h2>3. Perspectives</h2>
<p>[À compléter selon les projections de la prochaine campagne]</p>
<p>Établi par : _________________ Date : _________________</p></div>`
  },
  {
    code: 'cotton_plan_developpement',
    name: "Plan de développement filière coton",
    category: 'agro_environnement',
    price: 5000, priceMax: 15000,
    description: "Document de planification stratégique pour le développement de la filière coton ivoirienne, à l'usage des institutions de la filière (INTERCOTON, MINADER, sociétés d'égrenage).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 45,
    fieldsJson: F([
      {key:'institution_porteur', label:"Institution porteuse du plan", type:'text', required:true},
      {key:'periode_plan', label:"Période couverte (ex: 2025-2030)", type:'text', required:true},
      {key:'objectif_production_tonnes', label:"Objectif de production (tonnes/an)", type:'text', required:true},
      {key:'axes_strategiques', label:"Axes stratégiques du plan", type:'textarea', required:true},
      {key:'budget_previsionnel', label:"Budget prévisionnel total (FCFA)", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT DE LA FILIÈRE COTON</h1>
<p>Institution : <strong>{{institution_porteur}}</strong> — Période : <strong>{{periode_plan}}</strong></p>
<h2>1. Objectif de production</h2>
<p>Atteindre <strong>{{objectif_production_tonnes}} tonnes</strong> de coton graine par an à l'horizon du plan.</p>
<h2>2. Axes stratégiques</h2>
<p>{{axes_strategiques}}</p>
<h2>3. Budget</h2>
<p>Budget prévisionnel total : <strong>{{budget_previsionnel}} FCFA</strong>, mobilisé auprès de l'État, des partenaires techniques et financiers.</p>
<h2>4. Suivi-évaluation</h2>
<p>Un comité de pilotage se réunit semestriellement pour évaluer les indicateurs de performance du plan.</p>
<p>Approuvé par : _________________ Date : _________________</p></div>`
  },
  {
    code: 'cotton_charte_durable',
    name: "Charte du coton durable et équitable",
    category: 'agro_environnement',
    price: 4000, priceMax: 12000,
    description: "Document de charte engageant l'ensemble des acteurs de la filière cotonnière ivoirienne sur les principes de durabilité environnementale, sociale et économique.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 45,
    fieldsJson: F([
      {key:'nom_signataire', label:"Nom de l'organisation signataire", type:'text', required:true},
      {key:'date_signature', label:"Date de signature", type:'date', required:true},
      {key:'engagements_specifiques', label:"Engagements spécifiques de l'organisation", type:'textarea', required:true},
      {key:'representant', label:"Nom et titre du représentant", type:'text', required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DU COTON DURABLE ET ÉQUITABLE EN CÔTE D'IVOIRE</h1>
<p>L'organisation <strong>{{nom_signataire}}</strong>, représentée par <strong>{{representant}}</strong>, s'engage sur les principes suivants :</p>
<h2>Principe 1 — Durabilité environnementale</h2>
<p>Réduction des intrants chimiques, préservation des sols et des eaux, promotion de l'agroécologie dans les zones cotonnières.</p>
<h2>Principe 2 — Équité sociale</h2>
<p>Garantie de revenus décents aux producteurs, interdiction du travail des enfants, promotion de l'égalité hommes-femmes dans la filière.</p>
<h2>Principe 3 — Engagements spécifiques</h2>
<p>{{engagements_specifiques}}</p>
<p>Fait à Abidjan, le <strong>{{date_signature}}</strong></p>
<p>Signature : _________________</p></div>`
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
  console.log(`Batch 96a OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
