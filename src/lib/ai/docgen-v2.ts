// Architecture v2 — IA → JSON → rendu HTML par notre code (CDC §1-3).
// Le prompt et le rendu s'adaptent à la FAMILLE du document (contrat, lettre,
// CV, business plan, statuts, PV, politique, rapport…) : un CV ne reçoit pas
// de consignes de bail foncier, une lettre n'a pas de bloc « clauses spéciales ».
import type { TemplateField, Answers } from '@/lib/docgen';
import { MODEL_BY_NIVEAU, MAX_TOKENS, type Classe, type Niveau } from '@/lib/pricing';
import { reviewDocument } from './qc';
import { sectorKnowledge } from './sectors';

export interface DocGenInput {
  templateName: string;
  templateDescription?: string;
  templateBody: string;
  fields: TemplateField[];
  answers: Answers;
  country?: string | null;
  classe: Classe;
  niveau: Niveau;
  category?: string | null;
}

export interface DocSection {
  titre: string;
  contenu: string; // texte pur, pas de HTML
  articles?: { titre: string; texte: string }[];
}

export interface DocJson {
  schema: string; // ex: "contrat.v1"
  titre: string;
  parties?: Record<string, string>;
  sections: DocSection[];
  clauses_speciales?: string[];
  date_creation: string;
  pays: string;
}

/* ══════════════════════════════════════════════════════════════════════════
   1. FAMILLES DOCUMENTAIRES — structure, ton et rendu propres à chaque type
   ══════════════════════════════════════════════════════════════════════════ */

type Famille =
  | 'contrat' | 'lettre' | 'cv' | 'business_plan' | 'statuts'
  | 'pv' | 'politique' | 'rapport' | 'attestation' | 'facture_devis' | 'generique';

interface FamilleSpec {
  /** Sections attendues (guide, pas carcan) */
  structure: string[];
  /** Consignes de rédaction propres à la famille */
  consignes: string;
  /** Le document se signe-t-il entre parties (bloc signatures + soussignés) ? */
  avecParties: boolean;
  /** Libellé du schema JSON */
  schema: string;
}

