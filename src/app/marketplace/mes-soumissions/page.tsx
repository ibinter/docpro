// Suivi des soumissions du créateur : statuts + notes de revue.
import Link from 'next/link';
import { redirect } from 'next/navigation';
import SiteHeader from '@/components/SiteHeader';
import { prisma } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';
import { formatMoney } from '@/lib/money';
import { MARKETPLACE_CATEGORIES } from '../categories';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Mes soumissions — Marketplace IBIG DocPro',
};

const STATUS_LABELS: Record<string, string> = {
  soumis: 'En cours de revue',
  approuve: 'Approuvé — publié',
  rejete: 'Rejeté',
};

const STATUS_BADGES: Record<string, string> = {
  soumis: 'badge-warning',
  approuve: 'badge-success',
  rejete: 'badge-danger',
};

export default async function MesSoumissionsPage({
  searchParams,
}: {
  searchParams: Promise<{ envoye?: string }>;
}) {
  const user = await getSessionUser();
  if (!user) redirect('/connexion');
  const { envoye } = await searchParams;

  const submissions = await prisma.templateSubmission.findMany({
    where: { authorId: user.id },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <>
      <SiteHeader />
      <main className="container mt-4" style={{ maxWidth: 1000, paddingBottom: 60 }}>
        <p className="text-small text-muted mb-1">
          <Link href="/marketplace">Marketplace</Link> › Mes soumissions
        </p>
        <div className="flex-between mb-2" style={{ flexWrap: 'wrap', gap: 10 }}>
          <h1>Mes soumissions</h1>
          <Link href="/marketplace/soumettre" className="btn btn-gold btn-sm">+ Nouveau template</Link>
        </div>

        {envoye === '1' && (
          <div className="alert alert-success">
            ✅ Votre template a bien été soumis — notre équipe va l&apos;examiner. Vous serez notifié de la décision.
          </div>
        )}

        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Template</th>
                <th>Catégorie</th>
                <th>Prix</th>
                <th>Statut</th>
                <th>Note de revue</th>
                <th>Soumis le</th>
              </tr>
            </thead>
            <tbody>
              {submissions.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center text-muted">
                    Aucune soumission. <Link href="/marketplace/soumettre">Proposez votre premier template !</Link>
                  </td>
                </tr>
              )}
              {submissions.map((s) => (
                <tr key={s.id}>
                  <td><strong>{s.name}</strong></td>
                  <td className="text-small">{MARKETPLACE_CATEGORIES[s.category] ?? s.category}</td>
                  <td>{formatMoney(s.price)}</td>
                  <td>
                    <span className={`badge ${STATUS_BADGES[s.status] ?? 'badge-neutral'}`}>
                      {STATUS_LABELS[s.status] ?? s.status}
                    </span>
                  </td>
                  <td className="text-small">{s.reviewNote ?? '—'}</td>
                  <td className="text-small">{new Date(s.createdAt).toLocaleDateString('fr-FR')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
