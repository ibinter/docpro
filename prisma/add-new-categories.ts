import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const MOVES = [
  {
    label: 'Communication',
    newCategory: 'communication',
    rules: [
      { prefixes: ['pub_', 'rp_', 'media_', 'media2_', 'com2_', 'comm_', 'fm_', 'fm2_'], from: 'commercial' },
    ],
  },
  {
    label: 'QHSE',
    newCategory: 'qhse',
    rules: [
      { prefixes: ['qual_', 'esg_'], from: 'gestion_management' },
      { prefixes: ['sec_'], from: 'commercial' },
    ],
  },
  {
    label: 'Gestion de projet',
    newCategory: 'gestion_projet',
    rules: [
      { prefixes: ['proj_', 'proj2_', 'pmo_', 'crise_'], from: 'gestion_management' },
    ],
  },
  {
    label: 'Entrepreneuriat',
    newCategory: 'entrepreneuriat',
    rules: [
      { prefixes: ['start_', 'innov_'], from: 'gestion_management' },
      { prefixes: ['free_', 'bp_', 'pme_', 'micro_'], from: 'commercial' },
    ],
  },
];

async function main() {
  console.log('=== AJOUT DES NOUVELLES CATEGORIES ===\n');

  for (const move of MOVES) {
    let total = 0;
    for (const rule of move.rules) {
      for (const prefix of rule.prefixes) {
        const r = await prisma.documentTemplate.updateMany({
          where: { code: { startsWith: prefix }, category: rule.from },
          data: { category: move.newCategory },
        });
        if (r.count > 0) {
          console.log(`  ${prefix} (${rule.from}) → ${move.newCategory} : ${r.count}`);
          total += r.count;
        }
      }
    }
    console.log(`✓ ${move.label}: ${total} templates\n`);
  }

  // Bilan final
  const groups = await prisma.documentTemplate.groupBy({
    by: ['category'],
    _count: { id: true },
    orderBy: { _count: { id: 'desc' } },
  });
  console.log('=== BILAN FINAL ===');
  let total = 0;
  for (const g of groups) {
    console.log(`  ${g.category}: ${g._count.id}`);
    total += g._count.id;
  }
  console.log(`\nTOTAL: ${total} | Catégories: ${groups.length}`);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
