// Footer 6 colonnes â€” script universel IBIG Soft section 7.32
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';

const ANNEE = new Date().getFullYear();

export default function SiteFooter() {
  return (
    <>
    {/* Carrousel Â« Nos solutions Â» â€” le conteneur est ici pour que le script
        universel l'injecte JUSTE AU-DESSUS du footer. Sans ce conteneur, le
        script se replie sur la fin du <body> et la section passe sous le pied
        de page. */}
    <div data-ibig="solutions" />
    <Script
      src="/assets/js/ibigsoft-universal.js"
      data-solution="docpro"
      data-accent="#4F46E5"
      data-render="solutions"
      data-masquer-courante="true"
      data-speed="40"
      strategy="afterInteractive"
    />
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

          {/* â”€â”€ Colonne 1 : IdentitÃ© â”€â”€ */}
          <div>
            <Image src="/logo-dark.svg" alt="IBIG DocPro" width={150} height={40}
              style={{ marginBottom: 12 }} />
            <p style={{ margin: '0 0 12px', lineHeight: 1.7, fontSize: '.82rem', maxWidth: 220 }}>
              Vos documents professionnels conformes au droit africain, prÃªts en 30 secondes.
            </p>
            <p style={{ margin: 0, fontSize: '.8rem', opacity: .55 }}>
              Une solution <a href="https://ibigsoft.com" target="_blank" rel="noopener noreferrer"
                style={{ color: '#90CAF9' }}>IBIG Soft</a>
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 14, flexWrap: 'wrap' }}>
              {[
                { href: 'https://wa.me/2250555059901', label: 'WhatsApp', icon: 'ðŸ“²' },
                { href: 'mailto:docpro@ibigsoft.com', label: 'Email', icon: 'ðŸ“§' },
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

          {/* â”€â”€ Colonne 2 : Navigation â”€â”€ */}
          <div>
            <div style={{ color: '#fff', fontWeight: 700, marginBottom: 10, fontSize: '.88rem' }}>Navigation</div>
            {[
              { href: '/', label: 'Accueil' },
              { href: '/catalogue', label: 'Catalogue' },
              { href: '/tarifs', label: 'Tarifs' },
              { href: '/packs', label: 'Packs' },
              { href: '/demonstration', label: 'DÃ©monstration' },
              { href: '/compte/assistance', label: 'Assistance' },
              { href: '/inscription', label: 'CrÃ©er un compte' },
              { href: '/connexion', label: 'Connexion' },
            ].map(l => (
              <div key={l.href}>
                <Link href={l.href} style={{ color: 'rgba(255,255,255,.7)', textDecoration: 'none' }}>
                  {l.label}
                </Link>
              </div>
            ))}
          </div>

          {/* â”€â”€ Colonne 3 : Ressources â”€â”€ */}
          <div>
            <div style={{ color: '#fff', fontWeight: 700, marginBottom: 10, fontSize: '.88rem' }}>Ressources</div>
            {[
              { href: '/guide', label: 'Guide utilisateur' },
              { href: '/aide', label: "Centre d'aide" },
              { href: '/faq', label: 'FAQ' },
              { href: '/tutoriels', label: 'Tutoriels vidÃ©o' },
              { href: '/api', label: 'Documentation API' },
              { href: '/nouveautes', label: 'NouveautÃ©s' },
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

          {/* â”€â”€ Colonne 4 : IBIG Soft â”€â”€ */}
          <div>
            <div style={{ color: '#fff', fontWeight: 700, marginBottom: 10, fontSize: '.88rem' }}>IBIG Soft</div>
            {[
              { href: 'https://ibigsoft.com', label: 'Ã€ propos d\'IBIG Soft', ext: true },
              { href: 'https://ibigsoft.com/#logiciels', label: 'Autres logiciels', ext: true },
              { href: 'https://ibigpartners.com/', label: 'IBIG PARTNERS', ext: true },
              { href: 'https://ibigsoft.com/contact', label: 'Contact IBIG Soft', ext: true },
            ].map(l => (
              <div key={l.href}>
                <a href={l.href}
                  target="_blank" rel="noopener noreferrer"
                  style={{ color: 'rgba(255,255,255,.7)', textDecoration: 'none' }}>
                  {l.label} â†—
                </a>
              </div>
            ))}
          </div>

          {/* â”€â”€ Colonne 5 : Informations lÃ©gales â”€â”€ */}
          <div>
            <div style={{ color: '#fff', fontWeight: 700, marginBottom: 10, fontSize: '.88rem' }}>LÃ©gal</div>
            {[
              { href: '/mentions-legales', label: 'Mentions lÃ©gales' },
              { href: '/cgu', label: "Conditions gÃ©nÃ©rales d'utilisation" },
              { href: '/cgv', label: 'Conditions gÃ©nÃ©rales de vente' },
              { href: '/confidentialite', label: 'Politique de confidentialitÃ©' },
              { href: '/cookies', label: 'Politique de cookies' },
              { href: '/propriete-intellectuelle', label: 'PropriÃ©tÃ© intellectuelle' },
              { href: '/accessibilite', label: 'AccessibilitÃ©' },
              { href: '/charte-qualite', label: 'Charte qualitÃ©' },
              { href: '/rgpd', label: 'RGPD' },
            ].map(l => (
              <div key={l.href}>
                <Link href={l.href} style={{ color: 'rgba(255,255,255,.7)', textDecoration: 'none' }}>
                  {l.label}
                </Link>
              </div>
            ))}
          </div>

          {/* â”€â”€ Colonne 6 : Contacts â”€â”€ */}
          <div>
            <div style={{ color: '#fff', fontWeight: 700, marginBottom: 10, fontSize: '.88rem' }}>Contact</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div>
                ðŸŒ{' '}
                <a href="https://docpro.ibigsoft.com" target="_blank" rel="noopener noreferrer"
                  style={{ color: 'rgba(255,255,255,.7)', textDecoration: 'none' }}>
                  docpro.ibigsoft.com
                </a>
              </div>
              <div>
                ðŸ“§{' '}
                <a href="mailto:docpro@ibigsoft.com"
                  style={{ color: 'rgba(255,255,255,.7)', textDecoration: 'none' }}>
                  docpro@ibigsoft.com
                </a>
              </div>
              <div>
                ðŸ“ž{' '}
                <a href="tel:+22522276014"
                  style={{ color: 'rgba(255,255,255,.7)', textDecoration: 'none' }}>
                  +225 22 27 60 14
                </a>
              </div>
              <div>
                ðŸ“±{' '}
                <a href="tel:+2250555059901"
                  style={{ color: 'rgba(255,255,255,.7)', textDecoration: 'none' }}>
                  +225 05 55 05 99 01
                </a>
              </div>
              <div style={{ marginTop: 4, fontSize: '.8rem', opacity: .6 }}>
                Lun â€“ Ven Â· 8h â€“ 18h GMT
              </div>
              <div style={{ marginTop: 8 }}>
                <a href="https://wa.me/2250555059901?text=Bonjour%20IBIG%20DocPro%2C%20je%20souhaite%20des%20informations."
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    background: '#25D366', color: '#fff', padding: '6px 14px',
                    borderRadius: 6, textDecoration: 'none', fontWeight: 600, fontSize: '.82rem',
                  }}>
                  ðŸ“² WhatsApp
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* â”€â”€ SÃ©parateur + copyright â”€â”€ */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,.1)',
          paddingTop: 20, paddingBottom: 20,
          textAlign: 'center',
          fontSize: '.78rem', opacity: .55, lineHeight: 1.7,
        }}>
          Â© {ANNEE} IBIG DocPro. Tous droits rÃ©servÃ©s. Logiciel conÃ§u, Ã©ditÃ© et exploitÃ© par IBIG Soft,
          une marque de IBIG SARL â€“ Intermark Business International Group.
          <span style={{ display: 'block', marginTop: 6 }}>
            <Link href="/mentions-legales" style={{ color: 'inherit' }}>Mentions lÃ©gales</Link>
            {' Â· '}
            <Link href="/confidentialite" style={{ color: 'inherit' }}>ConfidentialitÃ©</Link>
            {' Â· '}
            <Link href="/cgu" style={{ color: 'inherit' }}>CGU</Link>
            {' Â· '}
            <Link href="/cookies" style={{ color: 'inherit' }}>Cookies</Link>
          </span>
        </div>
      </div>
    </footer>
    </>
  );
}
