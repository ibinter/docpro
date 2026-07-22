// ─────────────────────────────────────────────────────────────────────────────
// PARAMÈTRES DE FACTURES (CDC §16.2) — stockés dans Setting (clés invoice.*).
// Édités via /admin/config/factures. Les modules de rendu (invoice-pdf, création
// de facture) peuvent importer getInvoiceSettings() pour appliquer ces valeurs.
// ─────────────────────────────────────────────────────────────────────────────
import { prisma } from './db';

export type InvoiceSettings = {
  /** Mentions légales affichées en pied de facture. */
  legalMentions: string;
  /** Texte de cachet / signature configurable par le SuperAdmin. */
  stampText: string;
  /** Préfixe de numérotation des factures (ex. FAC). */
  invoicePrefix: string;
  /** Préfixe de numérotation des reçus (ex. REC). */
  receiptPrefix: string;
  /** Taux de taxe par défaut, en pourcentage (ex. 18 pour 18 %). */
  defaultTaxRate: number;
  /** Conditions de paiement affichées sur la facture. */
  paymentTerms: string;
};

export const INVOICE_SETTING_KEYS = {
  legalMentions: 'invoice.legal_mentions',
  stampText: 'invoice.stamp_text',
  invoicePrefix: 'invoice.prefix_invoice',
  receiptPrefix: 'invoice.prefix_receipt',
  defaultTaxRate: 'invoice.tax_rate',
  paymentTerms: 'invoice.payment_terms',
} as const;

export const INVOICE_SETTING_DEFAULTS: InvoiceSettings = {
  legalMentions: '',
  stampText: '',
  invoicePrefix: 'FAC',
  receiptPrefix: 'REC',
  defaultTaxRate: 0,
  paymentTerms: '',
};

/** Lit les paramètres de factures depuis Setting, avec valeurs par défaut. */
export async function getInvoiceSettings(): Promise<InvoiceSettings> {
  const rows = await prisma.setting.findMany({
    where: { key: { in: Object.values(INVOICE_SETTING_KEYS) } },
  });
  const map = new Map(rows.map((r) => [r.key, r.value]));
  const str = (key: string, fallback: string) => map.get(key) ?? fallback;
  const rate = parseFloat(map.get(INVOICE_SETTING_KEYS.defaultTaxRate) ?? '');
  return {
    legalMentions: str(INVOICE_SETTING_KEYS.legalMentions, INVOICE_SETTING_DEFAULTS.legalMentions),
    stampText: str(INVOICE_SETTING_KEYS.stampText, INVOICE_SETTING_DEFAULTS.stampText),
    invoicePrefix: str(INVOICE_SETTING_KEYS.invoicePrefix, INVOICE_SETTING_DEFAULTS.invoicePrefix),
    receiptPrefix: str(INVOICE_SETTING_KEYS.receiptPrefix, INVOICE_SETTING_DEFAULTS.receiptPrefix),
    defaultTaxRate: Number.isFinite(rate) ? rate : INVOICE_SETTING_DEFAULTS.defaultTaxRate,
    paymentTerms: str(INVOICE_SETTING_KEYS.paymentTerms, INVOICE_SETTING_DEFAULTS.paymentTerms),
  };
}
