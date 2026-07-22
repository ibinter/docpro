// ─────────────────────────────────────────────────────────────────────────────
// GÉNÉRATION PDF DES FACTURES / REÇUS / ACCUSÉS (CDC §16.2) — pdfkit + qrcode.
// Contenu obligatoire : coordonnées IBIG DocPro, infos client, n° facture,
// réf commande, réf transaction, moyen de paiement, forfait, période couverte,
// montant / remise / taxes / total + devise, date de génération, statut,
// QR code de vérification d'authenticité pointant vers {APP_URL}/verify/{code}.
// Utilisation en route Node uniquement (Buffer).
// ─────────────────────────────────────────────────────────────────────────────
import PDFDocument from 'pdfkit';
import QRCode from 'qrcode';
import { formatMoney } from './money';

const NAVY = '#0D2B4E';
const GOLD = '#D4A017';
const GRAY = '#546E7A';
const DARK = '#1A1A2E';
const LIGHT = '#F5F7FA';

const TYPE_TITLES: Record<string, string> = {
  facture: 'FACTURE',
  recu: 'REÇU',
  accuse_reception: 'ACCUSÉ DE RÉCEPTION',
  confirmation_provisoire: 'CONFIRMATION PROVISOIRE',
};

const METHOD_LABELS: Record<string, string> = {
  moneroo: 'Paiement électronique (Moneroo)',
  mobile_money: 'Mobile Money',
  mobile_money_manuel: 'Mobile Money (manuel)',
  virement_national: 'Virement national',
  virement_international: 'Virement international',
  transfert_international: 'Transfert international',
  especes: 'Espèces',
  electronique: 'Paiement électronique',
};

const STATUS_LABELS: Record<string, string> = {
  emise: 'Émise',
  annulee: 'Annulée',
};

export type InvoicePdfInput = {
  invoice: {
    number: string;
    type: string;
    amount: number;
    discount: number;
    tax: number;
    total: number;
    currency: string;
    periodStart: Date | null;
    periodEnd: Date | null;
    status: string;
    verifyCode: string;
    createdAt: Date;
  };
  order: {
    number: string;
    paymentMethod: string | null;
  };
  transaction?: {
    internalRef: string;
    provider: string;
    method: string;
  } | null;
  user: {
    name: string;
    email: string;
    phone: string | null;
    country: string | null;
  };
  organization?: { name: string; address: string | null; taxId: string | null } | null;
  plan?: { name: string; code: string } | null;
};

function fmtDate(d: Date | null | undefined): string {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });
}

