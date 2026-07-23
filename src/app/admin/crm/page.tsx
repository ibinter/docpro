// CRM Démonstrations — liste + gestion statut + notes admin.
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';
import { requireRole } from '@/lib/auth';
import { fmtDate, qs } from '../ui';

export const dynamic = 'force-dynamic';

const PER_PAGE = 30;

const STATUS_LABELS: Record<string, string> = {
  nouveau: 'Nouveau',
  contacte: 'Contacté',
  qualifie: 'Qualifié',
  demo_planifiee: 'Démo planifiée',
  converti: 'Converti ✓',
  perdu: 'Perdu',
};

const STATUS_COLORS: Record<string, string> = {
  nouveau: '#1565C0',
  contacte: '#6d4c41',
  qualifie: '#f57f17',
  demo_planifiee: '#6a1b9a',
  converti: '#2e7d32',
  perdu: '#c62828',
};

async function updateStatus(formData: FormData) {
  'use server';
  await requireRole('admin');
  const id = String(formData.get('id') ?? '');
  const status = String(formData.get('status') ?? '');
  const notesAdmin = String(formData.get('notesAdmin') ?? '').trim() || undefined;
  if (!id || !status) return;
  await prisma.demoRequest.update({
    where: { id },
    data: { status, ...(notesAdmin !== undefined ? { notesAdmin } : {}) },
  });
  revalidatePath('/admin/crm');
}

type SP = Promise<Record<string, string | string[] | undefined>>;

