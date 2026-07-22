// Avertissement de sécurité OBLIGATOIRE sur toutes les pages paiement (CDC §12.6).
export default function SecurityAlert() {
  return (
    <div className="alert alert-security" role="alert">
      🔒 <strong>Avertissement de sécurité :</strong> IBIG DocPro ne vous demandera JAMAIS
      votre code PIN Mobile Money, votre mot de passe, votre code OTP, votre code
      confidentiel, votre CVV complet ou votre mot de passe bancaire.
    </div>
  );
}
