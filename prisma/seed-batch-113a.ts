import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ── Comptabilité générale ──────────────────────────────────────────────────
  {
    code: 'cpta_tenue_comptabilite',
    name: "Accord de service de tenue de comptabilité (PCG-CI SYSCOHADA)",
    category: 'comptabilite_audit',
    price: 6000, priceMax: 18000,
    description: "Convention de prestation de tenue de comptabilité selon le Plan Comptable Général de Côte d'Ivoire et le référentiel SYSCOHADA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 88,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'cabinet_nom',label:"Nom du cabinet comptable",type:'text',required:true},
      {key:'date_debut',label:"Date de début de mission",type:'date',required:true},
      {key:'exercice',label:"Exercice comptable concerné",type:'text',required:true},
      {key:'honoraires_mensuels',label:"Honoraires mensuels (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TENUE DE COMPTABILITÉ</h1><h2>PCG-CI / SYSCOHADA</h2><p>Entre <strong>{{client_nom}}</strong> (ci-après «le Client») et <strong>{{cabinet_nom}}</strong> (ci-après «le Prestataire»),</p><p>Il est convenu ce qui suit :</p><h3>Article 1 – Objet</h3><p>Le Prestataire s'engage à assurer la tenue complète de la comptabilité du Client conformément au référentiel SYSCOHADA et au Plan Comptable Général de Côte d'Ivoire pour l'exercice <strong>{{exercice}}</strong>.</p><h3>Article 2 – Prise d'effet</h3><p>La mission prend effet le <strong>{{date_debut}}</strong>.</p><h3>Article 3 – Honoraires</h3><p>Les honoraires mensuels convenus s'élèvent à <strong>{{honoraires_mensuels}} FCFA</strong> hors taxes.</p><h3>Article 4 – Obligations des parties</h3><p>Le Client s'engage à fournir l'ensemble des pièces justificatives dans les délais convenus. Le Prestataire s'engage à respecter la confidentialité des informations reçues.</p><p class="signature-block">Fait en deux exemplaires originaux.<br/>Signatures des parties :</p></div>`
  },
  {
    code: 'cpta_saisie_mensuelle',
    name: "Accord de service de saisie comptable mensuelle",
    category: 'comptabilite_audit',
    price: 4000, priceMax: 10000,
    description: "Convention encadrant la saisie mensuelle des pièces comptables (factures, relevés, caisse) selon SYSCOHADA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 82,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'cabinet_nom',label:"Cabinet prestataire",type:'text',required:true},
      {key:'volume_pieces',label:"Volume mensuel estimé de pièces",type:'text',required:true},
      {key:'honoraires',label:"Honoraires mensuels (FCFA)",type:'text',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SAISIE COMPTABLE MENSUELLE</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{cabinet_nom}}</strong>, il est arrêté ce qui suit :</p><h3>Article 1 – Prestation</h3><p>Le Prestataire effectue la saisie mensuelle des pièces comptables (achats, ventes, banque, caisse) dans le logiciel agréé SYSCOHADA, pour un volume estimé de <strong>{{volume_pieces}}</strong> pièces par mois.</p><h3>Article 2 – Honoraires</h3><p>Honoraires mensuels : <strong>{{honoraires}} FCFA</strong> HT, payables le 5 du mois suivant.</p><h3>Article 3 – Délais</h3><p>La saisie est finalisée au plus tard le 15 du mois suivant la réception des pièces.</p><p class="signature-block">Signé le <strong>{{date_contrat}}</strong>.</p></div>`
  },
  {
    code: 'cpta_revision_comptable',
    name: "Accord de service de révision comptable",
    category: 'comptabilite_audit',
    price: 5000, priceMax: 15000,
    description: "Contrat de révision des comptes visant à détecter les anomalies et préparer les états financiers SYSCOHADA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 75,
    fieldsJson: F([
      {key:'client_nom',label:"Raison sociale du client",type:'text',required:true},
      {key:'reviseur_nom',label:"Nom du réviseur comptable",type:'text',required:true},
      {key:'exercice',label:"Exercice révisé",type:'text',required:true},
      {key:'honoraires',label:"Honoraires de révision (FCFA)",type:'text',required:true},
      {key:'date_remise',label:"Date limite de remise du rapport",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RÉVISION COMPTABLE</h1><p>Le présent accord est conclu entre <strong>{{client_nom}}</strong> et <strong>{{reviseur_nom}}</strong>.</p><h3>Article 1 – Mission</h3><p>Le réviseur procède à la révision des comptes de l'exercice <strong>{{exercice}}</strong> : analyse des soldes, contrôle des imputations, vérification des provisions et régularisations.</p><h3>Article 2 – Rapport</h3><p>Un rapport de révision sera remis au plus tard le <strong>{{date_remise}}</strong>.</p><h3>Article 3 – Honoraires</h3><p>Honoraires forfaitaires : <strong>{{honoraires}} FCFA</strong> HT.</p><p class="signature-block">Les parties approuvent les termes ci-dessus.</p></div>`
  },
  {
    code: 'cpta_cloture_annuelle',
    name: "Accord de service de clôture annuelle des comptes (bilan)",
    category: 'comptabilite_audit',
    price: 7000, priceMax: 20000,
    description: "Prestation de clôture annuelle, établissement du bilan et des états financiers annuels conformes SYSCOHADA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 85,
    fieldsJson: F([
      {key:'client_nom',label:"Raison sociale",type:'text',required:true},
      {key:'cabinet_nom',label:"Cabinet comptable",type:'text',required:true},
      {key:'exercice',label:"Exercice clôturé",type:'text',required:true},
      {key:'date_cloture',label:"Date de clôture comptable",type:'date',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CLÔTURE ANNUELLE DES COMPTES</h1><p>Parties : <strong>{{client_nom}}</strong> (Client) et <strong>{{cabinet_nom}}</strong> (Prestataire).</p><h3>Article 1 – Objet</h3><p>Le Prestataire assure la clôture des comptes de l'exercice <strong>{{exercice}}</strong> arrêté au <strong>{{date_cloture}}</strong>, incluant : lettrage, inventaire, provisions, établissement du bilan, compte de résultat et notes annexes SYSCOHADA.</p><h3>Article 2 – Livrables</h3><p>États financiers complets déposés auprès du RCCM dans les délais légaux.</p><h3>Article 3 – Honoraires</h3><p><strong>{{honoraires}} FCFA</strong> HT, payables à la remise des états.</p><p class="signature-block">Signatures des représentants légaux.</p></div>`
  },
  {
    code: 'cpta_compte_resultat',
    name: "Accord de service d'établissement du compte de résultat",
    category: 'comptabilite_audit',
    price: 4500, priceMax: 12000,
    description: "Mission spécifique d'établissement du compte de résultat annuel en normes SYSCOHADA pour les entités de droit OHADA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'client_nom',label:"Entreprise cliente",type:'text',required:true},
      {key:'prestataire',label:"Cabinet prestataire",type:'text',required:true},
      {key:'exercice',label:"Exercice fiscal",type:'text',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — ÉTABLISSEMENT DU COMPTE DE RÉSULTAT</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{prestataire}}</strong>.</p><h3>Article 1 – Prestation</h3><p>Établissement du compte de résultat de l'exercice <strong>{{exercice}}</strong> selon le modèle SYSCOHADA : charges d'exploitation, produits financiers, charges financières, résultat exceptionnel et résultat net.</p><h3>Article 2 – Honoraires</h3><p>Forfait : <strong>{{honoraires}} FCFA</strong> HT.</p><p class="signature-block">Approuvé par les deux parties.</p></div>`
  },
  {
    code: 'cpta_rapprochement_bancaire',
    name: "Accord de service de rapprochement bancaire",
    category: 'comptabilite_audit',
    price: 3500, priceMax: 9000,
    description: "Convention de prestation de rapprochement bancaire mensuel permettant de justifier les soldes de trésorerie.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'prestataire',label:"Prestataire",type:'text',required:true},
      {key:'banques',label:"Banques concernées",type:'text',required:true},
      {key:'frequence',label:"Fréquence (mensuelle/trimestrielle)",type:'text',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RAPPROCHEMENT BANCAIRE</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{prestataire}}</strong>.</p><h3>Article 1 – Périmètre</h3><p>Rapprochement des relevés bancaires de : <strong>{{banques}}</strong>, avec la comptabilité, à fréquence <strong>{{frequence}}</strong>.</p><h3>Article 2 – Livrables</h3><p>État de rapprochement signé, liste des opérations en suspens, recommandations de régularisation.</p><h3>Article 3 – Honoraires</h3><p><strong>{{honoraires}} FCFA</strong> HT par rapprochement.</p><p class="signature-block">Lu et approuvé.</p></div>`
  },
  {
    code: 'cpta_cash_management',
    name: "Accord de service de gestion de la trésorerie (cash management)",
    category: 'comptabilite_audit',
    price: 6000, priceMax: 18000,
    description: "Prestation de suivi et optimisation des flux de trésorerie, prévisions de liquidité et gestion des excédents/déficits.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 73,
    fieldsJson: F([
      {key:'client_nom',label:"Entreprise cliente",type:'text',required:true},
      {key:'prestataire',label:"Prestataire",type:'text',required:true},
      {key:'perimetre',label:"Périmètre de gestion (filiales, comptes)",type:'text',required:true},
      {key:'honoraires',label:"Honoraires mensuels (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de prise d'effet",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GESTION DE TRÉSORERIE (CASH MANAGEMENT)</h1><p>Conclu entre <strong>{{client_nom}}</strong> et <strong>{{prestataire}}</strong>, prenant effet le <strong>{{date_debut}}</strong>.</p><h3>Article 1 – Périmètre</h3><p><strong>{{perimetre}}</strong></p><h3>Article 2 – Prestations</h3><p>Suivi quotidien des flux, établissement de prévisions hebdomadaires, optimisation du placement des excédents, alertes de risque de liquidité.</p><h3>Article 3 – Honoraires</h3><p><strong>{{honoraires}} FCFA</strong> HT/mois.</p><p class="signature-block">Signatures des mandataires sociaux.</p></div>`
  },
  {
    code: 'cpta_analytique',
    name: "Accord de service de comptabilité analytique (coûts)",
    category: 'comptabilite_audit',
    price: 5500, priceMax: 16000,
    description: "Convention de mise en place et tenue de la comptabilité analytique par centres de coûts ou activités.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'client_nom',label:"Raison sociale du client",type:'text',required:true},
      {key:'prestataire',label:"Cabinet prestataire",type:'text',required:true},
      {key:'axes_analytiques',label:"Axes analytiques retenus",type:'textarea',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE COMPTABILITÉ ANALYTIQUE</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{prestataire}}</strong>.</p><h3>Article 1 – Axes analytiques</h3><p>{{axes_analytiques}}</p><h3>Article 2 – Prestations</h3><p>Paramétrage du plan analytique, imputation des charges et produits par axe, production de tableaux de répartition mensuels et d'analyses de rentabilité par activité.</p><h3>Article 3 – Honoraires</h3><p><strong>{{honoraires}} FCFA</strong> HT.</p><p class="signature-block">Signatures.</p></div>`
  },
  {
    code: 'cpta_gestion_pme',
    name: "Accord de service de comptabilité de gestion (PME)",
    category: 'comptabilite_audit',
    price: 4500, priceMax: 12000,
    description: "Prestation de comptabilité de gestion adaptée aux PME ivoiriennes : suivi des coûts, marges et performances.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 78,
    fieldsJson: F([
      {key:'pme_nom',label:"Nom de la PME",type:'text',required:true},
      {key:'prestataire',label:"Prestataire",type:'text',required:true},
      {key:'secteur',label:"Secteur d'activité",type:'text',required:true},
      {key:'honoraires',label:"Honoraires mensuels (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE COMPTABILITÉ DE GESTION — PME</h1><p>Entre <strong>{{pme_nom}}</strong> (secteur : <strong>{{secteur}}</strong>) et <strong>{{prestataire}}</strong>, à compter du <strong>{{date_debut}}</strong>.</p><h3>Article 1 – Contenu</h3><p>Suivi mensuel des coûts de production, calcul des marges commerciales, analyse de la rentabilité par produit/service, tableaux de bord simplifiés.</p><h3>Article 2 – Honoraires</h3><p><strong>{{honoraires}} FCFA</strong> HT/mois.</p><p class="signature-block">Approuvé par les parties.</p></div>`
  },
  {
    code: 'cpta_ong_syscoahe',
    name: "Accord de service de comptabilité associative (ONG SYSCOAHE)",
    category: 'comptabilite_audit',
    price: 4000, priceMax: 11000,
    description: "Convention de tenue de comptabilité pour ONG et associations selon le référentiel SYSCOAHE (système comptable des associations, ONG et coopératives).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      {key:'ong_nom',label:"Nom de l'ONG / association",type:'text',required:true},
      {key:'prestataire',label:"Cabinet prestataire",type:'text',required:true},
      {key:'bailleur',label:"Bailleur de fonds principal",type:'text',required:false},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true},
      {key:'exercice',label:"Exercice concerné",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE COMPTABILITÉ ASSOCIATIVE (SYSCOAHE)</h1><p>Entre <strong>{{ong_nom}}</strong> et <strong>{{prestataire}}</strong> pour l'exercice <strong>{{exercice}}</strong>.</p><h3>Article 1 – Référentiel</h3><p>La comptabilité est tenue selon le système comptable des associations (SYSCOAHE) répondant aux exigences du bailleur <strong>{{bailleur}}</strong>.</p><h3>Article 2 – Prestations</h3><p>Saisie des opérations, gestion par projet/programme, états financiers (bilan, compte de résultat, rapport financier bailleur).</p><h3>Article 3 – Honoraires</h3><p><strong>{{honoraires}} FCFA</strong> HT.</p><p class="signature-block">Signatures.</p></div>`
  },
  {
    code: 'cpta_immobiliere',
    name: "Accord de service de comptabilité immobilière",
    category: 'comptabilite_audit',
    price: 5000, priceMax: 14000,
    description: "Prestation de comptabilité spécialisée pour les promoteurs et gestionnaires immobiliers (amortissements, loyers, charges de copropriété).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 62,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'prestataire',label:"Prestataire",type:'text',required:true},
      {key:'patrimoine',label:"Description du patrimoine immobilier",type:'textarea',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE COMPTABILITÉ IMMOBILIÈRE</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{prestataire}}</strong>.</p><h3>Article 1 – Patrimoine concerné</h3><p>{{patrimoine}}</p><h3>Article 2 – Prestations</h3><p>Tenue du registre des immeubles, calcul des amortissements, comptabilisation des loyers et charges locatives, états de réconciliation, déclarations fiscales afférentes.</p><h3>Article 3 – Honoraires</h3><p><strong>{{honoraires}} FCFA</strong> HT.</p><p class="signature-block">Signatures des parties.</p></div>`
  },
  {
    code: 'cpta_agricole',
    name: "Accord de service de comptabilité agricole",
    category: 'comptabilite_audit',
    price: 3500, priceMax: 10000,
    description: "Prestation comptable dédiée aux exploitations agricoles : stocks, récoltes, subventions, amortissements d'équipements agricoles.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 55,
    fieldsJson: F([
      {key:'exploitation',label:"Nom de l'exploitation",type:'text',required:true},
      {key:'prestataire',label:"Cabinet prestataire",type:'text',required:true},
      {key:'cultures',label:"Types de cultures / élevages",type:'text',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE COMPTABILITÉ AGRICOLE</h1><p>Entre l'exploitation <strong>{{exploitation}}</strong> (cultures : <strong>{{cultures}}</strong>) et <strong>{{prestataire}}</strong>.</p><h3>Article 1 – Prestations</h3><p>Saisie des opérations agricoles, gestion des stocks de récoltes et intrants, suivi des subventions publiques, amortissements des équipements, états financiers annuels.</p><h3>Article 2 – Honoraires</h3><p><strong>{{honoraires}} FCFA</strong> HT.</p><p class="signature-block">Signatures.</p></div>`
  },
  {
    code: 'cpta_chantier_btp',
    name: "Accord de service de comptabilité de chantier (BTP)",
    category: 'comptabilite_audit',
    price: 5500, priceMax: 15000,
    description: "Convention de comptabilité spécialisée BTP : avancement de travaux, situations de travaux, coûts par chantier, retenues de garantie.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 67,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise BTP",type:'text',required:true},
      {key:'prestataire',label:"Cabinet prestataire",type:'text',required:true},
      {key:'chantiers',label:"Chantiers concernés",type:'textarea',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début de mission",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE COMPTABILITÉ DE CHANTIER (BTP)</h1><p>Entre <strong>{{entreprise}}</strong> et <strong>{{prestataire}}</strong>, à compter du <strong>{{date_debut}}</strong>.</p><h3>Article 1 – Chantiers couverts</h3><p>{{chantiers}}</p><h3>Article 2 – Prestations</h3><p>Comptabilisation par chantier, suivi de l'avancement et des situations de travaux, gestion des retenues de garantie et des pénalités, états de coûts par ouvrage.</p><h3>Article 3 – Honoraires</h3><p><strong>{{honoraires}} FCFA</strong> HT.</p><p class="signature-block">Signatures.</p></div>`
  },
  // ── Audit ──────────────────────────────────────────────────────────────────
  {
    code: 'cpta_audit_legal',
    name: "Accord de service d'audit légal des comptes (commissaire aux comptes CI)",
    category: 'comptabilite_audit',
    price: 10000, priceMax: 35000,
    description: "Lettre de mission de commissariat aux comptes conformément aux dispositions de l'Acte Uniforme OHADA et à la loi ivoirienne.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 90,
    fieldsJson: F([
      {key:'societe',label:"Dénomination sociale",type:'text',required:true},
      {key:'cac_nom',label:"Nom du Commissaire aux Comptes",type:'text',required:true},
      {key:'exercice',label:"Exercice audité",type:'text',required:true},
      {key:'honoraires',label:"Honoraires d'audit (FCFA)",type:'text',required:true},
      {key:'date_ag',label:"Date prévisionnelle de l'Assemblée Générale",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>LETTRE DE MISSION — AUDIT LÉGAL DES COMPTES</h1><h2>Commissariat aux Comptes — Côte d'Ivoire</h2><p>La société <strong>{{societe}}</strong> confie à <strong>{{cac_nom}}</strong>, Commissaire aux Comptes inscrit à l'ONECCA-CI, l'audit légal des comptes de l'exercice <strong>{{exercice}}</strong>.</p><h3>Article 1 – Fondement légal</h3><p>Mission exercée conformément à l'Acte Uniforme OHADA relatif aux sociétés commerciales et au groupement d'intérêt économique, ainsi qu'aux normes ISA adaptées par l'ONECCA-CI.</p><h3>Article 2 – Objectif</h3><p>Certification que les états financiers annuels donnent une image fidèle et régulière de la situation financière de la société.</p><h3>Article 3 – Honoraires</h3><p><strong>{{honoraires}} FCFA</strong> HT, approuvés en Assemblée Générale.</p><h3>Article 4 – Rapport</h3><p>Le rapport du Commissaire aux Comptes sera présenté à l'AG prévue le <strong>{{date_ag}}</strong>.</p><p class="signature-block">Signatures du représentant légal et du CAC.</p></div>`
  },
  {
    code: 'cpta_audit_contractuel',
    name: "Accord de service d'audit contractuel (due diligence)",
    category: 'comptabilite_audit',
    price: 9000, priceMax: 28000,
    description: "Convention d'audit contractuel (due diligence financière) dans le cadre d'une opération de cession, acquisition ou fusion.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 80,
    fieldsJson: F([
      {key:'client_nom',label:"Donneur d'ordre",type:'text',required:true},
      {key:'cible',label:"Entité cible de la due diligence",type:'text',required:true},
      {key:'cabinet_nom',label:"Cabinet d'audit",type:'text',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true},
      {key:'date_remise',label:"Date de remise du rapport",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'AUDIT CONTRACTUEL — DUE DILIGENCE</h1><p>Entre <strong>{{client_nom}}</strong> (Mandant) et <strong>{{cabinet_nom}}</strong> (Mandataire).</p><h3>Article 1 – Objet</h3><p>Réalisation d'une due diligence financière et comptable sur l'entité <strong>{{cible}}</strong> dans le cadre d'une opération d'acquisition/fusion envisagée.</p><h3>Article 2 – Périmètre</h3><p>Analyse des états financiers des trois derniers exercices, vérification des engagements hors bilan, identification des risques fiscaux et sociaux, valorisation patrimoniale.</p><h3>Article 3 – Rapport</h3><p>Rapport confidentiel remis le <strong>{{date_remise}}</strong>.</p><h3>Article 4 – Honoraires</h3><p><strong>{{honoraires}} FCFA</strong> HT.</p><p class="signature-block">Signatures.</p></div>`
  },
  {
    code: 'cpta_audit_interne',
    name: "Accord de service d'audit interne (mission CIA)",
    category: 'comptabilite_audit',
    price: 7000, priceMax: 22000,
    description: "Lettre de mission d'audit interne selon les normes IIA/CIA pour l'évaluation des processus de contrôle interne.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 74,
    fieldsJson: F([
      {key:'organisation',label:"Organisation mandante",type:'text',required:true},
      {key:'auditeur',label:"Responsable Audit Interne / cabinet",type:'text',required:true},
      {key:'perimetre',label:"Périmètre de la mission",type:'textarea',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'AUDIT INTERNE (CIA)</h1><p>Mandant : <strong>{{organisation}}</strong>. Auditeur : <strong>{{auditeur}}</strong>.</p><h3>Article 1 – Référentiel</h3><p>Mission conduite selon les Normes Internationales pour la Pratique Professionnelle de l'Audit Interne (NIPPAI — IIA).</p><h3>Article 2 – Périmètre</h3><p>{{perimetre}}</p><h3>Article 3 – Indépendance</h3><p>L'auditeur interne exerce son activité en toute indépendance et rapporte directement au Comité d'Audit / Direction Générale.</p><h3>Article 4 – Honoraires</h3><p><strong>{{honoraires}} FCFA</strong> HT.</p><p class="signature-block">Signé par le Directeur Général et le Responsable Audit Interne.</p></div>`
  },
  {
    code: 'cpta_audit_operationnel',
    name: "Accord de service d'audit opérationnel (processus)",
    category: 'comptabilite_audit',
    price: 7000, priceMax: 20000,
    description: "Mission d'audit opérationnel visant à évaluer l'efficacité et l'efficience des processus métiers de l'organisation.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 66,
    fieldsJson: F([
      {key:'organisation',label:"Organisation",type:'text',required:true},
      {key:'cabinet',label:"Cabinet auditeur",type:'text',required:true},
      {key:'processus',label:"Processus audités",type:'textarea',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true},
      {key:'duree',label:"Durée de la mission",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'AUDIT OPÉRATIONNEL</h1><p>Entre <strong>{{organisation}}</strong> et <strong>{{cabinet}}</strong> pour une durée de <strong>{{duree}}</strong>.</p><h3>Article 1 – Processus audités</h3><p>{{processus}}</p><h3>Article 2 – Méthode</h3><p>Cartographie des processus, tests de conformité, évaluation des risques, benchmark, recommandations d'amélioration.</p><h3>Article 3 – Honoraires</h3><p><strong>{{honoraires}} FCFA</strong> HT.</p><p class="signature-block">Signatures.</p></div>`
  },
  {
    code: 'cpta_audit_conformite',
    name: "Accord de service d'audit de conformité (COBAC/BCEAO)",
    category: 'comptabilite_audit',
    price: 9000, priceMax: 28000,
    description: "Mission d'audit de conformité réglementaire pour établissements financiers selon les directives COBAC et BCEAO.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'etablissement',label:"Établissement financier",type:'text',required:true},
      {key:'cabinet',label:"Cabinet auditeur",type:'text',required:true},
      {key:'referentiel',label:"Référentiel réglementaire (COBAC/BCEAO/Autres)",type:'text',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'AUDIT DE CONFORMITÉ</h1><h2>COBAC / BCEAO</h2><p>Entre <strong>{{etablissement}}</strong> et <strong>{{cabinet}}</strong>.</p><h3>Article 1 – Référentiel</h3><p>Audit mené selon les dispositions de : <strong>{{referentiel}}</strong>.</p><h3>Article 2 – Domaines couverts</h3><p>Ratio de solvabilité, normes de division des risques, lutte anti-blanchiment (LAB-FT), dispositif KYC, déclarations réglementaires à la BCEAO.</p><h3>Article 3 – Rapport confidentiel</h3><p>Rapport adressé exclusivement à l'organe délibérant et à l'autorité de tutelle si requis.</p><h3>Article 4 – Honoraires</h3><p><strong>{{honoraires}} FCFA</strong> HT.</p><p class="signature-block">Signatures.</p></div>`
  },
  {
    code: 'cpta_audit_informatique',
    name: "Accord de service d'audit informatique (IT audit)",
    category: 'comptabilite_audit',
    price: 8000, priceMax: 24000,
    description: "Mission d'audit des systèmes d'information : sécurité, continuité d'activité, conformité ITGC selon COBIT/ISO 27001.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 63,
    fieldsJson: F([
      {key:'organisation',label:"Organisation",type:'text',required:true},
      {key:'cabinet',label:"Cabinet d'audit IT",type:'text',required:true},
      {key:'systemes',label:"Systèmes d'information audités",type:'textarea',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'AUDIT INFORMATIQUE (IT AUDIT)</h1><p>Entre <strong>{{organisation}}</strong> et <strong>{{cabinet}}</strong>.</p><h3>Article 1 – Systèmes concernés</h3><p>{{systemes}}</p><h3>Article 2 – Cadre de référence</h3><p>Audit conduit selon COBIT 2019 et ISO/IEC 27001, couvrant : contrôles généraux informatiques (ITGC), sécurité des accès, continuité d'activité, sauvegarde des données.</p><h3>Article 3 – Honoraires</h3><p><strong>{{honoraires}} FCFA</strong> HT.</p><p class="signature-block">Signatures des parties.</p></div>`
  },
  {
    code: 'cpta_audit_social_rh',
    name: "Accord de service d'audit social et RH",
    category: 'comptabilite_audit',
    price: 6000, priceMax: 18000,
    description: "Mission d'audit social évaluant la conformité aux obligations légales du travail, le climat social et la gestion des ressources humaines.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 64,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise",type:'text',required:true},
      {key:'cabinet',label:"Cabinet auditeur",type:'text',required:true},
      {key:'effectif',label:"Effectif salarié",type:'text',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'AUDIT SOCIAL ET RH</h1><p>Entre <strong>{{entreprise}}</strong> (effectif : <strong>{{effectif}}</strong> salariés) et <strong>{{cabinet}}</strong>.</p><h3>Article 1 – Périmètre</h3><p>Conformité au Code du Travail ivoirien, conventions collectives applicables, gestion de la paie et des déclarations CNPS, procédures disciplinaires, formation professionnelle.</p><h3>Article 2 – Livrables</h3><p>Rapport d'audit social, tableau des non-conformités, plan d'actions correctif.</p><h3>Article 3 – Honoraires</h3><p><strong>{{honoraires}} FCFA</strong> HT.</p><p class="signature-block">Signatures.</p></div>`
  },
  {
    code: 'cpta_audit_environnemental',
    name: "Accord de service d'audit environnemental (RSE)",
    category: 'comptabilite_audit',
    price: 7000, priceMax: 20000,
    description: "Mission d'audit environnemental et RSE évaluant les impacts environnementaux et la conformité aux normes locales et internationales.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 56,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise",type:'text',required:true},
      {key:'cabinet',label:"Cabinet auditeur",type:'text',required:true},
      {key:'sites',label:"Sites audités",type:'text',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'AUDIT ENVIRONNEMENTAL (RSE)</h1><p>Entre <strong>{{entreprise}}</strong> et <strong>{{cabinet}}</strong> pour les sites : <strong>{{sites}}</strong>.</p><h3>Article 1 – Référentiels</h3><p>ISO 14001, GRI Standards, réglementation environnementale ivoirienne (loi relative à l'environnement), standards Équateur.</p><h3>Article 2 – Domaines évalués</h3><p>Gestion des déchets, consommations énergétiques, émissions de GES, impact sur la biodiversité, reporting extra-financier.</p><h3>Article 3 – Honoraires</h3><p><strong>{{honoraires}} FCFA</strong> HT.</p><p class="signature-block">Signatures.</p></div>`
  },
  {
    code: 'cpta_audit_marches_publics',
    name: "Accord de service d'audit des marchés publics",
    category: 'comptabilite_audit',
    price: 8000, priceMax: 24000,
    description: "Mission d'audit de la passation et de l'exécution des marchés publics conformément au Code des marchés publics ivoirien.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'autorite',label:"Autorité contractante",type:'text',required:true},
      {key:'cabinet',label:"Cabinet d'audit",type:'text',required:true},
      {key:'marches',label:"Marchés audités (référence/objet)",type:'textarea',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'AUDIT DES MARCHÉS PUBLICS</h1><p>Entre <strong>{{autorite}}</strong> et <strong>{{cabinet}}</strong>.</p><h3>Article 1 – Marchés concernés</h3><p>{{marches}}</p><h3>Article 2 – Cadre légal</h3><p>Audit conduit selon le Code des marchés publics de Côte d'Ivoire et les directives de l'ARMP.</p><h3>Article 3 – Points de contrôle</h3><p>Respect des procédures de passation, régularité des paiements, conformité des prestations, efficacité de la commande publique.</p><h3>Article 4 – Honoraires</h3><p><strong>{{honoraires}} FCFA</strong> HT.</p><p class="signature-block">Signatures.</p></div>`
  },
  {
    code: 'cpta_audit_forensic',
    name: "Accord de service d'audit anti-fraude (forensic)",
    category: 'comptabilite_audit',
    price: 10000, priceMax: 30000,
    description: "Mission d'investigation forensique pour détecter et documenter des faits de fraude, détournement ou malversation financière.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'mandant',label:"Mandant (entreprise/institution)",type:'text',required:true},
      {key:'cabinet',label:"Cabinet forensique",type:'text',required:true},
      {key:'faits_allegues',label:"Faits allégués à investiguer",type:'textarea',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début de l'investigation",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'AUDIT ANTI-FRAUDE (FORENSIC)</h1><p>CONFIDENTIEL</p><p>Entre <strong>{{mandant}}</strong> et <strong>{{cabinet}}</strong>, à compter du <strong>{{date_debut}}</strong>.</p><h3>Article 1 – Faits investigués</h3><p>{{faits_allegues}}</p><h3>Article 2 – Méthode</h3><p>Collecte et préservation des preuves numériques et documentaires, entretiens sous protocole, analyse des transactions suspectes, reconstitution des flux financiers.</p><h3>Article 3 – Confidentialité absolue</h3><p>Les conclusions ne sont communiquées qu'au mandant. Le rapport est protégé par le secret professionnel.</p><h3>Article 4 – Honoraires</h3><p><strong>{{honoraires}} FCFA</strong> HT.</p><p class="signature-block">Signatures sécurisées.</p></div>`
  },
  {
    code: 'cpta_audit_ong_bailleur',
    name: "Accord de service d'audit des ONG (bailleur)",
    category: 'comptabilite_audit',
    price: 6000, priceMax: 18000,
    description: "Lettre de mission d'audit financier d'une ONG selon les exigences d'un bailleur de fonds international.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'ong_nom',label:"Nom de l'ONG",type:'text',required:true},
      {key:'bailleur',label:"Bailleur de fonds",type:'text',required:true},
      {key:'cabinet',label:"Cabinet d'audit",type:'text',required:true},
      {key:'projet',label:"Projet audité",type:'text',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'AUDIT ONG — BAILLEUR DE FONDS</h1><p>Mission commandée par <strong>{{bailleur}}</strong> pour l'audit de <strong>{{ong_nom}}</strong>. Cabinet mandaté : <strong>{{cabinet}}</strong>.</p><h3>Article 1 – Projet audité</h3><p><strong>{{projet}}</strong></p><h3>Article 2 – Normes</h3><p>ISRS 4400 (procédures convenues), normes du bailleur, SYSCOAHE.</p><h3>Article 3 – Livrables</h3><p>Rapport d'audit avec opinion, états financiers du projet, tableau des dépenses par ligne budgétaire, recommandations.</p><h3>Article 4 – Honoraires</h3><p><strong>{{honoraires}} FCFA</strong> HT.</p><p class="signature-block">Signatures.</p></div>`
  },
  // ── Contrôle de gestion ────────────────────────────────────────────────────
  {
    code: 'cpta_cdg_reporting',
    name: "Accord de service de contrôle de gestion (reporting mensuel)",
    category: 'comptabilite_audit',
    price: 6000, priceMax: 16000,
    description: "Convention de contrôle de gestion avec production mensuelle d'un reporting financier et opérationnel pour la direction.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 80,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise",type:'text',required:true},
      {key:'prestataire',label:"Prestataire",type:'text',required:true},
      {key:'indicateurs',label:"Indicateurs clés du reporting",type:'textarea',required:true},
      {key:'honoraires',label:"Honoraires mensuels (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CONTRÔLE DE GESTION — REPORTING MENSUEL</h1><p>Entre <strong>{{entreprise}}</strong> et <strong>{{prestataire}}</strong>, à compter du <strong>{{date_debut}}</strong>.</p><h3>Article 1 – Indicateurs</h3><p>{{indicateurs}}</p><h3>Article 2 – Fréquence et délais</h3><p>Le reporting mensuel est produit au plus tard le J+10 après la clôture de chaque mois.</p><h3>Article 3 – Honoraires</h3><p><strong>{{honoraires}} FCFA</strong> HT/mois.</p><p class="signature-block">Signatures.</p></div>`
  },
  {
    code: 'cpta_budget_previsions',
    name: "Accord de service de budget et prévisions (budget annuel)",
    category: 'comptabilite_audit',
    price: 5500, priceMax: 15000,
    description: "Prestation d'élaboration du budget annuel et des prévisions financières pluriannuelles de l'entreprise.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 77,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise",type:'text',required:true},
      {key:'prestataire',label:"Prestataire",type:'text',required:true},
      {key:'annee_budget',label:"Année budgétaire",type:'text',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — BUDGET ET PRÉVISIONS ANNUELS</h1><p>Entre <strong>{{entreprise}}</strong> et <strong>{{prestataire}}</strong> pour l'exercice budgétaire <strong>{{annee_budget}}</strong>.</p><h3>Article 1 – Prestations</h3><p>Ateliers de construction budgétaire par département, consolidation du budget global, compte de résultat prévisionnel, plan de trésorerie prévisionnel, présentation à la Direction Générale.</p><h3>Article 2 – Honoraires</h3><p><strong>{{honoraires}} FCFA</strong> HT.</p><p class="signature-block">Signatures.</p></div>`
  },
  {
    code: 'cpta_tableau_bord_kpi',
    name: "Accord de service de tableau de bord (KPI entreprise)",
    category: 'comptabilite_audit',
    price: 5000, priceMax: 14000,
    description: "Conception et mise en place d'un tableau de bord de pilotage avec indicateurs clés de performance (KPI) adaptés à l'activité.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 74,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise",type:'text',required:true},
      {key:'prestataire',label:"Prestataire",type:'text',required:true},
      {key:'kpi_cles',label:"KPI à intégrer",type:'textarea',required:true},
      {key:'outil',label:"Outil de restitution (Excel, Power BI...)",type:'text',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — TABLEAU DE BORD ET KPI</h1><p>Entre <strong>{{entreprise}}</strong> et <strong>{{prestataire}}</strong>.</p><h3>Article 1 – KPI retenus</h3><p>{{kpi_cles}}</p><h3>Article 2 – Outil</h3><p>Restitution sur <strong>{{outil}}</strong>, avec actualisation mensuelle automatisée.</p><h3>Article 3 – Honoraires</h3><p><strong>{{honoraires}} FCFA</strong> HT (conception + 3 mois de suivi inclus).</p><p class="signature-block">Signatures.</p></div>`
  },
  {
    code: 'cpta_analyse_ecarts',
    name: "Accord de service d'analyse des écarts (budget vs réel)",
    category: 'comptabilite_audit',
    price: 4500, priceMax: 12000,
    description: "Prestation d'analyse mensuelle des écarts entre le budget prévisionnel et les réalisations, avec commentaires et recommandations.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise",type:'text',required:true},
      {key:'prestataire',label:"Prestataire",type:'text',required:true},
      {key:'honoraires',label:"Honoraires mensuels (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — ANALYSE DES ÉCARTS BUDGET VS RÉEL</h1><p>Entre <strong>{{entreprise}}</strong> et <strong>{{prestataire}}</strong>, à compter du <strong>{{date_debut}}</strong>.</p><h3>Article 1 – Prestation</h3><p>Chaque mois, le Prestataire produit un rapport d'analyse des écarts par poste budgétaire, identifie les causes des dérives significatives (seuil 5%) et formule des recommandations correctives.</p><h3>Article 2 – Honoraires</h3><p><strong>{{honoraires}} FCFA</strong> HT/mois.</p><p class="signature-block">Signatures.</p></div>`
  },
  {
    code: 'cpta_prix_revient',
    name: "Accord de service de prix de revient (industrie)",
    category: 'comptabilite_audit',
    price: 5500, priceMax: 15000,
    description: "Mission de calcul et d'optimisation des prix de revient industriels par produit ou ligne de fabrication.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'industriel',label:"Entreprise industrielle",type:'text',required:true},
      {key:'prestataire',label:"Prestataire",type:'text',required:true},
      {key:'produits',label:"Produits concernés",type:'textarea',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — PRIX DE REVIENT INDUSTRIEL</h1><p>Entre <strong>{{industriel}}</strong> et <strong>{{prestataire}}</strong>.</p><h3>Article 1 – Produits concernés</h3><p>{{produits}}</p><h3>Article 2 – Méthode</h3><p>Décomposition en matières premières, main-d'oeuvre directe, frais généraux de fabrication, amortissements. Application de la méthode des coûts complets et des coûts variables.</p><h3>Article 3 – Honoraires</h3><p><strong>{{honoraires}} FCFA</strong> HT.</p><p class="signature-block">Signatures.</p></div>`
  },
  {
    code: 'cpta_seuil_rentabilite',
    name: "Accord de service de seuil de rentabilité (point mort)",
    category: 'comptabilite_audit',
    price: 4000, priceMax: 10000,
    description: "Prestation de calcul du seuil de rentabilité (point mort) et d'analyse de la marge sur coût variable.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 67,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise",type:'text',required:true},
      {key:'prestataire',label:"Prestataire",type:'text',required:true},
      {key:'activite',label:"Activité analysée",type:'text',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — SEUIL DE RENTABILITÉ (POINT MORT)</h1><p>Entre <strong>{{entreprise}}</strong> et <strong>{{prestataire}}</strong> pour l'activité : <strong>{{activite}}</strong>.</p><h3>Article 1 – Prestation</h3><p>Analyse des charges fixes et variables, calcul du chiffre d'affaires critique, détermination du point mort en valeur et en volume, analyse de sensibilité, représentation graphique.</p><h3>Article 2 – Honoraires</h3><p><strong>{{honoraires}} FCFA</strong> HT.</p><p class="signature-block">Signatures.</p></div>`
  },
  {
    code: 'cpta_calcul_marges',
    name: "Accord de service de calcul de marges (commercial)",
    category: 'comptabilite_audit',
    price: 4000, priceMax: 11000,
    description: "Mission d'analyse et d'optimisation des marges commerciales par produit, famille de produits ou canal de distribution.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 69,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise commerciale",type:'text',required:true},
      {key:'prestataire',label:"Prestataire",type:'text',required:true},
      {key:'gammes',label:"Gammes / familles de produits",type:'text',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — CALCUL ET ANALYSE DES MARGES COMMERCIALES</h1><p>Entre <strong>{{entreprise}}</strong> et <strong>{{prestataire}}</strong>.</p><h3>Article 1 – Périmètre</h3><p>Analyse des marges pour les gammes/familles : <strong>{{gammes}}</strong>.</p><h3>Article 2 – Méthode</h3><p>Calcul de la marge brute, marge commerciale, marge sur coût variable, taux de marque et taux de marge, analyse par canal de distribution.</p><h3>Article 3 – Honoraires</h3><p><strong>{{honoraires}} FCFA</strong> HT.</p><p class="signature-block">Signatures.</p></div>`
  },
  {
    code: 'cpta_business_plan',
    name: "Accord de service de business plan financier (investissement)",
    category: 'comptabilite_audit',
    price: 7000, priceMax: 22000,
    description: "Prestation d'élaboration d'un business plan financier complet pour un projet d'investissement (TRI, VAN, flux de trésorerie prévisionnels).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 83,
    fieldsJson: F([
      {key:'porteur',label:"Porteur de projet",type:'text',required:true},
      {key:'projet',label:"Intitulé du projet",type:'text',required:true},
      {key:'prestataire',label:"Cabinet prestataire",type:'text',required:true},
      {key:'investissement',label:"Montant d'investissement prévisionnel (FCFA)",type:'text',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — BUSINESS PLAN FINANCIER</h1><p>Porteur : <strong>{{porteur}}</strong>. Projet : <strong>{{projet}}</strong>. Prestataire : <strong>{{prestataire}}</strong>.</p><h3>Article 1 – Investissement analysé</h3><p>Montant prévisionnel : <strong>{{investissement}} FCFA</strong>.</p><h3>Article 2 – Contenu du business plan</h3><p>Hypothèses macro-économiques, compte de résultat prévisionnel sur 5 ans, bilan prévisionnel, plan de financement, tableaux de flux de trésorerie, calcul du TRI et de la VAN, analyse de sensibilité.</p><h3>Article 3 – Honoraires</h3><p><strong>{{honoraires}} FCFA</strong> HT.</p><p class="signature-block">Signatures.</p></div>`
  },
  {
    code: 'cpta_plan_financement',
    name: "Accord de service de plan de financement pluriannuel (PFP)",
    category: 'comptabilite_audit',
    price: 6000, priceMax: 18000,
    description: "Élaboration du plan de financement pluriannuel (ressources et emplois sur 3 à 5 ans) pour évaluer la viabilité financière du projet.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 71,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise / projet",type:'text',required:true},
      {key:'prestataire',label:"Cabinet prestataire",type:'text',required:true},
      {key:'horizon',label:"Horizon du plan (années)",type:'text',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — PLAN DE FINANCEMENT PLURIANNUEL (PFP)</h1><p>Entre <strong>{{entreprise}}</strong> et <strong>{{prestataire}}</strong>.</p><h3>Article 1 – Horizon</h3><p><strong>{{horizon}} ans</strong>.</p><h3>Article 2 – Contenu</h3><p>Ressources stables (fonds propres, dettes financières, subventions), emplois stables (investissements, remboursements), variation du besoin en fonds de roulement, excédent ou déficit annuel, ratios d'endettement.</p><h3>Article 3 – Honoraires</h3><p><strong>{{honoraires}} FCFA</strong> HT.</p><p class="signature-block">Signatures.</p></div>`
  },
  // ── Fiscalité CI/UEMOA ────────────────────────────────────────────────────
  {
    code: 'cpta_decl_fiscale_mensuelle',
    name: "Accord de service de déclaration fiscale mensuelle (DGI CI — TVA, IS, IRPP)",
    category: 'comptabilite_audit',
    price: 4000, priceMax: 10000,
    description: "Convention d'externalisation des déclarations fiscales mensuelles auprès de la DGI de Côte d'Ivoire (TVA, acomptes IS, IRPP).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 88,
    fieldsJson: F([
      {key:'contribuable',label:"Raison sociale du contribuable",type:'text',required:true},
      {key:'cabinet',label:"Cabinet fiscal",type:'text',required:true},
      {key:'numero_contribuable',label:"Numéro Contribuable DGI",type:'text',required:true},
      {key:'honoraires',label:"Honoraires mensuels (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début de mission",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — DÉCLARATIONS FISCALES MENSUELLES DGI CI</h1><p>Entre <strong>{{contribuable}}</strong> (N° contribuable : <strong>{{numero_contribuable}}</strong>) et <strong>{{cabinet}}</strong>, à compter du <strong>{{date_debut}}</strong>.</p><h3>Article 1 – Déclarations concernées</h3><p>Déclaration de TVA (collectée/déductible), acompte provisionnel IS, retenue à la source IRPP et BIC, déclaration de la contribution nationale de solidarité le cas échéant.</p><h3>Article 2 – Délais légaux</h3><p>Dépôt effectué au plus tard le 15 du mois suivant, via e-services DGI ou guichet physique.</p><h3>Article 3 – Honoraires</h3><p><strong>{{honoraires}} FCFA</strong> HT/mois.</p><p class="signature-block">Signatures.</p></div>`
  },
  {
    code: 'cpta_decl_is',
    name: "Accord de service de déclaration annuelle IS (impôt sur les sociétés CI)",
    category: 'comptabilite_audit',
    price: 5000, priceMax: 14000,
    description: "Prestation d'établissement et de dépôt de la déclaration annuelle de l'Impôt sur les Sociétés auprès de la DGI de Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 84,
    fieldsJson: F([
      {key:'societe',label:"Raison sociale",type:'text',required:true},
      {key:'cabinet',label:"Cabinet fiscal",type:'text',required:true},
      {key:'exercice',label:"Exercice fiscal",type:'text',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — DÉCLARATION ANNUELLE IS (IMPÔT SUR LES SOCIÉTÉS)</h1><p>Entre <strong>{{societe}}</strong> et <strong>{{cabinet}}</strong> pour l'exercice <strong>{{exercice}}</strong>.</p><h3>Article 1 – Prestation</h3><p>Calcul de l'IS dû (taux en vigueur selon le CGI CI), établissement de la liasse fiscale SYSCOHADA, dépôt dans les délais légaux à la DGI, gestion de la liquidation et du solde d'IS.</p><h3>Article 2 – Honoraires</h3><p><strong>{{honoraires}} FCFA</strong> HT.</p><p class="signature-block">Signatures.</p></div>`
  },
  {
    code: 'cpta_decl_irpp',
    name: "Accord de service de déclaration IRPP (impôt sur le revenu personne physique CI)",
    category: 'comptabilite_audit',
    price: 3500, priceMax: 9000,
    description: "Prestation de déclaration de l'IRPP annuel pour les personnes physiques imposables en Côte d'Ivoire (barème progressif CGI).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 75,
    fieldsJson: F([
      {key:'contribuable',label:"Nom du contribuable",type:'text',required:true},
      {key:'cabinet',label:"Cabinet fiscal",type:'text',required:true},
      {key:'annee',label:"Année d'imposition",type:'text',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — DÉCLARATION IRPP (PERSONNE PHYSIQUE CI)</h1><p>Entre <strong>{{contribuable}}</strong> et <strong>{{cabinet}}</strong> pour l'année <strong>{{annee}}</strong>.</p><h3>Article 1 – Prestation</h3><p>Collecte des revenus imposables (salaires, BIC, BNC, revenus fonciers), application du barème progressif IRPP du CGI CI, calcul des déductions légales, établissement et dépôt de la déclaration annuelle.</p><h3>Article 2 – Honoraires</h3><p><strong>{{honoraires}} FCFA</strong> HT.</p><p class="signature-block">Signatures.</p></div>`
  },
  {
    code: 'cpta_decl_patente',
    name: "Accord de service de déclaration patente (CI)",
    category: 'comptabilite_audit',
    price: 3000, priceMax: 8000,
    description: "Prestation d'établissement et de dépôt de la déclaration de patente annuelle auprès de la DGI de Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 66,
    fieldsJson: F([
      {key:'contribuable',label:"Raison sociale / Nom",type:'text',required:true},
      {key:'cabinet',label:"Cabinet fiscal",type:'text',required:true},
      {key:'annee',label:"Année de patente",type:'text',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — DÉCLARATION DE PATENTE (CI)</h1><p>Entre <strong>{{contribuable}}</strong> et <strong>{{cabinet}}</strong> pour l'année <strong>{{annee}}</strong>.</p><h3>Article 1 – Prestation</h3><p>Calcul de la patente (droit fixe + droit proportionnel sur chiffre d'affaires) selon le CGI CI, établissement du formulaire de déclaration, dépôt à la DGI avant l'échéance légale.</p><h3>Article 2 – Honoraires</h3><p><strong>{{honoraires}} FCFA</strong> HT.</p><p class="signature-block">Signatures.</p></div>`
  },
  {
    code: 'cpta_decl_dus',
    name: "Accord de service de déclaration DUS (droits uniques de sortie exportation CI)",
    category: 'comptabilite_audit',
    price: 3500, priceMax: 9000,
    description: "Prestation de calcul et de déclaration des Droits Uniques de Sortie (DUS) applicables aux exportations de matières premières en CI.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 58,
    fieldsJson: F([
      {key:'exportateur',label:"Entreprise exportatrice",type:'text',required:true},
      {key:'cabinet',label:"Cabinet fiscal",type:'text',required:true},
      {key:'produits',label:"Produits exportés",type:'text',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — DÉCLARATION DUS (DROITS UNIQUES DE SORTIE)</h1><p>Entre <strong>{{exportateur}}</strong> et <strong>{{cabinet}}</strong>.</p><h3>Article 1 – Produits concernés</h3><p><strong>{{produits}}</strong></p><h3>Article 2 – Prestation</h3><p>Calcul des DUS sur la base des prix de référence officiels, établissement des déclarations douanières et fiscales, suivi du paiement et archivage des acquits douaniers.</p><h3>Article 3 – Honoraires</h3><p><strong>{{honoraires}} FCFA</strong> HT.</p><p class="signature-block">Signatures.</p></div>`
  },
  {
    code: 'cpta_assistance_controle_fiscal',
    name: "Accord de service de contrôle fiscal (assistance redressement DGI CI)",
    category: 'comptabilite_audit',
    price: 8000, priceMax: 25000,
    description: "Assistance du contribuable lors d'un contrôle fiscal de la DGI CI : vérification de comptabilité, réponse aux notifications de redressement.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 82,
    fieldsJson: F([
      {key:'contribuable',label:"Raison sociale du contribuable",type:'text',required:true},
      {key:'cabinet',label:"Cabinet fiscal",type:'text',required:true},
      {key:'type_controle',label:"Type de contrôle (VG, ESFP, CSP)",type:'text',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début de la mission",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — ASSISTANCE LORS D'UN CONTRÔLE FISCAL (DGI CI)</h1><p>Entre <strong>{{contribuable}}</strong> et <strong>{{cabinet}}</strong>, à compter du <strong>{{date_debut}}</strong>.</p><h3>Article 1 – Contexte</h3><p>Contrôle fiscal de type : <strong>{{type_controle}}</strong>.</p><h3>Article 2 – Missions du cabinet</h3><p>Analyse de l'avis de vérification, présence lors des entretiens avec les vérificateurs, revue des pièces demandées, réponse argumentée aux propositions de redressement, négociation des chefs de redressement contestés.</p><h3>Article 3 – Honoraires</h3><p><strong>{{honoraires}} FCFA</strong> HT + honoraires de succès si réduction du redressement négociée.</p><p class="signature-block">Signatures.</p></div>`
  },
  {
    code: 'cpta_recours_fiscal',
    name: "Accord de service de recours fiscal (commission contentieux DGI)",
    category: 'comptabilite_audit',
    price: 7000, priceMax: 22000,
    description: "Prestation d'assistance lors des recours fiscaux devant la Commission de Conciliation ou le Tribunal administratif en CI.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'contribuable',label:"Contribuable",type:'text',required:true},
      {key:'cabinet',label:"Cabinet fiscal/juridique",type:'text',required:true},
      {key:'montant_litige',label:"Montant du litige fiscal (FCFA)",type:'text',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — RECOURS FISCAL DGI CI</h1><p>Entre <strong>{{contribuable}}</strong> et <strong>{{cabinet}}</strong>.</p><h3>Article 1 – Litige</h3><p>Montant du redressement contesté : <strong>{{montant_litige}} FCFA</strong>.</p><h3>Article 2 – Missions</h3><p>Préparation du dossier de réclamation contentieuse, représentation devant la Commission de Conciliation DGI, rédaction des mémoires, recours administratif puis contentieux si nécessaire.</p><h3>Article 3 – Honoraires</h3><p><strong>{{honoraires}} FCFA</strong> HT de base + honoraires de succès.</p><p class="signature-block">Signatures.</p></div>`
  },
  {
    code: 'cpta_tva_deductible',
    name: "Accord de service de TVA déductible (récupération TVA)",
    category: 'comptabilite_audit',
    price: 4000, priceMax: 11000,
    description: "Prestation de gestion et d'optimisation de la TVA déductible : identification des droits à déduction et demandes de remboursement DGI CI.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 69,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise",type:'text',required:true},
      {key:'cabinet',label:"Cabinet fiscal",type:'text',required:true},
      {key:'periode',label:"Période concernée",type:'text',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — TVA DÉDUCTIBLE ET RÉCUPÉRATION</h1><p>Entre <strong>{{entreprise}}</strong> et <strong>{{cabinet}}</strong> pour la période <strong>{{periode}}</strong>.</p><h3>Article 1 – Prestation</h3><p>Revue des factures d'achat pour identification de la TVA récupérable, vérification des conditions de déductibilité, établissement des demandes de crédit de TVA, suivi des remboursements DGI.</p><h3>Article 2 – Honoraires</h3><p><strong>{{honoraires}} FCFA</strong> HT + quote-part sur TVA récupérée.</p><p class="signature-block">Signatures.</p></div>`
  },
  {
    code: 'cpta_optimisation_fiscale',
    name: "Accord de service d'optimisation fiscale légale (tax planning CI)",
    category: 'comptabilite_audit',
    price: 8000, priceMax: 24000,
    description: "Mission de tax planning légal visant à réduire la charge fiscale globale dans le respect du CGI CI et des conventions fiscales UEMOA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 78,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise",type:'text',required:true},
      {key:'cabinet',label:"Cabinet fiscal",type:'text',required:true},
      {key:'charge_fiscale_actuelle',label:"Charge fiscale actuelle estimée (FCFA)",type:'text',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — OPTIMISATION FISCALE LÉGALE (TAX PLANNING)</h1><p>Entre <strong>{{entreprise}}</strong> et <strong>{{cabinet}}</strong>.</p><h3>Article 1 – Objectif</h3><p>Réduire la charge fiscale (actuellement estimée à <strong>{{charge_fiscale_actuelle}} FCFA</strong>) par des mécanismes légaux : choix du régime fiscal, optimisation des déductions, recours aux conventions fiscales, gestion des amortissements accélérés, exonérations prévues par le CGI CI et le Code des Investissements.</p><h3>Article 2 – Déontologie</h3><p>Le cabinet s'engage à ne proposer que des schémas d'optimisation strictement légaux, excluant tout abus de droit.</p><h3>Article 3 – Honoraires</h3><p><strong>{{honoraires}} FCFA</strong> HT + prime de résultat.</p><p class="signature-block">Signatures.</p></div>`
  },
  {
    code: 'cpta_decl_cedeao',
    name: "Accord de service de déclaration CEDEAO (prélèvement communautaire)",
    category: 'comptabilite_audit',
    price: 3500, priceMax: 9000,
    description: "Prestation de calcul et de déclaration du Prélèvement Communautaire de la CEDEAO applicable aux importations.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 55,
    fieldsJson: F([
      {key:'importateur',label:"Entreprise importatrice",type:'text',required:true},
      {key:'cabinet',label:"Cabinet fiscal",type:'text',required:true},
      {key:'periode',label:"Période de déclaration",type:'text',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — DÉCLARATION PRÉLÈVEMENT COMMUNAUTAIRE CEDEAO</h1><p>Entre <strong>{{importateur}}</strong> et <strong>{{cabinet}}</strong> pour la période <strong>{{periode}}</strong>.</p><h3>Article 1 – Prestation</h3><p>Calcul du Prélèvement Communautaire CEDEAO (0,5% de la valeur en douane), établissement des déclarations, paiement auprès de la douane, réconciliation avec les importations.</p><h3>Article 2 – Honoraires</h3><p><strong>{{honoraires}} FCFA</strong> HT.</p><p class="signature-block">Signatures.</p></div>`
  },
  {
    code: 'cpta_prix_transfert',
    name: "Accord de service de prix de transfert (multinationale CI)",
    category: 'comptabilite_audit',
    price: 10000, priceMax: 30000,
    description: "Prestation de documentation et de défense des prix de transfert pour les groupes multinationaux présents en Côte d'Ivoire (CGI art. 38 quater).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 73,
    fieldsJson: F([
      {key:'groupe',label:"Nom du groupe multinational",type:'text',required:true},
      {key:'entite_ci',label:"Entité ivoirienne concernée",type:'text',required:true},
      {key:'cabinet',label:"Cabinet fiscal",type:'text',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — PRIX DE TRANSFERT (MULTINATIONALE CI)</h1><p>Entre l'entité <strong>{{entite_ci}}</strong> du groupe <strong>{{groupe}}</strong> et <strong>{{cabinet}}</strong>.</p><h3>Article 1 – Prestation</h3><p>Documentation conforme à l'article 38 quater du CGI CI et aux principes OCDE directeurs sur les prix de transfert : identification des transactions intragroupe, sélection de la méthode de prix de transfert, analyse de comparabilité, rédaction du rapport de documentation.</p><h3>Article 2 – Honoraires</h3><p><strong>{{honoraires}} FCFA</strong> HT.</p><p class="signature-block">Signatures.</p></div>`
  },
  {
    code: 'cpta_retenue_source',
    name: "Accord de service de retenue à la source (IRPP employeur CI)",
    category: 'comptabilite_audit',
    price: 3500, priceMax: 9000,
    description: "Prestation de calcul, de retenue et de reversement de l'IRPP à la source pour les employeurs ivoiriens (retenue sur salaires).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 77,
    fieldsJson: F([
      {key:'employeur',label:"Employeur",type:'text',required:true},
      {key:'cabinet',label:"Cabinet paie/fiscal",type:'text',required:true},
      {key:'effectif',label:"Nombre de salariés",type:'text',required:true},
      {key:'honoraires',label:"Honoraires mensuels (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — RETENUE À LA SOURCE IRPP EMPLOYEUR (CI)</h1><p>Entre <strong>{{employeur}}</strong> (effectif : <strong>{{effectif}}</strong> salariés) et <strong>{{cabinet}}</strong>.</p><h3>Article 1 – Prestation</h3><p>Calcul mensuel de l'IRPP retenu sur salaires selon le barème progressif du CGI CI, établissement du bulletin de retenue, reversement à la DGI avant le 15 du mois suivant, établissement de la déclaration annuelle des salaires.</p><h3>Article 2 – Honoraires</h3><p><strong>{{honoraires}} FCFA</strong> HT/mois.</p><p class="signature-block">Signatures.</p></div>`
  },
  // ── Documents de synthèse ─────────────────────────────────────────────────
  {
    code: 'cpta_rapport_audit_legal',
    name: "Rapport d'audit légal (CAC CI)",
    category: 'comptabilite_audit',
    price: 8000, priceMax: 22000,
    description: "Modèle de rapport de certification du Commissaire aux Comptes pour les sociétés soumises à l'audit légal en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 87,
    fieldsJson: F([
      {key:'societe',label:"Dénomination sociale",type:'text',required:true},
      {key:'cac_nom',label:"Nom du CAC",type:'text',required:true},
      {key:'exercice',label:"Exercice clos le",type:'text',required:true},
      {key:'opinion',label:"Nature de l'opinion (certification/réserves/refus)",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>RAPPORT DU COMMISSAIRE AUX COMPTES</h1><h2>À l'Assemblée Générale des actionnaires de <strong>{{societe}}</strong></h2><h3>I. Opinion sur les comptes annuels</h3><p>En exécution de la mission qui m'a été confiée par votre Assemblée Générale, j'ai effectué l'audit des comptes annuels de la société <strong>{{societe}}</strong> relatifs à l'exercice clos le <strong>{{exercice}}</strong>.</p><h3>II. Opinion</h3><p>Opinion : <strong>{{opinion}}</strong>.</p><p>À mon avis, les comptes annuels sont réguliers, sincères et donnent une image fidèle du résultat des opérations de l'exercice écoulé ainsi que de la situation financière et du patrimoine de la société à la fin de cet exercice.</p><h3>III. Vérifications spécifiques</h3><p>J'ai également procédé aux vérifications spécifiques prévues par l'Acte Uniforme OHADA.</p><p>Fait à Abidjan, le <strong>{{date_rapport}}</strong>.<br/><strong>{{cac_nom}}</strong><br/>Commissaire aux Comptes — ONECCA-CI</p></div>`
  },
  {
    code: 'cpta_rapport_controle_interne',
    name: "Rapport de contrôle interne",
    category: 'comptabilite_audit',
    price: 6000, priceMax: 18000,
    description: "Modèle de rapport annuel sur le dispositif de contrôle interne présenté au Conseil d'Administration ou au Comité d'Audit.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 74,
    fieldsJson: F([
      {key:'organisation',label:"Organisation",type:'text',required:true},
      {key:'responsable',label:"Responsable Contrôle Interne",type:'text',required:true},
      {key:'exercice',label:"Exercice concerné",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>RAPPORT ANNUEL SUR LE CONTRÔLE INTERNE</h1><h2><strong>{{organisation}}</strong> — Exercice <strong>{{exercice}}</strong></h2><p>Établi par : <strong>{{responsable}}</strong></p><h3>1. Cadre de référence</h3><p>Le dispositif de contrôle interne est fondé sur le référentiel COSO et les recommandations de l'IIA adaptées au contexte OHADA.</p><h3>2. Évaluation des risques</h3><p>Cartographie des risques mise à jour, identification des risques majeurs et des mesures de maîtrise.</p><h3>3. Activités de contrôle</h3><p>Description des procédures de contrôle clés par processus : achats, ventes, trésorerie, paie, production.</p><h3>4. Faiblesses identifiées et plan d'actions</h3><p>Tableau des faiblesses significatives avec responsables et échéances de correction.</p><h3>5. Conclusion</h3><p>Appréciation globale du niveau de maîtrise des risques.</p><p>Rapport établi le <strong>{{date_rapport}}</strong>.</p></div>`
  },
  {
    code: 'cpta_rapport_gestion_ag',
    name: "Rapport de gestion direction (AG annuelle CI)",
    category: 'comptabilite_audit',
    price: 5000, priceMax: 14000,
    description: "Modèle de rapport de gestion présenté par la direction générale à l'Assemblée Générale Ordinaire annuelle en CI.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 79,
    fieldsJson: F([
      {key:'societe',label:"Raison sociale",type:'text',required:true},
      {key:'dirigeant',label:"Nom du Directeur Général / PDG",type:'text',required:true},
      {key:'exercice',label:"Exercice présenté",type:'text',required:true},
      {key:'resultat_net',label:"Résultat net (FCFA)",type:'text',required:true},
      {key:'date_ag',label:"Date de l'Assemblée Générale",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>RAPPORT DE GESTION</h1><h2>Présenté à l'Assemblée Générale Ordinaire Annuelle</h2><h2><strong>{{societe}}</strong> — Exercice <strong>{{exercice}}</strong></h2><p>Mesdames, Messieurs les Actionnaires,</p><p>Conformément aux dispositions de l'Acte Uniforme OHADA relatif au droit des sociétés commerciales, nous vous présentons le rapport de gestion de l'exercice clos le 31 décembre <strong>{{exercice}}</strong>.</p><h3>1. Activité et faits marquants de l'exercice</h3><p>[Description des activités principales, événements majeurs, évolution du marché]</p><h3>2. Résultats financiers</h3><p>Résultat net de l'exercice : <strong>{{resultat_net}} FCFA</strong>.</p><h3>3. Affectation du résultat</h3><p>Proposition d'affectation soumise au vote de l'Assemblée.</p><h3>4. Perspectives</h3><p>[Orientations stratégiques pour l'exercice suivant]</p><p>Fait à Abidjan, le <strong>{{date_ag}}</strong>.<br/><strong>{{dirigeant}}</strong></p></div>`
  },
  {
    code: 'cpta_plan_comptes_syscohada',
    name: "Plan de comptabilisation (plan de comptes SYSCOHADA)",
    category: 'comptabilite_audit',
    price: 3500, priceMax: 9000,
    description: "Document de référence définissant le plan de comptes SYSCOHADA personnalisé à l'entreprise et les règles d'imputation.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 62,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise",type:'text',required:true},
      {key:'responsable',label:"Responsable comptable",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption du plan",type:'date',required:true},
      {key:'secteur',label:"Secteur d'activité",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>PLAN DE COMPTABILISATION — PLAN DE COMPTES SYSCOHADA</h1><h2><strong>{{entreprise}}</strong></h2><p>Secteur : <strong>{{secteur}}</strong>. Approuvé par : <strong>{{responsable}}</strong> le <strong>{{date_adoption}}</strong>.</p><h3>Classe 1 — Comptes de ressources durables</h3><p>10 Capital, 11 Réserves, 12 Report à nouveau, 13 Résultat net de l'exercice, 16 Emprunts et dettes financières...</p><h3>Classe 2 — Comptes d'actif immobilisé</h3><p>21 Immobilisations incorporelles, 22 Terrains, 23 Bâtiments, 24 Matériel, 28 Amortissements...</p><h3>Classe 3 — Comptes de stocks</h3><p>31 Marchandises, 32 Matières premières, 36 Produits finis...</p><h3>Classe 4 — Comptes de tiers</h3><p>40 Fournisseurs, 41 Clients, 42 Personnel, 44 État et organismes...</p><h3>Classe 5 — Comptes de trésorerie</h3><p>52 Banques, 57 Caisse...</p><h3>Règles d'imputation spécifiques à l'entreprise</h3><p>[Précisions propres au secteur <strong>{{secteur}}</strong>]</p></div>`
  },
  {
    code: 'cpta_charte_integrite',
    name: "Charte du professionnel comptable et de l'intégrité financière en Afrique",
    category: 'comptabilite_audit',
    price: 3000, priceMax: 7000,
    description: "Document de référence éthique et déontologique pour les professionnels comptables exerçant en Afrique francophone (SYSCOHADA, ONECCA, UEMOA).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 58,
    fieldsJson: F([
      {key:'professionnel',label:"Nom du professionnel comptable",type:'text',required:true},
      {key:'cabinet',label:"Cabinet / employeur",type:'text',required:true},
      {key:'date_signature',label:"Date de signature de la charte",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CHARTE DU PROFESSIONNEL COMPTABLE ET DE L'INTÉGRITÉ FINANCIÈRE EN AFRIQUE</h1><p>Je soussigné(e) <strong>{{professionnel}}</strong>, exerçant au sein de <strong>{{cabinet}}</strong>, m'engage solennellement à respecter les principes fondamentaux suivants :</p><h3>1. Intégrité</h3><p>Agir avec honnêteté et droiture dans toutes mes relations professionnelles, refuser toute offre de corruption ou de falsification de comptes.</p><h3>2. Objectivité</h3><p>Ne pas laisser des préjugés, conflits d'intérêts ou influences indues altérer mes jugements professionnels.</p><h3>3. Compétence professionnelle et diligence</h3><p>Maintenir mes connaissances à niveau, respecter les normes SYSCOHADA, ONECCA-CI et les standards IFAC applicables en Afrique.</p><h3>4. Confidentialité</h3><p>Préserver le secret professionnel sur toutes les informations obtenues dans l'exercice de mes fonctions.</p><h3>5. Comportement professionnel</h3><p>Me conformer aux lois et réglementations en vigueur (OHADA, CGI CI, Code du Commerce ivoirien) et éviter tout acte discréditant la profession.</p><h3>6. Lutte contre la corruption et le blanchiment</h3><p>Respecter les dispositifs LAB-FT, signaler toute opération suspecte aux autorités compétentes.</p><p>Fait à Abidjan, le <strong>{{date_signature}}</strong>.<br/>Signature : <strong>{{professionnel}}</strong></p></div>`
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
  console.log(`Batch 113a OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
