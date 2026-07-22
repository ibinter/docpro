import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const COUNTRIES = JSON.stringify(['CI','SN','CM','BJ','TG','BF','ML','GN','CD','CG','GA','NE','TD','MR']);

const templates = [
  {
    code: 'tech_contrat_infogerance',
    name: 'Contrat infogérance informatique',
    category: 'commercial_financier',
    description: 'Contrat de prestation d\'infogérance du système informatique',
    price: 800, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'client_nom', label: 'Nom du client', type: 'text', required: true },
      { name: 'prestataire_nom', label: 'Nom du prestataire', type: 'text', required: true },
      { name: 'perimetre', label: 'Périmètre informatique confié', type: 'textarea', required: true },
      { name: 'duree_contrat', label: 'Durée du contrat', type: 'text', required: true },
      { name: 'montant_mensuel', label: 'Montant mensuel (FCFA)', type: 'text', required: true },
      { name: 'date_debut', label: 'Date de début', type: 'date', required: true },
      { name: 'responsable_client', label: 'Responsable côté client', type: 'text', required: false },
      { name: 'lieu_signature', label: 'Lieu de signature', type: 'text', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#0d47a1;border-bottom:2px solid #1565c0;padding-bottom:8px;">CONTRAT D'INFOGÉRANCE INFORMATIQUE</h1>
<p>Entre <strong>{{client_nom}}</strong> (ci-après « le Client ») et <strong>{{prestataire_nom}}</strong> (ci-après « le Prestataire »), il est convenu ce qui suit :</p>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#0d47a1;color:white;"><th style="padding:8px;text-align:left;">Paramètre</th><th style="padding:8px;text-align:left;">Valeur</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Durée du contrat</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{duree_contrat}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Date de début</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{date_debut}}</td></tr>
<tr style="background:#E3F2FD;font-weight:bold;"><td style="padding:8px;">Montant mensuel</td><td style="padding:8px;">{{montant_mensuel}} FCFA</td></tr>
</table>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;margin-bottom:10px;"><strong>Périmètre confié :</strong><br/>{{perimetre}}</div>
<p>Responsable client : <strong>{{responsable_client}}</strong></p>
<p style="margin-top:20px;">Fait à {{lieu_signature}}, le {{date_debut}}.</p>
<div style="display:flex;justify-content:space-between;margin-top:20px;"><div><strong>Le Client</strong><br/>{{client_nom}}<br/><br/>Signature : _______________</div><div><strong>Le Prestataire</strong><br/>{{prestataire_nom}}<br/><br/>Signature : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 55,
  },

  {
    code: 'tech_sla_accord_niveau_service',
    name: 'SLA (accord niveau service)',
    category: 'commercial_financier',
    description: 'Accord de niveau de service définissant les engagements de qualité',
    price: 700, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'client_nom', label: 'Nom du client', type: 'text', required: true },
      { name: 'fournisseur_nom', label: 'Nom du fournisseur de service', type: 'text', required: true },
      { name: 'service_concerne', label: 'Service concerné', type: 'text', required: true },
      { name: 'disponibilite', label: 'Disponibilité garantie (%)', type: 'text', required: true },
      { name: 'temps_reponse', label: 'Temps de réponse garanti', type: 'text', required: true },
      { name: 'penalites', label: 'Pénalités en cas de non-respect', type: 'textarea', required: false },
      { name: 'date_entree_vigueur', label: 'Date d\'entrée en vigueur', type: 'date', required: true },
      { name: 'contact_technique', label: 'Contact technique', type: 'text', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#0d47a1;border-bottom:2px solid #1565c0;padding-bottom:8px;">ACCORD DE NIVEAU DE SERVICE (SLA)</h1>
<p><strong>Client :</strong> {{client_nom}} &nbsp;|&nbsp; <strong>Fournisseur :</strong> {{fournisseur_nom}}</p>
<p><strong>Service :</strong> {{service_concerne}} &nbsp;|&nbsp; <strong>En vigueur le :</strong> {{date_entree_vigueur}}</p>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#0d47a1;color:white;"><th style="padding:8px;text-align:left;">Indicateur</th><th style="padding:8px;text-align:left;">Engagement</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Disponibilité garantie</td><td style="padding:7px 8px;border-bottom:1px solid #eee;font-weight:bold;">{{disponibilite}} %</td></tr>
<tr style="background:#E3F2FD;"><td style="padding:7px 8px;border-bottom:1px solid #eee;">Temps de réponse</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{temps_reponse}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Contact technique</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{contact_technique}}</td></tr>
</table>
<div style="background:#FFF9C4;padding:12px;border-radius:4px;"><strong>Pénalités de non-respect :</strong><br/>{{penalites}}</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 60,
  },

  {
    code: 'tech_contrat_licence_logiciel',
    name: 'Contrat licence logiciel',
    category: 'juridique_admin',
    description: 'Contrat de licence d\'utilisation d\'un logiciel',
    price: 650, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'editeur_nom', label: 'Nom de l\'éditeur', type: 'text', required: true },
      { name: 'licencie_nom', label: 'Nom du licencié', type: 'text', required: true },
      { name: 'nom_logiciel', label: 'Nom du logiciel', type: 'text', required: true },
      { name: 'version', label: 'Version du logiciel', type: 'text', required: false },
      { name: 'type_licence', label: 'Type de licence (monoposte, site, cloud)', type: 'text', required: true },
      { name: 'nombre_utilisateurs', label: 'Nombre d\'utilisateurs autorisés', type: 'text', required: true },
      { name: 'redevance_annuelle', label: 'Redevance annuelle (FCFA)', type: 'text', required: true },
      { name: 'date_signature', label: 'Date de signature', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#1b5e20;border-bottom:2px solid #2e7d32;padding-bottom:8px;">CONTRAT DE LICENCE LOGICIEL</h1>
<p>Entre <strong>{{editeur_nom}}</strong> (l'Éditeur) et <strong>{{licencie_nom}}</strong> (le Licencié) :</p>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#1b5e20;color:white;"><th style="padding:8px;text-align:left;">Paramètre</th><th style="padding:8px;text-align:left;">Valeur</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Logiciel / Version</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{nom_logiciel}} v{{version}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Type de licence</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{type_licence}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Utilisateurs autorisés</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{nombre_utilisateurs}}</td></tr>
<tr style="background:#E8F5E9;font-weight:bold;"><td style="padding:8px;">Redevance annuelle</td><td style="padding:8px;">{{redevance_annuelle}} FCFA</td></tr>
</table>
<p style="color:#555;font-size:13px;">Toute reproduction, diffusion ou modification non autorisée constitue une violation des droits de l'Éditeur.</p>
<p>Fait le {{date_signature}}.</p>
<div style="display:flex;justify-content:space-between;margin-top:20px;"><div><strong>L'Éditeur</strong><br/>{{editeur_nom}}<br/><br/>Signature : _______________</div><div><strong>Le Licencié</strong><br/>{{licencie_nom}}<br/><br/>Signature : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 52,
  },

  {
    code: 'tech_devis_infrastructure_reseau',
    name: 'Devis infrastructure réseau',
    category: 'commercial_financier',
    description: 'Devis détaillé pour la mise en place d\'une infrastructure réseau',
    price: 500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'client_nom', label: 'Nom du client', type: 'text', required: true },
      { name: 'prestataire_nom', label: 'Prestataire', type: 'text', required: true },
      { name: 'date_devis', label: 'Date du devis', type: 'date', required: true },
      { name: 'description_projet', label: 'Description du projet réseau', type: 'textarea', required: true },
      { name: 'equipements', label: 'Équipements prévus', type: 'textarea', required: false },
      { name: 'main_oeuvre', label: 'Main d\'œuvre (FCFA)', type: 'text', required: false },
      { name: 'materiel', label: 'Matériel / équipements (FCFA)', type: 'text', required: false },
      { name: 'total_ht', label: 'Total HT (FCFA)', type: 'text', required: true },
      { name: 'validite', label: 'Validité du devis', type: 'text', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#0d47a1;border-bottom:2px solid #1565c0;padding-bottom:8px;">DEVIS — INFRASTRUCTURE RÉSEAU</h1>
<p><strong>Client :</strong> {{client_nom}} &nbsp;|&nbsp; <strong>Prestataire :</strong> {{prestataire_nom}} &nbsp;|&nbsp; <strong>Date :</strong> {{date_devis}}</p>
<div style="background:#E3F2FD;padding:10px;border-radius:4px;margin:12px 0;"><strong>Description :</strong> {{description_projet}}</div>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#0d47a1;color:white;"><th style="padding:8px;text-align:left;">Poste</th><th style="padding:8px;text-align:right;">Montant (FCFA)</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Main d'œuvre</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{main_oeuvre}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Matériel / équipements</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{materiel}}</td></tr>
<tr style="background:#FFF9C4;font-weight:bold;"><td style="padding:8px;">TOTAL HT</td><td style="padding:8px;text-align:right;">{{total_ht}}</td></tr>
</table>
<p style="font-size:12px;color:#888;">Équipements : {{equipements}} &nbsp;|&nbsp; Validité : {{validite}}</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 48,
  },

  {
    code: 'tech_convention_hebergement_serveur',
    name: 'Convention hébergement serveur',
    category: 'juridique_admin',
    description: 'Convention de colocation ou d\'hébergement de serveurs dans un datacenter',
    price: 600, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'hebergeur_nom', label: 'Nom de l\'hébergeur', type: 'text', required: true },
      { name: 'client_nom', label: 'Nom du client', type: 'text', required: true },
      { name: 'description_serveurs', label: 'Description des serveurs hébergés', type: 'textarea', required: true },
      { name: 'baie_reference', label: 'Référence baie / espace alloué', type: 'text', required: false },
      { name: 'acces_physique', label: 'Modalités d\'accès physique', type: 'textarea', required: false },
      { name: 'redevance_mensuelle', label: 'Redevance mensuelle (FCFA)', type: 'text', required: true },
      { name: 'duree', label: 'Durée de la convention', type: 'text', required: true },
      { name: 'date_debut', label: 'Date de début', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#4a148c;border-bottom:2px solid #6a1b9a;padding-bottom:8px;">CONVENTION D'HÉBERGEMENT SERVEUR</h1>
<p>Entre <strong>{{hebergeur_nom}}</strong> (l'Hébergeur) et <strong>{{client_nom}}</strong> (le Client) :</p>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#4a148c;color:white;"><th style="padding:8px;text-align:left;">Élément</th><th style="padding:8px;text-align:left;">Détail</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Baie / Espace</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{baie_reference}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Durée</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{duree}} — Début : {{date_debut}}</td></tr>
<tr style="background:#F3E5F5;font-weight:bold;"><td style="padding:8px;">Redevance mensuelle</td><td style="padding:8px;">{{redevance_mensuelle}} FCFA</td></tr>
</table>
<div style="background:#F3E5F5;padding:10px;border-radius:4px;margin-bottom:10px;"><strong>Serveurs hébergés :</strong><br/>{{description_serveurs}}</div>
<div style="background:#F0F4F8;padding:10px;border-radius:4px;"><strong>Accès physique :</strong> {{acces_physique}}</div>
<div style="display:flex;justify-content:space-between;margin-top:20px;"><div><strong>L'Hébergeur</strong><br/>{{hebergeur_nom}}<br/><br/>Signature : _______________</div><div><strong>Le Client</strong><br/>{{client_nom}}<br/><br/>Signature : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 44,
  },

  {
    code: 'tech_contrat_maintenance_parc',
    name: 'Contrat maintenance parc informatique',
    category: 'commercial_financier',
    description: 'Contrat de maintenance préventive et corrective du parc informatique',
    price: 550, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'client_nom', label: 'Nom du client', type: 'text', required: true },
      { name: 'prestataire_nom', label: 'Prestataire', type: 'text', required: true },
      { name: 'parc_description', label: 'Description du parc (nb postes, serveurs)', type: 'textarea', required: true },
      { name: 'type_maintenance', label: 'Type de maintenance (préventive/corrective)', type: 'text', required: true },
      { name: 'periodicite', label: 'Périodicité des interventions', type: 'text', required: true },
      { name: 'cout_annuel', label: 'Coût annuel (FCFA)', type: 'text', required: true },
      { name: 'delai_intervention', label: 'Délai d\'intervention garanti', type: 'text', required: false },
      { name: 'date_debut', label: 'Date de début', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#bf360c;border-bottom:2px solid #d84315;padding-bottom:8px;">CONTRAT MAINTENANCE PARC INFORMATIQUE</h1>
<p><strong>Client :</strong> {{client_nom}} &nbsp;|&nbsp; <strong>Prestataire :</strong> {{prestataire_nom}}</p>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#bf360c;color:white;"><th style="padding:8px;text-align:left;">Paramètre</th><th style="padding:8px;text-align:left;">Valeur</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Type de maintenance</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{type_maintenance}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Périodicité</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{periodicite}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Délai d'intervention</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{delai_intervention}}</td></tr>
<tr style="background:#FFF9C4;font-weight:bold;"><td style="padding:8px;">Coût annuel</td><td style="padding:8px;">{{cout_annuel}} FCFA</td></tr>
</table>
<div style="background:#FBE9E7;padding:10px;border-radius:4px;"><strong>Parc concerné :</strong><br/>{{parc_description}}</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 50,
  },

  {
    code: 'tech_accord_transfert_technologie',
    name: 'Accord transfert technologie',
    category: 'juridique_admin',
    description: 'Accord encadrant le transfert de technologie entre entreprises',
    price: 900, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'cedant_nom', label: 'Nom du cédant', type: 'text', required: true },
      { name: 'beneficiaire_nom', label: 'Nom du bénéficiaire', type: 'text', required: true },
      { name: 'technologie_description', label: 'Description de la technologie transférée', type: 'textarea', required: true },
      { name: 'modalites_transfert', label: 'Modalités du transfert', type: 'textarea', required: true },
      { name: 'formation_prevue', label: 'Formation prévue', type: 'textarea', required: false },
      { name: 'contrepartie', label: 'Contrepartie financière (FCFA)', type: 'text', required: true },
      { name: 'duree_accord', label: 'Durée de l\'accord', type: 'text', required: true },
      { name: 'date_signature', label: 'Date de signature', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#0d47a1;border-bottom:2px solid #1565c0;padding-bottom:8px;">ACCORD DE TRANSFERT DE TECHNOLOGIE</h1>
<p>Entre <strong>{{cedant_nom}}</strong> (le Cédant) et <strong>{{beneficiaire_nom}}</strong> (le Bénéficiaire), il est convenu ce qui suit :</p>
<div style="background:#E3F2FD;padding:12px;border-radius:4px;margin:12px 0;"><strong>Technologie transférée :</strong><br/>{{technologie_description}}</div>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#0d47a1;color:white;"><th style="padding:8px;text-align:left;">Élément</th><th style="padding:8px;text-align:left;">Détail</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Durée de l'accord</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{duree_accord}}</td></tr>
<tr style="background:#E3F2FD;font-weight:bold;"><td style="padding:8px;">Contrepartie</td><td style="padding:8px;">{{contrepartie}} FCFA</td></tr>
</table>
<div style="background:#F0F4F8;padding:10px;border-radius:4px;margin-bottom:10px;"><strong>Modalités :</strong> {{modalites_transfert}}</div>
<div style="background:#E8F5E9;padding:10px;border-radius:4px;"><strong>Formation :</strong> {{formation_prevue}}</div>
<p>Fait le {{date_signature}}.</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 42,
  },

  {
    code: 'tech_contrat_dev_logiciel_mesure',
    name: 'Contrat développement logiciel sur mesure',
    category: 'juridique_admin',
    description: 'Contrat de développement d\'une application ou logiciel sur mesure',
    price: 750, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'client_nom', label: 'Nom du client', type: 'text', required: true },
      { name: 'developpeur_nom', label: 'Nom du développeur / société', type: 'text', required: true },
      { name: 'nom_projet', label: 'Nom du projet', type: 'text', required: true },
      { name: 'description_fonctionnelle', label: 'Description fonctionnelle', type: 'textarea', required: true },
      { name: 'delai_livraison', label: 'Délai de livraison', type: 'text', required: true },
      { name: 'budget_total', label: 'Budget total (FCFA)', type: 'text', required: true },
      { name: 'modalites_paiement', label: 'Modalités de paiement', type: 'textarea', required: false },
      { name: 'date_signature', label: 'Date de signature', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#1b5e20;border-bottom:2px solid #2e7d32;padding-bottom:8px;">CONTRAT DE DÉVELOPPEMENT LOGICIEL SUR MESURE</h1>
<h2 style="color:#2e7d32;margin-top:5px;">Projet : {{nom_projet}}</h2>
<p><strong>Client :</strong> {{client_nom}} &nbsp;|&nbsp; <strong>Développeur :</strong> {{developpeur_nom}}</p>
<div style="background:#E8F5E9;padding:12px;border-radius:4px;margin:12px 0;"><strong>Description fonctionnelle :</strong><br/>{{description_fonctionnelle}}</div>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#1b5e20;color:white;"><th style="padding:8px;text-align:left;">Paramètre</th><th style="padding:8px;text-align:right;">Valeur</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Délai de livraison</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{delai_livraison}}</td></tr>
<tr style="background:#FFF9C4;font-weight:bold;"><td style="padding:8px;">Budget total</td><td style="padding:8px;text-align:right;">{{budget_total}} FCFA</td></tr>
</table>
<div style="background:#F0F4F8;padding:10px;border-radius:4px;"><strong>Modalités de paiement :</strong> {{modalites_paiement}}</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 58,
  },

  {
    code: 'tech_politique_securite_informatique',
    name: 'Politique sécurité informatique',
    category: 'juridique_admin',
    description: 'Document de politique de sécurité informatique de l\'entreprise',
    price: 600, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'entreprise_nom', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'responsable_si', label: 'Responsable SI', type: 'text', required: true },
      { name: 'date_politique', label: 'Date de mise en vigueur', type: 'date', required: true },
      { name: 'perimetre_application', label: 'Périmètre d\'application', type: 'textarea', required: true },
      { name: 'regles_acces', label: 'Règles d\'accès aux systèmes', type: 'textarea', required: true },
      { name: 'gestion_incidents', label: 'Procédure de gestion des incidents', type: 'textarea', required: false },
      { name: 'sanctions', label: 'Sanctions en cas de violation', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#b71c1c;border-bottom:2px solid #c62828;padding-bottom:8px;">POLITIQUE DE SÉCURITÉ INFORMATIQUE</h1>
<p><strong>Entreprise :</strong> {{entreprise_nom}} &nbsp;|&nbsp; <strong>Responsable SI :</strong> {{responsable_si}}</p>
<p><strong>En vigueur le :</strong> {{date_politique}}</p>
<div style="background:#FFEBEE;padding:12px;border-radius:4px;margin:12px 0;border-left:4px solid #c62828;"><strong>Périmètre d'application :</strong><br/>{{perimetre_application}}</div>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;margin-bottom:10px;"><strong>Règles d'accès :</strong><br/>{{regles_acces}}</div>
<div style="background:#FFF9C4;padding:10px;border-radius:4px;margin-bottom:10px;"><strong>Gestion des incidents :</strong><br/>{{gestion_incidents}}</div>
<div style="background:#FFEBEE;padding:10px;border-radius:4px;"><strong>Sanctions :</strong> {{sanctions}}</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 46,
  },

  {
    code: 'tech_contrat_abonnement_telephonie',
    name: 'Contrat abonnement téléphonie entreprise',
    category: 'commercial_financier',
    description: 'Contrat d\'abonnement téléphonie fixe ou mobile pour les entreprises',
    price: 400, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'operateur_nom', label: 'Nom de l\'opérateur', type: 'text', required: true },
      { name: 'entreprise_nom', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'type_abonnement', label: 'Type d\'abonnement (fixe/mobile/VOIP)', type: 'text', required: true },
      { name: 'nombre_lignes', label: 'Nombre de lignes', type: 'text', required: true },
      { name: 'forfait_description', label: 'Description du forfait', type: 'textarea', required: true },
      { name: 'montant_mensuel', label: 'Montant mensuel (FCFA)', type: 'text', required: true },
      { name: 'engagement_duree', label: 'Durée d\'engagement', type: 'text', required: true },
      { name: 'date_debut', label: 'Date de début', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#006064;border-bottom:2px solid #00838f;padding-bottom:8px;">CONTRAT ABONNEMENT TÉLÉPHONIE ENTREPRISE</h1>
<p><strong>Opérateur :</strong> {{operateur_nom}} &nbsp;|&nbsp; <strong>Entreprise :</strong> {{entreprise_nom}}</p>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#006064;color:white;"><th style="padding:8px;text-align:left;">Paramètre</th><th style="padding:8px;text-align:left;">Valeur</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Type d'abonnement</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{type_abonnement}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Nombre de lignes</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{nombre_lignes}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Durée d'engagement</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{engagement_duree}} — Début : {{date_debut}}</td></tr>
<tr style="background:#E0F7FA;font-weight:bold;"><td style="padding:8px;">Montant mensuel</td><td style="padding:8px;">{{montant_mensuel}} FCFA</td></tr>
</table>
<div style="background:#E0F7FA;padding:10px;border-radius:4px;"><strong>Forfait :</strong> {{forfait_description}}</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 62,
  },

  {
    code: 'tech_convention_partage_infrastructure',
    name: 'Convention partage infrastructure télécoms',
    category: 'juridique_admin',
    description: 'Convention de partage d\'infrastructure télécoms entre opérateurs',
    price: 1000, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'operateur_a', label: 'Opérateur A', type: 'text', required: true },
      { name: 'operateur_b', label: 'Opérateur B', type: 'text', required: true },
      { name: 'infrastructure_description', label: 'Infrastructure concernée', type: 'textarea', required: true },
      { name: 'zones_geographiques', label: 'Zones géographiques', type: 'textarea', required: true },
      { name: 'cout_partage', label: 'Coût de partage (FCFA/mois)', type: 'text', required: true },
      { name: 'duree_convention', label: 'Durée de la convention', type: 'text', required: true },
      { name: 'responsabilites', label: 'Responsabilités de chaque partie', type: 'textarea', required: false },
      { name: 'date_signature', label: 'Date de signature', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#1a237e;border-bottom:2px solid #283593;padding-bottom:8px;">CONVENTION DE PARTAGE D'INFRASTRUCTURE TÉLÉCOMS</h1>
<p>Entre <strong>{{operateur_a}}</strong> et <strong>{{operateur_b}}</strong>, il est convenu ce qui suit :</p>
<div style="background:#E8EAF6;padding:12px;border-radius:4px;margin:12px 0;"><strong>Infrastructure concernée :</strong><br/>{{infrastructure_description}}</div>
<div style="background:#E8EAF6;padding:10px;border-radius:4px;margin-bottom:10px;"><strong>Zones géographiques :</strong><br/>{{zones_geographiques}}</div>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#1a237e;color:white;"><th style="padding:8px;text-align:left;">Paramètre</th><th style="padding:8px;text-align:right;">Valeur</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Durée</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{duree_convention}}</td></tr>
<tr style="background:#FFF9C4;font-weight:bold;"><td style="padding:8px;">Coût de partage mensuel</td><td style="padding:8px;text-align:right;">{{cout_partage}} FCFA</td></tr>
</table>
<p>Fait le {{date_signature}}.</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 38,
  },

  {
    code: 'tech_rapport_audit_si',
    name: 'Rapport audit SI',
    category: 'communication',
    description: 'Rapport d\'audit du système d\'information de l\'entreprise',
    price: 800, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'entreprise_nom', label: 'Entreprise auditée', type: 'text', required: true },
      { name: 'auditeur_nom', label: 'Auditeur / Cabinet', type: 'text', required: true },
      { name: 'date_audit', label: 'Date de l\'audit', type: 'date', required: true },
      { name: 'perimetre_audit', label: 'Périmètre audité', type: 'textarea', required: true },
      { name: 'constats', label: 'Principaux constats', type: 'textarea', required: true },
      { name: 'risques_identifies', label: 'Risques identifiés', type: 'textarea', required: true },
      { name: 'recommandations', label: 'Recommandations', type: 'textarea', required: true },
      { name: 'note_globale', label: 'Note globale de maturité', type: 'text', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#37474f;border-bottom:2px solid #546e7a;padding-bottom:8px;">RAPPORT D'AUDIT DU SYSTÈME D'INFORMATION</h1>
<p><strong>Entreprise :</strong> {{entreprise_nom}} &nbsp;|&nbsp; <strong>Auditeur :</strong> {{auditeur_nom}} &nbsp;|&nbsp; <strong>Date :</strong> {{date_audit}}</p>
<div style="background:#ECEFF1;padding:10px;border-radius:4px;margin:12px 0;"><strong>Périmètre audité :</strong><br/>{{perimetre_audit}}</div>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;margin-bottom:10px;"><strong>Constats :</strong><br/>{{constats}}</div>
<div style="background:#FFEBEE;padding:12px;border-radius:4px;border-left:4px solid #c62828;margin-bottom:10px;"><strong>Risques identifiés :</strong><br/>{{risques_identifies}}</div>
<div style="background:#E8F5E9;padding:12px;border-radius:4px;margin-bottom:10px;"><strong>Recommandations :</strong><br/>{{recommandations}}</div>
<p style="font-size:15px;font-weight:bold;color:#37474f;">Note globale de maturité : {{note_globale}}</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 50,
  },

  {
    code: 'tech_plan_continuite_activite',
    name: 'Plan continuité activité informatique',
    category: 'juridique_admin',
    description: 'Plan de continuité d\'activité pour le système informatique',
    price: 700, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'entreprise_nom', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'responsable_pca', label: 'Responsable du PCA', type: 'text', required: true },
      { name: 'date_revision', label: 'Date de révision', type: 'date', required: true },
      { name: 'scenarios_sinistres', label: 'Scénarios de sinistres couverts', type: 'textarea', required: true },
      { name: 'systemes_critiques', label: 'Systèmes critiques identifiés', type: 'textarea', required: true },
      { name: 'rto', label: 'RTO – Délai de reprise (heures)', type: 'text', required: false },
      { name: 'rpo', label: 'RPO – Perte de données max (heures)', type: 'text', required: false },
      { name: 'procedures_reprise', label: 'Procédures de reprise', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#e65100;border-bottom:2px solid #f57c00;padding-bottom:8px;">PLAN DE CONTINUITÉ D'ACTIVITÉ INFORMATIQUE</h1>
<p><strong>Entreprise :</strong> {{entreprise_nom}} &nbsp;|&nbsp; <strong>Responsable :</strong> {{responsable_pca}} &nbsp;|&nbsp; <strong>Révision :</strong> {{date_revision}}</p>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#e65100;color:white;"><th style="padding:8px;text-align:left;">Indicateur</th><th style="padding:8px;text-align:left;">Valeur</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">RTO (reprise)</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{rto}} heures</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">RPO (perte max)</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{rpo}} heures</td></tr>
</table>
<div style="background:#FFF3E0;padding:10px;border-radius:4px;margin-bottom:10px;"><strong>Scénarios couverts :</strong><br/>{{scenarios_sinistres}}</div>
<div style="background:#F0F4F8;padding:10px;border-radius:4px;margin-bottom:10px;"><strong>Systèmes critiques :</strong><br/>{{systemes_critiques}}</div>
<div style="background:#E8F5E9;padding:10px;border-radius:4px;"><strong>Procédures de reprise :</strong><br/>{{procedures_reprise}}</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 43,
  },

  {
    code: 'tech_contrat_integrateur_systeme',
    name: 'Contrat intégrateur système',
    category: 'juridique_admin',
    description: 'Contrat d\'intégration de systèmes informatiques hétérogènes',
    price: 850, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'client_nom', label: 'Nom du client', type: 'text', required: true },
      { name: 'integrateur_nom', label: 'Nom de l\'intégrateur', type: 'text', required: true },
      { name: 'systemes_concernes', label: 'Systèmes à intégrer', type: 'textarea', required: true },
      { name: 'livrables', label: 'Livrables attendus', type: 'textarea', required: true },
      { name: 'budget', label: 'Budget total (FCFA)', type: 'text', required: true },
      { name: 'delai', label: 'Délai de réalisation', type: 'text', required: true },
      { name: 'penalites_retard', label: 'Pénalités de retard', type: 'text', required: false },
      { name: 'date_signature', label: 'Date de signature', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#0d47a1;border-bottom:2px solid #1565c0;padding-bottom:8px;">CONTRAT INTÉGRATEUR SYSTÈME</h1>
<p><strong>Client :</strong> {{client_nom}} &nbsp;|&nbsp; <strong>Intégrateur :</strong> {{integrateur_nom}}</p>
<div style="background:#E3F2FD;padding:10px;border-radius:4px;margin:12px 0;"><strong>Systèmes à intégrer :</strong><br/>{{systemes_concernes}}</div>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#0d47a1;color:white;"><th style="padding:8px;text-align:left;">Paramètre</th><th style="padding:8px;text-align:right;">Valeur</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Délai</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{delai}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Pénalités retard</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{penalites_retard}}</td></tr>
<tr style="background:#FFF9C4;font-weight:bold;"><td style="padding:8px;">Budget total</td><td style="padding:8px;text-align:right;">{{budget}} FCFA</td></tr>
</table>
<div style="background:#F0F4F8;padding:10px;border-radius:4px;"><strong>Livrables :</strong><br/>{{livrables}}</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 45,
  },

  {
    code: 'tech_accord_confidentialite_technique',
    name: 'Accord confidentialité données techniques',
    category: 'juridique_admin',
    description: 'Accord de confidentialité portant sur les données et systèmes techniques',
    price: 500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'partie_a', label: 'Partie A (divulgatrice)', type: 'text', required: true },
      { name: 'partie_b', label: 'Partie B (réceptrice)', type: 'text', required: true },
      { name: 'informations_confidentielles', label: 'Nature des informations confidentielles', type: 'textarea', required: true },
      { name: 'duree_confidentialite', label: 'Durée de l\'obligation de confidentialité', type: 'text', required: true },
      { name: 'obligations_partie_b', label: 'Obligations de la partie réceptrice', type: 'textarea', required: false },
      { name: 'sanctions', label: 'Sanctions en cas de violation', type: 'textarea', required: false },
      { name: 'date_signature', label: 'Date de signature', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#4a148c;border-bottom:2px solid #6a1b9a;padding-bottom:8px;">ACCORD DE CONFIDENTIALITÉ — DONNÉES TECHNIQUES</h1>
<p>Entre <strong>{{partie_a}}</strong> (la Partie divulgatrice) et <strong>{{partie_b}}</strong> (la Partie réceptrice) :</p>
<div style="background:#F3E5F5;padding:12px;border-radius:4px;margin:12px 0;"><strong>Informations confidentielles :</strong><br/>{{informations_confidentielles}}</div>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#4a148c;color:white;"><th style="padding:8px;text-align:left;">Paramètre</th><th style="padding:8px;text-align:left;">Valeur</th></tr>
<tr style="background:#F3E5F5;font-weight:bold;"><td style="padding:8px;">Durée de confidentialité</td><td style="padding:8px;">{{duree_confidentialite}}</td></tr>
</table>
<div style="background:#F0F4F8;padding:10px;border-radius:4px;margin-bottom:10px;"><strong>Obligations :</strong> {{obligations_partie_b}}</div>
<div style="background:#FFEBEE;padding:10px;border-radius:4px;"><strong>Sanctions :</strong> {{sanctions}}</div>
<p>Fait le {{date_signature}}.</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 54,
  },

  {
    code: 'tech_cahier_charges_erp',
    name: 'Cahier des charges ERP',
    category: 'communication',
    description: 'Cahier des charges pour l\'acquisition ou le déploiement d\'un ERP',
    price: 900, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'entreprise_nom', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'responsable_projet', label: 'Responsable du projet', type: 'text', required: true },
      { name: 'date_document', label: 'Date du document', type: 'date', required: true },
      { name: 'contexte', label: 'Contexte et enjeux', type: 'textarea', required: true },
      { name: 'modules_requis', label: 'Modules requis', type: 'textarea', required: true },
      { name: 'contraintes_techniques', label: 'Contraintes techniques', type: 'textarea', required: false },
      { name: 'budget_prevu', label: 'Budget prévu (FCFA)', type: 'text', required: false },
      { name: 'delai_mise_en_oeuvre', label: 'Délai de mise en œuvre souhaité', type: 'text', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#1a237e;border-bottom:2px solid #283593;padding-bottom:8px;">CAHIER DES CHARGES — ERP</h1>
<p><strong>Entreprise :</strong> {{entreprise_nom}} &nbsp;|&nbsp; <strong>Responsable :</strong> {{responsable_projet}} &nbsp;|&nbsp; <strong>Date :</strong> {{date_document}}</p>
<div style="background:#E8EAF6;padding:12px;border-radius:4px;margin:12px 0;"><strong>Contexte :</strong><br/>{{contexte}}</div>
<div style="background:#E8EAF6;padding:12px;border-radius:4px;margin-bottom:10px;"><strong>Modules requis :</strong><br/>{{modules_requis}}</div>
<div style="background:#F0F4F8;padding:10px;border-radius:4px;margin-bottom:10px;"><strong>Contraintes techniques :</strong><br/>{{contraintes_techniques}}</div>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#1a237e;color:white;"><th style="padding:8px;text-align:left;">Paramètre</th><th style="padding:8px;text-align:left;">Valeur</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Budget prévu</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{budget_prevu}} FCFA</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Délai souhaité</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{delai_mise_en_oeuvre}}</td></tr>
</table>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 47,
  },

  {
    code: 'tech_contrat_cloud_computing',
    name: 'Contrat cloud computing',
    category: 'juridique_admin',
    description: 'Contrat d\'abonnement ou de services cloud (IaaS/PaaS/SaaS)',
    price: 700, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'fournisseur_cloud', label: 'Fournisseur cloud', type: 'text', required: true },
      { name: 'client_nom', label: 'Nom du client', type: 'text', required: true },
      { name: 'type_service', label: 'Type de service (IaaS/PaaS/SaaS)', type: 'text', required: true },
      { name: 'description_services', label: 'Description des services', type: 'textarea', required: true },
      { name: 'capacite_stockage', label: 'Capacité de stockage / ressources', type: 'text', required: false },
      { name: 'cout_mensuel', label: 'Coût mensuel (FCFA)', type: 'text', required: true },
      { name: 'duree_engagement', label: 'Durée d\'engagement', type: 'text', required: true },
      { name: 'localisation_donnees', label: 'Localisation des données', type: 'text', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#01579b;border-bottom:2px solid #0277bd;padding-bottom:8px;">CONTRAT CLOUD COMPUTING</h1>
<p><strong>Fournisseur :</strong> {{fournisseur_cloud}} &nbsp;|&nbsp; <strong>Client :</strong> {{client_nom}}</p>
<div style="background:#E1F5FE;padding:10px;border-radius:4px;margin:12px 0;"><strong>Services :</strong> {{description_services}}</div>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#01579b;color:white;"><th style="padding:8px;text-align:left;">Paramètre</th><th style="padding:8px;text-align:left;">Valeur</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Type de service</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{type_service}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Ressources allouées</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{capacite_stockage}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Durée d'engagement</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{duree_engagement}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Localisation données</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{localisation_donnees}}</td></tr>
<tr style="background:#E1F5FE;font-weight:bold;"><td style="padding:8px;">Coût mensuel</td><td style="padding:8px;">{{cout_mensuel}} FCFA</td></tr>
</table>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 56,
  },

  {
    code: 'tech_convention_cybersecurite',
    name: 'Convention cybersécurité',
    category: 'juridique_admin',
    description: 'Convention de prestation de services de cybersécurité',
    price: 950, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'client_nom', label: 'Nom du client', type: 'text', required: true },
      { name: 'prestataire_nom', label: 'Prestataire cybersécurité', type: 'text', required: true },
      { name: 'services_cybersec', label: 'Services de cybersécurité prévus', type: 'textarea', required: true },
      { name: 'perimetre_protection', label: 'Périmètre à protéger', type: 'textarea', required: true },
      { name: 'budget_annuel', label: 'Budget annuel (FCFA)', type: 'text', required: true },
      { name: 'duree', label: 'Durée de la convention', type: 'text', required: true },
      { name: 'clause_responsabilite', label: 'Clause de responsabilité', type: 'textarea', required: false },
      { name: 'date_signature', label: 'Date de signature', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#b71c1c;border-bottom:2px solid #c62828;padding-bottom:8px;">CONVENTION DE CYBERSÉCURITÉ</h1>
<p>Entre <strong>{{client_nom}}</strong> (le Client) et <strong>{{prestataire_nom}}</strong> (le Prestataire) :</p>
<div style="background:#FFEBEE;padding:12px;border-radius:4px;margin:12px 0;border-left:4px solid #c62828;"><strong>Périmètre protégé :</strong><br/>{{perimetre_protection}}</div>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;margin-bottom:10px;"><strong>Services cybersécurité :</strong><br/>{{services_cybersec}}</div>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#b71c1c;color:white;"><th style="padding:8px;text-align:left;">Paramètre</th><th style="padding:8px;text-align:right;">Valeur</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Durée</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{duree}}</td></tr>
<tr style="background:#FFF9C4;font-weight:bold;"><td style="padding:8px;">Budget annuel</td><td style="padding:8px;text-align:right;">{{budget_annuel}} FCFA</td></tr>
</table>
<div style="background:#FFEBEE;padding:10px;border-radius:4px;font-size:13px;"><strong>Responsabilité :</strong> {{clause_responsabilite}}</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 49,
  },

  {
    code: 'tech_plan_projet_digital',
    name: 'Plan projet digital transformation',
    category: 'communication',
    description: 'Plan de projet pour la transformation digitale d\'une organisation',
    price: 600, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'organisation_nom', label: 'Nom de l\'organisation', type: 'text', required: true },
      { name: 'chef_projet', label: 'Chef de projet', type: 'text', required: true },
      { name: 'date_lancement', label: 'Date de lancement', type: 'date', required: true },
      { name: 'vision', label: 'Vision de la transformation', type: 'textarea', required: true },
      { name: 'axes_transformation', label: 'Axes de transformation prioritaires', type: 'textarea', required: true },
      { name: 'budget_total', label: 'Budget total (FCFA)', type: 'text', required: true },
      { name: 'duree_projet', label: 'Durée du projet', type: 'text', required: true },
      { name: 'indicateurs_succes', label: 'Indicateurs de succès', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#1b5e20;border-bottom:2px solid #2e7d32;padding-bottom:8px;">PLAN PROJET — TRANSFORMATION DIGITALE</h1>
<p><strong>Organisation :</strong> {{organisation_nom}} &nbsp;|&nbsp; <strong>Chef de projet :</strong> {{chef_projet}}</p>
<p><strong>Lancement :</strong> {{date_lancement}} &nbsp;|&nbsp; <strong>Durée :</strong> {{duree_projet}}</p>
<div style="background:#E8F5E9;padding:12px;border-radius:4px;margin:12px 0;"><strong>Vision :</strong> {{vision}}</div>
<div style="background:#E8F5E9;padding:12px;border-radius:4px;margin-bottom:10px;"><strong>Axes prioritaires :</strong><br/>{{axes_transformation}}</div>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#1b5e20;color:white;"><th style="padding:8px;text-align:left;">Paramètre</th><th style="padding:8px;text-align:right;">Valeur</th></tr>
<tr style="background:#FFF9C4;font-weight:bold;"><td style="padding:8px;">Budget total</td><td style="padding:8px;text-align:right;">{{budget_total}} FCFA</td></tr>
</table>
<div style="background:#F0F4F8;padding:10px;border-radius:4px;"><strong>Indicateurs de succès :</strong><br/>{{indicateurs_succes}}</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 53,
  },

  {
    code: 'tech_contrat_support_technique_n2',
    name: 'Contrat support technique niveau 2',
    category: 'commercial_financier',
    description: 'Contrat de support technique de niveau 2 pour applications et systèmes',
    price: 650, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'client_nom', label: 'Nom du client', type: 'text', required: true },
      { name: 'prestataire_nom', label: 'Prestataire de support', type: 'text', required: true },
      { name: 'applications_couvertes', label: 'Applications / systèmes couverts', type: 'textarea', required: true },
      { name: 'plage_horaire', label: 'Plage horaire du support', type: 'text', required: true },
      { name: 'canal_contact', label: 'Canaux de contact', type: 'text', required: false },
      { name: 'delai_resolution', label: 'Délai de résolution garanti', type: 'text', required: true },
      { name: 'tarif_mensuel', label: 'Tarif mensuel (FCFA)', type: 'text', required: true },
      { name: 'date_debut', label: 'Date de début', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#006064;border-bottom:2px solid #00838f;padding-bottom:8px;">CONTRAT SUPPORT TECHNIQUE NIVEAU 2</h1>
<p><strong>Client :</strong> {{client_nom}} &nbsp;|&nbsp; <strong>Prestataire :</strong> {{prestataire_nom}}</p>
<div style="background:#E0F7FA;padding:10px;border-radius:4px;margin:12px 0;"><strong>Applications couvertes :</strong><br/>{{applications_couvertes}}</div>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#006064;color:white;"><th style="padding:8px;text-align:left;">Paramètre</th><th style="padding:8px;text-align:left;">Valeur</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Plage horaire</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{plage_horaire}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Canaux de contact</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{canal_contact}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Délai de résolution</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{delai_resolution}}</td></tr>
<tr style="background:#E0F7FA;font-weight:bold;"><td style="padding:8px;">Tarif mensuel</td><td style="padding:8px;">{{tarif_mensuel}} FCFA</td></tr>
</table>
<p style="color:#888;font-size:12px;">Début de contrat : {{date_debut}}</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 57,
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
  console.log(`Seed Telecom/Tech termine. Traites: ${count} — Total BDD: ${total}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
