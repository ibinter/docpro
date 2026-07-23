// Aperçu du document généré — filigrane « APERÇU — NON PAYÉ » tant que non payé,
// score qualité, actions : Modifier / Payer / Régénérer / Télécharger.
import { notFound } from 'next/navigation';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import { prisma } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';
import { formatMoney } from '@/lib/money';
import { splitAnswersJson } from '@/lib/docgen';
import { aiAvailable } from '@/lib/ai/client';
import ApercuActions from './ApercuActions';
import AiActions from './AiActions';
import CertifyButton from './CertifyButton';

const LANGUAGE_LABELS: Record<string, string> = {
  fr: 'Français',
  en: 'Anglais',
  es: 'Espagnol',
  pt: 'Portugais',
  ar: 'Arabe',
};

function scoreBadgeClass(score: number): string {
  if (score >= 80) return 'badge badge-success';
  if (score >= 55) return 'badge badge-gold';
  return 'badge badge-warning';
}

const STATUS_LABELS: Record<string, { label: string; cls: string }> = {
  apercu: { label: 'Aperçu — non payé', cls: 'badge badge-warning' },
  paye: { label: 'Payé', cls: 'badge badge-success' },
  telecharge: { label: 'Téléchargé', cls: 'badge badge-info' },
};

export default async function ApercuPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const doc = await prisma.generatedDocument.findUnique({
    where: { id },
    include: { template: true },
  });
  if (!doc) notFound();

  const user = await getSessionUser();
  const isOwner = !doc.userId || doc.userId === user?.id;
  const isStaff = user && (user.role === 'admin' || user.role === 'superadmin');
  if (!isOwner && !isStaff) notFound();

  const score = doc.qualityScore ?? 0;
  const status = STATUS_LABELS[doc.status] ?? STATUS_LABELS.apercu;

  // Certification blockchain (CDC §21 couche 3) — option +500 FCFA après paiement.
  const blockchainCert = await prisma.blockchainCert.findUnique({
    where: { documentId: doc.id },
  });
  const isCertified = Boolean(blockchainCert && blockchainCert.status !== 'echec');

  // Versions liées (traductions) : les traductions portent _parentId dans answersJson.
  const { meta } = splitAnswersJson(doc.answersJson);
  const parentId = typeof meta._parentId === 'string' ? meta._parentId : null;
  const sourceId = parentId ?? doc.id;
  const translations = await prisma.generatedDocument.findMany({
    where: { answersJson: { contains: `"_parentId":"${sourceId}"` } },
    select: { id: true, title: true, language: true },
    orderBy: { createdAt: 'asc' },
  });
  const parent = parentId
    ? await prisma.generatedDocument.findUnique({
        where: { id: parentId },
        select: { id: true, title: true, language: true },
      })
    : null;
  const linkedVersions = [
    ...(parent ? [{ ...parent, original: true }] : []),
    ...translations.filter((t) => t.id !== doc.id).map((t) => ({ ...t, original: false })),
  ];

  function sanitize(html: string): string {
    return html
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/on\w+\s*=\s*(?:"[^"]*"|'[^']*')/gi, '')
      .replace(/javascript\s*:/gi, 'javascript-blocked:')
  }

  return (
    <>
      <SiteHeader />
      {/* Styles print élégants + filigrane d'aperçu (CDC §21) */}
      <style>{`
        .doc-preview { font-family: Georgia, 'Times New Roman', serif; line-height: 1.65; }
        .doc-preview h1 { color: var(--navy); text-align: center; font-size: 1.5rem; letter-spacing: 0.5px; margin-bottom: 24px; }
        .doc-preview h2 { color: var(--navy); font-size: 1.1rem; margin: 22px 0 8px; }
        .doc-preview h3 { color: var(--navy); font-size: 1rem; margin: 16px 0 6px; }
        .doc-preview p { margin: 10px 0; }
        .doc-preview .align-right { text-align: right; }
        .doc-preview .signatures { margin-top: 56px; display: block; text-align: center; letter-spacing: 1px; }
        .doc-preview .cv-title { text-align: center; color: var(--cobalt); font-weight: 700; }
        .doc-preview .cv-contact { text-align: center; color: var(--gray); font-size: 0.92rem; }
        .doc-preview .facture-parties { display: flex; justify-content: space-between; gap: 24px; margin: 18px 0; }
        .apercu-watermark {
          position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: 5;
        }
        .apercu-watermark span {
          position: absolute; white-space: nowrap; font-family: 'Segoe UI', Arial, sans-serif;
          font-weight: 800; font-size: 2rem; letter-spacing: 4px;
          color: rgba(198, 40, 40, 0.14); transform: rotate(-30deg); user-select: none;
        }
        ${!doc.paid ? '@media print { body { display: none !important; } }' : ''}
      `}</style>
      <main className="container mt-4" style={{ paddingBottom: 60 }}>
        <p className="text-small text-muted mb-1">
          <Link href="/catalogue">Catalogue</Link> ›{' '}
          <Link href={`/documents/${doc.template.code}`}>{doc.template.name}</Link> › Aperçu
        </p>
        <div className="flex-between mb-3" style={{ flexWrap: 'wrap' }}>
          <h1 style={{ fontSize: '1.5rem' }}>{doc.title}</h1>
          <div className="flex">
            <span className={status.cls}>{status.label}</span>
            <span className={scoreBadgeClass(score)} title="Score de qualité IA (complétude, richesse, validité)">
              Qualité : {score}/100
            </span>
          </div>
        </div>

        {!doc.paid && (
          <div className="alert alert-warning">
            Ceci est un <strong>aperçu filigrané</strong>. Payez{' '}
            <strong>{formatMoney(doc.price, doc.currency)}</strong> pour obtenir la version finale
            authentique : sans filigrane, imprimable, avec QR code de vérification et lien de
            téléchargement sécurisé 24 h.
          </div>
        )}

        <div className="doc-preview mb-3">
          {!doc.paid && (
            <div className="apercu-watermark" aria-hidden="true">
              {Array.from({ length: 12 }).map((_, i) => (
                <span key={i} style={{ top: `${i * 130 - 40}px`, left: i % 2 === 0 ? '-8%' : '18%' }}>
                  APERÇU — NON PAYÉ · IBIG DOCPRO
                </span>
              ))}
            </div>
          )}
          <div dangerouslySetInnerHTML={{ __html: sanitize(doc.contentHtml) }} />
        </div>

        <ApercuActions
          documentId={doc.id}
          templateCode={doc.template.code}
          paid={doc.paid}
          priceLabel={formatMoney(doc.price, doc.currency)}
          templateType={doc.template.templateType}
        />

        {doc.paid && (
          <div className="card mt-3">
            <p className="card-title">🛡️ Certification blockchain</p>
            {isCertified ? (
              <>
                <p className="text-muted text-small mb-2">
                  Ce document est certifié : son empreinte SHA-256 est enregistrée
                  {blockchainCert!.status === 'ancre' ? ' et ancrée sur le réseau Polygon' : ' (mode simulation)'}.
                </p>
                <Link href={`/documents/certificat/${doc.id}`} className="btn btn-outline">
                  📜 Voir le certificat d’authenticité
                </Link>
              </>
            ) : (
              <>
                <p className="text-muted text-small mb-2">
                  Renforcez la valeur probante de votre document : son empreinte cryptographique
                  SHA-256 est enregistrée de façon infalsifiable et vérifiable publiquement.
                </p>
                <CertifyButton documentId={doc.id} />
              </>
            )}
          </div>
        )}

        {linkedVersions.length > 0 && (
          <div className="card mt-3">
            <p className="card-title">🌍 Versions liées</p>
            <ul style={{ paddingLeft: 20, margin: 0 }}>
              {linkedVersions.map((v) => (
                <li key={v.id} style={{ marginBottom: 6 }}>
                  <Link href={`/documents/apercu/${v.id}`}>{v.title}</Link>{' '}
                  <span className="badge badge-neutral">
                    {LANGUAGE_LABELS[v.language] ?? v.language.toUpperCase()}
                  </span>{' '}
                  {v.original && <span className="badge badge-info">Original</span>}
                </li>
              ))}
            </ul>
          </div>
        )}

        <AiActions
          documentId={doc.id}
          aiEnabled={aiAvailable()}
          canEnhance={doc.status !== 'telecharge'}
          isTranslation={Boolean(parentId)}
          existingLanguages={translations.map((t) => t.language)}
        />
      </main>
    </>
  );
}
