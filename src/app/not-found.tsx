// Page 404 globale — IBIG DocPro (charte graphique officielle).
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page introuvable — IBIG DocPro',
};

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        background:
          'linear-gradient(135deg, var(--light) 0%, #E8EEF5 100%)',
      }}
    >
      <div className="card text-center" style={{ maxWidth: 520, width: '100%', padding: '48px 36px' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-icone.svg"
          alt="IBIG DocPro"
          width={72}
          height={72}
          style={{ margin: '0 auto 16px', display: 'block' }}
        />
        <div
          style={{
            fontSize: '4.5rem',
            fontWeight: 800,
            color: 'var(--navy)',
            lineHeight: 1,
            letterSpacing: '-2px',
          }}
        >
          404
        </div>
        <h1 style={{ fontSize: '1.35rem', marginTop: 12 }}>Cette page n&rsquo;existe pas</h1>
        <p className="text-muted mt-1">
          La page que vous cherchez a peut-être été déplacée, renommée ou n&rsquo;a jamais existé.
          Pas d&rsquo;inquiétude : vos documents, eux, sont bien là.
        </p>
        <div className="flex mt-3" style={{ justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" className="btn btn-primary">
            Retour à l&rsquo;accueil
          </Link>
          <Link href="/catalogue" className="btn btn-outline">
            Voir le catalogue
          </Link>
        </div>
        <p className="text-small text-muted mt-3">
          Besoin d&rsquo;aide ? Consultez nos <Link href="/tarifs">tarifs</Link> ou{' '}
          <Link href="/connexion">connectez-vous</Link> à votre espace.
        </p>
      </div>
    </div>
  );
}
