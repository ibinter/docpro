import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);

const templates = [
  // ─── 15 FISCALITÉ (commercial_financier, fis_) ───────────────────────────

  {
    code: 'fis_decl_resultats_is',
    name: "Déclaration de résultats IS simplifiée",
    category: 'commercial_financier',
    price: 4500,
    priceMax: 12000,
    description: "Formulaire de déclaration des résultats à l'impôt sur les sociétés en version simplifiée pour PME.",
    templateType: 'pdf',
    classe: 'fiscalite',
    active: true,
    popularity: 82,
    fieldsJson: F([
      { key: 'raison_sociale', label: "Raison sociale", type: 'text', required: true },
      { key: 'numero_contribuable', label: "Numéro contribuable", type: 'text', required: true },
      { key: 'exercice_fiscal', label: "Exercice fiscal", type: 'text', required: true },
      { key: 'chiffre_affaires', label: "Chiffre d'affaires", type: 'number', required: true },
      { key: 'resultat_net', label: "Résultat net imposable", type: 'number', required: true },
      { key: 'taux_is', label: "Taux IS applicable (%)", type: 'number', required: true },
      { key: 'is_du', label: "IS dû", type: 'number', required: true },
    ]),
    body: `<h1>DÉCLARATION DE RÉSULTATS IS SIMPLIFIÉE</h1>
<p>Entreprise : {{raison_sociale}} — N° contribuable : {{numero_contribuable}}</p>
<p>Exercice fiscal : {{exercice_fiscal}}</p>
<table border="1" cellpadding="6" style="width:100%;border-collapse:collapse;">
  <tr><th>Chiffre d'affaires</th><td>{{chiffre_affaires}}</td></tr>
  <tr><th>Résultat net imposable</th><td>{{resultat_net}}</td></tr>
  <tr><th>Taux IS</th><td>{{taux_is}} %</td></tr>
  <tr><th>IS dû</th><td>{{is_du}}</td></tr>
</table>
<p>Je soussigné certifie l'exactitude des informations ci-dessus.</p>
<p>Signature et cachet : ___________________________</p>`,
  },

  {
    code: 'fis_liasse_fiscale_pme',
    name: "Liasse fiscale PME",
    category: 'commercial_financier',
    price: 8500,
    priceMax: 25000,
    description: "Liasse fiscale complète pour PME incluant bilans, compte de résultats et tableaux annexes.",
    templateType: 'pdf',
    classe: 'fiscalite',
    active: true,
    popularity: 78,
    fieldsJson: F([
      { key: 'raison_sociale', label: "Raison sociale", type: 'text', required: true },
      { key: 'forme_juridique', label: "Forme juridique", type: 'text', required: true },
      { key: 'exercice', label: "Exercice", type: 'text', required: true },
      { key: 'total_bilan', label: "Total bilan", type: 'number', required: true },
      { key: 'capitaux_propres', label: "Capitaux propres", type: 'number', required: true },
      { key: 'resultat_exploitation', label: "Résultat d'exploitation", type: 'number', required: true },
      { key: 'commissaire_comptes', label: "Commissaire aux comptes", type: 'text', required: false },
    ]),
    body: `<h1>LIASSE FISCALE PME — EXERCICE {{exercice}}</h1>
<p><strong>Société :</strong> {{raison_sociale}} ({{forme_juridique}})</p>
<h2>BILAN SIMPLIFIÉ</h2>
<table border="1" cellpadding="6" style="width:100%;border-collapse:collapse;">
  <tr><th>Total Bilan</th><td>{{total_bilan}}</td></tr>
  <tr><th>Capitaux propres</th><td>{{capitaux_propres}}</td></tr>
  <tr><th>Résultat d'exploitation</th><td>{{resultat_exploitation}}</td></tr>
</table>
<p>Commissaire aux comptes : {{commissaire_comptes}}</p>
<p>Certifié sincère et véritable — Signature : ___________________________</p>`,
  },

  {
    code: 'fis_decl_taxe_salaires',
    name: "Déclaration taxe sur salaires",
    category: 'commercial_financier',
    price: 3000,
    priceMax: 7500,
    description: "Déclaration annuelle de la taxe sur les salaires versés par l'employeur.",
    templateType: 'pdf',
    classe: 'fiscalite',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'employeur', label: "Nom de l'employeur", type: 'text', required: true },
      { key: 'masse_salariale', label: "Masse salariale brute", type: 'number', required: true },
      { key: 'taux_taxe', label: "Taux de taxe (%)", type: 'number', required: true },
      { key: 'montant_taxe', label: "Montant taxe due", type: 'number', required: true },
      { key: 'periode', label: "Période de référence", type: 'text', required: true },
    ]),
    body: `<h1>DÉCLARATION TAXE SUR SALAIRES</h1>
<p><strong>Employeur :</strong> {{employeur}}</p>
<p><strong>Période :</strong> {{periode}}</p>
<table border="1" cellpadding="6" style="width:100%;border-collapse:collapse;">
  <tr><th>Masse salariale brute</th><td>{{masse_salariale}}</td></tr>
  <tr><th>Taux taxe</th><td>{{taux_taxe}} %</td></tr>
  <tr><th>Montant taxe due</th><td>{{montant_taxe}}</td></tr>
</table>
<p>Date et signature : ___________________________</p>`,
  },

  {
    code: 'fis_acomptes_provisionnels_is',
    name: "Acomptes provisionnels IS",
    category: 'commercial_financier',
    price: 3500,
    priceMax: 9000,
    description: "Fiche de calcul et déclaration des acomptes provisionnels d'impôt sur les sociétés.",
    templateType: 'pdf',
    classe: 'fiscalite',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'societe', label: "Société", type: 'text', required: true },
      { key: 'is_reference', label: "IS de référence (exercice précédent)", type: 'number', required: true },
      { key: 'acompte_1', label: "1er acompte", type: 'number', required: true },
      { key: 'acompte_2', label: "2ème acompte", type: 'number', required: true },
      { key: 'acompte_3', label: "3ème acompte", type: 'number', required: true },
      { key: 'acompte_4', label: "4ème acompte", type: 'number', required: true },
    ]),
    body: `<h1>ACOMPTES PROVISIONNELS IS</h1>
<p><strong>Société :</strong> {{societe}}</p>
<p>IS de référence : {{is_reference}}</p>
<table border="1" cellpadding="6" style="width:100%;border-collapse:collapse;">
  <tr><th>1er acompte</th><td>{{acompte_1}}</td></tr>
  <tr><th>2ème acompte</th><td>{{acompte_2}}</td></tr>
  <tr><th>3ème acompte</th><td>{{acompte_3}}</td></tr>
  <tr><th>4ème acompte</th><td>{{acompte_4}}</td></tr>
</table>
<p>Visa direction financière : ___________________________</p>`,
  },

  {
    code: 'fis_decl_retenues_source',
    name: "Déclaration retenues à la source",
    category: 'commercial_financier',
    price: 2800,
    priceMax: 7000,
    description: "Déclaration des retenues à la source opérées sur les revenus versés à des tiers.",
    templateType: 'pdf',
    classe: 'fiscalite',
    active: true,
    popularity: 55,
    fieldsJson: F([
      { key: 'declarant', label: "Déclarant", type: 'text', required: true },
      { key: 'periode', label: "Période", type: 'text', required: true },
      { key: 'type_revenus', label: "Type de revenus", type: 'text', required: true },
      { key: 'montant_brut', label: "Montant brut versé", type: 'number', required: true },
      { key: 'taux_retenue', label: "Taux retenue (%)", type: 'number', required: true },
      { key: 'montant_retenu', label: "Montant retenu", type: 'number', required: true },
    ]),
    body: `<h1>DÉCLARATION RETENUES À LA SOURCE</h1>
<p><strong>Déclarant :</strong> {{declarant}} — Période : {{periode}}</p>
<p>Type de revenus : {{type_revenus}}</p>
<table border="1" cellpadding="6" style="width:100%;border-collapse:collapse;">
  <tr><th>Montant brut versé</th><td>{{montant_brut}}</td></tr>
  <tr><th>Taux retenue</th><td>{{taux_retenue}} %</td></tr>
  <tr><th>Montant retenu</th><td>{{montant_retenu}}</td></tr>
</table>
<p>Signature : ___________________________</p>`,
  },

  {
    code: 'fis_remboursement_credit_tva',
    name: "Demande remboursement crédit TVA",
    category: 'commercial_financier',
    price: 3200,
    priceMax: 8000,
    description: "Dossier de demande de remboursement de crédit de TVA auprès de l'administration fiscale.",
    templateType: 'pdf',
    classe: 'fiscalite',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'entreprise', label: "Entreprise", type: 'text', required: true },
      { key: 'numero_tva', label: "Numéro TVA", type: 'text', required: true },
      { key: 'montant_credit', label: "Montant crédit TVA", type: 'number', required: true },
      { key: 'periode_concernee', label: "Période concernée", type: 'text', required: true },
      { key: 'rib', label: "RIB pour remboursement", type: 'text', required: true },
      { key: 'motif', label: "Motif de la demande", type: 'textarea', required: true },
    ]),
    body: `<h1>DEMANDE DE REMBOURSEMENT DE CRÉDIT TVA</h1>
<p><strong>Entreprise :</strong> {{entreprise}} — N° TVA : {{numero_tva}}</p>
<p><strong>Période :</strong> {{periode_concernee}}</p>
<p>Montant du crédit TVA réclamé : <strong>{{montant_credit}}</strong></p>
<p>RIB : {{rib}}</p>
<p><strong>Motif :</strong> {{motif}}</p>
<p>Pièces jointes : déclarations TVA, factures d'achats, relevé de compte.</p>
<p>Signature et cachet : ___________________________</p>`,
  },

  {
    code: 'fis_delai_paiement_fiscal',
    name: "Demande délai de paiement fiscal",
    category: 'commercial_financier',
    price: 2500,
    priceMax: 6000,
    description: "Requête adressée à l'administration fiscale pour obtenir un délai de paiement des impôts dus.",
    templateType: 'pdf',
    classe: 'fiscalite',
    active: true,
    popularity: 58,
    fieldsJson: F([
      { key: 'contribuable', label: "Contribuable", type: 'text', required: true },
      { key: 'impot_concerne', label: "Impôt concerné", type: 'text', required: true },
      { key: 'montant_du', label: "Montant dû", type: 'number', required: true },
      { key: 'duree_delai', label: "Durée du délai demandé (mois)", type: 'number', required: true },
      { key: 'motif', label: "Motif de la demande", type: 'textarea', required: true },
      { key: 'plan_apurement', label: "Plan d'apurement proposé", type: 'textarea', required: false },
    ]),
    body: `<h1>DEMANDE DE DÉLAI DE PAIEMENT FISCAL</h1>
<p><strong>Contribuable :</strong> {{contribuable}}</p>
<p><strong>Impôt concerné :</strong> {{impot_concerne}} — Montant dû : {{montant_du}}</p>
<p>Durée de délai sollicitée : {{duree_delai}} mois</p>
<p><strong>Motif :</strong> {{motif}}</p>
<p><strong>Plan d'apurement :</strong> {{plan_apurement}}</p>
<p>Je m'engage à respecter l'échéancier convenu.</p>
<p>Signature : ___________________________</p>`,
  },

  {
    code: 'fis_reclamation_contentieuse',
    name: "Réclamation contentieuse fiscale",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 15000,
    description: "Mémoire de réclamation contentieuse contre un avis d'imposition ou une décision fiscale.",
    templateType: 'pdf',
    classe: 'fiscalite',
    active: true,
    popularity: 50,
    fieldsJson: F([
      { key: 'reclamant', label: "Réclamant", type: 'text', required: true },
      { key: 'reference_avis', label: "Référence avis contesté", type: 'text', required: true },
      { key: 'montant_conteste', label: "Montant contesté", type: 'number', required: true },
      { key: 'fondements_juridiques', label: "Fondements juridiques", type: 'textarea', required: true },
      { key: 'faits', label: "Exposé des faits", type: 'textarea', required: true },
      { key: 'conclusions', label: "Conclusions", type: 'textarea', required: true },
    ]),
    body: `<h1>RÉCLAMATION CONTENTIEUSE FISCALE</h1>
<p><strong>Réclamant :</strong> {{reclamant}}</p>
<p>Référence de l'avis contesté : {{reference_avis}}</p>
<p>Montant contesté : {{montant_conteste}}</p>
<h2>Exposé des faits</h2>
<p>{{faits}}</p>
<h2>Fondements juridiques</h2>
<p>{{fondements_juridiques}}</p>
<h2>Conclusions</h2>
<p>{{conclusions}}</p>
<p>Signature et cachet : ___________________________</p>`,
  },

  {
    code: 'fis_protocole_accord_fiscal',
    name: "Protocole d'accord fiscal",
    category: 'commercial_financier',
    price: 7500,
    priceMax: 20000,
    description: "Protocole d'accord entre le contribuable et l'administration fiscale pour le règlement d'un litige.",
    templateType: 'pdf',
    classe: 'fiscalite',
    active: true,
    popularity: 45,
    fieldsJson: F([
      { key: 'contribuable', label: "Contribuable", type: 'text', required: true },
      { key: 'administration', label: "Administration fiscale", type: 'text', required: true },
      { key: 'litige', label: "Nature du litige", type: 'textarea', required: true },
      { key: 'montant_initial', label: "Montant initial réclamé", type: 'number', required: true },
      { key: 'montant_accorde', label: "Montant accordé après accord", type: 'number', required: true },
      { key: 'modalites', label: "Modalités de règlement", type: 'textarea', required: true },
    ]),
    body: `<h1>PROTOCOLE D'ACCORD FISCAL</h1>
<p>Entre : <strong>{{contribuable}}</strong> et <strong>{{administration}}</strong></p>
<p><strong>Nature du litige :</strong> {{litige}}</p>
<table border="1" cellpadding="6" style="width:100%;border-collapse:collapse;">
  <tr><th>Montant initial réclamé</th><td>{{montant_initial}}</td></tr>
  <tr><th>Montant accordé</th><td>{{montant_accorde}}</td></tr>
</table>
<p><strong>Modalités de règlement :</strong> {{modalites}}</p>
<p>Le présent protocole vaut transaction au sens de l'article applicable du Code général des impôts.</p>
<p>Signature contribuable : ___________________________</p>
<p>Signature administration : ___________________________</p>`,
  },

  {
    code: 'fis_attestation_regularite',
    name: "Attestation de régularité fiscale",
    category: 'commercial_financier',
    price: 1500,
    priceMax: 4000,
    description: "Attestation certifiant qu'une entreprise est à jour de ses obligations fiscales déclaratives et de paiement.",
    templateType: 'pdf',
    classe: 'fiscalite',
    active: true,
    popularity: 85,
    fieldsJson: F([
      { key: 'entreprise', label: "Entreprise", type: 'text', required: true },
      { key: 'numero_contribuable', label: "Numéro contribuable", type: 'text', required: true },
      { key: 'date_attestation', label: "Date de l'attestation", type: 'date', required: true },
      { key: 'validite', label: "Validité jusqu'au", type: 'date', required: true },
      { key: 'agent_fiscal', label: "Agent fiscal signataire", type: 'text', required: true },
    ]),
    body: `<h1>ATTESTATION DE RÉGULARITÉ FISCALE</h1>
<p>L'administration fiscale atteste que :</p>
<p><strong>{{entreprise}}</strong> — N° contribuable : {{numero_contribuable}}</p>
<p>est à jour de l'ensemble de ses obligations fiscales déclaratives et de paiement à la date du <strong>{{date_attestation}}</strong>.</p>
<p>La présente attestation est valable jusqu'au : <strong>{{validite}}</strong>.</p>
<p>Agent fiscal : {{agent_fiscal}}</p>
<p>Cachet et signature de l'administration : ___________________________</p>`,
  },

  {
    code: 'fis_bordereau_versement_retenues',
    name: "Bordereau versement retenues",
    category: 'commercial_financier',
    price: 1800,
    priceMax: 4500,
    description: "Bordereau de versement des retenues à la source opérées par l'employeur.",
    templateType: 'pdf',
    classe: 'fiscalite',
    active: true,
    popularity: 62,
    fieldsJson: F([
      { key: 'employeur', label: "Employeur", type: 'text', required: true },
      { key: 'mois', label: "Mois de versement", type: 'text', required: true },
      { key: 'nombre_salaries', label: "Nombre de salariés", type: 'number', required: true },
      { key: 'total_retenues', label: "Total retenues (IRPP+CSS)", type: 'number', required: true },
      { key: 'mode_paiement', label: "Mode de paiement", type: 'text', required: true },
      { key: 'reference_paiement', label: "Référence paiement", type: 'text', required: false },
    ]),
    body: `<h1>BORDEREAU DE VERSEMENT DES RETENUES</h1>
<p><strong>Employeur :</strong> {{employeur}} — Mois : {{mois}}</p>
<p>Nombre de salariés concernés : {{nombre_salaries}}</p>
<table border="1" cellpadding="6" style="width:100%;border-collapse:collapse;">
  <tr><th>Total retenues (IRPP + CSS)</th><td>{{total_retenues}}</td></tr>
  <tr><th>Mode de paiement</th><td>{{mode_paiement}}</td></tr>
  <tr><th>Référence paiement</th><td>{{reference_paiement}}</td></tr>
</table>
<p>Signature responsable : ___________________________</p>`,
  },

  {
    code: 'fis_decl_existence_tva',
    name: "Déclaration d'existence TVA",
    category: 'commercial_financier',
    price: 2000,
    priceMax: 5000,
    description: "Formulaire de déclaration d'existence et d'assujettissement à la TVA pour une nouvelle entreprise.",
    templateType: 'pdf',
    classe: 'fiscalite',
    active: true,
    popularity: 48,
    fieldsJson: F([
      { key: 'entreprise', label: "Entreprise", type: 'text', required: true },
      { key: 'forme_juridique', label: "Forme juridique", type: 'text', required: true },
      { key: 'activite', label: "Activité principale", type: 'text', required: true },
      { key: 'date_creation', label: "Date de création", type: 'date', required: true },
      { key: 'ca_previsionnel', label: "CA prévisionnel annuel", type: 'number', required: true },
      { key: 'adresse_siege', label: "Adresse siège social", type: 'text', required: true },
    ]),
    body: `<h1>DÉCLARATION D'EXISTENCE — ASSUJETTISSEMENT TVA</h1>
<p><strong>Entreprise :</strong> {{entreprise}} ({{forme_juridique}})</p>
<p>Activité : {{activite}} — Date de création : {{date_creation}}</p>
<p>Adresse siège : {{adresse_siege}}</p>
<p>CA prévisionnel annuel : {{ca_previsionnel}}</p>
<p>Je déclare l'existence de l'entreprise sus-désignée et sollicite son immatriculation au registre des assujettis à la TVA.</p>
<p>Signature du représentant légal : ___________________________</p>`,
  },

  {
    code: 'fis_prorogation_delai_fiscal',
    name: "Demande prorogation délai fiscal",
    category: 'commercial_financier',
    price: 2200,
    priceMax: 5500,
    description: "Demande de prolongation d'un délai fiscal pour le dépôt d'une déclaration ou la production d'un document.",
    templateType: 'pdf',
    classe: 'fiscalite',
    active: true,
    popularity: 42,
    fieldsJson: F([
      { key: 'contribuable', label: "Contribuable", type: 'text', required: true },
      { key: 'obligation_concernee', label: "Obligation fiscale concernée", type: 'text', required: true },
      { key: 'delai_initial', label: "Délai initial (date)", type: 'date', required: true },
      { key: 'prorogation_demandee', label: "Prorogation demandée (jours)", type: 'number', required: true },
      { key: 'motif', label: "Motif de la prorogation", type: 'textarea', required: true },
    ]),
    body: `<h1>DEMANDE DE PROROGATION DE DÉLAI FISCAL</h1>
<p><strong>Contribuable :</strong> {{contribuable}}</p>
<p>Obligation concernée : {{obligation_concernee}}</p>
<p>Délai initial : {{delai_initial}} — Prorogation demandée : {{prorogation_demandee}} jours</p>
<p><strong>Motif :</strong> {{motif}}</p>
<p>Je m'engage à satisfaire à l'obligation dans le délai prorogé sollicité.</p>
<p>Signature : ___________________________</p>`,
  },

  {
    code: 'fis_certificat_degrevement',
    name: "Certificat de dégrèvement",
    category: 'commercial_financier',
    price: 2500,
    priceMax: 6000,
    description: "Certificat administratif constatant l'annulation totale ou partielle d'une imposition.",
    templateType: 'pdf',
    classe: 'fiscalite',
    active: true,
    popularity: 40,
    fieldsJson: F([
      { key: 'contribuable', label: "Contribuable bénéficiaire", type: 'text', required: true },
      { key: 'impot_concerne', label: "Impôt concerné", type: 'text', required: true },
      { key: 'annee_imposition', label: "Année d'imposition", type: 'text', required: true },
      { key: 'montant_initial', label: "Montant initial", type: 'number', required: true },
      { key: 'montant_degreve', label: "Montant dégrevé", type: 'number', required: true },
      { key: 'motif_degrevement', label: "Motif du dégrèvement", type: 'textarea', required: true },
    ]),
    body: `<h1>CERTIFICAT DE DÉGRÈVEMENT</h1>
<p>L'administration fiscale certifie avoir accordé un dégrèvement à :</p>
<p><strong>{{contribuable}}</strong></p>
<p>Impôt : {{impot_concerne}} — Année : {{annee_imposition}}</p>
<table border="1" cellpadding="6" style="width:100%;border-collapse:collapse;">
  <tr><th>Montant initial</th><td>{{montant_initial}}</td></tr>
  <tr><th>Montant dégrevé</th><td>{{montant_degreve}}</td></tr>
  <tr><th>Reste à payer</th><td>{{montant_initial}} - {{montant_degreve}}</td></tr>
</table>
<p>Motif : {{motif_degrevement}}</p>
<p>Cachet et signature administration : ___________________________</p>`,
  },

  {
    code: 'fis_tableau_suivi_fiscal',
    name: "Tableau suivi fiscal annuel",
    category: 'commercial_financier',
    price: 3000,
    priceMax: 8000,
    description: "Tableau de bord annuel de suivi des obligations fiscales : échéances, montants, statuts.",
    templateType: 'pdf',
    classe: 'fiscalite',
    active: true,
    popularity: 75,
    fieldsJson: F([
      { key: 'entreprise', label: "Entreprise", type: 'text', required: true },
      { key: 'annee', label: "Année fiscale", type: 'text', required: true },
      { key: 'responsable', label: "Responsable fiscal", type: 'text', required: true },
      { key: 'tva_mensuelle', label: "TVA mensuelle totale", type: 'number', required: false },
      { key: 'is_annuel', label: "IS annuel", type: 'number', required: false },
      { key: 'taxe_patronale', label: "Taxes patronales totales", type: 'number', required: false },
    ]),
    body: `<h1>TABLEAU DE SUIVI FISCAL ANNUEL — {{annee}}</h1>
<p><strong>Entreprise :</strong> {{entreprise}} — Responsable : {{responsable}}</p>
<table border="1" cellpadding="6" style="width:100%;border-collapse:collapse;">
  <thead><tr><th>Obligation</th><th>Montant</th><th>Statut</th></tr></thead>
  <tbody>
    <tr><td>TVA mensuelle (cumul)</td><td>{{tva_mensuelle}}</td><td>À vérifier</td></tr>
    <tr><td>IS annuel</td><td>{{is_annuel}}</td><td>À vérifier</td></tr>
    <tr><td>Taxes patronales (cumul)</td><td>{{taxe_patronale}}</td><td>À vérifier</td></tr>
  </tbody>
</table>
<p>Visa direction : ___________________________</p>`,
  },

  // ─── 15 IMMOBILIER SPÉCIALISÉ (immobilier, immo5_) ───────────────────────

  {
    code: 'immo5_contrat_construction_maison',
    name: "Contrat construction maison individuelle",
    category: 'immobilier',
    price: 12000,
    priceMax: 35000,
    description: "Contrat de construction de maison individuelle avec fourniture de plan, conforme à la réglementation.",
    templateType: 'pdf',
    classe: 'immobilier_special',
    active: true,
    popularity: 72,
    fieldsJson: F([
      { key: 'constructeur', label: "Constructeur", type: 'text', required: true },
      { key: 'maitre_ouvrage', label: "Maître d'ouvrage", type: 'text', required: true },
      { key: 'adresse_terrain', label: "Adresse du terrain", type: 'text', required: true },
      { key: 'surface_plancher', label: "Surface plancher (m²)", type: 'number', required: true },
      { key: 'prix_forfaitaire', label: "Prix forfaitaire TTC", type: 'number', required: true },
      { key: 'delai_execution', label: "Délai d'exécution (mois)", type: 'number', required: true },
      { key: 'date_ouverture_chantier', label: "Date d'ouverture du chantier", type: 'date', required: true },
    ]),
    body: `<h1>CONTRAT DE CONSTRUCTION DE MAISON INDIVIDUELLE</h1>
<p><strong>Constructeur :</strong> {{constructeur}}</p>
<p><strong>Maître d'ouvrage :</strong> {{maitre_ouvrage}}</p>
<p>Terrain sis : {{adresse_terrain}}</p>
<p>Surface plancher : {{surface_plancher}} m² — Prix TTC : {{prix_forfaitaire}}</p>
<p>Délai d'exécution : {{delai_execution}} mois — Ouverture chantier : {{date_ouverture_chantier}}</p>
<p>Le constructeur s'engage à édifier la maison conformément aux plans et descriptif annexés.</p>
<p>Signature constructeur : ___________________________ | Signature maître d'ouvrage : ___________________________</p>`,
  },

  {
    code: 'immo5_garantie_financiere_achevement',
    name: "Garantie financière d'achèvement",
    category: 'immobilier',
    price: 8000,
    priceMax: 22000,
    description: "Acte de garantie financière d'achèvement délivré par un établissement de crédit pour une opération immobilière.",
    templateType: 'pdf',
    classe: 'immobilier_special',
    active: true,
    popularity: 55,
    fieldsJson: F([
      { key: 'garant', label: "Établissement garant", type: 'text', required: true },
      { key: 'promoteur', label: "Promoteur immobilier", type: 'text', required: true },
      { key: 'programme', label: "Programme immobilier", type: 'text', required: true },
      { key: 'montant_garantie', label: "Montant de la garantie", type: 'number', required: true },
      { key: 'date_expiration', label: "Date expiration garantie", type: 'date', required: true },
    ]),
    body: `<h1>GARANTIE FINANCIÈRE D'ACHÈVEMENT</h1>
<p><strong>Garant :</strong> {{garant}}</p>
<p><strong>Promoteur :</strong> {{promoteur}}</p>
<p>Programme : {{programme}}</p>
<p>Montant de la garantie : <strong>{{montant_garantie}}</strong></p>
<p>Valable jusqu'au : {{date_expiration}}</p>
<p>Le garant s'engage à financer l'achèvement du programme en cas de défaillance du promoteur.</p>
<p>Cachet et signature garant : ___________________________</p>`,
  },

  {
    code: 'immo5_notice_descriptive_construction',
    name: "Notice descriptive construction",
    category: 'immobilier',
    price: 4500,
    priceMax: 12000,
    description: "Notice descriptive des travaux et matériaux utilisés dans le cadre d'une construction neuve.",
    templateType: 'pdf',
    classe: 'immobilier_special',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'constructeur', label: "Constructeur", type: 'text', required: true },
      { key: 'programme', label: "Programme / projet", type: 'text', required: true },
      { key: 'gros_oeuvre', label: "Gros oeuvre", type: 'textarea', required: true },
      { key: 'menuiseries', label: "Menuiseries", type: 'textarea', required: false },
      { key: 'revetements', label: "Revêtements", type: 'textarea', required: false },
      { key: 'installations_techniques', label: "Installations techniques", type: 'textarea', required: false },
    ]),
    body: `<h1>NOTICE DESCRIPTIVE — {{programme}}</h1>
<p><strong>Constructeur :</strong> {{constructeur}}</p>
<h2>Gros oeuvre</h2><p>{{gros_oeuvre}}</p>
<h2>Menuiseries</h2><p>{{menuiseries}}</p>
<h2>Revêtements</h2><p>{{revetements}}</p>
<h2>Installations techniques</h2><p>{{installations_techniques}}</p>
<p>La présente notice est annexée au contrat de construction et en fait partie intégrante.</p>`,
  },

  {
    code: 'immo5_contrat_architecte_mission',
    name: "Contrat architecte mission complète",
    category: 'immobilier',
    price: 10000,
    priceMax: 28000,
    description: "Contrat d'architecture portant sur une mission complète de conception et de suivi de chantier.",
    templateType: 'pdf',
    classe: 'immobilier_special',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'architecte', label: "Architecte", type: 'text', required: true },
      { key: 'ordre_numero', label: "N° d'inscription à l'Ordre", type: 'text', required: true },
      { key: 'client', label: "Client (maître d'ouvrage)", type: 'text', required: true },
      { key: 'projet', label: "Description du projet", type: 'textarea', required: true },
      { key: 'honoraires', label: "Honoraires TTC", type: 'number', required: true },
      { key: 'taux_honoraires', label: "Taux honoraires (% travaux)", type: 'number', required: false },
    ]),
    body: `<h1>CONTRAT D'ARCHITECTURE — MISSION COMPLÈTE</h1>
<p><strong>Architecte :</strong> {{architecte}} — N° Ordre : {{ordre_numero}}</p>
<p><strong>Maître d'ouvrage :</strong> {{client}}</p>
<p><strong>Projet :</strong> {{projet}}</p>
<p>Honoraires TTC : {{honoraires}} (soit {{taux_honoraires}}% du coût des travaux)</p>
<p>La mission comprend : esquisse, avant-projet, projet, dépôt permis, DCE, assistance contrats travaux, direction chantier, OPR et réception.</p>
<p>Signature architecte : ___________________________ | Signature client : ___________________________</p>`,
  },

  {
    code: 'immo5_reglement_copropriete_mixte',
    name: "Règlement copropriété immeuble mixte",
    category: 'immobilier',
    price: 15000,
    priceMax: 40000,
    description: "Règlement de copropriété pour immeuble à usage mixte habitation et commerce.",
    templateType: 'pdf',
    classe: 'immobilier_special',
    active: true,
    popularity: 50,
    fieldsJson: F([
      { key: 'syndicat', label: "Nom du syndicat de copropriété", type: 'text', required: true },
      { key: 'immeuble', label: "Désignation de l'immeuble", type: 'text', required: true },
      { key: 'nb_lots', label: "Nombre de lots", type: 'number', required: true },
      { key: 'nb_lots_habitation', label: "Dont lots habitation", type: 'number', required: true },
      { key: 'nb_lots_commerciaux', label: "Dont lots commerciaux", type: 'number', required: true },
      { key: 'charges_communes', label: "Clé de répartition charges communes", type: 'textarea', required: true },
    ]),
    body: `<h1>RÈGLEMENT DE COPROPRIÉTÉ — IMMEUBLE MIXTE</h1>
<p><strong>Syndicat :</strong> {{syndicat}}</p>
<p><strong>Immeuble :</strong> {{immeuble}}</p>
<p>Nombre total de lots : {{nb_lots}} (dont {{nb_lots_habitation}} habitation et {{nb_lots_commerciaux}} commerciaux)</p>
<h2>Répartition des charges communes</h2>
<p>{{charges_communes}}</p>
<p>Le présent règlement régit les droits et obligations de chaque copropriétaire conformément à la législation en vigueur.</p>`,
  },

  {
    code: 'immo5_acte_division_lots',
    name: "Acte de division en lots",
    category: 'immobilier',
    price: 9000,
    priceMax: 24000,
    description: "Acte notarié de division d'un immeuble en lots de copropriété avec état descriptif de division.",
    templateType: 'pdf',
    classe: 'immobilier_special',
    active: true,
    popularity: 45,
    fieldsJson: F([
      { key: 'proprietaire', label: "Propriétaire divisant", type: 'text', required: true },
      { key: 'immeuble', label: "Immeuble à diviser", type: 'text', required: true },
      { key: 'nb_lots_crees', label: "Nombre de lots créés", type: 'number', required: true },
      { key: 'description_lots', label: "Description des lots", type: 'textarea', required: true },
      { key: 'notaire', label: "Notaire rédacteur", type: 'text', required: true },
    ]),
    body: `<h1>ACTE DE DIVISION EN LOTS DE COPROPRIÉTÉ</h1>
<p><strong>Propriétaire divisant :</strong> {{proprietaire}}</p>
<p><strong>Immeuble :</strong> {{immeuble}}</p>
<p>Nombre de lots créés : {{nb_lots_crees}}</p>
<h2>État descriptif de division</h2>
<p>{{description_lots}}</p>
<p>Reçu par : {{notaire}}</p>
<p>Le présent acte est soumis aux formalités de publicité foncière.</p>`,
  },

  {
    code: 'immo5_certificat_conformite_urbanisme',
    name: "Certificat conformité urbanisme",
    category: 'immobilier',
    price: 5000,
    priceMax: 14000,
    description: "Certificat attestant la conformité d'une construction achevée aux prescriptions du permis de construire.",
    templateType: 'pdf',
    classe: 'immobilier_special',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'beneficiaire', label: "Bénéficiaire du permis", type: 'text', required: true },
      { key: 'reference_permis', label: "Référence permis de construire", type: 'text', required: true },
      { key: 'adresse_construction', label: "Adresse de la construction", type: 'text', required: true },
      { key: 'date_achevement', label: "Date d'achèvement déclarée", type: 'date', required: true },
      { key: 'autorite_delivrante', label: "Autorité délivrante", type: 'text', required: true },
    ]),
    body: `<h1>CERTIFICAT DE CONFORMITÉ URBANISME</h1>
<p>L'autorité compétente certifie que la construction réalisée par :</p>
<p><strong>{{beneficiaire}}</strong></p>
<p>sis : {{adresse_construction}}</p>
<p>Permis de construire n° : {{reference_permis}}</p>
<p>achevée le : {{date_achevement}}</p>
<p>est conforme aux prescriptions du permis de construire délivré.</p>
<p>{{autorite_delivrante}} — Cachet et signature : ___________________________</p>`,
  },

  {
    code: 'immo5_location_gerance_fonds',
    name: "Contrat location-gérance fonds de commerce",
    category: 'immobilier',
    price: 8500,
    priceMax: 22000,
    description: "Contrat de location-gérance permettant au locataire-gérant d'exploiter un fonds de commerce.",
    templateType: 'pdf',
    classe: 'immobilier_special',
    active: true,
    popularity: 58,
    fieldsJson: F([
      { key: 'proprietaire', label: "Propriétaire du fonds", type: 'text', required: true },
      { key: 'locataire_gerant', label: "Locataire-gérant", type: 'text', required: true },
      { key: 'fonds', label: "Description du fonds", type: 'textarea', required: true },
      { key: 'redevance', label: "Redevance mensuelle", type: 'number', required: true },
      { key: 'duree', label: "Durée du contrat (mois)", type: 'number', required: true },
      { key: 'date_debut', label: "Date de début", type: 'date', required: true },
    ]),
    body: `<h1>CONTRAT DE LOCATION-GÉRANCE DE FONDS DE COMMERCE</h1>
<p><strong>Propriétaire :</strong> {{proprietaire}}</p>
<p><strong>Locataire-gérant :</strong> {{locataire_gerant}}</p>
<p><strong>Fonds de commerce :</strong> {{fonds}}</p>
<p>Redevance mensuelle : {{redevance}} — Durée : {{duree}} mois à compter du {{date_debut}}</p>
<p>Le locataire-gérant exploite le fonds à ses risques et périls, sous sa responsabilité exclusive.</p>
<p>Signature propriétaire : ___________________________ | Signature locataire-gérant : ___________________________</p>`,
  },

  {
    code: 'immo5_bail_locaux_mixtes',
    name: "Bail locaux mixtes",
    category: 'immobilier',
    price: 7000,
    priceMax: 18000,
    description: "Bail portant sur des locaux à usage mixte professionnel et d'habitation.",
    templateType: 'pdf',
    classe: 'immobilier_special',
    active: true,
    popularity: 62,
    fieldsJson: F([
      { key: 'bailleur', label: "Bailleur", type: 'text', required: true },
      { key: 'preneur', label: "Preneur", type: 'text', required: true },
      { key: 'adresse_locaux', label: "Adresse des locaux", type: 'text', required: true },
      { key: 'usage', label: "Usage des locaux", type: 'text', required: true },
      { key: 'loyer_mensuel', label: "Loyer mensuel", type: 'number', required: true },
      { key: 'depot_garantie', label: "Dépôt de garantie", type: 'number', required: true },
      { key: 'duree', label: "Durée du bail (ans)", type: 'number', required: true },
    ]),
    body: `<h1>BAIL LOCAUX MIXTES</h1>
<p><strong>Bailleur :</strong> {{bailleur}}</p>
<p><strong>Preneur :</strong> {{preneur}}</p>
<p>Locaux sis : {{adresse_locaux}} — Usage : {{usage}}</p>
<p>Loyer mensuel : {{loyer_mensuel}} — Dépôt de garantie : {{depot_garantie}}</p>
<p>Durée : {{duree}} ans</p>
<p>Le preneur s'engage à occuper les locaux conformément à leur destination mixte.</p>
<p>Signature bailleur : ___________________________ | Signature preneur : ___________________________</p>`,
  },

  {
    code: 'immo5_cession_fonds_commerce',
    name: "Contrat cession fonds de commerce",
    category: 'immobilier',
    price: 18000,
    priceMax: 50000,
    description: "Acte de cession d'un fonds de commerce incluant inventaire, prix et modalités de paiement.",
    templateType: 'pdf',
    classe: 'immobilier_special',
    active: true,
    popularity: 55,
    fieldsJson: F([
      { key: 'cedant', label: "Cédant", type: 'text', required: true },
      { key: 'cessionnaire', label: "Cessionnaire", type: 'text', required: true },
      { key: 'fonds', label: "Désignation du fonds", type: 'textarea', required: true },
      { key: 'prix_cession', label: "Prix de cession", type: 'number', required: true },
      { key: 'modalites_paiement', label: "Modalités de paiement", type: 'textarea', required: true },
      { key: 'clause_non_concurrence', label: "Clause de non-concurrence", type: 'textarea', required: false },
    ]),
    body: `<h1>CONTRAT DE CESSION DE FONDS DE COMMERCE</h1>
<p><strong>Cédant :</strong> {{cedant}}</p>
<p><strong>Cessionnaire :</strong> {{cessionnaire}}</p>
<p><strong>Fonds cédé :</strong> {{fonds}}</p>
<p>Prix de cession : <strong>{{prix_cession}}</strong></p>
<p><strong>Modalités de paiement :</strong> {{modalites_paiement}}</p>
<p><strong>Clause de non-concurrence :</strong> {{clause_non_concurrence}}</p>
<p>La cession est soumise aux formalités légales de publication et d'opposition des créanciers.</p>
<p>Signature cédant : ___________________________ | Signature cessionnaire : ___________________________</p>`,
  },

  {
    code: 'immo5_inventaire_fonds_commerce',
    name: "Inventaire fonds de commerce",
    category: 'immobilier',
    price: 5000,
    priceMax: 14000,
    description: "État inventaire détaillé des éléments corporels et incorporels composant un fonds de commerce.",
    templateType: 'pdf',
    classe: 'immobilier_special',
    active: true,
    popularity: 48,
    fieldsJson: F([
      { key: 'proprietaire', label: "Propriétaire du fonds", type: 'text', required: true },
      { key: 'fonds', label: "Désignation du fonds", type: 'text', required: true },
      { key: 'date_inventaire', label: "Date d'inventaire", type: 'date', required: true },
      { key: 'elements_incorporels', label: "Éléments incorporels (clientèle, enseigne, licences)", type: 'textarea', required: true },
      { key: 'elements_corporels', label: "Éléments corporels (matériel, stock)", type: 'textarea', required: true },
      { key: 'valeur_totale', label: "Valeur totale estimée", type: 'number', required: true },
    ]),
    body: `<h1>INVENTAIRE DU FONDS DE COMMERCE</h1>
<p><strong>Propriétaire :</strong> {{proprietaire}} — Fonds : {{fonds}}</p>
<p>Date d'inventaire : {{date_inventaire}}</p>
<h2>Éléments incorporels</h2>
<p>{{elements_incorporels}}</p>
<h2>Éléments corporels</h2>
<p>{{elements_corporels}}</p>
<p><strong>Valeur totale estimée : {{valeur_totale}}</strong></p>
<p>Signature propriétaire : ___________________________</p>`,
  },

  {
    code: 'immo5_evaluation_bien_professionnel',
    name: "Évaluation bien immobilier professionnel",
    category: 'immobilier',
    price: 12000,
    priceMax: 35000,
    description: "Rapport d'expertise et d'évaluation d'un bien immobilier à usage professionnel ou commercial.",
    templateType: 'pdf',
    classe: 'immobilier_special',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'expert', label: "Expert évaluateur", type: 'text', required: true },
      { key: 'bien', label: "Désignation du bien", type: 'text', required: true },
      { key: 'adresse', label: "Adresse", type: 'text', required: true },
      { key: 'surface', label: "Surface totale (m²)", type: 'number', required: true },
      { key: 'methode_evaluation', label: "Méthode d'évaluation", type: 'text', required: true },
      { key: 'valeur_venale', label: "Valeur vénale estimée", type: 'number', required: true },
      { key: 'date_evaluation', label: "Date d'évaluation", type: 'date', required: true },
    ]),
    body: `<h1>RAPPORT D'ÉVALUATION IMMOBILIÈRE PROFESSIONNELLE</h1>
<p><strong>Expert :</strong> {{expert}} — Date : {{date_evaluation}}</p>
<p><strong>Bien :</strong> {{bien}} sis {{adresse}} — Surface : {{surface}} m²</p>
<p><strong>Méthode d'évaluation :</strong> {{methode_evaluation}}</p>
<p><strong>Valeur vénale estimée : {{valeur_venale}}</strong></p>
<p>Le présent rapport est établi en conformité avec les normes professionnelles d'évaluation immobilière.</p>
<p>Signature expert : ___________________________</p>`,
  },

  {
    code: 'immo5_bail_commercial_369',
    name: "Bail commercial 3-6-9 détaillé",
    category: 'immobilier',
    price: 9500,
    priceMax: 25000,
    description: "Bail commercial de 9 ans avec faculté de résiliation triennale, toutes clauses détaillées.",
    templateType: 'pdf',
    classe: 'immobilier_special',
    active: true,
    popularity: 80,
    fieldsJson: F([
      { key: 'bailleur', label: "Bailleur", type: 'text', required: true },
      { key: 'preneur', label: "Preneur (locataire)", type: 'text', required: true },
      { key: 'locaux', label: "Description des locaux", type: 'textarea', required: true },
      { key: 'loyer_annuel_ht', label: "Loyer annuel HT", type: 'number', required: true },
      { key: 'indexation', label: "Indice d'indexation", type: 'text', required: true },
      { key: 'date_entree', label: "Date d'entrée en jouissance", type: 'date', required: true },
      { key: 'depot_garantie', label: "Dépôt de garantie", type: 'number', required: true },
    ]),
    body: `<h1>BAIL COMMERCIAL 3-6-9</h1>
<p><strong>Bailleur :</strong> {{bailleur}}</p>
<p><strong>Preneur :</strong> {{preneur}}</p>
<p><strong>Locaux :</strong> {{locaux}}</p>
<p>Date d'entrée : {{date_entree}} — Durée : 9 ans avec faculté résiliation tous les 3 ans</p>
<p>Loyer annuel HT : {{loyer_annuel_ht}} — Indexation : {{indexation}}</p>
<p>Dépôt de garantie : {{depot_garantie}}</p>
<p>Le preneur ne pourra céder le présent bail qu'avec l'accord écrit du bailleur.</p>
<p>Signature bailleur : ___________________________ | Signature preneur : ___________________________</p>`,
  },

  {
    code: 'immo5_property_management',
    name: "Contrat property management",
    category: 'immobilier',
    price: 7500,
    priceMax: 20000,
    description: "Contrat de gestion immobilière confiant à un gestionnaire professionnel l'administration d'un patrimoine.",
    templateType: 'pdf',
    classe: 'immobilier_special',
    active: true,
    popularity: 55,
    fieldsJson: F([
      { key: 'mandant', label: "Mandant (propriétaire)", type: 'text', required: true },
      { key: 'gestionnaire', label: "Gestionnaire (property manager)", type: 'text', required: true },
      { key: 'patrimoine', label: "Description du patrimoine géré", type: 'textarea', required: true },
      { key: 'honoraires', label: "Honoraires de gestion (%)", type: 'number', required: true },
      { key: 'duree', label: "Durée du mandat (mois)", type: 'number', required: true },
      { key: 'pouvoirs', label: "Étendue des pouvoirs", type: 'textarea', required: true },
    ]),
    body: `<h1>CONTRAT DE PROPERTY MANAGEMENT</h1>
<p><strong>Mandant :</strong> {{mandant}}</p>
<p><strong>Gestionnaire :</strong> {{gestionnaire}}</p>
<p><strong>Patrimoine géré :</strong> {{patrimoine}}</p>
<p>Honoraires : {{honoraires}}% des encaissements — Durée : {{duree}} mois</p>
<p><strong>Pouvoirs du gestionnaire :</strong> {{pouvoirs}}</p>
<p>Le gestionnaire rend compte trimestriellement de sa mission.</p>
<p>Signature mandant : ___________________________ | Signature gestionnaire : ___________________________</p>`,
  },

  {
    code: 'immo5_garantie_decennale_promotion',
    name: "Garantie décennale promotion immobilière",
    category: 'immobilier',
    price: 10000,
    priceMax: 28000,
    description: "Assurance et attestation de garantie décennale pour un promoteur immobilier.",
    templateType: 'pdf',
    classe: 'immobilier_special',
    active: true,
    popularity: 62,
    fieldsJson: F([
      { key: 'promoteur', label: "Promoteur", type: 'text', required: true },
      { key: 'assureur', label: "Assureur", type: 'text', required: true },
      { key: 'programme', label: "Programme couvert", type: 'text', required: true },
      { key: 'numero_police', label: "Numéro de police", type: 'text', required: true },
      { key: 'date_reception', label: "Date de réception des travaux", type: 'date', required: true },
      { key: 'montant_assure', label: "Montant assuré", type: 'number', required: true },
    ]),
    body: `<h1>GARANTIE DÉCENNALE — PROMOTION IMMOBILIÈRE</h1>
<p><strong>Promoteur :</strong> {{promoteur}}</p>
<p><strong>Assureur :</strong> {{assureur}} — Police n° : {{numero_police}}</p>
<p>Programme couvert : {{programme}}</p>
<p>Date de réception : {{date_reception}} — Garantie valable 10 ans à compter de cette date</p>
<p>Montant assuré : {{montant_assure}}</p>
<p>La présente garantie couvre les dommages compromettant la solidité de l'ouvrage ou le rendant impropre à sa destination.</p>`,
  },

  // ─── 10 CRÉDIT & RECOUVREMENT (commercial_financier, cred_) ──────────────

  {
    code: 'cred_mise_demeure_payer',
    name: "Mise en demeure de payer",
    category: 'commercial_financier',
    price: 1500,
    priceMax: 4000,
    description: "Lettre de mise en demeure formelle enjoignant un débiteur de régler sa dette sous délai fixé.",
    templateType: 'pdf',
    classe: 'credit_recouvrement',
    active: true,
    popularity: 88,
    fieldsJson: F([
      { key: 'creancier', label: "Créancier", type: 'text', required: true },
      { key: 'debiteur', label: "Débiteur", type: 'text', required: true },
      { key: 'montant_du', label: "Montant dû", type: 'number', required: true },
      { key: 'reference_facture', label: "Référence facture(s)", type: 'text', required: true },
      { key: 'delai_paiement', label: "Délai accordé (jours)", type: 'number', required: true },
      { key: 'consequences', label: "Conséquences en cas de défaut", type: 'textarea', required: false },
    ]),
    body: `<h1>MISE EN DEMEURE DE PAYER</h1>
<p><strong>De :</strong> {{creancier}}</p>
<p><strong>À :</strong> {{debiteur}}</p>
<p>Nous vous mettons en demeure de régler la somme de <strong>{{montant_du}}</strong> correspondant à la/aux facture(s) n° {{reference_facture}}.</p>
<p>Ce règlement devra intervenir dans un délai de <strong>{{delai_paiement}} jours</strong> à compter de la réception du présent courrier.</p>
<p>{{consequences}}</p>
<p>Fait à _________, le _________</p>
<p>Signature et cachet : ___________________________</p>`,
  },

  {
    code: 'cred_protocole_paiement_echelonne',
    name: "Protocole accord paiement échelonné",
    category: 'commercial_financier',
    price: 2500,
    priceMax: 6500,
    description: "Protocole d'accord amiable fixant un échéancier de remboursement entre créancier et débiteur.",
    templateType: 'pdf',
    classe: 'credit_recouvrement',
    active: true,
    popularity: 75,
    fieldsJson: F([
      { key: 'creancier', label: "Créancier", type: 'text', required: true },
      { key: 'debiteur', label: "Débiteur", type: 'text', required: true },
      { key: 'dette_totale', label: "Dette totale", type: 'number', required: true },
      { key: 'nb_echeances', label: "Nombre d'échéances", type: 'number', required: true },
      { key: 'montant_echeance', label: "Montant par échéance", type: 'number', required: true },
      { key: 'date_premiere_echeance', label: "Date première échéance", type: 'date', required: true },
      { key: 'clause_defaillance', label: "Clause de défaillance", type: 'textarea', required: false },
    ]),
    body: `<h1>PROTOCOLE D'ACCORD — PAIEMENT ÉCHELONNÉ</h1>
<p><strong>Créancier :</strong> {{creancier}}</p>
<p><strong>Débiteur :</strong> {{debiteur}}</p>
<p>Dette totale : {{dette_totale}}</p>
<p>Remboursement en {{nb_echeances}} échéances de {{montant_echeance}} à compter du {{date_premiere_echeance}}.</p>
<p><strong>Clause de défaillance :</strong> {{clause_defaillance}}</p>
<p>Signature créancier : ___________________________ | Signature débiteur : ___________________________</p>`,
  },

  {
    code: 'cred_cession_creances',
    name: "Cession de créances",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 14000,
    description: "Acte de cession de créances commerciales d'un cédant vers un cessionnaire.",
    templateType: 'pdf',
    classe: 'credit_recouvrement',
    active: true,
    popularity: 50,
    fieldsJson: F([
      { key: 'cedant', label: "Cédant", type: 'text', required: true },
      { key: 'cessionnaire', label: "Cessionnaire", type: 'text', required: true },
      { key: 'debiteur_cede', label: "Débiteur cédé", type: 'text', required: true },
      { key: 'montant_creance', label: "Montant de la créance", type: 'number', required: true },
      { key: 'prix_cession', label: "Prix de cession", type: 'number', required: true },
      { key: 'date_echeance_creance', label: "Échéance de la créance", type: 'date', required: true },
    ]),
    body: `<h1>ACTE DE CESSION DE CRÉANCES</h1>
<p><strong>Cédant :</strong> {{cedant}}</p>
<p><strong>Cessionnaire :</strong> {{cessionnaire}}</p>
<p>Débiteur cédé : {{debiteur_cede}}</p>
<p>Montant de la créance : {{montant_creance}} — Échéance : {{date_echeance_creance}}</p>
<p>Prix de cession : {{prix_cession}}</p>
<p>Le cédant garantit l'existence de la créance à la date de cession.</p>
<p>Signature cédant : ___________________________ | Signature cessionnaire : ___________________________</p>`,
  },

  {
    code: 'cred_cautionnement_personnel',
    name: "Acte de cautionnement personnel",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 11000,
    description: "Acte par lequel une personne physique se porte caution personnelle pour garantir une dette.",
    templateType: 'pdf',
    classe: 'credit_recouvrement',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'caution', label: "Personne se portant caution", type: 'text', required: true },
      { key: 'debiteur_principal', label: "Débiteur principal", type: 'text', required: true },
      { key: 'creancier', label: "Créancier bénéficiaire", type: 'text', required: true },
      { key: 'montant_garanti', label: "Montant garanti", type: 'number', required: true },
      { key: 'duree_caution', label: "Durée de la caution (mois)", type: 'number', required: false },
      { key: 'mention_manuscrite', label: "Mention manuscrite légale", type: 'textarea', required: true },
    ]),
    body: `<h1>ACTE DE CAUTIONNEMENT PERSONNEL</h1>
<p><strong>Caution :</strong> {{caution}}</p>
<p>Je me porte caution personnelle de <strong>{{debiteur_principal}}</strong> envers <strong>{{creancier}}</strong>.</p>
<p>Montant garanti : {{montant_garanti}} — Durée : {{duree_caution}} mois</p>
<h2>Mention manuscrite obligatoire</h2>
<p><em>{{mention_manuscrite}}</em></p>
<p>Signature de la caution : ___________________________</p>`,
  },

  {
    code: 'cred_garantie_hypothecaire',
    name: "Garantie hypothécaire premier rang",
    category: 'commercial_financier',
    price: 10000,
    priceMax: 28000,
    description: "Acte constitutif d'hypothèque de premier rang sur un bien immobilier en garantie d'un crédit.",
    templateType: 'pdf',
    classe: 'credit_recouvrement',
    active: true,
    popularity: 52,
    fieldsJson: F([
      { key: 'emprunteur', label: "Emprunteur (constituant)", type: 'text', required: true },
      { key: 'creancier', label: "Créancier hypothécaire", type: 'text', required: true },
      { key: 'bien_hypotheque', label: "Bien hypothéqué", type: 'textarea', required: true },
      { key: 'montant_creance', label: "Montant de la créance garantie", type: 'number', required: true },
      { key: 'rang', label: "Rang de l'hypothèque", type: 'text', required: true },
      { key: 'notaire', label: "Notaire", type: 'text', required: true },
    ]),
    body: `<h1>ACTE D'HYPOTHÈQUE DE PREMIER RANG</h1>
<p><strong>Constituant :</strong> {{emprunteur}}</p>
<p><strong>Créancier hypothécaire :</strong> {{creancier}}</p>
<p><strong>Bien hypothéqué :</strong> {{bien_hypotheque}}</p>
<p>Montant garanti : {{montant_creance}} — Rang : {{rang}}</p>
<p>Reçu par : {{notaire}}</p>
<p>Le présent acte est soumis à publication au livre foncier.</p>
<p>Signature constituant : ___________________________</p>`,
  },

  {
    code: 'cred_relance_amiable_n1',
    name: "Lettre relance amiable niveau 1",
    category: 'commercial_financier',
    price: 800,
    priceMax: 2000,
    description: "Première lettre de relance amiable pour un impayé, ton courtois et non comminatoire.",
    templateType: 'pdf',
    classe: 'credit_recouvrement',
    active: true,
    popularity: 90,
    fieldsJson: F([
      { key: 'creancier', label: "Créancier", type: 'text', required: true },
      { key: 'debiteur', label: "Débiteur", type: 'text', required: true },
      { key: 'montant', label: "Montant impayé", type: 'number', required: true },
      { key: 'reference', label: "Référence facture", type: 'text', required: true },
      { key: 'date_echeance', label: "Date échéance dépassée", type: 'date', required: true },
    ]),
    body: `<h1>RELANCE AMIABLE — NIVEAU 1</h1>
<p>Cher(e) client(e) {{debiteur}},</p>
<p>Sauf erreur ou omission de notre part, nous constatons qu'une facture de <strong>{{montant}}</strong> (réf. {{reference}}), dont l'échéance était fixée au {{date_echeance}}, demeure impayée à ce jour.</p>
<p>Nous vous remercions de bien vouloir procéder à son règlement dans les meilleurs délais, ou de nous contacter pour toute question.</p>
<p>Cordialement,</p>
<p>{{creancier}} — Signature : ___________________________</p>`,
  },

  {
    code: 'cred_relance_n2_mise_demeure',
    name: "Lettre relance niveau 2 mise en demeure",
    category: 'commercial_financier',
    price: 1200,
    priceMax: 3200,
    description: "Deuxième lettre de relance avec caractère de mise en demeure et avertissement de poursuites.",
    templateType: 'pdf',
    classe: 'credit_recouvrement',
    active: true,
    popularity: 82,
    fieldsJson: F([
      { key: 'creancier', label: "Créancier", type: 'text', required: true },
      { key: 'debiteur', label: "Débiteur", type: 'text', required: true },
      { key: 'montant', label: "Montant dû (principal + pénalités)", type: 'number', required: true },
      { key: 'reference', label: "Référence(s) facture(s)", type: 'text', required: true },
      { key: 'delai_ultime', label: "Délai ultime (jours)", type: 'number', required: true },
    ]),
    body: `<h1>RELANCE — NIVEAU 2 / MISE EN DEMEURE</h1>
<p>Monsieur/Madame {{debiteur}},</p>
<p>Malgré notre précédente relance restée sans suite, la somme de <strong>{{montant}}</strong> (facture(s) {{reference}}) demeure impayée.</p>
<p>Par la présente, nous vous mettons formellement en demeure de régler cette somme dans un délai de <strong>{{delai_ultime}} jours</strong>.</p>
<p>À défaut, nous nous verrons contraints d'engager toutes voies de droit à votre encontre, sans autre préavis.</p>
<p>{{creancier}} — Signature : ___________________________</p>`,
  },

  {
    code: 'cred_accord_remise_dette',
    name: "Accord remise de dette",
    category: 'commercial_financier',
    price: 3000,
    priceMax: 8000,
    description: "Convention par laquelle le créancier consent à une remise partielle ou totale de la dette.",
    templateType: 'pdf',
    classe: 'credit_recouvrement',
    active: true,
    popularity: 42,
    fieldsJson: F([
      { key: 'creancier', label: "Créancier", type: 'text', required: true },
      { key: 'debiteur', label: "Débiteur", type: 'text', required: true },
      { key: 'dette_initiale', label: "Montant initial de la dette", type: 'number', required: true },
      { key: 'remise', label: "Montant de la remise", type: 'number', required: true },
      { key: 'solde_exigible', label: "Solde exigible après remise", type: 'number', required: true },
      { key: 'condition_remise', label: "Condition(s) de la remise", type: 'textarea', required: true },
    ]),
    body: `<h1>ACCORD DE REMISE DE DETTE</h1>
<p><strong>Créancier :</strong> {{creancier}}</p>
<p><strong>Débiteur :</strong> {{debiteur}}</p>
<table border="1" cellpadding="6" style="width:100%;border-collapse:collapse;">
  <tr><th>Dette initiale</th><td>{{dette_initiale}}</td></tr>
  <tr><th>Remise accordée</th><td>{{remise}}</td></tr>
  <tr><th>Solde exigible</th><td>{{solde_exigible}}</td></tr>
</table>
<p><strong>Condition(s) :</strong> {{condition_remise}}</p>
<p>La remise est définitive dès règlement du solde exigible.</p>
<p>Signature créancier : ___________________________ | Signature débiteur : ___________________________</p>`,
  },

  {
    code: 'cred_quittance_solde_creance',
    name: "Quittance solde de créance",
    category: 'commercial_financier',
    price: 700,
    priceMax: 1800,
    description: "Quittance pour solde de tout compte clôturant définitivement une créance après paiement.",
    templateType: 'pdf',
    classe: 'credit_recouvrement',
    active: true,
    popularity: 80,
    fieldsJson: F([
      { key: 'creancier', label: "Créancier", type: 'text', required: true },
      { key: 'debiteur', label: "Débiteur", type: 'text', required: true },
      { key: 'montant_recu', label: "Montant reçu", type: 'number', required: true },
      { key: 'date_paiement', label: "Date du paiement", type: 'date', required: true },
      { key: 'reference_creance', label: "Référence créance soldée", type: 'text', required: true },
    ]),
    body: `<h1>QUITTANCE POUR SOLDE DE CRÉANCE</h1>
<p>Je soussigné(e) <strong>{{creancier}}</strong> reconnais avoir reçu de <strong>{{debiteur}}</strong> la somme de <strong>{{montant_recu}}</strong> en date du {{date_paiement}}.</p>
<p>Ce paiement solde définitivement la créance référencée : {{reference_creance}}.</p>
<p>En foi de quoi, je lui délivre la présente quittance pour solde de tout compte, le déclarant libéré de toute obligation.</p>
<p>Signature créancier : ___________________________</p>`,
  },

  {
    code: 'cred_rapport_suivi_creances',
    name: "Rapport suivi des créances",
    category: 'commercial_financier',
    price: 2500,
    priceMax: 6500,
    description: "Rapport périodique de suivi et d'analyse du portefeuille de créances clients.",
    templateType: 'pdf',
    classe: 'credit_recouvrement',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'entreprise', label: "Entreprise", type: 'text', required: true },
      { key: 'periode', label: "Période du rapport", type: 'text', required: true },
      { key: 'total_creances', label: "Total créances clients", type: 'number', required: true },
      { key: 'creances_echues', label: "Dont créances échues", type: 'number', required: true },
      { key: 'creances_douteuses', label: "Dont créances douteuses", type: 'number', required: true },
      { key: 'taux_recouvrement', label: "Taux de recouvrement (%)", type: 'number', required: true },
      { key: 'actions_engagees', label: "Actions engagées", type: 'textarea', required: false },
    ]),
    body: `<h1>RAPPORT DE SUIVI DES CRÉANCES — {{periode}}</h1>
<p><strong>Entreprise :</strong> {{entreprise}}</p>
<table border="1" cellpadding="6" style="width:100%;border-collapse:collapse;">
  <tr><th>Total créances clients</th><td>{{total_creances}}</td></tr>
  <tr><th>Créances échues</th><td>{{creances_echues}}</td></tr>
  <tr><th>Créances douteuses</th><td>{{creances_douteuses}}</td></tr>
  <tr><th>Taux de recouvrement</th><td>{{taux_recouvrement}} %</td></tr>
</table>
<p><strong>Actions engagées :</strong> {{actions_engagees}}</p>
<p>Établi par le service financier — Signature : ___________________________</p>`,
  },

  // ─── 10 PACKS SECTORIELS (commercial_financier, pack_) ───────────────────

  {
    code: 'pack_documents_pme',
    name: "Pack documents PME essentiels",
    category: 'commercial_financier',
    price: 15000,
    priceMax: 40000,
    description: "Pack complet regroupant tous les documents essentiels pour la gestion quotidienne d'une PME.",
    templateType: 'pdf',
    classe: 'pack_sectoriel',
    active: true,
    popularity: 88,
    fieldsJson: F([
      { key: 'entreprise', label: "Nom de l'entreprise", type: 'text', required: true },
      { key: 'secteur', label: "Secteur d'activité", type: 'text', required: true },
      { key: 'dirigeant', label: "Dirigeant principal", type: 'text', required: true },
      { key: 'exercice', label: "Exercice de référence", type: 'text', required: true },
    ]),
    body: `<h1>PACK DOCUMENTS PME ESSENTIELS</h1>
<p><strong>Entreprise :</strong> {{entreprise}} — Secteur : {{secteur}}</p>
<p>Dirigeant : {{dirigeant}} — Exercice : {{exercice}}</p>
<h2>Documents inclus dans ce pack :</h2>
<ul>
  <li>Contrats commerciaux standards</li>
  <li>Modèles de factures et devis</li>
  <li>Procédures RH de base</li>
  <li>Tableaux de bord financiers</li>
  <li>Modèles de courriers administratifs</li>
  <li>Fiches de suivi fiscal</li>
</ul>
<p>Ce pack est personnalisable selon les besoins spécifiques de votre PME.</p>`,
  },

  {
    code: 'pack_creation_entreprise_ohada',
    name: "Pack création entreprise OHADA",
    category: 'commercial_financier',
    price: 18000,
    priceMax: 50000,
    description: "Pack documentaire complet pour la création d'une entreprise dans l'espace OHADA.",
    templateType: 'pdf',
    classe: 'pack_sectoriel',
    active: true,
    popularity: 85,
    fieldsJson: F([
      { key: 'denomination', label: "Dénomination sociale", type: 'text', required: true },
      { key: 'forme_juridique', label: "Forme juridique (SARL, SA, SAS...)", type: 'text', required: true },
      { key: 'pays', label: "Pays OHADA", type: 'text', required: true },
      { key: 'capital_social', label: "Capital social", type: 'number', required: true },
      { key: 'associes', label: "Liste des associés", type: 'textarea', required: true },
    ]),
    body: `<h1>PACK CRÉATION ENTREPRISE OHADA</h1>
<p><strong>Dénomination :</strong> {{denomination}} ({{forme_juridique}})</p>
<p>Pays : {{pays}} — Capital social : {{capital_social}}</p>
<p><strong>Associés :</strong> {{associes}}</p>
<h2>Documents inclus :</h2>
<ul>
  <li>Statuts constitutifs conformes OHADA</li>
  <li>Procès-verbal d'assemblée constitutive</li>
  <li>Déclaration de souscription et versement</li>
  <li>Demande d'immatriculation au RCCM</li>
  <li>Acte de nomination des dirigeants</li>
  <li>Règlement intérieur (facultatif)</li>
</ul>`,
  },

  {
    code: 'pack_cabinet_comptable',
    name: "Pack cabinet comptable",
    category: 'commercial_financier',
    price: 20000,
    priceMax: 55000,
    description: "Pack documentaire conçu pour les cabinets comptables : lettres de mission, rapports, livrables.",
    templateType: 'pdf',
    classe: 'pack_sectoriel',
    active: true,
    popularity: 80,
    fieldsJson: F([
      { key: 'cabinet', label: "Cabinet comptable", type: 'text', required: true },
      { key: 'expert_comptable', label: "Expert-comptable responsable", type: 'text', required: true },
      { key: 'client', label: "Client type visé", type: 'text', required: false },
      { key: 'missions', label: "Types de missions couvertes", type: 'textarea', required: false },
    ]),
    body: `<h1>PACK CABINET COMPTABLE</h1>
<p><strong>Cabinet :</strong> {{cabinet}}</p>
<p>Expert-comptable : {{expert_comptable}}</p>
<p>Missions couvertes : {{missions}}</p>
<h2>Documents inclus :</h2>
<ul>
  <li>Lettre de mission tenue de comptabilité</li>
  <li>Lettre de mission audit</li>
  <li>Rapport de gestion annuel</li>
  <li>Notes de synthèse financière</li>
  <li>Procès-verbaux d'assemblées générales</li>
  <li>Fiches de travail d'audit</li>
  <li>Rapport commissaire aux comptes</li>
</ul>`,
  },

  {
    code: 'pack_cabinet_juridique',
    name: "Pack cabinet juridique",
    category: 'commercial_financier',
    price: 22000,
    priceMax: 60000,
    description: "Pack de documents types pour cabinet d'avocats ou cabinet juridique en droit des affaires africain.",
    templateType: 'pdf',
    classe: 'pack_sectoriel',
    active: true,
    popularity: 75,
    fieldsJson: F([
      { key: 'cabinet', label: "Cabinet juridique", type: 'text', required: true },
      { key: 'avocat_principal', label: "Avocat principal", type: 'text', required: true },
      { key: 'barreau', label: "Barreau d'inscription", type: 'text', required: true },
      { key: 'domaines', label: "Domaines de spécialité", type: 'textarea', required: false },
    ]),
    body: `<h1>PACK CABINET JURIDIQUE</h1>
<p><strong>Cabinet :</strong> {{cabinet}} — Barreau : {{barreau}}</p>
<p>Avocat principal : {{avocat_principal}}</p>
<p>Domaines : {{domaines}}</p>
<h2>Documents inclus :</h2>
<ul>
  <li>Convention d'honoraires</li>
  <li>Contrat de consultation juridique</li>
  <li>Mémoires et conclusions types</li>
  <li>Modèles de mises en demeure</li>
  <li>Procurations judiciaires</li>
  <li>Modèles de contrats commerciaux</li>
  <li>Fiches de due diligence</li>
</ul>`,
  },

  {
    code: 'pack_startup_afrique',
    name: "Pack startup Afrique",
    category: 'commercial_financier',
    price: 12000,
    priceMax: 32000,
    description: "Pack documentaire pour startups africaines : pitch, levée de fonds, gouvernance, conformité.",
    templateType: 'pdf',
    classe: 'pack_sectoriel',
    active: true,
    popularity: 82,
    fieldsJson: F([
      { key: 'startup', label: "Nom de la startup", type: 'text', required: true },
      { key: 'secteur', label: "Secteur tech / innovation", type: 'text', required: true },
      { key: 'fondateurs', label: "Fondateurs", type: 'textarea', required: true },
      { key: 'stade', label: "Stade de développement", type: 'text', required: false },
    ]),
    body: `<h1>PACK STARTUP AFRIQUE</h1>
<p><strong>Startup :</strong> {{startup}} — Secteur : {{secteur}}</p>
<p>Fondateurs : {{fondateurs}} — Stade : {{stade}}</p>
<h2>Documents inclus :</h2>
<ul>
  <li>Pacte d'associés fondateurs</li>
  <li>Term sheet levée de fonds</li>
  <li>Accord de confidentialité (NDA)</li>
  <li>Contrat de travail / BSPCE pour talents</li>
  <li>Politique de gouvernance startup</li>
  <li>Modèle de pitch deck structuré</li>
  <li>Due diligence checklist investisseur</li>
</ul>`,
  },

  {
    code: 'pack_ong_africa',
    name: "Pack ONG Africa",
    category: 'commercial_financier',
    price: 10000,
    priceMax: 27000,
    description: "Pack documentaire pour ONG et associations à but non lucratif opérant en Afrique.",
    templateType: 'pdf',
    classe: 'pack_sectoriel',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'ong', label: "Nom de l'ONG", type: 'text', required: true },
      { key: 'mission', label: "Mission / objet social", type: 'textarea', required: true },
      { key: 'pays_operation', label: "Pays d'opération", type: 'text', required: true },
      { key: 'bailleurs', label: "Principaux bailleurs", type: 'text', required: false },
    ]),
    body: `<h1>PACK ONG AFRICA</h1>
<p><strong>ONG :</strong> {{ong}}</p>
<p>Mission : {{mission}}</p>
<p>Pays : {{pays_operation}} — Bailleurs : {{bailleurs}}</p>
<h2>Documents inclus :</h2>
<ul>
  <li>Statuts d'association loi locale</li>
  <li>Règlement intérieur ONG</li>
  <li>Conventions de partenariat bailleur</li>
  <li>Rapports narratifs et financiers</li>
  <li>Procédures de passation de marchés</li>
  <li>Politique de sauvegarde et protection</li>
  <li>Manuel de gestion financière</li>
</ul>`,
  },

  {
    code: 'pack_agro_industrie',
    name: "Pack agro-industrie",
    category: 'commercial_financier',
    price: 16000,
    priceMax: 44000,
    description: "Pack documentaire sectoriel pour entreprises de transformation agro-industrielle en Afrique.",
    templateType: 'pdf',
    classe: 'pack_sectoriel',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'entreprise', label: "Entreprise agro-industrielle", type: 'text', required: true },
      { key: 'filiere', label: "Filière (cacao, café, palmier...)", type: 'text', required: true },
      { key: 'capacite_prod', label: "Capacité de production", type: 'text', required: false },
      { key: 'marches_cibles', label: "Marchés cibles", type: 'text', required: false },
    ]),
    body: `<h1>PACK AGRO-INDUSTRIE</h1>
<p><strong>Entreprise :</strong> {{entreprise}} — Filière : {{filiere}}</p>
<p>Capacité : {{capacite_prod}} — Marchés : {{marches_cibles}}</p>
<h2>Documents inclus :</h2>
<ul>
  <li>Contrats d'approvisionnement producteurs</li>
  <li>Contrats de transformation et sous-traitance</li>
  <li>Accords de distribution export</li>
  <li>Certificats sanitaires et phytosanitaires</li>
  <li>Cahiers des charges qualité</li>
  <li>Contrats de financement de campagne</li>
  <li>Accords de certification (Bio, Fair Trade)</li>
</ul>`,
  },

  {
    code: 'pack_btp_afrique',
    name: "Pack BTP Afrique",
    category: 'commercial_financier',
    price: 18000,
    priceMax: 48000,
    description: "Pack documentaire complet pour entreprises du BTP opérant sur les marchés africains.",
    templateType: 'pdf',
    classe: 'pack_sectoriel',
    active: true,
    popularity: 72,
    fieldsJson: F([
      { key: 'entreprise', label: "Entreprise BTP", type: 'text', required: true },
      { key: 'specialite', label: "Spécialité (génie civil, bâtiment...)", type: 'text', required: true },
      { key: 'pays_activite', label: "Pays d'activité", type: 'text', required: false },
      { key: 'agrements', label: "Agréments et certifications", type: 'text', required: false },
    ]),
    body: `<h1>PACK BTP AFRIQUE</h1>
<p><strong>Entreprise :</strong> {{entreprise}} — Spécialité : {{specialite}}</p>
<p>Pays d'activité : {{pays_activite}} — Agréments : {{agrements}}</p>
<h2>Documents inclus :</h2>
<ul>
  <li>Contrats de marché public FIDIC adaptés</li>
  <li>Actes de sous-traitance</li>
  <li>Cautionnements et garanties de bonne fin</li>
  <li>Ordres de service et avenants</li>
  <li>PV de réception provisoire et définitive</li>
  <li>Décomptes et situations de travaux</li>
  <li>Plan d'assurance qualité chantier</li>
</ul>`,
  },

  {
    code: 'pack_sante_prive',
    name: "Pack santé privé",
    category: 'commercial_financier',
    price: 14000,
    priceMax: 38000,
    description: "Pack documentaire pour établissements de santé privés : cliniques, polycliniques, laboratoires.",
    templateType: 'pdf',
    classe: 'pack_sectoriel',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'etablissement', label: "Établissement de santé", type: 'text', required: true },
      { key: 'type_etablissement', label: "Type (clinique, labo, pharmacie...)", type: 'text', required: true },
      { key: 'directeur_medical', label: "Directeur médical", type: 'text', required: true },
      { key: 'autorisations', label: "Autorisations d'exercice", type: 'text', required: false },
    ]),
    body: `<h1>PACK SANTÉ PRIVÉ</h1>
<p><strong>Établissement :</strong> {{etablissement}} ({{type_etablissement}})</p>
<p>Directeur médical : {{directeur_medical}} — Autorisations : {{autorisations}}</p>
<h2>Documents inclus :</h2>
<ul>
  <li>Règlement intérieur établissement</li>
  <li>Contrats avec praticiens libéraux</li>
  <li>Conventions d'assurance maladie</li>
  <li>Formulaires de consentement patient</li>
  <li>Procédures de pharmacovigilance</li>
  <li>Contrats de fournitures médicales</li>
  <li>Politique qualité et accréditation</li>
</ul>`,
  },

  {
    code: 'pack_education_privee',
    name: "Pack éducation privée",
    category: 'commercial_financier',
    price: 11000,
    priceMax: 30000,
    description: "Pack documentaire pour établissements d'enseignement privé : écoles, universités, centres de formation.",
    templateType: 'pdf',
    classe: 'pack_sectoriel',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'etablissement', label: "Établissement", type: 'text', required: true },
      { key: 'type_enseignement', label: "Type (primaire, supérieur, formation pro...)", type: 'text', required: true },
      { key: 'directeur', label: "Directeur", type: 'text', required: true },
      { key: 'agrement', label: "Agrément ministériel", type: 'text', required: false },
    ]),
    body: `<h1>PACK ÉDUCATION PRIVÉE</h1>
<p><strong>Établissement :</strong> {{etablissement}} ({{type_enseignement}})</p>
<p>Directeur : {{directeur}} — Agrément : {{agrement}}</p>
<h2>Documents inclus :</h2>
<ul>
  <li>Règlement intérieur établissement</li>
  <li>Contrats de scolarité et de formation</li>
  <li>Contrats de travail enseignants</li>
  <li>Conventions de stage</li>
  <li>Procès-verbaux de délibérations</li>
  <li>Diplômes et attestations de formation</li>
  <li>Chartes éthiques et anti-fraude</li>
</ul>`,
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
  console.log(`Batch 10b OK — créés:${created} maj:${updated} TOTAL:${total}`);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
