import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const COUNTRIES = JSON.stringify(['CI','SN','CM','BJ','TG','BF','ML','GN','CD','CG','GA','NE','TD','MR']);

const templates = [
  // ─── immo2_ : Real Estate Advanced ───────────────────────────────────────
  {
    code: 'immo2_promesse_vente_immeuble',
    name: 'Promesse de vente immeuble',
    category: 'juridique_admin',
    description: 'Avant-contrat de vente portant sur un immeuble bâti',
    price: 1200, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_vendeur', label: 'Nom complet du vendeur', type: 'text', required: true },
      { name: 'nom_acheteur', label: 'Nom complet de l\'acheteur', type: 'text', required: true },
      { name: 'adresse_immeuble', label: 'Adresse / description de l\'immeuble', type: 'textarea', required: true },
      { name: 'superficie', label: 'Superficie totale (m²)', type: 'text', required: true },
      { name: 'prix_vente', label: 'Prix de vente convenu (FCFA)', type: 'text', required: true },
      { name: 'acompte', label: 'Acompte versé (FCFA)', type: 'text', required: false },
      { name: 'date_signature_definitive', label: 'Date limite de signature définitive', type: 'date', required: true },
      { name: 'conditions_suspensives', label: 'Conditions suspensives', type: 'textarea', required: false },
      { name: 'lieu_signature', label: 'Lieu de signature', type: 'text', required: false },
      { name: 'date_promesse', label: 'Date de la promesse', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;border:1px solid #c0c0c0;">
<h1 style="color:#1a3c5e;text-align:center;border-bottom:3px solid #2d6a9f;padding-bottom:10px;">PROMESSE DE VENTE D'IMMEUBLE</h1>
<p style="text-align:center;color:#555;">Établie le <strong>{{date_promesse}}</strong> à <strong>{{lieu_signature}}</strong></p>
<h2 style="color:#2d6a9f;margin-top:18px;">Parties</h2>
<p><strong>Vendeur :</strong> {{nom_vendeur}}</p>
<p><strong>Acheteur :</strong> {{nom_acheteur}}</p>
<h2 style="color:#2d6a9f;">Bien immobilier</h2>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;margin-bottom:12px;">{{adresse_immeuble}} — Superficie : <strong>{{superficie}} m²</strong></div>
<table style="width:100%;border-collapse:collapse;margin:14px 0;">
<tr style="background:#1a3c5e;color:white;"><th style="padding:8px;text-align:left;">Élément financier</th><th style="padding:8px;text-align:right;">Montant (FCFA)</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Prix de vente convenu</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;font-weight:bold;">{{prix_vente}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Acompte versé</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{acompte}}</td></tr>
</table>
<p><strong>Date limite de signature définitive :</strong> {{date_signature_definitive}}</p>
<div style="background:#FFF9C4;padding:10px;border-radius:4px;margin:10px 0;"><strong>Conditions suspensives :</strong> {{conditions_suspensives}}</div>
<div style="display:flex;justify-content:space-between;margin-top:30px;"><div><strong>Le Vendeur</strong><br/>{{nom_vendeur}}<br/><br/>Signature : _______________</div><div><strong>L'Acheteur</strong><br/>{{nom_acheteur}}<br/><br/>Signature : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 70,
  },

  {
    code: 'immo2_contrat_gerance_immobiliere',
    name: 'Contrat de gérance immobilière',
    category: 'juridique_admin',
    description: 'Confier la gestion d\'un bien immobilier à un gérant mandataire',
    price: 900, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_proprietaire', label: 'Nom du propriétaire', type: 'text', required: true },
      { name: 'nom_gerant', label: 'Nom du gérant / société', type: 'text', required: true },
      { name: 'description_bien', label: 'Description du bien géré', type: 'textarea', required: true },
      { name: 'date_debut', label: 'Date de début du mandat', type: 'date', required: true },
      { name: 'duree_mandat', label: 'Durée du mandat (mois)', type: 'text', required: true },
      { name: 'taux_honoraires', label: 'Taux d\'honoraires (%)', type: 'text', required: true },
      { name: 'loyer_attendu', label: 'Loyer mensuel attendu (FCFA)', type: 'text', required: false },
      { name: 'pouvoirs_gerant', label: 'Pouvoirs conférés au gérant', type: 'textarea', required: false },
      { name: 'lieu_signature', label: 'Lieu de signature', type: 'text', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1a3c5e;border-bottom:3px solid #2d6a9f;padding-bottom:10px;text-align:center;">CONTRAT DE GÉRANCE IMMOBILIÈRE</h1>
<p style="text-align:center;color:#666;">Signé à {{lieu_signature}} — Prise d'effet : <strong>{{date_debut}}</strong></p>
<h2 style="color:#2d6a9f;">Parties contractantes</h2>
<p><strong>Propriétaire (mandant) :</strong> {{nom_proprietaire}}</p>
<p><strong>Gérant (mandataire) :</strong> {{nom_gerant}}</p>
<h2 style="color:#2d6a9f;">Bien confié en gérance</h2>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;">{{description_bien}}</div>
<table style="width:100%;border-collapse:collapse;margin:14px 0;">
<tr style="background:#1a3c5e;color:white;"><th style="padding:8px;text-align:left;">Conditions</th><th style="padding:8px;text-align:left;">Détail</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Durée du mandat</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{duree_mandat}} mois</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Taux d'honoraires</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{taux_honoraires}} % du loyer encaissé</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Loyer mensuel attendu</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{loyer_attendu}} FCFA</td></tr>
</table>
<div style="background:#E8F5E9;padding:10px;border-radius:4px;margin-bottom:14px;"><strong>Pouvoirs conférés :</strong> {{pouvoirs_gerant}}</div>
<div style="display:flex;justify-content:space-between;margin-top:30px;"><div><strong>Le Propriétaire</strong><br/><br/>Signature : _______________</div><div><strong>Le Gérant</strong><br/><br/>Signature : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 65,
  },

  {
    code: 'immo2_bail_commercial_detaille',
    name: 'Bail commercial détaillé',
    category: 'juridique_admin',
    description: 'Contrat de bail commercial complet avec clauses détaillées',
    price: 1000, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_bailleur', label: 'Nom du bailleur', type: 'text', required: true },
      { name: 'nom_preneur', label: 'Nom du preneur / locataire', type: 'text', required: true },
      { name: 'adresse_local', label: 'Adresse du local commercial', type: 'textarea', required: true },
      { name: 'superficie_local', label: 'Superficie du local (m²)', type: 'text', required: true },
      { name: 'loyer_mensuel', label: 'Loyer mensuel HT (FCFA)', type: 'text', required: true },
      { name: 'depot_garantie', label: 'Dépôt de garantie (FCFA)', type: 'text', required: false },
      { name: 'date_entree', label: 'Date d\'entrée dans les lieux', type: 'date', required: true },
      { name: 'duree_bail', label: 'Durée du bail (années)', type: 'text', required: true },
      { name: 'activite_autorisee', label: 'Activité commerciale autorisée', type: 'text', required: true },
      { name: 'charges_locatives', label: 'Charges locatives à la charge du preneur', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1a3c5e;border-bottom:3px solid #2d6a9f;padding-bottom:10px;text-align:center;">BAIL COMMERCIAL</h1>
<p><strong>Bailleur :</strong> {{nom_bailleur}} &nbsp;|&nbsp; <strong>Preneur :</strong> {{nom_preneur}}</p>
<h2 style="color:#2d6a9f;">Local loué</h2>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;margin-bottom:12px;">{{adresse_local}} — <strong>{{superficie_local}} m²</strong></div>
<p><strong>Activité autorisée :</strong> {{activite_autorisee}}</p>
<table style="width:100%;border-collapse:collapse;margin:14px 0;">
<tr style="background:#1a3c5e;color:white;"><th style="padding:8px;text-align:left;">Condition</th><th style="padding:8px;text-align:right;">Valeur</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Loyer mensuel HT</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;font-weight:bold;">{{loyer_mensuel}} FCFA</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Dépôt de garantie</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{depot_garantie}} FCFA</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Date d'entrée</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{date_entree}}</td></tr>
<tr style="background:#FFF9C4;font-weight:bold;"><td style="padding:8px;">Durée du bail</td><td style="padding:8px;text-align:right;">{{duree_bail}} ans</td></tr>
</table>
<div style="background:#E8F5E9;padding:10px;border-radius:4px;margin-bottom:14px;"><strong>Charges à la charge du preneur :</strong> {{charges_locatives}}</div>
<div style="display:flex;justify-content:space-between;margin-top:30px;"><div><strong>Le Bailleur</strong><br/><br/>Signature : _______________</div><div><strong>Le Preneur</strong><br/><br/>Signature : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 72,
  },

  {
    code: 'immo2_convention_syndic_copropriete',
    name: 'Convention syndic de copropriété',
    category: 'juridique_admin',
    description: 'Mandat de syndic pour la gestion d\'un immeuble en copropriété',
    price: 1100, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_syndic', label: 'Nom / Raison sociale du syndic', type: 'text', required: true },
      { name: 'nom_copropriete', label: 'Dénomination de la copropriété', type: 'text', required: true },
      { name: 'adresse_immeuble', label: 'Adresse de l\'immeuble', type: 'textarea', required: true },
      { name: 'nombre_lots', label: 'Nombre de lots', type: 'text', required: true },
      { name: 'date_prise_fonction', label: 'Date de prise de fonction', type: 'date', required: true },
      { name: 'duree_mandat', label: 'Durée du mandat (années)', type: 'text', required: true },
      { name: 'honoraires_annuels', label: 'Honoraires annuels (FCFA)', type: 'text', required: true },
      { name: 'missions_syndic', label: 'Missions du syndic', type: 'textarea', required: false },
      { name: 'budget_previsionnel', label: 'Budget prévisionnel annuel (FCFA)', type: 'text', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1a3c5e;border-bottom:3px solid #2d6a9f;padding-bottom:10px;text-align:center;">CONVENTION DE SYNDIC DE COPROPRIÉTÉ</h1>
<h2 style="color:#2d6a9f;">Copropriété : {{nom_copropriete}}</h2>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;margin-bottom:12px;"><strong>Adresse :</strong> {{adresse_immeuble}} — <strong>{{nombre_lots}} lots</strong></div>
<p><strong>Syndic désigné :</strong> {{nom_syndic}}</p>
<table style="width:100%;border-collapse:collapse;margin:14px 0;">
<tr style="background:#1a3c5e;color:white;"><th style="padding:8px;text-align:left;">Paramètre</th><th style="padding:8px;text-align:left;">Valeur</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Prise de fonction</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{date_prise_fonction}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Durée du mandat</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{duree_mandat}} ans</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Honoraires annuels</td><td style="padding:7px 8px;border-bottom:1px solid #eee;font-weight:bold;">{{honoraires_annuels}} FCFA</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Budget prévisionnel</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{budget_previsionnel}} FCFA</td></tr>
</table>
<div style="background:#E8F5E9;padding:10px;border-radius:4px;margin-bottom:14px;"><strong>Missions :</strong> {{missions_syndic}}</div>
<div style="display:flex;justify-content:space-between;margin-top:30px;"><div><strong>Le Syndic</strong><br/>{{nom_syndic}}<br/><br/>Signature : _______________</div><div><strong>Le Conseil Syndical</strong><br/><br/>Signature : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 58,
  },

  {
    code: 'immo2_mandat_exclusif_vente',
    name: 'Mandat exclusif de vente',
    category: 'commercial_financier',
    description: 'Mandat exclusif confié à un agent immobilier pour vendre un bien',
    price: 800, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_mandant', label: 'Nom du mandant (propriétaire)', type: 'text', required: true },
      { name: 'nom_agent', label: 'Nom / agence de l\'agent immobilier', type: 'text', required: true },
      { name: 'description_bien', label: 'Description du bien à vendre', type: 'textarea', required: true },
      { name: 'prix_mandat', label: 'Prix de vente mandaté (FCFA)', type: 'text', required: true },
      { name: 'commission', label: 'Commission agent (%)', type: 'text', required: true },
      { name: 'date_debut_mandat', label: 'Date de début', type: 'date', required: true },
      { name: 'duree_mandat', label: 'Durée du mandat (mois)', type: 'text', required: true },
      { name: 'obligations_agent', label: 'Obligations de l\'agent', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1a3c5e;border-bottom:3px solid #2d6a9f;padding-bottom:10px;text-align:center;">MANDAT EXCLUSIF DE VENTE</h1>
<p><strong>Mandant :</strong> {{nom_mandant}} &nbsp;|&nbsp; <strong>Agent :</strong> {{nom_agent}}</p>
<h2 style="color:#2d6a9f;">Bien concerné</h2>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;margin-bottom:12px;">{{description_bien}}</div>
<table style="width:100%;border-collapse:collapse;margin:14px 0;">
<tr style="background:#1a3c5e;color:white;"><th style="padding:8px;text-align:left;">Condition</th><th style="padding:8px;text-align:right;">Valeur</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Prix de vente</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;font-weight:bold;">{{prix_mandat}} FCFA</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Commission agent</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{commission}} %</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Date de début</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{date_debut_mandat}}</td></tr>
<tr style="background:#FFF9C4;font-weight:bold;"><td style="padding:8px;">Durée exclusive</td><td style="padding:8px;text-align:right;">{{duree_mandat}} mois</td></tr>
</table>
<div style="background:#E8F5E9;padding:10px;border-radius:4px;margin-bottom:14px;"><strong>Obligations de l'agent :</strong> {{obligations_agent}}</div>
<div style="display:flex;justify-content:space-between;margin-top:30px;"><div><strong>Le Mandant</strong><br/><br/>Signature : _______________</div><div><strong>L'Agent Immobilier</strong><br/><br/>Signature : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 67,
  },

  {
    code: 'immo2_rapport_expertise_immobiliere',
    name: 'Rapport d\'expertise immobilière',
    category: 'commercial_financier',
    description: 'Rapport d\'évaluation de la valeur vénale d\'un bien immobilier',
    price: 1100, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_expert', label: 'Nom de l\'expert', type: 'text', required: true },
      { name: 'nom_commanditaire', label: 'Commanditaire de l\'expertise', type: 'text', required: true },
      { name: 'date_expertise', label: 'Date de l\'expertise', type: 'date', required: true },
      { name: 'adresse_bien', label: 'Adresse du bien expertisé', type: 'textarea', required: true },
      { name: 'nature_bien', label: 'Nature du bien', type: 'text', required: true },
      { name: 'superficie', label: 'Superficie totale (m²)', type: 'text', required: true },
      { name: 'etat_bien', label: 'État général du bien', type: 'textarea', required: false },
      { name: 'valeur_venale', label: 'Valeur vénale estimée (FCFA)', type: 'text', required: true },
      { name: 'methode_evaluation', label: 'Méthode d\'évaluation utilisée', type: 'textarea', required: false },
      { name: 'observations', label: 'Observations et réserves', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1a3c5e;border-bottom:3px solid #2d6a9f;padding-bottom:10px;text-align:center;">RAPPORT D'EXPERTISE IMMOBILIÈRE</h1>
<p><strong>Expert :</strong> {{nom_expert}} &nbsp;|&nbsp; <strong>Commanditaire :</strong> {{nom_commanditaire}} &nbsp;|&nbsp; <strong>Date :</strong> {{date_expertise}}</p>
<h2 style="color:#2d6a9f;">Bien expertisé</h2>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;margin-bottom:12px;"><strong>Adresse :</strong> {{adresse_bien}}<br/><strong>Nature :</strong> {{nature_bien}} — <strong>{{superficie}} m²</strong></div>
<div style="background:#FFF3E0;padding:10px;border-radius:4px;margin-bottom:12px;"><strong>État général :</strong> {{etat_bien}}</div>
<table style="width:100%;border-collapse:collapse;margin:14px 0;">
<tr style="background:#1a3c5e;color:white;"><th style="padding:8px;text-align:left;">Résultat</th><th style="padding:8px;text-align:right;">Valeur</th></tr>
<tr style="background:#E8F5E9;font-weight:bold;font-size:15px;"><td style="padding:10px 8px;">Valeur vénale estimée</td><td style="padding:10px 8px;text-align:right;">{{valeur_venale}} FCFA</td></tr>
</table>
<div style="background:#F0F4F8;padding:10px;border-radius:4px;margin-bottom:10px;"><strong>Méthode d'évaluation :</strong> {{methode_evaluation}}</div>
<div style="background:#FFF9C4;padding:10px;border-radius:4px;"><strong>Observations :</strong> {{observations}}</div>
<p style="margin-top:25px;"><strong>L'Expert</strong> : {{nom_expert}}<br/><br/>Signature et cachet : _______________</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 60,
  },

  {
    code: 'immo2_contrat_construction_villa',
    name: 'Contrat de construction de villa',
    category: 'gestion_projet',
    description: 'Contrat entre maître d\'ouvrage et entrepreneur pour la construction d\'une villa',
    price: 1200, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_maitre_ouvrage', label: 'Maître d\'ouvrage', type: 'text', required: true },
      { name: 'nom_entrepreneur', label: 'Entrepreneur / entreprise', type: 'text', required: true },
      { name: 'adresse_chantier', label: 'Adresse du chantier', type: 'textarea', required: true },
      { name: 'description_travaux', label: 'Description des travaux', type: 'textarea', required: true },
      { name: 'montant_marche', label: 'Montant du marché (FCFA)', type: 'text', required: true },
      { name: 'avance_demarrage', label: 'Avance de démarrage (FCFA)', type: 'text', required: false },
      { name: 'delai_execution', label: 'Délai d\'exécution (mois)', type: 'text', required: true },
      { name: 'date_demarrage', label: 'Date de démarrage prévue', type: 'date', required: true },
      { name: 'penalites_retard', label: 'Pénalités de retard (%/jour)', type: 'text', required: false },
      { name: 'garanties', label: 'Garanties exigées', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#4e342e;border-bottom:3px solid #6d4c41;padding-bottom:10px;text-align:center;">CONTRAT DE CONSTRUCTION DE VILLA</h1>
<p><strong>Maître d'ouvrage :</strong> {{nom_maitre_ouvrage}}</p>
<p><strong>Entrepreneur :</strong> {{nom_entrepreneur}}</p>
<h2 style="color:#6d4c41;">Chantier et travaux</h2>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;margin-bottom:12px;"><strong>Adresse :</strong> {{adresse_chantier}}</div>
<div style="background:#FFF3E0;padding:10px;border-radius:4px;margin-bottom:12px;"><strong>Description :</strong> {{description_travaux}}</div>
<table style="width:100%;border-collapse:collapse;margin:14px 0;">
<tr style="background:#4e342e;color:white;"><th style="padding:8px;text-align:left;">Condition financière</th><th style="padding:8px;text-align:right;">Montant</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Montant du marché</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;font-weight:bold;">{{montant_marche}} FCFA</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Avance de démarrage</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{avance_demarrage}} FCFA</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Démarrage prévu</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{date_demarrage}}</td></tr>
<tr style="background:#FFF9C4;font-weight:bold;"><td style="padding:8px;">Délai d'exécution</td><td style="padding:8px;text-align:right;">{{delai_execution}} mois</td></tr>
</table>
<p><strong>Pénalités de retard :</strong> {{penalites_retard}} % par jour de retard</p>
<div style="background:#E8F5E9;padding:10px;border-radius:4px;margin-bottom:14px;"><strong>Garanties :</strong> {{garanties}}</div>
<div style="display:flex;justify-content:space-between;margin-top:30px;"><div><strong>Le Maître d'ouvrage</strong><br/><br/>Signature : _______________</div><div><strong>L'Entrepreneur</strong><br/><br/>Signature : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 68,
  },

  {
    code: 'immo2_cahier_charges_lotissement',
    name: 'Cahier des charges de lotissement',
    category: 'gestion_projet',
    description: 'Règlement de lotissement définissant les conditions de construction',
    price: 1000, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_lotisseur', label: 'Nom du lotisseur / promoteur', type: 'text', required: true },
      { name: 'nom_lotissement', label: 'Nom du lotissement', type: 'text', required: true },
      { name: 'localisation', label: 'Localisation / commune', type: 'text', required: true },
      { name: 'superficie_totale', label: 'Superficie totale lotie (m²)', type: 'text', required: true },
      { name: 'nombre_lots', label: 'Nombre de lots', type: 'text', required: true },
      { name: 'superficie_min_lot', label: 'Superficie minimale par lot (m²)', type: 'text', required: false },
      { name: 'regles_construction', label: 'Règles de construction applicables', type: 'textarea', required: true },
      { name: 'servitudes', label: 'Servitudes et contraintes', type: 'textarea', required: false },
      { name: 'equipements_communs', label: 'Équipements communs prévus', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1a3c5e;border-bottom:3px solid #2d6a9f;padding-bottom:10px;text-align:center;">CAHIER DES CHARGES — LOTISSEMENT {{nom_lotissement}}</h1>
<p><strong>Lotisseur :</strong> {{nom_lotisseur}} &nbsp;|&nbsp; <strong>Localisation :</strong> {{localisation}}</p>
<table style="width:100%;border-collapse:collapse;margin:14px 0;">
<tr style="background:#1a3c5e;color:white;"><th style="padding:8px;text-align:left;">Caractéristique</th><th style="padding:8px;text-align:left;">Valeur</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Superficie totale</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{superficie_totale}} m²</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Nombre de lots</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{nombre_lots}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Superficie min. par lot</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{superficie_min_lot}} m²</td></tr>
</table>
<div style="background:#F0F4F8;padding:10px;border-radius:4px;margin-bottom:10px;"><strong>Règles de construction :</strong> {{regles_construction}}</div>
<div style="background:#FFF3E0;padding:10px;border-radius:4px;margin-bottom:10px;"><strong>Servitudes :</strong> {{servitudes}}</div>
<div style="background:#E8F5E9;padding:10px;border-radius:4px;"><strong>Équipements communs :</strong> {{equipements_communs}}</div>
<p style="margin-top:20px;text-align:right;font-style:italic;">Le Lotisseur : {{nom_lotisseur}}<br/>Signature : _______________</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 55,
  },

  {
    code: 'immo2_acte_cession_terrain_titre',
    name: 'Acte de cession de terrain titré',
    category: 'juridique_admin',
    description: 'Acte de cession d\'un terrain disposant d\'un titre foncier',
    price: 1200, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_cedant', label: 'Nom du cédant', type: 'text', required: true },
      { name: 'nom_cessionnaire', label: 'Nom du cessionnaire', type: 'text', required: true },
      { name: 'numero_titre', label: 'Numéro du titre foncier', type: 'text', required: true },
      { name: 'localisation_terrain', label: 'Localisation du terrain', type: 'textarea', required: true },
      { name: 'superficie_terrain', label: 'Superficie du terrain (m²)', type: 'text', required: true },
      { name: 'prix_cession', label: 'Prix de cession (FCFA)', type: 'text', required: true },
      { name: 'modalites_paiement', label: 'Modalités de paiement', type: 'textarea', required: true },
      { name: 'date_acte', label: 'Date de l\'acte', type: 'date', required: true },
      { name: 'notaire', label: 'Notaire instrumentaire', type: 'text', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;border:2px solid #1a3c5e;">
<h1 style="color:#1a3c5e;text-align:center;border-bottom:3px solid #2d6a9f;padding-bottom:10px;">ACTE DE CESSION DE TERRAIN</h1>
<p style="text-align:center;font-style:italic;">Terrain titré — TF N° <strong>{{numero_titre}}</strong></p>
<p>L'an {{date_acte}}, par-devant Maître <strong>{{notaire}}</strong>,</p>
<p>A comparu :</p>
<p><strong>Le Cédant :</strong> {{nom_cedant}}</p>
<p><strong>Le Cessionnaire :</strong> {{nom_cessionnaire}}</p>
<h2 style="color:#2d6a9f;">Désignation du terrain</h2>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;margin-bottom:12px;">{{localisation_terrain}} — Superficie : <strong>{{superficie_terrain}} m²</strong></div>
<table style="width:100%;border-collapse:collapse;margin:14px 0;">
<tr style="background:#1a3c5e;color:white;"><th style="padding:8px;text-align:left;">Conditions financières</th><th style="padding:8px;text-align:right;">Montant</th></tr>
<tr style="background:#FFF9C4;font-weight:bold;"><td style="padding:10px 8px;">Prix de cession</td><td style="padding:10px 8px;text-align:right;font-size:15px;">{{prix_cession}} FCFA</td></tr>
</table>
<div style="background:#E8F5E9;padding:10px;border-radius:4px;margin-bottom:14px;"><strong>Modalités de paiement :</strong> {{modalites_paiement}}</div>
<div style="display:flex;justify-content:space-between;margin-top:30px;"><div><strong>Le Cédant</strong><br/>{{nom_cedant}}<br/><br/>Signature : _______________</div><div><strong>Le Cessionnaire</strong><br/>{{nom_cessionnaire}}<br/><br/>Signature : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 73,
  },

  {
    code: 'immo2_plan_financement_immobilier',
    name: 'Plan de financement immobilier',
    category: 'commercial_financier',
    description: 'Structurer le plan de financement d\'un projet immobilier',
    price: 700, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_promoteur', label: 'Nom du promoteur / acquéreur', type: 'text', required: true },
      { name: 'intitule_projet', label: 'Intitulé du projet', type: 'text', required: true },
      { name: 'cout_total_projet', label: 'Coût total du projet (FCFA)', type: 'text', required: true },
      { name: 'apport_fonds_propres', label: 'Apport en fonds propres (FCFA)', type: 'text', required: true },
      { name: 'credit_bancaire', label: 'Crédit bancaire sollicité (FCFA)', type: 'text', required: false },
      { name: 'subventions', label: 'Subventions / aides (FCFA)', type: 'text', required: false },
      { name: 'taux_interet', label: 'Taux d\'intérêt annuel (%)', type: 'text', required: false },
      { name: 'duree_credit', label: 'Durée du crédit (mois)', type: 'text', required: false },
      { name: 'mensualite_estimee', label: 'Mensualité estimée (FCFA)', type: 'text', required: false },
      { name: 'observations', label: 'Observations', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1a3c5e;border-bottom:3px solid #2d6a9f;padding-bottom:10px;">PLAN DE FINANCEMENT IMMOBILIER</h1>
<p><strong>Porteur de projet :</strong> {{nom_promoteur}} &nbsp;|&nbsp; <strong>Projet :</strong> {{intitule_projet}}</p>
<table style="width:100%;border-collapse:collapse;margin:14px 0;">
<tr style="background:#1a3c5e;color:white;"><th style="padding:8px;text-align:left;">Ressource</th><th style="padding:8px;text-align:right;">Montant (FCFA)</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Fonds propres</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{apport_fonds_propres}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Crédit bancaire</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{credit_bancaire}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Subventions / aides</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{subventions}}</td></tr>
<tr style="background:#FFF9C4;font-weight:bold;"><td style="padding:8px;">COÛT TOTAL DU PROJET</td><td style="padding:8px;text-align:right;">{{cout_total_projet}}</td></tr>
</table>
<table style="width:100%;border-collapse:collapse;margin:10px 0;">
<tr style="background:#2d6a9f;color:white;"><th style="padding:8px;text-align:left;">Paramètre crédit</th><th style="padding:8px;text-align:left;">Valeur</th></tr>
<tr><td style="padding:6px 8px;border-bottom:1px solid #eee;">Taux d'intérêt</td><td style="padding:6px 8px;border-bottom:1px solid #eee;">{{taux_interet}} %/an</td></tr>
<tr><td style="padding:6px 8px;border-bottom:1px solid #eee;">Durée</td><td style="padding:6px 8px;border-bottom:1px solid #eee;">{{duree_credit}} mois</td></tr>
<tr><td style="padding:6px 8px;border-bottom:1px solid #eee;">Mensualité estimée</td><td style="padding:6px 8px;border-bottom:1px solid #eee;font-weight:bold;">{{mensualite_estimee}} FCFA</td></tr>
</table>
<div style="background:#F0F4F8;padding:10px;border-radius:4px;"><strong>Observations :</strong> {{observations}}</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 62,
  },

  // ─── btp2_ : BTP Advanced ─────────────────────────────────────────────────
  {
    code: 'btp2_contrat_sous_traitance',
    name: 'Contrat de sous-traitance BTP',
    category: 'juridique_admin',
    description: 'Contrat de sous-traitance pour travaux de bâtiment et travaux publics',
    price: 1000, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise_principale', label: 'Entreprise principale (titulaire)', type: 'text', required: true },
      { name: 'nom_sous_traitant', label: 'Sous-traitant', type: 'text', required: true },
      { name: 'intitule_marche', label: 'Intitulé du marché principal', type: 'text', required: true },
      { name: 'lots_sous_traites', label: 'Lots / travaux sous-traités', type: 'textarea', required: true },
      { name: 'montant_sous_traitance', label: 'Montant sous-traité (FCFA)', type: 'text', required: true },
      { name: 'delai_execution', label: 'Délai d\'exécution (semaines)', type: 'text', required: true },
      { name: 'date_debut', label: 'Date de début', type: 'date', required: true },
      { name: 'penalites', label: 'Pénalités de retard', type: 'text', required: false },
      { name: 'garanties_requises', label: 'Garanties requises', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#37474f;border-bottom:3px solid #546e7a;padding-bottom:10px;text-align:center;">CONTRAT DE SOUS-TRAITANCE BTP</h1>
<p><strong>Entreprise principale :</strong> {{nom_entreprise_principale}}</p>
<p><strong>Sous-traitant :</strong> {{nom_sous_traitant}}</p>
<p><strong>Marché principal :</strong> {{intitule_marche}}</p>
<h2 style="color:#546e7a;">Travaux sous-traités</h2>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;margin-bottom:12px;">{{lots_sous_traites}}</div>
<table style="width:100%;border-collapse:collapse;margin:14px 0;">
<tr style="background:#37474f;color:white;"><th style="padding:8px;text-align:left;">Condition</th><th style="padding:8px;text-align:right;">Valeur</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Montant sous-traité</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;font-weight:bold;">{{montant_sous_traitance}} FCFA</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Date de début</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{date_debut}}</td></tr>
<tr style="background:#FFF9C4;font-weight:bold;"><td style="padding:8px;">Délai d'exécution</td><td style="padding:8px;text-align:right;">{{delai_execution}} semaines</td></tr>
</table>
<p><strong>Pénalités :</strong> {{penalites}}</p>
<div style="background:#E8F5E9;padding:10px;border-radius:4px;margin-bottom:14px;"><strong>Garanties requises :</strong> {{garanties_requises}}</div>
<div style="display:flex;justify-content:space-between;margin-top:30px;"><div><strong>L'Entreprise principale</strong><br/><br/>Signature : _______________</div><div><strong>Le Sous-traitant</strong><br/><br/>Signature : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 66,
  },

  {
    code: 'btp2_ordre_service_travaux',
    name: 'Ordre de service travaux',
    category: 'gestion_projet',
    description: 'Ordre de service pour démarrage, modification ou arrêt de travaux',
    price: 400, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_maitre_ouvrage', label: 'Maître d\'ouvrage', type: 'text', required: true },
      { name: 'nom_entreprise', label: 'Entreprise titulaire', type: 'text', required: true },
      { name: 'numero_os', label: 'Numéro de l\'OS', type: 'text', required: true },
      { name: 'intitule_marche', label: 'Intitulé du marché', type: 'text', required: true },
      { name: 'objet_os', label: 'Objet de l\'ordre de service', type: 'textarea', required: true },
      { name: 'type_os', label: 'Type (démarrage / modification / arrêt)', type: 'text', required: true },
      { name: 'date_os', label: 'Date de l\'ordre de service', type: 'date', required: true },
      { name: 'date_effet', label: 'Date d\'effet', type: 'date', required: true },
      { name: 'nom_signataire', label: 'Signataire (MO ou représentant)', type: 'text', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;border:1px solid #546e7a;">
<h1 style="color:#37474f;text-align:center;border-bottom:2px solid #546e7a;padding-bottom:8px;">ORDRE DE SERVICE N° {{numero_os}}</h1>
<p style="text-align:center;color:#555;">{{type_os}} — Émis le <strong>{{date_os}}</strong></p>
<table style="width:100%;border-collapse:collapse;margin:14px 0;">
<tr style="background:#37474f;color:white;"><th style="padding:8px;text-align:left;">Information</th><th style="padding:8px;text-align:left;">Détail</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Maître d'ouvrage</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{nom_maitre_ouvrage}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Entreprise</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{nom_entreprise}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Marché</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{intitule_marche}}</td></tr>
<tr style="background:#FFF9C4;"><td style="padding:7px 8px;border-bottom:1px solid #eee;font-weight:bold;">Date d'effet</td><td style="padding:7px 8px;border-bottom:1px solid #eee;font-weight:bold;">{{date_effet}}</td></tr>
</table>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;margin-bottom:14px;"><strong>Objet :</strong> {{objet_os}}</div>
<p style="margin-top:20px;"><strong>Le Maître d'ouvrage / Représentant :</strong> {{nom_signataire}}<br/><br/>Signature : _______________</p>
<p style="margin-top:15px;"><strong>Accusé de réception (Entreprise) :</strong><br/><br/>Signature : _______________ &nbsp; Date : _______________</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 70,
  },

  {
    code: 'btp2_attachement_travaux_mensuel',
    name: 'Attachement travaux mensuel',
    category: 'gestion_projet',
    description: 'Relevé mensuel des travaux exécutés pour facturation',
    price: 500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Entreprise', type: 'text', required: true },
      { name: 'nom_maitre_ouvrage', label: 'Maître d\'ouvrage', type: 'text', required: true },
      { name: 'intitule_marche', label: 'Intitulé du marché', type: 'text', required: true },
      { name: 'periode', label: 'Période (mois/année)', type: 'text', required: true },
      { name: 'numero_attachement', label: 'Numéro d\'attachement', type: 'text', required: true },
      { name: 'detail_travaux', label: 'Détail des travaux exécutés', type: 'textarea', required: true },
      { name: 'montant_periode', label: 'Montant de la période (FCFA)', type: 'text', required: true },
      { name: 'cumul_anterieur', label: 'Cumul antérieur (FCFA)', type: 'text', required: false },
      { name: 'cumul_general', label: 'Cumul général (FCFA)', type: 'text', required: true },
      { name: 'taux_avancement', label: 'Taux d\'avancement (%)', type: 'text', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#37474f;border-bottom:3px solid #546e7a;padding-bottom:10px;">ATTACHEMENT TRAVAUX N° {{numero_attachement}}</h1>
<p><strong>Entreprise :</strong> {{nom_entreprise}} &nbsp;|&nbsp; <strong>MO :</strong> {{nom_maitre_ouvrage}}</p>
<p><strong>Marché :</strong> {{intitule_marche}} &nbsp;|&nbsp; <strong>Période :</strong> {{periode}}</p>
<h2 style="color:#546e7a;">Travaux exécutés</h2>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;margin-bottom:12px;">{{detail_travaux}}</div>
<table style="width:100%;border-collapse:collapse;margin:14px 0;">
<tr style="background:#37474f;color:white;"><th style="padding:8px;text-align:left;">Récapitulatif financier</th><th style="padding:8px;text-align:right;">Montant (FCFA)</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Montant de la période</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;font-weight:bold;">{{montant_periode}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Cumul antérieur</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{cumul_anterieur}}</td></tr>
<tr style="background:#FFF9C4;font-weight:bold;"><td style="padding:8px;">Cumul général</td><td style="padding:8px;text-align:right;">{{cumul_general}}</td></tr>
</table>
<p><strong>Taux d'avancement global :</strong> <span style="font-size:16px;color:#37474f;font-weight:bold;">{{taux_avancement}} %</span></p>
<div style="display:flex;justify-content:space-between;margin-top:25px;"><div><strong>L'Entreprise</strong><br/><br/>Signature : _______________</div><div><strong>Le Maître d'ouvrage</strong><br/><br/>Visa : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 63,
  },

  {
    code: 'btp2_decompte_definitif_travaux',
    name: 'Décompte définitif des travaux',
    category: 'commercial_financier',
    description: 'Décompte général et définitif soldant le marché de travaux',
    price: 800, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Entreprise', type: 'text', required: true },
      { name: 'nom_maitre_ouvrage', label: 'Maître d\'ouvrage', type: 'text', required: true },
      { name: 'intitule_marche', label: 'Intitulé du marché', type: 'text', required: true },
      { name: 'montant_marche_initial', label: 'Montant initial du marché (FCFA)', type: 'text', required: true },
      { name: 'montant_avenants', label: 'Montant des avenants (FCFA)', type: 'text', required: false },
      { name: 'montant_travaux_realises', label: 'Montant des travaux réalisés (FCFA)', type: 'text', required: true },
      { name: 'acomptes_verses', label: 'Acomptes déjà versés (FCFA)', type: 'text', required: true },
      { name: 'solde_payer', label: 'Solde à payer (FCFA)', type: 'text', required: true },
      { name: 'retenue_garantie', label: 'Retenue de garantie libérée (FCFA)', type: 'text', required: false },
      { name: 'date_decompte', label: 'Date du décompte', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#37474f;border-bottom:3px solid #546e7a;padding-bottom:10px;text-align:center;">DÉCOMPTE GÉNÉRAL ET DÉFINITIF</h1>
<p><strong>Entreprise :</strong> {{nom_entreprise}} &nbsp;|&nbsp; <strong>MO :</strong> {{nom_maitre_ouvrage}}</p>
<p><strong>Marché :</strong> {{intitule_marche}} &nbsp;|&nbsp; <strong>Date :</strong> {{date_decompte}}</p>
<table style="width:100%;border-collapse:collapse;margin:14px 0;">
<tr style="background:#37474f;color:white;"><th style="padding:8px;text-align:left;">Élément</th><th style="padding:8px;text-align:right;">Montant (FCFA)</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Montant initial du marché</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{montant_marche_initial}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Avenants</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{montant_avenants}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Travaux réalisés (DGD)</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;font-weight:bold;">{{montant_travaux_realises}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Acomptes versés</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{acomptes_verses}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Retenue de garantie libérée</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{retenue_garantie}}</td></tr>
<tr style="background:#E8F5E9;font-weight:bold;font-size:15px;"><td style="padding:10px 8px;">SOLDE À PAYER</td><td style="padding:10px 8px;text-align:right;">{{solde_payer}}</td></tr>
</table>
<div style="display:flex;justify-content:space-between;margin-top:25px;"><div><strong>L'Entreprise</strong><br/><br/>Signature : _______________</div><div><strong>Le Maître d'ouvrage</strong><br/><br/>Approbation : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 64,
  },

  {
    code: 'btp2_pv_reception_chantier',
    name: 'Procès-verbal de réception de chantier',
    category: 'gestion_projet',
    description: 'PV de réception des travaux (provisoire ou définitive)',
    price: 600, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_maitre_ouvrage', label: 'Maître d\'ouvrage', type: 'text', required: true },
      { name: 'nom_entreprise', label: 'Entreprise titulaire', type: 'text', required: true },
      { name: 'intitule_travaux', label: 'Intitulé des travaux', type: 'text', required: true },
      { name: 'lieu_chantier', label: 'Lieu du chantier', type: 'text', required: true },
      { name: 'type_reception', label: 'Type de réception (provisoire / définitive)', type: 'text', required: true },
      { name: 'date_reception', label: 'Date de réception', type: 'date', required: true },
      { name: 'membres_commission', label: 'Membres de la commission', type: 'textarea', required: true },
      { name: 'observations', label: 'Observations / réserves', type: 'textarea', required: false },
      { name: 'decision', label: 'Décision de la commission', type: 'textarea', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;border:1px solid #546e7a;">
<h1 style="color:#37474f;text-align:center;border-bottom:2px solid #546e7a;padding-bottom:8px;">PROCÈS-VERBAL DE RÉCEPTION DE CHANTIER</h1>
<p style="text-align:center;"><strong>{{type_reception}}</strong> — Date : <strong>{{date_reception}}</strong></p>
<table style="width:100%;border-collapse:collapse;margin:14px 0;">
<tr style="background:#37474f;color:white;"><th style="padding:8px;text-align:left;">Renseignement</th><th style="padding:8px;text-align:left;">Valeur</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Maître d'ouvrage</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{nom_maitre_ouvrage}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Entreprise</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{nom_entreprise}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Travaux</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{intitule_travaux}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Lieu</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{lieu_chantier}}</td></tr>
</table>
<div style="background:#F0F4F8;padding:10px;border-radius:4px;margin-bottom:10px;"><strong>Commission :</strong> {{membres_commission}}</div>
<div style="background:#FFF3E0;padding:10px;border-radius:4px;margin-bottom:10px;"><strong>Réserves / Observations :</strong> {{observations}}</div>
<div style="background:#E8F5E9;padding:12px;border-radius:4px;margin-bottom:14px;font-weight:bold;"><strong>Décision :</strong> {{decision}}</div>
<p style="margin-top:20px;"><strong>Signatures des membres de la commission</strong></p>
<p>_______________ &nbsp;&nbsp; _______________ &nbsp;&nbsp; _______________</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 69,
  },

  {
    code: 'btp2_plan_assurance_qualite',
    name: 'Plan assurance qualité chantier',
    category: 'gestion_projet',
    description: 'PAQ définissant les procédures de contrôle qualité sur chantier',
    price: 900, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Entreprise', type: 'text', required: true },
      { name: 'intitule_marche', label: 'Intitulé du marché', type: 'text', required: true },
      { name: 'responsable_qualite', label: 'Responsable qualité', type: 'text', required: true },
      { name: 'date_paq', label: 'Date du PAQ', type: 'date', required: true },
      { name: 'version', label: 'Version du document', type: 'text', required: false },
      { name: 'objectifs_qualite', label: 'Objectifs qualité', type: 'textarea', required: true },
      { name: 'procedures_controle', label: 'Procédures de contrôle', type: 'textarea', required: true },
      { name: 'points_arret', label: 'Points d\'arrêt et de contrôle', type: 'textarea', required: false },
      { name: 'documents_reference', label: 'Documents et normes de référence', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#37474f;border-bottom:3px solid #546e7a;padding-bottom:10px;">PLAN D'ASSURANCE QUALITÉ (PAQ)</h1>
<p><strong>Entreprise :</strong> {{nom_entreprise}} &nbsp;|&nbsp; <strong>Version :</strong> {{version}} &nbsp;|&nbsp; <strong>Date :</strong> {{date_paq}}</p>
<p><strong>Marché :</strong> {{intitule_marche}}</p>
<p><strong>Responsable qualité :</strong> {{responsable_qualite}}</p>
<h2 style="color:#546e7a;">Objectifs qualité</h2>
<div style="background:#E8F5E9;padding:12px;border-radius:4px;margin-bottom:12px;">{{objectifs_qualite}}</div>
<h2 style="color:#546e7a;">Procédures de contrôle</h2>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;margin-bottom:12px;">{{procedures_controle}}</div>
<h2 style="color:#546e7a;">Points d'arrêt</h2>
<div style="background:#FFF3E0;padding:10px;border-radius:4px;margin-bottom:10px;">{{points_arret}}</div>
<div style="background:#F5F5F5;padding:10px;border-radius:4px;"><strong>Références :</strong> {{documents_reference}}</div>
<p style="margin-top:20px;"><strong>Établi par :</strong> {{responsable_qualite}}<br/><br/>Signature : _______________</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 57,
  },

  {
    code: 'btp2_rapport_journalier_chantier',
    name: 'Rapport journalier de chantier',
    category: 'gestion_projet',
    description: 'Compte rendu quotidien des activités sur le chantier',
    price: 400, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_chantier', label: 'Nom du chantier', type: 'text', required: true },
      { name: 'date_rapport', label: 'Date du rapport', type: 'date', required: true },
      { name: 'numero_rapport', label: 'Numéro du rapport', type: 'text', required: false },
      { name: 'chef_chantier', label: 'Chef de chantier', type: 'text', required: true },
      { name: 'effectif_present', label: 'Effectif présent (personnes)', type: 'text', required: true },
      { name: 'conditions_meteo', label: 'Conditions météo', type: 'text', required: false },
      { name: 'travaux_executes', label: 'Travaux exécutés', type: 'textarea', required: true },
      { name: 'materiaux_utilises', label: 'Matériaux / ressources utilisés', type: 'textarea', required: false },
      { name: 'incidents', label: 'Incidents / problèmes rencontrés', type: 'textarea', required: false },
      { name: 'previsions_lendemain', label: 'Prévisions pour le lendemain', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#37474f;border-bottom:2px solid #546e7a;padding-bottom:8px;">RAPPORT JOURNALIER DE CHANTIER</h1>
<p><strong>Chantier :</strong> {{nom_chantier}} &nbsp;|&nbsp; <strong>Date :</strong> {{date_rapport}} &nbsp;|&nbsp; <strong>N° :</strong> {{numero_rapport}}</p>
<table style="width:100%;border-collapse:collapse;margin:12px 0;">
<tr style="background:#37474f;color:white;"><th style="padding:8px;text-align:left;">Information</th><th style="padding:8px;text-align:left;">Valeur</th></tr>
<tr><td style="padding:6px 8px;border-bottom:1px solid #eee;">Chef de chantier</td><td style="padding:6px 8px;border-bottom:1px solid #eee;">{{chef_chantier}}</td></tr>
<tr><td style="padding:6px 8px;border-bottom:1px solid #eee;">Effectif présent</td><td style="padding:6px 8px;border-bottom:1px solid #eee;">{{effectif_present}} personnes</td></tr>
<tr><td style="padding:6px 8px;border-bottom:1px solid #eee;">Météo</td><td style="padding:6px 8px;border-bottom:1px solid #eee;">{{conditions_meteo}}</td></tr>
</table>
<div style="background:#F0F4F8;padding:10px;border-radius:4px;margin-bottom:10px;"><strong>Travaux exécutés :</strong><br/>{{travaux_executes}}</div>
<div style="background:#FFF3E0;padding:10px;border-radius:4px;margin-bottom:10px;"><strong>Matériaux utilisés :</strong> {{materiaux_utilises}}</div>
<div style="background:#FFEBEE;padding:10px;border-radius:4px;margin-bottom:10px;"><strong>Incidents :</strong> {{incidents}}</div>
<div style="background:#E8F5E9;padding:10px;border-radius:4px;"><strong>Prévisions J+1 :</strong> {{previsions_lendemain}}</div>
<p style="margin-top:15px;"><strong>Chef de chantier :</strong> {{chef_chantier}} &nbsp;&nbsp; Signature : _______________</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 75,
  },

  {
    code: 'btp2_contrat_location_engins',
    name: 'Contrat de location d\'engins BTP',
    category: 'commercial_financier',
    description: 'Contrat de location d\'engins et matériels de chantier',
    price: 700, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_loueur', label: 'Nom du loueur (propriétaire)', type: 'text', required: true },
      { name: 'nom_locataire', label: 'Nom du locataire / entreprise', type: 'text', required: true },
      { name: 'description_engin', label: 'Description de l\'engin / matériel', type: 'textarea', required: true },
      { name: 'chantier_destination', label: 'Chantier de destination', type: 'text', required: true },
      { name: 'date_debut', label: 'Date de début de location', type: 'date', required: true },
      { name: 'duree_location', label: 'Durée de location (jours)', type: 'text', required: true },
      { name: 'tarif_journalier', label: 'Tarif journalier (FCFA)', type: 'text', required: true },
      { name: 'montant_total', label: 'Montant total (FCFA)', type: 'text', required: true },
      { name: 'caution', label: 'Caution versée (FCFA)', type: 'text', required: false },
      { name: 'responsabilites', label: 'Responsabilités du locataire', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#37474f;border-bottom:3px solid #546e7a;padding-bottom:10px;text-align:center;">CONTRAT DE LOCATION D'ENGINS BTP</h1>
<p><strong>Loueur :</strong> {{nom_loueur}} &nbsp;|&nbsp; <strong>Locataire :</strong> {{nom_locataire}}</p>
<h2 style="color:#546e7a;">Engin / matériel loué</h2>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;margin-bottom:12px;">{{description_engin}}</div>
<p><strong>Chantier :</strong> {{chantier_destination}}</p>
<table style="width:100%;border-collapse:collapse;margin:14px 0;">
<tr style="background:#37474f;color:white;"><th style="padding:8px;text-align:left;">Condition</th><th style="padding:8px;text-align:right;">Valeur</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Date de début</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{date_debut}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Durée</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{duree_location}} jours</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Tarif journalier</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{tarif_journalier}} FCFA</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Caution</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{caution}} FCFA</td></tr>
<tr style="background:#FFF9C4;font-weight:bold;"><td style="padding:8px;">Montant total</td><td style="padding:8px;text-align:right;">{{montant_total}} FCFA</td></tr>
</table>
<div style="background:#FFEBEE;padding:10px;border-radius:4px;margin-bottom:14px;"><strong>Responsabilités locataire :</strong> {{responsabilites}}</div>
<div style="display:flex;justify-content:space-between;margin-top:30px;"><div><strong>Le Loueur</strong><br/><br/>Signature : _______________</div><div><strong>Le Locataire</strong><br/><br/>Signature : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 61,
  },

  {
    code: 'btp2_bordereau_prix_unitaires',
    name: 'Bordereau de prix unitaires BTP',
    category: 'commercial_financier',
    description: 'BPU listant les prix unitaires des prestations d\'un marché BTP',
    price: 600, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Entreprise', type: 'text', required: true },
      { name: 'nom_maitre_ouvrage', label: 'Maître d\'ouvrage', type: 'text', required: true },
      { name: 'intitule_marche', label: 'Intitulé du marché', type: 'text', required: true },
      { name: 'date_bpu', label: 'Date du BPU', type: 'date', required: true },
      { name: 'detail_prix_lot1', label: 'Lot 1 — Désignation et prix unitaires', type: 'textarea', required: true },
      { name: 'detail_prix_lot2', label: 'Lot 2 — Désignation et prix unitaires', type: 'textarea', required: false },
      { name: 'detail_prix_lot3', label: 'Lot 3 — Désignation et prix unitaires', type: 'textarea', required: false },
      { name: 'conditions_revision', label: 'Conditions de révision des prix', type: 'textarea', required: false },
      { name: 'validite', label: 'Durée de validité du BPU', type: 'text', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#37474f;border-bottom:3px solid #546e7a;padding-bottom:10px;text-align:center;">BORDEREAU DE PRIX UNITAIRES (BPU)</h1>
<p><strong>Entreprise :</strong> {{nom_entreprise}} &nbsp;|&nbsp; <strong>MO :</strong> {{nom_maitre_ouvrage}}</p>
<p><strong>Marché :</strong> {{intitule_marche}} &nbsp;|&nbsp; <strong>Date :</strong> {{date_bpu}} &nbsp;|&nbsp; <strong>Validité :</strong> {{validite}}</p>
<h2 style="color:#546e7a;">LOT 1</h2>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;margin-bottom:12px;">{{detail_prix_lot1}}</div>
<h2 style="color:#546e7a;">LOT 2</h2>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;margin-bottom:12px;">{{detail_prix_lot2}}</div>
<h2 style="color:#546e7a;">LOT 3</h2>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;margin-bottom:12px;">{{detail_prix_lot3}}</div>
<div style="background:#FFF9C4;padding:10px;border-radius:4px;margin-bottom:14px;"><strong>Conditions de révision :</strong> {{conditions_revision}}</div>
<div style="display:flex;justify-content:space-between;margin-top:25px;"><div><strong>L'Entreprise</strong><br/><br/>Signature : _______________</div><div><strong>Le Maître d'ouvrage</strong><br/><br/>Approbation : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 59,
  },

  {
    code: 'btp2_avenant_contrat_travaux',
    name: 'Avenant au contrat de travaux',
    category: 'juridique_admin',
    description: 'Avenant modifiant le périmètre, le délai ou le montant d\'un marché de travaux',
    price: 700, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_maitre_ouvrage', label: 'Maître d\'ouvrage', type: 'text', required: true },
      { name: 'nom_entreprise', label: 'Entreprise titulaire', type: 'text', required: true },
      { name: 'intitule_marche', label: 'Intitulé du marché initial', type: 'text', required: true },
      { name: 'numero_avenant', label: 'Numéro de l\'avenant', type: 'text', required: true },
      { name: 'date_avenant', label: 'Date de l\'avenant', type: 'date', required: true },
      { name: 'objet_avenant', label: 'Objet de l\'avenant', type: 'textarea', required: true },
      { name: 'montant_initial', label: 'Montant initial du marché (FCFA)', type: 'text', required: true },
      { name: 'montant_avenant', label: 'Montant de l\'avenant (FCFA)', type: 'text', required: true },
      { name: 'nouveau_montant', label: 'Nouveau montant du marché (FCFA)', type: 'text', required: true },
      { name: 'prolongation_delai', label: 'Prolongation du délai (jours)', type: 'text', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;border:1px solid #546e7a;">
<h1 style="color:#37474f;text-align:center;border-bottom:2px solid #546e7a;padding-bottom:8px;">AVENANT N° {{numero_avenant}} AU CONTRAT DE TRAVAUX</h1>
<p style="text-align:center;color:#555;">En date du <strong>{{date_avenant}}</strong></p>
<p><strong>Maître d'ouvrage :</strong> {{nom_maitre_ouvrage}}</p>
<p><strong>Entreprise :</strong> {{nom_entreprise}}</p>
<p><strong>Marché initial :</strong> {{intitule_marche}}</p>
<h2 style="color:#546e7a;">Objet de l'avenant</h2>
<div style="background:#FFF3E0;padding:12px;border-radius:4px;margin-bottom:12px;">{{objet_avenant}}</div>
<table style="width:100%;border-collapse:collapse;margin:14px 0;">
<tr style="background:#37474f;color:white;"><th style="padding:8px;text-align:left;">Récapitulatif financier</th><th style="padding:8px;text-align:right;">Montant (FCFA)</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Montant initial du marché</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{montant_initial}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Montant de l'avenant</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{montant_avenant}}</td></tr>
<tr style="background:#FFF9C4;font-weight:bold;font-size:15px;"><td style="padding:10px 8px;">Nouveau montant du marché</td><td style="padding:10px 8px;text-align:right;">{{nouveau_montant}}</td></tr>
</table>
<p><strong>Prolongation de délai accordée :</strong> {{prolongation_delai}} jours</p>
<div style="display:flex;justify-content:space-between;margin-top:30px;"><div><strong>Le Maître d'ouvrage</strong><br/><br/>Signature : _______________</div><div><strong>L'Entreprise</strong><br/><br/>Signature : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 65,
  },
];

async function main() {
  let created = 0, updated = 0;
  for (const t of templates) {
    const existing = await prisma.documentTemplate.findUnique({ where: { code: t.code } });
    await prisma.documentTemplate.upsert({
      where: { code: t.code },
      update: {},
      create: t,
    });
    if (existing) updated++; else created++;
  }
  const total = await prisma.documentTemplate.count();
  console.log(`Seed Immo/BTP Avance termine. Crees: ${created}, Deja presents: ${updated} — Total BDD: ${total}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
