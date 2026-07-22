// POST /api/org/invites — invitation d'un collaborateur (propriétaire uniquement).
// Accepte un formulaire HTML (redirection 303) ou un corps JSON { email }.
// Refus si les sièges sont pleins (membres + invitations en cours >= limite du forfait).
import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { audit } from '@/lib/audit';
import { notifyAdmins } from '@/lib/notify';
import { sendMail } from '@/lib/mailer';
import { getUserOrg, orgSeatCount, orgSeatLimit } from '@/lib/org';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const INVITE_TTL_DAYS = 7;

function appBase(req: NextRequest): string {
  return (process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL || new URL(req.url).origin).replace(/\/$/, '');
}

export async function POST(req: NextRequest) {
  const contentType = req.headers.get('content-type') ?? '';
  const isForm =
    contentType.includes('application/x-www-form-urlencoded') ||
    contentType.includes('multipart/form-data');

  const fail = (code: string, status: number) =>
    isForm
      ? NextResponse.redirect(new URL(`/organisation?erreur=${code}`, req.url), 303)
      : NextResponse.json({ error: code }, { status });

  const user = await getSessionUser();
  if (!user) {
    return isForm
      ? NextResponse.redirect(new URL('/connexion', req.url), 303)
      : NextResponse.json({ error: 'non_authentifie' }, { status: 401 });
  }

  // Lecture de l'email (form ou JSON).
  let email = '';
  try {
    if (isForm) {
      const form = await req.formData();
      email = String(form.get('email') ?? '').trim().toLowerCase();
    } else {
      const body = (await req.json()) as { email?: string };
      email = String(body.email ?? '').trim().toLowerCase();
    }
  } catch {
    return fail('email_invalide', 400);
  }
  if (!EMAIL_RE.test(email) || email.length > 190) return fail('email_invalide', 400);

  const info = await getUserOrg(user.id);
  if (!info || info.role !== 'owner') return fail('acces_refuse', 403);
  const org = info.org;

  // Sièges : membres actuels + invitations en cours comptent vers la limite.
  const [seatsUsed, seatLimit, pendingInvites] = await Promise.all([
    orgSeatCount(org.id),
    orgSeatLimit(org.id),
    prisma.orgInvite.count({
      where: { organizationId: org.id, status: 'envoyee', expiresAt: { gt: new Date() } },
    }),
  ]);
  if (seatsUsed + pendingInvites >= seatLimit) {
    // Message métier : « Passez au forfait ENTREPRISE »
    return fail('sieges_pleins', 409);
  }

  // Déjà membre ? Déjà invité ?
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser?.organizationId === org.id) return fail('deja_membre', 409);
  const existingInvite = await prisma.orgInvite.findFirst({
    where: { organizationId: org.id, email, status: 'envoyee', expiresAt: { gt: new Date() } },
  });
  if (existingInvite) return fail('deja_invitee', 409);

  const invite = await prisma.orgInvite.create({
    data: {
      organizationId: org.id,
      email,
      expiresAt: new Date(Date.now() + INVITE_TTL_DAYS * 24 * 60 * 60 * 1000),
    },
  });

  const link = `${appBase(req)}/rejoindre/${invite.token}`;
  await sendMail({
    to: email,
    subject: `Invitation à rejoindre ${org.name} sur IBIG DocPro`,
    html: `<p><strong>${user.name}</strong> vous invite à rejoindre l&rsquo;organisation
<strong>${org.name}</strong> sur IBIG DocPro.</p>
<p>En rejoignant cette organisation, vous b&eacute;n&eacute;ficierez de sa licence et de ses documents partag&eacute;s.</p>
<p style="margin:20px 0;"><a href="${link}" style="background:#1565C0;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;">Accepter l&rsquo;invitation</a></p>
<p>Ou copiez ce lien dans votre navigateur :<br/><a href="${link}">${link}</a></p>
<p style="color:#546E7A;font-size:12px;">Cette invitation expire dans ${INVITE_TTL_DAYS} jours. Si vous n&rsquo;&ecirc;tes pas concern&eacute;, ignorez cet email.</p>`,
  });

  await audit({
    actorId: user.id,
    action: 'org.invite.create',
    entityType: 'OrgInvite',
    entityId: invite.id,
    after: { email, organizationId: org.id, expiresAt: invite.expiresAt.toISOString() },
  });
  await notifyAdmins({
    event: 'org_invitation_envoyee',
    title: 'Invitation organisation envoyée',
    body: `${user.name} (${user.email}) a invité ${email} à rejoindre l’organisation « ${org.name} ».`,
  });

  return isForm
    ? NextResponse.redirect(new URL('/organisation?ok=invitation', req.url), 303)
    : NextResponse.json({ ok: true, inviteId: invite.id, expiresAt: invite.expiresAt });
}