const FAMILLES: Record<Famille, FamilleSpec> = {
  contrat: {
    schema: 'contrat.v1',
    avecParties: true,
    structure: [
      'Préambule', 'Définitions', 'Objet du contrat', 'Durée', 'Obligations des parties',
      'Conditions financières', 'Résiliation', 'Confidentialité', 'Force majeure',
      'Règlement des litiges', 'Dispositions finales',
    ],
    consignes: `- Style juridique précis : chaque article numéroté, phrases affirmatives, zéro ambiguïté.
- Références légales EXACTES du pays cible : Actes uniformes OHADA applicables (AUDCG pour le commercial, AUSCGIE pour les sociétés, AUS pour les sûretés), Code du travail local pour les contrats de travail, Code civil local pour le droit commun.
- Clause d'arbitrage CCJA (Cour Commune de Justice et d'Arbitrage, Abidjan) ou tribunaux locaux compétents.
- Identifiants réalistes formatés : RCCM (ex: CI-ABJ-2024-B-12345), NIU/NINEA/NIF selon le pays.
- COHÉRENCE DES DATES : date de fin = date de début + durée. Zéro contradiction entre articles.
- Montants en chiffres ET en lettres pour les sommes importantes.`,
  },
  lettre: {
    schema: 'lettre.v1',
    avecParties: false,
    structure: ['En-tête et coordonnées', 'Objet', 'Corps de la lettre', 'Formule de politesse et signature'],
    consignes: `- Registre soutenu et courtois, adapté au destinataire (administration, employeur, partenaire).
- L'objet est précis et une seule phrase. Le corps argumente en 2 à 4 paragraphes concrets.
- Références administratives réalistes si pertinent (numéro de dossier, date de la demande initiale).
- Formule de politesse conforme aux usages de l'Afrique francophone.`,
  },
  cv: {
    schema: 'cv.v1',
    avecParties: false,
    structure: [
      'Profil professionnel', 'Compétences clés', 'Expérience professionnelle',
      'Formation et diplômes', 'Langues', 'Certifications et atouts', 'Centres d’intérêt',
    ],
    consignes: `- Chaque expérience : poste, employeur, période, puis 3 à 5 réalisations CHIFFRÉES (%, montants FCFA, effectifs, volumes) introduites par des verbes d'action.
- Le profil professionnel accroche en 3-4 lignes : années d'expérience, spécialité, valeur apportée.
- Compétences groupées par domaine (techniques, managériales, sectorielles).
- Adapté au marché de l'emploi africain : diplômes locaux (BTS, Licence, Master), références aux entreprises et secteurs de la région.
- AUCUNE clause juridique, AUCUN article numéroté : c'est un CV, pas un contrat.`,
  },
  business_plan: {
    schema: 'business_plan.v1',
    avecParties: false,
    structure: [
      'Résumé exécutif', 'Présentation du projet et du promoteur', 'Étude de marché',
      'Stratégie commerciale et marketing', 'Plan opérationnel', 'Organisation et équipe',
      'Plan financier prévisionnel', 'Analyse des risques', 'Plan de financement et demande',
      'Conclusion et perspectives',
    ],
    consignes: `- Niveau bancable : le document doit convaincre un banquier ou un investisseur africain.
- CHIFFRES PARTOUT : taille de marché estimée en FCFA, prix unitaires, CA prévisionnel sur 3 ans, seuil de rentabilité, besoin de financement détaillé.
- Étude de marché ancrée localement : concurrents types, habitudes de consommation, circuits de distribution du pays cible.
- Plan financier : compte d'exploitation prévisionnel simplifié en texte structuré (produits, charges, résultat) sur 3 exercices.
- Mentionner les structures d'appui locales pertinentes (agences PME, fonds de garantie, incubateurs).`,
  },
  statuts: {
    schema: 'statuts.v1',
    avecParties: true,
    structure: [
      'Forme juridique', 'Dénomination sociale', 'Objet social', 'Siège social', 'Durée',
      'Capital social et apports', 'Parts sociales / Actions', 'Gérance / Administration',
      'Décisions collectives', 'Exercice social et comptes', 'Dissolution et liquidation',
      'Dispositions diverses',
    ],
    consignes: `- Conformité STRICTE à l'Acte uniforme OHADA relatif au droit des sociétés commerciales et du GIE (AUSCGIE, révisé le 30/01/2014).
- Capital, valeur nominale des parts et répartition entre associés : chiffres précis et cohérents (la somme des apports = le capital).
- Articles numérotés dans l'ordre légal habituel. Citer les articles AUSCGIE pertinents (ex: art. 311 pour le capital SARL minimum libre).
- Formalités locales : RCCM, notaire ou acte sous seing privé selon la forme, journal d'annonces légales.`,
  },
  pv: {
    schema: 'pv.v1',
    avecParties: true,
    structure: [
      'En-tête (société, date, lieu, convocation)', 'Feuille de présence et quorum',
      'Ordre du jour', 'Délibérations par résolution', 'Résolutions adoptées et votes',
      'Clôture et signatures',
    ],
    consignes: `- Style procès-verbal : passé composé, tournures consacrées (« Après en avoir délibéré, l'assemblée... »).
- Chaque résolution est numérotée, énoncée puis suivie du résultat du vote (unanimité ou décompte).
- Quorum et majorités conformes à l'AUSCGIE selon le type d'assemblée (AGO/AGE).
- Cohérence : les noms des présents, du président de séance et des signataires concordent.`,
  },
  politique: {
    schema: 'politique.v1',
    avecParties: false,
    structure: [
      'Objet et champ d’application', 'Références réglementaires', 'Définitions',
      'Principes et engagements', 'Rôles et responsabilités', 'Procédures et mise en œuvre',
      'Contrôle, indicateurs et audit', 'Sanctions et non-conformités', 'Révision du document',
    ],
    consignes: `- Style normatif clair : le présent de l'indicatif vaut obligation (« Le personnel porte ses EPI »).
- Références aux normes internationales pertinentes (ISO 9001/14001/45001, codes locaux du travail, CIMA pour l'assurance, réglementations sectorielles).
- Responsabilités par fonction (Direction, responsable QHSE, chefs d'équipe, employés) — jamais par nom de personne.
- Indicateurs mesurables (taux de fréquence, taux de gravité, objectifs chiffrés).`,
  },
  rapport: {
    schema: 'rapport.v1',
    avecParties: false,
    structure: [
      'Page de synthèse', 'Introduction et contexte', 'Méthodologie',
      'Constats et analyse', 'Résultats détaillés', 'Recommandations',
      'Plan d’action', 'Conclusion', 'Annexes',
    ],
    consignes: `- Ton factuel et analytique. Chaque constat s'appuie sur des données chiffrées réalistes.
- Les recommandations sont numérotées, priorisées (haute/moyenne/basse) et assorties d'un responsable et d'une échéance.
- La synthèse initiale tient en 10 lignes et donne les 3 messages clés.`,
  },
  attestation: {
    schema: 'attestation.v1',
    avecParties: false,
    structure: ['Identification de l’émetteur', 'Corps de l’attestation', 'Mentions légales et validité', 'Date, lieu et signature'],
    consignes: `- Formulation consacrée : « Je soussigné(e)..., certifie que... ».
- Une attestation est COURTE et précise : identité complète, faits attestés, période, finalité (« pour servir et valoir ce que de droit »).
- Mentionner les sanctions en cas de fausse attestation selon le code pénal local.`,
  },
  facture_devis: {
    schema: 'facture.v1',
    avecParties: false,
    structure: [
      'En-tête émetteur et client', 'Références du document', 'Détail des prestations ou produits',
      'Totaux et TVA', 'Conditions de paiement', 'Mentions légales',
    ],
    consignes: `- Lignes de prestation avec quantité, prix unitaire et total en FCFA, cohérents entre eux.
- TVA au taux du pays cible (18 % zone UEMOA par défaut, 19,25 % Cameroun...) — total TTC = total HT + TVA, calcul EXACT.
- Mentions obligatoires : RCCM, NIU/NINEA, régime fiscal, coordonnées bancaires ou Mobile Money.
- Conditions de paiement claires (délai, pénalités de retard, escompte).`,
  },
  generique: {
    schema: 'document.v1',
    avecParties: false,
    structure: ['Introduction', 'Développement structuré en sections thématiques', 'Conclusion ou dispositions finales'],
    consignes: `- Structure professionnelle logique adaptée au type de document demandé.
- Contenu concret et directement utilisable : zéro généralité creuse, zéro remplissage.`,
  },
};

