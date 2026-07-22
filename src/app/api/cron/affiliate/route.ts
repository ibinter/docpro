// GET/POST /api/cron/affiliate — job planifié DÉDIÉ : calcul des commissions
// d'affiliation (CDC §7.3). Idempotent (AffiliateEarning.orderId unique).
// Autorisation identique aux autres crons : header x-cron-key == SESSION_SECRET
// OU session admin/superadmin.
import { NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { computeAffiliateEarnings } from '@/lib/affiliate';

async function authorized(req: Request): Promise<boolean> {
  const key = req.headers.get('x-cron-key');
  const secret = process.env.SESSION_SECRET || 'dev-secret';
  if (key && key === secret) return true;
  const user = await getSessionUser();
  return !!user && (user.role === 'admin' || user.role === 'superadmin');
}

async function handle(req: Request): Promise<NextResponse> {
  if (!(await authorized(req))) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }
  let status: 'ok' | 'erreur' = 'ok';
  let details: Record<string, unknown> = {};
  try {
    details = await computeAffiliateEarnings();
  } catch (e) {
    status = 'erreur';
    details = { error: e instanceof Error ? e.message : String(e) };
  }
  await prisma.cronRun.create({
    data: { job: 'affiliate_commissions', status, detailsJson: JSON.stringify(details) },
  });
  return NextResponse.json({ ok: status === 'ok', job: 'affiliate_commissions', status, details });
}

export async function GET(req: Request) {
  return handle(req);
}

export async function POST(req: Request) {
  return handle(req);
}
