import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Préfixes → nouvelle catégorie (order matters: more specific first)
const RECLASSIFY: Array<{ prefixes: string[]; newCategory: string; label: string }> = [
  {
    label: 'Comptabilité & Audit',
    newCategory: 'comptabilite_audit',
    prefixes: [
      'audit_', 'aud2_', 'cpt_', 'ctrl_', 'sysc_', 'fisc2_', 'fisc3_', 'fisc_',
      'fis_', 'fis2_', 'tva_',
    ],
  },
  {
    label: 'Finance & Banque',
    newCategory: 'finance_banque',
    prefixes: [
      'bank_', 'brvm_', 'banq2_', 'banq3_', 'cap_', 'mfi_', 'bdet_', 'cred_', 'pe2_',
      'fin_', 'fin2_', 'fin3_', 'fin4_', 'fin5_', 'fin6_',
    ],
  },
  {
    label: 'Informatique & Tech',
    newCategory: 'informatique_tech',
    prefixes: [
      'ia_', 'ia2_', 'it_', 'it2_', 'telco_', 'telco2_', 'bloc_', 'num2_',
      'sat_', 'sat2_', 'drone_', 'inf3_', 'inf5_', 'trans_', 'cyber_',
      'rgpd_', 'rgpd2_', 'sec2_', 'sec3_',
    ],
  },
  {
    label: 'Gestion & Management',
    newCategory: 'gestion_management',
    prefixes: [
      'strat_', 'proj_', 'proj2_', 'pmo_', 'cons2_', 'crise_', 'gest_',
      'innov_', 'start_', 'qual_', 'rh2_', 'esg_', 'csp_',
    ],
  },
];

async function main() {
  console.log('=== RECLASSIFICATION DES TEMPLATES ===\n');

  let totalMoved = 0;

  for (const rule of RECLASSIFY) {
    let moved = 0;
    for (const prefix of rule.prefixes) {
      const result = await prisma.documentTemplate.updateMany({
        where: {
          code: { startsWith: prefix },
          category: { notIn: [rule.newCategory] },
        },
        data: { category: rule.newCategory },
      });
      if (result.count > 0) {
        console.log(`  ${prefix} → ${rule.newCategory} : ${result.count} templates`);
        moved += result.count;
      }
    }
    console.log(`✓ ${rule.label} : ${moved} templates déplacés\n`);
    totalMoved += moved;
  }

  // Bilan final
  const groups = await prisma.documentTemplate.groupBy({
    by: ['category'],
    _count: { id: true },
    orderBy: { _count: { id: 'desc' } },
  });

  console.log('=== BILAN FINAL PAR CATEGORIE ===');
  let total = 0;
  for (const g of groups) {
    console.log(`  ${g.category}: ${g._count.id}`);
    total += g._count.id;
  }
  console.log(`\nTOTAL: ${total} | Déplacés: ${totalMoved}`);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
