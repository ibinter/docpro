'use client';
// Panneau IA de l'aperçu (CDC §6.2) :
//  - ✨ Améliorer avec l'IA (diff avant/après + Garder / Revenir à l'original)
//  - 🔎 Score qualité enrichi (suggestions Claude, fallback heuristique)
//  - 🌍 Traduction simultanée (EN / ES / PT / AR → documents liés)
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Change = { key: string; label: string; before: string; after: string };
type CreatedDoc = { id: string; language: string; title: string };

const LANGS: { code: string; label: string }[] = [
  { code: 'en', label: 'Anglais' },
  { code: 'es', label: 'Espagnol' },
  { code: 'pt', label: 'Portugais' },
  { code: 'ar', label: 'Arabe' },
];

export default function AiActions({
  documentId,
  aiEnabled,
  canEnhance,
  isTranslation,
  existingLanguages,
}: {
  documentId: string;
  aiEnabled: boolean;
  canEnhance: boolean;
  isTranslation: boolean;
  existingLanguages: string[];
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  // Amélioration IA
  const [enhancing, setEnhancing] = useState(false);
  const [changes, setChanges] = useState<Change[] | null>(null);
  const [reverting, setReverting] = useState(false);

  // Score qualité
  const [scoring, setScoring] = useState(false);
  const [scoreResult, setScoreResult] = useState<{ score: number; suggestions: string[]; ai: boolean } | null>(null);

  // Traduction
  const [selected, setSelected] = useState<string[]>([]);
  const [translating, setTranslating] = useState(false);
  const [createdDocs, setCreatedDocs] = useState<CreatedDoc[]>([]);
  const [translateNotice, setTranslateNotice] = useState<string | null>(null);

  const post = async (url: string, body: unknown) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || 'Une erreur est survenue. Réessayez.');
    return data;
  };

  const enhance = async () => {
    setError(null);
    setEnhancing(true);
    try {
      const data = await post('/api/ai/enhance', { documentId });
      setChanges(data.changes as Change[]);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur inattendue.');
    } finally {
      setEnhancing(false);
    }
  };

  const revert = async () => {
    setError(null);
    setReverting(true);
    try {
      await post('/api/ai/enhance', { documentId, revert: true });
      setChanges(null);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur inattendue.');
    } finally {
      setReverting(false);
    }
  };

  const analyzeScore = async () => {
    setError(null);
    setScoring(true);
    try {
      const data = await post('/api/ai/score', { documentId });
      setScoreResult(data as { score: number; suggestions: string[]; ai: boolean });
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur inattendue.');
    } finally {
      setScoring(false);
    }
  };

  const toggleLang = (code: string) =>
    setSelected((s) => (s.includes(code) ? s.filter((c) => c !== code) : [...s, code]));

  const translate = async () => {
    setError(null);
    setTranslateNotice(null);
    setTranslating(true);
    try {
      const data = await post('/api/ai/translate', { documentId, languages: selected });
      setCreatedDocs(data.created as CreatedDoc[]);
      setSelected([]);
      if (Array.isArray(data.errors) && data.errors.length > 0) {
        setTranslateNotice((data.errors as string[]).join(' '));
      }
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur inattendue.');
    } finally {
      setTranslating(false);
    }
  };

  if (!aiEnabled) {
    return (
      <div className="card mt-3">
        <p className="card-title">🤖 Fonctions IA</p>
        <p className="text-muted text-small">
          Amélioration, score enrichi et traduction simultanée sont indisponibles sans IA
          (clé API non configurée sur cette installation).
        </p>
      </div>
    );
  }

  return (
    <div className="card mt-3">
      <p className="card-title">🤖 Intelligence artificielle</p>
      {error && <div className="alert alert-danger">{error}</div>}

      {/* ── Amélioration IA ─────────────────────────────── */}
      <div className="flex mb-2" style={{ flexWrap: 'wrap' }}>
        {canEnhance && (
          <button type="button" className="btn btn-gold" onClick={enhance} disabled={enhancing}>
            {enhancing ? 'Amélioration en cours…' : "✨ Améliorer avec l'IA"}
          </button>
        )}
        <button type="button" className="btn btn-outline" onClick={analyzeScore} disabled={scoring}>
          {scoring ? 'Analyse en cours…' : '🔎 Analyser la qualité'}
        </button>
      </div>

      {changes && changes.length > 0 && (
        <div className="alert alert-success" style={{ marginTop: 8 }}>
          <p style={{ fontWeight: 700, marginBottom: 8 }}>
            ✨ {changes.length} champ{changes.length > 1 ? 's' : ''} amélioré{changes.length > 1 ? 's' : ''} — comparez puis choisissez :
          </p>
          {changes.map((c) => (
            <div key={c.key} style={{ marginBottom: 12 }}>
              <p style={{ fontWeight: 600, marginBottom: 4 }}>{c.label}</p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 260px', background: '#FFEBEE', borderRadius: 8, padding: 10 }}>
                  <p className="text-small" style={{ fontWeight: 700, marginBottom: 4 }}>Avant</p>
                  <p className="text-small" style={{ whiteSpace: 'pre-wrap' }}>{c.before}</p>
                </div>
                <div style={{ flex: '1 1 260px', background: '#E8F5E9', borderRadius: 8, padding: 10 }}>
                  <p className="text-small" style={{ fontWeight: 700, marginBottom: 4 }}>Après (IA)</p>
                  <p className="text-small" style={{ whiteSpace: 'pre-wrap' }}>{c.after}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="flex" style={{ flexWrap: 'wrap' }}>
            <button type="button" className="btn btn-success btn-sm" onClick={() => setChanges(null)}>
              ✔️ Garder l&apos;amélioration
            </button>
            <button type="button" className="btn btn-ghost btn-sm" onClick={revert} disabled={reverting}>
              {reverting ? 'Restauration…' : "↩️ Revenir à l'original"}
            </button>
          </div>
        </div>
      )}

      {scoreResult && (
        <div className="alert alert-info" style={{ marginTop: 8 }}>
          <p style={{ fontWeight: 700, marginBottom: 6 }}>
            Score {scoreResult.ai ? 'IA' : 'heuristique'} : {scoreResult.score}/100 — suggestions :
          </p>
          <ul style={{ paddingLeft: 20, margin: 0 }}>
            {scoreResult.suggestions.map((s, i) => (
              <li key={i} className="text-small" style={{ marginBottom: 4 }}>{s}</li>
            ))}
          </ul>
        </div>
      )}

      {/* ── Traduction simultanée ───────────────────────── */}
      {!isTranslation && (
        <div style={{ marginTop: 16, borderTop: '1px solid #ECEFF1', paddingTop: 14 }}>
          <p style={{ fontWeight: 600, marginBottom: 8 }}>🌍 Générer aussi en :</p>
          <div className="flex mb-2" style={{ flexWrap: 'wrap' }}>
            {LANGS.map((l) => {
              const exists = existingLanguages.includes(l.code);
              return (
                <label key={l.code} className="text-small" style={{ display: 'flex', alignItems: 'center', gap: 6, opacity: exists ? 0.5 : 1 }}>
                  <input
                    type="checkbox"
                    checked={selected.includes(l.code)}
                    disabled={exists || translating}
                    onChange={() => toggleLang(l.code)}
                  />
                  {l.label} {exists && '(déjà traduit)'}
                </label>
              );
            })}
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={translate}
              disabled={translating || selected.length === 0}
            >
              {translating ? 'Traduction en cours…' : '🌍 Traduire'}
            </button>
          </div>
          <p className="form-hint">
            Chaque langue crée une version liée du document (le paiement couvre toutes les versions).
          </p>
          {translateNotice && <div className="alert alert-warning">{translateNotice}</div>}
          {createdDocs.length > 0 && (
            <div className="alert alert-success">
              Traductions créées :{' '}
              {createdDocs.map((d, i) => (
                <span key={d.id}>
                  {i > 0 && ' · '}
                  <a href={`/documents/apercu/${d.id}`}>{d.title}</a>
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
