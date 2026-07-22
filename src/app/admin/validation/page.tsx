// File de validation manuelle des paiements (CDC §14.2).
import ValidationQueue from './ValidationQueue';

export const dynamic = 'force-dynamic';

export default function ValidationPage() {
  return (
    <>
      <h1 className="mb-1">File de validation manuelle</h1>
      <p className="text-muted mb-3">
        Paiements manuels en attente de vérification humaine. Aucune décision automatique — chaque cas
        est tranché par un administrateur (CDC §14.2, §19.3).
      </p>
      <ValidationQueue />
    </>
  );
}
