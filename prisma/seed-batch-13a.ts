import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ─── AGRICULTURE AVANCÉE (agr4_) ───────────────────────────────────────────
  {
    code: 'agr4_plan_campagne',
    name: "Plan de campagne agricole",
    category: 'agro_environnement',
    price: 4000, priceMax: 10000,
    description: "Document de planification de la campagne agricole saisonnière avec objectifs de production et moyens mobilisés.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      { key: 'nom_exploitation', label: "Nom de l'exploitation", type: 'text', required: true },
      { key: 'campagne', label: "Campagne agricole (ex: 2024-2025)", type: 'text', required: true },
      { key: 'superficie_ha', label: "Superficie totale (ha)", type: 'text', required: true },
      { key: 'cultures_prevues', label: "Cultures prévues", type: 'textarea', required: true },
      { key: 'date_debut', label: "Date de début de campagne", type: 'date', required: true },
      { key: 'objectif_production', label: "Objectif de production (tonnes)", type: 'text', required: false },
    ]),
    body: '<div class="doc"><h1>PLAN DE CAMPAGNE AGRICOLE</h1><h2>Exploitation : {{nom_exploitation}}</h2><p><strong>Campagne :</strong> {{campagne}}</p><p><strong>Superficie totale :</strong> {{superficie_ha}} ha</p><p><strong>Date de début :</strong> {{date_debut}}</p><h3>Cultures prévues</h3><p>{{cultures_prevues}}</p><p><strong>Objectif de production :</strong> {{objectif_production}} tonnes</p></div>'
  },
  {
    code: 'agr4_fiche_parcellaire',
    name: "Fiche parcellaire cadastrale",
    category: 'agro_environnement',
    price: 3500, priceMax: 8000,
    description: "Fiche d'identification et de description d'une parcelle agricole avec données cadastrales et caractéristiques agronomiques.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 61,
    fieldsJson: F([
      { key: 'proprietaire', label: "Nom du propriétaire", type: 'text', required: true },
      { key: 'numero_parcelle', label: "Numéro de parcelle cadastrale", type: 'text', required: true },
      { key: 'localite', label: "Localité / Village", type: 'text', required: true },
      { key: 'superficie_m2', label: "Superficie (m²)", type: 'text', required: true },
      { key: 'type_sol', label: "Type de sol", type: 'text', required: true },
    ]),
    body: '<div class="doc"><h1>FICHE PARCELLAIRE CADASTRALE</h1><p><strong>Propriétaire :</strong> {{proprietaire}}</p><p><strong>Numéro de parcelle :</strong> {{numero_parcelle}}</p><p><strong>Localité :</strong> {{localite}}</p><p><strong>Superficie :</strong> {{superficie_m2}} m²</p><p><strong>Type de sol :</strong> {{type_sol}}</p></div>'
  },
  {
    code: 'agr4_rapport_rendement',
    name: "Rapport de rendement récolte",
    category: 'agro_environnement',
    price: 3000, priceMax: 7000,
    description: "Rapport officiel constatant le rendement obtenu après récolte, par culture et par parcelle.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      { key: 'exploitation', label: "Exploitation agricole", type: 'text', required: true },
      { key: 'culture', label: "Culture concernée", type: 'text', required: true },
      { key: 'date_recolte', label: "Date de récolte", type: 'date', required: true },
      { key: 'quantite_recoltee', label: "Quantité récoltée (kg)", type: 'text', required: true },
      { key: 'rendement_ha', label: "Rendement (kg/ha)", type: 'text', required: true },
      { key: 'observations', label: "Observations", type: 'textarea', required: false },
    ]),
    body: '<div class="doc"><h1>RAPPORT DE RENDEMENT RÉCOLTE</h1><p><strong>Exploitation :</strong> {{exploitation}}</p><p><strong>Culture :</strong> {{culture}}</p><p><strong>Date de récolte :</strong> {{date_recolte}}</p><p><strong>Quantité récoltée :</strong> {{quantite_recoltee}} kg</p><p><strong>Rendement :</strong> {{rendement_ha}} kg/ha</p><h3>Observations</h3><p>{{observations}}</p></div>'
  },
  {
    code: 'agr4_contrat_fermage',
    name: "Contrat de fermage",
    category: 'agro_environnement',
    price: 5000, priceMax: 12000,
    description: "Contrat de location de terres agricoles entre bailleur et fermier, conforme au droit foncier ivoirien.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      { key: 'bailleur', label: "Nom du bailleur (propriétaire)", type: 'text', required: true },
      { key: 'fermier', label: "Nom du fermier (locataire)", type: 'text', required: true },
      { key: 'description_terres', label: "Description des terres louées", type: 'textarea', required: true },
      { key: 'loyer_annuel', label: "Loyer annuel (FCFA)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début du contrat", type: 'date', required: true },
      { key: 'duree_ans', label: "Durée du contrat (années)", type: 'text', required: true },
    ]),
    body: '<div class="doc"><h1>CONTRAT DE FERMAGE</h1><p>Entre <strong>{{bailleur}}</strong> (bailleur) et <strong>{{fermier}}</strong> (fermier),</p><h3>Article 1 - Objet</h3><p>{{description_terres}}</p><h3>Article 2 - Loyer</h3><p>Loyer annuel : {{loyer_annuel}} FCFA</p><h3>Article 3 - Durée</h3><p>Début : {{date_debut}} — Durée : {{duree_ans}} ans</p></div>'
  },
  {
    code: 'agr4_convention_cooperative',
    name: "Convention coopérative agricole",
    category: 'agro_environnement',
    price: 5500, priceMax: 13000,
    description: "Convention encadrant les relations entre une coopérative agricole et ses membres, selon les textes OHADA et la loi ivoirienne sur les coopératives.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      { key: 'nom_cooperative', label: "Nom de la coopérative", type: 'text', required: true },
      { key: 'numero_agrement', label: "Numéro d'agrément", type: 'text', required: true },
      { key: 'nom_membre', label: "Nom du membre adhérent", type: 'text', required: true },
      { key: 'date_adhesion', label: "Date d'adhésion", type: 'date', required: true },
      { key: 'droits_obligations', label: "Droits et obligations spécifiques", type: 'textarea', required: false },
    ]),
    body: '<div class="doc"><h1>CONVENTION COOPÉRATIVE AGRICOLE</h1><h2>{{nom_cooperative}}</h2><p><strong>Agrément N° :</strong> {{numero_agrement}}</p><p><strong>Membre adhérent :</strong> {{nom_membre}}</p><p><strong>Date d\'adhésion :</strong> {{date_adhesion}}</p><h3>Droits et obligations</h3><p>{{droits_obligations}}</p></div>'
  },
  {
    code: 'agr4_reglement_cooperative',
    name: "Règlement intérieur coopérative",
    category: 'agro_environnement',
    price: 4500, priceMax: 11000,
    description: "Règlement intérieur d'une coopérative agricole définissant l'organisation, les règles de fonctionnement et les sanctions.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 63,
    fieldsJson: F([
      { key: 'nom_cooperative', label: "Nom de la coopérative", type: 'text', required: true },
      { key: 'siege_social', label: "Siège social", type: 'text', required: true },
      { key: 'date_adoption', label: "Date d'adoption du règlement", type: 'date', required: true },
      { key: 'president', label: "Nom du président", type: 'text', required: true },
    ]),
    body: '<div class="doc"><h1>RÈGLEMENT INTÉRIEUR</h1><h2>{{nom_cooperative}}</h2><p><strong>Siège :</strong> {{siege_social}}</p><p><strong>Adopté le :</strong> {{date_adoption}}</p><p><strong>Président :</strong> {{president}}</p><h3>Article 1 - Objet</h3><p>Le présent règlement intérieur régit le fonctionnement interne de la coopérative {{nom_cooperative}}.</p></div>'
  },
  {
    code: 'agr4_rapport_assemblee',
    name: "Rapport assemblée coopérative",
    category: 'agro_environnement',
    price: 3500, priceMax: 8000,
    description: "Procès-verbal et rapport de l'assemblée générale annuelle ou extraordinaire d'une coopérative agricole.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      { key: 'nom_cooperative', label: "Nom de la coopérative", type: 'text', required: true },
      { key: 'type_assemblee', label: "Type d'assemblée (ordinaire/extraordinaire)", type: 'text', required: true },
      { key: 'date_assemblee', label: "Date de l'assemblée", type: 'date', required: true },
      { key: 'nombre_membres', label: "Nombre de membres présents", type: 'text', required: true },
      { key: 'resolutions', label: "Résolutions adoptées", type: 'textarea', required: true },
    ]),
    body: '<div class="doc"><h1>RAPPORT D\'ASSEMBLÉE GÉNÉRALE</h1><h2>{{nom_cooperative}}</h2><p><strong>Type :</strong> {{type_assemblee}}</p><p><strong>Date :</strong> {{date_assemblee}}</p><p><strong>Membres présents :</strong> {{nombre_membres}}</p><h3>Résolutions adoptées</h3><p>{{resolutions}}</p></div>'
  },
  {
    code: 'agr4_plan_investissement',
    name: "Plan d'investissement agricole",
    category: 'agro_environnement',
    price: 6000, priceMax: 15000,
    description: "Plan détaillé des investissements agricoles à réaliser : équipements, intrants, aménagements, avec estimation du retour sur investissement.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 74,
    fieldsJson: F([
      { key: 'porteur_projet', label: "Porteur de projet", type: 'text', required: true },
      { key: 'projet', label: "Intitulé du projet agricole", type: 'text', required: true },
      { key: 'montant_total', label: "Montant total de l'investissement (FCFA)", type: 'text', required: true },
      { key: 'financement', label: "Sources de financement", type: 'textarea', required: true },
      { key: 'date_debut', label: "Date de démarrage prévue", type: 'date', required: true },
    ]),
    body: '<div class="doc"><h1>PLAN D\'INVESTISSEMENT AGRICOLE</h1><p><strong>Porteur de projet :</strong> {{porteur_projet}}</p><p><strong>Projet :</strong> {{projet}}</p><p><strong>Montant total :</strong> {{montant_total}} FCFA</p><p><strong>Démarrage prévu :</strong> {{date_debut}}</p><h3>Sources de financement</h3><p>{{financement}}</p></div>'
  },
  {
    code: 'agr4_demande_credit',
    name: "Demande de crédit agricole",
    category: 'agro_environnement',
    price: 4000, priceMax: 9000,
    description: "Formulaire de demande de crédit agricole auprès d'une banque ou d'une institution de microfinance, avec justificatif d'exploitation.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 77,
    fieldsJson: F([
      { key: 'demandeur', label: "Nom du demandeur", type: 'text', required: true },
      { key: 'etablissement', label: "Établissement financier", type: 'text', required: true },
      { key: 'montant_sollicite', label: "Montant sollicité (FCFA)", type: 'text', required: true },
      { key: 'objet_credit', label: "Objet du crédit", type: 'textarea', required: true },
      { key: 'date_demande', label: "Date de la demande", type: 'date', required: true },
      { key: 'garanties', label: "Garanties proposées", type: 'textarea', required: false },
    ]),
    body: '<div class="doc"><h1>DEMANDE DE CRÉDIT AGRICOLE</h1><p><strong>Demandeur :</strong> {{demandeur}}</p><p><strong>Établissement :</strong> {{etablissement}}</p><p><strong>Montant sollicité :</strong> {{montant_sollicite}} FCFA</p><p><strong>Date :</strong> {{date_demande}}</p><h3>Objet du crédit</h3><p>{{objet_credit}}</p><h3>Garanties</h3><p>{{garanties}}</p></div>'
  },
  {
    code: 'agr4_contrat_assurance_recolte',
    name: "Contrat d'assurance récolte",
    category: 'agro_environnement',
    price: 5000, priceMax: 12000,
    description: "Contrat d'assurance couvrant les pertes de récolte dues aux aléas climatiques, ravageurs ou maladies.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 66,
    fieldsJson: F([
      { key: 'assure', label: "Nom de l'assuré", type: 'text', required: true },
      { key: 'compagnie', label: "Compagnie d'assurance", type: 'text', required: true },
      { key: 'culture_assuree', label: "Culture assurée", type: 'text', required: true },
      { key: 'valeur_assurance', label: "Valeur assurée (FCFA)", type: 'text', required: true },
      { key: 'date_effet', label: "Date d'effet du contrat", type: 'date', required: true },
      { key: 'prime_annuelle', label: "Prime annuelle (FCFA)", type: 'text', required: true },
    ]),
    body: '<div class="doc"><h1>CONTRAT D\'ASSURANCE RÉCOLTE</h1><p><strong>Assuré :</strong> {{assure}}</p><p><strong>Compagnie :</strong> {{compagnie}}</p><p><strong>Culture assurée :</strong> {{culture_assuree}}</p><p><strong>Valeur assurée :</strong> {{valeur_assurance}} FCFA</p><p><strong>Prime annuelle :</strong> {{prime_annuelle}} FCFA</p><p><strong>Prise d\'effet :</strong> {{date_effet}}</p></div>'
  },
  {
    code: 'agr4_rapport_sinistre',
    name: "Rapport sinistre agricole",
    category: 'agro_environnement',
    price: 3500, priceMax: 8500,
    description: "Rapport de déclaration et d'évaluation d'un sinistre agricole (sécheresse, inondation, attaque de ravageurs) en vue d'une indemnisation.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      { key: 'exploitant', label: "Nom de l'exploitant", type: 'text', required: true },
      { key: 'date_sinistre', label: "Date du sinistre", type: 'date', required: true },
      { key: 'nature_sinistre', label: "Nature du sinistre", type: 'text', required: true },
      { key: 'pertes_estimees', label: "Pertes estimées (FCFA)", type: 'text', required: true },
      { key: 'description_degats', label: "Description des dégâts", type: 'textarea', required: true },
    ]),
    body: '<div class="doc"><h1>RAPPORT DE SINISTRE AGRICOLE</h1><p><strong>Exploitant :</strong> {{exploitant}}</p><p><strong>Date du sinistre :</strong> {{date_sinistre}}</p><p><strong>Nature :</strong> {{nature_sinistre}}</p><p><strong>Pertes estimées :</strong> {{pertes_estimees}} FCFA</p><h3>Description des dégâts</h3><p>{{description_degats}}</p></div>'
  },
  {
    code: 'agr4_fiche_mais',
    name: "Fiche technique culture maïs",
    category: 'agro_environnement',
    price: 2500, priceMax: 6000,
    description: "Fiche technique de conduite de la culture du maïs : variété, densité de semis, fertilisation, traitements phytosanitaires et calendrier cultural.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 75,
    fieldsJson: F([
      { key: 'exploitant', label: "Nom de l'exploitant", type: 'text', required: true },
      { key: 'variete', label: "Variété de maïs utilisée", type: 'text', required: true },
      { key: 'superficie', label: "Superficie emblavée (ha)", type: 'text', required: true },
      { key: 'date_semis', label: "Date de semis", type: 'date', required: true },
      { key: 'fertilisation', label: "Programme de fertilisation", type: 'textarea', required: false },
    ]),
    body: '<div class="doc"><h1>FICHE TECHNIQUE — CULTURE DU MAÏS</h1><p><strong>Exploitant :</strong> {{exploitant}}</p><p><strong>Variété :</strong> {{variete}}</p><p><strong>Superficie :</strong> {{superficie}} ha</p><p><strong>Date de semis :</strong> {{date_semis}}</p><h3>Programme de fertilisation</h3><p>{{fertilisation}}</p></div>'
  },
  {
    code: 'agr4_fiche_riz',
    name: "Fiche technique culture riz",
    category: 'agro_environnement',
    price: 2500, priceMax: 6000,
    description: "Fiche technique de conduite de la riziculture (riz pluvial ou irrigué) : préparation du terrain, repiquage, gestion de l'eau, récolte.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 73,
    fieldsJson: F([
      { key: 'exploitant', label: "Nom de l'exploitant", type: 'text', required: true },
      { key: 'type_riziculture', label: "Type de riziculture (pluvial/irrigué)", type: 'text', required: true },
      { key: 'variete', label: "Variété de riz", type: 'text', required: true },
      { key: 'superficie', label: "Superficie (ha)", type: 'text', required: true },
      { key: 'date_semis', label: "Date de semis / repiquage", type: 'date', required: true },
    ]),
    body: '<div class="doc"><h1>FICHE TECHNIQUE — CULTURE DU RIZ</h1><p><strong>Exploitant :</strong> {{exploitant}}</p><p><strong>Type de riziculture :</strong> {{type_riziculture}}</p><p><strong>Variété :</strong> {{variete}}</p><p><strong>Superficie :</strong> {{superficie}} ha</p><p><strong>Date de semis :</strong> {{date_semis}}</p></div>'
  },
  {
    code: 'agr4_fiche_igname',
    name: "Fiche technique culture igname",
    category: 'agro_environnement',
    price: 2500, priceMax: 6000,
    description: "Fiche technique de culture de l'igname : choix de la variété, préparation des buttages, plantation, entretien et récolte.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 69,
    fieldsJson: F([
      { key: 'exploitant', label: "Nom de l'exploitant", type: 'text', required: true },
      { key: 'variete', label: "Variété d'igname", type: 'text', required: true },
      { key: 'superficie', label: "Superficie (ha)", type: 'text', required: true },
      { key: 'date_plantation', label: "Date de plantation", type: 'date', required: true },
      { key: 'observations', label: "Observations techniques", type: 'textarea', required: false },
    ]),
    body: '<div class="doc"><h1>FICHE TECHNIQUE — CULTURE DE L\'IGNAME</h1><p><strong>Exploitant :</strong> {{exploitant}}</p><p><strong>Variété :</strong> {{variete}}</p><p><strong>Superficie :</strong> {{superficie}} ha</p><p><strong>Date de plantation :</strong> {{date_plantation}}</p><h3>Observations</h3><p>{{observations}}</p></div>'
  },
  {
    code: 'agr4_fiche_cafe',
    name: "Fiche technique culture café",
    category: 'agro_environnement',
    price: 3000, priceMax: 7500,
    description: "Fiche technique de la caféiculture en Côte d'Ivoire : plantation, taille, fertilisation, traitement et récolte du café Robusta.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 71,
    fieldsJson: F([
      { key: 'planteur', label: "Nom du planteur", type: 'text', required: true },
      { key: 'localite', label: "Localité de la plantation", type: 'text', required: true },
      { key: 'superficie', label: "Superficie (ha)", type: 'text', required: true },
      { key: 'age_plantation', label: "Âge de la plantation (années)", type: 'text', required: true },
      { key: 'date_inspection', label: "Date d'inspection", type: 'date', required: true },
    ]),
    body: '<div class="doc"><h1>FICHE TECHNIQUE — CULTURE DU CAFÉ</h1><p><strong>Planteur :</strong> {{planteur}}</p><p><strong>Localité :</strong> {{localite}}</p><p><strong>Superficie :</strong> {{superficie}} ha</p><p><strong>Âge de la plantation :</strong> {{age_plantation}} ans</p><p><strong>Date d\'inspection :</strong> {{date_inspection}}</p></div>'
  },
  {
    code: 'agr4_fiche_cacao',
    name: "Fiche technique culture cacao",
    category: 'agro_environnement',
    price: 3000, priceMax: 7500,
    description: "Fiche technique de la cacaoculture : entretien des vergers, gestion des maladies (pourriture brune, mirides), fermentation et séchage.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 80,
    fieldsJson: F([
      { key: 'planteur', label: "Nom du planteur", type: 'text', required: true },
      { key: 'localite', label: "Localité de la plantation", type: 'text', required: true },
      { key: 'superficie', label: "Superficie (ha)", type: 'text', required: true },
      { key: 'production_estimee', label: "Production estimée (kg)", type: 'text', required: true },
      { key: 'date_inspection', label: "Date d'inspection", type: 'date', required: true },
    ]),
    body: '<div class="doc"><h1>FICHE TECHNIQUE — CULTURE DU CACAO</h1><p><strong>Planteur :</strong> {{planteur}}</p><p><strong>Localité :</strong> {{localite}}</p><p><strong>Superficie :</strong> {{superficie}} ha</p><p><strong>Production estimée :</strong> {{production_estimee}} kg</p><p><strong>Date d\'inspection :</strong> {{date_inspection}}</p></div>'
  },
  {
    code: 'agr4_protocole_irrigation',
    name: "Protocole d'irrigation",
    category: 'agro_environnement',
    price: 4000, priceMax: 9500,
    description: "Protocole technique définissant le calendrier, les doses et les méthodes d'irrigation pour une parcelle agricole.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 59,
    fieldsJson: F([
      { key: 'exploitant', label: "Nom de l'exploitant", type: 'text', required: true },
      { key: 'parcelle', label: "Identification de la parcelle", type: 'text', required: true },
      { key: 'methode_irrigation', label: "Méthode d'irrigation (goutte-à-goutte, aspersion, etc.)", type: 'text', required: true },
      { key: 'frequence', label: "Fréquence d'irrigation", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début", type: 'date', required: true },
    ]),
    body: '<div class="doc"><h1>PROTOCOLE D\'IRRIGATION</h1><p><strong>Exploitant :</strong> {{exploitant}}</p><p><strong>Parcelle :</strong> {{parcelle}}</p><p><strong>Méthode :</strong> {{methode_irrigation}}</p><p><strong>Fréquence :</strong> {{frequence}}</p><p><strong>Date de début :</strong> {{date_debut}}</p></div>'
  },
  {
    code: 'agr4_plan_ravageurs',
    name: "Plan de gestion des ravageurs",
    category: 'agro_environnement',
    price: 4000, priceMax: 9000,
    description: "Plan de lutte intégrée contre les ravageurs et adventices, avec méthodes biologiques, mécaniques et chimiques.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      { key: 'exploitation', label: "Exploitation agricole", type: 'text', required: true },
      { key: 'cultures_concernees', label: "Cultures concernées", type: 'text', required: true },
      { key: 'ravageurs_identifies', label: "Ravageurs identifiés", type: 'textarea', required: true },
      { key: 'methodes_lutte', label: "Méthodes de lutte préconisées", type: 'textarea', required: true },
      { key: 'date_plan', label: "Date d'élaboration du plan", type: 'date', required: true },
    ]),
    body: '<div class="doc"><h1>PLAN DE GESTION DES RAVAGEURS</h1><p><strong>Exploitation :</strong> {{exploitation}}</p><p><strong>Cultures concernées :</strong> {{cultures_concernees}}</p><h3>Ravageurs identifiés</h3><p>{{ravageurs_identifies}}</p><h3>Méthodes de lutte</h3><p>{{methodes_lutte}}</p><p><strong>Date :</strong> {{date_plan}}</p></div>'
  },
  {
    code: 'agr4_rapport_phytosanitaire',
    name: "Rapport phytosanitaire",
    category: 'agro_environnement',
    price: 3500, priceMax: 8000,
    description: "Rapport d'inspection phytosanitaire d'une exploitation ou d'un lot de produits agricoles, établi par un technicien agréé.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 57,
    fieldsJson: F([
      { key: 'inspecteur', label: "Nom de l'inspecteur", type: 'text', required: true },
      { key: 'exploitation', label: "Exploitation inspectée", type: 'text', required: true },
      { key: 'date_inspection', label: "Date d'inspection", type: 'date', required: true },
      { key: 'maladies_detectees', label: "Maladies / ravageurs détectés", type: 'textarea', required: true },
      { key: 'recommandations', label: "Recommandations", type: 'textarea', required: true },
    ]),
    body: '<div class="doc"><h1>RAPPORT PHYTOSANITAIRE</h1><p><strong>Inspecteur :</strong> {{inspecteur}}</p><p><strong>Exploitation :</strong> {{exploitation}}</p><p><strong>Date :</strong> {{date_inspection}}</p><h3>Maladies / ravageurs détectés</h3><p>{{maladies_detectees}}</p><h3>Recommandations</h3><p>{{recommandations}}</p></div>'
  },
  {
    code: 'agr4_certificat_semences',
    name: "Certificat de semences",
    category: 'agro_environnement',
    price: 3000, priceMax: 7000,
    description: "Certificat attestant la qualité, la pureté variétale et le taux de germination des semences commercialisées ou distribuées.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 64,
    fieldsJson: F([
      { key: 'fournisseur', label: "Fournisseur de semences", type: 'text', required: true },
      { key: 'espece', label: "Espèce / variété", type: 'text', required: true },
      { key: 'lot', label: "Numéro de lot", type: 'text', required: true },
      { key: 'taux_germination', label: "Taux de germination (%)", type: 'text', required: true },
      { key: 'date_controle', label: "Date de contrôle", type: 'date', required: true },
    ]),
    body: '<div class="doc"><h1>CERTIFICAT DE SEMENCES</h1><p><strong>Fournisseur :</strong> {{fournisseur}}</p><p><strong>Espèce / variété :</strong> {{espece}}</p><p><strong>N° de lot :</strong> {{lot}}</p><p><strong>Taux de germination :</strong> {{taux_germination}} %</p><p><strong>Date de contrôle :</strong> {{date_controle}}</p></div>'
  },
  {
    code: 'agr4_contrat_stockage',
    name: "Contrat de stockage céréales",
    category: 'agro_environnement',
    price: 4500, priceMax: 10000,
    description: "Contrat de stockage de céréales entre un producteur et un opérateur de silo ou entrepôt agréé.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 61,
    fieldsJson: F([
      { key: 'deposant', label: "Nom du déposant (producteur)", type: 'text', required: true },
      { key: 'gestionnaire', label: "Gestionnaire de l'entrepôt", type: 'text', required: true },
      { key: 'nature_cereales', label: "Nature des céréales", type: 'text', required: true },
      { key: 'quantite_kg', label: "Quantité déposée (kg)", type: 'text', required: true },
      { key: 'date_depot', label: "Date de dépôt", type: 'date', required: true },
      { key: 'duree_stockage', label: "Durée de stockage prévue", type: 'text', required: true },
    ]),
    body: '<div class="doc"><h1>CONTRAT DE STOCKAGE DE CÉRÉALES</h1><p><strong>Déposant :</strong> {{deposant}}</p><p><strong>Gestionnaire :</strong> {{gestionnaire}}</p><p><strong>Céréales :</strong> {{nature_cereales}}</p><p><strong>Quantité :</strong> {{quantite_kg}} kg</p><p><strong>Date de dépôt :</strong> {{date_depot}}</p><p><strong>Durée prévue :</strong> {{duree_stockage}}</p></div>'
  },
  {
    code: 'agr4_fiche_suivi_stock',
    name: "Fiche de suivi stock agricole",
    category: 'agro_environnement',
    price: 2500, priceMax: 5500,
    description: "Fiche de gestion et de suivi des stocks de produits agricoles (intrants, récoltes) dans un entrepôt ou une coopérative.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 55,
    fieldsJson: F([
      { key: 'gestionnaire', label: "Responsable du stock", type: 'text', required: true },
      { key: 'produit', label: "Produit stocké", type: 'text', required: true },
      { key: 'stock_initial', label: "Stock initial (kg ou unités)", type: 'text', required: true },
      { key: 'entrees', label: "Entrées de la période", type: 'text', required: true },
      { key: 'sorties', label: "Sorties de la période", type: 'text', required: true },
      { key: 'date_inventaire', label: "Date d'inventaire", type: 'date', required: true },
    ]),
    body: '<div class="doc"><h1>FICHE DE SUIVI DES STOCKS AGRICOLES</h1><p><strong>Responsable :</strong> {{gestionnaire}}</p><p><strong>Produit :</strong> {{produit}}</p><p><strong>Date d\'inventaire :</strong> {{date_inventaire}}</p><table style="width:100%;border-collapse:collapse;"><tr><th>Stock initial</th><th>Entrées</th><th>Sorties</th><th>Stock final</th></tr><tr><td>{{stock_initial}}</td><td>{{entrees}}</td><td>{{sorties}}</td><td>—</td></tr></table></div>'
  },
  {
    code: 'agr4_convention_warrantage',
    name: "Convention de warrantage",
    category: 'agro_environnement',
    price: 5500, priceMax: 13000,
    description: "Convention de warrantage agricole permettant à un producteur d'obtenir un crédit en nantissant ses stocks de céréales déposés dans un entrepôt agréé.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 67,
    fieldsJson: F([
      { key: 'producteur', label: "Nom du producteur", type: 'text', required: true },
      { key: 'institution_credit', label: "Institution de crédit", type: 'text', required: true },
      { key: 'entrepot', label: "Entrepôt agréé", type: 'text', required: true },
      { key: 'valeur_stock', label: "Valeur du stock nanti (FCFA)", type: 'text', required: true },
      { key: 'montant_credit', label: "Montant du crédit (FCFA)", type: 'text', required: true },
      { key: 'date_convention', label: "Date de la convention", type: 'date', required: true },
    ]),
    body: '<div class="doc"><h1>CONVENTION DE WARRANTAGE</h1><p><strong>Producteur :</strong> {{producteur}}</p><p><strong>Institution de crédit :</strong> {{institution_credit}}</p><p><strong>Entrepôt agréé :</strong> {{entrepot}}</p><p><strong>Valeur du stock nanti :</strong> {{valeur_stock}} FCFA</p><p><strong>Montant du crédit :</strong> {{montant_credit}} FCFA</p><p><strong>Date :</strong> {{date_convention}}</p></div>'
  },
  {
    code: 'agr4_rapport_qualite',
    name: "Rapport qualité produit agricole",
    category: 'agro_environnement',
    price: 3500, priceMax: 8000,
    description: "Rapport d'évaluation de la qualité d'un produit agricole (humidité, pureté, calibre, teneur) avant commercialisation ou exportation.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      { key: 'produit', label: "Produit évalué", type: 'text', required: true },
      { key: 'fournisseur', label: "Fournisseur / producteur", type: 'text', required: true },
      { key: 'lot', label: "Référence du lot", type: 'text', required: true },
      { key: 'date_analyse', label: "Date d'analyse", type: 'date', required: true },
      { key: 'resultats', label: "Résultats d'analyse", type: 'textarea', required: true },
    ]),
    body: '<div class="doc"><h1>RAPPORT QUALITÉ PRODUIT AGRICOLE</h1><p><strong>Produit :</strong> {{produit}}</p><p><strong>Fournisseur :</strong> {{fournisseur}}</p><p><strong>Lot :</strong> {{lot}}</p><p><strong>Date d\'analyse :</strong> {{date_analyse}}</p><h3>Résultats d\'analyse</h3><p>{{resultats}}</p></div>'
  },
  {
    code: 'agr4_plan_commercialisation',
    name: "Plan de commercialisation agricole",
    category: 'agro_environnement',
    price: 5000, priceMax: 12000,
    description: "Plan de commercialisation des produits agricoles définissant les circuits de vente, les prix cibles, les acheteurs et la stratégie de mise en marché.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 71,
    fieldsJson: F([
      { key: 'exploitation', label: "Exploitation / Coopérative", type: 'text', required: true },
      { key: 'produit', label: "Produit à commercialiser", type: 'text', required: true },
      { key: 'quantite_disponible', label: "Quantité disponible (kg ou tonnes)", type: 'text', required: true },
      { key: 'marches_cibles', label: "Marchés cibles", type: 'textarea', required: true },
      { key: 'prix_cible', label: "Prix cible (FCFA/kg)", type: 'text', required: true },
      { key: 'date_plan', label: "Date d'élaboration", type: 'date', required: true },
    ]),
    body: '<div class="doc"><h1>PLAN DE COMMERCIALISATION AGRICOLE</h1><p><strong>Exploitation :</strong> {{exploitation}}</p><p><strong>Produit :</strong> {{produit}}</p><p><strong>Quantité disponible :</strong> {{quantite_disponible}}</p><p><strong>Prix cible :</strong> {{prix_cible}} FCFA/kg</p><p><strong>Date :</strong> {{date_plan}}</p><h3>Marchés cibles</h3><p>{{marches_cibles}}</p></div>'
  },

  // ─── ÉLEVAGE (elev_) ────────────────────────────────────────────────────────
  {
    code: 'elev_plan_annuel',
    name: "Plan d'élevage annuel",
    category: 'agro_environnement',
    price: 4500, priceMax: 10000,
    description: "Plan annuel de conduite d'un élevage : objectifs de production, calendrier sanitaire, prévisions de ventes et d'approvisionnement en aliments.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      { key: 'eleveur', label: "Nom de l'éleveur", type: 'text', required: true },
      { key: 'type_elevage', label: "Type d'élevage (bovin, ovin, porcin, avicole...)", type: 'text', required: true },
      { key: 'effectif', label: "Effectif total du troupeau", type: 'text', required: true },
      { key: 'annee', label: "Année du plan", type: 'text', required: true },
      { key: 'objectifs', label: "Objectifs de production", type: 'textarea', required: true },
    ]),
    body: '<div class="doc"><h1>PLAN D\'ÉLEVAGE ANNUEL</h1><p><strong>Éleveur :</strong> {{eleveur}}</p><p><strong>Type d\'élevage :</strong> {{type_elevage}}</p><p><strong>Effectif :</strong> {{effectif}} têtes</p><p><strong>Année :</strong> {{annee}}</p><h3>Objectifs de production</h3><p>{{objectifs}}</p></div>'
  },
  {
    code: 'elev_fiche_sanitaire',
    name: "Fiche sanitaire troupeau",
    category: 'agro_environnement',
    price: 3000, priceMax: 7000,
    description: "Fiche de suivi sanitaire d'un troupeau recensant les interventions vétérinaires, vaccinations, traitements et incidents de santé.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      { key: 'eleveur', label: "Nom de l'éleveur", type: 'text', required: true },
      { key: 'espece', label: "Espèce animale", type: 'text', required: true },
      { key: 'effectif', label: "Effectif du troupeau", type: 'text', required: true },
      { key: 'date_fiche', label: "Date de mise à jour", type: 'date', required: true },
      { key: 'incidents', label: "Incidents sanitaires récents", type: 'textarea', required: false },
    ]),
    body: '<div class="doc"><h1>FICHE SANITAIRE DU TROUPEAU</h1><p><strong>Éleveur :</strong> {{eleveur}}</p><p><strong>Espèce :</strong> {{espece}}</p><p><strong>Effectif :</strong> {{effectif}} têtes</p><p><strong>Date :</strong> {{date_fiche}}</p><h3>Incidents sanitaires</h3><p>{{incidents}}</p></div>'
  },
  {
    code: 'elev_protocole_vaccination',
    name: "Protocole de vaccination animale",
    category: 'agro_environnement',
    price: 3500, priceMax: 8000,
    description: "Protocole officiel de vaccination des animaux d'élevage contre les maladies contagieuses réglementées (PPCB, FMD, maladie de Newcastle, etc.).",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      { key: 'veterinaire', label: "Vétérinaire responsable", type: 'text', required: true },
      { key: 'elevage', label: "Élevage concerné", type: 'text', required: true },
      { key: 'maladie_ciblee', label: "Maladie ciblée", type: 'text', required: true },
      { key: 'vaccin', label: "Vaccin utilisé", type: 'text', required: true },
      { key: 'date_vaccination', label: "Date de vaccination", type: 'date', required: true },
      { key: 'nombre_animaux', label: "Nombre d'animaux vaccinés", type: 'text', required: true },
    ]),
    body: '<div class="doc"><h1>PROTOCOLE DE VACCINATION ANIMALE</h1><p><strong>Vétérinaire :</strong> {{veterinaire}}</p><p><strong>Élevage :</strong> {{elevage}}</p><p><strong>Maladie ciblée :</strong> {{maladie_ciblee}}</p><p><strong>Vaccin :</strong> {{vaccin}}</p><p><strong>Date :</strong> {{date_vaccination}}</p><p><strong>Animaux vaccinés :</strong> {{nombre_animaux}}</p></div>'
  },
  {
    code: 'elev_registre_traitement',
    name: "Registre de traitement vétérinaire",
    category: 'agro_environnement',
    price: 2500, priceMax: 6000,
    description: "Registre obligatoire des traitements médicamenteux administrés aux animaux d'élevage, conformément aux exigences sanitaires.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 62,
    fieldsJson: F([
      { key: 'eleveur', label: "Nom de l'éleveur", type: 'text', required: true },
      { key: 'animal_traite', label: "Animal(s) traité(s)", type: 'text', required: true },
      { key: 'medicament', label: "Médicament / produit utilisé", type: 'text', required: true },
      { key: 'dose', label: "Dose administrée", type: 'text', required: true },
      { key: 'date_traitement', label: "Date du traitement", type: 'date', required: true },
    ]),
    body: '<div class="doc"><h1>REGISTRE DE TRAITEMENT VÉTÉRINAIRE</h1><p><strong>Éleveur :</strong> {{eleveur}}</p><p><strong>Animal(s) traité(s) :</strong> {{animal_traite}}</p><p><strong>Médicament :</strong> {{medicament}}</p><p><strong>Dose :</strong> {{dose}}</p><p><strong>Date :</strong> {{date_traitement}}</p></div>'
  },
  {
    code: 'elev_contrat_vente_betail',
    name: "Contrat de vente de bétail",
    category: 'agro_environnement',
    price: 4500, priceMax: 10000,
    description: "Contrat de vente d'animaux d'élevage entre un éleveur vendeur et un acheteur, avec description des animaux et conditions de paiement.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 76,
    fieldsJson: F([
      { key: 'vendeur', label: "Nom du vendeur", type: 'text', required: true },
      { key: 'acheteur', label: "Nom de l'acheteur", type: 'text', required: true },
      { key: 'description_animaux', label: "Description des animaux vendus", type: 'textarea', required: true },
      { key: 'prix_total', label: "Prix total de vente (FCFA)", type: 'text', required: true },
      { key: 'date_vente', label: "Date de la vente", type: 'date', required: true },
    ]),
    body: '<div class="doc"><h1>CONTRAT DE VENTE DE BÉTAIL</h1><p>Entre <strong>{{vendeur}}</strong> (vendeur) et <strong>{{acheteur}}</strong> (acheteur),</p><h3>Animaux cédés</h3><p>{{description_animaux}}</p><p><strong>Prix total :</strong> {{prix_total}} FCFA</p><p><strong>Date :</strong> {{date_vente}}</p></div>'
  },
  {
    code: 'elev_certificat_sanitaire',
    name: "Certificat sanitaire animal",
    category: 'agro_environnement',
    price: 3000, priceMax: 7500,
    description: "Certificat sanitaire délivré par un vétérinaire agréé attestant que les animaux sont exempts de maladies contagieuses avant transport ou vente.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      { key: 'veterinaire', label: "Vétérinaire signataire", type: 'text', required: true },
      { key: 'proprietaire', label: "Propriétaire des animaux", type: 'text', required: true },
      { key: 'espece', label: "Espèce animale", type: 'text', required: true },
      { key: 'nombre', label: "Nombre d'animaux", type: 'text', required: true },
      { key: 'date_examen', label: "Date d'examen clinique", type: 'date', required: true },
    ]),
    body: '<div class="doc"><h1>CERTIFICAT SANITAIRE ANIMAL</h1><p>Je soussigné(e), <strong>Dr {{veterinaire}}</strong>, vétérinaire agréé, certifie que les animaux appartenant à <strong>{{proprietaire}}</strong> :</p><p>Espèce : {{espece}} — Nombre : {{nombre}}</p><p>ont été examinés le {{date_examen}} et reconnus exempts de maladies contagieuses réglementées.</p></div>'
  },
  {
    code: 'elev_rapport_controle_vet',
    name: "Rapport de contrôle vétérinaire",
    category: 'agro_environnement',
    price: 3500, priceMax: 8000,
    description: "Rapport établi par un vétérinaire à l'issue d'une visite de contrôle d'un élevage, avec constat de l'état sanitaire et recommandations.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 64,
    fieldsJson: F([
      { key: 'veterinaire', label: "Vétérinaire", type: 'text', required: true },
      { key: 'elevage', label: "Élevage contrôlé", type: 'text', required: true },
      { key: 'date_visite', label: "Date de la visite", type: 'date', required: true },
      { key: 'constats', label: "Constats vétérinaires", type: 'textarea', required: true },
      { key: 'recommandations', label: "Recommandations", type: 'textarea', required: true },
    ]),
    body: '<div class="doc"><h1>RAPPORT DE CONTRÔLE VÉTÉRINAIRE</h1><p><strong>Vétérinaire :</strong> {{veterinaire}}</p><p><strong>Élevage :</strong> {{elevage}}</p><p><strong>Date de visite :</strong> {{date_visite}}</p><h3>Constats</h3><p>{{constats}}</p><h3>Recommandations</h3><p>{{recommandations}}</p></div>'
  },
  {
    code: 'elev_fiche_croissance',
    name: "Fiche de suivi croissance animale",
    category: 'agro_environnement',
    price: 2500, priceMax: 6000,
    description: "Fiche de suivi individuel ou par lot de la croissance pondérale des animaux d'élevage (pesées, GMQ).",
    templateType: 'pdf', classe: 'C', active: true, popularity: 58,
    fieldsJson: F([
      { key: 'eleveur', label: "Nom de l'éleveur", type: 'text', required: true },
      { key: 'identification_animal', label: "Identification de l'animal / du lot", type: 'text', required: true },
      { key: 'poids_initial', label: "Poids initial (kg)", type: 'text', required: true },
      { key: 'poids_actuel', label: "Poids actuel (kg)", type: 'text', required: true },
      { key: 'date_pesee', label: "Date de pesée", type: 'date', required: true },
    ]),
    body: '<div class="doc"><h1>FICHE DE SUIVI CROISSANCE ANIMALE</h1><p><strong>Éleveur :</strong> {{eleveur}}</p><p><strong>Animal / Lot :</strong> {{identification_animal}}</p><p><strong>Poids initial :</strong> {{poids_initial}} kg</p><p><strong>Poids actuel :</strong> {{poids_actuel}} kg</p><p><strong>Date de pesée :</strong> {{date_pesee}}</p></div>'
  },
  {
    code: 'elev_plan_alimentaire',
    name: "Plan alimentaire élevage",
    category: 'agro_environnement',
    price: 3500, priceMax: 8500,
    description: "Plan de rationnement et d'alimentation des animaux d'élevage par catégorie, avec rations journalières et coûts alimentaires.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 61,
    fieldsJson: F([
      { key: 'eleveur', label: "Nom de l'éleveur", type: 'text', required: true },
      { key: 'type_animaux', label: "Type et catégorie des animaux", type: 'text', required: true },
      { key: 'ration_journaliere', label: "Ration journalière (kg/animal)", type: 'text', required: true },
      { key: 'composition_ration', label: "Composition de la ration", type: 'textarea', required: true },
      { key: 'date_plan', label: "Date d'élaboration", type: 'date', required: true },
    ]),
    body: '<div class="doc"><h1>PLAN ALIMENTAIRE ÉLEVAGE</h1><p><strong>Éleveur :</strong> {{eleveur}}</p><p><strong>Animaux :</strong> {{type_animaux}}</p><p><strong>Ration journalière :</strong> {{ration_journaliere}} kg/animal</p><p><strong>Date :</strong> {{date_plan}}</p><h3>Composition de la ration</h3><p>{{composition_ration}}</p></div>'
  },
  {
    code: 'elev_rapport_production_laitiere',
    name: "Rapport de production laitière",
    category: 'agro_environnement',
    price: 3000, priceMax: 7000,
    description: "Rapport mensuel ou annuel de production laitière d'un élevage bovin ou caprin, avec analyse des performances et des rendements.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      { key: 'eleveur', label: "Nom de l'éleveur", type: 'text', required: true },
      { key: 'periode', label: "Période de référence", type: 'text', required: true },
      { key: 'nombre_laitieres', label: "Nombre de vaches / chèvres laitières", type: 'text', required: true },
      { key: 'production_totale', label: "Production totale (litres)", type: 'text', required: true },
      { key: 'date_rapport', label: "Date du rapport", type: 'date', required: true },
    ]),
    body: '<div class="doc"><h1>RAPPORT DE PRODUCTION LAITIÈRE</h1><p><strong>Éleveur :</strong> {{eleveur}}</p><p><strong>Période :</strong> {{periode}}</p><p><strong>Laitières :</strong> {{nombre_laitieres}}</p><p><strong>Production totale :</strong> {{production_totale}} litres</p><p><strong>Date :</strong> {{date_rapport}}</p></div>'
  },
  {
    code: 'elev_contrat_monte',
    name: "Contrat de monte",
    category: 'agro_environnement',
    price: 4000, priceMax: 9000,
    description: "Contrat de service de monte entre le propriétaire d'un reproducteur mâle et un éleveur souhaitant faire saillir ses femelles.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 55,
    fieldsJson: F([
      { key: 'proprietaire_male', label: "Propriétaire du reproducteur", type: 'text', required: true },
      { key: 'eleveur_demandeur', label: "Éleveur demandeur", type: 'text', required: true },
      { key: 'espece', label: "Espèce animale", type: 'text', required: true },
      { key: 'honoraires', label: "Honoraires convenus (FCFA)", type: 'text', required: true },
      { key: 'date_service', label: "Date du service de monte", type: 'date', required: true },
    ]),
    body: '<div class="doc"><h1>CONTRAT DE MONTE</h1><p><strong>Propriétaire du reproducteur :</strong> {{proprietaire_male}}</p><p><strong>Éleveur demandeur :</strong> {{eleveur_demandeur}}</p><p><strong>Espèce :</strong> {{espece}}</p><p><strong>Honoraires :</strong> {{honoraires}} FCFA</p><p><strong>Date du service :</strong> {{date_service}}</p></div>'
  },
  {
    code: 'elev_fiche_reproduction',
    name: "Fiche de reproduction animale",
    category: 'agro_environnement',
    price: 2500, priceMax: 6000,
    description: "Fiche individuelle de suivi de la reproduction d'un animal femelle : saillies, gestations, mises bas, taux de gestation.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 57,
    fieldsJson: F([
      { key: 'eleveur', label: "Nom de l'éleveur", type: 'text', required: true },
      { key: 'identification_femelle', label: "Identification de la femelle", type: 'text', required: true },
      { key: 'date_saillie', label: "Date de saillie", type: 'date', required: true },
      { key: 'date_mise_bas', label: "Date de mise bas prévue", type: 'date', required: false },
      { key: 'nombre_naissances', label: "Nombre de naissances", type: 'text', required: false },
    ]),
    body: '<div class="doc"><h1>FICHE DE REPRODUCTION ANIMALE</h1><p><strong>Éleveur :</strong> {{eleveur}}</p><p><strong>Femelle :</strong> {{identification_femelle}}</p><p><strong>Date de saillie :</strong> {{date_saillie}}</p><p><strong>Mise bas prévue :</strong> {{date_mise_bas}}</p><p><strong>Naissances :</strong> {{nombre_naissances}}</p></div>'
  },
  {
    code: 'elev_plan_effluents',
    name: "Plan de gestion des effluents",
    category: 'agro_environnement',
    price: 4500, priceMax: 10000,
    description: "Plan de gestion et de valorisation des effluents d'élevage (lisier, fumier, purins) pour minimiser l'impact environnemental.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 56,
    fieldsJson: F([
      { key: 'eleveur', label: "Nom de l'éleveur", type: 'text', required: true },
      { key: 'type_elevage', label: "Type d'élevage", type: 'text', required: true },
      { key: 'volume_effluents', label: "Volume annuel d'effluents estimé (m³)", type: 'text', required: true },
      { key: 'methode_traitement', label: "Méthode de traitement / valorisation", type: 'textarea', required: true },
      { key: 'date_plan', label: "Date d'élaboration", type: 'date', required: true },
    ]),
    body: '<div class="doc"><h1>PLAN DE GESTION DES EFFLUENTS D\'ÉLEVAGE</h1><p><strong>Éleveur :</strong> {{eleveur}}</p><p><strong>Type d\'élevage :</strong> {{type_elevage}}</p><p><strong>Volume annuel :</strong> {{volume_effluents}} m³</p><p><strong>Date :</strong> {{date_plan}}</p><h3>Méthode de traitement / valorisation</h3><p>{{methode_traitement}}</p></div>'
  },
  {
    code: 'elev_rapport_impact_env',
    name: "Rapport d'impact environnemental élevage",
    category: 'agro_environnement',
    price: 6000, priceMax: 15000,
    description: "Rapport d'évaluation de l'impact environnemental d'un élevage sur le sol, l'eau, l'air et la biodiversité, conformément à la réglementation environnementale ivoirienne.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 59,
    fieldsJson: F([
      { key: 'bureau_etude', label: "Bureau d'étude / Expert", type: 'text', required: true },
      { key: 'elevage', label: "Élevage concerné", type: 'text', required: true },
      { key: 'date_etude', label: "Date de l'étude", type: 'date', required: true },
      { key: 'impacts_identifies', label: "Impacts environnementaux identifiés", type: 'textarea', required: true },
      { key: 'mesures_attenuation', label: "Mesures d'atténuation proposées", type: 'textarea', required: true },
    ]),
    body: '<div class="doc"><h1>RAPPORT D\'IMPACT ENVIRONNEMENTAL — ÉLEVAGE</h1><p><strong>Bureau d\'étude :</strong> {{bureau_etude}}</p><p><strong>Élevage :</strong> {{elevage}}</p><p><strong>Date :</strong> {{date_etude}}</p><h3>Impacts identifiés</h3><p>{{impacts_identifies}}</p><h3>Mesures d\'atténuation</h3><p>{{mesures_attenuation}}</p></div>'
  },
  {
    code: 'elev_convention_achat_betail',
    name: "Convention d'achat de bétail",
    category: 'agro_environnement',
    price: 4500, priceMax: 10000,
    description: "Convention-cadre d'achat régulier de bétail entre un éleveur fournisseur et un acheteur professionnel (boucher, grossiste, transformateur).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 67,
    fieldsJson: F([
      { key: 'fournisseur', label: "Éleveur fournisseur", type: 'text', required: true },
      { key: 'acheteur', label: "Acheteur professionnel", type: 'text', required: true },
      { key: 'espece', label: "Espèce animale", type: 'text', required: true },
      { key: 'volume_mensuel', label: "Volume mensuel estimé (têtes)", type: 'text', required: true },
      { key: 'prix_unitaire', label: "Prix unitaire convenu (FCFA/kg vif)", type: 'text', required: true },
      { key: 'date_convention', label: "Date de la convention", type: 'date', required: true },
    ]),
    body: '<div class="doc"><h1>CONVENTION D\'ACHAT DE BÉTAIL</h1><p>Entre <strong>{{fournisseur}}</strong> (fournisseur) et <strong>{{acheteur}}</strong> (acheteur),</p><p><strong>Espèce :</strong> {{espece}}</p><p><strong>Volume mensuel :</strong> {{volume_mensuel}} têtes</p><p><strong>Prix convenu :</strong> {{prix_unitaire}} FCFA/kg vif</p><p><strong>Date :</strong> {{date_convention}}</p></div>'
  },
  {
    code: 'elev_fiche_identification',
    name: "Fiche d'identification animal",
    category: 'agro_environnement',
    price: 2000, priceMax: 5000,
    description: "Fiche d'identification individuelle d'un animal d'élevage avec ses caractéristiques zootechniques, numéro de boucle et historique.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 60,
    fieldsJson: F([
      { key: 'eleveur', label: "Nom de l'éleveur", type: 'text', required: true },
      { key: 'numero_boucle', label: "Numéro de boucle / tatouage", type: 'text', required: true },
      { key: 'espece_race', label: "Espèce et race", type: 'text', required: true },
      { key: 'date_naissance', label: "Date de naissance", type: 'date', required: true },
      { key: 'signes_particuliers', label: "Signes particuliers", type: 'text', required: false },
    ]),
    body: '<div class="doc"><h1>FICHE D\'IDENTIFICATION ANIMAL</h1><p><strong>Éleveur :</strong> {{eleveur}}</p><p><strong>N° boucle / tatouage :</strong> {{numero_boucle}}</p><p><strong>Espèce / race :</strong> {{espece_race}}</p><p><strong>Date de naissance :</strong> {{date_naissance}}</p><p><strong>Signes particuliers :</strong> {{signes_particuliers}}</p></div>'
  },
  {
    code: 'elev_rapport_performance',
    name: "Rapport de contrôle de performance",
    category: 'agro_environnement',
    price: 3500, priceMax: 8500,
    description: "Rapport de contrôle des performances zootechniques d'un élevage : taux de croissance, productivité numérique, efficacité alimentaire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      { key: 'controleur', label: "Contrôleur de performance", type: 'text', required: true },
      { key: 'elevage', label: "Élevage contrôlé", type: 'text', required: true },
      { key: 'date_controle', label: "Date du contrôle", type: 'date', required: true },
      { key: 'performances', label: "Résultats de performance", type: 'textarea', required: true },
      { key: 'recommandations', label: "Recommandations d'amélioration", type: 'textarea', required: false },
    ]),
    body: '<div class="doc"><h1>RAPPORT DE CONTRÔLE DE PERFORMANCE</h1><p><strong>Contrôleur :</strong> {{controleur}}</p><p><strong>Élevage :</strong> {{elevage}}</p><p><strong>Date :</strong> {{date_controle}}</p><h3>Résultats de performance</h3><p>{{performances}}</p><h3>Recommandations</h3><p>{{recommandations}}</p></div>'
  },
  {
    code: 'elev_contrat_gardiennage',
    name: "Contrat de gardiennage troupeau",
    category: 'agro_environnement',
    price: 4000, priceMax: 9000,
    description: "Contrat de gardiennage et de conduite de troupeau confié à un berger ou gardien contre rémunération.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      { key: 'proprietaire', label: "Propriétaire du troupeau", type: 'text', required: true },
      { key: 'gardien', label: "Nom du gardien / berger", type: 'text', required: true },
      { key: 'description_troupeau', label: "Description du troupeau confié", type: 'textarea', required: true },
      { key: 'remuneration', label: "Rémunération mensuelle (FCFA)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début du contrat", type: 'date', required: true },
    ]),
    body: '<div class="doc"><h1>CONTRAT DE GARDIENNAGE DE TROUPEAU</h1><p>Entre <strong>{{proprietaire}}</strong> (propriétaire) et <strong>{{gardien}}</strong> (gardien),</p><h3>Troupeau confié</h3><p>{{description_troupeau}}</p><p><strong>Rémunération mensuelle :</strong> {{remuneration}} FCFA</p><p><strong>Date de début :</strong> {{date_debut}}</p></div>'
  },
  {
    code: 'elev_plan_prevention_maladie',
    name: "Plan de prévention maladie animale",
    category: 'agro_environnement',
    price: 4000, priceMax: 9500,
    description: "Plan de biosécurité et de prévention des maladies animales dans un élevage : mesures d'hygiène, quarantaine, vaccinations préventives.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      { key: 'elevage', label: "Nom de l'élevage", type: 'text', required: true },
      { key: 'veterinaire', label: "Vétérinaire conseil", type: 'text', required: true },
      { key: 'maladies_ciblees', label: "Maladies ciblées", type: 'textarea', required: true },
      { key: 'mesures_biosecurite', label: "Mesures de biosécurité", type: 'textarea', required: true },
      { key: 'date_plan', label: "Date d'élaboration", type: 'date', required: true },
    ]),
    body: '<div class="doc"><h1>PLAN DE PRÉVENTION DES MALADIES ANIMALES</h1><p><strong>Élevage :</strong> {{elevage}}</p><p><strong>Vétérinaire conseil :</strong> {{veterinaire}}</p><p><strong>Date :</strong> {{date_plan}}</p><h3>Maladies ciblées</h3><p>{{maladies_ciblees}}</p><h3>Mesures de biosécurité</h3><p>{{mesures_biosecurite}}</p></div>'
  },
  {
    code: 'elev_rapport_epizootie',
    name: "Rapport épizootie",
    category: 'agro_environnement',
    price: 4500, priceMax: 11000,
    description: "Rapport officiel de déclaration et de suivi d'une épizootie (maladie contagieuse affectant un grand nombre d'animaux) adressé aux autorités vétérinaires.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 64,
    fieldsJson: F([
      { key: 'declarant', label: "Nom du déclarant (vétérinaire ou éleveur)", type: 'text', required: true },
      { key: 'elevage_affecte', label: "Élevage affecté", type: 'text', required: true },
      { key: 'maladie_suspectee', label: "Maladie suspectée", type: 'text', required: true },
      { key: 'date_declaration', label: "Date de déclaration", type: 'date', required: true },
      { key: 'animaux_atteints', label: "Nombre d'animaux atteints", type: 'text', required: true },
      { key: 'mesures_prises', label: "Mesures d'urgence prises", type: 'textarea', required: true },
    ]),
    body: '<div class="doc"><h1>RAPPORT D\'ÉPIZOOTIE</h1><p><strong>Déclarant :</strong> {{declarant}}</p><p><strong>Élevage affecté :</strong> {{elevage_affecte}}</p><p><strong>Maladie suspectée :</strong> {{maladie_suspectee}}</p><p><strong>Date :</strong> {{date_declaration}}</p><p><strong>Animaux atteints :</strong> {{animaux_atteints}}</p><h3>Mesures d\'urgence</h3><p>{{mesures_prises}}</p></div>'
  },
  {
    code: 'elev_demande_autorisation',
    name: "Demande d'autorisation d'élevage",
    category: 'agro_environnement',
    price: 4000, priceMax: 9000,
    description: "Demande d'autorisation d'ouverture ou d'extension d'un élevage adressée aux services compétents des ressources animales et halieutiques.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      { key: 'demandeur', label: "Nom du demandeur", type: 'text', required: true },
      { key: 'type_elevage', label: "Type et effectif d'élevage projeté", type: 'textarea', required: true },
      { key: 'localisation', label: "Localisation du site", type: 'text', required: true },
      { key: 'superficie_site', label: "Superficie du site (ha)", type: 'text', required: true },
      { key: 'date_demande', label: "Date de la demande", type: 'date', required: true },
    ]),
    body: '<div class="doc"><h1>DEMANDE D\'AUTORISATION D\'ÉLEVAGE</h1><p>Je soussigné(e) <strong>{{demandeur}}</strong>, sollicite l\'autorisation d\'ouvrir/étendre un élevage.</p><h3>Projet d\'élevage</h3><p>{{type_elevage}}</p><p><strong>Localisation :</strong> {{localisation}}</p><p><strong>Superficie du site :</strong> {{superficie_site}} ha</p><p><strong>Date :</strong> {{date_demande}}</p></div>'
  },
  {
    code: 'elev_convention_abattoir',
    name: "Convention avec abattoir",
    category: 'agro_environnement',
    price: 5000, priceMax: 12000,
    description: "Convention de prestation de services d'abattage entre un éleveur ou groupement et un abattoir agréé, avec tarifs et conditions d'accès.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 63,
    fieldsJson: F([
      { key: 'client', label: "Éleveur / groupement client", type: 'text', required: true },
      { key: 'abattoir', label: "Dénomination de l'abattoir", type: 'text', required: true },
      { key: 'tarif_abattage', label: "Tarif d'abattage (FCFA/tête)", type: 'text', required: true },
      { key: 'capacite_hebdo', label: "Capacité hebdomadaire réservée (têtes)", type: 'text', required: true },
      { key: 'date_convention', label: "Date de la convention", type: 'date', required: true },
    ]),
    body: '<div class="doc"><h1>CONVENTION AVEC ABATTOIR</h1><p>Entre <strong>{{client}}</strong> (client) et <strong>{{abattoir}}</strong> (prestataire),</p><p><strong>Tarif d\'abattage :</strong> {{tarif_abattage}} FCFA/tête</p><p><strong>Capacité réservée :</strong> {{capacite_hebdo}} têtes/semaine</p><p><strong>Date :</strong> {{date_convention}}</p></div>'
  },
  {
    code: 'elev_rapport_tracabilite',
    name: "Rapport de traçabilité viande",
    category: 'agro_environnement',
    price: 4000, priceMax: 9000,
    description: "Rapport de traçabilité de la viande depuis l'élevage jusqu'au consommateur, conformément aux exigences sanitaires et commerciales.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      { key: 'operateur', label: "Opérateur responsable de la traçabilité", type: 'text', required: true },
      { key: 'lot_viande', label: "Référence du lot de viande", type: 'text', required: true },
      { key: 'elevage_origine', label: "Élevage d'origine", type: 'text', required: true },
      { key: 'date_abattage', label: "Date d'abattage", type: 'date', required: true },
      { key: 'chaine_distribution', label: "Chaîne de distribution", type: 'textarea', required: true },
    ]),
    body: '<div class="doc"><h1>RAPPORT DE TRAÇABILITÉ VIANDE</h1><p><strong>Opérateur :</strong> {{operateur}}</p><p><strong>Lot :</strong> {{lot_viande}}</p><p><strong>Élevage d\'origine :</strong> {{elevage_origine}}</p><p><strong>Date d\'abattage :</strong> {{date_abattage}}</p><h3>Chaîne de distribution</h3><p>{{chaine_distribution}}</p></div>'
  },
  {
    code: 'elev_plan_haccp',
    name: "Plan HACCP élevage",
    category: 'agro_environnement',
    price: 6500, priceMax: 16000,
    description: "Plan HACCP (Hazard Analysis Critical Control Points) adapté à un élevage ou à une unité de transformation de produits animaux.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 61,
    fieldsJson: F([
      { key: 'etablissement', label: "Établissement concerné", type: 'text', required: true },
      { key: 'responsable', label: "Responsable HACCP", type: 'text', required: true },
      { key: 'produit_concerne', label: "Produit / activité concernée", type: 'text', required: true },
      { key: 'points_critiques', label: "Points critiques identifiés (CCP)", type: 'textarea', required: true },
      { key: 'date_plan', label: "Date d'élaboration", type: 'date', required: true },
    ]),
    body: '<div class="doc"><h1>PLAN HACCP — ÉLEVAGE</h1><p><strong>Établissement :</strong> {{etablissement}}</p><p><strong>Responsable HACCP :</strong> {{responsable}}</p><p><strong>Produit / activité :</strong> {{produit_concerne}}</p><p><strong>Date :</strong> {{date_plan}}</p><h3>Points critiques (CCP)</h3><p>{{points_critiques}}</p></div>'
  },
  {
    code: 'elev_certificat_origine',
    name: "Certificat d'origine animale",
    category: 'agro_environnement',
    price: 3000, priceMax: 7500,
    description: "Certificat attestant l'origine géographique et l'identité de l'élevage producteur d'animaux ou de produits animaux destinés à la vente ou à l'exportation.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      { key: 'autorite_delivrante', label: "Autorité délivrante", type: 'text', required: true },
      { key: 'eleveur', label: "Nom de l'éleveur", type: 'text', required: true },
      { key: 'localite_elevage', label: "Localité de l'élevage", type: 'text', required: true },
      { key: 'produit', label: "Produit / animaux concernés", type: 'text', required: true },
      { key: 'date_delivrance', label: "Date de délivrance", type: 'date', required: true },
    ]),
    body: '<div class="doc"><h1>CERTIFICAT D\'ORIGINE ANIMALE</h1><p>L\'autorité soussignée <strong>{{autorite_delivrante}}</strong> certifie que :</p><p><strong>Éleveur :</strong> {{eleveur}}</p><p><strong>Localité :</strong> {{localite_elevage}}</p><p><strong>Produit / animaux :</strong> {{produit}}</p><p>sont d\'origine locale et proviennent d\'un élevage régulièrement suivi.</p><p><strong>Délivré le :</strong> {{date_delivrance}}</p></div>'
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
  console.log(`Batch 13a OK — créés:${created} maj:${updated} TOTAL:${total}`);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
