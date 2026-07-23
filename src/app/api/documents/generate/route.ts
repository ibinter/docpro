// POST /api/documents/generate — génère un document depuis un template.
// Body : { code, answers, documentId?, country?, niveau? }
// Priorité : Claude v2 (JSON→HTML) → Groq v1 (HTML) → renderTemplate (fallback)
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';
import { parseFields, renderTemplate, computeQualityScore, type Answers } from '@/lib/docgen';
import { normalizeCountry } from '@/lib/ai/countries';
import { generateDocumentWithAI, isAiEnabled } from '@/lib/ai/docgen';
import { generateDocumentJson } from '@/lib/ai/docgen-v2';
import { DEFAULT_PRICE_GRID, getPrice, type Classe, type Niveau } from '@/lib/pricing';

const VALID_NIVEAUX: Niveau[] = ['standard', 'pro', 'expert'];
const VALID_CLASSES: Classe[] = ['A', 'B', 'C'];

const genRateLimit = new Map()
function checkRateLimit(key: string, max: number): boolean {
  const now = Date.now()
  const entry = genRateLimit.get(key)
  if (!entry || entry.reset < now) { genRateLimit.set(key, {count: 1, reset: now + 3600000}); return true }
  if (entry.count >= max) return false
  entry.count++; return true
}

