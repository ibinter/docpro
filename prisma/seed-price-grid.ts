import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const GRID = [
  { classe: 'A', niveau: 'standard', priceFcfa: 100,   priceUsd: 17  },
  { classe: 'A', niveau: 'pro',      priceFcfa: 500,   priceUsd: 83  },
  { classe: 'A', niveau: 'expert',   priceFcfa: 2000,  priceUsd: 333 },
  { classe: 'B', niveau: 'standard', priceFcfa: 500,   priceUsd: 83  },
  { classe: 'B', niveau: 'pro',      priceFcfa: 2000,  priceUsd: 333 },
  { classe: 'B', niveau: 'expert',   priceFcfa: 8000,  priceUsd: 1333},
  { classe: 'C', niveau: 'standard', priceFcfa: 1500,  priceUsd: 250 },
  { classe: 'C', niveau: 'pro',      priceFcfa: 5000,  priceUsd: 833 },
  { classe: 'C', niveau: 'expert',   priceFcfa: 25000, priceUsd: 4167},
];

async function main() {
  for (const row of GRID) {
    await prisma.priceGrid.upsert({
      where: { classe_niveau: { classe: row.classe, niveau: row.niveau } },
      update: row,
      create: row,
    });
  }
  console.log('✅ PriceGrid initialisée');
}
main().finally(() => prisma.$disconnect());
