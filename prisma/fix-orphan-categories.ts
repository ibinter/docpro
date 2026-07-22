import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('=== CORRECTION DES CATEGORIES ORPHELINES ===\n');

  // 1. Catégories invalides → bonnes catégories
  const invalidMaps = [
    { from: 'gestion_projet', to: 'gestion_management' },
    { from: 'communication', to: 'commercial_financier' },
  ];
  for (const m of invalidMaps) {
    const r = await prisma.documentTemplate.updateMany({
      where: { category: m.from },
      data: { category: m.to },
    });
    if (r.count > 0) console.log(`  ${m.from} → ${m.to} : ${r.count} templates`);
  }

  // 2. Préfixes mal placés dans commercial_financier
  const prefixMaps = [
    { prefixes: ['ret_'], to: 'finance_banque' },
    { prefixes: ['edu2_'], to: 'academique' },
    { prefixes: ['agro2_'], to: 'agro_environnement' },
    { prefixes: ['san2_'], to: 'sante' },
    { prefixes: ['btp2_'], to: 'btp_construction' },
    { prefixes: ['immo2_'], to: 'immobilier' },
    { prefixes: ['tlog_'], to: 'transport_logistique' },
    { prefixes: ['tech_'], to: 'informatique_tech' },
    { prefixes: ['fit_'], to: 'sante' },
  ];
  for (const m of prefixMaps) {
    for (const prefix of m.prefixes) {
      const r = await prisma.documentTemplate.updateMany({
        where: { code: { startsWith: prefix }, category: 'commercial_financier' },
        data: { category: m.to },
      });
      if (r.count > 0) console.log(`  ${prefix} → ${m.to} : ${r.count} templates`);
    }
  }

  // Bilan
  const groups = await prisma.documentTemplate.groupBy({
    by: ['category'],
    _count: { id: true },
    orderBy: { _count: { id: 'desc' } },
  });
  console.log('\n=== BILAN FINAL ===');
  let total = 0;
  for (const g of groups) {
    console.log(`  ${g.category}: ${g._count.id}`);
    total += g._count.id;
  }
  console.log(`\nTOTAL: ${total}`);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
