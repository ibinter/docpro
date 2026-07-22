// Badges de statut (espace client) — mapping statut → classe .badge-* + libellé FR.

type BadgeDef = { cls: string; label: string };

const LICENSE: Record<string, BadgeDef> = {
  essai: { cls: 'badge-warning', label: 'Essai gratuit' },
  en_attente: { cls: 'badge-info', label: 'En attente' },
  provisoire: { cls: 'badge-warning', label: 'Provisoire' },
  active: { cls: 'badge-success', label: 'Active' },
  grace: { cls: 'badge-warning', label: 'Période de grâce' },
  suspendue: { cls: 'badge-danger', label: 'Suspendue' },
  expiree: { cls: 'badge-danger', label: 'Expirée' },
  resiliee: { cls: 'badge-neutral', label: 'Résiliée' },
  revoquee: { cls: 'badge-danger', label: 'Révoquée' },
};

const ORDER: Record<string, BadgeDef> = {
  brouillon: { cls: 'badge-neutral', label: 'Brouillon' },
  en_attente_paiement: { cls: 'badge-info', label: 'En attente de paiement' },
  paiement_en_cours: { cls: 'badge-info', label: 'Paiement en cours' },
  preuve_soumise: { cls: 'badge-warning', label: 'Preuve soumise' },
  a_verifier: { cls: 'badge-warning', label: 'À vérifier' },
  informations_manquantes: { cls: 'badge-warning', label: 'Informations manquantes' },
  payee: { cls: 'badge-success', label: 'Payée' },
  expiree: { cls: 'badge-danger', label: 'Expirée' },
  annulee: { cls: 'badge-neutral', label: 'Annulée' },
  rejetee: { cls: 'badge-danger', label: 'Rejetée' },
  remboursee: { cls: 'badge-neutral', label: 'Remboursée' },
};

const TRANSACTION: Record<string, BadgeDef> = {
  initialisee: { cls: 'badge-info', label: 'Initialisée' },
  en_attente: { cls: 'badge-info', label: 'En attente' },
  en_cours: { cls: 'badge-info', label: 'En cours' },
  reussie: { cls: 'badge-success', label: 'Réussie' },
  echouee: { cls: 'badge-danger', label: 'Échouée' },
  annulee: { cls: 'badge-neutral', label: 'Annulée' },
  expiree: { cls: 'badge-danger', label: 'Expirée' },
  a_verifier: { cls: 'badge-warning', label: 'À vérifier' },
  validee_manuellement: { cls: 'badge-success', label: 'Validée manuellement' },
  rejetee: { cls: 'badge-danger', label: 'Rejetée' },
  remboursee: { cls: 'badge-neutral', label: 'Remboursée' },
  contestee: { cls: 'badge-warning', label: 'Contestée' },
};

const PROOF: Record<string, BadgeDef> = {
  soumise: { cls: 'badge-info', label: 'Soumise' },
  en_cours: { cls: 'badge-warning', label: 'En cours d’examen' },
  validee: { cls: 'badge-success', label: 'Validée' },
  rejetee: { cls: 'badge-danger', label: 'Rejetée' },
  complement_demande: { cls: 'badge-warning', label: 'Complément demandé' },
};

const INVOICE_TYPE: Record<string, string> = {
  facture: 'Facture',
  recu: 'Reçu',
  accuse_reception: 'Accusé de réception',
  confirmation_provisoire: 'Confirmation provisoire',
};

const PAYMENT_METHOD: Record<string, string> = {
  moneroo: 'Paiement électronique (Moneroo)',
  mobile_money: 'Mobile Money',
  mobile_money_manuel: 'Mobile Money (manuel)',
  virement_national: 'Virement national',
  virement_international: 'Virement international',
  transfert_international: 'Transfert international',
  especes: 'Espèces',
  electronique: 'Paiement électronique',
};

function badge(map: Record<string, BadgeDef>, status: string) {
  const def = map[status] ?? { cls: 'badge-neutral', label: status };
  return <span className={`badge ${def.cls}`}>{def.label}</span>;
}

export function LicenseBadge({ status }: { status: string }) { return badge(LICENSE, status); }
export function OrderBadge({ status }: { status: string }) { return badge(ORDER, status); }
export function TransactionBadge({ status }: { status: string }) { return badge(TRANSACTION, status); }
export function ProofBadge({ status }: { status: string }) { return badge(PROOF, status); }

export function invoiceTypeLabel(type: string) { return INVOICE_TYPE[type] ?? type; }
export function paymentMethodLabel(method: string | null | undefined) {
  if (!method) return '—';
  return PAYMENT_METHOD[method] ?? method;
}

export function fmtDate(d: Date | string | null | undefined) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });
}

export function fmtDateTime(d: Date | string | null | undefined) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('fr-FR', {
    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });
}
