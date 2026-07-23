// Grille tarifaire — configurable en base (CDC §5)
// 1 USD = 600 FCFA (taux de référence UEMOA, maj trimestrielle)
export const USD_RATE = 600; // FCFA par USD

export type Classe = 'A' | 'B' | 'C';
export type Niveau = 'standard' | 'pro' | 'expert';

// Grille par défaut (valeurs en FCFA, min 100 max 50 000)
export const DEFAULT_PRICE_GRID: Record<Classe, Record<Niveau, number>> = {
  A: { standard: 100,  pro: 500,   expert: 2000  },
  B: { standard: 500,  pro: 2000,  expert: 8000  },
  C: { standard: 1500, pro: 5000,  expert: 25000 },
};

export function fcfaToUsd(fcfa: number): number {
  return fcfa / USD_RATE;
}

export function formatFcfa(amount: number): string {
  return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
}

export function formatUsd(fcfa: number): string {
  const usd = fcfaToUsd(fcfa);
  if (usd < 0.01) return '< $0.01';
  return '$' + usd.toFixed(2);
}

export function formatDual(fcfa: number): string {
  return formatFcfa(fcfa) + ' · ' + formatUsd(fcfa);
}

export function getPrice(classe: Classe, niveau: Niveau, grid?: Record<Classe, Record<Niveau, number>>): number {
  return (grid ?? DEFAULT_PRICE_GRID)[classe][niveau];
}

// Paliers de recharge avec bonus (CDC §6)
export const RECHARGE_TIERS = [
  { amount: 2000,   receive: 2000,   bonusPct: 0 },
  { amount: 5000,   receive: 5750,   bonusPct: 15 },
  { amount: 20000,  receive: 24000,  bonusPct: 20 },
  { amount: 100000, receive: 130000, bonusPct: 30 },
];

// Max tokens selon classe + niveau (CDC §7)
// Haiku max = 8192 ; Sonnet 5 / Opus 4.8 = 64 000
export const MAX_TOKENS: Record<Classe, Record<Niveau, number>> = {
  A: { standard: 7000,  pro: 20000, expert: 32000 },
  B: { standard: 7000,  pro: 24000, expert: 40000 },
  C: { standard: 7000,  pro: 32000, expert: 64000 },
};

// Modèle IA selon niveau (CDC §7)
export const MODEL_BY_NIVEAU: Record<Niveau, string> = {
  standard: 'claude-haiku-4-5-20251001',
  pro:      'claude-sonnet-5',
  expert:   'claude-opus-4-8',
};
