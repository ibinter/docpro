import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const COUNTRIES = JSON.stringify(['CI','SN','CM','BJ','TG','BF','ML','GN','CD','CG','GA','NE','TD','MR']);

const templates = [
  {
    code: 'fp_budget_menage',
    name: 'Budget mensuel du foyer',
    category: 'commercial_financier',
    description: 'Planifier et suivre le budget mensuel du ménage',
    price: 200, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_foyer', label: 'Nom du foyer / famille', type: 'text', required: true },
      { name: 'mois_annee', label: 'Mois / Année', type: 'text', required: true },
      { name: 'revenu_total', label: 'Revenus totaux (FCFA)', type: 'text', required: true },
      { name: 'loyer', label: 'Loyer / logement (FCFA)', type: 'text', required: false },
      { name: 'alimentation', label: 'Alimentation (FCFA)', type: 'text', required: false },
      { name: 'transport', label: 'Transport (FCFA)', type: 'text', required: false },
      { name: 'sante', label: 'Santé / pharmacie (FCFA)', type: 'text', required: false },
      { name: 'scolarite', label: 'Scolarité (FCFA)', type: 'text', required: false },
      { name: 'epargne', label: 'Épargne prévue (FCFA)', type: 'text', required: false },
      { name: 'autres_depenses', label: 'Autres dépenses (FCFA)', type: 'text', required: false },
      { name: 'objectifs', label: 'Objectifs du mois', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#1a3c5e;border-bottom:2px solid #2d6a9f;padding-bottom:8px;">BUDGET MENSUEL — {{nom_foyer}}</h1>
<p><strong>Période :</strong> {{mois_annee}}</p>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#1a3c5e;color:white;"><th style="padding:8px;text-align:left;">Poste</th><th style="padding:8px;text-align:right;">Montant (FCFA)</th></tr>
<tr style="background:#E3F2FD;"><td style="padding:8px;font-weight:bold;" colspan="2">REVENUS</td></tr>
<tr><td style="padding:6px 8px;border-bottom:1px solid #eee;">Revenus totaux</td><td style="padding:6px 8px;text-align:right;border-bottom:1px solid #eee;">{{revenu_total}}</td></tr>
<tr style="background:#E3F2FD;"><td style="padding:8px;font-weight:bold;" colspan="2">DÉPENSES</td></tr>
<tr><td style="padding:6px 8px;border-bottom:1px solid #eee;">Loyer / logement</td><td style="padding:6px 8px;text-align:right;">{{loyer}}</td></tr>
<tr><td style="padding:6px 8px;border-bottom:1px solid #eee;">Alimentation</td><td style="padding:6px 8px;text-align:right;">{{alimentation}}</td></tr>
<tr><td style="padding:6px 8px;border-bottom:1px solid #eee;">Transport / Santé / Scolarité</td><td style="padding:6px 8px;text-align:right;">{{transport}} / {{sante}} / {{scolarite}}</td></tr>
<tr><td style="padding:6px 8px;border-bottom:1px solid #eee;">Autres dépenses</td><td style="padding:6px 8px;text-align:right;">{{autres_depenses}}</td></tr>
<tr style="background:#FFF9C4;font-weight:bold;"><td style="padding:8px;">Épargne prévue</td><td style="padding:8px;text-align:right;">{{epargne}}</td></tr>
</table>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;margin-top:12px;"><strong>Objectifs :</strong> {{objectifs}}</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 50,
  },

  {
    code: 'fp_budget_annuel',
    name: 'Budget annuel personnel',
    category: 'commercial_financier',
    description: 'Planification du budget sur 12 mois',
    price: 300, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_personne', label: 'Nom complet', type: 'text', required: true },
      { name: 'annee', label: 'Année', type: 'text', required: true },
      { name: 'revenu_annuel', label: 'Revenus annuels (FCFA)', type: 'text', required: true },
      { name: 'charges_fixes', label: 'Charges fixes annuelles (FCFA)', type: 'text', required: false },
      { name: 'charges_variables', label: 'Charges variables estimées (FCFA)', type: 'text', required: false },
      { name: 'objectif_epargne', label: 'Objectif épargne annuelle (FCFA)', type: 'text', required: false },
      { name: 'projets_prevus', label: 'Projets prévus sur l\'année', type: 'textarea', required: false },
      { name: 'remarques', label: 'Remarques', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#1a3c5e;border-bottom:2px solid #2d6a9f;padding-bottom:8px;">BUDGET ANNUEL {{annee}} — {{nom_personne}}</h1>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#1a3c5e;color:white;"><th style="padding:8px;text-align:left;">Rubrique</th><th style="padding:8px;text-align:right;">Montant (FCFA)</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Revenus annuels totaux</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{revenu_annuel}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Charges fixes</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{charges_fixes}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Charges variables</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{charges_variables}}</td></tr>
<tr style="background:#FFF9C4;font-weight:bold;"><td style="padding:8px;">Objectif épargne</td><td style="padding:8px;text-align:right;">{{objectif_epargne}}</td></tr>
</table>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;"><strong>Projets :</strong> {{projets_prevus}}</div>
<div style="margin-top:10px;color:#555;font-size:13px;">{{remarques}}</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 45,
  },

  {
    code: 'fp_plan_epargne',
    name: "Plan d'épargne personnel",
    category: 'commercial_financier',
    description: "Définir et suivre un plan d'épargne avec objectifs",
    price: 250, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_epargnant', label: 'Nom de l\'épargnant', type: 'text', required: true },
      { name: 'objectif_nom', label: 'Nom de l\'objectif', type: 'text', required: true },
      { name: 'montant_cible', label: 'Montant cible (FCFA)', type: 'text', required: true },
      { name: 'montant_initial', label: 'Montant initial disponible (FCFA)', type: 'text', required: false },
      { name: 'epargne_mensuelle', label: 'Épargne mensuelle prévue (FCFA)', type: 'text', required: true },
      { name: 'duree_mois', label: 'Durée prévue (mois)', type: 'text', required: true },
      { name: 'date_debut', label: 'Date de début', type: 'date', required: true },
      { name: 'strategie', label: 'Stratégie d\'épargne', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#1a3c5e;border-bottom:2px solid #2d6a9f;padding-bottom:8px;">PLAN D'ÉPARGNE — {{nom_epargnant}}</h1>
<h2 style="color:#2d6a9f;margin-top:5px;">Objectif : {{objectif_nom}}</h2>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#1a3c5e;color:white;"><th style="padding:8px;text-align:left;">Paramètre</th><th style="padding:8px;text-align:right;">Valeur</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Montant cible</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{montant_cible}} FCFA</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Montant initial</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{montant_initial}} FCFA</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Épargne mensuelle</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{epargne_mensuelle}} FCFA</td></tr>
<tr style="background:#FFF9C4;font-weight:bold;"><td style="padding:8px;">Durée / Début</td><td style="padding:8px;text-align:right;">{{duree_mois}} mois — {{date_debut}}</td></tr>
</table>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;"><strong>Stratégie :</strong> {{strategie}}</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 48,
  },

  {
    code: 'fp_tableau_bord_finances',
    name: 'Tableau de bord finances personnelles',
    category: 'commercial_financier',
    description: 'Vue synthétique de la situation financière personnelle',
    price: 350, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_personne', label: 'Nom complet', type: 'text', required: true },
      { name: 'date_bilan', label: 'Date du bilan', type: 'date', required: true },
      { name: 'revenus_mensuels', label: 'Revenus mensuels nets (FCFA)', type: 'text', required: true },
      { name: 'depenses_mensuelles', label: 'Dépenses mensuelles (FCFA)', type: 'text', required: true },
      { name: 'epargne_actuelle', label: 'Épargne / liquidités (FCFA)', type: 'text', required: false },
      { name: 'dettes_totales', label: 'Dettes totales (FCFA)', type: 'text', required: false },
      { name: 'patrimoine_net', label: 'Patrimoine net estimé (FCFA)', type: 'text', required: false },
      { name: 'commentaire', label: 'Commentaire général', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#1a3c5e;border-bottom:2px solid #2d6a9f;padding-bottom:8px;">TABLEAU DE BORD FINANCES — {{nom_personne}}</h1>
<p style="color:#666;">Bilan au : <strong>{{date_bilan}}</strong></p>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#1a3c5e;color:white;"><th style="padding:8px;text-align:left;">Indicateur</th><th style="padding:8px;text-align:right;">Valeur (FCFA)</th></tr>
<tr style="background:#E8F5E9;"><td style="padding:7px 8px;border-bottom:1px solid #eee;">✅ Revenus mensuels nets</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{revenus_mensuels}}</td></tr>
<tr style="background:#FFEBEE;"><td style="padding:7px 8px;border-bottom:1px solid #eee;">❌ Dépenses mensuelles</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{depenses_mensuelles}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">💰 Épargne / liquidités</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{epargne_actuelle}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">📉 Dettes totales</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{dettes_totales}}</td></tr>
<tr style="background:#FFF9C4;font-weight:bold;"><td style="padding:8px;">🏦 Patrimoine net</td><td style="padding:8px;text-align:right;">{{patrimoine_net}}</td></tr>
</table>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;"><strong>Commentaire :</strong> {{commentaire}}</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 55,
  },

  {
    code: 'fp_suivi_depenses',
    name: 'Relevé et suivi des dépenses',
    category: 'commercial_financier',
    description: 'Suivre et catégoriser les dépenses personnelles',
    price: 150, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_personne', label: 'Nom', type: 'text', required: true },
      { name: 'periode', label: 'Période couverte', type: 'text', required: true },
      { name: 'budget_prevu', label: 'Budget prévu (FCFA)', type: 'text', required: true },
      { name: 'total_depense', label: 'Total dépensé (FCFA)', type: 'text', required: true },
      { name: 'categories_detail', label: 'Détail par catégorie', type: 'textarea', required: false },
      { name: 'ecart', label: 'Écart budget/réel (FCFA)', type: 'text', required: false },
      { name: 'observation', label: 'Observations', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#1a3c5e;border-bottom:2px solid #2d6a9f;padding-bottom:8px;">SUIVI DES DÉPENSES — {{nom_personne}}</h1>
<p><strong>Période :</strong> {{periode}}</p>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#1a3c5e;color:white;"><th style="padding:8px;text-align:left;">Rubrique</th><th style="padding:8px;text-align:right;">Montant (FCFA)</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Budget prévu</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{budget_prevu}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Total dépensé</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{total_depense}}</td></tr>
<tr style="background:#FFF9C4;font-weight:bold;"><td style="padding:8px;">Écart</td><td style="padding:8px;text-align:right;">{{ecart}}</td></tr>
</table>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;margin-bottom:10px;"><strong>Détail par catégorie :</strong><br/>{{categories_detail}}</div>
<div style="color:#555;font-size:13px;"><strong>Observations :</strong> {{observation}}</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 42,
  },

  {
    code: 'fp_plan_remboursement_dette',
    name: 'Plan de remboursement de dettes',
    category: 'commercial_financier',
    description: 'Établir un plan structuré de remboursement de dettes',
    price: 300, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_debiteur', label: 'Nom du débiteur', type: 'text', required: true },
      { name: 'dette_totale', label: 'Montant total des dettes (FCFA)', type: 'text', required: true },
      { name: 'detail_dettes', label: 'Détail des dettes (créanciers, montants)', type: 'textarea', required: true },
      { name: 'mensualite_prevue', label: 'Mensualité de remboursement (FCFA)', type: 'text', required: true },
      { name: 'duree_remboursement', label: 'Durée de remboursement (mois)', type: 'text', required: true },
      { name: 'date_debut', label: 'Date de début', type: 'date', required: true },
      { name: 'strategie', label: 'Stratégie adoptée', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#1a3c5e;border-bottom:2px solid #c0392b;padding-bottom:8px;">PLAN DE REMBOURSEMENT DE DETTES</h1>
<p><strong>Débiteur :</strong> {{nom_debiteur}} &nbsp;|&nbsp; <strong>Date de début :</strong> {{date_debut}}</p>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#c0392b;color:white;"><th style="padding:8px;text-align:left;">Élément</th><th style="padding:8px;text-align:right;">Valeur</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Dette totale</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{dette_totale}} FCFA</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Mensualité prévue</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{mensualite_prevue}} FCFA</td></tr>
<tr style="background:#FFF9C4;font-weight:bold;"><td style="padding:8px;">Durée</td><td style="padding:8px;text-align:right;">{{duree_remboursement}} mois</td></tr>
</table>
<div style="background:#FFF5F5;padding:12px;border-radius:4px;margin-bottom:10px;"><strong>Détail dettes :</strong><br/>{{detail_dettes}}</div>
<div style="background:#F0F4F8;padding:10px;border-radius:4px;"><strong>Stratégie :</strong> {{strategie}}</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 40,
  },

  {
    code: 'fp_negociation_salaire',
    name: 'Dossier de négociation de salaire',
    category: 'commercial_financier',
    description: 'Préparer et présenter un dossier de négociation salariale',
    price: 400, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_employe', label: 'Nom de l\'employé', type: 'text', required: true },
      { name: 'poste_actuel', label: 'Poste actuel', type: 'text', required: true },
      { name: 'salaire_actuel', label: 'Salaire actuel (FCFA)', type: 'text', required: true },
      { name: 'salaire_demande', label: 'Salaire demandé (FCFA)', type: 'text', required: true },
      { name: 'anciennete', label: 'Ancienneté (années)', type: 'text', required: true },
      { name: 'realisations', label: 'Principales réalisations', type: 'textarea', required: true },
      { name: 'arguments', label: 'Arguments justificatifs', type: 'textarea', required: false },
      { name: 'date_entretien', label: 'Date de l\'entretien', type: 'date', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#1a3c5e;border-bottom:2px solid #2d6a9f;padding-bottom:8px;">DOSSIER DE NÉGOCIATION SALARIALE</h1>
<p><strong>Employé :</strong> {{nom_employe}} &nbsp;|&nbsp; <strong>Poste :</strong> {{poste_actuel}} &nbsp;|&nbsp; <strong>Ancienneté :</strong> {{anciennete}} ans</p>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#1a3c5e;color:white;"><th style="padding:8px;text-align:left;">Salaire</th><th style="padding:8px;text-align:right;">Montant (FCFA)</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Salaire actuel</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{salaire_actuel}}</td></tr>
<tr style="background:#E8F5E9;font-weight:bold;"><td style="padding:8px;">Salaire demandé</td><td style="padding:8px;text-align:right;">{{salaire_demande}}</td></tr>
</table>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;margin-bottom:10px;"><strong>Réalisations :</strong><br/>{{realisations}}</div>
<div style="background:#E8F5E9;padding:10px;border-radius:4px;"><strong>Arguments :</strong> {{arguments}}</div>
<p style="color:#888;font-size:12px;margin-top:15px;">Entretien prévu le : {{date_entretien}}</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 38,
  },

  {
    code: 'fp_bilan_patrimonial',
    name: 'Bilan patrimonial personnel',
    category: 'commercial_financier',
    description: 'Dresser le bilan complet de son patrimoine (actif/passif)',
    price: 500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_personne', label: 'Nom complet', type: 'text', required: true },
      { name: 'date_bilan', label: 'Date du bilan', type: 'date', required: true },
      { name: 'immobilier', label: 'Biens immobiliers (FCFA)', type: 'text', required: false },
      { name: 'epargne_placement', label: 'Épargne & placements (FCFA)', type: 'text', required: false },
      { name: 'vehicules', label: 'Véhicules & équipements (FCFA)', type: 'text', required: false },
      { name: 'autres_actifs', label: 'Autres actifs (FCFA)', type: 'text', required: false },
      { name: 'credits_en_cours', label: 'Crédits en cours (FCFA)', type: 'text', required: false },
      { name: 'autres_dettes', label: 'Autres dettes (FCFA)', type: 'text', required: false },
      { name: 'patrimoine_net', label: 'Patrimoine net calculé (FCFA)', type: 'text', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#1a3c5e;border-bottom:2px solid #2d6a9f;padding-bottom:8px;">BILAN PATRIMONIAL — {{nom_personne}}</h1>
<p style="color:#666;">Au : <strong>{{date_bilan}}</strong></p>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#2e7d32;color:white;"><th colspan="2" style="padding:8px;">ACTIF</th></tr>
<tr><td style="padding:6px 8px;border-bottom:1px solid #eee;">Immobilier</td><td style="padding:6px 8px;text-align:right;border-bottom:1px solid #eee;">{{immobilier}}</td></tr>
<tr><td style="padding:6px 8px;border-bottom:1px solid #eee;">Épargne & placements</td><td style="padding:6px 8px;text-align:right;border-bottom:1px solid #eee;">{{epargne_placement}}</td></tr>
<tr><td style="padding:6px 8px;border-bottom:1px solid #eee;">Véhicules / Autres actifs</td><td style="padding:6px 8px;text-align:right;border-bottom:1px solid #eee;">{{vehicules}} / {{autres_actifs}}</td></tr>
<tr style="background:#c0392b;color:white;"><th colspan="2" style="padding:8px;">PASSIF</th></tr>
<tr><td style="padding:6px 8px;border-bottom:1px solid #eee;">Crédits en cours</td><td style="padding:6px 8px;text-align:right;border-bottom:1px solid #eee;">{{credits_en_cours}}</td></tr>
<tr><td style="padding:6px 8px;border-bottom:1px solid #eee;">Autres dettes</td><td style="padding:6px 8px;text-align:right;border-bottom:1px solid #eee;">{{autres_dettes}}</td></tr>
<tr style="background:#FFF9C4;font-weight:bold;"><td style="padding:8px;">PATRIMOINE NET</td><td style="padding:8px;text-align:right;">{{patrimoine_net}} FCFA</td></tr>
</table>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 43,
  },

  {
    code: 'fp_note_frais',
    name: 'Note de frais détaillée',
    category: 'commercial_financier',
    description: 'Soumettre une note de frais professionnels détaillée',
    price: 150, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_employe', label: 'Nom de l\'employé', type: 'text', required: true },
      { name: 'service', label: 'Service / Direction', type: 'text', required: false },
      { name: 'periode', label: 'Période des frais', type: 'text', required: true },
      { name: 'motif_deplacement', label: 'Motif / Mission', type: 'text', required: true },
      { name: 'transport_frais', label: 'Frais de transport (FCFA)', type: 'text', required: false },
      { name: 'hebergement_frais', label: 'Frais d\'hébergement (FCFA)', type: 'text', required: false },
      { name: 'repas_frais', label: 'Frais de repas (FCFA)', type: 'text', required: false },
      { name: 'autres_frais', label: 'Autres frais (FCFA)', type: 'text', required: false },
      { name: 'total_frais', label: 'Total à rembourser (FCFA)', type: 'text', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#1a3c5e;border-bottom:2px solid #2d6a9f;padding-bottom:8px;">NOTE DE FRAIS</h1>
<p><strong>Employé :</strong> {{nom_employe}} &nbsp;|&nbsp; <strong>Service :</strong> {{service}} &nbsp;|&nbsp; <strong>Période :</strong> {{periode}}</p>
<p><strong>Mission :</strong> {{motif_deplacement}}</p>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#1a3c5e;color:white;"><th style="padding:8px;text-align:left;">Nature des frais</th><th style="padding:8px;text-align:right;">Montant (FCFA)</th></tr>
<tr><td style="padding:6px 8px;border-bottom:1px solid #eee;">Transport</td><td style="padding:6px 8px;text-align:right;border-bottom:1px solid #eee;">{{transport_frais}}</td></tr>
<tr><td style="padding:6px 8px;border-bottom:1px solid #eee;">Hébergement</td><td style="padding:6px 8px;text-align:right;border-bottom:1px solid #eee;">{{hebergement_frais}}</td></tr>
<tr><td style="padding:6px 8px;border-bottom:1px solid #eee;">Repas</td><td style="padding:6px 8px;text-align:right;border-bottom:1px solid #eee;">{{repas_frais}}</td></tr>
<tr><td style="padding:6px 8px;border-bottom:1px solid #eee;">Autres</td><td style="padding:6px 8px;text-align:right;border-bottom:1px solid #eee;">{{autres_frais}}</td></tr>
<tr style="background:#FFF9C4;font-weight:bold;"><td style="padding:8px;">TOTAL À REMBOURSER</td><td style="padding:8px;text-align:right;">{{total_frais}}</td></tr>
</table>
<p style="color:#888;font-size:12px;">Signature de l'employé : _________________________ &nbsp;&nbsp; Visa supérieur : _________________________</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 60,
  },

  {
    code: 'fp_remboursement_frais',
    name: 'Demande de remboursement de frais',
    category: 'commercial_financier',
    description: 'Formulaire de demande formelle de remboursement de frais',
    price: 100, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_demandeur', label: 'Nom du demandeur', type: 'text', required: true },
      { name: 'date_demande', label: 'Date de la demande', type: 'date', required: true },
      { name: 'destinataire', label: 'À l\'attention de', type: 'text', required: true },
      { name: 'objet_frais', label: 'Objet des frais', type: 'text', required: true },
      { name: 'montant_total', label: 'Montant total (FCFA)', type: 'text', required: true },
      { name: 'detail_frais', label: 'Détail des frais engagés', type: 'textarea', required: true },
      { name: 'justificatifs', label: 'Justificatifs joints', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<p style="text-align:right;">{{nom_demandeur}}<br/>{{date_demande}}</p>
<p><strong>À l'attention de :</strong> {{destinataire}}</p>
<h2 style="color:#1a3c5e;">DEMANDE DE REMBOURSEMENT DE FRAIS</h2>
<p><strong>Objet :</strong> {{objet_frais}}</p>
<p>Je soussigné(e) <strong>{{nom_demandeur}}</strong> sollicite le remboursement des frais ci-après engagés dans le cadre de : {{objet_frais}}.</p>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;margin:15px 0;"><strong>Détail :</strong><br/>{{detail_frais}}</div>
<p style="font-size:16px;font-weight:bold;color:#1a3c5e;">Montant total à rembourser : {{montant_total}} FCFA</p>
<p><strong>Justificatifs :</strong> {{justificatifs}}</p>
<p style="margin-top:30px;">Signature : _________________________</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 55,
  },

  {
    code: 'fp_budget_mariage',
    name: 'Budget prévisionnel mariage',
    category: 'commercial_financier',
    description: 'Planifier et suivre le budget global de son mariage',
    price: 350, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'noms_maries', label: 'Noms des mariés', type: 'text', required: true },
      { name: 'date_mariage', label: 'Date du mariage', type: 'date', required: true },
      { name: 'budget_total', label: 'Budget total prévu (FCFA)', type: 'text', required: true },
      { name: 'salle_traiteur', label: 'Salle & traiteur (FCFA)', type: 'text', required: false },
      { name: 'tenue_habits', label: 'Tenues & habillement (FCFA)', type: 'text', required: false },
      { name: 'photographe', label: 'Photo / vidéo (FCFA)', type: 'text', required: false },
      { name: 'musique_anim', label: 'Musique & animation (FCFA)', type: 'text', required: false },
      { name: 'dot_coutumes', label: 'Dot & coutumes (FCFA)', type: 'text', required: false },
      { name: 'divers', label: 'Divers / imprévus (FCFA)', type: 'text', required: false },
      { name: 'contributions', label: 'Contributions / sponsors', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#7b1fa2;border-bottom:2px solid #9c27b0;padding-bottom:8px;">BUDGET MARIAGE — {{noms_maries}}</h1>
<p><strong>Date :</strong> {{date_mariage}} &nbsp;|&nbsp; <strong>Budget total :</strong> {{budget_total}} FCFA</p>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#7b1fa2;color:white;"><th style="padding:8px;text-align:left;">Poste</th><th style="padding:8px;text-align:right;">Montant (FCFA)</th></tr>
<tr><td style="padding:6px 8px;border-bottom:1px solid #eee;">Salle & traiteur</td><td style="padding:6px 8px;text-align:right;border-bottom:1px solid #eee;">{{salle_traiteur}}</td></tr>
<tr><td style="padding:6px 8px;border-bottom:1px solid #eee;">Tenues & habillement</td><td style="padding:6px 8px;text-align:right;border-bottom:1px solid #eee;">{{tenue_habits}}</td></tr>
<tr><td style="padding:6px 8px;border-bottom:1px solid #eee;">Photo / vidéo</td><td style="padding:6px 8px;text-align:right;border-bottom:1px solid #eee;">{{photographe}}</td></tr>
<tr><td style="padding:6px 8px;border-bottom:1px solid #eee;">Musique & animation</td><td style="padding:6px 8px;text-align:right;border-bottom:1px solid #eee;">{{musique_anim}}</td></tr>
<tr><td style="padding:6px 8px;border-bottom:1px solid #eee;">Dot & coutumes</td><td style="padding:6px 8px;text-align:right;border-bottom:1px solid #eee;">{{dot_coutumes}}</td></tr>
<tr><td style="padding:6px 8px;border-bottom:1px solid #eee;">Divers / imprévus</td><td style="padding:6px 8px;text-align:right;border-bottom:1px solid #eee;">{{divers}}</td></tr>
</table>
<div style="background:#F3E5F5;padding:12px;border-radius:4px;"><strong>Contributions :</strong> {{contributions}}</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 65,
  },

  {
    code: 'fp_budget_voyage',
    name: 'Budget voyage / vacances',
    category: 'commercial_financier',
    description: 'Planifier le budget complet d\'un voyage ou de vacances',
    price: 200, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_voyageur', label: 'Nom du voyageur / groupe', type: 'text', required: true },
      { name: 'destination', label: 'Destination', type: 'text', required: true },
      { name: 'dates_voyage', label: 'Dates du voyage', type: 'text', required: true },
      { name: 'budget_total', label: 'Budget total (FCFA)', type: 'text', required: true },
      { name: 'transport', label: 'Transport (FCFA)', type: 'text', required: false },
      { name: 'hebergement', label: 'Hébergement (FCFA)', type: 'text', required: false },
      { name: 'alimentation', label: 'Alimentation (FCFA)', type: 'text', required: false },
      { name: 'activites', label: 'Activités / excursions (FCFA)', type: 'text', required: false },
      { name: 'divers', label: 'Divers / imprévus (FCFA)', type: 'text', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#00695c;border-bottom:2px solid #00897b;padding-bottom:8px;">BUDGET VOYAGE — {{destination}}</h1>
<p><strong>Voyageur(s) :</strong> {{nom_voyageur}} &nbsp;|&nbsp; <strong>Dates :</strong> {{dates_voyage}}</p>
<p><strong>Budget total prévu :</strong> <span style="font-size:16px;color:#00695c;font-weight:bold;">{{budget_total}} FCFA</span></p>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#00695c;color:white;"><th style="padding:8px;text-align:left;">Poste</th><th style="padding:8px;text-align:right;">Montant (FCFA)</th></tr>
<tr><td style="padding:6px 8px;border-bottom:1px solid #eee;">Transport</td><td style="padding:6px 8px;text-align:right;border-bottom:1px solid #eee;">{{transport}}</td></tr>
<tr><td style="padding:6px 8px;border-bottom:1px solid #eee;">Hébergement</td><td style="padding:6px 8px;text-align:right;border-bottom:1px solid #eee;">{{hebergement}}</td></tr>
<tr><td style="padding:6px 8px;border-bottom:1px solid #eee;">Alimentation</td><td style="padding:6px 8px;text-align:right;border-bottom:1px solid #eee;">{{alimentation}}</td></tr>
<tr><td style="padding:6px 8px;border-bottom:1px solid #eee;">Activités</td><td style="padding:6px 8px;text-align:right;border-bottom:1px solid #eee;">{{activites}}</td></tr>
<tr style="background:#FFF9C4;font-weight:bold;"><td style="padding:8px;">Divers / imprévus</td><td style="padding:8px;text-align:right;">{{divers}}</td></tr>
</table>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 58,
  },

  {
    code: 'fp_budget_construction',
    name: 'Budget construction / rénovation',
    category: 'commercial_financier',
    description: 'Planifier le budget d\'un projet de construction ou rénovation',
    price: 400, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_maitre_ouvrage', label: 'Maître d\'ouvrage', type: 'text', required: true },
      { name: 'nature_projet', label: 'Nature du projet', type: 'text', required: true },
      { name: 'date_debut', label: 'Date de début prévue', type: 'date', required: false },
      { name: 'budget_total', label: 'Budget total (FCFA)', type: 'text', required: true },
      { name: 'gros_oeuvre', label: 'Gros œuvre (FCFA)', type: 'text', required: false },
      { name: 'second_oeuvre', label: 'Second œuvre / finitions (FCFA)', type: 'text', required: false },
      { name: 'main_oeuvre', label: 'Main d\'œuvre (FCFA)', type: 'text', required: false },
      { name: 'materiaux', label: 'Matériaux (FCFA)', type: 'text', required: false },
      { name: 'imprevu', label: 'Imprévus / réserve (FCFA)', type: 'text', required: false },
      { name: 'financement', label: 'Mode de financement', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#4e342e;border-bottom:2px solid #6d4c41;padding-bottom:8px;">BUDGET {{nature_projet}}</h1>
<p><strong>Maître d'ouvrage :</strong> {{nom_maitre_ouvrage}} &nbsp;|&nbsp; <strong>Début :</strong> {{date_debut}}</p>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#4e342e;color:white;"><th style="padding:8px;text-align:left;">Poste</th><th style="padding:8px;text-align:right;">Montant (FCFA)</th></tr>
<tr><td style="padding:6px 8px;border-bottom:1px solid #eee;">Gros œuvre</td><td style="padding:6px 8px;text-align:right;border-bottom:1px solid #eee;">{{gros_oeuvre}}</td></tr>
<tr><td style="padding:6px 8px;border-bottom:1px solid #eee;">Second œuvre / finitions</td><td style="padding:6px 8px;text-align:right;border-bottom:1px solid #eee;">{{second_oeuvre}}</td></tr>
<tr><td style="padding:6px 8px;border-bottom:1px solid #eee;">Main d'œuvre</td><td style="padding:6px 8px;text-align:right;border-bottom:1px solid #eee;">{{main_oeuvre}}</td></tr>
<tr><td style="padding:6px 8px;border-bottom:1px solid #eee;">Matériaux</td><td style="padding:6px 8px;text-align:right;border-bottom:1px solid #eee;">{{materiaux}}</td></tr>
<tr style="background:#FFF9C4;font-weight:bold;"><td style="padding:8px;">Imprévus / Total</td><td style="padding:8px;text-align:right;">{{imprevu}} / {{budget_total}}</td></tr>
</table>
<div style="background:#F0F4F8;padding:10px;border-radius:4px;"><strong>Financement :</strong> {{financement}}</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 47,
  },

  {
    code: 'fp_budget_scolarite',
    name: 'Budget scolarité enfants',
    category: 'commercial_financier',
    description: 'Planifier et suivre les dépenses de scolarité des enfants',
    price: 200, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_parent', label: 'Nom du parent / tuteur', type: 'text', required: true },
      { name: 'annee_scolaire', label: 'Année scolaire', type: 'text', required: true },
      { name: 'nombre_enfants', label: 'Nombre d\'enfants', type: 'text', required: true },
      { name: 'frais_inscription', label: 'Frais d\'inscription (FCFA)', type: 'text', required: false },
      { name: 'frais_scolarite', label: 'Frais de scolarité (FCFA)', type: 'text', required: false },
      { name: 'fournitures', label: 'Fournitures scolaires (FCFA)', type: 'text', required: false },
      { name: 'transport_scolaire', label: 'Transport scolaire (FCFA)', type: 'text', required: false },
      { name: 'cantine', label: 'Cantine / repas (FCFA)', type: 'text', required: false },
      { name: 'total_scolarite', label: 'Total annuel (FCFA)', type: 'text', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#1565c0;border-bottom:2px solid #1976d2;padding-bottom:8px;">BUDGET SCOLARITÉ {{annee_scolaire}}</h1>
<p><strong>Parent / Tuteur :</strong> {{nom_parent}} &nbsp;|&nbsp; <strong>Enfants :</strong> {{nombre_enfants}}</p>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#1565c0;color:white;"><th style="padding:8px;text-align:left;">Poste</th><th style="padding:8px;text-align:right;">Montant (FCFA)</th></tr>
<tr><td style="padding:6px 8px;border-bottom:1px solid #eee;">Frais d'inscription</td><td style="padding:6px 8px;text-align:right;border-bottom:1px solid #eee;">{{frais_inscription}}</td></tr>
<tr><td style="padding:6px 8px;border-bottom:1px solid #eee;">Frais de scolarité</td><td style="padding:6px 8px;text-align:right;border-bottom:1px solid #eee;">{{frais_scolarite}}</td></tr>
<tr><td style="padding:6px 8px;border-bottom:1px solid #eee;">Fournitures</td><td style="padding:6px 8px;text-align:right;border-bottom:1px solid #eee;">{{fournitures}}</td></tr>
<tr><td style="padding:6px 8px;border-bottom:1px solid #eee;">Transport / Cantine</td><td style="padding:6px 8px;text-align:right;border-bottom:1px solid #eee;">{{transport_scolaire}} / {{cantine}}</td></tr>
<tr style="background:#FFF9C4;font-weight:bold;"><td style="padding:8px;">TOTAL ANNUEL</td><td style="padding:8px;text-align:right;">{{total_scolarite}}</td></tr>
</table>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 52,
  },

  {
    code: 'fp_flux_tresorerie_perso',
    name: 'Flux de trésorerie personnel',
    category: 'commercial_financier',
    description: 'Analyser les flux entrants et sortants de trésorerie',
    price: 300, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_personne', label: 'Nom', type: 'text', required: true },
      { name: 'periode', label: 'Période analysée', type: 'text', required: true },
      { name: 'solde_debut', label: 'Solde début de période (FCFA)', type: 'text', required: true },
      { name: 'total_entrees', label: 'Total entrées (FCFA)', type: 'text', required: true },
      { name: 'detail_entrees', label: 'Détail des entrées', type: 'textarea', required: false },
      { name: 'total_sorties', label: 'Total sorties (FCFA)', type: 'text', required: true },
      { name: 'detail_sorties', label: 'Détail des sorties', type: 'textarea', required: false },
      { name: 'solde_fin', label: 'Solde fin de période (FCFA)', type: 'text', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#1a3c5e;border-bottom:2px solid #2d6a9f;padding-bottom:8px;">FLUX DE TRÉSORERIE — {{nom_personne}}</h1>
<p><strong>Période :</strong> {{periode}}</p>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#1a3c5e;color:white;"><th style="padding:8px;text-align:left;">Flux</th><th style="padding:8px;text-align:right;">Montant (FCFA)</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Solde début de période</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{solde_debut}}</td></tr>
<tr style="background:#E8F5E9;"><td style="padding:7px 8px;border-bottom:1px solid #eee;">+ Total entrées</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{total_entrees}}</td></tr>
<tr style="background:#FFEBEE;"><td style="padding:7px 8px;border-bottom:1px solid #eee;">- Total sorties</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{total_sorties}}</td></tr>
<tr style="background:#FFF9C4;font-weight:bold;"><td style="padding:8px;">= Solde fin de période</td><td style="padding:8px;text-align:right;">{{solde_fin}}</td></tr>
</table>
<div style="display:flex;gap:12px;"><div style="flex:1;background:#E8F5E9;padding:10px;border-radius:4px;"><strong>Entrées :</strong> {{detail_entrees}}</div><div style="flex:1;background:#FFEBEE;padding:10px;border-radius:4px;"><strong>Sorties :</strong> {{detail_sorties}}</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 44,
  },

  {
    code: 'fp_pret_familial',
    name: 'Reconnaissance de prêt familial',
    category: 'commercial_financier',
    description: 'Formaliser un prêt entre membres de la famille',
    price: 250, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_preteur', label: 'Nom du prêteur', type: 'text', required: true },
      { name: 'nom_emprunteur', label: 'Nom de l\'emprunteur', type: 'text', required: true },
      { name: 'lien_familial', label: 'Lien familial', type: 'text', required: false },
      { name: 'montant_pret', label: 'Montant du prêt (FCFA)', type: 'text', required: true },
      { name: 'date_pret', label: 'Date du prêt', type: 'date', required: true },
      { name: 'modalites_remboursement', label: 'Modalités de remboursement', type: 'textarea', required: true },
      { name: 'date_remboursement', label: 'Date limite de remboursement', type: 'date', required: true },
      { name: 'lieu_signature', label: 'Lieu de signature', type: 'text', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#1a3c5e;border-bottom:2px solid #2d6a9f;padding-bottom:8px;text-align:center;">RECONNAISSANCE DE PRÊT FAMILIAL</h1>
<p>Je soussigné(e) <strong>{{nom_emprunteur}}</strong>, reconnais avoir reçu en prêt de <strong>{{nom_preteur}}</strong> ({{lien_familial}}), la somme de <strong>{{montant_pret}} FCFA</strong> en date du <strong>{{date_pret}}</strong>.</p>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;margin:15px 0;"><strong>Modalités de remboursement :</strong><br/>{{modalites_remboursement}}</div>
<p>Le remboursement intégral interviendra au plus tard le : <strong>{{date_remboursement}}</strong>.</p>
<p>Fait à {{lieu_signature}}, le {{date_pret}}.</p>
<div style="display:flex;justify-content:space-between;margin-top:30px;"><div><p><strong>Le prêteur</strong></p><p>{{nom_preteur}}</p><br/><p>Signature : _______________</p></div><div><p><strong>L'emprunteur</strong></p><p>{{nom_emprunteur}}</p><br/><p>Signature : _______________</p></div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 50,
  },

  {
    code: 'fp_budget_event',
    name: 'Budget événement (anniversaire, cérémonie)',
    category: 'commercial_financier',
    description: "Planifier le budget d'un événement privé ou familial",
    price: 200, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_organisateur', label: 'Organisateur', type: 'text', required: true },
      { name: 'nature_evenement', label: 'Nature de l\'événement', type: 'text', required: true },
      { name: 'date_evenement', label: 'Date de l\'événement', type: 'date', required: true },
      { name: 'nombre_invites', label: 'Nombre d\'invités', type: 'text', required: false },
      { name: 'budget_total', label: 'Budget total (FCFA)', type: 'text', required: true },
      { name: 'location_salle', label: 'Location salle (FCFA)', type: 'text', required: false },
      { name: 'restauration', label: 'Restauration / boissons (FCFA)', type: 'text', required: false },
      { name: 'decoration', label: 'Décoration (FCFA)', type: 'text', required: false },
      { name: 'animation', label: 'Animation / DJ (FCFA)', type: 'text', required: false },
      { name: 'divers', label: 'Divers (FCFA)', type: 'text', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#e65100;border-bottom:2px solid #f57c00;padding-bottom:8px;">BUDGET — {{nature_evenement}}</h1>
<p><strong>Organisateur :</strong> {{nom_organisateur}} &nbsp;|&nbsp; <strong>Date :</strong> {{date_evenement}} &nbsp;|&nbsp; <strong>Invités :</strong> {{nombre_invites}}</p>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#e65100;color:white;"><th style="padding:8px;text-align:left;">Poste</th><th style="padding:8px;text-align:right;">Montant (FCFA)</th></tr>
<tr><td style="padding:6px 8px;border-bottom:1px solid #eee;">Location salle</td><td style="padding:6px 8px;text-align:right;border-bottom:1px solid #eee;">{{location_salle}}</td></tr>
<tr><td style="padding:6px 8px;border-bottom:1px solid #eee;">Restauration / boissons</td><td style="padding:6px 8px;text-align:right;border-bottom:1px solid #eee;">{{restauration}}</td></tr>
<tr><td style="padding:6px 8px;border-bottom:1px solid #eee;">Décoration</td><td style="padding:6px 8px;text-align:right;border-bottom:1px solid #eee;">{{decoration}}</td></tr>
<tr><td style="padding:6px 8px;border-bottom:1px solid #eee;">Animation / DJ</td><td style="padding:6px 8px;text-align:right;border-bottom:1px solid #eee;">{{animation}}</td></tr>
<tr><td style="padding:6px 8px;border-bottom:1px solid #eee;">Divers</td><td style="padding:6px 8px;text-align:right;border-bottom:1px solid #eee;">{{divers}}</td></tr>
<tr style="background:#FFF9C4;font-weight:bold;"><td style="padding:8px;">BUDGET TOTAL</td><td style="padding:8px;text-align:right;">{{budget_total}}</td></tr>
</table>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 48,
  },

  {
    code: 'fp_dossier_credit_personnel',
    name: 'Dossier de demande de crédit personnel',
    category: 'commercial_financier',
    description: 'Constituer un dossier solide de demande de crédit',
    price: 400, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_demandeur', label: 'Nom complet du demandeur', type: 'text', required: true },
      { name: 'date_naissance', label: 'Date de naissance', type: 'date', required: false },
      { name: 'employeur', label: 'Employeur / Activité', type: 'text', required: false },
      { name: 'revenu_mensuel', label: 'Revenu mensuel net (FCFA)', type: 'text', required: true },
      { name: 'montant_demande', label: 'Montant demandé (FCFA)', type: 'text', required: true },
      { name: 'objet_credit', label: 'Objet du crédit', type: 'text', required: true },
      { name: 'duree_souhaitee', label: 'Durée souhaitée (mois)', type: 'text', required: true },
      { name: 'garanties', label: 'Garanties proposées', type: 'textarea', required: false },
      { name: 'engagements', label: 'Engagements du demandeur', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#1a3c5e;border-bottom:2px solid #2d6a9f;padding-bottom:8px;">DOSSIER DE CRÉDIT PERSONNEL</h1>
<h2 style="color:#2d6a9f;">Demandeur : {{nom_demandeur}}</h2>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#1a3c5e;color:white;"><th style="padding:8px;text-align:left;">Informations</th><th style="padding:8px;text-align:left;">Détails</th></tr>
<tr><td style="padding:6px 8px;border-bottom:1px solid #eee;">Employeur / Activité</td><td style="padding:6px 8px;border-bottom:1px solid #eee;">{{employeur}}</td></tr>
<tr><td style="padding:6px 8px;border-bottom:1px solid #eee;">Revenu mensuel net</td><td style="padding:6px 8px;border-bottom:1px solid #eee;">{{revenu_mensuel}} FCFA</td></tr>
<tr><td style="padding:6px 8px;border-bottom:1px solid #eee;">Montant demandé</td><td style="padding:6px 8px;border-bottom:1px solid #eee;font-weight:bold;">{{montant_demande}} FCFA</td></tr>
<tr><td style="padding:6px 8px;border-bottom:1px solid #eee;">Objet</td><td style="padding:6px 8px;border-bottom:1px solid #eee;">{{objet_credit}}</td></tr>
<tr><td style="padding:6px 8px;border-bottom:1px solid #eee;">Durée souhaitée</td><td style="padding:6px 8px;border-bottom:1px solid #eee;">{{duree_souhaitee}} mois</td></tr>
</table>
<div style="background:#F0F4F8;padding:10px;border-radius:4px;margin-bottom:10px;"><strong>Garanties :</strong> {{garanties}}</div>
<div style="background:#E8F5E9;padding:10px;border-radius:4px;"><strong>Engagements :</strong> {{engagements}}</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 46,
  },

  {
    code: 'fp_letter_bank_reclamation',
    name: 'Lettre de réclamation à sa banque',
    category: 'commercial_financier',
    description: 'Rédiger une lettre formelle de réclamation adressée à sa banque',
    price: 150, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_client', label: 'Nom complet du client', type: 'text', required: true },
      { name: 'num_compte', label: 'Numéro de compte', type: 'text', required: true },
      { name: 'date_lettre', label: 'Date de la lettre', type: 'date', required: true },
      { name: 'nom_banque', label: 'Nom de la banque', type: 'text', required: true },
      { name: 'objet_reclamation', label: 'Objet de la réclamation', type: 'text', required: true },
      { name: 'description_probleme', label: 'Description du problème', type: 'textarea', required: true },
      { name: 'montant_litige', label: 'Montant en litige (FCFA)', type: 'text', required: false },
      { name: 'demarches_anterieures', label: 'Démarches déjà effectuées', type: 'textarea', required: false },
      { name: 'action_demandee', label: 'Action demandée à la banque', type: 'textarea', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<p style="text-align:right;">{{nom_client}}<br/>Compte N° : {{num_compte}}<br/>Le {{date_lettre}}</p>
<p><strong>À la Direction de {{nom_banque}}</strong></p>
<p style="margin-top:10px;"><strong>Objet : RÉCLAMATION — {{objet_reclamation}}</strong></p>
<p>Madame, Monsieur,</p>
<p>Je me permets de vous adresser la présente afin de vous signaler le problème suivant :</p>
<div style="background:#FFF5F5;padding:12px;border-left:4px solid #c0392b;margin:10px 0;">{{description_probleme}}</div>
<p>Montant en litige : <strong>{{montant_litige}} FCFA</strong></p>
<p><strong>Démarches effectuées :</strong> {{demarches_anterieures}}</p>
<div style="background:#F0F4F8;padding:10px;border-radius:4px;"><strong>Action demandée :</strong> {{action_demandee}}</div>
<p style="margin-top:20px;">Dans l'attente d'un retour favorable, veuillez agréer mes salutations distinguées.<br/><br/>{{nom_client}}</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 52,
  },

  {
    code: 'fp_convention_pret_honneur',
    name: "Convention de prêt d'honneur",
    category: 'commercial_financier',
    description: "Formaliser un prêt d'honneur entre particuliers ou associations",
    price: 300, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_organisme', label: 'Organisme / Association prêteur', type: 'text', required: true },
      { name: 'nom_beneficiaire', label: 'Nom du bénéficiaire', type: 'text', required: true },
      { name: 'projet_beneficiaire', label: 'Projet du bénéficiaire', type: 'text', required: true },
      { name: 'montant_pret', label: 'Montant du prêt (FCFA)', type: 'text', required: true },
      { name: 'date_convention', label: 'Date de la convention', type: 'date', required: true },
      { name: 'duree_remboursement', label: 'Durée de remboursement (mois)', type: 'text', required: true },
      { name: 'modalites', label: 'Modalités de remboursement', type: 'textarea', required: true },
      { name: 'engagements_beneficiaire', label: 'Engagements du bénéficiaire', type: 'textarea', required: false },
      { name: 'lieu_signature', label: 'Lieu de signature', type: 'text', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#1a3c5e;border-bottom:2px solid #2d6a9f;padding-bottom:8px;text-align:center;">CONVENTION DE PRÊT D'HONNEUR</h1>
<p>Entre <strong>{{nom_organisme}}</strong> (le prêteur) et <strong>{{nom_beneficiaire}}</strong> (le bénéficiaire), il est convenu ce qui suit :</p>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#1a3c5e;color:white;"><th style="padding:8px;text-align:left;">Paramètre</th><th style="padding:8px;text-align:left;">Valeur</th></tr>
<tr><td style="padding:6px 8px;border-bottom:1px solid #eee;">Projet financé</td><td style="padding:6px 8px;border-bottom:1px solid #eee;">{{projet_beneficiaire}}</td></tr>
<tr><td style="padding:6px 8px;border-bottom:1px solid #eee;">Montant accordé</td><td style="padding:6px 8px;border-bottom:1px solid #eee;font-weight:bold;">{{montant_pret}} FCFA</td></tr>
<tr><td style="padding:6px 8px;border-bottom:1px solid #eee;">Durée remboursement</td><td style="padding:6px 8px;border-bottom:1px solid #eee;">{{duree_remboursement}} mois</td></tr>
</table>
<div style="background:#F0F4F8;padding:10px;border-radius:4px;margin-bottom:10px;"><strong>Modalités :</strong> {{modalites}}</div>
<div style="background:#E8F5E9;padding:10px;border-radius:4px;margin-bottom:15px;"><strong>Engagements du bénéficiaire :</strong> {{engagements_beneficiaire}}</div>
<p>Fait à {{lieu_signature}}, le {{date_convention}}.</p>
<div style="display:flex;justify-content:space-between;margin-top:20px;"><div><strong>Le prêteur</strong><br/>{{nom_organisme}}<br/><br/>Signature : _______________</div><div><strong>Le bénéficiaire</strong><br/>{{nom_beneficiaire}}<br/><br/>Signature : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 41,
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
  console.log(`✅ Seed Finance Perso terminé. Créés: ${created}, Mis à jour: ${updated} — Total BDD: ${total}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
