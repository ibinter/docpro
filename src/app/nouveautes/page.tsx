// /nouveautes — journal des évolutions de la plateforme.
import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/public/SiteFooter';

export const metadata: Metadata = {
  title: 'Nouveautés — IBIG DocPro',
  description:
    'Les évolutions de la plateforme IBIG DocPro : moteur de génération, catalogue, recherche, espace client et API.',
};

interface Entree {
  periode: string;
  titre: string;
  categorie: 'Génération' | 'Catalogue' | 'Plateforme' | 'Entreprise';
  points: string[];
  lien?: { href: string; label: string };
}

const COULEURS: Record<Entree['categorie'], string> = {
  'Génération': '#6a1b9a',
  'Catalogue': '#1565C0',
  'Plateforme': '#00838F',
  'Entreprise': '#2e7d32',
};

const ENTREES: Entree[] = [
  {
    periode: 'Août 2026',
    titre: 'Navigation du catalogue par sous-catégories',
    categorie: 'Catalogue',
    points: [
      'Chaque catégorie se décline désormais en sous-catégories : « Baux & Location » dans Immobilier, « Famille & Succession » dans Juridique, « CV & Candidatures » dans RH, et une centaine d’autres.',
      'La recherche ignore les accents, la casse et les ligatures : « faisabilite » trouve « Étude de Faisabilité », « maitrise oeuvre » trouve « Maîtrise d’Œuvre ».',
      'Chaque fiche document propose désormais des modèles similaires de la même sous-catégorie.',
    ],
    lien: { href: '/catalogue', label: 'Parcourir le catalogue' },
  },
  {
    periode: 'Août 2026',
    titre: 'Documents plus spécialisés selon le métier',
    categorie: 'Génération',
    points: [
      'Le moteur adapte désormais la structure du document à sa nature : un CV, une lettre, des statuts de société et un business plan ne suivent plus le même plan type.',
      'Les niveaux Pro et Expert intègrent des repères sectoriels concrets : textes applicables, institutions de référence et ordres de grandeur en FCFA propres à chaque domaine.',
      'Chaque document généré passe un contrôle qualité automatique qui vérifie la cohérence des dates et des montants, l’absence de mentions à compléter et la pertinence des références légales au pays choisi.',
    ],
    lien: { href: '/tarifs', label: 'Comparer les niveaux' },
  },
  {
    periode: 'Août 2026',
    titre: 'Catalogue et pages nettement plus rapides',
    categorie: 'Plateforme',
    points: [
      'Le catalogue s’ouvre désormais en moins d’une seconde, y compris sur connexion mobile lente.',
      'Navigation mobile revue : menu accessible depuis un bouton dédié sur téléphone.',
      'Application installable sur l’écran d’accueil, avec consultation possible hors connexion des pages déjà visitées.',
    ],
  },
  {
    periode: 'Juillet 2026',
    titre: 'Espace entreprise et démonstrations',
    categorie: 'Entreprise',
    points: [
      'Demande de démonstration en ligne avec réponse sous 24 heures.',
      'Espaces organisation : plusieurs collaborateurs, documents partagés et personnalisation aux couleurs de votre entreprise.',
      'API partenaires pour intégrer la génération de documents à vos propres systèmes.',
    ],
    lien: { href: '/demonstration', label: 'Demander une démonstration' },
  },
  {
    periode: 'Juillet 2026',
    titre: 'Paiement, factures et assistance',
    categorie: 'Plateforme',
    points: [
      'Paiement par Mobile Money (Orange Money, MTN MoMo, Wave, Moov) et déclaration de paiement manuel avec suivi.',
      'Factures téléchargeables depuis votre espace client.',
      'Assistance par tickets avec notifications par courriel, et double authentification pour sécuriser votre compte.',
    ],
    lien: { href: '/aide', label: "Centre d'aide" },
  },
];

export default function NouveautesPage() {
  return (
    <>
      <SiteHeader />

      <section style={{ background: 'linear-gradient(135deg,#0D2B4E,#1565C0)', color: '#fff', padding: '52px 0 44px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ color: '#fff', fontSize: 'clamp(1.6rem,4vw,2.2rem)', marginBottom: 12 }}>Nouveautés</h1>
          <p style={{ opacity: .85, maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>
            Les évolutions d’IBIG DocPro, de la qualité des documents générés aux outils
            destinés aux entreprises.
          </p>
        </div>
      </section>

      <main className="container" style={{ padding: '44px 20px 60px', maxWidth: 820 }}>
        {ENTREES.map((e, i) => (
          <article
            key={i}
            style={{
              position: 'relative',
              paddingLeft: 26,
              paddingBottom: i === ENTREES.length - 1 ? 0 : 30,
              borderLeft: i === ENTREES.length - 1 ? 'none' : '2px solid #e0e6ed',
            }}
          >
            <span
              aria-hidden="true"
              style={{
                position: 'absolute', left: -7, top: 4,
                width: 12, height: 12, borderRadius: '50%',
                background: COULEURS[e.categorie], border: '2px solid #fff',
                boxShadow: '0 0 0 2px ' + COULEURS[e.categorie] + '33',
              }}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 6 }}>
              <span style={{ fontSize: '.78rem', color: '#78909C', fontWeight: 600 }}>{e.periode}</span>
              <span style={{
                fontSize: '.72rem', fontWeight: 700, padding: '2px 9px', borderRadius: 10,
                background: COULEURS[e.categorie] + '18', color: COULEURS[e.categorie],
              }}>
                {e.categorie}
              </span>
            </div>

            <h2 style={{ fontSize: '1.1rem', margin: '0 0 10px' }}>{e.titre}</h2>

            <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.75, fontSize: '.92rem', color: '#37474F' }}>
              {e.points.map((p, j) => (
                <li key={j} style={{ marginBottom: 7 }}>{p}</li>
              ))}
            </ul>

            {e.lien && (
              <p style={{ margin: '14px 0 0' }}>
                <Link href={e.lien.href} style={{ fontWeight: 600, fontSize: '.9rem' }}>
                  {e.lien.label} →
                </Link>
              </p>
            )}
          </article>
        ))}

        <section style={{
          marginTop: 40, padding: '24px', borderRadius: 12,
          background: '#f5f7fa', border: '1px solid #e0e6ed', textAlign: 'center',
        }}>
          <h2 style={{ fontSize: '1.05rem', marginBottom: 8 }}>Une suggestion d’amélioration ?</h2>
          <p className="text-muted" style={{ marginBottom: 16, fontSize: '.9rem' }}>
            Vos retours orientent nos priorités. Écrivez-nous, nous lisons tout.
          </p>
          <div className="flex" style={{ justifyContent: 'center', flexWrap: 'wrap', gap: 10 }}>
            <a href="mailto:docpro@ibigsoft.com?subject=Suggestion%20IBIG%20DocPro" className="btn btn-primary">
              Envoyer une suggestion
            </a>
            <Link href="/statut" className="btn btn-outline">Statut des services</Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
