// GET /api/documents/download/[token] — Téléchargement sécurisé (CDC §21 couche 4).
// Vérifie le DownloadLink (expiration 24 h, usedCount < maxUses), incrémente le
// compteur, puis sert le document en page HTML imprimable autonome avec QR code
// d'authenticité (couche 2) et filigrane invisible (couche 1).
import { NextRequest, NextResponse } from 'next/server';
import QRCode from 'qrcode';
import { prisma } from '@/lib/db';
import { appUrl } from '@/lib/docgen';
import { buildDownloadHtml } from '@/lib/docgen/downloadHtml';
import { getOrgBranding } from '@/lib/org';
import { generateDocx, generatePptx, type DownloadFormat } from '@/lib/docgen/formats';
import { parseExcelConfig, generateExcel } from '@/lib/docgen/excel';

function htmlError(status: number, title: string, message: string): NextResponse {
  const page = `<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"/><title>${title} — IBIG DocPro</title>
<style>body{font-family:'Segoe UI',Arial,sans-serif;background:#F5F7FA;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0}
.box{background:#fff;border-radius:10px;box-shadow:0 8px 30px rgba(13,43,78,.14);padding:40px;max-width:460px;text-align:center}
h1{color:#0D2B4E;font-size:1.3rem}p{color:#546E7A}a{color:#1565C0}</style></head>
<body><div class="box"><h1>${title}</h1><p>${message}</p><p><a href="/compte">Retour à mon espace</a></p></div></body></html>`;
  return new NextResponse(page, { status, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const format = (new URL(req.url).searchParams.get('format') ?? 'pdf') as DownloadFormat;

  const link = await prisma.downloadLink.findUnique({
    where: { token },
    include: { document: { include: { template: true } } },
  });

  if (!link) {
    return htmlError(404, 'Lien introuvable', 'Ce lien de téléchargement n’existe pas ou a été révoqué.');
  }
  if (link.expiresAt.getTime() < Date.now()) {
    return htmlError(
      410,
      'Lien expiré',
      'Ce lien de téléchargement a expiré (validité 24 h après paiement). Demandez un nouveau lien depuis votre espace.'
    );
  }
  if (link.usedCount >= link.maxUses) {
    return htmlError(
      410,
      'Limite atteinte',
      `Ce lien a déjà été utilisé ${link.maxUses} fois (maximum autorisé). Demandez un nouveau lien depuis votre espace.`
    );
  }
  if (!link.document.paid) {
    return htmlError(402, 'Document non payé', 'Ce document n’a pas encore été réglé. Finalisez le paiement pour le télécharger.');
  }

  // Consommation du lien + statut du document.
  await prisma.$transaction([
    prisma.downloadLink.update({ where: { id: link.id }, data: { usedCount: { increment: 1 } } }),
    prisma.generatedDocument.update({ where: { id: link.documentId }, data: { status: 'telecharge' } }),
  ]);

  const safeTitle = link.document.title.replace(/[^a-zA-Z0-9_\- ]/g, '').trim() || 'document';

  // ── Format XLSX (mini-app Excel) ────────────────────────────────────────────
  if (link.document.template.templateType === 'excel') {
    const config = parseExcelConfig(link.document.template.body);
    if (!config) {
      return htmlError(500, 'Erreur Excel', 'La configuration Excel de ce modèle est invalide.');
    }
    let answers: Record<string, string> = {};
    try { answers = JSON.parse(link.document.contentHtml) as Record<string, string>; } catch { /* */ }
    const buffer = await generateExcel(
      config,
      answers,
      link.document.title,
      link.document.template.name
    );
    return new NextResponse(buffer as unknown as BodyInit, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${safeTitle}.xlsx"`,
        'Cache-Control': 'no-store, private',
      },
    });
  }

  // ── Format DOCX ────────────────────────────────────────────────────────────
  if (format === 'docx') {
    const buffer = await generateDocx(
      { title: link.document.title, contentHtml: link.document.contentHtml },
      { name: link.document.template.name }
    );
    return new NextResponse(buffer as unknown as BodyInit, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="${safeTitle}.docx"`,
        'Cache-Control': 'no-store, private',
      },
    });
  }

  // ── Format PPTX ────────────────────────────────────────────────────────────
  if (format === 'pptx') {
    const buffer = await generatePptx(
      { title: link.document.title, contentHtml: link.document.contentHtml },
      { name: link.document.template.name }
    );
    return new NextResponse(buffer as unknown as BodyInit, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'Content-Disposition': `attachment; filename="${safeTitle}.pptx"`,
        'Cache-Control': 'no-store, private',
      },
    });
  }

  // ── Format PDF / HTML (défaut) ─────────────────────────────────────────────
  const verifyUrl = `${appUrl()}/verify/${link.document.verifyCode}`;
  const qrDataUrl = await QRCode.toDataURL(verifyUrl, { margin: 1, width: 220, errorCorrectionLevel: 'M' });
  const branding = link.document.userId ? await getOrgBranding(link.document.userId) : null;

  const html = buildDownloadHtml(
    {
      title: link.document.title,
      contentHtml: link.document.contentHtml,
      watermarkId: link.document.watermarkId,
      verifyCode: link.document.verifyCode,
      createdAt: link.document.createdAt,
      templateName: link.document.template.name,
    },
    qrDataUrl,
    verifyUrl,
    branding
  );

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store, private',
      'X-Robots-Tag': 'noindex',
    },
  });
}
