// Tableau de bord de l'organisation (CDC §11.2-11.3) — création, membres,
// sièges, invitations. Owner = gestion complète ; membre = lecture.
import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';
import { prisma } from '@/lib/db';
import {
  getUserOrg,
  orgSeatCount,
  orgSeatLimit,
  orgHasActiveLicense,
  parseBranding,
} from '@/lib/org';
import { createOrganization, removeMember, cancelInvite } from './actions';

export const dynamic = 'force-dynamic';

const OK_MESSAGES: Record<string, string> = {
  creee: 'Organisation créée avec succès. Vous en êtes le propriétaire.',
  rejoint: 'Bienvenue ! Vous avez rejoint l’organisation.',
  invitation: 'Invitation envoyée par email.',
  invitation_annulee: 'Invitation annulée.',
  membre_retire: 'Membre retiré de l’organisation.',
};

const ERR_MESSAGES: Record<string, string> = {
  nom_invalide: 'Le nom de l’organisation doit contenir au moins 2 caractères.',
  acces_refuse: 'Action réservée au propriétaire de l’organisation.',
  retrait_impossible: 'Vous ne pouvez pas vous retirer vous-même.',
  membre_introuvable: 'Ce membre n’appartient pas à votre organisation.',
  invitation_introuvable: 'Invitation introuvable ou déjà traitée.',
  email_invalide: 'Adresse email invalide.',
  deja_membre: 'Cet utilisateur est déjà membre de votre organisation.',
  deja_invitee: 'Une invitation est déjà en cours pour cette adresse email.',
  sieges_pleins:
    'Tous les sièges de votre forfait sont occupés. Passez au forfait ENTREPRISE pour inviter plus de membres.',
};

const fmtDate = (d: Date) => new Date(d).toLocaleDateString('fr-FR');

