// Page /essai — essai gratuit (CDC §16.1) : choix du forfait avec trialDays > 0,
// présentation claire des limites. Les règles (jamais 2 essais, licence en cours)
// sont vérifiées côté serveur ici (affichage) ET dans POST /api/trial/start (application).
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/public/SiteFooter';
import StartTrialButton from './StartTrialButton';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Essai gratuit — IBIG DocPro',
  description: 'Testez IBIG DocPro gratuitement : accès limité, sans engagement et sans moyen de paiement.',
};

type TrialState = 'anonyme' | 'eligible' | 'essai_en_cours' | 'essai_termine' | 'licence_active';

export default async function EssaiPage() {
  const user = await getSessionUser();
  const plans = await prisma.plan.findMany({
    where: { active: true, trialDays: { gt: 0 } },
    orderBy: { displayOrder: 'asc' },
  });

  let state: TrialState = user ? 'eligible' : 'anonyme';
  let trialEnd: Date | null = null;

  if (user) {
    const licenses = await prisma.license.findMany({
      where: { userId: user.id },
      include: { renewals: { where: { type: 'activation' } } },
    });
    const now = new Date();
    const currentTrial = licenses.find((l) => l.status === 'essai' && (!l.endDate || l.endDate > now));
    const hadTrial = licenses.some(
      (l) =>
        l.status === 'essai' ||
        l.renewals.some((e) => (e.detailsJson ?? '').includes('"essai":true')),
    );
    const hasLicense = licenses.some((l) => ['active', 'provisoire', 'grace'].includes(l.status));

    if (hasLicense) state = 'licence_active';
    else if (currentTrial) {
      state = 'essai_en_cours';
      trialEnd = currentTrial.endDate;
    } else if (hadTrial) state = 'essai_termine';
  }

  return (
    <>
      <SiteHeader />
      <main className="container mt-3" style={{ minHeight: '60vh' }}>
        <h1 className="text-center">Essai gratuit</h1>
        <p className="text-center text-muted mb-3" style={{ maxWidth: 640, margin: '8px auto 32px' }}>
          Découvrez IBIG DocPro sans engagement et sans moyen de paiement. L&apos;essai est
          limité dans le temps et réservé à un seul essai par compte.
        </p>

        {/* ── États bloquants ── */}
        {state === 'essai_en_cours' && (
          <div className="alert alert-success" style={{ maxWidth: 720, margin: '0 auto 24px' }}>
            <strong>Votre essai gratuit est en cours</strong>
            {trialEnd && <> — il prend fin le {trialEnd.toLocaleDateString('fr-FR')}</>}.{' '}
            <Link href="/compte">Accéder à mon espace</Link>
          </div>
        )}
        {state === 'essai_termine' && (
          <div className="card text-center" style={{ maxWidth: 720, margin: '0 auto 24px' }}>
            <h2>Votre essai gratuit est terminé</h2>
            <p className="text-muted mt-1 mb-2">
              Vous avez déjà bénéficié de votre période d&apos;essai — celle-ci n&apos;est
              disponible qu&apos;une seule fois par compte. Pour continuer à générer vos
              documents, choisissez le forfait qui vous convient.
            </p>
            <Link href="/tarifs" className="btn btn-gold btn-lg">Voir les forfaits</Link>
          </div>
        )}
        {state === 'licence_active' && (
          <div className="alert alert-info" style={{ maxWidth: 720, margin: '0 auto 24px' }}>
            Vous disposez déjà d&apos;une licence en cours — l&apos;essai gratuit ne
            s&apos;applique pas à votre compte. <Link href="/compte">Voir mon abonnement</Link>
          </div>
        )}

        {/* ── Choix du forfait d'essai ── */}
        {(state === 'eligible' || state === 'anonyme') && (
          plans.length > 0 ? (
            <div className="grid grid-3" style={{ alignItems: 'stretch' }}>
              {plans.map((plan) => (
                <div key={plan.id} className="card card-hover" style={{ display: 'flex', flexDirection: 'column' }}>
                  <span className="badge badge-gold" style={{ alignSelf: 'flex-start' }}>
                    {plan.trialDays} jours gratuits
                  </span>
                  <h3 className="mt-1">{plan.name}</h3>
                  {plan.description && <p className="text-muted text-small mt-1">{plan.description}</p>}
                  <ul className="mt-2 mb-2" style={{ listStyle: 'none', flexGrow: 1, display: 'grid', gap: 6 }}>
                    <li>✓ Durée : <strong>{plan.trialDays} jours</strong>, sans reconduction automatique</li>
                    <li>✓ Documents : {plan.docsPerMonth == null ? 'accès au catalogue' : `jusqu'à ${plan.docsPerMonth} / mois`}</li>
                    <li>✓ Utilisateur(s) : {plan.maxUsers}</li>
                    <li>✓ Stockage : {plan.storageMb >= 1024 ? `${Math.round(plan.storageMb / 1024)} Go` : `${plan.storageMb} Mo`}</li>
                    <li>✓ Aucune carte ni moyen de paiement requis</li>
                  </ul>
                  {state === 'eligible' ? (
                    <StartTrialButton planId={plan.id} trialDays={plan.trialDays} />
                  ) : (
                    <Link href="/connexion" className="btn btn-primary" style={{ width: '100%' }}>
                      Se connecter pour démarrer
                    </Link>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="alert alert-info" style={{ maxWidth: 720, margin: '0 auto' }}>
              Aucun forfait ne propose d&apos;essai gratuit pour le moment.{' '}
              <Link href="/tarifs">Consulter les tarifs</Link>
            </div>
          )
        )}

        {state === 'anonyme' && plans.length > 0 && (
          <p className="text-center text-muted mt-2">
            Pas encore de compte ? <Link href="/inscription">Créez-le gratuitement</Link> en une minute.
          </p>
        )}

        {/* ── Limites de l'essai ── */}
        <section className="mt-4 mb-3">
          <div className="card" style={{ maxWidth: 820, margin: '0 auto' }}>
            <h2>Ce qu&apos;il faut savoir sur l&apos;essai</h2>
            <ul className="mt-2" style={{ paddingLeft: 20, display: 'grid', gap: 8 }}>
              <li>Un seul essai gratuit par compte — il ne peut pas être renouvelé ni prolongé.</li>
              <li>À la fin de la période d&apos;essai, l&apos;accès est automatiquement suspendu : vos
                documents et votre historique sont conservés, mais la génération est bloquée
                jusqu&apos;à la souscription d&apos;un forfait.</li>
              <li>Aucun prélèvement automatique : sans action de votre part, l&apos;essai s&apos;arrête
                simplement.</li>
              <li>Vous pouvez passer à un forfait payant à tout moment depuis la page{' '}
                <Link href="/tarifs">Tarifs &amp; forfaits</Link>.</li>
            </ul>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
