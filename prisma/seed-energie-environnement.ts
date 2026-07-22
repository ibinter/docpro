import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const COUNTRIES = JSON.stringify(['CI','SN','CM','BJ','TG','BF','ML','GN','CD','CG','GA','NE','TD','MR']);

const templates = [
  {
    code: 'enrg_contrat_installation_solaire',
    name: 'Contrat installation solaire',
    category: 'commercial_financier',
    description: 'Contrat de prestation pour l\'installation d\'un système solaire photovoltaïque',
    price: 800, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_client', label: 'Nom du client', type: 'text', required: true },
      { name: 'adresse_installation', label: 'Adresse du site d\'installation', type: 'text', required: true },
      { name: 'nom_prestataire', label: 'Nom du prestataire', type: 'text', required: true },
      { name: 'puissance_kwc', label: 'Puissance installée (kWc)', type: 'text', required: true },
      { name: 'montant_contrat', label: 'Montant du contrat (FCFA)', type: 'text', required: true },
      { name: 'delai_installation', label: 'Délai d\'installation (jours)', type: 'text', required: true },
      { name: 'garantie_equipements', label: 'Garantie équipements (années)', type: 'text', required: false },
      { name: 'date_contrat', label: 'Date du contrat', type: 'date', required: true },
      { name: 'modalites_paiement', label: 'Modalités de paiement', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#2e7d32;border-bottom:2px solid #388e3c;padding-bottom:8px;">CONTRAT D'INSTALLATION SOLAIRE</h1>
<p><strong>Entre :</strong> {{nom_prestataire}} (le prestataire) <strong>et</strong> {{nom_client}} (le client)</p>
<p><strong>Site d'installation :</strong> {{adresse_installation}} &nbsp;|&nbsp; <strong>Date :</strong> {{date_contrat}}</p>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#2e7d32;color:white;"><th style="padding:8px;text-align:left;">Paramètre</th><th style="padding:8px;text-align:right;">Valeur</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Puissance installée</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{puissance_kwc}} kWc</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Montant du contrat</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{montant_contrat}} FCFA</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Délai d'installation</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{delai_installation}} jours</td></tr>
<tr style="background:#E8F5E9;font-weight:bold;"><td style="padding:8px;">Garantie équipements</td><td style="padding:8px;text-align:right;">{{garantie_equipements}} ans</td></tr>
</table>
<div style="background:#F1F8E9;padding:12px;border-radius:4px;"><strong>Modalités de paiement :</strong> {{modalites_paiement}}</div>
<div style="display:flex;justify-content:space-between;margin-top:30px;"><div><strong>Le prestataire</strong><br/>{{nom_prestataire}}<br/><br/>Signature : _______________</div><div><strong>Le client</strong><br/>{{nom_client}}<br/><br/>Signature : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 60,
  },

  {
    code: 'enrg_devis_panneau_pv',
    name: 'Devis panneau photovoltaïque',
    category: 'commercial_financier',
    description: 'Devis détaillé pour la fourniture et pose de panneaux photovoltaïques',
    price: 600, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_client', label: 'Nom du client', type: 'text', required: true },
      { name: 'nom_fournisseur', label: 'Fournisseur', type: 'text', required: true },
      { name: 'date_devis', label: 'Date du devis', type: 'date', required: true },
      { name: 'reference_devis', label: 'Référence devis', type: 'text', required: false },
      { name: 'nb_panneaux', label: 'Nombre de panneaux', type: 'text', required: true },
      { name: 'puissance_unitaire', label: 'Puissance unitaire (Wc)', type: 'text', required: true },
      { name: 'prix_unitaire', label: 'Prix unitaire (FCFA)', type: 'text', required: true },
      { name: 'cout_onduleur', label: 'Coût onduleur (FCFA)', type: 'text', required: false },
      { name: 'cout_pose', label: 'Coût main d\'œuvre / pose (FCFA)', type: 'text', required: false },
      { name: 'total_ttc', label: 'Total TTC (FCFA)', type: 'text', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#f57f17;border-bottom:2px solid #f9a825;padding-bottom:8px;">DEVIS — PANNEAUX PHOTOVOLTAÏQUES</h1>
<p><strong>Client :</strong> {{nom_client}} &nbsp;|&nbsp; <strong>Fournisseur :</strong> {{nom_fournisseur}} &nbsp;|&nbsp; <strong>Réf :</strong> {{reference_devis}} &nbsp;|&nbsp; <strong>Date :</strong> {{date_devis}}</p>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#f57f17;color:white;"><th style="padding:8px;text-align:left;">Désignation</th><th style="padding:8px;text-align:right;">Montant (FCFA)</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Panneaux ({{nb_panneaux}} x {{puissance_unitaire}} Wc)</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{prix_unitaire}} / unité</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Onduleur</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{cout_onduleur}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Main d'œuvre / Pose</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{cout_pose}}</td></tr>
<tr style="background:#FFF9C4;font-weight:bold;"><td style="padding:8px;">TOTAL TTC</td><td style="padding:8px;text-align:right;">{{total_ttc}} FCFA</td></tr>
</table>
<p style="color:#888;font-size:12px;">Devis valable 30 jours à compter de la date d'émission.</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 55,
  },

  {
    code: 'enrg_convention_achat_energie_renouvelable',
    name: 'Convention achat énergie renouvelable',
    category: 'commercial_financier',
    description: 'Convention d\'achat d\'énergie produite à partir de sources renouvelables',
    price: 1000, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_acheteur', label: 'Nom de l\'acheteur', type: 'text', required: true },
      { name: 'nom_producteur', label: 'Nom du producteur', type: 'text', required: true },
      { name: 'source_energie', label: 'Source d\'énergie (solaire, éolien…)', type: 'text', required: true },
      { name: 'volume_annuel_kwh', label: 'Volume annuel estimé (kWh)', type: 'text', required: true },
      { name: 'prix_kwh', label: 'Prix au kWh (FCFA)', type: 'text', required: true },
      { name: 'duree_convention', label: 'Durée de la convention (années)', type: 'text', required: true },
      { name: 'date_debut', label: 'Date de début', type: 'date', required: true },
      { name: 'conditions_livraison', label: 'Conditions de livraison', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#1565c0;border-bottom:2px solid #1976d2;padding-bottom:8px;">CONVENTION D'ACHAT D'ÉNERGIE RENOUVELABLE</h1>
<p>Entre <strong>{{nom_producteur}}</strong> (le producteur) et <strong>{{nom_acheteur}}</strong> (l'acheteur)</p>
<p><strong>Source :</strong> {{source_energie}} &nbsp;|&nbsp; <strong>Début :</strong> {{date_debut}} &nbsp;|&nbsp; <strong>Durée :</strong> {{duree_convention}} ans</p>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#1565c0;color:white;"><th style="padding:8px;text-align:left;">Élément</th><th style="padding:8px;text-align:right;">Valeur</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Volume annuel estimé</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{volume_annuel_kwh}} kWh</td></tr>
<tr style="background:#E3F2FD;font-weight:bold;"><td style="padding:8px;">Prix au kWh</td><td style="padding:8px;text-align:right;">{{prix_kwh}} FCFA</td></tr>
</table>
<div style="background:#E3F2FD;padding:12px;border-radius:4px;"><strong>Conditions de livraison :</strong> {{conditions_livraison}}</div>
<div style="display:flex;justify-content:space-between;margin-top:30px;"><div><strong>Le producteur</strong><br/>{{nom_producteur}}<br/><br/>Signature : _______________</div><div><strong>L'acheteur</strong><br/>{{nom_acheteur}}<br/><br/>Signature : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 48,
  },

  {
    code: 'enrg_rapport_audit_energetique',
    name: 'Rapport audit énergétique',
    category: 'gestion_projet',
    description: 'Rapport complet d\'audit de la consommation énergétique d\'un site',
    price: 1200, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_auditeur', label: 'Nom de l\'auditeur', type: 'text', required: true },
      { name: 'nom_site', label: 'Nom / Raison sociale du site', type: 'text', required: true },
      { name: 'adresse_site', label: 'Adresse du site', type: 'text', required: true },
      { name: 'date_audit', label: 'Date de l\'audit', type: 'date', required: true },
      { name: 'consommation_annuelle_kwh', label: 'Consommation annuelle (kWh)', type: 'text', required: true },
      { name: 'facture_annuelle_fcfa', label: 'Facture énergétique annuelle (FCFA)', type: 'text', required: true },
      { name: 'principaux_postes', label: 'Principaux postes de consommation', type: 'textarea', required: true },
      { name: 'potentiel_economies', label: 'Potentiel d\'économies identifié (%)', type: 'text', required: false },
      { name: 'recommandations', label: 'Recommandations', type: 'textarea', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#37474f;border-bottom:2px solid #546e7a;padding-bottom:8px;">RAPPORT D'AUDIT ÉNERGÉTIQUE</h1>
<p><strong>Site :</strong> {{nom_site}} — {{adresse_site}} &nbsp;|&nbsp; <strong>Date :</strong> {{date_audit}}</p>
<p><strong>Auditeur :</strong> {{nom_auditeur}}</p>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#37474f;color:white;"><th style="padding:8px;text-align:left;">Indicateur</th><th style="padding:8px;text-align:right;">Valeur</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Consommation annuelle</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{consommation_annuelle_kwh}} kWh</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Facture annuelle</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{facture_annuelle_fcfa}} FCFA</td></tr>
<tr style="background:#FFF9C4;font-weight:bold;"><td style="padding:8px;">Potentiel d'économies</td><td style="padding:8px;text-align:right;">{{potentiel_economies}} %</td></tr>
</table>
<div style="background:#ECEFF1;padding:12px;border-radius:4px;margin-bottom:10px;"><strong>Postes de consommation :</strong><br/>{{principaux_postes}}</div>
<div style="background:#E8F5E9;padding:12px;border-radius:4px;"><strong>Recommandations :</strong><br/>{{recommandations}}</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 52,
  },

  {
    code: 'enrg_contrat_maintenance_groupe_electrogene',
    name: 'Contrat maintenance groupe électrogène',
    category: 'commercial_financier',
    description: 'Contrat de maintenance préventive et curative d\'un groupe électrogène',
    price: 700, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_client', label: 'Nom du client', type: 'text', required: true },
      { name: 'nom_prestataire', label: 'Prestataire de maintenance', type: 'text', required: true },
      { name: 'marque_groupe', label: 'Marque / Modèle du groupe', type: 'text', required: true },
      { name: 'puissance_kva', label: 'Puissance (kVA)', type: 'text', required: true },
      { name: 'frequence_entretien', label: 'Fréquence d\'entretien', type: 'text', required: true },
      { name: 'cout_annuel', label: 'Coût annuel de maintenance (FCFA)', type: 'text', required: true },
      { name: 'date_debut', label: 'Date de début du contrat', type: 'date', required: true },
      { name: 'duree_contrat', label: 'Durée du contrat (mois)', type: 'text', required: true },
      { name: 'prestations_incluses', label: 'Prestations incluses', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#4a148c;border-bottom:2px solid #6a1b9a;padding-bottom:8px;">CONTRAT DE MAINTENANCE — GROUPE ÉLECTROGÈNE</h1>
<p><strong>Client :</strong> {{nom_client}} &nbsp;|&nbsp; <strong>Prestataire :</strong> {{nom_prestataire}}</p>
<p><strong>Groupe :</strong> {{marque_groupe}} — {{puissance_kva}} kVA &nbsp;|&nbsp; <strong>Début :</strong> {{date_debut}}</p>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#4a148c;color:white;"><th style="padding:8px;text-align:left;">Détail</th><th style="padding:8px;text-align:right;">Valeur</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Fréquence d'entretien</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{frequence_entretien}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Durée du contrat</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{duree_contrat}} mois</td></tr>
<tr style="background:#EDE7F6;font-weight:bold;"><td style="padding:8px;">Coût annuel</td><td style="padding:8px;text-align:right;">{{cout_annuel}} FCFA</td></tr>
</table>
<div style="background:#EDE7F6;padding:12px;border-radius:4px;"><strong>Prestations incluses :</strong> {{prestations_incluses}}</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 45,
  },

  {
    code: 'enrg_plan_gestion_dechets_entreprise',
    name: 'Plan gestion déchets entreprise',
    category: 'gestion_projet',
    description: 'Plan de gestion et de tri des déchets au sein d\'une entreprise',
    price: 900, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'responsable_env', label: 'Responsable environnement', type: 'text', required: true },
      { name: 'date_plan', label: 'Date d\'élaboration', type: 'date', required: true },
      { name: 'types_dechets', label: 'Types de déchets produits', type: 'textarea', required: true },
      { name: 'volume_mensuel', label: 'Volume mensuel estimé (tonnes)', type: 'text', required: false },
      { name: 'collecteurs_partenaires', label: 'Collecteurs / partenaires', type: 'textarea', required: false },
      { name: 'objectifs_reduction', label: 'Objectifs de réduction (%)', type: 'text', required: false },
      { name: 'actions_prevues', label: 'Actions prévues', type: 'textarea', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#1b5e20;border-bottom:2px solid #2e7d32;padding-bottom:8px;">PLAN DE GESTION DES DÉCHETS — {{nom_entreprise}}</h1>
<p><strong>Responsable :</strong> {{responsable_env}} &nbsp;|&nbsp; <strong>Date :</strong> {{date_plan}}</p>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#1b5e20;color:white;"><th style="padding:8px;text-align:left;">Indicateur</th><th style="padding:8px;text-align:right;">Valeur</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Volume mensuel estimé</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{volume_mensuel}} t</td></tr>
<tr style="background:#E8F5E9;font-weight:bold;"><td style="padding:8px;">Objectif réduction</td><td style="padding:8px;text-align:right;">{{objectifs_reduction}} %</td></tr>
</table>
<div style="background:#F1F8E9;padding:12px;border-radius:4px;margin-bottom:10px;"><strong>Types de déchets :</strong><br/>{{types_dechets}}</div>
<div style="background:#E8F5E9;padding:12px;border-radius:4px;margin-bottom:10px;"><strong>Collecteurs partenaires :</strong><br/>{{collecteurs_partenaires}}</div>
<div style="background:#C8E6C9;padding:12px;border-radius:4px;"><strong>Actions prévues :</strong><br/>{{actions_prevues}}</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 50,
  },

  {
    code: 'enrg_rapport_impact_environnemental',
    name: 'Rapport impact environnemental',
    category: 'juridique_admin',
    description: 'Rapport d\'évaluation de l\'impact environnemental d\'un projet ou d\'une activité',
    price: 1100, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_projet', label: 'Nom du projet / activité', type: 'text', required: true },
      { name: 'maitre_ouvrage', label: 'Maître d\'ouvrage', type: 'text', required: true },
      { name: 'bureau_etude', label: 'Bureau d\'étude / rédacteur', type: 'text', required: true },
      { name: 'date_rapport', label: 'Date du rapport', type: 'date', required: true },
      { name: 'localisation', label: 'Localisation du projet', type: 'text', required: true },
      { name: 'description_projet', label: 'Description du projet', type: 'textarea', required: true },
      { name: 'impacts_positifs', label: 'Impacts positifs identifiés', type: 'textarea', required: false },
      { name: 'impacts_negatifs', label: 'Impacts négatifs identifiés', type: 'textarea', required: true },
      { name: 'mesures_attenuation', label: 'Mesures d\'atténuation proposées', type: 'textarea', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#33691e;border-bottom:2px solid #558b2f;padding-bottom:8px;">RAPPORT D'IMPACT ENVIRONNEMENTAL</h1>
<p><strong>Projet :</strong> {{nom_projet}} &nbsp;|&nbsp; <strong>Maître d'ouvrage :</strong> {{maitre_ouvrage}}</p>
<p><strong>Bureau d'étude :</strong> {{bureau_etude}} &nbsp;|&nbsp; <strong>Localisation :</strong> {{localisation}} &nbsp;|&nbsp; <strong>Date :</strong> {{date_rapport}}</p>
<div style="background:#F9FBE7;padding:12px;border-radius:4px;margin:12px 0;"><strong>Description du projet :</strong><br/>{{description_projet}}</div>
<div style="background:#E8F5E9;padding:12px;border-radius:4px;margin-bottom:10px;border-left:4px solid #4caf50;"><strong>Impacts positifs :</strong><br/>{{impacts_positifs}}</div>
<div style="background:#FFF3E0;padding:12px;border-radius:4px;margin-bottom:10px;border-left:4px solid #ff9800;"><strong>Impacts négatifs :</strong><br/>{{impacts_negatifs}}</div>
<div style="background:#E3F2FD;padding:12px;border-radius:4px;"><strong>Mesures d'atténuation :</strong><br/>{{mesures_attenuation}}</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 58,
  },

  {
    code: 'enrg_contrat_fourniture_eau_industrielle',
    name: 'Contrat fourniture eau industrielle',
    category: 'commercial_financier',
    description: 'Contrat de fourniture d\'eau pour usage industriel ou commercial',
    price: 750, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_fournisseur', label: 'Fournisseur d\'eau', type: 'text', required: true },
      { name: 'nom_client', label: 'Nom du client industriel', type: 'text', required: true },
      { name: 'adresse_site', label: 'Adresse du site de livraison', type: 'text', required: true },
      { name: 'volume_mensuel_m3', label: 'Volume mensuel garanti (m³)', type: 'text', required: true },
      { name: 'prix_m3', label: 'Prix au m³ (FCFA)', type: 'text', required: true },
      { name: 'date_debut', label: 'Date de début', type: 'date', required: true },
      { name: 'duree_contrat', label: 'Durée du contrat (mois)', type: 'text', required: true },
      { name: 'normes_qualite', label: 'Normes de qualité applicables', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#0277bd;border-bottom:2px solid #0288d1;padding-bottom:8px;">CONTRAT DE FOURNITURE D'EAU INDUSTRIELLE</h1>
<p><strong>Fournisseur :</strong> {{nom_fournisseur}} &nbsp;|&nbsp; <strong>Client :</strong> {{nom_client}}</p>
<p><strong>Site :</strong> {{adresse_site}} &nbsp;|&nbsp; <strong>Début :</strong> {{date_debut}} &nbsp;|&nbsp; <strong>Durée :</strong> {{duree_contrat}} mois</p>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#0277bd;color:white;"><th style="padding:8px;text-align:left;">Paramètre</th><th style="padding:8px;text-align:right;">Valeur</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Volume mensuel garanti</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{volume_mensuel_m3}} m³</td></tr>
<tr style="background:#E1F5FE;font-weight:bold;"><td style="padding:8px;">Prix au m³</td><td style="padding:8px;text-align:right;">{{prix_m3}} FCFA</td></tr>
</table>
<div style="background:#E1F5FE;padding:12px;border-radius:4px;"><strong>Normes de qualité :</strong> {{normes_qualite}}</div>
<div style="display:flex;justify-content:space-between;margin-top:30px;"><div><strong>Le fournisseur</strong><br/>{{nom_fournisseur}}<br/><br/>Signature : _______________</div><div><strong>Le client</strong><br/>{{nom_client}}<br/><br/>Signature : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 44,
  },

  {
    code: 'enrg_convention_reboisement',
    name: 'Convention reboisement compensatoire',
    category: 'juridique_admin',
    description: 'Convention de reboisement compensatoire suite à une déforestation ou à un projet impactant',
    price: 900, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Entreprise commanditaire', type: 'text', required: true },
      { name: 'nom_organisme', label: 'Organisme / ONG chargé du reboisement', type: 'text', required: true },
      { name: 'superficie_ha', label: 'Superficie à reboiser (ha)', type: 'text', required: true },
      { name: 'nombre_arbres', label: 'Nombre d\'arbres à planter', type: 'text', required: true },
      { name: 'especes_prevues', label: 'Espèces prévues', type: 'textarea', required: false },
      { name: 'zone_reboisement', label: 'Zone de reboisement', type: 'text', required: true },
      { name: 'budget_alloue', label: 'Budget alloué (FCFA)', type: 'text', required: true },
      { name: 'date_debut', label: 'Date de début', type: 'date', required: true },
      { name: 'duree_suivi', label: 'Durée du suivi (années)', type: 'text', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#2e7d32;border-bottom:2px solid #388e3c;padding-bottom:8px;">CONVENTION DE REBOISEMENT COMPENSATOIRE</h1>
<p>Entre <strong>{{nom_entreprise}}</strong> et <strong>{{nom_organisme}}</strong>, il est convenu ce qui suit :</p>
<p><strong>Zone :</strong> {{zone_reboisement}} &nbsp;|&nbsp; <strong>Début :</strong> {{date_debut}}</p>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#2e7d32;color:white;"><th style="padding:8px;text-align:left;">Engagement</th><th style="padding:8px;text-align:right;">Valeur</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Superficie à reboiser</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{superficie_ha}} ha</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Nombre d'arbres</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{nombre_arbres}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Budget alloué</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{budget_alloue}} FCFA</td></tr>
<tr style="background:#E8F5E9;font-weight:bold;"><td style="padding:8px;">Durée de suivi</td><td style="padding:8px;text-align:right;">{{duree_suivi}} ans</td></tr>
</table>
<div style="background:#F1F8E9;padding:12px;border-radius:4px;"><strong>Espèces prévues :</strong> {{especes_prevues}}</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 42,
  },

  {
    code: 'enrg_etude_faisabilite_mini_centrale',
    name: 'Étude faisabilité mini-centrale',
    category: 'gestion_projet',
    description: 'Étude de faisabilité technique et financière pour l\'installation d\'une mini-centrale énergétique',
    price: 1200, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_porteur', label: 'Porteur de projet', type: 'text', required: true },
      { name: 'type_centrale', label: 'Type de centrale (solaire, hydro, éolien)', type: 'text', required: true },
      { name: 'localisation', label: 'Localisation envisagée', type: 'text', required: true },
      { name: 'puissance_cible_kw', label: 'Puissance cible (kW)', type: 'text', required: true },
      { name: 'population_cible', label: 'Population / ménages à desservir', type: 'text', required: false },
      { name: 'investissement_total', label: 'Investissement total estimé (FCFA)', type: 'text', required: true },
      { name: 'sources_financement', label: 'Sources de financement envisagées', type: 'textarea', required: false },
      { name: 'retour_investissement', label: 'Retour sur investissement estimé (années)', type: 'text', required: false },
      { name: 'conclusions', label: 'Conclusions et recommandations', type: 'textarea', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#e65100;border-bottom:2px solid #f57c00;padding-bottom:8px;">ÉTUDE DE FAISABILITÉ — MINI-CENTRALE {{type_centrale}}</h1>
<p><strong>Porteur :</strong> {{nom_porteur}} &nbsp;|&nbsp; <strong>Localisation :</strong> {{localisation}}</p>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#e65100;color:white;"><th style="padding:8px;text-align:left;">Paramètre</th><th style="padding:8px;text-align:right;">Valeur</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Puissance cible</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{puissance_cible_kw}} kW</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Population desservie</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{population_cible}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Investissement total</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{investissement_total}} FCFA</td></tr>
<tr style="background:#FFF3E0;font-weight:bold;"><td style="padding:8px;">Retour sur investissement</td><td style="padding:8px;text-align:right;">{{retour_investissement}} ans</td></tr>
</table>
<div style="background:#FFF3E0;padding:12px;border-radius:4px;margin-bottom:10px;"><strong>Sources de financement :</strong> {{sources_financement}}</div>
<div style="background:#E8F5E9;padding:12px;border-radius:4px;"><strong>Conclusions :</strong><br/>{{conclusions}}</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 55,
  },

  {
    code: 'enrg_contrat_service_eclairage_public',
    name: 'Contrat service éclairage public',
    category: 'commercial_financier',
    description: 'Contrat de fourniture et maintenance du service d\'éclairage public',
    price: 850, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_collectivite', label: 'Collectivité / Commune', type: 'text', required: true },
      { name: 'nom_prestataire', label: 'Prestataire', type: 'text', required: true },
      { name: 'nb_points_eclairage', label: 'Nombre de points d\'éclairage', type: 'text', required: true },
      { name: 'type_luminaire', label: 'Type de luminaire (LED, solaire…)', type: 'text', required: true },
      { name: 'cout_mensuel', label: 'Coût mensuel du service (FCFA)', type: 'text', required: true },
      { name: 'date_debut', label: 'Date de début', type: 'date', required: true },
      { name: 'duree_contrat', label: 'Durée du contrat (mois)', type: 'text', required: true },
      { name: 'engagements_prestataire', label: 'Engagements du prestataire', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#f9a825;border-bottom:2px solid #fbc02d;padding-bottom:8px;">CONTRAT DE SERVICE D'ÉCLAIRAGE PUBLIC</h1>
<p><strong>Collectivité :</strong> {{nom_collectivite}} &nbsp;|&nbsp; <strong>Prestataire :</strong> {{nom_prestataire}}</p>
<p><strong>Début :</strong> {{date_debut}} &nbsp;|&nbsp; <strong>Durée :</strong> {{duree_contrat}} mois</p>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#f57f17;color:white;"><th style="padding:8px;text-align:left;">Détail</th><th style="padding:8px;text-align:right;">Valeur</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Points d'éclairage</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{nb_points_eclairage}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Type de luminaire</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{type_luminaire}}</td></tr>
<tr style="background:#FFF9C4;font-weight:bold;"><td style="padding:8px;">Coût mensuel</td><td style="padding:8px;text-align:right;">{{cout_mensuel}} FCFA</td></tr>
</table>
<div style="background:#FFF8E1;padding:12px;border-radius:4px;"><strong>Engagements du prestataire :</strong> {{engagements_prestataire}}</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 46,
  },

  {
    code: 'enrg_accord_reduction_empreinte_carbone',
    name: 'Accord réduction empreinte carbone',
    category: 'juridique_admin',
    description: 'Accord de partenariat pour la réduction de l\'empreinte carbone d\'une organisation',
    price: 1000, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'nom_partenaire', label: 'Partenaire / organisme certificateur', type: 'text', required: true },
      { name: 'empreinte_actuelle_tco2', label: 'Empreinte carbone actuelle (tCO₂/an)', type: 'text', required: true },
      { name: 'objectif_reduction_pct', label: 'Objectif de réduction (%)', type: 'text', required: true },
      { name: 'horizon_annees', label: 'Horizon de réalisation (années)', type: 'text', required: true },
      { name: 'actions_cles', label: 'Actions clés engagées', type: 'textarea', required: true },
      { name: 'mecanisme_suivi', label: 'Mécanisme de suivi et reporting', type: 'textarea', required: false },
      { name: 'date_accord', label: 'Date de l\'accord', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#1b5e20;border-bottom:2px solid #388e3c;padding-bottom:8px;">ACCORD DE RÉDUCTION DE L'EMPREINTE CARBONE</h1>
<p>Entre <strong>{{nom_entreprise}}</strong> et <strong>{{nom_partenaire}}</strong> — Signé le {{date_accord}}</p>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#1b5e20;color:white;"><th style="padding:8px;text-align:left;">Paramètre</th><th style="padding:8px;text-align:right;">Valeur</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Empreinte actuelle</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{empreinte_actuelle_tco2}} tCO₂/an</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Objectif de réduction</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{objectif_reduction_pct}} %</td></tr>
<tr style="background:#E8F5E9;font-weight:bold;"><td style="padding:8px;">Horizon</td><td style="padding:8px;text-align:right;">{{horizon_annees}} ans</td></tr>
</table>
<div style="background:#E8F5E9;padding:12px;border-radius:4px;margin-bottom:10px;"><strong>Actions clés :</strong><br/>{{actions_cles}}</div>
<div style="background:#F1F8E9;padding:12px;border-radius:4px;"><strong>Mécanisme de suivi :</strong> {{mecanisme_suivi}}</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 49,
  },

  {
    code: 'enrg_rapport_conformite_environnementale',
    name: 'Rapport conformité environnementale',
    category: 'juridique_admin',
    description: 'Rapport de vérification de la conformité réglementaire environnementale d\'un site',
    price: 1000, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_site', label: 'Nom du site / entreprise', type: 'text', required: true },
      { name: 'inspecteur', label: 'Inspecteur / vérificateur', type: 'text', required: true },
      { name: 'date_inspection', label: 'Date d\'inspection', type: 'date', required: true },
      { name: 'textes_applicables', label: 'Textes réglementaires applicables', type: 'textarea', required: true },
      { name: 'points_conformes', label: 'Points conformes', type: 'textarea', required: false },
      { name: 'non_conformites', label: 'Non-conformités relevées', type: 'textarea', required: false },
      { name: 'delai_mise_en_conformite', label: 'Délai de mise en conformité (jours)', type: 'text', required: false },
      { name: 'conclusion', label: 'Conclusion générale', type: 'textarea', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#37474f;border-bottom:2px solid #546e7a;padding-bottom:8px;">RAPPORT DE CONFORMITÉ ENVIRONNEMENTALE</h1>
<p><strong>Site :</strong> {{nom_site}} &nbsp;|&nbsp; <strong>Inspecteur :</strong> {{inspecteur}} &nbsp;|&nbsp; <strong>Date :</strong> {{date_inspection}}</p>
<div style="background:#ECEFF1;padding:12px;border-radius:4px;margin:12px 0;"><strong>Textes applicables :</strong><br/>{{textes_applicables}}</div>
<div style="background:#E8F5E9;padding:12px;border-radius:4px;margin-bottom:10px;border-left:4px solid #4caf50;"><strong>Points conformes :</strong><br/>{{points_conformes}}</div>
<div style="background:#FFEBEE;padding:12px;border-radius:4px;margin-bottom:10px;border-left:4px solid #f44336;"><strong>Non-conformités :</strong><br/>{{non_conformites}}<br/><strong>Délai :</strong> {{delai_mise_en_conformite}} jours</div>
<div style="background:#E3F2FD;padding:12px;border-radius:4px;"><strong>Conclusion :</strong><br/>{{conclusion}}</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 54,
  },

  {
    code: 'enrg_plan_urgence_deversement',
    name: 'Plan urgence déversement',
    category: 'gestion_projet',
    description: 'Plan d\'urgence en cas de déversement accidentel de produits polluants',
    price: 950, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'responsable_securite', label: 'Responsable sécurité/environnement', type: 'text', required: true },
      { name: 'types_produits_risque', label: 'Types de produits à risque', type: 'textarea', required: true },
      { name: 'equipements_intervention', label: 'Équipements d\'intervention disponibles', type: 'textarea', required: true },
      { name: 'procedures_intervention', label: 'Procédures d\'intervention', type: 'textarea', required: true },
      { name: 'contacts_urgence', label: 'Contacts d\'urgence (pompiers, env.)', type: 'textarea', required: true },
      { name: 'date_validation', label: 'Date de validation du plan', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#b71c1c;border-bottom:2px solid #c62828;padding-bottom:8px;">PLAN D'URGENCE — DÉVERSEMENT ACCIDENTEL</h1>
<p><strong>Entreprise :</strong> {{nom_entreprise}} &nbsp;|&nbsp; <strong>Responsable :</strong> {{responsable_securite}} &nbsp;|&nbsp; <strong>Validé le :</strong> {{date_validation}}</p>
<div style="background:#FFEBEE;padding:12px;border-radius:4px;margin:12px 0;border-left:4px solid #f44336;"><strong>Produits à risque :</strong><br/>{{types_produits_risque}}</div>
<div style="background:#FFF3E0;padding:12px;border-radius:4px;margin-bottom:10px;"><strong>Équipements disponibles :</strong><br/>{{equipements_intervention}}</div>
<div style="background:#E8F5E9;padding:12px;border-radius:4px;margin-bottom:10px;"><strong>Procédures d'intervention :</strong><br/>{{procedures_intervention}}</div>
<div style="background:#E3F2FD;padding:12px;border-radius:4px;border-left:4px solid #1976d2;"><strong>Contacts d'urgence :</strong><br/>{{contacts_urgence}}</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 47,
  },

  {
    code: 'enrg_contrat_collecte_dechets_speciaux',
    name: 'Contrat collecte déchets spéciaux',
    category: 'commercial_financier',
    description: 'Contrat de collecte et traitement des déchets dangereux ou spéciaux',
    price: 800, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_producteur_dechets', label: 'Producteur de déchets', type: 'text', required: true },
      { name: 'nom_collecteur', label: 'Collecteur / traiteur agréé', type: 'text', required: true },
      { name: 'type_dechets', label: 'Type de déchets concernés', type: 'textarea', required: true },
      { name: 'volume_mensuel_kg', label: 'Volume mensuel estimé (kg)', type: 'text', required: true },
      { name: 'cout_mensuel', label: 'Coût mensuel (FCFA)', type: 'text', required: true },
      { name: 'frequence_collecte', label: 'Fréquence de collecte', type: 'text', required: true },
      { name: 'mode_traitement', label: 'Mode de traitement final', type: 'textarea', required: false },
      { name: 'date_debut', label: 'Date de début', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#4a148c;border-bottom:2px solid #6a1b9a;padding-bottom:8px;">CONTRAT DE COLLECTE DE DÉCHETS SPÉCIAUX</h1>
<p>Entre <strong>{{nom_producteur_dechets}}</strong> et <strong>{{nom_collecteur}}</strong> — À compter du {{date_debut}}</p>
<div style="background:#EDE7F6;padding:12px;border-radius:4px;margin:12px 0;"><strong>Déchets concernés :</strong><br/>{{type_dechets}}</div>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#4a148c;color:white;"><th style="padding:8px;text-align:left;">Paramètre</th><th style="padding:8px;text-align:right;">Valeur</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Volume mensuel</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{volume_mensuel_kg}} kg</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Fréquence de collecte</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{frequence_collecte}}</td></tr>
<tr style="background:#EDE7F6;font-weight:bold;"><td style="padding:8px;">Coût mensuel</td><td style="padding:8px;text-align:right;">{{cout_mensuel}} FCFA</td></tr>
</table>
<div style="background:#F3E5F5;padding:12px;border-radius:4px;"><strong>Mode de traitement :</strong> {{mode_traitement}}</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 43,
  },

  {
    code: 'enrg_convention_partenariat_ecologique',
    name: 'Convention partenariat écologique',
    category: 'juridique_admin',
    description: 'Convention de partenariat pour la mise en œuvre d\'actions écologiques conjointes',
    price: 700, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'partenaire_a', label: 'Partenaire A', type: 'text', required: true },
      { name: 'partenaire_b', label: 'Partenaire B', type: 'text', required: true },
      { name: 'objet_partenariat', label: 'Objet du partenariat', type: 'text', required: true },
      { name: 'actions_communes', label: 'Actions communes prévues', type: 'textarea', required: true },
      { name: 'apport_partenaire_a', label: 'Apport du partenaire A', type: 'textarea', required: false },
      { name: 'apport_partenaire_b', label: 'Apport du partenaire B', type: 'textarea', required: false },
      { name: 'duree_convention', label: 'Durée de la convention (mois)', type: 'text', required: true },
      { name: 'date_signature', label: 'Date de signature', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#2e7d32;border-bottom:2px solid #43a047;padding-bottom:8px;">CONVENTION DE PARTENARIAT ÉCOLOGIQUE</h1>
<p>Entre <strong>{{partenaire_a}}</strong> et <strong>{{partenaire_b}}</strong> — Signée le {{date_signature}}</p>
<p><strong>Objet :</strong> {{objet_partenariat}} &nbsp;|&nbsp; <strong>Durée :</strong> {{duree_convention}} mois</p>
<div style="background:#E8F5E9;padding:12px;border-radius:4px;margin:12px 0;"><strong>Actions communes :</strong><br/>{{actions_communes}}</div>
<div style="display:flex;gap:12px;margin-top:10px;">
<div style="flex:1;background:#F1F8E9;padding:10px;border-radius:4px;"><strong>Apport {{partenaire_a}} :</strong><br/>{{apport_partenaire_a}}</div>
<div style="flex:1;background:#F1F8E9;padding:10px;border-radius:4px;"><strong>Apport {{partenaire_b}} :</strong><br/>{{apport_partenaire_b}}</div>
</div>
<div style="display:flex;justify-content:space-between;margin-top:30px;"><div><strong>{{partenaire_a}}</strong><br/><br/>Signature : _______________</div><div><strong>{{partenaire_b}}</strong><br/><br/>Signature : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 41,
  },

  {
    code: 'enrg_cahier_charges_installation_biogaz',
    name: 'Cahier des charges installation biogaz',
    category: 'gestion_projet',
    description: 'Cahier des charges technique pour l\'installation d\'un digesteur biogaz',
    price: 1100, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_maitre_ouvrage', label: 'Maître d\'ouvrage', type: 'text', required: true },
      { name: 'localisation', label: 'Localisation du projet', type: 'text', required: true },
      { name: 'capacite_m3_jour', label: 'Capacité de production (m³/jour)', type: 'text', required: true },
      { name: 'type_substrat', label: 'Type de substrat (déchets organiques, lisier…)', type: 'text', required: true },
      { name: 'usage_biogaz', label: 'Usage du biogaz (cuisson, électricité…)', type: 'text', required: true },
      { name: 'specifications_techniques', label: 'Spécifications techniques requises', type: 'textarea', required: true },
      { name: 'budget_max', label: 'Budget maximum (FCFA)', type: 'text', required: true },
      { name: 'date_limite_offres', label: 'Date limite de remise des offres', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#33691e;border-bottom:2px solid #558b2f;padding-bottom:8px;">CAHIER DES CHARGES — INSTALLATION BIOGAZ</h1>
<p><strong>Maître d'ouvrage :</strong> {{nom_maitre_ouvrage}} &nbsp;|&nbsp; <strong>Site :</strong> {{localisation}}</p>
<p><strong>Date limite offres :</strong> {{date_limite_offres}} &nbsp;|&nbsp; <strong>Budget max :</strong> {{budget_max}} FCFA</p>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#33691e;color:white;"><th style="padding:8px;text-align:left;">Paramètre</th><th style="padding:8px;text-align:right;">Valeur</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Capacité de production</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{capacite_m3_jour}} m³/jour</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Type de substrat</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{type_substrat}}</td></tr>
<tr style="background:#F9FBE7;font-weight:bold;"><td style="padding:8px;">Usage du biogaz</td><td style="padding:8px;text-align:right;">{{usage_biogaz}}</td></tr>
</table>
<div style="background:#F9FBE7;padding:12px;border-radius:4px;"><strong>Spécifications techniques :</strong><br/>{{specifications_techniques}}</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 44,
  },

  {
    code: 'enrg_permis_exploitation_carriere',
    name: 'Permis exploitation carrière',
    category: 'juridique_admin',
    description: 'Dossier de demande de permis d\'exploitation de carrière avec volet environnemental',
    price: 1200, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_demandeur', label: 'Nom / Raison sociale du demandeur', type: 'text', required: true },
      { name: 'localisation_carriere', label: 'Localisation de la carrière', type: 'text', required: true },
      { name: 'type_materiau', label: 'Type de matériau exploité', type: 'text', required: true },
      { name: 'superficie_ha', label: 'Superficie demandée (ha)', type: 'text', required: true },
      { name: 'volume_annuel_m3', label: 'Volume d\'extraction annuel prévu (m³)', type: 'text', required: true },
      { name: 'duree_permis', label: 'Durée du permis sollicité (années)', type: 'text', required: true },
      { name: 'mesures_environnementales', label: 'Mesures environnementales prévues', type: 'textarea', required: true },
      { name: 'plan_rehabilitation', label: 'Plan de réhabilitation du site', type: 'textarea', required: true },
      { name: 'date_demande', label: 'Date de la demande', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#4e342e;border-bottom:2px solid #6d4c41;padding-bottom:8px;">DEMANDE DE PERMIS D'EXPLOITATION DE CARRIÈRE</h1>
<p><strong>Demandeur :</strong> {{nom_demandeur}} &nbsp;|&nbsp; <strong>Localisation :</strong> {{localisation_carriere}} &nbsp;|&nbsp; <strong>Date :</strong> {{date_demande}}</p>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#4e342e;color:white;"><th style="padding:8px;text-align:left;">Paramètre</th><th style="padding:8px;text-align:right;">Valeur</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Matériau exploité</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{type_materiau}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Superficie</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{superficie_ha}} ha</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Volume annuel prévu</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{volume_annuel_m3}} m³</td></tr>
<tr style="background:#EFEBE9;font-weight:bold;"><td style="padding:8px;">Durée du permis</td><td style="padding:8px;text-align:right;">{{duree_permis}} ans</td></tr>
</table>
<div style="background:#EFEBE9;padding:12px;border-radius:4px;margin-bottom:10px;"><strong>Mesures environnementales :</strong><br/>{{mesures_environnementales}}</div>
<div style="background:#E8F5E9;padding:12px;border-radius:4px;"><strong>Plan de réhabilitation :</strong><br/>{{plan_rehabilitation}}</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 40,
  },

  {
    code: 'enrg_rapport_qualite_eau',
    name: 'Rapport qualité eau',
    category: 'juridique_admin',
    description: 'Rapport d\'analyse et de suivi de la qualité de l\'eau d\'un point de prélèvement',
    price: 900, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_laboratoire', label: 'Laboratoire d\'analyse', type: 'text', required: true },
      { name: 'point_prelevement', label: 'Point de prélèvement', type: 'text', required: true },
      { name: 'date_prelevement', label: 'Date de prélèvement', type: 'date', required: true },
      { name: 'ph', label: 'pH mesuré', type: 'text', required: false },
      { name: 'conductivite', label: 'Conductivité (µS/cm)', type: 'text', required: false },
      { name: 'turbidite', label: 'Turbidité (NTU)', type: 'text', required: false },
      { name: 'parametres_biologiques', label: 'Paramètres biologiques (coliformes…)', type: 'textarea', required: false },
      { name: 'conformite_normes', label: 'Conformité aux normes OMS/nationales', type: 'text', required: true },
      { name: 'recommandations', label: 'Recommandations', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#0277bd;border-bottom:2px solid #0288d1;padding-bottom:8px;">RAPPORT DE QUALITÉ DE L'EAU</h1>
<p><strong>Laboratoire :</strong> {{nom_laboratoire}} &nbsp;|&nbsp; <strong>Point :</strong> {{point_prelevement}} &nbsp;|&nbsp; <strong>Date :</strong> {{date_prelevement}}</p>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#0277bd;color:white;"><th style="padding:8px;text-align:left;">Paramètre</th><th style="padding:8px;text-align:right;">Valeur mesurée</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">pH</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{ph}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Conductivité</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{conductivite}} µS/cm</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Turbidité</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{turbidite}} NTU</td></tr>
<tr style="background:#FFF9C4;font-weight:bold;"><td style="padding:8px;">Conformité normes</td><td style="padding:8px;text-align:right;">{{conformite_normes}}</td></tr>
</table>
<div style="background:#E1F5FE;padding:12px;border-radius:4px;margin-bottom:10px;"><strong>Paramètres biologiques :</strong><br/>{{parametres_biologiques}}</div>
<div style="background:#E8F5E9;padding:12px;border-radius:4px;"><strong>Recommandations :</strong> {{recommandations}}</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 51,
  },

  {
    code: 'enrg_plan_economies_energie_entreprise',
    name: 'Plan économies énergie entreprise',
    category: 'gestion_projet',
    description: 'Plan d\'actions pour réduire la consommation énergétique d\'une entreprise',
    price: 1000, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'referent_energie', label: 'Référent énergie', type: 'text', required: true },
      { name: 'date_plan', label: 'Date d\'élaboration', type: 'date', required: true },
      { name: 'consommation_actuelle_kwh', label: 'Consommation actuelle annuelle (kWh)', type: 'text', required: true },
      { name: 'objectif_reduction_pct', label: 'Objectif de réduction (%)', type: 'text', required: true },
      { name: 'actions_court_terme', label: 'Actions court terme (0-6 mois)', type: 'textarea', required: true },
      { name: 'actions_moyen_terme', label: 'Actions moyen terme (6-24 mois)', type: 'textarea', required: false },
      { name: 'budget_prevu', label: 'Budget prévu (FCFA)', type: 'text', required: false },
      { name: 'economies_attendues', label: 'Économies financières attendues (FCFA/an)', type: 'text', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#f57f17;border-bottom:2px solid #f9a825;padding-bottom:8px;">PLAN D'ÉCONOMIES D'ÉNERGIE — {{nom_entreprise}}</h1>
<p><strong>Référent énergie :</strong> {{referent_energie}} &nbsp;|&nbsp; <strong>Date :</strong> {{date_plan}}</p>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#f57f17;color:white;"><th style="padding:8px;text-align:left;">Indicateur</th><th style="padding:8px;text-align:right;">Valeur</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Consommation actuelle</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{consommation_actuelle_kwh}} kWh/an</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Objectif de réduction</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{objectif_reduction_pct}} %</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Budget prévu</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{budget_prevu}} FCFA</td></tr>
<tr style="background:#FFF9C4;font-weight:bold;"><td style="padding:8px;">Économies attendues</td><td style="padding:8px;text-align:right;">{{economies_attendues}} FCFA/an</td></tr>
</table>
<div style="background:#FFF8E1;padding:12px;border-radius:4px;margin-bottom:10px;"><strong>Actions court terme :</strong><br/>{{actions_court_terme}}</div>
<div style="background:#F9FBE7;padding:12px;border-radius:4px;"><strong>Actions moyen terme :</strong><br/>{{actions_moyen_terme}}</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 56,
  },
];

async function main() {
  let count = 0;
  for (const t of templates) {
    await prisma.documentTemplate.upsert({
      where: { code: t.code },
      update: {},
      create: t,
    });
    count++;
  }
  const total = await prisma.documentTemplate.count();
  console.log(`✅ Seed Énergie & Environnement terminé. Traités: ${count} — Total BDD: ${total}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
