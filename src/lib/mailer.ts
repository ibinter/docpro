// ─────────────────────────────────────────────────────────────────────────────
// ENVOI D'EMAILS RÉELS VIA SMTP (nodemailer) — CDC §18.2 (email = priorité 1).
// Configuration par variables d'environnement :
//   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM
// Si SMTP_HOST est vide → mode console : l'email est simulé et loggé.
// GARANTIE : sendMail ne propage JAMAIS d'exception — un échec SMTP ne doit
// jamais casser un paiement ou une activation de licence.
// ─────────────────────────────────────────────────────────────────────────────
import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

let cached: Transporter | null | undefined; // undefined = pas encore initialisé

function getTransporter(): Transporter | null {
  if (cached !== undefined) return cached;
  const host = (process.env.SMTP_HOST ?? '').trim();
  if (!host) {
    cached = null; // mode console
    return cached;
  }
  const port = parseInt(process.env.SMTP_PORT || '587', 10) || 587;
  const user = (process.env.SMTP_USER ?? '').trim();
  cached = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // TLS implicite sur 465, STARTTLS sinon
    auth: user ? { user, pass: process.env.SMTP_PASS ?? '' } : undefined,
  });
  return cached;
}

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Convertit un texte brut (avec retours à la ligne) en HTML sûr. */
export function textToHtml(text: string): string {
  return escapeHtml(text).replace(/\r?\n/g, '<br/>');
}

/** Gabarit email sobre aux couleurs de la charte IBIG (navy #0D2B4E, or #D4A017). */
function emailLayout(subject: string, contentHtml: string): string {
  return `<div style="background:#F5F7FA;padding:24px 12px;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#FFFFFF;border-radius:8px;overflow:hidden;border:1px solid #E0E6ED;">
    <tr>
      <td style="background:#0D2B4E;padding:20px 28px;">
        <span style="color:#D4A017;font-size:20px;font-weight:bold;letter-spacing:0.5px;">IBIG DocPro</span><br/>
        <span style="color:#FFFFFF;font-size:11px;">G&eacute;n&eacute;ration intelligente de documents</span>
      </td>
    </tr>
    <tr>
      <td style="padding:28px;">
        <h2 style="margin:0 0 16px;color:#0D2B4E;font-size:17px;">${escapeHtml(subject)}</h2>
        <div style="color:#333333;font-size:14px;line-height:1.6;">${contentHtml}</div>
      </td>
    </tr>
    <tr>
      <td style="padding:16px 28px;border-top:3px solid #D4A017;background:#F5F7FA;">
        <p style="margin:0;color:#546E7A;font-size:11px;line-height:1.6;">
          IBIG DocPro &mdash; docpro.ibigsoft.com &mdash; docpro@ibigsoft.com<br/>
          +225 22 27 60 14&nbsp;|&nbsp;+225 05 55 05 99 01<br/>
          Message automatique &mdash; merci de ne pas r&eacute;pondre directement &agrave; cet email.
        </p>
      </td>
    </tr>
  </table>
</div>`;
}

/**
 * Envoie un email HTML habillé du gabarit IBIG.
 * `html` est le CONTENU (déjà en HTML) — le gabarit (bandeau, pied de page) est ajouté ici.
 * Retourne true si l'envoi a réussi (ou a été simulé), false en cas d'échec.
 * Ne lève jamais d'exception.
 */
export async function sendMail(params: { to: string; subject: string; html: string }): Promise<boolean> {
  const { to, subject, html } = params;
  try {
    const transporter = getTransporter();
    if (!transporter) {
      // Mode console — aucun SMTP configuré.
      console.log(`[EMAIL simulé] → ${to} | ${subject}`);
      return true;
    }
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'IBIG DocPro <docpro@ibigsoft.com>',
      to,
      subject,
      html: emailLayout(subject, html),
    });
    return true;
  } catch (e) {
    console.error(`[mailer] Échec d'envoi à ${to} (« ${subject} ») :`, e);
    return false;
  }
}
