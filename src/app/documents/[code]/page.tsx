// Questionnaire « ChatDoc » — formulaire guidé généré depuis fieldsJson.
// Pré-rempli depuis le Profil Utilisateur Intelligent si connecté (CDC §6.2).
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { unstable_cache } from 'next/cache';
import SiteHeader from '@/components/SiteHeader';
import { prisma } from '@/lib/db';
import { formatFcfa, DEFAULT_PRICE_GRID } from '@/lib/pricing';
import { sousCategorieLabel } from '@/lib/subcategories';
import { getSessionUser } from '@/lib/auth';
import { parseFields, prefillFromProfile, splitAnswersJson, type Answers } from '@/lib/docgen';
import { aiAvailable } from '@/lib/ai/client';
import { DOCUMENT_COUNTRIES } from '@/lib/ai/countries';
import QuestionnaireForm from './QuestionnaireForm';
import NiveauSelectorSection from '@/components/NiveauSelectorSection';
import type { Classe } from '@/lib/pricing';

/** SEO : titre et description propres à chaque fiche document. */
export async function generateMetadata({ params }: { params: Promise<{ code: string }> }): Promise<Metadata> {
  const { code } = await params;
  const t = await prisma.documentTemplate.findUnique({
    where: { code },
    select: { name: true, description: true, active: true },
  });
  if (!t || !t.active) return { title: 'Document introuvable — IBIG DocPro' };
  return {
    title: `${t.name} — modèle à générer en ligne | IBIG DocPro`,
    description: (t.description ?? `Générez votre ${t.name} conforme aux lois de votre pays en quelques minutes.`).slice(0, 160),
  };
}

/** Documents similaires : même sous-catégorie (ou catégorie), en cache 10 min. */
const getSimilairesCached = unstable_cache(
  async (category: string, subcategory: string | null, excludeCode: string) => {
    const where = {
      active: true,
      category,
      code: { not: excludeCode },
      ...(subcategory && subcategory !== 'autres' ? { subcategory } : {}),
    };
    let rows = await prisma.documentTemplate.findMany({
      where,
      orderBy: { popularity: 'desc' },
      take: 6,
      select: { code: true, name: true, description: true, classe: true },
    });
    // Repli sur la catégorie entière si la sous-catégorie est trop pauvre
    if (rows.length < 3) {
      rows = await prisma.documentTemplate.findMany({
        where: { active: true, category, code: { not: excludeCode } },
        orderBy: { popularity: 'desc' },
        take: 6,
        select: { code: true, name: true, description: true, classe: true },
      });
    }
    return rows;
  },
  ['fiche-similaires'],
  { revalidate: 600 }
);

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

  const VALID_CLASSES: Classe[] = ['A', 'B', 'C'];
  const classeDoc: Classe = VALID_CLASSES.includes(template.classe as Classe)
    ? (template.classe as Classe)
    : 'B';

  const [user, similaires] = await Promise.all([
    getSessionUser(),
    getSimilairesCached(template.category, template.subcategory, template.code),
  ]);
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
        {/* Aucun badge de prix ici : les trois niveaux affichés juste en dessous
            font foi. L'ancien badge lisait template.price, un tarif fixe hérité
            décorrélé de la grille, qui contredisait ces trois prix. */}
        <h1 style={{ fontSize: '1.6rem' }} className="mb-2">{template.name}</h1>
        {template.description && <p className="text-muted mb-3">{template.description}</p>}

        <NiveauSelectorSection classeDoc={classeDoc} />

        {user ? (
          <>
            <div className="alert alert-info">
              ✨ Vos informations de profil ont été pré-remplies automatiquement — vérifiez-les puis complétez le reste.
            </div>

            <QuestionnaireForm
              templateCode={template.code}
              fields={fields}
              prefill={prefill}
              documentId={editingId}
              aiEnabled={aiAvailable()}
              countries={DOCUMENT_COUNTRIES}
              defaultCountry={defaultCountry}
            />
          </>
        ) : (
          /* Compte obligatoire : le questionnaire n'est pas rendu tant que le
             visiteur n'est pas inscrit. La création de compte est gratuite. */
          <section
            style={{
              marginTop: 20, padding: '28px 26px', borderRadius: 12,
              background: 'linear-gradient(135deg,#0D2B4E,#1565C0)', color: '#fff',
            }}
          >
            <h2 style={{ color: '#fff', fontSize: '1.2rem', margin: '0 0 10px' }}>
              Créez votre compte gratuit pour continuer
            </h2>
            <p style={{ opacity: .88, lineHeight: 1.7, margin: '0 0 18px', maxWidth: 560 }}>
              La création de compte est gratuite et immédiate. Elle vous donne accès au
              questionnaire, à l’assistant intelligent et à l’historique de vos documents.
            </p>

            <ul style={{ margin: '0 0 22px', paddingLeft: 20, lineHeight: 1.9, fontSize: '.92rem', opacity: .9 }}>
              <li>Vos informations sont pré-remplies à chaque nouveau document</li>
              <li>Vos documents restent disponibles dans votre espace</li>
              <li>Vous suivez vos paiements et téléchargez vos factures</li>
            </ul>

            <div className="flex" style={{ flexWrap: 'wrap', gap: 12 }}>
              <Link
                href={`/inscription?next=${encodeURIComponent(`/documents/${template.code}`)}`}
                className="btn btn-gold btn-lg"
              >
                Créer mon compte gratuit
              </Link>
              <Link
                href={`/connexion?next=${encodeURIComponent(`/documents/${template.code}`)}`}
                className="btn btn-outline"
                style={{ borderColor: 'rgba(255,255,255,.5)', color: '#fff' }}
              >
                J’ai déjà un compte
              </Link>
            </div>
          </section>
        )}

        {/* Documents similaires — même sous-catégorie, repli catégorie */}
        {similaires.length > 0 && (
          <section className="mt-4">
            <h2 style={{ fontSize: '1.15rem', marginBottom: 4 }}>Documents similaires</h2>
            <p className="text-small text-muted mb-2">
              {template.subcategory && template.subcategory !== 'autres'
                ? `Autres modèles « ${sousCategorieLabel(template.category, template.subcategory)} »`
                : 'Dans la même catégorie'}
              {' — '}
              <Link href={`/catalogue?categorie=${template.category}${template.subcategory && template.subcategory !== 'autres' ? `&sous=${template.subcategory}` : ''}`}>
                voir tout →
              </Link>
            </p>
            <div className="grid grid-3">
              {similaires.map(s => (
                <Link key={s.code} href={`/documents/${s.code}`} className="card card-hover"
                  style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <span style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '.92rem' }}>{s.name}</span>
                  {s.description && (
                    <span className="text-small text-muted" style={{ flex: 1 }}>
                      {s.description.slice(0, 90)}{s.description.length > 90 ? '…' : ''}
                    </span>
                  )}
                  <span style={{ color: 'var(--cobalt)', fontSize: '.8rem', fontWeight: 600 }}>
                    Télécharger →
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
