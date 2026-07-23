'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('docpro_cookie_consent');
      if (!consent) setVisible(true);
    } catch {}
  }, []);

  function accept() {
    try { localStorage.setItem('docpro_cookie_consent', 'all'); } catch {}
    setVisible(false);
  }
  function reject() {
    try { localStorage.setItem('docpro_cookie_consent', 'essential'); } catch {}
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9999,
      background: '#1a1a2e', color: '#fff', padding: '16px 24px',
      display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap',
      borderTop: '2px solid #1565C0', boxShadow: '0 -4px 20px rgba(0,0,0,.3)',
    }}>
      <div style={{ flex: 1, minWidth: 260, fontSize: '.88rem', lineHeight: 1.6 }}>
        🍪 Nous utilisons des cookies nécessaires au fonctionnement du service. Des cookies statistiques
        anonymes peuvent être activés pour améliorer votre expérience.{' '}
        <Link href="/confidentialite" style={{ color: '#90CAF9', textDecoration: 'underline' }}>
          Politique de confidentialité
        </Link>
      </div>
      <div style={{ display: 'flex', gap: 10, flexShrink: 0, flexWrap: 'wrap' }}>
        <button onClick={reject} style={{
          background: 'transparent', border: '1px solid rgba(255,255,255,.4)',
          color: '#fff', padding: '8px 18px', borderRadius: 6, cursor: 'pointer', fontSize: '.85rem',
        }}>
          Refuser les non essentiels
        </button>
        <button onClick={accept} style={{
          background: '#1565C0', border: 'none', color: '#fff',
          padding: '8px 20px', borderRadius: 6, cursor: 'pointer', fontSize: '.85rem', fontWeight: 600,
        }}>
          Tout accepter
        </button>
      </div>
    </div>
  );
}
