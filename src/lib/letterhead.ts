// ─────────────────────────────────────────────────────────────────────────────
// Papier en-tête des organisations — stockage et lecture.
//
// Même principe que les preuves de paiement : les fichiers vivent hors de
// public/, ne sont jamais servis en URL directe et ne sont lus que côté serveur
// au moment de composer le PDF.
// ─────────────────────────────────────────────────────────────────────────────
import { mkdir, readFile, writeFile, unlink } from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';

export const LETTERHEAD_DIR = path.join(process.cwd(), 'private-uploads', 'letterheads');

const TAILLE_MAX = 3 * 1024 * 1024; // 3 Mo
const TYPES = new Set(['image/png', 'image/jpeg']);

/** Signatures binaires : le type déclaré par le navigateur ne fait pas foi. */
function typeReel(buf: Buffer): 'png' | 'jpeg' | null {
  if (buf.length > 8 && buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return 'png';
  if (buf.length > 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return 'jpeg';
  return null;
}

export class LetterheadError extends Error {}

/** Valide puis stocke un papier en-tête. Retourne le nom de fichier à mémoriser. */
export async function storeLetterhead(file: File): Promise<string> {
  if (!file || file.size === 0) throw new LetterheadError('Aucun fichier reçu.');
  if (file.size > TAILLE_MAX) {
    throw new LetterheadError('Fichier trop volumineux : 3 Mo maximum.');
  }
  if (file.type && !TYPES.has(file.type)) {
    throw new LetterheadError('Format accepté : PNG ou JPEG uniquement.');
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const reel = typeReel(buffer);
  if (!reel) {
    throw new LetterheadError("Ce fichier n'est pas une image PNG ou JPEG valide.");
  }

  await mkdir(LETTERHEAD_DIR, { recursive: true });
  const nom = `${randomUUID()}.${reel === 'png' ? 'png' : 'jpg'}`;
  await writeFile(path.join(LETTERHEAD_DIR, nom), buffer);
  return nom;
}

/** Lit un papier en-tête stocké. Retourne null si absent ou nom invalide. */
export async function readLetterhead(nom: string | null | undefined): Promise<Buffer | null> {
  if (!nom || !/^[A-Za-z0-9._-]{4,120}$/.test(nom) || nom.includes('..')) return null;
  try {
    return await readFile(path.join(LETTERHEAD_DIR, path.basename(nom)));
  } catch {
    return null;
  }
}

/** Supprime un papier en-tête (remplacement ou retrait). Silencieux si absent. */
export async function deleteLetterhead(nom: string | null | undefined): Promise<void> {
  if (!nom || !/^[A-Za-z0-9._-]{4,120}$/.test(nom)) return;
  try {
    await unlink(path.join(LETTERHEAD_DIR, path.basename(nom)));
  } catch {
    /* déjà absent */
  }
}
