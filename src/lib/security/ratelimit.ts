// ═══════════════════════════════════════════════════════════════
// IBIG DocPro — Rate limiter en mémoire (fenêtre glissante).
// CDC §19.1 : « Rate limiting : limitation du nombre de requêtes par IP ».
//
// Compatible Edge runtime (middleware Next.js) : aucune API Node,
// uniquement Map + Date. Chaque instance de runtime possède sa propre
// mémoire — suffisant pour un déploiement mono-instance ; pour du
// multi-instances, remplacer par un backend partagé (Redis, etc.).
//
// Anti-fuite mémoire : un nettoyage paresseux supprime périodiquement
// les clés dont toutes les entrées sont expirées (pas de setInterval,
// non fiable en Edge — le balayage est déclenché par les appels check()).
// ═══════════════════════════════════════════════════════════════

export type RateLimitResult = {
  /** true si la requête est autorisée. */
  allowed: boolean;
  /** Nombre de requêtes restantes dans la fenêtre (0 si bloqué). */
  remaining: number;
  /** Secondes à attendre avant un nouvel essai (0 si autorisé). */
  retryAfterSeconds: number;
};

export class SlidingWindowRateLimiter {
  /** clé (ex. IP) → timestamps (ms) des requêtes dans la fenêtre, ordonnés. */
  private readonly hits = new Map<string, number[]>();
  private lastCleanup = Date.now();

  constructor(
    private readonly limit: number,
    private readonly windowMs: number,
    private readonly cleanupIntervalMs: number = 60_000,
  ) {}

  /** Enregistre une tentative pour `key` et indique si elle est autorisée. */
  check(key: string): RateLimitResult {
    const now = Date.now();
    this.maybeCleanup(now);

    const windowStart = now - this.windowMs;
    let timestamps = this.hits.get(key);
    if (!timestamps) {
      timestamps = [];
      this.hits.set(key, timestamps);
    }

    // Éjecte les timestamps sortis de la fenêtre glissante.
    while (timestamps.length > 0 && timestamps[0] <= windowStart) {
      timestamps.shift();
    }

    if (timestamps.length >= this.limit) {
      const oldest = timestamps[0];
      const retryAfterMs = oldest + this.windowMs - now;
      return {
        allowed: false,
        remaining: 0,
        retryAfterSeconds: Math.max(1, Math.ceil(retryAfterMs / 1000)),
      };
    }

    timestamps.push(now);
    return {
      allowed: true,
      remaining: this.limit - timestamps.length,
      retryAfterSeconds: 0,
    };
  }

  /** Nombre de clés actuellement suivies (utile pour tests / diagnostics). */
  get size(): number {
    return this.hits.size;
  }

  /** Supprime les clés dont toutes les entrées sont expirées. */
  private maybeCleanup(now: number): void {
    if (now - this.lastCleanup < this.cleanupIntervalMs) return;
    this.lastCleanup = now;
    const windowStart = now - this.windowMs;
    for (const [key, timestamps] of this.hits) {
      // La liste est ordonnée : si la plus récente est expirée, tout l'est.
      if (timestamps.length === 0 || timestamps[timestamps.length - 1] <= windowStart) {
        this.hits.delete(key);
      }
    }
  }
}

/** Limite globale : 300 requêtes / minute / IP sur toutes les routes. */
export const globalLimiter = new SlidingWindowRateLimiter(300, 60_000);

/**
 * Limite stricte : 20 requêtes / minute / IP sur les routes sensibles
 * (auth, paiements, déclaration manuelle, webhooks) — méthodes mutantes.
 */
export const sensitiveLimiter = new SlidingWindowRateLimiter(20, 60_000);
