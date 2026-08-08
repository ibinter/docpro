// Verifie que le garde-fou de fix-accents.ts n accepte QUE des changements
// d accents et d elision — jamais une modification de mot.
function empreinte(s: string): string {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/œ/g, 'oe').replace(/Œ/g, 'OE')
    .replace(/æ/g, 'ae').replace(/Æ/g, 'AE')
    .replace(/['’\s]+/g, '')
    .toLowerCase();
}
const accepte = (orig: string, corr: string) => empreinte(orig) === empreinte(corr);

const cas: { nom: string; orig: string; corr: string; attendu: boolean }[] = [
  // Corrections legitimes
  { nom: 'accents poses', orig: 'Certificat delivre au salarie', corr: 'Certificat délivré au salarié', attendu: true },
  { nom: 'apostrophe typo', orig: "Rapport d'evaluation", corr: 'Rapport d’évaluation', attendu: true },
  { nom: 'cedille + accents', orig: 'Tracabilite des operations', corr: 'Traçabilité des opérations', attendu: true },
  { nom: 'elision (espace)', orig: 'Rapport d Evaluation Immobiliere', corr: 'Rapport d’Évaluation Immobilière', attendu: true },
  { nom: 'ligature oe', orig: 'Maitrise d oeuvre', corr: 'Maîtrise d’œuvre', attendu: true },
  // Modifications interdites
  { nom: 'mot ajoute', orig: 'Contrat de bail', corr: 'Contrat de bail commercial', attendu: false },
  { nom: 'mot supprime', orig: 'Contrat de bail commercial', corr: 'Contrat de bail', attendu: false },
  { nom: 'reformulation', orig: 'Certificat delivre au salarie', corr: 'Attestation remise a l employe', attendu: false },
  { nom: 'faute introduite', orig: 'Convention de preneur', corr: 'Convention de prenier', attendu: false },
  { nom: 'chiffre modifie', orig: 'Bail de 3 ans', corr: 'Bail de 9 ans', attendu: false },
  { nom: 'lettre changee', orig: 'Contrat de vente', corr: 'Contrat de venue', attendu: false },
];

let ko = 0;
for (const c of cas) {
  const r = accepte(c.orig, c.corr);
  const ok = r === c.attendu;
  if (!ok) ko++;
  console.log(`${ok ? 'OK   ' : 'ECHEC'} ${c.nom.padEnd(20)} accepte=${r} (attendu ${c.attendu})`);
}
console.log(ko === 0 ? '\nGarde-fou fiable : tous les cas passent.' : `\n${ko} cas en echec.`);
process.exit(ko === 0 ? 0 : 1);
