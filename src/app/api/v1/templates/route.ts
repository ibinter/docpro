// API publique partenaires v1 (CDC §6.2) — GET /api/v1/templates
// Auth : Authorization: Bearer dp_live_xxx
// Réponse : { templates: [{ code, name, category, price, currency, fields }] }
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyApiKey, handleV1Error } from '@/lib/apikey';
import { parseFields } from '@/lib/docgen';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    await verifyApiKey(req);

    const templates = await prisma.documentTemplate.findMany({
      where: { active: true },
      orderBy: [{ category: 'asc' }, { popularity: 'desc' }, { name: 'asc' }],
    });

    return NextResponse.json({
      templates: templates.map((t) => ({
        code: t.code,
        name: t.name,
        category: t.category,
        price: t.price,
        currency: t.currency,
        fields: parseFields(t.fieldsJson),
      })),
    });
  } catch (e) {
    return handleV1Error(e);
  }
}
