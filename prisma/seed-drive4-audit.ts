// Seed Drive4 Audit & Contrôle de gestion — Agent Drive4-4/10 : 13 modèles convertis depuis
// le « KIT COMPLET AUDIT & CONTROLE DE GESTION » du Drive IBIG
// (dossiers MANUEL DE PROCÉDURES, CONTROLE DE COMPTES, FICHES D'ÉVALUATION).
// Sources fusionnées : FICHE 01 (acceptation client ISQC1), FICHE 02/03 (lettre de mission — déjà
// couverte par aff_lettre_mission_cac, non reprise), FICHE 08 (questionnaires fermés de CI ISA315),
// FICHE 06-Bis (rapport d'évaluation du CI / note de synthèse), FICHE 09 + « Procédures générales
// d'audit » (programme de travail), « Contrôle de comptes » par cycle (Clients, Fournisseurs,
// Immobilisations, Stocks, Trésorerie, Autres créances…), FICHE 11 (procédure audit & contrôle),
// FICHE 12 (note d'orientation / plan de mission), FICHE 13 (gestion des missions + ordre de mission),
// « Fiche d'audit de gestion », « Fiche d'évaluation des performances de gestion »,
// « Guide de gestion du risque », « Demande d'informations légales pour raison d'audit ».
// Les fichiers .xlsx et les livres numériques ont été ignorés.
// Script ADDITIF : upsert par code — n'écrase aucun template existant.
// Exécution : npx tsx prisma/seed-drive4-audit.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type DriveTemplate = {
  code: string;
  name: string;
  category: string;
  price: number;
  priceMax: number;
  description: string;
  fieldsJson: string;
  body: string;
  popularity: number;
  countriesJson?: string;
};

const F = (fields: object[]) => JSON.stringify(fields);

const AUDIT_COUNTRIES = JSON.stringify({
  OHADA: { note: 'Référentiel comptable OHADA (SYSCOHADA révisé), Acte uniforme relatif au droit comptable et à l’information financière ; missions de commissariat aux comptes régies par l’AUSCGIE (art. 694 s.).' },
  ISA: { note: 'Normes internationales d’audit (ISA), ISQC 1 (contrôle qualité), ISA 210 (lettre de mission), ISA 315 (identification et évaluation des risques via la connaissance de l’entité et du contrôle interne).' },
  FR: { note: 'Normes d’exercice professionnel (NEP) homologuées et Code de commerce (commissariat aux comptes).' },
});

