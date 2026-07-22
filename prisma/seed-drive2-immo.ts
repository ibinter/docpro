// Seed Drive2 IMMOBILIER — Agent Drive2-2/10 : 12 modèles IMMOBILIERS convertis
// depuis le Google Drive IBIG (Kit IBI070 « 125 contrats promotion immobilière »
// + JUR-004 « 125 contrats professionnels de l'immobilier »).
// Script ADDITIF : upsert par code — n'écrase pas les templates existants.
// Exécution : npx tsx prisma/seed-drive2-immo.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type CatalogTemplate = {
  code: string;
  name: string;
  category: string;
  price: number;
  priceMax: number;
  description: string;
  fieldsJson: string;
  body: string;
  popularity: number;
  countriesJson?: string;
};

const F = (fields: object[]) => JSON.stringify(fields);

// Notes pays communes (source : modèles IBIG zone CFA).
const C_TRANSACTION = JSON.stringify({
  OHADA: { note: 'Conforme aux usages OHADA/zone CFA et au droit foncier local (titre foncier, ACD…) — montants en FCFA.' },
  FR: { note: 'Adapter aux exigences du Code de la construction et de l’habitation et de la loi ALUR (vente immobilière encadrée par acte notarié).' },
});
const C_MANDAT = JSON.stringify({
  OHADA: { note: 'Conforme aux usages OHADA/zone CFA — vérifier l’agrément d’agent immobilier exigé par la réglementation locale.' },
  FR: { note: 'Adapter aux exigences de la loi Hoguet n°70-9 (carte professionnelle, registre des mandats, mandat écrit obligatoire).' },
});
const C_BAIL = JSON.stringify({
  OHADA: { note: 'Conforme aux usages OHADA/zone CFA — pour les baux à usage professionnel, se référer à l’Acte uniforme OHADA sur le droit commercial général.' },
  FR: { note: 'Adapter aux exigences de la loi n°89-462 et de la loi ALUR (baux d’habitation) ou de l’article 57 A de la loi n°86-1290 (bail professionnel).' },
});
const C_CONSTRUCTION = JSON.stringify({
  OHADA: { note: 'Conforme aux usages OHADA/zone CFA — montants en FCFA.' },
  FR: { note: 'Adapter aux exigences du Code de la construction et de l’habitation (garanties décennale, biennale et de parfait achèvement) et à la loi n°77-2 sur l’architecture.' },
});
const C_COPRO = JSON.stringify({
  OHADA: { note: 'Conforme aux usages OHADA/zone CFA — vérifier le statut local de la copropriété des immeubles bâtis.' },
  FR: { note: 'Adapter aux exigences de la loi n°65-557 fixant le statut de la copropriété et du contrat type de syndic (décret ALUR).' },
});

