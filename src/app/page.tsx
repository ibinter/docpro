// Landing page de vente IBIG DocPro â€” page vendeur complÃ¨te v2
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { formatFcfa, formatUsd, DEFAULT_PRICE_GRID, RECHARGE_TIERS } from '@/lib/pricing';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/public/SiteFooter';

export const dynamic = 'force-dynamic';

const CATEGORIES_META: Record<string, { emoji: string; label: string }> = {
  commercial:           { emoji: '💼', label: 'Commercial & Marketing' },
  juridique_admin:      { emoji: '⚖️', label: 'Juridique & Administratif' },
  agro_environnement:   { emoji: '🌱', label: 'Agro & Environnement' },
  sante:                { emoji: '🏥', label: 'Santé' },
  association:          { emoji: '🤝', label: 'Association & ONG' },
  btp_construction:     { emoji: '🏗️', label: 'BTP & Construction' },
  rh_emploi:            { emoji: '👥', label: 'RH & Emploi' },
  informatique_tech:    { emoji: '💻', label: 'Informatique & Tech' },
  academique:           { emoji: '🎓', label: 'Académique' },
  transport_logistique: { emoji: '🚚', label: 'Transport & Logistique' },
  finance_banque:       { emoji: '🏦', label: 'Finance & Banque' },
  immobilier:           { emoji: '🏠', label: 'Immobilier' },
  comptabilite_audit:   { emoji: '📊', label: 'Comptabilité & Audit' },
  communication:        { emoji: '📣', label: 'Communication' },
  entrepreneuriat:      { emoji: '🚀', label: 'Entrepreneuriat' },
  gestion_management:   { emoji: '🎯', label: 'Gestion & Management' },
  assurance:            { emoji: '🛡️', label: 'Assurance' },
  qhse:                 { emoji: '✅', label: 'QHSE' },
  gestion_projet:       { emoji: '📅', label: 'Gestion de Projet' },
};



const PAYS = [
  { flag: 'ðŸ‡¨ðŸ‡®', name: "CÃ´te d'Ivoire" },
  { flag: 'ðŸ‡¸ðŸ‡³', name: 'SÃ©nÃ©gal' },
  { flag: 'ðŸ‡¨ðŸ‡²', name: 'Cameroun' },
  { flag: 'ðŸ‡§ðŸ‡¯', name: 'BÃ©nin' },
  { flag: 'ðŸ‡¹ðŸ‡¬', name: 'Togo' },
  { flag: 'ðŸ‡§ðŸ‡«', name: 'Burkina Faso' },
  { flag: 'ðŸ‡²ðŸ‡±', name: 'Mali' },
  { flag: 'ðŸ‡¬ðŸ‡³', name: 'GuinÃ©e' },
  { flag: 'ðŸ‡¨ðŸ‡¬', name: 'Congo' },
  { flag: 'ðŸ‡¬ðŸ‡¦', name: 'Gabon' },
  { flag: 'ðŸ‡³ðŸ‡ª', name: 'Niger' },
  { flag: 'ðŸ‡²ðŸ‡¦', name: 'Maroc' },
];

const TEMOIGNAGES = [
  {
    texte: "J'ai obtenu mon contrat de bail en moins d'une minute. Conforme Ã  la loi ivoirienne, avec toutes les clauses bien structurÃ©es. Rapide et fiable.",
    auteur: 'Koffi A.',
    poste: 'PropriÃ©taire immobilier, Abidjan',
    flag: 'ðŸ‡¨ðŸ‡®',
  },
  {
    texte: "Mes statuts SARL Ã©taient prÃªts en 2 minutes. Document complet, bien structurÃ©, conforme Ã  l'Acte uniforme OHADA. Aucune correction nÃ©cessaire.",
    auteur: 'Amadou D.',
    poste: 'Entrepreneur, Dakar',
    flag: 'ðŸ‡¸ðŸ‡³',
  },
  {
    texte: "En tant que DRH, j'utilise DocPro pour tous nos contrats CDI, CDD et avenants. Gain de temps Ã©norme. Les documents sont impeccables et nos avocats les valident systÃ©matiquement.",
    auteur: 'Marie-Claire N.',
    poste: 'DRH, PME de 80 salariÃ©s, Douala',
    flag: 'ðŸ‡¨ðŸ‡²',
  },
  {
    texte: "J'ai soumis mon business plan gÃ©nÃ©rÃ© par IBIG DocPro Ã  une banque. Financement accordÃ©. Le document Ã©tait d'un niveau que je n'aurais jamais pu atteindre seul.",
    auteur: 'Youssouf T.',
    poste: 'Porteur de projet, Bamako',
    flag: 'ðŸ‡²ðŸ‡±',
  },
];

