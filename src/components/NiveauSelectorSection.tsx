'use client';
import { useState } from 'react';
import NiveauSelector from './NiveauSelector';
import { DEFAULT_PRICE_GRID, fcfaToUsd, type Classe, type Niveau } from '@/lib/pricing';

interface Props {
  classeDoc: Classe;
}

export default function NiveauSelectorSection({ classeDoc }: Props) {
  const [niveau, setNiveau] = useState<Niveau>('standard');

  const grid = DEFAULT_PRICE_GRID[classeDoc];
  const prices: Record<Niveau, { fcfa: number; usd: number }> = {
    standard: { fcfa: grid.standard, usd: fcfaToUsd(grid.standard) },
    pro:      { fcfa: grid.pro,      usd: fcfaToUsd(grid.pro) },
    expert:   { fcfa: grid.expert,   usd: fcfaToUsd(grid.expert) },
  };

  return (
    <>
      <p style={{ fontWeight: 600, marginBottom: 4 }}>Choisissez votre niveau de service :</p>
      <NiveauSelector
        classeDoc={classeDoc}
        prices={prices}
        selected={niveau}
        onSelect={setNiveau}
      />
      {/* Champ caché transmis au formulaire enfant via URL au moment de la soumission */}
      <input type="hidden" name="niveau" value={niveau} />
    </>
  );
}
