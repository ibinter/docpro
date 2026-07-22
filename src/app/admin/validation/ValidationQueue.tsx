'use client';
// File de validation manuelle — consomme les API construites par l'agent paiement manuel :
//   GET  /api/manual-payments/admin/queue
//   GET  /api/manual-payments/admin/proof/[proofId]
//   POST /api/manual-payments/admin/[transactionId]/validate | reject | request-info | flag | provisional
import { useCallback, useEffect, useState } from 'react';
import { formatMoney } from '@/lib/money';

// ── Types tolérants : la forme exacte de la file vient d'un autre module ──
type AnyRec = Record<string, unknown>;

type QueueItem = {
  id: string;
  internalRef: string;
  externalRef: string | null;
  provider: string;
  method: string;
  status: string;
  amountExpected: number | null;
  amountDeclared: number | null;
  currency: string;
  createdAt: string | null;
  clientName: string;
  clientEmail: string;
  country: string;
  orderNumber: string;
  planName: string;
  proofs: { id: string; name: string }[];
  alerts: { type: string; severity: string; message: string }[];
};

function str(v: unknown): string {
  return typeof v === 'string' ? v : '';
}
function num(v: unknown): number | null {
  return typeof v === 'number' && Number.isFinite(v) ? v : null;
}
function rec(v: unknown): AnyRec {
  return v && typeof v === 'object' && !Array.isArray(v) ? (v as AnyRec) : {};
}
function arr(v: unknown): AnyRec[] {
  return Array.isArray(v) ? (v as AnyRec[]) : [];
}

/** Normalise un élément de la file quelle que soit sa forme exacte. */
function normalize(raw: AnyRec): QueueItem {
  const tx = 'transaction' in raw ? rec(raw.transaction) : raw;
  const order = rec(tx.order ?? raw.order);
  const user = rec(tx.user ?? raw.user ?? order.user);
  const plan = rec(order.plan ?? raw.plan);
  const proofsRaw = arr(tx.proofs ?? raw.proofs);
  const alertsRaw = arr(raw.alerts ?? raw.fraudAlerts ?? tx.fraudAlerts ?? tx.alerts);
  return {
    id: str(tx.id ?? raw.id ?? raw.transactionId),
    internalRef: str(tx.internalRef ?? raw.internalRef ?? raw.reference),
    externalRef: str(tx.externalRef ?? raw.externalRef) || null,
    provider: str(tx.provider ?? raw.provider),
    method: str(tx.method ?? raw.method ?? order.paymentMethod),
    status: str(tx.status ?? raw.status),
    amountExpected: num(tx.amountExpected ?? raw.amountExpected ?? order.total),
    amountDeclared: num(tx.amountDeclared ?? raw.amountDeclared),
    currency: str(tx.currency ?? raw.currency ?? order.currency) || 'XOF',
    createdAt: str(tx.createdAt ?? raw.createdAt ?? raw.submittedAt) || null,
    clientName: str(user.name ?? raw.clientName),
    clientEmail: str(user.email ?? raw.clientEmail),
    country: str(user.country ?? order.billingCountry ?? raw.country),
    orderNumber: str(order.number ?? raw.orderNumber),
    planName: str(plan.name ?? raw.planName),
    proofs: proofsRaw
      .map((p) => ({ id: str(p.id ?? p.proofId), name: str(p.originalName ?? p.name) || 'preuve' }))
      .filter((p) => p.id),
    alerts: alertsRaw.map((a) => ({
      type: str(a.type),
      severity: str(a.severity) || 'moyenne',
      message: str(a.message),
    })),
  };
}

type ActionKind = 'validate' | 'reject' | 'request-info' | 'flag-doublon' | 'flag-suspect' | 'provisional';

const ACTION_LABEL: Record<ActionKind, string> = {
  validate: 'Valider le paiement',
  reject: 'Rejeter',
  'request-info': 'Demander un complément',
  'flag-doublon': 'Marquer doublon',
  'flag-suspect': 'Marquer suspect',
  provisional: 'Activation provisoire',
};

