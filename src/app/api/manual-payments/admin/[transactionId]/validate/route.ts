// POST /api/manual-payments/admin/[transactionId]/validate — Validation manuelle (CDC §14.2, §15).
// Body JSON : { amountReceived, currency, reference, date }
// → transaction 'validee_manuellement', preuves 'validee', activation licence via
//   activateLicenseForOrder (JAMAIS réimplémentée), ou déblocage document à l'unité,
//   facture + reçu (FAC-/REC-2026-NNNNNN), audit + notification client.
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireRole } from '@/lib/auth';
import { audit } from '@/lib/audit';
import { notifyUser } from '@/lib/notify';
import { activateLicenseForOrder } from '@/lib/license';
import { certifyDocument } from '@/lib/blockchain';
import { refNumber, formatMoney } from '@/lib/money';
import { errorResponse, badRequest, notFoundJson } from '../../../_utils';

async function nextInvoiceNumber(prefix: 'FAC' | 'REC'): Promise<string> {
  const year = new Date().getFullYear();
  const count = await prisma.invoice.count({ where: { number: { startsWith: `${prefix}-${year}-` } } });
  return refNumber(prefix, count + 1);
}

export async function POST(req: NextRequest, ctx: { params: Promise<{ transactionId: string }> }) {
  try {
    const admin = await requireRole('admin');
    const { transactionId } = await ctx.params;
    const body = await req.json().catch(() => ({}));

    const amountReceived = Math.round(Number(body.amountReceived));
    if (!Number.isFinite(amountReceived) || amountReceived <= 0) {
      return badRequest('Montant réellement reçu invalide.');
    }
    const currency: string | undefined = typeof body.currency === 'string' && body.currency ? body.currency : undefined;
    const reference: string | undefined = typeof body.reference === 'string' && body.reference.trim() ? body.reference.trim() : undefined;
    const confirmedAt = body.date ? new Date(body.date) : new Date();
    if (Number.isNaN(confirmedAt.getTime())) return badRequest('Date de confirmation invalide.');

    const transaction = await prisma.transaction.findUnique({
      where: { id: transactionId },
      include: { order: true },
    });
    if (!transaction) return notFoundJson('Transaction introuvable.');
    if (!['a_verifier', 'complement_demande'].includes(transaction.status)) {
      return badRequest(`Transaction non validable (statut actuel : ${transaction.status}).`);
    }
    const order = transaction.order;

    // ── Guard atomique anti-double-validation (race condition CDC §14.2)
    const guard = await prisma.transaction.updateMany({
      where: { id: transaction.id, status: { in: ['a_verifier', 'complement_demande'] } },
      data: { status: 'en_traitement' },
    });
    if (guard.count === 0) {
      return NextResponse.json({ error: 'Transaction déjà traitée ou en cours.' }, { status: 409 });
    }

    // ── 1. Transaction validée manuellement + preuves validées
    await prisma.$transaction(async (tx) => {
      await tx.transaction.update({
        where: { id: transaction.id },
        data: {
          status: 'validee_manuellement',
          validatedById: admin.id,
          amountReceived,
          currency: currency ?? transaction.currency,
          externalRef: reference ?? transaction.externalRef,
          paidAt: confirmedAt,
          confirmedAt,
        },
      });
      await tx.paymentProof.updateMany({
        where: { transactionId: transaction.id, status: { notIn: ['rejetee'] } },
        data: { status: 'validee' },
      });
    });

    // ── 2. Activation : licence (forfait) ou document à l'unité
    if (order.planId) {
      // CŒUR COMMUN — idempotent, gère provisoire→définitive, renouvellement, upgrade.
      await activateLicenseForOrder({ orderId: order.id, transactionId: transaction.id, actorId: admin.id });
    } else if (order.documentId) {
      let isCertificationOrder = false;
      try {
        isCertificationOrder = JSON.parse(order.metadataJson ?? '{}').certification === true;
      } catch { /* metadata illisible → commande document classique */ }
      if (isCertificationOrder) {
        // Option certification blockchain (CDC §21 couche 3) : le document est
        // déjà payé — on certifie, SANS créer de DownloadLink supplémentaire.
        await certifyDocument(order.documentId, order.id);
        await prisma.order.update({ where: { id: order.id }, data: { status: 'payee' } });
      } else {
        const expiresAt = new Date(Date.now() + 24 * 3600_000);
        await prisma.$transaction(async (tx) => {
          await tx.generatedDocument.update({
            where: { id: order.documentId! },
            data: { paid: true, status: 'paye' },
          });
          await tx.downloadLink.create({
            data: { documentId: order.documentId!, maxUses: 3, expiresAt },
          });
          await tx.order.update({ where: { id: order.id }, data: { status: 'payee' } });
        });
      }
    } else {
      await prisma.order.update({ where: { id: order.id }, data: { status: 'payee' } });
    }

    // ── 3. Facture + reçu (CDC §16.2) — guard anti-double-facture
    const existingInvoice = await prisma.invoice.findFirst({ where: { orderId: order.id } });
    if (existingInvoice) {
      return NextResponse.json({
        ok: true,
        transactionId: transaction.id,
        status: 'validee_manuellement',
        invoices: { duplicate: true },
      });
    }
    const invCurrency = currency ?? order.currency;
    const invoiceData = {
      orderId: order.id,
      userId: order.userId,
      amount: order.amount,
      discount: order.discount,
      tax: order.tax,
      total: order.total,
      currency: invCurrency,
      detailsJson: JSON.stringify({
        transactionId: transaction.id,
        internalRef: transaction.internalRef,
        amountReceived,
        reference: reference ?? transaction.externalRef,
        confirmedAt,
      }),
    };
    const facture = await prisma.invoice.create({
      data: { ...invoiceData, number: await nextInvoiceNumber('FAC'), type: 'facture' },
    });
    const recu = await prisma.invoice.create({
      data: { ...invoiceData, number: await nextInvoiceNumber('REC'), type: 'recu' },
    });

    // ── 4. Audit + notification client
    await audit({
      actorId: admin.id,
      action: 'proof.validate',
      entityType: 'Transaction',
      entityId: transaction.id,
      before: { status: transaction.status, amountDeclared: transaction.amountDeclared },
      after: { status: 'validee_manuellement', amountReceived, currency: invCurrency, reference, confirmedAt, facture: facture.number, recu: recu.number },
    });
    await notifyUser({
      userId: order.userId,
      event: 'paiement_valide',
      title: 'Paiement confirmé',
      body: `Votre paiement de ${formatMoney(amountReceived, invCurrency)} (commande ${order.number}) a été vérifié et validé. Facture ${facture.number} disponible dans votre espace.`,
    });

    return NextResponse.json({
      ok: true,
      transactionId: transaction.id,
      status: 'validee_manuellement',
      invoices: { facture: facture.number, recu: recu.number },
    });
  } catch (err) {
    return errorResponse(err);
  }
}
