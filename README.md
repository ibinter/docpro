# IBIG DocPro — Plateforme de génération intelligente de documents

> « Chaque document, chaque rêve, chaque ambition — générés en quelques secondes. »

Implémentation du Cahier des Charges Technique v2.0 (juillet 2026) — IBIG SARL.
Stack : **Next.js 15** (App Router) · **TypeScript** · **Prisma** · **SQLite** (dev) / PostgreSQL (prod).

## Démarrage rapide

```bash
npm install
npm run db:push        # crée la base (dev.db)
npm run seed           # forfaits, devises, moyens de paiement, templates, comptes démo
npm run dev            # http://localhost:3000
```

### Comptes de démonstration
| Rôle | Email | Mot de passe |
|---|---|---|
| SuperAdmin | `admin@ibigsoft.com` | `Admin@2026` |
| Client | `client@demo.com` | `Client@2026` |

## Fonctionnalités implémentées

**Public** — landing, catalogue de 10 templates (CV, lettres, contrats, statuts SARL, factures, NDA…), tarifs (Starter/Pro/Pro Annuel/Entreprise), inscription/connexion.

**Génération documentaire** — questionnaire ChatDoc par étapes, pré-remplissage depuis le profil intelligent, score qualité IA, aperçu filigrané tant que non payé, lien de téléchargement à usage limité (24 h / 3 usages), QR code de vérification publique `/verify/[code]`, filigrane invisible de traçabilité.

**Module paiement (CDC §9-§20)** —
- *Électronique* : checkout avec confirmation du pays de facturation, sandbox Moneroo, **webhook signé HMAC-SHA256** avec idempotence (`WebhookEvent` unique), contrôle croisé montant+devise+référence+statut, activation **uniquement côté serveur** (jamais sur la page de retour).
- *Manuel* : Mobile Money / virements nationaux & internationaux / transferts (Western Union…) / espèces — configurables par le SuperAdmin ; upload de preuves sécurisé (magic bytes, 5 Mo max, stockage privé, SHA-256, renommage UUID) ; file de validation admin avec 6 actions (valider, rejeter, complément, doublon, suspect, **activation provisoire ≤ 7 j**).
- *Licences* : activation idempotente (1 commande = 1 licence), renouvellement sans perte de jours, upgrade avec historique conservé, conversion provisoire→définitive sans 2ᵉ licence, périodes de grâce, suspension motivée.
- *Anti-fraude* : alertes non bloquantes (preuve dupliquée, référence réutilisée, montant incohérent, compte récent, paiement multiple, signature invalide) → décision humaine.
- *Facturation* : facture + reçu PDF (pdfkit) avec QR d'authenticité, numérotation FAC-/REC-AAAA-NNNNNN.

**Espace client** — dashboard abonnement (jours restants, limites, alertes), historique filtrable, preuves, factures PDF, notifications, profil intelligent.

