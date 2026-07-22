// Liste des commandes — filtres statut / période / moyen / devise / recherche.
import Link from 'next/link';
import type { Prisma } from '@prisma/client';
import { prisma } from '@/lib/db';
import { formatMoney } from '@/lib/money';
import { StatusBadge, fmtDateTime, qs } from '../ui';

export const dynamic = 'force-dynamic';

const PER_PAGE = 20;
const STATUTS = [
  'brouillon', 'en_attente_paiement', 'paiement_en_cours', 'preuve_soumise', 'a_verifier',
  'informations_manquantes', 'payee', 'expiree', 'annulee', 'rejetee', 'remboursee',
];
const MOYENS = ['moneroo', 'mobile_money', 'virement_national', 'virement_international', 'transfert_international', 'especes'];

type SP = Promise<Record<string, string | string[] | undefined>>;

export default async function CommandesPage({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  const v = (k: string) => (typeof sp[k] === 'string' ? (sp[k] as string) : '');
  const statut = v('statut');
  const du = v('du');
  const au = v('au');
  const moyen = v('moyen');
  const devise = v('devise');
  const q = v('q');
  const page = Math.max(1, parseInt(v('page') || '1', 10) || 1);

  const where: Prisma.OrderWhereInput = {};
  if (statut) where.status = statut;
  if (moyen) where.paymentMethod = moyen;
  if (devise) where.currency = devise;
  if (du || au) {
    where.createdAt = {};
    if (du) where.createdAt.gte = new Date(du);
    if (au) where.createdAt.lte = new Date(`${au}T23:59:59`);
  }
  if (q) {
    where.OR = [{ number: { contains: q } }, { user: { email: { contains: q } } }];
  }

  const [total, orders, currencies] = await Promise.all([
    prisma.order.count({ where }),
    prisma.order.findMany({
      where,
      include: { user: { select: { email: true, name: true } }, plan: { select: { name: true } } },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * PER_PAGE,
      take: PER_PAGE,
    }),
    prisma.currency.findMany({ select: { code: true } }),
  ]);
  const pages = Math.max(1, Math.ceil(total / PER_PAGE));
  const filters = { statut, du, au, moyen, devise, q };

  return (
    <>
      <h1 className="mb-2">Commandes</h1>
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
            <label className="label">Moyen de paiement</label>
            <select className="select" name="moyen" defaultValue={moyen}>
              <option value="">Tous</option>
              {MOYENS.map((m) => (
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
            <label className="label">Recherche (n° commande ou email)</label>
            <input className="input" name="q" defaultValue={q} placeholder="CMD-2026-… ou client@email" />
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <button className="btn btn-primary" type="submit">Filtrer</button>
          </div>
        </div>
      </form>

      <p className="text-muted text-small mb-1">{total} commande(s)</p>
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>N°</th>
              <th>Client</th>
              <th>Forfait</th>
              <th>Montant</th>
              <th>Moyen</th>
              <th>Statut</th>
              <th>Créée le</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 && (
              <tr><td colSpan={7} className="text-center text-muted">Aucune commande.</td></tr>
            )}
            {orders.map((o) => (
              <tr key={o.id}>
                <td><strong>{o.number}</strong></td>
                <td>{o.user.name}<br /><span className="text-small text-muted">{o.user.email}</span></td>
                <td>{o.plan?.name ?? 'Document'}</td>
                <td>{formatMoney(o.total, o.currency)}</td>
                <td>{o.paymentMethod?.replace(/_/g, ' ') ?? '—'}</td>
                <td><StatusBadge status={o.status} /></td>
                <td>{fmtDateTime(o.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pages > 1 && (
        <div className="flex mt-2" style={{ justifyContent: 'center' }}>
          {page > 1 && (
            <Link className="btn btn-outline btn-sm" href={`/admin/commandes${qs({ ...filters, page: page - 1 })}`}>← Précédent</Link>
          )}
          <span className="text-small text-muted">Page {page} / {pages}</span>
          {page < pages && (
            <Link className="btn btn-outline btn-sm" href={`/admin/commandes${qs({ ...filters, page: page + 1 })}`}>Suivant →</Link>
          )}
        </div>
      )}
    </>
  );
}
