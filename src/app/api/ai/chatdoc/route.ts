// POST /api/ai/chatdoc — Mode assistant conversationnel (CDC §6.2 ChatDoc).
// Body : { code: string, description: string }
// L'utilisateur décrit son besoin en langage naturel ; Claude extrait les
// champs du questionnaire (fieldsJson fourni au prompt système) et renvoie
// {answers} pour pré-remplir le formulaire — vérification humaine ensuite.
// Sans IA : 503 (l'onglet est masqué côté client).
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { parseFields, type Answers } from '@/lib/docgen';
import { aiAvailable, askClaude, extractJsonObject } from '@/lib/ai/client';

export async function POST(req: NextRequest) {
  let body: { code?: string; description?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Corps de requête invalide.' }, { status: 400 });
  }

  const code = typeof body.code === 'string' ? body.code : '';
  const description = typeof body.description === 'string' ? body.description.trim() : '';
  if (!code || !description) {
    return NextResponse.json({ error: 'Décrivez votre besoin avant de lancer l\'assistant.' }, { status: 400 });
  }
  if (description.length < 15) {
    return NextResponse.json(
      { error: 'Votre description est trop courte : donnez plus de détails (poste, entreprise, expérience…).' },
      { status: 400 }
    );
  }

  if (!aiAvailable()) {
    return NextResponse.json(
      { error: "Le mode assistant n'est pas disponible sur cette installation." },
      { status: 503 }
    );
  }

  const template = await prisma.documentTemplate.findUnique({ where: { code } });
  if (!template || !template.active) {
    return NextResponse.json({ error: 'Modèle de document introuvable.' }, { status: 404 });
  }
  const fields = parseFields(template.fieldsJson);
  if (fields.length === 0) {
    return NextResponse.json({ error: 'Ce modèle ne comporte aucun champ.' }, { status: 400 });
  }

  const system = [
    `Tu es l'assistant ChatDoc d'IBIG DocPro. L'utilisateur décrit en langage naturel le document « ${template.name} » qu'il souhaite.`,
    'Extrais de sa description les valeurs des champs du questionnaire ci-dessous et rédige les champs de type "textarea" de façon professionnelle en français à partir de ses informations.',
    `Champs du questionnaire (JSON) : ${JSON.stringify(
      fields.map((f) => ({ key: f.key, label: f.label, type: f.type, options: f.options ?? undefined }))
    )}`,
    'Règles : n\'invente JAMAIS de données factuelles absentes (email, téléphone, adresse…) — omets simplement le champ. Dates au format AAAA-MM-JJ. Pour un champ "select", choisis une valeur parmi ses "options" uniquement.',
    'Réponds UNIQUEMENT avec un objet JSON strict : {"answers": {"cle": "valeur", ...}} — aucune autre sortie.',
  ].join('\n');

  const raw = await askClaude(system, description.slice(0, 4000), 3000);
  const parsed = extractJsonObject<{ answers?: Record<string, unknown> }>(raw);
  if (!parsed?.answers || typeof parsed.answers !== 'object' || Array.isArray(parsed.answers)) {
    return NextResponse.json(
      { error: "L'assistant n'a pas pu analyser votre demande. Reformulez ou remplissez le formulaire." },
      { status: 502 }
    );
  }

  // Nettoyage strict : uniquement les clés du questionnaire, valeurs bornées.
  const answers: Answers = {};
  for (const f of fields) {
    const v = parsed.answers[f.key];
    if (typeof v !== 'string' || !v.trim()) continue;
    if (f.type === 'select' && f.options?.length && !f.options.includes(v.trim())) continue;
    answers[f.key] = v.trim().slice(0, 5000);
  }

  if (Object.keys(answers).length === 0) {
    return NextResponse.json(
      { error: "L'assistant n'a extrait aucune information exploitable — donnez plus de détails." },
      { status: 422 }
    );
  }

  return NextResponse.json({ answers, filled: Object.keys(answers).length, total: fields.length });
}
