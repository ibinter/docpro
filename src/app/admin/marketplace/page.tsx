// Validation des templates marketplace (CDC §7.3) — file des soumissions.
// Approuver → création du DocumentTemplate (code mkt_*) + notification créateur.
// Rejeter → note obligatoire + notification créateur. Tout est audité.
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';
import { requireRole } from '@/lib/auth';
import { audit } from '@/lib/audit';
import { notifyUser } from '@/lib/notify';
import { formatMoney } from '@/lib/money';
import { parseFields, renderTemplate } from '@/lib/docgen';
import { StatusBadge, fmtDateTime } from '../ui';
import { MARKETPLACE_CATEGORIES, MKT_CODE_PREFIX } from '../../marketplace/categories';

export const dynamic = 'force-dynamic';

// ── Server actions ────────────────────────────────────────────────────────────

/** Slug court depuis le nom (minuscules, sans accents, underscores). */
function slugify(name: string): string {
  return name
    .normalize('NFD')
    .replace(new RegExp('[\\u0300-\\u036f]', 'g'), '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 40) || 'template';
}

/** Code mkt_* unique (suffixe numérique en cas de collision). */
async function uniqueMktCode(name: string): Promise<string> {
  const base = `${MKT_CODE_PREFIX}${slugify(name)}`;
  let code = base;
  for (let i = 2; i < 100; i++) {
    const existing = await prisma.documentTemplate.findUnique({ where: { code } });
    if (!existing) return code;
    code = `${base}_${i}`;
  }
  return `${base}_${Date.now().toString(36)}`;
}

async function approveSubmission(formData: FormData) {
  'use server';
  const admin = await requireRole('admin');
  const id = String(formData.get('id') ?? '');
  if (!id) return;
  const sub = await prisma.templateSubmission.findUnique({ where: { id } });
  if (!sub || sub.status !== 'soumis') return;

  const code = await uniqueMktCode(sub.name);
  const template = await prisma.documentTemplate.create({
    data: {
      code,
      name: sub.name,
      category: sub.category,
      description: sub.description,
      price: sub.price,
      currency: 'XOF',
      fieldsJson: sub.fieldsJson,
      body: sub.body,
      active: true,
    },
  });
  await prisma.templateSubmission.update({
    where: { id },
    data: { status: 'approuve', templateId: template.id, reviewedById: admin.id },
  });
  await notifyUser({
    userId: sub.authorId,
    event: 'template_approuve',
    title: 'Votre template a été approuvé 🎉',
    body: `Votre template « ${sub.name} » est maintenant publié sur la marketplace au prix de ${formatMoney(sub.price)}. Vous toucherez 30 % de chaque vente.`,
  });
  await audit({
    actorId: admin.id,
    action: 'marketplace.approve',
    entityType: 'TemplateSubmission',
    entityId: id,
    before: { status: 'soumis' },
    after: { status: 'approuve', templateId: template.id, code },
  });
  revalidatePath('/admin/marketplace');
}

async function rejectSubmission(formData: FormData) {
  'use server';
  const admin = await requireRole('admin');
  const id = String(formData.get('id') ?? '');
  const note = String(formData.get('note') ?? '').trim();
  if (!id || !note) return; // note obligatoire
  const sub = await prisma.templateSubmission.findUnique({ where: { id } });
  if (!sub || sub.status !== 'soumis') return;

  await prisma.templateSubmission.update({
    where: { id },
    data: { status: 'rejete', reviewNote: note, reviewedById: admin.id },
  });
  await notifyUser({
    userId: sub.authorId,
    event: 'template_rejete',
    title: 'Votre template n’a pas été retenu',
    body: `Votre template « ${sub.name} » a été rejeté. Motif : ${note}. Vous pouvez le corriger et le soumettre à nouveau.`,
  });
  await audit({
    actorId: admin.id,
    action: 'marketplace.reject',
    entityType: 'TemplateSubmission',
    entityId: id,
    before: { status: 'soumis' },
    after: { status: 'rejete' },
    reason: note,
  });
  revalidatePath('/admin/marketplace');
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function AdminMarketplacePage() {
  await requireRole('admin');

  const [pending, decided] = await Promise.all([
    prisma.templateSubmission.findMany({
      where: { status: 'soumis' },
      orderBy: { createdAt: 'asc' },
    }),
    prisma.templateSubmission.findMany({
      where: { status: { in: ['approuve', 'rejete'] } },
      orderBy: { updatedAt: 'desc' },
      take: 20,
    }),
  ]);

  // Auteurs (pas de relation Prisma → jointure manuelle).
  const authorIds = [...new Set([...pending, ...decided].map((s) => s.authorId))];
  const authors = authorIds.length
    ? await prisma.user.findMany({
        where: { id: { in: authorIds } },
        select: { id: true, name: true, email: true },
      })
    : [];
  const authorMap = new Map(authors.map((a) => [a.id, a]));

  return (
    <>
      <h1 className="mb-1">Marketplace — validation des templates</h1>
      <p className="text-muted mb-3">
        Templates soumis par les créateurs indépendants. Approuver publie le template
        (code <code>mkt_*</code>, reversement 30 % au créateur) ; rejeter exige un motif.
      </p>

      <h2 className="mb-2">À valider ({pending.length})</h2>
      {pending.length === 0 && (
        <div className="card mb-3"><p className="text-muted">Aucune soumission en attente. ✅</p></div>
      )}
      <div className="grid mb-3" style={{ gap: 14 }}>
        {pending.map((s) => {
          const author = authorMap.get(s.authorId);
          const fields = parseFields(s.fieldsJson);
          // Aperçu : rendu du corps avec des valeurs factices [Libellé du champ].
          const dummy = Object.fromEntries(fields.map((f) => [f.key, `[${f.label}]`]));
          const preview = renderTemplate(s.body, dummy, fields);
          return (
            <div key={s.id} className="card">
              <div className="flex-between mb-1" style={{ flexWrap: 'wrap', gap: 8 }}>
                <div className="flex" style={{ flexWrap: 'wrap', gap: 8 }}>
                  <strong>{s.name}</strong>
                  <span className="badge badge-neutral">{MARKETPLACE_CATEGORIES[s.category] ?? s.category}</span>
                  <span className="badge badge-gold">{formatMoney(s.price)}</span>
                </div>
                <span className="text-small text-muted">{fmtDateTime(s.createdAt)}</span>
              </div>
              <p className="text-small text-muted mb-1">
                Créateur : <strong>{author?.name ?? '—'}</strong> ({author?.email ?? '—'}) —{' '}
                {fields.length} champ(s) : {fields.map((f) => f.key).join(', ') || '—'}
              </p>
              {s.description && <p className="text-small mb-1">{s.description}</p>}

              <details className="mb-2">
                <summary style={{ cursor: 'pointer', fontWeight: 600 }}>Aperçu du document (valeurs factices)</summary>
                <div
                  className="card mt-1"
                  style={{ background: '#FAFAFA', maxHeight: 420, overflow: 'auto' }}
                  dangerouslySetInnerHTML={{ __html: preview }}
                />
              </details>

              <div className="flex" style={{ flexWrap: 'wrap', alignItems: 'flex-end', gap: 10 }}>
                <form action={approveSubmission}>
                  <input type="hidden" name="id" value={s.id} />
                  <button className="btn btn-success btn-sm" type="submit">✓ Approuver et publier</button>
                </form>
                <form action={rejectSubmission} className="flex" style={{ flexWrap: 'wrap', alignItems: 'flex-end', gap: 8 }}>
                  <input type="hidden" name="id" value={s.id} />
                  <div>
                    <label className="label text-small">Motif du rejet *</label>
                    <input className="input" name="note" required placeholder="Motif obligatoire" style={{ width: 260 }} />
                  </div>
                  <button className="btn btn-danger btn-sm" type="submit">Rejeter</button>
                </form>
              </div>
            </div>
          );
        })}
      </div>

      <h2 className="mb-2">Décisions récentes</h2>
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Template</th>
              <th>Créateur</th>
              <th>Prix</th>
              <th>Statut</th>
              <th>Note</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {decided.length === 0 && (
              <tr><td colSpan={6} className="text-center text-muted">Aucune décision.</td></tr>
            )}
            {decided.map((s) => (
              <tr key={s.id}>
                <td><strong>{s.name}</strong></td>
                <td className="text-small">{authorMap.get(s.authorId)?.email ?? '—'}</td>
                <td>{formatMoney(s.price)}</td>
                <td><StatusBadge status={s.status} /></td>
                <td className="text-small">{s.reviewNote ?? '—'}</td>
                <td className="text-small">{fmtDateTime(s.updatedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