/** Détecte la famille documentaire depuis le nom du modèle et sa catégorie. */
export function detectFamille(templateName: string, category?: string | null): Famille {
  const n = templateName
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase();

  if (/\bcv\b|curriculum/.test(n)) return 'cv';
  if (/business\s*plan|plan\s*d.affaires|etude de faisabilite/.test(n)) return 'business_plan';
  if (/statuts?\b/.test(n)) return 'statuts';
  if (/proces[\s-]*verbal|\bpv\b|compte[\s-]*rendu.*(assemblee|reunion|conseil)/.test(n)) return 'pv';
  if (/facture|devis|pro[\s-]?forma|bon de commande/.test(n)) return 'facture_devis';
  if (/attestation|certificat(?!ion)/.test(n)) return 'attestation';
  if (/lettre|courrier|demande de|demission|motivation|mise en demeure|relance|reclamation/.test(n)) return 'lettre';
  if (/politique|charte|procedure|reglement interieur|plan de prevention|consigne/.test(n)) return 'politique';
  if (/rapport|audit|diagnostic|evaluation|bilan(?! comptable)/.test(n)) return 'rapport';
  if (/contrat|bail|convention|accord|avenant|pacte|protocole|mandat|procuration/.test(n)) return 'contrat';

  // Repli par catégorie
  switch (category) {
    case 'juridique_admin': return 'contrat';
    case 'rh_emploi': return /offre|annonce|fiche de poste/.test(n) ? 'generique' : 'lettre';
    case 'entrepreneuriat': return 'business_plan';
    case 'qhse': return 'politique';
    case 'comptabilite_audit': return 'rapport';
    default: return 'generique';
  }
}

/* ══════════════════════════════════════════════════════════════════════════
   2. PROMPTS
   ══════════════════════════════════════════════════════════════════════════ */

