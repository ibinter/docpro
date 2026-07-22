// Console SuperAdmin — garde serveur : admin ou superadmin uniquement.
import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';
import AdminNav from './AdminNav';

export const metadata: Metadata = {
  title: 'Console SuperAdmin — IBIG DocPro',
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser();
  if (!user || (user.role !== 'admin' && user.role !== 'superadmin')) {
    redirect('/connexion');
  }
  return (
    <>
      <header className="site-header">
        <div className="container flex-between">
          <Link href="/admin" className="brand">
            IBIG <em>DocPro</em> · Console
          </Link>
          <nav>
            <span className="text-small" style={{ opacity: 0.85 }}>
              {user.email} ({user.role})
            </span>
            <Link href="/">← Retour au site</Link>
          </nav>
        </div>
      </header>
      <div className="shell">
        <AdminNav role={user.role} />
        <main className="main-content">{children}</main>
      </div>
    </>
  );
}
