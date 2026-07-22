'use client';
// Formulaire de soumission de template (designer indépendant) :
// infos générales + constructeur simple de champs dynamiques + corps HTML.
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type FieldRow = {
  key: string;
  label: string;
  type: 'text' | 'email' | 'date' | 'textarea' | 'select';
  required: boolean;
  options: string; // options séparées par des virgules (type select)
};

const FIELD_TYPE_LABELS: Record<FieldRow['type'], string> = {
  text: 'Texte court',
  email: 'Email',
  date: 'Date',
  textarea: 'Texte long',
  select: 'Liste déroulante',
};

const BODY_EXAMPLE = `<h1 style="text-align:center">ATTESTATION DE TRAVAIL</h1>
<p>Je soussigné(e) {{nom_employeur}}, certifie que {{nom_salarie}}
est employé(e) au sein de notre entreprise depuis le {{date_embauche}}
en qualité de {{poste}}.</p>
<p>Fait pour servir et valoir ce que de droit.</p>
<p style="text-align:right">Fait le {{date_jour}}</p>`;

export default function SubmissionForm({ categories }: { categories: Record<string, string> }) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [category, setCategory] = useState(Object.keys(categories)[0] ?? '');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('1000');
  const [body, setBody] = useState('');
  const [fields, setFields] = useState<FieldRow[]>([
    { key: 'nom_complet', label: 'Nom complet', type: 'text', required: true, options: '' },
  ]);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  function updateField(i: number, patch: Partial<FieldRow>) {
    setFields((prev) => prev.map((f, idx) => (idx === i ? { ...f, ...patch } : f)));
  }

  function addField() {
    setFields((prev) => [...prev, { key: '', label: '', type: 'text', required: false, options: '' }]);
  }

  function removeField(i: number) {
    setFields((prev) => prev.filter((_, idx) => idx !== i));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSending(true);
    try {
      const res = await fetch('/api/marketplace/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          category,
          description,
          price: Number(price),
          body,
          fields: fields.map((f) => ({
            key: f.key.trim(),
            label: f.label.trim(),
            type: f.type,
            required: f.required,
            ...(f.type === 'select'
              ? { options: f.options.split(',').map((o) => o.trim()).filter(Boolean) }
              : {}),
          })),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? 'Erreur lors de la soumission. Vérifiez les champs.');
        setSending(false);
        return;
      }
      router.push('/marketplace/mes-soumissions?envoye=1');
    } catch {
      setError('Erreur réseau — réessayez.');
      setSending(false);
    }
  }

  return (
    <form onSubmit={submit}>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card mb-3">
        <h2 className="card-title">1. Informations générales</h2>
        <div className="grid grid-2">
          <div>
            <label className="label">Nom du template *</label>
            <input
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              minLength={3}
              maxLength={120}
              placeholder="Ex. : Attestation de travail moderne"
            />
          </div>
          <div>
            <label className="label">Catégorie *</label>
            <select className="select" value={category} onChange={(e) => setCategory(e.target.value)}>
              {Object.entries(categories).map(([code, label]) => (
                <option key={code} value={code}>{label}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-2">
          <label className="label">Description</label>
          <textarea
            className="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={500}
            rows={2}
            placeholder="À quoi sert ce document ? Pour qui ?"
          />
        </div>
        <div className="mt-2" style={{ maxWidth: 260 }}>
          <label className="label">Prix de vente (FCFA) * — entre 100 et 10 000</label>
          <input
            className="input"
            type="number"
            min={100}
            max={10000}
            step={50}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <p className="text-small text-muted mt-1">Vous touchez 30 % de chaque vente.</p>
        </div>
      </div>

      <div className="card mb-3">
        <h2 className="card-title">2. Champs du questionnaire</h2>
        <p className="text-small text-muted mb-2">
          Chaque champ devient une question posée au client. La <strong>clé</strong> (lettres, chiffres,
          underscore) est utilisée dans le corps du document sous la forme <code>{'{{cle}}'}</code>.
        </p>
        {fields.map((f, i) => (
          <div
            key={i}
            className="flex mb-2"
            style={{ flexWrap: 'wrap', gap: 10, alignItems: 'flex-end', borderBottom: '1px solid #ECEFF1', paddingBottom: 10 }}
          >
            <div>
              <label className="label text-small">Clé *</label>
              <input
                className="input"
                value={f.key}
                onChange={(e) => updateField(i, { key: e.target.value })}
                required
                pattern="[a-zA-Z0-9_]{2,40}"
                placeholder="nom_salarie"
                style={{ width: 160 }}
              />
            </div>
            <div>
              <label className="label text-small">Question posée *</label>
              <input
                className="input"
                value={f.label}
                onChange={(e) => updateField(i, { label: e.target.value })}
                required
                maxLength={160}
                placeholder="Nom du salarié"
                style={{ width: 220 }}
              />
            </div>
            <div>
              <label className="label text-small">Type</label>
              <select
                className="select"
                value={f.type}
                onChange={(e) => updateField(i, { type: e.target.value as FieldRow['type'] })}
                style={{ width: 160 }}
              >
                {Object.entries(FIELD_TYPE_LABELS).map(([t, label]) => (
                  <option key={t} value={t}>{label}</option>
                ))}
              </select>
            </div>
            {f.type === 'select' && (
              <div>
                <label className="label text-small">Options (séparées par des virgules)</label>
                <input
                  className="input"
                  value={f.options}
                  onChange={(e) => updateField(i, { options: e.target.value })}
                  placeholder="CDI, CDD, Stage"
                  style={{ width: 220 }}
                />
              </div>
            )}
            <label className="text-small" style={{ display: 'flex', alignItems: 'center', gap: 6, paddingBottom: 10 }}>
              <input
                type="checkbox"
                checked={f.required}
                onChange={(e) => updateField(i, { required: e.target.checked })}
              />
              Obligatoire
            </label>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => removeField(i)}
              disabled={fields.length <= 1}
              title="Supprimer ce champ"
            >
              ✕ Supprimer
            </button>
          </div>
        ))}
        <button type="button" className="btn btn-outline btn-sm" onClick={addField}>
          + Ajouter un champ
        </button>
      </div>

      <div className="card mb-3">
        <h2 className="card-title">3. Corps du document (HTML)</h2>
        <div className="alert alert-info">
          Utilisez des <strong>{'{{placeholders}}'}</strong> correspondant aux clés de vos champs :
          ils seront remplacés par les réponses du client. <code>{'{{date_jour}}'}</code> insère
          automatiquement la date du jour en français.
        </div>
        <details className="mb-2">
          <summary style={{ cursor: 'pointer', fontWeight: 600 }}>Voir un exemple complet</summary>
          <pre
            style={{ background: '#F1F5F9', padding: 12, borderRadius: 8, fontSize: '0.82rem', overflowX: 'auto', marginTop: 8 }}
          >{BODY_EXAMPLE}</pre>
        </details>
        <textarea
          className="textarea"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          rows={14}
          style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}
          placeholder={BODY_EXAMPLE}
        />
      </div>

      <button className="btn btn-gold btn-lg" type="submit" disabled={sending}>
        {sending ? 'Envoi en cours…' : 'Soumettre mon template pour validation'}
      </button>
      <p className="text-small text-muted mt-1">
        Votre template sera examiné par notre équipe avant publication. Vous serez notifié de la décision.
      </p>
    </form>
  );
}
