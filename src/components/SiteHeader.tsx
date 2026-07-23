// Header public partagé — utilisé par toutes les pages publiques.
// Bilingue FR/EN (CDC §1) : libellés via dictionnaire + sélecteur de langue.
import Link from 'next/link';
import Image from 'next/image';
import { getSessionUser } from '@/lib/auth';
import { getDict } from '@/lib/i18n';
import prisma from '@/lib/prisma';

export default async function SiteHeader() {
  const [user, { lang, t }] = await Promise.all([getSessionUser(), getDict()]);
  let cartCount = 0;
  if (user) {
    try {
      const cart = await prisma.cart.findFirst({
        where: { userId: user.id },
        include: { _count: { select: { items: true } } },
      });
      cartCount = cart?._count?.items ?? 0;
    } catch {
      /* ignore — badge non critique */
    }
  }
  return (
    <header className="site-header">
      <div className="container flex-between">
        <Link href="/" className="brand flex" style={{ gap: 10 }}>
          <Image src="/logo-icone.svg" alt="IBIG DocPro" width={34} height={34} />
          <span>IBIG <em>DocPro</em></span>
        </Link>
        <nav>
          <Link href="/catalogue">{t.nav.catalogue}</Link>
          <Link href="/tarifs">{t.nav.tarifs}</Link>
          {user ? (
            <>
              {(user.role === 'admin' || user.role === 'superadmin') && (
                <Link href="/admin">{t.nav.adminConsole}</Link>
              )}
              <Link href="/panier" title="Mon panier" style={{ fontWeight: 600, position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                🛒 Panier
                {cartCount > 0 && (
                  <span style={{
                    background: 'var(--danger, #e53e3e)',
                    color: '#fff',
                    borderRadius: '9999px',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    lineHeight: 1,
                    minWidth: 18,
                    height: 18,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 5px',
                  }}>
                    {cartCount}
                  </span>
                )}
              </Link>
              <Link href="/compte">{t.nav.monEspace}</Link>
            </>
          ) : (
            <>
              <Link href="/connexion">{t.nav.connexion}</Link>
              <Link href="/inscription" className="btn btn-gold btn-sm">{t.nav.inscription}</Link>
            </>
          )}
          {/* Sélecteur de langue FR/EN — pose le cookie docpro_lang puis revient ici. */}
          <span aria-label="Langue / Language" style={{ whiteSpace: 'nowrap', marginLeft: 8 }}>
            {/* Pas d'emoji drapeau : rendu inconsistant sous Windows/Chrome. */}
            <a
              href="/api/i18n/set?l=fr"
              title="Français"
              style={{ fontWeight: lang === 'fr' ? 800 : 400, opacity: lang === 'fr' ? 1 : 0.6 }}
            >
              FR
            </a>
            {' · '}
            <a
              href="/api/i18n/set?l=en"
              title="English"
              style={{ fontWeight: lang === 'en' ? 800 : 400, opacity: lang === 'en' ? 1 : 0.6 }}
            >
              EN
            </a>
          </span>
        </nav>
      </div>
    </header>
  );
}
