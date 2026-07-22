// ─────────────────────────────────────────────────────────────────────────────
// GESTION SÉCURISÉE DES PREUVES DE PAIEMENT (CDC §14.1)
//   • Formats acceptés : JPG / JPEG / PNG / WEBP / PDF uniquement
//   • Taille max : 5 Mo
//   • Validation du type MIME par MAGIC BYTES côté serveur (jamais la seule extension)
//   • Rejet absolu des exécutables (.exe, .php, .js…)
//   • Renommage crypto.randomUUID() + timestamp — jamais le nom original
//   • Stockage dans private-uploads/ (hors de public/) — jamais servi en URL directe
//   • Hash SHA-256 pour la détection de preuves dupliquées (anti-fraude)
// ─────────────────────────────────────────────────────────────────────────────
import { createHash, randomUUID } from 'crypto';
import { mkdir, readFile, writeFile } from 'fs/promises';
import path from 'path';

export const PROOF_MAX_BYTES = 5 * 1024 * 1024; // 5 Mo
export const PROOFS_DIR = path.join(process.cwd(), 'private-uploads');

/** Erreur métier de validation d'une preuve — message affichable au client. */
export class ProofError extends Error {
  status: number;
  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
  }
}

const ALLOWED_EXTENSIONS = new Set(['jpg', 'jpeg', 'png', 'webp', 'pdf']);

// Extensions dangereuses — rejet immédiat quel que soit le contenu.
const FORBIDDEN_EXTENSIONS = new Set([
  'exe', 'dll', 'com', 'scr', 'msi', 'bat', 'cmd', 'ps1', 'vbs', 'vbe', 'wsf',
  'php', 'php3', 'php4', 'php5', 'phtml', 'js', 'mjs', 'cjs', 'jsp', 'asp',
  'aspx', 'sh', 'bash', 'py', 'pl', 'rb', 'cgi', 'jar', 'apk', 'app', 'html',
  'htm', 'svg', 'xml',
]);

/**
 * Détection du type MIME réel par magic bytes (signature binaire).
 * JPEG: FF D8 FF — PNG: 89 50 4E 47 — WEBP: "RIFF"...."WEBP" — PDF: "%PDF".
 * Retourne null si la signature ne correspond à aucun format autorisé.
 */
export function detectMimeFromMagicBytes(buf: Buffer): string | null {
  if (buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) {
    return 'image/jpeg';
  }
  if (
    buf.length >= 8 &&
    buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47 &&
    buf[4] === 0x0d && buf[5] === 0x0a && buf[6] === 0x1a && buf[7] === 0x0a
  ) {
    return 'image/png';
  }
  if (
    buf.length >= 12 &&
    buf.toString('ascii', 0, 4) === 'RIFF' &&
    buf.toString('ascii', 8, 12) === 'WEBP'
  ) {
    return 'image/webp';
  }
  if (buf.length >= 4 && buf.toString('ascii', 0, 4) === '%PDF') {
    return 'application/pdf';
  }
  return null;
}

/** Signatures d'exécutables connues — rejet absolu même avec une extension "propre". */
function looksExecutable(buf: Buffer): boolean {
  if (buf.length >= 2 && buf[0] === 0x4d && buf[1] === 0x5a) return true; // MZ (PE Windows)
  if (buf.length >= 4 && buf[0] === 0x7f && buf.toString('ascii', 1, 4) === 'ELF') return true; // ELF
  if (buf.length >= 2 && buf[0] === 0x23 && buf[1] === 0x21) return true; // #! shebang
  if (buf.length >= 4 && buf.readUInt32BE(0) === 0xcafebabe) return true; // Java class / Mach-O fat
  if (buf.length >= 4 && (buf.readUInt32LE(0) === 0xfeedface || buf.readUInt32LE(0) === 0xfeedfacf)) return true; // Mach-O
  return false;
}

function fileExtension(name: string): string {
  const idx = name.lastIndexOf('.');
  return idx >= 0 ? name.slice(idx + 1).toLowerCase() : '';
}

// Cohérence extension ↔ MIME réel détecté.
const EXT_FOR_MIME: Record<string, string[]> = {
  'image/jpeg': ['jpg', 'jpeg'],
  'image/png': ['png'],
  'image/webp': ['webp'],
  'application/pdf': ['pdf'],
};

export type StoredProof = {
  filePath: string;    // chemin relatif ex: private-uploads/<uuid>-<ts>.png
  storedName: string;  // nom sécurisé (UUID + timestamp)
  originalName: string;
  mimeType: string;    // MIME réel détecté par magic bytes
  sizeBytes: number;
  fileHash: string;    // SHA-256 hex
};

/**
 * Valide puis stocke une preuve de paiement dans private-uploads/.
 * Lève ProofError (message en français, affichable) si le fichier est refusé.
 */
export async function validateAndStoreProof(file: File): Promise<StoredProof> {
  const originalName = (file.name || 'preuve').slice(0, 255);
  const ext = fileExtension(originalName);

  if (FORBIDDEN_EXTENSIONS.has(ext)) {
    throw new ProofError('Type de fichier interdit. Formats acceptés : JPG, PNG, WEBP ou PDF.');
  }
  if (!ALLOWED_EXTENSIONS.has(ext)) {
    throw new ProofError('Format non accepté. Formats autorisés : JPG, JPEG, PNG, WEBP ou PDF.');
  }
  if (file.size === 0) {
    throw new ProofError('Le fichier est vide.');
  }
  if (file.size > PROOF_MAX_BYTES) {
    throw new ProofError('Fichier trop volumineux : 5 Mo maximum.');
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  if (buffer.length > PROOF_MAX_BYTES) {
    throw new ProofError('Fichier trop volumineux : 5 Mo maximum.');
  }
  if (looksExecutable(buffer)) {
    throw new ProofError('Fichier refusé : contenu exécutable détecté.');
  }

  const mimeType = detectMimeFromMagicBytes(buffer);
  if (!mimeType) {
    throw new ProofError(
      'Contenu du fichier non reconnu. Le fichier doit être une véritable image (JPG, PNG, WEBP) ou un PDF.'
    );
  }
  if (!EXT_FOR_MIME[mimeType].includes(ext)) {
    throw new ProofError("L'extension du fichier ne correspond pas à son contenu réel.");
  }

  const fileHash = createHash('sha256').update(buffer).digest('hex');
  const storedName = `${randomUUID()}-${Date.now()}.${ext}`;

  await mkdir(PROOFS_DIR, { recursive: true });
  await writeFile(path.join(PROOFS_DIR, storedName), buffer);

  return {
    filePath: path.posix.join('private-uploads', storedName),
    storedName,
    originalName,
    mimeType,
    sizeBytes: buffer.length,
    fileHash,
  };
}

/**
 * Lit une preuve stockée à partir de son nom sécurisé (jamais depuis un chemin client).
 * Protection anti path-traversal : seul le nom de fichier est utilisé, résolu dans PROOFS_DIR.
 */
export async function readStoredProof(storedName: string): Promise<Buffer> {
  const safeName = path.basename(storedName); // neutralise ../
  return readFile(path.join(PROOFS_DIR, safeName));
}
