// /checkout?order=ID (ou ?plan=CODE / ?document=ID qui crée la commande d'abord)
// Tunnel de paiement : récapitulatif, pays de facturation, moyens de paiement.
import { redirect, notFound } from 'next/navigation';
import { headers } from 'next/headers';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';
import { formatMoney } from '@/lib/money';
import { createOrReuseOrder } from '@/lib/billing/orders';
import SiteHeader from '@/components/SiteHeader';
import CheckoutClient from './CheckoutClient';

export const metadata = { title: 'Paiement — IBIG DocPro' };

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string; plan?: string; document?: string }>;
}) {
  const params = await searchParams;
  const user = await getSessionUser();
  if (!user) {
    const next = encodeURIComponent(
      params.order ? `/checkout?order=${params.order}`
      : params.plan ? `/checkout?plan=${params.plan}`
      : '/checkout',
    );
    redirect(`/connexion?next=${next}`);
  }

  // ?plan=CODE ou ?document=ID : création (ou réutilisation anti double-clic) puis redirection
  if (!params.order && (params.plan || params.document)) {
    const h = await headers();
    let orderId: string;
    try {
      const { order } = await createOrReuseOrder({
        userId: user.id,
        organizationId: user.organizationId,
        planCode: params.plan,
        documentId: params.document,
        billingCountry: user.country ?? null,
        ip: h.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'inconnue',
        userAgent: h.get('user-agent') ?? 'inconnu',
      });
      orderId = order.id;
    } catch {
      redirect('/tarifs');
    }
    redirect(`/checkout?order=${orderId}`);
  }

  if (!params.order) redirect('/tarifs');

  const order = await prisma.order.findUnique({
    where: { id: params.order },
    include: { plan: true },
  });
  if (!order) notFound();
  if (order.userId !== user.id) redirect('/compte');
  if (order.status === 'payee') redirect(`/checkout/retour/${order.id}`);

  const expired =
    order.status === 'expiree' || (order.expiresAt !== null && order.expiresAt < new Date());
  const payable = !expired && ['en_attente_paiement', 'paiement_en_cours'].includes(order.status);

  const document = order.documentId
    ? await prisma.generatedDocument.findUnique({
        where: { id: order.documentId },
        include: { template: true },
      })
    : null;

  const channels = await prisma.paymentChannel.findMany({
    where: { active: true },
    orderBy: [{ displayOrder: 'asc' }, { provider: 'asc' }],
  });

  // Commande « certification blockchain » (option +500 FCFA) : libellé dédié.
  let isCertification = false;
  try {
    isCertification = JSON.parse(order.metadataJson ?? '{}').certification === true;
  } catch { /* metadata illisible */ }

  const itemLabel = order.plan
    ? `Forfait ${order.plan.name}`
    : document && isCertification
      ? `Certification blockchain du document : ${document.title}`
      : document
        ? `Document : ${document.title}`
        : 'Achat IBIG DocPro';

  return (
    <>
      <SiteHeader />
      <main className="container mt-3" style={{ maxWidth: 920, paddingBottom: 60 }}>
        <h1 className="mb-2">Finaliser votre paiement</h1>

        {/* Récapitulatif de la commande */}
        <div className="card mb-2">
          <div className="flex-between">
            <div>
              <div className="card-title" style={{ marginBottom: 4 }}>{itemLabel}</div>
              <div className="text-muted text-small">
                Commande {order.number}
                {order.plan?.durationType === 'perpetual'
                  ? ' — accès à vie'
                  : order.plan
                    ? ` — ${order.plan.durationValue} ${
                        order.plan.durationType === 'days' ? 'jour(s)'
                        : order.plan.durationType === 'years' ? 'an(s)' : 'mois'
                      }`
                    : ''}
              </div>
            </div>
            <span className="badge badge-info">{order.status.replace(/_/g, ' ')}</span>
          </div>
          <table className="mt-2" style={{ width: '100%' }}>
            <tbody>
              <tr>
                <td className="text-muted">Montant</td>
                <td style={{ textAlign: 'right' }}>{formatMoney(order.amount, order.currency)}</td>
              </tr>
              {order.discount > 0 && (
                <tr>
                  <td className="text-muted">Remise</td>
                  <td style={{ textAlign: 'right', color: 'var(--success)' }}>
                    −{formatMoney(order.discount, order.currency)}
                  </td>
                </tr>
              )}
              {order.tax > 0 && (
                <tr>
                  <td className="text-muted">Taxes</td>
                  <td style={{ textAlign: 'right' }}>{formatMoney(order.tax, order.currency)}</td>
                </tr>
              )}
              <tr>
                <td style={{ fontWeight: 800, color: 'var(--navy)', paddingTop: 8 }}>Total à payer</td>
                <td style={{ textAlign: 'right', fontWeight: 800, fontSize: '1.25rem', color: 'var(--navy)', paddingTop: 8 }}>
                  {formatMoney(order.total, order.currency)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Avertissement de sécurité obligatoire (CDC §12) */}
        <div className="alert alert-security">
          🔒 IBIG DocPro ne vous demandera JAMAIS votre code PIN Mobile Money, votre mot de passe,
          votre code OTP, votre code confidentiel, votre CVV complet ou votre mot de passe bancaire.
        </div>

        {expired ? (
          <div className="alert alert-danger">
            Cette commande a expiré. <Link href="/tarifs">Recommencer votre achat</Link>
          </div>
        ) : !payable ? (
          <div className="alert alert-warning">
            Cette commande n&apos;est plus payable en ligne (statut : {order.status.replace(/_/g, ' ')}).{' '}
            <Link href="/compte">Retour à mon espace</Link>
          </div>
        ) : (
          <CheckoutClient
            orderId={order.id}
            planCode={order.plan?.code ?? null}
            defaultCountry={order.billingCountry ?? user.country ?? ''}
            channels={channels.map((c) => ({
              id: c.id,
              type: c.type,
              provider: c.provider,
              label: c.label,
              country: c.country,
              currency: c.currency,
              instructions: c.instructions,
              plansJson: c.plansJson,
              minAmount: c.minAmount,
              maxAmount: c.maxAmount,
            }))}
            total={order.total}
            currency={order.currency}
          />
        )}
      </main>
    </>
  );
}
