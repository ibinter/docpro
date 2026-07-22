'use client';
// Navigation latérale de l'espace client — état actif selon la route.
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS: { href: string; label: string; exact?: boolean }[] = [
  { href: '/compte', label: 'Mon abonnement', exact: true },
  { href: '/tarifs', label: 'Forfaits & renouvellement' },
  { href: '/compte/paiements', label: 'Historique des paiements' },
  { href: '/compte/preuves', label: 'Mes preuves de paiement' },
  { href: '/compte/factures', label: 'Factures & reçus' },
  { href: '/documents/mes-documents', label: 'Mes documents' },
  { href: '/panier', label: '🛒 Mon panier' },
  { href: '/compte/notifications', label: 'Notifications' },
  { href: '/compte/assistance', label: 'Assistance' },
  { href: '/organisation', label: 'Mon organisation' },
  { href: '/parrainage', label: 'Parrainage' },
  { href: '/compte/securite', label: 'Sécurité (2FA)' },
  { href: '/compte/profil', label: 'Mon profil' },
];

export default function SidebarNav() {
  const pathname = usePathname();
  return (
    <nav>
      {LINKS.map((l) => {
        const active = l.exact ? pathname === l.href : pathname.startsWith(l.href) && l.href.startsWith('/compte');
        return (
          <Link key={l.href} href={l.href} className={active ? 'active' : undefined}>
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
