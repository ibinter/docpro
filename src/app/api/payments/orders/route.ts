// POST /api/payments/orders — crée (ou réutilise) une commande.
// Body : { planCode?: string } OU { documentId?: string } (+ billingCountry optionnel).
// Réponse : { orderId, number, reused }
import { NextResponse } from 'next/server';
import { requireUser } from '@/lib/auth';
import { createOrReuseOrder } from '@/lib/billing/orders';
import { handleApiError, jsonError, requestMeta } from '@/lib/billing/http';

export async function POST(req: Request) {
  try {
    const user = await requireUser();
    const body = (await req.json().catch(() => null)) as
      | { planCode?: string; documentId?: string; billingCountry?: string }
      | null;
    if (!body || (!body.planCode && !body.documentId)) {
      return jsonError('planCode ou documentId requis');
    }
    if (body.planCode && body.documentId) {
      return jsonError('planCode et documentId sont exclusifs');
    }

    const { ip, userAgent } = requestMeta(req);
    const { order, reused } = await createOrReuseOrder({
      userId: user.id,
      organizationId: user.organizationId,
      planCode: body.planCode,
      documentId: body.documentId,
      billingCountry: body.billingCountry ?? user.country ?? null,
      ip,
      userAgent,
    });

    return NextResponse.json({ orderId: order.id, number: order.number, reused });
  } catch (e) {
    if (e instanceof Error && /introuvable|inactif|appartient|déjà payé|requis|exclusifs/.test(e.message)) {
      return jsonError(e.message, 400);
    }
    return handleApiError(e);
  }
}
