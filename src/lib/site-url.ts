// URL publique du site, utilisée par le sitemap et robots.txt.
//
// Garde-fou : en production, une APP_URL absente OU pointant vers localhost
// produirait un sitemap annonçant aux moteurs de recherche des adresses
// http://localhost:3000 — inexploitables. Dans ce cas on retombe sur le
// domaine public réel.
const DOMAINE_PUBLIC = 'https://docpro.ibigsoft.com';

export function siteUrl(): string {
  const brut = (process.env.APP_URL ?? '').trim().replace(/\/$/, '');
  const enProduction = process.env.NODE_ENV === 'production';
  const estLocal = /localhost|127\.0\.0\.1|0\.0\.0\.0/.test(brut);

  if (enProduction && (!brut || estLocal)) return DOMAINE_PUBLIC;
  return brut || 'http://localhost:3000';
}
