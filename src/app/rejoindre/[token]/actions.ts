'use server';
// Server Action — acceptation d'une invitation d'organisation.
import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { audit } from '@/lib/audit';
import { notifyUser } from '@/lib/notify';
import { orgSeatCount, orgSeatLimit } from '@/lib/org';

export async function acceptInvite(formData: FormData) {
  const token = String(formData.get('token') ?? '').trim();
  if (!token) redirect('/');

  const user = await getSessionUser();
  if (!user) redirect(`/inscription?next=${encodeURIComponent(`/rejoindre/${token}`)}`);

  const invite = await prisma.orgInvite.findUnique({
    where: { token },
    include: { organization: true },
  });
  const back = (code: string) => redirect(`/rejoindre/${token}?erreur=${code}`);

  if (!invite) redirect('/rejoindre/' + token);
  if (invite.status !== 'envoyee') back('statut');
  if (invite.expiresAt.getTime() < Date.now()) {
    await prisma.orgInvite.update({ where: { id: invite.id }, data: { status: 'expiree' } });
    back('expiree');
  }
  if (invite.email.toLowerCase() !== user.email.toLowerCase()) back('email');
  if (user.organizationId && user.organizationId !== invite.organizationId) back('autre_org');
  if (user.organizationId === invite.organizationId) {
    await prisma.orgInvite.update({ where: { id: invite.id }, data: { status: 'acceptee' } });
    redirect('/organisation');
  }

  // Vérification des sièges au moment de l'acceptation.
  const [seatsUsed, seatLimit] = await Promise.all([
    orgSeatCount(invite.organizationId),
    orgSeatLimit(invite.organizationId),
  ]);
  if (seatsUsed >= seatLimit) back('sieges_pleins');

  await prisma.$transaction([
    prisma.user.update({
      where: { id: user.id },
      data: { organizationId: invite.organizationId },
    }),
    prisma.orgInvite.update({ where: { id: invite.id }, data: { status: 'acceptee' } }),
  ]);

  await audit({
    actorId: user.id,
    action: 'org.invite.accept',
    entityType: 'OrgInvite',
    entityId: invite.id,
    after: { organizationId: invite.organizationId, userId: user.id },
  });

  if (invite.organization.ownerId) {
    await notifyUser({
      userId: invite.organization.ownerId,
      event: 'org_invitation_acceptee',
      title: 'Invitation acceptée',
      body: `${user.name} (${user.email}) a rejoint votre organisation « ${invite.organization.name} ».`,
    });
  }

  redirect('/organisation?ok=rejoint');
}
