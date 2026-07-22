// Pied de page public partagé — coordonnées officielles IBIG SARL. Bilingue FR/EN.
import Link from 'next/link';
import Image from 'next/image';
import { getDict } from '@/lib/i18n';

export default async function SiteFooter() {
  const { t } = await getDict();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="flex-between" style={{ flexWrap: 'wrap', gap: 24, alignItems: 'flex-start' }}>
          <div>
            <Image src="/logo-dark.svg" alt="IBIG DocPro" width={160} height={44} />
            <p className="mt-1" style={{ maxWidth: 320 }}>{t.footer.slogan}</p>
          </div>
          <div>
            <strong style={{ color: 'var(--white)' }}>{t.footer.navigation}</strong>
            <p className="mt-1">
              <Link href="/catalogue">{t.footer.catalogue}</Link><br />
              <Link href="/tarifs">{t.footer.tarifs}</Link><br />
              <Link href="/packs">Packs</Link><br />
              <Link href="/inscription">{t.footer.inscription}</Link><br />
              <Link href="/connexion">{t.footer.connexion}</Link>
            </p>
          </div>
          <div>
            <strong style={{ color: 'var(--white)' }}>Écosystème</strong>
            <p className="mt-1">
              <Link href="/marketplace">Marketplace</Link><br />
              <Link href="/parrainage">Parrainage</Link><br />
              <Link href="/developpeurs">API développeurs</Link><br />
              <Link href="/essai">Essai gratuit</Link>
            </p>
          </div>
          <div>
            <strong style={{ color: 'var(--white)' }}>{t.footer.contact}</strong>
            <p className="mt-1">
              <a href="https://docpro.ibigsoft.com">docpro.ibigsoft.com</a><br />
              <a href="mailto:docpro@ibigsoft.com">docpro@ibigsoft.com</a><br />
              +225 22 27 60 14<br />
              +225 05 55 05 99 01
            </p>
          </div>
        </div>
        <div className="mt-3 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 18 }}>
          {t.footer.droits} ·{' '}
          <Link href="/cgu">{t.footer.cgu}</Link> ·{' '}
          <Link href="/confidentialite">{t.footer.confidentialite}</Link> ·{' '}
          <Link href="/mentions-legales">{t.footer.mentions}</Link>
        </div>
      </div>
    </footer>
  );
}
