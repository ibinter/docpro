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

const SYSTEM_PROMPT_JSON = `Tu es un expert juridique africain OHADA/UEMOA/CEMAC.
Tu génères des documents professionnels en JSON STRICT et UNIQUEMENT du JSON.

RÈGLES ABSOLUES:
- Réponds avec du JSON valide UNIQUEMENT. Aucun texte avant ou après.
- Respecte exactement le schéma fourni.
- Chaque section doit avoir un contenu complet (minimum 80 mots par section).
- N'utilise JAMAIS de lignes à remplir (___). Rédige le contenu complet.
- Utilise les montants en FCFA et les références légales africaines.
- Complète intelligemment les données manquantes avec des valeurs professionnelles.`;

function buildPrompt(input: DocGenInput): string {
  const { templateName, fields, answers, country, niveau } = input;

  const provided = fields
    .map(f => {
      const v = (answers[f.key] ?? '').trim();
      return v ? `${f.label}: ${v}` : null;
    })
    .filter(Boolean).join('\n');

  const niveauDesc = {
    standard: 'générique, complet, conforme au droit',
    pro: 'personnalisé secteur + poste, références jurisprudentielles',
    expert: 'personnalisé secteur + marché local + chiffres + jurisprudence récente',
  }[niveau];

  return `Génère un "${templateName}" (niveau: ${niveau} — ${niveauDesc}).
Pays: ${country ?? "Côte d'Ivoire (OHADA)"}.

Données client:
${provided || '(utilise des valeurs professionnelles standards)'}

Retourne ce JSON et rien d'autre:
{
  "schema": "document.v1",
  "titre": "...",
  "parties": { "cle": "valeur" },
  "sections": [
    { "titre": "Article 1 — ...", "contenu": "texte complet minimum 80 mots..." },
    { "titre": "Article 2 — ...", "contenu": "..." }
  ],
  "clauses_speciales": ["clause 1", "clause 2"],
  "date_creation": "...",
  "pays": "..."
}

Minimum 6 sections pour un document complet.`;
}

function jsonToHtml(doc: DocJson): string {
  const partyRows = doc.parties
    ? Object.entries(doc.parties).map(([k, v]) =>
        `<tr><td style="font-weight:600;padding:4px 12px 4px 0">${k}</td><td>${v}</td></tr>`
      ).join('')
    : '';

  const sectionsHtml = doc.sections.map(s => {
    const articles = s.articles
      ? s.articles.map(a => `<h3 style="color:#1565C0;font-size:.95rem;margin:14px 0 4px">${a.titre}</h3><p>${a.texte}</p>`).join('')
      : `<p style="text-align:justify;line-height:1.7">${s.contenu}</p>`;
    return `<h2 style="color:#0D2B4E;font-size:1.05rem;margin:22px 0 8px;border-bottom:1px solid #e0e0e0;padding-bottom:4px">${s.titre}</h2>${articles}`;
  }).join('');

  const clausesHtml = doc.clauses_speciales?.length
    ? `<h2 style="color:#0D2B4E;font-size:1.05rem;margin:22px 0 8px">Clauses spéciales</h2><ul>${doc.clauses_speciales.map(c => `<li style="margin-bottom:6px">${c}</li>`).join('')}</ul>`
    : '';

  return `
<div style="font-family:Georgia,'Times New Roman',serif;line-height:1.65;max-width:800px;margin:0 auto">
  <h1 style="color:#0D2B4E;text-align:center;font-size:1.5rem;letter-spacing:.5px;margin-bottom:16px">${doc.titre}</h1>
  ${partyRows ? `<table style="width:100%;margin-bottom:20px;font-size:.95rem">${partyRows}</table>` : ''}
  ${sectionsHtml}
  ${clausesHtml}
  <p style="margin-top:40px;font-size:.85rem;color:#757575;text-align:right">
    Fait à ${doc.pays}, le ${doc.date_creation}
  </p>
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

    const doc: DocJson = JSON.parse(clean);
    if (!doc.sections || !Array.isArray(doc.sections)) throw new Error('JSON invalide: sections manquantes');

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
