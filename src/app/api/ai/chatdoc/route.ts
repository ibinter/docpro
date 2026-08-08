// POST /api/ai/chatdoc — Mode assistant conversationnel (CDC §6.2 ChatDoc).
// Body : { code: string, description: string, country?: string }
//
// L'utilisateur décrit son besoin en langage naturel ; Claude extrait les
// champs du questionnaire et renvoie {answers} pour pré-remplir le formulaire.
//
// Le prompt reçoit un contexte élargi pour remplir davantage de champs du
// premier coup : objet du modèle, profil de l'utilisateur connecté, pays cible
// et date du jour (pour résoudre « dans trois mois », « à partir de lundi »…).
// La réponse indique aussi ce qui manque encore, avec des questions ciblées.
//
// Compte obligatoire : la génération est réservée aux utilisateurs inscrits.
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';
import { parseFields, prefillFromProfile, type Answers, type TemplateField } from '@/lib/docgen';
import { aiAvailable, askClaude, extractJsonObject } from '@/lib/ai/client';
import { legalContextFr } from '@/lib/ai/countries';

/** Compare deux libellés en ignorant casse, accents et ponctuation. */
function empreinte(s: string): string {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '');
}

/** Rapproche une valeur libre d'une option de liste (« CDI » ↔ « Contrat CDI »). */
function rapprocherOption(valeur: string, options: string[]): string | null {
  const v = empreinte(valeur);
  if (!v) return null;
  const exact = options.find((o) => empreinte(o) === v);
  if (exact) return exact;
  const inclus = options.find((o) => {
    const e = empreinte(o);
    return e.includes(v) || v.includes(e);
  });
  return inclus ?? null;
}

/** Normalise une date en AAAA-MM-JJ (accepte JJ/MM/AAAA et AAAA-M-J). */
function normaliserDate(v: string): string | null {
  const t = v.trim();
  let m = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(t);
  if (m) return `${m[1]}-${m[2].padStart(2, '0')}-${m[3].padStart(2, '0')}`;
  m = /^(\d{1,2})[/.](\d{1,2})[/.](\d{4})$/.exec(t);
  if (m) return `${m[3]}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}`;
  return null;
}

