// ─────────────────────────────────────────────────────────────────────────────
// IBIG DocPro — Clés API partenaires (CDC §6.2 « API & White Label »).
// • Format : dp_live_ + 32 caractères hexadécimaux.
// • Seul le hash SHA-256 est stocké — la clé claire n'est montrée qu'UNE fois.
// • verifyApiKey : auth Bearer + rate limit 60 appels/min (Map en mémoire).
// • Erreurs JSON uniformes { error: { code, message } } (401 / 404 / 422 / 429).
// ─────────────────────────────────────────────────────────────────────────────
import { createHash, randomBytes } from 'crypto';
import { NextResponse } from 'next/server';
import type { ApiKey } from '@prisma/client';
import { prisma } from './db';

/** SHA-256 hexadécimal d'une clé claire. */
export function hashApiKey(clear: string): string {
  return createHash('sha256').update(clear).digest('hex');
}

/**
 * Génère une nouvelle clé API : dp_live_ + 32 hex.
 * Retourne la clé claire (à afficher une seule fois), son hash (à stocker)
 * et le préfixe affichable (dp_live_xxxx).
 */
export function generateApiKey(): { clear: string; hash: string; prefix: string } {
  const clear = `dp_live_${randomBytes(16).toString('hex')}`;
  return { clear, hash: hashApiKey(clear), prefix: clear.slice(0, 12) };
}

// ── Erreur API typée ──────────────────────────────────────────────────────────
export class ApiError extends Error {
  status: number;
  code: string;
  constructor(status: number, code: string, message: string) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

/** Réponse d'erreur JSON uniforme { error: { code, message } }. */
export function apiErrorResponse(status: number, code: string, message: string) {
  return NextResponse.json({ error: { code, message } }, { status });
}

/** Convertit toute exception en réponse d'erreur uniforme (500 par défaut). */
export function handleV1Error(e: unknown) {
  if (e instanceof ApiError) return apiErrorResponse(e.status, e.code, e.message);
  console.error('[api-v1] erreur interne :', e);
  return apiErrorResponse(500, 'internal_error', 'Erreur interne du serveur.');
}

// ── Rate limit simple en mémoire : 60 appels / minute / clé ──────────────────
const RATE_WINDOW_MS = 60_000;
const RATE_MAX_CALLS = 60;
const rateBuckets = new Map<string, { windowStart: number; count: number }>();

function checkRateLimit(keyId: string): void {
  const now = Date.now();
  const bucket = rateBuckets.get(keyId);
  if (!bucket || now - bucket.windowStart >= RATE_WINDOW_MS) {
    rateBuckets.set(keyId, { windowStart: now, count: 1 });
    return;
  }
  bucket.count += 1;
  if (bucket.count > RATE_MAX_CALLS) {
    throw new ApiError(429, 'rate_limited', 'Limite de 60 appels par minute atteinte pour cette clé. Réessayez dans quelques instants.');
  }
  // Nettoyage opportuniste des fenêtres périmées (évite une croissance infinie).
  if (rateBuckets.size > 1000) {
    for (const [id, b] of rateBuckets) {
      if (now - b.windowStart >= RATE_WINDOW_MS) rateBuckets.delete(id);
    }
  }
}

const KEY_RE = /^Bearer\s+(dp_live_[a-f0-9]{32})$/i;

/**
 * Authentifie une requête API v1 : header `Authorization: Bearer dp_live_xxx`.
 * Hash du bearer → ApiKey active → rate limit → incrémente callCount + lastUsedAt.
 * Lève ApiError(401) si absente/invalide/révoquée, ApiError(429) si rate-limitée.
 */
export async function verifyApiKey(req: Request): Promise<ApiKey> {
  const header = (req.headers.get('authorization') ?? '').trim();
  const match = KEY_RE.exec(header);
  if (!match) {
    throw new ApiError(401, 'missing_key', 'Clé API manquante ou malformée. Attendu : Authorization: Bearer dp_live_xxx.');
  }

  const key = await prisma.apiKey.findUnique({ where: { keyHash: hashApiKey(match[1]) } });
  if (!key || !key.active) {
    throw new ApiError(401, 'invalid_key', 'Clé API invalide ou révoquée.');
  }

  checkRateLimit(key.id);

  return prisma.apiKey.update({
    where: { id: key.id },
    data: { callCount: { increment: 1 }, lastUsedAt: new Date() },
  });
}
