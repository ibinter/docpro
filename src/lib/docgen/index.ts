// ─────────────────────────────────────────────────────────────
// IBIG DocPro — Moteur de génération documentaire (Agent 2)
// Remplacement des {{placeholders}}, score qualité heuristique,
// pré-remplissage depuis le Profil Utilisateur Intelligent.
// ─────────────────────────────────────────────────────────────

export type TemplateField = {
  key: string;
  label: string;
  type: 'text' | 'email' | 'date' | 'textarea' | 'select';
  required?: boolean;
  options?: string[];
};

export type Answers = Record<string, string>;

/** Parse fieldsJson d'un DocumentTemplate (tolérant).
 *  Accepte `key` ou `name` comme identifiant de champ (certains seeds utilisent `name`). */
export function parseFields(fieldsJson: string): TemplateField[] {
  try {
    const parsed = JSON.parse(fieldsJson);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((f) => {
        if (!f || typeof f.label !== 'string') return null;
        // Normalise name → key si key absent
        const key = typeof f.key === 'string' ? f.key : typeof f.name === 'string' ? f.name : null;
        if (!key) return null;
        return { ...f, key } as TemplateField;
      })
      .filter((f): f is TemplateField => f !== null);
  } catch {
    return [];
  }
}

/** Échappe le HTML d'une valeur utilisateur. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Échappe puis convertit les retours à la ligne en <br/>. */
export function formatAnswerHtml(value: string): string {
  return escapeHtml(value.trim()).replace(/\r?\n/g, '<br/>');
}

/** Date du jour en français long : « 16 juillet 2026 ». */
export function dateJourFr(date: Date = new Date()): string {
  return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
}

/** Formate une date ISO (champ type=date) en français, sinon renvoie la valeur brute. */
export function formatDateFr(value: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
  if (!m) return value;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  if (Number.isNaN(d.getTime())) return value;
  return dateJourFr(d);
}

/**
 * Remplace les {{placeholders}} du corps du template par les réponses
 * (HTML échappé, \n → <br/>). {{date_jour}} = date du jour en français.
 * Les champs sans réponse sont remplacés par un blanc à compléter.
 */
export function renderTemplate(body: string, answers: Answers, fields: TemplateField[] = []): string {
  const types = new Map(fields.map((f) => [f.key, f.type]));
  return body.replace(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g, (_match, key: string) => {
    if (key === 'date_jour') return escapeHtml(dateJourFr());
    const raw = answers[key];
    if (raw === undefined || raw === null || String(raw).trim() === '') return '____________';
    const value = String(raw);
    if (types.get(key) === 'date') return escapeHtml(formatDateFr(value));
    return formatAnswerHtml(value);
  });
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[0-9 ().\-]{8,20}$/;

/**
 * Score qualité heuristique 0-100 :
 * - complétude des champs requis (50 pts) et optionnels (10 pts)
 * - richesse des réponses longues / textarea (25 pts)
 * - validité des email / téléphone fournis (15 pts)
 */
export function computeQualityScore(fields: TemplateField[], answers: Answers): number {
  if (fields.length === 0) return 50;

  const filled = (f: TemplateField) => {
    const v = answers[f.key];
    return v !== undefined && String(v).trim() !== '';
  };

  // 1. Complétude
  const required = fields.filter((f) => f.required);
  const optional = fields.filter((f) => !f.required);
  const reqScore = required.length === 0 ? 50 : (required.filter(filled).length / required.length) * 50;
  const optScore = optional.length === 0 ? 10 : (optional.filter(filled).length / optional.length) * 10;

  // 2. Richesse des réponses longues
  const longFields = fields.filter((f) => f.type === 'textarea');
  let lengthScore = 25;
  if (longFields.length > 0) {
    const ratios = longFields.map((f) => {
      const len = String(answers[f.key] ?? '').trim().length;
      return Math.min(1, len / 120); // 120+ caractères = réponse riche
    });
    lengthScore = (ratios.reduce((a, b) => a + b, 0) / longFields.length) * 25;
  }

  // 3. Validité email / téléphone
  let validityScore = 15;
  const checks: number[] = [];
  for (const f of fields) {
    const v = String(answers[f.key] ?? '').trim();
    if (f.type === 'email') checks.push(v && EMAIL_RE.test(v) ? 1 : 0);
    if (f.key.toLowerCase().includes('telephone') || f.key.toLowerCase().includes('phone')) {
      checks.push(v && PHONE_RE.test(v) ? 1 : 0);
    }
  }
  if (checks.length > 0) {
    validityScore = (checks.reduce((a, b) => a + b, 0) / checks.length) * 15;
  }

  return Math.max(0, Math.min(100, Math.round(reqScore + optScore + lengthScore + validityScore)));
}

/**
 * Sépare un answersJson en réponses exploitables (valeurs texte) et
 * métadonnées internes (clés préfixées « _ » : _original, _parentId…).
 * Tolérant : JSON illisible → objets vides.
 */
export function splitAnswersJson(json: string): {
  answers: Answers;
  meta: Record<string, unknown>;
} {
  const answers: Answers = {};
  const meta: Record<string, unknown> = {};
  try {
    const parsed = JSON.parse(json);
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      for (const [k, v] of Object.entries(parsed as Record<string, unknown>)) {
        if (k.startsWith('_')) meta[k] = v;
        else if (typeof v === 'string') answers[k] = v;
      }
    }
  } catch {
    /* réponses illisibles → vides */
  }
  return { answers, meta };
}

