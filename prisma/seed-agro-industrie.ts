import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const COUNTRIES = JSON.stringify(['CI','SN','CM','BJ','TG','BF','ML','GN','CD','CG','GA','NE','TD','MR']);

const templates = [
  {
    code: 'agro2_contrat_achat_recolte',
    name: 'Contrat achat récolte',
    category: 'commercial_financier',
    description: "Contrat d'achat de récolte entre producteur agricole et acheteur",
    price: 700, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_acheteur', label: 'Nom de l\'acheteur', type: 'text', required: true },
      { name: 'nom_producteur', label: 'Nom du producteur', type: 'text', required: true },
      { name: 'culture', label: 'Type de culture', type: 'text', required: true },
      { name: 'quantite_tonnes', label: 'Quantité estimée (tonnes)', type: 'text', required: true },
      { name: 'prix_tonne', label: 'Prix par tonne (FCFA)', type: 'text', required: true },
      { name: 'montant_total', label: 'Montant total (FCFA)', type: 'text', required: true },
      { name: 'date_livraison', label: 'Date de livraison prévue', type: 'date', required: true },
      { name: 'lieu_livraison', label: 'Lieu de livraison', type: 'text', required: true },
      { name: 'qualite_exigee', label: 'Critères de qualité exigés', type: 'textarea', required: false },
      { name: 'modalites_paiement', label: 'Modalités de paiement', type: 'textarea', required: true },
      { name: 'lieu_signature', label: 'Lieu de signature', type: 'text', required: false },
      { name: 'date_signature', label: 'Date de signature', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#2e7d32;border-bottom:3px solid #4caf50;padding-bottom:10px;text-align:center;">CONTRAT D'ACHAT DE RÉCOLTE</h1>
<p style="color:#555;">Entre les soussignés :</p>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#2e7d32;color:white;"><th style="padding:9px;text-align:left;">Partie</th><th style="padding:9px;text-align:left;">Identité</th></tr>
<tr><td style="padding:7px 9px;border-bottom:1px solid #e0e0e0;font-weight:bold;">Acheteur</td><td style="padding:7px 9px;border-bottom:1px solid #e0e0e0;">{{nom_acheteur}}</td></tr>
<tr><td style="padding:7px 9px;border-bottom:1px solid #e0e0e0;font-weight:bold;">Producteur</td><td style="padding:7px 9px;border-bottom:1px solid #e0e0e0;">{{nom_producteur}}</td></tr>
</table>
<h3 style="color:#2e7d32;">Objet du contrat</h3>
<table style="width:100%;border-collapse:collapse;margin:10px 0;">
<tr style="background:#e8f5e9;"><th style="padding:8px;text-align:left;">Paramètre</th><th style="padding:8px;text-align:right;">Valeur</th></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;">Culture / Produit</td><td style="padding:7px;text-align:right;border-bottom:1px solid #eee;">{{culture}}</td></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;">Quantité estimée</td><td style="padding:7px;text-align:right;border-bottom:1px solid #eee;">{{quantite_tonnes}} tonnes</td></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;">Prix par tonne</td><td style="padding:7px;text-align:right;border-bottom:1px solid #eee;">{{prix_tonne}} FCFA</td></tr>
<tr style="background:#fff9c4;font-weight:bold;"><td style="padding:8px;">Montant total</td><td style="padding:8px;text-align:right;">{{montant_total}} FCFA</td></tr>
</table>
<p><strong>Livraison :</strong> {{lieu_livraison}} — le {{date_livraison}}</p>
<div style="background:#f1f8e9;padding:11px;border-radius:4px;margin:10px 0;"><strong>Critères de qualité :</strong> {{qualite_exigee}}</div>
<div style="background:#f0f4f8;padding:11px;border-radius:4px;margin:10px 0;"><strong>Modalités de paiement :</strong> {{modalites_paiement}}</div>
<p style="margin-top:20px;">Fait à {{lieu_signature}}, le {{date_signature}}.</p>
<div style="display:flex;justify-content:space-between;margin-top:25px;">
<div><strong>L'Acheteur</strong><br/>{{nom_acheteur}}<br/><br/>Signature : _______________</div>
<div><strong>Le Producteur</strong><br/>{{nom_producteur}}<br/><br/>Signature : _______________</div>
</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 70,
  },

  {
    code: 'agro2_bon_livraison_agricole',
    name: 'Bon de livraison produits agricoles',
    category: 'commercial_financier',
    description: 'Bon de livraison pour produits agricoles (céréales, tubercules, fruits)',
    price: 400, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'num_bon', label: 'Numéro du bon', type: 'text', required: true },
      { name: 'fournisseur', label: 'Fournisseur / Producteur', type: 'text', required: true },
      { name: 'destinataire', label: 'Destinataire', type: 'text', required: true },
      { name: 'date_livraison', label: 'Date de livraison', type: 'date', required: true },
      { name: 'produit', label: 'Produit agricole', type: 'text', required: true },
      { name: 'quantite', label: 'Quantité (kg / tonnes)', type: 'text', required: true },
      { name: 'conditionnement', label: 'Conditionnement (sacs, caisses…)', type: 'text', required: false },
      { name: 'prix_unitaire', label: 'Prix unitaire (FCFA)', type: 'text', required: false },
      { name: 'montant_total', label: 'Montant total (FCFA)', type: 'text', required: false },
      { name: 'etat_produit', label: 'État / Qualité du produit', type: 'text', required: false },
      { name: 'observations', label: 'Observations', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<div style="display:flex;justify-content:space-between;align-items:center;border-bottom:3px solid #4caf50;padding-bottom:10px;">
<h1 style="color:#2e7d32;margin:0;">BON DE LIVRAISON AGRICOLE</h1>
<span style="font-size:14px;color:#555;">N° {{num_bon}}</span>
</div>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#2e7d32;color:white;"><th style="padding:8px;text-align:left;">Information</th><th style="padding:8px;text-align:left;">Détail</th></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;">Fournisseur</td><td style="padding:7px;border-bottom:1px solid #eee;">{{fournisseur}}</td></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;">Destinataire</td><td style="padding:7px;border-bottom:1px solid #eee;">{{destinataire}}</td></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;">Date de livraison</td><td style="padding:7px;border-bottom:1px solid #eee;">{{date_livraison}}</td></tr>
</table>
<h3 style="color:#2e7d32;">Détail de la livraison</h3>
<table style="width:100%;border-collapse:collapse;margin:10px 0;">
<tr style="background:#e8f5e9;"><th style="padding:8px;">Produit</th><th style="padding:8px;">Qté</th><th style="padding:8px;">Cond.</th><th style="padding:8px;text-align:right;">P.U.</th><th style="padding:8px;text-align:right;">Montant</th></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;">{{produit}}</td><td style="padding:7px;border-bottom:1px solid #eee;">{{quantite}}</td><td style="padding:7px;border-bottom:1px solid #eee;">{{conditionnement}}</td><td style="padding:7px;text-align:right;border-bottom:1px solid #eee;">{{prix_unitaire}}</td><td style="padding:7px;text-align:right;border-bottom:1px solid #eee;font-weight:bold;">{{montant_total}} FCFA</td></tr>
</table>
<p><strong>État / Qualité :</strong> {{etat_produit}}</p>
<div style="background:#f0f4f8;padding:10px;border-radius:4px;"><strong>Observations :</strong> {{observations}}</div>
<div style="display:flex;justify-content:space-between;margin-top:25px;">
<div><strong>Signature fournisseur</strong><br/><br/>_______________</div>
<div><strong>Signature réceptionnaire</strong><br/><br/>_______________</div>
</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 65,
  },

  {
    code: 'agro2_facture_exportation_cereales',
    name: 'Facture exportation céréales',
    category: 'commercial_financier',
    description: 'Facture commerciale pour exportation de céréales (maïs, riz, mil, sorgho)',
    price: 800, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'num_facture', label: 'Numéro de facture', type: 'text', required: true },
      { name: 'date_facture', label: 'Date', type: 'date', required: true },
      { name: 'exportateur', label: 'Exportateur (nom / société)', type: 'text', required: true },
      { name: 'pays_exportateur', label: 'Pays d\'exportation', type: 'text', required: true },
      { name: 'importateur', label: 'Importateur', type: 'text', required: true },
      { name: 'pays_destination', label: 'Pays de destination', type: 'text', required: true },
      { name: 'cereale', label: 'Type de céréale', type: 'text', required: true },
      { name: 'quantite_tonnes', label: 'Quantité (tonnes)', type: 'text', required: true },
      { name: 'prix_tonne_usd', label: 'Prix unitaire (USD/tonne)', type: 'text', required: true },
      { name: 'montant_total_usd', label: 'Montant total (USD)', type: 'text', required: true },
      { name: 'incoterm', label: 'Incoterm (FOB, CIF…)', type: 'text', required: false },
      { name: 'port_embarquement', label: 'Port d\'embarquement', type: 'text', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:15px;">
<div><h1 style="color:#e65100;margin:0;">FACTURE D'EXPORTATION</h1><p style="color:#555;margin:4px 0;">Céréales — N° {{num_facture}}</p></div>
<div style="text-align:right;color:#555;font-size:13px;">Date : {{date_facture}}</div>
</div>
<table style="width:100%;border-collapse:collapse;margin:12px 0;">
<tr style="background:#bf360c;color:white;"><th style="padding:8px;text-align:left;">Exportateur</th><th style="padding:8px;text-align:left;">Importateur</th></tr>
<tr><td style="padding:8px;border:1px solid #eee;vertical-align:top;">{{exportateur}}<br/><em>{{pays_exportateur}}</em></td><td style="padding:8px;border:1px solid #eee;vertical-align:top;">{{importateur}}<br/><em>{{pays_destination}}</em></td></tr>
</table>
<h3 style="color:#e65100;">Détail marchandise</h3>
<table style="width:100%;border-collapse:collapse;margin:10px 0;">
<tr style="background:#fbe9e7;"><th style="padding:8px;">Produit</th><th style="padding:8px;text-align:right;">Qté (t)</th><th style="padding:8px;text-align:right;">P.U. (USD)</th><th style="padding:8px;text-align:right;">Total (USD)</th></tr>
<tr><td style="padding:8px;border-bottom:1px solid #eee;">{{cereale}}</td><td style="padding:8px;text-align:right;border-bottom:1px solid #eee;">{{quantite_tonnes}}</td><td style="padding:8px;text-align:right;border-bottom:1px solid #eee;">{{prix_tonne_usd}}</td><td style="padding:8px;text-align:right;border-bottom:1px solid #eee;font-weight:bold;">{{montant_total_usd}}</td></tr>
<tr style="background:#fff9c4;font-weight:bold;"><td colspan="3" style="padding:8px;">TOTAL</td><td style="padding:8px;text-align:right;">{{montant_total_usd}} USD</td></tr>
</table>
<p><strong>Incoterm :</strong> {{incoterm}} &nbsp;|&nbsp; <strong>Port d'embarquement :</strong> {{port_embarquement}}</p>
<p style="color:#888;font-size:12px;margin-top:15px;">Cachet et signature de l'exportateur : _________________________</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 60,
  },

  {
    code: 'agro2_convention_stockage_grain',
    name: 'Convention stockage grain',
    category: 'juridique_admin',
    description: 'Convention de stockage de grains entre propriétaire et gestionnaire de magasin',
    price: 600, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'proprietaire', label: 'Propriétaire du stock', type: 'text', required: true },
      { name: 'gestionnaire', label: 'Gestionnaire / Magasinier', type: 'text', required: true },
      { name: 'lieu_stockage', label: 'Lieu de stockage (magasin)', type: 'text', required: true },
      { name: 'produit_stocke', label: 'Produit stocké', type: 'text', required: true },
      { name: 'quantite_initiale', label: 'Quantité initiale (tonnes)', type: 'text', required: true },
      { name: 'date_entree', label: 'Date d\'entrée en stock', type: 'date', required: true },
      { name: 'duree_stockage', label: 'Durée de stockage (mois)', type: 'text', required: true },
      { name: 'frais_stockage', label: 'Frais de stockage/mois (FCFA)', type: 'text', required: true },
      { name: 'conditions_conservation', label: 'Conditions de conservation requises', type: 'textarea', required: false },
      { name: 'responsabilites', label: 'Responsabilités du gestionnaire', type: 'textarea', required: false },
      { name: 'date_signature', label: 'Date de signature', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#5d4037;border-bottom:3px solid #795548;padding-bottom:10px;text-align:center;">CONVENTION DE STOCKAGE DE GRAINS</h1>
<p>Entre <strong>{{proprietaire}}</strong> (le déposant) et <strong>{{gestionnaire}}</strong> (le dépositaire), il est convenu ce qui suit :</p>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#5d4037;color:white;"><th style="padding:9px;text-align:left;">Paramètre</th><th style="padding:9px;text-align:left;">Valeur</th></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;">Lieu de stockage</td><td style="padding:7px;border-bottom:1px solid #eee;">{{lieu_stockage}}</td></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;">Produit stocké</td><td style="padding:7px;border-bottom:1px solid #eee;">{{produit_stocke}}</td></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;">Quantité initiale</td><td style="padding:7px;border-bottom:1px solid #eee;">{{quantite_initiale}} tonnes</td></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;">Date d'entrée</td><td style="padding:7px;border-bottom:1px solid #eee;">{{date_entree}}</td></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;">Durée</td><td style="padding:7px;border-bottom:1px solid #eee;">{{duree_stockage}} mois</td></tr>
<tr style="background:#fff9c4;font-weight:bold;"><td style="padding:8px;">Frais / mois</td><td style="padding:8px;">{{frais_stockage}} FCFA</td></tr>
</table>
<div style="background:#efebe9;padding:11px;border-radius:4px;margin:10px 0;"><strong>Conditions de conservation :</strong> {{conditions_conservation}}</div>
<div style="background:#f0f4f8;padding:11px;border-radius:4px;margin:10px 0;"><strong>Responsabilités du gestionnaire :</strong> {{responsabilites}}</div>
<p>Fait le {{date_signature}}.</p>
<div style="display:flex;justify-content:space-between;margin-top:25px;">
<div><strong>Le Déposant</strong><br/>{{proprietaire}}<br/><br/>Signature : _______________</div>
<div><strong>Le Dépositaire</strong><br/>{{gestionnaire}}<br/><br/>Signature : _______________</div>
</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 55,
  },

  {
    code: 'agro2_contrat_prestation_agricole',
    name: 'Contrat prestation agricole',
    category: 'juridique_admin',
    description: 'Contrat de prestation de services agricoles (labour, traitement, récolte mécanisée)',
    price: 650, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'prestataire', label: 'Prestataire', type: 'text', required: true },
      { name: 'client', label: 'Client / Exploitant', type: 'text', required: true },
      { name: 'nature_prestation', label: 'Nature de la prestation', type: 'text', required: true },
      { name: 'superficie_ha', label: 'Superficie concernée (ha)', type: 'text', required: false },
      { name: 'date_debut', label: 'Date de début', type: 'date', required: true },
      { name: 'date_fin', label: 'Date de fin prévue', type: 'date', required: true },
      { name: 'materiel_utilise', label: 'Matériel / équipement utilisé', type: 'text', required: false },
      { name: 'prix_hectare', label: 'Prix par hectare (FCFA)', type: 'text', required: false },
      { name: 'montant_total', label: 'Montant total (FCFA)', type: 'text', required: true },
      { name: 'modalites_paiement', label: 'Modalités de paiement', type: 'textarea', required: true },
      { name: 'lieu_signature', label: 'Lieu', type: 'text', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1b5e20;border-bottom:3px solid #388e3c;padding-bottom:10px;">CONTRAT DE PRESTATION AGRICOLE</h1>
<p>Entre <strong>{{prestataire}}</strong> (le prestataire) et <strong>{{client}}</strong> (le client), il est conclu le présent contrat :</p>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#1b5e20;color:white;"><th style="padding:9px;text-align:left;">Élément</th><th style="padding:9px;text-align:left;">Détail</th></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;">Nature de la prestation</td><td style="padding:7px;border-bottom:1px solid #eee;">{{nature_prestation}}</td></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;">Superficie</td><td style="padding:7px;border-bottom:1px solid #eee;">{{superficie_ha}} ha</td></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;">Période</td><td style="padding:7px;border-bottom:1px solid #eee;">Du {{date_debut}} au {{date_fin}}</td></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;">Matériel utilisé</td><td style="padding:7px;border-bottom:1px solid #eee;">{{materiel_utilise}}</td></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;">Prix/ha</td><td style="padding:7px;border-bottom:1px solid #eee;">{{prix_hectare}} FCFA</td></tr>
<tr style="background:#fff9c4;font-weight:bold;"><td style="padding:8px;">Montant total</td><td style="padding:8px;">{{montant_total}} FCFA</td></tr>
</table>
<div style="background:#f0f4f8;padding:11px;border-radius:4px;margin:10px 0;"><strong>Modalités de paiement :</strong> {{modalites_paiement}}</div>
<p>Fait à {{lieu_signature}}.</p>
<div style="display:flex;justify-content:space-between;margin-top:25px;">
<div><strong>Le Prestataire</strong><br/>{{prestataire}}<br/><br/>Signature : _______________</div>
<div><strong>Le Client</strong><br/>{{client}}<br/><br/>Signature : _______________</div>
</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 58,
  },

  {
    code: 'agro2_fiche_tracabilite_produit',
    name: 'Fiche traçabilité produit',
    category: 'gestion_projet',
    description: 'Fiche de traçabilité pour produits agro-industriels (de la parcelle à la livraison)',
    price: 500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'ref_lot', label: 'Référence du lot', type: 'text', required: true },
      { name: 'produit', label: 'Produit', type: 'text', required: true },
      { name: 'producteur', label: 'Producteur / Exploitation', type: 'text', required: true },
      { name: 'parcelle_ref', label: 'Référence parcelle', type: 'text', required: false },
      { name: 'date_recolte', label: 'Date de récolte', type: 'date', required: true },
      { name: 'quantite_produite', label: 'Quantité produite (kg)', type: 'text', required: true },
      { name: 'traitements_appliques', label: 'Traitements phytosanitaires appliqués', type: 'textarea', required: false },
      { name: 'date_conditionnement', label: 'Date de conditionnement', type: 'date', required: false },
      { name: 'destination', label: 'Destination / Client final', type: 'text', required: false },
      { name: 'date_livraison', label: 'Date de livraison', type: 'date', required: false },
      { name: 'responsable_qualite', label: 'Responsable qualité', type: 'text', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<div style="display:flex;justify-content:space-between;align-items:center;border-bottom:3px solid #f57f17;padding-bottom:10px;">
<h1 style="color:#e65100;margin:0;">FICHE DE TRAÇABILITÉ PRODUIT</h1>
<span style="background:#e65100;color:white;padding:4px 10px;border-radius:3px;font-weight:bold;">LOT : {{ref_lot}}</span>
</div>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#e65100;color:white;"><th colspan="2" style="padding:9px;text-align:left;">Informations générales</th></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;width:40%;font-weight:bold;">Produit</td><td style="padding:7px;border-bottom:1px solid #eee;">{{produit}}</td></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;font-weight:bold;">Producteur</td><td style="padding:7px;border-bottom:1px solid #eee;">{{producteur}}</td></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;font-weight:bold;">Parcelle</td><td style="padding:7px;border-bottom:1px solid #eee;">{{parcelle_ref}}</td></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;font-weight:bold;">Date de récolte</td><td style="padding:7px;border-bottom:1px solid #eee;">{{date_recolte}}</td></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;font-weight:bold;">Quantité produite</td><td style="padding:7px;border-bottom:1px solid #eee;">{{quantite_produite}} kg</td></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;font-weight:bold;">Conditionnement</td><td style="padding:7px;border-bottom:1px solid #eee;">{{date_conditionnement}}</td></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;font-weight:bold;">Destination</td><td style="padding:7px;border-bottom:1px solid #eee;">{{destination}}</td></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;font-weight:bold;">Date livraison</td><td style="padding:7px;border-bottom:1px solid #eee;">{{date_livraison}}</td></tr>
</table>
<div style="background:#fff8e1;padding:11px;border-radius:4px;margin:10px 0;"><strong>Traitements appliqués :</strong><br/>{{traitements_appliques}}</div>
<p style="margin-top:15px;color:#555;"><strong>Responsable qualité :</strong> {{responsable_qualite}} &nbsp;&nbsp; Signature : _______________</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 62,
  },

  {
    code: 'agro2_cahier_charges_transformation',
    name: 'Cahier des charges transformation',
    category: 'gestion_projet',
    description: 'Cahier des charges pour unité de transformation de produits agricoles',
    price: 900, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'intitule_projet', label: 'Intitulé du projet de transformation', type: 'text', required: true },
      { name: 'maitre_ouvrage', label: 'Maître d\'ouvrage', type: 'text', required: true },
      { name: 'produit_traite', label: 'Produit à transformer', type: 'text', required: true },
      { name: 'capacite_traitement', label: 'Capacité de traitement (t/jour)', type: 'text', required: false },
      { name: 'procede_transformation', label: 'Procédé de transformation', type: 'textarea', required: true },
      { name: 'normes_qualite', label: 'Normes qualité à respecter', type: 'textarea', required: false },
      { name: 'equipements_requis', label: 'Équipements requis', type: 'textarea', required: false },
      { name: 'delai_execution', label: 'Délai d\'exécution (semaines)', type: 'text', required: false },
      { name: 'budget_estime', label: 'Budget estimé (FCFA)', type: 'text', required: false },
      { name: 'date_document', label: 'Date du document', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#4a148c;border-bottom:3px solid #7b1fa2;padding-bottom:10px;">CAHIER DES CHARGES</h1>
<h2 style="color:#7b1fa2;margin-top:5px;">{{intitule_projet}}</h2>
<p><strong>Maître d'ouvrage :</strong> {{maitre_ouvrage}} &nbsp;|&nbsp; <strong>Date :</strong> {{date_document}}</p>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#4a148c;color:white;"><th style="padding:9px;text-align:left;">Rubrique</th><th style="padding:9px;text-align:left;">Contenu</th></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;font-weight:bold;">Produit à transformer</td><td style="padding:7px;border-bottom:1px solid #eee;">{{produit_traite}}</td></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;font-weight:bold;">Capacité</td><td style="padding:7px;border-bottom:1px solid #eee;">{{capacite_traitement}} t/jour</td></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;font-weight:bold;">Délai d'exécution</td><td style="padding:7px;border-bottom:1px solid #eee;">{{delai_execution}} semaines</td></tr>
<tr style="background:#f3e5f5;font-weight:bold;"><td style="padding:8px;">Budget estimé</td><td style="padding:8px;">{{budget_estime}} FCFA</td></tr>
</table>
<div style="background:#f3e5f5;padding:11px;border-radius:4px;margin:10px 0;"><strong>Procédé de transformation :</strong><br/>{{procede_transformation}}</div>
<div style="background:#e8eaf6;padding:11px;border-radius:4px;margin:10px 0;"><strong>Normes qualité :</strong><br/>{{normes_qualite}}</div>
<div style="background:#f0f4f8;padding:11px;border-radius:4px;"><strong>Équipements requis :</strong><br/>{{equipements_requis}}</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 50,
  },

  {
    code: 'agro2_rapport_qualite_cacao',
    name: 'Rapport qualité cacao',
    category: 'gestion_projet',
    description: 'Rapport d\'analyse et de contrôle qualité du cacao (fèves)',
    price: 700, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'ref_echantillon', label: 'Référence échantillon', type: 'text', required: true },
      { name: 'origine', label: 'Origine / Coopérative', type: 'text', required: true },
      { name: 'campagne', label: 'Campagne', type: 'text', required: true },
      { name: 'date_analyse', label: 'Date d\'analyse', type: 'date', required: true },
      { name: 'taux_humidite', label: 'Taux d\'humidité (%)', type: 'text', required: false },
      { name: 'taux_defauts', label: 'Taux de défauts (%)', type: 'text', required: false },
      { name: 'indice_fermentation', label: 'Indice de fermentation (%)', type: 'text', required: false },
      { name: 'grade', label: 'Grade attribué', type: 'text', required: false },
      { name: 'observations', label: 'Observations / Recommandations', type: 'textarea', required: false },
      { name: 'analyste', label: 'Analyste / Responsable', type: 'text', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<div style="background:#3e2723;color:white;padding:15px;border-radius:6px 6px 0 0;">
<h1 style="margin:0;font-size:20px;">RAPPORT DE CONTROLE QUALITE — CACAO</h1>
<p style="margin:5px 0 0;font-size:13px;">Réf. : {{ref_echantillon}} | Campagne : {{campagne}}</p>
</div>
<table style="width:100%;border-collapse:collapse;margin:0 0 15px 0;border:1px solid #eee;">
<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;width:40%;">Origine / Coopérative</td><td style="padding:8px;border-bottom:1px solid #eee;">{{origine}}</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Date d'analyse</td><td style="padding:8px;border-bottom:1px solid #eee;">{{date_analyse}}</td></tr>
</table>
<h3 style="color:#3e2723;">Résultats analytiques</h3>
<table style="width:100%;border-collapse:collapse;margin:10px 0;">
<tr style="background:#4e342e;color:white;"><th style="padding:9px;text-align:left;">Paramètre</th><th style="padding:9px;text-align:right;">Valeur</th><th style="padding:9px;text-align:right;">Norme</th></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;">Taux d'humidité</td><td style="padding:7px;text-align:right;border-bottom:1px solid #eee;">{{taux_humidite}} %</td><td style="padding:7px;text-align:right;border-bottom:1px solid #eee;">≤ 8 %</td></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;">Taux de défauts</td><td style="padding:7px;text-align:right;border-bottom:1px solid #eee;">{{taux_defauts}} %</td><td style="padding:7px;text-align:right;border-bottom:1px solid #eee;">≤ 5 %</td></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;">Indice de fermentation</td><td style="padding:7px;text-align:right;border-bottom:1px solid #eee;">{{indice_fermentation}} %</td><td style="padding:7px;text-align:right;border-bottom:1px solid #eee;">≥ 75 %</td></tr>
<tr style="background:#fff9c4;font-weight:bold;"><td style="padding:8px;">Grade attribué</td><td colspan="2" style="padding:8px;text-align:right;">{{grade}}</td></tr>
</table>
<div style="background:#efebe9;padding:11px;border-radius:4px;"><strong>Observations :</strong> {{observations}}</div>
<p style="margin-top:15px;"><strong>Analyste :</strong> {{analyste}} &nbsp;&nbsp; Signature : _______________</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 68,
  },

  {
    code: 'agro2_contrat_culture_contrat',
    name: 'Contrat culture sous contrat',
    category: 'juridique_admin',
    description: 'Contrat de production sous contrat (contract farming) entre agro-industrie et agriculteur',
    price: 1000, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'agro_industrie', label: 'Société agro-industrielle', type: 'text', required: true },
      { name: 'agriculteur', label: 'Agriculteur / Groupement', type: 'text', required: true },
      { name: 'culture', label: 'Culture concernée', type: 'text', required: true },
      { name: 'superficie_ha', label: 'Superficie (ha)', type: 'text', required: true },
      { name: 'intrants_fournis', label: 'Intrants fournis par l\'entreprise', type: 'textarea', required: false },
      { name: 'prix_garanti', label: 'Prix d\'achat garanti (FCFA/kg)', type: 'text', required: true },
      { name: 'quantite_minimale', label: 'Quantité minimale à livrer (kg)', type: 'text', required: true },
      { name: 'normes_qualite', label: 'Normes de qualité requises', type: 'textarea', required: false },
      { name: 'duree_contrat', label: 'Durée du contrat (saisons)', type: 'text', required: true },
      { name: 'sanctions', label: 'Pénalités en cas de non-respect', type: 'textarea', required: false },
      { name: 'date_signature', label: 'Date de signature', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1a237e;border-bottom:3px solid #3949ab;padding-bottom:10px;text-align:center;">CONTRAT DE CULTURE SOUS CONTRAT</h1>
<p style="text-align:center;color:#555;">(Contract Farming)</p>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#1a237e;color:white;"><th style="padding:9px;text-align:left;">Partie</th><th style="padding:9px;text-align:left;">Identité</th></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;font-weight:bold;">Agro-industrie</td><td style="padding:7px;border-bottom:1px solid #eee;">{{agro_industrie}}</td></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;font-weight:bold;">Agriculteur / Groupement</td><td style="padding:7px;border-bottom:1px solid #eee;">{{agriculteur}}</td></tr>
</table>
<h3 style="color:#1a237e;">Termes du contrat</h3>
<table style="width:100%;border-collapse:collapse;margin:10px 0;">
<tr style="background:#e8eaf6;"><th style="padding:8px;text-align:left;">Paramètre</th><th style="padding:8px;text-align:left;">Valeur</th></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;">Culture</td><td style="padding:7px;border-bottom:1px solid #eee;">{{culture}}</td></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;">Superficie</td><td style="padding:7px;border-bottom:1px solid #eee;">{{superficie_ha}} ha</td></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;">Prix garanti</td><td style="padding:7px;border-bottom:1px solid #eee;">{{prix_garanti}} FCFA/kg</td></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;">Quantité minimale</td><td style="padding:7px;border-bottom:1px solid #eee;">{{quantite_minimale}} kg</td></tr>
<tr style="background:#fff9c4;font-weight:bold;"><td style="padding:8px;">Durée</td><td style="padding:8px;">{{duree_contrat}} saison(s)</td></tr>
</table>
<div style="background:#e8eaf6;padding:11px;border-radius:4px;margin:10px 0;"><strong>Intrants fournis :</strong><br/>{{intrants_fournis}}</div>
<div style="background:#fce4ec;padding:11px;border-radius:4px;margin:10px 0;"><strong>Pénalités :</strong><br/>{{sanctions}}</div>
<p>Fait le {{date_signature}}.</p>
<div style="display:flex;justify-content:space-between;margin-top:25px;">
<div><strong>L'Agro-industrie</strong><br/>{{agro_industrie}}<br/><br/>Signature : _______________</div>
<div><strong>L'Agriculteur</strong><br/>{{agriculteur}}<br/><br/>Signature : _______________</div>
</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 75,
  },

  {
    code: 'agro2_devis_equipement_agricole',
    name: 'Devis équipement agricole',
    category: 'commercial_financier',
    description: 'Devis de fourniture d\'équipements et matériels agricoles',
    price: 400, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'num_devis', label: 'Numéro de devis', type: 'text', required: true },
      { name: 'fournisseur', label: 'Fournisseur', type: 'text', required: true },
      { name: 'client', label: 'Client / Agriculteur', type: 'text', required: true },
      { name: 'date_devis', label: 'Date du devis', type: 'date', required: true },
      { name: 'validite', label: 'Validité du devis (jours)', type: 'text', required: false },
      { name: 'equipement1', label: 'Équipement 1', type: 'text', required: false },
      { name: 'qte1', label: 'Quantité 1', type: 'text', required: false },
      { name: 'pu1', label: 'Prix unitaire 1 (FCFA)', type: 'text', required: false },
      { name: 'equipement2', label: 'Équipement 2', type: 'text', required: false },
      { name: 'qte2', label: 'Quantité 2', type: 'text', required: false },
      { name: 'pu2', label: 'Prix unitaire 2 (FCFA)', type: 'text', required: false },
      { name: 'total_ht', label: 'Total HT (FCFA)', type: 'text', required: true },
      { name: 'tva', label: 'TVA (FCFA)', type: 'text', required: false },
      { name: 'total_ttc', label: 'Total TTC (FCFA)', type: 'text', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<div style="display:flex;justify-content:space-between;border-bottom:3px solid #f9a825;padding-bottom:10px;">
<div><h1 style="color:#f57f17;margin:0;">DEVIS ÉQUIPEMENT AGRICOLE</h1><p style="margin:4px 0;color:#555;">N° {{num_devis}} — {{date_devis}}</p></div>
<div style="text-align:right;font-size:13px;color:#555;">Validité : {{validite}} jours</div>
</div>
<table style="width:100%;border-collapse:collapse;margin:12px 0;">
<tr style="background:#f57f17;color:white;"><th style="padding:8px;text-align:left;">Fournisseur</th><th style="padding:8px;text-align:left;">Client</th></tr>
<tr><td style="padding:8px;border:1px solid #eee;">{{fournisseur}}</td><td style="padding:8px;border:1px solid #eee;">{{client}}</td></tr>
</table>
<table style="width:100%;border-collapse:collapse;margin:12px 0;">
<tr style="background:#fff8e1;"><th style="padding:8px;text-align:left;">Équipement</th><th style="padding:8px;text-align:right;">Qté</th><th style="padding:8px;text-align:right;">P.U. (FCFA)</th><th style="padding:8px;text-align:right;">Montant</th></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;">{{equipement1}}</td><td style="padding:7px;text-align:right;border-bottom:1px solid #eee;">{{qte1}}</td><td style="padding:7px;text-align:right;border-bottom:1px solid #eee;">{{pu1}}</td><td style="padding:7px;text-align:right;border-bottom:1px solid #eee;"></td></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;">{{equipement2}}</td><td style="padding:7px;text-align:right;border-bottom:1px solid #eee;">{{qte2}}</td><td style="padding:7px;text-align:right;border-bottom:1px solid #eee;">{{pu2}}</td><td style="padding:7px;text-align:right;border-bottom:1px solid #eee;"></td></tr>
<tr><td colspan="3" style="padding:7px;text-align:right;border-bottom:1px solid #eee;">Total HT</td><td style="padding:7px;text-align:right;border-bottom:1px solid #eee;">{{total_ht}}</td></tr>
<tr><td colspan="3" style="padding:7px;text-align:right;border-bottom:1px solid #eee;">TVA</td><td style="padding:7px;text-align:right;border-bottom:1px solid #eee;">{{tva}}</td></tr>
<tr style="background:#fff9c4;font-weight:bold;"><td colspan="3" style="padding:8px;text-align:right;">TOTAL TTC</td><td style="padding:8px;text-align:right;">{{total_ttc}} FCFA</td></tr>
</table>
<p style="color:#888;font-size:12px;margin-top:15px;">Cachet et signature du fournisseur : _________________________</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 55,
  },

  {
    code: 'agro2_convention_cooperative',
    name: 'Convention coopérative agricole',
    category: 'juridique_admin',
    description: "Convention de partenariat entre une coopérative agricole et un partenaire technique ou financier",
    price: 800, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_cooperative', label: 'Nom de la coopérative', type: 'text', required: true },
      { name: 'partenaire', label: 'Partenaire technique / financier', type: 'text', required: true },
      { name: 'objet_convention', label: 'Objet de la convention', type: 'text', required: true },
      { name: 'apports_cooperative', label: 'Apports de la coopérative', type: 'textarea', required: true },
      { name: 'apports_partenaire', label: 'Apports du partenaire', type: 'textarea', required: true },
      { name: 'duree', label: 'Durée de la convention', type: 'text', required: true },
      { name: 'zone_intervention', label: 'Zone d\'intervention', type: 'text', required: false },
      { name: 'indicateurs_suivi', label: 'Indicateurs de suivi', type: 'textarea', required: false },
      { name: 'date_signature', label: 'Date de signature', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#00695c;border-bottom:3px solid #00897b;padding-bottom:10px;text-align:center;">CONVENTION DE PARTENARIAT</h1>
<h2 style="color:#00897b;text-align:center;font-size:15px;margin-top:5px;">Coopérative Agricole</h2>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#00695c;color:white;"><th style="padding:9px;text-align:left;">Partie</th><th style="padding:9px;text-align:left;">Identité</th></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;font-weight:bold;">La Coopérative</td><td style="padding:7px;border-bottom:1px solid #eee;">{{nom_cooperative}}</td></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;font-weight:bold;">Le Partenaire</td><td style="padding:7px;border-bottom:1px solid #eee;">{{partenaire}}</td></tr>
</table>
<p><strong>Objet :</strong> {{objet_convention}}</p>
<p><strong>Durée :</strong> {{duree}} &nbsp;|&nbsp; <strong>Zone :</strong> {{zone_intervention}}</p>
<div style="display:flex;gap:12px;margin:15px 0;">
<div style="flex:1;background:#e0f2f1;padding:11px;border-radius:4px;"><strong>Apports de la coopérative :</strong><br/>{{apports_cooperative}}</div>
<div style="flex:1;background:#e8f5e9;padding:11px;border-radius:4px;"><strong>Apports du partenaire :</strong><br/>{{apports_partenaire}}</div>
</div>
<div style="background:#f0f4f8;padding:11px;border-radius:4px;"><strong>Indicateurs de suivi :</strong><br/>{{indicateurs_suivi}}</div>
<p style="margin-top:20px;">Fait le {{date_signature}}.</p>
<div style="display:flex;justify-content:space-between;margin-top:25px;">
<div><strong>La Coopérative</strong><br/>{{nom_cooperative}}<br/><br/>Signature : _______________</div>
<div><strong>Le Partenaire</strong><br/>{{partenaire}}<br/><br/>Signature : _______________</div>
</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 60,
  },

  {
    code: 'agro2_fiche_technique_mais',
    name: 'Fiche technique culture maïs',
    category: 'gestion_projet',
    description: 'Fiche technique de conduite de la culture du maïs en Afrique subsaharienne',
    price: 300, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'region', label: 'Région / Zone agroécologique', type: 'text', required: true },
      { name: 'variete', label: 'Variété recommandée', type: 'text', required: true },
      { name: 'periode_semis', label: 'Période de semis', type: 'text', required: true },
      { name: 'densite_semis', label: 'Densité de semis (plants/ha)', type: 'text', required: false },
      { name: 'fertilisation', label: 'Programme de fertilisation', type: 'textarea', required: false },
      { name: 'traitements', label: 'Traitements phytosanitaires', type: 'textarea', required: false },
      { name: 'rendement_attendu', label: 'Rendement attendu (t/ha)', type: 'text', required: false },
      { name: 'cout_production', label: 'Coût de production estimé (FCFA/ha)', type: 'text', required: false },
      { name: 'conseiller', label: 'Conseiller agricole', type: 'text', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<div style="background:#33691e;color:white;padding:15px;border-radius:6px 6px 0 0;">
<h1 style="margin:0;font-size:20px;">FICHE TECHNIQUE — CULTURE DU MAÏS</h1>
<p style="margin:4px 0 0;font-size:13px;">Zone : {{region}}</p>
</div>
<table style="width:100%;border-collapse:collapse;border:1px solid #eee;margin:0 0 15px;">
<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;width:40%;">Variété recommandée</td><td style="padding:8px;border-bottom:1px solid #eee;">{{variete}}</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Période de semis</td><td style="padding:8px;border-bottom:1px solid #eee;">{{periode_semis}}</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Densité de semis</td><td style="padding:8px;border-bottom:1px solid #eee;">{{densite_semis}} plants/ha</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Rendement attendu</td><td style="padding:8px;border-bottom:1px solid #eee;">{{rendement_attendu}} t/ha</td></tr>
<tr style="background:#f9fbe7;"><td style="padding:8px;font-weight:bold;">Coût de production</td><td style="padding:8px;">{{cout_production}} FCFA/ha</td></tr>
</table>
<div style="background:#f1f8e9;padding:11px;border-radius:4px;margin:10px 0;"><strong>Programme de fertilisation :</strong><br/>{{fertilisation}}</div>
<div style="background:#fff8e1;padding:11px;border-radius:4px;margin:10px 0;"><strong>Traitements phytosanitaires :</strong><br/>{{traitements}}</div>
<p style="color:#555;margin-top:15px;"><strong>Conseiller agricole :</strong> {{conseiller}}</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 72,
  },

  {
    code: 'agro2_bon_commande_intrants',
    name: 'Bon de commande intrants',
    category: 'commercial_financier',
    description: 'Bon de commande d\'intrants agricoles (semences, engrais, pesticides)',
    price: 350, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'num_commande', label: 'Numéro de commande', type: 'text', required: true },
      { name: 'acheteur', label: 'Acheteur / Coopérative', type: 'text', required: true },
      { name: 'fournisseur', label: 'Fournisseur d\'intrants', type: 'text', required: true },
      { name: 'date_commande', label: 'Date de commande', type: 'date', required: true },
      { name: 'intrant1', label: 'Intrant 1 (nom)', type: 'text', required: false },
      { name: 'qte1', label: 'Quantité 1', type: 'text', required: false },
      { name: 'pu1', label: 'Prix unitaire 1 (FCFA)', type: 'text', required: false },
      { name: 'intrant2', label: 'Intrant 2 (nom)', type: 'text', required: false },
      { name: 'qte2', label: 'Quantité 2', type: 'text', required: false },
      { name: 'pu2', label: 'Prix unitaire 2 (FCFA)', type: 'text', required: false },
      { name: 'montant_total', label: 'Montant total (FCFA)', type: 'text', required: true },
      { name: 'date_livraison_souhaitee', label: 'Date de livraison souhaitée', type: 'date', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<div style="display:flex;justify-content:space-between;border-bottom:3px solid #8bc34a;padding-bottom:10px;">
<h1 style="color:#558b2f;margin:0;">BON DE COMMANDE INTRANTS</h1>
<span style="color:#555;font-size:13px;">N° {{num_commande}} — {{date_commande}}</span>
</div>
<table style="width:100%;border-collapse:collapse;margin:12px 0;">
<tr style="background:#558b2f;color:white;"><th style="padding:8px;text-align:left;">Acheteur</th><th style="padding:8px;text-align:left;">Fournisseur</th></tr>
<tr><td style="padding:8px;border:1px solid #eee;">{{acheteur}}</td><td style="padding:8px;border:1px solid #eee;">{{fournisseur}}</td></tr>
</table>
<table style="width:100%;border-collapse:collapse;margin:12px 0;">
<tr style="background:#dcedc8;"><th style="padding:8px;text-align:left;">Intrant</th><th style="padding:8px;text-align:right;">Qté</th><th style="padding:8px;text-align:right;">P.U. (FCFA)</th><th style="padding:8px;text-align:right;">Montant</th></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;">{{intrant1}}</td><td style="padding:7px;text-align:right;border-bottom:1px solid #eee;">{{qte1}}</td><td style="padding:7px;text-align:right;border-bottom:1px solid #eee;">{{pu1}}</td><td style="padding:7px;text-align:right;border-bottom:1px solid #eee;"></td></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;">{{intrant2}}</td><td style="padding:7px;text-align:right;border-bottom:1px solid #eee;">{{qte2}}</td><td style="padding:7px;text-align:right;border-bottom:1px solid #eee;">{{pu2}}</td><td style="padding:7px;text-align:right;border-bottom:1px solid #eee;"></td></tr>
<tr style="background:#fff9c4;font-weight:bold;"><td colspan="3" style="padding:8px;">TOTAL</td><td style="padding:8px;text-align:right;">{{montant_total}} FCFA</td></tr>
</table>
<p><strong>Livraison souhaitée :</strong> {{date_livraison_souhaitee}}</p>
<p style="color:#888;font-size:12px;">Signature acheteur : _______________</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 63,
  },

  {
    code: 'agro2_rapport_phytosanitaire',
    name: 'Rapport phytosanitaire',
    category: 'gestion_projet',
    description: 'Rapport de visite et d\'inspection phytosanitaire d\'une exploitation agricole',
    price: 600, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'inspecteur', label: 'Nom de l\'inspecteur', type: 'text', required: true },
      { name: 'exploitation', label: 'Exploitation visitée', type: 'text', required: true },
      { name: 'date_visite', label: 'Date de visite', type: 'date', required: true },
      { name: 'culture_inspectee', label: 'Culture inspectée', type: 'text', required: true },
      { name: 'superficie_ha', label: 'Superficie (ha)', type: 'text', required: false },
      { name: 'ravageurs_detectes', label: 'Ravageurs / maladies détectés', type: 'textarea', required: false },
      { name: 'taux_infestation', label: 'Taux d\'infestation estimé (%)', type: 'text', required: false },
      { name: 'traitements_recommandes', label: 'Traitements recommandés', type: 'textarea', required: false },
      { name: 'delai_traitement', label: 'Délai d\'intervention recommandé', type: 'text', required: false },
      { name: 'conclusion', label: 'Conclusion générale', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1b5e20;border-bottom:3px solid #2e7d32;padding-bottom:10px;">RAPPORT D'INSPECTION PHYTOSANITAIRE</h1>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#1b5e20;color:white;"><th colspan="2" style="padding:9px;text-align:left;">Informations de la visite</th></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;font-weight:bold;width:40%;">Inspecteur</td><td style="padding:7px;border-bottom:1px solid #eee;">{{inspecteur}}</td></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;font-weight:bold;">Exploitation</td><td style="padding:7px;border-bottom:1px solid #eee;">{{exploitation}}</td></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;font-weight:bold;">Date de visite</td><td style="padding:7px;border-bottom:1px solid #eee;">{{date_visite}}</td></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;font-weight:bold;">Culture inspectée</td><td style="padding:7px;border-bottom:1px solid #eee;">{{culture_inspectee}}</td></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;font-weight:bold;">Superficie</td><td style="padding:7px;border-bottom:1px solid #eee;">{{superficie_ha}} ha</td></tr>
<tr style="background:#ffebee;"><td style="padding:7px;font-weight:bold;">Taux d'infestation</td><td style="padding:7px;">{{taux_infestation}} %</td></tr>
</table>
<div style="background:#fce4ec;padding:11px;border-radius:4px;margin:10px 0;"><strong>Ravageurs / maladies détectés :</strong><br/>{{ravageurs_detectes}}</div>
<div style="background:#e8f5e9;padding:11px;border-radius:4px;margin:10px 0;"><strong>Traitements recommandés :</strong><br/>{{traitements_recommandes}}</div>
<p><strong>Délai d'intervention :</strong> {{delai_traitement}}</p>
<div style="background:#f0f4f8;padding:11px;border-radius:4px;"><strong>Conclusion :</strong> {{conclusion}}</div>
<p style="margin-top:20px;">Signature de l'inspecteur : _______________</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 58,
  },

  {
    code: 'agro2_plan_affaires_exploitation',
    name: "Plan d'affaires exploitation",
    category: 'gestion_projet',
    description: "Plan d'affaires pour une exploitation agro-industrielle (accès financement, partenariat)",
    price: 1000, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_exploitation', label: "Nom de l'exploitation", type: 'text', required: true },
      { name: 'promoteur', label: 'Promoteur / Gérant', type: 'text', required: true },
      { name: 'localisation', label: 'Localisation', type: 'text', required: true },
      { name: 'activite_principale', label: 'Activité principale', type: 'text', required: true },
      { name: 'superficie_totale', label: 'Superficie totale (ha)', type: 'text', required: false },
      { name: 'investissement_total', label: 'Investissement total (FCFA)', type: 'text', required: true },
      { name: 'financement_propre', label: 'Financement propre (FCFA)', type: 'text', required: false },
      { name: 'credit_sollicite', label: 'Crédit sollicité (FCFA)', type: 'text', required: false },
      { name: 'chiffre_affaires_annuel', label: 'CA annuel prévisionnel (FCFA)', type: 'text', required: false },
      { name: 'benefice_net', label: 'Bénéfice net prévisionnel (FCFA)', type: 'text', required: false },
      { name: 'points_forts', label: 'Points forts du projet', type: 'textarea', required: false },
      { name: 'risques', label: 'Risques et mesures d\'atténuation', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#004d40;border-bottom:3px solid #00695c;padding-bottom:10px;">PLAN D'AFFAIRES — EXPLOITATION AGRO-INDUSTRIELLE</h1>
<h2 style="color:#00695c;margin-top:5px;">{{nom_exploitation}}</h2>
<p><strong>Promoteur :</strong> {{promoteur}} &nbsp;|&nbsp; <strong>Localisation :</strong> {{localisation}}</p>
<p><strong>Activité principale :</strong> {{activite_principale}} &nbsp;|&nbsp; <strong>Superficie :</strong> {{superficie_totale}} ha</p>
<h3 style="color:#004d40;">Plan financier</h3>
<table style="width:100%;border-collapse:collapse;margin:10px 0;">
<tr style="background:#004d40;color:white;"><th style="padding:9px;text-align:left;">Indicateur</th><th style="padding:9px;text-align:right;">Montant (FCFA)</th></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;">Investissement total</td><td style="padding:7px;text-align:right;border-bottom:1px solid #eee;">{{investissement_total}}</td></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;">Financement propre</td><td style="padding:7px;text-align:right;border-bottom:1px solid #eee;">{{financement_propre}}</td></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;">Crédit sollicité</td><td style="padding:7px;text-align:right;border-bottom:1px solid #eee;">{{credit_sollicite}}</td></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;">CA annuel prévisionnel</td><td style="padding:7px;text-align:right;border-bottom:1px solid #eee;">{{chiffre_affaires_annuel}}</td></tr>
<tr style="background:#e0f2f1;font-weight:bold;"><td style="padding:8px;">Bénéfice net prévisionnel</td><td style="padding:8px;text-align:right;">{{benefice_net}}</td></tr>
</table>
<div style="background:#e0f2f1;padding:11px;border-radius:4px;margin:10px 0;"><strong>Points forts :</strong><br/>{{points_forts}}</div>
<div style="background:#fce4ec;padding:11px;border-radius:4px;"><strong>Risques et mesures :</strong><br/>{{risques}}</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 80,
  },

  {
    code: 'agro2_contrat_transport_produits_frais',
    name: 'Contrat transport produits frais',
    category: 'juridique_admin',
    description: 'Contrat de transport de produits agricoles périssables (fruits, légumes, produits laitiers)',
    price: 600, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'expediteur', label: 'Expéditeur', type: 'text', required: true },
      { name: 'transporteur', label: 'Transporteur', type: 'text', required: true },
      { name: 'destinataire', label: 'Destinataire', type: 'text', required: true },
      { name: 'produit', label: 'Produit à transporter', type: 'text', required: true },
      { name: 'quantite', label: 'Quantité (kg / cartons)', type: 'text', required: true },
      { name: 'lieu_chargement', label: 'Lieu de chargement', type: 'text', required: true },
      { name: 'lieu_livraison', label: 'Lieu de livraison', type: 'text', required: true },
      { name: 'date_chargement', label: 'Date de chargement', type: 'date', required: true },
      { name: 'temperature_requise', label: 'Température de transport requise (°C)', type: 'text', required: false },
      { name: 'prix_transport', label: 'Prix du transport (FCFA)', type: 'text', required: true },
      { name: 'responsabilites', label: 'Responsabilités en cas de dommage', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#0277bd;border-bottom:3px solid #0288d1;padding-bottom:10px;">CONTRAT DE TRANSPORT — PRODUITS FRAIS</h1>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#0277bd;color:white;"><th style="padding:9px;text-align:left;">Partie</th><th style="padding:9px;text-align:left;">Identité</th></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;font-weight:bold;">Expéditeur</td><td style="padding:7px;border-bottom:1px solid #eee;">{{expediteur}}</td></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;font-weight:bold;">Transporteur</td><td style="padding:7px;border-bottom:1px solid #eee;">{{transporteur}}</td></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;font-weight:bold;">Destinataire</td><td style="padding:7px;border-bottom:1px solid #eee;">{{destinataire}}</td></tr>
</table>
<table style="width:100%;border-collapse:collapse;margin:10px 0;">
<tr style="background:#e1f5fe;"><th style="padding:8px;text-align:left;">Marchandise</th><th style="padding:8px;text-align:left;">Détail</th></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;">Produit</td><td style="padding:7px;border-bottom:1px solid #eee;">{{produit}}</td></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;">Quantité</td><td style="padding:7px;border-bottom:1px solid #eee;">{{quantite}}</td></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;">Chargement</td><td style="padding:7px;border-bottom:1px solid #eee;">{{lieu_chargement}} — {{date_chargement}}</td></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;">Livraison</td><td style="padding:7px;border-bottom:1px solid #eee;">{{lieu_livraison}}</td></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;">Température requise</td><td style="padding:7px;border-bottom:1px solid #eee;">{{temperature_requise}} °C</td></tr>
<tr style="background:#fff9c4;font-weight:bold;"><td style="padding:8px;">Prix du transport</td><td style="padding:8px;">{{prix_transport}} FCFA</td></tr>
</table>
<div style="background:#f0f4f8;padding:11px;border-radius:4px;"><strong>Responsabilités :</strong> {{responsabilites}}</div>
<div style="display:flex;justify-content:space-between;margin-top:25px;">
<div><strong>L'Expéditeur</strong><br/><br/>Signature : _______________</div>
<div><strong>Le Transporteur</strong><br/><br/>Signature : _______________</div>
</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 62,
  },

  {
    code: 'agro2_accord_certification_bio',
    name: 'Accord certification bio',
    category: 'juridique_admin',
    description: "Accord d'engagement pour la certification biologique d'une exploitation agricole",
    price: 850, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'operateur', label: 'Opérateur / Exploitation', type: 'text', required: true },
      { name: 'organisme_certif', label: 'Organisme de certification', type: 'text', required: true },
      { name: 'produits_certif', label: 'Produits soumis à certification', type: 'text', required: true },
      { name: 'superficie_ha', label: 'Superficie concernée (ha)', type: 'text', required: false },
      { name: 'date_debut_conversion', label: 'Date de début de conversion', type: 'date', required: true },
      { name: 'duree_conversion', label: 'Durée de conversion (années)', type: 'text', required: false },
      { name: 'pratiques_interdites', label: 'Pratiques interdites (intrants…)', type: 'textarea', required: false },
      { name: 'obligations_operateur', label: 'Obligations de l\'opérateur', type: 'textarea', required: false },
      { name: 'frais_certification', label: 'Frais de certification annuels (FCFA)', type: 'text', required: false },
      { name: 'date_signature', label: 'Date de signature', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<div style="background:#1b5e20;color:white;padding:15px;border-radius:6px 6px 0 0;text-align:center;">
<h1 style="margin:0;font-size:20px;">ACCORD DE CERTIFICATION BIOLOGIQUE</h1>
</div>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#e8f5e9;"><th style="padding:9px;text-align:left;">Paramètre</th><th style="padding:9px;text-align:left;">Valeur</th></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;font-weight:bold;">Opérateur</td><td style="padding:7px;border-bottom:1px solid #eee;">{{operateur}}</td></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;font-weight:bold;">Organisme de certification</td><td style="padding:7px;border-bottom:1px solid #eee;">{{organisme_certif}}</td></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;font-weight:bold;">Produits concernés</td><td style="padding:7px;border-bottom:1px solid #eee;">{{produits_certif}}</td></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;font-weight:bold;">Superficie</td><td style="padding:7px;border-bottom:1px solid #eee;">{{superficie_ha}} ha</td></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;font-weight:bold;">Début de conversion</td><td style="padding:7px;border-bottom:1px solid #eee;">{{date_debut_conversion}}</td></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;font-weight:bold;">Durée de conversion</td><td style="padding:7px;border-bottom:1px solid #eee;">{{duree_conversion}} ans</td></tr>
<tr style="background:#fff9c4;"><td style="padding:8px;font-weight:bold;">Frais de certification</td><td style="padding:8px;">{{frais_certification}} FCFA/an</td></tr>
</table>
<div style="background:#fce4ec;padding:11px;border-radius:4px;margin:10px 0;"><strong>Pratiques interdites :</strong><br/>{{pratiques_interdites}}</div>
<div style="background:#e8f5e9;padding:11px;border-radius:4px;"><strong>Obligations de l'opérateur :</strong><br/>{{obligations_operateur}}</div>
<p style="margin-top:20px;">Fait le {{date_signature}}.</p>
<div style="display:flex;justify-content:space-between;margin-top:25px;">
<div><strong>L'Opérateur</strong><br/>{{operateur}}<br/><br/>Signature : _______________</div>
<div><strong>L'Organisme certif.</strong><br/>{{organisme_certif}}<br/><br/>Signature : _______________</div>
</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 66,
  },

  {
    code: 'agro2_fiche_inventaire_stock',
    name: 'Fiche inventaire stock agricole',
    category: 'gestion_projet',
    description: 'Fiche d\'inventaire et de suivi des stocks agricoles (grains, intrants, matériels)',
    price: 300, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'site_stockage', label: 'Site de stockage', type: 'text', required: true },
      { name: 'responsable', label: 'Responsable du stock', type: 'text', required: true },
      { name: 'date_inventaire', label: 'Date d\'inventaire', type: 'date', required: true },
      { name: 'produit1', label: 'Produit 1', type: 'text', required: false },
      { name: 'stock_debut1', label: 'Stock début période 1 (kg)', type: 'text', required: false },
      { name: 'entrees1', label: 'Entrées 1 (kg)', type: 'text', required: false },
      { name: 'sorties1', label: 'Sorties 1 (kg)', type: 'text', required: false },
      { name: 'stock_fin1', label: 'Stock fin 1 (kg)', type: 'text', required: false },
      { name: 'produit2', label: 'Produit 2', type: 'text', required: false },
      { name: 'stock_debut2', label: 'Stock début 2 (kg)', type: 'text', required: false },
      { name: 'entrees2', label: 'Entrées 2 (kg)', type: 'text', required: false },
      { name: 'sorties2', label: 'Sorties 2 (kg)', type: 'text', required: false },
      { name: 'stock_fin2', label: 'Stock fin 2 (kg)', type: 'text', required: false },
      { name: 'observations', label: 'Observations / anomalies', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#4527a0;border-bottom:3px solid #5e35b1;padding-bottom:10px;">FICHE D'INVENTAIRE STOCK AGRICOLE</h1>
<p><strong>Site :</strong> {{site_stockage}} &nbsp;|&nbsp; <strong>Responsable :</strong> {{responsable}} &nbsp;|&nbsp; <strong>Date :</strong> {{date_inventaire}}</p>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#4527a0;color:white;"><th style="padding:8px;text-align:left;">Produit</th><th style="padding:8px;text-align:right;">Stock début</th><th style="padding:8px;text-align:right;">Entrées</th><th style="padding:8px;text-align:right;">Sorties</th><th style="padding:8px;text-align:right;">Stock fin</th></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;">{{produit1}}</td><td style="padding:7px;text-align:right;border-bottom:1px solid #eee;">{{stock_debut1}}</td><td style="padding:7px;text-align:right;border-bottom:1px solid #eee;">{{entrees1}}</td><td style="padding:7px;text-align:right;border-bottom:1px solid #eee;">{{sorties1}}</td><td style="padding:7px;text-align:right;border-bottom:1px solid #eee;font-weight:bold;">{{stock_fin1}}</td></tr>
<tr style="background:#ede7f6;"><td style="padding:7px;border-bottom:1px solid #eee;">{{produit2}}</td><td style="padding:7px;text-align:right;border-bottom:1px solid #eee;">{{stock_debut2}}</td><td style="padding:7px;text-align:right;border-bottom:1px solid #eee;">{{entrees2}}</td><td style="padding:7px;text-align:right;border-bottom:1px solid #eee;">{{sorties2}}</td><td style="padding:7px;text-align:right;border-bottom:1px solid #eee;font-weight:bold;">{{stock_fin2}}</td></tr>
</table>
<div style="background:#f0f4f8;padding:11px;border-radius:4px;"><strong>Observations / anomalies :</strong><br/>{{observations}}</div>
<p style="margin-top:20px;">Signature du responsable : _______________</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 57,
  },

  {
    code: 'agro2_contrat_fermage',
    name: 'Contrat fermage',
    category: 'juridique_admin',
    description: 'Contrat de fermage de terres agricoles entre propriétaire et exploitant',
    price: 750, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'bailleur', label: 'Bailleur (propriétaire)', type: 'text', required: true },
      { name: 'preneur', label: 'Preneur (fermier)', type: 'text', required: true },
      { name: 'localisation_terres', label: 'Localisation des terres', type: 'text', required: true },
      { name: 'superficie_ha', label: 'Superficie (ha)', type: 'text', required: true },
      { name: 'description_parcelle', label: 'Description de la parcelle', type: 'textarea', required: false },
      { name: 'duree_contrat', label: 'Durée du contrat (années)', type: 'text', required: true },
      { name: 'date_prise_effet', label: 'Date de prise d\'effet', type: 'date', required: true },
      { name: 'fermage_annuel', label: 'Fermage annuel (FCFA)', type: 'text', required: true },
      { name: 'modalites_paiement', label: 'Modalités de paiement', type: 'textarea', required: true },
      { name: 'obligations_preneur', label: 'Obligations du preneur', type: 'textarea', required: false },
      { name: 'lieu_signature', label: 'Lieu de signature', type: 'text', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#37474f;border-bottom:3px solid #546e7a;padding-bottom:10px;text-align:center;">CONTRAT DE FERMAGE</h1>
<p>Entre <strong>{{bailleur}}</strong> (le bailleur) et <strong>{{preneur}}</strong> (le preneur à ferme), il est convenu :</p>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#37474f;color:white;"><th style="padding:9px;text-align:left;">Paramètre</th><th style="padding:9px;text-align:left;">Valeur</th></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;">Localisation</td><td style="padding:7px;border-bottom:1px solid #eee;">{{localisation_terres}}</td></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;">Superficie</td><td style="padding:7px;border-bottom:1px solid #eee;">{{superficie_ha}} ha</td></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;">Durée du contrat</td><td style="padding:7px;border-bottom:1px solid #eee;">{{duree_contrat}} ans — à compter du {{date_prise_effet}}</td></tr>
<tr style="background:#fff9c4;font-weight:bold;"><td style="padding:8px;">Fermage annuel</td><td style="padding:8px;">{{fermage_annuel}} FCFA</td></tr>
</table>
<div style="background:#eceff1;padding:11px;border-radius:4px;margin:10px 0;"><strong>Description parcelle :</strong> {{description_parcelle}}</div>
<div style="background:#f0f4f8;padding:11px;border-radius:4px;margin:10px 0;"><strong>Modalités de paiement :</strong> {{modalites_paiement}}</div>
<div style="background:#e8f5e9;padding:11px;border-radius:4px;"><strong>Obligations du preneur :</strong> {{obligations_preneur}}</div>
<p style="margin-top:20px;">Fait à {{lieu_signature}}.</p>
<div style="display:flex;justify-content:space-between;margin-top:25px;">
<div><strong>Le Bailleur</strong><br/>{{bailleur}}<br/><br/>Signature : _______________</div>
<div><strong>Le Preneur</strong><br/>{{preneur}}<br/><br/>Signature : _______________</div>
</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 65,
  },

  {
    code: 'agro2_bilan_campagne_agricole',
    name: 'Bilan campagne agricole',
    category: 'gestion_projet',
    description: 'Bilan de fin de campagne agricole (rendements, recettes, charges, résultat)',
    price: 600, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_exploitation', label: "Nom de l'exploitation", type: 'text', required: true },
      { name: 'campagne', label: 'Campagne agricole', type: 'text', required: true },
      { name: 'culture_principale', label: 'Culture principale', type: 'text', required: true },
      { name: 'superficie_emblavee', label: 'Superficie emblavée (ha)', type: 'text', required: true },
      { name: 'production_totale', label: 'Production totale (tonnes)', type: 'text', required: true },
      { name: 'rendement_ha', label: 'Rendement moyen (t/ha)', type: 'text', required: false },
      { name: 'prix_vente_moyen', label: 'Prix de vente moyen (FCFA/kg)', type: 'text', required: false },
      { name: 'recettes_totales', label: 'Recettes totales (FCFA)', type: 'text', required: true },
      { name: 'charges_totales', label: 'Charges totales (FCFA)', type: 'text', required: true },
      { name: 'resultat_net', label: 'Résultat net (FCFA)', type: 'text', required: true },
      { name: 'enseignements', label: 'Enseignements et recommandations', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1a3c5e;border-bottom:3px solid #2d6a9f;padding-bottom:10px;">BILAN DE CAMPAGNE AGRICOLE</h1>
<h2 style="color:#2d6a9f;margin-top:5px;">{{nom_exploitation}} — Campagne {{campagne}}</h2>
<p><strong>Culture principale :</strong> {{culture_principale}} &nbsp;|&nbsp; <strong>Superficie :</strong> {{superficie_emblavee}} ha</p>
<h3 style="color:#1a3c5e;">Résultats techniques</h3>
<table style="width:100%;border-collapse:collapse;margin:10px 0;">
<tr style="background:#1a3c5e;color:white;"><th style="padding:9px;text-align:left;">Indicateur</th><th style="padding:9px;text-align:right;">Valeur</th></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;">Production totale</td><td style="padding:7px;text-align:right;border-bottom:1px solid #eee;">{{production_totale}} t</td></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;">Rendement moyen</td><td style="padding:7px;text-align:right;border-bottom:1px solid #eee;">{{rendement_ha}} t/ha</td></tr>
<tr><td style="padding:7px;border-bottom:1px solid #eee;">Prix de vente moyen</td><td style="padding:7px;text-align:right;border-bottom:1px solid #eee;">{{prix_vente_moyen}} FCFA/kg</td></tr>
</table>
<h3 style="color:#1a3c5e;">Résultats financiers</h3>
<table style="width:100%;border-collapse:collapse;margin:10px 0;">
<tr style="background:#e3f2fd;"><th style="padding:8px;text-align:left;">Poste</th><th style="padding:8px;text-align:right;">Montant (FCFA)</th></tr>
<tr style="background:#e8f5e9;"><td style="padding:7px;border-bottom:1px solid #eee;">Recettes totales</td><td style="padding:7px;text-align:right;border-bottom:1px solid #eee;">{{recettes_totales}}</td></tr>
<tr style="background:#ffebee;"><td style="padding:7px;border-bottom:1px solid #eee;">Charges totales</td><td style="padding:7px;text-align:right;border-bottom:1px solid #eee;">{{charges_totales}}</td></tr>
<tr style="background:#fff9c4;font-weight:bold;"><td style="padding:8px;">Résultat net</td><td style="padding:8px;text-align:right;">{{resultat_net}}</td></tr>
</table>
<div style="background:#f0f4f8;padding:11px;border-radius:4px;"><strong>Enseignements et recommandations :</strong><br/>{{enseignements}}</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 73,
  },
];

async function main() {
  let created = 0, updated = 0;
  for (const t of templates) {
    const existing = await prisma.documentTemplate.findUnique({ where: { code: t.code } });
    if (existing) {
      await prisma.documentTemplate.update({ where: { code: t.code }, data: t });
      updated++;
    } else {
      await prisma.documentTemplate.create({ data: t });
      created++;
    }
  }
  const total = await prisma.documentTemplate.count();
  console.log(`✅ Seed Agro-Industrie terminé. Créés: ${created}, Mis à jour: ${updated} — Total BDD: ${total}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
