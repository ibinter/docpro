// POST /api/support/tickets/[id]/messages — répondre à un ticket (propriétaire ou admin).
// Chaque nouveau message notifie l'autre partie (notifyAdmins si client, notifyUser si admin).
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireUser, AuthError } from '@/lib/auth';
import { notifyUser, notifyAdmins } from '@/lib/notify';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireUser();
    const { id } = await params;

    let body = '';
    try {
      const parsed = (await req.json()) as unknown;
      if (parsed && typeof parsed === 'object' && typeof (parsed as Record<string, unknown>).body === 'string') {
        body = ((parsed as Record<string, unknown>).body as string).trim().slice(0, 5000);
      }
    } catch {
      /* corps invalide → validation ci-dessous */
    }
    if (!body) return NextResponse.json({ error: 'Le message est vide.' }, { status: 400 });

    const ticket = await prisma.supportTicket.findUnique({
      where: { id },
      include: { messages: { select: { id: true }, take: 1 } },
    });
    if (!ticket) return NextResponse.json({ error: 'Ticket introuvable.' }, { status: 404 });

    const isAdmin = user.role === 'admin' || user.role === 'superadmin';
    const isOwner = ticket.userId === user.id;
    if (!isOwner && !isAdmin) {
      return NextResponse.json({ error: 'Accès refusé.' }, { status: 403 });
    }
    if (ticket.status === 'ferme') {
      return NextResponse.json(
        { error: 'Ce ticket est fermé — créez un nouveau ticket si besoin.' },
        { status: 400 },
      );
    }

    const fromAdmin = isAdmin && !isOwner;
    // Statut mis à jour au fil de la conversation :
    //  - réponse admin sur ticket « ouvert » → « en_cours »
    //  - relance client sur ticket « resolu » → « en_cours » (réouverture)
    let nextStatus = ticket.status;
    if (fromAdmin && ticket.status === 'ouvert') nextStatus = 'en_cours';
    if (!fromAdmin && ticket.status === 'resolu') nextStatus = 'en_cours';

    await prisma.$transaction([
      prisma.ticketMessage.create({
        data: { ticketId: ticket.id, authorId: user.id, fromAdmin, body },
      }),
      // bump updatedAt (+ éventuel changement de statut) pour le tri des files.
      prisma.supportTicket.update({ where: { id: ticket.id }, data: { status: nextStatus } }),
    ]);

    try {
      if (fromAdmin) {
        await notifyUser({
          userId: ticket.userId,
          event: 'ticket_reponse',
          title: `Réponse de l'assistance — « ${ticket.subject} »`,
          body: body.length > 180 ? `${body.slice(0, 180)}…` : body,
          vars: { ref: ticket.id.slice(-8).toUpperCase(), sujet: ticket.subject },
        });
      } else {
        await notifyAdmins({
          event: 'ticket_message',
          title: `Nouveau message client — « ${ticket.subject} »`,
          body: `${user.email} : ${body.length > 180 ? `${body.slice(0, 180)}…` : body}`,
        });
      }
    } catch (e) {
      console.error('[support] notification échouée :', e);
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    if (e instanceof AuthError) {
      return NextResponse.json({ error: e.message }, { status: e.status });
    }
    console.error('[api/support/tickets/messages]', e);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
