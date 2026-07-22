// Configuration des modèles de notifications (CDC §18.2) — SUPERADMIN, audité.
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';
import { getSessionUser, requireRole } from '@/lib/auth';
import { audit } from '@/lib/audit';
import { sendMail, textToHtml } from '@/lib/mailer';

export const dynamic = 'force-dynamic';

// Événements connus du système (CDC §18.2 — déclencheurs de notifications).
const EVENTS: { code: string; label: string }[] = [
  { code: 'commande_creee', label: 'Commande créée' },
  { code: 'paiement_reussi', label: 'Paiement réussi' },
  { code: 'preuve_recue', label: 'Preuve de paiement reçue' },
  { code: 'preuve_rejetee', label: 'Preuve rejetée' },
  { code: 'licence_activee', label: 'Licence activée' },
  { code: 'licence_provisoire', label: 'Licence provisoire activée' },
  { code: 'licence_suspendue', label: 'Licence suspendue' },
  { code: 'expiration_j7', label: 'Expiration dans 7 jours' },
  { code: 'expiration_j3', label: 'Expiration dans 3 jours' },
  { code: 'expiration_j1', label: 'Expiration dans 1 jour' },
  { code: 'essai_demarre', label: 'Essai démarré' },
  { code: 'essai_expire', label: 'Essai expiré' },
];

const EVENT_LABELS = Object.fromEntries(EVENTS.map((e) => [e.code, e.label]));

function fields(formData: FormData) {
  return {
    event: String(formData.get('event') ?? '').trim(),
    language: String(formData.get('language') ?? 'fr').trim() || 'fr',
    channel: String(formData.get('channel') ?? 'email').trim() || 'email',
    subject: String(formData.get('subject') ?? '').trim(),
    body: String(formData.get('body') ?? '').trim(),
  };
}

async function createTemplate(formData: FormData) {
  'use server';
  const admin = await requireRole('superadmin');
  const data = fields(formData);
  if (!data.event || !data.subject || !data.body) return;
  const existing = await prisma.notificationTemplate.findUnique({
    where: { event_language_channel: { event: data.event, language: data.language, channel: data.channel } },
  });
  if (existing) return; // doublon (event, langue, canal) — ignoré
  const created = await prisma.notificationTemplate.create({ data });
  await audit({
    actorId: admin.id,
    action: 'config.notification_template_create',
    entityType: 'NotificationTemplate',
    entityId: created.id,
    after: data,
    reason: 'Création de modèle de notification',
  });
  revalidatePath('/admin/config/notifications');
}

async function updateTemplate(formData: FormData) {
  'use server';
  const admin = await requireRole('superadmin');
  const id = String(formData.get('id') ?? '');
  const before = await prisma.notificationTemplate.findUnique({ where: { id } });
  if (!before) return;
  const subject = String(formData.get('subject') ?? '').trim();
  const body = String(formData.get('body') ?? '').trim();
  if (!subject || !body) return;
  await prisma.notificationTemplate.update({ where: { id }, data: { subject, body } });
  await audit({
    actorId: admin.id,
    action: 'config.notification_template_update',
    entityType: 'NotificationTemplate',
    entityId: id,
    before: { subject: before.subject, body: before.body },
    after: { subject, body },
    reason: 'Mise à jour de modèle de notification',
  });
  revalidatePath('/admin/config/notifications');
}

async function deleteTemplate(formData: FormData) {
  'use server';
  const admin = await requireRole('superadmin');
  const id = String(formData.get('id') ?? '');
  const before = await prisma.notificationTemplate.findUnique({ where: { id } });
  if (!before) return;
  await prisma.notificationTemplate.delete({ where: { id } });
  await audit({
    actorId: admin.id,
    action: 'config.notification_template_delete',
    entityType: 'NotificationTemplate',
    entityId: id,
    before: { event: before.event, language: before.language, channel: before.channel, subject: before.subject },
    reason: 'Suppression de modèle de notification',
  });
  revalidatePath('/admin/config/notifications');
}

async function sendTestEmail(formData: FormData) {
  'use server';
  const admin = await requireRole('superadmin');
  const id = String(formData.get('id') ?? '');
  const tpl = await prisma.notificationTemplate.findUnique({ where: { id } });
  if (!tpl) return;
  // Interpolation avec valeurs d'exemple.
  const vars: Record<string, string> = {
    name: admin.name,
    plan: 'PRO (exemple)',
    end: new Date().toLocaleDateString('fr-FR'),
    title: tpl.subject,
    body: '(contenu d’exemple)',
  };
  const interpolate = (s: string) => s.replace(/\{\{\s*(\w+)\s*\}\}/g, (_m, k: string) => vars[k] ?? '');
  await sendMail({
    to: admin.email,
    subject: `[TEST] ${interpolate(tpl.subject)}`,
    html: textToHtml(interpolate(tpl.body)),
  });
  await audit({
    actorId: admin.id,
    action: 'config.notification_template_test',
    entityType: 'NotificationTemplate',
    entityId: id,
    after: { to: admin.email },
    reason: 'Envoi d’un email de test',
  });
}

