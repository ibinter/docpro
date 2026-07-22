// Helpers HTTP communs aux routes du module paiement électronique.
import { NextResponse } from 'next/server';
import { AuthError } from '@/lib/auth';

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export function handleApiError(e: unknown) {
  if (e instanceof AuthError) return jsonError(e.message, e.status);
  console.error('[payments] erreur API :', e);
  return jsonError('Erreur interne du serveur', 500);
}

/** Extrait IP + user-agent d'une Request (métadonnées de commande, CDC §13.1). */
export function requestMeta(req: Request): { ip: string; userAgent: string } {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'inconnue';
  return { ip, userAgent: req.headers.get('user-agent') ?? 'inconnu' };
}
