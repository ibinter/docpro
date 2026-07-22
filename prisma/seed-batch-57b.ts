import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ─── CONSEIL EN MANAGEMENT (cons2_) ───────────────────────────────────────
  {
    code: 'cons2_strategie', name: "Contrat de mission de conseil en stratégie", category: 'commercial_financier',
    price: 18000, priceMax: 54000, description: "Contrat formalisant une mission de conseil stratégique pour une entreprise cliente.", templateType: 'pdf', classe: 'A', active: true, popularity: 82,
    fieldsJson: F([
      {key:'client_raison_sociale',label:"Raison sociale du client",type:'text',required:true},
      {key:'consultant_nom',label:"Nom du consultant / cabinet",type:'text',required:true},
      {key:'objet_mission',label:"Objet de la mission",type:'textarea',required:true},
      {key:'duree_mission',label:"Durée de la mission",type:'text',required:true},
      {key:'honoraires_ht',label:"Honoraires HT (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE MISSION DE CONSEIL EN STRATÉGIE</h1>
<p>Entre <strong>{{client_raison_sociale}}</strong> (ci-après « le Client ») et <strong>{{consultant_nom}}</strong> (ci-après « le Consultant »), il est convenu ce qui suit :</p>
<h2>Article 1 – Objet</h2><p>{{objet_mission}}</p>
<h2>Article 2 – Durée</h2><p>La mission débutera le {{date_debut}} pour une durée de {{duree_mission}}.</p>
<h2>Article 3 – Honoraires</h2><p>Les honoraires sont fixés à {{honoraires_ht}} FCFA HT, selon les modalités convenues entre les parties.</p>
<h2>Article 4 – Confidentialité</h2><p>Le Consultant s'engage à garder confidentielles toutes informations obtenues dans le cadre de la mission.</p>
<h2>Article 5 – Droit applicable</h2><p>Le présent contrat est régi par le droit OHADA et les lois en vigueur en Côte d'Ivoire.</p>
<p class="signature-block">Fait à Abidjan, le {{date_debut}}<br/>Le Client : _______________<br/>Le Consultant : _______________</p></div>`
  },
  {
    code: 'cons2_organisation', name: "Accord de service de conseil en organisation", category: 'commercial_financier',
    price: 14000, priceMax: 42000, description: "Accord encadrant une mission de conseil en réorganisation structurelle d'entreprise.", templateType: 'pdf', classe: 'A', active: true, popularity: 74,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'cabinet_conseil',label:"Cabinet de conseil",type:'text',required:true},
      {key:'perimetre_organisation',label:"Périmètre organisationnel concerné",type:'textarea',required:true},
      {key:'livrables',label:"Livrables attendus",type:'textarea',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CONSEIL EN ORGANISATION</h1>
<p>Entre <strong>{{client_nom}}</strong> et <strong>{{cabinet_conseil}}</strong>, il est convenu ce qui suit :</p>
<h2>Article 1 – Périmètre</h2><p>{{perimetre_organisation}}</p>
<h2>Article 2 – Livrables</h2><p>{{livrables}}</p>
<h2>Article 3 – Obligations des parties</h2><p>Le Cabinet s'engage à mobiliser les ressources nécessaires à la réalisation de la mission dans les délais convenus.</p>
<h2>Article 4 – Propriété des livrables</h2><p>Les livrables produits sont la propriété exclusive du Client à l'issue du paiement intégral des honoraires.</p>
<p class="signature-block">Fait à Abidjan, le {{date_signature}}<br/>Le Client : _______________<br/>Le Cabinet : _______________</p></div>`
  },
  {
    code: 'cons2_digital', name: "Accord de service de conseil en transformation digitale", category: 'commercial_financier',
    price: 20000, priceMax: 60000, description: "Accord de mission pour accompagner la transformation numérique d'une organisation.", templateType: 'pdf', classe: 'A', active: true, popularity: 88,
    fieldsJson: F([
      {key:'entreprise_cliente',label:"Entreprise cliente",type:'text',required:true},
      {key:'prestataire',label:"Prestataire digital",type:'text',required:true},
      {key:'axes_transformation',label:"Axes de transformation digitale",type:'textarea',required:true},
      {key:'budget_global',label:"Budget global (FCFA)",type:'text',required:true},
      {key:'date_lancement',label:"Date de lancement",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CONSEIL EN TRANSFORMATION DIGITALE</h1>
<p>Entre <strong>{{entreprise_cliente}}</strong> et <strong>{{prestataire}}</strong>, il est convenu ce qui suit :</p>
<h2>Article 1 – Axes de transformation</h2><p>{{axes_transformation}}</p>
<h2>Article 2 – Budget</h2><p>Le budget global alloué est de {{budget_global}} FCFA, hors taxes.</p>
<h2>Article 3 – Gouvernance</h2><p>Un comité de pilotage sera mis en place avec des réunions mensuelles de suivi d'avancement.</p>
<h2>Article 4 – Sécurité des données</h2><p>Le Prestataire s'engage à respecter les normes de sécurité applicables aux données traitées dans le cadre de la mission.</p>
<p class="signature-block">Fait à Abidjan, le {{date_lancement}}<br/>Le Client : _______________<br/>Le Prestataire : _______________</p></div>`
  },
  {
    code: 'cons2_ma', name: "Accord de service de conseil en fusions-acquisitions (M&A)", category: 'commercial_financier',
    price: 25000, priceMax: 75000, description: "Accord de mission de conseil en opérations de fusions, acquisitions ou cessions d'entreprises.", templateType: 'pdf', classe: 'A', active: true, popularity: 76,
    fieldsJson: F([
      {key:'mandant',label:"Mandant (acquéreur ou cédant)",type:'text',required:true},
      {key:'conseil_ma',label:"Conseil M&A",type:'text',required:true},
      {key:'description_operation',label:"Description de l'opération envisagée",type:'textarea',required:true},
      {key:'honoraires_succes',label:"Honoraires de succès (%)",type:'text',required:true},
      {key:'date_mandat',label:"Date du mandat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CONSEIL EN FUSIONS-ACQUISITIONS (M&A)</h1>
<p>Entre <strong>{{mandant}}</strong> (ci-après « le Mandant ») et <strong>{{conseil_ma}}</strong> (ci-après « le Conseil »), il est convenu ce qui suit :</p>
<h2>Article 1 – Description de l'opération</h2><p>{{description_operation}}</p>
<h2>Article 2 – Mission du Conseil</h2><p>Le Conseil est chargé d'identifier les cibles ou acquéreurs potentiels, de conduire les négociations et d'accompagner la clôture de la transaction.</p>
<h2>Article 3 – Rémunération</h2><p>Le Conseil percevra des honoraires de succès correspondant à {{honoraires_succes}} % de la valeur de transaction, payables à la closing.</p>
<h2>Article 4 – Exclusivité</h2><p>Le Mandant confère au Conseil un mandat exclusif pour une durée de 12 mois à compter du {{date_mandat}}.</p>
<p class="signature-block">Fait à Abidjan, le {{date_mandat}}<br/>Le Mandant : _______________<br/>Le Conseil : _______________</p></div>`
  },
  {
    code: 'cons2_dd_financiere', name: "Accord de service de due diligence financière", category: 'commercial_financier',
    price: 22000, priceMax: 66000, description: "Accord encadrant une mission d'audit de due diligence financière préalable à une opération de croissance externe.", templateType: 'pdf', classe: 'A', active: true, popularity: 71,
    fieldsJson: F([
      {key:'client_investisseur',label:"Client / Investisseur",type:'text',required:true},
      {key:'cabinet_audit',label:"Cabinet d'audit",type:'text',required:true},
      {key:'cible',label:"Société cible",type:'text',required:true},
      {key:'periode_analysee',label:"Période financière analysée",type:'text',required:true},
      {key:'date_remise_rapport',label:"Date de remise du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DUE DILIGENCE FINANCIÈRE</h1>
<p>Entre <strong>{{client_investisseur}}</strong> et <strong>{{cabinet_audit}}</strong>, il est convenu ce qui suit :</p>
<h2>Article 1 – Objet</h2><p>Le Cabinet est mandaté pour réaliser une due diligence financière sur <strong>{{cible}}</strong> portant sur la période {{periode_analysee}}.</p>
<h2>Article 2 – Périmètre des travaux</h2><p>Les travaux couvriront l'analyse des états financiers, la qualité des actifs et passifs, la normalisation du résultat et l'identification des risques financiers.</p>
<h2>Article 3 – Rapport</h2><p>Le rapport de due diligence sera remis au plus tard le {{date_remise_rapport}}.</p>
<h2>Article 4 – Responsabilité</h2><p>Le Cabinet est responsable de la qualité de ses travaux dans la limite des informations transmises par le Client.</p>
<p class="signature-block">Fait à Abidjan, le {{date_remise_rapport}}<br/>Le Client : _______________<br/>Le Cabinet : _______________</p></div>`
  },
  {
    code: 'cons2_dd_juridique', name: "Accord de service de due diligence juridique", category: 'commercial_financier',
    price: 20000, priceMax: 60000, description: "Accord de mission d'audit juridique préalable à une opération de cession ou d'investissement.", templateType: 'pdf', classe: 'A', active: true, popularity: 69,
    fieldsJson: F([
      {key:'client',label:"Client",type:'text',required:true},
      {key:'cabinet_juridique',label:"Cabinet juridique",type:'text',required:true},
      {key:'societe_cible',label:"Société cible",type:'text',required:true},
      {key:'domaines_audites',label:"Domaines juridiques audités",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début de la mission",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DUE DILIGENCE JURIDIQUE</h1>
<p>Entre <strong>{{client}}</strong> et <strong>{{cabinet_juridique}}</strong>, il est convenu ce qui suit :</p>
<h2>Article 1 – Objet</h2><p>Le Cabinet est mandaté pour réaliser un audit juridique de <strong>{{societe_cible}}</strong>.</p>
<h2>Article 2 – Domaines audités</h2><p>{{domaines_audites}}</p>
<h2>Article 3 – Méthodologie</h2><p>L'audit se basera sur la revue des documents juridiques, contrats, litiges en cours et obligations réglementaires de la cible.</p>
<h2>Article 4 – Confidentialité</h2><p>Toutes les informations obtenues sont strictement confidentielles et ne peuvent être divulguées à des tiers.</p>
<p class="signature-block">Fait à Abidjan, le {{date_debut}}<br/>Le Client : _______________<br/>Le Cabinet : _______________</p></div>`
  },
  {
    code: 'cons2_dd_operationnelle', name: "Accord de service de due diligence opérationnelle", category: 'commercial_financier',
    price: 18000, priceMax: 54000, description: "Accord de mission d'audit des processus et de l'organisation opérationnelle d'une société cible.", templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'client',label:"Client",type:'text',required:true},
      {key:'cabinet',label:"Cabinet d'expertise",type:'text',required:true},
      {key:'cible',label:"Entité auditée",type:'text',required:true},
      {key:'axes_operationnels',label:"Axes opérationnels évalués",type:'textarea',required:true},
      {key:'date_mission',label:"Date de la mission",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DUE DILIGENCE OPÉRATIONNELLE</h1>
<p>Entre <strong>{{client}}</strong> et <strong>{{cabinet}}</strong>, il est convenu ce qui suit :</p>
<h2>Article 1 – Objet</h2><p>Le Cabinet est chargé d'évaluer les opérations de <strong>{{cible}}</strong>.</p>
<h2>Article 2 – Axes évalués</h2><p>{{axes_operationnels}}</p>
<h2>Article 3 – Méthode</h2><p>Les travaux incluent des entretiens avec le management, visites de sites, analyse documentaire et benchmarks sectoriels.</p>
<h2>Article 4 – Livrables</h2><p>Un rapport synthétique et une matrice des risques opérationnels seront remis au Client.</p>
<p class="signature-block">Fait à Abidjan, le {{date_mission}}<br/>Le Client : _______________<br/>Le Cabinet : _______________</p></div>`
  },
  {
    code: 'cons2_valorisation', name: "Accord de service de valorisation d'entreprise", category: 'commercial_financier',
    price: 16000, priceMax: 48000, description: "Accord de mission de valorisation d'une entreprise en vue d'une cession, levée de fonds ou restructuration.", templateType: 'pdf', classe: 'A', active: true, popularity: 78,
    fieldsJson: F([
      {key:'commanditaire',label:"Commanditaire",type:'text',required:true},
      {key:'evaluateur',label:"Évaluateur / Cabinet",type:'text',required:true},
      {key:'societe_evaluee',label:"Société évaluée",type:'text',required:true},
      {key:'methodes_retenues',label:"Méthodes de valorisation retenues",type:'textarea',required:true},
      {key:'date_reference',label:"Date de référence de la valorisation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE VALORISATION D'ENTREPRISE</h1>
<p>Entre <strong>{{commanditaire}}</strong> et <strong>{{evaluateur}}</strong>, il est convenu ce qui suit :</p>
<h2>Article 1 – Objet</h2><p>L'Évaluateur est mandaté pour déterminer la valeur de <strong>{{societe_evaluee}}</strong> à la date de référence du {{date_reference}}.</p>
<h2>Article 2 – Méthodes retenues</h2><p>{{methodes_retenues}}</p>
<h2>Article 3 – Rapport de valorisation</h2><p>L'Évaluateur remettra un rapport d'évaluation détaillé présentant les hypothèses, calculs et fourchette de valeur.</p>
<h2>Article 4 – Usage du rapport</h2><p>Le rapport est établi pour l'usage exclusif du Commanditaire et ne peut être communiqué à des tiers sans accord écrit préalable.</p>
<p class="signature-block">Fait à Abidjan, le {{date_reference}}<br/>Le Commanditaire : _______________<br/>L'Évaluateur : _______________</p></div>`
  },
  {
    code: 'cons2_business_plan', name: "Accord de service de business plan investisseur", category: 'commercial_financier',
    price: 12000, priceMax: 36000, description: "Accord de mission pour l'élaboration d'un business plan destiné à des investisseurs.", templateType: 'pdf', classe: 'A', active: true, popularity: 80,
    fieldsJson: F([
      {key:'porteur_projet',label:"Porteur de projet / Client",type:'text',required:true},
      {key:'cabinet_conseil',label:"Cabinet de conseil",type:'text',required:true},
      {key:'secteur_activite',label:"Secteur d'activité",type:'text',required:true},
      {key:'horizon_previsionnel',label:"Horizon prévisionnel (années)",type:'text',required:true},
      {key:'date_remise',label:"Date de remise du business plan",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE BUSINESS PLAN INVESTISSEUR</h1>
<p>Entre <strong>{{porteur_projet}}</strong> et <strong>{{cabinet_conseil}}</strong>, il est convenu ce qui suit :</p>
<h2>Article 1 – Objet</h2><p>Le Cabinet élaborera un business plan sur {{horizon_previsionnel}} ans pour le projet du secteur <strong>{{secteur_activite}}</strong>.</p>
<h2>Article 2 – Contenu du business plan</h2><p>Le document comprendra : résumé exécutif, analyse de marché, stratégie, plan opérationnel, projections financières et analyse de sensibilité.</p>
<h2>Article 3 – Délai</h2><p>Le business plan sera livré au plus tard le {{date_remise}}.</p>
<h2>Article 4 – Propriété intellectuelle</h2><p>Le business plan est la propriété du Client après paiement intégral des honoraires.</p>
<p class="signature-block">Fait à Abidjan, le {{date_remise}}<br/>Le Client : _______________<br/>Le Cabinet : _______________</p></div>`
  },
  {
    code: 'cons2_etude_marche', name: "Accord de service d'étude de marché sectorielle", category: 'commercial_financier',
    price: 10000, priceMax: 30000, description: "Accord de mission pour la réalisation d'une étude de marché sectorielle approfondie.", templateType: 'pdf', classe: 'A', active: true, popularity: 75,
    fieldsJson: F([
      {key:'client',label:"Client",type:'text',required:true},
      {key:'cabinet',label:"Cabinet d'études",type:'text',required:true},
      {key:'secteur',label:"Secteur étudié",type:'text',required:true},
      {key:'zone_geographique',label:"Zone géographique couverte",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison de l'étude",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ÉTUDE DE MARCHÉ SECTORIELLE</h1>
<p>Entre <strong>{{client}}</strong> et <strong>{{cabinet}}</strong>, il est convenu ce qui suit :</p>
<h2>Article 1 – Objet</h2><p>Le Cabinet réalisera une étude de marché du secteur <strong>{{secteur}}</strong> sur la zone géographique : {{zone_geographique}}.</p>
<h2>Article 2 – Méthodologie</h2><p>L'étude intégrera une analyse documentaire, des enquêtes terrain, des entretiens avec des acteurs clés et une analyse concurrentielle.</p>
<h2>Article 3 – Livrables</h2><p>Un rapport de {{secteur}} sera remis au plus tard le {{date_livraison}} accompagné d'une présentation synthétique.</p>
<h2>Article 4 – Confidentialité</h2><p>Les résultats de l'étude sont confidentiels et destinés au seul usage du Client.</p>
<p class="signature-block">Fait à Abidjan, le {{date_livraison}}<br/>Le Client : _______________<br/>Le Cabinet : _______________</p></div>`
  },
  {
    code: 'cons2_supply_chain', name: "Accord de service de conseil en supply chain", category: 'commercial_financier',
    price: 15000, priceMax: 45000, description: "Accord de mission de conseil et d'optimisation de la chaîne d'approvisionnement.", templateType: 'pdf', classe: 'A', active: true, popularity: 67,
    fieldsJson: F([
      {key:'client',label:"Entreprise cliente",type:'text',required:true},
      {key:'consultant',label:"Consultant / Cabinet",type:'text',required:true},
      {key:'perimetre_supply',label:"Périmètre supply chain concerné",type:'textarea',required:true},
      {key:'objectifs',label:"Objectifs de la mission",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CONSEIL EN SUPPLY CHAIN</h1>
<p>Entre <strong>{{client}}</strong> et <strong>{{consultant}}</strong>, il est convenu ce qui suit :</p>
<h2>Article 1 – Périmètre</h2><p>{{perimetre_supply}}</p>
<h2>Article 2 – Objectifs</h2><p>{{objectifs}}</p>
<h2>Article 3 – Méthodologie</h2><p>Le Consultant procédera à un diagnostic de la chaîne logistique, identifiera les leviers d'optimisation et proposera un plan d'action chiffré.</p>
<h2>Article 4 – Suivi</h2><p>Des réunions d'avancement bimensuelles seront organisées entre le Consultant et le Client.</p>
<p class="signature-block">Fait à Abidjan, le {{date_debut}}<br/>Le Client : _______________<br/>Le Consultant : _______________</p></div>`
  },
  {
    code: 'cons2_marketing', name: "Accord de service de conseil en marketing stratégique", category: 'commercial_financier',
    price: 12000, priceMax: 36000, description: "Accord de mission de conseil pour définir et déployer la stratégie marketing d'une entreprise.", templateType: 'pdf', classe: 'A', active: true, popularity: 79,
    fieldsJson: F([
      {key:'client',label:"Client",type:'text',required:true},
      {key:'agence_conseil',label:"Agence / Cabinet marketing",type:'text',required:true},
      {key:'marques_produits',label:"Marques / Produits concernés",type:'text',required:true},
      {key:'axes_marketing',label:"Axes stratégiques marketing",type:'textarea',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CONSEIL EN MARKETING STRATÉGIQUE</h1>
<p>Entre <strong>{{client}}</strong> et <strong>{{agence_conseil}}</strong>, il est convenu ce qui suit :</p>
<h2>Article 1 – Périmètre</h2><p>La mission porte sur les marques et produits suivants : {{marques_produits}}.</p>
<h2>Article 2 – Axes stratégiques</h2><p>{{axes_marketing}}</p>
<h2>Article 3 – Plan marketing</h2><p>Le Cabinet remettra un plan marketing stratégique sur 12 mois avec indicateurs de performance (KPI) associés.</p>
<h2>Article 4 – Propriété des créations</h2><p>Toutes les créations et stratégies développées appartiennent au Client après paiement intégral.</p>
<p class="signature-block">Fait à Abidjan, le {{date_signature}}<br/>Le Client : _______________<br/>L'Agence : _______________</p></div>`
  },
  {
    code: 'cons2_rh', name: "Accord de service de conseil en ressources humaines", category: 'commercial_financier',
    price: 11000, priceMax: 33000, description: "Accord de mission de conseil RH couvrant la politique de gestion des talents et des compétences.", templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'client',label:"Entreprise cliente",type:'text',required:true},
      {key:'cabinet_rh',label:"Cabinet RH",type:'text',required:true},
      {key:'effectif_concerne',label:"Effectif concerné",type:'text',required:true},
      {key:'domaines_rh',label:"Domaines RH de la mission",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début de la mission",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CONSEIL EN RESSOURCES HUMAINES</h1>
<p>Entre <strong>{{client}}</strong> et <strong>{{cabinet_rh}}</strong>, il est convenu ce qui suit :</p>
<h2>Article 1 – Périmètre</h2><p>La mission concerne un effectif de {{effectif_concerne}} collaborateurs.</p>
<h2>Article 2 – Domaines RH</h2><p>{{domaines_rh}}</p>
<h2>Article 3 – Livrables</h2><p>Le Cabinet remettra un diagnostic RH, une cartographie des compétences et un plan d'action RH.</p>
<h2>Article 4 – Conformité</h2><p>La mission sera conduite dans le respect du Code du travail ivoirien et des conventions collectives applicables.</p>
<p class="signature-block">Fait à Abidjan, le {{date_debut}}<br/>Le Client : _______________<br/>Le Cabinet : _______________</p></div>`
  },
  {
    code: 'cons2_coaching', name: "Accord de service de coaching dirigeant (executive coaching)", category: 'commercial_financier',
    price: 9000, priceMax: 27000, description: "Accord encadrant un programme de coaching individuel pour dirigeant ou cadre supérieur.", templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'coache_nom',label:"Nom du coaché",type:'text',required:true},
      {key:'coach',label:"Coach / Cabinet de coaching",type:'text',required:true},
      {key:'objectifs_coaching',label:"Objectifs du coaching",type:'textarea',required:true},
      {key:'nombre_seances',label:"Nombre de séances prévues",type:'text',required:true},
      {key:'date_debut',label:"Date de début du programme",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE COACHING DIRIGEANT</h1>
<p>Entre <strong>{{coache_nom}}</strong> (ci-après « le Coaché ») et <strong>{{coach}}</strong> (ci-après « le Coach »), il est convenu ce qui suit :</p>
<h2>Article 1 – Objectifs</h2><p>{{objectifs_coaching}}</p>
<h2>Article 2 – Programme</h2><p>Le programme comprend {{nombre_seances}} séances individuelles débutant le {{date_debut}}.</p>
<h2>Article 3 – Confidentialité</h2><p>Le Coach s'engage à une stricte confidentialité sur les échanges et informations partagés lors des séances.</p>
<h2>Article 4 – Évaluation</h2><p>Une évaluation à mi-parcours et une évaluation finale seront réalisées pour mesurer l'atteinte des objectifs.</p>
<p class="signature-block">Fait à Abidjan, le {{date_debut}}<br/>Le Coaché : _______________<br/>Le Coach : _______________</p></div>`
  },
  {
    code: 'cons2_risques', name: "Accord de service de conseil en gestion des risques entreprise", category: 'commercial_financier',
    price: 16000, priceMax: 48000, description: "Accord de mission de conseil pour l'identification, l'évaluation et la mitigation des risques d'entreprise.", templateType: 'pdf', classe: 'A', active: true, popularity: 73,
    fieldsJson: F([
      {key:'client',label:"Entreprise cliente",type:'text',required:true},
      {key:'cabinet_risques',label:"Cabinet de gestion des risques",type:'text',required:true},
      {key:'types_risques',label:"Types de risques couverts",type:'textarea',required:true},
      {key:'duree_mission',label:"Durée de la mission",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CONSEIL EN GESTION DES RISQUES ENTREPRISE</h1>
<p>Entre <strong>{{client}}</strong> et <strong>{{cabinet_risques}}</strong>, il est convenu ce qui suit :</p>
<h2>Article 1 – Périmètre des risques</h2><p>{{types_risques}}</p>
<h2>Article 2 – Durée</h2><p>La mission s'étend sur {{duree_mission}} à compter du {{date_debut}}.</p>
<h2>Article 3 – Livrables</h2><p>Le Cabinet remettra une cartographie des risques, un plan de traitement et un tableau de bord de suivi des risques.</p>
<h2>Article 4 – Mise à jour</h2><p>La cartographie des risques sera actualisée semestriellement.</p>
<p class="signature-block">Fait à Abidjan, le {{date_debut}}<br/>Le Client : _______________<br/>Le Cabinet : _______________</p></div>`
  },
  {
    code: 'cons2_rse', name: "Accord de service de conseil en RSE et développement durable", category: 'commercial_financier',
    price: 13000, priceMax: 39000, description: "Accord de mission de conseil en responsabilité sociale et environnementale (RSE).", templateType: 'pdf', classe: 'A', active: true, popularity: 66,
    fieldsJson: F([
      {key:'client',label:"Entreprise cliente",type:'text',required:true},
      {key:'cabinet_rse',label:"Cabinet RSE",type:'text',required:true},
      {key:'engagements_rse',label:"Engagements RSE ciblés",type:'textarea',required:true},
      {key:'perimetre_reporting',label:"Périmètre de reporting",type:'text',required:true},
      {key:'date_lancement',label:"Date de lancement",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CONSEIL EN RSE ET DÉVELOPPEMENT DURABLE</h1>
<p>Entre <strong>{{client}}</strong> et <strong>{{cabinet_rse}}</strong>, il est convenu ce qui suit :</p>
<h2>Article 1 – Engagements RSE</h2><p>{{engagements_rse}}</p>
<h2>Article 2 – Périmètre</h2><p>{{perimetre_reporting}}</p>
<h2>Article 3 – Livrables</h2><p>Le Cabinet produira un diagnostic RSE, une feuille de route et un rapport annuel de performance RSE conforme aux standards internationaux (GRI, ODD).</p>
<h2>Article 4 – Parties prenantes</h2><p>Le Cabinet animera les consultations avec les parties prenantes clés de l'entreprise.</p>
<p class="signature-block">Fait à Abidjan, le {{date_lancement}}<br/>Le Client : _______________<br/>Le Cabinet : _______________</p></div>`
  },
  {
    code: 'cons2_pi', name: "Accord de service de conseil en propriété intellectuelle", category: 'commercial_financier',
    price: 11000, priceMax: 33000, description: "Accord de mission de conseil en protection et valorisation des droits de propriété intellectuelle.", templateType: 'pdf', classe: 'A', active: true, popularity: 64,
    fieldsJson: F([
      {key:'client',label:"Client",type:'text',required:true},
      {key:'conseil_pi',label:"Conseil en PI / Cabinet",type:'text',required:true},
      {key:'actifs_pi',label:"Actifs de propriété intellectuelle concernés",type:'textarea',required:true},
      {key:'territoires',label:"Territoires de protection visés",type:'text',required:true},
      {key:'date_mission',label:"Date de la mission",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CONSEIL EN PROPRIÉTÉ INTELLECTUELLE</h1>
<p>Entre <strong>{{client}}</strong> et <strong>{{conseil_pi}}</strong>, il est convenu ce qui suit :</p>
<h2>Article 1 – Actifs concernés</h2><p>{{actifs_pi}}</p>
<h2>Article 2 – Territoires</h2><p>La protection sera recherchée sur : {{territoires}}, notamment auprès de l'OAPI (Organisation Africaine de la Propriété Intellectuelle).</p>
<h2>Article 3 – Mission</h2><p>Le Conseil procédera aux recherches d'antériorité, dépôts et suivis de procédures nécessaires à la protection des actifs du Client.</p>
<h2>Article 4 – Honoraires</h2><p>Les honoraires couvrent les prestations intellectuelles hors taxes et frais officiels de dépôt.</p>
<p class="signature-block">Fait à Abidjan, le {{date_mission}}<br/>Le Client : _______________<br/>Le Conseil : _______________</p></div>`
  },
  {
    code: 'cons2_invest_publics', name: "Accord de service de conseil en investissements publics", category: 'commercial_financier',
    price: 20000, priceMax: 60000, description: "Accord de mission de conseil pour l'analyse et la structuration de projets d'investissement public.", templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'entite_publique',label:"Entité publique cliente",type:'text',required:true},
      {key:'cabinet',label:"Cabinet de conseil",type:'text',required:true},
      {key:'projet',label:"Projet d'investissement",type:'textarea',required:true},
      {key:'enveloppe_budget',label:"Enveloppe budgétaire estimée (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début de la mission",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CONSEIL EN INVESTISSEMENTS PUBLICS</h1>
<p>Entre <strong>{{entite_publique}}</strong> et <strong>{{cabinet}}</strong>, il est convenu ce qui suit :</p>
<h2>Article 1 – Projet</h2><p>{{projet}}</p>
<h2>Article 2 – Enveloppe</h2><p>L'enveloppe budgétaire estimée est de {{enveloppe_budget}} FCFA.</p>
<h2>Article 3 – Livrables</h2><p>Le Cabinet remettra une note de cadrage, une analyse coût-bénéfice, une analyse de risques et un plan de financement.</p>
<h2>Article 4 – Conformité</h2><p>La mission sera conduite dans le respect des règles UEMOA relatives aux investissements publics.</p>
<p class="signature-block">Fait à Abidjan, le {{date_debut}}<br/>L'Entité publique : _______________<br/>Le Cabinet : _______________</p></div>`
  },
  {
    code: 'cons2_ppp', name: "Accord de service de conseil en partenariats public-privé", category: 'commercial_financier',
    price: 22000, priceMax: 66000, description: "Accord de mission de conseil pour la structuration et la négociation de partenariats public-privé (PPP).", templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'autorite_concedante',label:"Autorité concédante",type:'text',required:true},
      {key:'cabinet_conseil',label:"Cabinet de conseil PPP",type:'text',required:true},
      {key:'projet_ppp',label:"Projet PPP",type:'textarea',required:true},
      {key:'modele_ppp',label:"Modèle PPP envisagé (BOT, DBFOM, etc.)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CONSEIL EN PARTENARIATS PUBLIC-PRIVÉ</h1>
<p>Entre <strong>{{autorite_concedante}}</strong> et <strong>{{cabinet_conseil}}</strong>, il est convenu ce qui suit :</p>
<h2>Article 1 – Projet</h2><p>{{projet_ppp}}</p>
<h2>Article 2 – Modèle PPP</h2><p>Le modèle envisagé est : {{modele_ppp}}.</p>
<h2>Article 3 – Mission</h2><p>Le Cabinet assistera l'Autorité dans la structuration du projet, la rédaction du dossier d'appel d'offres et les négociations avec le partenaire privé.</p>
<h2>Article 4 – Droit applicable</h2><p>La mission est conduite conformément au cadre juridique OHADA et à la loi ivoirienne sur les PPP.</p>
<p class="signature-block">Fait à Abidjan, le {{date_debut}}<br/>L'Autorité : _______________<br/>Le Cabinet : _______________</p></div>`
  },
  {
    code: 'cons2_export', name: "Accord de service de conseil en développement des exportations", category: 'commercial_financier',
    price: 14000, priceMax: 42000, description: "Accord de mission pour accompagner une entreprise dans sa stratégie de développement à l'export.", templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'exportateur',label:"Entreprise exportatrice",type:'text',required:true},
      {key:'cabinet',label:"Cabinet de conseil export",type:'text',required:true},
      {key:'marches_cibles',label:"Marchés cibles à l'export",type:'text',required:true},
      {key:'produits_services',label:"Produits / services à exporter",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début de la mission",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CONSEIL EN DÉVELOPPEMENT DES EXPORTATIONS</h1>
<p>Entre <strong>{{exportateur}}</strong> et <strong>{{cabinet}}</strong>, il est convenu ce qui suit :</p>
<h2>Article 1 – Produits / Services</h2><p>{{produits_services}}</p>
<h2>Article 2 – Marchés cibles</h2><p>Les marchés visés sont : {{marches_cibles}}.</p>
<h2>Article 3 – Mission</h2><p>Le Cabinet assurera la veille réglementaire export, l'identification de distributeurs locaux, la participation aux foires et l'appui aux démarches douanières.</p>
<h2>Article 4 – Reporting</h2><p>Un rapport mensuel d'avancement sera transmis au Client.</p>
<p class="signature-block">Fait à Abidjan, le {{date_debut}}<br/>L'Exportateur : _______________<br/>Le Cabinet : _______________</p></div>`
  },
  {
    code: 'cons2_rapport_mission', name: "Rapport de mission de conseil", category: 'commercial_financier',
    price: 6000, priceMax: 18000, description: "Rapport de synthèse d'une mission de conseil présentant diagnostics, recommandations et plans d'action.", templateType: 'pdf', classe: 'A', active: true, popularity: 63,
    fieldsJson: F([
      {key:'client',label:"Client",type:'text',required:true},
      {key:'cabinet',label:"Cabinet auteur du rapport",type:'text',required:true},
      {key:'objet_mission',label:"Objet de la mission",type:'text',required:true},
      {key:'synthese_diagnostic',label:"Synthèse du diagnostic",type:'textarea',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE MISSION DE CONSEIL</h1>
<p><strong>Client :</strong> {{client}}<br/><strong>Cabinet :</strong> {{cabinet}}<br/><strong>Date :</strong> {{date_rapport}}</p>
<h2>1. Objet de la mission</h2><p>{{objet_mission}}</p>
<h2>2. Synthèse du diagnostic</h2><p>{{synthese_diagnostic}}</p>
<h2>3. Recommandations</h2><p>Sur la base des constats établis, le Cabinet recommande la mise en oeuvre des actions prioritaires détaillées en annexe.</p>
<h2>4. Plan d'action</h2><p>Un plan d'action détaillé avec jalons et responsables est joint en annexe au présent rapport.</p>
<p class="signature-block">Rapport établi par : {{cabinet}}<br/>Date : {{date_rapport}}</p></div>`
  },
  {
    code: 'cons2_plan_action', name: "Plan d'action post-diagnostic", category: 'commercial_financier',
    price: 5000, priceMax: 15000, description: "Document structurant les actions à mener suite à un diagnostic organisationnel ou stratégique.", templateType: 'pdf', classe: 'A', active: true, popularity: 61,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise",type:'text',required:true},
      {key:'responsable_plan',label:"Responsable du plan d'action",type:'text',required:true},
      {key:'contexte',label:"Contexte du diagnostic",type:'textarea',required:true},
      {key:'actions_prioritaires',label:"Actions prioritaires identifiées",type:'textarea',required:true},
      {key:'date_plan',label:"Date d'établissement du plan",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN D'ACTION POST-DIAGNOSTIC</h1>
<p><strong>Entreprise :</strong> {{entreprise}}<br/><strong>Responsable :</strong> {{responsable_plan}}<br/><strong>Date :</strong> {{date_plan}}</p>
<h2>1. Contexte</h2><p>{{contexte}}</p>
<h2>2. Actions prioritaires</h2><p>{{actions_prioritaires}}</p>
<h2>3. Suivi et pilotage</h2><p>Chaque action sera associée à un responsable, un délai et un indicateur de réalisation. Le comité de direction validera l'avancement mensuel.</p>
<p class="signature-block">Approuvé par : {{responsable_plan}}<br/>Le {{date_plan}}</p></div>`
  },
  {
    code: 'cons2_suivi_recommandations', name: "Accord de suivi de mise en oeuvre des recommandations", category: 'commercial_financier',
    price: 8000, priceMax: 24000, description: "Accord encadrant la phase de suivi post-mission pour la mise en oeuvre des recommandations du consultant.", templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      {key:'client',label:"Client",type:'text',required:true},
      {key:'consultant',label:"Consultant",type:'text',required:true},
      {key:'recommandations_suivies',label:"Recommandations faisant l'objet du suivi",type:'textarea',required:true},
      {key:'duree_suivi',label:"Durée de la phase de suivi",type:'text',required:true},
      {key:'date_debut_suivi',label:"Date de début du suivi",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SUIVI DE MISE EN OEUVRE DES RECOMMANDATIONS</h1>
<p>Entre <strong>{{client}}</strong> et <strong>{{consultant}}</strong>, il est convenu ce qui suit :</p>
<h2>Article 1 – Recommandations suivies</h2><p>{{recommandations_suivies}}</p>
<h2>Article 2 – Durée</h2><p>La phase de suivi s'étend sur {{duree_suivi}} à compter du {{date_debut_suivi}}.</p>
<h2>Article 3 – Modalités de suivi</h2><p>Le Consultant effectuera des visites mensuelles sur site et remettra des rapports d'avancement trimestriels.</p>
<h2>Article 4 – Ajustements</h2><p>Le plan d'action pourra être ajusté d'un commun accord entre les parties en fonction des résultats observés.</p>
<p class="signature-block">Fait à Abidjan, le {{date_debut_suivi}}<br/>Le Client : _______________<br/>Le Consultant : _______________</p></div>`
  },
  {
    code: 'cons2_formation_managers', name: "Accord de service de formation des managers", category: 'commercial_financier',
    price: 10000, priceMax: 30000, description: "Accord encadrant un programme de formation continue destiné aux managers d'une organisation.", templateType: 'pdf', classe: 'A', active: true, popularity: 74,
    fieldsJson: F([
      {key:'client_entreprise',label:"Entreprise cliente",type:'text',required:true},
      {key:'organisme_formation',label:"Organisme de formation",type:'text',required:true},
      {key:'programme_formation',label:"Programme et thèmes de formation",type:'textarea',required:true},
      {key:'nombre_participants',label:"Nombre de participants",type:'text',required:true},
      {key:'date_session',label:"Date de la première session",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FORMATION DES MANAGERS</h1>
<p>Entre <strong>{{client_entreprise}}</strong> et <strong>{{organisme_formation}}</strong>, il est convenu ce qui suit :</p>
<h2>Article 1 – Programme</h2><p>{{programme_formation}}</p>
<h2>Article 2 – Participants</h2><p>La formation est destinée à {{nombre_participants}} managers. La première session débutera le {{date_session}}.</p>
<h2>Article 3 – Méthodes pédagogiques</h2><p>La formation alternera apports théoriques, études de cas, mises en situation et travaux de groupe.</p>
<h2>Article 4 – Évaluation</h2><p>Une évaluation des acquis et de la satisfaction sera réalisée à l'issue de chaque session. Une attestation de formation sera délivrée aux participants.</p>
<p class="signature-block">Fait à Abidjan, le {{date_session}}<br/>Le Client : _______________<br/>L'Organisme : _______________</p></div>`
  },
  {
    code: 'cons2_charte_deontologie', name: "Charte de déontologie du consultant", category: 'commercial_financier',
    price: 4000, priceMax: 12000, description: "Charte définissant les principes éthiques et déontologiques auxquels adhère un consultant ou cabinet de conseil.", templateType: 'pdf', classe: 'A', active: true, popularity: 55,
    fieldsJson: F([
      {key:'cabinet_consultant',label:"Cabinet / Consultant",type:'text',required:true},
      {key:'domaine_expertise',label:"Domaine d'expertise principal",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption de la charte",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE DÉONTOLOGIE DU CONSULTANT</h1>
<p><strong>Cabinet / Consultant :</strong> {{cabinet_consultant}}<br/><strong>Domaine :</strong> {{domaine_expertise}}<br/><strong>Adoptée le :</strong> {{date_adoption}}</p>
<h2>Principe 1 – Indépendance</h2><p>Le Consultant exerce ses missions en toute indépendance, sans subir de pression susceptible de compromettre l'objectivité de ses conclusions.</p>
<h2>Principe 2 – Confidentialité</h2><p>Toutes les informations obtenues dans le cadre des missions sont traitées avec la plus stricte confidentialité.</p>
<h2>Principe 3 – Intégrité</h2><p>Le Consultant refuse tout conflit d'intérêts et signale sans délai toute situation susceptible de nuire à son impartialité.</p>
<h2>Principe 4 – Compétence</h2><p>Le Consultant s'engage à maintenir et développer ses compétences professionnelles par une formation continue régulière.</p>
<h2>Principe 5 – Loyauté</h2><p>Le Consultant agit dans l'intérêt exclusif de son client tout en respectant les lois et réglementations en vigueur.</p>
<p class="signature-block">{{cabinet_consultant}}<br/>Le {{date_adoption}}</p></div>`
  },

  // ─── EXPERTISE JUDICIAIRE / ÉVALUATION (exp2_) ────────────────────────────
  {
    code: 'exp2_contrat_expert_judiciaire', name: "Contrat d'expert judiciaire (tribunal de commerce)", category: 'juridique_admin',
    price: 15000, priceMax: 45000, description: "Contrat nommant un expert judiciaire par le tribunal de commerce dans le cadre d'un litige.", templateType: 'pdf', classe: 'A', active: true, popularity: 77,
    fieldsJson: F([
      {key:'tribunal',label:"Tribunal de commerce compétent",type:'text',required:true},
      {key:'expert_nom',label:"Nom de l'expert désigné",type:'text',required:true},
      {key:'affaire_reference',label:"Référence de l'affaire",type:'text',required:true},
      {key:'mission_expert',label:"Mission confiée à l'expert",type:'textarea',required:true},
      {key:'date_designation',label:"Date de désignation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT D'EXPERT JUDICIAIRE – TRIBUNAL DE COMMERCE</h1>
<p><strong>Tribunal :</strong> {{tribunal}}<br/><strong>Affaire N° :</strong> {{affaire_reference}}<br/><strong>Date de désignation :</strong> {{date_designation}}</p>
<h2>Article 1 – Désignation</h2><p>Le Tribunal désigne <strong>{{expert_nom}}</strong> en qualité d'expert judiciaire.</p>
<h2>Article 2 – Mission</h2><p>{{mission_expert}}</p>
<h2>Article 3 – Délai</h2><p>L'Expert déposera son rapport dans le délai fixé par l'ordonnance de désignation.</p>
<h2>Article 4 – Obligations</h2><p>L'Expert est tenu au respect du contradictoire, à l'impartialité et au secret professionnel dans l'accomplissement de sa mission.</p>
<p class="signature-block">Le Président du Tribunal<br/>{{tribunal}}</p></div>`
  },
  {
    code: 'exp2_rapport_comptable', name: "Rapport d'expertise judiciaire comptable", category: 'juridique_admin',
    price: 18000, priceMax: 54000, description: "Rapport d'expertise judiciaire portant sur des questions comptables dans le cadre d'un litige commercial.", templateType: 'pdf', classe: 'A', active: true, popularity: 74,
    fieldsJson: F([
      {key:'expert_nom',label:"Nom de l'expert",type:'text',required:true},
      {key:'affaire',label:"Affaire / Référence dossier",type:'text',required:true},
      {key:'questions_posees',label:"Questions posées par le juge",type:'textarea',required:true},
      {key:'synthese_travaux',label:"Synthèse des travaux d'expertise",type:'textarea',required:true},
      {key:'date_depot',label:"Date de dépôt du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT D'EXPERTISE JUDICIAIRE COMPTABLE</h1>
<p><strong>Expert :</strong> {{expert_nom}}<br/><strong>Affaire :</strong> {{affaire}}<br/><strong>Date de dépôt :</strong> {{date_depot}}</p>
<h2>I. Mission et questions posées</h2><p>{{questions_posees}}</p>
<h2>II. Travaux réalisés</h2><p>{{synthese_travaux}}</p>
<h2>III. Réponses aux questions</h2><p>Les réponses détaillées aux questions posées par le juge sont développées dans le corps du rapport, avec les pièces justificatives en annexe.</p>
<h2>IV. Serment</h2><p>Je soussigné {{expert_nom}} certifie sur l'honneur avoir accompli ma mission en toute impartialité et conformément aux règles de l'art.</p>
<p class="signature-block">{{expert_nom}}, Expert Judiciaire<br/>Le {{date_depot}}</p></div>`
  },
  {
    code: 'exp2_rapport_technique', name: "Rapport d'expertise judiciaire technique", category: 'juridique_admin',
    price: 16000, priceMax: 48000, description: "Rapport d'expertise judiciaire technique destiné à éclairer le juge sur des questions techniques complexes.", templateType: 'pdf', classe: 'A', active: true, popularity: 71,
    fieldsJson: F([
      {key:'expert_nom',label:"Nom de l'expert technique",type:'text',required:true},
      {key:'affaire',label:"Référence de l'affaire",type:'text',required:true},
      {key:'domaine_technique',label:"Domaine technique de l'expertise",type:'text',required:true},
      {key:'constatations',label:"Constatations techniques",type:'textarea',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT D'EXPERTISE JUDICIAIRE TECHNIQUE</h1>
<p><strong>Expert :</strong> {{expert_nom}}<br/><strong>Domaine :</strong> {{domaine_technique}}<br/><strong>Affaire :</strong> {{affaire}}<br/><strong>Date :</strong> {{date_rapport}}</p>
<h2>I. Mission</h2><p>L'expert a été chargé d'examiner les aspects techniques du litige dans le domaine {{domaine_technique}}.</p>
<h2>II. Constatations</h2><p>{{constatations}}</p>
<h2>III. Analyse technique</h2><p>L'analyse détaillée des éléments techniques, avec mesures et calculs à l'appui, est développée dans les annexes techniques jointes.</p>
<h2>IV. Conclusions</h2><p>Les conclusions de l'expert, répondant point par point aux questions du juge, sont formulées en termes clairs et non techniques.</p>
<p class="signature-block">{{expert_nom}}, Expert Judiciaire<br/>Le {{date_rapport}}</p></div>`
  },
  {
    code: 'exp2_eval_dcf', name: "Rapport d'évaluation d'entreprise (méthode DCF)", category: 'juridique_admin',
    price: 20000, priceMax: 60000, description: "Rapport d'évaluation d'entreprise par la méthode des flux de trésorerie actualisés (DCF).", templateType: 'pdf', classe: 'A', active: true, popularity: 80,
    fieldsJson: F([
      {key:'evaluateur',label:"Évaluateur / Cabinet",type:'text',required:true},
      {key:'societe_evaluee',label:"Société évaluée",type:'text',required:true},
      {key:'taux_actualisation',label:"Taux d'actualisation retenu (%)",type:'text',required:true},
      {key:'horizon_projection',label:"Horizon de projection (années)",type:'text',required:true},
      {key:'date_reference',label:"Date de référence",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT D'ÉVALUATION D'ENTREPRISE – MÉTHODE DCF</h1>
<p><strong>Évaluateur :</strong> {{evaluateur}}<br/><strong>Société :</strong> {{societe_evaluee}}<br/><strong>Date de référence :</strong> {{date_reference}}</p>
<h2>I. Hypothèses</h2><p>Taux d'actualisation (WACC) : {{taux_actualisation}} %<br/>Horizon de projection : {{horizon_projection}} ans</p>
<h2>II. Projections des flux</h2><p>Les flux de trésorerie disponibles (FCF) ont été projetés sur l'horizon retenu en s'appuyant sur le business plan de la société et les données sectorielles.</p>
<h2>III. Valeur terminale</h2><p>La valeur terminale a été calculée selon la méthode de Gordon-Shapiro avec un taux de croissance à l'infini.</p>
<h2>IV. Résultat de l'évaluation</h2><p>La valeur des capitaux propres de {{societe_evaluee}} ressort dans une fourchette détaillée en annexe quantitative.</p>
<p class="signature-block">{{evaluateur}}<br/>Le {{date_reference}}</p></div>`
  },
  {
    code: 'exp2_eval_comparable', name: "Rapport d'évaluation d'entreprise (méthode comparable)", category: 'juridique_admin',
    price: 18000, priceMax: 54000, description: "Rapport d'évaluation d'entreprise par la méthode des comparables boursiers et transactionnels.", templateType: 'pdf', classe: 'A', active: true, popularity: 75,
    fieldsJson: F([
      {key:'evaluateur',label:"Évaluateur",type:'text',required:true},
      {key:'societe',label:"Société évaluée",type:'text',required:true},
      {key:'comparables_retenus',label:"Panel de comparables retenus",type:'textarea',required:true},
      {key:'multiples_appliques',label:"Multiples appliqués (EV/EBITDA, P/E, etc.)",type:'text',required:true},
      {key:'date_reference',label:"Date de référence",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT D'ÉVALUATION D'ENTREPRISE – MÉTHODE DES COMPARABLES</h1>
<p><strong>Évaluateur :</strong> {{evaluateur}}<br/><strong>Société :</strong> {{societe}}<br/><strong>Date de référence :</strong> {{date_reference}}</p>
<h2>I. Panel de comparables</h2><p>{{comparables_retenus}}</p>
<h2>II. Multiples retenus</h2><p>Les multiples suivants ont été appliqués : {{multiples_appliques}}.</p>
<h2>III. Ajustements</h2><p>Des ajustements ont été appliqués pour tenir compte de la prime de liquidité, de la taille et des spécificités du marché africain.</p>
<h2>IV. Conclusion</h2><p>La fourchette de valeur obtenue par la méthode des comparables est présentée dans le tableau de synthèse en annexe.</p>
<p class="signature-block">{{evaluateur}}<br/>Le {{date_reference}}</p></div>`
  },
  {
    code: 'exp2_eval_marque', name: "Rapport d'évaluation de marque", category: 'juridique_admin',
    price: 16000, priceMax: 48000, description: "Rapport d'évaluation de la valeur d'une marque commerciale à des fins comptables, transactionnelles ou contentieuses.", templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'expert',label:"Expert évaluateur",type:'text',required:true},
      {key:'marque',label:"Marque évaluée",type:'text',required:true},
      {key:'methode_evaluation',label:"Méthode d'évaluation retenue",type:'text',required:true},
      {key:'contexte_evaluation',label:"Contexte de l'évaluation",type:'textarea',required:true},
      {key:'date_evaluation',label:"Date de l'évaluation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT D'ÉVALUATION DE MARQUE</h1>
<p><strong>Expert :</strong> {{expert}}<br/><strong>Marque :</strong> {{marque}}<br/><strong>Date :</strong> {{date_evaluation}}</p>
<h2>I. Contexte</h2><p>{{contexte_evaluation}}</p>
<h2>II. Méthode retenue</h2><p>L'évaluation a été conduite selon la méthode : {{methode_evaluation}}.</p>
<h2>III. Analyse de la marque</h2><p>L'analyse porte sur la notoriété, l'image, les revenus générés par la marque et sa capacité à attirer et fidéliser les consommateurs.</p>
<h2>IV. Valeur de la marque</h2><p>La valeur de la marque {{marque}} est déterminée dans la fourchette présentée en annexe.</p>
<p class="signature-block">{{expert}}<br/>Le {{date_evaluation}}</p></div>`
  },
  {
    code: 'exp2_eval_incorporels', name: "Rapport d'évaluation d'actifs incorporels", category: 'juridique_admin',
    price: 17000, priceMax: 51000, description: "Rapport d'évaluation d'actifs incorporels (brevets, logiciels, bases de données, savoir-faire).", templateType: 'pdf', classe: 'A', active: true, popularity: 66,
    fieldsJson: F([
      {key:'evaluateur',label:"Évaluateur",type:'text',required:true},
      {key:'actifs_evalues',label:"Actifs incorporels évalués",type:'textarea',required:true},
      {key:'methodes',label:"Méthodes d'évaluation utilisées",type:'textarea',required:true},
      {key:'contexte',label:"Contexte de la mission",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT D'ÉVALUATION D'ACTIFS INCORPORELS</h1>
<p><strong>Évaluateur :</strong> {{evaluateur}}<br/><strong>Contexte :</strong> {{contexte}}<br/><strong>Date :</strong> {{date_rapport}}</p>
<h2>I. Actifs évalués</h2><p>{{actifs_evalues}}</p>
<h2>II. Méthodes utilisées</h2><p>{{methodes}}</p>
<h2>III. Résultats</h2><p>Les valeurs attribuées à chaque actif incorporel sont présentées dans le tableau récapitulatif en annexe, avec les hypothèses sous-jacentes.</p>
<p class="signature-block">{{evaluateur}}<br/>Le {{date_rapport}}</p></div>`
  },
  {
    code: 'exp2_eval_pi', name: "Rapport d'évaluation de propriété intellectuelle", category: 'juridique_admin',
    price: 17000, priceMax: 51000, description: "Rapport d'évaluation des droits de propriété intellectuelle (brevets, droits d'auteur, licences).", templateType: 'pdf', classe: 'A', active: true, popularity: 64,
    fieldsJson: F([
      {key:'expert_pi',label:"Expert en PI",type:'text',required:true},
      {key:'actifs_pi',label:"Droits de PI évalués",type:'textarea',required:true},
      {key:'titulaire',label:"Titulaire des droits",type:'text',required:true},
      {key:'finalite',label:"Finalité de l'évaluation",type:'text',required:true},
      {key:'date_evaluation',label:"Date de l'évaluation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT D'ÉVALUATION DE PROPRIÉTÉ INTELLECTUELLE</h1>
<p><strong>Expert :</strong> {{expert_pi}}<br/><strong>Titulaire :</strong> {{titulaire}}<br/><strong>Finalité :</strong> {{finalite}}<br/><strong>Date :</strong> {{date_evaluation}}</p>
<h2>I. Droits évalués</h2><p>{{actifs_pi}}</p>
<h2>II. Périmètre géographique</h2><p>L'évaluation tient compte de la portée territoriale des droits enregistrés auprès de l'OAPI et des autres offices de PI concernés.</p>
<h2>III. Valeur économique</h2><p>La valeur économique des droits de PI est déterminée selon les flux de revenus attendus et les coûts de remplacement, présentés en annexe.</p>
<p class="signature-block">{{expert_pi}}<br/>Le {{date_evaluation}}</p></div>`
  },
  {
    code: 'exp2_eval_stocks', name: "Rapport d'évaluation de stocks litigieux", category: 'juridique_admin',
    price: 12000, priceMax: 36000, description: "Rapport d'évaluation et de constatation de stocks faisant l'objet d'un litige commercial ou judiciaire.", templateType: 'pdf', classe: 'A', active: true, popularity: 62,
    fieldsJson: F([
      {key:'expert',label:"Expert désigné",type:'text',required:true},
      {key:'parties_litige',label:"Parties au litige",type:'text',required:true},
      {key:'nature_stocks',label:"Nature des stocks litigieux",type:'textarea',required:true},
      {key:'methode_valorisation',label:"Méthode de valorisation retenue",type:'text',required:true},
      {key:'date_constats',label:"Date des constats",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT D'ÉVALUATION DE STOCKS LITIGIEUX</h1>
<p><strong>Expert :</strong> {{expert}}<br/><strong>Parties :</strong> {{parties_litige}}<br/><strong>Date des constats :</strong> {{date_constats}}</p>
<h2>I. Nature des stocks</h2><p>{{nature_stocks}}</p>
<h2>II. Constats physiques</h2><p>L'Expert a procédé au comptage et à la vérification de l'état des stocks en présence des représentants des parties.</p>
<h2>III. Valorisation</h2><p>Méthode retenue : {{methode_valorisation}}. Le détail des valorisations est présenté en tableau annexé.</p>
<h2>IV. Réserves</h2><p>L'Expert mentionne toute réserve ou anomalie constatée lors de l'inventaire physique.</p>
<p class="signature-block">{{expert}}<br/>Le {{date_constats}}</p></div>`
  },
  {
    code: 'exp2_sinistre_perte', name: "Rapport d'expertise de sinistre (perte d'exploitation)", category: 'juridique_admin',
    price: 14000, priceMax: 42000, description: "Rapport d'expertise évaluant les pertes d'exploitation subies suite à un sinistre assuré.", templateType: 'pdf', classe: 'A', active: true, popularity: 73,
    fieldsJson: F([
      {key:'expert_assurance',label:"Expert d'assurance mandaté",type:'text',required:true},
      {key:'assure',label:"Assuré",type:'text',required:true},
      {key:'date_sinistre',label:"Date du sinistre",type:'date',required:true},
      {key:'cause_sinistre',label:"Cause du sinistre",type:'text',required:true},
      {key:'periode_indemnisation',label:"Période d'indemnisation analysée",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT D'EXPERTISE DE SINISTRE – PERTE D'EXPLOITATION</h1>
<p><strong>Expert :</strong> {{expert_assurance}}<br/><strong>Assuré :</strong> {{assure}}<br/><strong>Date du sinistre :</strong> {{date_sinistre}}</p>
<h2>I. Cause du sinistre</h2><p>{{cause_sinistre}}</p>
<h2>II. Évaluation des pertes d'exploitation</h2><p>L'Expert a analysé les comptes de résultat, le chiffre d'affaires prévisionnel et les charges fixes sur la période {{periode_indemnisation}}.</p>
<h2>III. Calcul de l'indemnité</h2><p>L'indemnité de perte d'exploitation est calculée sur la base de la marge brute perdue diminuée des économies réalisées, conformément aux conditions du contrat d'assurance.</p>
<h2>IV. Conclusion</h2><p>Le montant de l'indemnité recommandée est détaillé dans le tableau de liquidation en annexe.</p>
<p class="signature-block">{{expert_assurance}}<br/>Le {{date_sinistre}}</p></div>`
  },
  {
    code: 'exp2_sinistre_incendie', name: "Rapport d'expertise de sinistre incendie", category: 'juridique_admin',
    price: 13000, priceMax: 39000, description: "Rapport d'expertise consécutif à un sinistre incendie, évaluant les dommages matériels.", templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'expert',label:"Expert en sinistres",type:'text',required:true},
      {key:'assure',label:"Assuré / Victime",type:'text',required:true},
      {key:'lieu_sinistre',label:"Lieu du sinistre",type:'text',required:true},
      {key:'date_incendie',label:"Date de l'incendie",type:'date',required:true},
      {key:'description_dommages',label:"Description des dommages constatés",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT D'EXPERTISE DE SINISTRE INCENDIE</h1>
<p><strong>Expert :</strong> {{expert}}<br/><strong>Assuré :</strong> {{assure}}<br/><strong>Lieu :</strong> {{lieu_sinistre}}<br/><strong>Date :</strong> {{date_incendie}}</p>
<h2>I. Circonstances du sinistre</h2><p>L'incendie survenu le {{date_incendie}} en {{lieu_sinistre}} a causé les dommages suivants.</p>
<h2>II. Dommages constatés</h2><p>{{description_dommages}}</p>
<h2>III. Évaluation des dommages</h2><p>La valeur de remplacement à neuf et la vétusté ont été appliquées conformément aux conditions générales du contrat d'assurance.</p>
<h2>IV. Indemnité proposée</h2><p>Le détail du calcul de l'indemnité est présenté en tableau de liquidation joint au présent rapport.</p>
<p class="signature-block">{{expert}}<br/>Le {{date_incendie}}</p></div>`
  },
  {
    code: 'exp2_chantier_litige', name: "Rapport d'expertise de chantier en litige (BTP)", category: 'juridique_admin',
    price: 16000, priceMax: 48000, description: "Rapport d'expertise technique portant sur un chantier de construction faisant l'objet d'un litige.", templateType: 'pdf', classe: 'A', active: true, popularity: 76,
    fieldsJson: F([
      {key:'expert_btp',label:"Expert BTP",type:'text',required:true},
      {key:'chantier',label:"Identification du chantier",type:'text',required:true},
      {key:'parties',label:"Parties en litige",type:'text',required:true},
      {key:'objet_litige',label:"Objet du litige technique",type:'textarea',required:true},
      {key:'date_visite',label:"Date de visite du chantier",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT D'EXPERTISE DE CHANTIER EN LITIGE – BTP</h1>
<p><strong>Expert :</strong> {{expert_btp}}<br/><strong>Chantier :</strong> {{chantier}}<br/><strong>Parties :</strong> {{parties}}<br/><strong>Date de visite :</strong> {{date_visite}}</p>
<h2>I. Objet du litige</h2><p>{{objet_litige}}</p>
<h2>II. Constats sur site</h2><p>L'Expert a procédé à la visite du chantier le {{date_visite}} en présence des représentants des parties. Les constats visuels, mesures et prélèvements réalisés sont détaillés en annexe.</p>
<h2>III. Analyse technique</h2><p>L'analyse porte sur la conformité aux plans, aux normes de construction applicables en Côte d'Ivoire et aux règles de l'art.</p>
<h2>IV. Responsabilités et recommandations</h2><p>Les conclusions sur les responsabilités techniques et les travaux de reprise nécessaires sont formulées dans la partie IV du rapport.</p>
<p class="signature-block">{{expert_btp}}<br/>Le {{date_visite}}</p></div>`
  },
  {
    code: 'exp2_vice_cache', name: "Rapport d'expertise de vice caché (immobilier)", category: 'juridique_admin',
    price: 11000, priceMax: 33000, description: "Rapport d'expertise établissant l'existence d'un vice caché affectant un bien immobilier.", templateType: 'pdf', classe: 'A', active: true, popularity: 69,
    fieldsJson: F([
      {key:'expert',label:"Expert immobilier",type:'text',required:true},
      {key:'bien_immeuble',label:"Bien immobilier concerné",type:'text',required:true},
      {key:'acquereur',label:"Acquéreur / Requérant",type:'text',required:true},
      {key:'description_vice',label:"Description du vice constaté",type:'textarea',required:true},
      {key:'date_constat',label:"Date du constat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT D'EXPERTISE DE VICE CACHÉ – IMMOBILIER</h1>
<p><strong>Expert :</strong> {{expert}}<br/><strong>Bien :</strong> {{bien_immeuble}}<br/><strong>Requérant :</strong> {{acquereur}}<br/><strong>Date du constat :</strong> {{date_constat}}</p>
<h2>I. Description du vice</h2><p>{{description_vice}}</p>
<h2>II. Caractère caché</h2><p>L'Expert analyse si le vice était apparent lors de la vente ou s'il était raisonnablement indécelable par un acquéreur non professionnel.</p>
<h2>III. Antériorité et imputabilité</h2><p>L'Expert se prononce sur l'antériorité du vice à la vente et sur sa cause probable.</p>
<h2>IV. Préjudice et réparation</h2><p>Le coût estimé des travaux de remise en état est évalué et présenté en annexe chiffrée.</p>
<p class="signature-block">{{expert}}<br/>Le {{date_constat}}</p></div>`
  },
  {
    code: 'exp2_contrefacon', name: "Rapport d'expertise de contrefaçon", category: 'juridique_admin',
    price: 15000, priceMax: 45000, description: "Rapport d'expertise établissant la réalité et l'étendue d'actes de contrefaçon de droits de PI.", templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'expert',label:"Expert en propriété intellectuelle",type:'text',required:true},
      {key:'droits_concernes',label:"Droits de PI contrefaits allégués",type:'textarea',required:true},
      {key:'produits_litigieux',label:"Produits / oeuvres litigieux",type:'textarea',required:true},
      {key:'titulaire_droits',label:"Titulaire des droits",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT D'EXPERTISE DE CONTREFAÇON</h1>
<p><strong>Expert :</strong> {{expert}}<br/><strong>Titulaire des droits :</strong> {{titulaire_droits}}<br/><strong>Date :</strong> {{date_rapport}}</p>
<h2>I. Droits de PI concernés</h2><p>{{droits_concernes}}</p>
<h2>II. Produits litigieux</h2><p>{{produits_litigieux}}</p>
<h2>III. Analyse comparative</h2><p>L'Expert procède à une comparaison détaillée entre les droits protégés et les produits litigieux pour caractériser la contrefaçon.</p>
<h2>IV. Évaluation du préjudice</h2><p>Le manque à gagner subi par le titulaire des droits et les bénéfices indûment réalisés par le contrefacteur sont évalués en annexe.</p>
<p class="signature-block">{{expert}}<br/>Le {{date_rapport}}</p></div>`
  },
  {
    code: 'exp2_expert_amiable', name: "Accord de nomination d'expert amiable", category: 'juridique_admin',
    price: 10000, priceMax: 30000, description: "Accord entre parties pour la nomination conjointe d'un expert amiable chargé de résoudre un différend technique.", templateType: 'pdf', classe: 'A', active: true, popularity: 67,
    fieldsJson: F([
      {key:'partie_1',label:"Première partie",type:'text',required:true},
      {key:'partie_2',label:"Deuxième partie",type:'text',required:true},
      {key:'expert_designe',label:"Expert amiable désigné",type:'text',required:true},
      {key:'differend',label:"Nature du différend",type:'textarea',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE NOMINATION D'EXPERT AMIABLE</h1>
<p>Entre <strong>{{partie_1}}</strong> et <strong>{{partie_2}}</strong>, il est convenu ce qui suit :</p>
<h2>Article 1 – Nature du différend</h2><p>{{differend}}</p>
<h2>Article 2 – Nomination</h2><p>Les parties désignent d'un commun accord <strong>{{expert_designe}}</strong> en qualité d'expert amiable pour examiner le différend.</p>
<h2>Article 3 – Mission</h2><p>L'Expert formulera ses conclusions techniques dans un rapport remis simultanément aux deux parties.</p>
<h2>Article 4 – Valeur de l'avis</h2><p>L'avis de l'Expert amiable, bien que non juridictionnel, s'impose aux parties qui s'engagent à le respecter de bonne foi.</p>
<p class="signature-block">Fait à Abidjan, le {{date_accord}}<br/>{{partie_1}} : _______________<br/>{{partie_2}} : _______________</p></div>`
  },
  {
    code: 'exp2_protocole_mission', name: "Protocole de mission d'expertise amiable", category: 'juridique_admin',
    price: 8000, priceMax: 24000, description: "Protocole définissant les modalités d'une expertise amiable entre parties en différend.", templateType: 'pdf', classe: 'A', active: true, popularity: 63,
    fieldsJson: F([
      {key:'expert',label:"Expert amiable",type:'text',required:true},
      {key:'parties',label:"Parties concernées",type:'text',required:true},
      {key:'questions_mission',label:"Questions soumises à l'expert",type:'textarea',required:true},
      {key:'delai_rapport',label:"Délai de remise du rapport",type:'text',required:true},
      {key:'date_protocole',label:"Date du protocole",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PROTOCOLE DE MISSION D'EXPERTISE AMIABLE</h1>
<p><strong>Expert :</strong> {{expert}}<br/><strong>Parties :</strong> {{parties}}<br/><strong>Date :</strong> {{date_protocole}}</p>
<h2>1. Questions soumises à l'expert</h2><p>{{questions_mission}}</p>
<h2>2. Déroulement de la mission</h2><p>L'Expert convoquera les parties pour des réunions contradictoires. Toute pièce communiquée par une partie sera transmise à l'autre.</p>
<h2>3. Délai</h2><p>L'Expert s'engage à remettre son rapport dans un délai de {{delai_rapport}} à compter de la date du présent protocole.</p>
<h2>4. Rémunération</h2><p>Les honoraires de l'Expert sont supportés à parts égales par les parties, sauf décision contraire dans le rapport.</p>
<p class="signature-block">{{expert}}<br/>Le {{date_protocole}}</p></div>`
  },
  {
    code: 'exp2_tierce_expertise', name: "Accord de tierce expertise (contre-expertise)", category: 'juridique_admin',
    price: 12000, priceMax: 36000, description: "Accord organisant une tierce expertise ou contre-expertise suite à une contestation du premier rapport d'expert.", templateType: 'pdf', classe: 'A', active: true, popularity: 61,
    fieldsJson: F([
      {key:'partie_contestante',label:"Partie contestante",type:'text',required:true},
      {key:'partie_adverse',label:"Partie adverse",type:'text',required:true},
      {key:'tiers_expert',label:"Tiers expert désigné",type:'text',required:true},
      {key:'points_contestes',label:"Points du premier rapport contestés",type:'textarea',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE TIERCE EXPERTISE (CONTRE-EXPERTISE)</h1>
<p>Entre <strong>{{partie_contestante}}</strong> et <strong>{{partie_adverse}}</strong>, il est convenu ce qui suit :</p>
<h2>Article 1 – Points contestés</h2><p>{{points_contestes}}</p>
<h2>Article 2 – Désignation du tiers expert</h2><p>Les parties désignent <strong>{{tiers_expert}}</strong> pour réaliser une contre-expertise sur les points contestés.</p>
<h2>Article 3 – Accès aux pièces</h2><p>Le tiers expert aura accès à l'intégralité du premier rapport et de ses annexes.</p>
<h2>Article 4 – Force probante</h2><p>Les conclusions du tiers expert prévaudront sur le premier rapport en cas de divergence significative.</p>
<p class="signature-block">Fait à Abidjan, le {{date_accord}}<br/>{{partie_contestante}} : _______________<br/>{{partie_adverse}} : _______________</p></div>`
  },
  {
    code: 'exp2_conciliation_technique', name: "Rapport de conciliation technique", category: 'juridique_admin',
    price: 10000, priceMax: 30000, description: "Rapport établi par un expert technique chargé de concilier les parties dans un différend technique.", templateType: 'pdf', classe: 'A', active: true, popularity: 59,
    fieldsJson: F([
      {key:'conciliateur',label:"Conciliateur technique",type:'text',required:true},
      {key:'parties',label:"Parties en différend",type:'text',required:true},
      {key:'objet_differend',label:"Objet du différend technique",type:'textarea',required:true},
      {key:'accord_conciliation',label:"Termes de l'accord de conciliation",type:'textarea',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE CONCILIATION TECHNIQUE</h1>
<p><strong>Conciliateur :</strong> {{conciliateur}}<br/><strong>Parties :</strong> {{parties}}<br/><strong>Date :</strong> {{date_rapport}}</p>
<h2>I. Objet du différend</h2><p>{{objet_differend}}</p>
<h2>II. Processus de conciliation</h2><p>Le Conciliateur a organisé plusieurs réunions contradictoires et procédé aux constats techniques nécessaires.</p>
<h2>III. Accord de conciliation</h2><p>{{accord_conciliation}}</p>
<h2>IV. Valeur de l'accord</h2><p>Le présent accord de conciliation a force obligatoire entre les parties et vaut transaction au sens de l'Acte Uniforme OHADA.</p>
<p class="signature-block">{{parties}}<br/>{{conciliateur}}<br/>Le {{date_rapport}}</p></div>`
  },
  {
    code: 'exp2_arbitrage_technique', name: "Accord d'arbitrage technique (dispute board BTP)", category: 'juridique_admin',
    price: 20000, priceMax: 60000, description: "Accord mettant en place un comité de règlement des différends (dispute board) pour un chantier BTP.", templateType: 'pdf', classe: 'A', active: true, popularity: 71,
    fieldsJson: F([
      {key:'maitre_ouvrage',label:"Maître d'ouvrage",type:'text',required:true},
      {key:'entrepreneur',label:"Entrepreneur",type:'text',required:true},
      {key:'membres_board',label:"Membres du dispute board",type:'textarea',required:true},
      {key:'chantier',label:"Chantier concerné",type:'text',required:true},
      {key:'date_constitution',label:"Date de constitution du board",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D'ARBITRAGE TECHNIQUE – DISPUTE BOARD BTP</h1>
<p>Entre <strong>{{maitre_ouvrage}}</strong> et <strong>{{entrepreneur}}</strong>, il est convenu ce qui suit :</p>
<h2>Article 1 – Chantier</h2><p>Le présent accord porte sur le chantier : {{chantier}}.</p>
<h2>Article 2 – Composition du Dispute Board</h2><p>{{membres_board}}</p>
<h2>Article 3 – Compétence</h2><p>Le Dispute Board est compétent pour statuer sur tout différend technique ou contractuel survenant en cours d'exécution du marché.</p>
<h2>Article 4 – Décisions</h2><p>Les décisions du Dispute Board sont obligatoires et immédiatement exécutoires, sous réserve du recours à l'arbitrage institutionnel.</p>
<p class="signature-block">Fait à Abidjan, le {{date_constitution}}<br/>{{maitre_ouvrage}} : _______________<br/>{{entrepreneur}} : _______________</p></div>`
  },
  {
    code: 'exp2_expert_oapi', name: "Contrat d'expert en propriété intellectuelle (OAPI)", category: 'juridique_admin',
    price: 14000, priceMax: 42000, description: "Contrat de mission d'un expert en PI agissant dans le cadre des procédures OAPI.", templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      {key:'mandant',label:"Mandant",type:'text',required:true},
      {key:'expert_oapi',label:"Expert PI / OAPI",type:'text',required:true},
      {key:'titre_pi',label:"Titre de PI concerné (brevet, marque, etc.)",type:'text',required:true},
      {key:'procedure',label:"Procédure OAPI concernée",type:'textarea',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT D'EXPERT EN PROPRIÉTÉ INTELLECTUELLE – OAPI</h1>
<p>Entre <strong>{{mandant}}</strong> et <strong>{{expert_oapi}}</strong>, il est convenu ce qui suit :</p>
<h2>Article 1 – Titre de PI</h2><p>La mission concerne : {{titre_pi}}.</p>
<h2>Article 2 – Procédure</h2><p>{{procedure}}</p>
<h2>Article 3 – Mission</h2><p>L'Expert assurera la représentation du Mandant devant l'OAPI, la rédaction des actes nécessaires et le suivi de la procédure jusqu'à sa clôture.</p>
<h2>Article 4 – Droit applicable</h2><p>Le présent contrat est régi par l'Accord de Bangui révisé et les règlements de l'OAPI.</p>
<p class="signature-block">Fait à Abidjan, le {{date_contrat}}<br/>Le Mandant : _______________<br/>L'Expert : _______________</p></div>`
  },
  {
    code: 'exp2_eval_independante', name: "Accord de mission d'évaluation indépendante (fonds d'investissement)", category: 'juridique_admin',
    price: 20000, priceMax: 60000, description: "Accord mandatant un évaluateur indépendant pour déterminer la valeur de marché d'un actif au bénéfice d'un fonds d'investissement.", templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'fonds',label:"Fonds d'investissement commanditaire",type:'text',required:true},
      {key:'evaluateur_independant',label:"Évaluateur indépendant",type:'text',required:true},
      {key:'actif_evalue',label:"Actif à évaluer",type:'textarea',required:true},
      {key:'norme_evaluation',label:"Norme d'évaluation applicable (IPEV, IFRS, etc.)",type:'text',required:true},
      {key:'date_mission',label:"Date de la mission",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE MISSION D'ÉVALUATION INDÉPENDANTE</h1>
<p>Entre <strong>{{fonds}}</strong> et <strong>{{evaluateur_independant}}</strong>, il est convenu ce qui suit :</p>
<h2>Article 1 – Actif évalué</h2><p>{{actif_evalue}}</p>
<h2>Article 2 – Norme d'évaluation</h2><p>L'évaluation sera conduite conformément à la norme : {{norme_evaluation}}.</p>
<h2>Article 3 – Indépendance</h2><p>L'Évaluateur atteste de son indépendance vis-à-vis du Fonds et des sociétés du portefeuille concernées.</p>
<h2>Article 4 – Rapport</h2><p>Le rapport d'évaluation sera remis dans le délai convenu et sera utilisé pour les états financiers du Fonds.</p>
<p class="signature-block">Fait à Abidjan, le {{date_mission}}<br/>Le Fonds : _______________<br/>L'Évaluateur : _______________</p></div>`
  },
  {
    code: 'exp2_commissariat_apports', name: "Rapport de commissariat aux apports (SA/SARL)", category: 'juridique_admin',
    price: 16000, priceMax: 48000, description: "Rapport du commissaire aux apports évaluant les apports en nature dans une SA ou SARL en application de l'Acte Uniforme OHADA.", templateType: 'pdf', classe: 'A', active: true, popularity: 79,
    fieldsJson: F([
      {key:'commissaire',label:"Commissaire aux apports",type:'text',required:true},
      {key:'societe',label:"Société bénéficiaire des apports",type:'text',required:true},
      {key:'apporteur',label:"Apporteur",type:'text',required:true},
      {key:'nature_apports',label:"Nature des apports en nature",type:'textarea',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE COMMISSARIAT AUX APPORTS</h1>
<p><strong>Commissaire aux apports :</strong> {{commissaire}}<br/><strong>Société bénéficiaire :</strong> {{societe}}<br/><strong>Apporteur :</strong> {{apporteur}}<br/><strong>Date :</strong> {{date_rapport}}</p>
<h2>I. Mission</h2><p>Conformément aux articles 312 et suivants de l'Acte Uniforme OHADA relatif aux sociétés commerciales, le soussigné {{commissaire}} a été désigné pour évaluer les apports en nature.</p>
<h2>II. Nature des apports</h2><p>{{nature_apports}}</p>
<h2>III. Méthodes d'évaluation</h2><p>Les méthodes d'évaluation retenues sont présentées pour chaque apport, avec justification du choix.</p>
<h2>IV. Conclusion</h2><p>Le Commissaire certifie que la valeur des apports en nature correspond au moins à la valeur nominale des titres émis en contrepartie.</p>
<p class="signature-block">{{commissaire}}, Commissaire aux apports<br/>Le {{date_rapport}}</p></div>`
  },
  {
    code: 'exp2_commissariat_fusion', name: "Rapport de commissariat à la fusion", category: 'juridique_admin',
    price: 20000, priceMax: 60000, description: "Rapport du commissaire à la fusion vérifiant la parité d'échange proposée lors d'une opération de fusion de sociétés OHADA.", templateType: 'pdf', classe: 'A', active: true, popularity: 77,
    fieldsJson: F([
      {key:'commissaire',label:"Commissaire à la fusion",type:'text',required:true},
      {key:'societe_absorbante',label:"Société absorbante",type:'text',required:true},
      {key:'societe_absorbee',label:"Société absorbée",type:'text',required:true},
      {key:'parite_echange',label:"Parité d'échange proposée",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE COMMISSARIAT À LA FUSION</h1>
<p><strong>Commissaire à la fusion :</strong> {{commissaire}}<br/><strong>Société absorbante :</strong> {{societe_absorbante}}<br/><strong>Société absorbée :</strong> {{societe_absorbee}}<br/><strong>Date :</strong> {{date_rapport}}</p>
<h2>I. Mission</h2><p>Conformément à l'Acte Uniforme OHADA, le Commissaire a été chargé de vérifier que la parité d'échange est équitable pour les actionnaires des deux sociétés.</p>
<h2>II. Parité d'échange proposée</h2><p>{{parite_echange}}</p>
<h2>III. Méthodes d'évaluation</h2><p>Le Commissaire a utilisé les méthodes DCF, comparables et actif net réévalué pour déterminer la valeur de chaque société.</p>
<h2>IV. Avis du Commissaire</h2><p>Le Commissaire déclare que la parité d'échange est / n'est pas équitable au regard des valorisations déterminées.</p>
<p class="signature-block">{{commissaire}}<br/>Le {{date_rapport}}</p></div>`
  },
  {
    code: 'exp2_commissariat_scission', name: "Rapport de commissariat à la scission", category: 'juridique_admin',
    price: 20000, priceMax: 60000, description: "Rapport du commissaire à la scission vérifiant les conditions de répartition du patrimoine entre sociétés issues de la scission.", templateType: 'pdf', classe: 'A', active: true, popularity: 74,
    fieldsJson: F([
      {key:'commissaire',label:"Commissaire à la scission",type:'text',required:true},
      {key:'societe_scindee',label:"Société scindée",type:'text',required:true},
      {key:'societes_beneficiaires',label:"Sociétés bénéficiaires",type:'text',required:true},
      {key:'repartition_patrimoine',label:"Répartition du patrimoine proposée",type:'textarea',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE COMMISSARIAT À LA SCISSION</h1>
<p><strong>Commissaire :</strong> {{commissaire}}<br/><strong>Société scindée :</strong> {{societe_scindee}}<br/><strong>Bénéficiaires :</strong> {{societes_beneficiaires}}<br/><strong>Date :</strong> {{date_rapport}}</p>
<h2>I. Mission</h2><p>Le Commissaire est chargé de vérifier que la répartition du patrimoine entre les sociétés issues de la scission est équitable pour l'ensemble des actionnaires.</p>
<h2>II. Répartition proposée</h2><p>{{repartition_patrimoine}}</p>
<h2>III. Évaluation des apports à chaque branche</h2><p>Chaque branche d'activité apportée a été évaluée de manière indépendante selon les méthodes adaptées à sa nature.</p>
<h2>IV. Conclusion</h2><p>Le Commissaire émet son avis motivé sur l'équité de la répartition proposée.</p>
<p class="signature-block">{{commissaire}}<br/>Le {{date_rapport}}</p></div>`
  },
  {
    code: 'exp2_charte_deontologie_expert', name: "Charte de déontologie de l'expert judiciaire", category: 'juridique_admin',
    price: 4000, priceMax: 12000, description: "Charte définissant les engagements éthiques et déontologiques de l'expert judiciaire dans l'exercice de ses fonctions.", templateType: 'pdf', classe: 'A', active: true, popularity: 56,
    fieldsJson: F([
      {key:'expert_nom',label:"Nom de l'expert",type:'text',required:true},
      {key:'domaine_expertise',label:"Domaine d'expertise",type:'text',required:true},
      {key:'juridiction',label:"Juridiction de rattachement",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption de la charte",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE DÉONTOLOGIE DE L'EXPERT JUDICIAIRE</h1>
<p><strong>Expert :</strong> {{expert_nom}}<br/><strong>Domaine :</strong> {{domaine_expertise}}<br/><strong>Juridiction :</strong> {{juridiction}}<br/><strong>Adoptée le :</strong> {{date_adoption}}</p>
<h2>Principe 1 – Impartialité</h2><p>L'Expert exerce ses missions avec la plus grande impartialité, sans faveur pour l'une ou l'autre des parties, ni pour la juridiction qui l'a désigné.</p>
<h2>Principe 2 – Contradictoire</h2><p>L'Expert veille au strict respect du principe du contradictoire en convoquant toutes les parties à ses opérations d'expertise.</p>
<h2>Principe 3 – Compétence</h2><p>L'Expert n'accepte de missions que dans les domaines où sa compétence est avérée et reconnue.</p>
<h2>Principe 4 – Indépendance</h2><p>L'Expert signale immédiatement au juge tout conflit d'intérêts ou lien susceptible d'affecter son indépendance.</p>
<h2>Principe 5 – Diligence</h2><p>L'Expert s'engage à déposer ses rapports dans les délais prescrits et à informer la juridiction de toute difficulté rencontrée.</p>
<p class="signature-block">{{expert_nom}}<br/>Le {{date_adoption}}</p></div>`
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
  console.log(`Batch 57b OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
