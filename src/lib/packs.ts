// ─────────────────────────────────────────────────────────────────────────────
// IBIG DocPro — Packs groupés (CDC §6.2).
// Un pack est un Plan dont le code est préfixé PACK_ et dont featuresJson
// contient { isPack: true, templates: ['code1', …], description }.
// L'achat d'un pack passe par le tunnel de commande/licence existant :
// la licence active du pack donne droit aux templates listés pendant sa durée.
// ─────────────────────────────────────────────────────────────────────────────
import type { Plan } from '@prisma/client';
import { prisma } from './db';

export type PackFeatures = {
  isPack: true;
  templates: string[];
  description?: string;
};

/** Parse featuresJson d'un Plan pack (tolérant). Retourne null si ce n'est pas un pack. */
export function parsePackFeatures(featuresJson: string | null): PackFeatures | null {
  if (!featuresJson) return null;
  try {
    const parsed = JSON.parse(featuresJson) as unknown;
    if (
      parsed &&
      typeof parsed === 'object' &&
      !Array.isArray(parsed) &&
      (parsed as { isPack?: unknown }).isPack === true &&
      Array.isArray((parsed as { templates?: unknown }).templates)
    ) {
      const p = parsed as { isPack: true; templates: unknown[]; description?: unknown };
      return {
        isPack: true,
        templates: p.templates.filter((t): t is string => typeof t === 'string'),
        description: typeof p.description === 'string' ? p.description : undefined,
      };
    }
    return null;
  } catch {
    return null;
  }
}

/** Vrai si ce Plan est un pack groupé. */
export function isPackPlan(plan: Pick<Plan, 'code' | 'featuresJson'>): boolean {
  return plan.code.startsWith('PACK_') && parsePackFeatures(plan.featuresJson) !== null;
}

/** Liste les packs actifs (Plan + features parsées), triés par displayOrder. */
export async function getActivePacks(): Promise<Array<{ plan: Plan; features: PackFeatures }>> {
  const plans = await prisma.plan.findMany({
    where: { active: true, code: { startsWith: 'PACK_' } },
    orderBy: { displayOrder: 'asc' },
  });
  return plans
    .map((plan) => ({ plan, features: parsePackFeatures(plan.featuresJson) }))
    .filter((p): p is { plan: Plan; features: PackFeatures } => p.features !== null);
}

/** Statuts de licence donnant accès aux templates du pack. */
const ACTIVE_STATUSES = ['active', 'provisoire', 'grace'];

/**
 * Vrai si l'utilisateur possède une licence de pack active couvrant ce template.
 * N'altère PAS la logique de paiement à l'unité — simple droit d'accès additionnel.
 */
export async function userHasTemplateViaPack(userId: string, templateCode: string): Promise<boolean> {
  const licenses = await prisma.license.findMany({
    where: {
      userId,
      status: { in: ACTIVE_STATUSES },
      plan: { code: { startsWith: 'PACK_' } },
    },
    include: { plan: true },
  });

  const now = new Date();
  for (const license of licenses) {
    // Licence « active » expirée (le cron n'est pas encore passé) → pas de droit.
    if (license.status === 'active' && license.endDate && license.endDate < now) continue;
    const features = parsePackFeatures(license.plan.featuresJson);
    if (features && features.templates.includes(templateCode)) return true;
  }
  return false;
}

/** Codes de tous les templates accessibles via les packs actifs de l'utilisateur. */
export async function templatesViaPacksForUser(userId: string): Promise<string[]> {
  const licenses = await prisma.license.findMany({
    where: {
      userId,
      status: { in: ACTIVE_STATUSES },
      plan: { code: { startsWith: 'PACK_' } },
    },
    include: { plan: true },
  });

  const now = new Date();
  const codes = new Set<string>();
  for (const license of licenses) {
    if (license.status === 'active' && license.endDate && license.endDate < now) continue;
    const features = parsePackFeatures(license.plan.featuresJson);
    if (features) for (const code of features.templates) codes.add(code);
  }
  return [...codes];
}
