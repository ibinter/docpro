// Layout de l'espace client — protégé : redirige vers /connexion si non connecté.
import { redirect } from 'next/navigation';
import SiteHeader from '@/components/SiteHeader';
import { getSessionUser } from '@/lib/auth';
import SidebarNav from './ui/SidebarNav';

export const metadata = { title: 'Mon espace — IBIG DocPro' };

export default async function CompteLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser();
  if (!user) redirect('/connexion');
  return (
    <>
      <SiteHeader />
      <div className="shell">
        <aside className="sidebar">
          <div className="sidebar-title">Espace client</div>
          <SidebarNav />
        </aside>
        <main className="main-content">{children}</main>
      </div>
    </>
  );
}
