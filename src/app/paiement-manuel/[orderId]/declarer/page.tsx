// /paiement-manuel/[orderId]/declarer?channel=ID — Déclaration de paiement (CDC §12).
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';
import { formatMoney } from '@/lib/money';
import SiteHeader from '@/components/SiteHeader';
import SecurityAlert from '../../_components/SecurityAlert';
import { CHANNEL_TYPE_LABELS, detailLabel } from '../../_components/labels';
import DeclareForm from './DeclareForm';

const MANUAL_TYPES = ['mobile_money', 'banque_nationale', 'banque_internationale', 'transfert_international', 'especes'];

export const metadata = { title: 'Déclarer un paiement — IBIG DocPro' };

export default async function DeclarerPage({
  params,
  searchParams,
}: {
  params: Promise<{ orderId: string }>;
  searchParams: Promise<{ channel?: string }>;
}) {
  const user = await getSessionUser();
  if (!user) redirect('/connexion');
  const { orderId } = await params;
  const { channel: channelId } = await searchParams;

  const order = await prisma.order.findUnique({ where: { id: orderId }, include: { plan: true } });
  if (!order || order.userId !== user.id) notFound();
  if (!channelId) redirect(`/paiement-manuel/${order.id}`);

  const channel = await prisma.paymentChannel.findUnique({ where: { id: channelId } });
  if (!channel || !channel.active || !MANUAL_TYPES.includes(channel.type)) {
    redirect(`/paiement-manuel/${order.id}`);
  }

  let details: Record<string, unknown> = {};
  try {
    details = JSON.parse(channel.detailsJson) as Record<string, unknown>;
  } catch {
    /* ignore */
  }

  return (
    <>
      <SiteHeader />
      <main className="container" style={{ paddingTop: 32, paddingBottom: 60, maxWidth: 760 }}>
        <p className="text-small">
          <Link href={`/paiement-manuel/${order.id}`}>← Changer de moyen de paiement</Link>
        </p>
        <h1 className="mt-1">Déclarer mon paiement</h1>
        <p className="text-muted mt-1">
          Commande <strong>{order.number}</strong> — {formatMoney(order.total, order.currency)} via{' '}
          <strong>{channel.label}</strong> ({CHANNEL_TYPE_LABELS[channel.type] ?? channel.type})
        </p>

        <div className="mt-2">
          <SecurityAlert />
        </div>

        <div className="card mt-2" style={{ background: '#F8FAFC' }}>
          <div className="card-title" style={{ marginBottom: 8 }}>Coordonnées officielles de paiement</div>
          <table style={{ width: '100%', fontSize: '0.92rem', borderCollapse: 'collapse' }}>
            <tbody>
              {Object.entries(details).map(([k, v]) => (
                <tr key={k}>
                  <td className="text-muted" style={{ padding: '4px 8px 4px 0', whiteSpace: 'nowrap', verticalAlign: 'top' }}>
                    {detailLabel(k)}
                  </td>
                  <td style={{ padding: '4px 0', fontWeight: 600 }}>{String(v)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {channel.instructions ? (
            <p className="text-small mt-1" style={{ whiteSpace: 'pre-line' }}>📋 {channel.instructions}</p>
          ) : null}
        </div>

        <DeclareForm
          orderId={order.id}
          channelId={channel.id}
          channelType={channel.type}
          channelLabel={channel.label}
          channelCurrency={channel.currency}
          orderTotal={order.total}
          orderCurrency={order.currency}
        />
      </main>
    </>
  );
}
