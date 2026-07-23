import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/public/SiteFooter';

export const metadata = { title: "Accessibilité — IBIG DocPro" };
const ANNEE = new Date().getFullYear();

export default function AccessibilitePage() {
  return (
    <>
      <SiteHeader />
      <div className="container" style={{ maxWidth: 820, padding: '48px 16px' }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: 6 }}>Déclaration d'accessibilité</h1>
        <p style={{ color: '#888', marginBottom: 32, fontSize: '.85rem' }}>Janvier {ANNEE} · IBIG DocPro</p>

        {[
          { titre: "Notre engagement", texte: "IBIG Soft s'engage à rendre la plateforme IBIG DocPro accessible au plus grand nombre, y compris aux personnes en situation de handicap. Nous cherchons à respecter les critères du Référentiel Général d'Amélioration de l'Accessibilité (RGAA) et les recommandations WCAG 2.1 niveau AA." },
          { titre: "État de conformité", texte: "IBIG DocPro est partiellement conforme aux normes d'accessibilité. Des améliorations continues sont en cours. Notre objectif est d'atteindre la conformité niveau AA d'ici fin " + ANNEE + "." },
          { titre: "Fonctionnalités d'accessibilité en place", texte: "Navigation au clavier complète sur les formulaires principaux. Contrastes de couleurs conformes aux ratios WCAG AA sur le contenu textuel principal. Attributs alt sur les images informatives. Structure sémantique HTML5 avec en-têtes hiérarchisés. Taille de police adaptable via les paramètres du navigateur. Interface responsive accessible depuis un téléphone mobile." },
          { titre: "Limitations connues", texte: "Certains tableaux de données complexes peuvent ne pas être parfaitement lisibles par les lecteurs d'écran. Les documents PDF générés ne sont pas tous balisés pour l'accessibilité. Des améliorations sont prévues dans les prochaines mises à jour." },
          { titre: "Signaler un problème d'accessibilité", texte: "Si vous rencontrez une difficulté d'accès à un contenu ou à une fonctionnalité, contactez-nous : Email : docpro@ibigsoft.com — Objet : [Accessibilité] description du problème. Nous nous engageons à vous répondre dans un délai de 5 jours ouvrés et à traiter votre demande." },
          { titre: "Technologies assistives testées", texte: "La plateforme a été testée avec NVDA + Chrome (Windows), VoiceOver + Safari (iOS) et TalkBack + Chrome (Android). Des tests complémentaires sont planifiés régulièrement." },
          { titre: "Mise à jour de cette déclaration", texte: "Cette déclaration est mise à jour chaque année ou à chaque évolution significative de la plateforme. Dernière mise à jour : janvier " + ANNEE + "." },
        ].map(s => (
          <div key={s.titre} style={{ marginBottom: 24 }}>
            <h2 style={{ fontSize: '1.05rem', color: 'var(--navy)', marginBottom: 8 }}>{s.titre}</h2>
            <p style={{ color: '#444', lineHeight: 1.8, fontSize: '.9rem', margin: 0 }}>{s.texte}</p>
          </div>
        ))}
      </div>
      <SiteFooter />
    </>
  );
}
