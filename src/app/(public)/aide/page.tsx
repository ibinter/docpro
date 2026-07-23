import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/public/SiteFooter';

export const metadata = {
  title: "Centre d'aide — IBIG DocPro",
  description: "Trouvez des réponses à toutes vos questions sur IBIG DocPro : guide, FAQ, tutoriels, contact support.",
};

const SECTIONS = [
  {
    icon: '📖', titre: 'Guide utilisateur', desc: "Apprenez à utiliser IBIG DocPro pas à pas — de la création de compte à la génération de votre premier document.",
    lien: '/guide', cta: 'Lire le guide',
  },
  {
    icon: '❓', titre: 'FAQ — Questions fréquentes', desc: "Plus de 80 réponses aux questions les plus courantes sur les documents, paiements, comptes et fonctionnalités.",
    lien: '/faq', cta: 'Voir la FAQ',
  },
  {
    icon: '💬', titre: 'Support par ticket', desc: "Ouvrez un ticket depuis votre espace client. Notre équipe vous répond en moins de 2 heures.",
    lien: '/compte/assistance', cta: 'Ouvrir un ticket',
  },
  {
    icon: '📱', titre: 'WhatsApp', desc: "Pour une aide immédiate, contactez-nous directement sur WhatsApp. Réponse instantanée.",
    lien: 'https://wa.me/2250555059901?text=Bonjour%20IBIG%20DocPro%2C%20j%27ai%20besoin%20d%27aide.',
    cta: 'Écrire sur WhatsApp', ext: true,
  },
  {
    icon: '📧', titre: 'Email', desc: "Pour les demandes non urgentes, écrivez-nous par email. Réponse sous 24 h.",
    lien: 'mailto:docpro@ibigsoft.com', cta: 'Envoyer un email', ext: true,
  },
  {
    icon: '📊', titre: 'Statut des services', desc: "Vérifiez en temps réel la disponibilité des services IBIG DocPro.",
    lien: '/statut', cta: 'Voir le statut',
  },
];

const POPULAR = [
  { q: 'Comment générer un document ?', href: '/guide#generation' },
  { q: 'Quels modes de paiement sont acceptés ?', href: '/faq#paiement' },
  { q: 'Mon document est-il conforme à la loi ?', href: '/faq#juridique' },
  { q: "Comment télécharger mon document ?", href: '/guide#telechargement' },
  { q: "J'ai payé mais mon document est introuvable", href: '/faq#technique' },
  { q: 'Comment renouveler ma licence ?', href: '/faq#compte' },
  { q: "Quelle est la différence Standard / Pro / Expert ?", href: '/tarifs' },
  { q: 'Comment activer la double authentification ?', href: '/guide#securite' },
];

export default function AidePage() {
  return (
    <>
      <SiteHeader />
      <section style={{ background: 'linear-gradient(135deg,#0D2B4E,#1565C0)', color: '#fff', padding: '48px 0 40px', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ color: '#fff', fontSize: 'clamp(1.6rem,4vw,2.2rem)', marginBottom: 12 }}>Centre d'aide IBIG DocPro</h1>
          <p style={{ opacity: .85, fontSize: '1.05rem', maxWidth: 520, margin: '0 auto' }}>
            Trouvez une réponse en moins de 30 secondes ou contactez notre équipe.
          </p>
        </div>
      </section>

      <section style={{ background: '#f5f7fa', padding: '48px 0' }}>
        <div className="container" style={{ maxWidth: 900 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 16 }}>
            {SECTIONS.map(s => (
              <Link
                key={s.titre}
                href={s.lien}
                {...(s.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                style={{
                  background: '#fff', border: '1px solid #e0e6ed', borderRadius: 12,
                  padding: '24px 20px', textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: 10,
                  transition: 'box-shadow .15s',
                }}
              >
                <div style={{ fontSize: '2rem' }}>{s.icon}</div>
                <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '1rem' }}>{s.titre}</div>
                <p style={{ fontSize: '.88rem', color: '#555', lineHeight: 1.6, margin: 0, flex: 1 }}>{s.desc}</p>
                <span style={{ fontSize: '.85rem', color: 'var(--cobalt)', fontWeight: 600 }}>{s.cta} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#fff', padding: '48px 0' }}>
        <div className="container" style={{ maxWidth: 700 }}>
          <h2 style={{ fontSize: '1.4rem', marginBottom: 24, textAlign: 'center' }}>Questions les plus posées</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {POPULAR.map(p => (
              <Link key={p.q} href={p.href} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                background: '#f5f7fa', border: '1px solid #e0e6ed', borderRadius: 8,
                padding: '12px 16px', textDecoration: 'none', color: 'var(--navy)', fontSize: '.9rem',
              }}>
                <span style={{ color: 'var(--cobalt)', flexShrink: 0 }}>❓</span>
                {p.q}
                <span style={{ marginLeft: 'auto', color: '#aaa' }}>→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'linear-gradient(135deg,#0D2B4E,#1565C0)', padding: '40px 0', textAlign: 'center', color: '#fff' }}>
        <div className="container">
          <h2 style={{ color: '#FFD700', fontSize: '1.4rem', marginBottom: 10 }}>Vous n'avez pas trouvé votre réponse ?</h2>
          <p style={{ opacity: .85, marginBottom: 24 }}>Notre équipe est disponible du lundi au vendredi de 8h à 18h (GMT).</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://wa.me/2250555059901" target="_blank" rel="noopener noreferrer"
              style={{ background: '#25D366', color: '#fff', padding: '11px 24px', borderRadius: 8, textDecoration: 'none', fontWeight: 600, fontSize: '.95rem' }}>
              📲 WhatsApp
            </a>
            <Link href="/compte/assistance"
              style={{ background: 'rgba(255,255,255,.15)', border: '1px solid rgba(255,255,255,.4)', color: '#fff', padding: '11px 24px', borderRadius: 8, textDecoration: 'none', fontWeight: 600, fontSize: '.95rem' }}>
              💬 Ouvrir un ticket
            </Link>
          </div>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
