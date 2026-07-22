// POST /api/cart/checkout
// Crée une commande groupée pour tous les templates du panier, puis vide le panier.
// Body : { country?: string }
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';
import { refNumber } from '@/lib/money';

const ORDER_TTL_MS = 24 * 60 * 60 * 1000;

export async function POST(req: NextRequest) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: 'Non authentifié.' }, { status: 401 });

  let body: { country?: string } = {};
  try { body = await req.json(); } catch { /* pas de body */ }

  const cart = await prisma.cart.findUnique({
    where: { userId: user.id },
    include: { items: { include: { template: true } } },
  });

  if (!cart || cart.items.length === 0) {
    return NextResponse.json({ error: 'Panier vide.' }, { status: 400 });
  }

  const country = (typeof body.country === 'string' ? body.country.slice(0, 2).toUpperCase() : null)
    ?? user.country ?? 'CI';
  const total = cart.items.reduce((s, item) => s + item.template.price, 0);
  const currency = cart.items[0]?.template.currency ?? 'XOF';
  const templateIds = cart.items.map((i) => i.templateId);
  const templateNames = cart.items.map((i) => i.template.name);

  // Numéro séquentiel CMD-AAAA-NNNNNN
  const count = await prisma.order.count();
  const number = refNumber('CMD', count + 1);

  const order = await prisma.order.create({
    data: {
      number,
      userId: user.id,
      status: 'en_attente_paiement',
      amount: total,
      discount: 0,
      tax: 0,
      total,
      currency,
      billingCountry: country,
      expiresAt: new Date(Date.now() + ORDER_TTL_MS),
      metadataJson: JSON.stringify({ type: 'bundle', templateIds, templateNames, itemCount: templateIds.length }),
    },
  });

  // Vide le panier
  await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

  return NextResponse.json({
    orderId: order.id,
    number: order.number,
    total,
    currency,
    itemCount: cart.items.length,
  });
}
