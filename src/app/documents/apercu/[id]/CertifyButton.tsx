'use client';
// Bouton d'achat de l'option « Certification blockchain » (+500 FCFA).
// POST /api/blockchain/orders {documentId} → {orderId} → /checkout?order=…
// La certification est déclenchée à la confirmation du paiement (webhook /
// validation manuelle), jamais côté client.
import { useState } from 'react';

export default function CertifyButton({ documentId }: { documentId: string }) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const certify = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/blockchain/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documentId }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.orderId) {
        throw new Error(data.error || 'Impossible de créer la commande de certification. Réessayez.');
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
      <button type="button" className="btn btn-gold" onClick={certify} disabled={loading}>
        {loading ? 'Redirection…' : '🛡️ Certifier ce document (+500 FCFA)'}
      </button>
    </div>
  );
}
