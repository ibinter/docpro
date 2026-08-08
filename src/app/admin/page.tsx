// Tableau de bord financier (CDC §17.2).
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { formatMoney } from '@/lib/money';

export const dynamic = 'force-dynamic';

type Ventilation = { label: string; count: number; totalXof: number };

/** Agrège des lignes groupBy (déjà agrégées en SQL) par libellé, avec conversion en XOF. */
function fromGroups<T extends { currency: string; _sum: { total: number | null }; _count: { _all: number } }>(
  rows: T[],
  label: (r: T) => string,
  toXof: (total: number, currency: string) => number,
): Ventilation[] {
  const map = new Map<string, Ventilation>();
  for (const r of rows) {
    const k = label(r) || '—';
    const cur = map.get(k) ?? { label: k, count: 0, totalXof: 0 };
    cur.count += r._count._all;
    cur.totalXof += toXof(r._sum.total ?? 0, r.currency);
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

  // Toutes les ventilations sont calculées par la base (groupBy) : aucune commande
  // n'est chargée en mémoire — le tableau de bord reste instantané quel que soit
  // le volume de commandes.
  const PAYEE = { status: 'payee' } as const;

  const [
    currencies,
    plans,
    grpDevise,
    grpJour,
    grpMois,
    grpForfait,
    grpMoyen,
    grpPays,
    txReussies,
    txEnAttente,
    txAVerifier,
    proofsPending,
    licProvisoires,
    licExpirant,
    licExpirees,
    trialUsers,
    convertedUsers,
  ] = await Promise.all([
    prisma.currency.findMany({ select: { code: true, rateToXof: true } }),
    prisma.plan.findMany({ select: { id: true, name: true } }),
    prisma.order.groupBy({ by: ['currency'], where: PAYEE, _sum: { total: true }, _count: { _all: true } }),
    prisma.order.groupBy({ by: ['currency'], where: { ...PAYEE, updatedAt: { gte: startOfDay } }, _sum: { total: true }, _count: { _all: true } }),
    prisma.order.groupBy({ by: ['currency'], where: { ...PAYEE, updatedAt: { gte: startOfMonth } }, _sum: { total: true }, _count: { _all: true } }),
    prisma.order.groupBy({ by: ['planId', 'currency'], where: PAYEE, _sum: { total: true }, _count: { _all: true } }),
    prisma.order.groupBy({ by: ['paymentMethod', 'currency'], where: PAYEE, _sum: { total: true }, _count: { _all: true } }),
    prisma.order.groupBy({ by: ['billingCountry', 'currency'], where: PAYEE, _sum: { total: true }, _count: { _all: true } }),
    prisma.transaction.count({ where: { status: { in: ['reussie', 'validee_manuellement'] } } }),
    prisma.transaction.count({ where: { status: { in: ['initialisee', 'en_attente', 'en_cours'] } } }),
    prisma.transaction.count({ where: { status: 'a_verifier' } }),
    prisma.paymentProof.count({ where: { status: { in: ['soumise', 'en_cours'] } } }),
    prisma.license.count({ where: { status: 'provisoire' } }),
    prisma.license.count({ where: { status: 'active', endDate: { gte: now, lte: in7days } } }),
    prisma.license.count({ where: { status: 'expiree' } }),
    // Conversion essai → payant : un groupBy par utilisateur suffit (pas de lignes complètes)
    prisma.license.groupBy({ by: ['userId'], where: { orderId: null } }),
    prisma.license.groupBy({ by: ['userId'], where: { orderId: { not: null } } }),
  ]);

  const payantIds = new Set(convertedUsers.map((l) => l.userId));
  const convertis = trialUsers.filter((l) => payantIds.has(l.userId)).length;
  const conversionRate = trialUsers.length ? Math.round((convertis / trialUsers.length) * 100) : 0;

  const rates: Record<string, number> = Object.fromEntries(currencies.map((c) => [c.code, c.rateToXof || 1]));
  const toXof = (total: number, currency: string) => Math.round(total * (rates[currency] ?? 1));
  const sumXof = (rows: { currency: string; _sum: { total: number | null } }[]) =>
    rows.reduce((s, r) => s + toXof(r._sum.total ?? 0, r.currency), 0);

  const caTotal = sumXof(grpDevise);
  const caJour = sumXof(grpJour);
  const caMois = sumXof(grpMois);

  const planName = new Map(plans.map((p) => [p.id, p.name]));
  const parForfait = fromGroups(grpForfait, (r) => (r.planId ? planName.get(r.planId) ?? 'Forfait supprimé' : 'Document à l’unité'), toXof);
  const parMoyen = fromGroups(grpMoyen, (r) => r.paymentMethod ?? '—', toXof);
  const parDevise = fromGroups(grpDevise, (r) => r.currency, toXof);
  const parPays = fromGroups(grpPays, (r) => r.billingCountry ?? '—', toXof);

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
            {convertis}/{trialUsers.length} comptes essai
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
