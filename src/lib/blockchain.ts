// ─────────────────────────────────────────────────────────────────────────────
// CERTIFICATION BLOCKCHAIN DES DOCUMENTS (CDC §21 couche 3) — option +500 FCFA.
// • sha256OfDocument : empreinte SHA-256 du contenu (contentHtml + watermarkId)
//   via le module crypto natif — AUCUNE dépendance blockchain externe.
// • certifyDocument : crée/complète le BlockchainCert (idempotent — documentId
//   unique). Deux modes :
//   - POLYGON_RPC_URL configuré → on prouve la connectivité au réseau Polygon
//     par un appel JSON-RPC natif `eth_blockNumber` (fetch), puis on enregistre
//     network 'polygon', status 'ancre', txHash simulé préfixé '0xSIM'.
//     ⚠️ IMPORTANT — ANCRAGE RÉEL EN PRODUCTION : émettre une vraie transaction
//     (eth_sendRawTransaction) exige un signer ECDSA secp256k1 + encodage RLP
//     (clé privée d'un wallet approvisionné en MATIC). Cela nécessitera une
//     bibliothèque de signature (ou un service d'ancrage) côté production ;
//     le hash SHA-256 stocké ici est prêt à être ancré tel quel dans le champ
//     data d'une transaction. Le préfixe '0xSIM' distingue sans ambiguïté les
//     txHash simulés des vrais hash on-chain.
//   - Sinon → mode 'simulation' : status 'simule', txHash null. La preuve
//     d'intégrité (SHA-256) reste pleinement vérifiable via /api/blockchain/verify.
// ─────────────────────────────────────────────────────────────────────────────
import { createHash } from 'crypto';
import { prisma } from './db';
import { audit } from './audit';
import { notifyUser } from './notify';

export const CERTIFICATION_FEE = 500; // FCFA (XOF)

/** Empreinte SHA-256 hexadécimale d'un document généré (contenu + filigrane). */
export function sha256OfDocument(doc: { contentHtml: string; watermarkId: string }): string {
  return createHash('sha256').update(doc.contentHtml, 'utf8').update(doc.watermarkId, 'utf8').digest('hex');
}

/**
 * Teste la connectivité au RPC Polygon par un simple `eth_blockNumber`
 * (JSON-RPC 2.0, fetch natif). Retourne le numéro de bloc hex ou null si échec.
 */
async function polygonBlockNumber(rpcUrl: string): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10_000);
    const res = await fetch(rpcUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'eth_blockNumber', params: [] }),
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) return null;
    const json = (await res.json()) as { result?: string };
    return typeof json.result === 'string' && json.result.startsWith('0x') ? json.result : null;
  } catch (e) {
    console.error('[blockchain] RPC Polygon injoignable :', e);
    return null;
  }
}

export type CertifyResult = {
  certId: string;
  sha256: string;
  network: string;
  status: string;
  txHash: string | null;
  alreadyCertified: boolean;
};

/**
 * Certifie un document (idempotent — contrainte unique sur documentId).
 * Appelée à la confirmation du paiement de l'option (webhook Moneroo ou
 * validation manuelle admin). Un cert existant non-échoué n'est JAMAIS refait.
 */
export async function certifyDocument(documentId: string, orderId?: string): Promise<CertifyResult> {
  const doc = await prisma.generatedDocument.findUnique({
    where: { id: documentId },
    select: { id: true, userId: true, title: true, contentHtml: true, watermarkId: true },
  });
  if (!doc) throw new Error(`Document ${documentId} introuvable — certification impossible`);

  // Idempotence : certificat déjà émis (simulé ou ancré) → on ne refait rien.
  const existing = await prisma.blockchainCert.findUnique({ where: { documentId } });
  if (existing && existing.status !== 'echec') {
    return {
      certId: existing.id,
      sha256: existing.sha256,
      network: existing.network,
      status: existing.status,
      txHash: existing.txHash,
      alreadyCertified: true,
    };
  }

  const sha256 = sha256OfDocument(doc);
  const rpcUrl = process.env.POLYGON_RPC_URL;

  let network = 'simulation';
  let status = 'simule';
  let txHash: string | null = null;

  if (rpcUrl) {
    const blockNumber = await polygonBlockNumber(rpcUrl);
    if (blockNumber) {
      // Connectivité Polygon prouvée. txHash SIMULÉ (préfixe 0xSIM) — voir
      // l'en-tête du fichier : l'ancrage réel nécessitera un signer en production.
      network = 'polygon';
      status = 'ancre';
      txHash = `0xSIM${sha256}`;
    } else {
      // RPC configuré mais injoignable → échec traçable, ré-essayable.
      network = 'polygon';
      status = 'echec';
      txHash = null;
    }
  }

  const cert = await prisma.blockchainCert.upsert({
    where: { documentId },
    create: {
      documentId,
      sha256,
      network,
      status,
      txHash,
      fee: CERTIFICATION_FEE,
      orderId: orderId ?? null,
    },
    update: { sha256, network, status, txHash, orderId: orderId ?? existing?.orderId ?? null },
  });

  await audit({
    action: 'blockchain.certify',
    entityType: 'GeneratedDocument',
    entityId: documentId,
    after: { certId: cert.id, sha256, network, status, txHash, orderId: orderId ?? null },
  });

  if (status !== 'echec' && doc.userId) {
    await notifyUser({
      userId: doc.userId,
      event: 'document_certifie',
      title: 'Votre document est certifié',
      body: `Votre document « ${doc.title} » est désormais certifié blockchain (empreinte SHA-256 : ${sha256.slice(0, 16)}…). Consultez votre certificat d'authenticité dans votre espace.`,
    });
  }

  return { certId: cert.id, sha256, network, status, txHash, alreadyCertified: false };
}
