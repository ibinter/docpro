// Liste des licences (CDC §17.2).
import Link from 'next/link';
import type { Prisma } from '@prisma/client';
import { prisma } from '@/lib/db';
import { StatusBadge, fmtDate, qs } from '../ui';

export const dynamic = 'force-dynamic';

const PER_PAGE = 20;
const STATUTS = ['essai', 'en_attente', 'provisoire', 'active', 'grace', 'suspendue', 'expiree', 'resiliee', 'revoquee'];

type SP = Promise<Record<string, string | string[] | undefined>>;

export default async function LicencesPage({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  const v = (k: string) => (typeof sp[k] === 'string' ? (sp[k] as string) : '');
  const statut = v('statut');
  const q = v('q');
  const page = Math.max(1, parseInt(v('page') || '1', 10) || 1);

  const where: Prisma.LicenseWhereInput = {};
  if (statut) where.status = statut;
  if (q) where.user = { email: { contains: q } };

  const [total, licenses] = await Promise.all([
    prisma.license.count({ where }),
    prisma.license.findMany({
      where,
      include: {
        user: { select: { email: true, name: true } },
        plan: { select: { name: true } },
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * PER_PAGE,
      take: PER_PAGE,
    }),
  ]);
  const pages = Math.max(1, Math.ceil(total / PER_PAGE));

  return (
    <>
      <h1 className="mb-2">Licences</h1>
      <form method="get" className="card mb-3">
        <div className="grid grid-3" style={{ gap: 12 }}>
          <div>
            <label className="label">Statut</label>
            <select className="select" name="statut" defaultValue={statut}>
              <option value="">Tous</option>
              {STATUTS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Email client</label>
            <input className="input" name="q" defaultValue={q} placeholder="client@email" />
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <button className="btn btn-primary" type="submit">Filtrer</button>
          </div>
        </div>
      </form>

      <p className="text-muted text-small mb-1">{total} licence(s)</p>
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Forfait</th>
              <th>Statut</th>
              <th>Début</th>
              <th>Fin</th>
              <th>Provisoire jusqu’au</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {licenses.length === 0 && (
              <tr><td colSpan={7} className="text-center text-muted">Aucune licence.</td></tr>
            )}
            {licenses.map((l) => (
              <tr key={l.id}>
                <td>{l.user.name}<br /><span className="text-small text-muted">{l.user.email}</span></td>
                <td>{l.plan.name}</td>
                <td><StatusBadge status={l.status} /></td>
                <td>{fmtDate(l.startDate)}</td>
                <td>{l.endDate ? fmtDate(l.endDate) : 'Perpétuelle'}</td>
                <td>{fmtDate(l.provisionalUntil)}</td>
                <td><Link className="btn btn-outline btn-sm" href={`/admin/licences/${l.id}`}>Détail</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pages > 1 && (
        <div className="flex mt-2" style={{ justifyContent: 'center' }}>
          {page > 1 && (
            <Link className="btn btn-outline btn-sm" href={`/admin/licences${qs({ statut, q, page: page - 1 })}`}>← Précédent</Link>
          )}
          <span className="text-small text-muted">Page {page} / {pages}</span>
          {page < pages && (
            <Link className="btn btn-outline btn-sm" href={`/admin/licences${qs({ statut, q, page: page + 1 })}`}>Suivant →</Link>
          )}
        </div>
      )}
    </>
  );
}
