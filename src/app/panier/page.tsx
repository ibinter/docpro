'use client';
// Page panier — sélection multiple de documents, paiement unique.
import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { formatMoney } from '@/lib/money';

interface TemplateItem {
  id: string;
  code: string;
  name: string;
  category: string;
  price: number;
  currency: string;
  description?: string | null;
}

interface CartItem {
  id: string;
  templateId: string;
  template: TemplateItem;
}

interface Cart {
  id: string;
  items: CartItem[];
}

export default function PanierPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState<string | null>(null);
  const [checkingOut, setCheckingOut] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchCart = useCallback(async () => {
    try {
      const res = await fetch('/api/cart');
      if (res.ok) {
        const data = await res.json();
        setCart(data.cart);
      }
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchCart(); }, [fetchCart]);

  const removeItem = async (templateId: string) => {
    setRemoving(templateId);
    try {
      await fetch(`/api/cart?templateId=${templateId}`, { method: 'DELETE' });
      await fetchCart();
    } finally {
      setRemoving(null);
    }
  };

  const checkout = async () => {
    setCheckingOut(true);
    setMessage(null);
    try {
      const res = await fetch('/api/cart/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({}) });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: 'success', text: `Commande ${data.number} créée — Total : ${formatMoney(data.total, data.currency)}. Rendez-vous dans vos paiements pour finaliser.` });
        setCart(null);
        setTimeout(() => { window.location.href = '/compte/paiements'; }, 2500);
      } else {
        setMessage({ type: 'error', text: data.error ?? 'Erreur lors du checkout.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Erreur réseau.' });
    } finally {
      setCheckingOut(false);
    }
  };

  const total = cart?.items.reduce((s, i) => s + i.template.price, 0) ?? 0;
  const currency = cart?.items[0]?.template.currency ?? 'XOF';

  return (
    <main className="container mt-3" style={{ minHeight: '60vh', maxWidth: 800 }}>
      <div className="flex-between mb-3" style={{ alignItems: 'center' }}>
        <h1 style={{ margin: 0 }}>Mon panier</h1>
        <Link href="/catalogue" className="btn btn-outline btn-sm">← Continuer mes achats</Link>
      </div>

      {message && (
        <div className={`alert alert-${message.type === 'success' ? 'success' : 'danger'} mb-2`}>
          {message.text}
        </div>
      )}

      {loading ? (
        <div className="card" style={{ padding: 40, textAlign: 'center', color: 'var(--muted)' }}>Chargement…</div>
      ) : !cart || cart.items.length === 0 ? (
        <div className="card text-center" style={{ padding: '60px 24px' }}>
          <div style={{ fontSize: '3rem', marginBottom: 12 }}>🛒</div>
          <h2 style={{ fontSize: '1.2rem', marginBottom: 8 }}>Votre panier est vide</h2>
          <p className="text-muted mb-3">Parcourez le catalogue et ajoutez des documents à générer.</p>
          <Link href="/catalogue" className="btn btn-primary">Explorer le catalogue</Link>
        </div>
      ) : (
        <>
          {/* Liste des items */}
          <div className="card mb-3" style={{ padding: 0, overflow: 'hidden' }}>
            {cart.items.map((item, idx) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  padding: '16px 20px',
                  borderBottom: idx < cart.items.length - 1 ? '1px solid var(--border)' : 'none',
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, color: 'var(--navy)', marginBottom: 2 }}>{item.template.name}</div>
                  {item.template.description && (
                    <div className="text-small text-muted">{item.template.description.slice(0, 100)}</div>
                  )}
                  <div className="text-small text-muted" style={{ marginTop: 4 }}>
                    Format : PDF + DOCX modifiable
                  </div>
                </div>
                <div style={{ fontWeight: 700, color: 'var(--navy)', whiteSpace: 'nowrap', minWidth: 80, textAlign: 'right' }}>
                  {formatMoney(item.template.price, item.template.currency)}
                </div>
                <button
                  onClick={() => removeItem(item.templateId)}
                  disabled={removing === item.templateId}
                  className="btn btn-ghost btn-sm"
                  style={{ color: 'var(--danger)', minWidth: 36 }}
                  title="Retirer du panier"
                >
                  {removing === item.templateId ? '…' : '✕'}
                </button>
              </div>
            ))}
          </div>

          {/* Récapitulatif */}
          <div className="card mb-3" style={{ padding: '20px 24px' }}>
            <div className="flex-between mb-2">
              <span className="text-muted">{cart.items.length} document{cart.items.length > 1 ? 's' : ''}</span>
              <span style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--navy)' }}>
                Total : {formatMoney(total, currency)}
              </span>
            </div>
            <p className="text-small text-muted mb-3">
              Paiement unique pour tous les documents. Chaque document sera généré individuellement après paiement confirmé.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button
                onClick={checkout}
                disabled={checkingOut}
                className="btn btn-primary"
                style={{ flex: '1 1 200px' }}
              >
                {checkingOut ? 'Création de la commande…' : `Payer ${formatMoney(total, currency)} →`}
              </button>
              <Link href="/catalogue" className="btn btn-outline" style={{ flex: '0 0 auto' }}>
                Ajouter d'autres documents
              </Link>
            </div>
          </div>

          {/* Avantages */}
          <div className="card" style={{ padding: '16px 20px', background: 'var(--bg-alt)' }}>
            <div className="flex" style={{ gap: 24, flexWrap: 'wrap' }}>
              <span className="text-small">✅ Paiement unique pour tous vos documents</span>
              <span className="text-small">📄 PDF + DOCX modifiable inclus</span>
              <span className="text-small">🔒 Lien sécurisé 24 h / 3 téléchargements</span>
              <span className="text-small">🌍 Adapté aux lois de votre pays</span>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
