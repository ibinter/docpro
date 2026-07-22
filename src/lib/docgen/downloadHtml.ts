// ─────────────────────────────────────────────────────────────
// IBIG DocPro — Page HTML autonome de téléchargement (CDC §21)
// Document imprimable complet : styles inline, bouton Imprimer/PDF,
// QR code d'authenticité (couche 2), filigrane invisible (couche 1).
// ─────────────────────────────────────────────────────────────
import { escapeHtml } from './index';

type DownloadDoc = {
  title: string;
  contentHtml: string;
  watermarkId: string;
  verifyCode: string;
  createdAt: Date;
  templateName: string;
};

/** Branding White Label (CDC §6.2) — organisation du propriétaire du document. */
export type DownloadBranding = {
  displayName: string;
  logoUrl: string | null;
  primaryColor: string | null;
};

/**
 * Construit la page HTML imprimable autonome servie par le lien sécurisé.
 * `branding` (optionnel) : si l'organisation du propriétaire a un branding actif,
 * l'en-tête (bandeau) affiche son nom/logo et ses couleurs de titres — le pied de
 * page de vérification IBIG (QR + docpro.ibigsoft.com/verify) est TOUJOURS conservé :
 * l'authenticité reste garantie par IBIG.
 */
export function buildDownloadHtml(
  doc: DownloadDoc,
  qrDataUrl: string,
  verifyUrl: string,
  branding: DownloadBranding | null = null,
): string {
  const generatedAt = new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(doc.createdAt);

  // Couleurs : défaut charte IBIG ; primaryColor du branding pour les titres/bandeau.
  const titleColor = branding?.primaryColor ?? '#0D2B4E';
  const headerBg = branding?.primaryColor ?? '#0D2B4E';
  const brandTitle = branding ? branding.displayName : 'IBIG DocPro';
  const toolbarBrand = branding
    ? `${
        branding.logoUrl
          ? `<img src="${escapeHtml(branding.logoUrl)}" alt="" style="height:28px;vertical-align:middle;margin-right:10px;border-radius:4px;background:#fff;padding:2px;"/>`
          : ''
      }<strong>${escapeHtml(branding.displayName)} — Document authentique</strong>`
    : `<strong>IBIG <em>DocPro</em> — Document authentique</strong>`;

  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>${escapeHtml(doc.title)} — ${escapeHtml(brandTitle)}</title>
<!-- docpro:watermark:${doc.watermarkId} -->
<meta name="docpro-watermark" content="${doc.watermarkId}"/>
<meta name="docpro-generated" content="${doc.createdAt.toISOString()}"/>
<meta name="robots" content="noindex, nofollow"/>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #F5F7FA; font-family: Georgia, 'Times New Roman', serif; color: #1A1A2E; line-height: 1.65; }
  .toolbar { background: ${headerBg}; color: #fff; padding: 12px 24px; display: flex; justify-content: space-between; align-items: center; font-family: 'Segoe UI', Arial, sans-serif; }
  .toolbar strong em { color: #FFD54F; font-style: normal; }
  .toolbar button { background: #D4A017; color: #0D2B4E; border: none; border-radius: 8px; padding: 10px 22px; font-weight: 700; font-size: 0.95rem; cursor: pointer; font-family: inherit; }
  .toolbar button:hover { background: #FFD54F; }
  .sheet { background: #fff; max-width: 800px; margin: 32px auto; padding: 56px 60px; box-shadow: 0 8px 30px rgba(13,43,78,0.14); border-radius: 4px; }
  .sheet h1 { color: ${titleColor}; text-align: center; font-size: 1.5rem; letter-spacing: 0.5px; margin-bottom: 24px; }
  .sheet h2 { color: ${titleColor}; font-size: 1.1rem; margin: 22px 0 8px; }
  .sheet h3 { color: ${titleColor}; font-size: 1rem; margin: 16px 0 6px; }
  .sheet p { margin: 10px 0; }
  .sheet .align-right { text-align: right; }
  .sheet .signatures { margin-top: 56px; display: block; text-align: center; letter-spacing: 1px; }
  .sheet .cv-title { text-align: center; color: #1565C0; font-weight: 700; }
  .sheet .cv-contact { text-align: center; color: #546E7A; font-size: 0.92rem; }
  .sheet .facture-parties { display: flex; justify-content: space-between; gap: 24px; margin: 18px 0; }
  .sheet .text-small { font-size: 0.85rem; color: #546E7A; }
  .doc-footer { max-width: 800px; margin: 0 auto 48px; padding: 20px 60px; display: flex; align-items: center; gap: 18px; border-top: 2px solid #0D2B4E; background: #fff; box-shadow: 0 8px 30px rgba(13,43,78,0.10); border-radius: 4px; font-family: 'Segoe UI', Arial, sans-serif; }
  .doc-footer img { width: 96px; height: 96px; flex-shrink: 0; }
  .doc-footer .auth { font-size: 0.85rem; color: #546E7A; }
  .doc-footer .auth strong { color: #0D2B4E; display: block; margin-bottom: 4px; font-size: 0.95rem; }
  .doc-footer .auth a { color: #1565C0; word-break: break-all; }
  @media print {
    body { background: #fff; }
    .toolbar { display: none; }
    .sheet, .doc-footer { box-shadow: none; margin: 0 auto; border-radius: 0; }
    .doc-footer { page-break-inside: avoid; }
  }
</style>
</head>
<body>
<div class="toolbar">
  <span>${toolbarBrand}</span>
  <button onclick="window.print()">🖨️ Imprimer / PDF</button>
</div>
<main class="sheet">
${doc.contentHtml}
</main>
<footer class="doc-footer">
  <img src="${qrDataUrl}" alt="QR code de vérification d'authenticité"/>
  <div class="auth">
    <strong>Document authentique IBIG DocPro — vérifiez sur docpro.ibigsoft.com/verify</strong>
    ${escapeHtml(doc.templateName)} · généré le ${escapeHtml(generatedAt)}<br/>
    Scannez le QR code ou visitez <a href="${escapeHtml(verifyUrl)}">${escapeHtml(verifyUrl)}</a><br/>
    Code de vérification : <code>${escapeHtml(doc.verifyCode)}</code>
  </div>
</footer>
<!-- IBIG DocPro — traçabilité : ${doc.watermarkId} -->
</body>
</html>`;
}
