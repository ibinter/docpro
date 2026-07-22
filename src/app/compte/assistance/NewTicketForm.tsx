'use client';
// Formulaire de création de ticket — POST /api/support/tickets puis redirection vers le fil.
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewTicketForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('facturation');
  const [body, setBody] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!subject.trim() || !body.trim()) {
      setError('Le sujet et le message sont obligatoires.');
      return;
    }
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/support/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject: subject.trim(), category, body: body.trim() }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string; id?: string };
      if (!res.ok) throw new Error(data.error || `Erreur ${res.status}`);
      router.push(`/compte/assistance/${data.id}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Création du ticket échouée.');
      setBusy(false);
    }
  }

  if (!open) {
    return (
      <button type="button" className="btn btn-primary" onClick={() => setOpen(true)}>
        + Nouveau ticket
      </button>
    );
  }

  return (
    <form onSubmit={submit} className="card mt-2 mb-2" style={{ width: '100%' }}>
      <div className="card-title">Nouvelle demande d&apos;assistance</div>
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      <div className="field">
        <label className="label" htmlFor="ticket-subject">Sujet</label>
        <input
          id="ticket-subject"
          className="input"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          maxLength={200}
          placeholder="Ex. : paiement débité mais licence non activée"
          required
        />
      </div>
      <div className="field">
        <label className="label" htmlFor="ticket-category">Catégorie</label>
        <select id="ticket-category" className="select" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="facturation">Facturation</option>
          <option value="technique">Technique</option>
          <option value="autre">Autre</option>
        </select>
      </div>
      <div className="field">
        <label className="label" htmlFor="ticket-body">Votre message</label>
        <textarea
          id="ticket-body"
          className="textarea"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          maxLength={5000}
          placeholder="Décrivez votre demande (référence de commande, moyen de paiement, date…)"
          required
        />
        <p className="form-hint">
          Pour une demande de facturation, indiquez si possible le numéro de commande (CMD-…) et la référence de transaction.
        </p>
      </div>
      <div className="flex">
        <button type="submit" className="btn btn-primary" disabled={busy}>
          {busy ? 'Envoi…' : 'Envoyer la demande'}
        </button>
        <button type="button" className="btn btn-ghost" onClick={() => setOpen(false)} disabled={busy}>
          Annuler
        </button>
      </div>
    </form>
  );
}
