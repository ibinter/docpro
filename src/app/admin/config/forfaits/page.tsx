// Configuration des forfaits (Plan) — SUPERADMIN uniquement. Chaque modification est auditée.
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';
import { getSessionUser, requireRole } from '@/lib/auth';
import { audit } from '@/lib/audit';
import { formatMoney } from '@/lib/money';

export const dynamic = 'force-dynamic';

function toInt(v: FormDataEntryValue | null, fallback = 0): number {
  const n = parseInt(String(v ?? ''), 10);
  return Number.isFinite(n) ? n : fallback;
}
function toIntOrNull(v: FormDataEntryValue | null): number | null {
  const s = String(v ?? '').trim();
  if (!s) return null;
  const n = parseInt(s, 10);
  return Number.isFinite(n) ? n : null;
}

function planDataFromForm(formData: FormData) {
  return {
    code: String(formData.get('code') ?? '').trim().toUpperCase(),
    name: String(formData.get('name') ?? '').trim(),
    description: String(formData.get('description') ?? '').trim() || null,
    price: toInt(formData.get('price')),
    promoPrice: toIntOrNull(formData.get('promoPrice')),
    currency: String(formData.get('currency') ?? 'XOF').trim() || 'XOF',
    durationType: String(formData.get('durationType') ?? 'months'),
    durationValue: toInt(formData.get('durationValue'), 1),
    maxUsers: toInt(formData.get('maxUsers'), 1),
    maxEntities: toInt(formData.get('maxEntities'), 1),
    docsPerMonth: toIntOrNull(formData.get('docsPerMonth')),
    storageMb: toInt(formData.get('storageMb'), 1024),
    trialDays: toInt(formData.get('trialDays'), 0),
    displayOrder: toInt(formData.get('displayOrder'), 0),
    active: formData.get('active') === 'on',
  };
}

async function createPlan(formData: FormData) {
  'use server';
  const admin = await requireRole('superadmin');
  const data = planDataFromForm(formData);
  if (!data.code || !data.name || data.price < 0) return;
  const plan = await prisma.plan.create({ data });
  await audit({
    actorId: admin.id,
    action: 'config.plan_create',
    entityType: 'Plan',
    entityId: plan.id,
    after: data,
    reason: 'Création de forfait',
  });
  revalidatePath('/admin/config/forfaits');
}

async function updatePlan(formData: FormData) {
  'use server';
  const admin = await requireRole('superadmin');
  const id = String(formData.get('id') ?? '');
  const before = await prisma.plan.findUnique({ where: { id } });
  if (!before) return;
  const data = planDataFromForm(formData);
  if (!data.code || !data.name) return;
  await prisma.plan.update({ where: { id }, data });
  await audit({
    actorId: admin.id,
    action: 'config.plan_update',
    entityType: 'Plan',
    entityId: id,
    before,
    after: data,
    reason: String(formData.get('motif') ?? '').trim() || 'Modification de forfait',
  });
  revalidatePath('/admin/config/forfaits');
}