/**
 * Suggestions d'amélioration heuristiques (fallback sans IA) :
 * champs facultatifs vides, réponses longues trop courtes, email invalide.
 */
export function heuristicSuggestions(fields: TemplateField[], answers: Answers): string[] {
  const suggestions: string[] = [];

  for (const f of fields) {
    const v = String(answers[f.key] ?? '').trim();
    if (f.type === 'textarea' && v && v.length < 120) {
      suggestions.push(`Développez la section « ${f.label} » (au moins 120 caractères) pour un rendu plus convaincant.`);
    }
    if (f.type === 'email' && v && !EMAIL_RE.test(v)) {
      suggestions.push(`Vérifiez l'adresse email du champ « ${f.label} » : elle semble invalide.`);
    }
    if ((f.key.toLowerCase().includes('telephone') || f.key.toLowerCase().includes('phone')) && v && !PHONE_RE.test(v)) {
      suggestions.push(`Vérifiez le numéro de téléphone du champ « ${f.label} » (format international recommandé, ex. +225…).`);
    }
  }

  const emptyOptional = fields.filter((f) => !f.required && !String(answers[f.key] ?? '').trim());
  if (emptyOptional.length > 0) {
    suggestions.push(
      `Complétez les champs facultatifs (${emptyOptional.slice(0, 3).map((f) => `« ${f.label} »`).join(', ')}${emptyOptional.length > 3 ? '…' : ''}) pour enrichir votre document.`
    );
  }

  if (suggestions.length === 0) {
    suggestions.push('Relisez votre document pour corriger les fautes éventuelles avant le paiement.');
    suggestions.push('Vérifiez que les dates et montants sont exacts et cohérents.');
  }
  return suggestions.slice(0, 5);
}

type ProfileUser = {
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  profileJson?: string | null;
};

/**
 * Pré-remplissage « Profil Utilisateur Intelligent » (CDC §6.2).
 * nom_complet ← prenom + nom, email, telephone, ville, profession…
 */
export function prefillFromProfile(fields: TemplateField[], user: ProfileUser | null): Answers {
  const prefill: Answers = {};
  if (!user) return prefill;

  let profile: Record<string, unknown> = {};
  if (user.profileJson) {
    try {
      const parsed = JSON.parse(user.profileJson);
      if (parsed && typeof parsed === 'object') profile = parsed as Record<string, unknown>;
    } catch {
      /* profil illisible → ignoré */
    }
  }
  const p = (k: string): string => {
    const v = profile[k];
    return typeof v === 'string' ? v : '';
  };

  const nomComplet =
    [p('prenom'), p('nom')].filter(Boolean).join(' ').trim() || (user.name ?? '').trim();

  const sources: Record<string, string> = {
    nom_complet: nomComplet,
    nom: p('nom'),
    prenom: p('prenom'),
    email: (user.email ?? '').trim(),
    telephone: p('telephone') || (user.phone ?? '').trim(),
    ville: p('ville'),
    profession: p('profession'),
    adresse: p('adresse'),
  };

  for (const f of fields) {
    const v = sources[f.key];
    if (v) prefill[f.key] = v;
  }
  return prefill;
}

/** Initiales d'un nom (vie privée sur /verify) : « Aya Koné » → « A. K. » */
export function initialsOf(fullName: string): string {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '—';
  return parts.map((w) => `${w[0].toUpperCase()}.`).join(' ');
}

/** URL absolue de l'application (QR de vérification). */
export function appUrl(): string {
  return process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
}
