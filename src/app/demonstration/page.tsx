import type { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/public/SiteFooter';
import DemoForm from './DemoForm';

export const metadata: Metadata = {
  title: 'Démonstration gratuite — IBIG DocPro',
  description: 'Demandez une démonstration personnalisée d\'IBIG DocPro. Un expert vous présente la plateforme en 20 minutes, sans engagement.',
};

export default function DemonstrationPage() {
  return (
    <>
      <SiteHeader />

      <section style={{ background: 'linear-gradient(135deg,#0D2B4E,#1565C0)', color: '#fff', padding: '52px 0 40px', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ color: '#fff', fontSize: 'clamp(1.6rem,4vw,2.2rem)', marginBottom: 12 }}>
            Demandez une démonstration gratuite
          </h1>
          <p style={{ opacity: .85, maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
            Un expert IBIG DocPro vous présente la plateforme en 20 minutes et répond à toutes vos questions.
          </p>
          <div style={{ display: 'flex', gap: 20, justifyContent: 'center', marginTop: 24, flexWrap: 'wrap', fontSize: '.88rem', opacity: .8 }}>
            {['✓ Gratuit et sans engagement', '✓ En visioconférence ou sur site', '✓ Réponse sous 24 h'].map(t => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      <div className="container" style={{ maxWidth: 860, padding: '48px 16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 40, alignItems: 'start' }}>

        {/* Formulaire client */}
        <DemoForm />

        {/* Panneau informatif */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ background: '#f5f7fa', border: '1px solid #e0e6ed', borderRadius: 12, padding: 24 }}>
            <h3 style={{ marginBottom: 16, fontSize: '1.05rem' }}>Au programme de votre démo</h3>
            {[
              { icon: '🔍', t: 'Tour de la plateforme', d: 'Navigation, catalogue, recherche de modèles.' },
              { icon: '⚡', t: 'Génération en direct', d: "Démonstration live d'un document de votre secteur." },
              { icon: '💳', t: 'Paiement & accès', d: 'Comment payer via Mobile Money et télécharger.' },
              { icon: '🏢', t: 'Cas entreprise (si applicable)', d: 'Espaces organisation, multi-utilisateurs, API.' },
              { icon: '❓', t: 'Vos questions', d: '10 minutes de Q&R pour tous vos doutes.' },
            ].map(i => (
              <div key={i.t} style={{ display: 'flex', gap: 12, marginBottom: 14, alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.2rem', flexShrink: 0, marginTop: 2 }}>{i.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '.9rem' }}>{i.t}</div>
                  <div style={{ fontSize: '.82rem', color: '#666' }}>{i.d}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: 'linear-gradient(135deg,#0D2B4E,#1565C0)', borderRadius: 12, padding: 24, color: '#fff' }}>
            <h3 style={{ color: '#FFD700', marginBottom: 12, fontSize: '1rem' }}>Préférez un contact direct ?</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '.88rem' }}>
              <a href="https://wa.me/2250555059901?text=Bonjour%2C%20je%20souhaite%20une%20d%C3%A9monstration%20IBIG%20DocPro."
                target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', gap: 10, alignItems: 'center', color: '#fff', textDecoration: 'none' }}>
                <span style={{ background: '#25D366', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>📲</span>
                +225 05 55 05 99 01 (WhatsApp)
              </a>
              <a href="mailto:docpro@ibigsoft.com?subject=Demande%20de%20d%C3%A9monstration"
                style={{ display: 'flex', gap: 10, alignItems: 'center', color: '#fff', textDecoration: 'none' }}>
                <span style={{ background: 'rgba(255,255,255,.15)', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>📧</span>
                docpro@ibigsoft.com
              </a>
              <a href="tel:+22522276014"
                style={{ display: 'flex', gap: 10, alignItems: 'center', color: '#fff', textDecoration: 'none' }}>
                <span style={{ background: 'rgba(255,255,255,.15)', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>📞</span>
                +225 22 27 60 14
              </a>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </>
  );
}
