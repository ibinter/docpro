// Seed Drive2 BTP — Agent Drive2-3/10 : 12 modèles BTP (deuxième passe pack JUR-005)
// convertis depuis le Google Drive IBIG : réception provisoire/définitive, supervision,
// études de faisabilité, contrôle qualité, suivi de chantier, gestion de projet,
// location de grues/bulldozers, garantie de bonne fin, cautionnement, infrastructure routière.
// Script ADDITIF : upsert par code — n'écrase pas les templates existants.
// Exécution : npx tsx prisma/seed-drive2-btp.ts
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
const C_RECEPTION = JSON.stringify({
  OHADA: { note: 'Usages OHADA/zone CFA — pour les marchés publics, respecter le code des marchés publics local (réception provisoire puis définitive).' },
  FR: { note: 'Adapter aux garanties du Code civil et du Code de la construction (parfait achèvement, décennale) et à la norme NF P03-001.' },
});
const C_GARANTIES = JSON.stringify({
  OHADA: { note: 'Sûretés régies par l’Acte uniforme OHADA portant organisation des sûretés (cautionnement, garantie autonome) — montants en FCFA.' },
  FR: { note: 'Adapter au régime du cautionnement du Code civil et, pour la retenue de garantie, à la loi n°71-584.' },
});
const C_PRESTATIONS = JSON.stringify({
  OHADA: { note: 'Conforme aux usages OHADA/zone CFA — montants en FCFA.' },
  FR: { note: 'Pour la maîtrise d’œuvre et le contrôle technique, adapter au Code de la construction et de l’habitation et à la norme NF P03-001.' },
});
const C_LOCATION = JSON.stringify({
  OHADA: { note: 'Conforme aux usages OHADA/zone CFA — montants en FCFA. Vérifier les règles locales de sécurité des engins de levage.' },
  FR: { note: 'Adapter aux règles de sécurité du Code du travail (appareils de levage, CACES) et aux conditions générales de location de matériel.' },
});

