'use client';
import { useState } from 'react';
import { formatFcfa, formatUsd, type Niveau } from '@/lib/pricing';

interface Props {
  classeDoc: 'A' | 'B' | 'C';
  prices: Record<Niveau, { fcfa: number; usd: number }>;
  onSelect: (niveau: Niveau) => void;
  selected: Niveau;
}

const NIVEAU_INFO = {
  standard: { label: 'Standard',  emoji: '📄', desc: 'Document complet et conforme' },
  pro:      { label: 'Pro',       emoji: '⭐', desc: 'Personnalisé secteur + références' },
  expert:   { label: 'Expert',    emoji: '💎', desc: 'Personnalisé + relecture humaine' },
};

export default function NiveauSelector({ prices, onSelect, selected }: Props) {
  return (
    <div style={{ display: 'flex', gap: 12, margin: '16px 0', flexWrap: 'wrap' }}>
      {(['standard', 'pro', 'expert'] as Niveau[]).map(n => {
        const info = NIVEAU_INFO[n];
        const price = prices[n];
        const isSelected = selected === n;
        return (
          <button
            key={n}
            type="button"
            onClick={() => onSelect(n)}
            style={{
              flex: 1, minWidth: 140,
              padding: '12px 16px',
              border: isSelected ? '2px solid #1565C0' : '2px solid #e0e0e0',
              borderRadius: 8,
              background: isSelected ? '#e8f0fe' : '#fff',
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'all 0.15s',
            }}
          >
            <div style={{ fontSize: '1.4rem' }}>{info.emoji}</div>
            <div style={{ fontWeight: 700, color: '#0D2B4E', marginTop: 4 }}>{info.label}</div>
            <div style={{ fontSize: '.8rem', color: '#555', margin: '4px 0' }}>{info.desc}</div>
            <div style={{ fontWeight: 700, color: '#1565C0' }}>{formatFcfa(price.fcfa)}</div>
            <div style={{ fontSize: '.75rem', color: '#888' }}>{formatUsd(price.fcfa)}</div>
          </button>
        );
      })}
    </div>
  );
}
