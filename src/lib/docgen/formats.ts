// Génération multi-formats : DOCX, PPTX à partir du HTML d'un document généré.
// PDF = HTML imprimable (navigateur) — pas de dépendance headless.

import type { GeneratedDocument, DocumentTemplate } from '@prisma/client';

export type DownloadFormat = 'pdf' | 'docx' | 'pptx';

/** Retourne les formats disponibles pour un template (depuis formatsJson). */
export function getAvailableFormats(template: DocumentTemplate): DownloadFormat[] {
  try {
    const formats = JSON.parse(template.formatsJson ?? '["pdf","docx"]') as string[];
    return formats.filter((f): f is DownloadFormat => ['pdf', 'docx', 'pptx'].includes(f));
  } catch {
    return ['pdf', 'docx'];
  }
}

/** Génère un Buffer DOCX depuis le HTML du document. */
export async function generateDocx(
  doc: Pick<GeneratedDocument, 'title' | 'contentHtml'>,
  template: Pick<DocumentTemplate, 'name'>
): Promise<Buffer> {
  // html-to-docx : convertit HTML → .docx Word
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const HTMLtoDOCX = require('html-to-docx');

  const fullHtml = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8"/>
<title>${escapeHtml(doc.title)}</title>
<style>
  body { font-family: Calibri, Arial, sans-serif; font-size: 11pt; color: #1a1a1a; margin: 40px; }
  h1 { font-size: 18pt; color: #0D2B4E; }
  h2 { font-size: 13pt; color: #1565C0; border-bottom: 1px solid #ddd; padding-bottom: 4px; }
  table { border-collapse: collapse; width: 100%; }
  td, th { border: 1px solid #ccc; padding: 6px 10px; font-size: 10pt; }
  th { background: #E3F2FD; font-weight: bold; }
  p { line-height: 1.6; margin: 6px 0; }
  .muted { color: #666; }
</style>
</head>
<body>
${doc.contentHtml}
<p style="margin-top:40px; font-size:9pt; color:#999; border-top:1px solid #eee; padding-top:8px;">
  Document généré par IBIG DocPro — ${template.name}
</p>
</body>
</html>`;

  const buffer = await HTMLtoDOCX(fullHtml, null, {
    orientation: 'portrait',
    margins: { top: 720, right: 720, bottom: 720, left: 720 },
    title: doc.title,
    description: `Document: ${template.name}`,
    creator: 'IBIG DocPro',
    font: 'Calibri',
    fontSize: 22, // half-points = 11pt
  });

  return Buffer.isBuffer(buffer) ? buffer : Buffer.from(buffer);
}

/** Génère un Buffer PPTX depuis le contenu du document. */
export async function generatePptx(
  doc: Pick<GeneratedDocument, 'title' | 'contentHtml'>,
  template: Pick<DocumentTemplate, 'name'>
): Promise<Buffer> {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const PptxGenJS = require('pptxgenjs');
  const pptx = new PptxGenJS();

  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'IBIG DocPro';
  pptx.title = doc.title;

  // Diapositive de couverture
  const slide1 = pptx.addSlide();
  slide1.background = { color: '0D2B4E' };
  slide1.addText(doc.title, {
    x: 0.5, y: 1.5, w: 9, h: 1.5,
    fontSize: 32, bold: true, color: 'FFFFFF', align: 'center',
  });
  slide1.addText(template.name, {
    x: 0.5, y: 3.2, w: 9, h: 0.6,
    fontSize: 16, color: 'BFD7F0', align: 'center',
  });
  slide1.addText('IBIG DocPro — docpro.ibigsoft.com', {
    x: 0.5, y: 6.5, w: 9, h: 0.4,
    fontSize: 10, color: '88AECF', align: 'center',
  });

  // Extraction du texte brut depuis le HTML pour les slides suivantes
  const sections = extractSections(doc.contentHtml);

  for (const section of sections.slice(0, 8)) {
    const slide = pptx.addSlide();
    slide.background = { color: 'FFFFFF' };
    // Barre de titre bleue
    slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 10, h: 0.8, fill: { color: '1565C0' } });
    slide.addText(section.title, {
      x: 0.3, y: 0.1, w: 9.4, h: 0.6,
      fontSize: 18, bold: true, color: 'FFFFFF',
    });
    slide.addText(section.content, {
      x: 0.4, y: 1.0, w: 9.2, h: 5.4,
      fontSize: 11, color: '333333', valign: 'top',
      breakLine: true, wrap: true,
    });
  }

  // Diapositive de clôture
  const lastSlide = pptx.addSlide();
  lastSlide.background = { color: 'F5F7FA' };
  lastSlide.addText('Merci', { x: 0.5, y: 2.5, w: 9, h: 1, fontSize: 36, bold: true, color: '0D2B4E', align: 'center' });
  lastSlide.addText('Document généré par IBIG DocPro', { x: 0.5, y: 3.8, w: 9, h: 0.5, fontSize: 13, color: '546E7A', align: 'center' });

  const buffer = await pptx.write({ outputType: 'nodebuffer' });
  return buffer as Buffer;
}

// ── Helpers ────────────────────────────────────────────────────────────────────

function escapeHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function stripTags(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<\/tr>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

interface Section { title: string; content: string }

function extractSections(html: string): Section[] {
  const sections: Section[] = [];
  // Découpe sur les balises h1/h2/h3
  const parts = html.split(/<h[123][^>]*>/i);
  for (const part of parts) {
    const endTag = part.match(/<\/h[123]>/i);
    if (endTag) {
      const titleHtml = part.slice(0, endTag.index ?? part.length);
      const bodyHtml = part.slice((endTag.index ?? 0) + endTag[0].length);
      const title = stripTags(titleHtml).slice(0, 80);
      const content = stripTags(bodyHtml).slice(0, 600);
      if (title.trim()) sections.push({ title: title.trim(), content: content.trim() });
    } else if (sections.length === 0 && part.trim()) {
      sections.push({ title: 'Introduction', content: stripTags(part).slice(0, 600) });
    }
  }
  if (sections.length === 0) {
    sections.push({ title: 'Contenu du document', content: stripTags(html).slice(0, 600) });
  }
  return sections;
}
