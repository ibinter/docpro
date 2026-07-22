'use client';
// Choix du pays de facturation (sélection EXPLICITE — jamais déduit de l'IP seule,
// CDC §18.1) puis du moyen de paiement : en ligne (Moneroo) ou canal manuel.
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { formatMoney } from '@/lib/money';

type ChannelDto = {
  id: string;
  type: string;
  provider: string;
  label: string;
  country: string | null;
  currency: string;
  instructions: string | null;
  plansJson: string | null;
  minAmount: number | null;
  maxAmount: number | null;
};

const COUNTRIES: [string, string][] = [
  ['CI', 'Côte d’Ivoire'], ['SN', 'Sénégal'], ['CM', 'Cameroun'], ['BJ', 'Bénin'],
  ['TG', 'Togo'], ['BF', 'Burkina Faso'], ['ML', 'Mali'], ['NE', 'Niger'],
  ['GN', 'Guinée'], ['CD', 'RD Congo'], ['CG', 'Congo'], ['GA', 'Gabon'],
  ['TD', 'Tchad'], ['GH', 'Ghana'], ['NG', 'Nigéria'], ['MA', 'Maroc'],
  ['DZ', 'Algérie'], ['TN', 'Tunisie'], ['FR', 'France'], ['BE', 'Belgique'],
  ['CH', 'Suisse'], ['GB', 'Royaume-Uni'], ['CA', 'Canada'], ['US', 'États-Unis'],
];

export default function CheckoutClient({
  orderId,
  planCode,
  defaultCountry,
  channels,
  total,
  currency,
}: {
  orderId: string;
  planCode: string | null;
  defaultCountry: string;
  channels: ChannelDto[];
  total: number;
  currency: string;
}) {
  const router = useRouter();
  const [country, setCountry] = useState(defaultCountry || '');
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Filtrage par pays + forfait + bornes de montant
  const visible = useMemo(() => {
    if (!country) return [];
    return channels.filter((c) => {
      if (c.country && c.country !== country) return false;
      if (c.plansJson && planCode) {
        try {
          const codes = JSON.parse(c.plansJson) as string[];
          if (Array.isArray(codes) && codes.length > 0 && !codes.includes(planCode)) return false;
        } catch { /* config illisible → on n'exclut pas */ }
      }
      if (c.minAmount != null && total < c.minAmount) return false;
      if (c.maxAmount != null && total > c.maxAmount) return false;
      return true;
    });
  }, [channels, country, planCode, total]);

  const processorChannels = visible.filter((c) => c.type === 'processeur');
  const manualChannels = visible.filter((c) => c.type !== 'processeur');
  // Le paiement en ligne simulé reste disponible même sans canal "processeur" configuré
  const onlineAvailable = processorChannels.length > 0 || channels.every((c) => c.type !== 'processeur');

  async function payOnline() {
    setBusy('online');
    setError(null);
    try {
      const res = await fetch('/api/payments/initiate', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ orderId, billingCountry: country }),
      });
      const data = (await res.json()) as { redirectUrl?: string; error?: string };
      if (!res.ok || !data.redirectUrl) {
        setError(data.error ?? 'Impossible d’initialiser le paiement. Réessayez.');
        setBusy(null);
        return;
      }
      router.push(data.redirectUrl);
    } catch {
      setError('Erreur réseau — vérifiez votre connexion puis réessayez.');
      setBusy(null);
    }
  }

  async function goManual(channelId: string) {
    setBusy(channelId);
    setError(null);
    try {
      // Enregistre le pays confirmé avant de rejoindre le parcours manuel
      await fetch(`/api/payments/orders/${orderId}/country`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ billingCountry: country }),
      });
    } catch { /* non bloquant */ }
    router.push(`/paiement-manuel/${orderId}?channel=${channelId}`);
  }

  return (
    <div className="card">
      <div className="card-title">Pays de facturation</div>
      <div className="field" style={{ maxWidth: 420 }}>
        <label className="label" htmlFor="billing-country">
          Confirmez votre pays de facturation
        </label>
        <select
          id="billing-country"
          className="select"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value="">— Sélectionnez votre pays —</option>
          {COUNTRIES.map(([code, name]) => (
            <option key={code} value={code}>{name}</option>
          ))}
        </select>
        <div className="form-hint">
          Le pays détermine les moyens de paiement disponibles. Il n&apos;est jamais déduit
          automatiquement de votre adresse IP.
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {country === '' ? (
        <div className="alert alert-info">Sélectionnez votre pays pour afficher les moyens de paiement.</div>
      ) : (
        <>
          <div className="card-title mt-2">Moyen de paiement</div>

          {onlineAvailable && (
            <div
              className="flex-between mb-2"
              style={{ border: '1.5px solid var(--cobalt)', borderRadius: 10, padding: '16px 18px', background: '#F4F8FE' }}
            >
              <div>
                <div style={{ fontWeight: 700, color: 'var(--navy)' }}>
                  Payer en ligne — activation immédiate
                </div>
                <div className="text-muted text-small">
                  Mobile Money, carte bancaire… via notre processeur sécurisé Moneroo.
                  Votre licence est activée automatiquement dès confirmation du paiement.
                </div>
              </div>
              <button className="btn btn-primary" onClick={payOnline} disabled={busy !== null}>
                {busy === 'online' ? 'Redirection…' : `Payer ${formatMoney(total, currency)}`}
              </button>
            </div>
          )}

          {manualChannels.length > 0 && (
            <>
              <div className="text-muted text-small mb-1">
                Ou payez manuellement — activation après vérification par notre équipe (sous 24 h) :
              </div>
              {manualChannels.map((c) => (
                <div
                  key={c.id}
                  className="flex-between mb-1"
                  style={{ border: '1px solid #E0E6ED', borderRadius: 10, padding: '14px 18px' }}
                >
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--navy)' }}>{c.label}</div>
                    <div className="text-muted text-small">
                      {c.provider}
                      {c.country ? ` — ${c.country}` : ' — tous pays'}
                    </div>
                  </div>
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => goManual(c.id)}
                    disabled={busy !== null}
                  >
                    {busy === c.id ? 'Ouverture…' : 'Choisir'}
                  </button>
                </div>
              ))}
            </>
          )}

          {!onlineAvailable && manualChannels.length === 0 && (
            <div className="alert alert-warning">
              Aucun moyen de paiement n&apos;est disponible pour ce pays pour le moment.
              Contactez le support pour finaliser votre achat.
            </div>
          )}
        </>
      )}
    </div>
  );
}
