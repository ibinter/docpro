'use server';
// Server Actions de l'espace organisation (CDC §6.2, §11.2-11.3).
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { requireUser } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { audit } from '@/lib/audit';
import { notifyUser } from '@/lib/notify';
import { getUserOrg, orgWhiteLabelAllowed, parseBranding } from '@/lib/org';

function clean(v: FormDataEntryValue | null): string {
  return typeof v === 'string' ? v.trim() : '';
}

const HEX_COLOR_RE = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
const HTTP_URL_RE = /^https?:\/\/\S+$/i;

/** Création d'une organisation — l'utilisateur devient propriétaire. */
export async function createOrganization(formData: FormData) {
  const user = await requireUser();
  if (user.organizationId) redirect('/organisation');

  const name = clean(formData.get('name')).slice(0, 120);
  const country = clean(formData.get('country')).toUpperCase().slice(0, 2);
  const taxId = clean(formData.get('taxId')).slice(0, 60);
  const address = clean(formData.get('address')).slice(0, 300);
  if (name.length < 2) redirect('/organisation?erreur=nom_invalide');

  const org = await prisma.organization.create({
    data: {
      name,
      country: country || null,
      taxId: taxId || null,
      address: address || null,
      ownerId: user.id,
    },
  });
  await prisma.user.update({ where: { id: user.id }, data: { organizationId: org.id } });

  await audit({
    actorId: user.id,
    action: 'org.create',
    entityType: 'Organization',
    entityId: org.id,
    after: { name, country: country || null, ownerId: user.id },
  });

  revalidatePath('/organisation');
  redirect('/organisation?ok=creee');
}

/** Retrait d'un membre — propriétaire uniquement, jamais soi-même. */
export async function removeMember(formData: FormData) {
  const user = await requireUser();
  const memberId = clean(formData.get('memberId'));
  const info = await getUserOrg(user.id);
  if (!info || info.role !== 'owner') redirect('/organisation?erreur=acces_refuse');
  if (!memberId || memberId === user.id) redirect('/organisation?erreur=retrait_impossible');

  const member = await prisma.user.findUnique({ where: { id: memberId } });
  if (!member || member.organizationId !== info.org.id) {
    redirect('/organisation?erreur=membre_introuvable');
  }

  await prisma.user.update({ where: { id: memberId }, data: { organizationId: null } });

  await audit({
    actorId: user.id,
    action: 'org.member.remove',
    entityType: 'Organization',
    entityId: info.org.id,
    before: { memberId, email: member.email },
  });
  await notifyUser({
    userId: memberId,
    event: 'org_membre_retire',
    title: 'Retrait d’une organisation',
    body: `Vous avez été retiré de l’organisation « ${info.org.name} ».`,
  });

  revalidatePath('/organisation');
  redirect('/organisation?ok=membre_retire');
}

/** Annulation d'une invitation en cours — propriétaire uniquement. */
export async function cancelInvite(formData: FormData) {
  const user = await requireUser();
  const inviteId = clean(formData.get('inviteId'));
  const info = await getUserOrg(user.id);
  if (!info || info.role !== 'owner') redirect('/organisation?erreur=acces_refuse');

  const invite = await prisma.orgInvite.findUnique({ where: { id: inviteId } });
  if (!invite || invite.organizationId !== info.org.id || invite.status !== 'envoyee') {
    redirect('/organisation?erreur=invitation_introuvable');
  }

  await prisma.orgInvite.update({ where: { id: invite.id }, data: { status: 'annulee' } });
  await audit({
    actorId: user.id,
    action: 'org.invite.cancel',
    entityType: 'OrgInvite',
    entityId: invite.id,
    before: { email: invite.email, status: 'envoyee' },
    after: { status: 'annulee' },
  });

  revalidatePath('/organisation');
  redirect('/organisation?ok=invitation_annulee');
}

/** Enregistrement du branding White Label — propriétaire + plan éligible. */
export async function saveBranding(formData: FormData) {
  const user = await requireUser();
  const info = await getUserOrg(user.id);
  if (!info || info.role !== 'owner') redirect('/organisation?erreur=acces_refuse');
  if (!(await orgWhiteLabelAllowed(info.org.id))) {
    redirect('/organisation/marque?erreur=plan_insuffisant');
  }

  const displayName = clean(formData.get('displayName')).slice(0, 80);
  const logoUrl = clean(formData.get('logoUrl')).slice(0, 500);
  const primaryColor = clean(formData.get('primaryColor'));

  if (displayName.length < 2) redirect('/organisation/marque?erreur=nom_invalide');
  if (logoUrl && !HTTP_URL_RE.test(logoUrl)) redirect('/organisation/marque?erreur=logo_invalide');
  if (primaryColor && !HEX_COLOR_RE.test(primaryColor)) {
    redirect('/organisation/marque?erreur=couleur_invalide');
  }

  const branding = {
    displayName,
    logoUrl: logoUrl || null,
    primaryColor: primaryColor || null,
  };

  const before = parseBranding(info.org.brandingJson);
  await prisma.organization.update({
    where: { id: info.org.id },
    data: { brandingJson: JSON.stringify(branding) },
  });
  await audit({
    actorId: user.id,
    action: 'org.branding.update',
    entityType: 'Organization',
    entityId: info.org.id,
    before,
    after: branding,
  });

  revalidatePath('/organisation/marque');
  redirect('/organisation/marque?ok=1');
}

/** Désactivation du branding — retour à l'identité IBIG DocPro. */
export async function clearBranding() {
  const user = await requireUser();
  const info = await getUserOrg(user.id);
  if (!info || info.role !== 'owner') redirect('/organisation?erreur=acces_refuse');

  const before = parseBranding(info.org.brandingJson);
  await prisma.organization.update({
    where: { id: info.org.id },
    data: { brandingJson: null },
  });
  await audit({
    actorId: user.id,
    action: 'org.branding.clear',
    entityType: 'Organization',
    entityId: info.org.id,
    before,
  });

  revalidatePath('/organisation/marque');
  redirect('/organisation/marque?ok=supprime');
}
