// API publique partenaires v1 (CDC §6.2) — GET /api/v1/templates
// Auth : Authorization: Bearer dp_live_xxx
// Réponse : { templates: [{ code, name, category, price, currency, fields }] }
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyApiKey, handleV1Error } from '@/lib/apikey';
import { parseFields } from '@/lib/docgen';

export const dynamic = 'force-dynamic';

const PAR_PAGE_MAX = 200;

export async function GET(req: Request) {
  try {
    await verifyApiKey(req);

    // Pagination (?page=&limit=) + filtre (?category=) — le catalogue dépasse 12 000 modèles.
    const url = new URL(req.url);
    const page = Math.max(1, parseInt(url.searchParams.get('page') ?? '1', 10) || 1);
    const limit = Math.min(PAR_PAGE_MAX, Math.max(1, parseInt(url.searchParams.get('limit') ?? '100', 10) || 100));
    const category = url.searchParams.get('category')?.trim() || undefined;

    const where = { active: true, ...(category ? { category } : {}) };
    const [total, templates] = await Promise.all([
      prisma.documentTemplate.count({ where }),
      prisma.documentTemplate.findMany({
        where,
        orderBy: [{ category: 'asc' }, { popularity: 'desc' }, { name: 'asc' }],
        skip: (page - 1) * limit,
        take: limit,
        select: { code: true, name: true, category: true, price: true, currency: true, fieldsJson: true },
      }),
    ]);

    return NextResponse.json({
      page,
      limit,
      total,
      totalPages: Math.max(1, Math.ceil(total / limit)),
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
