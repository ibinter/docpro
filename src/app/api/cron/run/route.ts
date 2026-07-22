// GET/POST /api/cron/run?job=X — exécute une tâche planifiée (CDC §20.1).
// Autorisation : header x-cron-key == SESSION_SECRET  OU  session admin/superadmin.
import { NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import { isJobName, runAllJobs, runJob, JOBS } from '../jobs';

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
  const url = new URL(req.url);
  const job = url.searchParams.get('job') ?? '';
  if (job === 'all') {
    const results = await runAllJobs();
    const ok = results.every((r) => r.status === 'ok');
    return NextResponse.json({ ok, results });
  }
  if (!isJobName(job)) {
    return NextResponse.json(
      { error: `Job inconnu. Jobs disponibles : ${[...JOBS, 'all'].join(', ')}` },
      { status: 400 },
    );
  }
  const result = await runJob(job);
  return NextResponse.json({ ok: result.status === 'ok', ...result });
}

export async function GET(req: Request) {
  return handle(req);
}

export async function POST(req: Request) {
  return handle(req);
}
