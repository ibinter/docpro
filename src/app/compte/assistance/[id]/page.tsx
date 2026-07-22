// Fil d'un ticket d'assistance (espace client) — messages admin stylés différemment.
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { fmtDateTime } from '../../ui/status';
import { TicketBadge, ticketCategoryLabel } from '../ticket-ui';
import ReplyForm from './ReplyForm';

export const dynamic = 'force-dynamic';

export default async function TicketPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await getSessionUser();
  if (!user) redirect('/connexion');
  const { id } = await params;

  const ticket = await prisma.supportTicket.findUnique({
    where: { id },
    include: { messages: { orderBy: { createdAt: 'asc' } } },
  });
  if (!ticket || ticket.userId !== user.id) notFound();

  return (
    <div>
      <p className="mb-1">
        <Link href="/compte/assistance">← Retour à l&apos;assistance</Link>
      </p>
      <div className="flex-between mb-2" style={{ flexWrap: 'wrap' }}>
        <h1>{ticket.subject}</h1>
        <span className="flex" style={{ gap: 8 }}>
          <span className="badge badge-neutral">{ticketCategoryLabel(ticket.category)}</span>
          <TicketBadge status={ticket.status} />
        </span>
      </div>

      <div style={{ display: 'grid', gap: 12 }}>
        {ticket.messages.map((m) => (
          <div
            key={m.id}
            className="card"
            style={
              m.fromAdmin
                ? { borderLeft: '4px solid var(--cobalt)', background: '#F3F8FE', marginRight: 40 }
                : { borderLeft: '4px solid var(--gold)', marginLeft: 40 }
            }
          >
            <div className="flex-between mb-1">
              <strong style={{ color: m.fromAdmin ? 'var(--cobalt)' : 'var(--navy)' }}>
                {m.fromAdmin ? 'Support IBIG DocPro' : 'Vous'}
              </strong>
              <span className="text-small text-muted">{fmtDateTime(m.createdAt)}</span>
            </div>
            <p style={{ whiteSpace: 'pre-wrap' }}>{m.body}</p>
          </div>
        ))}
      </div>

      {ticket.status === 'ferme' ? (
        <div className="alert alert-info mt-2">
          Ce ticket est fermé. Besoin d&apos;aide à nouveau ?{' '}
          <Link href="/compte/assistance">Créez un nouveau ticket</Link>.
        </div>
      ) : (
        <ReplyForm ticketId={ticket.id} />
      )}
    </div>
  );
}
