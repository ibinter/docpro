'use client';
// Bouton d'impression du certificat (window.print — masqué à l'impression).

export default function PrintButton() {
  return (
    <button type="button" className="btn btn-primary" onClick={() => window.print()}>
      🖨️ Imprimer le certificat
    </button>
  );
}
