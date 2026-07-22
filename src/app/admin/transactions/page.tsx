// Liste des transactions — filtres statut / période / fournisseur / devise / recherche référence.
import Link from 'next/link';
import type { Prisma } from '@prisma/client';
import { prisma } from '@/lib/db';
import { formatMoney } from '@/lib/money';
import { StatusBadge, fmtDateTime, qs } from '../ui';

export const dynamic = 'force-dynamic';

const PER_PAGE = 20;
const STATUTS = [
  'initialisee', 'en_attente', 'en_cours', 'reussie', 'echouee', 'annulee', 'expiree',
  'a_verifier', 'validee_manuellement', 'rejetee', 'remboursee', 'contestee',
];
const METHODES = ['electronique', 'mobile_money_manuel', 'virement_national', 'virement_international', 'transfert_international', 'especes'];

type SP = Promise<Record<string, string | string[] | undefined>>;

export default async function TransactionsPage({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  const v = (k: string) => (typeof sp[k] === 'string' ? (sp[k] as string) : '');
  const statut = v('statut');
  const du = v('du');
  const au = v('au');
  const methode = v('methode');
  const devise = v('devise');
  const q = v('q');
  const page = Math.max(1, parseInt(v('page') || '1', 10) || 1);

  const where: Prisma.TransactionWhereInput = {};
  if (statut) where.status = statut;
  if (methode) where.method = methode;
  if (devise) where.currency = devise;
  if (du || au) {
    where.createdAt = {};
    if (du) where.createdAt.gte = new Date(du);
    if (au) where.createdAt.lte = new Date(`${au}T23:59:59`);
  }
  if (q) {
    where.OR = [
      { internalRef: { contains: q } },
      { externalRef: { contains: q } },
      { user: { email: { contains: q } } },
    ];
  }

  const [total, txs, currencies] = await Promise.all([
    prisma.transaction.count({ where }),
    prisma.transaction.findMany({
      where,
      include: {
        user: { select: { email: true } },
        order: { select: { number: true } },
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * PER_PAGE,
      take: PER_PAGE,
    }),
    prisma.currency.findMany({ select: { code: true } }),
  ]);
  const pages = Math.max(1, Math.ceil(total / PER_PAGE));
  const filters = { statut, du, au, methode, devise, q };

  return (
    <>
      <h1 className="mb-2">Transactions</h1>
      <form method="get" className="card mb-3">
        <div className="grid grid-4" style={{ gap: 12 }}>
          <div>
            <label className="label">Statut</label>
            <select className="select" name="statut" defaultValue={statut}>
              <option value="">Tous</option>
              {STATUTS.map((s) => (
                <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Du</label>
            <input className="input" type="date" name="du" defaultValue={du} />
          </div>
          <div>
            <label className="label">Au</label>
            <input className="input" type="date" name="au" defaultValue={au} />
          </div>
          <div>
            <label className="label">Méthode</label>
            <select className="select" name="methode" defaultValue={methode}>
              <option value="">Toutes</option>
              {METHODES.map((m) => (
                <option key={m} value={m}>{m.replace(/_/g, ' ')}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Devise</label>
            <select className="select" name="devise" defaultValue={devise}>
              <option value="">Toutes</option>
              {currencies.map((c) => (
                <option key={c.code} value={c.code}>{c.code}</option>
              ))}
            </select>
          </div>
          <div style={{ gridColumn: 'span 2' }}>
            <label className="label">Recherche (référence ou email)</label>
            <input className="input" name="q" defaultValue={q} placeholder="Référence interne/externe ou email" />
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <button className="btn btn-primary" type="submit">Filtrer</button>
          </div>
        </div>
      </form>

      <p className="text-muted text-small mb-1">{total} transaction(s)</p>
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Réf. interne</th>
              <th>Commande</th>
              <th>Client</th>
              <th>Fournisseur</th>
              <th>Attendu</th>
              <th>Déclaré</th>
              <th>Reçu</th>
              <th>Statut</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {txs.length === 0 && (
              <tr><td colSpan={9} className="text-center text-muted">Aucune transaction.</td></tr>
            )}
            {txs.map((t) => {
              const ecart = t.amountDeclared != null && t.amountDeclared !== t.amountExpected;
              return (
                <tr key={t.id}>
                  <td>
                    <strong>{t.internalRef}</strong>
                    {t.externalRef && <><br /><span className="text-small text-muted">{t.externalRef}</span></>}
                  </td>
                  <td>{t.order.number}</td>
                  <td className="text-small">{t.user.email}</td>
                  <td>{t.provider}</td>
                  <td>{formatMoney(t.amountExpected, t.currency)}</td>
                  <td style={ecart ? { color: 'var(--danger)', fontWeight: 700 } : undefined}>
                    {t.amountDeclared != null ? formatMoney(t.amountDeclared, t.currency) : '—'}
                  </td>
                  <td>{t.amountReceived != null ? formatMoney(t.amountReceived, t.currency) : '—'}</td>
                  <td><StatusBadge status={t.status} /></td>
                  <td className="text-small">{fmtDateTime(t.createdAt)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {pages > 1 && (
        <div className="flex mt-2" style={{ justifyContent: 'center' }}>
          {page > 1 && (
            <Link className="btn btn-outline btn-sm" href={`/admin/transactions${qs({ ...filters, page: page - 1 })}`}>← Précédent</Link>
          )}
          <span className="text-small text-muted">Page {page} / {pages}</span>
          {page < pages && (
            <Link className="btn btn-outline btn-sm" href={`/admin/transactions${qs({ ...filters, page: page + 1 })}`}>Suivant →</Link>
          )}
        </div>
      )}
    </>
  );
}
