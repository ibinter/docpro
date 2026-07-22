// Analytics admin — graphiques 100 % CSS (barres divs + .progress), sans package externe.
// Revenus 30 j, inscriptions par semaine, top documents, moyens de paiement, entonnoir, MRR.
import { prisma } from '@/lib/db';
import { requireRole } from '@/lib/auth';
import { formatMoney } from '@/lib/money';

export const dynamic = 'force-dynamic';

export const metadata = { title: 'Analytics — Console IBIG DocPro' };

const DAY_MS = 86_400_000;

function dayKey(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/** Barres verticales à hauteur variable (divs), sans bibliothèque. */
function BarChart({
  data,
  height = 160,
  format,
}: {
  data: { label: string; value: number }[];
  height?: number;
  format: (v: number) => string;
}) {
  const max = Math.max(1, ...data.map((d) => d.value));
  return (
    <div
      className="flex"
      style={{ alignItems: 'flex-end', gap: 3, height, marginTop: 12 }}
      role="img"
      aria-label="Graphique en barres"
    >
      {data.map((d) => (
        <div
          key={d.label}
          title={`${d.label} : ${format(d.value)}`}
          style={{
            flex: 1,
            height: `${Math.max(2, Math.round((d.value / max) * 100))}%`,
            background: d.value > 0 ? 'var(--cobalt)' : '#ECEFF1',
            borderRadius: '3px 3px 0 0',
            minWidth: 4,
          }}
        />
      ))}
    </div>
  );
}

/** Barres horizontales avec .progress (répartitions, tops). */
function HBarList({
  rows,
  format,
}: {
  rows: { label: string; value: number; hint?: string }[];
  format: (v: number) => string;
}) {
  const max = Math.max(1, ...rows.map((r) => r.value));
  if (rows.length === 0) return <p className="text-muted text-small">Aucune donnée.</p>;
  return (
    <div>
      {rows.map((r) => (
        <div key={r.label} className="mb-1">
          <div className="flex-between text-small">
            <span>
              {r.label} {r.hint && <span className="text-muted">({r.hint})</span>}
            </span>
            <strong>{format(r.value)}</strong>
          </div>
          <div className="progress">
            <div style={{ width: `${Math.round((r.value / max) * 100)}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

/** Prix mensuel équivalent d'un forfait (XOF) pour le MRR estimé. */
function monthlyEquivalentXof(
  plan: { price: number; currency: string; durationType: string; durationValue: number },
  toXof: (amount: number, currency: string) => number,
): number {
  const priceXof = toXof(plan.price, plan.currency);
  const v = Math.max(1, plan.durationValue);
  switch (plan.durationType) {
    case 'days':
      return Math.round((priceXof * 30) / v);
    case 'months':
      return Math.round(priceXof / v);
    case 'years':
      return Math.round(priceXof / (v * 12));
    default:
      return 0; // perpetual : pas de récurrence → exclu du MRR
  }
}

export default async function AdminAnalyticsPage() {
  await requireRole('admin');

  const now = new Date();
  const since30 = new Date(now.getTime() - 29 * DAY_MS);
  const since12w = new Date(now.getTime() - 12 * 7 * DAY_MS);

  const [currencies, paidOrders30, allOrdersCount, paidOrdersAll, users12w, topDocsRaw, activeLicenses] =
    await Promise.all([
      prisma.currency.findMany(),
      prisma.order.findMany({
        where: { status: 'payee', updatedAt: { gte: since30 } },
        select: { total: true, currency: true, updatedAt: true },
      }),
      prisma.order.count(),
      prisma.order.findMany({
        where: { status: 'payee' },
        select: { total: true, currency: true, paymentMethod: true },
      }),
      prisma.user.findMany({
        where: { createdAt: { gte: since12w } },
        select: { createdAt: true },
      }),
      prisma.generatedDocument.groupBy({
        by: ['templateId'],
        _count: { templateId: true },
        orderBy: { _count: { templateId: 'desc' } },
        take: 10,
      }),
      prisma.license.findMany({
        where: { status: { in: ['active', 'grace'] } },
        select: {
          plan: {
            select: { name: true, price: true, currency: true, durationType: true, durationValue: true },
          },
        },
      }),
    ]);

  const rates: Record<string, number> = Object.fromEntries(
    currencies.map((c) => [c.code, c.rateToXof || 1]),
  );
  const toXof = (amount: number, currency: string) => Math.round(amount * (rates[currency] ?? 1));
  const fmt = (v: number) => formatMoney(v, 'XOF');

  // ── 1. Revenus par jour sur 30 jours (commandes payées) ──
  const revenueByDay = new Map<string, number>();
  for (let i = 0; i < 30; i++) {
    revenueByDay.set(dayKey(new Date(since30.getTime() + i * DAY_MS)), 0);
  }
  for (const o of paidOrders30) {
    const k = dayKey(o.updatedAt);
    if (revenueByDay.has(k)) revenueByDay.set(k, revenueByDay.get(k)! + toXof(o.total, o.currency));
  }
  const revenueSeries = [...revenueByDay.entries()].map(([label, value]) => ({ label, value }));
  const revenue30Total = revenueSeries.reduce((s, d) => s + d.value, 0);

  // ── 2. Inscriptions par semaine (12 dernières semaines) ──
  const signupsByWeek = new Map<string, number>();
  for (let i = 11; i >= 0; i--) {
    const start = new Date(now.getTime() - (i + 1) * 7 * DAY_MS + DAY_MS);
    signupsByWeek.set(`Sem. du ${dayKey(start)}`, 0);
  }
  const weekKeys = [...signupsByWeek.keys()];
  for (const u of users12w) {
    const weeksAgo = Math.floor((now.getTime() - u.createdAt.getTime()) / (7 * DAY_MS));
    const idx = 11 - Math.min(11, Math.max(0, weeksAgo));
    const k = weekKeys[idx];
    signupsByWeek.set(k, (signupsByWeek.get(k) ?? 0) + 1);
  }
  const signupSeries = [...signupsByWeek.entries()].map(([label, value]) => ({ label, value }));

  // ── 3. Top 10 documents générés (par template) ──
  const templateIds = topDocsRaw.map((t) => t.templateId);
  const templates = templateIds.length
    ? await prisma.documentTemplate.findMany({
        where: { id: { in: templateIds } },
        select: { id: true, name: true },
      })
    : [];
  const nameById = new Map(templates.map((t) => [t.id, t.name]));
  const topDocs = topDocsRaw.map((t) => ({
    label: nameById.get(t.templateId) ?? t.templateId,
    value: t._count.templateId,
  }));

  // ── 4. Répartition des moyens de paiement (commandes payées, équiv. XOF) ──
  const byMethod = new Map<string, { value: number; count: number }>();
  for (const o of paidOrdersAll) {
    const k = o.paymentMethod ?? '—';
    const cur = byMethod.get(k) ?? { value: 0, count: 0 };
    cur.value += toXof(o.total, o.currency);
    cur.count += 1;
    byMethod.set(k, cur);
  }
  const methodRows = [...byMethod.entries()]
    .map(([label, v]) => ({ label, value: v.value, hint: `${v.count} cmd` }))
    .sort((a, b) => b.value - a.value);

  // ── 5. Entonnoir commandes créées → payées ──
  const paidCount = paidOrdersAll.length;
  const conversionRate = allOrdersCount > 0 ? Math.round((paidCount / allOrdersCount) * 100) : 0;

  // ── 6. MRR estimé (licences actives × prix mensuel équivalent) ──
  const mrr = activeLicenses.reduce((s, l) => s + monthlyEquivalentXof(l.plan, toXof), 0);

  return (
    <>
      <div className="flex-between mb-2">
        <h1>Analytics</h1>
        <span className="text-muted text-small">Mis à jour le {now.toLocaleString('fr-FR')}</span>
      </div>

      {/* ── Indicateurs clés ── */}
      <div className="grid grid-4 mb-3">
        <div className="stat stat-gold">
          <div className="stat-label">Revenus 30 derniers jours</div>
          <div className="stat-value">{fmt(revenue30Total)}</div>
        </div>
        <div className="stat stat-teal">
          <div className="stat-label">MRR estimé</div>
          <div className="stat-value">{fmt(mrr)}</div>
          <span className="text-small text-muted">{activeLicenses.length} licence(s) active(s)</span>
        </div>
        <div className="stat">
          <div className="stat-label">Commandes créées</div>
          <div className="stat-value">{allOrdersCount}</div>
        </div>
        <div className="stat stat-success">
          <div className="stat-label">Commandes payées</div>
          <div className="stat-value">{paidCount}</div>
        </div>
      </div>

      {/* ── Revenus par jour ── */}
      <div className="card mb-3">
        <div className="card-title">Revenus par jour — 30 derniers jours (équiv. XOF)</div>
        {revenue30Total === 0 ? (
          <p className="text-muted text-small">Aucun revenu sur la période.</p>
        ) : (
          <>
            <BarChart data={revenueSeries} format={fmt} />
            <div className="flex-between text-small text-muted mt-1">
              <span>{revenueSeries[0].label}</span>
              <span>{revenueSeries[revenueSeries.length - 1].label}</span>
            </div>
          </>
        )}
      </div>

      <div className="grid grid-2 mb-3">
        {/* ── Inscriptions par semaine ── */}
        <div className="card">
          <div className="card-title">Inscriptions par semaine — 12 semaines</div>
          {users12w.length === 0 ? (
            <p className="text-muted text-small">Aucune inscription sur la période.</p>
          ) : (
            <>
              <BarChart data={signupSeries} height={120} format={(v) => `${v} inscription(s)`} />
              <div className="flex-between text-small text-muted mt-1">
                <span>{weekKeys[0]}</span>
                <span>{weekKeys[weekKeys.length - 1]}</span>
              </div>
            </>
          )}
        </div>

        {/* ── Entonnoir ── */}
        <div className="card">
          <div className="card-title">Entonnoir commandes créées → payées</div>
          <div className="mb-1">
            <div className="flex-between text-small">
              <span>Commandes créées</span>
              <strong>{allOrdersCount}</strong>
            </div>
            <div className="progress">
              <div style={{ width: '100%' }} />
            </div>
          </div>
          <div className="mb-1">
            <div className="flex-between text-small">
              <span>Commandes payées</span>
              <strong>{paidCount}</strong>
            </div>
            <div className={`progress ${conversionRate < 30 ? 'progress-warning' : ''}`}>
              <div style={{ width: `${conversionRate}%` }} />
            </div>
          </div>
          <p className="text-small text-muted mt-1">
            Taux de conversion : <strong>{conversionRate}%</strong>
          </p>
        </div>
      </div>

      <div className="grid grid-2 mb-3">
        {/* ── Top documents ── */}
        <div className="card">
          <div className="card-title">Top 10 des documents générés</div>
          <HBarList rows={topDocs} format={(v) => `${v}`} />
        </div>

        {/* ── Moyens de paiement ── */}
        <div className="card">
          <div className="card-title">Répartition des moyens de paiement (commandes payées)</div>
          <HBarList rows={methodRows} format={fmt} />
        </div>
      </div>
    </>
  );
}
