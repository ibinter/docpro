// GET /api/documents/[id]/download — point d'entrée propriétaire :
// vérifie que le document est payé et appartient à l'utilisateur, réutilise un
// DownloadLink encore valide ou en crée un (24 h, 3 usages max), puis redirige
// vers le lien sécurisé /api/documents/download/[token].
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const format = new URL(req.url).searchParams.get('format') ?? 'pdf';

  const doc = await prisma.generatedDocument.findUnique({ where: { id } });
  if (!doc) return NextResponse.json({ error: 'Document introuvable.' }, { status: 404 });

  const user = await getSessionUser();
  const isStaff = user && (user.role === 'admin' || user.role === 'superadmin');
  if ((doc.userId === null || doc.userId !== user?.id) && !isStaff) {
    return NextResponse.json({ error: 'Accès refusé.' }, { status: 403 });
  }
  if (!doc.paid) {
    return NextResponse.json({ error: 'Document non payé.' }, { status: 402 });
  }

  const now = new Date();
  let link = await prisma.downloadLink.findFirst({
    where: { documentId: doc.id, expiresAt: { gt: now } },
    orderBy: { createdAt: 'desc' },
  });
  if (link && link.usedCount >= link.maxUses) link = null;

  if (!link) {
    link = await prisma.downloadLink.create({
      data: {
        documentId: doc.id,
        maxUses: 3,
        expiresAt: new Date(now.getTime() + 24 * 60 * 60 * 1000), // 24 h
        boundIp: req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null,
      },
    });
  }

  const formatParam = format !== 'pdf' ? `?format=${format}` : '';
  return NextResponse.redirect(new URL(`/api/documents/download/${link.token}${formatParam}`, req.url));
}