const SYSTEM_PROMPT_JSON = `Tu es un rédacteur professionnel expert des documents d'affaires, juridiques et administratifs pour l'Afrique francophone (zones OHADA, UEMOA, CEMAC).
Tu produis des documents de qualité cabinet : précis, ancrés dans le contexte légal et économique du pays cible, immédiatement utilisables.

Tu réponds en JSON STRICT. Réponds UNIQUEMENT avec du JSON valide, sans aucun texte avant ou après.

RÈGLES ABSOLUES :
- JSON valide uniquement. Zéro texte hors JSON. Termine toujours le JSON complètement.
- Respecte le nombre de mots demandé par section — développe réellement, sans remplissage.
- JAMAIS de blancs (___), de [À compléter] ni de placeholders : rédige des valeurs réalistes et cohérentes.
- Si une information client manque, déduis une valeur professionnelle plausible et cohérente avec le reste.
- ORTHOGRAPHE ET GRAMMAIRE IRRÉPROCHABLES. Typographie française (espaces insécables avant : ; ? !, guillemets « »).
- Adapte les références légales, monnaies, institutions et usages AU PAYS CIBLE indiqué — ne cite jamais une loi d'un autre pays.
- COHÉRENCE INTERNE TOTALE : dates, montants, noms et positions identiques d'un bout à l'autre du document.`;

function buildPrompt(input: DocGenInput): string {
  const { templateName, templateDescription, templateBody, fields, answers, country, niveau, category } = input;
  const famille = detectFamille(templateName, category);
  const spec = FAMILLES[famille];

  const provided = fields
    .map(f => {
      const v = (answers[f.key] ?? '').trim();
      return v ? `${f.label}: ${v}` : null;
    })
    .filter(Boolean).join('\n');

  // Aperçu texte du corps du template : sert de guide de structure spécifique au modèle.
  const structureHint = templateBody
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\{\{[^}]+\}\}/g, '[donnée client]')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 900);

  // Haiku (standard) : budget 8000 tokens. Sonnet/Opus : 20k-64k.
  const wordsPerSection = niveau === 'standard' ? '110 à 140' : niveau === 'pro' ? '200 à 350' : '300 à 500';
  const sectionsMin = Math.max(
    spec.structure.length,
    niveau === 'standard' ? spec.structure.length : niveau === 'pro' ? spec.structure.length + 2 : spec.structure.length + 4
  );
  const niveauDesc = {
    standard: 'complet et professionnel, toutes les rubriques attendues présentes et développées',
    pro: 'très détaillé, personnalisé au secteur du client, avec références précises et sous-parties',
    expert: 'exhaustif, qualité cabinet/notariale, données de marché locales, références réglementaires récentes',
  }[niveau];

  return `Rédige un document professionnel : « ${templateName} » (niveau ${niveau} — ${niveauDesc}).
${templateDescription ? `Description du modèle : ${templateDescription}` : ''}
Pays cible : ${country ?? "Côte d'Ivoire"} — adapte lois, monnaie, institutions et usages à CE pays.
Type de document : ${famille.replace('_', ' ')}.

DONNÉES DU CLIENT :
${provided || '(le client n’a rien précisé — invente un cas professionnel réaliste et cohérent)'}

STRUCTURE ATTENDUE (minimum ${sectionsMin} sections, chacune de ${wordsPerSection} mots) :
${spec.structure.map((s, i) => `${i + 1}. ${s}`).join('\n')}
Tu peux ajouter des sections pertinentes pour ce modèle précis, jamais en retirer.

CONSIGNES SPÉCIFIQUES À CE TYPE DE DOCUMENT :
${spec.consignes}

${niveau !== 'standard' ? (() => {
    const sk = sectorKnowledge(category, niveau);
    return sk ? `CONNAISSANCES SECTORIELLES (niveau ${niveau} — intègre ces éléments concrets dans le document, adaptés au cas du client ; cite les textes et utilise les fourchettes chiffrées comme repères réalistes) :\n${sk}\n\n` : '';
  })() : ''}${structureHint ? `REPÈRES DU MODÈLE ORIGINAL (à enrichir, pas à recopier) :\n${structureHint}\n` : ''}
Retourne UNIQUEMENT ce JSON, sans aucun texte avant ou après :
{
  "schema": "${spec.schema}",
  "titre": "titre exact du document",${spec.avecParties ? `
  "parties": { "Partie 1 (rôle exact)": "identité complète", "Partie 2 (rôle exact)": "identité complète" },` : ''}
  "sections": [
    { "titre": "${spec.structure[0]}", "contenu": "texte développé de ${wordsPerSection} mots..." }
  ],${famille === 'contrat' || famille === 'statuts' ? `
  "clauses_speciales": ["clause complète 1", "clause complète 2"],` : ''}
  "date_creation": "date du jour en toutes lettres",
  "pays": "${country ?? "Côte d'Ivoire"}"
}`;
}

