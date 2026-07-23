// ═══════════════════════════════════════════════════════════════
// IBIG DocPro — Middleware global (CDC §19.1).
// S'exécute en Edge runtime sur toutes les routes sauf assets statiques.
//
// 1. Headers de sécurité sur chaque réponse.
// 2. Rate limiting en mémoire par IP (fenêtre glissante) :
//    - 300 req/min global,
//    - 20 req/min sur les routes sensibles (méthodes mutantes uniquement,
//      pour ne pas bloquer le polling GET du statut de commande).
// 3. Protection de zones : /admin/**, /api/admin/**, /api/cron/** exigent
//    la PRÉSENCE du cookie de session (la vérification fine HMAC + rôle
//    reste dans les layouts/routes — défense en profondeur).
//    Exception : /api/cron/* passe si le header x-cron-key est présent
//    (la route vérifie la valeur).
// 4. CSRF léger : POST sur /api/* avec header Origin ne correspondant pas
//    au host → 403. Exemptés : /api/webhooks/* et /api/v1/* (appels
//    externes serveur→serveur, sans Origin ou avec Origin tiers légitime).
//
// IMPORTANT : pas de module Node ici (Edge runtime). La présence du cookie
// suffit comme pré-filtre ; jamais de HMAC ni de Prisma dans ce fichier.
// ═══════════════════════════════════════════════════════════════
import { NextRequest, NextResponse } from 'next/server';
import { globalLimiter, sensitiveLimiter } from '@/lib/security/ratelimit';

const SESSION_COOKIE = 'docpro_session';

/** Préfixes des routes sensibles soumises à la limite stricte (20/min). */
const SENSITIVE_PREFIXES = ['/api/auth/', '/api/payments/', '/api/webhooks/'];
const SENSITIVE_EXACT = ['/api/manual-payments/declare'];

/** Méthodes mutantes : seules concernées par la limite stricte et le CSRF. */
const MUTATING_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

function clientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim();
    if (first) return first;
  }
  return 'local';
}

function isSensitivePath(pathname: string): boolean {
  return (
    SENSITIVE_PREFIXES.some((p) => pathname.startsWith(p)) ||
    SENSITIVE_EXACT.includes(pathname)
  );
}

function applySecurityHeaders(res: NextResponse): NextResponse {
  res.headers.set('X-Frame-Options', 'DENY');
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  if (process.env.NODE_ENV === 'production') {
    res.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains');
  }
  return res;
}

function tooManyRequests(req: NextRequest, retryAfterSeconds: number): NextResponse {
  const isApi = req.nextUrl.pathname.startsWith('/api/');
  let res: NextResponse;
  if (isApi) {
    res = NextResponse.json(
      { error: 'Trop de requêtes. Veuillez patienter avant de réessayer.' },
      { status: 429 },
    );
  } else {
    res = new NextResponse(
      `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Trop de requêtes — IBIG DocPro</title>
<style>
  body{font-family:'Inter','Segoe UI',Arial,sans-serif;background:#F5F7FA;color:#1A1A2E;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;padding:20px}
  .box{background:#fff;border-radius:10px;box-shadow:0 2px 12px rgba(13,43,78,.08);padding:48px;max-width:460px;text-align:center}
  h1{color:#0D2B4E;font-size:1.4rem;margin:0 0 12px}
  p{color:#546E7A;margin:0 0 24px;line-height:1.55}
  a{display:inline-block;background:#1565C0;color:#fff;text-decoration:none;font-weight:600;padding:10px 20px;border-radius:8px}
</style>
</head>
<body>
<div class="box">
<h1>Trop de requêtes</h1>
<p>Vous avez effectué trop de requêtes en peu de temps. Merci de patienter ${retryAfterSeconds} seconde${retryAfterSeconds > 1 ? 's' : ''} avant de réessayer.</p>
<a href="/">Retour à l&rsquo;accueil</a>
</div>
</body>
</html>`,
      { status: 429, headers: { 'Content-Type': 'text/html; charset=utf-8' } },
    );
  }
  res.headers.set('Retry-After', String(retryAfterSeconds));
  return applySecurityHeaders(res);
}

export function middleware(req: NextRequest): NextResponse {
  const { pathname } = req.nextUrl;
  const ip = clientIp(req);

  // ── 1. Rate limiting ────────────────────────────────────────
  // Limite stricte sur les routes sensibles (méthodes mutantes uniquement,
  // afin de ne pas bloquer le polling GET /api/payments/orders/[id]/status).
  if (MUTATING_METHODS.has(req.method) && isSensitivePath(pathname)) {
    const strict = sensitiveLimiter.check(ip);
    if (!strict.allowed) return tooManyRequests(req, strict.retryAfterSeconds);
  }
  // Limite globale par IP sur toutes les routes couvertes par le matcher.
  const global = globalLimiter.check(ip);
  if (!global.allowed) return tooManyRequests(req, global.retryAfterSeconds);

  // ── 2. CSRF léger (POST /api/* avec Origin discordant) ──────
  if (
    MUTATING_METHODS.has(req.method) &&
    pathname.startsWith('/api/') &&
    !pathname.startsWith('/api/webhooks/') &&
    !pathname.startsWith('/api/v1/')
  ) {
    const origin = req.headers.get('origin');
    if (origin) {
      let originHost: string | null = null;
      try {
        originHost = new URL(origin).host;
      } catch {
        originHost = null; // Origin malformé (ex. « null ») → rejet.
      }
      const host = req.headers.get('host');
      if (!originHost || !host || originHost !== host) {
        return applySecurityHeaders(
          NextResponse.json({ error: 'Origine de la requête non autorisée.' }, { status: 403 }),
        );
      }
    }
    // Origin absent : appel serveur→serveur ou client non-navigateur → OK
    // (la simulation de paiement interne et les outils CLI doivent passer).
  }

  // ── 3. Protection de zones (présence du cookie de session) ──
  const isAdminPage = pathname === '/admin' || pathname.startsWith('/admin/');
  const isAdminApi = pathname === '/api/admin' || pathname.startsWith('/api/admin/');
  const isCronApi = pathname === '/api/cron' || pathname.startsWith('/api/cron/');

  if (isAdminPage || isAdminApi || isCronApi) {
    // Le cron peut être appelé sans cookie avec un header x-cron-key
    // (la route /api/cron/run vérifie elle-même la valeur de la clé).
    const hasCronKey = isCronApi && !!process.env.CRON_SECRET && req.headers.get('x-cron-key') === process.env.CRON_SECRET;
    const hasSessionCookie = req.cookies.get(SESSION_COOKIE) !== undefined;

    if (!hasSessionCookie && !hasCronKey) {
      if (isAdminPage) {
        const loginUrl = new URL('/connexion', req.url);
        loginUrl.searchParams.set('next', pathname);
        return applySecurityHeaders(NextResponse.redirect(loginUrl));
      }
      return applySecurityHeaders(
        NextResponse.json({ error: 'Non authentifié.' }, { status: 401 }),
      );
    }
  }

  // ── 4. Passage normal + headers de sécurité ─────────────────
  return applySecurityHeaders(NextResponse.next());
}

export const config = {
  // Toutes les routes sauf assets Next et fichiers statiques (extensions).
  // Les routes API n'ont jamais d'extension → toujours couvertes.
  matcher: [
    '/((?!_next/static|_next/image|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|css|js|map|txt|woff|woff2|ttf|otf)$).*)',
  ],
};
