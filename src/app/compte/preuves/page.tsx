// Mes preuves de paiement soumises — statut, transaction liée, commentaires admin.
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { formatMoney } from '@/lib/money';
import { ProofBadge, fmtDateTime } from '../ui/status';

export const dynamic = 'force-dynamic';

function fmtSize(bytes: number) {
  if (bytes >= 1_048_576) return `${(bytes / 1_048_576).toFixed(1)} Mo`;
  if (bytes >= 1024) return `${Math.round(bytes / 1024)} Ko`;
  return `${bytes} o`;
}

export default async function PreuvesPage() {
  const user = await getSessionUser();
  if (!user) redirect('/connexion');

  const proofs = await prisma.paymentProof.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
    include: { transaction: { include: { order: true } } },
  });

  return (
    <div>
      <h1 className="mb-2">Mes preuves de paiement</h1>

      {proofs.length === 0 ? (
        <div className="card text-center" style={{ padding: 40 }}>
          <p className="text-muted">
            Vous n&apos;avez soumis aucune preuve de paiement. Les preuves sont demandées pour les paiements
            manuels (Mobile Money, virement, transfert international, espèces).
          </p>
        </div>
      ) : (
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Fichier</th>
                <th>Date de soumission</th>
                <th>Transaction liée</th>
                <th>Montant</th>
                <th>Statut</th>
                <th>Commentaire</th>
              </tr>
            </thead>
            <tbody>
              {proofs.map((proof) => (
                <tr key={proof.id}>
                  <td>
                    <strong>{proof.originalName}</strong>
                    <div className="text-small text-muted">{fmtSize(proof.sizeBytes)}</div>
                  </td>
                  <td>{fmtDateTime(proof.createdAt)}</td>
                  <td>
                    <Link href={`/paiement-manuel/suivi/${proof.transactionId}`}>
                      {proof.transaction.internalRef}
                    </Link>
                    <div className="text-small text-muted">Commande {proof.transaction.order.number}</div>
                  </td>
                  <td>
                    {formatMoney(
                      proof.transaction.amountDeclared ?? proof.transaction.amountExpected,
                      proof.transaction.currency,
                    )}
                  </td>
                  <td><ProofBadge status={proof.status} /></td>
                  <td>
                    {(proof.status === 'rejetee' || proof.status === 'complement_demande') && proof.adminComment ? (
                      <span className={proof.status === 'rejetee' ? 'text-small' : 'text-small'} style={{ color: proof.status === 'rejetee' ? 'var(--danger)' : 'var(--warning)' }}>
                        {proof.adminComment}
                      </span>
                    ) : (
                      <span className="text-muted">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="alert alert-info mt-2">
        En cas de <strong>complément demandé</strong>, rendez-vous sur la page de suivi de la transaction
        concernée pour soumettre une nouvelle preuve.
      </div>
    </div>
  );
}
