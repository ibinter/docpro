// Page publique des packs groupés (CDC §6.2) — plusieurs documents à prix réduit.
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { formatMoney } from '@/lib/money';
import { getActivePacks } from '@/lib/packs';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/public/SiteFooter';
import BuyPackButton from './BuyPackButton';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Packs de documents — IBIG DocPro',
  description:
    'Économisez avec nos packs groupés : plusieurs documents professionnels à prix réduit, accès pendant 1 an.',
};

export default async function PacksPage() {
  const packs = await getActivePacks();

  // Détail des templates inclus dans chaque pack (une seule requête).
  const allCodes = [...new Set(packs.flatMap((p) => p.features.templates))];
  const templates = await prisma.documentTemplate.findMany({
    where: { code: { in: allCodes }, active: true },
  });
  const byCode = new Map(templates.map((t) => [t.code, t]));

  return (
    <>
      <SiteHeader />
      <main className="container mt-3" style={{ minHeight: '60vh' }}>
        <h1 className="text-center">📦 Packs de documents</h1>
        <p className="text-center text-muted mb-3" style={{ maxWidth: 660, margin: '8px auto 32px' }}>
          Plusieurs documents essentiels regroupés à prix réduit. Une fois le pack acheté, vous
          générez chaque document du pack librement pendant <strong>1 an</strong>.
        </p>

        {packs.length === 0 && (
          <div className="alert alert-info">Les packs seront bientôt disponibles.</div>
        )}

        <div className="grid grid-2" style={{ alignItems: 'stretch' }}>
          {packs.map(({ plan, features }) => {
            const included = features.templates
              .map((code) => byCode.get(code))
              .filter((t): t is NonNullable<typeof t> => Boolean(t));
            // Somme des prix à l'unité (fourchette haute quand elle existe).
            const unitSum = included.reduce((sum, t) => sum + (t.priceMax ?? t.price), 0);
            const saving = unitSum - plan.price;
            const savingPct = unitSum > 0 ? Math.round((saving / unitSum) * 100) : 0;

            return (
              <div
                key={plan.id}
                className="card card-hover"
                style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}
              >
                {saving > 0 && (
                  <span
                    className="badge badge-gold"
                    style={{ position: 'absolute', top: -12, right: 20, fontSize: '0.85rem' }}
                  >
                    −{savingPct}&nbsp;% d&apos;économie
                  </span>
                )}
                <h2 style={{ fontSize: '1.35rem' }}>{plan.name}</h2>
                {plan.description && (
                  <p className="text-muted text-small mt-1">{plan.description}</p>
                )}

                <div className="mt-2" style={{ flex: 1 }}>
                  <div className="text-small text-muted" style={{ textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 700 }}>
                    {included.length} document{included.length > 1 ? 's' : ''} inclus
                  </div>
                  <ul style={{ listStyle: 'none', margin: '10px 0 0' }}>
                    {included.map((t) => (
                      <li
                        key={t.code}
                        className="flex-between"
                        style={{ padding: '8px 0', borderBottom: '1px solid #F1F5F9' }}
                      >
                        <span>✓ {t.name}</span>
                        <span className="text-small text-muted">
                          {formatMoney(t.priceMax ?? t.price, t.currency)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-3 text-center">
                  {saving > 0 && (
                    <div className="text-muted">
                      <span style={{ textDecoration: 'line-through' }}>
                        {formatMoney(unitSum, plan.currency)}
                      </span>{' '}
                      <span className="text-small">à l&apos;unité</span>
                    </div>
                  )}
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--navy)' }}>
                    {formatMoney(plan.price, plan.currency)}
                  </div>
                  {saving > 0 && (
                    <div className="text-small" style={{ color: 'var(--success)', fontWeight: 700 }}>
                      Vous économisez {formatMoney(saving, plan.currency)} ({savingPct}&nbsp;%)
                    </div>
                  )}
                  <div className="text-small text-muted mb-2">Accès aux documents du pack pendant 1 an</div>
                  <BuyPackButton planCode={plan.code} priceLabel={formatMoney(plan.price, plan.currency)} />
                </div>
              </div>
            );
          })}
        </div>

        <section className="mt-4 mb-3">
          <div className="card text-center">
            <h3>Besoin d&apos;un seul document&nbsp;?</h3>
            <p className="text-muted mt-1 mb-2">
              Chaque document du catalogue reste disponible à l&apos;unité, à partir de 50&nbsp;FCFA.
            </p>
            <Link href="/catalogue" className="btn btn-outline">Voir le catalogue</Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
