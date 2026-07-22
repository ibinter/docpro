// POST /api/blockchain/orders — Achat de l'option « Certification blockchain »
// (CDC §21 couche 3, +500 FCFA). Body : { documentId } → réponse { orderId }.
// Conditions : utilisateur connecté, propriétaire du document, document déjà
// payé, pas encore certifié. Crée une commande de 500 FCFA (planId null,
// documentId renseigné, metadataJson {certification:true}) — le client est
// ensuite redirigé vers /checkout?order=… (tunnel de paiement existant).
// La certification est déclenchée à la CONFIRMATION du paiement (webhook
// Moneroo ou validation manuelle) — jamais ici.
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireUser, AuthError } from '@/lib/auth';
import { refNumber } from '@/lib/money';
import { audit } from '@/lib/audit';
import { CERTIFICATION_FEE } from '@/lib/blockchain';

const ORDER_TTL_MS = 24 * 60 * 60 * 1000; // expiration commande : +24 h
const REUSE_WINDOW_MS = 30 * 60 * 1000; // anti double-clic : 30 min

export async function POST(req: NextRequest) {
  try {
    const user = await requireUser();
    const body = await req.json().catch(() => ({}));
    const documentId = typeof body.documentId === 'string' ? body.documentId : '';
    if (!documentId) {
      return NextResponse.json({ error: 'documentId requis.' }, { status: 400 });
    }

    const doc = await prisma.generatedDocument.findUnique({
      where: { id: documentId },
      select: { id: true, userId: true, paid: true, currency: true },
    });
    if (!doc) {
      return NextResponse.json({ error: 'Document introuvable.' }, { status: 404 });
    }
    if (doc.userId && doc.userId !== user.id) {
      return NextResponse.json({ error: 'Ce document ne vous appartient pas.' }, { status: 403 });
    }
    if (!doc.paid) {
      return NextResponse.json(
        { error: 'Le document doit d’abord être payé avant de pouvoir être certifié.' },
        { status: 400 },
      );
    }

    const cert = await prisma.blockchainCert.findUnique({ where: { documentId } });
    if (cert && cert.status !== 'echec') {
      return NextResponse.json({ error: 'Ce document est déjà certifié blockchain.' }, { status: 409 });
    }

    // Anti double-clic : réutilise une commande de certification récente encore payable.
    const reuseSince = new Date(Date.now() - REUSE_WINDOW_MS);
    const existing = await prisma.order.findFirst({
      where: {
        userId: user.id,
        documentId,
        planId: null,
        status: 'en_attente_paiement',
        createdAt: { gte: reuseSince },
        metadataJson: { contains: '"certification":true' },
      },
      orderBy: { createdAt: 'desc' },
    });
    if (existing) {
      return NextResponse.json({ orderId: existing.id, reused: true });
    }

    const metadataJson = JSON.stringify({
      certification: true,
      documentId,
      ip: req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'inconnue',
      userAgent: req.headers.get('user-agent') ?? 'inconnu',
      source: 'certification_blockchain',
    });

    // Numéro lisible séquentiel CMD-2026-NNNNNN (retente en cas de collision).
    let order = null;
    let lastError: unknown = null;
    for (let attempt = 0; attempt < 5 && !order; attempt++) {
      const count = await prisma.order.count();
      const number = refNumber('CMD', count + 1 + attempt);
      try {
        order = await prisma.order.create({
          data: {
            number,
            userId: user.id,
            organizationId: user.organizationId,
            planId: null,
            documentId,
            status: 'en_attente_paiement',
            amount: CERTIFICATION_FEE,
            discount: 0,
            tax: 0,
            total: CERTIFICATION_FEE,
            currency: 'XOF',
            billingCountry: user.country ?? null,
            expiresAt: new Date(Date.now() + ORDER_TTL_MS),
            metadataJson,
          },
        });
      } catch (e) {
        if ((e as { code?: string }).code === 'P2002') { lastError = e; continue; }
        throw e;
      }
    }
    if (!order) throw lastError ?? new Error('Impossible de générer un numéro de commande unique');

    await audit({
      actorId: user.id,
      action: 'order.create',
      entityType: 'Order',
      entityId: order.id,
      after: { number: order.number, total: order.total, currency: order.currency, certification: true, documentId },
    });

    return NextResponse.json({ orderId: order.id });
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    console.error('[blockchain/orders] Erreur inattendue :', err);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}
