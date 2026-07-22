'use client';
// Exécution manuelle des tâches planifiées via /api/cron/run?job=X.
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const JOBS: { id: string; label: string; desc: string }[] = [
  { id: 'expire_orders', label: 'Expiration des commandes', desc: 'Commandes non payées après délai → expirée (reco : toutes les 15 min)' },
  { id: 'trial_end', label: 'Fin des essais gratuits', desc: 'Essais dont la date de fin est dépassée → suspendue + notification (quotidien 00h01)' },
  { id: 'expiry_alerts', label: 'Alertes d’expiration', desc: 'Rappels J-7 / J-3 / J-1 — jamais 2× le même jour (quotidien 08h00)' },
  { id: 'grace', label: 'Périodes de grâce', desc: 'Licences actives échues → grâce 7 jours + notification (quotidien 00h05)' },
  { id: 'suspend_expired', label: 'Suspension post-grâce', desc: 'Fin de grâce → expirée + notification (quotidien 00h10)' },
  { id: 'provisional_expiry', label: 'Expiration des provisoires', desc: 'Provisoires à terme → suspension « fonds non confirmés » (toutes les heures)' },
  { id: 'daily_report', label: 'Rapport financier quotidien', desc: 'Résumé du jour envoyé aux admins — 1 fois par jour (quotidien 06h00)' },
  { id: 'anomaly_scan', label: 'Détection d’anomalies', desc: 'Transactions à vérifier depuis +48 h → alerte admins (quotidien 03h00)' },
  { id: 'all', label: 'Tout exécuter', desc: 'Exécute toutes les tâches séquentiellement' },
];

export default function CronPanel() {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [result, setResult] = useState<{ job: string; ok: boolean; text: string } | null>(null);

  async function run(job: string) {
    setBusy(job);
    setResult(null);
    try {
      const res = await fetch(`/api/cron/run?job=${encodeURIComponent(job)}`, { method: 'POST' });
      const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
      if (!res.ok) throw new Error(typeof data.error === 'string' ? data.error : `Erreur ${res.status}`);
      const payload = job === 'all' ? data.results : data.details;
      setResult({ job, ok: data.ok === true, text: JSON.stringify(payload) });
      router.refresh();
    } catch (e) {
      setResult({ job, ok: false, text: e instanceof Error ? e.message : 'Exécution échouée' });
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="card">
      <div className="card-title">Exécution manuelle</div>
      {result && (
        <div className={`alert ${result.ok ? 'alert-success' : 'alert-danger'}`}>
          <strong>{result.job}</strong> — {result.ok ? 'exécuté' : 'échec'} :{' '}
          <span style={{ wordBreak: 'break-all' }}>{result.text}</span>
        </div>
      )}
      <div className="table-wrap">
        <table className="table">
          <tbody>
            {JOBS.map((j) => (
              <tr key={j.id}>
                <td style={{ width: 220 }}><strong>{j.label}</strong><br /><code className="text-small">{j.id}</code></td>
                <td className="text-small text-muted">{j.desc}</td>
                <td style={{ width: 130 }}>
                  <button
                    className={`btn btn-sm ${j.id === 'all' ? 'btn-gold' : 'btn-primary'}`}
                    disabled={busy !== null}
                    onClick={() => void run(j.id)}
                  >
                    {busy === j.id ? 'En cours…' : 'Exécuter'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
