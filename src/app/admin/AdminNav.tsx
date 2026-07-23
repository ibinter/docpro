'use client';
// Barre latérale de la console — sections et lien actif.
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Section = { title: string; links: { href: string; label: string }[]; superadminOnly?: boolean };

const SECTIONS: Section[] = [
  {
    title: 'Pilotage',
    links: [
      { href: '/admin', label: 'Tableau de bord' },
      { href: '/admin/analytics', label: 'Analytics' },
    ],
  },
  {
    title: 'Paiements',
    links: [
      { href: '/admin/validation', label: 'File de validation' },
      { href: '/admin/commandes', label: 'Commandes' },
      { href: '/admin/transactions', label: 'Transactions' },
      { href: '/admin/alertes', label: 'Alertes anti-fraude' },
    ],
  },
  {
    title: 'Licences',
    links: [
      { href: '/admin/licences', label: 'Licences' },
      { href: '/admin/utilisateurs', label: 'Utilisateurs' },
      { href: '/admin/organisations', label: 'Organisations' },
    ],
  },
  {
    title: 'Croissance',
    links: [
      { href: '/admin/crm', label: 'CRM Démonstrations' },
      { href: '/admin/affiliation', label: 'Affiliation' },
      { href: '/admin/marketplace', label: 'Marketplace' },
    ],
  },
  {
    title: 'Configuration',
    superadminOnly: true,
    links: [
      { href: '/admin/config/forfaits', label: 'Forfaits' },
      { href: '/admin/config/canaux', label: 'Moyens de paiement' },
      { href: '/admin/config/devises', label: 'Devises' },
      { href: '/admin/config/notifications', label: 'Notifications (modèles)' },
      { href: '/admin/config/factures', label: 'Factures (paramètres)' },
      { href: '/admin/config/taches', label: 'Tâches planifiées' },
    ],
  },
  {
    title: 'Système',
    links: [
      { href: '/admin/audit', label: "Journal d'audit" },
      { href: '/admin/notifications', label: 'Notifications' },
      { href: '/admin/assistance', label: 'Assistance' },
      { href: '/admin/exports', label: 'Exports' },
    ],
  },
];

export default function AdminNav({ role }: { role: string }) {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === '/admin' ? pathname === '/admin' : pathname === href || pathname.startsWith(href + '/');

  return (
    <aside className="sidebar">
      {SECTIONS.filter((s) => !s.superadminOnly || role === 'superadmin').map((section) => (
        <div key={section.title}>
          <div className="sidebar-title">{section.title}</div>
          {section.links.map((l) => (
            <Link key={l.href} href={l.href} className={isActive(l.href) ? 'active' : ''}>
              {l.label}
            </Link>
          ))}
        </div>
      ))}
    </aside>
  );
}
