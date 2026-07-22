// Seed ADDITIF des packs groupés (CDC §6.2) — n'écrase rien d'autre.
// Exécution : npx tsx prisma/seed-packs.ts
// Un pack = un Plan code PACK_*, durée 365 jours (accès aux documents du pack
// pendant 1 an), featuresJson = { isPack: true, templates: [...], description }.
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const PACKS = [
  {
    code: 'PACK_ENTREPRISE',
    name: "Pack Création d'entreprise",
    description:
      'Tout pour lancer votre société : statuts SARL, accord de confidentialité, contrat de travail CDI et facture professionnelle. Accès 1 an.',
    price: 9000,
    templates: ['statuts_sarl', 'nda', 'contrat_travail_cdi', 'facture_pro'],
    displayOrder: 20,
  },
  {
    code: 'PACK_EMPLOI',
    name: "Pack Recherche d'emploi",
    description:
      'CV professionnel, lettre de motivation et demande de stage : le trio complet du candidat. Accès 1 an.',
    price: 1500,
    templates: ['cv_pro', 'lettre_motivation', 'demande_stage'],
    displayOrder: 21,
  },
];

async function main() {
  for (const pack of PACKS) {
    // Vérification (informative) que les templates référencés existent.
    const found = await prisma.documentTemplate.findMany({
      where: { code: { in: pack.templates } },
      select: { code: true, price: true, priceMax: true },
    });
    const foundCodes = new Set(found.map((t) => t.code));
    const missing = pack.templates.filter((c) => !foundCodes.has(c));
    if (missing.length > 0) {
      console.warn(`⚠ ${pack.code} : templates introuvables en base : ${missing.join(', ')}`);
    }
    const unitSum = found.reduce((sum, t) => sum + (t.priceMax ?? t.price), 0);

    const data = {
      name: pack.name,
      description: pack.description,
      active: true,
      displayOrder: pack.displayOrder,
      price: pack.price,
      currency: 'XOF',
      durationType: 'days',
      durationValue: 365,
      maxUsers: 1,
      maxEntities: 1,
      docsPerMonth: null as number | null,
      storageMb: 1024,
      trialDays: 0,
      featuresJson: JSON.stringify({
        isPack: true,
        templates: pack.templates,
        description: pack.description,
      }),
    };

    const plan = await prisma.plan.upsert({
      where: { code: pack.code },
      update: data,
      create: { code: pack.code, ...data },
    });

    console.log(
      `✔ ${plan.code} — « ${plan.name} » : ${plan.price} FCFA ` +
        `(valeur unitaire max ${unitSum} FCFA, ${pack.templates.length} documents, accès 365 jours)`
    );
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('Seed des packs terminé.');
  })
  .catch(async (e) => {
    console.error('Seed des packs en échec :', e);
    await prisma.$disconnect();
    process.exit(1);
  });
