// Marketplace de templates (CDC §7.3) — modèles créés par des designers
// indépendants (code 'mkt_*'), reversement 30 % au créateur.
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/public/SiteFooter';
import { prisma } from '@/lib/db';
import { formatMoney } from '@/lib/money';
import { MARKETPLACE_CATEGORIES, MKT_CODE_PREFIX } from './categories';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Marketplace de templates — IBIG DocPro',
  description:
    'Modèles de documents créés par des designers indépendants. Devenez créateur et gagnez 30 % sur chaque vente.',
};

export default async function MarketplacePage() {
  const templates = await prisma.documentTemplate.findMany({
    where: { active: true, code: { startsWith: MKT_CODE_PREFIX } },
    orderBy: [{ popularity: 'desc' }, { createdAt: 'desc' }],
  });

  return (
    <>
      <SiteHeader />
      <main className="container mt-4" style={{ maxWidth: 1100, paddingBottom: 60 }}>
        <h1 className="mb-1">Marketplace de templates</h1>
        <p className="text-muted mb-3">
          Des modèles de documents conçus par des <strong>créateurs indépendants</strong>, validés par notre équipe.
          Chaque achat reverse 30 % au créateur.
        </p>

        <div className="card mb-3" style={{ borderLeft: '4px solid var(--gold)' }}>
          <div className="flex-between" style={{ flexWrap: 'wrap', gap: 12 }}>
            <div>
              <h2 className="card-title" style={{ marginBottom: 4 }}>Devenir créateur</h2>
              <p className="text-muted text-small" style={{ margin: 0 }}>
                Designer, juriste, RH ? Publiez vos propres modèles et gagnez <strong>30 % sur chaque vente</strong>.
              </p>
            </div>
            <div className="flex" style={{ gap: 8, flexWrap: 'wrap' }}>
              <Link href="/marketplace/soumettre" className="btn btn-gold">Soumettre un template</Link>
              <Link href="/marketplace/mes-soumissions" className="btn btn-outline">Mes soumissions</Link>
            </div>
          </div>
        </div>

        {templates.length === 0 ? (
          <div className="card text-center">
            <p className="text-muted mb-2">
              Aucun template communautaire publié pour le moment — soyez le premier créateur !
            </p>
            <Link href="/marketplace/soumettre" className="btn btn-primary">Proposer mon template</Link>
          </div>
        ) : (
          <div className="grid grid-3">
            {templates.map((t) => (
              <div key={t.id} className="card card-hover">
                <div className="flex-between mb-1" style={{ flexWrap: 'wrap', gap: 6 }}>
                  <span className="badge badge-gold">Créateur indépendant</span>
                  <span className="badge badge-neutral">
                    {MARKETPLACE_CATEGORIES[t.category] ?? t.category}
                  </span>
                </div>
                <h3 className="card-title" style={{ marginBottom: 6 }}>{t.name}</h3>
                {t.description && <p className="text-small text-muted mb-2">{t.description}</p>}
                <div className="flex-between" style={{ alignItems: 'center' }}>
                  <strong>{formatMoney(t.price, t.currency)}</strong>
                  <Link href={`/documents/${t.code}`} className="btn btn-primary btn-sm">
                    Générer ce document
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
