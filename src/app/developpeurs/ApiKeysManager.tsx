'use client';
// Gestion des clés API : génération (clé claire montrée UNE seule fois) + révocation.
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export type ApiKeyRow = {
  id: string;
  label: string;
  prefix: string;
  active: boolean;
  callCount: number;
  lastUsedAt: string | null;
  createdAt: string;
};

function formatDate(iso: string | null): string {
  if (!iso) return 'Jamais';
  const d = new Date(iso);
  return new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium', timeStyle: 'short' }).format(d);
}

export default function ApiKeysManager({ keys }: { keys: ApiKeyRow[] }) {
  const router = useRouter();
  const [label, setLabel] = useState('');
  const [creating, setCreating] = useState(false);
  const [revoking, setRevoking] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [newKey, setNewKey] = useState<{ key: string; label: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const createKey = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setCreating(true);
    try {
      const res = await fetch('/api/apikeys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ label }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.key) throw new Error(data.error || 'Création de la clé impossible.');
      setNewKey({ key: data.key, label: data.label });
      setCopied(false);
      setLabel('');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inattendue.');
    } finally {
      setCreating(false);
    }
  };

  const revoke = async (id: string) => {
    if (!window.confirm('Révoquer cette clé ? Les appels API avec cette clé seront immédiatement refusés.')) return;
    setError(null);
    setRevoking(id);
    try {
      const res = await fetch('/api/apikeys', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Révocation impossible.');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inattendue.');
    } finally {
      setRevoking(null);
    }
  };

  const copy = async () => {
    if (!newKey) return;
    try {
      await navigator.clipboard.writeText(newKey.key);
      setCopied(true);
    } catch {
      /* presse-papiers indisponible — la clé reste affichée */
    }
  };

  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>}

      {newKey && (
        <div className="alert alert-warning">
          <strong>⚠️ Copiez votre clé maintenant — elle ne sera plus jamais affichée.</strong>
          <p className="text-small mt-1">
            Clé « {newKey.label} » — seule son empreinte (hash) est conservée sur nos serveurs.
          </p>
          <div className="flex mt-1" style={{ flexWrap: 'wrap' }}>
            <code
              style={{
                background: 'var(--white)', padding: '8px 12px', borderRadius: 6,
                fontFamily: 'ui-monospace, Consolas, monospace', fontSize: '0.9rem',
                wordBreak: 'break-all', border: '1px solid #E0C097',
              }}
            >
              {newKey.key}
            </code>
            <button type="button" className="btn btn-sm btn-primary" onClick={copy}>
              {copied ? '✓ Copiée' : '📋 Copier'}
            </button>
            <button type="button" className="btn btn-sm btn-ghost" onClick={() => setNewKey(null)}>
              J&apos;ai copié ma clé, masquer
            </button>
          </div>
        </div>
      )}

      <form onSubmit={createKey} className="flex mb-3" style={{ flexWrap: 'wrap', alignItems: 'flex-end' }}>
        <div style={{ flex: '1 1 260px' }}>
          <label className="label" htmlFor="apikey-label">Libellé de la nouvelle clé</label>
          <input
            id="apikey-label"
            className="input"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Ex. : Intégration site RH, environnement de test…"
            maxLength={80}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={creating || !label.trim()}>
          {creating ? 'Génération…' : '🔑 Générer une clé'}
        </button>
      </form>

      {keys.length === 0 ? (
        <p className="text-muted">Aucune clé API pour le moment. Générez votre première clé ci-dessus.</p>
      ) : (
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Clé</th>
                <th>Libellé</th>
                <th>Statut</th>
                <th>Appels</th>
                <th>Dernier usage</th>
                <th>Créée le</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {keys.map((k) => (
                <tr key={k.id}>
                  <td>
                    <code style={{ fontFamily: 'ui-monospace, Consolas, monospace' }}>{k.prefix}…</code>
                  </td>
                  <td>{k.label}</td>
                  <td>
                    {k.active ? (
                      <span className="badge badge-success">Active</span>
                    ) : (
                      <span className="badge badge-danger">Révoquée</span>
                    )}
                  </td>
                  <td>{k.callCount}</td>
                  <td className="text-small">{formatDate(k.lastUsedAt)}</td>
                  <td className="text-small">{formatDate(k.createdAt)}</td>
                  <td>
                    {k.active && (
                      <button
                        type="button"
                        className="btn btn-sm btn-danger"
                        onClick={() => revoke(k.id)}
                        disabled={revoking === k.id}
                      >
                        {revoking === k.id ? '…' : 'Révoquer'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
