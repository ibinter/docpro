// 2FA TOTP (RFC 6238) en crypto natif Node — aucune dépendance externe (CDC §19.1).
// + signature/vérification du cookie temporaire 'docpro_2fa_pending' (étape de connexion).
import { createHmac, randomBytes, timingSafeEqual } from 'crypto';

// ─────────────────────────── Base32 (RFC 4648, sans padding) ───────────────────────────

const B32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

export function base32Encode(buf: Buffer): string {
  let bits = 0;
  let value = 0;
  let out = '';
  for (const byte of buf) {
    value = (value << 8) | byte;
    bits += 8;
    while (bits >= 5) {
      out += B32_ALPHABET[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }
  if (bits > 0) out += B32_ALPHABET[(value << (5 - bits)) & 31];
  return out;
}

export function base32Decode(s: string): Buffer {
  const clean = s.toUpperCase().replace(/[^A-Z2-7]/g, '');
  let bits = 0;
  let value = 0;
  const bytes: number[] = [];
  for (const ch of clean) {
    value = (value << 5) | B32_ALPHABET.indexOf(ch);
    bits += 5;
    if (bits >= 8) {
      bytes.push((value >>> (bits - 8)) & 0xff);
      bits -= 8;
    }
  }
  return Buffer.from(bytes);
}

// ─────────────────────────── TOTP (RFC 6238) ───────────────────────────

/** Génère un secret TOTP aléatoire (20 octets → 32 caractères base32). */
export function generateSecret(bytes = 20): string {
  return base32Encode(randomBytes(bytes));
}

/** HOTP (RFC 4226) : HMAC-SHA1 + dynamic truncation. */
function hotp(secretB32: string, counter: number, digits: number): string {
  const key = base32Decode(secretB32);
  const msg = Buffer.alloc(8);
  // Compteur 64 bits big-endian (les 32 bits hauts suffisent jusqu'en ~4000).
  msg.writeUInt32BE(Math.floor(counter / 0x100000000), 0);
  msg.writeUInt32BE(counter >>> 0, 4);
  const hmac = createHmac('sha1', key).update(msg).digest();
  const offset = hmac[hmac.length - 1] & 0x0f;
  const binCode =
    ((hmac[offset] & 0x7f) << 24) |
    ((hmac[offset + 1] & 0xff) << 16) |
    ((hmac[offset + 2] & 0xff) << 8) |
    (hmac[offset + 3] & 0xff);
  return String(binCode % 10 ** digits).padStart(digits, '0');
}

/** Code TOTP courant pour un secret base32. */
export function totpCode(secretB32: string, timeStep = 30, digits = 6, timestampMs = Date.now()): string {
  const counter = Math.floor(timestampMs / 1000 / timeStep);
  return hotp(secretB32, counter, digits);
}

/** Vérifie un code TOTP avec une fenêtre de tolérance de ±`window` pas (dérive d'horloge). */
export function verifyTotp(secretB32: string, code: string, window = 1, timeStep = 30, digits = 6): boolean {
  const clean = (code ?? '').replace(/\D/g, '');
  if (clean.length !== digits) return false;
  const counter = Math.floor(Date.now() / 1000 / timeStep);
  for (let i = -window; i <= window; i++) {
    const expected = hotp(secretB32, counter + i, digits);
    const a = Buffer.from(clean);
    const b = Buffer.from(expected);
    if (a.length === b.length && timingSafeEqual(a, b)) return true;
  }
  return false;
}

/** URL otpauth:// à encoder en QR (Google Authenticator, Aegis, 2FAS…). */
export function otpauthUrl(secretB32: string, email: string): string {
  const issuer = 'IBIG DocPro';
  const label = `${encodeURIComponent(issuer)}:${encodeURIComponent(email)}`;
  return `otpauth://totp/${label}?secret=${secretB32}&issuer=${encodeURIComponent(issuer)}&algorithm=SHA1&digits=6&period=30`;
}

// ─────────────────────────── Cookie temporaire 2FA (connexion en 2 temps) ───────────────────────────
// Après vérification du mot de passe, si totpEnabled : on NE crée PAS la session.
// On pose un cookie signé HMAC-SHA256 de 5 minutes, consommé par /api/auth/2fa/verify.
// Signature réimplémentée ici (les helpers d'auth.ts sont privés — on ne les importe pas).

export const PENDING_2FA_COOKIE = 'docpro_2fa_pending';
export const PENDING_2FA_MAX_AGE = 5 * 60; // 5 minutes
export const PENDING_2FA_MAX_FAILS = 3;

const PENDING_SECRET = process.env.SESSION_SECRET || 'dev-secret';

export type Pending2faPayload = { uid: string; fails: number; exp: number };

function signPending(data: string): string {
  return createHmac('sha256', PENDING_SECRET).update(data).digest('base64url');
}

export function encodePending2fa(payload: Pending2faPayload): string {
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url');
  return `${data}.${signPending(data)}`;
}

export function decodePending2fa(token: string): Pending2faPayload | null {
  const [data, sig] = token.split('.');
  if (!data || !sig) return null;
  const expected = signPending(data);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(Buffer.from(data, 'base64url').toString()) as Pending2faPayload;
    if (typeof payload.uid !== 'string' || typeof payload.exp !== 'number') return null;
    if (payload.exp < Date.now() / 1000) return null;
    return { uid: payload.uid, fails: Number(payload.fails) || 0, exp: payload.exp };
  } catch {
    return null;
  }
}
