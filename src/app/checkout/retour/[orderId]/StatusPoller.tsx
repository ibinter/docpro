'use client';
// Interroge GET /api/payments/orders/[id]/status toutes les 2 s tant que le
// paiement est en cours. Affichage selon le statut RÉEL serveur uniquement.
import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { formatMoney } from '@/lib/money';

type StatusDto = {
  orderId: string;
  number: string;
  status: string;
  total: number;
  currency: string;
  planCode: string | null;
  planName: string | null;
  documentId: string | null;
  licenseStatus: string | null;
  lastTransactionStatus: string | null;
  downloadUrl: string | null;
};

const POLL_MS = 2000;
const MAX_POLLS = 90; // ~3 minutes puis message d'attente prolongée

export default function StatusPoller({ orderId }: { orderId: string }) {
  const [data, setData] = useState<StatusDto | null>(null);
  const [fetchError, setFetchError] = useState(false);
  const polls = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isPending = (d: StatusDto | null) =>
    !d ||
    d.status === 'paiement_en_cours' ||
    (d.status === 'en_attente_paiement' &&
      (d.lastTransactionStatus === 'en_cours' || d.lastTransactionStatus === null));

  const load = useCallback(async () => {
    try {
      const res = await fetch(`/api/payments/orders/${orderId}/status`, { cache: 'no-store' });
      if (!res.ok) { setFetchError(true); return null; }
      const d = (await res.json()) as StatusDto;
      setFetchError(false);
      setData(d);
      return d;
    } catch {
      setFetchError(true);
      return null;
    }
  }, [orderId]);

  useEffect(() => {
    let stopped = false;
    const tick = async () => {
      const d = await load();
      polls.current += 1;
      if (!stopped && isPending(d) && polls.current < MAX_POLLS) {
        timer.current = setTimeout(tick, POLL_MS);
      }
    };
    tick();
    return () => {
      stopped = true;
      if (timer.current) clearTimeout(timer.current);
    };
  }, [load]);

  // ── Chargement initial
  if (!data) {
    return (
      <div className="card text-center">
        <Spinner />
        <h2 className="mt-2">Vérification du paiement…</h2>
        <p className="text-muted">Nous interrogeons nos serveurs, un instant.</p>
        {fetchError && <p className="text-small" style={{ color: 'var(--danger)' }}>Connexion instable — nouvelle tentative…</p>}
      </div>
    );
  }

  // ── Payée : succès confirmé côté serveur (webhook vérifié)
  if (data.status === 'payee') {
    return (
      <div className="card text-center">
        <div style={{ fontSize: 54 }}>✅</div>
        <h1 style={{ color: 'var(--success)' }}>Paiement confirmé !</h1>
        <p className="mt-1">
          Commande <strong>{data.number}</strong> — {formatMoney(data.total, data.currency)} réglés avec succès.
        </p>
        {data.planName ? (
          <>
            <p className="text-muted">
              Votre licence <strong>{data.planName}</strong> est active. Votre facture et votre reçu
              sont disponibles dans votre espace.
            </p>
            <Link href="/compte" className="btn btn-primary btn-lg mt-2">Accéder à mon espace</Link>
          </>
        ) : (
          <>
            <p className="text-muted">Votre document est débloqué et prêt au téléchargement.</p>
            {data.downloadUrl ? (
              <Link href={data.downloadUrl} className="btn btn-gold btn-lg mt-2">Télécharger mon document</Link>
            ) : (
              <Link href="/compte" className="btn btn-primary btn-lg mt-2">Retrouver mon document</Link>
            )}
            <div className="text-small text-muted mt-1">
              Lien valable 24 h — 3 téléchargements maximum.
            </div>
          </>
        )}
      </div>
    );
  }

  // ── Vérification manuelle (contrôle croisé en écart → file admin)
  if (data.status === 'a_verifier') {
    return (
      <div className="card text-center">
        <div style={{ fontSize: 54 }}>🔍</div>
        <h1 style={{ color: 'var(--warning)' }}>Vérification en cours</h1>
        <p className="mt-1">
          Votre paiement (commande <strong>{data.number}</strong>) nécessite une vérification
          manuelle par notre équipe. Vous serez notifié dès sa validation — généralement sous 24 h.
        </p>
        <Link href="/compte" className="btn btn-outline mt-2">Suivre dans mon espace</Link>
      </div>
    );
  }

  // ── Échec / annulation : proposer de réessayer
  const failed =
    ['echouee', 'annulee', 'rejetee', 'expiree'].includes(data.lastTransactionStatus ?? '') &&
    data.status !== 'payee';
  if (failed && !isPending(data)) {
    const cancelled = data.lastTransactionStatus === 'annulee';
    return (
      <div className="card text-center">
        <div style={{ fontSize: 54 }}>{cancelled ? '↩️' : '❌'}</div>
        <h1 style={{ color: 'var(--danger)' }}>{cancelled ? 'Paiement annulé' : 'Paiement échoué'}</h1>
        <p className="mt-1">
          {cancelled
            ? 'Vous avez annulé le paiement. Aucun montant n’a été débité.'
            : 'Le paiement n’a pas abouti. Aucun montant n’a été débité.'}
        </p>
        <Link href={`/checkout?order=${data.orderId}`} className="btn btn-primary btn-lg mt-2">
          Réessayer le paiement
        </Link>
        <div className="mt-1">
          <Link href="/compte" className="text-small">Retour à mon espace</Link>
        </div>
      </div>
    );
  }

  // ── En attente de confirmation serveur
  return (
    <div className="card text-center">
      <Spinner />
      <h1 className="mt-2">En attente de confirmation…</h1>
      <p className="text-muted">
        Commande <strong>{data.number}</strong> — {formatMoney(data.total, data.currency)}.<br />
        Nous attendons la confirmation sécurisée de notre partenaire de paiement.
        Cette page se met à jour automatiquement.
      </p>
      {polls.current >= MAX_POLLS && (
        <div className="alert alert-info mt-2" style={{ textAlign: 'left' }}>
          La confirmation prend plus de temps que prévu. Vous pouvez fermer cette page :
          votre licence sera activée automatiquement dès réception de la confirmation,
          et vous serez notifié. <Link href="/compte">Voir mon espace</Link>
        </div>
      )}
    </div>
  );
}

function Spinner() {
  return (
    <>
      <style>{`@keyframes dp-spin { to { transform: rotate(360deg); } }`}</style>
      <div
        aria-label="Chargement"
        style={{
          width: 44, height: 44, margin: '0 auto',
          border: '4px solid #E3F2FD', borderTopColor: 'var(--cobalt)',
          borderRadius: '50%', animation: 'dp-spin 0.9s linear infinite',
        }}
      />
    </>
  );
}
