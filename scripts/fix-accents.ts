// Restaure les accents et apostrophes des noms et descriptions de modeles.
//
// Deux etapes :
//  1. Apostrophes : guillemet droit entre deux lettres (l"employeur) -> apostrophe.
//     Deterministe, applique directement.
//  2. Accents : les textes desaccentues (delivre, salarie, occupees...) sont
//     confies a Haiku par lots. GARDE-FOU : la correction n est acceptee que si
//     le texte, une fois les accents retires, est STRICTEMENT identique a
//     l original. L IA ne peut donc ni reformuler, ni ajouter, ni supprimer un
//     mot — uniquement reposer des diacritiques.
//
// Usage :
//   npx tsx scripts/fix-accents.ts            (diagnostic, aucune ecriture)
//   npx tsx scripts/fix-accents.ts --fix      (applique)
import { prisma } from '../src/lib/db';

const APPLIQUER = process.argv.includes('--fix');
const LOT = 25;
const CONCURRENCE = 4;
const MODEL = 'claude-haiku-4-5-20251001';

/** Empreinte d un texte, insensible aux diacritiques, aux apostrophes et aux
 *  espaces. Deux textes de meme empreinte n ont pu differer que par des accents
 *  ou une elision (« d Evaluation » -> « d’Évaluation ») : aucune lettre n a
 *  ete ajoutee, retiree ni remplacee. */
