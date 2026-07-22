// API publique partenaires v1 (CDC §6.2) — POST /api/v1/documents
// Auth : Authorization: Bearer dp_live_xxx
// Body : { template_code: string, answers: {}, language?: string }
// Génère le document (renderTemplate + computeQualityScore) au nom du
// propriétaire de la clé. paid = true : l'API est un canal facturé au
// contrat B2B — sans impact sur le paiement à l'unité côté site.
// Réponse 201 : { id, verify_code, quality_score, html }
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyApiKey, handleV1Error, ApiError } from '@/lib/apikey';
import { parseFields, renderTemplate, computeQualityScore, type Answers } from '@/lib/docgen';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const apiKey = await verifyApiKey(req);

    const body = (await req.json().catch(() => null)) as
      | { template_code?: unknown; answers?: unknown; language?: unknown }
      | null;
    if (!body) {
      throw new ApiError(422, 'invalid_body', 'Corps de requête JSON invalide.');
    }

    const templateCode = typeof body.template_code === 'string' ? body.template_code.trim() : '';
    if (!templateCode) {
      throw new ApiError(422, 'validation_error', 'Le champ « template_code » est requis.');
    }
    const rawAnswers = body.answers;
    if (typeof rawAnswers !== 'object' || rawAnswers === null || Array.isArray(rawAnswers)) {
      throw new ApiError(422, 'validation_error', 'Le champ « answers » doit être un objet { cle: valeur }.');
    }
    const language =
      typeof body.language === 'string' && body.language.trim() ? body.language.trim().slice(0, 5) : 'fr';

    const template = await prisma.documentTemplate.findUnique({ where: { code: templateCode } });
    if (!template || !template.active) {
      throw new ApiError(404, 'template_not_found', `Modèle « ${templateCode} » introuvable.`);
    }

    const fields = parseFields(template.fieldsJson);

    // Nettoyage : seules les clés du questionnaire sont conservées, valeurs bornées.
    const answers: Answers = {};
    for (const f of fields) {
      const v = (rawAnswers as Record<string, unknown>)[f.key];
      if (typeof v === 'string') answers[f.key] = v.slice(0, 5000);
      else if (typeof v === 'number') answers[f.key] = String(v);
    }

    // Champs obligatoires manquants → 422 avec la liste.
    const missing = fields.filter((f) => f.required && !String(answers[f.key] ?? '').trim());
    if (missing.length > 0) {
      throw new ApiError(
        422,
        'missing_fields',
        `Champs obligatoires manquants : ${missing.map((f) => f.key).join(', ')}.`
      );
    }

    const contentHtml = renderTemplate(template.body, answers, fields);
    const qualityScore = computeQualityScore(fields, answers);

    const doc = await prisma.generatedDocument.create({
      data: {
        userId: apiKey.userId, // propriétaire de la clé
        templateId: template.id,
        title: template.name,
        answersJson: JSON.stringify(answers),
        contentHtml,
        language,
        qualityScore,
        status: 'paye',
        paid: true, // canal API : facturation au contrat B2B
        price: template.price,
        currency: template.currency,
      },
    });

    return NextResponse.json(
      {
        id: doc.id,
        verify_code: doc.verifyCode,
        quality_score: doc.qualityScore,
        html: doc.contentHtml,
      },
      { status: 201 }
    );
  } catch (e) {
    return handleV1Error(e);
  }
}
