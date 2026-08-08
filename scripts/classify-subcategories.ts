// Classe les 12 800+ modèles en sous-catégories par règles de mots-clés.
// Idempotent — reclasse tout à chaque exécution (rapide, ~quelques secondes).
// Usage : npx tsx scripts/classify-subcategories.ts
import { prisma } from '../src/lib/db';
import { classifier } from '../src/lib/subcategories';

async function main() {
  const all = await prisma.documentTemplate.findMany({
    select: { id: true, name: true, description: true, category: true, subcategory: true },
  });

  let maj = 0;
  const stats = new Map<string, number>();

  for (const t of all) {
    const sub = classifier(t.category, t.name, t.description);
    stats.set(`${t.category}/${sub}`, (stats.get(`${t.category}/${sub}`) ?? 0) + 1);
    if (t.subcategory !== sub) {
      await prisma.documentTemplate.update({ where: { id: t.id }, data: { subcategory: sub } });
      maj++;
    }
  }

  console.log(`✓ ${maj} modèles mis à jour sur ${all.length}.`);
  const autres = [...stats.entries()].filter(([k]) => k.endsWith('/autres'));
  const totalAutres = autres.reduce((s, [, v]) => s + v, 0);
  console.log(`Répartition « autres » : ${totalAutres} (${Math.round((totalAutres / all.length) * 100)} %)`);
  for (const [k, v] of [...stats.entries()].sort((a, b) => b[1] - a[1]).slice(0, 25)) {
    console.log(`  ${k.padEnd(42)} ${v}`);
  }
  await prisma.$disconnect();
}
main();
