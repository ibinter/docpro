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

const SYSTEM_PROMPT_JSON = `Tu es un expert juridique africain OHADA/UEMOA/CEMAC spécialisé dans la rédaction de documents professionnels longs et complets.
Tu génères des documents en JSON STRICT et UNIQUEMENT du JSON.

RÈGLES ABSOLUES:
- Réponds avec du JSON valide UNIQUEMENT. Aucun texte avant ou après.
- Respecte exactement le schéma fourni.
- La longueur du document doit être ADAPTÉE AU TYPE DE DOCUMENT : un contrat de bail peut faire 8-15 pages, un contrat de travail 5-10 pages, une lettre officielle 1-2 pages, un statut de société 15-25 pages. PAS DE LIMITE SUPÉRIEURE.
- Chaque section doit être rédigée avec un contenu COMPLET, DÉTAILLÉ et PROFESSIONNEL (200-500 mots par section pour les documents juridiques).
- N'utilise JAMAIS de lignes à remplir (___) ou de placeholders vides. Rédige le contenu intégral.
- Utilise les montants en FCFA et les références légales africaines (OHADA, UEMOA, droit local).
- Inclus les articles, alinéas, sous-sections et clauses détaillées appropriés au type de document.
- Complète intelligemment les données manquantes avec des valeurs professionnelles réalistes.
- Pour les contrats et actes juridiques : inclus les préambules, les définitions, toutes les clauses obligatoires et les dispositions finales.`;

function buildPrompt(input: DocGenInput): string {
  const { templateName, fields, answers, country, niveau } = input;

  const provided = fields
    .map(f => {
      const v = (answers[f.key] ?? '').trim();
      return v ? `${f.label}: ${v}` : null;
    })
    .filter(Boolean).join('\n');

  const niveauDesc = {
    standard: 'complet, conforme au droit, bien structuré',
    pro: 'personnalisé secteur + références jurisprudentielles, très détaillé',
    expert: 'exhaustif, personnalisé marché local + chiffres + jurisprudence récente, qualité notariale',
  }[niveau];

  const sectionsMin = {
    standard: 8,
    pro: 12,
    expert: 18,
  }[niveau];

  return `Génère un document complet "${templateName}" (niveau: ${niveau} — ${niveauDesc}).
Pays: ${country ?? "Côte d'Ivoire (OHADA)"}.

Données client:
${provided || '(utilise des valeurs professionnelles standards)'}

INSTRUCTIONS DE LONGUEUR:
- Génère AUTANT DE SECTIONS QUE NÉCESSAIRE pour un document professionnel complet (minimum ${sectionsMin} sections).
- Chaque section doit contenir 200 à 500 mots de contenu réel, complet et détaillé.
- Un contrat doit couvrir : préambule, définitions, objet, durée, obligations des parties, conditions financières, garanties, résiliation, litiges, dispositions finales, et toutes clauses spécifiques au type de contrat.
- Ne tronque JAMAIS le contenu. Si le document nécessite 20 sections pour être complet, génères-en 20.

Retourne ce JSON et rien d'autre:
{
  "schema": "document.v1",
  "titre": "...",
  "parties": { "Bailleur": "...", "Preneur": "..." },
  "sections": [
    { "titre": "Préambule", "contenu": "texte complet 200+ mots..." },
    { "titre": "Article 1 — Objet du contrat", "contenu": "texte complet 200+ mots..." },
    { "titre": "Article 2 — ...", "contenu": "texte complet 200+ mots..." }
  ],
  "clauses_speciales": ["clause détaillée 1", "clause détaillée 2"],
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

  const signatureBlock = `
<div style="margin-top:60px;display:flex;justify-content:space-between;gap:40px">
  ${doc.parties ? Object.entries(doc.parties).slice(0, 3).map(([k]) =>
    `<div style="flex:1;text-align:center">
      <p style="font-weight:600;margin-bottom:60px">${k}</p>
      <p style="border-top:1px solid #333;padding-top:6px;font-size:.85rem;color:#555">Signature et cachet</p>
    </div>`
  ).join('') : ''}
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