const templates: CatalogTemplate[] = [
  // ── 1. Contrat / PV de réception provisoire des travaux ────────────────────
  {
    code: 'btp_reception_provisoire', name: 'Contrat de réception provisoire des travaux', category: 'btp_construction',
    price: 2500, priceMax: 4500, popularity: 55,
    description: 'Organisez la réception provisoire de votre chantier : délai de vérification, non-conformités signalées et obligations de reprise.',
    fieldsJson: F([
      { key: 'client', label: 'Identification complète du Client / Maître d’ouvrage (nom, numéro d’enregistrement, siège social)', type: 'textarea', required: true },
      { key: 'entrepreneur', label: 'Identification complète de l’Entrepreneur (nom, numéro d’enregistrement, siège social)', type: 'textarea', required: true },
      { key: 'description_travaux', label: 'Description des travaux réalisés (référence des plans, spécifications, délais et coûts annexés)', type: 'textarea', required: true },
      { key: 'delai_reception', label: 'Délai de réception provisoire après notification d’achèvement (en jours)', type: 'text', required: true },
      { key: 'duree_contrat', label: 'Durée du contrat (dates de début et de fin)', type: 'text', required: true },
      { key: 'juridiction', label: 'Juridiction compétente / règles d’arbitrage applicables', type: 'text', required: true },
      { key: 'preavis', label: 'Délai de préavis de résiliation (en jours)', type: 'text', required: true },
      { key: 'lieu', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE RÉCEPTION PROVISOIRE</h1><h2>Article 1 : Parties au contrat</h2><p>Le présent contrat de réception provisoire (le « Contrat ») est conclu entre {{client}}, ci-après dénommée « le Client », et {{entrepreneur}}, ci-après dénommée « l'Entrepreneur ».</p><h2>Article 2 : Objet du contrat</h2><p>Le présent Contrat a pour objet de définir les modalités de la réception provisoire des travaux réalisés par l'Entrepreneur conformément aux termes et conditions énoncés dans le présent Contrat.</p><h2>Article 3 : Travaux réalisés</h2><p>Les travaux réalisés par l'Entrepreneur sont décrits en détail comme suit et annexés à ce Contrat : {{description_travaux}}. Cette description inclut les spécifications techniques, les plans, les délais, et les coûts associés aux travaux.</p><h2>Article 4 : Réception provisoire</h2><p>Le Client s'engage à effectuer une réception provisoire des travaux dans un délai de {{delai_reception}} jours suivant la notification de l'achèvement des travaux par l'Entrepreneur. La réception provisoire vise à vérifier la conformité des travaux par rapport aux spécifications et aux plans convenus.</p><h2>Article 5 : Obligations du Client</h2><p>Le Client s'engage à effectuer la réception provisoire de manière diligente et à informer l'Entrepreneur de toute non-conformité constatée. Le Client devra également payer les montants dus à l'Entrepreneur conformément aux termes de paiement convenus.</p><h2>Article 6 : Obligations de l'Entrepreneur</h2><p>L'Entrepreneur s'engage à remédier rapidement à toute non-conformité signalée par le Client lors de la réception provisoire. L'Entrepreneur devra également fournir au Client tous les documents et rapports nécessaires à la réception provisoire.</p><h2>Article 7 : Durée du contrat</h2><p>Le Contrat de réception provisoire est établi pour la période suivante : {{duree_contrat}}. Il peut être renouvelé avec l'accord des deux parties.</p><h2>Article 8 : Rémunération</h2><p>La rémunération de l'Entrepreneur pour les travaux réalisés est spécifiée dans une annexe financière séparée ou dans une annexe à ce Contrat.</p><h2>Article 9 : Loi applicable et litiges</h2><p>Ce Contrat de réception provisoire est régi par les lois en vigueur dans {{juridiction}}. Tout litige découlant de ce Contrat sera soumis à la médiation ou à l'arbitrage conformément aux règles d'arbitrage en vigueur dans cette juridiction.</p><h2>Article 10 : Résiliation du Contrat</h2><p>Chacune des parties peut résilier le Contrat en respectant un préavis écrit de {{preavis}} jours. Les motifs de résiliation sont également spécifiés dans une annexe à ce Contrat.</p><p class="signatures">Fait en deux exemplaires originaux, à {{lieu}}, le {{date_jour}}.<br/><br/>Le Client — L'Entrepreneur</p></div>`,
    countriesJson: C_RECEPTION,
  },

  // ── 2. Contrat / PV de réception définitive des travaux ────────────────────
  {
    code: 'btp_reception_definitive', name: 'Contrat de réception définitive des travaux', category: 'btp_construction',
    price: 2500, priceMax: 4500, popularity: 50,
    description: 'Clôturez définitivement votre chantier : vérification d’aptitude à l’usage, garantie contre les défauts et levée des obligations.',
    fieldsJson: F([
      { key: 'client', label: 'Identification complète du Client / Maître d’ouvrage (nom, numéro d’enregistrement, siège social)', type: 'textarea', required: true },
      { key: 'entrepreneur', label: 'Identification complète de l’Entrepreneur (nom, numéro d’enregistrement, siège social)', type: 'textarea', required: true },
      { key: 'description_travaux', label: 'Description des travaux réalisés (référence des plans, spécifications, délais et coûts annexés)', type: 'textarea', required: true },
      { key: 'delai_reception', label: 'Délai de réception définitive après notification d’achèvement (en jours)', type: 'text', required: true },
      { key: 'periode_garantie', label: 'Période de garantie contre les défauts après réception définitive (ans/mois)', type: 'text', required: true },
      { key: 'duree_contrat', label: 'Durée du contrat (dates de début et de fin)', type: 'text', required: true },
      { key: 'preavis', label: 'Délai de préavis de résiliation (en jours)', type: 'text', required: true },
      { key: 'juridiction', label: 'Juridiction compétente / règles d’arbitrage applicables', type: 'text', required: true },
      { key: 'lieu', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE RÉCEPTION DÉFINITIVE</h1><h2>Article 1 : Parties au contrat</h2><p>Le présent contrat de réception définitive (le « Contrat ») est conclu entre {{client}}, ci-après dénommée « le Client », et {{entrepreneur}}, ci-après dénommée « l'Entrepreneur ».</p><h2>Article 2 : Objet du contrat</h2><p>Le présent Contrat a pour objet de définir les modalités de la réception définitive des travaux réalisés par l'Entrepreneur conformément aux termes et conditions énoncés dans le présent Contrat.</p><h2>Article 3 : Travaux réalisés</h2><p>Les travaux réalisés par l'Entrepreneur sont décrits en détail comme suit et annexés à ce Contrat : {{description_travaux}}. Cette description inclut les spécifications techniques, les plans, les délais, et les coûts associés aux travaux.</p><h2>Article 4 : Réception définitive</h2><p>Le Client s'engage à effectuer une réception définitive des travaux dans un délai de {{delai_reception}} jours suivant la notification de l'achèvement des travaux par l'Entrepreneur. La réception définitive vise à vérifier la conformité des travaux par rapport aux spécifications et aux plans convenus, ainsi que leur aptitude à une utilisation normale.</p><h2>Article 5 : Obligations du Client</h2><p>Le Client s'engage à effectuer la réception définitive de manière diligente et à informer l'Entrepreneur de toute non-conformité constatée. Le Client devra également payer les montants dus à l'Entrepreneur conformément aux termes de paiement convenus.</p><h2>Article 6 : Obligations de l'Entrepreneur</h2><p>L'Entrepreneur s'engage à remédier rapidement à toute non-conformité signalée par le Client lors de la réception définitive. L'Entrepreneur devra également fournir au Client tous les documents et rapports nécessaires à la réception définitive.</p><h2>Article 7 : Garantie</h2><p>L'Entrepreneur garantit que les travaux réalisés seront exempts de défauts de matériaux et de fabrication pour une période de {{periode_garantie}} à compter de la date de réception définitive.</p><h2>Article 8 : Durée du contrat</h2><p>Le Contrat de réception définitive est établi pour la période suivante : {{duree_contrat}}. Il peut être renouvelé avec l'accord des deux parties.</p><h2>Article 9 : Rémunération</h2><p>La rémunération de l'Entrepreneur pour les travaux réalisés est spécifiée dans une annexe financière séparée ou dans une annexe à ce Contrat.</p><h2>Article 10 : Loi applicable et litiges</h2><p>Ce Contrat de réception définitive est régi par les lois en vigueur dans {{juridiction}}. Tout litige découlant de ce Contrat sera soumis à la médiation ou à l'arbitrage conformément aux règles d'arbitrage en vigueur dans cette juridiction.</p><h2>Article 11 : Résiliation du Contrat</h2><p>Chacune des parties peut résilier le Contrat en respectant un préavis écrit de {{preavis}} jours. Les motifs de résiliation sont également spécifiés dans une annexe à ce Contrat.</p><p class="signatures">Fait en deux exemplaires originaux, à {{lieu}}, le {{date_jour}}.<br/><br/>Le Client — L'Entrepreneur</p></div>`,
    countriesJson: C_RECEPTION,
  },

  // ── 3. Contrat de supervision de la construction (maîtrise d'œuvre) ────────
  {
    code: 'btp_supervision_construction', name: 'Contrat de supervision de la construction', category: 'btp_construction',
    price: 3500, priceMax: 5500, popularity: 48,
    description: 'Confiez la surveillance de votre chantier à un maître d’œuvre : inspections, conformité aux plans et rapports de supervision.',
    fieldsJson: F([
      { key: 'societe_supervision', label: 'Identification complète de la Société de Supervision (nom, numéro d’enregistrement, siège social)', type: 'textarea', required: true },
      { key: 'client', label: 'Identification complète du Client (nom, numéro d’enregistrement, siège social)', type: 'textarea', required: true },
      { key: 'nom_projet', label: 'Nom / désignation du projet supervisé', type: 'text', required: true },
      { key: 'date_debut', label: 'Date de début du contrat', type: 'date', required: true },
      { key: 'date_fin', label: 'Date de fin du contrat', type: 'date', required: true },
      { key: 'preavis', label: 'Délai de préavis de résiliation (en jours)', type: 'text', required: true },
      { key: 'juridiction', label: 'Juridiction compétente / règles d’arbitrage applicables', type: 'text', required: true },
      { key: 'lieu', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE SUPERVISION DE LA CONSTRUCTION</h1><h2>Article 1 : Parties au contrat</h2><p>Le présent contrat de supervision de la construction (le « Contrat ») est conclu entre {{societe_supervision}}, ci-après dénommée « la Société de Supervision », et {{client}}, ci-après dénommée « le Client ».</p><h2>Article 2 : Objet du contrat</h2><p>Le présent Contrat a pour objet de définir les modalités de la supervision de la construction effectuée par la Société de Supervision pour le compte du Client, conformément aux termes et conditions énoncés dans le présent Contrat.</p><h2>Article 3 : Services de supervision de la construction</h2><p>La Société de Supervision s'engage à fournir au Client des services de supervision de la construction dans le cadre du projet {{nom_projet}}, conformément aux besoins spécifiés par le Client. Ces services incluent, mais ne se limitent pas à, l'inspection, la vérification de la conformité aux plans et aux spécifications, le suivi des travaux, et la fourniture de rapports de supervision.</p><h2>Article 4 : Responsabilités de la Société de Supervision</h2><p>La Société de Supervision s'engage à exercer ses meilleures compétences et diligences pour assurer une supervision de la construction de haute qualité. Elle devra respecter les normes et les procédures de supervision appropriées, vérifier la qualité des travaux, signaler les défauts et les problèmes, et fournir des rapports de supervision détaillés au Client.</p><h2>Article 5 : Responsabilités du Client</h2><p>Le Client s'engage à fournir à la Société de Supervision toutes les informations et données nécessaires pour la réalisation de la supervision de la construction. Il devra également coopérer activement avec la Société de Supervision dans le cadre de la supervision.</p><h2>Article 6 : Confidentialité</h2><p>Les deux parties s'engagent à maintenir la confidentialité de toutes les informations sensibles échangées dans le cadre de ce Contrat.</p><h2>Article 7 : Durée du contrat</h2><p>Le Contrat de supervision de la construction est établi pour une période commençant le {{date_debut}} et se terminant le {{date_fin}}. Il peut être renouvelé avec l'accord des deux parties.</p><h2>Article 8 : Rémunération</h2><p>La rémunération de la Société de Supervision pour les services de supervision de la construction sera définie dans un accord financier séparé ou dans une annexe à ce Contrat.</p><h2>Article 9 : Loi applicable et litiges</h2><p>Ce Contrat de supervision de la construction est régi par les lois en vigueur dans {{juridiction}}. Tout litige découlant de ce Contrat sera soumis à la médiation ou à l'arbitrage conformément aux règles d'arbitrage en vigueur dans cette juridiction.</p><h2>Article 10 : Résiliation du Contrat</h2><p>Chacune des parties peut résilier le Contrat en respectant un préavis écrit de {{preavis}} jours. Les motifs de résiliation sont également spécifiés dans une annexe à ce Contrat.</p><p class="signatures">Fait en deux exemplaires originaux, à {{lieu}}, le {{date_jour}}.<br/><br/>La Société de Supervision — Le Client</p></div>`,
    countriesJson: C_PRESTATIONS,
  },

  // ── 4. Contrat pour études de faisabilité (bureau d'études) ────────────────
  {
    code: 'btp_etudes_faisabilite', name: 'Contrat pour études de faisabilité', category: 'btp_construction',
    price: 3000, priceMax: 5000, popularity: 40,
    description: 'Évaluez la viabilité de votre projet avant d’investir : analyses économiques, techniques, environnementales et juridiques.',
    fieldsJson: F([
      { key: 'societe_consultation', label: 'Identification complète de la Société de Consultation (nom, numéro d’enregistrement, siège social)', type: 'textarea', required: true },
      { key: 'client', label: 'Identification complète du Client (nom, numéro d’enregistrement, siège social)', type: 'textarea', required: true },
      { key: 'nom_projet', label: 'Nom / désignation du projet à évaluer', type: 'text', required: true },
      { key: 'date_debut', label: 'Date de début du contrat', type: 'date', required: true },
      { key: 'date_fin', label: 'Date de fin du contrat', type: 'date', required: true },
      { key: 'preavis', label: 'Délai de préavis de résiliation (en jours)', type: 'text', required: true },
      { key: 'juridiction', label: 'Juridiction compétente / règles d’arbitrage applicables', type: 'text', required: true },
      { key: 'lieu', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT POUR ÉTUDES DE FAISABILITÉ</h1><h2>Article 1 : Parties au contrat</h2><p>Le présent contrat pour études de faisabilité (le « Contrat ») est conclu entre {{societe_consultation}}, ci-après dénommée « la Société de Consultation », et {{client}}, ci-après dénommée « le Client ».</p><h2>Article 2 : Objet du contrat</h2><p>Le présent Contrat a pour objet de définir les modalités de réalisation d'études de faisabilité par la Société de Consultation pour le compte du Client, conformément aux termes et conditions énoncés dans le présent Contrat.</p><h2>Article 3 : Services d'études de faisabilité</h2><p>La Société de Consultation s'engage à fournir au Client les services d'études de faisabilité nécessaires pour évaluer la viabilité et la faisabilité du projet désigné {{nom_projet}}. Ces services incluent, mais ne se limitent pas à, l'analyse des facteurs économiques, techniques, environnementaux et juridiques qui peuvent influencer la décision du Client de poursuivre ou non le projet.</p><h2>Article 4 : Responsabilités de la Société de Consultation</h2><p>La Société de Consultation s'engage à exercer ses meilleures compétences et diligences pour mener à bien les études de faisabilité. Elle devra réaliser les analyses nécessaires, collecter les données pertinentes, élaborer un rapport complet de faisabilité, et fournir des recommandations au Client.</p><h2>Article 5 : Responsabilités du Client</h2><p>Le Client s'engage à fournir à la Société de Consultation toutes les informations et données pertinentes pour la réalisation des études de faisabilité. Il devra également collaborer activement avec la Société de Consultation pour permettre la réalisation des analyses requises.</p><h2>Article 6 : Confidentialité</h2><p>Les deux parties s'engagent à maintenir la confidentialité de toutes les informations sensibles échangées dans le cadre de ce Contrat.</p><h2>Article 7 : Durée du contrat</h2><p>Le Contrat pour études de faisabilité est établi pour une période commençant le {{date_debut}} et se terminant le {{date_fin}}. Il peut être renouvelé avec l'accord des deux parties.</p><h2>Article 8 : Rémunération</h2><p>La rémunération de la Société de Consultation pour les services d'études de faisabilité sera définie dans un accord financier séparé ou dans une annexe à ce Contrat.</p><h2>Article 9 : Loi applicable et litiges</h2><p>Ce Contrat pour études de faisabilité est régi par les lois en vigueur dans {{juridiction}}. Tout litige découlant de ce Contrat sera soumis à la médiation ou à l'arbitrage conformément aux règles d'arbitrage en vigueur dans cette juridiction.</p><h2>Article 10 : Résiliation du Contrat</h2><p>Chacune des parties peut résilier le Contrat en respectant un préavis écrit de {{preavis}} jours. Les motifs de résiliation sont également spécifiés dans une annexe à ce Contrat.</p><p class="signatures">Fait en deux exemplaires originaux, à {{lieu}}, le {{date_jour}}.<br/><br/>La Société de Consultation — Le Client</p></div>`,
    countriesJson: C_PRESTATIONS,
  },

  // ── 5. Contrat de contrôle qualité (contrôle technique) ────────────────────
  {
    code: 'btp_controle_qualite', name: 'Contrat de contrôle qualité', category: 'btp_construction',
    price: 3000, priceMax: 5000, popularity: 35,
    description: 'Sécurisez la qualité de vos ouvrages : inspections, vérifications, tests et rapports détaillés par un contrôleur indépendant.',
    fieldsJson: F([
      { key: 'societe_controle', label: 'Identification complète de la Société de Contrôle Qualité (nom, numéro d’enregistrement, siège social)', type: 'textarea', required: true },
      { key: 'client', label: 'Identification complète du Client (nom, numéro d’enregistrement, siège social)', type: 'textarea', required: true },
      { key: 'domaine', label: 'Domaine d’application du contrôle qualité (ex. gros œuvre, béton, installations électriques…)', type: 'text', required: true },
      { key: 'date_debut', label: 'Date de début du contrat', type: 'date', required: true },
      { key: 'date_fin', label: 'Date de fin du contrat', type: 'date', required: true },
      { key: 'preavis', label: 'Délai de préavis de résiliation (en jours)', type: 'text', required: true },
      { key: 'juridiction', label: 'Juridiction compétente / règles d’arbitrage applicables', type: 'text', required: true },
      { key: 'lieu', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE CONTRÔLE QUALITÉ</h1><h2>Article 1 : Parties au contrat</h2><p>Le présent contrat de contrôle qualité (le « Contrat ») est conclu entre {{societe_controle}}, ci-après dénommée « la Société de Contrôle Qualité », et {{client}}, ci-après dénommée « le Client ».</p><h2>Article 2 : Objet du contrat</h2><p>Le présent Contrat a pour objet de définir les modalités du contrôle qualité effectué par la Société de Contrôle Qualité pour le compte du Client, conformément aux termes et conditions énoncés dans le présent Contrat.</p><h2>Article 3 : Services de contrôle qualité</h2><p>La Société de Contrôle Qualité s'engage à fournir au Client des services de contrôle qualité dans le domaine spécifique de {{domaine}}, conformément aux besoins spécifiés par le Client. Ces services incluent, mais ne se limitent pas à, l'inspection, la vérification, les tests et les rapports de contrôle qualité.</p><h2>Article 4 : Responsabilités de la Société de Contrôle Qualité</h2><p>La Société de Contrôle Qualité s'engage à exercer ses meilleures compétences et diligences pour mener à bien le contrôle qualité. Elle devra respecter les normes et les procédures de contrôle de qualité appropriées, assurer la précision des inspections et des tests, et fournir des rapports de contrôle détaillés au Client.</p><h2>Article 5 : Responsabilités du Client</h2><p>Le Client s'engage à fournir à la Société de Contrôle Qualité toutes les informations et données nécessaires pour la réalisation du contrôle qualité. Il devra également coopérer activement avec la Société de Contrôle Qualité dans le cadre du contrôle.</p><h2>Article 6 : Confidentialité</h2><p>Les deux parties s'engagent à maintenir la confidentialité de toutes les informations sensibles échangées dans le cadre de ce Contrat.</p><h2>Article 7 : Durée du contrat</h2><p>Le Contrat de contrôle qualité est établi pour une période commençant le {{date_debut}} et se terminant le {{date_fin}}. Il peut être renouvelé avec l'accord des deux parties.</p><h2>Article 8 : Rémunération</h2><p>La rémunération de la Société de Contrôle Qualité pour les services de contrôle qualité sera définie dans un accord financier séparé ou dans une annexe à ce Contrat.</p><h2>Article 9 : Loi applicable et litiges</h2><p>Ce Contrat de contrôle qualité est régi par les lois en vigueur dans {{juridiction}}. Tout litige découlant de ce Contrat sera soumis à la médiation ou à l'arbitrage conformément aux règles d'arbitrage en vigueur dans cette juridiction.</p><h2>Article 10 : Résiliation du Contrat</h2><p>Chacune des parties peut résilier le Contrat en respectant un préavis écrit de {{preavis}} jours. Les motifs de résiliation sont également spécifiés dans une annexe à ce Contrat.</p><p class="signatures">Fait en deux exemplaires originaux, à {{lieu}}, le {{date_jour}}.<br/><br/>La Société de Contrôle Qualité — Le Client</p></div>`,
    countriesJson: C_PRESTATIONS,
  },

  // ── 6. Contrat de suivi de chantier (OPC) ──────────────────────────────────
  {
    code: 'btp_suivi_chantier', name: 'Contrat de suivi de chantier', category: 'btp_construction',
    price: 3000, priceMax: 5000, popularity: 42,
    description: 'Gardez le contrôle de votre chantier : visites régulières, gestion des délais et des coûts, rapports périodiques au client.',
    fieldsJson: F([
      { key: 'societe_suivi', label: 'Identification complète de la Société de Suivi de chantier (nom, numéro d’enregistrement, siège social)', type: 'textarea', required: true },
      { key: 'client', label: 'Identification complète du Client (nom, numéro d’enregistrement, siège social)', type: 'textarea', required: true },
      { key: 'nom_projet', label: 'Nom / désignation du projet de construction suivi', type: 'text', required: true },
      { key: 'date_debut', label: 'Date de début du contrat', type: 'date', required: true },
      { key: 'date_fin', label: 'Date de fin du contrat', type: 'date', required: true },
      { key: 'preavis', label: 'Délai de préavis de résiliation (en jours)', type: 'text', required: true },
      { key: 'juridiction', label: 'Juridiction compétente / règles d’arbitrage applicables', type: 'text', required: true },
      { key: 'lieu', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE SUIVI DE CHANTIER</h1><h2>Article 1 : Parties au contrat</h2><p>Le présent contrat de suivi de chantier (le « Contrat ») est conclu entre {{societe_suivi}}, ci-après dénommée « la Société de Suivi », et {{client}}, ci-après dénommée « le Client ».</p><h2>Article 2 : Objet du contrat</h2><p>Le présent Contrat a pour objet de définir les modalités du suivi de chantier par la Société de Suivi pour le compte du Client, conformément aux termes et conditions énoncés dans le présent Contrat.</p><h2>Article 3 : Services de suivi de chantier</h2><p>La Société de Suivi s'engage à fournir au Client les services de suivi de chantier nécessaires pour surveiller et contrôler les activités de construction du projet désigné {{nom_projet}}. Ces services incluent, mais ne se limitent pas à, la surveillance des travaux, le contrôle de la conformité aux plans et spécifications, la gestion des délais, la vérification des coûts, la gestion des problèmes et la communication avec les parties prenantes.</p><h2>Article 4 : Responsabilités de la Société de Suivi</h2><p>La Société de Suivi s'engage à exercer ses meilleures compétences et diligences pour assurer un suivi efficace du chantier. Elle devra effectuer des visites régulières sur le site, documenter les progrès et les problèmes, coordonner avec les entrepreneurs, et fournir des rapports périodiques au Client.</p><h2>Article 5 : Responsabilités du Client</h2><p>Le Client s'engage à fournir à la Société de Suivi toutes les informations, plans, spécifications, et accès nécessaires au suivi de chantier. Il devra également collaborer activement dans la résolution des problèmes et prendre les décisions nécessaires au bon déroulement du chantier.</p><h2>Article 6 : Confidentialité</h2><p>Les deux parties s'engagent à maintenir la confidentialité de toutes les informations sensibles échangées dans le cadre de ce Contrat.</p><h2>Article 7 : Durée du contrat</h2><p>Le Contrat de suivi de chantier est établi pour une période commençant le {{date_debut}} et se terminant le {{date_fin}}. Il peut être renouvelé avec l'accord des deux parties.</p><h2>Article 8 : Rémunération</h2><p>La rémunération de la Société de Suivi pour les services fournis sera définie dans un accord financier séparé ou dans une annexe à ce Contrat.</p><h2>Article 9 : Loi applicable et litiges</h2><p>Ce Contrat de suivi de chantier est régi par les lois en vigueur dans {{juridiction}}. Tout litige découlant de ce Contrat sera soumis à la médiation ou à l'arbitrage conformément aux règles d'arbitrage en vigueur dans cette juridiction.</p><h2>Article 10 : Résiliation du Contrat</h2><p>Chacune des parties peut résilier le Contrat en respectant un préavis écrit de {{preavis}} jours. Les motifs de résiliation sont également spécifiés dans une annexe à ce Contrat.</p><p class="signatures">Fait en deux exemplaires originaux, à {{lieu}}, le {{date_jour}}.<br/><br/>La Société de Suivi — Le Client</p></div>`,
    countriesJson: C_PRESTATIONS,
  },

  // ── 7. Contrat de gestion de projet de construction ────────────────────────
  {
    code: 'btp_gestion_projet', name: 'Contrat de gestion de projet de construction', category: 'btp_construction',
    price: 3500, priceMax: 5500, popularity: 45,
    description: 'Déléguez le pilotage complet de votre projet : planification, coordination, gestion des ressources, des coûts et des risques.',
    fieldsJson: F([
      { key: 'societe_gestion', label: 'Identification complète de la Société de Gestion de Projet (nom, numéro d’enregistrement, siège social)', type: 'textarea', required: true },
      { key: 'client', label: 'Identification complète du Client (nom, numéro d’enregistrement, siège social)', type: 'textarea', required: true },
      { key: 'nom_projet', label: 'Nom / désignation du projet géré', type: 'text', required: true },
      { key: 'date_debut', label: 'Date de début du contrat', type: 'date', required: true },
      { key: 'date_fin', label: 'Date de fin du contrat', type: 'date', required: true },
      { key: 'preavis', label: 'Délai de préavis de résiliation (en jours)', type: 'text', required: true },
      { key: 'juridiction', label: 'Juridiction compétente / règles d’arbitrage applicables', type: 'text', required: true },
      { key: 'lieu', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE GESTION DE PROJET</h1><h2>Article 1 : Parties au contrat</h2><p>Le présent contrat de gestion de projet (le « Contrat ») est conclu entre {{societe_gestion}}, ci-après dénommée « la Société de Gestion de Projet », et {{client}}, ci-après dénommée « le Client ».</p><h2>Article 2 : Objet du contrat</h2><p>Le présent Contrat a pour objet de définir les modalités de la gestion de projet par la Société de Gestion de Projet pour le compte du Client, conformément aux termes et conditions énoncés dans le présent Contrat.</p><h2>Article 3 : Services de gestion de projet</h2><p>La Société de Gestion de Projet s'engage à fournir au Client les services de gestion de projet nécessaires pour la planification, la coordination, l'exécution et le suivi du projet désigné {{nom_projet}}. Ces services incluent, mais ne se limitent pas à, la définition des objectifs du projet, la création d'un plan de projet, la gestion des ressources, la supervision des étapes de réalisation, le contrôle des coûts, la gestion des risques et la communication avec les parties prenantes.</p><h2>Article 4 : Responsabilités de la Société de Gestion de Projet</h2><p>La Société de Gestion de Projet s'engage à exercer ses meilleures compétences et diligences pour la gestion du projet du Client. Elle devra respecter les délais convenus, assurer la qualité des livrables, gérer les ressources humaines et matérielles, et rapporter régulièrement au Client sur l'état d'avancement du projet.</p><h2>Article 5 : Responsabilités du Client</h2><p>Le Client s'engage à fournir à la Société de Gestion de Projet toutes les informations, ressources et accès nécessaires à la gestion du projet. Il devra également désigner un représentant du Client pour collaborer avec la Société de Gestion de Projet et prendre les décisions nécessaires au bon déroulement du projet.</p><h2>Article 6 : Confidentialité</h2><p>Les deux parties s'engagent à maintenir la confidentialité de toutes les informations sensibles échangées dans le cadre de ce Contrat.</p><h2>Article 7 : Durée du contrat</h2><p>Le Contrat de gestion de projet est établi pour une période commençant le {{date_debut}} et se terminant le {{date_fin}}. Il peut être renouvelé avec l'accord des deux parties.</p><h2>Article 8 : Rémunération</h2><p>La rémunération de la Société de Gestion de Projet pour les services fournis sera définie dans un accord financier séparé ou dans une annexe à ce Contrat.</p><h2>Article 9 : Loi applicable et litiges</h2><p>Ce Contrat de gestion de projet est régi par les lois en vigueur dans {{juridiction}}. Tout litige découlant de ce Contrat sera soumis à la médiation ou à l'arbitrage conformément aux règles d'arbitrage en vigueur dans cette juridiction.</p><h2>Article 10 : Résiliation du Contrat</h2><p>Chacune des parties peut résilier le Contrat en respectant un préavis écrit de {{preavis}} jours. Les motifs de résiliation sont également spécifiés dans une annexe à ce Contrat.</p><p class="signatures">Fait en deux exemplaires originaux, à {{lieu}}, le {{date_jour}}.<br/><br/>La Société de Gestion de Projet — Le Client</p></div>`,
    countriesJson: C_PRESTATIONS,
  },

  // ── 8. Contrat de location de grues ────────────────────────────────────────
  {
    code: 'btp_location_grues', name: 'Contrat de location de grues', category: 'btp_construction',
    price: 3000, priceMax: 5000, popularity: 38,
    description: 'Louez une grue en toute sécurité : mise à disposition, opérateur qualifié, maintenance, assurances et responsabilités.',
    fieldsJson: F([
      { key: 'locataire', label: 'Identification complète du Locataire (nom, siège social, représentant légal et fonction)', type: 'textarea', required: true },
      { key: 'loueur', label: 'Identification complète du Loueur (société de location de grues : nom, siège social, représentant légal et fonction)', type: 'textarea', required: true },
      { key: 'adresse_projets', label: 'Adresse précise du ou des projets de construction', type: 'text', required: true },
      { key: 'description_grues', label: 'Nombre et type précis de grues fournies', type: 'textarea', required: true },
      { key: 'date_debut', label: 'Date de début de la location', type: 'date', required: true },
      { key: 'date_fin', label: 'Date de fin de la location', type: 'date', required: true },
      { key: 'montant', label: 'Coût total de la location (FCFA)', type: 'text', required: true },
      { key: 'modalites_paiement', label: 'Modalités de paiement (ex. acompte à la signature, solde en fin de location)', type: 'textarea', required: true },
      { key: 'lieu', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE LOCATION DE GRUES</h1><p><strong>Entre :</strong></p><p>{{locataire}}, ci-après dénommée « le Locataire »,</p><p><strong>Et :</strong></p><p>{{loueur}}, spécialisée dans la location d'équipements de construction, ci-après dénommée « le Loueur »,</p><p>Il est convenu ce qui suit :</p><h2>Article 1 : Objet</h2><p>Le présent contrat a pour objet de définir les termes et conditions selon lesquels le Loueur met à disposition du Locataire une ou plusieurs grues pour ses projets de construction situés à {{adresse_projets}}.</p><h2>Article 2 : Description de l'équipement</h2><p>Le Loueur s'engage à fournir {{description_grues}}. Les spécifications techniques et les conditions d'utilisation des grues sont détaillées en annexe.</p><h2>Article 3 : Durée de la location</h2><p>La durée de la location commence le {{date_debut}} et se termine le {{date_fin}}, sauf prolongation convenue par écrit entre les parties.</p><h2>Article 4 : Prix</h2><p>Le coût total de la location est évalué à {{montant}} FCFA pour la durée mentionnée. Ce montant comprend la mise à disposition de la grue et, si convenu, les services d'un opérateur qualifié.</p><h2>Article 5 : Modalités de paiement</h2><p>Le paiement sera effectué comme suit : {{modalites_paiement}}.</p><h2>Article 6 : Obligations du Loueur</h2><p>Le Loueur s'engage à :</p><ul><li>Livrer la grue en bon état de fonctionnement à la date convenue.</li><li>Fournir toutes les instructions nécessaires pour l'utilisation sécurisée de la grue.</li><li>Assurer la maintenance et les réparations nécessaires pendant la durée de la location.</li></ul><h2>Article 7 : Obligations du Locataire</h2><p>Le Locataire s'engage à :</p><ul><li>Utiliser la grue conformément aux instructions du Loueur et aux réglementations en vigueur.</li><li>Ne pas sous-louer ou céder la grue sans l'accord écrit du Loueur.</li><li>Informer le Loueur immédiatement en cas de dysfonctionnement ou de dommage.</li></ul><h2>Article 8 : Assurance et responsabilité</h2><p>Le Loueur déclare que la grue est assurée pour les risques liés à son utilisation. Le Locataire est responsable de tout dommage causé à la grue pendant la période de location et doit souscrire une assurance appropriée.</p><h2>Article 9 : Résolution des litiges</h2><p>Tout différend né de l'interprétation ou de l'exécution du présent contrat sera, dans la mesure du possible, réglé à l'amiable. À défaut, les parties conviennent que les litiges seront soumis aux tribunaux compétents du lieu de situation du chantier.</p><h2>Article 10 : Dispositions générales</h2><p>Le présent contrat est soumis au droit du pays où est situé le chantier. Toute modification de ce contrat doit être faite par écrit et signée par les deux parties.</p><p class="signatures">Fait à {{lieu}}, le {{date_jour}}, en deux exemplaires originaux.<br/><br/>Pour le Locataire, — Pour le Loueur,</p></div>`,
    countriesJson: C_LOCATION,
  },

  // ── 9. Contrat de location de bulldozers ───────────────────────────────────
  {
    code: 'btp_location_bulldozers', name: 'Contrat de location de bulldozers', category: 'btp_construction',
    price: 3000, priceMax: 5000, popularity: 30,
    description: 'Encadrez la location de vos engins de terrassement : livraison, entretien, réparations, assurances et retour du matériel.',
    fieldsJson: F([
      { key: 'loueur', label: 'Identification complète du Loueur (fournisseur de bulldozers : nom, pays d’immatriculation, représentant et fonction)', type: 'textarea', required: true },
      { key: 'locataire', label: 'Identification complète du Locataire (nom et adresse)', type: 'textarea', required: true },
      { key: 'adresse_chantier', label: 'Adresse précise du chantier', type: 'text', required: true },
      { key: 'description_materiel', label: 'Description des bulldozers loués (marque, modèle, caractéristiques)', type: 'textarea', required: true },
      { key: 'date_debut', label: 'Date de début de la location', type: 'date', required: true },
      { key: 'date_fin', label: 'Date de fin de la location', type: 'date', required: true },
      { key: 'montant', label: 'Coût total de la location (FCFA)', type: 'text', required: true },
      { key: 'echeancier', label: 'Échéancier de paiement', type: 'textarea', required: true },
      { key: 'lieu', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE LOCATION DE BULLDOZERS</h1><p><strong>Entre les soussignés :</strong></p><p>{{loueur}}, une entreprise spécialisée dans la location de matériel de construction, ci-après désignée « le Loueur »,</p><p><strong>et</strong></p><p>{{locataire}}, ci-après désigné « le Locataire »,</p><p>Il a été convenu et arrêté ce qui suit :</p><h2>Article 1 : Objet</h2><p>Le présent contrat a pour objet de définir les termes et conditions selon lesquels le Loueur s'engage à fournir au Locataire des bulldozers pour son projet situé à {{adresse_chantier}}.</p><h2>Article 2 : Description du matériel</h2><p>Les bulldozers à louer présentent les caractéristiques suivantes : {{description_materiel}}. Les spécifications détaillées sont fournies en annexe.</p><h2>Article 3 : Durée de la location</h2><p>La durée de la location débute le {{date_debut}} et se termine le {{date_fin}}, sauf prolongation convenue par les deux parties.</p><h2>Article 4 : Coût de la location</h2><p>Le coût total de la location pour la durée spécifiée est de {{montant}} FCFA, payable selon l'échéancier suivant : {{echeancier}}.</p><h2>Article 5 : Livraison et retour</h2><p>Le Loueur s'engage à livrer les bulldozers au site du projet à la date convenue et le Locataire s'engage à les retourner en bon état à la fin de la période de location.</p><h2>Article 6 : Entretien et réparations</h2><p>Le Locataire est responsable de l'entretien courant des bulldozers pendant la période de location. Toutes les réparations dues à l'usure normale seront à la charge du Loueur. Les dommages résultant d'une utilisation négligente ou incorrecte seront à la charge du Locataire.</p><h2>Article 7 : Assurance</h2><p>Le Loueur déclare que les bulldozers sont assurés contre les dommages et les accidents. Le Locataire s'engage à souscrire une assurance couvrant toute responsabilité liée à l'utilisation des bulldozers.</p><h2>Article 8 : Résiliation du contrat</h2><p>En cas de manquement par l'une des parties aux obligations stipulées dans le présent contrat, l'autre partie a le droit de résilier le contrat immédiatement, sans préjudice de tout autre droit ou recours.</p><h2>Article 9 : Résolution des litiges</h2><p>Tout différend né de l'interprétation ou de l'exécution du présent contrat sera, dans la mesure du possible, réglé à l'amiable. À défaut, les parties conviennent que les litiges seront soumis aux tribunaux compétents du lieu de situation du chantier.</p><h2>Article 10 : Dispositions générales</h2><p>Le présent contrat est régi par les lois du pays où est situé le chantier. Toute modification de ce contrat doit être faite par écrit et signée par les deux parties.</p><p class="signatures">Fait à {{lieu}}, le {{date_jour}}, en deux exemplaires originaux.<br/><br/>Pour le Loueur, — Pour le Locataire,</p></div>`,
    countriesJson: C_LOCATION,
  },

  // ── 10. Contrat de garantie de bonne fin (bonne exécution) ─────────────────
  {
    code: 'btp_garantie_bonne_fin', name: 'Contrat de garantie de bonne fin d’exécution', category: 'btp_construction',
    price: 3500, priceMax: 5500, popularity: 32,
    description: 'Garantissez la bonne exécution de votre marché : montant plafonné, déclenchement en cas de défaillance et délai de paiement.',
    fieldsJson: F([
      { key: 'garant', label: 'Identification complète du Garant (nom, forme juridique, numéro d’enregistrement, siège social)', type: 'textarea', required: true },
      { key: 'beneficiaire', label: 'Identification complète du Bénéficiaire (nom, forme juridique, numéro d’enregistrement, siège social)', type: 'textarea', required: true },
      { key: 'debiteur', label: 'Nom du Débiteur (entreprise dont l’exécution est garantie)', type: 'text', required: true },
      { key: 'nom_contrat', label: 'Référence / nom du contrat garanti', type: 'text', required: true },
      { key: 'obligations', label: 'Description des obligations du Débiteur garanties', type: 'textarea', required: true },
      { key: 'montant_garantie', label: 'Montant maximum garanti, en chiffres et en lettres (FCFA)', type: 'text', required: true },
      { key: 'date_fin_garantie', label: 'Date de fin de la garantie', type: 'date', required: true },
      { key: 'delai_paiement', label: 'Délai de paiement après demande du Bénéficiaire (en jours)', type: 'text', required: true },
      { key: 'lieu', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE GARANTIE DE BONNE FIN</h1><h2>Article 1 : Parties au contrat</h2><p>Le présent contrat de garantie de bonne fin est conclu entre {{garant}}, ci-après dénommé « le Garant », et {{beneficiaire}}, ci-après dénommé « le Bénéficiaire ».</p><h2>Article 2 : Objet du contrat</h2><p>Le présent contrat a pour objet la garantie de la bonne fin de l'exécution du contrat {{nom_contrat}} signé entre le Bénéficiaire et {{debiteur}}, ci-après dénommé « le Débiteur », en vertu duquel le Débiteur s'engage à {{obligations}}.</p><h2>Article 3 : Montant de la garantie</h2><p>Le Garant s'engage à garantir le paiement d'un montant maximum de {{montant_garantie}} FCFA en cas de non-exécution ou de mauvaise exécution des obligations du Débiteur envers le Bénéficiaire en vertu du contrat {{nom_contrat}}.</p><h2>Article 4 : Durée de la garantie</h2><p>La garantie de bonne fin prend effet à compter de la date de signature du présent contrat et reste en vigueur jusqu'au {{date_fin_garantie}} ou jusqu'à la réalisation complète des obligations contractuelles du Débiteur envers le Bénéficiaire, selon la première éventualité.</p><h2>Article 5 : Déclenchement de la garantie</h2><p>La garantie sera déclenchée par le Bénéficiaire en cas de non-exécution ou de mauvaise exécution des obligations par le Débiteur conformément aux modalités définies dans le contrat {{nom_contrat}}.</p><h2>Article 6 : Paiement de la garantie</h2><p>En cas de déclenchement de la garantie, le Garant s'engage à effectuer le paiement du montant garanti au Bénéficiaire dans un délai de {{delai_paiement}} jours à compter de la réception d'une demande de paiement du Bénéficiaire.</p><h2>Article 7 : Loi applicable et litiges</h2><p>Ce contrat de garantie de bonne fin est régi par les lois en vigueur au lieu du siège social du Bénéficiaire. Tout litige découlant de ce contrat sera soumis à la médiation ou à l'arbitrage conformément aux règles d'arbitrage en vigueur dans cette juridiction.</p><p class="signatures">Fait en deux exemplaires originaux, à {{lieu}}, le {{date_jour}}.<br/><br/>Le Garant — Le Bénéficiaire</p></div>`,
    countriesJson: C_GARANTIES,
  },

  // ── 11. Contrat de cautionnement (marchés BTP) ─────────────────────────────
  {
    code: 'btp_cautionnement', name: 'Contrat de cautionnement (marchés BTP)', category: 'btp_construction',
    price: 3000, priceMax: 5000, popularity: 28,
    description: 'Sécurisez le paiement et l’exécution de votre marché avec une caution : montant plafonné, durée et déclenchement encadrés.',
    fieldsJson: F([
      { key: 'cautionneur', label: 'Identification complète du Cautionneur (nom, forme juridique, numéro d’enregistrement, siège social)', type: 'textarea', required: true },
      { key: 'beneficiaire', label: 'Identification complète du Bénéficiaire (nom, forme juridique, numéro d’enregistrement, siège social)', type: 'textarea', required: true },
      { key: 'debiteur', label: 'Nom du Débiteur (entreprise dont les obligations sont cautionnées)', type: 'text', required: true },
      { key: 'nom_contrat', label: 'Référence / nom du contrat cautionné', type: 'text', required: true },
      { key: 'montant_caution', label: 'Montant maximum de la caution, en chiffres et en lettres (FCFA)', type: 'text', required: true },
      { key: 'date_fin_caution', label: 'Date de fin de la caution', type: 'date', required: true },
      { key: 'delai_paiement', label: 'Délai de paiement après demande du Bénéficiaire (en jours)', type: 'text', required: true },
      { key: 'juridiction', label: 'Juridiction compétente / règles d’arbitrage applicables', type: 'text', required: true },
      { key: 'lieu', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE CAUTIONNEMENT</h1><h2>Article 1 : Parties au contrat</h2><p>Le présent contrat de cautionnement est conclu entre {{cautionneur}}, ci-après dénommé « le Cautionneur », et {{beneficiaire}}, ci-après dénommé « le Bénéficiaire ».</p><h2>Article 2 : Objet du contrat</h2><p>Le présent contrat a pour objet le cautionnement accordé par le Cautionneur en faveur du Bénéficiaire pour garantir l'exécution des obligations contractuelles de {{debiteur}}, ci-après dénommé « le Débiteur », envers le Bénéficiaire en vertu du contrat {{nom_contrat}} signé entre le Bénéficiaire et le Débiteur.</p><h2>Article 3 : Montant de la caution</h2><p>Le Cautionneur s'engage à garantir le paiement d'un montant maximum de {{montant_caution}} FCFA en cas de défaut de paiement ou de non-exécution des obligations du Débiteur envers le Bénéficiaire.</p><h2>Article 4 : Durée de la caution</h2><p>La caution prend effet à compter de la date de signature du présent contrat et reste en vigueur jusqu'au {{date_fin_caution}} ou jusqu'à la réalisation complète des obligations contractuelles du Débiteur envers le Bénéficiaire, selon la première éventualité.</p><h2>Article 5 : Déclenchement de la caution</h2><p>La caution sera déclenchée par le Bénéficiaire en cas de défaut de paiement ou de non-exécution des obligations par le Débiteur conformément aux modalités définies dans le contrat {{nom_contrat}}.</p><h2>Article 6 : Paiement de la caution</h2><p>En cas de déclenchement de la caution, le Cautionneur s'engage à effectuer le paiement du montant garanti au Bénéficiaire dans un délai de {{delai_paiement}} jours à compter de la réception d'une demande de paiement du Bénéficiaire.</p><h2>Article 7 : Loi applicable et litiges</h2><p>Ce contrat de cautionnement est régi par les lois en vigueur dans {{juridiction}}. Tout litige découlant de ce contrat sera soumis à la médiation ou à l'arbitrage conformément aux règles d'arbitrage en vigueur dans cette juridiction.</p><p class="signatures">Fait en deux exemplaires originaux, à {{lieu}}, le {{date_jour}}.<br/><br/>Le Cautionneur — Le Bénéficiaire</p></div>`,
    countriesJson: C_GARANTIES,
  },

  // ── 12. Contrat de construction d'infrastructure routière (marché travaux) ─
  {
    code: 'btp_infrastructure_routiere', name: 'Contrat de construction d’infrastructure routière', category: 'btp_construction',
    price: 5000, priceMax: 6000, popularity: 44,
    description: 'Réalisez votre marché de travaux routiers : plans, sécurité du chantier, pénalités, réceptions provisoire et définitive.',
    fieldsJson: F([
      { key: 'maitre_ouvrage', label: 'Identification complète du Maître d’Ouvrage (entité publique ou privée : nom, adresse, contacts)', type: 'textarea', required: true },
      { key: 'entrepreneur', label: 'Identification complète de l’Entreprise de construction routière (nom, adresse, contacts)', type: 'textarea', required: true },
      { key: 'site', label: 'Adresse précise ou description du tracé de la route (le Site)', type: 'textarea', required: true },
      { key: 'montant', label: 'Coût total des travaux (FCFA)', type: 'text', required: true },
      { key: 'modalites_paiement', label: 'Modalités de paiement (avance, paiements échelonnés, paiement final)', type: 'textarea', required: true },
      { key: 'date_debut', label: 'Date de début des travaux', type: 'date', required: true },
      { key: 'date_fin', label: 'Date d’achèvement prévue', type: 'date', required: true },
      { key: 'pays', label: 'Pays dont les lois régissent le contrat', type: 'text', required: true },
      { key: 'lieu', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE CONSTRUCTION D'INFRASTRUCTURE ROUTIÈRE</h1><p><strong>ENTRE</strong><br/>{{maitre_ouvrage}}<br/>(« le Maître d'Ouvrage »)</p><p><strong>ET</strong><br/>{{entrepreneur}}<br/>(« l'Entrepreneur »)</p><h2>Préambule</h2><p>Le Maître d'Ouvrage a pour projet la construction d'une route située à {{site}} (le « Site ») et a choisi l'Entrepreneur pour réaliser ces travaux. Ce contrat vise à établir les termes et conditions sous lesquels ces travaux seront réalisés.</p><h2>Article 1 : Objet du Contrat</h2><p>Ce contrat a pour objet de définir les conditions selon lesquelles l'Entrepreneur s'engage à réaliser la construction de l'infrastructure routière conformément aux plans, aux spécifications techniques et au calendrier convenus.</p><h2>Article 2 : Plans et Spécifications</h2><p>2.1 Les plans et spécifications détaillés de la construction routière sont annexés au présent contrat.<br/>2.2 L'Entrepreneur s'engage à respecter strictement les plans et spécifications convenus.</p><h2>Article 3 : Obligations de l'Entrepreneur</h2><p>3.1 L'Entrepreneur s'engage à débuter les travaux à la date convenue et à les poursuivre sans délai jusqu'à leur achèvement complet.<br/>3.2 L'Entrepreneur garantit la qualité des matériaux utilisés et la conformité des travaux aux normes de construction routière en vigueur.<br/>3.3 L'Entrepreneur est responsable de la sécurité du chantier et s'engage à respecter toutes les réglementations en matière de santé et sécurité au travail.</p><h2>Article 4 : Obligations du Maître d'Ouvrage</h2><p>4.1 Le Maître d'Ouvrage s'engage à fournir toutes les informations nécessaires à la réalisation des travaux.<br/>4.2 Le Maître d'Ouvrage s'engage à effectuer les paiements conformément aux échéances convenues.</p><h2>Article 5 : Prix et Modalités de Paiement</h2><p>5.1 Le coût total des travaux est fixé à {{montant}} FCFA.<br/>5.2 Les modalités de paiement seront les suivantes : {{modalites_paiement}}.</p><h2>Article 6 : Délais</h2><p>6.1 La date de début des travaux est fixée au {{date_debut}}, et la date d'achèvement prévue au {{date_fin}}.<br/>6.2 En cas de retard non justifié, des pénalités de retard pourront être appliquées selon les termes convenus.</p><h2>Article 7 : Réception des Travaux</h2><p>7.1 Une réception provisoire sera organisée pour vérifier la conformité des travaux aux exigences convenues.<br/>7.2 La réception définitive sera prononcée après l'achèvement complet et la correction de tout défaut.</p><h2>Article 8 : Assurance et Garanties</h2><p>8.1 L'Entrepreneur s'engage à souscrire une assurance responsabilité civile professionnelle ainsi qu'une assurance spécifique pour les travaux de construction routière.<br/>8.2 Des garanties pour la durabilité et la qualité de l'infrastructure seront fournies.</p><h2>Article 9 : Résolution des Litiges</h2><p>Tout différend relatif à l'interprétation ou à l'exécution du présent contrat sera d'abord soumis à la médiation. En cas de non-résolution, les parties pourront saisir les tribunaux compétents.</p><h2>Article 10 : Dispositions Générales</h2><p>10.1 Toute modification de ce contrat doit être faite par écrit et signée par les deux parties.<br/>10.2 Le présent contrat est régi par les lois de {{pays}}.</p><p class="signatures">Fait à {{lieu}}, le {{date_jour}}<br/>En deux exemplaires originaux.<br/><br/>Pour le Maître d'Ouvrage, — Pour l'Entrepreneur,</p></div>`,
    countriesJson: C_MARCHES,
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
  console.log('Seed Drive2 BTP (Agent Drive2-3/10) terminé.');
  console.log(`   Templates du script : ${templates.length} (créés : ${created}, mis à jour : ${updated})`);
  console.log(`   Catégorie : btp_construction`);
  console.log(`   Total de templates en base : ${total}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
