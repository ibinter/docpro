// Configuration des moyens de paiement (PaymentChannel) — SUPERADMIN uniquement, audité.
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';
import { getSessionUser, requireRole } from '@/lib/auth';
import { audit } from '@/lib/audit';

export const dynamic = 'force-dynamic';

const TYPES = ['mobile_money', 'banque_nationale', 'banque_internationale', 'transfert_international', 'especes', 'processeur'];

function toIntOrNull(v: FormDataEntryValue | null): number | null {
  const s = String(v ?? '').trim();
  if (!s) return null;
  const n = parseInt(s, 10);
  return Number.isFinite(n) ? n : null;
}

function channelDataFromForm(formData: FormData) {
  let detailsJson = String(formData.get('detailsJson') ?? '{}').trim() || '{}';
  try {
    detailsJson = JSON.stringify(JSON.parse(detailsJson)); // validation + normalisation
  } catch {
    return null; // JSON invalide → on n'enregistre pas
  }
  return {
    type: String(formData.get('type') ?? 'mobile_money'),
    provider: String(formData.get('provider') ?? '').trim(),
    label: String(formData.get('label') ?? '').trim(),
    country: String(formData.get('country') ?? '').trim().toUpperCase() || null,
    currency: String(formData.get('currency') ?? 'XOF').trim() || 'XOF',
    detailsJson,
    instructions: String(formData.get('instructions') ?? '').trim() || null,
    minAmount: toIntOrNull(formData.get('minAmount')),
    maxAmount: toIntOrNull(formData.get('maxAmount')),
    displayOrder: toIntOrNull(formData.get('displayOrder')) ?? 0,
    active: formData.get('active') === 'on',
  };
}

async function createChannel(formData: FormData) {
  'use server';
  const admin = await requireRole('superadmin');
  const data = channelDataFromForm(formData);
  if (!data || !data.provider || !data.label) return;
  const ch = await prisma.paymentChannel.create({ data });
  await audit({
    actorId: admin.id,
    action: 'config.channel_create',
    entityType: 'PaymentChannel',
    entityId: ch.id,
    after: data,
    reason: 'Création moyen de paiement',
  });
  revalidatePath('/admin/config/canaux');
}

async function updateChannel(formData: FormData) {
  'use server';
  const admin = await requireRole('superadmin');
  const id = String(formData.get('id') ?? '');
  const before = await prisma.paymentChannel.findUnique({ where: { id } });
  if (!before) return;
  const data = channelDataFromForm(formData);
  if (!data || !data.provider || !data.label) return;
  await prisma.paymentChannel.update({ where: { id }, data });
  await audit({
    actorId: admin.id,
    action: 'config.channel_update',
    entityType: 'PaymentChannel',
    entityId: id,
    before,
    after: data,
    reason: String(formData.get('motif') ?? '').trim() || 'Modification moyen de paiement',
  });
  revalidatePath('/admin/config/canaux');
}

function ChannelForm({ action, ch, submitLabel }: {
  action: (formData: FormData) => Promise<void>;
  ch?: {
    id: string; type: string; provider: string; label: string; country: string | null;
    currency: string; detailsJson: string; instructions: string | null;
    minAmount: number | null; maxAmount: number | null; displayOrder: number; active: boolean;
  };
  submitLabel: string;
}) {
  return (
    <form action={action}>
      {ch && <input type="hidden" name="id" value={ch.id} />}
      <div className="grid grid-4" style={{ gap: 12 }}>
        <div>
          <label className="label">Type *</label>
          <select className="select" name="type" defaultValue={ch?.type ?? 'mobile_money'}>
            {TYPES.map((t) => <option key={t} value={t}>{t.replace(/_/g, ' ')}</option>)}
          </select>
        </div>
        <div><label className="label">Fournisseur *</label><input className="input" name="provider" required defaultValue={ch?.provider} placeholder="Orange Money, BICICI…" /></div>
        <div><label className="label">Libellé *</label><input className="input" name="label" required defaultValue={ch?.label} /></div>
        <div><label className="label">Pays (ISO-2, vide = tous)</label><input className="input" name="country" maxLength={2} defaultValue={ch?.country ?? ''} /></div>
        <div><label className="label">Devise</label><input className="input" name="currency" defaultValue={ch?.currency ?? 'XOF'} /></div>
        <div><label className="label">Montant min</label><input className="input" type="number" name="minAmount" defaultValue={ch?.minAmount ?? ''} /></div>
        <div><label className="label">Montant max</label><input className="input" type="number" name="maxAmount" defaultValue={ch?.maxAmount ?? ''} /></div>
        <div><label className="label">Ordre</label><input className="input" type="number" name="displayOrder" defaultValue={ch?.displayOrder ?? 0} /></div>
        <div style={{ gridColumn: 'span 2' }}>
          <label className="label">Coordonnées (JSON) *</label>
          <textarea className="textarea" name="detailsJson" defaultValue={ch?.detailsJson ?? '{\n  "numero": ""\n}'} />
          <p className="form-hint">Numéro de réception, RIB, IBAN, SWIFT… Un JSON invalide sera refusé.</p>
        </div>
        <div style={{ gridColumn: 'span 2' }}>
          <label className="label">Instructions client</label>
          <textarea className="textarea" name="instructions" defaultValue={ch?.instructions ?? ''} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <label className="label" style={{ marginBottom: 0 }}>
            <input type="checkbox" name="active" defaultChecked={ch ? ch.active : true} /> Actif
          </label>
        </div>
        {ch && (
          <div style={{ gridColumn: 'span 2' }}>
            <label className="label">Motif de modification</label>
            <input className="input" name="motif" />
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <button className="btn btn-primary" type="submit">{submitLabel}</button>
        </div>
      </div>
    </form>
  );
}

export default async function CanauxConfigPage() {
  const me = await getSessionUser();
  if (!me || me.role !== 'superadmin') redirect('/admin');

  const channels = await prisma.paymentChannel.findMany({ orderBy: [{ displayOrder: 'asc' }, { provider: 'asc' }] });

  return (
    <>
      <h1 className="mb-2">Configuration — Moyens de paiement</h1>
      <div className="card mb-3">
        <div className="card-title">Ajouter un canal</div>
        <ChannelForm action={createChannel} submitLabel="Créer" />
      </div>

      <h2 className="mb-2">Canaux existants ({channels.length})</h2>
      {channels.map((c) => (
        <details key={c.id} className="card mb-2">
          <summary style={{ cursor: 'pointer', fontWeight: 700 }}>
            {c.label} — {c.provider} ({c.type.replace(/_/g, ' ')}) {c.country ? `· ${c.country}` : '· tous pays'} · {c.currency}{' '}
            <span className={`badge ${c.active ? 'badge-success' : 'badge-neutral'}`}>{c.active ? 'actif' : 'inactif'}</span>
          </summary>
          <div className="mt-2">
            <ChannelForm action={updateChannel} ch={c} submitLabel="Enregistrer" />
          </div>
        </details>
      ))}
    </>
  );
}
