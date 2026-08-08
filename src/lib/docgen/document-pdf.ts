// ─────────────────────────────────────────────────────────────────────────────
// Rendu PDF professionnel des documents générés — pdfkit.
//
// Pourquoi un rendu serveur plutôt que l'impression navigateur : seule cette
// voie permet une pagination maîtrisée (« Page 3 sur 7 »), un papier en-tête
// répété, des marges normalisées et des sauts de page propres — impossible à
// garantir depuis la boîte d'impression d'un navigateur.
//
// Source de vérité : contentJson (structure produite par le moteur v2). À
// défaut, on retombe sur le HTML en le convertissant en blocs de texte.
// ─────────────────────────────────────────────────────────────────────────────
import PDFDocument from 'pdfkit';
import QRCode from 'qrcode';
import type { DocJson } from '@/lib/ai/docgen-v2';

const NAVY = '#0D2B4E';
const GRAY = '#546E7A';
const LINE = '#C8D2DE';
const INK = '#1A1A2E';

// A4 en points (72 pt = 1 pouce)
const PAGE = { width: 595.28, height: 841.89 };
const MARGIN = { top: 62, bottom: 74, left: 62, right: 62 };
const CONTENU_LARGEUR = PAGE.width - MARGIN.left - MARGIN.right;

/** Papier en-tête et identité visuelle d'une organisation. */
export interface PdfBranding {
  displayName: string;
  /** Image de papier en-tête (Buffer PNG/JPEG), bandeau haut de page. */
  letterhead?: Buffer | null;
  /** Répéter le papier en-tête sur toutes les pages (sinon : première page). */
  letterheadOnAllPages?: boolean;
  /** Logo simple, utilisé si aucun papier en-tête n'est fourni. */
  logo?: Buffer | null;
  primaryColor?: string | null;
  /** Mentions légales de l'entreprise, en pied de chaque page. */
  footerText?: string | null;
}

export interface DocumentPdfInput {
  titre: string;
  templateName: string;
  contentJson: string | null;
  contentHtml: string;
  pays: string | null;
  createdAt: Date;
  verifyCode: string;
  verifyUrl: string;
  watermarkId: string;
  branding?: PdfBranding | null;
}

/* ── Conversion de secours : HTML → blocs de texte ────────────────────────── */

interface Bloc { type: 'titre' | 'soustitre' | 'para' | 'liste'; texte: string }

function htmlEnBlocs(html: string): Bloc[] {
  const sansStyle = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
  const blocs: Bloc[] = [];
  const re = /<(h1|h2|h3|p|li)[^>]*>([\s\S]*?)<\/\1>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(sansStyle)) !== null) {
    const texte = decoder(m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
    if (!texte) continue;
    const tag = m[1].toLowerCase();
    blocs.push({
      type: tag === 'h1' ? 'titre' : tag === 'h2' || tag === 'h3' ? 'soustitre' : tag === 'li' ? 'liste' : 'para',
      texte,
    });
  }
  return blocs;
}

function decoder(s: string): string {
  return s
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)));
}

function lireDocJson(contentJson: string | null): DocJson | null {
  if (!contentJson) return null;
  try {
    const d = JSON.parse(contentJson) as DocJson;
    return Array.isArray(d?.sections) && d.sections.length > 0 ? d : null;
  } catch {
    return null;
  }
}

/* ── Rendu ────────────────────────────────────────────────────────────────── */

type Doc = PDFKit.PDFDocument;

/** Dimensions d'un PNG ou JPEG, lues directement dans l'en-tête binaire. */
function mesurerImage(buf: Buffer): { largeur: number; hauteur: number } | null {
  // PNG : bloc IHDR à l'offset 16
  if (buf.length > 24 && buf[0] === 0x89 && buf[1] === 0x50) {
    return { largeur: buf.readUInt32BE(16), hauteur: buf.readUInt32BE(20) };
  }
  // JPEG : parcours des segments jusqu'à un marqueur SOF
  if (buf.length > 4 && buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i + 9 < buf.length) {
      if (buf[i] !== 0xff) { i++; continue; }
      const marqueur = buf[i + 1];
      // SOF0-SOF3, SOF5-SOF7, SOF9-SOF11, SOF13-SOF15 portent les dimensions
      if (marqueur >= 0xc0 && marqueur <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marqueur)) {
        return { hauteur: buf.readUInt16BE(i + 5), largeur: buf.readUInt16BE(i + 7) };
      }
      i += 2 + buf.readUInt16BE(i + 2);
    }
  }
  return null;
}