export default async function OrganisationPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string; erreur?: string }>;
}) {
  const user = await getSessionUser();
  if (!user) redirect('/connexion');
  const sp = await searchParams;
  const okMsg = sp.ok ? OK_MESSAGES[sp.ok] : null;
  const errMsg = sp.erreur ? (ERR_MESSAGES[sp.erreur] ?? 'Une erreur est survenue.') : null;

  const info = await getUserOrg(user.id);

  // ── Aucune organisation : formulaire de création ──
  if (!info) {
    return (
      <>
        <h1 className="mb-2">Mon organisation</h1>
        {errMsg && <div className="alert alert-danger">{errMsg}</div>}
        <div className="alert alert-info">
          Créez votre organisation pour inviter des collaborateurs, partager votre licence
          (selon votre forfait) et personnaliser vos documents à votre marque (White Label).
        </div>
        <div className="card" style={{ maxWidth: 560 }}>
          <div className="card-title">Créer mon organisation</div>
          <form action={createOrganization}>
            <div className="field">
              <label className="label" htmlFor="name">Nom de l’organisation *</label>
              <input className="input" id="name" name="name" required minLength={2} maxLength={120} placeholder="Ex. : Cabinet Kouassi & Associés" />
            </div>
            <div className="field">
              <label className="label" htmlFor="country">Pays (code ISO-2)</label>
              <input className="input" id="country" name="country" maxLength={2} placeholder="CI" style={{ textTransform: 'uppercase' }} />
            </div>
            <div className="field">
              <label className="label" htmlFor="taxId">Identifiant fiscal</label>
              <input className="input" id="taxId" name="taxId" maxLength={60} placeholder="N° contribuable / RCCM…" />
            </div>
            <div className="field">
              <label className="label" htmlFor="address">Adresse</label>
              <textarea className="textarea" id="address" name="address" maxLength={300} placeholder="Adresse complète" />
            </div>
            <button type="submit" className="btn btn-primary">Créer l’organisation</button>
          </form>
        </div>
      </>
    );
  }

  // ── Organisation existante : tableau de bord ──
  const { org, role } = info;
  const isOwner = role === 'owner';
  const [members, invites, seatsUsed, seatLimit, hasLicense, owner] = await Promise.all([
    prisma.user.findMany({
      where: { organizationId: org.id },
      select: { id: true, name: true, email: true, createdAt: true },
      orderBy: { createdAt: 'asc' },
    }),
    prisma.orgInvite.findMany({
      where: { organizationId: org.id, status: 'envoyee' },
      orderBy: { createdAt: 'desc' },
    }),
    orgSeatCount(org.id),
    orgSeatLimit(org.id),
    orgHasActiveLicense(org.id),
    org.ownerId ? prisma.user.findUnique({ where: { id: org.ownerId }, select: { name: true, email: true } }) : null,
  ]);
  const branding = parseBranding(org.brandingJson);
  const pendingCount = invites.filter((i) => i.expiresAt.getTime() > Date.now()).length;
  const seatPct = Math.min(100, Math.round((seatsUsed / Math.max(1, seatLimit)) * 100));
  const seatsFull = seatsUsed + pendingCount >= seatLimit;

  return (
    <>
      <div className="flex-between mb-2">
        <h1>{org.name}</h1>
        <span className={`badge ${isOwner ? 'badge-gold' : 'badge-info'}`}>
          {isOwner ? 'Propriétaire' : 'Membre'}
        </span>
      </div>

      {okMsg && <div className="alert alert-success">{okMsg}</div>}
      {errMsg && <div className="alert alert-danger">{errMsg}</div>}

      <div className="grid grid-3 mb-3">
        <div className="stat">
          <div className="stat-value">{seatsUsed} / {seatLimit}</div>
          <div className="stat-label">Sièges utilisés</div>
          <div className={`progress mt-1 ${seatPct >= 100 ? 'progress-danger' : seatPct >= 80 ? 'progress-warning' : ''}`}>
            <div style={{ width: `${seatPct}%` }} />
          </div>
        </div>
        <div className={`stat ${hasLicense ? 'stat-success' : 'stat-danger'}`}>
          <div className="stat-value">{hasLicense ? 'Active' : 'Aucune'}</div>
          <div className="stat-label">Licence de l’organisation</div>
        </div>
        <div className={`stat ${branding ? 'stat-gold' : ''}`}>
          <div className="stat-value">{branding ? 'Activé' : '—'}</div>
          <div className="stat-label">White Label</div>
        </div>
      </div>

      <div className="grid grid-2 mb-3">
        <div className="card">
          <div className="card-title">Informations</div>
          <p><strong>Nom :</strong> {org.name}</p>
          <p><strong>Pays :</strong> {org.country ?? '—'}</p>
          <p><strong>Identifiant fiscal :</strong> {org.taxId ?? '—'}</p>
          <p><strong>Adresse :</strong> {org.address ?? '—'}</p>
          <p><strong>Propriétaire :</strong> {owner ? `${owner.name} (${owner.email})` : '—'}</p>
          <p><strong>Créée le :</strong> {fmtDate(org.createdAt)}</p>
        </div>

        {isOwner && (
          <div className="card">
            <div className="card-title">Inviter un collaborateur</div>
            {seatsFull ? (
              <div className="alert alert-warning" style={{ marginBottom: 0 }}>
                Tous les sièges de votre forfait sont occupés ({seatsUsed} membre(s)
                {pendingCount > 0 ? ` + ${pendingCount} invitation(s) en cours` : ''} pour {seatLimit} siège(s)).
                Passez au forfait <strong>ENTREPRISE</strong> pour agrandir votre équipe.
              </div>
            ) : (
              <form method="POST" action="/api/org/invites">
                <div className="field">
                  <label className="label" htmlFor="email">Adresse email du collaborateur *</label>
                  <input className="input" id="email" name="email" type="email" required maxLength={190} placeholder="collaborateur@exemple.com" />
                  <p className="form-hint">
                    Un email d’invitation valable 7 jours lui sera envoyé.
                  </p>
                </div>
                <button type="submit" className="btn btn-primary">Envoyer l’invitation</button>
              </form>
            )}
          </div>
        )}
      </div>

      <div className="card mb-3">
        <div className="card-title">Membres ({members.length})</div>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Rôle</th>
                <th>Inscrit le</th>
                {isOwner && <th>Action</th>}
              </tr>
            </thead>
            <tbody>
              {members.map((m) => {
                const mIsOwner = m.id === org.ownerId;
                return (
                  <tr key={m.id}>
                    <td>{m.name}{m.id === user.id && <span className="text-muted text-small"> (vous)</span>}</td>
                    <td>{m.email}</td>
                    <td>
                      <span className={`badge ${mIsOwner ? 'badge-gold' : 'badge-neutral'}`}>
                        {mIsOwner ? 'Propriétaire' : 'Membre'}
                      </span>
                    </td>
                    <td className="text-small">{fmtDate(m.createdAt)}</td>
                    {isOwner && (
                      <td>
                        {mIsOwner ? (
                          <span className="text-muted text-small">—</span>
                        ) : (
                          <form action={removeMember}>
                            <input type="hidden" name="memberId" value={m.id} />
                            <button type="submit" className="btn btn-danger btn-sm">Retirer</button>
                          </form>
                        )}
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <div className="card-title">Invitations en cours ({invites.length})</div>
        {invites.length === 0 ? (
          <p className="text-muted">Aucune invitation en attente.</p>
        ) : (
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Envoyée le</th>
                  <th>Expire le</th>
                  <th>Statut</th>
                  {isOwner && <th>Action</th>}
                </tr>
              </thead>
              <tbody>
                {invites.map((inv) => {
                  const expired = inv.expiresAt.getTime() < Date.now();
                  return (
                    <tr key={inv.id}>
                      <td>{inv.email}</td>
                      <td className="text-small">{fmtDate(inv.createdAt)}</td>
                      <td className="text-small">{fmtDate(inv.expiresAt)}</td>
                      <td>
                        <span className={`badge ${expired ? 'badge-danger' : 'badge-warning'}`}>
                          {expired ? 'Expirée' : 'En attente'}
                        </span>
                      </td>
                      {isOwner && (
                        <td>
                          <form action={cancelInvite}>
                            <input type="hidden" name="inviteId" value={inv.id} />
                            <button type="submit" className="btn btn-outline btn-sm">Annuler</button>
                          </form>
                        </td>
                      )}
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
