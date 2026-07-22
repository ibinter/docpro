'use client';

// Page d'erreur globale — IBIG DocPro. Affichée quand un Server Component
// ou un rendu lève une exception non gérée. Message rassurant + réessai.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        background: 'linear-gradient(135deg, var(--light) 0%, #E8EEF5 100%)',
      }}
    >
      <div className="card text-center" style={{ maxWidth: 520, width: '100%', padding: '48px 36px' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-icone.svg"
          alt="IBIG DocPro"
          width={64}
          height={64}
          style={{ margin: '0 auto 16px', display: 'block' }}
        />
        <h1 style={{ fontSize: '1.35rem' }}>Une erreur inattendue est survenue</h1>
        <p className="text-muted mt-1">
          Rassurez-vous : vos données et vos documents sont en sécurité. Il s&rsquo;agit
          probablement d&rsquo;un incident temporaire. Vous pouvez réessayer tout de suite.
        </p>
        {error.digest && (
          <p className="text-small text-muted mt-1">
            Référence de l&rsquo;incident&nbsp;: <code>{error.digest}</code>
          </p>
        )}
        <div className="flex mt-3" style={{ justifyContent: 'center', flexWrap: 'wrap' }}>
          <button type="button" className="btn btn-primary" onClick={() => reset()}>
            Réessayer
          </button>
          <a href="/" className="btn btn-outline">
            Retour à l&rsquo;accueil
          </a>
        </div>
      </div>
    </div>
  );
}
