// Seed Drive3 Associations — Agent Drive3-9/10 : PASSE PROFONDE n°2 sur le KIT ASSOCIATIONS.
// 20 modèles ASSOCIATIONS/ONG convertis depuis le Google Drive IBIG
// (« KIT PRATIQUE DE GESTION DES ASSOCIATIONS » > Documents modifiables word).
// Sous-dossiers couverts : Assemblée générale, Bureau/CA, Membres, Gestion,
// Formalités, Banque et crédit, Assurance.
// Script ADDITIF : upsert par code — n'écrase pas les templates existants.
// Exécution : npx tsx prisma/seed-drive3-asso.ts
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

// Note pays commune aux documents associatifs (source : modèles IBIG).
const C_ASSO = JSON.stringify({
  OHADA: { note: 'Adapter aux lois nationales sur les associations et ONG (déclaration auprès du Ministère de l’Intérieur ou de la Préfecture selon le pays).' },
  FR: { note: 'Association régie par la loi du 1er juillet 1901 — déclaration en Préfecture.' },
});

const templates: CatalogTemplate[] = [
  // ── 1. Seconde convocation à l'assemblée générale (AGO / AGE) ──────────────
  // Fusion : « Lettre de seconde convocation … AGO annuelle » + « … AGE ».
  {
    code: 'asso_seconde_convocation_ag', name: 'Seconde convocation à l’assemblée générale d’association', category: 'association',
    price: 500, priceMax: 1500, popularity: 30,
    description: 'Lettre de seconde convocation des membres lorsque la première assemblée générale (ordinaire ou extraordinaire) n’a pas atteint le quorum : ordre du jour identique et règles de quorum allégées.',
    fieldsJson: F([
      { key: 'association', label: 'Dénomination de l’association', type: 'text', required: true },
      { key: 'siege', label: 'Adresse du siège social', type: 'text', required: true },
      { key: 'numero_depot', label: 'Numéro de déclaration (Préfecture / autorité compétente)', type: 'text', required: true },
      { key: 'type_ag', label: 'Type d’assemblée (ordinaire annuelle ou extraordinaire)', type: 'text', required: true },
      { key: 'date_premiere_ag', label: 'Date de la première assemblée n’ayant pu délibérer', type: 'date', required: true },
      { key: 'date_ag', label: 'Date de la nouvelle assemblée', type: 'date', required: true },
      { key: 'heure_lieu', label: 'Heure et lieu de la nouvelle assemblée', type: 'text', required: true },
      { key: 'ordre_du_jour', label: 'Ordre du jour (identique à la première convocation, un point par ligne)', type: 'textarea', required: true },
      { key: 'quorum', label: 'Règles de quorum et de majorité sur seconde convocation (selon les statuts)', type: 'textarea', required: true },
      { key: 'ville', label: 'Ville de rédaction', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p><strong>Association {{association}}</strong><br/>Siège : {{siege}}<br/>Déclarée sous le n° {{numero_depot}}</p><p class="align-right">{{ville}}, le {{date_jour}}</p><p><strong>SECONDE CONVOCATION À L'ASSEMBLÉE GÉNÉRALE {{type_ag}} DU {{date_ag}}</strong></p><p>Cher membre,</p><p>L'assemblée générale {{type_ag}} qui s'est tenue le {{date_premiere_ag}} n'a pu valablement délibérer faute d'avoir atteint le quorum.</p><p>Notre association tiendra donc une assemblée générale {{type_ag}} réunie sur deuxième convocation le <strong>{{date_ag}}</strong>, {{heure_lieu}}.</p><p>Au cours de cette assemblée, l'ordre du jour — identique à celui de la première assemblée — sera le suivant :</p><p>{{ordre_du_jour}}</p><p>Nous vous rappelons que, pour cette assemblée réunie sur seconde convocation, les règles de quorum et de majorité sont les suivantes :</p><p>{{quorum}}</p><p>En cas d'empêchement, vous pouvez vous faire représenter par le membre de votre choix muni d'un mandat spécial, conformément aux dispositions de nos statuts. Un pouvoir est joint aux présentes et doit être retourné au secrétaire de l'association avant la tenue de l'assemblée.</p><p>Enfin, vous trouverez en annexe des présentes le texte des résolutions qui seront soumises à votre approbation.</p><p class="signatures">Le Secrétaire</p></div>`,
    countriesJson: C_ASSO,
  },

  // ── 2. Texte des résolutions proposées à l'assemblée générale ──────────────
  // Fusion : « Texte des résolutions … AGO annuelle » + « … AGE ».
  {
    code: 'asso_resolutions_ag', name: 'Texte des résolutions proposées à l’AG d’association', category: 'association',
    price: 700, priceMax: 1800, popularity: 28,
    description: 'Document annexé à la convocation présentant le texte des résolutions soumises au vote de l’assemblée générale (approbation des comptes, budget, cotisations, opérations exceptionnelles).',
    fieldsJson: F([
      { key: 'association', label: 'Dénomination de l’association', type: 'text', required: true },
      { key: 'siege', label: 'Adresse du siège social', type: 'text', required: true },
      { key: 'numero_depot', label: 'Numéro de déclaration (Préfecture / autorité compétente)', type: 'text', required: true },
      { key: 'type_ag', label: 'Type d’assemblée (ordinaire annuelle ou extraordinaire)', type: 'text', required: true },
      { key: 'date_ag', label: 'Date de tenue de l’assemblée', type: 'date', required: true },
      { key: 'date_cloture', label: 'Date de clôture de l’exercice soumis à approbation', type: 'text', required: true },
      { key: 'cotisations', label: 'Cotisations proposées pour l’exercice à venir (détail par catégorie de membres, en FCFA)', type: 'textarea', required: true },
      { key: 'resolutions_complementaires', label: 'Résolutions complémentaires (élection d’administrateurs, opération exceptionnelle…)', type: 'textarea', required: true },
    ]),
    body: `<div class="contrat"><h1>TEXTE DES RÉSOLUTIONS PROPOSÉES À L'ASSEMBLÉE GÉNÉRALE {{type_ag}} DU {{date_ag}}</h1><p>Association <strong>{{association}}</strong><br/>Siège : {{siege}}<br/>Déclarée sous le n° {{numero_depot}}</p><h2>Première résolution</h2><p>L'assemblée, après avoir entendu le rapport de gestion sur l'activité de l'association au cours de l'exercice clos au {{date_cloture}}, et pris connaissance des comptes et du bilan de l'association pour ledit exercice, les approuve dans leur totalité tels qu'ils lui ont été présentés, et donne quitus de sa gestion au Trésorier.</p><h2>Deuxième résolution</h2><p>L'assemblée, après avoir eu lecture du projet de budget pour l'exercice à venir, l'approuve dans sa totalité tel qu'il lui a été présenté.</p><h2>Troisième résolution</h2><p>L'assemblée générale, après avoir eu lecture du budget prévisionnel pour l'année à venir, et pour réaliser les buts fixés dans les statuts de l'association, décide de fixer pour l'année à venir la cotisation de la manière suivante :</p><p>{{cotisations}}</p><h2>Résolutions complémentaires</h2><p>{{resolutions_complementaires}}</p><p class="text-small">Le texte des résolutions doit être communiqué aux membres préalablement à la tenue de l'assemblée ; les débats et votes seront consignés dans le procès-verbal de l'assemblée.</p></div>`,
    countriesJson: C_ASSO,
  },

  // ── 3. Lettre de signalement d'une irrégularité de l'assemblée ─────────────
  {
    code: 'asso_signalement_irregularite_ag', name: 'Signalement d’une irrégularité d’assemblée générale', category: 'association',
    price: 600, priceMax: 1500, popularity: 16,
    description: 'Lettre adressée par un membre aux dirigeants de l’association pour contester une décision d’assemblée générale prise en violation des statuts et demander sa régularisation.',
    fieldsJson: F([
      { key: 'membre', label: 'Membre signataire (nom, prénom, adresse)', type: 'textarea', required: true },
      { key: 'association', label: 'Dénomination de l’association', type: 'text', required: true },
      { key: 'date_ag', label: 'Date de l’assemblée générale litigieuse', type: 'date', required: true },
      { key: 'decision', label: 'Décision litigieuse adoptée', type: 'textarea', required: true },
      { key: 'article', label: 'Article des statuts méconnu (numéro et texte)', type: 'textarea', required: true },
      { key: 'regularisation', label: 'Ce qu’il aurait fallu faire pour respecter les statuts', type: 'textarea', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p><strong>{{membre}}</strong></p><p class="align-right">{{ville}}, le {{date_jour}}</p><p><strong>Objet : Irrégularité de l'assemblée générale du {{date_ag}}</strong></p><p>Madame, Monsieur,</p><p>Lors de la dernière assemblée générale de l'association <strong>{{association}}</strong>, tenue le {{date_ag}}, il a été pris la décision suivante : {{decision}}</p><p>Or, les statuts de notre association prévoient que :</p><p>{{article}}</p><p>Il aurait donc fallu que cette décision soit prise dans les conditions suivantes : {{regularisation}}</p><p>En conséquence, cette délibération est entachée de nullité, et il conviendra de la soumettre à nouveau au vote dans le respect des dispositions statutaires. J'espère donc vivement que vous prendrez toute mesure appropriée pour régulariser la situation.</p><p>Dans l'attente de vous lire, je vous prie d'agréer, Madame, Monsieur, l'expression de mes sentiments distingués.</p><p class="signatures">Signature du membre</p></div>`,
    countriesJson: C_ASSO,
  },

  // ── 4. Convocation des membres du bureau à une réunion ─────────────────────
  {
    code: 'asso_convocation_bureau', name: 'Convocation à une réunion du bureau d’association', category: 'association',
    price: 500, priceMax: 1200, popularity: 32,
    description: 'Lettre de convocation des membres du bureau de l’association à une réunion : ordre du jour, faculté de représentation par pouvoir et texte des résolutions en annexe.',
    fieldsJson: F([
      { key: 'association', label: 'Dénomination de l’association', type: 'text', required: true },
      { key: 'siege', label: 'Adresse du siège social', type: 'text', required: true },
      { key: 'numero_depot', label: 'Numéro de déclaration (Préfecture / autorité compétente)', type: 'text', required: true },
      { key: 'destinataire', label: 'Membre du bureau convoqué (civilité, nom, prénom)', type: 'text', required: true },
      { key: 'date_reunion', label: 'Date de la réunion', type: 'date', required: true },
      { key: 'heure_lieu', label: 'Heure et lieu de la réunion (ex. à 18 h au siège social)', type: 'text', required: true },
      { key: 'ordre_du_jour', label: 'Ordre du jour (un point par ligne)', type: 'textarea', required: true },
      { key: 'delai_pouvoir', label: 'Délai de retour des pouvoirs au secrétaire (en jours)', type: 'text', required: true },
      { key: 'ville', label: 'Ville de rédaction', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p><strong>Association {{association}}</strong><br/>Siège : {{siege}}<br/>Déclarée sous le n° {{numero_depot}}</p><p class="align-right">{{ville}}, le {{date_jour}}</p><p><strong>{{destinataire}}</strong></p><p><strong>CONVOCATION À LA RÉUNION DU BUREAU DU {{date_reunion}}</strong></p><p>Cher membre du bureau,</p><p>Vous êtes convié(e) à la réunion du bureau de l'association {{association}} qui se tiendra le <strong>{{date_reunion}}</strong>, {{heure_lieu}}.</p><p>Au cours de cette réunion, l'ordre du jour sera le suivant :</p><p>{{ordre_du_jour}}</p><p>Nous vous rappelons que vous êtes tenu(e) de vous présenter à la réunion en personne ou représenté(e) par le membre de votre choix muni d'un mandat spécial, comme cela est prévu par nos statuts. Un pouvoir est joint aux présentes et doit être retourné au secrétaire de l'association au moins {{delai_pouvoir}} jours avant la tenue de la réunion.</p><p>Enfin, vous trouverez en annexe des présentes le texte des résolutions qui seront soumises à votre approbation.</p><p class="signatures">Le Secrétaire</p></div>`,
    countriesJson: C_ASSO,
  },

  // ── 5. Lettre de démission d'un dirigeant d'association ────────────────────
  // Fusion : « Démission d'un dirigeant » + « Démission du trésorier » + « Démission du secrétaire ».
  {
    code: 'asso_demission_dirigeant', name: 'Lettre de démission d’un dirigeant d’association', category: 'association',
    price: 500, priceMax: 1500, popularity: 42,
    description: 'Lettre de démission d’un dirigeant d’association (Président, Trésorier, Secrétaire ou tout membre du bureau) avec préavis et date de départ, à adresser à l’association en recommandé.',
    fieldsJson: F([
      { key: 'demissionnaire', label: 'Dirigeant démissionnaire (nom, prénom, adresse)', type: 'textarea', required: true },
      { key: 'fonction', label: 'Fonction occupée (Président, Trésorier, Secrétaire…)', type: 'text', required: true },
      { key: 'association', label: 'Dénomination de l’association', type: 'text', required: true },
      { key: 'date_prise_fonction', label: 'Date de prise de fonction', type: 'date', required: true },
      { key: 'preavis', label: 'Préavis (durée et source : statuts, règlement intérieur ou préavis d’usage)', type: 'text', required: true },
      { key: 'date_depart', label: 'Date exacte de départ', type: 'date', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p><strong>{{demissionnaire}}</strong></p><p class="align-right">{{ville}}, le {{date_jour}}</p><p>Association <strong>{{association}}</strong></p><p><em>Lettre recommandée avec avis de réception</em></p><p><strong>Objet : Démission de mes fonctions de {{fonction}} au sein de l'association {{association}}</strong></p><p>Madame, Monsieur,</p><p>Je vous notifie par la présente ma démission de mes fonctions de <strong>{{fonction}}</strong> au sein de l'association {{association}}, fonction que j'occupais depuis le {{date_prise_fonction}}.</p><p>Je quitterai mes fonctions au terme d'un préavis de {{preavis}}, soit le <strong>{{date_depart}}</strong>, sauf si vous m'en dispensez.</p><p>Il est en effet conseillé de respecter un préavis d'une durée raisonnable, dont la durée varie en fonction de l'importance des fonctions exercées, et ce même si les statuts ou le règlement intérieur ne le prévoient pas ; ainsi, il ne pourra m'être reproché d'avoir démissionné de façon abusive ou de façon à nuire à l'association.</p><p>Je reste naturellement à votre disposition pour organiser la transmission des dossiers, documents et éventuels moyens de paiement de l'association dont j'ai la charge.</p><p>Vous souhaitant bonne réception de la présente, je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.</p><p class="signatures">Signature</p><p class="text-small">Pièces jointes : copie du document prévoyant un délai de préavis s'il en existe un, et de tout document établissant les fonctions exercées.</p></div>`,
    countriesJson: C_ASSO,
  },

  // ── 6. Pouvoir de représentation pour une réunion du bureau ou du CA ───────
  // Fusion : « Pouvoir … pour une réunion du bureau » + « Pouvoir … membre du Conseil d'administration ».
  {
    code: 'asso_pouvoir_reunion_bureau', name: 'Pouvoir pour une réunion du bureau ou du CA d’association', category: 'association',
    price: 500, priceMax: 1200, popularity: 26,
    description: 'Pouvoir donné par un dirigeant ou administrateur empêché à un autre membre pour le représenter et voter lors d’une réunion du bureau ou du conseil d’administration.',
    fieldsJson: F([
      { key: 'mandant', label: 'Dirigeant empêché (nom, prénom)', type: 'text', required: true },
      { key: 'fonction', label: 'Fonction exercée (Président, Trésorier, Secrétaire, Administrateur…)', type: 'text', required: true },
      { key: 'association', label: 'Dénomination de l’association', type: 'text', required: true },
      { key: 'numero_depot', label: 'Numéro de déclaration de l’association', type: 'text', required: true },
      { key: 'siege', label: 'Adresse du siège de l’association', type: 'text', required: true },
      { key: 'mandataire', label: 'Membre investi du pouvoir (nom, prénom et adresse)', type: 'text', required: true },
      { key: 'organe', label: 'Organe concerné (bureau ou conseil d’administration)', type: 'text', required: true },
      { key: 'date_reunion', label: 'Date de la réunion', type: 'date', required: true },
      { key: 'lieu_heure', label: 'Lieu et heure de la réunion', type: 'text', required: true },
      { key: 'ordre_du_jour', label: 'Ordre du jour (tel qu’indiqué dans la convocation)', type: 'textarea', required: true },
      { key: 'ville', label: 'Ville de rédaction du pouvoir', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>POUVOIR DE REPRÉSENTATION</h1><p>Je soussigné(e) <strong>{{mandant}}</strong>, {{fonction}} de l'association <strong>{{association}}</strong>, déclarée sous le numéro de dépôt {{numero_depot}}, dont le siège est sis {{siege}},</p><p>Donne, par la présente, pouvoir à <strong>{{mandataire}}</strong>, également membre du {{organe}} de l'association {{association}}, pour me représenter lors de la réunion du {{organe}} qui se tiendra à {{lieu_heure}}, le {{date_reunion}}, à l'effet de délibérer sur l'ordre du jour suivant :</p><p>{{ordre_du_jour}}</p><p>En conséquence, prendre part à toutes discussions et délibérations, prendre connaissance de tous documents, émettre tous votes et, généralement, faire le nécessaire.</p><p class="signatures">Fait à {{ville}}, le {{date_jour}}.<br/><br/>Signature du membre qui donne mandat<br/>(précédée de la mention manuscrite « Bon pour pouvoir »)<br/><br/>Signature du membre qui représentera le mandant<br/>(précédée de la mention manuscrite « Bon pour acceptation »)</p></div>`,
    countriesJson: C_ASSO,
  },

  // ── 7. Demande de remboursement de frais à une association ─────────────────
  {
    code: 'asso_demande_remboursement_frais', name: 'Demande de remboursement de frais à une association', category: 'association',
    price: 500, priceMax: 1200, popularity: 38,
    description: 'Lettre d’un dirigeant ou bénévole demandant le remboursement des frais exposés pour le compte de l’association, avec détail des dépenses et justificatifs en annexe.',
    fieldsJson: F([
      { key: 'demandeur', label: 'Demandeur (nom, prénom, adresse)', type: 'textarea', required: true },
      { key: 'fonction', label: 'Fonction dans l’association (Président, Trésorier, Administrateur, bénévole…)', type: 'text', required: true },
      { key: 'association', label: 'Dénomination de l’association', type: 'text', required: true },
      { key: 'article_statuts', label: 'Article des statuts relatif au remboursement des frais', type: 'text', required: true },
      { key: 'montant_total', label: 'Montant global demandé (en FCFA)', type: 'text', required: true },
      { key: 'detail_frais', label: 'Détail des frais (déplacement, hébergement, matériel… un poste par ligne avec son montant)', type: 'textarea', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p><strong>{{demandeur}}</strong></p><p class="align-right">{{ville}}, le {{date_jour}}</p><p>Association <strong>{{association}}</strong></p><p><strong>Objet : Demande de remboursement des frais exposés pour le compte de l'association {{association}}</strong></p><p>Madame, Monsieur,</p><p>Dans le cadre de mes fonctions de {{fonction}}, j'ai été amené(e) à exposer des frais pour le compte de l'association {{association}}.</p><p>Je me permets donc de vous en demander le remboursement conformément à l'article {{article_statuts}} de nos statuts.</p><p>Le montant global de ces frais exposés pour le compte de l'association s'élève à <strong>{{montant_total}} FCFA</strong>.</p><p>Ce montant comprend :</p><p>{{detail_frais}}</p><p>Vous trouverez en annexe la copie de l'intégralité des factures sur lesquelles s'appuie la présente demande.</p><p>Dans l'attente de votre règlement, veuillez agréer, Madame, Monsieur, l'expression de mes salutations distinguées.</p><p class="signatures">Signature<br/>(nom, prénom et fonction du demandeur)</p><p class="text-small">Pièces jointes : copie des factures, reçus et tickets.</p></div>`,
    countriesJson: C_ASSO,
  },

  // ── 8. Abandon de frais par un bénévole (don ouvrant droit à reçu) ─────────
  {
    code: 'asso_abandon_frais_benevole', name: 'Abandon de frais par un bénévole au profit de l’association', category: 'association',
    price: 500, priceMax: 1500, popularity: 24,
    description: 'Lettre par laquelle un bénévole renonce au remboursement de ses frais et consent un abandon de créance à l’association, contre délivrance d’un reçu ouvrant droit à un avantage fiscal.',
    fieldsJson: F([
      { key: 'benevole', label: 'Bénévole (nom, prénom, adresse)', type: 'textarea', required: true },
      { key: 'association', label: 'Dénomination de l’association', type: 'text', required: true },
      { key: 'detail_frais', label: 'Motif et montant des frais exposés (détail)', type: 'textarea', required: true },
      { key: 'montant_total', label: 'Montant total des frais abandonnés (en FCFA)', type: 'text', required: true },
      { key: 'reference_fiscale', label: 'Référence fiscale applicable (ex. article du code général des impôts du pays)', type: 'text', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p><strong>{{benevole}}</strong></p><p class="align-right">{{ville}}, le {{date_jour}}</p><p>Association <strong>{{association}}</strong></p><p><strong>Objet : Abandon de créance portant sur les frais exposés pour le compte de l'association {{association}}</strong></p><p>Madame, Monsieur,</p><p>Dans le cadre du bénévolat que j'effectue pour le compte de l'association {{association}}, j'ai été amené(e) à exposer les frais suivants :</p><p>{{detail_frais}}</p><p>Soit un total de <strong>{{montant_total}} FCFA</strong>.</p><p>Je ne souhaite pas être remboursé(e) par notre association au titre de ces frais, et je suis prêt(e) à lui consentir un abandon de créance, à condition que vous me délivriez un reçu, afin que je puisse prétendre à une réduction d'impôts au titre de {{reference_fiscale}}.</p><p>Dans l'attente de votre réponse et de la réception du reçu qui matérialisera mon abandon de la créance que je détiens sur l'association {{association}}, je vous prie d'accepter, Madame, Monsieur, mes salutations distinguées.</p><p class="signatures">Nom, prénom et signature du bénévole</p><p class="text-small">Pièces jointes : preuve des dépenses exposées — copie des factures, reçus, tickets.</p></div>`,
    countriesJson: C_ASSO,
  },

  // ── 9. Demande d'ouverture d'un compte bancaire par une association ────────
  // Fusion : « Ouverture d'un compte bancaire » + « … en formation » + « … Banque de France ».
  {
    code: 'asso_ouverture_compte_bancaire', name: 'Demande d’ouverture de compte bancaire pour association', category: 'association',
    price: 800, priceMax: 2000, popularity: 46,
    description: 'Lettre de demande d’ouverture d’un compte bancaire au nom de l’association : présentation de l’objet, des adhérents, des ressources et des pièces justificatives à joindre.',
    fieldsJson: F([
      { key: 'association', label: 'Dénomination de l’association', type: 'text', required: true },
      { key: 'objet', label: 'Objet social de l’association (figure dans les statuts)', type: 'textarea', required: true },
      { key: 'banque', label: 'Banque destinataire (nom et adresse)', type: 'textarea', required: true },
      { key: 'nb_adherents', label: 'Nombre d’adhérents à ce jour', type: 'text', required: true },
      { key: 'ressources', label: 'Ressources de l’association (cotisations, subventions, dons, manifestations…)', type: 'textarea', required: true },
      { key: 'patrimoine', label: 'Biens appartenant à l’association ou mis à sa disposition', type: 'textarea', required: true },
      { key: 'signataire', label: 'Signataire (nom, prénom et fonction dans l’association)', type: 'text', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p class="align-right">{{ville}}, le {{date_jour}}</p><p><strong>{{banque}}</strong></p><p><em>Lettre recommandée avec avis de réception</em></p><p><strong>Objet : Demande d'ouverture de compte bancaire pour une association</strong></p><p>Madame, Monsieur,</p><p>L'association <strong>{{association}}</strong> a pour objet : {{objet}}</p><p>Pour fonctionner, notre association s'appuie sur les cotisations de ses adhérents ({{nb_adherents}} à ce jour), mais aussi sur les ressources suivantes : {{ressources}}</p><p>En outre, pour assurer notre fonctionnement dans de bonnes conditions, nous disposons des biens suivants : {{patrimoine}}</p><p>Il est donc nécessaire pour nous d'ouvrir un compte bancaire courant au nom de l'association, en vue d'y déposer les fonds collectés ou à recevoir.</p><p>Nous souhaiterions ouvrir ce compte au sein de votre établissement. Aussi, deux questions se posent : accepteriez-vous de devenir la banque de notre association et, si oui, pourriez-vous nous en indiquer le prix et les conditions ?</p><p>Dans l'attente de votre réponse, et pour toute demande de renseignements complémentaires, nous nous tenons à votre disposition et vous prions d'agréer, Madame, Monsieur, l'expression de nos salutations distinguées.</p><p class="signatures">{{signataire}}</p><p class="text-small">Pièces jointes : copie du budget prévisionnel ; copie des derniers bilans et comptes de résultat ; copie des statuts et du récépissé de déclaration ; liste des dirigeants habilités ; le cas échéant, attestation sur l'honneur selon laquelle l'association ne dispose d'aucun autre compte bancaire courant.</p></div>`,
    countriesJson: C_ASSO,
  },

  // ── 10. Demande d'autorisation de découvert bancaire ───────────────────────
  // Fusion : « Demande d'autorisation de découvert » + « Demande d'augmentation d'une autorisation de découvert ».
  {
    code: 'asso_decouvert_bancaire', name: 'Demande de découvert bancaire par une association', category: 'association',
    price: 700, priceMax: 1800, popularity: 22,
    description: 'Lettre à la banque pour solliciter (ou augmenter) une autorisation de découvert afin de faire face à des difficultés ponctuelles de trésorerie de l’association.',
    fieldsJson: F([
      { key: 'association', label: 'Dénomination de l’association', type: 'text', required: true },
      { key: 'banque', label: 'Banque destinataire (nom et adresse)', type: 'textarea', required: true },
      { key: 'anciennete', label: 'Ancienneté de la relation bancaire (en années)', type: 'text', required: true },
      { key: 'difficultes', label: 'Cause des difficultés de trésorerie (baisse des cotisations, subvention en retard…)', type: 'textarea', required: true },
      { key: 'actions', label: 'Actions prévues pour redresser la situation (campagne de cotisations, manifestation, subvention…)', type: 'textarea', required: true },
      { key: 'numero_compte', label: 'Numéro du compte concerné', type: 'text', required: true },
      { key: 'montant', label: 'Montant du découvert sollicité (en FCFA)', type: 'text', required: true },
      { key: 'date_retour', label: 'Date prévue de retour à l’équilibre', type: 'date', required: true },
      { key: 'signataire', label: 'Signataire (nom, prénom et fonction dans l’association)', type: 'text', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p class="align-right">{{ville}}, le {{date_jour}}</p><p><strong>{{banque}}</strong></p><p><em>Lettre recommandée avec avis de réception</em></p><p><strong>Objet : Demande d'autorisation de découvert</strong></p><p>Madame, Monsieur,</p><p>Voilà près de {{anciennete}} ans que l'association <strong>{{association}}</strong> et votre établissement sont partenaires. Nous n'avons durant cette période pas connu d'incident de paiement majeur, et nos comptes sont relativement sains.</p><p>Néanmoins, nous devons admettre que nous connaissons actuellement des difficultés ponctuelles de trésorerie. En effet : {{difficultes}}</p><p>Notre situation n'est pour autant pas alarmante, puisque nous prévoyons les actions suivantes : {{actions}}</p><p>Néanmoins, jusqu'à cette date, nous avons le devoir de continuer à fonctionner, ne serait-ce que pour nos adhérents ; or, ce fonctionnement a un coût.</p><p>C'est pourquoi nous nous permettons de vous écrire, afin de solliciter auprès de votre établissement une autorisation de découvert sur notre compte n° {{numero_compte}}, pour un montant de <strong>{{montant}} FCFA</strong> environ, jusqu'à ce que notre situation soit plus saine, ce qui devrait intervenir dès le {{date_retour}}.</p><p>Mais avant de formaliser cet engagement avec vous, si vous l'acceptez, nous souhaiterions connaître le coût et les conditions d'un tel service.</p><p>Dans l'attente de votre réponse, et pour toute demande de renseignements complémentaires, nous nous tenons à votre disposition.</p><p class="signatures">{{signataire}}</p><p class="text-small">Pièces jointes : copie des derniers bilans ; budget prévisionnel ; copie de la lettre confirmant l'octroi d'une subvention ; copie des statuts ; copie de la résolution de l'assemblée générale autorisant la demande de découvert ; copie d'une pièce d'identité du signataire.</p></div>`,
    countriesJson: C_ASSO,
  },

  // ── 11. Demande d'avance sur subvention à la banque ────────────────────────
  {
    code: 'asso_avance_subvention', name: 'Demande d’avance sur subvention par une association', category: 'association',
    price: 800, priceMax: 2000, popularity: 20,
    description: 'Lettre à la banque pour obtenir une avance de trésorerie sur une subvention attribuée mais non encore versée, par cession de la créance de subvention.',
    fieldsJson: F([
      { key: 'association', label: 'Dénomination de l’association', type: 'text', required: true },
      { key: 'objet', label: 'But de l’association', type: 'textarea', required: true },
      { key: 'banque', label: 'Banque destinataire (nom et adresse)', type: 'textarea', required: true },
      { key: 'date_attribution', label: 'Date de la décision d’attribution de la subvention', type: 'date', required: true },
      { key: 'collectivite', label: 'Administration ou collectivité qui subventionne (nom et adresse)', type: 'textarea', required: true },
      { key: 'montant', label: 'Montant de la subvention (en FCFA)', type: 'text', required: true },
      { key: 'date_versement', label: 'Date prévue de versement de la subvention', type: 'date', required: true },
      { key: 'utilisation', label: 'Utilisation prévue de la subvention (objet de la convention)', type: 'textarea', required: true },
      { key: 'signataire', label: 'Signataire (nom, prénom et qualité : Président ou délégué)', type: 'text', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p class="align-right">{{ville}}, le {{date_jour}}</p><p><strong>{{banque}}</strong></p><p><em>Lettre recommandée avec avis de réception</em></p><p><strong>Objet : Demande d'avance sur subvention</strong></p><p>Madame, Monsieur,</p><p>L'association <strong>{{association}}</strong> a pour objet : {{objet}}</p><p>Par une décision en date du {{date_attribution}}, {{collectivite}} nous a attribué une subvention de <strong>{{montant}} FCFA</strong>, qui nous sera versée le {{date_versement}}. Cette subvention nous a été attribuée dans le cadre suivant : {{utilisation}}</p><p>Cependant, nous devons admettre que nous connaissons actuellement des besoins de trésorerie et souhaitons agir dès maintenant. Par conséquent, les fonds nous sont nécessaires sans attendre le versement de la subvention.</p><p>Aussi, nous souhaiterions vous céder la créance que nous détenons au titre de cette subvention, conformément aux dispositions applicables en matière de cession de créances professionnelles.</p><p>Pourriez-vous nous indiquer si vous pratiquez ce type d'opérations et, le cas échéant, nous en donner le coût et les conditions ?</p><p>Dans l'attente de votre réponse, nous vous prions d'agréer, Madame, Monsieur, l'expression de nos salutations distinguées.</p><p class="signatures">{{signataire}}</p><p class="text-small">Pièces jointes : copie de la notification d'octroi de la subvention ; copie du budget prévisionnel ; copie des derniers bilans de l'association.</p></div>`,
    countriesJson: C_ASSO,
  },

  // ── 12. Lettre d'acceptation d'un nouvel adhérent ──────────────────────────
  {
    code: 'asso_acceptation_adhesion', name: 'Lettre d’acceptation d’un nouvel adhérent', category: 'association',
    price: 400, priceMax: 1200, popularity: 34,
    description: 'Lettre informant un candidat que sa demande d’adhésion à l’association est acceptée, sous réserve du règlement de la cotisation annuelle et de l’acceptation des statuts.',
    fieldsJson: F([
      { key: 'association', label: 'Dénomination de l’association', type: 'text', required: true },
      { key: 'destinataire', label: 'Nouvel adhérent (civilité, nom, prénom, adresse)', type: 'textarea', required: true },
      { key: 'montant_cotisation', label: 'Montant de la cotisation annuelle (en FCFA)', type: 'text', required: true },
      { key: 'organe_vote', label: 'Organe ayant voté la cotisation (Conseil d’administration, assemblée générale…)', type: 'text', required: true },
      { key: 'modalites_paiement', label: 'Modalités de règlement (chèque, espèces, mobile money…)', type: 'textarea', required: true },
      { key: 'siege', label: 'Adresse du siège de l’association', type: 'text', required: true },
      { key: 'signataire', label: 'Signataire (nom + qualité : Président ou délégué)', type: 'text', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p class="align-right">{{ville}}, le {{date_jour}}</p><p><strong>{{destinataire}}</strong></p><p><strong>Objet : Acceptation de votre adhésion à l'association {{association}}</strong></p><p>Madame, Monsieur,</p><p>Nous avons le plaisir de vous informer qu'après étude de votre requête, nous sommes disposés à vous compter parmi les membres actifs de l'association <strong>{{association}}</strong>.</p><p>Cependant, cette adhésion ne sera définitive qu'à compter du règlement de la somme de <strong>{{montant_cotisation}} FCFA</strong>, correspondant à la cotisation annuelle votée par notre {{organe_vote}}.</p><p>Vous pouvez procéder au règlement de cette somme selon les modalités suivantes : {{modalites_paiement}}, ou en vous rendant au siège de l'association, sis {{siege}}.</p><p>De plus, l'adhésion à notre association emporte acceptation pleine et entière de nos statuts, de notre règlement intérieur et de nos valeurs.</p><p>Dans l'attente de vous lire, je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.</p><p class="signatures">{{signataire}}</p></div>`,
    countriesJson: C_ASSO,
  },

  // ── 13. Appel de cotisations aux adhérents ─────────────────────────────────
  {
    code: 'asso_appel_cotisation', name: 'Appel de cotisation aux adhérents d’une association', category: 'association',
    price: 400, priceMax: 1200, popularity: 44,
    description: 'Lettre d’appel des cotisations annuelles auprès des adhérents : montant voté, modalités de règlement et rappel que seuls les membres à jour participent aux assemblées.',
    fieldsJson: F([
      { key: 'association', label: 'Dénomination de l’association', type: 'text', required: true },
      { key: 'destinataire', label: 'Adhérent (civilité, nom, prénom, adresse)', type: 'textarea', required: true },
      { key: 'exercice', label: 'Exercice pour lequel la cotisation est appelée (ex. 2026)', type: 'text', required: true },
      { key: 'article_statuts', label: 'Article des statuts relatif au financement de l’association', type: 'text', required: true },
      { key: 'organe_vote', label: 'Organe ayant voté le montant (assemblée générale, bureau…)', type: 'text', required: true },
      { key: 'date_vote', label: 'Date de la décision fixant le montant', type: 'date', required: true },
      { key: 'montant', label: 'Montant de la cotisation annuelle (en FCFA)', type: 'text', required: true },
      { key: 'modalites_paiement', label: 'Modalités de règlement (chèque à l’ordre de…, espèces, mobile money…)', type: 'textarea', required: true },
      { key: 'signataire', label: 'Signataire (nom + qualité : Président ou Trésorier)', type: 'text', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p class="align-right">{{ville}}, le {{date_jour}}</p><p><strong>{{destinataire}}</strong></p><p><strong>Objet : Appel des cotisations pour l'exercice {{exercice}} de l'association {{association}}</strong></p><p>Cher adhérent, cher ami,</p><p>J'ai l'honneur de vous informer que, conformément à l'article {{article_statuts}} de nos statuts, la cotisation à notre association doit être versée pour l'année {{exercice}}.</p><p>Comme vous le savez, {{organe_vote}} de notre association, par décision en date du {{date_vote}}, a fixé le montant de la cotisation annuelle à <strong>{{montant}} FCFA</strong>.</p><p>Nous vous remercions en conséquence de bien vouloir nous faire parvenir votre règlement selon les modalités suivantes : {{modalites_paiement}}, en indiquant vos nom et prénom.</p><p>Nous vous rappelons que, conformément aux statuts de notre association, seuls les membres à jour de leurs cotisations pourront avoir accès aux assemblées et participer à la vie de l'association.</p><p>Dans l'attente de votre règlement et de vous revoir, veuillez agréer, cher adhérent, cher ami, l'expression de nos salutations distinguées.</p><p class="signatures">{{signataire}}</p></div>`,
    countriesJson: C_ASSO,
  },

  // ── 14. Relance de cotisation impayée ──────────────────────────────────────
  {
    code: 'asso_relance_cotisation', name: 'Relance de cotisation impayée d’un adhérent', category: 'association',
    price: 400, priceMax: 1200, popularity: 36,
    description: 'Lettre de rappel adressée à un adhérent n’ayant pas réglé sa cotisation : rappel de l’appel initial, conséquences du non-paiement et risque d’exclusion statutaire.',
    fieldsJson: F([
      { key: 'association', label: 'Dénomination de l’association', type: 'text', required: true },
      { key: 'destinataire', label: 'Adhérent (civilité, nom, prénom, adresse)', type: 'textarea', required: true },
      { key: 'exercice', label: 'Exercice concerné (ex. 2026)', type: 'text', required: true },
      { key: 'date_appel', label: 'Date d’envoi de l’appel de cotisations initial', type: 'date', required: true },
      { key: 'organe_vote', label: 'Organe ayant voté le montant (assemblée générale, bureau…)', type: 'text', required: true },
      { key: 'date_vote', label: 'Date de la décision fixant le montant', type: 'date', required: true },
      { key: 'montant', label: 'Montant de la cotisation annuelle (en FCFA)', type: 'text', required: true },
      { key: 'article_exclusion', label: 'Article des statuts relatif à l’exclusion des membres', type: 'text', required: true },
      { key: 'modalites_paiement', label: 'Modalités de règlement (chèque à l’ordre de…, espèces, mobile money…)', type: 'textarea', required: true },
      { key: 'signataire', label: 'Signataire (nom + qualité : Président ou Trésorier)', type: 'text', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p class="align-right">{{ville}}, le {{date_jour}}</p><p><strong>{{destinataire}}</strong></p><p><strong>Objet : Rappel du paiement de la cotisation pour l'exercice {{exercice}} de l'association {{association}}</strong></p><p>Cher adhérent, cher ami,</p><p>Par courrier en date du {{date_appel}}, je vous indiquais que {{organe_vote}} de notre association, par décision en date du {{date_vote}}, a fixé le montant de la cotisation annuelle à <strong>{{montant}} FCFA</strong>.</p><p>Or, à ce jour, nous constatons que nous n'avons toujours pas reçu de paiement de votre part pour la cotisation de l'année {{exercice}}.</p><p>Nous vous rappelons que le paiement des cotisations par les membres de l'association {{association}} est nécessaire à la réalisation du but qu'elle s'est fixé.</p><p>De plus, faute d'être à jour de vos cotisations, vous ne pourrez pas participer à la vie associative, ni même voter dans le cadre des assemblées générales organisées.</p><p>Enfin, nous vous indiquons que, conformément à l'article {{article_exclusion}} de nos statuts, le non-paiement des cotisations par un membre de l'association est de nature à éventuellement justifier son exclusion.</p><p>Nous vous remercions en conséquence de bien vouloir régulariser votre situation en nous faisant parvenir votre règlement selon les modalités suivantes : {{modalites_paiement}}.</p><p>Dans l'attente de ce règlement et de vous revoir, veuillez agréer, cher adhérent, cher ami, l'expression de nos salutations distinguées.</p><p class="signatures">{{signataire}}</p></div>`,
    countriesJson: C_ASSO,
  },

  // ── 15. Convocation à un entretien préalable à l'exclusion ─────────────────
  {
    code: 'asso_entretien_prealable_exclusion', name: 'Convocation à un entretien préalable à l’exclusion d’un membre', category: 'association',
    price: 600, priceMax: 1500, popularity: 18,
    description: 'Lettre recommandée informant un membre qu’une procédure d’exclusion est envisagée et l’invitant à présenter ses observations par écrit ou lors d’un entretien.',
    fieldsJson: F([
      { key: 'association', label: 'Dénomination de l’association', type: 'text', required: true },
      { key: 'membre', label: 'Membre concerné (civilité, nom, prénom, adresse)', type: 'textarea', required: true },
      { key: 'motifs', label: 'Motifs susceptibles d’entraîner l’exclusion (ex. refus de payer la cotisation annuelle)', type: 'textarea', required: true },
      { key: 'date_limite_ecrit', label: 'Date limite pour faire valoir ses observations par écrit', type: 'date', required: true },
      { key: 'date_entretien', label: 'Date de l’entretien', type: 'date', required: true },
      { key: 'heure_entretien', label: 'Heure de l’entretien', type: 'text', required: true },
      { key: 'signataire', label: 'Signataire (nom + qualité : Président ou délégué)', type: 'text', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p class="align-right">{{ville}}, le {{date_jour}}</p><p><strong>{{membre}}</strong></p><p><em>Lettre recommandée avec avis de réception</em></p><p><strong>Objet : Convocation à un entretien préalable à une exclusion de l'association {{association}}</strong></p><p>Madame, Monsieur,</p><p>Nous vous informons que nous envisageons votre exclusion de l'association <strong>{{association}}</strong>, en raison des faits suivants :</p><p>{{motifs}}</p><p>C'est pourquoi nous vous invitons à faire valoir vos observations par écrit avant le <strong>{{date_limite_ecrit}}</strong>, ou lors d'un entretien qui aura lieu le <strong>{{date_entretien}}</strong> à {{heure_entretien}} au siège de l'association.</p><p>Vous souhaitant bonne réception de la présente, je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.</p><p class="signatures">{{signataire}}</p><p class="text-small">Pièces jointes : copie de tous justificatifs des faits reprochés.</p></div>`,
    countriesJson: C_ASSO,
  },

  // ── 16. Déclaration de dissolution de l'association ────────────────────────
  {
    code: 'asso_declaration_dissolution', name: 'Déclaration de dissolution d’une association', category: 'association',
    price: 800, priceMax: 2000, popularity: 21,
    description: 'Lettre officielle informant l’autorité d’enregistrement de la dissolution de l’association votée en assemblée générale, avec extrait du PV et demande de récépissé.',
    fieldsJson: F([
      { key: 'association', label: 'Dénomination de l’association', type: 'text', required: true },
      { key: 'numero_depot', label: 'Numéro de déclaration de l’association', type: 'text', required: true },
      { key: 'siege', label: 'Adresse du siège social', type: 'text', required: true },
      { key: 'autorite', label: 'Autorité destinataire (Préfecture, Ministère de l’Intérieur…)', type: 'textarea', required: true },
      { key: 'date_ag', label: 'Date de l’assemblée générale ayant décidé la dissolution', type: 'date', required: true },
      { key: 'president', label: 'Président (nom, prénom)', type: 'text', required: true },
      { key: 'secretaire', label: 'Secrétaire (nom, prénom)', type: 'text', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p><strong>Association {{association}}</strong><br/>Numéro de dépôt : {{numero_depot}}<br/>{{siege}}</p><p class="align-right">{{ville}}, le {{date_jour}}</p><p>À l'attention de : <strong>{{autorite}}</strong></p><p><em>Lettre recommandée avec avis de réception</em></p><p>Monsieur le Préfet,</p><p>Nous avons l'honneur de vous faire connaître que l'assemblée générale des membres de l'association <strong>{{association}}</strong>, en date du {{date_ag}}, a décidé de sa dissolution.</p><p>Vous trouverez ci-joint un extrait du procès-verbal de l'assemblée générale faisant apparaître la délibération emportant dissolution de l'association, daté du même jour que l'assemblée générale et signé par nos soins, ainsi que la demande d'insertion au journal officiel.</p><p>Nous vous demandons de bien vouloir nous délivrer le récépissé de la présente déclaration.</p><p>Dans l'attente, nous vous prions d'agréer, Monsieur le Préfet, l'expression de notre considération distinguée.</p><p class="signatures">{{president}}, Président de l'association {{association}}<br/><br/>{{secretaire}}, Secrétaire de l'association {{association}}</p><p class="text-small">PJ : extrait du procès-verbal d'assemblée, certifié conforme par le Président et le Secrétaire ; notice d'insertion au journal officiel de la dissolution.</p></div>`,
    countriesJson: C_ASSO,
  },

  // ── 17. Déclaration de changement des dirigeants de l'association ──────────
  {
    code: 'asso_changement_dirigeants', name: 'Déclaration de changement des dirigeants d’association', category: 'association',
    price: 800, priceMax: 2000, popularity: 27,
    description: 'Lettre déclarant à l’autorité d’enregistrement le renouvellement du bureau ou du conseil d’administration voté en assemblée générale, avec la nouvelle composition détaillée.',
    fieldsJson: F([
      { key: 'association', label: 'Dénomination de l’association', type: 'text', required: true },
      { key: 'numero_depot', label: 'Numéro de déclaration de l’association', type: 'text', required: true },
      { key: 'siege', label: 'Adresse du siège social', type: 'text', required: true },
      { key: 'autorite', label: 'Autorité destinataire (Préfecture, Ministère de l’Intérieur…)', type: 'textarea', required: true },
      { key: 'date_ag', label: 'Date de l’assemblée générale ayant renouvelé l’organe de direction', type: 'date', required: true },
      { key: 'organe', label: 'Organe renouvelé (Bureau, Conseil d’administration…)', type: 'text', required: true },
      { key: 'president', label: 'Nouveau Président (nom, prénom, adresse, nationalité, date et lieu de naissance)', type: 'textarea', required: true },
      { key: 'secretaire', label: 'Nouveau Secrétaire (nom, prénom, adresse, nationalité, date et lieu de naissance)', type: 'textarea', required: true },
      { key: 'tresorier', label: 'Nouveau Trésorier (nom, prénom, adresse, nationalité, date et lieu de naissance)', type: 'textarea', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p><strong>Association {{association}}</strong><br/>Numéro de dépôt : {{numero_depot}}<br/>{{siege}}</p><p class="align-right">{{ville}}, le {{date_jour}}</p><p>À l'attention de : <strong>{{autorite}}</strong></p><p><em>Lettre recommandée avec avis de réception</em></p><p>Monsieur le Préfet,</p><p>Nous avons l'honneur, conformément aux dispositions légales applicables aux associations, de déclarer les modifications apportées par l'assemblée générale en date du {{date_ag}}.</p><p>À cette occasion, l'assemblée générale a procédé au renouvellement de son {{organe}}, qui est désormais composé comme suit :</p><p>— <strong>Président :</strong> {{president}}</p><p>— <strong>Secrétaire :</strong> {{secretaire}}</p><p>— <strong>Trésorier :</strong> {{tresorier}}</p><p>Vous trouverez ci-joint un extrait du procès-verbal de l'assemblée générale faisant apparaître la délibération emportant renouvellement des organes de direction, daté du même jour que l'assemblée générale et signé par nos soins.</p><p>Nous vous demandons de bien vouloir nous délivrer le récépissé de la présente déclaration.</p><p>Dans l'attente, nous vous prions d'agréer, Monsieur le Préfet, l'expression de notre considération distinguée.</p><p class="signatures">Le Président — Le Secrétaire</p><p class="text-small">PJ : extrait du procès-verbal d'assemblée, certifié conforme par le Président et le Secrétaire.</p></div>`,
    countriesJson: C_ASSO,
  },

  // ── 18. Attestation de domiciliation de l'association ──────────────────────
  {
    code: 'asso_attestation_domiciliation', name: 'Attestation de domiciliation d’une association', category: 'association',
    price: 400, priceMax: 1000, popularity: 31,
    description: 'Attestation par laquelle une personne (en général le Président) accepte la domiciliation du siège social de l’association à son domicile — pièce demandée lors de la déclaration.',
    fieldsJson: F([
      { key: 'declarant', label: 'Personne qui domicilie l’association (nom, prénom)', type: 'text', required: true },
      { key: 'adresse', label: 'Adresse complète du domicile (futur siège social)', type: 'textarea', required: true },
      { key: 'association', label: 'Dénomination de l’association domiciliée', type: 'text', required: true },
      { key: 'ville', label: 'Ville de rédaction', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>ATTESTATION DE DOMICILIATION</h1><p>Je soussigné(e) <strong>{{declarant}}</strong>, demeurant {{adresse}},</p><p>déclare accepter la domiciliation et l'établissement du siège social de l'association <strong>{{association}}</strong> à l'adresse indiquée ci-dessus.</p><p>Fait pour servir et valoir ce que de droit.</p><p class="signatures">Fait à {{ville}}, le {{date_jour}}.<br/><br/>{{declarant}}<br/>(Signature)</p></div>`,
    countriesJson: C_ASSO,
  },

  // ── 19. Demande de devis d'assurance pour un évènement associatif ──────────
  // Fusion : devis « évènementiel » + « association sportive » + « encadrant des mineurs » + « RC facultative ».
  {
    code: 'asso_devis_assurance_evenement', name: 'Demande de devis d’assurance pour un évènement associatif', category: 'association',
    price: 700, priceMax: 1800, popularity: 19,
    description: 'Lettre à un assureur pour obtenir un devis de couverture responsabilité civile et garanties complémentaires à l’occasion d’une manifestation organisée par l’association.',
    fieldsJson: F([
      { key: 'association', label: 'Dénomination de l’association', type: 'text', required: true },
      { key: 'objet', label: 'Objet de l’association (figure dans les statuts)', type: 'textarea', required: true },
      { key: 'assureur', label: 'Assureur destinataire (nom et adresse)', type: 'textarea', required: true },
      { key: 'nb_adherents', label: 'Nombre d’adhérents', type: 'text', required: true },
      { key: 'ressources', label: 'Nature et montant des ressources (subventions, cotisations…)', type: 'textarea', required: true },
      { key: 'evenement', label: 'Évènement à assurer (type, date, lieu, nombre de personnes attendues)', type: 'textarea', required: true },
      { key: 'encadrement', label: 'Encadrement prévu (salariés, bénévoles, prestataires — effectifs par poste)', type: 'textarea', required: true },
      { key: 'signataire', label: 'Signataire (nom, prénom et qualité : Président ou délégué)', type: 'text', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p class="align-right">{{ville}}, le {{date_jour}}</p><p><strong>{{assureur}}</strong></p><p><em>Lettre recommandée avec avis de réception</em></p><p><strong>Objet : Demande de devis pour assurer une manifestation associative</strong></p><p>Madame, Monsieur,</p><p>L'association <strong>{{association}}</strong> a pour objet : {{objet}}</p><p>Nous comptons à l'heure actuelle {{nb_adherents}} adhérents. Nos ressources sont les suivantes : {{ressources}}</p><p>Afin d'augmenter nos ressources et d'animer la vie de notre association, nous préparons l'évènement suivant : {{evenement}}</p><p>L'encadrement de cet évènement sera constitué comme suit : {{encadrement}}</p><p>Nous souhaitons donc couvrir l'engagement de notre responsabilité civile pour cet évènement majeur de la vie de notre association. Quels en seraient le coût et les modalités ?</p><p>D'autre part, nous réfléchissons à l'opportunité de souscrire des garanties complémentaires, telles qu'une garantie annulation de l'évènement. Aussi, accepteriez-vous de nous conseiller sur l'opportunité et le coût de garanties supplémentaires concernant le lieu de l'évènement, notre matériel, nos salariés, nos bénévoles, mais aussi et surtout le public amené à être en contact avec notre association ?</p><p>Dans l'attente de votre réponse, nous vous prions d'agréer, Madame, Monsieur, l'expression de nos salutations distinguées.</p><p class="signatures">{{signataire}}</p><p class="text-small">Pièces jointes : budget prévisionnel de l'opération ; derniers bilans de l'association ; plans des locaux utilisés ; factures du matériel devant être assuré ; statuts de l'association ; copie d'une pièce d'identité du signataire ; copie de la résolution donnant pouvoir au signataire de souscrire un contrat d'assurance.</p></div>`,
    countriesJson: C_ASSO,
  },

  // ── 20. Déclaration de sinistre à l'assurance par une association ──────────
  {
    code: 'asso_declaration_sinistre', name: 'Déclaration de sinistre à l’assurance par une association', category: 'association',
    price: 600, priceMax: 1500, popularity: 23,
    description: 'Lettre de déclaration d’un sinistre (dommage à un bien, accident d’un salarié, bénévole, adhérent ou du public) à l’assureur de l’association, avec causes, conséquences et justificatifs.',
    fieldsJson: F([
      { key: 'association', label: 'Dénomination de l’association', type: 'text', required: true },
      { key: 'assureur', label: 'Assureur destinataire (nom et adresse)', type: 'textarea', required: true },
      { key: 'numero_contrat', label: 'Numéro du contrat d’assurance', type: 'text', required: true },
      { key: 'date_heure_sinistre', label: 'Date et heure approximative du sinistre', type: 'text', required: true },
      { key: 'objet_sinistre', label: 'Bien endommagé ou personne victime (préciser sa qualité : salarié, bénévole, adhérent, public…)', type: 'textarea', required: true },
      { key: 'nature', label: 'Nature du sinistre (vol, accident, destruction, vandalisme…)', type: 'text', required: true },
      { key: 'cause', label: 'Cause du sinistre (détailler)', type: 'textarea', required: true },
      { key: 'consequences', label: 'Conséquences immédiates et dommages attendus (avec coûts estimés si possible)', type: 'textarea', required: true },
      { key: 'signataire', label: 'Signataire (nom, prénom et fonction dans l’association)', type: 'text', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p class="align-right">{{ville}}, le {{date_jour}}</p><p><strong>{{assureur}}</strong></p><p><em>Lettre recommandée avec avis de réception</em></p><p><strong>Objet : Déclaration de sinistre — contrat n° {{numero_contrat}}</strong></p><p>Madame, Monsieur,</p><p>Le {{date_heure_sinistre}}, l'association <strong>{{association}}</strong> a subi un sinistre concernant : {{objet_sinistre}}</p><p>Il s'agit d'un sinistre de la nature suivante : <strong>{{nature}}</strong>.</p><p>La cause de ce sinistre est la suivante : {{cause}}</p><p>Les conséquences immédiates et les dommages auxquels nous nous attendons sont les suivants : {{consequences}}</p><p>Nous joignons à la présente déclaration toutes les pièces justificatives en notre possession.</p><p>Par ailleurs, deux questions se posent : nous souhaiterions savoir si notre assurance nous couvre bien pour ce type de sinistre, et à quelle hauteur ?</p><p>Enfin, accepteriez-vous de nous tenir rapidement au courant des conséquences de notre déclaration, des démarches que nous devons entreprendre, et de l'avancement de notre dossier d'indemnisation ?</p><p>Dans l'attente de votre réponse, ou pour toute demande de renseignements complémentaires, nous nous tenons à votre disposition et vous prions d'agréer, Madame, Monsieur, l'expression de nos salutations distinguées.</p><p class="signatures">{{signataire}}</p><p class="text-small">Pièces jointes : expertises ; certificats médicaux ; photos ; témoignages prouvant la réalité du sinistre ; documents comptables démontrant la perte d'exploitation le cas échéant.</p></div>`,
    countriesJson: C_ASSO,
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
  console.log('Seed Drive3 Associations (Agent Drive3-9/10) terminé.');
  console.log(`   Templates du script : ${templates.length} (créés : ${created}, mis à jour : ${updated})`);
  console.log(`   Catégorie : association`);
  console.log(`   Total de templates en base : ${total}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
