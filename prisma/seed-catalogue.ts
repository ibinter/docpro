// Seed catalogue étendu IBIG DocPro — CDC §5 : ~50 nouveaux templates professionnels.
// Script ADDITIF : upsert par code — n'écrase pas les 10 templates du seed principal.
// Exécution : npx tsx prisma/seed-catalogue.ts
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
const C = (ohada: string, fr: string, ma: string) =>
  JSON.stringify({ OHADA: { note: ohada }, FR: { note: fr }, MA: { note: ma } });

const SANTE_DISCLAIMER =
  '<p class="text-small"><em>Modèle type à usage professionnel — ne remplace pas une consultation médicale.</em></p>';

const templates: CatalogTemplate[] = [
  // ════════════════════════ RH & EMPLOI (8) ════════════════════════
  {
    code: 'lettre_recommandation', name: 'Lettre de recommandation', category: 'rh_emploi', price: 500, priceMax: 1500,
    description: 'Lettre de recommandation professionnelle rédigée par un employeur, professeur ou mentor.',
    fieldsJson: F([
      { key: 'recommandant', label: 'Votre nom (recommandant)', type: 'text', required: true },
      { key: 'fonction_recommandant', label: 'Votre fonction et organisation', type: 'text', required: true },
      { key: 'candidat', label: 'Nom de la personne recommandée', type: 'text', required: true },
      { key: 'relation', label: 'Votre relation (ex. supérieur hiérarchique de 2019 à 2024)', type: 'text', required: true },
      { key: 'qualites', label: 'Qualités et réalisations observées', type: 'textarea', required: true },
      { key: 'objectif', label: 'Objectif de la recommandation (poste, formation…)', type: 'text', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p class="align-right">{{ville}}, le {{date_jour}}</p><p><strong>{{recommandant}}</strong><br/>{{fonction_recommandant}}</p><p>Objet : Lettre de recommandation en faveur de {{candidat}}</p><p>Madame, Monsieur,</p><p>Je soussigné(e) {{recommandant}}, {{fonction_recommandant}}, atteste connaître {{candidat}} en ma qualité de {{relation}}.</p><p>{{qualites}}</p><p>C'est donc sans réserve que je recommande {{candidat}} pour {{objectif}}. Je reste à votre disposition pour tout complément d'information.</p><p>Veuillez agréer, Madame, Monsieur, l'expression de ma considération distinguée.</p><p class="signatures">{{recommandant}}<br/>{{fonction_recommandant}}</p></div>`,
    popularity: 75,
  },
  {
    code: 'contrat_cdd', name: 'Contrat de travail CDD', category: 'rh_emploi', price: 1500, priceMax: 4000,
    description: 'Contrat à durée déterminée avec motif de recours, terme précis et indemnité de fin de contrat.',
    fieldsJson: F([
      { key: 'employeur', label: 'Employeur (raison sociale + adresse)', type: 'text', required: true },
      { key: 'salarie', label: 'Salarié (nom complet + adresse)', type: 'text', required: true },
      { key: 'poste', label: 'Intitulé du poste', type: 'text', required: true },
      { key: 'motif', label: 'Motif du recours au CDD (surcroît d’activité, remplacement…)', type: 'text', required: true },
      { key: 'date_debut', label: 'Date de début', type: 'date', required: true },
      { key: 'date_fin', label: 'Date de fin', type: 'date', required: true },
      { key: 'salaire', label: 'Salaire mensuel brut (FCFA)', type: 'text', required: true },
      { key: 'lieu', label: 'Lieu de travail', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE TRAVAIL À DURÉE DÉTERMINÉE</h1><p>Entre <strong>{{employeur}}</strong>, ci-après « l'Employeur », et <strong>{{salarie}}</strong>, ci-après « le Salarié », il est conclu le présent contrat à durée déterminée.</p><h2>Article 1 — Motif du recours</h2><p>Le présent CDD est conclu pour le motif suivant : {{motif}}, conformément aux dispositions légales limitant le recours au contrat à durée déterminée.</p><h2>Article 2 — Fonctions</h2><p>Le Salarié est engagé en qualité de <strong>{{poste}}</strong> et exercera ses fonctions à {{lieu}}.</p><h2>Article 3 — Durée</h2><p>Le contrat prend effet le {{date_debut}} et prendra fin le {{date_fin}}, sans qu'il soit besoin de préavis. Il ne peut être renouvelé que dans les limites prévues par la loi applicable.</p><h2>Article 4 — Rémunération</h2><p>Le Salarié percevra un salaire mensuel brut de {{salaire}} FCFA, auquel s'ajoutera, le cas échéant, l'indemnité de fin de contrat prévue par la législation en vigueur.</p><h2>Article 5 — Période d'essai</h2><p>Le présent contrat comporte une période d'essai conforme à la durée maximale légale pour les contrats à durée déterminée.</p><p class="signatures">Fait en deux exemplaires à {{lieu}}, le {{date_jour}}<br/><br/>L'Employeur — Le Salarié (signature précédée de « Lu et approuvé »)</p></div>`,
    popularity: 68,
    countriesJson: C(
      'Conforme au droit du travail des États OHADA : durée maximale 2 ans renouvellements compris (codes du travail nationaux, ex. Côte d’Ivoire art. 15.4).',
      'France : art. L1242-1 s. du Code du travail — motif obligatoire, indemnité de précarité de 10 %.',
      'Maroc : art. 16 et 17 du Code du travail (loi 65-99) — cas de recours limitativement énumérés.'
    ),
  },
  {
    code: 'contrat_freelance', name: 'Contrat de prestation freelance', category: 'rh_emploi', price: 2000, priceMax: 5000,
    description: 'Contrat de prestation indépendante : mission, livrables, honoraires, propriété intellectuelle.',
    fieldsJson: F([
      { key: 'client', label: 'Client (nom / société + adresse)', type: 'text', required: true },
      { key: 'freelance', label: 'Prestataire freelance (nom + statut + adresse)', type: 'text', required: true },
      { key: 'mission', label: 'Description de la mission et livrables', type: 'textarea', required: true },
      { key: 'duree', label: 'Durée / calendrier de la mission', type: 'text', required: true },
      { key: 'honoraires', label: 'Honoraires (montant et modalités)', type: 'text', required: true },
      { key: 'ville', label: 'Ville de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE PRESTATION DE SERVICES — FREELANCE</h1><p>Entre <strong>{{client}}</strong>, ci-après « le Client », et <strong>{{freelance}}</strong>, ci-après « le Prestataire », intervenant en toute indépendance, il est convenu ce qui suit :</p><h2>Article 1 — Objet</h2><p>Le Client confie au Prestataire la mission suivante : {{mission}}</p><h2>Article 2 — Durée et calendrier</h2><p>La mission sera exécutée selon le calendrier suivant : {{duree}}. Tout retard imputable au Client prolonge d'autant les délais.</p><h2>Article 3 — Honoraires</h2><p>En contrepartie, le Client versera au Prestataire les honoraires suivants : {{honoraires}}. Le Prestataire assume seul ses charges sociales et fiscales.</p><h2>Article 4 — Indépendance</h2><p>Le Prestataire exécute la mission en toute indépendance, sans lien de subordination. Le présent contrat ne constitue en aucun cas un contrat de travail.</p><h2>Article 5 — Propriété intellectuelle</h2><p>Les livrables sont cédés au Client après complet paiement, le Prestataire conservant ses méthodes et savoir-faire.</p><h2>Article 6 — Confidentialité et résiliation</h2><p>Chaque partie garde confidentielles les informations échangées. Le contrat peut être résilié pour manquement grave après mise en demeure restée infructueuse quinze (15) jours.</p><p class="signatures">Fait à {{ville}}, le {{date_jour}}<br/><br/>Le Client — Le Prestataire</p></div>`,
    popularity: 62,
    countriesJson: C(
      'Espace OHADA : contrat civil/commercial régi par l’Acte uniforme sur le droit commercial général (AUDCG) et le droit national des obligations.',
      'France : attention au risque de requalification en salariat (art. L8221-6 Code du travail) — préserver l’indépendance réelle.',
      'Maroc : contrat d’entreprise régi par le DOC (Dahir des Obligations et Contrats), art. 723 s.'
    ),
  },
  {
    code: 'fiche_de_paie', name: 'Fiche de paie', category: 'rh_emploi', price: 300, priceMax: 800,
    description: 'Bulletin de salaire mensuel : salaire de base, primes, retenues sociales et net à payer.',
    fieldsJson: F([
      { key: 'employeur', label: 'Employeur (raison sociale + n° employeur CNPS/CNSS)', type: 'textarea', required: true },
      { key: 'salarie', label: 'Salarié (nom + matricule + emploi)', type: 'textarea', required: true },
      { key: 'periode', label: 'Période de paie (ex. Juin 2026)', type: 'text', required: true },
      { key: 'salaire_base', label: 'Salaire de base (FCFA)', type: 'text', required: true },
      { key: 'primes', label: 'Primes et indemnités (détail)', type: 'textarea', required: false },
      { key: 'retenues', label: 'Retenues (cotisations sociales, impôts…)', type: 'textarea', required: true },
      { key: 'net_payer', label: 'Net à payer (FCFA)', type: 'text', required: true },
    ]),
    body: `<div class="facture"><h1>BULLETIN DE PAIE — {{periode}}</h1><div class="facture-parties"><div><h3>Employeur</h3><p>{{employeur}}</p></div><div><h3>Salarié</h3><p>{{salarie}}</p></div></div><h2>Éléments de rémunération</h2><p><strong>Salaire de base :</strong> {{salaire_base}} FCFA</p><p><strong>Primes et indemnités :</strong><br/>{{primes}}</p><h2>Retenues</h2><p>{{retenues}}</p><h2>NET À PAYER : {{net_payer}} FCFA</h2><p class="text-small">Bulletin émis le {{date_jour}}. À conserver sans limitation de durée. Ce bulletin ne vaut pas solde de tout compte.</p></div>`,
    popularity: 58,
  },
  {
    code: 'reglement_interieur', name: 'Règlement intérieur d’entreprise', category: 'rh_emploi', price: 3000, priceMax: 7000,
    description: 'Règlement intérieur complet : discipline, hygiène et sécurité, horaires, sanctions.',
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise (raison sociale + siège)', type: 'text', required: true },
      { key: 'effectif', label: 'Effectif approximatif', type: 'text', required: true },
      { key: 'horaires', label: 'Horaires de travail', type: 'text', required: true },
      { key: 'regles_specifiques', label: 'Règles spécifiques à votre activité', type: 'textarea', required: false },
      { key: 'representant', label: 'Représentant légal (nom + fonction)', type: 'text', required: true },
      { key: 'date_entree_vigueur', label: 'Date d’entrée en vigueur', type: 'date', required: true },
    ]),
    body: `<div class="contrat"><h1>RÈGLEMENT INTÉRIEUR</h1><p><strong>{{entreprise}}</strong> — Effectif : {{effectif}} salariés. Le présent règlement s'applique à l'ensemble du personnel, en quelque lieu qu'il se trouve pour l'exécution de son travail.</p><h2>Titre I — Discipline générale</h2><p>Les salariés doivent respecter les horaires de travail : {{horaires}}. Toute absence doit être justifiée dans les 48 heures. L'accès aux locaux est réservé au personnel autorisé.</p><h2>Titre II — Hygiène et sécurité</h2><p>Chaque salarié doit veiller à sa sécurité et à celle de ses collègues, respecter les consignes de sécurité affichées, utiliser les équipements de protection fournis et signaler immédiatement toute situation dangereuse. Il est interdit d'introduire ou de consommer de l'alcool ou des substances illicites sur le lieu de travail.</p><h2>Titre III — Dispositions particulières</h2><p>{{regles_specifiques}}</p><h2>Titre IV — Sanctions disciplinaires</h2><p>Tout manquement pourra donner lieu, selon la gravité, à : avertissement écrit, mise à pied disciplinaire, mutation, rétrogradation, licenciement. Aucune sanction ne sera prononcée sans que le salarié ait été informé des griefs et mis en mesure de s'expliquer.</p><h2>Titre V — Entrée en vigueur</h2><p>Le présent règlement, déposé auprès de l'inspection du travail compétente, entre en vigueur le {{date_entree_vigueur}}.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>{{representant}}</p></div>`,
    popularity: 30,
    countriesJson: C(
      'États OHADA : dépôt auprès de l’inspection du travail et avis des délégués du personnel requis (codes du travail nationaux).',
      'France : obligatoire à partir de 50 salariés (art. L1311-2 Code du travail), consultation du CSE et dépôt au greffe des prud’hommes.',
      'Maroc : obligatoire à partir de 10 salariés (art. 138 Code du travail), approbation de l’autorité gouvernementale chargée du travail.'
    ),
  },
  {
    code: 'avertissement_disciplinaire', name: 'Avertissement disciplinaire', category: 'rh_emploi', price: 500, priceMax: 1500,
    description: 'Lettre d’avertissement notifiant un manquement professionnel et rappelant les obligations.',
    fieldsJson: F([
      { key: 'employeur', label: 'Employeur (raison sociale)', type: 'text', required: true },
      { key: 'signataire', label: 'Signataire (nom + fonction)', type: 'text', required: true },
      { key: 'salarie', label: 'Salarié concerné (nom + poste)', type: 'text', required: true },
      { key: 'faits', label: 'Faits reprochés (date, lieu, description précise)', type: 'textarea', required: true },
      { key: 'rappel', label: 'Obligation ou règle non respectée', type: 'textarea', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p class="align-right">{{ville}}, le {{date_jour}}</p><p><strong>{{employeur}}</strong></p><p>Lettre remise en main propre contre décharge / recommandée avec accusé de réception</p><p>Objet : <strong>Avertissement disciplinaire</strong></p><p>{{salarie}},</p><p>Nous avons constaté les faits suivants : {{faits}}</p><p>Ces faits constituent un manquement à vos obligations professionnelles, et notamment : {{rappel}}</p><p>En conséquence, nous vous notifions par la présente un <strong>avertissement</strong>, qui sera versé à votre dossier personnel. Nous vous demandons de vous conformer strictement à vos obligations à l'avenir. À défaut, nous serions contraints d'envisager une sanction plus sévère pouvant aller jusqu'au licenciement.</p><p>Nous espérons ne plus avoir à constater de tels agissements.</p><p class="signatures">{{signataire}}<br/>Pour {{employeur}}</p></div>`,
    popularity: 33,
    countriesJson: C(
      'États OHADA : respecter la procédure disciplinaire du code du travail national et de la convention collective applicable.',
      'France : art. L1332-1 s. Code du travail — notification écrite et motivée, prescription des faits de 2 mois.',
      'Maroc : art. 37 et 62 s. Code du travail — échelle des sanctions et audition préalable du salarié.'
    ),
  },
  {
    code: 'demande_conge', name: 'Demande de congé', category: 'rh_emploi', price: 100, priceMax: 300,
    description: 'Lettre de demande de congé (annuel, exceptionnel, sans solde) adressée à l’employeur.',
    fieldsJson: F([
      { key: 'salarie', label: 'Votre nom complet', type: 'text', required: true },
      { key: 'poste', label: 'Votre poste / service', type: 'text', required: true },
      { key: 'type_conge', label: 'Type de congé', type: 'select', required: true, options: ['Congé annuel payé', 'Congé exceptionnel (événement familial)', 'Congé sans solde', 'Congé maternité/paternité'] },
      { key: 'date_debut', label: 'Date de début souhaitée', type: 'date', required: true },
      { key: 'date_fin', label: 'Date de fin souhaitée', type: 'date', required: true },
      { key: 'motif', label: 'Motif / précisions (facultatif)', type: 'textarea', required: false },
      { key: 'destinataire', label: 'Destinataire (nom + fonction)', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p class="align-right">Le {{date_jour}}</p><p><strong>{{salarie}}</strong><br/>{{poste}}</p><p>À l'attention de {{destinataire}}</p><p>Objet : Demande de congé — {{type_conge}}</p><p>Madame, Monsieur,</p><p>Par la présente, je sollicite l'autorisation de bénéficier d'un congé au titre de : <strong>{{type_conge}}</strong>, pour la période du {{date_debut}} au {{date_fin}} inclus.</p><p>{{motif}}</p><p>Je m'engage à organiser la continuité de mes dossiers avant mon départ et reste à votre disposition pour tout aménagement nécessaire au bon fonctionnement du service.</p><p>Dans l'attente de votre accord, je vous prie d'agréer, Madame, Monsieur, mes salutations respectueuses.</p><p class="align-right"><strong>{{salarie}}</strong></p></div>`,
    popularity: 72,
  },
  {
    code: 'rupture_conventionnelle', name: 'Convention de rupture amiable', category: 'rh_emploi', price: 2000, priceMax: 5000,
    description: 'Convention de rupture d’un commun accord du contrat de travail avec indemnité négociée.',
    fieldsJson: F([
      { key: 'employeur', label: 'Employeur (raison sociale + adresse)', type: 'text', required: true },
      { key: 'salarie', label: 'Salarié (nom + poste)', type: 'text', required: true },
      { key: 'date_embauche', label: 'Date d’embauche', type: 'date', required: true },
      { key: 'date_rupture', label: 'Date de rupture convenue', type: 'date', required: true },
      { key: 'indemnite', label: 'Indemnité de rupture (FCFA)', type: 'text', required: true },
      { key: 'modalites', label: 'Modalités complémentaires (préavis, restitution matériel…)', type: 'textarea', required: false },
      { key: 'ville', label: 'Ville de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONVENTION DE RUPTURE D'UN COMMUN ACCORD</h1><p>Entre <strong>{{employeur}}</strong>, ci-après « l'Employeur », et <strong>{{salarie}}</strong>, ci-après « le Salarié », embauché le {{date_embauche}}.</p><h2>Article 1 — Objet</h2><p>Les parties conviennent, d'un commun accord et sans qu'aucune ne puisse être regardée comme ayant pris l'initiative de la rupture, de mettre fin au contrat de travail qui les lie.</p><h2>Article 2 — Date de rupture</h2><p>Le contrat de travail prendra fin le {{date_rupture}}, date à laquelle le Salarié sera libéré de toute obligation, sous réserve des clauses survivant à la rupture (confidentialité, non-concurrence le cas échéant).</p><h2>Article 3 — Indemnité de rupture</h2><p>L'Employeur versera au Salarié une indemnité globale, forfaitaire et définitive de <strong>{{indemnite}} FCFA</strong>, en sus des salaires, congés payés et accessoires dus jusqu'à la date de rupture.</p><h2>Article 4 — Modalités</h2><p>{{modalites}}</p><h2>Article 5 — Documents de fin de contrat</h2><p>L'Employeur remettra au Salarié : certificat de travail, reçu pour solde de tout compte et attestations nécessaires à ses droits sociaux.</p><p class="signatures">Fait en deux exemplaires à {{ville}}, le {{date_jour}}<br/><br/>L'Employeur — Le Salarié</p></div>`,
    popularity: 40,
    countriesJson: C(
      'États OHADA : rupture amiable admise par les codes du travail nationaux — l’accord doit être exempt de vice du consentement.',
      'France : rupture conventionnelle homologuée (art. L1237-11 s.) — formulaire Cerfa, délai de rétractation 15 jours, homologation DREETS.',
      'Maroc : départ négocié régi par le DOC et l’art. 73 s. du Code du travail — privilégier un protocole d’accord transactionnel.'
    ),
  },

  // ════════════════════════ JURIDIQUE & ADMINISTRATIF (12) ════════════════════════
  {
    code: 'contrat_vente_vehicule', name: 'Contrat de vente de véhicule', category: 'juridique_admin', price: 1000, priceMax: 3000,
    description: 'Contrat de cession de véhicule d’occasion entre particuliers ou professionnels.',
    fieldsJson: F([
      { key: 'vendeur', label: 'Vendeur (nom + pièce d’identité + adresse)', type: 'text', required: true },
      { key: 'acheteur', label: 'Acheteur (nom + pièce d’identité + adresse)', type: 'text', required: true },
      { key: 'vehicule', label: 'Véhicule (marque, modèle, année, immatriculation, châssis)', type: 'textarea', required: true },
      { key: 'kilometrage', label: 'Kilométrage au compteur', type: 'text', required: true },
      { key: 'prix', label: 'Prix de vente (FCFA)', type: 'text', required: true },
      { key: 'paiement', label: 'Modalités de paiement', type: 'text', required: true },
      { key: 'ville', label: 'Ville de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE VENTE DE VÉHICULE D'OCCASION</h1><p>Entre <strong>{{vendeur}}</strong>, ci-après « le Vendeur », et <strong>{{acheteur}}</strong>, ci-après « l'Acheteur ».</p><h2>Article 1 — Désignation du véhicule</h2><p>Le Vendeur cède à l'Acheteur le véhicule suivant : {{vehicule}}<br/>Kilométrage au compteur : {{kilometrage}} km.</p><h2>Article 2 — Prix et paiement</h2><p>La vente est consentie au prix de <strong>{{prix}} FCFA</strong>, payé selon les modalités suivantes : {{paiement}}. Le Vendeur reconnaît avoir reçu le prix et en donne quittance.</p><h2>Article 3 — État du véhicule</h2><p>L'Acheteur déclare avoir examiné le véhicule et l'accepter dans son état actuel, le Vendeur garantissant qu'il n'est ni gagé ni frappé d'opposition et déclarant les vices dont il a connaissance.</p><h2>Article 4 — Transfert de propriété</h2><p>La propriété et les risques sont transférés à l'Acheteur à la signature. Le Vendeur remet les documents du véhicule (carte grise, visite technique, assurance) et les parties s'engagent à accomplir les formalités de mutation dans les délais légaux.</p><p class="signatures">Fait en deux exemplaires à {{ville}}, le {{date_jour}}<br/><br/>Le Vendeur — L'Acheteur</p></div>`,
    popularity: 66,
    countriesJson: C(
      'États OHADA : vente régie par l’AUDCG (vente commerciale) ou le droit civil national ; mutation de la carte grise auprès des services des transports.',
      'France : certificat de cession Cerfa 15776, déclaration en ligne ANTS sous 15 jours, contrôle technique de moins de 6 mois.',
      'Maroc : légalisation des signatures et mutation auprès du centre immatriculateur (NARSA) sous 30 jours.'
    ),
  },
  {
    code: 'contrat_vente_immobilier', name: 'Contrat de vente immobilière', category: 'juridique_admin', price: 5000, priceMax: 10000,
    description: 'Acte de vente sous seing privé d’un bien immobilier, à régulariser devant notaire.',
    fieldsJson: F([
      { key: 'vendeur', label: 'Vendeur (nom + pièce + adresse)', type: 'text', required: true },
      { key: 'acheteur', label: 'Acheteur (nom + pièce + adresse)', type: 'text', required: true },
      { key: 'bien', label: 'Désignation du bien (adresse, titre foncier, superficie, description)', type: 'textarea', required: true },
      { key: 'prix', label: 'Prix de vente (FCFA)', type: 'text', required: true },
      { key: 'paiement', label: 'Modalités de paiement (comptant, échelonné…)', type: 'textarea', required: true },
      { key: 'origine', label: 'Origine de propriété (acte, titre, date d’acquisition)', type: 'textarea', required: true },
      { key: 'ville', label: 'Ville de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>ACTE DE VENTE IMMOBILIÈRE</h1><p>Entre <strong>{{vendeur}}</strong>, ci-après « le Vendeur », et <strong>{{acheteur}}</strong>, ci-après « l'Acquéreur ».</p><h2>Article 1 — Désignation du bien</h2><p>Le Vendeur vend à l'Acquéreur, qui accepte, le bien immobilier suivant : {{bien}}</p><h2>Article 2 — Origine de propriété</h2><p>{{origine}}</p><h2>Article 3 — Prix</h2><p>La vente est consentie moyennant le prix de <strong>{{prix}} FCFA</strong>, payable comme suit : {{paiement}}</p><h2>Article 4 — Garanties</h2><p>Le Vendeur garantit que le bien est libre de toute hypothèque, servitude non déclarée, opposition ou litige, et s'oblige à la garantie d'éviction et des vices cachés conformément au droit applicable.</p><h2>Article 5 — Transfert et formalités</h2><p>Le transfert de propriété sera opposable aux tiers après accomplissement des formalités d'enregistrement et de publicité foncière. Les frais d'acte, droits et taxes sont à la charge de l'Acquéreur sauf convention contraire.</p><p class="signatures">Fait en quatre exemplaires à {{ville}}, le {{date_jour}}<br/><br/>Le Vendeur — L'Acquéreur</p></div>`,
    popularity: 48,
    countriesJson: C(
      'États OHADA : publicité foncière obligatoire auprès de la conservation foncière ; dans plusieurs États l’acte notarié est exigé pour le transfert du titre foncier.',
      'France : la vente immobilière doit être reçue par notaire et publiée au service de la publicité foncière (art. 710-1 Code civil).',
      'Maroc : inscription obligatoire à l’ANCFCC pour les immeubles immatriculés ; acte reçu par notaire, adoul ou avocat agréé (loi 39-08).'
    ),
  },
  {
    code: 'procuration_notariee', name: 'Procuration notariée (modèle)', category: 'juridique_admin', price: 1000, priceMax: 2500,
    description: 'Procuration authentique à faire recevoir par un notaire : pouvoirs étendus, immobilier, banque.',
    fieldsJson: F([
      { key: 'mandant', label: 'Mandant (nom, date et lieu de naissance, pièce, adresse)', type: 'textarea', required: true },
      { key: 'mandataire', label: 'Mandataire (nom, pièce, adresse)', type: 'textarea', required: true },
      { key: 'pouvoirs', label: 'Pouvoirs conférés (actes précis autorisés)', type: 'textarea', required: true },
      { key: 'biens', label: 'Biens ou comptes concernés', type: 'textarea', required: true },
      { key: 'duree', label: 'Durée de validité', type: 'text', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>PROCURATION AUTHENTIQUE</h1><p class="text-small">Modèle destiné à être reçu par un notaire ou une autorité habilitée.</p><p>Je soussigné(e), <strong>{{mandant}}</strong>, désigné(e) « le Mandant », constitue pour mandataire spécial : <strong>{{mandataire}}</strong>, désigné(e) « le Mandataire », à qui je donne pouvoir de, pour moi et en mon nom :</p><h2>Article 1 — Pouvoirs conférés</h2><p>{{pouvoirs}}</p><h2>Article 2 — Biens et comptes concernés</h2><p>{{biens}}</p><h2>Article 3 — Étendue du mandat</h2><p>Aux effets ci-dessus, passer et signer tous actes et pièces, élire domicile, substituer en tout ou partie, et généralement faire tout ce qui sera utile et nécessaire à l'exécution du présent mandat, promettant de le ratifier.</p><h2>Article 4 — Durée</h2><p>La présente procuration est consentie pour une durée de {{duree}} à compter de sa signature. Elle peut être révoquée à tout moment par notification écrite au Mandataire.</p><p class="signatures">Fait à {{ville}}, le {{date_jour}}<br/><br/>Le Mandant (signature précédée de « Bon pour pouvoir ») — Le Mandataire (« Bon pour acceptation de pouvoir »)</p></div>`,
    popularity: 44,
    countriesJson: C(
      'États OHADA : la procuration portant sur un acte authentique (vente immobilière, hypothèque) doit elle-même être authentique ou légalisée.',
      'France : art. 1984 s. Code civil — la procuration doit revêtir la forme de l’acte auquel elle se rapporte (authentique pour une vente notariée).',
      'Maroc : art. 879 s. du DOC — légalisation de signature obligatoire ; forme adoulaire ou notariée pour les actes immobiliers.'
    ),
  },
  {
    code: 'testament_simple', name: 'Testament olographe simple', category: 'juridique_admin', price: 2000, priceMax: 5000,
    description: 'Modèle de testament olographe : legs, désignation d’exécuteur, révocation des dispositions antérieures.',
    fieldsJson: F([
      { key: 'testateur', label: 'Testateur (nom, date et lieu de naissance, adresse)', type: 'textarea', required: true },
      { key: 'legs', label: 'Legs (biens légués et bénéficiaires)', type: 'textarea', required: true },
      { key: 'executeur', label: 'Exécuteur testamentaire (nom + adresse)', type: 'text', required: false },
      { key: 'volontes', label: 'Dernières volontés particulières (funérailles, tutelle…)', type: 'textarea', required: false },
      { key: 'ville', label: 'Ville de rédaction', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>TESTAMENT</h1><p class="text-small">Important : pour être valable en la forme olographe, ce testament doit être entièrement écrit, daté et signé de la main du testateur. Le présent modèle sert de trame à recopier.</p><p>Ceci est mon testament.</p><p>Je soussigné(e), <strong>{{testateur}}</strong>, sain(e) de corps et d'esprit, libre de toute contrainte, déclare prendre les dispositions de dernières volontés suivantes :</p><h2>Article 1 — Révocation</h2><p>Je révoque toutes dispositions testamentaires antérieures.</p><h2>Article 2 — Legs</h2><p>{{legs}}</p><p>Ces legs s'exerceront dans les limites de la quotité disponible, sans porter atteinte à la réserve héréditaire prévue par la loi applicable à ma succession.</p><h2>Article 3 — Exécuteur testamentaire</h2><p>Je désigne comme exécuteur testamentaire : {{executeur}}, chargé de veiller à la bonne exécution des présentes.</p><h2>Article 4 — Volontés particulières</h2><p>{{volontes}}</p><p class="signatures">Fait, écrit, daté et signé entièrement de ma main à {{ville}}, le {{date_jour}}<br/><br/>Signature du testateur</p></div>`,
    popularity: 25,
    countriesJson: C(
      'États OHADA : successions régies par le droit civil national et, le cas échéant, le droit coutumier — dépôt chez notaire recommandé.',
      'France : art. 970 Code civil — testament olographe entièrement écrit, daté et signé de la main du testateur ; inscription au FCDDV conseillée.',
      'Maroc : succession régie par le Code de la famille (Moudawana) — le testament (wasiya) ne peut excéder le tiers de la succession, art. 277 s.'
    ),
  },
  {
    code: 'statuts_sas', name: 'Statuts de société SAS', category: 'juridique_admin', price: 4000, priceMax: 9000,
    description: 'Statuts de Société par Actions Simplifiée : président, actions, cessions, décisions collectives.',
    fieldsJson: F([
      { key: 'denomination', label: 'Dénomination sociale', type: 'text', required: true },
      { key: 'capital', label: 'Capital social (FCFA)', type: 'text', required: true },
      { key: 'siege', label: 'Adresse du siège social', type: 'text', required: true },
      { key: 'objet', label: 'Objet social (activités)', type: 'textarea', required: true },
      { key: 'associes', label: 'Associés / actionnaires (noms + apports + nombre d’actions)', type: 'textarea', required: true },
      { key: 'president', label: 'Président (nom + adresse)', type: 'text', required: true },
      { key: 'duree', label: 'Durée de la société (années, max 99)', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>STATUTS — {{denomination}} SAS</h1><h2>Article 1 — Forme</h2><p>Il est institué une Société par Actions Simplifiée (SAS) régie par les dispositions légales applicables et les présents statuts.</p><h2>Article 2 — Dénomination</h2><p>La société a pour dénomination sociale : <strong>{{denomination}} SAS</strong>.</p><h2>Article 3 — Objet</h2><p>{{objet}}</p><h2>Article 4 — Siège social</h2><p>Le siège social est fixé à {{siege}}. Il peut être transféré par décision du Président.</p><h2>Article 5 — Durée</h2><p>La société est constituée pour une durée de {{duree}} ans à compter de son immatriculation, sauf dissolution anticipée ou prorogation.</p><h2>Article 6 — Capital social et apports</h2><p>Le capital social est fixé à <strong>{{capital}} FCFA</strong>, divisé en actions réparties entre les associés comme suit : {{associes}}</p><h2>Article 7 — Présidence</h2><p>La société est représentée à l'égard des tiers par un Président, personne physique ou morale. Est désigné premier Président : <strong>{{president}}</strong>, pour une durée indéterminée.</p><h2>Article 8 — Décisions collectives</h2><p>Les décisions relevant de la collectivité des associés (approbation des comptes, modification des statuts, dissolution) sont prises à la majorité des voix, chaque action donnant droit à une voix.</p><h2>Article 9 — Cession d'actions</h2><p>Les cessions d'actions entre associés sont libres ; toute cession à un tiers est soumise à l'agrément préalable de la collectivité des associés.</p><h2>Article 10 — Exercice social</h2><p>L'exercice social commence le 1er janvier et se termine le 31 décembre de chaque année.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>Signatures de tous les associés</p></div>`,
    popularity: 42,
    countriesJson: C(
      'Espace OHADA : SAS introduite par l’Acte uniforme révisé sur les sociétés commerciales (AUSCGIE, art. 853-1 s.) — capital librement fixé.',
      'France : art. L227-1 s. Code de commerce — grande liberté statutaire, capital libre, un associé minimum (SASU).',
      'Maroc : SAS régie par la loi 19-20 modifiant la loi 17-95 — ouverte à un ou plusieurs associés sans capital minimum.'
    ),
  },
  {
    code: 'statuts_sa', name: 'Statuts de société SA', category: 'juridique_admin', price: 5000, priceMax: 10000,
    description: 'Statuts de Société Anonyme : conseil d’administration, assemblées, commissaire aux comptes.',
    fieldsJson: F([
      { key: 'denomination', label: 'Dénomination sociale', type: 'text', required: true },
      { key: 'capital', label: 'Capital social (FCFA)', type: 'text', required: true },
      { key: 'siege', label: 'Adresse du siège social', type: 'text', required: true },
      { key: 'objet', label: 'Objet social (activités)', type: 'textarea', required: true },
      { key: 'actionnaires', label: 'Actionnaires (noms + apports + nombre d’actions)', type: 'textarea', required: true },
      { key: 'administration', label: 'Mode d’administration', type: 'select', required: true, options: ['Conseil d’administration avec PDG', 'Conseil d’administration avec PCA et DG distincts', 'Administrateur général (SA unipersonnelle)'] },
      { key: 'dirigeant', label: 'Premier dirigeant (nom + adresse)', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>STATUTS — {{denomination}} SA</h1><h2>Article 1 — Forme</h2><p>Il est formé une Société Anonyme régie par la législation applicable aux sociétés commerciales et par les présents statuts.</p><h2>Article 2 — Dénomination</h2><p>La société a pour dénomination : <strong>{{denomination}} SA</strong>.</p><h2>Article 3 — Objet</h2><p>{{objet}}</p><h2>Article 4 — Siège social</h2><p>Le siège social est fixé à {{siege}}.</p><h2>Article 5 — Capital social</h2><p>Le capital social est fixé à <strong>{{capital}} FCFA</strong>, intégralement souscrit et divisé en actions réparties comme suit : {{actionnaires}}</p><h2>Article 6 — Administration</h2><p>La société est administrée selon le mode suivant : <strong>{{administration}}</strong>. Est désigné premier dirigeant : <strong>{{dirigeant}}</strong>.</p><h2>Article 7 — Assemblées générales</h2><p>L'assemblée générale ordinaire se réunit au moins une fois par an dans les six mois de la clôture de l'exercice pour statuer sur les comptes. L'assemblée générale extraordinaire est seule compétente pour modifier les statuts.</p><h2>Article 8 — Commissaire aux comptes</h2><p>Le contrôle des comptes est exercé par un ou plusieurs commissaires aux comptes désignés conformément à la loi.</p><h2>Article 9 — Affectation des résultats</h2><p>Sur le bénéfice de l'exercice, il est prélevé la dotation à la réserve légale, le solde étant réparti par l'assemblée générale.</p><h2>Article 10 — Dissolution</h2><p>La dissolution intervient dans les cas prévus par la loi ou par décision de l'assemblée générale extraordinaire ; la liquidation est effectuée conformément aux dispositions légales.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>Signatures des actionnaires fondateurs</p></div>`,
    popularity: 28,
    countriesJson: C(
      'Espace OHADA : AUSCGIE art. 385 s. — capital minimum 10 000 000 FCFA, commissaire aux comptes obligatoire.',
      'France : art. L225-1 s. Code de commerce — capital minimum 37 000 €, 2 actionnaires minimum (7 si cotée).',
      'Maroc : loi 17-95 sur la SA — capital minimum 300 000 MAD (3 000 000 MAD en cas d’appel public à l’épargne).'
    ),
  },
  {
    code: 'statuts_association', name: 'Statuts d’association', category: 'juridique_admin', price: 2000, priceMax: 5000,
    description: 'Statuts d’association à but non lucratif : objet, membres, bureau, assemblée générale.',
    fieldsJson: F([
      { key: 'denomination', label: 'Nom de l’association', type: 'text', required: true },
      { key: 'siege', label: 'Adresse du siège', type: 'text', required: true },
      { key: 'objet', label: 'But et activités de l’association', type: 'textarea', required: true },
      { key: 'membres', label: 'Catégories de membres et conditions d’adhésion', type: 'textarea', required: true },
      { key: 'cotisation', label: 'Montant de la cotisation annuelle (FCFA)', type: 'text', required: true },
      { key: 'fondateurs', label: 'Membres fondateurs (noms + fonctions au bureau)', type: 'textarea', required: true },
    ]),
    body: `<div class="contrat"><h1>STATUTS DE L'ASSOCIATION « {{denomination}} »</h1><h2>Article 1 — Constitution et dénomination</h2><p>Il est fondé entre les adhérents aux présents statuts une association à but non lucratif dénommée : <strong>{{denomination}}</strong>.</p><h2>Article 2 — Objet</h2><p>L'association a pour objet : {{objet}}</p><h2>Article 3 — Siège social</h2><p>Le siège social est fixé à {{siege}}. Il pourra être transféré sur décision du bureau.</p><h2>Article 4 — Membres</h2><p>{{membres}}</p><h2>Article 5 — Cotisations</h2><p>La cotisation annuelle est fixée à {{cotisation}} FCFA ; son montant peut être révisé par l'assemblée générale.</p><h2>Article 6 — Bureau</h2><p>L'association est dirigée par un bureau comprenant au moins un(e) Président(e), un(e) Secrétaire général(e) et un(e) Trésorier(ère), élus pour deux ans par l'assemblée générale. Bureau fondateur : {{fondateurs}}</p><h2>Article 7 — Assemblée générale</h2><p>L'assemblée générale ordinaire se réunit au moins une fois par an ; elle approuve les comptes, vote le budget et élit le bureau. Les décisions sont prises à la majorité des membres présents ou représentés.</p><h2>Article 8 — Ressources</h2><p>Les ressources de l'association comprennent les cotisations, subventions, dons et toute ressource autorisée par la loi.</p><h2>Article 9 — Dissolution</h2><p>En cas de dissolution prononcée par l'assemblée générale extraordinaire, l'actif net est dévolu à une association poursuivant un but similaire.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>Le Président — Le Secrétaire général</p></div>`,
    popularity: 52,
  },
  {
    code: 'statuts_cooperative', name: 'Statuts de société coopérative', category: 'juridique_admin', price: 3000, priceMax: 7000,
    description: 'Statuts de coopérative conformes à l’Acte uniforme OHADA relatif aux sociétés coopératives.',
    fieldsJson: F([
      { key: 'denomination', label: 'Dénomination de la coopérative', type: 'text', required: true },
      { key: 'forme', label: 'Forme', type: 'select', required: true, options: ['Société coopérative simplifiée (SCOOPS)', 'Société coopérative avec conseil d’administration (COOP-CA)'] },
      { key: 'siege', label: 'Siège social', type: 'text', required: true },
      { key: 'objet', label: 'Objet (activités : agriculture, épargne, artisanat…)', type: 'textarea', required: true },
      { key: 'capital', label: 'Capital social initial (FCFA) et valeur de la part sociale', type: 'text', required: true },
      { key: 'cooperateurs', label: 'Membres fondateurs (noms + parts souscrites)', type: 'textarea', required: true },
    ]),
    body: `<div class="contrat"><h1>STATUTS — {{denomination}}</h1><h2>Article 1 — Forme</h2><p>Il est constitué entre les soussignés une <strong>{{forme}}</strong>, régie par les principes coopératifs universels (adhésion volontaire, gestion démocratique — un membre, une voix — participation économique des membres) et la législation applicable.</p><h2>Article 2 — Dénomination</h2><p>La coopérative prend la dénomination : <strong>{{denomination}}</strong>.</p><h2>Article 3 — Siège</h2><p>Le siège social est fixé à {{siege}}.</p><h2>Article 4 — Objet</h2><p>{{objet}}</p><h2>Article 5 — Capital social</h2><p>Le capital initial, variable, est fixé à {{capital}}. Il est souscrit par les coopérateurs fondateurs : {{cooperateurs}}</p><h2>Article 6 — Adhésion, retrait, exclusion</h2><p>L'adhésion est libre et volontaire pour toute personne partageant le lien commun défini à l'objet. Le retrait est possible à tout moment moyennant préavis ; l'exclusion est prononcée par l'assemblée générale pour manquement grave.</p><h2>Article 7 — Organes</h2><p>La coopérative est administrée par un comité de gestion (ou conseil d'administration selon la forme) élu par l'assemblée générale, et contrôlée par une commission de surveillance.</p><h2>Article 8 — Excédents</h2><p>Les excédents nets sont affectés à la réserve générale, puis ristournés aux membres au prorata des opérations réalisées avec la coopérative.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>Les coopérateurs fondateurs</p></div>`,
    popularity: 22,
    countriesJson: C(
      'Espace OHADA : Acte uniforme relatif au droit des sociétés coopératives (2010) — SCOOPS : 5 membres minimum ; COOP-CA : 15 membres minimum.',
      'France : loi du 10 septembre 1947 portant statut de la coopération — formes SCOP, SCIC, coopératives agricoles.',
      'Maroc : loi 112-12 relative aux coopératives — immatriculation au registre des coopératives (ODCO).'
    ),
  },
  {
    code: 'pv_assemblee_generale', name: 'Procès-verbal d’Assemblée Générale', category: 'juridique_admin', price: 1500, priceMax: 4000,
    description: 'PV d’AG ordinaire ou extraordinaire : ordre du jour, délibérations, résolutions votées.',
    fieldsJson: F([
      { key: 'structure', label: 'Société / Association (dénomination + siège)', type: 'text', required: true },
      { key: 'type_ag', label: 'Type d’assemblée', type: 'select', required: true, options: ['Assemblée Générale Ordinaire', 'Assemblée Générale Extraordinaire', 'Assemblée Générale Mixte'] },
      { key: 'date_ag', label: 'Date de l’assemblée', type: 'date', required: true },
      { key: 'president_seance', label: 'Président de séance', type: 'text', required: true },
      { key: 'secretaire', label: 'Secrétaire de séance', type: 'text', required: true },
      { key: 'presents', label: 'Membres présents / représentés (et quorum)', type: 'textarea', required: true },
      { key: 'ordre_du_jour', label: 'Ordre du jour', type: 'textarea', required: true },
      { key: 'resolutions', label: 'Résolutions adoptées (texte + résultat des votes)', type: 'textarea', required: true },
    ]),
    body: `<div class="contrat"><h1>PROCÈS-VERBAL — {{type_ag}}</h1><p><strong>{{structure}}</strong></p><p>Le {{date_ag}}, les membres se sont réunis en {{type_ag}}, sur convocation régulière du représentant légal.</p><h2>Bureau de séance</h2><p>L'assemblée est présidée par {{president_seance}} ; {{secretaire}} est désigné(e) secrétaire de séance.</p><h2>Présences et quorum</h2><p>{{presents}}</p><p>Le quorum requis étant atteint, l'assemblée peut valablement délibérer.</p><h2>Ordre du jour</h2><p>{{ordre_du_jour}}</p><h2>Délibérations et résolutions</h2><p>{{resolutions}}</p><h2>Clôture</h2><p>L'ordre du jour étant épuisé et personne ne demandant plus la parole, la séance est levée. De tout ce qui précède, il a été dressé le présent procès-verbal, signé après lecture par le président et le secrétaire de séance.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>Le Président de séance — Le Secrétaire de séance</p></div>`,
    popularity: 46,
  },
  {
    code: 'mise_en_demeure', name: 'Mise en demeure', category: 'juridique_admin', price: 1000, priceMax: 3000,
    description: 'Lettre de mise en demeure de payer ou d’exécuter une obligation, préalable à l’action en justice.',
    fieldsJson: F([
      { key: 'expediteur', label: 'Expéditeur (nom / société + adresse)', type: 'text', required: true },
      { key: 'destinataire', label: 'Destinataire (nom / société + adresse)', type: 'text', required: true },
      { key: 'obligation', label: 'Obligation non exécutée (facture impayée, travaux, livraison…)', type: 'textarea', required: true },
      { key: 'montant', label: 'Montant réclamé (FCFA) ou prestation exigée', type: 'text', required: true },
      { key: 'fondement', label: 'Fondement (contrat du…, facture n°…, bon de commande…)', type: 'text', required: true },
      { key: 'delai', label: 'Délai accordé (ex. 8 jours)', type: 'text', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p class="align-right">{{ville}}, le {{date_jour}}</p><p><strong>{{expediteur}}</strong></p><p>À : {{destinataire}}</p><p>Lettre recommandée avec accusé de réception</p><p>Objet : <strong>MISE EN DEMEURE</strong></p><p>Madame, Monsieur,</p><p>Malgré nos relances, nous constatons que vous ne vous êtes pas acquitté(e) de l'obligation suivante : {{obligation}}</p><p>Cette obligation résulte de : {{fondement}}. Le montant dû ou la prestation exigée s'élève à : <strong>{{montant}}</strong>.</p><p>En conséquence, nous vous mettons en demeure, par la présente, de régulariser votre situation dans un délai de <strong>{{delai}}</strong> à compter de la réception de ce courrier.</p><p>À défaut d'exécution dans ce délai, nous nous verrons contraints de saisir la juridiction compétente afin d'obtenir votre condamnation, outre les intérêts moratoires courant à compter de la présente et les frais de procédure.</p><p>La présente mise en demeure fait courir les intérêts légaux et constitue le point de départ des délais prévus par la loi.</p><p>Veuillez agréer, Madame, Monsieur, l'expression de nos salutations distinguées.</p><p class="signatures">{{expediteur}}</p></div>`,
    popularity: 64,
    countriesJson: C(
      'Espace OHADA : préalable utile à l’injonction de payer (AUPSRVE art. 1 s.) — la créance doit être certaine, liquide et exigible.',
      'France : art. 1344 s. Code civil — la mise en demeure fait courir les intérêts moratoires ; tentative amiable préalable exigée pour les litiges < 5 000 €.',
      'Maroc : art. 254-255 du DOC — le débiteur est constitué en demeure par interpellation formelle.'
    ),
  },
  {
    code: 'declaration_honneur', name: 'Déclaration sur l’honneur', category: 'juridique_admin', price: 200, priceMax: 500,
    description: 'Attestation sur l’honneur personnalisable pour toute démarche administrative.',
    fieldsJson: F([
      { key: 'declarant', label: 'Déclarant (nom, date de naissance, pièce d’identité)', type: 'textarea', required: true },
      { key: 'adresse', label: 'Adresse complète', type: 'text', required: true },
      { key: 'declaration', label: 'Contenu de la déclaration (ce que vous attestez)', type: 'textarea', required: true },
      { key: 'usage', label: 'Organisme ou démarche destinataire', type: 'text', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>DÉCLARATION SUR L'HONNEUR</h1><p>Je soussigné(e), <strong>{{declarant}}</strong>, demeurant {{adresse}},</p><p>Déclare sur l'honneur :</p><p>{{declaration}}</p><p>Je suis informé(e) que toute fausse déclaration m'expose aux sanctions pénales prévues par la législation en vigueur, notamment pour faux et usage de faux, et à la restitution des avantages indûment perçus.</p><p>La présente déclaration est établie pour servir et valoir ce que de droit auprès de : {{usage}}.</p><p class="signatures">Fait à {{ville}}, le {{date_jour}}<br/><br/>Signature du déclarant (précédée de la mention « Lu et approuvé »)</p></div>`,
    popularity: 78,
  },
  {
    code: 'reconnaissance_dette', name: 'Reconnaissance de dette', category: 'juridique_admin', price: 500, priceMax: 2000,
    description: 'Acte de reconnaissance de dette avec échéancier de remboursement et intérêts éventuels.',
    fieldsJson: F([
      { key: 'debiteur', label: 'Débiteur (nom + pièce d’identité + adresse)', type: 'text', required: true },
      { key: 'creancier', label: 'Créancier (nom + pièce d’identité + adresse)', type: 'text', required: true },
      { key: 'montant', label: 'Montant de la dette en chiffres (FCFA)', type: 'text', required: true },
      { key: 'montant_lettres', label: 'Montant en toutes lettres', type: 'text', required: true },
      { key: 'origine', label: 'Origine de la dette (prêt du…, achat…)', type: 'text', required: true },
      { key: 'remboursement', label: 'Modalités de remboursement (échéancier, date limite)', type: 'textarea', required: true },
      { key: 'interets', label: 'Taux d’intérêt (ou « sans intérêt »)', type: 'text', required: false },
      { key: 'ville', label: 'Ville de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>RECONNAISSANCE DE DETTE</h1><p>Je soussigné(e), <strong>{{debiteur}}</strong>, ci-après « le Débiteur »,</p><p>Reconnais devoir à <strong>{{creancier}}</strong>, ci-après « le Créancier », la somme de <strong>{{montant}} FCFA</strong> (en toutes lettres : {{montant_lettres}}), qui m'a été remise au titre de : {{origine}}.</p><h2>Article 1 — Remboursement</h2><p>Je m'engage à rembourser cette somme selon les modalités suivantes : {{remboursement}}</p><h2>Article 2 — Intérêts</h2><p>La dette est assortie des intérêts suivants : {{interets}}. Tout retard de paiement rend immédiatement exigible le solde restant dû, après mise en demeure restée sans effet pendant huit (8) jours.</p><h2>Article 3 — Élection de domicile</h2><p>Pour l'exécution des présentes, les parties élisent domicile en leurs adresses respectives indiquées ci-dessus.</p><p class="signatures">Fait en deux exemplaires originaux à {{ville}}, le {{date_jour}}<br/><br/>Le Débiteur (mention manuscrite « Bon pour reconnaissance de dette de la somme de {{montant_lettres}} ») — Le Créancier</p></div>`,
    popularity: 70,
    countriesJson: C(
      'Espace OHADA : titre utile pour la procédure d’injonction de payer (AUPSRVE) ; légalisation des signatures recommandée.',
      'France : art. 1376 Code civil — mention manuscrite du montant en chiffres et en lettres par le débiteur exigée.',
      'Maroc : art. 190 s. du DOC — légalisation de signature auprès de la commune fortement recommandée pour la force probante.'
    ),
  },

  // ════════════════════════ COMMERCIAL & FINANCIER (10) ════════════════════════
  {
    code: 'devis_pro', name: 'Devis professionnel', category: 'commercial_financier', price: 100, priceMax: 500,
    description: 'Devis détaillé avec validité, conditions de règlement et mention d’acceptation.',
    fieldsJson: F([
      { key: 'emetteur', label: 'Votre entreprise (nom + adresse + RCCM/NIF)', type: 'textarea', required: true },
      { key: 'client', label: 'Client (nom + adresse)', type: 'textarea', required: true },
      { key: 'numero', label: 'Numéro de devis', type: 'text', required: true },
      { key: 'prestations', label: 'Prestations (désignation — quantité — prix unitaire — total)', type: 'textarea', required: true },
      { key: 'total', label: 'Montant total (FCFA)', type: 'text', required: true },
      { key: 'validite', label: 'Durée de validité du devis (ex. 30 jours)', type: 'text', required: true },
      { key: 'conditions', label: 'Conditions de règlement (acompte, délais…)', type: 'textarea', required: true },
    ]),
    body: `<div class="facture"><h1>DEVIS N° {{numero}}</h1><div class="facture-parties"><div><h3>Émetteur</h3><p>{{emetteur}}</p></div><div><h3>Client</h3><p>{{client}}</p></div></div><h2>Détail des prestations</h2><p>{{prestations}}</p><h2>Total : {{total}} FCFA</h2><h2>Conditions</h2><p>{{conditions}}</p><p>Le présent devis est valable {{validite}} à compter de sa date d'émission. Pour acceptation, le retourner daté et signé avec la mention manuscrite « Bon pour accord ».</p><p class="text-small">Devis émis le {{date_jour}}.</p><p class="signatures">Signature et cachet de l'émetteur — Signature du client (« Bon pour accord »)</p></div>`,
    popularity: 82,
  },
  {
    code: 'bon_commande', name: 'Bon de commande', category: 'commercial_financier', price: 100, priceMax: 500,
    description: 'Bon de commande formalisé : articles, quantités, prix, conditions de livraison.',
    fieldsJson: F([
      { key: 'acheteur', label: 'Acheteur (entreprise + adresse)', type: 'textarea', required: true },
      { key: 'fournisseur', label: 'Fournisseur (entreprise + adresse)', type: 'textarea', required: true },
      { key: 'numero', label: 'Numéro de commande', type: 'text', required: true },
      { key: 'articles', label: 'Articles commandés (référence — désignation — quantité — prix unitaire)', type: 'textarea', required: true },
      { key: 'total', label: 'Montant total (FCFA)', type: 'text', required: true },
      { key: 'livraison', label: 'Lieu et délai de livraison', type: 'text', required: true },
      { key: 'paiement', label: 'Conditions de paiement', type: 'text', required: true },
    ]),
    body: `<div class="facture"><h1>BON DE COMMANDE N° {{numero}}</h1><div class="facture-parties"><div><h3>Acheteur</h3><p>{{acheteur}}</p></div><div><h3>Fournisseur</h3><p>{{fournisseur}}</p></div></div><h2>Articles commandés</h2><p>{{articles}}</p><h2>Total de la commande : {{total}} FCFA</h2><p><strong>Livraison :</strong> {{livraison}}</p><p><strong>Paiement :</strong> {{paiement}}</p><p>La signature du présent bon vaut acceptation ferme de la commande aux conditions ci-dessus. Toute livraison non conforme pourra être refusée ou faire l'objet de réserves.</p><p class="text-small">Émis le {{date_jour}}.</p><p class="signatures">L'Acheteur (signature + cachet) — Le Fournisseur (acceptation)</p></div>`,
    popularity: 60,
  },
  {
    code: 'bon_livraison', name: 'Bon de livraison', category: 'commercial_financier', price: 100, priceMax: 400,
    description: 'Bon de livraison avec réserves éventuelles et signature du réceptionnaire.',
    fieldsJson: F([
      { key: 'fournisseur', label: 'Fournisseur (entreprise + adresse)', type: 'textarea', required: true },
      { key: 'client', label: 'Client livré (nom + adresse de livraison)', type: 'textarea', required: true },
      { key: 'numero', label: 'Numéro de bon de livraison', type: 'text', required: true },
      { key: 'reference_commande', label: 'Référence de la commande', type: 'text', required: true },
      { key: 'marchandises', label: 'Marchandises livrées (désignation — quantité — état)', type: 'textarea', required: true },
      { key: 'date_livraison', label: 'Date de livraison', type: 'date', required: true },
    ]),
    body: `<div class="facture"><h1>BON DE LIVRAISON N° {{numero}}</h1><div class="facture-parties"><div><h3>Fournisseur</h3><p>{{fournisseur}}</p></div><div><h3>Livré à</h3><p>{{client}}</p></div></div><p><strong>Référence commande :</strong> {{reference_commande}} — <strong>Date de livraison :</strong> {{date_livraison}}</p><h2>Marchandises livrées</h2><p>{{marchandises}}</p><p>Le réceptionnaire reconnaît avoir reçu les marchandises ci-dessus. Les réserves éventuelles (manquants, avaries) doivent être portées sur le présent bon à la livraison et confirmées par écrit dans les délais légaux, faute de quoi la livraison est réputée conforme.</p><p class="text-small">Document établi le {{date_jour}} — à conserver avec la facture correspondante.</p><p class="signatures">Le Livreur — Le Réceptionnaire (nom, signature, cachet, réserves éventuelles)</p></div>`,
    popularity: 54,
  },
  {
    code: 'contrat_distribution', name: 'Contrat de distribution', category: 'commercial_financier', price: 4000, priceMax: 9000,
    description: 'Contrat de distribution commerciale : territoire, exclusivité, objectifs, approvisionnement.',
    fieldsJson: F([
      { key: 'fournisseur', label: 'Fournisseur / Concédant (société + adresse)', type: 'text', required: true },
      { key: 'distributeur', label: 'Distributeur (société + adresse)', type: 'text', required: true },
      { key: 'produits', label: 'Produits concernés', type: 'textarea', required: true },
      { key: 'territoire', label: 'Territoire concédé', type: 'text', required: true },
      { key: 'exclusivite', label: 'Exclusivité', type: 'select', required: true, options: ['Distribution exclusive', 'Distribution sélective', 'Distribution non exclusive'] },
      { key: 'objectifs', label: 'Objectifs d’achat / de vente (quotas annuels)', type: 'textarea', required: true },
      { key: 'duree', label: 'Durée du contrat (années)', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE DISTRIBUTION</h1><p>Entre <strong>{{fournisseur}}</strong>, ci-après « le Fournisseur », et <strong>{{distributeur}}</strong>, ci-après « le Distributeur ».</p><h2>Article 1 — Objet</h2><p>Le Fournisseur confie au Distributeur, qui accepte, la distribution des produits suivants : {{produits}}</p><h2>Article 2 — Territoire et exclusivité</h2><p>La distribution est concédée sur le territoire suivant : {{territoire}}, selon le régime de <strong>{{exclusivite}}</strong>. Le Distributeur s'interdit toute vente active hors du territoire concédé.</p><h2>Article 3 — Objectifs commerciaux</h2><p>Le Distributeur s'engage à atteindre les objectifs suivants : {{objectifs}}. Le non-respect répété des objectifs, après mise en demeure, constitue un motif de résiliation.</p><h2>Article 4 — Approvisionnement et prix</h2><p>Les commandes sont passées selon les tarifs en vigueur du Fournisseur, communiqués avec un préavis raisonnable en cas de modification. Le Distributeur revend en son nom et pour son compte, fixant librement ses prix de revente.</p><h2>Article 5 — Durée et résiliation</h2><p>Le contrat est conclu pour une durée de {{duree}} ans, renouvelable par accord écrit. Chaque partie peut le résilier pour manquement grave après mise en demeure restée sans effet trente (30) jours.</p><h2>Article 6 — Indépendance et marques</h2><p>Le Distributeur est un commerçant indépendant ; il n'est ni agent ni mandataire du Fournisseur. Il utilise les marques du Fournisseur uniquement pour la commercialisation des produits.</p><p class="signatures">Fait en deux exemplaires, le {{date_jour}}<br/><br/>Le Fournisseur — Le Distributeur</p></div>`,
    popularity: 26,
    countriesJson: C(
      'Espace OHADA : vente commerciale et intermédiaires régis par l’AUDCG ; clauses d’exclusivité soumises au droit national de la concurrence.',
      'France : encadré par le droit de la concurrence (art. L420-1 s. C. com.) et le règlement UE d’exemption des accords verticaux.',
      'Maroc : liberté contractuelle du DOC sous réserve de la loi 104-12 sur la liberté des prix et de la concurrence.'
    ),
  },
  {
    code: 'contrat_agent_commercial', name: 'Contrat d’agent commercial', category: 'commercial_financier', price: 3000, priceMax: 8000,
    description: 'Mandat d’agent commercial : prospection, commissions, secteur, indemnité de rupture.',
    fieldsJson: F([
      { key: 'mandant', label: 'Mandant (société + adresse)', type: 'text', required: true },
      { key: 'agent', label: 'Agent commercial (nom / société + adresse)', type: 'text', required: true },
      { key: 'produits', label: 'Produits ou services à promouvoir', type: 'textarea', required: true },
      { key: 'secteur', label: 'Secteur géographique / clientèle confiée', type: 'text', required: true },
      { key: 'commission', label: 'Taux de commission (% du CA encaissé)', type: 'text', required: true },
      { key: 'duree', label: 'Durée (déterminée ou indéterminée)', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT D'AGENT COMMERCIAL</h1><p>Entre <strong>{{mandant}}</strong>, ci-après « le Mandant », et <strong>{{agent}}</strong>, ci-après « l'Agent », mandataire professionnel indépendant.</p><h2>Article 1 — Mission</h2><p>Le Mandant confie à l'Agent, à titre permanent, la négociation et, le cas échéant, la conclusion de contrats de vente portant sur : {{produits}}</p><h2>Article 2 — Secteur</h2><p>L'Agent exerce sa mission sur le secteur suivant : {{secteur}}. Toute modification du secteur fait l'objet d'un avenant.</p><h2>Article 3 — Obligations de l'Agent</h2><p>L'Agent prospecte la clientèle en bon professionnel, transmet les commandes sans délai, informe le Mandant de l'état du marché et s'interdit de représenter des produits directement concurrents sans accord écrit.</p><h2>Article 4 — Commissions</h2><p>L'Agent perçoit une commission de <strong>{{commission}}</strong> sur le montant hors taxes des affaires conclues par son entremise et encaissées par le Mandant. Les commissions sont arrêtées et réglées mensuellement, avec relevé détaillé.</p><h2>Article 5 — Durée et cessation</h2><p>Le contrat est conclu pour la durée suivante : {{duree}}. En cas de cessation du contrat à l'initiative du Mandant hors faute grave, l'Agent a droit à l'indemnité compensatrice prévue par la loi applicable.</p><p class="signatures">Fait en deux exemplaires, le {{date_jour}}<br/><br/>Le Mandant — L'Agent commercial</p></div>`,
    popularity: 24,
    countriesJson: C(
      'Espace OHADA : agent commercial régi par l’AUDCG (art. 216 s.) — mandataire professionnel indépendant, droit à indemnité en fin de contrat.',
      'France : art. L134-1 s. Code de commerce — indemnité de cessation d’usage égale à deux ans de commissions.',
      'Maroc : art. 393 s. du Code de commerce (loi 15-95) — statut du courtier et de l’agent commercial.'
    ),
  },
  {
    code: 'business_plan', name: 'Business Plan structuré', category: 'commercial_financier', price: 5000, priceMax: 10000,
    description: 'Business plan complet : résumé exécutif, marché, stratégie, prévisions financières sur 3 ans.',
    fieldsJson: F([
      { key: 'projet', label: 'Nom du projet / de l’entreprise', type: 'text', required: true },
      { key: 'porteur', label: 'Porteur(s) de projet (noms + parcours)', type: 'textarea', required: true },
      { key: 'resume', label: 'Résumé exécutif (activité, proposition de valeur)', type: 'textarea', required: true },
      { key: 'marche', label: 'Analyse du marché (cible, taille, concurrence)', type: 'textarea', required: true },
      { key: 'strategie', label: 'Stratégie commerciale et marketing', type: 'textarea', required: true },
      { key: 'previsions', label: 'Prévisions financières sur 3 ans (CA, charges, résultat)', type: 'textarea', required: true },
      { key: 'financement', label: 'Besoin de financement et utilisation des fonds', type: 'textarea', required: true },
    ]),
    body: `<div class="contrat"><h1>BUSINESS PLAN — {{projet}}</h1><p class="text-small">Document confidentiel établi le {{date_jour}}.</p><h2>1. Résumé exécutif</h2><p>{{resume}}</p><h2>2. Porteurs du projet</h2><p>{{porteur}}</p><h2>3. Analyse du marché</h2><p>{{marche}}</p><h2>4. Stratégie commerciale et marketing</h2><p>{{strategie}}</p><h2>5. Prévisions financières (3 ans)</h2><p>{{previsions}}</p><h2>6. Besoin de financement</h2><p>{{financement}}</p><h2>7. Conclusion</h2><p>Le présent business plan démontre la viabilité économique du projet {{projet}} et constitue la base des échanges avec les partenaires financiers et investisseurs. Les hypothèses retenues sont prudentes et documentées ; elles seront actualisées à chaque étape clé du développement.</p><p class="signatures">{{porteur}}</p></div>`,
    popularity: 74,
  },
  {
    code: 'appel_offres', name: 'Appel d’offres / cahier des charges', category: 'commercial_financier', price: 3000, priceMax: 8000,
    description: 'Dossier d’appel d’offres : objet, cahier des charges, critères de sélection, calendrier.',
    fieldsJson: F([
      { key: 'organisme', label: 'Organisme émetteur (nom + adresse + contact)', type: 'textarea', required: true },
      { key: 'reference', label: 'Référence de l’appel d’offres', type: 'text', required: true },
      { key: 'objet', label: 'Objet du marché (travaux, fournitures, services)', type: 'textarea', required: true },
      { key: 'cahier_charges', label: 'Cahier des charges (spécifications techniques, livrables)', type: 'textarea', required: true },
      { key: 'criteres', label: 'Critères de sélection et pondération', type: 'textarea', required: true },
      { key: 'date_limite', label: 'Date limite de dépôt des offres', type: 'date', required: true },
      { key: 'modalites', label: 'Modalités de remise des offres', type: 'textarea', required: true },
    ]),
    body: `<div class="contrat"><h1>APPEL D'OFFRES N° {{reference}}</h1><p><strong>{{organisme}}</strong></p><h2>Article 1 — Objet de la consultation</h2><p>{{objet}}</p><h2>Article 2 — Cahier des charges</h2><p>{{cahier_charges}}</p><h2>Article 3 — Conditions de participation</h2><p>Peuvent soumissionner les candidats en règle vis-à-vis des administrations fiscales et sociales, disposant des capacités techniques et financières requises. Chaque candidat joint à son offre : présentation de l'entreprise, références similaires, offre technique et offre financière sous plis séparés.</p><h2>Article 4 — Critères d'évaluation</h2><p>{{criteres}}</p><h2>Article 5 — Calendrier et remise des offres</h2><p>Les offres doivent parvenir au plus tard le <strong>{{date_limite}}</strong>, selon les modalités suivantes : {{modalites}}</p><h2>Article 6 — Réserves</h2><p>L'organisme émetteur se réserve le droit de ne pas donner suite à la consultation, sans indemnité pour les soumissionnaires. Les offres restent valables quatre-vingt-dix (90) jours à compter de la date limite de dépôt.</p><p class="text-small">Publié le {{date_jour}}.</p></div>`,
    popularity: 20,
  },
  {
    code: 'convention_partenariat', name: 'Convention de partenariat', category: 'commercial_financier', price: 2000, priceMax: 6000,
    description: 'Convention cadre de partenariat : engagements réciproques, gouvernance, durée.',
    fieldsJson: F([
      { key: 'partenaire1', label: 'Premier partenaire (structure + représentant)', type: 'text', required: true },
      { key: 'partenaire2', label: 'Second partenaire (structure + représentant)', type: 'text', required: true },
      { key: 'objet', label: 'Objet du partenariat', type: 'textarea', required: true },
      { key: 'engagements1', label: 'Engagements du premier partenaire', type: 'textarea', required: true },
      { key: 'engagements2', label: 'Engagements du second partenaire', type: 'textarea', required: true },
      { key: 'duree', label: 'Durée de la convention', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONVENTION DE PARTENARIAT</h1><p>Entre <strong>{{partenaire1}}</strong>, ci-après « le Partenaire 1 », et <strong>{{partenaire2}}</strong>, ci-après « le Partenaire 2 », ensemble « les Parties ».</p><h2>Article 1 — Objet</h2><p>La présente convention a pour objet de définir le cadre de collaboration suivant : {{objet}}</p><h2>Article 2 — Engagements du Partenaire 1</h2><p>{{engagements1}}</p><h2>Article 3 — Engagements du Partenaire 2</h2><p>{{engagements2}}</p><h2>Article 4 — Gouvernance</h2><p>Un comité de suivi, composé d'un représentant de chaque Partie, se réunit au moins une fois par semestre pour évaluer l'exécution de la convention et arbitrer les difficultés éventuelles.</p><h2>Article 5 — Communication</h2><p>Toute communication publique relative au partenariat (logos, communiqués) requiert l'accord préalable écrit des deux Parties.</p><h2>Article 6 — Durée et résiliation</h2><p>La convention est conclue pour une durée de {{duree}} à compter de sa signature. Chaque Partie peut la résilier moyennant un préavis écrit de trois (3) mois, ou sans préavis en cas de manquement grave non réparé dans les trente (30) jours d'une mise en demeure.</p><h2>Article 7 — Indépendance</h2><p>La convention ne crée ni société, ni mandat, ni lien de subordination entre les Parties, chacune conservant sa pleine autonomie juridique et financière.</p><p class="signatures">Fait en deux exemplaires, le {{date_jour}}<br/><br/>Le Partenaire 1 — Le Partenaire 2</p></div>`,
    popularity: 38,
  },
  {
    code: 'cgv', name: 'Conditions générales de vente (CGV)', category: 'commercial_financier', price: 2000, priceMax: 6000,
    description: 'CGV complètes : commande, prix, paiement, livraison, garanties, responsabilité, litiges.',
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise (raison sociale + RCCM/NIF + adresse + contact)', type: 'textarea', required: true },
      { key: 'activite', label: 'Produits ou services vendus', type: 'textarea', required: true },
      { key: 'prix_paiement', label: 'Prix et modalités de paiement (délais, pénalités)', type: 'textarea', required: true },
      { key: 'livraison', label: 'Modalités de livraison / d’exécution', type: 'textarea', required: true },
      { key: 'retractation', label: 'Politique de retour / rétractation / remboursement', type: 'textarea', required: true },
      { key: 'juridiction', label: 'Droit applicable et juridiction compétente', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONDITIONS GÉNÉRALES DE VENTE</h1><p><strong>{{entreprise}}</strong></p><h2>Article 1 — Champ d'application</h2><p>Les présentes CGV s'appliquent, sans restriction ni réserve, à toute vente des produits et services suivants : {{activite}}. Toute commande implique l'acceptation pleine et entière des présentes CGV, qui prévalent sur tout autre document de l'acheteur.</p><h2>Article 2 — Commandes</h2><p>Les commandes ne sont définitives qu'après confirmation écrite du vendeur et, le cas échéant, encaissement de l'acompte. Toute modification demandée par l'acheteur est soumise à l'acceptation du vendeur.</p><h2>Article 3 — Prix et paiement</h2><p>{{prix_paiement}}</p><p>Tout retard de paiement entraîne de plein droit l'application de pénalités de retard au taux légal ainsi que la suspension des commandes en cours.</p><h2>Article 4 — Livraison et exécution</h2><p>{{livraison}}</p><p>Les délais sont donnés à titre indicatif ; leur dépassement raisonnable ne peut donner lieu à annulation ni dommages-intérêts, sauf stipulation contraire.</p><h2>Article 5 — Retours et remboursements</h2><p>{{retractation}}</p><h2>Article 6 — Garanties et responsabilité</h2><p>Le vendeur garantit la conformité des produits et services aux spécifications convenues. Sa responsabilité est limitée au montant de la commande concernée, hors dommages indirects.</p><h2>Article 7 — Réserve de propriété</h2><p>Le vendeur conserve la propriété des biens vendus jusqu'au paiement intégral du prix.</p><h2>Article 8 — Droit applicable et litiges</h2><p>{{juridiction}}. Les parties rechercheront une solution amiable avant toute action contentieuse.</p><p class="text-small">CGV en vigueur au {{date_jour}}.</p></div>`,
    popularity: 45,
    countriesJson: C(
      'Espace OHADA : vente commerciale régie par l’AUDCG (Livre VIII) ; mentions RCCM et NIF obligatoires sur les documents commerciaux.',
      'France : communication des CGV obligatoire entre professionnels (art. L441-1 C. com.) ; droit de rétractation de 14 jours en vente à distance aux consommateurs.',
      'Maroc : loi 31-08 édictant des mesures de protection du consommateur — droit de rétractation de 7 jours en vente à distance.'
    ),
  },
  {
    code: 'contrat_prestation', name: 'Contrat de prestation de services', category: 'commercial_financier', price: 2000, priceMax: 6000,
    description: 'Contrat de prestation B2B : périmètre, prix, délais, garanties, responsabilité, résiliation.',
    fieldsJson: F([
      { key: 'prestataire', label: 'Prestataire (société + adresse + RCCM)', type: 'text', required: true },
      { key: 'client', label: 'Client (société + adresse)', type: 'text', required: true },
      { key: 'prestations', label: 'Description des prestations et livrables', type: 'textarea', required: true },
      { key: 'prix', label: 'Prix (montant, échéancier de facturation)', type: 'textarea', required: true },
      { key: 'delais', label: 'Délais d’exécution', type: 'text', required: true },
      { key: 'duree', label: 'Durée du contrat', type: 'text', required: true },
      { key: 'ville', label: 'Ville de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE PRESTATION DE SERVICES</h1><p>Entre <strong>{{prestataire}}</strong>, ci-après « le Prestataire », et <strong>{{client}}</strong>, ci-après « le Client ».</p><h2>Article 1 — Objet</h2><p>Le Client confie au Prestataire, qui accepte, la réalisation des prestations suivantes : {{prestations}}</p><h2>Article 2 — Prix et facturation</h2><p>{{prix}}</p><p>Les factures sont payables à réception sauf stipulation contraire ; tout retard entraîne pénalités au taux légal et suspension possible des prestations après mise en demeure.</p><h2>Article 3 — Délais</h2><p>Les prestations seront exécutées dans les délais suivants : {{delais}}, sous réserve de la collaboration active du Client (transmission des informations, validations).</p><h2>Article 4 — Obligations des parties</h2><p>Le Prestataire exécute les prestations avec diligence et selon les règles de l'art (obligation de moyens sauf stipulation expresse). Le Client fournit en temps utile toutes les informations nécessaires et procède aux validations demandées.</p><h2>Article 5 — Confidentialité</h2><p>Chaque partie s'engage à conserver confidentielles les informations de l'autre partie, pendant la durée du contrat et cinq (5) ans après son terme.</p><h2>Article 6 — Responsabilité</h2><p>La responsabilité du Prestataire est plafonnée au montant total effectivement payé par le Client au titre du contrat, à l'exclusion de tout dommage indirect.</p><h2>Article 7 — Durée et résiliation</h2><p>Le contrat est conclu pour : {{duree}}. Chaque partie peut le résilier en cas de manquement grave non réparé dans les trente (30) jours d'une mise en demeure écrite.</p><p class="signatures">Fait en deux exemplaires à {{ville}}, le {{date_jour}}<br/><br/>Le Prestataire — Le Client</p></div>`,
    popularity: 67,
    countriesJson: C(
      'Espace OHADA : contrat régi par le droit national des obligations et l’AUDCG pour les aspects commerciaux.',
      'France : art. 1710 Code civil (louage d’ouvrage) — distinguer obligation de moyens et de résultat.',
      'Maroc : contrat de louage d’ouvrage régi par les art. 723 s. du DOC.'
    ),
  },

  // ════════════════════════ ACADÉMIQUE (6) ════════════════════════
  {
    code: 'demande_bourse', name: 'Demande de bourse d’études', category: 'academique', price: 200, priceMax: 800,
    description: 'Lettre de demande de bourse argumentée : parcours, mérite, situation, projet d’études.',
    fieldsJson: F([
      { key: 'nom_complet', label: 'Votre nom complet', type: 'text', required: true },
      { key: 'formation', label: 'Formation actuelle ou visée', type: 'text', required: true },
      { key: 'etablissement', label: 'Établissement', type: 'text', required: true },
      { key: 'organisme', label: 'Organisme sollicité (fondation, ministère, université…)', type: 'text', required: true },
      { key: 'parcours', label: 'Résultats et mérites académiques', type: 'textarea', required: true },
      { key: 'situation', label: 'Situation financière et familiale (motifs de la demande)', type: 'textarea', required: true },
      { key: 'projet', label: 'Projet d’études et professionnel', type: 'textarea', required: true },
    ]),
    body: `<div class="lettre"><p class="align-right">Le {{date_jour}}</p><p><strong>{{nom_complet}}</strong><br/>{{formation}} — {{etablissement}}</p><p>À l'attention de {{organisme}}</p><p>Objet : Demande de bourse d'études</p><p>Madame, Monsieur,</p><p>Actuellement inscrit(e) en {{formation}} à {{etablissement}}, je sollicite respectueusement l'attribution d'une bourse d'études auprès de votre organisme.</p><p><strong>Mon parcours académique :</strong> {{parcours}}</p><p><strong>Ma situation :</strong> {{situation}}</p><p><strong>Mon projet :</strong> {{projet}}</p><p>Cette bourse me permettrait de poursuivre mes études dans de bonnes conditions et de concrétiser ce projet. Je joins à la présente l'ensemble des pièces justificatives requises et me tiens à votre disposition pour tout entretien.</p><p>Je vous prie d'agréer, Madame, Monsieur, l'expression de ma haute considération.</p><p class="align-right"><strong>{{nom_complet}}</strong></p></div>`,
    popularity: 76,
  },
  {
    code: 'lettre_universite', name: 'Lettre de motivation université', category: 'academique', price: 200, priceMax: 800,
    description: 'Lettre de motivation pour une candidature en école ou université, adaptée au pays cible.',
    fieldsJson: F([
      { key: 'nom_complet', label: 'Votre nom complet', type: 'text', required: true },
      { key: 'diplome_actuel', label: 'Dernier diplôme obtenu ou en cours', type: 'text', required: true },
      { key: 'programme', label: 'Programme visé (licence, master…)', type: 'text', required: true },
      { key: 'universite', label: 'Université / école visée (nom + pays)', type: 'text', required: true },
      { key: 'motivation', label: 'Pourquoi ce programme et cette université', type: 'textarea', required: true },
      { key: 'atouts', label: 'Vos atouts académiques et extra-académiques', type: 'textarea', required: true },
      { key: 'projet', label: 'Projet professionnel après le diplôme', type: 'textarea', required: true },
    ]),
    body: `<div class="lettre"><p class="align-right">Le {{date_jour}}</p><p><strong>{{nom_complet}}</strong><br/>{{diplome_actuel}}</p><p>À la commission d'admission — {{universite}}</p><p>Objet : Candidature au programme {{programme}}</p><p>Madame, Monsieur,</p><p>Titulaire de {{diplome_actuel}}, je souhaite intégrer le programme <strong>{{programme}}</strong> au sein de {{universite}}.</p><p>{{motivation}}</p><p>{{atouts}}</p><p><strong>Mon projet professionnel :</strong> {{projet}}</p><p>Convaincu(e) que votre établissement constitue le cadre idéal pour mener à bien ce projet, je serais honoré(e) de pouvoir défendre ma candidature lors d'un entretien.</p><p>Je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations respectueuses.</p><p class="align-right"><strong>{{nom_complet}}</strong></p></div>`,
    popularity: 71,
  },
  {
    code: 'cv_academique', name: 'CV académique', category: 'academique', price: 500, priceMax: 1500,
    description: 'CV académique : formation, publications, enseignements, communications, distinctions.',
    fieldsJson: F([
      { key: 'nom_complet', label: 'Nom complet', type: 'text', required: true },
      { key: 'titre', label: 'Titre / statut (doctorant, enseignant-chercheur…)', type: 'text', required: true },
      { key: 'email', label: 'Email', type: 'email', required: true },
      { key: 'formations', label: 'Formation et diplômes (avec mentions)', type: 'textarea', required: true },
      { key: 'recherche', label: 'Travaux de recherche et publications', type: 'textarea', required: true },
      { key: 'enseignements', label: 'Expériences d’enseignement', type: 'textarea', required: false },
      { key: 'distinctions', label: 'Bourses, prix et distinctions', type: 'textarea', required: false },
      { key: 'langues', label: 'Langues et niveau', type: 'text', required: false },
    ]),
    body: `<div class="cv"><header><h1>{{nom_complet}}</h1><p class="cv-title">{{titre}}</p><p class="cv-contact">{{email}}</p></header><section><h2>Formation</h2><p>{{formations}}</p></section><section><h2>Recherche et publications</h2><p>{{recherche}}</p></section><section><h2>Enseignement</h2><p>{{enseignements}}</p></section><section><h2>Bourses, prix et distinctions</h2><p>{{distinctions}}</p></section><section><h2>Langues</h2><p>{{langues}}</p></section></div>`,
    popularity: 47,
  },
  {
    code: 'attestation_scolarite', name: 'Attestation de scolarité', category: 'academique', price: 150, priceMax: 400,
    description: 'Attestation d’inscription et de fréquentation délivrée par un établissement scolaire ou universitaire.',
    fieldsJson: F([
      { key: 'etablissement', label: 'Établissement (nom + adresse)', type: 'textarea', required: true },
      { key: 'responsable', label: 'Signataire (nom + fonction : directeur, proviseur…)', type: 'text', required: true },
      { key: 'etudiant', label: 'Élève / Étudiant (nom complet + date de naissance)', type: 'text', required: true },
      { key: 'matricule', label: 'Numéro matricule', type: 'text', required: false },
      { key: 'classe', label: 'Classe / niveau / filière', type: 'text', required: true },
      { key: 'annee', label: 'Année scolaire ou universitaire (ex. 2025-2026)', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>ATTESTATION DE SCOLARITÉ</h1><p><strong>{{etablissement}}</strong></p><p>Je soussigné(e), {{responsable}}, atteste que :</p><p><strong>{{etudiant}}</strong>, matricule {{matricule}}, est régulièrement inscrit(e) et fréquente notre établissement en classe de <strong>{{classe}}</strong> au titre de l'année {{annee}}.</p><p>La présente attestation est délivrée à l'intéressé(e), sur sa demande, pour servir et valoir ce que de droit.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>{{responsable}}<br/>(signature et cachet de l'établissement)</p></div>`,
    popularity: 56,
  },
  {
    code: 'projet_etude', name: 'Projet d’étude', category: 'academique', price: 500, priceMax: 2000,
    description: 'Projet d’étude structuré pour candidature, visa étudiant ou demande de financement.',
    fieldsJson: F([
      { key: 'nom_complet', label: 'Votre nom complet', type: 'text', required: true },
      { key: 'parcours', label: 'Parcours académique antérieur', type: 'textarea', required: true },
      { key: 'programme', label: 'Programme et établissement visés', type: 'text', required: true },
      { key: 'objectifs', label: 'Objectifs académiques du projet', type: 'textarea', required: true },
      { key: 'methodologie', label: 'Déroulement prévu (matières, stages, mémoire…)', type: 'textarea', required: true },
      { key: 'perspectives', label: 'Perspectives professionnelles et retour au pays', type: 'textarea', required: true },
    ]),
    body: `<div class="contrat"><h1>PROJET D'ÉTUDE</h1><p><strong>{{nom_complet}}</strong> — établi le {{date_jour}}</p><h2>1. Parcours académique</h2><p>{{parcours}}</p><h2>2. Programme visé</h2><p>{{programme}}</p><h2>3. Objectifs du projet d'étude</h2><p>{{objectifs}}</p><h2>4. Déroulement prévu</h2><p>{{methodologie}}</p><h2>5. Perspectives professionnelles</h2><p>{{perspectives}}</p><h2>6. Conclusion</h2><p>Ce projet d'étude s'inscrit dans un parcours cohérent et réfléchi. La formation visée constitue l'étape déterminante pour atteindre mes objectifs professionnels, et je m'engage à m'y consacrer avec sérieux et assiduité.</p><p class="signatures">{{nom_complet}}</p></div>`,
    popularity: 41,
  },
  {
    code: 'lettre_recommandation_academique', name: 'Lettre de recommandation académique', category: 'academique', price: 300, priceMax: 1000,
    description: 'Recommandation d’un professeur ou directeur de recherche pour une candidature académique.',
    fieldsJson: F([
      { key: 'professeur', label: 'Professeur recommandant (nom + titre)', type: 'text', required: true },
      { key: 'institution', label: 'Institution du recommandant', type: 'text', required: true },
      { key: 'etudiant', label: 'Étudiant(e) recommandé(e)', type: 'text', required: true },
      { key: 'contexte', label: 'Contexte (cours suivis, encadrement, durée)', type: 'textarea', required: true },
      { key: 'qualites', label: 'Qualités académiques et résultats observés', type: 'textarea', required: true },
      { key: 'programme_vise', label: 'Programme ou bourse visé(e)', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p class="align-right">Le {{date_jour}}</p><p><strong>{{professeur}}</strong><br/>{{institution}}</p><p>Objet : Lettre de recommandation — {{etudiant}}</p><p>Madame, Monsieur,</p><p>C'est avec plaisir que je recommande {{etudiant}} pour {{programme_vise}}.</p><p>{{contexte}}</p><p>{{qualites}}</p><p>Au regard de ces éléments, je suis convaincu(e) que {{etudiant}} possède les aptitudes intellectuelles, la rigueur et la motivation nécessaires pour réussir pleinement dans le programme visé. Je le/la recommande donc sans aucune réserve.</p><p>Je reste à votre disposition pour tout échange complémentaire.</p><p class="signatures">{{professeur}}<br/>{{institution}}</p></div>`,
    popularity: 49,
  },

  // ════════════════════════ SANTÉ (4) ════════════════════════
  {
    code: 'ordonnance_type', name: 'Ordonnance médicale type', category: 'sante', price: 500, priceMax: 1500,
    description: 'Modèle d’ordonnance pour praticiens : en-tête professionnel, prescriptions, posologie.',
    fieldsJson: F([
      { key: 'praticien', label: 'Praticien (nom, titre, spécialité)', type: 'text', required: true },
      { key: 'structure', label: 'Structure (cabinet / clinique + adresse + n° ordre)', type: 'textarea', required: true },
      { key: 'patient', label: 'Patient (nom, prénom, âge)', type: 'text', required: true },
      { key: 'prescriptions', label: 'Prescriptions (médicament — dosage — posologie — durée)', type: 'textarea', required: true },
      { key: 'recommandations', label: 'Recommandations complémentaires', type: 'textarea', required: false },
    ]),
    body: `<div class="contrat"><h1>ORDONNANCE MÉDICALE</h1><p><strong>{{praticien}}</strong><br/>{{structure}}</p><p class="align-right">Le {{date_jour}}</p><p><strong>Patient :</strong> {{patient}}</p><h2>Prescriptions</h2><p>{{prescriptions}}</p><h2>Recommandations</h2><p>{{recommandations}}</p><p class="signatures">Signature et cachet du praticien</p>${SANTE_DISCLAIMER}</div>`,
    popularity: 34,
  },
  {
    code: 'consentement_eclaire', name: 'Consentement éclairé patient', category: 'sante', price: 1000, priceMax: 3000,
    description: 'Formulaire de consentement éclairé avant acte médical : information, risques, accord du patient.',
    fieldsJson: F([
      { key: 'structure', label: 'Structure de soins (nom + adresse)', type: 'textarea', required: true },
      { key: 'praticien', label: 'Praticien responsable (nom + spécialité)', type: 'text', required: true },
      { key: 'patient', label: 'Patient (nom, prénom, date de naissance)', type: 'text', required: true },
      { key: 'acte', label: 'Acte ou intervention proposé(e)', type: 'textarea', required: true },
      { key: 'benefices_risques', label: 'Bénéfices attendus et risques expliqués', type: 'textarea', required: true },
      { key: 'alternatives', label: 'Alternatives thérapeutiques présentées', type: 'textarea', required: false },
    ]),
    body: `<div class="contrat"><h1>FORMULAIRE DE CONSENTEMENT ÉCLAIRÉ</h1><p><strong>{{structure}}</strong></p><p><strong>Praticien :</strong> {{praticien}}<br/><strong>Patient :</strong> {{patient}}</p><h2>1. Acte proposé</h2><p>{{acte}}</p><h2>2. Information délivrée</h2><p>Le praticien m'a expliqué, dans un langage clair et compréhensible, la nature de l'acte proposé, ses bénéfices attendus et ses risques : {{benefices_risques}}</p><h2>3. Alternatives</h2><p>{{alternatives}}</p><h2>4. Consentement</h2><p>Je reconnais avoir reçu une information complète et loyale, avoir pu poser toutes mes questions et avoir obtenu des réponses satisfaisantes. Je dispose du droit de retirer mon consentement à tout moment.</p><p>En conséquence, je consens librement et de manière éclairée à la réalisation de l'acte décrit ci-dessus.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>Le Patient (ou son représentant légal) — Le Praticien</p>${SANTE_DISCLAIMER}</div>`,
    popularity: 27,
  },
  {
    code: 'compte_rendu_consultation', name: 'Compte-rendu de consultation', category: 'sante', price: 500, priceMax: 1500,
    description: 'Compte-rendu médical structuré : motif, examen clinique, diagnostic, conduite à tenir.',
    fieldsJson: F([
      { key: 'praticien', label: 'Praticien (nom + spécialité + structure)', type: 'textarea', required: true },
      { key: 'patient', label: 'Patient (nom, prénom, âge, sexe)', type: 'text', required: true },
      { key: 'motif', label: 'Motif de la consultation', type: 'textarea', required: true },
      { key: 'examen', label: 'Examen clinique (constantes, observations)', type: 'textarea', required: true },
      { key: 'diagnostic', label: 'Diagnostic retenu ou hypothèses', type: 'textarea', required: true },
      { key: 'conduite', label: 'Conduite à tenir (traitement, examens, suivi)', type: 'textarea', required: true },
    ]),
    body: `<div class="contrat"><h1>COMPTE-RENDU DE CONSULTATION</h1><p><strong>{{praticien}}</strong></p><p class="align-right">Consultation du {{date_jour}}</p><p><strong>Patient :</strong> {{patient}}</p><h2>Motif de consultation</h2><p>{{motif}}</p><h2>Examen clinique</h2><p>{{examen}}</p><h2>Diagnostic</h2><p>{{diagnostic}}</p><h2>Conduite à tenir</h2><p>{{conduite}}</p><p class="signatures">Signature et cachet du praticien</p>${SANTE_DISCLAIMER}</div>`,
    popularity: 23,
  },
  {
    code: 'certificat_medical_type', name: 'Certificat médical type', category: 'sante', price: 300, priceMax: 1000,
    description: 'Certificat médical (aptitude, repos, constatation) à compléter par un praticien habilité.',
    fieldsJson: F([
      { key: 'praticien', label: 'Praticien (nom + titre + n° ordre + structure)', type: 'textarea', required: true },
      { key: 'patient', label: 'Patient (nom, prénom, date de naissance)', type: 'text', required: true },
      { key: 'type_certificat', label: 'Type de certificat', type: 'select', required: true, options: ['Aptitude au travail', 'Aptitude à la pratique sportive', 'Repos médical', 'Constatation de blessures'] },
      { key: 'constatations', label: 'Constatations médicales', type: 'textarea', required: true },
      { key: 'duree', label: 'Durée (repos, validité…) le cas échéant', type: 'text', required: false },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CERTIFICAT MÉDICAL</h1><p><strong>{{praticien}}</strong></p><p>Je soussigné(e), certifie avoir examiné ce jour :</p><p><strong>{{patient}}</strong></p><p><strong>Objet :</strong> {{type_certificat}}</p><h2>Constatations</h2><p>{{constatations}}</p><p><strong>Durée / validité :</strong> {{duree}}</p><p>Certificat établi à la demande de l'intéressé(e) et remis en main propre pour servir et valoir ce que de droit, sous réserve des règles de déontologie médicale.</p><p class="signatures">Fait à {{ville}}, le {{date_jour}}<br/><br/>Signature et cachet du praticien</p>${SANTE_DISCLAIMER}</div>`,
    popularity: 36,
  },

  // ════════════════════════ IMMOBILIER (5) ════════════════════════
  {
    code: 'bail_commercial', name: 'Contrat de bail commercial', category: 'immobilier', price: 2000, priceMax: 6000,
    description: 'Bail à usage professionnel ou commercial : destination, loyer, révision, renouvellement.',
    fieldsJson: F([
      { key: 'bailleur', label: 'Bailleur (nom / société + adresse)', type: 'text', required: true },
      { key: 'preneur', label: 'Preneur (nom / société + RCCM + adresse)', type: 'text', required: true },
      { key: 'local', label: 'Local loué (adresse, superficie, description)', type: 'textarea', required: true },
      { key: 'destination', label: 'Activité autorisée (destination des lieux)', type: 'text', required: true },
      { key: 'loyer', label: 'Loyer mensuel (FCFA)', type: 'text', required: true },
      { key: 'caution', label: 'Dépôt de garantie / avances (FCFA)', type: 'text', required: true },
      { key: 'duree', label: 'Durée du bail (années)', type: 'text', required: true },
      { key: 'date_effet', label: 'Date de prise d’effet', type: 'date', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE BAIL À USAGE COMMERCIAL</h1><p>Entre <strong>{{bailleur}}</strong>, ci-après « le Bailleur », et <strong>{{preneur}}</strong>, ci-après « le Preneur ».</p><h2>Article 1 — Désignation des locaux</h2><p>Le Bailleur donne à bail au Preneur les locaux suivants : {{local}}</p><h2>Article 2 — Destination</h2><p>Les locaux sont exclusivement destinés à l'exercice de l'activité suivante : {{destination}}. Tout changement de destination requiert l'accord écrit préalable du Bailleur.</p><h2>Article 3 — Durée</h2><p>Le bail est consenti pour une durée de {{duree}} ans à compter du {{date_effet}}, renouvelable dans les conditions prévues par la législation applicable, qui reconnaît au Preneur un droit au renouvellement.</p><h2>Article 4 — Loyer et dépôt de garantie</h2><p>Le loyer mensuel est fixé à <strong>{{loyer}} FCFA</strong>, payable d'avance. Un dépôt de garantie de {{caution}} FCFA est versé à la signature, restituable en fin de bail déduction faite des sommes dues.</p><h2>Article 5 — Charges et entretien</h2><p>Le Preneur supporte les charges locatives et l'entretien courant ; les grosses réparations demeurent à la charge du Bailleur.</p><h2>Article 6 — Cession et sous-location</h2><p>La cession du bail est libre avec le fonds de commerce ; la sous-location requiert l'accord écrit du Bailleur.</p><h2>Article 7 — Résiliation</h2><p>À défaut de paiement du loyer ou de respect des clauses du bail, et un (1) mois après une mise en demeure demeurée infructueuse, le bail pourra être résilié dans les conditions légales.</p><p class="signatures">Fait en deux exemplaires, le {{date_jour}}<br/><br/>Le Bailleur — Le Preneur</p></div>`,
    popularity: 55,
    countriesJson: C(
      'Espace OHADA : bail à usage professionnel régi par l’AUDCG (art. 101 s.) — droit au renouvellement après 2 ans d’exploitation.',
      'France : statut des baux commerciaux (art. L145-1 s. C. com.) — durée minimale 9 ans, plafonnement des loyers, indemnité d’éviction.',
      'Maroc : loi 49-16 relative aux baux d’immeubles à usage commercial — droit au renouvellement et indemnité d’éviction.'
    ),
  },
  {
    code: 'etat_des_lieux', name: 'État des lieux', category: 'immobilier', price: 500, priceMax: 1500,
    description: 'État des lieux d’entrée ou de sortie, pièce par pièce, avec relevés des compteurs.',
    fieldsJson: F([
      { key: 'type_edl', label: 'Type d’état des lieux', type: 'select', required: true, options: ['État des lieux d’entrée', 'État des lieux de sortie'] },
      { key: 'bailleur', label: 'Bailleur (nom)', type: 'text', required: true },
      { key: 'locataire', label: 'Locataire (nom)', type: 'text', required: true },
      { key: 'adresse_bien', label: 'Adresse du bien', type: 'text', required: true },
      { key: 'description_pieces', label: 'Description pièce par pièce (sols, murs, plafonds, équipements, état)', type: 'textarea', required: true },
      { key: 'compteurs', label: 'Relevés des compteurs (eau, électricité)', type: 'textarea', required: true },
      { key: 'cles', label: 'Clés et badges remis (nombre et type)', type: 'text', required: true },
      { key: 'observations', label: 'Observations particulières', type: 'textarea', required: false },
    ]),
    body: `<div class="contrat"><h1>{{type_edl}}</h1><p><strong>Bien concerné :</strong> {{adresse_bien}}</p><p>Entre <strong>{{bailleur}}</strong>, bailleur, et <strong>{{locataire}}</strong>, locataire, il est procédé contradictoirement au présent état des lieux.</p><h2>1. Description des lieux</h2><p>{{description_pieces}}</p><h2>2. Relevés des compteurs</h2><p>{{compteurs}}</p><h2>3. Clés et accessoires remis</h2><p>{{cles}}</p><h2>4. Observations</h2><p>{{observations}}</p><p>Le présent état des lieux, établi contradictoirement et de bonne foi, fait référence entre les parties. Il est annexé au contrat de bail et servira de base de comparaison lors de la restitution des lieux.</p><p class="signatures">Fait en deux exemplaires, le {{date_jour}}<br/><br/>Le Bailleur — Le Locataire</p></div>`,
    popularity: 61,
  },
  {
    code: 'quittance_loyer', name: 'Quittance de loyer', category: 'immobilier', price: 100, priceMax: 300,
    description: 'Quittance mensuelle attestant du paiement intégral du loyer et des charges.',
    fieldsJson: F([
      { key: 'bailleur', label: 'Bailleur (nom + adresse)', type: 'text', required: true },
      { key: 'locataire', label: 'Locataire (nom)', type: 'text', required: true },
      { key: 'adresse_bien', label: 'Adresse du logement loué', type: 'text', required: true },
      { key: 'periode', label: 'Période concernée (ex. Juin 2026)', type: 'text', required: true },
      { key: 'loyer', label: 'Montant du loyer (FCFA)', type: 'text', required: true },
      { key: 'charges', label: 'Montant des charges (FCFA)', type: 'text', required: false },
      { key: 'date_paiement', label: 'Date du paiement reçu', type: 'date', required: true },
    ]),
    body: `<div class="contrat"><h1>QUITTANCE DE LOYER — {{periode}}</h1><p>Je soussigné(e), <strong>{{bailleur}}</strong>, bailleur du logement situé {{adresse_bien}},</p><p>Déclare avoir reçu de <strong>{{locataire}}</strong>, locataire dudit logement, la somme de <strong>{{loyer}} FCFA</strong> au titre du loyer, et de {{charges}} FCFA au titre des charges, pour la période de <strong>{{periode}}</strong>, paiement reçu le {{date_paiement}}.</p><p>En conséquence, je lui en donne quittance, sous réserve de tous mes droits pour les périodes antérieures ou postérieures.</p><p>Cette quittance annule tous les reçus provisoires qui auraient pu être délivrés pour la même période.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>Le Bailleur</p></div>`,
    popularity: 85,
  },
  {
    code: 'promesse_vente', name: 'Promesse de vente immobilière', category: 'immobilier', price: 3000, priceMax: 8000,
    description: 'Promesse synallagmatique de vente (compromis) avec conditions suspensives et indemnité.',
    fieldsJson: F([
      { key: 'promettant', label: 'Vendeur / Promettant (nom + adresse)', type: 'text', required: true },
      { key: 'beneficiaire', label: 'Acquéreur / Bénéficiaire (nom + adresse)', type: 'text', required: true },
      { key: 'bien', label: 'Bien concerné (adresse, titre foncier, description)', type: 'textarea', required: true },
      { key: 'prix', label: 'Prix de vente convenu (FCFA)', type: 'text', required: true },
      { key: 'indemnite', label: 'Indemnité d’immobilisation / acompte (FCFA)', type: 'text', required: true },
      { key: 'conditions', label: 'Conditions suspensives (financement, titre, urbanisme…)', type: 'textarea', required: true },
      { key: 'date_limite', label: 'Date limite de réalisation de la vente', type: 'date', required: true },
    ]),
    body: `<div class="contrat"><h1>PROMESSE DE VENTE IMMOBILIÈRE</h1><p>Entre <strong>{{promettant}}</strong>, ci-après « le Vendeur », et <strong>{{beneficiaire}}</strong>, ci-après « l'Acquéreur ».</p><h2>Article 1 — Objet</h2><p>Le Vendeur promet de vendre à l'Acquéreur, qui promet d'acquérir, le bien suivant : {{bien}}</p><h2>Article 2 — Prix</h2><p>La vente, si elle se réalise, aura lieu moyennant le prix de <strong>{{prix}} FCFA</strong>.</p><h2>Article 3 — Indemnité d'immobilisation</h2><p>L'Acquéreur verse ce jour la somme de {{indemnite}} FCFA, qui s'imputera sur le prix en cas de réalisation, sera restituée en cas de défaillance d'une condition suspensive, et restera acquise au Vendeur si l'Acquéreur renonce sans motif légitime.</p><h2>Article 4 — Conditions suspensives</h2><p>La vente est soumise aux conditions suspensives suivantes : {{conditions}}</p><h2>Article 5 — Réalisation</h2><p>L'acte définitif de vente devra être signé au plus tard le <strong>{{date_limite}}</strong> par-devant l'officier public compétent, les frais d'acte étant à la charge de l'Acquéreur sauf convention contraire.</p><p class="signatures">Fait en deux exemplaires, le {{date_jour}}<br/><br/>Le Vendeur — L'Acquéreur</p></div>`,
    popularity: 32,
    countriesJson: C(
      'Espace OHADA : avant-contrat régi par le droit national ; l’acte définitif portant sur un titre foncier requiert généralement la forme authentique.',
      'France : compromis de vente — délai de rétractation de 10 jours pour l’acquéreur non professionnel (art. L271-1 CCH).',
      'Maroc : loi 39-08 (Code des droits réels), art. 618-1 s. pour la vente d’immeuble en l’état futur d’achèvement — acte authentique requis.'
    ),
  },
  {
    code: 'mandat_gestion', name: 'Mandat de gestion locative', category: 'immobilier', price: 2000, priceMax: 5000,
    description: 'Mandat confiant la gestion locative d’un bien à un gestionnaire : missions, honoraires, reddition.',
    fieldsJson: F([
      { key: 'mandant', label: 'Propriétaire / Mandant (nom + adresse)', type: 'text', required: true },
      { key: 'mandataire', label: 'Gestionnaire / Mandataire (nom / agence + adresse)', type: 'text', required: true },
      { key: 'biens', label: 'Bien(s) confié(s) en gestion (adresses + description)', type: 'textarea', required: true },
      { key: 'missions', label: 'Missions confiées (location, encaissement, entretien…)', type: 'textarea', required: true },
      { key: 'honoraires', label: 'Honoraires de gestion (% des loyers encaissés)', type: 'text', required: true },
      { key: 'duree', label: 'Durée du mandat', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>MANDAT DE GESTION LOCATIVE</h1><p>Entre <strong>{{mandant}}</strong>, ci-après « le Mandant », propriétaire, et <strong>{{mandataire}}</strong>, ci-après « le Mandataire ».</p><h2>Article 1 — Objet</h2><p>Le Mandant confie au Mandataire, qui accepte, la gestion locative du ou des biens suivants : {{biens}}</p><h2>Article 2 — Missions du Mandataire</h2><p>{{missions}}</p><p>Le Mandataire agit au nom et pour le compte du Mandant, dans la limite des pouvoirs conférés ; tout acte de disposition demeure soumis à l'accord écrit préalable du Mandant.</p><h2>Article 3 — Honoraires</h2><p>Les honoraires de gestion sont fixés à <strong>{{honoraires}}</strong> des loyers et charges effectivement encaissés, prélevés lors de chaque reddition de comptes.</p><h2>Article 4 — Reddition des comptes</h2><p>Le Mandataire adresse au Mandant un relevé de gestion mensuel (loyers encaissés, dépenses, honoraires, solde reversé) et un état annuel récapitulatif.</p><h2>Article 5 — Durée et révocation</h2><p>Le mandat est conclu pour une durée de {{duree}}, renouvelable par tacite reconduction. Chaque partie peut y mettre fin moyennant un préavis écrit de trois (3) mois.</p><p class="signatures">Fait en deux exemplaires, le {{date_jour}}<br/><br/>Le Mandant — Le Mandataire</p></div>`,
    popularity: 29,
    countriesJson: C(
      'Espace OHADA : mandat régi par le droit civil national et l’AUDCG pour le mandataire professionnel ; agrément d’agent immobilier selon le pays.',
      'France : loi Hoguet (n° 70-9) — carte professionnelle « gestion immobilière », mandat écrit obligatoire à durée limitée.',
      'Maroc : mandat régi par les art. 879 s. du DOC ; activité d’intermédiation immobilière réglementée.'
    ),
  },

  // ════════════════════════ ASSOCIATION (5) ════════════════════════
  {
    code: 'rapport_activite_ong', name: 'Rapport d’activité ONG', category: 'association', price: 1000, priceMax: 3000,
    description: 'Rapport annuel d’activité pour ONG et associations : réalisations, bénéficiaires, finances.',
    fieldsJson: F([
      { key: 'organisation', label: 'Organisation (nom + siège + récépissé)', type: 'textarea', required: true },
      { key: 'periode', label: 'Période couverte (ex. Année 2025)', type: 'text', required: true },
      { key: 'mission', label: 'Rappel de la mission et des objectifs', type: 'textarea', required: true },
      { key: 'activites', label: 'Activités et projets réalisés (avec résultats)', type: 'textarea', required: true },
      { key: 'beneficiaires', label: 'Bénéficiaires touchés (nombre, profils, zones)', type: 'textarea', required: true },
      { key: 'finances', label: 'Synthèse financière (ressources, dépenses, solde)', type: 'textarea', required: true },
      { key: 'perspectives', label: 'Difficultés rencontrées et perspectives', type: 'textarea', required: true },
    ]),
    body: `<div class="contrat"><h1>RAPPORT D'ACTIVITÉ — {{periode}}</h1><p><strong>{{organisation}}</strong></p><h2>1. Mission et objectifs</h2><p>{{mission}}</p><h2>2. Activités réalisées</h2><p>{{activites}}</p><h2>3. Bénéficiaires</h2><p>{{beneficiaires}}</p><h2>4. Synthèse financière</h2><p>{{finances}}</p><h2>5. Difficultés et perspectives</h2><p>{{perspectives}}</p><h2>6. Conclusion</h2><p>Ce rapport rend compte de l'utilisation des ressources confiées à l'organisation et de l'impact obtenu au bénéfice des populations cibles. Il est soumis à l'approbation de l'assemblée générale et tenu à la disposition des partenaires techniques et financiers.</p><p class="signatures">Arrêté le {{date_jour}}<br/><br/>Le Président — Le Trésorier</p></div>`,
    popularity: 31,
  },
  {
    code: 'demande_subvention', name: 'Demande de subvention', category: 'association', price: 500, priceMax: 2000,
    description: 'Dossier de demande de subvention : présentation, projet, budget, plan de financement.',
    fieldsJson: F([
      { key: 'organisation', label: 'Organisation demandeuse (nom + récépissé + adresse)', type: 'textarea', required: true },
      { key: 'bailleur', label: 'Organisme sollicité (institution, mairie, fondation…)', type: 'text', required: true },
      { key: 'projet', label: 'Projet à financer (titre + description + objectifs)', type: 'textarea', required: true },
      { key: 'beneficiaires', label: 'Bénéficiaires visés et impact attendu', type: 'textarea', required: true },
      { key: 'budget', label: 'Budget prévisionnel du projet (postes de dépenses)', type: 'textarea', required: true },
      { key: 'montant', label: 'Montant de la subvention sollicitée (FCFA)', type: 'text', required: true },
      { key: 'representant', label: 'Représentant légal (nom + fonction)', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p class="align-right">Le {{date_jour}}</p><p><strong>{{organisation}}</strong></p><p>À l'attention de {{bailleur}}</p><p>Objet : Demande de subvention — {{montant}} FCFA</p><p>Madame, Monsieur,</p><p>Notre organisation sollicite votre soutien financier pour la réalisation du projet suivant :</p><p><strong>Le projet :</strong> {{projet}}</p><p><strong>Bénéficiaires et impact :</strong> {{beneficiaires}}</p><p><strong>Budget prévisionnel :</strong> {{budget}}</p><p>Le montant de la subvention sollicitée auprès de votre institution s'élève à <strong>{{montant}} FCFA</strong>. Nous nous engageons à utiliser les fonds conformément à leur destination, à tenir une comptabilité dédiée et à vous transmettre un rapport narratif et financier à l'issue du projet.</p><p>Vous trouverez en annexe les statuts, le récépissé de déclaration et les comptes de notre organisation. Nous restons à votre disposition pour présenter le projet plus en détail.</p><p>Veuillez agréer, Madame, Monsieur, l'expression de notre haute considération.</p><p class="signatures">{{representant}}<br/>Pour {{organisation}}</p></div>`,
    popularity: 43,
  },
  {
    code: 'pv_bureau_association', name: 'PV de réunion de bureau', category: 'association', price: 500, priceMax: 1500,
    description: 'Procès-verbal de réunion du bureau d’une association : présents, décisions, votes.',
    fieldsJson: F([
      { key: 'association', label: 'Association (nom)', type: 'text', required: true },
      { key: 'date_reunion', label: 'Date de la réunion', type: 'date', required: true },
      { key: 'lieu', label: 'Lieu de la réunion', type: 'text', required: true },
      { key: 'presents', label: 'Membres présents et excusés', type: 'textarea', required: true },
      { key: 'ordre_du_jour', label: 'Ordre du jour', type: 'textarea', required: true },
      { key: 'decisions', label: 'Discussions et décisions prises (avec votes)', type: 'textarea', required: true },
      { key: 'secretaire', label: 'Secrétaire de séance', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>PROCÈS-VERBAL DE RÉUNION DU BUREAU</h1><p><strong>Association {{association}}</strong></p><p>Le {{date_reunion}}, le bureau de l'association s'est réuni à {{lieu}}, sur convocation du Président.</p><h2>Présences</h2><p>{{presents}}</p><h2>Ordre du jour</h2><p>{{ordre_du_jour}}</p><h2>Discussions et décisions</h2><p>{{decisions}}</p><h2>Clôture</h2><p>L'ordre du jour étant épuisé, la séance est levée. Le présent procès-verbal sera consigné au registre des délibérations et communiqué aux membres du bureau.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>Le Président — {{secretaire}}, Secrétaire de séance</p></div>`,
    popularity: 37,
  },
  {
    code: 'adhesion_association', name: 'Bulletin d’adhésion association', category: 'association', price: 100, priceMax: 400,
    description: 'Bulletin d’adhésion avec engagement au respect des statuts et du règlement intérieur.',
    fieldsJson: F([
      { key: 'association', label: 'Association (nom + siège)', type: 'text', required: true },
      { key: 'adherent', label: 'Adhérent (nom, prénom, date de naissance)', type: 'text', required: true },
      { key: 'adresse', label: 'Adresse de l’adhérent', type: 'text', required: true },
      { key: 'contact', label: 'Téléphone et email', type: 'text', required: true },
      { key: 'categorie', label: 'Catégorie de membre', type: 'select', required: true, options: ['Membre actif', 'Membre bienfaiteur', 'Membre d’honneur', 'Membre sympathisant'] },
      { key: 'cotisation', label: 'Cotisation versée (FCFA)', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>BULLETIN D'ADHÉSION</h1><p><strong>{{association}}</strong></p><p>Je soussigné(e), <strong>{{adherent}}</strong>, demeurant {{adresse}} ({{contact}}), sollicite mon adhésion à l'association en qualité de : <strong>{{categorie}}</strong>.</p><h2>Engagement</h2><p>Je déclare avoir pris connaissance des statuts et du règlement intérieur de l'association, en accepter toutes les dispositions et m'engager à œuvrer à la réalisation de son objet.</p><h2>Cotisation</h2><p>Je verse ce jour ma cotisation d'un montant de <strong>{{cotisation}} FCFA</strong>, dont il m'est donné reçu.</p><p class="text-small">Les informations recueillies sont destinées exclusivement à la gestion de l'association et ne sont communiquées à aucun tiers.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>L'Adhérent — Le Président (validation de l'adhésion)</p></div>`,
    popularity: 53,
  },
  {
    code: 'recu_don', name: 'Reçu de don', category: 'association', price: 100, priceMax: 400,
    description: 'Reçu officiel délivré au donateur par une association ou ONG pour tout don reçu.',
    fieldsJson: F([
      { key: 'organisation', label: 'Organisation bénéficiaire (nom + récépissé + adresse)', type: 'textarea', required: true },
      { key: 'donateur', label: 'Donateur (nom / société + adresse)', type: 'text', required: true },
      { key: 'nature_don', label: 'Nature du don', type: 'select', required: true, options: ['Don en numéraire', 'Don en nature', 'Don matériel'] },
      { key: 'montant', label: 'Montant (FCFA) ou description du don en nature', type: 'textarea', required: true },
      { key: 'date_don', label: 'Date de réception du don', type: 'date', required: true },
      { key: 'numero', label: 'Numéro du reçu', type: 'text', required: true },
      { key: 'signataire', label: 'Signataire (nom + fonction)', type: 'text', required: true },
    ]),
    body: `<div class="facture"><h1>REÇU DE DON N° {{numero}}</h1><p><strong>{{organisation}}</strong></p><p>Nous reconnaissons avoir reçu de :</p><p><strong>{{donateur}}</strong></p><p><strong>Nature du don :</strong> {{nature_don}}<br/><strong>Montant / description :</strong> {{montant}}<br/><strong>Date de réception :</strong> {{date_don}}</p><p>Ce don est affecté à la réalisation de l'objet social de l'organisation. Le donateur n'a reçu aucune contrepartie directe ou indirecte au titre du présent don.</p><p>Le présent reçu est délivré pour servir et valoir ce que de droit, notamment auprès de l'administration fiscale lorsque la législation ouvre droit à un avantage fiscal.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>{{signataire}}<br/>(signature et cachet)</p></div>`,
    popularity: 51,
  },
];

async function main() {
  let created = 0;
  let updated = 0;
  const byCategory: Record<string, number> = {};

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
    byCategory[t.category] = (byCategory[t.category] ?? 0) + 1;
  }

  const total = await prisma.documentTemplate.count();
  const withCountries = templates.filter((t) => t.countriesJson).length;

  console.log('✅ Seed catalogue étendu terminé.');
  console.log(`   Templates du script : ${templates.length} (créés : ${created}, mis à jour : ${updated})`);
  console.log('   Répartition par catégorie (ce script) :');
  for (const [cat, n] of Object.entries(byCategory)) console.log(`     - ${cat} : ${n}`);
  console.log(`   Variantes pays (countriesJson) : ${withCountries} templates`);
  console.log(`   ➜ Total de templates en base : ${total}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
