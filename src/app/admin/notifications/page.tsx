// Notifications destinées aux administrateurs.
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';
import { requireRole } from '@/lib/auth';
import { fmtDateTime } from '../ui';

export const dynamic = 'force-dynamic';

async function markAllRead() {
  'use server';
  await requireRole('admin');
  await prisma.notification.updateMany({
    where: { forAdmin: true, read: false },
    data: { read: true },
  });
  revalidatePath('/admin/notifications');
}

export default async function NotificationsPage() {
  const [unread, notifications] = await Promise.all([
    prisma.notification.count({ where: { forAdmin: true, read: false } }),
    prisma.notification.findMany({
      where: { forAdmin: true },
      orderBy: { createdAt: 'desc' },
      take: 60,
    }),
  ]);

  return (
    <>
      <div className="flex-between mb-2" style={{ flexWrap: 'wrap' }}>
        <h1>
          Notifications admin{' '}
          {unread > 0 && <span className="badge badge-danger">{unread} non lue(s)</span>}
        </h1>
        {unread > 0 && (
          <form action={markAllRead}>
            <button className="btn btn-outline btn-sm" type="submit">Tout marquer comme lu</button>
          </form>
        )}
      </div>

      <div className="grid" style={{ gap: 12 }}>
        {notifications.length === 0 && (
          <div className="card text-center"><p className="text-muted">Aucune notification.</p></div>
        )}
        {notifications.map((n) => (
          <div key={n.id} className="card" style={n.read ? { opacity: 0.75 } : { borderLeft: '4px solid var(--cobalt)' }}>
            <div className="flex-between" style={{ flexWrap: 'wrap' }}>
              <strong>{n.title}</strong>
              <span className="text-small text-muted">{fmtDateTime(n.createdAt)}</span>
            </div>
            <p className="text-small mt-1">{n.body}</p>
            <p className="text-small text-muted mt-1">
              Événement : <code>{n.event}</code> {!n.read && <span className="badge badge-info">nouveau</span>}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