/** Hauteur occupée par le papier en-tête sur la page courante. */
function dessinerEnTete(doc: Doc, b: PdfBranding | null | undefined, premierePage: boolean): number {
  if (!b) return 0;
  const surCettePage = b.letterhead && (premierePage || b.letterheadOnAllPages);

  if (surCettePage && b.letterhead) {
    try {
      // Bandeau pleine largeur calé en haut de page. La hauteur est bornée pour
      // qu'un en-tête trop haut ne dévore pas la zone de texte.
      const dims = mesurerImage(b.letterhead);
      const hauteur = dims ? Math.min((PAGE.width / dims.largeur) * dims.hauteur, 170) : 110;
      doc.image(b.letterhead, 0, 0, { width: PAGE.width, height: hauteur });
      return Math.max(0, hauteur - MARGIN.top + 16);
    } catch {
      /* image illisible : on continue sans en-tête */
    }
  }

  if (premierePage && b.logo) {
    try {
      doc.image(b.logo, MARGIN.left, MARGIN.top - 14, { fit: [130, 44] });
      return 40;
    } catch {
      /* logo illisible : ignoré */
    }
  }
  return 0;
}

/** Pied de page : mentions, référence et pagination. Appelé après coup. */
function dessinerPied(
  doc: Doc,
  page: number,
  total: number,
  input: DocumentPdfInput,
): void {
  const y = PAGE.height - MARGIN.bottom + 18;
  const accent = input.branding?.primaryColor || NAVY;

  // Le pied s'écrit SOUS la marge basse. Sans neutraliser cette marge, pdfkit
  // considère la page pleine et en insère une nouvelle à chaque pied dessiné.
  const margeBasse = doc.page.margins.bottom;
  doc.page.margins.bottom = 0;

  doc.save();
  doc.moveTo(MARGIN.left, y - 10).lineTo(PAGE.width - MARGIN.right, y - 10)
    .lineWidth(0.5).strokeColor(LINE).stroke();

  const mentions = input.branding?.footerText?.trim();
  const gauche = mentions
    ? mentions.slice(0, 120)
    : `${input.templateName} · Réf. ${input.verifyCode.slice(-10).toUpperCase()}`;

  doc.font('Helvetica').fontSize(7.5).fillColor(GRAY);
  doc.text(gauche, MARGIN.left, y, {
    width: CONTENU_LARGEUR - 110,
    lineBreak: false,
    ellipsis: true,
  });

  doc.font('Helvetica-Bold').fontSize(7.5).fillColor(accent);
  doc.text(`Page ${page} sur ${total}`, PAGE.width - MARGIN.right - 110, y, {
    width: 110,
    align: 'right',
    lineBreak: false,
  });
  doc.restore();
  doc.page.margins.bottom = margeBasse;
}

/** Titre de section avec filet, en évitant un titre orphelin en bas de page. */
function titreSection(doc: Doc, texte: string, accent: string): void {
  if (doc.y > PAGE.height - MARGIN.bottom - 90) doc.addPage();
  doc.moveDown(0.9);
  const y = doc.y;
  doc.font('Helvetica-Bold').fontSize(11.5).fillColor(accent);
  doc.text(texte.toUpperCase(), MARGIN.left, y, { width: CONTENU_LARGEUR });
  doc.moveTo(MARGIN.left, doc.y + 3).lineTo(MARGIN.left + 46, doc.y + 3)
    .lineWidth(1.6).strokeColor(accent).stroke();
  doc.moveDown(0.55);
}

function paragraphe(doc: Doc, texte: string): void {
  doc.font('Times-Roman').fontSize(10.5).fillColor(INK);
  doc.text(texte, MARGIN.left, doc.y, {
    width: CONTENU_LARGEUR,
    align: 'justify',
    lineGap: 2.4,
    paragraphGap: 6,
  });
}

