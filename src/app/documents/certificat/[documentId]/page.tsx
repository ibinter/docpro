// /documents/certificat/[documentId] — Certificat d'authenticité blockchain
// (CDC §21 couche 3). Accessible au propriétaire du document ou aux admins.
// Certificat élégant imprimable : logo IBIG, empreinte SHA-256 complète, réseau,
// txHash, date, QR code vers /verify/[verifyCode], mention légale.
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import QRCode from 'qrcode';
import { prisma } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';
import { appUrl, dateJourFr } from '@/lib/docgen';
import PrintButton from './PrintButton';

export const metadata: Metadata = {
  title: 'Certificat d’authenticité blockchain — IBIG DocPro',
  robots: { index: false },
};

const NETWORK_LABELS: Record<string, string> = {
  polygon: 'Polygon (ancrage)',
  simulation: 'Simulation IBIG (hors chaîne)',
};

const STATUS_LABELS: Record<string, { label: string; cls: string }> = {
  ancre: { label: 'Ancré sur Polygon', cls: 'badge badge-success' },
  simule: { label: 'Certifié (mode simulation)', cls: 'badge badge-info' },
  echec: { label: 'Ancrage en échec', cls: 'badge badge-warning' },
};

export default async function CertificatPage({
  params,
}: {
  params: Promise<{ documentId: string }>;
}) {
  const { documentId } = await params;

  const user = await getSessionUser();
  if (!user) notFound();

  const doc = await prisma.generatedDocument.findUnique({
    where: { id: documentId },
    include: { template: true },
  });
  if (!doc) notFound();

  const isOwner = !doc.userId || doc.userId === user.id;
  const isStaff = user.role === 'admin' || user.role === 'superadmin';
  if (!isOwner && !isStaff) notFound();

  const cert = await prisma.blockchainCert.findUnique({ where: { documentId } });
  if (!cert || cert.status === 'echec') notFound();

  const verifyUrl = `${appUrl()}/verify/${doc.verifyCode}`;
  const qrDataUrl = await QRCode.toDataURL(verifyUrl, {
    margin: 1,
    width: 200,
    errorCorrectionLevel: 'M',
    color: { dark: '#0D2B4E' },
  });

  const status = STATUS_LABELS[cert.status] ?? STATUS_LABELS.simule;

  return (
    <>
      <style>{`
        .cert-page { max-width: 820px; margin: 30px auto; padding: 0 16px 60px; }
        .cert-sheet {
          background: #fff; border: 3px double var(--gold);
          border-radius: 10px; padding: 44px 48px; position: relative;
          box-shadow: 0 8px 30px rgba(13, 43, 78, 0.12);
        }
        .cert-brand { text-align: center; font-size: 1.5rem; font-weight: 800; color: var(--navy); letter-spacing: 1px; }
        .cert-brand em { color: var(--gold); font-style: normal; }
        .cert-title { text-align: center; color: var(--navy); font-size: 1.45rem; margin: 14px 0 4px; letter-spacing: 0.5px; }
        .cert-subtitle { text-align: center; color: var(--gray); font-size: 0.92rem; margin-bottom: 26px; }
        .cert-table { width: 100%; border-collapse: collapse; margin: 18px 0; }
        .cert-table td { padding: 9px 10px; border-bottom: 1px solid #ECEFF1; vertical-align: top; font-size: 0.95rem; }
        .cert-table td:first-child { font-weight: 700; color: var(--navy); white-space: nowrap; width: 200px; }
        .cert-hash { font-family: 'Courier New', monospace; font-size: 0.8rem; word-break: break-all; color: var(--navy); }
        .cert-qr { text-align: center; margin: 22px 0 8px; }
        .cert-qr img { width: 150px; height: 150px; }
        .cert-legal {
          margin-top: 22px; padding-top: 14px; border-top: 1px solid #ECEFF1;
          font-size: 0.78rem; color: var(--gray); line-height: 1.55; text-align: justify;
        }
        .cert-actions { text-align: center; margin-top: 22px; }
        @media print {
          .cert-actions, .cert-back { display: none !important; }
          .cert-page { margin: 0; max-width: none; padding: 0; }
          .cert-sheet { box-shadow: none; border-radius: 0; }
          body { background: #fff; }
        }
      `}</style>
      <main className="cert-page">
        <p className="text-small text-muted mb-2 cert-back">
          <Link href={`/documents/apercu/${doc.id}`}>← Retour à l’aperçu du document</Link>
        </p>
        <div className="cert-sheet">
          <div className="cert-brand">IBIG <em>DocPro</em></div>
          <h1 className="cert-title">Certificat d’authenticité blockchain</h1>
          <p className="cert-subtitle">
            Preuve d’intégrité cryptographique — CDC §21, couche 3
          </p>

          <div style={{ textAlign: 'center', marginBottom: 8 }}>
            <span className={status.cls}>{status.label}</span>
          </div>

          <table className="cert-table">
            <tbody>
              <tr>
                <td>Document</td>
                <td>{doc.title}</td>
              </tr>
              <tr>
                <td>Type de document</td>
                <td>{doc.template.name}</td>
              </tr>
              <tr>
                <td>Empreinte SHA-256</td>
                <td><span className="cert-hash">{cert.sha256}</span></td>
              </tr>
              <tr>
                <td>Réseau</td>
                <td>{NETWORK_LABELS[cert.network] ?? cert.network}</td>
              </tr>
              {cert.txHash && (
                <tr>
                  <td>Transaction (txHash)</td>
                  <td>
                    <span className="cert-hash">{cert.txHash}</span>
                    {cert.txHash.startsWith('0xSIM') && (
                      <span className="text-small text-muted"> (transaction simulée — ancrage définitif en production)</span>
                    )}
                  </td>
                </tr>
              )}
              <tr>
                <td>Date de certification</td>
                <td>{dateJourFr(cert.createdAt)}</td>
              </tr>
              <tr>
                <td>Code de vérification</td>
                <td><code>{doc.verifyCode}</code></td>
              </tr>
            </tbody>
          </table>

          <div className="cert-qr">
            {/* QR généré côté serveur (data URI) — vérification publique */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={qrDataUrl} alt={`QR code de vérification : ${verifyUrl}`} />
            <div className="text-small text-muted" style={{ marginTop: 6 }}>
              Scannez pour vérifier l’authenticité : {verifyUrl}
            </div>
          </div>

          <p className="cert-legal">
            Mention légale : ce certificat atteste que l’empreinte cryptographique SHA-256 ci-dessus a
            été calculée à partir du contenu exact du document au moment de sa certification sur la
            plateforme IBIG DocPro. Toute modification ultérieure du document, même minime, produirait
            une empreinte différente et invaliderait la correspondance. La vérification publique est
            disponible à tout moment via le QR code ci-dessus ou l’API
            /api/blockchain/verify/&lt;empreinte&gt;. Ce certificat ne constitue pas un acte notarié et ne
            se substitue pas aux formalités d’enregistrement légal éventuellement requises dans votre
            juridiction.
          </p>
        </div>

        <div className="cert-actions">
          <PrintButton />
        </div>
      </main>
    </>
  );
}
