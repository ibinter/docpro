import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import PwaRegister from '@/components/PwaRegister';

export const metadata: Metadata = {
  title: 'IBIG DocPro — Génération intelligente de documents',
  description:
    'Vos documents professionnels conformes OHADA en 30 secondes — CV, contrats, statuts, business plans. 12 700+ modèles · 15 pays africains · Mobile Money.',
  applicationName: 'IBIG DocPro',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'IBIG DocPro',
  },
  formatDetection: { telephone: false },
  openGraph: {
    type: 'website',
    siteName: 'IBIG DocPro',
    title: 'IBIG DocPro — Documents professionnels en 30 secondes',
    description: 'Contrats, CV, statuts, business plans conformes OHADA. 15 pays africains. Paiement Mobile Money.',
  },
};

export const viewport: Viewport = {
  themeColor: '#0D2B4E',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="apple-touch-icon" href="/logo-icone.svg" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="IBIG DocPro" />
        <meta name="msapplication-TileColor" content="#0D2B4E" />
        <meta name="msapplication-TileImage" content="/logo-icone.svg" />
      </head>
      <body>
        {children}
        <PwaRegister />
        {/* Script universel IBIG Soft — injecte le carrousel "Nos solutions" dans les slots data-ibig="solutions" */}
        <Script
          src="/assets/js/ibigsoft-universal.js"
          data-solution="docpro"
          data-accent="#4F46E5"
          data-render="solutions"
          data-masquer-courante="true"
          data-speed="40"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