/** Bloc de signatures : deux colonnes, cadres prêts à signer. */
function blocSignatures(doc: Doc, parties: [string, string][], lieu: string, date: string, accent: string): void {
  if (parties.length === 0) return;
  doc.addPage();
  titreSection(doc, 'Signatures des parties', accent);

  doc.font('Times-Roman').fontSize(10).fillColor(GRAY);
  doc.text(
    `Fait à ${lieu}, le ${date}, en ${parties.length <= 1 ? 'deux' : parties.length} exemplaires originaux, ` +
    'dont un pour chaque partie.',
    MARGIN.left, doc.y, { width: CONTENU_LARGEUR }
  );
  doc.moveDown(1.6);

  const colonne = (CONTENU_LARGEUR - 24) / 2;
  const hauteur = 132;
  let x = MARGIN.left;
  let yLigne = doc.y;

  parties.slice(0, 4).forEach(([role, identite], i) => {
    if (i > 0 && i % 2 === 0) {
      yLigne += hauteur + 20;
      x = MARGIN.left;
      if (yLigne + hauteur > PAGE.height - MARGIN.bottom) {
        doc.addPage();
        yLigne = doc.y;
      }
    }
    doc.save();
    doc.roundedRect(x, yLigne, colonne, hauteur, 4).lineWidth(0.7).strokeColor(LINE).stroke();
    doc.font('Helvetica-Bold').fontSize(9.5).fillColor(accent)
      .text(role, x + 12, yLigne + 12, { width: colonne - 24, lineBreak: false, ellipsis: true });
    doc.font('Helvetica').fontSize(8).fillColor(GRAY)
      .text(identite, x + 12, yLigne + 26, { width: colonne - 24, height: 26, ellipsis: true });
    doc.font('Helvetica').fontSize(7.5).fillColor(GRAY)
      .text('Lu et approuvé — Bon pour accord', x + 12, yLigne + hauteur - 34, { width: colonne - 24 });
    doc.moveTo(x + 12, yLigne + hauteur - 16).lineTo(x + colonne - 12, yLigne + hauteur - 16)
      .lineWidth(0.5).strokeColor('#333').stroke();
    doc.restore();
    x += colonne + 24;
  });

  doc.y = yLigne + hauteur + 24;
}

/** Encart d'authenticité : QR de vérification. */
async function blocAuthenticite(doc: Doc, input: DocumentPdfInput): Promise<void> {
  const qr = await QRCode.toBuffer(input.verifyUrl, { width: 220, margin: 1 }).catch(() => null);
  const hauteur = 96;
  if (doc.y + hauteur > PAGE.height - MARGIN.bottom) doc.addPage();

  const y = doc.y + 14;
  doc.save();
  doc.roundedRect(MARGIN.left, y, CONTENU_LARGEUR, hauteur, 5)
    .lineWidth(0.7).strokeColor(LINE).stroke();

  if (qr) doc.image(qr, MARGIN.left + 12, y + 12, { fit: [72, 72] });

  const xTexte = MARGIN.left + (qr ? 96 : 12);
  const largeur = CONTENU_LARGEUR - (qr ? 108 : 24);
  doc.font('Helvetica-Bold').fontSize(9).fillColor(NAVY)
    .text('Document authentique — vérifiable en ligne', xTexte, y + 14, { width: largeur });
  doc.font('Helvetica').fontSize(7.8).fillColor(GRAY)
    .text(
      `Scannez le QR code ou rendez-vous sur ${input.verifyUrl}\n` +
      `Code de vérification : ${input.verifyCode}\n` +
      `Généré le ${new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long', timeStyle: 'short' }).format(input.createdAt)}`,
      xTexte, y + 30, { width: largeur, lineGap: 1.5 }
    );
  doc.restore();
  doc.y = y + hauteur + 10;
}

