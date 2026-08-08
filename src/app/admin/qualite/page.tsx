// Tableau de bord Qualité IA — scores QC, coûts et performances de génération.
import { prisma } from '@/lib/db';
import { requireRole } from '@/lib/auth';
import { fmtDate } from '../ui';

export const dynamic = 'force-dynamic';

const JOURS = 30;

const NIVEAU_LABELS: Record<string, string> = { standard: 'Standard', pro: 'Pro', expert: 'Expert' };

const CATEGORY_LABELS: Record<string, string> = {
  commercial: 'Commercial', juridique_admin: 'Juridique', agro_environnement: 'Agro',
  sante: 'Santé', association: 'Association', btp_construction: 'BTP', rh_emploi: 'RH',
  informatique_tech: 'Tech', academique: 'Académique', transport_logistique: 'Transport',
  finance_banque: 'Finance', immobilier: 'Immobilier', comptabilite_audit: 'Compta',
  communication: 'Communication', entrepreneuriat: 'Entrepreneuriat',
  gestion_management: 'Management', assurance: 'Assurance', qhse: 'QHSE', gestion_projet: 'Projet',
};

function scoreColor(score: number): string {
  if (score >= 85) return '#2e7d32';
  if (score >= 70) return '#f57f17';
  return '#c62828';
}

function ScoreBadge({ score }: { score: number }) {
  return (
    <span style={{
      background: scoreColor(score) + '18', color: scoreColor(score),
      padding: '2px 10px', borderRadius: 10, fontWeight: 700, fontSize: '.85rem',
    }}>
      {score}/100
    </span>
  );
}

function Bar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div style={{ background: '#eef0f3', borderRadius: 6, height: 10, flex: 1, overflow: 'hidden' }}>
      <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: 6 }} />
    </div>
  );
}

