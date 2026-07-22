import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const groups = await prisma.documentTemplate.groupBy({ by: ['category'], _count: { id: true } });
  groups.sort((a,b) => b._count.id - a._count.id);
  console.log('\n=== TEMPLATES PAR CATEGORIE ===');
  groups.forEach(g => console.log(`${g.category}: ${g._count.id}`));

  // Voir les codes dans commercial_financier pour identifier ce qui doit bouger
  const cf = await prisma.documentTemplate.findMany({
    where: { category: 'commercial_financier' },
    select: { code: true, name: true },
    orderBy: { code: 'asc' },
  });
  console.log(`\n=== commercial_financier (${cf.length} templates) — extrait des préfixes ===`);
  const prefixes = new Map<string, number>();
  for (const t of cf) {
    const prefix = t.code.split('_')[0] + '_';
    prefixes.set(prefix, (prefixes.get(prefix) ?? 0) + 1);
  }
  const sorted = [...prefixes.entries()].sort((a,b) => b[1]-a[1]);
  sorted.forEach(([p, n]) => console.log(`  ${p} × ${n}`));
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
