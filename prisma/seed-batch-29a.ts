import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ─── PROMOTION IMMOBILIÈRE (25 templates) ───
  {
    code: 'promo_vefa_contrat',
    name: "Contrat de Promotion Immobilière VEFA",
    category: 'immobilier',
    price: 15000,
    priceMax: 50000,
    description: "Contrat de vente en etat futur d achevement conforme au droit OHADA pour promoteurs immobiliers.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 88,
    fieldsJson: F([
      { key: 'nom_promoteur', label: "Nom du promoteur", type: 'text', required: true },
      { key: 'nom_acquereur', label: "Nom de l acquereur", type: 'text', required: true },
      { key: 'adresse_bien', label: "Adresse du bien", type: 'text', required: true },
      { key: 'prix_vente', label: "Prix de vente (FCFA)", type: 'text', required: true },
      { key: 'date_livraison', label: "Date previsionnelle de livraison", type: 'date', required: true },
      { key: 'description_lot', label: "Description du lot", type: 'textarea', required: true }
    ]),
    body: `<div class="doc"><h1>CONTRAT DE VENTE EN ETAT FUTUR D ACHEVEMENT (VEFA)</h1><p>Entre le promoteur <strong>{{nom_promoteur}}</strong> et l acquereur <strong>{{nom_acquereur}}</strong>, il est convenu ce qui suit :</p><h2>Article 1 - Objet</h2><p>Le promoteur s engage a construire et livrer a l acquereur le bien immobilier situe a <strong>{{adresse_bien}}</strong>, decrit comme suit : {{description_lot}}</p><h2>Article 2 - Prix</h2><p>Le prix de vente est fixe a <strong>{{prix_vente}} FCFA</strong> payable selon l echeancier annexe.</p><h2>Article 3 - Livraison</h2><p>La livraison est prevue au plus tard le <strong>{{date_livraison}}</strong>.</p><h2>Article 4 - Garanties</h2><p>Le promoteur garantit l achevement des travaux conformement aux dispositions de l Acte Uniforme OHADA relatif aux contrats de promotion immobiliere.</p><p>Fait a Abidjan, le {{date_livraison}}</p></div>`
  },
  {
    code: 'promo_tableau_bord',
    name: "Tableau de Bord Promoteur Immobilier",
    category: 'immobilier',
    price: 8000,
    priceMax: 20000,
    description: "Document de suivi et de pilotage pour promoteurs immobiliers : avancement, ventes, tresorerie.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 72,
    fieldsJson: F([
      { key: 'nom_programme', label: "Nom du programme", type: 'text', required: true },
      { key: 'periode', label: "Periode de reporting", type: 'text', required: true },
      { key: 'nb_logements', label: "Nombre total de logements", type: 'text', required: true },
      { key: 'taux_vente', label: "Taux de commercialisation (%)", type: 'text', required: true },
      { key: 'avancement_travaux', label: "Avancement travaux (%)", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>TABLEAU DE BORD PROMOTEUR - {{nom_programme}}</h1><p><strong>Periode :</strong> {{periode}}</p><h2>Indicateurs Cles</h2><table border="1" cellpadding="8" style="width:100%;border-collapse:collapse"><tr><th>Indicateur</th><th>Valeur</th></tr><tr><td>Nombre total de logements</td><td>{{nb_logements}}</td></tr><tr><td>Taux de commercialisation</td><td>{{taux_vente}} %</td></tr><tr><td>Avancement des travaux</td><td>{{avancement_travaux}} %</td></tr></table><h2>Analyse et Recommandations</h2><p>Ce tableau de bord permet au promoteur de suivre l evolution du programme {{nom_programme}} et d anticiper les actions correctives necessaires.</p></div>`
  },
  {
    code: 'promo_plan_financement',
    name: "Plan de Financement Promoteur Immobilier",
    category: 'immobilier',
    price: 10000,
    priceMax: 30000,
    description: "Plan de financement detaille pour programme immobilier incluant fonds propres, emprunts et recettes de vente.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 79,
    fieldsJson: F([
      { key: 'nom_programme', label: "Nom du programme", type: 'text', required: true },
      { key: 'cout_total', label: "Cout total du programme (FCFA)", type: 'text', required: true },
      { key: 'fonds_propres', label: "Fonds propres apportes (FCFA)", type: 'text', required: true },
      { key: 'montant_emprunt', label: "Montant de l emprunt bancaire (FCFA)", type: 'text', required: true },
      { key: 'recettes_vfa', label: "Recettes previsionnelles VEFA (FCFA)", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>PLAN DE FINANCEMENT - {{nom_programme}}</h1><h2>Structure de Financement</h2><table border="1" cellpadding="8" style="width:100%;border-collapse:collapse"><tr><th>Source</th><th>Montant (FCFA)</th></tr><tr><td>Fonds propres</td><td>{{fonds_propres}}</td></tr><tr><td>Emprunt bancaire</td><td>{{montant_emprunt}}</td></tr><tr><td>Recettes VEFA previsionnelles</td><td>{{recettes_vfa}}</td></tr><tr><td><strong>Cout total du programme</strong></td><td><strong>{{cout_total}}</strong></td></tr></table><h2>Equilibre Financier</h2><p>Le present plan de financement demontre la viabilite economique du programme {{nom_programme}} conformement aux exigences des etablissements de credit partenaires.</p></div>`
  },
  {
    code: 'promo_convention_reservation',
    name: "Convention de Reservation Logement Neuf",
    category: 'immobilier',
    price: 6000,
    priceMax: 18000,
    description: "Convention de reservation prealable a l acte de vente VEFA, conforme a la reglementation OHADA.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 85,
    fieldsJson: F([
      { key: 'nom_reservant', label: "Nom du reservant", type: 'text', required: true },
      { key: 'nom_promoteur', label: "Nom du promoteur", type: 'text', required: true },
      { key: 'reference_lot', label: "Reference du lot reserve", type: 'text', required: true },
      { key: 'prix_previsionnel', label: "Prix previsionnel (FCFA)", type: 'text', required: true },
      { key: 'depot_garantie', label: "Montant du depot de garantie (FCFA)", type: 'text', required: true },
      { key: 'date_signature_acte', label: "Date limite signature acte de vente", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>CONVENTION DE RESERVATION LOGEMENT NEUF</h1><p>Entre <strong>{{nom_promoteur}}</strong> (le Reservant Vendeur) et <strong>{{nom_reservant}}</strong> (le Reservant Acquereur) :</p><h2>Article 1 - Objet de la Reservation</h2><p>Le present contrat a pour objet la reservation du lot reference <strong>{{reference_lot}}</strong> au prix previsionnel de <strong>{{prix_previsionnel}} FCFA</strong>.</p><h2>Article 2 - Depot de Garantie</h2><p>Le reservant acquereur verse un depot de garantie de <strong>{{depot_garantie}} FCFA</strong> consigne sur un compte special.</p><h2>Article 3 - Delai de Realisation</h2><p>L acte definitif de vente devra etre signe au plus tard le <strong>{{date_signature_acte}}</strong>.</p></div>`
  },
  {
    code: 'promo_acte_vente_vefa',
    name: "Acte de Vente VEFA Notarie",
    category: 'immobilier',
    price: 12000,
    priceMax: 40000,
    description: "Acte authentique de vente en etat futur d achevement signe devant notaire, conforme au droit ivoirien.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 90,
    fieldsJson: F([
      { key: 'nom_notaire', label: "Nom du notaire", type: 'text', required: true },
      { key: 'nom_vendeur', label: "Nom du vendeur / promoteur", type: 'text', required: true },
      { key: 'nom_acquereur', label: "Nom de l acquereur", type: 'text', required: true },
      { key: 'description_bien', label: "Description complete du bien", type: 'textarea', required: true },
      { key: 'prix_acte', label: "Prix stipule a l acte (FCFA)", type: 'text', required: true },
      { key: 'date_acte', label: "Date de signature de l acte", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>ACTE DE VENTE EN ETAT FUTUR D ACHEVEMENT</h1><p>Recu par Maitre <strong>{{nom_notaire}}</strong>, notaire a Abidjan.</p><h2>Entre les soussignes</h2><p><strong>Vendeur :</strong> {{nom_vendeur}}</p><p><strong>Acquereur :</strong> {{nom_acquereur}}</p><h2>Designation du Bien</h2><p>{{description_bien}}</p><h2>Prix et Modalites de Paiement</h2><p>La vente est consentie et acceptee moyennant le prix de <strong>{{prix_acte}} FCFA</strong> paye selon l echeancier contractuel.</p><p>Signe le <strong>{{date_acte}}</strong> en l etude notariale.</p></div>`
  },
  {
    code: 'promo_gfa',
    name: "Garantie Financiere d Achevement (GFA)",
    category: 'immobilier',
    price: 10000,
    priceMax: 35000,
    description: "Document de garantie financiere d achevement delivre par un etablissement bancaire ou une compagnie d assurance.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 76,
    fieldsJson: F([
      { key: 'nom_garant', label: "Nom de l etablissement garant", type: 'text', required: true },
      { key: 'nom_promoteur', label: "Nom du promoteur", type: 'text', required: true },
      { key: 'nom_programme', label: "Denomination du programme", type: 'text', required: true },
      { key: 'montant_garantie', label: "Montant garanti (FCFA)", type: 'text', required: true },
      { key: 'date_expiration', label: "Date d expiration de la garantie", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>GARANTIE FINANCIERE D ACHEVEMENT</h1><p><strong>{{nom_garant}}</strong> (l Etablissement Garant) s engage irrevocablement envers les acquereurs du programme <strong>{{nom_programme}}</strong> realise par <strong>{{nom_promoteur}}</strong>.</p><h2>Objet de la Garantie</h2><p>La presente garantie couvre le financement de l achevement des travaux a hauteur de <strong>{{montant_garantie}} FCFA</strong> en cas de defaillance du promoteur.</p><h2>Duree</h2><p>Cette garantie est valable jusqu au <strong>{{date_expiration}}</strong> ou jusqu a la livraison effective de l ensemble des lots.</p><h2>Mise en Jeu</h2><p>La garantie pourra etre mise en jeu par tout acquereur justifiant d un retard de livraison superieur a six (6) mois.</p></div>`
  },
  {
    code: 'promo_ccmi',
    name: "Contrat de Construction de Maison Individuelle (CCMI)",
    category: 'immobilier',
    price: 9000,
    priceMax: 28000,
    description: "Contrat CCMI liant le maitre d ouvrage a un constructeur pour la realisation d une maison individuelle.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 82,
    fieldsJson: F([
      { key: 'nom_constructeur', label: "Nom du constructeur", type: 'text', required: true },
      { key: 'nom_maitre_ouvrage', label: "Nom du maitre d ouvrage", type: 'text', required: true },
      { key: 'adresse_terrain', label: "Adresse du terrain de construction", type: 'text', required: true },
      { key: 'prix_construction', label: "Prix forfaitaire de construction (FCFA)", type: 'text', required: true },
      { key: 'delai_travaux', label: "Delai d execution des travaux (mois)", type: 'text', required: true },
      { key: 'date_ouverture_chantier', label: "Date prevue d ouverture de chantier", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>CONTRAT DE CONSTRUCTION DE MAISON INDIVIDUELLE (CCMI)</h1><p>Entre <strong>{{nom_constructeur}}</strong> (le Constructeur) et <strong>{{nom_maitre_ouvrage}}</strong> (le Maitre d Ouvrage) :</p><h2>Article 1 - Objet</h2><p>Le Constructeur s engage a edifier une maison individuelle sur le terrain situe a <strong>{{adresse_terrain}}</strong>.</p><h2>Article 2 - Prix et Paiement</h2><p>Le prix forfaitaire et definitif est fixe a <strong>{{prix_construction}} FCFA</strong>, payable par tranches selon l avancement des travaux.</p><h2>Article 3 - Delai</h2><p>Les travaux dureront <strong>{{delai_travaux}} mois</strong> a compter du <strong>{{date_ouverture_chantier}}</strong>.</p><h2>Article 4 - Garanties</h2><p>Le Constructeur garantit la solidite de l ouvrage et la conformite aux plans approuves.</p></div>`
  },
  {
    code: 'promo_contrat_moe',
    name: "Contrat de Maitrise d Oeuvre d Execution (MOE)",
    category: 'immobilier',
    price: 8000,
    priceMax: 25000,
    description: "Contrat liant le promoteur ou maitre d ouvrage a un bureau d etudes pour la maitrise d oeuvre d execution.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'nom_moe', label: "Nom / Raison sociale du MOE", type: 'text', required: true },
      { key: 'nom_moa', label: "Nom du maitre d ouvrage", type: 'text', required: true },
      { key: 'objet_mission', label: "Objet de la mission", type: 'textarea', required: true },
      { key: 'honoraires', label: "Montant des honoraires (FCFA)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de debut de mission", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>CONTRAT DE MAITRISE D OEUVRE D EXECUTION (MOE)</h1><p>Entre <strong>{{nom_moa}}</strong> (le Maitre d Ouvrage) et <strong>{{nom_moe}}</strong> (le Maitre d Oeuvre) :</p><h2>Article 1 - Mission</h2><p>{{objet_mission}}</p><h2>Article 2 - Honoraires</h2><p>Les honoraires sont fixes a <strong>{{honoraires}} FCFA</strong> toutes taxes comprises.</p><h2>Article 3 - Prise d Effet</h2><p>Le present contrat prend effet a compter du <strong>{{date_debut}}</strong>.</p><h2>Article 4 - Responsabilites</h2><p>Le Maitre d Oeuvre est responsable de la conformite des travaux aux plans et aux normes techniques en vigueur en Cote d Ivoire.</p></div>`
  },
  {
    code: 'promo_contrat_amo',
    name: "Contrat AMO - Assistance a Maitrise d Ouvrage",
    category: 'immobilier',
    price: 7000,
    priceMax: 22000,
    description: "Contrat d assistance a maitrise d ouvrage pour accompagner le promoteur dans ses decisions techniques et financieres.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'nom_amo', label: "Nom / Societe AMO", type: 'text', required: true },
      { key: 'nom_client', label: "Nom du client (maitre d ouvrage)", type: 'text', required: true },
      { key: 'perimetre_mission', label: "Perimetre de la mission AMO", type: 'textarea', required: true },
      { key: 'honoraires_amo', label: "Honoraires AMO (FCFA)", type: 'text', required: true },
      { key: 'duree_mission', label: "Duree de la mission (mois)", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>CONTRAT D ASSISTANCE A MAITRISE D OUVRAGE (AMO)</h1><p>Entre <strong>{{nom_client}}</strong> (le Client) et <strong>{{nom_amo}}</strong> (l Assistant a Maitrise d Ouvrage) :</p><h2>Article 1 - Perimetre de Mission</h2><p>{{perimetre_mission}}</p><h2>Article 2 - Duree</h2><p>La mission est prevue pour une duree de <strong>{{duree_mission}} mois</strong>.</p><h2>Article 3 - Remuneration</h2><p>Les honoraires sont fixes a <strong>{{honoraires_amo}} FCFA</strong>.</p><h2>Article 4 - Independance</h2><p>L AMO agit de maniere independante et dans l interet exclusif du Client.</p></div>`
  },
  {
    code: 'promo_convention_lotissement',
    name: "Convention de Lotissement Promoteur",
    category: 'immobilier',
    price: 11000,
    priceMax: 35000,
    description: "Convention entre le promoteur et les autorites pour la realisation d une operation de lotissement.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'nom_promoteur', label: "Nom du promoteur lotisseur", type: 'text', required: true },
      { key: 'autorite_competente', label: "Autorite competente signataire", type: 'text', required: true },
      { key: 'localisation', label: "Localisation du lotissement", type: 'text', required: true },
      { key: 'superficie_totale', label: "Superficie totale (m2 ou ha)", type: 'text', required: true },
      { key: 'nb_lots', label: "Nombre de lots prevus", type: 'text', required: true },
      { key: 'date_achevement', label: "Date d achevement des VRD", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>CONVENTION DE LOTISSEMENT</h1><p>Entre <strong>{{autorite_competente}}</strong> (l Autorite) et <strong>{{nom_promoteur}}</strong> (le Promoteur Lotisseur) :</p><h2>Article 1 - Objet</h2><p>La presente convention autorise le Promoteur a realiser une operation de lotissement sur le site de <strong>{{localisation}}</strong>, d une superficie de <strong>{{superficie_totale}}</strong>, comportant <strong>{{nb_lots}}</strong> lots.</p><h2>Article 2 - Obligations du Promoteur</h2><p>Le Promoteur s engage a realiser les voiries et reseaux divers (VRD) au plus tard le <strong>{{date_achevement}}</strong> et a les remettre aux gestionnaires competents.</p><h2>Article 3 - Controle</h2><p>L Autorite assurera le suivi et le controle de l operation conformement aux textes en vigueur.</p></div>`
  },
  {
    code: 'promo_reglement_lotissement',
    name: "Reglement de Lotissement",
    category: 'immobilier',
    price: 6000,
    priceMax: 18000,
    description: "Document reglementaire fixant les conditions d utilisation des lots et les regles d urbanisme du lotissement.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 62,
    fieldsJson: F([
      { key: 'nom_lotissement', label: "Denomination du lotissement", type: 'text', required: true },
      { key: 'commune', label: "Commune d implantation", type: 'text', required: true },
      { key: 'zone_urbanisme', label: "Zone d urbanisme (ex : R1, R2)", type: 'text', required: true },
      { key: 'surface_min_lot', label: "Surface minimale d un lot (m2)", type: 'text', required: true },
      { key: 'hauteur_max', label: "Hauteur maximale des constructions (m)", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>REGLEMENT DU LOTISSEMENT {{nom_lotissement}}</h1><p><strong>Commune :</strong> {{commune}} | <strong>Zone :</strong> {{zone_urbanisme}}</p><h2>Article 1 - Champ d Application</h2><p>Le present reglement s applique a l ensemble des lots du lotissement <strong>{{nom_lotissement}}</strong>.</p><h2>Article 2 - Regles de Construction</h2><ul><li>Surface minimale des lots : <strong>{{surface_min_lot}} m2</strong></li><li>Hauteur maximale des constructions : <strong>{{hauteur_max}} m</strong></li></ul><h2>Article 3 - Servitudes</h2><p>Aucune construction ne pourra etre edifice dans les marges de recul et servitudes definies au plan de lotissement.</p><h2>Article 4 - Esthetique</h2><p>Les constructions devront s integrer harmonieusement au cadre environnemental du lotissement.</p></div>`
  },
  {
    code: 'promo_cahier_charges_lot',
    name: "Cahier des Charges de Lotissement",
    category: 'immobilier',
    price: 7000,
    priceMax: 22000,
    description: "Cahier des charges definissant les obligations des acquereurs de lots dans une operation de lotissement.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 64,
    fieldsJson: F([
      { key: 'nom_lotissement', label: "Nom du lotissement", type: 'text', required: true },
      { key: 'promoteur_lotisseur', label: "Nom du promoteur lotisseur", type: 'text', required: true },
      { key: 'nature_travaux_admis', label: "Nature des travaux et constructions admis", type: 'textarea', required: true },
      { key: 'delai_construction', label: "Delai maximum pour construire (ans)", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>CAHIER DES CHARGES - LOTISSEMENT {{nom_lotissement}}</h1><p>Etabli par <strong>{{promoteur_lotisseur}}</strong>, le present cahier des charges s impose a tout acquereur de lot.</p><h2>Article 1 - Nature des Constructions</h2><p>{{nature_travaux_admis}}</p><h2>Article 2 - Delai de Construction</h2><p>Tout acquereur devra entreprendre les travaux de construction dans un delai de <strong>{{delai_construction}} ans</strong> a compter de la delivrance du titre foncier.</p><h2>Article 3 - Entretien</h2><p>Chaque proprietaire est tenu d entretenir son lot en bon etat et de ne pas y deposer de materiaux insalubres.</p><h2>Article 4 - Sanctions</h2><p>Le non-respect du present cahier des charges pourra entrainer des penalites conformement aux stipulations contractuelles.</p></div>`
  },
  {
    code: 'promo_plan_commercialisation',
    name: "Plan de Commercialisation Programme Immobilier",
    category: 'immobilier',
    price: 8000,
    priceMax: 24000,
    description: "Document strategique definissant le plan de commercialisation d un programme immobilier neuf.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 74,
    fieldsJson: F([
      { key: 'nom_programme', label: "Nom du programme immobilier", type: 'text', required: true },
      { key: 'cible_clientele', label: "Cible clientele principale", type: 'text', required: true },
      { key: 'prix_moyen_m2', label: "Prix moyen au m2 (FCFA)", type: 'text', required: true },
      { key: 'canaux_distribution', label: "Canaux de distribution prevus", type: 'textarea', required: true },
      { key: 'budget_marketing', label: "Budget marketing alloue (FCFA)", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>PLAN DE COMMERCIALISATION - {{nom_programme}}</h1><h2>1. Analyse de la Cible</h2><p>Le programme <strong>{{nom_programme}}</strong> cible principalement : <strong>{{cible_clientele}}</strong></p><h2>2. Politique Tarifaire</h2><p>Prix moyen au m2 : <strong>{{prix_moyen_m2}} FCFA</strong></p><h2>3. Canaux de Distribution</h2><p>{{canaux_distribution}}</p><h2>4. Budget Marketing</h2><p>Budget total alloue a la commercialisation : <strong>{{budget_marketing}} FCFA</strong></p><h2>5. Objectifs</h2><p>Atteindre un taux de reservation de 70 % avant le demarrage des travaux de gros oeuvre.</p></div>`
  },
  {
    code: 'promo_vente_bloc_investisseur',
    name: "Contrat de Vente en Bloc a un Investisseur",
    category: 'immobilier',
    price: 14000,
    priceMax: 45000,
    description: "Contrat de cession en bloc de plusieurs lots ou logements d un programme a un investisseur institutionnel ou prive.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 71,
    fieldsJson: F([
      { key: 'nom_cedant', label: "Nom du cedant (promoteur)", type: 'text', required: true },
      { key: 'nom_investisseur', label: "Nom de l investisseur acquereur", type: 'text', required: true },
      { key: 'nb_lots_cedes', label: "Nombre de lots cedes", type: 'text', required: true },
      { key: 'prix_bloc', label: "Prix global de la cession en bloc (FCFA)", type: 'text', required: true },
      { key: 'remise_accordee', label: "Remise accordee par rapport au prix liste (%)", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature du contrat", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>CONTRAT DE VENTE EN BLOC A UN INVESTISSEUR</h1><p>Entre <strong>{{nom_cedant}}</strong> (le Cedant) et <strong>{{nom_investisseur}}</strong> (l Investisseur Acquereur) :</p><h2>Article 1 - Objet</h2><p>Le Cedant cede a l Investisseur <strong>{{nb_lots_cedes}} lots</strong> du programme pour un prix global de <strong>{{prix_bloc}} FCFA</strong>, representant une remise de <strong>{{remise_accordee}} %</strong> sur le prix liste.</p><h2>Article 2 - Conditions</h2><p>Cette cession est consentie sous condition de paiement comptant de 50 % a la signature et du solde a la livraison.</p><h2>Article 3 - Engagement</h2><p>L Investisseur s engage a ne pas revendre les lots a des prix inferieurs au prix de liste du promoteur pendant une duree de 24 mois.</p><p>Signe le <strong>{{date_signature}}</strong>.</p></div>`
  },
  {
    code: 'promo_contrat_agence_commerc',
    name: "Contrat d Agence Immobiliere pour Commercialisation",
    category: 'immobilier',
    price: 7000,
    priceMax: 20000,
    description: "Contrat liant le promoteur a une agence immobiliere pour la commercialisation exclusive ou partagee de son programme.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 78,
    fieldsJson: F([
      { key: 'nom_promoteur', label: "Nom du promoteur mandant", type: 'text', required: true },
      { key: 'nom_agence', label: "Nom de l agence immobiliere", type: 'text', required: true },
      { key: 'nom_programme', label: "Programme a commercialiser", type: 'text', required: true },
      { key: 'taux_commission', label: "Taux de commission (%)", type: 'text', required: true },
      { key: 'exclusivite', label: "Exclusivite : oui ou non", type: 'text', required: true },
      { key: 'duree_mandat', label: "Duree du mandat (mois)", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>CONTRAT D AGENCE IMMOBILIERE - COMMERCIALISATION</h1><p>Mandat donne par <strong>{{nom_promoteur}}</strong> a <strong>{{nom_agence}}</strong> pour la commercialisation du programme <strong>{{nom_programme}}</strong>.</p><h2>Article 1 - Mission</h2><p>L Agence est mandatee pour prospecter, presenter et conclure des reservations pour les lots du programme sus-designe.</p><h2>Article 2 - Commission</h2><p>L Agence percevra une commission de <strong>{{taux_commission}} %</strong> HT du prix de vente de chaque lot vendu.</p><h2>Article 3 - Exclusivite</h2><p>Exclusivite : <strong>{{exclusivite}}</strong>. Duree du mandat : <strong>{{duree_mandat}} mois</strong>.</p></div>`
  },
  {
    code: 'promo_notice_descriptive',
    name: "Notice Descriptive Technique VEFA",
    category: 'immobilier',
    price: 6000,
    priceMax: 18000,
    description: "Notice descriptive annexee au contrat VEFA detaillant les specifications techniques des logements.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 80,
    fieldsJson: F([
      { key: 'nom_programme', label: "Nom du programme", type: 'text', required: true },
      { key: 'type_logement', label: "Type de logement (ex : F3, villa T4)", type: 'text', required: true },
      { key: 'specifications_gros_oeuvre', label: "Specifications gros oeuvre", type: 'textarea', required: true },
      { key: 'finitions', label: "Finitions et equipements", type: 'textarea', required: true }
    ]),
    body: `<div class="doc"><h1>NOTICE DESCRIPTIVE TECHNIQUE VEFA</h1><p><strong>Programme :</strong> {{nom_programme}} | <strong>Type :</strong> {{type_logement}}</p><h2>1. Gros Oeuvre et Structure</h2><p>{{specifications_gros_oeuvre}}</p><h2>2. Finitions et Equipements</h2><p>{{finitions}}</p><h2>3. Reseaux et Installations</h2><p>Plomberie : raccordement eau froide / eau chaude solaire. Electricite : tableau electrique aux normes NF C 15-100 adaptees. Climatisation : gaines preinstallees dans les principales pieces.</p><h2>Note</h2><p>La presente notice est contractuelle et constitue une annexe au contrat de vente VEFA.</p></div>`
  },
  {
    code: 'promo_plan_communication',
    name: "Plan de Communication Programme Immobilier",
    category: 'immobilier',
    price: 7000,
    priceMax: 20000,
    description: "Plan de communication pour le lancement et la promotion d un programme immobilier neuf en Afrique.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 66,
    fieldsJson: F([
      { key: 'nom_programme', label: "Nom du programme", type: 'text', required: true },
      { key: 'date_lancement', label: "Date de lancement commercial", type: 'date', required: true },
      { key: 'supports_prevus', label: "Supports de communication prevus", type: 'textarea', required: true },
      { key: 'budget_communication', label: "Budget communication (FCFA)", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>PLAN DE COMMUNICATION - {{nom_programme}}</h1><p><strong>Lancement :</strong> {{date_lancement}}</p><h2>1. Objectifs</h2><p>Assurer la notoriete du programme et atteindre les objectifs de reservation dans les delais impartis.</p><h2>2. Supports de Communication</h2><p>{{supports_prevus}}</p><h2>3. Budget</h2><p>Budget global alloue : <strong>{{budget_communication}} FCFA</strong></p><h2>4. Calendrier</h2><p>Phase teaser : J-30 avant lancement. Phase lancement : semaine du {{date_lancement}}. Phase soutien : pendant toute la duree de commercialisation.</p></div>`
  },
  {
    code: 'promo_garantie_decennale',
    name: "Convention Garantie Decennale Promoteur",
    category: 'immobilier',
    price: 9000,
    priceMax: 28000,
    description: "Convention de garantie decennale souscrite par le promoteur aupres d une compagnie d assurance.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 73,
    fieldsJson: F([
      { key: 'nom_assureur', label: "Nom de la compagnie d assurance", type: 'text', required: true },
      { key: 'nom_promoteur', label: "Nom du promoteur assure", type: 'text', required: true },
      { key: 'reference_programme', label: "Reference du programme couvert", type: 'text', required: true },
      { key: 'montant_couverture', label: "Montant de la couverture (FCFA)", type: 'text', required: true },
      { key: 'date_reception', label: "Date de reception des travaux", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>CONVENTION DE GARANTIE DECENNALE</h1><p><strong>Assureur :</strong> {{nom_assureur}} | <strong>Assure :</strong> {{nom_promoteur}}</p><h2>Article 1 - Objet</h2><p>La presente convention garantit la solidite et la conformite des ouvrages du programme <strong>{{reference_programme}}</strong> pendant dix (10) ans a compter de la reception des travaux le <strong>{{date_reception}}</strong>.</p><h2>Article 2 - Couverture</h2><p>Le montant maximum garantie est de <strong>{{montant_couverture}} FCFA</strong>.</p><h2>Article 3 - Sinistres</h2><p>Tout sinistre devra etre declare dans les 5 jours ouvrables a l Assureur par lettre recommandee avec accuse de reception.</p></div>`
  },
  {
    code: 'promo_rapport_chantier',
    name: "Rapport de Chantier Mensuel Promoteur",
    category: 'immobilier',
    price: 5000,
    priceMax: 15000,
    description: "Rapport mensuel d avancement du chantier a destination du promoteur et des parties prenantes.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 77,
    fieldsJson: F([
      { key: 'nom_programme', label: "Nom du programme", type: 'text', required: true },
      { key: 'mois_rapport', label: "Mois de reporting", type: 'text', required: true },
      { key: 'avancement_gros_oeuvre', label: "Avancement gros oeuvre (%)", type: 'text', required: true },
      { key: 'observations', label: "Observations et points d alerte", type: 'textarea', required: true },
      { key: 'date_rapport', label: "Date d etablissement du rapport", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>RAPPORT DE CHANTIER MENSUEL - {{nom_programme}}</h1><p><strong>Mois :</strong> {{mois_rapport}} | <strong>Date :</strong> {{date_rapport}}</p><h2>Avancement des Travaux</h2><table border="1" cellpadding="8" style="width:100%;border-collapse:collapse"><tr><th>Phase</th><th>Avancement</th></tr><tr><td>Gros Oeuvre</td><td>{{avancement_gros_oeuvre}} %</td></tr></table><h2>Observations et Points d Alerte</h2><p>{{observations}}</p><h2>Actions a Mener</h2><p>Les actions correctives identifiees seront mises en oeuvre dans les 15 jours suivant l emission du present rapport.</p></div>`
  },
  {
    code: 'promo_pv_livraison_vefa',
    name: "Proces-Verbal de Livraison VEFA",
    category: 'immobilier',
    price: 6000,
    priceMax: 18000,
    description: "Proces-verbal constatant la livraison du bien VEFA a l acquereur avec liste des reserves eventuelles.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 86,
    fieldsJson: F([
      { key: 'nom_promoteur', label: "Nom du promoteur", type: 'text', required: true },
      { key: 'nom_acquereur', label: "Nom de l acquereur", type: 'text', required: true },
      { key: 'reference_lot', label: "Reference du lot livre", type: 'text', required: true },
      { key: 'date_livraison', label: "Date effective de livraison", type: 'date', required: true },
      { key: 'reserves', label: "Liste des reserves emises", type: 'textarea', required: false }
    ]),
    body: `<div class="doc"><h1>PROCES-VERBAL DE LIVRAISON VEFA</h1><p>Le <strong>{{date_livraison}}</strong>, en presence de <strong>{{nom_promoteur}}</strong> et de <strong>{{nom_acquereur}}</strong> :</p><h2>Identification du Bien</h2><p>Lot reference : <strong>{{reference_lot}}</strong></p><h2>Constatations</h2><p>L acquereur a pris possession du bien sus-designe apres visite contradictoire.</p><h2>Reserves</h2><p>{{reserves}}</p><h2>Levee des Reserves</h2><p>Le promoteur s engage a lever les reserves sous 30 jours. A defaut, l acquereur pourra consigner les sommes retenues.</p><p><strong>Signatures des parties</strong></p></div>`
  },
  {
    code: 'promo_contrat_gardiennage',
    name: "Contrat de Gardiennage de Programme Immobilier",
    category: 'immobilier',
    price: 4000,
    priceMax: 12000,
    description: "Contrat de prestation de gardiennage et surveillance d un programme immobilier en cours de construction.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'nom_entreprise_securite', label: "Nom de l entreprise de securite", type: 'text', required: true },
      { key: 'nom_promoteur', label: "Nom du promoteur", type: 'text', required: true },
      { key: 'adresse_chantier', label: "Adresse du chantier", type: 'text', required: true },
      { key: 'cout_mensuel', label: "Cout mensuel du service (FCFA)", type: 'text', required: true },
      { key: 'duree_contrat', label: "Duree du contrat (mois)", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>CONTRAT DE GARDIENNAGE DE CHANTIER</h1><p>Entre <strong>{{nom_promoteur}}</strong> (le Client) et <strong>{{nom_entreprise_securite}}</strong> (le Prestataire) :</p><h2>Article 1 - Objet</h2><p>Le Prestataire assure la surveillance et le gardiennage du chantier situe a <strong>{{adresse_chantier}}</strong>.</p><h2>Article 2 - Duree et Prix</h2><p>Duree du contrat : <strong>{{duree_contrat}} mois</strong>. Remuneration mensuelle : <strong>{{cout_mensuel}} FCFA</strong>.</p><h2>Article 3 - Obligations</h2><p>Le Prestataire assurera une permanence 24h/24 et 7j/7, tiendra un registre de ronde et signalera tout incident dans l heure.</p></div>`
  },
  {
    code: 'promo_convention_syndic_prov',
    name: "Convention de Syndic Provisoire de Copropriete",
    category: 'immobilier',
    price: 6000,
    priceMax: 18000,
    description: "Convention designant un syndic provisoire pour gerer la copropriete pendant la periode transitoire post-livraison.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 67,
    fieldsJson: F([
      { key: 'nom_syndic', label: "Nom du syndic provisoire", type: 'text', required: true },
      { key: 'nom_programme', label: "Nom de la residence / programme", type: 'text', required: true },
      { key: 'duree_mandat', label: "Duree du mandat provisoire (mois)", type: 'text', required: true },
      { key: 'honoraires_syndic', label: "Honoraires annuels (FCFA)", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>CONVENTION DE SYNDIC PROVISOIRE</h1><p><strong>Residence :</strong> {{nom_programme}} | <strong>Syndic :</strong> {{nom_syndic}}</p><h2>Article 1 - Nomination</h2><p>Le promoteur designe <strong>{{nom_syndic}}</strong> comme syndic provisoire de la residence <strong>{{nom_programme}}</strong> pour une duree de <strong>{{duree_mandat}} mois</strong>.</p><h2>Article 2 - Mission</h2><p>Le Syndic Provisoire est charge de l administration des parties communes, du recouvrement des charges et de la preparation de la premiere assemblee generale ordinaire.</p><h2>Article 3 - Remuneration</h2><p>Les honoraires sont fixes a <strong>{{honoraires_syndic}} FCFA</strong> par an.</p></div>`
  },
  {
    code: 'promo_accord_portage_foncier',
    name: "Accord de Portage Foncier",
    category: 'immobilier',
    price: 12000,
    priceMax: 38000,
    description: "Accord par lequel un porteur detient temporairement un terrain foncier pour le compte d un promoteur.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 63,
    fieldsJson: F([
      { key: 'nom_porteur', label: "Nom du porteur foncier", type: 'text', required: true },
      { key: 'nom_promoteur', label: "Nom du promoteur beneficiaire", type: 'text', required: true },
      { key: 'description_terrain', label: "Description et localisation du terrain", type: 'textarea', required: true },
      { key: 'duree_portage', label: "Duree du portage (mois)", type: 'text', required: true },
      { key: 'remuneration_porteur', label: "Remuneration du porteur (FCFA ou %)", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE PORTAGE FONCIER</h1><p>Entre <strong>{{nom_promoteur}}</strong> (le Beneficiaire) et <strong>{{nom_porteur}}</strong> (le Porteur) :</p><h2>Article 1 - Objet</h2><p>Le Porteur accepte de detenir en son nom propre le terrain ci-apres decrit pour le compte exclusif du Beneficiaire : {{description_terrain}}</p><h2>Article 2 - Duree</h2><p>Le portage est consenti pour une duree de <strong>{{duree_portage}} mois</strong>.</p><h2>Article 3 - Remuneration</h2><p>Le Porteur percevra : <strong>{{remuneration_porteur}}</strong>.</p><h2>Article 4 - Retrocession</h2><p>Le Porteur s engage irrevocablement a retroceder le terrain au Beneficiaire ou a toute personne designee par lui, a premiere demande.</p></div>`
  },
  {
    code: 'promo_convention_sci_construction',
    name: "Convention de SCI de Construction-Vente",
    category: 'immobilier',
    price: 13000,
    priceMax: 40000,
    description: "Convention regissant une SCI constituee pour la construction et la vente d un programme immobilier.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 69,
    fieldsJson: F([
      { key: 'denomination_sci', label: "Denomination de la SCI", type: 'text', required: true },
      { key: 'associes', label: "Noms des associes et parts respectives", type: 'textarea', required: true },
      { key: 'objet_social', label: "Objet social de la SCI", type: 'text', required: true },
      { key: 'capital_social', label: "Capital social (FCFA)", type: 'text', required: true },
      { key: 'date_creation', label: "Date de creation de la SCI", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>CONVENTION DE SCI DE CONSTRUCTION-VENTE</h1><h2>Identification</h2><p><strong>Denomination :</strong> {{denomination_sci}}</p><p><strong>Capital social :</strong> {{capital_social}} FCFA</p><p><strong>Objet :</strong> {{objet_social}}</p><p><strong>Date de creation :</strong> {{date_creation}}</p><h2>Associes et Repartition des Parts</h2><p>{{associes}}</p><h2>Gouvernance</h2><p>La SCI est geree par un gerant elu en assemblee generale, disposant des pouvoirs les plus etendus pour agir au nom de la societe dans l interet de l objet social.</p><h2>Distribution des Benefices</h2><p>Les benefices nets sont distribues aux associes proportionnellement a leurs parts sociales apres cloture du programme.</p></div>`
  },
  {
    code: 'promo_rapport_cloture',
    name: "Rapport de Cloture de Programme Immobilier",
    category: 'immobilier',
    price: 8000,
    priceMax: 25000,
    description: "Rapport de fin de programme immobilier presentant le bilan technique, commercial et financier de l operation.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'nom_programme', label: "Nom du programme", type: 'text', required: true },
      { key: 'date_lancement', label: "Date de lancement du programme", type: 'date', required: true },
      { key: 'date_cloture', label: "Date de cloture du programme", type: 'date', required: true },
      { key: 'bilan_financier', label: "Synthese du bilan financier", type: 'textarea', required: true },
      { key: 'enseignements', label: "Principaux enseignements", type: 'textarea', required: true }
    ]),
    body: `<div class="doc"><h1>RAPPORT DE CLOTURE - {{nom_programme}}</h1><p><strong>Lancement :</strong> {{date_lancement}} | <strong>Cloture :</strong> {{date_cloture}}</p><h2>1. Bilan Commercial</h2><p>L ensemble des lots a ete commercialise. Le programme est considere comme vendu a 100 %.</p><h2>2. Bilan Financier</h2><p>{{bilan_financier}}</p><h2>3. Bilan Technique</h2><p>Les travaux ont ete realises conformement aux plans et notices descriptives. Les reserves ont ete levees dans les delais contractuels.</p><h2>4. Enseignements</h2><p>{{enseignements}}</p></div>`
  },

  // ─── GESTION LOCATIVE AVANCEE (25 templates) ───
  {
    code: 'gloc_mandat_gestion',
    name: "Mandat de Gestion Locative Complet",
    category: 'immobilier',
    price: 6000,
    priceMax: 18000,
    description: "Mandat complet donnant pouvoir a une agence de gerer un bien locatif : recherche locataire, encaissement, entretien.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 87,
    fieldsJson: F([
      { key: 'nom_mandant', label: "Nom du proprietaire mandant", type: 'text', required: true },
      { key: 'nom_mandataire', label: "Nom de l agence mandataire", type: 'text', required: true },
      { key: 'adresse_bien', label: "Adresse du bien a gerer", type: 'text', required: true },
      { key: 'taux_gestion', label: "Taux d honoraires de gestion (% loyer TTC)", type: 'text', required: true },
      { key: 'duree_mandat', label: "Duree du mandat (ans)", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>MANDAT DE GESTION LOCATIVE</h1><p>Le proprietaire <strong>{{nom_mandant}}</strong> confie a l agence <strong>{{nom_mandataire}}</strong> la gestion du bien situe <strong>{{adresse_bien}}</strong>.</p><h2>Pouvoirs Conferes</h2><ul><li>Recherche et selection des locataires</li><li>Redaction et signature des baux</li><li>Encaissement des loyers et charges</li><li>Gestion des travaux d entretien</li><li>Representation aupres des tiers</li></ul><h2>Remuneration</h2><p>Le Mandataire percevra <strong>{{taux_gestion}} %</strong> TTC du loyer charge encaisse. Duree du mandat : <strong>{{duree_mandat}} an(s)</strong>.</p></div>`
  },
  {
    code: 'gloc_bail_residentiel_3ans',
    name: "Contrat de Bail Residentiel 3 Ans",
    category: 'immobilier',
    price: 5000,
    priceMax: 15000,
    description: "Contrat de location habitation principale d une duree de 3 ans conforme au droit ivoirien.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 93,
    fieldsJson: F([
      { key: 'nom_bailleur', label: "Nom du bailleur", type: 'text', required: true },
      { key: 'nom_locataire', label: "Nom du locataire", type: 'text', required: true },
      { key: 'adresse_logement', label: "Adresse du logement", type: 'text', required: true },
      { key: 'loyer_mensuel', label: "Loyer mensuel (FCFA)", type: 'text', required: true },
      { key: 'depot_garantie', label: "Depot de garantie (FCFA)", type: 'text', required: true },
      { key: 'date_entree', label: "Date d entree dans les lieux", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>CONTRAT DE BAIL D HABITATION</h1><p>Entre <strong>{{nom_bailleur}}</strong> (le Bailleur) et <strong>{{nom_locataire}}</strong> (le Locataire) pour le logement sis <strong>{{adresse_logement}}</strong>.</p><h2>Article 1 - Duree</h2><p>Le bail est consenti pour une duree de <strong>3 ans</strong> a compter du <strong>{{date_entree}}</strong>.</p><h2>Article 2 - Loyer</h2><p>Le loyer mensuel est fixe a <strong>{{loyer_mensuel}} FCFA</strong>, payable d avance le 5 de chaque mois.</p><h2>Article 3 - Depot de Garantie</h2><p>Le Locataire verse un depot de garantie de <strong>{{depot_garantie}} FCFA</strong>.</p><h2>Article 4 - Obligations</h2><p>Le Locataire s engage a occuper le logement paisiblement et a restituer les lieux en bon etat a l expiration du bail.</p></div>`
  },
  {
    code: 'gloc_bail_meuble_1an',
    name: "Bail Meuble 1 An",
    category: 'immobilier',
    price: 4000,
    priceMax: 12000,
    description: "Contrat de location de logement meuble d une duree de 1 an avec inventaire du mobilier.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 81,
    fieldsJson: F([
      { key: 'nom_bailleur', label: "Nom du bailleur", type: 'text', required: true },
      { key: 'nom_locataire', label: "Nom du locataire", type: 'text', required: true },
      { key: 'adresse_logement', label: "Adresse du logement meuble", type: 'text', required: true },
      { key: 'loyer_charges', label: "Loyer charges comprises (FCFA)", type: 'text', required: true },
      { key: 'date_entree', label: "Date d entree dans les lieux", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>CONTRAT DE LOCATION MEUBLEE</h1><p>Entre <strong>{{nom_bailleur}}</strong> et <strong>{{nom_locataire}}</strong> pour le logement meuble situe <strong>{{adresse_logement}}</strong>.</p><h2>Article 1 - Duree</h2><p>Le bail est conclu pour <strong>1 an</strong> a compter du <strong>{{date_entree}}</strong>, renouvelable par tacite reconduction.</p><h2>Article 2 - Loyer</h2><p>Loyer mensuel charges comprises : <strong>{{loyer_charges}} FCFA</strong>.</p><h2>Article 3 - Mobilier</h2><p>Un inventaire detaille du mobilier figure en annexe au present contrat.</p><h2>Article 4 - Restitution</h2><p>Le locataire devra restituer les meubles en bon etat a la fin du bail.</p></div>`
  },
  {
    code: 'gloc_bail_mobilite',
    name: "Bail Mobilite 1 a 10 Mois",
    category: 'immobilier',
    price: 3500,
    priceMax: 10000,
    description: "Bail de courte duree pour personnes en mobilite professionnelle ou etudiante (1 a 10 mois).",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'nom_bailleur', label: "Nom du bailleur", type: 'text', required: true },
      { key: 'nom_locataire', label: "Nom du locataire", type: 'text', required: true },
      { key: 'adresse_bien', label: "Adresse du logement", type: 'text', required: true },
      { key: 'loyer_mensuel', label: "Loyer mensuel (FCFA)", type: 'text', required: true },
      { key: 'duree_bail', label: "Duree du bail (1 a 10 mois)", type: 'text', required: true },
      { key: 'motif_mobilite', label: "Motif de mobilite du locataire", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>BAIL MOBILITE</h1><p>Le bailleur <strong>{{nom_bailleur}}</strong> loue a <strong>{{nom_locataire}}</strong> le logement situe <strong>{{adresse_bien}}</strong>.</p><h2>Article 1 - Duree</h2><p>Le bail est conclu pour une duree de <strong>{{duree_bail}} mois</strong>, non renouvelable par tacite reconduction.</p><h2>Article 2 - Loyer</h2><p>Loyer mensuel : <strong>{{loyer_mensuel}} FCFA</strong>.</p><h2>Article 3 - Motif</h2><p>Le locataire justifie du motif suivant : <strong>{{motif_mobilite}}</strong>.</p><h2>Article 4 - Fin de Bail</h2><p>A l expiration du terme, le locataire devra liberer les lieux sans mise en demeure prealable.</p></div>`
  },
  {
    code: 'gloc_bail_precaire',
    name: "Contrat de Bail Precaire",
    category: 'immobilier',
    price: 4000,
    priceMax: 12000,
    description: "Bail precaire ou a duree determinee courte pour occupation temporaire d un local avec droit de reprise.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 58,
    fieldsJson: F([
      { key: 'nom_bailleur', label: "Nom du bailleur", type: 'text', required: true },
      { key: 'nom_occupant', label: "Nom de l occupant", type: 'text', required: true },
      { key: 'adresse_local', label: "Adresse du local occupe", type: 'text', required: true },
      { key: 'indemnite_occupation', label: "Indemnite d occupation mensuelle (FCFA)", type: 'text', required: true },
      { key: 'date_fin', label: "Date de fin de l occupation", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>CONTRAT D OCCUPATION PRECAIRE</h1><p>Entre <strong>{{nom_bailleur}}</strong> et <strong>{{nom_occupant}}</strong> pour le local sis <strong>{{adresse_local}}</strong>.</p><h2>Article 1 - Caracteristiques</h2><p>Le present contrat constitue une simple convention d occupation precaire et n emporte pas les droits inherents au statut de locataire.</p><h2>Article 2 - Duree et Indemnite</h2><p>L occupation est autorisee jusqu au <strong>{{date_fin}}</strong> moyennant une indemnite mensuelle de <strong>{{indemnite_occupation}} FCFA</strong>.</p><h2>Article 3 - Reprise</h2><p>Le bailleur pourra reprendre le local a tout moment avec un preavis de 15 jours.</p></div>`
  },
  {
    code: 'gloc_bail_professionnel',
    name: "Bail pour Usage Professionnel",
    category: 'immobilier',
    price: 7000,
    priceMax: 22000,
    description: "Contrat de bail pour l exercice d une activite professionnelle liberale ou de bureau.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 75,
    fieldsJson: F([
      { key: 'nom_bailleur', label: "Nom du bailleur", type: 'text', required: true },
      { key: 'nom_locataire_pro', label: "Nom du locataire professionnel", type: 'text', required: true },
      { key: 'adresse_local', label: "Adresse du local professionnel", type: 'text', required: true },
      { key: 'loyer_annuel', label: "Loyer annuel HT (FCFA)", type: 'text', required: true },
      { key: 'activite_autorisee', label: "Activite professionnelle autorisee", type: 'text', required: true },
      { key: 'date_debut', label: "Date de prise d effet du bail", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>BAIL A USAGE PROFESSIONNEL</h1><p>Entre <strong>{{nom_bailleur}}</strong> et <strong>{{nom_locataire_pro}}</strong> pour le local sis <strong>{{adresse_local}}</strong>.</p><h2>Article 1 - Destination</h2><p>Le local est loue exclusivement pour l exercice de l activite suivante : <strong>{{activite_autorisee}}</strong>. Toute autre utilisation est interdite.</p><h2>Article 2 - Duree</h2><p>Bail de 3 ans a compter du <strong>{{date_debut}}</strong>.</p><h2>Article 3 - Loyer</h2><p>Loyer annuel HT : <strong>{{loyer_annuel}} FCFA</strong>, payable par trimestre echu.</p></div>`
  },
  {
    code: 'gloc_reglement_copropriete',
    name: "Reglement de Copropriete",
    category: 'immobilier',
    price: 10000,
    priceMax: 32000,
    description: "Document fondateur de la copropriete definissant les droits et obligations des coproprietaires.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 79,
    fieldsJson: F([
      { key: 'nom_residence', label: "Nom de la residence", type: 'text', required: true },
      { key: 'adresse_immeuble', label: "Adresse de l immeuble", type: 'text', required: true },
      { key: 'nb_lots', label: "Nombre total de lots", type: 'text', required: true },
      { key: 'gestionnaire', label: "Nom du syndic de copropriete", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>REGLEMENT DE COPROPRIETE</h1><p><strong>Residence :</strong> {{nom_residence}} | <strong>Adresse :</strong> {{adresse_immeuble}} | <strong>Lots :</strong> {{nb_lots}}</p><h2>Titre I - Parties Communes et Parties Privatives</h2><p>Sont parties communes : les corridors, escaliers, toiture, ascenseurs et tous ouvrages communs. Chaque lot privatif comprend les surfaces exclusivement affectees a son proprietaire.</p><h2>Titre II - Charges de Copropriete</h2><p>Les charges sont reparties proportionnellement aux tantièmes de chaque lot.</p><h2>Titre III - Assemblee Generale</h2><p>L assemblee generale se reunit au moins une fois par an sous la presidence du syndic <strong>{{gestionnaire}}</strong>.</p></div>`
  },
  {
    code: 'gloc_reglement_interieur',
    name: "Reglement Interieur d Immeuble",
    category: 'immobilier',
    price: 4000,
    priceMax: 12000,
    description: "Reglement interieur fixant les regles de vie commune au sein d un immeuble collectif.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 72,
    fieldsJson: F([
      { key: 'nom_residence', label: "Nom de la residence", type: 'text', required: true },
      { key: 'adresse', label: "Adresse de l immeuble", type: 'text', required: true },
      { key: 'heures_calme', label: "Heures de calme obligatoire", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>REGLEMENT INTERIEUR - {{nom_residence}}</h1><p><strong>Adresse :</strong> {{adresse}}</p><h2>Article 1 - Tranquillite</h2><p>Les heures de calme sont fixees de <strong>{{heures_calme}}</strong>. Toute nuisance sonore est interdite durant ces plages.</p><h2>Article 2 - Parties Communes</h2><p>Les parties communes doivent etre maintenues propres. Il est interdit d y stocker des objets, velos ou materiaux de maniere permanente.</p><h2>Article 3 - Dechets</h2><p>Les ordures menageres doivent etre deposees dans les bacs prevus a cet effet. Le tri selectif est encourage.</p><h2>Article 4 - Visiteurs</h2><p>Tout resident est responsable du comportement de ses visiteurs.</p></div>`
  },
  {
    code: 'gloc_pv_ag_copropriete',
    name: "Proces-Verbal d Assemblee Generale de Copropriete",
    category: 'immobilier',
    price: 5000,
    priceMax: 15000,
    description: "PV d assemblee generale de coproprietaires consignant les decisions prises et les votes.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 76,
    fieldsJson: F([
      { key: 'nom_residence', label: "Nom de la residence", type: 'text', required: true },
      { key: 'date_ag', label: "Date de l assemblee generale", type: 'date', required: true },
      { key: 'president_seance', label: "President de seance", type: 'text', required: true },
      { key: 'ordre_du_jour', label: "Points a l ordre du jour", type: 'textarea', required: true },
      { key: 'decisions_prises', label: "Decisions prises et resultats des votes", type: 'textarea', required: true }
    ]),
    body: `<div class="doc"><h1>PROCES-VERBAL D ASSEMBLEE GENERALE DE COPROPRIETE</h1><p><strong>Residence :</strong> {{nom_residence}} | <strong>Date :</strong> {{date_ag}}</p><p><strong>President de seance :</strong> {{president_seance}}</p><h2>Ordre du Jour</h2><p>{{ordre_du_jour}}</p><h2>Deliberations et Decisions</h2><p>{{decisions_prises}}</p><h2>Cloture</h2><p>L ordre du jour etant epuise, la seance est levee. Le present PV sera adresse a tous les coproprietaires dans les 15 jours.</p></div>`
  },
  {
    code: 'gloc_budget_previsionnel_cop',
    name: "Budget Previsionnel de Copropriete",
    category: 'immobilier',
    price: 5000,
    priceMax: 15000,
    description: "Document budgetaire previsionnel annuel presente par le syndic a l assemblee generale des coproprietaires.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'nom_residence', label: "Nom de la residence", type: 'text', required: true },
      { key: 'annee_budget', label: "Annee budgetaire", type: 'text', required: true },
      { key: 'total_charges', label: "Total des charges previsionnelles (FCFA)", type: 'text', required: true },
      { key: 'repartition_postes', label: "Repartition par postes budgetaires", type: 'textarea', required: true }
    ]),
    body: `<div class="doc"><h1>BUDGET PREVISIONNEL {{annee_budget}} - {{nom_residence}}</h1><h2>Synthese</h2><p>Total des charges previsionnelles : <strong>{{total_charges}} FCFA</strong></p><h2>Repartition par Postes</h2><p>{{repartition_postes}}</p><h2>Appel de Fonds</h2><p>Les coproprietaires seront appeles a verser leurs quotes-parts de charges par trimestre, selon les tantièmes de leur lot.</p></div>`
  },
  {
    code: 'gloc_appel_charges',
    name: "Appel de Charges de Copropriete",
    category: 'immobilier',
    price: 3000,
    priceMax: 9000,
    description: "Document d appel de charges trimestriel ou annuel adresse a chaque coproprietaire par le syndic.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 71,
    fieldsJson: F([
      { key: 'nom_syndic', label: "Nom du syndic", type: 'text', required: true },
      { key: 'nom_coproprietaire', label: "Nom du coproprietaire", type: 'text', required: true },
      { key: 'reference_lot', label: "Reference du lot", type: 'text', required: true },
      { key: 'montant_appel', label: "Montant de l appel de fonds (FCFA)", type: 'text', required: true },
      { key: 'date_echeance', label: "Date limite de paiement", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>APPEL DE CHARGES DE COPROPRIETE</h1><p><strong>Syndic :</strong> {{nom_syndic}} | <strong>Coproprietaire :</strong> {{nom_coproprietaire}}</p><p><strong>Lot :</strong> {{reference_lot}}</p><h2>Appel de Fonds</h2><p>Vous etes invite a verser la somme de <strong>{{montant_appel}} FCFA</strong> au titre de votre quote-part de charges.</p><p><strong>Date limite de paiement :</strong> {{date_echeance}}</p><h2>Modalites de Paiement</h2><p>Virement bancaire uniquement sur le compte de la copropriete, reference obligatoire : lot {{reference_lot}}.</p></div>`
  },
  {
    code: 'gloc_contrat_syndic',
    name: "Contrat de Syndic de Copropriete",
    category: 'immobilier',
    price: 7000,
    priceMax: 22000,
    description: "Contrat formalisant la mission du syndic professionnel de copropriete et ses honoraires.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 74,
    fieldsJson: F([
      { key: 'nom_syndic', label: "Nom du syndic professionnel", type: 'text', required: true },
      { key: 'nom_residence', label: "Nom de la residence", type: 'text', required: true },
      { key: 'honoraires_annuels', label: "Honoraires annuels de gestion (FCFA)", type: 'text', required: true },
      { key: 'duree_contrat', label: "Duree du contrat (ans)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de prise d effet", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SYNDIC DE COPROPRIETE</h1><p>La copropriete de la residence <strong>{{nom_residence}}</strong> confie a <strong>{{nom_syndic}}</strong> la mission de syndic professionnel.</p><h2>Article 1 - Mission</h2><p>Le Syndic assure l administration de la copropriete, l execution des decisions d assemblee generale, la gestion financiere et l entretien des parties communes.</p><h2>Article 2 - Remuneration</h2><p>Honoraires annuels fixes : <strong>{{honoraires_annuels}} FCFA</strong>.</p><h2>Article 3 - Duree</h2><p>Contrat de <strong>{{duree_contrat}} an(s)</strong> a compter du <strong>{{date_debut}}</strong>.</p></div>`
  },
  {
    code: 'gloc_contrat_entretien_parties',
    name: "Contrat d Entretien des Parties Communes",
    category: 'immobilier',
    price: 4000,
    priceMax: 12000,
    description: "Contrat de prestation d entretien et de nettoyage des parties communes d un immeuble ou d une residence.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 66,
    fieldsJson: F([
      { key: 'nom_prestataire', label: "Nom de la societe de nettoyage", type: 'text', required: true },
      { key: 'nom_copropriete', label: "Nom de la copropriete", type: 'text', required: true },
      { key: 'frequence', label: "Frequence d intervention", type: 'text', required: true },
      { key: 'cout_mensuel', label: "Cout mensuel de la prestation (FCFA)", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>CONTRAT D ENTRETIEN DES PARTIES COMMUNES</h1><p>Entre la copropriete <strong>{{nom_copropriete}}</strong> et <strong>{{nom_prestataire}}</strong> :</p><h2>Article 1 - Prestations</h2><p>Le Prestataire assurera le nettoyage, le balayage et la desinfection des parties communes selon la frequence suivante : <strong>{{frequence}}</strong>.</p><h2>Article 2 - Prix</h2><p>Cout mensuel : <strong>{{cout_mensuel}} FCFA</strong>.</p><h2>Article 3 - Controle Qualite</h2><p>Un bon d intervention sera signe par le gardien ou le representant du syndic apres chaque prestation.</p></div>`
  },
  {
    code: 'gloc_contrat_gardien',
    name: "Contrat de Gardien d Immeuble",
    category: 'immobilier',
    price: 5000,
    priceMax: 15000,
    description: "Contrat de travail du gardien d immeuble incluant logement de fonction et conditions de service.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 69,
    fieldsJson: F([
      { key: 'nom_gardien', label: "Nom et prenom du gardien", type: 'text', required: true },
      { key: 'nom_employeur', label: "Nom de l employeur (syndic ou copropriete)", type: 'text', required: true },
      { key: 'adresse_immeuble', label: "Adresse de l immeuble", type: 'text', required: true },
      { key: 'salaire_mensuel', label: "Salaire mensuel brut (FCFA)", type: 'text', required: true },
      { key: 'date_embauche', label: "Date d embauche", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>CONTRAT DE TRAVAIL - GARDIEN D IMMEUBLE</h1><p>Entre <strong>{{nom_employeur}}</strong> (l Employeur) et <strong>{{nom_gardien}}</strong> (le Gardien) pour l immeuble sis <strong>{{adresse_immeuble}}</strong>.</p><h2>Article 1 - Fonctions</h2><p>Le Gardien est charge de surveiller l immeuble, d assurer la proprete des abords, de gerer les cles, de recevoir le courrier et de signaler toute anomalie.</p><h2>Article 2 - Salaire</h2><p>Salaire mensuel brut : <strong>{{salaire_mensuel}} FCFA</strong>.</p><h2>Article 3 - Prise d Effet</h2><p>Le contrat prend effet le <strong>{{date_embauche}}</strong>.</p><h2>Article 4 - Logement</h2><p>Un logement de fonction est mis a disposition du Gardien a titre d accessoire du contrat de travail.</p></div>`
  },
  {
    code: 'gloc_rapport_etat_copropriete',
    name: "Rapport d Etat de la Copropriete",
    category: 'immobilier',
    price: 6000,
    priceMax: 18000,
    description: "Rapport d audit technique et financier de l etat d une copropriete etabli par le syndic ou un expert.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 64,
    fieldsJson: F([
      { key: 'nom_residence', label: "Nom de la residence", type: 'text', required: true },
      { key: 'date_rapport', label: "Date du rapport", type: 'date', required: true },
      { key: 'etat_structure', label: "Etat de la structure et du clos couvert", type: 'textarea', required: true },
      { key: 'etat_financier', label: "Situation financiere de la copropriete", type: 'textarea', required: true }
    ]),
    body: `<div class="doc"><h1>RAPPORT D ETAT DE LA COPROPRIETE - {{nom_residence}}</h1><p><strong>Date :</strong> {{date_rapport}}</p><h2>1. Etat Technique</h2><p>{{etat_structure}}</p><h2>2. Situation Financiere</h2><p>{{etat_financier}}</p><h2>3. Recommandations</h2><p>Sur la base de ce diagnostic, le syndic recommande de voter les travaux d entretien prioritaires lors de la prochaine assemblee generale.</p></div>`
  },
  {
    code: 'gloc_plan_travaux_copropriete',
    name: "Plan de Travaux Copropriete",
    category: 'immobilier',
    price: 7000,
    priceMax: 21000,
    description: "Plan pluriannuel de travaux pour une copropriete presentant les interventions prioritaires et leur financement.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 67,
    fieldsJson: F([
      { key: 'nom_residence', label: "Nom de la residence", type: 'text', required: true },
      { key: 'horizon_plan', label: "Horizon du plan (ex : 2025-2028)", type: 'text', required: true },
      { key: 'travaux_urgents', label: "Travaux urgents et prioritaires", type: 'textarea', required: true },
      { key: 'budget_total_estime', label: "Budget total estime (FCFA)", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>PLAN DE TRAVAUX COPROPRIETE - {{nom_residence}}</h1><p><strong>Periode :</strong> {{horizon_plan}}</p><h2>Travaux Urgents et Prioritaires</h2><p>{{travaux_urgents}}</p><h2>Budget Previsionnel</h2><p>Budget total estime : <strong>{{budget_total_estime}} FCFA</strong>, a financer par appel de fonds special vote en assemblee generale.</p><h2>Calendrier de Realisation</h2><p>Un appel d offres sera lance dans les 3 mois suivant le vote. Les travaux seront executes selon un planning de coordination etabli par le maitre d oeuvre.</p></div>`
  },
  {
    code: 'gloc_mise_demeure_syndic',
    name: "Mise en Demeure Syndic de Copropriete",
    category: 'immobilier',
    price: 4000,
    priceMax: 12000,
    description: "Lettre de mise en demeure adressee par un coproprietaire au syndic suite a des manquements a ses obligations.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'nom_coproprietaire', label: "Nom du coproprietaire signataire", type: 'text', required: true },
      { key: 'nom_syndic', label: "Nom du syndic mis en demeure", type: 'text', required: true },
      { key: 'objet_grief', label: "Objet du grief et manquements constates", type: 'textarea', required: true },
      { key: 'delai_remediation', label: "Delai accorde pour remedier (jours)", type: 'text', required: true },
      { key: 'date_courrier', label: "Date du courrier", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>MISE EN DEMEURE</h1><p><strong>De :</strong> {{nom_coproprietaire}} | <strong>A :</strong> {{nom_syndic}} | <strong>Date :</strong> {{date_courrier}}</p><h2>Objet : Manquements du Syndic</h2><p>Par la presente, je vous mets en demeure de remedier aux manquements suivants dans un delai de <strong>{{delai_remediation}} jours</strong> :</p><p>{{objet_grief}}</p><h2>Consequences</h2><p>A defaut de remediacion dans le delai imparti, je me verrai contraint de saisir le tribunal competent et d engager votre responsabilite civile professionnelle.</p><p>Je vous prie de croire en l expression de mes salutations distinguees.</p></div>`
  },
  {
    code: 'gloc_rapport_gestion_annuel',
    name: "Rapport de Gestion Locative Annuel",
    category: 'immobilier',
    price: 6000,
    priceMax: 18000,
    description: "Rapport annuel de gestion locative adresse par le gestionnaire au proprietaire bailleur.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 78,
    fieldsJson: F([
      { key: 'nom_gestionnaire', label: "Nom du gestionnaire locatif", type: 'text', required: true },
      { key: 'nom_proprietaire', label: "Nom du proprietaire", type: 'text', required: true },
      { key: 'annee', label: "Annee de gestion", type: 'text', required: true },
      { key: 'loyers_percus', label: "Total loyers encaisses (FCFA)", type: 'text', required: true },
      { key: 'charges_deduites', label: "Total charges et frais deduits (FCFA)", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>RAPPORT DE GESTION LOCATIVE {{annee}}</h1><p><strong>Gestionnaire :</strong> {{nom_gestionnaire}} | <strong>Proprietaire :</strong> {{nom_proprietaire}}</p><h2>Bilan Financier</h2><table border="1" cellpadding="8" style="width:100%;border-collapse:collapse"><tr><th>Libelle</th><th>Montant (FCFA)</th></tr><tr><td>Loyers encaisses</td><td>{{loyers_percus}}</td></tr><tr><td>Charges et frais deduits</td><td>{{charges_deduites}}</td></tr></table><h2>Synthese</h2><p>L ensemble des biens geres a connu un taux d occupation satisfaisant. Le detail des operations figure dans les releves mensuels annexes.</p></div>`
  },
  {
    code: 'gloc_compte_rendu_gestion',
    name: "Compte Rendu de Gestion Locative",
    category: 'immobilier',
    price: 4000,
    priceMax: 12000,
    description: "Compte rendu periodique de gestion locative detaillant les encaissements et les depenses du mois.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 73,
    fieldsJson: F([
      { key: 'nom_gestionnaire', label: "Nom du gestionnaire", type: 'text', required: true },
      { key: 'nom_proprietaire', label: "Nom du proprietaire", type: 'text', required: true },
      { key: 'periode', label: "Periode (ex : Janvier 2025)", type: 'text', required: true },
      { key: 'loyer_encaisse', label: "Loyer encaisse ce mois (FCFA)", type: 'text', required: true },
      { key: 'frais_du_mois', label: "Frais preleves ce mois (FCFA)", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>COMPTE RENDU DE GESTION - {{periode}}</h1><p><strong>Gestionnaire :</strong> {{nom_gestionnaire}} | <strong>Proprietaire :</strong> {{nom_proprietaire}}</p><h2>Operations du Mois</h2><table border="1" cellpadding="8" style="width:100%;border-collapse:collapse"><tr><th>Operation</th><th>Montant (FCFA)</th></tr><tr><td>Loyer encaisse</td><td>{{loyer_encaisse}}</td></tr><tr><td>Frais preleves</td><td>{{frais_du_mois}}</td></tr></table><h2>Virement Proprietaire</h2><p>Le solde a virer au proprietaire est indique sur le releve bancaire joint.</p></div>`
  },
  {
    code: 'gloc_fiche_suivi_locataire',
    name: "Fiche de Suivi Locataire",
    category: 'immobilier',
    price: 3000,
    priceMax: 9000,
    description: "Fiche individuelle de suivi du locataire : historique des paiements, incidents, interventions.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 67,
    fieldsJson: F([
      { key: 'nom_locataire', label: "Nom complet du locataire", type: 'text', required: true },
      { key: 'adresse_logement', label: "Adresse du logement loue", type: 'text', required: true },
      { key: 'date_entree', label: "Date d entree dans les lieux", type: 'date', required: true },
      { key: 'historique', label: "Historique des paiements et incidents", type: 'textarea', required: false }
    ]),
    body: `<div class="doc"><h1>FICHE DE SUIVI LOCATAIRE</h1><p><strong>Locataire :</strong> {{nom_locataire}}</p><p><strong>Logement :</strong> {{adresse_logement}}</p><p><strong>Date d entree :</strong> {{date_entree}}</p><h2>Historique</h2><p>{{historique}}</p><h2>Statut Actuel</h2><p>Fiche mise a jour a chaque operation. Toute regularisation fera l objet d un avenant ou d une note de gestion.</p></div>`
  },
  {
    code: 'gloc_inventaire_mobilier',
    name: "Inventaire du Mobilier - Bail Meuble",
    category: 'immobilier',
    price: 3000,
    priceMax: 9000,
    description: "Inventaire contradictoire du mobilier dresse a l entree et a la sortie du locataire d un logement meuble.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 76,
    fieldsJson: F([
      { key: 'nom_bailleur', label: "Nom du bailleur", type: 'text', required: true },
      { key: 'nom_locataire', label: "Nom du locataire", type: 'text', required: true },
      { key: 'adresse_logement', label: "Adresse du logement", type: 'text', required: true },
      { key: 'liste_mobilier', label: "Liste detaillee des meubles et equipements", type: 'textarea', required: true },
      { key: 'date_inventaire', label: "Date de l inventaire", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>INVENTAIRE DU MOBILIER</h1><p><strong>Bailleur :</strong> {{nom_bailleur}} | <strong>Locataire :</strong> {{nom_locataire}}</p><p><strong>Logement :</strong> {{adresse_logement}} | <strong>Date :</strong> {{date_inventaire}}</p><h2>Liste des Meubles et Equipements</h2><p>{{liste_mobilier}}</p><h2>Signatures</h2><p>Le present inventaire a ete dresse contradictoirement et signe par les deux parties. Tout meuble manquant ou deteriore lors de la sortie sera facture au locataire.</p></div>`
  },
  {
    code: 'gloc_convention_colocation',
    name: "Convention de Colocation",
    category: 'immobilier',
    price: 4000,
    priceMax: 12000,
    description: "Convention organisant la colocation entre plusieurs personnes occupant un meme logement.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'adresse_logement', label: "Adresse du logement en colocation", type: 'text', required: true },
      { key: 'noms_colocataires', label: "Noms des colocataires", type: 'textarea', required: true },
      { key: 'loyer_total', label: "Loyer total du logement (FCFA)", type: 'text', required: true },
      { key: 'repartition', label: "Repartition du loyer entre colocataires", type: 'textarea', required: true },
      { key: 'date_debut', label: "Date de debut de la colocation", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>CONVENTION DE COLOCATION</h1><p><strong>Logement :</strong> {{adresse_logement}} | <strong>Date de debut :</strong> {{date_debut}}</p><h2>Colocataires</h2><p>{{noms_colocataires}}</p><h2>Loyer et Charges</h2><p>Loyer total : <strong>{{loyer_total}} FCFA</strong></p><p>Repartition convenue : {{repartition}}</p><h2>Regles de Vie Commune</h2><p>Les colocataires s engagent a respecter les regles du bail principal, a partager equitablement les charges communes et a se notifier mutuellement tout depart avec un preavis d un mois.</p></div>`
  },
  {
    code: 'gloc_contrat_sous_location',
    name: "Contrat de Sous-Location Autorisee",
    category: 'immobilier',
    price: 4500,
    priceMax: 14000,
    description: "Contrat de sous-location d un logement avec autorisation expresse du bailleur principal.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 62,
    fieldsJson: F([
      { key: 'nom_locataire_principal', label: "Nom du locataire principal", type: 'text', required: true },
      { key: 'nom_sous_locataire', label: "Nom du sous-locataire", type: 'text', required: true },
      { key: 'adresse_logement', label: "Adresse du logement sous-loue", type: 'text', required: true },
      { key: 'loyer_sous_location', label: "Loyer de sous-location (FCFA)", type: 'text', required: true },
      { key: 'duree_sous_location', label: "Duree de la sous-location (mois)", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SOUS-LOCATION</h1><p>Le locataire principal <strong>{{nom_locataire_principal}}</strong> sous-loue a <strong>{{nom_sous_locataire}}</strong> le logement situe <strong>{{adresse_logement}}</strong>.</p><h2>Article 1 - Autorisation</h2><p>La presente sous-location a ete expressement autorisee par le bailleur principal par courrier joint en annexe.</p><h2>Article 2 - Conditions</h2><p>Duree : <strong>{{duree_sous_location}} mois</strong>. Loyer mensuel : <strong>{{loyer_sous_location}} FCFA</strong>.</p><h2>Article 3 - Responsabilite</h2><p>Le locataire principal demeure responsable envers le bailleur de toutes les obligations du bail principal.</p></div>`
  },
  {
    code: 'gloc_avenant_bail_renouvellement',
    name: "Avenant au Bail - Renouvellement",
    category: 'immobilier',
    price: 3500,
    priceMax: 10000,
    description: "Avenant formalisant le renouvellement du bail et les nouvelles conditions (loyer, duree).",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 80,
    fieldsJson: F([
      { key: 'nom_bailleur', label: "Nom du bailleur", type: 'text', required: true },
      { key: 'nom_locataire', label: "Nom du locataire", type: 'text', required: true },
      { key: 'adresse_logement', label: "Adresse du logement", type: 'text', required: true },
      { key: 'nouveau_loyer', label: "Nouveau loyer mensuel (FCFA)", type: 'text', required: true },
      { key: 'date_renouvellement', label: "Date de renouvellement", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>AVENANT AU BAIL - RENOUVELLEMENT</h1><p>Entre <strong>{{nom_bailleur}}</strong> et <strong>{{nom_locataire}}</strong> pour le logement sis <strong>{{adresse_logement}}</strong> :</p><h2>Article 1 - Renouvellement</h2><p>Le bail arrive a echeance est renouvele a compter du <strong>{{date_renouvellement}}</strong> pour une nouvelle duree de 3 ans.</p><h2>Article 2 - Nouveau Loyer</h2><p>A compter du renouvellement, le loyer mensuel est fixe a <strong>{{nouveau_loyer}} FCFA</strong>.</p><h2>Article 3 - Maintien des Clauses</h2><p>Toutes les autres clauses et conditions du bail initial restent inchangees et pleinement applicables.</p></div>`
  },
  {
    code: 'gloc_protocole_mediation',
    name: "Protocole de Mediation Locative",
    category: 'immobilier',
    price: 5000,
    priceMax: 16000,
    description: "Protocole organisant la mediation entre bailleur et locataire en cas de litige pour eviter le recours judiciaire.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 59,
    fieldsJson: F([
      { key: 'nom_bailleur', label: "Nom du bailleur", type: 'text', required: true },
      { key: 'nom_locataire', label: "Nom du locataire", type: 'text', required: true },
      { key: 'nom_mediateur', label: "Nom du mediateur", type: 'text', required: true },
      { key: 'objet_litige', label: "Objet du litige a medier", type: 'textarea', required: true },
      { key: 'date_seance', label: "Date de la seance de mediation", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>PROTOCOLE DE MEDIATION LOCATIVE</h1><p>Entre <strong>{{nom_bailleur}}</strong> (le Bailleur) et <strong>{{nom_locataire}}</strong> (le Locataire), avec la facilitation de <strong>{{nom_mediateur}}</strong> (le Mediateur).</p><h2>Article 1 - Objet du Litige</h2><p>{{objet_litige}}</p><h2>Article 2 - Engagement des Parties</h2><p>Les parties s engagent a participer de bonne foi a la seance de mediation du <strong>{{date_seance}}</strong> et a respecter la confidentialite des echanges.</p><h2>Article 3 - Accord de Mediation</h2><p>Tout accord trouve en mediation sera formalise par ecrit et signe par les deux parties. Il vaudra transaction et aura force obligatoire.</p><h2>Article 4 - Echec de la Mediation</h2><p>En cas d echec, les parties retrouveront leur liberte d agir en justice.</p></div>`
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
  console.log(`Batch 29a OK — crees:${created} maj:${updated} TOTAL:${total}`);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
