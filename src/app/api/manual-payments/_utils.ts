// Helpers partagés du module paiements manuels (pas une route — préfixe _).
import { NextResponse } from 'next/server';
import { AuthError } from '@/lib/auth';
import { ProofError } from '@/lib/proofs';

/** Types de canaux manuels autorisés (hors processeur électronique). */
export const MANUAL_CHANNEL_TYPES = [
  'mobile_money',
  'banque_nationale',
  'banque_internationale',
  'transfert_international',
  'especes',
] as const;

/** Mapping type de canal → Transaction.method (valeurs documentées du schéma). */
export const METHOD_BY_CHANNEL_TYPE: Record<string, string> = {
  mobile_money: 'mobile_money_manuel',
  banque_nationale: 'virement_national',
  banque_internationale: 'virement_international',
  transfert_international: 'transfert_international',
  especes: 'especes',
};

/** Statuts de commande pour lesquels une déclaration de paiement est encore possible. */
export const DECLARABLE_ORDER_STATUSES = [
  'en_attente_paiement',
  'paiement_en_cours',
  'preuve_soumise',
  'a_verifier',
  'informations_manquantes',
];

/** Convertit toute erreur en réponse JSON { error } avec le bon statut HTTP. */
export function errorResponse(err: unknown): NextResponse {
  if (err instanceof AuthError) {
    return NextResponse.json({ error: err.message }, { status: err.status });
  }
  if (err instanceof ProofError) {
    return NextResponse.json({ error: err.message }, { status: err.status });
  }
  console.error('[manual-payments] Erreur inattendue :', err);
  return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
}

export function badRequest(message: string): NextResponse {
  return NextResponse.json({ error: message }, { status: 400 });
}

export function notFoundJson(message = 'Ressource introuvable'): NextResponse {
  return NextResponse.json({ error: message }, { status: 404 });
}

/** Lecture sûre d'un champ texte de FormData. */
export function field(form: FormData, name: string): string {
  const v = form.get(name);
  return typeof v === 'string' ? v.trim() : '';
}
