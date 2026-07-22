import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'IBIG DocPro — Génération intelligente de documents',
  description:
    'Chaque document, chaque rêve, chaque ambition — générés en quelques secondes. CV, contrats, statuts, factures conformes aux lois de votre pays.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
