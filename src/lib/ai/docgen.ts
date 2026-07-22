// Génération documentaire multi-provider — IBIG DocPro.
// Priorité : Groq (gratuit, Llama 70B) → Claude → OpenAI → fallback template.
// Configurable via AI_PROVIDER=groq|claude|openai dans .env

import type { TemplateField, Answers } from '@/lib/docgen';

// ─── Détection des providers disponibles ──────────────────────────────────────

function getProvider(): 'groq' | 'claude' | 'openai' | null {
  const forced = process.env.AI_PROVIDER?.toLowerCase();
  if (forced === 'claude' && process.env.ANTHROPIC_API_KEY) return 'claude';
  if (forced === 'openai' && process.env.OPENAI_API_KEY) return 'openai';
  if (forced === 'groq' && process.env.GROQ_API_KEY) return 'groq';
  // Auto-détection si pas de préférence
  if (process.env.GROQ_API_KEY) return 'groq';
  if (process.env.ANTHROPIC_API_KEY) return 'claude';
  if (process.env.OPENAI_API_KEY) return 'openai';
  return null;
}

export function isAiEnabled(): boolean {
  return getProvider() !== null;
}

// ─── Prompt système ────────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `Tu es un expert juridique et documentaire africain spécialisé dans la rédaction de documents professionnels pour la zone OHADA/UEMOA/CEMAC (Côte d'Ivoire, Sénégal, Cameroun, Bénin, Togo, Burkina Faso, Mali, Congo, Gabon, etc.).

Tu génères des documents HTML professionnels, complets et convaincants en français. Tes documents :
- Sont prêts à imprimer et à signer immédiatement
- Respectent le droit OHADA, le Code du travail, le Code de commerce et les lois locales
- Contiennent TOUTES les clauses standard attendues pour ce type de document
- Sont rédigés avec un style juridique professionnel, précis et sans ambiguïté
- Complètent intelligemment les informations manquantes (ex: si le nom n'est pas fourni, utilise "La Société" ou "Le Client")
- Utilisent les montants en FCFA, les références légales africaines
- Font minimum 600 mots de contenu réel développé

RÈGLES STRICTES :
- Retourne UNIQUEMENT le HTML du corps (pas de balises html/head/body/doctype)
- Utilise des styles CSS inline modernes : couleurs #0D2B4E (titres), #1565C0 (sous-titres), polices Arial/Calibri
- Structure : h1 pour le titre, h2 pour les articles/sections, tableaux pour les données, listes pour les obligations
- DÉVELOPPE chaque section : pas de titres vides, chaque article doit avoir un paragraphe complet
- N'utilise JAMAIS de lignes à remplir (___) : rédige le contenu complet
- Longueur minimale : 800 mots`;

// ─── Interface ─────────────────────────────────────────────────────────────────

export interface DocGenInput {
  templateName: string;
  templateDescription?: string;
  templateBody: string;
  fields: TemplateField[];
  answers: Answers;
  country?: string | null;
}

function buildUserPrompt(input: DocGenInput): string {
  const { templateName, templateDescription, fields, answers, country, templateBody } = input;

  const provided = fields
    .map((f) => {
      const val = (answers[f.key] ?? '').trim();
      return val ? `- ${f.label} : ${val}` : null;
    })
    .filter(Boolean)
    .join('\n');

  const structureHint = templateBody
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\{\{[^}]+\}\}/g, '[INFO CLIENT]')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 1000);

  return `Génère un document professionnel complet : **${templateName}**
${templateDescription ? `Type : ${templateDescription}` : ''}
Pays : ${country ?? "Côte d'Ivoire (zone OHADA)"}

**Données du client :**
${provided || '(Client n\'a pas fourni de détails — utilise des valeurs professionnelles standards)'}

**Structure de référence à respecter et enrichir :**
${structureHint}

Génère maintenant le document HTML complet, professionnel, avec toutes les clauses développées.`;
}

// ─── Providers ─────────────────────────────────────────────────────────────────

async function generateWithGroq(prompt: string): Promise<string | null> {
  const Groq = (await import('groq-sdk')).default;
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

  const res = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile', // gratuit, 70B params, excellent en français
    max_tokens: 4096,
    temperature: 0.3,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: prompt },
    ],
  });

  return res.choices[0]?.message?.content ?? null;
}

async function generateWithClaude(prompt: string): Promise<string | null> {
  const Anthropic = (await import('@anthropic-ai/sdk')).default;
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const res = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: prompt }],
  });

  const block = res.content[0];
  return block.type === 'text' ? block.text : null;
}

async function generateWithOpenAI(prompt: string): Promise<string | null> {
  // openai package optionnel — npm install openai si besoin.
  // serverExternalPackages dans next.config.mjs exclut ce module du bundle webpack.
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const mod = require('openai');
    const OpenAI = (mod as { default?: unknown }).default ?? mod;
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res: any = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      max_tokens: 4096,
      temperature: 0.3,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: prompt },
      ],
    });
    return res.choices?.[0]?.message?.content ?? null;
  } catch {
    console.error('[AI DocGen] openai non installé — npm install openai');
    return null;
  }
}

// ─── Fonction principale ───────────────────────────────────────────────────────

function cleanHtml(raw: string): string {
  return raw
    .trim()
    .replace(/^```html\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```\s*$/i, '')
    .trim();
}

export async function generateDocumentWithAI(input: DocGenInput): Promise<string | null> {
  const provider = getProvider();
  if (!provider) return null;

  const prompt = buildUserPrompt(input);

  try {
    let raw: string | null = null;

    if (provider === 'groq') raw = await generateWithGroq(prompt);
    else if (provider === 'claude') raw = await generateWithClaude(prompt);
    else if (provider === 'openai') raw = await generateWithOpenAI(prompt);

    return raw ? cleanHtml(raw) : null;
  } catch (err) {
    console.error(`[AI DocGen] Erreur provider ${provider}:`, err);
    return null;
  }
}
