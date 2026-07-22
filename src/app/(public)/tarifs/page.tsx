// Page publique des tarifs — grille A/B/C × Standard/Pro/Expert + portefeuille crédits
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { formatFcfa, formatUsd, RECHARGE_TIERS, DEFAULT_PRICE_GRID, type Classe, type Niveau } from '@/lib/pricing';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/public/SiteFooter';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Tarifs — IBIG DocPro',
  description:
    'Documents professionnels dès 100 FCFA · $0.17. Choisissez Standard, Pro ou Expert selon vos besoins. Paiement à l\'acte ou portefeuille rechargeable.',
};

const CLASSES: { code: Classe; label: string; desc: string; examples: string }[] = [
  { code: 'A', label: 'Court',   desc: '1–2 pages',   examples: 'CV, lettre de motivation, attestation, procuration' },
  { code: 'B', label: 'Moyen',   desc: '5–15 pages',  examples: 'Contrat, rapport, présentation PowerPoint, facture' },
  { code: 'C', label: 'Dossier', desc: '20+ pages',   examples: 'Business plan, étude de marché, dossier de financement' },
];

const NIVEAUX: { code: Niveau; label: string; emoji: string; features: string[] }[] = [
  {
    code: 'standard', label: 'Standard', emoji: '📄',
    features: [
      'Document complet et conforme au droit OHADA',
      'Rédaction automatique standard',
      'Format PDF inclus',
      '0 régénération incluse',
    ],
  },
  {
    code: 'pro', label: 'Pro', emoji: '⭐',
    features: [
      'Personnalisé secteur + poste visé',
      'Références jurisprudentielles',
      'Rédaction avancée personnalisée',
      'PDF + Word modifiable (DOCX)',
      '2 régénérations incluses',
      '3 gabarits de design au choix',
    ],
  },
  {
    code: 'expert', label: 'Expert', emoji: '💎',
    features: [
      'Personnalisé secteur + marché local + chiffres',
      'Jurisprudence africaine récente',
      'Rédaction experte haute précision',
      'PDF + Word + PowerPoint/Excel selon doc',
      'Régénérations illimitées 7 jours',
      'Tous les gabarits premium',
      'Relecture humaine incluse',
    ],
  },
];

