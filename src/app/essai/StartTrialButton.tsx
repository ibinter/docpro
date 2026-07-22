'use client';
// Bouton de démarrage d'essai gratuit — appelle POST /api/trial/start puis redirige vers /compte.
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function StartTrialButton({ planId, trialDays }: { planId: string; trialDays: number }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function start() {
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/trial/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string; redirect?: string };
      if (!res.ok) throw new Error(data.error || `Erreur ${res.status}`);
      router.push(data.redirect || '/compte');
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Impossible de démarrer l’essai.');
      setBusy(false);
    }
  }

  return (
    <div>
      <button type="button" className="btn btn-gold" style={{ width: '100%' }} onClick={start} disabled={busy}>
        {busy ? 'Activation…' : `Démarrer mes ${trialDays} jours gratuits`}
      </button>
      {error && <div className="alert alert-danger mt-1" role="alert">{error}</div>}
    </div>
  );
}
