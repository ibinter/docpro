// ─────────────────────────────────────────────────────────────────────────────
// POST /api/webhooks/moneroo — LE point critique du pipeline (CDC §19.2).
// Ordre STRICT :
//   (a) corps BRUT + vérification signature HMAC → invalide : 401 + FraudAlert
//   (b) idempotence via WebhookEvent @@unique(provider, eventId)
//   (c) contrôle croisé montant + devise + référence + statut
//   (d) succès cohérent → activateLicenseForOrder (forfait) OU document payé + DownloadLink
//   (e) facture + reçu
//   (f/g) notifications
//   (h) WebhookEvent processed — toujours 200 après persistance.
// La licence n'est JAMAIS activée sur le retour client — uniquement ici.
// ─────────────────────────────────────────────────────────────────────────────
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { activateLicenseForOrder } from '@/lib/license';
import { audit } from '@/lib/audit';
import { notifyUser, notifyAdmins } from '@/lib/notify';
import { formatMoney } from '@/lib/money';
import { createInvoicesForPaidOrder } from '@/lib/billing/invoices';
import { certifyDocument } from '@/lib/blockchain';
import {
  MONEROO_SIGNATURE_HEADER,
  parseMonerooPayload,
  verifyMonerooSignature,
} from '@/lib/billing/moneroo';

const PROVIDER = 'moneroo';

