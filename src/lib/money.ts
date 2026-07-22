// Utilitaires monétaires IBIG DocPro
// Devises : XOF (FCFA), XAF, USD, EUR…
// Re-exporte aussi les helpers pricing (FCFA ↔ USD).

export { formatFcfa, formatUsd, formatDual, fcfaToUsd } from './pricing';

const CURRENCY_SYMBOLS: Record<string, string> = {
  XOF: 'FCFA',
  XAF: 'FCFA',
  USD: '$',
  EUR: '€',
  GBP: '£',
  GHS: 'GHS',
  NGN: '₦',
  MAD: 'MAD',
  DZD: 'DZD',
  TND: 'TND',
};

/** Formate un montant avec son symbole de devise. Ex: "2 000 FCFA", "$3.50" */
export function formatMoney(amount: number, currency = 'XOF'): string {
  const symbol = CURRENCY_SYMBOLS[currency] ?? currency;
  const isPrefix = ['$', '€', '£', '₦'].includes(symbol);
  const formatted = new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
  return isPrefix ? `${symbol}${formatted}` : `${formatted} ${symbol}`;
}

/** Génère une référence numérotée. Ex: refNumber('CMD', 42) → "CMD-2026-000042" */
export function refNumber(prefix: string, seq: number): string {
  const year = new Date().getFullYear();
  return `${prefix}-${year}-${String(seq).padStart(6, '0')}`;
}

/** Génère une référence aléatoire. Ex: randomRef('TXN') → "TXN-A3F9B2C1" */
export function randomRef(prefix: string): string {
  const hex = Math.floor(Math.random() * 0xffffffff).toString(16).toUpperCase().padStart(8, '0');
  return `${prefix}-${hex}`;
}
