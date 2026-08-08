'use client';
// Formulaire White Label avec aperçu en direct du rendu d'en-tête de document.
import { useState } from 'react';
import type { OrgBranding } from '@/lib/org';

const HEX_RE = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
const URL_RE = /^https?:\/\/\S+$/i;

export default function BrandingForm({
  initial,
  saveAction,
  clearAction,
}: {
  initial: OrgBranding | null;
  saveAction: (formData: FormData) => Promise<void>;
  clearAction: () => Promise<void>;
}) {
  const [displayName, setDisplayName] = useState(initial?.displayName ?? '');
  const [logoUrl, setLogoUrl] = useState(initial?.logoUrl ?? '');
  const [primaryColor, setPrimaryColor] = useState(initial?.primaryColor ?? '#0D2B4E');
  // Un fichier vient d'être choisi : la case « appliquer » devient activable
  // avant même l'enregistrement.
  const [hasFile, setHasFile] = useState(false);

  const validColor = HEX_RE.test(primaryColor) ? primaryColor : '#0D2B4E';
  const validLogo = URL_RE.test(logoUrl.trim()) ? logoUrl.trim() : '';
  const previewName = displayName.trim() || 'Votre marque';

  return (
    <div className="grid grid-2">
      <div className="card">
        <div className="card-title">Personnalisation</div>
        {/* encType requis : le formulaire transporte le fichier de papier en-tête */}
        <form action={saveAction} encType="multipart/form-data">
          <div className="field">
            <label className="label" htmlFor="displayName">Nom affiché *</label>
            <input
              className="input"
              id="displayName"
              name="displayName"
              required
              minLength={2}
              maxLength={80}
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Ex. : Cabinet Kouassi & Associés"
            />
            <p className="form-hint">Remplace « IBIG DocPro » dans l’en-tête de vos documents.</p>
          </div>
          <div className="field">
            <label className="label" htmlFor="logoUrl">URL du logo (optionnel)</label>
            <input
              className="input"
              id="logoUrl"
              name="logoUrl"
              type="url"
              maxLength={500}
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
              placeholder="https://exemple.com/logo.png"
            />
            <p className="form-hint">Lien http(s) vers une image (hauteur conseillée : 56 px min).</p>
          </div>
          <div className="field">
            <label className="label" htmlFor="primaryColor">Couleur principale</label>
            <div className="flex">
              <input
                id="primaryColor"
                name="primaryColor"
                type="color"
                value={validColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                style={{ width: 56, height: 40, border: '1.5px solid #CFD8DC', borderRadius: 8, padding: 2, cursor: 'pointer', background: '#fff' }}
              />
              <code className="text-small">{validColor}</code>
            </div>
            <p className="form-hint">Utilisée pour le bandeau et les titres de vos documents.</p>
          </div>

          {/* ── Papier en-tête ────────────────────────────────────────── */}
          <fieldset
            style={{
              border: '1px solid #E0E6ED', borderRadius: 10, padding: '14px 16px',
              margin: '20px 0 0',
            }}
          >
            <legend style={{ padding: '0 8px', fontWeight: 700, fontSize: '.9rem', color: 'var(--navy)' }}>
              Papier en-tête
            </legend>

            <p className="text-small text-muted" style={{ marginTop: 4 }}>
              Téléversez l’image de votre papier en-tête : elle habillera le haut de vos
              documents PDF et Word. Fichier PNG ou JPEG, 3 Mo maximum. Pour un rendu net,
              prévoyez une image large (2 000 px environ) et peu haute.
            </p>

            {initial?.letterheadFile && (
              <p className="text-small" style={{ color: 'var(--success)', margin: '8px 0' }}>
                ✓ Un papier en-tête est enregistré. Téléverser un nouveau fichier le remplacera.
              </p>
            )}

            <div className="field" style={{ marginTop: 10 }}>
              <label className="label" htmlFor="letterhead">
                {initial?.letterheadFile ? 'Remplacer le fichier' : 'Choisir un fichier'}
              </label>
              <input
                className="input"
                id="letterhead"
                name="letterhead"
                type="file"
                accept="image/png,image/jpeg"
                onChange={(e) => setHasFile(Boolean(e.target.files?.length))}
              />
            </div>

            <label className="flex" style={{ gap: 8, alignItems: 'flex-start', marginTop: 12 }}>
              <input
                type="checkbox"
                name="useLetterhead"
                defaultChecked={initial?.useLetterhead ?? false}
                disabled={!initial?.letterheadFile && !hasFile}
              />
              <span className="text-small">
                <strong>Appliquer mon papier en-tête à mes documents</strong>
                <br />
                <span className="text-muted">
                  Décochez pour conserver la présentation standard sans supprimer le fichier.
                </span>
              </span>
            </label>

            <label className="flex" style={{ gap: 8, alignItems: 'flex-start', marginTop: 10 }}>
              <input
                type="checkbox"
                name="letterheadOnAllPages"
                defaultChecked={initial?.letterheadOnAllPages ?? false}
              />
              <span className="text-small">
                Répéter sur toutes les pages
                <br />
                <span className="text-muted">
                  Sinon, le papier en-tête n’apparaît que sur la première page.
                </span>
              </span>
            </label>

            <div className="field" style={{ marginTop: 14 }}>
              <label className="label" htmlFor="footerText">Mentions de pied de page</label>
              <input
                className="input"
                id="footerText"
                name="footerText"
                maxLength={200}
                defaultValue={initial?.footerText ?? ''}
                placeholder="SARL Exemple — RCCM CI-ABJ-2020-B-12345 — Abidjan Cocody — +225 27 22 00 00 00"
              />
              <p className="form-hint">
                Affichées en bas de chaque page, à gauche de la numérotation.
              </p>
            </div>

            {initial?.letterheadFile && (
              <label className="flex" style={{ gap: 8, alignItems: 'center', marginTop: 12 }}>
                <input type="checkbox" name="removeLetterhead" />
                <span className="text-small" style={{ color: 'var(--danger)' }}>
                  Supprimer définitivement le papier en-tête enregistré
                </span>
              </label>
            )}
          </fieldset>

          <div className="flex mt-2">
            <button type="submit" className="btn btn-primary">Enregistrer la marque</button>
          </div>
        </form>
        {initial && (
          <form action={clearAction} className="mt-2">
            <button type="submit" className="btn btn-ghost btn-sm">
              Désactiver le White Label (revenir à IBIG DocPro)
            </button>
          </form>
        )}
      </div>

      <div className="card">
        <div className="card-title">Aperçu du document téléchargé</div>
        <div style={{ border: '1px solid #E0E6ED', borderRadius: 8, overflow: 'hidden' }}>
          {/* Bandeau (en-tête personnalisé) */}
          <div
            style={{
              background: validColor,
              color: '#fff',
              padding: '10px 16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.85rem',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700 }}>
              {validLogo && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={validLogo}
                  alt=""
                  style={{ height: 22, borderRadius: 3, background: '#fff', padding: 2 }}
                />
              )}
              {previewName} — Document authentique
            </span>
            <span style={{ background: '#D4A017', color: '#0D2B4E', borderRadius: 6, padding: '4px 10px', fontWeight: 700, fontSize: '0.75rem' }}>
              🖨️ Imprimer / PDF
            </span>
          </div>
          {/* Corps du document */}
          <div style={{ background: '#fff', padding: '22px 20px', fontFamily: "Georgia, 'Times New Roman', serif" }}>
            <h2 style={{ color: validColor, textAlign: 'center', fontSize: '1rem', marginBottom: 10 }}>
              ATTESTATION DE TRAVAIL
            </h2>
            <p style={{ fontSize: '0.8rem', color: '#1A1A2E', margin: '6px 0' }}>
              Je soussigné(e), Directeur des Ressources Humaines, atteste que…
            </p>
            <h3 style={{ color: validColor, fontSize: '0.85rem', margin: '10px 0 4px' }}>Article 1 — Objet</h3>
            <p style={{ fontSize: '0.8rem', color: '#546E7A', margin: 0 }}>Lorem ipsum dolor sit amet, consectetur…</p>
          </div>
          {/* Pied de page IBIG conservé */}
          <div style={{ borderTop: '2px solid #0D2B4E', background: '#fff', padding: '10px 16px', display: 'flex', gap: 10, alignItems: 'center' }}>
            <div
              style={{
                width: 40,
                height: 40,
                flexShrink: 0,
                background:
                  'repeating-linear-gradient(0deg,#0D2B4E 0 3px,#fff 3px 6px), repeating-linear-gradient(90deg,#0D2B4E 0 3px,#fff 3px 6px)',
                backgroundBlendMode: 'screen',
                border: '2px solid #0D2B4E',
              }}
              aria-label="QR code"
            />
            <p className="text-small" style={{ margin: 0, color: '#546E7A', fontSize: '0.72rem' }}>
              <strong style={{ color: '#0D2B4E' }}>Document authentique IBIG DocPro — vérifiez sur docpro.ibigsoft.com/verify</strong>
              <br />
              Le pied de page de vérification IBIG (QR code) est toujours conservé.
            </p>
          </div>
        </div>
        <p className="form-hint mt-1">
          L’authenticité reste garantie par IBIG : le QR code et le lien de vérification ne
          sont jamais remplacés par votre marque.
        </p>
      </div>
    </div>
  );
}
