// API publique partenaires v1 (CDC §6.2) — GET /api/v1/verify/[code]
// Auth : Authorization: Bearer dp_live_xxx
// Vérifie l'authenticité d'un document par son code de vérification.
// Réponse : { authentic: bool, type, generated_at } — jamais de données personnelles.
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyApiKey, handleV1Error } from '@/lib/apikey';

export const dynamic = 'force-dynamic';

export async function GET(req: Request, { params }: { params: Promise<{ code: string }> }) {
  try {
    await verifyApiKey(req);
    const { code } = await params;

    const doc = await prisma.generatedDocument.findUnique({
      where: { verifyCode: code },
      include: { template: { select: { name: true } } },
    });

    if (!doc) {
      return NextResponse.json({ authentic: false, type: null, generated_at: null });
    }

    return NextResponse.json({
      authentic: true,
      type: doc.template.name,
      generated_at: doc.createdAt.toISOString(),
    });
  } catch (e) {
    return handleV1Error(e);
  }
}
