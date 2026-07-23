// POST /api/auth/deconnexion — fermeture de session.
// Utilisation depuis n'importe quelle page :
//   <form method="POST" action="/api/auth/deconnexion"><button className="btn btn-ghost">Déconnexion</button></form>
import { NextResponse } from 'next/server';
import { destroySession, getSessionUser } from '@/lib/auth';
import { audit } from '@/lib/audit';

export async function POST(req: Request) {
  const user = await getSessionUser();
  if (user) {
    await audit({
      actorId: user.id,
      action: 'auth.logout',
      entityType: 'User',
      entityId: user.id,
    });
  }
  await destroySession();
  return NextResponse.redirect(new URL('/', req.url), 303);
}
