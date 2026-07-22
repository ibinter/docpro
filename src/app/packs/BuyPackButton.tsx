'use client';
// Bouton « Acheter le pack » — contrat inter-agents existant :
// POST /api/payments/orders { planCode } → { orderId } → /checkout?order=ID.
// (Ne modifie en rien le tunnel de paiement.)
import { useState } from 'react';

export default function BuyPackButton({ planCode, priceLabel }: { planCode: string; priceLabel: string }) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const buy = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/payments/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planCode }),
      });
      if (res.status === 401) {
        window.location.href = `/connexion?next=${encodeURIComponent(`/checkout?plan=${planCode}`)}`;
        return;
      }
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.orderId) {
        throw new Error(
          typeof data.error === 'string' ? data.error : 'Impossible de créer la commande. Réessayez.'
        );
      }
      window.location.href = `/checkout?order=${encodeURIComponent(data.orderId)}`;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur inattendue.');
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>}
      <button
        type="button"
        className="btn btn-gold btn-lg"
        style={{ width: '100%' }}
        onClick={buy}
        disabled={loading}
      >
        {loading ? 'Redirection…' : `🛒 Acheter le pack — ${priceLabel}`}
      </button>
    </div>
  );
}
