// /verify/[code] — Vérification publique d'authenticité (CDC §21 couche 2).
// Un tiers (employeur, banque, administration) scanne le QR code et obtient la
// confirmation officielle — sans exposer les données personnelles (initiales seulement).
import type { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';
import { prisma } from '@/lib/db';
import { formatMoney } from '@/lib/money';
import { dateJourFr, initialsOf } from '@/lib/docgen';

export const metadata: Metadata = {
  title: 'Vérification d’authenticité — IBIG DocPro',
  robots: { index: false },
};

function holderInitials(answersJson: string, userName?: string | null): string {
  try {
    const answers = JSON.parse(answersJson) as Record<string, string>;
    const name =
      answers.nom_complet || answers.salarie || answers.locataire || answers.mandant || userName || '';
    if (name) return initialsOf(String(name));
  } catch {
    /* réponses illisibles */
  }
  return userName ? initialsOf(userName) : '—';
}

export default async function VerifyPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;

  const doc = await prisma.generatedDocument.findUnique({
    where: { verifyCode: code },
    include: { template: true, user: true },
  });

  const invoice = doc
    ? null
    : await prisma.invoice.findUnique({ where: { verifyCode: code }, include: { user: true } });

  const authenticDoc = doc && doc.paid ? doc : null;
  const authenticInvoice = invoice && invoice.status === 'emise' ? invoice : null;
  const valid = Boolean(authenticDoc || authenticInvoice);

  // Certification blockchain (CDC §21 couche 3) — affichée sous le résultat.
  const cert = authenticDoc
    ? await prisma.blockchainCert.findUnique({ where: { documentId: authenticDoc.id } })
    : null;
  const blockchainCert = cert && cert.status !== 'echec' ? cert : null;

  return (
    <>
      <SiteHeader />
      <main className="container mt-4" style={{ maxWidth: 640, paddingBottom: 60 }}>
        <h1 className="text-center mb-3" style={{ fontSize: '1.5rem' }}>
          Vérification d’authenticité
        </h1>

        {authenticDoc && (
          <div className="card text-center">
            <div style={{ fontSize: '3rem' }}>✅</div>
            <h2 style={{ color: 'var(--success)', margin: '10px 0' }}>Document authentique</h2>
            <p className="text-muted mb-3">
              Ce document a bien été généré et payé sur la plateforme IBIG DocPro.
            </p>
            <table className="table" style={{ textAlign: 'left' }}>
              <tbody>
                <tr>
                  <td><strong>Type de document</strong></td>
                  <td>{authenticDoc.template.name}</td>
                </tr>
                <tr>
                  <td><strong>Date de génération</strong></td>
                  <td>{dateJourFr(authenticDoc.createdAt)}</td>
                </tr>
                <tr>
                  <td><strong>Titulaire</strong></td>
                  <td>{holderInitials(authenticDoc.answersJson, authenticDoc.user?.name)} <span className="text-small text-muted">(initiales — vie privée)</span></td>
                </tr>
                <tr>
                  <td><strong>Code de vérification</strong></td>
                  <td><code>{code}</code></td>
                </tr>
              </tbody>
            </table>
            <p className="text-small text-muted mt-2">
              Vérification effectuée le {dateJourFr()} sur docpro.ibigsoft.com/verify
            </p>
          </div>
        )}

        {authenticDoc && blockchainCert && (
          <div className="card mt-3">
            <div className="flex-between" style={{ flexWrap: 'wrap' }}>
              <h2 style={{ fontSize: '1.1rem', margin: 0 }}>🛡️ Certifié blockchain</h2>
              <span className={blockchainCert.status === 'ancre' ? 'badge badge-success' : 'badge badge-info'}>
                {blockchainCert.status === 'ancre' ? 'Ancré' : 'Simulation'}
              </span>
            </div>
            <table className="table mt-2" style={{ textAlign: 'left' }}>
              <tbody>
                <tr>
                  <td><strong>Réseau</strong></td>
                  <td>{blockchainCert.network === 'polygon' ? 'Polygon' : 'Simulation IBIG'}</td>
                </tr>
                <tr>
                  <td><strong>Empreinte SHA-256</strong></td>
                  <td><code>{blockchainCert.sha256.slice(0, 16)}…{blockchainCert.sha256.slice(-8)}</code></td>
                </tr>
                {blockchainCert.txHash && (
                  <tr>
                    <td><strong>Transaction</strong></td>
                    <td><code>{blockchainCert.txHash.slice(0, 18)}…</code></td>
                  </tr>
                )}
                <tr>
                  <td><strong>Date de certification</strong></td>
                  <td>{dateJourFr(blockchainCert.createdAt)}</td>
                </tr>
              </tbody>
            </table>
            <p className="text-small text-muted" style={{ marginTop: 8 }}>
              L’empreinte cryptographique de ce document est enregistrée de façon infalsifiable :
              toute modification du document invaliderait cette empreinte.
            </p>
          </div>
        )}

        {authenticInvoice && (
          <div className="card text-center">
            <div style={{ fontSize: '3rem' }}>✅</div>
            <h2 style={{ color: 'var(--success)', margin: '10px 0' }}>Facture authentique</h2>
            <p className="text-muted mb-3">
              Cette pièce comptable a bien été émise par la plateforme IBIG DocPro.
            </p>
            <table className="table" style={{ textAlign: 'left' }}>
              <tbody>
                <tr>
                  <td><strong>Référence</strong></td>
                  <td>{authenticInvoice.number}</td>
                </tr>
                <tr>
                  <td><strong>Type</strong></td>
                  <td>{authenticInvoice.type === 'recu' ? 'Reçu' : 'Facture'}</td>
                </tr>
                <tr>
                  <td><strong>Montant</strong></td>
                  <td>{formatMoney(authenticInvoice.total, authenticInvoice.currency)}</td>
                </tr>
                <tr>
                  <td><strong>Date d’émission</strong></td>
                  <td>{dateJourFr(authenticInvoice.createdAt)}</td>
                </tr>
                <tr>
                  <td><strong>Titulaire</strong></td>
                  <td>{initialsOf(authenticInvoice.user.name)} <span className="text-small text-muted">(initiales — vie privée)</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {!valid && (
          <div className="card text-center">
            <div style={{ fontSize: '3rem' }}>❌</div>
            <h2 style={{ color: 'var(--danger)', margin: '10px 0' }}>Code de vérification invalide</h2>
            <p className="text-muted">
              Aucun document authentique ne correspond à ce code. Le document présenté est soit une
              copie non autorisée, soit un aperçu non finalisé, soit un faux.
            </p>
            <div className="alert alert-security mt-3" style={{ textAlign: 'left' }}>
              🔐 Chaque document officiel IBIG DocPro possède un QR code unique et vérifiable. Un
              document copié ou falsifié ne pourra jamais être validé sur cette page.
            </div>
          </div>
        )}
      </main>
    </>
  );
}
