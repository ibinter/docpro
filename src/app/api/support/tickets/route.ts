// POST /api/support/tickets — création d'un ticket d'assistance (CDC §17.1).
// {subject, category, body} → SupportTicket + premier TicketMessage + notification admins.
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireUser, AuthError } from '@/lib/auth';
import { audit } from '@/lib/audit';
import { notifyAdmins, notifyUser } from '@/lib/notify';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const CATEGORIES = ['facturation', 'technique', 'autre'];

export async function POST(req: Request) {
  try {
    const user = await requireUser();

    let data: Record<string, unknown> = {};
    try {
      const parsed = (await req.json()) as unknown;
      if (parsed && typeof parsed === 'object') data = parsed as Record<string, unknown>;
    } catch {
      /* corps invalide → validations ci-dessous */
    }
    const subject = typeof data.subject === 'string' ? data.subject.trim().slice(0, 200) : '';
    const category = typeof data.category === 'string' ? data.category.trim() : '';
    const body = typeof data.body === 'string' ? data.body.trim().slice(0, 5000) : '';

    if (!subject) return NextResponse.json({ error: 'Le sujet est obligatoire.' }, { status: 400 });
    if (!body) return NextResponse.json({ error: 'Le message est obligatoire.' }, { status: 400 });
    if (!CATEGORIES.includes(category)) {
      return NextResponse.json({ error: 'Catégorie invalide.' }, { status: 400 });
    }

    // Ticket + message initial atomiques ; effets de bord après commit.
    const ticket = await prisma.$transaction(async (tx) => {
      const t = await tx.supportTicket.create({
        data: { userId: user.id, subject, category, status: 'ouvert' },
      });
      await tx.ticketMessage.create({
        data: { ticketId: t.id, authorId: user.id, fromAdmin: false, body },
      });
      return t;
    });

    try {
      // Confirmation au client
      await notifyUser({
        userId: user.id,
        event: 'ticket_ouvert',
        title: `Ticket #${ticket.id.slice(-8).toUpperCase()} enregistré`,
        body: `Votre demande « ${subject} » a été reçue. Nous vous répondons bientôt.`,
        vars: { ref: ticket.id.slice(-8).toUpperCase(), sujet: subject },
      });
      await notifyAdmins({
        event: 'ticket_cree',
        title: `Nouveau ticket d'assistance (${category})`,
        body: `${user.email} — « ${subject} »`,
      });
      await audit({
        actorId: user.id,
        action: 'ticket.create',
        entityType: 'SupportTicket',
        entityId: ticket.id,
        after: { subject, category },
      });
    } catch (e) {
      console.error('[support] effet post-commit échoué :', e);
    }

    return NextResponse.json({ ok: true, id: ticket.id });
  } catch (e) {
    if (e instanceof AuthError) {
      return NextResponse.json({ error: e.message }, { status: e.status });
    }
    console.error('[api/support/tickets]', e);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
