// Helper pour construire des URLs absolues correctes derrière un reverse proxy.
// Next.js utilise l'URL interne (localhost:3015) dans req.url — on utilise
// NEXT_PUBLIC_BASE_URL (défini dans .env.local) pour les redirects publics.
export function makeUrl(path: string): URL {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3015'
  return new URL(path, base)
}
