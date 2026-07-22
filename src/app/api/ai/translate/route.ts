// POST /api/ai/translate — traduction simultanée (CDC §6.2).
// Body : { documentId: string, languages: string[] }  (en | es | pt | ar)
// Pour chaque langue : crée un NOUVEAU GeneratedDocument lié (titre suffixé
// « (EN) », answersJson traduit + _parentId, contentHtml traduit par Claude).
// Les traductions d'un document payé héritent paid=true (payé une seule fois).
// Sans IA : aucune création — message « traduction indisponible sans IA ».
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';
import { splitAnswersJson, type Answers } from '@/lib/docgen';
import { aiAvailable, askClaude, extractJsonObject } from '@/lib/ai/client';

const LANGUAGES: Record<string, { name: string; suffix: string }> = {
  en: { name: 'anglais', suffix: 'EN' },
  es: { name: 'espagnol', suffix: 'ES' },
  pt: { name: 'portugais', suffix: 'PT' },
  ar: { name: 'arabe', suffix: 'AR' },
};

export async function POST(req: NextRequest) {
  let body: { documentId?: string; languages?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Corps de requête invalide.' }, { status: 400 });
  }
  if (!body.documentId || typeof body.documentId !== 'string') {
    return NextResponse.json({ error: 'Paramètre documentId manquant.' }, { status: 400 });
  }
  const languages = Array.isArray(body.languages)
    ? body.languages.filter((l): l is string => typeof l === 'string' && l in LANGUAGES)
    : [];
  if (languages.length === 0) {
    return NextResponse.json(
      { error: 'Choisissez au moins une langue (anglais, espagnol, portugais ou arabe).' },
      { status: 400 }
    );
  }

  if (!aiAvailable()) {
    return NextResponse.json(
      { error: "Traduction indisponible sans IA : la clé API n'est pas configurée sur cette installation." },
      { status: 503 }
    );
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

  const { answers, meta } = splitAnswersJson(doc.answersJson);
  // On traduit toujours depuis le document source, jamais depuis une traduction.
  const parentId = typeof meta._parentId === 'string' ? null : doc.id;
  if (!parentId) {
    return NextResponse.json(
      { error: 'Lancez la traduction depuis le document original, pas depuis une traduction.' },
      { status: 400 }
    );
  }

  const created: { id: string; language: string; title: string }[] = [];
  const errors: string[] = [];

  for (const lang of [...new Set(languages)]) {
    const { name, suffix } = LANGUAGES[lang];

    // Une seule traduction par langue et par document.
    const already = await prisma.generatedDocument.findFirst({
      where: {
        language: lang,
        answersJson: { contains: `"_parentId":"${doc.id}"` },
      },
      select: { id: true, title: true },
    });
    if (already) {
      created.push({ id: already.id, language: lang, title: already.title });
      continue;
    }

    const system = [
      `Tu es un traducteur professionnel. Traduis le document suivant du français vers ${name} (${lang}).`,
      "Le HTML doit conserver EXACTEMENT la même structure (mêmes balises, mêmes attributs, même ordre) — traduis uniquement les textes visibles.",
      'Ne traduis pas les noms propres, adresses email, numéros de téléphone, montants ni dates chiffrées.',
      'Traduis aussi les réponses du questionnaire fournies dans "answers" (mêmes clés, valeurs traduites ; laisse intactes les valeurs factuelles : emails, téléphones, dates au format AAAA-MM-JJ).',
      'Réponds UNIQUEMENT avec un objet JSON strict : {"answers": {…}, "html": "…"} — aucune autre sortie.',
    ].join('\n');

    const userMsg = JSON.stringify({ answers, html: doc.contentHtml });

    const raw = await askClaude(system, userMsg, 8000);
    const parsed = extractJsonObject<{ answers?: Record<string, unknown>; html?: unknown }>(raw);
    const html = typeof parsed?.html === 'string' ? parsed.html.trim() : '';
    if (!parsed || !html) {
      errors.push(`La traduction en ${name} a échoué — réessayez dans un instant.`);
      continue;
    }

    const translatedAnswers: Answers = {};
    if (parsed.answers && typeof parsed.answers === 'object' && !Array.isArray(parsed.answers)) {
      for (const [k, v] of Object.entries(parsed.answers)) {
        if (typeof v === 'string' && k in answers) translatedAnswers[k] = v.slice(0, 5000);
      }
    }
    // Clés manquantes → valeurs d'origine (sécurité).
    for (const [k, v] of Object.entries(answers)) {
      if (!(k in translatedAnswers)) translatedAnswers[k] = v;
    }

    const translated = await prisma.generatedDocument.create({
      data: {
        userId: doc.userId,
        templateId: doc.templateId,
        title: `${doc.title} (${suffix})`,
        answersJson: JSON.stringify({ ...translatedAnswers, _parentId: doc.id }),
        contentHtml: html,
        language: lang,
        country: doc.country,
        qualityScore: doc.qualityScore,
        // CDC §6.2 : « en une seule opération » → le paiement couvre les versions.
        status: doc.paid ? 'paye' : 'apercu',
        paid: doc.paid,
        price: doc.price,
        currency: doc.currency,
      },
    });
    created.push({ id: translated.id, language: lang, title: translated.title });
  }

  if (created.length === 0) {
    return NextResponse.json(
      { error: errors.join(' ') || 'Aucune traduction n\'a pu être générée.' },
      { status: 502 }
    );
  }
  return NextResponse.json({ created, errors });
}
