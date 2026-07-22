// Exports CSV (CDC §17.2) — admin+. Les téléchargements passent par /api/admin/exports/[type].
import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';
import ExportButtons from './ExportButtons';

export const dynamic = 'force-dynamic';

export default async function ExportsPage() {
  const me = await getSessionUser();
  if (!me || (me.role !== 'admin' && me.role !== 'superadmin')) redirect('/admin');

  return (
    <>
      <h1 className="mb-2">Exports CSV</h1>
      <div className="alert alert-info mb-3">
        Fichiers CSV encodés UTF-8 (compatibles Excel, séparateur « ; »). Sans période,
        l’export couvre toutes les données. Chaque export est tracé dans le journal d’audit.
      </div>
      <ExportButtons />
    </>
  );
}