export async function POST(req: NextRequest) {
  // ── Compte obligatoire ────────────────────────────────────────────────
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json(
      { error: 'Créez un compte gratuit pour utiliser l’assistant.', requiresAuth: true },
      { status: 401 }
    );
  }

  let body: { code?: string; description?: string; country?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Corps de requête invalide.' }, { status: 400 });
  }

  const code = typeof body.code === 'string' ? body.code : '';
  const description = typeof body.description === 'string' ? body.description.trim() : '';
  if (!code || !description) {
    return NextResponse.json({ error: 'Décrivez votre besoin avant de lancer l’assistant.' }, { status: 400 });
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

  const pays = typeof body.country === 'string' && body.country.trim() ? body.country.trim() : user.country ?? null;

  // Repères de contexte pour remplir davantage de champs dès la première passe.
  const profil = prefillFromProfile(fields, user);
  const aujourdhui = new Date().toISOString().slice(0, 10);

  // Aperçu textuel du modèle : aide l'assistant à comprendre l'usage réel.
  const apercuModele = template.body
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\{\{[^}]+\}\}/g, '[donnée]')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 600);

  const system = [
    `Tu es l'assistant ChatDoc d'IBIG DocPro. L'utilisateur décrit en langage naturel le document « ${template.name} » qu'il souhaite obtenir.`,
    template.description ? `Objet de ce document : ${template.description}` : '',
    apercuModele ? `Extrait du modèle (pour comprendre l'usage) : ${apercuModele}` : '',
    '',
    'MISSION : extraire de sa description la valeur de chaque champ du questionnaire, et en déduire un maximum sans jamais inventer de fait vérifiable.',
    '',
    `Champs du questionnaire (JSON) : ${JSON.stringify(
      fields.map((f) => ({ key: f.key, label: f.label, type: f.type, required: f.required ?? false, options: f.options ?? undefined }))
    )}`,
    '',
    `Date du jour : ${aujourdhui}. Résous les dates relatives (« dans trois mois », « à partir de lundi prochain », « l'an dernier ») en dates absolues au format AAAA-MM-JJ.`,
    pays ? `Pays du document : ${pays}. ${legalContextFr(pays)}` : '',
    Object.keys(profil).length
      ? `Informations déjà connues sur l'utilisateur (à réutiliser si la description ne les contredit pas) : ${JSON.stringify(profil)}`
      : '',
    '',
    'RÈGLES :',
    "- N'invente JAMAIS une donnée factuelle vérifiable absente de la description : identité d'un tiers, e-mail, téléphone, adresse, numéro RCCM, montant. Omets simplement le champ.",
    '- En revanche, DÉDUIS ce qui découle logiquement de la description : intitulé de poste, objet du contrat, durée, catégorie, civilité, ville à partir du pays mentionné.',
    "- Pour les champs de type textarea, RÉDIGE un contenu professionnel complet et prêt à l'emploi à partir des éléments fournis (plusieurs phrases, ton adapté au document) — n'y recopie pas la description brute.",
    '- Pour un champ "select", choisis une valeur figurant dans ses "options".',
    '- Les montants : chiffres seuls, sans espace ni symbole monétaire.',
    '',
    'RÉPONSE — objet JSON strict, aucune autre sortie :',
    '{"answers":{"cle":"valeur"},"questions":["question courte pour obtenir une information importante encore manquante"]}',
    'Le tableau "questions" contient au plus 3 questions, portant uniquement sur des champs obligatoires que tu n\'as pas pu remplir. Tableau vide si tout est renseigné.',
  ]
    .filter(Boolean)
    .join('\n');

  const raw = await askClaude(system, description.slice(0, 6000), 4000);
  const parsed = extractJsonObject<{ answers?: Record<string, unknown>; questions?: unknown }>(raw);
  if (!parsed?.answers || typeof parsed.answers !== 'object' || Array.isArray(parsed.answers)) {
    return NextResponse.json(
      { error: "L'assistant n'a pas pu analyser votre demande. Reformulez ou remplissez le formulaire." },
      { status: 502 }
    );
  }

  // ── Nettoyage strict : uniquement les clés du questionnaire ───────────
  const answers: Answers = {};
  for (const f of fields) {
    const v = parsed.answers[f.key];
    if (typeof v !== 'string' || !v.trim()) continue;
    let valeur = v.trim();

    if (f.type === 'select' && f.options?.length) {
      const option = rapprocherOption(valeur, f.options);
      if (!option) continue; // valeur hors liste : on laisse le champ à l'utilisateur
      valeur = option;
    } else if (f.type === 'date') {
      const d = normaliserDate(valeur);
      if (!d) continue;
      valeur = d;
    }
    answers[f.key] = valeur.slice(0, 5000);
  }

  // Profil de l'utilisateur en complément (jamais en écrasement de l'IA).
  for (const [k, v] of Object.entries(profil)) {
    if (!answers[k] && v) answers[k] = v;
  }

  if (Object.keys(answers).length === 0) {
    return NextResponse.json(
      { error: "L'assistant n'a extrait aucune information exploitable — donnez plus de détails." },
      { status: 422 }
    );
  }

  // ── Ce qu'il reste à compléter ────────────────────────────────────────
  const manquants: TemplateField[] = fields.filter(
    (f) => f.required && !String(answers[f.key] ?? '').trim()
  );
  const questions = Array.isArray(parsed.questions)
    ? parsed.questions.filter((q): q is string => typeof q === 'string' && q.trim().length > 0).slice(0, 3)
    : [];

  return NextResponse.json({
    answers,
    filled: Object.keys(answers).length,
    total: fields.length,
    missingRequired: manquants.map((f) => f.label),
    questions,
  });
}
