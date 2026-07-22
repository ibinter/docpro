// Petits helpers d'affichage partagés par les pages de la console.
const BADGE_MAP: Record<string, string> = {
  // succès
  active: 'badge-success',
  payee: 'badge-success',
  reussie: 'badge-success',
  validee_manuellement: 'badge-success',
  validee: 'badge-success',
  ok: 'badge-success',
  // attente / à traiter
  en_attente: 'badge-warning',
  en_attente_paiement: 'badge-warning',
  paiement_en_cours: 'badge-warning',
  en_cours: 'badge-warning',
  initialisee: 'badge-warning',
  a_verifier: 'badge-warning',
  preuve_soumise: 'badge-warning',
  soumise: 'badge-warning',
  informations_manquantes: 'badge-warning',
  complement_demande: 'badge-warning',
  grace: 'badge-warning',
  provisoire: 'badge-gold',
  ouverte: 'badge-warning',
  examinee: 'badge-info',
  // échec / fin
  expiree: 'badge-danger',
  echouee: 'badge-danger',
  rejetee: 'badge-danger',
  annulee: 'badge-danger',
  suspendue: 'badge-danger',
  revoquee: 'badge-danger',
  remboursee: 'badge-danger',
  contestee: 'badge-danger',
  confirmee: 'badge-danger',
  erreur: 'badge-danger',
  // neutres
  resiliee: 'badge-neutral',
  brouillon: 'badge-neutral',
  ecartee: 'badge-neutral',
  essai: 'badge-info',
};

const LABEL_MAP: Record<string, string> = {
  en_attente_paiement: 'Attente paiement',
  paiement_en_cours: 'Paiement en cours',
  validee_manuellement: 'Validée (manuel)',
  a_verifier: 'À vérifier',
  preuve_soumise: 'Preuve soumise',
  informations_manquantes: 'Infos manquantes',
  complement_demande: 'Complément demandé',
};

export function StatusBadge({ status }: { status: string }) {
  const cls = BADGE_MAP[status] ?? 'badge-neutral';
  const label = LABEL_MAP[status] ?? status.replace(/_/g, ' ');
  return <span className={`badge ${cls}`}>{label}</span>;
}

export function fmtDate(d: Date | string | null | undefined): string {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('fr-FR');
}

export function fmtDateTime(d: Date | string | null | undefined): string {
  if (!d) return '—';
  return new Date(d).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' });
}

/** Construit une query string en préservant les filtres (pagination). */
export function qs(params: Record<string, string | number | undefined>): string {
  const u = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== '') u.set(k, String(v));
  }
  const s = u.toString();
  return s ? `?${s}` : '';
}
