// Authentification par cookie de session signé HMAC-SHA256.
// Usage côté serveur (Server Components, Route Handlers, Server Actions).
import { cookies } from 'next/headers';
import { createHmac, timingSafeEqual } from 'crypto';
import { prisma } from './db';

const COOKIE = 'docpro_session';
const SECRET = process.env.SESSION_SECRET ?? 'dev-secret-change-en-prod-32chars!!'
if (process.env.NODE_ENV === 'production' && !process.env.SESSION_SECRET) { console.error('[SECURITE CRITIQUE] SESSION_SECRET non défini en production !') }
const MAX_AGE = 60 * 60 * 24 * 7; // 7 jours

type SessionPayload = { uid: string; role: string; exp: number };

function sign(data: string): string {
  return createHmac('sha256', SECRET).update(data).digest('base64url');
}

export function encodeSession(payload: SessionPayload): string {
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url');
  return `${data}.${sign(data)}`;
}

export function decodeSession(token: string): SessionPayload | null {
  const [data, sig] = token.split('.');
  if (!data || !sig) return null;
  const expected = sign(data);
  const a = Buffer.from(sig), b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(Buffer.from(data, 'base64url').toString()) as SessionPayload;
    if (payload.exp < Date.now() / 1000) return null;
    return payload;
  } catch {
    return null;
  }
}

/** Crée la session et pose le cookie (à appeler dans une Server Action / Route Handler). */
export async function createSession(uid: string, role: string) {
  const token = encodeSession({ uid, role, exp: Math.floor(Date.now() / 1000) + MAX_AGE });
  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: MAX_AGE,
    path: '/',
  });
}

export async function destroySession() {
  (await cookies()).delete(COOKIE);
}

/** Retourne l'utilisateur connecté (ou null). */
export async function getSessionUser() {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  const payload = decodeSession(token);
  if (!payload) return null;
  return prisma.user.findUnique({ where: { id: payload.uid } });
}

/** Lève si non connecté. */
export async function requireUser() {
  const user = await getSessionUser();
  if (!user) throw new AuthError('Non authentifié', 401);
  return user;
}

const ROLE_LEVEL: Record<string, number> = { client: 0, agent: 1, admin: 2, superadmin: 3 };

/** Lève si le rôle est insuffisant (RBAC). */
export async function requireRole(minRole: 'agent' | 'admin' | 'superadmin') {
  const user = await requireUser();
  if ((ROLE_LEVEL[user.role] ?? 0) < ROLE_LEVEL[minRole]) {
    throw new AuthError('Accès refusé', 403);
  }
  return user;
}

export class AuthError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}
