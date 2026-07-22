// Factures & reçus — téléchargement PDF (CDC §16.2, §17.1).
import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { formatMoney } from '@/lib/money';
import { fmtDateTime, invoiceTypeLabel } from '../ui/status';

export const dynamic = 'force-dynamic';

export default async function FacturesPage() {
  const user = await getSessionUser();
  if (!user) redirect('/connexion');

  const invoices = await prisma.invoice.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
    include: { order: { include: { plan: true } } },
  });

  return (
    <div>
      <h1 className="mb-2">Factures &amp; reçus</h1>

      {invoices.length === 0 ? (
        <div className="card text-center" style={{ padding: 40 }}>
          <p className="text-muted">
            Aucune facture pour le moment. Vos factures, reçus et accusés de réception apparaîtront ici
            après vos paiements.
          </p>
        </div>
      ) : (
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>N°</th>
                <th>Type</th>
                <th>Date</th>
                <th>Commande</th>
                <th>Montant</th>
                <th>Statut</th>
                <th>Téléchargement</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id}>
                  <td><strong>{inv.number}</strong></td>
                  <td>{invoiceTypeLabel(inv.type)}</td>
                  <td>{fmtDateTime(inv.createdAt)}</td>
                  <td>
                    {inv.order.number}
                    {inv.order.plan && <div className="text-small text-muted">{inv.order.plan.name}</div>}
                  </td>
                  <td><strong>{formatMoney(inv.total, inv.currency)}</strong></td>
                  <td>
                    {inv.status === 'annulee'
                      ? <span className="badge badge-danger">Annulée</span>
                      : <span className="badge badge-success">Émise</span>}
                  </td>
                  <td>
                    <a href={`/api/account/invoices/${inv.id}/pdf`} className="btn btn-primary btn-sm">
                      Télécharger PDF
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="alert alert-security mt-2">
        Chaque document comporte un QR code de vérification d&apos;authenticité — scannez-le ou rendez-vous
        sur <strong>docpro.ibigsoft.com/verify</strong>.
      </div>
    </div>
  );
}
