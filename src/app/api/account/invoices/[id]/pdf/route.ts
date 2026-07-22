// GET /api/account/invoices/[id]/pdf — télécharge le PDF d'une facture du client connecté.
import { NextRequest, NextResponse } from 'next/server';
import { requireUser, AuthError } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { generateInvoicePdf } from '@/lib/invoice-pdf';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireUser();
    const { id } = await params;

    const invoice = await prisma.invoice.findUnique({
      where: { id },
      include: {
        order: {
          include: {
            plan: true,
            transactions: { orderBy: { createdAt: 'desc' } },
          },
        },
        user: { include: { organization: true } },
      },
    });

    // Propriété : la facture doit appartenir à l'utilisateur connecté.
    if (!invoice || invoice.userId !== user.id) {
      return NextResponse.json({ error: 'Facture introuvable' }, { status: 404 });
    }

    // Transaction de référence : la confirmée en priorité, sinon la plus récente.
    const tx =
      invoice.order.transactions.find((t) => t.status === 'reussie' || t.status === 'validee_manuellement') ??
      invoice.order.transactions[0] ??
      null;

    const pdf = await generateInvoicePdf({
      invoice: {
        number: invoice.number,
        type: invoice.type,
        amount: invoice.amount,
        discount: invoice.discount,
        tax: invoice.tax,
        total: invoice.total,
        currency: invoice.currency,
        periodStart: invoice.periodStart,
        periodEnd: invoice.periodEnd,
        status: invoice.status,
        verifyCode: invoice.verifyCode,
        createdAt: invoice.createdAt,
      },
      order: { number: invoice.order.number, paymentMethod: invoice.order.paymentMethod },
      transaction: tx ? { internalRef: tx.internalRef, provider: tx.provider, method: tx.method } : null,
      user: {
        name: invoice.user.name,
        email: invoice.user.email,
        phone: invoice.user.phone,
        country: invoice.user.country,
      },
      organization: invoice.user.organization
        ? {
            name: invoice.user.organization.name,
            address: invoice.user.organization.address,
            taxId: invoice.user.organization.taxId,
          }
        : null,
      plan: invoice.order.plan ? { name: invoice.order.plan.name, code: invoice.order.plan.code } : null,
    });

    return new NextResponse(new Uint8Array(pdf), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${invoice.number}.pdf"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.redirect(new URL('/connexion', req.url), 303);
    }
    console.error('Erreur génération PDF facture :', err);
    return NextResponse.json({ error: 'Erreur lors de la génération du PDF' }, { status: 500 });
  }
}
