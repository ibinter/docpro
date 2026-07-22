import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const COUNTRIES = JSON.stringify(['CI','SN','CM','BJ','TG','BF','ML','GN','CD','CG','GA','NE','TD','MR']);

const templates = [
  {
    code: 'tour_contrat_hebergement',
    name: "Contrat d'hébergement hôtelier",
    category: 'juridique_admin',
    description: "Contrat encadrant la prestation d'hébergement entre l'hôtel et le client",
    price: 700, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_hotel', label: "Nom de l'hôtel", type: 'text', required: true },
      { name: 'nom_client', label: 'Nom du client', type: 'text', required: true },
      { name: 'date_arrivee', label: "Date d'arrivée", type: 'date', required: true },
      { name: 'date_depart', label: 'Date de départ', type: 'date', required: true },
      { name: 'type_chambre', label: 'Type de chambre', type: 'text', required: true },
      { name: 'tarif_nuit', label: 'Tarif par nuit (FCFA)', type: 'text', required: true },
      { name: 'montant_total', label: 'Montant total (FCFA)', type: 'text', required: true },
      { name: 'conditions_annulation', label: "Conditions d'annulation", type: 'textarea', required: false },
      { name: 'services_inclus', label: 'Services inclus', type: 'textarea', required: false },
      { name: 'lieu_signature', label: 'Lieu et date de signature', type: 'text', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#1a5276;border-bottom:3px solid #2e86c1;padding-bottom:8px;text-align:center;">CONTRAT D'HÉBERGEMENT HÔTELIER</h1>
<p style="text-align:center;color:#555;">Établi entre <strong>{{nom_hotel}}</strong> et <strong>{{nom_client}}</strong></p>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#1a5276;color:white;"><th style="padding:8px;text-align:left;">Détail séjour</th><th style="padding:8px;text-align:left;">Information</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Arrivée / Départ</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{date_arrivee}} — {{date_depart}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Type de chambre</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{type_chambre}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Tarif par nuit</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{tarif_nuit}} FCFA</td></tr>
<tr style="background:#EBF5FB;font-weight:bold;"><td style="padding:8px;">Montant total</td><td style="padding:8px;">{{montant_total}} FCFA</td></tr>
</table>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;margin-bottom:10px;"><strong>Services inclus :</strong> {{services_inclus}}</div>
<div style="background:#FFF9C4;padding:10px;border-radius:4px;"><strong>Conditions d'annulation :</strong> {{conditions_annulation}}</div>
<p style="margin-top:20px;">Fait à {{lieu_signature}}.</p>
<div style="display:flex;justify-content:space-between;margin-top:20px;"><div><strong>L'hôtel</strong><br/>{{nom_hotel}}<br/><br/>Signature : _______________</div><div><strong>Le client</strong><br/>{{nom_client}}<br/><br/>Signature : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 60,
  },

  {
    code: 'tour_devis_sejour',
    name: 'Devis séjour touristique',
    category: 'commercial_financier',
    description: 'Devis détaillé pour un séjour touristique ou vacances',
    price: 400, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'agence_nom', label: "Nom de l'agence / hôtel", type: 'text', required: true },
      { name: 'nom_client', label: 'Nom du client', type: 'text', required: true },
      { name: 'destination', label: 'Destination', type: 'text', required: true },
      { name: 'date_depart', label: 'Date de départ', type: 'date', required: true },
      { name: 'duree_sejour', label: 'Durée du séjour (jours)', type: 'text', required: true },
      { name: 'nombre_personnes', label: 'Nombre de personnes', type: 'text', required: true },
      { name: 'hebergement_cout', label: 'Hébergement (FCFA)', type: 'text', required: false },
      { name: 'transport_cout', label: 'Transport (FCFA)', type: 'text', required: false },
      { name: 'activites_cout', label: 'Activités / excursions (FCFA)', type: 'text', required: false },
      { name: 'repas_cout', label: 'Repas / restauration (FCFA)', type: 'text', required: false },
      { name: 'total_devis', label: 'Total devis (FCFA)', type: 'text', required: true },
      { name: 'validite_devis', label: 'Validité du devis', type: 'text', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#1e8449;border-bottom:3px solid #27ae60;padding-bottom:8px;">DEVIS SÉJOUR TOURISTIQUE</h1>
<p><strong>Agence :</strong> {{agence_nom}} &nbsp;|&nbsp; <strong>Client :</strong> {{nom_client}}</p>
<p><strong>Destination :</strong> {{destination}} &nbsp;|&nbsp; <strong>Départ :</strong> {{date_depart}} &nbsp;|&nbsp; <strong>Durée :</strong> {{duree_sejour}} jours &nbsp;|&nbsp; <strong>Personnes :</strong> {{nombre_personnes}}</p>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#1e8449;color:white;"><th style="padding:8px;text-align:left;">Prestation</th><th style="padding:8px;text-align:right;">Montant (FCFA)</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Hébergement</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{hebergement_cout}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Transport</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{transport_cout}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Activités / Excursions</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{activites_cout}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Repas / Restauration</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{repas_cout}}</td></tr>
<tr style="background:#D5F5E3;font-weight:bold;"><td style="padding:8px;">TOTAL DEVIS</td><td style="padding:8px;text-align:right;">{{total_devis}} FCFA</td></tr>
</table>
<p style="color:#888;font-size:12px;">Validité du devis : {{validite_devis}}</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 55,
  },

  {
    code: 'tour_fiche_accueil',
    name: "Fiche d'accueil client hôtel",
    category: 'rh_emploi',
    description: "Fiche standardisée d'enregistrement et d'accueil des clients à l'hôtel",
    price: 300, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_hotel', label: "Nom de l'hôtel", type: 'text', required: true },
      { name: 'nom_client', label: 'Nom et prénom du client', type: 'text', required: true },
      { name: 'nationalite', label: 'Nationalité', type: 'text', required: false },
      { name: 'num_piece', label: "N° pièce d'identité", type: 'text', required: true },
      { name: 'date_arrivee', label: "Date et heure d'arrivée", type: 'text', required: true },
      { name: 'date_depart', label: 'Date de départ prévue', type: 'date', required: true },
      { name: 'num_chambre', label: 'Numéro de chambre', type: 'text', required: true },
      { name: 'contact_client', label: 'Téléphone / Email', type: 'text', required: false },
      { name: 'mode_paiement', label: 'Mode de paiement', type: 'text', required: false },
      { name: 'observations', label: 'Observations particulières', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#1a5276;border-bottom:3px solid #2e86c1;padding-bottom:8px;">FICHE D'ACCUEIL CLIENT</h1>
<p style="font-size:14px;color:#555;"><strong>Hôtel :</strong> {{nom_hotel}}</p>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#2e86c1;color:white;"><th colspan="2" style="padding:8px;text-align:left;">INFORMATIONS CLIENT</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;width:40%;">Nom complet</td><td style="padding:7px 8px;border-bottom:1px solid #eee;font-weight:bold;">{{nom_client}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Nationalité</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{nationalite}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">N° Pièce identité</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{num_piece}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Contact</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{contact_client}}</td></tr>
<tr style="background:#2e86c1;color:white;"><th colspan="2" style="padding:8px;text-align:left;">INFORMATIONS SÉJOUR</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Arrivée</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{date_arrivee}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Départ prévu</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{date_depart}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Chambre N°</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{num_chambre}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Mode de paiement</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{mode_paiement}}</td></tr>
</table>
<div style="background:#F0F4F8;padding:10px;border-radius:4px;"><strong>Observations :</strong> {{observations}}</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 70,
  },

  {
    code: 'tour_forfait_voyage',
    name: 'Forfait voyage sur mesure',
    category: 'commercial_financier',
    description: 'Document de présentation et vente de forfait voyage personnalisé',
    price: 600, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'agence_nom', label: "Nom de l'agence de voyage", type: 'text', required: true },
      { name: 'nom_client', label: 'Nom du client', type: 'text', required: true },
      { name: 'destination', label: 'Destination(s)', type: 'text', required: true },
      { name: 'dates_voyage', label: 'Dates du voyage', type: 'text', required: true },
      { name: 'nombre_pax', label: 'Nombre de voyageurs', type: 'text', required: true },
      { name: 'programme', label: 'Programme jour par jour', type: 'textarea', required: true },
      { name: 'inclus', label: 'Prestations incluses', type: 'textarea', required: false },
      { name: 'non_inclus', label: 'Non inclus', type: 'textarea', required: false },
      { name: 'prix_par_pax', label: 'Prix par personne (FCFA)', type: 'text', required: true },
      { name: 'prix_total', label: 'Prix total forfait (FCFA)', type: 'text', required: true },
      { name: 'conditions', label: 'Conditions de réservation', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#1a5276;border-bottom:3px solid #f39c12;padding-bottom:8px;">FORFAIT VOYAGE SUR MESURE</h1>
<p><strong>Agence :</strong> {{agence_nom}} &nbsp;|&nbsp; <strong>Client :</strong> {{nom_client}}</p>
<p><strong>Destination :</strong> {{destination}} &nbsp;|&nbsp; <strong>Dates :</strong> {{dates_voyage}} &nbsp;|&nbsp; <strong>Voyageurs :</strong> {{nombre_pax}}</p>
<div style="background:#FEF9E7;padding:12px;border-left:4px solid #f39c12;margin:12px 0;"><strong>Programme :</strong><br/>{{programme}}</div>
<table style="width:100%;border-collapse:collapse;margin:12px 0;">
<tr style="background:#f39c12;color:white;"><th style="padding:8px;text-align:left;">Tarification</th><th style="padding:8px;text-align:right;">Montant (FCFA)</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Prix par personne</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{prix_par_pax}}</td></tr>
<tr style="background:#FEF9E7;font-weight:bold;"><td style="padding:8px;">Prix total forfait</td><td style="padding:8px;text-align:right;">{{prix_total}}</td></tr>
</table>
<div style="display:flex;gap:10px;margin-top:10px;"><div style="flex:1;background:#E8F5E9;padding:10px;border-radius:4px;"><strong>Inclus :</strong> {{inclus}}</div><div style="flex:1;background:#FFEBEE;padding:10px;border-radius:4px;"><strong>Non inclus :</strong> {{non_inclus}}</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 58,
  },

  {
    code: 'tour_convention_guide',
    name: 'Convention guide touristique',
    category: 'juridique_admin',
    description: "Convention de prestation entre une agence et un guide touristique",
    price: 800, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'agence_nom', label: "Nom de l'agence", type: 'text', required: true },
      { name: 'nom_guide', label: 'Nom du guide touristique', type: 'text', required: true },
      { name: 'specialite_guide', label: 'Spécialité / langue(s)', type: 'text', required: false },
      { name: 'date_debut', label: 'Date de début', type: 'date', required: true },
      { name: 'date_fin', label: 'Date de fin', type: 'date', required: true },
      { name: 'circuit', label: 'Circuit / zone géographique', type: 'text', required: true },
      { name: 'honoraires', label: 'Honoraires journaliers (FCFA)', type: 'text', required: true },
      { name: 'obligations_guide', label: 'Obligations du guide', type: 'textarea', required: false },
      { name: 'obligations_agence', label: "Obligations de l'agence", type: 'textarea', required: false },
      { name: 'lieu_signature', label: 'Lieu et date de signature', type: 'text', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#6c3483;border-bottom:3px solid #8e44ad;padding-bottom:8px;text-align:center;">CONVENTION DE PRESTATION — GUIDE TOURISTIQUE</h1>
<p>Entre <strong>{{agence_nom}}</strong> (l'agence) et <strong>{{nom_guide}}</strong> (le guide), spécialité : {{specialite_guide}}.</p>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#6c3483;color:white;"><th style="padding:8px;text-align:left;">Paramètre</th><th style="padding:8px;text-align:left;">Détail</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Période</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{date_debut}} au {{date_fin}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Circuit / Zone</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{circuit}}</td></tr>
<tr style="background:#F4ECF7;font-weight:bold;"><td style="padding:8px;">Honoraires / jour</td><td style="padding:8px;">{{honoraires}} FCFA</td></tr>
</table>
<div style="background:#F4ECF7;padding:10px;border-radius:4px;margin-bottom:10px;"><strong>Obligations du guide :</strong> {{obligations_guide}}</div>
<div style="background:#EBF5FB;padding:10px;border-radius:4px;margin-bottom:15px;"><strong>Obligations de l'agence :</strong> {{obligations_agence}}</div>
<p>Fait à {{lieu_signature}}.</p>
<div style="display:flex;justify-content:space-between;margin-top:15px;"><div><strong>L'agence</strong><br/>{{agence_nom}}<br/><br/>Signature : ___________</div><div><strong>Le guide</strong><br/>{{nom_guide}}<br/><br/>Signature : ___________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 45,
  },

  {
    code: 'tour_bon_reservation',
    name: "Bon de réservation hôtel",
    category: 'commercial_financier',
    description: "Bon de réservation officiel émis par l'hôtel au client",
    price: 300, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_hotel', label: "Nom de l'hôtel", type: 'text', required: true },
      { name: 'num_reservation', label: 'N° de réservation', type: 'text', required: true },
      { name: 'nom_client', label: 'Nom du client', type: 'text', required: true },
      { name: 'contact_client', label: 'Contact (tél / email)', type: 'text', required: false },
      { name: 'type_chambre', label: 'Type de chambre', type: 'text', required: true },
      { name: 'nb_nuits', label: 'Nombre de nuits', type: 'text', required: true },
      { name: 'date_arrivee', label: "Date d'arrivée", type: 'date', required: true },
      { name: 'date_depart', label: 'Date de départ', type: 'date', required: true },
      { name: 'montant_arrhes', label: "Arrhes versées (FCFA)", type: 'text', required: false },
      { name: 'montant_total', label: 'Montant total (FCFA)', type: 'text', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#1a5276;border-bottom:3px solid #2e86c1;padding-bottom:8px;">BON DE RÉSERVATION</h1>
<p style="background:#EBF5FB;padding:8px;border-radius:4px;"><strong>Hôtel :</strong> {{nom_hotel}} &nbsp;|&nbsp; <strong>Réservation N° :</strong> {{num_reservation}}</p>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#2e86c1;color:white;"><th colspan="2" style="padding:8px;">DÉTAILS DE LA RÉSERVATION</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;width:40%;">Client</td><td style="padding:7px 8px;border-bottom:1px solid #eee;font-weight:bold;">{{nom_client}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Contact</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{contact_client}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Chambre</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{type_chambre}} — {{nb_nuits}} nuit(s)</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Arrivée / Départ</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{date_arrivee}} / {{date_depart}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Arrhes versées</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{montant_arrhes}} FCFA</td></tr>
<tr style="background:#D6EAF8;font-weight:bold;"><td style="padding:8px;">Montant total</td><td style="padding:8px;">{{montant_total}} FCFA</td></tr>
</table>
<p style="color:#888;font-size:12px;text-align:center;">Ce bon de réservation est émis par {{nom_hotel}} et vaut confirmation de séjour.</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 72,
  },

  {
    code: 'tour_facture_prestation',
    name: 'Facture prestation touristique',
    category: 'commercial_financier',
    description: 'Facture pour prestation de service hôtelier ou touristique',
    price: 400, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_hotel', label: "Nom de l'établissement", type: 'text', required: true },
      { name: 'num_facture', label: 'N° facture', type: 'text', required: true },
      { name: 'date_facture', label: 'Date de facturation', type: 'date', required: true },
      { name: 'nom_client', label: 'Nom du client', type: 'text', required: true },
      { name: 'description_services', label: 'Description des prestations', type: 'textarea', required: true },
      { name: 'montant_ht', label: 'Montant HT (FCFA)', type: 'text', required: true },
      { name: 'tva', label: 'TVA (%)', type: 'text', required: false },
      { name: 'montant_tva', label: 'Montant TVA (FCFA)', type: 'text', required: false },
      { name: 'montant_ttc', label: 'Total TTC (FCFA)', type: 'text', required: true },
      { name: 'mode_paiement', label: 'Mode de paiement', type: 'text', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#1e8449;border-bottom:3px solid #27ae60;padding-bottom:8px;">FACTURE — PRESTATION TOURISTIQUE</h1>
<div style="display:flex;justify-content:space-between;margin-bottom:15px;">
<div><strong>{{nom_hotel}}</strong></div>
<div style="text-align:right;"><strong>Facture N° :</strong> {{num_facture}}<br/><strong>Date :</strong> {{date_facture}}</div>
</div>
<p><strong>Client :</strong> {{nom_client}}</p>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;margin:12px 0;"><strong>Prestations :</strong><br/>{{description_services}}</div>
<table style="width:100%;border-collapse:collapse;margin:12px 0;">
<tr style="background:#1e8449;color:white;"><th style="padding:8px;text-align:left;">Rubrique</th><th style="padding:8px;text-align:right;">Montant (FCFA)</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Montant HT</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{montant_ht}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">TVA ({{tva}}%)</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{montant_tva}}</td></tr>
<tr style="background:#D5F5E3;font-weight:bold;"><td style="padding:8px;">TOTAL TTC</td><td style="padding:8px;text-align:right;">{{montant_ttc}} FCFA</td></tr>
</table>
<p style="color:#555;font-size:13px;"><strong>Mode de paiement :</strong> {{mode_paiement}}</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 65,
  },

  {
    code: 'tour_charte_qualite',
    name: 'Charte qualité hôtelière',
    category: 'juridique_admin',
    description: "Document définissant les standards et engagements qualité de l'établissement hôtelier",
    price: 900, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_hotel', label: "Nom de l'hôtel", type: 'text', required: true },
      { name: 'categorie_hotel', label: 'Catégorie / classement (étoiles)', type: 'text', required: false },
      { name: 'directeur', label: 'Directeur de l\'établissement', type: 'text', required: true },
      { name: 'date_charte', label: 'Date de la charte', type: 'date', required: true },
      { name: 'engagements_accueil', label: "Engagements d'accueil", type: 'textarea', required: true },
      { name: 'engagements_service', label: 'Engagements de service', type: 'textarea', required: true },
      { name: 'engagements_hygiene', label: 'Engagements hygiène & sécurité', type: 'textarea', required: true },
      { name: 'procedure_reclamation', label: 'Procédure de réclamation', type: 'textarea', required: false },
      { name: 'revision_charte', label: 'Fréquence de révision', type: 'text', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#1a5276;border-bottom:3px solid #f39c12;padding-bottom:8px;text-align:center;">CHARTE QUALITÉ</h1>
<h2 style="color:#2e86c1;text-align:center;">{{nom_hotel}} — {{categorie_hotel}}</h2>
<p style="text-align:center;color:#555;">Arrêtée par : <strong>{{directeur}}</strong> — le {{date_charte}}</p>
<div style="background:#EBF5FB;padding:12px;border-radius:4px;margin:12px 0;border-left:4px solid #2e86c1;"><strong>Engagements d'accueil :</strong><br/>{{engagements_accueil}}</div>
<div style="background:#E8F8F5;padding:12px;border-radius:4px;margin:12px 0;border-left:4px solid #1e8449;"><strong>Engagements de service :</strong><br/>{{engagements_service}}</div>
<div style="background:#FEF9E7;padding:12px;border-radius:4px;margin:12px 0;border-left:4px solid #f39c12;"><strong>Hygiène & sécurité :</strong><br/>{{engagements_hygiene}}</div>
<div style="background:#F9EBEA;padding:10px;border-radius:4px;margin:10px 0;"><strong>Procédure de réclamation :</strong> {{procedure_reclamation}}</div>
<p style="color:#888;font-size:12px;">Révision : {{revision_charte}} — Signature Direction : _______________</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 48,
  },

  {
    code: 'tour_rapport_activite',
    name: "Rapport d'activité hôtel",
    category: 'commercial_financier',
    description: "Rapport périodique de l'activité commerciale et opérationnelle de l'hôtel",
    price: 700, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_hotel', label: "Nom de l'hôtel", type: 'text', required: true },
      { name: 'periode', label: 'Période du rapport', type: 'text', required: true },
      { name: 'taux_occupation', label: 'Taux d\'occupation (%)', type: 'text', required: true },
      { name: 'nuitees_vendues', label: 'Nuitées vendues', type: 'text', required: true },
      { name: 'revpar', label: 'RevPAR (FCFA)', type: 'text', required: false },
      { name: 'ca_hebergement', label: 'CA Hébergement (FCFA)', type: 'text', required: true },
      { name: 'ca_restauration', label: 'CA Restauration (FCFA)', type: 'text', required: false },
      { name: 'ca_total', label: 'Chiffre d\'affaires total (FCFA)', type: 'text', required: true },
      { name: 'faits_marquants', label: 'Faits marquants', type: 'textarea', required: false },
      { name: 'objectifs_periode_suivante', label: 'Objectifs période suivante', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#1a5276;border-bottom:3px solid #2e86c1;padding-bottom:8px;">RAPPORT D'ACTIVITÉ — {{nom_hotel}}</h1>
<p><strong>Période :</strong> {{periode}}</p>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#1a5276;color:white;"><th style="padding:8px;text-align:left;">Indicateur</th><th style="padding:8px;text-align:right;">Valeur</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Taux d'occupation</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{taux_occupation}} %</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Nuitées vendues</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{nuitees_vendues}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">RevPAR</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{revpar}} FCFA</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">CA Hébergement</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{ca_hebergement}} FCFA</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">CA Restauration</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{ca_restauration}} FCFA</td></tr>
<tr style="background:#D6EAF8;font-weight:bold;"><td style="padding:8px;">CA Total</td><td style="padding:8px;text-align:right;">{{ca_total}} FCFA</td></tr>
</table>
<div style="background:#F0F4F8;padding:10px;border-radius:4px;margin-bottom:10px;"><strong>Faits marquants :</strong> {{faits_marquants}}</div>
<div style="background:#E8F5E9;padding:10px;border-radius:4px;"><strong>Objectifs :</strong> {{objectifs_periode_suivante}}</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 50,
  },

  {
    code: 'tour_contrat_agence_voyage',
    name: "Contrat agence de voyage",
    category: 'juridique_admin',
    description: "Contrat liant une agence de voyage à ses clients pour la fourniture de services touristiques",
    price: 1000, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'agence_nom', label: "Nom de l'agence", type: 'text', required: true },
      { name: 'agence_adresse', label: "Adresse de l'agence", type: 'text', required: false },
      { name: 'nom_client', label: 'Nom du client', type: 'text', required: true },
      { name: 'destination', label: 'Destination', type: 'text', required: true },
      { name: 'dates_voyage', label: 'Dates du voyage', type: 'text', required: true },
      { name: 'prestations', label: 'Prestations incluses', type: 'textarea', required: true },
      { name: 'prix_total', label: 'Prix total (FCFA)', type: 'text', required: true },
      { name: 'acompte', label: 'Acompte à la réservation (FCFA)', type: 'text', required: false },
      { name: 'solde_due', label: 'Solde dû (FCFA)', type: 'text', required: false },
      { name: 'conditions_annulation', label: "Conditions d'annulation", type: 'textarea', required: false },
      { name: 'date_contrat', label: 'Date du contrat', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#1a5276;border-bottom:3px solid #2e86c1;padding-bottom:8px;text-align:center;">CONTRAT DE VOYAGE</h1>
<p><strong>Agence :</strong> {{agence_nom}} — {{agence_adresse}}</p>
<p><strong>Client :</strong> {{nom_client}} &nbsp;|&nbsp; <strong>Destination :</strong> {{destination}} &nbsp;|&nbsp; <strong>Dates :</strong> {{dates_voyage}}</p>
<div style="background:#EBF5FB;padding:12px;border-radius:4px;margin:12px 0;"><strong>Prestations incluses :</strong><br/>{{prestations}}</div>
<table style="width:100%;border-collapse:collapse;margin:12px 0;">
<tr style="background:#1a5276;color:white;"><th style="padding:8px;text-align:left;">Paiement</th><th style="padding:8px;text-align:right;">Montant (FCFA)</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Prix total</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{prix_total}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Acompte versé</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{acompte}}</td></tr>
<tr style="background:#FFF9C4;font-weight:bold;"><td style="padding:8px;">Solde dû</td><td style="padding:8px;text-align:right;">{{solde_due}}</td></tr>
</table>
<div style="background:#FFF9C4;padding:10px;border-radius:4px;margin-bottom:12px;"><strong>Conditions d'annulation :</strong> {{conditions_annulation}}</div>
<p>Fait le {{date_contrat}}.</p>
<div style="display:flex;justify-content:space-between;margin-top:15px;"><div><strong>L'agence</strong><br/>{{agence_nom}}<br/><br/>Signature : ___________</div><div><strong>Le client</strong><br/>{{nom_client}}<br/><br/>Signature : ___________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 55,
  },

  {
    code: 'tour_plan_evacuation',
    name: "Plan d'évacuation hôtel",
    category: 'juridique_admin',
    description: "Document réglementaire de plan d'évacuation et de sécurité incendie hôtelier",
    price: 500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_hotel', label: "Nom de l'hôtel", type: 'text', required: true },
      { name: 'adresse_hotel', label: "Adresse de l'hôtel", type: 'text', required: true },
      { name: 'responsable_securite', label: 'Responsable sécurité', type: 'text', required: true },
      { name: 'contact_urgence', label: "Contact d'urgence", type: 'text', required: true },
      { name: 'description_issues', label: 'Issues et sorties de secours', type: 'textarea', required: true },
      { name: 'point_rassemblement', label: 'Point de rassemblement', type: 'text', required: true },
      { name: 'procedure_evacuation', label: "Procédure d'évacuation", type: 'textarea', required: true },
      { name: 'equipements_securite', label: 'Équipements de sécurité disponibles', type: 'textarea', required: false },
      { name: 'date_mise_a_jour', label: 'Date de mise à jour', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#c0392b;border-bottom:3px solid #e74c3c;padding-bottom:8px;text-align:center;">PLAN D'ÉVACUATION — SÉCURITÉ INCENDIE</h1>
<p style="background:#FDEDEC;padding:8px;border-radius:4px;text-align:center;"><strong>{{nom_hotel}}</strong> — {{adresse_hotel}}</p>
<table style="width:100%;border-collapse:collapse;margin:12px 0;">
<tr style="background:#c0392b;color:white;"><th style="padding:8px;text-align:left;">Information</th><th style="padding:8px;text-align:left;">Détail</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Responsable sécurité</td><td style="padding:7px 8px;border-bottom:1px solid #eee;font-weight:bold;">{{responsable_securite}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Contact urgence</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{contact_urgence}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Point de rassemblement</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{point_rassemblement}}</td></tr>
</table>
<div style="background:#FDEDEC;padding:12px;border-radius:4px;margin:10px 0;border-left:4px solid #c0392b;"><strong>Sorties de secours :</strong><br/>{{description_issues}}</div>
<div style="background:#FEF9E7;padding:10px;border-radius:4px;margin:10px 0;"><strong>Procédure d'évacuation :</strong><br/>{{procedure_evacuation}}</div>
<div style="background:#F0F4F8;padding:10px;border-radius:4px;"><strong>Équipements :</strong> {{equipements_securite}}</div>
<p style="color:#888;font-size:12px;margin-top:10px;">Mise à jour : {{date_mise_a_jour}}</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 42,
  },

  {
    code: 'tour_reglement_interieur',
    name: 'Règlement intérieur établissement hôtelier',
    category: 'juridique_admin',
    description: "Règlement intérieur fixant les droits et obligations des clients et du personnel",
    price: 600, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_hotel', label: "Nom de l'hôtel", type: 'text', required: true },
      { name: 'directeur', label: 'Direction générale', type: 'text', required: true },
      { name: 'horaires_check', label: 'Horaires check-in / check-out', type: 'text', required: true },
      { name: 'regles_comportement', label: 'Règles de comportement', type: 'textarea', required: true },
      { name: 'regles_piscine_spa', label: 'Règles piscine / spa / espaces communs', type: 'textarea', required: false },
      { name: 'politique_animaux', label: 'Politique animaux de compagnie', type: 'text', required: false },
      { name: 'politique_fumeurs', label: 'Politique fumeurs', type: 'text', required: false },
      { name: 'responsabilites', label: 'Responsabilités et sanctions', type: 'textarea', required: false },
      { name: 'date_adoption', label: "Date d'adoption", type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#1a5276;border-bottom:3px solid #2e86c1;padding-bottom:8px;text-align:center;">RÈGLEMENT INTÉRIEUR</h1>
<h2 style="color:#2e86c1;text-align:center;">{{nom_hotel}}</h2>
<p style="text-align:center;color:#555;">Direction : {{directeur}} &nbsp;|&nbsp; En vigueur depuis le {{date_adoption}}</p>
<div style="background:#EBF5FB;padding:10px;border-radius:4px;margin:10px 0;"><strong>Horaires :</strong> Check-in / Check-out — {{horaires_check}}</div>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;margin:10px 0;"><strong>Règles de comportement :</strong><br/>{{regles_comportement}}</div>
<div style="background:#E8F8F5;padding:10px;border-radius:4px;margin:10px 0;"><strong>Piscine / Spa / Espaces communs :</strong><br/>{{regles_piscine_spa}}</div>
<table style="width:100%;border-collapse:collapse;margin:10px 0;">
<tr style="background:#1a5276;color:white;"><th colspan="2" style="padding:8px;">POLITIQUES SPÉCIFIQUES</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Animaux</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{politique_animaux}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Fumeurs</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{politique_fumeurs}}</td></tr>
</table>
<div style="background:#FFF9C4;padding:10px;border-radius:4px;"><strong>Responsabilités :</strong> {{responsabilites}}</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 44,
  },

  {
    code: 'tour_fiche_evaluation',
    name: 'Fiche évaluation séjour',
    category: 'communication',
    description: "Questionnaire de satisfaction client pour évaluer la qualité du séjour",
    price: 300, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_hotel', label: "Nom de l'hôtel", type: 'text', required: true },
      { name: 'nom_client', label: 'Nom du client (optionnel)', type: 'text', required: false },
      { name: 'date_sejour', label: 'Date du séjour', type: 'text', required: true },
      { name: 'note_accueil', label: 'Note accueil (1-5)', type: 'text', required: true },
      { name: 'note_chambre', label: 'Note chambre (1-5)', type: 'text', required: true },
      { name: 'note_restauration', label: 'Note restauration (1-5)', type: 'text', required: false },
      { name: 'note_proprete', label: 'Note propreté (1-5)', type: 'text', required: true },
      { name: 'note_service', label: 'Note service global (1-5)', type: 'text', required: true },
      { name: 'commentaires', label: 'Commentaires libres', type: 'textarea', required: false },
      { name: 'recommandation', label: 'Recommanderiez-vous cet hôtel ?', type: 'text', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#1a5276;border-bottom:3px solid #f39c12;padding-bottom:8px;text-align:center;">FICHE D'ÉVALUATION SÉJOUR</h1>
<p style="text-align:center;"><strong>{{nom_hotel}}</strong> — Séjour du {{date_sejour}}</p>
<p style="color:#555;font-size:13px;text-align:center;">Client : {{nom_client}}</p>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#f39c12;color:white;"><th style="padding:8px;text-align:left;">Critère</th><th style="padding:8px;text-align:center;">Note / 5</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Accueil & réception</td><td style="padding:7px 8px;text-align:center;border-bottom:1px solid #eee;font-weight:bold;">{{note_accueil}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Chambre & confort</td><td style="padding:7px 8px;text-align:center;border-bottom:1px solid #eee;font-weight:bold;">{{note_chambre}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Restauration</td><td style="padding:7px 8px;text-align:center;border-bottom:1px solid #eee;font-weight:bold;">{{note_restauration}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Propreté</td><td style="padding:7px 8px;text-align:center;border-bottom:1px solid #eee;font-weight:bold;">{{note_proprete}}</td></tr>
<tr style="background:#FEF9E7;font-weight:bold;"><td style="padding:8px;">Service global</td><td style="padding:8px;text-align:center;">{{note_service}}</td></tr>
</table>
<div style="background:#F0F4F8;padding:10px;border-radius:4px;margin:10px 0;"><strong>Commentaires :</strong> {{commentaires}}</div>
<p><strong>Recommandation :</strong> {{recommandation}}</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 60,
  },

  {
    code: 'tour_convention_partenariat',
    name: 'Convention partenariat tour-opérateur',
    category: 'juridique_admin',
    description: "Convention de partenariat commercial entre un hôtel et un tour-opérateur",
    price: 1200, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_hotel', label: "Nom de l'hôtel", type: 'text', required: true },
      { name: 'nom_tour_operateur', label: 'Nom du tour-opérateur', type: 'text', required: true },
      { name: 'date_convention', label: 'Date de la convention', type: 'date', required: true },
      { name: 'duree_validite', label: 'Durée de validité', type: 'text', required: true },
      { name: 'volume_chambres', label: 'Volume de chambres garanti', type: 'text', required: false },
      { name: 'tarifs_contractuels', label: 'Tarifs contractuels (FCFA)', type: 'textarea', required: true },
      { name: 'conditions_paiement', label: 'Conditions de paiement', type: 'textarea', required: true },
      { name: 'obligations_hotel', label: "Obligations de l'hôtel", type: 'textarea', required: false },
      { name: 'obligations_to', label: 'Obligations du tour-opérateur', type: 'textarea', required: false },
      { name: 'clause_resiliation', label: 'Clause de résiliation', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#1a5276;border-bottom:3px solid #2e86c1;padding-bottom:8px;text-align:center;">CONVENTION DE PARTENARIAT HÔTEL / TOUR-OPÉRATEUR</h1>
<p>Entre <strong>{{nom_hotel}}</strong> et <strong>{{nom_tour_operateur}}</strong></p>
<p><strong>Date :</strong> {{date_convention}} &nbsp;|&nbsp; <strong>Validité :</strong> {{duree_validite}}</p>
<div style="background:#EBF5FB;padding:12px;border-radius:4px;margin:10px 0;"><strong>Tarifs contractuels :</strong><br/>{{tarifs_contractuels}}</div>
<div style="background:#E8F8F5;padding:10px;border-radius:4px;margin:10px 0;"><strong>Conditions de paiement :</strong><br/>{{conditions_paiement}}</div>
<table style="width:100%;border-collapse:collapse;margin:10px 0;">
<tr style="background:#1a5276;color:white;"><th style="padding:8px;">Obligations hôtel</th><th style="padding:8px;">Obligations tour-opérateur</th></tr>
<tr><td style="padding:8px;border:1px solid #eee;vertical-align:top;">{{obligations_hotel}}</td><td style="padding:8px;border:1px solid #eee;vertical-align:top;">{{obligations_to}}</td></tr>
</table>
<div style="background:#FFF9C4;padding:10px;border-radius:4px;"><strong>Clause de résiliation :</strong> {{clause_resiliation}}</div>
<div style="display:flex;justify-content:space-between;margin-top:20px;"><div><strong>L'hôtel</strong><br/>{{nom_hotel}}<br/><br/>Signature : ___________</div><div><strong>Le tour-opérateur</strong><br/>{{nom_tour_operateur}}<br/><br/>Signature : ___________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 47,
  },

  {
    code: 'tour_lettre_confirmation',
    name: 'Lettre de confirmation réservation',
    category: 'communication',
    description: "Lettre officielle de confirmation de réservation envoyée au client",
    price: 300, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_hotel', label: "Nom de l'hôtel", type: 'text', required: true },
      { name: 'nom_client', label: 'Nom du client', type: 'text', required: true },
      { name: 'date_lettre', label: 'Date de la lettre', type: 'date', required: true },
      { name: 'num_reservation', label: 'N° de réservation', type: 'text', required: true },
      { name: 'type_chambre', label: 'Type de chambre', type: 'text', required: true },
      { name: 'date_arrivee', label: "Date d'arrivée", type: 'date', required: true },
      { name: 'date_depart', label: 'Date de départ', type: 'date', required: true },
      { name: 'montant_total', label: 'Montant total (FCFA)', type: 'text', required: true },
      { name: 'infos_complementaires', label: 'Informations complémentaires', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h2 style="color:#1a5276;border-bottom:2px solid #2e86c1;padding-bottom:6px;">{{nom_hotel}}</h2>
<p style="text-align:right;">Le {{date_lettre}}</p>
<p><strong>À l'attention de :</strong> {{nom_client}}</p>
<p style="font-size:15px;font-weight:bold;color:#1a5276;">CONFIRMATION DE RÉSERVATION N° {{num_reservation}}</p>
<p>Nous avons le plaisir de vous confirmer votre réservation aux conditions suivantes :</p>
<table style="width:100%;border-collapse:collapse;margin:12px 0;">
<tr style="background:#2e86c1;color:white;"><th style="padding:8px;text-align:left;">Détail</th><th style="padding:8px;text-align:left;">Information</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Type de chambre</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{type_chambre}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Arrivée / Départ</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{date_arrivee}} / {{date_depart}}</td></tr>
<tr style="background:#D6EAF8;font-weight:bold;"><td style="padding:8px;">Montant total</td><td style="padding:8px;">{{montant_total}} FCFA</td></tr>
</table>
<div style="background:#EBF5FB;padding:10px;border-radius:4px;margin:10px 0;">{{infos_complementaires}}</div>
<p>Nous vous souhaitons un agréable séjour et demeurons à votre disposition.</p>
<p style="margin-top:20px;"><strong>La Direction — {{nom_hotel}}</strong><br/><br/>Signature : _______________</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 75,
  },

  {
    code: 'tour_contrat_employe',
    name: 'Contrat employé hôtellerie',
    category: 'rh_emploi',
    description: "Contrat de travail spécifique au secteur hôtelier et de la restauration",
    price: 900, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_hotel', label: "Nom de l'établissement employeur", type: 'text', required: true },
      { name: 'nom_employe', label: "Nom de l'employé", type: 'text', required: true },
      { name: 'poste', label: 'Poste / Fonction', type: 'text', required: true },
      { name: 'type_contrat', label: 'Type de contrat (CDI/CDD)', type: 'text', required: true },
      { name: 'date_prise_fonction', label: 'Date de prise de fonction', type: 'date', required: true },
      { name: 'salaire_brut', label: 'Salaire brut mensuel (FCFA)', type: 'text', required: true },
      { name: 'horaires', label: 'Horaires de travail', type: 'text', required: true },
      { name: 'avantages', label: 'Avantages en nature (logement, repas)', type: 'textarea', required: false },
      { name: 'periode_essai', label: "Période d'essai", type: 'text', required: false },
      { name: 'lieu_signature', label: 'Lieu et date de signature', type: 'text', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#1a5276;border-bottom:3px solid #2e86c1;padding-bottom:8px;text-align:center;">CONTRAT DE TRAVAIL — SECTEUR HÔTELLERIE</h1>
<p>Entre <strong>{{nom_hotel}}</strong> (l'employeur) et <strong>{{nom_employe}}</strong> (l'employé), il est convenu ce qui suit :</p>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#1a5276;color:white;"><th style="padding:8px;text-align:left;">Clause</th><th style="padding:8px;text-align:left;">Détail</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Poste / Fonction</td><td style="padding:7px 8px;border-bottom:1px solid #eee;font-weight:bold;">{{poste}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Type de contrat</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{type_contrat}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Prise de fonction</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{date_prise_fonction}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Salaire brut mensuel</td><td style="padding:7px 8px;border-bottom:1px solid #eee;font-weight:bold;">{{salaire_brut}} FCFA</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Horaires</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{horaires}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Période d'essai</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{periode_essai}}</td></tr>
</table>
<div style="background:#E8F5E9;padding:10px;border-radius:4px;margin-bottom:15px;"><strong>Avantages en nature :</strong> {{avantages}}</div>
<p>Fait à {{lieu_signature}}.</p>
<div style="display:flex;justify-content:space-between;margin-top:15px;"><div><strong>L'employeur</strong><br/>{{nom_hotel}}<br/><br/>Signature : ___________</div><div><strong>L'employé</strong><br/>{{nom_employe}}<br/><br/>Signature : ___________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 52,
  },

  {
    code: 'tour_cahier_charges_restauration',
    name: 'Cahier des charges restauration',
    category: 'juridique_admin',
    description: "Document définissant les exigences et standards du service de restauration hôtelière",
    price: 800, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_hotel', label: "Nom de l'hôtel / restaurant", type: 'text', required: true },
      { name: 'chef_restauration', label: 'Responsable restauration', type: 'text', required: true },
      { name: 'date_document', label: 'Date du document', type: 'date', required: true },
      { name: 'types_services', label: 'Types de services proposés', type: 'textarea', required: true },
      { name: 'normes_hygiene', label: "Normes d'hygiène et sécurité alimentaire", type: 'textarea', required: true },
      { name: 'standards_service', label: 'Standards de service en salle', type: 'textarea', required: true },
      { name: 'gestion_stocks', label: 'Gestion des stocks et approvisionnement', type: 'textarea', required: false },
      { name: 'indicateurs_performance', label: 'Indicateurs de performance', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#1e8449;border-bottom:3px solid #27ae60;padding-bottom:8px;">CAHIER DES CHARGES — RESTAURATION</h1>
<p><strong>Établissement :</strong> {{nom_hotel}} &nbsp;|&nbsp; <strong>Responsable :</strong> {{chef_restauration}} &nbsp;|&nbsp; <strong>Date :</strong> {{date_document}}</p>
<div style="background:#E8F8F5;padding:12px;border-radius:4px;margin:10px 0;border-left:4px solid #27ae60;"><strong>Services proposés :</strong><br/>{{types_services}}</div>
<div style="background:#FEF9E7;padding:12px;border-radius:4px;margin:10px 0;border-left:4px solid #f39c12;"><strong>Normes hygiène & sécurité alimentaire :</strong><br/>{{normes_hygiene}}</div>
<div style="background:#EBF5FB;padding:12px;border-radius:4px;margin:10px 0;border-left:4px solid #2e86c1;"><strong>Standards de service :</strong><br/>{{standards_service}}</div>
<div style="background:#F0F4F8;padding:10px;border-radius:4px;margin:10px 0;"><strong>Gestion des stocks :</strong> {{gestion_stocks}}</div>
<div style="background:#E8F5E9;padding:10px;border-radius:4px;"><strong>Indicateurs de performance :</strong> {{indicateurs_performance}}</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 43,
  },

  {
    code: 'tour_programme_excursion',
    name: 'Programme excursion',
    category: 'communication',
    description: "Programme détaillé d'une excursion touristique organisée",
    price: 400, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'agence_nom', label: "Nom de l'agence / organisateur", type: 'text', required: true },
      { name: 'titre_excursion', label: "Titre de l'excursion", type: 'text', required: true },
      { name: 'date_excursion', label: "Date de l'excursion", type: 'date', required: true },
      { name: 'lieu_rdv', label: 'Lieu et heure de rendez-vous', type: 'text', required: true },
      { name: 'programme_detaille', label: 'Programme heure par heure', type: 'textarea', required: true },
      { name: 'sites_visites', label: 'Sites et attractions visités', type: 'textarea', required: true },
      { name: 'repas_prevus', label: 'Repas prévus', type: 'text', required: false },
      { name: 'materiel_requis', label: 'Matériel requis / conseils vestimentaires', type: 'text', required: false },
      { name: 'prix_excursion', label: "Prix de l'excursion (FCFA)", type: 'text', required: true },
      { name: 'guide_responsable', label: 'Guide responsable', type: 'text', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#1e8449;border-bottom:3px solid #27ae60;padding-bottom:8px;">PROGRAMME EXCURSION</h1>
<h2 style="color:#f39c12;">{{titre_excursion}}</h2>
<p><strong>Organisateur :</strong> {{agence_nom}} &nbsp;|&nbsp; <strong>Date :</strong> {{date_excursion}} &nbsp;|&nbsp; <strong>Guide :</strong> {{guide_responsable}}</p>
<p style="background:#EBF5FB;padding:8px;border-radius:4px;"><strong>Rendez-vous :</strong> {{lieu_rdv}}</p>
<div style="background:#E8F8F5;padding:12px;border-radius:4px;margin:10px 0;border-left:4px solid #27ae60;"><strong>Programme :</strong><br/>{{programme_detaille}}</div>
<div style="background:#FEF9E7;padding:10px;border-radius:4px;margin:10px 0;"><strong>Sites visités :</strong><br/>{{sites_visites}}</div>
<table style="width:100%;border-collapse:collapse;margin:10px 0;">
<tr style="background:#1e8449;color:white;"><th style="padding:8px;text-align:left;">Info pratique</th><th style="padding:8px;text-align:left;">Détail</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Repas</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{repas_prevus}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Matériel / Tenue</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{materiel_requis}}</td></tr>
<tr style="background:#D5F5E3;font-weight:bold;"><td style="padding:8px;">Prix</td><td style="padding:8px;">{{prix_excursion}} FCFA / personne</td></tr>
</table>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 57,
  },

  {
    code: 'tour_offre_commerciale_groupe',
    name: 'Offre commerciale groupe',
    category: 'commercial_financier',
    description: 'Proposition commerciale tarifée pour accueil de groupes (conférences, séminaires, voyages)',
    price: 600, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_hotel', label: "Nom de l'hôtel / établissement", type: 'text', required: true },
      { name: 'nom_prospect', label: 'Nom du prospect / entreprise', type: 'text', required: true },
      { name: 'date_offre', label: "Date de l'offre", type: 'date', required: true },
      { name: 'type_evenement', label: "Type d'événement (séminaire, congrès...)", type: 'text', required: true },
      { name: 'dates_sejour', label: 'Dates du séjour', type: 'text', required: true },
      { name: 'nombre_participants', label: 'Nombre de participants', type: 'text', required: true },
      { name: 'chambres_proposees', label: 'Chambres proposées', type: 'textarea', required: true },
      { name: 'salles_conference', label: 'Salles de conférence / équipements', type: 'textarea', required: false },
      { name: 'tarif_groupe', label: 'Tarif groupe par personne (FCFA)', type: 'text', required: true },
      { name: 'avantages_groupe', label: 'Avantages groupe inclus', type: 'textarea', required: false },
      { name: 'validite_offre', label: "Validité de l'offre", type: 'text', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#1a5276;border-bottom:3px solid #f39c12;padding-bottom:8px;">OFFRE COMMERCIALE GROUPE</h1>
<p><strong>De :</strong> {{nom_hotel}} &nbsp;|&nbsp; <strong>À :</strong> {{nom_prospect}} &nbsp;|&nbsp; <strong>Date :</strong> {{date_offre}}</p>
<p><strong>Événement :</strong> {{type_evenement}} &nbsp;|&nbsp; <strong>Dates :</strong> {{dates_sejour}} &nbsp;|&nbsp; <strong>Participants :</strong> {{nombre_participants}}</p>
<div style="background:#EBF5FB;padding:12px;border-radius:4px;margin:10px 0;"><strong>Hébergement proposé :</strong><br/>{{chambres_proposees}}</div>
<div style="background:#E8F8F5;padding:10px;border-radius:4px;margin:10px 0;"><strong>Salles & équipements :</strong><br/>{{salles_conference}}</div>
<table style="width:100%;border-collapse:collapse;margin:12px 0;">
<tr style="background:#f39c12;color:white;"><th style="padding:8px;text-align:left;">Tarification Groupe</th><th style="padding:8px;text-align:right;">Montant</th></tr>
<tr style="background:#FEF9E7;font-weight:bold;"><td style="padding:8px;">Tarif par personne</td><td style="padding:8px;text-align:right;">{{tarif_groupe}} FCFA</td></tr>
</table>
<div style="background:#FEF9E7;padding:10px;border-radius:4px;margin:10px 0;"><strong>Avantages inclus :</strong> {{avantages_groupe}}</div>
<p style="color:#888;font-size:12px;"><strong>Offre valable jusqu'au :</strong> {{validite_offre}}</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 53,
  },

  {
    code: 'tour_bilan_saison',
    name: 'Bilan saison touristique',
    category: 'commercial_financier',
    description: "Bilan analytique complet de la saison touristique de l'établissement",
    price: 800, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_hotel', label: "Nom de l'hôtel", type: 'text', required: true },
      { name: 'saison', label: 'Saison / Période analysée', type: 'text', required: true },
      { name: 'nb_arrivees', label: "Nombre d'arrivées clients", type: 'text', required: true },
      { name: 'nb_nuitees', label: 'Total nuitées', type: 'text', required: true },
      { name: 'taux_occupation_moyen', label: "Taux d'occupation moyen (%)", type: 'text', required: true },
      { name: 'ca_total', label: 'Chiffre d\'affaires total (FCFA)', type: 'text', required: true },
      { name: 'ca_hebergement', label: 'CA Hébergement (FCFA)', type: 'text', required: false },
      { name: 'ca_restauration', label: 'CA Restauration (FCFA)', type: 'text', required: false },
      { name: 'points_forts', label: 'Points forts de la saison', type: 'textarea', required: false },
      { name: 'axes_amelioration', label: "Axes d'amélioration", type: 'textarea', required: false },
      { name: 'objectifs_saison_suivante', label: 'Objectifs saison suivante', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#1a5276;border-bottom:3px solid #2e86c1;padding-bottom:8px;">BILAN SAISON TOURISTIQUE</h1>
<h2 style="color:#2e86c1;">{{nom_hotel}} — {{saison}}</h2>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#1a5276;color:white;"><th style="padding:8px;text-align:left;">Indicateur clé</th><th style="padding:8px;text-align:right;">Valeur</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Arrivées clients</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{nb_arrivees}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Total nuitées</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{nb_nuitees}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Taux d'occupation moyen</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{taux_occupation_moyen}} %</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">CA Hébergement</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{ca_hebergement}} FCFA</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">CA Restauration</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{ca_restauration}} FCFA</td></tr>
<tr style="background:#D6EAF8;font-weight:bold;"><td style="padding:8px;">CA Total</td><td style="padding:8px;text-align:right;">{{ca_total}} FCFA</td></tr>
</table>
<div style="display:flex;gap:10px;margin-top:10px;"><div style="flex:1;background:#E8F5E9;padding:10px;border-radius:4px;"><strong>Points forts :</strong><br/>{{points_forts}}</div><div style="flex:1;background:#FFEBEE;padding:10px;border-radius:4px;"><strong>Axes d'amélioration :</strong><br/>{{axes_amelioration}}</div></div>
<div style="background:#F0F4F8;padding:10px;border-radius:4px;margin-top:10px;"><strong>Objectifs saison suivante :</strong> {{objectifs_saison_suivante}}</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 49,
  },
];

async function main() {
  let created = 0;
  for (const t of templates) {
    const existing = await prisma.documentTemplate.findUnique({ where: { code: t.code } });
    if (existing) {
      await prisma.documentTemplate.update({ where: { code: t.code }, data: {
        name: t.name, category: t.category, description: t.description,
        price: t.price, currency: t.currency, fieldsJson: t.fieldsJson,
        body: t.body, countriesJson: t.countriesJson, active: t.active,
        popularity: t.popularity,
      }});
    } else {
      await prisma.documentTemplate.create({ data: t });
      created++;
    }
  }
  const total = await prisma.documentTemplate.count();
  console.log(`✅ Seed Tourisme terminé. Créés: ${created} — Total BDD: ${total}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
