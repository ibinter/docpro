'use client';
// Barre latérale de la console — sections repliables, recherche instantanée,
// mémorisation de l'état (replié / sections ouvertes) et version mobile en tiroir.
import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Lien = { href: string; label: string; icon: string };
type Section = { title: string; icon: string; links: Lien[]; superadminOnly?: boolean };

const SECTIONS: Section[] = [
  {
    title: 'Pilotage',
    icon: '◈',
    links: [
      { href: '/admin', label: 'Tableau de bord', icon: '▤' },
      { href: '/admin/analytics', label: 'Analytics', icon: '◱' },
      { href: '/admin/qualite', label: 'Qualité IA', icon: '✧' },
    ],
  },
  {
    title: 'Paiements',
    icon: '◐',
    links: [
      { href: '/admin/validation', label: 'File de validation', icon: '⊙' },
      { href: '/admin/commandes', label: 'Commandes', icon: '▦' },
      { href: '/admin/transactions', label: 'Transactions', icon: '⇄' },
      { href: '/admin/alertes', label: 'Alertes anti-fraude', icon: '⚠' },
    ],
  },
  {
    title: 'Licences',
    icon: '◇',
    links: [
      { href: '/admin/licences', label: 'Licences', icon: '⬡' },
      { href: '/admin/utilisateurs', label: 'Utilisateurs', icon: '◉' },
      { href: '/admin/organisations', label: 'Organisations', icon: '⌂' },
    ],
  },
  {
    title: 'Croissance',
    icon: '◭',
    links: [
      { href: '/admin/crm', label: 'CRM Démonstrations', icon: '✦' },
      { href: '/admin/affiliation', label: 'Affiliation', icon: '⚯' },
      { href: '/admin/marketplace', label: 'Marketplace', icon: '⊞' },
    ],
  },
  {
    title: 'Configuration',
    icon: '⚙',
    superadminOnly: true,
    links: [
      { href: '/admin/config/forfaits', label: 'Forfaits', icon: '▣' },
      { href: '/admin/config/canaux', label: 'Moyens de paiement', icon: '◫' },
      { href: '/admin/config/devises', label: 'Devises', icon: '¤' },
      { href: '/admin/config/notifications', label: 'Notifications (modèles)', icon: '✉' },
      { href: '/admin/config/factures', label: 'Factures (paramètres)', icon: '▧' },
      { href: '/admin/config/taches', label: 'Tâches planifiées', icon: '⏱' },
    ],
  },
  {
    title: 'Système',
    icon: '◧',
    links: [
      { href: '/admin/audit', label: "Journal d'audit", icon: '≡' },
      { href: '/admin/notifications', label: 'Notifications', icon: '◔' },
      { href: '/admin/assistance', label: 'Assistance', icon: '☂' },
      { href: '/admin/exports', label: 'Exports', icon: '↧' },
    ],
  },
];

const LS_REPLIE = 'docpro_admin_nav_replie';
const LS_SECTIONS = 'docpro_admin_nav_fermees';

