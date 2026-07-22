// POST /api/manual-payments/declare — Déclaration d'un paiement manuel (multipart/form-data).
// Crée : Transaction (a_verifier) + PaymentProof (soumise) + Order → preuve_soumise,
// puis lance les contrôles anti-fraude NON bloquants et notifie client + admins.
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireUser } from '@/lib/auth';
import { audit } from '@/lib/audit';
import { notifyUser, notifyAdmins } from '@/lib/notify';
import { randomRef, formatMoney } from '@/lib/money';
import { validateAndStoreProof } from '@/lib/proofs';
import { runFraudChecks } from '@/lib/fraud';
import {
  MANUAL_CHANNEL_TYPES,
  METHOD_BY_CHANNEL_TYPE,
  DECLARABLE_ORDER_STATUSES,
  errorResponse,
  badRequest,
  field,
} from '../_utils';

// Champs déclaratifs conservés par type de canal (CDC §12).
const DECLARED_FIELDS: Record<string, string[]> = {
  mobile_money: ['senderPhone', 'senderName', 'reference', 'paymentDate'],
  banque_nationale: ['reference', 'senderBank', 'senderName'],
  banque_internationale: ['senderName', 'senderBank', 'senderCountry', 'declaredCurrency', 'paymentDate', 'reference'],
  transfert_international: [
    'transferService', 'senderName', 'senderCountry', 'senderCity',
    'declaredCurrency', 'paymentDate', 'reference', 'beneficiary',
  ],
  especes: ['location', 'paymentDate', 'reference'],
};

const REQUIRED_FIELDS: Record<string, string[]> = {
  mobile_money: ['senderPhone', 'senderName', 'reference', 'paymentDate'],
  banque_nationale: ['reference', 'senderBank', 'senderName'],
  banque_internationale: ['senderName', 'senderBank', 'senderCountry', 'paymentDate', 'reference'],
  transfert_international: ['transferService', 'senderName', 'senderCountry', 'paymentDate', 'reference', 'beneficiary'],
  especes: ['paymentDate'],
};

export async function POST(req: NextRequest) {
  try {
    const user = await requireUser();
    const form = await req.formData();

    const orderId = field(form, 'orderId');
    const channelId = field(form, 'channelId');
    const amountRaw = field(form, 'amount');
    if (!orderId || !channelId) return badRequest('Commande ou canal de paiement manquant.');

    const amountDeclared = Math.round(Number(amountRaw));
    if (!Number.isFinite(amountDeclared) || amountDeclared <= 0) {
      return badRequest('Montant déclaré invalide.');
    }

    const order = await prisma.order.findUnique({ where: { id: orderId }, include: { plan: true } });
    if (!order || order.userId !== user.id) {
      return NextResponse.json({ error: 'Commande introuvable.' }, { status: 404 });
    }
    if (!DECLARABLE_ORDER_STATUSES.includes(order.status)) {
      return badRequest(`Cette commande n'accepte plus de déclaration de paiement (statut : ${order.status}).`);
    }

    const channel = await prisma.paymentChannel.findUnique({ where: { id: channelId } });
    if (!channel || !channel.active || !(MANUAL_CHANNEL_TYPES as readonly string[]).includes(channel.type)) {
      return badRequest('Canal de paiement indisponible.');
    }

    // Champs déclaratifs obligatoires selon le type de canal
    for (const f of REQUIRED_FIELDS[channel.type] ?? []) {
      if (!field(form, f)) return badRequest('Veuillez renseigner tous les champs obligatoires.');
    }

    // Preuve OBLIGATOIRE sauf paiement en espèces (CDC §12)
    const proofEntry = form.get('proof');
    const proofFile = proofEntry instanceof File && proofEntry.size > 0 ? proofEntry : null;
    if (!proofFile && channel.type !== 'especes') {
      return badRequest('La preuve de paiement (capture ou PDF) est obligatoire.');
    }

    // Validation magic-bytes + stockage privé + hash SHA-256 (lève ProofError si refus)
    const stored = proofFile ? await validateAndStoreProof(proofFile) : null;

    // Détails déclarés (JSON brut conservé sur la transaction)
    const declared: Record<string, string> = { channelType: channel.type, channelLabel: channel.label };
    for (const f of DECLARED_FIELDS[channel.type] ?? []) {
      const v = field(form, f);
      if (v) declared[f] = v.slice(0, 300);
    }
    const clientComment = field(form, 'comment').slice(0, 1000);
    if (clientComment) declared.comment = clientComment;

    const externalRef = field(form, 'reference').slice(0, 190) || null;
    const declaredCurrency = field(form, 'declaredCurrency') || channel.currency || order.currency;

    // ── Création atomique : Transaction + PaymentProof + statut commande
    const transaction = await prisma.$transaction(async (tx) => {
      const t = await tx.transaction.create({
        data: {
          orderId: order.id,
          userId: user.id,
          provider: channel.provider,
          method: METHOD_BY_CHANNEL_TYPE[channel.type],
          internalRef: randomRef('TRX'),
          externalRef,
          amountExpected: order.total,
          amountDeclared,
          currency: declaredCurrency,
          status: 'a_verifier',
          comment: `Déclaration ${channel.label} — ${formatMoney(amountDeclared, declaredCurrency)}${clientComment ? ` — ${clientComment}` : ''}`,
          rawPayloadJson: JSON.stringify(declared),
        },
      });
      if (stored) {
        await tx.paymentProof.create({
          data: {
            transactionId: t.id,
            userId: user.id,
            filePath: stored.filePath,
            mimeType: stored.mimeType,
            sizeBytes: stored.sizeBytes,
            originalName: stored.originalName,
            storedName: stored.storedName,
            fileHash: stored.fileHash,
            status: 'soumise',
          },
        });
      }
      await tx.order.update({ where: { id: order.id }, data: { status: 'preuve_soumise', paymentMethod: METHOD_BY_CHANNEL_TYPE[channel.type] } });
      return t;
    });

    await audit({
      actorId: user.id,
      action: 'payment.declare',
      entityType: 'Transaction',
      entityId: transaction.id,
      after: { orderId: order.id, channelId: channel.id, amountDeclared, externalRef, proof: stored?.storedName ?? null },
    });

    // ── Contrôles anti-fraude NON bloquants (FraudAlert + notifyAdmins par alerte)
    await runFraudChecks({
      transactionId: transaction.id,
      orderId: order.id,
      userId: user.id,
      amountDeclared,
      currency: declaredCurrency,
      externalRef,
      fileHash: stored?.fileHash ?? null,
    });

    // ── Accusé de réception client + notification admins
    await notifyUser({
      userId: user.id,
      event: 'preuve_recue',
      title: 'Preuve de paiement reçue',
      body: 'Votre preuve de paiement a été reçue et sera vérifiée par notre équipe dans les 24h.',
    });
    await notifyAdmins({
      event: 'preuve_recue',
      title: 'Nouvelle preuve à vérifier',
      body: `${user.email} — commande ${order.number} — ${formatMoney(amountDeclared, declaredCurrency)} via ${channel.label}.`,
    });

    return NextResponse.json({
      ok: true,
      transactionId: transaction.id,
      internalRef: transaction.internalRef,
      redirect: `/paiement-manuel/suivi/${transaction.id}?ok=1`,
    });
  } catch (err) {
    return errorResponse(err);
  }
}
