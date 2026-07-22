// Alertes anti-fraude (CDC §19.3) — jamais de rejet automatique : décision humaine.
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';
import { requireRole } from '@/lib/auth';
import { audit } from '@/lib/audit';
import { StatusBadge, fmtDateTime } from '../ui';

export const dynamic = 'force-dynamic';

async function reviewAlert(formData: FormData) {
  'use server';
  const admin = await requireRole('admin');
  const id = String(formData.get('id') ?? '');
  const decision = String(formData.get('decision') ?? '');
  const motif = String(formData.get('motif') ?? '').trim();
  if (!id || !['examinee', 'confirmee', 'ecartee'].includes(decision)) return;
  if ((decision === 'confirmee' || decision === 'ecartee') && !motif) return; // motif requis pour trancher

  const alert = await prisma.fraudAlert.findUnique({ where: { id } });
  if (!alert) return;
  await prisma.fraudAlert.update({
    where: { id },
    data: { status: decision, reviewedById: admin.id },
  });
  await audit({
    actorId: admin.id,
    action: `fraud.${decision}`,
    entityType: 'FraudAlert',
    entityId: id,
    before: { status: alert.status },
    after: { status: decision },
    reason: motif || undefined,
  });
  revalidatePath('/admin/alertes');
}

const SEV_BADGE: Record<string, string> = { faible: 'badge-neutral', moyenne: 'badge-warning', elevee: 'badge-danger' };

export default async function AlertesPage() {
  const [open, decided] = await Promise.all([
    prisma.fraudAlert.findMany({
      where: { status: { in: ['ouverte', 'examinee'] } },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.fraudAlert.findMany({
      where: { status: { in: ['confirmee', 'ecartee'] } },
      orderBy: { updatedAt: 'desc' },
      take: 20,
    }),
  ]);

  // Transactions liées (pas de relation Prisma sur FraudAlert → jointure manuelle)
  const txIds = [...new Set([...open, ...decided].map((a) => a.transactionId).filter((x): x is string => !!x))];
  const txs = txIds.length
    ? await prisma.transaction.findMany({
        where: { id: { in: txIds } },
        include: { user: { select: { email: true } }, order: { select: { number: true } } },
      })
    : [];
  const txMap = new Map(txs.map((t) => [t.id, t]));

  return (
    <>
      <h1 className="mb-1">Alertes anti-fraude</h1>
      <div className="alert alert-security mb-3">
        Politique anti-fraude (CDC §19.3) : aucune alerte n’entraîne de rejet automatique. Chaque cas est
        transféré au contrôle manuel et l’administrateur prend la décision finale.
      </div>

      <h2 className="mb-2">À traiter ({open.length})</h2>
      {open.length === 0 && <div className="card mb-3"><p className="text-muted">Aucune alerte ouverte. ✅</p></div>}
      <div className="grid mb-3" style={{ gap: 14 }}>
        {open.map((a) => {
          const tx = a.transactionId ? txMap.get(a.transactionId) : undefined;
          return (
            <div key={a.id} className="card">
              <div className="flex-between mb-1" style={{ flexWrap: 'wrap' }}>
                <div className="flex" style={{ flexWrap: 'wrap' }}>
                  <span className={`badge ${SEV_BADGE[a.severity] ?? 'badge-warning'}`}>sévérité {a.severity}</span>
                  <strong>{a.type.replace(/_/g, ' ')}</strong>
                  <StatusBadge status={a.status} />
                </div>
                <span className="text-small text-muted">{fmtDateTime(a.createdAt)}</span>
              </div>
              <p className="mb-1">{a.message}</p>
              {tx && (
                <p className="text-small text-muted mb-1">
                  Transaction : <strong>{tx.internalRef}</strong> — commande {tx.order.number} — {tx.user.email}
                </p>
              )}
              <div className="flex" style={{ flexWrap: 'wrap', alignItems: 'flex-end' }}>
                {a.status === 'ouverte' && (
                  <form action={reviewAlert}>
                    <input type="hidden" name="id" value={a.id} />
                    <input type="hidden" name="decision" value="examinee" />
                    <button className="btn btn-outline btn-sm" type="submit">Marquer examinée</button>
                  </form>
                )}
                <form action={reviewAlert} className="flex" style={{ flexWrap: 'wrap', alignItems: 'flex-end' }}>
                  <input type="hidden" name="id" value={a.id} />
                  <div>
                    <label className="label text-small">Motif de la décision *</label>
                    <input className="input" name="motif" required placeholder="Motif obligatoire" style={{ width: 260 }} />
                  </div>
                  <button className="btn btn-danger btn-sm" type="submit" name="decision" value="confirmee">
                    Confirmer la fraude
                  </button>
                  <button className="btn btn-ghost btn-sm" type="submit" name="decision" value="ecartee">
                    Écarter
                  </button>
                </form>
              </div>
            </div>
          );
        })}
      </div>

      <h2 className="mb-2">Décisions récentes</h2>
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr><th>Type</th><th>Sévérité</th><th>Message</th><th>Transaction</th><th>Décision</th><th>Date</th></tr>
          </thead>
          <tbody>
            {decided.length === 0 && (
              <tr><td colSpan={6} className="text-center text-muted">Aucune décision.</td></tr>
            )}
            {decided.map((a) => {
              const tx = a.transactionId ? txMap.get(a.transactionId) : undefined;
              return (
                <tr key={a.id}>
                  <td>{a.type.replace(/_/g, ' ')}</td>
                  <td><span className={`badge ${SEV_BADGE[a.severity] ?? 'badge-warning'}`}>{a.severity}</span></td>
                  <td className="text-small">{a.message}</td>
                  <td className="text-small">{tx ? tx.internalRef : '—'}</td>
                  <td><StatusBadge status={a.status} /></td>
                  <td className="text-small">{fmtDateTime(a.updatedAt)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
