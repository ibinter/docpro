// Référentiel des sous-catégories du catalogue.
// Chaque catégorie a des sous-catégories définies par des règles de mots-clés
// appliquées au nom du modèle (normalisé sans accents). La première règle qui
// matche gagne ; sans correspondance → « autres ».
// Utilisé par scripts/classify-subcategories.ts (classement) et le catalogue (UI).

export interface SousCategorie {
  code: string;
  label: string;
  /** Regex testée sur le nom normalisé (minuscules, sans accents) */
  re: RegExp;
}

function norm(s: string): string {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/œ/g, 'oe').replace(/æ/g, 'ae');
}

export const SOUS_CATEGORIES: Record<string, SousCategorie[]> = {
  commercial: [
    { code: 'vente', label: 'Vente & Devis', re: /vente|devis|proforma|commande|facturation|tarif|cession|remise|reprise|invendus|achat/ },
    { code: 'distribution', label: 'Distribution & Fournisseurs', re: /distribut|fournisseur|grossiste|franchis|concession|revendeur|approvisionnement|centrale d.achat|referencement/ },
    { code: 'partenariat', label: 'Partenariats & Agences', re: /partenariat|agent commercial|courtage|apporteur|mandat|representation|sponsoring|coproduction/ },
    { code: 'marketing', label: 'Marketing & Publicité', re: /marketing|publicit|campagne|promotion|fidelis|etude de marche|sondage|annonceur/ },
    { code: 'prestation', label: 'Prestations de services', re: /prestation|accord de service|service de|maintenance|sous-traitance|externalisation|fourniture|location/ },
    { code: 'cgv_conditions', label: 'CGV & Conditions', re: /conditions generales|cgv|cga|garantie|retour|livraison/ },
  ],
  juridique_admin: [
    { code: 'contrats', label: 'Contrats & Conventions', re: /contrat|convention|accord|avenant|protocole/ },
    { code: 'famille', label: 'Famille & Succession', re: /divorce|mariage|pension|garde|succession|heredit|testament|donation|notoriete|adoption/ },
    { code: 'societes', label: 'Sociétés & Statuts', re: /statuts|societe|sarl|\bsa\b|sas|gie|assemblee|gerant|cession de parts|dissolution/ },
    { code: 'procurations', label: 'Procurations & Attestations', re: /procuration|attestation|declaration sur l.honneur|certificat|legalisation/ },
    { code: 'contentieux', label: 'Contentieux & Recouvrement', re: /mise en demeure|injonction|plainte|recours|litige|recouvrement|arbitrage|assignation|requete/ },
    { code: 'administratif', label: 'Démarches administratives', re: /demande|autorisation|permis|licence|agrement|immatriculation/ },
  ],
  rh_emploi: [
    { code: 'candidature', label: 'CV & Candidatures', re: /\bcv\b|curriculum|motivation|candidature|entretien/ },
    { code: 'contrats_travail', label: 'Contrats de travail', re: /contrat.*(travail|cdi|cdd)|embauche|engagement|essai|stage|apprentissage/ },
    { code: 'gestion_personnel', label: 'Gestion du personnel', re: /conge|absence|mutation|promotion|evaluation|fiche de poste|reglement interieur|note de service|accord|politique|formation|teletravail|horaire|charte/ },
    { code: 'paie', label: 'Paie & Avantages', re: /salaire|paie|prime|indemnite|avantage|bulletin/ },
    { code: 'rupture', label: 'Rupture & Discipline', re: /licenciement|demission|rupture|sanction|avertissement|mise a pied|solde de tout compte/ },
    { code: 'recrutement', label: 'Recrutement', re: /recrutement|offre d.emploi|annonce|selection/ },
  ],
  communication: [
    { code: 'interne', label: 'Communication interne', re: /interne|note d.information|circulaire|journal d.entreprise/ },
    { code: 'presse', label: 'Presse & Relations publiques', re: /presse|communique|media|interview|conference/ },
    { code: 'digital', label: 'Digital & Réseaux sociaux', re: /reseaux sociaux|digital|site web|newsletter|emailing|community/ },
    { code: 'evenementiel', label: 'Événementiel', re: /evenement|salon|ceremonie|lancement|inauguration|invitation/ },
    { code: 'creation', label: 'Création & Production', re: /charte graphique|logo|video|photo|impression|affiche/ },
  ],
  comptabilite_audit: [
    { code: 'tenue', label: 'Tenue comptable', re: /journal|grand livre|balance|rapprochement|imputation|ecriture/ },
    { code: 'etats', label: 'États financiers', re: /bilan|compte de resultat|tafire|etats financiers|annexe|liasse/ },
    { code: 'audit', label: 'Audit & Contrôle', re: /audit|controle|commissaire|revision|forensic|inventaire/ },
    { code: 'fiscal', label: 'Fiscalité', re: /fiscal|impot|tva|declaration|dgi|redressement/ },
    { code: 'analyse', label: 'Analyse & Reporting', re: /analyse|reporting|tableau de bord|ratio|budget|prevision/ },
  ],
  finance_banque: [
    { code: 'credit', label: 'Crédit & Prêts', re: /credit|pret|emprunt|remboursement|echeancier|amortissement/ },
    { code: 'garanties', label: 'Garanties & Sûretés', re: /caution|garantie|nantissement|gage|hypotheque|aval|surete/ },
    { code: 'comptes', label: 'Comptes & Placements', re: /compte|placement|depot|bon de caisse|epargne|dat|convention|accord|ouverture|banque/ },
    { code: 'microfinance', label: 'Microfinance & Mobile Money', re: /microfinance|tontine|mobile money|transfert|wallet/ },
    { code: 'titres', label: 'Titres & Effets', re: /billet a ordre|lettre de change|cheque|traite|effet|obligation|action/ },
  ],
  informatique_tech: [
    { code: 'developpement', label: 'Développement & Projets', re: /developpement|logiciel|application|site|integration|cahier des charges/ },
    { code: 'contrats_it', label: 'Contrats IT & SaaS', re: /saas|licence|abonnement|hebergement|maintenance|infogerance|tma|accord de service|prestation|support|cloud|api/ },
    { code: 'donnees', label: 'Données & Sécurité', re: /donnees|rgpd|confidentialite|securite|sauvegarde|charte informatique/ },
    { code: 'agile', label: 'Méthodes agiles', re: /scrum|sprint|backlog|kanban|agile|velocite|retrospective|daily/ },
    { code: 'recette', label: 'Recette & Livraison', re: /recette|vabf|vsr|livraison|deploiement|mise en production/ },
  ],
  gestion_management: [
    { code: 'strategie', label: 'Stratégie & Pilotage', re: /strategie|plan d.action|objectif|swot|vision|pilotage/ },
    { code: 'organisation', label: 'Organisation & Procédures', re: /organigramme|procedure|processus|delegation|manuel/ },
    { code: 'reunions', label: 'Réunions & Comptes-rendus', re: /reunion|compte.rendu|ordre du jour|comite/ },
    { code: 'performance', label: 'Performance & Indicateurs', re: /performance|indicateur|kpi|evaluation|tableau de bord/ },
  ],
  gestion_projet: [
    { code: 'cadrage', label: 'Cadrage & Lancement', re: /cadrage|charte projet|lancement|termes de reference|note conceptuelle/ },
    { code: 'planification', label: 'Planification & Suivi', re: /planning|gantt|jalon|suivi|avancement|evaluation/ },
    { code: 'agile_projet', label: 'Agile & Scrum', re: /scrum|sprint|backlog|kanban|agile|epique/ },
    { code: 'livrables', label: 'Livrables & Recette', re: /recette|vabf|vsr|livrable|proces.verbal|cloture/ },
    { code: 'risques', label: 'Risques & Qualité projet', re: /risque|qualite|probleme|incident/ },
  ],
  qhse: [
    { code: 'securite', label: 'Sécurité au travail', re: /securite|epi|accident|permis de travail|consigne|plan de prevention/ },
    { code: 'qualite_smq', label: 'Qualité & SMQ', re: /qualite|iso|smq|amelioration|5s|kaizen|etalonnage/ },
    { code: 'non_conformites', label: 'Non-conformités & Audits', re: /non.conform|audit|action corrective|quarantaine|5 pourquoi/ },
    { code: 'environnement', label: 'Environnement', re: /environnement|dechet|pollution|eies|carbone/ },
    { code: 'hygiene', label: 'Hygiène & HACCP', re: /hygiene|haccp|sanitaire|nettoyage|desinfection/ },
  ],
  entrepreneuriat: [
    { code: 'business_plan', label: 'Business plans', re: /business plan|plan d.affaires/ },
    { code: 'etudes', label: 'Études & Canvas', re: /etude|canvas|faisabilite|marche|pitch/ },
    { code: 'creation', label: 'Création d’entreprise', re: /creation|immatriculation|statut|formalite|entreprenant/ },
    { code: 'financement', label: 'Financement & Levée', re: /financement|levee|investisseur|subvention|pret|pacte d.associes/ },
  ],
  btp_construction: [
    { code: 'marches', label: 'Marchés & Contrats travaux', re: /marche|contrat|sous.traitance|appel d.offres|soumission/ },
    { code: 'chantier', label: 'Suivi de chantier', re: /chantier|situation|reception|reserve|proces.verbal|attachement|reunion/ },
    { code: 'etudes_btp', label: 'Études & Plans', re: /etude|plan|metre|devis|descriptif|dimensionnement/ },
    { code: 'securite_btp', label: 'Sécurité chantier', re: /securite|ppsps|epi|hygiene/ },
    { code: 'services_btp', label: 'Prestations spécialisées', re: /installation|renovation|amenagement|entretien|service/ },
  ],
  assurance: [
    { code: 'souscription', label: 'Souscription & Polices', re: /souscription|police|proposition|adhesion|avenant/ },
    { code: 'sinistres', label: 'Sinistres & Indemnisation', re: /sinistre|indemnisation|declaration|expertise|reglement/ },
    { code: 'auto', label: 'Assurance automobile', re: /auto|vehicule|flotte/ },
    { code: 'sante_prevoyance', label: 'Santé & Prévoyance', re: /sante|maladie|prevoyance|deces|retraite|mutuelle/ },
    { code: 'intermediaires', label: 'Courtage & Agents', re: /courtage|courtier|agent|intermediaire|commission/ },
  ],
  transport_logistique: [
    { code: 'transport_marchandises', label: 'Transport de marchandises', re: /marchandise|fret|camion|lettre de voiture|affretement|transport|expedition|cargaison/ },
    { code: 'logistique', label: 'Logistique & Entreposage', re: /entrepot|stockage|logistique|cross.docking|inventaire|manutention/ },
    { code: 'douane', label: 'Douane & Transit', re: /douane|transit|dedouanement|import|export|connaissement/ },
    { code: 'personnes', label: 'Transport de personnes', re: /passager|personnel|navette|taxi|vtc|location de vehicule/ },
    { code: 'livraison', label: 'Livraison & Distribution', re: /livraison|coursier|distribution|derniere.kilometre/ },
  ],
  immobilier: [
    { code: 'location', label: 'Baux & Location', re: /bail|location|loyer|locataire|etat des lieux|quittance/ },
    { code: 'vente_immo', label: 'Vente & Acquisition', re: /vente|achat|promesse|compromis|acte|cession/ },
    { code: 'foncier', label: 'Foncier & Titres', re: /foncier|titre|terrain|lotissement|acd|partage/ },
    { code: 'gestion_immo', label: 'Gestion locative & Syndic', re: /gestion|syndic|copropriete|mandat|charges/ },
    { code: 'promotion', label: 'Promotion & Construction', re: /promotion|vefa|programme|reservation/ },
  ],
  academique: [
    { code: 'memoires', label: 'Mémoires & Thèses', re: /memoire|these|soutenance|recherche/ },
    { code: 'stages', label: 'Stages & Rapports', re: /stage|rapport/ },
    { code: 'scolarite', label: 'Scolarité & Inscriptions', re: /inscription|scolarite|bourse|attestation|releve/ },
    { code: 'cv_academique', label: 'CV & Candidatures', re: /\bcv\b|candidature|motivation|admission/ },
    { code: 'pedagogie', label: 'Pédagogie & Cours', re: /cours|syllabus|examen|evaluation|programme|formation|atelier|expose|fiche|lecture|projet/ },
  ],
  sante: [
    { code: 'consultations', label: 'Consultations & Certificats', re: /consultation|certificat|ordonnance|prescription/ },
    { code: 'consentements', label: 'Consentements éclairés', re: /consentement/ },
    { code: 'etablissements', label: 'Cliniques & Établissements', re: /clinique|hopital|cabinet|pharmacie|laboratoire|convention|accord de service|prestation|soins|medical|telemedecine|urgence/ },
    { code: 'dossiers', label: 'Dossiers & Registres', re: /dossier|registre|fiche|suivi/ },
    { code: 'assurance_sante', label: 'Assurance maladie & Tiers payant', re: /assurance|mutuelle|prise en charge|tiers payant|cmu/ },
  ],
  association: [
    { code: 'creation_asso', label: 'Création & Statuts', re: /statuts|creation|constitution|recepisse|declaration/ },
    { code: 'gouvernance', label: 'Gouvernance & AG', re: /assemblee|bureau|conseil|proces.verbal|election|reglement/ },
    { code: 'membres', label: 'Membres & Cotisations', re: /membre|adhesion|cotisation|carte/ },
    { code: 'projets_ong', label: 'Projets & Bailleurs', re: /projet|bailleur|subvention|convention|partenariat|rapport|accord|programme|mission|benevol|volontaire/ },
    { code: 'collecte', label: 'Dons & Collecte', re: /don|collecte|mecenat|sponsoring|recu/ },
  ],
  agro_environnement: [
    { code: 'production', label: 'Production agricole', re: /culture|plantation|verger|semence|recolte|elevage|pisciculture|aviculture|agricole|exploitation|ferme|irrigation|intrant|accord de service|betail|animaux/ },
    { code: 'filieres', label: 'Filières & Coopératives', re: /cooperative|filiere|cacao|cafe|anacarde|coton|producteur/ },
    { code: 'commerce_agro', label: 'Achat & Export', re: /achat|vente|export|negoce|collecte|prefinancement/ },
    { code: 'foncier_rural', label: 'Foncier rural', re: /foncier|terre|bail rural|certificat|metayage/ },
    { code: 'environnement_agro', label: 'Environnement & Certification', re: /environnement|bio|certification|durable|eies|hse/ },
  ],
};

export const AUTRES = { code: 'autres', label: 'Autres documents' };

/** Classe un modèle : première sous-catégorie dont la regex matche le nom
 *  normalisé ; à défaut, la description (signal secondaire). */
export function classifier(category: string, name: string, description?: string | null): string {
  const subs = SOUS_CATEGORIES[category];
  if (!subs) return AUTRES.code;
  const n = norm(name);
  for (const s of subs) if (s.re.test(n)) return s.code;
  if (description) {
    const d = norm(description);
    for (const s of subs) if (s.re.test(d)) return s.code;
  }
  return AUTRES.code;
}

/** Libellé d'une sous-catégorie (pour l'UI). */
export function sousCategorieLabel(category: string, code: string): string {
  if (code === AUTRES.code) return AUTRES.label;
  return SOUS_CATEGORIES[category]?.find(s => s.code === code)?.label ?? code;
}
