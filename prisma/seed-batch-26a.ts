import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  {
    code: 'gov2_charte_ca', name: "Charte du Conseil d'Administration", category: 'juridique_admin', price: 15000, priceMax: 45000,
    description: "Charte définissant les missions, pouvoirs et règles de fonctionnement du conseil d'administration conforme au droit OHADA.", templateType: 'pdf', classe: 'A', active: true, popularity: 85,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale de la société",type:'text',required:true},
      {key:'forme_juridique',label:"Forme juridique (SA, SAS...)",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption de la charte",type:'date',required:true},
      {key:'nombre_administrateurs',label:"Nombre d'administrateurs",type:'text',required:true},
      {key:'siege_social',label:"Siège social",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DU CONSEIL D'ADMINISTRATION</h1><h2>{{raison_sociale}} — {{forme_juridique}}</h2><p>Adoptée le {{date_adoption}} au siège social sis {{siege_social}}.</p><h3>Article 1 — Objet</h3><p>La présente charte définit les règles de fonctionnement du Conseil d'Administration composé de {{nombre_administrateurs}} membres.</p><h3>Article 2 — Missions</h3><p>Le Conseil d'Administration détermine les orientations stratégiques de la société et veille à leur mise en oeuvre conformément aux dispositions de l'Acte Uniforme OHADA relatif aux sociétés commerciales.</p><h3>Article 3 — Composition et mandats</h3><p>Les administrateurs sont nommés par l'Assemblée Générale des actionnaires pour une durée fixée par les statuts.</p><h3>Article 4 — Fonctionnement</h3><p>Le Conseil se réunit au moins quatre fois par an sur convocation de son Président.</p></div>`
  },
  {
    code: 'gov2_reglement_interieur_ca', name: "Règlement Intérieur du Conseil d'Administration", category: 'juridique_admin', price: 12000, priceMax: 36000,
    description: "Règlement intérieur précisant les modalités pratiques de fonctionnement et les procédures de délibération du conseil d'administration.", templateType: 'pdf', classe: 'A', active: true, popularity: 80,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'date_approbation',label:"Date d'approbation",type:'date',required:true},
      {key:'quorum',label:"Quorum requis (ex: moitié des membres)",type:'text',required:true},
      {key:'periodicite_reunions',label:"Périodicité des réunions",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>RÈGLEMENT INTÉRIEUR DU CONSEIL D'ADMINISTRATION</h1><h2>{{raison_sociale}}</h2><p>Approuvé le {{date_approbation}}.</p><h3>Article 1 — Convocations</h3><p>Les convocations sont adressées par le Président du Conseil au moins quinze (15) jours avant la réunion.</p><h3>Article 2 — Quorum et délibérations</h3><p>Le quorum est atteint lorsque {{quorum}} des membres sont présents ou représentés. Les décisions sont prises à la majorité des voix.</p><h3>Article 3 — Fréquence des réunions</h3><p>Le Conseil se réunit {{periodicite_reunions}} et chaque fois que l'intérêt de la société l'exige.</p><h3>Article 4 — Procès-verbaux</h3><p>Les délibérations du Conseil sont consignées dans des procès-verbaux signés par le Président et le Secrétaire de séance.</p></div>`
  },
  {
    code: 'gov2_pv_reunion_ca', name: "Procès-Verbal de Réunion du Conseil d'Administration", category: 'juridique_admin', price: 8000, priceMax: 20000,
    description: "Modèle de procès-verbal de réunion du conseil d'administration conforme aux exigences du droit OHADA.", templateType: 'pdf', classe: 'A', active: true, popularity: 90,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'date_reunion',label:"Date de la réunion",type:'date',required:true},
      {key:'lieu_reunion',label:"Lieu de la réunion",type:'text',required:true},
      {key:'president_seance',label:"Président de séance",type:'text',required:true},
      {key:'ordre_du_jour',label:"Ordre du jour",type:'textarea',required:true},
      {key:'decisions_prises',label:"Décisions prises",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>PROCÈS-VERBAL DE RÉUNION DU CONSEIL D'ADMINISTRATION</h1><h2>{{raison_sociale}}</h2><p><strong>Date :</strong> {{date_reunion}} | <strong>Lieu :</strong> {{lieu_reunion}}</p><p><strong>Président de séance :</strong> {{president_seance}}</p><h3>Ordre du jour</h3><p>{{ordre_du_jour}}</p><h3>Délibérations et décisions</h3><p>{{decisions_prises}}</p><p>Le présent procès-verbal est signé par le Président de séance et le Secrétaire après approbation par le Conseil.</p></div>`
  },
  {
    code: 'gov2_rapport_president_ca', name: "Rapport du Président du Conseil d'Administration", category: 'juridique_admin', price: 14000, priceMax: 42000,
    description: "Rapport annuel du Président du CA sur les conditions de préparation et d'organisation des travaux du conseil et les procédures de contrôle interne.", templateType: 'pdf', classe: 'A', active: true, popularity: 75,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'exercice',label:"Exercice concerné",type:'text',required:true},
      {key:'nom_president',label:"Nom du Président",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true},
      {key:'faits_marquants',label:"Faits marquants de l'exercice",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DU PRÉSIDENT DU CONSEIL D'ADMINISTRATION</h1><h2>{{raison_sociale}} — Exercice {{exercice}}</h2><p>Rapport établi par {{nom_president}}, Président du Conseil d'Administration, le {{date_rapport}}.</p><h3>1. Conditions de préparation des travaux du Conseil</h3><p>Au cours de l'exercice {{exercice}}, le Conseil d'Administration s'est réuni conformément aux dispositions légales et réglementaires en vigueur.</p><h3>2. Faits marquants</h3><p>{{faits_marquants}}</p><h3>3. Procédures de contrôle interne</h3><p>La société dispose de procédures de contrôle interne visant à assurer la fiabilité des informations financières et la conformité aux lois et règlements.</p></div>`
  },
  {
    code: 'gov2_charte_comite_audit', name: "Charte du Comité d'Audit", category: 'juridique_admin', price: 12000, priceMax: 35000,
    description: "Charte définissant la mission, la composition et le fonctionnement du comité d'audit au sein du conseil d'administration.", templateType: 'pdf', classe: 'A', active: true, popularity: 78,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'date_creation_comite',label:"Date de création du comité",type:'date',required:true},
      {key:'nombre_membres',label:"Nombre de membres du comité",type:'text',required:true},
      {key:'president_comite',label:"Président du comité",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DU COMITÉ D'AUDIT</h1><h2>{{raison_sociale}}</h2><p>Créé le {{date_creation_comite}} et composé de {{nombre_membres}} membres sous la présidence de {{president_comite}}.</p><h3>Article 1 — Mission</h3><p>Le Comité d'Audit assiste le Conseil d'Administration dans le suivi des questions relatives à l'élaboration et au contrôle des informations comptables et financières.</p><h3>Article 2 — Composition</h3><p>Le Comité est composé de {{nombre_membres}} administrateurs dont au moins un administrateur indépendant disposant de compétences financières ou comptables.</p><h3>Article 3 — Attributions</h3><p>Il examine les comptes annuels, s'assure de la pertinence des méthodes comptables et supervise les travaux des commissaires aux comptes.</p></div>`
  },
  {
    code: 'gov2_charte_comite_remunerations', name: "Charte du Comité des Rémunérations", category: 'juridique_admin', price: 11000, priceMax: 33000,
    description: "Charte définissant les attributions et le fonctionnement du comité chargé de la politique de rémunération des dirigeants.", templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true},
      {key:'president_comite',label:"Président du comité",type:'text',required:true},
      {key:'perimetre',label:"Périmètre des dirigeants concernés",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DU COMITÉ DES RÉMUNÉRATIONS</h1><h2>{{raison_sociale}}</h2><p>Adoptée le {{date_adoption}} — Président : {{president_comite}}.</p><h3>Article 1 — Objet</h3><p>Le Comité des Rémunérations a pour mission de proposer au Conseil d'Administration la politique de rémunération des mandataires sociaux et des dirigeants exécutifs.</p><h3>Article 2 — Périmètre</h3><p>{{perimetre}}</p><h3>Article 3 — Attributions</h3><p>Le Comité formule des recommandations sur la rémunération fixe, variable, les avantages en nature et les régimes de retraite des dirigeants.</p></div>`
  },
  {
    code: 'gov2_charte_comite_risques', name: "Charte du Comité des Risques", category: 'juridique_admin', price: 12000, priceMax: 36000,
    description: "Charte du comité spécialisé du conseil chargé du suivi du dispositif de gestion des risques de l'entreprise.", templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true},
      {key:'types_risques',label:"Typologies de risques couverts",type:'textarea',required:true},
      {key:'periodicite',label:"Périodicité des réunions",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DU COMITÉ DES RISQUES</h1><h2>{{raison_sociale}}</h2><p>Adoptée le {{date_adoption}}.</p><h3>Article 1 — Mission</h3><p>Le Comité des Risques est chargé d'assister le Conseil d'Administration dans la supervision du dispositif de gestion des risques de l'entreprise.</p><h3>Article 2 — Périmètre des risques</h3><p>{{types_risques}}</p><h3>Article 3 — Fonctionnement</h3><p>Le Comité se réunit {{periodicite}} et rend compte de ses travaux au Conseil d'Administration à l'issue de chaque séance.</p></div>`
  },
  {
    code: 'gov2_charte_comite_nomination', name: "Charte du Comité de Nomination", category: 'juridique_admin', price: 11000, priceMax: 33000,
    description: "Charte du comité de nomination chargé d'examiner les candidatures aux postes d'administrateurs et de dirigeants.", templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true},
      {key:'criteres_selection',label:"Critères de sélection des candidats",type:'textarea',required:true},
      {key:'president_comite',label:"Président du comité",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DU COMITÉ DE NOMINATION</h1><h2>{{raison_sociale}}</h2><p>Adoptée le {{date_adoption}} — Président : {{president_comite}}.</p><h3>Article 1 — Mission</h3><p>Le Comité de Nomination est chargé de formuler des recommandations au Conseil d'Administration sur la composition de celui-ci et la désignation des dirigeants.</p><h3>Article 2 — Critères de sélection</h3><p>{{criteres_selection}}</p><h3>Article 3 — Processus</h3><p>Le Comité étudie les candidatures, conduit les entretiens nécessaires et présente ses recommandations motivées au Conseil d'Administration.</p></div>`
  },
  {
    code: 'gov2_rapport_gouvernance_annuel', name: "Rapport de Gouvernance Annuel", category: 'juridique_admin', price: 16000, priceMax: 48000,
    description: "Rapport annuel de gouvernance d'entreprise présentant les pratiques, la composition des organes et les activités du conseil.", templateType: 'pdf', classe: 'A', active: true, popularity: 82,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'exercice',label:"Exercice de référence",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true},
      {key:'composition_ca',label:"Composition du conseil d'administration",type:'textarea',required:true},
      {key:'principales_decisions',label:"Principales décisions de l'exercice",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE GOUVERNANCE ANNUEL</h1><h2>{{raison_sociale}} — Exercice {{exercice}}</h2><p>Établi le {{date_rapport}}.</p><h3>1. Structure de gouvernance</h3><p>{{composition_ca}}</p><h3>2. Activités du Conseil d'Administration</h3><p>Au cours de l'exercice {{exercice}}, le Conseil d'Administration a tenu ses réunions statutaires et a pris les décisions suivantes :</p><p>{{principales_decisions}}</p><h3>3. Conformité et éthique</h3><p>La société s'engage à respecter les meilleures pratiques de gouvernance applicables dans la zone OHADA.</p></div>`
  },
  {
    code: 'gov2_declaration_politique_gouvernance', name: "Déclaration de Politique de Gouvernance", category: 'juridique_admin', price: 10000, priceMax: 28000,
    description: "Déclaration formelle des engagements de l'entreprise en matière de gouvernance d'entreprise responsable.", templateType: 'pdf', classe: 'A', active: true, popularity: 73,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'date_declaration',label:"Date de la déclaration",type:'date',required:true},
      {key:'valeurs_gouvernance',label:"Valeurs fondamentales de gouvernance",type:'textarea',required:true},
      {key:'signataire',label:"Nom et titre du signataire",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>DÉCLARATION DE POLITIQUE DE GOUVERNANCE</h1><h2>{{raison_sociale}}</h2><p>Déclaration faite le {{date_declaration}} par {{signataire}}.</p><h3>Nos engagements</h3><p>{{raison_sociale}} s'engage à exercer ses activités dans le respect des principes de transparence, d'équité, de responsabilité et d'intégrité.</p><h3>Valeurs fondamentales</h3><p>{{valeurs_gouvernance}}</p><h3>Mise en oeuvre</h3><p>Le Conseil d'Administration est chargé de veiller à l'application de la présente politique et d'en rendre compte annuellement aux actionnaires.</p></div>`
  },
  {
    code: 'gov2_politique_conflits_interets', name: "Politique de Gestion des Conflits d'Intérêts", category: 'juridique_admin', price: 11000, priceMax: 32000,
    description: "Politique encadrant l'identification, la déclaration et la gestion des conflits d'intérêts des administrateurs et dirigeants.", templateType: 'pdf', classe: 'A', active: true, popularity: 76,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true},
      {key:'procedure_declaration',label:"Procédure de déclaration des conflits",type:'textarea',required:true},
      {key:'sanctions',label:"Sanctions applicables",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>POLITIQUE DE GESTION DES CONFLITS D'INTÉRÊTS</h1><h2>{{raison_sociale}}</h2><p>Adoptée le {{date_adoption}}.</p><h3>1. Définition</h3><p>Un conflit d'intérêts survient lorsqu'un administrateur ou dirigeant dispose d'un intérêt personnel susceptible d'influencer l'exercice objectif de ses fonctions.</p><h3>2. Procédure de déclaration</h3><p>{{procedure_declaration}}</p><h3>3. Gestion des situations de conflit</h3><p>Tout administrateur en situation de conflit d'intérêts doit s'abstenir de participer aux délibérations et au vote sur les questions concernées.</p><h3>4. Sanctions</h3><p>{{sanctions}}</p></div>`
  },
  {
    code: 'gov2_code_conduite_administrateurs', name: "Code de Conduite des Administrateurs", category: 'juridique_admin', price: 10000, priceMax: 30000,
    description: "Code de conduite définissant les obligations éthiques et comportementales des membres du conseil d'administration.", templateType: 'pdf', classe: 'A', active: true, popularity: 77,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true},
      {key:'engagements_ethiques',label:"Engagements éthiques spécifiques",type:'textarea',required:true},
      {key:'obligations_confidentialite',label:"Obligations de confidentialité",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>CODE DE CONDUITE DES ADMINISTRATEURS</h1><h2>{{raison_sociale}}</h2><p>Adopté le {{date_adoption}}.</p><h3>Article 1 — Intégrité et éthique</h3><p>Chaque administrateur s'engage à agir avec intégrité, honnêteté et dans l'intérêt exclusif de la société. {{engagements_ethiques}}</p><h3>Article 2 — Confidentialité</h3><p>{{obligations_confidentialite}}</p><h3>Article 3 — Assiduité</h3><p>Les administrateurs s'engagent à participer activement aux réunions du Conseil et de ses comités spécialisés.</p><h3>Article 4 — Formation</h3><p>Chaque administrateur veille à maintenir sa compétence et sa connaissance de la société et de son secteur d'activité.</p></div>`
  },
  {
    code: 'gov2_procedure_cooptation_administrateur', name: "Procédure de Cooptation d'Administrateur", category: 'juridique_admin', price: 9000, priceMax: 25000,
    description: "Procédure encadrant la cooptation d'un nouvel administrateur en cours de mandat par le conseil d'administration.", templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'date_procedure',label:"Date d'adoption de la procédure",type:'date',required:true},
      {key:'criteres_cooptation',label:"Critères de sélection pour la cooptation",type:'textarea',required:true},
      {key:'etapes_validation',label:"Étapes de validation",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>PROCÉDURE DE COOPTATION D'ADMINISTRATEUR</h1><h2>{{raison_sociale}}</h2><p>Procédure adoptée le {{date_procedure}}.</p><h3>1. Contexte et base légale</h3><p>Conformément aux dispositions de l'Acte Uniforme OHADA et des statuts de la société, le Conseil peut procéder à la cooptation d'administrateurs en cas de vacance de siège.</p><h3>2. Critères de sélection</h3><p>{{criteres_cooptation}}</p><h3>3. Étapes de validation</h3><p>{{etapes_validation}}</p><h3>4. Ratification</h3><p>La cooptation est soumise à ratification lors de la prochaine Assemblée Générale Ordinaire.</p></div>`
  },
  {
    code: 'gov2_contrat_mandat_administrateur', name: "Contrat de Mandat d'Administrateur", category: 'juridique_admin', price: 13000, priceMax: 38000,
    description: "Contrat formalisant le mandat d'administrateur, incluant les obligations, droits et conditions de rémunération.", templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale de la société",type:'text',required:true},
      {key:'nom_administrateur',label:"Nom complet de l'administrateur",type:'text',required:true},
      {key:'date_debut_mandat',label:"Date de début du mandat",type:'date',required:true},
      {key:'duree_mandat',label:"Durée du mandat",type:'text',required:true},
      {key:'remuneration',label:"Modalités de rémunération (jetons de présence)",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE MANDAT D'ADMINISTRATEUR</h1><p>Entre {{raison_sociale}} (ci-après "la Société") et {{nom_administrateur}} (ci-après "l'Administrateur").</p><h3>Article 1 — Mandat</h3><p>La Société confie à l'Administrateur un mandat de membre du Conseil d'Administration à compter du {{date_debut_mandat}} pour une durée de {{duree_mandat}}.</p><h3>Article 2 — Obligations</h3><p>L'Administrateur s'engage à exercer son mandat avec diligence, loyauté et dans l'intérêt exclusif de la Société.</p><h3>Article 3 — Rémunération</h3><p>{{remuneration}}</p><h3>Article 4 — Confidentialité</h3><p>L'Administrateur est tenu au secret des délibérations du Conseil pendant la durée de son mandat et après sa cessation.</p></div>`
  },
  {
    code: 'gov2_charte_administrateur_independant', name: "Charte de l'Administrateur Indépendant", category: 'juridique_admin', price: 10000, priceMax: 28000,
    description: "Charte définissant les critères d'indépendance et les engagements spécifiques des administrateurs indépendants.", templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true},
      {key:'criteres_independance',label:"Critères d'indépendance retenus",type:'textarea',required:true},
      {key:'role_specifique',label:"Rôle spécifique des indépendants",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE L'ADMINISTRATEUR INDÉPENDANT</h1><h2>{{raison_sociale}}</h2><p>Adoptée le {{date_adoption}}.</p><h3>1. Critères d'indépendance</h3><p>Est qualifié d'indépendant tout administrateur qui ne se trouve pas dans une situation pouvant compromettre l'exercice de son jugement. Critères retenus : {{criteres_independance}}</p><h3>2. Rôle et missions spécifiques</h3><p>{{role_specifique}}</p><h3>3. Obligations particulières</h3><p>L'administrateur indépendant est tenu de signaler immédiatement toute situation susceptible de remettre en cause son indépendance au Président du Conseil.</p></div>`
  },
  {
    code: 'gov2_politique_remuneration_dirigeants', name: "Politique de Rémunération des Dirigeants", category: 'juridique_admin', price: 14000, priceMax: 42000,
    description: "Politique définissant les principes et composantes de la rémunération des mandataires sociaux et dirigeants exécutifs.", templateType: 'pdf', classe: 'A', active: true, popularity: 79,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true},
      {key:'composantes_remuneration',label:"Composantes de la rémunération",type:'textarea',required:true},
      {key:'criteres_variable',label:"Critères de performance pour la part variable",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>POLITIQUE DE RÉMUNÉRATION DES DIRIGEANTS</h1><h2>{{raison_sociale}}</h2><p>Adoptée le {{date_adoption}} par le Conseil d'Administration sur recommandation du Comité des Rémunérations.</p><h3>1. Principes directeurs</h3><p>La politique de rémunération vise à attirer, motiver et fidéliser des dirigeants de talent tout en alignant leurs intérêts sur ceux de la société et de ses actionnaires.</p><h3>2. Composantes</h3><p>{{composantes_remuneration}}</p><h3>3. Critères de performance</h3><p>{{criteres_variable}}</p><h3>4. Gouvernance</h3><p>Cette politique est revue annuellement par le Comité des Rémunérations et soumise à approbation du Conseil.</p></div>`
  },
  {
    code: 'gov2_rapport_remunerations', name: "Rapport sur les Rémunérations", category: 'juridique_admin', price: 12000, priceMax: 36000,
    description: "Rapport annuel détaillant les rémunérations versées aux dirigeants et administrateurs au titre de l'exercice écoulé.", templateType: 'pdf', classe: 'A', active: true, popularity: 74,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'exercice',label:"Exercice concerné",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true},
      {key:'total_remuneration_ca',label:"Total des rémunérations versées au CA",type:'text',required:true},
      {key:'detail_dirigeants',label:"Détail par dirigeant exécutif",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT SUR LES RÉMUNÉRATIONS</h1><h2>{{raison_sociale}} — Exercice {{exercice}}</h2><p>Établi le {{date_rapport}}.</p><h3>1. Rémunérations du Conseil d'Administration</h3><p>Le montant total des jetons de présence et rémunérations versés aux membres du Conseil au titre de l'exercice {{exercice}} s'élève à {{total_remuneration_ca}} FCFA.</p><h3>2. Rémunérations des dirigeants exécutifs</h3><p>{{detail_dirigeants}}</p><h3>3. Éléments de comparaison</h3><p>Les rémunérations sont cohérentes avec les pratiques de marché constatées dans le secteur d'activité de la société.</p></div>`
  },
  {
    code: 'gov2_procedure_evaluation_conseil', name: "Procédure d'Évaluation du Conseil d'Administration", category: 'juridique_admin', price: 11000, priceMax: 32000,
    description: "Procédure d'évaluation périodique du fonctionnement et de l'efficacité du conseil d'administration.", templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'date_procedure',label:"Date d'adoption de la procédure",type:'date',required:true},
      {key:'methodologie',label:"Méthodologie d'évaluation retenue",type:'textarea',required:true},
      {key:'periodicite',label:"Périodicité de l'évaluation",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>PROCÉDURE D'ÉVALUATION DU CONSEIL D'ADMINISTRATION</h1><h2>{{raison_sociale}}</h2><p>Adoptée le {{date_procedure}}.</p><h3>1. Objectifs</h3><p>L'évaluation du Conseil vise à améliorer son fonctionnement, identifier les axes de progrès et vérifier que les questions importantes sont convenablement préparées et débattues.</p><h3>2. Méthodologie</h3><p>{{methodologie}}</p><h3>3. Périodicité</h3><p>L'évaluation est conduite {{periodicite}}. Une évaluation externe est réalisée au moins une fois tous les trois ans.</p><h3>4. Suivi</h3><p>Les conclusions de l'évaluation sont présentées au Conseil et font l'objet d'un plan d'actions de mise en oeuvre.</p></div>`
  },
  {
    code: 'gov2_plan_succession_dirigeants', name: "Plan de Succession des Dirigeants", category: 'juridique_admin', price: 13000, priceMax: 38000,
    description: "Plan de succession garantissant la continuité du leadership et la transmission ordonnée des responsabilités dirigeantes.", templateType: 'pdf', classe: 'A', active: true, popularity: 71,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption du plan",type:'date',required:true},
      {key:'postes_critiques',label:"Postes critiques identifiés",type:'textarea',required:true},
      {key:'candidats_potentiels',label:"Profils de successeurs potentiels",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE SUCCESSION DES DIRIGEANTS</h1><h2>{{raison_sociale}}</h2><p>Adopté le {{date_adoption}}.</p><h3>1. Objectifs</h3><p>Le présent plan vise à garantir la continuité des fonctions dirigeantes en cas de vacance planifiée ou imprévue.</p><h3>2. Postes critiques</h3><p>{{postes_critiques}}</p><h3>3. Succession d'urgence</h3><p>En cas de vacance subite, l'intérim est assuré conformément aux dispositions prévues à cet effet jusqu'à la nomination d'un successeur définitif.</p><h3>4. Profils de successeurs</h3><p>{{candidats_potentiels}}</p><h3>5. Développement</h3><p>Des plans de développement individuels sont mis en place pour préparer les successeurs identifiés.</p></div>`
  },
  {
    code: 'gov2_politique_anticorruption', name: "Politique Anti-Corruption et Anti-Blanchiment", category: 'juridique_admin', price: 15000, priceMax: 45000,
    description: "Politique de prévention de la corruption et du blanchiment de capitaux conforme aux standards internationaux et aux lois UEMOA.", templateType: 'pdf', classe: 'A', active: true, popularity: 88,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true},
      {key:'responsable_conformite',label:"Responsable de la conformité",type:'text',required:true},
      {key:'mesures_prevention',label:"Principales mesures de prévention",type:'textarea',required:true},
      {key:'procedure_signalement',label:"Procédure de signalement interne",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>POLITIQUE ANTI-CORRUPTION ET ANTI-BLANCHIMENT</h1><h2>{{raison_sociale}}</h2><p>Adoptée le {{date_adoption}} — Responsable de la conformité : {{responsable_conformite}}.</p><h3>1. Engagement</h3><p>{{raison_sociale}} condamne toute forme de corruption, de trafic d'influence et de blanchiment de capitaux. Ces actes sont strictement prohibés.</p><h3>2. Mesures de prévention</h3><p>{{mesures_prevention}}</p><h3>3. Signalement</h3><p>{{procedure_signalement}}</p><h3>4. Sanctions</h3><p>Tout manquement à la présente politique expose son auteur à des sanctions disciplinaires pouvant aller jusqu'au licenciement et aux poursuites pénales.</p></div>`
  },
  {
    code: 'gov2_plan_vigilance_groupe', name: "Plan de Vigilance Groupe", category: 'juridique_admin', price: 16000, priceMax: 50000,
    description: "Plan de vigilance du groupe en matière de droits humains, environnement et pratiques d'affaires responsables.", templateType: 'pdf', classe: 'A', active: true, popularity: 75,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale du groupe",type:'text',required:true},
      {key:'exercice',label:"Exercice couvert",type:'text',required:true},
      {key:'date_publication',label:"Date de publication",type:'date',required:true},
      {key:'risques_identifies',label:"Risques identifiés en matière de droits humains et environnement",type:'textarea',required:true},
      {key:'mesures_vigilance',label:"Mesures de vigilance mises en place",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE VIGILANCE GROUPE</h1><h2>{{raison_sociale}} — Exercice {{exercice}}</h2><p>Publié le {{date_publication}}.</p><h3>1. Périmètre</h3><p>Le présent plan couvre les activités du groupe {{raison_sociale}} et de ses filiales dans les pays où il opère.</p><h3>2. Risques identifiés</h3><p>{{risques_identifies}}</p><h3>3. Mesures de vigilance</h3><p>{{mesures_vigilance}}</p><h3>4. Mécanisme d'alerte</h3><p>Un dispositif de recueil des signalements est mis à disposition des parties prenantes internes et externes.</p></div>`
  },
  {
    code: 'gov2_rapport_rse_esg', name: "Rapport RSE/ESG Annuel", category: 'juridique_admin', price: 18000, priceMax: 55000,
    description: "Rapport annuel sur la responsabilité sociétale et les critères environnementaux, sociaux et de gouvernance (ESG).", templateType: 'pdf', classe: 'A', active: true, popularity: 85,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'exercice',label:"Exercice concerné",type:'text',required:true},
      {key:'date_publication',label:"Date de publication",type:'date',required:true},
      {key:'indicateurs_environnementaux',label:"Indicateurs environnementaux clés",type:'textarea',required:true},
      {key:'indicateurs_sociaux',label:"Indicateurs sociaux clés",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT RSE/ESG ANNUEL</h1><h2>{{raison_sociale}} — Exercice {{exercice}}</h2><p>Publié le {{date_publication}}.</p><h3>1. Engagement RSE du Groupe</h3><p>{{raison_sociale}} s'engage à conduire ses activités de manière responsable, en intégrant les enjeux environnementaux, sociaux et de gouvernance dans sa stratégie.</p><h3>2. Performance environnementale</h3><p>{{indicateurs_environnementaux}}</p><h3>3. Performance sociale</h3><p>{{indicateurs_sociaux}}</p><h3>4. Gouvernance responsable</h3><p>Les pratiques de gouvernance de la société sont décrites dans le rapport de gouvernance annuel disponible sur notre site internet.</p></div>`
  },
  {
    code: 'gov2_charte_actionnaire', name: "Charte de l'Actionnaire", category: 'juridique_admin', price: 10000, priceMax: 28000,
    description: "Charte définissant les droits et obligations des actionnaires et les engagements de la société envers eux.", templateType: 'pdf', classe: 'A', active: true, popularity: 69,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true},
      {key:'droits_actionnaires',label:"Droits des actionnaires",type:'textarea',required:true},
      {key:'engagements_societe',label:"Engagements de la société envers les actionnaires",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE L'ACTIONNAIRE</h1><h2>{{raison_sociale}}</h2><p>Adoptée le {{date_adoption}}.</p><h3>1. Droits des actionnaires</h3><p>{{droits_actionnaires}}</p><h3>2. Engagements de la société</h3><p>{{engagements_societe}}</p><h3>3. Dialogue actionnarial</h3><p>La société s'engage à entretenir un dialogue régulier et transparent avec ses actionnaires et à répondre à leurs demandes d'information dans les meilleurs délais.</p></div>`
  },
  {
    code: 'gov2_politique_dividendes', name: "Politique de Distribution de Dividendes", category: 'juridique_admin', price: 11000, priceMax: 33000,
    description: "Politique définissant les règles et critères de distribution des dividendes aux actionnaires de la société.", templateType: 'pdf', classe: 'A', active: true, popularity: 74,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true},
      {key:'taux_distribution',label:"Taux de distribution cible (payout ratio)",type:'text',required:true},
      {key:'criteres_distribution',label:"Critères conditionnant la distribution",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>POLITIQUE DE DISTRIBUTION DE DIVIDENDES</h1><h2>{{raison_sociale}}</h2><p>Adoptée le {{date_adoption}}.</p><h3>1. Objectif</h3><p>La politique de dividende vise à assurer une rémunération régulière et croissante des actionnaires tout en préservant la capacité d'investissement de la société.</p><h3>2. Taux de distribution</h3><p>La société vise un taux de distribution de {{taux_distribution}} du résultat net consolidé.</p><h3>3. Conditions de distribution</h3><p>{{criteres_distribution}}</p><h3>4. Calendrier</h3><p>Le dividende est proposé par le Conseil d'Administration et soumis à l'approbation de l'Assemblée Générale Ordinaire annuelle.</p></div>`
  },
  {
    code: 'gov2_plan_continuite_gouvernance', name: "Plan de Continuité de Gouvernance", category: 'juridique_admin', price: 14000, priceMax: 40000,
    description: "Plan garantissant la continuité des fonctions de gouvernance en cas de crise ou d'événement majeur affectant les organes dirigeants.", templateType: 'pdf', classe: 'A', active: true, popularity: 67,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true},
      {key:'scenarios_crise',label:"Scénarios de crise identifiés",type:'textarea',required:true},
      {key:'mesures_continuite',label:"Mesures de continuité prévues",type:'textarea',required:true},
      {key:'responsable_activation',label:"Responsable de l'activation du plan",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE CONTINUITÉ DE GOUVERNANCE</h1><h2>{{raison_sociale}}</h2><p>Adopté le {{date_adoption}} — Responsable d'activation : {{responsable_activation}}.</p><h3>1. Objectifs</h3><p>Ce plan vise à assurer la continuité des décisions de gouvernance dans toute circonstance exceptionnelle affectant les organes dirigeants.</p><h3>2. Scénarios identifiés</h3><p>{{scenarios_crise}}</p><h3>3. Mesures de continuité</h3><p>{{mesures_continuite}}</p><h3>4. Tests et révision</h3><p>Le plan est testé annuellement et révisé après chaque événement majeur ou changement significatif dans la structure de gouvernance.</p></div>`
  },
  {
    code: 'aud2_charte_audit_interne', name: "Charte de l'Audit Interne", category: 'commercial_financier', price: 14000, priceMax: 42000,
    description: "Charte définissant la mission, les pouvoirs, les responsabilités et le positionnement de la fonction d'audit interne.", templateType: 'pdf', classe: 'A', active: true, popularity: 88,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true},
      {key:'responsable_audit',label:"Responsable de l'audit interne",type:'text',required:true},
      {key:'perimetre_intervention',label:"Périmètre d'intervention",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE L'AUDIT INTERNE</h1><h2>{{raison_sociale}}</h2><p>Adoptée le {{date_adoption}} — Directeur de l'Audit Interne : {{responsable_audit}}.</p><h3>Article 1 — Mission</h3><p>L'audit interne est une activité indépendante et objective qui donne à la société une assurance sur le degré de maîtrise de ses opérations et lui apporte ses conseils pour les améliorer.</p><h3>Article 2 — Périmètre</h3><p>{{perimetre_intervention}}</p><h3>Article 3 — Indépendance</h3><p>Le Directeur de l'Audit Interne rapporte fonctionnellement au Comité d'Audit et hiérarchiquement à la Direction Générale.</p><h3>Article 4 — Standards</h3><p>L'audit interne est conduit conformément aux Normes Internationales pour la Pratique Professionnelle de l'Audit Interne (IPPF) de l'IIA.</p></div>`
  },
  {
    code: 'aud2_plan_audit_annuel', name: "Plan d'Audit Annuel Basé sur les Risques", category: 'commercial_financier', price: 13000, priceMax: 38000,
    description: "Plan d'audit annuel élaboré sur la base d'une évaluation des risques, définissant les missions d'audit programmées.", templateType: 'pdf', classe: 'A', active: true, popularity: 86,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'exercice',label:"Exercice couvert",type:'text',required:true},
      {key:'date_approbation',label:"Date d'approbation",type:'date',required:true},
      {key:'missions_programmees',label:"Missions d'audit programmées",type:'textarea',required:true},
      {key:'ressources_allouees',label:"Ressources allouées (effectif, budget)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN D'AUDIT ANNUEL BASÉ SUR LES RISQUES</h1><h2>{{raison_sociale}} — Exercice {{exercice}}</h2><p>Approuvé le {{date_approbation}}.</p><h3>1. Méthodologie</h3><p>Le présent plan est élaboré sur la base d'une cartographie des risques actualisée et d'une analyse des priorités stratégiques de la société.</p><h3>2. Missions programmées</h3><p>{{missions_programmees}}</p><h3>3. Ressources</h3><p>{{ressources_allouees}}</p><h3>4. Suivi</h3><p>L'avancement du plan est présenté trimestriellement au Comité d'Audit. Des ajustements peuvent être effectués en cours d'exercice pour tenir compte des risques émergents.</p></div>`
  },
  {
    code: 'aud2_programme_travail_audit', name: "Programme de Travail d'Audit", category: 'commercial_financier', price: 9000, priceMax: 25000,
    description: "Programme de travail détaillé d'une mission d'audit interne précisant les diligences à effectuer et les tests à réaliser.", templateType: 'pdf', classe: 'A', active: true, popularity: 80,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'intitule_mission',label:"Intitulé de la mission d'audit",type:'text',required:true},
      {key:'date_debut',label:"Date de début de la mission",type:'date',required:true},
      {key:'objectifs_audit',label:"Objectifs de la mission",type:'textarea',required:true},
      {key:'diligences_prevues',label:"Diligences et tests prévus",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>PROGRAMME DE TRAVAIL D'AUDIT</h1><h2>{{raison_sociale}} — Mission : {{intitule_mission}}</h2><p>Mission démarrée le {{date_debut}}.</p><h3>1. Objectifs</h3><p>{{objectifs_audit}}</p><h3>2. Périmètre et diligences</h3><p>{{diligences_prevues}}</p><h3>3. Critères d'évaluation</h3><p>Les constats seront évalués selon une échelle de criticité à quatre niveaux : critique, élevé, modéré, faible.</p><h3>4. Documentation</h3><p>Tous les éléments probants collectés sont conservés dans le dossier de travail de la mission.</p></div>`
  },
  {
    code: 'aud2_rapport_audit_interne_complet', name: "Rapport d'Audit Interne Complet", category: 'commercial_financier', price: 16000, priceMax: 48000,
    description: "Rapport complet d'une mission d'audit interne présentant les constats, risques, recommandations et plans d'action.", templateType: 'pdf', classe: 'A', active: true, popularity: 90,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'intitule_mission',label:"Intitulé de la mission",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true},
      {key:'synthese_constats',label:"Synthèse des constats",type:'textarea',required:true},
      {key:'recommandations',label:"Recommandations et plans d'action",type:'textarea',required:true},
      {key:'avis_global',label:"Avis global de l'auditeur",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT D'AUDIT INTERNE</h1><h2>{{raison_sociale}} — {{intitule_mission}}</h2><p>Rapport établi le {{date_rapport}}.</p><h3>1. Synthèse exécutive</h3><p>{{avis_global}}</p><h3>2. Constats détaillés</h3><p>{{synthese_constats}}</p><h3>3. Recommandations et plan d'action</h3><p>{{recommandations}}</p><h3>4. Conclusion</h3><p>Le présent rapport a été établi conformément à la Charte de l'Audit Interne et aux normes professionnelles en vigueur. Il sera transmis au Comité d'Audit lors de sa prochaine réunion.</p></div>`
  },
  {
    code: 'aud2_rapport_audit_flash', name: "Rapport d'Audit Flash", category: 'commercial_financier', price: 8000, priceMax: 22000,
    description: "Rapport d'audit flash synthétique pour communication rapide des résultats d'une mission courte ou ciblée.", templateType: 'pdf', classe: 'A', active: true, popularity: 82,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'sujet_audit',label:"Sujet de l'audit flash",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true},
      {key:'principales_observations',label:"Principales observations",type:'textarea',required:true},
      {key:'actions_immediates',label:"Actions immédiates requises",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT D'AUDIT FLASH</h1><h2>{{raison_sociale}} — {{sujet_audit}}</h2><p>Établi le {{date_rapport}}.</p><h3>Observations clés</h3><p>{{principales_observations}}</p><h3>Actions immédiates requises</h3><p>{{actions_immediates}}</p><p><em>Ce rapport flash ne remplace pas un rapport d'audit complet. Un rapport définitif sera établi si nécessaire après approfondissement des investigations.</em></p></div>`
  },
  {
    code: 'aud2_memo_constatations_preliminaires', name: "Mémo de Constatations Préliminaires", category: 'commercial_financier', price: 7000, priceMax: 18000,
    description: "Mémo de communication des constatations préliminaires à l'audité avant l'émission du rapport définitif.", templateType: 'pdf', classe: 'A', active: true, popularity: 75,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'entite_auditee',label:"Entité ou processus audité",type:'text',required:true},
      {key:'date_memo',label:"Date du mémo",type:'date',required:true},
      {key:'constatations',label:"Constatations préliminaires",type:'textarea',required:true},
      {key:'delai_reponse',label:"Délai de réponse demandé",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>MÉMO DE CONSTATATIONS PRÉLIMINAIRES</h1><h2>{{raison_sociale}} — Audit de {{entite_auditee}}</h2><p>Mémo daté du {{date_memo}}.</p><h3>Objet</h3><p>Le présent mémo a pour objet de vous communiquer les constatations préliminaires issues de la mission d'audit en cours afin de recueillir vos observations et plans d'action.</p><h3>Constatations préliminaires</h3><p>{{constatations}}</p><h3>Actions attendues</h3><p>Merci de bien vouloir nous faire parvenir vos commentaires et plans d'action dans un délai de {{delai_reponse}} à compter de la date du présent mémo.</p></div>`
  },
  {
    code: 'aud2_rapport_suivi_recommandations', name: "Rapport de Suivi des Recommandations", category: 'commercial_financier', price: 10000, priceMax: 28000,
    description: "Rapport de suivi de la mise en oeuvre des recommandations d'audit interne présentant l'état d'avancement des plans d'action.", templateType: 'pdf', classe: 'A', active: true, popularity: 84,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'periode_suivi',label:"Période de suivi",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true},
      {key:'recommandations_cloturees',label:"Recommandations clôturées",type:'textarea',required:true},
      {key:'recommandations_en_cours',label:"Recommandations en cours de mise en oeuvre",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE SUIVI DES RECOMMANDATIONS</h1><h2>{{raison_sociale}} — Période : {{periode_suivi}}</h2><p>Établi le {{date_rapport}}.</p><h3>Tableau de bord</h3><p>Le présent rapport présente l'état d'avancement des recommandations émises par l'audit interne au cours des exercices précédents.</p><h3>Recommandations clôturées</h3><p>{{recommandations_cloturees}}</p><h3>Recommandations en cours</h3><p>{{recommandations_en_cours}}</p><h3>Conclusion</h3><p>Ce rapport sera présenté au Comité d'Audit lors de sa prochaine séance.</p></div>`
  },
  {
    code: 'aud2_tableau_bord_audit_interne', name: "Tableau de Bord de l'Audit Interne", category: 'commercial_financier', price: 11000, priceMax: 32000,
    description: "Tableau de bord trimestriel de la direction de l'audit interne présentant les indicateurs clés de performance et l'avancement du plan d'audit.", templateType: 'pdf', classe: 'A', active: true, popularity: 79,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'trimestre',label:"Trimestre concerné",type:'text',required:true},
      {key:'date_tableau',label:"Date d'arrêté",type:'date',required:true},
      {key:'indicateurs_cles',label:"Indicateurs clés de performance",type:'textarea',required:true},
      {key:'avancement_plan',label:"Avancement du plan d'audit",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>TABLEAU DE BORD DE L'AUDIT INTERNE</h1><h2>{{raison_sociale}} — {{trimestre}}</h2><p>Arrêté au {{date_tableau}}.</p><h3>Indicateurs clés de performance</h3><p>{{indicateurs_cles}}</p><h3>Avancement du plan d'audit</h3><p>{{avancement_plan}}</p><h3>Points d'attention</h3><p>Les points nécessitant une attention particulière du Comité d'Audit sont signalés en rouge dans le présent tableau de bord.</p></div>`
  },
  {
    code: 'aud2_rapport_autoevaluation_audit', name: "Rapport d'Auto-Évaluation de l'Audit Interne", category: 'commercial_financier', price: 12000, priceMax: 35000,
    description: "Rapport d'auto-évaluation de la conformité de la fonction d'audit interne aux normes professionnelles internationales.", templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'date_evaluation',label:"Date de l'auto-évaluation",type:'date',required:true},
      {key:'referentiel',label:"Référentiel utilisé",type:'text',required:true},
      {key:'points_conformes',label:"Points de conformité avérés",type:'textarea',required:true},
      {key:'axes_amelioration',label:"Axes d'amélioration identifiés",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT D'AUTO-ÉVALUATION DE L'AUDIT INTERNE</h1><h2>{{raison_sociale}}</h2><p>Auto-évaluation conduite le {{date_evaluation}} sur la base du référentiel {{referentiel}}.</p><h3>1. Points de conformité</h3><p>{{points_conformes}}</p><h3>2. Axes d'amélioration</h3><p>{{axes_amelioration}}</p><h3>3. Plan d'amélioration</h3><p>Un plan d'amélioration de la fonction d'audit sera soumis au Comité d'Audit pour validation et suivi.</p></div>`
  },
  {
    code: 'aud2_questionnaire_controle_interne', name: "Questionnaire de Contrôle Interne (QCI)", category: 'commercial_financier', price: 9000, priceMax: 26000,
    description: "Questionnaire structuré d'évaluation du dispositif de contrôle interne par processus ou entité.", templateType: 'pdf', classe: 'A', active: true, popularity: 83,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'processus_evalue',label:"Processus ou entité évalué",type:'text',required:true},
      {key:'date_evaluation',label:"Date d'évaluation",type:'date',required:true},
      {key:'evaluateur',label:"Évaluateur",type:'text',required:true},
      {key:'observations_globales',label:"Observations globales",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>QUESTIONNAIRE DE CONTRÔLE INTERNE (QCI)</h1><h2>{{raison_sociale}} — Processus : {{processus_evalue}}</h2><p>Évaluation conduite le {{date_evaluation}} par {{evaluateur}}.</p><h3>1. Environnement de contrôle</h3><p>Les questions portent sur l'existence, la formalisation et l'efficacité des contrôles en place au sein du processus évalué.</p><h3>2. Activités de contrôle</h3><p>Chaque contrôle clé est évalué selon sa conception (adéquat/inadéquat) et son efficacité opérationnelle (efficace/inefficace).</p><h3>3. Observations</h3><p>{{observations_globales}}</p><h3>4. Cotation globale</h3><p>Le niveau de maîtrise du processus est évalué sur la base des réponses au questionnaire et des constats de terrain.</p></div>`
  },
  {
    code: 'aud2_matrice_risques_controles', name: "Matrice des Risques et Contrôles", category: 'commercial_financier', price: 12000, priceMax: 36000,
    description: "Matrice documentant les risques identifiés par processus et les contrôles associés avec leur évaluation.", templateType: 'pdf', classe: 'A', active: true, popularity: 85,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'processus',label:"Processus couvert",type:'text',required:true},
      {key:'date_mise_a_jour',label:"Date de mise à jour",type:'date',required:true},
      {key:'risques_et_controles',label:"Risques identifiés et contrôles associés",type:'textarea',required:true},
      {key:'niveau_risque_residuel',label:"Niveau de risque résiduel global",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>MATRICE DES RISQUES ET CONTRÔLES</h1><h2>{{raison_sociale}} — Processus : {{processus}}</h2><p>Mise à jour le {{date_mise_a_jour}}.</p><h3>Structure de la matrice</h3><p>La matrice recense pour chaque risque identifié : la description du risque, sa probabilité, son impact, les contrôles existants, leur efficacité et le risque résiduel.</p><h3>Risques et contrôles</h3><p>{{risques_et_controles}}</p><h3>Conclusion</h3><p>Le niveau de risque résiduel global pour ce processus est évalué comme : {{niveau_risque_residuel}}.</p></div>`
  },
  {
    code: 'aud2_cartographie_risques', name: "Cartographie des Risques", category: 'commercial_financier', price: 15000, priceMax: 45000,
    description: "Cartographie globale des risques de l'entreprise présentant l'ensemble des risques classés par probabilité et impact.", templateType: 'pdf', classe: 'A', active: true, popularity: 88,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'date_cartographie',label:"Date de la cartographie",type:'date',required:true},
      {key:'univers_risques',label:"Univers des risques couverts",type:'textarea',required:true},
      {key:'risques_majeurs',label:"Risques majeurs identifiés (top 5)",type:'textarea',required:true},
      {key:'responsable_risk',label:"Responsable de la gestion des risques",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CARTOGRAPHIE DES RISQUES</h1><h2>{{raison_sociale}}</h2><p>Établie le {{date_cartographie}} sous la responsabilité de {{responsable_risk}}.</p><h3>1. Univers des risques</h3><p>{{univers_risques}}</p><h3>2. Risques majeurs</h3><p>{{risques_majeurs}}</p><h3>3. Méthodologie</h3><p>Chaque risque est positionné sur une matrice à deux axes : probabilité d'occurrence (de 1 à 5) et impact potentiel (de 1 à 5). Le niveau de risque brut est le produit des deux scores.</p><h3>4. Mise à jour</h3><p>La cartographie des risques est actualisée annuellement et présentée au Comité des Risques.</p></div>`
  },
  {
    code: 'aud2_rapport_evaluation_risques', name: "Rapport d'Évaluation des Risques", category: 'commercial_financier', price: 13000, priceMax: 38000,
    description: "Rapport d'évaluation approfondie des risques d'une entité ou d'un processus spécifique.", templateType: 'pdf', classe: 'A', active: true, popularity: 81,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'entite_evaluee',label:"Entité ou processus évalué",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true},
      {key:'risques_identifies',label:"Risques identifiés et évalués",type:'textarea',required:true},
      {key:'conclusions',label:"Conclusions et recommandations",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT D'ÉVALUATION DES RISQUES</h1><h2>{{raison_sociale}} — {{entite_evaluee}}</h2><p>Établi le {{date_rapport}}.</p><h3>1. Méthodologie</h3><p>L'évaluation des risques a été conduite selon une approche combinant des entretiens avec les responsables opérationnels, l'analyse documentaire et des tests de contrôle.</p><h3>2. Risques identifiés</h3><p>{{risques_identifies}}</p><h3>3. Conclusions et recommandations</h3><p>{{conclusions}}</p></div>`
  },
  {
    code: 'aud2_plan_traitement_risques', name: "Plan de Traitement des Risques", category: 'commercial_financier', price: 12000, priceMax: 35000,
    description: "Plan définissant les stratégies et actions de traitement des risques identifiés dans la cartographie.", templateType: 'pdf', classe: 'A', active: true, popularity: 78,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'exercice',label:"Exercice concerné",type:'text',required:true},
      {key:'date_validation',label:"Date de validation",type:'date',required:true},
      {key:'risques_a_traiter',label:"Risques prioritaires à traiter",type:'textarea',required:true},
      {key:'strategies_traitement',label:"Stratégies de traitement retenues",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE TRAITEMENT DES RISQUES</h1><h2>{{raison_sociale}} — Exercice {{exercice}}</h2><p>Validé le {{date_validation}}.</p><h3>1. Risques prioritaires</h3><p>{{risques_a_traiter}}</p><h3>2. Stratégies de traitement</h3><p>Pour chaque risque, la stratégie retenue est l'une des suivantes : éviter, réduire, transférer ou accepter. {{strategies_traitement}}</p><h3>3. Suivi</h3><p>L'avancement du plan de traitement est suivi trimestriellement par le Comité des Risques.</p></div>`
  },
  {
    code: 'aud2_rapport_controle_gestion_mensuel', name: "Rapport de Contrôle de Gestion Mensuel", category: 'commercial_financier', price: 10000, priceMax: 30000,
    description: "Rapport mensuel de contrôle de gestion présentant les résultats réels par rapport aux budgets et objectifs.", templateType: 'pdf', classe: 'A', active: true, popularity: 90,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'mois_rapport',label:"Mois du rapport",type:'text',required:true},
      {key:'date_rapport',label:"Date d'arrêté",type:'date',required:true},
      {key:'chiffre_affaires_reel',label:"Chiffre d'affaires réel vs budget",type:'text',required:true},
      {key:'commentaires_ecarts',label:"Commentaires sur les principaux écarts",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE CONTRÔLE DE GESTION MENSUEL</h1><h2>{{raison_sociale}} — {{mois_rapport}}</h2><p>Arrêté au {{date_rapport}}.</p><h3>1. Résultats commerciaux</h3><p>Chiffre d'affaires : {{chiffre_affaires_reel}}</p><h3>2. Analyse des écarts</h3><p>{{commentaires_ecarts}}</p><h3>3. Actions correctives</h3><p>Des actions correctives ont été identifiées pour les écarts significatifs et sont suivies par la Direction Générale.</p><h3>4. Perspectives</h3><p>Les prévisions de fin d'exercice seront mises à jour lors du prochain arrêté mensuel.</p></div>`
  },
  {
    code: 'aud2_rapport_controle_budgetaire', name: "Rapport de Contrôle Budgétaire", category: 'commercial_financier', price: 11000, priceMax: 32000,
    description: "Rapport trimestriel de contrôle budgétaire analysant les écarts entre le budget et les réalisations.", templateType: 'pdf', classe: 'A', active: true, popularity: 86,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'trimestre',label:"Trimestre concerné",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true},
      {key:'budget_global',label:"Budget global de la période",type:'text',required:true},
      {key:'realise',label:"Réalisé de la période",type:'text',required:true},
      {key:'analyse_ecarts',label:"Analyse des écarts significatifs",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE CONTRÔLE BUDGÉTAIRE</h1><h2>{{raison_sociale}} — {{trimestre}}</h2><p>Établi le {{date_rapport}}.</p><h3>Synthèse budgétaire</h3><p>Budget : {{budget_global}} FCFA | Réalisé : {{realise}} FCFA</p><h3>Analyse des écarts</h3><p>{{analyse_ecarts}}</p><h3>Recommandations</h3><p>Des recommandations sont formulées pour améliorer la précision des prévisions budgétaires lors des prochains exercices.</p></div>`
  },
  {
    code: 'aud2_rapport_suivi_tresorerie', name: "Rapport de Suivi de la Trésorerie", category: 'commercial_financier', price: 9000, priceMax: 27000,
    description: "Rapport hebdomadaire ou mensuel de suivi de la position de trésorerie et des flux financiers.", templateType: 'pdf', classe: 'A', active: true, popularity: 88,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'periode',label:"Période de suivi",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true},
      {key:'position_tresorerie',label:"Position de trésorerie nette",type:'text',required:true},
      {key:'previsions_flux',label:"Prévisions de flux à 30 jours",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE SUIVI DE LA TRÉSORERIE</h1><h2>{{raison_sociale}} — {{periode}}</h2><p>Établi le {{date_rapport}}.</p><h3>Position de trésorerie</h3><p>Position nette de trésorerie : {{position_tresorerie}} FCFA</p><h3>Prévisions de flux</h3><p>{{previsions_flux}}</p><h3>Points d'attention</h3><p>Toute situation de tension de trésorerie fait l'objet d'une alerte immédiate à la Direction Financière et Générale.</p></div>`
  },
  {
    code: 'aud2_procedure_signalement_whistleblowing', name: "Procédure de Signalement (Whistleblowing)", category: 'commercial_financier', price: 13000, priceMax: 38000,
    description: "Procédure de signalement interne des infractions éthiques et comportements contraires aux valeurs de l'entreprise.", templateType: 'pdf', classe: 'A', active: true, popularity: 83,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true},
      {key:'canaux_signalement',label:"Canaux de signalement disponibles",type:'textarea',required:true},
      {key:'protection_lanceurs_alerte',label:"Mesures de protection des lanceurs d'alerte",type:'textarea',required:true},
      {key:'responsable_traitement',label:"Responsable du traitement des alertes",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>PROCÉDURE DE SIGNALEMENT (WHISTLEBLOWING)</h1><h2>{{raison_sociale}}</h2><p>Adoptée le {{date_adoption}} — Responsable du traitement : {{responsable_traitement}}.</p><h3>1. Objet</h3><p>La présente procédure définit les modalités de signalement des comportements contraires aux lois, règlements et valeurs de la société.</p><h3>2. Canaux de signalement</h3><p>{{canaux_signalement}}</p><h3>3. Protection des lanceurs d'alerte</h3><p>{{protection_lanceurs_alerte}}</p><h3>4. Traitement des alertes</h3><p>Toute alerte reçue fait l'objet d'un accusé de réception dans les 48 heures et d'une investigation diligentée dans les meilleurs délais.</p></div>`
  },
  {
    code: 'aud2_rapport_enquete_interne', name: "Rapport d'Enquête Interne", category: 'commercial_financier', price: 18000, priceMax: 55000,
    description: "Rapport d'enquête interne sur des faits allégués de fraude, corruption ou comportement contraire à l'éthique.", templateType: 'pdf', classe: 'A', active: true, popularity: 85,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'objet_enquete',label:"Objet de l'enquête",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true},
      {key:'faits_constates',label:"Faits constatés",type:'textarea',required:true},
      {key:'conclusions_recommandations',label:"Conclusions et recommandations",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT D'ENQUÊTE INTERNE</h1><p><strong>CONFIDENTIEL</strong></p><h2>{{raison_sociale}} — {{objet_enquete}}</h2><p>Rapport établi le {{date_rapport}}.</p><h3>1. Contexte et mandat</h3><p>La présente enquête a été diligentée suite à un signalement reçu conformément à la procédure de signalement en vigueur.</p><h3>2. Faits constatés</h3><p>{{faits_constates}}</p><h3>3. Conclusions et recommandations</h3><p>{{conclusions_recommandations}}</p><h3>4. Confidentialité</h3><p>Le présent rapport est strictement confidentiel et ne peut être communiqué qu'aux personnes autorisées par la Direction Générale ou le Comité d'Audit.</p></div>`
  },
  {
    code: 'aud2_rapport_fraud_risk_assessment', name: "Rapport de Fraud Risk Assessment", category: 'commercial_financier', price: 16000, priceMax: 48000,
    description: "Rapport d'évaluation des risques de fraude identifiant les zones de vulnérabilité et les contrôles anti-fraude.", templateType: 'pdf', classe: 'A', active: true, popularity: 82,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'date_evaluation',label:"Date de l'évaluation",type:'date',required:true},
      {key:'zones_vulnerabilite',label:"Zones de vulnérabilité identifiées",type:'textarea',required:true},
      {key:'schemas_fraude',label:"Schémas de fraude potentiels",type:'textarea',required:true},
      {key:'controles_antifraudee',label:"Contrôles anti-fraude existants et recommandés",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE FRAUD RISK ASSESSMENT</h1><h2>{{raison_sociale}}</h2><p>Évaluation conduite le {{date_evaluation}}.</p><h3>1. Zones de vulnérabilité</h3><p>{{zones_vulnerabilite}}</p><h3>2. Schémas de fraude potentiels</h3><p>{{schemas_fraude}}</p><h3>3. Contrôles anti-fraude</h3><p>{{controles_antifraudee}}</p><h3>4. Plan d'action</h3><p>Un plan de renforcement du dispositif anti-fraude sera élaboré sur la base des recommandations du présent rapport.</p></div>`
  },
  {
    code: 'aud2_plan_prevention_fraude', name: "Plan de Prévention de la Fraude", category: 'commercial_financier', price: 14000, priceMax: 42000,
    description: "Plan structuré de prévention et de détection de la fraude incluant les mesures organisationnelles et techniques.", templateType: 'pdf', classe: 'A', active: true, popularity: 80,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true},
      {key:'mesures_prevention',label:"Mesures de prévention",type:'textarea',required:true},
      {key:'mesures_detection',label:"Mesures de détection",type:'textarea',required:true},
      {key:'mesures_reaction',label:"Procédures de réaction en cas de fraude avérée",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE PRÉVENTION DE LA FRAUDE</h1><h2>{{raison_sociale}}</h2><p>Adopté le {{date_adoption}}.</p><h3>1. Mesures de prévention</h3><p>{{mesures_prevention}}</p><h3>2. Mesures de détection</h3><p>{{mesures_detection}}</p><h3>3. Procédures de réaction</h3><p>{{mesures_reaction}}</p><h3>4. Sensibilisation</h3><p>Des sessions de sensibilisation à la fraude sont organisées annuellement pour l'ensemble du personnel.</p></div>`
  },
  {
    code: 'aud2_rapport_forensic_accounting', name: "Rapport de Forensic Accounting", category: 'commercial_financier', price: 20000, priceMax: 60000,
    description: "Rapport d'expertise comptable judiciaire pour la reconstitution de faits financiers en contexte de litige ou de fraude.", templateType: 'pdf', classe: 'A', active: true, popularity: 76,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true},
      {key:'mission',label:"Description de la mission confiée",type:'textarea',required:true},
      {key:'methodes_investigatives',label:"Méthodes investigatives utilisées",type:'textarea',required:true},
      {key:'conclusions_chiffrees',label:"Conclusions chiffrées",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE FORENSIC ACCOUNTING</h1><p><strong>STRICTEMENT CONFIDENTIEL</strong></p><h2>{{raison_sociale}}</h2><p>Rapport établi le {{date_rapport}}.</p><h3>1. Mission</h3><p>{{mission}}</p><h3>2. Méthodologie</h3><p>{{methodes_investigatives}}</p><h3>3. Conclusions</h3><p>{{conclusions_chiffrees}}</p><h3>4. Réserves et limites</h3><p>Le présent rapport est fondé sur les documents et informations mis à notre disposition. Toute limitation dans l'accès aux données est susceptible d'affecter nos conclusions.</p></div>`
  },
  {
    code: 'aud2_rapport_audit_it', name: "Rapport d'Audit IT (Système d'Information)", category: 'commercial_financier', price: 17000, priceMax: 50000,
    description: "Rapport d'audit du système d'information évaluant la sécurité, la disponibilité et l'intégrité des données.", templateType: 'pdf', classe: 'A', active: true, popularity: 84,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'perimetre_si',label:"Périmètre du système d'information audité",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true},
      {key:'constats_securite',label:"Constats en matière de sécurité",type:'textarea',required:true},
      {key:'recommandations_si',label:"Recommandations pour le système d'information",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT D'AUDIT IT — SYSTÈME D'INFORMATION</h1><h2>{{raison_sociale}} — Périmètre : {{perimetre_si}}</h2><p>Rapport établi le {{date_rapport}}.</p><h3>1. Périmètre de l'audit</h3><p>L'audit couvre {{perimetre_si}} et porte sur les dimensions suivantes : gouvernance IT, sécurité des accès, continuité d'activité, gestion des changements et intégrité des données.</p><h3>2. Constats de sécurité</h3><p>{{constats_securite}}</p><h3>3. Recommandations</h3><p>{{recommandations_si}}</p><h3>4. Plan de remédiation</h3><p>Un plan de remédiation priorisé est joint en annexe avec les délais de mise en oeuvre recommandés.</p></div>`
  },
  {
    code: 'aud2_rapport_conformite_reglementaire', name: "Rapport de Conformité Réglementaire", category: 'commercial_financier', price: 15000, priceMax: 45000,
    description: "Rapport évaluant la conformité de l'entreprise aux exigences légales et réglementaires applicables dans la zone OHADA/UEMOA.", templateType: 'pdf', classe: 'A', active: true, popularity: 87,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'exercice',label:"Exercice de référence",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true},
      {key:'textes_applicables',label:"Textes légaux et réglementaires applicables",type:'textarea',required:true},
      {key:'ecarts_constates',label:"Écarts de conformité constatés",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE CONFORMITÉ RÉGLEMENTAIRE</h1><h2>{{raison_sociale}} — Exercice {{exercice}}</h2><p>Rapport établi le {{date_rapport}}.</p><h3>1. Cadre réglementaire</h3><p>{{textes_applicables}}</p><h3>2. État de conformité</h3><p>L'évaluation de conformité couvre l'ensemble des obligations légales et réglementaires applicables à la société dans le cadre du droit OHADA, des réglementations sectorielles et des exigences de l'UEMOA.</p><h3>3. Écarts identifiés</h3><p>{{ecarts_constates}}</p><h3>4. Plan de mise en conformité</h3><p>Un plan de mise en conformité assorti d'échéances précises est établi pour chaque écart identifié.</p></div>`
  },
  {
    code: 'aud2_rapport_audit_achats', name: "Rapport d'Audit des Achats", category: 'commercial_financier', price: 14000, priceMax: 42000,
    description: "Rapport d'audit de la fonction achats évaluant les processus de sélection des fournisseurs, de passation des marchés et de contrôle des dépenses.", templateType: 'pdf', classe: 'A', active: true, popularity: 86,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'periode_auditee',label:"Période auditée",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true},
      {key:'constats_achats',label:"Principaux constats sur le processus achats",type:'textarea',required:true},
      {key:'risques_identifies',label:"Risques identifiés",type:'textarea',required:true},
      {key:'recommandations',label:"Recommandations",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT D'AUDIT DES ACHATS</h1><h2>{{raison_sociale}} — Période : {{periode_auditee}}</h2><p>Rapport établi le {{date_rapport}}.</p><h3>1. Périmètre de l'audit</h3><p>L'audit porte sur l'ensemble du processus achats : expression des besoins, sélection des fournisseurs, passation des marchés, réception et paiement.</p><h3>2. Constats</h3><p>{{constats_achats}}</p><h3>3. Risques identifiés</h3><p>{{risques_identifies}}</p><h3>4. Recommandations</h3><p>{{recommandations}}</p><h3>5. Suivi</h3><p>Les recommandations feront l'objet d'un suivi lors des prochains travaux d'audit.</p></div>`
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
  console.log(`Batch 26a OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
