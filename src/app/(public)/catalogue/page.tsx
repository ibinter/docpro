// Catalogue public des modèles de documents (DocumentTemplate actifs)
// + recherche plein texte (?q=) sur nom, description et catégorie.
import Link from 'next/link';
import { unstable_cache } from 'next/cache';
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

function catalogueUrl(categorie: string | null, q: string, page?: number): string {
  const params = new URLSearchParams();
  if (categorie) params.set('categorie', categorie);
  if (q) params.set('q', q);
  if (page && page > 1) params.set('page', String(page));
  const qs = params.toString();
  return qs ? `/catalogue?${qs}` : '/catalogue';
}

/* Performance : ne jamais charger les 12 800+ mod\u00e8les d'un coup.
   - Vue \u00ab toutes cat\u00e9gories \u00bb : top 9 par cat\u00e9gorie (aper\u00e7u) + lien \u00ab Voir tout \u00bb.
   - Vue cat\u00e9gorie / recherche : pagination SQL (60 par page).
   - `select` restreint : les colonnes lourdes (prompts\u2026) ne sortent jamais de la DB. */
const APERCU_PAR_CATEGORIE = 9;
const PAR_PAGE = 60;

const CARD_SELECT = {
  id: true, code: true, name: true, description: true,
  classe: true, price: true, currency: true,
  templateType: true, category: true,
} as const;

type CardTemplate = {
  id: string; code: string; name: string; description: string | null;
  classe: string | null; price: number; currency: string;
  templateType: string | null; category: string;
};

/* Cache 60 s : les données du catalogue sont identiques pour tous les visiteurs.
   - Aperçu (compteurs + top 9 par catégorie) : une seule entrée de cache.
   - Vues catégorie paginées : clé (categorie, page) — espace de clés fini.
   La recherche libre reste en direct (clés illimitées, déjà < 1 s). */
const getApercuCached = unstable_cache(
  async () => {
    const [counts, tops] = await Promise.all([
      prisma.documentTemplate.groupBy({
        by: ['category'],
        where: { active: true },
        _count: { id: true },
      }),
      Promise.all(
        CATEGORY_CODES.map((code) =>
          prisma.documentTemplate.findMany({
            where: { active: true, category: code },
            orderBy: [{ popularity: 'desc' }, { name: 'asc' }],
            take: APERCU_PAR_CATEGORIE,
            select: CARD_SELECT,
          })
        )
      ),
    ]);
    return { counts, tops };
  },
  ['catalogue-apercu'],
  { revalidate: 60 }
);

const getCategoriePageCached = unstable_cache(
  async (category: string, page: number) => {
    const where = { active: true, category };
    const [total, templates] = await Promise.all([
      prisma.documentTemplate.count({ where }),
      prisma.documentTemplate.findMany({
        where,
        orderBy: [{ popularity: 'desc' }, { name: 'asc' }],
        skip: (page - 1) * PAR_PAGE,
        take: PAR_PAGE,
        select: CARD_SELECT,
      }),
    ]);
    return { total, templates };
  },
  ['catalogue-categorie'],
  { revalidate: 60 }
);

/* Recherche insensible aux accents et à la casse : le `contains` SQLite est
   sensible aux accents (« faisabilite » ne trouvait pas « Faisabilité »).
   On garde en cache (5 min) un index léger de tous les modèles actifs avec
   leur texte normalisé, et on filtre en mémoire (~1 Mo, < 10 ms). */
function normaliser(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    // Ligatures : pas de décomposition NFD — « œuvre » doit matcher « oeuvre »
    .replace(/œ/g, 'oe')
    .replace(/æ/g, 'ae');
}

const getIndexRechercheCached = unstable_cache(
  async () => {
    const rows = await prisma.documentTemplate.findMany({
      where: { active: true },
      orderBy: [{ popularity: 'desc' }, { name: 'asc' }],
      select: { id: true, name: true, description: true, category: true },
    });
    return rows.map(r => ({
      id: r.id,
      category: r.category,
      texte: normaliser(`${r.name} ${r.description ?? ''} ${r.category}`),
    }));
  },
  ['catalogue-index-recherche'],
  { revalidate: 300 }
);

