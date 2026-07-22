'use client';
// Actions admin sur un ticket — réponse (messages API) + changement de statut (status API, audité).
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const STATUSES: { value: string; label: string }[] = [
  { value: 'ouvert', label: 'Ouvert' },
  { value: 'en_cours', label: 'En cours' },
  { value: 'resolu', label: 'Résolu' },
  { value: 'ferme', label: 'Fermé' },
];

export default function TicketAdminActions({ ticketId, status }: { ticketId: string; status: string }) {
  const router = useRouter();
  const [body, setBody] = useState('');
  const [nextStatus, setNextStatus] = useState(status);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function reply(e: React.FormEvent) {
    e.preventDefault();
    if (!body.trim()) {
      setError('Le message est vide.');
      return;
    }
    setBusy(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch(`/api/support/tickets/${ticketId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body: body.trim() }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error || `Erreur ${res.status}`);
      setBody('');
      setSuccess('Réponse envoyée — le client a été notifié.');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Envoi échoué.');
    } finally {
      setBusy(false);
    }
  }

  async function changeStatus() {
    if (nextStatus === status) return;
    setBusy(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch(`/api/support/tickets/${ticketId}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error || `Erreur ${res.status}`);
      setSuccess('Statut mis à jour et consigné au journal d’audit.');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Changement de statut échoué.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="card mt-2">
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      {success && <div className="alert alert-success" role="status">{success}</div>}

      {status !== 'ferme' && (
        <form onSubmit={reply}>
          <div className="card-title">Répondre au client</div>
          <div className="field">
            <textarea
              className="textarea"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              maxLength={5000}
              placeholder="Votre réponse au client…"
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={busy}>
            {busy ? 'Envoi…' : 'Envoyer la réponse'}
          </button>
        </form>
      )}

      <div className={status !== 'ferme' ? 'mt-3' : undefined}>
        <div className="card-title">Statut du ticket</div>
        <div className="flex" style={{ flexWrap: 'wrap' }}>
          <select
            className="select"
            style={{ maxWidth: 220 }}
            value={nextStatus}
            onChange={(e) => setNextStatus(e.target.value)}
            aria-label="Nouveau statut"
          >
            {STATUSES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
          <button
            type="button"
            className="btn btn-outline"
            onClick={changeStatus}
            disabled={busy || nextStatus === status}
          >
            Appliquer
          </button>
        </div>
        <p className="form-hint">Tout changement de statut est consigné au journal d&apos;audit.</p>
      </div>
    </div>
  );
}
