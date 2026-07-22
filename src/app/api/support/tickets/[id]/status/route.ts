// POST /api/support/tickets/[id]/status — changement de statut (admin uniquement, audité).
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireRole, AuthError } from '@/lib/auth';
import { audit } from '@/lib/audit';
import { notifyUser } from '@/lib/notify';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const STATUSES = ['ouvert', 'en_cours', 'resolu', 'ferme'];

const STATUS_LABELS: Record<string, string> = {
  ouvert: 'ouvert',
  en_cours: 'en cours de traitement',
  resolu: 'résolu',
  ferme: 'fermé',
};

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const admin = await requireRole('admin');
    const { id } = await params;

    let status = '';
    try {
      const parsed = (await req.json()) as unknown;
      if (parsed && typeof parsed === 'object' && typeof (parsed as Record<string, unknown>).status === 'string') {
        status = ((parsed as Record<string, unknown>).status as string).trim();
      }
    } catch {
      /* corps invalide → validation ci-dessous */
    }
    if (!STATUSES.includes(status)) {
      return NextResponse.json({ error: 'Statut invalide.' }, { status: 400 });
    }

    const ticket = await prisma.supportTicket.findUnique({ where: { id } });
    if (!ticket) return NextResponse.json({ error: 'Ticket introuvable.' }, { status: 404 });
    if (ticket.status === status) {
      return NextResponse.json({ error: 'Le ticket est déjà dans ce statut.' }, { status: 400 });
    }

    const updated = await prisma.supportTicket.update({ where: { id }, data: { status } });

    try {
      await audit({
        actorId: admin.id,
        action: 'ticket.status_change',
        entityType: 'SupportTicket',
        entityId: ticket.id,
        before: { status: ticket.status },
        after: { status },
      });
      await notifyUser({
        userId: ticket.userId,
        event: 'ticket_statut',
        title: `Votre ticket « ${ticket.subject} » est ${STATUS_LABELS[status] ?? status}`,
        body:
          status === 'resolu'
            ? 'Notre équipe considère votre demande comme résolue. Répondez au ticket si le problème persiste.'
            : status === 'ferme'
              ? 'Ce ticket a été fermé. Créez un nouveau ticket si vous avez besoin d’aide.'
              : 'Le statut de votre demande d’assistance a été mis à jour.',
      });
    } catch (e) {
      console.error('[support] effet post-commit échoué :', e);
    }

    return NextResponse.json({ ok: true, ticket: updated });
  } catch (e) {
    if (e instanceof AuthError) {
      return NextResponse.json({ error: e.message }, { status: e.status });
    }
    console.error('[api/support/tickets/status]', e);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
