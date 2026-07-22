// Assistance facturation (CDC §17.1) — liste des tickets de l'utilisateur + création.
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { fmtDateTime } from '../ui/status';
import { TicketBadge, ticketCategoryLabel } from './ticket-ui';
import NewTicketForm from './NewTicketForm';

export const dynamic = 'force-dynamic';

export default async function AssistancePage() {
  const user = await getSessionUser();
  if (!user) redirect('/connexion');

  const tickets = await prisma.supportTicket.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: 'desc' },
    include: { _count: { select: { messages: true } } },
  });

  return (
    <div>
      <div className="flex-between mb-2">
        <h1>Assistance</h1>
        <NewTicketForm />
      </div>
      <p className="text-muted mb-2">
        Une question sur un paiement, une facture ou votre licence ? Ouvrez un ticket : notre
        équipe vous répond directement ici et vous êtes notifié à chaque réponse.
      </p>

      {tickets.length === 0 ? (
        <div className="card text-center" style={{ padding: 40 }}>
          <p className="text-muted">
            Aucune demande d&apos;assistance pour le moment. Utilisez le bouton
            «&nbsp;Nouveau ticket&nbsp;» pour nous contacter.
          </p>
        </div>
      ) : (
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Sujet</th>
                <th>Catégorie</th>
                <th>Statut</th>
                <th>Messages</th>
                <th>Dernière activité</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((t) => (
                <tr key={t.id}>
                  <td><strong>{t.subject}</strong></td>
                  <td>{ticketCategoryLabel(t.category)}</td>
                  <td><TicketBadge status={t.status} /></td>
                  <td>{t._count.messages}</td>
                  <td>{fmtDateTime(t.updatedAt)}</td>
                  <td>
                    <Link className="btn btn-outline btn-sm" href={`/compte/assistance/${t.id}`}>
                      Ouvrir
                    </Link>
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
