'use client';
// Barre d'actions de l'aperçu : Modifier / Payer / Régénérer / Télécharger.
// « Payer » crée une commande via POST /api/payments/orders (contrat inter-agents :
// body {documentId} → réponse {orderId}) puis redirige vers /checkout?order=ORDER_ID.
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ApercuActions({
  documentId,
  templateCode,
  paid,
  priceLabel,
  templateType,
}: {
  documentId: string;
  templateCode: string;
  paid: boolean;
  priceLabel: string;
  templateType?: string;
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [paying, setPaying] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [downloading, setDownloading] = useState<string | null>(null);

  const download = async (format: string) => {
    setError(null);
    setDownloading(format);
    try {
      const res = await fetch(`/api/documents/${documentId}/download?format=${format}`);
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Echec du telechargement (${res.status}).`);
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const ext = format;
      a.download = `document-${documentId}.${ext}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur inattendue lors du telechargement.');
    } finally {
      setDownloading(null);
    }
  };

  const pay = async () => {
    setError(null);
    setPaying(true);
    try {
      const res = await fetch('/api/payments/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documentId }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.orderId) {
        throw new Error(data.error || 'Impossible de créer la commande. Réessayez.');
      }
      window.location.href = `/checkout?order=${encodeURIComponent(data.orderId)}`;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur inattendue.');
      setPaying(false);
    }
  };

  const regenerate = async () => {
    setError(null);
    setRegenerating(true);
    try {
      const res = await fetch(`/api/documents/${documentId}/regenerate`, { method: 'POST' });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'La régénération a échoué.');
      setSuccess('Actualisation en cours…');
      router.refresh();
      setTimeout(() => setSuccess(null), 3000);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur inattendue.');
    } finally {
      setRegenerating(false);
    }
  };

  return (
    <div className="card">
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <div className="flex" style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
        {!paid && (
          <>
            <a href={`/documents/${templateCode}?doc=${documentId}`} className="btn btn-outline">
              ✏️ Modifier
            </a>
            <button type="button" className="btn btn-ghost" onClick={regenerate} disabled={regenerating}>
              {regenerating ? 'Régénération…' : '🔄 Régénérer'}
            </button>
            <button type="button" className="btn btn-gold btn-lg" onClick={pay} disabled={paying}>
              {paying ? 'Redirection…' : `💳 Payer ${priceLabel}`}
            </button>
          </>
        )}
        {paid && templateType === 'excel' && (
          <div style={{ width: '100%' }}>
            <p className="text-muted text-small text-center mb-2">Votre mini-app Excel est prête :</p>
            <div className="flex" style={{ justifyContent: 'center', flexWrap: 'wrap', gap: 10 }}>
              <button type="button" className="btn btn-primary btn-lg" onClick={() => download('xlsx')} disabled={downloading === 'xlsx'}>
                {downloading === 'xlsx' ? 'Téléchargement…' : '📊 Télécharger Excel (.xlsx)'}
              </button>
            </div>
          </div>
        )}
        {paid && templateType !== 'excel' && (
          <div style={{ width: '100%' }}>
            <p className="text-muted text-small text-center mb-2">Choisissez votre format de téléchargement :</p>
            <div className="flex" style={{ justifyContent: 'center', flexWrap: 'wrap', gap: 10 }}>
              <button type="button" className="btn btn-primary btn-lg" onClick={() => download('pdf')} disabled={!!downloading}>
                {downloading === 'pdf' ? 'Téléchargement…' : '📄 PDF (impression)'}
              </button>
              <button type="button" className="btn btn-outline btn-lg" onClick={() => download('docx')} disabled={!!downloading}>
                {downloading === 'docx' ? 'Téléchargement…' : '📝 Word DOCX (modifiable)'}
              </button>
              <button type="button" className="btn btn-outline btn-lg" onClick={() => download('pptx')} disabled={!!downloading}>
                {downloading === 'pptx' ? 'Téléchargement…' : '📊 PowerPoint PPTX'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
