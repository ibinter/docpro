import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const COUNTRIES = JSON.stringify(['CI','SN','CM','BJ','TG','BF','ML','GN','CD','CG','GA','NE','TD','MR']);

const templates = [
  {
    code: 'droit_statuts_sarl_ohada',
    name: 'Statuts SARL OHADA',
    category: 'juridique_admin',
    description: 'Acte constitutif de Société à Responsabilité Limitée conforme à l\'Acte Uniforme OHADA',
    price: 1500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'denomination', label: 'Dénomination sociale', type: 'text', required: true },
      { name: 'siege_social', label: 'Siège social', type: 'text', required: true },
      { name: 'objet_social', label: 'Objet social', type: 'textarea', required: true },
      { name: 'capital_social', label: 'Capital social (FCFA)', type: 'text', required: true },
      { name: 'duree_societe', label: 'Durée de la société (années)', type: 'text', required: true },
      { name: 'gerant_nom', label: 'Nom du gérant', type: 'text', required: true },
      { name: 'associes', label: 'Liste des associés et apports', type: 'textarea', required: true },
      { name: 'date_constitution', label: 'Date de constitution', type: 'date', required: true },
      { name: 'ville_signature', label: 'Ville de signature', type: 'text', required: true },
    ]),
    body: `<div style="font-family:Georgia,serif;max-width:750px;margin:0 auto;padding:24px;border:1px solid #ccc;">
<h1 style="color:#1a3c5e;text-align:center;font-size:18px;text-transform:uppercase;border-bottom:2px solid #1a3c5e;padding-bottom:10px;">STATUTS DE SOCIÉTÉ À RESPONSABILITÉ LIMITÉE</h1>
<p style="text-align:center;color:#555;font-size:13px;">Conformément à l'Acte Uniforme OHADA relatif au droit des sociétés commerciales</p>
<h2 style="color:#1a3c5e;font-size:14px;margin-top:20px;">ARTICLE 1 — FORME ET DÉNOMINATION</h2>
<p>Il est constitué entre les soussignés une Société à Responsabilité Limitée (SARL) régie par l'Acte Uniforme OHADA, dénommée : <strong>{{denomination}}</strong>.</p>
<h2 style="color:#1a3c5e;font-size:14px;">ARTICLE 2 — OBJET SOCIAL</h2>
<p>{{objet_social}}</p>
<h2 style="color:#1a3c5e;font-size:14px;">ARTICLE 3 — SIÈGE SOCIAL</h2>
<p>Le siège social est fixé à : <strong>{{siege_social}}</strong>.</p>
<h2 style="color:#1a3c5e;font-size:14px;">ARTICLE 4 — DURÉE</h2>
<p>La durée de la société est fixée à <strong>{{duree_societe}} ans</strong> à compter de la date d'immatriculation au RCCM.</p>
<h2 style="color:#1a3c5e;font-size:14px;">ARTICLE 5 — CAPITAL SOCIAL</h2>
<p>Le capital social est fixé à la somme de <strong>{{capital_social}} FCFA</strong>, divisé en parts sociales égales, entièrement souscrites et libérées par les associés.</p>
<h2 style="color:#1a3c5e;font-size:14px;">ARTICLE 6 — ASSOCIÉS ET APPORTS</h2>
<p>{{associes}}</p>
<h2 style="color:#1a3c5e;font-size:14px;">ARTICLE 7 — GÉRANCE</h2>
<p>La société est gérée par <strong>{{gerant_nom}}</strong>, nommé(e) gérant(e) pour une durée indéterminée.</p>
<p style="margin-top:30px;">Fait à <strong>{{ville_signature}}</strong>, le <strong>{{date_constitution}}</strong>.</p>
<div style="display:flex;justify-content:space-between;margin-top:20px;font-size:13px;"><div><strong>Le(s) associé(s)</strong><br/><br/>Signature(s) : _______________</div><div><strong>Le gérant</strong><br/>{{gerant_nom}}<br/><br/>Signature : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 85,
  },

  {
    code: 'droit_statuts_sa_ohada',
    name: 'Statuts SA OHADA',
    category: 'juridique_admin',
    description: 'Acte constitutif de Société Anonyme conforme à l\'Acte Uniforme OHADA',
    price: 1500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'denomination', label: 'Dénomination sociale', type: 'text', required: true },
      { name: 'siege_social', label: 'Siège social', type: 'text', required: true },
      { name: 'objet_social', label: 'Objet social', type: 'textarea', required: true },
      { name: 'capital_social', label: 'Capital social (FCFA)', type: 'text', required: true },
      { name: 'valeur_action', label: 'Valeur nominale par action (FCFA)', type: 'text', required: true },
      { name: 'nombre_actions', label: 'Nombre total d\'actions', type: 'text', required: true },
      { name: 'pdg_nom', label: 'Nom du PDG / Président', type: 'text', required: true },
      { name: 'duree_societe', label: 'Durée (années)', type: 'text', required: true },
      { name: 'date_constitution', label: 'Date de constitution', type: 'date', required: true },
      { name: 'ville_signature', label: 'Ville de signature', type: 'text', required: true },
    ]),
    body: `<div style="font-family:Georgia,serif;max-width:750px;margin:0 auto;padding:24px;border:1px solid #ccc;">
