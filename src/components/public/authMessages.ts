// Messages d'erreur d'authentification (codes passés en query string → libellés français).
export const AUTH_ERRORS: Record<string, string> = {
  champs_manquants: 'Veuillez remplir tous les champs obligatoires.',
  nom_invalide: 'Le nom doit contenir au moins 2 caractères.',
  email_invalide: "L'adresse email est invalide.",
  email_utilise: 'Un compte existe déjà avec cette adresse email. Connectez-vous.',
  mdp_court: 'Le mot de passe doit contenir au moins 8 caractères.',
  pays_invalide: 'Veuillez sélectionner un pays dans la liste.',
  telephone_invalide: 'Le numéro de téléphone est invalide (8 à 20 chiffres).',
  identifiants: 'Email ou mot de passe incorrect.',
  erreur_serveur: 'Une erreur est survenue. Veuillez réessayer dans quelques instants.',
};

export function authErrorMessage(code?: string): string | null {
  if (!code) return null;
  return AUTH_ERRORS[code] ?? AUTH_ERRORS.erreur_serveur;
}
