// POST /api/ai/enhance — amélioration IA du contenu des champs utilisateur.
// Body : { documentId: string, revert?: boolean }
//  - amélioration : Claude reformule les champs longs (textarea) SANS toucher
//    à la structure du template ; contentHtml re-rendu ; answersJson mis à
//    jour avec copie de l'original sous « _original ».
//  - revert : restaure les réponses d'origine depuis « _original ».
// Interdit si le document a déjà été téléchargé (contenu figé).
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';
import {
  parseFields,
  renderTemplate,
  computeQualityScore,
  splitAnswersJson,
  type Answers,
} from '@/lib/docgen';
import { aiAvailable, askClaude, extractJsonObject } from '@/lib/ai/client';
import { legalContextFr } from '@/lib/ai/countries';

export async function POST(req: NextRequest) {
  let body: { documentId?: string; revert?: boolean };
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
  if (doc.status === 'telecharge') {
    return NextResponse.json(
      { error: 'Ce document a déjà été téléchargé : son contenu est figé.' },
      { status: 409 }
    );
  }

  const fields = parseFields(doc.template.fieldsJson);
  const { answers, meta } = splitAnswersJson(doc.answersJson);

  // ── Retour à l'original ────────────────────────────────────
  if (body.revert === true) {
    const original = meta._original;
    if (!original || typeof original !== 'object' || Array.isArray(original)) {
      return NextResponse.json({ error: 'Aucune version originale à restaurer.' }, { status: 400 });
    }
    const restored: Answers = {};
    for (const [k, v] of Object.entries(original as Record<string, unknown>)) {
      if (typeof v === 'string') restored[k] = v;
    }
    const contentHtml = renderTemplate(doc.template.body, restored, fields);
    const qualityScore = computeQualityScore(fields, restored);
    const restMeta = { ...meta };
    delete restMeta._original;
    await prisma.generatedDocument.update({
      where: { id: doc.id },
      data: {
        answersJson: JSON.stringify({ ...restored, ...restMeta }),
        contentHtml,
        qualityScore,
      },
    });
    return NextResponse.json({ reverted: true, qualityScore });
  }

  // ── Amélioration IA ────────────────────────────────────────
  if (!aiAvailable()) {
    return NextResponse.json(
      { error: "L'amélioration IA n'est pas disponible sur cette installation." },
      { status: 503 }
    );
  }

  // Seuls les champs de contenu rédigé (textarea) sont reformulés.
  const editableFields = fields.filter(
    (f) => f.type === 'textarea' && String(answers[f.key] ?? '').trim().length > 0
  );
  if (editableFields.length === 0) {
    return NextResponse.json(
      { error: 'Aucun champ rédigé à améliorer dans ce document.' },
      { status: 400 }
    );
  }

  const system = [
    'Tu es un rédacteur professionnel francophone spécialisé dans les documents administratifs et professionnels.',
    "Reformule et professionnalise les textes fournis par l'utilisateur : style clair, ton professionnel, vocabulaire précis, sans fautes.",
    "Conserve TOUTES les informations factuelles (noms, dates, montants, coordonnées, entreprises) — n'invente rien, ne supprime rien d'important.",
    'Conserve la langue d\'origine de chaque texte.',
    legalContextFr(doc.country),
    'Réponds UNIQUEMENT avec un objet JSON strict de la forme {"answers": {"cle": "texte amélioré", ...}} — aucune autre sortie.',
  ]
    .filter(Boolean)
    .join('\n');

  const userMsg = JSON.stringify({
    document: doc.template.name,
    champs: editableFields.map((f) => ({ cle: f.key, libelle: f.label, texte: answers[f.key] })),
  });

  const raw = await askClaude(system, userMsg, 4000);
  const parsed = extractJsonObject<{ answers?: Record<string, unknown> }>(raw);
  const improved = parsed?.answers;
  if (!improved || typeof improved !== 'object') {
    return NextResponse.json(
      { error: "L'IA n'a pas pu améliorer ce document. Réessayez dans un instant." },
      { status: 502 }
    );
  }

  const editableKeys = new Set(editableFields.map((f) => f.key));
  const newAnswers: Answers = { ...answers };
  const changes: { key: string; label: string; before: string; after: string }[] = [];
  for (const f of editableFields) {
    const v = improved[f.key];
    if (typeof v === 'string' && v.trim() && v.trim() !== String(answers[f.key]).trim()) {
      newAnswers[f.key] = v.trim().slice(0, 5000);
      changes.push({ key: f.key, label: f.label, before: answers[f.key], after: newAnswers[f.key] });
    }
  }
  // Sécurité : aucune clé hors périmètre n'est acceptée.
  for (const k of Object.keys(newAnswers)) {
    if (!editableKeys.has(k) && !(k in answers)) delete newAnswers[k];
  }

  if (changes.length === 0) {
    return NextResponse.json(
      { error: "L'IA n'a proposé aucune amélioration : votre contenu est déjà de bonne qualité." },
      { status: 400 }
    );
  }

  const contentHtml = renderTemplate(doc.template.body, newAnswers, fields);
  const qualityScore = computeQualityScore(fields, newAnswers);
  // Copie d'origine conservée sous _original (la toute première version prime).
  const original = meta._original ?? answers;

  await prisma.generatedDocument.update({
    where: { id: doc.id },
    data: {
      answersJson: JSON.stringify({ ...newAnswers, ...meta, _original: original }),
      contentHtml,
      qualityScore,
    },
  });

  return NextResponse.json({ changes, qualityScore });
}
