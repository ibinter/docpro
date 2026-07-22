// /paiement-manuel/suivi/[transactionId] — Suivi de la vérification d'un paiement manuel.
// Le client voit le statut, ses informations déclarées et ses preuves (nom + taille,
// jamais le fichier lui-même). Ajout de preuve UNIQUEMENT si complément demandé.
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';
import { formatMoney } from '@/lib/money';
import SiteHeader from '@/components/SiteHeader';
import SecurityAlert from '../../_components/SecurityAlert';
import {
  DECLARED_FIELD_LABELS,
  TX_STATUS_BADGES,
  PROOF_STATUS_BADGES,
  CHANNEL_TYPE_LABELS,
  formatBytes,
} from '../../_components/labels';
import AddProofForm from './AddProofForm';

export const metadata = { title: 'Suivi de paiement — IBIG DocPro' };
export const dynamic = 'force-dynamic'; // statut en temps réel — jamais de cache

export default async function SuiviPage({
  params,
  searchParams,
}: {
  params: Promise<{ transactionId: string }>;
  searchParams: Promise<{ ok?: string }>;
}) {
  const user = await getSessionUser();
  if (!user) redirect('/connexion');
  const { transactionId } = await params;
  const { ok } = await searchParams;

  const transaction = await prisma.transaction.findUnique({
    where: { id: transactionId },
    include: {
      order: { include: { plan: true } },
      proofs: { orderBy: { createdAt: 'asc' } },
    },
  });
  if (!transaction || transaction.userId !== user.id) notFound();

  const badge = TX_STATUS_BADGES[transaction.status] ?? { label: transaction.status, cls: 'badge-neutral' };
  let declared: Record<string, string> = {};
  try {
    declared = transaction.rawPayloadJson ? (JSON.parse(transaction.rawPayloadJson) as Record<string, string>) : {};
  } catch {
    /* ignore */
  }

  const complementRequested =
    transaction.status === 'complement_demande' ||
    transaction.proofs.some((p) => p.status === 'complement_demande');
  const complementMessage = transaction.proofs.find((p) => p.status === 'complement_demande')?.adminComment;

  return (
    <>
      <SiteHeader />
      <main className="container" style={{ paddingTop: 32, paddingBottom: 60, maxWidth: 760 }}>
        {ok === '1' ? (
          <div className="alert alert-success" role="status">
            ✅ Votre preuve de paiement a été reçue et sera vérifiée par notre équipe dans les 24h.
          </div>
        ) : null}

        <div className="flex-between">
          <h1>Suivi de votre paiement</h1>
          <span className={`badge ${badge.cls}`}>{badge.label}</span>
        </div>
        <p className="text-muted mt-1">
          Référence IBIG : <strong>{transaction.internalRef}</strong> — commande{' '}
          <strong>{transaction.order.number}</strong>
          {transaction.order.plan ? <> — forfait {transaction.order.plan.name}</> : null}
        </p>

        {transaction.status === 'a_verifier' ? (
          <div className="alert alert-info mt-2">
            Votre déclaration est en file de vérification manuelle. Notre équipe la traite sous 24h —
            vous serez notifié dès la décision.
          </div>
        ) : null}
        {transaction.status === 'validee_manuellement' ? (
          <div className="alert alert-success mt-2">
            🎉 Paiement validé le {transaction.confirmedAt?.toLocaleDateString('fr-FR')} — votre facture et votre
            reçu sont disponibles dans <Link href="/compte">votre espace</Link>.
          </div>
        ) : null}
        {transaction.status === 'rejetee' ? (
          <div className="alert alert-danger mt-2">
            Votre preuve a été rejetée{transaction.rejectReason ? <> — motif : <strong>{transaction.rejectReason}</strong></> : null}.
            Contactez notre support si vous pensez qu’il s’agit d’une erreur.
          </div>
        ) : null}
        {complementRequested ? (
          <div className="alert alert-warning mt-2">
            ✍️ Notre équipe a besoin d’un complément :{' '}
            <strong>{complementMessage ?? 'une preuve supplémentaire est nécessaire.'}</strong>
          </div>
        ) : null}

        {/* ── Détails déclarés ── */}
        <div className="card mt-3">
          <div className="card-title">Informations déclarées</div>
          <table style={{ width: '100%', fontSize: '0.92rem', borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td className="text-muted" style={{ padding: '4px 8px 4px 0' }}>Montant déclaré</td>
                <td style={{ fontWeight: 600 }}>
                  {transaction.amountDeclared != null ? formatMoney(transaction.amountDeclared, transaction.currency) : '—'}
                </td>
              </tr>
              <tr>
                <td className="text-muted" style={{ padding: '4px 8px 4px 0' }}>Montant attendu</td>
                <td style={{ fontWeight: 600 }}>{formatMoney(transaction.amountExpected, transaction.order.currency)}</td>
              </tr>
              <tr>
                <td className="text-muted" style={{ padding: '4px 8px 4px 0' }}>Moyen de paiement</td>
                <td style={{ fontWeight: 600 }}>
                  {transaction.provider}
                  {declared.channelType ? ` (${CHANNEL_TYPE_LABELS[declared.channelType] ?? declared.channelType})` : ''}
                </td>
              </tr>
              {transaction.externalRef ? (
                <tr>
                  <td className="text-muted" style={{ padding: '4px 8px 4px 0' }}>Référence</td>
                  <td style={{ fontWeight: 600 }}>{transaction.externalRef}</td>
                </tr>
              ) : null}
              {Object.entries(declared)
                .filter(([k]) => !['channelType', 'channelLabel', 'reference'].includes(k))
                .map(([k, v]) => (
                  <tr key={k}>
                    <td className="text-muted" style={{ padding: '4px 8px 4px 0' }}>{DECLARED_FIELD_LABELS[k] ?? k}</td>
                    <td style={{ fontWeight: 600 }}>{v}</td>
                  </tr>
                ))}
              <tr>
                <td className="text-muted" style={{ padding: '4px 8px 4px 0' }}>Déclaré le</td>
                <td style={{ fontWeight: 600 }}>
                  {transaction.createdAt.toLocaleDateString('fr-FR')} à{' '}
                  {transaction.createdAt.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Preuves soumises (métadonnées uniquement — jamais le fichier) ── */}
        <div className="card mt-2">
          <div className="card-title">Preuves soumises</div>
          {transaction.proofs.length === 0 ? (
            <p className="text-muted text-small">Aucune preuve jointe (paiement en espèces).</p>
          ) : (
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>Fichier</th>
                    <th>Taille</th>
                    <th>Soumise le</th>
                    <th>Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {transaction.proofs.map((p) => {
                    const pb = PROOF_STATUS_BADGES[p.status] ?? { label: p.status, cls: 'badge-neutral' };
                    return (
                      <tr key={p.id}>
                        <td>📎 {p.originalName}</td>
                        <td>{formatBytes(p.sizeBytes)}</td>
                        <td>{p.createdAt.toLocaleDateString('fr-FR')}</td>
                        <td><span className={`badge ${pb.cls}`}>{pb.label}</span></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
          <p className="form-hint mt-1">
            Une preuve soumise ne peut plus être modifiée. Vous ne pouvez en ajouter une nouvelle que si notre
            équipe vous le demande.
          </p>

          {complementRequested ? <AddProofForm transactionId={transaction.id} /> : null}
        </div>

        <div className="mt-3">
          <SecurityAlert />
        </div>
      </main>
    </>
  );
}
