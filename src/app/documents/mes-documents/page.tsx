// /documents/mes-documents — historique des documents de l'utilisateur connecté.
import { redirect } from 'next/navigation';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import { prisma } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';
import { formatMoney } from '@/lib/money';

const STATUS_BADGES: Record<string, { label: string; cls: string }> = {
  apercu: { label: 'Aperçu', cls: 'badge badge-warning' },
  paye: { label: 'Payé', cls: 'badge badge-success' },
  telecharge: { label: 'Téléchargé', cls: 'badge badge-info' },
};

export default async function MesDocumentsPage() {
  const user = await getSessionUser();
  if (!user) redirect('/connexion');

  const documents = await prisma.generatedDocument.findMany({
    where: { userId: user.id },
    include: { template: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <>
      <SiteHeader />
      <main className="container mt-4" style={{ paddingBottom: 60 }}>
        <div className="flex-between mb-3">
          <h1 style={{ fontSize: '1.6rem' }}>Mes documents</h1>
          <Link href="/catalogue" className="btn btn-primary">+ Nouveau document</Link>
        </div>

        {documents.length === 0 ? (
          <div className="card text-center" style={{ padding: 48 }}>
            <div style={{ fontSize: '2.6rem' }}>📄</div>
            <h2 style={{ fontSize: '1.15rem', margin: '12px 0 6px' }}>Aucun document pour le moment</h2>
            <p className="text-muted mb-3">
              Générez votre premier document en quelques secondes depuis le catalogue.
            </p>
            <Link href="/catalogue" className="btn btn-gold">Parcourir le catalogue</Link>
          </div>
        ) : (
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Document</th>
                  <th>Date</th>
                  <th>Prix</th>
                  <th>Qualité</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((d) => {
                  const badge = STATUS_BADGES[d.status] ?? STATUS_BADGES.apercu;
                  return (
                    <tr key={d.id}>
                      <td>
                        <strong>{d.title}</strong>
                        <br />
                        <span className="text-small text-muted">{d.template.category.replace(/_/g, ' & ')}</span>
                      </td>
                      <td>
                        {new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium' }).format(d.createdAt)}
                      </td>
                      <td>{formatMoney(d.price, d.currency)}</td>
                      <td>{d.qualityScore != null ? `${d.qualityScore}/100` : '—'}</td>
                      <td><span className={badge.cls}>{badge.label}</span></td>
                      <td>
                        <div className="flex" style={{ gap: 8 }}>
                          <Link href={`/documents/apercu/${d.id}`} className="btn btn-outline btn-sm">
                            Aperçu
                          </Link>
                          {d.paid && (
                            <a href={`/api/documents/${d.id}/download`} className="btn btn-primary btn-sm">
                              Télécharger
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </>
  );
}
