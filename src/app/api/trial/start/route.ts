// POST /api/trial/start — démarre un essai gratuit (CDC §16.1).
// RÈGLES : jamais deux essais pour un même utilisateur (vérification
// licences 'essai' + LicenseEvent {essai:true}), refus si licence en cours.
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireUser, AuthError } from '@/lib/auth';
import { audit } from '@/lib/audit';
import { notifyUser, notifyAdmins } from '@/lib/notify';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const user = await requireUser();

    let planId = '';
    try {
      const body = (await req.json()) as unknown;
      if (body && typeof body === 'object' && typeof (body as Record<string, unknown>).planId === 'string') {
        planId = ((body as Record<string, unknown>).planId as string).trim();
      }
    } catch {
      /* corps vide ou invalide → géré ci-dessous */
    }
    if (!planId) {
      return NextResponse.json({ error: 'Forfait manquant' }, { status: 400 });
    }

    const plan = await prisma.plan.findUnique({ where: { id: planId } });
    if (!plan || !plan.active || plan.trialDays <= 0) {
      return NextResponse.json({ error: 'Ce forfait ne propose pas d’essai gratuit.' }, { status: 400 });
    }

    // ── RÈGLE 1 : jamais deux essais (licence 'essai' passée/présente OU
    // événement d'activation marqué {essai:true} — l'historique n'est jamais écrasé).
    const priorTrial = await prisma.license.findFirst({
      where: {
        userId: user.id,
        OR: [
          { status: 'essai' },
          { renewals: { some: { type: 'activation', detailsJson: { contains: '"essai":true' } } } },
        ],
      },
    });
    if (priorTrial) {
      return NextResponse.json(
        { error: 'Vous avez déjà bénéficié d’un essai gratuit. Choisissez un forfait sur la page Tarifs.' },
        { status: 409 },
      );
    }

    // ── RÈGLE 2 : pas d'essai si une licence est déjà en cours.
    const activeLicense = await prisma.license.findFirst({
      where: { userId: user.id, status: { in: ['active', 'provisoire', 'grace', 'en_attente'] } },
    });
    if (activeLicense) {
      return NextResponse.json(
        { error: 'Vous disposez déjà d’une licence — l’essai gratuit n’est pas disponible.' },
        { status: 409 },
      );
    }

    const now = new Date();
    const endDate = new Date(now.getTime() + plan.trialDays * 86_400_000);

    // Écritures critiques atomiques ; effets de bord (audit, notifs) après commit.
    const license = await prisma.$transaction(async (tx) => {
      const lic = await tx.license.create({
        data: {
          userId: user.id,
          planId: plan.id,
          status: 'essai',
          startDate: now,
          endDate,
        },
      });
      await tx.licenseEvent.create({
        data: {
          licenseId: lic.id,
          type: 'activation',
          detailsJson: JSON.stringify({ essai: true, trialDays: plan.trialDays, endDate }),
        },
      });
      return lic;
    });

    try {
      await audit({
        actorId: user.id,
        action: 'license.trial_start',
        entityType: 'License',
        entityId: license.id,
        after: { planId: plan.id, status: 'essai', endDate },
      });
      await notifyUser({
        userId: user.id,
        event: 'essai_demarre',
        title: 'Essai gratuit activé',
        body: `Votre essai gratuit de ${plan.trialDays} jours a commencé. Il prend fin le ${endDate.toLocaleDateString('fr-FR')}.`,
      });
      await notifyAdmins({
        event: 'essai_demarre',
        title: 'Nouvel essai gratuit',
        body: `${user.email} — forfait ${plan.name} (${plan.trialDays} jours)`,
      });
    } catch (e) {
      console.error('[trial] effet post-commit échoué :', e);
    }

    return NextResponse.json({ ok: true, redirect: '/compte' });
  } catch (e) {
    if (e instanceof AuthError) {
      return NextResponse.json({ error: e.message }, { status: e.status });
    }
    console.error('[api/trial/start]', e);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
