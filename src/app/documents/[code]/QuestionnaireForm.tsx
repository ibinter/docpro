'use client';
// Formulaire ChatDoc — étape par étape, un champ à la fois, avec barre de progression.
// + Mode assistant conversationnel (IA) : description libre → pré-remplissage,
// + Sélecteur « Pays du document » (adaptation légale, CDC §6.2).
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { TemplateField, Answers } from '@/lib/docgen';

type Country = { code: string; name: string };

export default function QuestionnaireForm({
  templateCode,
  fields,
  prefill,
  documentId,
  aiEnabled = false,
  countries = [],
  defaultCountry = '',
}: {
  templateCode: string;
  fields: TemplateField[];
  prefill: Answers;
  documentId: string | null;
  aiEnabled?: boolean;
  countries?: Country[];
  defaultCountry?: string;
}) {
  const router = useRouter();
  const [answers, setAnswers] = useState<Answers>(prefill);
  const [country, setCountry] = useState(defaultCountry);
  const [step, setStep] = useState(0); // index du premier champ de l'étape
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Mode assistant (IA)
  const [mode, setMode] = useState<'form' | 'assistant'>('form');
  const [description, setDescription] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [aiNotice, setAiNotice] = useState<string | null>(null);

  // Étapes de 3 champs pour un parcours fluide type « ChatDoc ».
  const PER_STEP = 3;
  const steps = useMemo(() => {
    const chunks: TemplateField[][] = [];
    for (let i = 0; i < fields.length; i += PER_STEP) chunks.push(fields.slice(i, i + PER_STEP));
    return chunks;
  }, [fields]);
  const totalSteps = Math.max(1, steps.length);
  const current = steps[step] ?? [];
  const isLast = step >= totalSteps - 1;
  const progress = Math.round(((step + 1) / totalSteps) * 100);

  const set = (key: string, value: string) => setAnswers((a) => ({ ...a, [key]: value }));

  const validateStep = (stepFields: TemplateField[]): string | null => {
    for (const f of stepFields) {
      if (f.required && !String(answers[f.key] ?? '').trim()) {
        return `Le champ « ${f.label} » est obligatoire.`;
      }
    }
    return null;
  };

  const next = () => {
    const err = validateStep(current);
    if (err) return setError(err);
    setError(null);
    setStep((s) => Math.min(s + 1, totalSteps - 1));
  };

  const submit = async () => {
    const err = validateStep(fields);
    if (err) return setError(err);
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/documents/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: templateCode, answers, documentId, country }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'La génération a échoué. Réessayez.');
      router.push(`/documents/apercu/${data.id}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur inattendue.');
      setLoading(false);
    }
  };

  // Mode assistant : Claude extrait les champs depuis la description libre,
  // puis pré-remplit le formulaire classique pour vérification humaine.
  const analyze = async () => {
    setError(null);
    setAiNotice(null);
    setAnalyzing(true);
    try {
      const res = await fetch('/api/ai/chatdoc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: templateCode, description }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "L'analyse a échoué. Réessayez.");
      setAnswers((a) => ({ ...a, ...(data.answers as Answers) }));
      setMode('form');
      setStep(0);
      setAiNotice(
        `✨ ${data.filled} champ${data.filled > 1 ? 's' : ''} pré-rempli${data.filled > 1 ? 's' : ''} par l'assistant — vérifiez et complétez avant de générer.`
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur inattendue.');
    } finally {
      setAnalyzing(false);
    }
  };

  const renderField = (f: TemplateField) => {
    const value = answers[f.key] ?? '';
    const common = {
      id: `field-${f.key}`,
      value,
      required: f.required,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
        set(f.key, e.target.value),
    };
    return (
      <div className="field" key={f.key}>
        <label className="label" htmlFor={`field-${f.key}`}>
          {f.label} {f.required && <span style={{ color: 'var(--danger)' }}>*</span>}
        </label>
        {f.type === 'textarea' ? (
          <textarea className="textarea" {...common} />
        ) : f.type === 'select' && f.options?.length ? (
          <select className="select" {...common}>
            <option value="">— Choisir —</option>
            {f.options.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        ) : (
          <input
            className="input"
            type={f.type === 'email' ? 'email' : f.type === 'date' ? 'date' : 'text'}
            {...common}
          />
        )}
        {!f.required && <p className="form-hint">Facultatif</p>}
      </div>
    );
  };

  return (
    <div className="card">
      {aiEnabled && (
        <div className="flex mb-3" role="tablist" aria-label="Mode de saisie">
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'form'}
            className={mode === 'form' ? 'btn btn-primary btn-sm' : 'btn btn-ghost btn-sm'}
            onClick={() => { setMode('form'); setError(null); }}
          >
            📝 Formulaire
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'assistant'}
            className={mode === 'assistant' ? 'btn btn-primary btn-sm' : 'btn btn-ghost btn-sm'}
            onClick={() => { setMode('assistant'); setError(null); }}
          >
            🤖 Mode assistant
          </button>
        </div>
      )}

      {mode === 'assistant' ? (
        <>
          <p className="text-muted mb-2">
            Décrivez votre besoin en langage naturel : l&apos;assistant IA remplit le questionnaire
            pour vous, puis vous vérifiez avant génération.
          </p>
          <div className="field">
            <label className="label" htmlFor="chatdoc-description">Votre demande</label>
            <textarea
              id="chatdoc-description"
              className="textarea"
              style={{ minHeight: 160 }}
              placeholder="Ex. : Je cherche un poste de comptable chez Ivoire Finances à Abidjan. Je m'appelle Aya Koné, j'ai 3 ans d'expérience en comptabilité OHADA, un BTS finance-comptabilité…"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <p className="form-hint">
              Plus votre description est précise, plus le pré-remplissage sera complet.
            </p>
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="flex" style={{ justifyContent: 'flex-end' }}>
            <button type="button" className="btn btn-gold" onClick={analyze} disabled={analyzing || !description.trim()}>
              {analyzing ? 'Analyse en cours…' : '✨ Analyser ma demande'}
            </button>
          </div>
        </>
      ) : (
        <>
          {aiNotice && <div className="alert alert-success">{aiNotice}</div>}

          <div className="flex-between mb-2">
            <span className="text-small text-muted">
              Étape {step + 1} / {totalSteps}
            </span>
            <span className="text-small text-muted">{progress} %</span>
          </div>
          <div className="progress mb-3">
            <div style={{ width: `${progress}%` }} />
          </div>

          {step === 0 && countries.length > 0 && (
            <div className="field">
              <label className="label" htmlFor="doc-country">Pays du document</label>
              <select
                id="doc-country"
                className="select"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">— Choisir —</option>
                {countries.map((c) => (
                  <option key={c.code} value={c.code}>{c.name}</option>
                ))}
              </select>
              <p className="form-hint">
                Les références légales et administratives seront adaptées à ce pays (OHADA, Code du travail local…).
              </p>
            </div>
          )}

          {current.map(renderField)}

          {error && <div className="alert alert-danger">{error}</div>}

          <div className="flex-between mt-3">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => { setError(null); setStep((s) => Math.max(0, s - 1)); }}
              disabled={step === 0 || loading}
            >
              ← Précédent
            </button>
            {isLast ? (
              <button type="button" className="btn btn-gold btn-lg" onClick={submit} disabled={loading}>
                {loading ? 'Génération en cours…' : '⚡ Générer mon document'}
              </button>
            ) : (
              <button type="button" className="btn btn-primary" onClick={next}>
                Suivant →
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
