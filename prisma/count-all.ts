import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const all = await prisma.documentTemplate.count();
  const active = await prisma.documentTemplate.count({ where: { active: true } });
  const inactive = await prisma.documentTemplate.count({ where: { active: false } });
  const excel = await prisma.documentTemplate.count({ where: { templateType: 'excel', active: true } });
  const pdf = await prisma.documentTemplate.count({ where: { templateType: 'pdf', active: true } });
  console.log(`TOTAL (toutes): ${all}`);
  console.log(`ACTIVE:         ${active}`);
  console.log(`INACTIVE:       ${inactive}`);
  console.log(`  dont Excel:   ${excel}`);
  console.log(`  dont PDF:     ${pdf}`);
}
main().catch(console.error).finally(() => prisma.$disconnect());
