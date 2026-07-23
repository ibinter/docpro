/**
 * Seed des 13 modèles d'emails automatiques IBIG DocPro.
 * Idempotent — upsert par (event, language, channel).
 * Usage : npx tsx scripts/seed-email-templates.ts
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const YEAR = new Date().getFullYear();

const TEMPLATES = [
  // ── Relances expiration J-7 ──────────────────────────────────────────────
  {
    event: 'expiration_j7',
    language: 'fr',
    channel: 'email',
    subject: '⏰ Votre licence IBIG DocPro expire dans 7 jours',
    body: `Bonjour {{name}},

Votre licence IBIG DocPro arrive à échéance le {{end}}.

Il vous reste 7 jours pour la renouveler et conserver un accès complet à :
• La génération illimitée de documents
• Vos modèles personnalisés
• Votre historique de documents

Renouvelez dès maintenant pour ne rien perdre :
👉 https://docpro.ibigsoft.com/tarifs

Le renouvellement prend moins de 2 minutes et votre accès est maintenu sans interruption.

---
Besoin d'aide ? Contactez-nous :
• Email : docpro@ibigsoft.com
• WhatsApp : +225 05 55 05 99 01
• Ticket : https://docpro.ibigsoft.com/compte/assistance

L'équipe IBIG DocPro`,
  },

  // ── Relances expiration J-3 ──────────────────────────────────────────────
  {
    event: 'expiration_j3',
    language: 'fr',
    channel: 'email',
    subject: '⚠️ Plus que 3 jours — Renouvelez votre licence IBIG DocPro',
    body: `Bonjour {{name}},

Votre licence IBIG DocPro expire le {{end}} — dans seulement 3 jours.

Pour éviter toute interruption de service, renouvelez dès maintenant :
👉 https://docpro.ibigsoft.com/tarifs

En renouvelant aujourd'hui :
✓ Accès continu garanti — pas de coupure
✓ Vos documents et historique conservés
✓ Paiement Mobile Money en 30 secondes

Après expiration, vous entrez en période de grâce de 7 jours avec accès limité, puis votre accès est suspendu jusqu'au renouvellement.

---
Des questions ? Notre équipe est disponible 7j/7 :
• WhatsApp : https://wa.me/2250555059901
• docpro@ibigsoft.com

L'équipe IBIG DocPro`,
  },

  // ── Relances expiration J-1 ──────────────────────────────────────────────
  {
    event: 'expiration_j1',
    language: 'fr',
    channel: 'email',
    subject: '🚨 Dernière chance — Votre licence expire demain',
    body: `Bonjour {{name}},

C'est votre dernier rappel : votre licence IBIG DocPro expire demain, le {{end}}.

Agissez maintenant pour ne pas perdre l'accès à vos documents :
👉 https://docpro.ibigsoft.com/tarifs

Renouveler prend 30 secondes via Mobile Money (Orange Money, MTN MoMo, Wave…).

Si vous ne renouvelez pas avant demain :
• Votre accès passe en mode limité (période de grâce de 7 jours)
• La génération de nouveaux documents sera suspendue
• Au-delà de 7 jours, votre compte est suspendu jusqu'au paiement

Renouvelez maintenant → https://docpro.ibigsoft.com/tarifs

L'équipe IBIG DocPro`,
  },

  // ── Essai expiré ────────────────────────────────────────────────────────
  {
    event: 'essai_expire',
    language: 'fr',
    channel: 'email',
    subject: 'Votre essai IBIG DocPro est terminé — passez à la suite',
    body: `Bonjour {{name}},

Votre essai gratuit IBIG DocPro est terminé. Merci d'avoir testé notre plateforme !

Pour continuer à générer des documents professionnels conformes au droit africain, choisissez un forfait adapté à votre activité :

📄 Standard — À partir de 100 FCFA ($0.17) · Document PDF conforme OHADA
⭐ Pro — PDF + Word modifiable + personnalisation sectorielle
💎 Expert — Tous formats + jurisprudence locale + relecture humaine

Découvrir les forfaits → https://docpro.ibigsoft.com/tarifs

Paiement en 30 secondes via Orange Money, MTN MoMo, Wave ou Moov Money.

Questions ? Notre équipe répond en moins de 2 h :
• WhatsApp : https://wa.me/2250555059901
• docpro@ibigsoft.com

L'équipe IBIG DocPro`,
  },

  // ── Licence expirée (fin de grâce) ──────────────────────────────────────
  {
    event: 'licence_expiree',
    language: 'fr',
    channel: 'email',
    subject: 'Votre accès IBIG DocPro a été suspendu',
    body: `Bonjour {{name}},

Votre période de grâce est terminée. Votre accès IBIG DocPro est actuellement suspendu.

Pour restaurer votre accès immédiatement :
👉 https://docpro.ibigsoft.com/tarifs

Vos données, documents et historique sont conservés — rien n'est supprimé. Le renouvellement rétablit votre accès en quelques secondes.

Modes de paiement acceptés :
• Orange Money · MTN MoMo · Wave · Moov Money
• Virement bancaire

Besoin d'aide pour le renouvellement ?
• WhatsApp : https://wa.me/2250555059901 (réponse immédiate)
• Email : docpro@ibigsoft.com

L'équipe IBIG DocPro`,
  },

  // ── Période de grâce ────────────────────────────────────────────────────
  {
    event: 'periode_grace',
    language: 'fr',
    channel: 'email',
    subject: 'Accès limité activé — Renouvelez avant le {{end}}',
    body: `Bonjour {{name}},

Votre licence IBIG DocPro a expiré. Vous bénéficiez d'une période de grâce de 7 jours jusqu'au {{end}}.

Durant cette période :
• Accès en lecture seule à vos documents existants
• La génération de nouveaux documents est suspendue

Pour retrouver votre accès complet maintenant :
👉 https://docpro.ibigsoft.com/tarifs

Si vous ne renouvelez pas avant le {{end}}, votre compte sera suspendu et vous perdrez temporairement accès à votre historique (vos données restent conservées).

Agissez maintenant → https://docpro.ibigsoft.com/tarifs

L'équipe IBIG DocPro`,
  },

  // ── Nouvelle connexion (sécurité) ────────────────────────────────────────
  {
    event: 'connexion_nouvelle',
    language: 'fr',
    channel: 'email',
    subject: '🔐 Nouvelle connexion à votre compte IBIG DocPro',
    body: `Bonjour {{name}},

Une nouvelle connexion a été détectée sur votre compte IBIG DocPro.

Détails de la connexion :
• Date et heure : {{date}}
• Adresse IP : {{ip}}
• Appareil : {{device}}

Si c'est bien vous, ignorez ce message. Votre compte est sécurisé.

Si vous n'êtes pas à l'origine de cette connexion :
1. Changez immédiatement votre mot de passe
2. Activez la double authentification (2FA)
3. Contactez notre support

Sécuriser mon compte → https://docpro.ibigsoft.com/compte/profil

Support sécurité : docpro@ibigsoft.com | WhatsApp : https://wa.me/2250555059901

L'équipe IBIG DocPro`,
  },

  // ── 2FA activée ─────────────────────────────────────────────────────────
  {
    event: '2fa_activee',
    language: 'fr',
    channel: 'email',
    subject: '✅ Double authentification activée sur votre compte',
    body: `Bonjour {{name}},

La double authentification (2FA) a été activée avec succès sur votre compte IBIG DocPro.

Date d'activation : {{date}}

Votre compte est maintenant protégé par deux niveaux de sécurité. À chaque connexion, vous devrez saisir un code depuis votre application d'authentification (Google Authenticator, Authy…).

Conservez précieusement vos codes de secours — ils sont la seule façon de récupérer l'accès si vous perdez votre téléphone.

Si vous n'avez pas activé la 2FA vous-même, contactez immédiatement notre support :
• Email : docpro@ibigsoft.com
• WhatsApp : https://wa.me/2250555059901

L'équipe IBIG DocPro`,
  },

  // ── 2FA désactivée (alerte) ──────────────────────────────────────────────
  {
    event: '2fa_desactivee',
    language: 'fr',
    channel: 'email',
    subject: '⚠️ Double authentification désactivée — Vérifiez votre compte',
    body: `Bonjour {{name}},

La double authentification (2FA) a été désactivée sur votre compte IBIG DocPro.

Date : {{date}}

Votre compte est maintenant protégé uniquement par votre mot de passe. Nous vous recommandons fortement de réactiver la 2FA pour une sécurité optimale.

Si vous n'avez pas effectué cette action :
1. Changez votre mot de passe immédiatement
2. Réactivez la 2FA
3. Contactez notre support sans attendre

Sécuriser mon compte → https://docpro.ibigsoft.com/compte/profil

Support d'urgence : docpro@ibigsoft.com | WhatsApp : https://wa.me/2250555059901

L'équipe IBIG DocPro`,
  },

  // ── Ticket ouvert (confirmation client) ──────────────────────────────────
  {
    event: 'ticket_ouvert',
    language: 'fr',
    channel: 'email',
    subject: 'Ticket #{{ref}} reçu — Nous vous répondons bientôt',
    body: `Bonjour {{name}},

Votre demande de support a bien été enregistrée. Notre équipe vous répondra dans les meilleurs délais.

Récapitulatif de votre ticket :
• Référence : #{{ref}}
• Objet : {{sujet}}
• Statut : En cours de traitement

Vous pouvez suivre l'avancement de votre ticket ici :
👉 https://docpro.ibigsoft.com/compte/assistance

Délais de réponse habituels :
• Questions simples : moins de 2 heures
• Questions techniques : sous 24 heures (jours ouvrés)
• Urgences : WhatsApp : https://wa.me/2250555059901

Merci de votre confiance.

L'équipe IBIG DocPro`,
  },

  // ── Réponse sur ticket ──────────────────────────────────────────────────
  {
    event: 'ticket_reponse',
    language: 'fr',
    channel: 'email',
    subject: '💬 Réponse à votre ticket #{{ref}} — IBIG DocPro',
    body: `Bonjour {{name}},

Notre équipe a répondu à votre ticket de support.

Ticket : #{{ref}}
Objet : {{sujet}}

Consultez la réponse complète dans votre espace :
👉 https://docpro.ibigsoft.com/compte/assistance

Si la réponse ne résout pas votre problème, répondez directement depuis votre espace client ou contactez-nous sur WhatsApp pour un accompagnement immédiat.

L'équipe IBIG DocPro | docpro@ibigsoft.com`,
  },

  // ── Commande créée ───────────────────────────────────────────────────────
  {
    event: 'commande_creee',
    language: 'fr',
    channel: 'email',
    subject: 'Commande #{{ref}} enregistrée — En attente de paiement',
    body: `Bonjour {{name}},

Votre commande a bien été enregistrée sur IBIG DocPro.

Détails :
• Référence : #{{ref}}
• Montant : {{montant}}
• Statut : En attente de paiement

Pour finaliser votre commande, effectuez le paiement via Mobile Money :
👉 https://docpro.ibigsoft.com/compte/commandes

Modes acceptés : Orange Money · MTN MoMo · Wave · Moov Money · Virement bancaire

Votre document sera disponible immédiatement après confirmation du paiement.

Si vous avez déjà payé et que cette commande n'est pas encore confirmée, attendez quelques minutes ou contactez-nous :
• WhatsApp : https://wa.me/2250555059901
• docpro@ibigsoft.com

L'équipe IBIG DocPro`,
  },

  // ── Paiement confirmé ────────────────────────────────────────────────────
  {
    event: 'paiement_confirme',
    language: 'fr',
    channel: 'email',
    subject: '✅ Paiement confirmé — Votre document est prêt',
    body: `Bonjour {{name}},

Votre paiement a été confirmé avec succès. Votre document est disponible immédiatement.

Récapitulatif :
• Référence : #{{ref}}
• Document : {{type}}
• Statut : Payé ✓

Télécharger votre document :
👉 https://docpro.ibigsoft.com/compte/documents

Votre document inclut un QR code d'authenticité unique, vérifiable par toute personne sur notre site public.

Besoin de modifications ou d'une régénération ? Connectez-vous à votre espace client :
👉 https://docpro.ibigsoft.com/compte

Merci d'avoir choisi IBIG DocPro. N'hésitez pas à noter votre expérience — votre avis compte pour nous.

L'équipe IBIG DocPro | docpro.ibigsoft.com`,
  },
];

async function main() {
  console.log(`Seeding ${TEMPLATES.length} email templates…\n`);
  let created = 0;
  let updated = 0;

  for (const tpl of TEMPLATES) {
    const existing = await prisma.notificationTemplate.findUnique({
      where: { event_language_channel: { event: tpl.event, language: tpl.language, channel: tpl.channel } },
    });

    if (existing) {
      await prisma.notificationTemplate.update({
        where: { id: existing.id },
        data: { subject: tpl.subject, body: tpl.body },
      });
      console.log(`  UPDATED  ${tpl.event}`);
      updated++;
    } else {
      await prisma.notificationTemplate.create({ data: tpl });
      console.log(`  CREATED  ${tpl.event}`);
      created++;
    }
  }

  console.log(`\n✓ Terminé — ${created} créés, ${updated} mis à jour.`);
  console.log(`\nAnne ${YEAR} — ${TEMPLATES.length} templates opérationnels.`);
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
