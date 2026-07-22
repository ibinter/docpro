// Paramètres des factures (CDC §16.2) — SUPERADMIN, stockés dans Setting, audité.
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';
import { getSessionUser, requireRole } from '@/lib/auth';
import { audit } from '@/lib/audit';
import { getInvoiceSettings, INVOICE_SETTING_KEYS } from '@/lib/invoice-settings';

export const dynamic = 'force-dynamic';

async function saveInvoiceSettings(formData: FormData) {
  'use server';
  const admin = await requireRole('superadmin');
  const before = await getInvoiceSettings();

  const rate = parseFloat(String(formData.get('defaultTaxRate') ?? ''));
  const after = {
    legalMentions: String(formData.get('legalMentions') ?? '').trim(),
    stampText: String(formData.get('stampText') ?? '').trim(),
    invoicePrefix: String(formData.get('invoicePrefix') ?? '').trim().toUpperCase() || 'FAC',
    receiptPrefix: String(formData.get('receiptPrefix') ?? '').trim().toUpperCase() || 'REC',
    defaultTaxRate: Number.isFinite(rate) && rate >= 0 && rate <= 100 ? rate : before.defaultTaxRate,
    paymentTerms: String(formData.get('paymentTerms') ?? '').trim(),
  };

  const entries: [string, string][] = [
    [INVOICE_SETTING_KEYS.legalMentions, after.legalMentions],
    [INVOICE_SETTING_KEYS.stampText, after.stampText],
    [INVOICE_SETTING_KEYS.invoicePrefix, after.invoicePrefix],
    [INVOICE_SETTING_KEYS.receiptPrefix, after.receiptPrefix],
    [INVOICE_SETTING_KEYS.defaultTaxRate, String(after.defaultTaxRate)],
    [INVOICE_SETTING_KEYS.paymentTerms, after.paymentTerms],
  ];
  for (const [key, value] of entries) {
    await prisma.setting.upsert({ where: { key }, update: { value }, create: { key, value } });
  }

  await audit({
    actorId: admin.id,
    action: 'config.invoice_settings_update',
    entityType: 'Setting',
    entityId: 'invoice.*',
    before,
    after,
    reason: String(formData.get('motif') ?? '').trim() || 'Mise à jour des paramètres de factures',
  });
  revalidatePath('/admin/config/factures');
}

export default async function FacturesConfigPage() {
  const me = await getSessionUser();
  if (!me || me.role !== 'superadmin') redirect('/admin');

  const s = await getInvoiceSettings();

  return (
    <>
      <h1 className="mb-2">Configuration — Paramètres des factures</h1>

      <div className="alert alert-info mb-3">
        Ces paramètres sont pris en compte sur les <strong>prochaines factures</strong> émises.
        Les factures déjà générées ne sont jamais modifiées.
      </div>

      <div className="card">
        <div className="card-title">Paramètres (CDC §16.2)</div>
        <form action={saveInvoiceSettings}>
          <div className="grid grid-3 mb-2" style={{ gap: 12 }}>
            <div>
              <label className="label">Préfixe factures</label>
              <input className="input" name="invoicePrefix" defaultValue={s.invoicePrefix} maxLength={10} placeholder="FAC" />
            </div>
            <div>
              <label className="label">Préfixe reçus</label>
              <input className="input" name="receiptPrefix" defaultValue={s.receiptPrefix} maxLength={10} placeholder="REC" />
            </div>
            <div>
              <label className="label">Taux de taxe par défaut (%)</label>
              <input className="input" type="number" name="defaultTaxRate" step="any" min={0} max={100} defaultValue={s.defaultTaxRate} />
            </div>
          </div>
          <div className="mb-2">
            <label className="label">Mentions légales (pied de facture)</label>
            <textarea className="textarea" name="legalMentions" rows={3} defaultValue={s.legalMentions}
              placeholder="IBIG DocPro — RCCM …, NCC …, siège social …" />
          </div>
          <div className="mb-2">
            <label className="label">Texte de cachet / signature</label>
            <input className="input" name="stampText" defaultValue={s.stampText}
              placeholder="Pour IBIG DocPro — La Direction" />
          </div>
          <div className="mb-2">
            <label className="label">Conditions de paiement</label>
            <textarea className="textarea" name="paymentTerms" rows={2} defaultValue={s.paymentTerms}
              placeholder="Paiement à réception. Aucun escompte pour paiement anticipé." />
          </div>
          <div className="mb-2">
            <label className="label">Motif de la modification</label>
            <input className="input" name="motif" placeholder="Motif (journal d'audit)" />
          </div>
          <button className="btn btn-primary" type="submit">Enregistrer</button>
        </form>
      </div>
    </>
  );
}
