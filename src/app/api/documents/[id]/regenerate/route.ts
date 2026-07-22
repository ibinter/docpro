// POST /api/documents/[id]/regenerate — régénère depuis les réponses sauvegardées.
// Respecte le niveau et la classe du document original.
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';
import { parseFields, renderTemplate, computeQualityScore, splitAnswersJson } from '@/lib/docgen';
import { generateDocumentWithAI, isAiEnabled } from '@/lib/ai/docgen';
import { generateDocumentJson } from '@/lib/ai/docgen-v2';
import { type Classe, type Niveau } from '@/lib/pricing';

const VALID_NIVEAUX: Niveau[] = ['standard', 'pro', 'expert'];
const VALID_CLASSES: Classe[] = ['A', 'B', 'C'];

export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const doc = await prisma.generatedDocument.findUnique({
    where: { id },
    include: { template: true },
  });
  if (!doc) return NextResponse.json({ error: 'Document introuvable.' }, { status: 404 });

  const user = await getSessionUser();
  if (doc.userId && doc.userId !== user?.id) {
    return NextResponse.json({ error: 'Accès refusé.' }, { status: 403 });
  }
  if (doc.paid) {
    return NextResponse.json(
      { error: 'Ce document est payé : son contenu est figé pour garantir son authenticité.' },
      { status: 409 }
    );
  }

  const { answers } = splitAnswersJson(doc.answersJson);
  if (Object.keys(answers).length === 0) {
    return NextResponse.json({ error: 'Réponses illisibles — modifiez le document.' }, { status: 422 });
  }

  const niveau: Niveau = VALID_NIVEAUX.includes(doc.niveau as Niveau)
    ? (doc.niveau as Niveau)
    : 'standard';
  const classe: Classe = VALID_CLASSES.includes((doc.template.classe ?? '') as Classe)
    ? (doc.template.classe as Classe)
    : 'B';

  const fields = parseFields(doc.template.fieldsJson);
  let contentHtml: string;
  let contentJson: string | null = null;

  if (process.env.ANTHROPIC_API_KEY) {
    const result = await generateDocumentJson({
      templateName: doc.template.name,
      templateDescription: doc.template.description ?? '',
      templateBody: doc.template.body,
      fields,
      answers,
      country: doc.country,
      classe,
      niveau,
    });
    if (result) {
      contentHtml = result.html;
      contentJson = JSON.stringify(result.json);
    } else {
      contentHtml = isAiEnabled()
        ? (await generateDocumentWithAI({ templateName: doc.template.name, templateDescription: doc.template.description ?? '', templateBody: doc.template.body, fields, answers, country: doc.country })) ?? renderTemplate(doc.template.body, answers, fields)
        : renderTemplate(doc.template.body, answers, fields);
    }
  } else if (isAiEnabled()) {
    const aiHtml = await generateDocumentWithAI({
      templateName: doc.template.name,
      templateDescription: doc.template.description ?? '',
      templateBody: doc.template.body,
      fields,
      answers,
      country: doc.country,
    });
    contentHtml = aiHtml ?? renderTemplate(doc.template.body, answers, fields);
  } else {
    contentHtml = renderTemplate(doc.template.body, answers, fields);
  }

  const qualityScore = computeQualityScore(fields, answers);

  await prisma.generatedDocument.update({
    where: { id: doc.id },
    data: { contentHtml, contentJson, qualityScore },
  });

  return NextResponse.json({ id: doc.id, qualityScore });
}
