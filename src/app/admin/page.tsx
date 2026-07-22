// Tableau de bord financier (CDC §17.2).
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { formatMoney } from '@/lib/money';

export const dynamic = 'force-dynamic';

type Ventilation = { label: string; count: number; totalXof: number };

function groupSum<T>(rows: T[], key: (r: T) => string, amount: (r: T) => number): Ventilation[] {
  const map = new Map<string, Ventilation>();
  for (const r of rows) {
    const k = key(r) || '—';
    const cur = map.get(k) ?? { label: k, count: 0, totalXof: 0 };
    cur.count += 1;
    cur.totalXof += amount(r);
    map.set(k, cur);
  }
  return [...map.values()].sort((a, b) => b.totalXof - a.totalXof);
}

function VentTable({ title, rows }: { title: string; rows: Ventilation[] }) {
  return (
    <div className="card">
      <div className="card-title">{title}</div>
      {rows.length === 0 ? (
        <p className="text-muted text-small">Aucune donnée.</p>
      ) : (
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Segment</th>
                <th>Commandes</th>
                <th>Revenus (équiv. XOF)</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.label}>
                  <td>{r.label}</td>
                  <td>{r.count}</td>
                  <td>{formatMoney(r.totalXof, 'XOF')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default async function AdminDashboard() {
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const in7days = new Date(now.getTime() + 7 * 86400_000);

  const [
    currencies,
    paidOrders,
    txReussies,
    txEnAttente,
    txAVerifier,
    proofsPending,
    licProvisoires,
    licExpirant,
    licExpirees,
    trialLicenses,
  ] = await Promise.all([
    prisma.currency.findMany(),
    prisma.order.findMany({
      where: { status: 'payee' },
      include: { plan: { select: { name: true } } },
    }),
    prisma.transaction.count({ where: { status: { in: ['reussie', 'validee_manuellement'] } } }),
    prisma.transaction.count({ where: { status: { in: ['initialisee', 'en_attente', 'en_cours'] } } }),
    prisma.transaction.count({ where: { status: 'a_verifier' } }),
    prisma.paymentProof.count({ where: { status: { in: ['soumise', 'en_cours'] } } }),
    prisma.license.count({ where: { status: 'provisoire' } }),
    prisma.license.count({ where: { status: 'active', endDate: { gte: now, lte: in7days } } }),
    prisma.license.count({ where: { status: 'expiree' } }),
    prisma.license.findMany({ where: { orderId: null }, select: { userId: true } }),
  ]);

  // Taux de conversion essai → payant (approximation : licences sans commande = essais)
  const trialUserIds = [...new Set(trialLicenses.map((l) => l.userId))];
  const convertedUsers = trialUserIds.length
    ? await prisma.license.findMany({
        where: { userId: { in: trialUserIds }, orderId: { not: null } },
        select: { userId: true },
        distinct: ['userId'],
      })
    : [];
  const conversionRate = trialUserIds.length
    ? Math.round((convertedUsers.length / trialUserIds.length) * 100)
    : 0;

  const rates: Record<string, number> = Object.fromEntries(currencies.map((c) => [c.code, c.rateToXof || 1]));
  const toXof = (total: number, currency: string) => Math.round(total * (rates[currency] ?? 1));

  const caTotal = paidOrders.reduce((s, o) => s + toXof(o.total, o.currency), 0);
  const caJour = paidOrders
    .filter((o) => o.updatedAt >= startOfDay)
    .reduce((s, o) => s + toXof(o.total, o.currency), 0);
  const caMois = paidOrders
    .filter((o) => o.updatedAt >= startOfMonth)
    .reduce((s, o) => s + toXof(o.total, o.currency), 0);

  const parForfait = groupSum(paidOrders, (o) => o.plan?.name ?? 'Document à l’unité', (o) => toXof(o.total, o.currency));
  const parMoyen = groupSum(paidOrders, (o) => o.paymentMethod ?? '—', (o) => toXof(o.total, o.currency));
  const parDevise = groupSum(paidOrders, (o) => o.currency, (o) => toXof(o.total, o.currency));
  const parPays = groupSum(paidOrders, (o) => o.billingCountry ?? '—', (o) => toXof(o.total, o.currency));

  return (
    <>
      <div className="flex-between mb-2">
        <h1>Tableau de bord financier</h1>
        <span className="text-muted text-small">Mis à jour le {now.toLocaleString('fr-FR')}</span>
      </div>

      <div className="grid grid-3 mb-3">
        <div className="stat stat-gold">
          <div className="stat-label">Chiffre d’affaires total</div>
          <div className="stat-value">{formatMoney(caTotal, 'XOF')}</div>
        </div>
        <div className="stat">
          <div className="stat-label">CA du jour</div>
          <div className="stat-value">{formatMoney(caJour, 'XOF')}</div>
        </div>
        <div className="stat">
          <div className="stat-label">CA du mois</div>
          <div className="stat-value">{formatMoney(caMois, 'XOF')}</div>
        </div>
      </div>

      <div className="grid grid-4 mb-3">
        <div className="stat stat-success">
          <div className="stat-label">Paiements réussis</div>
          <div className="stat-value">{txReussies}</div>
        </div>
        <div className="stat">
          <div className="stat-label">Paiements en attente</div>
          <div className="stat-value">{txEnAttente}</div>
        </div>
        <div className="stat stat-teal">
          <div className="stat-label">À vérifier</div>
          <div className="stat-value">{txAVerifier}</div>
        </div>
        <div className={`stat ${proofsPending > 0 ? 'stat-danger' : ''}`}>
          <div className="stat-label">Preuves à examiner</div>
          <div className="stat-value">
            {proofsPending}{' '}
            {proofsPending > 0 && <span className="badge badge-danger">à traiter</span>}
          </div>
          <Link href="/admin/validation" className="text-small">
            → Ouvrir la file de validation
          </Link>
        </div>
      </div>

      <div className="grid grid-4 mb-3">
        <div className="stat stat-gold">
          <div className="stat-label">Licences provisoires actives</div>
          <div className="stat-value">{licProvisoires}</div>
        </div>
        <div className="stat">
          <div className="stat-label">Licences expirant sous 7 j</div>
          <div className="stat-value">{licExpirant}</div>
        </div>
        <div className="stat stat-danger">
          <div className="stat-label">Licences expirées</div>
          <div className="stat-value">{licExpirees}</div>
        </div>
        <div className="stat stat-teal">
          <div className="stat-label">Conversion essai → payant</div>
          <div className="stat-value">{conversionRate}%</div>
          <span className="text-small text-muted">
            {convertedUsers.length}/{trialUserIds.length} comptes essai
          </span>
        </div>
      </div>

      <h2 className="mb-2 mt-3">Revenus ventilés</h2>
      <div className="grid grid-2">
        <VentTable title="Par forfait" rows={parForfait} />
        <VentTable title="Par moyen de paiement" rows={parMoyen} />
        <VentTable title="Par devise" rows={parDevise} />
        <VentTable title="Par pays de facturation" rows={parPays} />
      </div>
    </>
  );
}
