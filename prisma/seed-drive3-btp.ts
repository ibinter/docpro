// Seed Drive3 BTP — Agent Drive3-4/10 : 25 modèles BTP (troisième passe pack JUR-005)
// convertis depuis le Google Drive IBIG (dossiers Fournisseurs et Sous-traitants, Contrats
// de Construction, Contrats Administratifs et Légaux, Contrats Financiers, Sécurité et
// Assurance, Gestion de Projet) : approvisionnement béton, fourniture de matériaux (fusion
// acier/bois/finition), location d'échafaudages, lot technique (fusion 8 corps d'état),
// démolition, terrassement (fusion x2), constructions commerciale/système constructif
// (fusion béton-acier-bois-modulaire)/écologique/bureaux, façade, aménagement intérieur,
// extension, rénovation historique, permis de construire, autorisation d'urbanisme,
// servitude-droit de passage (fusion x2), concession, bail de terrain (fusion x2), mise en
// conformité, garantie financière d'achèvement, garantie performance/délais (fusion x2),
// assurance TRC (fusion x2), dommages ouvrage, essais et mise en service.
// Script ADDITIF : upsert par code — n'écrase pas les templates existants.
// Exécution : npx tsx prisma/seed-drive3-btp.ts
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

// Notes pays (source : modèles IBIG zone CFA).
const C_MARCHES = JSON.stringify({
  OHADA: { note: 'Marchés publics : se référer au code des marchés publics national (zone OHADA/UEMOA) — montants en FCFA.' },
  FR: { note: 'Marchés privés de travaux : la norme NF P03-001 s’applique à titre supplétif.' },
});
const C_FOURNITURE = JSON.stringify({
  OHADA: { note: 'Vente commerciale régie par l’Acte uniforme OHADA portant sur le droit commercial général — montants en FCFA.' },
  FR: { note: 'Adapter aux conditions générales de vente et, pour les marchés privés de travaux, à la norme NF P03-001.' },
});
const C_LOCATION = JSON.stringify({
  OHADA: { note: 'Conforme aux usages OHADA/zone CFA — montants en FCFA. Vérifier les règles locales de sécurité des équipements de chantier.' },
  FR: { note: 'Adapter aux règles de sécurité du Code du travail (travail en hauteur, échafaudages) et aux conditions générales de location de matériel.' },
});
const C_GARANTIES = JSON.stringify({
  OHADA: { note: 'Sûretés régies par l’Acte uniforme OHADA portant organisation des sûretés (cautionnement, garantie autonome) — montants en FCFA.' },
  FR: { note: 'Adapter au régime du cautionnement du Code civil et, pour la garantie financière d’achèvement, au Code de la construction et de l’habitation.' },
});
const C_ASSURANCE = JSON.stringify({
  OHADA: { note: 'Zone CFA : contrats d’assurance régis par le Code CIMA — montants en FCFA.' },
  FR: { note: 'En France, l’assurance dommages-ouvrage et la responsabilité décennale sont obligatoires (loi Spinetta, Code des assurances).' },
});
const C_FONCIER = JSON.stringify({
  OHADA: { note: 'Foncier et urbanisme régis par la législation nationale (titre foncier, permis de construire, plan d’urbanisme) — montants en FCFA.' },
  FR: { note: 'Adapter au Code de l’urbanisme (autorisations) et au Code civil (servitudes, baux).' },
});
const C_PRESTATIONS = JSON.stringify({
  OHADA: { note: 'Conforme aux usages OHADA/zone CFA — montants en FCFA.' },
  FR: { note: 'Pour les prestations techniques liées à la construction, adapter au Code de la construction et de l’habitation et à la norme NF P03-001.' },
});