/* ══════════════════════════════════════════════════════════════════════════
   3. RENDU HTML — adapté à la famille (signatures seulement si pertinent)
   ══════════════════════════════════════════════════════════════════════════ */

function jsonToHtml(doc: DocJson, famille: Famille): string {
  const spec = FAMILLES[famille];

  const partyRows = doc.parties
    ? Object.entries(doc.parties).map(([k, v]) =>
        `<tr><td style="font-weight:600;padding:6px 16px 6px 0;vertical-align:top;white-space:nowrap">${k}&nbsp;:</td><td style="padding:6px 0">${v}</td></tr>`
      ).join('')
    : '';

  const sectionsHtml = doc.sections.map((s, i) => {
    const articles = s.articles
      ? s.articles.map(a =>
          `<h3 style="color:#1565C0;font-size:1rem;margin:18px 0 6px;font-weight:600">${a.titre}</h3><p style="text-align:justify;line-height:1.8;margin:0 0 12px">${a.texte}</p>`
        ).join('')
      : `<p style="text-align:justify;line-height:1.8;margin:0 0 12px;white-space:pre-wrap">${s.contenu}</p>`;

    // Sauts de page réservés aux documents longs de type contractuel
    const pageBreak = spec.avecParties && i > 0 && i % 4 === 0 ? ' page-break-before:always;' : '';
    return `<div style="${pageBreak}">
<h2 style="color:#0D2B4E;font-size:1.1rem;margin:28px 0 10px;border-bottom:2px solid #1565C0;padding-bottom:6px;font-weight:700">${s.titre}</h2>
${articles}
</div>`;
  }).join('');

  const clausesHtml = doc.clauses_speciales?.length
    ? `<div style="margin-top:32px;padding:20px;background:#f8f9ff;border-left:4px solid #1565C0;border-radius:4px">
<h2 style="color:#0D2B4E;font-size:1.1rem;margin:0 0 14px;font-weight:700">Clauses spéciales</h2>
<ol style="margin:0;padding-left:20px">${doc.clauses_speciales.map(c => `<li style="margin-bottom:10px;line-height:1.7;text-align:justify">${c}</li>`).join('')}</ol>
</div>`
    : '';

  // Bloc signatures multi-parties : contrats, statuts, PV uniquement.
  let signatureBlock = '';
  if (spec.avecParties) {
    const parties = doc.parties ? Object.entries(doc.parties).slice(0, 4) : [];
    signatureBlock = `
<div style="page-break-before:always;margin-top:0;padding-top:40px">
  <h2 style="color:#0D2B4E;font-size:1.1rem;font-weight:700;border-bottom:2px solid #1565C0;padding-bottom:6px;margin-bottom:32px">SIGNATURES DES PARTIES</h2>
  <p style="margin-bottom:32px;color:#555;font-size:.9rem">
    Fait à ${doc.pays}, le ${doc.date_creation}, en ${parties.length <= 1 ? 'deux' : parties.length} exemplaires originaux, dont un (1) pour chaque partie.
  </p>
  <div style="display:flex;flex-wrap:wrap;gap:48px;justify-content:space-between">
    ${parties.map(([k, v]) => `
    <div style="flex:1;min-width:220px;border:1px solid #ccc;border-radius:6px;padding:20px 20px 0 20px">
      <p style="font-weight:700;color:#0D2B4E;margin:0 0 4px;font-size:.95rem">${k}</p>
      <p style="color:#555;font-size:.85rem;margin:0 0 16px;line-height:1.4">${v}</p>
      <div style="background:#f9f9f9;border:1px dashed #aaa;border-radius:4px;height:100px;margin-bottom:16px"></div>
      <p style="font-size:.8rem;color:#777;margin:0 0 6px">Lu et approuvé — Bon pour accord</p>
      <div style="border-bottom:1px solid #333;margin-bottom:6px;height:60px"></div>
      <p style="font-size:.78rem;color:#999;margin:0 0 20px;text-align:center">Signature</p>
    </div>`).join('')}
  </div>
  <div style="margin-top:32px;padding:12px 16px;background:#f5f7ff;border-left:3px solid #1565C0;font-size:.8rem;color:#666">
    Le présent document est soumis aux dispositions applicables en ${doc.pays}.
    Toute modification doit faire l'objet d'un avenant signé par toutes les parties.
  </div>
</div>`;
  } else if (famille === 'lettre' || famille === 'attestation') {
    // Signature simple à droite pour lettres et attestations
    signatureBlock = `
<div style="margin-top:48px;display:flex;justify-content:flex-end">
  <div style="text-align:center;min-width:240px">
    <p style="color:#555;font-size:.9rem;margin:0 0 8px">Fait à ${doc.pays}, le ${doc.date_creation}</p>
    <div style="height:80px"></div>
    <div style="border-top:1px solid #333;padding-top:6px;font-size:.85rem;color:#555">Signature</div>
  </div>
</div>`;
  }

  const dateFooter = spec.avecParties
    ? ''
    : famille === 'lettre' || famille === 'attestation'
      ? '' // la date est déjà dans le bloc signature
      : `<div style="margin-top:40px;padding-top:16px;border-top:1px solid #ccc">
  <p style="text-align:center;color:#777;font-size:.85rem">${doc.pays} — ${doc.date_creation}</p>
</div>`;

  return `<div style="font-family:Georgia,'Times New Roman',serif;font-size:11pt;line-height:1.7;color:#1a1a1a">

<div style="text-align:center;margin-bottom:32px;padding:24px 0;border-bottom:3px double #0D2B4E">
  <h1 style="color:#0D2B4E;font-size:1.6rem;letter-spacing:.5px;margin:0 0 8px;text-transform:uppercase">${doc.titre}</h1>
  ${spec.avecParties ? `<p style="color:#555;font-size:.9rem;margin:0">Document établi conformément au droit applicable — ${doc.pays}</p>` : ''}
</div>

${partyRows && spec.avecParties ? `<div style="margin-bottom:28px;padding:16px;background:#f5f7ff;border-radius:6px;border:1px solid #dde3f5">
  <p style="font-weight:700;color:#0D2B4E;margin:0 0 10px;font-size:1rem">ENTRE LES SOUSSIGNÉS :</p>
  <table style="width:100%;font-size:.95rem;border-collapse:collapse">${partyRows}</table>
</div>` : ''}

${sectionsHtml}

${clausesHtml}

${dateFooter}

${signatureBlock}

</div>`;
}

