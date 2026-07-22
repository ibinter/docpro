import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const excel = await prisma.documentTemplate.count({ where: { templateType: 'excel', active: true } });
  const pdf = await prisma.documentTemplate.count({ where: { templateType: 'pdf', active: true } });
  console.log(`PDF: ${pdf} | Excel: ${excel} | Total: ${pdf + excel}`);

  // Par catégorie
  const byCat = await prisma.documentTemplate.groupBy({
    by: ['category', 'templateType'],
    where: { active: true },
    _count: { id: true },
    orderBy: { _count: { id: 'desc' } },
  });
  console.log('\nExcel par catégorie:');
  byCat.filter(r => r.templateType === 'excel')
       .sort((a,b) => b._count.id - a._count.id)
       .forEach(r => console.log(`  ${r.category}: ${r._count.id}`));

  // Exemples
  const ex = await prisma.documentTemplate.findMany({
    where: { templateType: 'excel', active: true },
    select: { code: true, name: true, category: true },
    take: 15,
    orderBy: { popularity: 'desc' },
  });
  console.log('\nExemples Excel (top 15):');
  ex.forEach(e => console.log(`  [${e.category}] ${e.name}`));
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
