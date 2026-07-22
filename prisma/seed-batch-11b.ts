import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ─── 25 templates Juridique avancé (jur2_) ───────────────────────────────
  {
    code: 'jur2_statuts_sa',
    name: "Statuts de Société Anonyme (SA)",
    category: 'juridique_admin',
    price: 15000, priceMax: 50000,
    description: "Statuts complets d'une Société Anonyme conforme au droit OHADA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 85,
    fieldsJson: F([
      {key:'denomination',label:"Dénomination sociale",type:'text',required:true},
      {key:'siege',label:"Siège social",type:'text',required:true},
      {key:'capital',label:"Capital social (FCFA)",type:'text',required:true},
      {key:'objet',label:"Objet social",type:'textarea',required:true},
      {key:'duree',label:"Durée de la société (années)",type:'text',required:true},
      {key:'date_constitution',label:"Date de constitution",type:'date',required:true},
    ]),
    body: '<div class="doc"><h1>STATUTS DE SOCIÉTÉ ANONYME</h1><h2>{{denomination}}</h2><p><strong>Article 1 – Forme :</strong> Il est constitué entre les soussignés une Société Anonyme régie par l\'Acte Uniforme OHADA relatif au droit des sociétés commerciales.</p><p><strong>Article 2 – Dénomination :</strong> La société a pour dénomination : {{denomination}}.</p><p><strong>Article 3 – Siège social :</strong> Le siège social est fixé à {{siege}}.</p><p><strong>Article 4 – Objet :</strong> {{objet}}</p><p><strong>Article 5 – Durée :</strong> La durée de la société est fixée à {{duree}} ans à compter de la date d\'immatriculation au RCCM.</p><p><strong>Article 6 – Capital social :</strong> Le capital social est fixé à {{capital}} FCFA.</p><p>Fait à {{siege}}, le {{date_constitution}}</p></div>'
  },
  {
    code: 'jur2_statuts_sarl',
    name: "Statuts de SARL",
    category: 'juridique_admin',
    price: 12000, priceMax: 40000,
    description: "Statuts d'une Société à Responsabilité Limitée conforme à l'OHADA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 90,
    fieldsJson: F([
      {key:'denomination',label:"Dénomination sociale",type:'text',required:true},
      {key:'siege',label:"Siège social",type:'text',required:true},
      {key:'capital',label:"Capital social (FCFA)",type:'text',required:true},
      {key:'gerant',label:"Nom du gérant",type:'text',required:true},
      {key:'objet',label:"Objet social",type:'textarea',required:true},
      {key:'date_constitution',label:"Date de constitution",type:'date',required:true},
    ]),
    body: '<div class="doc"><h1>STATUTS DE SOCIÉTÉ À RESPONSABILITÉ LIMITÉE</h1><h2>{{denomination}}</h2><p><strong>Article 1 – Forme :</strong> Il est constitué une Société à Responsabilité Limitée (SARL) régie par l\'Acte Uniforme OHADA.</p><p><strong>Article 2 – Dénomination :</strong> {{denomination}}</p><p><strong>Article 3 – Siège :</strong> {{siege}}</p><p><strong>Article 4 – Objet :</strong> {{objet}}</p><p><strong>Article 5 – Capital :</strong> Le capital social est de {{capital}} FCFA, divisé en parts sociales égales.</p><p><strong>Article 6 – Gérance :</strong> La société est gérée par {{gerant}}.</p><p>Fait le {{date_constitution}}</p></div>'
  },
  {
    code: 'jur2_statuts_snc',
    name: "Statuts de Société en Nom Collectif (SNC)",
    category: 'juridique_admin',
    price: 10000, priceMax: 30000,
    description: "Statuts d'une Société en Nom Collectif selon l'Acte Uniforme OHADA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      {key:'denomination',label:"Dénomination sociale",type:'text',required:true},
      {key:'siege',label:"Siège social",type:'text',required:true},
      {key:'associes',label:"Noms des associés",type:'textarea',required:true},
      {key:'objet',label:"Objet social",type:'textarea',required:true},
      {key:'date_constitution',label:"Date de constitution",type:'date',required:true},
    ]),
    body: '<div class="doc"><h1>STATUTS DE SOCIÉTÉ EN NOM COLLECTIF</h1><h2>{{denomination}}</h2><p><strong>Article 1 – Forme :</strong> Il est constitué entre les soussignés une Société en Nom Collectif (SNC) régie par l\'Acte Uniforme OHADA relatif au droit des sociétés commerciales et du groupement d\'intérêt économique.</p><p><strong>Article 2 – Dénomination :</strong> {{denomination}}</p><p><strong>Article 3 – Siège :</strong> {{siege}}</p><p><strong>Article 4 – Associés :</strong> {{associes}}</p><p><strong>Article 5 – Objet :</strong> {{objet}}</p><p>Fait le {{date_constitution}} à {{siege}}</p></div>'
  },
  {
    code: 'jur2_pv_ago',
    name: "Procès-verbal d'Assemblée Générale Ordinaire",
    category: 'juridique_admin',
    price: 8000, priceMax: 20000,
    description: "PV d'AGO pour approbation des comptes annuels et affectation du résultat.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 88,
    fieldsJson: F([
      {key:'denomination',label:"Dénomination sociale",type:'text',required:true},
      {key:'date_assemblee',label:"Date de l'assemblée",type:'date',required:true},
      {key:'lieu',label:"Lieu de l'assemblée",type:'text',required:true},
      {key:'president',label:"Président de séance",type:'text',required:true},
      {key:'ordre_jour',label:"Ordre du jour",type:'textarea',required:true},
      {key:'resolutions',label:"Résolutions adoptées",type:'textarea',required:true},
    ]),
    body: '<div class="doc"><h1>PROCÈS-VERBAL D\'ASSEMBLÉE GÉNÉRALE ORDINAIRE</h1><h2>{{denomination}}</h2><p>L\'an {{date_assemblee}}, les associés de la société {{denomination}} se sont réunis en Assemblée Générale Ordinaire au siège social situé à {{lieu}}, sous la présidence de {{president}}.</p><p><strong>Ordre du jour :</strong></p><p>{{ordre_jour}}</p><p><strong>Résolutions :</strong></p><p>{{resolutions}}</p><p>L\'ordre du jour étant épuisé, la séance est levée.</p><p>Le Président de séance : {{president}}</p></div>'
  },
  {
    code: 'jur2_pv_age',
    name: "Procès-verbal d'Assemblée Générale Extraordinaire",
    category: 'juridique_admin',
    price: 9000, priceMax: 25000,
    description: "PV d'AGE pour modification des statuts ou décisions extraordinaires.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 80,
    fieldsJson: F([
      {key:'denomination',label:"Dénomination sociale",type:'text',required:true},
      {key:'date_assemblee',label:"Date de l'assemblée",type:'date',required:true},
      {key:'lieu',label:"Lieu de l'assemblée",type:'text',required:true},
      {key:'president',label:"Président de séance",type:'text',required:true},
      {key:'modifications',label:"Nature des modifications",type:'textarea',required:true},
      {key:'quorum',label:"Quorum atteint",type:'text',required:true},
    ]),
    body: '<div class="doc"><h1>PROCÈS-VERBAL D\'ASSEMBLÉE GÉNÉRALE EXTRAORDINAIRE</h1><h2>{{denomination}}</h2><p>L\'an {{date_assemblee}}, les actionnaires de {{denomination}} se sont réunis en AGE à {{lieu}}, sous la présidence de {{president}}.</p><p><strong>Quorum :</strong> {{quorum}}</p><p><strong>Modifications envisagées :</strong></p><p>{{modifications}}</p><p>Les résolutions ont été adoptées à la majorité requise par l\'Acte Uniforme OHADA.</p><p>Le Président : {{president}}</p></div>'
  },
  {
    code: 'jur2_registre_deliberations',
    name: "Registre des délibérations du Conseil d'Administration",
    category: 'juridique_admin',
    price: 7000, priceMax: 18000,
    description: "Registre officiel des délibérations du conseil d'administration.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'denomination',label:"Dénomination sociale",type:'text',required:true},
      {key:'date_seance',label:"Date de la séance",type:'date',required:true},
      {key:'membres_presents',label:"Membres présents",type:'textarea',required:true},
      {key:'ordre_jour',label:"Ordre du jour",type:'textarea',required:true},
      {key:'deliberations',label:"Délibérations et décisions",type:'textarea',required:true},
    ]),
    body: '<div class="doc"><h1>REGISTRE DES DÉLIBÉRATIONS</h1><h2>Conseil d\'Administration – {{denomination}}</h2><p><strong>Séance du :</strong> {{date_seance}}</p><p><strong>Membres présents :</strong></p><p>{{membres_presents}}</p><p><strong>Ordre du jour :</strong></p><p>{{ordre_jour}}</p><p><strong>Délibérations :</strong></p><p>{{deliberations}}</p><p>Certifié conforme, Le Président du Conseil d\'Administration</p></div>'
  },
  {
    code: 'jur2_rapport_commissaire',
    name: "Rapport du Commissaire aux Comptes",
    category: 'juridique_admin',
    price: 12000, priceMax: 35000,
    description: "Rapport annuel du commissaire aux comptes sur les états financiers.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 75,
    fieldsJson: F([
      {key:'denomination',label:"Dénomination sociale",type:'text',required:true},
      {key:'exercice',label:"Exercice social",type:'text',required:true},
      {key:'commissaire',label:"Nom du commissaire aux comptes",type:'text',required:true},
      {key:'opinion',label:"Opinion d'audit",type:'textarea',required:true},
      {key:'observations',label:"Observations particulières",type:'textarea',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true},
    ]),
    body: '<div class="doc"><h1>RAPPORT DU COMMISSAIRE AUX COMPTES</h1><h2>{{denomination}} – Exercice {{exercice}}</h2><p>En notre qualité de commissaire aux comptes de la société {{denomination}}, nous vous présentons notre rapport relatif à l\'exercice clos le {{date_rapport}}.</p><p><strong>Opinion :</strong></p><p>{{opinion}}</p><p><strong>Observations :</strong></p><p>{{observations}}</p><p>Fait à Abidjan, le {{date_rapport}}</p><p>{{commissaire}}, Commissaire aux Comptes</p></div>'
  },
  {
    code: 'jur2_rapport_ca',
    name: "Rapport du Conseil d'Administration",
    category: 'juridique_admin',
    price: 10000, priceMax: 28000,
    description: "Rapport annuel du conseil d'administration à l'assemblée générale.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'denomination',label:"Dénomination sociale",type:'text',required:true},
      {key:'exercice',label:"Exercice social",type:'text',required:true},
      {key:'president_ca',label:"Président du Conseil d'Administration",type:'text',required:true},
      {key:'activites',label:"Activités de l'exercice",type:'textarea',required:true},
      {key:'perspectives',label:"Perspectives et projets",type:'textarea',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true},
    ]),
    body: '<div class="doc"><h1>RAPPORT DU CONSEIL D\'ADMINISTRATION</h1><h2>{{denomination}} – Exercice {{exercice}}</h2><p>Mesdames et Messieurs les Actionnaires,</p><p>Nous vous présentons le rapport sur les activités de la société {{denomination}} au titre de l\'exercice {{exercice}}.</p><p><strong>Activités de l\'exercice :</strong></p><p>{{activites}}</p><p><strong>Perspectives :</strong></p><p>{{perspectives}}</p><p>Le Président du Conseil d\'Administration : {{president_ca}}</p><p>Date : {{date_rapport}}</p></div>'
  },
  {
    code: 'jur2_declaration_seuil',
    name: "Déclaration de Franchissement de Seuil",
    category: 'juridique_admin',
    price: 6000, priceMax: 15000,
    description: "Déclaration obligatoire lors du franchissement d'un seuil de participation.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'declarant',label:"Nom du déclarant",type:'text',required:true},
      {key:'denomination',label:"Dénomination de la société cible",type:'text',required:true},
      {key:'seuil',label:"Seuil franchi (%)",type:'text',required:true},
      {key:'date_franchissement',label:"Date de franchissement",type:'date',required:true},
      {key:'intentions',label:"Intentions du déclarant",type:'textarea',required:true},
    ]),
    body: '<div class="doc"><h1>DÉCLARATION DE FRANCHISSEMENT DE SEUIL</h1><p>Je soussigné(e), {{declarant}}, déclare par la présente avoir franchi le seuil de {{seuil}}% du capital de la société {{denomination}} en date du {{date_franchissement}}.</p><p><strong>Intentions :</strong></p><p>{{intentions}}</p><p>Fait à Abidjan, le {{date_franchissement}}</p><p>Signature : {{declarant}}</p></div>'
  },
  {
    code: 'jur2_cession_parts',
    name: "Convention de Cession de Parts Sociales",
    category: 'juridique_admin',
    price: 9000, priceMax: 25000,
    description: "Convention de cession de parts sociales entre associés ou tiers.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 82,
    fieldsJson: F([
      {key:'cedant',label:"Nom du cédant",type:'text',required:true},
      {key:'cessionnaire',label:"Nom du cessionnaire",type:'text',required:true},
      {key:'denomination',label:"Dénomination de la société",type:'text',required:true},
      {key:'nombre_parts',label:"Nombre de parts cédées",type:'text',required:true},
      {key:'prix_cession',label:"Prix de cession (FCFA)",type:'text',required:true},
      {key:'date_cession',label:"Date de la cession",type:'date',required:true},
    ]),
    body: '<div class="doc"><h1>CONVENTION DE CESSION DE PARTS SOCIALES</h1><p>Entre : {{cedant}} (le Cédant) et {{cessionnaire}} (le Cessionnaire)</p><p>Concernant : {{nombre_parts}} parts sociales de la société {{denomination}}</p><p><strong>Prix de cession :</strong> {{prix_cession}} FCFA</p><p>Les parties conviennent irrévocablement de la cession des parts sociales susvisées aux conditions ci-dessus définies, conformément aux dispositions de l\'Acte Uniforme OHADA relatif au droit des sociétés commerciales.</p><p>Fait à Abidjan, le {{date_cession}}</p><p>Le Cédant : {{cedant}} | Le Cessionnaire : {{cessionnaire}}</p></div>'
  },
  {
    code: 'jur2_nantissement_parts',
    name: "Contrat de Nantissement de Parts Sociales",
    category: 'juridique_admin',
    price: 8500, priceMax: 22000,
    description: "Contrat de nantissement de parts sociales en garantie d'un crédit.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 62,
    fieldsJson: F([
      {key:'constituant',label:"Nom du constituant",type:'text',required:true},
      {key:'beneficiaire',label:"Nom du bénéficiaire (créancier)",type:'text',required:true},
      {key:'denomination',label:"Société dont les parts sont nanties",type:'text',required:true},
      {key:'nombre_parts',label:"Nombre de parts nanties",type:'text',required:true},
      {key:'montant_garanti',label:"Montant garanti (FCFA)",type:'text',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true},
    ]),
    body: '<div class="doc"><h1>CONTRAT DE NANTISSEMENT DE PARTS SOCIALES</h1><p>Entre : {{constituant}} (le Constituant) et {{beneficiaire}} (le Bénéficiaire)</p><p>Le Constituant constitue en nantissement au profit du Bénéficiaire {{nombre_parts}} parts sociales de la société {{denomination}} en garantie du paiement de la somme de {{montant_garanti}} FCFA.</p><p>Ce nantissement est constitué conformément aux dispositions de l\'Acte Uniforme OHADA portant organisation des sûretés.</p><p>Fait le {{date_contrat}}</p></div>'
  },
  {
    code: 'jur2_acte_gage',
    name: "Acte de Constitution de Gage",
    category: 'juridique_admin',
    price: 7500, priceMax: 20000,
    description: "Acte de constitution de gage sur bien meuble corporel selon l'OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'debiteur',label:"Nom du débiteur",type:'text',required:true},
      {key:'creancier',label:"Nom du créancier",type:'text',required:true},
      {key:'bien_gage',label:"Description du bien gagé",type:'textarea',required:true},
      {key:'montant',label:"Montant de la créance garantie (FCFA)",type:'text',required:true},
      {key:'date_acte',label:"Date de l'acte",type:'date',required:true},
    ]),
    body: '<div class="doc"><h1>ACTE DE CONSTITUTION DE GAGE</h1><p>Entre : {{creancier}} (le Créancier gagiste) et {{debiteur}} (le Débiteur)</p><p><strong>Bien gagé :</strong></p><p>{{bien_gage}}</p><p><strong>Créance garantie :</strong> {{montant}} FCFA</p><p>Le présent gage est constitué conformément aux articles 92 et suivants de l\'Acte Uniforme OHADA portant organisation des sûretés.</p><p>Fait le {{date_acte}}</p></div>'
  },
  {
    code: 'jur2_portage_actions',
    name: "Convention de Portage d'Actions",
    category: 'juridique_admin',
    price: 11000, priceMax: 30000,
    description: "Convention de portage d'actions entre porteur et donneur d'ordre.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 55,
    fieldsJson: F([
      {key:'porteur',label:"Nom du porteur",type:'text',required:true},
      {key:'donneur_ordre',label:"Nom du donneur d'ordre",type:'text',required:true},
      {key:'denomination',label:"Société émettrice des actions",type:'text',required:true},
      {key:'nombre_actions',label:"Nombre d'actions portées",type:'text',required:true},
      {key:'duree',label:"Durée du portage",type:'text',required:true},
      {key:'date_convention',label:"Date de la convention",type:'date',required:true},
    ]),
    body: '<div class="doc"><h1>CONVENTION DE PORTAGE D\'ACTIONS</h1><p>Entre : {{porteur}} (le Porteur) et {{donneur_ordre}} (le Donneur d\'Ordre)</p><p>Le Porteur s\'engage à détenir, pour le compte et dans l\'intérêt du Donneur d\'Ordre, {{nombre_actions}} actions de la société {{denomination}} pendant une durée de {{duree}}.</p><p>À l\'issue de cette période, le Donneur d\'Ordre rachètera lesdites actions aux conditions convenues entre les parties.</p><p>Fait le {{date_convention}}</p></div>'
  },
  {
    code: 'jur2_pacte_actionnaires',
    name: "Pacte d'Actionnaires",
    category: 'juridique_admin',
    price: 14000, priceMax: 40000,
    description: "Pacte d'actionnaires détaillé régissant les relations entre associés.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 78,
    fieldsJson: F([
      {key:'denomination',label:"Dénomination sociale",type:'text',required:true},
      {key:'actionnaires',label:"Liste des actionnaires signataires",type:'textarea',required:true},
      {key:'droits_preferentiels',label:"Droits préférentiels convenus",type:'textarea',required:true},
      {key:'clauses_sortie',label:"Clauses de sortie",type:'textarea',required:true},
      {key:'date_pacte',label:"Date du pacte",type:'date',required:true},
    ]),
    body: '<div class="doc"><h1>PACTE D\'ACTIONNAIRES</h1><h2>{{denomination}}</h2><p>Les actionnaires soussignés :</p><p>{{actionnaires}}</p><p>conviennent des dispositions suivantes pour régir leurs relations au sein de la société {{denomination}}.</p><p><strong>Droits préférentiels :</strong></p><p>{{droits_preferentiels}}</p><p><strong>Clauses de sortie :</strong></p><p>{{clauses_sortie}}</p><p>Fait le {{date_pacte}}</p></div>'
  },
  {
    code: 'jur2_nda',
    name: "Accord de Confidentialité (NDA)",
    category: 'juridique_admin',
    price: 5000, priceMax: 15000,
    description: "Accord de non-divulgation pour protéger les informations confidentielles.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 92,
    fieldsJson: F([
      {key:'partie_divulgatrice',label:"Partie divulgatrice",type:'text',required:true},
      {key:'partie_receptrice',label:"Partie réceptrice",type:'text',required:true},
      {key:'objet',label:"Objet de la confidentialité",type:'textarea',required:true},
      {key:'duree',label:"Durée de confidentialité (années)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true},
    ]),
    body: '<div class="doc"><h1>ACCORD DE CONFIDENTIALITÉ</h1><p>Entre : {{partie_divulgatrice}} (la Partie Divulgatrice) et {{partie_receptrice}} (la Partie Réceptrice)</p><p><strong>Objet :</strong> {{objet}}</p><p>La Partie Réceptrice s\'engage à maintenir strictement confidentielles toutes les informations qui lui seront communiquées par la Partie Divulgatrice dans le cadre de leurs relations d\'affaires, pour une durée de {{duree}} ans.</p><p>Fait le {{date_accord}}</p></div>'
  },
  {
    code: 'jur2_protocole_fusion',
    name: "Protocole de Fusion",
    category: 'juridique_admin',
    price: 18000, priceMax: 55000,
    description: "Protocole de fusion entre deux sociétés conformément à l'OHADA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      {key:'societe_absorbante',label:"Société absorbante",type:'text',required:true},
      {key:'societe_absorbee',label:"Société absorbée",type:'text',required:true},
      {key:'rapport_echange',label:"Rapport d'échange des titres",type:'text',required:true},
      {key:'date_effet',label:"Date d'effet de la fusion",type:'date',required:true},
      {key:'conditions',label:"Conditions suspensives",type:'textarea',required:true},
    ]),
    body: '<div class="doc"><h1>PROTOCOLE DE FUSION</h1><p>Entre : {{societe_absorbante}} (la Société Absorbante) et {{societe_absorbee}} (la Société Absorbée)</p><p>Les sociétés ci-dessus ont convenu de procéder à la fusion par absorption de {{societe_absorbee}} par {{societe_absorbante}}, conformément aux dispositions des articles 189 et suivants de l\'Acte Uniforme OHADA.</p><p><strong>Rapport d\'échange :</strong> {{rapport_echange}}</p><p><strong>Conditions suspensives :</strong></p><p>{{conditions}}</p><p><strong>Date d\'effet :</strong> {{date_effet}}</p></div>'
  },
  {
    code: 'jur2_apport_partiel',
    name: "Traité d'Apport Partiel d'Actif",
    category: 'juridique_admin',
    price: 16000, priceMax: 45000,
    description: "Traité d'apport partiel d'actif entre deux entités juridiques.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 55,
    fieldsJson: F([
      {key:'apporteur',label:"Société apporteuse",type:'text',required:true},
      {key:'beneficiaire',label:"Société bénéficiaire",type:'text',required:true},
      {key:'branche_apportee',label:"Branche d'activité apportée",type:'textarea',required:true},
      {key:'valeur_apport',label:"Valeur de l'apport (FCFA)",type:'text',required:true},
      {key:'date_traite',label:"Date du traité",type:'date',required:true},
    ]),
    body: '<div class="doc"><h1>TRAITÉ D\'APPORT PARTIEL D\'ACTIF</h1><p>Entre : {{apporteur}} (la Société Apporteuse) et {{beneficiaire}} (la Société Bénéficiaire)</p><p>La société {{apporteur}} apporte à la société {{beneficiaire}} la branche d\'activité suivante :</p><p>{{branche_apportee}}</p><p><strong>Valeur de l\'apport :</strong> {{valeur_apport}} FCFA</p><p>Fait le {{date_traite}}</p></div>'
  },
  {
    code: 'jur2_convention_scission',
    name: "Convention de Scission",
    category: 'juridique_admin',
    price: 17000, priceMax: 48000,
    description: "Convention de scission d'une société en plusieurs entités.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 50,
    fieldsJson: F([
      {key:'societe_scindee',label:"Société scindée",type:'text',required:true},
      {key:'nouvelles_societes',label:"Nouvelles sociétés créées",type:'textarea',required:true},
      {key:'repartition',label:"Répartition des actifs et passifs",type:'textarea',required:true},
      {key:'date_effet',label:"Date d'effet de la scission",type:'date',required:true},
      {key:'conditions',label:"Conditions de la scission",type:'textarea',required:true},
    ]),
    body: '<div class="doc"><h1>CONVENTION DE SCISSION</h1><p>La société {{societe_scindee}} décide de procéder à sa scission conformément aux dispositions de l\'Acte Uniforme OHADA.</p><p><strong>Nouvelles entités :</strong></p><p>{{nouvelles_societes}}</p><p><strong>Répartition des actifs et passifs :</strong></p><p>{{repartition}}</p><p><strong>Conditions :</strong></p><p>{{conditions}}</p><p>Date d\'effet : {{date_effet}}</p></div>'
  },
  {
    code: 'jur2_dissolution_amiable',
    name: "Accord de Dissolution Amiable",
    category: 'juridique_admin',
    price: 8000, priceMax: 22000,
    description: "Accord de dissolution amiable d'une société commerciale OHADA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'denomination',label:"Dénomination sociale",type:'text',required:true},
      {key:'associes',label:"Associés signataires",type:'textarea',required:true},
      {key:'motif',label:"Motif de la dissolution",type:'textarea',required:true},
      {key:'liquidateur',label:"Nom du liquidateur désigné",type:'text',required:true},
      {key:'date_dissolution',label:"Date de dissolution",type:'date',required:true},
    ]),
    body: '<div class="doc"><h1>ACCORD DE DISSOLUTION AMIABLE</h1><h2>{{denomination}}</h2><p>Les associés soussignés :</p><p>{{associes}}</p><p>ont décidé de procéder à la dissolution amiable de la société {{denomination}} pour le motif suivant :</p><p>{{motif}}</p><p>Il est désigné comme liquidateur : {{liquidateur}}</p><p>Fait le {{date_dissolution}}</p></div>'
  },
  {
    code: 'jur2_rapport_liquidation',
    name: "Rapport de Liquidation",
    category: 'juridique_admin',
    price: 9000, priceMax: 24000,
    description: "Rapport final du liquidateur à l'assemblée des associés.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 58,
    fieldsJson: F([
      {key:'denomination',label:"Dénomination sociale",type:'text',required:true},
      {key:'liquidateur',label:"Nom du liquidateur",type:'text',required:true},
      {key:'bilan_liquidation',label:"Bilan de liquidation",type:'textarea',required:true},
      {key:'repartition',label:"Répartition du boni de liquidation",type:'textarea',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true},
    ]),
    body: '<div class="doc"><h1>RAPPORT DE LIQUIDATION</h1><h2>{{denomination}}</h2><p>Je soussigné, {{liquidateur}}, liquidateur de la société {{denomination}}, présente le rapport final de liquidation.</p><p><strong>Bilan de liquidation :</strong></p><p>{{bilan_liquidation}}</p><p><strong>Répartition :</strong></p><p>{{repartition}}</p><p>Fait le {{date_rapport}}</p><p>Le Liquidateur : {{liquidateur}}</p></div>'
  },
  {
    code: 'jur2_cloture_liquidation',
    name: "Acte de Clôture de Liquidation",
    category: 'juridique_admin',
    price: 7500, priceMax: 20000,
    description: "Acte officiel de clôture des opérations de liquidation.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'denomination',label:"Dénomination sociale",type:'text',required:true},
      {key:'liquidateur',label:"Nom du liquidateur",type:'text',required:true},
      {key:'operations',label:"Récapitulatif des opérations",type:'textarea',required:true},
      {key:'date_cloture',label:"Date de clôture",type:'date',required:true},
    ]),
    body: '<div class="doc"><h1>ACTE DE CLÔTURE DE LIQUIDATION</h1><h2>{{denomination}}</h2><p>Le liquidateur {{liquidateur}} déclare clôturées les opérations de liquidation de la société {{denomination}} à la date du {{date_cloture}}.</p><p><strong>Récapitulatif des opérations :</strong></p><p>{{operations}}</p><p>Le présent acte est établi pour servir et valoir ce que de droit.</p><p>Fait le {{date_cloture}}</p></div>'
  },
  {
    code: 'jur2_certificat_radiation',
    name: "Certificat de Radiation du RCCM",
    category: 'juridique_admin',
    price: 4000, priceMax: 10000,
    description: "Certificat attestant la radiation d'une société du Registre du Commerce.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'denomination',label:"Dénomination sociale",type:'text',required:true},
      {key:'numero_rccm',label:"Numéro RCCM",type:'text',required:true},
      {key:'date_radiation',label:"Date de radiation",type:'date',required:true},
      {key:'greffe',label:"Greffe du Tribunal",type:'text',required:true},
    ]),
    body: '<div class="doc"><h1>CERTIFICAT DE RADIATION DU RCCM</h1><p>Le Greffier du {{greffe}} certifie que la société :</p><p><strong>Dénomination :</strong> {{denomination}}</p><p><strong>Numéro RCCM :</strong> {{numero_rccm}}</p><p>a été radiée du Registre du Commerce et du Crédit Mobilier en date du {{date_radiation}}.</p><p>Délivré le {{date_radiation}}</p><p>Le Greffier</p></div>'
  },
  {
    code: 'jur2_immatriculation_rccm',
    name: "Demande d'Immatriculation au RCCM",
    category: 'juridique_admin',
    price: 5000, priceMax: 12000,
    description: "Formulaire de demande d'immatriculation au Registre du Commerce OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 85,
    fieldsJson: F([
      {key:'denomination',label:"Dénomination sociale",type:'text',required:true},
      {key:'forme_juridique',label:"Forme juridique",type:'text',required:true},
      {key:'siege',label:"Siège social",type:'text',required:true},
      {key:'capital',label:"Capital social (FCFA)",type:'text',required:true},
      {key:'representant',label:"Représentant légal",type:'text',required:true},
      {key:'date_demande',label:"Date de la demande",type:'date',required:true},
    ]),
    body: '<div class="doc"><h1>DEMANDE D\'IMMATRICULATION AU RCCM</h1><p>À Monsieur le Greffier du Tribunal de Commerce</p><p>Nous sollicitons l\'immatriculation au Registre du Commerce et du Crédit Mobilier de la société suivante :</p><p><strong>Dénomination :</strong> {{denomination}}</p><p><strong>Forme juridique :</strong> {{forme_juridique}}</p><p><strong>Siège social :</strong> {{siege}}</p><p><strong>Capital social :</strong> {{capital}} FCFA</p><p><strong>Représentant légal :</strong> {{representant}}</p><p>Fait le {{date_demande}}</p></div>'
  },
  {
    code: 'jur2_beneficiaires_effectifs',
    name: "Déclaration des Bénéficiaires Effectifs",
    category: 'juridique_admin',
    price: 5500, priceMax: 14000,
    description: "Déclaration obligatoire des bénéficiaires effectifs de la société.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'denomination',label:"Dénomination sociale",type:'text',required:true},
      {key:'numero_rccm',label:"Numéro RCCM",type:'text',required:true},
      {key:'beneficiaires',label:"Identité des bénéficiaires effectifs",type:'textarea',required:true},
      {key:'pourcentages',label:"Pourcentages détenus",type:'text',required:true},
      {key:'date_declaration',label:"Date de déclaration",type:'date',required:true},
    ]),
    body: '<div class="doc"><h1>DÉCLARATION DES BÉNÉFICIAIRES EFFECTIFS</h1><h2>{{denomination}} – RCCM N° {{numero_rccm}}</h2><p>Conformément aux dispositions légales en vigueur relatives à la lutte contre le blanchiment de capitaux, nous déclarons les bénéficiaires effectifs suivants :</p><p>{{beneficiaires}}</p><p><strong>Pourcentages de contrôle :</strong> {{pourcentages}}</p><p>Fait le {{date_declaration}}</p></div>'
  },
  {
    code: 'jur2_attestation_conformite',
    name: "Attestation de Conformité OHADA",
    category: 'juridique_admin',
    price: 6000, priceMax: 15000,
    description: "Attestation de conformité des actes et statuts aux normes OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'denomination',label:"Dénomination sociale",type:'text',required:true},
      {key:'avocat',label:"Nom de l'avocat ou juriste",type:'text',required:true},
      {key:'actes_verifies',label:"Actes vérifiés",type:'textarea',required:true},
      {key:'conclusion',label:"Conclusion de conformité",type:'textarea',required:true},
      {key:'date_attestation',label:"Date de l'attestation",type:'date',required:true},
    ]),
    body: '<div class="doc"><h1>ATTESTATION DE CONFORMITÉ OHADA</h1><p>Je soussigné(e), {{avocat}}, juriste spécialisé en droit OHADA, atteste que les actes de la société {{denomination}} listés ci-dessous sont conformes aux dispositions des Actes Uniformes OHADA :</p><p>{{actes_verifies}}</p><p><strong>Conclusion :</strong></p><p>{{conclusion}}</p><p>Fait à Abidjan, le {{date_attestation}}</p><p>{{avocat}}</p></div>'
  },

  // ─── 25 templates OHADA avancé (ohada2_) ─────────────────────────────────
  {
    code: 'ohada2_vente_commerciale',
    name: "Contrat de Vente Commerciale OHADA",
    category: 'juridique_admin',
    price: 7000, priceMax: 18000,
    description: "Contrat de vente commerciale conforme à l'Acte Uniforme OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 88,
    fieldsJson: F([
      {key:'vendeur',label:"Nom du vendeur",type:'text',required:true},
      {key:'acheteur',label:"Nom de l'acheteur",type:'text',required:true},
      {key:'marchandises',label:"Description des marchandises",type:'textarea',required:true},
      {key:'prix',label:"Prix (FCFA)",type:'text',required:true},
      {key:'livraison',label:"Conditions de livraison",type:'text',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true},
    ]),
    body: '<div class="doc"><h1>CONTRAT DE VENTE COMMERCIALE</h1><p>Entre : {{vendeur}} (le Vendeur) et {{acheteur}} (l\'Acheteur)</p><p><strong>Objet :</strong></p><p>{{marchandises}}</p><p><strong>Prix :</strong> {{prix}} FCFA</p><p><strong>Conditions de livraison :</strong> {{livraison}}</p><p>Le présent contrat est régi par l\'Acte Uniforme OHADA relatif au droit commercial général.</p><p>Fait le {{date_contrat}}</p></div>'
  },
  {
    code: 'ohada2_contrat_entreprise',
    name: "Contrat d'Entreprise OHADA",
    category: 'juridique_admin',
    price: 8000, priceMax: 22000,
    description: "Contrat d'entreprise pour la réalisation d'un ouvrage ou service.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 82,
    fieldsJson: F([
      {key:'maitre_ouvrage',label:"Maître d'ouvrage",type:'text',required:true},
      {key:'entrepreneur',label:"Entrepreneur",type:'text',required:true},
      {key:'objet_travaux',label:"Description des travaux",type:'textarea',required:true},
      {key:'prix',label:"Prix forfaitaire (FCFA)",type:'text',required:true},
      {key:'delai',label:"Délai d'exécution",type:'text',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true},
    ]),
    body: '<div class="doc"><h1>CONTRAT D\'ENTREPRISE</h1><p>Entre : {{maitre_ouvrage}} (le Maître d\'Ouvrage) et {{entrepreneur}} (l\'Entrepreneur)</p><p><strong>Objet des travaux :</strong></p><p>{{objet_travaux}}</p><p><strong>Prix :</strong> {{prix}} FCFA</p><p><strong>Délai d\'exécution :</strong> {{delai}}</p><p>Fait le {{date_contrat}}</p></div>'
  },
  {
    code: 'ohada2_mandat_commercial',
    name: "Mandat Commercial OHADA",
    category: 'juridique_admin',
    price: 6000, priceMax: 16000,
    description: "Mandat commercial pour représentation et vente de produits.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 75,
    fieldsJson: F([
      {key:'mandant',label:"Nom du mandant",type:'text',required:true},
      {key:'mandataire',label:"Nom du mandataire",type:'text',required:true},
      {key:'mission',label:"Mission du mandataire",type:'textarea',required:true},
      {key:'commission',label:"Taux de commission (%)",type:'text',required:true},
      {key:'duree',label:"Durée du mandat",type:'text',required:true},
      {key:'date_mandat',label:"Date du mandat",type:'date',required:true},
    ]),
    body: '<div class="doc"><h1>MANDAT COMMERCIAL</h1><p>Entre : {{mandant}} (le Mandant) et {{mandataire}} (le Mandataire)</p><p>Le Mandant confie au Mandataire la mission suivante :</p><p>{{mission}}</p><p><strong>Commission :</strong> {{commission}}%</p><p><strong>Durée :</strong> {{duree}}</p><p>Fait le {{date_mandat}}</p></div>'
  },
  {
    code: 'ohada2_lettre_change',
    name: "Lettre de Change OHADA",
    category: 'juridique_admin',
    price: 3500, priceMax: 9000,
    description: "Lettre de change conforme à l'Acte Uniforme OHADA sur les effets de commerce.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'tireur',label:"Nom du tireur",type:'text',required:true},
      {key:'tire',label:"Nom du tiré",type:'text',required:true},
      {key:'beneficiaire',label:"Nom du bénéficiaire",type:'text',required:true},
      {key:'montant',label:"Montant (FCFA)",type:'text',required:true},
      {key:'echeance',label:"Date d'échéance",type:'date',required:true},
      {key:'lieu_paiement',label:"Lieu de paiement",type:'text',required:true},
    ]),
    body: '<div class="doc"><h1>LETTRE DE CHANGE</h1><p>Veuillez payer à l\'ordre de {{beneficiaire}} la somme de {{montant}} FCFA (en lettres), à l\'échéance du {{echeance}}, valeur reçue en marchandises.</p><p>Payable à : {{lieu_paiement}}</p><p>Au : {{tire}}</p><p>Le Tireur : {{tireur}}</p></div>'
  },
  {
    code: 'ohada2_billet_ordre',
    name: "Billet à Ordre OHADA",
    category: 'juridique_admin',
    price: 3000, priceMax: 8000,
    description: "Billet à ordre conforme aux dispositions OHADA sur les effets de commerce.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'souscripteur',label:"Nom du souscripteur",type:'text',required:true},
      {key:'beneficiaire',label:"Nom du bénéficiaire",type:'text',required:true},
      {key:'montant',label:"Montant (FCFA)",type:'text',required:true},
      {key:'echeance',label:"Date d'échéance",type:'date',required:true},
      {key:'lieu',label:"Lieu de création",type:'text',required:true},
    ]),
    body: '<div class="doc"><h1>BILLET À ORDRE</h1><p>Je soussigné(e), {{souscripteur}}, m\'engage à payer à l\'ordre de {{beneficiaire}} la somme de {{montant}} FCFA, à l\'échéance du {{echeance}}.</p><p>Créé à {{lieu}}</p><p>Signé : {{souscripteur}}</p></div>'
  },
  {
    code: 'ohada2_warrant',
    name: "Warrant OHADA",
    category: 'juridique_admin',
    price: 4000, priceMax: 11000,
    description: "Warrant commercial ou agricole conforme au droit OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'proprietaire',label:"Nom du propriétaire",type:'text',required:true},
      {key:'marchandises',label:"Nature des marchandises warrantées",type:'textarea',required:true},
      {key:'valeur',label:"Valeur des marchandises (FCFA)",type:'text',required:true},
      {key:'depot',label:"Lieu de dépôt",type:'text',required:true},
      {key:'date_warrant',label:"Date d'émission",type:'date',required:true},
    ]),
    body: '<div class="doc"><h1>WARRANT COMMERCIAL</h1><p>Le présent warrant est émis par {{proprietaire}} sur les marchandises suivantes :</p><p>{{marchandises}}</p><p><strong>Valeur :</strong> {{valeur}} FCFA</p><p><strong>Lieu de dépôt :</strong> {{depot}}</p><p>Émis le {{date_warrant}}</p></div>'
  },
  {
    code: 'ohada2_nantissement_fdc',
    name: "Acte de Nantissement du Fonds de Commerce",
    category: 'juridique_admin',
    price: 9000, priceMax: 24000,
    description: "Nantissement du fonds de commerce en garantie d'un crédit bancaire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'commercant',label:"Nom du commerçant",type:'text',required:true},
      {key:'creancier',label:"Nom du créancier",type:'text',required:true},
      {key:'fonds_commerce',label:"Description du fonds de commerce",type:'textarea',required:true},
      {key:'montant',label:"Montant garanti (FCFA)",type:'text',required:true},
      {key:'date_acte',label:"Date de l'acte",type:'date',required:true},
    ]),
    body: '<div class="doc"><h1>ACTE DE NANTISSEMENT DU FONDS DE COMMERCE</h1><p>Entre : {{creancier}} (le Créancier) et {{commercant}} (le Commerçant)</p><p>Le Commerçant affecte en nantissement au profit du Créancier son fonds de commerce :</p><p>{{fonds_commerce}}</p><p><strong>Montant garanti :</strong> {{montant}} FCFA</p><p>Conformément aux articles 146 et suivants de l\'Acte Uniforme OHADA portant organisation des sûretés.</p><p>Fait le {{date_acte}}</p></div>'
  },
  {
    code: 'ohada2_credit_bail_mobilier',
    name: "Convention de Crédit-Bail Mobilier",
    category: 'juridique_admin',
    price: 10000, priceMax: 28000,
    description: "Convention de leasing mobilier conforme au droit OHADA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'bailleur',label:"Société de crédit-bail (bailleur)",type:'text',required:true},
      {key:'preneur',label:"Nom du preneur",type:'text',required:true},
      {key:'bien',label:"Description du bien en crédit-bail",type:'textarea',required:true},
      {key:'loyer',label:"Loyer mensuel (FCFA)",type:'text',required:true},
      {key:'duree',label:"Durée du contrat",type:'text',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true},
    ]),
    body: '<div class="doc"><h1>CONVENTION DE CRÉDIT-BAIL MOBILIER</h1><p>Entre : {{bailleur}} (le Bailleur) et {{preneur}} (le Preneur)</p><p><strong>Bien en crédit-bail :</strong></p><p>{{bien}}</p><p><strong>Loyer mensuel :</strong> {{loyer}} FCFA</p><p><strong>Durée :</strong> {{duree}}</p><p>À l\'issue du contrat, le Preneur dispose d\'une option d\'achat à la valeur résiduelle convenue.</p><p>Fait le {{date_contrat}}</p></div>'
  },
  {
    code: 'ohada2_credit_bail_immobilier',
    name: "Contrat de Crédit-Bail Immobilier",
    category: 'juridique_admin',
    price: 12000, priceMax: 35000,
    description: "Contrat de leasing immobilier avec option d'achat conforme OHADA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'bailleur',label:"Organisme bailleur",type:'text',required:true},
      {key:'preneur',label:"Nom du preneur",type:'text',required:true},
      {key:'bien_immobilier',label:"Description du bien immobilier",type:'textarea',required:true},
      {key:'loyer',label:"Loyer mensuel (FCFA)",type:'text',required:true},
      {key:'valeur_residuelle',label:"Valeur résiduelle (FCFA)",type:'text',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true},
    ]),
    body: '<div class="doc"><h1>CONTRAT DE CRÉDIT-BAIL IMMOBILIER</h1><p>Entre : {{bailleur}} (le Bailleur) et {{preneur}} (le Preneur)</p><p><strong>Bien immobilier :</strong></p><p>{{bien_immobilier}}</p><p><strong>Loyer mensuel :</strong> {{loyer}} FCFA</p><p><strong>Valeur résiduelle :</strong> {{valeur_residuelle}} FCFA</p><p>Fait le {{date_contrat}}</p></div>'
  },
  {
    code: 'ohada2_injonction_payer',
    name: "Procédure d'Injonction de Payer OHADA",
    category: 'juridique_admin',
    price: 7000, priceMax: 18000,
    description: "Requête en injonction de payer conforme à l'Acte Uniforme OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 80,
    fieldsJson: F([
      {key:'creancier',label:"Nom du créancier requérant",type:'text',required:true},
      {key:'debiteur',label:"Nom du débiteur",type:'text',required:true},
      {key:'montant',label:"Montant réclamé (FCFA)",type:'text',required:true},
      {key:'cause_creance',label:"Cause de la créance",type:'textarea',required:true},
      {key:'date_requete',label:"Date de la requête",type:'date',required:true},
    ]),
    body: '<div class="doc"><h1>REQUÊTE EN INJONCTION DE PAYER</h1><p>À Monsieur le Président du Tribunal de Commerce</p><p>{{creancier}} (le Requérant) sollicite qu\'il soit enjoint à {{debiteur}} de payer la somme de {{montant}} FCFA.</p><p><strong>Cause de la créance :</strong></p><p>{{cause_creance}}</p><p>Fait le {{date_requete}}</p></div>'
  },
  {
    code: 'ohada2_requete_refere',
    name: "Requête en Référé",
    category: 'juridique_admin',
    price: 8000, priceMax: 20000,
    description: "Requête en référé pour mesures urgentes devant le juge commercial.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 75,
    fieldsJson: F([
      {key:'demandeur',label:"Nom du demandeur",type:'text',required:true},
      {key:'defendeur',label:"Nom du défendeur",type:'text',required:true},
      {key:'urgence',label:"Motif d'urgence",type:'textarea',required:true},
      {key:'mesures',label:"Mesures sollicitées",type:'textarea',required:true},
      {key:'date_requete',label:"Date de la requête",type:'date',required:true},
    ]),
    body: '<div class="doc"><h1>REQUÊTE EN RÉFÉRÉ</h1><p>À Monsieur le Président du Tribunal de Commerce, statuant en référé</p><p>{{demandeur}} (le Demandeur) contre {{defendeur}} (le Défendeur)</p><p><strong>Urgence :</strong></p><p>{{urgence}}</p><p><strong>Mesures sollicitées :</strong></p><p>{{mesures}}</p><p>Fait le {{date_requete}}</p></div>'
  },
  {
    code: 'ohada2_assignation',
    name: "Assignation en Justice",
    category: 'juridique_admin',
    price: 8500, priceMax: 22000,
    description: "Acte d'assignation en justice devant le tribunal compétent.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 78,
    fieldsJson: F([
      {key:'demandeur',label:"Nom du demandeur",type:'text',required:true},
      {key:'defendeur',label:"Nom du défendeur",type:'text',required:true},
      {key:'tribunal',label:"Tribunal saisi",type:'text',required:true},
      {key:'objet',label:"Objet du litige",type:'textarea',required:true},
      {key:'pretentions',label:"Prétentions du demandeur",type:'textarea',required:true},
      {key:'date_assignation',label:"Date de l'assignation",type:'date',required:true},
    ]),
    body: '<div class="doc"><h1>ASSIGNATION EN JUSTICE</h1><p>À la requête de {{demandeur}}, j\'ai, Huissier de Justice soussigné, donné assignation à {{defendeur}} de comparaître devant {{tribunal}}.</p><p><strong>Objet du litige :</strong></p><p>{{objet}}</p><p><strong>Prétentions :</strong></p><p>{{pretentions}}</p><p>Fait le {{date_assignation}}</p></div>'
  },
  {
    code: 'ohada2_acte_huissier',
    name: "Acte d'Huissier de Justice",
    category: 'juridique_admin',
    price: 5000, priceMax: 13000,
    description: "Acte d'huissier pour signification, constat ou saisie.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'huissier',label:"Nom de l'huissier",type:'text',required:true},
      {key:'requerant',label:"Nom du requérant",type:'text',required:true},
      {key:'nature_acte',label:"Nature de l'acte",type:'text',required:true},
      {key:'description',label:"Description des opérations",type:'textarea',required:true},
      {key:'date_acte',label:"Date de l'acte",type:'date',required:true},
    ]),
    body: '<div class="doc"><h1>ACTE D\'HUISSIER DE JUSTICE</h1><p>Je soussigné, {{huissier}}, Huissier de Justice, à la requête de {{requerant}}, ai procédé aux opérations suivantes :</p><p><strong>Nature de l\'acte :</strong> {{nature_acte}}</p><p><strong>Description :</strong></p><p>{{description}}</p><p>Fait le {{date_acte}}</p><p>L\'Huissier de Justice : {{huissier}}</p></div>'
  },
  {
    code: 'ohada2_rapport_expertise',
    name: "Rapport d'Expertise Judiciaire",
    category: 'juridique_admin',
    price: 13000, priceMax: 38000,
    description: "Rapport d'expertise judiciaire désignée par décision de justice.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'expert',label:"Nom de l'expert judiciaire",type:'text',required:true},
      {key:'affaire',label:"Référence de l'affaire",type:'text',required:true},
      {key:'mission',label:"Mission de l'expert",type:'textarea',required:true},
      {key:'constatations',label:"Constatations et analyses",type:'textarea',required:true},
      {key:'conclusions',label:"Conclusions de l'expert",type:'textarea',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true},
    ]),
    body: '<div class="doc"><h1>RAPPORT D\'EXPERTISE JUDICIAIRE</h1><p>Expert : {{expert}}</p><p>Affaire : {{affaire}}</p><p><strong>Mission :</strong></p><p>{{mission}}</p><p><strong>Constatations :</strong></p><p>{{constatations}}</p><p><strong>Conclusions :</strong></p><p>{{conclusions}}</p><p>Fait le {{date_rapport}}</p><p>L\'Expert : {{expert}}</p></div>'
  },
  {
    code: 'ohada2_memoire_defense',
    name: "Mémoire en Défense",
    category: 'juridique_admin',
    price: 9000, priceMax: 25000,
    description: "Mémoire en défense devant les juridictions commerciales OHADA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'defendeur',label:"Nom du défendeur",type:'text',required:true},
      {key:'demandeur',label:"Nom du demandeur",type:'text',required:true},
      {key:'tribunal',label:"Tribunal saisi",type:'text',required:true},
      {key:'moyens_defense',label:"Moyens de défense",type:'textarea',required:true},
      {key:'demandes',label:"Demandes reconventionnelles",type:'textarea',required:true},
      {key:'date_memoire',label:"Date du mémoire",type:'date',required:true},
    ]),
    body: '<div class="doc"><h1>MÉMOIRE EN DÉFENSE</h1><p>Pour : {{defendeur}} (le Défendeur)</p><p>Contre : {{demandeur}} (le Demandeur)</p><p>Devant : {{tribunal}}</p><p><strong>Moyens de défense :</strong></p><p>{{moyens_defense}}</p><p><strong>Demandes reconventionnelles :</strong></p><p>{{demandes}}</p><p>Fait le {{date_memoire}}</p></div>'
  },
  {
    code: 'ohada2_conclusions_reponse',
    name: "Conclusions en Réponse",
    category: 'juridique_admin',
    price: 8500, priceMax: 22000,
    description: "Conclusions en réponse aux arguments de la partie adverse.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'redacteur',label:"Partie rédigeant les conclusions",type:'text',required:true},
      {key:'partie_adverse',label:"Partie adverse",type:'text',required:true},
      {key:'affaire',label:"Référence de l'affaire",type:'text',required:true},
      {key:'reponses',label:"Réponses aux arguments adverses",type:'textarea',required:true},
      {key:'date_conclusions',label:"Date des conclusions",type:'date',required:true},
    ]),
    body: '<div class="doc"><h1>CONCLUSIONS EN RÉPONSE</h1><p>Pour : {{redacteur}}</p><p>Contre : {{partie_adverse}}</p><p>Affaire : {{affaire}}</p><p><strong>En réponse aux arguments adverses :</strong></p><p>{{reponses}}</p><p>Fait le {{date_conclusions}}</p></div>'
  },
  {
    code: 'ohada2_acte_appel',
    name: "Acte d'Appel",
    category: 'juridique_admin',
    price: 7500, priceMax: 20000,
    description: "Acte d'appel interjeté devant la Cour d'Appel compétente.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'appellant',label:"Nom de l'appelant",type:'text',required:true},
      {key:'intime',label:"Nom de l'intimé",type:'text',required:true},
      {key:'decision_attaquee',label:"Décision attaquée",type:'text',required:true},
      {key:'motifs_appel',label:"Motifs de l'appel",type:'textarea',required:true},
      {key:'date_appel',label:"Date de l'acte d'appel",type:'date',required:true},
    ]),
    body: '<div class="doc"><h1>ACTE D\'APPEL</h1><p>{{appellant}} (l\'Appelant) interjette appel de la décision rendue le {{date_appel}} par {{decision_attaquee}}.</p><p>Intimé : {{intime}}</p><p><strong>Motifs d\'appel :</strong></p><p>{{motifs_appel}}</p><p>Fait le {{date_appel}}</p></div>'
  },
  {
    code: 'ohada2_memoire_appel',
    name: "Mémoire d'Appel",
    category: 'juridique_admin',
    price: 10000, priceMax: 28000,
    description: "Mémoire ampliatif d'appel devant la Cour d'Appel.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'appellant',label:"Nom de l'appelant",type:'text',required:true},
      {key:'intime',label:"Nom de l'intimé",type:'text',required:true},
      {key:'faits',label:"Rappel des faits",type:'textarea',required:true},
      {key:'griefs',label:"Griefs contre la décision",type:'textarea',required:true},
      {key:'pretentions',label:"Prétentions en appel",type:'textarea',required:true},
      {key:'date_memoire',label:"Date du mémoire",type:'date',required:true},
    ]),
    body: '<div class="doc"><h1>MÉMOIRE D\'APPEL</h1><p>Appelant : {{appellant}}</p><p>Intimé : {{intime}}</p><p><strong>Faits :</strong></p><p>{{faits}}</p><p><strong>Griefs :</strong></p><p>{{griefs}}</p><p><strong>Prétentions :</strong></p><p>{{pretentions}}</p><p>Fait le {{date_memoire}}</p></div>'
  },
  {
    code: 'ohada2_requete_ccja',
    name: "Requête en Cassation devant la CCJA",
    category: 'juridique_admin',
    price: 15000, priceMax: 45000,
    description: "Requête en cassation devant la Cour Commune de Justice et d'Arbitrage OHADA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      {key:'requerant',label:"Nom du requérant",type:'text',required:true},
      {key:'defere',label:"Nom du défendeur",type:'text',required:true},
      {key:'decision_attaquee',label:"Décision attaquée",type:'text',required:true},
      {key:'moyens_cassation',label:"Moyens de cassation",type:'textarea',required:true},
      {key:'date_requete',label:"Date de la requête",type:'date',required:true},
    ]),
    body: '<div class="doc"><h1>REQUÊTE EN CASSATION DEVANT LA CCJA</h1><p>Requérant : {{requerant}}</p><p>Défendeur : {{defere}}</p><p>Décision attaquée : {{decision_attaquee}}</p><p><strong>Moyens de cassation :</strong></p><p>{{moyens_cassation}}</p><p>Conformément aux articles 13 et suivants du Traité OHADA et du Règlement de procédure de la CCJA.</p><p>Fait le {{date_requete}}</p></div>'
  },
  {
    code: 'ohada2_sentence_arbitrale',
    name: "Sentence Arbitrale",
    category: 'juridique_admin',
    price: 18000, priceMax: 55000,
    description: "Sentence arbitrale rendue dans le cadre d'une procédure OHADA/CCJA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 62,
    fieldsJson: F([
      {key:'arbitres',label:"Composition du tribunal arbitral",type:'textarea',required:true},
      {key:'demandeur',label:"Partie demanderesse",type:'text',required:true},
      {key:'defendeur',label:"Partie défenderesse",type:'text',required:true},
      {key:'litige',label:"Objet du litige",type:'textarea',required:true},
      {key:'dispositif',label:"Dispositif de la sentence",type:'textarea',required:true},
      {key:'date_sentence',label:"Date de la sentence",type:'date',required:true},
    ]),
    body: '<div class="doc"><h1>SENTENCE ARBITRALE</h1><p>Le Tribunal Arbitral composé de :</p><p>{{arbitres}}</p><p>Saisi du litige entre :</p><p>{{demandeur}} (Demandeur) et {{defendeur}} (Défendeur)</p><p><strong>Objet du litige :</strong></p><p>{{litige}}</p><p><strong>Dispositif :</strong></p><p>{{dispositif}}</p><p>Sentence rendue le {{date_sentence}}</p></div>'
  },
  {
    code: 'ohada2_convention_arbitrage',
    name: "Convention d'Arbitrage",
    category: 'juridique_admin',
    price: 9000, priceMax: 25000,
    description: "Clause compromissoire ou compromis d'arbitrage OHADA/CCJA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'partie_a',label:"Première partie",type:'text',required:true},
      {key:'partie_b',label:"Deuxième partie",type:'text',required:true},
      {key:'litige_concerne',label:"Litige ou différend concerné",type:'textarea',required:true},
      {key:'siege_arbitrage',label:"Siège de l'arbitrage",type:'text',required:true},
      {key:'date_convention',label:"Date de la convention",type:'date',required:true},
    ]),
    body: '<div class="doc"><h1>CONVENTION D\'ARBITRAGE</h1><p>Entre : {{partie_a}} et {{partie_b}}</p><p>Les parties conviennent de soumettre à l\'arbitrage, conformément au Règlement d\'arbitrage de la CCJA-OHADA, tout différend relatif à :</p><p>{{litige_concerne}}</p><p><strong>Siège de l\'arbitrage :</strong> {{siege_arbitrage}}</p><p>Fait le {{date_convention}}</p></div>'
  },
  {
    code: 'ohada2_acte_compromis',
    name: "Acte de Compromis",
    category: 'juridique_admin',
    price: 7000, priceMax: 18000,
    description: "Acte de compromis d'arbitrage pour un litige déjà né.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'partie_a',label:"Première partie",type:'text',required:true},
      {key:'partie_b',label:"Deuxième partie",type:'text',required:true},
      {key:'litige',label:"Description précise du litige",type:'textarea',required:true},
      {key:'arbitre_unique',label:"Nom de l'arbitre unique (si applicable)",type:'text',required:true},
      {key:'date_compromis',label:"Date du compromis",type:'date',required:true},
    ]),
    body: '<div class="doc"><h1>ACTE DE COMPROMIS</h1><p>{{partie_a}} et {{partie_b}} ont convenu de soumettre à l\'arbitrage le différend suivant :</p><p>{{litige}}</p><p><strong>Arbitre désigné :</strong> {{arbitre_unique}}</p><p>Les parties s\'engagent à exécuter la sentence qui sera rendue.</p><p>Fait le {{date_compromis}}</p></div>'
  },
  {
    code: 'ohada2_pv_conciliation',
    name: "Procès-verbal de Conciliation",
    category: 'juridique_admin',
    price: 6000, priceMax: 16000,
    description: "PV de conciliation homologué devant le juge ou conciliateur.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'partie_a',label:"Première partie",type:'text',required:true},
      {key:'partie_b',label:"Deuxième partie",type:'text',required:true},
      {key:'conciliateur',label:"Nom du conciliateur",type:'text',required:true},
      {key:'accord',label:"Termes de l'accord de conciliation",type:'textarea',required:true},
      {key:'date_pv',label:"Date du procès-verbal",type:'date',required:true},
    ]),
    body: '<div class="doc"><h1>PROCÈS-VERBAL DE CONCILIATION</h1><p>Devant {{conciliateur}}, conciliateur</p><p>Entre : {{partie_a}} et {{partie_b}}</p><p>Les parties sont parvenues à l\'accord suivant :</p><p>{{accord}}</p><p>Le présent procès-verbal vaut titre exécutoire après homologation.</p><p>Fait le {{date_pv}}</p><p>Le Conciliateur : {{conciliateur}}</p></div>'
  },
  {
    code: 'ohada2_mediation_commerciale',
    name: "Convention de Médiation Commerciale",
    category: 'juridique_admin',
    price: 7000, priceMax: 18000,
    description: "Convention de médiation commerciale pour résolution amiable des litiges.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'partie_a',label:"Première partie",type:'text',required:true},
      {key:'partie_b',label:"Deuxième partie",type:'text',required:true},
      {key:'mediateur',label:"Nom du médiateur",type:'text',required:true},
      {key:'litige',label:"Nature du litige",type:'textarea',required:true},
      {key:'date_convention',label:"Date de la convention",type:'date',required:true},
    ]),
    body: '<div class="doc"><h1>CONVENTION DE MÉDIATION COMMERCIALE</h1><p>{{partie_a}} et {{partie_b}} s\'engagent à tenter de régler amiablement leur différend par voie de médiation, avec l\'assistance de {{mediateur}}.</p><p><strong>Nature du litige :</strong></p><p>{{litige}}</p><p>Les parties s\'engagent à participer de bonne foi à la procédure de médiation.</p><p>Fait le {{date_convention}}</p></div>'
  },
  {
    code: 'ohada2_certificat_exequatur',
    name: "Certificat d'Exéquatur",
    category: 'juridique_admin',
    price: 8000, priceMax: 22000,
    description: "Certificat d'exéquatur pour l'exécution d'une décision étrangère ou arbitrale.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      {key:'juridiction',label:"Juridiction accordant l'exéquatur",type:'text',required:true},
      {key:'decision_origine',label:"Décision d'origine",type:'text',required:true},
      {key:'pays_origine',label:"Pays d'origine de la décision",type:'text',required:true},
      {key:'beneficiaire',label:"Bénéficiaire de l'exéquatur",type:'text',required:true},
      {key:'date_exequatur',label:"Date de l'exéquatur",type:'date',required:true},
    ]),
    body: '<div class="doc"><h1>CERTIFICAT D\'EXÉQUATUR</h1><p>Nous, Président de {{juridiction}}, certifions que la décision {{decision_origine}} rendue par les juridictions de {{pays_origine}} est revêtue de la formule exécutoire sur le territoire national.</p><p>Bénéficiaire : {{beneficiaire}}</p><p>L\'huissier ou l\'officier ministériel compétent est tenu de procéder à l\'exécution forcée sur simple présentation du présent certificat.</p><p>Délivré le {{date_exequatur}}</p></div>'
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
  console.log(`Batch 11b OK — créés:${created} maj:${updated} TOTAL:${total}`);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
