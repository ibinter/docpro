// Espace organisation (CDC §11.2-11.3) — protégé : redirige vers /connexion si non connecté.
import Link from 'next/link';
import { redirect } from 'next/navigation';
import SiteHeader from '@/components/SiteHeader';
import { getSessionUser } from '@/lib/auth';

export const metadata = { title: 'Mon organisation — IBIG DocPro' };

export default async function OrganisationLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser();
  if (!user) redirect('/connexion');
  return (
    <>
      <SiteHeader />
      <div className="shell">
        <aside className="sidebar">
          <div className="sidebar-title">Organisation</div>
          <Link href="/organisation">Tableau de bord</Link>
          <Link href="/organisation/marque">Marque blanche</Link>
          <div className="sidebar-title">Raccourcis</div>
          <Link href="/compte">← Mon espace</Link>
        </aside>
        <main className="main-content">{children}</main>
      </div>
    </>
  );
}
