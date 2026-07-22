// POST /api/payments/orders/[id]/country — confirme le pays de facturation
// choisi explicitement par le client (jamais déduit de l'IP seule, CDC §18.1).
// Body : { billingCountry: string (ISO-2) }
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireUser } from '@/lib/auth';
import { handleApiError, jsonError } from '@/lib/billing/http';

export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireUser();
    const { id } = await ctx.params;
    const body = (await req.json().catch(() => null)) as { billingCountry?: string } | null;
    const country = body?.billingCountry?.trim().toUpperCase();
    if (!country || !/^[A-Z]{2}$/.test(country)) return jsonError('Pays de facturation invalide');

    const order = await prisma.order.findUnique({ where: { id } });
    if (!order) return jsonError('Commande introuvable', 404);
    if (order.userId !== user.id) return jsonError('Accès refusé', 403);
    if (!['en_attente_paiement', 'paiement_en_cours', 'brouillon'].includes(order.status)) {
      return jsonError('Commande non modifiable dans son statut actuel', 409);
    }

    await prisma.order.update({ where: { id }, data: { billingCountry: country } });
    return NextResponse.json({ ok: true, billingCountry: country });
  } catch (e) {
    return handleApiError(e);
  }
}
