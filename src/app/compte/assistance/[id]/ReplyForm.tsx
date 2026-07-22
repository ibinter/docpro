'use client';
// Réponse à un ticket — POST /api/support/tickets/[id]/messages puis rafraîchissement du fil.
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ReplyForm({ ticketId }: { ticketId: string }) {
  const router = useRouter();
  const [body, setBody] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!body.trim()) {
      setError('Le message est vide.');
      return;
    }
    setBusy(true);
    setError('');
    try {
      const res = await fetch(`/api/support/tickets/${ticketId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body: body.trim() }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error || `Erreur ${res.status}`);
      setBody('');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Envoi échoué.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="card mt-2">
      <div className="card-title">Répondre</div>
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      <div className="field">
        <textarea
          className="textarea"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          maxLength={5000}
          placeholder="Votre message…"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary" disabled={busy}>
        {busy ? 'Envoi…' : 'Envoyer'}
      </button>
    </form>
  );
}