/** Génère le PDF d'une facture / reçu / accusé et retourne un Buffer. */
export async function generateInvoicePdf(data: InvoicePdfInput): Promise<Buffer> {
  const { invoice, order, transaction, user, organization, plan } = data;

  const appUrl = process.env.APP_URL || 'http://localhost:3000';
  const verifyUrl = `${appUrl}/verify/${invoice.verifyCode}`;
  const qrDataUrl = await QRCode.toDataURL(verifyUrl, { margin: 1, width: 220, color: { dark: NAVY } });
  const qrBuffer = Buffer.from(qrDataUrl.split(',')[1], 'base64');

  return new Promise<Buffer>((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', margin: 50, info: { Title: invoice.number, Author: 'IBIG DocPro' } });
    const chunks: Buffer[] = [];
    doc.on('data', (chunk: Buffer) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    const pageW = doc.page.width;
    const left = 50;
    const right = pageW - 50;

    // ── En-tête : rectangle navy + titre or
    doc.rect(0, 0, pageW, 120).fill(NAVY);
    doc.font('Helvetica-Bold').fontSize(26).fillColor(GOLD).text('IBIG DocPro', left, 28);
    doc.font('Helvetica').fontSize(9).fillColor('#FFFFFF')
      .text('Génération intelligente de documents', left, 60)
      .text('docpro.ibigsoft.com  •  docpro@ibigsoft.com', left, 76)
      .text('+225 22 27 60 14  |  +225 05 55 05 99 01', left, 90);

    const title = TYPE_TITLES[invoice.type] ?? invoice.type.toUpperCase();
    doc.font('Helvetica-Bold').fontSize(18).fillColor('#FFFFFF')
      .text(title, left, 34, { width: right - left, align: 'right' });
    doc.font('Helvetica').fontSize(11).fillColor(GOLD)
      .text(invoice.number, left, 58, { width: right - left, align: 'right' });
    doc.fontSize(9).fillColor('#FFFFFF')
      .text(`Générée le ${fmtDate(invoice.createdAt)}`, left, 76, { width: right - left, align: 'right' })
      .text(`Statut : ${STATUS_LABELS[invoice.status] ?? invoice.status}`, left, 90, { width: right - left, align: 'right' });

    // ── Bloc client (gauche) / références (droite)
    let y = 150;
    doc.font('Helvetica-Bold').fontSize(10).fillColor(NAVY).text('FACTURÉ À', left, y);
    doc.font('Helvetica-Bold').fontSize(11).fillColor(DARK).text(user.name, left, y + 16);
    doc.font('Helvetica').fontSize(9.5).fillColor(GRAY);
    let cy = y + 32;
    doc.text(user.email, left, cy); cy += 14;
    if (user.phone) { doc.text(user.phone, left, cy); cy += 14; }
    if (user.country) { doc.text(`Pays : ${user.country}`, left, cy); cy += 14; }
    if (organization) {
      doc.text(`Organisation : ${organization.name}`, left, cy); cy += 14;
      if (organization.address) { doc.text(organization.address, left, cy); cy += 14; }
      if (organization.taxId) { doc.text(`N° fiscal : ${organization.taxId}`, left, cy); cy += 14; }
    }

    const refX = 320;
    doc.font('Helvetica-Bold').fontSize(10).fillColor(NAVY).text('RÉFÉRENCES', refX, y);
    doc.font('Helvetica').fontSize(9.5).fillColor(GRAY);
    let ry = y + 16;
    const refLine = (label: string, value: string) => {
      doc.font('Helvetica-Bold').fillColor(DARK).text(`${label} : `, refX, ry, { continued: true });
      doc.font('Helvetica').fillColor(GRAY).text(value);
      ry += 15;
    };
    refLine('N° document', invoice.number);
    refLine('Réf. commande', order.number);
    refLine('Réf. transaction', transaction?.internalRef ?? '—');
    const method = transaction?.method ?? order.paymentMethod;
    refLine('Moyen de paiement', method ? (METHOD_LABELS[method] ?? method) : '—');
    if (transaction?.provider) refLine('Opérateur', transaction.provider);

    y = Math.max(cy, ry) + 24;

    // ── Détail de la prestation
    doc.rect(left, y, right - left, 26).fill(NAVY);
    doc.font('Helvetica-Bold').fontSize(9).fillColor('#FFFFFF')
      .text('DÉSIGNATION', left + 12, y + 8)
      .text('PÉRIODE COUVERTE', 300, y + 8)
      .text('MONTANT', 430, y + 8, { width: right - 430 - 12, align: 'right' });

    y += 26;
    doc.rect(left, y, right - left, 34).fill(LIGHT);
    const designation = plan ? `Forfait ${plan.name} (${plan.code})` : 'Achat de document à l’unité';
    const periode = invoice.periodStart || invoice.periodEnd
      ? `${fmtDate(invoice.periodStart)} — ${fmtDate(invoice.periodEnd)}`
      : '—';
    doc.font('Helvetica').fontSize(9.5).fillColor(DARK)
      .text(designation, left + 12, y + 11, { width: 235 })
      .text(periode, 300, y + 11, { width: 125 })
      .text(formatMoney(invoice.amount, invoice.currency), 430, y + 11, { width: right - 430 - 12, align: 'right' });

    y += 50;

    // ── Totaux (colonne droite)
    const totX = 350;
    const totW = right - totX;
    const totalLine = (label: string, value: string, bold = false) => {
      doc.font(bold ? 'Helvetica-Bold' : 'Helvetica').fontSize(bold ? 11 : 9.5)
        .fillColor(bold ? NAVY : GRAY)
        .text(label, totX, y, { width: totW - 110 })
        .text(value, totX + totW - 110, y, { width: 110, align: 'right' });
      y += bold ? 22 : 17;
    };
    totalLine('Montant', formatMoney(invoice.amount, invoice.currency));
    totalLine('Remise', invoice.discount > 0 ? `- ${formatMoney(invoice.discount, invoice.currency)}` : formatMoney(0, invoice.currency));
    totalLine('Taxes', formatMoney(invoice.tax, invoice.currency));
    doc.moveTo(totX, y + 2).lineTo(right, y + 2).lineWidth(1).strokeColor(GOLD).stroke();
    y += 10;
    totalLine(`TOTAL (${invoice.currency})`, formatMoney(invoice.total, invoice.currency), true);

    // ── Mention provisoire le cas échéant (CDC §16.2)
    if (invoice.type === 'confirmation_provisoire') {
      y += 8;
      doc.font('Helvetica-Bold').fontSize(9).fillColor('#BF360C')
        .text(
          'DOCUMENT PROVISOIRE — accès accordé en attente de la confirmation définitive des fonds. Ne vaut pas facture définitive.',
          left, y, { width: right - left },
        );
      y += 30;
    }

    // ── QR code de vérification (bas de page)
    const qrSize = 90;
    const qrY = doc.page.height - 190;
    doc.image(qrBuffer, left, qrY, { width: qrSize, height: qrSize });
    doc.font('Helvetica-Bold').fontSize(9.5).fillColor(NAVY)
      .text('Vérification d’authenticité', left + qrSize + 16, qrY + 12);
    doc.font('Helvetica').fontSize(9).fillColor(GRAY)
      .text('Scannez ce QR code ou vérifiez l’authenticité de ce document sur', left + qrSize + 16, qrY + 28, { width: 320 })
      .fillColor(NAVY).font('Helvetica-Bold')
      .text('docpro.ibigsoft.com/verify', left + qrSize + 16, qrY + 42)
      .font('Helvetica').fillColor(GRAY)
      .text(`Code de vérification : ${invoice.verifyCode}`, left + qrSize + 16, qrY + 58, { width: 320 });

    // ── Pied de page
    const footY = doc.page.height - 70;
    doc.moveTo(left, footY).lineTo(right, footY).lineWidth(0.5).strokeColor('#CFD8DC').stroke();
    doc.font('Helvetica').fontSize(8).fillColor(GRAY)
      .text(
        'IBIG DocPro — docpro.ibigsoft.com — docpro@ibigsoft.com — +225 22 27 60 14 | +225 05 55 05 99 01',
        left, footY + 10, { width: right - left, align: 'center' },
      )
      .text(
        `Document généré électroniquement le ${fmtDate(invoice.createdAt)} — valable sans signature.`,
        left, footY + 24, { width: right - left, align: 'center' },
      );

    doc.end();
  });
}
