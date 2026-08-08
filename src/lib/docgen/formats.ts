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

/** Options de rendu Word : papier en-tête et identité de l'organisation. */
export interface DocxBranding {
  displayName: string;
  /** Image de papier en-tête (PNG/JPEG) reproduite en en-tête de chaque page. */
  letterhead?: Buffer | null;
  letterheadMime?: string;
  primaryColor?: string | null;
  /** Mentions légales de l'entreprise, en pied de page. */
  footerText?: string | null;
}

export interface DocxInput {
  title: string;
  contentHtml: string;
  /** Structure produite par le moteur de génération — source privilégiée. */
  contentJson?: string | null;
  templateName: string;
  createdAt?: Date;
  verifyCode?: string | null;
  verifyUrl?: string | null;
  branding?: DocxBranding | null;
}

type SectionJson = { titre: string; contenu: string; articles?: { titre: string; texte: string }[] };
type DocumentJson = {
  titre?: string;
  parties?: Record<string, string>;
  sections?: SectionJson[];
  clauses_speciales?: string[];
  date_creation?: string;
  pays?: string;
};

/**
 * Corps Word construit depuis la structure du document plutôt que depuis le
 * HTML d'affichage : le Word rendu est ainsi typographiquement équivalent au
 * PDF (mêmes blocs, mêmes titres, même bloc de signatures).
 */
function corpsDepuisJson(d: DocumentJson, accent: string): string {
  const parties = d.parties ? Object.entries(d.parties).filter(([, v]) => typeof v === 'string') : [];

  const enTete = `
<p class="titre">${escapeHtml(d.titre ?? '')}</p>
${d.pays ? `<p class="sous-titre">Document établi conformément au droit applicable — ${escapeHtml(d.pays)}</p>` : ''}`;

  const blocParties = parties.length
    ? `<p class="intitule">ENTRE LES SOUSSIGNÉS :</p>
<table class="parties"><tbody>
${parties
  .map(
    ([role, identite]) =>
      `<tr><td class="role">${escapeHtml(role)}</td><td>${escapeHtml(identite)}</td></tr>`
  )
  .join('')}
</tbody></table>`
    : '';

  const sections = (d.sections ?? [])
    .map((s) => {
      const corps = s.articles?.length
        ? s.articles
            .map(
              (a) =>
                `<p class="article">${escapeHtml(a.titre)}</p><p class="texte">${escapeHtml(a.texte)}</p>`
            )
            .join('')
        : `<p class="texte">${escapeHtml(s.contenu)}</p>`;
      return `<h2>${escapeHtml(s.titre)}</h2>${corps}`;
    })
    .join('');

  const clauses = d.clauses_speciales?.length
    ? `<h2>Clauses spéciales</h2><ol>${d.clauses_speciales
        .map((c) => `<li>${escapeHtml(c)}</li>`)
        .join('')}</ol>`
    : '';

  // Bloc de signatures sur une nouvelle page, comme dans le PDF.
  const signatures = parties.length
    ? `<p class="saut"></p><h2>Signatures des parties</h2>
<p class="texte">Fait à ${escapeHtml(d.pays ?? '')}, le ${escapeHtml(d.date_creation ?? '')}, en ${
        parties.length <= 1 ? 'deux' : parties.length
      } exemplaires originaux, dont un pour chaque partie.</p>
<table class="signatures"><tbody><tr>
${parties
  .slice(0, 2)
  .map(
    ([role, identite]) =>
      `<td><p class="role">${escapeHtml(role)}</p><p class="identite">${escapeHtml(
        identite
      )}</p><p class="mention">Lu et approuvé — Bon pour accord</p><p class="ligne">&nbsp;</p></td>`
  )
  .join('')}
</tr></tbody></table>`
    : '';

  return `${enTete}${blocParties}${sections}${clauses}${signatures}`.replace(
    /__ACCENT__/g,
    accent
  );
}

