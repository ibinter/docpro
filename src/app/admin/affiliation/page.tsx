// Gestion du programme affilié (CDC §7.3) — commissions 15 %.
// Workflow : en_attente → approuvee → payee (ou annulee avec motif). Tout est audité.
import Link from 'next/link';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';
import { requireRole } from '@/lib/auth';
import { audit } from '@/lib/audit';
import { notifyUser } from '@/lib/notify';
import { formatMoney } from '@/lib/money';
import { computeAffiliateEarnings, AFFILIATE_PAYOUT_THRESHOLD } from '@/lib/affiliate';
import { fmtDateTime } from '../ui';

export const dynamic = 'force-dynamic';

const STATUTS = ['en_attente', 'approuvee', 'payee', 'annulee'] as const;

const STATUS_LABELS: Record<string, string> = {
  en_attente: 'En attente',
  approuvee: 'Approuvée',
  payee: 'Payée',
  annulee: 'Annulée',
};

const STATUS_BADGES: Record<string, string> = {
  en_attente: 'badge-warning',
  approuvee: 'badge-info',
  payee: 'badge-success',
  annulee: 'badge-danger',
};

// ── Server actions ────────────────────────────────────────────────────────────

async function computeNow() {
  'use server';
  const admin = await requireRole('admin');
  const result = await computeAffiliateEarnings();
  await audit({
    actorId: admin.id,
    action: 'affiliate.compute',
    entityType: 'AffiliateEarning',
    entityId: 'batch',
    after: result,
  });
  revalidatePath('/admin/affiliation');
}

