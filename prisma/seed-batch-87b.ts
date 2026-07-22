import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ─── FISCALITÉ INTERNATIONALE / PRIX DE TRANSFERT (fis2_) ───
  {
    code: 'fis2_001', name: "Accord de Prix de Transfert (Documentation OCDE)", category: 'juridique_admin', price: 18000, priceMax: 54000,
    description: "Accord encadrant la documentation des prix de transfert selon les lignes directrices OCDE, applicable aux groupes multinationaux opérant en Côte d'Ivoire et en zone OHADA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'nom_groupe',label:"Nom du groupe multinational",type:'text',required:true},
      {key:'entite_locale',label:"Entité locale concernée",type:'text',required:true},
      {key:'exercice_fiscal',label:"Exercice fiscal de référence",type:'text',required:true},
      {key:'date_accord',label:"Date de signature",type:'date',required:true},
      {key:'transactions_controlees',label:"Description des transactions contrôlées",type:'textarea',required:true},
      {key:'methode_prix',label:"Méthode de prix de transfert retenue",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PRIX DE TRANSFERT</h1><h2>Documentation OCDE — Groupe {{nom_groupe}}</h2><p><strong>Entité locale :</strong> {{entite_locale}}</p><p><strong>Exercice fiscal :</strong> {{exercice_fiscal}}</p><p><strong>Date :</strong> {{date_accord}}</p><h3>1. OBJET</h3><p>Le présent accord établit la documentation des prix de transfert conformément aux lignes directrices de l'OCDE et aux obligations fiscales en vigueur en Côte d'Ivoire.</p><h3>2. TRANSACTIONS CONTRÔLÉES</h3><p>{{transactions_controlees}}</p><h3>3. MÉTHODE RETENUE</h3><p>{{methode_prix}}</p><h3>4. CONFORMITÉ OHADA</h3><p>Les parties s'engagent à respecter les dispositions fiscales OHADA et les conventions bilatérales applicables.</p></div>`
  },
  {
    code: 'fis2_002', name: "Accord de Politique de Prix de Transfert Intra-groupe", category: 'juridique_admin', price: 15000, priceMax: 45000,
    description: "Politique interne définissant les règles de fixation des prix de transfert entre entités d'un même groupe, en conformité avec le principe de pleine concurrence.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'groupe_nom',label:"Dénomination du groupe",type:'text',required:true},
      {key:'entites_concernees',label:"Entités concernées par la politique",type:'textarea',required:true},
      {key:'date_entree_vigueur',label:"Date d'entrée en vigueur",type:'date',required:true},
      {key:'types_transactions',label:"Types de transactions visées",type:'textarea',required:true},
      {key:'responsable_conformite',label:"Responsable conformité fiscale",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>POLITIQUE DE PRIX DE TRANSFERT INTRA-GROUPE</h1><h2>Groupe {{groupe_nom}}</h2><p><strong>Date d'entrée en vigueur :</strong> {{date_entree_vigueur}}</p><h3>1. CHAMP D'APPLICATION</h3><p>{{entites_concernees}}</p><h3>2. TRANSACTIONS VISÉES</h3><p>{{types_transactions}}</p><h3>3. PRINCIPE DE PLEINE CONCURRENCE</h3><p>Toutes les transactions intra-groupe sont effectuées à des conditions de marché conformes au principe de pleine concurrence (arm's length) reconnu par l'OCDE.</p><h3>4. RESPONSABLE</h3><p>{{responsable_conformite}}</p></div>`
  },
  {
    code: 'fis2_003', name: "Rapport de Documentation de Prix de Transfert (Master File)", category: 'juridique_admin', price: 20000, priceMax: 60000,
    description: "Rapport de documentation groupe (Master File) exigé par l'Action 13 du plan BEPS de l'OCDE, décrivant la structure organisationnelle, les activités et les flux financiers du groupe.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 75,
    fieldsJson: F([
      {key:'groupe_nom',label:"Nom du groupe multinational",type:'text',required:true},
      {key:'exercice',label:"Exercice fiscal",type:'text',required:true},
      {key:'structure_groupe',label:"Description de la structure du groupe",type:'textarea',required:true},
      {key:'activites_principales',label:"Activités principales du groupe",type:'textarea',required:true},
      {key:'date_rapport',label:"Date d'établissement du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>MASTER FILE — DOCUMENTATION GROUPE</h1><h2>Groupe {{groupe_nom}} — Exercice {{exercice}}</h2><p><strong>Date :</strong> {{date_rapport}}</p><h3>1. STRUCTURE ORGANISATIONNELLE</h3><p>{{structure_groupe}}</p><h3>2. ACTIVITÉS PRINCIPALES</h3><p>{{activites_principales}}</p><h3>3. ACTIFS INCORPORELS</h3><p>Description des actifs incorporels détenus et utilisés par le groupe, conformément à l'Action 13 BEPS.</p><h3>4. FLUX FINANCIERS INTERENTITÉS</h3><p>Tableau récapitulatif des flux financiers intra-groupe pour l'exercice concerné.</p></div>`
  },
  {
    code: 'fis2_004', name: "Rapport de Documentation de Prix de Transfert (Local File)", category: 'juridique_admin', price: 17000, priceMax: 51000,
    description: "Fichier local de documentation des prix de transfert pour l'entité ivoirienne, détaillant les transactions contrôlées et leur conformité au principe de pleine concurrence.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'entite_locale',label:"Entité locale (raison sociale)",type:'text',required:true},
      {key:'exercice',label:"Exercice fiscal",type:'text',required:true},
      {key:'transactions_detail',label:"Détail des transactions contrôlées",type:'textarea',required:true},
      {key:'analyse_comparabilite',label:"Analyse de comparabilité",type:'textarea',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>LOCAL FILE — DOCUMENTATION PRIX DE TRANSFERT</h1><h2>{{entite_locale}} — Exercice {{exercice}}</h2><p><strong>Date :</strong> {{date_rapport}}</p><h3>1. TRANSACTIONS CONTRÔLÉES</h3><p>{{transactions_detail}}</p><h3>2. ANALYSE DE COMPARABILITÉ</h3><p>{{analyse_comparabilite}}</p><h3>3. SÉLECTION DE LA MÉTHODE</h3><p>Justification de la méthode de prix de transfert sélectionnée et résultats de l'analyse économique.</p><h3>4. CONCLUSION</h3><p>Les transactions documentées sont conformes au principe de pleine concurrence.</p></div>`
  },
  {
    code: 'fis2_005', name: "Accord de Répartition de Coûts (Cost Sharing Agreement)", category: 'juridique_admin', price: 16000, priceMax: 48000,
    description: "Accord de répartition des coûts entre entités du groupe pour le développement conjoint d'actifs incorporels ou de services, conformément aux lignes directrices OCDE.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'participants',label:"Participants à l'accord",type:'textarea',required:true},
      {key:'objet_partage',label:"Objet du partage de coûts",type:'text',required:true},
      {key:'cle_repartition',label:"Clé de répartition des coûts",type:'text',required:true},
      {key:'date_effet',label:"Date d'effet",type:'date',required:true},
      {key:'duree_accord',label:"Durée de l'accord",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE RÉPARTITION DE COÛTS</h1><h2>Cost Sharing Agreement</h2><p><strong>Date d'effet :</strong> {{date_effet}} | <strong>Durée :</strong> {{duree_accord}}</p><h3>1. PARTICIPANTS</h3><p>{{participants}}</p><h3>2. OBJET</h3><p>{{objet_partage}}</p><h3>3. CLÉ DE RÉPARTITION</h3><p>{{cle_repartition}}</p><h3>4. CONTRIBUTIONS ET AJUSTEMENTS</h3><p>Les contributions de chaque participant sont proportionnelles aux bénéfices attendus et ajustées annuellement.</p><h3>5. CONFORMITÉ OCDE</h3><p>Le présent accord respecte les recommandations de l'OCDE en matière de cost sharing (Chapitre VIII des lignes directrices).</p></div>`
  },
  {
    code: 'fis2_006', name: "Accord de Prestations de Services Intra-groupe", category: 'juridique_admin', price: 12000, priceMax: 36000,
    description: "Convention de prestations de services entre sociétés d'un même groupe, avec justification du prix et respect du principe de pleine concurrence selon l'OCDE.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 78,
    fieldsJson: F([
      {key:'prestataire',label:"Société prestataire",type:'text',required:true},
      {key:'beneficiaire',label:"Société bénéficiaire",type:'text',required:true},
      {key:'services_rendus',label:"Description des services rendus",type:'textarea',required:true},
      {key:'prix_service',label:"Prix / taux de facturation",type:'text',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PRESTATIONS DE SERVICES INTRA-GROUPE</h1><p><strong>Prestataire :</strong> {{prestataire}}</p><p><strong>Bénéficiaire :</strong> {{beneficiaire}}</p><p><strong>Date :</strong> {{date_contrat}}</p><h3>1. SERVICES RENDUS</h3><p>{{services_rendus}}</p><h3>2. TARIFICATION</h3><p>{{prix_service}}</p><h3>3. BÉNÉFICE DU SERVICE</h3><p>Le bénéficiaire atteste de l'utilité économique des services reçus (benefit test OCDE).</p><h3>4. FACTURATION</h3><p>Les prestations seront facturées selon la périodicité convenue, avec justificatifs à l'appui.</p></div>`
  },
  {
    code: 'fis2_007', name: "Accord de Redevances Intra-groupe (IP Holding)", category: 'juridique_admin', price: 16000, priceMax: 50000,
    description: "Contrat de licence de propriété intellectuelle entre une IP holding et ses filiales, fixant les redevances conformément au principe de pleine concurrence.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 66,
    fieldsJson: F([
      {key:'concedant',label:"Société concédante (IP holding)",type:'text',required:true},
      {key:'licencie',label:"Société licenciée",type:'text',required:true},
      {key:'droits_concedes',label:"Droits de propriété intellectuelle concédés",type:'textarea',required:true},
      {key:'taux_redevance',label:"Taux de redevance (%)",type:'text',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE REDEVANCES INTRA-GROUPE</h1><h2>Licence de Propriété Intellectuelle</h2><p><strong>Concédant :</strong> {{concedant}} | <strong>Licencié :</strong> {{licencie}}</p><p><strong>Date :</strong> {{date_contrat}}</p><h3>1. DROITS CONCÉDÉS</h3><p>{{droits_concedes}}</p><h3>2. REDEVANCES</h3><p>Taux : {{taux_redevance}} du chiffre d'affaires net lié à l'exploitation des droits concédés.</p><h3>3. ANALYSE OCDE</h3><p>Le taux de redevance a été déterminé par référence aux transactions comparables sur le marché (méthode CUP/TNMM).</p><h3>4. SUBSTANCE ÉCONOMIQUE</h3><p>Le concédant dispose d'une substance économique réelle justifiant la détention des droits de propriété intellectuelle.</p></div>`
  },
  {
    code: 'fis2_008', name: "Accord de Prêt Intra-groupe (Taux d'Intérêt de Pleine Concurrence)", category: 'juridique_admin', price: 11000, priceMax: 33000,
    description: "Convention de prêt entre sociétés liées, avec taux d'intérêt fixé conformément au principe de pleine concurrence et aux directives fiscales ivoiriennes.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 74,
    fieldsJson: F([
      {key:'preteur',label:"Société prêteuse",type:'text',required:true},
      {key:'emprunteur',label:"Société emprunteuse",type:'text',required:true},
      {key:'montant_pret',label:"Montant du prêt (FCFA)",type:'text',required:true},
      {key:'taux_interet',label:"Taux d'intérêt annuel (%)",type:'text',required:true},
      {key:'date_contrat',label:"Date du contrat de prêt",type:'date',required:true},
      {key:'duree_remboursement',label:"Durée de remboursement",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE PRÊT INTRA-GROUPE</h1><p><strong>Prêteur :</strong> {{preteur}} | <strong>Emprunteur :</strong> {{emprunteur}}</p><p><strong>Date :</strong> {{date_contrat}}</p><h3>1. CONDITIONS DU PRÊT</h3><p><strong>Montant :</strong> {{montant_pret}} FCFA</p><p><strong>Taux d'intérêt :</strong> {{taux_interet}} par an</p><p><strong>Durée :</strong> {{duree_remboursement}}</p><h3>2. JUSTIFICATION DU TAUX</h3><p>Le taux d'intérêt retenu correspond au taux de pleine concurrence déterminé par comparaison avec des transactions bancaires similaires sur le marché.</p><h3>3. REMBOURSEMENT</h3><p>L'emprunteur remboursera le principal et les intérêts selon l'échéancier annexé au présent accord.</p></div>`
  },
  {
    code: 'fis2_009', name: "Accord de Garantie Intra-groupe", category: 'juridique_admin', price: 10000, priceMax: 30000,
    description: "Convention de garantie accordée par une société mère à une filiale, avec commission de garantie fixée au prix de marché conformément aux principes OCDE.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      {key:'garant',label:"Société garante",type:'text',required:true},
      {key:'beneficiaire_garantie',label:"Société bénéficiaire",type:'text',required:true},
      {key:'obligation_garantie',label:"Obligation garantie",type:'textarea',required:true},
      {key:'commission_garantie',label:"Commission de garantie (%)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE GARANTIE INTRA-GROUPE</h1><p><strong>Garant :</strong> {{garant}} | <strong>Bénéficiaire :</strong> {{beneficiaire_garantie}}</p><p><strong>Date :</strong> {{date_accord}}</p><h3>1. OBJET DE LA GARANTIE</h3><p>{{obligation_garantie}}</p><h3>2. COMMISSION DE GARANTIE</h3><p>{{commission_garantie}} annuelle sur le montant garanti, correspondant au prix de marché.</p><h3>3. DURÉE ET CONDITIONS</h3><p>La garantie est accordée pour la durée de l'obligation sous-jacente et prend fin automatiquement à l'extinction de celle-ci.</p></div>`
  },
  {
    code: 'fis2_010', name: "Accord de Résiliation d'Accord de Prix de Transfert", category: 'juridique_admin', price: 9000, priceMax: 27000,
    description: "Document formalisant la résiliation d'un accord de prix de transfert existant, avec règlement des ajustements éventuels et documentation des motifs.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 55,
    fieldsJson: F([
      {key:'parties',label:"Parties à l'accord résilié",type:'textarea',required:true},
      {key:'accord_reference',label:"Référence de l'accord résilié",type:'text',required:true},
      {key:'date_resiliation',label:"Date de résiliation",type:'date',required:true},
      {key:'motifs_resiliation',label:"Motifs de la résiliation",type:'textarea',required:true},
      {key:'ajustements_prevus',label:"Ajustements financiers prévus",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE RÉSILIATION DE PRIX DE TRANSFERT</h1><p><strong>Date de résiliation :</strong> {{date_resiliation}}</p><h3>1. PARTIES</h3><p>{{parties}}</p><h3>2. ACCORD RÉSILIÉ</h3><p>Référence : {{accord_reference}}</p><h3>3. MOTIFS</h3><p>{{motifs_resiliation}}</p><h3>4. AJUSTEMENTS</h3><p>{{ajustements_prevus}}</p><h3>5. EFFETS DE LA RÉSILIATION</h3><p>La résiliation ne remet pas en cause les exercices fiscaux antérieurs déjà documentés et clôturés.</p></div>`
  },
  {
    code: 'fis2_011', name: "Accord de Ruling Fiscal (Accord Préalable en matière de Prix de Transfert)", category: 'juridique_admin', price: 22000, priceMax: 66000,
    description: "Demande et accord préalable de prix de transfert (APA) soumis à la Direction Générale des Impôts de Côte d'Ivoire, sécurisant la politique tarifaire du groupe.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 80,
    fieldsJson: F([
      {key:'contribuable',label:"Contribuable demandeur",type:'text',required:true},
      {key:'dgi_referent',label:"Service DGI référent",type:'text',required:true},
      {key:'transactions_visees',label:"Transactions visées par l'APA",type:'textarea',required:true},
      {key:'methode_proposee',label:"Méthode de prix proposée",type:'text',required:true},
      {key:'date_demande',label:"Date de la demande",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD PRÉALABLE EN MATIÈRE DE PRIX DE TRANSFERT</h1><h2>Advance Pricing Agreement (APA)</h2><p><strong>Contribuable :</strong> {{contribuable}} | <strong>Service DGI :</strong> {{dgi_referent}}</p><p><strong>Date de demande :</strong> {{date_demande}}</p><h3>1. OBJET DE LA DEMANDE</h3><p>Le contribuable sollicite un accord préalable sur la méthode de détermination des prix de transfert pour les transactions suivantes :</p><p>{{transactions_visees}}</p><h3>2. MÉTHODE PROPOSÉE</h3><p>{{methode_proposee}}</p><h3>3. ENGAGEMENTS DU CONTRIBUABLE</h3><p>Le contribuable s'engage à respecter la méthode convenue et à fournir annuellement un rapport de suivi à la DGI.</p></div>`
  },
  {
    code: 'fis2_012', name: "Accord de Régularisation Fiscale (Redressement Prix de Transfert)", category: 'juridique_admin', price: 14000, priceMax: 42000,
    description: "Protocole transactionnel entre l'administration fiscale et un contribuable pour régulariser un redressement en matière de prix de transfert, incluant pénalités et plan de paiement.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 62,
    fieldsJson: F([
      {key:'contribuable',label:"Contribuable concerné",type:'text',required:true},
      {key:'exercices_redresses',label:"Exercices fiscaux redressés",type:'text',required:true},
      {key:'montant_redressement',label:"Montant du redressement (FCFA)",type:'text',required:true},
      {key:'penalites',label:"Pénalités et intérêts de retard",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord de régularisation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE RÉGULARISATION FISCALE</h1><h2>Redressement en matière de Prix de Transfert</h2><p><strong>Contribuable :</strong> {{contribuable}} | <strong>Date :</strong> {{date_accord}}</p><h3>1. EXERCICES CONCERNÉS</h3><p>{{exercices_redresses}}</p><h3>2. MONTANT DU REDRESSEMENT</h3><p>Principal : {{montant_redressement}} FCFA</p><p>Pénalités : {{penalites}}</p><h3>3. PLAN DE PAIEMENT</h3><p>Les parties conviennent d'un échéancier de règlement des sommes dues dans les conditions prévues par le Code Général des Impôts ivoirien.</p><h3>4. CLÔTURE DU LITIGE</h3><p>Le présent accord vaut désistement de tout recours contentieux relatif aux exercices visés.</p></div>`
  },
  {
    code: 'fis2_013', name: "Accord de Déclaration Pays par Pays (CBCR OCDE)", category: 'juridique_admin', price: 18000, priceMax: 54000,
    description: "Documentation et accord relatifs à la déclaration pays par pays (Country-by-Country Report) exigée par l'Action 13 BEPS de l'OCDE pour les groupes multinationaux.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 71,
    fieldsJson: F([
      {key:'groupe_nom',label:"Nom du groupe multinational",type:'text',required:true},
      {key:'entite_declarante',label:"Entité déclarante désignée",type:'text',required:true},
      {key:'exercice_fiscal',label:"Exercice fiscal",type:'text',required:true},
      {key:'pays_couverts',label:"Pays couverts par la déclaration",type:'textarea',required:true},
      {key:'date_depot',label:"Date de dépôt de la déclaration",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>DÉCLARATION PAYS PAR PAYS — CBCR</h1><h2>Groupe {{groupe_nom}} — Exercice {{exercice_fiscal}}</h2><p><strong>Entité déclarante :</strong> {{entite_declarante}} | <strong>Date de dépôt :</strong> {{date_depot}}</p><h3>1. PÉRIMÈTRE</h3><p>{{pays_couverts}}</p><h3>2. INFORMATIONS DÉCLARÉES</h3><p>Conformément à l'Action 13 BEPS et aux dispositions locales, la déclaration reprend pour chaque pays : chiffre d'affaires, résultat avant impôt, impôts payés, effectifs et actifs.</p><h3>3. CONFIDENTIALITÉ</h3><p>Les informations contenues dans la CBCR sont soumises au secret fiscal et échangées uniquement entre autorités compétentes signataires d'accords d'échange automatique.</p></div>`
  },
  {
    code: 'fis2_014', name: "Accord de Déclaration de la Structure du Groupe (GloBE, Pilier 2)", category: 'juridique_admin', price: 20000, priceMax: 60000,
    description: "Documentation relative à la déclaration de la structure du groupe et au calcul du taux effectif d'imposition minimum (GloBE/Pilier 2 OCDE) pour les groupes présents en Afrique.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 67,
    fieldsJson: F([
      {key:'groupe_nom',label:"Nom du groupe",type:'text',required:true},
      {key:'entite_mere',label:"Entité mère ultime",type:'text',required:true},
      {key:'exercice',label:"Exercice fiscal",type:'text',required:true},
      {key:'taux_effectif',label:"Taux effectif d'imposition calculé (%)",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>DÉCLARATION GloBE — PILIER 2</h1><h2>Groupe {{groupe_nom}} — Entité mère : {{entite_mere}}</h2><p><strong>Exercice :</strong> {{exercice}} | <strong>Date :</strong> {{date_rapport}}</p><h3>1. CONTEXTE RÉGLEMENTAIRE</h3><p>Le Pilier 2 de l'OCDE (GloBE) instaure un impôt minimum mondial de 15% pour les groupes dont le chiffre d'affaires consolidé dépasse 750 millions EUR.</p><h3>2. TAUX EFFECTIF D'IMPOSITION</h3><p>Taux calculé pour l'exercice : {{taux_effectif}}</p><h3>3. MESURES COMPENSATOIRES</h3><p>En cas de taux inférieur au minimum, l'impôt complémentaire (top-up tax) sera calculé et acquitté conformément aux règles GloBE.</p></div>`
  },
  {
    code: 'fis2_015', name: "Accord d'Échange Automatique d'Informations (CRS/OCDE)", category: 'juridique_admin', price: 13000, priceMax: 39000,
    description: "Protocole de conformité à la norme d'échange automatique d'informations CRS (Common Reporting Standard) de l'OCDE, applicable aux institutions financières ivoiriennes.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 63,
    fieldsJson: F([
      {key:'institution_financiere',label:"Institution financière concernée",type:'text',required:true},
      {key:'autorite_competente',label:"Autorité compétente locale",type:'text',required:true},
      {key:'pays_partenaires',label:"Pays partenaires CRS",type:'textarea',required:true},
      {key:'date_mise_en_oeuvre',label:"Date de mise en oeuvre",type:'date',required:true},
      {key:'responsable_crs',label:"Responsable CRS désigné",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CONFORMITÉ CRS</h1><h2>Échange Automatique d'Informations — OCDE</h2><p><strong>Institution :</strong> {{institution_financiere}} | <strong>Autorité :</strong> {{autorite_competente}}</p><p><strong>Date :</strong> {{date_mise_en_oeuvre}}</p><h3>1. PAYS PARTENAIRES</h3><p>{{pays_partenaires}}</p><h3>2. OBLIGATIONS DE DÉCLARATION</h3><p>L'institution s'engage à identifier les comptes déclarables, collecter les informations requises et les transmettre à l'autorité compétente selon la norme CRS.</p><h3>3. RESPONSABLE</h3><p>{{responsable_crs}}</p></div>`
  },
  {
    code: 'fis2_016', name: "Accord de Lutte contre l'Érosion de la Base Fiscale (BEPS)", category: 'juridique_admin', price: 15000, priceMax: 45000,
    description: "Engagement et plan d'action d'une multinationale pour la conformité au plan BEPS de l'OCDE, incluant la substance économique et la transparence fiscale en Afrique.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 69,
    fieldsJson: F([
      {key:'groupe_nom',label:"Nom du groupe",type:'text',required:true},
      {key:'actions_beps',label:"Actions BEPS prioritaires identifiées",type:'textarea',required:true},
      {key:'plan_action',label:"Plan d'action de mise en conformité",type:'textarea',required:true},
      {key:'date_engagement',label:"Date d'engagement",type:'date',required:true},
      {key:'responsable_beps',label:"Responsable du projet BEPS",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CONFORMITÉ BEPS</h1><h2>Groupe {{groupe_nom}}</h2><p><strong>Date :</strong> {{date_engagement}} | <strong>Responsable :</strong> {{responsable_beps}}</p><h3>1. ACTIONS PRIORITAIRES</h3><p>{{actions_beps}}</p><h3>2. PLAN D'ACTION</h3><p>{{plan_action}}</p><h3>3. GOUVERNANCE</h3><p>Un comité de pilotage BEPS se réunit trimestriellement pour suivre l'avancement du plan de conformité et produire un rapport annuel.</p></div>`
  },
  {
    code: 'fis2_017', name: "Accord de Convention Fiscale Bilatérale (Avoidance Double Imposition)", category: 'juridique_admin', price: 14000, priceMax: 42000,
    description: "Guide pratique et accord d'application des conventions fiscales bilatérales signées par la Côte d'Ivoire pour éviter la double imposition sur les revenus transfrontaliers.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 73,
    fieldsJson: F([
      {key:'contribuable',label:"Contribuable concerné",type:'text',required:true},
      {key:'pays_source',label:"Pays source des revenus",type:'text',required:true},
      {key:'type_revenus',label:"Type de revenus visés",type:'text',required:true},
      {key:'convention_applicable',label:"Convention fiscale applicable",type:'text',required:true},
      {key:'date_application',label:"Date d'application",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>APPLICATION DE CONVENTION FISCALE BILATÉRALE</h1><h2>Évitement de la Double Imposition</h2><p><strong>Contribuable :</strong> {{contribuable}} | <strong>Date :</strong> {{date_application}}</p><h3>1. REVENUS VISÉS</h3><p>Type : {{type_revenus}} | Pays source : {{pays_source}}</p><h3>2. CONVENTION APPLICABLE</h3><p>{{convention_applicable}}</p><h3>3. MÉCANISME D'ÉLIMINATION</h3><p>Conformément à la convention, la double imposition est éliminée par la méthode de l'exemption ou du crédit d'impôt selon la nature des revenus.</p><h3>4. DÉMARCHES ADMINISTRATIVES</h3><p>Le contribuable fournira les formulaires de résidence fiscale et attestations requis aux administrations concernées.</p></div>`
  },
  {
    code: 'fis2_018', name: "Accord de Substance Économique (Economic Substance)", category: 'juridique_admin', price: 13000, priceMax: 39000,
    description: "Documentation attestant de la substance économique réelle d'une entité dans sa juridiction de résidence, conformément aux recommandations OCDE et aux exigences BEPS.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 64,
    fieldsJson: F([
      {key:'entite',label:"Entité concernée",type:'text',required:true},
      {key:'juridiction',label:"Juridiction de résidence",type:'text',required:true},
      {key:'activites_substance',label:"Activités constitutives de substance",type:'textarea',required:true},
      {key:'effectifs_locaux',label:"Effectifs et qualifications locaux",type:'text',required:true},
      {key:'date_declaration',label:"Date de la déclaration",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>DÉCLARATION DE SUBSTANCE ÉCONOMIQUE</h1><p><strong>Entité :</strong> {{entite}} | <strong>Juridiction :</strong> {{juridiction}}</p><p><strong>Date :</strong> {{date_declaration}}</p><h3>1. ACTIVITÉS DE SUBSTANCE</h3><p>{{activites_substance}}</p><h3>2. RESSOURCES HUMAINES</h3><p>{{effectifs_locaux}}</p><h3>3. INFRASTRUCTURE</h3><p>L'entité dispose de locaux et d'équipements adaptés à ses activités dans sa juridiction de résidence.</p><h3>4. DÉCISION ET GOUVERNANCE</h3><p>Les décisions stratégiques sont prises localement par des dirigeants qualifiés résidents.</p></div>`
  },
  {
    code: 'fis2_019', name: "Accord de Holding Offshore et Restructuration Fiscale", category: 'juridique_admin', price: 19000, priceMax: 57000,
    description: "Documentation d'une restructuration fiscale impliquant une holding offshore, avec analyse des risques BEPS, de la substance économique et de la conformité aux règles anti-abus.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 61,
    fieldsJson: F([
      {key:'holding',label:"Entité holding",type:'text',required:true},
      {key:'filiales',label:"Filiales concernées par la restructuration",type:'textarea',required:true},
      {key:'objectif_restructuration',label:"Objectif économique de la restructuration",type:'textarea',required:true},
      {key:'risques_identifies',label:"Risques fiscaux identifiés et mesures",type:'textarea',required:true},
      {key:'date_restructuration',label:"Date de la restructuration",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE RESTRUCTURATION FISCALE — HOLDING OFFSHORE</h1><p><strong>Holding :</strong> {{holding}} | <strong>Date :</strong> {{date_restructuration}}</p><h3>1. FILIALES CONCERNÉES</h3><p>{{filiales}}</p><h3>2. OBJECTIF ÉCONOMIQUE</h3><p>{{objectif_restructuration}}</p><h3>3. ANALYSE DES RISQUES</h3><p>{{risques_identifies}}</p><h3>4. CONFORMITÉ ANTI-ABUS</h3><p>La restructuration est justifiée par des motifs économiques légitimes et ne constitue pas un montage artificiel au sens des règles anti-abus BEPS/OCDE.</p></div>`
  },
  {
    code: 'fis2_020', name: "Accord de Résidence Fiscale d'un Dirigeant Expatrié", category: 'juridique_admin', price: 10000, priceMax: 30000,
    description: "Document établissant et attestant la résidence fiscale d'un dirigeant expatrié en Côte d'Ivoire, avec application des conventions fiscales bilatérales applicables.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'dirigeant_nom',label:"Nom et prénom du dirigeant",type:'text',required:true},
      {key:'nationalite',label:"Nationalité",type:'text',required:true},
      {key:'date_arrivee',label:"Date d'arrivée en Côte d'Ivoire",type:'date',required:true},
      {key:'employeur_local',label:"Employeur local",type:'text',required:true},
      {key:'convention_applicable',label:"Convention fiscale applicable",type:'text',required:false}
    ]),
    body: `<div class="doc"><h1>ATTESTATION DE RÉSIDENCE FISCALE — DIRIGEANT EXPATRIÉ</h1><p><strong>Nom :</strong> {{dirigeant_nom}} | <strong>Nationalité :</strong> {{nationalite}}</p><p><strong>Employeur :</strong> {{employeur_local}} | <strong>Arrivée en CI :</strong> {{date_arrivee}}</p><h3>1. ÉTABLISSEMENT DE LA RÉSIDENCE FISCALE</h3><p>Le dirigeant susmentionné est résident fiscal en Côte d'Ivoire conformément aux critères du Code Général des Impôts ivoirien (foyer permanent, séjour habituel, centre des intérêts économiques).</p><h3>2. CONVENTION APPLICABLE</h3><p>{{convention_applicable}}</p><h3>3. OBLIGATIONS DÉCLARATIVES</h3><p>Le dirigeant est tenu de souscrire une déclaration d'impôt sur le revenu en Côte d'Ivoire pour ses revenus de source ivoirienne et, le cas échéant, mondiaux selon la convention applicable.</p></div>`
  },
  {
    code: 'fis2_021', name: "Rapport d'Audit de Prix de Transfert", category: 'juridique_admin', price: 21000, priceMax: 63000,
    description: "Rapport d'audit interne ou externe des prix de transfert pratiqués par une entité ivoirienne, avec recommandations de mise en conformité et plan de remédiation.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 76,
    fieldsJson: F([
      {key:'entite_auditee',label:"Entité auditée",type:'text',required:true},
      {key:'auditeur',label:"Cabinet ou auditeur mandaté",type:'text',required:true},
      {key:'periode_auditee',label:"Période auditée",type:'text',required:true},
      {key:'constats_principaux',label:"Constats principaux de l'audit",type:'textarea',required:true},
      {key:'date_rapport',label:"Date du rapport d'audit",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT D'AUDIT DE PRIX DE TRANSFERT</h1><p><strong>Entité auditée :</strong> {{entite_auditee}} | <strong>Auditeur :</strong> {{auditeur}}</p><p><strong>Période :</strong> {{periode_auditee}} | <strong>Date :</strong> {{date_rapport}}</p><h3>1. CONSTATS PRINCIPAUX</h3><p>{{constats_principaux}}</p><h3>2. RISQUES IDENTIFIÉS</h3><p>Analyse des transactions présentant un risque de requalification par l'administration fiscale ivoirienne.</p><h3>3. RECOMMANDATIONS</h3><p>Plan d'action détaillé pour la mise en conformité des politiques de prix de transfert dans les 12 mois suivant l'audit.</p><h3>4. CONCLUSION</h3><p>Le présent rapport est confidentiel et couvert par le secret professionnel de l'auditeur mandaté.</p></div>`
  },
  {
    code: 'fis2_022', name: "Plan de Conformité Fiscale Internationale", category: 'juridique_admin', price: 16000, priceMax: 48000,
    description: "Plan stratégique de mise en conformité fiscale internationale pour un groupe multinational opérant en Afrique, couvrant BEPS, CRS, prix de transfert et gouvernance fiscale.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'groupe_nom',label:"Nom du groupe",type:'text',required:true},
      {key:'perimetre_geographique',label:"Périmètre géographique",type:'textarea',required:true},
      {key:'axes_prioritaires',label:"Axes prioritaires du plan",type:'textarea',required:true},
      {key:'budget_conformite',label:"Budget alloué à la conformité",type:'text',required:true},
      {key:'date_plan',label:"Date du plan",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE CONFORMITÉ FISCALE INTERNATIONALE</h1><h2>Groupe {{groupe_nom}}</h2><p><strong>Date :</strong> {{date_plan}}</p><h3>1. PÉRIMÈTRE</h3><p>{{perimetre_geographique}}</p><h3>2. AXES PRIORITAIRES</h3><p>{{axes_prioritaires}}</p><h3>3. RESSOURCES</h3><p>Budget alloué : {{budget_conformite}}</p><h3>4. INDICATEURS DE SUIVI</h3><p>Des KPI de conformité fiscale seront suivis trimestriellement par le Comité d'Audit et le Directeur Fiscal Groupe.</p></div>`
  },
  {
    code: 'fis2_023', name: "Accord de Service de Conseil en Fiscalité Internationale", category: 'juridique_admin', price: 12000, priceMax: 36000,
    description: "Contrat de prestation de services de conseil en fiscalité internationale entre un cabinet spécialisé et une entreprise ivoirienne, couvrant prix de transfert et optimisation fiscale.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 74,
    fieldsJson: F([
      {key:'cabinet',label:"Cabinet de conseil",type:'text',required:true},
      {key:'client',label:"Entreprise cliente",type:'text',required:true},
      {key:'missions',label:"Missions de conseil confiées",type:'textarea',required:true},
      {key:'honoraires',label:"Honoraires convenus (FCFA)",type:'text',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE CONSEIL EN FISCALITÉ INTERNATIONALE</h1><p><strong>Cabinet :</strong> {{cabinet}} | <strong>Client :</strong> {{client}}</p><p><strong>Date :</strong> {{date_contrat}}</p><h3>1. MISSIONS</h3><p>{{missions}}</p><h3>2. HONORAIRES</h3><p>{{honoraires}} FCFA, facturés selon les jalons convenus.</p><h3>3. CONFIDENTIALITÉ</h3><p>Le cabinet s'engage à la confidentialité absolue sur les informations fiscales et financières communiquées par le client.</p><h3>4. DROIT APPLICABLE</h3><p>Le présent contrat est soumis au droit ivoirien et aux règles déontologiques de la profession d'expert-comptable et fiscal.</p></div>`
  },
  {
    code: 'fis2_024', name: "Accord de Partenariat DGI-Entreprise Multinationale", category: 'juridique_admin', price: 18000, priceMax: 54000,
    description: "Protocole de coopération entre la Direction Générale des Impôts de Côte d'Ivoire et une entreprise multinationale pour la transparence fiscale et la sécurisation des relations.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 58,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise multinationale",type:'text',required:true},
      {key:'dgi_representant',label:"Représentant DGI",type:'text',required:true},
      {key:'engagements_entreprise',label:"Engagements de l'entreprise",type:'textarea',required:true},
      {key:'engagements_dgi',label:"Engagements de la DGI",type:'textarea',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PROTOCOLE DE PARTENARIAT FISCAL</h1><h2>DGI Côte d'Ivoire — {{entreprise}}</h2><p><strong>Représentant DGI :</strong> {{dgi_representant}} | <strong>Date :</strong> {{date_signature}}</p><h3>1. ENGAGEMENTS DE L'ENTREPRISE</h3><p>{{engagements_entreprise}}</p><h3>2. ENGAGEMENTS DE LA DGI</h3><p>{{engagements_dgi}}</p><h3>3. MÉCANISMES DE DIALOGUE</h3><p>Les parties conviennent de réunions semestrielles pour examiner les questions fiscales et prévenir les différends.</p></div>`
  },
  {
    code: 'fis2_025', name: "Charte de la Transparence Fiscale et de la Bonne Gouvernance", category: 'juridique_admin', price: 10000, priceMax: 30000,
    description: "Charte interne d'engagement d'une entreprise en faveur de la transparence fiscale, de la bonne gouvernance et du respect des obligations fiscales en Côte d'Ivoire et en zone OHADA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'entreprise_nom',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'siege_social',label:"Siège social",type:'text',required:true},
      {key:'dirigeant',label:"Dirigeant signataire",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption de la charte",type:'date',required:true},
      {key:'principes_cles',label:"Principes clés de la charte",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE TRANSPARENCE FISCALE ET DE BONNE GOUVERNANCE</h1><h2>{{entreprise_nom}}</h2><p><strong>Siège :</strong> {{siege_social}} | <strong>Adoptée le :</strong> {{date_adoption}}</p><h3>PRÉAMBULE</h3><p>{{entreprise_nom}} s'engage à exercer ses activités en toute transparence fiscale et dans le respect des lois et règlements en vigueur en Côte d'Ivoire et en zone OHADA.</p><h3>PRINCIPES FONDAMENTAUX</h3><p>{{principes_cles}}</p><h3>ENGAGEMENTS</h3><p>1. Payer les impôts dus dans les délais légaux. 2. Ne pas recourir à des montages fiscaux artificiels. 3. Coopérer de bonne foi avec l'administration fiscale. 4. Publier annuellement un rapport de transparence fiscale.</p><p><strong>Signataire :</strong> {{dirigeant}}</p></div>`
  },

  // ─── COMPLIANCE / GOUVERNANCE AVANCÉE (comp_) ───
  {
    code: 'comp_001', name: "Accord de Programme de Conformité (Compliance Program)", category: 'juridique_admin', price: 15000, priceMax: 45000,
    description: "Document-cadre définissant le programme de conformité d'une entreprise ivoirienne, incluant les politiques, procédures et mécanismes de contrôle interne conformes aux standards internationaux.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 77,
    fieldsJson: F([
      {key:'entreprise_nom',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'responsable_conformite',label:"Responsable conformité (CCO)",type:'text',required:true},
      {key:'perimetre_programme',label:"Périmètre du programme",type:'textarea',required:true},
      {key:'risques_cibles',label:"Risques de conformité ciblés",type:'textarea',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PROGRAMME DE CONFORMITÉ</h1><h2>{{entreprise_nom}}</h2><p><strong>CCO :</strong> {{responsable_conformite}} | <strong>Date :</strong> {{date_adoption}}</p><h3>1. PÉRIMÈTRE</h3><p>{{perimetre_programme}}</p><h3>2. RISQUES CIBLÉS</h3><p>{{risques_cibles}}</p><h3>3. STRUCTURE DU PROGRAMME</h3><p>Le programme comprend : politiques et procédures, formation, contrôles internes, canal d'alerte, audits périodiques et reporting au Conseil d'Administration.</p><h3>4. RÉVISION</h3><p>Le programme est révisé annuellement et à chaque évolution réglementaire significative.</p></div>`
  },
  {
    code: 'comp_002', name: "Accord de Code de Conduite des Affaires (Code d'Éthique)", category: 'juridique_admin', price: 10000, priceMax: 30000,
    description: "Code de conduite et d'éthique des affaires pour les collaborateurs et partenaires d'une entreprise opérant en Côte d'Ivoire, fixant les standards comportementaux attendus.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 82,
    fieldsJson: F([
      {key:'entreprise_nom',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'dg_nom',label:"Directeur Général",type:'text',required:true},
      {key:'valeurs_entreprise',label:"Valeurs fondamentales de l'entreprise",type:'textarea',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CODE DE CONDUITE DES AFFAIRES</h1><h2>{{entreprise_nom}}</h2><p>Adopté le {{date_adoption}} sous l'autorité de {{dg_nom}}</p><h3>NOS VALEURS</h3><p>{{valeurs_entreprise}}</p><h3>RÈGLES DE CONDUITE</h3><p>1. Intégrité dans toutes les transactions commerciales. 2. Respect des lois et réglementations ivoiriennes et OHADA. 3. Lutte contre toute forme de corruption et de fraude. 4. Protection de la confidentialité des informations. 5. Respect des droits humains et des normes sociales.</p><h3>SANCTIONS</h3><p>Tout manquement au présent code entraîne des mesures disciplinaires pouvant aller jusqu'au licenciement et aux poursuites judiciaires.</p></div>`
  },
  {
    code: 'comp_003', name: "Accord de Lutte contre la Corruption (FCPA/Sapin II Afrique)", category: 'juridique_admin', price: 14000, priceMax: 42000,
    description: "Programme et accord de conformité anti-corruption adapté au contexte africain, intégrant les exigences FCPA américain, loi Sapin II française et dispositions OHADA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 79,
    fieldsJson: F([
      {key:'entreprise_nom',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'referentiel_applicable',label:"Référentiel anti-corruption applicable",type:'text',required:true},
      {key:'mesures_prevention',label:"Mesures de prévention de la corruption",type:'textarea',required:true},
      {key:'responsable_programme',label:"Responsable du programme anti-corruption",type:'text',required:true},
      {key:'date_mise_en_place',label:"Date de mise en place",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PROGRAMME ANTI-CORRUPTION</h1><h2>{{entreprise_nom}}</h2><p><strong>Référentiel :</strong> {{referentiel_applicable}} | <strong>Date :</strong> {{date_mise_en_place}}</p><h3>1. ENGAGEMENT DE LA DIRECTION</h3><p>La direction de {{entreprise_nom}} s'engage à tolérance zéro envers la corruption sous toutes ses formes.</p><h3>2. MESURES DE PRÉVENTION</h3><p>{{mesures_prevention}}</p><h3>3. RESPONSABLE</h3><p>{{responsable_programme}}</p><h3>4. FORMATION ET SENSIBILISATION</h3><p>Tous les collaborateurs suivent une formation annuelle obligatoire sur les risques de corruption et les procédures à suivre.</p></div>`
  },
  {
    code: 'comp_004', name: "Accord de Politique de Cadeaux et Hospitalité", category: 'juridique_admin', price: 8000, priceMax: 24000,
    description: "Politique encadrant l'offre et la réception de cadeaux, invitations et avantages dans le cadre professionnel, conforme aux exigences anti-corruption applicables en Afrique.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 71,
    fieldsJson: F([
      {key:'entreprise_nom',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'seuil_cadeau',label:"Seuil autorisé par cadeau (FCFA)",type:'text',required:true},
      {key:'categories_interdites',label:"Catégories de cadeaux interdits",type:'textarea',required:true},
      {key:'date_politique',label:"Date d'adoption de la politique",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>POLITIQUE CADEAUX ET HOSPITALITÉ</h1><h2>{{entreprise_nom}}</h2><p>Adoptée le {{date_politique}}</p><h3>1. SEUIL AUTORISÉ</h3><p>Tout cadeau de valeur supérieure à {{seuil_cadeau}} FCFA doit être déclaré et approuvé par le responsable conformité.</p><h3>2. CATÉGORIES INTERDITES</h3><p>{{categories_interdites}}</p><h3>3. REGISTRE DES CADEAUX</h3><p>Tout cadeau reçu ou offert doit être consigné dans le registre des cadeaux tenu par la direction conformité.</p><h3>4. FONCTIONNAIRES ET AGENTS PUBLICS</h3><p>Il est strictement interdit d'offrir tout avantage, même symbolique, à un agent public ivoirien ou étranger.</p></div>`
  },
  {
    code: 'comp_005', name: "Accord de Politique de Conflits d'Intérêts", category: 'juridique_admin', price: 9000, priceMax: 27000,
    description: "Politique de gestion des conflits d'intérêts applicables aux dirigeants et collaborateurs, avec procédures de déclaration et de recusation conformes aux bonnes pratiques de gouvernance.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 74,
    fieldsJson: F([
      {key:'entreprise_nom',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'personnes_concernees',label:"Personnes concernées par la politique",type:'textarea',required:true},
      {key:'situations_conflits',label:"Situations de conflits d'intérêts visées",type:'textarea',required:true},
      {key:'procedure_declaration',label:"Procédure de déclaration",type:'textarea',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>POLITIQUE DE GESTION DES CONFLITS D'INTÉRÊTS</h1><h2>{{entreprise_nom}}</h2><p>Adoptée le {{date_adoption}}</p><h3>1. PERSONNES CONCERNÉES</h3><p>{{personnes_concernees}}</p><h3>2. SITUATIONS VISÉES</h3><p>{{situations_conflits}}</p><h3>3. PROCÉDURE DE DÉCLARATION</h3><p>{{procedure_declaration}}</p><h3>4. RECUSATION</h3><p>Toute personne en situation de conflit d'intérêts doit se recuser des décisions concernées et informer immédiatement son supérieur hiérarchique.</p></div>`
  },
  {
    code: 'comp_006', name: "Accord de Politique de Lanceurs d'Alerte (Whistleblowing)", category: 'juridique_admin', price: 11000, priceMax: 33000,
    description: "Politique et procédure de signalement des alertes éthiques (whistleblowing) garantissant la protection des lanceurs d'alerte, conforme aux standards internationaux et au droit ivoirien.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 76,
    fieldsJson: F([
      {key:'entreprise_nom',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'canal_alerte',label:"Canal(aux) de signalement mis en place",type:'textarea',required:true},
      {key:'gestionnaire_alertes',label:"Gestionnaire des alertes",type:'text',required:true},
      {key:'garanties_protection',label:"Garanties de protection des lanceurs d'alerte",type:'textarea',required:true},
      {key:'date_politique',label:"Date de la politique",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>POLITIQUE LANCEURS D'ALERTE</h1><h2>{{entreprise_nom}}</h2><p>Adoptée le {{date_politique}}</p><h3>1. OBJET</h3><p>La présente politique garantit la possibilité de signaler tout manquement éthique, juridique ou réglementaire en toute confidentialité et sans représailles.</p><h3>2. CANAUX DE SIGNALEMENT</h3><p>{{canal_alerte}}</p><h3>3. GESTIONNAIRE DES ALERTES</h3><p>{{gestionnaire_alertes}}</p><h3>4. PROTECTION DES LANCEURS D'ALERTE</h3><p>{{garanties_protection}}</p><h3>5. TRAITEMENT DES SIGNALEMENTS</h3><p>Chaque alerte est traitée dans les 30 jours avec accusé de réception et retour vers le signalant.</p></div>`
  },
  {
    code: 'comp_007', name: "Accord de Formation à la Conformité (Compliance Training)", category: 'juridique_admin', price: 9000, priceMax: 27000,
    description: "Contrat et programme de formation à la conformité pour les collaborateurs d'une entreprise ivoirienne, couvrant éthique, anti-corruption, protection des données et réglementations sectorielles.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'entreprise_nom',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'prestataire_formation',label:"Prestataire de formation",type:'text',required:true},
      {key:'modules_formation',label:"Modules de formation",type:'textarea',required:true},
      {key:'population_cible',label:"Population cible",type:'text',required:true},
      {key:'date_debut',label:"Date de début du programme",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PROGRAMME DE FORMATION À LA CONFORMITÉ</h1><h2>{{entreprise_nom}}</h2><p><strong>Prestataire :</strong> {{prestataire_formation}} | <strong>Début :</strong> {{date_debut}}</p><h3>1. POPULATION CIBLE</h3><p>{{population_cible}}</p><h3>2. MODULES DE FORMATION</h3><p>{{modules_formation}}</p><h3>3. MODALITÉS</h3><p>La formation est dispensée en présentiel et/ou en ligne. Une attestation de suivi est délivrée à chaque participant.</p><h3>4. OBLIGATION ET SUIVI</h3><p>La formation est obligatoire. Un taux de complétion minimum de 90% est requis annuellement.</p></div>`
  },
  {
    code: 'comp_008', name: "Accord de Vérification de Tiers (Third Party Due Diligence)", category: 'juridique_admin', price: 13000, priceMax: 39000,
    description: "Procédure et accord de due diligence sur les tiers (fournisseurs, agents, distributeurs, partenaires) pour prévenir les risques de corruption et de blanchiment en zone OHADA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 80,
    fieldsJson: F([
      {key:'entreprise_nom',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'categories_tiers',label:"Catégories de tiers concernés",type:'textarea',required:true},
      {key:'criteres_evaluation',label:"Critères d'évaluation des risques",type:'textarea',required:true},
      {key:'responsable_dd',label:"Responsable due diligence",type:'text',required:true},
      {key:'date_procedure',label:"Date de la procédure",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PROCÉDURE DE DUE DILIGENCE TIERS</h1><h2>{{entreprise_nom}}</h2><p><strong>Responsable :</strong> {{responsable_dd}} | <strong>Date :</strong> {{date_procedure}}</p><h3>1. TIERS CONCERNÉS</h3><p>{{categories_tiers}}</p><h3>2. CRITÈRES D'ÉVALUATION</h3><p>{{criteres_evaluation}}</p><h3>3. NIVEAUX DE DUE DILIGENCE</h3><p>Niveau 1 (simplifié) : vérification documentaire. Niveau 2 (renforcé) : enquête approfondie pour les tiers à risque élevé.</p><h3>4. DÉCISION ET DOCUMENTATION</h3><p>Tout résultat négatif est soumis à validation du responsable conformité avant engagement contractuel.</p></div>`
  },
  {
    code: 'comp_009', name: "Accord de Déclaration de Conformité Fournisseur", category: 'juridique_admin', price: 7000, priceMax: 21000,
    description: "Déclaration et engagement de conformité exigé des fournisseurs d'une entreprise ivoirienne, couvrant anti-corruption, droits humains, environnement et pratiques commerciales éthiques.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 73,
    fieldsJson: F([
      {key:'fournisseur_nom',label:"Nom du fournisseur",type:'text',required:true},
      {key:'client_nom',label:"Entreprise cliente",type:'text',required:true},
      {key:'domaines_conformite',label:"Domaines de conformité couverts",type:'textarea',required:true},
      {key:'date_declaration',label:"Date de la déclaration",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>DÉCLARATION DE CONFORMITÉ FOURNISSEUR</h1><p><strong>Fournisseur :</strong> {{fournisseur_nom}} | <strong>Client :</strong> {{client_nom}}</p><p><strong>Date :</strong> {{date_declaration}}</p><h3>DÉCLARATION</h3><p>{{fournisseur_nom}} déclare respecter les standards de conformité suivants dans le cadre de ses relations commerciales avec {{client_nom}} :</p><p>{{domaines_conformite}}</p><h3>ENGAGEMENTS SPÉCIFIQUES</h3><p>1. Aucun recours à la corruption ou à des paiements de facilitation. 2. Respect des droits fondamentaux des travailleurs. 3. Conformité aux lois environnementales ivoiriennes. 4. Disponibilité pour audit de conformité par le client.</p><h3>SIGNATURE</h3><p>Le représentant légal du fournisseur certifie l'exactitude de la présente déclaration.</p></div>`
  },
  {
    code: 'comp_010', name: "Accord de Service d'Audit de Conformité", category: 'juridique_admin', price: 14000, priceMax: 42000,
    description: "Contrat de prestation d'audit de conformité mandatant un cabinet externe pour évaluer l'effectivité du programme de conformité d'une entreprise ivoirienne.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'cabinet_audit',label:"Cabinet d'audit mandaté",type:'text',required:true},
      {key:'entreprise_auditee',label:"Entreprise auditée",type:'text',required:true},
      {key:'perimetre_audit',label:"Périmètre de l'audit",type:'textarea',required:true},
      {key:'honoraires',label:"Honoraires d'audit (FCFA)",type:'text',required:true},
      {key:'date_mission',label:"Date de la mission",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT D'AUDIT DE CONFORMITÉ</h1><p><strong>Cabinet :</strong> {{cabinet_audit}} | <strong>Auditée :</strong> {{entreprise_auditee}}</p><p><strong>Date :</strong> {{date_mission}} | <strong>Honoraires :</strong> {{honoraires}} FCFA</p><h3>1. PÉRIMÈTRE</h3><p>{{perimetre_audit}}</p><h3>2. MÉTHODOLOGIE</h3><p>L'audit comprend : revue documentaire, entretiens avec les parties prenantes, tests de contrôles et analyse des incidents de conformité.</p><h3>3. LIVRABLES</h3><p>Rapport d'audit avec constats, recommandations classées par priorité et plan de remédiation dans les 30 jours suivant la mission.</p></div>`
  },
  {
    code: 'comp_011', name: "Accord de Certification ISO 37001 (Anti-Corruption)", category: 'juridique_admin', price: 16000, priceMax: 48000,
    description: "Plan et accord de mise en oeuvre de la norme ISO 37001 relative au système de management anti-corruption pour une entreprise ivoirienne visant la certification internationale.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'entreprise_nom',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'organisme_certification',label:"Organisme de certification",type:'text',required:true},
      {key:'perimetre_certification',label:"Périmètre de certification",type:'textarea',required:true},
      {key:'date_cible',label:"Date cible de certification",type:'date',required:true},
      {key:'responsable_projet',label:"Responsable du projet ISO 37001",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE CERTIFICATION ISO 37001</h1><h2>Système de Management Anti-Corruption</h2><h2>{{entreprise_nom}}</h2><p><strong>Organisme :</strong> {{organisme_certification}} | <strong>Date cible :</strong> {{date_cible}}</p><h3>1. PÉRIMÈTRE</h3><p>{{perimetre_certification}}</p><h3>2. ÉTAPES DE CERTIFICATION</h3><p>Phase 1 : Analyse des écarts. Phase 2 : Mise en oeuvre des mesures correctives. Phase 3 : Audit blanc interne. Phase 4 : Audit de certification.</p><h3>3. RESPONSABLE PROJET</h3><p>{{responsable_projet}}</p></div>`
  },
  {
    code: 'comp_012', name: "Accord de Certification ISO 37301 (Système de Management Conformité)", category: 'juridique_admin', price: 16000, priceMax: 48000,
    description: "Plan de certification ISO 37301 pour le système de management de la conformité, applicable aux entreprises ivoiriennes souhaitant démontrer leur engagement envers la conformité réglementaire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 63,
    fieldsJson: F([
      {key:'entreprise_nom',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'organisme_certification',label:"Organisme de certification",type:'text',required:true},
      {key:'obligations_conformite',label:"Obligations de conformité identifiées",type:'textarea',required:true},
      {key:'date_audit_certification',label:"Date de l'audit de certification",type:'date',required:true},
      {key:'pilote_projet',label:"Pilote du projet de certification",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE CERTIFICATION ISO 37301</h1><h2>Système de Management de la Conformité</h2><h2>{{entreprise_nom}}</h2><p><strong>Organisme :</strong> {{organisme_certification}} | <strong>Audit prévu le :</strong> {{date_audit_certification}}</p><h3>1. OBLIGATIONS DE CONFORMITÉ</h3><p>{{obligations_conformite}}</p><h3>2. STRUCTURE DU SYSTÈME</h3><p>Le système de management conformité intègre : politique de conformité, analyse des risques, contrôles, formation, surveillance et amélioration continue.</p><h3>3. PILOTE DU PROJET</h3><p>{{pilote_projet}}</p></div>`
  },
  {
    code: 'comp_013', name: "Accord de Programme FATF/GAFI (Lutte contre le Blanchiment)", category: 'juridique_admin', price: 17000, priceMax: 51000,
    description: "Programme de lutte contre le blanchiment de capitaux et le financement du terrorisme (LCB-FT) conforme aux recommandations GAFI, adapté au contexte ivoirien et GIABA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 78,
    fieldsJson: F([
      {key:'entite_assujettie',label:"Entité assujettie",type:'text',required:true},
      {key:'responsable_lcbft',label:"Responsable LCB-FT désigné",type:'text',required:true},
      {key:'mesures_diligence',label:"Mesures de diligence raisonnable",type:'textarea',required:true},
      {key:'date_programme',label:"Date d'adoption du programme",type:'date',required:true},
      {key:'autorite_supervision',label:"Autorité de supervision",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>PROGRAMME LCB-FT</h1><h2>Lutte contre le Blanchiment et le Financement du Terrorisme</h2><h2>{{entite_assujettie}}</h2><p><strong>Responsable :</strong> {{responsable_lcbft}} | <strong>Superviseur :</strong> {{autorite_supervision}}</p><p><strong>Date d'adoption :</strong> {{date_programme}}</p><h3>1. MESURES DE DILIGENCE</h3><p>{{mesures_diligence}}</p><h3>2. OBLIGATIONS DÉCLARATIVES</h3><p>Déclaration de soupçon obligatoire à la CENTIF-CI pour toute transaction suspecte, dans les délais réglementaires.</p><h3>3. FORMATION DU PERSONNEL</h3><p>Programme de formation annuel obligatoire pour tous les collaborateurs exposés aux risques LCB-FT.</p></div>`
  },
  {
    code: 'comp_014', name: "Accord de Programme de Conformité KYC (Banque)", category: 'juridique_admin', price: 15000, priceMax: 45000,
    description: "Programme KYC (Know Your Customer) pour une institution financière ivoirienne, définissant les procédures d'identification et de vérification des clients conformément à la réglementation BCEAO.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 81,
    fieldsJson: F([
      {key:'institution_nom',label:"Nom de l'institution financière",type:'text',required:true},
      {key:'niveaux_kyc',label:"Niveaux KYC définis",type:'textarea',required:true},
      {key:'documents_requis',label:"Documents requis par catégorie de client",type:'textarea',required:true},
      {key:'date_programme',label:"Date d'adoption du programme",type:'date',required:true},
      {key:'responsable_kyc',label:"Responsable KYC",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>PROGRAMME KYC — KNOW YOUR CUSTOMER</h1><h2>{{institution_nom}}</h2><p><strong>Responsable KYC :</strong> {{responsable_kyc}} | <strong>Date :</strong> {{date_programme}}</p><h3>1. NIVEAUX KYC</h3><p>{{niveaux_kyc}}</p><h3>2. DOCUMENTS REQUIS</h3><p>{{documents_requis}}</p><h3>3. MISE À JOUR PÉRIODIQUE</h3><p>Les dossiers KYC sont mis à jour tous les 3 ans pour les clients standard et annuellement pour les clients à risque élevé.</p><h3>4. CONFORMITÉ BCEAO</h3><p>Le programme respecte les instructions de la BCEAO en matière de vigilance à l'égard de la clientèle.</p></div>`
  },
  {
    code: 'comp_015', name: "Accord de Programme de Conformité des Sanctions Internationales", category: 'juridique_admin', price: 14000, priceMax: 42000,
    description: "Programme de conformité aux sanctions économiques et financières internationales (ONU, UE, OFAC) pour les entreprises ivoiriennes ayant des activités transfrontalières.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'entreprise_nom',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'listes_sanctions',label:"Listes de sanctions surveillées",type:'textarea',required:true},
      {key:'procedures_filtrage',label:"Procédures de filtrage",type:'textarea',required:true},
      {key:'responsable_sanctions',label:"Responsable sanctions",type:'text',required:true},
      {key:'date_programme',label:"Date du programme",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PROGRAMME DE CONFORMITÉ — SANCTIONS INTERNATIONALES</h1><h2>{{entreprise_nom}}</h2><p><strong>Responsable :</strong> {{responsable_sanctions}} | <strong>Date :</strong> {{date_programme}}</p><h3>1. LISTES SURVEILLÉES</h3><p>{{listes_sanctions}}</p><h3>2. PROCÉDURES DE FILTRAGE</h3><p>{{procedures_filtrage}}</p><h3>3. BLOCAGE ET DÉCLARATION</h3><p>Toute transaction avec une personne ou entité sanctionnée est immédiatement bloquée et déclarée aux autorités compétentes.</p></div>`
  },
  {
    code: 'comp_016', name: "Accord de DPO (Responsable Protection des Données RGPD/APDP)", category: 'juridique_admin', price: 11000, priceMax: 33000,
    description: "Accord de désignation et mission du Délégué à la Protection des Données (DPO), conforme au RGPD européen et aux dispositions de l'APDP (Autorité de Protection des Données Personnelles) ivoirienne.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 83,
    fieldsJson: F([
      {key:'entreprise_nom',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'dpo_nom',label:"Nom du DPO désigné",type:'text',required:true},
      {key:'missions_dpo',label:"Missions du DPO",type:'textarea',required:true},
      {key:'date_designation',label:"Date de désignation",type:'date',required:true},
      {key:'referentiel',label:"Référentiel applicable (RGPD/APDP)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE DÉSIGNATION DU DPO</h1><h2>{{entreprise_nom}}</h2><p><strong>DPO :</strong> {{dpo_nom}} | <strong>Référentiel :</strong> {{referentiel}}</p><p><strong>Date de désignation :</strong> {{date_designation}}</p><h3>1. MISSIONS</h3><p>{{missions_dpo}}</p><h3>2. INDÉPENDANCE</h3><p>Le DPO exerce ses missions en toute indépendance et rapporte directement à la Direction Générale.</p><h3>3. RESSOURCES</h3><p>L'entreprise met à disposition du DPO les ressources nécessaires (temps, budget, accès aux systèmes) pour l'accomplissement de ses missions.</p></div>`
  },
  {
    code: 'comp_017', name: "Accord de Plan de Continuité d'Activité (PCA/BCP)", category: 'juridique_admin', price: 13000, priceMax: 39000,
    description: "Plan de continuité d'activité (PCA) documentant les procédures de maintien et reprise des activités essentielles en cas de crise ou sinistre, adapté au contexte ivoirien.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 75,
    fieldsJson: F([
      {key:'entreprise_nom',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'activites_critiques',label:"Activités critiques identifiées",type:'textarea',required:true},
      {key:'scenarios_crise',label:"Scénarios de crise couverts",type:'textarea',required:true},
      {key:'responsable_pca',label:"Responsable PCA",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption du PCA",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE CONTINUITÉ D'ACTIVITÉ</h1><h2>{{entreprise_nom}}</h2><p><strong>Responsable PCA :</strong> {{responsable_pca}} | <strong>Date :</strong> {{date_adoption}}</p><h3>1. ACTIVITÉS CRITIQUES</h3><p>{{activites_critiques}}</p><h3>2. SCÉNARIOS DE CRISE</h3><p>{{scenarios_crise}}</p><h3>3. PROCÉDURES DE REPRISE</h3><p>Pour chaque activité critique, une procédure de reprise avec objectifs de temps de reprise (RTO) et de point de reprise (RPO) est définie.</p><h3>4. TESTS ET RÉVISION</h3><p>Le PCA fait l'objet d'exercices de simulation annuels et est révisé après chaque activation ou évolution organisationnelle majeure.</p></div>`
  },
  {
    code: 'comp_018', name: "Accord de Politique de Sécurité des Systèmes d'Information (PSSI)", category: 'juridique_admin', price: 14000, priceMax: 42000,
    description: "Politique de Sécurité des Systèmes d'Information (PSSI) définissant le cadre de gouvernance de la cybersécurité d'une entreprise ivoirienne, conforme aux standards ISO 27001.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 77,
    fieldsJson: F([
      {key:'entreprise_nom',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'rssi_nom',label:"Responsable SSI (RSSI)",type:'text',required:true},
      {key:'perimetre_si',label:"Périmètre du système d'information",type:'textarea',required:true},
      {key:'objectifs_securite',label:"Objectifs de sécurité prioritaires",type:'textarea',required:true},
      {key:'date_adoption',label:"Date d'adoption de la PSSI",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>POLITIQUE DE SÉCURITÉ DES SYSTÈMES D'INFORMATION</h1><h2>{{entreprise_nom}}</h2><p><strong>RSSI :</strong> {{rssi_nom}} | <strong>Date :</strong> {{date_adoption}}</p><h3>1. PÉRIMÈTRE</h3><p>{{perimetre_si}}</p><h3>2. OBJECTIFS DE SÉCURITÉ</h3><p>{{objectifs_securite}}</p><h3>3. PRINCIPES DIRECTEURS</h3><p>Confidentialité, Intégrité, Disponibilité (CIA Triad) constituent le fondement de la politique de sécurité.</p><h3>4. GOUVERNANCE</h3><p>Le Comité de Sécurité SI se réunit mensuellement et produit un tableau de bord sécurité trimestriel pour la Direction Générale.</p></div>`
  },
  {
    code: 'comp_019', name: "Accord de Charte Informatique des Salariés", category: 'juridique_admin', price: 7000, priceMax: 21000,
    description: "Charte d'utilisation des outils informatiques et numériques par les salariés, définissant les règles d'usage, les droits et obligations, conforme au droit du travail ivoirien.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 85,
    fieldsJson: F([
      {key:'entreprise_nom',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'outils_concernes',label:"Outils informatiques concernés",type:'textarea',required:true},
      {key:'usages_interdits',label:"Usages interdits",type:'textarea',required:true},
      {key:'date_adoption',label:"Date d'adoption de la charte",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE INFORMATIQUE DES SALARIÉS</h1><h2>{{entreprise_nom}}</h2><p>Adoptée le {{date_adoption}}</p><h3>1. OUTILS CONCERNÉS</h3><p>{{outils_concernes}}</p><h3>2. RÈGLES D'UTILISATION</h3><p>Les outils informatiques mis à disposition sont à usage professionnel. Un usage personnel raisonnable est toléré dans les limites définies par la présente charte.</p><h3>3. USAGES INTERDITS</h3><p>{{usages_interdits}}</p><h3>4. SURVEILLANCE ET CONTRÔLE</h3><p>L'employeur se réserve le droit de contrôler l'utilisation des outils informatiques dans le respect du droit ivoirien et après information des salariés.</p></div>`
  },
  {
    code: 'comp_020', name: "Accord de Politique de Cybersécurité", category: 'juridique_admin', price: 13000, priceMax: 39000,
    description: "Politique de cybersécurité définissant les mesures techniques et organisationnelles de protection contre les cybermenaces, applicable aux entreprises ivoiriennes de toutes tailles.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 79,
    fieldsJson: F([
      {key:'entreprise_nom',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'menaces_identifiees',label:"Menaces cybersécurité identifiées",type:'textarea',required:true},
      {key:'mesures_protection',label:"Mesures de protection mises en place",type:'textarea',required:true},
      {key:'procedure_incident',label:"Procédure de gestion des incidents cyber",type:'textarea',required:true},
      {key:'date_politique',label:"Date de la politique",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>POLITIQUE DE CYBERSÉCURITÉ</h1><h2>{{entreprise_nom}}</h2><p>Adoptée le {{date_politique}}</p><h3>1. MENACES IDENTIFIÉES</h3><p>{{menaces_identifiees}}</p><h3>2. MESURES DE PROTECTION</h3><p>{{mesures_protection}}</p><h3>3. GESTION DES INCIDENTS</h3><p>{{procedure_incident}}</p><h3>4. SENSIBILISATION</h3><p>Tous les collaborateurs reçoivent une formation cybersécurité à l'embauche et lors de chaque mise à jour significative de la politique.</p></div>`
  },
  {
    code: 'comp_021', name: "Accord de Service de Forensics Numérique (Investigation Interne)", category: 'juridique_admin', price: 20000, priceMax: 60000,
    description: "Contrat de mission de forensics numérique pour une investigation interne suite à un incident de sécurité ou une suspicion de fraude dans une entreprise ivoirienne.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 62,
    fieldsJson: F([
      {key:'cabinet_forensics',label:"Cabinet forensics mandaté",type:'text',required:true},
      {key:'entreprise_cliente',label:"Entreprise cliente",type:'text',required:true},
      {key:'perimetre_investigation',label:"Périmètre de l'investigation",type:'textarea',required:true},
      {key:'date_mission',label:"Date de début de la mission",type:'date',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE FORENSICS NUMÉRIQUE</h1><h2>Investigation Interne</h2><p><strong>Cabinet :</strong> {{cabinet_forensics}} | <strong>Cliente :</strong> {{entreprise_cliente}}</p><p><strong>Date :</strong> {{date_mission}} | <strong>Honoraires :</strong> {{honoraires}} FCFA</p><h3>1. PÉRIMÈTRE DE L'INVESTIGATION</h3><p>{{perimetre_investigation}}</p><h3>2. MÉTHODOLOGIE</h3><p>Collecte et préservation des preuves numériques selon les standards forensics internationaux, garantissant la chaîne de custody pour une utilisation éventuelle en justice.</p><h3>3. CONFIDENTIALITÉ</h3><p>L'investigation est strictement confidentielle. Les résultats sont communiqués exclusivement aux mandants désignés.</p><h3>4. RAPPORT</h3><p>Un rapport technique et un rapport exécutif sont remis dans les délais convenus.</p></div>`
  },
  {
    code: 'comp_022', name: "Accord de Reporting Extra-financier (RSE/ESG)", category: 'juridique_admin', price: 12000, priceMax: 36000,
    description: "Cadre et accord de reporting extra-financier RSE/ESG pour une entreprise ivoirienne, couvrant les dimensions environnementales, sociales et de gouvernance selon les standards GRI/IFRS S.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 76,
    fieldsJson: F([
      {key:'entreprise_nom',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'referentiel_esg',label:"Référentiel ESG retenu",type:'text',required:true},
      {key:'indicateurs_cles',label:"Indicateurs clés de performance ESG",type:'textarea',required:true},
      {key:'exercice_rapport',label:"Exercice du rapport",type:'text',required:true},
      {key:'date_publication',label:"Date de publication prévue",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT EXTRA-FINANCIER RSE/ESG</h1><h2>{{entreprise_nom}} — Exercice {{exercice_rapport}}</h2><p><strong>Référentiel :</strong> {{referentiel_esg}} | <strong>Publication :</strong> {{date_publication}}</p><h3>1. INDICATEURS CLÉS</h3><p>{{indicateurs_cles}}</p><h3>2. ENVIRONNEMENT</h3><p>Bilan carbone, consommation d'énergie, gestion des déchets et impact sur la biodiversité en Côte d'Ivoire.</p><h3>3. SOCIAL</h3><p>Emploi, diversité, formation, sécurité au travail et impact sur les communautés locales.</p><h3>4. GOUVERNANCE</h3><p>Composition des organes de gouvernance, politiques anti-corruption et transparence fiscale.</p></div>`
  },
  {
    code: 'comp_023', name: "Rapport Annuel de Conformité", category: 'juridique_admin', price: 11000, priceMax: 33000,
    description: "Rapport annuel de conformité présenté par le responsable conformité au Conseil d'Administration, synthétisant les activités de conformité, les incidents et les perspectives de l'exercice écoulé.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 71,
    fieldsJson: F([
      {key:'entreprise_nom',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'cco_nom',label:"Responsable conformité (CCO)",type:'text',required:true},
      {key:'exercice',label:"Exercice du rapport",type:'text',required:true},
      {key:'bilan_conformite',label:"Bilan des activités de conformité",type:'textarea',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT ANNUEL DE CONFORMITÉ</h1><h2>{{entreprise_nom}} — Exercice {{exercice}}</h2><p><strong>CCO :</strong> {{cco_nom}} | <strong>Date :</strong> {{date_rapport}}</p><h3>1. BILAN DES ACTIVITÉS</h3><p>{{bilan_conformite}}</p><h3>2. INCIDENTS ET SIGNALEMENTS</h3><p>Nombre d'alertes reçues, traitées et closes. Analyse des tendances et mesures correctives prises.</p><h3>3. FORMATIONS</h3><p>Taux de complétion des formations conformité. Modules dispensés et populations formées.</p><h3>4. PERSPECTIVES</h3><p>Axes d'amélioration et priorités conformité pour l'exercice à venir.</p></div>`
  },
  {
    code: 'comp_024', name: "Plan de Remédiation Conformité", category: 'juridique_admin', price: 12000, priceMax: 36000,
    description: "Plan structuré de remédiation suite à un audit de conformité ou une sanction réglementaire, définissant les actions correctives, responsabilités et délais pour une entreprise ivoirienne.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 66,
    fieldsJson: F([
      {key:'entreprise_nom',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'origine_remediation',label:"Origine de la remédiation (audit, sanction)",type:'text',required:true},
      {key:'constats_traites',label:"Constats faisant l'objet de remédiation",type:'textarea',required:true},
      {key:'actions_correctives',label:"Actions correctives planifiées",type:'textarea',required:true},
      {key:'date_plan',label:"Date du plan de remédiation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE REMÉDIATION CONFORMITÉ</h1><h2>{{entreprise_nom}}</h2><p><strong>Origine :</strong> {{origine_remediation}} | <strong>Date :</strong> {{date_plan}}</p><h3>1. CONSTATS À TRAITER</h3><p>{{constats_traites}}</p><h3>2. ACTIONS CORRECTIVES</h3><p>{{actions_correctives}}</p><h3>3. SUIVI</h3><p>Un tableau de bord de suivi mensuel des actions est établi et partagé avec la direction et l'autorité de supervision concernée.</p><h3>4. VALIDATION</h3><p>La clôture de chaque action est validée par le responsable conformité et documentée dans le dossier de remédiation.</p></div>`
  },
  {
    code: 'comp_025', name: "Charte de l'Entreprise Éthique et Responsable en Afrique", category: 'juridique_admin', price: 9000, priceMax: 27000,
    description: "Charte d'engagement d'une entreprise envers les principes d'éthique des affaires, de responsabilité sociale et de développement durable en Afrique de l'Ouest et en zone OHADA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 80,
    fieldsJson: F([
      {key:'entreprise_nom',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'pdg_nom',label:"Président Directeur Général",type:'text',required:true},
      {key:'engagements_ethiques',label:"Engagements éthiques fondamentaux",type:'textarea',required:true},
      {key:'date_adoption',label:"Date d'adoption de la charte",type:'date',required:true},
      {key:'objectifs_rse',label:"Objectifs RSE prioritaires",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE L'ENTREPRISE ÉTHIQUE ET RESPONSABLE</h1><h2>{{entreprise_nom}}</h2><p>Adoptée le {{date_adoption}} par {{pdg_nom}}, Président Directeur Général</p><h3>NOTRE ENGAGEMENT</h3><p>{{entreprise_nom}} s'engage à être une entreprise modèle en matière d'éthique des affaires et de responsabilité sociale en Afrique.</p><h3>PRINCIPES ÉTHIQUES FONDAMENTAUX</h3><p>{{engagements_ethiques}}</p><h3>OBJECTIFS RSE</h3><p>{{objectifs_rse}}</p><h3>MISE EN OEUVRE</h3><p>La présente charte est mise en oeuvre à travers nos politiques internes, nos programmes de formation et notre dialogue avec les parties prenantes.</p><h3>REDDITION DE COMPTES</h3><p>Un rapport annuel de mise en oeuvre de la charte est publié et partagé avec l'ensemble de nos parties prenantes.</p></div>`
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
  console.log(`Batch 87b OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
