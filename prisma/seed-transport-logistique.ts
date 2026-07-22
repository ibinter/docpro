import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const COUNTRIES = JSON.stringify(['CI','SN','CM','BJ','TG','BF','ML','GN','CD','CG','GA','NE','TD','MR']);

const templates = [
  {
    code: 'tlog_contrat_transport_marchandises',
    name: 'Contrat transport marchandises',
    category: 'juridique_admin',
    description: 'Contrat encadrant le transport de marchandises entre un expéditeur et un transporteur',
    price: 700, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_expediteur', label: 'Nom de l\'expéditeur', type: 'text', required: true },
      { name: 'adresse_expediteur', label: 'Adresse expéditeur', type: 'text', required: true },
      { name: 'nom_transporteur', label: 'Nom du transporteur', type: 'text', required: true },
      { name: 'adresse_transporteur', label: 'Adresse transporteur', type: 'text', required: true },
      { name: 'description_marchandises', label: 'Description des marchandises', type: 'textarea', required: true },
      { name: 'poids_total', label: 'Poids total (kg)', type: 'text', required: false },
      { name: 'lieu_chargement', label: 'Lieu de chargement', type: 'text', required: true },
      { name: 'lieu_livraison', label: 'Lieu de livraison', type: 'text', required: true },
      { name: 'date_chargement', label: 'Date de chargement', type: 'date', required: true },
      { name: 'prix_transport', label: 'Prix du transport (FCFA)', type: 'text', required: true },
      { name: 'modalites_paiement', label: 'Modalités de paiement', type: 'textarea', required: false },
      { name: 'date_contrat', label: 'Date du contrat', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1a3c5e;border-bottom:3px solid #2d6a9f;padding-bottom:10px;text-align:center;">CONTRAT DE TRANSPORT DE MARCHANDISES</h1>
<p style="color:#555;text-align:center;">Conclu le : <strong>{{date_contrat}}</strong></p>
<h2 style="color:#2d6a9f;margin-top:20px;">PARTIES</h2>
<table style="width:100%;border-collapse:collapse;margin:10px 0;">
<tr style="background:#1a3c5e;color:white;"><th style="padding:8px;text-align:left;">Rôle</th><th style="padding:8px;text-align:left;">Identité</th><th style="padding:8px;text-align:left;">Adresse</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #ddd;">Expéditeur</td><td style="padding:7px 8px;border-bottom:1px solid #ddd;">{{nom_expediteur}}</td><td style="padding:7px 8px;border-bottom:1px solid #ddd;">{{adresse_expediteur}}</td></tr>
<tr style="background:#f5f8fc;"><td style="padding:7px 8px;border-bottom:1px solid #ddd;">Transporteur</td><td style="padding:7px 8px;border-bottom:1px solid #ddd;">{{nom_transporteur}}</td><td style="padding:7px 8px;border-bottom:1px solid #ddd;">{{adresse_transporteur}}</td></tr>
</table>
<h2 style="color:#2d6a9f;margin-top:18px;">MARCHANDISES &amp; TRAJET</h2>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;margin-bottom:10px;"><strong>Description :</strong> {{description_marchandises}} &nbsp;|&nbsp; <strong>Poids :</strong> {{poids_total}} kg</div>
<p><strong>Chargement :</strong> {{lieu_chargement}} le {{date_chargement}} &nbsp;→&nbsp; <strong>Livraison :</strong> {{lieu_livraison}}</p>
<h2 style="color:#2d6a9f;margin-top:18px;">CONDITIONS FINANCIÈRES</h2>
<p><strong>Prix du transport :</strong> <span style="font-size:16px;font-weight:bold;color:#1a3c5e;">{{prix_transport}} FCFA</span></p>
<div style="background:#E8F5E9;padding:10px;border-radius:4px;"><strong>Modalités :</strong> {{modalites_paiement}}</div>
<p style="margin-top:28px;font-size:12px;color:#888;">Signatures des parties : _________________________ (Expéditeur) &nbsp;&nbsp; _________________________ (Transporteur)</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 72,
  },

  {
    code: 'tlog_lettre_voiture_nationale',
    name: 'Lettre de voiture nationale',
    category: 'juridique_admin',
    description: 'Document officiel accompagnant le transport de marchandises sur le territoire national',
    price: 400, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'numero_lv', label: 'Numéro de lettre de voiture', type: 'text', required: true },
      { name: 'date_emission', label: 'Date d\'émission', type: 'date', required: true },
      { name: 'nom_expediteur', label: 'Nom et adresse expéditeur', type: 'text', required: true },
      { name: 'nom_destinataire', label: 'Nom et adresse destinataire', type: 'text', required: true },
      { name: 'transporteur', label: 'Transporteur (société / nom)', type: 'text', required: true },
      { name: 'immatriculation_vehicule', label: 'Immatriculation véhicule', type: 'text', required: true },
      { name: 'nature_marchandises', label: 'Nature des marchandises', type: 'textarea', required: true },
      { name: 'nombre_colis', label: 'Nombre de colis', type: 'text', required: false },
      { name: 'poids_brut', label: 'Poids brut (kg)', type: 'text', required: false },
      { name: 'lieu_chargement', label: 'Lieu de chargement', type: 'text', required: true },
      { name: 'lieu_livraison', label: 'Lieu de livraison', type: 'text', required: true },
      { name: 'valeur_declaree', label: 'Valeur déclarée (FCFA)', type: 'text', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;border:2px solid #1a3c5e;">
<h1 style="color:#1a3c5e;text-align:center;border-bottom:2px solid #2d6a9f;padding-bottom:8px;">LETTRE DE VOITURE NATIONALE</h1>
<p style="text-align:center;color:#555;">N° <strong>{{numero_lv}}</strong> &nbsp;|&nbsp; Émise le : <strong>{{date_emission}}</strong></p>
<table style="width:100%;border-collapse:collapse;margin:14px 0;">
<tr style="background:#1a3c5e;color:white;"><th style="padding:8px;">Expéditeur</th><th style="padding:8px;">Destinataire</th><th style="padding:8px;">Transporteur</th></tr>
<tr><td style="padding:8px;border:1px solid #ccc;vertical-align:top;">{{nom_expediteur}}</td><td style="padding:8px;border:1px solid #ccc;vertical-align:top;">{{nom_destinataire}}</td><td style="padding:8px;border:1px solid #ccc;vertical-align:top;">{{transporteur}}<br/>Véhicule : <strong>{{immatriculation_vehicule}}</strong></td></tr>
</table>
<h2 style="color:#2d6a9f;">MARCHANDISES</h2>
<div style="background:#F0F4F8;padding:10px;border-radius:4px;margin-bottom:8px;">{{nature_marchandises}}</div>
<table style="width:100%;border-collapse:collapse;">
<tr style="background:#eef2f7;"><td style="padding:6px 8px;border:1px solid #ccc;"><strong>Colis :</strong> {{nombre_colis}}</td><td style="padding:6px 8px;border:1px solid #ccc;"><strong>Poids brut :</strong> {{poids_brut}} kg</td><td style="padding:6px 8px;border:1px solid #ccc;"><strong>Valeur :</strong> {{valeur_declaree}} FCFA</td></tr>
</table>
<p style="margin-top:12px;"><strong>De :</strong> {{lieu_chargement}} &nbsp;→&nbsp; <strong>À :</strong> {{lieu_livraison}}</p>
<div style="display:flex;justify-content:space-between;margin-top:30px;font-size:12px;color:#666;"><div>Signature expéditeur : _______________</div><div>Signature transporteur : _______________</div><div>Signature destinataire : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 80,
  },

  {
    code: 'tlog_bon_livraison_transporteur',
    name: 'Bon de livraison transporteur',
    category: 'gestion_projet',
    description: 'Bon de livraison attestant la remise des marchandises au destinataire',
    price: 300, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'numero_bl', label: 'Numéro BL', type: 'text', required: true },
      { name: 'date_livraison', label: 'Date de livraison', type: 'date', required: true },
      { name: 'nom_transporteur', label: 'Transporteur', type: 'text', required: true },
      { name: 'nom_chauffeur', label: 'Nom du chauffeur', type: 'text', required: false },
      { name: 'immatriculation', label: 'Immatriculation véhicule', type: 'text', required: false },
      { name: 'nom_destinataire', label: 'Nom du destinataire', type: 'text', required: true },
      { name: 'adresse_livraison', label: 'Adresse de livraison', type: 'text', required: true },
      { name: 'designation_marchandises', label: 'Désignation des marchandises', type: 'textarea', required: true },
      { name: 'quantite', label: 'Quantité / Nombre de colis', type: 'text', required: true },
      { name: 'observations', label: 'Observations / Réserves', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:22px;border:1px solid #ccc;">
<h1 style="color:#1a3c5e;border-bottom:2px solid #2d6a9f;padding-bottom:8px;">BON DE LIVRAISON N° {{numero_bl}}</h1>
<p><strong>Date :</strong> {{date_livraison}} &nbsp;|&nbsp; <strong>Transporteur :</strong> {{nom_transporteur}}</p>
<p><strong>Chauffeur :</strong> {{nom_chauffeur}} &nbsp;|&nbsp; <strong>Véhicule :</strong> {{immatriculation}}</p>
<h2 style="color:#2d6a9f;margin-top:14px;">DESTINATAIRE</h2>
<p><strong>{{nom_destinataire}}</strong><br/>{{adresse_livraison}}</p>
<h2 style="color:#2d6a9f;margin-top:14px;">MARCHANDISES LIVRÉES</h2>
<table style="width:100%;border-collapse:collapse;margin:10px 0;">
<tr style="background:#1a3c5e;color:white;"><th style="padding:8px;text-align:left;">Désignation</th><th style="padding:8px;text-align:center;">Quantité</th></tr>
<tr><td style="padding:8px;border-bottom:1px solid #eee;">{{designation_marchandises}}</td><td style="padding:8px;text-align:center;border-bottom:1px solid #eee;">{{quantite}}</td></tr>
</table>
<div style="background:#FFF9C4;padding:10px;border-radius:4px;margin-top:10px;"><strong>Observations / Réserves :</strong> {{observations}}</div>
<div style="display:flex;justify-content:space-between;margin-top:28px;font-size:12px;"><div>Signature chauffeur : _______________</div><div>Signature destinataire (avec cachet) : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 75,
  },

  {
    code: 'tlog_contrat_affretement_vehicule',
    name: 'Contrat affrètement véhicule',
    category: 'juridique_admin',
    description: 'Contrat de mise à disposition d\'un véhicule pour un transport spécifique',
    price: 800, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_freteur', label: 'Nom du fréteur (propriétaire)', type: 'text', required: true },
      { name: 'nom_affreteur', label: 'Nom de l\'affréteur (client)', type: 'text', required: true },
      { name: 'type_vehicule', label: 'Type de véhicule', type: 'text', required: true },
      { name: 'immatriculation', label: 'Immatriculation', type: 'text', required: true },
      { name: 'tonnage', label: 'Tonnage / Capacité', type: 'text', required: false },
      { name: 'trajet', label: 'Trajet (origine → destination)', type: 'text', required: true },
      { name: 'date_depart', label: 'Date de départ', type: 'date', required: true },
      { name: 'prix_affretement', label: 'Prix d\'affrètement (FCFA)', type: 'text', required: true },
      { name: 'avance', label: 'Avance versée (FCFA)', type: 'text', required: false },
      { name: 'conditions_particulieres', label: 'Conditions particulières', type: 'textarea', required: false },
      { name: 'date_signature', label: 'Date de signature', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1a3c5e;border-bottom:3px solid #2d6a9f;padding-bottom:10px;text-align:center;">CONTRAT D'AFFRÈTEMENT DE VÉHICULE</h1>
<p style="text-align:center;color:#555;">Signé le : <strong>{{date_signature}}</strong></p>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#1a3c5e;color:white;"><th style="padding:8px;">Fréteur</th><th style="padding:8px;">Affréteur</th></tr>
<tr><td style="padding:10px;border:1px solid #ccc;">{{nom_freteur}}</td><td style="padding:10px;border:1px solid #ccc;">{{nom_affreteur}}</td></tr>
</table>
<h2 style="color:#2d6a9f;">VÉHICULE</h2>
<p><strong>Type :</strong> {{type_vehicule}} &nbsp;|&nbsp; <strong>Immatriculation :</strong> {{immatriculation}} &nbsp;|&nbsp; <strong>Capacité :</strong> {{tonnage}}</p>
<h2 style="color:#2d6a9f;margin-top:14px;">TRAJET &amp; PRIX</h2>
<table style="width:100%;border-collapse:collapse;">
<tr style="background:#eef2f7;"><td style="padding:8px;border:1px solid #ccc;"><strong>Trajet :</strong> {{trajet}}</td><td style="padding:8px;border:1px solid #ccc;"><strong>Départ :</strong> {{date_depart}}</td></tr>
<tr><td style="padding:8px;border:1px solid #ccc;font-weight:bold;color:#1a3c5e;">Prix : {{prix_affretement}} FCFA</td><td style="padding:8px;border:1px solid #ccc;">Avance : {{avance}} FCFA</td></tr>
</table>
<div style="background:#F0F4F8;padding:10px;border-radius:4px;margin-top:12px;"><strong>Conditions particulières :</strong> {{conditions_particulieres}}</div>
<div style="display:flex;justify-content:space-between;margin-top:28px;"><div>Fréteur : _______________</div><div>Affréteur : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 65,
  },

  {
    code: 'tlog_convention_logistique_prestataire',
    name: 'Convention logistique prestataire',
    category: 'juridique_admin',
    description: 'Convention cadre entre une entreprise et un prestataire logistique',
    price: 900, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_client', label: 'Nom de l\'entreprise cliente', type: 'text', required: true },
      { name: 'nom_prestataire', label: 'Nom du prestataire logistique', type: 'text', required: true },
      { name: 'objet_convention', label: 'Objet de la convention', type: 'textarea', required: true },
      { name: 'prestations_incluses', label: 'Prestations incluses', type: 'textarea', required: true },
      { name: 'zone_couverture', label: 'Zone géographique couverte', type: 'text', required: false },
      { name: 'tarification', label: 'Tarification applicable (FCFA)', type: 'textarea', required: true },
      { name: 'duree_convention', label: 'Durée de la convention', type: 'text', required: true },
      { name: 'date_debut', label: 'Date de début', type: 'date', required: true },
      { name: 'penalites', label: 'Pénalités en cas de manquement', type: 'textarea', required: false },
      { name: 'lieu_signature', label: 'Lieu de signature', type: 'text', required: false },
      { name: 'date_signature', label: 'Date de signature', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1a3c5e;border-bottom:3px solid #2d6a9f;padding-bottom:10px;text-align:center;">CONVENTION LOGISTIQUE</h1>
<p style="text-align:center;">Entre <strong>{{nom_client}}</strong> et <strong>{{nom_prestataire}}</strong> — Signée le {{date_signature}} à {{lieu_signature}}</p>
<h2 style="color:#2d6a9f;margin-top:18px;">OBJET</h2>
<div style="background:#F0F4F8;padding:10px;border-radius:4px;">{{objet_convention}}</div>
<h2 style="color:#2d6a9f;margin-top:16px;">PRESTATIONS INCLUSES</h2>
<div style="background:#E8F5E9;padding:10px;border-radius:4px;">{{prestations_incluses}}</div>
<h2 style="color:#2d6a9f;margin-top:16px;">TARIFICATION &amp; DURÉE</h2>
<table style="width:100%;border-collapse:collapse;margin:8px 0;">
<tr style="background:#1a3c5e;color:white;"><th style="padding:8px;text-align:left;">Zone couverte</th><th style="padding:8px;text-align:left;">Durée</th><th style="padding:8px;text-align:left;">Début</th></tr>
<tr><td style="padding:8px;border-bottom:1px solid #eee;">{{zone_couverture}}</td><td style="padding:8px;border-bottom:1px solid #eee;">{{duree_convention}}</td><td style="padding:8px;border-bottom:1px solid #eee;">{{date_debut}}</td></tr>
</table>
<div style="background:#FFF9C4;padding:10px;border-radius:4px;margin-bottom:8px;"><strong>Tarification :</strong> {{tarification}}</div>
<div style="background:#FFF5F5;padding:10px;border-radius:4px;"><strong>Pénalités :</strong> {{penalites}}</div>
<div style="display:flex;justify-content:space-between;margin-top:28px;"><div>Client : _______________</div><div>Prestataire : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 60,
  },

  {
    code: 'tlog_contrat_chauffeur_livreur',
    name: 'Contrat chauffeur livreur',
    category: 'juridique_admin',
    description: 'Contrat de travail ou de prestation pour chauffeur-livreur',
    price: 600, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_employeur', label: 'Nom de l\'employeur / société', type: 'text', required: true },
      { name: 'nom_chauffeur', label: 'Nom du chauffeur-livreur', type: 'text', required: true },
      { name: 'date_naissance_chauffeur', label: 'Date de naissance', type: 'date', required: false },
      { name: 'numero_permis', label: 'Numéro de permis de conduire', type: 'text', required: true },
      { name: 'categorie_permis', label: 'Catégorie du permis', type: 'text', required: true },
      { name: 'type_contrat', label: 'Type de contrat (CDI/CDD/Prestation)', type: 'text', required: true },
      { name: 'remuneration', label: 'Rémunération mensuelle (FCFA)', type: 'text', required: true },
      { name: 'zone_livraison', label: 'Zone(s) de livraison', type: 'text', required: false },
      { name: 'date_debut', label: 'Date de début', type: 'date', required: true },
      { name: 'obligations_chauffeur', label: 'Obligations du chauffeur', type: 'textarea', required: false },
      { name: 'date_signature', label: 'Date de signature', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1a3c5e;border-bottom:3px solid #2d6a9f;padding-bottom:10px;text-align:center;">CONTRAT CHAUFFEUR-LIVREUR</h1>
<p style="text-align:center;">Type : <strong>{{type_contrat}}</strong> — Signé le {{date_signature}}</p>
<h2 style="color:#2d6a9f;margin-top:18px;">PARTIES</h2>
<table style="width:100%;border-collapse:collapse;margin:10px 0;">
<tr style="background:#1a3c5e;color:white;"><th style="padding:8px;">Employeur</th><th style="padding:8px;">Chauffeur-livreur</th></tr>
<tr><td style="padding:10px;border:1px solid #ccc;">{{nom_employeur}}</td><td style="padding:10px;border:1px solid #ccc;">{{nom_chauffeur}}<br/>Né(e) le : {{date_naissance_chauffeur}}</td></tr>
</table>
<h2 style="color:#2d6a9f;margin-top:14px;">PERMIS &amp; CONDITIONS</h2>
<p><strong>Permis N° :</strong> {{numero_permis}} — Catégorie : {{categorie_permis}}</p>
<p><strong>Zone de livraison :</strong> {{zone_livraison}} &nbsp;|&nbsp; <strong>Début :</strong> {{date_debut}}</p>
<p style="font-size:16px;font-weight:bold;color:#1a3c5e;">Rémunération : {{remuneration}} FCFA / mois</p>
<div style="background:#F0F4F8;padding:10px;border-radius:4px;margin-top:10px;"><strong>Obligations du chauffeur :</strong> {{obligations_chauffeur}}</div>
<div style="display:flex;justify-content:space-between;margin-top:28px;"><div>Employeur : _______________</div><div>Chauffeur : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 68,
  },

  {
    code: 'tlog_rapport_transport_incident',
    name: 'Rapport transport incident',
    category: 'gestion_projet',
    description: 'Rapport détaillé d\'un incident survenu lors d\'un transport de marchandises',
    price: 350, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'numero_rapport', label: 'Numéro de rapport', type: 'text', required: true },
      { name: 'date_incident', label: 'Date de l\'incident', type: 'date', required: true },
      { name: 'heure_incident', label: 'Heure de l\'incident', type: 'text', required: false },
      { name: 'lieu_incident', label: 'Lieu de l\'incident', type: 'text', required: true },
      { name: 'nom_chauffeur', label: 'Nom du chauffeur', type: 'text', required: true },
      { name: 'immatriculation', label: 'Véhicule impliqué', type: 'text', required: true },
      { name: 'nature_incident', label: 'Nature de l\'incident', type: 'text', required: true },
      { name: 'description_incident', label: 'Description détaillée', type: 'textarea', required: true },
      { name: 'dommages_constates', label: 'Dommages constatés', type: 'textarea', required: false },
      { name: 'mesures_prises', label: 'Mesures prises immédiatement', type: 'textarea', required: false },
      { name: 'redacteur', label: 'Rédacteur du rapport', type: 'text', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#b71c1c;border-bottom:3px solid #c62828;padding-bottom:10px;">RAPPORT D'INCIDENT TRANSPORT</h1>
<p><strong>N° Rapport :</strong> {{numero_rapport}} &nbsp;|&nbsp; <strong>Rédigé par :</strong> {{redacteur}}</p>
<table style="width:100%;border-collapse:collapse;margin:14px 0;">
<tr style="background:#b71c1c;color:white;"><th style="padding:8px;text-align:left;">Paramètre</th><th style="padding:8px;text-align:left;">Détail</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Date & heure</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{date_incident}} à {{heure_incident}}</td></tr>
<tr style="background:#fff5f5;"><td style="padding:7px 8px;border-bottom:1px solid #eee;">Lieu</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{lieu_incident}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Chauffeur</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{nom_chauffeur}}</td></tr>
<tr style="background:#fff5f5;"><td style="padding:7px 8px;border-bottom:1px solid #eee;">Véhicule</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{immatriculation}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;font-weight:bold;">Nature incident</td><td style="padding:7px 8px;border-bottom:1px solid #eee;font-weight:bold;color:#b71c1c;">{{nature_incident}}</td></tr>
</table>
<div style="background:#FFF5F5;padding:12px;border-left:4px solid #b71c1c;margin-bottom:10px;"><strong>Description :</strong><br/>{{description_incident}}</div>
<div style="background:#FFF9C4;padding:10px;border-radius:4px;margin-bottom:8px;"><strong>Dommages :</strong> {{dommages_constates}}</div>
<div style="background:#E8F5E9;padding:10px;border-radius:4px;"><strong>Mesures prises :</strong> {{mesures_prises}}</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 55,
  },

  {
    code: 'tlog_contrat_entrepot_logistique',
    name: 'Contrat entrepôt logistique',
    category: 'juridique_admin',
    description: 'Contrat de mise à disposition d\'un entrepôt pour stockage et logistique',
    price: 900, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_bailleur', label: 'Nom du bailleur (propriétaire)', type: 'text', required: true },
      { name: 'nom_locataire', label: 'Nom du locataire / exploitant', type: 'text', required: true },
      { name: 'adresse_entrepot', label: 'Adresse de l\'entrepôt', type: 'text', required: true },
      { name: 'superficie', label: 'Superficie (m²)', type: 'text', required: true },
      { name: 'loyer_mensuel', label: 'Loyer mensuel (FCFA)', type: 'text', required: true },
      { name: 'depot_garantie', label: 'Dépôt de garantie (FCFA)', type: 'text', required: false },
      { name: 'date_debut', label: 'Date de début', type: 'date', required: true },
      { name: 'duree_contrat', label: 'Durée du contrat', type: 'text', required: true },
      { name: 'usages_autorises', label: 'Usages autorisés', type: 'textarea', required: false },
      { name: 'charges_locataire', label: 'Charges à la charge du locataire', type: 'textarea', required: false },
      { name: 'date_signature', label: 'Date de signature', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1a3c5e;border-bottom:3px solid #2d6a9f;padding-bottom:10px;text-align:center;">CONTRAT DE LOCATION D'ENTREPÔT LOGISTIQUE</h1>
<p style="text-align:center;color:#555;">Conclu le {{date_signature}}</p>
<table style="width:100%;border-collapse:collapse;margin:14px 0;">
<tr style="background:#1a3c5e;color:white;"><th style="padding:8px;">Bailleur</th><th style="padding:8px;">Locataire</th></tr>
<tr><td style="padding:10px;border:1px solid #ccc;">{{nom_bailleur}}</td><td style="padding:10px;border:1px solid #ccc;">{{nom_locataire}}</td></tr>
</table>
<h2 style="color:#2d6a9f;margin-top:14px;">ENTREPÔT</h2>
<p><strong>Adresse :</strong> {{adresse_entrepot}} &nbsp;|&nbsp; <strong>Superficie :</strong> {{superficie}} m²</p>
<table style="width:100%;border-collapse:collapse;margin:12px 0;">
<tr style="background:#eef2f7;"><td style="padding:8px;border:1px solid #ccc;"><strong>Loyer :</strong> {{loyer_mensuel}} FCFA/mois</td><td style="padding:8px;border:1px solid #ccc;"><strong>Garantie :</strong> {{depot_garantie}} FCFA</td><td style="padding:8px;border:1px solid #ccc;"><strong>Durée :</strong> {{duree_contrat}}</td></tr>
</table>
<p><strong>Début :</strong> {{date_debut}}</p>
<div style="background:#E8F5E9;padding:10px;border-radius:4px;margin-bottom:8px;"><strong>Usages autorisés :</strong> {{usages_autorises}}</div>
<div style="background:#FFF9C4;padding:10px;border-radius:4px;"><strong>Charges locataire :</strong> {{charges_locataire}}</div>
<div style="display:flex;justify-content:space-between;margin-top:28px;"><div>Bailleur : _______________</div><div>Locataire : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 58,
  },

  {
    code: 'tlog_plan_tournee_livraison',
    name: 'Plan tournée livraison',
    category: 'gestion_projet',
    description: 'Plan d\'organisation des tournées de livraison pour optimiser les itinéraires',
    price: 400, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'responsable_tournee', label: 'Responsable de tournée', type: 'text', required: true },
      { name: 'date_tournee', label: 'Date de tournée', type: 'date', required: true },
      { name: 'nom_chauffeur', label: 'Chauffeur assigné', type: 'text', required: true },
      { name: 'vehicule', label: 'Véhicule (immatriculation)', type: 'text', required: true },
      { name: 'heure_depart', label: 'Heure de départ', type: 'text', required: false },
      { name: 'liste_arrets', label: 'Liste des arrêts (ordre, lieu, client)', type: 'textarea', required: true },
      { name: 'nombre_livraisons', label: 'Nombre de livraisons prévues', type: 'text', required: true },
      { name: 'km_prevus', label: 'Kilométrage prévu', type: 'text', required: false },
      { name: 'observations', label: 'Observations / Instructions', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:22px;">
<h1 style="color:#1a3c5e;border-bottom:2px solid #2d6a9f;padding-bottom:8px;">PLAN DE TOURNÉE DE LIVRAISON</h1>
<p><strong>Date :</strong> {{date_tournee}} &nbsp;|&nbsp; <strong>Responsable :</strong> {{responsable_tournee}}</p>
<table style="width:100%;border-collapse:collapse;margin:12px 0;">
<tr style="background:#1a3c5e;color:white;"><th style="padding:8px;text-align:left;">Chauffeur</th><th style="padding:8px;text-align:left;">Véhicule</th><th style="padding:8px;text-align:left;">Départ</th><th style="padding:8px;text-align:left;">Livraisons</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{nom_chauffeur}}</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{vehicule}}</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{heure_depart}}</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{nombre_livraisons}}</td></tr>
</table>
<h2 style="color:#2d6a9f;margin-top:14px;">ARRÊTS PLANIFIÉS</h2>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;white-space:pre-line;">{{liste_arrets}}</div>
<p style="margin-top:10px;"><strong>Kilométrage prévu :</strong> {{km_prevus}} km</p>
<div style="background:#FFF9C4;padding:10px;border-radius:4px;margin-top:8px;"><strong>Instructions :</strong> {{observations}}</div>
<p style="margin-top:20px;font-size:12px;color:#888;">Visa responsable : _______________&nbsp;&nbsp; Retour chauffeur (km réels, incidents) : _______________</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 62,
  },

  {
    code: 'tlog_fiche_suivi_vehicule',
    name: 'Fiche suivi véhicule',
    category: 'gestion_projet',
    description: 'Fiche de suivi de l\'état, de l\'entretien et des kilométrages d\'un véhicule',
    price: 300, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'immatriculation', label: 'Immatriculation', type: 'text', required: true },
      { name: 'marque_modele', label: 'Marque / Modèle', type: 'text', required: true },
      { name: 'annee_fabrication', label: 'Année de fabrication', type: 'text', required: false },
      { name: 'nom_responsable', label: 'Responsable / Chauffeur attitré', type: 'text', required: false },
      { name: 'date_fiche', label: 'Date de mise à jour', type: 'date', required: true },
      { name: 'kilometrage_actuel', label: 'Kilométrage actuel', type: 'text', required: true },
      { name: 'derniere_vidange', label: 'Dernière vidange (km / date)', type: 'text', required: false },
      { name: 'prochaine_revision', label: 'Prochaine révision prévue', type: 'text', required: false },
      { name: 'etat_general', label: 'État général du véhicule', type: 'text', required: false },
      { name: 'pannes_incidents', label: 'Pannes / incidents récents', type: 'textarea', required: false },
      { name: 'travaux_effectues', label: 'Travaux effectués', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:22px;">
<h1 style="color:#1a3c5e;border-bottom:2px solid #2d6a9f;padding-bottom:8px;">FICHE DE SUIVI VÉHICULE</h1>
<table style="width:100%;border-collapse:collapse;margin:12px 0;">
<tr style="background:#1a3c5e;color:white;"><th style="padding:8px;text-align:left;">Immat.</th><th style="padding:8px;text-align:left;">Marque / Modèle</th><th style="padding:8px;text-align:left;">Année</th><th style="padding:8px;text-align:left;">Responsable</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;font-weight:bold;">{{immatriculation}}</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{marque_modele}}</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{annee_fabrication}}</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{nom_responsable}}</td></tr>
</table>
<p><strong>Mise à jour :</strong> {{date_fiche}} &nbsp;|&nbsp; <strong>Kilométrage :</strong> {{kilometrage_actuel}} km</p>
<table style="width:100%;border-collapse:collapse;margin:10px 0;">
<tr style="background:#eef2f7;"><td style="padding:8px;border:1px solid #ccc;"><strong>Dernière vidange :</strong> {{derniere_vidange}}</td><td style="padding:8px;border:1px solid #ccc;"><strong>Prochaine révision :</strong> {{prochaine_revision}}</td><td style="padding:8px;border:1px solid #ccc;"><strong>État :</strong> {{etat_general}}</td></tr>
</table>
<div style="background:#FFF5F5;padding:10px;border-radius:4px;margin-bottom:8px;"><strong>Pannes / incidents :</strong> {{pannes_incidents}}</div>
<div style="background:#E8F5E9;padding:10px;border-radius:4px;"><strong>Travaux effectués :</strong> {{travaux_effectues}}</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 58,
  },

  {
    code: 'tlog_contrat_location_camion',
    name: 'Contrat location camion',
    category: 'juridique_admin',
    description: 'Contrat de location d\'un camion entre propriétaire et locataire',
    price: 700, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_loueur', label: 'Nom du loueur (propriétaire)', type: 'text', required: true },
      { name: 'nom_locataire', label: 'Nom du locataire', type: 'text', required: true },
      { name: 'marque_camion', label: 'Marque / Modèle du camion', type: 'text', required: true },
      { name: 'immatriculation', label: 'Immatriculation', type: 'text', required: true },
      { name: 'tonnage', label: 'Tonnage de charge utile', type: 'text', required: false },
      { name: 'date_debut_location', label: 'Date de début', type: 'date', required: true },
      { name: 'date_fin_location', label: 'Date de fin prévue', type: 'date', required: true },
      { name: 'loyer_journalier', label: 'Loyer journalier (FCFA)', type: 'text', required: true },
      { name: 'caution', label: 'Caution versée (FCFA)', type: 'text', required: false },
      { name: 'km_inclus', label: 'Kilométrage inclus / jour', type: 'text', required: false },
      { name: 'responsabilites_locataire', label: 'Responsabilités du locataire', type: 'textarea', required: false },
      { name: 'date_signature', label: 'Date de signature', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1a3c5e;border-bottom:3px solid #2d6a9f;padding-bottom:10px;text-align:center;">CONTRAT DE LOCATION DE CAMION</h1>
<p style="text-align:center;color:#555;">Signé le : <strong>{{date_signature}}</strong></p>
<table style="width:100%;border-collapse:collapse;margin:14px 0;">
<tr style="background:#1a3c5e;color:white;"><th style="padding:8px;">Loueur</th><th style="padding:8px;">Locataire</th></tr>
<tr><td style="padding:10px;border:1px solid #ccc;">{{nom_loueur}}</td><td style="padding:10px;border:1px solid #ccc;">{{nom_locataire}}</td></tr>
</table>
<h2 style="color:#2d6a9f;">VÉHICULE LOUÉ</h2>
<p><strong>{{marque_camion}}</strong> — Immat. : {{immatriculation}} — Tonnage : {{tonnage}}</p>
<table style="width:100%;border-collapse:collapse;margin:12px 0;">
<tr style="background:#eef2f7;"><td style="padding:8px;border:1px solid #ccc;"><strong>Début :</strong> {{date_debut_location}}</td><td style="padding:8px;border:1px solid #ccc;"><strong>Fin prévue :</strong> {{date_fin_location}}</td><td style="padding:8px;border:1px solid #ccc;"><strong>Loyer/j :</strong> {{loyer_journalier}} FCFA</td></tr>
<tr><td style="padding:8px;border:1px solid #ccc;" colspan="2"><strong>Caution :</strong> {{caution}} FCFA</td><td style="padding:8px;border:1px solid #ccc;"><strong>Km inclus :</strong> {{km_inclus}}</td></tr>
</table>
<div style="background:#F0F4F8;padding:10px;border-radius:4px;"><strong>Responsabilités locataire :</strong> {{responsabilites_locataire}}</div>
<div style="display:flex;justify-content:space-between;margin-top:28px;"><div>Loueur : _______________</div><div>Locataire : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 63,
  },

  {
    code: 'tlog_accord_cross_docking',
    name: 'Accord cross-docking',
    category: 'juridique_admin',
    description: 'Accord opérationnel de cross-docking entre fournisseur, plateforme et distributeur',
    price: 1000, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_fournisseur', label: 'Nom du fournisseur', type: 'text', required: true },
      { name: 'nom_plateforme', label: 'Nom de la plateforme logistique', type: 'text', required: true },
      { name: 'nom_distributeur', label: 'Nom du distributeur / client', type: 'text', required: true },
      { name: 'adresse_plateforme', label: 'Adresse de la plateforme', type: 'text', required: true },
      { name: 'flux_produits', label: 'Flux de produits concernés', type: 'textarea', required: true },
      { name: 'frequence_passage', label: 'Fréquence des passages', type: 'text', required: false },
      { name: 'delai_traitement', label: 'Délai de traitement (heures)', type: 'text', required: false },
      { name: 'tarif_prestation', label: 'Tarif prestation (FCFA)', type: 'text', required: true },
      { name: 'duree_accord', label: 'Durée de l\'accord', type: 'text', required: true },
      { name: 'date_signature', label: 'Date de signature', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1a3c5e;border-bottom:3px solid #2d6a9f;padding-bottom:10px;text-align:center;">ACCORD DE CROSS-DOCKING</h1>
<p style="text-align:center;color:#555;">Signé le : <strong>{{date_signature}}</strong> — Durée : {{duree_accord}}</p>
<table style="width:100%;border-collapse:collapse;margin:14px 0;">
<tr style="background:#1a3c5e;color:white;"><th style="padding:8px;">Fournisseur</th><th style="padding:8px;">Plateforme</th><th style="padding:8px;">Distributeur</th></tr>
<tr><td style="padding:10px;border:1px solid #ccc;">{{nom_fournisseur}}</td><td style="padding:10px;border:1px solid #ccc;">{{nom_plateforme}}<br/><small>{{adresse_plateforme}}</small></td><td style="padding:10px;border:1px solid #ccc;">{{nom_distributeur}}</td></tr>
</table>
<h2 style="color:#2d6a9f;margin-top:14px;">FLUX &amp; CONDITIONS OPÉRATIONNELLES</h2>
<div style="background:#F0F4F8;padding:10px;border-radius:4px;margin-bottom:8px;"><strong>Produits :</strong> {{flux_produits}}</div>
<table style="width:100%;border-collapse:collapse;margin:8px 0;">
<tr style="background:#eef2f7;"><td style="padding:8px;border:1px solid #ccc;"><strong>Fréquence :</strong> {{frequence_passage}}</td><td style="padding:8px;border:1px solid #ccc;"><strong>Délai traitement :</strong> {{delai_traitement}} h</td><td style="padding:8px;border:1px solid #ccc;font-weight:bold;color:#1a3c5e;"><strong>Tarif :</strong> {{tarif_prestation}} FCFA</td></tr>
</table>
<div style="display:flex;justify-content:space-between;margin-top:28px;font-size:12px;"><div>Fournisseur : _______________</div><div>Plateforme : _______________</div><div>Distributeur : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 45,
  },

  {
    code: 'tlog_convention_rep_commercial_itinerant',
    name: 'Convention représentant commercial itinérant',
    category: 'commercial_financier',
    description: 'Convention encadrant la mission d\'un représentant commercial itinérant',
    price: 700, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_mandant', label: 'Nom de la société mandante', type: 'text', required: true },
      { name: 'nom_representant', label: 'Nom du représentant', type: 'text', required: true },
      { name: 'zone_prospection', label: 'Zone de prospection', type: 'text', required: true },
      { name: 'produits_services', label: 'Produits / services à commercialiser', type: 'textarea', required: true },
      { name: 'taux_commission', label: 'Taux de commission (%)', type: 'text', required: true },
      { name: 'fixe_mensuel', label: 'Fixe mensuel (FCFA, si applicable)', type: 'text', required: false },
      { name: 'frais_deplacement', label: 'Prise en charge frais déplacement', type: 'text', required: false },
      { name: 'objectifs_vente', label: 'Objectifs de vente', type: 'textarea', required: false },
      { name: 'duree_convention', label: 'Durée de la convention', type: 'text', required: true },
      { name: 'date_signature', label: 'Date de signature', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1a3c5e;border-bottom:3px solid #2d6a9f;padding-bottom:10px;text-align:center;">CONVENTION REPRÉSENTANT COMMERCIAL ITINÉRANT</h1>
<p style="text-align:center;">Entre <strong>{{nom_mandant}}</strong> et <strong>{{nom_representant}}</strong> — Signée le {{date_signature}}</p>
<h2 style="color:#2d6a9f;margin-top:16px;">MISSION</h2>
<p><strong>Zone :</strong> {{zone_prospection}} &nbsp;|&nbsp; <strong>Durée :</strong> {{duree_convention}}</p>
<div style="background:#F0F4F8;padding:10px;border-radius:4px;margin-bottom:10px;"><strong>Produits/services :</strong> {{produits_services}}</div>
<h2 style="color:#2d6a9f;margin-top:14px;">RÉMUNÉRATION</h2>
<table style="width:100%;border-collapse:collapse;margin:8px 0;">
<tr style="background:#1a3c5e;color:white;"><th style="padding:8px;">Commission</th><th style="padding:8px;">Fixe mensuel</th><th style="padding:8px;">Frais déplacement</th></tr>
<tr><td style="padding:8px;border:1px solid #ccc;text-align:center;font-weight:bold;">{{taux_commission}} %</td><td style="padding:8px;border:1px solid #ccc;text-align:center;">{{fixe_mensuel}} FCFA</td><td style="padding:8px;border:1px solid #ccc;text-align:center;">{{frais_deplacement}}</td></tr>
</table>
<div style="background:#E8F5E9;padding:10px;border-radius:4px;margin-top:8px;"><strong>Objectifs :</strong> {{objectifs_vente}}</div>
<div style="display:flex;justify-content:space-between;margin-top:28px;"><div>Mandant : _______________</div><div>Représentant : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 52,
  },

  {
    code: 'tlog_contrat_commissionnaire_transport',
    name: 'Contrat commissionnaire transport',
    category: 'juridique_admin',
    description: 'Contrat entre un commissionnaire de transport et son client donneur d\'ordre',
    price: 900, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_commissionnaire', label: 'Nom du commissionnaire', type: 'text', required: true },
      { name: 'numero_agrement', label: 'N° d\'agrément ou licence', type: 'text', required: false },
      { name: 'nom_donneur_ordre', label: 'Nom du donneur d\'ordre (client)', type: 'text', required: true },
      { name: 'nature_operations', label: 'Nature des opérations confiées', type: 'textarea', required: true },
      { name: 'origine_destination', label: 'Origine et destination des envois', type: 'text', required: true },
      { name: 'honoraires', label: 'Honoraires / commission (FCFA ou %)', type: 'text', required: true },
      { name: 'responsabilite_commissionnaire', label: 'Étendue de responsabilité', type: 'textarea', required: false },
      { name: 'duree_contrat', label: 'Durée du contrat', type: 'text', required: true },
      { name: 'date_signature', label: 'Date de signature', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1a3c5e;border-bottom:3px solid #2d6a9f;padding-bottom:10px;text-align:center;">CONTRAT DE COMMISSIONNAIRE DE TRANSPORT</h1>
<p style="text-align:center;color:#555;">Signé le {{date_signature}} — Durée : {{duree_contrat}}</p>
<table style="width:100%;border-collapse:collapse;margin:14px 0;">
<tr style="background:#1a3c5e;color:white;"><th style="padding:8px;">Commissionnaire</th><th style="padding:8px;">Donneur d'ordre</th></tr>
<tr><td style="padding:10px;border:1px solid #ccc;">{{nom_commissionnaire}}<br/><small>Agrément : {{numero_agrement}}</small></td><td style="padding:10px;border:1px solid #ccc;">{{nom_donneur_ordre}}</td></tr>
</table>
<h2 style="color:#2d6a9f;margin-top:14px;">OBJET &amp; CONDITIONS</h2>
<div style="background:#F0F4F8;padding:10px;border-radius:4px;margin-bottom:8px;"><strong>Opérations :</strong> {{nature_operations}}</div>
<p><strong>Origine/destination :</strong> {{origine_destination}}</p>
<p><strong>Honoraires :</strong> <span style="font-weight:bold;color:#1a3c5e;font-size:15px;">{{honoraires}}</span></p>
<div style="background:#FFF9C4;padding:10px;border-radius:4px;"><strong>Responsabilité :</strong> {{responsabilite_commissionnaire}}</div>
<div style="display:flex;justify-content:space-between;margin-top:28px;"><div>Commissionnaire : _______________</div><div>Donneur d'ordre : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 48,
  },

  {
    code: 'tlog_rapport_bilan_flotte',
    name: 'Rapport bilan flotte',
    category: 'gestion_projet',
    description: 'Rapport périodique de bilan sur la gestion et performance de la flotte de véhicules',
    price: 500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_responsable', label: 'Responsable flotte', type: 'text', required: true },
      { name: 'periode_bilan', label: 'Période du bilan', type: 'text', required: true },
      { name: 'nombre_vehicules', label: 'Nombre de véhicules actifs', type: 'text', required: true },
      { name: 'km_total_parcourus', label: 'Km totaux parcourus', type: 'text', required: true },
      { name: 'cout_carburant', label: 'Coût carburant total (FCFA)', type: 'text', required: false },
      { name: 'cout_maintenance', label: 'Coût maintenance (FCFA)', type: 'text', required: false },
      { name: 'incidents_pannes', label: 'Nombre d\'incidents / pannes', type: 'text', required: false },
      { name: 'taux_disponibilite', label: 'Taux de disponibilité (%)', type: 'text', required: false },
      { name: 'vehicules_immobilises', label: 'Véhicules immobilisés (raisons)', type: 'textarea', required: false },
      { name: 'recommandations', label: 'Recommandations', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:22px;">
<h1 style="color:#1a3c5e;border-bottom:2px solid #2d6a9f;padding-bottom:8px;">RAPPORT BILAN FLOTTE</h1>
<p><strong>Responsable :</strong> {{nom_responsable}} &nbsp;|&nbsp; <strong>Période :</strong> {{periode_bilan}}</p>
<table style="width:100%;border-collapse:collapse;margin:14px 0;">
<tr style="background:#1a3c5e;color:white;"><th style="padding:8px;text-align:left;">Indicateur</th><th style="padding:8px;text-align:right;">Valeur</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Véhicules actifs</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{nombre_vehicules}}</td></tr>
<tr style="background:#f5f8fc;"><td style="padding:7px 8px;border-bottom:1px solid #eee;">Km totaux parcourus</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{km_total_parcourus}} km</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Coût carburant</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{cout_carburant}} FCFA</td></tr>
<tr style="background:#f5f8fc;"><td style="padding:7px 8px;border-bottom:1px solid #eee;">Coût maintenance</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{cout_maintenance}} FCFA</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Incidents / Pannes</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{incidents_pannes}}</td></tr>
<tr style="background:#FFF9C4;font-weight:bold;"><td style="padding:8px;">Taux de disponibilité</td><td style="padding:8px;text-align:right;">{{taux_disponibilite}} %</td></tr>
</table>
<div style="background:#FFF5F5;padding:10px;border-radius:4px;margin-bottom:8px;"><strong>Véhicules immobilisés :</strong> {{vehicules_immobilises}}</div>
<div style="background:#E8F5E9;padding:10px;border-radius:4px;"><strong>Recommandations :</strong> {{recommandations}}</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 55,
  },

  {
    code: 'tlog_contrat_maintenance_vehicules',
    name: 'Contrat maintenance véhicules',
    category: 'juridique_admin',
    description: 'Contrat de maintenance préventive et corrective d\'une flotte de véhicules',
    price: 800, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_client', label: 'Nom du client (propriétaire flotte)', type: 'text', required: true },
      { name: 'nom_garage', label: 'Nom du garage / prestataire', type: 'text', required: true },
      { name: 'vehicules_couverts', label: 'Véhicules couverts', type: 'textarea', required: true },
      { name: 'prestations_incluses', label: 'Prestations incluses', type: 'textarea', required: true },
      { name: 'periodicite_entretien', label: 'Périodicité d\'entretien', type: 'text', required: false },
      { name: 'prix_mensuel', label: 'Prix mensuel forfaitaire (FCFA)', type: 'text', required: true },
      { name: 'delai_intervention', label: 'Délai d\'intervention garanti (h)', type: 'text', required: false },
      { name: 'duree_contrat', label: 'Durée du contrat', type: 'text', required: true },
      { name: 'date_debut', label: 'Date de début', type: 'date', required: true },
      { name: 'date_signature', label: 'Date de signature', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1a3c5e;border-bottom:3px solid #2d6a9f;padding-bottom:10px;text-align:center;">CONTRAT DE MAINTENANCE VÉHICULES</h1>
<p style="text-align:center;color:#555;">Signé le {{date_signature}} — Début : {{date_debut}} — Durée : {{duree_contrat}}</p>
<table style="width:100%;border-collapse:collapse;margin:14px 0;">
<tr style="background:#1a3c5e;color:white;"><th style="padding:8px;">Client (Flotte)</th><th style="padding:8px;">Prestataire Garage</th></tr>
<tr><td style="padding:10px;border:1px solid #ccc;">{{nom_client}}</td><td style="padding:10px;border:1px solid #ccc;">{{nom_garage}}</td></tr>
</table>
<h2 style="color:#2d6a9f;">COUVERTURE</h2>
<div style="background:#F0F4F8;padding:10px;border-radius:4px;margin-bottom:8px;"><strong>Véhicules :</strong> {{vehicules_couverts}}</div>
<div style="background:#E8F5E9;padding:10px;border-radius:4px;margin-bottom:10px;"><strong>Prestations :</strong> {{prestations_incluses}}</div>
<table style="width:100%;border-collapse:collapse;">
<tr style="background:#eef2f7;"><td style="padding:8px;border:1px solid #ccc;"><strong>Périodicité :</strong> {{periodicite_entretien}}</td><td style="padding:8px;border:1px solid #ccc;font-weight:bold;color:#1a3c5e;"><strong>Forfait :</strong> {{prix_mensuel}} FCFA/mois</td><td style="padding:8px;border:1px solid #ccc;"><strong>Délai inter. :</strong> {{delai_intervention}} h</td></tr>
</table>
<div style="display:flex;justify-content:space-between;margin-top:28px;"><div>Client : _______________</div><div>Prestataire : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 60,
  },

  {
    code: 'tlog_plan_optimisation_supply_chain',
    name: 'Plan optimisation supply chain',
    category: 'gestion_projet',
    description: 'Document de planification pour l\'optimisation de la chaîne d\'approvisionnement',
    price: 1000, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'responsable_projet', label: 'Responsable du projet', type: 'text', required: true },
      { name: 'date_document', label: 'Date du document', type: 'date', required: true },
      { name: 'perimetre', label: 'Périmètre de la supply chain', type: 'textarea', required: true },
      { name: 'diagnostic_actuel', label: 'Diagnostic de la situation actuelle', type: 'textarea', required: true },
      { name: 'axes_optimisation', label: 'Axes d\'optimisation identifiés', type: 'textarea', required: true },
      { name: 'actions_prioritaires', label: 'Actions prioritaires à mettre en œuvre', type: 'textarea', required: true },
      { name: 'budget_estime', label: 'Budget estimé (FCFA)', type: 'text', required: false },
      { name: 'gains_attendus', label: 'Gains attendus (%)', type: 'text', required: false },
      { name: 'calendrier', label: 'Calendrier de mise en œuvre', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1a3c5e;border-bottom:3px solid #2d6a9f;padding-bottom:10px;">PLAN D'OPTIMISATION SUPPLY CHAIN</h1>
<p><strong>Entreprise :</strong> {{nom_entreprise}} &nbsp;|&nbsp; <strong>Responsable :</strong> {{responsable_projet}} &nbsp;|&nbsp; <strong>Date :</strong> {{date_document}}</p>
<h2 style="color:#2d6a9f;margin-top:16px;">PÉRIMÈTRE</h2>
<div style="background:#F0F4F8;padding:10px;border-radius:4px;">{{perimetre}}</div>
<h2 style="color:#2d6a9f;margin-top:14px;">DIAGNOSTIC ACTUEL</h2>
<div style="background:#FFF5F5;padding:10px;border-radius:4px;">{{diagnostic_actuel}}</div>
<h2 style="color:#2d6a9f;margin-top:14px;">AXES D'OPTIMISATION</h2>
<div style="background:#E8F5E9;padding:10px;border-radius:4px;">{{axes_optimisation}}</div>
<h2 style="color:#2d6a9f;margin-top:14px;">ACTIONS PRIORITAIRES</h2>
<div style="background:#FFF9C4;padding:10px;border-radius:4px;">{{actions_prioritaires}}</div>
<table style="width:100%;border-collapse:collapse;margin:12px 0;">
<tr style="background:#eef2f7;"><td style="padding:8px;border:1px solid #ccc;"><strong>Budget estimé :</strong> {{budget_estime}} FCFA</td><td style="padding:8px;border:1px solid #ccc;"><strong>Gains attendus :</strong> {{gains_attendus}} %</td></tr>
</table>
<div style="background:#F0F4F8;padding:10px;border-radius:4px;"><strong>Calendrier :</strong> {{calendrier}}</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 50,
  },

  {
    code: 'tlog_convention_stockage_tiers',
    name: 'Convention stockage marchandises tiers',
    category: 'juridique_admin',
    description: 'Convention de stockage de marchandises de tiers dans un entrepôt',
    price: 750, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreposeur', label: 'Nom de l\'entreposeur', type: 'text', required: true },
      { name: 'nom_deposant', label: 'Nom du déposant (propriétaire marchandises)', type: 'text', required: true },
      { name: 'adresse_entrepot', label: 'Adresse de l\'entrepôt', type: 'text', required: true },
      { name: 'nature_marchandises', label: 'Nature des marchandises stockées', type: 'textarea', required: true },
      { name: 'volume_surface', label: 'Volume / Surface allouée', type: 'text', required: false },
      { name: 'tarif_stockage', label: 'Tarif de stockage (FCFA / période)', type: 'text', required: true },
      { name: 'date_debut', label: 'Date de début de stockage', type: 'date', required: true },
      { name: 'duree_convention', label: 'Durée de la convention', type: 'text', required: true },
      { name: 'conditions_sortie', label: 'Conditions de sortie des marchandises', type: 'textarea', required: false },
      { name: 'date_signature', label: 'Date de signature', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1a3c5e;border-bottom:3px solid #2d6a9f;padding-bottom:10px;text-align:center;">CONVENTION DE STOCKAGE DE MARCHANDISES</h1>
<p style="text-align:center;color:#555;">Signée le {{date_signature}} — Durée : {{duree_convention}}</p>
<table style="width:100%;border-collapse:collapse;margin:14px 0;">
<tr style="background:#1a3c5e;color:white;"><th style="padding:8px;">Entreposeur</th><th style="padding:8px;">Déposant</th></tr>
<tr><td style="padding:10px;border:1px solid #ccc;">{{nom_entreposeur}}<br/><small>{{adresse_entrepot}}</small></td><td style="padding:10px;border:1px solid #ccc;">{{nom_deposant}}</td></tr>
</table>
<h2 style="color:#2d6a9f;">MARCHANDISES &amp; CONDITIONS</h2>
<div style="background:#F0F4F8;padding:10px;border-radius:4px;margin-bottom:8px;"><strong>Marchandises :</strong> {{nature_marchandises}}</div>
<table style="width:100%;border-collapse:collapse;margin:8px 0;">
<tr style="background:#eef2f7;"><td style="padding:8px;border:1px solid #ccc;"><strong>Volume/Surface :</strong> {{volume_surface}}</td><td style="padding:8px;border:1px solid #ccc;font-weight:bold;color:#1a3c5e;"><strong>Tarif :</strong> {{tarif_stockage}}</td><td style="padding:8px;border:1px solid #ccc;"><strong>Début :</strong> {{date_debut}}</td></tr>
</table>
<div style="background:#FFF9C4;padding:10px;border-radius:4px;"><strong>Conditions de sortie :</strong> {{conditions_sortie}}</div>
<div style="display:flex;justify-content:space-between;margin-top:28px;"><div>Entreposeur : _______________</div><div>Déposant : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 54,
  },

  {
    code: 'tlog_accord_tracabilite_livraison',
    name: 'Accord traçabilité livraison',
    category: 'gestion_projet',
    description: 'Accord définissant les modalités de traçabilité des livraisons entre partenaires',
    price: 600, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise_a', label: 'Entreprise A (expéditeur / donneur)', type: 'text', required: true },
      { name: 'nom_entreprise_b', label: 'Entreprise B (transporteur / logisticien)', type: 'text', required: true },
      { name: 'flux_concernes', label: 'Flux de livraisons concernés', type: 'textarea', required: true },
      { name: 'outils_tracabilite', label: 'Outils de traçabilité utilisés', type: 'text', required: false },
      { name: 'informations_partage', label: 'Informations à partager en temps réel', type: 'textarea', required: true },
      { name: 'delai_mise_a_jour', label: 'Délai de mise à jour des statuts (h)', type: 'text', required: false },
      { name: 'acces_donnees', label: 'Accès aux données (portail / API)', type: 'text', required: false },
      { name: 'duree_accord', label: 'Durée de l\'accord', type: 'text', required: true },
      { name: 'date_signature', label: 'Date de signature', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1a3c5e;border-bottom:3px solid #2d6a9f;padding-bottom:10px;text-align:center;">ACCORD DE TRAÇABILITÉ DES LIVRAISONS</h1>
<p style="text-align:center;color:#555;">Signé le {{date_signature}} — Durée : {{duree_accord}}</p>
<table style="width:100%;border-collapse:collapse;margin:14px 0;">
<tr style="background:#1a3c5e;color:white;"><th style="padding:8px;">Entreprise A</th><th style="padding:8px;">Entreprise B</th></tr>
<tr><td style="padding:10px;border:1px solid #ccc;">{{nom_entreprise_a}}</td><td style="padding:10px;border:1px solid #ccc;">{{nom_entreprise_b}}</td></tr>
</table>
<h2 style="color:#2d6a9f;margin-top:14px;">PÉRIMÈTRE &amp; DONNÉES</h2>
<div style="background:#F0F4F8;padding:10px;border-radius:4px;margin-bottom:8px;"><strong>Flux couverts :</strong> {{flux_concernes}}</div>
<div style="background:#E8F5E9;padding:10px;border-radius:4px;margin-bottom:8px;"><strong>Informations partagées :</strong> {{informations_partage}}</div>
<table style="width:100%;border-collapse:collapse;margin:8px 0;">
<tr style="background:#eef2f7;"><td style="padding:8px;border:1px solid #ccc;"><strong>Outils :</strong> {{outils_tracabilite}}</td><td style="padding:8px;border:1px solid #ccc;"><strong>MAJ statuts :</strong> {{delai_mise_a_jour}} h</td><td style="padding:8px;border:1px solid #ccc;"><strong>Accès :</strong> {{acces_donnees}}</td></tr>
</table>
<div style="display:flex;justify-content:space-between;margin-top:28px;"><div>Entreprise A : _______________</div><div>Entreprise B : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 48,
  },

  {
    code: 'tlog_contrat_assurance_marchandises',
    name: 'Contrat assurance marchandises transport',
    category: 'commercial_financier',
    description: 'Contrat d\'assurance couvrant les marchandises pendant leur transport',
    price: 800, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_assureur', label: 'Nom de la compagnie d\'assurance', type: 'text', required: true },
      { name: 'nom_assure', label: 'Nom de l\'assuré (expéditeur/transporteur)', type: 'text', required: true },
      { name: 'numero_police', label: 'Numéro de police', type: 'text', required: true },
      { name: 'marchandises_assurees', label: 'Marchandises assurées', type: 'textarea', required: true },
      { name: 'valeur_assuree', label: 'Valeur assurée (FCFA)', type: 'text', required: true },
      { name: 'prime_assurance', label: 'Prime d\'assurance (FCFA)', type: 'text', required: true },
      { name: 'risques_couverts', label: 'Risques couverts', type: 'textarea', required: true },
      { name: 'exclusions', label: 'Exclusions principales', type: 'textarea', required: false },
      { name: 'date_debut', label: 'Date de début', type: 'date', required: true },
      { name: 'date_fin', label: 'Date de fin', type: 'date', required: true },
      { name: 'date_signature', label: 'Date de signature', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1a3c5e;border-bottom:3px solid #2d6a9f;padding-bottom:10px;text-align:center;">CONTRAT D'ASSURANCE MARCHANDISES TRANSPORT</h1>
<p style="text-align:center;color:#555;">Police N° <strong>{{numero_police}}</strong> — Signé le {{date_signature}}</p>
<table style="width:100%;border-collapse:collapse;margin:14px 0;">
<tr style="background:#1a3c5e;color:white;"><th style="padding:8px;">Assureur</th><th style="padding:8px;">Assuré</th></tr>
<tr><td style="padding:10px;border:1px solid #ccc;">{{nom_assureur}}</td><td style="padding:10px;border:1px solid #ccc;">{{nom_assure}}</td></tr>
</table>
<h2 style="color:#2d6a9f;margin-top:14px;">GARANTIES</h2>
<div style="background:#F0F4F8;padding:10px;border-radius:4px;margin-bottom:8px;"><strong>Marchandises :</strong> {{marchandises_assurees}}</div>
<table style="width:100%;border-collapse:collapse;margin:8px 0;">
<tr style="background:#eef2f7;"><td style="padding:8px;border:1px solid #ccc;font-weight:bold;"><strong>Valeur assurée :</strong><br/>{{valeur_assuree}} FCFA</td><td style="padding:8px;border:1px solid #ccc;font-weight:bold;color:#1a3c5e;"><strong>Prime :</strong><br/>{{prime_assurance}} FCFA</td><td style="padding:8px;border:1px solid #ccc;"><strong>Période :</strong><br/>{{date_debut}} → {{date_fin}}</td></tr>
</table>
<div style="background:#E8F5E9;padding:10px;border-radius:4px;margin-bottom:8px;"><strong>Risques couverts :</strong> {{risques_couverts}}</div>
<div style="background:#FFF5F5;padding:10px;border-radius:4px;"><strong>Exclusions :</strong> {{exclusions}}</div>
<div style="display:flex;justify-content:space-between;margin-top:28px;"><div>Assureur : _______________</div><div>Assuré : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 65,
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
  console.log(`✅ Seed Transport & Logistique terminé. Insérés: ${created} — Total BDD: ${total}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
