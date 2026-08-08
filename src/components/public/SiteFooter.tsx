// Footer 6 colonnes — script universel IBIG Soft section 7.32
import Link from 'next/link';
import Image from 'next/image';

const ANNEE = new Date().getFullYear();

export default function SiteFooter() {
  return (
    <footer style={{
      background: '#0D2B4E', color: 'rgba(255,255,255,.7)',
      padding: '48px 0 0', fontSize: '.85rem', lineHeight: 1.9,
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '32px 24px',
          paddingBottom: 36,
        }}>

          {/* ── Colonne 1 : Identité ── */}
          <div>
            <Image src="/logo-dark.svg" alt="IBIG DocPro" width={150} height={40}
              style={{ marginBottom: 12 }} />
            <p style={{ margin: '0 0 12px', lineHeight: 1.7, fontSize: '.82rem', maxWidth: 220 }}>
              Vos documents professionnels conformes au droit africain, prêts en 30 secondes.
            </p>
            <p style={{ margin: 0, fontSize: '.8rem', opacity: .55 }}>
              Une solution <a href="https://ibigsoft.com" target="_blank" rel="noopener noreferrer"
                style={{ color: '#90CAF9' }}>IBIG Soft</a>
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 14, flexWrap: 'wrap' }}>
              {[
                { href: 'https://wa.me/2250555059901', label: 'WhatsApp', icon: '📲' },
                { href: 'mailto:docpro@ibigsoft.com', label: 'Email', icon: '📧' },
              ].map(s => (
                <a key={s.label} href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  title={s.label}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: 32, height: 32, borderRadius: 6,
                    background: 'rgba(255,255,255,.08)', fontSize: '1rem',
                    textDecoration: 'none',
                  }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── Colonne 2 : Navigation ── */}
          <div>
            <div style={{ color: '#fff', fontWeight: 700, marginBottom: 10, fontSize: '.88rem' }}>Navigation</div>
            {[
              { href: '/', label: 'Accueil' },
              { href: '/catalogue', label: 'Catalogue' },
              { href: '/tarifs', label: 'Tarifs' },
              { href: '/packs', label: 'Packs' },
              { href: '/demonstration', label: 'Démonstration' },
              { href: '/compte/assistance', label: 'Assistance' },
              { href: '/inscription', label: 'Créer un compte' },
              { href: '/connexion', label: 'Connexion' },
            ].map(l => (
              <div key={l.href}>
                <Link href={l.href} style={{ color: 'rgba(255,255,255,.7)', textDecoration: 'none' }}>
                  {l.label}
                </Link>
              </div>
            ))}
          </div>

          {/* ── Colonne 3 : Ressources ── */}
          <div>
            <div style={{ color: '#fff', fontWeight: 700, marginBottom: 10, fontSize: '.88rem' }}>Ressources</div>
            {[
              { href: '/guide', label: 'Guide utilisateur' },
              { href: '/aide', label: "Centre d'aide" },
              { href: '/faq', label: 'FAQ' },
              { href: '/tutoriels', label: 'Tutoriels vidéo' },
              { href: '/api', label: 'Documentation API' },
              { href: '/nouveautes', label: 'Nouveautés' },
              { href: '/statut', label: 'Statut des services' },
              { href: '/essai', label: 'Essai gratuit' },
            ].map(l => (
              <div key={l.href}>
                <Link href={l.href} style={{ color: 'rgba(255,255,255,.7)', textDecoration: 'none' }}>
                  {l.label}
                </Link>
              </div>
            ))}
          </div>

          {/* ── Colonne 4 : IBIG Soft ── */}
          <div>
            <div style={{ color: '#fff', fontWeight: 700, marginBottom: 10, fontSize: '.88rem' }}>IBIG Soft</div>
            {[
              { href: 'https://ibigsoft.com', label: 'À propos d\'IBIG Soft', ext: true },
              { href: 'https://ibigsoft.com/#logiciels', label: 'Autres logiciels', ext: true },
              { href: 'https://ibigpartners.com/', label: 'IBIG PARTNERS', ext: true },
              { href: 'https://ibigsoft.com/contact', label: 'Contact IBIG Soft', ext: true },
            ].map(l => (
              <div key={l.href}>
                <a href={l.href}
                  target="_blank" rel="noopener noreferrer"
                  style={{ color: 'rgba(255,255,255,.7)', textDecoration: 'none' }}>
                  {l.label} ↗
                </a>
              </div>
            ))}
          </div>

          {/* ── Colonne 5 : Informations légales ── */}
          <div>
            <div style={{ color: '#fff', fontWeight: 700, marginBottom: 10, fontSize: '.88rem' }}>Légal</div>
            {[
              { href: '/mentions-legales', label: 'Mentions légales' },
              { href: '/cgu', label: "Conditions générales d'utilisation" },
              { href: '/cgv', label: 'Conditions générales de vente' },
              { href: '/confidentialite', label: 'Politique de confidentialité' },
              { href: '/cookies', label: 'Politique de cookies' },
              { href: '/propriete-intellectuelle', label: 'Propriété intellectuelle' },
              { href: '/accessibilite', label: 'Accessibilité' },
              { href: '/charte-qualite', label: 'Charte qualité' },
              { href: '/rgpd', label: 'RGPD' },
            ].map(l => (
              <div key={l.href}>
                <Link href={l.href} style={{ color: 'rgba(255,255,255,.7)', textDecoration: 'none' }}>
                  {l.label}
                </Link>
              </div>
            ))}
          </div>

          {/* ── Colonne 6 : Contacts ── */}
          <div>
            <div style={{ color: '#fff', fontWeight: 700, marginBottom: 10, fontSize: '.88rem' }}>Contact</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div>
                🌐{' '}
                <a href="https://docpro.ibigsoft.com" target="_blank" rel="noopener noreferrer"
                  style={{ color: 'rgba(255,255,255,.7)', textDecoration: 'none' }}>
                  docpro.ibigsoft.com
                </a>
              </div>
              <div>
                📧{' '}
                <a href="mailto:docpro@ibigsoft.com"
                  style={{ color: 'rgba(255,255,255,.7)', textDecoration: 'none' }}>
                  docpro@ibigsoft.com
                </a>
              </div>
              <div>
                📞{' '}
                <a href="tel:+22522276014"
                  style={{ color: 'rgba(255,255,255,.7)', textDecoration: 'none' }}>
                  +225 22 27 60 14
                </a>
              </div>
              <div>
                📱{' '}
                <a href="tel:+2250555059901"
                  style={{ color: 'rgba(255,255,255,.7)', textDecoration: 'none' }}>
                  +225 05 55 05 99 01
                </a>
              </div>
              <div style={{ marginTop: 4, fontSize: '.8rem', opacity: .6 }}>
                Lun – Ven · 8h – 18h GMT
              </div>
              <div style={{ marginTop: 8 }}>
                <a href="https://wa.me/2250555059901?text=Bonjour%20IBIG%20DocPro%2C%20je%20souhaite%20des%20informations."
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    background: '#25D366', color: '#fff', padding: '6px 14px',
                    borderRadius: 6, textDecoration: 'none', fontWeight: 600, fontSize: '.82rem',
                  }}>
                  📲 WhatsApp
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* ── Séparateur + copyright ── */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,.1)',
          paddingTop: 20, paddingBottom: 20,
          textAlign: 'center',
          fontSize: '.78rem', opacity: .55, lineHeight: 1.7,
        }}>
          © {ANNEE} IBIG DocPro. Tous droits réservés. Logiciel conçu, édité et exploité par IBIG Soft,
          une marque de IBIG SARL – Intermark Business International Group.
          <span style={{ display: 'block', marginTop: 6 }}>
            <Link href="/mentions-legales" style={{ color: 'inherit' }}>Mentions légales</Link>
            {' · '}
            <Link href="/confidentialite" style={{ color: 'inherit' }}>Confidentialité</Link>
            {' · '}
            <Link href="/cgu" style={{ color: 'inherit' }}>CGU</Link>
            {' · '}
            <Link href="/cookies" style={{ color: 'inherit' }}>Cookies</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
