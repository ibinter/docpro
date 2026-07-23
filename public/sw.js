// Service Worker IBIG DocPro — Cache offline + stratégies réseau
// Version : incrémentez CACHE_VERSION à chaque déploiement pour invalider le cache.
const CACHE_VERSION = 'v3';
const STATIC_CACHE = `docpro-static-${CACHE_VERSION}`;
const API_CACHE    = `docpro-api-${CACHE_VERSION}`;

// Ressources à pré-cacher (shell de l'application)
const PRECACHE_URLS = [
  '/',
  '/catalogue',
  '/tarifs',
  '/aide',
  '/faq',
  '/connexion',
  '/inscription',
  '/manifest.json',
  '/logo-principal.svg',
  '/logo-dark.svg',
  '/logo-icone.svg',
];

// ── Installation : pré-cache du shell ───────────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) =>
      cache.addAll(PRECACHE_URLS).catch((e) => {
        // Ne pas bloquer l'installation si une ressource est indisponible
        console.warn('[SW] Précache partiel :', e);
      })
    ).then(() => self.skipWaiting())
  );
});

// ── Activation : nettoyage des anciens caches ────────────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k !== STATIC_CACHE && k !== API_CACHE)
          .map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// ── Fetch : stratégies différenciées par type de requête ────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignorer les requêtes non-GET, les extensions, les WebSockets
  if (request.method !== 'GET') return;
  if (url.protocol !== 'https:' && url.hostname !== 'localhost') return;

  // Routes API → Network-first (pas de cache stale pour les données)
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirst(request, API_CACHE, 5000));
    return;
  }

  // Ressources statiques (_next/static) → Cache-first (immuables en prod)
  if (url.pathname.startsWith('/_next/static/')) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  // Fonts, images, SVG → Cache-first avec fallback réseau
  if (
    request.destination === 'image' ||
    request.destination === 'font' ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.ico')
  ) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  // Pages HTML → Stale-while-revalidate (affiche le cache, met à jour en fond)
  if (request.destination === 'document' || request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(staleWhileRevalidate(request, STATIC_CACHE));
    return;
  }

  // JS/CSS → Cache-first
  if (request.destination === 'script' || request.destination === 'style') {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }
});

// ── Stratégies ───────────────────────────────────────────────────────────────

/** Cache-first : retourne le cache si disponible, sinon réseau + mise en cache */
async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response('Ressource indisponible hors ligne.', { status: 503 });
  }
}

/** Network-first avec timeout : réseau d'abord, cache si timeout ou erreur */
async function networkFirst(request, cacheName, timeoutMs) {
  const cache = await caches.open(cacheName);
  try {
    const controller = new AbortController();
    const tid = setTimeout(() => controller.abort(), timeoutMs);
    const response = await fetch(request, { signal: controller.signal });
    clearTimeout(tid);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch {
    const cached = await cache.match(request);
    if (cached) return cached;
    return new Response(
      JSON.stringify({ error: 'Hors ligne — données indisponibles.' }),
      { status: 503, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

/** Stale-while-revalidate : répond avec le cache immédiatement, met à jour en fond */
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  const fetchPromise = fetch(request)
    .then((response) => {
      if (response.ok) cache.put(request, response.clone());
      return response;
    })
    .catch(() => null);

  return cached || fetchPromise || offlineFallback();
}

/** Page de fallback affichée quand rien n'est disponible hors ligne */
function offlineFallback() {
  return new Response(
    `<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Hors ligne — IBIG DocPro</title>
  <style>
    body{font-family:Arial,sans-serif;background:#0D2B4E;color:#fff;display:flex;
      align-items:center;justify-content:center;min-height:100vh;margin:0;text-align:center;padding:24px}
    h1{color:#FFD700;font-size:1.6rem;margin-bottom:12px}
    p{opacity:.8;line-height:1.7;max-width:400px}
    a{display:inline-block;margin-top:20px;background:#1565C0;color:#fff;
      padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600}
  </style>
</head>
<body>
  <div>
    <div style="font-size:3rem;margin-bottom:16px">📄</div>
    <h1>Vous êtes hors ligne</h1>
    <p>IBIG DocPro nécessite une connexion internet pour générer vos documents.<br>
       Reconnectez-vous et réessayez.</p>
    <a href="/">Réessayer</a>
  </div>
</body>
</html>`,
    { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
  );
}

// ── Message : force la mise à jour depuis le client ─────────────────────────
self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
