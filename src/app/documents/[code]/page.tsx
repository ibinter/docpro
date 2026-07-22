// Questionnaire « ChatDoc » — formulaire guidé généré depuis fieldsJson.
// Pré-rempli depuis le Profil Utilisateur Intelligent si connecté (CDC §6.2).
import { notFound } from 'next/navigation';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import { prisma } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';
import { formatMoney } from '@/lib/money';
import { parseFields, prefillFromProfile, splitAnswersJson, type Answers } from '@/lib/docgen';
import { aiAvailable } from '@/lib/ai/client';
import { DOCUMENT_COUNTRIES } from '@/lib/ai/countries';
import QuestionnaireForm from './QuestionnaireForm';
import NiveauSelectorSection from '@/components/NiveauSelectorSection';
import type { Classe } from '@/lib/pricing';

export default async function QuestionnairePage({
  params,
  searchParams,
}: {
  params: Promise<{ code: string }>;
  searchParams: Promise<{ doc?: string }>;
}) {
  const { code } = await params;
  const { doc: docId } = await searchParams;

  const template = await prisma.documentTemplate.findUnique({ where: { code } });
  if (!template || !template.active) notFound();

  const user = await getSessionUser();
  const fields = parseFields(template.fieldsJson);

  // Pré-remplissage : profil intelligent, puis réponses existantes si modification.
  let prefill: Answers = prefillFromProfile(fields, user);
  let editingId: string | null = null;
  let defaultCountry = user?.country ?? '';
  if (docId) {
    const existing = await prisma.generatedDocument.findUnique({ where: { id: docId } });
    if (
      existing &&
      existing.templateId === template.id &&
      !existing.paid &&
      (!existing.userId || existing.userId === user?.id)
    ) {
      const { answers: saved } = splitAnswersJson(existing.answersJson);
      if (Object.keys(saved).length > 0) {
        prefill = { ...prefill, ...saved };
        editingId = existing.id;
        if (existing.country) defaultCountry = existing.country;
      }
    }
  }

  return (
    <>
      <SiteHeader />
      <main className="container mt-4" style={{ maxWidth: 780, paddingBottom: 60 }}>
        <p className="text-small text-muted mb-1">
          <Link href="/catalogue">Catalogue</Link> › {template.name}
        </p>
        <div className="flex-between mb-2">
          <h1 style={{ fontSize: '1.6rem' }}>{template.name}</h1>
          <span className="badge badge-gold">{formatMoney(template.price, template.currency)}</span>
        </div>
        {template.description && <p className="text-muted mb-3">{template.description}</p>}

        <NiveauSelectorSection classeDoc={(template.classe as Classe) ?? 'B'} />

        {user ? (
          <div className="alert alert-info">
            ✨ Vos informations de profil ont été pré-remplies automatiquement — vérifiez-les puis complétez le reste.
          </div>
        ) : (
          <div className="alert alert-info">
            💡 <Link href="/connexion">Connectez-vous</Link> pour pré-remplir automatiquement vos informations
            et retrouver vos documents dans votre espace.
          </div>
        )}

        <QuestionnaireForm
          templateCode={template.code}
          fields={fields}
          prefill={prefill}
          documentId={editingId}
          aiEnabled={aiAvailable()}
          countries={DOCUMENT_COUNTRIES}
          defaultCountry={defaultCountry}
        />
      </main>
    </>
  );
}
