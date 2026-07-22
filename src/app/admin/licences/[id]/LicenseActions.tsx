'use client';
// Actions licence — appelle les routes /api/admin/licenses/[id]/… (motif obligatoire partout).
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type ActionId = 'activate' | 'extend' | 'suspend' | 'revoke' | 'convert' | 'fix-dates';

type Props = { licenseId: string; status: string; hasOrder: boolean; isSuperadmin: boolean };

export default function LicenseActions({ licenseId, status, hasOrder, isSuperadmin }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState<ActionId | null>(null);
  const [reason, setReason] = useState('');
  const [days, setDays] = useState('30');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const actions: { id: ActionId; label: string; show: boolean; cls: string }[] = [
    { id: 'activate', label: 'Activer manuellement', show: status !== 'active' && status !== 'revoquee', cls: 'btn-success' },
    { id: 'extend', label: 'Prolonger', show: ['active', 'grace', 'expiree'].includes(status), cls: 'btn-primary' },
    { id: 'convert', label: 'Convertir en définitive', show: status === 'provisoire' && hasOrder, cls: 'btn-gold' },
    { id: 'suspend', label: 'Suspendre', show: !['suspendue', 'revoquee', 'resiliee'].includes(status), cls: 'btn-danger' },
    { id: 'revoke', label: 'Révoquer', show: status !== 'revoquee', cls: 'btn-danger' },
    { id: 'fix-dates', label: 'Corriger les dates (superadmin)', show: isSuperadmin, cls: 'btn-outline' },
  ];

  function toggle(id: ActionId) {
    setError('');
    setSuccess('');
    setReason('');
    setOpen(open === id ? null : id);
  }

  async function submit() {
    if (!open) return;
    if (!reason.trim()) {
      setError('Le motif est obligatoire.');
      return;
    }
    const body: Record<string, unknown> = { reason: reason.trim() };
    if (open === 'extend') {
      const d = parseInt(days, 10);
      if (!d || d < 1) {
        setError('Durée de prolongation invalide.');
        return;
      }
      body.days = d;
    }
    if (open === 'fix-dates') {
      if (!startDate && !endDate) {
        setError('Renseignez au moins une date à corriger.');
        return;
      }
      if (startDate) body.startDate = startDate;
      if (endDate) body.endDate = endDate;
    }
    setBusy(true);
    setError('');
    try {
      const res = await fetch(`/api/admin/licenses/${licenseId}/${open}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error || `Erreur ${res.status}`);
      setSuccess('Action effectuée et consignée au journal d’audit.');
      setOpen(null);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Action échouée');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      {success && <div className="alert alert-success">{success}</div>}
      <div className="flex" style={{ flexWrap: 'wrap' }}>
        {actions.filter((a) => a.show).map((a) => (
          <button key={a.id} className={`btn btn-sm ${a.cls}`} onClick={() => toggle(a.id)}>
            {a.label}
          </button>
        ))}
      </div>

      {open && (
        <div className="mt-2" style={{ borderTop: '1px solid #ECEFF1', paddingTop: 14 }}>
          {error && <div className="alert alert-danger">{error}</div>}
          {open === 'extend' && (
            <div className="field">
              <label className="label">Durée de prolongation (jours) *</label>
              <input className="input" type="number" min={1} value={days} onChange={(e) => setDays(e.target.value)} />
            </div>
          )}
          {open === 'fix-dates' && (
            <>
              <div className="field">
                <label className="label">Nouvelle date de début</label>
                <input className="input" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              </div>
              <div className="field">
                <label className="label">Nouvelle date de fin</label>
                <input className="input" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              </div>
            </>
          )}
          <div className="field">
            <label className="label">Motif (obligatoire) *</label>
            <textarea className="textarea" value={reason} onChange={(e) => setReason(e.target.value)} />
          </div>
          <div className="flex">
            <button className="btn btn-primary btn-sm" disabled={busy} onClick={() => void submit()}>
              {busy ? 'Traitement…' : 'Confirmer'}
            </button>
            <button className="btn btn-ghost btn-sm" disabled={busy} onClick={() => setOpen(null)}>
              Annuler
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
