'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MobileNavProps {
  isLoggedIn: boolean;
  isAdmin: boolean;
  cartCount: number;
  lang: string;
  labels: {
    catalogue: string;
    tarifs: string;
    connexion: string;
    inscription: string;
    monEspace: string;
    adminConsole: string;
  };
}

export default function MobileNav({ isLoggedIn, isAdmin, cartCount, lang, labels }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Fermer le menu à chaque changement de route
  useEffect(() => { setOpen(false); }, [pathname]);

  // Empêcher le scroll quand le menu est ouvert
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      {/* Bouton hamburger */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
        aria-expanded={open}
        style={{
          display: 'none', // visible via CSS @media
          background: 'transparent', border: 'none', cursor: 'pointer',
          color: '#fff', padding: '6px 8px', borderRadius: 6,
          flexDirection: 'column', gap: 5, alignItems: 'center', justifyContent: 'center',
        }}
        className="mobile-menu-btn"
      >
        <span style={{ display: 'block', width: 22, height: 2, background: '#fff', borderRadius: 2, transition: 'transform .2s, opacity .2s', transform: open ? 'rotate(45deg) translateY(7px)' : 'none' }} />
        <span style={{ display: 'block', width: 22, height: 2, background: '#fff', borderRadius: 2, opacity: open ? 0 : 1, transition: 'opacity .2s' }} />
        <span style={{ display: 'block', width: 22, height: 2, background: '#fff', borderRadius: 2, transition: 'transform .2s, opacity .2s', transform: open ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.5)', zIndex: 149 }}
        />
      )}

      {/* Panneau latéral */}
      <nav
        aria-label="Menu mobile"
        style={{
          position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 150,
          width: 280, background: '#0D2B4E',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform .28s cubic-bezier(.4,0,.2,1)',
          display: 'flex', flexDirection: 'column', padding: '0 0 24px',
          boxShadow: '-8px 0 32px rgba(0,0,0,.3)',
        }}
      >
        {/* En-tête panneau */}
        <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid rgba(255,255,255,.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#FFD700', fontWeight: 800, fontSize: '1.1rem' }}>IBIG <em style={{ fontStyle: 'normal' }}>DocPro</em></span>
          <button onClick={() => setOpen(false)} aria-label="Fermer" style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,.7)', cursor: 'pointer', fontSize: '1.4rem', lineHeight: 1 }}>✕</button>
        </div>

        {/* Liens */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '12px 0' }}>
          {[
            { href: '/catalogue', label: labels.catalogue },
            { href: '/tarifs', label: labels.tarifs },
            ...(isLoggedIn ? [
              { href: '/panier', label: `🛒 Panier${cartCount > 0 ? ` (${cartCount})` : ''}` },
              { href: '/compte', label: labels.monEspace },
              ...(isAdmin ? [{ href: '/admin', label: labels.adminConsole }] : []),
            ] : [
              { href: '/connexion', label: labels.connexion },
              { href: '/inscription', label: labels.inscription },
            ]),
            { href: '/aide', label: 'Centre d\'aide' },
            { href: '/demonstration', label: '📅 Démo gratuite' },
          ].map(link => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                display: 'block', color: '#fff', textDecoration: 'none',
                padding: '13px 24px', fontSize: '1rem', fontWeight: 500,
                borderBottom: '1px solid rgba(255,255,255,.06)',
                transition: 'background .15s',
              }}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Sélecteur langue */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,.1)', display: 'flex', gap: 16 }}>
          <a href="/api/i18n/set?l=fr" style={{ color: lang === 'fr' ? '#FFD700' : 'rgba(255,255,255,.5)', fontWeight: lang === 'fr' ? 800 : 400, textDecoration: 'none' }}>FR</a>
          <span style={{ color: 'rgba(255,255,255,.3)' }}>·</span>
          <a href="/api/i18n/set?l=en" style={{ color: lang === 'en' ? '#FFD700' : 'rgba(255,255,255,.5)', fontWeight: lang === 'en' ? 800 : 400, textDecoration: 'none' }}>EN</a>
        </div>
      </nav>
    </>
  );
}
