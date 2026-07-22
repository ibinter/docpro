// /developpeurs — documentation publique de l'API partenaires v1 (CDC §6.2)
// + section « Mes clés API » pour les utilisateurs connectés.
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/public/SiteFooter';
import ApiKeysManager, { type ApiKeyRow } from './ApiKeysManager';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'API Partenaires — IBIG DocPro',
  description:
    "Intégrez la génération de documents DocPro à vos systèmes : API REST documentée, clés d'accès, vérification d'authenticité.",
};

const PRE_STYLE: React.CSSProperties = {
  background: 'var(--dark)',
  color: '#E8EAF6',
  padding: '16px 18px',
  borderRadius: 8,
  overflowX: 'auto',
  fontFamily: 'ui-monospace, Consolas, "Courier New", monospace',
  fontSize: '0.84rem',
  lineHeight: 1.6,
  margin: '10px 0 0',
};

function Endpoint({
  method,
  path,
  children,
}: {
  method: 'GET' | 'POST';
  path: string;
  children: React.ReactNode;
}) {
  return (
    <div className="card mb-2">
      <div className="flex" style={{ flexWrap: 'wrap' }}>
        <span
          className={`badge ${method === 'GET' ? 'badge-info' : 'badge-success'}`}
          style={{ fontSize: '0.8rem' }}
        >
          {method}
        </span>
        <code style={{ fontFamily: 'ui-monospace, Consolas, monospace', fontWeight: 700, color: 'var(--navy)' }}>
          {path}
        </code>
      </div>
      {children}
    </div>
  );
}

