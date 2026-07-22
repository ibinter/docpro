// Liste des pays proposés à l'inscription (codes ISO-2).
// Afrique francophone en priorité (phase 1 du déploiement), puis France et autres.

export type Country = { code: string; name: string };

export const COUNTRIES_AFRIQUE_FR: Country[] = [
  { code: 'BJ', name: 'Bénin' },
  { code: 'BF', name: 'Burkina Faso' },
  { code: 'BI', name: 'Burundi' },
  { code: 'CM', name: 'Cameroun' },
  { code: 'CF', name: 'Centrafrique' },
  { code: 'KM', name: 'Comores' },
  { code: 'CG', name: 'Congo (Brazzaville)' },
  { code: 'CD', name: 'Congo (RDC)' },
  { code: 'CI', name: "Côte d'Ivoire" },
  { code: 'DJ', name: 'Djibouti' },
  { code: 'GA', name: 'Gabon' },
  { code: 'GN', name: 'Guinée' },
  { code: 'GQ', name: 'Guinée équatoriale' },
  { code: 'MG', name: 'Madagascar' },
  { code: 'ML', name: 'Mali' },
  { code: 'MR', name: 'Mauritanie' },
  { code: 'NE', name: 'Niger' },
  { code: 'RW', name: 'Rwanda' },
  { code: 'SN', name: 'Sénégal' },
  { code: 'SC', name: 'Seychelles' },
  { code: 'TD', name: 'Tchad' },
  { code: 'TG', name: 'Togo' },
];

export const COUNTRIES_AUTRES: Country[] = [
  { code: 'DZ', name: 'Algérie' },
  { code: 'MA', name: 'Maroc' },
  { code: 'TN', name: 'Tunisie' },
  { code: 'FR', name: 'France' },
  { code: 'BE', name: 'Belgique' },
  { code: 'CH', name: 'Suisse' },
  { code: 'CA', name: 'Canada' },
  { code: 'GH', name: 'Ghana' },
  { code: 'NG', name: 'Nigéria' },
  { code: 'XX', name: 'Autre pays' },
];

export const ALL_COUNTRY_CODES: string[] = [
  ...COUNTRIES_AFRIQUE_FR,
  ...COUNTRIES_AUTRES,
].map((c) => c.code);