export async function POST(req: NextRequest) {
  let body: {
    code?: string;
    answers?: unknown;
    documentId?: string | null;
    country?: unknown;
    niveau?: unknown;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Corps de requête invalide.' }, { status: 400 });
  }

  const code = typeof body.code === 'string' ? body.code : '';
  const rawAnswers = body.answers;
  if (!code || typeof rawAnswers !== 'object' || rawAnswers === null || Array.isArray(rawAnswers)) {
    return NextResponse.json({ error: 'Paramètres manquants (code, answers).' }, { status: 400 });
  }

  const niveau: Niveau =
    typeof body.niveau === 'string' && VALID_NIVEAUX.includes(body.niveau as Niveau)
      ? (body.niveau as Niveau)
      : 'standard';

  const template = await prisma.documentTemplate.findUnique({ where: { code } });
  if (!template || !template.active) {
    return NextResponse.json({ error: 'Modèle de document introuvable.' }, { status: 404 });
  }

  const classe: Classe = VALID_CLASSES.includes((template.classe ?? '') as Classe)
    ? (template.classe as Classe)
    : 'B';

  const fields = parseFields(template.fieldsJson);

  const answers: Answers = {};
  for (const f of fields) {
    const v = (rawAnswers as Record<string, unknown>)[f.key];
    if (typeof v === 'string') answers[f.key] = v.slice(0, 5000);
  }

  for (const f of fields) {
    if (f.required && !String(answers[f.key] ?? '').trim()) {
      return NextResponse.json({ error: `Le champ « ${f.label} » est obligatoire.` }, { status: 400 });
    }
  }

  const user = await getSessionUser();

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown'
  const rlKey = user ? 'u:' + user.id : 'ip:' + ip
  if (!checkRateLimit(rlKey, user ? 20 : 5)) return NextResponse.json({ error: 'Trop de generations. Reessayez dans une heure.' }, { status: 429 })

  if ((niveau === 'pro' || niveau === 'expert') && !user) {
    return NextResponse.json({ error: 'Connexion requise pour les niveaux pro et expert.' }, { status: 401 })
  }
  const country = normalizeCountry(body.country) ?? user?.country ?? null;
  const isExcel = template.templateType === 'excel';

  // ── Prix depuis la grille (PriceGrid en base, sinon défaut) ───────────────
  let price = template.price; // garde le prix du template si pas de grille
  try {
    const priceRow = await prisma.priceGrid.findUnique({
      where: { classe_niveau: { classe, niveau } },
    });
    if (priceRow) price = priceRow.priceFcfa;
    else price = getPrice(classe, niveau, DEFAULT_PRICE_GRID);
  } catch {
    price = getPrice(classe, niveau, DEFAULT_PRICE_GRID);
  }

  // ── Génération du contenu ─────────────────────────────────────────────────
  let contentHtml: string;
  let contentJson: string | null = null;
  let genProvider = 'template';

  if (isExcel) {
    contentHtml = JSON.stringify(answers);
    genProvider = 'excel';
  } else if (process.env.ANTHROPIC_API_KEY) {
    // Voie principale : Claude v2 → JSON strict → rendu par notre code
    const result = await generateDocumentJson({
      templateName: template.name,
      templateDescription: template.description ?? '',
      templateBody: template.body,
      fields,
      answers,
      country,
      classe,
      niveau,
    });

    if (result) {
      contentHtml = result.html;
      contentJson = JSON.stringify(result.json);
      genProvider = 'claude';

      // Journal de génération (CDC §11)
      try {
        await prisma.generationLog.create({
          data: {
            userId: user?.id ?? null,
            templateCode: template.code,
            classe,
            niveau,
            provider: 'claude',
            modelUsed: result.model,
            tokensIn: result.tokensIn,
            tokensOut: result.tokensOut,
            tokensCached: result.tokensCached,
            costUsd: (result.tokensIn * 0.00000025 + result.tokensOut * 0.00000125),
            costFcfa: Math.ceil((result.tokensIn * 0.00000025 + result.tokensOut * 0.00000125) * 600),
            creditsDebited: price,
            durationMs: result.durationMs,
            status: 'success',
          },
        });
      } catch (logErr) {
        console.error('[GenerationLog] Erreur journalisation:', logErr);
      }
    } else {
      // Fallback Groq si Claude échoue
      contentHtml = isAiEnabled()
        ? (await generateDocumentWithAI({ templateName: template.name, templateDescription: template.description ?? '', templateBody: template.body, fields, answers, country })) ?? renderTemplate(template.body, answers, fields)
        : renderTemplate(template.body, answers, fields);
      genProvider = 'fallback';
    }
  } else if (isAiEnabled()) {
    // Voie secondaire : Groq (gratuit)
    const aiHtml = await generateDocumentWithAI({
      templateName: template.name,
      templateDescription: template.description ?? '',
      templateBody: template.body,
      fields,
      answers,
      country,
    });
    contentHtml = aiHtml ?? renderTemplate(template.body, answers, fields);
    genProvider = 'groq';
  } else {
    contentHtml = renderTemplate(template.body, answers, fields);
  }

  const qualityScore = computeQualityScore(fields, answers);
  const answersJson = JSON.stringify(answers);

  // ── Mise à jour d'un aperçu existant (non payé) ───────────────────────────
  if (body.documentId && typeof body.documentId === 'string') {
    const existing = await prisma.generatedDocument.findUnique({ where: { id: body.documentId } });
    if (
      existing &&
      existing.templateId === template.id &&
      !existing.paid &&
      (!existing.userId || existing.userId === user?.id)
    ) {
      const updated = await prisma.generatedDocument.update({
        where: { id: existing.id },
        data: {
          answersJson,
          contentHtml,
          contentJson,
          qualityScore,
          niveau,
          country: country ?? existing.country,
          userId: existing.userId ?? user?.id ?? null,
          price,
        },
      });
      return NextResponse.json({ id: updated.id });
    }
  }

  const doc = await prisma.generatedDocument.create({
    data: {
      userId: user?.id ?? null,
      templateId: template.id,
      title: template.name,
      answersJson,
      contentHtml,
      contentJson,
      qualityScore,
      niveau,
      status: 'apercu',
      paid: false,
      price,
      currency: template.currency,
      country,
    },
  });

  console.log(`[generate] ${template.code} niveau=${niveau} classe=${classe} prix=${price} FCFA provider=${genProvider}`);
  return NextResponse.json({ id: doc.id });
}
