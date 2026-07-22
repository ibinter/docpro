import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const r = await prisma.documentTemplate.updateMany({
    where: { category: 'commercial_financier' },
    data: { category: 'commercial' },
  });
  console.log('Renommés:', r.count);
  const check = await prisma.documentTemplate.count({ where: { category: 'commercial' } });
  console.log('Total commercial:', check);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