function empreinte(s: string): string {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/œ/g, 'oe').replace(/Œ/g, 'OE')
    .replace(/æ/g, 'ae').replace(/Æ/g, 'AE')
    .replace(/['’\s]+/g, '')
    .toLowerCase();
}

/** Guillemet droit encadre de lettres -> apostrophe typographique. */
function corrigerApostrophes(s: string): string {
  return s.replace(/([\p{L}])"([\p{L}])/gu, '$1’$2');
}

/** Mots dont la forme sans accent n est pas un mot francais valide. */
const DESACCENTUE = new RegExp(
  '\\b(' + [
    'delivre', 'delivree', 'delivres', 'delivrees',
    'salarie', 'salariee', 'salaries', 'salariees',
    'societe', 'societes', 'activite', 'activites',
    'securite', 'qualite', 'propriete', 'proprietes',
    'responsabilite', 'conformite', 'integrite', 'fiabilite', 'tracabilite',
    'prealable', 'prealables', 'reglement', 'reglements', 'reglementaire',
    'generale', 'generales', 'detaille', 'detaillee', 'detaillees',
    'periode', 'periodes', 'procedure', 'procedures',
    'realise', 'realisee', 'realisees', 'verifie', 'verifiee',
    'numero', 'numeros', 'echeance', 'echeances',
    'operation', 'operations', 'operationnel',
    'controle', 'controles', 'apres', 'resiliation',
    'creance', 'creances', 'debiteur', 'beneficiaire', 'beneficiaires',
    'interet', 'interets', 'arrete', 'arretee', 'effectue', 'effectuee',
    'occupee', 'occupees', 'modalites', 'caracteristiques',
    'reference', 'references', 'specifique', 'specifiques', 'complementaire',
    'declaration', 'declarations', 'evaluation', 'evaluations',
    'etablissement', 'etablissements', 'duree', 'durees', 'resultat', 'resultats',
    'systeme', 'systemes', 'methode', 'methodes', 'matiere', 'matieres',
    'element', 'elements', 'evenement', 'evenements',
    'necessaire', 'necessaires', 'immediate', 'immediat',
    'represente', 'representee', 'presente', 'presentee',
  ].join('|') + ')\\b', 'i'
);

interface Ligne { code: string; champ: 'name' | 'description'; texte: string }

async function corrigerLot(
  items: Ligne[],
  client: InstanceType<typeof import('@anthropic-ai/sdk').default>,
): Promise<Map<string, string>> {
  const prompt = `Tu restaures UNIQUEMENT les accents et apostrophes de textes francais desaccentues.

REGLES ABSOLUES :
- Ne change AUCUN mot : pas de reformulation, pas d ajout, pas de suppression.
- Tu poses seulement les accents manquants (e -> e/e/e, a -> a, c -> c, etc.)
  et remplaces les apostrophes droites par des apostrophes typographiques.
- Le texte doit rester identique lettre pour lettre, accents mis a part.

Textes a corriger (identifies par "id") :
${items.map((it, i) => JSON.stringify({ id: i, texte: it.texte })).join('\n')}

Reponds UNIQUEMENT par un tableau JSON, sans texte autour :
[{"id":0,"texte":"texte accentue"}]`;

  const res = await client.messages.create({
    model: MODEL,
    max_tokens: 4000,
    messages: [{ role: 'user', content: prompt }],
  });

  const brut = res.content[0]?.type === 'text' ? res.content[0].text.trim() : '';
  const propre = brut.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim();

  const sortie = new Map<string, string>();
  try {
    const arr = JSON.parse(propre) as { id?: number; texte?: string }[];
    for (const a of arr) {
      if (typeof a.id !== 'number' || typeof a.texte !== 'string') continue;
      const src = items[a.id];
      if (!src) continue;
      // GARDE-FOU : seuls accents et elisions ont le droit d avoir change.
      if (empreinte(a.texte) !== empreinte(src.texte)) {
        console.warn(`  rejete (texte modifie) : ${src.code}/${src.champ}`);
        continue;
      }
      sortie.set(`${src.code}|${src.champ}`, a.texte);
    }
  } catch {
    console.warn(`  lot illisible (${items.length} textes conserves tels quels)`);
  }
  return sortie;
}

async function main() {
  const rows = await prisma.documentTemplate.findMany({
    select: { code: true, name: true, description: true },
  });

  // ── Etape 1 : apostrophes (deterministe) ───────────────────────────────
  let apostrophes = 0;
  for (const r of rows) {
    const nom = corrigerApostrophes(r.name);
    const desc = r.description ? corrigerApostrophes(r.description) : r.description;
    if (nom !== r.name || desc !== r.description) {
      apostrophes++;
      if (APPLIQUER) {
        await prisma.documentTemplate.update({
          where: { code: r.code },
          data: { name: nom, description: desc },
        });
      }
    }
  }
  console.log(`Apostrophes : ${apostrophes} modeles ${APPLIQUER ? 'corriges' : 'a corriger'}.`);

  // ── Etape 2 : accents (IA avec garde-fou) ──────────────────────────────
  const aTraiter: Ligne[] = [];
  for (const r of rows) {
    if (DESACCENTUE.test(r.name)) aTraiter.push({ code: r.code, champ: 'name', texte: corrigerApostrophes(r.name) });
    if (r.description && DESACCENTUE.test(r.description)) {
      aTraiter.push({ code: r.code, champ: 'description', texte: corrigerApostrophes(r.description) });
    }
  }
  console.log(`Accents : ${aTraiter.length} textes desaccentues detectes.`);

  if (!APPLIQUER) {
    console.log('\nExemples :');
    for (const l of aTraiter.slice(0, 6)) console.log(` - ${l.code}/${l.champ} : ${l.texte.slice(0, 110)}`);
    console.log('\n(mode diagnostic — relancez avec --fix)');
    await prisma.$disconnect();
    return;
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('ANTHROPIC_API_KEY manquant : etape accents ignoree.');
    await prisma.$disconnect();
    return;
  }
  const Anthropic = (await import('@anthropic-ai/sdk')).default;
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const lots: Ligne[][] = [];
  for (let i = 0; i < aTraiter.length; i += LOT) lots.push(aTraiter.slice(i, i + LOT));

  let corriges = 0;
  for (let i = 0; i < lots.length; i += CONCURRENCE) {
    const vague = lots.slice(i, i + CONCURRENCE);
    const res = await Promise.all(
      vague.map(l => corrigerLot(l, client).catch(e => {
        console.warn('  erreur API :', e instanceof Error ? e.message : e);
        return new Map<string, string>();
      }))
    );
    for (const map of res) {
      for (const [cle, texte] of map) {
        const [code, champ] = cle.split('|');
        await prisma.documentTemplate.update({
          where: { code },
          data: champ === 'name' ? { name: texte } : { description: texte },
        });
        corriges++;
      }
    }
    console.log(`  ${Math.min((i + CONCURRENCE) * LOT, aTraiter.length)}/${aTraiter.length} traites — ${corriges} corriges`);
  }
  console.log(`\n✓ Termine : ${apostrophes} apostrophes + ${corriges} textes reaccentues.`);
  await prisma.$disconnect();
}
main();