/* ══════════════════════════════════════════════════════════════════════════
   4. GÉNÉRATION
   ══════════════════════════════════════════════════════════════════════════ */

export interface DocGenResult {
  html: string;
  json: DocJson;
  model: string;
  tokensIn: number;
  tokensOut: number;
  tokensCached: number;
  durationMs: number;
  /** Contrôle qualité post-génération (null si le QC a échoué — document livré tel quel) */
  qcScore: number | null;
  qcIssues: string[];
  qcCorrected: boolean;
}

/**
 * Tente de parser le JSON. Si tronqué (token limit atteinte), récupère les sections
 * complètes déjà produites plutôt que de tout rejeter.
 */
function parseOrRepair(raw: string): DocJson {
  try {
    return JSON.parse(raw);
  } catch {
    // Extraction des sections complètes par regex même si le JSON est coupé
    const titre = raw.match(/"titre"\s*:\s*"([^"]+)"/)?.[1] ?? 'Document';
    const pays = raw.match(/"pays"\s*:\s*"([^"]+)"/)?.[1] ?? "Côte d'Ivoire";
    const date = raw.match(/"date_creation"\s*:\s*"([^"]+)"/)?.[1] ?? new Date().toLocaleDateString('fr-FR');

    const partiesBlock = raw.match(/"parties"\s*:\s*\{([^}]+)\}/)?.[1] ?? '';
    const parties: Record<string, string> = {};
    const partyMatches = partiesBlock.matchAll(/"([^"]+)"\s*:\s*"([^"]+)"/g);
    for (const m of partyMatches) parties[m[1]] = m[2];

    const sections: DocSection[] = [];
    const sectionRe = /\{\s*"titre"\s*:\s*"([^"]+)"\s*,\s*"contenu"\s*:\s*"((?:[^"\\]|\\.)*)"\s*\}/g;
    let m;
    while ((m = sectionRe.exec(raw)) !== null) {
      sections.push({ titre: m[1], contenu: m[2].replace(/\\n/g, '\n') });
    }

    if (sections.length === 0) throw new Error('Aucune section récupérable');

    return { schema: 'document.v1', titre, parties: Object.keys(parties).length ? parties : undefined, sections, date_creation: date, pays };
  }
}