async function updateEarning(formData: FormData) {
  'use server';
  const admin = await requireRole('admin');
  const id = String(formData.get('id') ?? '');
  const action = String(formData.get('action') ?? '');
  const motif = String(formData.get('motif') ?? '').trim();
  if (!id || !['approuver', 'payer', 'annuler'].includes(action)) return;
  if (action === 'annuler' && !motif) return; // motif obligatoire pour annuler

  const earning = await prisma.affiliateEarning.findUnique({ where: { id } });
  if (!earning) return;

  // Transitions autorisées uniquement.
  let next: string | null = null;
  if (action === 'approuver' && earning.status === 'en_attente') next = 'approuvee';
  if (action === 'payer' && earning.status === 'approuvee') next = 'payee';
  if (action === 'annuler' && earning.status !== 'payee' && earning.status !== 'annulee') next = 'annulee';
  if (!next) return;

  await prisma.affiliateEarning.update({ where: { id }, data: { status: next } });
  await audit({
    actorId: admin.id,
    action: `affiliate.${action}`,
    entityType: 'AffiliateEarning',
    entityId: id,
    before: { status: earning.status },
    after: { status: next },
    reason: motif || undefined,
  });

  if (next === 'payee') {
    await notifyUser({
      userId: earning.affiliateId,
      event: 'commission_payee',
      title: 'Commission payée 💰',
      body: `Votre commission de ${formatMoney(earning.amount, earning.currency)} a été payée par Mobile Money.`,
    });
  } else if (next === 'annulee') {
    await notifyUser({
      userId: earning.affiliateId,
      event: 'commission_annulee',
      title: 'Commission annulée',
      body: `Votre commission de ${formatMoney(earning.amount, earning.currency)} a été annulée. Motif : ${motif}.`,
    });
  }
  revalidatePath('/admin/affiliation');
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function AdminAffiliationPage({
  searchParams,
}: {
  searchParams: Promise<{ statut?: string }>;
}) {
  await requireRole('admin');
  const { statut } = await searchParams;
  const filtre = statut && (STATUTS as readonly string[]).includes(statut) ? statut : null;

  const [earnings, totalsByStatus, totalsByAffiliate] = await Promise.all([
    prisma.affiliateEarning.findMany({
      where: filtre ? { status: filtre } : {},
      orderBy: { createdAt: 'desc' },
      take: 200,
    }),
    prisma.affiliateEarning.groupBy({
      by: ['status'],
      _sum: { amount: true },
      _count: true,
    }),
    prisma.affiliateEarning.groupBy({
      by: ['affiliateId', 'status'],
      _sum: { amount: true },
    }),
  ]);

  // Utilisateurs concernés (pas de relation Prisma → jointure manuelle).
  const userIds = [
    ...new Set([
      ...earnings.map((e) => e.affiliateId),
      ...earnings.map((e) => e.referredId),
      ...totalsByAffiliate.map((t) => t.affiliateId),
    ]),
  ];
  const users = userIds.length
    ? await prisma.user.findMany({
        where: { id: { in: userIds } },
        select: { id: true, name: true, email: true, phone: true },
      })
    : [];
  const userMap = new Map(users.map((u) => [u.id, u]));

  const sumOf = (status: string) => totalsByStatus.find((t) => t.status === status)?._sum.amount ?? 0;

  // Totaux par affilié : {affiliateId → {en_attente, approuvee, payee}}.
  const perAffiliate = new Map<string, Record<string, number>>();
  for (const t of totalsByAffiliate) {
    const rec = perAffiliate.get(t.affiliateId) ?? {};
    rec[t.status] = t._sum.amount ?? 0;
    perAffiliate.set(t.affiliateId, rec);
  }

  return (
    <>
      <div className="flex-between mb-1" style={{ flexWrap: 'wrap', gap: 10 }}>
        <h1>Programme affilié — commissions</h1>
        <form action={computeNow}>
          <button className="btn btn-primary btn-sm" type="submit">⚙ Calculer les commissions maintenant</button>
        </form>
      </div>
      <p className="text-muted mb-3">
        Commission de 15 % sur chaque commande payée d&apos;un filleul (idempotent — une commission par commande).
        Paiement Mobile Money dès {formatMoney(AFFILIATE_PAYOUT_THRESHOLD)} approuvés.
      </p>

      <div className="grid grid-4 mb-3">
        <div className="stat stat-gold">
          <div className="stat-value">{formatMoney(sumOf('en_attente'))}</div>
          <div className="stat-label">En attente</div>
        </div>
        <div className="stat stat-teal">
          <div className="stat-value">{formatMoney(sumOf('approuvee'))}</div>
          <div className="stat-label">Approuvées</div>
        </div>
        <div className="stat stat-success">
          <div className="stat-value">{formatMoney(sumOf('payee'))}</div>
          <div className="stat-label">Payées</div>
        </div>
        <div className="stat stat-danger">
          <div className="stat-value">{formatMoney(sumOf('annulee'))}</div>
          <div className="stat-label">Annulées</div>
        </div>
      </div>

      <h2 className="mb-2">Totaux par affilié</h2>
      <div className="table-wrap mb-3">
        <table className="table">
          <thead>
            <tr>
              <th>Affilié</th>
              <th>Téléphone (Mobile Money)</th>
              <th>En attente</th>
              <th>Approuvées</th>
              <th>Payées</th>
            </tr>
          </thead>
          <tbody>
            {perAffiliate.size === 0 && (
              <tr><td colSpan={5} className="text-center text-muted">Aucune commission.</td></tr>
            )}
            {[...perAffiliate.entries()].map(([affiliateId, rec]) => {
              const u = userMap.get(affiliateId);
              const approuvees = rec['approuvee'] ?? 0;
              return (
                <tr key={affiliateId}>
                  <td>
                    <strong>{u?.name ?? '—'}</strong>
                    <div className="text-small text-muted">{u?.email ?? affiliateId}</div>
                  </td>
                  <td className="text-small">{u?.phone ?? '—'}</td>
                  <td>{formatMoney(rec['en_attente'] ?? 0)}</td>
                  <td>
                    {formatMoney(approuvees)}{' '}
                    {approuvees >= AFFILIATE_PAYOUT_THRESHOLD && (
                      <span className="badge badge-gold">seuil atteint</span>
                    )}
                  </td>
                  <td>{formatMoney(rec['payee'] ?? 0)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex-between mb-2" style={{ flexWrap: 'wrap', gap: 10 }}>
        <h2>Commissions {filtre ? `— ${STATUS_LABELS[filtre]}` : ''}</h2>
        <div className="flex" style={{ flexWrap: 'wrap', gap: 6 }}>
          <Link href="/admin/affiliation" className={`btn btn-sm ${!filtre ? 'btn-primary' : 'btn-outline'}`}>
            Toutes
          </Link>
          {STATUTS.map((s) => (
            <Link
              key={s}
              href={`/admin/affiliation?statut=${s}`}
              className={`btn btn-sm ${filtre === s ? 'btn-primary' : 'btn-outline'}`}
            >
              {STATUS_LABELS[s]}
            </Link>
          ))}
        </div>
      </div>

      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Affilié</th>
              <th>Filleul</th>
              <th>Montant</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {earnings.length === 0 && (
              <tr><td colSpan={6} className="text-center text-muted">Aucune commission.</td></tr>
            )}
            {earnings.map((e) => {
              const aff = userMap.get(e.affiliateId);
              const ref = userMap.get(e.referredId);
              return (
                <tr key={e.id}>
                  <td className="text-small">{fmtDateTime(e.createdAt)}</td>
                  <td className="text-small">{aff?.email ?? e.affiliateId}</td>
                  <td className="text-small">{ref?.email ?? e.referredId}</td>
                  <td><strong>{formatMoney(e.amount, e.currency)}</strong></td>
                  <td>
                    <span className={`badge ${STATUS_BADGES[e.status] ?? 'badge-neutral'}`}>
                      {STATUS_LABELS[e.status] ?? e.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex" style={{ flexWrap: 'wrap', gap: 6, alignItems: 'flex-end' }}>
                      {e.status === 'en_attente' && (
                        <form action={updateEarning}>
                          <input type="hidden" name="id" value={e.id} />
                          <input type="hidden" name="action" value="approuver" />
                          <button className="btn btn-success btn-sm" type="submit">Approuver</button>
                        </form>
                      )}
                      {e.status === 'approuvee' && (
                        <form action={updateEarning}>
                          <input type="hidden" name="id" value={e.id} />
                          <input type="hidden" name="action" value="payer" />
                          <button className="btn btn-primary btn-sm" type="submit">Marquer payée</button>
                        </form>
                      )}
                      {e.status !== 'payee' && e.status !== 'annulee' && (
                        <form action={updateEarning} className="flex" style={{ gap: 6, alignItems: 'flex-end' }}>
                          <input type="hidden" name="id" value={e.id} />
                          <input type="hidden" name="action" value="annuler" />
                          <input
                            className="input"
                            name="motif"
                            required
                            placeholder="Motif d'annulation"
                            style={{ width: 170, padding: '6px 10px', fontSize: '0.85rem' }}
                          />
                          <button className="btn btn-danger btn-sm" type="submit">Annuler</button>
                        </form>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
