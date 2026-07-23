import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/public/SiteFooter';
import Link from 'next/link';

export const metadata = { title: "Propriété intellectuelle — IBIG DocPro" };
const ANNEE = new Date().getFullYear();

export default function ProprieteIntellectuellePage() {
  return (
    <>
      <SiteHeader />
      <div className="container" style={{ maxWidth: 820, padding: '48px 16px' }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: 6 }}>Propriété intellectuelle</h1>
        <p style={{ color: '#888', marginBottom: 32, fontSize: '.85rem' }}>Version en vigueur au 1er janvier {ANNEE}</p>

        {[
          { titre: "Droits de l'Éditeur", texte: "L'ensemble des éléments constituant la plateforme IBIG DocPro — code source, interface graphique, architecture, algorithmes, modèles de documents, base de données, marques, logos, textes, images — sont la propriété exclusive de IBIG Soft (IBIG SARL) et sont protégés par les lois ivoiriennes et internationales en matière de propriété intellectuelle." },
          { titre: "Marques et logos", texte: "« IBIG DocPro », « IBIG Soft », « IBIG SARL » et leurs logos respectifs sont des marques déposées. Toute reproduction, imitation ou usage sans autorisation écrite préalable constitue une contrefaçon." },
          { titre: "Documents générés — Droits de l'utilisateur", texte: "Les documents générés par l'utilisateur via IBIG DocPro lui appartiennent. L'utilisateur acquiert un droit d'usage plein et entier sur les documents générés après paiement. IBIG Soft n'exerce aucun droit d'auteur sur le contenu personnalisé des documents générés à partir des informations fournies par l'utilisateur." },
          { titre: "Modèles de documents — Droits de l'Éditeur", texte: "Les modèles et structures de documents, les formulations juridiques, les clauses types, les formulaires et la logique de génération restent la propriété de IBIG Soft. Leur extraction, reproduction ou utilisation hors de la plateforme sans autorisation est interdite." },
          { titre: "Contenu soumis par l'utilisateur", texte: "L'utilisateur garantit disposer de tous les droits nécessaires sur les informations qu'il fournit pour la génération de documents. Il accorde à IBIG Soft une licence limitée et non-exclusive pour utiliser ces informations dans le seul but de fournir le service." },
          { titre: "Interdictions", texte: "Sont strictement interdits sans autorisation écrite : l'extraction automatisée de la base de données de modèles (scraping), la reproduction ou la revente de modèles de documents, le désassemblage ou la décompilation du code de la plateforme, l'utilisation du code source à des fins concurrentes." },
          { titre: "Signalement d'infraction", texte: "Toute infraction aux droits de propriété intellectuelle de IBIG Soft peut être signalée à : docpro@ibigsoft.com. Nous traiterons votre demande dans les meilleurs délais." },
        ].map(s => (
          <div key={s.titre} style={{ marginBottom: 24 }}>
            <h2 style={{ fontSize: '1.05rem', color: 'var(--navy)', marginBottom: 8 }}>{s.titre}</h2>
            <p style={{ color: '#444', lineHeight: 1.8, fontSize: '.9rem', margin: 0 }}>{s.texte}</p>
          </div>
        ))}

        <div style={{ borderTop: '1px solid #e0e6ed', paddingTop: 20, marginTop: 32, fontSize: '.82rem', color: '#888' }}>
          <Link href="/mentions-legales" style={{ color: 'var(--cobalt)' }}>Mentions légales</Link> ·{' '}
          <Link href="/cgu" style={{ color: 'var(--cobalt)' }}>CGU</Link> ·{' '}
          <Link href="/cgv" style={{ color: 'var(--cobalt)' }}>CGV</Link>
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
