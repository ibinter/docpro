// Libellés français partagés du parcours paiement manuel.

export const CHANNEL_TYPE_LABELS: Record<string, string> = {
  mobile_money: 'Mobile Money',
  banque_nationale: 'Virement bancaire national',
  banque_internationale: 'Virement bancaire international',
  transfert_international: "Transfert international d'argent",
  especes: 'Paiement en espèces',
};

export const CHANNEL_TYPE_ICONS: Record<string, string> = {
  mobile_money: '📱',
  banque_nationale: '🏦',
  banque_internationale: '🌍',
  transfert_international: '💸',
  especes: '💵',
};

// Clés du detailsJson des canaux → libellés lisibles
export const DETAIL_KEY_LABELS: Record<string, string> = {
  numero: 'Numéro de réception',
  numeroReception: 'Numéro de réception',
  phone: 'Numéro de réception',
  titulaire: 'Nom du titulaire',
  holder: 'Nom du titulaire',
  operateur: 'Opérateur',
  banque: 'Banque',
  bank: 'Banque',
  raisonSociale: 'Raison sociale',
  compte: 'Numéro de compte',
  accountNumber: 'Numéro de compte',
  rib: 'RIB',
  iban: 'IBAN',
  swift: 'SWIFT / BIC',
  bic: 'SWIFT / BIC',
  agence: 'Agence',
  adresse: 'Adresse',
  adresseBancaire: 'Adresse bancaire',
  banqueIntermediaire: 'Banque intermédiaire',
  beneficiaire: 'Bénéficiaire',
  ville: 'Ville',
  pays: 'Pays',
  lieu: 'Lieu',
};

export function detailLabel(key: string): string {
  return DETAIL_KEY_LABELS[key] ?? key.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase());
}

// Champs déclarés (rawPayloadJson) → libellés pour la page de suivi
export const DECLARED_FIELD_LABELS: Record<string, string> = {
  channelType: 'Type de canal',
  channelLabel: 'Canal utilisé',
  senderPhone: 'Numéro expéditeur',
  senderName: "Nom de l'expéditeur",
  senderBank: 'Banque émettrice',
  senderCountry: "Pays d'envoi",
  senderCity: "Ville d'envoi",
  transferService: 'Moyen de transfert',
  reference: 'Référence',
  paymentDate: 'Date du paiement',
  declaredCurrency: 'Devise',
  beneficiary: 'Nom du bénéficiaire',
  location: 'Lieu',
  comment: 'Commentaire',
};

// Statuts de transaction → badge (classe CSS + libellé)
export const TX_STATUS_BADGES: Record<string, { label: string; cls: string }> = {
  a_verifier: { label: 'En cours de vérification', cls: 'badge-warning' },
  complement_demande: { label: 'Complément demandé', cls: 'badge-gold' },
  validee_manuellement: { label: 'Paiement validé', cls: 'badge-success' },
  rejetee: { label: 'Rejetée', cls: 'badge-danger' },
  en_attente: { label: 'En attente', cls: 'badge-neutral' },
  remboursee: { label: 'Remboursée', cls: 'badge-info' },
  contestee: { label: 'Contestée', cls: 'badge-danger' },
};

export const PROOF_STATUS_BADGES: Record<string, { label: string; cls: string }> = {
  soumise: { label: 'Soumise', cls: 'badge-info' },
  en_cours: { label: 'En cours d’examen', cls: 'badge-warning' },
  validee: { label: 'Validée', cls: 'badge-success' },
  rejetee: { label: 'Rejetée', cls: 'badge-danger' },
  complement_demande: { label: 'Complément demandé', cls: 'badge-gold' },
};

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} o`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} Ko`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} Mo`;
}
