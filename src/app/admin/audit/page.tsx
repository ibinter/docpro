// Journal d'audit immuable — lecture seule.
import Link from 'next/link';
import type { Prisma } from '@prisma/client';
import { prisma } from '@/lib/db';
import { fmtDateTime, qs } from '../ui';

export const dynamic = 'force-dynamic';

const PER_PAGE = 30;

type SP = Promise<Record<string, string | string[] | undefined>>;

export default async function AuditPage({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  const v = (k: string) => (typeof sp[k] === 'string' ? (sp[k] as string) : '');
  const action = v('action');
  const entity = v('entity');
  const page = Math.max(1, parseInt(v('page') || '1', 10) || 1);

  const where: Prisma.AuditLogWhereInput = {};
  if (action) where.action = { contains: action };
  if (entity) where.entityType = { contains: entity };

  const [total, logs] = await Promise.all([
    prisma.auditLog.count({ where }),
    prisma.auditLog.findMany({
      where,
      include: { actor: { select: { email: true } } },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * PER_PAGE,
      take: PER_PAGE,
    }),
  ]);
  const pages = Math.max(1, Math.ceil(total / PER_PAGE));

  return (
    <>
      <h1 className="mb-2">Journal d’audit</h1>
      <form method="get" className="card mb-3">
        <div className="grid grid-3" style={{ gap: 12 }}>
          <div>
            <label className="label">Action contient</label>
            <input className="input" name="action" defaultValue={action} placeholder="license., config., fraud.…" />
          </div>
          <div>
            <label className="label">Type d’entité</label>
            <input className="input" name="entity" defaultValue={entity} placeholder="License, Plan, User…" />
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <button className="btn btn-primary" type="submit">Filtrer</button>
          </div>
        </div>
      </form>

      <p className="text-muted text-small mb-1">{total} entrée(s)</p>
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr><th>Date</th><th>Acteur</th><th>Action</th><th>Entité</th><th>Motif</th><th>Avant → Après</th></tr>
          </thead>
          <tbody>
            {logs.length === 0 && (
              <tr><td colSpan={6} className="text-center text-muted">Aucune entrée.</td></tr>
            )}
            {logs.map((l) => (
              <tr key={l.id}>
                <td className="text-small">{fmtDateTime(l.createdAt)}</td>
                <td className="text-small">{l.actor?.email ?? 'Système'}</td>
                <td><strong>{l.action}</strong></td>
                <td className="text-small">{l.entityType}<br /><span className="text-muted">{l.entityId}</span></td>
                <td className="text-small">{l.reason ?? '—'}</td>
                <td className="text-small text-muted" style={{ maxWidth: 340, wordBreak: 'break-all' }}>
                  {l.beforeJson && <>{l.beforeJson}<br /></>}
                  {l.afterJson && <>→ {l.afterJson}</>}
                  {!l.beforeJson && !l.afterJson && '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pages > 1 && (
        <div className="flex mt-2" style={{ justifyContent: 'center' }}>
          {page > 1 && (
            <Link className="btn btn-outline btn-sm" href={`/admin/audit${qs({ action, entity, page: page - 1 })}`}>← Précédent</Link>
          )}
          <span className="text-small text-muted">Page {page} / {pages}</span>
          {page < pages && (
            <Link className="btn btn-outline btn-sm" href={`/admin/audit${qs({ action, entity, page: page + 1 })}`}>Suivant →</Link>
          )}
        </div>
      )}
    </>
  );
}
