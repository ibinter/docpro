// Architecture v2 — IA → JSON → rendu HTML par notre code (CDC §1-3)
import type { TemplateField, Answers } from '@/lib/docgen';
import { MODEL_BY_NIVEAU, MAX_TOKENS, type Classe, type Niveau } from '@/lib/pricing';

export interface DocGenInput {
  templateName: string;
  templateDescription?: string;
  templateBody: string;
  fields: TemplateField[];
  answers: Answers;
  country?: string | null;
  classe: Classe;
  niveau: Niveau;
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

const SYSTEM_PROMPT_JSON = `Tu es un expert juridique africain OHADA/UEMOA/CEMAC de niveau notarial.
Tu génères des documents en JSON STRICT. Réponds UNIQUEMENT avec du JSON valide, sans aucun texte avant ou après.

RÈGLES ABSOLUES :
- JSON valide uniquement. Zéro texte hors JSON.
- Respecte STRICTEMENT le nombre de mots demandé par section — ni plus, ni moins.
- N'utilise JAMAIS de blancs (___) ni placeholders. Valeurs réalistes partout.
- COHÉRENCE DES DATES : date de fin = date de début + durée. Premier versement = date de signature + fréquence. Zéro contradiction entre articles.
- ORTHOGRAPHE ABSOLUE : "Preneur" (jamais "Prenier"), "Bailleur", "emphytéotique". Zéro coquille.
- RÉFÉRENCES LÉGALES CI — FONCIER URBAIN :
  * Décret n°99-594 du 13/10/1999 + décret n°71-74 du 16/02/1971
  * La loi n°98-750 = domaine RURAL — NE JAMAIS citer pour l'urbain
  * Sûretés : AUS OHADA 15/12/2010
  * Droits d'enregistrement : CGI art. 708 ss. (3% valeur capitalisée)
- BAIL EMPHYTÉOTIQUE CI : acte notarié obligatoire ; enregistrement Conservation Foncière dans 3 mois.
- CESSION : une seule position cohérente (autorisée avec accord OU interdite) — zéro contradiction interne.
- Inclus : RCCM/CNI/NIU réalistes (CI-ABJ-2019-B-12345), force majeure, arbitrage CCJA.`;

function buildPrompt(input: DocGenInput): string {
  const { templateName, fields, answers, country, niveau } = input;

  const provided = fields
    .map(f => {
      const v = (answers[f.key] ?? '').trim();
      return v ? `${f.label}: ${v}` : null;
    })
    .filter(Boolean).join('\n');

  // Haiku (standard) : budget 7000 tokens. 60-80 mots × 10 sections ≈ 1500 tokens → safe.
  // Sonnet/Opus ont 20k-64k tokens, peuvent générer des documents très denses.
  const wordsPerSection = niveau === 'standard' ? '60 à 80' : niveau === 'pro' ? '200 à 350' : '300 à 500';
  const sectionsMin = niveau === 'standard' ? 10 : niveau === 'pro' ? 14 : 20;
  const niveauDesc = {
    standard: 'complet et conforme, toutes clauses obligatoires présentes, langage juridique précis',
    pro: 'personnalisé secteur + références jurisprudentielles, très détaillé avec sous-articles',
    expert: 'exhaustif, qualité notariale, jurisprudence récente, chiffres de marché local',
  }[niveau];

  return `Génère un "${templateName}" juridiquement complet (niveau: ${niveau} — ${niveauDesc}).
Pays: ${country ?? "Côte d'Ivoire (OHADA)"}.

Données client:
${provided || '(utilise des valeurs professionnelles standards)'}

RÈGLES IMPÉRATIVES:
1. COMPLÉTUDE ABSOLUE : génère les ${sectionsMin} sections minimum. Chaque section = ${wordsPerSection} mots. JAMAIS de sections vides.
2. SECTIONS OBLIGATOIRES (${sectionsMin} minimum) pour un bail emphytéotique :
   Préambule → Définitions → Objet/Description du bien → Durée → Canon → Droits du preneur → Obligations → Résiliation → Sort des constructions → Litiges/Arbitrage CCJA → Dispositions finales${niveau !== 'standard' ? '\n   (Pro/Expert : ajouter aussi Garanties/Sûretés, Améliorations, Assurance, Enregistrement foncier, Force majeure, Cession)' : ''}
3. RÉFÉRENCES LÉGALES EXACTES FONCIER URBAIN CI : décret n°99-594 du 13/10/1999, décret n°71-74 du 16/02/1971, AUS OHADA 15/12/2010 pour sûretés, CGI art. 708 ss. pour droits d'enregistrement. La loi 98-750 est RURALE — ne pas la citer ici.
4. Numéros RCCM, CNI, NIU : génère des numéros réalistes formatés (ex: CI-ABJ-2019-B-12345).
5. TERMINE le JSON complètement. Ne coupe jamais une section à mi-phrase.

Retourne UNIQUEMENT ce JSON, sans aucun texte avant ou après :
{
  "schema": "document.v1",
  "titre": "...",
  "parties": { "Bailleur": "...", "Preneur": "..." },
  "sections": [
    { "titre": "Préambule", "contenu": "texte ${wordsPerSection} mots..." },
    { "titre": "Article 1 — Définitions", "contenu": "..." },
    { "titre": "Article 2 — Objet et description du bien loué", "contenu": "..." }
  ],
  "clauses_speciales": ["clause 1 complète", "clause 2 complète"],
  "date_creation": "...",
  "pays": "..."
}`;
}

function jsonToHtml(doc: DocJson): string {
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

    // Saut de page avant chaque section (sauf la première) pour impression/PDF
    const pageBreak = i > 0 && i % 4 === 0 ? ' page-break-before:always;' : '';
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

  const parties = doc.parties ? Object.entries(doc.parties).slice(0, 4) : [];
  const signatureBlock = `
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
    Le présent contrat est soumis aux dispositions de l'Acte Uniforme OHADA et du droit applicable en ${doc.pays}.
    Toute modification doit faire l'objet d'un avenant signé par toutes les parties.
  </div>
</div>`;

  return `<div style="font-family:Georgia,'Times New Roman',serif;font-size:11pt;line-height:1.7;color:#1a1a1a">

<div style="text-align:center;margin-bottom:32px;padding:24px 0;border-bottom:3px double #0D2B4E">
  <h1 style="color:#0D2B4E;font-size:1.6rem;letter-spacing:.5px;margin:0 0 8px;text-transform:uppercase">${doc.titre}</h1>
  <p style="color:#555;font-size:.9rem;margin:0">Document établi conformément au droit ${doc.pays}</p>
</div>

${partyRows ? `<div style="margin-bottom:28px;padding:16px;background:#f5f7ff;border-radius:6px;border:1px solid #dde3f5">
  <p style="font-weight:700;color:#0D2B4E;margin:0 0 10px;font-size:1rem">ENTRE LES SOUSSIGNÉS :</p>
  <table style="width:100%;font-size:.95rem;border-collapse:collapse">${partyRows}</table>
</div>` : ''}

${sectionsHtml}

${clausesHtml}

<div style="margin-top:40px;padding-top:20px;border-top:1px solid #ccc">
  <p style="text-align:center;color:#555;font-size:.9rem">
    Fait à ${doc.pays}, le ${doc.date_creation}<br/>
    En autant d'exemplaires originaux que de parties signataires.
  </p>
</div>

${signatureBlock}

</div>`;
}

export interface DocGenResult {
  html: string;
  json: DocJson;
  model: string;
  tokensIn: number;
  tokensOut: number;
  tokensCached: number;
  durationMs: number;
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

    // Extraire les paires clé/valeur des parties
    const partiesBlock = raw.match(/"parties"\s*:\s*\{([^}]+)\}/)?.[1] ?? '';
    const parties: Record<string, string> = {};
    const partyMatches = partiesBlock.matchAll(/"([^"]+)"\s*:\s*"([^"]+)"/g);
    for (const m of partyMatches) parties[m[1]] = m[2];

    // Extraire les sections complètes (titre + contenu terminé par un guillemet fermant)
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

    const doc: DocJson = parseOrRepair(clean);
    if (!doc.sections || !Array.isArray(doc.sections) || doc.sections.length === 0) throw new Error('JSON invalide: sections manquantes');

    const usage = res.usage as { input_tokens: number; output_tokens: number; cache_read_input_tokens?: number };
    return {
      html: jsonToHtml(doc),
      json: doc,
      model,
      tokensIn: usage.input_tokens ?? 0,
      tokensOut: usage.output_tokens ?? 0,
      tokensCached: usage.cache_read_input_tokens ?? 0,
      durationMs: Date.now() - t0,
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
