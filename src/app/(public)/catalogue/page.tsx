?// Catalogue public des modèles de documents (DocumentTemplate actifs)
// + recherche plein texte (?q=) sur nom, description et catégorie.
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { formatFcfa, formatUsd, DEFAULT_PRICE_GRID, type Classe } from '@/lib/pricing';
import { getDict } from '@/lib/i18n';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/public/SiteFooter';
import AddToCartButton from '@/components/AddToCartButton';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Catalogue de documents — IBIG DocPro',
  description:
    'CV, contrats, statuts, factures, procurations… Plus de 1 200 documents professionnels conformes aux lois de votre pays.',
};

const CATEGORY_CODES = [
  'rh_emploi',
  'juridique_admin',
  'commercial',
  'communication',
  'comptabilite_audit',
  'finance_banque',
  'informatique_tech',
  'gestion_management',
  'gestion_projet',
  'qhse',
  'entrepreneuriat',
  'btp_construction',
  'assurance',
  'transport_logistique',
  'immobilier',
  'academique',
  'sante',
  'association',
  'agro_environnement',
];

const VALID_CLASSES: Classe[] = ['A', 'B', 'C'];

/** Affiche "à partir de X FCFA · $Y" selon la classe du template (prix Standard). */
function priceFrom(classe: string | null, fallbackPrice: number, currency: string): string {
  const cls = VALID_CLASSES.includes(classe as Classe) ? (classe as Classe) : null;
  if (cls) {
    const fcfa = DEFAULT_PRICE_GRID[cls].standard;
    return `À partir de ${formatFcfa(fcfa)} · ${formatUsd(fcfa)}`;
  }
  // fallback : prix fixe du template
  const isFcfa = currency === 'XOF' || currency === 'FCFA';
  if (isFcfa) return `${formatFcfa(fallbackPrice)} · ${formatUsd(fallbackPrice)}`;
  return `${fallbackPrice} ${currency}`;
}

/** Badge visuel pour la classe A/B/C */
function ClasseBadge({ classe }: { classe: string | null }) {
  if (!classe || !VALID_CLASSES.includes(classe as Classe)) return null;
  const colors: Record<Classe, string> = { A: '#2e7d32', B: '#1565c0', C: '#6a1b9a' };
  const labels: Record<Classe, string> = { A: 'Court', B: 'Moyen', C: 'Dossier' };
  return (
    <span style={{
      fontSize: '.68rem', fontWeight: 700, padding: '1px 6px', borderRadius: 10,
      background: colors[classe as Classe] + '18',
      color: colors[classe as Classe], border: `1px solid ${colors[classe as Classe]}40`,
    }}>
      {classe} · {labels[classe as Classe]}
    </span>
  );
}

