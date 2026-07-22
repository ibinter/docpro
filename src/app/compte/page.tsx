// Tableau de bord abonnement (CDC §17.1) — vue synthétique de la licence courante.
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { formatMoney } from '@/lib/money';
import { LicenseBadge, fmtDate, paymentMethodLabel } from './ui/status';

export const dynamic = 'force-dynamic';

const DAY = 86_400_000;

function effectivePrice(plan: { price: number; promoPrice: number | null; promoStart: Date | null; promoEnd: Date | null }) {
  const now = new Date();
  if (
    plan.promoPrice != null &&
    (!plan.promoStart || plan.promoStart <= now) &&
    (!plan.promoEnd || plan.promoEnd >= now)
  ) {
    return plan.promoPrice;
  }
  return plan.price;
}

export default async function ComptePage() {
  const user = await getSessionUser();
  if (!user) redirect('/connexion');

  const license = await prisma.license.findFirst({
    where: { userId: user.id, status: { notIn: ['resiliee'] } },
    orderBy: { createdAt: 'desc' },
    include: { plan: true },
  });

  // ── Aucune licence : invitation à choisir un forfait
  if (!license) {
    return (
      <div>
        <h1 className="mb-2">Mon abonnement</h1>
        <div className="card text-center" style={{ padding: 48 }}>
          <h2 className="mb-1">Vous n&apos;avez pas encore d&apos;abonnement</h2>
          <p className="text-muted mb-2">
            Choisissez un forfait pour générer vos documents en illimité, avec adaptation légale à votre pays.
          </p>
          <div className="alert alert-info" style={{ textAlign: 'left' }}>
            <strong>Essai gratuit :</strong> certains forfaits incluent une période d&apos;essai gratuite —
            testez IBIG DocPro sans engagement, vos données sont conservées.
          </div>
          <Link href="/tarifs" className="btn btn-gold btn-lg mt-2">Découvrir les forfaits</Link>
        </div>
      </div>
    );
  }

  const now = new Date();
  const plan = license.plan;

  // ── Jours restants + progression
  let daysLeft: number | null = null;
  let pct = 100;
  if (license.endDate) {
    const totalMs = license.endDate.getTime() - license.startDate.getTime();
    const leftMs = Math.max(0, license.endDate.getTime() - now.getTime());
    daysLeft = Math.max(0, Math.ceil(leftMs / DAY));
    pct = totalMs > 0 ? Math.min(100, Math.round((leftMs / totalMs) * 100)) : 0;
  }
  const progressCls = pct > 30 ? '' : pct >= 10 ? ' progress-warning' : ' progress-danger';
  const progressColor = pct > 30 ? 'var(--success)' : undefined;

  // ── Utilisation vs limites (documents générés ce mois-ci)
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const docsThisMonth = await prisma.generatedDocument.count({
    where: { userId: user.id, createdAt: { gte: monthStart } },
  });
  const docsLimit = plan.docsPerMonth; // null = illimité
  const usagePct = docsLimit ? Math.min(100, Math.round((docsThisMonth / docsLimit) * 100)) : 0;
  const usageCls = !docsLimit ? '' : usagePct >= 90 ? ' progress-danger' : usagePct >= 70 ? ' progress-warning' : '';

  // ── Paiement en attente de vérification
  const pendingTx = await prisma.transaction.findFirst({
    where: { userId: user.id, status: 'a_verifier' },
    orderBy: { createdAt: 'desc' },
    include: { order: true },
  });

  const renewalPrice = effectivePrice(plan);

  return (
    <div>
      <div className="flex-between mb-2">
        <h1>Mon abonnement</h1>
        <div className="flex">
          <Link href={`/checkout?plan=${plan.code}`} className="btn btn-gold">Renouveler</Link>
          <Link href="/tarifs" className="btn btn-outline">Changer de forfait</Link>
        </div>
      </div>

      {/* Alertes contextuelles */}
      {license.status === 'grace' && (
        <div className="alert alert-warning">
          <strong>Période de grâce :</strong> votre abonnement est arrivé à échéance.
          {license.graceUntil && <> Vous conservez un accès réduit jusqu&apos;au <strong>{fmtDate(license.graceUntil)}</strong>.</>}{' '}
          Renouvelez dès maintenant pour ne rien perdre.
        </div>
      )}
      {license.status === 'provisoire' && (
        <div className="alert alert-warning">
          <strong>Activation provisoire :</strong> votre accès est accordé en attendant la confirmation de votre paiement.
          {license.provisionalUntil && <> Échéance : <strong>{fmtDate(license.provisionalUntil)}</strong>.</>}
        </div>
      )}
      {license.status === 'suspendue' && (
        <div className="alert alert-danger">
          <strong>Licence suspendue.</strong>{license.suspendedReason ? ` Motif : ${license.suspendedReason}` : ''}{' '}
          Contactez l&apos;assistance ou régularisez votre paiement.
        </div>
      )}
      {pendingTx && (
        <div className="alert alert-info">
          <strong>Paiement en attente de vérification :</strong> votre paiement
          {' '}{paymentMethodLabel(pendingTx.method)} de {formatMoney(pendingTx.amountDeclared ?? pendingTx.amountExpected, pendingTx.currency)}
          {' '}(réf. {pendingTx.internalRef}) est en cours d&apos;examen par notre équipe.{' '}
          <Link href={`/paiement-manuel/suivi/${pendingTx.id}`}>Suivre mon paiement →</Link>
        </div>
      )}

      {/* Licence courante */}
      <div className="card mb-2">
        <div className="flex-between mb-2">
          <div>
            <div className="card-title" style={{ marginBottom: 4 }}>Forfait {plan.name}</div>
            <span className="text-muted text-small">{plan.description ?? ''}</span>
          </div>
          <LicenseBadge status={license.status} />
        </div>

        <div className="grid grid-3 mb-2">
          <div className="stat">
            <div className="stat-label">Date de début</div>
            <div className="stat-value" style={{ fontSize: '1.1rem' }}>{fmtDate(license.startDate)}</div>
          </div>
          <div className="stat stat-teal">
            <div className="stat-label">Date de fin</div>
            <div className="stat-value" style={{ fontSize: '1.1rem' }}>
              {license.endDate ? fmtDate(license.endDate) : 'Perpétuelle'}
            </div>
          </div>
          <div className={`stat ${pct > 30 ? 'stat-success' : pct >= 10 ? 'stat-gold' : 'stat-danger'}`}>
            <div className="stat-label">Jours restants</div>
            <div className="stat-value">{daysLeft !== null ? `${daysLeft} j` : '∞'}</div>
          </div>
        </div>

        {license.endDate && (
          <div className="mb-2">
            <div className="flex-between text-small text-muted mb-1">
              <span>Progression de la période</span>
              <span>{pct}% restant</span>
            </div>
            <div className={`progress${progressCls}`}>
              <div style={{ width: `${pct}%`, ...(progressColor ? { background: progressColor } : {}) }} />
            </div>
          </div>
        )}

        <div>
          <div className="flex-between text-small text-muted mb-1">
            <span>Documents générés ce mois-ci</span>
            <span>
              {docsThisMonth} / {docsLimit ?? 'Illimité'}
            </span>
          </div>
          {docsLimit ? (
            <div className={`progress${usageCls}`}>
              <div style={{ width: `${usagePct}%` }} />
            </div>
          ) : (
            <span className="badge badge-gold">Génération illimitée</span>
          )}
        </div>
      </div>

      {/* Prochain renouvellement */}
      <div className="card">
        <div className="card-title">Prochain renouvellement</div>
        {license.endDate ? (
          <div className="flex-between">
            <div>
              <p>
                Votre forfait <strong>{plan.name}</strong> arrive à échéance le{' '}
                <strong>{fmtDate(license.endDate)}</strong>.
              </p>
              <p className="text-muted text-small mt-1">
                Montant estimé du renouvellement : <strong>{formatMoney(renewalPrice, plan.currency)}</strong>
                {plan.promoPrice != null && renewalPrice === plan.promoPrice && (
                  <> <span className="badge badge-gold">Promo</span></>
                )}
              </p>
            </div>
            <Link href={`/checkout?plan=${plan.code}`} className="btn btn-primary">
              Renouveler maintenant
            </Link>
          </div>
        ) : (
          <p className="text-muted">Licence perpétuelle — aucun renouvellement nécessaire.</p>
        )}
      </div>
    </div>
  );
}