/** Génère le PDF complet du document. */
export async function generateDocumentPdf(input: DocumentPdfInput): Promise<Buffer> {
  const b = input.branding ?? null;
  const accent = b?.primaryColor || NAVY;
  const doc = new PDFDocument({
    size: 'A4',
    margins: MARGIN,
    bufferPages: true, // indispensable : la pagination est écrite après coup
    info: {
      Title: input.titre,
      Author: b?.displayName || 'IBIG DocPro',
      Subject: input.templateName,
      Keywords: `docpro,${input.watermarkId}`,
      Creator: 'IBIG DocPro',
    },
  });

  const chunks: Buffer[] = [];
  doc.on('data', (c: Buffer) => chunks.push(c));
  const fini = new Promise<Buffer>((resolve) => doc.on('end', () => resolve(Buffer.concat(chunks))));

  // Papier en-tête sur les pages suivantes
  doc.on('pageAdded', () => {
    const decalage = dessinerEnTete(doc, b, false);
    doc.y = MARGIN.top + decalage;
  });

  // ── Première page : en-tête + titre ────────────────────────────────────
  const decalage = dessinerEnTete(doc, b, true);
  doc.y = MARGIN.top + decalage;

  const structure = lireDocJson(input.contentJson);
  const titre = structure?.titre || input.titre;
  const pays = structure?.pays || input.pays || '';

  doc.moveDown(0.4);
  doc.font('Helvetica-Bold').fontSize(16.5).fillColor(accent);
  doc.text(titre.toUpperCase(), MARGIN.left, doc.y, { width: CONTENU_LARGEUR, align: 'center' });
  doc.moveDown(0.25);
  doc.moveTo(MARGIN.left + CONTENU_LARGEUR / 2 - 44, doc.y).lineTo(MARGIN.left + CONTENU_LARGEUR / 2 + 44, doc.y)
    .lineWidth(1.8).strokeColor(accent).stroke();
  doc.moveDown(0.9);

  if (pays) {
    doc.font('Helvetica').fontSize(8.6).fillColor(GRAY);
    doc.text(`Document établi conformément au droit applicable — ${pays}`, MARGIN.left, doc.y, {
      width: CONTENU_LARGEUR, align: 'center',
    });
    doc.moveDown(1);
  }

  // ── Parties (contrats, statuts, PV) ────────────────────────────────────
  const parties: [string, string][] = structure?.parties
    ? Object.entries(structure.parties).filter(([, v]) => typeof v === 'string') as [string, string][]
    : [];

  if (parties.length > 0) {
    const yDebut = doc.y;
    doc.font('Helvetica-Bold').fontSize(9.5).fillColor(accent);
    doc.text('ENTRE LES SOUSSIGNÉS', MARGIN.left + 14, yDebut + 12, { width: CONTENU_LARGEUR - 28 });
    doc.moveDown(0.4);
    for (const [role, identite] of parties) {
      doc.font('Helvetica-Bold').fontSize(9).fillColor(INK)
        .text(`${role} : `, MARGIN.left + 14, doc.y, { continued: true, width: CONTENU_LARGEUR - 28 });
      doc.font('Times-Roman').fontSize(9.5).fillColor(INK).text(identite, { width: CONTENU_LARGEUR - 28 });
      doc.moveDown(0.25);
    }
    const yFin = doc.y + 12;
    doc.save().roundedRect(MARGIN.left, yDebut, CONTENU_LARGEUR, yFin - yDebut, 4)
      .lineWidth(0.7).strokeColor(LINE).stroke().restore();
    doc.y = yFin + 12;
  }

  // ── Corps du document ──────────────────────────────────────────────────
  if (structure) {
    for (const s of structure.sections) {
      titreSection(doc, s.titre, accent);
      if (s.articles?.length) {
        for (const a of s.articles) {
          doc.font('Helvetica-Bold').fontSize(10).fillColor(INK)
            .text(a.titre, MARGIN.left, doc.y, { width: CONTENU_LARGEUR });
          doc.moveDown(0.2);
          paragraphe(doc, a.texte);
          doc.moveDown(0.3);
        }
      } else {
        paragraphe(doc, s.contenu);
      }
    }

    if (structure.clauses_speciales?.length) {
      titreSection(doc, 'Clauses spéciales', accent);
      structure.clauses_speciales.forEach((c, i) => {
        doc.font('Helvetica-Bold').fontSize(10).fillColor(accent)
          .text(`${i + 1}.`, MARGIN.left, doc.y, { continued: true, width: 20 });
        doc.font('Times-Roman').fontSize(10.5).fillColor(INK)
          .text(` ${c}`, { width: CONTENU_LARGEUR - 20, align: 'justify', lineGap: 2.2 });
        doc.moveDown(0.4);
      });
    }
  } else {
    // Repli : document rendu depuis le HTML
    for (const bloc of htmlEnBlocs(input.contentHtml)) {
      if (bloc.type === 'titre' || bloc.type === 'soustitre') titreSection(doc, bloc.texte, accent);
      else if (bloc.type === 'liste') {
        doc.font('Times-Roman').fontSize(10.5).fillColor(INK)
          .text(`•  ${bloc.texte}`, MARGIN.left + 10, doc.y, { width: CONTENU_LARGEUR - 10, align: 'justify', lineGap: 2.2 });
        doc.moveDown(0.25);
      } else paragraphe(doc, bloc.texte);
    }
  }

  // ── Signatures puis authenticité ───────────────────────────────────────
  const dateDoc = structure?.date_creation
    || new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long' }).format(input.createdAt);
  if (parties.length > 0) blocSignatures(doc, parties, pays || '—', dateDoc, accent);
  await blocAuthenticite(doc, input);

  // ── Pagination : écrite une fois le nombre de pages connu ──────────────
  const plage = doc.bufferedPageRange();
  for (let i = 0; i < plage.count; i++) {
    doc.switchToPage(plage.start + i);
    dessinerPied(doc, i + 1, plage.count, input);
  }

  doc.end();
  return fini;
}
