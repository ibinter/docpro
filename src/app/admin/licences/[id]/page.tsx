// Détail d'une licence : historique complet LicenseEvent + actions admin (CDC §17.2).
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';
import { StatusBadge, fmtDate, fmtDateTime } from '../../ui';
import LicenseActions from './LicenseActions';

export const dynamic = 'force-dynamic';

const EVENT_LABELS: Record<string, string> = {
  activation: 'Activation',
  activation_provisoire: 'Activation provisoire',
  conversion_definitive: 'Conversion provisoire → définitive',
  renouvellement: 'Renouvellement',
  upgrade: 'Changement de forfait (upgrade)',
  downgrade: 'Changement de forfait (downgrade)',
  prolongation: 'Prolongation',
  suspension: 'Suspension',
  reactivation: 'Réactivation',
  revocation: 'Révocation',
  expiration: 'Expiration',
  grace: 'Période de grâce',
  correction_dates: 'Correction de dates',
};

export default async function LicenceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [me, license] = await Promise.all([
    getSessionUser(),
    prisma.license.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, email: true, name: true, country: true } },
        plan: true,
        order: { select: { id: true, number: true, status: true, total: true, currency: true } },
        renewals: { orderBy: { createdAt: 'desc' } },
      },
    }),
  ]);
  if (!license) notFound();

  // Emails des acteurs de l'historique
  const actorIds = [...new Set(license.renewals.map((e) => e.actorId).filter((x): x is string => !!x))];
  const actors = actorIds.length
    ? await prisma.user.findMany({ where: { id: { in: actorIds } }, select: { id: true, email: true } })
    : [];
  const actorMap = new Map(actors.map((a) => [a.id, a.email]));

  return (
    <>
      <p className="mb-1"><Link href="/admin/licences">← Toutes les licences</Link></p>
      <div className="flex-between mb-2" style={{ flexWrap: 'wrap' }}>
        <h1>Licence — {license.plan.name}</h1>
        <StatusBadge status={license.status} />
      </div>

      <div className="grid grid-2 mb-3">
        <div className="card">
          <div className="card-title">Informations</div>
          <table className="table">
            <tbody>
              <tr><td className="text-muted">Client</td><td>{license.user.name} — {license.user.email} {license.user.country && `(${license.user.country})`}</td></tr>
              <tr><td className="text-muted">Forfait</td><td>{license.plan.name} ({license.plan.code})</td></tr>
              <tr><td className="text-muted">Commande liée</td><td>{license.order ? `${license.order.number} — ${license.order.status}` : '—'}</td></tr>
              <tr><td className="text-muted">Début</td><td>{fmtDate(license.startDate)}</td></tr>
              <tr><td className="text-muted">Fin</td><td>{license.endDate ? fmtDate(license.endDate) : 'Perpétuelle'}</td></tr>
              <tr><td className="text-muted">Grâce jusqu’au</td><td>{fmtDate(license.graceUntil)}</td></tr>
              <tr><td className="text-muted">Provisoire jusqu’au</td><td>{fmtDate(license.provisionalUntil)}</td></tr>
              {license.provisionalReason && <tr><td className="text-muted">Motif provisoire</td><td>{license.provisionalReason}</td></tr>}
              {license.suspendedReason && <tr><td className="text-muted">Motif suspension</td><td>{license.suspendedReason}</td></tr>}
              {license.revokedReason && <tr><td className="text-muted">Motif révocation</td><td>{license.revokedReason}</td></tr>}
            </tbody>
          </table>
        </div>
        <div className="card">
          <div className="card-title">Actions</div>
          <p className="text-small text-muted mb-2">
            Chaque action exige un motif et est tracée au journal d’audit (CDC §17.2).
          </p>
          <LicenseActions
            licenseId={license.id}
            status={license.status}
            hasOrder={!!license.orderId}
            isSuperadmin={me?.role === 'superadmin'}
          />
        </div>
      </div>

      <div className="card">
        <div className="card-title">Historique complet ({license.renewals.length} événement(s))</div>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Événement</th>
                <th>Acteur</th>
                <th>Motif</th>
                <th>Détails</th>
              </tr>
            </thead>
            <tbody>
              {license.renewals.length === 0 && (
                <tr><td colSpan={5} className="text-center text-muted">Aucun événement.</td></tr>
              )}
              {license.renewals.map((e) => (
                <tr key={e.id}>
                  <td className="text-small">{fmtDateTime(e.createdAt)}</td>
                  <td><strong>{EVENT_LABELS[e.type] ?? e.type}</strong></td>
                  <td className="text-small">{e.actorId ? actorMap.get(e.actorId) ?? e.actorId : 'Système'}</td>
                  <td className="text-small">{e.reason ?? '—'}</td>
                  <td className="text-small text-muted" style={{ maxWidth: 320, wordBreak: 'break-all' }}>
                    {e.detailsJson ?? '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