const AVANTAGES = [
  { emoji: 'âš¡', titre: 'Disponible 24h/24', texte: 'GÃ©nÃ©rez votre document Ã  tout moment, sans rendez-vous ni dÃ©lai d\'attente.' },
  { emoji: 'ðŸŒ', titre: 'AdaptÃ© Ã  votre pays', texte: 'Chaque document intÃ¨gre les dispositions lÃ©gales du pays sÃ©lectionnÃ© â€” OHADA, codes locaux, UEMOA, CEMAC.' },
  { emoji: 'ðŸ“', titre: '12 700+ modèles prêts', texte: 'Contrats, CV, statuts, baux, business plans, QHSE, projets… 19 domaines, tous les documents courants de votre activité.' },
  { emoji: 'âœï¸', titre: 'EntiÃ¨rement personnalisÃ©', texte: 'Chaque document est adaptÃ© Ã  vos informations spÃ©cifiques : parties, dates, clauses, secteur d\'activitÃ©.' },
];

export default async function HomePage() {
  const templateCount = await prisma.documentTemplate.count({ where: { active: true } }).catch(() => 12000);
  const categoryCounts = await prisma.documentTemplate.groupBy({
    by: ['category'],
    where: { active: true },
    _count: { id: true },
    orderBy: { _count: { id: 'desc' } },
  }).catch(() => []);
  const categoryCount = categoryCounts.length || 19;

  return (
    <>
      <SiteHeader />

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• HERO â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section style={{
        background: 'linear-gradient(135deg, #0D2B4E 0%, #1565C0 60%, #0D47A1 100%)',
        color: '#fff', padding: '64px 0 56px',
      }}>
        <div className="container" style={{ textAlign: 'center' }}>

          {/* Badge urgence */}
          <div style={{
            display: 'inline-block', background: 'rgba(255,215,0,0.15)',
            border: '1px solid rgba(255,215,0,0.4)', borderRadius: 20,
            padding: '6px 18px', fontSize: '.85rem', fontWeight: 600,
            color: '#FFD700', marginBottom: 24, letterSpacing: .5,
          }}>
            âœ¦ {templateCount.toLocaleString('fr-FR')} modÃ¨les Â· 15 pays africains Â· Conforme OHADA
          </div>

          <h1 style={{
            fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontWeight: 900,
            lineHeight: 1.2, maxWidth: 800, margin: '0 auto 20px',
            color: '#fff',
          }}>
            Vos documents professionnels<br />
            <span style={{ color: '#FFD700' }}>prÃªts en 30 secondes</span>
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', opacity: .9,
            maxWidth: 620, margin: '0 auto 32px', lineHeight: 1.7,
          }}>
            Contrats, CV, statuts de sociÃ©tÃ©, baux, business plansâ€¦ Tous vos documents
            juridiques et professionnels, <strong style={{ color: '#FFD700' }}>conformes aux lois de votre pays</strong>,
            disponibles en quelques secondes.
          </p>

          {/* CTA */}
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 40 }}>
            <Link href="/catalogue" className="btn btn-gold btn-lg" style={{ fontSize: '1.05rem', padding: '14px 32px' }}>
              GÃ©nÃ©rer mon document maintenant
            </Link>
            <Link href="/inscription" className="btn btn-outline btn-lg"
              style={{ borderColor: 'rgba(255,255,255,.6)', color: '#fff', fontSize: '1.05rem', padding: '14px 32px' }}>
              CrÃ©er un compte gratuit
            </Link>
          </div>

          {/* RÃ©assurance rapide */}
          <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap', opacity: .8, fontSize: '.85rem' }}>
            {['âœ“ Sans inscription obligatoire', 'âœ“ Paiement Mobile Money acceptÃ©', 'âœ“ Document prÃªt en 30 secondes', 'âœ“ Ã€ partir de 100 FCFA Â· $0.17'].map(item => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      {/* STATS DYNAMIQUES */}
      <section style={{ background: '#fff', borderBottom: '1px solid #e8ecf0', padding: '32px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', gap: 48, flexWrap: 'wrap' }}>
            {[
              { value: templateCount.toLocaleString('fr-FR') + '+', label: 'Modèles de documents' },
              { value: categoryCount + ' domaines', label: 'Secteurs couverts' },
              { value: '15+', label: 'Pays africains' },
              { value: '< 30s', label: 'Temps de génération' },
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--cobalt)', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: '.85rem', color: '#666', marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• AVANTAGES â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section className="container mt-4">
        <h2 className="text-center" style={{ fontSize: '1.7rem' }}>Pourquoi choisir IBIG DocPro ?</h2>
        <p className="text-center text-muted mb-3" style={{ maxWidth: 560, margin: '8px auto 28px' }}>
          Une plateforme documentaire professionnelle conÃ§ue pour les entreprises et professionnels d'Afrique francophone.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
          {AVANTAGES.map(a => (
            <div key={a.emoji} style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: 10, padding: 20 }}>
              <div style={{ fontSize: '1.8rem', marginBottom: 10 }}>{a.emoji}</div>
              <div style={{ fontWeight: 700, color: 'var(--navy)', marginBottom: 6, fontSize: '.95rem' }}>{a.titre}</div>
              <div style={{ fontSize: '.88rem', color: '#555', lineHeight: 1.6 }}>{a.texte}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES DYNAMIQUES */}
      <section className="container mt-4">
        <h2 className="text-center" style={{ fontSize: '1.7rem' }}>Qu'est-ce que vous cherchez ?</h2>
        <p className="text-center text-muted mb-3">Trouvez votre document en un clic parmi {templateCount.toLocaleString('fr-FR')} modèles · {categoryCount} domaines.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
          {categoryCounts.map(cat => {
            const meta = CATEGORIES_META[cat.category];
            if (!meta) return null;
            return (
              <Link
                key={cat.category}
                href={`/catalogue?categorie=${cat.category}`}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  background: '#fff', border: '1px solid #e0e0e0', borderRadius: 8,
                  padding: '12px 14px', textDecoration: 'none',
                  transition: 'border-color .15s, box-shadow .15s',
                }}
                className="card-hover"
              >
                <span style={{ fontSize: '1.4rem' }}>{meta.emoji}</span>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--navy)', fontSize: '.88rem', lineHeight: 1.3 }}>{meta.label}</div>
                  <div style={{ fontSize: '.75rem', color: '#888' }}>{cat._count.id.toLocaleString('fr-FR')} modèles</div>
                </div>
              </Link>
            );
          })}
        </div>
        <p className="text-center mt-3">
          <Link href="/catalogue" className="btn btn-primary">Voir tous les {templateCount.toLocaleString('fr-FR')} modèles →</Link>
        </p>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• COMMENT Ã‡A MARCHE â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section style={{ background: '#f5f7fa', padding: '48px 0', marginTop: 48 }}>
        <div className="container">
          <h2 className="text-center" style={{ fontSize: '1.7rem' }}>De zÃ©ro Ã  votre document en 4 Ã©tapes</h2>
          <p className="text-center text-muted mb-3">Moins de 60 secondes. Vraiment.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24, marginTop: 32 }}>
            {[
              { num: '1', icon: 'ðŸ”', titre: 'Choisissez', texte: 'Parcourez le catalogue et sÃ©lectionnez le document dont vous avez besoin.' },
              { num: '2', icon: 'âœï¸', titre: 'Renseignez', texte: "L'IA vous pose quelques questions simples. Remplissez en moins d'une minute." },
              { num: '3', icon: 'âš¡', titre: 'GÃ©nÃ©rez', texte: "Votre document complet et personnalisÃ© est prÃªt. PrÃ©visualisez-le immÃ©diatement." },
              { num: '4', icon: 'ðŸ“¥', titre: 'Payez & TÃ©lÃ©chargez', texte: 'Payez via Mobile Money. TÃ©lÃ©chargez en PDF, Word ou PowerPoint.' },
            ].map(e => (
              <div key={e.num} style={{ textAlign: 'center' }}>
                <div style={{
                  width: 56, height: 56, borderRadius: '50%',
                  background: 'var(--cobalt)', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.4rem', fontWeight: 800, margin: '0 auto 12px',
                }}>
                  {e.icon}
                </div>
                <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '1rem', marginBottom: 6 }}>{e.titre}</div>
                <p style={{ fontSize: '.88rem', color: '#555', lineHeight: 1.6, margin: 0 }}>{e.texte}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-4">
            <Link href="/catalogue" className="btn btn-gold btn-lg">Essayer maintenant â€” sans inscription</Link>
          </p>
        </div>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• TÃ‰MOIGNAGES â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section className="container mt-4">
        <h2 className="text-center" style={{ fontSize: '1.7rem' }}>Ils nous font confiance</h2>
        <p className="text-center text-muted mb-3">Des milliers de professionnels africains gÃ©nÃ¨rent leurs documents avec IBIG DocPro.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
          {TEMOIGNAGES.map(t => (
            <div key={t.auteur} style={{
              background: '#fff', border: '1px solid #e0e0e0', borderRadius: 10,
              padding: 20, display: 'flex', flexDirection: 'column', gap: 12,
            }}>
              <div style={{ color: '#FFB300', fontSize: '1rem' }}>â˜…â˜…â˜…â˜…â˜…</div>
              <p style={{ fontSize: '.9rem', color: '#333', lineHeight: 1.7, fontStyle: 'italic', margin: 0, flex: 1 }}>
                "{t.texte}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%', background: 'var(--cobalt)',
                  color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: '.9rem', flexShrink: 0,
                }}>
                  {t.auteur[0]}
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '.88rem' }}>{t.flag} {t.auteur}</div>
                  <div style={{ fontSize: '.78rem', color: '#888' }}>{t.poste}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• FONCTIONNALITÃ‰S CLÃ‰ â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section style={{ background: '#0D2B4E', color: '#fff', padding: '56px 0', marginTop: 48 }}>
        <div className="container">
          <h2 className="text-center" style={{ color: '#fff', fontSize: '1.7rem' }}>Pourquoi IBIG DocPro est diffÃ©rent</h2>
          <p className="text-center mb-3" style={{ opacity: .75, maxWidth: 520, margin: '8px auto 36px' }}>
            Pas un simple gÃ©nÃ©rateur de templates. Une plateforme juridique intelligente.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24 }}>
            {[
              { icon: 'âš–ï¸', titre: 'Droit OHADA & lois locales', texte: 'Chaque clause est conforme Ã  l\'Acte uniforme OHADA, au Code du travail et aux lois du pays sÃ©lectionnÃ©.' },
              { icon: 'âœï¸', titre: 'RÃ©daction de niveau professionnel', texte: 'Clauses complÃ¨tes, terminologie exacte, structure conforme â€” chaque document respecte les standards du droit OHADA et des lois locales.' },
              { icon: 'ðŸ”’', titre: 'QR code d\'authenticitÃ©', texte: 'Chaque document payÃ© porte un QR code vÃ©rifiable. ImpossibilitÃ© de falsification â€” votre document est certifiable.' },
              { icon: 'ðŸŒ', titre: '15 pays africains', texte: 'CI, SN, CM, BJ, TG, BF, ML, GN, GA, CG, NE, CD, MA, DZ, TN. Adaptations lÃ©gales automatiques.' },
              { icon: 'ðŸ“±', titre: 'Mobile Money', texte: 'Orange Money, MTN MoMo, Wave, Moovâ€¦ Payez comme vous le faites dÃ©jÃ . Pas besoin de carte bancaire.' },
              { icon: 'ðŸ“„', titre: 'PDF Â· Word Â· PowerPoint Â· Excel', texte: 'Un seul paiement donne accÃ¨s Ã  tous les formats. Modifiable dans Word, partageable en PDF.' },
            ].map(f => (
              <div key={f.titre} style={{ display: 'flex', gap: 14 }}>
                <div style={{ fontSize: '1.8rem', flexShrink: 0, marginTop: 2 }}>{f.icon}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 6, color: '#FFD700' }}>{f.titre}</div>
                  <p style={{ fontSize: '.88rem', opacity: .8, lineHeight: 1.6, margin: 0 }}>{f.texte}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• PAYS COUVERTS â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section className="container mt-4">
        <h2 className="text-center" style={{ fontSize: '1.7rem' }}>Disponible dans toute l'Afrique francophone</h2>
        <p className="text-center text-muted mb-3">Documents adaptÃ©s aux lois de chaque pays. SÃ©lectionnez votre pays lors de la gÃ©nÃ©ration.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
          {PAYS.map(p => (
            <div key={p.name} style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: '#f5f7fa', borderRadius: 20, padding: '6px 14px',
              fontSize: '.88rem', color: 'var(--navy)', fontWeight: 500,
            }}>
              <span>{p.flag}</span> {p.name}
            </div>
          ))}
        </div>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• TARIFICATION â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section style={{ background: '#f5f7fa', padding: '56px 0', marginTop: 48 }}>
        <div className="container">
          <h2 className="text-center" style={{ fontSize: '1.7rem' }}>Tarification simple et transparente</h2>
          <p className="text-center text-muted mb-3">
            Payez Ã  l'acte. <strong>100 FCFA Â· $0.17</strong> le document le moins cher. <strong>Aucun abonnement obligatoire.</strong>
          </p>

          {/* 3 niveaux */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 28 }}>
            {([
              { niveau: 'standard', emoji: 'ðŸ“„', label: 'Standard', color: '#1565C0',
                desc: 'Complet Â· conforme Â· PDF', depuis: DEFAULT_PRICE_GRID.A.standard,
                features: ['Document complet OHADA', 'Format PDF', 'QR d\'authenticitÃ©'] },
              { niveau: 'pro', emoji: 'â­', label: 'Pro', color: '#F57F17',
                desc: 'PersonnalisÃ© Â· PDF + Word', depuis: DEFAULT_PRICE_GRID.A.pro,
                features: ['Tout Standard +', 'PersonnalisÃ© secteur', 'PDF + Word (DOCX)', '2 rÃ©gÃ©nÃ©rations'] },
              { niveau: 'expert', emoji: 'ðŸ’Ž', label: 'Expert', color: '#7c3aed',
                desc: 'Maximum Â· tous formats Â· relecture', depuis: DEFAULT_PRICE_GRID.A.expert,
                features: ['Tout Pro +', 'Jurisprudence locale', 'Tous les formats', 'Relecture humaine'] },
            ] as const).map(n => (
              <div key={n.niveau} className="card" style={{
                borderTop: `4px solid ${n.color}`,
                position: 'relative',
                ...(n.niveau === 'pro' ? { boxShadow: '0 4px 24px rgba(0,0,0,.12)', transform: 'scale(1.02)' } : {}),
              }}>
                {n.niveau === 'pro' && (
                  <div style={{
                    position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
                    background: n.color, color: '#fff', fontSize: '.72rem', fontWeight: 700,
                    padding: '3px 12px', borderRadius: 12,
                  }}>RECOMMANDÃ‰</div>
                )}
                <div style={{ textAlign: 'center', marginBottom: 16 }}>
                  <div style={{ fontSize: '1.8rem' }}>{n.emoji}</div>
                  <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--navy)', margin: '6px 0 2px' }}>{n.label}</div>
                  <div style={{ fontSize: '.8rem', color: '#888' }}>{n.desc}</div>
                  <div style={{ fontWeight: 900, fontSize: '1.4rem', color: n.color, marginTop: 10 }}>
                    dÃ¨s {formatFcfa(n.depuis)}
                  </div>
                  <div style={{ fontSize: '.78rem', color: '#aaa' }}>{formatUsd(n.depuis)}</div>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px', lineHeight: 2 }}>
                  {n.features.map(f => (
                    <li key={f} style={{ fontSize: '.88rem', color: '#333' }}>
                      <span style={{ color: '#2e7d32', fontWeight: 700, marginRight: 6 }}>âœ“</span>{f}
                    </li>
                  ))}
                </ul>
                <Link href="/catalogue" className="btn btn-primary btn-sm" style={{ width: '100%', textAlign: 'center', display: 'block' }}>
                  Choisir {n.label}
                </Link>
              </div>
            ))}
          </div>

          {/* Portefeuille bonus */}
          <div style={{
            background: 'linear-gradient(135deg,#0D2B4E,#1565C0)',
            borderRadius: 12, padding: '24px 28px', color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
          }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: 6 }}>
                ðŸ’° Rechargez votre portefeuille â€” jusqu'Ã  <span style={{ color: '#FFD700' }}>+30 % offerts</span>
              </div>
              <div style={{ opacity: .8, fontSize: '.88rem' }}>
                {RECHARGE_TIERS.filter(r => r.bonusPct > 0)
                  .map(r => `Rechargez ${formatFcfa(r.amount)} â†’ recevez ${formatFcfa(r.receive)} (+${r.bonusPct}%)`)
                  .join('  Â·  ')}
              </div>
            </div>
            <Link href="/tarifs" className="btn btn-gold">Voir le dÃ©tail des tarifs</Link>
          </div>
        </div>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• CTA FINAL â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section style={{
        background: 'linear-gradient(135deg,#1565C0,#0D47A1)',
        padding: '64px 0', textAlign: 'center', color: '#fff',
      }}>
        <div className="container">
          <div style={{ fontSize: '3rem', marginBottom: 12 }}>ðŸš€</div>
          <h2 style={{ color: '#fff', fontSize: '1.9rem', marginBottom: 12 }}>
            GÃ©nÃ©rez votre premier document maintenant
          </h2>
          <p style={{ opacity: .85, fontSize: '1.05rem', maxWidth: 480, margin: '0 auto 32px', lineHeight: 1.6 }}>
            Sans inscription. Sans abonnement. Votre document professionnel en 30 secondes, dÃ¨s <strong style={{ color: '#FFD700' }}>100 FCFA</strong>.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/catalogue" className="btn btn-gold btn-lg" style={{ fontSize: '1.05rem', padding: '14px 36px' }}>
              Explorer les {(templateCount).toLocaleString('fr-FR')} modÃ¨les
            </Link>
            <Link href="/inscription" className="btn btn-outline btn-lg"
              style={{ borderColor: 'rgba(255,255,255,.5)', color: '#fff', fontSize: '1.05rem', padding: '14px 36px' }}>
              CrÃ©er mon compte
            </Link>
          </div>
          <p style={{ opacity: .55, fontSize: '.8rem', marginTop: 20 }}>
            âœ“ Mobile Money acceptÃ© &nbsp;Â·&nbsp; âœ“ Conforme droit OHADA &nbsp;Â·&nbsp; âœ“ 15 pays couverts
          </p>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}






