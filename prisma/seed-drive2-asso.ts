// Seed Drive2 Associations — Agent Drive2-7/10 : 12 modèles ASSOCIATIONS/ONG convertis
// depuis le Google Drive IBIG (« KIT PRATIQUE DE GESTION DES ASSOCIATIONS »).
// NB : le dossier « KIT PROTECTION ET SECURITE SOCIALE » ne contient que des livres PDF,
// aucun modèle .docx exploitable — tous les modèles proviennent donc du kit associations.
// Script ADDITIF : upsert par code — n'écrase pas les templates existants.
// Exécution : npx tsx prisma/seed-drive2-asso.ts
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
  // ── 1. Lettre de convocation à l'assemblée générale annuelle ───────────────
  {
    code: 'asso_convocation_ag', name: 'Convocation à l’assemblée générale d’association', category: 'association',
    price: 500, priceMax: 1500, popularity: 52,
    description: 'Lettre de convocation des adhérents à l’assemblée générale annuelle : ordre du jour, représentation par pouvoir et rappel des cotisations.',
    fieldsJson: F([
      { key: 'association', label: 'Dénomination de l’association', type: 'text', required: true },
      { key: 'destinataire', label: 'Adhérent convoqué (civilité, nom, prénom)', type: 'text', required: true },
      { key: 'date_ag', label: 'Date de l’assemblée générale', type: 'date', required: true },
      { key: 'heure_ag', label: 'Heure de l’assemblée', type: 'text', required: true },
      { key: 'lieu_ag', label: 'Lieu de l’assemblée (ex. au siège social)', type: 'text', required: true },
      { key: 'ordre_du_jour', label: 'Ordre du jour (un point par ligne)', type: 'textarea', required: true },
      { key: 'signataire', label: 'Signataire (nom + qualité, en général le Président)', type: 'text', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p class="align-right">{{ville}}, le {{date_jour}}</p><p><strong>{{destinataire}}</strong></p><p><strong>Objet : Convocation à l'assemblée générale annuelle de l'association {{association}}</strong></p><p>Madame, Monsieur,</p><p>J'ai l'honneur de vous informer, conformément aux dispositions de nos statuts, que vous êtes convié(e) à l'assemblée générale annuelle de notre association.</p><p>Cette assemblée générale se tiendra le <strong>{{date_ag}}</strong> à <strong>{{heure_ag}}</strong>, {{lieu_ag}}.</p><p>L'ordre du jour sera le suivant :</p><p>{{ordre_du_jour}}</p><p>En outre, j'ai le plaisir de vous informer que tous les documents d'information relatifs à cette assemblée sont tenus à votre disposition au siège de l'association et sont consultables durant les heures de permanence.</p><p>Je vous rappelle qu'en cas d'empêchement de votre part, vous pouvez vous faire représenter par un autre membre de l'association muni d'un pouvoir en bonne et due forme, conformément aux dispositions des statuts de notre association.</p><p>Enfin, je tiens à préciser que, conformément aux statuts, seuls les membres à jour de leurs cotisations pourront participer à l'assemblée générale annuelle.</p><p>Veuillez agréer, Madame, Monsieur, l'expression de mes sentiments distingués.</p><p class="signatures">{{signataire}}</p></div>`,
    countriesJson: C_ASSO,
  },

  // ── 2. Procès-verbal de l'assemblée générale ordinaire annuelle ────────────
  {
    code: 'asso_pv_ago', name: 'PV d’assemblée générale ordinaire d’association', category: 'association',
    price: 1500, priceMax: 3000, popularity: 48,
    description: 'Procès-verbal complet de l’AG ordinaire annuelle : approbation des comptes, budget prévisionnel et fixation des cotisations.',
    fieldsJson: F([
      { key: 'association', label: 'Dénomination de l’association', type: 'text', required: true },
      { key: 'siege', label: 'Adresse du siège social', type: 'text', required: true },
      { key: 'numero_depot', label: 'Numéro de déclaration (Préfecture / autorité compétente)', type: 'text', required: true },
      { key: 'date_ag', label: 'Date de l’assemblée', type: 'date', required: true },
      { key: 'presents', label: 'Membres présents ou représentés / total (ex. 25 sur 40)', type: 'text', required: true },
      { key: 'exercice', label: 'Exercice soumis à approbation (ex. exercice clos au 31/12/2025)', type: 'text', required: true },
      { key: 'cotisations', label: 'Cotisations fixées pour l’exercice à venir (détail par catégorie de membres, en FCFA)', type: 'textarea', required: true },
      { key: 'president_secretaire', label: 'Président et Secrétaire de séance (noms)', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>PROCÈS-VERBAL DE L'ASSEMBLÉE GÉNÉRALE ORDINAIRE ANNUELLE</h1><p>Association <strong>{{association}}</strong><br/>Siège : {{siege}}<br/>Déclarée sous le n° {{numero_depot}}</p><p>Le {{date_ag}}, les membres de l'association {{association}} se sont réunis en assemblée ordinaire annuelle au siège social, sur convocation régulière faite conformément aux statuts.</p><p>Sont présents ou représentés {{presents}} membres de l'association.</p><p>Le Président constate en conséquence que l'assemblée générale peut valablement délibérer et prendre ses décisions à la majorité requise pour chacun des points évoqués dans l'ordre du jour adressé aux adhérents.</p><h2>Ordre du jour</h2><p>1) Présentation du rapport d'activité de l'association pour {{exercice}} ;<br/>2) Présentation des comptes annuels et du rapport de gestion par le Trésorier ;<br/>3) Présentation du budget prévisionnel et fixation du montant de la cotisation pour l'exercice à venir.</p><p>Le Président présente aux membres de l'association les comptes annuels établis à la clôture de l'exercice, son rapport d'activité pour l'exercice écoulé, et évoque le budget prévisionnel pour l'année à venir. La discussion s'engage entre les membres et, personne ne demandant plus la parole, le Président met successivement aux voix les résolutions suivantes :</p><h2>Première résolution</h2><p>L'assemblée, après avoir entendu le rapport de gestion sur l'activité de l'association au cours de {{exercice}}, et pris connaissance des comptes et du bilan de l'association pour ledit exercice, les approuve dans leur totalité tels qu'ils lui ont été présentés, et donne quitus de sa gestion au Trésorier.</p><p>Cette résolution, mise aux voix, est adoptée à l'unanimité.</p><h2>Deuxième résolution</h2><p>L'assemblée, après avoir eu lecture du projet de budget pour l'exercice à venir, l'approuve dans sa totalité tel qu'il lui a été présenté.</p><p>Cette résolution, mise aux voix, est adoptée à l'unanimité.</p><h2>Troisième résolution</h2><p>L'assemblée générale, après avoir eu lecture du budget prévisionnel pour l'année à venir, et pour réaliser les buts fixés dans les statuts de l'association, décide de fixer pour l'année à venir la cotisation de la manière suivante :</p><p>{{cotisations}}</p><p>Cette résolution, mise aux voix, est adoptée à l'unanimité.</p><p>L'ordre du jour étant épuisé, la séance est levée.</p><p>De tout ce qui précède, il a été dressé le présent procès-verbal, signé par le Président et le Secrétaire.</p><p class="signatures">{{president_secretaire}}<br/><br/>Le Président — Le Secrétaire</p></div>`,
    countriesJson: C_ASSO,
  },

  // ── 3. Procès-verbal de l'assemblée générale extraordinaire ────────────────
  {
    code: 'asso_pv_age', name: 'PV d’assemblée générale extraordinaire d’association', category: 'association',
    price: 1500, priceMax: 3000, popularity: 38,
    description: 'Procès-verbal d’AG extraordinaire : modification des statuts, transfert de siège, dissolution ou toute opération exceptionnelle.',
    fieldsJson: F([
      { key: 'association', label: 'Dénomination de l’association', type: 'text', required: true },
      { key: 'siege', label: 'Adresse du siège social', type: 'text', required: true },
      { key: 'numero_depot', label: 'Numéro de déclaration (Préfecture / autorité compétente)', type: 'text', required: true },
      { key: 'date_ag', label: 'Date de l’assemblée', type: 'date', required: true },
      { key: 'presents', label: 'Membres présents ou représentés / total (ex. 25 sur 40)', type: 'text', required: true },
      { key: 'operation', label: 'Opération soumise à l’assemblée (ex. transfert de siège, modification de l’objet, dissolution…)', type: 'textarea', required: true },
      { key: 'article_modifie', label: 'Article des statuts modifié en conséquence (numéro et nouvelle rédaction)', type: 'textarea', required: true },
      { key: 'president_secretaire', label: 'Président et Secrétaire de séance (noms)', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>PROCÈS-VERBAL DE L'ASSEMBLÉE GÉNÉRALE EXTRAORDINAIRE</h1><p>Association <strong>{{association}}</strong><br/>Siège : {{siege}}<br/>Déclarée sous le n° {{numero_depot}}</p><p>Le {{date_ag}}, les membres de l'association {{association}} se sont réunis en assemblée générale extraordinaire au siège social, sur convocation régulière faite conformément aux statuts.</p><p>Sont présents ou représentés {{presents}} membres de l'association.</p><p>Le Président constate en conséquence que l'assemblée générale peut valablement délibérer et prendre ses décisions à la majorité requise pour chacun des points évoqués dans l'ordre du jour adressé aux adhérents.</p><h2>Ordre du jour</h2><p>1) Présentation du rapport du Président sur l'opération projetée ;<br/>2) Délibération sur la modification des statuts corrélative à cette opération.</p><p>Le Président présente aux membres de l'association le projet suivant, conformément aux dispositions statutaires :</p><p>{{operation}}</p><p>Le Président rappelle que le texte des résolutions proposées à l'assemblée a été envoyé aux membres dans le délai prévu par les statuts avant la date de tenue de la présente assemblée. La discussion s'engage entre les membres et, personne ne demandant plus la parole, le Président met successivement aux voix les résolutions suivantes :</p><h2>Première résolution</h2><p>L'assemblée, après avoir eu lecture du rapport du Président sur l'opération projetée, approuve l'opération dans toutes ses dispositions.</p><p>Cette résolution, mise aux voix, est adoptée à l'unanimité.</p><h2>Deuxième résolution</h2><p>Les statuts de l'association {{association}} sont modifiés en conséquence comme suit :</p><p>{{article_modifie}}</p><p>Cette résolution, mise aux voix, est adoptée à l'unanimité.</p><p>L'ordre du jour étant épuisé, la séance est levée.</p><p>De tout ce qui précède, il a été dressé le présent procès-verbal, signé par le Président et le Secrétaire.</p><p class="signatures">{{president_secretaire}}<br/><br/>Le Président — Le Secrétaire</p></div>`,
    countriesJson: C_ASSO,
  },

  // ── 4. Pouvoir de représentation pour l'assemblée générale ─────────────────
  {
    code: 'asso_pouvoir_ag', name: 'Pouvoir de représentation pour l’AG d’une association', category: 'association',
    price: 500, priceMax: 1200, popularity: 40,
    description: 'Pouvoir donné par un membre empêché à un autre membre pour le représenter et voter lors de l’assemblée générale.',
    fieldsJson: F([
      { key: 'mandant', label: 'Membre qui donne pouvoir (nom, prénom)', type: 'text', required: true },
      { key: 'association', label: 'Dénomination de l’association', type: 'text', required: true },
      { key: 'numero_depot', label: 'Numéro de déclaration de l’association', type: 'text', required: true },
      { key: 'siege', label: 'Adresse du siège de l’association', type: 'text', required: true },
      { key: 'mandataire', label: 'Membre investi du pouvoir (nom, prénom et adresse)', type: 'text', required: true },
      { key: 'date_reunion', label: 'Date de l’assemblée générale', type: 'date', required: true },
      { key: 'lieu_reunion', label: 'Lieu et heure de l’assemblée', type: 'text', required: true },
      { key: 'ville', label: 'Ville de rédaction du pouvoir', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>POUVOIR DE REPRÉSENTATION</h1><p>Je soussigné(e) <strong>{{mandant}}</strong>, membre de l'association <strong>{{association}}</strong>, déclarée sous le numéro de dépôt {{numero_depot}}, dont le siège est sis {{siege}},</p><p>Donne, par la présente, pouvoir à <strong>{{mandataire}}</strong>, également membre de l'association {{association}}, pour me représenter lors de l'assemblée générale annuelle qui se tiendra à {{lieu_reunion}}, le {{date_reunion}}, à l'effet de délibérer sur l'ordre du jour tel qu'il figure dans la convocation.</p><p>En conséquence, prendre part à toutes discussions et délibérations, prendre connaissance de tous documents, émettre tous votes et, généralement, faire le nécessaire.</p><p class="signatures">Fait à {{ville}}, le {{date_jour}}.<br/><br/>Signature du membre qui donne mandat<br/>(précédée de la mention manuscrite « Bon pour pouvoir »)<br/><br/>Signature du membre qui représentera le mandant<br/>(précédée de la mention manuscrite « Bon pour acceptation »)</p></div>`,
    countriesJson: C_ASSO,
  },

  // ── 5. Déclaration d'existence de l'association ────────────────────────────
  {
    code: 'asso_declaration_existence', name: 'Déclaration d’existence d’une association', category: 'association',
    price: 1000, priceMax: 2500, popularity: 55,
    description: 'Lettre officielle de déclaration de constitution de l’association auprès de la Préfecture ou de l’autorité compétente, avec composition du bureau.',
    fieldsJson: F([
      { key: 'association', label: 'Dénomination de l’association', type: 'text', required: true },
      { key: 'siege', label: 'Adresse complète du siège social (ville + rue)', type: 'text', required: true },
      { key: 'objet', label: 'Objet de l’association', type: 'textarea', required: true },
      { key: 'president', label: 'Président (nom, prénom, adresse, nationalité, date et lieu de naissance)', type: 'textarea', required: true },
      { key: 'secretaire', label: 'Secrétaire (nom, prénom, adresse, nationalité, date et lieu de naissance)', type: 'textarea', required: true },
      { key: 'tresorier', label: 'Trésorier (nom, prénom, adresse, nationalité, date et lieu de naissance)', type: 'textarea', required: true },
      { key: 'autorite', label: 'Autorité destinataire (ex. Préfecture d’Abidjan, Ministère de l’Intérieur…)', type: 'text', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p><strong>Association {{association}}</strong><br/>{{siege}}</p><p class="align-right">{{ville}}, le {{date_jour}}</p><p>À l'attention de : <strong>{{autorite}}</strong></p><p><em>Lettre recommandée avec avis de réception</em></p><p>Monsieur le Préfet,</p><p>Nous avons l'honneur, conformément aux dispositions légales applicables aux associations, de procéder à la déclaration d'existence de l'association <strong>{{association}}</strong>, dont le siège est sis {{siege}}.</p><p>Les membres de l'association {{association}} se sont fixés pour objet de : {{objet}}</p><p>Le bureau chargé de son administration est composé comme suit :</p><p>— <strong>Président :</strong> {{president}}</p><p>— <strong>Secrétaire :</strong> {{secretaire}}</p><p>— <strong>Trésorier :</strong> {{tresorier}}</p><p>Vous trouverez ci-joint deux exemplaires des statuts signés et certifiés conformes par le Président et le Secrétaire, la demande d'insertion au journal officiel, et l'attestation relative à la domiciliation de l'association.</p><p>Nous vous demandons de bien vouloir nous délivrer le récépissé de la présente déclaration.</p><p>Dans l'attente, nous vous prions d'agréer, Monsieur le Préfet, l'expression de notre considération distinguée.</p><p class="signatures">Le Président — Le Secrétaire</p><p class="text-small">PJ : statuts en deux exemplaires certifiés conformes ; attestation de domiciliation ; demande de publication au journal officiel.</p></div>`,
    countriesJson: C_ASSO,
  },

  // ── 6. Déclaration de modification des statuts ─────────────────────────────
  {
    code: 'asso_modification_statuts', name: 'Déclaration de modification des statuts d’association', category: 'association',
    price: 800, priceMax: 2000, popularity: 28,
    description: 'Lettre de déclaration des modifications statutaires adoptées en assemblée générale, à adresser à l’autorité d’enregistrement.',
    fieldsJson: F([
      { key: 'association', label: 'Dénomination de l’association', type: 'text', required: true },
      { key: 'numero_depot', label: 'Numéro de déclaration de l’association', type: 'text', required: true },
      { key: 'siege', label: 'Adresse du siège social', type: 'text', required: true },
      { key: 'autorite', label: 'Autorité destinataire (ex. Préfecture, Ministère de l’Intérieur…)', type: 'text', required: true },
      { key: 'date_ag', label: 'Date de l’assemblée générale ayant adopté les modifications', type: 'date', required: true },
      { key: 'ancien_article', label: 'Ancien article (numéro et texte)', type: 'textarea', required: true },
      { key: 'nouvel_article', label: 'Nouvel article (numéro et texte)', type: 'textarea', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p><strong>Association {{association}}</strong><br/>Numéro de dépôt : {{numero_depot}}<br/>{{siege}}</p><p class="align-right">{{ville}}, le {{date_jour}}</p><p>À l'attention de : <strong>{{autorite}}</strong></p><p><em>Lettre recommandée avec avis de réception</em></p><p>Monsieur le Préfet,</p><p>Nous avons l'honneur, conformément aux dispositions légales applicables aux associations, de déclarer les modifications statutaires apportées par l'assemblée générale en date du {{date_ag}}.</p><p>L'ancien article prévoyait que :</p><p>{{ancien_article}}</p><p>Celui-ci a été remplacé par le nouvel article dont la teneur est la suivante :</p><p>{{nouvel_article}}</p><p>Vous trouverez ci-joint un extrait du procès-verbal de l'assemblée générale faisant apparaître la délibération emportant modification des statuts, daté du même jour que l'assemblée générale et signé par nos soins.</p><p>Nous vous demandons de bien vouloir nous délivrer le récépissé de la présente déclaration.</p><p>Dans l'attente, nous vous prions d'agréer, Monsieur le Préfet, l'expression de notre considération distinguée.</p><p class="signatures">Le Président — Le Secrétaire</p><p class="text-small">PJ : extrait du procès-verbal d'assemblée, certifié conforme par le Président et le Secrétaire.</p></div>`,
    countriesJson: C_ASSO,
  },

  // ── 7. Convention de mise à disposition d'un terrain communal ──────────────
  {
    code: 'asso_convention_terrain_communal', name: 'Convention de mise à disposition d’un terrain communal', category: 'association',
    price: 2000, priceMax: 4000, popularity: 25,
    description: 'Convention entre une commune et une association pour la mise à disposition gratuite et temporaire d’un terrain ou d’un équipement communal.',
    fieldsJson: F([
      { key: 'commune', label: 'Nom de la commune', type: 'text', required: true },
      { key: 'maire', label: 'Maire en exercice (nom, prénom)', type: 'text', required: true },
      { key: 'date_deliberation', label: 'Date de la délibération du conseil municipal', type: 'date', required: true },
      { key: 'association', label: 'Association (dénomination, n° de dépôt, siège, représentant)', type: 'textarea', required: true },
      { key: 'objet_association', label: 'Objet de l’association et intérêt de la convention pour la commune', type: 'textarea', required: true },
      { key: 'terrain', label: 'Terrain mis à disposition (adresse, références cadastrales, superficie)', type: 'textarea', required: true },
      { key: 'duree', label: 'Durée de la mise à disposition', type: 'text', required: true },
      { key: 'ville', label: 'Ville de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONVENTION DE MISE À DISPOSITION TEMPORAIRE DE TERRAIN</h1><p><strong>ENTRE LES SOUSSIGNÉES :</strong></p><p>1. La COMMUNE DE <strong>{{commune}}</strong>, représentée aux fins des présentes par son Maire en exercice, {{maire}}, dûment habilité à l'effet des présentes par délibération du conseil municipal en date du {{date_deliberation}},</p><p>D'UNE PART,</p><p><strong>ET</strong></p><p>2. L'association {{association}}, représentée par son Président dûment habilité aux fins des présentes,</p><p>D'AUTRE PART.</p><h2>Préambule</h2><p>Afin d'apporter son soutien à l'association, la commune a souhaité mettre l'équipement ci-après désigné à sa disposition. {{objet_association}}</p><p>Ceci exposé, il a été arrêté et convenu ce qui suit :</p><h2>Article 1er</h2><p>La commune de {{commune}} met à la disposition gratuite de l'association les terrains suivants : {{terrain}}. Le plan des lieux est annexé aux présentes.</p><h2>Article 2</h2><p>La présente convention vaut autorisation d'occupation du domaine public communal. Celle-ci est consentie à titre précaire et elle est révocable à tout moment pour des motifs d'intérêt général par la commune. Il est entendu que la présente convention résulte d'un droit d'occupation à titre précaire, et non d'un bail, et que l'association renonce expressément à se prévaloir du statut des baux commerciaux et/ou à prétendre posséder un fonds de commerce.</p><h2>Article 3</h2><p>La commune délivrera les lieux en bon état d'usage, de propreté et d'entretien. Un état des lieux contradictoire sera dressé lors de la prise de possession et en fin d'occupation des lieux par un agent communal.</p><h2>Article 4</h2><p>La présente convention est conclue intuitu personae au profit de la seule association. Toute cession des droits définis dans la présente convention est interdite, notamment par location, sous-location, cession ou apport. La commune assurera l'ensemble des équipements au titre d'une assurance responsabilité civile et multirisque ; en contrepartie, l'association s'assurera pour l'ensemble de ses activités et transmettra annuellement à la commune l'attestation d'assurance correspondante.</p><h2>Article 5</h2><p>La présente convention est conclue pour une durée de {{duree}}, à compter de ce jour. Elle pourra faire l'objet d'un renouvellement à l'expiration de son terme par un avenant librement négocié entre les parties.</p><h2>Article 6</h2><p>La commune acquittera toutes les contributions et taxes frappant le sol et les constructions. Les taxes afférentes à la gestion et à l'exploitation seront prises en charge par l'association.</p><h2>Article 7</h2><p>L'association satisfera à toutes les obligations auxquelles les occupants sont ordinairement tenus, la commune n'étant tenue que des grosses réparations. L'association s'interdit d'apporter une quelconque modification à la destination des installations mises à sa disposition sans l'accord exprès de la commune.</p><h2>Article 8</h2><p>L'association percevra seule les recettes encaissées par l'exploitation du bien mis à sa disposition.</p><h2>Article 9</h2><p>La présente convention pourra être résiliée de plein droit par le simple envoi d'une lettre recommandée avec accusé de réception de la part de l'une ou l'autre des parties, en cas de non-exécution de l'un des articles ci-dessus, après mise en demeure restée infructueuse pendant un délai d'un mois.</p><p class="signatures">Fait à {{ville}}, le {{date_jour}}, en deux exemplaires originaux.<br/><br/>Pour la commune, le Maire — Pour l'association, le Président</p></div>`,
    countriesJson: C_ASSO,
  },

  // ── 8. Délégation de pouvoirs entre membres du bureau ──────────────────────
  {
    code: 'asso_delegation_pouvoirs', name: 'Délégation de pouvoirs d’un dirigeant d’association', category: 'association',
    price: 800, priceMax: 2000, popularity: 35,
    description: 'Délégation de pouvoirs donnée par un dirigeant d’association (Président, Trésorier, Secrétaire) à un autre membre du bureau pour une durée déterminée.',
    fieldsJson: F([
      { key: 'delegant', label: 'Dirigeant qui délègue (nom, prénom)', type: 'text', required: true },
      { key: 'fonction', label: 'Fonction du délégant (Président, Trésorier, Secrétaire…)', type: 'text', required: true },
      { key: 'association', label: 'Dénomination de l’association', type: 'text', required: true },
      { key: 'numero_depot', label: 'Numéro de déclaration de l’association', type: 'text', required: true },
      { key: 'siege', label: 'Adresse du siège de l’association', type: 'text', required: true },
      { key: 'delegataire', label: 'Membre du bureau investi de la délégation (nom, prénom et adresse)', type: 'text', required: true },
      { key: 'duree', label: 'Durée de la délégation (en jours)', type: 'text', required: true },
      { key: 'ville', label: 'Ville de rédaction', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>DÉLÉGATION DE POUVOIRS</h1><p>Je soussigné(e) <strong>{{delegant}}</strong>, {{fonction}} de l'association <strong>{{association}}</strong>, déclarée sous le numéro de dépôt {{numero_depot}}, dont le siège est sis {{siege}},</p><p>Donne, par la présente, et pour une durée de {{duree}} jours, tous pouvoirs, sans exception ni restriction, à <strong>{{delegataire}}</strong>, également membre du bureau de l'association {{association}}, afin d'agir en toute circonstance pendant la durée de la délégation, en mes lieu et place, dans la limite des pouvoirs qui m'ont été accordés par les statuts de l'association {{association}}.</p><p>En conséquence, prendre part à toutes discussions et délibérations, prendre connaissance de tous documents, émettre tous votes, effectuer toutes démarches et formalités nécessaires à la vie de l'association, donner toutes signatures et, plus généralement, faire le nécessaire.</p><p class="signatures">Fait à {{ville}}, le {{date_jour}}.<br/><br/>Signature du membre du bureau qui donne mandat<br/>(précédée de la mention manuscrite « Bon pour pouvoir »)<br/><br/>Signature du membre du bureau délégataire<br/>(précédée de la mention manuscrite « Bon pour acceptation »)</p></div>`,
    countriesJson: C_ASSO,
  },

  // ── 9. Convocation du conseil d'administration ─────────────────────────────
  {
    code: 'asso_convocation_ca', name: 'Convocation du conseil d’administration d’association', category: 'association',
    price: 500, priceMax: 1200, popularity: 33,
    description: 'Lettre de convocation des membres du conseil d’administration à une réunion, avec ordre du jour et faculté de représentation.',
    fieldsJson: F([
      { key: 'association', label: 'Dénomination de l’association', type: 'text', required: true },
      { key: 'destinataire', label: 'Administrateur convoqué (civilité, nom, prénom)', type: 'text', required: true },
      { key: 'date_reunion', label: 'Date de la réunion', type: 'date', required: true },
      { key: 'heure_reunion', label: 'Heure de la réunion', type: 'text', required: true },
      { key: 'lieu_reunion', label: 'Lieu de la réunion (ex. au siège social)', type: 'text', required: true },
      { key: 'ordre_du_jour', label: 'Ordre du jour (un point par ligne)', type: 'textarea', required: true },
      { key: 'signataire', label: 'Signataire (nom + qualité, en général le Président)', type: 'text', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p class="align-right">{{ville}}, le {{date_jour}}</p><p><strong>{{destinataire}}</strong></p><p><strong>Objet : Convocation à la réunion du Conseil d'administration de l'association {{association}}</strong></p><p>Madame, Monsieur,</p><p>J'ai l'honneur de vous informer, conformément aux dispositions de nos statuts, que vous êtes convié(e) à la réunion du Conseil d'administration de notre association.</p><p>Cette réunion se tiendra le <strong>{{date_reunion}}</strong> à <strong>{{heure_reunion}}</strong>, {{lieu_reunion}}.</p><p>L'ordre du jour sera le suivant :</p><p>{{ordre_du_jour}}</p><p>En outre, j'ai le plaisir de vous informer que tous les documents d'information relatifs à cette réunion sont tenus à votre disposition au siège de l'association et sont consultables durant les heures de permanence.</p><p>Je vous rappelle qu'en cas d'empêchement de votre part, vous pouvez vous faire représenter par un autre membre du Conseil d'administration muni d'un pouvoir en bonne et due forme, conformément aux dispositions des statuts de notre association.</p><p>Enfin, je tiens à préciser que, conformément aux statuts, seuls les membres du Conseil d'administration à jour de leurs cotisations pourront participer à la réunion.</p><p>Veuillez agréer, Madame, Monsieur, l'expression de mes sentiments distingués.</p><p class="signatures">{{signataire}}</p></div>`,
    countriesJson: C_ASSO,
  },

  // ── 10. Attestation d'activité (bénévole ou membre) ────────────────────────
  {
    code: 'asso_attestation_activite', name: 'Attestation d’activité au sein d’une association', category: 'association',
    price: 500, priceMax: 1200, popularity: 45,
    description: 'Attestation certifiant l’activité d’un bénévole ou d’un membre au sein de l’association : fonction occupée et ancienneté.',
    fieldsJson: F([
      { key: 'signataire', label: 'Signataire (nom, prénom)', type: 'text', required: true },
      { key: 'fonction_signataire', label: 'Fonction du signataire (Président, Administrateur…)', type: 'text', required: true },
      { key: 'association', label: 'Dénomination de l’association', type: 'text', required: true },
      { key: 'numero_depot', label: 'Numéro de déclaration de l’association', type: 'text', required: true },
      { key: 'beneficiaire', label: 'Personne concernée (nom, prénom et adresse)', type: 'text', required: true },
      { key: 'fonction_beneficiaire', label: 'Fonction occupée / activité exercée dans l’association', type: 'text', required: true },
      { key: 'date_debut', label: 'Date de début de la collaboration', type: 'date', required: true },
      { key: 'ville', label: 'Ville de rédaction', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>ATTESTATION</h1><p><strong>Association {{association}}</strong><br/>Numéro de dépôt : {{numero_depot}}</p><p>Je soussigné(e) <strong>{{signataire}}</strong>, agissant en qualité de {{fonction_signataire}} de l'association <strong>{{association}}</strong>, certifie que <strong>{{beneficiaire}}</strong> occupe la fonction de {{fonction_beneficiaire}} au sein de notre association, depuis le {{date_debut}}.</p><p>Fait pour servir et valoir ce que de droit.</p><p class="signatures">À {{ville}}, le {{date_jour}}<br/><br/>{{signataire}}<br/>{{fonction_signataire}}</p></div>`,
    countriesJson: C_ASSO,
  },

  // ── 11. Lettre d'exclusion d'un membre ─────────────────────────────────────
  {
    code: 'asso_exclusion_membre', name: 'Lettre d’exclusion d’un membre d’association', category: 'association',
    price: 700, priceMax: 1800, popularity: 22,
    description: 'Notification d’exclusion d’un membre après entretien préalable : rappel des griefs et voie de recours statutaire.',
    fieldsJson: F([
      { key: 'association', label: 'Dénomination de l’association', type: 'text', required: true },
      { key: 'objet_association', label: 'But / objet de l’association', type: 'text', required: true },
      { key: 'membre', label: 'Membre exclu (civilité, nom, prénom)', type: 'text', required: true },
      { key: 'date_entretien', label: 'Date de l’entretien préalable', type: 'date', required: true },
      { key: 'griefs', label: 'Griefs justifiant l’exclusion', type: 'textarea', required: true },
      { key: 'recours', label: 'Voie de recours (délai en jours et organe compétent, ex. 15 jours auprès du Conseil d’administration)', type: 'text', required: true },
      { key: 'signataire', label: 'Signataire (nom + qualité)', type: 'text', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p class="align-right">{{ville}}, le {{date_jour}}</p><p><strong>{{membre}}</strong></p><p><em>Lettre recommandée avec avis de réception</em></p><p><strong>Objet : Exclusion de l'association {{association}}</strong></p><p>Madame, Monsieur,</p><p>Nous avons le regret de vous informer qu'après avoir entendu vos arguments lors de notre rencontre du {{date_entretien}}, nous vous signifions votre exclusion de l'association <strong>{{association}}</strong>.</p><p>En effet, l'association {{association}} a pour but {{objet_association}}.</p><p>Or, il apparaît que : {{griefs}}</p><p>Nous vous indiquons que vous disposez, conformément à nos statuts, de la voie de recours suivante pour contester la présente décision d'exclusion : {{recours}}.</p><p>Vous souhaitant bonne réception de la présente, je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.</p><p class="signatures">{{signataire}}</p><p class="text-small">Pièces jointes : copie de tous justificatifs de l'exclusion.</p></div>`,
    countriesJson: C_ASSO,
  },

  // ── 12. Contrat de prêt d'une association à son dirigeant ──────────────────
  {
    code: 'asso_pret_dirigeant', name: 'Contrat de prêt d’une association à son dirigeant', category: 'association',
    price: 1500, priceMax: 3000, popularity: 18,
    description: 'Contrat de prêt encadrant l’avance de fonds consentie par une association à l’un de ses dirigeants : montant, échéance, intérêts.',
    fieldsJson: F([
      { key: 'debiteur', label: 'Dirigeant emprunteur (nom, fonction, date et lieu de naissance, adresse)', type: 'textarea', required: true },
      { key: 'association', label: 'Dénomination de l’association', type: 'text', required: true },
      { key: 'numero_depot', label: 'Numéro de déclaration de l’association', type: 'text', required: true },
      { key: 'siege', label: 'Adresse du siège social de l’association', type: 'text', required: true },
      { key: 'representant', label: 'Représentant de l’association qui signe (nom et fonction — de préférence un autre dirigeant ou le trésorier)', type: 'text', required: true },
      { key: 'montant', label: 'Somme prêtée en chiffres et en lettres (FCFA) et moyen de paiement', type: 'text', required: true },
      { key: 'remboursement', label: 'Modalités de remboursement (date d’échéance, moyen, intérêts éventuels)', type: 'textarea', required: true },
      { key: 'ville', label: 'Ville de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE PRÊT</h1><p><strong>{{debiteur}}</strong>,</p><p>ci-après dénommé « le Débiteur »,</p><p>reconnaît emprunter à l'association <strong>{{association}}</strong>, déclarée sous le numéro {{numero_depot}}, dont le siège social est situé {{siege}}, représentée par {{representant}}, dûment autorisé(e) et mandaté(e) par l'association,</p><p>la somme de <strong>{{montant}}</strong>, reçue ce jour ;</p><p>et s'oblige à la restituer intégralement selon les modalités suivantes : {{remboursement}}.</p><p>Le présent prêt est consenti dans le respect des statuts de l'association et, le cas échéant, de la résolution de l'assemblée générale l'ayant autorisé.</p><p class="signatures">Rédigé en deux exemplaires à {{ville}}, le {{date_jour}}.<br/><br/>Le Débiteur (nom et signature) — Le Créancier (nom, fonction et signature)</p><p class="text-small">Pièces jointes : preuve du versement des fonds ; le cas échéant, copie de la résolution de l'assemblée générale autorisant le prêt.</p></div>`,
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
  console.log('Seed Drive2 Associations (Agent Drive2-7/10) terminé.');
  console.log(`   Templates du script : ${templates.length} (créés : ${created}, mis à jour : ${updated})`);
  console.log(`   Catégorie : association`);
  console.log(`   Total de templates en base : ${total}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
