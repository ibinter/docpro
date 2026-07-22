// Soumission d'un template par un créateur indépendant — connexion requise.
import Link from 'next/link';
import { redirect } from 'next/navigation';
import SiteHeader from '@/components/SiteHeader';
import { getSessionUser } from '@/lib/auth';
import { MARKETPLACE_CATEGORIES } from '../categories';
import SubmissionForm from './SubmissionForm';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Soumettre un template — Marketplace IBIG DocPro',
};

export default async function SoumettrePage() {
  const user = await getSessionUser();
  if (!user) redirect('/connexion');

  return (
    <>
      <SiteHeader />
      <main className="container mt-4" style={{ maxWidth: 900, paddingBottom: 60 }}>
        <p className="text-small text-muted mb-1">
          <Link href="/marketplace">Marketplace</Link> › Soumettre un template
        </p>
        <h1 className="mb-1">Soumettre un template</h1>
        <p className="text-muted mb-3">
          Proposez votre modèle de document : après validation par notre équipe, il sera publié sur la
          marketplace et vous toucherez <strong>30 % de chaque vente</strong>.
        </p>
        <SubmissionForm categories={MARKETPLACE_CATEGORIES} />
      </main>
    </>
  );
}
