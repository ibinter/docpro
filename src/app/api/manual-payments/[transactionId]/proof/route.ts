// POST /api/manual-payments/[transactionId]/proof — Ajout d'une preuve complémentaire.
// Autorisé UNIQUEMENT si un complément a été demandé par l'administrateur
// (transaction 'complement_demande' / preuve 'complement_demande') — CDC §14.1.
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireUser } from '@/lib/auth';
import { audit } from '@/lib/audit';
import { notifyUser, notifyAdmins } from '@/lib/notify';
import { validateAndStoreProof } from '@/lib/proofs';
import { runFraudChecks } from '@/lib/fraud';
import { errorResponse, badRequest } from '../../_utils';

export async function POST(req: NextRequest, ctx: { params: Promise<{ transactionId: string }> }) {
  try {
    const user = await requireUser();
    const { transactionId } = await ctx.params;

    const transaction = await prisma.transaction.findUnique({
      where: { id: transactionId },
      include: { order: true, proofs: true },
    });
    if (!transaction || transaction.userId !== user.id) {
      return NextResponse.json({ error: 'Transaction introuvable.' }, { status: 404 });
    }

    const complementRequested =
      transaction.status === 'complement_demande' ||
      transaction.proofs.some((p) => p.status === 'complement_demande');
    if (!complementRequested) {
      return badRequest("Ajout de preuve impossible : aucun complément n'a été demandé par notre équipe.");
    }

    const form = await req.formData();
    const proofEntry = form.get('proof');
    const proofFile = proofEntry instanceof File && proofEntry.size > 0 ? proofEntry : null;
    if (!proofFile) return badRequest('Aucun fichier fourni.');

    const stored = await validateAndStoreProof(proofFile);

    await prisma.$transaction(async (tx) => {
      await tx.paymentProof.create({
        data: {
          transactionId: transaction.id,
          userId: user.id,
          filePath: stored.filePath,
          mimeType: stored.mimeType,
          sizeBytes: stored.sizeBytes,
          originalName: stored.originalName,
          storedName: stored.storedName,
          fileHash: stored.fileHash,
          status: 'soumise',
        },
      });
      // Retour en file de vérification manuelle
      await tx.transaction.update({ where: { id: transaction.id }, data: { status: 'a_verifier' } });
      await tx.order.update({ where: { id: transaction.orderId }, data: { status: 'preuve_soumise' } });
    });

    await audit({
      actorId: user.id,
      action: 'proof.add_complement',
      entityType: 'Transaction',
      entityId: transaction.id,
      after: { storedName: stored.storedName, fileHash: stored.fileHash },
    });

    await runFraudChecks({
      transactionId: transaction.id,
      orderId: transaction.orderId,
      userId: user.id,
      amountDeclared: transaction.amountDeclared ?? transaction.amountExpected,
      currency: transaction.currency,
      externalRef: null, // référence déjà contrôlée à la déclaration initiale
      fileHash: stored.fileHash,
    });

    await notifyUser({
      userId: user.id,
      event: 'preuve_recue',
      title: 'Preuve complémentaire reçue',
      body: 'Votre preuve de paiement a été reçue et sera vérifiée par notre équipe dans les 24h.',
    });
    await notifyAdmins({
      event: 'preuve_recue',
      title: 'Nouvelle preuve à vérifier',
      body: `${user.email} — preuve complémentaire sur la transaction ${transaction.internalRef}.`,
    });

    return NextResponse.json({ ok: true, transactionId: transaction.id });
  } catch (err) {
    return errorResponse(err);
  }
}
