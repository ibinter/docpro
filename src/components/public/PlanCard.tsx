// Carte forfait — utilisée sur la landing et la page /tarifs.
import Link from 'next/link';
import type { Plan } from '@prisma/client';
import { formatMoney } from '@/lib/money';

const DURATION_LABELS: Record<string, string> = {
  days: '/ jour',
  months: '/ mois',
  years: '/ an',
  perpetual: 'à vie',
};

export function planDurationLabel(plan: Plan): string {
  if (plan.durationType === 'perpetual') return DURATION_LABELS.perpetual;
  const base = DURATION_LABELS[plan.durationType] ?? '';
  return plan.durationValue > 1 ? `/ ${plan.durationValue} ${plan.durationType === 'months' ? 'mois' : 'ans'}` : base;
}

export function planFeatures(plan: Plan): string[] {
  try {
    const parsed = JSON.parse(plan.featuresJson ?? '[]');
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

/** Prix effectif : promo si active (fenêtre temporelle respectée), sinon prix normal. */
export function planEffectivePrice(plan: Plan): { price: number; promo: boolean } {
  if (plan.promoPrice != null) {
    const now = Date.now();
    const startOk = !plan.promoStart || plan.promoStart.getTime() <= now;
    const endOk = !plan.promoEnd || plan.promoEnd.getTime() >= now;
    if (startOk && endOk) return { price: plan.promoPrice, promo: true };
  }
  return { price: plan.price, promo: false };
}

export default function PlanCard({ plan, popular }: { plan: Plan; popular?: boolean }) {
  const features = planFeatures(plan);
  const { price, promo } = planEffectivePrice(plan);
  return (
    <div className="card card-hover price-card" style={popular ? { border: '2px solid var(--gold)' } : undefined}>
      {popular && <span className="ribbon">Populaire</span>}
      <h3 style={{ marginTop: popular ? 8 : 0 }}>{plan.name}</h3>
      {plan.description && <p className="text-muted text-small mt-1">{plan.description}</p>}
      <div className="price">
        {promo && (
          <span className="text-muted" style={{ fontSize: '1rem', textDecoration: 'line-through', marginRight: 8 }}>
            {formatMoney(plan.price, plan.currency)}
          </span>
        )}
        {formatMoney(price, plan.currency)} <small>{planDurationLabel(plan)}</small>
      </div>
      {plan.trialDays > 0 && (
        <span className="badge badge-gold">{plan.trialDays} jours d&apos;essai gratuit</span>
      )}
      <ul>
        {features.map((f) => (
          <li key={f}>✓ {f}</li>
        ))}
      </ul>
      <Link href={`/checkout?plan=${encodeURIComponent(plan.code)}`} className={`btn ${popular ? 'btn-gold' : 'btn-primary'}`} style={{ width: '100%' }}>
        Souscrire
      </Link>
    </div>
  );
}