export default function ValidationQueue() {
  const [items, setItems] = useState<QueueItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [success, setSuccess] = useState('');
  const [modal, setModal] = useState<{ action: ActionKind; item: QueueItem } | null>(null);
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState('');
  // Champs de formulaire (réinitialisés à l'ouverture)
  const [f, setF] = useState<Record<string, string>>({});

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError('');
    try {
      const res = await fetch('/api/manual-payments/admin/queue');
      const data = (await res.json().catch(() => ({}))) as AnyRec;
      if (!res.ok) throw new Error(str(data.error) || `Erreur ${res.status}`);
      const list = Array.isArray(data)
        ? (data as AnyRec[])
        : arr(data.queue ?? data.items ?? data.transactions ?? data.data);
      setItems(list.map(normalize).filter((i) => i.id));
    } catch (e) {
      setLoadError(e instanceof Error ? e.message : 'Impossible de charger la file');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  function open(action: ActionKind, item: QueueItem) {
    setFormError('');
    setSuccess('');
    setF({
      amountReceived: item.amountDeclared != null ? String(item.amountDeclared) : '',
      currency: item.currency,
      reference: item.externalRef ?? '',
      date: new Date().toISOString().slice(0, 10),
      reason: '',
      message: '',
      days: '7',
    });
    setModal({ action, item });
  }

  async function submit() {
    if (!modal) return;
    const { action, item } = modal;
    let path = '';
    let body: AnyRec = {};
    if (action === 'validate') {
      if (!f.amountReceived || !f.date || !f.reference.trim()) {
        setFormError('Montant reçu, date et référence sont obligatoires.');
        return;
      }
      path = 'validate';
      body = {
        amountReceived: Number(f.amountReceived),
        currency: f.currency,
        reference: f.reference.trim(),
        date: f.date,
      };
    } else if (action === 'reject') {
      if (!f.reason.trim()) {
        setFormError('Le motif de rejet est obligatoire.');
        return;
      }
      path = 'reject';
      body = { reason: f.reason.trim() };
    } else if (action === 'request-info') {
      if (!f.message.trim()) {
        setFormError('Le message au client est obligatoire.');
        return;
      }
      path = 'request-info';
      body = { message: f.message.trim() };
    } else if (action === 'flag-doublon' || action === 'flag-suspect') {
      if (!f.reason.trim()) {
        setFormError('Le motif est obligatoire.');
        return;
      }
      path = 'flag';
      body = { type: action === 'flag-doublon' ? 'doublon' : 'suspect', reason: f.reason.trim() };
    } else if (action === 'provisional') {
      const days = Number(f.days);
      if (!days || days < 1 || days > 7) {
        setFormError('Durée entre 1 et 7 jours (maximum légal CDC §15.2).');
        return;
      }
      if (!f.reason.trim()) {
        setFormError("Le motif de l'activation provisoire est obligatoire.");
        return;
      }
      path = 'provisional';
      body = { days, reason: f.reason.trim() };
    }

    setBusy(true);
    setFormError('');
    try {
      const res = await fetch(`/api/manual-payments/admin/${encodeURIComponent(item.id)}/${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = (await res.json().catch(() => ({}))) as AnyRec;
      if (!res.ok) throw new Error(str(data.error) || `Erreur ${res.status}`);
      setSuccess(`« ${ACTION_LABEL[action]} » effectué pour ${item.internalRef || item.id}.`);
      setModal(null);
      await load();
    } catch (e) {
      setFormError(e instanceof Error ? e.message : "L'action a échoué");
    } finally {
      setBusy(false);
    }
  }

  const input = (key: string, props: Record<string, unknown> = {}) => (
    <input
      className="input"
      value={f[key] ?? ''}
      onChange={(e) => setF((prev) => ({ ...prev, [key]: e.target.value }))}
      {...props}
    />
  );

  return (
    <>
      {success && <div className="alert alert-success">{success}</div>}
      {loadError && (
        <div className="alert alert-danger">
          {loadError}{' '}
          <button className="btn btn-sm btn-outline" onClick={() => void load()}>
            Réessayer
          </button>
        </div>
      )}
      {loading ? (
        <p className="text-muted">Chargement de la file…</p>
      ) : items.length === 0 && !loadError ? (
        <div className="card text-center">
          <p>✅ Aucun paiement en attente de validation.</p>
        </div>
      ) : (
        <div className="grid" style={{ gap: 16 }}>
          {items.map((item) => {
            const ecart =
              item.amountDeclared != null &&
              item.amountExpected != null &&
              item.amountDeclared !== item.amountExpected;
            return (
              <div key={item.id} className="card">
                <div className="flex-between mb-1" style={{ flexWrap: 'wrap' }}>
                  <div>
                    <strong>{item.clientName || item.clientEmail || 'Client inconnu'}</strong>{' '}
                    <span className="text-muted text-small">
                      {item.clientEmail} {item.country && `· ${item.country}`}
                    </span>
                  </div>
                  <span className="badge badge-warning">{item.status || 'à vérifier'}</span>
                </div>
                <div className="grid grid-4 text-small mb-1" style={{ gap: 10 }}>
                  <div>
                    <span className="text-muted">Forfait / commande</span>
                    <br />
                    <strong>{item.planName || '—'}</strong>
                    <br />
                    {item.orderNumber || '—'}
                  </div>
                  <div>
                    <span className="text-muted">Moyen</span>
                    <br />
                    <strong>{item.provider || '—'}</strong>
                    <br />
                    {item.method}
                  </div>
                  <div>
                    <span className="text-muted">Montant attendu vs déclaré</span>
                    <br />
                    <strong>
                      {item.amountExpected != null ? formatMoney(item.amountExpected, item.currency) : '—'}
                    </strong>{' '}
                    vs{' '}
                    <strong style={ecart ? { color: 'var(--danger)' } : undefined}>
                      {item.amountDeclared != null ? formatMoney(item.amountDeclared, item.currency) : '—'}
                    </strong>
                    {ecart && (
                      <>
                        <br />
                        <span className="badge badge-danger">écart de montant</span>
                      </>
                    )}
                  </div>
                  <div>
                    <span className="text-muted">Référence / date</span>
                    <br />
                    <strong>{item.externalRef || item.internalRef || '—'}</strong>
                    <br />
                    {item.createdAt ? new Date(item.createdAt).toLocaleString('fr-FR') : '—'}
                  </div>
                </div>

                {item.alerts.length > 0 && (
                  <div className="mb-1">
                    {item.alerts.map((a, i) => (
                      <span
                        key={i}
                        className={`badge ${a.severity === 'elevee' ? 'badge-danger' : 'badge-warning'}`}
                        style={{ marginRight: 6 }}
                        title={a.message}
                      >
                        ⚠ {a.type.replace(/_/g, ' ')}
                      </span>
                    ))}
                  </div>
                )}

                {item.proofs.length > 0 && (
                  <div className="mb-1 text-small">
                    Preuves :{' '}
                    {item.proofs.map((p) => (
                      <a
                        key={p.id}
                        href={`/api/manual-payments/admin/proof/${encodeURIComponent(p.id)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ marginRight: 10 }}
                      >
                        📄 {p.name}
                      </a>
                    ))}
                  </div>
                )}

                <div className="flex" style={{ flexWrap: 'wrap', marginTop: 8 }}>
                  <button className="btn btn-success btn-sm" onClick={() => open('validate', item)}>
                    ✔ Valider
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => open('reject', item)}>
                    ✖ Rejeter
                  </button>
                  <button className="btn btn-outline btn-sm" onClick={() => open('request-info', item)}>
                    Demander complément
                  </button>
                  <button className="btn btn-ghost btn-sm" onClick={() => open('flag-doublon', item)}>
                    Doublon
                  </button>
                  <button className="btn btn-ghost btn-sm" onClick={() => open('flag-suspect', item)}>
                    Suspect
                  </button>
                  <button className="btn btn-gold btn-sm" onClick={() => open('provisional', item)}>
                    Activation provisoire
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {modal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(13,43,78,0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 300,
            padding: 16,
          }}
          onClick={() => !busy && setModal(null)}
        >
          <div className="card" style={{ maxWidth: 460, width: '100%' }} onClick={(e) => e.stopPropagation()}>
            <div className="card-title">{ACTION_LABEL[modal.action]}</div>
            <p className="text-small text-muted mb-2">
              Transaction {modal.item.internalRef || modal.item.id} — {modal.item.clientEmail}
            </p>
            {formError && <div className="alert alert-danger">{formError}</div>}

            {modal.action === 'validate' && (
              <>
                <div className="field">
                  <label className="label">Montant réel reçu *</label>
                  {input('amountReceived', { type: 'number', min: 0 })}
                </div>
                <div className="field">
                  <label className="label">Devise</label>
                  {input('currency')}
                </div>
                <div className="field">
                  <label className="label">Référence *</label>
                  {input('reference')}
                </div>
                <div className="field">
                  <label className="label">Date de réception *</label>
                  {input('date', { type: 'date' })}
                </div>
              </>
            )}
            {modal.action === 'reject' && (
              <div className="field">
                <label className="label">Motif du rejet (obligatoire) *</label>
                <textarea
                  className="textarea"
                  value={f.reason ?? ''}
                  onChange={(e) => setF((p) => ({ ...p, reason: e.target.value }))}
                />
              </div>
            )}
            {modal.action === 'request-info' && (
              <div className="field">
                <label className="label">Message au client *</label>
                <textarea
                  className="textarea"
                  value={f.message ?? ''}
                  onChange={(e) => setF((p) => ({ ...p, message: e.target.value }))}
                />
              </div>
            )}
            {(modal.action === 'flag-doublon' || modal.action === 'flag-suspect') && (
              <div className="field">
                <label className="label">
                  {modal.action === 'flag-doublon'
                    ? 'Référence de la transaction originale / motif *'
                    : 'Motif de suspicion *'}
                </label>
                <textarea
                  className="textarea"
                  value={f.reason ?? ''}
                  onChange={(e) => setF((p) => ({ ...p, reason: e.target.value }))}
                />
              </div>
            )}
            {modal.action === 'provisional' && (
              <>
                <div className="field">
                  <label className="label">Durée (jours, max 7) *</label>
                  {input('days', { type: 'number', min: 1, max: 7 })}
                </div>
                <div className="field">
                  <label className="label">Motif (obligatoire) *</label>
                  <textarea
                    className="textarea"
                    value={f.reason ?? ''}
                    onChange={(e) => setF((p) => ({ ...p, reason: e.target.value }))}
                  />
                </div>
                <div className="alert alert-warning text-small">
                  L’activation provisoire n’est jamais automatique. À l’échéance sans confirmation des
                  fonds, la licence sera suspendue par la tâche planifiée (CDC §15.2).
                </div>
              </>
            )}

            <div className="flex" style={{ justifyContent: 'flex-end' }}>
              <button className="btn btn-ghost" disabled={busy} onClick={() => setModal(null)}>
                Annuler
              </button>
              <button className="btn btn-primary" disabled={busy} onClick={() => void submit()}>
                {busy ? 'Traitement…' : 'Confirmer'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
