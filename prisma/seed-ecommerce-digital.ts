import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const COUNTRIES = JSON.stringify(['CI','SN','CM','BJ','TG','BF','ML','GN','CD','CG','GA','NE','TD','MR']);

const templates = [
  {
    code: 'ecom_cgv_boutique_en_ligne',
    name: 'CGV boutique en ligne',
    category: 'juridique_admin',
    description: 'Conditions générales de vente pour une boutique en ligne',
    price: 700, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_boutique', label: 'Nom de la boutique', type: 'text', required: true },
      { name: 'raison_sociale', label: 'Raison sociale / RCCM', type: 'text', required: true },
      { name: 'adresse_siege', label: 'Adresse du siège', type: 'text', required: true },
      { name: 'email_contact', label: 'Email de contact', type: 'text', required: true },
      { name: 'telephone', label: 'Téléphone', type: 'text', required: false },
      { name: 'pays_livraison', label: 'Pays de livraison couverts', type: 'text', required: true },
      { name: 'delai_livraison', label: 'Délai de livraison standard', type: 'text', required: true },
      { name: 'politique_retour', label: 'Politique de retour (jours)', type: 'text', required: true },
      { name: 'modes_paiement', label: 'Modes de paiement acceptés', type: 'text', required: true },
      { name: 'date_mise_a_jour', label: 'Date de mise à jour', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1a3c5e;border-bottom:3px solid #2d6a9f;padding-bottom:10px;text-align:center;">CONDITIONS GÉNÉRALES DE VENTE</h1>
<h2 style="color:#2d6a9f;text-align:center;">{{nom_boutique}}</h2>
<p style="color:#666;text-align:center;">Dernière mise à jour : {{date_mise_a_jour}}</p>
<h3 style="color:#1a3c5e;margin-top:20px;">Article 1 — Identification du vendeur</h3>
<p><strong>{{raison_sociale}}</strong>, dont le siège est situé à {{adresse_siege}}.<br/>Contact : {{email_contact}} | {{telephone}}</p>
<h3 style="color:#1a3c5e;">Article 2 — Commandes</h3>
<p>Toute commande passée sur {{nom_boutique}} vaut acceptation des présentes CGV. Le client reçoit une confirmation par email.</p>
<h3 style="color:#1a3c5e;">Article 3 — Paiement</h3>
<p>Modes de paiement acceptés : <strong>{{modes_paiement}}</strong>. Le paiement est exigible à la commande.</p>
<h3 style="color:#1a3c5e;">Article 4 — Livraison</h3>
<p>Zones de livraison : {{pays_livraison}}. Délai standard : <strong>{{delai_livraison}}</strong>.</p>
<h3 style="color:#1a3c5e;">Article 5 — Retours et remboursements</h3>
<p>Le client dispose de <strong>{{politique_retour}} jours</strong> pour retourner un article. Les articles doivent être non utilisés et dans leur emballage d'origine.</p>
<h3 style="color:#1a3c5e;">Article 6 — Droit applicable</h3>
<p>Les présentes CGV sont soumises au droit en vigueur dans le pays du vendeur. Tout litige sera soumis aux juridictions compétentes.</p>
<p style="color:#888;font-size:12px;margin-top:20px;border-top:1px solid #eee;padding-top:10px;">Document généré par DocPro — {{nom_boutique}} — {{date_mise_a_jour}}</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 75,
  },

  {
    code: 'ecom_politique_confidentialite_rgpd',
    name: 'Politique confidentialité RGPD',
    category: 'juridique_admin',
    description: 'Politique de confidentialité conforme RGPD pour site web ou appli',
    price: 800, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_site', label: 'Nom du site / application', type: 'text', required: true },
      { name: 'nom_responsable', label: 'Responsable de traitement', type: 'text', required: true },
      { name: 'email_dpo', label: 'Email DPO / contact données', type: 'text', required: true },
      { name: 'adresse_entreprise', label: 'Adresse de l\'entreprise', type: 'text', required: true },
      { name: 'donnees_collectees', label: 'Types de données collectées', type: 'textarea', required: true },
      { name: 'finalites', label: 'Finalités du traitement', type: 'textarea', required: true },
      { name: 'duree_conservation', label: 'Durée de conservation des données', type: 'text', required: true },
      { name: 'date_mise_a_jour', label: 'Date de mise à jour', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1a3c5e;border-bottom:3px solid #2d6a9f;padding-bottom:10px;">POLITIQUE DE CONFIDENTIALITÉ</h1>
<h2 style="color:#2d6a9f;">{{nom_site}}</h2>
<p style="color:#666;">Dernière mise à jour : <strong>{{date_mise_a_jour}}</strong></p>
<h3 style="color:#1a3c5e;">1. Responsable du traitement</h3>
<p><strong>{{nom_responsable}}</strong>, {{adresse_entreprise}}<br/>Contact DPO : {{email_dpo}}</p>
<h3 style="color:#1a3c5e;">2. Données collectées</h3>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;">{{donnees_collectees}}</div>
<h3 style="color:#1a3c5e;">3. Finalités du traitement</h3>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;">{{finalites}}</div>
<h3 style="color:#1a3c5e;">4. Durée de conservation</h3>
<p>Les données sont conservées pendant <strong>{{duree_conservation}}</strong>, sauf obligation légale contraire.</p>
<h3 style="color:#1a3c5e;">5. Droits des utilisateurs</h3>
<p>Conformément au RGPD, vous disposez du droit d'accès, de rectification, d'effacement, de portabilité et d'opposition. Exercez ces droits en contactant : <strong>{{email_dpo}}</strong>.</p>
<h3 style="color:#1a3c5e;">6. Cookies</h3>
<p>{{nom_site}} utilise des cookies fonctionnels et analytiques. Vous pouvez gérer vos préférences via notre bandeau cookies.</p>
<p style="color:#888;font-size:12px;margin-top:20px;border-top:1px solid #eee;padding-top:10px;">Document conforme RGPD — {{nom_site}} — {{date_mise_a_jour}}</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 80,
  },

  {
    code: 'ecom_mentions_legales_site_web',
    name: 'Mentions légales site web',
    category: 'juridique_admin',
    description: 'Mentions légales obligatoires pour tout site web professionnel',
    price: 500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_site', label: 'Nom du site', type: 'text', required: true },
      { name: 'url_site', label: 'URL du site', type: 'text', required: true },
      { name: 'raison_sociale', label: 'Raison sociale', type: 'text', required: true },
      { name: 'forme_juridique', label: 'Forme juridique', type: 'text', required: true },
      { name: 'capital', label: 'Capital social (FCFA)', type: 'text', required: false },
      { name: 'adresse_siege', label: 'Adresse du siège', type: 'text', required: true },
      { name: 'email_contact', label: 'Email de contact', type: 'text', required: true },
      { name: 'hebergeur', label: 'Hébergeur du site', type: 'text', required: true },
      { name: 'directeur_publication', label: 'Directeur de publication', type: 'text', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1a3c5e;border-bottom:3px solid #2d6a9f;padding-bottom:10px;">MENTIONS LÉGALES</h1>
<p>Conformément aux dispositions légales en vigueur, voici les mentions légales du site <strong>{{nom_site}}</strong> ({{url_site}}).</p>
<h3 style="color:#1a3c5e;">Éditeur du site</h3>
<table style="width:100%;border-collapse:collapse;margin:10px 0;">
<tr><td style="padding:6px 8px;border-bottom:1px solid #eee;width:40%;font-weight:bold;">Raison sociale</td><td style="padding:6px 8px;border-bottom:1px solid #eee;">{{raison_sociale}}</td></tr>
<tr><td style="padding:6px 8px;border-bottom:1px solid #eee;font-weight:bold;">Forme juridique</td><td style="padding:6px 8px;border-bottom:1px solid #eee;">{{forme_juridique}}</td></tr>
<tr><td style="padding:6px 8px;border-bottom:1px solid #eee;font-weight:bold;">Capital social</td><td style="padding:6px 8px;border-bottom:1px solid #eee;">{{capital}} FCFA</td></tr>
<tr><td style="padding:6px 8px;border-bottom:1px solid #eee;font-weight:bold;">Siège social</td><td style="padding:6px 8px;border-bottom:1px solid #eee;">{{adresse_siege}}</td></tr>
<tr><td style="padding:6px 8px;border-bottom:1px solid #eee;font-weight:bold;">Email</td><td style="padding:6px 8px;border-bottom:1px solid #eee;">{{email_contact}}</td></tr>
<tr><td style="padding:6px 8px;border-bottom:1px solid #eee;font-weight:bold;">Directeur de publication</td><td style="padding:6px 8px;border-bottom:1px solid #eee;">{{directeur_publication}}</td></tr>
</table>
<h3 style="color:#1a3c5e;">Hébergement</h3>
<p>Ce site est hébergé par : <strong>{{hebergeur}}</strong>.</p>
<h3 style="color:#1a3c5e;">Propriété intellectuelle</h3>
<p>Tous les contenus du site {{nom_site}} sont protégés par le droit d'auteur. Toute reproduction est interdite sans autorisation préalable.</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 70,
  },

  {
    code: 'ecom_contrat_prestataire_web',
    name: 'Contrat prestataire web',
    category: 'juridique_admin',
    description: 'Contrat de prestation de services web entre client et prestataire',
    price: 900, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_client', label: 'Nom / Raison sociale du client', type: 'text', required: true },
      { name: 'nom_prestataire', label: 'Nom du prestataire', type: 'text', required: true },
      { name: 'objet_mission', label: 'Objet de la mission', type: 'textarea', required: true },
      { name: 'date_debut', label: 'Date de début', type: 'date', required: true },
      { name: 'date_fin', label: 'Date de fin prévue', type: 'date', required: true },
      { name: 'montant_ht', label: 'Montant HT (FCFA)', type: 'text', required: true },
      { name: 'modalites_paiement', label: 'Modalités de paiement', type: 'textarea', required: true },
      { name: 'livrables', label: 'Livrables attendus', type: 'textarea', required: true },
      { name: 'lieu_signature', label: 'Lieu de signature', type: 'text', required: false },
      { name: 'date_signature', label: 'Date de signature', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1a3c5e;border-bottom:3px solid #2d6a9f;padding-bottom:10px;text-align:center;">CONTRAT DE PRESTATION WEB</h1>
<p>Entre <strong>{{nom_client}}</strong> (le Client) et <strong>{{nom_prestataire}}</strong> (le Prestataire), il est convenu ce qui suit :</p>
<h3 style="color:#1a3c5e;">Article 1 — Objet</h3>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;">{{objet_mission}}</div>
<h3 style="color:#1a3c5e;">Article 2 — Durée</h3>
<p>La mission débutera le <strong>{{date_debut}}</strong> pour se terminer au plus tard le <strong>{{date_fin}}</strong>.</p>
<h3 style="color:#1a3c5e;">Article 3 — Livrables</h3>
<div style="background:#E8F5E9;padding:12px;border-radius:4px;">{{livrables}}</div>
<h3 style="color:#1a3c5e;">Article 4 — Rémunération</h3>
<p>Montant convenu : <strong>{{montant_ht}} FCFA HT</strong></p>
<div style="background:#FFF9C4;padding:10px;border-radius:4px;">{{modalites_paiement}}</div>
<h3 style="color:#1a3c5e;">Article 5 — Confidentialité</h3>
<p>Les parties s'engagent à garder confidentielles toutes les informations échangées dans le cadre de ce contrat.</p>
<p style="margin-top:20px;">Fait à {{lieu_signature}}, le {{date_signature}}, en deux exemplaires.</p>
<div style="display:flex;justify-content:space-between;margin-top:25px;"><div><strong>Le Client</strong><br/>{{nom_client}}<br/><br/>Signature : _______________</div><div><strong>Le Prestataire</strong><br/>{{nom_prestataire}}<br/><br/>Signature : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 72,
  },

  {
    code: 'ecom_devis_developpement_application',
    name: 'Devis développement application',
    category: 'commercial_financier',
    description: 'Devis professionnel pour le développement d\'une application mobile ou web',
    price: 600, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_prestataire', label: 'Nom du prestataire / agence', type: 'text', required: true },
      { name: 'nom_client', label: 'Nom du client', type: 'text', required: true },
      { name: 'email_client', label: 'Email client', type: 'text', required: true },
      { name: 'nom_projet', label: 'Nom du projet', type: 'text', required: true },
      { name: 'description_projet', label: 'Description du projet', type: 'textarea', required: true },
      { name: 'fonctionnalites', label: 'Fonctionnalités incluses', type: 'textarea', required: true },
      { name: 'technologie', label: 'Technologies utilisées', type: 'text', required: false },
      { name: 'montant_total', label: 'Montant total (FCFA)', type: 'text', required: true },
      { name: 'delai_realisation', label: 'Délai de réalisation', type: 'text', required: true },
      { name: 'validite_devis', label: 'Validité du devis (jours)', type: 'text', required: true },
      { name: 'date_devis', label: 'Date du devis', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:20px;">
<div><h1 style="color:#1a3c5e;margin:0;">DEVIS</h1><p style="color:#666;margin:4px 0;">Développement Application</p></div>
<div style="text-align:right;"><p style="margin:2px 0;"><strong>{{nom_prestataire}}</strong></p><p style="margin:2px 0;color:#666;">{{date_devis}}</p></div>
</div>
<table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
<tr><td style="padding:6px;border-bottom:1px solid #eee;font-weight:bold;">Client</td><td style="padding:6px;border-bottom:1px solid #eee;">{{nom_client}} — {{email_client}}</td></tr>
<tr><td style="padding:6px;border-bottom:1px solid #eee;font-weight:bold;">Projet</td><td style="padding:6px;border-bottom:1px solid #eee;">{{nom_projet}}</td></tr>
<tr><td style="padding:6px;border-bottom:1px solid #eee;font-weight:bold;">Technologies</td><td style="padding:6px;border-bottom:1px solid #eee;">{{technologie}}</td></tr>
</table>
<h3 style="color:#1a3c5e;">Description</h3>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;margin-bottom:12px;">{{description_projet}}</div>
<h3 style="color:#1a3c5e;">Fonctionnalités incluses</h3>
<div style="background:#E8F5E9;padding:12px;border-radius:4px;margin-bottom:12px;">{{fonctionnalites}}</div>
<table style="width:100%;border-collapse:collapse;">
<tr style="background:#1a3c5e;color:white;"><th style="padding:8px;text-align:left;">Délai</th><th style="padding:8px;text-align:right;">Montant total HT</th></tr>
<tr style="background:#FFF9C4;font-weight:bold;font-size:16px;"><td style="padding:10px;">{{delai_realisation}}</td><td style="padding:10px;text-align:right;">{{montant_total}} FCFA</td></tr>
</table>
<p style="color:#888;font-size:12px;margin-top:16px;">Devis valable {{validite_devis}} jours à compter du {{date_devis}}.</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 68,
  },

  {
    code: 'ecom_convention_influence_marketing',
    name: 'Convention influence marketing',
    category: 'juridique_admin',
    description: 'Convention entre une marque et un influenceur pour une campagne',
    price: 700, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_marque', label: 'Nom de la marque / entreprise', type: 'text', required: true },
      { name: 'nom_influenceur', label: 'Nom de l\'influenceur', type: 'text', required: true },
      { name: 'reseau_social', label: 'Réseau(x) social(aux)', type: 'text', required: true },
      { name: 'nb_abonnes', label: 'Nombre d\'abonnés', type: 'text', required: false },
      { name: 'objet_campagne', label: 'Objet de la campagne', type: 'textarea', required: true },
      { name: 'livrables', label: 'Livrables attendus (posts, stories…)', type: 'textarea', required: true },
      { name: 'remuneration', label: 'Rémunération (FCFA ou nature)', type: 'text', required: true },
      { name: 'date_debut', label: 'Début de la campagne', type: 'date', required: true },
      { name: 'date_fin', label: 'Fin de la campagne', type: 'date', required: true },
      { name: 'date_signature', label: 'Date de signature', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#7b1fa2;border-bottom:3px solid #9c27b0;padding-bottom:10px;text-align:center;">CONVENTION D'INFLUENCE MARKETING</h1>
<p>Entre <strong>{{nom_marque}}</strong> (la Marque) et <strong>{{nom_influenceur}}</strong> (l'Influenceur), actif sur {{reseau_social}} ({{nb_abonnes}} abonnés).</p>
<h3 style="color:#7b1fa2;">Article 1 — Objet de la campagne</h3>
<div style="background:#F3E5F5;padding:12px;border-radius:4px;">{{objet_campagne}}</div>
<h3 style="color:#7b1fa2;">Article 2 — Livrables</h3>
<div style="background:#F3E5F5;padding:12px;border-radius:4px;">{{livrables}}</div>
<h3 style="color:#7b1fa2;">Article 3 — Période</h3>
<p>Du <strong>{{date_debut}}</strong> au <strong>{{date_fin}}</strong>.</p>
<h3 style="color:#7b1fa2;">Article 4 — Rémunération</h3>
<p><strong>{{remuneration}}</strong></p>
<h3 style="color:#7b1fa2;">Article 5 — Obligations de l'influenceur</h3>
<p>L'influenceur s'engage à mentionner explicitement le partenariat commercial (#partenariat ou #sponsorisé) conformément aux règles en vigueur.</p>
<h3 style="color:#7b1fa2;">Article 6 — Droits sur les contenus</h3>
<p>Les contenus créés dans le cadre de cette convention appartiennent à l'influenceur. La marque bénéficie d'une licence d'utilisation pour la durée de la campagne.</p>
<p style="margin-top:20px;">Fait le {{date_signature}}.</p>
<div style="display:flex;justify-content:space-between;margin-top:20px;"><div><strong>La Marque</strong><br/>{{nom_marque}}<br/><br/>Signature : _______________</div><div><strong>L'Influenceur</strong><br/>{{nom_influenceur}}<br/><br/>Signature : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 65,
  },

  {
    code: 'ecom_contrat_createur_contenu_digital',
    name: 'Contrat créateur contenu digital',
    category: 'juridique_admin',
    description: 'Contrat entre une entreprise et un créateur de contenu digital',
    price: 800, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'nom_createur', label: 'Nom du créateur de contenu', type: 'text', required: true },
      { name: 'type_contenu', label: 'Type de contenu (vidéo, articles, photos…)', type: 'text', required: true },
      { name: 'volume_mensuel', label: 'Volume mensuel de contenu', type: 'text', required: true },
      { name: 'plateformes', label: 'Plateformes de diffusion', type: 'text', required: true },
      { name: 'remuneration_mensuelle', label: 'Rémunération mensuelle (FCFA)', type: 'text', required: true },
      { name: 'duree_contrat', label: 'Durée du contrat (mois)', type: 'text', required: true },
      { name: 'droits_cession', label: 'Droits de cession (exclusif/non-exclusif)', type: 'text', required: true },
      { name: 'date_debut', label: 'Date de début', type: 'date', required: true },
      { name: 'date_signature', label: 'Date de signature', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1a3c5e;border-bottom:3px solid #2d6a9f;padding-bottom:10px;text-align:center;">CONTRAT CRÉATEUR DE CONTENU DIGITAL</h1>
<p>Entre <strong>{{nom_entreprise}}</strong> (l'Entreprise) et <strong>{{nom_createur}}</strong> (le Créateur), il est convenu :</p>
<h3 style="color:#1a3c5e;">Article 1 — Mission</h3>
<p>Le Créateur s'engage à produire du contenu de type <strong>{{type_contenu}}</strong> à hauteur de <strong>{{volume_mensuel}}</strong> par mois, diffusé sur <strong>{{plateformes}}</strong>.</p>
<h3 style="color:#1a3c5e;">Article 2 — Durée</h3>
<p>Le contrat est conclu pour une durée de <strong>{{duree_contrat}} mois</strong> à compter du <strong>{{date_debut}}</strong>.</p>
<h3 style="color:#1a3c5e;">Article 3 — Rémunération</h3>
<p>L'Entreprise versera au Créateur la somme de <strong>{{remuneration_mensuelle}} FCFA</strong> par mois.</p>
<h3 style="color:#1a3c5e;">Article 4 — Droits sur les contenus</h3>
<p>Cession des droits : <strong>{{droits_cession}}</strong>. L'Entreprise peut utiliser les contenus produits pour ses communications commerciales.</p>
<h3 style="color:#1a3c5e;">Article 5 — Confidentialité et exclusivité</h3>
<p>Le Créateur s'engage à ne pas divulguer les informations confidentielles de l'Entreprise et à ne pas travailler pour des concurrents directs pendant la durée du contrat.</p>
<p style="margin-top:20px;">Fait le {{date_signature}}.</p>
<div style="display:flex;justify-content:space-between;margin-top:25px;"><div><strong>L'Entreprise</strong><br/>{{nom_entreprise}}<br/><br/>Signature : _______________</div><div><strong>Le Créateur</strong><br/>{{nom_createur}}<br/><br/>Signature : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 60,
  },

  {
    code: 'ecom_accord_partenariat_ecommerce',
    name: 'Accord partenariat e-commerce',
    category: 'juridique_admin',
    description: 'Accord de partenariat commercial entre deux acteurs e-commerce',
    price: 900, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_partenaire_a', label: 'Partenaire A (nom / raison sociale)', type: 'text', required: true },
      { name: 'nom_partenaire_b', label: 'Partenaire B (nom / raison sociale)', type: 'text', required: true },
      { name: 'objet_partenariat', label: 'Objet du partenariat', type: 'textarea', required: true },
      { name: 'apports_a', label: 'Apports du Partenaire A', type: 'textarea', required: true },
      { name: 'apports_b', label: 'Apports du Partenaire B', type: 'textarea', required: true },
      { name: 'partage_revenus', label: 'Répartition des revenus (%)', type: 'text', required: true },
      { name: 'duree', label: 'Durée du partenariat', type: 'text', required: true },
      { name: 'clause_exclusivite', label: 'Clause d\'exclusivité (oui/non)', type: 'text', required: false },
      { name: 'lieu_signature', label: 'Lieu de signature', type: 'text', required: false },
      { name: 'date_signature', label: 'Date de signature', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1a3c5e;border-bottom:3px solid #2d6a9f;padding-bottom:10px;text-align:center;">ACCORD DE PARTENARIAT E-COMMERCE</h1>
<p>Entre <strong>{{nom_partenaire_a}}</strong> (Partenaire A) et <strong>{{nom_partenaire_b}}</strong> (Partenaire B).</p>
<h3 style="color:#1a3c5e;">Article 1 — Objet</h3>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;">{{objet_partenariat}}</div>
<h3 style="color:#1a3c5e;">Article 2 — Apports des parties</h3>
<div style="display:flex;gap:12px;margin-bottom:12px;">
<div style="flex:1;background:#E8F5E9;padding:10px;border-radius:4px;"><strong>Partenaire A :</strong><br/>{{apports_a}}</div>
<div style="flex:1;background:#E3F2FD;padding:10px;border-radius:4px;"><strong>Partenaire B :</strong><br/>{{apports_b}}</div>
</div>
<h3 style="color:#1a3c5e;">Article 3 — Partage des revenus</h3>
<p><strong>{{partage_revenus}}</strong></p>
<h3 style="color:#1a3c5e;">Article 4 — Durée et exclusivité</h3>
<p>Durée : <strong>{{duree}}</strong> | Exclusivité : {{clause_exclusivite}}</p>
<h3 style="color:#1a3c5e;">Article 5 — Résiliation</h3>
<p>Chaque partie peut résilier le présent accord avec un préavis de 30 jours par lettre recommandée.</p>
<p style="margin-top:20px;">Fait à {{lieu_signature}}, le {{date_signature}}.</p>
<div style="display:flex;justify-content:space-between;margin-top:20px;"><div><strong>{{nom_partenaire_a}}</strong><br/><br/>Signature : _______________</div><div><strong>{{nom_partenaire_b}}</strong><br/><br/>Signature : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 58,
  },

  {
    code: 'ecom_politique_retour_remboursement',
    name: 'Politique retour remboursement',
    category: 'juridique_admin',
    description: 'Politique de retour et remboursement pour boutique en ligne',
    price: 400, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_boutique', label: 'Nom de la boutique', type: 'text', required: true },
      { name: 'email_sav', label: 'Email SAV / retours', type: 'text', required: true },
      { name: 'delai_retour', label: 'Délai de retour (jours)', type: 'text', required: true },
      { name: 'conditions_retour', label: 'Conditions de retour', type: 'textarea', required: true },
      { name: 'articles_exclus', label: 'Articles non retournables', type: 'textarea', required: false },
      { name: 'delai_remboursement', label: 'Délai de remboursement (jours)', type: 'text', required: true },
      { name: 'mode_remboursement', label: 'Mode de remboursement', type: 'text', required: true },
      { name: 'frais_retour', label: 'Frais de retour à la charge de', type: 'text', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1a3c5e;border-bottom:3px solid #2d6a9f;padding-bottom:10px;">POLITIQUE DE RETOUR ET REMBOURSEMENT</h1>
<h2 style="color:#2d6a9f;">{{nom_boutique}}</h2>
<div style="background:#E3F2FD;padding:14px;border-radius:6px;margin:16px 0;"><strong>Contact SAV :</strong> {{email_sav}}</div>
<h3 style="color:#1a3c5e;">Délai de retour</h3>
<p>Vous disposez de <strong>{{delai_retour}} jours</strong> à compter de la réception de votre commande pour initier un retour.</p>
<h3 style="color:#1a3c5e;">Conditions de retour</h3>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;">{{conditions_retour}}</div>
<h3 style="color:#1a3c5e;">Articles non éligibles au retour</h3>
<div style="background:#FFEBEE;padding:12px;border-radius:4px;">{{articles_exclus}}</div>
<h3 style="color:#1a3c5e;">Remboursement</h3>
<table style="width:100%;border-collapse:collapse;">
<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Délai</td><td style="padding:8px;border-bottom:1px solid #eee;">{{delai_remboursement}} jours après réception du retour</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Mode</td><td style="padding:8px;border-bottom:1px solid #eee;">{{mode_remboursement}}</td></tr>
<tr><td style="padding:8px;font-weight:bold;">Frais de retour</td><td style="padding:8px;">À la charge de : {{frais_retour}}</td></tr>
</table>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 62,
  },

  {
    code: 'ecom_contrat_saas_abonnement',
    name: 'Contrat SaaS abonnement',
    category: 'juridique_admin',
    description: 'Contrat d\'abonnement pour un service SaaS (logiciel en ligne)',
    price: 900, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_editeur', label: 'Nom de l\'éditeur SaaS', type: 'text', required: true },
      { name: 'nom_produit', label: 'Nom du produit / service', type: 'text', required: true },
      { name: 'nom_client', label: 'Nom du client / entreprise', type: 'text', required: true },
      { name: 'plan_souscrit', label: 'Plan souscrit (Starter, Pro, Enterprise…)', type: 'text', required: true },
      { name: 'montant_mensuel', label: 'Montant mensuel (FCFA)', type: 'text', required: true },
      { name: 'periodicite', label: 'Périodicité (mensuel / annuel)', type: 'text', required: true },
      { name: 'fonctionnalites_incluses', label: 'Fonctionnalités incluses', type: 'textarea', required: true },
      { name: 'sla_disponibilite', label: 'SLA disponibilité (%)', type: 'text', required: false },
      { name: 'duree_contrat', label: 'Durée d\'engagement (mois)', type: 'text', required: true },
      { name: 'date_debut', label: 'Date de début', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#0d47a1;border-bottom:3px solid #1565c0;padding-bottom:10px;text-align:center;">CONTRAT D'ABONNEMENT SAAS</h1>
<h2 style="color:#1565c0;text-align:center;">{{nom_produit}}</h2>
<p style="text-align:center;color:#666;">Éditeur : <strong>{{nom_editeur}}</strong> | Client : <strong>{{nom_client}}</strong></p>
<table style="width:100%;border-collapse:collapse;margin:16px 0;">
<tr style="background:#0d47a1;color:white;"><th colspan="2" style="padding:10px;">Détails de l'abonnement</th></tr>
<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Plan</td><td style="padding:8px;border-bottom:1px solid #eee;">{{plan_souscrit}}</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Tarif</td><td style="padding:8px;border-bottom:1px solid #eee;"><strong>{{montant_mensuel}} FCFA</strong> — {{periodicite}}</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Durée d'engagement</td><td style="padding:8px;border-bottom:1px solid #eee;">{{duree_contrat}} mois à partir du {{date_debut}}</td></tr>
<tr><td style="padding:8px;font-weight:bold;">SLA Disponibilité</td><td style="padding:8px;">{{sla_disponibilite}}%</td></tr>
</table>
<h3 style="color:#0d47a1;">Fonctionnalités incluses</h3>
<div style="background:#E3F2FD;padding:12px;border-radius:4px;">{{fonctionnalites_incluses}}</div>
<h3 style="color:#0d47a1;">Conditions de résiliation</h3>
<p>À l'issue de la période d'engagement, le contrat est renouvelable tacitement. Résiliation possible avec préavis de 30 jours avant échéance.</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 55,
  },

  {
    code: 'ecom_brief_campagne_digitale',
    name: 'Brief campagne digitale',
    category: 'communication',
    description: 'Brief créatif et stratégique pour une campagne de communication digitale',
    price: 400, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_marque', label: 'Marque / Entreprise', type: 'text', required: true },
      { name: 'nom_campagne', label: 'Nom de la campagne', type: 'text', required: true },
      { name: 'objectif_principal', label: 'Objectif principal', type: 'text', required: true },
      { name: 'cible', label: 'Cible / Audience', type: 'textarea', required: true },
      { name: 'message_cle', label: 'Message clé', type: 'textarea', required: true },
      { name: 'canaux', label: 'Canaux digitaux utilisés', type: 'text', required: true },
      { name: 'budget_campagne', label: 'Budget alloué (FCFA)', type: 'text', required: true },
      { name: 'date_debut', label: 'Date de lancement', type: 'date', required: true },
      { name: 'date_fin', label: 'Date de fin', type: 'date', required: true },
      { name: 'kpis', label: 'KPIs / Indicateurs de succès', type: 'textarea', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#e65100;border-bottom:3px solid #f57c00;padding-bottom:10px;">BRIEF CAMPAGNE DIGITALE</h1>
<h2 style="color:#f57c00;">{{nom_campagne}} — {{nom_marque}}</h2>
<table style="width:100%;border-collapse:collapse;margin:16px 0;">
<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;width:35%;">Objectif principal</td><td style="padding:8px;border-bottom:1px solid #eee;">{{objectif_principal}}</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Canaux</td><td style="padding:8px;border-bottom:1px solid #eee;">{{canaux}}</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Budget</td><td style="padding:8px;border-bottom:1px solid #eee;font-size:15px;"><strong>{{budget_campagne}} FCFA</strong></td></tr>
<tr><td style="padding:8px;font-weight:bold;">Période</td><td style="padding:8px;">{{date_debut}} → {{date_fin}}</td></tr>
</table>
<h3 style="color:#e65100;">Cible</h3>
<div style="background:#FFF3E0;padding:12px;border-radius:4px;margin-bottom:12px;">{{cible}}</div>
<h3 style="color:#e65100;">Message clé</h3>
<div style="background:#FFF3E0;padding:12px;border-radius:4px;margin-bottom:12px;">{{message_cle}}</div>
<h3 style="color:#e65100;">Indicateurs de succès (KPIs)</h3>
<div style="background:#FFF3E0;padding:12px;border-radius:4px;">{{kpis}}</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 65,
  },

  {
    code: 'ecom_rapport_analytics_mensuel',
    name: 'Rapport analytics mensuel',
    category: 'communication',
    description: 'Rapport mensuel de performance digitale (trafic, conversions, réseaux sociaux)',
    price: 500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'mois_rapport', label: 'Mois du rapport', type: 'text', required: true },
      { name: 'redacteur', label: 'Rédigé par', type: 'text', required: false },
      { name: 'sessions_total', label: 'Sessions totales', type: 'text', required: true },
      { name: 'taux_rebond', label: 'Taux de rebond (%)', type: 'text', required: false },
      { name: 'conversions', label: 'Conversions / ventes', type: 'text', required: true },
      { name: 'chiffre_affaires', label: 'CA généré (FCFA)', type: 'text', required: false },
      { name: 'top_pages', label: 'Top pages / contenus', type: 'textarea', required: false },
      { name: 'performance_reseaux', label: 'Performance réseaux sociaux', type: 'textarea', required: false },
      { name: 'recommandations', label: 'Recommandations', type: 'textarea', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1a3c5e;border-bottom:3px solid #2d6a9f;padding-bottom:10px;">RAPPORT ANALYTICS — {{mois_rapport}}</h1>
<p><strong>{{nom_entreprise}}</strong> | Rédigé par : {{redacteur}}</p>
<h3 style="color:#1a3c5e;margin-top:20px;">Performance du site web</h3>
<table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
<tr style="background:#1a3c5e;color:white;"><th style="padding:8px;text-align:left;">Métrique</th><th style="padding:8px;text-align:right;">Valeur</th></tr>
<tr><td style="padding:8px;border-bottom:1px solid #eee;">Sessions totales</td><td style="padding:8px;text-align:right;border-bottom:1px solid #eee;"><strong>{{sessions_total}}</strong></td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #eee;">Taux de rebond</td><td style="padding:8px;text-align:right;border-bottom:1px solid #eee;">{{taux_rebond}} %</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #eee;">Conversions</td><td style="padding:8px;text-align:right;border-bottom:1px solid #eee;"><strong>{{conversions}}</strong></td></tr>
<tr style="background:#FFF9C4;font-weight:bold;"><td style="padding:8px;">CA généré</td><td style="padding:8px;text-align:right;">{{chiffre_affaires}} FCFA</td></tr>
</table>
<h3 style="color:#1a3c5e;">Top contenus</h3>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;margin-bottom:12px;">{{top_pages}}</div>
<h3 style="color:#1a3c5e;">Réseaux sociaux</h3>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;margin-bottom:12px;">{{performance_reseaux}}</div>
<h3 style="color:#1a3c5e;">Recommandations</h3>
<div style="background:#E8F5E9;padding:12px;border-radius:4px;">{{recommandations}}</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 58,
  },

  {
    code: 'ecom_contrat_referencement_seo',
    name: 'Contrat référencement SEO',
    category: 'commercial_financier',
    description: 'Contrat de prestation SEO entre une agence et son client',
    price: 700, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_agence', label: 'Nom de l\'agence SEO', type: 'text', required: true },
      { name: 'nom_client', label: 'Nom du client', type: 'text', required: true },
      { name: 'url_site_client', label: 'URL du site client', type: 'text', required: true },
      { name: 'mots_cles_cibles', label: 'Mots-clés cibles', type: 'textarea', required: true },
      { name: 'prestations_incluses', label: 'Prestations incluses', type: 'textarea', required: true },
      { name: 'honoraires_mensuels', label: 'Honoraires mensuels (FCFA)', type: 'text', required: true },
      { name: 'duree_engagement', label: 'Durée d\'engagement (mois)', type: 'text', required: true },
      { name: 'reporting_frequence', label: 'Fréquence de reporting', type: 'text', required: true },
      { name: 'date_debut', label: 'Date de début', type: 'date', required: true },
      { name: 'date_signature', label: 'Date de signature', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1a3c5e;border-bottom:3px solid #2d6a9f;padding-bottom:10px;text-align:center;">CONTRAT DE RÉFÉRENCEMENT SEO</h1>
<p>Entre <strong>{{nom_agence}}</strong> (Prestataire) et <strong>{{nom_client}}</strong> (Client), pour le site <strong>{{url_site_client}}</strong>.</p>
<h3 style="color:#1a3c5e;">Article 1 — Prestations</h3>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;">{{prestations_incluses}}</div>
<h3 style="color:#1a3c5e;">Article 2 — Mots-clés cibles</h3>
<div style="background:#E3F2FD;padding:12px;border-radius:4px;">{{mots_cles_cibles}}</div>
<h3 style="color:#1a3c5e;">Article 3 — Tarification</h3>
<table style="width:100%;border-collapse:collapse;">
<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Honoraires mensuels</td><td style="padding:8px;border-bottom:1px solid #eee;"><strong>{{honoraires_mensuels}} FCFA</strong></td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Durée d'engagement</td><td style="padding:8px;border-bottom:1px solid #eee;">{{duree_engagement}} mois</td></tr>
<tr><td style="padding:8px;font-weight:bold;">Reporting</td><td style="padding:8px;">{{reporting_frequence}}</td></tr>
</table>
<h3 style="color:#1a3c5e;">Article 4 — Limite de responsabilité</h3>
<p>Le prestataire s'engage à mettre en œuvre les meilleures pratiques SEO mais ne peut garantir de positions spécifiques sur les moteurs de recherche.</p>
<p style="margin-top:20px;">Fait le {{date_signature}}, début de mission : {{date_debut}}.</p>
<div style="display:flex;justify-content:space-between;margin-top:20px;"><div><strong>{{nom_agence}}</strong><br/><br/>Signature : _______________</div><div><strong>{{nom_client}}</strong><br/><br/>Signature : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 55,
  },

  {
    code: 'ecom_convention_affiliation_digitale',
    name: 'Convention affiliation digitale',
    category: 'commercial_financier',
    description: 'Convention d\'affiliation entre un annonceur et un affilié digital',
    price: 600, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_annonceur', label: 'Nom de l\'annonceur', type: 'text', required: true },
      { name: 'nom_affilie', label: 'Nom de l\'affilié', type: 'text', required: true },
      { name: 'site_affilie', label: 'Site / canal de l\'affilié', type: 'text', required: true },
      { name: 'produits_a_promouvoir', label: 'Produits / services à promouvoir', type: 'textarea', required: true },
      { name: 'taux_commission', label: 'Taux de commission (%)', type: 'text', required: true },
      { name: 'seuil_paiement', label: 'Seuil minimum de paiement (FCFA)', type: 'text', required: true },
      { name: 'periodicite_paiement', label: 'Périodicité de paiement', type: 'text', required: true },
      { name: 'cookie_duree', label: 'Durée de cookie (jours)', type: 'text', required: false },
      { name: 'date_debut', label: 'Date d\'effet', type: 'date', required: true },
      { name: 'date_signature', label: 'Date de signature', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1a3c5e;border-bottom:3px solid #2d6a9f;padding-bottom:10px;text-align:center;">CONVENTION D'AFFILIATION DIGITALE</h1>
<p>Entre <strong>{{nom_annonceur}}</strong> (l'Annonceur) et <strong>{{nom_affilie}}</strong> (l'Affilié), exploitant {{site_affilie}}.</p>
<h3 style="color:#1a3c5e;">Article 1 — Objet</h3>
<p>L'Affilié s'engage à promouvoir les produits/services de l'Annonceur via ses canaux digitaux.</p>
<h3 style="color:#1a3c5e;">Article 2 — Produits promus</h3>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;">{{produits_a_promouvoir}}</div>
<h3 style="color:#1a3c5e;">Article 3 — Rémunération</h3>
<table style="width:100%;border-collapse:collapse;margin:10px 0;">
<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Commission</td><td style="padding:8px;border-bottom:1px solid #eee;"><strong>{{taux_commission}} %</strong> par vente/lead qualifié</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Seuil de paiement</td><td style="padding:8px;border-bottom:1px solid #eee;">{{seuil_paiement}} FCFA</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Versement</td><td style="padding:8px;border-bottom:1px solid #eee;">{{periodicite_paiement}}</td></tr>
<tr><td style="padding:8px;font-weight:bold;">Durée cookie</td><td style="padding:8px;">{{cookie_duree}} jours</td></tr>
</table>
<h3 style="color:#1a3c5e;">Article 4 — Obligations de l'affilié</h3>
<p>L'affilié s'engage à respecter les directives de la marque et à mentionner le lien d'affiliation de manière transparente.</p>
<p style="margin-top:20px;">Entrée en vigueur le {{date_debut}} | Signé le {{date_signature}}.</p>
<div style="display:flex;justify-content:space-between;margin-top:20px;"><div><strong>{{nom_annonceur}}</strong><br/><br/>Signature : _______________</div><div><strong>{{nom_affilie}}</strong><br/><br/>Signature : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 52,
  },

  {
    code: 'ecom_plan_marketing_digital_pme',
    name: 'Plan marketing digital PME',
    category: 'communication',
    description: 'Plan marketing digital structuré pour PME africaine',
    price: 600, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'secteur', label: 'Secteur d\'activité', type: 'text', required: true },
      { name: 'annee_plan', label: 'Année du plan', type: 'text', required: true },
      { name: 'objectifs_marketing', label: 'Objectifs marketing', type: 'textarea', required: true },
      { name: 'cible_principale', label: 'Cible principale', type: 'textarea', required: true },
      { name: 'canaux_digitaux', label: 'Canaux digitaux retenus', type: 'textarea', required: true },
      { name: 'budget_annuel', label: 'Budget marketing annuel (FCFA)', type: 'text', required: true },
      { name: 'actions_prioritaires', label: 'Actions prioritaires', type: 'textarea', required: true },
      { name: 'kpis', label: 'KPIs de suivi', type: 'textarea', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1a3c5e;border-bottom:3px solid #2d6a9f;padding-bottom:10px;">PLAN MARKETING DIGITAL {{annee_plan}}</h1>
<h2 style="color:#2d6a9f;">{{nom_entreprise}} — {{secteur}}</h2>
<h3 style="color:#1a3c5e;">1. Objectifs marketing</h3>
<div style="background:#E3F2FD;padding:12px;border-radius:4px;margin-bottom:12px;">{{objectifs_marketing}}</div>
<h3 style="color:#1a3c5e;">2. Cible principale</h3>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;margin-bottom:12px;">{{cible_principale}}</div>
<h3 style="color:#1a3c5e;">3. Canaux digitaux</h3>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;margin-bottom:12px;">{{canaux_digitaux}}</div>
<h3 style="color:#1a3c5e;">4. Budget</h3>
<p style="font-size:16px;font-weight:bold;color:#2d6a9f;">{{budget_annuel}} FCFA</p>
<h3 style="color:#1a3c5e;">5. Actions prioritaires</h3>
<div style="background:#E8F5E9;padding:12px;border-radius:4px;margin-bottom:12px;">{{actions_prioritaires}}</div>
<h3 style="color:#1a3c5e;">6. KPIs</h3>
<div style="background:#FFF9C4;padding:12px;border-radius:4px;">{{kpis}}</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 60,
  },

  {
    code: 'ecom_contrat_maintenance_site_web',
    name: 'Contrat maintenance site web',
    category: 'commercial_financier',
    description: 'Contrat de maintenance et support technique pour site web',
    price: 600, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_prestataire', label: 'Nom du prestataire maintenance', type: 'text', required: true },
      { name: 'nom_client', label: 'Nom du client', type: 'text', required: true },
      { name: 'url_site', label: 'URL du site à maintenir', type: 'text', required: true },
      { name: 'prestations_maintenance', label: 'Prestations de maintenance incluses', type: 'textarea', required: true },
      { name: 'delai_intervention', label: 'Délai d\'intervention garanti', type: 'text', required: true },
      { name: 'honoraires_mensuels', label: 'Honoraires mensuels (FCFA)', type: 'text', required: true },
      { name: 'heures_incluses', label: 'Heures incluses par mois', type: 'text', required: false },
      { name: 'taux_horaire_supplementaire', label: 'Taux horaire supplémentaire (FCFA/h)', type: 'text', required: false },
      { name: 'duree_contrat', label: 'Durée du contrat (mois)', type: 'text', required: true },
      { name: 'date_signature', label: 'Date de signature', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1a3c5e;border-bottom:3px solid #2d6a9f;padding-bottom:10px;text-align:center;">CONTRAT DE MAINTENANCE SITE WEB</h1>
<p>Entre <strong>{{nom_prestataire}}</strong> (le Mainteneur) et <strong>{{nom_client}}</strong> (le Client) pour le site <strong>{{url_site}}</strong>.</p>
<h3 style="color:#1a3c5e;">Article 1 — Périmètre de maintenance</h3>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;">{{prestations_maintenance}}</div>
<h3 style="color:#1a3c5e;">Article 2 — Niveaux de service</h3>
<table style="width:100%;border-collapse:collapse;margin:10px 0;">
<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Délai d'intervention</td><td style="padding:8px;border-bottom:1px solid #eee;">{{delai_intervention}}</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Heures incluses/mois</td><td style="padding:8px;border-bottom:1px solid #eee;">{{heures_incluses}} h</td></tr>
<tr><td style="padding:8px;font-weight:bold;">Taux heure suppl.</td><td style="padding:8px;">{{taux_horaire_supplementaire}} FCFA/h</td></tr>
</table>
<h3 style="color:#1a3c5e;">Article 3 — Tarification</h3>
<p style="font-size:16px;font-weight:bold;color:#2d6a9f;">{{honoraires_mensuels}} FCFA / mois — Engagement : {{duree_contrat}} mois</p>
<h3 style="color:#1a3c5e;">Article 4 — Responsabilités</h3>
<p>Le mainteneur est responsable de la disponibilité du service dans le périmètre défini. Les pannes causées par des tiers (hébergeur, force majeure) sont exclues.</p>
<p style="margin-top:20px;">Signé le {{date_signature}}.</p>
<div style="display:flex;justify-content:space-between;margin-top:20px;"><div><strong>{{nom_prestataire}}</strong><br/><br/>Signature : _______________</div><div><strong>{{nom_client}}</strong><br/><br/>Signature : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 54,
  },

  {
    code: 'ecom_politique_cookies_conforme',
    name: 'Politique cookies conforme',
    category: 'juridique_admin',
    description: 'Politique de gestion des cookies conforme aux réglementations en vigueur',
    price: 400, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_site', label: 'Nom du site', type: 'text', required: true },
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'email_contact', label: 'Email de contact', type: 'text', required: true },
      { name: 'cookies_essentiels', label: 'Cookies essentiels utilisés', type: 'textarea', required: true },
      { name: 'cookies_analytiques', label: 'Cookies analytiques (ex: Google Analytics)', type: 'textarea', required: false },
      { name: 'cookies_marketing', label: 'Cookies marketing / publicitaires', type: 'textarea', required: false },
      { name: 'duree_conservation', label: 'Durée de conservation des cookies', type: 'text', required: true },
      { name: 'date_mise_a_jour', label: 'Date de mise à jour', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1a3c5e;border-bottom:3px solid #2d6a9f;padding-bottom:10px;">POLITIQUE DE GESTION DES COOKIES</h1>
<h2 style="color:#2d6a9f;">{{nom_site}}</h2>
<p style="color:#666;">Éditeur : <strong>{{nom_entreprise}}</strong> | Mise à jour : {{date_mise_a_jour}}</p>
<h3 style="color:#1a3c5e;">Qu'est-ce qu'un cookie ?</h3>
<p>Un cookie est un petit fichier texte déposé sur votre appareil lors de la visite d'un site web. Il permet de mémoriser vos préférences et d'améliorer votre expérience.</p>
<h3 style="color:#1a3c5e;">Cookies essentiels</h3>
<div style="background:#E8F5E9;padding:12px;border-radius:4px;margin-bottom:10px;">{{cookies_essentiels}}</div>
<h3 style="color:#1a3c5e;">Cookies analytiques</h3>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;margin-bottom:10px;">{{cookies_analytiques}}</div>
<h3 style="color:#1a3c5e;">Cookies marketing</h3>
<div style="background:#FFF3E0;padding:12px;border-radius:4px;margin-bottom:10px;">{{cookies_marketing}}</div>
<h3 style="color:#1a3c5e;">Durée de conservation</h3>
<p>Les cookies sont conservés pendant <strong>{{duree_conservation}}</strong> maximum.</p>
<h3 style="color:#1a3c5e;">Gestion de vos préférences</h3>
<p>Vous pouvez à tout moment modifier vos préférences cookies via les paramètres de votre navigateur ou notre bandeau de gestion. Contact : {{email_contact}}</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 50,
  },

  {
    code: 'ecom_accord_nda_digital',
    name: 'Accord NDA digital',
    category: 'juridique_admin',
    description: 'Accord de non-divulgation (NDA) pour projets digitaux et startups',
    price: 500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_partie_a', label: 'Partie A (divulgatrice)', type: 'text', required: true },
      { name: 'nom_partie_b', label: 'Partie B (réceptrice)', type: 'text', required: true },
      { name: 'objet_projet', label: 'Objet du projet / informations concernées', type: 'textarea', required: true },
      { name: 'informations_confidentielles', label: 'Définition des informations confidentielles', type: 'textarea', required: true },
      { name: 'duree_confidentialite', label: 'Durée de confidentialité (ans)', type: 'text', required: true },
      { name: 'exceptions', label: 'Exceptions à la confidentialité', type: 'textarea', required: false },
      { name: 'juridiction', label: 'Droit applicable / Juridiction', type: 'text', required: false },
      { name: 'lieu_signature', label: 'Lieu de signature', type: 'text', required: false },
      { name: 'date_signature', label: 'Date de signature', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1a3c5e;border-bottom:3px solid #2d6a9f;padding-bottom:10px;text-align:center;">ACCORD DE NON-DIVULGATION (NDA)</h1>
<p>Entre <strong>{{nom_partie_a}}</strong> (la Partie Divulgatrice) et <strong>{{nom_partie_b}}</strong> (la Partie Réceptrice).</p>
<h3 style="color:#1a3c5e;">Article 1 — Contexte</h3>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;">{{objet_projet}}</div>
<h3 style="color:#1a3c5e;">Article 2 — Informations confidentielles</h3>
<div style="background:#FFF3E0;padding:12px;border-radius:4px;">{{informations_confidentielles}}</div>
<h3 style="color:#1a3c5e;">Article 3 — Obligations</h3>
<p>La Partie Réceptrice s'engage à : (i) ne pas divulguer les informations confidentielles à des tiers ; (ii) ne les utiliser qu'aux fins du projet défini ; (iii) prendre toutes mesures de protection appropriées.</p>
<h3 style="color:#1a3c5e;">Article 4 — Exceptions</h3>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;">{{exceptions}}</div>
<h3 style="color:#1a3c5e;">Article 5 — Durée et droit applicable</h3>
<p>Durée de confidentialité : <strong>{{duree_confidentialite}} ans</strong> | Droit applicable : {{juridiction}}</p>
<p style="margin-top:20px;">Fait à {{lieu_signature}}, le {{date_signature}}.</p>
<div style="display:flex;justify-content:space-between;margin-top:20px;"><div><strong>{{nom_partie_a}}</strong><br/><br/>Signature : _______________</div><div><strong>{{nom_partie_b}}</strong><br/><br/>Signature : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 63,
  },

  {
    code: 'ecom_contrat_photographie_commerciale',
    name: 'Contrat photographie commerciale',
    category: 'commercial_financier',
    description: 'Contrat entre un photographe et un client pour des photos commerciales / e-commerce',
    price: 500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_photographe', label: 'Nom du photographe', type: 'text', required: true },
      { name: 'nom_client', label: 'Nom du client / marque', type: 'text', required: true },
      { name: 'type_shooting', label: 'Type de shooting (produit, lifestyle…)', type: 'text', required: true },
      { name: 'nombre_photos', label: 'Nombre de photos livrées', type: 'text', required: true },
      { name: 'duree_shooting', label: 'Durée du shooting', type: 'text', required: true },
      { name: 'honoraires', label: 'Honoraires (FCFA)', type: 'text', required: true },
      { name: 'droits_utilisation', label: 'Droits d\'utilisation accordés', type: 'textarea', required: true },
      { name: 'delai_livraison', label: 'Délai de livraison des photos', type: 'text', required: true },
      { name: 'date_shooting', label: 'Date du shooting', type: 'date', required: true },
      { name: 'date_signature', label: 'Date de signature', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#4a148c;border-bottom:3px solid #6a1b9a;padding-bottom:10px;text-align:center;">CONTRAT DE PHOTOGRAPHIE COMMERCIALE</h1>
<p>Entre <strong>{{nom_photographe}}</strong> (le Photographe) et <strong>{{nom_client}}</strong> (le Client).</p>
<h3 style="color:#4a148c;">Article 1 — Objet</h3>
<p>Réalisation d'un shooting <strong>{{type_shooting}}</strong> le <strong>{{date_shooting}}</strong>, d'une durée de {{duree_shooting}}.</p>
<h3 style="color:#4a148c;">Article 2 — Livrables</h3>
<table style="width:100%;border-collapse:collapse;margin:10px 0;">
<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Nombre de photos</td><td style="padding:8px;border-bottom:1px solid #eee;">{{nombre_photos}} photos retouchées</td></tr>
<tr><td style="padding:8px;font-weight:bold;">Délai de livraison</td><td style="padding:8px;">{{delai_livraison}}</td></tr>
</table>
<h3 style="color:#4a148c;">Article 3 — Droits d'utilisation</h3>
<div style="background:#F3E5F5;padding:12px;border-radius:4px;">{{droits_utilisation}}</div>
<h3 style="color:#4a148c;">Article 4 — Rémunération</h3>
<p style="font-size:16px;font-weight:bold;color:#4a148c;">{{honoraires}} FCFA</p>
<p>Acompte de 50% à la commande, solde à la livraison des fichiers.</p>
<h3 style="color:#4a148c;">Article 5 — Mention du photographe</h3>
<p>Le client s'engage à créditer <strong>{{nom_photographe}}</strong> lors de toute utilisation publique des photos.</p>
<p style="margin-top:20px;">Signé le {{date_signature}}.</p>
<div style="display:flex;justify-content:space-between;margin-top:20px;"><div><strong>{{nom_photographe}}</strong><br/><br/>Signature : _______________</div><div><strong>{{nom_client}}</strong><br/><br/>Signature : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 48,
  },

  {
    code: 'ecom_charte_reseaux_sociaux_entreprise',
    name: 'Charte réseaux sociaux entreprise',
    category: 'communication',
    description: 'Charte d\'utilisation des réseaux sociaux pour les collaborateurs',
    price: 300, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'date_entree_vigueur', label: 'Date d\'entrée en vigueur', type: 'date', required: true },
      { name: 'reseaux_concernes', label: 'Réseaux sociaux concernés', type: 'text', required: true },
      { name: 'responsable_communication', label: 'Responsable communication', type: 'text', required: false },
      { name: 'bonnes_pratiques', label: 'Bonnes pratiques attendues', type: 'textarea', required: true },
      { name: 'comportements_interdits', label: 'Comportements interdits', type: 'textarea', required: true },
      { name: 'tone_of_voice', label: 'Ton et style de communication', type: 'textarea', required: false },
      { name: 'procedure_validation', label: 'Procédure de validation des contenus', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1a3c5e;border-bottom:3px solid #2d6a9f;padding-bottom:10px;">CHARTE RÉSEAUX SOCIAUX</h1>
<h2 style="color:#2d6a9f;">{{nom_entreprise}}</h2>
<p>En vigueur depuis le <strong>{{date_entree_vigueur}}</strong> | Réseaux concernés : <strong>{{reseaux_concernes}}</strong></p>
<p>Responsable communication : {{responsable_communication}}</p>
<h3 style="color:#1a3c5e;">1. Objet de la charte</h3>
<p>Cette charte définit les règles d'utilisation des réseaux sociaux par les collaborateurs de <strong>{{nom_entreprise}}</strong>, qu'il s'agisse de comptes officiels ou personnels en lien avec l'entreprise.</p>
<h3 style="color:#1a3c5e;">2. Bonnes pratiques</h3>
<div style="background:#E8F5E9;padding:12px;border-radius:4px;margin-bottom:12px;">{{bonnes_pratiques}}</div>
<h3 style="color:#1a3c5e;">3. Comportements interdits</h3>
<div style="background:#FFEBEE;padding:12px;border-radius:4px;margin-bottom:12px;">{{comportements_interdits}}</div>
<h3 style="color:#1a3c5e;">4. Ton et style</h3>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;margin-bottom:12px;">{{tone_of_voice}}</div>
<h3 style="color:#1a3c5e;">5. Procédure de validation</h3>
<div style="background:#FFF9C4;padding:12px;border-radius:4px;">{{procedure_validation}}</div>
<p style="color:#888;font-size:12px;margin-top:20px;border-top:1px solid #eee;padding-top:10px;">{{nom_entreprise}} — Charte Réseaux Sociaux — En vigueur au {{date_entree_vigueur}}</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 55,
  },
];

async function main() {
  let created = 0, updated = 0;
  for (const t of templates) {
    const existing = await prisma.documentTemplate.findUnique({ where: { code: t.code } });
    if (existing) {
      await prisma.documentTemplate.update({ where: { code: t.code }, data: {} });
      updated++;
    } else {
      await prisma.documentTemplate.create({ data: t });
      created++;
    }
  }
  const total = await prisma.documentTemplate.count();
  console.log(`✅ Seed E-commerce Digital terminé. Créés: ${created}, Mis à jour: ${updated} — Total BDD: ${total}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
