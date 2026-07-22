// Console admin — fil d'un ticket : messages, réponse, changement de statut.
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import { fmtDateTime } from '../../ui';
import { TicketBadge, ticketCategoryLabel } from '@/app/compte/assistance/ticket-ui';
import TicketAdminActions from './TicketAdminActions';

export const dynamic = 'force-dynamic';

export default async function AdminTicketPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const ticket = await prisma.supportTicket.findUnique({
    where: { id },
    include: { messages: { orderBy: { createdAt: 'asc' } } },
  });
  if (!ticket) notFound();

  const client = await prisma.user.findUnique({
    where: { id: ticket.userId },
    select: { id: true, name: true, email: true, phone: true, country: true },
  });

  return (
    <>
      <p className="mb-1">
        <Link href="/admin/assistance">← Retour à la file des tickets</Link>
      </p>
      <div className="flex-between mb-2" style={{ flexWrap: 'wrap' }}>
        <h1>{ticket.subject}</h1>
        <span className="flex" style={{ gap: 8 }}>
          <span className="badge badge-neutral">{ticketCategoryLabel(ticket.category)}</span>
          <TicketBadge status={ticket.status} />
        </span>
      </div>

      <div className="card mb-2">
        <div className="card-title">Client</div>
        {client ? (
          <p>
            <strong>{client.name}</strong> — {client.email}
            {client.phone && <> — {client.phone}</>}
            {client.country && <> — {client.country}</>}
            {' · '}
            <Link href={`/admin/utilisateurs?q=${encodeURIComponent(client.email)}`}>Voir la fiche</Link>
          </p>
        ) : (
          <p className="text-muted">Utilisateur introuvable ({ticket.userId}).</p>
        )}
        <p className="text-small text-muted mt-1">
          Ticket créé le {fmtDateTime(ticket.createdAt)} — dernière activité le {fmtDateTime(ticket.updatedAt)}.
        </p>
      </div>

      <div style={{ display: 'grid', gap: 12 }}>
        {ticket.messages.map((m) => (
          <div
            key={m.id}
            className="card"
            style={
              m.fromAdmin
                ? { borderLeft: '4px solid var(--cobalt)', background: '#F3F8FE', marginLeft: 40 }
                : { borderLeft: '4px solid var(--gold)', marginRight: 40 }
            }
          >
            <div className="flex-between mb-1">
              <strong style={{ color: m.fromAdmin ? 'var(--cobalt)' : 'var(--navy)' }}>
                {m.fromAdmin ? 'Équipe support' : client?.name ?? 'Client'}
              </strong>
              <span className="text-small text-muted">{fmtDateTime(m.createdAt)}</span>
            </div>
            <p style={{ whiteSpace: 'pre-wrap' }}>{m.body}</p>
          </div>
        ))}
      </div>

      <TicketAdminActions ticketId={ticket.id} status={ticket.status} />
    </>
  );
}