export default async function NotificationTemplatesPage() {
  const me = await getSessionUser();
  if (!me || me.role !== 'superadmin') redirect('/admin');

  const templates = await prisma.notificationTemplate.findMany({
    orderBy: [{ event: 'asc' }, { language: 'asc' }, { channel: 'asc' }],
  });
  const grouped = new Map<string, typeof templates>();
  for (const t of templates) {
    const list = grouped.get(t.event) ?? [];
    list.push(t);
    grouped.set(t.event, list);
  }

  return (
    <>
      <h1 className="mb-2">Configuration — Modèles de notifications</h1>

      <div className="alert alert-info mb-3">
        Variables disponibles dans le sujet et le corps : <code>{'{{name}}'}</code> (nom du client),{' '}
        <code>{'{{plan}}'}</code> (forfait), <code>{'{{end}}'}</code> (date de fin),{' '}
        <code>{'{{title}}'}</code> et <code>{'{{body}}'}</code> (titre / corps par défaut de l’événement).
        Sans modèle pour un événement, un email générique (titre + corps) est envoyé.
      </div>

      <div className="card mb-3">
        <div className="card-title">Créer un modèle</div>
        <form action={createTemplate}>
          <div className="grid grid-3 mb-2" style={{ gap: 12 }}>
            <div>
              <label className="label">Événement *</label>
              <select className="select" name="event" required defaultValue="">
                <option value="" disabled>— Choisir —</option>
                {EVENTS.map((e) => (
                  <option key={e.code} value={e.code}>{e.label} ({e.code})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Langue *</label>
              <select className="select" name="language" defaultValue="fr">
                <option value="fr">Français (fr)</option>
                <option value="en">Anglais (en)</option>
              </select>
            </div>
            <div>
              <label className="label">Canal *</label>
              <select className="select" name="channel" defaultValue="email">
                <option value="email">Email</option>
                <option value="interne">Interne</option>
              </select>
            </div>
          </div>
          <div className="mb-2">
            <label className="label">Sujet *</label>
            <input className="input" name="subject" required placeholder="Votre licence {{plan}} est activée" />
          </div>
          <div className="mb-2">
            <label className="label">Corps *</label>
            <textarea className="textarea" name="body" required rows={4}
              placeholder={'Bonjour {{name}},\nVotre forfait {{plan}} est actif jusqu’au {{end}}.'} />
          </div>
          <button className="btn btn-primary" type="submit">Créer le modèle</button>
        </form>
      </div>

      {templates.length === 0 && (
        <div className="card"><p className="text-muted text-center">Aucun modèle défini — les emails utilisent le format générique titre + corps.</p></div>
      )}

      {[...grouped.entries()].map(([event, list]) => (
        <div className="card mb-3" key={event}>
          <div className="card-title">
            {EVENT_LABELS[event] ?? event} <span className="text-muted text-small">({event})</span>
          </div>
          {list.map((t) => (
            <details key={t.id} style={{ borderTop: '1px solid #E0E6ED', padding: '10px 0' }}>
              <summary style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <span className="badge badge-info">{t.language}</span>
                <span className={`badge ${t.channel === 'email' ? 'badge-gold' : 'badge-neutral'}`}>{t.channel}</span>
                <strong>{t.subject}</strong>
              </summary>
              <form action={updateTemplate} style={{ marginTop: 12 }}>
                <input type="hidden" name="id" value={t.id} />
                <div className="mb-2">
                  <label className="label">Sujet</label>
                  <input className="input" name="subject" defaultValue={t.subject} required />
                </div>
                <div className="mb-2">
                  <label className="label">Corps</label>
                  <textarea className="textarea" name="body" defaultValue={t.body} required rows={5} />
                </div>
                <button className="btn btn-primary btn-sm" type="submit">Enregistrer</button>
              </form>
              <div className="flex" style={{ gap: 8, marginTop: 8 }}>
                <form action={sendTestEmail}>
                  <input type="hidden" name="id" value={t.id} />
                  <button className="btn btn-outline btn-sm" type="submit">Email de test (vers {me.email})</button>
                </form>
                <form action={deleteTemplate}>
                  <input type="hidden" name="id" value={t.id} />
                  <button className="btn btn-danger btn-sm" type="submit">Supprimer</button>
                </form>
              </div>
            </details>
          ))}
        </div>
      ))}
    </>
  );
}
