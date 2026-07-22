import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const COUNTRIES = JSON.stringify(['CI','SN','CM','BJ','TG','BF','ML','GN','CD','CG','GA','NE','TD','MR']);

const templates = [
  {
    code: 'san2_convention_etablissement_soins',
    name: 'Convention établissement de soins',
    category: 'juridique_admin',
    description: 'Convention cadre entre établissements de soins pour collaboration médicale',
    price: 700, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'etablissement_1', label: 'Établissement de soins (partie 1)', type: 'text', required: true },
      { name: 'etablissement_2', label: 'Établissement de soins (partie 2)', type: 'text', required: true },
      { name: 'objet_convention', label: 'Objet de la convention', type: 'textarea', required: true },
      { name: 'date_debut', label: 'Date de prise d\'effet', type: 'date', required: true },
      { name: 'duree_convention', label: 'Durée (années)', type: 'text', required: true },
      { name: 'responsable_1', label: 'Responsable partie 1', type: 'text', required: true },
      { name: 'responsable_2', label: 'Responsable partie 2', type: 'text', required: true },
      { name: 'obligations_mutuelles', label: 'Obligations mutuelles', type: 'textarea', required: false },
      { name: 'lieu_signature', label: 'Lieu de signature', type: 'text', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;border:1px solid #ccc;">
<h1 style="color:#1a5276;border-bottom:3px solid #2980b9;padding-bottom:10px;text-align:center;">CONVENTION ENTRE ÉTABLISSEMENTS DE SOINS</h1>
<p style="text-align:center;color:#555;margin-bottom:18px;">Document contractuel à valeur juridique</p>
<p>Entre <strong>{{etablissement_1}}</strong>, représenté par <strong>{{responsable_1}}</strong>,<br/>et <strong>{{etablissement_2}}</strong>, représenté par <strong>{{responsable_2}}</strong>,<br/>il est convenu ce qui suit :</p>
<div style="background:#EAF2FB;padding:14px;border-radius:6px;margin:14px 0;"><strong>Objet :</strong> {{objet_convention}}</div>
<table style="width:100%;border-collapse:collapse;margin:16px 0;">
<tr style="background:#1a5276;color:white;"><th style="padding:9px;text-align:left;">Paramètre</th><th style="padding:9px;text-align:left;">Valeur</th></tr>
<tr><td style="padding:7px 9px;border-bottom:1px solid #ddd;">Date d'effet</td><td style="padding:7px 9px;border-bottom:1px solid #ddd;">{{date_debut}}</td></tr>
<tr><td style="padding:7px 9px;border-bottom:1px solid #ddd;">Durée</td><td style="padding:7px 9px;border-bottom:1px solid #ddd;">{{duree_convention}} an(s)</td></tr>
</table>
<div style="background:#F0F4F8;padding:12px;border-radius:6px;margin:12px 0;"><strong>Obligations mutuelles :</strong><br/>{{obligations_mutuelles}}</div>
<p style="margin-top:20px;">Fait à {{lieu_signature}}, le {{date_debut}}.</p>
<div style="display:flex;justify-content:space-between;margin-top:28px;">
<div style="text-align:center;"><strong>{{etablissement_1}}</strong><br/>{{responsable_1}}<br/><br/>Signature : _______________</div>
<div style="text-align:center;"><strong>{{etablissement_2}}</strong><br/>{{responsable_2}}<br/><br/>Signature : _______________</div>
</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 55,
  },

  {
    code: 'san2_contrat_medecin_vacataire',
    name: 'Contrat médecin vacataire',
    category: 'rh_emploi',
    description: 'Contrat de vacation médicale pour médecin intervenant ponctuellement',
    price: 600, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_medecin', label: 'Nom complet du médecin', type: 'text', required: true },
      { name: 'specialite', label: 'Spécialité médicale', type: 'text', required: true },
      { name: 'num_ordre', label: 'N° d\'ordre médical', type: 'text', required: true },
      { name: 'etablissement', label: 'Établissement employeur', type: 'text', required: true },
      { name: 'service_affecte', label: 'Service d\'affectation', type: 'text', required: false },
      { name: 'date_debut', label: 'Date de début', type: 'date', required: true },
      { name: 'date_fin', label: 'Date de fin', type: 'date', required: false },
      { name: 'taux_vacation', label: 'Taux de vacation (FCFA/heure)', type: 'text', required: true },
      { name: 'horaires', label: 'Horaires et jours d\'intervention', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1a5276;border-bottom:3px solid #2980b9;padding-bottom:10px;">CONTRAT DE VACATION MÉDICALE</h1>
<p>Entre <strong>{{etablissement}}</strong> et le Dr <strong>{{nom_medecin}}</strong>, spécialiste en <strong>{{specialite}}</strong> (N° Ordre : {{num_ordre}}), il est conclu le présent contrat.</p>
<table style="width:100%;border-collapse:collapse;margin:16px 0;">
<tr style="background:#1a5276;color:white;"><th style="padding:9px;text-align:left;">Élément</th><th style="padding:9px;text-align:left;">Détail</th></tr>
<tr><td style="padding:7px 9px;border-bottom:1px solid #ddd;">Service</td><td style="padding:7px 9px;border-bottom:1px solid #ddd;">{{service_affecte}}</td></tr>
<tr><td style="padding:7px 9px;border-bottom:1px solid #ddd;">Période</td><td style="padding:7px 9px;border-bottom:1px solid #ddd;">Du {{date_debut}} au {{date_fin}}</td></tr>
<tr><td style="padding:7px 9px;border-bottom:1px solid #ddd;">Taux horaire</td><td style="padding:7px 9px;border-bottom:1px solid #ddd;font-weight:bold;">{{taux_vacation}} FCFA/heure</td></tr>
</table>
<div style="background:#EAF2FB;padding:12px;border-radius:6px;margin:12px 0;"><strong>Horaires d'intervention :</strong><br/>{{horaires}}</div>
<p style="color:#555;font-size:13px;margin-top:16px;">Le médecin vacataire s'engage à respecter le règlement intérieur de l'établissement et les protocoles médicaux en vigueur.</p>
<div style="display:flex;justify-content:space-between;margin-top:28px;">
<div><strong>L'établissement</strong><br/><br/>Signature : _______________</div>
<div><strong>Dr {{nom_medecin}}</strong><br/><br/>Signature : _______________</div>
</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 52,
  },

  {
    code: 'san2_protocole_prise_en_charge_urgence',
    name: 'Protocole prise en charge urgence',
    category: 'juridique_admin',
    description: 'Protocole standardisé pour la prise en charge des urgences médicales',
    price: 500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'etablissement', label: 'Établissement de santé', type: 'text', required: true },
      { name: 'service_urgences', label: 'Service des urgences', type: 'text', required: true },
      { name: 'responsable_medical', label: 'Responsable médical', type: 'text', required: true },
      { name: 'date_mise_en_vigueur', label: 'Date de mise en vigueur', type: 'date', required: true },
      { name: 'type_urgences', label: 'Types d\'urgences couverts', type: 'textarea', required: true },
      { name: 'etapes_triage', label: 'Étapes de triage', type: 'textarea', required: false },
      { name: 'ressources_disponibles', label: 'Ressources disponibles', type: 'textarea', required: false },
      { name: 'contacts_urgents', label: 'Contacts d\'urgence internes', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;border-top:5px solid #c0392b;">
<h1 style="color:#c0392b;text-align:center;padding-bottom:10px;">PROTOCOLE DE PRISE EN CHARGE DES URGENCES</h1>
<p style="text-align:center;"><strong>{{etablissement}}</strong> — Service : {{service_urgences}}</p>
<p style="text-align:center;color:#555;">Responsable : {{responsable_medical}} | En vigueur depuis le : {{date_mise_en_vigueur}}</p>
<div style="background:#FDEDEC;border-left:4px solid #c0392b;padding:12px;margin:14px 0;"><strong>Urgences couvertes :</strong><br/>{{type_urgences}}</div>
<h2 style="color:#1a5276;margin-top:18px;">Étapes de triage</h2>
<div style="background:#EAF2FB;padding:12px;border-radius:6px;margin-bottom:14px;">{{etapes_triage}}</div>
<h2 style="color:#1a5276;">Ressources disponibles</h2>
<div style="background:#F0F4F8;padding:12px;border-radius:6px;margin-bottom:14px;">{{ressources_disponibles}}</div>
<div style="background:#FEF9E7;border-left:4px solid #f39c12;padding:12px;border-radius:4px;"><strong>Contacts d'urgence internes :</strong><br/>{{contacts_urgents}}</div>
<p style="color:#888;font-size:12px;text-align:right;margin-top:16px;">Document validé par {{responsable_medical}} — {{date_mise_en_vigueur}}</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 60,
  },

  {
    code: 'san2_reglement_interieur_clinique',
    name: 'Règlement intérieur clinique',
    category: 'juridique_admin',
    description: 'Règlement intérieur complet d\'une clinique ou établissement de santé',
    price: 800, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_clinique', label: 'Nom de la clinique', type: 'text', required: true },
      { name: 'adresse_clinique', label: 'Adresse', type: 'text', required: false },
      { name: 'directeur', label: 'Nom du directeur', type: 'text', required: true },
      { name: 'date_adoption', label: 'Date d\'adoption', type: 'date', required: true },
      { name: 'horaires_consultation', label: 'Horaires de consultation', type: 'text', required: false },
      { name: 'regles_acces', label: 'Règles d\'accès et de sécurité', type: 'textarea', required: false },
      { name: 'droits_patients', label: 'Droits des patients', type: 'textarea', required: false },
      { name: 'obligations_personnel', label: 'Obligations du personnel', type: 'textarea', required: false },
      { name: 'sanctions', label: 'Sanctions disciplinaires', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1a5276;border-bottom:3px solid #2980b9;padding-bottom:10px;text-align:center;">RÈGLEMENT INTÉRIEUR</h1>
<h2 style="color:#2980b9;text-align:center;margin-top:4px;">{{nom_clinique}}</h2>
<p style="text-align:center;color:#555;">{{adresse_clinique}} | Directeur : {{directeur}} | Adopté le : {{date_adoption}}</p>
<h3 style="color:#1a5276;border-left:4px solid #2980b9;padding-left:8px;margin-top:18px;">Article 1 — Horaires</h3>
<p style="margin-left:12px;">{{horaires_consultation}}</p>
<h3 style="color:#1a5276;border-left:4px solid #2980b9;padding-left:8px;">Article 2 — Accès et sécurité</h3>
<div style="background:#EAF2FB;padding:11px;border-radius:5px;margin:8px 0;">{{regles_acces}}</div>
<h3 style="color:#1a5276;border-left:4px solid #2980b9;padding-left:8px;">Article 3 — Droits des patients</h3>
<div style="background:#E9F7EF;padding:11px;border-radius:5px;margin:8px 0;">{{droits_patients}}</div>
<h3 style="color:#1a5276;border-left:4px solid #2980b9;padding-left:8px;">Article 4 — Obligations du personnel</h3>
<div style="background:#F0F4F8;padding:11px;border-radius:5px;margin:8px 0;">{{obligations_personnel}}</div>
<h3 style="color:#1a5276;border-left:4px solid #2980b9;padding-left:8px;">Article 5 — Sanctions</h3>
<div style="background:#FDEDEC;padding:11px;border-radius:5px;margin:8px 0;">{{sanctions}}</div>
<p style="margin-top:20px;text-align:right;">Le Directeur : {{directeur}}<br/>Signature : _______________</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 58,
  },

  {
    code: 'san2_contrat_assurance_maladie_groupe',
    name: 'Contrat assurance maladie groupe',
    category: 'commercial_financier',
    description: 'Contrat d\'assurance maladie collective pour entreprise ou groupe',
    price: 750, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'souscripteur', label: 'Souscripteur (entreprise)', type: 'text', required: true },
      { name: 'assureur', label: 'Compagnie d\'assurance', type: 'text', required: true },
      { name: 'nombre_beneficiaires', label: 'Nombre de bénéficiaires', type: 'text', required: true },
      { name: 'garanties_couvertes', label: 'Garanties couvertes', type: 'textarea', required: true },
      { name: 'plafond_remboursement', label: 'Plafond de remboursement annuel (FCFA)', type: 'text', required: true },
      { name: 'prime_mensuelle', label: 'Prime mensuelle totale (FCFA)', type: 'text', required: true },
      { name: 'date_effet', label: 'Date d\'effet', type: 'date', required: true },
      { name: 'duree_contrat', label: 'Durée du contrat (années)', type: 'text', required: true },
      { name: 'exclusions', label: 'Exclusions de garantie', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1a5276;border-bottom:3px solid #2980b9;padding-bottom:10px;text-align:center;">CONTRAT D'ASSURANCE MALADIE GROUPE</h1>
<p>Entre <strong>{{assureur}}</strong> (l'assureur) et <strong>{{souscripteur}}</strong> (le souscripteur), couvrant <strong>{{nombre_beneficiaires}}</strong> bénéficiaires.</p>
<table style="width:100%;border-collapse:collapse;margin:16px 0;">
<tr style="background:#1a5276;color:white;"><th style="padding:9px;text-align:left;">Paramètre</th><th style="padding:9px;text-align:right;">Valeur</th></tr>
<tr><td style="padding:7px 9px;border-bottom:1px solid #ddd;">Plafond remboursement / an</td><td style="padding:7px 9px;text-align:right;border-bottom:1px solid #ddd;">{{plafond_remboursement}} FCFA</td></tr>
<tr><td style="padding:7px 9px;border-bottom:1px solid #ddd;">Prime mensuelle</td><td style="padding:7px 9px;text-align:right;border-bottom:1px solid #ddd;font-weight:bold;">{{prime_mensuelle}} FCFA</td></tr>
<tr><td style="padding:7px 9px;border-bottom:1px solid #ddd;">Date d'effet</td><td style="padding:7px 9px;text-align:right;border-bottom:1px solid #ddd;">{{date_effet}}</td></tr>
<tr><td style="padding:7px 9px;border-bottom:1px solid #ddd;">Durée</td><td style="padding:7px 9px;text-align:right;border-bottom:1px solid #ddd;">{{duree_contrat}} an(s)</td></tr>
</table>
<div style="background:#E9F7EF;padding:12px;border-radius:6px;margin:12px 0;"><strong>Garanties couvertes :</strong><br/>{{garanties_couvertes}}</div>
<div style="background:#FDEDEC;padding:12px;border-radius:6px;margin:12px 0;"><strong>Exclusions :</strong><br/>{{exclusions}}</div>
<div style="display:flex;justify-content:space-between;margin-top:28px;">
<div><strong>{{assureur}}</strong><br/><br/>Signature : _______________</div>
<div><strong>{{souscripteur}}</strong><br/><br/>Signature : _______________</div>
</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 62,
  },

  {
    code: 'san2_cahier_charges_fournitures_medicales',
    name: 'Cahier des charges fournitures médicales',
    category: 'commercial_financier',
    description: 'Cahier des charges pour appel d\'offres de fournitures médicales',
    price: 650, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'etablissement_acheteur', label: 'Établissement acheteur', type: 'text', required: true },
      { name: 'responsable_achat', label: 'Responsable des achats', type: 'text', required: true },
      { name: 'date_publication', label: 'Date de publication', type: 'date', required: true },
      { name: 'date_limite_soumission', label: 'Date limite de soumission', type: 'date', required: true },
      { name: 'fournitures_requises', label: 'Fournitures médicales requises', type: 'textarea', required: true },
      { name: 'specifications_techniques', label: 'Spécifications techniques', type: 'textarea', required: false },
      { name: 'budget_prevu', label: 'Budget prévisionnel (FCFA)', type: 'text', required: false },
      { name: 'criteres_selection', label: 'Critères de sélection des offres', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1a5276;border-bottom:3px solid #2980b9;padding-bottom:10px;">CAHIER DES CHARGES — FOURNITURES MÉDICALES</h1>
<p><strong>Acheteur :</strong> {{etablissement_acheteur}} | <strong>Contact :</strong> {{responsable_achat}}</p>
<p><strong>Publication :</strong> {{date_publication}} | <strong>Limite de soumission :</strong> {{date_limite_soumission}}</p>
<h2 style="color:#1a5276;margin-top:16px;">1. Fournitures requises</h2>
<div style="background:#EAF2FB;padding:12px;border-radius:6px;margin:8px 0;">{{fournitures_requises}}</div>
<h2 style="color:#1a5276;">2. Spécifications techniques</h2>
<div style="background:#F0F4F8;padding:12px;border-radius:6px;margin:8px 0;">{{specifications_techniques}}</div>
<table style="width:100%;border-collapse:collapse;margin:14px 0;">
<tr style="background:#1a5276;color:white;"><th style="padding:9px;text-align:left;">Budget prévisionnel</th><th style="padding:9px;text-align:right;">{{budget_prevu}} FCFA</th></tr>
</table>
<h2 style="color:#1a5276;">3. Critères de sélection</h2>
<div style="background:#E9F7EF;padding:12px;border-radius:6px;">{{criteres_selection}}</div>
<p style="color:#888;font-size:12px;margin-top:16px;">Document émis par {{etablissement_acheteur}} — {{date_publication}}</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 47,
  },

  {
    code: 'san2_plan_evacuation_etablissement_sante',
    name: 'Plan évacuation établissement santé',
    category: 'juridique_admin',
    description: 'Plan d\'évacuation d\'urgence pour établissement de santé',
    price: 450, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_etablissement', label: 'Nom de l\'établissement', type: 'text', required: true },
      { name: 'responsable_securite', label: 'Responsable sécurité', type: 'text', required: true },
      { name: 'date_revision', label: 'Date de révision du plan', type: 'date', required: true },
      { name: 'zones_evacuation', label: 'Zones et points de rassemblement', type: 'textarea', required: true },
      { name: 'procedures_evacuation', label: 'Procédures d\'évacuation', type: 'textarea', required: true },
      { name: 'responsables_zones', label: 'Responsables par zone', type: 'textarea', required: false },
      { name: 'equipements_secours', label: 'Équipements de secours disponibles', type: 'textarea', required: false },
      { name: 'contacts_pompiers_samu', label: 'Contacts pompiers / SAMU', type: 'text', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;border-top:5px solid #e67e22;">
<h1 style="color:#e67e22;text-align:center;padding-bottom:10px;">PLAN D'ÉVACUATION D'URGENCE</h1>
<h2 style="color:#1a5276;text-align:center;margin-top:4px;">{{nom_etablissement}}</h2>
<p style="text-align:center;color:#555;">Responsable sécurité : <strong>{{responsable_securite}}</strong> | Révisé le : {{date_revision}}</p>
<div style="background:#FEF9E7;border-left:4px solid #e67e22;padding:12px;margin:14px 0;"><strong>Zones et points de rassemblement :</strong><br/>{{zones_evacuation}}</div>
<h3 style="color:#1a5276;margin-top:16px;">Procédures d'évacuation</h3>
<div style="background:#EAF2FB;padding:12px;border-radius:6px;margin:8px 0;">{{procedures_evacuation}}</div>
<h3 style="color:#1a5276;">Responsables par zone</h3>
<div style="background:#F0F4F8;padding:12px;border-radius:6px;margin:8px 0;">{{responsables_zones}}</div>
<h3 style="color:#1a5276;">Équipements de secours</h3>
<div style="background:#E9F7EF;padding:12px;border-radius:6px;margin:8px 0;">{{equipements_secours}}</div>
<div style="background:#FDEDEC;border-left:4px solid #c0392b;padding:10px;border-radius:4px;font-weight:bold;">Contacts d'urgence : {{contacts_pompiers_samu}}</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 50,
  },

  {
    code: 'san2_convention_partenariat_hospitalier',
    name: 'Convention partenariat hospitalier',
    category: 'juridique_admin',
    description: 'Convention de partenariat entre hôpitaux ou structures hospitalières',
    price: 700, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'hopital_1', label: 'Hôpital / Structure 1', type: 'text', required: true },
      { name: 'hopital_2', label: 'Hôpital / Structure 2', type: 'text', required: true },
      { name: 'objet_partenariat', label: 'Objet du partenariat', type: 'textarea', required: true },
      { name: 'activites_communes', label: 'Activités communes prévues', type: 'textarea', required: false },
      { name: 'partage_ressources', label: 'Modalités de partage des ressources', type: 'textarea', required: false },
      { name: 'duree', label: 'Durée du partenariat', type: 'text', required: true },
      { name: 'date_signature', label: 'Date de signature', type: 'date', required: true },
      { name: 'representant_1', label: 'Représentant hôpital 1', type: 'text', required: true },
      { name: 'representant_2', label: 'Représentant hôpital 2', type: 'text', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1a5276;border-bottom:3px solid #2980b9;padding-bottom:10px;text-align:center;">CONVENTION DE PARTENARIAT HOSPITALIER</h1>
<p>Entre <strong>{{hopital_1}}</strong>, représenté par <strong>{{representant_1}}</strong>,<br/>et <strong>{{hopital_2}}</strong>, représenté par <strong>{{representant_2}}</strong>.</p>
<div style="background:#EAF2FB;padding:14px;border-radius:6px;margin:14px 0;"><strong>Objet du partenariat :</strong><br/>{{objet_partenariat}}</div>
<h3 style="color:#1a5276;">Activités communes</h3>
<div style="background:#F0F4F8;padding:12px;border-radius:6px;margin:8px 0;">{{activites_communes}}</div>
<h3 style="color:#1a5276;">Partage des ressources</h3>
<div style="background:#E9F7EF;padding:12px;border-radius:6px;margin:8px 0;">{{partage_ressources}}</div>
<table style="width:100%;border-collapse:collapse;margin:14px 0;">
<tr style="background:#1a5276;color:white;"><th style="padding:9px;text-align:left;">Durée du partenariat</th><th style="padding:9px;text-align:left;">Date de signature</th></tr>
<tr><td style="padding:7px 9px;">{{duree}}</td><td style="padding:7px 9px;">{{date_signature}}</td></tr>
</table>
<div style="display:flex;justify-content:space-between;margin-top:28px;">
<div style="text-align:center;"><strong>{{hopital_1}}</strong><br/>{{representant_1}}<br/><br/>Signature : _______________</div>
<div style="text-align:center;"><strong>{{hopital_2}}</strong><br/>{{representant_2}}<br/><br/>Signature : _______________</div>
</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 54,
  },

  {
    code: 'san2_contrat_prestataire_nettoyage_medical',
    name: 'Contrat prestataire nettoyage médical',
    category: 'commercial_financier',
    description: 'Contrat de prestation de nettoyage et désinfection en milieu médical',
    price: 500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'etablissement_client', label: 'Établissement client', type: 'text', required: true },
      { name: 'prestataire', label: 'Prestataire de nettoyage', type: 'text', required: true },
      { name: 'zones_intervention', label: 'Zones d\'intervention', type: 'textarea', required: true },
      { name: 'frequence_nettoyage', label: 'Fréquence des interventions', type: 'text', required: true },
      { name: 'protocoles_desinfection', label: 'Protocoles de désinfection requis', type: 'textarea', required: false },
      { name: 'montant_mensuel', label: 'Montant mensuel (FCFA)', type: 'text', required: true },
      { name: 'date_debut', label: 'Date de début', type: 'date', required: true },
      { name: 'duree_contrat', label: 'Durée du contrat (mois)', type: 'text', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1a5276;border-bottom:3px solid #2980b9;padding-bottom:10px;">CONTRAT DE NETTOYAGE ET DÉSINFECTION MÉDICALE</h1>
<p>Entre <strong>{{etablissement_client}}</strong> (le client) et <strong>{{prestataire}}</strong> (le prestataire).</p>
<div style="background:#EAF2FB;padding:12px;border-radius:6px;margin:12px 0;"><strong>Zones d'intervention :</strong><br/>{{zones_intervention}}</div>
<table style="width:100%;border-collapse:collapse;margin:14px 0;">
<tr style="background:#1a5276;color:white;"><th style="padding:9px;text-align:left;">Élément</th><th style="padding:9px;text-align:right;">Valeur</th></tr>
<tr><td style="padding:7px 9px;border-bottom:1px solid #ddd;">Fréquence</td><td style="padding:7px 9px;text-align:right;border-bottom:1px solid #ddd;">{{frequence_nettoyage}}</td></tr>
<tr><td style="padding:7px 9px;border-bottom:1px solid #ddd;">Montant mensuel</td><td style="padding:7px 9px;text-align:right;border-bottom:1px solid #ddd;font-weight:bold;">{{montant_mensuel}} FCFA</td></tr>
<tr><td style="padding:7px 9px;border-bottom:1px solid #ddd;">Début du contrat</td><td style="padding:7px 9px;text-align:right;border-bottom:1px solid #ddd;">{{date_debut}}</td></tr>
<tr><td style="padding:7px 9px;border-bottom:1px solid #ddd;">Durée</td><td style="padding:7px 9px;text-align:right;border-bottom:1px solid #ddd;">{{duree_contrat}} mois</td></tr>
</table>
<div style="background:#E9F7EF;padding:12px;border-radius:6px;margin:12px 0;"><strong>Protocoles de désinfection :</strong><br/>{{protocoles_desinfection}}</div>
<div style="display:flex;justify-content:space-between;margin-top:24px;">
<div><strong>{{etablissement_client}}</strong><br/><br/>Signature : _______________</div>
<div><strong>{{prestataire}}</strong><br/><br/>Signature : _______________</div>
</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 44,
  },

  {
    code: 'san2_rapport_accreditation_clinique',
    name: 'Rapport accréditation clinique',
    category: 'juridique_admin',
    description: 'Rapport d\'accréditation et d\'évaluation de la qualité d\'une clinique',
    price: 600, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_clinique', label: 'Nom de la clinique', type: 'text', required: true },
      { name: 'organisme_accrediteur', label: 'Organisme accrédité', type: 'text', required: true },
      { name: 'date_evaluation', label: 'Date de l\'évaluation', type: 'date', required: true },
      { name: 'evaluateur', label: 'Évaluateur principal', type: 'text', required: true },
      { name: 'domaines_evalues', label: 'Domaines évalués', type: 'textarea', required: true },
      { name: 'points_forts', label: 'Points forts identifiés', type: 'textarea', required: false },
      { name: 'axes_amelioration', label: 'Axes d\'amélioration', type: 'textarea', required: false },
      { name: 'recommandations', label: 'Recommandations', type: 'textarea', required: false },
      { name: 'decision_accreditation', label: 'Décision d\'accréditation', type: 'text', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1a5276;border-bottom:3px solid #2980b9;padding-bottom:10px;text-align:center;">RAPPORT D'ACCRÉDITATION</h1>
<h2 style="text-align:center;color:#2980b9;">{{nom_clinique}}</h2>
<p style="text-align:center;color:#555;">Organisme : {{organisme_accrediteur}} | Évaluateur : {{evaluateur}} | Date : {{date_evaluation}}</p>
<div style="background:#EAF2FB;padding:12px;border-radius:6px;margin:14px 0;"><strong>Domaines évalués :</strong><br/>{{domaines_evalues}}</div>
<h3 style="color:#27ae60;">Points forts</h3>
<div style="background:#E9F7EF;padding:12px;border-radius:6px;margin:8px 0;">{{points_forts}}</div>
<h3 style="color:#e67e22;">Axes d'amélioration</h3>
<div style="background:#FEF9E7;padding:12px;border-radius:6px;margin:8px 0;">{{axes_amelioration}}</div>
<h3 style="color:#1a5276;">Recommandations</h3>
<div style="background:#F0F4F8;padding:12px;border-radius:6px;margin:8px 0;">{{recommandations}}</div>
<div style="background:#1a5276;color:white;padding:14px;border-radius:6px;text-align:center;font-size:16px;margin-top:16px;"><strong>Décision : {{decision_accreditation}}</strong></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 56,
  },

  {
    code: 'san2_fiche_procedure_chirurgicale',
    name: 'Fiche procédure chirurgicale',
    category: 'juridique_admin',
    description: 'Fiche standardisée de procédure chirurgicale pour bloc opératoire',
    price: 400, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_procedure', label: 'Nom de la procédure chirurgicale', type: 'text', required: true },
      { name: 'service_chirurgie', label: 'Service de chirurgie', type: 'text', required: true },
      { name: 'chirurgien_referent', label: 'Chirurgien référent', type: 'text', required: true },
      { name: 'date_validation', label: 'Date de validation', type: 'date', required: true },
      { name: 'indications', label: 'Indications opératoires', type: 'textarea', required: true },
      { name: 'contre_indications', label: 'Contre-indications', type: 'textarea', required: false },
      { name: 'etapes_procedure', label: 'Étapes de la procédure', type: 'textarea', required: true },
      { name: 'materiel_requis', label: 'Matériel requis', type: 'textarea', required: false },
      { name: 'complications_possibles', label: 'Complications possibles', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;border-top:4px solid #8e44ad;">
<h1 style="color:#8e44ad;text-align:center;padding-bottom:10px;">FICHE DE PROCÉDURE CHIRURGICALE</h1>
<h2 style="color:#1a5276;text-align:center;">{{nom_procedure}}</h2>
<p style="text-align:center;color:#555;">Service : {{service_chirurgie}} | Chirurgien référent : {{chirurgien_referent}} | Validé le : {{date_validation}}</p>
<div style="background:#F3E5F5;padding:12px;border-radius:6px;margin:14px 0;"><strong>Indications opératoires :</strong><br/>{{indications}}</div>
<div style="background:#FDEDEC;padding:12px;border-radius:6px;margin:12px 0;"><strong>Contre-indications :</strong><br/>{{contre_indications}}</div>
<h3 style="color:#1a5276;margin-top:16px;">Étapes de la procédure</h3>
<div style="background:#EAF2FB;padding:12px;border-radius:6px;margin:8px 0;">{{etapes_procedure}}</div>
<h3 style="color:#1a5276;">Matériel requis</h3>
<div style="background:#F0F4F8;padding:12px;border-radius:6px;margin:8px 0;">{{materiel_requis}}</div>
<div style="background:#FEF9E7;border-left:4px solid #e67e22;padding:12px;border-radius:4px;margin-top:14px;"><strong>Complications possibles :</strong><br/>{{complications_possibles}}</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 48,
  },

  {
    code: 'san2_accord_telemedecine',
    name: 'Accord télémédecine',
    category: 'juridique_admin',
    description: 'Accord cadre pour la mise en place de services de télémédecine',
    price: 650, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'etablissement_pilote', label: 'Établissement pilote', type: 'text', required: true },
      { name: 'partenaire_telemedecine', label: 'Partenaire télémédecine', type: 'text', required: true },
      { name: 'services_couverts', label: 'Services de télémédecine couverts', type: 'textarea', required: true },
      { name: 'plateforme_utilisee', label: 'Plateforme technologique utilisée', type: 'text', required: false },
      { name: 'conditions_acces_patients', label: 'Conditions d\'accès pour les patients', type: 'textarea', required: false },
      { name: 'remuneration_medecin', label: 'Rémunération médecin (FCFA/consultation)', type: 'text', required: false },
      { name: 'date_mise_en_oeuvre', label: 'Date de mise en œuvre', type: 'date', required: true },
      { name: 'protection_donnees', label: 'Clauses de protection des données', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1a5276;border-bottom:3px solid #2980b9;padding-bottom:10px;text-align:center;">ACCORD DE TÉLÉMÉDECINE</h1>
<p>Entre <strong>{{etablissement_pilote}}</strong> et <strong>{{partenaire_telemedecine}}</strong>, il est conclu le présent accord de télémédecine.</p>
<div style="background:#EAF2FB;padding:12px;border-radius:6px;margin:14px 0;"><strong>Services couverts :</strong><br/>{{services_couverts}}</div>
<table style="width:100%;border-collapse:collapse;margin:14px 0;">
<tr style="background:#1a5276;color:white;"><th style="padding:9px;text-align:left;">Paramètre</th><th style="padding:9px;text-align:left;">Valeur</th></tr>
<tr><td style="padding:7px 9px;border-bottom:1px solid #ddd;">Plateforme</td><td style="padding:7px 9px;border-bottom:1px solid #ddd;">{{plateforme_utilisee}}</td></tr>
<tr><td style="padding:7px 9px;border-bottom:1px solid #ddd;">Rémunération</td><td style="padding:7px 9px;border-bottom:1px solid #ddd;">{{remuneration_medecin}} FCFA / consultation</td></tr>
<tr><td style="padding:7px 9px;border-bottom:1px solid #ddd;">Mise en œuvre</td><td style="padding:7px 9px;border-bottom:1px solid #ddd;">{{date_mise_en_oeuvre}}</td></tr>
</table>
<div style="background:#F0F4F8;padding:12px;border-radius:6px;margin:12px 0;"><strong>Conditions d'accès patients :</strong><br/>{{conditions_acces_patients}}</div>
<div style="background:#FEF9E7;padding:12px;border-radius:6px;"><strong>Protection des données :</strong><br/>{{protection_donnees}}</div>
<div style="display:flex;justify-content:space-between;margin-top:24px;">
<div><strong>{{etablissement_pilote}}</strong><br/><br/>Signature : _______________</div>
<div><strong>{{partenaire_telemedecine}}</strong><br/><br/>Signature : _______________</div>
</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 63,
  },

  {
    code: 'san2_contrat_equipements_biomedicaux',
    name: 'Contrat équipements biomédicaux',
    category: 'commercial_financier',
    description: 'Contrat de fourniture et maintenance d\'équipements biomédicaux',
    price: 750, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'acheteur', label: 'Établissement acheteur', type: 'text', required: true },
      { name: 'fournisseur', label: 'Fournisseur d\'équipements', type: 'text', required: true },
      { name: 'equipements_fournis', label: 'Équipements biomédicaux fournis', type: 'textarea', required: true },
      { name: 'prix_total', label: 'Prix total (FCFA)', type: 'text', required: true },
      { name: 'modalites_paiement', label: 'Modalités de paiement', type: 'textarea', required: false },
      { name: 'garantie_duree', label: 'Durée de garantie (mois)', type: 'text', required: true },
      { name: 'maintenance_incluse', label: 'Maintenance incluse (oui/non + détail)', type: 'textarea', required: false },
      { name: 'date_livraison', label: 'Date de livraison prévue', type: 'date', required: true },
      { name: 'formation_operateurs', label: 'Formation des opérateurs prévue', type: 'text', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1a5276;border-bottom:3px solid #2980b9;padding-bottom:10px;">CONTRAT DE FOURNITURE D'ÉQUIPEMENTS BIOMÉDICAUX</h1>
<p>Entre <strong>{{acheteur}}</strong> (l'acheteur) et <strong>{{fournisseur}}</strong> (le fournisseur).</p>
<div style="background:#EAF2FB;padding:12px;border-radius:6px;margin:14px 0;"><strong>Équipements fournis :</strong><br/>{{equipements_fournis}}</div>
<table style="width:100%;border-collapse:collapse;margin:14px 0;">
<tr style="background:#1a5276;color:white;"><th style="padding:9px;text-align:left;">Paramètre</th><th style="padding:9px;text-align:right;">Valeur</th></tr>
<tr><td style="padding:7px 9px;border-bottom:1px solid #ddd;">Prix total</td><td style="padding:7px 9px;text-align:right;border-bottom:1px solid #ddd;font-weight:bold;">{{prix_total}} FCFA</td></tr>
<tr><td style="padding:7px 9px;border-bottom:1px solid #ddd;">Garantie</td><td style="padding:7px 9px;text-align:right;border-bottom:1px solid #ddd;">{{garantie_duree}} mois</td></tr>
<tr><td style="padding:7px 9px;border-bottom:1px solid #ddd;">Livraison prévue</td><td style="padding:7px 9px;text-align:right;border-bottom:1px solid #ddd;">{{date_livraison}}</td></tr>
<tr><td style="padding:7px 9px;border-bottom:1px solid #ddd;">Formation opérateurs</td><td style="padding:7px 9px;text-align:right;border-bottom:1px solid #ddd;">{{formation_operateurs}}</td></tr>
</table>
<div style="background:#F0F4F8;padding:12px;border-radius:6px;margin:12px 0;"><strong>Modalités de paiement :</strong><br/>{{modalites_paiement}}</div>
<div style="background:#E9F7EF;padding:12px;border-radius:6px;"><strong>Maintenance :</strong><br/>{{maintenance_incluse}}</div>
<div style="display:flex;justify-content:space-between;margin-top:24px;">
<div><strong>{{acheteur}}</strong><br/><br/>Signature : _______________</div>
<div><strong>{{fournisseur}}</strong><br/><br/>Signature : _______________</div>
</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 51,
  },

  {
    code: 'san2_plan_formation_personnel_soignant',
    name: 'Plan formation personnel soignant',
    category: 'rh_emploi',
    description: 'Plan annuel de formation et développement des compétences du personnel soignant',
    price: 500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'etablissement', label: 'Établissement de santé', type: 'text', required: true },
      { name: 'responsable_formation', label: 'Responsable de la formation', type: 'text', required: true },
      { name: 'annee_plan', label: 'Année du plan', type: 'text', required: true },
      { name: 'effectif_concerne', label: 'Effectif concerné', type: 'text', required: false },
      { name: 'formations_prevues', label: 'Formations prévues', type: 'textarea', required: true },
      { name: 'budget_formation', label: 'Budget formation (FCFA)', type: 'text', required: false },
      { name: 'organismes_formateurs', label: 'Organismes formateurs', type: 'textarea', required: false },
      { name: 'indicateurs_suivi', label: 'Indicateurs de suivi et évaluation', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1a5276;border-bottom:3px solid #2980b9;padding-bottom:10px;">PLAN DE FORMATION DU PERSONNEL SOIGNANT {{annee_plan}}</h1>
<p><strong>Établissement :</strong> {{etablissement}} | <strong>Responsable :</strong> {{responsable_formation}}</p>
<p><strong>Effectif concerné :</strong> {{effectif_concerne}} agents | <strong>Budget :</strong> {{budget_formation}} FCFA</p>
<h3 style="color:#1a5276;margin-top:16px;">Formations prévues</h3>
<div style="background:#EAF2FB;padding:12px;border-radius:6px;margin:8px 0;">{{formations_prevues}}</div>
<h3 style="color:#1a5276;">Organismes formateurs</h3>
<div style="background:#F0F4F8;padding:12px;border-radius:6px;margin:8px 0;">{{organismes_formateurs}}</div>
<h3 style="color:#1a5276;">Indicateurs de suivi</h3>
<div style="background:#E9F7EF;padding:12px;border-radius:6px;margin:8px 0;">{{indicateurs_suivi}}</div>
<p style="color:#888;font-size:12px;text-align:right;margin-top:16px;">Plan validé par {{responsable_formation}} — {{annee_plan}}</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 57,
  },

  {
    code: 'san2_convention_reseau_medecins',
    name: 'Convention réseau médecins',
    category: 'juridique_admin',
    description: 'Convention de création et fonctionnement d\'un réseau de médecins',
    price: 600, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_reseau', label: 'Nom du réseau médical', type: 'text', required: true },
      { name: 'structure_coordinatrice', label: 'Structure coordinatrice', type: 'text', required: true },
      { name: 'membres_fondateurs', label: 'Membres fondateurs du réseau', type: 'textarea', required: true },
      { name: 'objectifs_reseau', label: 'Objectifs du réseau', type: 'textarea', required: true },
      { name: 'mode_gouvernance', label: 'Mode de gouvernance', type: 'textarea', required: false },
      { name: 'criteres_adhesion', label: 'Critères d\'adhésion', type: 'textarea', required: false },
      { name: 'cotisation_annuelle', label: 'Cotisation annuelle (FCFA)', type: 'text', required: false },
      { name: 'date_creation', label: 'Date de création', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1a5276;border-bottom:3px solid #2980b9;padding-bottom:10px;text-align:center;">CONVENTION DE RÉSEAU MÉDICAL</h1>
<h2 style="color:#2980b9;text-align:center;">{{nom_reseau}}</h2>
<p style="text-align:center;color:#555;">Coordonné par : {{structure_coordinatrice}} | Créé le : {{date_creation}}</p>
<div style="background:#EAF2FB;padding:12px;border-radius:6px;margin:14px 0;"><strong>Objectifs :</strong><br/>{{objectifs_reseau}}</div>
<h3 style="color:#1a5276;">Membres fondateurs</h3>
<div style="background:#F0F4F8;padding:12px;border-radius:6px;margin:8px 0;">{{membres_fondateurs}}</div>
<h3 style="color:#1a5276;">Gouvernance</h3>
<div style="background:#E9F7EF;padding:12px;border-radius:6px;margin:8px 0;">{{mode_gouvernance}}</div>
<table style="width:100%;border-collapse:collapse;margin:14px 0;">
<tr style="background:#1a5276;color:white;"><th style="padding:9px;text-align:left;">Critères d'adhésion</th><th style="padding:9px;text-align:right;">Cotisation annuelle</th></tr>
<tr><td style="padding:8px;">{{criteres_adhesion}}</td><td style="padding:8px;text-align:right;font-weight:bold;">{{cotisation_annuelle}} FCFA</td></tr>
</table>
<p style="color:#888;font-size:12px;margin-top:12px;">Convention signée par les membres fondateurs le {{date_creation}}.</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 45,
  },

  {
    code: 'san2_contrat_laboratoire_analyse',
    name: 'Contrat laboratoire analyse',
    category: 'commercial_financier',
    description: 'Contrat de prestation entre établissement de santé et laboratoire d\'analyses',
    price: 550, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'etablissement_prescripteur', label: 'Établissement prescripteur', type: 'text', required: true },
      { name: 'laboratoire', label: 'Laboratoire d\'analyses', type: 'text', required: true },
      { name: 'analyses_couvertes', label: 'Types d\'analyses couvertes', type: 'textarea', required: true },
      { name: 'delai_resultats', label: 'Délai de rendu des résultats', type: 'text', required: true },
      { name: 'tarifs_appliques', label: 'Tarifs appliqués', type: 'textarea', required: false },
      { name: 'modalite_transmission', label: 'Modalité de transmission des résultats', type: 'text', required: false },
      { name: 'date_debut', label: 'Date de début', type: 'date', required: true },
      { name: 'duree_contrat', label: 'Durée du contrat (mois)', type: 'text', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1a5276;border-bottom:3px solid #2980b9;padding-bottom:10px;">CONTRAT DE PRESTATION LABORATOIRE</h1>
<p>Entre <strong>{{etablissement_prescripteur}}</strong> et <strong>{{laboratoire}}</strong>.</p>
<div style="background:#EAF2FB;padding:12px;border-radius:6px;margin:14px 0;"><strong>Analyses couvertes :</strong><br/>{{analyses_couvertes}}</div>
<table style="width:100%;border-collapse:collapse;margin:14px 0;">
<tr style="background:#1a5276;color:white;"><th style="padding:9px;text-align:left;">Paramètre</th><th style="padding:9px;text-align:left;">Valeur</th></tr>
<tr><td style="padding:7px 9px;border-bottom:1px solid #ddd;">Délai de rendu</td><td style="padding:7px 9px;border-bottom:1px solid #ddd;">{{delai_resultats}}</td></tr>
<tr><td style="padding:7px 9px;border-bottom:1px solid #ddd;">Transmission résultats</td><td style="padding:7px 9px;border-bottom:1px solid #ddd;">{{modalite_transmission}}</td></tr>
<tr><td style="padding:7px 9px;border-bottom:1px solid #ddd;">Début</td><td style="padding:7px 9px;border-bottom:1px solid #ddd;">{{date_debut}}</td></tr>
<tr><td style="padding:7px 9px;border-bottom:1px solid #ddd;">Durée</td><td style="padding:7px 9px;border-bottom:1px solid #ddd;">{{duree_contrat}} mois</td></tr>
</table>
<div style="background:#F0F4F8;padding:12px;border-radius:6px;margin:12px 0;"><strong>Tarifs :</strong><br/>{{tarifs_appliques}}</div>
<div style="display:flex;justify-content:space-between;margin-top:24px;">
<div><strong>{{etablissement_prescripteur}}</strong><br/><br/>Signature : _______________</div>
<div><strong>{{laboratoire}}</strong><br/><br/>Signature : _______________</div>
</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 49,
  },

  {
    code: 'san2_protocole_gestion_medicaments',
    name: 'Protocole gestion médicaments',
    category: 'juridique_admin',
    description: 'Protocole de gestion, stockage et dispensation des médicaments',
    price: 400, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'etablissement', label: 'Établissement de santé', type: 'text', required: true },
      { name: 'pharmacien_responsable', label: 'Pharmacien responsable', type: 'text', required: true },
      { name: 'date_protocole', label: 'Date du protocole', type: 'date', required: true },
      { name: 'categories_medicaments', label: 'Catégories de médicaments concernées', type: 'textarea', required: true },
      { name: 'conditions_stockage', label: 'Conditions de stockage', type: 'textarea', required: true },
      { name: 'procedure_dispensation', label: 'Procédure de dispensation', type: 'textarea', required: false },
      { name: 'gestion_perimes', label: 'Gestion des médicaments périmés', type: 'textarea', required: false },
      { name: 'tracabilite', label: 'Traçabilité et enregistrement', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;border-top:4px solid #2ecc71;">
<h1 style="color:#1a5276;text-align:center;padding-bottom:10px;">PROTOCOLE DE GESTION DES MÉDICAMENTS</h1>
<p style="text-align:center;"><strong>{{etablissement}}</strong></p>
<p style="text-align:center;color:#555;">Pharmacien responsable : {{pharmacien_responsable}} | Protocole du : {{date_protocole}}</p>
<div style="background:#EAF2FB;padding:12px;border-radius:6px;margin:14px 0;"><strong>Catégories de médicaments :</strong><br/>{{categories_medicaments}}</div>
<h3 style="color:#1a5276;margin-top:16px;">Conditions de stockage</h3>
<div style="background:#E9F7EF;padding:12px;border-radius:6px;margin:8px 0;">{{conditions_stockage}}</div>
<h3 style="color:#1a5276;">Procédure de dispensation</h3>
<div style="background:#F0F4F8;padding:12px;border-radius:6px;margin:8px 0;">{{procedure_dispensation}}</div>
<h3 style="color:#1a5276;">Médicaments périmés</h3>
<div style="background:#FEF9E7;padding:12px;border-radius:6px;margin:8px 0;">{{gestion_perimes}}</div>
<div style="background:#EAF2FB;border-left:4px solid #2980b9;padding:12px;border-radius:4px;margin-top:14px;"><strong>Traçabilité :</strong><br/>{{tracabilite}}</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 53,
  },

  {
    code: 'san2_rapport_qualite_soins',
    name: 'Rapport qualité soins',
    category: 'juridique_admin',
    description: 'Rapport périodique d\'évaluation et de suivi de la qualité des soins',
    price: 550, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'etablissement', label: 'Établissement de santé', type: 'text', required: true },
      { name: 'periode_rapport', label: 'Période du rapport', type: 'text', required: true },
      { name: 'responsable_qualite', label: 'Responsable qualité', type: 'text', required: true },
      { name: 'indicateurs_cles', label: 'Indicateurs clés de qualité', type: 'textarea', required: true },
      { name: 'resultats_obtenus', label: 'Résultats obtenus', type: 'textarea', required: true },
      { name: 'incidents_signales', label: 'Incidents signalés', type: 'textarea', required: false },
      { name: 'actions_correctives', label: 'Actions correctives engagées', type: 'textarea', required: false },
      { name: 'objectifs_prochain_trimestre', label: 'Objectifs pour la prochaine période', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1a5276;border-bottom:3px solid #2980b9;padding-bottom:10px;text-align:center;">RAPPORT QUALITÉ DES SOINS</h1>
<h2 style="color:#2980b9;text-align:center;">{{etablissement}}</h2>
<p style="text-align:center;color:#555;">Période : {{periode_rapport}} | Responsable qualité : {{responsable_qualite}}</p>
<h3 style="color:#1a5276;margin-top:18px;">Indicateurs clés</h3>
<div style="background:#EAF2FB;padding:12px;border-radius:6px;margin:8px 0;">{{indicateurs_cles}}</div>
<h3 style="color:#27ae60;">Résultats obtenus</h3>
<div style="background:#E9F7EF;padding:12px;border-radius:6px;margin:8px 0;">{{resultats_obtenus}}</div>
<h3 style="color:#e74c3c;">Incidents signalés</h3>
<div style="background:#FDEDEC;padding:12px;border-radius:6px;margin:8px 0;">{{incidents_signales}}</div>
<h3 style="color:#e67e22;">Actions correctives</h3>
<div style="background:#FEF9E7;padding:12px;border-radius:6px;margin:8px 0;">{{actions_correctives}}</div>
<div style="background:#1a5276;color:white;padding:12px;border-radius:6px;margin-top:14px;"><strong>Objectifs prochaine période :</strong><br/>{{objectifs_prochain_trimestre}}</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 59,
  },

  {
    code: 'san2_convention_ambulance_samu',
    name: 'Convention ambulance SAMU',
    category: 'juridique_admin',
    description: 'Convention de coordination entre service ambulancier et SAMU',
    price: 600, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'service_ambulancier', label: 'Service ambulancier', type: 'text', required: true },
      { name: 'samu_partenaire', label: 'SAMU / Centre de régulation', type: 'text', required: true },
      { name: 'zone_intervention', label: 'Zone géographique d\'intervention', type: 'text', required: true },
      { name: 'protocoles_intervention', label: 'Protocoles d\'intervention', type: 'textarea', required: true },
      { name: 'moyens_communication', label: 'Moyens de communication', type: 'text', required: false },
      { name: 'delai_intervention_moyen', label: 'Délai d\'intervention moyen (minutes)', type: 'text', required: false },
      { name: 'tarification', label: 'Tarification des interventions (FCFA)', type: 'textarea', required: false },
      { name: 'date_convention', label: 'Date de la convention', type: 'date', required: true },
      { name: 'duree_validite', label: 'Durée de validité (années)', type: 'text', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;border-top:5px solid #c0392b;">
<h1 style="color:#c0392b;text-align:center;padding-bottom:10px;">CONVENTION AMBULANCE — SAMU</h1>
<p>Entre <strong>{{service_ambulancier}}</strong> et <strong>{{samu_partenaire}}</strong>.</p>
<p><strong>Zone d'intervention :</strong> {{zone_intervention}} | <strong>Délai moyen :</strong> {{delai_intervention_moyen}} min</p>
<div style="background:#FDEDEC;border-left:4px solid #c0392b;padding:12px;margin:14px 0;"><strong>Protocoles d'intervention :</strong><br/>{{protocoles_intervention}}</div>
<table style="width:100%;border-collapse:collapse;margin:14px 0;">
<tr style="background:#c0392b;color:white;"><th style="padding:9px;text-align:left;">Paramètre</th><th style="padding:9px;text-align:left;">Valeur</th></tr>
<tr><td style="padding:7px 9px;border-bottom:1px solid #ddd;">Communication</td><td style="padding:7px 9px;border-bottom:1px solid #ddd;">{{moyens_communication}}</td></tr>
<tr><td style="padding:7px 9px;border-bottom:1px solid #ddd;">Date de convention</td><td style="padding:7px 9px;border-bottom:1px solid #ddd;">{{date_convention}}</td></tr>
<tr><td style="padding:7px 9px;border-bottom:1px solid #ddd;">Durée de validité</td><td style="padding:7px 9px;border-bottom:1px solid #ddd;">{{duree_validite}} an(s)</td></tr>
</table>
<div style="background:#F0F4F8;padding:12px;border-radius:6px;margin:12px 0;"><strong>Tarification :</strong><br/>{{tarification}}</div>
<div style="display:flex;justify-content:space-between;margin-top:24px;">
<div><strong>{{service_ambulancier}}</strong><br/><br/>Signature : _______________</div>
<div><strong>{{samu_partenaire}}</strong><br/><br/>Signature : _______________</div>
</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 61,
  },

  {
    code: 'san2_plan_pandemie_etablissement',
    name: 'Plan pandémie établissement',
    category: 'juridique_admin',
    description: 'Plan de gestion de pandémie pour établissement de santé',
    price: 800, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_etablissement', label: 'Nom de l\'établissement', type: 'text', required: true },
      { name: 'cellule_crise', label: 'Membres de la cellule de crise', type: 'textarea', required: true },
      { name: 'date_elaboration', label: 'Date d\'élaboration', type: 'date', required: true },
      { name: 'scenarios_couverts', label: 'Scénarios de pandémie couverts', type: 'textarea', required: true },
      { name: 'mesures_prevention', label: 'Mesures de prévention', type: 'textarea', required: true },
      { name: 'capacite_accueil_urgence', label: 'Capacité d\'accueil en situation d\'urgence', type: 'text', required: false },
      { name: 'stocks_strategiques', label: 'Stocks stratégiques disponibles', type: 'textarea', required: false },
      { name: 'communication_externe', label: 'Plan de communication externe', type: 'textarea', required: false },
      { name: 'coordination_autorites', label: 'Coordination avec les autorités sanitaires', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;border:2px solid #e74c3c;">
<h1 style="color:#e74c3c;text-align:center;padding-bottom:10px;">PLAN PANDÉMIE</h1>
<h2 style="color:#1a5276;text-align:center;margin-top:4px;">{{nom_etablissement}}</h2>
<p style="text-align:center;color:#555;">Élaboré le : {{date_elaboration}} | Capacité urgence : {{capacite_accueil_urgence}} lits</p>
<div style="background:#FDEDEC;border-left:4px solid #e74c3c;padding:12px;margin:14px 0;"><strong>Cellule de crise :</strong><br/>{{cellule_crise}}</div>
<h3 style="color:#c0392b;margin-top:16px;">Scénarios couverts</h3>
<div style="background:#FEF9E7;padding:12px;border-radius:6px;margin:8px 0;">{{scenarios_couverts}}</div>
<h3 style="color:#1a5276;">Mesures de prévention</h3>
<div style="background:#E9F7EF;padding:12px;border-radius:6px;margin:8px 0;">{{mesures_prevention}}</div>
<h3 style="color:#1a5276;">Stocks stratégiques</h3>
<div style="background:#EAF2FB;padding:12px;border-radius:6px;margin:8px 0;">{{stocks_strategiques}}</div>
<h3 style="color:#1a5276;">Communication externe</h3>
<div style="background:#F0F4F8;padding:12px;border-radius:6px;margin:8px 0;">{{communication_externe}}</div>
<div style="background:#1a5276;color:white;padding:12px;border-radius:6px;margin-top:14px;"><strong>Coordination autorités sanitaires :</strong><br/>{{coordination_autorites}}</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 66,
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
  console.log(`✅ Seed Santé Avancé terminé. Créés: ${created}, Mis à jour: ${updated} — Total BDD: ${total}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
