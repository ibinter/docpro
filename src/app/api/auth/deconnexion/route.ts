// POST /api/auth/deconnexion — fermeture de session.
// Utilisation depuis n'importe quelle page :
//   <form method="POST" action="/api/auth/deconnexion"><button className="btn btn-ghost">Déconnexion</button></form>
import { NextResponse } from 'next/server';
import { destroySession } from '@/lib/auth';

export async function POST(req: Request) {
  await destroySession();
  return NextResponse.redirect(new URL('/', req.url), 303);
}
