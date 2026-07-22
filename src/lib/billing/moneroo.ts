// ─────────────────────────────────────────────────────────────────────────────
// Intégration Moneroo (simulation sandbox) — signature HMAC-SHA256 des webhooks.
// Le secret partagé vit dans process.env.MONEROO_WEBHOOK_SECRET (jamais côté client).
// Architecture extensible : d'autres processeurs (CinetPay, FedaPay…) pourront
// fournir leur propre paire sign/verify sans toucher au pipeline (CDC §12.1).
// ─────────────────────────────────────────────────────────────────────────────
import { createHmac, timingSafeEqual } from 'crypto';

export const MONEROO_SIGNATURE_HEADER = 'x-moneroo-signature';

function webhookSecret(): string {
  return process.env.MONEROO_WEBHOOK_SECRET || 'whsec_dev_only';
}

/** Signature hex HMAC-SHA256 du corps BRUT (chaîne exacte envoyée sur le fil). */
export function signMonerooPayload(rawBody: string): string {
  return createHmac('sha256', webhookSecret()).update(rawBody, 'utf8').digest('hex');
}

/** Vérification en temps constant de la signature d'un webhook Moneroo. */
export function verifyMonerooSignature(rawBody: string, signature: string | null | undefined): boolean {
  if (!signature) return false;
  const expected = signMonerooPayload(rawBody);
  const a = Buffer.from(signature, 'utf8');
  const b = Buffer.from(expected, 'utf8');
  return a.length === b.length && timingSafeEqual(a, b);
}

export type MonerooOutcome = 'success' | 'failed' | 'cancelled';

export type MonerooWebhookPayload = {
  id: string; // event id unique fournisseur
  event: 'payment.success' | 'payment.failed' | 'payment.cancelled';
  created_at: string;
  data: {
    id: string; // référence externe Moneroo (mnr_…)
    status: MonerooOutcome;
    amount: number;
    currency: string;
    metadata: {
      orderId: string;
      transactionId: string;
      internalRef: string;
    };
  };
};

/** Fabrique un payload d'événement Moneroo (sandbox de simulation). */
export function buildMonerooEvent(params: {
  outcome: MonerooOutcome;
  externalRef: string;
  amount: number;
  currency: string;
  orderId: string;
  transactionId: string;
  internalRef: string;
}): MonerooWebhookPayload {
  const eventName =
    params.outcome === 'success' ? 'payment.success'
    : params.outcome === 'failed' ? 'payment.failed'
    : 'payment.cancelled';
  return {
    id: `evt_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`,
    event: eventName,
    created_at: new Date().toISOString(),
    data: {
      id: params.externalRef,
      status: params.outcome,
      amount: params.amount,
      currency: params.currency,
      metadata: {
        orderId: params.orderId,
        transactionId: params.transactionId,
        internalRef: params.internalRef,
      },
    },
  };
}

/** Parse défensif d'un payload webhook (après vérification de signature). */
export function parseMonerooPayload(raw: string): MonerooWebhookPayload | null {
  try {
    const p = JSON.parse(raw) as MonerooWebhookPayload;
    if (!p || typeof p.id !== 'string' || typeof p.event !== 'string' || !p.data) return null;
    if (typeof p.data.amount !== 'number' || typeof p.data.currency !== 'string') return null;
    if (!p.data.metadata || typeof p.data.metadata.transactionId !== 'string') return null;
    return p;
  } catch {
    return null;
  }
}
