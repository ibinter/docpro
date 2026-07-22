import { readFileSync, writeFileSync } from 'fs';
const file = 'src/app/(public)/catalogue/page.tsx';
let text = readFileSync(file, 'utf8');
// Remplacer le regex corrompu par unicode escapes purs
text = text.replace(
  /return s\.normalize\('NFD'\)\.replace\(\/\[.*?\]\/g, ''\)\.toLowerCase\(\);/,
  "return s.normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').toLowerCase();"
);
writeFileSync(file, text, 'utf8');
const check = text.split('\n').find(l => l.includes("normalize('NFD')"));
console.log('Résultat:', check?.trim());