const templates: DriveTemplate[] = [
  // ════════════════ ACCEPTATION & PLANIFICATION DE LA MISSION ════════════════
  {
    code: 'audit_questionnaire_acceptation_client',
    name: 'Questionnaire d’acceptation d’un nouveau client d’audit (ISQC 1)',
    category: 'juridique_admin',
    price: 2000, priceMax: 4000,
    description: 'Questionnaire de contrôle qualité préalable à l’acceptation d’une mission d’audit : profil de risque du client, indépendance et absence de conflits d’intérêts, compétences disponibles, conditions de nomination, contacts avec l’auditeur précédent et décision de l’associé responsable. Conforme à l’esprit de la norme ISQC 1.',
    fieldsJson: F([
      { key: 'cabinet', label: 'Cabinet d’audit (dénomination + adresse)', type: 'textarea', required: true },
      { key: 'client', label: 'Nom du client pressenti', type: 'text', required: true },
      { key: 'activite', label: 'Nature de l’activité du client', type: 'textarea', required: true },
      { key: 'nature_mission', label: 'Nature de la mission (audit légal / audit contractuel)', type: 'text', required: true },
      { key: 'interet_public', label: 'Le client est-il une société d’intérêt public (cotée, banque, assurance…) ? (oui / non)', type: 'text', required: true },
      { key: 'auditeur_precedent', label: 'Nom de l’auditeur précédent (le cas échéant)', type: 'text', required: false },
      { key: 'associe_responsable', label: 'Associé responsable de la décision (nom)', type: 'text', required: true },
    ]),
    body: `<div class="document"><h1>QUESTIONNAIRE D'ACCEPTATION D'UN NOUVEAU CLIENT D'AUDIT</h1><p><strong>Cabinet :</strong> {{cabinet}}<br/>Date : {{date_jour}}</p><h2>Informations sur le client et la mission</h2><p>— Nom du client : <strong>{{client}}</strong><br/>— Nature de l'activité : {{activite}}<br/>— Nature de la mission : {{nature_mission}}<br/>— Société d'intérêt public : {{interet_public}}<br/>— Auditeur précédent : {{auditeur_precedent}}</p><p><em>Société d'intérêt public : société cotée en bourse ou présentant un intérêt public notable en raison de son domaine d'activité, de sa taille, de ses effectifs et du nombre élevé d'actionnaires (établissement de crédit, compagnie d'assurance, organisme de placement collectif, entité du secteur public…).</em></p><h2>1. Profil de risque du client</h2><p>La prise de connaissance du client permet une évaluation préliminaire des risques inhérents à ses activités, à son contexte réglementaire, à sa direction et à son actionnariat. Niveaux d'appréciation : satisfaisant / moyen / faible / non applicable.</p><p>Domaines examinés — évaluation :</p><p>— Contrôle interne : __________<br/>— Principes comptables et information financière : __________<br/>— Réputation et intégrité des dirigeants : __________<br/>— Compétence et stabilité du management : __________<br/>— Clarté de la situation juridique : __________<br/>— Clarté de la situation fiscale : __________<br/>— Relations entre dirigeants, actionnaires majoritaires et minoritaires : __________<br/>— Relations avec les autorités de contrôle : __________<br/>— Respect des textes et règlements particuliers : __________<br/>— Situation financière, rentabilité : __________<br/>— Sécurité et stabilité du secteur d'activité : __________<br/>— Perspectives du marché, positionnement concurrentiel : __________</p><h2>2. Indépendance et absence de conflits d'intérêts</h2><p>— Existe-t-il des relations familiales, personnelles ou financières entre le cabinet, les associés, les membres du réseau et le client ? (oui / non)<br/>— Des prestations importantes sont-elles déjà réalisées auprès de ce client, de nature à créer des situations incompatibles avec la mission d'audit ? (oui / non)<br/>— Existe-t-il des conflits d'intérêts potentiels liés à des interventions chez un autre client ? (oui / non)<br/>— Existe-t-il un litige opposant le cabinet ou un membre du réseau au client, susceptible d'affecter l'indépendance ? (oui / non)</p><h2>3. Compétence disponible</h2><p>— L'activité de l'entité nécessite-t-elle des compétences techniques particulières que le cabinet doit acquérir ou renforcer ? (oui / non)</p><h2>4. Conditions de nomination</h2><p>— Société nouvelle (oui / non) — Non-renouvellement d'un confrère (oui / non) — Appel d'offres (oui / non) — Démission, empêchement ou décès d'un confrère (oui / non)</p><h2>5. Contacts avec l'auditeur précédent</h2><p>Les contacts pris ont-ils révélé : une limitation des contrôles ? des honoraires insuffisants ou impayés ? un problème d'indépendance ? des anomalies comptables résultant de fraudes ou d'erreurs ? d'autres obstacles à la mission ? Motifs de la démission le cas échéant : __________</p><h2>6. Budget d'honoraires</h2><p>Le budget proposé est-il suffisant compte tenu de la taille de la société, des risques et de l'environnement de contrôle ? (oui / non) — Montant proposé (en valeur et en heures) : __________</p><h2>7. Information de l'autorité de contrôle (sociétés cotées)</h2><p>L'autorité de contrôle a-t-elle été informée de notre candidature ? (oui / non) — Son avis est-il positif ? (oui / non)</p><h2>Décision de l'associé responsable</h2><p>Acceptation du mandat : oui __ / non __ / avec mesures de sauvegarde __<br/>Nom de l'associé : {{associe_responsable}}<br/>Date : ______________ — Signature : ______________</p></div>`,
    popularity: 30,
    countriesJson: AUDIT_COUNTRIES,
  },
  {
    code: 'audit_plan_mission',
    name: 'Note d’orientation / plan de mission d’audit',
    category: 'commercial_financier',
    price: 3000, priceMax: 6000,
    description: 'Note d’orientation générale (plan de mission) formalisant la stratégie d’audit : prise de connaissance de l’entité (ISA 315), seuil de signification, zones de risque significatives, approche d’audit, calendrier d’intervention, composition de l’équipe et budget de temps. Document de cadrage de la mission de commissariat aux comptes.',
    fieldsJson: F([
      { key: 'cabinet', label: 'Cabinet d’audit (dénomination)', type: 'text', required: true },
      { key: 'entite', label: 'Entité auditée (dénomination + activité + siège)', type: 'textarea', required: true },
      { key: 'exercice', label: 'Exercice audité (date de clôture)', type: 'text', required: true },
      { key: 'seuil_signification', label: 'Seuil de signification retenu (montant + base de calcul)', type: 'textarea', required: true },
      { key: 'zones_risque', label: 'Zones de risque significatives identifiées (une par ligne)', type: 'textarea', required: true },
      { key: 'equipe', label: 'Composition de l’équipe (associé signataire, directeur, chef de mission…)', type: 'textarea', required: true },
      { key: 'calendrier', label: 'Calendrier d’intervention (intérim, inventaire, contrôle des comptes, rapports)', type: 'textarea', required: true },
    ]),
    body: `<div class="document"><h1>NOTE D'ORIENTATION — PLAN DE MISSION D'AUDIT</h1><p><strong>Cabinet :</strong> {{cabinet}}<br/><strong>Entité auditée :</strong> {{entite}}<br/><strong>Exercice audité :</strong> clos le {{exercice}}<br/>Établie le {{date_jour}}.</p><h2>1. Objectif de la mission</h2><p>La présente note d'orientation formalise la stratégie générale d'audit des états financiers de l'exercice clos le {{exercice}}. Elle a pour objet de définir l'approche, l'étendue et le calendrier des travaux permettant d'émettre une opinion sur la régularité, la sincérité et l'image fidèle des comptes, conformément aux normes d'exercice professionnel applicables et aux normes internationales d'audit (ISA).</p><h2>2. Prise de connaissance de l'entité (ISA 315)</h2><p>La compréhension de l'entité et de son environnement — secteur d'activité, cadre réglementaire, organisation, système d'information et contrôle interne — sert de base à l'identification et à l'évaluation des risques d'anomalies significatives, que celles-ci résultent de fraudes ou d'erreurs.</p><h2>3. Seuil de signification</h2><p>Seuil retenu : {{seuil_signification}}. Le seuil de signification est utilisé pour planifier la nature, le calendrier et l'étendue des procédures d'audit, ainsi que pour évaluer l'incidence des anomalies relevées.</p><h2>4. Zones de risque significatives</h2><p>Les domaines et cycles suivants ont été identifiés comme porteurs de risques significatifs et feront l'objet de diligences renforcées :</p><p>{{zones_risque}}</p><h2>5. Approche d'audit</h2><p>L'approche combine : (a) une évaluation du contrôle interne des cycles significatifs et des tests de procédures lorsque nous prévoyons de nous appuyer sur les contrôles ; (b) des contrôles de substance (tests de détail et procédures analytiques) sur les soldes et flux significatifs ; (c) des procédures spécifiques sur les zones de risque identifiées et les estimations comptables.</p><h2>6. Équipe et budget de temps</h2><p>Composition de l'équipe : {{equipe}}. Un budget de temps est établi par cycle et par intervenant, incluant les revues, la préparation de la lettre de recommandations et les diligences spécifiques.</p><h2>7. Calendrier d'intervention</h2><p>{{calendrier}}</p><h2>8. Livrables attendus</h2><p>— Rapport général sur les comptes annuels ; — le cas échéant, rapport spécial sur les conventions réglementées ; — lettre de recommandations sur le contrôle interne ; — note de synthèse de la mission.</p><p class="signatures">L'associé signataire<br/>{{cabinet}}<br/>Fait le {{date_jour}}</p></div>`,
    popularity: 38,
    countriesJson: AUDIT_COUNTRIES,
  },

  // ════════════════ ÉVALUATION DU CONTRÔLE INTERNE ════════════════
  {
    code: 'audit_questionnaire_controle_interne',
    name: 'Questionnaire de contrôle interne par cycle (ISA 315)',
    category: 'juridique_admin',
    price: 2500, priceMax: 5000,
    description: 'Questionnaire fermé d’évaluation du contrôle interne, organisé par cycle (contrôles de la Direction, immobilisations, achats/fournisseurs, ventes/clients, stocks, trésorerie, paie). Chaque procédure est appréciée par Oui / Non / N-A avec zone de commentaires, en vue d’identifier les forces et faiblesses du dispositif de contrôle (ISA 315).',
    fieldsJson: F([
      { key: 'entite', label: 'Entité auditée (dénomination)', type: 'text', required: true },
      { key: 'exercice', label: 'Exercice concerné (date de clôture)', type: 'text', required: true },
      { key: 'redacteur', label: 'Auditeur ayant rempli le questionnaire (nom + initiales)', type: 'text', required: true },
      { key: 'cycles', label: 'Cycles à évaluer (facultatif — préciser si limité à certains cycles)', type: 'textarea', required: false },
    ]),
    body: `<div class="document"><h1>QUESTIONNAIRE DE CONTRÔLE INTERNE</h1><p><strong>Entité :</strong> {{entite}} — <strong>Exercice :</strong> clos le {{exercice}}<br/>Rempli par : {{redacteur}} — le {{date_jour}}</p><p>Chaque procédure est appréciée : <strong>Oui / Non / N-A</strong>, avec commentaires. Les réponses « Non » signalent une faiblesse potentielle à documenter et, le cas échéant, à reprendre dans la lettre de recommandations.</p><h2>1. Contrôles de la Direction</h2><p>— Le management est-il sensibilisé aux problèmes de contrôle ? (O/N/NA)<br/>— La Direction dispose-t-elle d'un reporting mensuel ou trimestriel et commente-t-elle les résultats obtenus ? (O/N/NA)<br/>— Existe-t-il un service d'audit interne structuré et efficace sur la période ? (O/N/NA)<br/>— Existe-t-il un service de contrôle de gestion ? (O/N/NA)</p><h2>2. Immobilisations incorporelles et corporelles</h2><p>— Les acquisitions et cessions d'immobilisations sont-elles autorisées par les personnes habilitées ? (O/N/NA)<br/>— La méthode de valorisation, d'amortissement et de dépréciation est-elle cohérente avec la nature des biens et revue chaque année ? (O/N/NA)<br/>— Un inventaire physique périodique des immobilisations est-il réalisé et rapproché du fichier des immobilisations ? (O/N/NA)<br/>— Les immobilisations non utilisées ou hors service sont-elles identifiées et traitées ? (O/N/NA)</p><h2>3. Achats / Fournisseurs</h2><p>— Les demandes d'achat font-elles l'objet de bons de commande pré-numérotés et autorisés ? (O/N/NA)<br/>— Les bons de livraison sont-ils rapprochés des commandes et des factures ? (O/N/NA)<br/>— Les factures sont-elles imputées, contrôlées et revêtues de la mention « payé » après règlement ? (O/N/NA)<br/>— La séparation des tâches (commande, réception, comptabilisation, règlement) est-elle assurée ? (O/N/NA)</p><h2>4. Ventes / Clients</h2><p>— Existe-t-il une procédure formalisée de facturation et de suivi des créances ? (O/N/NA)<br/>— Les livraisons et prestations sont-elles systématiquement facturées et rapprochées des encaissements ? (O/N/NA)<br/>— Les dépréciations de créances douteuses sont-elles évaluées périodiquement ? (O/N/NA)</p><h2>5. Stocks</h2><p>— Un inventaire physique est-il organisé et rapproché de l'inventaire permanent ? (O/N/NA)<br/>— La valorisation des stocks et la dépréciation des articles à rotation lente sont-elles maîtrisées ? (O/N/NA)</p><h2>6. Trésorerie</h2><p>— Les rapprochements bancaires sont-ils établis périodiquement et visés par un supérieur hiérarchique ? (O/N/NA)<br/>— Les pièces de caisse sont-elles signées par les personnes habilitées et le bénéficiaire ? (O/N/NA)<br/>— Un état extra-comptable de suivi des effets et chèques est-il tenu ? (O/N/NA)</p><h2>7. Personnel / Paie</h2><p>— Les éléments de paie sont-ils autorisés, contrôlés et rapprochés des états du personnel ? (O/N/NA)<br/>— Les accès aux dossiers du personnel sont-ils restreints ? (O/N/NA)</p><h2>Conclusion</h2><p>Synthèse des forces et faiblesses relevées : ______________________________</p><p class="signatures">Auditeur : {{redacteur}} — Date : {{date_jour}}</p></div>`,
    popularity: 40,
    countriesJson: AUDIT_COUNTRIES,
  },
  {
    code: 'audit_rapport_controle_interne',
    name: 'Rapport d’évaluation du contrôle interne (note de synthèse + recommandations)',
    category: 'juridique_admin',
    price: 3000, priceMax: 6000,
    description: 'Rapport d’évaluation du contrôle interne restituant, cycle par cycle, les constatations d’audit sous forme structurée (description, risque, recommandation, priorité 1/2/3). Sert de note de synthèse et de lettre de recommandations à l’attention de la direction.',
    fieldsJson: F([
      { key: 'entite', label: 'Entité auditée (dénomination)', type: 'text', required: true },
      { key: 'exercice', label: 'Exercice concerné (date de clôture)', type: 'text', required: true },
      { key: 'cycles_examines', label: 'Cycles examinés (ex. achats/fournisseurs, immobilisations, ventes/clients, trésorerie)', type: 'textarea', required: true },
      { key: 'constatations', label: 'Constatations (pour chacune : n° — intitulé — description — risque — recommandation — priorité 1/2/3), une par bloc', type: 'textarea', required: true },
      { key: 'auteur', label: 'Auteur du rapport (cabinet / auditeur)', type: 'text', required: true },
    ]),
    body: `<div class="document"><h1>RAPPORT D'ÉVALUATION DU CONTRÔLE INTERNE</h1><p><em>Note de synthèse — exercice clos le {{exercice}}</em></p><p><strong>Entité :</strong> {{entite}}<br/><strong>Auteur :</strong> {{auteur}} — le {{date_jour}}</p><h2>1. Objet et démarche</h2><p>L'évaluation du contrôle interne a pour objet d'appréhender les faiblesses dans l'exécution des activités susceptibles de porter préjudice à la structure, afin de proposer les mesures correctives. Elle a porté sur les cycles suivants : {{cycles_examines}}.</p><h2>2. Classification des recommandations par priorité</h2><p><strong>Priorité 1 — Mesure corrective requise d'urgence.</strong> Des contrôles essentiels du système de contrôle interne (SCI) font défaut ou ne sont pas respectés régulièrement. Le contrôle présente une faiblesse fondamentale entraînant un risque substantiel d'erreur, d'irrégularité ou de fraude, avec incidence possible sur les états financiers.</p><p><strong>Priorité 2 — Mesure particulière requise rapidement.</strong> Faiblesse non fondamentale exposant certains domaines du SCI à un risque moins immédiat, pouvant affecter l'efficacité des opérations et devant préoccuper la direction.</p><p><strong>Priorité 3 — Mesure corrective souhaitable.</strong> Faiblesse sans incidence majeure prise isolément, mais dont la correction améliorerait l'efficacité et l'efficience des processus.</p><h2>3. Constatations, risques et recommandations</h2><p>{{constatations}}</p><h2>4. Conclusion générale</h2><p>Les faiblesses relevées ci-dessus appellent la mise en œuvre d'un plan d'action, hiérarchisé selon les priorités indiquées, sous la responsabilité de la direction. Le suivi de la mise en œuvre des recommandations fera l'objet d'une revue lors de la prochaine intervention.</p><p class="signatures">{{auteur}}<br/>Fait le {{date_jour}}</p></div>`,
    popularity: 44,
    countriesJson: AUDIT_COUNTRIES,
  },
  {
    code: 'audit_procedure_controle_interne',
    name: 'Procédure d’audit et de contrôle interne',
    category: 'juridique_admin',
    price: 2500, priceMax: 5000,
    description: 'Procédure interne décrivant le dispositif d’audit et de contrôle : nature des contrôles (contrôle interne permanent, audit financier indépendant), sélection de l’auditeur, programmation et exécution des travaux, examen des rapports et suivi des recommandations. Document de gouvernance pour une entité ou un projet.',
    fieldsJson: F([
      { key: 'organisation', label: 'Organisation / projet concerné (dénomination)', type: 'textarea', required: true },
      { key: 'responsable_ci', label: 'Responsable du contrôle interne (fonction, ex. Responsable financier / RAF)', type: 'text', required: true },
      { key: 'periodicite_reporting', label: 'Périodicité du rapport interne de contrôle (ex. trimestriel)', type: 'text', required: true },
      { key: 'mode_selection', label: 'Mode de sélection de l’auditeur externe (ex. qualité-coût, moins-disant)', type: 'text', required: true },
    ]),
    body: `<div class="document"><h1>PROCÉDURE D'AUDIT ET DE CONTRÔLE</h1><p><strong>Organisation :</strong> {{organisation}}<br/>Applicable à compter du {{date_jour}}.</p><h2>1. Nature des contrôles</h2><p>Toutes les activités sont soumises aux types de contrôles suivants : le contrôle interne ; l'audit financier indépendant ; les autres contrôles externes.</p><h3>1.1. Contrôle interne</h3><p>Le contrôle interne est l'ensemble des dispositifs de sécurité permettant d'assurer la fiabilité de l'information produite et la sauvegarde du patrimoine. Il est exercé a priori dans toutes les transactions, de manière permanente, à travers la mise en œuvre des procédures. {{responsable_ci}} veille au maintien d'un bon système de contrôle interne et en assure la surveillance permanente. En l'absence d'auditeur interne, {{responsable_ci}} établit, avec une périodicité {{periodicite_reporting}}, un rapport sur le contrôle interne résumant les points forts et les faiblesses, formulant les recommandations nécessaires et proposant un plan d'action de mise en œuvre.</p><h3>1.2. Audit financier indépendant</h3><p>L'audit financier indépendant est un examen a posteriori des états financiers par un cabinet reconnu, conduit selon les normes internationales d'audit (ISA). Il vise à vérifier que les états financiers sont présentés conformément au référentiel comptable applicable et aux principes et méthodes comptables. L'auditeur produit au moins une fois par an un rapport d'audit reflétant : son opinion sur les états financiers ; la certification de l'utilisation des comptes ; une lettre de contrôle interne à l'attention de la direction.</p><h2>2. Sélection de l'auditeur</h2><p>L'auditeur est sélectionné selon la procédure de passation applicable, sur la base d'une demande de propositions comprenant la lettre d'invitation, la liste des cabinets consultés, les termes de référence, les modalités de présentation et d'évaluation des propositions et le projet de contrat. Mode de sélection retenu : {{mode_selection}}.</p><h2>3. Programmation des travaux</h2><p>Une programmation annuelle est convenue avec l'auditeur retenu : interventions en cours d'exercice (appréciation du contrôle interne, audit des relevés de dépenses) et interventions après clôture (contrôle des comptes).</p><h2>4. Points de contrôle</h2><p>Les principaux points de contrôle couvrent : les procédures budgétaires ; l'engagement des dépenses ; les décaissements ; la sauvegarde des biens ; l'éligibilité des dépenses ; les rapprochements bancaires ; la justification des comptes de patrimoine ; la présentation des états financiers ; le respect des principes et normes comptables.</p><h2>5. Exécution de l'audit</h2><p>La mise en œuvre comprend : l'organisation d'une réunion préparatoire ; la désignation d'un coordinateur de mission (interlocuteur privilégié de l'auditeur) ; la réglementation de la communication des informations (documents visés et remis avec décharge) ; la séance de débriefing des conclusions provisoires.</p><h2>6. Examen des rapports et suivi des recommandations</h2><p>À réception des projets de rapport, chaque responsable prépare une réponse aux observations relevant de sa compétence. {{responsable_ci}} consolide les réponses, qui sont prises en compte dans la version finale. Il assure ensuite le suivi de la mise en œuvre des recommandations acceptées et documente, le cas échéant, les motifs de non-application.</p><p class="signatures">Validé par la Direction<br/>{{organisation}} — le {{date_jour}}</p></div>`,
    popularity: 34,
    countriesJson: AUDIT_COUNTRIES,
  },

  // ════════════════ PROGRAMMES DE TRAVAIL ════════════════
  {
    code: 'audit_programme_travail_general',
    name: 'Programme de travail d’audit — procédures générales',
    category: 'commercial_financier',
    price: 3000, priceMax: 6000,
    description: 'Programme de travail général d’audit couvrant la planification, les tests sur l’accumulation des données comptables, les opérations avec les sociétés liées, les engagements hors bilan et passifs éventuels, les actes illégaux et la revue finale des états financiers audités. Check-list détaillée avec colonnes de référencement et d’initiales.',
    fieldsJson: F([
      { key: 'entite', label: 'Entité auditée (dénomination)', type: 'text', required: true },
      { key: 'exercice', label: 'Exercice audité (date de clôture)', type: 'text', required: true },
      { key: 'seuil', label: 'Seuil de sélection des éléments inhabituels/significatifs (montant)', type: 'text', required: true },
      { key: 'chef_mission', label: 'Chef de mission responsable du programme (nom + initiales)', type: 'text', required: true },
    ]),
    body: `<div class="document"><h1>PROGRAMME DE TRAVAIL D'AUDIT — PROCÉDURES GÉNÉRALES</h1><p><strong>Entité :</strong> {{entite}} — <strong>Exercice :</strong> clos le {{exercice}}<br/>Chef de mission : {{chef_mission}} — Référence / initiales à renseigner en regard de chaque étape.</p><h2>A. Planification</h2><p>1. Prendre connaissance / mettre à jour notre connaissance de l'activité du client, effectuer les procédures d'examen analytique global, évaluer l'environnement de contrôle et la manière dont la direction contrôle l'activité.<br/>2. Déterminer les comptes ou groupes de comptes significatifs et le seuil de signification préliminaire.<br/>3. Identifier les sources d'informations affectant les comptes significatifs.<br/>4. Préparer le plan de mission.<br/>5. Pour les cycles de données répétitives : comprendre et documenter le flux des documents et des traitements ; déterminer les types d'erreur possibles et évaluer le risque ; pour les risques élevés, identifier les comptes affectés et prévoir les tests correspondants.<br/>6. Pour chaque compte ou groupe significatif, préparer un plan d'approche / programme de travail.<br/>7. Préparer un budget de temps incluant les revues, la lettre de recommandations et les prestations spécifiques.<br/>8. Déterminer les états et informations à préparer par le client (liste écrite).</p><h2>B. Tests sur l'accumulation et la centralisation des données comptables</h2><p>9. Rechercher dans les comptes du grand-livre et les journaux les éléments inhabituels ou significatifs (supérieurs à {{seuil}}).<br/>10. Tester les enregistrements des journaux d'opérations diverses et autres journaux.<br/>11. Pointer les soldes d'ouverture avec les dossiers de travail de l'exercice précédent.</p><h2>C. Opérations avec les sociétés liées</h2><p>12. Évaluer les procédures du client pour identifier et comptabiliser ces opérations.<br/>13. Obtenir la liste des sociétés liées et la communiquer à l'équipe.<br/>14. Enquêter sur l'existence d'opérations significatives (supérieures à {{seuil}}) ou inhabituelles, en particulier à une date proche de la clôture, et établir une feuille récapitulative (nature, modalités, description en annexe).</p><h2>D. Engagements hors bilan et passifs éventuels</h2><p>15. Enquêter auprès de la direction sur les passifs éventuels (litiges, procès en cours).<br/>16. Examiner contrats d'emprunt, crédits-bails, confirmations bancaires et correspondance d'avocats.<br/>17. Demander la confirmation des avocats consultés et rapprocher les réponses de la demande d'informations.<br/>18. Vérifier que les litiges sont provisionnés ou mentionnés en annexe et apprécier l'incidence sur le rapport.<br/>19. Enquêter sur les engagements importants (achats/ventes, immobilisations, effets escomptés non échus, opérations en devises, crédit-bail, retraites).</p><h2>E. Erreurs, irrégularités et actes illégaux</h2><p>20. Enquêter auprès de la direction générale sur la connaissance d'erreurs, irrégularités ou actes illégaux, l'existence de politiques de prévention et leurs modalités de contrôle.<br/>21. Si une irrégularité est suspectée ou détectée, se conformer aux procédures prévues par le cabinet.</p><h2>F. Revue des états financiers audités</h2><p>22. Référencer les montants de la balance avec les dossiers de travail et les états financiers.<br/>23. Vérifier l'exactitude arithmétique et l'exhaustivité des états financiers.<br/>24. Prendre connaissance des procès-verbaux (conseil, assemblée, direction) jusqu'à la date du rapport.<br/>25. Revoir les événements postérieurs à la clôture.<br/>26. Effectuer une revue analytique finale par comparaison avec l'exercice précédent.<br/>27. Obtenir la lettre d'affirmation datée à proximité du rapport.<br/>28. Apprécier la continuité d'exploitation.<br/>29. Rédiger la note de synthèse et la synthèse des ajustements non comptabilisés.<br/>30. Rédiger la lettre de recommandations et tenir la réunion de clôture avec le client.</p><p class="signatures">Chef de mission : {{chef_mission}} — Date : {{date_jour}}</p></div>`,
    popularity: 42,
    countriesJson: AUDIT_COUNTRIES,
  },
  {
    code: 'audit_programme_controle_comptes',
    name: 'Programme de contrôle des comptes par cycle',
    category: 'commercial_financier',
    price: 3500, priceMax: 6000,
    description: 'Programme de travail de contrôle des comptes déclinable par cycle du bilan et du compte de résultat (immobilisations, stocks, clients, fournisseurs, trésorerie, autres créances, capitaux propres, dettes, charges et produits). Pour chaque poste : procédures de validité fondées sur l’évaluation du risque (rapprochements, confirmations, dépréciations, cut-off, annexe).',
    fieldsJson: F([
      { key: 'entite', label: 'Entité auditée (dénomination)', type: 'text', required: true },
      { key: 'exercice', label: 'Exercice audité (date de clôture)', type: 'text', required: true },
      { key: 'cycle', label: 'Cycle / poste contrôlé (ex. Clients, Fournisseurs, Immobilisations, Stocks, Trésorerie, Autres créances)', type: 'text', required: true },
      { key: 'seuil', label: 'Seuil de contrôle / de confirmation directe (montant)', type: 'text', required: true },
      { key: 'auditeur', label: 'Auditeur en charge du cycle (nom + initiales)', type: 'text', required: true },
    ]),
    body: `<div class="document"><h1>PROGRAMME DE CONTRÔLE DES COMPTES — CYCLE {{cycle}}</h1><p><strong>Entité :</strong> {{entite}} — <strong>Exercice :</strong> clos le {{exercice}}<br/>Cycle contrôlé : <strong>{{cycle}}</strong> — Auditeur : {{auditeur}}<br/>Référence F/T et initiales à renseigner en regard de chaque procédure.</p><p><em>Sur la base de notre évaluation du risque, les procédures de validité à mettre en œuvre sur les comptes de ce cycle sont les suivantes.</em></p><h2>1. Prise de connaissance et cohérence d'ensemble</h2><p>1. Comparer les soldes de l'exercice avec ceux des exercices précédents et enquêter sur les variations inattendues (ou l'absence de variation attendue).<br/>2. Obtenir le détail des comptes du cycle {{cycle}}, pointer le solde du bilan avec le grand-livre et, lorsqu'il existe une balance auxiliaire, la réconcilier avec le grand-livre et analyser tout écart.</p><h2>2. Contrôles de substance sur les soldes</h2><p>3. Pour les soldes supérieurs à {{seuil}}, procéder à une demande de confirmation directe auprès des tiers (clients, fournisseurs, banques, débiteurs/créanciers divers) et, en cas de non-réponse, mettre en œuvre les procédures alternatives (vérification des encaissements/décaissements ultérieurs, rapprochement avec les pièces justificatives).<br/>4. À défaut de confirmation, analyser les montants composant le solde et les valider à l'aide des justificatifs.<br/>5. Vérifier l'ancienneté des montants et la correcte conversion des éléments libellés en devises au taux de clôture.</p><h2>3. Dépréciations et provisions</h2><p>6. Vérifier que les provisions pour dépréciation couvrent de façon adéquate les risques de non-recouvrement ou de perte de valeur : obtenir les mouvements de l'exercice, contrôler le caractère opportun de la provision à l'aide des pièces justificatives, vérifier les calculs et le caractère suffisant du taux, s'assurer que les montants provisionnés sont hors taxes.<br/>7. Rechercher les montants anciens (revue par ancienneté ou par retard de règlement) et s'assurer qu'aucun autre montant n'aurait dû être provisionné.</p><h2>4. Séparation des exercices (cut-off) et exhaustivité</h2><p>8. Faire une revue des mouvements postérieurs à la clôture pour s'assurer qu'aucun élément à rattacher à l'exercice n'a été omis.<br/>9. Contrôler le rattachement des charges et produits à l'exercice (factures à recevoir/à établir, charges et produits constatés d'avance).</p><h2>5. Présentation et annexe</h2><p>10. Vérifier que toutes les informations relatives au cycle {{cycle}} figurent en annexe afin que les états de synthèse donnent une image fidèle du patrimoine, de la situation financière et du résultat, et en apprécier la régularité et la sincérité.</p><h2>Conclusion sur le cycle</h2><p>Conclusion de l'auditeur sur le cycle {{cycle}} : ______________________________</p><p class="signatures">Auditeur : {{auditeur}} — Date : {{date_jour}}</p></div>`,
    popularity: 46,
    countriesJson: AUDIT_COUNTRIES,
  },

  // ════════════════ AUDIT DE GESTION & CONTRÔLE DE GESTION ════════════════
  {
    code: 'audit_fiche_audit_gestion',
    name: 'Fiche d’audit de gestion de l’entreprise (diagnostic global)',
    category: 'commercial_financier',
    price: 2500, priceMax: 5000,
    description: 'Questionnaire de diagnostic global d’audit de gestion couvrant l’ensemble des fonctions de l’entreprise : production/opérations, marketing, recherche et développement, finance/comptabilité, management, ressources humaines et systèmes d’information. Réponses par Oui / Non pour repérer forces, faiblesses et pistes d’amélioration.',
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise auditée (dénomination)', type: 'text', required: true },
      { key: 'auteur', label: 'Réalisé par (nom + fonction)', type: 'text', required: true },
      { key: 'perimetre', label: 'Périmètre / fonctions à auditer en priorité (facultatif)', type: 'textarea', required: false },
    ]),
    body: `<div class="document"><h1>FICHE D'AUDIT DE GESTION DE L'ENTREPRISE</h1><p><strong>Entreprise :</strong> {{entreprise}}<br/>Réalisé par : {{auteur}} — le {{date_jour}}</p><p>Répondre par <strong>Oui / Non</strong> à chaque question et commenter les réponses négatives, qui constituent des axes d'amélioration prioritaires.</p><h2>1. Production / Opérations</h2><p>— Approvisionnement : fournisseurs fiables à prix raisonnables ? programme d'approvisionnement ?<br/>— Contrôle des stocks : politiques et procédures efficaces ? taux de rotation connu ? gestion des stocks à rotation lente ?<br/>— Planification : objectifs de production définis ? durée des activités maîtrisée ?<br/>— Qualité : niveau de qualité estimé ? taux de retour minimisés ? démarche « bien faire du premier coup » ?<br/>— Installations : localisation stratégique ? matériels fonctionnels ? capacité et sécurité appropriées ?<br/>— Assurance : révision annuelle ? risques couverts de façon adéquate ?</p><h2>2. Marketing</h2><p>— Prix adéquats et fondés sur la structure des coûts ?<br/>— Étude de marché exploitée ? marchés cibles et segments identifiés ? part de marché suivie ?<br/>— Service à la clientèle efficace ? plaintes traitées efficacement ? avis clients sollicités ?<br/>— Publicité et relations publiques efficaces ? budget adapté à la croissance ?<br/>— Gestion des ventes : force de vente efficace ? objectifs individuels ? vendeurs formés ?<br/>— Planification marketing : budget et plan marketing formalisés ?</p><h2>3. Recherche et développement</h2><p>— Équipements et personnel R&D adéquats ? culture d'innovation ? produits technologiquement compétitifs ? délais de développement raisonnables ?</p><h2>4. Finance / Comptabilité</h2><p>— Analyse financière : entreprise saine selon les ratios ? fonds de roulement suffisant ? relations créanciers/actionnaires satisfaisantes ?<br/>— Comptabilité : livres adéquats et accessibles ? compte de résultat mensuel ? états financiers annuels ?<br/>— Budgétisation : objectifs financiers définis ? budget de trésorerie ? analyse mensuelle des écarts ?<br/>— Contrôle des coûts : budget utilisé comme principal outil de contrôle ?<br/>— Recouvrement des créances : politique efficace et révisée régulièrement ?<br/>— Financement : capacité à lever des ressources court et long terme ? relations bancaires saines ?<br/>— Outils : seuil de rentabilité, prévisions de trésorerie, analyse des ratios utilisés ?</p><h2>5. Management</h2><p>— Management stratégique : objectifs clairs, mesurables et communiqués ? structure appropriée ? vision et mission formulées ?<br/>— Archivage : traçabilité des transactions ? conservation légale ? accès restreint aux dossiers ?<br/>— Décision et résolution de problèmes : processus formalisés ?<br/>— Conformité réglementaire, leadership, droit commercial, recours aux conseils externes.</p><h2>6. Ressources humaines</h2><p>— Recrutement : candidats compétents attirés ? procédures de sélection efficaces ?<br/>— Formation : descriptions de poste claires ? besoins de formation couverts ?<br/>— Motivation : moral, rotation, rémunération et récompenses adaptés ?<br/>— Communication et politiques d'appui : évaluations à temps ? réglementation respectée ?</p><h2>7. Systèmes et technologies de l'information</h2><p>— Collecte et diffusion de l'information efficaces ? information à jour et sécurisée ? outils utilisés pour la décision ? personnel qualifié ?</p><p class="signatures">{{auteur}} — {{entreprise}} — le {{date_jour}}</p></div>`,
    popularity: 40,
    countriesJson: AUDIT_COUNTRIES,
  },
  {
    code: 'audit_evaluation_performances_gestion',
    name: 'Fiche d’évaluation des performances de gestion',
    category: 'commercial_financier',
    price: 2000, priceMax: 4500,
    description: 'Grille d’auto-évaluation des performances de gestion : plan d’affaires, plan marketing, pilotage budgétaire et états financiers, système d’information, financement, valorisation de l’entreprise, production/qualité, politique RH et compétences managériales du dirigeant. Support de contrôle de gestion et de diagnostic de pilotage.',
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise (dénomination)', type: 'text', required: true },
      { key: 'evaluateur', label: 'Évaluateur (nom + fonction)', type: 'text', required: true },
    ]),
    body: `<div class="document"><h1>FICHE D'ÉVALUATION DES PERFORMANCES DE GESTION</h1><p><strong>Entreprise :</strong> {{entreprise}}<br/>Par : {{evaluateur}} — le {{date_jour}}</p><p>Répondre par <strong>Oui / Non</strong>. Chaque « Non » identifie un levier d'amélioration du pilotage.</p><h2>1. Plan d'affaires</h2><p>Nous fonctionnons avec un plan d'affaires complet et récent incluant : des prévisions annuelles et triennales ; un budget d'investissement.</p><h2>2. Plan marketing annuel</h2><p>Il inclut : objectifs de ventes et de profit précis avec calendrier ; stratégies et tactiques à trois ans ; budgets, prévisions et repères ; plan provisoire des ventes ; aspects démographiques des marchés cibles ; définition claire des marchés ; besoins/désirs satisfaits par nos produits ; analyse du potentiel de croissance ; analyse concurrentielle ; argument unique de vente ; calendriers de R&D.</p><h2>3. Budgets mensuels et états financiers</h2><p>Enregistrements comptables détaillés et à jour ; budget de financement ; compte de résultat ; bilan ; analyse des écarts ; analyse des ratios ; comparaison des coûts standards ; inventaire de liquidité.</p><h2>4. Système d'information</h2><p>Il nous permet d'être informés des nouveaux développements du secteur, d'obtenir et étudier les informations commerciales clés, de fournir aux clients la meilleure information disponible et d'assurer une bonne circulation de l'information en interne.</p><h2>5. Financement efficient</h2><p>Financement fondé sur une planification prévoyant les cas extrêmes ; fonds de secours disponibles ou accessibles ; sujet discuté avec le banquier.</p><h2>6. Valorisation de l'entreprise</h2><p>Recours à des experts professionnels ; méthodes de valeur actualisée ; conseiller fiscal pour la planification ; informations financières exactes et à temps.</p><h2>7. Production, qualité et opérations</h2><p>Outil de production en bon état ; normes de performance de haut niveau ; maîtrise des produits et services ; aucune tolérance pour la mauvaise qualité ; image de l'entreprise utilisée comme référence.</p><h2>8. Politiques de ressources humaines</h2><p>Listes de contrôle des objectifs ; communication des objectifs ; descriptions de poste ; évaluations des performances et amélioration continue ; pratiques légales d'embauche ; échelles de salaires conformes.</p><h2>9. Compétences personnelles et managériales du dirigeant</h2><p>Développer sa capacité à résoudre les problèmes ; rester calme et objectif ; éviter les investissements d'ego ; écouter les employés ; planifier les imprévus ; décider rapidement ; comprendre les faits derrière les problèmes ; accepter ses limites ; déléguer ; analyser les options ; lire et se former ; évaluer les risques ; rester positif avec clients, employés et associés.</p><p class="signatures">{{evaluateur}} — {{entreprise}} — le {{date_jour}}</p></div>`,
    popularity: 32,
    countriesJson: AUDIT_COUNTRIES,
  },

  // ════════════════ GESTION DES RISQUES & DILIGENCES ════════════════
  {
    code: 'audit_gestion_risque',
    name: 'Guide de gestion du risque (check-list de dispositif)',
    category: 'juridique_admin',
    price: 2000, priceMax: 4000,
    description: 'Check-list de mise en place d’un dispositif de gestion des risques et litiges : documentation des relations importantes, procédures de gestion du personnel, respect des obligations légales, relations de travail, organisation apprenante, besoins d’assurance et politiques de reconnaissance. Outil de prévention et de maîtrise des risques opérationnels et juridiques.',
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise (dénomination)', type: 'text', required: true },
      { key: 'responsable', label: 'Responsable du dispositif de gestion des risques (nom + fonction)', type: 'text', required: true },
      { key: 'risques_prioritaires', label: 'Risques prioritaires identifiés (facultatif)', type: 'textarea', required: false },
    ]),
    body: `<div class="document"><h1>GUIDE DE GESTION DU RISQUE</h1><p><strong>Entreprise :</strong> {{entreprise}}<br/>Responsable : {{responsable}} — le {{date_jour}}</p><p>Pour affronter les risques et litiges inhérents à une économie fluctuante, l'entreprise doit mettre en place un dispositif de gestion intégrant les éléments fondamentaux ci-après. Cocher les éléments en place et planifier les éléments manquants.</p><h2>1. Documentation de toutes les relations importantes</h2><p>Contrats de travail avec tous les employés ; contrats de collaboration avec les indépendants et le personnel externe ; contrats de partenariat stratégique ; clauses de « libre choix » dans le manuel de procédures et les offres d'emploi.</p><h2>2. Procédures de gestion du personnel</h2><p>Identification des besoins ; décisions d'habilitation au recrutement ; évaluation et amélioration des performances ; gestion des rémunérations ; sanctions et fins de contrat ; tenue des dossiers du personnel ; promotions ; prévention et gestion des contentieux ; accords de rupture ; références sur les anciens employés.</p><h2>3. Respect des obligations légales de l'entreprise</h2><p>Rappels dans les avis de recrutement, formulaires et manuel de procédures ; formation à la prévention du harcèlement et de la discrimination ; aménagements pour les employés handicapés ; mécanisme de gestion des fautes ; traitement rapide des plaintes ; procédures disciplinaires ; conformité aux exigences de traitement et d'allocation ; classification correcte des employés et des indépendants ; normes de sécurité.</p><h2>4. Bonnes relations de travail</h2><p>Rédaction d'un manuel de procédures révisé par un juriste ; climat de confiance (délégation, contrats de performance, développement personnel) ; canaux de communication ; épanouissement des individus (santé, gestion du stress, du temps) ; gestion des télétravailleurs et des chantiers délocalisés.</p><h2>5. Organisation apprenante</h2><p>Partage d'une vision et d'une mission claires ; systèmes de suggestion et de feed-back ; intégration des systèmes financiers au système d'information ; identification et protection de la propriété intellectuelle (secrets commerciaux, non-concurrence, brevets, droits d'auteur, licences) ; politiques de confidentialité pour messagerie, e-mail et Internet.</p><h2>6. Besoins d'assurance</h2><p>Couverture des employés ; risques des dirigeants et cadres ; risques généraux, liés au personnel, professionnels et financiers.</p><h2>7. Reconnaissance et récompense</h2><p>Système de rémunération créateur de valeur ; avantages sociaux proactifs ; célébration des événements importants et des réalisations d'objectifs.</p><p class="signatures">{{responsable}} — {{entreprise}} — le {{date_jour}}</p></div>`,
    popularity: 26,
    countriesJson: AUDIT_COUNTRIES,
  },
  {
    code: 'audit_demande_informations_legales',
    name: 'Demande d’informations légales aux avocats (circularisation d’audit)',
    category: 'juridique_admin',
    price: 1500, priceMax: 3000,
    description: 'Lettre de circularisation adressée au cabinet d’avocats de l’entité auditée dans le cadre de la certification des comptes : confirmation de l’existence ou de l’absence de litiges, plaintes et poursuites en cours ou éventuels, avec indication des parties et des montants engagés. Diligence d’audit sur les passifs éventuels.',
    fieldsJson: F([
      { key: 'societe', label: 'Société demanderesse (dénomination + adresse)', type: 'textarea', required: true },
      { key: 'destinataire', label: 'Cabinet d’avocats destinataire (nom + adresse)', type: 'textarea', required: true },
      { key: 'date_cloture', label: 'Date de clôture de l’exercice audité', type: 'date', required: true },
      { key: 'auditeurs', label: 'Auditeurs / commissaires aux comptes (nom + adresse d’envoi de la copie)', type: 'textarea', required: true },
      { key: 'signataire', label: 'Signataire (nom + titre + coordonnées)', type: 'textarea', required: true },
      { key: 'fondement', label: 'Fondement de la demande (loi / norme professionnelle invoquée)', type: 'text', required: false },
    ]),
    body: `<div class="document"><h1>DEMANDE D'INFORMATIONS LÉGALES POUR RAISON D'AUDIT</h1><p>{{societe}}</p><p>Le {{date_jour}}</p><p>À l'attention de : {{destinataire}}</p><p><strong>Objet : Demande d'informations légales pour raison d'audit</strong></p><p>Madame, Monsieur,</p><p>Nos auditeurs sont actuellement à pied d'œuvre pour la certification de nos états financiers au titre de l'exercice clos le {{date_cloture}}.</p><p>Nous avons pu déterminer qu'il n'existe, à notre connaissance et à cette date, aucune poursuite en cours ni éventuelle à l'encontre de notre société.</p><p>Nous vous prions de bien vouloir confirmer que votre cabinet agit pour notre entreprise et qu'il n'existe aucune plainte ou poursuite pour laquelle le conseil ou la représentation de votre cabinet a été sollicité.</p><p>Si vous avez connaissance d'une telle plainte ou d'un tel litige, nous vous prions d'indiquer le nom des parties concernées ainsi que le montant des sommes engagées.</p><p>La présente demande est introduite conformément à {{fondement}}.</p><p>Nous vous prions d'adresser votre réponse à notre société et d'en envoyer une copie signée à nos auditeurs : {{auditeurs}}.</p><p>Recevez, Madame, Monsieur, l'assurance de nos salutations distinguées.</p><p class="signatures">{{signataire}}<br/>Pour {{societe}}</p></div>`,
    popularity: 22,
    countriesJson: AUDIT_COUNTRIES,
  },

  // ════════════════ GOUVERNANCE DE LA MISSION ════════════════
  {
    code: 'audit_procedure_gestion_missions',
    name: 'Procédure de gestion des missions + ordre de mission',
    category: 'juridique_admin',
    price: 2000, priceMax: 4000,
    description: 'Procédure de gestion des missions (déplacements) internes et externes : mentions et signature de l’ordre de mission, indemnités et barèmes, prévisions budgétaires, paiement et justification des avances de frais, rapport de mission et gestion des missions urgentes. Inclut un modèle d’ordre de mission et d’état de prise en charge des perdiems.',
    fieldsJson: F([
      { key: 'organisation', label: 'Organisation / projet (dénomination)', type: 'text', required: true },
      { key: 'signataire_om', label: 'Autorité habilitée à signer les ordres de mission (fonction)', type: 'text', required: true },
      { key: 'coordinateur', label: 'Coordinateur / responsable financier des missions (fonction)', type: 'text', required: true },
      { key: 'bareme', label: 'Barème des indemnités (intérieur / Afrique / reste du monde, avec part non justifiable)', type: 'textarea', required: true },
      { key: 'delai_justification', label: 'Délai de justification des avances après la mission (en jours)', type: 'text', required: true },
    ]),
    body: `<div class="document"><h1>PROCÉDURE DE GESTION DES MISSIONS</h1><p><strong>Organisation :</strong> {{organisation}}<br/>Applicable à compter du {{date_jour}}.</p><h2>1. Ordre de mission</h2><p>Le document principal de la gestion des missions est l'<strong>ordre de mission</strong>. Il comporte obligatoirement : la destination ; le motif ; les dates (ou la durée) de départ et de retour ; les noms des personnes concernées ; le cas échéant le nom du chauffeur et les références du véhicule ; l'imputation budgétaire ; la signature du responsable. Les ordres de mission sont signés par : {{signataire_om}}.</p><h2>2. Indemnités de mission</h2><p>Chaque employé en mission a droit à des indemnités couvrant les frais inhérents (hébergement justifiable ; restauration et déplacements locaux non justifiables). Barème applicable : {{bareme}}. Tout reliquat doit être reversé.</p><h2>3. Prévisions budgétaires</h2><p>Le budget des missions doit refléter le programme d'activités ; sa réalisation doit être conforme au budget. Un contrôle rigoureux de cette rubrique est assuré afin d'éviter les abus ou les missions sans intérêt réel.</p><h2>4. Paiement des frais de mission</h2><p>1) {{coordinateur}} dresse une note de frais (fiche de perdiems) et l'ordre de paiement provisoire, soumis à signature ; 2) le bénéficiaire signe l'ordre de mission et le transmet pour contrôle ; 3) le contrôle de conformité est effectué avant traitement ; 4) le comptable procède au virement ou établit le chèque, remis au bénéficiaire qui émarge.</p><h2>5. Justification des avances</h2><p>L'avance versée (généralement 80 % des indemnités) couvre les frais justifiables. Dans un délai de <strong>{{delai_justification}} jours</strong> après la fin de la mission, le chef de mission présente à {{coordinateur}} un état de justification des avances. Au vu de cet état, un ordre de paiement définitif est établi pour les montants effectivement justifiés. Les indemnités justifiables non justifiées doivent être remboursées ; à défaut, elles sont prélevées sur le salaire du mois suivant. Aucune nouvelle avance n'est versée à un bénéficiaire n'ayant pas justifié ses frais antérieurs.</p><h2>6. Rapport de mission</h2><p>Le rapport de mission fait la synthèse du déroulement de la mission et des détails importants. Il est appuyé par les pièces justificatives des dépenses et approuvé par le responsable hiérarchique. Il conditionne le versement ou le remboursement du reliquat des indemnités.</p><h2>7. Missions urgentes</h2><p>En cas de mission non programmée, le demandeur établit une demande de déplacement motivée ; un ordre de mission est établi et signé, accompagné d'une note explicative de l'urgence ; le règlement et la justification suivent la procédure ci-dessus.</p><h2>Annexe — Modèle d'ordre de mission</h2><p>ORDRE DE MISSION N° ______ — Date : ____________<br/>Imputation budgétaire : ____________ — Nom et prénoms : ____________<br/>Fonction / poste : ____________ — Matricule : ____________<br/>Destination : ____________ — Motif : ____________<br/>Nombre de jours : ______ — Date de départ : ______ — Date de retour : ______<br/>Moyen de transport : ____________ — Visa du contrôleur financier : ____________<br/>Décision / signature de {{signataire_om}} : ____________</p><h2>Annexe — État de prise en charge des frais de mission (perdiems)</h2><p>N° de l'ordre de mission : ____________ — Destination : ____________<br/>Perdiems : Nom &amp; prénoms / Fonction / Nombre de jours / Taux / Montant / Émargement<br/>Autres frais à justifier : détail / montant / observations<br/>Total frais de mission : ____________<br/>Chef de mission — {{coordinateur}} — Approbation de la Direction</p><p class="signatures">Validé par la Direction<br/>{{organisation}} — le {{date_jour}}</p></div>`,
    popularity: 28,
    countriesJson: AUDIT_COUNTRIES,
  },
];

