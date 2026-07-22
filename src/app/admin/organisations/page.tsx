// Console admin — liste des organisations (CDC §11.3).
import Link from 'next/link';
import { requireRole } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { ORG_ACTIVE_LICENSE_STATUSES, parseBranding } from '@/lib/org';
import { fmtDate } from '../ui';

export const dynamic = 'force-dynamic';

export default async function AdminOrganisationsPage() {
  await requireRole('admin');

  const orgs = await prisma.organization.findMany({
    include: {
      users: { select: { id: true } },
      licenses: {
        where: { status: { in: ORG_ACTIVE_LICENSE_STATUSES } },
        include: { plan: { select: { name: true, code: true } } },
        orderBy: { createdAt: 'desc' },
        take: 1,
      },
      invites: { where: { status: 'envoyee' }, select: { id: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  const ownerIds = orgs.map((o) => o.ownerId).filter((id): id is string => Boolean(id));
  const owners = await prisma.user.findMany({
    where: { id: { in: ownerIds } },
    select: { id: true, name: true, email: true },
  });
  const ownerById = new Map(owners.map((o) => [o.id, o]));

  return (
    <>
      <h1 className="mb-2">Organisations</h1>
      <p className="text-muted text-small mb-2">{orgs.length} organisation(s)</p>
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Propriétaire</th>
              <th>Membres</th>
              <th>Invitations</th>
              <th>Licence active</th>
              <th>Branding</th>
              <th>Créée le</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orgs.length === 0 && (
              <tr><td colSpan={8} className="text-center text-muted">Aucune organisation.</td></tr>
            )}
            {orgs.map((org) => {
              const owner = org.ownerId ? ownerById.get(org.ownerId) : undefined;
              const lic = org.licenses[0];
              const branding = parseBranding(org.brandingJson);
              return (
                <tr key={org.id}>
                  <td><strong>{org.name}</strong>{org.country && <span className="text-muted text-small"> ({org.country})</span>}</td>
                  <td>
                    {owner ? (
                      <>{owner.name}<br /><span className="text-small text-muted">{owner.email}</span></>
                    ) : (
                      <span className="text-muted">—</span>
                    )}
                  </td>
                  <td>{org.users.length}</td>
                  <td>{org.invites.length}</td>
                  <td>
                    {lic ? (
                      <span className="badge badge-success">{lic.plan.name}</span>
                    ) : (
                      <span className="badge badge-neutral">Aucune</span>
                    )}
                  </td>
                  <td>
                    {branding ? (
                      <span className="badge badge-gold">Oui</span>
                    ) : (
                      <span className="badge badge-neutral">Non</span>
                    )}
                  </td>
                  <td className="text-small">{fmtDate(org.createdAt)}</td>
                  <td><Link className="btn btn-outline btn-sm" href={`/admin/organisations/${org.id}`}>Détail</Link></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
