// Répare les noms/descriptions de modèles doublement encodés (UTF-8 lu en Latin-1) :
// « mÃ©dia » → « média ». Usage :
//   npx tsx scripts/fix-mojibake.ts          → diagnostic (aucune écriture)
//   npx tsx scripts/fix-mojibake.ts --fix    → applique les corrections
import { prisma } from '../src/lib/db';

const APPLY = process.argv.includes('--fix');

/** Vrai si la chaîne contient des séquences typiques de double encodage UTF-8. */
function isMojibake(s: string): boolean {
  return /Ã[©¨ªàéèêôûîçА-я°]|Ã‰|Ã€|Ã”|Ã‡|â€™|â€œ|â€|â€“|â€”|Å“|Â°|Â«|Â»|Ãª|Ã®|Ã´|Ã»|Ã¯|Ã¢/.test(s);
}

/** Décode une chaîne double-encodée : réinterprète les octets Latin-1 comme UTF-8. */
function demojibake(s: string): string {
  const bytes = Buffer.from(s, 'latin1');
  const decoded = bytes.toString('utf8');
  // Si le décodage produit des caractères de remplacement, on garde l'original.
  return decoded.includes('�') ? s : decoded;
}

async function main() {
  const all = await prisma.documentTemplate.findMany({
    select: { id: true, name: true, description: true },
  });

  let fixed = 0;
  const samples: string[] = [];

  for (const t of all) {
    const nameBad = isMojibake(t.name);
    const descBad = t.description ? isMojibake(t.description) : false;
    if (!nameBad && !descBad) continue;

    const newName = nameBad ? demojibake(t.name) : t.name;
    const newDesc = descBad && t.description ? demojibake(t.description) : t.description;

    // Ne corrige que si le décodage a réellement changé quelque chose et reste du mojibake en moins
    const nameOk = !nameBad || (newName !== t.name && !isMojibake(newName));
    const descOk = !descBad || (newDesc !== t.description && !isMojibake(newDesc ?? ''));

    if (samples.length < 15) samples.push(`${t.name.slice(0, 60)}  →  ${newName.slice(0, 60)}`);

    if (APPLY && (nameOk || descOk)) {
      await prisma.documentTemplate.update({
        where: { id: t.id },
        data: {
          ...(nameOk && nameBad ? { name: newName } : {}),
          ...(descOk && descBad ? { description: newDesc } : {}),
        },
      });
    }
    fixed++;
  }

  console.log(`Modèles avec mojibake : ${fixed} / ${all.length}`);
  console.log(samples.join('\n'));
  console.log(APPLY ? '\n✓ Corrections appliquées.' : '\n(mode diagnostic — relancez avec --fix pour corriger)');
  await prisma.$disconnect();
}
main();
