'use client';
// Bouton « Copier » du lien de parrainage (presse-papiers navigateur).
import { useState } from 'react';

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Repli : sélection manuelle impossible à automatiser → prompt simple.
      window.prompt('Copiez votre lien de parrainage :', text);
    }
  }

  return (
    <button type="button" className="btn btn-primary btn-sm" onClick={copy}>
      {copied ? '✓ Copié !' : 'Copier le lien'}
    </button>
  );
}
