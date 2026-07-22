// Programme de parrainage (CDC §7.3) — 15 % à vie sur les paiements des filleuls.
// Non connecté : présentation + CTA inscription. Connecté : dashboard affilié.
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/public/SiteFooter';
import { prisma } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';
import { formatMoney } from '@/lib/money';
import { ensureReferralCode, AFFILIATE_PAYOUT_THRESHOLD } from '@/lib/affiliate';
import { appUrl } from '@/lib/docgen';
import CopyButton from './CopyButton';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Programme de parrainage — IBIG DocPro',
  description:
    'Gagnez 15 % à vie sur tous les paiements de vos filleuls. Paiement Mobile Money dès 5 000 FCFA.',
};

const STATUS_LABELS: Record<string, string> = {
  en_attente: 'En attente',
  approuvee: 'Approuvée',
  payee: 'Payée',
  annulee: 'Annulée',
};

const STATUS_BADGES: Record<string, string> = {
  en_attente: 'badge-warning',
  approuvee: 'badge-info',
  payee: 'badge-success',
  annulee: 'badge-danger',
};

function fmtDate(d: Date): string {
  return new Date(d).toLocaleDateString('fr-FR');
}

export default async function ParrainagePage() {
  const user = await getSessionUser();

  // ── Visiteur non connecté : présentation du programme ──────────────────────
  if (!user) {
    return (
      <>
        <SiteHeader />
        <main className="container mt-4" style={{ maxWidth: 900, paddingBottom: 60 }}>
          <h1 className="mb-1">Programme de parrainage IBIG DocPro</h1>
          <p className="text-muted mb-3">
            Recommandez IBIG DocPro autour de vous et gagnez de l&apos;argent à chaque paiement de vos filleuls.
          </p>

          <div className="grid grid-3 mb-3">
            <div className="stat stat-gold">
              <div className="stat-value">15 %</div>
              <div className="stat-label">de commission à vie</div>
            </div>
            <div className="stat stat-teal">
              <div className="stat-value">{formatMoney(AFFILIATE_PAYOUT_THRESHOLD)}</div>
              <div className="stat-label">seuil de paiement Mobile Money</div>
            </div>
            <div className="stat stat-success">
              <div className="stat-value">∞</div>
              <div className="stat-label">filleuls illimités</div>
            </div>
          </div>

          <div className="card mb-3">
            <h2 className="card-title">Comment ça marche ?</h2>
            <ol style={{ paddingLeft: 22, lineHeight: 2 }}>
              <li>Créez votre compte IBIG DocPro (gratuit).</li>
              <li>Récupérez votre lien de parrainage personnel sur cette page.</li>
              <li>Partagez-le : réseaux sociaux, WhatsApp, blog, bouche-à-oreille…</li>
              <li>
                Chaque personne inscrite via votre lien devient votre filleul — vous touchez{' '}
                <strong>15 % de tous ses paiements, à vie</strong>.
              </li>
              <li>
                Dès {formatMoney(AFFILIATE_PAYOUT_THRESHOLD)} de commissions approuvées, vous êtes payé par{' '}
                <strong>Mobile Money</strong> (Orange Money, MTN MoMo, Wave, Moov).
              </li>
            </ol>
          </div>

          <div className="card text-center">
            <h2 className="card-title">Prêt à gagner vos premières commissions ?</h2>
            <p className="text-muted mb-2">L&apos;inscription est gratuite et prend moins d&apos;une minute.</p>
            <Link href="/inscription" className="btn btn-gold btn-lg">
              Créer mon compte et obtenir mon lien
            </Link>
            <p className="text-small text-muted mt-2">
              Déjà inscrit ? <Link href="/connexion">Connectez-vous</Link> pour accéder à votre tableau de bord affilié.
            </p>
          </div>
        </main>
        <SiteFooter />
      </>
    );
  }

  // ── Utilisateur connecté : dashboard affilié ────────────────────────────────
  const code = await ensureReferralCode(user.id);
  const link = `${appUrl()}/api/affiliate/track?code=${code}`;

  const [filleuls, earnings] = await Promise.all([
    prisma.user.count({ where: { referredById: user.id } }),
    prisma.affiliateEarning.findMany({
      where: { affiliateId: user.id },
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  const sum = (status: string) =>
    earnings.filter((e) => e.status === status).reduce((a, e) => a + e.amount, 0);
  const enAttente = sum('en_attente');
  const approuvees = sum('approuvee');
  const payees = sum('payee');

  // Enrichissement filleul (pas de relation Prisma → jointure manuelle).
  const referredIds = [...new Set(earnings.map((e) => e.referredId))];
  const referredUsers = referredIds.length
    ? await prisma.user.findMany({
        where: { id: { in: referredIds } },
        select: { id: true, name: true },
      })
    : [];
  const referredMap = new Map(referredUsers.map((u) => [u.id, u.name]));

  return (
    <>
      <SiteHeader />
      <main className="container mt-4" style={{ maxWidth: 1000, paddingBottom: 60 }}>
        <h1 className="mb-1">Mon tableau de bord affilié</h1>
        <p className="text-muted mb-3">
          Partagez votre lien : vous gagnez <strong>15 % à vie</strong> sur tous les paiements de vos filleuls.
          Paiement Mobile Money dès {formatMoney(AFFILIATE_PAYOUT_THRESHOLD)} de commissions approuvées.
        </p>

        <div className="card mb-3">
          <h2 className="card-title">Votre lien de parrainage</h2>
          <div className="flex" style={{ flexWrap: 'wrap', alignItems: 'center', gap: 10 }}>
            <code
              style={{
                background: '#F1F5F9',
                padding: '10px 14px',
                borderRadius: 8,
                fontSize: '0.9rem',
                wordBreak: 'break-all',
              }}
            >
              {link}
            </code>
            <CopyButton text={link} />
          </div>
          <p className="text-small text-muted mt-1">
            Code personnel : <strong>{code}</strong> — toute inscription passée par ce lien dans les 30 jours vous
            est attribuée.
          </p>
        </div>

        <div className="grid grid-4 mb-3">
          <div className="stat">
            <div className="stat-value">{filleuls}</div>
            <div className="stat-label">Filleuls inscrits</div>
          </div>
          <div className="stat stat-gold">
            <div className="stat-value">{formatMoney(enAttente)}</div>
            <div className="stat-label">Commissions en attente</div>
          </div>
          <div className="stat stat-teal">
            <div className="stat-value">{formatMoney(approuvees)}</div>
            <div className="stat-label">Commissions approuvées</div>
          </div>
          <div className="stat stat-success">
            <div className="stat-value">{formatMoney(payees)}</div>
            <div className="stat-label">Commissions payées</div>
          </div>
        </div>

        {approuvees >= AFFILIATE_PAYOUT_THRESHOLD && (
          <div className="alert alert-success">
            🎉 Vous avez atteint le seuil de {formatMoney(AFFILIATE_PAYOUT_THRESHOLD)} : votre paiement Mobile Money
            sera traité par notre équipe.
          </div>
        )}

        <h2 className="mb-2">Historique des gains</h2>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Filleul</th>
                <th>Montant</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {earnings.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center text-muted">
                    Aucune commission pour le moment — partagez votre lien pour commencer à gagner !
                  </td>
                </tr>
              )}
              {earnings.map((e) => (
                <tr key={e.id}>
                  <td>{fmtDate(e.createdAt)}</td>
                  <td>{referredMap.get(e.referredId) ?? '—'}</td>
                  <td>
                    <strong>{formatMoney(e.amount, e.currency)}</strong>
                  </td>
                  <td>
                    <span className={`badge ${STATUS_BADGES[e.status] ?? 'badge-neutral'}`}>
                      {STATUS_LABELS[e.status] ?? e.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
