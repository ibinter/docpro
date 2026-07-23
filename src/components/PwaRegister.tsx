'use client';
import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PwaRegister() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [updateReady, setUpdateReady] = useState(false);

  useEffect(() => {
    // Enregistrement du Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .then((reg) => {
          // Détection mise à jour SW disponible
          reg.addEventListener('updatefound', () => {
            const newWorker = reg.installing;
            if (!newWorker) return;
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                setUpdateReady(true);
              }
            });
          });
        })
        .catch((e) => console.warn('[PWA] SW registration failed:', e));
    }

    // Capture de l'événement d'installation PWA
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
      // Afficher la bannière d'installation seulement si pas encore installé
      try {
        const dismissed = localStorage.getItem('docpro_pwa_dismissed');
        if (!dismissed) setShowBanner(true);
      } catch { setShowBanner(true); }
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  async function handleInstall() {
    if (!installPrompt) return;
    await installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'dismissed') {
      try { localStorage.setItem('docpro_pwa_dismissed', '1'); } catch {}
    }
    setShowBanner(false);
    setInstallPrompt(null);
  }

  function dismissInstall() {
    try { localStorage.setItem('docpro_pwa_dismissed', '1'); } catch {}
    setShowBanner(false);
  }

  function applyUpdate() {
    navigator.serviceWorker.controller?.postMessage({ type: 'SKIP_WAITING' });
    window.location.reload();
  }

  return (
    <>
      {/* Bannière d'installation */}
      {showBanner && installPrompt && (
        <div style={{
          position: 'fixed', bottom: 88, left: 16, right: 16, zIndex: 1050,
          background: '#0D2B4E', color: '#fff', borderRadius: 12,
          padding: '14px 16px', boxShadow: '0 8px 32px rgba(0,0,0,.35)',
          display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap',
          border: '1px solid rgba(255,215,0,.3)',
          maxWidth: 480, margin: '0 auto',
        }}>
          <div style={{ fontSize: '1.8rem', flexShrink: 0 }}>📱</div>
          <div style={{ flex: 1, minWidth: 180 }}>
            <div style={{ fontWeight: 700, fontSize: '.92rem', marginBottom: 2 }}>
              Installer IBIG DocPro
            </div>
            <div style={{ fontSize: '.78rem', opacity: .8, lineHeight: 1.5 }}>
              Accès rapide depuis votre écran d'accueil, fonctionne hors ligne.
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
            <button
              onClick={dismissInstall}
              style={{
                background: 'transparent', border: '1px solid rgba(255,255,255,.3)',
                color: '#fff', padding: '6px 12px', borderRadius: 6,
                cursor: 'pointer', fontSize: '.8rem',
              }}
            >
              Plus tard
            </button>
            <button
              onClick={handleInstall}
              style={{
                background: '#FFD700', border: 'none', color: '#0D2B4E',
                padding: '6px 16px', borderRadius: 6, cursor: 'pointer',
                fontSize: '.8rem', fontWeight: 700,
              }}
            >
              Installer
            </button>
          </div>
        </div>
      )}

      {/* Bannière mise à jour disponible */}
      {updateReady && (
        <div style={{
          position: 'fixed', top: 16, left: '50%', transform: 'translateX(-50%)',
          zIndex: 1060, background: '#1565C0', color: '#fff',
          borderRadius: 10, padding: '12px 20px',
          boxShadow: '0 4px 20px rgba(0,0,0,.3)',
          display: 'flex', alignItems: 'center', gap: 12,
          fontSize: '.88rem', whiteSpace: 'nowrap',
        }}>
          <span>🔄 Mise à jour disponible</span>
          <button
            onClick={applyUpdate}
            style={{
              background: '#fff', color: '#1565C0', border: 'none',
              padding: '5px 14px', borderRadius: 6, cursor: 'pointer',
              fontSize: '.82rem', fontWeight: 700,
            }}
          >
            Actualiser
          </button>
        </div>
      )}
    </>
  );
}