export default function AdminNav({ role }: { role: string }) {
  const pathname = usePathname();
  const [replie, setReplie] = useState(false);
  const [fermees, setFermees] = useState<string[]>([]);
  const [recherche, setRecherche] = useState('');
  const [tiroirOuvert, setTiroirOuvert] = useState(false);
  const [monte, setMonte] = useState(false);

  // Restauration de l'état après hydratation (évite tout écart serveur/client)
  useEffect(() => {
    try {
      setReplie(localStorage.getItem(LS_REPLIE) === '1');
      const f = localStorage.getItem(LS_SECTIONS);
      if (f) setFermees(JSON.parse(f) as string[]);
    } catch { /* stockage indisponible : état par défaut */ }
    setMonte(true);
  }, []);

  useEffect(() => { setTiroirOuvert(false); }, [pathname]);

  function basculerReplie() {
    const v = !replie;
    setReplie(v);
    try { localStorage.setItem(LS_REPLIE, v ? '1' : '0'); } catch {}
  }

  function basculerSection(titre: string) {
    const v = fermees.includes(titre) ? fermees.filter(t => t !== titre) : [...fermees, titre];
    setFermees(v);
    try { localStorage.setItem(LS_SECTIONS, JSON.stringify(v)); } catch {}
  }

  const estActif = (href: string) =>
    href === '/admin' ? pathname === '/admin' : pathname === href || pathname.startsWith(href + '/');

  const visibles = useMemo(() => {
    const base = SECTIONS.filter(s => !s.superadminOnly || role === 'superadmin');
    const q = recherche.trim().toLowerCase();
    if (!q) return base;
    return base
      .map(s => ({ ...s, links: s.links.filter(l => l.label.toLowerCase().includes(q)) }))
      .filter(s => s.links.length > 0);
  }, [role, recherche]);

  const enRecherche = recherche.trim().length > 0;

  return (
    <>
      {/* Bouton d'ouverture mobile */}
      <button
        type="button"
        className="adminnav-burger"
        onClick={() => setTiroirOuvert(true)}
        aria-label="Ouvrir le menu de la console"
      >
        ☰ Menu
      </button>

      {tiroirOuvert && <div className="adminnav-overlay" onClick={() => setTiroirOuvert(false)} />}

      <aside
        className={`adminnav${replie ? ' is-replie' : ''}${tiroirOuvert ? ' is-ouvert' : ''}`}
        aria-label="Navigation de la console"
      >
        {/* En-tête : recherche + repli */}
        <div className="adminnav-tete">
          {!replie && (
            <div className="adminnav-recherche">
              <span aria-hidden="true">⌕</span>
              <input
                type="search"
                value={recherche}
                onChange={e => setRecherche(e.target.value)}
                placeholder="Rechercher une page…"
                aria-label="Rechercher une page de la console"
              />
              {enRecherche && (
                <button type="button" onClick={() => setRecherche('')} aria-label="Effacer la recherche">×</button>
              )}
            </div>
          )}
          <button
            type="button"
            className="adminnav-toggle"
            onClick={basculerReplie}
            aria-label={replie ? 'Déplier le menu' : 'Replier le menu'}
            title={replie ? 'Déplier' : 'Replier'}
          >
            {replie ? '»' : '«'}
          </button>
        </div>

        <nav className="adminnav-corps">
          {visibles.map(section => {
            const ouverte = enRecherche || !fermees.includes(section.title);
            const contientActif = section.links.some(l => estActif(l.href));
            return (
              <div key={section.title} className="adminnav-section">
                {!replie && (
                  <button
                    type="button"
                    className={`adminnav-titre${contientActif ? ' a-actif' : ''}`}
                    onClick={() => !enRecherche && basculerSection(section.title)}
                    aria-expanded={ouverte}
                  >
                    <span className="adminnav-titre-txt">{section.title}</span>
                    <span className={`adminnav-chevron${ouverte ? ' est-ouvert' : ''}`} aria-hidden="true">▾</span>
                  </button>
                )}
                <div
                  className="adminnav-liens"
                  style={{
                    // Animation fluide : la hauteur suit le nombre de liens visibles
                    maxHeight: replie || ouverte ? `${section.links.length * 46 + 8}px` : '0px',
                    opacity: replie || ouverte ? 1 : 0,
                  }}
                >
                  {section.links.map(l => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className={`adminnav-lien${estActif(l.href) ? ' actif' : ''}`}
                      title={replie ? l.label : undefined}
                    >
                      <span className="adminnav-icone" aria-hidden="true">{l.icon}</span>
                      {!replie && <span className="adminnav-label">{l.label}</span>}
                      {replie && <span className="adminnav-bulle">{l.label}</span>}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}

          {monte && enRecherche && visibles.length === 0 && (
            <p className="adminnav-vide">Aucune page ne correspond à « {recherche} ».</p>
          )}
        </nav>

        {!replie && (
          <div className="adminnav-pied">
            <Link href="/" className="adminnav-retour">← Retour au site public</Link>
          </div>
        )}
      </aside>
    </>
  );
}
