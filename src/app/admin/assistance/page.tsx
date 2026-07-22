// Console admin — file des tickets d'assistance (filtre par statut).
import Link from 'next/link';
import type { Prisma } from '@prisma/client';
import { prisma } from '@/lib/db';
import { fmtDateTime, qs } from '../ui';
import { TicketBadge, ticketCategoryLabel, TICKET_STATUSES } from '@/app/compte/assistance/ticket-ui';

export const dynamic = 'force-dynamic';

const PER_PAGE = 20;

type SP = Promise<Record<string, string | string[] | undefined>>;

export default async function AdminAssistancePage({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  const v = (k: string) => (typeof sp[k] === 'string' ? (sp[k] as string) : '');
  const statut = v('statut');
  const page = Math.max(1, parseInt(v('page') || '1', 10) || 1);

  const where: Prisma.SupportTicketWhereInput = {};
  if (statut) where.status = statut;

  const [total, tickets, users] = await Promise.all([
    prisma.supportTicket.count({ where }),
    prisma.supportTicket.findMany({
      where,
      orderBy: { updatedAt: 'desc' },
      skip: (page - 1) * PER_PAGE,
      take: PER_PAGE,
      include: { _count: { select: { messages: true } } },
    }),
    prisma.supportTicket
      .findMany({ where, select: { userId: true }, distinct: ['userId'] })
      .then((rows) =>
        prisma.user.findMany({
          where: { id: { in: rows.map((r) => r.userId) } },
          select: { id: true, name: true, email: true },
        }),
      ),
  ]);
  const userById = new Map(users.map((u) => [u.id, u]));
  const pages = Math.max(1, Math.ceil(total / PER_PAGE));

  return (
    <>
      <h1 className="mb-2">Assistance</h1>
      <form method="get" className="card mb-3">
        <div className="grid grid-3" style={{ gap: 12 }}>
          <div>
            <label className="label">Statut</label>
            <select className="select" name="statut" defaultValue={statut}>
              <option value="">Tous</option>
              {TICKET_STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <button className="btn btn-primary" type="submit">Filtrer</button>
          </div>
        </div>
      </form>

      <p className="text-muted text-small mb-1">{total} ticket(s)</p>
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Sujet</th>
              <th>Catégorie</th>
              <th>Statut</th>
              <th>Messages</th>
              <th>Dernière activité</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tickets.length === 0 && (
              <tr><td colSpan={7} className="text-center text-muted">Aucun ticket.</td></tr>
            )}
            {tickets.map((t) => {
              const u = userById.get(t.userId);
              return (
                <tr key={t.id}>
                  <td>
                    {u ? (
                      <>
                        {u.name}
                        <br />
                        <span className="text-small text-muted">{u.email}</span>
                      </>
                    ) : (
                      <span className="text-muted">{t.userId}</span>
                    )}
                  </td>
                  <td><strong>{t.subject}</strong></td>
                  <td>{ticketCategoryLabel(t.category)}</td>
                  <td><TicketBadge status={t.status} /></td>
                  <td>{t._count.messages}</td>
                  <td>{fmtDateTime(t.updatedAt)}</td>
                  <td>
                    <Link className="btn btn-outline btn-sm" href={`/admin/assistance/${t.id}`}>
                      Traiter
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {pages > 1 && (
        <div className="flex mt-2" style={{ justifyContent: 'center' }}>
          {page > 1 && (
            <Link className="btn btn-outline btn-sm" href={`/admin/assistance${qs({ statut, page: page - 1 })}`}>← Précédent</Link>
          )}
          <span className="text-small text-muted">Page {page} / {pages}</span>
          {page < pages && (
            <Link className="btn btn-outline btn-sm" href={`/admin/assistance${qs({ statut, page: page + 1 })}`}>Suivant →</Link>
          )}
        </div>
      )}
    </>
  );
}
