import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const COUNTRIES = JSON.stringify(['CI','SN','CM','BJ','TG','BF','ML','GN','CD','CG','GA','NE','TD','MR']);

const templates = [
  {
    code: 'intl_contrat_exportation_cedeao',
    name: "Contrat d'exportation CEDEAO",
    category: 'commercial_financier',
    description: "Contrat d'exportation de marchandises dans la zone CEDEAO",
    price: 1200, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'exportateur', label: 'Exportateur (nom & adresse)', type: 'text', required: true },
      { name: 'importateur', label: 'Importateur (nom & adresse)', type: 'text', required: true },
      { name: 'pays_destination', label: 'Pays de destination', type: 'text', required: true },
      { name: 'designation_marchandises', label: 'Désignation des marchandises', type: 'textarea', required: true },
      { name: 'quantite', label: 'Quantité / Volume', type: 'text', required: true },
      { name: 'prix_total', label: 'Prix total (FCFA)', type: 'text', required: true },
      { name: 'incoterm', label: 'Incoterm applicable (FOB, CIF, EXW…)', type: 'text', required: true },
      { name: 'delai_livraison', label: 'Délai de livraison', type: 'text', required: true },
      { name: 'mode_paiement', label: 'Mode de paiement', type: 'text', required: true },
      { name: 'date_contrat', label: 'Date du contrat', type: 'date', required: true },
      { name: 'lieu_signature', label: 'Lieu de signature', type: 'text', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;border:1px solid #ccc;">
<div style="text-align:center;margin-bottom:16px;"><h1 style="color:#0d47a1;font-size:18px;text-transform:uppercase;border-bottom:2px solid #1565c0;padding-bottom:8px;">CONTRAT D'EXPORTATION — ZONE CEDEAO</h1></div>
<p style="font-size:13px;color:#555;">Référence : CE-{{date_contrat}} &nbsp;|&nbsp; Incoterm : <strong>{{incoterm}}</strong></p>
<table style="width:100%;border-collapse:collapse;margin:12px 0;font-size:13px;">
<tr style="background:#0d47a1;color:white;"><th style="padding:8px;text-align:left;">Partie</th><th style="padding:8px;text-align:left;">Informations</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #ddd;font-weight:bold;">Exportateur</td><td style="padding:7px 8px;border-bottom:1px solid #ddd;">{{exportateur}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #ddd;font-weight:bold;">Importateur</td><td style="padding:7px 8px;border-bottom:1px solid #ddd;">{{importateur}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #ddd;">Pays destination</td><td style="padding:7px 8px;border-bottom:1px solid #ddd;">{{pays_destination}}</td></tr>
</table>
<div style="background:#E3F2FD;padding:10px;border-radius:4px;margin:10px 0;font-size:13px;"><strong>Marchandises :</strong> {{designation_marchandises}}<br/><strong>Quantité :</strong> {{quantite}} &nbsp;|&nbsp; <strong>Prix total :</strong> {{prix_total}} FCFA</div>
<table style="width:100%;border-collapse:collapse;font-size:13px;"><tr><td style="padding:6px;border:1px solid #ddd;"><strong>Délai livraison</strong><br/>{{delai_livraison}}</td><td style="padding:6px;border:1px solid #ddd;"><strong>Mode de paiement</strong><br/>{{mode_paiement}}</td></tr></table>
<p style="font-size:12px;margin-top:16px;">Fait à {{lieu_signature}}, le {{date_contrat}}.</p>
<div style="display:flex;justify-content:space-between;margin-top:24px;font-size:12px;"><div><strong>L'Exportateur</strong><br/><br/>Signature : _______________</div><div><strong>L'Importateur</strong><br/><br/>Signature : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 60,
  },

  {
    code: 'intl_lettre_credit_documentaire',
    name: 'Lettre de crédit documentaire',
    category: 'commercial_financier',
    description: 'Lettre de crédit documentaire pour transactions internationales',
    price: 1500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'banque_emettrice', label: 'Banque émettrice', type: 'text', required: true },
      { name: 'banque_notificatrice', label: 'Banque notificatrice', type: 'text', required: false },
      { name: 'donneur_ordre', label: "Donneur d'ordre (acheteur)", type: 'text', required: true },
      { name: 'beneficiaire', label: 'Bénéficiaire (vendeur)', type: 'text', required: true },
      { name: 'montant_lc', label: 'Montant du crédit (devise)', type: 'text', required: true },
      { name: 'devise', label: 'Devise', type: 'text', required: true },
      { name: 'date_expiration', label: "Date d'expiration", type: 'date', required: true },
      { name: 'port_chargement', label: 'Port de chargement', type: 'text', required: true },
      { name: 'port_destination', label: 'Port de destination', type: 'text', required: true },
      { name: 'documents_requis', label: 'Documents requis', type: 'textarea', required: true },
      { name: 'conditions_speciales', label: 'Conditions spéciales', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;border:2px solid #1a237e;">
<div style="background:#1a237e;color:white;padding:10px;text-align:center;"><h1 style="font-size:16px;margin:0;">LETTRE DE CRÉDIT DOCUMENTAIRE (L/C)</h1><p style="font-size:12px;margin:4px 0;">Crédit Documentaire Irrévocable — RUU 600</p></div>
<table style="width:100%;border-collapse:collapse;margin:14px 0;font-size:13px;">
<tr style="background:#E8EAF6;"><td style="padding:7px;border:1px solid #ddd;font-weight:bold;">Banque émettrice</td><td style="padding:7px;border:1px solid #ddd;">{{banque_emettrice}}</td><td style="padding:7px;border:1px solid #ddd;font-weight:bold;">Banque notificatrice</td><td style="padding:7px;border:1px solid #ddd;">{{banque_notificatrice}}</td></tr>
<tr><td style="padding:7px;border:1px solid #ddd;font-weight:bold;">Donneur d'ordre</td><td style="padding:7px;border:1px solid #ddd;">{{donneur_ordre}}</td><td style="padding:7px;border:1px solid #ddd;font-weight:bold;">Bénéficiaire</td><td style="padding:7px;border:1px solid #ddd;">{{beneficiaire}}</td></tr>
<tr style="background:#FFF9C4;"><td style="padding:7px;border:1px solid #ddd;font-weight:bold;">Montant</td><td style="padding:7px;border:1px solid #ddd;font-size:15px;font-weight:bold;">{{montant_lc}} {{devise}}</td><td style="padding:7px;border:1px solid #ddd;font-weight:bold;">Date expiration</td><td style="padding:7px;border:1px solid #ddd;">{{date_expiration}}</td></tr>
<tr><td style="padding:7px;border:1px solid #ddd;font-weight:bold;">Port chargement</td><td style="padding:7px;border:1px solid #ddd;">{{port_chargement}}</td><td style="padding:7px;border:1px solid #ddd;font-weight:bold;">Port destination</td><td style="padding:7px;border:1px solid #ddd;">{{port_destination}}</td></tr>
</table>
<div style="background:#F0F4F8;padding:10px;border-radius:4px;font-size:13px;"><strong>Documents requis :</strong><br/>{{documents_requis}}</div>
<div style="background:#FFF3E0;padding:10px;border-radius:4px;margin-top:8px;font-size:13px;"><strong>Conditions spéciales :</strong> {{conditions_speciales}}</div>
<p style="font-size:11px;color:#888;margin-top:12px;">Ce crédit documentaire est soumis aux Règles et Usances Uniformes relatives aux crédits documentaires (RUU 600 - CCI Paris).</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 55,
  },

  {
    code: 'intl_certificat_origine_uemoa',
    name: "Certificat d'origine UEMOA",
    category: 'juridique_admin',
    description: "Certificat d'origine des marchandises pour la zone UEMOA",
    price: 800, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'exportateur', label: 'Exportateur / Déclarant', type: 'text', required: true },
      { name: 'pays_exportation', label: "Pays d'exportation", type: 'text', required: true },
      { name: 'pays_destination', label: 'Pays de destination', type: 'text', required: true },
      { name: 'designation_produits', label: 'Désignation des produits', type: 'textarea', required: true },
      { name: 'quantite_poids', label: 'Quantité / Poids brut', type: 'text', required: true },
      { name: 'valeur_fob', label: 'Valeur FOB (FCFA)', type: 'text', required: true },
      { name: 'critere_origine', label: "Critère d'origine", type: 'text', required: true },
      { name: 'num_certificat', label: 'N° de certificat', type: 'text', required: true },
      { name: 'date_emission', label: "Date d'émission", type: 'date', required: true },
      { name: 'organisme_emetteur', label: 'Organisme émetteur', type: 'text', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;border:2px solid #e65100;">
<div style="text-align:center;border-bottom:2px solid #e65100;padding-bottom:10px;"><h1 style="color:#e65100;font-size:17px;">CERTIFICAT D'ORIGINE — UEMOA</h1><p style="font-size:13px;color:#555;">Union Économique et Monétaire Ouest-Africaine</p></div>
<p style="font-size:12px;text-align:right;">N° : <strong>{{num_certificat}}</strong> &nbsp;|&nbsp; Date : <strong>{{date_emission}}</strong></p>
<table style="width:100%;border-collapse:collapse;margin:10px 0;font-size:13px;">
<tr style="background:#FBE9E7;"><td style="padding:7px;border:1px solid #ddd;font-weight:bold;width:35%;">Exportateur / Déclarant</td><td style="padding:7px;border:1px solid #ddd;">{{exportateur}}</td></tr>
<tr><td style="padding:7px;border:1px solid #ddd;font-weight:bold;">Pays d'exportation</td><td style="padding:7px;border:1px solid #ddd;">{{pays_exportation}}</td></tr>
<tr><td style="padding:7px;border:1px solid #ddd;font-weight:bold;">Pays de destination</td><td style="padding:7px;border:1px solid #ddd;">{{pays_destination}}</td></tr>
<tr style="background:#FFF9C4;"><td style="padding:7px;border:1px solid #ddd;font-weight:bold;">Désignation produits</td><td style="padding:7px;border:1px solid #ddd;">{{designation_produits}}</td></tr>
<tr><td style="padding:7px;border:1px solid #ddd;font-weight:bold;">Quantité / Poids</td><td style="padding:7px;border:1px solid #ddd;">{{quantite_poids}}</td></tr>
<tr><td style="padding:7px;border:1px solid #ddd;font-weight:bold;">Valeur FOB</td><td style="padding:7px;border:1px solid #ddd;font-weight:bold;">{{valeur_fob}} FCFA</td></tr>
<tr><td style="padding:7px;border:1px solid #ddd;font-weight:bold;">Critère d'origine</td><td style="padding:7px;border:1px solid #ddd;">{{critere_origine}}</td></tr>
</table>
<p style="font-size:12px;margin-top:12px;"><strong>Organisme émetteur :</strong> {{organisme_emetteur}}</p>
<p style="font-size:11px;color:#888;">Je soussigné(e) certifie que les marchandises décrites ci-dessus sont originaires du pays mentionné.</p>
<p style="margin-top:20px;font-size:12px;">Signature et cachet : ___________________________</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 65,
  },

  {
    code: 'intl_declaration_douaniere_import',
    name: 'Déclaration douanière import',
    category: 'juridique_admin',
    description: "Déclaration douanière pour l'importation de marchandises",
    price: 900, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'declarant', label: 'Déclarant / Transitaire', type: 'text', required: true },
      { name: 'importateur', label: 'Importateur', type: 'text', required: true },
      { name: 'pays_origine', label: "Pays d'origine", type: 'text', required: true },
      { name: 'pays_provenance', label: 'Pays de provenance', type: 'text', required: true },
      { name: 'designation_marchandises', label: 'Désignation des marchandises', type: 'textarea', required: true },
      { name: 'position_tarifaire', label: 'Position tarifaire (SH)', type: 'text', required: true },
      { name: 'valeur_douane', label: 'Valeur en douane (FCFA)', type: 'text', required: true },
      { name: 'poids_brut', label: 'Poids brut (kg)', type: 'text', required: true },
      { name: 'num_declaration', label: 'N° de déclaration', type: 'text', required: true },
      { name: 'bureau_douane', label: 'Bureau de douane', type: 'text', required: true },
      { name: 'date_declaration', label: 'Date de déclaration', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:20px;border:1px solid #555;">
<div style="background:#37474f;color:white;padding:10px;text-align:center;"><h1 style="font-size:15px;margin:0;">DÉCLARATION EN DOUANE — IMPORTATION</h1></div>
<div style="display:flex;justify-content:space-between;font-size:12px;padding:8px 0;border-bottom:1px solid #ccc;"><span><strong>N° :</strong> {{num_declaration}}</span><span><strong>Bureau :</strong> {{bureau_douane}}</span><span><strong>Date :</strong> {{date_declaration}}</span></div>
<table style="width:100%;border-collapse:collapse;margin:10px 0;font-size:13px;">
<tr style="background:#ECEFF1;"><td style="padding:6px 8px;border:1px solid #ccc;font-weight:bold;width:35%;">Déclarant / Transitaire</td><td style="padding:6px 8px;border:1px solid #ccc;">{{declarant}}</td></tr>
<tr><td style="padding:6px 8px;border:1px solid #ccc;font-weight:bold;">Importateur</td><td style="padding:6px 8px;border:1px solid #ccc;">{{importateur}}</td></tr>
<tr style="background:#ECEFF1;"><td style="padding:6px 8px;border:1px solid #ccc;font-weight:bold;">Pays d'origine</td><td style="padding:6px 8px;border:1px solid #ccc;">{{pays_origine}}</td></tr>
<tr><td style="padding:6px 8px;border:1px solid #ccc;font-weight:bold;">Pays de provenance</td><td style="padding:6px 8px;border:1px solid #ccc;">{{pays_provenance}}</td></tr>
<tr style="background:#FFF9C4;"><td style="padding:6px 8px;border:1px solid #ccc;font-weight:bold;">Désignation marchandises</td><td style="padding:6px 8px;border:1px solid #ccc;">{{designation_marchandises}}</td></tr>
<tr><td style="padding:6px 8px;border:1px solid #ccc;font-weight:bold;">Position tarifaire</td><td style="padding:6px 8px;border:1px solid #ccc;">{{position_tarifaire}}</td></tr>
<tr><td style="padding:6px 8px;border:1px solid #ccc;font-weight:bold;">Valeur en douane</td><td style="padding:6px 8px;border:1px solid #ccc;font-weight:bold;">{{valeur_douane}} FCFA</td></tr>
<tr><td style="padding:6px 8px;border:1px solid #ccc;font-weight:bold;">Poids brut</td><td style="padding:6px 8px;border:1px solid #ccc;">{{poids_brut}} kg</td></tr>
</table>
<p style="font-size:11px;color:#888;margin-top:8px;">Certifie exactes les informations portées sur la présente déclaration.</p>
<p style="margin-top:16px;font-size:12px;">Signature du déclarant : ___________________________</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 70,
  },

  {
    code: 'intl_facture_commerciale_internationale',
    name: 'Facture commerciale internationale',
    category: 'commercial_financier',
    description: 'Facture commerciale pour opérations de commerce international',
    price: 700, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'vendeur', label: 'Vendeur (nom, adresse, pays)', type: 'text', required: true },
      { name: 'acheteur', label: 'Acheteur (nom, adresse, pays)', type: 'text', required: true },
      { name: 'num_facture', label: 'N° de facture', type: 'text', required: true },
      { name: 'date_facture', label: 'Date de facturation', type: 'date', required: true },
      { name: 'description_biens', label: 'Description des biens', type: 'textarea', required: true },
      { name: 'quantite', label: 'Quantité', type: 'text', required: true },
      { name: 'prix_unitaire', label: 'Prix unitaire (devise)', type: 'text', required: true },
      { name: 'montant_total', label: 'Montant total (devise)', type: 'text', required: true },
      { name: 'devise', label: 'Devise', type: 'text', required: true },
      { name: 'incoterm', label: 'Incoterm', type: 'text', required: true },
      { name: 'conditions_paiement', label: 'Conditions de paiement', type: 'text', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<div style="display:flex;justify-content:space-between;align-items:flex-start;border-bottom:3px solid #1565c0;padding-bottom:12px;margin-bottom:14px;">
<div><h1 style="color:#1565c0;font-size:22px;margin:0;">FACTURE COMMERCIALE</h1><p style="font-size:12px;color:#777;margin:4px 0;">Commercial Invoice</p></div>
<div style="text-align:right;font-size:13px;"><strong>N° {{num_facture}}</strong><br/>Date : {{date_facture}}<br/>Devise : {{devise}}</div>
</div>
<div style="display:flex;gap:20px;margin-bottom:14px;font-size:13px;">
<div style="flex:1;background:#E3F2FD;padding:10px;border-radius:4px;"><strong>VENDEUR :</strong><br/>{{vendeur}}</div>
<div style="flex:1;background:#F3E5F5;padding:10px;border-radius:4px;"><strong>ACHETEUR :</strong><br/>{{acheteur}}</div>
</div>
<table style="width:100%;border-collapse:collapse;font-size:13px;margin-bottom:12px;">
<tr style="background:#1565c0;color:white;"><th style="padding:8px;text-align:left;">Description</th><th style="padding:8px;text-align:center;">Qté</th><th style="padding:8px;text-align:right;">P.U.</th><th style="padding:8px;text-align:right;">Total</th></tr>
<tr><td style="padding:8px;border-bottom:1px solid #eee;">{{description_biens}}</td><td style="padding:8px;border-bottom:1px solid #eee;text-align:center;">{{quantite}}</td><td style="padding:8px;border-bottom:1px solid #eee;text-align:right;">{{prix_unitaire}}</td><td style="padding:8px;border-bottom:1px solid #eee;text-align:right;font-weight:bold;">{{montant_total}}</td></tr>
<tr style="background:#FFF9C4;font-weight:bold;"><td colspan="3" style="padding:8px;text-align:right;">TOTAL {{devise}}</td><td style="padding:8px;text-align:right;font-size:15px;">{{montant_total}}</td></tr>
</table>
<p style="font-size:13px;"><strong>Incoterm :</strong> {{incoterm}} &nbsp;|&nbsp; <strong>Paiement :</strong> {{conditions_paiement}}</p>
<p style="font-size:11px;color:#888;margin-top:16px;">Signature et cachet du vendeur : ___________________________</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 75,
  },

  {
    code: 'intl_contrat_agent_commercial_export',
    name: 'Contrat agent commercial export',
    category: 'commercial_financier',
    description: "Contrat de représentation d'un agent commercial à l'export",
    price: 1300, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'mandant', label: 'Mandant (entreprise exportatrice)', type: 'text', required: true },
      { name: 'agent', label: "Agent commercial (nom & pays)", type: 'text', required: true },
      { name: 'territoire', label: 'Territoire couvert', type: 'text', required: true },
      { name: 'produits_concernes', label: 'Produits / services concernés', type: 'textarea', required: true },
      { name: 'taux_commission', label: 'Taux de commission (%)', type: 'text', required: true },
      { name: 'duree_contrat', label: 'Durée du contrat', type: 'text', required: true },
      { name: 'date_debut', label: 'Date de prise d\'effet', type: 'date', required: true },
      { name: 'objectifs_vente', label: 'Objectifs de vente annuels', type: 'text', required: false },
      { name: 'clause_exclusivite', label: 'Clause d\'exclusivité (oui/non)', type: 'text', required: false },
      { name: 'loi_applicable', label: 'Loi applicable', type: 'text', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1b5e20;border-bottom:2px solid #2e7d32;padding-bottom:8px;font-size:17px;text-align:center;">CONTRAT D'AGENT COMMERCIAL — EXPORT</h1>
<p style="font-size:13px;text-align:center;color:#555;">Prise d'effet : {{date_debut}}</p>
<table style="width:100%;border-collapse:collapse;margin:12px 0;font-size:13px;">
<tr style="background:#E8F5E9;"><td style="padding:7px;border:1px solid #ccc;font-weight:bold;width:35%;">Mandant (Exportateur)</td><td style="padding:7px;border:1px solid #ccc;">{{mandant}}</td></tr>
<tr><td style="padding:7px;border:1px solid #ccc;font-weight:bold;">Agent commercial</td><td style="padding:7px;border:1px solid #ccc;">{{agent}}</td></tr>
<tr style="background:#E8F5E9;"><td style="padding:7px;border:1px solid #ccc;font-weight:bold;">Territoire couvert</td><td style="padding:7px;border:1px solid #ccc;">{{territoire}}</td></tr>
<tr><td style="padding:7px;border:1px solid #ccc;font-weight:bold;">Produits / services</td><td style="padding:7px;border:1px solid #ccc;">{{produits_concernes}}</td></tr>
<tr style="background:#FFF9C4;"><td style="padding:7px;border:1px solid #ccc;font-weight:bold;">Commission</td><td style="padding:7px;border:1px solid #ccc;font-size:15px;font-weight:bold;">{{taux_commission}}%</td></tr>
<tr><td style="padding:7px;border:1px solid #ccc;font-weight:bold;">Durée</td><td style="padding:7px;border:1px solid #ccc;">{{duree_contrat}}</td></tr>
<tr><td style="padding:7px;border:1px solid #ccc;font-weight:bold;">Objectifs annuels</td><td style="padding:7px;border:1px solid #ccc;">{{objectifs_vente}}</td></tr>
<tr><td style="padding:7px;border:1px solid #ccc;font-weight:bold;">Exclusivité</td><td style="padding:7px;border:1px solid #ccc;">{{clause_exclusivite}}</td></tr>
</table>
<p style="font-size:12px;"><strong>Loi applicable :</strong> {{loi_applicable}}</p>
<div style="display:flex;justify-content:space-between;margin-top:24px;font-size:12px;"><div><strong>Le Mandant</strong><br/><br/>Signature : _______________</div><div><strong>L'Agent Commercial</strong><br/><br/>Signature : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 52,
  },

  {
    code: 'intl_accord_distribution_exclusive',
    name: 'Accord distribution exclusive',
    category: 'commercial_financier',
    description: "Accord de distribution exclusive d'un produit sur un territoire",
    price: 1400, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'fournisseur', label: 'Fournisseur / Fabricant', type: 'text', required: true },
      { name: 'distributeur', label: 'Distributeur exclusif', type: 'text', required: true },
      { name: 'produits', label: 'Produits concernés', type: 'textarea', required: true },
      { name: 'territoire_exclusif', label: 'Territoire exclusif', type: 'text', required: true },
      { name: 'duree_accord', label: 'Durée de l\'accord', type: 'text', required: true },
      { name: 'date_debut', label: 'Date de début', type: 'date', required: true },
      { name: 'prix_transfert', label: 'Prix de transfert / remise (%)', type: 'text', required: false },
      { name: 'objectif_min', label: 'Objectif minimum annuel', type: 'text', required: false },
      { name: 'conditions_renouvellement', label: 'Conditions de renouvellement', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;border:1px solid #4a148c;">
<h1 style="color:#4a148c;text-align:center;font-size:17px;border-bottom:2px solid #6a1b9a;padding-bottom:8px;">ACCORD DE DISTRIBUTION EXCLUSIVE</h1>
<p style="font-size:13px;text-align:center;color:#666;">Accord entrant en vigueur le {{date_debut}}</p>
<table style="width:100%;border-collapse:collapse;margin:12px 0;font-size:13px;">
<tr style="background:#F3E5F5;"><td style="padding:7px;border:1px solid #ddd;font-weight:bold;width:35%;">Fournisseur</td><td style="padding:7px;border:1px solid #ddd;">{{fournisseur}}</td></tr>
<tr><td style="padding:7px;border:1px solid #ddd;font-weight:bold;">Distributeur exclusif</td><td style="padding:7px;border:1px solid #ddd;">{{distributeur}}</td></tr>
<tr style="background:#F3E5F5;"><td style="padding:7px;border:1px solid #ddd;font-weight:bold;">Produits</td><td style="padding:7px;border:1px solid #ddd;">{{produits}}</td></tr>
<tr><td style="padding:7px;border:1px solid #ddd;font-weight:bold;">Territoire exclusif</td><td style="padding:7px;border:1px solid #ddd;font-weight:bold;">{{territoire_exclusif}}</td></tr>
<tr style="background:#FFF9C4;"><td style="padding:7px;border:1px solid #ddd;font-weight:bold;">Durée</td><td style="padding:7px;border:1px solid #ddd;">{{duree_accord}}</td></tr>
<tr><td style="padding:7px;border:1px solid #ddd;font-weight:bold;">Remise / Prix transfert</td><td style="padding:7px;border:1px solid #ddd;">{{prix_transfert}}</td></tr>
<tr><td style="padding:7px;border:1px solid #ddd;font-weight:bold;">Objectif min. annuel</td><td style="padding:7px;border:1px solid #ddd;">{{objectif_min}}</td></tr>
</table>
<div style="background:#F0F4F8;padding:10px;border-radius:4px;font-size:13px;"><strong>Conditions de renouvellement :</strong> {{conditions_renouvellement}}</div>
<div style="display:flex;justify-content:space-between;margin-top:24px;font-size:12px;"><div><strong>Le Fournisseur</strong><br/><br/>Signature : _______________</div><div><strong>Le Distributeur</strong><br/><br/>Signature : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 48,
  },

  {
    code: 'intl_lettre_transport_aerien',
    name: 'Lettre de transport aérien',
    category: 'juridique_admin',
    description: "Lettre de transport aérien (LTA / Air Waybill) pour envois internationaux",
    price: 600, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'expediteur', label: 'Expéditeur (Shipper)', type: 'text', required: true },
      { name: 'destinataire', label: 'Destinataire (Consignee)', type: 'text', required: true },
      { name: 'compagnie_aerienne', label: 'Compagnie aérienne', type: 'text', required: true },
      { name: 'aeroport_depart', label: "Aéroport de départ", type: 'text', required: true },
      { name: 'aeroport_destination', label: 'Aéroport de destination', type: 'text', required: true },
      { name: 'description_marchandises', label: 'Description des marchandises', type: 'textarea', required: true },
      { name: 'poids_brut', label: 'Poids brut (kg)', type: 'text', required: true },
      { name: 'nombre_colis', label: 'Nombre de colis', type: 'text', required: true },
      { name: 'num_lta', label: 'N° LTA (AWB)', type: 'text', required: true },
      { name: 'date_emission', label: "Date d'émission", type: 'date', required: true },
      { name: 'fret_paye', label: 'Fret payé / dû (Prepaid/Collect)', type: 'text', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:20px;border:1px solid #0277bd;">
<div style="background:#0277bd;color:white;padding:8px 12px;display:flex;justify-content:space-between;align-items:center;"><h1 style="font-size:15px;margin:0;">LETTRE DE TRANSPORT AÉRIEN (LTA)</h1><span style="font-size:13px;">AWB N° : {{num_lta}}</span></div>
<div style="display:flex;gap:12px;margin:12px 0;font-size:13px;">
<div style="flex:1;border:1px solid #ccc;padding:8px;"><strong>Expéditeur :</strong><br/>{{expediteur}}</div>
<div style="flex:1;border:1px solid #ccc;padding:8px;"><strong>Destinataire :</strong><br/>{{destinataire}}</div>
</div>
<table style="width:100%;border-collapse:collapse;font-size:13px;margin-bottom:10px;">
<tr style="background:#E1F5FE;"><td style="padding:6px 8px;border:1px solid #ccc;font-weight:bold;width:35%;">Compagnie aérienne</td><td style="padding:6px 8px;border:1px solid #ccc;">{{compagnie_aerienne}}</td></tr>
<tr><td style="padding:6px 8px;border:1px solid #ccc;font-weight:bold;">Aéroport de départ</td><td style="padding:6px 8px;border:1px solid #ccc;">{{aeroport_depart}}</td></tr>
<tr style="background:#E1F5FE;"><td style="padding:6px 8px;border:1px solid #ccc;font-weight:bold;">Aéroport de destination</td><td style="padding:6px 8px;border:1px solid #ccc;">{{aeroport_destination}}</td></tr>
<tr><td style="padding:6px 8px;border:1px solid #ccc;font-weight:bold;">Marchandises</td><td style="padding:6px 8px;border:1px solid #ccc;">{{description_marchandises}}</td></tr>
<tr><td style="padding:6px 8px;border:1px solid #ccc;font-weight:bold;">Poids brut / Colis</td><td style="padding:6px 8px;border:1px solid #ccc;">{{poids_brut}} kg / {{nombre_colis}} colis</td></tr>
<tr style="background:#FFF9C4;"><td style="padding:6px 8px;border:1px solid #ccc;font-weight:bold;">Fret</td><td style="padding:6px 8px;border:1px solid #ccc;">{{fret_paye}}</td></tr>
</table>
<p style="font-size:12px;">Date d'émission : {{date_emission}} &nbsp;|&nbsp; Signature agent : ___________________________</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 50,
  },

  {
    code: 'intl_connaissement_maritime',
    name: 'Connaissement maritime',
    category: 'juridique_admin',
    description: 'Connaissement maritime (Bill of Lading) pour transport de fret',
    price: 1000, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'chargeur', label: 'Chargeur (Shipper)', type: 'text', required: true },
      { name: 'destinataire', label: 'Destinataire (Consignee)', type: 'text', required: true },
      { name: 'notifie', label: 'Partie à notifier (Notify Party)', type: 'text', required: false },
      { name: 'navire', label: 'Nom du navire', type: 'text', required: true },
      { name: 'port_chargement', label: 'Port de chargement', type: 'text', required: true },
      { name: 'port_dechargement', label: 'Port de déchargement', type: 'text', required: true },
      { name: 'description_cargaison', label: 'Description de la cargaison', type: 'textarea', required: true },
      { name: 'nombre_conteneurs', label: 'Nombre de conteneurs / colis', type: 'text', required: true },
      { name: 'poids_brut', label: 'Poids brut total (tonnes)', type: 'text', required: true },
      { name: 'num_bl', label: 'N° de connaissement (B/L)', type: 'text', required: true },
      { name: 'date_emission', label: "Date d'émission", type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:20px;border:2px solid #01579b;">
<div style="text-align:center;background:#01579b;color:white;padding:10px;"><h1 style="font-size:16px;margin:0;">CONNAISSEMENT MARITIME — BILL OF LADING</h1><p style="font-size:11px;margin:4px 0;">Soumis aux Règles de La Haye-Visby</p></div>
<p style="font-size:12px;text-align:right;padding-top:8px;"><strong>B/L N° :</strong> {{num_bl}} &nbsp;|&nbsp; <strong>Date :</strong> {{date_emission}}</p>
<div style="display:flex;gap:10px;margin:10px 0;font-size:13px;">
<div style="flex:1;border:1px solid #ccc;padding:8px;"><strong>Chargeur :</strong><br/>{{chargeur}}</div>
<div style="flex:1;border:1px solid #ccc;padding:8px;"><strong>Destinataire :</strong><br/>{{destinataire}}</div>
<div style="flex:1;border:1px solid #ccc;padding:8px;"><strong>Notify Party :</strong><br/>{{notifie}}</div>
</div>
<table style="width:100%;border-collapse:collapse;font-size:13px;margin-bottom:10px;">
<tr style="background:#E1F5FE;"><td style="padding:6px 8px;border:1px solid #ccc;font-weight:bold;width:40%;">Navire</td><td style="padding:6px 8px;border:1px solid #ccc;">{{navire}}</td></tr>
<tr><td style="padding:6px 8px;border:1px solid #ccc;font-weight:bold;">Port de chargement</td><td style="padding:6px 8px;border:1px solid #ccc;">{{port_chargement}}</td></tr>
<tr style="background:#E1F5FE;"><td style="padding:6px 8px;border:1px solid #ccc;font-weight:bold;">Port de déchargement</td><td style="padding:6px 8px;border:1px solid #ccc;">{{port_dechargement}}</td></tr>
<tr><td style="padding:6px 8px;border:1px solid #ccc;font-weight:bold;">Cargaison</td><td style="padding:6px 8px;border:1px solid #ccc;">{{description_cargaison}}</td></tr>
<tr style="background:#FFF9C4;font-weight:bold;"><td style="padding:6px 8px;border:1px solid #ccc;">Conteneurs / Poids brut</td><td style="padding:6px 8px;border:1px solid #ccc;">{{nombre_conteneurs}} — {{poids_brut}} t</td></tr>
</table>
<p style="font-size:11px;color:#888;">Original émis en 3 exemplaires originaux. Signature de l'agent maritime : ___________________________</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 58,
  },

  {
    code: 'intl_devis_fob_cif',
    name: 'Devis FOB/CIF',
    category: 'commercial_financier',
    description: 'Devis international selon Incoterms FOB ou CIF',
    price: 500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'vendeur', label: 'Vendeur / Exportateur', type: 'text', required: true },
      { name: 'acheteur', label: 'Acheteur potentiel', type: 'text', required: true },
      { name: 'num_devis', label: 'N° de devis', type: 'text', required: true },
      { name: 'date_devis', label: 'Date du devis', type: 'date', required: true },
      { name: 'validite', label: 'Validité du devis (jours)', type: 'text', required: true },
      { name: 'produits', label: 'Produits / prestations', type: 'textarea', required: true },
      { name: 'incoterm', label: 'Incoterm (FOB / CIF)', type: 'text', required: true },
      { name: 'port_reference', label: 'Port de référence', type: 'text', required: true },
      { name: 'prix_unitaire', label: 'Prix unitaire (devise)', type: 'text', required: true },
      { name: 'prix_total', label: 'Prix total (devise)', type: 'text', required: true },
      { name: 'devise', label: 'Devise', type: 'text', required: true },
      { name: 'delai_livraison', label: 'Délai de livraison', type: 'text', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<div style="display:flex;justify-content:space-between;border-bottom:3px solid #00695c;padding-bottom:10px;margin-bottom:14px;">
<div><h1 style="color:#00695c;font-size:20px;margin:0;">DEVIS {{incoterm}}</h1><p style="color:#555;font-size:12px;margin:4px 0;">{{incoterm}} — Port : {{port_reference}}</p></div>
<div style="text-align:right;font-size:13px;"><strong>N° {{num_devis}}</strong><br/>Date : {{date_devis}}<br/>Validité : {{validite}} jours</div>
</div>
<div style="display:flex;gap:16px;margin-bottom:14px;font-size:13px;">
<div style="flex:1;background:#E0F2F1;padding:10px;border-radius:4px;"><strong>Vendeur :</strong><br/>{{vendeur}}</div>
<div style="flex:1;background:#FFF9C4;padding:10px;border-radius:4px;"><strong>Acheteur :</strong><br/>{{acheteur}}</div>
</div>
<table style="width:100%;border-collapse:collapse;font-size:13px;margin-bottom:12px;">
<tr style="background:#00695c;color:white;"><th style="padding:8px;text-align:left;">Produits / Prestations</th><th style="padding:8px;text-align:right;">P.U.</th><th style="padding:8px;text-align:right;">Total {{devise}}</th></tr>
<tr><td style="padding:8px;border-bottom:1px solid #eee;">{{produits}}</td><td style="padding:8px;border-bottom:1px solid #eee;text-align:right;">{{prix_unitaire}}</td><td style="padding:8px;border-bottom:1px solid #eee;text-align:right;font-weight:bold;">{{prix_total}}</td></tr>
<tr style="background:#FFF9C4;font-weight:bold;font-size:15px;"><td colspan="2" style="padding:8px;text-align:right;">TOTAL {{incoterm}} {{devise}}</td><td style="padding:8px;text-align:right;">{{prix_total}}</td></tr>
</table>
<p style="font-size:13px;"><strong>Délai de livraison :</strong> {{delai_livraison}}</p>
<p style="font-size:11px;color:#888;margin-top:10px;">Devis non contractuel — valable {{validite}} jours à compter du {{date_devis}}.</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 62,
  },

  {
    code: 'intl_convention_representation_commerciale',
    name: 'Convention représentation commerciale',
    category: 'commercial_financier',
    description: 'Convention de représentation commerciale internationale (OHADA)',
    price: 1200, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'representee', label: 'Société représentée', type: 'text', required: true },
      { name: 'representant', label: 'Représentant commercial', type: 'text', required: true },
      { name: 'zone_geographique', label: 'Zone géographique', type: 'text', required: true },
      { name: 'produits_services', label: 'Produits / services représentés', type: 'textarea', required: true },
      { name: 'pouvoirs', label: 'Pouvoirs accordés', type: 'textarea', required: true },
      { name: 'remuneration', label: 'Rémunération / commission', type: 'text', required: true },
      { name: 'duree', label: 'Durée de la convention', type: 'text', required: true },
      { name: 'date_prise_effet', label: 'Date de prise d\'effet', type: 'date', required: true },
      { name: 'obligations_representant', label: 'Obligations du représentant', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#bf360c;text-align:center;font-size:17px;border-bottom:2px solid #d84315;padding-bottom:8px;">CONVENTION DE REPRÉSENTATION COMMERCIALE</h1>
<p style="font-size:12px;text-align:center;color:#666;">Droit OHADA — Prise d'effet : {{date_prise_effet}}</p>
<table style="width:100%;border-collapse:collapse;margin:12px 0;font-size:13px;">
<tr style="background:#FBE9E7;"><td style="padding:7px;border:1px solid #ddd;font-weight:bold;width:35%;">Société représentée</td><td style="padding:7px;border:1px solid #ddd;">{{representee}}</td></tr>
<tr><td style="padding:7px;border:1px solid #ddd;font-weight:bold;">Représentant</td><td style="padding:7px;border:1px solid #ddd;">{{representant}}</td></tr>
<tr style="background:#FBE9E7;"><td style="padding:7px;border:1px solid #ddd;font-weight:bold;">Zone géographique</td><td style="padding:7px;border:1px solid #ddd;">{{zone_geographique}}</td></tr>
<tr><td style="padding:7px;border:1px solid #ddd;font-weight:bold;">Produits / services</td><td style="padding:7px;border:1px solid #ddd;">{{produits_services}}</td></tr>
<tr style="background:#FFF9C4;"><td style="padding:7px;border:1px solid #ddd;font-weight:bold;">Rémunération</td><td style="padding:7px;border:1px solid #ddd;font-weight:bold;">{{remuneration}}</td></tr>
<tr><td style="padding:7px;border:1px solid #ddd;font-weight:bold;">Durée</td><td style="padding:7px;border:1px solid #ddd;">{{duree}}</td></tr>
</table>
<div style="background:#F0F4F8;padding:10px;border-radius:4px;font-size:13px;margin-bottom:8px;"><strong>Pouvoirs accordés :</strong><br/>{{pouvoirs}}</div>
<div style="background:#FFF3E0;padding:10px;border-radius:4px;font-size:13px;"><strong>Obligations du représentant :</strong> {{obligations_representant}}</div>
<div style="display:flex;justify-content:space-between;margin-top:24px;font-size:12px;"><div><strong>La Société représentée</strong><br/><br/>Signature : _______________</div><div><strong>Le Représentant</strong><br/><br/>Signature : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 45,
  },

  {
    code: 'intl_rapport_inspection_marchandises',
    name: 'Rapport inspection marchandises',
    category: 'juridique_admin',
    description: 'Rapport officiel d\'inspection de marchandises avant expédition',
    price: 800, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'organisme_inspection', label: 'Organisme d\'inspection', type: 'text', required: true },
      { name: 'exportateur', label: 'Exportateur', type: 'text', required: true },
      { name: 'importateur', label: 'Importateur / Commanditaire', type: 'text', required: true },
      { name: 'lieu_inspection', label: 'Lieu d\'inspection', type: 'text', required: true },
      { name: 'date_inspection', label: 'Date d\'inspection', type: 'date', required: true },
      { name: 'description_marchandises', label: 'Description des marchandises', type: 'textarea', required: true },
      { name: 'quantite_verifiee', label: 'Quantité vérifiée', type: 'text', required: true },
      { name: 'resultat_inspection', label: 'Résultat (Conforme / Non conforme)', type: 'text', required: true },
      { name: 'observations', label: 'Observations et réserves', type: 'textarea', required: false },
      { name: 'num_rapport', label: 'N° de rapport', type: 'text', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:20px;">
<div style="background:#1a237e;color:white;padding:12px;text-align:center;"><h1 style="font-size:16px;margin:0;">RAPPORT D'INSPECTION DE MARCHANDISES</h1><p style="font-size:12px;margin:4px 0;">Certificate of Inspection</p></div>
<div style="display:flex;justify-content:space-between;font-size:12px;padding:8px;background:#ECEFF1;"><span><strong>N° Rapport :</strong> {{num_rapport}}</span><span><strong>Date :</strong> {{date_inspection}}</span><span><strong>Lieu :</strong> {{lieu_inspection}}</span></div>
<table style="width:100%;border-collapse:collapse;margin:12px 0;font-size:13px;">
<tr><td style="padding:7px;border:1px solid #ddd;font-weight:bold;width:35%;">Organisme d'inspection</td><td style="padding:7px;border:1px solid #ddd;">{{organisme_inspection}}</td></tr>
<tr style="background:#E8EAF6;"><td style="padding:7px;border:1px solid #ddd;font-weight:bold;">Exportateur</td><td style="padding:7px;border:1px solid #ddd;">{{exportateur}}</td></tr>
<tr><td style="padding:7px;border:1px solid #ddd;font-weight:bold;">Importateur</td><td style="padding:7px;border:1px solid #ddd;">{{importateur}}</td></tr>
<tr style="background:#E8EAF6;"><td style="padding:7px;border:1px solid #ddd;font-weight:bold;">Marchandises</td><td style="padding:7px;border:1px solid #ddd;">{{description_marchandises}}</td></tr>
<tr><td style="padding:7px;border:1px solid #ddd;font-weight:bold;">Quantité vérifiée</td><td style="padding:7px;border:1px solid #ddd;">{{quantite_verifiee}}</td></tr>
<tr style="background:#FFF9C4;font-weight:bold;"><td style="padding:7px;border:1px solid #ddd;">Résultat</td><td style="padding:7px;border:1px solid #ddd;font-size:15px;">{{resultat_inspection}}</td></tr>
</table>
<div style="background:#F0F4F8;padding:10px;border-radius:4px;font-size:13px;"><strong>Observations / Réserves :</strong><br/>{{observations}}</div>
<p style="margin-top:16px;font-size:12px;">Signature de l'inspecteur : ___________________________</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 53,
  },

  {
    code: 'intl_contrat_joint_venture',
    name: 'Contrat joint-venture international',
    category: 'commercial_financier',
    description: 'Contrat de joint-venture entre partenaires de pays différents',
    price: 1500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'partenaire_a', label: 'Partenaire A (nom & pays)', type: 'text', required: true },
      { name: 'partenaire_b', label: 'Partenaire B (nom & pays)', type: 'text', required: true },
      { name: 'denomination_jv', label: 'Dénomination de la JV', type: 'text', required: true },
      { name: 'objet_jv', label: 'Objet / activité de la JV', type: 'textarea', required: true },
      { name: 'capital', label: 'Capital social prévu (FCFA / USD)', type: 'text', required: true },
      { name: 'part_a', label: 'Part du partenaire A (%)', type: 'text', required: true },
      { name: 'part_b', label: 'Part du partenaire B (%)', type: 'text', required: true },
      { name: 'siege_social', label: 'Siège social', type: 'text', required: true },
      { name: 'duree_jv', label: 'Durée de la JV', type: 'text', required: true },
      { name: 'date_contrat', label: 'Date du contrat', type: 'date', required: true },
      { name: 'loi_applicable', label: 'Loi applicable / Arbitrage', type: 'text', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;border:1px solid #1b5e20;">
<h1 style="color:#1b5e20;text-align:center;font-size:17px;border-bottom:2px solid #2e7d32;padding-bottom:8px;">CONTRAT DE JOINT-VENTURE INTERNATIONAL</h1>
<p style="font-size:13px;text-align:center;font-weight:bold;">{{denomination_jv}}</p>
<table style="width:100%;border-collapse:collapse;margin:12px 0;font-size:13px;">
<tr style="background:#E8F5E9;"><td style="padding:7px;border:1px solid #ccc;font-weight:bold;width:35%;">Partenaire A</td><td style="padding:7px;border:1px solid #ccc;">{{partenaire_a}}</td></tr>
<tr><td style="padding:7px;border:1px solid #ccc;font-weight:bold;">Partenaire B</td><td style="padding:7px;border:1px solid #ccc;">{{partenaire_b}}</td></tr>
<tr style="background:#E8F5E9;"><td style="padding:7px;border:1px solid #ccc;font-weight:bold;">Objet / Activité</td><td style="padding:7px;border:1px solid #ccc;">{{objet_jv}}</td></tr>
<tr><td style="padding:7px;border:1px solid #ccc;font-weight:bold;">Capital social</td><td style="padding:7px;border:1px solid #ccc;font-weight:bold;">{{capital}}</td></tr>
<tr style="background:#FFF9C4;"><td style="padding:7px;border:1px solid #ccc;font-weight:bold;">Répartition capital</td><td style="padding:7px;border:1px solid #ccc;">A : {{part_a}}% &nbsp;|&nbsp; B : {{part_b}}%</td></tr>
<tr><td style="padding:7px;border:1px solid #ccc;font-weight:bold;">Siège social</td><td style="padding:7px;border:1px solid #ccc;">{{siege_social}}</td></tr>
<tr><td style="padding:7px;border:1px solid #ccc;font-weight:bold;">Durée</td><td style="padding:7px;border:1px solid #ccc;">{{duree_jv}}</td></tr>
<tr><td style="padding:7px;border:1px solid #ccc;font-weight:bold;">Loi applicable</td><td style="padding:7px;border:1px solid #ccc;">{{loi_applicable}}</td></tr>
</table>
<p style="font-size:12px;">Fait le {{date_contrat}}.</p>
<div style="display:flex;justify-content:space-between;margin-top:24px;font-size:12px;"><div><strong>Partenaire A</strong><br/><br/>Signature : _______________</div><div><strong>Partenaire B</strong><br/><br/>Signature : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 40,
  },

  {
    code: 'intl_demande_certificat_phytosanitaire',
    name: 'Demande certificat phytosanitaire',
    category: 'juridique_admin',
    description: "Demande de certificat phytosanitaire pour exportation végétaux",
    price: 600, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'demandeur', label: 'Demandeur / Exportateur', type: 'text', required: true },
      { name: 'autorite_competente', label: 'Autorité compétente', type: 'text', required: true },
      { name: 'pays_destination', label: 'Pays de destination', type: 'text', required: true },
      { name: 'nature_produits', label: 'Nature des produits végétaux', type: 'textarea', required: true },
      { name: 'quantite', label: 'Quantité (kg / tonnes)', type: 'text', required: true },
      { name: 'zone_production', label: 'Zone de production', type: 'text', required: true },
      { name: 'date_expedition', label: "Date d'expédition prévue", type: 'date', required: true },
      { name: 'traitement_applique', label: 'Traitement phytosanitaire appliqué', type: 'text', required: false },
      { name: 'date_demande', label: 'Date de la demande', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:20px;">
<div style="text-align:center;border:2px solid #2e7d32;padding:10px;margin-bottom:14px;">
<h1 style="color:#2e7d32;font-size:16px;">DEMANDE DE CERTIFICAT PHYTOSANITAIRE</h1>
<p style="font-size:12px;color:#555;">Convention Internationale pour la Protection des Végétaux (CIPV)</p>
</div>
<p style="font-size:12px;"><strong>À :</strong> {{autorite_competente}} &nbsp;|&nbsp; <strong>Date :</strong> {{date_demande}}</p>
<table style="width:100%;border-collapse:collapse;margin:10px 0;font-size:13px;">
<tr style="background:#E8F5E9;"><td style="padding:7px;border:1px solid #ccc;font-weight:bold;width:40%;">Demandeur / Exportateur</td><td style="padding:7px;border:1px solid #ccc;">{{demandeur}}</td></tr>
<tr><td style="padding:7px;border:1px solid #ccc;font-weight:bold;">Pays de destination</td><td style="padding:7px;border:1px solid #ccc;">{{pays_destination}}</td></tr>
<tr style="background:#E8F5E9;"><td style="padding:7px;border:1px solid #ccc;font-weight:bold;">Nature des produits</td><td style="padding:7px;border:1px solid #ccc;">{{nature_produits}}</td></tr>
<tr><td style="padding:7px;border:1px solid #ccc;font-weight:bold;">Quantité</td><td style="padding:7px;border:1px solid #ccc;">{{quantite}}</td></tr>
<tr style="background:#E8F5E9;"><td style="padding:7px;border:1px solid #ccc;font-weight:bold;">Zone de production</td><td style="padding:7px;border:1px solid #ccc;">{{zone_production}}</td></tr>
<tr><td style="padding:7px;border:1px solid #ccc;font-weight:bold;">Date d'expédition prévue</td><td style="padding:7px;border:1px solid #ccc;">{{date_expedition}}</td></tr>
<tr style="background:#FFF9C4;"><td style="padding:7px;border:1px solid #ccc;font-weight:bold;">Traitement appliqué</td><td style="padding:7px;border:1px solid #ccc;">{{traitement_applique}}</td></tr>
</table>
<p style="font-size:12px;margin-top:12px;">Je soussigné(e) {{demandeur}} atteste l'exactitude des informations ci-dessus.</p>
<p style="margin-top:20px;font-size:12px;">Signature du demandeur : ___________________________</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 47,
  },

  {
    code: 'intl_accord_confidentialite_international',
    name: 'Accord de confidentialité international',
    category: 'juridique_admin',
    description: 'NDA / Accord de confidentialité pour partenariats internationaux',
    price: 900, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'partie_divulgatrice', label: 'Partie divulgatrice', type: 'text', required: true },
      { name: 'partie_receptrice', label: 'Partie réceptrice', type: 'text', required: true },
      { name: 'objet_accord', label: 'Objet / Contexte de l\'accord', type: 'textarea', required: true },
      { name: 'informations_confidentielles', label: 'Nature des informations confidentielles', type: 'textarea', required: true },
      { name: 'duree_confidentialite', label: 'Durée de confidentialité (ans)', type: 'text', required: true },
      { name: 'date_accord', label: 'Date de l\'accord', type: 'date', required: true },
      { name: 'exclusions', label: 'Exclusions de confidentialité', type: 'textarea', required: false },
      { name: 'loi_applicable', label: 'Loi applicable / Juridiction', type: 'text', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#4a148c;text-align:center;font-size:17px;border-bottom:2px solid #6a1b9a;padding-bottom:8px;">ACCORD DE CONFIDENTIALITÉ — NDA</h1>
<p style="font-size:12px;text-align:center;color:#666;">Non-Disclosure Agreement — Droit International</p>
<p style="font-size:13px;margin:12px 0;">Entre <strong>{{partie_divulgatrice}}</strong> (ci-après «&nbsp;la Partie Divulgatrice&nbsp;») et <strong>{{partie_receptrice}}</strong> (ci-après «&nbsp;la Partie Réceptrice&nbsp;»), il est convenu ce qui suit :</p>
<table style="width:100%;border-collapse:collapse;margin:12px 0;font-size:13px;">
<tr style="background:#F3E5F5;"><td style="padding:7px;border:1px solid #ddd;font-weight:bold;width:40%;">Contexte / Objet</td><td style="padding:7px;border:1px solid #ddd;">{{objet_accord}}</td></tr>
<tr><td style="padding:7px;border:1px solid #ddd;font-weight:bold;">Informations confidentielles</td><td style="padding:7px;border:1px solid #ddd;">{{informations_confidentielles}}</td></tr>
<tr style="background:#FFF9C4;"><td style="padding:7px;border:1px solid #ddd;font-weight:bold;">Durée</td><td style="padding:7px;border:1px solid #ddd;font-weight:bold;">{{duree_confidentialite}} ans</td></tr>
<tr><td style="padding:7px;border:1px solid #ddd;font-weight:bold;">Exclusions</td><td style="padding:7px;border:1px solid #ddd;">{{exclusions}}</td></tr>
<tr><td style="padding:7px;border:1px solid #ddd;font-weight:bold;">Loi applicable</td><td style="padding:7px;border:1px solid #ddd;">{{loi_applicable}}</td></tr>
</table>
<p style="font-size:12px;">Fait le {{date_accord}}.</p>
<div style="display:flex;justify-content:space-between;margin-top:24px;font-size:12px;"><div><strong>Partie Divulgatrice</strong><br/><br/>Signature : _______________</div><div><strong>Partie Réceptrice</strong><br/><br/>Signature : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 55,
  },

  {
    code: 'intl_contrat_sous_traitance_internationale',
    name: 'Contrat sous-traitance internationale',
    category: 'commercial_financier',
    description: 'Contrat de sous-traitance entre entreprises de pays différents',
    price: 1300, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'donneur_ordres', label: "Donneur d'ordres", type: 'text', required: true },
      { name: 'sous_traitant', label: 'Sous-traitant', type: 'text', required: true },
      { name: 'objet_sous_traitance', label: 'Objet de la sous-traitance', type: 'textarea', required: true },
      { name: 'specifications_techniques', label: 'Spécifications techniques', type: 'textarea', required: false },
      { name: 'montant_contrat', label: 'Montant du contrat (FCFA)', type: 'text', required: true },
      { name: 'delai_execution', label: "Délai d'exécution", type: 'text', required: true },
      { name: 'penalites_retard', label: 'Pénalités de retard', type: 'text', required: false },
      { name: 'garanties', label: 'Garanties exigées', type: 'text', required: false },
      { name: 'date_contrat', label: 'Date du contrat', type: 'date', required: true },
      { name: 'loi_applicable', label: 'Loi applicable', type: 'text', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#37474f;text-align:center;font-size:17px;border-bottom:2px solid #546e7a;padding-bottom:8px;">CONTRAT DE SOUS-TRAITANCE INTERNATIONALE</h1>
<p style="font-size:12px;text-align:center;color:#666;">Droit OHADA — {{date_contrat}}</p>
<table style="width:100%;border-collapse:collapse;margin:12px 0;font-size:13px;">
<tr style="background:#ECEFF1;"><td style="padding:7px;border:1px solid #ccc;font-weight:bold;width:35%;">Donneur d'ordres</td><td style="padding:7px;border:1px solid #ccc;">{{donneur_ordres}}</td></tr>
<tr><td style="padding:7px;border:1px solid #ccc;font-weight:bold;">Sous-traitant</td><td style="padding:7px;border:1px solid #ccc;">{{sous_traitant}}</td></tr>
<tr style="background:#ECEFF1;"><td style="padding:7px;border:1px solid #ccc;font-weight:bold;">Objet</td><td style="padding:7px;border:1px solid #ccc;">{{objet_sous_traitance}}</td></tr>
<tr><td style="padding:7px;border:1px solid #ccc;font-weight:bold;">Spécifications</td><td style="padding:7px;border:1px solid #ccc;">{{specifications_techniques}}</td></tr>
<tr style="background:#FFF9C4;font-weight:bold;"><td style="padding:7px;border:1px solid #ccc;">Montant du contrat</td><td style="padding:7px;border:1px solid #ccc;font-size:15px;">{{montant_contrat}} FCFA</td></tr>
<tr><td style="padding:7px;border:1px solid #ccc;font-weight:bold;">Délai d'exécution</td><td style="padding:7px;border:1px solid #ccc;">{{delai_execution}}</td></tr>
<tr><td style="padding:7px;border:1px solid #ccc;font-weight:bold;">Pénalités de retard</td><td style="padding:7px;border:1px solid #ccc;">{{penalites_retard}}</td></tr>
<tr><td style="padding:7px;border:1px solid #ccc;font-weight:bold;">Garanties</td><td style="padding:7px;border:1px solid #ccc;">{{garanties}}</td></tr>
</table>
<p style="font-size:12px;"><strong>Loi applicable :</strong> {{loi_applicable}}</p>
<div style="display:flex;justify-content:space-between;margin-top:24px;font-size:12px;"><div><strong>Le Donneur d'ordres</strong><br/><br/>Signature : _______________</div><div><strong>Le Sous-traitant</strong><br/><br/>Signature : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 43,
  },

  {
    code: 'intl_garantie_bancaire_internationale',
    name: 'Garantie bancaire internationale',
    category: 'commercial_financier',
    description: 'Garantie bancaire à première demande pour opérations internationales',
    price: 1500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'banque_garante', label: 'Banque garante', type: 'text', required: true },
      { name: 'donneur_ordre', label: "Donneur d'ordre", type: 'text', required: true },
      { name: 'beneficiaire', label: 'Bénéficiaire de la garantie', type: 'text', required: true },
      { name: 'type_garantie', label: 'Type de garantie', type: 'text', required: true },
      { name: 'montant_garanti', label: 'Montant garanti (devise)', type: 'text', required: true },
      { name: 'devise', label: 'Devise', type: 'text', required: true },
      { name: 'date_expiration', label: "Date d'expiration", type: 'date', required: true },
      { name: 'contrat_reference', label: 'Contrat de référence', type: 'text', required: false },
      { name: 'conditions_appel', label: "Conditions d'appel en garantie", type: 'textarea', required: true },
      { name: 'num_garantie', label: 'N° de garantie', type: 'text', required: true },
      { name: 'date_emission', label: "Date d'émission", type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:20px;border:2px solid #880e4f;">
<div style="background:#880e4f;color:white;padding:10px;text-align:center;"><h1 style="font-size:16px;margin:0;">GARANTIE BANCAIRE À PREMIÈRE DEMANDE</h1><p style="font-size:11px;margin:4px 0;">International Bank Guarantee — Publication CCI N° 758</p></div>
<div style="display:flex;justify-content:space-between;font-size:12px;padding:8px;background:#FCE4EC;"><span><strong>N° :</strong> {{num_garantie}}</span><span><strong>Émission :</strong> {{date_emission}}</span><span><strong>Expiration :</strong> {{date_expiration}}</span></div>
<table style="width:100%;border-collapse:collapse;margin:12px 0;font-size:13px;">
<tr><td style="padding:7px;border:1px solid #ddd;font-weight:bold;width:40%;">Banque garante</td><td style="padding:7px;border:1px solid #ddd;">{{banque_garante}}</td></tr>
<tr style="background:#FCE4EC;"><td style="padding:7px;border:1px solid #ddd;font-weight:bold;">Donneur d'ordre</td><td style="padding:7px;border:1px solid #ddd;">{{donneur_ordre}}</td></tr>
<tr><td style="padding:7px;border:1px solid #ddd;font-weight:bold;">Bénéficiaire</td><td style="padding:7px;border:1px solid #ddd;">{{beneficiaire}}</td></tr>
<tr style="background:#FCE4EC;"><td style="padding:7px;border:1px solid #ddd;font-weight:bold;">Type de garantie</td><td style="padding:7px;border:1px solid #ddd;">{{type_garantie}}</td></tr>
<tr style="background:#FFF9C4;font-weight:bold;"><td style="padding:7px;border:1px solid #ddd;">Montant garanti</td><td style="padding:7px;border:1px solid #ddd;font-size:16px;">{{montant_garanti}} {{devise}}</td></tr>
<tr><td style="padding:7px;border:1px solid #ddd;font-weight:bold;">Contrat de référence</td><td style="padding:7px;border:1px solid #ddd;">{{contrat_reference}}</td></tr>
</table>
<div style="background:#F0F4F8;padding:10px;border-radius:4px;font-size:13px;"><strong>Conditions d'appel :</strong><br/>{{conditions_appel}}</div>
<p style="font-size:11px;color:#888;margin-top:12px;">La présente garantie est irrévocable et payable à première demande écrite du bénéficiaire.</p>
<p style="margin-top:16px;font-size:12px;">Signature autorisée de la banque : ___________________________</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 42,
  },

  {
    code: 'intl_rapport_audit_fournisseur',
    name: 'Rapport audit fournisseur',
    category: 'commercial_financier',
    description: "Rapport d'audit de qualification d'un fournisseur international",
    price: 1100, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'auditeur', label: 'Auditeur / Équipe d\'audit', type: 'text', required: true },
      { name: 'fournisseur_audite', label: 'Fournisseur audité', type: 'text', required: true },
      { name: 'pays_fournisseur', label: 'Pays du fournisseur', type: 'text', required: true },
      { name: 'date_audit', label: 'Date de l\'audit', type: 'date', required: true },
      { name: 'produits_audites', label: 'Produits / services audités', type: 'textarea', required: true },
      { name: 'criteres_evalues', label: 'Critères évalués', type: 'textarea', required: true },
      { name: 'note_globale', label: 'Note globale (/100)', type: 'text', required: true },
      { name: 'points_forts', label: 'Points forts identifiés', type: 'textarea', required: false },
      { name: 'non_conformites', label: 'Non-conformités relevées', type: 'textarea', required: false },
      { name: 'conclusion', label: 'Conclusion et recommandation', type: 'textarea', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:20px;">
<div style="background:#e65100;color:white;padding:10px 14px;"><h1 style="font-size:16px;margin:0;">RAPPORT D'AUDIT FOURNISSEUR</h1><p style="font-size:12px;margin:4px 0;">Supplier Qualification Audit Report</p></div>
<div style="display:flex;justify-content:space-between;font-size:12px;padding:8px;background:#FBE9E7;"><span><strong>Auditeur :</strong> {{auditeur}}</span><span><strong>Date :</strong> {{date_audit}}</span></div>
<table style="width:100%;border-collapse:collapse;margin:10px 0;font-size:13px;">
<tr><td style="padding:7px;border:1px solid #ddd;font-weight:bold;width:35%;">Fournisseur audité</td><td style="padding:7px;border:1px solid #ddd;">{{fournisseur_audite}}</td></tr>
<tr style="background:#FBE9E7;"><td style="padding:7px;border:1px solid #ddd;font-weight:bold;">Pays</td><td style="padding:7px;border:1px solid #ddd;">{{pays_fournisseur}}</td></tr>
<tr><td style="padding:7px;border:1px solid #ddd;font-weight:bold;">Produits audités</td><td style="padding:7px;border:1px solid #ddd;">{{produits_audites}}</td></tr>
<tr style="background:#FBE9E7;"><td style="padding:7px;border:1px solid #ddd;font-weight:bold;">Critères évalués</td><td style="padding:7px;border:1px solid #ddd;">{{criteres_evalues}}</td></tr>
<tr style="background:#FFF9C4;font-weight:bold;font-size:15px;"><td style="padding:7px;border:1px solid #ddd;">Note globale</td><td style="padding:7px;border:1px solid #ddd;">{{note_globale}} / 100</td></tr>
</table>
<div style="display:flex;gap:10px;margin:10px 0;font-size:13px;">
<div style="flex:1;background:#E8F5E9;padding:8px;border-radius:4px;"><strong>Points forts :</strong><br/>{{points_forts}}</div>
<div style="flex:1;background:#FFEBEE;padding:8px;border-radius:4px;"><strong>Non-conformités :</strong><br/>{{non_conformites}}</div>
</div>
<div style="background:#F0F4F8;padding:10px;border-radius:4px;font-size:13px;"><strong>Conclusion :</strong> {{conclusion}}</div>
<p style="margin-top:16px;font-size:12px;">Signature de l'auditeur : ___________________________</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 44,
  },

  {
    code: 'intl_convention_clearing_regional',
    name: 'Convention clearing régional',
    category: 'commercial_financier',
    description: 'Convention de clearing bilatéral ou multilatéral entre États/banques OHADA',
    price: 1500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'partie_a', label: 'Partie A (banque / État)', type: 'text', required: true },
      { name: 'partie_b', label: 'Partie B (banque / État)', type: 'text', required: true },
      { name: 'banque_centrale_reference', label: 'Banque centrale de référence', type: 'text', required: false },
      { name: 'objet_convention', label: 'Objet de la convention', type: 'textarea', required: true },
      { name: 'monnaie_clearing', label: 'Monnaie de clearing', type: 'text', required: true },
      { name: 'plafond_credit', label: 'Plafond de crédit mutuellement accordé', type: 'text', required: true },
      { name: 'periode_reglement', label: 'Période de règlement', type: 'text', required: true },
      { name: 'date_convention', label: 'Date de la convention', type: 'date', required: true },
      { name: 'duree', label: 'Durée de la convention', type: 'text', required: true },
      { name: 'conditions_resiliation', label: 'Conditions de résiliation', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;border:1px solid #006064;">
<div style="background:#006064;color:white;padding:10px;text-align:center;"><h1 style="font-size:16px;margin:0;">CONVENTION DE CLEARING RÉGIONAL</h1><p style="font-size:12px;margin:4px 0;">Zone OHADA / CEDEAO — UEMOA</p></div>
<p style="font-size:12px;text-align:right;padding:6px 0;"><strong>Date :</strong> {{date_convention}}</p>
<table style="width:100%;border-collapse:collapse;margin:10px 0;font-size:13px;">
<tr style="background:#E0F7FA;"><td style="padding:7px;border:1px solid #ccc;font-weight:bold;width:40%;">Partie A</td><td style="padding:7px;border:1px solid #ccc;">{{partie_a}}</td></tr>
<tr><td style="padding:7px;border:1px solid #ccc;font-weight:bold;">Partie B</td><td style="padding:7px;border:1px solid #ccc;">{{partie_b}}</td></tr>
<tr style="background:#E0F7FA;"><td style="padding:7px;border:1px solid #ccc;font-weight:bold;">Banque centrale référence</td><td style="padding:7px;border:1px solid #ccc;">{{banque_centrale_reference}}</td></tr>
<tr><td style="padding:7px;border:1px solid #ccc;font-weight:bold;">Objet</td><td style="padding:7px;border:1px solid #ccc;">{{objet_convention}}</td></tr>
<tr style="background:#FFF9C4;font-weight:bold;"><td style="padding:7px;border:1px solid #ccc;">Monnaie de clearing</td><td style="padding:7px;border:1px solid #ccc;font-size:15px;">{{monnaie_clearing}}</td></tr>
<tr><td style="padding:7px;border:1px solid #ccc;font-weight:bold;">Plafond de crédit</td><td style="padding:7px;border:1px solid #ccc;">{{plafond_credit}}</td></tr>
<tr><td style="padding:7px;border:1px solid #ccc;font-weight:bold;">Période de règlement</td><td style="padding:7px;border:1px solid #ccc;">{{periode_reglement}}</td></tr>
<tr><td style="padding:7px;border:1px solid #ccc;font-weight:bold;">Durée</td><td style="padding:7px;border:1px solid #ccc;">{{duree}}</td></tr>
</table>
<div style="background:#F0F4F8;padding:10px;border-radius:4px;font-size:13px;"><strong>Conditions de résiliation :</strong> {{conditions_resiliation}}</div>
<div style="display:flex;justify-content:space-between;margin-top:24px;font-size:12px;"><div><strong>Partie A</strong><br/><br/>Signature : _______________</div><div><strong>Partie B</strong><br/><br/>Signature : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 35,
  },

  {
    code: 'intl_plan_import_export_pme',
    name: 'Plan import-export PME',
    category: 'commercial_financier',
    description: "Plan structuré d'import-export pour PME africaines",
    price: 1200, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_pme', label: 'Nom de la PME', type: 'text', required: true },
      { name: 'pays_base', label: 'Pays de base', type: 'text', required: true },
      { name: 'responsable', label: 'Responsable commercial', type: 'text', required: true },
      { name: 'produits_cibles', label: 'Produits ciblés (import/export)', type: 'textarea', required: true },
      { name: 'marches_cibles', label: 'Marchés cibles', type: 'text', required: true },
      { name: 'objectif_chiffre_affaires', label: "Objectif CA annuel (FCFA)", type: 'text', required: true },
      { name: 'budget_operations', label: 'Budget opérations (FCFA)', type: 'text', required: true },
      { name: 'partenaires_logistiques', label: 'Partenaires logistiques prévus', type: 'text', required: false },
      { name: 'risques_identifies', label: 'Risques identifiés', type: 'textarea', required: false },
      { name: 'calendrier', label: 'Calendrier / étapes clés', type: 'textarea', required: false },
      { name: 'date_plan', label: 'Date du plan', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<div style="background:#1565c0;color:white;padding:12px;"><h1 style="font-size:17px;margin:0;">PLAN IMPORT-EXPORT — PME</h1><p style="font-size:12px;margin:4px 0;">{{nom_pme}} — {{pays_base}} — {{date_plan}}</p></div>
<table style="width:100%;border-collapse:collapse;margin:14px 0;font-size:13px;">
<tr style="background:#E3F2FD;"><td style="padding:7px;border:1px solid #ccc;font-weight:bold;width:35%;">PME</td><td style="padding:7px;border:1px solid #ccc;font-weight:bold;font-size:14px;">{{nom_pme}}</td></tr>
<tr><td style="padding:7px;border:1px solid #ccc;font-weight:bold;">Pays de base</td><td style="padding:7px;border:1px solid #ccc;">{{pays_base}}</td></tr>
<tr style="background:#E3F2FD;"><td style="padding:7px;border:1px solid #ccc;font-weight:bold;">Responsable commercial</td><td style="padding:7px;border:1px solid #ccc;">{{responsable}}</td></tr>
<tr><td style="padding:7px;border:1px solid #ccc;font-weight:bold;">Produits ciblés</td><td style="padding:7px;border:1px solid #ccc;">{{produits_cibles}}</td></tr>
<tr style="background:#E3F2FD;"><td style="padding:7px;border:1px solid #ccc;font-weight:bold;">Marchés cibles</td><td style="padding:7px;border:1px solid #ccc;">{{marches_cibles}}</td></tr>
<tr style="background:#FFF9C4;font-weight:bold;"><td style="padding:7px;border:1px solid #ccc;">Objectif CA annuel</td><td style="padding:7px;border:1px solid #ccc;font-size:15px;">{{objectif_chiffre_affaires}} FCFA</td></tr>
<tr><td style="padding:7px;border:1px solid #ccc;font-weight:bold;">Budget opérations</td><td style="padding:7px;border:1px solid #ccc;">{{budget_operations}} FCFA</td></tr>
<tr><td style="padding:7px;border:1px solid #ccc;font-weight:bold;">Partenaires logistiques</td><td style="padding:7px;border:1px solid #ccc;">{{partenaires_logistiques}}</td></tr>
</table>
<div style="display:flex;gap:10px;font-size:13px;">
<div style="flex:1;background:#FFEBEE;padding:8px;border-radius:4px;"><strong>Risques identifiés :</strong><br/>{{risques_identifies}}</div>
<div style="flex:1;background:#E8F5E9;padding:8px;border-radius:4px;"><strong>Calendrier / étapes clés :</strong><br/>{{calendrier}}</div>
</div>
<p style="margin-top:20px;font-size:12px;">Validé par : ___________________________</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 58,
  },
];

async function main() {
  let created = 0, updated = 0;
  for (const t of templates) {
    await prisma.documentTemplate.upsert({
      where: { code: t.code },
      update: {},
      create: t,
    });
    created++;
  }
  const total = await prisma.documentTemplate.count();
  console.log(`Seed Commerce International termine. Crees/upserted: ${created} — Total BDD: ${total}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