<h1 style="color:#1a3c5e;text-align:center;font-size:18px;text-transform:uppercase;border-bottom:2px solid #1a3c5e;padding-bottom:10px;">STATUTS DE SOCIÉTÉ ANONYME (SA)</h1>
<p style="text-align:center;color:#555;font-size:13px;">Régie par l'Acte Uniforme OHADA relatif au droit des sociétés commerciales et du GIE</p>
<h2 style="color:#1a3c5e;font-size:14px;margin-top:20px;">ARTICLE 1 — FORME ET DÉNOMINATION</h2>
<p>Il est fondé entre les actionnaires soussignés une Société Anonyme (SA) dénommée : <strong>{{denomination}}</strong>.</p>
<h2 style="color:#1a3c5e;font-size:14px;">ARTICLE 2 — OBJET SOCIAL</h2>
<p>{{objet_social}}</p>
<h2 style="color:#1a3c5e;font-size:14px;">ARTICLE 3 — SIÈGE SOCIAL</h2>
<p>Siège : <strong>{{siege_social}}</strong>.</p>
<h2 style="color:#1a3c5e;font-size:14px;">ARTICLE 4 — DURÉE</h2>
<p>Durée : <strong>{{duree_societe}} ans</strong> à compter de l'immatriculation au RCCM.</p>
<h2 style="color:#1a3c5e;font-size:14px;">ARTICLE 5 — CAPITAL ET ACTIONS</h2>
<p>Capital social : <strong>{{capital_social}} FCFA</strong>, divisé en <strong>{{nombre_actions}} actions</strong> d'une valeur nominale de <strong>{{valeur_action}} FCFA</strong> chacune, intégralement souscrites.</p>
<h2 style="color:#1a3c5e;font-size:14px;">ARTICLE 6 — ADMINISTRATION</h2>
<p>La société est administrée par un Conseil d'Administration. <strong>{{pdg_nom}}</strong> est nommé Président Directeur Général pour une durée déterminée par les statuts.</p>
<h2 style="color:#1a3c5e;font-size:14px;">ARTICLE 7 — ASSEMBLÉES GÉNÉRALES</h2>
<p>Les décisions collectives des actionnaires sont prises en Assemblées Générales convoquées et délibérant conformément aux dispositions de l'Acte Uniforme OHADA.</p>
<p style="margin-top:30px;">Fait à <strong>{{ville_signature}}</strong>, le <strong>{{date_constitution}}</strong>.</p>
<div style="display:flex;justify-content:space-between;margin-top:20px;font-size:13px;"><div><strong>Les actionnaires fondateurs</strong><br/><br/>Signature(s) : _______________</div><div><strong>Le PDG</strong><br/>{{pdg_nom}}<br/><br/>Signature : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 78,
  },

  {
    code: 'droit_pv_ag_ordinaire',
    name: 'Procès-verbal AG ordinaire',
    category: 'juridique_admin',
    description: 'Procès-verbal d\'Assemblée Générale Ordinaire (AGO) de société OHADA',
    price: 800, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'denomination', label: 'Dénomination sociale', type: 'text', required: true },
      { name: 'siege_social', label: 'Siège social', type: 'text', required: true },
      { name: 'capital_social', label: 'Capital social (FCFA)', type: 'text', required: true },
      { name: 'date_ag', label: 'Date de l\'assemblée', type: 'date', required: true },
      { name: 'heure_ag', label: 'Heure de l\'assemblée', type: 'text', required: true },
      { name: 'lieu_ag', label: 'Lieu de l\'assemblée', type: 'text', required: true },
      { name: 'president_seance', label: 'Président de séance', type: 'text', required: true },
      { name: 'ordre_du_jour', label: 'Ordre du jour', type: 'textarea', required: true },
      { name: 'resolutions', label: 'Résolutions adoptées', type: 'textarea', required: true },
      { name: 'participants', label: 'Liste des participants / quorum', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1a3c5e;text-align:center;font-size:17px;text-transform:uppercase;border-bottom:2px solid #1a3c5e;padding-bottom:10px;">PROCÈS-VERBAL D'ASSEMBLÉE GÉNÉRALE ORDINAIRE</h1>
<table style="width:100%;border-collapse:collapse;margin:15px 0;font-size:13px;">
<tr><td style="padding:5px 8px;width:35%;color:#555;">Société :</td><td style="padding:5px 8px;font-weight:bold;">{{denomination}}</td></tr>
<tr style="background:#f5f5f5;"><td style="padding:5px 8px;color:#555;">Siège social :</td><td style="padding:5px 8px;">{{siege_social}}</td></tr>
<tr><td style="padding:5px 8px;color:#555;">Capital social :</td><td style="padding:5px 8px;">{{capital_social}} FCFA</td></tr>
<tr style="background:#f5f5f5;"><td style="padding:5px 8px;color:#555;">Date :</td><td style="padding:5px 8px;">{{date_ag}} à {{heure_ag}}</td></tr>
<tr><td style="padding:5px 8px;color:#555;">Lieu :</td><td style="padding:5px 8px;">{{lieu_ag}}</td></tr>
<tr style="background:#f5f5f5;"><td style="padding:5px 8px;color:#555;">Président de séance :</td><td style="padding:5px 8px;">{{president_seance}}</td></tr>
</table>
<h2 style="color:#1a3c5e;font-size:14px;margin-top:15px;">PARTICIPANTS / QUORUM</h2>
<p style="font-size:13px;">{{participants}}</p>
<h2 style="color:#1a3c5e;font-size:14px;">ORDRE DU JOUR</h2>
<p style="font-size:13px;background:#f0f4f8;padding:10px;border-radius:4px;">{{ordre_du_jour}}</p>
<h2 style="color:#1a3c5e;font-size:14px;">RÉSOLUTIONS ADOPTÉES</h2>
<p style="font-size:13px;background:#e8f5e9;padding:10px;border-radius:4px;">{{resolutions}}</p>
<p style="margin-top:25px;font-size:13px;">L'ordre du jour étant épuisé, la séance est levée.</p>
<div style="display:flex;justify-content:space-between;margin-top:20px;font-size:13px;"><div><strong>Le Président de séance</strong><br/>{{president_seance}}<br/><br/>Signature : _______________</div><div><strong>Le Secrétaire de séance</strong><br/><br/><br/>Signature : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 90,
  },

  {
    code: 'droit_pv_ag_extraordinaire',
    name: 'Procès-verbal AG extraordinaire',
    category: 'juridique_admin',
    description: 'Procès-verbal d\'Assemblée Générale Extraordinaire (AGE) pour modifications statutaires OHADA',
    price: 1000, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'denomination', label: 'Dénomination sociale', type: 'text', required: true },
      { name: 'capital_social', label: 'Capital social (FCFA)', type: 'text', required: true },
      { name: 'date_age', label: 'Date de l\'AGE', type: 'date', required: true },
      { name: 'heure_age', label: 'Heure', type: 'text', required: true },
      { name: 'lieu_age', label: 'Lieu', type: 'text', required: true },
      { name: 'president_seance', label: 'Président de séance', type: 'text', required: true },
      { name: 'objet_modification', label: 'Objet de la modification statutaire', type: 'textarea', required: true },
      { name: 'texte_ancien', label: 'Texte ancien (avant modification)', type: 'textarea', required: false },
      { name: 'texte_nouveau', label: 'Nouveau texte adopté', type: 'textarea', required: true },
      { name: 'quorum_vote', label: 'Quorum et résultat du vote', type: 'textarea', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#7b1fa2;text-align:center;font-size:17px;text-transform:uppercase;border-bottom:2px solid #7b1fa2;padding-bottom:10px;">PROCÈS-VERBAL D'ASSEMBLÉE GÉNÉRALE EXTRAORDINAIRE</h1>
<p style="text-align:center;font-size:13px;color:#555;">Modification des statuts — Acte Uniforme OHADA</p>
<table style="width:100%;border-collapse:collapse;margin:15px 0;font-size:13px;">
<tr><td style="padding:5px 8px;width:35%;color:#555;">Société :</td><td style="padding:5px 8px;font-weight:bold;">{{denomination}}</td></tr>
<tr style="background:#f5f5f5;"><td style="padding:5px 8px;color:#555;">Capital social :</td><td style="padding:5px 8px;">{{capital_social}} FCFA</td></tr>
<tr><td style="padding:5px 8px;color:#555;">Date / Heure :</td><td style="padding:5px 8px;">{{date_age}} à {{heure_age}}</td></tr>
<tr style="background:#f5f5f5;"><td style="padding:5px 8px;color:#555;">Lieu :</td><td style="padding:5px 8px;">{{lieu_age}}</td></tr>
<tr><td style="padding:5px 8px;color:#555;">Président :</td><td style="padding:5px 8px;">{{president_seance}}</td></tr>
</table>
<h2 style="color:#7b1fa2;font-size:14px;">OBJET DE LA MODIFICATION</h2>
<p style="font-size:13px;background:#f3e5f5;padding:10px;border-radius:4px;">{{objet_modification}}</p>
<h2 style="color:#7b1fa2;font-size:14px;">TEXTE ANCIEN</h2>
<p style="font-size:13px;color:#666;background:#fafafa;padding:10px;border-left:3px solid #ccc;">{{texte_ancien}}</p>
<h2 style="color:#7b1fa2;font-size:14px;">NOUVEAU TEXTE ADOPTÉ</h2>
<p style="font-size:13px;font-weight:bold;background:#e8f5e9;padding:10px;border-radius:4px;">{{texte_nouveau}}</p>
<h2 style="color:#7b1fa2;font-size:14px;">QUORUM ET VOTE</h2>
<p style="font-size:13px;">{{quorum_vote}}</p>
<div style="display:flex;justify-content:space-between;margin-top:20px;font-size:13px;"><div><strong>Le Président</strong><br/>{{president_seance}}<br/><br/>Signature : _______________</div><div><strong>Le Secrétaire</strong><br/><br/><br/>Signature : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 75,
  },

  {
    code: 'droit_contrat_vente_ohada',
    name: 'Contrat de vente OHADA',
    category: 'juridique_admin',
    description: 'Contrat de vente commerciale conforme au droit OHADA',
    price: 700, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'vendeur_nom', label: 'Nom / Raison sociale du vendeur', type: 'text', required: true },
      { name: 'acheteur_nom', label: 'Nom / Raison sociale de l\'acheteur', type: 'text', required: true },
      { name: 'designation_bien', label: 'Désignation du bien vendu', type: 'textarea', required: true },
      { name: 'prix_vente', label: 'Prix de vente (FCFA)', type: 'text', required: true },
      { name: 'modalites_paiement', label: 'Modalités de paiement', type: 'textarea', required: true },
      { name: 'date_livraison', label: 'Date de livraison prévue', type: 'date', required: false },
      { name: 'lieu_livraison', label: 'Lieu de livraison', type: 'text', required: false },
      { name: 'garanties', label: 'Garanties', type: 'textarea', required: false },
      { name: 'date_contrat', label: 'Date du contrat', type: 'date', required: true },
      { name: 'lieu_contrat', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1a3c5e;text-align:center;font-size:17px;text-transform:uppercase;border-bottom:2px solid #1a3c5e;padding-bottom:10px;">CONTRAT DE VENTE</h1>
<p style="text-align:center;font-size:12px;color:#555;">Régi par l'Acte Uniforme OHADA portant sur le droit commercial général</p>
<h2 style="color:#1a3c5e;font-size:14px;margin-top:18px;">ENTRE LES SOUSSIGNÉS</h2>
<p style="font-size:13px;"><strong>Le Vendeur :</strong> {{vendeur_nom}}<br/><strong>L'Acheteur :</strong> {{acheteur_nom}}</p>
<h2 style="color:#1a3c5e;font-size:14px;">ARTICLE 1 — OBJET</h2>
<p style="font-size:13px;">Le vendeur cède à l'acheteur le bien suivant : <strong>{{designation_bien}}</strong>.</p>
<h2 style="color:#1a3c5e;font-size:14px;">ARTICLE 2 — PRIX</h2>
<p style="font-size:13px;">Le prix de vente est fixé à <strong>{{prix_vente}} FCFA</strong>.</p>
<h2 style="color:#1a3c5e;font-size:14px;">ARTICLE 3 — MODALITÉS DE PAIEMENT</h2>
<p style="font-size:13px;background:#f0f4f8;padding:10px;border-radius:4px;">{{modalites_paiement}}</p>
<h2 style="color:#1a3c5e;font-size:14px;">ARTICLE 4 — LIVRAISON</h2>
<p style="font-size:13px;">Lieu : <strong>{{lieu_livraison}}</strong> — Date prévue : <strong>{{date_livraison}}</strong>.</p>
<h2 style="color:#1a3c5e;font-size:14px;">ARTICLE 5 — GARANTIES</h2>
<p style="font-size:13px;">{{garanties}}</p>
<h2 style="color:#1a3c5e;font-size:14px;">ARTICLE 6 — DROIT APPLICABLE</h2>
<p style="font-size:13px;">Le présent contrat est soumis à l'Acte Uniforme OHADA.</p>
<p style="margin-top:25px;font-size:13px;">Fait en deux exemplaires à <strong>{{lieu_contrat}}</strong>, le <strong>{{date_contrat}}</strong>.</p>
<div style="display:flex;justify-content:space-between;margin-top:20px;font-size:13px;"><div><strong>Le Vendeur</strong><br/>{{vendeur_nom}}<br/><br/>Signature : _______________</div><div><strong>L'Acheteur</strong><br/>{{acheteur_nom}}<br/><br/>Signature : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 80,
  },

  {
    code: 'droit_bail_commercial_ohada',
    name: 'Contrat de bail commercial OHADA',
    category: 'juridique_admin',
    description: 'Contrat de bail commercial régi par l\'Acte Uniforme OHADA',
    price: 900, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'bailleur_nom', label: 'Nom / Raison sociale du bailleur', type: 'text', required: true },
      { name: 'preneur_nom', label: 'Nom / Raison sociale du preneur', type: 'text', required: true },
      { name: 'adresse_local', label: 'Adresse et description du local', type: 'textarea', required: true },
      { name: 'activite_commerciale', label: 'Activité commerciale autorisée', type: 'text', required: true },
      { name: 'duree_bail', label: 'Durée du bail (années)', type: 'text', required: true },
      { name: 'date_debut', label: 'Date d\'entrée en jouissance', type: 'date', required: true },
      { name: 'loyer_mensuel', label: 'Loyer mensuel (FCFA)', type: 'text', required: true },
      { name: 'depot_garantie', label: 'Dépôt de garantie (FCFA)', type: 'text', required: false },
      { name: 'charges', label: 'Charges et conditions particulières', type: 'textarea', required: false },
      { name: 'date_contrat', label: 'Date de signature', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#2e7d32;text-align:center;font-size:17px;text-transform:uppercase;border-bottom:2px solid #2e7d32;padding-bottom:10px;">CONTRAT DE BAIL COMMERCIAL</h1>
<p style="text-align:center;font-size:12px;color:#555;">Acte Uniforme OHADA portant sur le droit commercial général</p>
<h2 style="color:#2e7d32;font-size:14px;margin-top:18px;">PARTIES</h2>
<p style="font-size:13px;"><strong>Le Bailleur :</strong> {{bailleur_nom}}<br/><strong>Le Preneur :</strong> {{preneur_nom}}</p>
<h2 style="color:#2e7d32;font-size:14px;">ARTICLE 1 — DÉSIGNATION DU LOCAL</h2>
<p style="font-size:13px;background:#f1f8e9;padding:10px;border-radius:4px;">{{adresse_local}}</p>
<h2 style="color:#2e7d32;font-size:14px;">ARTICLE 2 — DESTINATION</h2>
<p style="font-size:13px;">Le local est loué pour usage exclusif de : <strong>{{activite_commerciale}}</strong>.</p>
<h2 style="color:#2e7d32;font-size:14px;">ARTICLE 3 — DURÉE</h2>
<p style="font-size:13px;">Durée : <strong>{{duree_bail}} ans</strong>, à compter du <strong>{{date_debut}}</strong>.</p>
<h2 style="color:#2e7d32;font-size:14px;">ARTICLE 4 — LOYER ET GARANTIE</h2>
<table style="width:100%;border-collapse:collapse;margin:8px 0;font-size:13px;">
<tr style="background:#2e7d32;color:white;"><th style="padding:6px 8px;text-align:left;">Élément</th><th style="padding:6px 8px;text-align:right;">Montant (FCFA)</th></tr>
<tr><td style="padding:5px 8px;border-bottom:1px solid #eee;">Loyer mensuel</td><td style="padding:5px 8px;text-align:right;border-bottom:1px solid #eee;">{{loyer_mensuel}}</td></tr>
<tr><td style="padding:5px 8px;">Dépôt de garantie</td><td style="padding:5px 8px;text-align:right;">{{depot_garantie}}</td></tr>
</table>
<h2 style="color:#2e7d32;font-size:14px;">ARTICLE 5 — CHARGES ET CONDITIONS</h2>
<p style="font-size:13px;">{{charges}}</p>
<p style="margin-top:25px;font-size:13px;">Fait le <strong>{{date_contrat}}</strong>.</p>
<div style="display:flex;justify-content:space-between;margin-top:20px;font-size:13px;"><div><strong>Le Bailleur</strong><br/>{{bailleur_nom}}<br/><br/>Signature : _______________</div><div><strong>Le Preneur</strong><br/>{{preneur_nom}}<br/><br/>Signature : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 88,
  },

  {
    code: 'droit_contrat_travail_ohada',
    name: 'Contrat de travail OHADA',
    category: 'juridique_admin',
    description: 'Contrat de travail à durée déterminée ou indéterminée conforme au droit OHADA',
    price: 600, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'employeur_nom', label: 'Raison sociale de l\'employeur', type: 'text', required: true },
      { name: 'employe_nom', label: 'Nom complet de l\'employé', type: 'text', required: true },
      { name: 'poste', label: 'Poste / Fonction', type: 'text', required: true },
      { name: 'type_contrat', label: 'Type de contrat (CDI/CDD)', type: 'text', required: true },
      { name: 'date_debut', label: 'Date de prise de fonctions', type: 'date', required: true },
      { name: 'duree_cdd', label: 'Durée si CDD (mois)', type: 'text', required: false },
      { name: 'salaire_brut', label: 'Salaire brut mensuel (FCFA)', type: 'text', required: true },
      { name: 'lieu_travail', label: 'Lieu de travail', type: 'text', required: true },
      { name: 'periode_essai', label: 'Période d\'essai (mois)', type: 'text', required: false },
      { name: 'avantages', label: 'Avantages en nature', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1a3c5e;text-align:center;font-size:17px;text-transform:uppercase;border-bottom:2px solid #1a3c5e;padding-bottom:10px;">CONTRAT DE TRAVAIL — {{type_contrat}}</h1>
<h2 style="color:#1a3c5e;font-size:14px;margin-top:18px;">PARTIES</h2>
<p style="font-size:13px;"><strong>L'Employeur :</strong> {{employeur_nom}}<br/><strong>L'Employé(e) :</strong> {{employe_nom}}</p>
<h2 style="color:#1a3c5e;font-size:14px;">ARTICLE 1 — ENGAGEMENT ET POSTE</h2>
<p style="font-size:13px;">L'employeur engage {{employe_nom}} au poste de <strong>{{poste}}</strong> à compter du <strong>{{date_debut}}</strong>.</p>
<h2 style="color:#1a3c5e;font-size:14px;">ARTICLE 2 — DURÉE</h2>
<p style="font-size:13px;">Contrat : <strong>{{type_contrat}}</strong>. Durée si CDD : <strong>{{duree_cdd}} mois</strong>.</p>
<h2 style="color:#1a3c5e;font-size:14px;">ARTICLE 3 — PÉRIODE D'ESSAI</h2>
<p style="font-size:13px;">Période d'essai : <strong>{{periode_essai}} mois</strong> conformément à la convention collective applicable.</p>
<h2 style="color:#1a3c5e;font-size:14px;">ARTICLE 4 — RÉMUNÉRATION</h2>
<p style="font-size:13px;">Salaire brut mensuel : <strong>{{salaire_brut}} FCFA</strong>. Avantages : {{avantages}}.</p>
<h2 style="color:#1a3c5e;font-size:14px;">ARTICLE 5 — LIEU DE TRAVAIL</h2>
<p style="font-size:13px;">{{lieu_travail}}.</p>
<h2 style="color:#1a3c5e;font-size:14px;">ARTICLE 6 — DROIT APPLICABLE</h2>
<p style="font-size:13px;">Le présent contrat est soumis au Code du Travail en vigueur et aux dispositions OHADA applicables.</p>
<p style="margin-top:25px;font-size:13px;">Fait en deux exemplaires originaux.</p>
<div style="display:flex;justify-content:space-between;margin-top:20px;font-size:13px;"><div><strong>L'Employeur</strong><br/>{{employeur_nom}}<br/><br/>Signature : _______________</div><div><strong>L'Employé(e)</strong><br/>{{employe_nom}}<br/><br/>Signature : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 92,
  },

  {
    code: 'droit_cession_parts_sociales',
    name: 'Acte de cession de parts sociales',
    category: 'juridique_admin',
    description: 'Acte de cession de parts sociales de SARL conforme à l\'Acte Uniforme OHADA',
    price: 1000, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'cedant_nom', label: 'Nom du cédant', type: 'text', required: true },
      { name: 'cessionnaire_nom', label: 'Nom du cessionnaire', type: 'text', required: true },
      { name: 'denomination', label: 'Dénomination de la société', type: 'text', required: true },
      { name: 'nombre_parts', label: 'Nombre de parts cédées', type: 'text', required: true },
      { name: 'valeur_nominale', label: 'Valeur nominale par part (FCFA)', type: 'text', required: true },
      { name: 'prix_cession', label: 'Prix total de cession (FCFA)', type: 'text', required: true },
      { name: 'modalites_paiement', label: 'Modalités de paiement du prix', type: 'textarea', required: true },
      { name: 'date_cession', label: 'Date de la cession', type: 'date', required: true },
      { name: 'lieu_signature', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div style="font-family:Georgia,serif;max-width:750px;margin:0 auto;padding:24px;border:1px solid #ccc;">
<h1 style="color:#1a3c5e;text-align:center;font-size:17px;text-transform:uppercase;border-bottom:2px solid #1a3c5e;padding-bottom:10px;">ACTE DE CESSION DE PARTS SOCIALES</h1>
<p style="text-align:center;font-size:12px;color:#555;">Acte Uniforme OHADA relatif au droit des sociétés commerciales — Article 319 et suivants</p>
<h2 style="color:#1a3c5e;font-size:14px;margin-top:18px;">ENTRE LES SOUSSIGNÉS</h2>
<p style="font-size:13px;"><strong>Le Cédant :</strong> {{cedant_nom}}<br/><strong>Le Cessionnaire :</strong> {{cessionnaire_nom}}</p>
<h2 style="color:#1a3c5e;font-size:14px;">ARTICLE 1 — OBJET DE LA CESSION</h2>
<p style="font-size:13px;">Le cédant cède au cessionnaire <strong>{{nombre_parts}} parts sociales</strong> de la société <strong>{{denomination}}</strong>, d'une valeur nominale unitaire de <strong>{{valeur_nominale}} FCFA</strong>.</p>
<h2 style="color:#1a3c5e;font-size:14px;">ARTICLE 2 — PRIX DE CESSION</h2>
<p style="font-size:13px;">Le prix total de cession est fixé à <strong>{{prix_cession}} FCFA</strong>.</p>
<h2 style="color:#1a3c5e;font-size:14px;">ARTICLE 3 — MODALITÉS DE PAIEMENT</h2>
<p style="font-size:13px;background:#f0f4f8;padding:10px;border-radius:4px;">{{modalites_paiement}}</p>
<h2 style="color:#1a3c5e;font-size:14px;">ARTICLE 4 — AGRÉMENT ET FORMALITÉS</h2>
<p style="font-size:13px;">La présente cession a reçu l'agrément des associés conformément aux statuts et à l'Acte Uniforme OHADA. Les formalités de dépôt et de publicité légale seront accomplies dans les délais légaux.</p>
<h2 style="color:#1a3c5e;font-size:14px;">ARTICLE 5 — ENTRÉE EN JOUISSANCE</h2>
<p style="font-size:13px;">Le cessionnaire entrera en jouissance des droits attachés aux parts sociales cédées à compter de la date de signature du présent acte.</p>
<p style="margin-top:25px;font-size:13px;">Fait à <strong>{{lieu_signature}}</strong>, le <strong>{{date_cession}}</strong>.</p>
<div style="display:flex;justify-content:space-between;margin-top:20px;font-size:13px;"><div><strong>Le Cédant</strong><br/>{{cedant_nom}}<br/><br/>Signature : _______________</div><div><strong>Le Cessionnaire</strong><br/>{{cessionnaire_nom}}<br/><br/>Signature : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 72,
  },

  {
    code: 'droit_contrat_pret_particuliers',
    name: 'Contrat de prêt entre particuliers',
    category: 'juridique_admin',
    description: 'Contrat de prêt d\'argent entre particuliers avec reconnaissance de dette',
    price: 500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'preteur_nom', label: 'Nom du prêteur', type: 'text', required: true },
      { name: 'emprunteur_nom', label: 'Nom de l\'emprunteur', type: 'text', required: true },
      { name: 'montant_pret', label: 'Montant du prêt (FCFA)', type: 'text', required: true },
      { name: 'taux_interet', label: 'Taux d\'intérêt (%)', type: 'text', required: false },
      { name: 'duree_pret', label: 'Durée du prêt (mois)', type: 'text', required: true },
      { name: 'date_deblocage', label: 'Date de déblocage des fonds', type: 'date', required: true },
      { name: 'date_echeance', label: 'Date d\'échéance finale', type: 'date', required: true },
      { name: 'modalites_remboursement', label: 'Modalités de remboursement', type: 'textarea', required: true },
      { name: 'garantie', label: 'Garantie offerte', type: 'textarea', required: false },
      { name: 'lieu_signature', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div style="font-family:Georgia,serif;max-width:750px;margin:0 auto;padding:24px;border:1px solid #ccc;">
<h1 style="color:#1a3c5e;text-align:center;font-size:17px;text-transform:uppercase;border-bottom:2px solid #1a3c5e;padding-bottom:10px;">CONTRAT DE PRÊT ENTRE PARTICULIERS</h1>
<h2 style="color:#1a3c5e;font-size:14px;margin-top:18px;">ENTRE LES SOUSSIGNÉS</h2>
<p style="font-size:13px;"><strong>Le Prêteur :</strong> {{preteur_nom}}<br/><strong>L'Emprunteur :</strong> {{emprunteur_nom}}</p>
<h2 style="color:#1a3c5e;font-size:14px;">ARTICLE 1 — OBJET DU PRÊT</h2>
<p style="font-size:13px;">Le prêteur remet à l'emprunteur la somme de <strong>{{montant_pret}} FCFA</strong> en date du <strong>{{date_deblocage}}</strong>.</p>
<h2 style="color:#1a3c5e;font-size:14px;">ARTICLE 2 — DURÉE ET INTÉRÊTS</h2>
<p style="font-size:13px;">Le prêt est consenti pour une durée de <strong>{{duree_pret}} mois</strong>, au taux de <strong>{{taux_interet}}%</strong> l'an.</p>
<h2 style="color:#1a3c5e;font-size:14px;">ARTICLE 3 — REMBOURSEMENT</h2>
<p style="font-size:13px;background:#f0f4f8;padding:10px;border-radius:4px;">{{modalites_remboursement}}</p>
<p style="font-size:13px;">Date d'échéance finale : <strong>{{date_echeance}}</strong>.</p>
<h2 style="color:#1a3c5e;font-size:14px;">ARTICLE 4 — GARANTIES</h2>
<p style="font-size:13px;">{{garantie}}</p>
<h2 style="color:#1a3c5e;font-size:14px;">ARTICLE 5 — DÉFAUT DE PAIEMENT</h2>
<p style="font-size:13px;">En cas de défaut de remboursement, le prêteur pourra se prévaloir des voies d'exécution prévues par l'Acte Uniforme OHADA portant organisation des procédures simplifiées de recouvrement.</p>
<p style="margin-top:25px;font-size:13px;">Fait à <strong>{{lieu_signature}}</strong>, le <strong>{{date_deblocage}}</strong>.</p>
<div style="display:flex;justify-content:space-between;margin-top:20px;font-size:13px;"><div><strong>Le Prêteur</strong><br/>{{preteur_nom}}<br/><br/>Signature : _______________</div><div><strong>L'Emprunteur</strong><br/>{{emprunteur_nom}}<br/><br/>Signature : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 68,
  },

  {
    code: 'droit_convention_cca',
    name: 'Convention de compte courant associé',
    category: 'juridique_admin',
    description: 'Convention encadrant les avances en compte courant d\'un associé à sa société OHADA',
    price: 800, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'denomination', label: 'Dénomination de la société', type: 'text', required: true },
      { name: 'associe_nom', label: 'Nom de l\'associé', type: 'text', required: true },
      { name: 'montant_avance', label: 'Montant de l\'avance (FCFA)', type: 'text', required: true },
      { name: 'taux_remuneration', label: 'Taux de rémunération (%)', type: 'text', required: false },
      { name: 'date_avance', label: 'Date de l\'avance', type: 'date', required: true },
      { name: 'modalites_remboursement', label: 'Modalités de remboursement', type: 'textarea', required: true },
      { name: 'date_convention', label: 'Date de la convention', type: 'date', required: true },
      { name: 'lieu_signature', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1a3c5e;text-align:center;font-size:17px;text-transform:uppercase;border-bottom:2px solid #1a3c5e;padding-bottom:10px;">CONVENTION DE COMPTE COURANT ASSOCIÉ</h1>
<p style="text-align:center;font-size:12px;color:#555;">Convention réglementée — Acte Uniforme OHADA</p>
<h2 style="color:#1a3c5e;font-size:14px;margin-top:18px;">PARTIES</h2>
<p style="font-size:13px;"><strong>La Société :</strong> {{denomination}}<br/><strong>L'Associé :</strong> {{associe_nom}}</p>
<h2 style="color:#1a3c5e;font-size:14px;">ARTICLE 1 — OBJET</h2>
<p style="font-size:13px;">L'associé {{associe_nom}} consent à mettre à la disposition de la société {{denomination}} une avance en compte courant d'un montant de <strong>{{montant_avance}} FCFA</strong> en date du <strong>{{date_avance}}</strong>.</p>
<h2 style="color:#1a3c5e;font-size:14px;">ARTICLE 2 — RÉMUNÉRATION</h2>
<p style="font-size:13px;">Cette avance sera rémunérée au taux annuel de <strong>{{taux_remuneration}}%</strong>, calculé prorata temporis.</p>
<h2 style="color:#1a3c5e;font-size:14px;">ARTICLE 3 — REMBOURSEMENT</h2>
<p style="font-size:13px;background:#f0f4f8;padding:10px;border-radius:4px;">{{modalites_remboursement}}</p>
<h2 style="color:#1a3c5e;font-size:14px;">ARTICLE 4 — APPROBATION ET PUBLICITÉ</h2>
<p style="font-size:13px;">La présente convention, qualifiée de convention réglementée, sera soumise à l'approbation de l'Assemblée Générale conformément aux dispositions de l'Acte Uniforme OHADA.</p>
<p style="margin-top:25px;font-size:13px;">Fait à <strong>{{lieu_signature}}</strong>, le <strong>{{date_convention}}</strong>.</p>
<div style="display:flex;justify-content:space-between;margin-top:20px;font-size:13px;"><div><strong>La Société</strong><br/>{{denomination}}<br/><br/>Signature : _______________</div><div><strong>L'Associé</strong><br/>{{associe_nom}}<br/><br/>Signature : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 60,
  },

  {
    code: 'droit_mise_en_demeure_ohada',
    name: 'Mise en demeure OHADA',
    category: 'juridique_admin',
    description: 'Lettre de mise en demeure formelle avant procédure judiciaire OHADA',
    price: 500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'expediteur_nom', label: 'Nom / Raison sociale de l\'expéditeur', type: 'text', required: true },
      { name: 'destinataire_nom', label: 'Nom / Raison sociale du destinataire', type: 'text', required: true },
      { name: 'objet_litige', label: 'Objet du litige', type: 'text', required: true },
      { name: 'montant_reclame', label: 'Montant réclamé (FCFA)', type: 'text', required: false },
      { name: 'description_faits', label: 'Description des faits', type: 'textarea', required: true },
      { name: 'delai_execution', label: 'Délai accordé pour exécution (jours)', type: 'text', required: true },
      { name: 'action_requise', label: 'Action requise', type: 'textarea', required: true },
      { name: 'date_lettre', label: 'Date de la lettre', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<p style="text-align:right;font-size:13px;"><strong>{{expediteur_nom}}</strong><br/>Date : {{date_lettre}}</p>
<p style="font-size:13px;margin-top:15px;"><strong>À l'attention de : {{destinataire_nom}}</strong></p>
<h2 style="color:#c0392b;font-size:15px;text-transform:uppercase;border-bottom:2px solid #c0392b;padding-bottom:6px;margin-top:15px;">MISE EN DEMEURE</h2>
<p style="font-size:13px;"><strong>Objet :</strong> {{objet_litige}}</p>
<p style="font-size:13px;font-weight:bold;color:#c0392b;">MONTANT RÉCLAMÉ : {{montant_reclame}} FCFA</p>
<h2 style="color:#1a3c5e;font-size:14px;margin-top:15px;">EXPOSÉ DES FAITS</h2>
<p style="font-size:13px;background:#fff5f5;padding:10px;border-left:4px solid #c0392b;border-radius:0 4px 4px 0;">{{description_faits}}</p>
<h2 style="color:#1a3c5e;font-size:14px;margin-top:15px;">ACTION REQUISE</h2>
<p style="font-size:13px;background:#f0f4f8;padding:10px;border-radius:4px;">{{action_requise}}</p>
<p style="font-size:13px;margin-top:15px;font-weight:bold;color:#c0392b;">Il vous est accordé un délai de <u>{{delai_execution}} jours</u> à compter de la réception de la présente pour vous exécuter.</p>
<p style="font-size:13px;">À défaut, nous nous réserverons le droit de saisir la juridiction compétente et de recourir à toutes les voies d'exécution prévues par l'Acte Uniforme OHADA portant organisation des procédures simplifiées de recouvrement et des voies d'exécution.</p>
<p style="margin-top:20px;font-size:13px;"><strong>{{expediteur_nom}}</strong><br/><br/>Signature : _______________</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 95,
  },

  {
    code: 'droit_requete_injonction_payer',
    name: 'Requête injonction de payer',
    category: 'juridique_admin',
    description: 'Requête en injonction de payer selon la procédure simplifiée de l\'Acte Uniforme OHADA',
    price: 1000, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'creancier_nom', label: 'Nom / Raison sociale du créancier', type: 'text', required: true },
      { name: 'creancier_adresse', label: 'Adresse du créancier', type: 'text', required: true },
      { name: 'debiteur_nom', label: 'Nom / Raison sociale du débiteur', type: 'text', required: true },
      { name: 'debiteur_adresse', label: 'Adresse du débiteur', type: 'text', required: true },
      { name: 'montant_principal', label: 'Montant principal (FCFA)', type: 'text', required: true },
      { name: 'montant_interets', label: 'Intérêts réclamés (FCFA)', type: 'text', required: false },
      { name: 'nature_creance', label: 'Nature et origine de la créance', type: 'textarea', required: true },
      { name: 'tribunal_competent', label: 'Tribunal compétent', type: 'text', required: true },
      { name: 'date_requete', label: 'Date de la requête', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1a3c5e;text-align:center;font-size:16px;text-transform:uppercase;border-bottom:2px solid #1a3c5e;padding-bottom:10px;">REQUÊTE EN INJONCTION DE PAYER</h1>
<p style="text-align:center;font-size:12px;color:#555;">Procédure simplifiée de recouvrement — Articles 1 à 18 de l'Acte Uniforme OHADA</p>
<p style="font-size:13px;margin-top:15px;"><strong>À Monsieur / Madame le Président du {{tribunal_competent}}</strong></p>
<h2 style="color:#1a3c5e;font-size:14px;margin-top:15px;">REQUÉRANT (CRÉANCIER)</h2>
<p style="font-size:13px;"><strong>{{creancier_nom}}</strong>, demeurant à {{creancier_adresse}}.</p>
<h2 style="color:#1a3c5e;font-size:14px;">CONTRE (DÉBITEUR)</h2>
<p style="font-size:13px;"><strong>{{debiteur_nom}}</strong>, demeurant à {{debiteur_adresse}}.</p>
<h2 style="color:#1a3c5e;font-size:14px;">EXPOSÉ DE LA CRÉANCE</h2>
<p style="font-size:13px;background:#f0f4f8;padding:10px;border-radius:4px;">{{nature_creance}}</p>
<table style="width:100%;border-collapse:collapse;margin:12px 0;font-size:13px;">
<tr style="background:#1a3c5e;color:white;"><th style="padding:6px 8px;text-align:left;">Poste</th><th style="padding:6px 8px;text-align:right;">Montant (FCFA)</th></tr>
<tr><td style="padding:5px 8px;border-bottom:1px solid #eee;">Principal</td><td style="padding:5px 8px;text-align:right;border-bottom:1px solid #eee;">{{montant_principal}}</td></tr>
<tr><td style="padding:5px 8px;">Intérêts</td><td style="padding:5px 8px;text-align:right;">{{montant_interets}}</td></tr>
</table>
<p style="font-size:13px;font-style:italic;">En conséquence, il est demandé à Monsieur/Madame le Président de bien vouloir rendre une ordonnance portant injonction de payer au débiteur la somme réclamée, conformément aux dispositions de l'Acte Uniforme OHADA.</p>
<p style="margin-top:20px;font-size:13px;">Fait le <strong>{{date_requete}}</strong>.</p>
<p style="font-size:13px;"><strong>{{creancier_nom}}</strong><br/><br/>Signature : _______________</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 82,
  },

  {
    code: 'droit_contrat_cautionnement',
    name: 'Contrat de cautionnement',
    category: 'juridique_admin',
    description: 'Acte de cautionnement solidaire conforme au droit OHADA',
    price: 700, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'caution_nom', label: 'Nom de la caution', type: 'text', required: true },
      { name: 'creancier_nom', label: 'Nom du créancier', type: 'text', required: true },
      { name: 'debiteur_nom', label: 'Nom du débiteur principal', type: 'text', required: true },
      { name: 'montant_garanti', label: 'Montant garanti (FCFA)', type: 'text', required: true },
      { name: 'obligation_garantie', label: 'Description de l\'obligation garantie', type: 'textarea', required: true },
      { name: 'duree_cautionnement', label: 'Durée du cautionnement', type: 'text', required: false },
      { name: 'type_cautionnement', label: 'Type (simple / solidaire)', type: 'text', required: true },
      { name: 'date_acte', label: 'Date de l\'acte', type: 'date', required: true },
      { name: 'lieu_signature', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div style="font-family:Georgia,serif;max-width:750px;margin:0 auto;padding:24px;border:1px solid #ccc;">
<h1 style="color:#1a3c5e;text-align:center;font-size:17px;text-transform:uppercase;border-bottom:2px solid #1a3c5e;padding-bottom:10px;">ACTE DE CAUTIONNEMENT</h1>
<h2 style="color:#1a3c5e;font-size:14px;margin-top:18px;">PARTIES</h2>
<p style="font-size:13px;"><strong>La Caution :</strong> {{caution_nom}}<br/><strong>Le Créancier :</strong> {{creancier_nom}}<br/><strong>Le Débiteur principal :</strong> {{debiteur_nom}}</p>
<h2 style="color:#1a3c5e;font-size:14px;">ARTICLE 1 — ENGAGEMENT DE CAUTIONNEMENT</h2>
<p style="font-size:13px;">Je soussigné(e) <strong>{{caution_nom}}</strong> me porte caution <strong>{{type_cautionnement}}</strong> envers <strong>{{creancier_nom}}</strong> pour garantir l'exécution par <strong>{{debiteur_nom}}</strong> de l'obligation suivante :</p>
<p style="font-size:13px;background:#f0f4f8;padding:10px;border-radius:4px;">{{obligation_garantie}}</p>
<h2 style="color:#1a3c5e;font-size:14px;">ARTICLE 2 — ÉTENDUE DE LA GARANTIE</h2>
<p style="font-size:13px;">Le cautionnement est limité à la somme de <strong>{{montant_garanti}} FCFA</strong>, tous frais et accessoires inclus. Durée : <strong>{{duree_cautionnement}}</strong>.</p>
<h2 style="color:#1a3c5e;font-size:14px;">ARTICLE 3 — OBLIGATIONS DE LA CAUTION</h2>
<p style="font-size:13px;">La caution renonce au bénéfice de discussion et d'ordre et s'engage à payer à première demande en cas de défaillance du débiteur principal.</p>
<h2 style="color:#1a3c5e;font-size:14px;">ARTICLE 4 — DROIT APPLICABLE</h2>
<p style="font-size:13px;">Le présent acte est régi par l'Acte Uniforme OHADA portant organisation des sûretés.</p>
<p style="margin-top:25px;font-size:13px;">Fait à <strong>{{lieu_signature}}</strong>, le <strong>{{date_acte}}</strong>.</p>
<div style="display:flex;justify-content:space-between;margin-top:20px;font-size:13px;"><div><strong>La Caution</strong><br/>{{caution_nom}}<br/><br/>Signature : _______________</div><div><strong>Le Créancier</strong><br/>{{creancier_nom}}<br/><br/>Signature : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 65,
  },

  {
    code: 'droit_accord_mediation_commerciale',
    name: 'Accord de médiation commerciale',
    category: 'juridique_admin',
    description: 'Convention de médiation commerciale amiable dans l\'espace OHADA',
    price: 700, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'partie_a_nom', label: 'Nom de la première partie', type: 'text', required: true },
      { name: 'partie_b_nom', label: 'Nom de la deuxième partie', type: 'text', required: true },
      { name: 'mediateur_nom', label: 'Nom du médiateur', type: 'text', required: true },
      { name: 'objet_litige', label: 'Objet du litige à médier', type: 'textarea', required: true },
      { name: 'duree_mediation', label: 'Durée de la médiation (jours)', type: 'text', required: true },
      { name: 'honoraires_mediateur', label: 'Honoraires du médiateur (FCFA)', type: 'text', required: false },
      { name: 'date_accord', label: 'Date de l\'accord de médiation', type: 'date', required: true },
      { name: 'lieu_mediation', label: 'Lieu de la médiation', type: 'text', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#00695c;text-align:center;font-size:17px;text-transform:uppercase;border-bottom:2px solid #00695c;padding-bottom:10px;">ACCORD DE MÉDIATION COMMERCIALE</h1>
<p style="text-align:center;font-size:12px;color:#555;">Mode alternatif de règlement des différends — Espace OHADA</p>
<h2 style="color:#00695c;font-size:14px;margin-top:18px;">PARTIES AU LITIGE</h2>
<p style="font-size:13px;"><strong>Partie A :</strong> {{partie_a_nom}}<br/><strong>Partie B :</strong> {{partie_b_nom}}<br/><strong>Médiateur :</strong> {{mediateur_nom}}</p>
<h2 style="color:#00695c;font-size:14px;">ARTICLE 1 — OBJET DU LITIGE</h2>
<p style="font-size:13px;background:#e0f2f1;padding:10px;border-radius:4px;">{{objet_litige}}</p>
<h2 style="color:#00695c;font-size:14px;">ARTICLE 2 — MISSION DU MÉDIATEUR</h2>
<p style="font-size:13px;">Le médiateur est chargé d'aider les parties à parvenir à un règlement amiable de leur différend, dans un délai de <strong>{{duree_mediation}} jours</strong> à compter de la signature du présent accord.</p>
<h2 style="color:#00695c;font-size:14px;">ARTICLE 3 — CONFIDENTIALITÉ</h2>
<p style="font-size:13px;">Les parties s'engagent à respecter la confidentialité absolue des échanges et propositions intervenus dans le cadre de la médiation.</p>
<h2 style="color:#00695c;font-size:14px;">ARTICLE 4 — HONORAIRES</h2>
<p style="font-size:13px;">Les honoraires du médiateur sont fixés à <strong>{{honoraires_mediateur}} FCFA</strong>, partagés par parts égales entre les parties.</p>
<h2 style="color:#00695c;font-size:14px;">ARTICLE 5 — LIEU</h2>
<p style="font-size:13px;">La médiation se déroulera à <strong>{{lieu_mediation}}</strong>.</p>
<p style="margin-top:25px;font-size:13px;">Signé le <strong>{{date_accord}}</strong>.</p>
<div style="display:flex;justify-content:space-between;margin-top:20px;font-size:13px;"><div><strong>Partie A</strong><br/>{{partie_a_nom}}<br/><br/>Signature : ___</div><div><strong>Partie B</strong><br/>{{partie_b_nom}}<br/><br/>Signature : ___</div><div><strong>Médiateur</strong><br/>{{mediateur_nom}}<br/><br/>Signature : ___</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 58,
  },

  {
    code: 'droit_contrat_franchise_ohada',
    name: 'Contrat de franchise OHADA',
    category: 'juridique_admin',
    description: 'Contrat de franchise commerciale régi par le droit OHADA',
    price: 1500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'franchiseur_nom', label: 'Nom du franchiseur', type: 'text', required: true },
      { name: 'franchise_nom', label: 'Nom du franchisé', type: 'text', required: true },
      { name: 'enseigne', label: 'Enseigne / Concept franchisé', type: 'text', required: true },
      { name: 'territoire', label: 'Territoire concédé', type: 'text', required: true },
      { name: 'duree_contrat', label: 'Durée du contrat (années)', type: 'text', required: true },
      { name: 'droit_entree', label: 'Droit d\'entrée (FCFA)', type: 'text', required: false },
      { name: 'redevance', label: 'Redevances / Royalties (%)', type: 'text', required: false },
      { name: 'obligations_franchiseur', label: 'Obligations du franchiseur', type: 'textarea', required: true },
      { name: 'obligations_franchise', label: 'Obligations du franchisé', type: 'textarea', required: true },
      { name: 'date_contrat', label: 'Date du contrat', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#e65100;text-align:center;font-size:17px;text-transform:uppercase;border-bottom:2px solid #e65100;padding-bottom:10px;">CONTRAT DE FRANCHISE</h1>
<p style="text-align:center;font-size:12px;color:#555;">Régi par l'Acte Uniforme OHADA relatif au droit commercial général</p>
<h2 style="color:#e65100;font-size:14px;margin-top:18px;">PARTIES</h2>
<p style="font-size:13px;"><strong>Le Franchiseur :</strong> {{franchiseur_nom}}<br/><strong>Le Franchisé :</strong> {{franchise_nom}}</p>
<h2 style="color:#e65100;font-size:14px;">ARTICLE 1 — OBJET ET ENSEIGNE</h2>
<p style="font-size:13px;">Le franchiseur concède au franchisé le droit d'exploiter le concept <strong>{{enseigne}}</strong> sur le territoire de <strong>{{territoire}}</strong>.</p>
<h2 style="color:#e65100;font-size:14px;">ARTICLE 2 — DURÉE</h2>
<p style="font-size:13px;">Le contrat est consenti pour une durée de <strong>{{duree_contrat}} ans</strong>.</p>
<h2 style="color:#e65100;font-size:14px;">ARTICLE 3 — CONDITIONS FINANCIÈRES</h2>
<p style="font-size:13px;">Droit d'entrée : <strong>{{droit_entree}} FCFA</strong> — Redevances : <strong>{{redevance}}%</strong> du chiffre d'affaires HT.</p>
<h2 style="color:#e65100;font-size:14px;">ARTICLE 4 — OBLIGATIONS DU FRANCHISEUR</h2>
<p style="font-size:13px;background:#fff3e0;padding:10px;border-radius:4px;">{{obligations_franchiseur}}</p>
<h2 style="color:#e65100;font-size:14px;">ARTICLE 5 — OBLIGATIONS DU FRANCHISÉ</h2>
<p style="font-size:13px;background:#f0f4f8;padding:10px;border-radius:4px;">{{obligations_franchise}}</p>
<h2 style="color:#e65100;font-size:14px;">ARTICLE 6 — RÉSILIATION</h2>
<p style="font-size:13px;">La résiliation anticipée ne peut intervenir que dans les conditions prévues par le présent contrat et dans le respect des dispositions de l'Acte Uniforme OHADA.</p>
<p style="margin-top:25px;font-size:13px;">Fait le <strong>{{date_contrat}}</strong>.</p>
<div style="display:flex;justify-content:space-between;margin-top:20px;font-size:13px;"><div><strong>Le Franchiseur</strong><br/>{{franchiseur_nom}}<br/><br/>Signature : _______________</div><div><strong>Le Franchisé</strong><br/>{{franchise_nom}}<br/><br/>Signature : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 62,
  },

  {
    code: 'droit_statuts_gie_africain',
    name: 'Statuts GIE africain',
    category: 'juridique_admin',
    description: 'Statuts de Groupement d\'Intérêt Économique (GIE) conforme à l\'Acte Uniforme OHADA',
    price: 1200, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'denomination_gie', label: 'Dénomination du GIE', type: 'text', required: true },
      { name: 'siege_social', label: 'Siège social', type: 'text', required: true },
      { name: 'objet_gie', label: 'Objet du groupement', type: 'textarea', required: true },
      { name: 'membres', label: 'Membres fondateurs', type: 'textarea', required: true },
      { name: 'duree_gie', label: 'Durée (années)', type: 'text', required: true },
      { name: 'administrateur_nom', label: 'Nom de l\'administrateur', type: 'text', required: true },
      { name: 'apports_communs', label: 'Apports communs des membres', type: 'textarea', required: false },
      { name: 'date_constitution', label: 'Date de constitution', type: 'date', required: true },
      { name: 'ville_signature', label: 'Ville de signature', type: 'text', required: true },
    ]),
    body: `<div style="font-family:Georgia,serif;max-width:750px;margin:0 auto;padding:24px;border:1px solid #ccc;">
<h1 style="color:#1a3c5e;text-align:center;font-size:17px;text-transform:uppercase;border-bottom:2px solid #1a3c5e;padding-bottom:10px;">STATUTS DE GROUPEMENT D'INTÉRÊT ÉCONOMIQUE (GIE)</h1>
<p style="text-align:center;font-size:12px;color:#555;">Acte Uniforme OHADA relatif au droit des sociétés commerciales et du GIE</p>
<h2 style="color:#1a3c5e;font-size:14px;margin-top:18px;">ARTICLE 1 — DÉNOMINATION</h2>
<p style="font-size:13px;">Il est constitué un Groupement d'Intérêt Économique dénommé : <strong>{{denomination_gie}}</strong>.</p>
<h2 style="color:#1a3c5e;font-size:14px;">ARTICLE 2 — OBJET</h2>
<p style="font-size:13px;">{{objet_gie}}</p>
<h2 style="color:#1a3c5e;font-size:14px;">ARTICLE 3 — SIÈGE</h2>
<p style="font-size:13px;">Siège social : <strong>{{siege_social}}</strong>.</p>
<h2 style="color:#1a3c5e;font-size:14px;">ARTICLE 4 — DURÉE</h2>
<p style="font-size:13px;">Durée : <strong>{{duree_gie}} ans</strong>.</p>
<h2 style="color:#1a3c5e;font-size:14px;">ARTICLE 5 — MEMBRES FONDATEURS</h2>
<p style="font-size:13px;background:#f0f4f8;padding:10px;border-radius:4px;">{{membres}}</p>
<h2 style="color:#1a3c5e;font-size:14px;">ARTICLE 6 — APPORTS</h2>
<p style="font-size:13px;">{{apports_communs}}</p>
<h2 style="color:#1a3c5e;font-size:14px;">ARTICLE 7 — ADMINISTRATION</h2>
<p style="font-size:13px;">Le GIE est administré par <strong>{{administrateur_nom}}</strong>, désigné administrateur conformément aux dispositions de l'Acte Uniforme OHADA.</p>
<p style="margin-top:25px;font-size:13px;">Fait à <strong>{{ville_signature}}</strong>, le <strong>{{date_constitution}}</strong>.</p>
<div style="margin-top:20px;font-size:13px;"><strong>Les membres fondateurs</strong><br/><br/>Signatures : _______________</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 55,
  },

  {
    code: 'droit_nantissement_fonds_commerce',
    name: 'Acte de nantissement fonds commerce',
    category: 'juridique_admin',
    description: 'Acte de nantissement du fonds de commerce conforme à l\'Acte Uniforme OHADA sur les sûretés',
    price: 1200, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'debiteur_nom', label: 'Nom du débiteur / constituant', type: 'text', required: true },
      { name: 'creancier_nom', label: 'Nom du créancier bénéficiaire', type: 'text', required: true },
      { name: 'description_fonds', label: 'Description du fonds de commerce', type: 'textarea', required: true },
      { name: 'valeur_fonds', label: 'Valeur estimée du fonds (FCFA)', type: 'text', required: false },
      { name: 'montant_creance', label: 'Montant de la créance garantie (FCFA)', type: 'text', required: true },
      { name: 'elements_nantis', label: 'Éléments du fonds nantis', type: 'textarea', required: true },
      { name: 'date_acte', label: 'Date de l\'acte', type: 'date', required: true },
      { name: 'lieu_signature', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div style="font-family:Georgia,serif;max-width:750px;margin:0 auto;padding:24px;border:1px solid #ccc;">
<h1 style="color:#1a3c5e;text-align:center;font-size:17px;text-transform:uppercase;border-bottom:2px solid #1a3c5e;padding-bottom:10px;">ACTE DE NANTISSEMENT DU FONDS DE COMMERCE</h1>
<p style="text-align:center;font-size:12px;color:#555;">Acte Uniforme OHADA portant organisation des sûretés — Article 92 et suivants</p>
<h2 style="color:#1a3c5e;font-size:14px;margin-top:18px;">PARTIES</h2>
<p style="font-size:13px;"><strong>Le Constituant (Débiteur) :</strong> {{debiteur_nom}}<br/><strong>Le Bénéficiaire (Créancier) :</strong> {{creancier_nom}}</p>
<h2 style="color:#1a3c5e;font-size:14px;">ARTICLE 1 — DÉSIGNATION DU FONDS</h2>
<p style="font-size:13px;background:#f0f4f8;padding:10px;border-radius:4px;">{{description_fonds}}<br/>Valeur estimée : <strong>{{valeur_fonds}} FCFA</strong></p>
<h2 style="color:#1a3c5e;font-size:14px;">ARTICLE 2 — CRÉANCE GARANTIE</h2>
<p style="font-size:13px;">Le présent nantissement garantit le paiement de la somme de <strong>{{montant_creance}} FCFA</strong>.</p>
<h2 style="color:#1a3c5e;font-size:14px;">ARTICLE 3 — ÉLÉMENTS NANTIS</h2>
<p style="font-size:13px;background:#fff9c4;padding:10px;border-radius:4px;">{{elements_nantis}}</p>
<h2 style="color:#1a3c5e;font-size:14px;">ARTICLE 4 — OBLIGATIONS DU CONSTITUANT</h2>
<p style="font-size:13px;">Le constituant s'engage à ne pas aliéner les éléments nantis sans l'accord préalable du créancier bénéficiaire et à informer ce dernier de toute modification substantielle affectant le fonds.</p>
<h2 style="color:#1a3c5e;font-size:14px;">ARTICLE 5 — PUBLICITÉ</h2>
<p style="font-size:13px;">Le présent acte sera inscrit au RCCM conformément à l'Acte Uniforme OHADA portant organisation des sûretés.</p>
<p style="margin-top:25px;font-size:13px;">Fait à <strong>{{lieu_signature}}</strong>, le <strong>{{date_acte}}</strong>.</p>
<div style="display:flex;justify-content:space-between;margin-top:20px;font-size:13px;"><div><strong>Le Constituant</strong><br/>{{debiteur_nom}}<br/><br/>Signature : _______________</div><div><strong>Le Créancier</strong><br/>{{creancier_nom}}<br/><br/>Signature : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 60,
  },

  {
    code: 'droit_convention_arbitrage_ccja',
    name: 'Convention arbitrage CCJA',
    category: 'juridique_admin',
    description: 'Clause compromissoire ou compromis d\'arbitrage soumis à la CCJA (Cour Commune de Justice et d\'Arbitrage OHADA)',
    price: 1500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'partie_a_nom', label: 'Dénomination de la première partie', type: 'text', required: true },
      { name: 'partie_b_nom', label: 'Dénomination de la deuxième partie', type: 'text', required: true },
      { name: 'contrat_principal', label: 'Contrat principal concerné', type: 'text', required: true },
      { name: 'objet_litige', label: 'Litige ou différend soumis à l\'arbitrage', type: 'textarea', required: true },
      { name: 'nombre_arbitres', label: 'Nombre d\'arbitres (1 ou 3)', type: 'text', required: true },
      { name: 'langue_arbitrage', label: 'Langue de l\'arbitrage', type: 'text', required: false },
      { name: 'siege_arbitrage', label: 'Siège de l\'arbitrage', type: 'text', required: false },
      { name: 'droit_applicable', label: 'Droit applicable au fond', type: 'text', required: false },
      { name: 'date_convention', label: 'Date de la convention', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Georgia,serif;max-width:750px;margin:0 auto;padding:24px;border:1px solid #ccc;">
<h1 style="color:#1a3c5e;text-align:center;font-size:16px;text-transform:uppercase;border-bottom:2px solid #1a3c5e;padding-bottom:10px;">CONVENTION D'ARBITRAGE CCJA — OHADA</h1>
<p style="text-align:center;font-size:12px;color:#555;">Règlement d'Arbitrage de la Cour Commune de Justice et d'Arbitrage de l'OHADA</p>
<h2 style="color:#1a3c5e;font-size:14px;margin-top:18px;">PARTIES</h2>
<p style="font-size:13px;"><strong>Partie A :</strong> {{partie_a_nom}}<br/><strong>Partie B :</strong> {{partie_b_nom}}</p>
<h2 style="color:#1a3c5e;font-size:14px;">ARTICLE 1 — CLAUSE D'ARBITRAGE</h2>
<p style="font-size:13px;">Les parties conviennent de soumettre à l'arbitrage de la CCJA, conformément au Règlement d'Arbitrage de la CCJA de l'OHADA, tous les différends nés ou à naître du contrat <strong>{{contrat_principal}}</strong>.</p>
<h2 style="color:#1a3c5e;font-size:14px;">ARTICLE 2 — OBJET DU LITIGE</h2>
<p style="font-size:13px;background:#f0f4f8;padding:10px;border-radius:4px;">{{objet_litige}}</p>
<h2 style="color:#1a3c5e;font-size:14px;">ARTICLE 3 — TRIBUNAL ARBITRAL</h2>
<p style="font-size:13px;">Le tribunal arbitral sera composé de <strong>{{nombre_arbitres}} arbitre(s)</strong> désigné(s) conformément au Règlement de la CCJA.</p>
<h2 style="color:#1a3c5e;font-size:14px;">ARTICLE 4 — SIÈGE ET LANGUE</h2>
<p style="font-size:13px;">Siège : <strong>{{siege_arbitrage}}</strong>. Langue : <strong>{{langue_arbitrage}}</strong>.</p>
<h2 style="color:#1a3c5e;font-size:14px;">ARTICLE 5 — DROIT APPLICABLE</h2>
<p style="font-size:13px;">Les arbitres trancheront le fond du litige selon le droit <strong>{{droit_applicable}}</strong> et les règles de l'équité si les parties l'y autorisent.</p>
<h2 style="color:#1a3c5e;font-size:14px;">ARTICLE 6 — SENTENCE ARBITRALE</h2>
<p style="font-size:13px;">La sentence arbitrale sera définitive et obligatoire pour les parties. Elle sera exécutoire dans tout l'espace OHADA conformément au Traité.</p>
<p style="margin-top:25px;font-size:13px;">Fait le <strong>{{date_convention}}</strong>.</p>
<div style="display:flex;justify-content:space-between;margin-top:20px;font-size:13px;"><div><strong>Partie A</strong><br/>{{partie_a_nom}}<br/><br/>Signature : _______________</div><div><strong>Partie B</strong><br/>{{partie_b_nom}}<br/><br/>Signature : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 58,
  },

  {
    code: 'droit_contrat_distribution_ohada',
    name: 'Contrat distribution OHADA',
    category: 'juridique_admin',
    description: 'Contrat de distribution exclusive ou sélective régi par le droit OHADA',
    price: 1200, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'fournisseur_nom', label: 'Nom / Raison sociale du fournisseur', type: 'text', required: true },
      { name: 'distributeur_nom', label: 'Nom / Raison sociale du distributeur', type: 'text', required: true },
      { name: 'produits', label: 'Produits / Gamme concernée', type: 'textarea', required: true },
      { name: 'territoire', label: 'Territoire de distribution', type: 'text', required: true },
      { name: 'type_distribution', label: 'Type (exclusive / sélective)', type: 'text', required: true },
      { name: 'duree_contrat', label: 'Durée du contrat (années)', type: 'text', required: true },
      { name: 'objectifs_vente', label: 'Objectifs de vente minimaux', type: 'textarea', required: false },
      { name: 'conditions_financieres', label: 'Conditions financières / marges', type: 'textarea', required: false },
      { name: 'date_contrat', label: 'Date du contrat', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#4e342e;text-align:center;font-size:17px;text-transform:uppercase;border-bottom:2px solid #4e342e;padding-bottom:10px;">CONTRAT DE DISTRIBUTION</h1>
<p style="text-align:center;font-size:12px;color:#555;">Acte Uniforme OHADA portant droit commercial général — Distribution {{type_distribution}}</p>
<h2 style="color:#4e342e;font-size:14px;margin-top:18px;">PARTIES</h2>
<p style="font-size:13px;"><strong>Le Fournisseur :</strong> {{fournisseur_nom}}<br/><strong>Le Distributeur :</strong> {{distributeur_nom}}</p>
<h2 style="color:#4e342e;font-size:14px;">ARTICLE 1 — OBJET ET PRODUITS</h2>
<p style="font-size:13px;background:#efebe9;padding:10px;border-radius:4px;">{{produits}}</p>
<h2 style="color:#4e342e;font-size:14px;">ARTICLE 2 — TERRITOIRE ET EXCLUSIVITÉ</h2>
<p style="font-size:13px;">Le distributeur bénéficie d'une distribution <strong>{{type_distribution}}</strong> sur le territoire de <strong>{{territoire}}</strong>.</p>
<h2 style="color:#4e342e;font-size:14px;">ARTICLE 3 — DURÉE</h2>
<p style="font-size:13px;">Durée : <strong>{{duree_contrat}} ans</strong>, renouvelable par accord exprès.</p>
<h2 style="color:#4e342e;font-size:14px;">ARTICLE 4 — OBJECTIFS DE VENTE</h2>
<p style="font-size:13px;background:#f0f4f8;padding:10px;border-radius:4px;">{{objectifs_vente}}</p>
<h2 style="color:#4e342e;font-size:14px;">ARTICLE 5 — CONDITIONS FINANCIÈRES</h2>
<p style="font-size:13px;">{{conditions_financieres}}</p>
<h2 style="color:#4e342e;font-size:14px;">ARTICLE 6 — OBLIGATIONS DES PARTIES</h2>
<p style="font-size:13px;">Le fournisseur s'engage à livrer dans les délais convenus. Le distributeur s'engage à respecter la politique commerciale et les normes qualité du fournisseur.</p>
<p style="margin-top:25px;font-size:13px;">Fait le <strong>{{date_contrat}}</strong>.</p>
<div style="display:flex;justify-content:space-between;margin-top:20px;font-size:13px;"><div><strong>Le Fournisseur</strong><br/>{{fournisseur_nom}}<br/><br/>Signature : _______________</div><div><strong>Le Distributeur</strong><br/>{{distributeur_nom}}<br/><br/>Signature : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 65,
  },

  {
    code: 'droit_lettre_change_ohada',
    name: 'Lettre de change OHADA',
    category: 'juridique_admin',
    description: 'Effet de commerce — Lettre de change conforme à l\'Acte Uniforme OHADA portant droit commercial général',
    price: 500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'tireur_nom', label: 'Nom du tireur', type: 'text', required: true },
      { name: 'tire_nom', label: 'Nom du tiré', type: 'text', required: true },
      { name: 'beneficiaire_nom', label: 'Nom du bénéficiaire / porteur', type: 'text', required: true },
      { name: 'montant_lettres', label: 'Montant en lettres', type: 'text', required: true },
      { name: 'montant_chiffres', label: 'Montant en chiffres (FCFA)', type: 'text', required: true },
      { name: 'date_emission', label: 'Date d\'émission', type: 'date', required: true },
      { name: 'date_echeance', label: 'Date d\'échéance', type: 'date', required: true },
      { name: 'lieu_paiement', label: 'Lieu de paiement', type: 'text', required: true },
      { name: 'clause_sans_frais', label: 'Clause sans frais (oui/non)', type: 'text', required: false },
    ]),
    body: `<div style="font-family:Georgia,serif;max-width:650px;margin:0 auto;padding:24px;border:2px solid #1a3c5e;">
