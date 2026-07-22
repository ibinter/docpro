// Corrige fieldsJson: [...] → fieldsJson: JSON.stringify([...]) dans les seed files
import { readFileSync, writeFileSync } from 'fs';

const files = [
  'prisma/seed-batch-gproj-01.ts',
  'prisma/seed-batch-gproj-02.ts',
  'prisma/seed-batch-qhse-02.ts',
  'prisma/seed-batch-entr-01.ts',
  'prisma/seed-batch-entr-02.ts',
];

for (const f of files) {
  let content = readFileSync(f, 'utf8');
  // Remplace fieldsJson: [ ... ] par fieldsJson: JSON.stringify([ ... ])
  // On cherche fieldsJson: suivi d'un tableau non stringifié
  if (content.includes('fieldsJson: JSON.stringify')) {
    console.log(`${f}: déjà corrigé`);
    continue;
  }
  // Regex pour matcher fieldsJson: [\n...] sur plusieurs lignes
  content = content.replace(/fieldsJson:\s*(\[[\s\S]*?\])\s*(?=\n\s*\})/g, (match, arr) => {
    try {
      // Évalue l'array JS pour le re-stringifier proprement
      const evaluated = eval(arr);
      return `fieldsJson: JSON.stringify(${JSON.stringify(evaluated)})`;
    } catch {
      return `fieldsJson: JSON.stringify(${arr.trim()})`;
    }
  });
  writeFileSync(f, content, 'utf8');
  console.log(`${f}: corrigé`);
}
