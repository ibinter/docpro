'use client';
// Formulaire de déclaration de paiement manuel — champs selon le type de canal (CDC §12).
// Soumission multipart/form-data → POST /api/manual-payments/declare.
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const MAX_BYTES = 5 * 1024 * 1024;
const ACCEPT = '.jpg,.jpeg,.png,.webp,.pdf';

type Props = {
  orderId: string;
  channelId: string;
  channelType: string;
  channelLabel: string;
  channelCurrency: string;
  orderTotal: number;
  orderCurrency: string;
};

const TRANSFER_SERVICES = ['Western Union', 'MoneyGram', 'Ria Money Transfer', 'Remitly', 'WorldRemit', 'Sendwave', 'Autre'];
const CURRENCIES = ['XOF', 'XAF', 'EUR', 'USD', 'GBP', 'CAD', 'MAD', 'NGN', 'GHS'];

export default function DeclareForm(props: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const proofRequired = props.channelType !== 'especes';

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formEl = e.currentTarget;
    const fd = new FormData(formEl);
    fd.set('orderId', props.orderId);
    fd.set('channelId', props.channelId);

    const proof = fd.get('proof');
    if (proof instanceof File && proof.size > MAX_BYTES) {
      setError('Fichier trop volumineux : 5 Mo maximum.');
      return;
    }
    if (proofRequired && (!(proof instanceof File) || proof.size === 0)) {
      setError('La preuve de paiement (capture ou PDF) est obligatoire.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/manual-payments/declare', { method: 'POST', body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError((data as { error?: string }).error ?? 'Une erreur est survenue. Veuillez réessayer.');
        setSubmitting(false);
        return;
      }
      router.push((data as { redirect?: string; transactionId: string }).redirect ?? `/paiement-manuel/suivi/${(data as { transactionId: string }).transactionId}?ok=1`);
    } catch {
      setError('Connexion impossible. Vérifiez votre réseau puis réessayez.');
      setSubmitting(false);
    }
  }

  const t = props.channelType;

  return (
    <form onSubmit={onSubmit} className="card mt-2">
      {/* ── Champs communs / selon canal ── */}
      {t === 'mobile_money' && (
        <>
          <div className="field">
            <label className="label" htmlFor="senderPhone">Numéro expéditeur *</label>
            <input className="input" id="senderPhone" name="senderPhone" required placeholder="Ex : +225 07 00 00 00 00" />
          </div>
          <div className="field">
            <label className="label" htmlFor="senderName">Nom du titulaire du compte expéditeur *</label>
            <input className="input" id="senderName" name="senderName" required />
          </div>
          <div className="field">
            <label className="label" htmlFor="reference">Référence de la transaction *</label>
            <input className="input" id="reference" name="reference" required placeholder="ID de transaction reçu par SMS" />
            <p className="form-hint">La référence figure dans le SMS de confirmation de votre opérateur.</p>
          </div>
        </>
      )}

      {t === 'banque_nationale' && (
        <>
          <div className="field">
            <label className="label" htmlFor="reference">Référence du virement *</label>
            <input className="input" id="reference" name="reference" required />
          </div>
          <div className="field">
            <label className="label" htmlFor="senderBank">Banque émettrice *</label>
            <input className="input" id="senderBank" name="senderBank" required />
          </div>
          <div className="field">
            <label className="label" htmlFor="senderName">Nom de l’émetteur *</label>
            <input className="input" id="senderName" name="senderName" required />
          </div>
        </>
      )}

      {t === 'banque_internationale' && (
        <>
          <div className="field">
            <label className="label" htmlFor="senderName">Nom de l’émetteur *</label>
            <input className="input" id="senderName" name="senderName" required />
          </div>
          <div className="field">
            <label className="label" htmlFor="senderBank">Banque émettrice *</label>
            <input className="input" id="senderBank" name="senderBank" required />
          </div>
          <div className="field">
            <label className="label" htmlFor="senderCountry">Pays d’envoi *</label>
            <input className="input" id="senderCountry" name="senderCountry" required />
          </div>
          <div className="field">
            <label className="label" htmlFor="reference">Référence du virement *</label>
            <input className="input" id="reference" name="reference" required />
          </div>
        </>
      )}

      {t === 'transfert_international' && (
        <>
          <div className="field">
            <label className="label" htmlFor="transferService">Moyen de transfert utilisé *</label>
            <select className="select" id="transferService" name="transferService" required defaultValue="">
              <option value="" disabled>— Sélectionner —</option>
              {TRANSFER_SERVICES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label className="label" htmlFor="senderName">Nom de l’expéditeur *</label>
            <input className="input" id="senderName" name="senderName" required />
          </div>
          <div className="grid grid-2" style={{ gap: 12 }}>
            <div className="field">
              <label className="label" htmlFor="senderCountry">Pays d’envoi *</label>
              <input className="input" id="senderCountry" name="senderCountry" required />
            </div>
            <div className="field">
              <label className="label" htmlFor="senderCity">Ville d’envoi</label>
              <input className="input" id="senderCity" name="senderCity" />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="reference">Référence du transfert (MTCN / n° de contrôle) *</label>
            <input className="input" id="reference" name="reference" required />
          </div>
          <div className="field">
            <label className="label" htmlFor="beneficiary">Nom du bénéficiaire *</label>
            <input className="input" id="beneficiary" name="beneficiary" required />
          </div>
        </>
      )}

      {t === 'especes' && (
        <>
          <div className="field">
            <label className="label" htmlFor="location">Lieu du versement</label>
            <input className="input" id="location" name="location" placeholder="Siège, agence, banque…" />
          </div>
          <div className="field">
            <label className="label" htmlFor="reference">Référence du reçu (si disponible)</label>
            <input className="input" id="reference" name="reference" />
          </div>
        </>
      )}

      {/* ── Montant / devise / date ── */}
      <div className="grid grid-2" style={{ gap: 12 }}>
        <div className="field">
          <label className="label" htmlFor="amount">Montant payé *</label>
          <input
            className="input" id="amount" name="amount" type="number" min={1} step={1} required
            defaultValue={props.orderTotal}
          />
          <p className="form-hint">Montant attendu : {new Intl.NumberFormat('fr-FR').format(props.orderTotal)} {props.orderCurrency}</p>
        </div>
        {(t === 'banque_internationale' || t === 'transfert_international') ? (
          <div className="field">
            <label className="label" htmlFor="declaredCurrency">Devise *</label>
            <select className="select" id="declaredCurrency" name="declaredCurrency" required defaultValue={props.channelCurrency}>
              {CURRENCIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        ) : null}
        <div className="field">
          <label className="label" htmlFor="paymentDate">Date du paiement *</label>
          <input className="input" id="paymentDate" name="paymentDate" type="date" required max={new Date().toISOString().slice(0, 10)} />
        </div>
      </div>

      {/* ── Preuve ── */}
      <div className="field">
        <label className="label" htmlFor="proof">
          Preuve de paiement (capture d’écran ou PDF) {proofRequired ? '*' : '(facultative)'}
        </label>
        <input className="input" id="proof" name="proof" type="file" accept={ACCEPT} required={proofRequired} />
        <p className="form-hint">Formats acceptés : JPG, JPEG, PNG, WEBP, PDF — 5 Mo maximum.</p>
      </div>

      <div className="field">
        <label className="label" htmlFor="comment">Commentaire (facultatif)</label>
        <textarea className="textarea" id="comment" name="comment" maxLength={1000} placeholder="Toute information utile pour la vérification…" />
      </div>

      {error ? <div className="alert alert-danger" role="alert">{error}</div> : null}

      <button type="submit" className="btn btn-primary btn-lg" disabled={submitting}>
        {submitting ? 'Envoi en cours…' : 'Soumettre ma déclaration'}
      </button>
      <p className="form-hint mt-1">
        Après soumission, votre déclaration part en vérification manuelle (réponse sous 24h).
      </p>
    </form>
  );
}
