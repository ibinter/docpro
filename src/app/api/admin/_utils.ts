// Helpers communs des routes API admin.
import { NextResponse } from 'next/server';
import { AuthError } from '@/lib/auth';

export function apiError(e: unknown): NextResponse {
  if (e instanceof AuthError) {
    return NextResponse.json({ error: e.message }, { status: e.status });
  }
  const msg = e instanceof Error ? e.message : 'Erreur serveur';
  console.error('[api/admin]', e);
  return NextResponse.json({ error: msg }, { status: 500 });
}

export async function readJson(req: Request): Promise<Record<string, unknown>> {
  try {
    const data = (await req.json()) as unknown;
    return data && typeof data === 'object' ? (data as Record<string, unknown>) : {};
  } catch {
    return {};
  }
}

export function requiredString(body: Record<string, unknown>, key: string): string | null {
  const v = body[key];
  return typeof v === 'string' && v.trim() ? v.trim() : null;
}

/** Calcule une date de fin à partir de la durée d'un forfait (même logique que lib/license). */
export function computeEnd(from: Date, durationType: string, durationValue: number): Date | null {
  if (durationType === 'perpetual') return null;
  const d = new Date(from);
  if (durationType === 'days') d.setDate(d.getDate() + durationValue);
  else if (durationType === 'months') d.setMonth(d.getMonth() + durationValue);
  else if (durationType === 'years') d.setFullYear(d.getFullYear() + durationValue);
  return d;
}
