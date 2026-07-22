// Journal d'audit immuable — toute action sensible DOIT passer par ici (règle CDC §17.2).
import { prisma } from './db';

export async function audit(params: {
  actorId?: string | null;
  action: string; // ex: 'license.activate', 'proof.validate', 'order.reject'
  entityType: string;
  entityId: string;
  before?: unknown;
  after?: unknown;
  reason?: string;
  ip?: string;
}) {
  await prisma.auditLog.create({
    data: {
      actorId: params.actorId ?? null,
      action: params.action,
      entityType: params.entityType,
      entityId: params.entityId,
      beforeJson: params.before !== undefined ? JSON.stringify(params.before) : null,
      afterJson: params.after !== undefined ? JSON.stringify(params.after) : null,
      reason: params.reason,
      ip: params.ip,
    },
  });
}
