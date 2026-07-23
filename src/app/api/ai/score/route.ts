// POST /api/ai/score — score qualité enrichi (CDC §6.2 « Score de Qualité IA »).
// Body : { documentId: string }
// Si l'IA est disponible : Claude renvoie {score: 0-100, suggestions: [3-5]}
// (parse robuste). Sinon (ou en cas de panne) : fallback sur le score
// heuristique existant + suggestions heuristiques.
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';
import {
  parseFields,
  computeQualityScore,
  heuristicSuggestions,
  splitAnswersJson,
} from '@/lib/docgen';
import { aiAvailable, askClaude, extractJsonObject } from '@/lib/ai/client';
import { countryName, legalContextFr } from '@/lib/ai/countries';

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export async function POST(req: NextRequest) {
  let body: { documentId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Corps de requête invalide.' }, { status: 400 });
  }
  if (!body.documentId || typeof body.documentId !== 'string') {
    return NextResponse.json({ error: 'Paramètre documentId manquant.' }, { status: 400 });
  }

  const doc = await prisma.generatedDocument.findUnique({
    where: { id: body.documentId },
    include: { template: true },
  });
  if (!doc) return NextResponse.json({ error: 'Document introuvable.' }, { status: 404 });

  const user = await getSessionUser();
  if (doc.userId && doc.userId !== user?.id) {
    return NextResponse.json({ error: 'Accès refusé.' }, { status: 403 });
  }

  const fields = parseFields(doc.template.fieldsJson);
  const { answers } = splitAnswersJson(doc.answersJson);

  // ── Fallback heuristique (toujours calculable) ─────────────
  const heuristicScore = computeQualityScore(fields, answers);
  const fallback = {
    score: heuristicScore,
    suggestions: heuristicSuggestions(fields, answers),
    ai: false,
  };

  if (!aiAvailable()) {
    // Sans IA on n'écrase pas le score existant (déjà heuristique).
    return NextResponse.json(fallback);
  }

  const system = [
    "Tu es un évaluateur expert de documents juridiques et professionnels africains (contrats OHADA/UEMOA, CV, lettres, factures…).",
    "Évalue la qualité du document sur : complétude juridique, références légales exactes, cohérence interne, langue notariale, clauses obligatoires (résiliation, litiges, force majeure).",
    "Pour les contrats ivoiriens : vérifier décret 99-594 (foncier urbain), AUS OHADA 2010, CGI art. 708, CCJA pour arbitrage. La loi 98-750 concerne le foncier RURAL, ne pas la confondre avec l'urbain.",
    "Un contrat complet avec 10+ articles bien rédigés mérite 75-90/100. Réserver 90-100 aux documents sans aucune lacune.",
    legalContextFr(doc.country),
    'Réponds UNIQUEMENT avec un objet JSON strict : {"score": <entier 0-100>, "suggestions": ["…", "…", "…"]} avec 3 à 5 suggestions concrètes et actionnables, rédigées en français.',
  ]
    .filter(Boolean)
    .join('\n');

  // Utiliser contentJson (texte brut, compact) — toujours le document COMPLET.
  // Fallback : HTML strippé sans limite (le modèle gère des inputs larges).
  let contenu: string;
  if (doc.contentJson) {
    try {
      const parsed = JSON.parse(doc.contentJson) as { sections?: Array<{ titre?: string; contenu?: string }> };
      const sections = parsed.sections ?? [];
      contenu = sections.map((s) => `## ${s.titre ?? ''}\n${s.contenu ?? ''}`).join('\n\n');
    } catch {
      contenu = stripHtml(doc.contentHtml);
    }
  } else {
    // Pas de contentJson → utiliser le HTML complet strippé (pas de troncature)
    contenu = stripHtml(doc.contentHtml);
  }

  const userMsg = JSON.stringify({
    type_de_document: doc.template.name,
    pays: countryName(doc.country),
    contenu: contenu.slice(0, 40000),
  });

  const raw = await askClaude(system, userMsg, 1200);
  const parsed = extractJsonObject<{ score?: unknown; suggestions?: unknown }>(raw);

  let score = Number(parsed?.score);
  const rawSuggestions = parsed?.suggestions;
  const suggestions = Array.isArray(rawSuggestions)
    ? rawSuggestions.filter((s): s is string => typeof s === 'string' && s.trim().length > 0).slice(0, 5)
    : [];

  if (!Number.isFinite(score) || suggestions.length === 0) {
    // Panne ou réponse inexploitable → fallback heuristique silencieux.
    return NextResponse.json(fallback);
  }
  score = Math.max(0, Math.min(100, Math.round(score)));

  await prisma.generatedDocument.update({
    where: { id: doc.id },
    data: { qualityScore: score },
  });

  return NextResponse.json({ score, suggestions, ai: true });
}
