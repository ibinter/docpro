// Landing page IBIG DocPro — 34 zones script universel IBIG Soft v3
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { formatFcfa, formatUsd, DEFAULT_PRICE_GRID, RECHARGE_TIERS } from '@/lib/pricing';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/public/SiteFooter';
import CookieBanner from '@/components/CookieBanner';
import SaraChat from '@/components/SaraChat';

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
  { flag: '🇨🇮', name: "Côte d'Ivoire" },
  { flag: '🇸🇳', name: 'Sénégal' },
  { flag: '🇨🇲', name: 'Cameroun' },
  { flag: '🇧🇯', name: 'Bénin' },
  { flag: '🇹🇬', name: 'Togo' },
  { flag: '🇧🇫', name: 'Burkina Faso' },
  { flag: '🇲🇱', name: 'Mali' },
  { flag: '🇬🇳', name: 'Guinée' },
  { flag: '🇨🇬', name: 'Congo' },
  { flag: '🇬🇦', name: 'Gabon' },
  { flag: '🇳🇪', name: 'Niger' },
  { flag: '🇲🇦', name: 'Maroc' },
];

const TEMOIGNAGES = [
  {
    texte: "J'ai obtenu mon contrat de bail en moins d'une minute. Conforme à la loi ivoirienne, avec toutes les clauses bien structurées. Rapide et fiable.",
    auteur: 'Koffi A.',
    poste: 'Propriétaire immobilier, Abidjan',
    flag: '🇨🇮',
  },
  {
    texte: "Mes statuts SARL étaient prêts en 2 minutes. Document complet, bien structuré, conforme à l'Acte uniforme OHADA. Aucune correction nécessaire.",
    auteur: 'Amadou D.',
    poste: 'Entrepreneur, Dakar',
    flag: '🇸🇳',
  },
  {
    texte: "En tant que DRH, j'utilise DocPro pour tous nos contrats CDI, CDD et avenants. Gain de temps énorme. Les documents sont impeccables et nos avocats les valident systématiquement.",
    auteur: 'Marie-Claire N.',
    poste: 'DRH, PME de 80 salariés, Douala',
    flag: '🇨🇲',
  },
  {
    texte: "J'ai soumis mon business plan généré par IBIG DocPro à une banque. Financement accordé. Le document était d'un niveau que je n'aurais jamais pu atteindre seul.",
    auteur: 'Youssouf T.',
    poste: 'Porteur de projet, Bamako',
    flag: '🇲🇱',
  },
];

const AVANTAGES = [
  { emoji: '⚡', titre: 'Disponible 24h/24', texte: "Générez votre document à tout moment, sans rendez-vous ni délai d'attente." },
  { emoji: '🌍', titre: 'Adapté à votre pays', texte: 'Chaque document intègre les dispositions légales du pays sélectionné — OHADA, codes locaux, UEMOA, CEMAC.' },
  { emoji: '📁', titre: '12 700+ modèles prêts', texte: 'Contrats, CV, statuts, baux, business plans, QHSE, projets… 19 domaines, tous les documents courants de votre activité.' },
  { emoji: '✏️', titre: 'Entièrement personnalisé', texte: "Chaque document est adapté à vos informations spécifiques : parties, dates, clauses, secteur d'activité." },
];

