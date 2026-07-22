// Simulation du processeur de paiement externe (« Moneroo Sandbox »).
// Design volontairement neutre : cette page représente un site TIERS.
// Elle ne modifie JAMAIS l'état du paiement elle-même — chaque bouton fabrique
// un webhook signé traité côté serveur (/api/webhooks/moneroo).
import { notFound, redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { formatMoney } from '@/lib/money';
import ProcessorButtons from './ProcessorButtons';

export const metadata = { title: 'Moneroo Sandbox — Paiement sécurisé' };

export default async function ProcessorPage({
  params,
}: {
  params: Promise<{ transactionId: string }>;
}) {
  const { transactionId } = await params;
  const transaction = await prisma.transaction.findUnique({
    where: { id: transactionId },
    include: { order: true },
  });
  if (!transaction) notFound();
  if (transaction.status !== 'en_cours') {
    redirect(`/checkout/retour/${transaction.orderId}`);
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#23262B',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
      }}
    >
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: 14,
          maxWidth: 440,
          width: '100%',
          padding: 32,
          boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <div
            style={{
              width: 38, height: 38, borderRadius: 10, background: '#111827',
              color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, fontSize: 18,
            }}
          >
            M
          </div>
          <div>
            <div style={{ fontWeight: 800, color: '#111827' }}>Moneroo Sandbox</div>
            <div style={{ fontSize: 12, color: '#6B7280' }}>Environnement de test — aucun débit réel</div>
          </div>
        </div>

        <div style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 10, padding: 16, marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 14 }}>
            <span style={{ color: '#6B7280' }}>Marchand</span>
            <span style={{ fontWeight: 600, color: '#111827' }}>IBIG DocPro</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 14 }}>
            <span style={{ color: '#6B7280' }}>Référence</span>
            <span style={{ fontWeight: 600, color: '#111827' }}>{transaction.internalRef}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
            <span style={{ color: '#6B7280' }}>Montant</span>
            <span style={{ fontWeight: 800, color: '#111827', fontSize: 18 }}>
              {formatMoney(transaction.amountExpected, transaction.currency)}
            </span>
          </div>
        </div>

        <ProcessorButtons transactionId={transaction.id} orderId={transaction.orderId} />

        <p style={{ fontSize: 11, color: '#9CA3AF', textAlign: 'center', marginTop: 18 }}>
          Page de simulation — en production, le client verrait ici l&apos;interface réelle
          du processeur de paiement.
        </p>
      </div>
    </div>
  );
}
