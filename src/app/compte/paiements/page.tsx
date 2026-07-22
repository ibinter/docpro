// Historique des paiements — commandes + transactions, filtrable (statut, période).
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { formatMoney } from '@/lib/money';
import { OrderBadge, fmtDateTime, paymentMethodLabel } from '../ui/status';

export const dynamic = 'force-dynamic';

const ORDER_STATUSES: [string, string][] = [
  ['en_attente_paiement', 'En attente de paiement'],
  ['paiement_en_cours', 'Paiement en cours'],
  ['preuve_soumise', 'Preuve soumise'],
  ['a_verifier', 'À vérifier'],
  ['informations_manquantes', 'Informations manquantes'],
  ['payee', 'Payée'],
  ['expiree', 'Expirée'],
  ['annulee', 'Annulée'],
  ['rejetee', 'Rejetée'],
  ['remboursee', 'Remboursée'],
];

export default async function PaiementsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const user = await getSessionUser();
  if (!user) redirect('/connexion');

  const sp = await searchParams;
  const status = typeof sp.status === 'string' ? sp.status : '';
  const from = typeof sp.from === 'string' ? sp.from : '';
  const to = typeof sp.to === 'string' ? sp.to : '';

  const where: {
    userId: string;
    status?: string;
    createdAt?: { gte?: Date; lte?: Date };
  } = { userId: user.id };
  if (status) where.status = status;
  if (from || to) {
    where.createdAt = {};
    if (from) where.createdAt.gte = new Date(`${from}T00:00:00`);
    if (to) where.createdAt.lte = new Date(`${to}T23:59:59.999`);
  }

  const orders = await prisma.order.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    include: {
      plan: true,
      transactions: { orderBy: { createdAt: 'desc' } },
    },
  });

  // Libellés des documents achetés à l'unité
  const docIds = orders.map((o) => o.documentId).filter((id): id is string => !!id);
  const docs = docIds.length
    ? await prisma.generatedDocument.findMany({ where: { id: { in: docIds } }, select: { id: true, title: true } })
    : [];
  const docTitle = new Map(docs.map((d) => [d.id, d.title]));

  return (
    <div>
      <h1 className="mb-2">Historique des paiements</h1>

      {/* Filtres */}
      <form method="get" className="card mb-2">
        <div className="grid grid-4" style={{ alignItems: 'end' }}>
          <div>
            <label className="label" htmlFor="status">Statut</label>
            <select id="status" name="status" className="select" defaultValue={status}>
              <option value="">Tous les statuts</option>
              {ORDER_STATUSES.map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label" htmlFor="from">Du</label>
            <input id="from" type="date" name="from" className="input" defaultValue={from} />
          </div>
          <div>
            <label className="label" htmlFor="to">Au</label>
            <input id="to" type="date" name="to" className="input" defaultValue={to} />
          </div>
          <div className="flex">
            <button type="submit" className="btn btn-primary">Filtrer</button>
            {(status || from || to) && (
              <Link href="/compte/paiements" className="btn btn-ghost">Réinitialiser</Link>
            )}
          </div>
        </div>
      </form>

      {orders.length === 0 ? (
        <div className="card text-center" style={{ padding: 40 }}>
          <p className="text-muted">Aucun paiement trouvé pour ces critères.</p>
          <Link href="/tarifs" className="btn btn-outline mt-2">Voir les forfaits</Link>
        </div>
      ) : (
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>N° commande</th>
                <th>Date</th>
                <th>Forfait / Document</th>
                <th>Moyen</th>
                <th>Montant</th>
                <th>Statut</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const lastTx = order.transactions[0];
                const trackingTx = order.transactions.find((t) => t.status === 'a_verifier') ?? lastTx;
                return (
                  <tr key={order.id}>
                    <td><strong>{order.number}</strong></td>
                    <td>{fmtDateTime(order.createdAt)}</td>
                    <td>
                      {order.plan
                        ? order.plan.name
                        : order.documentId
                          ? `Document : ${docTitle.get(order.documentId) ?? 'à l’unité'}`
                          : '—'}
                    </td>
                    <td>{paymentMethodLabel(lastTx?.method ?? order.paymentMethod)}</td>
                    <td><strong>{formatMoney(order.total, order.currency)}</strong></td>
                    <td><OrderBadge status={order.status} /></td>
                    <td>
                      {order.status === 'en_attente_paiement' && (
                        <Link href={`/checkout?order=${order.id}`} className="btn btn-gold btn-sm">Payer</Link>
                      )}
                      {(order.status === 'a_verifier' || order.status === 'preuve_soumise' || order.status === 'informations_manquantes') && trackingTx && (
                        <Link href={`/paiement-manuel/suivi/${trackingTx.id}`} className="btn btn-outline btn-sm">Suivi</Link>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
