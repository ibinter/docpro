// GET /api/cart — récupère le panier de l'utilisateur connecté.
// POST /api/cart — ajoute un template au panier. Body: { templateId: string }
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: 'Non authentifié.' }, { status: 401 });

  const cart = await prisma.cart.findUnique({
    where: { userId: user.id },
    include: {
      items: {
        include: { template: true },
        orderBy: { createdAt: 'asc' },
      },
    },
  });

  return NextResponse.json({ cart });
}

export async function POST(req: NextRequest) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: 'Non authentifié.' }, { status: 401 });

  let body: { templateId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Corps invalide.' }, { status: 400 });
  }

  const { templateId } = body;
  if (!templateId) return NextResponse.json({ error: 'templateId requis.' }, { status: 400 });

  const template = await prisma.documentTemplate.findUnique({ where: { id: templateId } });
  if (!template || !template.active) {
    return NextResponse.json({ error: 'Template introuvable.' }, { status: 404 });
  }

  // Crée le panier si inexistant, puis ajoute l'item (idempotent via unique constraint).
  const cart = await prisma.cart.upsert({
    where: { userId: user.id },
    create: { userId: user.id },
    update: {},
  });

  try {
    await prisma.cartItem.create({ data: { cartId: cart.id, templateId } });
  } catch {
    // Doublon : item déjà dans le panier — pas d'erreur.
  }

  const updated = await prisma.cart.findUnique({
    where: { userId: user.id },
    include: { items: { include: { template: true }, orderBy: { createdAt: 'asc' } } },
  });

  return NextResponse.json({ cart: updated });
}

export async function DELETE(req: NextRequest) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: 'Non authentifié.' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const templateId = searchParams.get('templateId');

  if (!templateId) return NextResponse.json({ error: 'templateId requis.' }, { status: 400 });

  const cart = await prisma.cart.findUnique({ where: { userId: user.id } });
  if (!cart) return NextResponse.json({ ok: true });

  await prisma.cartItem.deleteMany({ where: { cartId: cart.id, templateId } });

  const updated = await prisma.cart.findUnique({
    where: { userId: user.id },
    include: { items: { include: { template: true }, orderBy: { createdAt: 'asc' } } },
  });

  return NextResponse.json({ cart: updated });
}