function PlanForm({ action, plan, submitLabel }: {
  action: (formData: FormData) => Promise<void>;
  plan?: {
    id: string; code: string; name: string; description: string | null; price: number;
    promoPrice: number | null; currency: string; durationType: string; durationValue: number;
    maxUsers: number; maxEntities: number; docsPerMonth: number | null; storageMb: number;
    trialDays: number; displayOrder: number; active: boolean;
  };
  submitLabel: string;
}) {
  return (
    <form action={action}>
      {plan && <input type="hidden" name="id" value={plan.id} />}
      <div className="grid grid-4" style={{ gap: 12 }}>
        <div><label className="label">Code *</label><input className="input" name="code" required defaultValue={plan?.code} /></div>
        <div><label className="label">Nom *</label><input className="input" name="name" required defaultValue={plan?.name} /></div>
        <div><label className="label">Prix (unité mineure) *</label><input className="input" type="number" name="price" required min={0} defaultValue={plan?.price} /></div>
        <div><label className="label">Prix promo</label><input className="input" type="number" name="promoPrice" min={0} defaultValue={plan?.promoPrice ?? ''} /></div>
        <div><label className="label">Devise</label><input className="input" name="currency" defaultValue={plan?.currency ?? 'XOF'} /></div>
        <div>
          <label className="label">Type de durée</label>
          <select className="select" name="durationType" defaultValue={plan?.durationType ?? 'months'}>
            <option value="days">Jours</option>
            <option value="months">Mois</option>
            <option value="years">Années</option>
            <option value="perpetual">Perpétuelle</option>
          </select>
        </div>
        <div><label className="label">Valeur durée</label><input className="input" type="number" name="durationValue" min={1} defaultValue={plan?.durationValue ?? 1} /></div>
        <div><label className="label">Jours d’essai</label><input className="input" type="number" name="trialDays" min={0} defaultValue={plan?.trialDays ?? 0} /></div>
        <div><label className="label">Utilisateurs max</label><input className="input" type="number" name="maxUsers" min={1} defaultValue={plan?.maxUsers ?? 1} /></div>
        <div><label className="label">Entités max</label><input className="input" type="number" name="maxEntities" min={1} defaultValue={plan?.maxEntities ?? 1} /></div>
        <div><label className="label">Docs / mois (vide = illimité)</label><input className="input" type="number" name="docsPerMonth" min={0} defaultValue={plan?.docsPerMonth ?? ''} /></div>
        <div><label className="label">Stockage (Mo)</label><input className="input" type="number" name="storageMb" min={0} defaultValue={plan?.storageMb ?? 1024} /></div>
        <div><label className="label">Ordre d’affichage</label><input className="input" type="number" name="displayOrder" defaultValue={plan?.displayOrder ?? 0} /></div>
        <div style={{ gridColumn: 'span 2' }}><label className="label">Description</label><input className="input" name="description" defaultValue={plan?.description ?? ''} /></div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
          <label className="label" style={{ marginBottom: 0 }}>
            <input type="checkbox" name="active" defaultChecked={plan ? plan.active : true} /> Actif
          </label>
        </div>
        {plan && (
          <div style={{ gridColumn: 'span 2' }}>
            <label className="label">Motif de modification</label>
            <input className="input" name="motif" placeholder="Ex : révision tarifaire" />
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <button className="btn btn-primary" type="submit">{submitLabel}</button>
        </div>
      </div>
    </form>
  );
}

export default async function ForfaitsConfigPage() {
  const me = await getSessionUser();
  if (!me || me.role !== 'superadmin') redirect('/admin');

  const plans = await prisma.plan.findMany({ orderBy: { displayOrder: 'asc' } });

  return (
    <>
      <h1 className="mb-2">Configuration — Forfaits</h1>
      <div className="card mb-3">
        <div className="card-title">Créer un forfait</div>
        <PlanForm action={createPlan} submitLabel="Créer" />
      </div>

      <h2 className="mb-2">Forfaits existants ({plans.length})</h2>
      {plans.map((p) => (
        <details key={p.id} className="card mb-2">
          <summary style={{ cursor: 'pointer', fontWeight: 700 }}>
            {p.name} ({p.code}) — {formatMoney(p.promoPrice ?? p.price, p.currency)}
            {p.promoPrice != null && <s className="text-muted" style={{ marginLeft: 8 }}>{formatMoney(p.price, p.currency)}</s>}{' '}
            <span className={`badge ${p.active ? 'badge-success' : 'badge-neutral'}`}>{p.active ? 'actif' : 'inactif'}</span>
          </summary>
          <div className="mt-2">
            <PlanForm action={updatePlan} plan={p} submitLabel="Enregistrer" />
          </div>
        </details>
      ))}
    </>
  );
}