function normalize(s: string): string {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function catalogueUrl(categorie: string | null, q: string): string {
  const params = new URLSearchParams();
  if (categorie) params.set('categorie', categorie);
  if (q) params.set('q', q);
  const qs = params.toString();
  return qs ? `/catalogue?${qs}` : '/catalogue';
}

export default async function CataloguePage({
  searchParams,
}: {
  searchParams: Promise<{ categorie?: string; q?: string }>;
}) {
  const [{ t }, { categorie, q }] = await Promise.all([getDict(), searchParams]);
  const CATEGORIES = t.catalogue.categories;
  const filtre = categorie && CATEGORY_CODES.includes(categorie) ? categorie : null;
  const recherche = (q ?? '').trim().slice(0, 100);

  const all = await prisma.documentTemplate.findMany({
    where: { active: true, ...(filtre ? { category: filtre } : {}) },
    orderBy: [{ popularity: 'desc' }, { name: 'asc' }],
  });

  const needle = normalize(recherche);
  const templates = needle
    ? all.filter((tpl) => {
        const haystack = normalize(
          `${tpl.name} ${tpl.description ?? ''} ${CATEGORIES[tpl.category] ?? ''} ${tpl.category}`
        );
        return haystack.includes(needle);
      })
    : all;

  const parCategorie = new Map<string, typeof templates>();
  for (const key of CATEGORY_CODES) parCategorie.set(key, []);
  for (const tpl of templates) {
    if (!parCategorie.has(tpl.category)) parCategorie.set(tpl.category, []);
    parCategorie.get(tpl.category)!.push(tpl);
  }

  return (
    <>
      <SiteHeader />
      <main className="container mt-3" style={{ minHeight: '60vh' }}>
        <h1>{t.catalogue.titre}</h1>
        <p className="text-muted mb-2">{t.catalogue.sousTitre}</p>

        {/* Bandeau prix */}
        <div
          className="mb-3"
          style={{
            background: 'linear-gradient(135deg,#0D2B4E,#1565C0)',
            borderRadius: 10, padding: '16px 24px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: 16, flexWrap: 'wrap',
          }}
        >
          <div>
            <span style={{ color: '#fff', fontWeight: 700, fontSize: '1.05rem' }}>
              Documents à partir de{' '}
              <span style={{ color: '#FFD700' }}>100 FCFA · $0.17</span>
            </span>
            <span style={{ color: 'rgba(255,255,255,.7)', fontSize: '.85rem', marginLeft: 12 }}>
              Standard · Pro · Expert — Rechargez et économisez jusqu'à +30 %
            </span>
          </div>
          <Link href="/tarifs" className="btn btn-gold btn-sm" style={{ whiteSpace: 'nowrap' }}>
            Voir les tarifs
          </Link>
        </div>

        {/* Lien packs */}
        <Link
          href="/packs"
          className="card card-hover mb-3"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
            padding: '16px 24px', textDecoration: 'none',
            borderLeft: '4px solid var(--gold)',
          }}
        >
          <span style={{ fontWeight: 700, color: 'var(--navy)' }}>
            {t.catalogue.packsBanner}
          </span>
          <span className="btn btn-gold btn-sm">{t.catalogue.packsBtn}</span>
        </Link>

        {/* Barre de recherche */}
        <form method="GET" action="/catalogue" className="flex mb-2" style={{ flexWrap: 'wrap' }}>
          {filtre && <input type="hidden" name="categorie" value={filtre} />}
          <input
            type="search"
            name="q"
            defaultValue={recherche}
            placeholder={t.catalogue.rechercherPlaceholder}
            className="input"
            style={{ flex: '1 1 320px' }}
            aria-label={t.catalogue.rechercherAria}
            maxLength={100}
          />
          <button type="submit" className="btn btn-primary">{t.catalogue.rechercherBtn}</button>
          {recherche && (
            <Link href={catalogueUrl(filtre, '')} className="btn btn-ghost">
              {t.catalogue.effacer}
            </Link>
          )}
        </form>

        {/* Compteur */}
        <p className="text-muted mb-2">
          {recherche
            ? <>{t.catalogue.resultatsPour(templates.length, recherche)}{filtre && t.catalogue.dansCategorie(CATEGORIES[filtre])}</>
            : t.catalogue.modelesDisponibles(templates.length)
          }
        </p>

        {/* Filtres catégorie */}
        <div className="flex mb-3" style={{ flexWrap: 'wrap', gap: 8 }}>
          <Link href={catalogueUrl(null, recherche)} className={`btn btn-sm ${!filtre ? 'btn-primary' : 'btn-outline'}`}>
            {t.catalogue.toutesCategories}
          </Link>
          {CATEGORY_CODES.map((code) => (
            <Link
              key={code}
              href={catalogueUrl(code, recherche)}
              className={`btn btn-sm ${filtre === code ? 'btn-primary' : 'btn-outline'}`}
            >
              {CATEGORIES[code]}
            </Link>
          ))}
        </div>

        {/* État vide */}
        {templates.length === 0 && (
          recherche ? (
            <div className="card text-center" style={{ padding: '48px 24px' }}>
              <div style={{ fontSize: '2.4rem' }}>🔎</div>
              <h2 style={{ fontSize: '1.2rem' }} className="mt-1">
                {t.catalogue.aucunResultatTitre(recherche)}
              </h2>
              <p className="text-muted mt-1 mb-2">{t.catalogue.aucunResultatTexte}</p>
              <div className="flex" style={{ justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href={catalogueUrl(filtre, '')} className="btn btn-primary">{t.catalogue.effacerRecherche}</Link>
                <Link href="/catalogue" className="btn btn-outline">{t.catalogue.toutLeCatalogue}</Link>
              </div>
            </div>
          ) : (
            <div className="alert alert-info">{t.catalogue.aucunDocumentCategorie}</div>
          )
        )}

        {/* Grille par catégorie */}
        {[...parCategorie.entries()]
          .filter(([, list]) => list.length > 0)
          .map(([code, list]) => (
            <section key={code} className="mb-3">
              <h2 className="mb-2" style={{ fontSize: '1.3rem' }}>
                {CATEGORIES[code] ?? code}{' '}
                <span className="badge badge-info">{list.length}</span>
              </h2>
              <div className="grid grid-3">
                {list.map((tpl) => (
                  <div key={tpl.id} className="card card-hover" style={{ display: 'flex', flexDirection: 'column' }}>
                    {/* Titre + badge classe */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 4 }}>
                      <span className="card-title" style={{ flex: 1, margin: 0 }}>{tpl.name}</span>
                      <ClasseBadge classe={tpl.classe} />
                    </div>
                    {tpl.description && (
                      <p className="text-small text-muted" style={{ flex: 1 }}>
                        {tpl.description}
                      </p>
                    )}
                    <div className="flex-between mt-2" style={{ alignItems: 'center' }}>
                      <div>
                        <strong style={{ color: 'var(--cobalt)', fontSize: '.9rem' }}>
                          {priceFrom(tpl.classe, tpl.price, tpl.currency)}
                        </strong>
                        {tpl.templateType === 'excel' && (
                          <span style={{ fontSize: '.7rem', color: '#2e7d32', marginLeft: 6 }}>📊 Excel</span>
                        )}
                      </div>
                      <div className="flex" style={{ gap: 6 }}>
                        <AddToCartButton templateId={tpl.id} compact />
                        <Link href={`/documents/${tpl.code}`} className="btn btn-primary btn-sm">
                          {t.catalogue.generer}
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
      </main>
      <SiteFooter />
    </>
  );
}


