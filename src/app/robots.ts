// robots.txt — zones privées exclues de l'indexation, sitemap référencé.
// Source unique : ne pas recréer de public/robots.txt, un fichier statique
// masquerait cette route et figerait le domaine.
import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site-url';

const BASE = siteUrl();

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/compte/',
          '/api/',
          '/checkout/',
          '/paiement-manuel/',
          '/rejoindre/', // invitations d'organisation (jetons privés)
          '/verify/',    // vérification de document (codes uniques)
          '/essai/',
          '/_next/',
        ],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  };
}
