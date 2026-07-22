// ─────────────────────────────────────────────────────────────────────────────
// SYSTÈME DE NOTIFICATIONS MULTI-CANAUX (CDC §18.2).
// 1. Notification interne en BDD (toujours, bloquante — fait partie du flux métier).
// 2. Email réel via SMTP (best-effort, asynchrone, jamais bloquant) :
//    - modèle NotificationTemplate (event, langue utilisateur → fallback 'fr', canal 'email')
//    - interpolation {{name}} {{plan}} {{end}} {{title}} {{body}}
//    - sans modèle → email générique titre + corps.
// Un échec email ne doit JAMAIS faire échouer un paiement ou une activation.
// ─────────────────────────────────────────────────────────────────────────────
import { prisma } from './db';
import { sendMail, textToHtml } from './mailer';

/** Interpole les variables {{x}} d'un modèle. Variable inconnue → chaîne vide. */
function interpolate(template: string, vars: Record<string, string>): string {
  return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (_m, key: string) => vars[key] ?? '');
}

/** Cherche le modèle email pour (event, langue) avec repli sur 'fr'. */
async function findEmailTemplate(event: string, language: string) {
  const lookup = (lang: string) =>
    prisma.notificationTemplate.findUnique({
      where: { event_language_channel: { event, language: lang, channel: 'email' } },
    });
  const tpl = await lookup(language);
  if (tpl) return tpl;
  return language !== 'fr' ? lookup('fr') : null;
}

/** Envoi email à un utilisateur — best-effort, appelé en asynchrone. */
async function sendUserEmail(params: {
  userId: string;
  event: string;
  title: string;
  body: string;
  vars?: Record<string, string>;
}) {
  const user = await prisma.user.findUnique({
    where: { id: params.userId },
    select: { email: true, name: true, language: true },
  });
  if (!user?.email) return;

  const tpl = await findEmailTemplate(params.event, user.language || 'fr');
  // Variables manquantes → valeurs du titre/corps passés par l'appelant.
  const vars: Record<string, string> = {
    name: user.name,
    title: params.title,
    body: params.body,
    plan: '',
    end: '',
    ...params.vars,
  };
  const subject = tpl ? interpolate(tpl.subject, vars) : params.title;
  const bodyText = tpl ? interpolate(tpl.body, vars) : params.body;
  await sendMail({ to: user.email, subject, html: textToHtml(bodyText) });
}

/**
 * Notifie un utilisateur : notification interne (BDD) + email réel best-effort.
 * `vars` (optionnel) enrichit l'interpolation des modèles : {{plan}}, {{end}}…
 */
export async function notifyUser(params: {
  userId: string;
  event: string;
  title: string;
  body: string;
  channel?: string;
  vars?: Record<string, string>;
}) {
  await prisma.notification.create({
    data: {
      userId: params.userId,
      event: params.event,
      title: params.title,
      body: params.body,
      channel: params.channel ?? 'interne',
      sentAt: new Date(),
    },
  });
  // Envoi email best-effort — ne bloque jamais le flux appelant.
  void sendUserEmail(params).catch((e) =>
    console.error(`[notify] Email utilisateur ${params.userId} (${params.event}) échoué :`, e),
  );
}

/** Notifie les administrateurs : notification interne + email à tous les admin/superadmin. */
export async function notifyAdmins(params: { event: string; title: string; body: string }) {
  await prisma.notification.create({
    data: {
      forAdmin: true,
      event: params.event,
      title: params.title,
      body: params.body,
      channel: 'interne',
      sentAt: new Date(),
    },
  });
  // Emails admins best-effort, en asynchrone.
  void (async () => {
    const admins = await prisma.user.findMany({
      where: { role: { in: ['admin', 'superadmin'] } },
      select: { email: true },
    });
    await Promise.all(
      admins
        .filter((a) => a.email)
        .map((a) =>
          sendMail({
            to: a.email,
            subject: `[Admin] ${params.title}`,
            html: textToHtml(params.body),
          }),
        ),
    );
  })().catch((e) => console.error(`[notify] Emails admins (${params.event}) échoués :`, e));
}
