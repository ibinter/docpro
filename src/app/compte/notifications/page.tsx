// Notifications de l'utilisateur — non lues en gras + « tout marquer comme lu ».
import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { fmtDateTime } from '../ui/status';

export const dynamic = 'force-dynamic';

export default async function NotificationsPage() {
  const user = await getSessionUser();
  if (!user) redirect('/connexion');

  const notifications = await prisma.notification.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
    take: 100,
  });
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div>
      <div className="flex-between mb-2">
        <h1>
          Notifications{' '}
          {unreadCount > 0 && <span className="badge badge-gold">{unreadCount} non lue{unreadCount > 1 ? 's' : ''}</span>}
        </h1>
        {unreadCount > 0 && (
          <form method="post" action="/api/account/notifications/read">
            <button type="submit" className="btn btn-outline btn-sm">Tout marquer comme lu</button>
          </form>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="card text-center" style={{ padding: 40 }}>
          <p className="text-muted">Aucune notification pour le moment.</p>
        </div>
      ) : (
        <div className="card" style={{ padding: 0 }}>
          {notifications.map((n, i) => (
            <div
              key={n.id}
              style={{
                padding: '14px 20px',
                borderBottom: i < notifications.length - 1 ? '1px solid #ECEFF1' : 'none',
                background: n.read ? 'transparent' : '#E3F2FD',
              }}
            >
              <div className="flex-between">
                <span style={{ fontWeight: n.read ? 500 : 800, color: 'var(--navy)' }}>
                  {!n.read && <span style={{ color: 'var(--cobalt)', marginRight: 8 }}>●</span>}
                  {n.title}
                </span>
                <span className="text-small text-muted">{fmtDateTime(n.createdAt)}</span>
              </div>
              <p className="text-small mt-1" style={{ color: 'var(--gray)', fontWeight: n.read ? 400 : 600 }}>
                {n.body}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
