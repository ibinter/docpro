// Tâches planifiées — exécution manuelle + historique CronRun (CDC §20.1).
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';
import { StatusBadge, fmtDateTime } from '../../ui';
import CronPanel from './CronPanel';

export const dynamic = 'force-dynamic';

export default async function TachesPage() {
  const me = await getSessionUser();
  if (!me || me.role !== 'superadmin') redirect('/admin');

  const runs = await prisma.cronRun.findMany({ orderBy: { ranAt: 'desc' }, take: 40 });

  return (
    <>
      <h1 className="mb-1">Tâches planifiées</h1>
      <p className="text-muted mb-3">
        Toutes les tâches sont idempotentes : les exécuter plusieurs fois ne produit pas d’effet de bord
        (CDC §20.1). En production, planifiez des appels à <code>/api/cron/run?job=…</code> avec l’en-tête{' '}
        <code>x-cron-key</code>.
      </p>

      <CronPanel />

      <h2 className="mb-2 mt-3">Historique des exécutions</h2>
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr><th>Tâche</th><th>Statut</th><th>Détails</th><th>Exécutée le</th></tr>
          </thead>
          <tbody>
            {runs.length === 0 && (
              <tr><td colSpan={4} className="text-center text-muted">Aucune exécution enregistrée.</td></tr>
            )}
            {runs.map((r) => (
              <tr key={r.id}>
                <td><strong>{r.job}</strong></td>
                <td><StatusBadge status={r.status} /></td>
                <td className="text-small text-muted" style={{ maxWidth: 420, wordBreak: 'break-all' }}>{r.detailsJson ?? '—'}</td>
                <td className="text-small">{fmtDateTime(r.ranAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
