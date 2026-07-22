// Manifeste PWA de base — IBIG DocPro.
import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'IBIG DocPro',
    short_name: 'DocPro',
    description:
      'Génération intelligente de documents professionnels — CV, contrats, statuts, factures conformes aux lois de votre pays.',
    start_url: '/',
    display: 'standalone',
    lang: 'fr',
    background_color: '#F5F7FA',
    theme_color: '#0D2B4E',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/logo-icone.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
    ],
  };
}
