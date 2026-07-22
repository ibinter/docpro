import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const COUNTRIES = JSON.stringify(['CI', 'SN', 'CM', 'BJ', 'TG', 'BF', 'ML', 'GN', 'CD', 'CG', 'GA', 'NE', 'TD', 'MR']);

const templates = [
  // ─── 1. Bail Commercial ──────────────────────────────────────────────────
  {
    code: 'ctr2_bail_commercial',
    name: 'Contrat de Bail Commercial',
    category: 'juridique_admin',
    description: 'Location de locaux à usage commercial entre bailleur et locataire commerçant',
    price: 500,
    currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_bailleur', label: 'Nom du bailleur', type: 'text', required: true },
      { name: 'adresse_bailleur', label: 'Adresse du bailleur', type: 'text', required: true },
      { name: 'nom_locataire', label: 'Nom du locataire', type: 'text', required: true },
      { name: 'adresse_locataire', label: 'Adresse du locataire', type: 'text', required: true },
      { name: 'adresse_locaux', label: 'Adresse des locaux loués', type: 'text', required: true },
      { name: 'description_locaux', label: 'Description des locaux', type: 'textarea', required: true },
      { name: 'usage_locaux', label: 'Usage des locaux (ex : commerce de détail)', type: 'text', required: true },
      { name: 'montant_loyer', label: 'Montant du loyer mensuel (FCFA)', type: 'number', required: true },
      { name: 'depot_garantie', label: 'Dépôt de garantie (FCFA)', type: 'number', required: true },
      { name: 'date_debut', label: 'Date de début du bail', type: 'date', required: true },
      { name: 'duree_bail', label: 'Durée du bail (ex : 3 ans)', type: 'text', required: true },
      { name: 'ville_signature', label: 'Ville de signature', type: 'text', required: true },
      { name: 'date_signature', label: 'Date de signature', type: 'date', required: true },
    ]),
    body: `<h1>CONTRAT DE BAIL COMMERCIAL</h1>

<p>Le présent contrat est signé et prend effet à la date de sa signature,</p>

<p><strong>ENTRE :</strong></p>
<p>{{nom_bailleur}}, dont l'adresse est : {{adresse_bailleur}}, ci-après dénommé « le Bailleur », d'une part,</p>

<p><strong>ET :</strong></p>
<p>{{nom_locataire}}, dont l'adresse est : {{adresse_locataire}}, ci-après dénommé « le Locataire », d'autre part,</p>

<h2>Article 1 : Objet</h2>
<p>Le Bailleur loue au Locataire les locaux commerciaux sis à {{adresse_locaux}}, décrits comme suit : {{description_locaux}}.</p>

<h2>Article 2 : Usage</h2>
<p>Les locaux seront utilisés exclusivement pour : {{usage_locaux}}. Toute autre utilisation est interdite sans accord écrit préalable du Bailleur.</p>

<h2>Article 3 : Durée</h2>
<p>Le bail est consenti pour une durée de {{duree_bail}}, à compter du {{date_debut}}.</p>

<h2>Article 4 : Loyer</h2>
<p>Le loyer mensuel est fixé à {{montant_loyer}} FCFA, payable d'avance le premier de chaque mois.</p>

<h2>Article 5 : Dépôt de garantie</h2>
<p>Un dépôt de garantie de {{depot_garantie}} FCFA est versé par le Locataire à la signature du présent contrat. Ce dépôt est restitué en fin de bail, déduction faite des éventuels impayés ou dommages imputables au Locataire.</p>

<h2>Article 6 : Obligations du Locataire</h2>
<p>Le Locataire s'engage à : (i) payer le loyer à bonne date ; (ii) entretenir les locaux en bon état ; (iii) ne pas sous-louer ni céder le bail sans l'accord écrit du Bailleur ; (iv) respecter le règlement de copropriété s'il y a lieu.</p>

<h2>Article 7 : Résiliation</h2>
<p>En cas de manquement grave de l'une des parties à ses obligations, le bail pourra être résilié de plein droit après mise en demeure restée sans effet pendant 30 jours.</p>

<h2>Article 8 : Loi applicable</h2>
<p>Le présent contrat est régi par les dispositions de l'Acte Uniforme OHADA portant sur le droit commercial général. Tout litige sera soumis aux tribunaux compétents du lieu des locaux.</p>

<p>Fait à {{ville_signature}}, le {{date_signature}}, en deux exemplaires originaux.</p>

<table border="1" cellpadding="8" style="width:100%;border-collapse:collapse;">
  <tr>
    <td style="width:50%;text-align:center;"><strong>Le Bailleur</strong><br/>{{nom_bailleur}}<br/><br/>Signature : ________________</td>
    <td style="width:50%;text-align:center;"><strong>Le Locataire</strong><br/>{{nom_locataire}}<br/><br/>Signature : ________________</td>
  </tr>
</table>`,
    countriesJson: COUNTRIES,
    active: true,
    popularity: 85,
  },

  // ─── 2. Bail Rural ────────────────────────────────────────────────────────
  {
    code: 'ctr2_bail_rural',
    name: 'Contrat de Bail Rural (Agricole)',
    category: 'juridique_admin',
    description: 'Location de terrain agricole pour exploitation rurale',
    price: 400,
    currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_bailleur', label: 'Nom du bailleur', type: 'text', required: true },
      { name: 'adresse_bailleur', label: 'Adresse du bailleur', type: 'text', required: true },
      { name: 'nom_locataire', label: 'Nom du locataire agricole', type: 'text', required: true },
      { name: 'adresse_locataire', label: 'Adresse du locataire', type: 'text', required: true },
      { name: 'adresse_terrain', label: 'Adresse précise du terrain', type: 'text', required: true },
      { name: 'superficie', label: 'Superficie (en hectares)', type: 'text', required: true },
      { name: 'description_terrain', label: 'Description du terrain', type: 'textarea', required: false },
      { name: 'loyer_annuel', label: 'Loyer annuel (FCFA/ha)', type: 'number', required: true },
      { name: 'depot_garantie', label: 'Dépôt de garantie (FCFA)', type: 'number', required: true },
      { name: 'date_debut', label: 'Date de début', type: 'date', required: true },
      { name: 'date_fin', label: 'Date de fin', type: 'date', required: true },
      { name: 'ville_signature', label: 'Ville de signature', type: 'text', required: true },
      { name: 'date_signature', label: 'Date de signature', type: 'date', required: true },
    ]),
    body: `<h1>CONTRAT DE BAIL RURAL</h1>

<p><strong>Entre :</strong></p>
<p>{{nom_bailleur}}, domicilié à {{adresse_bailleur}}, ci-après dénommé « le Bailleur »,</p>
<p><strong>Et :</strong></p>
<p>{{nom_locataire}}, domicilié à {{adresse_locataire}}, ci-après dénommé « le Locataire Agricole »,</p>

<h2>Article 1 : Objet</h2>
<p>Le Bailleur donne à bail au Locataire Agricole une parcelle de terrain agricole située à {{adresse_terrain}}, d'une superficie de {{superficie}} hectares, décrite comme suit : {{description_terrain}}.</p>

<h2>Article 2 : Durée</h2>
<p>Le bail est conclu pour la période allant du {{date_debut}} au {{date_fin}}. Il pourra être renouvelé par accord écrit des parties.</p>

<h2>Article 3 : Loyer</h2>
<p>Le loyer annuel est fixé à {{loyer_annuel}} FCFA par hectare. Le Locataire s'engage à payer ce loyer au plus tard le 31 janvier de chaque année.</p>

<h2>Article 4 : Dépôt de garantie</h2>
<p>Un dépôt de garantie de {{depot_garantie}} FCFA est versé à la signature du présent contrat, restituable en fin de bail déduction faite des éventuels manquements du Locataire.</p>

<h2>Article 5 : Utilisation du terrain</h2>
<p>Le Locataire s'engage à utiliser le terrain exclusivement à des fins agricoles conformément aux réglementations en vigueur. Il est responsable de l'entretien du terrain et doit le maintenir en bon état de culture.</p>

<h2>Article 6 : Récoltes et produits</h2>
<p>Le Locataire a droit aux récoltes et produits issus de l'exploitation du terrain pendant la durée du bail.</p>

<h2>Article 7 : Résiliation</h2>
<p>Le bail peut être résilié par l'une ou l'autre des parties moyennant un préavis de 90 jours adressé par lettre recommandée avec accusé de réception.</p>

<h2>Article 8 : Loi applicable</h2>
<p>Le présent contrat est régi par les lois en vigueur dans l'espace OHADA et par la législation nationale applicable au bail rural. Tout litige sera soumis aux tribunaux compétents.</p>

<p>Fait à {{ville_signature}}, le {{date_signature}}, en deux exemplaires originaux.</p>

<table border="1" cellpadding="8" style="width:100%;border-collapse:collapse;">
  <tr>
    <td style="width:50%;text-align:center;"><strong>Le Bailleur</strong><br/>{{nom_bailleur}}<br/><br/>Signature : ________________</td>
    <td style="width:50%;text-align:center;"><strong>Le Locataire Agricole</strong><br/>{{nom_locataire}}<br/><br/>Signature : ________________</td>
  </tr>
</table>`,
    countriesJson: COUNTRIES,
    active: true,
    popularity: 65,
  },

  // ─── 3. Contrat de Travail CDI ────────────────────────────────────────────
  {
    code: 'ctr2_contrat_travail_cdi',
    name: 'Contrat de Travail à Durée Indéterminée (CDI)',
    category: 'juridique_admin',
    description: 'Contrat de travail CDI entre employeur et salarié, conforme au droit du travail OHADA',
    price: 500,
    currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_employeur', label: "Nom/Raison sociale de l'employeur", type: 'text', required: true },
      { name: 'adresse_employeur', label: "Adresse de l'employeur", type: 'text', required: true },
      { name: 'nom_employe', label: "Nom et prénom de l'employé", type: 'text', required: true },
      { name: 'adresse_employe', label: "Adresse de l'employé", type: 'text', required: true },
      { name: 'poste', label: 'Poste / Fonction occupée', type: 'text', required: true },
      { name: 'date_debut', label: "Date de prise de fonction", type: 'date', required: true },
      { name: 'salaire_mensuel', label: 'Salaire brut mensuel (FCFA)', type: 'number', required: true },
      { name: 'duree_essai', label: "Durée de la période d'essai (ex : 3 mois)", type: 'text', required: false },
      { name: 'horaires', label: 'Horaires de travail', type: 'text', required: false },
      { name: 'lieu_travail', label: 'Lieu de travail', type: 'text', required: true },
      { name: 'ville_signature', label: 'Ville de signature', type: 'text', required: true },
      { name: 'date_signature', label: 'Date de signature', type: 'date', required: true },
    ]),
    body: `<h1>CONTRAT DE TRAVAIL À DURÉE INDÉTERMINÉE</h1>

<p><strong>ENTRE :</strong></p>
<p>{{nom_employeur}}, dont le siège est situé à {{adresse_employeur}}, ci-après dénommé « l'Employeur »,</p>

<p><strong>ET :</strong></p>
<p>{{nom_employe}}, domicilié à {{adresse_employe}}, ci-après dénommé « l'Employé »,</p>

<h2>Article 1 : Engagement</h2>
<p>L'Employeur engage l'Employé au poste de {{poste}}, à compter du {{date_debut}}, pour une durée indéterminée, conformément aux dispositions légales en vigueur.</p>

<h2>Article 2 : Période d'essai</h2>
<p>Le présent contrat est soumis à une période d'essai de {{duree_essai}}. Durant cette période, chacune des parties peut mettre fin au contrat sans préavis ni indemnité.</p>

<h2>Article 3 : Rémunération</h2>
<p>L'Employé percevra un salaire brut mensuel de {{salaire_mensuel}} FCFA, versé à la fin de chaque mois. Ce salaire pourra faire l'objet de révisions périodiques selon les performances et les politiques salariales de l'Employeur.</p>

<h2>Article 4 : Lieu et horaires de travail</h2>
<p>L'Employé exercera ses fonctions à {{lieu_travail}}, selon les horaires suivants : {{horaires}}. Ces conditions pourront être modifiées après accord entre les parties.</p>

<h2>Article 5 : Obligations de l'Employé</h2>
<p>L'Employé s'engage à : (i) accomplir ses tâches avec diligence et professionnalisme ; (ii) respecter le règlement intérieur de l'Employeur ; (iii) garder la confidentialité des informations dont il aura connaissance dans le cadre de ses fonctions ; (iv) ne pas exercer d'activité concurrente.</p>

<h2>Article 6 : Congés</h2>
<p>L'Employé bénéficiera des congés payés prévus par la législation nationale applicable, soit au minimum 2,5 jours ouvrables par mois de travail effectif.</p>

<h2>Article 7 : Résiliation</h2>
<p>Le contrat peut être rompu par l'une ou l'autre des parties sous réserve du respect du préavis légal et du versement des indemnités dues conformément au droit du travail applicable.</p>

<h2>Article 8 : Loi applicable</h2>
<p>Le présent contrat est régi par le Code du travail du pays concerné et les conventions collectives applicables. Tout litige sera soumis aux juridictions compétentes.</p>

<p>Fait à {{ville_signature}}, le {{date_signature}}, en deux exemplaires originaux.</p>

<table border="1" cellpadding="8" style="width:100%;border-collapse:collapse;">
  <tr>
    <td style="width:50%;text-align:center;"><strong>L'Employeur</strong><br/>{{nom_employeur}}<br/><br/>Signature : ________________</td>
    <td style="width:50%;text-align:center;"><strong>L'Employé</strong><br/>{{nom_employe}}<br/><br/>Signature : ________________</td>
  </tr>
</table>`,
    countriesJson: COUNTRIES,
    active: true,
    popularity: 90,
  },

  // ─── 4. Contrat de Travail CDD ────────────────────────────────────────────
  {
    code: 'ctr2_contrat_travail_cdd',
    name: 'Contrat de Travail à Durée Déterminée (CDD)',
    category: 'juridique_admin',
    description: 'Contrat de travail CDD pour mission temporaire ou remplacement',
    price: 400,
    currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_employeur', label: "Nom/Raison sociale de l'employeur", type: 'text', required: true },
      { name: 'adresse_employeur', label: "Adresse de l'employeur", type: 'text', required: true },
      { name: 'nom_employe', label: "Nom et prénom de l'employé", type: 'text', required: true },
      { name: 'adresse_employe', label: "Adresse de l'employé", type: 'text', required: true },
      { name: 'poste', label: 'Poste / Fonction occupée', type: 'text', required: true },
      { name: 'motif_cdd', label: 'Motif du CDD (ex : accroissement d\'activité, remplacement)', type: 'text', required: true },
      { name: 'date_debut', label: 'Date de début', type: 'date', required: true },
      { name: 'date_fin', label: 'Date de fin', type: 'date', required: true },
      { name: 'salaire_mensuel', label: 'Salaire brut mensuel (FCFA)', type: 'number', required: true },
      { name: 'lieu_travail', label: 'Lieu de travail', type: 'text', required: true },
      { name: 'ville_signature', label: 'Ville de signature', type: 'text', required: true },
      { name: 'date_signature', label: 'Date de signature', type: 'date', required: true },
    ]),
    body: `<h1>CONTRAT DE TRAVAIL À DURÉE DÉTERMINÉE</h1>

<p><strong>ENTRE :</strong></p>
<p>{{nom_employeur}}, dont le siège est situé à {{adresse_employeur}}, ci-après dénommé « l'Employeur »,</p>

<p><strong>ET :</strong></p>
<p>{{nom_employe}}, domicilié à {{adresse_employe}}, ci-après dénommé « l'Employé »,</p>

<h2>Article 1 : Objet et motif</h2>
<p>L'Employeur engage l'Employé pour une durée déterminée au poste de {{poste}}, pour le motif suivant : {{motif_cdd}}.</p>

<h2>Article 2 : Durée</h2>
<p>Le présent contrat est conclu pour la période allant du {{date_debut}} au {{date_fin}}. Il prendra fin de plein droit à l'échéance du terme, sans qu'il soit nécessaire de notifier un préavis.</p>

<h2>Article 3 : Rémunération</h2>
<p>L'Employé percevra un salaire brut mensuel de {{salaire_mensuel}} FCFA, versé à la fin de chaque mois.</p>

<h2>Article 4 : Lieu de travail</h2>
<p>L'Employé exercera ses fonctions à {{lieu_travail}}.</p>

<h2>Article 5 : Obligations des parties</h2>
<p>Les parties s'engagent à respecter leurs obligations réciproques issues du droit du travail applicable, notamment en matière de confidentialité, de respect du règlement intérieur et de bonne exécution des tâches confiées.</p>

<h2>Article 6 : Indemnité de fin de contrat</h2>
<p>À l'expiration du contrat, l'Employé percevra une indemnité de fin de contrat conformément aux dispositions légales en vigueur.</p>

<h2>Article 7 : Loi applicable</h2>
<p>Le présent contrat est régi par le Code du travail national et les conventions collectives applicables. Tout litige sera soumis aux juridictions compétentes.</p>

<p>Fait à {{ville_signature}}, le {{date_signature}}, en deux exemplaires originaux.</p>

<table border="1" cellpadding="8" style="width:100%;border-collapse:collapse;">
  <tr>
    <td style="width:50%;text-align:center;"><strong>L'Employeur</strong><br/>{{nom_employeur}}<br/><br/>Signature : ________________</td>
    <td style="width:50%;text-align:center;"><strong>L'Employé</strong><br/>{{nom_employe}}<br/><br/>Signature : ________________</td>
  </tr>
</table>`,
    countriesJson: COUNTRIES,
    active: true,
    popularity: 80,
  },

  // ─── 5. Gestion de Fortune ────────────────────────────────────────────────
  {
    code: 'ctr2_gestion_fortune',
    name: 'Contrat de Gestion de Fortune',
    category: 'commercial_financier',
    description: 'Mandat de gestion d\'avoirs financiers et patrimoniaux confié à une société spécialisée',
    price: 700,
    currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_societe_gestion', label: 'Nom de la société de gestion', type: 'text', required: true },
      { name: 'numero_enregistrement', label: "Numéro d'enregistrement", type: 'text', required: true },
      { name: 'adresse_societe', label: 'Adresse de la société de gestion', type: 'text', required: true },
      { name: 'representant_societe', label: 'Nom et titre du représentant légal', type: 'text', required: true },
      { name: 'nom_client', label: 'Nom du client', type: 'text', required: true },
      { name: 'statut_client', label: 'Statut du client (personne physique/morale)', type: 'text', required: true },
      { name: 'adresse_client', label: 'Adresse du client', type: 'text', required: true },
      { name: 'objectifs_investissement', label: "Objectifs d'investissement", type: 'textarea', required: true },
      { name: 'duree_preavis', label: 'Durée du préavis de résiliation (jours/mois)', type: 'text', required: true },
      { name: 'lieu_signature', label: 'Lieu de signature', type: 'text', required: true },
      { name: 'date_signature', label: 'Date de signature', type: 'date', required: true },
    ]),
    body: `<h1>CONTRAT DE GESTION DE FORTUNE</h1>

<p><strong>Entre :</strong></p>
<p>{{nom_societe_gestion}}, société enregistrée sous le numéro {{numero_enregistrement}}, dont le siège social est situé à {{adresse_societe}}, représentée par {{representant_societe}}, ci-après dénommée « la Société de Gestion »,</p>

<p><strong>Et :</strong></p>
<p>{{nom_client}}, {{statut_client}}, résidant/dont le siège social est situé à {{adresse_client}}, ci-après dénommé « le Client »,</p>

<h2>Article 1 : Objet</h2>
<p>La Société de Gestion s'engage à gérer les avoirs financiers et patrimoniaux du Client conformément aux instructions spécifiques et aux objectifs d'investissement convenus entre les parties.</p>

<h2>Article 2 : Mandat de gestion</h2>
<p>Le Client confie à la Société de Gestion un mandat exclusif de gestion de son patrimoine financier, incluant la gestion des investissements, la répartition des actifs, la gestion des risques et toutes les décisions nécessaires à la réalisation des objectifs convenus.</p>

<h2>Article 3 : Objectifs d'investissement</h2>
<p>Les objectifs d'investissement du Client sont les suivants : {{objectifs_investissement}}. Ils sont également définis dans un document annexé intitulé « Profil d'Investisseur ».</p>

<h2>Article 4 : Pouvoirs de la Société de Gestion</h2>
<p>La Société de Gestion est autorisée à prendre toutes les décisions nécessaires à la gestion efficace du patrimoine financier du Client, dans le respect des objectifs convenus et des lois et réglementations en vigueur.</p>

<h2>Article 5 : Rapports et communications</h2>
<p>La Société de Gestion s'engage à fournir régulièrement des rapports détaillés sur la performance du portefeuille, les mouvements d'actifs et toute autre information pertinente.</p>

<h2>Article 6 : Frais et commissions</h2>
<p>Les frais de gestion et les commissions applicables seront convenus entre les parties et précisés dans un document distinct intitulé « Grille Tarifaire ».</p>

<h2>Article 7 : Confidentialité</h2>
<p>Les parties s'engagent à maintenir la confidentialité de toutes les informations commerciales et financières échangées dans le cadre du présent contrat.</p>

<h2>Article 8 : Durée et résiliation</h2>
<p>Ce contrat entre en vigueur à la date de signature et reste en vigueur jusqu'à résiliation par l'une ou l'autre partie, moyennant un préavis écrit de {{duree_preavis}}.</p>

<h2>Article 9 : Loi applicable</h2>
<p>Ce contrat est régi et interprété conformément aux lois en vigueur dans l'Espace OHADA.</p>

<p>Fait en deux exemplaires originaux, à {{lieu_signature}}, le {{date_signature}}.</p>

<table border="1" cellpadding="8" style="width:100%;border-collapse:collapse;">
  <tr>
    <td style="width:50%;text-align:center;"><strong>La Société de Gestion</strong><br/>{{nom_societe_gestion}}<br/><br/>Signature : ________________</td>
    <td style="width:50%;text-align:center;"><strong>Le Client</strong><br/>{{nom_client}}<br/><br/>Signature : ________________</td>
  </tr>
</table>`,
    countriesJson: COUNTRIES,
    active: true,
    popularity: 55,
  },

  // ─── 6. Gestion de Patrimoine ─────────────────────────────────────────────
  {
    code: 'ctr2_gestion_patrimoine',
    name: 'Contrat de Gestion de Patrimoine',
    category: 'commercial_financier',
    description: 'Services de gestion patrimoniale personnalisée : analyse, stratégie, suivi et conseil en investissement',
    price: 600,
    currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_societe_gestion', label: 'Nom de la société de gestion de patrimoine', type: 'text', required: true },
      { name: 'adresse_societe', label: 'Adresse de la société', type: 'text', required: true },
      { name: 'representant_societe', label: 'Représentant légal', type: 'text', required: true },
      { name: 'nom_client', label: 'Nom du client', type: 'text', required: true },
      { name: 'adresse_client', label: 'Adresse du client', type: 'text', required: true },
      { name: 'services_inclus', label: 'Services inclus (liste)', type: 'textarea', required: false },
      { name: 'honoraires', label: 'Modalités des honoraires', type: 'text', required: true },
      { name: 'lieu_signature', label: 'Lieu de signature', type: 'text', required: true },
      { name: 'date_signature', label: 'Date de signature', type: 'date', required: true },
    ]),
    body: `<h1>CONTRAT DE GESTION DE PATRIMOINE</h1>

<p><strong>Entre :</strong></p>
<p>{{nom_societe_gestion}}, dont le siège social est situé à {{adresse_societe}}, représentée par {{representant_societe}}, ci-après dénommée « la Société de Gestion »,</p>

<p><strong>Et :</strong></p>
<p>{{nom_client}}, domicilié à {{adresse_client}}, ci-après dénommé « le Client »,</p>

<h2>Article 1 : Objet</h2>
<p>La Société de Gestion s'engage à fournir des services de gestion de patrimoine au Client conformément aux termes et conditions énoncés dans le présent contrat.</p>

<h2>Article 2 : Description des services</h2>
<p>Les services de gestion de patrimoine incluent notamment : {{services_inclus}}<br/>
En tout état de cause, ils comprennent au minimum : l'analyse de la situation financière du Client, le développement d'une stratégie patrimoniale personnalisée, la gestion active des actifs financiers, les conseils en investissement et allocation d'actifs, le suivi de la performance du portefeuille, et le reporting financier périodique.</p>

<h2>Article 3 : Responsabilités de la Société de Gestion</h2>
<p>La Société de Gestion s'engage à agir dans le meilleur intérêt du Client, avec toute la diligence, la compétence et le soin requis par les normes professionnelles en vigueur.</p>

<h2>Article 4 : Responsabilités du Client</h2>
<p>Le Client s'engage à fournir toutes les informations pertinentes nécessaires à la gestion efficace de son patrimoine. Le Client reconnaît que toutes les décisions d'investissement sont prises à ses propres risques.</p>

<h2>Article 5 : Confidentialité</h2>
<p>Les parties conviennent de maintenir la confidentialité de toutes les informations et documents échangés dans le cadre du présent contrat.</p>

<h2>Article 6 : Honoraires</h2>
<p>Les honoraires de la Société de Gestion seront déterminés comme suit : {{honoraires}}.</p>

<h2>Article 7 : Durée</h2>
<p>Ce contrat entre en vigueur à la date de signature et reste en vigueur jusqu'à résiliation par l'une ou l'autre partie conformément aux dispositions de résiliation prévues.</p>

<h2>Article 8 : Loi applicable</h2>
<p>Ce contrat est régi et interprété conformément aux lois en vigueur dans l'Espace OHADA.</p>

<p>Fait en deux exemplaires originaux, à {{lieu_signature}}, le {{date_signature}}.</p>

<table border="1" cellpadding="8" style="width:100%;border-collapse:collapse;">
  <tr>
    <td style="width:50%;text-align:center;"><strong>La Société de Gestion</strong><br/>{{nom_societe_gestion}}<br/><br/>Signature : ________________</td>
    <td style="width:50%;text-align:center;"><strong>Le Client</strong><br/>{{nom_client}}<br/><br/>Signature : ________________</td>
  </tr>
</table>`,
    countriesJson: COUNTRIES,
    active: true,
    popularity: 50,
  },

  // ─── 7. Gestion de Projet ─────────────────────────────────────────────────
  {
    code: 'ctr2_gestion_projet',
    name: 'Contrat de Gestion de Projet',
    category: 'commercial_financier',
    description: 'Prestation de gestion de projet : planification, coordination, exécution et suivi pour le compte d\'un client',
    price: 500,
    currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_societe_gp', label: 'Nom de la société de gestion de projet', type: 'text', required: true },
      { name: 'adresse_societe_gp', label: 'Adresse de la société de gestion de projet', type: 'text', required: true },
      { name: 'nom_client', label: 'Nom du client', type: 'text', required: true },
      { name: 'adresse_client', label: 'Adresse du client', type: 'text', required: true },
      { name: 'nom_projet', label: 'Nom du projet', type: 'text', required: true },
      { name: 'description_projet', label: 'Description des services de gestion de projet', type: 'textarea', required: true },
      { name: 'duree_contrat', label: 'Durée du contrat (ex : 12 mois)', type: 'text', required: true },
      { name: 'date_debut', label: 'Date de début', type: 'date', required: true },
      { name: 'date_fin', label: 'Date de fin', type: 'date', required: true },
      { name: 'remuneration', label: 'Modalités de rémunération', type: 'textarea', required: true },
      { name: 'lieu_signature', label: 'Lieu de signature', type: 'text', required: true },
      { name: 'date_signature', label: 'Date de signature', type: 'date', required: true },
    ]),
    body: `<h1>CONTRAT DE GESTION DE PROJET</h1>

<p><strong>Entre :</strong></p>
<p>{{nom_societe_gp}}, dont le siège social est situé à {{adresse_societe_gp}}, ci-après dénommée « la Société de Gestion de Projet »,</p>

<p><strong>Et :</strong></p>
<p>{{nom_client}}, dont le siège social est situé à {{adresse_client}}, ci-après dénommé « le Client »,</p>

<h2>Article 1 : Objet</h2>
<p>Le présent contrat a pour objet de définir les modalités de la gestion du projet {{nom_projet}} par la Société de Gestion de Projet pour le compte du Client.</p>

<h2>Article 2 : Services de gestion de projet</h2>
<p>La Société de Gestion de Projet s'engage à fournir au Client les services suivants : {{description_projet}}. Ces services incluent notamment la définition des objectifs, la création d'un plan de projet, la gestion des ressources, la supervision des étapes de réalisation, le contrôle des coûts, la gestion des risques et la communication avec les parties prenantes.</p>

<h2>Article 3 : Responsabilités de la Société de Gestion de Projet</h2>
<p>La Société de Gestion de Projet s'engage à respecter les délais convenus, assurer la qualité des livrables, gérer les ressources humaines et matérielles, et rapporter régulièrement au Client sur l'état d'avancement du projet.</p>

<h2>Article 4 : Responsabilités du Client</h2>
<p>Le Client s'engage à fournir toutes les informations, ressources et accès nécessaires à la bonne exécution du projet, et à désigner un représentant pour collaborer avec la Société de Gestion de Projet.</p>

<h2>Article 5 : Durée</h2>
<p>Le contrat est établi pour une durée de {{duree_contrat}}, du {{date_debut}} au {{date_fin}}, renouvelable par accord écrit des parties.</p>

<h2>Article 6 : Rémunération</h2>
<p>{{remuneration}}</p>

<h2>Article 7 : Confidentialité</h2>
<p>Les deux parties s'engagent à maintenir la confidentialité de toutes les informations sensibles échangées dans le cadre du présent contrat.</p>

<h2>Article 8 : Résiliation</h2>
<p>Chacune des parties peut résilier le contrat en respectant un préavis écrit de 30 jours. Les motifs de résiliation sont précisés en annexe.</p>

<h2>Article 9 : Loi applicable</h2>
<p>Ce contrat est régi par les lois en vigueur dans l'Espace OHADA. Tout litige sera soumis à l'arbitrage conformément aux règles de l'OHADA.</p>

<p>Fait à {{lieu_signature}}, le {{date_signature}}, en deux exemplaires originaux.</p>

<table border="1" cellpadding="8" style="width:100%;border-collapse:collapse;">
  <tr>
    <td style="width:50%;text-align:center;"><strong>La Société de Gestion de Projet</strong><br/>{{nom_societe_gp}}<br/><br/>Signature : ________________</td>
    <td style="width:50%;text-align:center;"><strong>Le Client</strong><br/>{{nom_client}}<br/><br/>Signature : ________________</td>
  </tr>
</table>`,
    countriesJson: COUNTRIES,
    active: true,
    popularity: 60,
  },

  // ─── 8. Contrat de Distribution ───────────────────────────────────────────
  {
    code: 'ctr2_distribution',
    name: 'Contrat de Distribution',
    category: 'commercial_financier',
    description: 'Accord de distribution exclusive ou non-exclusive de produits sur un territoire défini',
    price: 600,
    currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_fournisseur', label: 'Nom/Raison sociale du fournisseur', type: 'text', required: true },
      { name: 'adresse_fournisseur', label: 'Adresse du fournisseur', type: 'text', required: true },
      { name: 'nom_distributeur', label: 'Nom/Raison sociale du distributeur', type: 'text', required: true },
      { name: 'adresse_distributeur', label: 'Adresse du distributeur', type: 'text', required: true },
      { name: 'produits', label: 'Description des produits à distribuer', type: 'textarea', required: true },
      { name: 'territoire', label: 'Territoire de distribution', type: 'text', required: true },
      { name: 'type_exclusivite', label: 'Type (exclusif/non exclusif)', type: 'text', required: true },
      { name: 'conditions_prix', label: 'Conditions de prix et remises', type: 'textarea', required: true },
      { name: 'duree_contrat', label: 'Durée du contrat (ex : 2 ans)', type: 'text', required: true },
      { name: 'date_debut', label: 'Date de début', type: 'date', required: true },
      { name: 'lieu_signature', label: 'Lieu de signature', type: 'text', required: true },
      { name: 'date_signature', label: 'Date de signature', type: 'date', required: true },
    ]),
    body: `<h1>CONTRAT DE DISTRIBUTION</h1>

<p><strong>Entre :</strong></p>
<p>{{nom_fournisseur}}, dont le siège social est situé à {{adresse_fournisseur}}, ci-après dénommé « le Fournisseur »,</p>

<p><strong>Et :</strong></p>
<p>{{nom_distributeur}}, dont le siège social est situé à {{adresse_distributeur}}, ci-après dénommé « le Distributeur »,</p>

<h2>Article 1 : Objet</h2>
<p>Le Fournisseur nomme le Distributeur en tant que distributeur {{type_exclusivite}} des produits suivants : {{produits}}, sur le territoire défini à l'Article 2.</p>

<h2>Article 2 : Territoire</h2>
<p>Le Distributeur est autorisé à commercialiser les produits sur le territoire suivant : {{territoire}}.</p>

<h2>Article 3 : Obligations du Distributeur</h2>
<p>Le Distributeur s'engage à : (i) promouvoir activement les produits sur le territoire ; (ii) respecter la politique commerciale et tarifaire du Fournisseur ; (iii) ne pas commercialiser de produits concurrents sans accord écrit préalable ; (iv) fournir des rapports de ventes mensuels au Fournisseur.</p>

<h2>Article 4 : Conditions de prix</h2>
<p>{{conditions_prix}}</p>

<h2>Article 5 : Durée</h2>
<p>Le présent contrat est conclu pour une durée de {{duree_contrat}}, à compter du {{date_debut}}. Il pourra être renouvelé par accord écrit des parties.</p>

<h2>Article 6 : Propriété intellectuelle</h2>
<p>Le Distributeur est autorisé à utiliser les marques et logos du Fournisseur uniquement dans le cadre de la distribution des produits contractuels et conformément aux directives du Fournisseur.</p>

<h2>Article 7 : Résiliation</h2>
<p>Chacune des parties peut résilier le contrat en respectant un préavis de 60 jours. En cas de faute grave, la résiliation peut intervenir sans préavis.</p>

<h2>Article 8 : Loi applicable</h2>
<p>Ce contrat est régi par les dispositions de l'Acte Uniforme OHADA portant sur le droit commercial général. Tout litige sera soumis à l'arbitrage.</p>

<p>Fait à {{lieu_signature}}, le {{date_signature}}, en deux exemplaires originaux.</p>

<table border="1" cellpadding="8" style="width:100%;border-collapse:collapse;">
  <tr>
    <td style="width:50%;text-align:center;"><strong>Le Fournisseur</strong><br/>{{nom_fournisseur}}<br/><br/>Signature : ________________</td>
    <td style="width:50%;text-align:center;"><strong>Le Distributeur</strong><br/>{{nom_distributeur}}<br/><br/>Signature : ________________</td>
  </tr>
</table>`,
    countriesJson: COUNTRIES,
    active: true,
    popularity: 70,
  },

  // ─── 9. Convention de Mécénat ─────────────────────────────────────────────
  {
    code: 'ctr2_mecenat',
    name: 'Convention de Mécénat',
    category: 'juridique_admin',
    description: 'Convention par laquelle une entreprise apporte un soutien financier ou matériel à une association sans contrepartie directe',
    price: 400,
    currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_societe', label: 'Nom de la société mécène', type: 'text', required: true },
      { name: 'adresse_societe', label: 'Adresse de la société', type: 'text', required: true },
      { name: 'representant_societe', label: 'Représentant de la société', type: 'text', required: true },
      { name: 'nom_association', label: "Nom de l'association bénéficiaire", type: 'text', required: true },
      { name: 'adresse_association', label: "Adresse de l'association", type: 'text', required: true },
      { name: 'representant_association', label: "Représentant de l'association", type: 'text', required: true },
      { name: 'objet_association', label: "Objet de l'association", type: 'textarea', required: true },
      { name: 'description_projet', label: 'Description du projet soutenu', type: 'textarea', required: true },
      { name: 'montant_soutien', label: 'Montant du soutien financier (FCFA)', type: 'number', required: false },
      { name: 'soutien_nature', label: 'Soutien en nature (matériel, personnel, local)', type: 'textarea', required: false },
      { name: 'duree_convention', label: 'Durée de la convention (ex : 12 mois)', type: 'text', required: true },
      { name: 'lieu_signature', label: 'Lieu de signature', type: 'text', required: true },
      { name: 'date_signature', label: 'Date de signature', type: 'date', required: true },
    ]),
    body: `<h1>CONVENTION DE MÉCÉNAT</h1>

<p><strong>ENTRE D'UNE PART :</strong></p>
<p>La société {{nom_societe}}, dont le siège social est situé à {{adresse_societe}}, représentée par {{representant_societe}}, ci-après dénommée « la Société »,</p>

<p><strong>ET D'AUTRE PART :</strong></p>
<p>{{nom_association}}, dont le siège est situé à {{adresse_association}}, représentée par {{representant_association}}, ci-après dénommée « l'Association »,</p>

<h2>Étant préalablement exposé que :</h2>
<p>L'Association a pour objet : {{objet_association}}. La Société souhaite apporter son aide à la réalisation du projet soutenu par l'Association.</p>

<h2>Article 1 : Objet</h2>
<p>La présente convention a pour objet de définir les conditions et modalités du soutien apporté par la Société à l'Association dans le cadre du projet suivant : {{description_projet}}.</p>

<h2>Article 2 : Obligations de la Société</h2>
<p>Afin de soutenir le projet, la Société s'engage à :<br/>
— Verser à l'Association la somme de {{montant_soutien}} FCFA (si applicable) ;<br/>
— Mettre à disposition le soutien en nature suivant : {{soutien_nature}} (si applicable).</p>

<h2>Article 3 : Obligations de l'Association</h2>
<p>L'Association s'engage à : (i) utiliser les fonds et ressources reçus exclusivement pour la réalisation du projet ; (ii) fournir à la Société tout document prouvant l'utilisation du soutien dans les 12 mois suivant le versement ; (iii) mentionner le soutien de la Société dans toutes ses communications liées au projet.</p>

<h2>Article 4 : Durée</h2>
<p>La présente convention est conclue pour une durée de {{duree_convention}} à compter de sa date de signature.</p>

<h2>Article 5 : Confidentialité</h2>
<p>Les parties s'engagent à conserver confidentielles les informations de toute nature auxquelles elles pourraient avoir accès dans le cadre de la présente convention.</p>

<h2>Article 6 : Résiliation</h2>
<p>En cas d'inexécution par l'une des parties de ses obligations, la convention pourra être résiliée unilatéralement 30 jours après mise en demeure restée sans effet.</p>

<h2>Article 7 : Litiges</h2>
<p>En cas de litige, les parties s'engagent à rechercher une solution amiable avant toute action judiciaire. À défaut, les tribunaux compétents du lieu du siège social de la Société seront saisis.</p>

<p>Fait à {{lieu_signature}}, le {{date_signature}}, en deux exemplaires originaux.</p>

<table border="1" cellpadding="8" style="width:100%;border-collapse:collapse;">
  <tr>
    <td style="width:50%;text-align:center;"><strong>La Société</strong><br/>{{nom_societe}}<br/><br/>Signature : ________________</td>
    <td style="width:50%;text-align:center;"><strong>L'Association</strong><br/>{{nom_association}}<br/><br/>Signature : ________________</td>
  </tr>
</table>`,
    countriesJson: COUNTRIES,
    active: true,
    popularity: 45,
  },

  // ─── 10. Contrat de Vente de Marchandises ─────────────────────────────────
  {
    code: 'ctr2_vente_marchandises',
    name: 'Contrat de Vente de Marchandises',
    category: 'commercial_financier',
    description: 'Vente commerciale de marchandises entre deux entreprises, conforme à l\'OHADA',
    price: 400,
    currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_vendeur', label: 'Nom/Raison sociale du vendeur', type: 'text', required: true },
      { name: 'adresse_vendeur', label: 'Adresse du vendeur', type: 'text', required: true },
      { name: 'nom_acheteur', label: "Nom/Raison sociale de l'acheteur", type: 'text', required: true },
      { name: 'adresse_acheteur', label: "Adresse de l'acheteur", type: 'text', required: true },
      { name: 'description_marchandises', label: 'Description des marchandises', type: 'textarea', required: true },
      { name: 'quantite', label: 'Quantité', type: 'text', required: true },
      { name: 'prix_unitaire', label: 'Prix unitaire (FCFA)', type: 'number', required: true },
      { name: 'prix_total', label: 'Prix total (FCFA)', type: 'number', required: true },
      { name: 'modalites_paiement', label: 'Modalités de paiement', type: 'textarea', required: true },
      { name: 'lieu_livraison', label: 'Lieu de livraison', type: 'text', required: true },
      { name: 'date_livraison', label: 'Date de livraison prévue', type: 'date', required: true },
      { name: 'ville_signature', label: 'Ville de signature', type: 'text', required: true },
      { name: 'date_signature', label: 'Date de signature', type: 'date', required: true },
    ]),
    body: `<h1>CONTRAT DE VENTE DE MARCHANDISES</h1>

<p><strong>Entre :</strong></p>
<p>{{nom_vendeur}}, dont le siège social est situé à {{adresse_vendeur}}, ci-après dénommé « le Vendeur »,</p>

<p><strong>Et :</strong></p>
<p>{{nom_acheteur}}, dont le siège social est situé à {{adresse_acheteur}}, ci-après dénommé « l'Acheteur »,</p>

<h2>Article 1 : Objet</h2>
<p>Le Vendeur s'engage à livrer à l'Acheteur les marchandises suivantes : {{description_marchandises}}, en quantité de {{quantite}}.</p>

<h2>Article 2 : Prix</h2>
<p>Le prix unitaire est fixé à {{prix_unitaire}} FCFA, soit un prix total de {{prix_total}} FCFA toutes taxes comprises.</p>

<h2>Article 3 : Modalités de paiement</h2>
<p>{{modalites_paiement}}</p>

<h2>Article 4 : Livraison</h2>
<p>Les marchandises seront livrées à {{lieu_livraison}} au plus tard le {{date_livraison}}. Les risques sont transférés à l'Acheteur dès la livraison.</p>

<h2>Article 5 : Garanties</h2>
<p>Le Vendeur garantit que les marchandises sont conformes aux spécifications convenues, libres de tout vice caché et de tout droit de tiers. En cas de non-conformité, l'Acheteur dispose de 8 jours après réception pour formuler ses réserves par écrit.</p>

<h2>Article 6 : Réserve de propriété</h2>
<p>Le Vendeur se réserve la propriété des marchandises jusqu'au paiement intégral du prix. Néanmoins, les risques sont transférés à l'Acheteur dès la livraison.</p>

<h2>Article 7 : Force majeure</h2>
<p>Aucune des parties ne pourra être tenue responsable de l'inexécution de ses obligations en cas de force majeure dûment établie.</p>

<h2>Article 8 : Loi applicable</h2>
<p>Le présent contrat est régi par les dispositions de l'Acte Uniforme OHADA portant sur le droit commercial général. Tout litige sera soumis aux tribunaux compétents du lieu du siège du Vendeur.</p>

<p>Fait à {{ville_signature}}, le {{date_signature}}, en deux exemplaires originaux.</p>

<table border="1" cellpadding="8" style="width:100%;border-collapse:collapse;">
  <tr>
    <td style="width:50%;text-align:center;"><strong>Le Vendeur</strong><br/>{{nom_vendeur}}<br/><br/>Signature : ________________</td>
    <td style="width:50%;text-align:center;"><strong>L'Acheteur</strong><br/>{{nom_acheteur}}<br/><br/>Signature : ________________</td>
  </tr>
</table>`,
    countriesJson: COUNTRIES,
    active: true,
    popularity: 75,
  },

  // ─── 11. Protocole d'Accord ───────────────────────────────────────────────
  {
    code: 'ctr2_protocole_accord',
    name: "Protocole d'Accord (MOU)",
    category: 'juridique_admin',
    description: "Document précontractuel formalisant la volonté de coopérer entre deux parties avant la signature d'un contrat définitif",
    price: 400,
    currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_partie_a', label: 'Nom/Raison sociale Partie A', type: 'text', required: true },
      { name: 'adresse_partie_a', label: 'Adresse Partie A', type: 'text', required: true },
      { name: 'representant_a', label: 'Représentant Partie A', type: 'text', required: true },
      { name: 'nom_partie_b', label: 'Nom/Raison sociale Partie B', type: 'text', required: true },
      { name: 'adresse_partie_b', label: 'Adresse Partie B', type: 'text', required: true },
      { name: 'representant_b', label: 'Représentant Partie B', type: 'text', required: true },
      { name: 'objet_cooperation', label: 'Objet de la coopération envisagée', type: 'textarea', required: true },
      { name: 'engagements_a', label: 'Engagements de la Partie A', type: 'textarea', required: true },
      { name: 'engagements_b', label: 'Engagements de la Partie B', type: 'textarea', required: true },
      { name: 'duree_protocole', label: 'Durée du protocole (ex : 6 mois)', type: 'text', required: true },
      { name: 'lieu_signature', label: 'Lieu de signature', type: 'text', required: true },
      { name: 'date_signature', label: 'Date de signature', type: 'date', required: true },
    ]),
    body: `<h1>PROTOCOLE D'ACCORD</h1>
<h3>(Memorandum of Understanding)</h3>

<p><strong>Entre :</strong></p>
<p>{{nom_partie_a}}, dont l'adresse est : {{adresse_partie_a}}, représentée par {{representant_a}}, ci-après dénommée « la Partie A »,</p>

<p><strong>Et :</strong></p>
<p>{{nom_partie_b}}, dont l'adresse est : {{adresse_partie_b}}, représentée par {{representant_b}}, ci-après dénommée « la Partie B »,</p>

<p>Collectivement désignées « les Parties »,</p>

<h2>Préambule</h2>
<p>Les Parties expriment leur volonté de coopérer dans le cadre du projet ci-après décrit, sous réserve de la signature d'un accord définitif. Le présent protocole d'accord n'a pas de valeur contractuelle contraignante, sauf dispositions expressément mentionnées.</p>

<h2>Article 1 : Objet de la coopération</h2>
<p>Les Parties entendent coopérer dans le cadre du projet ou secteur suivant : {{objet_cooperation}}.</p>

<h2>Article 2 : Engagements de la Partie A</h2>
<p>{{engagements_a}}</p>

<h2>Article 3 : Engagements de la Partie B</h2>
<p>{{engagements_b}}</p>

<h2>Article 4 : Confidentialité</h2>
<p>Les Parties s'engagent à maintenir la stricte confidentialité de toutes les informations échangées dans le cadre du présent protocole, pendant sa durée et pendant une période de 2 ans après son terme.</p>

<h2>Article 5 : Exclusivité des négociations</h2>
<p>Durant la période de validité du présent protocole, les Parties s'engagent à ne pas mener de négociations similaires avec des tiers concurrents sans en informer préalablement l'autre Partie.</p>

<h2>Article 6 : Durée</h2>
<p>Le présent protocole est valable pour une durée de {{duree_protocole}} à compter de sa signature. À l'issue de ce délai, les Parties devront avoir signé un accord définitif ou constater l'échec des négociations.</p>

<h2>Article 7 : Non-engagement</h2>
<p>Le présent protocole ne saurait être interprété comme créant une obligation ferme de contracter. Il formalise uniquement la volonté des Parties de négocier de bonne foi.</p>

<h2>Article 8 : Loi applicable</h2>
<p>Le présent protocole est régi par le droit en vigueur dans l'Espace OHADA. Tout différend sera soumis à la médiation avant tout recours judiciaire.</p>

<p>Fait à {{lieu_signature}}, le {{date_signature}}, en deux exemplaires originaux.</p>

<table border="1" cellpadding="8" style="width:100%;border-collapse:collapse;">
  <tr>
    <td style="width:50%;text-align:center;"><strong>La Partie A</strong><br/>{{nom_partie_a}}<br/><br/>Signature : ________________</td>
    <td style="width:50%;text-align:center;"><strong>La Partie B</strong><br/>{{nom_partie_b}}<br/><br/>Signature : ________________</td>
  </tr>
</table>`,
    countriesJson: COUNTRIES,
    active: true,
    popularity: 70,
  },

  // ─── 12. Contrat d'Entreprise (sous-traitance de travaux) ─────────────────
  {
    code: 'ctr2_contrat_entreprise',
    name: "Contrat d'Entreprise (Sous-traitance de Travaux)",
    category: 'commercial_financier',
    description: "Contrat par lequel un entrepreneur s'engage à réaliser des travaux ou ouvrages pour le compte d'un maître d'ouvrage",
    price: 500,
    currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_maitre_ouvrage', label: "Nom du maître d'ouvrage", type: 'text', required: true },
      { name: 'adresse_maitre_ouvrage', label: "Adresse du maître d'ouvrage", type: 'text', required: true },
      { name: 'nom_entrepreneur', label: "Nom/Raison sociale de l'entrepreneur", type: 'text', required: true },
      { name: 'adresse_entrepreneur', label: "Adresse de l'entrepreneur", type: 'text', required: true },
      { name: 'description_travaux', label: 'Description des travaux à réaliser', type: 'textarea', required: true },
      { name: 'lieu_travaux', label: 'Lieu des travaux', type: 'text', required: true },
      { name: 'prix_forfaitaire', label: 'Prix forfaitaire (FCFA)', type: 'number', required: true },
      { name: 'modalites_paiement', label: 'Modalités de paiement', type: 'textarea', required: true },
      { name: 'date_debut', label: 'Date de début des travaux', type: 'date', required: true },
      { name: 'delai_execution', label: "Délai d'exécution (ex : 90 jours)", type: 'text', required: true },
      { name: 'penalites_retard', label: 'Pénalités de retard (FCFA/jour)', type: 'number', required: false },
      { name: 'ville_signature', label: 'Ville de signature', type: 'text', required: true },
      { name: 'date_signature', label: 'Date de signature', type: 'date', required: true },
    ]),
    body: `<h1>CONTRAT D'ENTREPRISE</h1>

<p><strong>Entre :</strong></p>
<p>{{nom_maitre_ouvrage}}, dont l'adresse est : {{adresse_maitre_ouvrage}}, ci-après dénommé « le Maître d'Ouvrage »,</p>

<p><strong>Et :</strong></p>
<p>{{nom_entrepreneur}}, dont l'adresse est : {{adresse_entrepreneur}}, ci-après dénommé « l'Entrepreneur »,</p>

<h2>Article 1 : Objet</h2>
<p>Le Maître d'Ouvrage confie à l'Entrepreneur la réalisation des travaux suivants : {{description_travaux}}, sur le site situé à {{lieu_travaux}}.</p>

<h2>Article 2 : Prix et modalités de paiement</h2>
<p>Les travaux sont réalisés pour un prix forfaitaire de {{prix_forfaitaire}} FCFA toutes taxes comprises.<br/>
Modalités de paiement : {{modalites_paiement}}.</p>

<h2>Article 3 : Délai d'exécution</h2>
<p>Les travaux débuteront le {{date_debut}} et devront être achevés dans un délai de {{delai_execution}} à compter de cette date.</p>

<h2>Article 4 : Pénalités de retard</h2>
<p>En cas de retard imputable à l'Entrepreneur, des pénalités de {{penalites_retard}} FCFA par jour calendaire de retard seront appliquées, dans la limite de 10% du prix total des travaux.</p>

<h2>Article 5 : Obligations de l'Entrepreneur</h2>
<p>L'Entrepreneur s'engage à : (i) réaliser les travaux dans les règles de l'art ; (ii) utiliser des matériaux de qualité conformes aux spécifications convenues ; (iii) maintenir le chantier propre et sécurisé ; (iv) souscrire une assurance responsabilité civile couvrant les risques liés aux travaux.</p>

<h2>Article 6 : Réception des travaux</h2>
<p>À l'achèvement des travaux, le Maître d'Ouvrage procèdera à la réception après visite contradictoire. Les éventuelles réserves seront consignées dans un procès-verbal de réception.</p>

<h2>Article 7 : Garanties</h2>
<p>L'Entrepreneur garantit la conformité des travaux pendant une période de 12 mois à compter de la réception sans réserves. Durant cette période, il prend en charge gratuitement les réparations des malfaçons constatées.</p>

<h2>Article 8 : Loi applicable</h2>
<p>Le présent contrat est régi par l'Acte Uniforme OHADA portant sur le droit commercial général. Tout litige sera soumis aux tribunaux compétents du lieu des travaux.</p>

<p>Fait à {{ville_signature}}, le {{date_signature}}, en deux exemplaires originaux.</p>

<table border="1" cellpadding="8" style="width:100%;border-collapse:collapse;">
  <tr>
    <td style="width:50%;text-align:center;"><strong>Le Maître d'Ouvrage</strong><br/>{{nom_maitre_ouvrage}}<br/><br/>Signature : ________________</td>
    <td style="width:50%;text-align:center;"><strong>L'Entrepreneur</strong><br/>{{nom_entrepreneur}}<br/><br/>Signature : ________________</td>
  </tr>
</table>`,
    countriesJson: COUNTRIES,
    active: true,
    popularity: 65,
  },

  // ─── 13. Contrat de Développement Logiciel Personnalisé ───────────────────
  {
    code: 'ctr2_developpement_logiciel_custom',
    name: 'Contrat de Développement de Logiciel Personnalisé',
    category: 'commercial_financier',
    description: 'Développement d\'une application ou logiciel sur mesure avec transfert de propriété intellectuelle',
    price: 600,
    currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_developpeur', label: 'Nom/Raison sociale du prestataire développeur', type: 'text', required: true },
      { name: 'adresse_developpeur', label: 'Adresse du développeur', type: 'text', required: true },
      { name: 'nom_client', label: 'Nom/Raison sociale du client', type: 'text', required: true },
      { name: 'adresse_client', label: 'Adresse du client', type: 'text', required: true },
      { name: 'description_logiciel', label: 'Description du logiciel à développer', type: 'textarea', required: true },
      { name: 'fonctionnalites_cles', label: 'Fonctionnalités clés (cahier des charges)', type: 'textarea', required: true },
      { name: 'prix_projet', label: 'Prix total du projet (FCFA)', type: 'number', required: true },
      { name: 'modalites_paiement', label: 'Modalités de paiement', type: 'textarea', required: true },
      { name: 'delai_livraison', label: 'Délai de livraison (ex : 3 mois)', type: 'text', required: true },
      { name: 'date_debut', label: 'Date de début du développement', type: 'date', required: true },
      { name: 'garantie_bugs', label: 'Période de garantie correction des bugs (ex : 6 mois)', type: 'text', required: false },
      { name: 'ville_signature', label: 'Ville de signature', type: 'text', required: true },
      { name: 'date_signature', label: 'Date de signature', type: 'date', required: true },
    ]),
    body: `<h1>CONTRAT DE DÉVELOPPEMENT DE LOGICIEL PERSONNALISÉ</h1>

<p><strong>Entre :</strong></p>
<p>{{nom_developpeur}}, dont l'adresse est : {{adresse_developpeur}}, ci-après dénommé « le Développeur »,</p>

<p><strong>Et :</strong></p>
<p>{{nom_client}}, dont l'adresse est : {{adresse_client}}, ci-après dénommé « le Client »,</p>

<h2>Article 1 : Objet</h2>
<p>Le Client engage le Développeur pour concevoir, développer et livrer un logiciel personnalisé selon les spécifications suivantes : {{description_logiciel}}.</p>

<h2>Article 2 : Cahier des charges</h2>
<p>Les fonctionnalités et exigences spécifiques du projet sont les suivantes : {{fonctionnalites_cles}}. Un cahier des charges technique détaillé sera annexé au présent contrat.</p>

<h2>Article 3 : Responsabilités du Client</h2>
<p>Le Client s'engage à fournir au Développeur toutes les informations, données, ressources et accès nécessaires au développement. Le Client est responsable de la validation des livrables intermédiaires et finaux.</p>

<h2>Article 4 : Livraison</h2>
<p>Le développement débutera le {{date_debut}}. Le logiciel devra être livré dans un délai de {{delai_livraison}} à compter de cette date, par voie électronique ou tout autre moyen convenu entre les parties.</p>

<h2>Article 5 : Prix et paiement</h2>
<p>Le prix total du projet est de {{prix_projet}} FCFA. Modalités de paiement : {{modalites_paiement}}.</p>

<h2>Article 6 : Propriété intellectuelle</h2>
<p>La propriété intellectuelle du logiciel développé appartient au Développeur jusqu'au paiement intégral de tous les honoraires. Une fois le paiement intégral reçu, le Développeur transfèrera au Client tous les droits de propriété intellectuelle sur le logiciel livré.</p>

<h2>Article 7 : Confidentialité</h2>
<p>Les deux parties conviennent de maintenir la confidentialité de toutes les informations sensibles échangées dans le cadre du présent contrat.</p>

<h2>Article 8 : Garantie</h2>
<p>Le Développeur garantit le bon fonctionnement du logiciel et s'engage à corriger gratuitement tout bug ou défaut constaté dans un délai de {{garantie_bugs}} après la livraison finale acceptée.</p>

<h2>Article 9 : Loi applicable</h2>
<p>Ce contrat est régi par les lois en vigueur dans l'Espace OHADA. Tout litige sera soumis à la médiation puis, à défaut, à l'arbitrage.</p>

<p>Fait à {{ville_signature}}, le {{date_signature}}, en deux exemplaires originaux.</p>

<table border="1" cellpadding="8" style="width:100%;border-collapse:collapse;">
  <tr>
    <td style="width:50%;text-align:center;"><strong>Le Développeur</strong><br/>{{nom_developpeur}}<br/><br/>Signature : ________________</td>
    <td style="width:50%;text-align:center;"><strong>Le Client</strong><br/>{{nom_client}}<br/><br/>Signature : ________________</td>
  </tr>
</table>`,
    countriesJson: COUNTRIES,
    active: true,
    popularity: 60,
  },

  // ─── 14. Contrat d'Apport en Capital ──────────────────────────────────────
  {
    code: 'ctr2_apport_capital',
    name: "Contrat d'Apport en Capital",
    category: 'commercial_financier',
    description: 'Convention par laquelle un apporteur met des fonds ou biens à disposition d\'une société en échange de parts sociales',
    price: 600,
    currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_apporteur', label: "Nom/Raison sociale de l'apporteur", type: 'text', required: true },
      { name: 'adresse_apporteur', label: "Adresse de l'apporteur", type: 'text', required: true },
      { name: 'nom_societe', label: 'Nom de la société bénéficiaire', type: 'text', required: true },
      { name: 'siege_societe', label: 'Siège social de la société', type: 'text', required: true },
      { name: 'forme_juridique', label: 'Forme juridique de la société', type: 'text', required: true },
      { name: 'nature_apport', label: "Nature de l'apport (numéraire/nature)", type: 'text', required: true },
      { name: 'montant_apport', label: "Montant ou valeur de l'apport (FCFA)", type: 'number', required: true },
      { name: 'nombre_parts', label: 'Nombre de parts sociales attribuées en contrepartie', type: 'number', required: true },
      { name: 'valeur_nominale_part', label: 'Valeur nominale par part (FCFA)', type: 'number', required: true },
      { name: 'droits_apporteur', label: "Droits de l'apporteur (dividendes, vote)", type: 'textarea', required: false },
      { name: 'ville_signature', label: 'Ville de signature', type: 'text', required: true },
      { name: 'date_signature', label: 'Date de signature', type: 'date', required: true },
    ]),
    body: `<h1>CONTRAT D'APPORT EN CAPITAL</h1>

<p><strong>Entre :</strong></p>
<p>{{nom_apporteur}}, domicilié à {{adresse_apporteur}}, ci-après dénommé « l'Apporteur »,</p>

<p><strong>Et :</strong></p>
<p>{{nom_societe}}, {{forme_juridique}}, dont le siège social est situé à {{siege_societe}}, ci-après dénommée « la Société »,</p>

<h2>Article 1 : Objet</h2>
<p>Le présent contrat a pour objet de formaliser l'apport effectué par l'Apporteur au capital de la Société, conformément aux statuts de celle-ci et aux dispositions de l'Acte Uniforme OHADA relatif au droit des sociétés commerciales.</p>

<h2>Article 2 : Nature et montant de l'apport</h2>
<p>L'Apporteur réalise un apport de nature {{nature_apport}}, d'une valeur de {{montant_apport}} FCFA.</p>

<h2>Article 3 : Contrepartie</h2>
<p>En contrepartie de son apport, l'Apporteur reçoit {{nombre_parts}} parts sociales de la Société, d'une valeur nominale de {{valeur_nominale_part}} FCFA chacune.</p>

<h2>Article 4 : Droits de l'Apporteur</h2>
<p>{{droits_apporteur}}<br/>
L'Apporteur bénéficie de tous les droits attachés à ses parts sociales, notamment le droit de vote aux assemblées générales et le droit aux dividendes proportionnellement à sa participation.</p>

<h2>Article 5 : Libération de l'apport</h2>
<p>L'apport en numéraire sera libéré intégralement à la signature du présent contrat. L'apport en nature, le cas échéant, sera transféré selon les modalités convenues et évaluées par un commissaire aux apports si requis par la loi.</p>

<h2>Article 6 : Obligations de la Société</h2>
<p>La Société s'engage à utiliser les fonds apportés conformément à son objet social et dans l'intérêt commun des associés.</p>

<h2>Article 7 : Loi applicable</h2>
<p>Le présent contrat est régi par l'Acte Uniforme OHADA relatif au droit des sociétés commerciales et du groupement d'intérêt économique. Tout litige sera soumis aux juridictions compétentes.</p>

<p>Fait à {{ville_signature}}, le {{date_signature}}, en deux exemplaires originaux.</p>

<table border="1" cellpadding="8" style="width:100%;border-collapse:collapse;">
  <tr>
    <td style="width:50%;text-align:center;"><strong>L'Apporteur</strong><br/>{{nom_apporteur}}<br/><br/>Signature : ________________</td>
    <td style="width:50%;text-align:center;"><strong>La Société</strong><br/>{{nom_societe}}<br/><br/>Signature : ________________</td>
  </tr>
</table>`,
    countriesJson: COUNTRIES,
    active: true,
    popularity: 55,
  },

  // ─── 15. Convention de Trésorerie (Cash Pooling) ──────────────────────────
  {
    code: 'ctr2_convention_tresorerie',
    name: 'Convention de Trésorerie (Cash Pooling)',
    category: 'commercial_financier',
    description: 'Accord de centralisation de trésorerie entre sociétés d\'un même groupe pour optimiser la gestion des liquidités',
    price: 600,
    currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_societe_mere', label: 'Nom de la société mère (centralisatrice)', type: 'text', required: true },
      { name: 'adresse_societe_mere', label: 'Adresse de la société mère', type: 'text', required: true },
      { name: 'nom_filiale', label: 'Nom de la filiale participante', type: 'text', required: true },
      { name: 'adresse_filiale', label: 'Adresse de la filiale', type: 'text', required: true },
      { name: 'banque_compte_central', label: 'Banque et numéro du compte centralisateur', type: 'text', required: true },
      { name: 'taux_interet_debiteur', label: 'Taux d\'intérêt débiteur applicable (%)', type: 'text', required: true },
      { name: 'taux_interet_crediteur', label: 'Taux d\'intérêt créditeur applicable (%)', type: 'text', required: true },
      { name: 'periodicite_consolidation', label: 'Périodicité de consolidation (ex : quotidienne)', type: 'text', required: true },
      { name: 'duree_convention', label: 'Durée de la convention', type: 'text', required: true },
      { name: 'ville_signature', label: 'Ville de signature', type: 'text', required: true },
      { name: 'date_signature', label: 'Date de signature', type: 'date', required: true },
    ]),
    body: `<h1>CONVENTION DE TRÉSORERIE (CASH POOLING)</h1>

<p><strong>Entre :</strong></p>
<p>{{nom_societe_mere}}, dont le siège social est situé à {{adresse_societe_mere}}, ci-après dénommée « la Société Centralisatrice »,</p>

<p><strong>Et :</strong></p>
<p>{{nom_filiale}}, dont le siège social est situé à {{adresse_filiale}}, ci-après dénommée « la Filiale »,</p>

<h2>Préambule</h2>
<p>Les parties sont liées par des liens capitalistiques et souhaitent optimiser la gestion de leur trésorerie respective en mettant en place un mécanisme de centralisation de trésorerie conforme à la réglementation applicable.</p>

<h2>Article 1 : Objet</h2>
<p>La présente convention a pour objet de définir les modalités selon lesquelles les soldes de trésorerie de la Filiale seront centralisés vers le compte de la Société Centralisatrice, ouvert auprès de {{banque_compte_central}}, et les conditions dans lesquelles la Société Centralisatrice pourra mettre des fonds à disposition de la Filiale.</p>

<h2>Article 2 : Mécanisme de centralisation</h2>
<p>{{periodicite_consolidation}}, les soldes créditeurs et débiteurs des comptes de la Filiale seront consolidés vers le compte centralisateur. Les transferts sont réalisés par virement intra-groupe.</p>

<h2>Article 3 : Rémunération</h2>
<p>Les avances consenties par la Société Centralisatrice à la Filiale porteront intérêt au taux de {{taux_interet_debiteur}}% par an. Les soldes créditeurs de la Filiale placés sur le compte centralisateur porteront intérêt au taux de {{taux_interet_crediteur}}% par an. Ces intérêts seront calculés et débités/crédités trimestriellement.</p>

<h2>Article 4 : Obligations des parties</h2>
<p>La Société Centralisatrice s'engage à : (i) gérer le compte centralisateur de manière transparente ; (ii) remettre à la Filiale un relevé mensuel détaillé des mouvements et des intérêts calculés ; (iii) restituer à première demande les fonds de la Filiale sous réserve des besoins du groupe.</p>

<h2>Article 5 : Durée</h2>
<p>La présente convention est conclue pour une durée de {{duree_convention}}, renouvelable par tacite reconduction sauf dénonciation notifiée par l'une des parties avec un préavis de 30 jours.</p>

<h2>Article 6 : Loi applicable</h2>
<p>La présente convention est régie par les dispositions de l'Acte Uniforme OHADA relatif au droit des sociétés et par la réglementation bancaire et fiscale en vigueur. Tout litige sera soumis aux tribunaux compétents.</p>

<p>Fait à {{ville_signature}}, le {{date_signature}}, en deux exemplaires originaux.</p>

<table border="1" cellpadding="8" style="width:100%;border-collapse:collapse;">
  <tr>
    <td style="width:50%;text-align:center;"><strong>La Société Centralisatrice</strong><br/>{{nom_societe_mere}}<br/><br/>Signature : ________________</td>
    <td style="width:50%;text-align:center;"><strong>La Filiale</strong><br/>{{nom_filiale}}<br/><br/>Signature : ________________</td>
  </tr>
</table>`,
    countriesJson: COUNTRIES,
    active: true,
    popularity: 45,
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
  console.log(`✅ Seed Drive4 Méga Pack terminé.`);
  console.log(`   Templates du script : ${templates.length} (créés : ${created}, mis à jour : ${updated})`);
  console.log(`   ➜ Total de templates en base : ${total}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
