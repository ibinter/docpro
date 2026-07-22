// ─────────────────────────────────────────────────────────────────────────────
// ORGANISATIONS MULTI-UTILISATEURS & WHITE LABEL (CDC §6.2, §11.2-11.3).
// Helpers partagés : appartenance, sièges, licence partagée, branding.
// ─────────────────────────────────────────────────────────────────────────────
import { prisma } from './db';
import type { Organization } from '@prisma/client';

export type OrgRole = 'owner' | 'member';

export type OrgBranding = {
  displayName: string;
  logoUrl: string | null;
  primaryColor: string | null;
};

/** Statuts de licence considérés « actifs » pour l'organisation (couverture). */
export const ORG_ACTIVE_LICENSE_STATUSES = ['active', 'provisoire', 'grace'];

const HEX_COLOR_RE = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
const HTTP_URL_RE = /^https?:\/\/\S+$/i;

/** Organisation + rôle de l'utilisateur (owner si ownerId === userId, sinon member). */
export async function getUserOrg(
  userId: string,
): Promise<{ org: Organization; role: OrgRole } | null> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { organization: true },
  });
  if (!user?.organization) return null;
  return {
    org: user.organization,
    role: user.organization.ownerId === userId ? 'owner' : 'member',
  };
}

/** Nombre de sièges occupés (membres rattachés à l'organisation). */
export async function orgSeatCount(orgId: string): Promise<number> {
  return prisma.user.count({ where: { organizationId: orgId } });
}

/**
 * Licences « actives » couvrant l'organisation : celles rattachées à l'org
 * (organizationId) + celles du propriétaire (tant que le rattachement des
 * licences à l'org n'est pas systématique côté checkout).
 */
async function activeOrgLicenses(orgId: string) {
  const org = await prisma.organization.findUnique({
    where: { id: orgId },
    select: { ownerId: true },
  });
  const now = new Date();
  const licenses = await prisma.license.findMany({
    where: {
      status: { in: ORG_ACTIVE_LICENSE_STATUSES },
      OR: [
        { organizationId: orgId },
        ...(org?.ownerId ? [{ userId: org.ownerId }] : []),
      ],
    },
    include: { plan: true },
  });
  // Filtre défensif : une licence « active » dont la date de fin est passée
  // (cron pas encore passé) ne compte pas.
  return licenses.filter((l) => {
    if (l.status === 'active' && l.endDate && l.endDate < now) return false;
    if (l.status === 'grace' && l.graceUntil && l.graceUntil < now) return false;
    if (l.status === 'provisoire' && l.provisionalUntil && l.provisionalUntil < now) return false;
    return true;
  });
}

/** Limite de sièges : max des Plan.maxUsers des licences actives de l'org (défaut 1). */
export async function orgSeatLimit(orgId: string): Promise<number> {
  const licenses = await activeOrgLicenses(orgId);
  if (licenses.length === 0) return 1;
  return Math.max(1, ...licenses.map((l) => l.plan.maxUsers));
}

/**
 * Licence partagée (CDC §11.2) : true si au moins une licence active couvre
 * l'organisation. Les membres sans licence personnelle sont couverts par
 * celle de l'org — les pages consomment ce helper en complément de license.ts.
 */
export async function orgHasActiveLicense(orgId: string): Promise<boolean> {
  const licenses = await activeOrgLicenses(orgId);
  return licenses.length > 0;
}

/**
 * White Label autorisé (CDC §6.2) : licence active de l'org sur un plan dont
 * featuresJson contient « white label » (insensible à la casse) OU code ENTREPRISE.
 */
export async function orgWhiteLabelAllowed(orgId: string): Promise<boolean> {
  const licenses = await activeOrgLicenses(orgId);
  return licenses.some((l) => {
    if (l.plan.code === 'ENTREPRISE') return true;
    return (l.plan.featuresJson ?? '').toLowerCase().includes('white label');
  });
}

/**
 * Parse + valide un brandingJson. Retourne null si absent ou invalide.
 * - displayName : requis, non vide (max 80 caractères)
 * - logoUrl : http(s) uniquement, sinon null
 * - primaryColor : hexadécimal (#RGB ou #RRGGBB), sinon null
 */
export function parseBranding(brandingJson: string | null | undefined): OrgBranding | null {
  if (!brandingJson) return null;
  let raw: unknown;
  try {
    raw = JSON.parse(brandingJson);
  } catch {
    return null;
  }
  if (!raw || typeof raw !== 'object') return null;
  const obj = raw as Record<string, unknown>;
  const displayName =
    typeof obj.displayName === 'string' ? obj.displayName.trim().slice(0, 80) : '';
  if (!displayName) return null;
  const logoUrl =
    typeof obj.logoUrl === 'string' && HTTP_URL_RE.test(obj.logoUrl.trim())
      ? obj.logoUrl.trim().slice(0, 500)
      : null;
  const primaryColor =
    typeof obj.primaryColor === 'string' && HEX_COLOR_RE.test(obj.primaryColor.trim())
      ? obj.primaryColor.trim()
      : null;
  return { displayName, logoUrl, primaryColor };
}

/**
 * Branding actif de l'organisation d'un utilisateur (ou null).
 * Utilisé notamment par le rendu de téléchargement des documents.
 */
export async function getOrgBranding(userId: string): Promise<OrgBranding | null> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { organization: { select: { brandingJson: true } } },
  });
  return parseBranding(user?.organization?.brandingJson);
}