export default async function DeveloppeursPage() {
  const user = await getSessionUser();
  const keys: ApiKeyRow[] = user
    ? (
        await prisma.apiKey.findMany({
          where: { userId: user.id },
          orderBy: { createdAt: 'desc' },
        })
      ).map((k) => ({
        id: k.id,
        label: k.label,
        prefix: k.prefix,
        active: k.active,
        callCount: k.callCount,
        lastUsedAt: k.lastUsedAt ? k.lastUsedAt.toISOString() : null,
        createdAt: k.createdAt.toISOString(),
      }))
    : [];

  return (
    <>
      <SiteHeader />
      <main className="container mt-3" style={{ minHeight: '60vh' }}>
        <h1>API Partenaires DocPro</h1>
        <p className="text-muted mb-3" style={{ maxWidth: 720 }}>
          Intégrez la génération intelligente de documents à vos propres systèmes (SIRH, ERP,
          portails RH…). API REST v1, réponses JSON, authentification par clé. L&apos;accès API est un
          canal <strong>facturé au contrat B2B</strong> — contactez notre équipe commerciale pour
          l&apos;activer en production.
        </p>

        {/* ── Authentification ── */}
        <section className="mb-3">
          <h2 style={{ fontSize: '1.3rem' }} className="mb-2">1. Authentification</h2>
          <div className="card">
            <p>
              Chaque requête doit porter votre clé API dans l&apos;en-tête{' '}
              <code>Authorization</code> :
            </p>
            <pre style={PRE_STYLE}>{`Authorization: Bearer dp_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`}</pre>
            <p className="text-small text-muted mt-1">
              Générez vos clés dans la section « Mes clés API » ci-dessous. La clé claire n&apos;est
              affichée qu&apos;une seule fois : seule son empreinte SHA-256 est conservée.
              Limite : <strong>60 appels / minute / clé</strong> (au-delà : HTTP 429).
            </p>
          </div>
        </section>

        {/* ── Endpoints ── */}
        <section className="mb-3">
          <h2 style={{ fontSize: '1.3rem' }} className="mb-2">2. Endpoints</h2>

          <Endpoint method="GET" path="/api/v1/templates">
            <p className="text-small text-muted mt-1">
              Liste des modèles de documents disponibles avec leur questionnaire (champs).
            </p>
            <pre style={PRE_STYLE}>{`curl https://docpro.example.com/api/v1/templates \\
  -H "Authorization: Bearer dp_live_xxx"

# 200 OK
{
  "templates": [
    {
      "code": "cv_pro",
      "name": "CV Professionnel",
      "category": "rh_emploi",
      "price": 500,
      "currency": "XOF",
      "fields": [
        { "key": "nom_complet", "label": "Nom complet", "type": "text", "required": true },
        ...
      ]
    }
  ]
}`}</pre>
          </Endpoint>

          <Endpoint method="POST" path="/api/v1/documents">
            <p className="text-small text-muted mt-1">
              Génère un document : rendu du modèle, score qualité, code de vérification. Le
              document est rattaché au compte propriétaire de la clé.
            </p>
            <pre style={PRE_STYLE}>{`curl -X POST https://docpro.example.com/api/v1/documents \\
  -H "Authorization: Bearer dp_live_xxx" \\
  -H "Content-Type: application/json" \\
  -d '{
    "template_code": "cv_pro",
    "language": "fr",
    "answers": {
      "nom_complet": "Aya Koné",
      "email": "aya.kone@example.com"
    }
  }'

# 201 Created
{
  "id": "cmb1x…",
  "verify_code": "cmb1y…",
  "quality_score": 86,
  "html": "<div>…document généré…</div>"
}`}</pre>
          </Endpoint>

          <Endpoint method="GET" path="/api/v1/documents/{id}">
            <p className="text-small text-muted mt-1">
              Métadonnées + HTML d&apos;un document généré. Accessible uniquement au propriétaire de
              la clé (sinon 404).
            </p>
            <pre style={PRE_STYLE}>{`curl https://docpro.example.com/api/v1/documents/cmb1x… \\
  -H "Authorization: Bearer dp_live_xxx"

# 200 OK
{
  "id": "cmb1x…",
  "template_code": "cv_pro",
  "title": "CV Professionnel",
  "language": "fr",
  "quality_score": 86,
  "verify_code": "cmb1y…",
  "status": "paye",
  "paid": true,
  "created_at": "2026-07-16T10:30:00.000Z",
  "html": "<div>…</div>"
}`}</pre>
          </Endpoint>

          <Endpoint method="GET" path="/api/v1/verify/{code}">
            <p className="text-small text-muted mt-1">
              Vérifie l&apos;authenticité d&apos;un document par son code de vérification (QR).
              Aucune donnée personnelle n&apos;est exposée.
            </p>
            <pre style={PRE_STYLE}>{`curl https://docpro.example.com/api/v1/verify/cmb1y… \\
  -H "Authorization: Bearer dp_live_xxx"

# 200 OK — document authentique
{ "authentic": true, "type": "CV Professionnel", "generated_at": "2026-07-16T10:30:00.000Z" }

# 200 OK — code inconnu
{ "authentic": false, "type": null, "generated_at": null }`}</pre>
          </Endpoint>
        </section>

        {/* ── Codes d'erreur ── */}
        <section className="mb-3">
          <h2 style={{ fontSize: '1.3rem' }} className="mb-2">3. Codes d&apos;erreur</h2>
          <div className="card">
            <p className="text-small text-muted mb-2">
              Toutes les erreurs suivent le même format JSON :
            </p>
            <pre style={{ ...PRE_STYLE, margin: '0 0 16px' }}>{`{ "error": { "code": "missing_fields", "message": "Champs obligatoires manquants : nom_complet." } }`}</pre>
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>HTTP</th>
                    <th>Code</th>
                    <th>Signification</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>401</td><td><code>missing_key</code></td><td>En-tête Authorization absent ou malformé</td></tr>
                  <tr><td>401</td><td><code>invalid_key</code></td><td>Clé inconnue ou révoquée</td></tr>
                  <tr><td>404</td><td><code>template_not_found</code></td><td>Code de modèle inexistant ou inactif</td></tr>
                  <tr><td>404</td><td><code>document_not_found</code></td><td>Document inexistant ou appartenant à un autre compte</td></tr>
                  <tr><td>422</td><td><code>validation_error</code></td><td>Corps de requête invalide (template_code, answers…)</td></tr>
                  <tr><td>422</td><td><code>missing_fields</code></td><td>Champs obligatoires du questionnaire manquants</td></tr>
                  <tr><td>429</td><td><code>rate_limited</code></td><td>Plus de 60 appels / minute sur la clé</td></tr>
                  <tr><td>500</td><td><code>internal_error</code></td><td>Erreur interne — réessayez plus tard</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── Mes clés API ── */}
        <section className="mb-3">
          <h2 style={{ fontSize: '1.3rem' }} className="mb-2">4. Mes clés API</h2>
          {user ? (
            <div className="card">
              <ApiKeysManager keys={keys} />
            </div>
          ) : (
            <div className="card text-center">
              <p className="text-muted mb-2">
                Connectez-vous pour générer et gérer vos clés API.
              </p>
              <Link href={`/connexion?next=${encodeURIComponent('/developpeurs')}`} className="btn btn-primary">
                Se connecter
              </Link>
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
