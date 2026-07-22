// Sécurité du compte — activation / désactivation de la 2FA TOTP (CDC §19.1).
import { redirect } from 'next/navigation';
import QRCode from 'qrcode';
import { getSessionUser } from '@/lib/auth';
import { otpauthUrl } from '@/lib/totp';

export const dynamic = 'force-dynamic';

export const metadata = { title: 'Sécurité — IBIG DocPro' };

const OK_MESSAGES: Record<string, string> = {
  secret: 'Secret généré. Scannez le QR code puis confirmez avec un premier code à 6 chiffres.',
  activee: 'Double authentification activée. Un code TOTP sera demandé à chaque connexion.',
  desactivee: 'Double authentification désactivée.',
};

const ERREUR_MESSAGES: Record<string, string> = {
  code_invalide: 'Code incorrect ou expiré. Vérifiez l’heure de votre téléphone et réessayez.',
  deja_active: 'La double authentification est déjà active sur ce compte.',
  pas_de_secret: 'Aucun secret en attente. Relancez l’activation.',
  non_active: 'La double authentification n’est pas active sur ce compte.',
};

export default async function SecuritePage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string; erreur?: string }>;
}) {
  const user = await getSessionUser();
  if (!user) redirect('/connexion');

  const { ok, erreur } = await searchParams;
  const okMsg = ok ? OK_MESSAGES[ok] : null;
  const errMsg = erreur ? (ERREUR_MESSAGES[erreur] ?? ERREUR_MESSAGES.code_invalide) : null;

  const isAdmin = user.role === 'admin' || user.role === 'superadmin';
  const setupPending = !user.totpEnabled && !!user.totpSecret;

  // QR de l'URL otpauth:// — généré côté serveur (package qrcode → data URL).
  const qrDataUrl = setupPending
    ? await QRCode.toDataURL(otpauthUrl(user.totpSecret!, user.email), { width: 220, margin: 1 })
    : null;

  return (
    <div>
      <h1 className="mb-2">Sécurité du compte</h1>

      {okMsg && <div className="alert alert-success">{okMsg}</div>}
      {errMsg && <div className="alert alert-danger">{errMsg}</div>}

      {isAdmin && !user.totpEnabled && (
        <div className="alert alert-warning">
          <strong>Fortement recommandé :</strong> votre compte dispose de privilèges
          d&apos;administration ({user.role}). Activez la double authentification (2FA) pour
          protéger la plateforme contre toute usurpation (CDC §19.1).
        </div>
      )}

      <div className="card mb-2">
        <div className="flex-between" style={{ flexWrap: 'wrap', gap: 12 }}>
          <div className="card-title" style={{ marginBottom: 0 }}>
            Double authentification (TOTP)
          </div>
          {user.totpEnabled ? (
            <span className="badge badge-success">Activée</span>
          ) : setupPending ? (
            <span className="badge badge-warning">Activation en cours</span>
          ) : (
            <span className="badge badge-warning">Désactivée</span>
          )}
        </div>
        <p className="text-small text-muted mt-1">
          En plus de votre mot de passe, un code à 6 chiffres généré par une application
          d&apos;authentification (Google Authenticator, Aegis, 2FAS, Authy…) sera exigé à
          chaque connexion. Le code change toutes les 30 secondes.
        </p>

        {/* ── État : désactivée, aucun secret → lancer l'activation ── */}
        {!user.totpEnabled && !setupPending && (
          <form method="POST" action="/api/auth/2fa/setup" className="mt-2">
            <button type="submit" className="btn btn-primary">
              Activer la double authentification
            </button>
          </form>
        )}

        {/* ── État : secret généré, en attente du premier code ── */}
        {setupPending && (
          <div className="mt-2">
            <div className="grid grid-2" style={{ alignItems: 'start' }}>
              <div>
                <p className="text-small mb-1">
                  <strong>1.</strong> Scannez ce QR code avec votre application
                  d&apos;authentification :
                </p>
                {qrDataUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={qrDataUrl}
                    alt="QR code d'activation TOTP"
                    width={220}
                    height={220}
                    style={{ border: '1px solid #ECEFF1', borderRadius: 8, background: '#fff' }}
                  />
                )}
                <p className="text-small text-muted mt-1">
                  Ou saisissez ce secret manuellement :
                  <br />
                  <code style={{ wordBreak: 'break-all', fontSize: '0.95rem' }}>
                    {user.totpSecret}
                  </code>
                </p>
              </div>
              <div>
                <p className="text-small mb-1">
                  <strong>2.</strong> Confirmez avec le code à 6 chiffres affiché :
                </p>
                <form method="POST" action="/api/auth/2fa/enable">
                  <div className="field">
                    <label className="label" htmlFor="code">Code de vérification</label>
                    <input
                      className="input"
                      id="code"
                      name="code"
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      pattern="[0-9]{6}"
                      maxLength={6}
                      minLength={6}
                      required
                      placeholder="123456"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Confirmer et activer
                  </button>
                </form>
                <form method="POST" action="/api/auth/2fa/setup" className="mt-1">
                  <button type="submit" className="btn btn-ghost btn-sm">
                    Régénérer un nouveau secret
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* ── État : activée → désactivation (code TOTP requis) ── */}
        {user.totpEnabled && (
          <div className="mt-2">
            <div className="alert alert-info">
              La 2FA est active. Pour la désactiver, saisissez un code valide de votre
              application d&apos;authentification.
            </div>
            <form method="POST" action="/api/auth/2fa/disable" className="flex" style={{ flexWrap: 'wrap', gap: 8, alignItems: 'flex-end' }}>
              <div className="field" style={{ marginBottom: 0 }}>
                <label className="label" htmlFor="code">Code de vérification</label>
                <input
                  className="input"
                  id="code"
                  name="code"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  pattern="[0-9]{6}"
                  maxLength={6}
                  minLength={6}
                  required
                  placeholder="123456"
                />
              </div>
              <button type="submit" className="btn btn-danger">
                Désactiver la 2FA
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
