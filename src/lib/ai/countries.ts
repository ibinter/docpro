// ─────────────────────────────────────────────────────────────
// IBIG DocPro — Adaptation pays (CDC §6.2 : Adaptation Légale)
// Liste des pays proposés au questionnaire + contexte légal
// injecté dans les prompts IA (OHADA, Code du travail local…).
// ─────────────────────────────────────────────────────────────

export type DocumentCountry = { code: string; name: string };

/** Pays proposés dans le sélecteur « Pays du document ». */
export const DOCUMENT_COUNTRIES: DocumentCountry[] = [
  { code: 'CI', name: "Côte d'Ivoire" },
  { code: 'SN', name: 'Sénégal' },
  { code: 'CM', name: 'Cameroun' },
  { code: 'BF', name: 'Burkina Faso' },
  { code: 'ML', name: 'Mali' },
  { code: 'TG', name: 'Togo' },
  { code: 'BJ', name: 'Bénin' },
  { code: 'NE', name: 'Niger' },
  { code: 'GN', name: 'Guinée' },
  { code: 'GA', name: 'Gabon' },
  { code: 'CG', name: 'Congo' },
  { code: 'CD', name: 'RD Congo' },
  { code: 'MA', name: 'Maroc' },
  { code: 'DZ', name: 'Algérie' },
  { code: 'TN', name: 'Tunisie' },
  { code: 'FR', name: 'France' },
  { code: 'BE', name: 'Belgique' },
  { code: 'CH', name: 'Suisse' },
  { code: 'CA', name: 'Canada' },
  { code: 'US', name: 'États-Unis' },
];

/** États membres de l'OHADA (droit des affaires harmonisé). */
const OHADA = new Set([
  'BJ', 'BF', 'CM', 'CF', 'KM', 'CG', 'CI', 'CD', 'GA', 'GN', 'GW', 'GQ', 'ML', 'NE', 'SN', 'TD', 'TG',
]);

/** Nom français d'un pays (ou son code s'il est inconnu). */
export function countryName(code: string | null | undefined): string {
  if (!code) return 'non précisé';
  const found = DOCUMENT_COUNTRIES.find((c) => c.code === code.toUpperCase());
  return found ? found.name : code.toUpperCase();
}

/** Code pays valide (ISO-2) présent dans notre liste, sinon null. */
export function normalizeCountry(code: unknown): string | null {
  if (typeof code !== 'string') return null;
  const up = code.trim().toUpperCase();
  return DOCUMENT_COUNTRIES.some((c) => c.code === up) ? up : null;
}

/**
 * Fragment de prompt (français) demandant l'adaptation des références
 * légales au pays du document — CDC §6.2 « Adaptation Légale Automatique ».
 */
export function legalContextFr(code: string | null | undefined): string {
  if (!code) return '';
  const name = countryName(code);
  const ohada = OHADA.has(code.toUpperCase())
    ? ` Ce pays est membre de l'OHADA : privilégie les références aux Actes uniformes OHADA pour le droit des affaires, et au Code du travail local pour le droit du travail.`
    : ` Utilise les références légales locales appropriées (Code du travail, Code civil ou équivalents en vigueur dans ce pays).`;
  return `Adapte les références légales, administratives et culturelles au pays du document : ${name} (${code.toUpperCase()}).${ohada}`;
}
