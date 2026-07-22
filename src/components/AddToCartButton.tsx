'use client';
// Bouton "Ajouter au panier" — appelle POST /api/cart puis met à jour le compteur.
import { useState } from 'react';

interface Props {
  templateId: string;
  compact?: boolean;
}

export default function AddToCartButton({ templateId, compact = false }: Props) {
  const [state, setState] = useState<'idle' | 'loading' | 'added' | 'error'>('idle');

  const add = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setState('loading');
    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ templateId }),
      });
      if (res.status === 401) {
        window.location.href = '/connexion?redirect=/catalogue';
        return;
      }
      setState(res.ok ? 'added' : 'error');
      if (res.ok) setTimeout(() => setState('idle'), 2500);
    } catch {
      setState('error');
      setTimeout(() => setState('idle'), 2500);
    }
  };

  const labels = {
    idle: compact ? '🛒' : '+ Panier',
    loading: '…',
    added: compact ? '✓' : '✓ Ajouté',
    error: compact ? '✕' : 'Erreur',
  };

  return (
    <button
      onClick={add}
      disabled={state === 'loading'}
      className={`btn btn-sm ${state === 'added' ? 'btn-success' : state === 'error' ? 'btn-danger' : 'btn-outline'}`}
      title="Ajouter au panier"
      style={{ minWidth: compact ? 36 : 90 }}
    >
      {labels[state]}
    </button>
  );
}
