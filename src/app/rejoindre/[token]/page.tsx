// /rejoindre/[token] — acceptation d'une invitation d'organisation (CDC §11.2).
// Non connecté → redirection vers /inscription?next=/rejoindre/[token].
// Connecté → validation (token, expiration, email) puis bouton de confirmation.
import Link from 'next/link';
import { redirect } from 'next/navigation';
import SiteHeader from '@/components/SiteHeader';
import { getSessionUser } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { acceptInvite } from './actions';

export const dynamic = 'force-dynamic';

export const metadata = { title: 'Rejoindre une organisation — IBIG DocPro' };

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="container mt-4" style={{ minHeight: '60vh' }}>
        <div className="card" style={{ maxWidth: 520, margin: '0 auto' }}>{children}</div>
      </main>
    </>
  );
}

const ACTION_ERRORS: Record<string, string> = {
  statut: 'Cette invitation n’est plus valide (déjà traitée ou annulée).',
  expiree: 'Cette invitation a expiré. Demandez au propriétaire de vous réinviter.',
  email: 'Cette invitation est destinée à une autre adresse email.',
  autre_org: 'Vous appartenez déjà à une autre organisation.',
  sieges_pleins:
    'Tous les sièges de l’organisation sont occupés. Le propriétaire doit passer au forfait ENTREPRISE.',
};

export default async function RejoindrePage({
  params,
  searchParams,
}: {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ erreur?: string }>;
}) {
  const { token } = await params;
  const { erreur } = await searchParams;

  const invite = await prisma.orgInvite.findUnique({
    where: { token },
    include: { organization: true },
  });

  if (!invite) {
    return (
      <Shell>
        <h1 style={{ fontSize: '1.4rem' }}>Invitation introuvable</h1>
        <p className="text-muted mt-1">
          Ce lien d’invitation n’existe pas ou a été révoqué.
        </p>
        <Link href="/" className="btn btn-outline mt-2">Retour à l’accueil</Link>
      </Shell>
    );
  }

  const user = await getSessionUser();
  if (!user) {
    redirect(`/inscription?next=${encodeURIComponent(`/rejoindre/${token}`)}`);
  }

  const orgName = invite.organization.name;

  // Statuts terminaux.
  if (invite.status === 'acceptee') {
    const alreadyMember = user.organizationId === invite.organizationId;
    return (
      <Shell>
        <h1 style={{ fontSize: '1.4rem' }}>Invitation déjà acceptée</h1>
        <p className="text-muted mt-1">
          {alreadyMember
            ? `Vous êtes déjà membre de l’organisation « ${orgName} ».`
            : 'Cette invitation a déjà été utilisée.'}
        </p>
        {alreadyMember && (
          <Link href="/organisation" className="btn btn-primary mt-2">Voir mon organisation</Link>
        )}
      </Shell>
    );
  }
  if (invite.status === 'annulee') {
    return (
      <Shell>
        <h1 style={{ fontSize: '1.4rem' }}>Invitation annulée</h1>
        <p className="text-muted mt-1">
          Cette invitation a été annulée par le propriétaire de « {orgName} ».
        </p>
      </Shell>
    );
  }
  if (invite.status === 'expiree' || invite.expiresAt.getTime() < Date.now()) {
    if (invite.status === 'envoyee') {
      // Marquage paresseux (idempotent) de l'expiration.
      await prisma.orgInvite.update({ where: { id: invite.id }, data: { status: 'expiree' } });
    }
    return (
      <Shell>
        <h1 style={{ fontSize: '1.4rem' }}>Invitation expirée</h1>
        <p className="text-muted mt-1">
          Cette invitation à rejoindre « {orgName} » a expiré (validité 7 jours).
          Demandez au propriétaire de vous envoyer une nouvelle invitation.
        </p>
      </Shell>
    );
  }

  // Email non correspondant.
  if (invite.email.toLowerCase() !== user.email.toLowerCase()) {
    return (
      <Shell>
        <h1 style={{ fontSize: '1.4rem' }}>Compte non correspondant</h1>
        <div className="alert alert-warning mt-2">
          Cette invitation est destinée à <strong>{invite.email}</strong>, mais vous êtes
          connecté avec <strong>{user.email}</strong>.
        </div>
        <p className="text-muted text-small">
          Connectez-vous avec le compte invité (ou créez-le) pour accepter l’invitation.
        </p>
        <form method="POST" action="/api/auth/deconnexion" className="mt-2">
          <button type="submit" className="btn btn-outline">Changer de compte</button>
        </form>
      </Shell>
    );
  }

  // Déjà membre d'une autre organisation.
  if (user.organizationId && user.organizationId !== invite.organizationId) {
    return (
      <Shell>
        <h1 style={{ fontSize: '1.4rem' }}>Déjà membre d’une organisation</h1>
        <div className="alert alert-warning mt-2">
          Vous appartenez déjà à une autre organisation. Quittez-la (ou demandez à son
          propriétaire de vous retirer) avant de rejoindre « {orgName} ».
        </div>
        <Link href="/organisation" className="btn btn-outline mt-1">Voir mon organisation</Link>
      </Shell>
    );
  }

  // Invitation valide → confirmation.
  return (
    <Shell>
      <h1 style={{ fontSize: '1.4rem' }}>Rejoindre « {orgName} »</h1>
      {erreur && (
        <div className="alert alert-danger mt-2">
          {ACTION_ERRORS[erreur] ?? 'Une erreur est survenue. Réessayez.'}
        </div>
      )}
      <p className="text-muted mt-1">
        Vous avez été invité à rejoindre l’organisation <strong>{orgName}</strong> sur
        IBIG DocPro. En acceptant, votre compte sera rattaché à cette organisation et vous
        bénéficierez de sa licence partagée.
      </p>
      <p className="text-small text-muted mt-1">
        Invitation valable jusqu’au {invite.expiresAt.toLocaleDateString('fr-FR')}.
      </p>
      <form action={acceptInvite} className="mt-2">
        <input type="hidden" name="token" value={token} />
        <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
          Accepter et rejoindre l’organisation
        </button>
      </form>
      <p className="text-center text-small text-muted mt-2">
        Vous ne souhaitez pas rejoindre cette organisation ? Ignorez simplement cette page.
      </p>
    </Shell>
  );
}
