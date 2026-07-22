// Sitemap dynamique — routes publiques + fiches documents actives.
// Servi sur /sitemap.xml (runtime Node : Prisma autorisé ici, pas en Edge).
import type { MetadataRoute } from 'next';
import { prisma } from '@/lib/db';

const BASE = (process.env.APP_URL || 'http://localhost:3000').replace(/\/$/, '');

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/catalogue`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE}/tarifs`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/inscription`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/connexion`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
  ];

  // Fiches documents (/documents/[code]) pour chaque modèle actif.
  let templateEntries: MetadataRoute.Sitemap = [];
  try {
    const templates = await prisma.documentTemplate.findMany({
      where: { active: true },
      select: { code: true, updatedAt: true },
      orderBy: { popularity: 'desc' },
    });
    templateEntries = templates.map((t) => ({
      url: `${BASE}/documents/${t.code}`,
      lastModified: t.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
  } catch {
    // Base indisponible (build sans DB, etc.) : on sert au moins le statique.
  }

  return [...staticEntries, ...templateEntries];
}