const templates: CatalogTemplate[] = [
  // ── 1. Contrat de vente en l'état futur d'achèvement (VEFA) ────────────────
  {
    code: 'immo_vefa', name: 'Contrat de vente en l’état futur d’achèvement (VEFA)', category: 'immobilier',
    price: 5000, priceMax: 7000, popularity: 65,
    description: 'Achetez ou vendez un logement sur plan en toute sécurité : prix, échéancier lié à l’avancement des travaux, garanties du promoteur et rétractation.',
    fieldsJson: F([
      { key: 'promoteur', label: 'Identification complète du Vendeur / Promoteur (dénomination, forme juridique, siège social, représentant et qualité, RCCM)', type: 'textarea', required: true },
      { key: 'acheteur', label: 'Identification complète de l’Acheteur (nom, adresse, contacts, statut juridique)', type: 'textarea', required: true },
      { key: 'projet', label: 'Description du projet immobilier (nom, emplacement, caractéristiques du développement)', type: 'textarea', required: true },
      { key: 'description_bien', label: 'Description précise du bien (localisation dans le projet, surface habitable, pièces, matériaux, finitions)', type: 'textarea', required: true },
      { key: 'prix_vente', label: 'Prix de vente en chiffres et en lettres (FCFA)', type: 'text', required: true },
      { key: 'echeancier', label: 'Échéancier de paiement selon l’avancement des travaux (phases et pourcentages)', type: 'textarea', required: true },
      { key: 'delai_livraison', label: 'Délai ou date de livraison prévue', type: 'text', required: true },
      { key: 'lieu', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE VENTE EN L'ÉTAT FUTUR D'ACHÈVEMENT (VEFA)</h1><p><strong>ENTRE :</strong></p><p><strong>Le Vendeur (Promoteur Immobilier) :</strong><br/>{{promoteur}}</p><p><strong>ET :</strong></p><p><strong>L'Acheteur :</strong><br/>{{acheteur}}</p><h2>Préambule</h2><p>{{projet}}</p><p>Ce préambule situe le contrat dans son contexte et offre une vue d'ensemble du projet.</p><h2>Article 1 : Objet du Contrat</h2><p>Ce contrat a pour objet la vente d'un bien immobilier (appartement, maison) situé dans un projet en cours de construction. L'Acheteur acquiert le bien en l'état futur d'achèvement, ce qui signifie qu'il s'engage à acheter le bien tel qu'il sera une fois les travaux terminés.</p><h2>Article 2 : Description du Bien</h2><p>{{description_bien}}</p><p>Ce détail est essentiel pour que l'Acheteur comprenne exactement ce qu'il achète.</p><h2>Article 3 : Prix de Vente</h2><p>Le prix de vente est fixé à {{prix_vente}} FCFA. Ce prix comprend le coût de construction, les frais de notaire, les taxes applicables et tout autre frais associé. Les conditions de révision du prix en cas de modifications substantielles du projet doivent être clairement établies.</p><h2>Article 4 : Paiements et Échelonnements</h2><p>Les paiements sont échelonnés selon l'avancement des travaux, conformément à l'échéancier suivant : {{echeancier}}.</p><p>Les conditions de versement des fonds sont spécifiées ci-dessus, ainsi que les conséquences d'un retard de paiement.</p><h2>Article 5 : Transfert de Propriété et Risques</h2><p>Le transfert de propriété sera effectif à la livraison du bien, prévue le {{delai_livraison}}, avec la remise des clés. Les risques liés au bien (détérioration, destruction) sont transférés à l'Acheteur dès ce moment. Les assurances nécessaires pendant la période de construction doivent être clairement définies.</p><h2>Article 6 : Obligations du Promoteur</h2><p>Le Promoteur s'engage à réaliser la construction conformément au plan approuvé, dans les délais convenus et avec les matériaux spécifiés. Toute modification substantielle doit être communiquée à l'Acheteur et approuvée par lui.</p><h2>Article 7 : Garanties Offertes par le Promoteur</h2><p>Le Promoteur offre notamment la garantie de parfait achèvement, la garantie biennale et la garantie décennale. Ces garanties protègent l'Acheteur contre les vices de construction et les défauts de conformité.</p><h2>Article 8 : Droits et Obligations de l'Acheteur</h2><p>L'Acheteur s'engage à payer le prix selon l'échéancier établi et à respecter toutes les conditions du contrat. Il a le droit de visiter le chantier à des moments convenus pour vérifier l'avancement des travaux.</p><h2>Article 9 : Conditions de Rétractation et d'Annulation</h2><p>Les conditions dans lesquelles l'Acheteur peut se rétracter ou annuler la vente, ainsi que les pénalités ou remboursements applicables dans de tels cas, sont précisées en annexe du présent contrat.</p><h2>Article 10 : Résolution des Litiges</h2><p>Tout litige relatif au présent contrat sera résolu par voie de médiation ou d'arbitrage ; à défaut, il sera porté devant la juridiction compétente du lieu de situation du bien.</p><h2>Article 11 : Dispositions Finales</h2><p>Les clauses générales concernant la validité du contrat, les modifications éventuelles et les notifications entre les parties figurent en annexe. Toute modification doit être faite par écrit et signée par les deux parties.</p><p class="signatures">Fait à {{lieu}}, le {{date_jour}}.<br/><br/>Signature du Vendeur (signature et cachet) — Signature de l'Acheteur</p></div>`,
    countriesJson: C_TRANSACTION,
  },

  // ── 2. Contrat de réservation d'un logement neuf ───────────────────────────
  {
    code: 'immo_reservation_logement_neuf', name: 'Contrat de réservation d’un logement neuf', category: 'immobilier',
    price: 3500, priceMax: 6000, popularity: 58,
    description: 'Réservez un logement neuf avant sa construction : dépôt de garantie, délai de rétractation, prix prévisionnel et engagement de vente encadrés.',
    fieldsJson: F([
      { key: 'promoteur', label: 'Identification complète du Promoteur / Vendeur (société, siège social, représentant et qualité)', type: 'textarea', required: true },
      { key: 'reservataire', label: 'Identification complète du Réservataire / Acheteur (nom, adresse, contacts)', type: 'textarea', required: true },
      { key: 'projet', label: 'Description du projet de construction (emplacement, type de logements, spécifications générales)', type: 'textarea', required: true },
      { key: 'description_logement', label: 'Description du logement réservé (situation, type, surface habitable, équipements et finitions prévus)', type: 'textarea', required: true },
      { key: 'depot_garantie', label: 'Montant du dépôt de garantie et modalités de versement (FCFA)', type: 'text', required: true },
      { key: 'delai_retractation', label: 'Délai de rétractation du Réservataire (en jours)', type: 'text', required: true },
      { key: 'prix_previsionnel', label: 'Prix de vente prévisionnel du logement (FCFA)', type: 'text', required: true },
      { key: 'delai_acte', label: 'Délai prévu pour la signature de l’acte de vente définitif', type: 'text', required: true },
      { key: 'lieu', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE RÉSERVATION D'UN LOGEMENT NEUF</h1><p><strong>Entre les soussignés :</strong></p><p><strong>Le Promoteur / Vendeur :</strong><br/>{{promoteur}}</p><p><strong>Le Réservataire / Acheteur :</strong><br/>{{reservataire}}</p><h2>Préambule</h2><p>{{projet}}</p><h2>Article 1 : Objet</h2><p>Ce contrat a pour objet la réservation par le Réservataire d'un logement neuf, décrit ci-après, dans le cadre du projet immobilier développé par le Promoteur.</p><h2>Article 2 : Description du Logement</h2><p>{{description_logement}}</p><h2>Article 3 : Conditions de Réservation</h2><p>3.1. <strong>Dépôt de Garantie :</strong> le Réservataire verse un dépôt de garantie de {{depot_garantie}} FCFA. Ce dépôt sera imputé sur le prix de vente en cas de réalisation de la vente, ou restitué dans les conditions prévues au présent contrat.</p><p>3.2. <strong>Délai de Rétractation :</strong> le Réservataire dispose d'un délai de rétractation de {{delai_retractation}} jours à compter de la signature du présent contrat, pendant lequel il peut renoncer à la réservation et obtenir la restitution intégrale de son dépôt de garantie.</p><p>3.3. <strong>Prix de Vente Prévisionnel :</strong> le prix de vente prévisionnel du logement est estimé à {{prix_previsionnel}} FCFA. Les conditions de sa révision éventuelle sont précisées en annexe.</p><h2>Article 4 : Signature de l'Acte de Vente</h2><p>Les parties s'engagent à signer l'acte de vente définitif dans un délai de {{delai_acte}}. En cas de non-respect de cet engagement, les conséquences prévues au présent contrat s'appliqueront (restitution du dépôt ou indemnisation selon la partie défaillante).</p><h2>Article 5 : Information du Réservataire</h2><p>Le Promoteur s'oblige à tenir le Réservataire informé de l'avancement des travaux et de tout changement significatif affectant le projet ou le logement réservé.</p><h2>Article 6 : Annulation de la Réservation</h2><p>La réservation peut être annulée par l'une ou l'autre des parties dans les conditions prévues au présent contrat. Les modalités de remboursement du dépôt de garantie sont fonction de la cause de l'annulation.</p><h2>Article 7 : Garanties et Responsabilités</h2><p>Le Promoteur est responsable de la qualité de la construction, des garanties offertes et du respect des délais de livraison annoncés.</p><h2>Article 8 : Litiges et Juridiction</h2><p>Tout litige relatif au présent contrat sera résolu à l'amiable ou, à défaut, soumis à la juridiction compétente du lieu de situation du projet.</p><h2>Article 9 : Dispositions Générales</h2><p>9.1. <strong>Modifications du Contrat :</strong> toutes modifications doivent être faites par écrit et signées par les deux parties.</p><p>9.2. <strong>Notifications :</strong> toute communication entre les parties est adressée aux coordonnées indiquées en tête du présent contrat.</p><p>9.3. <strong>Intégralité de l'Accord :</strong> ce contrat représente l'accord complet entre les parties concernant son objet.</p><p class="signatures">Fait à {{lieu}}, le {{date_jour}}.<br/><br/>Signature du Promoteur / Vendeur (signature et cachet) — Signature du Réservataire / Acheteur</p></div>`,
    countriesJson: C_TRANSACTION,
  },

  // ── 3. Contrat de mandat de vente immobilier ───────────────────────────────
  {
    code: 'immo_mandat_vente', name: 'Contrat de mandat de vente immobilier', category: 'immobilier',
    price: 3000, priceMax: 5500, popularity: 62,
    description: 'Confiez la vente de votre bien à une agence immobilière : durée du mandat, prix de vente, commission et exclusivité clairement définis.',
    fieldsJson: F([
      { key: 'mandant', label: 'Identification complète du Mandant (nom, nationalité, adresse complète)', type: 'textarea', required: true },
      { key: 'mandataire', label: 'Identification complète du Mandataire / Agence (nom, numéro d’enregistrement, adresse)', type: 'textarea', required: true },
      { key: 'adresse_bien', label: 'Adresse précise du bien à vendre', type: 'text', required: true },
      { key: 'description_bien', label: 'Description détaillée du bien (taille, caractéristiques, améliorations…)', type: 'textarea', required: true },
      { key: 'duree_mandat', label: 'Durée du mandat (ex. 3 mois, 6 mois)', type: 'text', required: true },
      { key: 'prix_vente', label: 'Prix de mise en vente (FCFA)', type: 'text', required: true },
      { key: 'remuneration', label: 'Rémunération du Mandataire (pourcentage de la vente ou honoraires fixes)', type: 'text', required: true },
      { key: 'exclusivite', label: 'Exclusivité accordée au Mandataire (ex. mandat exclusif / mandat simple sans exclusivité)', type: 'text', required: true },
      { key: 'lieu', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE MANDAT DE VENTE</h1><p><strong>Entre :</strong></p><p><strong>Le Mandant :</strong> {{mandant}}, propriétaire du bien situé à {{adresse_bien}}, ci-après dénommé « le Mandant »,</p><p><strong>ET</strong></p><p><strong>Le Mandataire :</strong> {{mandataire}}, ci-après dénommé « le Mandataire ».</p><h2>Préambule</h2><p>Le Mandant est le propriétaire légal du bien situé à {{adresse_bien}} et souhaite confier la vente de ce bien au Mandataire, qui accepte le mandat selon les termes et conditions énoncés dans ce contrat.</p><h2>Article 1 : Objet du Contrat</h2><p>Le présent contrat a pour objet de mandater le Mandataire pour la vente du bien appartenant au Mandant, selon les termes et conditions définis ci-après.</p><h2>Article 2 : Description du Bien</h2><p>Le bien à vendre est situé à {{adresse_bien}} et est décrit comme suit : {{description_bien}}.</p><h2>Article 3 : Durée du Mandat</h2><p>Le mandat est accordé pour une période de {{duree_mandat}}, à compter de la date de signature de ce contrat, sauf vente du bien avant l'expiration de cette période.</p><h2>Article 4 : Obligations du Mandataire</h2><p>Le Mandataire s'engage à :</p><ul><li>Mettre en œuvre tous les moyens nécessaires pour la vente du bien.</li><li>Tenir le Mandant informé régulièrement de l'avancement du processus de vente.</li><li>Présenter toutes les offres d'achat reçues au Mandant.</li></ul><h2>Article 5 : Prix de Vente</h2><p>Le bien est mis en vente au prix de {{prix_vente}} FCFA ou tout autre prix convenu par écrit entre le Mandant et le Mandataire.</p><h2>Article 6 : Rémunération du Mandataire</h2><p>La rémunération du Mandataire sera de {{remuneration}}, payable uniquement en cas de réalisation de la vente.</p><h2>Article 7 : Exclusivité</h2><p>{{exclusivite}}. En cas de mandat exclusif, le Mandant s'interdit de confier la vente du bien à un autre intermédiaire pendant la durée du mandat.</p><h2>Article 8 : Droit Applicable et Juridiction</h2><p>Ce contrat est régi par le droit du pays de situation du bien. Tout litige relatif à son interprétation ou à son exécution sera soumis aux tribunaux compétents du lieu de situation du bien.</p><h2>Article 9 : Modification et Renonciation</h2><p>Toute modification de ce contrat doit être écrite et signée par les deux parties. La renonciation à un droit ou à une condition doit également être écrite pour être valide.</p><p class="signatures">Fait à {{lieu}}, le {{date_jour}}.<br/><br/>Le Mandant (nom, signature et cachet) — Le Mandataire (nom, signature et cachet)</p></div>`,
    countriesJson: C_MANDAT,
  },

  // ── 4. Contrat de mandat d'achat / recherche immobilière ───────────────────
  {
    code: 'immo_mandat_achat', name: 'Contrat de mandat d’achat immobilier (mandat de recherche)', category: 'immobilier',
    price: 2500, priceMax: 5000, popularity: 42,
    description: 'Chargez un professionnel de trouver et négocier le bien de vos rêves : critères de recherche, durée, rémunération au succès et confidentialité.',
    fieldsJson: F([
      { key: 'mandant', label: 'Identification complète du Mandant (nom, nationalité, adresse complète)', type: 'textarea', required: true },
      { key: 'mandataire', label: 'Identification complète du Mandataire / Agence (nom, numéro d’enregistrement, adresse)', type: 'textarea', required: true },
      { key: 'criteres', label: 'Critères de recherche (localisation, type de bien, taille, budget maximum…)', type: 'textarea', required: true },
      { key: 'duree_mandat', label: 'Durée du mandat', type: 'text', required: true },
      { key: 'remuneration', label: 'Rémunération du Mandataire (pourcentage du prix d’achat ou honoraires fixes)', type: 'text', required: true },
      { key: 'juridiction', label: 'Tribunaux compétents en cas de litige (ville / pays)', type: 'text', required: true },
      { key: 'lieu', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE MANDAT D'ACHAT</h1><p><strong>Entre :</strong></p><p><strong>Le Mandant :</strong> {{mandant}}, ci-après dénommé « le Mandant »,</p><p><strong>ET</strong></p><p><strong>Le Mandataire :</strong> {{mandataire}}, ci-après dénommé « le Mandataire ».</p><h2>Préambule</h2><p>Le Mandant souhaite acquérir un bien immobilier et a choisi de confier cette tâche au Mandataire, qui possède l'expertise et les ressources nécessaires pour mener à bien cette mission.</p><h2>Article 1 : Objet du Contrat</h2><p>Le présent contrat a pour objet de mandater le Mandataire pour rechercher, négocier et acquérir un bien immobilier selon les critères spécifiés par le Mandant.</p><h2>Article 2 : Description des Critères de Recherche</h2><p>Le Mandant spécifie les critères de recherche suivants : {{criteres}}.</p><h2>Article 3 : Durée du Mandat</h2><p>Le mandat est accordé pour une période de {{duree_mandat}}, à compter de la date de signature de ce contrat.</p><h2>Article 4 : Obligations du Mandataire</h2><p>Le Mandataire s'engage à :</p><ul><li>Effectuer une recherche active selon les critères fournis.</li><li>Présenter au Mandant les biens correspondants.</li><li>Négocier les conditions d'achat dans l'intérêt du Mandant.</li></ul><h2>Article 5 : Rémunération du Mandataire</h2><p>La rémunération du Mandataire sera de {{remuneration}}, payable à la conclusion de l'achat réussi d'un bien.</p><h2>Article 6 : Confidentialité</h2><p>Le Mandataire s'engage à maintenir la confidentialité de toutes les informations fournies par le Mandant et concernant les recherches et négociations effectuées.</p><h2>Article 7 : Droit Applicable et Juridiction</h2><p>Ce contrat est régi par le droit du pays de résidence du Mandant ou de situation du bien recherché. Tout litige relatif à son interprétation ou à son exécution sera soumis aux tribunaux compétents de {{juridiction}}.</p><h2>Article 8 : Modification et Renonciation</h2><p>Toute modification de ce contrat doit être écrite et signée par les deux parties. La renonciation à un droit ou à une condition doit également être écrite pour être valide.</p><p class="signatures">Fait à {{lieu}}, le {{date_jour}}.<br/><br/>Le Mandant (nom, signature et cachet) — Le Mandataire (nom, signature et cachet)</p></div>`,
    countriesJson: C_MANDAT,
  },

  // ── 5. Contrat de bail professionnel ───────────────────────────────────────
  {
    code: 'immo_bail_professionnel', name: 'Contrat de bail professionnel', category: 'immobilier',
    price: 3000, priceMax: 5500, popularity: 55,
    description: 'Louez un local pour une activité libérale ou professionnelle : loyer, dépôt de garantie, charges, entretien et résiliation en 15 articles.',
    fieldsJson: F([
      { key: 'bailleur', label: 'Identification complète du Bailleur (nom ou dénomination sociale, adresse, identifiant fiscal, téléphone, email)', type: 'textarea', required: true },
      { key: 'locataire', label: 'Identification complète du Locataire Professionnel (nom ou dénomination sociale, adresse, identifiant fiscal, téléphone, email)', type: 'textarea', required: true },
      { key: 'adresse_local', label: 'Adresse précise du local loué', type: 'text', required: true },
      { key: 'description_local', label: 'Description du local (superficie en m², caractéristiques, équipements, installations…)', type: 'textarea', required: true },
      { key: 'duree_bail', label: 'Durée du bail (nombre d’années), date de début et date de fin', type: 'text', required: true },
      { key: 'loyer', label: 'Montant du loyer mensuel (FCFA)', type: 'text', required: true },
      { key: 'echeance_loyer', label: 'Date limite mensuelle de paiement du loyer', type: 'text', required: true },
      { key: 'depot_garantie', label: 'Montant du dépôt de garantie (FCFA)', type: 'text', required: true },
      { key: 'lieu', label: 'Ville de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE BAIL PROFESSIONNEL</h1><p><strong>Entre les parties suivantes :</strong></p><p><strong>Le Bailleur :</strong><br/>{{bailleur}}</p><p><strong>Et</strong></p><p><strong>Le Locataire Professionnel :</strong><br/>{{locataire}}</p><p><strong>Considérant que :</strong> le Bailleur est propriétaire d'un local situé à {{adresse_local}}, qu'il souhaite louer au Locataire Professionnel pour l'exercice de son activité commerciale ou professionnelle.</p><h2>Article 1 : Objet du Contrat</h2><p>Le présent contrat a pour objet la location d'un local professionnel situé à {{adresse_local}}, aux fins d'exercice de l'activité professionnelle ou commerciale du Locataire Professionnel.</p><h2>Article 2 : Description du Local</h2><p>{{description_local}}</p><h2>Article 3 : Durée du Bail</h2><p>Le bail est conclu pour une durée de {{duree_bail}}.</p><h2>Article 4 : Loyer et Modalités de Paiement</h2><p>Le loyer mensuel est fixé à {{loyer}} FCFA. Le Locataire s'engage à payer le loyer chaque mois, au plus tard le {{echeance_loyer}}, par virement bancaire sur le compte du Bailleur.</p><h2>Article 5 : Dépôt de Garantie</h2><p>Un dépôt de garantie d'un montant de {{depot_garantie}} FCFA est versé par le Locataire Professionnel au Bailleur à la signature du contrat. Ce dépôt sera restitué en fin de bail, déduction faite des éventuels dommages ou dettes du Locataire.</p><h2>Article 6 : Usage du Local</h2><p>Le Locataire Professionnel s'engage à utiliser le local exclusivement à des fins professionnelles ou commerciales conformément à la réglementation en vigueur.</p><h2>Article 7 : Charges et Frais Accessoires</h2><p>Les charges locatives (eau, électricité, gaz, etc.) sont à la charge du Locataire Professionnel, sauf mention contraire dans le contrat.</p><h2>Article 8 : Entretien du Local</h2><p>Le Locataire Professionnel est responsable de l'entretien courant du local et doit le maintenir en bon état de propreté.</p><h2>Article 9 : Réparations et Aménagements</h2><p>Le Locataire Professionnel peut réaliser des aménagements ou réparations dans le local, sous réserve d'obtenir l'autorisation écrite préalable du Bailleur.</p><h2>Article 10 : Résiliation</h2><p>Les conditions de résiliation du contrat, y compris les motifs de résiliation anticipée et le préavis applicable, sont précisées d'un commun accord entre les parties.</p><h2>Article 11 : Responsabilités et Assurances</h2><p>Le Locataire Professionnel est responsable des dommages causés au local et doit souscrire une assurance responsabilité civile pour couvrir sa responsabilité locative.</p><h2>Article 12 : Clause de Force Majeure</h2><p>En cas de force majeure (événements imprévisibles et inévitables), les obligations des parties seront suspendues.</p><h2>Article 13 : Loi Applicable et Juridiction</h2><p>Ce contrat est régi par les lois en vigueur dans le pays de situation du local et tout litige relatif à son interprétation ou à son exécution sera de la compétence exclusive des tribunaux du lieu de situation du local.</p><h2>Article 14 : Modification du Contrat</h2><p>Toute modification du présent contrat doit être convenue par écrit et signée par les deux parties.</p><h2>Article 15 : Communication</h2><p>Toute communication entre les parties doit être adressée aux coordonnées indiquées dans le contrat.</p><p class="signatures">Fait à {{lieu}}, le {{date_jour}}.<br/><br/>Signature du Bailleur — Signature du Locataire Professionnel</p></div>`,
    countriesJson: C_BAIL,
  },

  // ── 6. Contrat de bail emphytéotique ───────────────────────────────────────
  {
    code: 'immo_bail_emphyteotique', name: 'Contrat de bail emphytéotique', category: 'immobilier',
    price: 4000, priceMax: 6500, popularity: 28,
    description: 'Louez un terrain sur très longue durée avec droit de construire : redevance, améliorations, transmission des droits et réversion des constructions.',
    fieldsJson: F([
      { key: 'bailleur', label: 'Identification complète du Bailleur / Propriétaire du terrain (nom, adresse, identifiant fiscal, contacts)', type: 'textarea', required: true },
      { key: 'emphyteote', label: 'Identification complète de l’Emphytéote / Locataire (nom ou dénomination sociale, siège, identifiant fiscal, contacts)', type: 'textarea', required: true },
      { key: 'adresse_terrain', label: 'Adresse précise du terrain', type: 'text', required: true },
      { key: 'numero_cadastre', label: 'Numéro de cadastre ou de titre foncier', type: 'text', required: true },
      { key: 'superficie', label: 'Superficie du terrain (m²) et description', type: 'textarea', required: true },
      { key: 'duree', label: 'Durée du bail emphytéotique (en années, généralement 18 à 99 ans)', type: 'text', required: true },
      { key: 'date_debut', label: 'Date de prise d’effet du bail', type: 'date', required: true },
      { key: 'loyer_annuel', label: 'Loyer annuel (canon emphytéotique) et modalités de paiement (FCFA)', type: 'text', required: true },
      { key: 'lieu', label: 'Ville de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE BAIL EMPHYTÉOTIQUE</h1><p><strong>Entre les parties :</strong></p><p><strong>Le Bailleur (Propriétaire du Terrain) :</strong><br/>{{bailleur}}</p><p><strong>Et</strong></p><p><strong>L'Emphytéote (Locataire) :</strong><br/>{{emphyteote}}</p><p><strong>Considérant que :</strong> le Bailleur est propriétaire d'un terrain situé à {{adresse_terrain}}, cadastré sous le numéro {{numero_cadastre}}. Le Bailleur souhaite louer ce terrain à l'Emphytéote pour une période emphytéotique, permettant à ce dernier de réaliser des améliorations substantielles.</p><h2>Article 1 : Objet du Contrat</h2><p>Le présent contrat a pour objet de définir les termes et conditions selon lesquels le Bailleur accorde un bail emphytéotique à l'Emphytéote sur le terrain susmentionné.</p><h2>Article 2 : Description du Terrain</h2><p>Le terrain est situé à {{adresse_terrain}}, avec les caractéristiques suivantes : {{superficie}}.</p><h2>Article 3 : Durée du Bail</h2><p>Le bail est conclu pour une durée emphytéotique de {{duree}}, prenant effet à partir du {{date_debut}}.</p><h2>Article 4 : Droits et Obligations de l'Emphytéote</h2><p><strong>Droits de Construction :</strong> l'Emphytéote a le droit de construire, de planter, d'améliorer ou d'exploiter le terrain.</p><p><strong>Obligations :</strong> l'Emphytéote doit maintenir le terrain en bon état et effectuer toutes les réparations nécessaires.</p><h2>Article 5 : Loyer</h2><p>Le loyer annuel est fixé à {{loyer_annuel}}.</p><h2>Article 6 : Améliorations et Constructions</h2><p>Toutes les améliorations ou constructions réalisées par l'Emphytéote doivent être conformes aux réglementations locales et nécessitent l'approbation du Bailleur si spécifié dans le contrat.</p><h2>Article 7 : Transmission des Droits</h2><p>L'Emphytéote peut transmettre ses droits sur le bail emphytéotique à un tiers, sous réserve de l'accord du Bailleur.</p><h2>Article 8 : Réversion des Constructions</h2><p>À la fin du bail, toutes les constructions et améliorations deviennent la propriété du Bailleur sans compensation pour l'Emphytéote, sauf accord contraire.</p><h2>Article 9 : Résiliation Anticipée</h2><p>Le bail emphytéotique peut être résilié de manière anticipée par l'une des parties en cas de manquement grave de l'autre partie à ses obligations, notamment le défaut prolongé de paiement du loyer ou la dégradation du fonds.</p><h2>Article 10 : Litiges</h2><p>Tout litige relatif à l'interprétation ou à l'exécution de ce contrat sera, en cas de désaccord, soumis aux tribunaux compétents du lieu du terrain.</p><p class="signatures">Fait à {{lieu}}, le {{date_jour}}.<br/><br/>Signature du Bailleur — Signature de l'Emphytéote</p></div>`,
    countriesJson: C_BAIL,
  },

  // ── 7. Contrat de sous-location ────────────────────────────────────────────
  {
    code: 'immo_sous_location', name: 'Contrat de sous-location', category: 'immobilier',
    price: 2000, priceMax: 4500, popularity: 50,
    description: 'Sous-louez votre logement en toute légalité : durée, loyer, dépôt de garantie, obligations du sous-locataire et interdiction de sous-louer à nouveau.',
    fieldsJson: F([
      { key: 'locataire_principal', label: 'Identification complète du Locataire Principal / Sous-Loueur (nom, adresse du logement loué, téléphone, email, statut juridique, identifiant fiscal)', type: 'textarea', required: true },
      { key: 'sous_locataire', label: 'Identification complète du Sous-Locataire (nom, adresse actuelle, téléphone, email, statut juridique, identifiant fiscal)', type: 'textarea', required: true },
      { key: 'adresse_logement', label: 'Adresse complète du logement sous-loué', type: 'text', required: true },
      { key: 'description_logement', label: 'Description du logement sous-loué (nombre de pièces, superficie, meubles et équipements inclus…)', type: 'textarea', required: true },
      { key: 'date_debut', label: 'Date de début de la sous-location', type: 'date', required: true },
      { key: 'date_fin', label: 'Date de fin de la sous-location', type: 'date', required: true },
      { key: 'loyer', label: 'Loyer mensuel payable au Locataire Principal (FCFA)', type: 'text', required: true },
      { key: 'depot_garantie', label: 'Dépôt de garantie (montant et nombre de mois de loyer correspondant)', type: 'text', required: true },
      { key: 'lieu', label: 'Ville de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE SOUS-LOCATION</h1><p><strong>Entre les parties :</strong></p><p><strong>Le Locataire Principal (Sous-Loueur) :</strong><br/>{{locataire_principal}}</p><p><strong>Et</strong></p><p><strong>Le Sous-Locataire :</strong><br/>{{sous_locataire}}</p><h2>Préambule</h2><p>Le Locataire Principal, ayant un bail valide avec le propriétaire du logement situé à {{adresse_logement}}, souhaite sous-louer ce logement (ou une partie) au Sous-Locataire pour la période spécifiée dans le présent contrat.</p><h2>Article 1 : Objet du Contrat</h2><p>Le présent contrat a pour objet la sous-location par le Locataire Principal au Sous-Locataire du logement situé à {{adresse_logement}}, conformément aux termes et conditions détaillés ci-après.</p><h2>Article 2 : Description du Logement Sous-Loué</h2><p>Le logement sous-loué se compose de : {{description_logement}}.</p><h2>Article 3 : Durée de la Sous-Location</h2><p><strong>Début et Fin :</strong> la sous-location débutera le {{date_debut}} et se terminera le {{date_fin}}.</p><p><strong>Renouvellement :</strong> tout renouvellement devra faire l'objet d'un accord écrit entre les parties avant le terme.</p><h2>Article 4 : Loyer et Modalités de Paiement</h2><p><strong>Montant du Loyer :</strong> le loyer mensuel est fixé à {{loyer}} FCFA, payable au Locataire Principal.</p><p><strong>Modalités de Paiement :</strong> le loyer est payable chaque mois d'avance.</p><h2>Article 5 : Dépôt de Garantie</h2><p>Un dépôt de garantie de {{depot_garantie}} est requis pour couvrir les éventuels dommages.</p><h2>Article 6 : Utilisation du Logement</h2><p>Le Sous-Locataire s'engage à utiliser le logement exclusivement à des fins d'habitation personnelle et à respecter les règles de bonne conduite.</p><h2>Article 7 : Obligations du Sous-Locataire</h2><p>Le Sous-Locataire est responsable de l'entretien courant du logement et doit le restituer dans son état initial, à l'exception de l'usure normale.</p><h2>Article 8 : Interdiction de Sous-Louer</h2><p>Le Sous-Locataire n'est pas autorisé à sous-louer à nouveau le logement ou à le céder à une tierce personne sans l'accord écrit du Locataire Principal.</p><h2>Article 9 : Visites et Inspections</h2><p>Le Locataire Principal se réserve le droit d'inspecter le logement, sous réserve d'un préavis raisonnable.</p><h2>Article 10 : Résiliation Anticipée</h2><p>La sous-location peut être résiliée de manière anticipée par l'une des parties moyennant le respect d'un préavis écrit convenu entre elles et des conditions prévues au présent contrat.</p><h2>Article 11 : Litiges</h2><p>Tout litige relatif à l'interprétation ou à l'exécution de ce contrat sera résolu à l'amiable ou, à défaut, soumis aux tribunaux compétents du lieu du logement sous-loué.</p><p class="signatures">Fait à {{lieu}}, le {{date_jour}}.<br/><br/>Signature du Locataire Principal (Sous-Loueur) — Signature du Sous-Locataire</p></div>`,
    countriesJson: C_BAIL,
  },

  // ── 8. Contrat de syndic de copropriété ────────────────────────────────────
  {
    code: 'immo_syndic_copropriete', name: 'Contrat de syndic de copropriété', category: 'immobilier',
    price: 3500, priceMax: 6000, popularity: 38,
    description: 'Organisez la gestion de votre immeuble en copropriété : missions du syndic, assemblées générales, comptes, charges et rémunération.',
    fieldsJson: F([
      { key: 'copropriete', label: 'Identification du Syndicat de Copropriété (nom de la copropriété et adresse)', type: 'textarea', required: true },
      { key: 'syndic', label: 'Identification complète du Syndic (nom, adresse, téléphone, email)', type: 'textarea', required: true },
      { key: 'adresse_immeuble', label: 'Adresse précise de l’immeuble en copropriété', type: 'text', required: true },
      { key: 'date_debut', label: 'Date d’entrée en vigueur du contrat', type: 'date', required: true },
      { key: 'duree_contrat', label: 'Durée du contrat (ex. 1 an renouvelable)', type: 'text', required: true },
      { key: 'remuneration', label: 'Rémunération du Syndic (montant fixe ou pourcentage des charges de copropriété)', type: 'textarea', required: true },
      { key: 'lieu', label: 'Ville de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE SYNDIC DE COPROPRIÉTÉ</h1><p><strong>ENTRE LES SOUSSIGNÉS :</strong></p><p><strong>Le Syndicat de Copropriété :</strong><br/>{{copropriete}}</p><p><strong>Et</strong></p><p><strong>Le Syndic :</strong><br/>{{syndic}}</p><p><strong>CONSIDÉRANT QUE :</strong></p><p>Le Syndicat de Copropriété est constitué des propriétaires des lots de copropriété de l'immeuble situé à {{adresse_immeuble}}, et il souhaite confier la gestion de la copropriété au Syndic.</p><p><strong>IL EST CONVENU CE QUI SUIT :</strong></p><h2>Article 1 : Objet du Contrat</h2><p>Le présent contrat a pour objet de définir les termes et les conditions de la gestion de la copropriété située à {{adresse_immeuble}} par le Syndic.</p><h2>Article 2 : Durée du Contrat</h2><p>Le contrat de syndic de copropriété entre en vigueur à partir du {{date_debut}}. Sa durée est de {{duree_contrat}} et peut être renouvelée par accord écrit des parties à la fin de cette période.</p><h2>Article 3 : Responsabilités du Syndic</h2><p>Le Syndic s'engage à :</p><ul><li>Assurer la gestion administrative et financière de la copropriété.</li><li>Convoquer et organiser les assemblées générales des copropriétaires.</li><li>Établir et tenir à jour les comptes de la copropriété.</li><li>Collecter les charges et les dépenses communes.</li><li>Superviser l'entretien et les réparations de l'immeuble.</li><li>Représenter le Syndicat de Copropriété auprès des autorités et des tiers.</li></ul><h2>Article 4 : Responsabilités du Syndicat de Copropriété</h2><p>Le Syndicat de Copropriété s'engage à :</p><ul><li>Collaborer avec le Syndic pour la gestion de la copropriété.</li><li>Payer les charges et les frais de gestion conformément au budget établi.</li></ul><h2>Article 5 : Rémunération du Syndic</h2><p>Le Syndic sera rémunéré selon les termes et conditions suivants : {{remuneration}}.</p><h2>Article 6 : Résiliation du Contrat</h2><p>Les conditions de résiliation du contrat, y compris les motifs de résiliation anticipée, sont convenues entre les parties. En cas de résiliation, les modalités de règlement des paiements en cours seront définies.</p><h2>Article 7 : Loi Applicable et Juridiction</h2><p>Ce contrat est régi par les lois en vigueur dans le pays de situation de l'immeuble, et tout litige relatif à son interprétation ou à son exécution sera de la compétence des tribunaux compétents du lieu de l'immeuble.</p><h2>Article 8 : Modification du Contrat</h2><p>Toute modification du présent contrat doit être convenue par écrit et signée par les deux parties.</p><h2>Article 9 : Communication</h2><p>Toute communication entre les parties doit être adressée aux coordonnées indiquées dans le contrat.</p><p class="signatures">FAIT EN DOUBLE EXEMPLAIRE À {{lieu}}, le {{date_jour}}.<br/><br/>Signature du Syndicat de Copropriété — Signature du Syndic</p></div>`,
    countriesJson: C_COPRO,
  },

  // ── 9. Contrat d'architecte ────────────────────────────────────────────────
  {
    code: 'immo_contrat_architecte', name: 'Contrat d’architecte', category: 'immobilier',
    price: 4000, priceMax: 6500, popularity: 45,
    description: 'Engagez un architecte pour concevoir et superviser votre projet : services, honoraires, propriété intellectuelle des plans et assurance professionnelle.',
    fieldsJson: F([
      { key: 'client', label: 'Identification complète du Client (nom, statut ou profession, adresse complète)', type: 'textarea', required: true },
      { key: 'architecte', label: 'Identification complète de l’Architecte ou du cabinet (nom, numéro d’enregistrement professionnel, adresse du bureau)', type: 'textarea', required: true },
      { key: 'description_projet', label: 'Description du projet architectural (ex. résidence, bâtiment commercial…)', type: 'textarea', required: true },
      { key: 'adresse_projet', label: 'Adresse précise du projet', type: 'text', required: true },
      { key: 'date_debut', label: 'Date de début du contrat', type: 'date', required: true },
      { key: 'date_fin', label: 'Date de fin prévisionnelle', type: 'date', required: true },
      { key: 'honoraires', label: 'Honoraires de l’Architecte (pourcentage du coût total du projet ou montant fixe) et échéances de paiement', type: 'textarea', required: true },
      { key: 'preavis', label: 'Préavis de résiliation (en jours ou semaines)', type: 'text', required: true },
      { key: 'lieu', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT D'ARCHITECTE</h1><p><strong>ENTRE :</strong></p><p><strong>1. Le Client :</strong> {{client}}</p><p><strong>ET</strong></p><p><strong>2. L'Architecte :</strong> {{architecte}}</p><h2>Article 1 : Objet du Contrat</h2><p>Ce contrat vise à définir les termes de l'engagement de l'Architecte pour la conception et la supervision de {{description_projet}} situé à {{adresse_projet}}.</p><h2>Article 2 : Description des Services</h2><p>L'Architecte fournira les services suivants :</p><ul><li>Élaboration des plans préliminaires et définitifs.</li><li>Développement des spécifications techniques.</li><li>Assistance dans le choix des entrepreneurs et des fournisseurs.</li><li>Supervision et coordination des travaux sur le site.</li></ul><h2>Article 3 : Durée du Contrat</h2><p>La durée du contrat est fixée à partir du {{date_debut}} jusqu'à la fin des obligations contractuelles, prévue aux alentours du {{date_fin}}.</p><h2>Article 4 : Honoraires de l'Architecte</h2><p>Les honoraires de l'Architecte et leurs modalités de paiement sont fixés comme suit : {{honoraires}}.</p><h2>Article 5 : Obligations du Client</h2><p>Le Client s'engage à fournir à l'Architecte toutes les informations nécessaires à la réalisation du projet et à effectuer les paiements selon les modalités convenues.</p><h2>Article 6 : Modifications du Projet</h2><p>Toute modification substantielle du projet initial devra faire l'objet d'un avenant au présent contrat et pourra entraîner une révision des honoraires et des délais.</p><h2>Article 7 : Propriété Intellectuelle</h2><p>Les plans, dessins et documents produits par l'Architecte restent sa propriété intellectuelle. Le Client obtient une licence d'utilisation pour le projet spécifié dans ce contrat.</p><h2>Article 8 : Responsabilité et Assurance</h2><p>L'Architecte est responsable de la conformité de ses services aux normes professionnelles. Il doit maintenir une assurance responsabilité professionnelle couvrant l'ensemble de ses activités.</p><h2>Article 9 : Résiliation du Contrat</h2><p>Le contrat peut être résilié par l'une ou l'autre des parties, avec un préavis écrit de {{preavis}}, sous réserve de respecter les conditions de paiement et de réalisation des services déjà effectués.</p><h2>Article 10 : Règlement des Litiges</h2><p>Les litiges éventuels liés à l'interprétation ou à l'exécution de ce contrat seront résolus à l'amiable ou, à défaut, soumis à la juridiction compétente.</p><p class="signatures">Fait à {{lieu}}, le {{date_jour}}.<br/><br/>Signature du Client (nom et signature) — Signature de l'Architecte (nom et signature)</p></div>`,
    countriesJson: C_CONSTRUCTION,
  },

  // ── 10. Contrat de maîtrise d'œuvre ────────────────────────────────────────
  {
    code: 'immo_maitrise_oeuvre', name: 'Contrat de maîtrise d’œuvre', category: 'immobilier',
    price: 4500, priceMax: 7000, popularity: 40,
    description: 'Confiez la conception, la planification et la supervision complète de votre chantier à un maître d’œuvre : permis, budget, sous-traitants et avenants.',
    fieldsJson: F([
      { key: 'maitre_ouvrage', label: 'Identification complète du Maître d’Ouvrage (nom, statut ou forme juridique, adresse complète)', type: 'textarea', required: true },
      { key: 'maitre_oeuvre', label: 'Identification complète du Maître d’Œuvre ou du cabinet (nom, numéro d’enregistrement professionnel, adresse du bureau)', type: 'textarea', required: true },
      { key: 'description_projet', label: 'Description détaillée du projet (nature, étendue, objectifs spécifiques)', type: 'textarea', required: true },
      { key: 'adresse_projet', label: 'Adresse précise du projet', type: 'text', required: true },
      { key: 'date_debut', label: 'Date de début du contrat', type: 'date', required: true },
      { key: 'date_fin', label: 'Date de fin prévisionnelle du projet', type: 'date', required: true },
      { key: 'honoraires', label: 'Honoraires (pourcentage du coût total du projet ou montant fixe) et calendrier des paiements', type: 'textarea', required: true },
      { key: 'lieu', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE MAÎTRISE D'ŒUVRE</h1><p><strong>Parties Contractantes :</strong></p><p><strong>Le Maître d'Ouvrage :</strong><br/>{{maitre_ouvrage}}</p><p><strong>Le Maître d'Œuvre :</strong><br/>{{maitre_oeuvre}}</p><h2>Préambule</h2><p>Ce contrat a pour but de formaliser l'accord entre le Maître d'Ouvrage et le Maître d'Œuvre pour la réalisation de {{description_projet}} situé à {{adresse_projet}}.</p><h2>Article 1 : Objectifs et Portée du Projet</h2><p>Le projet consiste en {{description_projet}}. Le Maître d'Œuvre sera responsable de la conception, de la planification et de la supervision des travaux jusqu'à leur achèvement.</p><h2>Article 2 : Responsabilités du Maître d'Œuvre</h2><p>Le Maître d'Œuvre devra :</p><ul><li>Élaborer les plans architecturaux et les détails d'exécution en consultation avec le Maître d'Ouvrage.</li><li>Obtenir les approbations et permis nécessaires auprès des autorités compétentes.</li><li>Coordonner et superviser le travail des sous-traitants et des fournisseurs.</li><li>Assurer la gestion du chantier, y compris la conformité aux normes de sécurité et environnementales.</li><li>Gérer le budget du projet et veiller au respect des échéances financières convenues.</li></ul><h2>Article 3 : Durée du Contrat</h2><p>La durée du contrat s'étend du {{date_debut}} à la finition complète du projet, prévue pour le {{date_fin}}. Ce calendrier peut être ajusté en fonction des nécessités du projet et des avenants éventuels.</p><h2>Article 4 : Honoraires et Paiements</h2><p>Les honoraires et le calendrier de paiement sont fixés comme suit : {{honoraires}}.</p><h2>Article 5 : Engagement du Maître d'Ouvrage</h2><p>Le Maître d'Ouvrage s'engage à :</p><ul><li>Fournir tous les documents et informations nécessaires pour la conception et la réalisation du projet.</li><li>Assurer le financement du projet conformément aux modalités de paiement établies.</li><li>Collaborer activement avec le Maître d'Œuvre pour toute décision relative au projet.</li></ul><h2>Article 6 : Modifications et Avenants</h2><p>Les modifications substantielles du projet initial doivent être documentées par des avenants au contrat. Ces avenants préciseront les ajustements nécessaires en termes de coûts, délais et autres conditions.</p><h2>Article 7 : Confidentialité et Propriété Intellectuelle</h2><p>Les informations échangées dans le cadre du contrat sont confidentielles. Les plans, dessins et documents techniques produits restent la propriété du Maître d'Œuvre, avec une licence accordée au Maître d'Ouvrage pour l'utilisation spécifique au projet.</p><h2>Article 8 : Résiliation</h2><p>Le contrat peut être résilié pour manquement aux obligations contractuelles, faillite ou autres circonstances graves, en respectant un préavis mutuel et les modalités de résiliation prévues.</p><h2>Article 9 : Règlement des Différends</h2><p>En cas de désaccord, les parties s'efforceront de trouver une solution amiable. Si aucun accord n'est trouvé, le litige sera soumis à l'arbitrage ou à la juridiction compétente.</p><p class="signatures">Fait à {{lieu}}, le {{date_jour}}.<br/><br/>Le Maître d'Ouvrage (nom, signature, date) — Le Maître d'Œuvre (nom, signature, date)</p></div>`,
    countriesJson: C_CONSTRUCTION,
  },

  // ── 11. Contrat de location saisonnière ────────────────────────────────────
  {
    code: 'immo_location_saisonniere', name: 'Contrat de location saisonnière', category: 'immobilier',
    price: 2000, priceMax: 4500, popularity: 52,
    description: 'Louez votre bien pour les vacances ou une courte durée : loyer total, dépôt de garantie, capacité d’hébergement, état des lieux et annulation.',
    fieldsJson: F([
      { key: 'bailleur', label: 'Identification complète du Bailleur (nom ou dénomination sociale, adresse, identifiant fiscal, téléphone, email)', type: 'textarea', required: true },
      { key: 'locataire', label: 'Identification complète du Locataire (nom, adresse actuelle, identifiant fiscal, téléphone, email)', type: 'textarea', required: true },
      { key: 'adresse_logement', label: 'Adresse précise du logement loué', type: 'text', required: true },
      { key: 'description_logement', label: 'Description du logement (nombre de pièces, superficie, équipements…)', type: 'textarea', required: true },
      { key: 'date_debut', label: 'Date de début de la location', type: 'date', required: true },
      { key: 'date_fin', label: 'Date de fin de la location', type: 'date', required: true },
      { key: 'loyer_total', label: 'Montant total du loyer pour la période (FCFA)', type: 'text', required: true },
      { key: 'depot_garantie', label: 'Dépôt de garantie (montant et pourcentage du loyer total)', type: 'text', required: true },
      { key: 'capacite', label: 'Nombre maximum de personnes hébergées', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE LOCATION SAISONNIÈRE</h1><p><strong>Entre :</strong></p><p><strong>Le Bailleur :</strong><br/>{{bailleur}}</p><p><strong>Et</strong></p><p><strong>Le Locataire :</strong><br/>{{locataire}}</p><p><strong>Considérant que :</strong> le Bailleur possède un bien immobilier situé à {{adresse_logement}}, qu'il souhaite louer pour une période limitée à des fins saisonnières au Locataire.</p><h2>Article 1 : Objet du Contrat</h2><p>Le présent contrat a pour objet la location saisonnière du bien immobilier situé à {{adresse_logement}}, pour une utilisation résidentielle temporaire.</p><h2>Article 2 : Description du Logement</h2><p>{{description_logement}}</p><h2>Article 3 : Durée de la Location</h2><p>La location est accordée pour une période allant du {{date_debut}} au {{date_fin}}.</p><h2>Article 4 : Loyer et Modalités de Paiement</h2><p><strong>Montant Total du Loyer :</strong> le loyer total pour la période est fixé à {{loyer_total}} FCFA.</p><p><strong>Modalités de Paiement :</strong> le loyer est payable en totalité à la réservation ou selon un échéancier convenu.</p><h2>Article 5 : Dépôt de Garantie</h2><p>Un dépôt de garantie de {{depot_garantie}} est exigé pour couvrir les éventuels dommages.</p><h2>Article 6 : Utilisation du Logement</h2><p>Le Locataire s'engage à utiliser le logement de manière soigneuse et à ne pas causer de nuisances.</p><h2>Article 7 : Capacité d'Hébergement</h2><p>Le logement est loué pour un nombre maximum de {{capacite}} personnes. Toute occupation supplémentaire nécessite l'accord du Bailleur.</p><h2>Article 8 : Équipements et Services</h2><p>Les équipements et services inclus dans la location (Wi-Fi, télévision, appareils électroménagers, etc.) sont listés dans l'inventaire annexé au présent contrat.</p><h2>Article 9 : Interdictions</h2><p>Il est interdit de fumer dans le logement et de tenir des fêtes ou événements bruyants.</p><h2>Article 10 : État des Lieux et Inventaire</h2><p>Un état des lieux et un inventaire détaillé seront réalisés à l'arrivée et au départ du Locataire.</p><h2>Article 11 : Annulation</h2><p>Les conditions d'annulation de la location par le Locataire ou le Bailleur, incluant d'éventuelles pénalités ou remboursements, sont précisées d'un commun accord entre les parties avant la prise d'effet du contrat.</p><h2>Article 12 : Responsabilité et Assurance</h2><p>Le Locataire est responsable des dommages qu'il cause. Il est conseillé de souscrire une assurance responsabilité civile.</p><h2>Article 13 : Litiges</h2><p>Tout litige relatif à ce contrat sera résolu à l'amiable ou, à défaut, soumis aux tribunaux compétents.</p><p class="signatures">Fait le {{date_jour}}.<br/><br/>Signature du Bailleur — Signature du Locataire</p></div>`,
    countriesJson: C_BAIL,
  },

  // ── 12. Contrat de promotion-vente immobilière ─────────────────────────────
  {
    code: 'immo_promotion_vente', name: 'Contrat de promotion-vente immobilière', category: 'immobilier',
    price: 4000, priceMax: 6500, popularity: 32,
    description: 'Faites commercialiser et vendre vos biens par un promoteur : stratégie marketing, visites, négociation, commission et durée de la collaboration.',
    fieldsJson: F([
      { key: 'promoteur', label: 'Identification complète du Promoteur (nom, pays de droit, adresse complète, représentant et fonction)', type: 'textarea', required: true },
      { key: 'mandant', label: 'Identification complète du Mandant / Propriétaire-Vendeur (nom, nationalité, adresse ou entité représentée)', type: 'textarea', required: true },
      { key: 'adresse_biens', label: 'Adresse précise ou description de la localisation des biens', type: 'text', required: true },
      { key: 'description_biens', label: 'Description détaillée des biens (surface, nombre d’unités, équipements…)', type: 'textarea', required: true },
      { key: 'prix_vente', label: 'Politique de prix (prix fixés par le Mandant ou négociés par le Promoteur, montants indicatifs en FCFA)', type: 'textarea', required: true },
      { key: 'commission', label: 'Commission du Promoteur (pourcentage du prix de vente ou autre formule) et modalités de paiement', type: 'textarea', required: true },
      { key: 'duree_contrat', label: 'Durée du contrat', type: 'text', required: true },
      { key: 'juridiction', label: 'Tribunaux compétents en cas de litige (ville / pays)', type: 'text', required: true },
      { key: 'lieu', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE PROMOTION-VENTE</h1><p><strong>Entre :</strong></p><p><strong>1. Le Promoteur :</strong><br/>{{promoteur}}, ci-après dénommé « le Promoteur »,</p><p><strong>ET</strong></p><p><strong>2. Le Mandant (Propriétaire/Vendeur) :</strong><br/>{{mandant}}, ci-après dénommé « le Mandant ».</p><h2>Préambule</h2><p>Le Mandant est propriétaire de biens immobiliers situés à {{adresse_biens}} et souhaite les vendre. Le Promoteur possède l'expertise et les ressources nécessaires pour commercialiser et vendre ces biens. Les parties conviennent de formaliser leur collaboration par le présent contrat.</p><h2>Article 1 : Objet du Contrat</h2><p>Le présent contrat a pour objet de définir les termes et conditions selon lesquels le Promoteur s'engage à commercialiser et vendre les biens immobiliers du Mandant.</p><h2>Article 2 : Description des Biens</h2><p>Les biens immobiliers à vendre sont situés à {{adresse_biens}} et sont décrits comme suit : {{description_biens}}.</p><h2>Article 3 : Obligations du Promoteur</h2><p>Le Promoteur s'engage à :</p><p>a. Mettre en place une stratégie de marketing pour la vente des biens.</p><p>b. Organiser des visites pour les potentiels acheteurs.</p><p>c. Négocier les termes de vente dans le meilleur intérêt du Mandant.</p><p>d. Tenir le Mandant informé de l'avancement des ventes.</p><h2>Article 4 : Prix de Vente</h2><p>Les prix de vente des biens seront déterminés comme suit : {{prix_vente}}.</p><h2>Article 5 : Commission du Promoteur</h2><p>Le Promoteur recevra une commission fixée comme suit pour chaque bien vendu : {{commission}}.</p><h2>Article 6 : Durée du Contrat</h2><p>La durée de ce contrat est de {{duree_contrat}} à compter de la date de signature, sauf prolongation convenue par les parties ou résiliation anticipée selon les termes du contrat.</p><h2>Article 7 : Droit Applicable et Juridiction</h2><p>Ce contrat est régi par le droit du pays de situation des biens. Tout litige relatif à son interprétation ou à son exécution sera soumis aux tribunaux compétents de {{juridiction}}.</p><h2>Article 8 : Modification et Renonciation</h2><p>Toute modification de ce contrat doit être écrite et signée par les deux parties. La renonciation à un droit ou à une condition doit également être écrite pour être valide.</p><p><strong>Annexes :</strong></p><ul><li>Liste et description détaillée des biens à vendre</li><li>Plan marketing et matériaux promotionnels</li><li>Accord spécifique sur les modalités de commission</li></ul><p class="signatures">Fait à {{lieu}}, le {{date_jour}}.<br/><br/>Le Mandant (nom, signature et cachet) — Le Promoteur (nom, signature et cachet)</p></div>`,
    countriesJson: C_MANDAT,
  },
];

async function main() {
  let created = 0;
  let updated = 0;

  for (const t of templates) {
    const data = {
      code: t.code,
      name: t.name,
      category: t.category,
      description: t.description,
      price: t.price,
      priceMax: t.priceMax,
      fieldsJson: t.fieldsJson,
      body: t.body,
      popularity: t.popularity,
      countriesJson: t.countriesJson ?? null,
    };
    const existing = await prisma.documentTemplate.findUnique({ where: { code: t.code } });
    await prisma.documentTemplate.upsert({ where: { code: t.code }, update: data, create: data });
    if (existing) updated += 1; else created += 1;
  }

  const total = await prisma.documentTemplate.count();
  console.log('Seed Drive2 IMMO (Agent Drive2-2/10) terminé.');
  console.log(`   Templates du script : ${templates.length} (créés : ${created}, mis à jour : ${updated})`);
  console.log(`   Catégorie : immobilier`);
  console.log(`   Total de templates en base : ${total}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