export default async function QualitePage() {
  await requireRole('admin');
  const depuis = new Date(Date.now() - JOURS * 24 * 3600 * 1000);

  const [docs, logs] = await Promise.all([
    prisma.generatedDocument.findMany({
      where: { createdAt: { gte: depuis } },
      select: {
        id: true, title: true, qualityScore: true, niveau: true, paid: true,
        createdAt: true, template: { select: { category: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: 2000,
    }),
    prisma.generationLog.findMany({
      where: { createdAt: { gte: depuis } },
      select: { status: true, durationMs: true, costFcfa: true, tokensIn: true, tokensOut: true, niveau: true },
      take: 5000,
    }),
  ]);

  // ── KPIs globaux ────────────────────────────────────────────────
  const scored = docs.filter(d => d.qualityScore !== null) as (typeof docs[number] & { qualityScore: number })[];
  const avg = scored.length ? Math.round(scored.reduce((s, d) => s + d.qualityScore, 0) / scored.length) : 0;
  const faibles = scored.filter(d => d.qualityScore < 70);
  const payes = docs.filter(d => d.paid).length;

  const okLogs = logs.filter(l => l.status === 'success');
  const avgDuree = okLogs.length ? Math.round(okLogs.reduce((s, l) => s + l.durationMs, 0) / okLogs.length / 1000 * 10) / 10 : 0;
  const coutTotal = logs.reduce((s, l) => s + l.costFcfa, 0);
  const tokensTotal = logs.reduce((s, l) => s + l.tokensIn + l.tokensOut, 0);
  const tauxErreur = logs.length ? Math.round((logs.filter(l => l.status !== 'success').length / logs.length) * 100) : 0;

  // ── Score moyen par niveau ─────────────────────────────────────
  const parNiveau = ['standard', 'pro', 'expert'].map(n => {
    const list = scored.filter(d => d.niveau === n);
    return {
      niveau: n,
      count: list.length,
      avg: list.length ? Math.round(list.reduce((s, d) => s + d.qualityScore, 0) / list.length) : null,
    };
  });

  // ── Score moyen par catégorie (top volumes) ────────────────────
  const catMap = new Map<string, { sum: number; count: number }>();
  for (const d of scored) {
    const c = d.template.category;
    const e = catMap.get(c) ?? { sum: 0, count: 0 };
    e.sum += d.qualityScore; e.count++;
    catMap.set(c, e);
  }
  const parCategorie = [...catMap.entries()]
    .map(([cat, e]) => ({ cat, avg: Math.round(e.sum / e.count), count: e.count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 12);

  // ── Distribution des scores ────────────────────────────────────
  const buckets = [
    { label: '90-100', min: 90, max: 100, color: '#2e7d32' },
    { label: '80-89', min: 80, max: 89, color: '#66bb6a' },
    { label: '70-79', min: 70, max: 79, color: '#f57f17' },
    { label: '50-69', min: 50, max: 69, color: '#ef6c00' },
    { label: '0-49', min: 0, max: 49, color: '#c62828' },
  ].map(b => ({ ...b, count: scored.filter(d => d.qualityScore >= b.min && d.qualityScore <= b.max).length }));
  const bucketMax = Math.max(1, ...buckets.map(b => b.count));

  // ── Documents faibles récents ──────────────────────────────────
  const faiblesRecents = faibles.slice(0, 10);

  const kpi = (label: string, value: string, sub?: string) => (
    <div style={{ background: '#fff', border: '1px solid #e0e6ed', borderRadius: 10, padding: '16px 20px', flex: '1 1 160px' }}>
      <div style={{ fontSize: '.78rem', color: '#888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.04em' }}>{label}</div>
      <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--navy)', margin: '4px 0 2px' }}>{value}</div>
      {sub && <div style={{ fontSize: '.75rem', color: '#aaa' }}>{sub}</div>}
    </div>
  );

  return (
    <div>
      <h1 style={{ fontSize: '1.3rem', marginBottom: 4 }}>Qualité IA — {JOURS} derniers jours</h1>
      <p style={{ color: '#888', fontSize: '.85rem', marginBottom: 24 }}>
        Scores du contrôle qualité post-génération, coûts et performances du moteur documentaire.
      </p>

      {/* KPIs */}
      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 28 }}>
        {kpi('Documents générés', String(docs.length), `${payes} payés`)}
        {kpi('Score qualité moyen', scored.length ? `${avg}/100` : '—', `${scored.length} docs notés`)}
        {kpi('Docs < 70/100', String(faibles.length), scored.length ? `${Math.round(faibles.length / scored.length * 100)} % du total noté` : undefined)}
        {kpi('Durée moyenne', `${avgDuree} s`, 'génération + QC')}
        {kpi('Coût IA total', `${coutTotal.toLocaleString('fr-FR')} F`, `${Math.round(tokensTotal / 1000).toLocaleString('fr-FR')} k tokens`)}
        {kpi('Taux d’erreur', `${tauxErreur} %`, `${logs.length} générations`)}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20, marginBottom: 28 }}>
        {/* Distribution des scores */}
        <div style={{ background: '#fff', border: '1px solid #e0e6ed', borderRadius: 10, padding: 20 }}>
          <h2 style={{ fontSize: '1rem', marginBottom: 16 }}>Distribution des scores</h2>
          {buckets.map(b => (
            <div key={b.label} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span style={{ width: 52, fontSize: '.8rem', color: '#555', fontWeight: 600 }}>{b.label}</span>
              <Bar value={b.count} max={bucketMax} color={b.color} />
              <span style={{ width: 36, fontSize: '.8rem', color: '#888', textAlign: 'right' }}>{b.count}</span>
            </div>
          ))}
          {scored.length === 0 && <p style={{ color: '#aaa', fontSize: '.85rem' }}>Aucun document noté sur la période.</p>}
        </div>

        {/* Par niveau */}
        <div style={{ background: '#fff', border: '1px solid #e0e6ed', borderRadius: 10, padding: 20 }}>
          <h2 style={{ fontSize: '1rem', marginBottom: 16 }}>Score moyen par niveau</h2>
          {parNiveau.map(n => (
            <div key={n.niveau} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <span style={{ width: 80, fontSize: '.85rem', fontWeight: 600, color: '#334' }}>{NIVEAU_LABELS[n.niveau]}</span>
              {n.avg !== null ? (
                <>
                  <Bar value={n.avg} max={100} color={scoreColor(n.avg)} />
                  <ScoreBadge score={n.avg} />
                  <span style={{ fontSize: '.75rem', color: '#aaa', width: 60 }}>{n.count} docs</span>
                </>
              ) : (
                <span style={{ color: '#bbb', fontSize: '.85rem' }}>aucun document</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Par catégorie */}
      <div style={{ background: '#fff', border: '1px solid #e0e6ed', borderRadius: 10, padding: 20, marginBottom: 28 }}>
        <h2 style={{ fontSize: '1rem', marginBottom: 16 }}>Score moyen par catégorie (volumes les plus élevés)</h2>
        {parCategorie.length === 0 && <p style={{ color: '#aaa', fontSize: '.85rem' }}>Aucune donnée.</p>}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '10px 24px' }}>
          {parCategorie.map(c => (
            <div key={c.cat} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 110, fontSize: '.82rem', color: '#555' }}>{CATEGORY_LABELS[c.cat] ?? c.cat}</span>
              <Bar value={c.avg} max={100} color={scoreColor(c.avg)} />
              <span style={{ fontSize: '.8rem', fontWeight: 700, color: scoreColor(c.avg), width: 30, textAlign: 'right' }}>{c.avg}</span>
              <span style={{ fontSize: '.72rem', color: '#aaa', width: 44 }}>{c.count} docs</span>
            </div>
          ))}
        </div>
      </div>

      {/* Documents faibles récents */}
      <div style={{ background: '#fff', border: '1px solid #e0e6ed', borderRadius: 10, padding: 20 }}>
        <h2 style={{ fontSize: '1rem', marginBottom: 4 }}>Documents à score faible (&lt; 70)</h2>
        <p style={{ color: '#888', fontSize: '.8rem', marginBottom: 14 }}>
          À examiner : modèles dont le prompt ou les données mériteraient une amélioration.
        </p>
        {faiblesRecents.length === 0 ? (
          <p style={{ color: '#2e7d32', fontSize: '.9rem', fontWeight: 600 }}>✓ Aucun document sous 70/100 sur la période.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.85rem' }}>
              <thead>
                <tr style={{ background: '#f5f7fa', borderBottom: '2px solid #e0e6ed' }}>
                  {['Date', 'Document', 'Catégorie', 'Niveau', 'Score', 'Payé'].map(h => (
                    <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 700, color: '#334' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {faiblesRecents.map(d => (
                  <tr key={d.id} style={{ borderBottom: '1px solid #eef0f3' }}>
                    <td style={{ padding: '8px 12px', whiteSpace: 'nowrap', color: '#888' }}>{fmtDate(d.createdAt)}</td>
                    <td style={{ padding: '8px 12px', fontWeight: 600 }}>{d.title}</td>
                    <td style={{ padding: '8px 12px', color: '#555' }}>{CATEGORY_LABELS[d.template.category] ?? d.template.category}</td>
                    <td style={{ padding: '8px 12px' }}>{NIVEAU_LABELS[d.niveau] ?? d.niveau}</td>
                    <td style={{ padding: '8px 12px' }}><ScoreBadge score={d.qualityScore} /></td>
                    <td style={{ padding: '8px 12px' }}>{d.paid ? '✓' : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