**Console SuperAdmin** — dashboard financier (CA, ventilations par forfait/pays/devise/moyen), file de validation, gestion commandes/transactions/licences (motif obligatoire + journal d'audit systématique), alertes anti-fraude, CRUD forfaits/canaux/devises, modèles de notifications éditables (+ email de test), paramètres de factures, exports CSV, tickets d'assistance, 8 tâches cron idempotentes, journal d'audit.

**Essai gratuit** — `/essai` : 7 jours sans paiement, règle « jamais 2 essais » (vérifiée sur l'historique immuable), suspension automatique à expiration (cron), conversion vers un forfait payant.

**IA (optionnelle — `ANTHROPIC_API_KEY`)** — mode ChatDoc conversationnel (description en langage naturel → champs extraits), amélioration du contenu avec diff avant/après et retour arrière, score qualité + suggestions, **traduction simultanée** EN/ES/PT/AR (les traductions héritent du paiement), adaptation légale par pays (OHADA détecté). Sans clé : fallback heuristique, aucun blocage.

**Packs groupés** — `/packs` : Pack Création d'entreprise (9 000 F, −49 %) et Pack Recherche d'emploi (1 500 F, −50 %), accès 1 an aux templates inclus, licences additives (ne remplacent jamais un abonnement). Seed : `npx tsx prisma/seed-packs.ts`.

**API publique v1** — `/developpeurs` : clés `dp_live_…` (hash SHA-256, affichée une seule fois, révocables), 60 appels/min/clé, endpoints `GET /api/v1/templates`, `POST /api/v1/documents`, `GET /api/v1/documents/{id}`, `GET /api/v1/verify/{code}`.

**Emails réels** — nodemailer (mode console si `SMTP_HOST` vide), gabarit charte, modèles par événement/langue interpolés (`{{name}} {{plan}} {{end}}`).

**Sécurité applicative** — middleware Edge : headers de sécurité, rate limiting (20/min routes sensibles, 300/min global), CSRF par vérification d'Origin, protection /admin ; pages CGU/confidentialité/mentions légales ; 404/erreur ; sitemap, robots, manifest PWA. **2FA TOTP** (RFC 6238, crypto natif, QR d'enrôlement, verrouillage 3 échecs) sur `/compte/securite`.

**Catalogue 634 documents** — 11 catégories (CDC §5 + BTP & Construction, Assurance, Transport & Logistique, Agro & Environnement), dont **~580 modèles professionnels convertis depuis la bibliothèque Google Drive d'IBIG** (kits IBI065/070/073/078/079, packs juridiques JUR-001→007, kit GRH, kit associations, QHSE, Méga Pack, Chef de projet). Répartition approximative : Commercial & Financier 180+, Juridique & Administratif 130+, RH & Emploi 60, BTP 47, Immobilier 43, Association 37, Assurance 30, Transport 21, Agro 15, Académique 7, Santé 4. Les variantes quasi identiques sont fusionnées en un template à sélecteur (ex. 22 polices de flotte auto → 1 modèle, ~40 comptes de fonds bancaires → 1). ~150 templates portent des variantes légales par pays (OHADA/AUSCGIE/AUDCG/AUPSRVE, CIMA, UMOA-BCEAO, FR). Seeds idempotents : `seed-catalogue.ts`, `seed-drive-*.ts`, `seed-drive2-*.ts`, `seed-drive3-*.ts`, `seed-drive4-*.ts` (via `npx tsx`).

**Certification blockchain (CDC §21)** — option +500 FCFA par document payé, hash SHA-256, certificat imprimable avec QR, vérification publique (`/api/blockchain/verify/[sha256]`). Mode simulation par défaut ; `POLYGON_RPC_URL` pour l'ancrage (signer à brancher en production).

**Organisations & White Label** — `/organisation` : équipes multi-utilisateurs, invitations email (7 j), sièges selon `Plan.maxUsers`, marque blanche ENTREPRISE (les documents téléchargés portent le branding de l'organisation, la vérification IBIG reste intacte).

**Affiliation 15 % & Marketplace 30 %** — `/parrainage` (lien de tracking, cookie 30 j, commissions idempotentes via `GET /api/cron/affiliate`, seuil de paiement 5 000 FCFA) ; `/marketplace` (soumission de templates par des créateurs, validation admin, préfixe `mkt_`).

**Interface bilingue FR/EN** — sélecteur dans l'en-tête, cookie `docpro_lang`, pages publiques traduites.

**Analytics admin** — `/admin/analytics` : revenus 30 j, inscriptions, top documents, entonnoir de conversion, MRR estimé.

## Tests

```bash
npx tsx scripts/smoke-tests.ts   # 26 scénarios (idempotence, renouvellement, provisoire, webhooks, cron)
npm run typecheck
```

## Tâches planifiées (production)

Appeler périodiquement (cron système ou scheduler cloud) :
```
GET /api/cron/run?job=all        # header x-cron-key: <SESSION_SECRET>
```
Jobs : `expire_orders` (15 min), `trial_end`, `expiry_alerts` (J-7/J-3/J-1), `grace`, `suspend_expired`, `provisional_expiry`, `daily_report`, `anomaly_scan`.

## Variables d'environnement (CDC §25.3)

Voir `.env` — `DATABASE_URL`, `SESSION_SECRET`, `MONEROO_PUBLIC_KEY`, `MONEROO_SECRET_KEY`, `MONEROO_WEBHOOK_SECRET`, `APP_URL`, `SMTP_*`.
En production : remplacer `DATABASE_URL` par PostgreSQL, brancher la vraie API Moneroo dans `src/lib/billing/moneroo.ts` (la signature HMAC et le pipeline webhook sont déjà conformes), configurer SMTP.

## Déploiement progressif (CDC §25.2)

1. Sauvegarde BDD → 2. staging + seed de test → 3. `scripts/smoke-tests.ts` → 4. validation manuelle → 5. production à trafic minimal → 6. monitoring 48 h → 7. ouverture totale.

---
© IBIG SARL 2026 — docpro.ibigsoft.com · docpro@ibigsoft.com · +27 22 27 60 14 | +05 55 05 99 01
