import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const COUNTRIES = JSON.stringify(['CI','SN','CM','BJ','TG','BF','ML','GN','CD','CG','GA','NE','TD','MR']);

const templates = [
  {
    code: 'start_pitch_deck_complet',
    name: 'Pitch Deck Startup (Structure complète)',
    category: 'commercial_financier',
    description: 'Structure complète d\'un pitch deck investisseur en 12 slides',
    price: 2000,
    currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_startup', label: 'Nom de la startup', type: 'text', required: true },
      { name: 'secteur', label: 'Secteur d\'activité', type: 'text', required: true },
      { name: 'probleme', label: 'Problème résolu', type: 'textarea', required: true },
      { name: 'solution', label: 'Solution proposée', type: 'textarea', required: true },
      { name: 'marche_cible', label: 'Marché cible et taille', type: 'textarea', required: true },
      { name: 'modele_revenus', label: 'Modèle de revenus', type: 'textarea', required: true },
      { name: 'traction', label: 'Traction / métriques clés', type: 'textarea', required: false },
      { name: 'equipe', label: 'Équipe fondatrice', type: 'textarea', required: true },
      { name: 'montant_leve', label: 'Montant recherché (FCFA)', type: 'text', required: true },
      { name: 'utilisation_fonds', label: 'Utilisation des fonds', type: 'textarea', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:800px;margin:0 auto;padding:20px;">
<div style="background:#1a3c5e;color:white;padding:30px;border-radius:8px;text-align:center;margin-bottom:20px;">
<h1 style="margin:0;font-size:2rem;">{{nom_startup}}</h1>
<p style="margin:8px 0 0;opacity:0.85;">{{secteur}} — Pitch Deck Investisseur</p>
</div>
<div style="display:grid;gap:15px;">
<div style="border:1px solid #ddd;border-radius:6px;padding:15px;"><h3 style="color:#1a3c5e;margin:0 0 8px;">1. Le Problème</h3><p>{{probleme}}</p></div>
<div style="border:1px solid #ddd;border-radius:6px;padding:15px;"><h3 style="color:#1a3c5e;margin:0 0 8px;">2. Notre Solution</h3><p>{{solution}}</p></div>
<div style="border:1px solid #ddd;border-radius:6px;padding:15px;"><h3 style="color:#1a3c5e;margin:0 0 8px;">3. Marché Cible</h3><p>{{marche_cible}}</p></div>
<div style="border:1px solid #ddd;border-radius:6px;padding:15px;"><h3 style="color:#1a3c5e;margin:0 0 8px;">4. Modèle de Revenus</h3><p>{{modele_revenus}}</p></div>
<div style="border:1px solid #ddd;border-radius:6px;padding:15px;"><h3 style="color:#1a3c5e;margin:0 0 8px;">5. Traction</h3><p>{{traction}}</p></div>
<div style="border:1px solid #ddd;border-radius:6px;padding:15px;"><h3 style="color:#1a3c5e;margin:0 0 8px;">6. Équipe</h3><p>{{equipe}}</p></div>
<div style="background:#FFF9C4;border-radius:6px;padding:15px;"><h3 style="color:#1a3c5e;margin:0 0 8px;">7. Levée : {{montant_leve}} FCFA</h3><p>{{utilisation_fonds}}</p></div>
</div></div>`,
    countriesJson: COUNTRIES,
    active: true,
    popularity: 80,
  },

  {
    code: 'start_one_pager',
    name: 'One-Pager Startup',
    category: 'commercial_financier',
    description: 'Résumé exécutif tient sur une page pour présenter rapidement la startup à un investisseur',
    price: 1000,
    currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_startup', label: 'Nom de la startup', type: 'text', required: true },
      { name: 'tagline', label: 'Tagline / accroche', type: 'text', required: true },
      { name: 'probleme', label: 'Problème', type: 'textarea', required: true },
      { name: 'solution', label: 'Solution', type: 'textarea', required: true },
      { name: 'chiffres_cles', label: 'Chiffres clés (ARR, utilisateurs...)', type: 'textarea', required: false },
      { name: 'equipe', label: 'Équipe (noms et rôles)', type: 'textarea', required: true },
      { name: 'contact', label: 'Email / site web', type: 'text', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:24px;border:2px solid #1a3c5e;border-radius:10px;">
<div style="text-align:center;border-bottom:2px solid #1a3c5e;padding-bottom:12px;margin-bottom:16px;">
<h1 style="margin:0;color:#1a3c5e;font-size:1.8rem;">{{nom_startup}}</h1>
<p style="margin:4px 0 0;color:#555;font-style:italic;">{{tagline}}</p>
</div>
<table style="width:100%;border-collapse:collapse;">
<tr><td style="width:50%;padding:8px;vertical-align:top;border-right:1px solid #eee;">
<h3 style="color:#1a3c5e;margin:0 0 6px;font-size:0.9rem;">PROBLÈME</h3><p style="margin:0;font-size:0.85rem;">{{probleme}}</p>
</td><td style="width:50%;padding:8px;vertical-align:top;">
<h3 style="color:#1a3c5e;margin:0 0 6px;font-size:0.9rem;">SOLUTION</h3><p style="margin:0;font-size:0.85rem;">{{solution}}</p>
</td></tr>
<tr><td colspan="2" style="padding:8px;border-top:1px solid #eee;">
<h3 style="color:#1a3c5e;margin:0 0 6px;font-size:0.9rem;">CHIFFRES CLÉS</h3><p style="margin:0;font-size:0.85rem;">{{chiffres_cles}}</p>
</td></tr>
<tr><td colspan="2" style="padding:8px;border-top:1px solid #eee;">
<h3 style="color:#1a3c5e;margin:0 0 6px;font-size:0.9rem;">ÉQUIPE</h3><p style="margin:0;font-size:0.85rem;">{{equipe}}</p>
</td></tr></table>
<p style="text-align:center;margin:12px 0 0;font-size:0.8rem;color:#777;">Contact : {{contact}}</p>
</div>`,
    countriesJson: COUNTRIES,
    active: true,
    popularity: 75,
  },

  {
    code: 'start_business_model_canvas',
    name: 'Business Model Canvas',
    category: 'commercial_financier',
    description: 'Canevas du modèle d\'affaires en 9 blocs selon la méthode Osterwalder',
    price: 1500,
    currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_startup', label: 'Nom de la startup', type: 'text', required: true },
      { name: 'partenaires', label: 'Partenaires clés', type: 'textarea', required: true },
      { name: 'activites', label: 'Activités clés', type: 'textarea', required: true },
      { name: 'ressources', label: 'Ressources clés', type: 'textarea', required: true },
      { name: 'proposition_valeur', label: 'Proposition de valeur', type: 'textarea', required: true },
      { name: 'relation_client', label: 'Relations clients', type: 'textarea', required: true },
      { name: 'canaux', label: 'Canaux de distribution', type: 'textarea', required: true },
      { name: 'segments', label: 'Segments de clientèle', type: 'textarea', required: true },
      { name: 'couts', label: 'Structure de coûts', type: 'textarea', required: true },
      { name: 'revenus', label: 'Sources de revenus', type: 'textarea', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:900px;margin:0 auto;padding:16px;">
<h2 style="text-align:center;color:#1a3c5e;margin-bottom:12px;">Business Model Canvas — {{nom_startup}}</h2>
<table style="width:100%;border-collapse:collapse;font-size:0.8rem;">
<tr style="background:#1a3c5e;color:white;">
<td style="padding:8px;border:1px solid #ccc;width:20%"><b>Partenaires clés</b><br>{{partenaires}}</td>
<td style="padding:8px;border:1px solid #ccc;width:20%"><b>Activités clés</b><br>{{activites}}<hr style="border:none;border-top:1px solid rgba(255,255,255,0.3)"><b>Ressources clés</b><br>{{ressources}}</td>
<td style="padding:8px;border:1px solid #ccc;background:#e8f0fe;color:#1a3c5e;width:20%"><b>Proposition de valeur</b><br>{{proposition_valeur}}</td>
<td style="padding:8px;border:1px solid #ccc;width:20%"><b>Relations clients</b><br>{{relation_client}}<hr style="border:none;border-top:1px solid rgba(255,255,255,0.3)"><b>Canaux</b><br>{{canaux}}</td>
<td style="padding:8px;border:1px solid #ccc;width:20%"><b>Segments clients</b><br>{{segments}}</td>
</tr>
<tr>
<td colspan="2" style="padding:8px;border:1px solid #ccc;background:#fff3e0;"><b>Structure de coûts</b><br>{{couts}}</td>
<td></td>
<td colspan="2" style="padding:8px;border:1px solid #ccc;background:#e8f5e9;"><b>Sources de revenus</b><br>{{revenus}}</td>
</tr></table></div>`,
    countriesJson: COUNTRIES,
    active: true,
    popularity: 72,
  },

  {
    code: 'start_lean_canvas',
    name: 'Lean Canvas Startup',
    category: 'commercial_financier',
    description: 'Lean Canvas adapté aux startups en phase early-stage selon la méthode Ash Maurya',
    price: 1500,
    currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_startup', label: 'Nom de la startup', type: 'text', required: true },
      { name: 'probleme', label: 'Problème (top 3)', type: 'textarea', required: true },
      { name: 'solution', label: 'Solution (top 3 features)', type: 'textarea', required: true },
      { name: 'metrique_cle', label: 'Métriques clés', type: 'textarea', required: true },
      { name: 'avantage_inimitable', label: 'Avantage concurrentiel inimitable', type: 'textarea', required: true },
      { name: 'canaux', label: 'Canaux d\'acquisition', type: 'textarea', required: true },
      { name: 'segments', label: 'Segments cibles (early adopters)', type: 'textarea', required: true },
      { name: 'couts', label: 'Structure de coûts', type: 'textarea', required: true },
      { name: 'revenus', label: 'Flux de revenus', type: 'textarea', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:900px;margin:0 auto;padding:16px;">
<h2 style="text-align:center;color:#2e7d32;margin-bottom:12px;">Lean Canvas — {{nom_startup}}</h2>
<table style="width:100%;border-collapse:collapse;font-size:0.82rem;">
<tr>
<td style="padding:10px;border:2px solid #2e7d32;width:20%;vertical-align:top;"><b style="color:#2e7d32;">Problème</b><br>{{probleme}}</td>
<td style="padding:10px;border:2px solid #2e7d32;width:20%;vertical-align:top;"><b style="color:#2e7d32;">Solution</b><br>{{solution}}<br><br><b style="color:#2e7d32;">Métriques clés</b><br>{{metrique_cle}}</td>
<td style="padding:10px;border:2px solid #2e7d32;background:#f1f8e9;width:20%;vertical-align:top;"><b style="color:#2e7d32;">Avantage inimitable</b><br>{{avantage_inimitable}}</td>
<td style="padding:10px;border:2px solid #2e7d32;width:20%;vertical-align:top;"><b style="color:#2e7d32;">Canaux</b><br>{{canaux}}</td>
<td style="padding:10px;border:2px solid #2e7d32;width:20%;vertical-align:top;"><b style="color:#2e7d32;">Segments cibles</b><br>{{segments}}</td>
</tr>
<tr>
<td colspan="2" style="padding:10px;border:2px solid #2e7d32;background:#fff8e1;vertical-align:top;"><b style="color:#2e7d32;">Coûts</b><br>{{couts}}</td>
<td></td>
<td colspan="2" style="padding:10px;border:2px solid #2e7d32;background:#e8f5e9;vertical-align:top;"><b style="color:#2e7d32;">Revenus</b><br>{{revenus}}</td>
</tr></table></div>`,
    countriesJson: COUNTRIES,
    active: true,
    popularity: 68,
  },

  {
    code: 'start_lettre_intention_invest',
    name: 'Lettre d\'Intention Investisseur (LOI)',
    category: 'juridique_admin',
    description: 'Lettre d\'intention non contraignante d\'un investisseur pour une prise de participation dans une startup',
    price: 3000,
    currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_investisseur', label: 'Nom / raison sociale investisseur', type: 'text', required: true },
      { name: 'nom_startup', label: 'Nom de la startup', type: 'text', required: true },
      { name: 'montant_invest', label: 'Montant envisagé (FCFA)', type: 'text', required: true },
      { name: 'participation', label: 'Participation envisagée (%)', type: 'text', required: true },
      { name: 'valorisation', label: 'Valorisation pre-money (FCFA)', type: 'text', required: true },
      { name: 'conditions', label: 'Conditions suspensives principales', type: 'textarea', required: true },
      { name: 'date_validite', label: 'Date de validité de l\'offre', type: 'date', required: true },
      { name: 'lieu', label: 'Lieu', type: 'text', required: true },
      { name: 'date_doc', label: 'Date du document', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Georgia,serif;max-width:750px;margin:0 auto;padding:30px;">
<p style="text-align:right;color:#555;">{{lieu}}, le {{date_doc}}</p>
<h2 style="color:#1a3c5e;border-bottom:2px solid #1a3c5e;padding-bottom:8px;">LETTRE D'INTENTION D'INVESTISSEMENT</h2>
<p><b>Investisseur :</b> {{nom_investisseur}}<br><b>Startup :</b> {{nom_startup}}</p>
<p>Nous avons le plaisir de vous faire part de notre intention d'investir dans <b>{{nom_startup}}</b> selon les modalités suivantes :</p>
<table style="width:100%;border-collapse:collapse;margin:16px 0;">
<tr style="background:#f0f4f8;"><td style="padding:8px;border:1px solid #ccc;font-weight:bold;">Montant de l'investissement</td><td style="padding:8px;border:1px solid #ccc;">{{montant_invest}} FCFA</td></tr>
<tr><td style="padding:8px;border:1px solid #ccc;font-weight:bold;">Participation visée</td><td style="padding:8px;border:1px solid #ccc;">{{participation}} %</td></tr>
<tr style="background:#f0f4f8;"><td style="padding:8px;border:1px solid #ccc;font-weight:bold;">Valorisation pre-money</td><td style="padding:8px;border:1px solid #ccc;">{{valorisation}} FCFA</td></tr>
</table>
<p><b>Conditions suspensives :</b> {{conditions}}</p>
<p>La présente lettre est valide jusqu'au <b>{{date_validite}}</b>. Elle ne constitue pas un engagement ferme et définitif.</p>
<div style="margin-top:40px;"><p>Signature investisseur :</p><p style="border-top:1px solid #333;width:200px;margin-top:40px;">{{nom_investisseur}}</p></div>
</div>`,
    countriesJson: COUNTRIES,
    active: true,
    popularity: 70,
  },

  {
    code: 'start_pacte_fondateurs',
    name: 'Pacte entre Co-Fondateurs',
    category: 'juridique_admin',
    description: 'Accord fondateur régissant les droits, obligations et modalités de sortie entre co-fondateurs d\'une startup',
    price: 4500,
    currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_startup', label: 'Nom de la startup', type: 'text', required: true },
      { name: 'fondateurs', label: 'Liste des fondateurs (nom, rôle, % parts)', type: 'textarea', required: true },
      { name: 'missions', label: 'Missions et responsabilités de chacun', type: 'textarea', required: true },
      { name: 'vesting', label: 'Période de vesting (mois)', type: 'text', required: true },
      { name: 'clause_bad_leaver', label: 'Clause Bad Leaver', type: 'textarea', required: true },
      { name: 'decisions_unanimes', label: 'Décisions requérant l\'unanimité', type: 'textarea', required: true },
      { name: 'lieu', label: 'Lieu de signature', type: 'text', required: true },
      { name: 'date_doc', label: 'Date', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Georgia,serif;max-width:750px;margin:0 auto;padding:30px;">
<h2 style="color:#1a3c5e;text-align:center;border-bottom:2px solid #1a3c5e;padding-bottom:10px;">PACTE ENTRE CO-FONDATEURS<br><small style="font-size:0.7em;">{{nom_startup}}</small></h2>
<p style="text-align:center;color:#555;">Fait à {{lieu}}, le {{date_doc}}</p>
<h3 style="color:#1a3c5e;">1. Parties et Répartition du Capital</h3>
<p>{{fondateurs}}</p>
<h3 style="color:#1a3c5e;">2. Missions et Responsabilités</h3>
<p>{{missions}}</p>
<h3 style="color:#1a3c5e;">3. Vesting — Période : {{vesting}} mois</h3>
<p>Les parts de chaque fondateur sont acquises progressivement sur la période de vesting définie ci-dessus. En cas de départ anticipé, les parts non vestées sont rachetées à valeur nominale.</p>
<h3 style="color:#1a3c5e;">4. Clause Bad Leaver</h3>
<p>{{clause_bad_leaver}}</p>
<h3 style="color:#1a3c5e;">5. Décisions Unanimes</h3>
<p>{{decisions_unanimes}}</p>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:30px;margin-top:40px;font-size:0.85rem;">
<div style="border-top:1px solid #333;padding-top:8px;">Signature Fondateur 1</div>
<div style="border-top:1px solid #333;padding-top:8px;">Signature Fondateur 2</div>
</div></div>`,
    countriesJson: COUNTRIES,
    active: true,
    popularity: 65,
  },

  {
    code: 'start_contrat_vesting',
    name: 'Contrat de Vesting Fondateurs',
    category: 'juridique_admin',
    description: 'Contrat d\'acquisition progressive des actions des fondateurs avec cliff et période de vesting',
    price: 3500,
    currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_startup', label: 'Nom de la société', type: 'text', required: true },
      { name: 'nom_fondateur', label: 'Nom du fondateur bénéficiaire', type: 'text', required: true },
      { name: 'nb_actions', label: 'Nombre total d\'actions soumises au vesting', type: 'text', required: true },
      { name: 'cliff', label: 'Durée du cliff (mois)', type: 'text', required: true },
      { name: 'periode_vesting', label: 'Durée totale du vesting (mois)', type: 'text', required: true },
      { name: 'date_debut', label: 'Date de début du vesting', type: 'date', required: true },
      { name: 'lieu', label: 'Lieu', type: 'text', required: true },
      { name: 'date_doc', label: 'Date du contrat', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Georgia,serif;max-width:750px;margin:0 auto;padding:30px;">
<h2 style="color:#1a3c5e;text-align:center;">CONTRAT DE VESTING D'ACTIONS</h2>
<p style="text-align:center;color:#555;">{{nom_startup}} — {{lieu}}, le {{date_doc}}</p>
<p><b>Bénéficiaire :</b> {{nom_fondateur}}</p>
<table style="width:100%;border-collapse:collapse;margin:16px 0;">
<tr style="background:#f0f4f8;"><td style="padding:8px;border:1px solid #ccc;font-weight:bold;">Actions soumises au vesting</td><td style="padding:8px;border:1px solid #ccc;">{{nb_actions}}</td></tr>
<tr><td style="padding:8px;border:1px solid #ccc;font-weight:bold;">Cliff</td><td style="padding:8px;border:1px solid #ccc;">{{cliff}} mois</td></tr>
<tr style="background:#f0f4f8;"><td style="padding:8px;border:1px solid #ccc;font-weight:bold;">Période de vesting</td><td style="padding:8px;border:1px solid #ccc;">{{periode_vesting}} mois</td></tr>
<tr><td style="padding:8px;border:1px solid #ccc;font-weight:bold;">Date de début</td><td style="padding:8px;border:1px solid #ccc;">{{date_debut}}</td></tr>
</table>
<p>À l'issue du cliff de <b>{{cliff}} mois</b>, 25 % des actions seront acquises. Les 75 % restants seront acquis mensuellement sur les mois suivants jusqu'à la fin de la période de <b>{{periode_vesting}} mois</b>.</p>
<p>En cas de départ volontaire avant la fin du vesting, les actions non acquises seront rachetées à leur valeur nominale par la société.</p>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:40px;margin-top:40px;">
<div style="border-top:1px solid #333;padding-top:8px;">La Société — {{nom_startup}}</div>
<div style="border-top:1px solid #333;padding-top:8px;">Le Bénéficiaire — {{nom_fondateur}}</div>
</div></div>`,
    countriesJson: COUNTRIES,
    active: true,
    popularity: 62,
  },

  {
    code: 'start_accord_investisseur_angel',
    name: 'Accord Investisseur Angel',
    category: 'juridique_admin',
    description: 'Convention d\'investissement entre une startup et un business angel pour une prise de participation',
    price: 5000,
    currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_startup', label: 'Nom de la startup', type: 'text', required: true },
      { name: 'nom_angel', label: 'Nom de l\'investisseur angel', type: 'text', required: true },
      { name: 'montant', label: 'Montant investi (FCFA)', type: 'text', required: true },
      { name: 'participation', label: 'Parts cédées (%)', type: 'text', required: true },
      { name: 'valorisation', label: 'Valorisation pre-money (FCFA)', type: 'text', required: true },
      { name: 'droits_info', label: 'Droits d\'information de l\'investisseur', type: 'textarea', required: true },
      { name: 'droit_preemption', label: 'Droit de préemption', type: 'textarea', required: false },
      { name: 'lieu', label: 'Lieu', type: 'text', required: true },
      { name: 'date_doc', label: 'Date', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Georgia,serif;max-width:750px;margin:0 auto;padding:30px;">
<h2 style="color:#1a3c5e;text-align:center;">ACCORD D'INVESTISSEMENT ANGEL</h2>
<p style="text-align:center;color:#555;">{{lieu}}, le {{date_doc}}</p>
<p><b>Entre</b> {{nom_startup}} (la « Société ») <b>et</b> {{nom_angel}} (l'« Investisseur »)</p>
<h3 style="color:#1a3c5e;">1. Investissement</h3>
<p>L'Investisseur s'engage à apporter la somme de <b>{{montant}} FCFA</b> en échange de <b>{{participation}}%</b> du capital social, sur la base d'une valorisation pre-money de <b>{{valorisation}} FCFA</b>.</p>
<h3 style="color:#1a3c5e;">2. Droits d'Information</h3>
<p>{{droits_info}}</p>
<h3 style="color:#1a3c5e;">3. Droit de Préemption</h3>
<p>{{droit_preemption}}</p>
<h3 style="color:#1a3c5e;">4. Confidentialité</h3>
<p>Les parties s'engagent à maintenir la confidentialité de toutes informations échangées dans le cadre du présent accord.</p>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:40px;margin-top:40px;">
<div style="border-top:1px solid #333;padding-top:8px;">La Société — {{nom_startup}}</div>
<div style="border-top:1px solid #333;padding-top:8px;">L'Investisseur — {{nom_angel}}</div>
</div></div>`,
    countriesJson: COUNTRIES,
    active: true,
    popularity: 60,
  },

  {
    code: 'start_due_diligence_checklist',
    name: 'Checklist Due Diligence Startup',
    category: 'commercial_financier',
    description: 'Liste de contrôle complète pour la due diligence d\'un investisseur avant prise de participation',
    price: 2500,
    currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_startup', label: 'Nom de la startup', type: 'text', required: true },
      { name: 'nom_investisseur', label: 'Nom de l\'investisseur / cabinet', type: 'text', required: true },
      { name: 'date_debut_dd', label: 'Date de début de la due diligence', type: 'date', required: true },
      { name: 'interlocuteur', label: 'Interlocuteur startup', type: 'text', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:800px;margin:0 auto;padding:24px;">
<h2 style="color:#1a3c5e;border-bottom:2px solid #1a3c5e;padding-bottom:8px;">CHECKLIST DUE DILIGENCE — {{nom_startup}}</h2>
<p style="color:#555;">Investisseur : {{nom_investisseur}} | Début : {{date_debut_dd}} | Interlocuteur : {{interlocuteur}}</p>
<table style="width:100%;border-collapse:collapse;margin-top:16px;font-size:0.85rem;">
<tr style="background:#1a3c5e;color:white;"><th style="padding:8px;text-align:left;">Domaine</th><th style="padding:8px;text-align:left;">Documents requis</th><th style="padding:8px;text-align:center;width:80px;">Statut</th></tr>
<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Juridique</td><td style="padding:8px;border:1px solid #ddd;">Statuts, K-bis/RCCM, pacte fondateurs, registre des mouvements</td><td style="padding:8px;border:1px solid #ddd;text-align:center;">☐</td></tr>
<tr style="background:#f9f9f9;"><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Financier</td><td style="padding:8px;border:1px solid #ddd;">Bilans 3 ans, comptes de résultat, prévisionnel 3 ans, tableaux de trésorerie</td><td style="padding:8px;border:1px solid #ddd;text-align:center;">☐</td></tr>
<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Commercial</td><td style="padding:8px;border:1px solid #ddd;">Pipeline, contrats clients, lettres d'intention, métriques (MRR/ARR/churn)</td><td style="padding:8px;border:1px solid #ddd;text-align:center;">☐</td></tr>
<tr style="background:#f9f9f9;"><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Propriété intellectuelle</td><td style="padding:8px;border:1px solid #ddd;">Brevets, marques, cessions PI fondateurs, code source</td><td style="padding:8px;border:1px solid #ddd;text-align:center;">☐</td></tr>
<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">RH</td><td style="padding:8px;border:1px solid #ddd;">Contrats de travail, organigramme, politique de vesting</td><td style="padding:8px;border:1px solid #ddd;text-align:center;">☐</td></tr>
<tr style="background:#f9f9f9;"><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Réglementaire</td><td style="padding:8px;border:1px solid #ddd;">Licences, conformité RGPD/données, contentieux en cours</td><td style="padding:8px;border:1px solid #ddd;text-align:center;">☐</td></tr>
</table></div>`,
    countriesJson: COUNTRIES,
    active: true,
    popularity: 58,
  },

  {
    code: 'start_nda_investisseur',
    name: 'NDA Levée de Fonds (Accord de Confidentialité)',
    category: 'juridique_admin',
    description: 'Accord de non-divulgation entre une startup et un investisseur potentiel lors d\'une levée de fonds',
    price: 1500,
    currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_startup', label: 'Nom de la startup', type: 'text', required: true },
      { name: 'nom_investisseur', label: 'Nom / société investisseur', type: 'text', required: true },
      { name: 'duree_confidentialite', label: 'Durée de la confidentialité (années)', type: 'text', required: true },
      { name: 'objet_partage', label: 'Informations couvertes par le NDA', type: 'textarea', required: true },
      { name: 'lieu', label: 'Lieu', type: 'text', required: true },
      { name: 'date_doc', label: 'Date', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Georgia,serif;max-width:750px;margin:0 auto;padding:30px;">
<h2 style="color:#1a3c5e;text-align:center;">ACCORD DE CONFIDENTIALITÉ (NDA)</h2>
<p style="text-align:center;font-style:italic;">Dans le cadre d'une potentielle levée de fonds</p>
<p style="text-align:center;color:#555;">{{lieu}}, le {{date_doc}}</p>
<p><b>Entre :</b> {{nom_startup}} (la « Startup ») <b>et</b> {{nom_investisseur}} (l'« Investisseur »)</p>
<h3 style="color:#1a3c5e;">Article 1 — Objet</h3>
<p>Dans le cadre de discussions préliminaires en vue d'un éventuel investissement, les parties reconnaissent que des informations confidentielles seront échangées, notamment : {{objet_partage}}</p>
<h3 style="color:#1a3c5e;">Article 2 — Obligations de Confidentialité</h3>
<p>L'Investisseur s'engage à ne pas divulguer, communiquer ou utiliser les informations confidentielles à des fins autres que l'évaluation de l'opportunité d'investissement, pendant une durée de <b>{{duree_confidentialite}} an(s)</b>.</p>
<h3 style="color:#1a3c5e;">Article 3 — Exceptions</h3>
<p>Sont exclues les informations déjà publiques ou connues de l'Investisseur antérieurement, et celles dont la divulgation est imposée par la loi.</p>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:40px;margin-top:40px;">
<div style="border-top:1px solid #333;padding-top:8px;">{{nom_startup}}</div>
<div style="border-top:1px solid #333;padding-top:8px;">{{nom_investisseur}}</div>
</div></div>`,
    countriesJson: COUNTRIES,
    active: true,
    popularity: 66,
  },

  {
    code: 'start_reporting_investisseur',
    name: 'Rapport Investisseur Mensuel',
    category: 'commercial_financier',
    description: 'Rapport mensuel de suivi à destination des investisseurs : KPIs, trésorerie, highlights et next steps',
    price: 1500,
    currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_startup', label: 'Nom de la startup', type: 'text', required: true },
      { name: 'mois_rapport', label: 'Mois du rapport (ex: Juin 2025)', type: 'text', required: true },
      { name: 'mrr', label: 'MRR (FCFA)', type: 'text', required: false },
      { name: 'nb_clients', label: 'Nombre de clients actifs', type: 'text', required: false },
      { name: 'tresorerie', label: 'Trésorerie disponible (FCFA)', type: 'text', required: true },
      { name: 'runway', label: 'Runway estimé (mois)', type: 'text', required: true },
      { name: 'highlights', label: 'Points positifs du mois', type: 'textarea', required: true },
      { name: 'challenges', label: 'Défis et blocages', type: 'textarea', required: true },
      { name: 'next_steps', label: 'Prochaines étapes', type: 'textarea', required: true },
      { name: 'besoin_support', label: 'Besoin de support investisseur', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<div style="background:#1a3c5e;color:white;padding:16px 20px;border-radius:8px;margin-bottom:20px;display:flex;justify-content:space-between;align-items:center;">
<h2 style="margin:0;">{{nom_startup}}</h2><span style="opacity:0.8;">Rapport Investisseur — {{mois_rapport}}</span>
</div>
<div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:12px;margin-bottom:20px;">
<div style="background:#e8f0fe;border-radius:6px;padding:12px;text-align:center;"><div style="font-size:1.4rem;font-weight:bold;color:#1a3c5e;">{{mrr}}</div><div style="font-size:0.75rem;color:#555;">MRR (FCFA)</div></div>
<div style="background:#e8f5e9;border-radius:6px;padding:12px;text-align:center;"><div style="font-size:1.4rem;font-weight:bold;color:#2e7d32;">{{nb_clients}}</div><div style="font-size:0.75rem;color:#555;">Clients actifs</div></div>
<div style="background:#fff3e0;border-radius:6px;padding:12px;text-align:center;"><div style="font-size:1.4rem;font-weight:bold;color:#e65100;">{{tresorerie}}</div><div style="font-size:0.75rem;color:#555;">Trésorerie (FCFA)</div></div>
<div style="background:#fce4ec;border-radius:6px;padding:12px;text-align:center;"><div style="font-size:1.4rem;font-weight:bold;color:#b71c1c;">{{runway}} mois</div><div style="font-size:0.75rem;color:#555;">Runway</div></div>
</div>
<div style="border-left:4px solid #4caf50;padding:10px 14px;margin-bottom:12px;background:#f9fbe7;"><b>Points positifs</b><br>{{highlights}}</div>
<div style="border-left:4px solid #f44336;padding:10px 14px;margin-bottom:12px;background:#fff8f8;"><b>Défis</b><br>{{challenges}}</div>
<div style="border-left:4px solid #2196f3;padding:10px 14px;margin-bottom:12px;background:#f0f8ff;"><b>Prochaines étapes</b><br>{{next_steps}}</div>
<div style="border-left:4px solid #ff9800;padding:10px 14px;background:#fffde7;"><b>Support investisseur souhaité</b><br>{{besoin_support}}</div>
</div>`,
    countriesJson: COUNTRIES,
    active: true,
    popularity: 63,
  },

  {
    code: 'start_plan_embauche',
    name: 'Plan de Recrutement Startup',
    category: 'commercial_financier',
    description: 'Plan de recrutement structuré pour une startup en phase de croissance post-levée',
    price: 1500,
    currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_startup', label: 'Nom de la startup', type: 'text', required: true },
      { name: 'periode', label: 'Période couverte (ex: S1 2025)', type: 'text', required: true },
      { name: 'budget_rh', label: 'Budget RH alloué (FCFA)', type: 'text', required: true },
      { name: 'postes_prioritaires', label: 'Postes prioritaires (intitulé + trimestre)', type: 'textarea', required: true },
      { name: 'profils_recherches', label: 'Profils et compétences recherchés', type: 'textarea', required: true },
      { name: 'canaux_recrutement', label: 'Canaux de recrutement envisagés', type: 'textarea', required: false },
      { name: 'politique_remuneration', label: 'Politique de rémunération + equity', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h2 style="color:#1a3c5e;border-bottom:2px solid #1a3c5e;padding-bottom:8px;">PLAN DE RECRUTEMENT — {{nom_startup}}</h2>
<p><b>Période :</b> {{periode}} | <b>Budget RH :</b> {{budget_rh}} FCFA</p>
<h3 style="color:#1a3c5e;">Postes Prioritaires</h3>
<div style="background:#f0f4f8;border-radius:6px;padding:14px;white-space:pre-line;">{{postes_prioritaires}}</div>
<h3 style="color:#1a3c5e;">Profils Recherchés</h3>
<p>{{profils_recherches}}</p>
<h3 style="color:#1a3c5e;">Canaux de Recrutement</h3>
<p>{{canaux_recrutement}}</p>
<h3 style="color:#1a3c5e;">Politique de Rémunération</h3>
<p>{{politique_remuneration}}</p>
<div style="background:#FFF9C4;border-radius:6px;padding:12px;margin-top:16px;font-size:0.85rem;">
<b>Rappel :</b> Tout recrutement au-delà du budget validé nécessite l'approbation du board.
</div></div>`,
    countriesJson: COUNTRIES,
    active: true,
    popularity: 55,
  },

  {
    code: 'start_convention_incubateur',
    name: 'Convention Hébergement Incubateur',
    category: 'juridique_admin',
    description: 'Convention d\'accueil et d\'hébergement entre un incubateur/accélérateur et une startup sélectionnée',
    price: 2000,
    currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_incubateur', label: 'Nom de l\'incubateur / accélérateur', type: 'text', required: true },
      { name: 'nom_startup', label: 'Nom de la startup', type: 'text', required: true },
      { name: 'duree_programme', label: 'Durée du programme (mois)', type: 'text', required: true },
      { name: 'date_debut', label: 'Date de début', type: 'date', required: true },
      { name: 'services_fournis', label: 'Services et ressources fournis', type: 'textarea', required: true },
      { name: 'contreparties', label: 'Contreparties de la startup (equity, frais...)', type: 'textarea', required: true },
      { name: 'engagements_startup', label: 'Engagements de la startup', type: 'textarea', required: true },
      { name: 'lieu', label: 'Lieu', type: 'text', required: true },
      { name: 'date_doc', label: 'Date', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Georgia,serif;max-width:750px;margin:0 auto;padding:30px;">
<h2 style="color:#1a3c5e;text-align:center;">CONVENTION D'HÉBERGEMENT EN INCUBATEUR</h2>
<p style="text-align:center;color:#555;">{{lieu}}, le {{date_doc}}</p>
<p><b>Entre :</b> {{nom_incubateur}} (l'« Incubateur ») <b>et</b> {{nom_startup}} (la « Startup »)</p>
<h3 style="color:#1a3c5e;">Article 1 — Objet et Durée</h3>
<p>La présente convention formalise l'accueil de {{nom_startup}} au sein de {{nom_incubateur}} pour une durée de <b>{{duree_programme}} mois</b> à compter du {{date_debut}}.</p>
<h3 style="color:#1a3c5e;">Article 2 — Services Fournis par l'Incubateur</h3>
<p>{{services_fournis}}</p>
<h3 style="color:#1a3c5e;">Article 3 — Contreparties</h3>
<p>{{contreparties}}</p>
<h3 style="color:#1a3c5e;">Article 4 — Engagements de la Startup</h3>
<p>{{engagements_startup}}</p>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:40px;margin-top:40px;">
<div style="border-top:1px solid #333;padding-top:8px;">{{nom_incubateur}}</div>
<div style="border-top:1px solid #333;padding-top:8px;">{{nom_startup}}</div>
</div></div>`,
    countriesJson: COUNTRIES,
    active: true,
    popularity: 52,
  },

  {
    code: 'start_accord_pilote',
    name: 'Accord Pilote / POC Client',
    category: 'commercial_financier',
    description: 'Accord de pilotage ou preuve de concept (POC) entre une startup et un client corporatif',
    price: 2500,
    currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_startup', label: 'Nom de la startup', type: 'text', required: true },
      { name: 'nom_client', label: 'Nom du client / entreprise', type: 'text', required: true },
      { name: 'objet_poc', label: 'Objet et périmètre du pilote', type: 'textarea', required: true },
      { name: 'duree_poc', label: 'Durée du pilote (semaines)', type: 'text', required: true },
      { name: 'kpis_succes', label: 'KPIs et critères de succès', type: 'textarea', required: true },
      { name: 'prix_poc', label: 'Prix du pilote (FCFA / gratuit)', type: 'text', required: true },
      { name: 'conditions_suite', label: 'Conditions pour déploiement complet', type: 'textarea', required: false },
      { name: 'lieu', label: 'Lieu', type: 'text', required: true },
      { name: 'date_doc', label: 'Date', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Georgia,serif;max-width:750px;margin:0 auto;padding:30px;">
<h2 style="color:#1a3c5e;text-align:center;">ACCORD DE PILOTE / PREUVE DE CONCEPT (POC)</h2>
<p style="text-align:center;color:#555;">{{lieu}}, le {{date_doc}}</p>
<p><b>Entre :</b> {{nom_startup}} (le « Fournisseur ») <b>et</b> {{nom_client}} (le « Client »)</p>
<h3 style="color:#1a3c5e;">1. Objet du Pilote</h3>
<p>{{objet_poc}}</p>
<h3 style="color:#1a3c5e;">2. Durée : {{duree_poc}} semaines</h3>
<p>Le pilote démarrera à la signature du présent accord et se poursuivra pendant {{duree_poc}} semaines.</p>
<h3 style="color:#1a3c5e;">3. KPIs et Critères de Succès</h3>
<p>{{kpis_succes}}</p>
<h3 style="color:#1a3c5e;">4. Conditions Financières</h3>
<p>Coût du pilote : <b>{{prix_poc}}</b></p>
<h3 style="color:#1a3c5e;">5. Suite Éventuelle</h3>
<p>{{conditions_suite}}</p>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:40px;margin-top:40px;">
<div style="border-top:1px solid #333;padding-top:8px;">{{nom_startup}}</div>
<div style="border-top:1px solid #333;padding-top:8px;">{{nom_client}}</div>
</div></div>`,
    countriesJson: COUNTRIES,
    active: true,
    popularity: 60,
  },

  {
    code: 'start_contrat_revendeur',
    name: 'Contrat Revendeur / Intégrateur',
    category: 'commercial_financier',
    description: 'Contrat de distribution et d\'intégration entre une startup SaaS et un partenaire revendeur',
    price: 3500,
    currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_startup', label: 'Nom de la startup (éditeur)', type: 'text', required: true },
      { name: 'nom_revendeur', label: 'Nom du revendeur / intégrateur', type: 'text', required: true },
      { name: 'territoire', label: 'Territoire de distribution', type: 'text', required: true },
      { name: 'produits', label: 'Produits / services concernés', type: 'textarea', required: true },
      { name: 'commission', label: 'Commission revendeur (%)', type: 'text', required: true },
      { name: 'objectifs_vente', label: 'Objectifs de vente minimaux', type: 'textarea', required: false },
      { name: 'duree_contrat', label: 'Durée du contrat (mois)', type: 'text', required: true },
      { name: 'lieu', label: 'Lieu', type: 'text', required: true },
      { name: 'date_doc', label: 'Date', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Georgia,serif;max-width:750px;margin:0 auto;padding:30px;">
<h2 style="color:#1a3c5e;text-align:center;">CONTRAT DE REVENDEUR / INTÉGRATEUR</h2>
<p style="text-align:center;color:#555;">{{lieu}}, le {{date_doc}}</p>
<p><b>Éditeur :</b> {{nom_startup}} | <b>Revendeur :</b> {{nom_revendeur}}</p>
<h3 style="color:#1a3c5e;">1. Objet et Territoire</h3>
<p>L'Éditeur confère au Revendeur le droit non-exclusif de distribuer les produits suivants : {{produits}} sur le territoire : <b>{{territoire}}</b>.</p>
<h3 style="color:#1a3c5e;">2. Conditions Financières</h3>
<p>Commission revendeur : <b>{{commission}}%</b> sur toute vente réalisée. Paiement à 30 jours après encaissement.</p>
<h3 style="color:#1a3c5e;">3. Objectifs de Vente</h3>
<p>{{objectifs_vente}}</p>
<h3 style="color:#1a3c5e;">4. Durée : {{duree_contrat}} mois</h3>
<p>Renouvelable par tacite reconduction, sauf résiliation avec préavis de 30 jours.</p>
<h3 style="color:#1a3c5e;">5. Obligations du Revendeur</h3>
<p>Formation aux produits obligatoire. Respect de la charte de communication de l'Éditeur. Interdiction de modifier le produit sans accord écrit.</p>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:40px;margin-top:40px;">
<div style="border-top:1px solid #333;padding-top:8px;">{{nom_startup}} (Éditeur)</div>
<div style="border-top:1px solid #333;padding-top:8px;">{{nom_revendeur}} (Revendeur)</div>
</div></div>`,
    countriesJson: COUNTRIES,
    active: true,
    popularity: 57,
  },

  {
    code: 'start_marque_depose',
    name: 'Dossier Dépôt de Marque (OAPI)',
    category: 'juridique_admin',
    description: 'Dossier de dépôt de marque auprès de l\'OAPI pour les pays membres de l\'Organisation Africaine de la Propriété Intellectuelle',
    price: 3000,
    currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_marque', label: 'Nom de la marque à déposer', type: 'text', required: true },
      { name: 'deposant', label: 'Déposant (nom / société)', type: 'text', required: true },
      { name: 'pays_deposant', label: 'Pays du déposant', type: 'text', required: true },
      { name: 'classes_nice', label: 'Classes Nice (ex: 35, 42)', type: 'text', required: true },
      { name: 'description_produits', label: 'Description des produits/services couverts', type: 'textarea', required: true },
      { name: 'pays_designation', label: 'Pays OAPI désignés', type: 'textarea', required: true },
      { name: 'date_doc', label: 'Date de la demande', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<div style="background:#1a3c5e;color:white;padding:16px;text-align:center;border-radius:8px;margin-bottom:20px;">
<h2 style="margin:0;">DEMANDE DE DÉPÔT DE MARQUE — OAPI</h2>
<p style="margin:4px 0 0;opacity:0.8;">Organisation Africaine de la Propriété Intellectuelle</p>
</div>
<table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;width:40%">Marque</td><td style="padding:8px;border:1px solid #ddd;font-size:1.1rem;color:#1a3c5e;font-weight:bold;">{{nom_marque}}</td></tr>
<tr style="background:#f9f9f9;"><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Déposant</td><td style="padding:8px;border:1px solid #ddd;">{{deposant}} — {{pays_deposant}}</td></tr>
<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Classes Nice</td><td style="padding:8px;border:1px solid #ddd;">{{classes_nice}}</td></tr>
<tr style="background:#f9f9f9;"><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Date de dépôt</td><td style="padding:8px;border:1px solid #ddd;">{{date_doc}}</td></tr>
</table>
<h3 style="color:#1a3c5e;">Produits et Services Couverts</h3>
<p>{{description_produits}}</p>
<h3 style="color:#1a3c5e;">Pays OAPI Désignés</h3>
<p>{{pays_designation}}</p>
<div style="background:#FFF9C4;padding:10px;border-radius:6px;font-size:0.82rem;margin-top:16px;">Note : Le dépôt doit être accompagné du justificatif de paiement des taxes OAPI et d'une représentation graphique de la marque.</div>
</div>`,
    countriesJson: COUNTRIES,
    active: true,
    popularity: 50,
  },

  {
    code: 'start_accord_cession_pi',
    name: 'Cession PI Fondateur → Société',
    category: 'juridique_admin',
    description: 'Accord de cession de propriété intellectuelle d\'un fondateur au profit de la société qu\'il a créée',
    price: 3000,
    currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_startup', label: 'Nom de la société cessionnaire', type: 'text', required: true },
      { name: 'nom_fondateur', label: 'Nom du fondateur cédant', type: 'text', required: true },
      { name: 'description_pi', label: 'Description des créations / PI cédées', type: 'textarea', required: true },
      { name: 'prix_cession', label: 'Prix de cession (FCFA ou symbolique)', type: 'text', required: true },
      { name: 'garanties', label: 'Garanties du cédant (originalité, non-contrefaçon)', type: 'textarea', required: false },
      { name: 'lieu', label: 'Lieu', type: 'text', required: true },
      { name: 'date_doc', label: 'Date', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Georgia,serif;max-width:750px;margin:0 auto;padding:30px;">
<h2 style="color:#1a3c5e;text-align:center;">ACCORD DE CESSION DE PROPRIÉTÉ INTELLECTUELLE</h2>
<p style="text-align:center;color:#555;">{{lieu}}, le {{date_doc}}</p>
<p><b>Cédant :</b> {{nom_fondateur}}<br><b>Cessionnaire :</b> {{nom_startup}}</p>
<h3 style="color:#1a3c5e;">Article 1 — Objet de la Cession</h3>
<p>Le Cédant transfère à titre définitif et exclusif à la Société les droits de propriété intellectuelle afférents aux éléments suivants : {{description_pi}}</p>
<h3 style="color:#1a3c5e;">Article 2 — Étendue de la Cession</h3>
<p>La cession porte sur tous droits patrimoniaux d'auteur et droits de propriété industrielle, pour le monde entier et pour toute la durée légale de protection.</p>
<h3 style="color:#1a3c5e;">Article 3 — Prix</h3>
<p>En contrepartie, la Société versera la somme de <b>{{prix_cession}} FCFA</b> au Cédant.</p>
<h3 style="color:#1a3c5e;">Article 4 — Garanties</h3>
<p>{{garanties}}</p>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:40px;margin-top:40px;">
<div style="border-top:1px solid #333;padding-top:8px;">{{nom_fondateur}} (Cédant)</div>
<div style="border-top:1px solid #333;padding-top:8px;">{{nom_startup}} (Cessionnaire)</div>
</div></div>`,
    countriesJson: COUNTRIES,
    active: true,
    popularity: 54,
  },

  {
    code: 'start_plan_pivot',
    name: 'Document de Pivot Stratégique',
    category: 'commercial_financier',
    description: 'Document structurant la décision et le plan d\'exécution d\'un pivot stratégique pour une startup',
    price: 2000,
    currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_startup', label: 'Nom de la startup', type: 'text', required: true },
      { name: 'modele_actuel', label: 'Modèle actuel (ce qui ne fonctionne pas)', type: 'textarea', required: true },
      { name: 'raisons_pivot', label: 'Raisons du pivot (données, feedback)', type: 'textarea', required: true },
      { name: 'nouveau_modele', label: 'Nouveau modèle / direction', type: 'textarea', required: true },
      { name: 'hypotheses_valider', label: 'Hypothèses à valider (90 jours)', type: 'textarea', required: true },
      { name: 'ressources_requises', label: 'Ressources nécessaires pour le pivot', type: 'textarea', required: false },
      { name: 'date_decision', label: 'Date de décision de pivot', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<div style="background:#e53935;color:white;padding:20px;border-radius:8px;text-align:center;margin-bottom:20px;">
<h2 style="margin:0;">DOCUMENT DE PIVOT STRATÉGIQUE</h2>
<p style="margin:4px 0 0;opacity:0.9;">{{nom_startup}} — Décision du {{date_decision}}</p>
</div>
<div style="border-left:4px solid #e53935;padding:12px 16px;margin-bottom:16px;background:#fff8f8;">
<h3 style="margin:0 0 8px;color:#e53935;">Modèle Actuel (ce que nous abandonnons)</h3>
<p style="margin:0;">{{modele_actuel}}</p>
</div>
<div style="border-left:4px solid #ff9800;padding:12px 16px;margin-bottom:16px;background:#fffde7;">
<h3 style="margin:0 0 8px;color:#e65100;">Raisons du Pivot</h3>
<p style="margin:0;">{{raisons_pivot}}</p>
</div>
<div style="border-left:4px solid #2e7d32;padding:12px 16px;margin-bottom:16px;background:#f1f8e9;">
<h3 style="margin:0 0 8px;color:#2e7d32;">Nouveau Modèle</h3>
<p style="margin:0;">{{nouveau_modele}}</p>
</div>
<div style="border-left:4px solid #1a3c5e;padding:12px 16px;margin-bottom:16px;background:#e8f0fe;">
<h3 style="margin:0 0 8px;color:#1a3c5e;">Hypothèses à Valider (90 jours)</h3>
<p style="margin:0;">{{hypotheses_valider}}</p>
</div>
<div style="border-left:4px solid #9c27b0;padding:12px 16px;background:#f3e5f5;">
<h3 style="margin:0 0 8px;color:#6a1b9a;">Ressources Nécessaires</h3>
<p style="margin:0;">{{ressources_requises}}</p>
</div></div>`,
    countriesJson: COUNTRIES,
    active: true,
    popularity: 48,
  },

  {
    code: 'start_liquidation_startup',
    name: 'Protocole de Liquidation Amiable',
    category: 'juridique_admin',
    description: 'Protocole encadrant la dissolution et liquidation amiable d\'une startup entre fondateurs et actionnaires',
    price: 4000,
    currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_startup', label: 'Nom de la société', type: 'text', required: true },
      { name: 'actionnaires', label: 'Liste des actionnaires et % (nom, %)', type: 'textarea', required: true },
      { name: 'actif_restant', label: 'Actif net à distribuer (FCFA)', type: 'text', required: true },
      { name: 'dettes_encours', label: 'Dettes et engagements en cours', type: 'textarea', required: true },
      { name: 'ordre_remboursement', label: 'Ordre de priorité de remboursement', type: 'textarea', required: true },
      { name: 'liquidateur', label: 'Nom du liquidateur désigné', type: 'text', required: true },
      { name: 'lieu', label: 'Lieu', type: 'text', required: true },
      { name: 'date_doc', label: 'Date', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Georgia,serif;max-width:750px;margin:0 auto;padding:30px;">
<h2 style="color:#1a3c5e;text-align:center;">PROTOCOLE DE LIQUIDATION AMIABLE</h2>
<p style="text-align:center;color:#555;">{{nom_startup}} — {{lieu}}, le {{date_doc}}</p>
<p>Les actionnaires de {{nom_startup}} ont décidé, à l'unanimité, de procéder à la dissolution amiable de la société.</p>
<h3 style="color:#1a3c5e;">1. Actionnaires</h3>
<p>{{actionnaires}}</p>
<h3 style="color:#1a3c5e;">2. Liquidateur</h3>
<p>{{liquidateur}} est désigné liquidateur de la société avec tous pouvoirs pour procéder aux opérations de liquidation.</p>
<h3 style="color:#1a3c5e;">3. Dettes et Engagements</h3>
<p>{{dettes_encours}}</p>
<h3 style="color:#1a3c5e;">4. Actif Net et Ordre de Remboursement</h3>
<p>Actif net estimé : <b>{{actif_restant}} FCFA</b><br>Ordre de priorité : {{ordre_remboursement}}</p>
<h3 style="color:#1a3c5e;">5. Clôture</h3>
<p>La liquidation sera clôturée après règlement de toutes les dettes, radiation du registre de commerce et partage du boni de liquidation.</p>
<div style="margin-top:30px;border-top:1px solid #ddd;padding-top:16px;text-align:center;font-size:0.85rem;color:#777;">Signature de tous les actionnaires requise</div>
</div>`,
    countriesJson: COUNTRIES,
    active: true,
    popularity: 42,
  },

  {
    code: 'start_rapport_impact',
    name: 'Rapport d\'Impact Social / ESG',
    category: 'commercial_financier',
    description: 'Rapport d\'impact social et environnemental (ESG) d\'une startup à impact pour ses parties prenantes',
    price: 2500,
    currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_startup', label: 'Nom de la startup', type: 'text', required: true },
      { name: 'annee', label: 'Année du rapport', type: 'text', required: true },
      { name: 'mission_impact', label: 'Mission d\'impact de la startup', type: 'textarea', required: true },
      { name: 'indicateurs_sociaux', label: 'Indicateurs sociaux (bénéficiaires, emplois...)', type: 'textarea', required: true },
      { name: 'indicateurs_env', label: 'Indicateurs environnementaux', type: 'textarea', required: false },
      { name: 'indicateurs_gouv', label: 'Gouvernance et éthique (G de ESG)', type: 'textarea', required: false },
      { name: 'temoignages', label: 'Témoignages bénéficiaires / partenaires', type: 'textarea', required: false },
      { name: 'objectifs_prochaine_annee', label: 'Objectifs d\'impact pour l\'année suivante', type: 'textarea', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:800px;margin:0 auto;padding:24px;">
<div style="background:linear-gradient(135deg,#2e7d32,#1a3c5e);color:white;padding:28px;border-radius:10px;text-align:center;margin-bottom:20px;">
<h1 style="margin:0;font-size:1.8rem;">{{nom_startup}}</h1>
<p style="margin:6px 0 0;opacity:0.9;">Rapport d'Impact Social & ESG — {{annee}}</p>
</div>
<div style="background:#f1f8e9;border-radius:8px;padding:16px;margin-bottom:16px;border-left:4px solid #2e7d32;">
<h3 style="color:#2e7d32;margin:0 0 8px;">Notre Mission</h3>
<p style="margin:0;">{{mission_impact}}</p>
</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;">
<div style="background:#e8f5e9;border-radius:8px;padding:14px;">
<h3 style="color:#2e7d32;margin:0 0 8px;">Impact Social (S)</h3><p style="margin:0;font-size:0.85rem;">{{indicateurs_sociaux}}</p>
</div>
<div style="background:#e0f2f1;border-radius:8px;padding:14px;">
<h3 style="color:#00695c;margin:0 0 8px;">Impact Environnemental (E)</h3><p style="margin:0;font-size:0.85rem;">{{indicateurs_env}}</p>
</div>
</div>
<div style="background:#e8f0fe;border-radius:8px;padding:14px;margin-bottom:16px;">
<h3 style="color:#1a3c5e;margin:0 0 8px;">Gouvernance (G)</h3><p style="margin:0;font-size:0.85rem;">{{indicateurs_gouv}}</p>
</div>
<div style="background:#fff3e0;border-radius:8px;padding:14px;margin-bottom:16px;">
<h3 style="color:#e65100;margin:0 0 8px;">Témoignages</h3><p style="margin:0;font-size:0.85rem;font-style:italic;">{{temoignages}}</p>
</div>
<div style="background:#1a3c5e;color:white;border-radius:8px;padding:14px;">
<h3 style="margin:0 0 8px;">Objectifs {{annee}} +1</h3><p style="margin:0;font-size:0.85rem;opacity:0.9;">{{objectifs_prochaine_annee}}</p>
</div></div>`,
    countriesJson: COUNTRIES,
    active: true,
    popularity: 58,
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
  console.log(`✅ Seed Startup & Innovation terminé. ${created} créés, ${updated} mis à jour — Total BDD: ${total}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
