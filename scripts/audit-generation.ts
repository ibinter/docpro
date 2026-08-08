// ─────────────────────────────────────────────────────────────────────────────
// Audit de la chaîne de génération, exécuté côté serveur.
//
// Produit un vrai document via le moteur réel (IA + contrôle qualité), puis
// MESURE le résultat au lieu de le supposer : nombre de sections, longueur de
// chacune, score qualité, et surtout conformité au pays — présence d'OHADA
// dans un pays non membre, devise erronée, lois d'un autre pays.
//
// Écrit aussi le PDF et le DOCX pour inspection visuelle.
//
// Usage (sur le VPS, variables d'environnement chargées) :
//   npx tsx scripts/audit-generation.ts <code_modele> <PAYS> <niveau>
//   npx tsx scripts/audit-generation.ts ohada_sarl_statuts CI standard
//   npx tsx scripts/audit-generation.ts ohada_sarl_statuts MA standard
// ─────────────────────────────────────────────────────────────────────────────
import { writeFileSync } from 'fs';
import { prisma } from '../src/lib/db';
import { parseFields } from '../src/lib/docgen';
import { generateDocumentJson } from '../src/lib/ai/docgen-v2';
import { generateDocumentPdf } from '../src/lib/docgen/document-pdf';
import { generateDocx } from '../src/lib/docgen/formats';
import { DROIT_PAYS } from '../src/lib/ai/legal-countries';
import type { Classe, Niveau } from '../src/lib/pricing';

const OHADA = new Set(['BJ','BF','CM','CF','KM','CG','CI','CD','GA','GN','GW','GQ','ML','NE','SN','TD','TG']);

/** Devises citées à tort selon le pays.
 *  XOF et XAF partagent le même libellé « FCFA » : les distinguer par le texte
 *  est impossible, ils forment donc une seule famille (voir MEME_FAMILLE). */
const MARQUEURS_DEVISE: Record<string, RegExp> = {
  XOF: /\bFCFA\b|francs? CFA/i,
  XAF: /\bFCFA\b|francs? CFA/i,
  MAD: /\bdirhams?\b|\bMAD\b/i,
  DZD: /\bdinars? alg/i,
  TND: /\bdinars? tunisien/i,
  EUR: /\beuros?\b|€/i,
  GNF: /francs? guin|\bGNF\b/i,
  CDF: /francs? congolais|\bCDF\b/i,
  CHF: /francs? suisses?|\bCHF\b/i,
  CAD: /dollars? canadien/i,
  USD: /dollars? am|\bUSD\b/i,
};

function deviseCode(pays: string): string {
  const d = DROIT_PAYS[pays]?.devise ?? '';
  const m = d.match(/\(([A-Z]{3})\)/);
  return m ? m[1] : '';
}

