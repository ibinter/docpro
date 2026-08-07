// Contrôle qualité post-génération — relecture IA du document avant livraison.
// Un passage Haiku (rapide, ~1-2 s) audite le JSON généré : placeholders oubliés,
// incohérences de dates/montants, sections trop courtes, références légales d'un
// autre pays, fautes. Les sections défectueuses sont corrigées, un score 0-100
// est retourné. En cas d'échec du QC, le document original est livré tel quel.
import type { DocJson } from './docgen-v2';

const QC_MODEL = 'claude-haiku-4-5-20251001';
const QC_MAX_TOKENS = 4000;

export interface QcResult {
  score: number;            // 0-100
  issues: string[];         // problèmes détectés (journalisés, non montrés au client)
  doc: DocJson;             // document éventuellement corrigé
  corrected: boolean;       // des sections ont-elles été réécrites ?
  durationMs: number;
  tokensIn: number;
  tokensOut: number;
}

const QC_SYSTEM = `Tu es un relecteur professionnel de documents d'affaires et juridiques pour l'Afrique francophone (OHADA/UEMOA/CEMAC).
On te donne un document en JSON. Tu l'audites et tu réponds en JSON STRICT, sans aucun texte hors JSON.

POINTS DE CONTRÔLE :
1. PLACEHOLDERS : blancs (___), [À compléter], XXX, "à définir", crochets vides — interdits.
2. COHÉRENCE : dates (fin = début + durée), montants (totaux = somme des lignes, TVA exacte), noms et rôles identiques partout.
3. RÉFÉRENCES LÉGALES : lois, codes et institutions du PAYS INDIQUÉ uniquement. Une loi française ou d'un autre pays africain dans un document ivoirien est une erreur.
4. COMPLÉTUDE : aucune section quasi vide (< 40 mots), aucun titre sans contenu.
5. LANGUE : orthographe, grammaire, typographie française.

RÉPONSE (JSON strict) :
{
  "score": 0-100,
  "issues": ["description courte de chaque problème trouvé"],
  "corrections": [
    { "index": <numéro de section, base 0>, "contenu": "texte intégral corrigé de la section" }
  ]
}
RÈGLES DE CORRECTION :
- Ne corrige QUE les sections réellement défectueuses (max 5). Recopie leur texte intégral corrigé.
- Ne raccourcis jamais une section : corrige en conservant ou enrichissant le contenu.
- Si le document est bon, "corrections": [] et score >= 85.
- "issues": [] si aucun problème.`;

function clamp(n: unknown, min: number, max: number, fallback: number): number {
  const v = typeof n === 'number' && Number.isFinite(n) ? n : fallback;
  return Math.max(min, Math.min(max, Math.round(v)));
}

export async function reviewDocument(doc: DocJson, country: string | null | undefined): Promise<QcResult | null> {
  if (!process.env.ANTHROPIC_API_KEY) return null;
  const t0 = Date.now();

  // Payload compact : titres + contenus (les articles imbriqués sont aplatis dans contenu à la génération)
  const payload = {
    pays: country ?? doc.pays,
    titre: doc.titre,
    parties: doc.parties,
    sections: doc.sections.map((s, i) => ({ index: i, titre: s.titre, contenu: s.contenu })),
    clauses_speciales: doc.clauses_speciales,
  };

  try {
    const Anthropic = (await import('@anthropic-ai/sdk')).default;
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const res = await client.messages.create({
      model: QC_MODEL,
      max_tokens: QC_MAX_TOKENS,
      system: [{ type: 'text', text: QC_SYSTEM, cache_control: { type: 'ephemeral' } }],
      messages: [{
        role: 'user',
        content: `Pays du document : ${payload.pays}\n\nAudite ce document et réponds au format demandé :\n${JSON.stringify(payload)}`,
      }],
    });

    const raw = res.content[0]?.type === 'text' ? res.content[0].text.trim() : '';
    const clean = raw.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim();

    const verdict = JSON.parse(clean) as {
      score?: number;
      issues?: unknown[];
      corrections?: { index?: number; contenu?: string }[];
    };

    // Application des corrections valides
    let corrected = false;
    const sections = doc.sections.map(s => ({ ...s }));
    for (const c of verdict.corrections ?? []) {
      const i = typeof c.index === 'number' ? c.index : -1;
      const texte = typeof c.contenu === 'string' ? c.contenu.trim() : '';
      // Garde-fou : jamais remplacer par un texte 2× plus court (le QC ne doit pas appauvrir)
      if (i >= 0 && i < sections.length && texte.length >= sections[i].contenu.length / 2) {
        sections[i] = { ...sections[i], contenu: texte, articles: undefined };
        corrected = true;
      }
    }

    const usage = res.usage as { input_tokens: number; output_tokens: number };
    return {
      score: clamp(verdict.score, 0, 100, 75),
      issues: (verdict.issues ?? []).filter((x): x is string => typeof x === 'string').slice(0, 20),
      doc: { ...doc, sections },
      corrected,
      durationMs: Date.now() - t0,
      tokensIn: usage.input_tokens ?? 0,
      tokensOut: usage.output_tokens ?? 0,
    };
  } catch (err) {
    console.error('[QC] Échec du contrôle qualité (document livré sans correction):', err);
    return null;
  }
}
