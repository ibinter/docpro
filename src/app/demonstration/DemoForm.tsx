'use client';
import { useState } from 'react';
import Link from 'next/link';

const SECTEURS = [
  'Juridique & Administratif', 'RH & Emploi', 'Commercial & Marketing',
  'BTP & Construction', 'Santé', 'Finance & Banque', 'Entrepreneuriat',
  'Association & ONG', 'Éducation', 'Informatique & Tech', 'Autre',
];

const PAYS = [
  "Côte d'Ivoire", 'Sénégal', 'Cameroun', 'Bénin', 'Togo',
  'Burkina Faso', 'Mali', 'Guinée', 'Gabon', 'Congo', 'Niger',
  'RDC', 'Maroc', 'Algérie', 'Tunisie', 'Autre pays',
];

const iStyle: React.CSSProperties = {
  width: '100%', padding: '10px 12px', border: '1px solid #dde',
  borderRadius: 7, fontSize: '.9rem', background: '#fafafa',
  outline: 'none', boxSizing: 'border-box',
};
const lStyle: React.CSSProperties = {
  display: 'block', fontSize: '.82rem', fontWeight: 600,
  color: 'var(--navy)', marginBottom: 5,
};

export default function DemoForm() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch('/api/demo/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json() as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error ?? 'Erreur serveur');
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur — réessayez ou contactez-nous sur WhatsApp.');
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div style={{ background: '#e8f5e9', border: '2px solid #4caf50', borderRadius: 12, padding: '32px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: 12 }}>✅</div>
        <h2 style={{ color: '#2e7d32', fontSize: '1.3rem', marginBottom: 10 }}>Demande enregistrée !</h2>
        <p style={{ color: '#555', lineHeight: 1.7, marginBottom: 20 }}>
          Notre équipe vous contacte dans les <strong>24 heures</strong> pour planifier votre démonstration.
        </p>
        <p style={{ fontSize: '.85rem', color: '#777' }}>Une confirmation a été envoyée à votre adresse email.</p>
        <Link href="/catalogue" className="btn btn-primary" style={{ marginTop: 20, display: 'inline-block' }}>
          Explorer le catalogue en attendant →
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <h2 style={{ fontSize: '1.2rem', marginBottom: 4 }}>Vos informations</h2>

      {error && (
        <div style={{ background: '#ffebee', border: '1px solid #f44336', borderRadius: 8, padding: '10px 14px', fontSize: '.88rem', color: '#c62828' }}>
          {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <label style={lStyle}>Nom complet *</label>
          <input name="nom" required placeholder="Jean Kouassi" style={iStyle} />
        </div>
        <div>
          <label style={lStyle}>Email professionnel *</label>
          <input name="email" type="email" required placeholder="jean@entreprise.ci" style={iStyle} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <label style={lStyle}>Téléphone / WhatsApp</label>
          <input name="telephone" placeholder="+225 07 00 00 00 00" style={iStyle} />
        </div>
        <div>
          <label style={lStyle}>{"Nom de l'entreprise"}</label>
          <input name="entreprise" placeholder="SARL Exemple" style={iStyle} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <label style={lStyle}>Pays *</label>
          <select name="pays" required style={iStyle}>
            {PAYS.map(p => <option key={p}>{p}</option>)}
          </select>
        </div>
        <div>
          <label style={lStyle}>{"Secteur d'activité"}</label>
          <select name="secteur" style={iStyle}>
            <option value="">— Sélectionnez —</option>
            {SECTEURS.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label style={lStyle}>Niveau de solution recherché</label>
        <select name="niveauInteret" style={iStyle}>
          <option value="standard">Standard — PDF conforme OHADA (dès 100 FCFA)</option>
          <option value="pro">Pro — PDF + Word + personnalisation</option>
          <option value="expert">Expert — Tous formats + jurisprudence + relecture</option>
          <option value="custom">Solution sur mesure / entreprise</option>
        </select>
      </div>

      <div>
        <label style={lStyle}>Vos besoins (optionnel)</label>
        <textarea name="besoins" rows={4}
          placeholder="Décrivez vos besoins documentaires : types de documents, volume estimé, cas d'usage spécifiques…"
          style={{ ...iStyle, resize: 'vertical' }} />
      </div>

      <button type="submit" disabled={loading}
        className="btn btn-gold btn-lg"
        style={{ fontSize: '1rem', padding: '14px', opacity: loading ? .7 : 1 }}>
        {loading ? 'Envoi en cours…' : '📅 Demander ma démonstration gratuite'}
      </button>

      <p style={{ fontSize: '.78rem', color: '#888', textAlign: 'center', margin: 0 }}>
        Vos données restent confidentielles et ne sont jamais revendues.{' '}
        <Link href="/confidentialite" style={{ color: 'var(--cobalt)' }}>Politique de confidentialité</Link>
      </p>
    </form>
  );
}
