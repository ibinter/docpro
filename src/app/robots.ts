// robots.txt — zones privées exclues de l'indexation, sitemap référencé.
import type { MetadataRoute } from 'next';

const BASE = (process.env.APP_URL || 'http://localhost:3000').replace(/\/$/, '');

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/compte', '/api', '/checkout', '/paiement-manuel'],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  };
}
