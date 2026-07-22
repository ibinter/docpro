// Page de retour après paiement. RÈGLE ABSOLUE (CDC §10) : cette page N'ACTIVE
// RIEN — elle interroge uniquement le statut réel côté serveur, mis à jour par
// le webhook vérifié. L'URL de retour peut être falsifiée : on ne s'y fie jamais.
import { redirect, notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';
import SiteHeader from '@/components/SiteHeader';
import StatusPoller from './StatusPoller';

export const metadata = { title: 'Confirmation de paiement — IBIG DocPro' };

export default async function ReturnPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  const user = await getSessionUser();
  if (!user) redirect(`/connexion?next=${encodeURIComponent(`/checkout/retour/${orderId}`)}`);

  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) notFound();
  if (order.userId !== user.id && user.role !== 'admin' && user.role !== 'superadmin') {
    redirect('/compte');
  }

  return (
    <>
      <SiteHeader />
      <main className="container mt-3" style={{ maxWidth: 640, paddingBottom: 60 }}>
        <StatusPoller orderId={order.id} />
      </main>
    </>
  );
}