const FAQ_ITEMS = [
  { q: 'Dois-je créer un compte pour générer un document ?', r: 'Non. Vous pouvez générer et prévisualiser un document sans compte. Le compte est nécessaire uniquement pour télécharger ou accéder à votre historique.' },
  { q: 'Comment payer ? Les cartes bancaires sont-elles acceptées ?', r: 'Nous acceptons Orange Money, MTN MoMo, Wave, Moov Money et d\'autres moyens Mobile Money. Pas besoin de carte bancaire. Le paiement se fait depuis votre téléphone en quelques secondes.' },
  { q: 'Les documents sont-ils conformes aux lois africaines ?', r: 'Oui. Chaque document est généré selon les lois du pays sélectionné : Acte uniforme OHADA, codes du travail locaux, droit UEMOA, CEMAC. Nos modèles sont régulièrement mis à jour.' },
  { q: 'Quelle est la différence entre Standard, Pro et Expert ?', r: 'Standard : document complet en PDF, conformé OHADA. Pro : plus détaillé, PDF + Word (modifiable), avec personnalisation sectorielle. Expert : niveau notarial, tous formats, avec jurisprudence locale et relecture humaine.' },
  { q: 'Puis-je modifier le document après génération ?', r: 'Oui. Les niveaux Pro et Expert incluent le format Word (DOCX) modifiable. Le niveau Standard produit un PDF. Vous pouvez aussi demander une régénération avec de nouvelles instructions.' },
  { q: 'Combien de temps prend la génération ?', r: 'En général moins de 30 secondes pour le niveau Standard, 1 à 2 minutes pour Pro et Expert. La génération se fait en temps réel — vous voyez le document apparaître progressivement.' },
  { q: 'Le QR code d\'authenticité est-il obligatoire ?', r: 'Oui, pour les documents payés. Le QR code permet à n\'importe qui de vérifier l\'authenticité de votre document sur notre site. Il est impossible à falsifier.' },
  { q: 'Puis-je générer des documents pour plusieurs pays ?', r: 'Oui. IBIG DocPro couvre 15 pays africains. À chaque génération, vous sélectionnez le pays cible et le document s\'adapte automatiquement aux lois locales.' },
  { q: 'Y a-t-il un essai gratuit ?', r: 'Oui. Vous pouvez prévisualiser n\'importe quel document gratuitement avant de payer. Des crédits d\'essai sont également disponibles pour tester la plateforme complète.' },
  { q: 'Mes données personnelles sont-elles protégées ?', r: 'Oui. Vos informations sont chiffrées et stockées de façon sécurisée. Nous ne revendons jamais vos données. Consultez notre politique de confidentialité pour les détails.' },
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
      {/* ══ 7.1 — BARRE SUPÉRIEURE D'INFORMATION ══ */}
      <div style={{
        background: '#0D2B4E', color: 'rgba(255,255,255,.85)',
        textAlign: 'center', fontSize: '.8rem', padding: '7px 16px',
        borderBottom: '1px solid rgba(255,255,255,.1)',
      }}>
        <span>
          Essayez IBIG DocPro gratuitement &nbsp;·&nbsp;
          Assistance&nbsp;: <a href="tel:+22522276014" style={{ color: '#FFD700' }}>+225 22 27 60 14</a>
          &nbsp;·&nbsp;
          <a href="https://ibigsoft.com" target="_blank" rel="noopener noreferrer" style={{ color: '#FFD700' }}>
            Une solution IBIG Soft
          </a>
        </span>
      </div>

      {/* ══ 7.2 — HEADER ══ */}
      <SiteHeader />

      {/* ════════════════════ 7.3 — HERO ════════════════════ */}
      <section style={{
        background: 'linear-gradient(135deg, #0D2B4E 0%, #1565C0 60%, #0D47A1 100%)',
        color: '#fff', padding: '64px 0 56px',
      }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{
            display: 'inline-block', background: 'rgba(255,215,0,0.15)',
            border: '1px solid rgba(255,215,0,0.4)', borderRadius: 20,
            padding: '6px 18px', fontSize: '.85rem', fontWeight: 600,
            color: '#FFD700', marginBottom: 24, letterSpacing: .5,
          }}>
            ✦ {templateCount.toLocaleString('fr-FR')} modèles · 15 pays africains · Conforme OHADA
          </div>

          <h1 style={{
            fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontWeight: 900,
            lineHeight: 1.2, maxWidth: 800, margin: '0 auto 20px', color: '#fff',
          }}>
            Vos documents professionnels<br />
            <span style={{ color: '#FFD700' }}>prêts en 30 secondes</span>
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', opacity: .9,
            maxWidth: 620, margin: '0 auto 32px', lineHeight: 1.7,
          }}>
            Contrats, CV, statuts de société, baux, business plans… Tous vos documents
            juridiques et professionnels, <strong style={{ color: '#FFD700' }}>conformes aux lois de votre pays</strong>,
            disponibles en quelques secondes.
          </p>

          {/* ══ 7.4 — CTA PRINCIPAL ══ */}
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 40 }}>
            <Link href="/catalogue" className="btn btn-gold btn-lg" style={{ fontSize: '1.05rem', padding: '14px 32px' }}>
              Générer mon document maintenant
            </Link>
            <Link href="/inscription" className="btn btn-outline btn-lg"
              style={{ borderColor: 'rgba(255,255,255,.6)', color: '#fff', fontSize: '1.05rem', padding: '14px 32px' }}>
              Créer un compte gratuit
            </Link>
          </div>

          {/* ══ 7.5 — PREUVES DE CONFIANCE ══ */}
          <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap', opacity: .8, fontSize: '.85rem' }}>
            {['✓ Sans inscription obligatoire', '✓ Paiement Mobile Money accepté', '✓ Document prêt en 30 secondes', '✓ À partir de 100 FCFA · $0.17'].map(item => (
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

      {/* ══ 7.6 — PRÉSENTATION DU LOGICIEL ══ */}
      <section style={{ background: '#f5f7fa', padding: '48px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 40, alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: 16 }}>
                Une solution conçue pour simplifier la gestion documentaire en Afrique
              </h2>
              <p style={{ color: '#555', lineHeight: 1.8, marginBottom: 16 }}>
                IBIG DocPro transforme la création de documents professionnels : contrats conformes OHADA,
                CV adaptés au marché africain, statuts de société, baux, business plans et bien plus —
                générés par intelligence artificielle en quelques secondes, sans compétence juridique requise.
              </p>
              <p style={{ color: '#555', lineHeight: 1.8 }}>
                Plus besoin de payer un avocat pour chaque contrat simple, de chercher des modèles généralistes
                ou de rédiger manuellement ce que l'IA peut faire en 30 secondes.
              </p>
            </div>
            <div style={{
              background: 'linear-gradient(135deg,#0D2B4E,#1565C0)',
              borderRadius: 16, padding: 32, color: '#fff', textAlign: 'center',
            }}>
              <div style={{ fontSize: '3rem', marginBottom: 12 }}>📋</div>
              <div style={{ fontWeight: 800, fontSize: '1.4rem', color: '#FFD700', marginBottom: 8 }}>
                {templateCount.toLocaleString('fr-FR')}+ modèles
              </div>
              <div style={{ opacity: .8, fontSize: '.95rem', lineHeight: 1.6 }}>
                Contrats · CV · Statuts · Baux<br />
                Business plans · QHSE · RH<br />
                19 domaines · 15 pays africains
              </div>
              <Link href="/catalogue" className="btn btn-gold" style={{ marginTop: 20, display: 'inline-block' }}>
                Voir tous les modèles
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 7.7 — PROBLÈMES RÉSOLUS (AVANT / APRÈS) ══ */}
      <section className="container" style={{ padding: '48px 16px' }}>
        <h2 className="text-center" style={{ fontSize: '1.7rem', marginBottom: 8 }}>
          Reconnaissez-vous ces situations ?
        </h2>
        <p className="text-center text-muted" style={{ marginBottom: 32 }}>
          IBIG DocPro résout les problèmes documentaires quotidiens des professionnels africains.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {[
            { avant: 'Attendre 3 jours (et payer cher) un avocat pour un contrat simple', apres: 'Votre contrat OHADA complet et conforme en 30 secondes pour 100 FCFA' },
            { avant: 'Copier un modèle générique qui ne respecte pas les lois de votre pays', apres: 'Chaque clause adaptée aux lois du pays sélectionné — automatiquement' },
            { avant: 'Envoyer un document sans savoir s\'il est valide ni certifiable', apres: 'QR code d\'authenticité vérifiable par toute partie prenante' },
            { avant: 'Perdre du temps à reformater un CV ou une présentation', apres: 'PDF, Word, PowerPoint et Excel disponibles en un seul paiement' },
          ].map((item, i) => (
            <div key={i} style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #e0e0e0' }}>
              <div style={{ background: '#fff3f3', padding: '14px 16px', borderBottom: '1px solid #ffd0d0' }}>
                <div style={{ fontSize: '.72rem', fontWeight: 700, color: '#c62828', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Avant</div>
                <div style={{ fontSize: '.9rem', color: '#555', lineHeight: 1.5 }}>❌ {item.avant}</div>
              </div>
              <div style={{ background: '#f0fff4', padding: '14px 16px' }}>
                <div style={{ fontSize: '.72rem', fontWeight: 700, color: '#2e7d32', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Avec IBIG DocPro</div>
                <div style={{ fontSize: '.9rem', color: '#333', lineHeight: 1.5 }}>✓ {item.apres}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ 7.9 — FONCTIONNALITÉS PRINCIPALES ══ */}
      <section style={{ background: '#0D2B4E', color: '#fff', padding: '56px 0' }}>
        <div className="container">
          <h2 className="text-center" style={{ color: '#fff', fontSize: '1.7rem' }}>Pourquoi IBIG DocPro est différent</h2>
          <p className="text-center mb-3" style={{ opacity: .75, maxWidth: 520, margin: '8px auto 36px' }}>
            Pas un simple générateur de templates. Une plateforme juridique intelligente.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24 }}>
            {[
              { icon: '⚖️', titre: 'Droit OHADA & lois locales', texte: "Chaque clause est conforme à l'Acte uniforme OHADA, au Code du travail et aux lois du pays sélectionné." },
              { icon: '✍️', titre: 'Rédaction de niveau professionnel', texte: 'Clauses complètes, terminologie exacte, structure conforme — chaque document respecte les standards du droit OHADA et des lois locales.' },
              { icon: '🔒', titre: "QR code d'authenticité", texte: "Chaque document payé porte un QR code vérifiable. Impossibilité de falsification — votre document est certifiable." },
              { icon: '🌍', titre: '15 pays africains', texte: 'CI, SN, CM, BJ, TG, BF, ML, GN, GA, CG, NE, CD, MA, DZ, TN. Adaptations légales automatiques.' },
              { icon: '📱', titre: 'Mobile Money', texte: 'Orange Money, MTN MoMo, Wave, Moov… Payez comme vous le faites déjà. Pas besoin de carte bancaire.' },
              { icon: '📄', titre: 'PDF · Word · PowerPoint · Excel', texte: 'Un seul paiement donne accès à tous les formats. Modifiable dans Word, partageable en PDF.' },
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

      {/* ══ 7.8 — BÉNÉFICES MAJEURS ══ */}
      <section style={{ background: '#fff', padding: '48px 0' }}>
        <div className="container">
          <h2 className="text-center" style={{ fontSize: '1.7rem', marginBottom: 8 }}>Ce que vous gagnez concrètement</h2>
          <p className="text-center text-muted" style={{ marginBottom: 32 }}>Des résultats mesurables, pas des promesses.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {[
              { icon: '⏱️', titre: 'Gagner du temps', texte: 'De plusieurs jours à 30 secondes' },
              { icon: '💰', titre: 'Réduire les coûts', texte: 'Dès 100 FCFA vs des milliers chez un prestataire' },
              { icon: '✅', titre: 'Sécuriser vos actes', texte: 'Conformité OHADA garantie, QR certifiable' },
              { icon: '🚀', titre: 'Accélérer votre activité', texte: 'Documents prêts avant la fin de votre réunion' },
              { icon: '📊', titre: 'Professionnaliser vos rendus', texte: 'Mise en page soignée, tous formats inclus' },
              { icon: '🤝', titre: 'Inspirer confiance', texte: 'Document certifié, partenaires rassurés' },
            ].map(b => (
              <div key={b.titre} style={{
                background: '#f5f7fa', borderRadius: 10, padding: '20px 16px', textAlign: 'center',
                border: '1px solid #e8ecf0',
              }}>
                <div style={{ fontSize: '2rem', marginBottom: 8 }}>{b.icon}</div>
                <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '.95rem', marginBottom: 4 }}>{b.titre}</div>
                <div style={{ fontSize: '.82rem', color: '#666', lineHeight: 1.5 }}>{b.texte}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ AVANTAGES ══ */}
      <section className="container" style={{ padding: '0 16px 32px' }}>
        <h2 className="text-center" style={{ fontSize: '1.7rem' }}>Pourquoi choisir IBIG DocPro ?</h2>
        <p className="text-center text-muted mb-3" style={{ maxWidth: 560, margin: '8px auto 28px' }}>
          Une plateforme documentaire professionnelle conçue pour les entreprises et professionnels d'Afrique francophone.
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

      {/* CATÉGORIES DYNAMIQUES */}
      <section className="container" style={{ padding: '0 16px 32px' }}>
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

      {/* ══ COMMENT ÇA MARCHE ══ */}
      <section style={{ background: '#f5f7fa', padding: '48px 0' }}>
        <div className="container">
          <h2 className="text-center" style={{ fontSize: '1.7rem' }}>De zéro à votre document en 4 étapes</h2>
          <p className="text-center text-muted mb-3">Moins de 60 secondes. Vraiment.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24, marginTop: 32 }}>
            {[
              { num: '1', icon: '🔍', titre: 'Choisissez', texte: 'Parcourez le catalogue et sélectionnez le document dont vous avez besoin.' },
              { num: '2', icon: '✍️', titre: 'Renseignez', texte: "L'IA vous pose quelques questions simples. Remplissez en moins d'une minute." },
              { num: '3', icon: '⚡', titre: 'Générez', texte: "Votre document complet et personnalisé est prêt. Prévisualisez-le immédiatement." },
              { num: '4', icon: '📥', titre: 'Payez & Téléchargez', texte: 'Payez via Mobile Money. Téléchargez en PDF, Word ou PowerPoint.' },
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
            <Link href="/catalogue" className="btn btn-gold btn-lg">Essayer maintenant — sans inscription</Link>
          </p>
        </div>
      </section>

      {/* TÉMOIGNAGES */}
      <section className="container" style={{ padding: '48px 16px' }}>
        <h2 className="text-center" style={{ fontSize: '1.7rem' }}>Ils nous font confiance</h2>
        <p className="text-center text-muted mb-3">Des milliers de professionnels africains génèrent leurs documents avec IBIG DocPro.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
          {TEMOIGNAGES.map(t => (
            <div key={t.auteur} style={{
              background: '#fff', border: '1px solid #e0e0e0', borderRadius: 10,
              padding: 20, display: 'flex', flexDirection: 'column', gap: 12,
            }}>
              <div style={{ color: '#FFB300', fontSize: '1rem' }}>★★★★★</div>
              <p style={{ fontSize: '.9rem', color: '#333', lineHeight: 1.7, fontStyle: 'italic', margin: 0, flex: 1 }}>
                &quot;{t.texte}&quot;
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

      {/* ══ PAYS COUVERTS ══ */}
      <section className="container" style={{ padding: '0 16px 48px' }}>
        <h2 className="text-center" style={{ fontSize: '1.7rem' }}>Disponible dans toute l'Afrique francophone</h2>
        <p className="text-center text-muted mb-3">Documents adaptés aux lois de chaque pays. Sélectionnez votre pays lors de la génération.</p>
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

      {/* ══ 7.17 — INTÉGRATIONS ══ */}
      <section style={{ background: '#f5f7fa', padding: '48px 0' }}>
        <div className="container">
          <h2 className="text-center" style={{ fontSize: '1.7rem', marginBottom: 8 }}>Paiements & intégrations</h2>
          <p className="text-center text-muted" style={{ marginBottom: 32 }}>
            Payez avec les outils que vous utilisez déjà au quotidien.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, maxWidth: 900, margin: '0 auto' }}>
            {[
              { nom: 'Orange Money', emoji: '🟠', statut: 'Disponible' },
              { nom: 'MTN MoMo', emoji: '🟡', statut: 'Disponible' },
              { nom: 'Wave', emoji: '🔵', statut: 'Disponible' },
              { nom: 'Moov Money', emoji: '🟢', statut: 'Disponible' },
              { nom: 'Virement bancaire', emoji: '🏦', statut: 'Disponible' },
              { nom: 'Moneroo', emoji: '💳', statut: 'Disponible' },
              { nom: 'CinetPay', emoji: '💳', statut: 'Bientôt' },
              { nom: 'Stripe', emoji: '💳', statut: 'Bientôt' },
            ].map(i => (
              <div key={i.nom} style={{
                background: '#fff', border: '1px solid #e0e0e0', borderRadius: 8,
                padding: '14px 12px', textAlign: 'center',
              }}>
                <div style={{ fontSize: '1.6rem', marginBottom: 6 }}>{i.emoji}</div>
                <div style={{ fontWeight: 600, color: 'var(--navy)', fontSize: '.85rem', marginBottom: 4 }}>{i.nom}</div>
                <div style={{
                  display: 'inline-block', fontSize: '.72rem', fontWeight: 700, padding: '2px 8px', borderRadius: 10,
                  background: i.statut === 'Disponible' ? '#e8f5e9' : '#fff8e1',
                  color: i.statut === 'Disponible' ? '#2e7d32' : '#f57f17',
                }}>
                  {i.statut}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 7.21 — SÉCURITÉ & PROTECTION DES DONNÉES ══ */}
      <section style={{ background: '#fff', padding: '48px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 40, alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '1.7rem', marginBottom: 16 }}>Vos données sont protégées</h2>
              <p style={{ color: '#555', lineHeight: 1.8, marginBottom: 20 }}>
                IBIG DocPro applique des standards de sécurité stricts pour protéger vos informations personnelles et vos documents.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { icon: '🔐', texte: 'Connexion sécurisée HTTPS + authentification à deux facteurs (2FA)' },
                  { icon: '🛡️', texte: 'Gestion des rôles et droits — chaque utilisateur accède uniquement à ses données' },
                  { icon: '📋', texte: 'Journal d\'audit complet de toutes les actions sensibles' },
                  { icon: '🔒', texte: 'Preuves de paiement stockées en espace privé sécurisé' },
                  { icon: '🔑', texte: 'QR code anti-falsification sur chaque document payé' },
                  { icon: '🚫', texte: 'Nous ne revendons jamais vos données personnelles' },
                ].map(s => (
                  <div key={s.texte} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '1.2rem', flexShrink: 0, marginTop: 2 }}>{s.icon}</span>
                    <span style={{ fontSize: '.88rem', color: '#444', lineHeight: 1.6 }}>{s.texte}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{
              background: 'linear-gradient(135deg,#e8f5e9,#c8e6c9)',
              borderRadius: 16, padding: 32, border: '1px solid #a5d6a7',
            }}>
              <div style={{ fontSize: '3rem', textAlign: 'center', marginBottom: 16 }}>🛡️</div>
              <div style={{ textAlign: 'center', fontWeight: 700, color: '#1b5e20', fontSize: '1.1rem', marginBottom: 12 }}>
                Certifié et vérifiable
              </div>
              <p style={{ fontSize: '.9rem', color: '#388e3c', lineHeight: 1.7, textAlign: 'center', margin: 0 }}>
                Chaque document payé obtient un code QR unique. N'importe qui peut scanner ce code
                pour vérifier l'authenticité du document sur notre site public — sans compte nécessaire.
              </p>
              <p className="text-center mt-3">
                <Link href="/catalogue" style={{ color: '#2e7d32', fontWeight: 600, fontSize: '.9rem' }}>
                  Générer un document certifié →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ TARIFICATION ══ */}
      <section style={{ background: '#f5f7fa', padding: '56px 0' }}>
        <div className="container">
          <h2 className="text-center" style={{ fontSize: '1.7rem' }}>Tarification simple et transparente</h2>
          <p className="text-center text-muted mb-3">
            Payez à l'acte. <strong>100 FCFA · $0.17</strong> le document le moins cher. <strong>Aucun abonnement obligatoire.</strong>
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 28 }}>
            {([
              { niveau: 'standard', emoji: '📄', label: 'Standard', color: '#1565C0',
                desc: 'Complet · conforme · PDF', depuis: DEFAULT_PRICE_GRID.A.standard,
                features: ['Document complet OHADA', 'Format PDF', "QR d'authenticité"] },
              { niveau: 'pro', emoji: '⭐', label: 'Pro', color: '#F57F17',
                desc: 'Personnalisé · PDF + Word', depuis: DEFAULT_PRICE_GRID.A.pro,
                features: ['Tout Standard +', 'Personnalisé secteur', 'PDF + Word (DOCX)', '2 régénérations'] },
              { niveau: 'expert', emoji: '💎', label: 'Expert', color: '#7c3aed',
                desc: 'Maximum · tous formats · relecture', depuis: DEFAULT_PRICE_GRID.A.expert,
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
                  }}>RECOMMANDÉ</div>
                )}
                <div style={{ textAlign: 'center', marginBottom: 16 }}>
                  <div style={{ fontSize: '1.8rem' }}>{n.emoji}</div>
                  <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--navy)', margin: '6px 0 2px' }}>{n.label}</div>
                  <div style={{ fontSize: '.8rem', color: '#888' }}>{n.desc}</div>
                  <div style={{ fontWeight: 900, fontSize: '1.4rem', color: n.color, marginTop: 10 }}>
                    dès {formatFcfa(n.depuis)}
                  </div>
                  <div style={{ fontSize: '.78rem', color: '#aaa' }}>{formatUsd(n.depuis)}</div>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px', lineHeight: 2 }}>
                  {n.features.map(f => (
                    <li key={f} style={{ fontSize: '.88rem', color: '#333' }}>
                      <span style={{ color: '#2e7d32', fontWeight: 700, marginRight: 6 }}>✓</span>{f}
                    </li>
                  ))}
                </ul>
                <Link href="/catalogue" className="btn btn-primary btn-sm" style={{ width: '100%', textAlign: 'center', display: 'block' }}>
                  Choisir {n.label}
                </Link>
              </div>
            ))}
          </div>
          <div style={{
            background: 'linear-gradient(135deg,#0D2B4E,#1565C0)',
            borderRadius: 12, padding: '24px 28px', color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
          }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: 6 }}>
                💰 Rechargez votre portefeuille — jusqu'à <span style={{ color: '#FFD700' }}>+30 % offerts</span>
              </div>
              <div style={{ opacity: .8, fontSize: '.88rem' }}>
                {RECHARGE_TIERS.filter(r => r.bonusPct > 0)
                  .map(r => `Rechargez ${formatFcfa(r.amount)} → recevez ${formatFcfa(r.receive)} (+${r.bonusPct}%)`)
                  .join('  ·  ')}
              </div>
            </div>
            <Link href="/tarifs" className="btn btn-gold">Voir le détail des tarifs</Link>
          </div>
        </div>
      </section>

      {/* ══ 7.22 — AVANTAGES IBIG SOFT ══ */}
      <section style={{ background: '#fff', padding: '56px 0' }}>
        <div className="container">
          <h2 className="text-center" style={{ fontSize: '1.7rem', marginBottom: 8 }}>
            Pourquoi choisir une solution IBIG Soft ?
          </h2>
          <p className="text-center text-muted" style={{ marginBottom: 32 }}>
            IBIG Soft conçoit des solutions numériques adaptées aux réalités africaines depuis Abidjan.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            {[
              { icon: '🌍', titre: 'Conçu pour l\'Afrique', texte: 'Interface, lois, paiements et support adaptés aux réalités du continent.' },
              { icon: '🔄', titre: 'Mises à jour automatiques', texte: 'Votre logiciel est toujours à jour sans action de votre part.' },
              { icon: '🤝', titre: 'Support réactif', texte: 'Équipe disponible par email, WhatsApp et téléphone pour vous accompagner.' },
              { icon: '🔒', titre: 'Sécurité éprouvée', texte: 'Authentification 2FA, chiffrement, audit complet des actions sensibles.' },
              { icon: '🌐', titre: 'Multilingue', texte: 'Interface disponible en français et en anglais, avec extensions prévues.' },
              { icon: '📱', titre: 'Application installable', texte: 'Installez DocPro comme une app sur votre téléphone ou ordinateur — sans boutique.' },
            ].map(a => (
              <div key={a.titre} style={{ background: '#f5f7fa', border: '1px solid #e8ecf0', borderRadius: 10, padding: 20 }}>
                <div style={{ fontSize: '1.6rem', marginBottom: 8 }}>{a.icon}</div>
                <div style={{ fontWeight: 700, color: 'var(--navy)', marginBottom: 6, fontSize: '.95rem' }}>{a.titre}</div>
                <div style={{ fontSize: '.85rem', color: '#555', lineHeight: 1.6 }}>{a.texte}</div>
              </div>
            ))}
          </div>
          <p className="text-center mt-4">
            <a href="https://ibigsoft.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary">
              Découvrir IBIG Soft →
            </a>
          </p>
        </div>
      </section>

      {/* ══ 7.27 — AUTRES LOGICIELS IBIG SOFT ══ */}
      <section style={{ background: '#f5f7fa', padding: '48px 0' }}>
        <div className="container">
          <h2 className="text-center" style={{ fontSize: '1.7rem', marginBottom: 8 }}>
            Découvrez également les autres solutions IBIG Soft
          </h2>
          <p className="text-center text-muted" style={{ marginBottom: 32 }}>
            Un écosystème complet de logiciels professionnels pour l'Afrique.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            {[
              { nom: 'Scolaby', secteur: 'Gestion scolaire', desc: 'Gérez vos établissements scolaires — inscriptions, notes, bulletins, finances.', emoji: '🎓', statut: 'Disponible' },
              { nom: 'IBIG ERP', secteur: 'ERP entreprise', desc: 'Solution ERP complète pour PME africaines — stock, ventes, comptabilité, RH.', emoji: '🏢', statut: 'Bientôt' },
              { nom: 'ClinicSoft', secteur: 'Gestion médicale', desc: 'Dossiers patients, consultations, ordonnances, facturation médicale.', emoji: '🏥', statut: 'Bientôt' },
            ].map(l => (
              <div key={l.nom} style={{
                background: '#fff', border: '1px solid #e0e0e0', borderRadius: 12, padding: 20,
                display: 'flex', flexDirection: 'column', gap: 8,
              }}>
                <div style={{ fontSize: '2rem' }}>{l.emoji}</div>
                <div style={{ fontWeight: 800, color: 'var(--navy)', fontSize: '1.05rem' }}>{l.nom}</div>
                <div style={{ fontSize: '.78rem', color: '#888', fontWeight: 600 }}>{l.secteur}</div>
                <p style={{ fontSize: '.85rem', color: '#555', lineHeight: 1.6, margin: 0, flex: 1 }}>{l.desc}</p>
                <div style={{
                  display: 'inline-block', width: 'fit-content', fontSize: '.72rem', fontWeight: 700, padding: '2px 10px', borderRadius: 10,
                  background: l.statut === 'Disponible' ? '#e8f5e9' : '#fff8e1',
                  color: l.statut === 'Disponible' ? '#2e7d32' : '#f57f17',
                }}>
                  {l.statut}
                </div>
              </div>
            ))}
          </div>
          <p className="text-center mt-4">
            <a href="https://ibigsoft.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Voir toutes les solutions IBIG Soft
            </a>
          </p>
        </div>
      </section>

      {/* ══ 7.28 — IBIG PARTNERS ══ */}
      <section style={{
        background: 'linear-gradient(135deg,#0D2B4E 0%,#1a3a6b 100%)',
        padding: '56px 0', color: '#fff',
      }}>
        <div className="container">
          <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
            <div style={{
              display: 'inline-block', background: 'rgba(255,215,0,.15)',
              border: '1px solid rgba(255,215,0,.4)', borderRadius: 20,
              padding: '5px 16px', fontSize: '.82rem', fontWeight: 700,
              color: '#FFD700', marginBottom: 20, letterSpacing: .5,
            }}>
              💼 IBIG PARTNERS — Programme de partenariat
            </div>
            <h2 style={{ color: '#fff', fontSize: '1.9rem', marginBottom: 16 }}>
              Développez vos revenus avec IBIG PARTNERS
            </h2>
            <p style={{ opacity: .85, fontSize: '1rem', lineHeight: 1.8, marginBottom: 28 }}>
              Rejoignez gratuitement le programme de partenariat IBIG et recommandez les solutions du groupe
              à votre réseau. Accédez aux outils IBIG, suivez vos recommandations et percevez des commissions
              sur chaque client que vous apportez.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 32 }}>
              {[
                { icon: '🆓', texte: 'Inscription gratuite' },
                { icon: '📊', texte: 'Suivi des recommandations' },
                { icon: '💰', texte: 'Commissions attractives' },
                { icon: '🛠️', texte: 'Outils et ressources fournis' },
              ].map(p => (
                <div key={p.texte} style={{
                  background: 'rgba(255,255,255,.08)', borderRadius: 8, padding: '14px 10px', textAlign: 'center',
                }}>
                  <div style={{ fontSize: '1.6rem', marginBottom: 6 }}>{p.icon}</div>
                  <div style={{ fontSize: '.82rem', opacity: .9 }}>{p.texte}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://ibigpartners.com/" target="_blank" rel="noopener noreferrer"
                className="btn btn-gold btn-lg" style={{ fontSize: '1rem' }}>
                Devenir partenaire
              </a>
              <a href="https://ibigpartners.com/" target="_blank" rel="noopener noreferrer"
                className="btn btn-outline btn-lg"
                style={{ borderColor: 'rgba(255,255,255,.5)', color: '#fff', fontSize: '1rem' }}>
                Découvrir le programme
              </a>
            </div>
            <p style={{ opacity: .45, fontSize: '.78rem', marginTop: 16 }}>
              Aucun revenu garanti. Les commissions dépendent des ventes effectivement réalisées.
            </p>
          </div>
        </div>
      </section>

      {/* ══ 7.26 — FAQ PUBLIQUE ══ */}
      <section style={{ background: '#fff', padding: '56px 0' }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <h2 className="text-center" style={{ fontSize: '1.7rem', marginBottom: 8 }}>
            Questions fréquentes
          </h2>
          <p className="text-center text-muted" style={{ marginBottom: 36 }}>
            Toutes les réponses sur IBIG DocPro.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {FAQ_ITEMS.map((item, i) => (
              <details key={i} style={{
                background: '#f5f7fa', border: '1px solid #e0e0e0', borderRadius: 8, overflow: 'hidden',
              }}>
                <summary style={{
                  padding: '16px 20px', cursor: 'pointer', fontWeight: 600,
                  color: 'var(--navy)', fontSize: '.95rem', listStyle: 'none',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  userSelect: 'none',
                }}>
                  {item.q}
                  <span style={{ fontSize: '1.2rem', flexShrink: 0, marginLeft: 12, color: 'var(--cobalt)' }}>＋</span>
                </summary>
                <div style={{ padding: '0 20px 16px', fontSize: '.9rem', color: '#444', lineHeight: 1.7 }}>
                  {item.r}
                </div>
              </details>
            ))}
          </div>
          <p className="text-center mt-4">
            <Link href="/compte/assistance" className="btn btn-outline-primary">
              Poser une autre question → Support
            </Link>
          </p>
        </div>
      </section>

      {/* ══ 7.29 — CENTRE D'AIDE (VITRINE) ══ */}
      <section style={{ background: '#f5f7fa', padding: '48px 0' }}>
        <div className="container">
          <h2 className="text-center" style={{ fontSize: '1.7rem', marginBottom: 8 }}>Besoin d'aide ?</h2>
          <p className="text-center text-muted" style={{ marginBottom: 32 }}>
            Nous sommes là pour vous accompagner à chaque étape.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, maxWidth: 900, margin: '0 auto' }}>
            {[
              { icon: '💬', titre: 'Support par ticket', texte: 'Ouvrez un ticket depuis votre compte. Notre équipe vous répond rapidement.', lien: '/compte/assistance', cta: 'Ouvrir un ticket' },
              { icon: '📧', titre: 'Email', texte: 'Contactez-nous directement par email pour toute question commerciale ou technique.', lien: 'mailto:docpro@ibigsoft.com', cta: 'Envoyer un email' },
              { icon: '📱', titre: 'WhatsApp', texte: 'Discutez directement avec notre équipe sur WhatsApp pour une aide immédiate.', lien: 'https://wa.me/2250555059901?text=Bonjour%20IBIG%20Soft%2C%20je%20souhaite%20des%20informations%20sur%20IBIG%20DocPro.', cta: 'Écrire sur WhatsApp' },
            ].map(c => (
              <div key={c.titre} style={{
                background: '#fff', border: '1px solid #e0e0e0', borderRadius: 12, padding: '24px 20px', textAlign: 'center',
              }}>
                <div style={{ fontSize: '2rem', marginBottom: 10 }}>{c.icon}</div>
                <div style={{ fontWeight: 700, color: 'var(--navy)', marginBottom: 8 }}>{c.titre}</div>
                <p style={{ fontSize: '.85rem', color: '#555', lineHeight: 1.6, marginBottom: 16 }}>{c.texte}</p>
                <Link href={c.lien} className="btn btn-outline-primary btn-sm"
                  {...(c.lien.startsWith('http') || c.lien.startsWith('mailto') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                  {c.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 7.30 — APPEL À L'ACTION FINAL ══ */}
      <section style={{
        background: 'linear-gradient(135deg,#1565C0,#0D47A1)',
        padding: '64px 0', textAlign: 'center', color: '#fff',
      }}>
        <div className="container">
          <div style={{ fontSize: '3rem', marginBottom: 12 }}>🚀</div>
          <h2 style={{ color: '#fff', fontSize: '1.9rem', marginBottom: 12 }}>
            Générez votre premier document maintenant
          </h2>
          <p style={{ opacity: .85, fontSize: '1.05rem', maxWidth: 480, margin: '0 auto 32px', lineHeight: 1.6 }}>
            Sans inscription. Sans abonnement. Votre document professionnel en 30 secondes, dès <strong style={{ color: '#FFD700' }}>100 FCFA</strong>.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/catalogue" className="btn btn-gold btn-lg" style={{ fontSize: '1.05rem', padding: '14px 36px' }}>
              Explorer les {templateCount.toLocaleString('fr-FR')} modèles
            </Link>
            <Link href="/inscription" className="btn btn-outline btn-lg"
              style={{ borderColor: 'rgba(255,255,255,.5)', color: '#fff', fontSize: '1.05rem', padding: '14px 36px' }}>
              Créer mon compte
            </Link>
          </div>
          <p style={{ opacity: .55, fontSize: '.8rem', marginTop: 20 }}>
            ✓ Mobile Money accepté &nbsp;·&nbsp; ✓ Conforme droit OHADA &nbsp;·&nbsp; ✓ 15 pays couverts
          </p>
        </div>
      </section>

      <SiteFooter />

      {/* ══ 7.19 — SARA FLOTTANTE (bas droite) ══ */}
      <SaraChat />

      {/* ══ 7.31 — WHATSAPP FLOTTANTE (bas gauche) ══ */}
      <a
        href="https://wa.me/2250555059901?text=Bonjour%20IBIG%20Soft%2C%20je%20souhaite%20des%20informations%20sur%20IBIG%20DocPro."
        target="_blank"
        rel="noopener noreferrer"
        title="Contacter IBIG Soft sur WhatsApp"
        style={{
          position: 'fixed', bottom: 24, left: 24, zIndex: 1000,
          width: 52, height: 52, borderRadius: '50%',
          background: '#25D366',
          color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.4rem', boxShadow: '0 4px 16px rgba(0,0,0,.25)',
          textDecoration: 'none',
        }}
        aria-label="WhatsApp IBIG Soft"
      >
        📲
      </a>

      {/* ══ 7.34 — BANNIÈRE COOKIES ══ */}
      <CookieBanner />
    </>
  );
}