<h1 style="color:#1a3c5e;text-align:center;font-size:18px;text-transform:uppercase;border-bottom:2px solid #1a3c5e;padding-bottom:10px;">LETTRE DE CHANGE</h1>
<p style="text-align:center;font-size:11px;color:#555;">Acte Uniforme OHADA portant droit commercial général — Articles 718 à 786</p>
<table style="width:100%;margin:15px 0;font-size:13px;border-collapse:collapse;">
<tr><td style="padding:5px 8px;width:40%;color:#555;border-bottom:1px solid #eee;"><strong>Date d'émission :</strong></td><td style="padding:5px 8px;border-bottom:1px solid #eee;">{{date_emission}}</td></tr>
<tr style="background:#f5f5f5;"><td style="padding:5px 8px;color:#555;border-bottom:1px solid #eee;"><strong>Échéance :</strong></td><td style="padding:5px 8px;border-bottom:1px solid #eee;">{{date_echeance}}</td></tr>
<tr><td style="padding:5px 8px;color:#555;border-bottom:1px solid #eee;"><strong>Lieu de paiement :</strong></td><td style="padding:5px 8px;border-bottom:1px solid #eee;">{{lieu_paiement}}</td></tr>
</table>
<div style="background:#1a3c5e;color:white;padding:15px;border-radius:4px;text-align:center;margin:15px 0;">
<p style="margin:0;font-size:15px;font-weight:bold;">VEUILLEZ PAYER PAR CETTE LETTRE DE CHANGE</p>
<p style="margin:8px 0 0 0;font-size:18px;font-weight:bold;">{{montant_lettres}}</p>
<p style="margin:4px 0 0 0;font-size:14px;">soit : {{montant_chiffres}} FCFA</p>
</div>
<p style="font-size:13px;margin-top:12px;"><strong>À l'ordre de :</strong> {{beneficiaire_nom}}</p>
<p style="font-size:13px;"><strong>Tiré :</strong> {{tire_nom}}</p>
<p style="font-size:13px;"><strong>Tireur :</strong> {{tireur_nom}}</p>
<p style="font-size:12px;color:#555;font-style:italic;">{{clause_sans_frais}}</p>
<p style="margin-top:20px;font-size:13px;">Signature du tireur : ___________________________</p>
<p style="margin-top:10px;font-size:13px;border-top:1px dashed #ccc;padding-top:10px;"><strong>ACCEPTATION DU TIRÉ</strong><br/>Je soussigné(e) {{tire_nom}} accepte la présente lettre de change.<br/><br/>Signature et cachet : ___________________________</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 70,
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
    const exists = await prisma.documentTemplate.findUnique({ where: { code: t.code } });
    if (exists) created++;
  }
  const total = await prisma.documentTemplate.count();
  console.log(`✅ Seed Droit OHADA terminé. Templates traités: ${templates.length} — Total BDD: ${total}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