export default async function CataloguePage({
  searchParams,
}: {
  searchParams: Promise<{ categorie?: string; q?: string; page?: string }>;
}) {
  const [{ t }, { categorie, q, page: pageParam }] = await Promise.all([getDict(), searchParams]);
  const CATEGORIES = t.catalogue.categories;
  const filtre = categorie && CATEGORY_CODES.includes(categorie) ? categorie : null;
  const recherche = (q ?? '').trim().slice(0, 100);
  const page = Math.max(1, parseInt(pageParam ?? '1', 10) || 1);

  const modeAper\u00e7u = !filtre && !recherche;

  let templates: CardTemplate[] = [];
  let total = 0;
  let totalPages = 1;
  const parCategorie = new Map<string, CardTemplate[]>();
  const countByCat = new Map<string, number>();

  if (modeAper\u00e7u) {
    // Aper\u00e7u servi depuis le cache (60 s) \u2014 une seule entr\u00e9e pour tous les visiteurs.
    const { counts, tops } = await getApercuCached();
    for (const c of counts) countByCat.set(c.category, c._count.id);
    CATEGORY_CODES.forEach((code, i) => {
      if (tops[i].length > 0) parCategorie.set(code, tops[i]);
    });
    total = counts.reduce((s, c) => s + c._count.id, 0);
    templates = tops.flat();
  } else {
    if (filtre && !recherche) {
      // Vue cat\u00e9gorie sans recherche : cache 60 s par (cat\u00e9gorie, page).
      ({ total, templates } = await getCategoriePageCached(filtre, page));
    } else {
      // Recherche insensible aux accents : filtrage en m\u00e9moire sur l'index normalis\u00e9.
      // Tous les mots de la requ\u00eate doivent appara\u00eetre (ET logique).
      const index = await getIndexRechercheCached();
      const termes = normaliser(recherche).split(/\s+/).filter(Boolean);
      const matches = index.filter(r =>
        (!filtre || r.category === filtre) && termes.every(t => r.texte.includes(t))
      );
      total = matches.length;
      const pageIds = matches.slice((page - 1) * PAR_PAGE, page * PAR_PAGE).map(m => m.id);
      const rows = await prisma.documentTemplate.findMany({
        where: { id: { in: pageIds } },
        select: CARD_SELECT,
      });
      // Conserver l'ordre de pertinence (popularit\u00e9) de l'index
      const parId = new Map(rows.map(r => [r.id, r]));
      templates = pageIds.map(id => parId.get(id)).filter(Boolean) as unknown as CardTemplate[];
    }
    totalPages = Math.max(1, Math.ceil(total / PAR_PAGE));
    for (const tpl of templates) {
      if (!parCategorie.has(tpl.category)) parCategorie.set(tpl.category, []);
      parCategorie.get(tpl.category)!.push(tpl);
    }
    for (const [code, list] of parCategorie) countByCat.set(code, filtre ? total : list.length);
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
            ? <>{t.catalogue.resultatsPour(total, recherche)}{filtre && t.catalogue.dansCategorie(CATEGORIES[filtre])}</>
            : t.catalogue.modelesDisponibles(total)
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
              <h2 className="mb-2" style={{ fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                {CATEGORIES[code] ?? code}{' '}
                <span className="badge badge-info">{countByCat.get(code) ?? list.length}</span>
                {modeAperçu && (countByCat.get(code) ?? 0) > APERCU_PAR_CATEGORIE && (
                  <Link href={catalogueUrl(code, '')} className="btn btn-outline btn-sm" style={{ marginLeft: 'auto' }}>
                    Voir les {(countByCat.get(code) ?? 0).toLocaleString('fr-FR')} modèles →
                  </Link>
                )}
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

        {/* Pagination (vue catégorie / recherche) */}
        {!modeAperçu && totalPages > 1 && (
          <nav aria-label="Pagination" className="flex mb-3" style={{ justifyContent: 'center', flexWrap: 'wrap', gap: 8 }}>
            {page > 1 && (
              <Link href={catalogueUrl(filtre, recherche, page - 1)} className="btn btn-outline btn-sm">
                ← Précédent
              </Link>
            )}
            {paginationPages(page, totalPages).map((p, i) =>
              p === null ? (
                <span key={`gap-${i}`} className="text-muted" style={{ padding: '4px 6px' }}>…</span>
              ) : (
                <Link
                  key={p}
                  href={catalogueUrl(filtre, recherche, p)}
                  className={`btn btn-sm ${p === page ? 'btn-primary' : 'btn-outline'}`}
                  aria-current={p === page ? 'page' : undefined}
                >
                  {p}
                </Link>
              )
            )}
            {page < totalPages && (
              <Link href={catalogueUrl(filtre, recherche, page + 1)} className="btn btn-outline btn-sm">
                Suivant →
              </Link>
            )}
          </nav>
        )}
      </main>
      <SiteFooter />
    </>
  );
}

/** Fenêtre de pagination : 1 … (p-1) p (p+1) … dernier. `null` = points de suspension. */
function paginationPages(current: number, totalPages: number): (number | null)[] {
  const pages = new Set<number>([1, totalPages, current - 1, current, current + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b);
  const out: (number | null)[] = [];
  let prev = 0;
  for (const p of sorted) {
    if (prev && p - prev > 1) out.push(null);
    out.push(p);
    prev = p;
  }
  return out;
}