export async function generateDocumentJson(input: DocGenInput): Promise<DocGenResult | null> {
  const model = MODEL_BY_NIVEAU[input.niveau];
  const maxTokens = MAX_TOKENS[input.classe][input.niveau];
  const famille = detectFamille(input.templateName, input.category);
  const prompt = buildPrompt(input);
  const t0 = Date.now();

  try {
    const Anthropic = (await import('@anthropic-ai/sdk')).default;
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const res = await client.messages.create({
      model,
      max_tokens: maxTokens,
      system: [{ type: 'text', text: SYSTEM_PROMPT_JSON, cache_control: { type: 'ephemeral' } }],
      messages: [{ role: 'user', content: prompt }],
    });

    const raw = res.content[0]?.type === 'text' ? res.content[0].text.trim() : '';
    const clean = raw.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim();

    let doc: DocJson = parseOrRepair(clean);
    if (!doc.sections || !Array.isArray(doc.sections) || doc.sections.length === 0) throw new Error('JSON invalide: sections manquantes');

    // Contrôle qualité post-génération : relecture IA, correction des sections
    // défectueuses, score 0-100. Échec du QC = document original livré tel quel.
    let qcScore: number | null = null;
    let qcIssues: string[] = [];
    let qcCorrected = false;
    const qc = await reviewDocument(doc, input.country);
    if (qc) {
      qcScore = qc.score;
      qcIssues = qc.issues;
      qcCorrected = qc.corrected;
      if (qc.corrected) doc = qc.doc;
      if (qc.issues.length > 0) {
        console.log(`[QC] ${input.templateName} — score ${qc.score}/100, ${qc.issues.length} problème(s)${qc.corrected ? ', sections corrigées' : ''}:`, qc.issues.join(' | '));
      }
    }

    const usage = res.usage as { input_tokens: number; output_tokens: number; cache_read_input_tokens?: number };
    return {
      html: jsonToHtml(doc, famille),
      json: doc,
      model,
      tokensIn: (usage.input_tokens ?? 0) + (qc?.tokensIn ?? 0),
      tokensOut: (usage.output_tokens ?? 0) + (qc?.tokensOut ?? 0),
      tokensCached: usage.cache_read_input_tokens ?? 0,
      durationMs: Date.now() - t0,
      qcScore,
      qcIssues,
      qcCorrected,
    };
  } catch (err) {
    console.error('[DocGen v2] Erreur:', err);
    return null;
  }
}

export function buildPreviewHtml(doc: DocJson): string {
  const firstSection = doc.sections[0];
  const remaining = doc.sections.slice(1);

  const blurredSections = remaining.map(s =>
    `<h2 style="color:#0D2B4E;font-size:1.05rem;margin:18px 0 6px">${s.titre}</h2>
     <p style="filter:blur(5px);user-select:none;color:#555">
       ${s.contenu.slice(0, 120).replace(/./g, '●')} [contenu complet après paiement]
     </p>`
  ).join('');

  return `
<div style="font-family:Georgia,serif;line-height:1.65;max-width:800px;margin:0 auto">
  <h1 style="color:#0D2B4E;text-align:center;font-size:1.5rem;margin-bottom:16px">${doc.titre}</h1>
  <div style="background:#f0f7ff;border-left:4px solid #1565C0;padding:12px 16px;margin-bottom:20px;font-size:.9rem">
    📋 <strong>Plan du document (${doc.sections.length} sections) :</strong>
    ${doc.sections.map((s, i) => `${i + 1}. ${s.titre}`).join(' · ')}
  </div>
  <h2 style="color:#0D2B4E;font-size:1.05rem;margin:18px 0 6px">${firstSection.titre}</h2>
  <p style="text-align:justify;line-height:1.7">${firstSection.contenu}</p>
  ${blurredSections}
</div>`;
}
