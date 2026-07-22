// Console admin — détail d'une organisation (membres, invitations, licences, branding).
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requireRole } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { parseBranding } from '@/lib/org';
import { StatusBadge, fmtDate } from '../../ui';

const INVITE_BADGE: Record<string, { cls: string; label: string }> = {
  envoyee: { cls: 'badge-warning', label: 'Envoyée' },
  acceptee: { cls: 'badge-success', label: 'Acceptée' },
  expiree: { cls: 'badge-danger', label: 'Expirée' },
  annulee: { cls: 'badge-neutral', label: 'Annulée' },
};

export const dynamic = 'force-dynamic';

export default async function AdminOrganisationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireRole('admin');
  const { id } = await params;

  const org = await prisma.organization.findUnique({
    where: { id },
    include: {
      users: {
        select: { id: true, name: true, email: true, role: true, createdAt: true },
        orderBy: { createdAt: 'asc' },
      },
      licenses: {
        include: { plan: { select: { name: true, code: true } } },
        orderBy: { createdAt: 'desc' },
      },
      invites: { orderBy: { createdAt: 'desc' } },
    },
  });
  if (!org) notFound();

  const owner = org.ownerId
    ? await prisma.user.findUnique({
        where: { id: org.ownerId },
        select: { id: true, name: true, email: true },
      })
    : null;
  const branding = parseBranding(org.brandingJson);

  return (
    <>
      <p className="mb-1">
        <Link href="/admin/organisations" className="text-small">← Organisations</Link>
      </p>
      <div className="flex-between mb-2">
        <h1>{org.name}</h1>
        {branding ? <span className="badge badge-gold">White Label activé</span> : <span className="badge badge-neutral">Sans branding</span>}
      </div>

      <div className="grid grid-2 mb-3">
        <div className="card">
          <div className="card-title">Informations</div>
          <p><strong>Nom :</strong> {org.name}</p>
          <p><strong>Pays :</strong> {org.country ?? '—'}</p>
          <p><strong>Identifiant fiscal :</strong> {org.taxId ?? '—'}</p>
          <p><strong>Adresse :</strong> {org.address ?? '—'}</p>
          <p>
            <strong>Propriétaire :</strong>{' '}
            {owner ? `${owner.name} (${owner.email})` : <span className="text-muted">—</span>}
          </p>
          <p><strong>Créée le :</strong> {fmtDate(org.createdAt)}</p>
        </div>
        <div className="card">
          <div className="card-title">Branding White Label</div>
          {branding ? (
            <>
              <p><strong>Nom affiché :</strong> {branding.displayName}</p>
              <p>
                <strong>Logo :</strong>{' '}
                {branding.logoUrl ? (
                  <a href={branding.logoUrl} target="_blank" rel="noopener noreferrer">{branding.logoUrl}</a>
                ) : (
                  '—'
                )}
              </p>
              <p>
                <strong>Couleur principale :</strong>{' '}
                {branding.primaryColor ? (
                  <>
                    <span
                      style={{
                        display: 'inline-block',
                        width: 14,
                        height: 14,
                        borderRadius: 3,
                        background: branding.primaryColor,
                        border: '1px solid #CFD8DC',
                        verticalAlign: 'middle',
                        marginRight: 6,
                      }}
                    />
                    <code>{branding.primaryColor}</code>
                  </>
                ) : (
                  '—'
                )}
              </p>
            </>
          ) : (
            <p className="text-muted">Aucun branding configuré — identité IBIG DocPro.</p>
          )}
        </div>
      </div>

      <div className="card mb-3">
        <div className="card-title">Membres ({org.users.length})</div>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr><th>Nom</th><th>Email</th><th>Rôle plateforme</th><th>Rôle org</th><th>Inscrit le</th></tr>
            </thead>
            <tbody>
              {org.users.map((u) => (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td><span className="badge badge-neutral">{u.role}</span></td>
                  <td>
                    <span className={`badge ${u.id === org.ownerId ? 'badge-gold' : 'badge-neutral'}`}>
                      {u.id === org.ownerId ? 'Propriétaire' : 'Membre'}
                    </span>
                  </td>
                  <td className="text-small">{fmtDate(u.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card mb-3">
        <div className="card-title">Licences rattachées ({org.licenses.length})</div>
        {org.licenses.length === 0 ? (
          <p className="text-muted">Aucune licence rattachée à cette organisation.</p>
        ) : (
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr><th>Forfait</th><th>Statut</th><th>Début</th><th>Fin</th><th></th></tr>
              </thead>
              <tbody>
                {org.licenses.map((l) => (
                  <tr key={l.id}>
                    <td>{l.plan.name} <span className="text-muted text-small">({l.plan.code})</span></td>
                    <td><StatusBadge status={l.status} /></td>
                    <td className="text-small">{fmtDate(l.startDate)}</td>
                    <td className="text-small">{l.endDate ? fmtDate(l.endDate) : 'Perpétuelle'}</td>
                    <td><Link className="btn btn-outline btn-sm" href={`/admin/licences/${l.id}`}>Voir</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="card">
        <div className="card-title">Invitations ({org.invites.length})</div>
        {org.invites.length === 0 ? (
          <p className="text-muted">Aucune invitation.</p>
        ) : (
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr><th>Email</th><th>Statut</th><th>Envoyée le</th><th>Expire le</th></tr>
              </thead>
              <tbody>
                {org.invites.map((inv) => {
                  const b = INVITE_BADGE[inv.status] ?? { cls: 'badge-neutral', label: inv.status };
                  return (
                  <tr key={inv.id}>
                    <td>{inv.email}</td>
                    <td><span className={`badge ${b.cls}`}>{b.label}</span></td>
                    <td className="text-small">{fmtDate(inv.createdAt)}</td>
                    <td className="text-small">{fmtDate(inv.expiresAt)}</td>
                  </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
