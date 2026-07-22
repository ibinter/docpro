// API publique partenaires v1 (CDC §6.2) — GET /api/v1/documents/[id]
// Auth : Authorization: Bearer dp_live_xxx
// Métadonnées + HTML d'un document généré via l'API — propriétaire de la clé uniquement.
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyApiKey, handleV1Error, ApiError } from '@/lib/apikey';

export const dynamic = 'force-dynamic';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const apiKey = await verifyApiKey(req);
    const { id } = await params;

    const doc = await prisma.generatedDocument.findUnique({
      where: { id },
      include: { template: { select: { code: true, name: true, category: true } } },
    });

    // 404 aussi quand le document appartient à un autre compte (pas de fuite d'existence).
    if (!doc || doc.userId !== apiKey.userId) {
      throw new ApiError(404, 'document_not_found', 'Document introuvable.');
    }

    return NextResponse.json({
      id: doc.id,
      template_code: doc.template.code,
      template_name: doc.template.name,
      category: doc.template.category,
      title: doc.title,
      language: doc.language,
      quality_score: doc.qualityScore,
      verify_code: doc.verifyCode,
      status: doc.status,
      paid: doc.paid,
      price: doc.price,
      currency: doc.currency,
      created_at: doc.createdAt.toISOString(),
      html: doc.contentHtml,
    });
  } catch (e) {
    return handleV1Error(e);
  }
}
