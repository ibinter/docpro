// Seed Drive BTP — Agent Drive-1/5 : 10 modèles BTP / SOUS-TRAITANCE convertis
// depuis le Google Drive IBIG (dossier SOUS-TRAITANCE + CONTRATS DE CONSTRUCTION).
// Script ADDITIF : upsert par code — n'écrase pas les templates existants.
// Exécution : npx tsx prisma/seed-drive-btp.ts
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

// Note pays commune aux contrats de sous-traitance (source : modèles IBIG zone CFA).
const C_SOUS_TRAITANCE = JSON.stringify({
  OHADA: { note: 'Conforme aux usages OHADA/zone CFA — montants en FCFA.' },
  FR: { note: 'Adapter aux exigences de la loi n°75-1334 relative à la sous-traitance.' },
});
const C_CONSTRUCTION = JSON.stringify({
  OHADA: { note: 'Conforme aux usages OHADA/zone CFA — montants en FCFA.' },
  FR: { note: 'Adapter aux exigences du Code de la construction et de l’habitation (garanties décennale et de parfait achèvement).' },
});

const templates: CatalogTemplate[] = [
  // ── 1. Contrat de sous-traitance BTP (général) ─────────────────────────────
  {
    code: 'btp_sous_traitance_general', name: 'Contrat de sous-traitance BTP', category: 'btp_construction',
    price: 3500, priceMax: 5500, popularity: 70,
    description: 'Le contrat de sous-traitance BTP complet : travaux, prix, assurances, confidentialité et résiliation en 8 articles.',
    fieldsJson: F([
      { key: 'entreprise_principale', label: 'Identification complète de l’Entreprise Principale (nom, forme juridique, RCCM, siège, représentant et fonction)', type: 'textarea', required: true },
      { key: 'sous_traitant', label: 'Identification complète du Sous-Traitant (nom, forme juridique, RCCM, siège, représentant et fonction)', type: 'textarea', required: true },
      { key: 'travaux', label: 'Description des travaux sous-traités', type: 'textarea', required: true },
      { key: 'date_fin', label: 'Date d’achèvement prévue des travaux', type: 'date', required: true },
      { key: 'montant', label: 'Montant total des travaux HT (FCFA)', type: 'text', required: true },
      { key: 'modalites_paiement', label: 'Modalités de paiement (échelonnement, pourcentages…)', type: 'textarea', required: true },
      { key: 'lieu', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE SOUS-TRAITANCE BTP</h1><p><strong>ENTRE :</strong></p><p>{{entreprise_principale}}, dûment habilitée aux fins des présentes,<br/>ci-après désignée « l'Entreprise Principale »,</p><p><strong>ET :</strong></p><p>{{sous_traitant}}, dûment habilité(e) aux fins des présentes,<br/>ci-après désigné « le Sous-Traitant »,</p><p>(ci-après individuellement désignée « la Partie » et collectivement « les Parties »).</p><h2>Article 1. Objet</h2><p>Le présent contrat a pour objet de définir les conditions dans lesquelles le Sous-Traitant s'engage à réaliser pour le compte de l'Entreprise Principale les travaux de {{travaux}}, conformément aux plans, spécifications et délais définis en annexe du présent contrat (l'Annexe A).</p><h2>Article 2. Durée</h2><p>Le présent contrat prend effet à la date de sa signature par les deux parties et restera en vigueur jusqu'à l'achèvement complet des travaux de sous-traitance, prévu le {{date_fin}}, sauf prolongation dûment signée par les deux parties.</p><h2>Article 3. Conditions de réalisation des travaux</h2><p>3.1 Le Sous-Traitant s'engage à réaliser les travaux avec le plus grand soin, conformément aux règles de l'art et dans le respect des normes et réglementations en vigueur.</p><p>3.2 L'Entreprise Principale s'engage à fournir au Sous-Traitant tous les éléments nécessaires à la réalisation des travaux dans les délais convenus.</p><h2>Article 4. Prix et modalités de paiement</h2><p>4.1 Le montant total des travaux de sous-traitance est fixé à {{montant}} FCFA HT, tel que détaillé dans l'Annexe B.</p><p>4.2 Les paiements seront effectués selon les modalités suivantes : {{modalites_paiement}}.</p><h2>Article 5. Assurance et responsabilité</h2><p>5.1 Chaque partie s'engage à souscrire et à maintenir en vigueur pendant toute la durée du contrat les assurances nécessaires couvrant sa responsabilité civile.</p><p>5.2 En cas de dommage résultant d'une faute ou négligence du Sous-Traitant, ce dernier sera tenu pour responsable et devra indemniser l'Entreprise Principale, exprimé en montant de FCFA conformément aux conditions définies.</p><h2>Article 6. Confidentialité</h2><p>Les parties s'engagent à garder confidentielles toutes les informations et documents échangés dans le cadre de l'exécution du présent contrat.</p><h2>Article 7. Résiliation</h2><p>Le présent contrat pourra être résilié de plein droit par l'une ou l'autre des parties en cas de manquement grave de l'autre partie à ses obligations.</p><h2>Article 8. Litiges</h2><p>Tout litige relatif à l'interprétation ou à l'exécution du présent contrat sera soumis à la juridiction compétente du lieu du siège social de l'Entreprise Principale, avec une considération spéciale pour les lois et régulations en vigueur dans la zone CFA.</p><p class="signatures">Fait à {{lieu}}, le {{date_jour}}.<br/><br/>Pour l'Entreprise Principale, — Pour le Sous-Traitant,</p></div>`,
    countriesJson: C_SOUS_TRAITANCE,
  },

  // ── 2. Contrat de sous-traitance à prix forfaitaire ────────────────────────
  {
    code: 'btp_sous_traitance_forfait', name: 'Contrat de sous-traitance à prix forfaitaire', category: 'btp_construction',
    price: 3000, priceMax: 5000, popularity: 62,
    description: 'Sécurisez votre budget chantier avec un prix global, ferme et définitif convenu à l’avance avec votre sous-traitant.',
    fieldsJson: F([
      { key: 'entreprise_principale', label: 'Identification complète de l’Entreprise Principale (nom, siège social, représentant légal et fonction)', type: 'textarea', required: true },
      { key: 'sous_traitant', label: 'Identification complète du Sous-traitant (nom, siège social, représentant légal et fonction)', type: 'textarea', required: true },
      { key: 'type_projet', label: 'Type de projet de construction (ex. immeuble R+3, villa duplex…)', type: 'text', required: true },
      { key: 'lieu_projet', label: 'Emplacement du projet', type: 'text', required: true },
      { key: 'travaux', label: 'Description détaillée des travaux confiés au Sous-traitant', type: 'textarea', required: true },
      { key: 'montant_forfait', label: 'Prix forfaitaire HT en chiffres et en lettres (FCFA)', type: 'text', required: true },
      { key: 'modalites_paiement', label: 'Modalités de paiement (ex. deux versements égaux, à la signature puis à la fin des travaux)', type: 'text', required: true },
      { key: 'lieu', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE SOUS-TRAITANCE À PRIX FORFAITAIRE</h1><p><strong>Entre les soussignés :</strong></p><p>{{entreprise_principale}}, dûment habilité(e) aux fins des présentes, ci-après dénommée « l'Entreprise Principale »,</p><p>D'une part,</p><p><strong>Et</strong></p><p>{{sous_traitant}}, dûment habilité(e) aux fins des présentes, ci-après dénommé « le Sous-traitant »,</p><p>D'autre part,</p><p>Il a été convenu et arrêté ce qui suit :</p><h2>Article 1 : Objet du contrat</h2><p>Le présent contrat a pour objet de définir les conditions dans lesquelles l'Entreprise Principale confie au Sous-traitant, qui accepte, la réalisation de certaines tâches spécifiques dans le cadre d'un projet de construction {{type_projet}} situé à {{lieu_projet}}, ci-après dénommé « le Projet ».</p><h2>Article 2 : Description des travaux</h2><p>Le Sous-traitant s'engage à effectuer les travaux suivants : {{travaux}}.</p><h2>Article 3 : Prix et modalités de paiement</h2><p>Les parties conviennent que le prix convenu pour les travaux décrits à l'article 2 du présent contrat est un prix forfaitaire de {{montant_forfait}} (FCFA), hors taxes.</p><p>Le paiement du prix convenu sera effectué en {{modalites_paiement}} après la réception des travaux réalisés par l'Entreprise Principale et leur validation.</p><h2>Article 4 : Responsabilités</h2><p>Le Sous-traitant est seul responsable de la réalisation des travaux qui lui sont confiés dans le cadre du présent contrat. Il s'engage à respecter toutes les normes de qualité et de sécurité applicables et à exécuter les travaux dans les délais convenus.</p><p>L'Entreprise Principale se réserve le droit de vérifier à tout moment l'avancement des travaux réalisés par le Sous-traitant et de demander des modifications si nécessaire.</p><h2>Article 5 : Durée du contrat</h2><p>Le présent contrat prend effet à compter de sa signature par les deux parties et demeure en vigueur jusqu'à la réalisation complète des travaux confiés au Sous-traitant.</p><h2>Article 6 : Résiliation</h2><p>En cas de manquement grave de l'une des parties à ses obligations au titre du présent contrat, l'autre partie se réserve le droit de le résilier de plein droit, sans préavis, par lettre recommandée avec accusé de réception.</p><h2>Article 7 : Litiges</h2><p>En cas de litige découlant du présent contrat, les parties s'engagent à chercher une solution amiable. À défaut de parvenir à un accord, le litige sera soumis à la compétence exclusive des tribunaux compétents du lieu où est situé le Projet.</p><h2>Article 8 : Loi applicable</h2><p>Le présent contrat est régi par la loi en vigueur dans le pays où est situé le Projet.</p><p class="signatures">Fait en deux exemplaires, à {{lieu}}, le {{date_jour}}.<br/><br/>Pour l'Entreprise Principale — Pour le Sous-traitant</p></div>`,
    countriesJson: C_SOUS_TRAITANCE,
  },

  // ── 3. Contrat de sous-traitance en régie ──────────────────────────────────
  {
    code: 'btp_sous_traitance_regie', name: 'Contrat de sous-traitance en régie', category: 'btp_construction',
    price: 3000, priceMax: 5000, popularity: 48,
    description: 'Rémunérez votre sous-traitant au temps passé et aux ressources réellement utilisées, avec facturation mensuelle encadrée.',
    fieldsJson: F([
      { key: 'entreprise_principale', label: 'Identification complète de l’Entreprise Principale (nom, siège social, représentant légal et fonction)', type: 'textarea', required: true },
      { key: 'sous_traitant', label: 'Identification complète du Sous-traitant (nom, siège social, représentant légal et fonction)', type: 'textarea', required: true },
      { key: 'type_projet', label: 'Type de projet de construction', type: 'text', required: true },
      { key: 'lieu_projet', label: 'Emplacement du projet', type: 'text', required: true },
      { key: 'travaux', label: 'Description détaillée des travaux confiés au Sous-traitant', type: 'textarea', required: true },
      { key: 'tarifs_horaires', label: 'Tarifs horaires et ressources facturables (détail par qualification)', type: 'textarea', required: true },
      { key: 'lieu', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE SOUS-TRAITANCE EN RÉGIE</h1><p><strong>Entre les soussignés :</strong></p><p>{{entreprise_principale}}, dûment habilité(e) aux fins des présentes, ci-après dénommée « l'Entreprise Principale »,</p><p>D'une part,</p><p><strong>Et</strong></p><p>{{sous_traitant}}, dûment habilité(e) aux fins des présentes, ci-après dénommé « le Sous-traitant »,</p><p>D'autre part,</p><p>Il a été convenu et arrêté ce qui suit :</p><h2>Article 1 : Objet du contrat</h2><p>Le présent contrat a pour objet de définir les conditions dans lesquelles l'Entreprise Principale confie au Sous-traitant, qui accepte, la réalisation de certaines tâches spécifiques dans le cadre d'un projet de construction {{type_projet}} situé à {{lieu_projet}}, ci-après dénommé « le Projet ».</p><h2>Article 2 : Description des travaux</h2><p>Le Sous-traitant s'engage à effectuer les travaux suivants : {{travaux}}. Ces travaux seront réalisés en régie, c'est-à-dire que le Sous-traitant sera rémunéré en fonction du temps passé et des ressources utilisées, conformément aux tarifs horaires et aux conditions définis dans le présent contrat.</p><h2>Article 3 : Conditions financières</h2><p>Les parties conviennent que le Sous-traitant sera rémunéré en fonction du temps passé et des ressources utilisées pour la réalisation des travaux. Les tarifs horaires applicables sont les suivants : {{tarifs_horaires}}. Les frais annexes engagés par le Sous-traitant dans le cadre de l'exécution des travaux seront remboursés par l'Entreprise Principale sur présentation de justificatifs.</p><p>Le paiement des prestations réalisées par le Sous-traitant sera effectué mensuellement, sur la base des heures travaillées et des ressources utilisées, conformément aux tarifs horaires convenus.</p><h2>Article 4 : Responsabilités</h2><p>Le Sous-traitant est seul responsable de la réalisation des travaux qui lui sont confiés dans le cadre du présent contrat. Il s'engage à mettre en œuvre tous les moyens nécessaires pour mener à bien sa mission dans le respect des délais convenus et des normes de qualité exigées par l'Entreprise Principale.</p><p>L'Entreprise Principale se réserve le droit de vérifier à tout moment l'avancement des travaux réalisés par le Sous-traitant et de demander des ajustements si nécessaire.</p><h2>Article 5 : Durée du contrat</h2><p>Le présent contrat prend effet à compter de sa signature par les deux parties et demeure en vigueur jusqu'à la réalisation complète des travaux confiés au Sous-traitant, sauf résiliation anticipée dans les conditions prévues à l'article 6 du présent contrat.</p><h2>Article 6 : Résiliation</h2><p>En cas de manquement grave de l'une des parties à ses obligations au titre du présent contrat, l'autre partie se réserve le droit de le résilier de plein droit, sans préavis, par lettre recommandée avec accusé de réception.</p><h2>Article 7 : Litiges</h2><p>En cas de litige découlant du présent contrat, les parties s'engagent à chercher une solution amiable. À défaut de parvenir à un accord, le litige sera soumis à la compétence exclusive des tribunaux compétents du lieu où est situé le Projet.</p><h2>Article 8 : Loi applicable</h2><p>Le présent contrat est régi par la loi en vigueur dans le pays où est situé le Projet.</p><p class="signatures">Fait en deux exemplaires, à {{lieu}}, le {{date_jour}}.<br/><br/>Pour l'Entreprise Principale — Pour le Sous-traitant</p></div>`,
    countriesJson: C_SOUS_TRAITANCE,
  },

  // ── 4. Contrat de sous-traitance avec garantie de paiement ─────────────────
  {
    code: 'btp_sous_traitance_garantie_paiement', name: 'Contrat de sous-traitance avec garantie de paiement', category: 'btp_construction',
    price: 3500, priceMax: 5500, popularity: 40,
    description: 'Protégez votre sous-traitant avec une caution bancaire ou garantie à première demande couvrant le paiement des travaux.',
    fieldsJson: F([
      { key: 'maitre_oeuvre', label: 'Identification complète du Maître d’Œuvre (nom, adresse, représentant et fonction)', type: 'textarea', required: true },
      { key: 'sous_traitant', label: 'Identification complète du Sous-Traitant (nom, adresse, représentant et fonction)', type: 'textarea', required: true },
      { key: 'projet', label: 'Description brève du projet et son emplacement', type: 'textarea', required: true },
      { key: 'type_garantie', label: 'Type de garantie de paiement (ex. caution bancaire, garantie à première demande…)', type: 'text', required: true },
      { key: 'pourcentage_garantie', label: 'Pourcentage du montant total couvert par la garantie (%)', type: 'text', required: true },
      { key: 'montant', label: 'Montant total des travaux (FCFA)', type: 'text', required: true },
      { key: 'preavis', label: 'Délai de préavis de résiliation (en jours)', type: 'text', required: true },
      { key: 'juridiction', label: 'Juridiction compétente en cas de litige (ville)', type: 'text', required: true },
      { key: 'lieu', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE SOUS-TRAITANCE AVEC GARANTIE DE PAIEMENT</h1><p><strong>ENTRE :</strong></p><p>{{maitre_oeuvre}}<br/>(ci-après désigné « le Maître d'Œuvre »)</p><p><strong>ET :</strong></p><p>{{sous_traitant}}<br/>(ci-après désigné « le Sous-Traitant »)</p><h2>Préambule</h2><p>Le Maître d'Œuvre est engagé dans la réalisation de {{projet}}. Dans ce contexte, il souhaite confier à un Sous-Traitant certains travaux spécifiques.</p><p>Le Sous-Traitant dispose de l'expertise nécessaire pour réaliser ces travaux et accepte de les prendre en charge, sous réserve des conditions énoncées ci-après.</p><p>Il est convenu ce qui suit :</p><h2>Article 1 : Objet du Contrat</h2><p>Le présent contrat a pour objet de définir les termes et conditions selon lesquels le Sous-Traitant réalisera pour le compte du Maître d'Œuvre les travaux détaillés en annexe, selon les spécifications, plans et délais convenus.</p><h2>Article 2 : Durée</h2><p>Ce contrat prend effet à la date de signature et reste valide jusqu'à la complète réalisation des travaux, sauf prolongation écrite entre les parties.</p><h2>Article 3 : Garantie de Paiement</h2><p>3.1 Afin de garantir le paiement des travaux réalisés par le Sous-Traitant, le Maître d'Œuvre s'engage à mettre en place une garantie de paiement sous forme de {{type_garantie}}, d'un montant équivalent à {{pourcentage_garantie}} % du montant total du contrat.</p><p>3.2 Cette garantie sera mise en place avant le début des travaux et restera effective jusqu'à la complète rémunération du Sous-Traitant.</p><h2>Article 4 : Modalités de Paiement</h2><p>Le montant total des travaux s'élève à {{montant}} FCFA. Les modalités de paiement sont détaillées en annexe.</p><h2>Article 5 : Conditions de Réalisation des Travaux</h2><p>Le Sous-Traitant s'engage à réaliser les travaux conformément aux règles de l'art, aux normes en vigueur et selon les spécifications du Maître d'Œuvre.</p><h2>Article 6 : Assurance</h2><p>Les deux parties s'engagent à maintenir en vigueur une assurance couvrant leur responsabilité civile respective durant toute la durée du contrat.</p><h2>Article 7 : Confidentialité</h2><p>Les informations échangées dans le cadre de ce contrat sont confidentielles et ne doivent pas être divulguées sans accord préalable écrit.</p><h2>Article 8 : Résiliation</h2><p>En cas de manquement grave à l'une des obligations du présent contrat, celui-ci pourra être résilié par la partie lésée, sous réserve d'un préavis écrit de {{preavis}} jours.</p><h2>Article 9 : Litiges</h2><p>Tout différend découlant de l'interprétation ou de l'exécution du présent contrat sera, dans la mesure du possible, réglé à l'amiable. À défaut, il sera soumis aux juridictions compétentes de {{juridiction}}.</p><p class="signatures">Fait en deux exemplaires originaux à {{lieu}}, le {{date_jour}}.<br/><br/>Pour le Maître d'Œuvre, — Pour le Sous-Traitant,</p></div>`,
    countriesJson: C_SOUS_TRAITANCE,
  },

  // ── 5. Contrat de partenariat / co-traitance BTP ───────────────────────────
  {
    code: 'btp_co_traitance', name: 'Contrat de partenariat / co-traitance BTP', category: 'btp_construction',
    price: 4000, priceMax: 6000, popularity: 45,
    description: 'Groupez-vous à deux entreprises pour remporter et réaliser un chantier : répartition des tâches, des coûts et arbitrage.',
    fieldsJson: F([
      { key: 'cotraitant_a', label: 'Identification complète du Co-traitant A (nom, forme juridique, RCCM, siège, représentant et fonction)', type: 'textarea', required: true },
      { key: 'cotraitant_b', label: 'Identification complète du Co-traitant B (nom, forme juridique, RCCM, siège, représentant et fonction)', type: 'textarea', required: true },
      { key: 'nom_projet', label: 'Nom du projet', type: 'text', required: true },
      { key: 'lieu_projet', label: 'Emplacement du projet', type: 'text', required: true },
      { key: 'description_projet', label: 'Description détaillée du projet et répartition des tâches entre les co-traitants', type: 'textarea', required: true },
      { key: 'date_reception', label: 'Date prévue de réception définitive des travaux', type: 'date', required: true },
      { key: 'budget', label: 'Budget total estimé du projet (FCFA)', type: 'text', required: true },
      { key: 'repartition_financiere', label: 'Répartition des contributions financières et modalités de facturation entre les Parties', type: 'textarea', required: true },
      { key: 'lieu', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE PARTENARIAT / CO-TRAITANCE BTP</h1><p><strong>ENTRE :</strong></p><p>{{cotraitant_a}}, ci-après désignée « le Co-traitant A »,</p><p><strong>ET :</strong></p><p>{{cotraitant_b}}, ci-après désignée « le Co-traitant B »,</p><p>(ci-après individuellement désignée la « Partie » et collectivement les « Parties »).</p><h2>Article 1. Objet</h2><p>Le présent contrat a pour objet de définir les termes et conditions sous lesquels les Parties conviennent de collaborer en tant que co-traitants pour la réalisation du projet {{nom_projet}}, situé à {{lieu_projet}} (ci-après le « Projet »).</p><h2>Article 2. Durée</h2><p>La durée du présent contrat est fixée à compter de la date de sa signature jusqu'à la réception définitive des travaux du Projet, prévue le {{date_reception}}, sauf prolongation convenue par écrit entre les Parties.</p><h2>Article 3. Description du Projet et des Tâches</h2><p>3.1 Le Projet et la répartition des tâches, responsabilités et livrables de chaque Co-traitant sont définis comme suit : {{description_projet}}</p><h2>Article 4. Conditions financières</h2><p>4.1 Le budget total estimé pour la réalisation du Projet est de {{budget}} FCFA.</p><p>4.2 Les contributions financières de chaque Co-traitant, les modalités de facturation et de paiement entre les Parties sont réparties comme suit : {{repartition_financiere}}</p><h2>Article 5. Assurance et Responsabilité</h2><p>Chaque Co-traitant s'engage à souscrire et à maintenir en vigueur pendant toute la durée du Projet une assurance couvrant sa responsabilité civile professionnelle pour les dommages pouvant survenir dans le cadre de l'exécution du Projet.</p><h2>Article 6. Confidentialité</h2><p>Les Parties s'engagent à maintenir confidentielles toutes les informations non publiques échangées ou générées durant l'exécution du contrat.</p><h2>Article 7. Résolution des conflits</h2><p>Tout différend découlant de l'interprétation ou de l'exécution du présent contrat sera, dans un premier temps, réglé à l'amiable entre les Parties. À défaut, le différend sera soumis à l'arbitrage selon les règles de l'institution d'arbitrage compétente du lieu du Projet (ex. CCJA/OHADA).</p><h2>Article 8. Dispositions générales</h2><p>Ce contrat contient l'intégralité des accords entre les Parties concernant l'objet de celui-ci et remplace tous les accords précédents, qu'ils soient écrits ou oraux.</p><p class="signatures">Fait à {{lieu}}, le {{date_jour}}.<br/><br/>Pour le Co-traitant A : — Pour le Co-traitant B :</p></div>`,
    countriesJson: C_SOUS_TRAITANCE,
  },

  // ── 6. Contrat de sous-traitance avec clause de confidentialité ────────────
  {
    code: 'btp_sous_traitance_confidentialite', name: 'Contrat de sous-traitance avec clause de confidentialité', category: 'btp_construction',
    price: 3000, priceMax: 5000, popularity: 38,
    description: 'Confiez vos travaux sans risque de fuite : plans, méthodes et secrets commerciaux protégés pendant et après le contrat.',
    fieldsJson: F([
      { key: 'entreprise_principale', label: 'Identification complète de l’Entreprise Principale (nom, siège social, représentant légal et fonction)', type: 'textarea', required: true },
      { key: 'sous_traitant', label: 'Identification complète du Sous-traitant (nom, siège social, représentant légal et fonction)', type: 'textarea', required: true },
      { key: 'type_projet', label: 'Type de projet de construction', type: 'text', required: true },
      { key: 'lieu_projet', label: 'Emplacement du projet', type: 'text', required: true },
      { key: 'travaux', label: 'Description détaillée des travaux confiés au Sous-traitant', type: 'textarea', required: true },
      { key: 'montant_forfait', label: 'Prix forfaitaire HT en chiffres et en lettres (FCFA)', type: 'text', required: true },
      { key: 'modalites_paiement', label: 'Modalités de paiement', type: 'text', required: true },
      { key: 'lieu', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE SOUS-TRAITANCE AVEC CLAUSE DE CONFIDENTIALITÉ</h1><p><strong>Entre les soussignés :</strong></p><p>{{entreprise_principale}}, dûment habilité(e) aux fins des présentes, ci-après dénommée « l'Entreprise Principale »,</p><p>D'une part,</p><p><strong>Et</strong></p><p>{{sous_traitant}}, dûment habilité(e) aux fins des présentes, ci-après dénommé « le Sous-traitant »,</p><p>D'autre part,</p><p>Il a été convenu et arrêté ce qui suit :</p><h2>Article 1 : Objet du contrat</h2><p>Le présent contrat a pour objet de définir les conditions dans lesquelles l'Entreprise Principale confie au Sous-traitant, qui accepte, la réalisation de certaines tâches spécifiques dans le cadre d'un projet de construction {{type_projet}} situé à {{lieu_projet}}, ci-après dénommé « le Projet ».</p><h2>Article 2 : Description des travaux</h2><p>Le Sous-traitant s'engage à effectuer les travaux suivants : {{travaux}}.</p><h2>Article 3 : Confidentialité</h2><p>Le Sous-traitant s'engage à ne divulguer à aucun tiers, pendant la durée du présent contrat et après son expiration, toutes les informations confidentielles auxquelles il pourrait avoir accès dans le cadre de l'exécution des travaux. Les informations confidentielles comprennent, mais sans s'y limiter, les données techniques, les plans, les dessins, les spécifications, les méthodes de travail, les secrets commerciaux, et toute autre information considérée comme confidentielle par l'Entreprise Principale.</p><p>Le Sous-traitant s'engage à prendre toutes les mesures nécessaires pour assurer la confidentialité de ces informations et à ne les utiliser que dans le cadre de l'exécution des travaux.</p><h2>Article 4 : Prix et modalités de paiement</h2><p>Les parties conviennent que le prix convenu pour les travaux décrits à l'article 2 du présent contrat est un prix forfaitaire de {{montant_forfait}} (FCFA), hors taxes.</p><p>Le paiement du prix convenu sera effectué en {{modalites_paiement}} après la réception des travaux réalisés par l'Entreprise Principale et leur validation.</p><h2>Article 5 : Responsabilités</h2><p>Le Sous-traitant est seul responsable de la réalisation des travaux qui lui sont confiés dans le cadre du présent contrat. Il s'engage à respecter toutes les normes de qualité et de sécurité applicables et à exécuter les travaux dans les délais convenus.</p><p>L'Entreprise Principale se réserve le droit de vérifier à tout moment l'avancement des travaux réalisés par le Sous-traitant et de demander des modifications si nécessaire.</p><h2>Article 6 : Durée du contrat</h2><p>Le présent contrat prend effet à compter de sa signature par les deux parties et demeure en vigueur jusqu'à la réalisation complète des travaux confiés au Sous-traitant.</p><h2>Article 7 : Résiliation</h2><p>En cas de manquement grave de l'une des parties à ses obligations au titre du présent contrat, l'autre partie se réserve le droit de le résilier de plein droit, sans préavis, par lettre recommandée avec accusé de réception.</p><h2>Article 8 : Litiges</h2><p>En cas de litige découlant du présent contrat, les parties s'engagent à chercher une solution amiable. À défaut de parvenir à un accord, le litige sera soumis à la compétence exclusive des tribunaux compétents du lieu où est situé le Projet.</p><h2>Article 9 : Loi applicable</h2><p>Le présent contrat est régi par la loi en vigueur dans le pays où est situé le Projet.</p><p class="signatures">Fait en deux exemplaires, à {{lieu}}, le {{date_jour}}.<br/><br/>Pour l'Entreprise Principale — Pour le Sous-traitant</p></div>`,
    countriesJson: C_SOUS_TRAITANCE,
  },

  // ── 7. Annexe technique au contrat de sous-traitance ───────────────────────
  {
    code: 'btp_annexe_technique', name: 'Annexe technique au contrat de sous-traitance', category: 'btp_construction',
    price: 2000, priceMax: 4000, popularity: 30,
    description: 'Complétez votre contrat de sous-traitance avec le détail des tâches et des engagements environnementaux du chantier.',
    fieldsJson: F([
      { key: 'entreprise_principale', label: 'Identification complète de l’Entreprise Principale (nom, siège social, représentant légal et fonction)', type: 'textarea', required: true },
      { key: 'sous_traitant', label: 'Identification complète du Sous-traitant (nom, siège social, représentant légal et fonction)', type: 'textarea', required: true },
      { key: 'date_contrat', label: 'Date de signature du contrat de sous-traitance initial', type: 'date', required: true },
      { key: 'projet', label: 'Projet concerné', type: 'text', required: true },
      { key: 'taches', label: 'Description détaillée des tâches (une par ligne)', type: 'textarea', required: true },
      { key: 'lieu', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>ANNEXE TECHNIQUE AU CONTRAT DE SOUS-TRAITANCE</h1><p><strong>Entre les soussignés :</strong></p><p>{{entreprise_principale}}, dûment habilité(e) aux fins des présentes, ci-après dénommée « l'Entreprise Principale »,</p><p>D'une part,</p><p><strong>Et</strong></p><p>{{sous_traitant}}, dûment habilité(e) aux fins des présentes, ci-après dénommé « le Sous-traitant »,</p><p>D'autre part,</p><p>Il a été convenu d'ajouter les précisions techniques suivantes au contrat de sous-traitance signé entre les parties le {{date_contrat}}.</p><h2>Article 1 : Description détaillée des travaux</h2><p>Le Sous-traitant s'engage à réaliser les tâches suivantes dans le cadre du projet de {{projet}} :</p><p>{{taches}}</p><h2>Article 2 : Normes environnementales et écologiques</h2><p>Les travaux réalisés par le Sous-traitant devront être conformes aux normes environnementales en vigueur. Le Sous-traitant s'engage à adopter des pratiques respectueuses de l'environnement, notamment en utilisant des matériaux écologiques, en limitant les émissions de gaz à effet de serre, en réduisant les déchets produits et en favorisant le recyclage et la réutilisation des matériaux.</p><h2>Article 3 : Utilisation de sources d'énergie renouvelable</h2><p>Dans la mesure du possible, le Sous-traitant s'engage à privilégier l'utilisation de sources d'énergie renouvelable pour la réalisation des travaux.</p><h2>Article 4 : Gestion des déchets</h2><p>Le Sous-traitant est tenu de mettre en place un plan de gestion des déchets conforme à la réglementation en vigueur. Il veillera à trier et à éliminer les déchets de manière responsable, en favorisant le recyclage et en minimisant l'impact environnemental.</p><h2>Article 5 : Mesures de protection de la biodiversité</h2><p>Le Sous-traitant prendra toutes les mesures nécessaires pour préserver la biodiversité lors de l'exécution des travaux. Il veillera notamment à protéger les espèces végétales et animales présentes sur le site et à limiter les perturbations de leur habitat naturel.</p><h2>Article 6 : Suivi environnemental</h2><p>Le Sous-traitant s'engage à fournir régulièrement des rapports de suivi environnemental à l'Entreprise Principale, détaillant les mesures mises en place pour limiter l'impact environnemental des travaux.</p><h2>Article 7 : Pénalités en cas de non-respect des normes environnementales</h2><p>En cas de non-respect des normes environnementales énoncées dans le présent document, le Sous-traitant sera passible de pénalités financières conformément aux dispositions du contrat de sous-traitance initial.</p><p class="signatures">Fait en deux exemplaires, à {{lieu}}, le {{date_jour}}.<br/><br/>Pour l'Entreprise Principale — Pour le Sous-traitant</p></div>`,
    countriesJson: C_SOUS_TRAITANCE,
  },

  // ── 8. Contrat de sous-traitance en corps d'état séparé ────────────────────
  {
    code: 'btp_sous_traitance_corps_etat', name: 'Contrat de sous-traitance en corps d’état séparé', category: 'btp_construction',
    price: 3000, priceMax: 5000, popularity: 33,
    description: 'Sous-traitez un lot précis (plomberie, électricité, peinture…) payé au prix unitaire selon le volume réel exécuté.',
    fieldsJson: F([
      { key: 'entreprise_principale', label: 'Identification complète de l’Entreprise Principale (nom, siège social, représentant légal et fonction)', type: 'textarea', required: true },
      { key: 'sous_traitant', label: 'Identification complète du Sous-traitant (nom, siège social, représentant légal et fonction)', type: 'textarea', required: true },
      { key: 'type_projet', label: 'Type de projet de construction', type: 'text', required: true },
      { key: 'lieu_projet', label: 'Emplacement du projet', type: 'text', required: true },
      { key: 'travaux', label: 'Corps d’état concerné et description détaillée des travaux (ex. lot électricité : câblage, tableaux…)', type: 'textarea', required: true },
      { key: 'prix_unitaire', label: 'Prix unitaire HT en chiffres et en lettres, par unité de mesure (FCFA)', type: 'text', required: true },
      { key: 'lieu', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE SOUS-TRAITANCE EN CORPS D'ÉTAT SÉPARÉ</h1><p><strong>Entre les soussignés :</strong></p><p>{{entreprise_principale}}, dûment habilité(e) aux fins des présentes, ci-après dénommée « l'Entreprise Principale »,</p><p>D'une part,</p><p><strong>Et</strong></p><p>{{sous_traitant}}, dûment habilité(e) aux fins des présentes, ci-après dénommé « le Sous-traitant »,</p><p>D'autre part,</p><p>Il a été convenu et arrêté ce qui suit :</p><h2>Article 1 : Objet du contrat</h2><p>Le présent contrat a pour objet de définir les conditions dans lesquelles l'Entreprise Principale confie au Sous-traitant, qui accepte, la réalisation de travaux spécifiques relevant d'un corps d'état séparé dans le cadre d'un projet de construction {{type_projet}} situé à {{lieu_projet}}, ci-après dénommé « le Projet ».</p><h2>Article 2 : Description des travaux</h2><p>Le Sous-traitant s'engage à effectuer les travaux suivants : {{travaux}}.</p><h2>Article 3 : Responsabilités</h2><p>3.1. Le Sous-traitant est seul responsable de la réalisation des travaux qui lui sont confiés dans le cadre du présent contrat. Il s'engage à respecter toutes les normes de qualité et de sécurité applicables et à exécuter les travaux dans les délais convenus.</p><p>3.2. L'Entreprise Principale se réserve le droit de vérifier à tout moment l'avancement des travaux réalisés par le Sous-traitant et de demander des modifications si nécessaire.</p><h2>Article 4 : Prix et modalités de paiement</h2><p>Les parties conviennent que le prix convenu pour les travaux décrits à l'article 2 du présent contrat est un prix unitaire de {{prix_unitaire}} (FCFA) par unité de mesure, hors taxes.</p><p>Le paiement du prix convenu sera effectué en fonction du volume réel des travaux réalisés par le Sous-traitant, conformément aux termes et conditions définis dans le contrat.</p><h2>Article 5 : Durée du contrat</h2><p>Le présent contrat prend effet à compter de sa signature par les deux parties et demeure en vigueur jusqu'à la réalisation complète des travaux confiés au Sous-traitant.</p><h2>Article 6 : Résiliation</h2><p>En cas de manquement grave de l'une des parties à ses obligations au titre du présent contrat, l'autre partie se réserve le droit de le résilier de plein droit, sans préavis, par lettre recommandée avec accusé de réception.</p><h2>Article 7 : Litiges</h2><p>En cas de litige découlant du présent contrat, les parties s'engagent à chercher une solution amiable. À défaut de parvenir à un accord, le litige sera soumis à la compétence exclusive des tribunaux compétents du lieu où est situé le Projet.</p><h2>Article 8 : Loi applicable</h2><p>Le présent contrat est régi par la loi en vigueur dans le pays où est situé le Projet.</p><p class="signatures">Fait en deux exemplaires, à {{lieu}}, le {{date_jour}}.<br/><br/>Pour l'Entreprise Principale — Pour le Sous-traitant</p></div>`,
    countriesJson: C_SOUS_TRAITANCE,
  },

  // ── 9. Contrat de construction résidentielle ───────────────────────────────
  {
    code: 'btp_construction_residentielle', name: 'Contrat de construction résidentielle', category: 'btp_construction',
    price: 5000, priceMax: 7000, popularity: 65,
    description: 'Faites construire votre maison en toute sécurité : plans, délais, pénalités de retard, réception et garanties en 10 articles.',
    fieldsJson: F([
      { key: 'maitre_ouvrage', label: 'Identification complète du Maître d’Ouvrage (nom, adresse, contacts)', type: 'textarea', required: true },
      { key: 'entrepreneur', label: 'Identification complète de l’Entrepreneur (nom, adresse, contacts)', type: 'textarea', required: true },
      { key: 'site', label: 'Adresse précise du site de construction', type: 'text', required: true },
      { key: 'montant', label: 'Coût total des travaux (FCFA)', type: 'text', required: true },
      { key: 'modalites_paiement', label: 'Modalités de paiement (avance, paiements échelonnés, paiement final)', type: 'textarea', required: true },
      { key: 'date_debut', label: 'Date de début des travaux', type: 'date', required: true },
      { key: 'date_fin', label: 'Date d’achèvement prévue', type: 'date', required: true },
      { key: 'penalites', label: 'Pénalités de retard (montant ou taux par jour de retard)', type: 'text', required: true },
      { key: 'lieu', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE CONSTRUCTION RÉSIDENTIELLE</h1><p><strong>ENTRE</strong><br/>{{maitre_ouvrage}}<br/>(« le Maître d'Ouvrage »)</p><p><strong>ET</strong><br/>{{entrepreneur}}<br/>(« l'Entrepreneur »)</p><h2>Préambule</h2><p>Le Maître d'Ouvrage désire faire construire une résidence située à {{site}} (le « Site ») et a choisi l'Entrepreneur pour réaliser ces travaux. Les parties souhaitent fixer leurs engagements respectifs par le présent contrat.</p><h2>Article 1 : Objet du Contrat</h2><p>Ce contrat a pour objet de définir les conditions selon lesquelles l'Entrepreneur s'engage à réaliser la construction de la résidence selon les plans, les spécifications techniques et le calendrier convenus, et le Maître d'Ouvrage s'engage à rémunérer ces services.</p><h2>Article 2 : Plans et Spécifications</h2><p>2.1 Les plans et spécifications de la construction sont annexés au présent contrat.<br/>2.2 L'Entrepreneur s'engage à respecter strictement les plans et spécifications convenus.</p><h2>Article 3 : Obligations de l'Entrepreneur</h2><p>3.1 L'Entrepreneur s'engage à débuter les travaux à la date convenue et à poursuivre sans délai jusqu'à l'achèvement complet.<br/>3.2 L'Entrepreneur garantit la qualité des matériaux utilisés et la conformité des travaux aux normes de construction en vigueur.<br/>3.3 L'Entrepreneur est responsable de la sécurité du chantier et s'engage à respecter toutes les réglementations en matière de santé et sécurité au travail.</p><h2>Article 4 : Obligations du Maître d'Ouvrage</h2><p>4.1 Le Maître d'Ouvrage s'engage à fournir à l'Entrepreneur toutes les informations nécessaires à la réalisation des travaux.<br/>4.2 Le Maître d'Ouvrage s'engage à effectuer les paiements conformément aux échéances convenues.</p><h2>Article 5 : Prix et Modalités de Paiement</h2><p>5.1 Le coût total des travaux est fixé à {{montant}} FCFA.<br/>5.2 Les modalités de paiement seront les suivantes : {{modalites_paiement}}.</p><h2>Article 6 : Délais</h2><p>6.1 La date de début des travaux est fixée au {{date_debut}}, et la date d'achèvement prévue au {{date_fin}}.<br/>6.2 En cas de retard non justifié, l'Entrepreneur sera redevable de pénalités de retard fixées à {{penalites}} par jour de retard.</p><h2>Article 7 : Réception des Travaux</h2><p>7.1 Une réception provisoire sera organisée à l'achèvement des travaux pour vérifier leur conformité.<br/>7.2 La réception définitive sera prononcée après correction d'éventuels défauts et complet achèvement des travaux.</p><h2>Article 8 : Assurance et Garanties</h2><p>8.1 L'Entrepreneur s'engage à souscrire une assurance responsabilité civile professionnelle.<br/>8.2 Des garanties pour les vices cachés et la solidité de l'ouvrage sont prévues conformément à la législation en vigueur.</p><h2>Article 9 : Résolution des Litiges</h2><p>Tout différend né de l'interprétation ou de l'exécution du présent contrat sera, dans un premier temps, soumis à la médiation. En l'absence de résolution, les parties pourront porter le litige devant les tribunaux compétents.</p><h2>Article 10 : Dispositions Générales</h2><p>10.1 Toute modification du présent contrat devra être faite par écrit et signée par les deux parties.<br/>10.2 Ce contrat est soumis aux lois du pays où est situé le Site.</p><p class="signatures">Fait à {{lieu}}, le {{date_jour}}<br/>En deux exemplaires originaux.<br/><br/>Le Maître d'Ouvrage, — L'Entrepreneur,</p></div>`,
    countriesJson: C_CONSTRUCTION,
  },

  // ── 10. Contrat d'entreprise générale (construction) ───────────────────────
  {
    code: 'btp_entreprise_generale', name: 'Contrat d’entreprise générale (construction)', category: 'btp_construction',
    price: 4500, priceMax: 6500, popularity: 55,
    description: 'Confiez l’intégralité de votre projet à une entreprise générale : coût global, délais, garanties et avenants encadrés.',
    fieldsJson: F([
      { key: 'maitre_ouvrage', label: 'Nom et coordonnées complètes du Maître d’ouvrage', type: 'textarea', required: true },
      { key: 'entrepreneur', label: 'Nom et coordonnées complètes de l’entreprise de construction (l’Entrepreneur)', type: 'textarea', required: true },
      { key: 'description_projet', label: 'Description précise du projet de construction (emplacement, nature des travaux…)', type: 'textarea', required: true },
      { key: 'date_debut', label: 'Date de début du projet', type: 'date', required: true },
      { key: 'date_fin', label: 'Date d’achèvement au plus tard', type: 'date', required: true },
      { key: 'montant', label: 'Coût total du projet en chiffres et en lettres (FCFA)', type: 'text', required: true },
      { key: 'modalites_paiement', label: 'Modalités de paiement (échéances, acomptes…)', type: 'textarea', required: true },
      { key: 'juridiction', label: 'Lieu de juridiction en cas de litige', type: 'text', required: true },
      { key: 'lieu', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT D'ENTREPRISE GÉNÉRALE (CONSTRUCTION)</h1><p><strong>Entre les soussignés :</strong> {{maitre_ouvrage}}, désigné dans ce qui va suivre comme « le Maître d'ouvrage ». D'une part.</p><p><strong>Et :</strong> {{entrepreneur}}, désignée dans ce qui va suivre comme « l'Entrepreneur ». D'autre part.</p><p>Il est convenu et arrêté ce qui suit :</p><h2>Article 1. Objet du contrat</h2><p>Le Maître d'ouvrage confie à l'Entrepreneur, qui accepte, la responsabilité de la réalisation de {{description_projet}}.</p><h2>Article 2. Durée du projet</h2><p>Le projet débutera le {{date_debut}} et devra être achevé au plus tard le {{date_fin}}. Des pénalités pour retard peuvent être appliquées conformément aux termes de ce contrat.</p><h2>Article 3. Paiement et modalités financières</h2><p>Le coût total du projet est fixé à {{montant}}.</p><p>Les modalités de paiement seront les suivantes : {{modalites_paiement}}.</p><p>Toute modification du coût dû à des changements dans les spécifications ou des circonstances imprévues doit être approuvée par le Maître d'ouvrage.</p><h2>Article 4. Obligations de l'Entrepreneur</h2><p>L'Entrepreneur s'engage à réaliser les travaux conformément aux plans et spécifications convenus et dans le respect des normes de qualité et de sécurité en vigueur.</p><p>L'Entrepreneur doit fournir tous les matériaux, équipements et main-d'œuvre nécessaires à la réalisation du projet.</p><h2>Article 5. Obligations du Maître d'ouvrage</h2><p>Le Maître d'ouvrage s'engage à fournir à l'Entrepreneur toutes les informations nécessaires à la réalisation du projet et à effectuer les paiements selon les modalités convenues.</p><h2>Article 6. Garanties et assurances</h2><p>L'Entrepreneur doit souscrire une assurance couvrant tous les risques liés au chantier.</p><p>Des garanties spécifiques peuvent être exigées pour la qualité et la durabilité des travaux.</p><h2>Article 7. Modifications et ajustements</h2><p>Toute modification des travaux initialement prévus doit faire l'objet d'un avenant au présent contrat.</p><h2>Article 8. Résolution des litiges</h2><p>En cas de litige, les parties s'efforceront de trouver une solution à l'amiable. À défaut, le litige sera soumis à la juridiction compétente de {{juridiction}}.</p><p>Fait en double exemplaire et de bonne foi.</p><p class="signatures">Fait à {{lieu}}, le {{date_jour}}.<br/><br/>Signature du Maître d'ouvrage — Signature de l'Entrepreneur</p></div>`,
    countriesJson: C_CONSTRUCTION,
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
  console.log('Seed Drive BTP (Agent Drive-1/5) terminé.');
  console.log(`   Templates du script : ${templates.length} (créés : ${created}, mis à jour : ${updated})`);
  console.log(`   Catégorie : btp_construction`);
  console.log(`   Total de templates en base : ${total}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