export async function POST(req: Request) {
  // (a) ── Corps BRUT d'abord, signature ensuite — jamais l'inverse
  const rawBody = await req.text();
  const signature = req.headers.get(MONEROO_SIGNATURE_HEADER);

  if (!verifyMonerooSignature(rawBody, signature)) {
    await prisma.fraudAlert.create({
      data: {
        type: 'signature_invalide',
        severity: 'elevee',
        message: `Webhook Moneroo à signature invalide ou absente (${rawBody.slice(0, 200)})`,
      },
    });
    return NextResponse.json({ error: 'Signature invalide' }, { status: 401 });
  }

  const payload = parseMonerooPayload(rawBody);
  if (!payload) {
    return NextResponse.json({ error: 'Payload illisible' }, { status: 400 });
  }

  // (b) ── Idempotence : un event déjà traité n'est JAMAIS retraité
  const existing = await prisma.webhookEvent.findUnique({
    where: { provider_eventId: { provider: PROVIDER, eventId: payload.id } },
  });
  if (existing?.processed) {
    return NextResponse.json({ received: true, duplicate: true });
  }

  let webhookEventId = existing?.id ?? null;
  if (!webhookEventId) {
    try {
      const created = await prisma.webhookEvent.create({
        data: {
          provider: PROVIDER,
          eventId: payload.id,
          signature,
          payloadJson: rawBody, // payload BRUT conservé pour audit
        },
      });
      webhookEventId = created.id;
    } catch (e) {
      // Course entre deux livraisons simultanées du même event → duplicata
      if ((e as { code?: string }).code === 'P2002') {
        return NextResponse.json({ received: true, duplicate: true });
      }
      throw e;
    }
  }

  const markProcessed = (error?: string) =>
    prisma.webhookEvent.update({
      where: { id: webhookEventId as string },
      data: { processed: true, processedAt: new Date(), error: error ?? null },
    });

  try {
    // ── Résolution de la transaction visée
    const transaction = await prisma.transaction.findUnique({
      where: { id: payload.data.metadata.transactionId },
      include: { order: { include: { plan: true } } },
    });
    if (!transaction || transaction.provider !== PROVIDER) {
      await prisma.fraudAlert.create({
        data: {
          type: 'transaction_inconnue',
          severity: 'elevee',
          message: `Webhook Moneroo pour une transaction inconnue (event ${payload.id})`,
        },
      });
      await markProcessed('transaction introuvable');
      return NextResponse.json({ received: true });
    }
    const order = transaction.order;

    // Transaction déjà finalisée (double livraison hors event-id) → rien à refaire
    if (['reussie', 'echouee', 'annulee', 'rejetee', 'remboursee'].includes(transaction.status)) {
      await markProcessed();
      return NextResponse.json({ received: true, alreadyFinal: true });
    }

    // (c) ── Contrôle croisé : montant + devise + référence + statut (CDC §10 étape 6)
    const issues: { type: string; message: string }[] = [];
    if (payload.data.amount !== transaction.amountExpected || payload.data.amount !== order.total) {
      issues.push({
        type: 'montant_incoherent',
        message: `Montant webhook ${payload.data.amount} ≠ attendu ${transaction.amountExpected} (commande ${order.number})`,
      });
    }
    if (payload.data.currency !== transaction.currency || payload.data.currency !== order.currency) {
      issues.push({
        type: 'devise_incoherente',
        message: `Devise webhook ${payload.data.currency} ≠ attendue ${transaction.currency} (commande ${order.number})`,
      });
    }
    if (payload.data.metadata.internalRef !== transaction.internalRef) {
      issues.push({
        type: 'reference_incoherente',
        message: `Référence webhook ${payload.data.metadata.internalRef} ≠ interne ${transaction.internalRef} (commande ${order.number})`,
      });
    }
    const isSuccess = payload.event === 'payment.success';
    if (isSuccess && payload.data.status !== 'success') {
      issues.push({
        type: 'statut_incoherent',
        message: `Event ${payload.event} mais statut data "${payload.data.status}" (commande ${order.number})`,
      });
    }

    if (isSuccess && issues.length > 0) {
      // Écart détecté → JAMAIS d'activation. File manuelle + alerte (CDC §19.3).
      for (const issue of issues) {
        await prisma.fraudAlert.create({
          data: {
            transactionId: transaction.id,
            userId: transaction.userId,
            type: issue.type,
            severity: 'elevee',
            message: issue.message,
          },
        });
      }
      await prisma.transaction.update({
        where: { id: transaction.id },
        data: { status: 'a_verifier', rawPayloadJson: rawBody },
      });
      await prisma.order.update({ where: { id: order.id }, data: { status: 'a_verifier' } });
      await notifyAdmins({
        event: 'alerte_fraude',
        title: 'Webhook incohérent — vérification manuelle requise',
        body: issues.map((i) => i.message).join(' | '),
      });
      await audit({
        action: 'webhook.moneroo.incoherent',
        entityType: 'Transaction',
        entityId: transaction.id,
        after: { issues: issues.map((i) => i.type) },
      });
      await markProcessed('controle croisé en échec');
      return NextResponse.json({ received: true, flagged: true });
    }

    if (isSuccess) {
      // (d) ── Paiement confirmé côté serveur : la SEULE voie d'activation
      const now = new Date();
      await prisma.transaction.update({
        where: { id: transaction.id },
        data: {
          status: 'reussie',
          paidAt: now,
          confirmedAt: now,
          externalRef: payload.data.id,
          rawPayloadJson: rawBody,
        },
      });

      let periodStart: Date | null = null;
      let periodEnd: Date | null = null;

      if (order.planId) {
        // Forfait : activation / renouvellement / upgrade — idempotent, centralisé
        const result = await activateLicenseForOrder({
          orderId: order.id,
          transactionId: transaction.id,
        });
        periodStart = result.license.startDate;
        periodEnd = result.license.endDate;
      } else if (order.documentId && order.status !== 'payee') {
        let isCertificationOrder = false;
        try {
          isCertificationOrder = JSON.parse(order.metadataJson ?? '{}').certification === true;
        } catch { /* metadata illisible → commande document classique */ }
        if (isCertificationOrder) {
          // Option certification blockchain (CDC §21 couche 3) : le document est
          // déjà payé — on certifie, SANS créer de DownloadLink supplémentaire.
          await certifyDocument(order.documentId, order.id);
        } else {
          // Achat de document à l'unité : déblocage + lien de téléchargement limité
          await prisma.generatedDocument.update({
            where: { id: order.documentId },
            data: { paid: true, status: 'paye' },
          });
          await prisma.downloadLink.create({
            data: {
              documentId: order.documentId,
              expiresAt: new Date(now.getTime() + 24 * 60 * 60 * 1000),
              maxUses: 3,
            },
          });
        }
        await prisma.order.update({ where: { id: order.id }, data: { status: 'payee' } });
      } else if (order.status !== 'payee') {
        await prisma.order.update({ where: { id: order.id }, data: { status: 'payee' } });
      }

      // (e) ── Facture + reçu (période couverte si forfait)
      await createInvoicesForPaidOrder({
        orderId: order.id,
        transactionId: transaction.id,
        periodStart,
        periodEnd,
      });

      // (f) ── Notifications
      await notifyUser({
        userId: transaction.userId,
        event: 'paiement_reussi',
        title: 'Paiement confirmé',
        body: `Votre paiement de ${formatMoney(order.total, order.currency)} (commande ${order.number}) a été confirmé. Merci !`,
      });
      await notifyAdmins({
        event: 'paiement_reussi',
        title: 'Paiement électronique reçu',
        body: `Commande ${order.number} — ${formatMoney(order.total, order.currency)} — Moneroo (${payload.data.id})`,
      });
      await audit({
        action: 'webhook.moneroo.success',
        entityType: 'Transaction',
        entityId: transaction.id,
        after: { orderId: order.id, amount: payload.data.amount, currency: payload.data.currency },
      });
    } else {
      // (g) ── Échec ou annulation : la commande redevient payable (nouvel essai)
      const cancelled = payload.event === 'payment.cancelled';
      await prisma.transaction.update({
        where: { id: transaction.id },
        data: { status: cancelled ? 'annulee' : 'echouee', rawPayloadJson: rawBody },
      });
      // Ne jamais rétrograder une commande déjà payée (paiement multiple tardif)
      if (['paiement_en_cours', 'en_attente_paiement'].includes(order.status)) {
        await prisma.order.update({
          where: { id: order.id },
          data: { status: 'en_attente_paiement' },
        });
      }
      await notifyUser({
        userId: transaction.userId,
        event: 'paiement_echoue',
        title: cancelled ? 'Paiement annulé' : 'Paiement échoué',
        body: cancelled
          ? `Vous avez annulé le paiement de la commande ${order.number}. Vous pouvez réessayer à tout moment.`
          : `Le paiement de la commande ${order.number} a échoué. Aucun montant n'a été débité — vous pouvez réessayer.`,
      });
      await audit({
        action: cancelled ? 'webhook.moneroo.cancelled' : 'webhook.moneroo.failed',
        entityType: 'Transaction',
        entityId: transaction.id,
        after: { orderId: order.id },
      });
    }

    // (h) ── Event marqué traité, réponse 200 rapide
    await markProcessed();
    return NextResponse.json({ received: true });
  } catch (e) {
    // Erreur métier : on la journalise sur l'event, on répond 200 après persistance
    console.error('[webhook moneroo] erreur de traitement :', e);
    try {
      await prisma.webhookEvent.update({
        where: { id: webhookEventId as string },
        data: { error: e instanceof Error ? e.message : 'erreur inconnue' },
      });
    } catch { /* l'event reste non-processed pour retraitement */ }
    return NextResponse.json({ received: true, error: 'traitement différé' });
  }
}