/** Génère un Buffer DOCX professionnel (papier en-tête, pagination Word). */
export async function generateDocx(input: DocxInput): Promise<Buffer> {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const HTMLtoDOCX = require('html-to-docx');

  const accent = input.branding?.primaryColor || '#0D2B4E';

  let structure: DocumentJson | null = null;
  if (input.contentJson) {
    try {
      const parsed = JSON.parse(input.contentJson) as DocumentJson;
      if (Array.isArray(parsed?.sections) && parsed.sections.length > 0) structure = parsed;
    } catch {
      /* structure illisible : repli sur le HTML d'affichage */
    }
  }

  const corps = structure
    ? corpsDepuisJson(structure, accent)
    : `<h1>${escapeHtml(input.title)}</h1>${input.contentHtml}`;

  const authenticite =
    input.verifyCode && input.verifyUrl
      ? `<p class="saut"></p>
<table class="authent"><tbody><tr><td>
<p class="authent-titre">Document authentique — vérifiable en ligne</p>
<p class="authent-texte">Rendez-vous sur ${escapeHtml(input.verifyUrl)}<br/>
Code de vérification : ${escapeHtml(input.verifyCode)}<br/>
${
  input.createdAt
    ? `Généré le ${new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long' }).format(input.createdAt)}`
    : ''
}</p>
</td></tr></tbody></table>`
      : '';

  const fullHtml = `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"/><title>${escapeHtml(input.title)}</title>
<style>
  body { font-family: 'Times New Roman', Georgia, serif; font-size: 11pt; color: #1a1a1a; }
  p { line-height: 1.55; margin: 6pt 0; text-align: justify; }
  .titre { font-family: Calibri, Arial, sans-serif; font-size: 17pt; font-weight: bold; color: ${accent};
           text-align: center; text-transform: uppercase; margin: 0 0 6pt; }
  .sous-titre { font-family: Calibri, Arial, sans-serif; font-size: 9pt; color: #546E7A;
                text-align: center; margin: 0 0 16pt; }
  h2 { font-family: Calibri, Arial, sans-serif; font-size: 12pt; font-weight: bold; color: ${accent};
       text-transform: uppercase; margin: 16pt 0 6pt; border-bottom: 1px solid ${accent}; padding-bottom: 3pt; }
  .article { font-family: Calibri, Arial, sans-serif; font-weight: bold; font-size: 10.5pt; margin: 10pt 0 3pt; }
  .texte { text-align: justify; }
  .intitule { font-family: Calibri, Arial, sans-serif; font-weight: bold; font-size: 10pt; color: ${accent};
              margin: 14pt 0 4pt; }
  table.parties { width: 100%; border-collapse: collapse; margin-bottom: 14pt; }
  table.parties td { border: 1px solid #C8D2DE; padding: 6pt 8pt; font-size: 10pt; vertical-align: top; }
  table.parties td.role { font-weight: bold; width: 28%; font-family: Calibri, Arial, sans-serif; }
  ol li { margin-bottom: 6pt; text-align: justify; }
  .saut { page-break-before: always; }
  table.signatures { width: 100%; border-collapse: collapse; margin-top: 18pt; }
  table.signatures td { border: 1px solid #C8D2DE; padding: 10pt; width: 50%; vertical-align: top; }
  table.signatures .role { font-family: Calibri, Arial, sans-serif; font-weight: bold; color: ${accent};
                           font-size: 10pt; margin: 0 0 3pt; }
  table.signatures .identite { font-size: 9pt; color: #546E7A; margin: 0 0 24pt; }
  table.signatures .mention { font-size: 8.5pt; color: #546E7A; margin: 0 0 6pt; }
  table.signatures .ligne { border-bottom: 1px solid #333; margin: 24pt 0 0; }
  table.authent { width: 100%; border-collapse: collapse; margin-top: 20pt; }
  table.authent td { border: 1px solid #C8D2DE; padding: 10pt; }
  .authent-titre { font-family: Calibri, Arial, sans-serif; font-weight: bold; font-size: 10pt; color: #0D2B4E; margin: 0 0 4pt; }
  .authent-texte { font-size: 8.5pt; color: #546E7A; text-align: left; margin: 0; }
</style></head>
<body>${corps}${authenticite}</body></html>`;

  // En-tête Word : papier en-tête de l'entreprise, répété sur chaque page.
  const enTeteHtml =
    input.branding?.letterhead
      ? `<p style="margin:0"><img src="data:${
          input.branding.letterheadMime ?? 'image/png'
        };base64,${input.branding.letterhead.toString('base64')}" width="600" /></p>`
      : null;

  const piedTexte =
    input.branding?.footerText?.trim() ||
    `${input.templateName}${input.verifyCode ? ` · Réf. ${input.verifyCode.slice(-10).toUpperCase()}` : ''}`;
  const piedHtml = `<p style="font-family:Calibri,Arial,sans-serif;font-size:8pt;color:#546E7A;margin:0">${escapeHtml(
    piedTexte
  )}</p>`;

  const buffer = await HTMLtoDOCX(fullHtml, enTeteHtml, {
    orientation: 'portrait',
    margins: { top: enTeteHtml ? 1440 : 1134, right: 1134, bottom: 1134, left: 1134 },
    title: input.title,
    description: `Document : ${input.templateName}`,
    creator: input.branding?.displayName || 'IBIG DocPro',
    font: 'Times New Roman',
    fontSize: 22, // demi-points = 11 pt
    header: Boolean(enTeteHtml),
    footer: true,
    pageNumber: true, // pagination Word native, mise à jour à l'impression
  }, piedHtml);

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
