// POST /api/payments/simulate — bouton du processeur simulé (Moneroo Sandbox).
// Body : { transactionId: string, outcome: 'success' | 'failed' | 'cancelled' }
// FABRIQUE un webhook signé HMAC-SHA256 (secret MONEROO_WEBHOOK_SECRET,
// header x-moneroo-signature = hex HMAC du corps brut) et le POste en interne
// vers {APP_URL}/api/webhooks/moneroo. La logique métier vit UNIQUEMENT dans
// le webhook — cette route ne touche jamais aux licences.
// Réponse : { ok, redirect }
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireUser } from '@/lib/auth';
import {
  MONEROO_SIGNATURE_HEADER,
  buildMonerooEvent,
  signMonerooPayload,
  type MonerooOutcome,
} from '@/lib/billing/moneroo';
import { handleApiError, jsonError } from '@/lib/billing/http';

const OUTCOMES: MonerooOutcome[] = ['success', 'failed', 'cancelled'];

export async function POST(req: Request) {
  try {
    const user = await requireUser();
    const body = (await req.json().catch(() => null)) as
      | { transactionId?: string; outcome?: string }
      | null;
    if (!body?.transactionId || !body.outcome) return jsonError('transactionId et outcome requis');
    if (!OUTCOMES.includes(body.outcome as MonerooOutcome)) return jsonError('outcome invalide');

    const transaction = await prisma.transaction.findUnique({
      where: { id: body.transactionId },
      include: { order: true },
    });
    if (!transaction) return jsonError('Transaction introuvable', 404);
    if (transaction.userId !== user.id) return jsonError('Accès refusé', 403);
    if (transaction.status !== 'en_cours') {
      // Transaction déjà finalisée : on renvoie simplement vers la page de retour
      return NextResponse.json({ ok: true, redirect: `/checkout/retour/${transaction.orderId}` });
    }

    // Référence externe attribuée par le "processeur"
    const externalRef = `mnr_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
    await prisma.transaction.update({
      where: { id: transaction.id },
      data: { externalRef },
    });

    const payload = buildMonerooEvent({
      outcome: body.outcome as MonerooOutcome,
      externalRef,
      amount: transaction.amountExpected,
      currency: transaction.currency,
      orderId: transaction.orderId,
      transactionId: transaction.id,
      internalRef: transaction.internalRef,
    });

    const rawBody = JSON.stringify(payload);
    const signature = signMonerooPayload(rawBody);
    const appUrl = process.env.APP_URL || new URL(req.url).origin;

    // POST interne vers le webhook — exactement comme le ferait Moneroo
    const res = await fetch(`${appUrl}/api/webhooks/moneroo`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        [MONEROO_SIGNATURE_HEADER]: signature,
      },
      body: rawBody,
      cache: 'no-store',
    });
    if (!res.ok) {
      console.error('[simulate] webhook interne en erreur :', res.status, await res.text().catch(() => ''));
    }

    return NextResponse.json({ ok: true, redirect: `/checkout/retour/${transaction.orderId}` });
  } catch (e) {
    return handleApiError(e);
  }
}
