// Utilisateurs — liste + changement de rôle (superadmin uniquement, audité).
import Link from 'next/link';
import { revalidatePath } from 'next/cache';
import type { Prisma } from '@prisma/client';
import { prisma } from '@/lib/db';
import { getSessionUser, requireRole } from '@/lib/auth';
import { audit } from '@/lib/audit';
import { StatusBadge, fmtDate, qs } from '../ui';

export const dynamic = 'force-dynamic';

const PER_PAGE = 25;
const ROLES = ['client', 'agent', 'admin', 'superadmin'];

async function changeRole(formData: FormData) {
  'use server';
  const admin = await requireRole('superadmin'); // seul le superadmin change les rôles
  const userId = String(formData.get('userId') ?? '');
  const role = String(formData.get('role') ?? '');
  const motif = String(formData.get('motif') ?? '').trim();
  if (!userId || !ROLES.includes(role) || !motif) return;
  if (userId === admin.id) return; // pas d'auto-modification

  const target = await prisma.user.findUnique({ where: { id: userId } });
  if (!target || target.role === role) return;
  await prisma.user.update({ where: { id: userId }, data: { role } });
  await audit({
    actorId: admin.id,
    action: 'user.change_role',
    entityType: 'User',
    entityId: userId,
    before: { role: target.role },
    after: { role },
    reason: motif,
  });
  revalidatePath('/admin/utilisateurs');
}

type SP = Promise<Record<string, string | string[] | undefined>>;

export default async function UtilisateursPage({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  const v = (k: string) => (typeof sp[k] === 'string' ? (sp[k] as string) : '');
  const q = v('q');
  const role = v('role');
  const page = Math.max(1, parseInt(v('page') || '1', 10) || 1);

  const me = await getSessionUser();
  const isSuperadmin = me?.role === 'superadmin';

  const where: Prisma.UserWhereInput = {};
  if (role) where.role = role;
  if (q) where.OR = [{ email: { contains: q } }, { name: { contains: q } }];

  const [total, users] = await Promise.all([
    prisma.user.count({ where }),
    prisma.user.findMany({
      where,
      include: {
        licenses: { orderBy: { createdAt: 'desc' }, take: 1, include: { plan: { select: { name: true } } } },
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * PER_PAGE,
      take: PER_PAGE,
    }),
  ]);
  const pages = Math.max(1, Math.ceil(total / PER_PAGE));

  return (
    <>
      <h1 className="mb-2">Utilisateurs</h1>
      <form method="get" className="card mb-3">
        <div className="grid grid-3" style={{ gap: 12 }}>
          <div>
            <label className="label">Rôle</label>
            <select className="select" name="role" defaultValue={role}>
              <option value="">Tous</option>
              {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Recherche (nom ou email)</label>
            <input className="input" name="q" defaultValue={q} />
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <button className="btn btn-primary" type="submit">Filtrer</button>
          </div>
        </div>
      </form>

      <p className="text-muted text-small mb-1">{total} utilisateur(s)</p>
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Utilisateur</th>
              <th>Pays</th>
              <th>Rôle</th>
              <th>Licence courante</th>
              <th>Inscrit le</th>
              {isSuperadmin && <th>Changer le rôle</th>}
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && (
              <tr><td colSpan={isSuperadmin ? 6 : 5} className="text-center text-muted">Aucun utilisateur.</td></tr>
            )}
            {users.map((u) => {
              const lic = u.licenses[0];
              return (
                <tr key={u.id}>
                  <td>{u.name}<br /><span className="text-small text-muted">{u.email}</span></td>
                  <td>{u.country ?? '—'}</td>
                  <td><span className={`badge ${u.role === 'superadmin' ? 'badge-gold' : u.role === 'admin' ? 'badge-info' : 'badge-neutral'}`}>{u.role}</span></td>
                  <td>
                    {lic ? (
                      <>
                        {lic.plan.name} <StatusBadge status={lic.status} />
                      </>
                    ) : (
                      <span className="text-muted">—</span>
                    )}
                  </td>
                  <td className="text-small">{fmtDate(u.createdAt)}</td>
                  {isSuperadmin && (
                    <td>
                      {u.id === me?.id ? (
                        <span className="text-small text-muted">vous</span>
                      ) : (
                        <form action={changeRole} className="flex" style={{ gap: 6, flexWrap: 'wrap' }}>
                          <input type="hidden" name="userId" value={u.id} />
                          <select className="select" name="role" defaultValue={u.role} style={{ width: 120, padding: '6px 8px' }}>
                            {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                          </select>
                          <input className="input" name="motif" required placeholder="Motif *" style={{ width: 140, padding: '6px 8px' }} />
                          <button className="btn btn-outline btn-sm" type="submit">OK</button>
                        </form>
                      )}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {pages > 1 && (
        <div className="flex mt-2" style={{ justifyContent: 'center' }}>
          {page > 1 && (
            <Link className="btn btn-outline btn-sm" href={`/admin/utilisateurs${qs({ q, role, page: page - 1 })}`}>← Précédent</Link>
          )}
          <span className="text-small text-muted">Page {page} / {pages}</span>
          {page < pages && (
            <Link className="btn btn-outline btn-sm" href={`/admin/utilisateurs${qs({ q, role, page: page + 1 })}`}>Suivant →</Link>
          )}
        </div>
      )}
    </>
  );
}
