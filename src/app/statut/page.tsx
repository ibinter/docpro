import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/public/SiteFooter';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Statut des services — IBIG DocPro' };

async function getStats() {
  try {
    const [templates, recentDocs, recentCrons] = await Promise.all([
      prisma.documentTemplate.count({ where: { active: true } }),
      prisma.generatedDocument.count({ where: { createdAt: { gte: new Date(Date.now() - 24 * 3600_000) } } }),
      prisma.cronRun.findMany({ orderBy: { ranAt: 'desc' }, take: 5, select: { job: true, status: true, ranAt: true } }),
    ]);
    return { templates, recentDocs, recentCrons, online: true };
  } catch {
    return { templates: 0, recentDocs: 0, recentCrons: [], online: false };
  }
}

export default async function StatutPage() {
  const stats = await getStats();
  const allCronsOk = stats.recentCrons.every(c => c.status === 'ok');

  const SERVICES = [
    { nom: 'Plateforme web', statut: stats.online ? 'ok' : 'erreur', detail: "Accès à docpro.ibigsoft.com" },
    { nom: 'Génération de documents', statut: stats.online ? 'ok' : 'erreur', detail: `${stats.recentDocs} documents générés ces 24 dernières heures` },
    { nom: 'Paiements Mobile Money', statut: 'ok', detail: 'Orange Money · MTN MoMo · Wave · Moov Money' },
    { nom: 'Notifications & Emails', statut: stats.online ? 'ok' : 'degradé', detail: 'Envoi automatique des confirmations et alertes' },
    { nom: 'Tâches planifiées (Cron)', statut: allCronsOk ? 'ok' : 'degradé', detail: `Dernière exécution : ${stats.recentCrons[0]?.ranAt.toLocaleString('fr-FR') ?? 'N/A'}` },
    { nom: 'Catalogue & modèles', statut: 'ok', detail: `${stats.templates.toLocaleString('fr-FR')} modèles actifs` },
  ];

  const globalOk = SERVICES.every(s => s.statut === 'ok');
  const hasDegraded = SERVICES.some(s => s.statut === 'degradé');

  const globalLabel = globalOk ? 'Tous les services opérationnels' : hasDegraded ? 'Dégradation partielle' : 'Interruption détectée';
  const globalColor = globalOk ? '#2e7d32' : hasDegraded ? '#e65100' : '#c62828';
  const globalBg = globalOk ? '#e8f5e9' : hasDegraded ? '#fff3e0' : '#ffebee';

  return (
    <>
      <SiteHeader />
      <section style={{ background: 'linear-gradient(135deg,#0D2B4E,#1565C0)', color: '#fff', padding: '40px 0', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ color: '#fff', fontSize: '1.9rem', marginBottom: 8 }}>Statut des services</h1>
          <p style={{ opacity: .8 }}>État en temps réel de la plateforme IBIG DocPro.</p>
        </div>
      </section>

      <div className="container" style={{ maxWidth: 700, padding: '40px 16px' }}>
        <div style={{
          background: globalBg, border: `2px solid ${globalColor}`,
          borderRadius: 12, padding: '20px 24px', marginBottom: 28,
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <div style={{ fontSize: '2rem' }}>{globalOk ? '✅' : hasDegraded ? '⚠️' : '🔴'}</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.1rem', color: globalColor }}>{globalLabel}</div>
            <div style={{ fontSize: '.85rem', color: '#555', marginTop: 2 }}>
              Mis à jour automatiquement · {new Date().toLocaleString('fr-FR')}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 36 }}>
          {SERVICES.map(s => (
            <div key={s.nom} style={{
              background: '#fff', border: '1px solid #e0e6ed', borderRadius: 10,
              padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14,
            }}>
              <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>
                {s.statut === 'ok' ? '🟢' : s.statut === 'degradé' ? '🟡' : '🔴'}
              </span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: 'var(--navy)', fontSize: '.92rem' }}>{s.nom}</div>
                <div style={{ fontSize: '.8rem', color: '#888', marginTop: 2 }}>{s.detail}</div>
              </div>
              <span style={{
                fontSize: '.72rem', fontWeight: 700, padding: '2px 10px', borderRadius: 10,
                background: s.statut === 'ok' ? '#e8f5e9' : s.statut === 'degradé' ? '#fff3e0' : '#ffebee',
                color: s.statut === 'ok' ? '#2e7d32' : s.statut === 'degradé' ? '#e65100' : '#c62828',
                flexShrink: 0, textTransform: 'uppercase', letterSpacing: .5,
              }}>
                {s.statut === 'ok' ? 'Opérationnel' : s.statut === 'degradé' ? 'Dégradé' : 'Erreur'}
              </span>
            </div>
          ))}
        </div>

        {stats.recentCrons.length > 0 && (
          <div>
            <h3 style={{ fontSize: '1rem', marginBottom: 12 }}>Dernières tâches planifiées</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {stats.recentCrons.map((c, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  background: '#f5f7fa', borderRadius: 7, padding: '8px 14px', fontSize: '.82rem',
                }}>
                  <span>{c.status === 'ok' ? '🟢' : '🔴'}</span>
                  <span style={{ color: 'var(--navy)', fontWeight: 600, flex: 1 }}>{c.job}</span>
                  <span style={{ color: '#888' }}>{c.ranAt.toLocaleString('fr-FR')}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginTop: 36, background: '#f5f7fa', borderRadius: 10, padding: '20px', textAlign: 'center' }}>
          <p style={{ margin: '0 0 12px', fontSize: '.9rem', color: '#555' }}>
            Vous constatez un problème non affiché ici ?
          </p>
          <a href="mailto:docpro@ibigsoft.com" style={{ color: 'var(--cobalt)', fontWeight: 600, fontSize: '.9rem' }}>
            Signaler un incident → docpro@ibigsoft.com
          </a>
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
