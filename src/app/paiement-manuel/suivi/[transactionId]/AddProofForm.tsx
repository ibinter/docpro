'use client';
// Ajout d'une preuve complémentaire — visible UNIQUEMENT si un complément a été demandé.
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const MAX_BYTES = 5 * 1024 * 1024;

export default function AddProofForm({ transactionId }: { transactionId: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const proof = fd.get('proof');
    if (!(proof instanceof File) || proof.size === 0) {
      setError('Veuillez sélectionner un fichier.');
      return;
    }
    if (proof.size > MAX_BYTES) {
      setError('Fichier trop volumineux : 5 Mo maximum.');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(`/api/manual-payments/${transactionId}/proof`, { method: 'POST', body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError((data as { error?: string }).error ?? 'Une erreur est survenue.');
        setSubmitting(false);
        return;
      }
      router.refresh();
    } catch {
      setError('Connexion impossible. Veuillez réessayer.');
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-2">
      <div className="field">
        <label className="label" htmlFor="proof">Nouvelle preuve (JPG, PNG, WEBP ou PDF — 5 Mo max) *</label>
        <input className="input" id="proof" name="proof" type="file" accept=".jpg,.jpeg,.png,.webp,.pdf" required />
      </div>
      {error ? <div className="alert alert-danger" role="alert">{error}</div> : null}
      <button type="submit" className="btn btn-primary" disabled={submitting}>
        {submitting ? 'Envoi en cours…' : 'Envoyer la preuve complémentaire'}
      </button>
    </form>
  );
}