export default async function TarifsPage() {
  // Essayer de lire la grille depuis la base, sinon utiliser la grille par défaut
  let grid = DEFAULT_PRICE_GRID;
  try {
    const rows = await prisma.priceGrid.findMany({ where: { active: true } });
    if (rows.length === 9) {
      grid = {
        A: { standard: 0, pro: 0, expert: 0 },
        B: { standard: 0, pro: 0, expert: 0 },
        C: { standard: 0, pro: 0, expert: 0 },
      };
      for (const row of rows) {
        (grid as Record<string, Record<string, number>>)[row.classe][row.niveau] = row.priceFcfa;
      }
    }
  } catch { /* utilise le défaut */ }

  return (
    <>
      <SiteHeader />
      <main style={{ minHeight: '60vh' }}>

        {/* ── Hero ── */}
        <section className="hero" style={{ padding: '48px 0' }}>
          <div className="container text-center">
            <h1 style={{ fontSize: '2.2rem', marginBottom: 12 }}>
              Des documents professionnels<br />dès <span style={{ color: 'var(--gold)' }}>100 FCFA · $0.17</span>
            </h1>
            <p style={{ fontSize: '1.1rem', opacity: .9, maxWidth: 560, margin: '0 auto 24px' }}>
              Payez uniquement ce dont vous avez besoin. Pas d'abonnement obligatoire.
              Rechargez votre portefeuille et bénéficiez jusqu'à <strong>+30 %</strong> de crédits offerts.
            </p>
            <Link href="/catalogue" className="btn btn-gold btn-lg">
              Voir le catalogue de documents
            </Link>
          </div>
        </section>

        {/* ── Grille tarifaire ── */}
        <section className="container mt-4">
          <h2 className="text-center mb-1">Grille tarifaire</h2>
          <p className="text-center text-muted mb-3">
            Le prix dépend du type de document (longueur) et du niveau de personnalisation.
          </p>

          {/* Table sur grand écran */}
          <div className="table-wrap">
            <table className="table" style={{ minWidth: 640 }}>
              <thead>
                <tr>
                  <th style={{ width: '30%' }}>Type de document</th>
                  {NIVEAUX.map(n => (
                    <th key={n.code} className="text-center">
                      {n.emoji} {n.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CLASSES.map(cls => (
                  <tr key={cls.code}>
                    <td>
                      <strong>Classe {cls.code} — {cls.label}</strong>
                      <div style={{ fontSize: '.8rem', color: '#666', marginTop: 2 }}>{cls.desc}</div>
                      <div style={{ fontSize: '.75rem', color: '#888', marginTop: 2, fontStyle: 'italic' }}>{cls.examples}</div>
                    </td>
                    {NIVEAUX.map(n => {
                      const fcfa = grid[cls.code][n.code];
                      return (
                        <td key={n.code} className="text-center" style={{ verticalAlign: 'middle' }}>
                          <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '1.05rem' }}>
                            {formatFcfa(fcfa)}
                          </div>
                          <div style={{ fontSize: '.8rem', color: '#888' }}>{formatUsd(fcfa)}</div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-small text-muted text-center mt-1">
            Taux de référence : 1 USD = 600 FCFA — mis à jour trimestriellement.
          </p>
        </section>

        {/* ── Différenciation des niveaux ── */}
        <section className="container mt-4">
          <h2 className="text-center mb-3">Que comprend chaque niveau ?</h2>
          <div className="grid grid-3">
            {NIVEAUX.map(n => (
              <div
                key={n.code}
                className="card"
                style={{
                  borderTop: `4px solid ${n.code === 'pro' ? 'var(--gold)' : n.code === 'expert' ? '#7c3aed' : 'var(--cobalt)'}`,
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: 8 }}>{n.emoji}</div>
                <div className="card-title" style={{ fontSize: '1.2rem' }}>{n.label}</div>
                <div style={{ color: '#555', fontSize: '.9rem', marginBottom: 12 }}>
                  à partir de {formatFcfa(grid.A[n.code])} · {formatUsd(grid.A[n.code])}
                </div>
                <ul style={{ paddingLeft: 18, margin: 0, lineHeight: 1.9 }}>
                  {n.features.map(f => (
                    <li key={f} style={{ fontSize: '.88rem', color: '#333' }}>{f}</li>
                  ))}
                </ul>
                <div style={{ marginTop: 16 }}>
                  <Link href="/catalogue" className="btn btn-primary btn-sm" style={{ width: '100%', textAlign: 'center' }}>
                    Choisir {n.label}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Portefeuille & recharge ── */}
        <section className="container mt-4" style={{ background: 'var(--light)', borderRadius: 12, padding: '32px 24px' }}>
          <h2 className="text-center mb-1">Portefeuille de crédits</h2>
          <p className="text-center text-muted mb-3">
            Rechargez votre portefeuille et économisez jusqu'à <strong>30 %</strong> sur vos documents.
            1 crédit = 1 FCFA.
          </p>
          <div className="grid grid-4">
            {RECHARGE_TIERS.map(tier => (
              <div
                key={tier.amount}
                className="card text-center"
                style={{
                  borderTop: tier.bonusPct > 0 ? '3px solid var(--gold)' : '3px solid transparent',
                  position: 'relative',
                }}
              >
                {tier.bonusPct > 0 && (
                  <div style={{
                    position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
                    background: 'var(--gold)', color: '#fff', fontSize: '.7rem', fontWeight: 700,
                    padding: '2px 10px', borderRadius: 20,
                  }}>
                    +{tier.bonusPct}% OFFERTS
                  </div>
                )}
                <div style={{ fontSize: '.85rem', color: '#888', marginTop: 8 }}>Vous payez</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--navy)' }}>
                  {formatFcfa(tier.amount)}
                </div>
                <div style={{ fontSize: '.78rem', color: '#aaa' }}>{formatUsd(tier.amount)}</div>
                <div style={{ margin: '8px 0', color: '#888', fontSize: '1.2rem' }}>↓</div>
                <div style={{ fontSize: '.85rem', color: '#555' }}>Vous recevez</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--cobalt)' }}>
                  {formatFcfa(tier.receive)}
                </div>
                {tier.bonusPct > 0 && (
                  <div style={{ fontSize: '.78rem', color: 'var(--gold)', fontWeight: 600 }}>
                    +{formatFcfa(tier.receive - tier.amount)} offerts
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="text-center mt-3">
            <Link href="/compte" className="btn btn-gold">
              Recharger mon portefeuille
            </Link>
          </p>
        </section>

        {/* ── FAQ rapide ── */}
        <section className="container mt-4 mb-4">
          <h2 className="text-center mb-3">Questions fréquentes</h2>
          <div className="grid grid-2">
            {[
              {
                q: 'Quelle est la différence entre Standard, Pro et Expert ?',
                r: 'Standard génère un document complet et conforme. Pro ajoute une personnalisation sectorielle et des références jurisprudentielles. Expert pousse à la personnalisation maximale avec relecture humaine incluse.',
              },
              {
                q: 'Comment savoir dans quelle classe est mon document ?',
                r: 'La classe est indiquée sur chaque fiche document dans le catalogue. Un CV est de classe A (court), un contrat de classe B (moyen), un business plan de classe C (dossier).',
              },
              {
                q: 'Les crédits ont-ils une date d\'expiration ?',
                r: 'Les crédits sont valables 12 mois à compter de la recharge. Un avertissement vous est envoyé 30 jours avant expiration.',
              },
              {
                q: 'Que se passe-t-il si la génération échoue ?',
                r: 'Si une génération échoue (erreur IA, délai dépassé, JSON invalide), vos crédits sont automatiquement recrédités dans les secondes qui suivent. Aucune perte possible.',
              },
              {
                q: 'Puis-je payer sans recharger mon portefeuille ?',
                r: 'Oui, l\'achat direct est disponible pour tout document au-dessus de 500 FCFA. En dessous de ce seuil, la recharge est recommandée (les frais Mobile Money rendent l\'achat direct non rentable).',
              },
              {
                q: 'Les documents sont-ils conformes au droit local ?',
                r: 'Oui. Notre moteur de rédaction intègre le droit OHADA, l\'UEMOA, le CEMAC et les codes locaux (Côte d\'Ivoire, Sénégal, Cameroun, etc.). Le pays est sélectionnable à chaque génération.',
              },
            ].map(({ q, r }) => (
              <div key={q} className="card">
                <p style={{ fontWeight: 700, color: 'var(--navy)', marginBottom: 6 }}>{q}</p>
                <p className="text-small text-muted" style={{ margin: 0, lineHeight: 1.6 }}>{r}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA final ── */}
        <section style={{ background: 'var(--navy)', padding: '48px 0', textAlign: 'center', color: '#fff' }}>
          <div className="container">
            <h2 style={{ color: '#fff', marginBottom: 12 }}>Prêt à générer votre premier document ?</h2>
            <p style={{ opacity: .85, marginBottom: 24 }}>
              Plus de 1 200 modèles. Génération en moins de 10 secondes. Conformes à votre pays.
            </p>
            <div className="flex" style={{ justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
              <Link href="/catalogue" className="btn btn-gold btn-lg">
                Explorer le catalogue
              </Link>
              <Link href="/inscription" className="btn btn-outline btn-lg" style={{ borderColor: '#fff', color: '#fff' }}>
                Créer un compte gratuit
              </Link>
            </div>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
