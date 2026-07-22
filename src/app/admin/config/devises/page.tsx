// Configuration des devises — SUPERADMIN uniquement, audité (CDC §18.1).
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';
import { getSessionUser, requireRole } from '@/lib/auth';
import { audit } from '@/lib/audit';

export const dynamic = 'force-dynamic';

async function createCurrency(formData: FormData) {
  'use server';
  const admin = await requireRole('superadmin');
  const code = String(formData.get('code') ?? '').trim().toUpperCase();
  const name = String(formData.get('name') ?? '').trim();
  const symbol = String(formData.get('symbol') ?? '').trim();
  const rate = parseFloat(String(formData.get('rateToXof') ?? ''));
  const decimals = parseInt(String(formData.get('decimals') ?? '0'), 10) || 0;
  if (!code || !name || !symbol || !Number.isFinite(rate) || rate <= 0) return;
  const data = { code, name, symbol, rateToXof: rate, decimals, active: formData.get('active') === 'on' };
  await prisma.currency.create({ data });
  await audit({
    actorId: admin.id,
    action: 'config.currency_create',
    entityType: 'Currency',
    entityId: code,
    after: data,
    reason: 'Ajout de devise',
  });
  revalidatePath('/admin/config/devises');
}

async function updateCurrency(formData: FormData) {
  'use server';
  const admin = await requireRole('superadmin');
  const code = String(formData.get('code') ?? '');
  const before = await prisma.currency.findUnique({ where: { code } });
  if (!before) return;
  const rate = parseFloat(String(formData.get('rateToXof') ?? ''));
  if (!Number.isFinite(rate) || rate <= 0) return;
  const data = { rateToXof: rate, active: formData.get('active') === 'on' };
  await prisma.currency.update({ where: { code }, data });
  await audit({
    actorId: admin.id,
    action: 'config.currency_update',
    entityType: 'Currency',
    entityId: code,
    before: { rateToXof: before.rateToXof, active: before.active },
    after: data,
    reason: String(formData.get('motif') ?? '').trim() || 'Mise à jour devise',
  });
  revalidatePath('/admin/config/devises');
}

export default async function DevisesConfigPage() {
  const me = await getSessionUser();
  if (!me || me.role !== 'superadmin') redirect('/admin');

  const currencies = await prisma.currency.findMany({ orderBy: { code: 'asc' } });

  return (
    <>
      <h1 className="mb-2">Configuration — Devises</h1>

      <div className="card mb-3">
        <div className="card-title">Ajouter une devise</div>
        <form action={createCurrency}>
          <div className="grid grid-4" style={{ gap: 12 }}>
            <div><label className="label">Code *</label><input className="input" name="code" required maxLength={3} placeholder="USD" /></div>
            <div><label className="label">Nom *</label><input className="input" name="name" required placeholder="Dollar américain" /></div>
            <div><label className="label">Symbole *</label><input className="input" name="symbol" required placeholder="$" /></div>
            <div><label className="label">Taux → XOF *</label><input className="input" type="number" step="any" name="rateToXof" required min={0} /></div>
            <div><label className="label">Décimales</label><input className="input" type="number" name="decimals" defaultValue={0} min={0} max={4} /></div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
              <label className="label" style={{ marginBottom: 10 }}>
                <input type="checkbox" name="active" defaultChecked /> Active
              </label>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <button className="btn btn-primary" type="submit">Ajouter</button>
            </div>
          </div>
        </form>
      </div>

      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr><th>Code</th><th>Nom</th><th>Symbole</th><th>Taux → XOF</th><th>Statut</th><th>Mettre à jour</th></tr>
          </thead>
          <tbody>
            {currencies.length === 0 && (
              <tr><td colSpan={6} className="text-center text-muted">Aucune devise configurée.</td></tr>
            )}
            {currencies.map((c) => (
              <tr key={c.code}>
                <td><strong>{c.code}</strong></td>
                <td>{c.name}</td>
                <td>{c.symbol}</td>
                <td>{c.rateToXof}</td>
                <td><span className={`badge ${c.active ? 'badge-success' : 'badge-neutral'}`}>{c.active ? 'active' : 'inactive'}</span></td>
                <td>
                  <form action={updateCurrency} className="flex" style={{ gap: 6, flexWrap: 'wrap' }}>
                    <input type="hidden" name="code" value={c.code} />
                    <input className="input" type="number" step="any" name="rateToXof" defaultValue={c.rateToXof} style={{ width: 110, padding: '6px 8px' }} />
                    <label className="text-small" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <input type="checkbox" name="active" defaultChecked={c.active} /> active
                    </label>
                    <input className="input" name="motif" placeholder="Motif" style={{ width: 130, padding: '6px 8px' }} />
                    <button className="btn btn-outline btn-sm" type="submit">OK</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
