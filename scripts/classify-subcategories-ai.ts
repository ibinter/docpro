// Classement IA des modèles restés en sous-catégorie « autres ».
// Haiku classe par lots de 40 (nom + description) parmi les sous-catégories
// de la catégorie du lot. Idempotent : ne traite que subcategory='autres' ;
// un code invalide ou un refus de l'IA laisse « autres ».
// Usage (VPS, avec ANTHROPIC_API_KEY) : npx tsx scripts/classify-subcategories-ai.ts
import { prisma } from '../src/lib/db';
import { SOUS_CATEGORIES } from '../src/lib/subcategories';

const LOT = 40;
const CONCURRENCE = 4;
const MODEL = 'claude-haiku-4-5-20251001';

interface Item { code: string; name: string; description: string | null }

async function classerLot(category: string, items: Item[], client: InstanceType<typeof import('@anthropic-ai/sdk').default>): Promise<Map<string, string>> {
  const subs = SOUS_CATEGORIES[category] ?? [];
  if (subs.length === 0) return new Map();

  const prompt = `Tu classes des modèles de documents dans des sous-catégories.
Catégorie : ${category}
Sous-catégories autorisées (utilise EXACTEMENT ces codes) :
${subs.map(s => `- ${s.code} : ${s.label}`).join('\n')}
- autres : uniquement si vraiment aucune ne convient

Documents à classer :
${items.map(i => JSON.stringify({ code: i.code, nom: i.name, desc: (i.description ?? '').slice(0, 120) })).join('\n')}

Réponds UNIQUEMENT avec un tableau JSON, sans texte autour :
[{"code":"<code du document>","sub":"<code de sous-catégorie>"}]`;

  const res = await client.messages.create({
    model: MODEL,
    max_tokens: 3000,
    messages: [{ role: 'user', content: prompt }],
  });

  const raw = res.content[0]?.type === 'text' ? res.content[0].text.trim() : '';
  const clean = raw.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim();

  const out = new Map<string, string>();
  try {
    const arr = JSON.parse(clean) as { code?: string; sub?: string }[];
    const valides = new Set(subs.map(s => s.code));
    for (const a of arr) {
      if (typeof a.code === 'string' && typeof a.sub === 'string' && valides.has(a.sub)) {
        out.set(a.code, a.sub);
      }
    }
  } catch {
    console.warn(`  [${category}] lot illisible — ${items.length} modèles laissés en autres`);
  }
  return out;
}

async function main() {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('ANTHROPIC_API_KEY manquant.');
    process.exit(1);
  }
  const Anthropic = (await import('@anthropic-ai/sdk')).default;
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const restants = await prisma.documentTemplate.findMany({
    where: { subcategory: 'autres' },
    select: { code: true, name: true, description: true, category: true },
    orderBy: { category: 'asc' },
  });
  console.log(`${restants.length} modèles en « autres » à classer par IA.`);

  // Lots par catégorie
  const lots: { category: string; items: Item[] }[] = [];
  const parCat = new Map<string, Item[]>();
  for (const t of restants) {
    if (!parCat.has(t.category)) parCat.set(t.category, []);
    parCat.get(t.category)!.push(t);
  }
  for (const [category, items] of parCat) {
    for (let i = 0; i < items.length; i += LOT) {
      lots.push({ category, items: items.slice(i, i + LOT) });
    }
  }
  console.log(`${lots.length} lots de ${LOT} max (concurrence ${CONCURRENCE}).`);

  let classes = 0, traites = 0;
  // Traitement par vagues de CONCURRENCE lots
  for (let i = 0; i < lots.length; i += CONCURRENCE) {
    const vague = lots.slice(i, i + CONCURRENCE);
    const resultats = await Promise.all(
      vague.map(l => classerLot(l.category, l.items, client).catch(e => {
        console.warn(`  [${l.category}] erreur API :`, e instanceof Error ? e.message : e);
        return new Map<string, string>();
      }))
    );
    for (let j = 0; j < vague.length; j++) {
      for (const [code, sub] of resultats[j]) {
        await prisma.documentTemplate.updateMany({ where: { code }, data: { subcategory: sub } });
        classes++;
      }
      traites += vague[j].items.length;
    }
    console.log(`  ${traites}/${restants.length} traités — ${classes} classés`);
  }

  const finaux = await prisma.documentTemplate.count({ where: { subcategory: 'autres' } });
  const total = await prisma.documentTemplate.count();
  console.log(`✓ Terminé : ${classes} classés par IA. Restent ${finaux} en autres (${Math.round((finaux / total) * 100)} %).`);
  await prisma.$disconnect();
}
main();
