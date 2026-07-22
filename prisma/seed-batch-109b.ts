import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // =====================================================================
  // 25 templates Économie de la mer / Pêche maritime (sea_)
  // =====================================================================
  {
    code: 'sea_licence_peche_maritime_ci',
    name: "Accord de licence de pêche maritime (CI - MIRAH)",
    category: 'agro_environnement',
    price: 8000,
    priceMax: 24000,
    description: "Accord de licence de pêche maritime délivré par le Ministère des Ressources Animales et Halieutiques (MIRAH) de Côte d'Ivoire, conforme à la réglementation nationale et aux engagements régionaux.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 75,
    fieldsJson: F([
      {key:'nom_armateur',label:"Nom de l'armateur",type:'text',required:true},
      {key:'nom_navire',label:"Nom du navire",type:'text',required:true},
      {key:'zone_peche',label:"Zone de pêche autorisée",type:'text',required:true},
      {key:'date_debut',label:"Date de début de validité",type:'date',required:true},
      {key:'date_fin',label:"Date de fin de validité",type:'date',required:true},
      {key:'especes_cibles',label:"Espèces cibles autorisées",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE LICENCE DE PÊCHE MARITIME</h1><h2>République de Côte d'Ivoire — MIRAH</h2><p>Le présent accord de licence est conclu conformément à la loi n°2016-554 du 26 juillet 2016 relative à la pêche et à l'aquaculture en Côte d'Ivoire.</p><h3>Article 1 — Identité de l'armateur</h3><p>Nom de l'armateur : <strong>{{nom_armateur}}</strong></p><p>Nom du navire : <strong>{{nom_navire}}</strong></p><h3>Article 2 — Zone de pêche</h3><p>Zone de pêche autorisée : {{zone_peche}}</p><h3>Article 3 — Espèces cibles</h3><p>{{especes_cibles}}</p><h3>Article 4 — Durée</h3><p>Du {{date_debut}} au {{date_fin}}.</p><h3>Article 5 — Obligations</h3><p>L'armateur s'engage à respecter les quotas fixés, à tenir un journal de bord conforme et à soumettre ses captures aux statistiques du MIRAH.</p></div>`
  },
  {
    code: 'sea_peche_artisanale_maritime',
    name: "Accord de pêche artisanale maritime (CI)",
    category: 'agro_environnement',
    price: 3000,
    priceMax: 9000,
    description: "Accord encadrant l'exercice de la pêche artisanale maritime en Côte d'Ivoire, destiné aux pêcheurs individuels et coopératives de pêche côtière.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 68,
    fieldsJson: F([
      {key:'nom_pecheur',label:"Nom et prénom du pêcheur",type:'text',required:true},
      {key:'type_embarcation',label:"Type d'embarcation",type:'text',required:true},
      {key:'port_attache',label:"Port d'attache",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true},
      {key:'observations',label:"Observations particulières",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PÊCHE ARTISANALE MARITIME</h1><p>Entre le MIRAH, représenté par son Directeur Général, et le pêcheur artisanal soussigné.</p><h3>Article 1 — Pêcheur</h3><p>Nom : <strong>{{nom_pecheur}}</strong> — Port d'attache : {{port_attache}}</p><h3>Article 2 — Embarcation</h3><p>Type : {{type_embarcation}}</p><h3>Article 3 — Engagements</h3><p>Le pêcheur s'engage à respecter les zones de pêche réservées à la pêche artisanale, à ne pas utiliser d'engins prohibés et à déclarer ses captures.</p><h3>Article 4 — Date</h3><p>Fait le {{date_accord}}.</p><p>{{observations}}</p></div>`
  },
  {
    code: 'sea_peche_industrielle_chalutier',
    name: "Accord de pêche industrielle (chalutier agréé CI)",
    category: 'agro_environnement',
    price: 10000,
    priceMax: 30000,
    description: "Accord de pêche industrielle pour chalutiers agréés opérant dans les eaux territoriales et la Zone Économique Exclusive de Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 70,
    fieldsJson: F([
      {key:'societe_armateur',label:"Société armatrice",type:'text',required:true},
      {key:'immatriculation_navire',label:"Immatriculation du navire",type:'text',required:true},
      {key:'tonnage_brut',label:"Tonnage brut (TJB)",type:'text',required:true},
      {key:'quota_annuel',label:"Quota annuel autorisé (tonnes)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'date_fin',label:"Date de fin",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PÊCHE INDUSTRIELLE</h1><h2>Chalutier Agréé — Eaux de Côte d'Ivoire</h2><h3>Article 1 — Parties</h3><p>La République de Côte d'Ivoire, représentée par le MIRAH, et la société <strong>{{societe_armateur}}</strong>.</p><h3>Article 2 — Navire</h3><p>Immatriculation : {{immatriculation_navire}} — Tonnage : {{tonnage_brut}} TJB</p><h3>Article 3 — Quota</h3><p>Quota annuel autorisé : {{quota_annuel}} tonnes.</p><h3>Article 4 — Durée</h3><p>Du {{date_debut}} au {{date_fin}}.</p><h3>Article 5 — Redevances</h3><p>Les redevances sont calculées selon le barème en vigueur au MIRAH et payables trimestriellement.</p><h3>Article 6 — Contrôle</h3><p>L'armateur accepte les inspections en mer et à quai des agents assermentés.</p></div>`
  },
  {
    code: 'sea_accord_peche_ue_ci',
    name: "Accord de pêche UE-CI (accord bilatéral)",
    category: 'agro_environnement',
    price: 12000,
    priceMax: 40000,
    description: "Modèle d'accord bilatéral de pêche entre l'Union Européenne et la Côte d'Ivoire, conforme aux Accords de Partenariat dans le domaine de la Pêche Durable (APPD).",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 60,
    fieldsJson: F([
      {key:'etat_membre_ue',label:"État membre de l'UE",type:'text',required:true},
      {key:'nombre_navires',label:"Nombre de navires autorisés",type:'text',required:true},
      {key:'contribution_financiere',label:"Contribution financière annuelle (EUR)",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
      {key:'clauses_sociales',label:"Clauses sociales et emploi local",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PÊCHE BILATÉRAL UE — CÔTE D'IVOIRE</h1><h3>Article 1 — Parties</h3><p>La République de Côte d'Ivoire et l'État membre de l'Union Européenne : <strong>{{etat_membre_ue}}</strong>.</p><h3>Article 2 — Accès</h3><p>Nombre de navires autorisés : {{nombre_navires}}.</p><h3>Article 3 — Contribution financière</h3><p>Montant annuel : {{contribution_financiere}} EUR, versé au Trésor Public ivoirien.</p><h3>Article 4 — Clauses sociales</h3><p>{{clauses_sociales}}</p><h3>Article 5 — Signature</h3><p>Signé le {{date_signature}}.</p></div>`
  },
  {
    code: 'sea_surveillance_maritime',
    name: "Accord de service de surveillance maritime (garde-côtes CI)",
    category: 'agro_environnement',
    price: 9000,
    priceMax: 27000,
    description: "Accord de prestation de services de surveillance maritime entre les garde-côtes ivoiriens et un opérateur privé ou public, pour la protection des eaux territoriales de Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 65,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire de surveillance",type:'text',required:true},
      {key:'zone_surveillance',label:"Zone de surveillance",type:'text',required:true},
      {key:'moyens_deployes',label:"Moyens déployés (navires, drones...)",type:'textarea',required:true},
      {key:'duree_contrat',label:"Durée du contrat",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SURVEILLANCE MARITIME</h1><h2>Garde-Côtes de Côte d'Ivoire</h2><h3>Article 1 — Prestataire</h3><p><strong>{{prestataire}}</strong></p><h3>Article 2 — Zone</h3><p>{{zone_surveillance}}</p><h3>Article 3 — Moyens</h3><p>{{moyens_deployes}}</p><h3>Article 4 — Durée</h3><p>{{duree_contrat}} à compter du {{date_debut}}.</p><h3>Article 5 — Obligations</h3><p>Rapports hebdomadaires transmis à la Capitainerie et au MIRAH. Intervention immédiate en cas de pêche INN détectée.</p></div>`
  },
  {
    code: 'sea_lutte_peche_inn',
    name: "Accord de service de lutte contre la pêche INN (illégale, non déclarée)",
    category: 'agro_environnement',
    price: 8000,
    priceMax: 24000,
    description: "Accord de service dédié à la lutte contre la pêche illégale, non déclarée et non réglementée (INN) dans les eaux ivoiriennes, conformément aux instruments FAO.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 58,
    fieldsJson: F([
      {key:'organisme_mandataire',label:"Organisme mandataire",type:'text',required:true},
      {key:'methodes_detection',label:"Méthodes de détection utilisées",type:'textarea',required:true},
      {key:'protocole_sanction',label:"Protocole de sanction",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'budget_alloue',label:"Budget alloué (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE LUTTE CONTRE LA PÊCHE INN</h1><h3>Article 1 — Mandataire</h3><p><strong>{{organisme_mandataire}}</strong></p><h3>Article 2 — Méthodes</h3><p>{{methodes_detection}}</p><h3>Article 3 — Sanctions</h3><p>{{protocole_sanction}}</p><h3>Article 4 — Budget</h3><p>{{budget_alloue}} FCFA — Date de début : {{date_debut}}.</p><h3>Article 5 — Reporting</h3><p>Rapport mensuel soumis au MIRAH et à la Commission Sous-Régionale des Pêches (CSRP).</p></div>`
  },
  {
    code: 'sea_certification_msc',
    name: "Accord de service de certification MSC pêche durable (maritime)",
    category: 'agro_environnement',
    price: 7000,
    priceMax: 21000,
    description: "Accord de prestation pour l'obtention et le maintien de la certification Marine Stewardship Council (MSC) pour une pêcherie maritime ivoirienne.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 55,
    fieldsJson: F([
      {key:'pecherie_candidate',label:"Pêcherie candidate",type:'text',required:true},
      {key:'organisme_certificateur',label:"Organisme certificateur MSC",type:'text',required:true},
      {key:'especes_evaluees',label:"Espèces évaluées",type:'textarea',required:true},
      {key:'date_audit',label:"Date d'audit initial",type:'date',required:true},
      {key:'cout_certification',label:"Coût de la certification (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CERTIFICATION MSC PÊCHE DURABLE</h1><h3>Article 1 — Pêcherie</h3><p><strong>{{pecherie_candidate}}</strong></p><h3>Article 2 — Organisme</h3><p>{{organisme_certificateur}}</p><h3>Article 3 — Espèces</h3><p>{{especes_evaluees}}</p><h3>Article 4 — Audit</h3><p>Date d'audit initial : {{date_audit}} — Coût : {{cout_certification}} FCFA.</p><h3>Article 5 — Engagements</h3><p>La pêcherie s'engage à mettre en œuvre les plans d'amélioration MSC et à maintenir sa certification par des audits annuels de surveillance.</p></div>`
  },
  {
    code: 'sea_certification_asc_aquaculture',
    name: "Accord de service de certification ASC aquaculture marine",
    category: 'agro_environnement',
    price: 7000,
    priceMax: 21000,
    description: "Accord de service pour la certification Aquaculture Stewardship Council (ASC) d'une ferme d'aquaculture marine en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 50,
    fieldsJson: F([
      {key:'ferme_aquacole',label:"Ferme aquacole candidate",type:'text',required:true},
      {key:'espece_elevee',label:"Espèce élevée",type:'text',required:true},
      {key:'surface_exploitation',label:"Surface d'exploitation (ha)",type:'text',required:true},
      {key:'date_debut_certification',label:"Date de début de certification",type:'date',required:true},
      {key:'plan_amelioration',label:"Plan d'amélioration environnementale",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CERTIFICATION ASC AQUACULTURE MARINE</h1><h3>Article 1 — Ferme</h3><p><strong>{{ferme_aquacole}}</strong> — Espèce : {{espece_elevee}} — Surface : {{surface_exploitation}} ha</p><h3>Article 2 — Plan d'amélioration</h3><p>{{plan_amelioration}}</p><h3>Article 3 — Date</h3><p>Début : {{date_debut_certification}}.</p><h3>Article 4 — Standards</h3><p>La ferme s'engage à respecter les standards ASC relatifs à la qualité de l'eau, la biodiversité, les droits sociaux et la traçabilité.</p></div>`
  },
  {
    code: 'sea_conservation_chaine_froid',
    name: "Accord de service de conservation des produits de la mer (chaîne du froid)",
    category: 'agro_environnement',
    price: 5000,
    priceMax: 15000,
    description: "Accord de prestation de services de conservation et de maintien de la chaîne du froid pour les produits halieutiques en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 62,
    fieldsJson: F([
      {key:'prestataire_froid',label:"Prestataire chaîne du froid",type:'text',required:true},
      {key:'client',label:"Client (pêcheur/entreprise)",type:'text',required:true},
      {key:'capacite_stockage',label:"Capacité de stockage (tonnes)",type:'text',required:true},
      {key:'temperature_conservation',label:"Température de conservation (°C)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CONSERVATION DES PRODUITS DE LA MER</h1><h2>Chaîne du Froid</h2><h3>Article 1 — Parties</h3><p>Prestataire : <strong>{{prestataire_froid}}</strong> — Client : <strong>{{client}}</strong></p><h3>Article 2 — Capacité</h3><p>Capacité : {{capacite_stockage}} tonnes à {{temperature_conservation}}°C.</p><h3>Article 3 — Obligations</h3><p>Le prestataire garantit la continuité de la chaîne du froid, la traçabilité des lots et la conformité aux normes sanitaires du MIRAH et du Codex Alimentarius.</p><h3>Article 4 — Début</h3><p>{{date_debut}}</p></div>`
  },
  {
    code: 'sea_transformation_conserverie',
    name: "Accord de service de transformation des produits de la mer (conserverie)",
    category: 'agro_environnement',
    price: 6000,
    priceMax: 18000,
    description: "Accord de prestation pour la transformation industrielle des produits de la mer (conserverie, fumage, séchage) en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 60,
    fieldsJson: F([
      {key:'conserverie',label:"Nom de la conserverie",type:'text',required:true},
      {key:'fournisseur',label:"Fournisseur de matière première",type:'text',required:true},
      {key:'type_transformation',label:"Type de transformation (conserve, fumage...)",type:'text',required:true},
      {key:'volume_mensuel',label:"Volume mensuel traité (kg)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'normes_qualite',label:"Normes qualité applicables",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TRANSFORMATION DES PRODUITS DE LA MER</h1><h3>Article 1 — Parties</h3><p>Conserverie : <strong>{{conserverie}}</strong> — Fournisseur : <strong>{{fournisseur}}</strong></p><h3>Article 2 — Transformation</h3><p>Type : {{type_transformation}} — Volume mensuel : {{volume_mensuel}} kg.</p><h3>Article 3 — Normes</h3><p>{{normes_qualite}}</p><h3>Article 4 — Début</h3><p>{{date_debut}}</p></div>`
  },
  {
    code: 'sea_commercialisation_poissons_marins',
    name: "Accord de service de commercialisation poissons marins (grossiste)",
    category: 'agro_environnement',
    price: 4000,
    priceMax: 12000,
    description: "Accord commercial entre un grossiste en poissons marins et ses fournisseurs ou clients, encadrant les conditions de vente et de distribution en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 66,
    fieldsJson: F([
      {key:'grossiste',label:"Nom du grossiste",type:'text',required:true},
      {key:'fournisseur_pecheur',label:"Fournisseur / pêcheur",type:'text',required:true},
      {key:'especes_commercialisees',label:"Espèces commercialisées",type:'textarea',required:true},
      {key:'prix_unitaire',label:"Prix unitaire (FCFA/kg)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE COMMERCIALISATION DE POISSONS MARINS</h1><h3>Article 1 — Parties</h3><p>Grossiste : <strong>{{grossiste}}</strong> — Fournisseur : <strong>{{fournisseur_pecheur}}</strong></p><h3>Article 2 — Produits</h3><p>{{especes_commercialisees}}</p><h3>Article 3 — Prix</h3><p>{{prix_unitaire}} FCFA/kg.</p><h3>Article 4 — Date</h3><p>{{date_accord}}</p><h3>Article 5 — Paiement</h3><p>Paiement à 30 jours à compter de la livraison, par virement bancaire.</p></div>`
  },
  {
    code: 'sea_vente_export_produits_mer',
    name: "Accord de service de vente à l'export produits de la mer",
    category: 'agro_environnement',
    price: 8000,
    priceMax: 24000,
    description: "Accord d'exportation de produits halieutiques ivoiriens vers les marchés internationaux, incluant les certifications phytosanitaires et douanières.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 58,
    fieldsJson: F([
      {key:'exportateur',label:"Société exportatrice",type:'text',required:true},
      {key:'pays_destination',label:"Pays de destination",type:'text',required:true},
      {key:'produits_exportes',label:"Produits exportés",type:'textarea',required:true},
      {key:'volume_export',label:"Volume d'exportation (tonnes/an)",type:'text',required:true},
      {key:'date_premier_envoi',label:"Date du premier envoi",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE VENTE À L'EXPORT — PRODUITS DE LA MER</h1><h3>Article 1 — Exportateur</h3><p><strong>{{exportateur}}</strong></p><h3>Article 2 — Destination</h3><p>Pays : {{pays_destination}} — Volume : {{volume_export}} tonnes/an.</p><h3>Article 3 — Produits</h3><p>{{produits_exportes}}</p><h3>Article 4 — Premier envoi</h3><p>{{date_premier_envoi}}</p><h3>Article 5 — Certifications</h3><p>L'exportateur s'engage à fournir les certificats sanitaires, d'origine et de conformité exigés par le pays importateur.</p></div>`
  },
  {
    code: 'sea_recherche_oceanographique_cnsp',
    name: "Accord de service de recherche océanographique (CNSP CI)",
    category: 'agro_environnement',
    price: 9000,
    priceMax: 27000,
    description: "Accord de prestation de recherche océanographique entre le Centre National de Recherche Océanographique (CNROH) et un partenaire scientifique, sous l'égide du MIRAH.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 48,
    fieldsJson: F([
      {key:'institution_partenaire',label:"Institution partenaire",type:'text',required:true},
      {key:'programme_recherche',label:"Programme de recherche",type:'textarea',required:true},
      {key:'zone_etude',label:"Zone d'étude",type:'text',required:true},
      {key:'duree_programme',label:"Durée du programme",type:'text',required:true},
      {key:'date_lancement',label:"Date de lancement",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RECHERCHE OCÉANOGRAPHIQUE</h1><h2>CNROH — Côte d'Ivoire</h2><h3>Article 1 — Partenaire</h3><p><strong>{{institution_partenaire}}</strong></p><h3>Article 2 — Programme</h3><p>{{programme_recherche}}</p><h3>Article 3 — Zone et durée</h3><p>Zone : {{zone_etude}} — Durée : {{duree_programme}} — Lancement : {{date_lancement}}.</p><h3>Article 4 — Propriété intellectuelle</h3><p>Les données collectées sont co-propriété des parties. Les publications scientifiques mentionneront les deux institutions.</p></div>`
  },
  {
    code: 'sea_cartographie_marine_bathymetrie',
    name: "Accord de service de cartographie marine (bathymétrie)",
    category: 'agro_environnement',
    price: 10000,
    priceMax: 30000,
    description: "Accord de prestation pour les levés bathymétriques et la cartographie des fonds marins ivoiriens, destinés à la navigation, la pêche et l'aménagement côtier.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 45,
    fieldsJson: F([
      {key:'bureau_etudes',label:"Bureau d'études hydrographiques",type:'text',required:true},
      {key:'zone_levee',label:"Zone de levé bathymétrique",type:'text',required:true},
      {key:'methode_levee',label:"Méthode de levé (multifaisceaux, etc.)",type:'text',required:true},
      {key:'livrable',label:"Livrables attendus",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CARTOGRAPHIE MARINE — BATHYMÉTRIE</h1><h3>Article 1 — Bureau d'études</h3><p><strong>{{bureau_etudes}}</strong></p><h3>Article 2 — Zone et méthode</h3><p>Zone : {{zone_levee}} — Méthode : {{methode_levee}}</p><h3>Article 3 — Livrables</h3><p>{{livrable}}</p><h3>Article 4 — Début</h3><p>{{date_debut}}</p><h3>Article 5 — Normes</h3><p>Les levés seront conformes aux normes S-44 de l'Organisation Hydrographique Internationale (OHI).</p></div>`
  },
  {
    code: 'sea_gestion_aire_marine_protegee',
    name: "Accord de service de gestion d'une aire marine protégée (AMP CI)",
    category: 'agro_environnement',
    price: 8000,
    priceMax: 24000,
    description: "Accord de gestion déléguée d'une Aire Marine Protégée (AMP) en Côte d'Ivoire, conforme à la politique nationale de conservation des écosystèmes marins et côtiers.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 52,
    fieldsJson: F([
      {key:'gestionnaire_amp',label:"Organisme gestionnaire de l'AMP",type:'text',required:true},
      {key:'nom_amp',label:"Nom de l'AMP",type:'text',required:true},
      {key:'superficie_amp',label:"Superficie (km²)",type:'text',required:true},
      {key:'objectifs_conservation',label:"Objectifs de conservation",type:'textarea',required:true},
      {key:'date_debut',label:"Date de prise en gestion",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE GESTION D'AIRE MARINE PROTÉGÉE</h1><h2>{{nom_amp}} — Côte d'Ivoire</h2><h3>Article 1 — Gestionnaire</h3><p><strong>{{gestionnaire_amp}}</strong> — Superficie : {{superficie_amp}} km²</p><h3>Article 2 — Objectifs</h3><p>{{objectifs_conservation}}</p><h3>Article 3 — Prise en gestion</h3><p>{{date_debut}}</p><h3>Article 4 — Financement</h3><p>Le gestionnaire bénéficiera des fonds du Fonds Mondial pour l'Environnement (FEM) et des contributions des partenaires techniques.</p></div>`
  },
  {
    code: 'sea_aquaculture_marine_pisciculture',
    name: "Accord de service d'aquaculture marine (pisciculture marine)",
    category: 'agro_environnement',
    price: 6000,
    priceMax: 18000,
    description: "Accord encadrant une exploitation d'aquaculture marine (pisciculture en cage) en Côte d'Ivoire, conforme aux textes du MIRAH et de l'ANADER.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 57,
    fieldsJson: F([
      {key:'operateur_aquacole',label:"Opérateur aquacole",type:'text',required:true},
      {key:'site_exploitation',label:"Site d'exploitation",type:'text',required:true},
      {key:'espece_elevee',label:"Espèce élevée",type:'text',required:true},
      {key:'capacite_production',label:"Capacité de production (tonnes/an)",type:'text',required:true},
      {key:'date_debut',label:"Date de début d'activité",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'AQUACULTURE MARINE</h1><h2>Pisciculture Marine — Côte d'Ivoire</h2><h3>Article 1 — Opérateur</h3><p><strong>{{operateur_aquacole}}</strong> — Site : {{site_exploitation}}</p><h3>Article 2 — Espèce et production</h3><p>Espèce : {{espece_elevee}} — Capacité : {{capacite_production}} tonnes/an.</p><h3>Article 3 — Début</h3><p>{{date_debut}}</p><h3>Article 4 — Obligations réglementaires</h3><p>L'opérateur respectera les normes sanitaires du MIRAH, les prescriptions du plan de gestion environnementale et sociale (PGES) et les quotas d'intrants homologués.</p></div>`
  },
  {
    code: 'sea_ferme_algues_marines',
    name: "Accord de service de ferme d'algues marines",
    category: 'agro_environnement',
    price: 5000,
    priceMax: 15000,
    description: "Accord de création et d'exploitation d'une ferme d'algues marines en Côte d'Ivoire, pour les marchés alimentaire, cosmétique et pharmaceutique.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 42,
    fieldsJson: F([
      {key:'exploitant',label:"Exploitant de la ferme",type:'text',required:true},
      {key:'localisation',label:"Localisation de la ferme",type:'text',required:true},
      {key:'especes_algues',label:"Espèces d'algues cultivées",type:'textarea',required:true},
      {key:'marche_cible',label:"Marché cible (alimentaire, cosmétique...)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FERME D'ALGUES MARINES</h1><h3>Article 1 — Exploitant</h3><p><strong>{{exploitant}}</strong> — Localisation : {{localisation}}</p><h3>Article 2 — Espèces</h3><p>{{especes_algues}}</p><h3>Article 3 — Marché</h3><p>Marché cible : {{marche_cible}}</p><h3>Article 4 — Début</h3><p>{{date_debut}}</p><h3>Article 5 — Durabilité</h3><p>La ferme adoptera des pratiques d'algoculture durable conformes aux recommandations de la FAO.</p></div>`
  },
  {
    code: 'sea_production_sel_marin',
    name: "Accord de service de production de sel marin (salines CI)",
    category: 'agro_environnement',
    price: 4000,
    priceMax: 12000,
    description: "Accord de production et de commercialisation de sel marin issu des salines de Côte d'Ivoire, conforme aux normes de qualité alimentaire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 55,
    fieldsJson: F([
      {key:'saliniers',label:"Groupement de saliniers",type:'text',required:true},
      {key:'localisation_salines',label:"Localisation des salines",type:'text',required:true},
      {key:'production_annuelle',label:"Production annuelle (tonnes)",type:'text',required:true},
      {key:'acheteur',label:"Acheteur principal",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PRODUCTION DE SEL MARIN</h1><h2>Salines de Côte d'Ivoire</h2><h3>Article 1 — Saliniers</h3><p><strong>{{saliniers}}</strong> — Localisation : {{localisation_salines}}</p><h3>Article 2 — Production</h3><p>Volume annuel : {{production_annuelle}} tonnes.</p><h3>Article 3 — Acheteur</h3><p>{{acheteur}}</p><h3>Article 4 — Date</h3><p>{{date_accord}}</p><h3>Article 5 — Qualité</h3><p>Le sel produit devra satisfaire aux normes iodation et pureté du Ministère de la Santé.</p></div>`
  },
  {
    code: 'sea_energie_marine_houlomotrice',
    name: "Accord de service d'énergie marine (houlomotrice)",
    category: 'agro_environnement',
    price: 12000,
    priceMax: 40000,
    description: "Accord de développement d'un projet d'énergie houlomotrice (énergie des vagues) en Côte d'Ivoire, dans le cadre de la transition énergétique et de l'économie bleue.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 38,
    fieldsJson: F([
      {key:'developpeur_projet',label:"Développeur du projet",type:'text',required:true},
      {key:'localisation_projet',label:"Localisation du projet",type:'text',required:true},
      {key:'puissance_installee',label:"Puissance installée (MW)",type:'text',required:true},
      {key:'duree_concession',label:"Durée de la concession (ans)",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ÉNERGIE MARINE HOULOMOTRICE</h1><h3>Article 1 — Développeur</h3><p><strong>{{developpeur_projet}}</strong></p><h3>Article 2 — Projet</h3><p>Localisation : {{localisation_projet}} — Puissance : {{puissance_installee}} MW.</p><h3>Article 3 — Concession</h3><p>Durée : {{duree_concession}} ans — Signé le : {{date_signature}}.</p><h3>Article 4 — Cadre réglementaire</h3><p>Le projet est soumis à l'approbation du Ministère des Mines et de l'Énergie et à l'évaluation environnementale de l'ANDE.</p></div>`
  },
  {
    code: 'sea_cable_sous_marin',
    name: "Accord de service de câble sous-marin (pose et maintenance)",
    category: 'agro_environnement',
    price: 12000,
    priceMax: 36000,
    description: "Accord de pose et de maintenance d'un câble sous-marin en Côte d'Ivoire, pour les télécommunications ou le transport d'énergie, avec clauses environnementales marines.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 40,
    fieldsJson: F([
      {key:'operateur_cable',label:"Opérateur du câble",type:'text',required:true},
      {key:'trajet_cable',label:"Tracé du câble",type:'text',required:true},
      {key:'longueur_cable',label:"Longueur totale (km)",type:'text',required:true},
      {key:'usage_cable',label:"Usage (télécom, énergie...)",type:'text',required:true},
      {key:'date_pose',label:"Date de pose prévue",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CÂBLE SOUS-MARIN</h1><h2>Pose et Maintenance</h2><h3>Article 1 — Opérateur</h3><p><strong>{{operateur_cable}}</strong></p><h3>Article 2 — Câble</h3><p>Tracé : {{trajet_cable}} — Longueur : {{longueur_cable}} km — Usage : {{usage_cable}}</p><h3>Article 3 — Pose</h3><p>Date prévue : {{date_pose}}</p><h3>Article 4 — Environnement</h3><p>L'opérateur réalisera une étude d'impact sur les fonds marins et les habitats coralliens et mettra en place un plan de restauration en cas de dommages.</p></div>`
  },
  {
    code: 'sea_gestion_environnement_marin_pollution',
    name: "Accord de service de gestion de l'environnement marin (pollution)",
    category: 'agro_environnement',
    price: 7000,
    priceMax: 21000,
    description: "Accord de prestation pour la gestion et le traitement de la pollution marine (hydrocarbures, plastiques, effluents) dans les eaux ivoiriennes.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 53,
    fieldsJson: F([
      {key:'prestataire_depollution',label:"Prestataire de dépollution",type:'text',required:true},
      {key:'type_pollution',label:"Type de pollution traitée",type:'textarea',required:true},
      {key:'zone_intervention',label:"Zone d'intervention",type:'text',required:true},
      {key:'technologies_utilisees',label:"Technologies utilisées",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE GESTION DE L'ENVIRONNEMENT MARIN</h1><h2>Lutte contre la Pollution Maritime</h2><h3>Article 1 — Prestataire</h3><p><strong>{{prestataire_depollution}}</strong></p><h3>Article 2 — Pollution</h3><p>{{type_pollution}}</p><h3>Article 3 — Zone</h3><p>{{zone_intervention}}</p><h3>Article 4 — Technologies</h3><p>{{technologies_utilisees}}</p><h3>Article 5 — Date</h3><p>{{date_debut}}</p></div>`
  },
  {
    code: 'sea_formation_metiers_mer',
    name: "Accord de service de formation aux métiers de la mer",
    category: 'agro_environnement',
    price: 4000,
    priceMax: 12000,
    description: "Accord de prestation de formation professionnelle aux métiers de la mer (navigation, pêche, mécanique navale, plongée) en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 60,
    fieldsJson: F([
      {key:'centre_formation',label:"Centre de formation maritime",type:'text',required:true},
      {key:'client_employeur',label:"Client / Employeur",type:'text',required:true},
      {key:'formations_dispensees',label:"Formations dispensées",type:'textarea',required:true},
      {key:'nombre_stagiaires',label:"Nombre de stagiaires",type:'text',required:true},
      {key:'date_debut',label:"Date de début de formation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE FORMATION AUX MÉTIERS DE LA MER</h1><h3>Article 1 — Centre de formation</h3><p><strong>{{centre_formation}}</strong> — Client : {{client_employeur}}</p><h3>Article 2 — Programme</h3><p>{{formations_dispensees}}</p><h3>Article 3 — Stagiaires</h3><p>Nombre : {{nombre_stagiaires}} — Début : {{date_debut}}</p><h3>Article 4 — Certification</h3><p>Les formations donnent lieu à des attestations reconnues par la Direction Générale des Affaires Maritimes (DGAM) de Côte d'Ivoire.</p></div>`
  },
  {
    code: 'sea_rapport_bilan_peche_maritime',
    name: "Rapport de bilan pêche maritime",
    category: 'agro_environnement',
    price: 3000,
    priceMax: 9000,
    description: "Modèle de rapport de bilan annuel ou semestriel de l'activité de pêche maritime en Côte d'Ivoire, destiné au MIRAH et aux partenaires institutionnels.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 65,
    fieldsJson: F([
      {key:'redacteur',label:"Rédacteur du rapport",type:'text',required:true},
      {key:'periode_bilan',label:"Période de bilan",type:'text',required:true},
      {key:'volume_captures',label:"Volume total des captures (tonnes)",type:'text',required:true},
      {key:'analyse_stocks',label:"Analyse de l'état des stocks",type:'textarea',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE BILAN PÊCHE MARITIME</h1><h2>Côte d'Ivoire — MIRAH</h2><h3>1. Présentation</h3><p>Rédacteur : {{redacteur}} — Période : {{periode_bilan}} — Date : {{date_rapport}}</p><h3>2. Captures</h3><p>Volume total : {{volume_captures}} tonnes.</p><h3>3. État des stocks</h3><p>{{analyse_stocks}}</p><h3>4. Recommandations</h3><p>Sur la base de ce bilan, des mesures de gestion adaptatives sont recommandées pour les prochaines campagnes de pêche.</p></div>`
  },
  {
    code: 'sea_plan_economie_bleue',
    name: "Plan de développement économie bleue",
    category: 'agro_environnement',
    price: 9000,
    priceMax: 27000,
    description: "Plan stratégique de développement de l'économie bleue pour un acteur public ou privé ivoirien, intégrant pêche, aquaculture, tourisme côtier et énergies marines.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 50,
    fieldsJson: F([
      {key:'entite_porteuse',label:"Entité porteuse du plan",type:'text',required:true},
      {key:'horizon_planification',label:"Horizon de planification (ex: 2025-2030)",type:'text',required:true},
      {key:'secteurs_prioritaires',label:"Secteurs prioritaires",type:'textarea',required:true},
      {key:'budget_previsionnel',label:"Budget prévisionnel (FCFA)",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT DE L'ÉCONOMIE BLEUE</h1><h3>Article 1 — Entité porteuse</h3><p><strong>{{entite_porteuse}}</strong> — Horizon : {{horizon_planification}}</p><h3>Article 2 — Secteurs prioritaires</h3><p>{{secteurs_prioritaires}}</p><h3>Article 3 — Budget</h3><p>{{budget_previsionnel}} FCFA</p><h3>Article 4 — Adoption</h3><p>Adopté le {{date_adoption}}.</p><h3>Article 5 — Alignement stratégique</h3><p>Ce plan s'inscrit dans la Stratégie Nationale de l'Économie Bleue de Côte d'Ivoire et les Objectifs de Développement Durable (ODD 14).</p></div>`
  },
  {
    code: 'sea_charte_peche_durable',
    name: "Charte de la pêche durable et de l'économie bleue en Afrique",
    category: 'agro_environnement',
    price: 5000,
    priceMax: 15000,
    description: "Charte d'engagement pour la pêche durable et le développement de l'économie bleue, destinée aux acteurs de la pêche et de l'aquaculture en Afrique de l'Ouest.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 55,
    fieldsJson: F([
      {key:'signataire',label:"Signataire de la charte",type:'text',required:true},
      {key:'engagements_durabilite',label:"Engagements de durabilité",type:'textarea',required:true},
      {key:'indicateurs_suivi',label:"Indicateurs de suivi",type:'textarea',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE LA PÊCHE DURABLE ET DE L'ÉCONOMIE BLEUE EN AFRIQUE</h1><h3>Préambule</h3><p>Nous, signataires de la présente charte, conscients de la richesse des ressources marines de l'Afrique et de la nécessité de les préserver pour les générations futures, nous engageons à adopter des pratiques responsables.</p><h3>Article 1 — Signataire</h3><p><strong>{{signataire}}</strong></p><h3>Article 2 — Engagements</h3><p>{{engagements_durabilite}}</p><h3>Article 3 — Indicateurs</h3><p>{{indicateurs_suivi}}</p><h3>Article 4 — Signature</h3><p>Le {{date_signature}}.</p></div>`
  },

  // =====================================================================
  // 25 templates Ports / Manutention avancée (port2_)
  // =====================================================================
  {
    code: 'port2_manutention_portuaire_stevedoring',
    name: "Accord de service de manutention portuaire (stevedoring Port Abidjan)",
    category: 'transport_logistique',
    price: 9000,
    priceMax: 27000,
    description: "Accord de prestation de services de stevedoring (manutention à bord des navires) au Port Autonome d'Abidjan, conforme aux règles OHADA et au Code Maritime UEMOA.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 78,
    fieldsJson: F([
      {key:'entreprise_stevedore',label:"Entreprise de stevedoring",type:'text',required:true},
      {key:'armateur_client',label:"Armateur / Client",type:'text',required:true},
      {key:'type_cargaison',label:"Type de cargaison",type:'text',required:true},
      {key:'volume_manutentionne',label:"Volume à manutentionner (tonnes ou EVP)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'tarifs_appliques',label:"Tarifs appliqués (FCFA/tonne ou EVP)",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MANUTENTION PORTUAIRE</h1><h2>Stevedoring — Port Autonome d'Abidjan</h2><h3>Article 1 — Parties</h3><p>Entreprise de stevedoring : <strong>{{entreprise_stevedore}}</strong> — Armateur : <strong>{{armateur_client}}</strong></p><h3>Article 2 — Cargaison</h3><p>Type : {{type_cargaison}} — Volume : {{volume_manutentionne}}</p><h3>Article 3 — Tarifs</h3><p>{{tarifs_appliques}}</p><h3>Article 4 — Date de prise d'effet</h3><p>{{date_debut}}</p><h3>Article 5 — Responsabilité</h3><p>La responsabilité du stevedore est engagée à compter de la prise en charge de la cargaison sur le navire jusqu'à sa remise à quai, conformément aux Règles de La Haye-Visby.</p></div>`
  },
  {
    code: 'port2_gestion_terminal_conteneurs',
    name: "Accord de service de gestion de terminal à conteneurs (PAA)",
    category: 'transport_logistique',
    price: 12000,
    priceMax: 40000,
    description: "Accord de concession ou de gestion d'un terminal à conteneurs au Port Autonome d'Abidjan, incluant les performances KPI, les investissements et les clauses de révision tarifaire.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 72,
    fieldsJson: F([
      {key:'concessionnaire',label:"Concessionnaire du terminal",type:'text',required:true},
      {key:'terminal_concerne',label:"Terminal concerné",type:'text',required:true},
      {key:'duree_concession',label:"Durée de la concession (ans)",type:'text',required:true},
      {key:'capacite_terminal',label:"Capacité du terminal (EVP/an)",type:'text',required:true},
      {key:'date_entree_vigueur',label:"Date d'entrée en vigueur",type:'date',required:true},
      {key:'kpi_performance',label:"KPIs de performance requis",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE GESTION DE TERMINAL À CONTENEURS</h1><h2>Port Autonome d'Abidjan</h2><h3>Article 1 — Concessionnaire</h3><p><strong>{{concessionnaire}}</strong> — Terminal : {{terminal_concerne}}</p><h3>Article 2 — Durée et capacité</h3><p>Durée : {{duree_concession}} ans — Capacité : {{capacite_terminal}} EVP/an.</p><h3>Article 3 — Performance</h3><p>{{kpi_performance}}</p><h3>Article 4 — Entrée en vigueur</h3><p>{{date_entree_vigueur}}</p><h3>Article 5 — Redevances</h3><p>Les redevances domaniales et de concession sont payées trimestriellement au PAA selon le barème annexé.</p></div>`
  },
  {
    code: 'port2_acconage_operations_quai',
    name: "Accord de service d'acconage (opérations à quai)",
    category: 'transport_logistique',
    price: 6000,
    priceMax: 18000,
    description: "Accord de prestation d'acconage (réception, livraison, pointage et gestion des marchandises à quai) au Port Autonome d'Abidjan.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 70,
    fieldsJson: F([
      {key:'acconier',label:"Société d'acconage",type:'text',required:true},
      {key:'donneur_ordre',label:"Donneur d'ordre",type:'text',required:true},
      {key:'nature_marchandise',label:"Nature de la marchandise",type:'text',required:true},
      {key:'quantite',label:"Quantité (tonnes ou colis)",type:'text',required:true},
      {key:'date_operation',label:"Date d'opération",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ACCONAGE</h1><h2>Opérations à Quai — Port d'Abidjan</h2><h3>Article 1 — Parties</h3><p>Acconier : <strong>{{acconier}}</strong> — Donneur d'ordre : <strong>{{donneur_ordre}}</strong></p><h3>Article 2 — Marchandise</h3><p>Nature : {{nature_marchandise}} — Quantité : {{quantite}}</p><h3>Article 3 — Date</h3><p>{{date_operation}}</p><h3>Article 4 — Prestations</h3><p>Réception du navire, pointage, pesage, magasinage court terme, livraison aux destinataires selon les documents douaniers.</p></div>`
  },
  {
    code: 'port2_entreposage_zone_portuaire',
    name: "Accord de service d'entreposage zone portuaire",
    category: 'transport_logistique',
    price: 5000,
    priceMax: 15000,
    description: "Accord de prestation d'entreposage de marchandises dans la zone portuaire d'Abidjan, avec gestion des séjours, des surestaries et des conditions de sécurité.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 68,
    fieldsJson: F([
      {key:'entreposeur',label:"Société d'entreposage",type:'text',required:true},
      {key:'client_deposant',label:"Client déposant",type:'text',required:true},
      {key:'surface_louee',label:"Surface louée (m²)",type:'text',required:true},
      {key:'duree_entreposage',label:"Durée d'entreposage",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D'ENTREPOSAGE EN ZONE PORTUAIRE</h1><h3>Article 1 — Parties</h3><p>Entreposeur : <strong>{{entreposeur}}</strong> — Client : <strong>{{client_deposant}}</strong></p><h3>Article 2 — Surface et durée</h3><p>Surface : {{surface_louee}} m² — Durée : {{duree_entreposage}} — Début : {{date_debut}}</p><h3>Article 3 — Tarification</h3><p>Le tarif journalier est conforme au barème du PAA. Au-delà de la durée convenue, des surestaries sont facturées.</p><h3>Article 4 — Sécurité</h3><p>L'entreposeur assure la sécurité, la surveillance et l'assurance des marchandises déposées.</p></div>`
  },
  {
    code: 'port2_magasin_sous_douane_cda',
    name: "Accord de service de magasin sous douane (CDA)",
    category: 'transport_logistique',
    price: 6000,
    priceMax: 18000,
    description: "Accord de gestion d'un Magasin et Aire de Dédouanement (CDA) dans la zone portuaire d'Abidjan, conformément au Code des Douanes de l'UEMOA.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 65,
    fieldsJson: F([
      {key:'gestionnaire_cda',label:"Gestionnaire du CDA",type:'text',required:true},
      {key:'numero_agrement',label:"Numéro d'agrément DGD",type:'text',required:true},
      {key:'capacite_stockage',label:"Capacité de stockage (m³)",type:'text',required:true},
      {key:'types_marchandises',label:"Types de marchandises admises",type:'textarea',required:true},
      {key:'date_debut',label:"Date de prise d'effet",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MAGASIN SOUS DOUANE (CDA)</h1><h3>Article 1 — Gestionnaire</h3><p><strong>{{gestionnaire_cda}}</strong> — Agrément DGD : {{numero_agrement}}</p><h3>Article 2 — Capacité</h3><p>{{capacite_stockage}} m³</p><h3>Article 3 — Marchandises admises</h3><p>{{types_marchandises}}</p><h3>Article 4 — Prise d'effet</h3><p>{{date_debut}}</p><h3>Article 5 — Régime douanier</h3><p>Les marchandises en CDA sont sous régime suspensif de droits et taxes. Tout mouvement est enregistré dans le système SYDAM de la DGD.</p></div>`
  },
  {
    code: 'port2_gestion_vrac_solide_liquide',
    name: "Accord de service de gestion de vrac (solide, liquide)",
    category: 'transport_logistique',
    price: 8000,
    priceMax: 24000,
    description: "Accord de manutention et de stockage de vrac solide (céréales, minerais) et de vrac liquide (hydrocarbures, huile) au Port Autonome d'Abidjan.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 67,
    fieldsJson: F([
      {key:'operateur_vrac',label:"Opérateur de vrac",type:'text',required:true},
      {key:'type_vrac',label:"Type de vrac (solide ou liquide)",type:'text',required:true},
      {key:'produit',label:"Produit concerné",type:'text',required:true},
      {key:'volume_annuel',label:"Volume annuel (tonnes)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GESTION DE VRAC</h1><h3>Article 1 — Opérateur</h3><p><strong>{{operateur_vrac}}</strong></p><h3>Article 2 — Vrac</h3><p>Type : {{type_vrac}} — Produit : {{produit}} — Volume annuel : {{volume_annuel}} tonnes.</p><h3>Article 3 — Début</h3><p>{{date_debut}}</p><h3>Article 4 — Sécurité</h3><p>Pour les vracs liquides inflammables, les installations respectent les normes ATEX et les prescriptions de l'ONPC et des pompiers portuaires.</p></div>`
  },
  {
    code: 'port2_debarquement_vehicules_roro',
    name: "Accord de service de débarquement de véhicules (RoRo)",
    category: 'transport_logistique',
    price: 7000,
    priceMax: 21000,
    description: "Accord de prestation pour le débarquement, le stockage et la livraison de véhicules importés par voie RoRo (Roll-on Roll-off) au Port d'Abidjan.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 73,
    fieldsJson: F([
      {key:'operateur_roro',label:"Opérateur RoRo",type:'text',required:true},
      {key:'importateur',label:"Importateur",type:'text',required:true},
      {key:'nombre_vehicules',label:"Nombre de véhicules",type:'text',required:true},
      {key:'marque_modele',label:"Marque et modèle",type:'text',required:true},
      {key:'date_debarquement',label:"Date de débarquement",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DÉBARQUEMENT DE VÉHICULES — RORO</h1><h3>Article 1 — Parties</h3><p>Opérateur : <strong>{{operateur_roro}}</strong> — Importateur : <strong>{{importateur}}</strong></p><h3>Article 2 — Véhicules</h3><p>Nombre : {{nombre_vehicules}} — Marque/Modèle : {{marque_modele}}</p><h3>Article 3 — Débarquement</h3><p>Date : {{date_debarquement}}</p><h3>Article 4 — État</h3><p>Un rapport d'état des véhicules (VIR - Vehicle Inspection Report) est établi contradictoirement à l'arrivée.</p></div>`
  },
  {
    code: 'port2_soutage_avitaillement_navires',
    name: "Accord de service de soutage (avitaillement navires)",
    category: 'transport_logistique',
    price: 7000,
    priceMax: 21000,
    description: "Accord de fourniture de combustible et d'avitaillement (soutage) aux navires faisant escale au Port Autonome d'Abidjan, conforme aux normes MARPOL.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 60,
    fieldsJson: F([
      {key:'souteur',label:"Société de soutage",type:'text',required:true},
      {key:'navire_client',label:"Navire client",type:'text',required:true},
      {key:'type_carburant',label:"Type de carburant (HFO, MGO...)",type:'text',required:true},
      {key:'quantite_tonnes',label:"Quantité (tonnes métriques)",type:'text',required:true},
      {key:'date_soutage',label:"Date de soutage",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SOUTAGE — AVITAILLEMENT</h1><h3>Article 1 — Parties</h3><p>Souteur : <strong>{{souteur}}</strong> — Navire : <strong>{{navire_client}}</strong></p><h3>Article 2 — Carburant</h3><p>Type : {{type_carburant}} — Quantité : {{quantite_tonnes}} TM.</p><h3>Article 3 — Date</h3><p>{{date_soutage}}</p><h3>Article 4 — Normes</h3><p>Le souteur certifie que le carburant livré est conforme à la teneur en soufre exigée par l'annexe VI de MARPOL et aux normes ISO 8217.</p></div>`
  },
  {
    code: 'port2_remorquage_portuaire',
    name: "Accord de service de remorquage portuaire",
    category: 'transport_logistique',
    price: 6000,
    priceMax: 18000,
    description: "Accord de prestation de remorquage portuaire pour l'assistance aux manœuvres des navires dans le port d'Abidjan, conformément aux tarifs de la Capitainerie.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 62,
    fieldsJson: F([
      {key:'societe_remorquage',label:"Société de remorquage",type:'text',required:true},
      {key:'navire_assiste',label:"Navire assisté",type:'text',required:true},
      {key:'nombre_remorqueurs',label:"Nombre de remorqueurs mobilisés",type:'text',required:true},
      {key:'puissance_totale',label:"Puissance totale (CV ou bollard pull)",type:'text',required:true},
      {key:'date_prestation',label:"Date de prestation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE REMORQUAGE PORTUAIRE</h1><h3>Article 1 — Parties</h3><p>Société de remorquage : <strong>{{societe_remorquage}}</strong> — Navire : <strong>{{navire_assiste}}</strong></p><h3>Article 2 — Moyens</h3><p>Remorqueurs : {{nombre_remorqueurs}} — Puissance : {{puissance_totale}}</p><h3>Article 3 — Date</h3><p>{{date_prestation}}</p><h3>Article 4 — Responsabilité</h3><p>La responsabilité du remorqueur est régie par les Conditions Générales de Remorquage Portuaire reconnues par le Comité Maritime International (CMI).</p></div>`
  },
  {
    code: 'port2_pilotage_maritime_capitainerie',
    name: "Accord de service de pilotage maritime (capitainerie)",
    category: 'transport_logistique',
    price: 6000,
    priceMax: 18000,
    description: "Accord de prestation de pilotage maritime pour l'entrée et la sortie des navires dans le port d'Abidjan, sous l'autorité de la Capitainerie du Port.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 58,
    fieldsJson: F([
      {key:'station_pilotage',label:"Station de pilotage",type:'text',required:true},
      {key:'navire',label:"Navire piloté",type:'text',required:true},
      {key:'port',label:"Port d'entrée / sortie",type:'text',required:true},
      {key:'tirant_eau',label:"Tirant d'eau du navire (m)",type:'text',required:true},
      {key:'date_pilotage',label:"Date de pilotage",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PILOTAGE MARITIME</h1><h3>Article 1 — Station de pilotage</h3><p><strong>{{station_pilotage}}</strong> — Port : {{port}}</p><h3>Article 2 — Navire</h3><p>Navire : {{navire}} — Tirant d'eau : {{tirant_eau}} m.</p><h3>Article 3 — Date</h3><p>{{date_pilotage}}</p><h3>Article 4 — Obligations</h3><p>Le pilote prend la conduite du navire au point de pilotage obligatoire et l'accompagne jusqu'à poste. Le capitaine demeure responsable du commandement du navire.</p></div>`
  },
  {
    code: 'port2_lamanage_amarrage_navire',
    name: "Accord de service de lamanage (amarrage navire)",
    category: 'transport_logistique',
    price: 4000,
    priceMax: 12000,
    description: "Accord de prestation de lamanage (amarrage et désamarrage des navires) au Port Autonome d'Abidjan.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 55,
    fieldsJson: F([
      {key:'societe_lamanage',label:"Société de lamanage",type:'text',required:true},
      {key:'navire',label:"Navire à amarrer",type:'text',required:true},
      {key:'quai_affecte',label:"Quai affecté",type:'text',required:true},
      {key:'date_amarrage',label:"Date d'amarrage",type:'date',required:true},
      {key:'observations',label:"Observations",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE LAMANAGE</h1><h3>Article 1 — Parties</h3><p>Lamaneur : <strong>{{societe_lamanage}}</strong> — Navire : <strong>{{navire}}</strong></p><h3>Article 2 — Quai</h3><p>Quai affecté : {{quai_affecte}} — Date : {{date_amarrage}}</p><h3>Article 3 — Prestation</h3><p>Amarrage, désamarrage et surveillance des amarres pendant l'escale. Tarif selon barème Capitainerie.</p><p>{{observations}}</p></div>`
  },
  {
    code: 'port2_inspection_navire_capitainerie',
    name: "Accord de service d'inspection de navire (capitainerie)",
    category: 'transport_logistique',
    price: 5000,
    priceMax: 15000,
    description: "Accord de prestation d'inspection de navire par les inspecteurs de la Capitainerie du Port Autonome d'Abidjan, contrôle État du port (PSC).",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 57,
    fieldsJson: F([
      {key:'capitainerie',label:"Capitainerie mandante",type:'text',required:true},
      {key:'navire_inspecte',label:"Navire inspecté",type:'text',required:true},
      {key:'type_inspection',label:"Type d'inspection (PSC, SOLAS, MARPOL...)",type:'text',required:true},
      {key:'date_inspection',label:"Date d'inspection",type:'date',required:true},
      {key:'resultats_inspection',label:"Résultats et déficiences constatées",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'INSPECTION DE NAVIRE</h1><h2>Capitainerie — Port Autonome d'Abidjan</h2><h3>Article 1 — Capitainerie</h3><p><strong>{{capitainerie}}</strong></p><h3>Article 2 — Navire</h3><p>{{navire_inspecte}} — Type d'inspection : {{type_inspection}}</p><h3>Article 3 — Date</h3><p>{{date_inspection}}</p><h3>Article 4 — Résultats</h3><p>{{resultats_inspection}}</p><h3>Article 5 — Suivi</h3><p>Tout navire présentant des déficiences majeures fera l'objet d'une rétention jusqu'à remise en conformité.</p></div>`
  },
  {
    code: 'port2_sante_portuaire_quarantaine',
    name: "Accord de service de santé portuaire (quarantaine)",
    category: 'transport_logistique',
    price: 5000,
    priceMax: 15000,
    description: "Accord de prestation de services de santé portuaire et de quarantaine sanitaire au Port d'Abidjan, conforme au Règlement Sanitaire International (RSI 2005) de l'OMS.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 52,
    fieldsJson: F([
      {key:'autorite_sanitaire',label:"Autorité sanitaire portuaire",type:'text',required:true},
      {key:'navire',label:"Navire concerné",type:'text',required:true},
      {key:'port_provenance',label:"Port de provenance",type:'text',required:true},
      {key:'date_controle',label:"Date de contrôle sanitaire",type:'date',required:true},
      {key:'mesures_appliquees',label:"Mesures sanitaires appliquées",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SANTÉ PORTUAIRE — QUARANTAINE</h1><h2>Port Autonome d'Abidjan</h2><h3>Article 1 — Autorité sanitaire</h3><p><strong>{{autorite_sanitaire}}</strong></p><h3>Article 2 — Navire</h3><p>Navire : {{navire}} — Provenance : {{port_provenance}}</p><h3>Article 3 — Contrôle</h3><p>Date : {{date_controle}}</p><h3>Article 4 — Mesures</h3><p>{{mesures_appliquees}}</p><h3>Article 5 — Cadre</h3><p>Conformément au RSI 2005, le navire est soumis à la Déclaration Sanitaire Maritime et à l'inspection avant toute délivrance de la libre pratique.</p></div>`
  },
  {
    code: 'port2_securite_portuaire_isps',
    name: "Accord de service de sécurité portuaire (Code ISPS)",
    category: 'transport_logistique',
    price: 8000,
    priceMax: 24000,
    description: "Accord de prestation de services de sûreté portuaire conforme au Code International pour la Sûreté des Navires et des Installations Portuaires (Code ISPS).",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 65,
    fieldsJson: F([
      {key:'societe_surete',label:"Société de sûreté",type:'text',required:true},
      {key:'installation_portuaire',label:"Installation portuaire",type:'text',required:true},
      {key:'niveau_surete',label:"Niveau de sûreté ISPS (1, 2 ou 3)",type:'text',required:true},
      {key:'plan_surete',label:"Éléments clés du plan de sûreté",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SÉCURITÉ PORTUAIRE</h1><h2>Code ISPS — Port Autonome d'Abidjan</h2><h3>Article 1 — Prestataire</h3><p><strong>{{societe_surete}}</strong> — Installation : {{installation_portuaire}}</p><h3>Article 2 — Niveau ISPS</h3><p>Niveau de sûreté : {{niveau_surete}}</p><h3>Article 3 — Plan de sûreté</h3><p>{{plan_surete}}</p><h3>Article 4 — Début</h3><p>{{date_debut}}</p><h3>Article 5 — Conformité</h3><p>Le plan de sûreté de l'installation portuaire (PFSP) est approuvé par l'autorité compétente désignée (ACD) conformément à la Convention SOLAS.</p></div>`
  },
  {
    code: 'port2_surveillance_electronique_port',
    name: "Accord de service de surveillance électronique du port (caméras)",
    category: 'transport_logistique',
    price: 9000,
    priceMax: 27000,
    description: "Accord de déploiement et d'exploitation d'un système de vidéosurveillance et de contrôle d'accès électronique au Port Autonome d'Abidjan.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 60,
    fieldsJson: F([
      {key:'integrateur_systeme',label:"Intégrateur du système",type:'text',required:true},
      {key:'nombre_cameras',label:"Nombre de caméras déployées",type:'text',required:true},
      {key:'zones_couvertes',label:"Zones couvertes",type:'textarea',required:true},
      {key:'duree_contrat',label:"Durée du contrat de maintenance",type:'text',required:true},
      {key:'date_mise_en_service',label:"Date de mise en service",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SURVEILLANCE ÉLECTRONIQUE PORTUAIRE</h1><h3>Article 1 — Intégrateur</h3><p><strong>{{integrateur_systeme}}</strong></p><h3>Article 2 — Déploiement</h3><p>Caméras : {{nombre_cameras}} — Zones : {{zones_couvertes}}</p><h3>Article 3 — Durée</h3><p>Maintenance : {{duree_contrat}} — Mise en service : {{date_mise_en_service}}</p><h3>Article 4 — Données</h3><p>Les images sont conservées 30 jours et accessibles uniquement aux agents habilités de la Police Portuaire et du PAA.</p></div>`
  },
  {
    code: 'port2_police_portuaire',
    name: "Accord de service de police portuaire",
    category: 'transport_logistique',
    price: 7000,
    priceMax: 21000,
    description: "Accord de prestation de services de police portuaire pour le maintien de l'ordre, le contrôle des accès et la lutte contre les trafics illicites au Port d'Abidjan.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 62,
    fieldsJson: F([
      {key:'unite_police',label:"Unité de police portuaire",type:'text',required:true},
      {key:'effectif_deploye',label:"Effectif déployé",type:'text',required:true},
      {key:'zone_intervention',label:"Zone d'intervention",type:'text',required:true},
      {key:'protocole_intervention',label:"Protocole d'intervention",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE POLICE PORTUAIRE</h1><h3>Article 1 — Unité</h3><p><strong>{{unite_police}}</strong> — Effectif : {{effectif_deploye}}</p><h3>Article 2 — Zone</h3><p>{{zone_intervention}}</p><h3>Article 3 — Protocole</h3><p>{{protocole_intervention}}</p><h3>Article 4 — Début</h3><p>{{date_debut}}</p><h3>Article 5 — Coordination</h3><p>La police portuaire coordonne ses actions avec la Douane, la Capitainerie et les services de renseignement pour la lutte contre les trafics.</p></div>`
  },
  {
    code: 'port2_partenariat_paa_operateur_logistique',
    name: "Accord de partenariat PAA-opérateur logistique",
    category: 'transport_logistique',
    price: 10000,
    priceMax: 30000,
    description: "Accord de partenariat stratégique entre le Port Autonome d'Abidjan et un opérateur logistique pour le développement de services à valeur ajoutée portuaires.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 68,
    fieldsJson: F([
      {key:'operateur_logistique',label:"Opérateur logistique partenaire",type:'text',required:true},
      {key:'domaines_partenariat',label:"Domaines du partenariat",type:'textarea',required:true},
      {key:'investissements_prevus',label:"Investissements prévus (FCFA)",type:'text',required:true},
      {key:'duree_partenariat',label:"Durée du partenariat (ans)",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT PAA — OPÉRATEUR LOGISTIQUE</h1><h3>Article 1 — Partenaire</h3><p><strong>{{operateur_logistique}}</strong></p><h3>Article 2 — Domaines</h3><p>{{domaines_partenariat}}</p><h3>Article 3 — Investissements</h3><p>{{investissements_prevus}} FCFA sur {{duree_partenariat}} ans.</p><h3>Article 4 — Signature</h3><p>{{date_signature}}</p><h3>Article 5 — Vision</h3><p>Ce partenariat vise à faire du Port d'Abidjan le hub logistique de référence de l'Afrique de l'Ouest d'ici 2030.</p></div>`
  },
  {
    code: 'port2_transit_rapide_fast_track',
    name: "Accord de service de transit rapide (fast track port)",
    category: 'transport_logistique',
    price: 7000,
    priceMax: 21000,
    description: "Accord de service de transit rapide (fast track) pour la réduction des délais de passage portuaire à Abidjan, incluant le guichet unique et la dématérialisation.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 72,
    fieldsJson: F([
      {key:'beneficiaire',label:"Bénéficiaire du fast track",type:'text',required:true},
      {key:'types_marchandises',label:"Types de marchandises éligibles",type:'textarea',required:true},
      {key:'delai_garanti',label:"Délai de transit garanti (heures)",type:'text',required:true},
      {key:'frais_fast_track',label:"Frais de fast track (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TRANSIT RAPIDE — FAST TRACK PORT</h1><h3>Article 1 — Bénéficiaire</h3><p><strong>{{beneficiaire}}</strong></p><h3>Article 2 — Marchandises éligibles</h3><p>{{types_marchandises}}</p><h3>Article 3 — Délai garanti</h3><p>{{delai_garanti}} heures à compter du dépôt des documents complets.</p><h3>Article 4 — Frais</h3><p>{{frais_fast_track}} FCFA — Début : {{date_debut}}</p><h3>Article 5 — Guichet unique</h3><p>Le fast track est traité via le Guichet Unique du Commerce Extérieur (GUCE) en lien avec la DGD et le PAA.</p></div>`
  },
  {
    code: 'port2_port_sec_dry_port',
    name: "Accord de service de port sec (dry port intérieur)",
    category: 'transport_logistique',
    price: 8000,
    priceMax: 24000,
    description: "Accord de développement et d'exploitation d'un port sec (dry port) à l'intérieur de la Côte d'Ivoire, comme extension terrestre du Port d'Abidjan.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 63,
    fieldsJson: F([
      {key:'operateur_port_sec',label:"Opérateur du port sec",type:'text',required:true},
      {key:'localisation_port_sec',label:"Localisation du port sec",type:'text',required:true},
      {key:'superficie',label:"Superficie (ha)",type:'text',required:true},
      {key:'capacite_evp',label:"Capacité (EVP/an)",type:'text',required:true},
      {key:'date_ouverture',label:"Date d'ouverture",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PORT SEC — DRY PORT</h1><h3>Article 1 — Opérateur</h3><p><strong>{{operateur_port_sec}}</strong> — Localisation : {{localisation_port_sec}}</p><h3>Article 2 — Infrastructures</h3><p>Superficie : {{superficie}} ha — Capacité : {{capacite_evp}} EVP/an.</p><h3>Article 3 — Ouverture</h3><p>{{date_ouverture}}</p><h3>Article 4 — Fonctions</h3><p>Dédouanement, entreposage, consolidation de cargaisons, connexion ferroviaire et routière avec le Port d'Abidjan.</p></div>`
  },
  {
    code: 'port2_plateforme_logistique_portuaire',
    name: "Accord de service de plateforme logistique portuaire",
    category: 'transport_logistique',
    price: 10000,
    priceMax: 30000,
    description: "Accord de création et d'exploitation d'une plateforme logistique multimodale adossée au Port d'Abidjan, intégrant entrepôts, zone de valeur ajoutée et services aux chargeurs.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 65,
    fieldsJson: F([
      {key:'gestionnaire_plateforme',label:"Gestionnaire de la plateforme",type:'text',required:true},
      {key:'services_proposes',label:"Services proposés",type:'textarea',required:true},
      {key:'surface_totale',label:"Surface totale (m²)",type:'text',required:true},
      {key:'investissement_total',label:"Investissement total (FCFA)",type:'text',required:true},
      {key:'date_mise_en_service',label:"Date de mise en service",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PLATEFORME LOGISTIQUE PORTUAIRE</h1><h3>Article 1 — Gestionnaire</h3><p><strong>{{gestionnaire_plateforme}}</strong></p><h3>Article 2 — Services</h3><p>{{services_proposes}}</p><h3>Article 3 — Infrastructure</h3><p>Surface : {{surface_totale}} m² — Investissement : {{investissement_total}} FCFA.</p><h3>Article 4 — Mise en service</h3><p>{{date_mise_en_service}}</p><h3>Article 5 — Multimodalité</h3><p>La plateforme assure la connexion optimale entre le transport maritime, ferroviaire et routier.</p></div>`
  },
  {
    code: 'port2_gestion_terres_pleins',
    name: "Accord de service de gestion des terres-pleins",
    category: 'transport_logistique',
    price: 6000,
    priceMax: 18000,
    description: "Accord de gestion et d'aménagement des terres-pleins portuaires au Port Autonome d'Abidjan, incluant le plan de masse et les règles d'utilisation.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 58,
    fieldsJson: F([
      {key:'concessionnaire_tp',label:"Concessionnaire des terres-pleins",type:'text',required:true},
      {key:'superficie_tp',label:"Superficie des terres-pleins (m²)",type:'text',required:true},
      {key:'usage_prevu',label:"Usage prévu",type:'textarea',required:true},
      {key:'duree_concession',label:"Durée de la concession (ans)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE GESTION DES TERRES-PLEINS PORTUAIRES</h1><h3>Article 1 — Concessionnaire</h3><p><strong>{{concessionnaire_tp}}</strong></p><h3>Article 2 — Superficie et usage</h3><p>Superficie : {{superficie_tp}} m² — Usage : {{usage_prevu}}</p><h3>Article 3 — Concession</h3><p>Durée : {{duree_concession}} ans — Début : {{date_debut}}</p><h3>Article 4 — Entretien</h3><p>Le concessionnaire est responsable de l'entretien des voiries, de l'éclairage et des réseaux sur sa zone concédée.</p></div>`
  },
  {
    code: 'port2_fumigation_cargaison',
    name: "Accord de service de fumigation de cargaison",
    category: 'transport_logistique',
    price: 4000,
    priceMax: 12000,
    description: "Accord de prestation de fumigation phytosanitaire de cargaisons à l'import ou à l'export au Port d'Abidjan, conformément aux normes CIPV et ISPM 15.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 60,
    fieldsJson: F([
      {key:'societe_fumigation',label:"Société de fumigation agréée",type:'text',required:true},
      {key:'nature_cargaison',label:"Nature de la cargaison",type:'text',required:true},
      {key:'produit_fumigation',label:"Produit de fumigation utilisé",type:'text',required:true},
      {key:'quantite_traitee',label:"Quantité traitée (tonnes ou m³)",type:'text',required:true},
      {key:'date_traitement',label:"Date de traitement",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FUMIGATION DE CARGAISON</h1><h3>Article 1 — Prestataire</h3><p><strong>{{societe_fumigation}}</strong></p><h3>Article 2 — Cargaison</h3><p>Nature : {{nature_cargaison}} — Quantité : {{quantite_traitee}}</p><h3>Article 3 — Traitement</h3><p>Produit : {{produit_fumigation}} — Date : {{date_traitement}}</p><h3>Article 4 — Certification</h3><p>Un Certificat de Fumigation est délivré à l'issue du traitement, reconnu par le Service Phytosanitaire (LANADA) et les autorités douanières.</p></div>`
  },
  {
    code: 'port2_rapport_performance_portuaire',
    name: "Rapport de performance portuaire",
    category: 'transport_logistique',
    price: 5000,
    priceMax: 15000,
    description: "Modèle de rapport de performance portuaire pour le Port Autonome d'Abidjan ou un opérateur de terminal, incluant les indicateurs de productivité, de trafic et de qualité de service.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 68,
    fieldsJson: F([
      {key:'entite_rapportante',label:"Entité rapportante",type:'text',required:true},
      {key:'periode_rapport',label:"Période du rapport",type:'text',required:true},
      {key:'trafic_total',label:"Trafic total (EVP ou tonnes)",type:'text',required:true},
      {key:'indicateurs_kpi',label:"Indicateurs de performance clés",type:'textarea',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE PORTUAIRE</h1><h2>Port Autonome d'Abidjan</h2><h3>1. Entité</h3><p>{{entite_rapportante}} — Période : {{periode_rapport}} — Date : {{date_rapport}}</p><h3>2. Trafic</h3><p>Volume total : {{trafic_total}}</p><h3>3. KPIs</h3><p>{{indicateurs_kpi}}</p><h3>4. Analyse et recommandations</h3><p>Ce rapport est soumis à la Direction Générale du PAA et aux partenaires publics pour pilotage stratégique.</p></div>`
  },
  {
    code: 'port2_plan_developpement_port_2035',
    name: "Plan de développement port 2035",
    category: 'transport_logistique',
    price: 12000,
    priceMax: 36000,
    description: "Plan stratégique de développement du Port Autonome d'Abidjan à l'horizon 2035, intégrant extension des capacités, digitalisation, transition verte et compétitivité régionale.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 62,
    fieldsJson: F([
      {key:'autorite_portuaire',label:"Autorité portuaire",type:'text',required:true},
      {key:'vision_strategique',label:"Vision stratégique 2035",type:'textarea',required:true},
      {key:'projets_phares',label:"Projets phares identifiés",type:'textarea',required:true},
      {key:'investissement_global',label:"Investissement global (FCFA)",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption du plan",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT PORT 2035</h1><h2>Port Autonome d'Abidjan</h2><h3>Article 1 — Autorité portuaire</h3><p><strong>{{autorite_portuaire}}</strong></p><h3>Article 2 — Vision</h3><p>{{vision_strategique}}</p><h3>Article 3 — Projets phares</h3><p>{{projets_phares}}</p><h3>Article 4 — Investissement</h3><p>{{investissement_global}} FCFA — Adopté le : {{date_adoption}}</p><h3>Article 5 — Ambition</h3><p>Ce plan vise à tripler la capacité du Port d'Abidjan et à en faire le premier port à conteneurs d'Afrique de l'Ouest d'ici 2035.</p></div>`
  },
  {
    code: 'port2_charte_port_durable',
    name: "Charte du port durable et de la compétitivité de la chaîne logistique",
    category: 'transport_logistique',
    price: 5000,
    priceMax: 15000,
    description: "Charte d'engagement pour un port durable et compétitif, signée par les acteurs de la chaîne logistique portuaire ivoirienne et régionale.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 58,
    fieldsJson: F([
      {key:'signataire',label:"Signataire de la charte",type:'text',required:true},
      {key:'engagements_durabilite',label:"Engagements développement durable",type:'textarea',required:true},
      {key:'engagements_competitivite',label:"Engagements compétitivité logistique",type:'textarea',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DU PORT DURABLE ET DE LA COMPÉTITIVITÉ LOGISTIQUE</h1><h3>Préambule</h3><p>Les soussignés, acteurs de la chaîne logistique portuaire, s'engagent à faire du Port d'Abidjan un modèle de performance durable en Afrique.</p><h3>Article 1 — Signataire</h3><p><strong>{{signataire}}</strong></p><h3>Article 2 — Durabilité</h3><p>{{engagements_durabilite}}</p><h3>Article 3 — Compétitivité</h3><p>{{engagements_competitivite}}</p><h3>Article 4 — Signature</h3><p>Le {{date_signature}}.</p></div>`
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
  console.log(`Batch 109b OK — créés:${created} maj:${updated} TOTAL:${total}`);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
