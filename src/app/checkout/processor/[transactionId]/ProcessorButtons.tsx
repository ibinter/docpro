'use client';
// Boutons du sandbox : chaque issue déclenche la fabrication d'un webhook signé
// côté serveur (POST /api/payments/simulate), puis redirige vers la page de retour.
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProcessorButtons({
  transactionId,
  orderId,
}: {
  transactionId: string;
  orderId: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function simulate(outcome: 'success' | 'failed' | 'cancelled') {
    setBusy(outcome);
    setError(null);
    try {
      const res = await fetch('/api/payments/simulate', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ transactionId, outcome }),
      });
      const data = (await res.json()) as { redirect?: string; error?: string };
      if (!res.ok) {
        setError(data.error ?? 'Erreur de simulation');
        setBusy(null);
        return;
      }
      router.push(data.redirect ?? `/checkout/retour/${orderId}`);
    } catch {
      setError('Erreur réseau');
      setBusy(null);
    }
  }

  const base: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: 8,
    border: 'none',
    fontWeight: 700,
    fontSize: 15,
    cursor: busy ? 'not-allowed' : 'pointer',
    opacity: busy ? 0.6 : 1,
    marginBottom: 10,
    fontFamily: 'inherit',
  };

  return (
    <div>
      {error && (
        <div style={{ background: '#FEF2F2', color: '#B91C1C', borderRadius: 8, padding: '10px 14px', fontSize: 13, marginBottom: 12 }}>
          {error}
        </div>
      )}
      <button
        style={{ ...base, background: '#059669', color: '#FFFFFF' }}
        disabled={busy !== null}
        onClick={() => simulate('success')}
      >
        {busy === 'success' ? 'Traitement…' : '✓ Payer avec succès'}
      </button>
      <button
        style={{ ...base, background: '#DC2626', color: '#FFFFFF' }}
        disabled={busy !== null}
        onClick={() => simulate('failed')}
      >
        {busy === 'failed' ? 'Traitement…' : '✗ Paiement échoué'}
      </button>
      <button
        style={{ ...base, background: '#F3F4F6', color: '#374151', marginBottom: 0 }}
        disabled={busy !== null}
        onClick={() => simulate('cancelled')}
      >
        {busy === 'cancelled' ? 'Traitement…' : 'Annuler'}
      </button>
    </div>
  );
}
