// POST /api/marketplace/submissions — soumission d'un template par un créateur.
// Validation serveur stricte → TemplateSubmission 'soumis' + notification admins.
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireUser, AuthError } from '@/lib/auth';
import { notifyAdmins } from '@/lib/notify';
import {
  MARKETPLACE_CATEGORIES,
  MKT_PRICE_MIN,
  MKT_PRICE_MAX,
  FIELD_TYPES,
} from '../../../marketplace/categories';

const KEY_RE = /^[a-zA-Z0-9_]{2,40}$/;
const MAX_FIELDS = 30;
const MAX_BODY = 100_000;

type IncomingField = {
  key?: unknown;
  label?: unknown;
  type?: unknown;
  required?: unknown;
  options?: unknown;
};

function bad(message: string): NextResponse {
  return NextResponse.json({ error: message }, { status: 400 });
}

export async function POST(req: Request) {
  let user;
  try {
    user = await requireUser();
  } catch (e) {
    if (e instanceof AuthError) {
      return NextResponse.json({ error: e.message }, { status: e.status });
    }
    throw e;
  }

  let payload: Record<string, unknown>;
  try {
    payload = await req.json();
  } catch {
    return bad('Corps JSON invalide.');
  }

  const name = String(payload.name ?? '').trim();
  const category = String(payload.category ?? '').trim();
  const description = String(payload.description ?? '').trim();
  const price = Number(payload.price);
  const body = String(payload.body ?? '').trim();
  const rawFields = payload.fields;

  if (name.length < 3 || name.length > 120) {
    return bad('Le nom du template doit contenir entre 3 et 120 caractères.');
  }
  if (!MARKETPLACE_CATEGORIES[category]) {
    return bad('Catégorie invalide.');
  }
  if (description.length > 500) {
    return bad('La description ne doit pas dépasser 500 caractères.');
  }
  if (!Number.isInteger(price) || price < MKT_PRICE_MIN || price > MKT_PRICE_MAX) {
    return bad(`Le prix doit être un entier entre ${MKT_PRICE_MIN} et ${MKT_PRICE_MAX} FCFA.`);
  }
  if (!body) return bad('Le corps du document est obligatoire.');
  if (body.length > MAX_BODY) return bad('Le corps du document est trop long.');
  if (!/\{\{\s*[a-zA-Z0-9_]+\s*\}\}/.test(body)) {
    return bad('Le corps doit contenir au moins un {{placeholder}}.');
  }

  if (!Array.isArray(rawFields) || rawFields.length === 0) {
    return bad('Ajoutez au moins un champ au questionnaire.');
  }
  if (rawFields.length > MAX_FIELDS) {
    return bad(`Maximum ${MAX_FIELDS} champs.`);
  }

  const seen = new Set<string>();
  const fields = [];
  for (const raw of rawFields as IncomingField[]) {
    const key = String(raw?.key ?? '').trim();
    const label = String(raw?.label ?? '').trim();
    const type = String(raw?.type ?? 'text');
    if (!KEY_RE.test(key)) {
      return bad(`Clé de champ invalide : « ${key || '(vide)'} » (lettres, chiffres, underscore, 2-40 caractères).`);
    }
    if (seen.has(key)) return bad(`Clé de champ dupliquée : « ${key} ».`);
    seen.add(key);
    if (!label || label.length > 160) return bad(`Question invalide pour le champ « ${key} ».`);
    if (!(FIELD_TYPES as readonly string[]).includes(type)) {
      return bad(`Type invalide pour le champ « ${key} ».`);
    }
    const options =
      type === 'select' && Array.isArray(raw?.options)
        ? (raw.options as unknown[]).map((o) => String(o).trim()).filter(Boolean).slice(0, 20)
        : undefined;
    if (type === 'select' && (!options || options.length < 2)) {
      return bad(`Le champ « ${key} » (liste déroulante) doit avoir au moins 2 options.`);
    }
    fields.push({
      key,
      label,
      type,
      required: Boolean(raw?.required),
      ...(options ? { options } : {}),
    });
  }

  const submission = await prisma.templateSubmission.create({
    data: {
      authorId: user.id,
      name,
      category,
      description: description || null,
      price,
      fieldsJson: JSON.stringify(fields),
      body,
      status: 'soumis',
    },
  });

  await notifyAdmins({
    event: 'template_soumis',
    title: 'Nouveau template marketplace à valider',
    body: `${user.name} (${user.email}) a soumis le template « ${name} » (${MARKETPLACE_CATEGORIES[category]}, ${price} FCFA). À examiner dans /admin/marketplace.`,
  });

  return NextResponse.json({ ok: true, id: submission.id }, { status: 201 });
}
