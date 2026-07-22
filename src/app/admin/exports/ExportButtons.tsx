'use client';
// Filtres de période + boutons de téléchargement CSV.
import { useState } from 'react';

const TYPES: { type: string; label: string; desc: string }[] = [
  { type: 'commandes', label: 'Commandes (CSV)', desc: 'Numéro, client, forfait, statut, montants' },
  { type: 'transactions', label: 'Transactions (CSV)', desc: 'Références, fournisseur, statut, montants' },
  { type: 'licences', label: 'Licences (CSV)', desc: 'Client, forfait, statut, dates de validité' },
  { type: 'factures', label: 'Factures (CSV)', desc: 'Numéro, type, client, montants, période' },
];

export default function ExportButtons() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const urlFor = (type: string) => {
    const p = new URLSearchParams();
    if (from) p.set('from', from);
    if (to) p.set('to', to);
    const qs = p.toString();
    return `/api/admin/exports/${type}${qs ? `?${qs}` : ''}`;
  };

  return (
    <>
      <div className="card mb-3">
        <div className="card-title">Période (optionnelle)</div>
        <div className="grid grid-4" style={{ gap: 12 }}>
          <div>
            <label className="label">Du</label>
            <input className="input" type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
          </div>
          <div>
            <label className="label">Au (inclus)</label>
            <input className="input" type="date" value={to} onChange={(e) => setTo(e.target.value)} />
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <button className="btn btn-ghost btn-sm" type="button" onClick={() => { setFrom(''); setTo(''); }}>
              Réinitialiser
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-2" style={{ gap: 16 }}>
        {TYPES.map((t) => (
          <div className="card" key={t.type}>
            <div className="card-title">{t.label}</div>
            <p className="text-muted text-small mb-2">{t.desc}</p>
            <a className="btn btn-primary" href={urlFor(t.type)} download>
              Télécharger
            </a>
          </div>
        ))}
      </div>
    </>
  );
}
