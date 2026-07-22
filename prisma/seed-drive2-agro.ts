// Seed Drive — AGRO-PASTORAL & QHSE/ENVIRONNEMENT (Agent Drive2-10/10) : 12 templates
// convertis depuis les modèles Google Drive IBI (PACK AGRO PASTORAL, IBI031 - PACK QHSE,
// LE KIT ENVIRONNEMENT ET DEVELOPPEMENT DURABLE, complétés par le kit IBI079 volet agricole).
// Script ADDITIF : upsert par code — n'écrase aucun autre template.
// Exécution : npx tsx prisma/seed-drive2-agro.ts
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

// Variante pays pour les baux ruraux et contrats fonciers agricoles.
const COUNTRIES_FONCIER_RURAL = JSON.stringify({
  OHADA: { note: 'Se référer au droit foncier rural national (ex. loi n° 98-750 du 23 décembre 1998 relative au domaine foncier rural en Côte d’Ivoire) et aux Actes uniformes OHADA applicables aux baux à usage professionnel.' },
  FR: { note: 'Se référer au statut du fermage et du métayage du Code rural et de la pêche maritime (art. L411-1 et suivants).' },
});

const templates: CatalogTemplate[] = [
  // ─────────────────────────── 1. Bail rural ───────────────────────────
  {
    code: 'agro_bail_rural', name: 'Contrat de bail rural (terrain agricole)', category: 'agro_environnement', price: 2500, priceMax: 5000,
    description: 'Contrat de location d’une parcelle agricole : durée, loyer à l’hectare, dépôt de garantie, entretien, récoltes et renouvellement.',
    fieldsJson: F([
      { key: 'bailleur', label: 'Bailleur (nom / dénomination, adresse, n° fiscal, téléphone, email)', type: 'textarea', required: true },
      { key: 'locataire', label: 'Locataire agricole (nom / dénomination, adresse, n° fiscal, téléphone, email)', type: 'textarea', required: true },
      { key: 'terrain', label: 'Terrain (adresse précise, superficie en hectares, nature du sol, limites, équipements)', type: 'textarea', required: true },
      { key: 'duree', label: 'Durée du bail (ex. 5 ans, du 01/01/2027 au 31/12/2031)', type: 'text', required: true },
      { key: 'loyer', label: 'Loyer annuel par hectare (FCFA) et date d’échéance', type: 'text', required: true },
      { key: 'depot_garantie', label: 'Montant du dépôt de garantie (FCFA)', type: 'text', required: true },
      { key: 'pays', label: 'Pays (loi applicable)', type: 'text', required: true },
      { key: 'ville', label: 'Ville de signature (et tribunaux compétents)', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE BAIL RURAL</h1><p>Entre :</p><p><strong>Le Bailleur :</strong><br/>{{bailleur}}</p><p>Et</p><p><strong>Le Locataire Agricole :</strong><br/>{{locataire}}</p><p><strong>Considérant que :</strong> le Bailleur est propriétaire d'une parcelle de terrain agricole qu'il souhaite louer au Locataire Agricole pour une activité agricole conforme à la réglementation en vigueur.</p><h2>Article 1 — Objet du contrat</h2><p>Le présent contrat a pour objet la location de la parcelle de terrain agricole décrite à l'article 2, aux fins d'exploitation agricole par le Locataire Agricole.</p><h2>Article 2 — Description du terrain</h2><p>{{terrain}}</p><h2>Article 3 — Durée du bail</h2><p>Le bail est conclu pour une durée de {{duree}}.</p><h2>Article 4 — Loyer et modalités de paiement</h2><p>Le loyer annuel est fixé à <strong>{{loyer}}</strong>. Le Locataire s'engage à payer le loyer annuel au Bailleur au plus tard à la date d'échéance convenue.</p><h2>Article 5 — Dépôt de garantie</h2><p>Un dépôt de garantie d'un montant de <strong>{{depot_garantie}} FCFA</strong> est versé par le Locataire Agricole au Bailleur à la signature du contrat. Ce dépôt sera restitué en fin de bail, déduction faite des éventuels dommages ou dettes du Locataire.</p><h2>Article 6 — Utilisation du terrain</h2><p>Le Locataire Agricole s'engage à utiliser le terrain exclusivement à des fins agricoles, conformément à la réglementation en vigueur.</p><h2>Article 7 — Entretien du terrain</h2><p>Le Locataire Agricole est responsable de l'entretien du terrain et doit le maintenir en bon état de culture.</p><h2>Article 8 — Récolte et produits</h2><p>Le Locataire a droit aux récoltes et produits issus de l'exploitation du terrain pendant la durée du bail.</p><h2>Article 9 — Renouvellement du bail</h2><p>Les parties conviennent d'une option de renouvellement du bail en fin de période, sous réserve du respect des conditions du contrat.</p><h2>Article 10 — Résiliation</h2><p>Les conditions de résiliation du contrat, y compris les motifs de résiliation anticipée, sont précisées dans le contrat.</p><h2>Article 11 — Responsabilités et assurances</h2><p>Le Locataire Agricole est responsable des dommages causés au terrain et doit souscrire une assurance responsabilité civile pour couvrir sa responsabilité locative.</p><h2>Article 12 — Clause de force majeure</h2><p>En cas de force majeure (événements imprévisibles et inévitables), les obligations des parties seront suspendues.</p><h2>Article 13 — Loi applicable et juridiction</h2><p>Ce contrat est régi par les lois en vigueur en {{pays}} et tout litige relatif à son interprétation ou à son exécution sera de la compétence exclusive des tribunaux de {{ville}}.</p><h2>Article 14 — Modification du contrat</h2><p>Toute modification du présent contrat doit être convenue par écrit et signée par les deux parties.</p><h2>Article 15 — Communication</h2><p>Toute communication entre les parties doit être adressée aux coordonnées indiquées dans le contrat.</p><p class="signatures">Fait à {{ville}}, le {{date_jour}}<br/><br/>Signature du Bailleur — Signature du Locataire Agricole</p></div>`,
    popularity: 48,
    countriesJson: COUNTRIES_FONCIER_RURAL,
  },

  // ─────────────── 2. Partenariat en recherche agricole ───────────────
  {
    code: 'agro_partenariat_recherche', name: 'Contrat de partenariat en recherche agricole', category: 'agro_environnement', price: 2000, priceMax: 4500,
    description: 'Convention de collaboration entre deux organisations pour un programme de recherche agricole : objectifs, obligations, propriété intellectuelle.',
    fieldsJson: F([
      { key: 'partenaire1', label: 'Partenaire de Recherche 1 (organisation, adresse, téléphone, courriel)', type: 'textarea', required: true },
      { key: 'partenaire2', label: 'Partenaire de Recherche 2 (organisation, adresse, téléphone, courriel)', type: 'textarea', required: true },
      { key: 'objectifs', label: 'Objectifs de recherche agricole (description détaillée)', type: 'textarea', required: true },
      { key: 'echeancier', label: 'Échéancier prévu pour la réalisation des objectifs', type: 'text', required: true },
      { key: 'budget', label: 'Budget alloué pour la recherche (FCFA)', type: 'text', required: true },
      { key: 'juridiction', label: 'Juridiction applicable (pays / tribunaux compétents)', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE PARTENARIAT EN RECHERCHE AGRICOLE</h1><p>Ce contrat de partenariat en recherche agricole (le « Contrat ») est conclu le {{date_jour}} entre :</p><p><strong>Partenaire de Recherche 1 :</strong><br/>{{partenaire1}}<br/>(ci-après dénommé « Partenaire de Recherche 1 »)</p><p><strong>Partenaire de Recherche 2 :</strong><br/>{{partenaire2}}<br/>(ci-après dénommé « Partenaire de Recherche 2 »)</p><h2>1. Objectifs du partenariat</h2><p>Les Parties conviennent de collaborer pour atteindre les objectifs de recherche agricole suivants :</p><ul><li>{{objectifs}}</li><li>Échéancier prévu : {{echeancier}}</li><li>Budget alloué : {{budget}} FCFA</li></ul><h2>2. Obligations des Parties</h2><p><strong>2.1 Partenaire de Recherche 1 :</strong></p><ul><li>Fournir des ressources financières ou matérielles conformément à sa contribution convenue.</li><li>Mettre à disposition du personnel qualifié pour la recherche.</li><li>Partager les données de recherche et les résultats avec le Partenaire de Recherche 2.</li></ul><p><strong>2.2 Partenaire de Recherche 2 :</strong></p><ul><li>Mettre à disposition du personnel qualifié pour la recherche.</li><li>Contribuer financièrement ou matériellement conformément à sa contribution convenue.</li><li>Collaborer activement à la réalisation des objectifs de recherche.</li></ul><h2>3. Propriété intellectuelle</h2><p>Les Parties conviennent que la propriété intellectuelle découlant de cette recherche sera partagée conformément aux termes d'un accord de propriété intellectuelle distinct.</p><h2>4. Confidentialité</h2><p>Les Parties s'engagent à maintenir la confidentialité des informations sensibles liées à la recherche, sauf accord contraire.</p><h2>5. Durée du contrat</h2><p>Ce Contrat entre en vigueur à compter de la date de signature et reste en vigueur jusqu'à la réalisation des objectifs de recherche, sauf résiliation anticipée par accord mutuel des Parties.</p><h2>6. Loi applicable et juridiction</h2><p>Ce Contrat est régi par les lois de {{juridiction}} et tout litige découlant de ce Contrat sera soumis à la compétence exclusive des tribunaux de {{juridiction}}.</p><h2>7. Signatures</h2><p>Ce Contrat entre en vigueur à compter de la date de signature par les deux Parties.</p><p class="signatures">Signature du Partenaire de Recherche 1 : ______________________ Date : _________<br/><br/>Signature du Partenaire de Recherche 2 : ______________________ Date : _________</p></div>`,
    popularity: 20,
  },

  // ─────────────── 3. Assurance des risques agricoles ───────────────
  {
    code: 'agro_assurance_risques', name: 'Contrat d’assurance des risques agricoles', category: 'agro_environnement', price: 3000, priceMax: 5500,
    description: 'Assurance des cultures et biens agricoles : sécheresse, inondation, grêle, incendie, vol, maladies des cultures et pertes de récolte.',
    fieldsJson: F([
      { key: 'assureur', label: 'Compagnie d’assurance (nom, n° d’enregistrement, siège social, représentant légal)', type: 'textarea', required: true },
      { key: 'assure', label: 'Exploitant agricole assuré (nom, n° d’enregistrement, siège, représentant)', type: 'textarea', required: true },
      { key: 'montant_indemnisation', label: 'Montant maximal de l’indemnisation (FCFA)', type: 'text', required: true },
      { key: 'duree', label: 'Durée de la période d’assurance', type: 'text', required: true },
      { key: 'preavis', label: 'Préavis de résiliation (jours/mois)', type: 'text', required: true },
      { key: 'ville', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT D'ASSURANCE POUR LES RISQUES AGRICOLES</h1><p>Entre <strong>{{assureur}}</strong>, dûment habilitée à cet effet, ci-après dénommée « la Compagnie d'Assurance »,</p><p>Et <strong>{{assure}}</strong>, exploitant agricole, ci-après dénommé « l'Assuré »,</p><p>Ci-après dénommés collectivement les « Parties » et individuellement une « Partie ».</p><p>Considérant que la Compagnie d'Assurance est autorisée à fournir des services d'assurance pour les risques agricoles conformément à la réglementation en vigueur dans l'Espace OHADA, et que l'Assuré exploite une activité agricole et souhaite assurer ses cultures et ses biens contre les risques spécifiés dans la police d'assurance, les Parties conviennent ce qui suit :</p><h2>Article 1 — Objet de l'assurance</h2><p>La Compagnie d'Assurance s'engage à indemniser l'Assuré pour les pertes financières subies en raison de dommages matériels causés à ses cultures, bâtiments agricoles, équipements et autres biens agricoles spécifiés dans la police d'assurance, en cas d'événements tels que la sécheresse, les inondations, les incendies, les tempêtes, etc.</p><h2>Article 2 — Risques couverts</h2><p>Cette assurance couvre les risques agricoles suivants :</p><ul><li>Dommages causés aux cultures par des événements climatiques extrêmes (sécheresse, inondation, grêle, gel, etc.)</li><li>Incendie ou explosion affectant les bâtiments agricoles et les équipements</li><li>Vol ou vandalisme des biens agricoles</li><li>Pertes de récolte suite à des maladies ou des infestations</li><li>Autres risques agricoles spécifiés dans la police d'assurance</li></ul><h2>Article 3 — Montant de l'indemnisation</h2><p>La Compagnie d'Assurance indemnise l'Assuré pour les dommages matériels subis par ses biens agricoles jusqu'à concurrence de <strong>{{montant_indemnisation}} FCFA</strong>, sous réserve des conditions et exclusions énoncées dans la police.</p><h2>Article 4 — Prime d'assurance</h2><p>L'Assuré s'engage à payer à la Compagnie d'Assurance une prime d'assurance calculée en fonction de la valeur assurée de ses biens agricoles, des risques couverts et des caractéristiques spécifiques de son exploitation.</p><h2>Article 5 — Durée de l'assurance</h2><p>Cette assurance est valable pour une période de {{duree}} à compter de la date de prise d'effet de la police, conformément aux dispositions de la réglementation en vigueur dans l'Espace OHADA.</p><h2>Article 6 — Résiliation</h2><p>Chaque Partie a le droit de résilier cette assurance moyennant un préavis écrit de {{preavis}} à l'autre Partie, conformément aux dispositions de la réglementation en vigueur dans l'Espace OHADA.</p><h2>Article 7 — Loi applicable</h2><p>Ce contrat est régi et interprété conformément aux lois en vigueur dans l'Espace OHADA.</p><p class="signatures">Fait en deux exemplaires originaux à {{ville}}, le {{date_jour}}<br/><br/>Pour la Compagnie d'Assurance (représentant légal) — Pour l'Assuré (représentant légal)</p></div>`,
    popularity: 32,
  },

  // ─────── 4. Gestion des comptes de fonds de capital de risque agricole ───────
  {
    code: 'agro_fonds_capital_risque', name: 'Contrat de gestion de comptes de fonds agricoles', category: 'agro_environnement', price: 3500, priceMax: 6000,
    description: 'Convention entre une banque dépositaire et une société de gestion de fonds de capital de risque agricole : comptes, opérations, reporting.',
    fieldsJson: F([
      { key: 'banque', label: 'Banque (nom, n° d’enregistrement, siège social, représentant légal)', type: 'textarea', required: true },
      { key: 'societe_gestion', label: 'Société de gestion de fonds (nom, n° d’enregistrement, domicile, représentant légal)', type: 'textarea', required: true },
      { key: 'preavis', label: 'Durée du préavis de résiliation', type: 'text', required: true },
      { key: 'juridiction', label: 'Juridiction compétente (loi applicable et tribunaux)', type: 'text', required: true },
      { key: 'ville', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE GESTION DES COMPTES DE FONDS DE CAPITAL DE RISQUE AGRICOLE</h1><p>Entre <strong>{{banque}}</strong>, institution financière dûment habilitée à agir en son nom, ci-après dénommée « la Banque »,</p><p>Et <strong>{{societe_gestion}}</strong>, société de gestion de fonds de capital de risque agricole, ci-après dénommée « la Société de Gestion »,</p><p>Ci-après collectivement dénommées « les Parties ». Il est convenu ce qui suit :</p><h2>Article 1 — Objet</h2><p>1.1 La Banque agira en qualité de dépositaire et gestionnaire des comptes de fonds de capital de risque agricole gérés par la Société de Gestion, conformément aux termes et conditions énoncés dans le présent contrat.</p><h2>Article 2 — Ouverture des comptes</h2><p>2.1 La Banque ouvrira et gérera des comptes bancaires spécifiques pour chaque fonds de capital de risque agricole géré par la Société de Gestion, conformément aux instructions de la Société de Gestion et aux dispositions légales et réglementaires en vigueur.</p><h2>Article 3 — Opérations autorisées</h2><p>3.1 La Société de Gestion est autorisée à effectuer des opérations de dépôt, de retrait, de virement, d'investissement, de financement agricole et toute autre opération bancaire standard sur les comptes des fonds, conformément aux dispositions légales et aux politiques internes de la Banque.</p><h2>Article 4 — Reporting et suivi</h2><p>4.1 La Banque fournira à la Société de Gestion des rapports réguliers sur l'état des comptes des fonds, y compris les relevés de compte, les états des transactions et tout autre rapport nécessaire à la gestion financière des fonds.</p><h2>Article 5 — Gestion des flux financiers</h2><p>5.1 La Banque agira en qualité de gestionnaire des flux financiers des fonds de capital de risque agricole, notamment en facilitant les transactions agricoles, les investissements, les paiements, les transferts de fonds et toute autre opération financière conforme aux instructions de la Société de Gestion.</p><h2>Article 6 — Frais et charges</h2><p>6.1 La Société de Gestion accepte de payer à la Banque tous les frais et charges associés à la gestion des comptes des fonds, conformément aux tarifs des frais bancaires en vigueur et aux accords spécifiques convenus entre les Parties.</p><h2>Article 7 — Confidentialité</h2><p>7.1 Les informations relatives aux comptes des fonds seront traitées par la Banque de manière confidentielle et ne seront divulguées à des tiers que conformément à la loi ou avec le consentement écrit de la Société de Gestion.</p><h2>Article 8 — Durée du contrat</h2><p>8.1 Le présent contrat entre en vigueur à la date de sa signature par les deux Parties et demeure en vigueur pour une durée indéterminée, sauf résiliation anticipée conformément à l'article 9.</p><h2>Article 9 — Résiliation</h2><p>9.1 Chaque Partie peut résilier le présent contrat moyennant un préavis écrit de {{preavis}}.</p><h2>Article 10 — Loi applicable et règlement des litiges</h2><p>Ce contrat est régi par les lois en vigueur dans {{juridiction}}. Tout litige découlant de ce contrat sera soumis à la juridiction exclusive des tribunaux compétents de {{juridiction}}.</p><p class="signatures">Fait en deux exemplaires originaux à {{ville}}, le {{date_jour}}<br/><br/>Pour la Banque (représentant légal) — Pour la Société de Gestion (représentant légal)</p></div>`,
    popularity: 15,
  },

  // ─────────────── 5. Plan de prévention HSE ───────────────
  {
    code: 'qhse_plan_prevention_hse', name: 'Plan de prévention HSE (entreprises extérieures)', category: 'agro_environnement', price: 4000, priceMax: 7000,
    description: 'Plan de prévention santé-sécurité-environnement entre entreprise utilisatrice et entreprises extérieures : règles d’or, permis de feu, travail en hauteur, espaces confinés.',
    fieldsJson: F([
      { key: 'entreprise_utilisatrice', label: 'Entreprise utilisatrice (nom, site, adresse, téléphone, exploitant, donneur d’ordre, surveillant de chantier)', type: 'textarea', required: true },
      { key: 'operation', label: 'Opération concernée (description des travaux)', type: 'textarea', required: true },
      { key: 'reference', label: 'N° de référence du plan (à rappeler sur autorisations de travail et permis)', type: 'text', required: true },
      { key: 'date_debut', label: 'Date de début des travaux', type: 'date', required: true },
      { key: 'date_fin', label: 'Date de fin prévue des travaux', type: 'date', required: true },
      { key: 'entreprises_exterieures', label: 'Entreprises extérieures (nom, chef de chantier, effectif, période, travaux, lieu — une par ligne)', type: 'textarea', required: true },
      { key: 'risques', label: 'Risques identifiés et mesures de prévention à mettre en œuvre', type: 'textarea', required: true },
      { key: 'urgences', label: 'Consignes d’urgence du site (signal d’alarme, point de ralliement, lieu où donner l’alerte)', type: 'textarea', required: true },
    ]),
    body: `<div class="contrat"><h1>PLAN DE PRÉVENTION HSE</h1><p><strong>Opération :</strong> {{operation}}<br/><strong>N° réf. :</strong> {{reference}} (à rappeler sur les autorisations de travail et permis)<br/><strong>Date de début :</strong> {{date_debut}} — <strong>Date de fin prévue :</strong> {{date_fin}}</p><p>Ce document doit être archivé pour une durée de 10 ans. Les documents associés (autorisations de travail générales, permis spécifiques…) sont archivés sur l'année en cours et l'année passée. La présence du chef de chantier de chaque Entreprise Extérieure est obligatoire.</p><p>Aujourd'hui, le {{date_jour}}, l'Entreprise Utilisatrice (E.U.) et les représentants des Entreprises Extérieures (E.E.) désignées ci-après ont établi, après une visite commune préalable des lieux, le présent Plan de Prévention HSE concernant l'opération décrite ci-dessus. Si l'opération venait à se prolonger au-delà de la date de fin prévue, un nouveau Plan de Prévention HSE devrait être établi.</p><p>Le but de cet accord est de fixer, avant le début des travaux, les mesures de prévention adaptées aux risques identifiés pour la santé, la sécurité et l'environnement dans toutes les phases d'activités dangereuses retenues. Chaque responsable d'Entreprise Extérieure s'engage à transmettre toutes les informations de ce plan à ses sous-traitants et à chacun de ses salariés appelés à participer au chantier, et demeure responsable de l'application des mesures de prévention nécessaires à la protection de son personnel.</p><h2>1. Identification des signataires</h2><p><strong>Entreprise Utilisatrice :</strong><br/>{{entreprise_utilisatrice}}</p><p><strong>Entreprises Extérieures :</strong><br/>{{entreprises_exterieures}}</p><p>Un organigramme (nom, fonction, lien hiérarchique) doit être joint pour chaque entreprise, contractante comme sous-traitante. L'Entreprise Extérieure doit informer dans les plus brefs délais l'exploitant ou le donneur d'ordre de tout recours à un nouveau sous-traitant non prévu dans le présent plan.</p><h2>2. Rappel des règles d'or</h2><ul><li><strong>Règle 1 — Situations à risques :</strong> interdiction de fumer hors zones autorisées, de travailler ou conduire sous l'emprise de l'alcool ou de drogue ; obligation d'analyser les risques avant toute opération peu fréquente ou complexe et de signaler les situations dégradées.</li><li><strong>Règle 2 — Circulation :</strong> respect des limites de vitesse, interdiction du téléphone au volant, contrôle des véhicules avant utilisation, port de la ceinture de sécurité.</li><li><strong>Règle 3 — Gestes, postures, outillage :</strong> interdiction d'utiliser un outil défectueux ou non adapté ; utiliser les outils prévus par les autorisations et permis de travail.</li><li><strong>Règle 4 — Équipements de protection :</strong> port obligatoire des EPI définis pour la zone et la tâche ; interdiction de franchir ou modifier une barrière de protection sans autorisation.</li><li><strong>Règle 5 — Permis et autorisations de travail :</strong> interdiction d'effectuer des travaux sans permis et autorisation de travail validés ; nouveau permis obligatoire si les conditions changent.</li><li><strong>Règle 6 — Opérations de levage :</strong> interdiction de passer ou rester sous une charge ; analyse de risques, plan de levage et balisage obligatoires.</li><li><strong>Règle 7 — Systèmes alimentés en énergie :</strong> contrôle préalable de l'absence d'énergie et de fluides avant intervention ; respect du schéma d'isolement.</li><li><strong>Règle 8 — Espaces confinés :</strong> interdiction de pénétrer dans un espace confiné sans isolation, contrôle d'atmosphère, surveillance permanente et plan d'évacuation d'urgence.</li><li><strong>Règle 9 — Travaux de fouille :</strong> permis établi à partir des plans du sous-sol, balisage de la zone et identification des ouvrages souterrains.</li><li><strong>Règle 10 — Travaux en hauteur :</strong> harnais de sécurité obligatoire hors barrières de sécurité, échafaudage vérifié, distance de sécurité avec les lignes électriques.</li><li><strong>Règle 11 — Gestion du changement :</strong> aucune modification technique ou organisationnelle sans autorisation préalable et analyse de risques.</li><li><strong>Règle 12 — Opérations simultanées ou coactivités :</strong> visite préliminaire, analyse de risques et désignation d'un coordinateur obligatoires.</li></ul><h2>3. Permis complémentaires obligatoires</h2><p>Il est interdit de commencer à travailler sans une autorisation de travail. De plus, un permis complémentaire est obligatoire pour :</p><ul><li><strong>Permis de feu</strong> : travaux par points chauds (flamme nue, étincelles, températures élevées, zones à risque d'explosion) ;</li><li><strong>Permis de fouille</strong> : excavation de plus de 0,50 m, terrassement, forage ou plantation de pieux ;</li><li><strong>Permis de nettoyage/dégazage</strong> : nettoyage/dégazage de toute capacité (certificat à remettre à l'issue) ;</li><li><strong>Permis de travail en espace confiné</strong> : capacités, réservoirs, cuves, citernes, fosses, puisards, égouts, tranchées de plus de 1,5 m ;</li><li><strong>Permis de travail en hauteur</strong> : tout travail exposant à un risque de chute de plus de 2 mètres ;</li><li><strong>Permis de levage</strong> : levage d'une charge de 100 kg ou plus.</li></ul><h2>4. Analyse des risques et mesures de prévention</h2><p>Au vu de la visite commune préalable, il est procédé à l'analyse des risques pouvant résulter de l'interférence entre les activités, installations et matériels, et à la définition des phases d'activités dangereuses et des moyens de prévention spécifiques correspondants, y compris pour la protection de l'environnement :</p><p>{{risques}}</p><h2>5. Conduite à tenir en cas d'accident</h2><p>Tout accident, corporel ou matériel, doit systématiquement et sans délai être signalé à l'exploitant ou au donneur d'ordre. En cas d'accident corporel : <strong>Protéger</strong> la victime sans se mettre soi-même en danger, <strong>Alerter</strong> les secours conformément au plan d'urgence, <strong>Secourir</strong> en s'abstenant de bouger la victime sauf danger grave et imminent. Ne reprendre le travail qu'après confirmation de la fin de l'alerte.</p><p><strong>Consignes d'urgence du site :</strong><br/>{{urgences}}</p><h2>6. Engagement des signataires</h2><p>Les responsables des entreprises, signataires du présent Plan de Prévention HSE, s'engagent à faire connaître à leurs salariés les mesures définies ici. Les fiches d'aptitude médicale, les certificats de formation, les habilitations du personnel et le PV de visite commune préalable font partie intégrante du présent plan.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>Pour l'Entreprise Utilisatrice (nom, fonction, visa) — Pour chaque Entreprise Extérieure (nom, fonction, visa)</p></div>`,
    popularity: 38,
  },

  // ─────────────── 6. Politique de sécurité au travail ───────────────
  {
    code: 'qhse_politique_securite', name: 'Politique de sécurité au travail', category: 'agro_environnement', price: 2000, priceMax: 4000,
    description: 'Document de politique santé-sécurité de l’entreprise : engagement, responsabilités, formation, EPI, procédures d’urgence et suivi.',
    fieldsJson: F([
      { key: 'entreprise', label: 'Nom de l’entreprise', type: 'text', required: true },
      { key: 'service_securite', label: 'Service ou responsable santé-sécurité (nom / contact)', type: 'text', required: true },
      { key: 'engagements_specifiques', label: 'Engagements ou règles spécifiques à votre activité (facultatif)', type: 'textarea', required: false },
      { key: 'signataire', label: 'Signataire (nom + fonction, ex. Directeur Général)', type: 'text', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>POLITIQUE DE SÉCURITÉ AU TRAVAIL</h1><p><strong>{{entreprise}}</strong></p><h2>1. Engagement en matière de sécurité</h2><p>La sécurité au travail est une priorité absolue de notre entreprise. Nous nous engageons à fournir un environnement de travail sûr et sain pour tous nos employés.</p><h2>2. Responsabilités</h2><ul><li>La direction est responsable de mettre en œuvre et de maintenir un programme de sécurité efficace.</li><li>Les superviseurs sont chargés de veiller à ce que les politiques de sécurité soient respectées et que les employés reçoivent la formation nécessaire pour effectuer leur travail en toute sécurité.</li><li>Les employés sont tenus de suivre les politiques et les procédures de sécurité, de signaler les dangers ou les préoccupations en matière de sécurité et de participer activement aux programmes de sécurité.</li></ul><h2>3. Formation en sécurité</h2><ul><li>Tous les employés recevront une formation initiale en matière de sécurité lors de leur intégration et des formations périodiques seront organisées pour actualiser leurs connaissances.</li><li>La formation en sécurité comprendra des instructions sur l'utilisation sûre des équipements, la manipulation des substances dangereuses, les procédures d'évacuation en cas d'urgence, etc.</li></ul><h2>4. Identification et signalement des risques</h2><ul><li>Les employés sont encouragés à signaler tout risque potentiel pour la sécurité à leur superviseur ou au service de santé et de sécurité : {{service_securite}}.</li><li>Des inspections régulières seront effectuées pour identifier les dangers potentiels et prendre des mesures correctives appropriées.</li></ul><h2>5. Équipements de protection individuelle (EPI)</h2><ul><li>Lorsque cela est nécessaire, des équipements de protection individuelle seront fournis aux employés et leur utilisation sera obligatoire dans les situations à risque.</li><li>Les employés sont tenus de porter les EPI appropriés et de les entretenir correctement.</li></ul><h2>6. Procédures d'urgence</h2><ul><li>Des plans d'urgence seront élaborés pour faire face aux situations d'urgence telles que les incendies, les accidents chimiques ou les évacuations.</li><li>Tous les employés seront formés aux procédures d'urgence et des exercices d'évacuation seront organisés régulièrement.</li></ul><h2>7. Suivi et évaluation</h2><ul><li>L'efficacité des mesures de sécurité sera régulièrement évaluée et des ajustements seront apportés en fonction des changements dans l'environnement de travail ou des retours d'expérience des employés.</li><li>Les statistiques d'accidents et les rapports d'incidents seront suivis pour identifier les tendances et prendre des mesures correctives.</li></ul><h2>8. Dispositions spécifiques</h2><p>{{engagements_specifiques}}</p><p>Cette politique de sécurité au travail vise à promouvoir une culture de sécurité proactive, à prévenir les accidents et les blessures professionnelles et à assurer le bien-être et la santé de tous les employés sur le lieu de travail.</p><p class="signatures">Fait à {{ville}}, le {{date_jour}}<br/><br/>{{signataire}}<br/>(signature et cachet de l'entreprise)</p></div>`,
    popularity: 35,
  },

  // ─────────────── 7. Rapport / fiche d'accident de travail ───────────────
  {
    code: 'qhse_rapport_accident', name: 'Rapport d’accident de travail', category: 'agro_environnement', price: 1500, priceMax: 3000,
    description: 'Fiche de déclaration d’accident de travail : identification de l’employé, description de l’accident, causes et mesures correctives.',
    fieldsJson: F([
      { key: 'employe', label: 'Employé (nom, prénom, n° de matricule, poste)', type: 'textarea', required: true },
      { key: 'date_accident', label: 'Date de l’accident', type: 'date', required: true },
      { key: 'heure_lieu', label: 'Heure et lieu de l’accident', type: 'text', required: true },
      { key: 'description', label: 'Description et déroulement de l’accident', type: 'textarea', required: true },
      { key: 'blessures', label: 'Description des blessures ou conséquences potentielles', type: 'textarea', required: true },
      { key: 'causes', label: 'Possibles causes de l’accident', type: 'textarea', required: true },
      { key: 'temoins', label: 'Personnes impliquées ou témoins', type: 'textarea', required: false },
      { key: 'superieur', label: 'Supérieur immédiat (nom, prénom) et mesures correctives à apporter', type: 'textarea', required: true },
    ]),
    body: `<div class="contrat"><h1>RAPPORT D'ACCIDENT</h1><p>Le présent rapport d'accident doit être rempli lorsqu'un événement qui aurait pu entraîner des dommages ou des blessures critiques ou graves est survenu. L'employé doit remplir la partie 1 et faire parvenir une copie du document à son supérieur immédiat le plus rapidement possible, ou au plus tard 24 heures après l'accident. Le supérieur immédiat doit remplir la partie 2 et faire parvenir le document au département des ressources humaines dans les plus brefs délais.</p><h2>Partie 1 — À remplir par l'employé</h2><h3>Identification de l'employé</h3><p>{{employe}}</p><p><strong>Date de l'accident :</strong> {{date_accident}}<br/><strong>Heure et lieu de l'accident :</strong> {{heure_lieu}}</p><h3>Description de l'accident</h3><p><strong>Description et déroulement :</strong><br/>{{description}}</p><p><strong>Description des potentielles blessures ou conséquences :</strong><br/>{{blessures}}</p><p><strong>Possibles causes de l'accident :</strong><br/>{{causes}}</p><p><strong>Personnes impliquées ou témoins :</strong><br/>{{temoins}}</p><p><strong>Photos :</strong> (joindre le cas échéant)</p><p>Signature de l'employé : _____________________ Date : {{date_jour}}</p><h2>Partie 2 — À remplir par le supérieur immédiat</h2><h3>Identification du supérieur immédiat et mesures de prévention</h3><p><strong>Causes de l'accident retenues et mesures correctives à apporter :</strong><br/>{{superieur}}</p><p><strong>Renseignements additionnels :</strong> ____________________________________________</p><p class="signatures">Signature du supérieur direct : _____________________ Date : ________________</p></div>`,
    popularity: 42,
  },

  // ─────────────── 8. Contrat de sécurité sur le chantier ───────────────
  {
    code: 'qhse_securite_chantier', name: 'Contrat de sécurité sur chantier', category: 'agro_environnement', price: 2500, priceMax: 5000,
    description: 'Contrat entre entreprise de construction et société de sécurité : surveillance du chantier, inspections, formation, intervention et rapports.',
    fieldsJson: F([
      { key: 'entreprise_construction', label: 'Entreprise de construction (nom, pays d’enregistrement, représentant et titre, siège)', type: 'textarea', required: true },
      { key: 'societe_securite', label: 'Société de sécurité (nom, pays d’enregistrement, représentant et titre, siège)', type: 'textarea', required: true },
      { key: 'lieu_chantier', label: 'Lieu du chantier de construction', type: 'text', required: true },
      { key: 'date_debut', label: 'Date de début du chantier', type: 'date', required: true },
      { key: 'date_fin', label: 'Date de fin prévue du chantier', type: 'date', required: true },
      { key: 'pays', label: 'Pays (loi applicable)', type: 'text', required: true },
      { key: 'ville', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE SÉCURITÉ SUR LE CHANTIER</h1><p>Entre les soussignés :</p><p><strong>{{entreprise_construction}}</strong>, ci-après désignée « l'Entreprise de Construction »,</p><p>et</p><p><strong>{{societe_securite}}</strong>, ci-après désignée « la Société de Sécurité »,</p><p>Il a été convenu ce qui suit :</p><h2>Article 1 — Objet</h2><p>Le présent contrat a pour objet d'établir les responsabilités et les procédures relatives à la sécurité sur le chantier de construction situé à <strong>{{lieu_chantier}}</strong>, ci-après désigné « le Chantier ».</p><h2>Article 2 — Responsabilités de la Société de Sécurité</h2><p>La Société de Sécurité s'engage à fournir les services de sécurité suivants sur le Chantier :</p><ul><li>Surveillance et contrôle de l'accès au Chantier.</li><li>Inspection régulière des équipements de sécurité.</li><li>Formation et sensibilisation des travailleurs aux règles de sécurité.</li><li>Intervention en cas d'incident ou d'accident sur le Chantier.</li><li>Rédaction de rapports de sécurité et d'incidents.</li></ul><h2>Article 3 — Responsabilités de l'Entreprise de Construction</h2><p>L'Entreprise de Construction s'engage à :</p><ul><li>Fournir tous les équipements de sécurité nécessaires sur le Chantier.</li><li>Coopérer pleinement avec la Société de Sécurité pour garantir un environnement de travail sécurisé.</li><li>Informer immédiatement la Société de Sécurité de tout incident ou accident sur le Chantier.</li><li>Respecter toutes les règles de sécurité établies par la Société de Sécurité.</li></ul><h2>Article 4 — Protocoles de sécurité</h2><p>Les protocoles de sécurité spécifiques au Chantier sont établis en annexe à ce contrat et font partie intégrante de celui-ci. Ils détaillent les mesures de sécurité, les procédures d'urgence et les responsabilités de chaque partie.</p><h2>Article 5 — Durée</h2><p>Le présent contrat de sécurité sur le Chantier est établi pour la durée du projet de construction, à partir du {{date_debut}} jusqu'à la fin du chantier prévue le {{date_fin}}.</p><h2>Article 6 — Résiliation</h2><p>Ce contrat peut être résilié par l'une ou l'autre des parties en cas de non-respect grave des termes et conditions énoncés.</p><h2>Article 7 — Dispositions générales</h2><p>Le présent contrat est régi par les lois de {{pays}}. Toute modification de ce contrat doit être faite par écrit et signée par les deux parties.</p><p class="signatures">Fait à {{ville}}, le {{date_jour}}, en deux exemplaires originaux<br/><br/>Pour l'Entreprise de Construction — Pour la Société de Sécurité</p></div>`,
    popularity: 28,
  },

  // ─────────────── 9. Fiche d'observation du registre SST ───────────────
  {
    code: 'qhse_registre_sst', name: 'Fiche d’observation du registre santé-sécurité', category: 'agro_environnement', price: 1000, priceMax: 2500,
    description: 'Fiche d’observation du registre de santé et de sécurité au travail : signalement par l’agent, mesures proposées, décision et avis du comité.',
    fieldsJson: F([
      { key: 'structure', label: 'Structure / collectivité / entreprise', type: 'text', required: true },
      { key: 'agent', label: 'Agent ou usager déclarant (nom, prénom, service, fonction)', type: 'textarea', required: true },
      { key: 'date_heure_lieu', label: 'Date, heure et lieu de l’observation', type: 'text', required: true },
      { key: 'observations', label: 'Observations et suggestions', type: 'textarea', required: true },
      { key: 'responsable', label: 'Responsable hiérarchique ou de service (nom, prénom, service, fonction)', type: 'textarea', required: true },
      { key: 'mesures', label: 'Mesures proposées par le responsable', type: 'textarea', required: true },
      { key: 'decision', label: 'Décision de l’autorité (direction) — facultatif', type: 'textarea', required: false },
      { key: 'avis_comite', label: 'Avis du comité santé-sécurité (CT/CHSCT) — facultatif', type: 'textarea', required: false },
    ]),
    body: `<div class="contrat"><h1>FICHE D'OBSERVATION DU REGISTRE DE SANTÉ ET DE SÉCURITÉ AU TRAVAIL</h1><p><strong>Structure :</strong> {{structure}}</p><h2>1. À remplir par l'agent ou l'usager</h2><p><strong>Déclarant :</strong><br/>{{agent}}</p><p><strong>Date, heure et lieu :</strong> {{date_heure_lieu}}</p><p><strong>Observations et suggestions :</strong><br/>{{observations}}</p><p>Signature de l'agent ou de l'usager : _____________________</p><h2>2. À remplir par le responsable hiérarchique ou de service</h2><p><strong>Responsable :</strong><br/>{{responsable}}</p><p><strong>Mesures proposées :</strong><br/>{{mesures}}</p><p>Signature : _____________________</p><h2>3. À remplir par l'autorité (direction)</h2><p><strong>Décision :</strong><br/>{{decision}}</p><p>Signature : _____________________</p><h2>4. À remplir par le comité santé-sécurité (CT/CHSCT)</h2><p><strong>Avis :</strong><br/>{{avis_comite}}</p><p class="signatures">Fait le {{date_jour}}<br/><br/>N° de page : ______ — Cachet et signature de l'autorité authentifiant le suivi des fiches</p></div>`,
    popularity: 25,
  },

  // ─────────────── 10. Études d'impact environnemental ───────────────
  {
    code: 'qhse_etude_impact_env', name: 'Contrat d’études d’impact environnemental', category: 'agro_environnement', price: 3000, priceMax: 6000,
    description: 'Contrat entre un maître d’ouvrage et une société d’études pour la réalisation d’études d’impact environnemental (EIE) d’un projet.',
    fieldsJson: F([
      { key: 'client', label: 'Client / maître d’ouvrage (nom, n° d’enregistrement, siège social)', type: 'textarea', required: true },
      { key: 'societe_etudes', label: 'Société d’études environnementales (nom, n° d’enregistrement, siège social)', type: 'textarea', required: true },
      { key: 'projet', label: 'Description du projet soumis aux études d’impact', type: 'textarea', required: true },
      { key: 'duree', label: 'Durée du contrat (ex. 6 mois, du 01/03/2027 au 31/08/2027)', type: 'text', required: true },
      { key: 'preavis', label: 'Préavis de résiliation (nombre de jours)', type: 'text', required: true },
      { key: 'juridiction', label: 'Juridiction compétente (loi applicable et arbitrage)', type: 'text', required: true },
      { key: 'ville', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT POUR ÉTUDES D'IMPACT ENVIRONNEMENTAL</h1><h2>Article 1 — Parties au contrat</h2><p>Le présent contrat d'études d'impact environnemental (le « Contrat ») est conclu entre <strong>{{client}}</strong>, ci-après dénommé « le Client », et <strong>{{societe_etudes}}</strong>, ci-après dénommée « la Société d'Études ».</p><h2>Article 2 — Objet du contrat</h2><p>Le présent Contrat a pour objet de définir les modalités de réalisation des études d'impact environnemental (EIE) par la Société d'Études, conformément aux termes et conditions énoncés dans le présent Contrat.</p><h2>Article 3 — Travaux à réaliser</h2><p>La Société d'Études s'engage à réaliser les études d'impact environnemental nécessaires pour le projet du Client, décrit ci-après : {{projet}}. Les EIE incluront l'évaluation des impacts environnementaux potentiels du projet et des mesures d'atténuation appropriées.</p><h2>Article 4 — Responsabilités du Client</h2><p>Le Client s'engage à fournir à la Société d'Études toutes les informations nécessaires sur le projet, y compris les données techniques et les accès aux sites concernés. Le Client devra également payer les montants dus à la Société d'Études conformément aux termes de paiement convenus.</p><h2>Article 5 — Responsabilités de la Société d'Études</h2><p>La Société d'Études s'engage à réaliser les EIE conformément aux meilleures pratiques de l'industrie et aux normes environnementales en vigueur. La Société d'Études devra fournir au Client un rapport complet des EIE, y compris les résultats, les recommandations et les conclusions.</p><h2>Article 6 — Durée du contrat</h2><p>Le Contrat est établi pour une durée de {{duree}}. Il peut être renouvelé avec l'accord des deux parties.</p><h2>Article 7 — Rémunération</h2><p>La rémunération de la Société d'Études pour les EIE réalisées est spécifiée dans une annexe financière séparée ou dans une annexe à ce Contrat.</p><h2>Article 8 — Loi applicable et litiges</h2><p>Ce Contrat est régi par les lois en vigueur dans {{juridiction}}. Tout litige découlant de ce Contrat sera soumis à la médiation ou à l'arbitrage conformément aux règles d'arbitrage en vigueur dans {{juridiction}}.</p><h2>Article 9 — Résiliation du contrat</h2><p>Chacune des parties peut résilier le Contrat en respectant un préavis écrit de {{preavis}} jours. Les motifs de résiliation sont également spécifiés dans une annexe à ce Contrat.</p><p class="signatures">Fait en deux exemplaires originaux à {{ville}}, le {{date_jour}}<br/><br/>Pour le Client (nom et signature du représentant) — Pour la Société d'Études Environnementales (nom et signature du représentant)</p></div>`,
    popularity: 30,
  },

  // ─────────────── 11. Certificat de respect des normes environnementales ───────────────
  {
    code: 'qhse_certificat_normes_env', name: 'Certificat de respect des normes environnementales', category: 'agro_environnement', price: 1500, priceMax: 3500,
    description: 'Certificat attestant la conformité d’une entreprise aux normes environnementales pour un projet ou un appel d’offres.',
    fieldsJson: F([
      { key: 'organisme', label: 'Organisme délivrant le certificat (nom + coordonnées)', type: 'textarea', required: true },
      { key: 'entreprise', label: 'Entreprise certifiée', type: 'text', required: true },
      { key: 'projet', label: 'Projet ou appel d’offres concerné', type: 'text', required: true },
      { key: 'organisme_evaluation', label: 'Organisme d’évaluation environnementale ayant effectué l’évaluation', type: 'text', required: true },
      { key: 'details_conformite', label: 'Détails de la conformité (normes applicables, mesures prises, actions mises en œuvre)', type: 'textarea', required: true },
      { key: 'date_expiration', label: 'Date d’expiration du certificat (le cas échéant)', type: 'date', required: false },
      { key: 'directeur', label: 'Directeur de l’organisme d’évaluation (nom)', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><p><strong>{{organisme}}</strong></p><h1>CERTIFICAT DE RESPECT DES NORMES ENVIRONNEMENTALES</h1><p>Ce certificat atteste que <strong>{{entreprise}}</strong> est en conformité avec les normes environnementales applicables pour le projet ou l'appel d'offres <strong>{{projet}}</strong>. L'évaluation du respect des normes a été effectuée par <strong>{{organisme_evaluation}}</strong> conformément aux critères et aux exigences établis par l'organisme demandeur.</p><h2>Détails de la conformité aux normes environnementales</h2><p>{{details_conformite}}</p><p><strong>Date de délivrance du certificat :</strong> {{date_jour}}<br/><strong>Date d'expiration du certificat :</strong> {{date_expiration}}</p><p>Ce certificat est délivré en reconnaissance des efforts de {{entreprise}} pour respecter les normes environnementales requises. Il témoigne de l'engagement de l'entreprise en faveur de la protection de l'environnement et de la durabilité dans le cadre du projet ou de l'appel d'offres susmentionné.</p><p class="signatures">Directeur de l'organisme d'évaluation environnementale : {{directeur}}<br/><br/>Signature et sceau de l'organisme d'évaluation environnementale</p></div>`,
    popularity: 22,
  },

  // ─────────────── 12. Prestation d'ingénierie environnementale ───────────────
  {
    code: 'qhse_ingenierie_env', name: 'Contrat de prestation d’ingénierie environnementale', category: 'agro_environnement', price: 2500, priceMax: 5000,
    description: 'Contrat de services d’ingénierie environnementale : études, évaluations des risques, plans de gestion, honoraires et confidentialité.',
    fieldsJson: F([
      { key: 'prestataire', label: 'Prestataire (nom, juridiction d’enregistrement, siège social)', type: 'textarea', required: true },
      { key: 'client', label: 'Client (nom, juridiction d’enregistrement, siège social)', type: 'textarea', required: true },
      { key: 'services', label: 'Services d’ingénierie environnementale à fournir (études, évaluations des risques, plans de gestion…)', type: 'textarea', required: true },
      { key: 'duree', label: 'Durée du contrat', type: 'text', required: true },
      { key: 'honoraires', label: 'Honoraires (montant, périodicité de facturation, délai de paiement, mode de paiement)', type: 'textarea', required: true },
      { key: 'preavis', label: 'Préavis de résiliation (nombre de jours)', type: 'text', required: true },
      { key: 'juridiction', label: 'Juridiction (loi applicable et lieu de médiation)', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE PRESTATION DE SERVICES D'INGÉNIERIE ENVIRONNEMENTALE</h1><p>Entre les parties :</p><p><strong>{{prestataire}}</strong>, ci-après dénommé le « Prestataire »,</p><p>et</p><p><strong>{{client}}</strong>, ci-après dénommé le « Client »,</p><p>(individuellement désignées comme une « Partie » et collectivement désignées comme les « Parties »).</p><h2>Objet du contrat</h2><p>Le présent contrat a pour objet de définir les termes et conditions aux termes desquels le Prestataire fournira des services d'ingénierie environnementale au Client, conformément aux spécifications énoncées dans le présent contrat.</p><h2>Durée du contrat</h2><p>Ce contrat entrera en vigueur à la date de sa signature par les Parties et demeurera en vigueur pour une durée de {{duree}}, sauf résiliation anticipée conformément aux dispositions du présent contrat.</p><h2>Description des services</h2><p>Le Prestataire s'engage à fournir au Client les services d'ingénierie environnementale suivants :</p><p>{{services}}</p><h2>Honoraires et paiement</h2><p>En contrepartie des services fournis par le Prestataire, le Client s'engage à payer les honoraires conformément aux modalités suivantes :</p><p>{{honoraires}}</p><p>Les honoraires peuvent être révisés conformément aux dispositions de ce contrat.</p><h2>Résiliation</h2><p>Ce contrat peut être résilié par l'une ou l'autre des Parties en cas de non-respect substantiel des obligations contractuelles par l'autre Partie, sous réserve d'un préavis écrit de {{preavis}} jours.</p><h2>Confidentialité</h2><p>Les Parties conviennent de maintenir la confidentialité de toutes les informations confidentielles auxquelles elles peuvent avoir accès dans le cadre de l'exécution de ce contrat.</p><h2>Dispositions générales</h2><ul><li><strong>Loi applicable :</strong> ce contrat sera régi et interprété conformément aux lois de {{juridiction}}.</li><li><strong>Règlement des différends :</strong> tout différend découlant du présent contrat sera soumis à la médiation conformément aux règles de médiation en vigueur à {{juridiction}}, avant de recourir à une procédure judiciaire.</li><li><strong>Intégralité de l'accord :</strong> ce contrat constitue l'intégralité de l'accord entre les Parties et remplace tout accord antérieur, écrit ou verbal, relatif à l'objet du présent contrat.</li></ul><p class="signatures">En foi de quoi, les Parties ont signé ce contrat de prestation de services d'ingénierie environnementale le {{date_jour}}<br/><br/>Le Prestataire (signature, nom, fonction) — Le Client (signature, nom, fonction)</p></div>`,
    popularity: 24,
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
  console.log('✅ Seed Drive AGRO-PASTORAL & QHSE/ENVIRONNEMENT terminé.');
  console.log(`   Templates du script : ${templates.length} (créés : ${created}, mis à jour : ${updated})`);
  console.log(`   Catégorie : agro_environnement — codes préfixés 'agro_' / 'qhse_'`);
  console.log(`   ➜ Total de templates en base : ${total}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
