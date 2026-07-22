// ─────────────────────────────────────────────────────────────────────────────
// ALERTES ANTI-FRAUDE AUTOMATIQUES (CDC §19.3)
// POLITIQUE : les alertes sont NON BLOQUANTES — jamais de rejet automatique.
// Chaque alerte crée un FraudAlert + notification admin ; la transaction part
// en file de vérification manuelle et l'administrateur décide.
// ─────────────────────────────────────────────────────────────────────────────
import { prisma } from './db';
import { notifyAdmins } from './notify';
import { formatMoney } from './money';

const RECENT_ACCOUNT_THRESHOLD = 5000; // montant "important" pour un compte < 24h (unité mineure)

export type FraudCheckInput = {
  transactionId: string;
  orderId: string;
  userId: string;
  amountDeclared: number;
  currency?: string;
  externalRef?: string | null;
  fileHash?: string | null;
};

export type RaisedAlert = { type: string; severity: string; message: string };

async function raiseAlert(params: {
  transactionId: string;
  userId: string;
  type: string;
  severity: 'faible' | 'moyenne' | 'elevee';
  message: string;
}): Promise<RaisedAlert> {
  await prisma.fraudAlert.create({
    data: {
      transactionId: params.transactionId,
      userId: params.userId,
      type: params.type,
      severity: params.severity,
      message: params.message,
      status: 'ouverte',
    },
  });
  await notifyAdmins({
    event: 'alerte_fraude',
    title: `Alerte anti-fraude : ${params.type}`,
    body: `${params.message} (transaction ${params.transactionId})`,
  });
  return { type: params.type, severity: params.severity, message: params.message };
}

/**
 * Exécute les contrôles anti-fraude sur une transaction manuelle fraîchement déclarée.
 * NON bloquant : les erreurs internes sont avalées (loggées), la déclaration aboutit toujours.
 * Retourne la liste des alertes levées (pour information).
 */
export async function runFraudChecks(input: FraudCheckInput): Promise<RaisedAlert[]> {
  const alerts: RaisedAlert[] = [];
  try {
    const [order, user] = await Promise.all([
      prisma.order.findUnique({ where: { id: input.orderId } }),
      prisma.user.findUnique({ where: { id: input.userId } }),
    ]);
    if (!order || !user) return alerts;
    const currency = input.currency ?? order.currency;

    // 1) Même preuve (hash SHA-256) déjà soumise sur une autre transaction → preuve_dupliquee
    if (input.fileHash) {
      const dupProof = await prisma.paymentProof.findFirst({
        where: { fileHash: input.fileHash, transactionId: { not: input.transactionId } },
      });
      if (dupProof) {
        alerts.push(
          await raiseAlert({
            transactionId: input.transactionId,
            userId: input.userId,
            type: 'preuve_dupliquee',
            severity: 'elevee',
            message: `La même preuve de paiement (hash identique) a déjà été soumise sur la transaction ${dupProof.transactionId}.`,
          })
        );
      }
    }

    // 2) Référence externe déjà utilisée dans une autre transaction → reference_dupliquee
    if (input.externalRef && input.externalRef.trim()) {
      const dupRef = await prisma.transaction.findFirst({
        where: { externalRef: input.externalRef.trim(), id: { not: input.transactionId } },
      });
      if (dupRef) {
        alerts.push(
          await raiseAlert({
            transactionId: input.transactionId,
            userId: input.userId,
            type: 'reference_dupliquee',
            severity: 'elevee',
            message: `La référence de paiement « ${input.externalRef.trim()} » a déjà été utilisée dans la transaction ${dupRef.internalRef}.`,
          })
        );
      }
    }

    // 3) Montant déclaré ≠ total de la commande → montant_incoherent
    if (input.amountDeclared !== order.total) {
      alerts.push(
        await raiseAlert({
          transactionId: input.transactionId,
          userId: input.userId,
          type: 'montant_incoherent',
          severity: 'moyenne',
          message: `Montant déclaré ${formatMoney(input.amountDeclared, currency)} différent du montant attendu ${formatMoney(order.total, order.currency)} (commande ${order.number}).`,
        })
      );
    }

    // 4) Compte créé il y a moins de 24h + montant important → compte_recent
    const accountAgeMs = Date.now() - user.createdAt.getTime();
    if (accountAgeMs < 24 * 3600_000 && input.amountDeclared >= RECENT_ACCOUNT_THRESHOLD) {
      alerts.push(
        await raiseAlert({
          transactionId: input.transactionId,
          userId: input.userId,
          type: 'compte_recent',
          severity: 'moyenne',
          message: `Compte client créé il y a moins de 24h avec un paiement déclaré de ${formatMoney(input.amountDeclared, currency)}.`,
        })
      );
    }

    // 5) Plusieurs paiements déclarés sur la même commande → paiement_multiple
    const declaredCount = await prisma.transaction.count({
      where: { orderId: input.orderId, amountDeclared: { not: null } },
    });
    if (declaredCount > 1) {
      alerts.push(
        await raiseAlert({
          transactionId: input.transactionId,
          userId: input.userId,
          type: 'paiement_multiple',
          severity: 'moyenne',
          message: `${declaredCount} paiements déclarés sur la même commande ${order.number}.`,
        })
      );
    }
  } catch (err) {
    // Anti-fraude jamais bloquant : on journalise et on continue.
    console.error('[fraud] Échec des contrôles anti-fraude (non bloquant) :', err);
  }
  return alerts;
}
