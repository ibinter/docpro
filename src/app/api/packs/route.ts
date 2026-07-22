// GET /api/packs — liste publique des packs groupés actifs (CDC §6.2).
// Réponse : { packs: [{ code, name, description, price, currency, durationDays,
//             templates: [{ code, name, price, priceMax, currency }], unitSum, saving }] }
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getActivePacks } from '@/lib/packs';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const packs = await getActivePacks();
    const allCodes = [...new Set(packs.flatMap((p) => p.features.templates))];
    const templates = await prisma.documentTemplate.findMany({
      where: { code: { in: allCodes }, active: true },
      select: { code: true, name: true, price: true, priceMax: true, currency: true },
    });
    const byCode = new Map(templates.map((t) => [t.code, t]));

    return NextResponse.json({
      packs: packs.map(({ plan, features }) => {
        const included = features.templates
          .map((code) => byCode.get(code))
          .filter((t): t is NonNullable<typeof t> => Boolean(t));
        const unitSum = included.reduce((sum, t) => sum + (t.priceMax ?? t.price), 0);
        return {
          code: plan.code,
          name: plan.name,
          description: plan.description,
          price: plan.price,
          currency: plan.currency,
          durationDays: plan.durationType === 'days' ? plan.durationValue : null,
          templates: included,
          unitSum,
          saving: Math.max(0, unitSum - plan.price),
        };
      }),
    });
  } catch (e) {
    console.error('[packs] erreur :', e);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}
