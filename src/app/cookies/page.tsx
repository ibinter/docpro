import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/public/SiteFooter';
import Link from 'next/link';

export const metadata = { title: "Politique de cookies — IBIG DocPro" };
const ANNEE = new Date().getFullYear();

export default function CookiesPage() {
  return (
    <>
      <SiteHeader />
      <div className="container" style={{ maxWidth: 820, padding: '48px 16px' }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: 6 }}>Politique de cookies</h1>
        <p style={{ color: '#888', marginBottom: 32, fontSize: '.85rem' }}>Dernière mise à jour : janvier {ANNEE}</p>

        {[
          { titre: "Qu'est-ce qu'un cookie ?", texte: "Un cookie est un petit fichier texte déposé sur votre appareil lors de la visite d'un site web. Il permet de mémoriser des informations sur votre session et vos préférences." },
          { titre: "Cookies strictement nécessaires", texte: "Ces cookies sont indispensables au fonctionnement du service. Ils ne peuvent pas être désactivés. Ils incluent notamment : le cookie de session d'authentification (docpro_session), le cookie de consentement (docpro_cookie_consent), le cookie de langue (docpro_lang), et les cookies de sécurité anti-CSRF." },
          { titre: "Cookies de performance (optionnels)", texte: "Ces cookies collectent des données anonymes sur l'utilisation du site (pages visitées, temps de chargement) pour améliorer nos services. Ils nécessitent votre consentement explicite. Aucun cookie de ce type n'est actuellement actif sans votre accord." },
          { titre: "Cookies marketing (optionnels)", texte: "IBIG DocPro n'utilise pas de cookies à des fins publicitaires ou de ciblage marketing. Nous ne partageons pas de données de navigation avec des régies publicitaires." },
          { titre: "Cookies tiers", texte: "En cas d'intégration de services tiers (cartes, vidéos), des cookies tiers peuvent être déposés. Nous vous informons systématiquement avant toute activation. Actuellement, aucun cookie tiers n'est actif par défaut." },
          { titre: "Durée de conservation", texte: "Le cookie de session expire à la fermeture du navigateur ou après 7 jours d'inactivité. Le cookie de consentement est conservé 13 mois. Les cookies de performance expirent après 13 mois." },
          { titre: "Gestion de vos préférences", texte: "Vous pouvez modifier vos préférences à tout moment via la bannière cookies (lien en bas de page). Vous pouvez également désactiver les cookies via les paramètres de votre navigateur, sachant que certaines fonctionnalités du site pourraient ne plus fonctionner correctement." },
          { titre: "Contact", texte: "Pour toute question sur notre utilisation des cookies : docpro@ibigsoft.com ou via notre formulaire de contact." },
        ].map(s => (
          <div key={s.titre} style={{ marginBottom: 24 }}>
            <h2 style={{ fontSize: '1.05rem', color: 'var(--navy)', marginBottom: 8 }}>{s.titre}</h2>
            <p style={{ color: '#444', lineHeight: 1.8, fontSize: '.9rem', margin: 0 }}>{s.texte}</p>
          </div>
        ))}

        <div style={{ borderTop: '1px solid #e0e6ed', paddingTop: 20, marginTop: 32, fontSize: '.82rem', color: '#888' }}>
          <Link href="/confidentialite" style={{ color: 'var(--cobalt)' }}>Politique de confidentialité</Link> ·{' '}
          <Link href="/rgpd" style={{ color: 'var(--cobalt)' }}>RGPD</Link> ·{' '}
          <Link href="/mentions-legales" style={{ color: 'var(--cobalt)' }}>Mentions légales</Link>
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