async function main() {
  const [code, pays = 'CI', niveauArg = 'standard'] = process.argv.slice(2);
  if (!code) {
    console.error('Usage : npx tsx scripts/audit-generation.ts <code_modele> <PAYS> <niveau>');
    process.exit(1);
  }
  const niveau = niveauArg as Niveau;

  const tpl = await prisma.documentTemplate.findUnique({ where: { code } });
  if (!tpl) { console.error(`Modèle introuvable : ${code}`); process.exit(1); }

  console.log(`\n═══ ${tpl.name} — ${DROIT_PAYS[pays]?.nom ?? pays} — niveau ${niveau} ═══\n`);

  const fields = parseFields(tpl.fieldsJson);
  const t0 = Date.now();
  const res = await generateDocumentJson({
    templateName: tpl.name,
    templateDescription: tpl.description ?? '',
    templateBody: tpl.body,
    fields,
    answers: {},
    country: pays,
    classe: (tpl.classe as Classe) ?? 'B',
    niveau,
    category: tpl.category,
  });

  if (!res) { console.error('ÉCHEC de la génération.'); process.exit(1); }
  const secondes = Math.round((Date.now() - t0) / 1000);

  // ── Mesures de complétude ────────────────────────────────────────────
  const sections = res.json.sections;
  const mots = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;
  const total = sections.reduce((n, s) => n + mots(s.contenu), 0);
  const courtes = sections.filter((s) => mots(s.contenu) < 120);

  // Cible de densité annoncée au modèle selon le niveau.
  const CIBLE: Record<string, number> = { standard: 200, pro: 320, expert: 500 };
  const cible = CIBLE[niveau] ?? 200;
  const sousCible = sections.filter((s) => mots(s.contenu) < cible);

  console.log(`Durée            : ${secondes} s (modèle ${res.model})`);
  console.log(`Score qualité    : ${res.qcScore ?? 'non évalué'}/100`);
  console.log(
    `Contrôle qualité : ${res.qcIssues.length} problème(s) signalé(s), ` +
    `${res.qcApplied} correction(s) appliquée(s)` +
    `${res.qcRejected ? `, ${res.qcRejected} rejetée(s)` : ''}`
  );
  if (res.qcIssues.length > res.qcApplied) {
    console.log(`ALERTE ${res.qcIssues.length - res.qcApplied} problème(s) signalé(s) mais NON corrigé(s) — livrés au client`);
  }
  if (res.qcIssues.length) console.log(`Problèmes relevés: ${res.qcIssues.join(' | ')}`);
  console.log(`Sections         : ${sections.length}`);
  console.log(`Mots au total    : ${total} (moyenne ${Math.round(total / sections.length)} par section)`);
  console.log(`${sousCible.length ? 'ALERTE' : 'OK    '} densité : ${sousCible.length}/${sections.length} section(s) sous la cible de ${cible} mots`);
  console.log(`${courtes.length ? 'ALERTE' : 'OK    '} plancher : ${courtes.length} section(s) sous 120 mots`);
  console.log('\nDétail des sections :');
  for (const s of sections) {
    const n = mots(s.contenu);
    console.log(`  ${n < cible ? '·' : ' '} ${String(n).padStart(4)} mots  ${s.titre}`);
  }

  // ── Conformité au pays ───────────────────────────────────────────────
  const texte = [
    res.json.titre,
    ...sections.map((s) => `${s.titre} ${s.contenu}`),
    ...(res.json.clauses_speciales ?? []),
  ].join('\n');

  console.log('\n── Conformité au pays ──');
  const estOhada = OHADA.has(pays);
  const citeOhada = /OHADA|Acte uniforme|AUDCG|AUSCGIE|AUPSRVE|CCJA/i.test(texte);
  if (estOhada) {
    console.log(`${citeOhada ? 'OK    ' : 'ALERTE'} pays OHADA : références aux Actes uniformes ${citeOhada ? 'présentes' : 'ABSENTES'}`);
  } else {
    console.log(`${citeOhada ? 'ALERTE' : 'OK    '} pays NON OHADA : ${citeOhada ? 'Actes uniformes CITÉS À TORT' : 'aucune référence OHADA'}`);
  }

  const attendue = deviseCode(pays);
  if (attendue && MARQUEURS_DEVISE[attendue]) {
    const bonne = MARQUEURS_DEVISE[attendue].test(texte);
    console.log(`${bonne ? 'OK    ' : 'ALERTE'} devise ${attendue} ${bonne ? 'employée' : 'ABSENTE du document'}`);
  }
  // XOF et XAF s'écrivent tous deux « FCFA » : un document ivoirien correct
  // déclencherait une fausse alerte XAF. On ne compare donc qu'entre familles.
  const MEME_FAMILLE: Record<string, string> = { XOF: 'CFA', XAF: 'CFA' };
  const familleAttendue = MEME_FAMILLE[attendue] ?? attendue;
  for (const [dev, re] of Object.entries(MARQUEURS_DEVISE)) {
    const famille = MEME_FAMILLE[dev] ?? dev;
    if (famille !== familleAttendue && re.test(texte)) {
      console.log(`ALERTE devise étrangère détectée : ${dev}`);
    }
  }

  const placeholders = texte.match(/_{3,}|\[à compléter\]|\bXXX+\b|à définir/gi);
  console.log(`${placeholders ? 'ALERTE' : 'OK    '} placeholders : ${placeholders ? placeholders.length + ' trouvé(s)' : 'aucun'}`);

  // ── Fichiers produits ────────────────────────────────────────────────
  const base = `audit-${code}-${pays}-${niveau}`;
  const pdf = await generateDocumentPdf({
    titre: res.json.titre, templateName: tpl.name,
    contentJson: JSON.stringify(res.json), contentHtml: res.html,
    pays, createdAt: new Date(), verifyCode: 'AUDIT-0001',
    verifyUrl: 'https://docpro.ibigsoft.com/verify/AUDIT-0001',
    watermarkId: 'audit', branding: null,
  });
  writeFileSync(`${base}.pdf`, pdf);

  const docx = await generateDocx({
    title: res.json.titre, contentHtml: res.html,
    contentJson: JSON.stringify(res.json), templateName: tpl.name,
    createdAt: new Date(), verifyCode: 'AUDIT-0001',
    verifyUrl: 'https://docpro.ibigsoft.com/verify/AUDIT-0001', branding: null,
  });
  writeFileSync(`${base}.docx`, docx);

  console.log(`\nFichiers : ${base}.pdf (${Math.round(pdf.length / 1024)} Ko) · ${base}.docx (${Math.round(docx.length / 1024)} Ko)`);
  await prisma.$disconnect();
}
main();