export default async function CrmPage({ searchParams }: { searchParams: SP }) {
  await requireRole('admin');
  const sp = await searchParams;
  const page = Math.max(1, parseInt(String(sp.page ?? '1'), 10));
  const status = String(sp.status ?? '');
  const q = String(sp.q ?? '').trim();

  const where = {
    ...(status ? { status } : {}),
    ...(q ? {
      OR: [
        { nom: { contains: q } },
        { email: { contains: q } },
        { entreprise: { contains: q } },
      ],
    } : {}),
  };

  const [total, rows] = await Promise.all([
    prisma.demoRequest.count({ where }),
    prisma.demoRequest.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * PER_PAGE,
      take: PER_PAGE,
    }),
  ]);

  const totalPages = Math.ceil(total / PER_PAGE);

  // Stats rapides
  const stats = await prisma.demoRequest.groupBy({ by: ['status'], _count: true });
  const countByStatus = Object.fromEntries(stats.map(s => [s.status, s._count]));

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: '1.3rem' }}>CRM — Demandes de démonstration</h1>
        <a href="/demonstration" target="_blank" rel="noopener noreferrer"
          style={{ fontSize: '.82rem', color: 'var(--cobalt)' }}>
          Voir le formulaire public ↗
        </a>
      </div>

      {/* Compteurs par statut */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
        {Object.entries(STATUS_LABELS).map(([s, label]) => (
          <a key={s} href={`/admin/crm?${qs({ status: s === status ? '' : s })}`}
            style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px',
              background: s === status ? STATUS_COLORS[s] : '#f0f2f5',
              color: s === status ? '#fff' : '#333',
              borderRadius: 20, fontSize: '.8rem', fontWeight: 600,
              textDecoration: 'none', border: `2px solid ${s === status ? STATUS_COLORS[s] : 'transparent'}`,
            }}>
            {label}
            <span style={{
              background: s === status ? 'rgba(255,255,255,.25)' : STATUS_COLORS[s],
              color: s === status ? '#fff' : '#fff',
              borderRadius: 10, padding: '1px 7px', fontSize: '.75rem', minWidth: 20, textAlign: 'center',
            }}>
              {countByStatus[s] ?? 0}
            </span>
          </a>
        ))}
      </div>

      {/* Barre de recherche */}
      <form method="GET" style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
        <input name="q" defaultValue={q} placeholder="Nom, email, entreprise…"
          style={{ flex: 1, minWidth: 200, padding: '8px 12px', border: '1px solid #dde', borderRadius: 7, fontSize: '.9rem' }} />
        {status && <input type="hidden" name="status" value={status} />}
        <button type="submit" className="btn btn-primary" style={{ padding: '8px 18px' }}>Rechercher</button>
        {(q || status) && (
          <a href="/admin/crm" className="btn" style={{ padding: '8px 14px', background: '#f5f5f5', color: '#555', textDecoration: 'none' }}>Réinitialiser</a>
        )}
      </form>

      <p style={{ fontSize: '.82rem', color: '#888', marginBottom: 12 }}>
        {total} demande{total > 1 ? 's' : ''} au total
        {status ? ` · filtre : ${STATUS_LABELS[status] ?? status}` : ''}
        {q ? ` · recherche : "${q}"` : ''}
      </p>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.85rem' }}>
          <thead>
            <tr style={{ background: '#f5f7fa', borderBottom: '2px solid #e0e6ed' }}>
              {['Date', 'Nom', 'Email', 'Tél.', 'Pays', 'Secteur', 'Niveau', 'Statut', 'Actions'].map(h => (
                <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 700, color: '#334', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((d) => (
              <DemoRow key={d.id} d={d} updateStatus={updateStatus} />
            ))}
            {rows.length === 0 && (
              <tr><td colSpan={9} style={{ padding: '32px', textAlign: 'center', color: '#aaa' }}>Aucune demande trouvée.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', gap: 8, marginTop: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <a key={p} href={`/admin/crm?${qs({ page: String(p), status, q })}`}
              style={{
                padding: '6px 14px', borderRadius: 6, fontSize: '.85rem', textDecoration: 'none',
                background: p === page ? 'var(--navy)' : '#f0f2f5',
                color: p === page ? '#fff' : '#333',
              }}>
              {p}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

type DemoRow = Awaited<ReturnType<typeof prisma.demoRequest.findMany>>[number];

function DemoRow({ d, updateStatus }: { d: DemoRow; updateStatus: (fd: FormData) => Promise<void> }) {
  return (
    <tr style={{ borderBottom: '1px solid #eef0f3' }}>
      <td style={{ padding: '10px 12px', whiteSpace: 'nowrap', color: '#888', fontSize: '.8rem' }}>{fmtDate(d.createdAt)}</td>
      <td style={{ padding: '10px 12px', fontWeight: 600 }}>
        {d.nom}
        {d.entreprise && <div style={{ fontSize: '.78rem', color: '#888', fontWeight: 400 }}>{d.entreprise}</div>}
      </td>
      <td style={{ padding: '10px 12px' }}>
        <a href={`mailto:${d.email}`} style={{ color: 'var(--cobalt)', textDecoration: 'none' }}>{d.email}</a>
      </td>
      <td style={{ padding: '10px 12px', whiteSpace: 'nowrap' }}>
        {d.telephone ? (
          <a href={`tel:${d.telephone}`} style={{ color: '#555', textDecoration: 'none' }}>{d.telephone}</a>
        ) : '—'}
      </td>
      <td style={{ padding: '10px 12px' }}>{d.pays}</td>
      <td style={{ padding: '10px 12px', color: '#555', fontSize: '.8rem' }}>{d.secteur ?? '—'}</td>
      <td style={{ padding: '10px 12px', fontSize: '.8rem' }}>
        <span style={{
          background: '#e3f2fd', color: '#1565C0',
          padding: '2px 8px', borderRadius: 10, fontSize: '.75rem', fontWeight: 600,
        }}>
          {d.niveauInteret}
        </span>
      </td>
      <td style={{ padding: '10px 12px' }}>
        <span style={{
          background: STATUS_COLORS[d.status] + '20',
          color: STATUS_COLORS[d.status],
          padding: '3px 10px', borderRadius: 10, fontSize: '.78rem', fontWeight: 700,
          whiteSpace: 'nowrap',
        }}>
          {STATUS_LABELS[d.status] ?? d.status}
        </span>
      </td>
      <td style={{ padding: '10px 12px' }}>
        <details style={{ position: 'relative' }}>
          <summary style={{
            cursor: 'pointer', listStyle: 'none', padding: '5px 12px',
            background: '#f0f2f5', borderRadius: 6, fontSize: '.8rem', fontWeight: 600,
            userSelect: 'none',
          }}>
            ⚙ Gérer
          </summary>
          <div style={{
            position: 'absolute', right: 0, top: '100%', zIndex: 100,
            background: '#fff', border: '1px solid #dde', borderRadius: 10,
            padding: 16, minWidth: 280, boxShadow: '0 8px 24px rgba(0,0,0,.12)',
          }}>
            <form action={updateStatus}>
              <input type="hidden" name="id" value={d.id} />
              <div style={{ marginBottom: 10 }}>
                <label style={{ display: 'block', fontSize: '.78rem', fontWeight: 700, marginBottom: 4, color: '#334' }}>Statut</label>
                <select name="status" defaultValue={d.status}
                  style={{ width: '100%', padding: '7px 10px', border: '1px solid #dde', borderRadius: 6, fontSize: '.85rem' }}>
                  {Object.entries(STATUS_LABELS).map(([s, l]) => (
                    <option key={s} value={s}>{l}</option>
                  ))}
                </select>
              </div>
              <div style={{ marginBottom: 12 }}>
                <label style={{ display: 'block', fontSize: '.78rem', fontWeight: 700, marginBottom: 4, color: '#334' }}>Notes internes</label>
                <textarea name="notesAdmin" defaultValue={d.notesAdmin ?? ''} rows={3}
                  placeholder="Observations, dates de contact, prochaines étapes…"
                  style={{ width: '100%', padding: '7px 10px', border: '1px solid #dde', borderRadius: 6, fontSize: '.82rem', resize: 'vertical', boxSizing: 'border-box' }} />
              </div>
              {d.besoins && (
                <div style={{ background: '#f9f9f9', borderRadius: 6, padding: '8px 10px', fontSize: '.78rem', color: '#555', marginBottom: 10 }}>
                  <strong>Besoins déclarés :</strong><br />{d.besoins}
                </div>
              )}
              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '8px' }}>
                Enregistrer
              </button>
            </form>
          </div>
        </details>
      </td>
    </tr>
  );
}