const templates: CatalogTemplate[] = [
  // ── 1. Contrat d'approvisionnement en béton ────────────────────────────────
  {
    code: 'btp_appro_beton', name: 'Contrat d’approvisionnement en béton', category: 'btp_construction',
    price: 3000, priceMax: 5000, popularity: 48,
    description: 'Sécurisez vos livraisons de béton : quantités, classe, prix au m³, planning de livraison et contrôle de conformité.',
    fieldsJson: F([
      { key: 'client', label: 'Identification complète du Client (nom, siège social, représentant légal et fonction)', type: 'textarea', required: true },
      { key: 'fournisseur', label: 'Identification complète du Fournisseur de béton (nom, siège social, représentant légal et fonction)', type: 'textarea', required: true },
      { key: 'adresse_projets', label: 'Adresse précise du ou des projets de construction', type: 'text', required: true },
      { key: 'quantite', label: 'Quantité précise de béton à livrer (en m³)', type: 'text', required: true },
      { key: 'type_beton', label: 'Type ou classe de béton (ex. C25/30)', type: 'text', required: true },
      { key: 'prix_m3', label: 'Prix du béton par m³ (FCFA)', type: 'text', required: true },
      { key: 'montant_total', label: 'Montant total du contrat, livraison comprise (FCFA)', type: 'text', required: true },
      { key: 'modalites_paiement', label: 'Modalités de paiement (acompte à la commande, paiements échelonnés, solde)', type: 'textarea', required: true },
      { key: 'date_premiere_livraison', label: 'Date de la première livraison', type: 'date', required: true },
      { key: 'juridiction', label: 'Juridiction compétente / pays dont le droit s’applique', type: 'text', required: true },
      { key: 'lieu', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT D'APPROVISIONNEMENT EN BÉTON</h1><p><strong>Entre :</strong></p><p>{{client}}, ci-après dénommée « le Client »,</p><p><strong>Et :</strong></p><p>{{fournisseur}}, spécialisé dans la production et la livraison de béton, ci-après dénommé « le Fournisseur »,</p><p>Il est convenu ce qui suit :</p><h2>Article 1 : Objet</h2><p>Le présent contrat a pour objet de définir les termes et conditions selon lesquels le Fournisseur s'engage à fournir du béton au Client pour ses projets de construction situés à {{adresse_projets}}.</p><h2>Article 2 : Description de la fourniture</h2><p>Le Fournisseur s'engage à livrer {{quantite}} m³ de béton de type {{type_beton}}. Les spécifications techniques et les normes de qualité du béton sont détaillées en annexe.</p><h2>Article 3 : Prix</h2><p>Le prix du béton est fixé à {{prix_m3}} FCFA par m³. Le montant total du contrat est donc de {{montant_total}} FCFA. Ce montant comprend la livraison jusqu'au site de construction.</p><h2>Article 4 : Modalités de paiement</h2><p>Le paiement sera effectué comme suit : {{modalites_paiement}}.</p><h2>Article 5 : Délai de livraison</h2><p>La première livraison de béton interviendra le {{date_premiere_livraison}} et les livraisons suivantes selon le planning convenu en annexe. Le Fournisseur s'engage à respecter les dates de livraison convenues.</p><h2>Article 6 : Obligations du Fournisseur</h2><p>Le Fournisseur s'engage à :</p><ul><li>Livrer le béton conformément aux spécifications et quantités convenues.</li><li>Assurer la qualité du béton livré.</li><li>Informer le Client en cas de retard ou de problème de livraison.</li></ul><h2>Article 7 : Obligations du Client</h2><p>Le Client s'engage à :</p><ul><li>Fournir un accès approprié pour la livraison.</li><li>Effectuer les paiements selon les modalités convenues.</li><li>Vérifier la conformité du béton à la livraison.</li></ul><h2>Article 8 : Assurance et responsabilité</h2><p>Le Fournisseur déclare être assuré pour tous les risques liés à sa prestation. Le Client est invité à souscrire une assurance pour couvrir tout dommage lié à la réception et à l'utilisation du béton.</p><h2>Article 9 : Résolution des litiges</h2><p>Tout différend né de l'interprétation ou de l'exécution du présent contrat sera, dans la mesure du possible, réglé à l'amiable. À défaut, les parties conviennent que les litiges seront soumis aux tribunaux compétents de {{juridiction}}.</p><h2>Article 10 : Dispositions générales</h2><p>Le présent contrat est soumis au droit de {{juridiction}}. Toute modification de ce contrat doit être faite par écrit et signée par les deux parties.</p><p class="signatures">Fait à {{lieu}}, le {{date_jour}}, en deux exemplaires originaux.<br/><br/>Pour le Client, — Pour le Fournisseur,</p></div>`,
    countriesJson: C_FOURNITURE,
  },

  // ── 2. Contrat de fourniture de matériaux de construction ──────────────────
  // FUSION : Approvisionnement en Acier + en Bois + en Matériaux de Finition
  {
    code: 'btp_fourniture_materiaux', name: 'Contrat de fourniture de matériaux de construction', category: 'btp_construction',
    price: 3000, priceMax: 5000, popularity: 50,
    description: 'Encadrez la fourniture d’acier, de bois, d’agrégats ou de matériaux de finition : quantités, prix unitaire, livraisons et qualité.',
    fieldsJson: F([
      { key: 'client', label: 'Identification complète du Client (nom, siège social, représentant légal et fonction)', type: 'textarea', required: true },
      { key: 'fournisseur', label: 'Identification complète du Fournisseur (nom, siège social, représentant légal et fonction)', type: 'textarea', required: true },
      { key: 'materiau', label: 'Matériau fourni', type: 'select', required: true, options: ['Acier', 'Bois', 'Matériaux de finition', 'Agrégats / granulats', 'Autre matériau de construction'] },
      { key: 'adresse_projets', label: 'Adresse précise du ou des projets de construction', type: 'text', required: true },
      { key: 'quantite', label: 'Quantité précise à livrer (avec unité : tonnes, m³, lots…)', type: 'text', required: true },
      { key: 'specifications', label: 'Type, qualité ou références des matériaux (détails en annexe)', type: 'text', required: true },
      { key: 'prix_unitaire', label: 'Prix unitaire (FCFA par unité)', type: 'text', required: true },
      { key: 'montant_total', label: 'Montant total du contrat, livraison comprise (FCFA)', type: 'text', required: true },
      { key: 'modalites_paiement', label: 'Modalités de paiement (acompte à la commande, paiements échelonnés, solde)', type: 'textarea', required: true },
      { key: 'date_premiere_livraison', label: 'Date de la première livraison', type: 'date', required: true },
      { key: 'juridiction', label: 'Juridiction compétente / pays dont le droit s’applique', type: 'text', required: true },
      { key: 'lieu', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE FOURNITURE DE MATÉRIAUX DE CONSTRUCTION</h1><p><strong>Entre :</strong></p><p>{{client}}, ci-après dénommée « le Client »,</p><p><strong>Et :</strong></p><p>{{fournisseur}}, spécialisé dans la production et la livraison de matériaux de construction, ci-après dénommé « le Fournisseur »,</p><p>Il est convenu ce qui suit :</p><h2>Article 1 : Objet</h2><p>Le présent contrat a pour objet de définir les termes et conditions selon lesquels le Fournisseur s'engage à fournir au Client le matériau suivant : {{materiau}}, pour ses projets de construction situés à {{adresse_projets}}.</p><h2>Article 2 : Description de la fourniture</h2><p>Le Fournisseur s'engage à livrer {{quantite}} de {{materiau}} de type {{specifications}}. Les spécifications techniques et les normes de qualité des matériaux sont détaillées en annexe.</p><h2>Article 3 : Prix</h2><p>Le prix est fixé à {{prix_unitaire}} FCFA par unité. Le montant total du contrat est donc de {{montant_total}} FCFA. Ce montant comprend la livraison jusqu'au site de construction.</p><h2>Article 4 : Modalités de paiement</h2><p>Le paiement sera effectué comme suit : {{modalites_paiement}}.</p><h2>Article 5 : Délai de livraison</h2><p>La première livraison interviendra le {{date_premiere_livraison}} et les livraisons suivantes selon le planning convenu en annexe. Le Fournisseur s'engage à respecter les dates de livraison convenues.</p><h2>Article 6 : Obligations du Fournisseur</h2><p>Le Fournisseur s'engage à :</p><ul><li>Livrer les matériaux conformément aux spécifications et quantités convenues.</li><li>Assurer la qualité des matériaux livrés.</li><li>Informer le Client en cas de retard ou de problème de livraison.</li></ul><h2>Article 7 : Obligations du Client</h2><p>Le Client s'engage à :</p><ul><li>Fournir un accès approprié pour la livraison.</li><li>Effectuer les paiements selon les modalités convenues.</li><li>Vérifier la conformité des matériaux à la livraison.</li></ul><h2>Article 8 : Assurance et responsabilité</h2><p>Le Fournisseur déclare être assuré pour tous les risques liés à sa prestation. Le Client est invité à souscrire une assurance pour couvrir tout dommage lié à la réception et à l'utilisation des matériaux.</p><h2>Article 9 : Résolution des litiges</h2><p>Tout différend né de l'interprétation ou de l'exécution du présent contrat sera, dans la mesure du possible, réglé à l'amiable. À défaut, les parties conviennent que les litiges seront soumis aux tribunaux compétents de {{juridiction}}.</p><h2>Article 10 : Dispositions générales</h2><p>Le présent contrat est soumis au droit de {{juridiction}}. Toute modification de ce contrat doit être faite par écrit et signée par les deux parties.</p><p class="signatures">Fait à {{lieu}}, le {{date_jour}}, en deux exemplaires originaux.<br/><br/>Pour le Client, — Pour le Fournisseur,</p></div>`,
    countriesJson: C_FOURNITURE,
  },

  // ── 3. Contrat de location d'échafaudages ──────────────────────────────────
  {
    code: 'btp_location_echafaudages', name: 'Contrat de location d’échafaudages', category: 'btp_construction',
    price: 2500, priceMax: 4500, popularity: 40,
    description: 'Louez vos échafaudages en toute sécurité : montage/démontage, maintenance, assurances et responsabilités du locataire.',
    fieldsJson: F([
      { key: 'locataire', label: 'Identification complète du Locataire (nom, siège social, représentant légal et fonction)', type: 'textarea', required: true },
      { key: 'loueur', label: 'Identification complète du Loueur (société de location d’échafaudages : nom, siège social, représentant légal et fonction)', type: 'textarea', required: true },
      { key: 'adresse_projets', label: 'Adresse précise du ou des projets de construction ou de rénovation', type: 'text', required: true },
      { key: 'description_equipement', label: 'Nombre et type précis d’échafaudages fournis', type: 'textarea', required: true },
      { key: 'date_debut', label: 'Date de début de la location', type: 'date', required: true },
      { key: 'date_fin', label: 'Date de fin de la location', type: 'date', required: true },
      { key: 'montant', label: 'Coût total de la location (FCFA)', type: 'text', required: true },
      { key: 'modalites_paiement', label: 'Modalités de paiement (ex. acompte à la signature, solde en fin de location)', type: 'textarea', required: true },
      { key: 'juridiction', label: 'Juridiction compétente / pays dont le droit s’applique', type: 'text', required: true },
      { key: 'lieu', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE LOCATION D'ÉCHAFAUDAGES</h1><p><strong>Entre :</strong></p><p>{{locataire}}, ci-après dénommée « le Locataire »,</p><p><strong>Et :</strong></p><p>{{loueur}}, spécialisée dans la location d'équipements de construction, ci-après dénommée « le Loueur »,</p><p>Il est convenu ce qui suit :</p><h2>Article 1 : Objet</h2><p>Le présent contrat a pour objet de définir les termes et conditions selon lesquels le Loueur met à disposition du Locataire des échafaudages pour ses projets de construction ou de rénovation situés à {{adresse_projets}}.</p><h2>Article 2 : Description de l'équipement</h2><p>Le Loueur s'engage à fournir {{description_equipement}}. Les spécifications techniques et les conditions d'utilisation des échafaudages sont détaillées en annexe.</p><h2>Article 3 : Durée de la location</h2><p>La location commence le {{date_debut}} et se termine le {{date_fin}}, sauf prolongation convenue par écrit entre les parties.</p><h2>Article 4 : Prix</h2><p>Le coût total de la location est évalué à {{montant}} FCFA pour la durée mentionnée. Ce montant comprend la mise à disposition des échafaudages et, si convenu, les services de montage et de démontage.</p><h2>Article 5 : Modalités de paiement</h2><p>Le paiement sera effectué comme suit : {{modalites_paiement}}.</p><h2>Article 6 : Obligations du Loueur</h2><p>Le Loueur s'engage à :</p><ul><li>Livrer les échafaudages en bon état de fonctionnement à la date convenue.</li><li>Fournir toutes les instructions nécessaires pour l'utilisation sécurisée des échafaudages.</li><li>Assurer la maintenance et les réparations nécessaires pendant la durée de la location.</li></ul><h2>Article 7 : Obligations du Locataire</h2><p>Le Locataire s'engage à :</p><ul><li>Utiliser les échafaudages conformément aux instructions du Loueur et aux réglementations en vigueur.</li><li>Ne pas sous-louer ou céder les échafaudages sans l'accord écrit du Loueur.</li><li>Informer le Loueur immédiatement en cas de dysfonctionnement ou de dommage.</li></ul><h2>Article 8 : Assurance et responsabilité</h2><p>Le Loueur déclare que les échafaudages sont assurés pour les risques liés à leur utilisation. Le Locataire est responsable de tout dommage causé aux échafaudages pendant la période de location et doit souscrire une assurance appropriée.</p><h2>Article 9 : Résolution des litiges</h2><p>Tout différend né de l'interprétation ou de l'exécution du présent contrat sera, dans la mesure du possible, réglé à l'amiable. À défaut, les parties conviennent que les litiges seront soumis aux tribunaux compétents de {{juridiction}}.</p><h2>Article 10 : Dispositions générales</h2><p>Le présent contrat est soumis au droit de {{juridiction}}. Toute modification de ce contrat doit être faite par écrit et signée par les deux parties.</p><p class="signatures">Fait à {{lieu}}, le {{date_jour}}, en deux exemplaires originaux.<br/><br/>Pour le Locataire, — Pour le Loueur,</p></div>`,
    countriesJson: C_LOCATION,
  },

  // ── 4. Contrat de lot technique (corps d'état) ─────────────────────────────
  // FUSION : Services Électriques + Plomberie + Peinture + Revêtement + Vitrage
  //          + Étanchéité + Toiture + Isolation (8 corps d'état, même trame)
  {
    code: 'btp_lot_technique', name: 'Contrat de lot technique (corps d’état)', category: 'btp_construction',
    price: 3500, priceMax: 5500, popularity: 52,
    description: 'Confiez un lot technique à un professionnel : électricité, plomberie, peinture, toiture, étanchéité… fourniture, pose et garanties.',
    fieldsJson: F([
      { key: 'client', label: 'Identification complète du Client / Maître d’ouvrage (nom, siège social ou adresse, représentant)', type: 'textarea', required: true },
      { key: 'prestataire', label: 'Identification complète du Prestataire spécialisé (nom, siège social, représentant légal et fonction)', type: 'textarea', required: true },
      { key: 'corps_etat', label: 'Corps d’état / lot technique concerné', type: 'select', required: true, options: ['Électricité', 'Plomberie', 'Peinture', 'Revêtement (sols et murs)', 'Vitrage / menuiserie vitrée', 'Étanchéité', 'Toiture / couverture', 'Isolation'] },
      { key: 'adresse_projet', label: 'Adresse précise du projet de construction ou de rénovation', type: 'text', required: true },
      { key: 'description_travaux', label: 'Description détaillée des travaux du lot (installations, surfaces, matériaux, techniques…)', type: 'textarea', required: true },
      { key: 'montant', label: 'Coût total des travaux, fourniture et main-d’œuvre comprises (FCFA)', type: 'text', required: true },
      { key: 'modalites_paiement', label: 'Modalités de paiement (ex. acompte à la signature, solde à la fin des travaux)', type: 'textarea', required: true },
      { key: 'date_debut', label: 'Date de début des travaux', type: 'date', required: true },
      { key: 'date_fin', label: 'Date d’achèvement au plus tard', type: 'date', required: true },
      { key: 'periode_garantie', label: 'Période de garantie contre les défauts de main-d’œuvre (mois/ans)', type: 'text', required: true },
      { key: 'juridiction', label: 'Juridiction compétente / pays dont le droit s’applique', type: 'text', required: true },
      { key: 'lieu', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE LOT TECHNIQUE — {{corps_etat}}</h1><p><strong>Entre :</strong></p><p>{{client}}, ci-après dénommée « le Client »,</p><p><strong>Et :</strong></p><p>{{prestataire}}, spécialisée dans les travaux du lot {{corps_etat}}, ci-après dénommée « le Prestataire »,</p><p>Il est convenu ce qui suit :</p><h2>Article 1 : Objet</h2><p>Le présent contrat a pour objet de définir les termes et conditions selon lesquels le Prestataire s'engage à réaliser les travaux du lot {{corps_etat}} pour le projet de construction ou de rénovation du Client situé à {{adresse_projet}}.</p><h2>Article 2 : Description des services</h2><p>Le Prestataire s'engage à réaliser les travaux suivants : {{description_travaux}}, selon les spécifications convenues en annexe.</p><h2>Article 3 : Prix</h2><p>Le coût total des travaux est évalué à {{montant}} FCFA. Ce montant comprend la fourniture des matériaux et équipements ainsi que la main-d'œuvre pour l'installation.</p><h2>Article 4 : Modalités de paiement</h2><p>Le paiement sera effectué comme suit : {{modalites_paiement}}.</p><h2>Article 5 : Délai d'exécution</h2><p>Les travaux débuteront le {{date_debut}} et devront être achevés au plus tard le {{date_fin}}. Tout retard dans l'exécution des travaux fera l'objet d'une discussion pour déterminer les ajustements nécessaires.</p><h2>Article 6 : Obligations du Prestataire</h2><p>Le Prestataire s'engage à :</p><ul><li>Fournir des matériaux et équipements conformes aux normes en vigueur.</li><li>Réaliser les travaux conformément aux techniques professionnelles et aux réglementations applicables au lot {{corps_etat}}.</li><li>Informer régulièrement le Client de l'avancement des travaux.</li></ul><h2>Article 7 : Obligations du Client</h2><p>Le Client s'engage à :</p><ul><li>Fournir un accès complet et sécurisé au site des travaux.</li><li>Effectuer les paiements selon les modalités convenues.</li><li>Signaler toute préoccupation ou modification souhaitée dans les plus brefs délais.</li></ul><h2>Article 8 : Garantie</h2><p>Le Prestataire garantit que les travaux seront exempts de défauts de main-d'œuvre pendant une période de {{periode_garantie}} à compter de la date d'achèvement des travaux.</p><h2>Article 9 : Modification des services</h2><p>Toute modification substantielle des travaux devra faire l'objet d'un avenant au présent contrat, précisant les modifications apportées, l'ajustement de prix éventuel et l'impact sur la durée des travaux.</p><h2>Article 10 : Assurance et responsabilité</h2><p>Le Prestataire déclare être assuré pour tous les risques liés à l'exécution des travaux. Le Client est invité à souscrire une assurance pour couvrir tout dommage lié aux travaux.</p><h2>Article 11 : Résolution des litiges</h2><p>Tout différend né de l'interprétation ou de l'exécution du présent contrat sera, dans la mesure du possible, réglé à l'amiable. À défaut, les parties conviennent que les litiges seront soumis aux tribunaux compétents de {{juridiction}}.</p><h2>Article 12 : Dispositions générales</h2><p>Le présent contrat est soumis au droit de {{juridiction}}. Toute modification de ce contrat doit être faite par écrit et signée par les deux parties.</p><p class="signatures">Fait à {{lieu}}, le {{date_jour}}, en deux exemplaires originaux.<br/><br/>Pour le Client, — Pour le Prestataire,</p></div>`,
    countriesJson: C_MARCHES,
  },

  // ── 5. Contrat de démolition ───────────────────────────────────────────────
  {
    code: 'btp_demolition', name: 'Contrat de démolition', category: 'btp_construction',
    price: 3000, priceMax: 5000, popularity: 42,
    description: 'Encadrez la démolition de vos structures : méthodes, sécurité, gestion des déchets, échéancier et assurances.',
    fieldsJson: F([
      { key: 'demolisseur', label: 'Identification complète de l’entreprise de démolition (nom, pays d’immatriculation, représentant et fonction)', type: 'textarea', required: true },
      { key: 'client', label: 'Identification complète du Client (nom et adresse)', type: 'textarea', required: true },
      { key: 'adresse_chantier', label: 'Adresse précise du chantier de démolition', type: 'text', required: true },
      { key: 'description_travaux', label: 'Description des structures à démolir et des méthodes de démolition', type: 'textarea', required: true },
      { key: 'montant', label: 'Coût total des travaux de démolition (FCFA)', type: 'text', required: true },
      { key: 'echeancier', label: 'Échéancier de paiement', type: 'textarea', required: true },
      { key: 'date_debut', label: 'Date de début des travaux', type: 'date', required: true },
      { key: 'date_fin', label: 'Date de fin prévue des travaux', type: 'date', required: true },
      { key: 'juridiction', label: 'Juridiction compétente / pays dont le droit s’applique', type: 'text', required: true },
      { key: 'lieu', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE DÉMOLITION</h1><p><strong>Entre les soussignés :</strong></p><p>{{demolisseur}}, une entreprise spécialisée dans les services de démolition, ci-après désignée « le Démolisseur »,</p><p><strong>et</strong></p><p>{{client}}, ci-après désigné « le Client »,</p><p>Il a été convenu et arrêté ce qui suit :</p><h2>Article 1 : Objet</h2><p>Le présent contrat a pour objet de définir les termes et conditions selon lesquels le Démolisseur s'engage à réaliser la démolition des structures situées à l'adresse suivante : {{adresse_chantier}}.</p><h2>Article 2 : Description des travaux</h2><p>Les travaux de démolition comprennent : {{description_travaux}}.</p><h2>Article 3 : Prix</h2><p>Le coût total des travaux de démolition est évalué à {{montant}} FCFA, payables selon l'échéancier suivant : {{echeancier}}.</p><h2>Article 4 : Durée des travaux</h2><p>Les travaux débuteront le {{date_debut}} et devraient se terminer le {{date_fin}}, sauf prolongation due à des circonstances imprévues.</p><h2>Article 5 : Obligations du Démolisseur</h2><p>Le Démolisseur s'engage à :</p><ul><li>Réaliser les travaux conformément aux normes de sécurité et environnementales en vigueur.</li><li>Gérer et évacuer les déchets de démolition de manière responsable.</li><li>Informer régulièrement le Client de l'avancement des travaux.</li></ul><h2>Article 6 : Obligations du Client</h2><p>Le Client s'engage à :</p><ul><li>Fournir l'accès au site comme convenu.</li><li>Effectuer les paiements selon l'échéancier établi.</li><li>Informer le Démolisseur de toute préoccupation ou modification souhaitée dans les plus brefs délais.</li></ul><h2>Article 7 : Modification des travaux</h2><p>Toute modification substantielle des travaux devra faire l'objet d'un avenant au présent contrat, précisant les modifications apportées, l'ajustement de prix éventuel et l'impact sur la durée des travaux.</p><h2>Article 8 : Assurance et responsabilité</h2><p>Le Démolisseur déclare être assuré pour tous les risques liés à l'exécution des travaux de démolition. Le Client doit également souscrire à une assurance pour couvrir tout dommage pouvant survenir durant les travaux.</p><h2>Article 9 : Résolution des litiges</h2><p>Tout différend né de l'interprétation ou de l'exécution du présent contrat sera, dans la mesure du possible, réglé à l'amiable. À défaut, les parties conviennent que les litiges seront soumis aux tribunaux compétents de {{juridiction}}.</p><h2>Article 10 : Dispositions générales</h2><p>Le présent contrat est régi par les lois de {{juridiction}}. Toute modification de ce contrat doit être faite par écrit et signée par les deux parties.</p><p class="signatures">Fait à {{lieu}}, le {{date_jour}}, en deux exemplaires originaux.<br/><br/>Pour le Démolisseur, — Pour le Client,</p></div>`,
    countriesJson: C_MARCHES,
  },

  // ── 6. Contrat de terrassement ─────────────────────────────────────────────
  // FUSION : Contrat de Terrassement + Contrat de Terrassement 2 (même trame)
  {
    code: 'btp_terrassement', name: 'Contrat de terrassement', category: 'btp_construction',
    price: 3000, priceMax: 5000, popularity: 45,
    description: 'Préparez votre terrain : déblaiement, nivellement, excavation, délais, paiements échelonnés et reprise des défauts.',
    fieldsJson: F([
      { key: 'maitre_ouvrage', label: 'Identification complète du Maître d’ouvrage / Client (nom et adresse)', type: 'textarea', required: true },
      { key: 'entrepreneur', label: 'Identification complète de l’Entrepreneur de terrassement (nom, siège social, représentant légal et fonction)', type: 'textarea', required: true },
      { key: 'adresse_projet', label: 'Adresse précise du site des travaux', type: 'text', required: true },
      { key: 'description_travaux', label: 'Description des travaux de terrassement (déblaiement, nivellement, excavation…)', type: 'textarea', required: true },
      { key: 'montant', label: 'Coût total des travaux, matériaux et main-d’œuvre compris (FCFA)', type: 'text', required: true },
      { key: 'modalites_paiement', label: 'Modalités de paiement (acompte, paiements selon l’avancement, solde)', type: 'textarea', required: true },
      { key: 'date_debut', label: 'Date de début des travaux', type: 'date', required: true },
      { key: 'date_fin', label: 'Date d’achèvement au plus tard', type: 'date', required: true },
      { key: 'juridiction', label: 'Juridiction compétente / pays dont le droit s’applique', type: 'text', required: true },
      { key: 'lieu', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE TERRASSEMENT</h1><p><strong>Entre :</strong></p><p>{{maitre_ouvrage}}, ci-après dénommé « le Maître d'Ouvrage »,</p><p><strong>Et :</strong></p><p>{{entrepreneur}}, ci-après dénommé « l'Entrepreneur »,</p><p>Il est convenu ce qui suit :</p><h2>Article 1 : Objet</h2><p>Le présent contrat a pour objet de définir les termes et conditions selon lesquels l'Entrepreneur s'engage à réaliser les travaux de terrassement sur le site situé à {{adresse_projet}}, appartenant au Maître d'Ouvrage.</p><h2>Article 2 : Description des travaux</h2><p>Les travaux de terrassement comprennent : {{description_travaux}}, selon les plans et spécifications convenus en annexe.</p><h2>Article 3 : Prix</h2><p>Le coût total des travaux de terrassement est évalué à {{montant}} FCFA. Ce montant comprend la fourniture des matériaux, la main-d'œuvre, et toute autre dépense liée à la réalisation des travaux.</p><h2>Article 4 : Modalités de paiement</h2><p>Le paiement sera effectué comme suit : {{modalites_paiement}}.</p><h2>Article 5 : Délai d'exécution</h2><p>Les travaux débuteront le {{date_debut}} et devront être achevés au plus tard le {{date_fin}}. Tout retard dans l'exécution des travaux fera l'objet d'une discussion pour déterminer les ajustements nécessaires.</p><h2>Article 6 : Obligations de l'Entrepreneur</h2><p>L'Entrepreneur s'engage à :</p><ul><li>Réaliser les travaux conformément aux normes de qualité et de sécurité en vigueur.</li><li>Gérer de manière responsable les matériaux et déchets sur le site.</li><li>Informer régulièrement le Maître d'Ouvrage de l'avancement des travaux.</li><li>Corriger tout défaut de réalisation signalé par le Maître d'Ouvrage dans un délai raisonnable.</li></ul><h2>Article 7 : Obligations du Maître d'Ouvrage</h2><p>Le Maître d'Ouvrage s'engage à :</p><ul><li>Fournir un accès complet et sécurisé au site des travaux.</li><li>Effectuer les paiements selon les modalités convenues.</li><li>Signaler tout problème ou modification souhaitée dans les plus brefs délais.</li></ul><h2>Article 8 : Assurance et responsabilité</h2><p>L'Entrepreneur déclare être assuré pour tous les risques liés à l'exécution des travaux. Le Maître d'Ouvrage est invité à souscrire une assurance pour couvrir tout dommage pouvant survenir sur le chantier.</p><h2>Article 9 : Résolution des litiges</h2><p>Tout différend né de l'interprétation ou de l'exécution du présent contrat sera, dans la mesure du possible, réglé à l'amiable. À défaut, les parties conviennent que les litiges seront soumis aux tribunaux compétents de {{juridiction}}.</p><h2>Article 10 : Dispositions générales</h2><p>Le présent contrat est soumis au droit de {{juridiction}}. Toute modification de ce contrat doit être faite par écrit et signée par les deux parties.</p><p class="signatures">Fait à {{lieu}}, le {{date_jour}}, en deux exemplaires originaux.<br/><br/>Pour le Maître d'Ouvrage, — Pour l'Entrepreneur,</p></div>`,
    countriesJson: C_MARCHES,
  },

  // ── 7. Contrat de construction commerciale ─────────────────────────────────
  {
    code: 'btp_construction_commerciale', name: 'Contrat de construction commerciale', category: 'btp_construction',
    price: 4000, priceMax: 6000, popularity: 44,
    description: 'Construisez votre bâtiment commercial : plans et spécifications annexés, permis, garantie sur les travaux et médiation.',
    fieldsJson: F([
      { key: 'proprietaire', label: 'Identification complète du Propriétaire du projet (nom, adresse, représentant)', type: 'textarea', required: true },
      { key: 'entrepreneur', label: 'Identification complète de l’Entrepreneur en construction (nom, numéro d’enregistrement, siège social)', type: 'textarea', required: true },
      { key: 'adresse_projet', label: 'Adresse du projet de bâtiment commercial', type: 'text', required: true },
      { key: 'periode_garantie', label: 'Période de garantie contre les défauts de matériaux et de main-d’œuvre (mois/ans)', type: 'text', required: true },
      { key: 'juridiction', label: 'Juridiction compétente (médiation et loi applicable)', type: 'text', required: true },
      { key: 'lieu', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE CONSTRUCTION COMMERCIALE</h1><p><strong>ENTRE :</strong></p><p>{{proprietaire}}, ci-après dénommé « le Propriétaire »,</p><p><strong>ET</strong></p><p>{{entrepreneur}}, ci-après dénommée « l'Entrepreneur ».</p><h2>Préambule</h2><p>Le Propriétaire a l'intention de construire un bâtiment commercial situé à {{adresse_projet}} (ci-après dénommé « le Projet »). L'Entrepreneur possède l'expertise et l'expérience nécessaires pour effectuer les travaux de construction du Projet.</p><h2>Article 1 : Objet du Contrat</h2><p>1.1 Le Propriétaire engage l'Entrepreneur pour effectuer les travaux de construction du Projet conformément aux plans, spécifications et conditions énoncés dans ce contrat.</p><h2>Article 2 : Plans et Spécifications</h2><p>2.1 Les plans et spécifications détaillés du Projet sont attachés en Annexe A et font partie intégrante de ce contrat.</p><h2>Article 3 : Responsabilités de l'Entrepreneur</h2><p>3.1 L'Entrepreneur est responsable de la réalisation des travaux de construction conformément aux plans et spécifications, dans les délais convenus et avec des matériaux de qualité.</p><p>3.2 L'Entrepreneur est responsable de l'obtention de toutes les autorisations et permis nécessaires pour la construction du Projet.</p><h2>Article 4 : Responsabilités du Propriétaire</h2><p>4.1 Le Propriétaire s'engage à payer à l'Entrepreneur le montant total convenu pour les travaux de construction conformément aux modalités de paiement énoncées en Annexe B.</p><h2>Article 5 : Durée du Contrat</h2><p>5.1 Le contrat entre en vigueur à compter de la date de signature par les deux parties et reste en vigueur jusqu'à l'achèvement des travaux de construction, sauf résiliation anticipée conformément aux dispositions de ce contrat.</p><h2>Article 6 : Garantie</h2><p>6.1 L'Entrepreneur garantit que les travaux de construction seront exempts de défauts de matériaux et de main-d'œuvre pendant une période de {{periode_garantie}} à compter de la date d'achèvement des travaux.</p><h2>Article 7 : Litiges</h2><p>7.1 Tout litige découlant de ce contrat sera résolu par voie de médiation conformément aux règles de médiation en vigueur dans {{juridiction}}.</p><h2>Article 8 : Loi Applicable</h2><p>8.1 Ce contrat est régi par les lois en vigueur dans {{juridiction}}.</p><h2>Article 9 : Annexes</h2><p>Les Annexes A (Plans et Spécifications) et B (Modalités de Paiement) font partie intégrante de ce contrat.</p><h2>Article 10 : Signature</h2><p>Le présent Contrat de Construction Commerciale entre en vigueur à la date de signature par les deux parties.</p><p class="signatures">Fait en deux exemplaires originaux, à {{lieu}}, le {{date_jour}}.<br/><br/>Le Propriétaire — L'Entrepreneur en Construction</p></div>`,
    countriesJson: C_MARCHES,
  },

  // ── 8. Contrat de construction selon système constructif ───────────────────
  // FUSION : Construction en Béton + en Acier + en Bois + Modulaire (même trame)
  {
    code: 'btp_construction_systeme', name: 'Contrat de construction (béton, acier, bois, modulaire)', category: 'btp_construction',
    price: 4000, priceMax: 6000, popularity: 38,
    description: 'Réalisez votre ouvrage selon le système constructif choisi : béton armé, structure acier, bois ou modulaire — prix, délais et normes.',
    fieldsJson: F([
      { key: 'maitre_ouvrage', label: 'Identification complète du Maître d’ouvrage / Client (nom et adresse)', type: 'textarea', required: true },
      { key: 'entrepreneur', label: 'Identification complète de l’Entrepreneur spécialisé (nom, siège social, représentant légal et fonction)', type: 'textarea', required: true },
      { key: 'systeme', label: 'Système constructif principal', type: 'select', required: true, options: ['Béton armé', 'Structure en acier', 'Construction en bois', 'Construction modulaire / préfabriquée'] },
      { key: 'adresse_projet', label: 'Adresse précise du chantier', type: 'text', required: true },
      { key: 'description_travaux', label: 'Description des ouvrages à construire (fondations, murs, colonnes, dalles, assemblages…)', type: 'textarea', required: true },
      { key: 'montant', label: 'Coût total des travaux, matériaux et main-d’œuvre compris (FCFA)', type: 'text', required: true },
      { key: 'modalites_paiement', label: 'Modalités de paiement (acompte, paiements selon l’avancement, solde)', type: 'textarea', required: true },
      { key: 'date_debut', label: 'Date de début des travaux', type: 'date', required: true },
      { key: 'date_fin', label: 'Date d’achèvement au plus tard', type: 'date', required: true },
      { key: 'juridiction', label: 'Juridiction compétente / pays dont le droit s’applique', type: 'text', required: true },
      { key: 'lieu', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE CONSTRUCTION — {{systeme}}</h1><p><strong>Entre :</strong></p><p>{{maitre_ouvrage}}, ci-après dénommé « le Maître d'Ouvrage »,</p><p><strong>Et :</strong></p><p>{{entrepreneur}}, ci-après dénommé « l'Entrepreneur »,</p><p>Il est convenu ce qui suit :</p><h2>Article 1 : Objet</h2><p>Le présent contrat a pour objet de définir les termes et conditions selon lesquels l'Entrepreneur s'engage à réaliser la construction d'un ouvrage selon le système constructif {{systeme}}, situé à {{adresse_projet}}, conformément aux spécifications techniques et aux normes de qualité convenues.</p><h2>Article 2 : Description des travaux</h2><p>Les travaux de construction comprennent : {{description_travaux}}, selon les plans et spécifications convenus en annexe, y compris les spécificités liées au système constructif retenu (fabrication des éléments, assemblage, protection et traitement des matériaux).</p><h2>Article 3 : Prix</h2><p>Le coût total des travaux est évalué à {{montant}} FCFA. Ce montant comprend la fourniture des matériaux, la main-d'œuvre, et toute autre dépense liée à la réalisation des travaux.</p><h2>Article 4 : Modalités de paiement</h2><p>Le paiement sera effectué comme suit : {{modalites_paiement}}.</p><h2>Article 5 : Délai d'exécution</h2><p>Les travaux débuteront le {{date_debut}} et devront être achevés au plus tard le {{date_fin}}. Tout retard dans l'exécution des travaux fera l'objet d'une discussion pour déterminer les ajustements nécessaires.</p><h2>Article 6 : Obligations de l'Entrepreneur</h2><p>L'Entrepreneur s'engage à :</p><ul><li>Réaliser les travaux conformément aux normes de qualité et de sécurité en vigueur spécifiques au système constructif {{systeme}}.</li><li>Utiliser des matériaux de qualité et conformes aux spécifications techniques.</li><li>Informer régulièrement le Maître d'Ouvrage de l'avancement des travaux.</li></ul><h2>Article 7 : Obligations du Maître d'Ouvrage</h2><p>Le Maître d'Ouvrage s'engage à :</p><ul><li>Fournir un accès complet et sécurisé au site des travaux.</li><li>Effectuer les paiements selon les modalités convenues.</li><li>Signaler tout problème ou modification souhaitée dans les plus brefs délais.</li></ul><h2>Article 8 : Modification des travaux</h2><p>Toute modification substantielle des travaux devra faire l'objet d'un avenant au présent contrat, précisant les modifications apportées, l'ajustement de prix éventuel et l'impact sur la durée des travaux.</p><h2>Article 9 : Assurance et responsabilité</h2><p>L'Entrepreneur déclare être assuré pour tous les risques liés à l'exécution des travaux. Le Maître d'Ouvrage est invité à souscrire une assurance pour couvrir tout dommage pouvant survenir sur le chantier.</p><h2>Article 10 : Résolution des litiges</h2><p>Tout différend né de l'interprétation ou de l'exécution du présent contrat sera, dans la mesure du possible, réglé à l'amiable. À défaut, les parties conviennent que les litiges seront soumis aux tribunaux compétents de {{juridiction}}.</p><h2>Article 11 : Dispositions générales</h2><p>Le présent contrat est soumis au droit de {{juridiction}}. Toute modification de ce contrat doit être faite par écrit et signée par les deux parties.</p><p class="signatures">Fait à {{lieu}}, le {{date_jour}}, en deux exemplaires originaux.<br/><br/>Pour le Maître d'Ouvrage, — Pour l'Entrepreneur,</p></div>`,
    countriesJson: C_MARCHES,
  },

  // ── 9. Contrat de construction écologique ──────────────────────────────────
  {
    code: 'btp_construction_ecologique', name: 'Contrat de construction écologique', category: 'btp_construction',
    price: 4000, priceMax: 6000, popularity: 30,
    description: 'Construisez durable : matériaux à faible impact, énergies renouvelables, gestion de l’eau et normes environnementales.',
    fieldsJson: F([
      { key: 'maitre_ouvrage', label: 'Identification complète du Maître d’ouvrage / Client (nom et adresse)', type: 'textarea', required: true },
      { key: 'entrepreneur', label: 'Identification complète de l’Entrepreneur (nom, siège social, représentant légal et fonction)', type: 'textarea', required: true },
      { key: 'adresse_projet', label: 'Adresse précise du projet de bâtiment écologique', type: 'text', required: true },
      { key: 'description_travaux', label: 'Description des travaux (matériaux à faible impact, énergie renouvelable, gestion de l’eau…)', type: 'textarea', required: true },
      { key: 'montant', label: 'Coût total des travaux écologiques (FCFA)', type: 'text', required: true },
      { key: 'modalites_paiement', label: 'Modalités de paiement (acompte, paiements selon l’avancement, solde)', type: 'textarea', required: true },
      { key: 'date_debut', label: 'Date de début des travaux', type: 'date', required: true },
      { key: 'date_fin', label: 'Date d’achèvement au plus tard', type: 'date', required: true },
      { key: 'juridiction', label: 'Juridiction compétente / pays dont le droit s’applique', type: 'text', required: true },
      { key: 'lieu', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE CONSTRUCTION ÉCOLOGIQUE</h1><p><strong>Entre :</strong></p><p>{{maitre_ouvrage}}, ci-après dénommé « le Maître d'Ouvrage »,</p><p><strong>Et :</strong></p><p>{{entrepreneur}}, ci-après dénommé « l'Entrepreneur »,</p><p>Il est convenu ce qui suit :</p><h2>Article 1 : Objet</h2><p>Le présent contrat a pour objet de définir les termes et conditions selon lesquels l'Entrepreneur s'engage à réaliser la construction d'un bâtiment écologique situé à {{adresse_projet}}, conformément aux spécifications techniques et aux normes environnementales convenues.</p><h2>Article 2 : Description des travaux</h2><p>Les travaux de construction comprennent : {{description_travaux}}, selon les plans et spécifications convenus en annexe, avec un accent sur les aspects écologiques et durables (matériaux à faible impact environnemental, systèmes d'énergie renouvelable, gestion de l'eau).</p><h2>Article 3 : Prix</h2><p>Le coût total des travaux est évalué à {{montant}} FCFA. Ce montant comprend la fourniture des matériaux, la main-d'œuvre, et toute autre dépense liée à la réalisation des travaux écologiques.</p><h2>Article 4 : Modalités de paiement</h2><p>Le paiement sera effectué comme suit : {{modalites_paiement}}.</p><h2>Article 5 : Délai d'exécution</h2><p>Les travaux débuteront le {{date_debut}} et devront être achevés au plus tard le {{date_fin}}. Tout retard dans l'exécution des travaux fera l'objet d'une discussion pour déterminer les ajustements nécessaires.</p><h2>Article 6 : Obligations de l'Entrepreneur</h2><p>L'Entrepreneur s'engage à :</p><ul><li>Réaliser les travaux conformément aux normes de qualité, de sécurité et environnementales en vigueur.</li><li>Utiliser des matériaux et des techniques qui respectent les principes de durabilité.</li><li>Informer régulièrement le Maître d'Ouvrage de l'avancement des travaux.</li></ul><h2>Article 7 : Obligations du Maître d'Ouvrage</h2><p>Le Maître d'Ouvrage s'engage à :</p><ul><li>Fournir un accès complet et sécurisé au site des travaux.</li><li>Effectuer les paiements selon les modalités convenues.</li><li>Signaler tout problème ou modification souhaitée dans les plus brefs délais.</li></ul><h2>Article 8 : Assurance et responsabilité</h2><p>L'Entrepreneur déclare être assuré pour tous les risques liés à l'exécution des travaux. Le Maître d'Ouvrage est invité à souscrire une assurance pour couvrir tout dommage pouvant survenir sur le chantier.</p><h2>Article 9 : Résolution des litiges</h2><p>Tout différend né de l'interprétation ou de l'exécution du présent contrat sera, dans la mesure du possible, réglé à l'amiable. À défaut, les parties conviennent que les litiges seront soumis aux tribunaux compétents de {{juridiction}}.</p><h2>Article 10 : Dispositions générales</h2><p>Le présent contrat est soumis au droit de {{juridiction}}. Toute modification de ce contrat doit être faite par écrit et signée par les deux parties.</p><p class="signatures">Fait à {{lieu}}, le {{date_jour}}, en deux exemplaires originaux.<br/><br/>Pour le Maître d'Ouvrage, — Pour l'Entrepreneur,</p></div>`,
    countriesJson: C_MARCHES,
  },

  // ── 10. Contrat de travaux de façade ───────────────────────────────────────
  {
    code: 'btp_facade', name: 'Contrat de travaux de façade', category: 'btp_construction',
    price: 2500, priceMax: 4500, popularity: 32,
    description: 'Rénovez ou ravalez vos façades : restauration, isolation, installation de façades neuves, échéancier et assurances.',
    fieldsJson: F([
      { key: 'facadier', label: 'Identification complète du Façadier (nom, pays d’immatriculation, représentant et fonction)', type: 'textarea', required: true },
      { key: 'client', label: 'Identification complète du Client (nom et adresse)', type: 'textarea', required: true },
      { key: 'adresse_chantier', label: 'Adresse précise du chantier', type: 'text', required: true },
      { key: 'description_travaux', label: 'Description des travaux de façade (rénovation, restauration, ravalement, isolation…)', type: 'textarea', required: true },
      { key: 'montant', label: 'Coût total des travaux (FCFA)', type: 'text', required: true },
      { key: 'echeancier', label: 'Échéancier de paiement', type: 'textarea', required: true },
      { key: 'date_debut', label: 'Date de début des travaux', type: 'date', required: true },
      { key: 'date_fin', label: 'Date de fin prévue des travaux', type: 'date', required: true },
      { key: 'juridiction', label: 'Juridiction compétente / pays dont le droit s’applique', type: 'text', required: true },
      { key: 'lieu', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE FAÇADE</h1><p><strong>Entre les soussignés :</strong></p><p>{{facadier}}, une entreprise spécialisée dans les travaux de façade, ci-après désignée « le Façadier »,</p><p><strong>et</strong></p><p>{{client}}, ci-après désigné « le Client »,</p><p>Il a été convenu et arrêté ce qui suit :</p><h2>Article 1 : Objet</h2><p>Le présent contrat a pour objet de définir les termes et conditions selon lesquels le Façadier s'engage à réaliser les travaux relatifs à la façade pour le Client à l'adresse suivante : {{adresse_chantier}}.</p><h2>Article 2 : Description des travaux</h2><p>Les travaux relatifs à la façade comprennent : {{description_travaux}}, selon les plans et spécifications convenus en annexe.</p><h2>Article 3 : Prix</h2><p>Le coût total des travaux est évalué à {{montant}} FCFA, payables selon l'échéancier suivant : {{echeancier}}.</p><h2>Article 4 : Durée des travaux</h2><p>Les travaux débuteront le {{date_debut}} et devraient se terminer le {{date_fin}}, sauf prolongation due à des circonstances imprévues.</p><h2>Article 5 : Obligations du Façadier</h2><p>Le Façadier s'engage à :</p><ul><li>Réaliser les travaux conformément aux normes de qualité et de sécurité en vigueur.</li><li>Utiliser des matériaux conformes aux spécifications convenues.</li><li>Informer régulièrement le Client de l'avancement des travaux.</li></ul><h2>Article 6 : Obligations du Client</h2><p>Le Client s'engage à :</p><ul><li>Fournir l'accès au site comme convenu.</li><li>Effectuer les paiements selon l'échéancier établi.</li><li>Informer le Façadier de toute préoccupation ou modification souhaitée dans les plus brefs délais.</li></ul><h2>Article 7 : Modification des travaux</h2><p>Toute modification substantielle des travaux devra faire l'objet d'un avenant au présent contrat, précisant les modifications apportées, l'ajustement de prix éventuel et l'impact sur la durée des travaux.</p><h2>Article 8 : Assurance et responsabilité</h2><p>Le Façadier déclare être assuré pour tous les risques liés à l'exécution des travaux. Le Client doit également souscrire à une assurance pour couvrir tout dommage pouvant survenir sur le chantier.</p><h2>Article 9 : Résolution des litiges</h2><p>Tout différend né de l'interprétation ou de l'exécution du présent contrat sera, dans la mesure du possible, réglé à l'amiable. À défaut, les parties conviennent que les litiges seront soumis aux tribunaux compétents de {{juridiction}}.</p><h2>Article 10 : Dispositions générales</h2><p>Le présent contrat est régi par les lois de {{juridiction}}. Toute modification de ce contrat doit être faite par écrit et signée par les deux parties.</p><p class="signatures">Fait à {{lieu}}, le {{date_jour}}, en deux exemplaires originaux.<br/><br/>Pour le Façadier, — Pour le Client,</p></div>`,
    countriesJson: C_MARCHES,
  },

  // ── 11. Contrat d'aménagement intérieur ────────────────────────────────────
  {
    code: 'btp_amenagement_interieur', name: 'Contrat d’aménagement intérieur', category: 'btp_construction',
    price: 2500, priceMax: 4500, popularity: 36,
    description: 'Aménagez vos locaux : peinture, revêtements, électricité, plomberie — délais, paiements et reprise des défauts.',
    fieldsJson: F([
      { key: 'client', label: 'Identification complète du Client (nom et adresse)', type: 'textarea', required: true },
      { key: 'prestataire', label: 'Identification complète du Prestataire (nom, siège social, représentant légal et fonction)', type: 'textarea', required: true },
      { key: 'adresse_projet', label: 'Adresse précise des locaux à aménager', type: 'text', required: true },
      { key: 'description_travaux', label: 'Description des travaux d’aménagement (peinture, revêtement de sol, électricité, plomberie…)', type: 'textarea', required: true },
      { key: 'montant', label: 'Coût total des travaux, matériaux et main-d’œuvre compris (FCFA)', type: 'text', required: true },
      { key: 'modalites_paiement', label: 'Modalités de paiement (acompte, paiements selon l’avancement, solde)', type: 'textarea', required: true },
      { key: 'date_debut', label: 'Date de début des travaux', type: 'date', required: true },
      { key: 'date_fin', label: 'Date d’achèvement au plus tard', type: 'date', required: true },
      { key: 'juridiction', label: 'Juridiction compétente / pays dont le droit s’applique', type: 'text', required: true },
      { key: 'lieu', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT D'AMÉNAGEMENT INTÉRIEUR</h1><p><strong>Entre :</strong></p><p>{{client}}, ci-après dénommé « le Client »,</p><p><strong>Et :</strong></p><p>{{prestataire}}, ci-après dénommé « le Prestataire »,</p><p>Il est convenu ce qui suit :</p><h2>Article 1 : Objet</h2><p>Le présent contrat a pour objet la définition des termes et conditions selon lesquels le Prestataire s'engage à réaliser l'aménagement intérieur des locaux situés à {{adresse_projet}}, appartenant au Client.</p><h2>Article 2 : Description des travaux</h2><p>Les travaux d'aménagement intérieur comprennent : {{description_travaux}}, selon les plans et spécifications convenus en annexe.</p><h2>Article 3 : Prix</h2><p>Le coût total des travaux est évalué à {{montant}} FCFA. Ce montant comprend la fourniture des matériaux, la main-d'œuvre, et toute autre dépense liée à la réalisation des travaux.</p><h2>Article 4 : Modalités de paiement</h2><p>Le paiement sera effectué comme suit : {{modalites_paiement}}.</p><h2>Article 5 : Délai d'exécution</h2><p>Les travaux débuteront le {{date_debut}} et devront être achevés au plus tard le {{date_fin}}. Tout retard dans l'exécution des travaux fera l'objet d'une discussion pour déterminer les ajustements nécessaires.</p><h2>Article 6 : Obligations du Prestataire</h2><p>Le Prestataire s'engage à :</p><ul><li>Réaliser les travaux conformément aux normes de qualité et de sécurité en vigueur.</li><li>Informer régulièrement le Client de l'avancement des travaux.</li><li>Corriger tout défaut de réalisation signalé par le Client dans un délai raisonnable.</li></ul><h2>Article 7 : Obligations du Client</h2><p>Le Client s'engage à :</p><ul><li>Fournir un accès complet et sécurisé au site des travaux.</li><li>Effectuer les paiements selon les modalités convenues.</li><li>Signaler tout problème ou modification souhaitée dans les plus brefs délais.</li></ul><h2>Article 8 : Assurance et responsabilité</h2><p>Le Prestataire déclare être assuré pour tous les risques liés à l'exécution des travaux. Le Client est invité à souscrire une assurance pour couvrir tout dommage pouvant survenir sur le chantier.</p><h2>Article 9 : Résolution des litiges</h2><p>Tout différend né de l'interprétation ou de l'exécution du présent contrat sera, dans la mesure du possible, réglé à l'amiable. À défaut, les parties conviennent que les litiges seront soumis aux tribunaux compétents de {{juridiction}}.</p><h2>Article 10 : Dispositions générales</h2><p>Le présent contrat est régi par les lois de {{juridiction}}. Toute modification de ce contrat doit être faite par écrit et signée par les deux parties.</p><p class="signatures">Fait à {{lieu}}, le {{date_jour}}, en deux exemplaires originaux.<br/><br/>Pour le Client, — Pour le Prestataire,</p></div>`,
    countriesJson: C_MARCHES,
  },

  // ── 12. Contrat d'extension de bâtiment ────────────────────────────────────
  {
    code: 'btp_extension_batiment', name: 'Contrat d’extension de bâtiment', category: 'btp_construction',
    price: 3500, priceMax: 5500, popularity: 40,
    description: 'Agrandissez votre maison ou vos locaux : plans annexés, autorisations, pénalités de retard et réceptions provisoire/définitive.',
    fieldsJson: F([
      { key: 'maitre_ouvrage', label: 'Identification complète du Maître d’ouvrage (nom, adresse, contacts)', type: 'textarea', required: true },
      { key: 'entrepreneur', label: 'Identification complète de l’Entreprise de construction (nom, adresse, contacts)', type: 'textarea', required: true },
      { key: 'batiment', label: 'Bâtiment à agrandir et son adresse précise (ex. maison d’habitation, locaux d’entreprise…)', type: 'textarea', required: true },
      { key: 'montant', label: 'Coût total des travaux d’extension (FCFA)', type: 'text', required: true },
      { key: 'modalites_paiement', label: 'Modalités de paiement (avance, paiements échelonnés, paiement final)', type: 'textarea', required: true },
      { key: 'date_debut', label: 'Date de début des travaux', type: 'date', required: true },
      { key: 'date_fin', label: 'Date d’achèvement prévue', type: 'date', required: true },
      { key: 'pays', label: 'Pays dont les lois régissent le contrat', type: 'text', required: true },
      { key: 'lieu', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT D'EXTENSION DE BÂTIMENT</h1><p><strong>ENTRE :</strong><br/>{{maitre_ouvrage}}<br/>(« le Maître d'Ouvrage »)</p><p><strong>ET :</strong><br/>{{entrepreneur}}<br/>(« l'Entrepreneur »)</p><h2>Préambule</h2><p>Le Maître d'Ouvrage souhaite agrandir {{batiment}}. L'Entrepreneur a été sélectionné pour son expertise en matière d'extensions de bâtiments. Ce contrat vise à établir les termes et conditions sous lesquels l'extension sera réalisée.</p><h2>Article 1 : Objet du Contrat</h2><p>Ce contrat a pour objet de définir les conditions selon lesquelles l'Entrepreneur s'engage à réaliser l'extension du bâtiment conformément aux plans et aux spécifications techniques convenus, tandis que le Maître d'Ouvrage s'engage à rémunérer ces services.</p><h2>Article 2 : Plans et Spécifications</h2><p>2.1 Les plans et spécifications détaillés de l'extension sont annexés au présent contrat.<br/>2.2 L'Entrepreneur s'engage à respecter les normes de construction en vigueur et les spécifications fournies par le Maître d'Ouvrage.</p><h2>Article 3 : Obligations de l'Entrepreneur</h2><p>3.1 L'Entrepreneur s'engage à commencer les travaux à la date convenue et à les poursuivre sans délai jusqu'à leur achèvement complet.<br/>3.2 L'Entrepreneur s'assure de la qualité des matériaux utilisés et de la conformité des travaux aux normes en vigueur.<br/>3.3 L'Entrepreneur est responsable de la sécurité du chantier et doit respecter toutes les réglementations en matière de santé et de sécurité.</p><h2>Article 4 : Obligations du Maître d'Ouvrage</h2><p>4.1 Le Maître d'Ouvrage s'engage à fournir toutes les informations nécessaires et à obtenir les autorisations de construction requises.<br/>4.2 Le Maître d'Ouvrage s'engage à effectuer les paiements conformément aux échéances convenues.</p><h2>Article 5 : Prix et Modalités de Paiement</h2><p>5.1 Le coût total des travaux d'extension est fixé à {{montant}} FCFA.<br/>5.2 Les modalités de paiement seront détaillées comme suit : {{modalites_paiement}}.</p><h2>Article 6 : Délais</h2><p>6.1 La date de début des travaux est fixée au {{date_debut}}, et la date d'achèvement prévue au {{date_fin}}.<br/>6.2 Des pénalités de retard peuvent être appliquées si l'Entrepreneur ne respecte pas le calendrier convenu.</p><h2>Article 7 : Réception des Travaux</h2><p>7.1 Une réception provisoire sera organisée pour vérifier la conformité des travaux avec le cahier des charges.<br/>7.2 La réception définitive sera prononcée après l'achèvement complet et la correction de tout défaut.</p><h2>Article 8 : Assurance et Garanties</h2><p>8.1 L'Entrepreneur s'engage à souscrire une assurance responsabilité civile professionnelle adéquate.<br/>8.2 Des garanties de bonne finition des travaux seront fournies.</p><h2>Article 9 : Résolution des Litiges</h2><p>Tout différend relatif à l'interprétation ou à l'exécution du présent contrat sera d'abord soumis à la médiation. En cas de non-résolution, les parties pourront saisir les tribunaux compétents.</p><h2>Article 10 : Dispositions Générales</h2><p>10.1 Toute modification de ce contrat doit être faite par écrit et signée par les deux parties.<br/>10.2 Le présent contrat est régi par les lois du {{pays}}.</p><p class="signatures">Fait à {{lieu}}, le {{date_jour}}<br/>En deux exemplaires originaux.<br/><br/>Maître d'Ouvrage, — Entrepreneur,</p></div>`,
    countriesJson: C_MARCHES,
  },

  // ── 13. Contrat de rénovation de bâtiment historique ───────────────────────
  {
    code: 'btp_renovation_historique', name: 'Contrat de rénovation de bâtiment historique', category: 'btp_construction',
    price: 4000, priceMax: 6000, popularity: 22,
    description: 'Restaurez un bâtiment historique : exigences de conservation, matériaux et techniques adaptés, garanties spécifiques.',
    fieldsJson: F([
      { key: 'maitre_ouvrage', label: 'Identification complète du Propriétaire ou de l’Organisme de conservation (nom, adresse, contacts)', type: 'textarea', required: true },
      { key: 'entrepreneur', label: 'Identification complète de l’Entreprise de rénovation (nom, adresse, contacts)', type: 'textarea', required: true },
      { key: 'adresse_batiment', label: 'Adresse précise du bâtiment historique (le Site)', type: 'text', required: true },
      { key: 'montant', label: 'Coût total des travaux de rénovation (FCFA)', type: 'text', required: true },
      { key: 'modalites_paiement', label: 'Modalités de paiement (avance, paiements échelonnés, paiement final)', type: 'textarea', required: true },
      { key: 'date_debut', label: 'Date de début des travaux', type: 'date', required: true },
      { key: 'date_fin', label: 'Date d’achèvement prévue', type: 'date', required: true },
      { key: 'pays', label: 'Pays dont les lois régissent le contrat', type: 'text', required: true },
      { key: 'lieu', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE RÉNOVATION DE BÂTIMENT HISTORIQUE</h1><p><strong>ENTRE</strong><br/>{{maitre_ouvrage}}<br/>(« le Maître d'Ouvrage »)</p><p><strong>ET</strong><br/>{{entrepreneur}}<br/>(« l'Entrepreneur »)</p><h2>Préambule</h2><p>Le Maître d'Ouvrage possède un bâtiment historique situé à {{adresse_batiment}} (le « Site ») qui requiert des travaux de rénovation. L'Entrepreneur a été choisi pour sa spécialisation dans la restauration de structures historiques. Les parties souhaitent définir leurs engagements par le présent contrat.</p><h2>Article 1 : Objet du Contrat</h2><p>Ce contrat a pour objet de définir les conditions selon lesquelles l'Entrepreneur s'engage à réaliser la rénovation du bâtiment historique conformément aux exigences de conservation, aux plans et aux spécifications techniques convenus, tandis que le Maître d'Ouvrage s'engage à rémunérer ces services.</p><h2>Article 2 : Plans et Spécifications</h2><p>2.1 Les plans et spécifications détaillés de la rénovation sont annexés au présent contrat.<br/>2.2 L'Entrepreneur s'engage à respecter strictement les exigences spécifiques liées à la conservation des bâtiments historiques.</p><h2>Article 3 : Obligations de l'Entrepreneur</h2><p>3.1 L'Entrepreneur s'engage à commencer les travaux à la date convenue et à les poursuivre sans délai jusqu'à leur achèvement complet.<br/>3.2 L'Entrepreneur garantit l'utilisation de matériaux et de techniques appropriés pour la restauration de bâtiments historiques.<br/>3.3 L'Entrepreneur est responsable de la sécurité du chantier et s'engage à respecter toutes les réglementations en matière de santé et de sécurité.</p><h2>Article 4 : Obligations du Maître d'Ouvrage</h2><p>4.1 Le Maître d'Ouvrage s'engage à fournir toutes les informations et autorisations nécessaires relatives au statut historique du bâtiment.<br/>4.2 Le Maître d'Ouvrage s'engage à effectuer les paiements conformément aux échéances convenues.</p><h2>Article 5 : Prix et Modalités de Paiement</h2><p>5.1 Le coût total des travaux de rénovation est fixé à {{montant}} FCFA.<br/>5.2 Les modalités de paiement seront détaillées comme suit : {{modalites_paiement}}.</p><h2>Article 6 : Délais</h2><p>6.1 La date de début des travaux est fixée au {{date_debut}}, et la date d'achèvement prévue au {{date_fin}}.<br/>6.2 Des pénalités de retard peuvent être appliquées si l'Entrepreneur ne respecte pas le calendrier convenu.</p><h2>Article 7 : Réception des Travaux</h2><p>7.1 Une réception provisoire sera organisée pour vérifier la conformité des travaux aux exigences de conservation.<br/>7.2 La réception définitive sera prononcée après l'achèvement complet et la correction de tout défaut.</p><h2>Article 8 : Assurance et Garanties</h2><p>8.1 L'Entrepreneur s'engage à souscrire une assurance responsabilité civile professionnelle adéquate.<br/>8.2 Des garanties spécifiques pour les travaux sur bâtiments historiques seront fournies.</p><h2>Article 9 : Résolution des Litiges</h2><p>Tout différend relatif à l'interprétation ou à l'exécution du présent contrat sera d'abord soumis à la médiation. En cas de non-résolution, les parties pourront saisir les tribunaux compétents.</p><h2>Article 10 : Dispositions Générales</h2><p>10.1 Toute modification de ce contrat doit être faite par écrit et signée par les deux parties.<br/>10.2 Le présent contrat est régi par les lois du {{pays}}.</p><p class="signatures">Fait à {{lieu}}, le {{date_jour}}<br/>En deux exemplaires originaux.<br/><br/>Maître d'Ouvrage, — Entrepreneur,</p></div>`,
    countriesJson: C_MARCHES,
  },

  // ── 14. Contrat de construction d'immeuble de bureaux ──────────────────────
  {
    code: 'btp_construction_bureaux', name: 'Contrat de construction d’immeuble de bureaux', category: 'btp_construction',
    price: 4500, priceMax: 6000, popularity: 35,
    description: 'Faites construire votre immeuble de bureaux : plans, pénalités de retard chiffrées, vices cachés et solidité de l’ouvrage.',
    fieldsJson: F([
      { key: 'maitre_ouvrage', label: 'Identification complète du Maître d’ouvrage (nom, adresse, contacts)', type: 'textarea', required: true },
      { key: 'entrepreneur', label: 'Identification complète de l’Entrepreneur (nom, adresse, contacts)', type: 'textarea', required: true },
      { key: 'adresse_site', label: 'Adresse précise du site de construction (le Site)', type: 'text', required: true },
      { key: 'montant', label: 'Coût total des travaux (FCFA)', type: 'text', required: true },
      { key: 'modalites_paiement', label: 'Modalités de paiement (avance, paiements échelonnés, paiement final)', type: 'textarea', required: true },
      { key: 'date_debut', label: 'Date de début des travaux', type: 'date', required: true },
      { key: 'date_fin', label: 'Date d’achèvement prévue', type: 'date', required: true },
      { key: 'penalites', label: 'Pénalités de retard (montant ou taux par jour de retard)', type: 'text', required: true },
      { key: 'pays', label: 'Pays dont les lois régissent le contrat', type: 'text', required: true },
      { key: 'lieu', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE CONSTRUCTION D'IMMEUBLE DE BUREAUX</h1><p><strong>ENTRE</strong><br/>{{maitre_ouvrage}}<br/>(« le Maître d'Ouvrage »)</p><p><strong>ET</strong><br/>{{entrepreneur}}<br/>(« l'Entrepreneur »)</p><h2>Préambule</h2><p>Le Maître d'Ouvrage désire faire construire un immeuble de bureaux situé à {{adresse_site}} (le « Site ») et a choisi l'Entrepreneur pour réaliser ces travaux. Les parties souhaitent fixer leurs engagements respectifs par le présent contrat.</p><h2>Article 1 : Objet du Contrat</h2><p>Ce contrat a pour objet de définir les conditions selon lesquelles l'Entrepreneur s'engage à réaliser la construction de l'immeuble de bureaux selon les plans, les spécifications techniques et le calendrier convenus, et le Maître d'Ouvrage s'engage à rémunérer ces services.</p><h2>Article 2 : Plans et Spécifications</h2><p>2.1 Les plans et spécifications de la construction sont annexés au présent contrat.<br/>2.2 L'Entrepreneur s'engage à respecter strictement les plans et spécifications convenus.</p><h2>Article 3 : Obligations de l'Entrepreneur</h2><p>3.1 L'Entrepreneur s'engage à débuter les travaux à la date convenue et à poursuivre sans délai jusqu'à l'achèvement complet.<br/>3.2 L'Entrepreneur garantit la qualité des matériaux utilisés et la conformité des travaux aux normes de construction en vigueur.<br/>3.3 L'Entrepreneur est responsable de la sécurité du chantier et s'engage à respecter toutes les réglementations en matière de santé et sécurité au travail.</p><h2>Article 4 : Obligations du Maître d'Ouvrage</h2><p>4.1 Le Maître d'Ouvrage s'engage à fournir à l'Entrepreneur toutes les informations nécessaires à la réalisation des travaux.<br/>4.2 Le Maître d'Ouvrage s'engage à effectuer les paiements conformément aux échéances convenues.</p><h2>Article 5 : Prix et Modalités de Paiement</h2><p>5.1 Le coût total des travaux est fixé à {{montant}} FCFA.<br/>5.2 Les modalités de paiement seront les suivantes : {{modalites_paiement}}.</p><h2>Article 6 : Délais</h2><p>6.1 La date de début des travaux est fixée au {{date_debut}}, et la date d'achèvement prévue au {{date_fin}}.<br/>6.2 En cas de retard non justifié, l'Entrepreneur sera redevable de pénalités de retard fixées à {{penalites}} par jour de retard.</p><h2>Article 7 : Réception des Travaux</h2><p>7.1 Une réception provisoire sera organisée à l'achèvement des travaux pour vérifier leur conformité.<br/>7.2 La réception définitive sera prononcée après correction d'éventuels défauts et complet achèvement des travaux.</p><h2>Article 8 : Assurance et Garanties</h2><p>8.1 L'Entrepreneur s'engage à souscrire une assurance responsabilité civile professionnelle.<br/>8.2 Des garanties pour les vices cachés et la solidité de l'ouvrage sont prévues conformément à la législation en vigueur.</p><h2>Article 9 : Résolution des Litiges</h2><p>Tout différend né de l'interprétation ou de l'exécution du présent contrat sera, dans un premier temps, soumis à la médiation. En l'absence de résolution, les parties pourront porter le litige devant les tribunaux compétents.</p><h2>Article 10 : Dispositions Générales</h2><p>10.1 Toute modification du présent contrat devra être faite par écrit et signée par les deux parties.<br/>10.2 Ce contrat est soumis aux lois du {{pays}}.</p><p class="signatures">Fait à {{lieu}}, le {{date_jour}}<br/>En deux exemplaires originaux.<br/><br/>Pour le Maître d'Ouvrage, — Pour l'Entrepreneur,</p></div>`,
    countriesJson: C_MARCHES,
  },

  // ── 15. Permis de construire ───────────────────────────────────────────────
  {
    code: 'btp_permis_construire', name: 'Permis de construire', category: 'btp_construction',
    price: 2000, priceMax: 4000, popularity: 46,
    description: 'Formalisez votre permis de construire : autorité émettrice, description du projet, conditions, dates et clause de révocation.',
    fieldsJson: F([
      { key: 'autorite', label: 'Nom de l’autorité locale émettrice du permis', type: 'text', required: true },
      { key: 'numero_permis', label: 'Numéro du permis', type: 'text', required: true },
      { key: 'proprietaire', label: 'Nom du propriétaire du terrain', type: 'text', required: true },
      { key: 'adresse_terrain', label: 'Adresse du terrain', type: 'text', required: true },
      { key: 'description_projet', label: 'Description détaillée du projet de construction', type: 'textarea', required: true },
      { key: 'date_delivrance', label: 'Date de délivrance du permis', type: 'date', required: true },
      { key: 'date_debut_construction', label: 'Date prévue de début de la construction', type: 'date', required: true },
      { key: 'date_fin_construction', label: 'Date prévue de fin de la construction', type: 'date', required: true },
      { key: 'conditions_speciales', label: 'Conditions spéciales ou restrictions associées au permis', type: 'textarea', required: false },
    ]),
    body: `<div class="contrat"><h1>PERMIS DE CONSTRUIRE</h1><p><strong>Autorité émettrice :</strong> {{autorite}}</p><p><strong>Numéro de permis :</strong> {{numero_permis}}</p><p><strong>Propriétaire du terrain :</strong> {{proprietaire}}</p><p><strong>Adresse du terrain :</strong> {{adresse_terrain}}</p><p><strong>Description du projet :</strong> {{description_projet}}</p><p><strong>Date de délivrance :</strong> {{date_delivrance}}</p><p><strong>Date de début de la construction :</strong> {{date_debut_construction}}</p><p><strong>Date de fin de la construction :</strong> {{date_fin_construction}}</p><p><strong>Conditions spéciales :</strong> {{conditions_speciales}}</p><h2>Autorisation</h2><p>Le présent permis autorise le propriétaire à entreprendre les travaux de construction conformément aux plans et aux spécifications soumis à l'autorité émettrice et approuvés par celle-ci.</p><h2>Conditions</h2><ol><li>Les travaux de construction doivent être conformes aux plans et aux spécifications approuvés.</li><li>Toute modification importante apportée au projet doit être soumise à l'autorité émettrice pour approbation préalable.</li><li>Le propriétaire est responsable de la sécurité des travailleurs et du public pendant la construction.</li><li>Tous les permis et licences nécessaires doivent être obtenus avant le début de la construction.</li></ol><h2>Révocation</h2><p>L'autorité émettrice se réserve le droit de révoquer ce permis si le propriétaire ne se conforme pas aux conditions énoncées ci-dessus ou en cas de non-respect des lois et réglementations en vigueur.</p><p class="signatures">Signature de l'autorité émettrice : ____________________<br/><br/>Date : {{date_jour}}</p></div>`,
    countriesJson: C_FONCIER,
  },

  // ── 16. Autorisation d'urbanisme ───────────────────────────────────────────
  {
    code: 'btp_autorisation_urbanisme', name: 'Autorisation d’urbanisme', category: 'btp_construction',
    price: 2000, priceMax: 4000, popularity: 28,
    description: 'Obtenez et encadrez votre autorisation d’urbanisme : projet décrit, durée de validité, contrôles et conditions de résiliation.',
    fieldsJson: F([
      { key: 'autorite', label: 'Nom de l’Autorité d’urbanisme émettrice', type: 'text', required: true },
      { key: 'representant_autorite', label: 'Nom du représentant de l’Autorité', type: 'text', required: true },
      { key: 'demandeur', label: 'Nom et adresse du Demandeur', type: 'textarea', required: true },
      { key: 'adresse_projet', label: 'Adresse du projet de construction ou d’aménagement', type: 'text', required: true },
      { key: 'description_projet', label: 'Description détaillée du projet', type: 'textarea', required: true },
      { key: 'date_debut', label: 'Date de début de validité de l’autorisation', type: 'date', required: true },
      { key: 'date_expiration', label: 'Date d’expiration de l’autorisation', type: 'date', required: true },
      { key: 'lieu', label: 'Lieu de délivrance', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>AUTORISATION D'URBANISME</h1><h2>Article 1 : Parties à l'autorisation</h2><p>Le présent document d'autorisation d'urbanisme est délivré par {{autorite}}, représentée par {{representant_autorite}}, ci-après dénommée « l'Autorité d'Urbanisme », à {{demandeur}}, ci-après dénommé « le Demandeur ».</p><h2>Article 2 : Objet de l'autorisation</h2><p>L'Autorité d'Urbanisme accorde au Demandeur une autorisation d'urbanisme pour le projet de construction ou d'aménagement situé à {{adresse_projet}}, désigné comme suit : {{description_projet}}.</p><h2>Article 3 : Description du projet</h2><p>Le projet consiste en {{description_projet}}, conformément aux plans et aux spécifications soumis par le Demandeur à l'Autorité d'Urbanisme.</p><h2>Article 4 : Durée de l'autorisation</h2><p>La présente autorisation d'urbanisme est valable à compter du {{date_debut}} et reste en vigueur jusqu'au {{date_expiration}}.</p><h2>Article 5 : Respect des réglementations</h2><p>Le Demandeur s'engage à respecter toutes les réglementations locales et nationales relatives à la construction, à l'aménagement et à l'urbanisme, ainsi que toutes les conditions spécifiques énoncées dans la présente autorisation.</p><h2>Article 6 : Modifications du projet</h2><p>Toute modification du projet initial doit être soumise à l'Autorité d'Urbanisme pour approbation préalable. L'Autorité d'Urbanisme se réserve le droit d'annuler l'autorisation en cas de non-respect de cette condition.</p><h2>Article 7 : Contrôles et inspections</h2><p>L'Autorité d'Urbanisme se réserve le droit de procéder à des contrôles et inspections régulières du chantier pour vérifier la conformité du projet aux termes de cette autorisation.</p><h2>Article 8 : Résiliation de l'autorisation</h2><p>L'Autorité d'Urbanisme peut résilier cette autorisation en cas de non-respect des termes et conditions énoncés dans le présent document ou en cas de violation des réglementations en vigueur.</p><h2>Article 9 : Recours en cas de litige</h2><p>En cas de litige ou de contestation concernant cette autorisation d'urbanisme, les parties conviennent de recourir à la médiation ou à l'arbitrage avant d'engager des poursuites judiciaires.</p><p class="signatures">Fait en deux exemplaires originaux, à {{lieu}}, le {{date_jour}}.<br/><br/>L'Autorité d'Urbanisme — Le Demandeur</p></div>`,
    countriesJson: C_FONCIER,
  },

  // ── 17. Contrat de servitude / droit de passage ────────────────────────────
  // FUSION : Contrat de Servitude + Contrat de Droit de Passage (même trame)
  {
    code: 'btp_servitude_passage', name: 'Contrat de servitude / droit de passage', category: 'btp_construction',
    price: 2500, priceMax: 4500, popularity: 25,
    description: 'Accordez une servitude sur votre terrain : droit de passage, canalisation ou autre — usage limité, entretien et résiliation.',
    fieldsJson: F([
      { key: 'type_servitude', label: 'Type de servitude accordée', type: 'select', required: true, options: ['Droit de passage', 'Servitude de canalisation / réseaux', 'Servitude de vue', 'Autre servitude'] },
      { key: 'proprietaire', label: 'Nom et adresse du Propriétaire du fonds servant (terrain grevé)', type: 'textarea', required: true },
      { key: 'beneficiaire', label: 'Nom et adresse du Bénéficiaire de la servitude', type: 'textarea', required: true },
      { key: 'description_servitude', label: 'Description détaillée de la servitude et de la portion de terrain concernée (plan en annexe)', type: 'textarea', required: true },
      { key: 'objectif_utilisation', label: 'Objectif d’utilisation exclusif de la servitude', type: 'text', required: true },
      { key: 'date_debut', label: 'Date de début de la servitude', type: 'date', required: true },
      { key: 'date_fin', label: 'Date de fin de la servitude', type: 'date', required: true },
      { key: 'preavis', label: 'Délai de notification écrite avant résiliation (en jours)', type: 'text', required: true },
      { key: 'juridiction', label: 'Juridiction compétente', type: 'text', required: true },
      { key: 'lieu', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE SERVITUDE — {{type_servitude}}</h1><h2>Article 1 : Parties au contrat</h2><p>Le présent contrat de servitude est conclu entre {{proprietaire}}, ci-après dénommé « le Propriétaire du Fonds Servant », et {{beneficiaire}}, ci-après dénommé « le Bénéficiaire ».</p><h2>Article 2 : Objet du contrat</h2><p>Le Propriétaire du Fonds Servant accorde au Bénéficiaire le droit d'exercer une servitude de type {{type_servitude}} sur une portion de son terrain désignée comme suit : {{description_servitude}}.</p><h2>Article 3 : Description de la servitude</h2><p>La servitude accordée au Bénéficiaire est limitée à {{description_servitude}}, telle que définie sur le plan joint en annexe, conformément aux termes et conditions énoncés dans le présent contrat.</p><h2>Article 4 : Durée de la servitude</h2><p>La servitude est accordée pour une période commençant le {{date_debut}} et se terminant le {{date_fin}}. À l'expiration de cette période, la servitude cessera automatiquement, sauf si elle est renouvelée par accord mutuel des parties.</p><h2>Article 5 : Utilisation de la servitude</h2><p>Le Bénéficiaire s'engage à utiliser la servitude uniquement pour {{objectif_utilisation}} et à ne pas l'utiliser à d'autres fins.</p><h2>Article 6 : Entretien de la servitude</h2><p>Le Bénéficiaire est responsable de l'entretien de la servitude, y compris de tout dommage causé par son utilisation.</p><h2>Article 7 : Résiliation de la servitude</h2><p>Le Propriétaire du Fonds Servant peut résilier la servitude en cas de non-respect des termes et conditions énoncés dans le présent contrat par le Bénéficiaire. Une notification écrite de {{preavis}} jours sera accordée au Bénéficiaire avant toute résiliation.</p><h2>Article 8 : Loi applicable et litiges</h2><p>Ce contrat de servitude est régi par les lois en vigueur dans {{juridiction}}. En cas de litige, les parties conviennent de recourir à la médiation ou à l'arbitrage avant d'engager des poursuites judiciaires.</p><p class="signatures">Fait en deux exemplaires originaux, à {{lieu}}, le {{date_jour}}.<br/><br/>Le Propriétaire du Fonds Servant — Le Bénéficiaire</p></div>`,
    countriesJson: C_FONCIER,
  },

  // ── 18. Contrat de concession ──────────────────────────────────────────────
  {
    code: 'btp_concession', name: 'Contrat de concession (terrain / installations)', category: 'btp_construction',
    price: 3000, priceMax: 5000, popularity: 20,
    description: 'Concédez l’exploitation d’un terrain ou d’installations : durée, redevances, entretien et conditions de résiliation.',
    fieldsJson: F([
      { key: 'concedant', label: 'Nom et adresse du Concédant', type: 'textarea', required: true },
      { key: 'concessionnaire', label: 'Nom et adresse du Concessionnaire', type: 'textarea', required: true },
      { key: 'description_concession', label: 'Description de la concession (terrain, installations, activité concédée)', type: 'textarea', required: true },
      { key: 'emplacement', label: 'Emplacement de la concession', type: 'text', required: true },
      { key: 'duree', label: 'Durée de la concession', type: 'text', required: true },
      { key: 'date_debut', label: 'Date de début de la concession', type: 'date', required: true },
      { key: 'redevances', label: 'Redevances ou loyers et modalités de paiement', type: 'textarea', required: true },
      { key: 'preavis', label: 'Délai de préavis de résiliation (en jours)', type: 'text', required: true },
      { key: 'juridiction', label: 'Juridiction compétente', type: 'text', required: true },
      { key: 'lieu', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE CONCESSION</h1><h2>Article 1 : Parties au contrat</h2><p>Le présent contrat de concession est conclu entre {{concedant}}, ci-après dénommé « le Concédant », et {{concessionnaire}}, ci-après dénommé « le Concessionnaire ».</p><h2>Article 2 : Objet du contrat</h2><p>Le Concédant accorde au Concessionnaire une concession pour {{description_concession}} située à {{emplacement}}, conformément aux termes et conditions énoncés dans le présent contrat.</p><h2>Article 3 : Durée de la concession</h2><p>La durée de la concession est de {{duree}} à compter du {{date_debut}}. À l'expiration de cette période, la concession pourra être renouvelée par accord mutuel des parties.</p><h2>Article 4 : Obligations du Concessionnaire</h2><p>Le Concessionnaire s'engage à exploiter la concession conformément aux lois et règlements en vigueur, à entretenir les installations et équipements en bon état, et à payer les redevances ou loyers convenus.</p><h2>Article 5 : Redevances ou loyers</h2><p>Le Concessionnaire s'engage à payer au Concédant des redevances ou loyers selon les modalités suivantes : {{redevances}}.</p><h2>Article 6 : Entretien de la concession</h2><p>Le Concessionnaire est responsable de l'entretien de la concession et s'engage à la maintenir en bon état. Tout dommage causé par la négligence du Concessionnaire sera à sa charge.</p><h2>Article 7 : Résiliation de la concession</h2><p>Le présent contrat de concession pourra être résilié par écrit par l'une ou l'autre des parties moyennant un préavis de {{preavis}} jours. En cas de non-paiement des redevances ou loyers ou de violation grave des termes du contrat, le Concédant peut résilier la concession immédiatement.</p><h2>Article 8 : Loi applicable et litiges</h2><p>Ce contrat de concession est régi par les lois en vigueur dans {{juridiction}}. En cas de litige, les parties conviennent de recourir à la médiation ou à l'arbitrage avant d'engager des poursuites judiciaires.</p><p class="signatures">Fait en deux exemplaires originaux, à {{lieu}}, le {{date_jour}}.<br/><br/>Le Concédant — Le Concessionnaire</p></div>`,
    countriesJson: C_FONCIER,
  },

  // ── 19. Contrat de bail pour terrain ───────────────────────────────────────
  // FUSION : Contrat de Bail pour Terrain + Contrat de Bail pour Terrain 2
  {
    code: 'btp_bail_terrain', name: 'Contrat de bail pour terrain', category: 'btp_construction',
    price: 2500, priceMax: 4500, popularity: 43,
    description: 'Louez un terrain pour votre activité ou votre chantier : loyer, usage autorisé, état des lieux, caution et résiliation.',
    fieldsJson: F([
      { key: 'bailleur', label: 'Nom et adresse du Bailleur', type: 'textarea', required: true },
      { key: 'preneur', label: 'Nom et adresse du Preneur', type: 'textarea', required: true },
      { key: 'adresse_terrain', label: 'Adresse du terrain loué', type: 'text', required: true },
      { key: 'description_terrain', label: 'Description détaillée du terrain (superficie, limites, références cadastrales…)', type: 'textarea', required: true },
      { key: 'duree_bail', label: 'Durée du bail', type: 'text', required: true },
      { key: 'date_debut', label: 'Date de début du bail', type: 'date', required: true },
      { key: 'loyer', label: 'Montant du loyer mensuel (FCFA)', type: 'text', required: true },
      { key: 'jour_paiement', label: 'Jour de paiement du loyer chaque mois', type: 'text', required: true },
      { key: 'usage', label: 'Usage autorisé du terrain (ex. base de chantier, stockage, activité agricole…)', type: 'text', required: true },
      { key: 'caution', label: 'Montant du dépôt de garantie (FCFA)', type: 'text', required: true },
      { key: 'preavis', label: 'Délai de préavis de résiliation (en jours)', type: 'text', required: true },
      { key: 'juridiction', label: 'Juridiction compétente', type: 'text', required: true },
      { key: 'lieu', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE BAIL POUR TERRAIN</h1><h2>Article 1 : Parties au contrat</h2><p>Ce contrat de bail est conclu entre {{bailleur}}, ci-après dénommé « le Bailleur », et {{preneur}}, ci-après dénommé « le Preneur ».</p><h2>Article 2 : Objet du contrat</h2><p>Le Bailleur consent au Preneur la location d'un terrain situé à {{adresse_terrain}}, désigné comme suit : {{description_terrain}}.</p><h2>Article 3 : Durée du bail</h2><p>Ce bail est conclu pour une durée de {{duree_bail}} à compter du {{date_debut}}. À l'expiration de cette période, le bail pourra être renouvelé par accord mutuel des parties.</p><h2>Article 4 : Loyer</h2><p>Le Preneur s'engage à payer un loyer mensuel de {{loyer}} FCFA au Bailleur. Le paiement sera effectué le {{jour_paiement}} de chaque mois.</p><h2>Article 5 : Entretien du terrain</h2><p>Le Preneur est responsable de l'entretien du terrain loué et s'engage à le maintenir en bon état. Tout dommage causé par la négligence du Preneur sera à sa charge.</p><h2>Article 6 : Usage du terrain</h2><p>Le terrain sera utilisé uniquement à des fins {{usage}}, conformes aux lois locales en vigueur. Toute utilisation contraire est strictement interdite.</p><h2>Article 7 : Résiliation du bail</h2><p>Le présent bail pourra être résilié par écrit par l'une ou l'autre des parties moyennant un préavis de {{preavis}} jours. En cas de non-paiement du loyer ou de violation grave des termes du contrat, le Bailleur peut résilier le bail immédiatement.</p><h2>Article 8 : État des lieux</h2><p>Un état des lieux contradictoire sera établi à l'entrée et à la sortie du Preneur. Tout dommage constaté lors de la sortie du Preneur sera déduit de la caution, le cas échéant.</p><h2>Article 9 : Caution</h2><p>Le Preneur verse un dépôt de garantie de {{caution}} FCFA au Bailleur à la signature du contrat. Ce dépôt sera restitué au Preneur à la fin du bail, déduction faite des éventuels frais de réparation.</p><h2>Article 10 : Loi applicable et litiges</h2><p>Ce contrat est régi par les lois en vigueur dans {{juridiction}}. En cas de litige, les parties conviennent de recourir à la médiation ou à l'arbitrage avant d'engager des poursuites judiciaires.</p><p class="signatures">Fait en deux exemplaires originaux, à {{lieu}}, le {{date_jour}}.<br/><br/>Le Bailleur — Le Preneur</p></div>`,
    countriesJson: C_FONCIER,
  },

  // ── 20. Contrat de mise en conformité réglementaire ────────────────────────
  {
    code: 'btp_conformite_reglementaire', name: 'Contrat de mise en conformité réglementaire', category: 'btp_construction',
    price: 3000, priceMax: 5000, popularity: 24,
    description: 'Mettez votre site ou établissement en conformité : travaux, autorisations et certifications, coopération et rémunération.',
    fieldsJson: F([
      { key: 'societe', label: 'Identification complète de la Société prestataire (nom, forme, numéro d’enregistrement, siège social)', type: 'textarea', required: true },
      { key: 'client', label: 'Identification complète du Client (nom, forme, numéro d’enregistrement, siège social)', type: 'textarea', required: true },
      { key: 'emplacement_site', label: 'Emplacement du site ou de l’établissement à mettre en conformité', type: 'text', required: true },
      { key: 'duree_estimee', label: 'Durée estimée du contrat (jours/mois/années)', type: 'text', required: true },
      { key: 'remuneration', label: 'Montant de la rémunération (FCFA)', type: 'text', required: true },
      { key: 'juridiction', label: 'Juridiction compétente / règles d’arbitrage applicables', type: 'text', required: true },
      { key: 'lieu', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE MISE EN CONFORMITÉ RÉGLEMENTAIRE</h1><h2>Article 1 : Parties au contrat</h2><p>Le présent contrat de mise en conformité réglementaire est conclu entre {{societe}}, ci-après dénommée « la Société », et {{client}}, ci-après dénommé « le Client ».</p><h2>Article 2 : Objet du contrat</h2><p>Le présent contrat a pour objet la réalisation des travaux nécessaires à la mise en conformité réglementaire du site ou de l'établissement du Client, situé à {{emplacement_site}}, ci-après dénommé « le Site », avec les réglementations en vigueur.</p><h2>Article 3 : Description des travaux de mise en conformité</h2><p>La Société s'engage à réaliser les travaux de mise en conformité conformément aux spécifications définies dans l'annexe du présent contrat, intitulée « Description des Travaux de Mise en Conformité ».</p><h2>Article 4 : Durée du contrat</h2><p>Le contrat prend effet à compter de la date de sa signature et reste en vigueur jusqu'à la réalisation complète des travaux de mise en conformité et l'obtention des autorisations ou certifications nécessaires. La durée estimée du contrat est de {{duree_estimee}}, sous réserve des retards éventuels dus à des circonstances indépendantes de la volonté des parties.</p><h2>Article 5 : Rémunération</h2><p>En contrepartie des services fournis, le Client s'engage à payer à la Société une rémunération de {{remuneration}} FCFA conformément aux modalités de paiement spécifiées dans l'annexe intitulée « Modalités de Paiement ».</p><h2>Article 6 : Autorisations et certifications</h2><p>La Société s'engage à assister le Client dans l'obtention de toutes les autorisations et certifications nécessaires à la mise en conformité réglementaire du Site.</p><h2>Article 7 : Responsabilités du Client</h2><p>Le Client s'engage à coopérer pleinement avec la Société, à fournir toutes les informations et documents nécessaires, et à prendre toutes les mesures nécessaires pour faciliter la mise en conformité réglementaire du Site.</p><h2>Article 8 : Loi applicable et litiges</h2><p>Ce contrat est régi par les lois en vigueur dans {{juridiction}}. Tout litige découlant de ce contrat sera soumis à la médiation ou à l'arbitrage conformément aux règles d'arbitrage en vigueur dans cette juridiction.</p><p class="signatures">Fait en deux exemplaires originaux, à {{lieu}}, le {{date_jour}}.<br/><br/>La Société — Le Client</p></div>`,
    countriesJson: C_PRESTATIONS,
  },

  // ── 21. Contrat de garantie financière d'achèvement ────────────────────────
  {
    code: 'btp_garantie_achevement', name: 'Contrat de garantie financière d’achèvement', category: 'btp_construction',
    price: 3500, priceMax: 5500, popularity: 26,
    description: 'Protégez l’achèvement de votre projet immobilier : garant, montant garanti, déclenchement en cas de défaillance du promoteur.',
    fieldsJson: F([
      { key: 'garant', label: 'Identification complète du Garant (nom, forme juridique, numéro d’enregistrement, siège social)', type: 'textarea', required: true },
      { key: 'beneficiaire', label: 'Identification complète du Bénéficiaire (nom, forme juridique, numéro d’enregistrement, siège social)', type: 'textarea', required: true },
      { key: 'promoteur', label: 'Nom du Promoteur dont l’achèvement du projet est garanti', type: 'text', required: true },
      { key: 'description_projet', label: 'Description du projet garanti', type: 'textarea', required: true },
      { key: 'emplacement_projet', label: 'Emplacement du projet', type: 'text', required: true },
      { key: 'montant_garantie', label: 'Montant de la garantie, en chiffres et en lettres (FCFA)', type: 'text', required: true },
      { key: 'delai_paiement', label: 'Délai de paiement après notification du Bénéficiaire (en jours)', type: 'text', required: true },
      { key: 'juridiction', label: 'Juridiction compétente / règles d’arbitrage applicables', type: 'text', required: true },
      { key: 'lieu', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE GARANTIE FINANCIÈRE D'ACHÈVEMENT</h1><h2>Article 1 : Parties au contrat</h2><p>Le présent contrat de garantie financière d'achèvement est conclu entre {{garant}}, ci-après dénommé « le Garant », et {{beneficiaire}}, ci-après dénommé « le Bénéficiaire ».</p><h2>Article 2 : Objet du contrat</h2><p>Le présent contrat a pour objet de garantir financièrement l'achèvement du projet de {{description_projet}} (ci-après dénommé « le Projet »), situé à {{emplacement_projet}}, en cas de non-achèvement par {{promoteur}}, ci-après dénommé « le Promoteur », conformément aux termes du contrat de construction du Projet.</p><h2>Article 3 : Montant de la garantie</h2><p>Le Garant s'engage à verser au Bénéficiaire un montant de {{montant_garantie}} FCFA en cas de non-achèvement du Projet par le Promoteur, sous réserve de la réalisation des conditions prévues dans le contrat de garantie.</p><h2>Article 4 : Conditions de déclenchement de la garantie</h2><p>La garantie financière d'achèvement sera déclenchée si les conditions prévues dans le contrat de garantie, notamment les délais et les circonstances d'achèvement, ne sont pas respectées par le Promoteur.</p><h2>Article 5 : Paiement de la garantie</h2><p>En cas de déclenchement de la garantie, le Garant s'engage à effectuer le paiement du montant garanti au Bénéficiaire dans un délai de {{delai_paiement}} jours à compter de la notification du Bénéficiaire.</p><h2>Article 6 : Loi applicable et litiges</h2><p>Ce contrat de garantie financière d'achèvement est régi par les lois en vigueur dans {{juridiction}}. Tout litige découlant de ce contrat sera soumis à la médiation ou à l'arbitrage conformément aux règles d'arbitrage en vigueur dans cette juridiction.</p><p class="signatures">Fait en deux exemplaires originaux, à {{lieu}}, le {{date_jour}}.<br/><br/>Le Garant — Le Bénéficiaire</p></div>`,
    countriesJson: C_GARANTIES,
  },

  // ── 22. Contrat de garantie de performance / de délais ─────────────────────
  // FUSION : Contrat de Garantie de Performance + Contrat de Garantie de Délais
  {
    code: 'btp_garantie_performance_delais', name: 'Contrat de garantie de performance ou de délais', category: 'btp_construction',
    price: 3000, priceMax: 5000, popularity: 22,
    description: 'Garantissez la performance ou les délais d’exécution d’un marché : montant plafonné, déclenchement et paiement encadrés.',
    fieldsJson: F([
      { key: 'type_garantie', label: 'Type de garantie', type: 'select', required: true, options: ['Garantie de performance', 'Garantie de délais d’exécution'] },
      { key: 'garant', label: 'Identification complète du Garant (nom, forme juridique, numéro d’enregistrement, siège social)', type: 'textarea', required: true },
      { key: 'beneficiaire', label: 'Identification complète du Bénéficiaire (nom, forme juridique, numéro d’enregistrement, siège social)', type: 'textarea', required: true },
      { key: 'debiteur', label: 'Nom du Débiteur (entreprise dont les obligations sont garanties)', type: 'text', required: true },
      { key: 'nom_contrat', label: 'Référence / nom du contrat garanti', type: 'text', required: true },
      { key: 'montant_garantie', label: 'Montant maximum garanti, en chiffres et en lettres (FCFA)', type: 'text', required: true },
      { key: 'date_fin_garantie', label: 'Date de fin de la garantie', type: 'date', required: true },
      { key: 'delai_paiement', label: 'Délai de paiement après demande du Bénéficiaire (en jours)', type: 'text', required: true },
      { key: 'juridiction', label: 'Juridiction compétente / règles d’arbitrage applicables', type: 'text', required: true },
      { key: 'lieu', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE {{type_garantie}}</h1><h2>Article 1 : Parties au contrat</h2><p>Le présent contrat de garantie est conclu entre {{garant}}, ci-après dénommé « le Garant », et {{beneficiaire}}, ci-après dénommé « le Bénéficiaire ».</p><h2>Article 2 : Objet du contrat</h2><p>Le présent contrat a pour objet la {{type_garantie}} des obligations contractuelles de {{debiteur}}, ci-après dénommé « le Débiteur », envers le Bénéficiaire en vertu du contrat {{nom_contrat}} signé entre le Bénéficiaire et le Débiteur.</p><h2>Article 3 : Montant de la garantie</h2><p>Le Garant s'engage à garantir le paiement d'un montant maximum de {{montant_garantie}} FCFA en cas de non-performance, de mauvaise performance ou de non-respect des délais contractuels par le Débiteur envers le Bénéficiaire en vertu du contrat {{nom_contrat}}.</p><h2>Article 4 : Durée de la garantie</h2><p>La garantie prend effet à compter de la date de signature du présent contrat et reste en vigueur jusqu'au {{date_fin_garantie}} ou jusqu'à la réalisation complète des obligations contractuelles du Débiteur envers le Bénéficiaire, selon la première éventualité.</p><h2>Article 5 : Déclenchement de la garantie</h2><p>La garantie sera déclenchée par le Bénéficiaire en cas de non-performance, de mauvaise performance ou de non-respect des délais par le Débiteur conformément aux modalités définies dans le contrat {{nom_contrat}}.</p><h2>Article 6 : Paiement de la garantie</h2><p>En cas de déclenchement de la garantie, le Garant s'engage à effectuer le paiement du montant garanti au Bénéficiaire dans un délai de {{delai_paiement}} jours à compter de la réception d'une demande de paiement du Bénéficiaire.</p><h2>Article 7 : Loi applicable et litiges</h2><p>Ce contrat de garantie est régi par les lois en vigueur dans {{juridiction}}. Tout litige découlant de ce contrat sera soumis à la médiation ou à l'arbitrage conformément aux règles d'arbitrage en vigueur dans cette juridiction.</p><p class="signatures">Fait en deux exemplaires originaux, à {{lieu}}, le {{date_jour}}.<br/><br/>Le Garant — Le Bénéficiaire</p></div>`,
    countriesJson: C_GARANTIES,
  },

  // ── 23. Contrat d'assurance tous risques chantier (TRC / CAR) ──────────────
  // FUSION : Assurance Tous Risques Chantier + Assurance Tous Risques Chantier (CAR)
  {
    code: 'btp_assurance_trc', name: 'Contrat d’assurance tous risques chantier (TRC)', category: 'btp_construction',
    price: 3500, priceMax: 5500, popularity: 34,
    description: 'Couvrez votre chantier contre tous les risques : incendie, accidents, vols, dégâts des eaux — montant, franchise et prime.',
    fieldsJson: F([
      { key: 'assureur', label: 'Identification complète de l’Assureur (compagnie d’assurance : nom, siège, représentant et fonction)', type: 'textarea', required: true },
      { key: 'maitre_ouvrage', label: 'Identification complète du Maître d’ouvrage souscripteur (nom, siège social ou adresse, représentant)', type: 'textarea', required: true },
      { key: 'adresse_chantier', label: 'Adresse précise du chantier assuré', type: 'text', required: true },
      { key: 'montant_couverture', label: 'Montant de la couverture d’assurance (FCFA)', type: 'text', required: true },
      { key: 'franchise', label: 'Montant de la franchise (FCFA)', type: 'text', required: true },
      { key: 'montant_prime', label: 'Montant de la prime d’assurance (FCFA)', type: 'text', required: true },
      { key: 'date_debut', label: 'Date de début de la couverture', type: 'date', required: true },
      { key: 'date_fin', label: 'Date de fin de la couverture', type: 'date', required: true },
      { key: 'preavis', label: 'Délai de préavis de résiliation (en jours)', type: 'text', required: true },
      { key: 'pays', label: 'Pays dont les lois régissent le contrat', type: 'text', required: true },
      { key: 'lieu', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT D'ASSURANCE TOUS RISQUES CHANTIER (TRC)</h1><p><strong>Entre :</strong></p><p>{{assureur}}, ci-après dénommée « l'Assureur »,</p><p><strong>Et :</strong></p><p>{{maitre_ouvrage}}, ci-après dénommé « le Maître d'Ouvrage »,</p><p>Il est convenu ce qui suit :</p><h2>Article 1 : Objet</h2><p>Le présent contrat d'assurance tous risques chantier a pour objet de garantir une couverture complète des risques liés au chantier de construction situé à {{adresse_chantier}}, ci-après désigné « le Chantier ».</p><h2>Article 2 : Description de la couverture</h2><p>L'Assureur garantit la prise en charge des coûts liés aux dommages matériels, aux pertes financières et à la responsabilité civile survenant pendant la durée du chantier, conformément aux conditions et limites définies dans ce contrat et dans les conditions particulières de la police d'assurance.</p><h2>Article 3 : Risques couverts</h2><p>Les risques couverts par le contrat incluent, mais ne sont pas limités à, les incendies, les inondations, les accidents, les vols, les dégâts des eaux, les actes de vandalisme, les retards de chantier et la responsabilité civile.</p><h2>Article 4 : Montant de la couverture</h2><p>Le montant de la couverture d'assurance est de {{montant_couverture}} FCFA, avec une franchise de {{franchise}} FCFA. Les détails spécifiques de la couverture sont énoncés dans les conditions particulières de la police d'assurance.</p><h2>Article 5 : Durée du contrat</h2><p>La garantie tous risques chantier est valable pour la période commençant le {{date_debut}} et se terminant le {{date_fin}}, sauf renouvellement ou résiliation conformément aux termes du contrat.</p><h2>Article 6 : Prime d'assurance</h2><p>Le Maître d'Ouvrage s'engage à payer la prime d'assurance, dont le montant est de {{montant_prime}} FCFA, selon les modalités spécifiées dans la police d'assurance.</p><h2>Article 7 : Obligations du Maître d'Ouvrage</h2><p>Le Maître d'Ouvrage s'engage à :</p><ul><li>Informer immédiatement l'Assureur de tout incident ou sinistre survenant sur le Chantier.</li><li>Informer l'Assureur de tout changement important dans le projet de construction.</li><li>Coopérer pleinement avec l'expert désigné par l'Assureur pour l'évaluation des dommages et dans le cadre de toute enquête relative à une réclamation.</li></ul><h2>Article 8 : Résiliation</h2><p>Chacune des parties peut résilier le contrat d'assurance en respectant un préavis écrit de {{preavis}} jours, selon les modalités prévues par la loi et les conditions générales de l'Assureur.</p><h2>Article 9 : Dispositions générales</h2><p>Le présent contrat est régi par les lois de {{pays}}. Toute modification de ce contrat doit être faite par écrit et signée par les deux parties.</p><p class="signatures">Fait à {{lieu}}, le {{date_jour}}, en deux exemplaires originaux.<br/><br/>Pour l'Assureur, — Pour le Maître d'Ouvrage,</p></div>`,
    countriesJson: C_ASSURANCE,
  },

  // ── 24. Contrat d'assurance dommages ouvrage ───────────────────────────────
  {
    code: 'btp_assurance_dommages_ouvrage', name: 'Contrat d’assurance dommages ouvrage', category: 'btp_construction',
    price: 3500, priceMax: 5500, popularity: 30,
    description: 'Protégez votre ouvrage après réception : vices de construction, malfaçons et dommages structurels pris en charge.',
    fieldsJson: F([
      { key: 'assureur', label: 'Identification complète de la Compagnie d’assurance (nom, pays d’enregistrement, siège, représentant et fonction)', type: 'textarea', required: true },
      { key: 'proprietaire', label: 'Identification complète du Propriétaire / Maître d’ouvrage (nom et adresse)', type: 'textarea', required: true },
      { key: 'adresse_chantier', label: 'Adresse du chantier / de l’ouvrage assuré', type: 'text', required: true },
      { key: 'duree_garantie', label: 'Durée de la garantie à compter de la réception de l’ouvrage (ans)', type: 'text', required: true },
      { key: 'pays', label: 'Pays dont les lois régissent le contrat', type: 'text', required: true },
      { key: 'lieu', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT D'ASSURANCE DOMMAGES OUVRAGE</h1><p><strong>Entre les soussignés :</strong></p><p>{{assureur}}, ci-après désignée « la Compagnie d'Assurance »,</p><p><strong>et</strong></p><p>{{proprietaire}}, ci-après désigné « le Propriétaire »,</p><p>Il a été convenu ce qui suit :</p><h2>Article 1 : Objet</h2><p>Le présent contrat d'assurance dommages ouvrage a pour objet de garantir le Propriétaire contre les dommages susceptibles d'affecter l'ouvrage en cours de construction situé à {{adresse_chantier}}, ci-après désigné « l'Ouvrage ».</p><h2>Article 2 : Couverture</h2><p>La Compagnie d'Assurance garantit la prise en charge des coûts de réparation des dommages couverts par le contrat, conformément aux conditions et limites définies dans ce contrat.</p><h2>Article 3 : Dommages couverts</h2><p>Les dommages couverts par le contrat incluent, mais ne sont pas limités à, les vices de construction, les malfaçons et les dommages structurels compromettant la solidité de l'Ouvrage.</p><h2>Article 4 : Durée de la garantie</h2><p>La garantie dommages ouvrage est valable pour une durée de {{duree_garantie}} à compter de la réception de l'Ouvrage.</p><h2>Article 5 : Obligations du Propriétaire</h2><p>Le Propriétaire s'engage à notifier tout dommage susceptible d'entraîner une réclamation dans les délais spécifiés par la Compagnie d'Assurance.</p><h2>Article 6 : Résiliation</h2><p>Ce contrat peut être résilié par l'une ou l'autre des parties selon les modalités prévues par la loi et les conditions générales de la Compagnie d'Assurance.</p><h2>Article 7 : Dispositions générales</h2><p>Le présent contrat est régi par les lois de {{pays}}. Toute modification de ce contrat doit être faite par écrit et signée par les deux parties.</p><p class="signatures">Fait à {{lieu}}, le {{date_jour}}, en deux exemplaires originaux.<br/><br/>Pour la Compagnie d'Assurance, — Pour le Propriétaire,</p></div>`,
    countriesJson: C_ASSURANCE,
  },

  // ── 25. Contrat d'essais et de mise en service ─────────────────────────────
  {
    code: 'btp_essais_mise_service', name: 'Contrat d’essais et de mise en service', category: 'btp_construction',
    price: 3000, priceMax: 5000, popularity: 18,
    description: 'Testez et mettez en service vos installations : essais fonctionnels, vérifications de conformité, configuration et formation.',
    fieldsJson: F([
      { key: 'societe_mise_service', label: 'Identification complète de la Société de mise en service (nom, numéro d’enregistrement, siège social)', type: 'textarea', required: true },
      { key: 'client', label: 'Identification complète du Client (nom, numéro d’enregistrement, siège social)', type: 'textarea', required: true },
      { key: 'nom_systeme', label: 'Nom / désignation du système ou de l’installation à tester et mettre en service', type: 'text', required: true },
      { key: 'date_debut', label: 'Date de début du contrat', type: 'date', required: true },
      { key: 'date_fin', label: 'Date de fin du contrat', type: 'date', required: true },
      { key: 'preavis', label: 'Délai de préavis de résiliation (en jours)', type: 'text', required: true },
      { key: 'juridiction', label: 'Juridiction compétente / règles d’arbitrage applicables', type: 'text', required: true },
      { key: 'lieu', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT D'ESSAIS ET DE MISE EN SERVICE</h1><h2>Article 1 : Parties au contrat</h2><p>Le présent contrat d'essais et de mise en service (le « Contrat ») est conclu entre {{societe_mise_service}}, ci-après dénommée « la Société de Mise en Service », et {{client}}, ci-après dénommée « le Client ».</p><h2>Article 2 : Objet du contrat</h2><p>Le présent Contrat a pour objet de définir les modalités des essais et de la mise en service effectués par la Société de Mise en Service pour le compte du Client, conformément aux termes et conditions énoncés dans le présent Contrat.</p><h2>Article 3 : Services d'essais et de mise en service</h2><p>La Société de Mise en Service s'engage à fournir au Client des services d'essais et de mise en service pour le système {{nom_systeme}}, conformément aux besoins spécifiés par le Client. Ces services incluent, mais ne se limitent pas à, les essais fonctionnels, les vérifications de conformité, la configuration du système, et la formation du personnel du Client.</p><h2>Article 4 : Responsabilités de la Société de Mise en Service</h2><p>La Société de Mise en Service s'engage à exercer ses meilleures compétences et diligences pour assurer des essais et une mise en service de haute qualité. Elle devra respecter les normes et les procédures appropriées, garantir le bon fonctionnement du système, signaler les défauts et les problèmes, et fournir des rapports d'essais et de mise en service détaillés au Client.</p><h2>Article 5 : Responsabilités du Client</h2><p>Le Client s'engage à fournir à la Société de Mise en Service toutes les informations et données nécessaires pour la réalisation des essais et de la mise en service. Il devra également coopérer activement avec la Société de Mise en Service dans le cadre de ces services.</p><h2>Article 6 : Confidentialité</h2><p>Les deux parties s'engagent à maintenir la confidentialité de toutes les informations sensibles échangées dans le cadre de ce Contrat.</p><h2>Article 7 : Durée du contrat</h2><p>Le Contrat d'essais et de mise en service est établi pour une période commençant le {{date_debut}} et se terminant le {{date_fin}}. Il peut être renouvelé avec l'accord des deux parties.</p><h2>Article 8 : Rémunération</h2><p>La rémunération de la Société de Mise en Service pour les services d'essais et de mise en service sera définie dans un accord financier séparé ou dans une annexe à ce Contrat.</p><h2>Article 9 : Loi applicable et litiges</h2><p>Ce Contrat d'essais et de mise en service est régi par les lois en vigueur dans {{juridiction}}. Tout litige découlant de ce Contrat sera soumis à la médiation ou à l'arbitrage conformément aux règles d'arbitrage en vigueur dans cette juridiction.</p><h2>Article 10 : Résiliation du Contrat</h2><p>Chacune des parties peut résilier le Contrat en respectant un préavis écrit de {{preavis}} jours. Les motifs de résiliation sont également spécifiés dans une annexe à ce Contrat.</p><p class="signatures">Fait en deux exemplaires originaux, à {{lieu}}, le {{date_jour}}.<br/><br/>La Société de Mise en Service — Le Client</p></div>`,
    countriesJson: C_PRESTATIONS,
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
  console.log('Seed Drive3 BTP (Agent Drive3-4/10) terminé.');
  console.log(`   Templates du script : ${templates.length} (créés : ${created}, mis à jour : ${updated})`);
  console.log(`   Catégorie : btp_construction`);
  console.log(`   Total de templates en base : ${total}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
