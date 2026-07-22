// /paiement-manuel/[orderId] — Choix du moyen de paiement manuel (CDC §12).
// Liste les PaymentChannel manuels actifs filtrés par pays de la commande.
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';
import { formatMoney } from '@/lib/money';
import SiteHeader from '@/components/SiteHeader';
import SecurityAlert from '../_components/SecurityAlert';
import { CHANNEL_TYPE_LABELS, CHANNEL_TYPE_ICONS, detailLabel } from '../_components/labels';

const MANUAL_TYPES = ['mobile_money', 'banque_nationale', 'banque_internationale', 'transfert_international', 'especes'];

export const metadata = { title: 'Paiement manuel — IBIG DocPro' };

export default async function PaiementManuelPage({ params }: { params: Promise<{ orderId: string }> }) {
  const user = await getSessionUser();
  if (!user) redirect('/connexion');
  const { orderId } = await params;

  const order = await prisma.order.findUnique({ where: { id: orderId }, include: { plan: true } });
  if (!order || order.userId !== user.id) notFound();

  const country = order.billingCountry ?? user.country ?? null;
  const channels = (
    await prisma.paymentChannel.findMany({
      where: {
        active: true,
        type: { in: MANUAL_TYPES },
        ...(country ? { OR: [{ country: null }, { country }] } : {}),
      },
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'asc' }],
    })
  ).filter((ch) => {
    // Filtre par forfaits autorisés (plansJson : codes de forfaits, null = tous)
    if (!ch.plansJson || !order.plan) return true;
    try {
      const codes = JSON.parse(ch.plansJson) as string[];
      return !Array.isArray(codes) || codes.length === 0 || codes.includes(order.plan.code);
    } catch {
      return true;
    }
  });

  return (
    <>
      <SiteHeader />
      <main className="container" style={{ paddingTop: 32, paddingBottom: 60, maxWidth: 900 }}>
        <h1>Paiement manuel</h1>
        <p className="text-muted mt-1">
          Commande <strong>{order.number}</strong>
          {order.plan ? <> — forfait <strong>{order.plan.name}</strong></> : null} — montant à régler :{' '}
          <strong>{formatMoney(order.total, order.currency)}</strong>
        </p>

        <div className="mt-2">
          <SecurityAlert />
        </div>

        {channels.length === 0 ? (
          <div className="alert alert-info mt-2">
            Aucun moyen de paiement manuel n’est disponible pour votre pays actuellement.
            Veuillez contacter notre support ou utiliser le paiement électronique.
          </div>
        ) : (
          <div className="grid grid-2 mt-3">
            {channels.map((ch) => {
              let details: Record<string, unknown> = {};
              try {
                details = JSON.parse(ch.detailsJson) as Record<string, unknown>;
              } catch {
                /* detailsJson illisible — on affiche quand même le canal */
              }
              const belowMin = ch.minAmount != null && order.total < ch.minAmount;
              const aboveMax = ch.maxAmount != null && order.total > ch.maxAmount;
              const unavailable = belowMin || aboveMax;
              return (
                <div className="card card-hover" key={ch.id}>
                  <div className="flex-between">
                    <div className="card-title" style={{ marginBottom: 4 }}>
                      {CHANNEL_TYPE_ICONS[ch.type] ?? '💳'} {ch.label}
                    </div>
                    <span className="badge badge-info">{CHANNEL_TYPE_LABELS[ch.type] ?? ch.type}</span>
                  </div>
                  <p className="text-small text-muted mb-1">
                    {ch.provider} — devise : {ch.currency}
                    {ch.country ? ` — pays : ${ch.country}` : ' — tous pays'}
                  </p>

                  <table className="mt-1" style={{ width: '100%', fontSize: '0.9rem', borderCollapse: 'collapse' }}>
                    <tbody>
                      {Object.entries(details).map(([k, v]) => (
                        <tr key={k}>
                          <td className="text-muted" style={{ padding: '4px 8px 4px 0', verticalAlign: 'top', whiteSpace: 'nowrap' }}>
                            {detailLabel(k)}
                          </td>
                          <td style={{ padding: '4px 0', fontWeight: 600 }}>{String(v)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {ch.instructions ? (
                    <p className="text-small mt-1" style={{ whiteSpace: 'pre-line' }}>
                      📋 {ch.instructions}
                    </p>
                  ) : null}

                  {(ch.minAmount != null || ch.maxAmount != null) && (
                    <p className="text-small text-muted mt-1">
                      {ch.minAmount != null ? `Minimum : ${formatMoney(ch.minAmount, ch.currency)}` : ''}
                      {ch.minAmount != null && ch.maxAmount != null ? ' — ' : ''}
                      {ch.maxAmount != null ? `Maximum : ${formatMoney(ch.maxAmount, ch.currency)}` : ''}
                    </p>
                  )}

                  {unavailable ? (
                    <p className="alert alert-warning mt-2 text-small" style={{ marginBottom: 0 }}>
                      Le montant de votre commande est {belowMin ? 'inférieur au minimum' : 'supérieur au maximum'} accepté
                      par ce canal.
                    </p>
                  ) : (
                    <div className="mt-2">
                      <Link href={`/paiement-manuel/${order.id}/declarer?channel=${ch.id}`} className="btn btn-primary">
                        J’ai payé — déclarer ce paiement
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="alert alert-info mt-3">
          Après votre transfert, déclarez votre paiement avec sa référence et votre preuve
          (capture d’écran ou PDF). Notre équipe vérifie chaque déclaration sous 24h —
          votre licence n’est activée qu’après validation.
        </div>
      </main>
    </>
  );
}