async function main() {
  let created = 0;
  let updated = 0;
  const byCategory: Record<string, number> = {};

  for (const t of templates) {
    const data = {
      code: t.code,
      name: t.name,
      category: t.category,
      description: t.description,
      price: t.price,
      priceMax: t.priceMax,
      fieldsJson: t.fieldsJson,
      body: t.body,
      popularity: t.popularity,
      countriesJson: t.countriesJson ?? null,
    };
    const existing = await prisma.documentTemplate.findUnique({ where: { code: t.code } });
    await prisma.documentTemplate.upsert({ where: { code: t.code }, update: data, create: data });
    if (existing) updated += 1; else created += 1;
    byCategory[t.category] = (byCategory[t.category] ?? 0) + 1;
  }

  const total = await prisma.documentTemplate.count();
  const withCountries = templates.filter((t) => t.countriesJson).length;

  console.log('✅ Seed Drive4 Audit & Contrôle de gestion terminé.');
  console.log(`   Templates du script : ${templates.length} (créés : ${created}, mis à jour : ${updated})`);
  console.log('   Répartition par catégorie (ce script) :');
  for (const [cat, n] of Object.entries(byCategory)) console.log(`     - ${cat} : ${n}`);
  console.log(`   Variantes pays (countriesJson) : ${withCountries} templates`);
  console.log(`   ➜ Total de templates en base : ${total}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
