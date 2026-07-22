// Seed « RH / GRH — passe profonde n°2 » IBIG DocPro — Agent Drive3-8/10.
// Templates convertis depuis les modèles RH du Google Drive :
// IBI07 « Kit administratif GRH » (Lettres aux Candidats, Disciplines et Comportements,
// Consultants et Collaborateurs, Gestion Administrative du Personnel, Études et Évaluations,
// Lettres et Mémos, Licenciement et Fin de Contrat, Dossiers Administratifs des Employés,
// CONTRAT DE TRAVAIL) — IBI062 vérifié (contenus = livres numériques, non convertibles).
// Script ADDITIF : upsert par code — n'écrase pas les templates existants.
// Exécution : npx tsx prisma/seed-drive3-rh.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type RhTemplate = {
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
const C = (ohada: string, fr: string) =>
  JSON.stringify({ OHADA: { note: ohada }, FR: { note: fr } });

const templates: RhTemplate[] = [
  // ════════════════════════ LETTRES AUX CANDIDATS ════════════════════════
  {
    code: 'rh_refus_candidature', name: 'Lettre de refus de candidature (après entretien)', category: 'rh_emploi', price: 500, priceMax: 1500,
    description: 'Réponse négative adressée à un candidat reçu en entretien : remerciements, refus motivé avec courtoisie et conservation du CV pour de futures opportunités.',
    fieldsJson: F([
      { key: 'candidat', label: 'Candidat destinataire (nom + adresse complète)', type: 'textarea', required: true },
      { key: 'poste', label: 'Poste concerné par la candidature', type: 'text', required: true },
      { key: 'duree_conservation', label: 'Durée de conservation du CV (ex. une année)', type: 'text', required: true },
      { key: 'signataire', label: 'Signataire (nom + titre + téléphone + email)', type: 'textarea', required: true },
      { key: 'entreprise', label: 'Entreprise (nom + adresse)', type: 'textarea', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p class="align-right">{{ville}}, le {{date_jour}}</p><p><strong>{{entreprise}}</strong></p><p>À : {{candidat}}</p><p>Objet : <strong>Suite à votre entretien de recrutement — poste de {{poste}}</strong></p><p>Madame, Monsieur,</p><p>Nous vous remercions de l'intérêt que vous avez manifesté pour le poste de {{poste}} qui était vacant au sein de notre entreprise.</p><p>Après avoir examiné avec soin les éléments recueillis lors de votre entretien, nous sommes au regret de vous informer que nous ne pourrons pas recourir actuellement à vos services. Cependant, votre dossier ayant été retenu jusqu'à la phase d'entretien, nous garderons votre curriculum vitae pendant {{duree_conservation}}.</p><p>Ainsi, nous pourrons vous contacter si ce poste, ou un poste similaire, se libérait à nouveau pendant cette période.</p><p>Nous vous souhaitons plein succès dans vos recherches.</p><p>Recevez, Madame, Monsieur, nos salutations distinguées.</p><p class="signatures">{{signataire}}</p></div>`,
    popularity: 55,
  },
  {
    code: 'rh_reponse_candidature_spontanee', name: 'Réponse à une candidature spontanée (poste non vacant)', category: 'rh_emploi', price: 500, priceMax: 1200,
    description: 'Lettre de réponse à une candidature spontanée lorsqu’aucun poste n’est vacant : refus courtois et conservation du dossier pour de prochaines opportunités.',
    fieldsJson: F([
      { key: 'candidat', label: 'Candidat destinataire (nom + adresse complète)', type: 'textarea', required: true },
      { key: 'type_poste', label: 'Type de poste recherché par le candidat', type: 'text', required: true },
      { key: 'signataire', label: 'Signataire (nom + titre + téléphone + email)', type: 'textarea', required: true },
      { key: 'entreprise', label: 'Entreprise (nom + adresse)', type: 'textarea', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p class="align-right">{{ville}}, le {{date_jour}}</p><p><strong>{{entreprise}}</strong></p><p>À : {{candidat}}</p><p>Objet : <strong>Votre récente candidature à un poste de {{type_poste}}</strong></p><p>Madame, Monsieur,</p><p>Nous avons bien reçu votre candidature spontanée et nous vous remercions de la confiance que vous accordez à notre entreprise.</p><p>Nous sommes toutefois au regret de vous informer qu'aucun poste de ce type n'est actuellement vacant au sein de l'entreprise.</p><p>Conscients du fait que cette nouvelle pourrait vous décevoir, nous vous assurons que nous garderons votre dossier pour de prochaines opportunités de recrutement et que nous ne manquerons pas de vous contacter si un poste correspondant à votre profil venait à se libérer.</p><p>Nous vous remercions de nous avoir proposé vos services et vous prions de recevoir, Madame, Monsieur, nos salutations distinguées.</p><p class="signatures">{{signataire}}</p></div>`,
    popularity: 48,
  },
  {
    code: 'rh_accuse_reception_candidature', name: 'Accusé de réception de candidature (CV)', category: 'rh_emploi', price: 500, priceMax: 1200,
    description: 'Accusé de réception d’un CV ou d’une demande d’emploi : confirmation de l’étude du dossier, calendrier des entretiens et date de réponse.',
    fieldsJson: F([
      { key: 'candidat', label: 'Candidat destinataire (nom + adresse complète)', type: 'textarea', required: true },
      { key: 'poste', label: 'Poste concerné', type: 'text', required: true },
      { key: 'date_entretiens', label: 'Semaine prévue pour le début des entretiens', type: 'text', required: true },
      { key: 'date_reponse', label: 'Date à laquelle le candidat sera contacté', type: 'text', required: true },
      { key: 'signataire', label: 'Signataire (nom + titre + téléphone + email)', type: 'textarea', required: true },
      { key: 'entreprise', label: 'Entreprise (nom + adresse)', type: 'textarea', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p class="align-right">{{ville}}, le {{date_jour}}</p><p><strong>{{entreprise}}</strong></p><p>À : {{candidat}}</p><p>Objet : <strong>Accusé de réception de votre candidature</strong></p><p>Madame, Monsieur,</p><p>Nous vous remercions de nous avoir transmis votre candidature pour le poste de <strong>{{poste}}</strong>.</p><p>Nous étudions actuellement les dossiers de tous les candidats et espérons débuter les entretiens la semaine du {{date_entretiens}}.</p><p>Nous vous remercions de votre intérêt pour notre entreprise. D'une manière ou d'une autre, nous vous contacterons vers le {{date_reponse}}.</p><p>Recevez, Madame, Monsieur, nos salutations distinguées.</p><p class="signatures">{{signataire}}</p></div>`,
    popularity: 45,
  },
  {
    code: 'rh_verification_references', name: 'Lettre de vérification de références (candidat)', category: 'rh_emploi', price: 700, priceMax: 1800,
    description: 'Lettre adressée à un ancien employeur pour vérifier les références d’un candidat : questionnaire structuré (dates, postes, salaire, évaluation, réembauche) avec engagement de confidentialité.',
    fieldsJson: F([
      { key: 'destinataire', label: 'Ancien employeur destinataire (nom + société + adresse)', type: 'textarea', required: true },
      { key: 'candidat', label: 'Candidat concerné (nom complet + référence d’identité)', type: 'text', required: true },
      { key: 'retour', label: 'Mode et délai de retour souhaités (fax, email, courrier + date limite)', type: 'text', required: true },
      { key: 'signataire', label: 'Signataire (nom + titre + téléphone + email)', type: 'textarea', required: true },
      { key: 'entreprise', label: 'Entreprise (nom + adresse)', type: 'textarea', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p class="align-right">{{ville}}, le {{date_jour}}</p><p><strong>{{entreprise}}</strong></p><p>À : {{destinataire}}</p><p>Objet : <strong>Demande de référence sur {{candidat}}</strong></p><p>Madame, Monsieur,</p><p>Un de vos anciens employés, <strong>{{candidat}}</strong>, a postulé à un poste au sein de notre entreprise. Dans le cadre du processus de recrutement, nous vous demandons par la présente des informations sur le parcours de cet employé. Il nous autorise à vous demander de telles informations ; nous avons joint une copie de son autorisation à la présente lettre.</p><p>Nous vous prions de nous fournir les informations suivantes sur votre ancien employé :</p><ul><li>Dates d'embauche : ______ — Postes occupés : ______</li><li>Responsabilités et tâches accomplies : ______</li><li>Dernier salaire et primes perçus au cours de son contrat : ______</li><li>Raison de la fin de contrat / du départ : ______</li><li>Votre évaluation de ses compétences générales (cocher un seul choix) : ☐ Excellentes ☐ Bonnes ☐ Moyennes ☐ Passables ☐ Médiocres</li><li>Ses forces et faiblesses les plus remarquables : ______</li><li>Si vous aviez un poste vacant, seriez-vous prêt à le réembaucher ? ☐ Oui ☐ Non — Sinon, pour quelle raison : ______</li></ul><p>Nous vous assurons que toute information que vous fournirez sur le candidat sera tenue strictement confidentielle. Nous aurions besoin de ces informations le plus tôt possible et vous saurions gré de nous faire parvenir votre réponse comme suit : {{retour}}.</p><p>Recevez, Madame, Monsieur, nos salutations distinguées.</p><p class="signatures">{{signataire}}</p></div>`,
    popularity: 38,
  },

  // ════════════════════════ EMBAUCHE, ACCUEIL & CONTRATS ════════════════════════
  {
    code: 'rh_lettre_bienvenue', name: 'Lettre de bienvenue à un nouvel employé (intégration)', category: 'rh_emploi', price: 500, priceMax: 1200,
    description: 'Lettre d’accueil et d’intégration d’un nouvel employé : mot de bienvenue, encouragement à la formation continue et informations pratiques.',
    fieldsJson: F([
      { key: 'employe', label: 'Nouvel employé (nom + adresse)', type: 'textarea', required: true },
      { key: 'entreprise_nom', label: 'Nom de l’entreprise', type: 'text', required: true },
      { key: 'infos_pratiques', label: 'Informations pratiques complémentaires (formations, tableau d’affichage, contacts utiles…)', type: 'textarea', required: false },
      { key: 'signataire', label: 'Signataire (nom + titre + téléphone + email)', type: 'textarea', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p class="align-right">{{ville}}, le {{date_jour}}</p><p>À : {{employe}}</p><p>Objet : <strong>Bienvenue chez {{entreprise_nom}}</strong></p><p>Madame, Monsieur,</p><p>C'est avec un grand plaisir que je vous souhaite la bienvenue au sein de <strong>{{entreprise_nom}}</strong>.</p><p>Je suis ravi que vous ayez accepté notre offre d'emploi et je reste persuadé que c'est le début d'une fructueuse collaboration entre vous et {{entreprise_nom}}.</p><p>Nous encourageons notre personnel à profiter des différents cours et formations offerts, afin d'améliorer et d'élargir leurs compétences dans les domaines concernés. Pour rappel, les cours et les dates d'inscription figurent au tableau d'affichage. Si vous souhaitez suivre l'un de ces cours, informez-en votre supérieur hiérarchique et il prendra les dispositions nécessaires.</p><p>{{infos_pratiques}}</p><p>Une fois encore, bienvenue au sein de la famille {{entreprise_nom}} !</p><p>Recevez, Madame, Monsieur, nos salutations distinguées.</p><p class="signatures">{{signataire}}</p></div>`,
    popularity: 46,
  },
  {
    code: 'rh_confirmation_offre_emploi', name: 'Confirmation d’offre d’emploi (clauses du contrat de travail)', category: 'rh_emploi', price: 1500, priceMax: 3500,
    description: 'Lettre de confirmation d’une offre d’emploi valant contrat : période d’essai, salaire et déductions, horaires, congés, tâches, confidentialité, loi applicable et conditions de validité.',
    fieldsJson: F([
      { key: 'candidat', label: 'Candidat destinataire (nom + adresse)', type: 'textarea', required: true },
      { key: 'poste', label: 'Poste proposé', type: 'text', required: true },
      { key: 'superieur', label: 'Supérieur hiérarchique direct', type: 'text', required: true },
      { key: 'date_effet', label: 'Date d’effet de l’offre', type: 'date', required: true },
      { key: 'essai', label: 'Durée de la période d’essai (ex. 8 semaines)', type: 'text', required: true },
      { key: 'salaire', label: 'Salaire brut annuel (montant + périodicité de paiement)', type: 'text', required: true },
      { key: 'horaires', label: 'Horaires de travail (heures, jours, pauses)', type: 'textarea', required: true },
      { key: 'conges', label: 'Congés (durée annuelle + délai de demande)', type: 'text', required: true },
      { key: 'taches', label: 'Tâches principales du poste', type: 'textarea', required: true },
      { key: 'loi', label: 'Loi applicable et juridiction compétente (pays)', type: 'text', required: true },
      { key: 'date_validite', label: 'Date limite de validité de l’offre', type: 'date', required: true },
      { key: 'signataire', label: 'Signataire (nom + titre + téléphone + email)', type: 'textarea', required: true },
      { key: 'entreprise', label: 'Entreprise (nom + adresse)', type: 'textarea', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p class="align-right">{{ville}}, le {{date_jour}}</p><p><strong>{{entreprise}}</strong></p><p>À : {{candidat}}</p><p>Objet : <strong>Confirmation d'une offre d'emploi</strong></p><p>Madame, Monsieur,</p><p>Nous sommes heureux de vous confirmer notre offre d'emploi au poste de <strong>{{poste}}</strong>, avec pour supérieur hiérarchique direct {{superieur}}. Cette offre prend effet à partir du {{date_effet}} suivant les clauses ci-après :</p><ol><li><strong>Période d'essai.</strong> Vous aurez une période d'essai d'une durée de {{essai}}, période pendant laquelle il pourra être mis fin au contrat dans les conditions prévues par la loi ; au-delà de la période d'essai, la rupture du contrat sera soumise au préavis légal ou, en cas de motif valable, pourra intervenir sans préavis ni indemnité.</li><li><strong>Rémunération.</strong> Votre salaire brut, y compris les primes relatives aux congés, s'élève à {{salaire}} ; ce montant est sujet aux déductions réglementaires (impôts et cotisations sociales) et ne fera pas l'objet d'avances sur salaire.</li><li><strong>Horaires de travail.</strong> Conformément à la réglementation en vigueur : {{horaires}}.</li><li><strong>Congés.</strong> {{conges}}. Les congés ne peuvent être accumulés sans autorisation et sont soumis au contrôle de l'entreprise.</li><li><strong>Tâches.</strong> Vos tâches consistent à : {{taches}}. Cette liste ne peut être considérée comme définitive ni exhaustive et vous pourrez accomplir d'autres tâches jugées nécessaires par votre supérieur hiérarchique.</li><li><strong>Confidentialité.</strong> Vous vous engagez à ne divulguer, pendant et après votre emploi, aucune information confidentielle obtenue au cours de votre emploi sur les activités de l'entreprise, ses clients ou ses dirigeants.</li><li><strong>Politiques internes.</strong> Les autres politiques de l'entreprise sont prévues dans le manuel de l'employé, dont une copie vous sera remise avant votre prise de service.</li><li><strong>Intégralité de l'accord.</strong> Suite à votre accord, la présente lettre contiendra l'entièreté du contrat entre vous et la société et remplacera tous contrats, ententes, communications ou offres antérieurs. Ses termes ne pourront être modifiés que par écrit signé des deux parties.</li><li><strong>Loi applicable.</strong> En cas de litige, la présente lettre sera régie par la loi de {{loi}}, et les juridictions compétentes seront exclusivement celles de {{loi}}.</li></ol><p>La présente offre d'emploi reste valable jusqu'au {{date_validite}}. Nous vous prions de bien vouloir nous confirmer votre décision en signant la présente offre et en nous la retournant avant cette date. Vous garantissez par la présente que vous n'êtes lié par aucun contrat ni engagement vous empêchant de devenir employé de la société.</p><p>Nous sommes heureux de vous offrir ce poste et sommes convaincus que vous apporterez une excellente valeur ajoutée à notre entreprise. Encore une fois, bienvenue !</p><p class="signatures">{{signataire}}<br/><br/>J'accepte les conditions prévues par la présente lettre.<br/>Date : ______ — Signature du candidat : ______</p></div>`,
    popularity: 57,
    countriesJson: C(
      'États OHADA : la lettre d’embauche acceptée vaut contrat de travail ; mentions et période d’essai encadrées par les codes du travail nationaux (ex. Côte d’Ivoire, loi 2015-532 art. 14.2 s. — durée d’essai plafonnée selon la catégorie).',
      'France : art. L1221-19 s. du Code du travail — durée maximale de la période d’essai selon la catégorie ; l’offre acceptée engage l’employeur.'
    ),
  },
  {
    code: 'rh_contrat_travail_cadre', name: 'Contrat de travail avec un cadre (dirigeant salarié)', category: 'rh_emploi', price: 3000, priceMax: 6000,
    description: 'Contrat de travail complet pour un cadre : durée et renouvellement, tâches, salaire de base et primes, avantages (congés, assurance, véhicule), fin de contrat motivée ou non, invalidité, confidentialité, exclusivité et arbitrage.',
    fieldsJson: F([
      { key: 'societe', label: 'Société (dénomination + forme + loi régissante + siège social)', type: 'textarea', required: true },
      { key: 'cadre', label: 'Cadre (nom complet + domicile)', type: 'textarea', required: true },
      { key: 'poste', label: 'Poste du cadre (ex. Directeur commercial)', type: 'text', required: true },
      { key: 'duree', label: 'Durée du contrat (en années) et date de début', type: 'text', required: true },
      { key: 'rattachement', label: 'Autorité à laquelle le cadre rend compte (ex. Directeur général, Conseil d’administration)', type: 'text', required: true },
      { key: 'adresse_fonction', label: 'Adresse principale d’exercice des fonctions', type: 'text', required: true },
      { key: 'salaire_base', label: 'Salaire de base annuel + périodicité de paiement', type: 'text', required: true },
      { key: 'primes', label: 'Modalités des primes et boni (facultatif)', type: 'textarea', required: false },
      { key: 'conges', label: 'Congés payés annuels (durée)', type: 'text', required: true },
      { key: 'avantages', label: 'Autres avantages (assurance maladie, plan retraite, allocation véhicule…)', type: 'textarea', required: false },
      { key: 'indemnite_rupture', label: 'Indemnité en cas de fin de contrat sans motif (ex. 12 semaines de salaire)', type: 'text', required: true },
      { key: 'non_sollicitation', label: 'Durée de non-sollicitation du personnel après la fin du contrat (ex. 2 ans)', type: 'text', required: true },
      { key: 'droit', label: 'Droit applicable et modalités d’arbitrage', type: 'text', required: true },
      { key: 'lieu', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE TRAVAIL AVEC UN CADRE</h1><p>Le présent contrat est signé et prend effet à compter du {{date_jour}},</p><p>ENTRE : <strong>{{societe}}</strong> (la « Société »), d'une part,</p><p>ET : <strong>{{cadre}}</strong> (le « Cadre »), d'autre part.</p><h2>Article 1 — Conditions</h2><p>La Société engage le Cadre pour servir de <strong>{{poste}}</strong> et assurer les autres responsabilités auxquelles la Société l'affectera. La durée du contrat sera de {{duree}}, sauf fin prématurée du contrat de travail dans les conditions prévues au présent contrat, et sera renouvelable dans les conditions convenues entre les parties.</p><h2>Article 2 — Tâches et responsabilités</h2><p>Le Cadre rendra compte à {{rattachement}}. Dans les limites prévues par les statuts de la Société, le Cadre assumera toutes les tâches et responsabilités liées à son poste ainsi que les autres tâches qui lui seront attribuées au nom de la Société.</p><h2>Article 3 — Adresse de fonction</h2><p>L'adresse principale où le Cadre assurera les services pour le compte de la Société sera : {{adresse_fonction}}.</p><h2>Article 4 — Acceptation de l'emploi et obligations du Cadre</h2><p>Le Cadre accepte son emploi conformément aux conditions prévues ci-dessus et s'engage à consacrer son temps, son énergie et ses capacités aux intérêts de la Société et à assumer ses responsabilités de façon efficiente, fiable et professionnelle, durant les heures normales de travail de la Société. Un temps raisonnable pourra être consacré aux activités personnelles, charitables ou professionnelles externes, pourvu qu'elles ne soient pas incompatibles avec les services dus au titre du présent contrat.</p><h2>Article 5 — Rémunération</h2><p><strong>5.1 Salaire de base.</strong> Un salaire de base de {{salaire_base}} sera payé au Cadre conformément aux pratiques salariales de la Société. Le salaire de base sera révisé périodiquement selon l'état des services rendus.</p><p><strong>5.2 Primes.</strong> La Société peut payer des primes ou boni sur son revenu net, à l'appréciation de ses organes de direction : {{primes}}</p><p><strong>5.3 Déductions.</strong> Toutes les sommes payables au Cadre seront sujettes aux impôts, cotisations et autres déductions requises par la loi applicable.</p><h2>Article 6 — Avantages</h2><p>Le Cadre bénéficiera de {{conges}} de congés payés par an, des journées chômées payées conformément aux politiques de la Société, du remboursement des frais professionnels approuvés, ainsi que des avantages suivants : {{avantages}}</p><h2>Article 7 — Politiques et procédures</h2><p>La Société aura l'autorité d'établir les politiques et procédures à suivre dans l'accomplissement des tâches. Le Cadre devra respecter toutes les dispositions des contrats signés par la Société dans le cadre desquels il fournira ses services. Tous les enregistrements, fichiers et informations sur les clients de la Société appartiendront et resteront la propriété de la Société.</p><h2>Article 8 — Fin du contrat de travail</h2><p><strong>8.1 Fin motivée.</strong> La Société peut mettre fin au contrat du Cadre notamment pour : crime ou acte impliquant la turpitude morale ; vol, fraude, malversation ou falsification ; divulgation illégale des informations confidentielles ou secrets commerciaux de la Société ; acte portant préjudice à la réputation et aux affaires de la Société ; insuffisance de performances persistant après mise en garde écrite ; violation du présent contrat non corrigée après notification écrite ; incompétence grossière ; absentéisme chronique et sans raison ; appropriation illégale des opportunités d'affaires de la Société. Dans ce cas, la Société n'aura d'autre obligation que le paiement des salaires accumulés et des congés acquis jusqu'à la date de fin de contrat.</p><p><strong>8.2 Fin sans motif.</strong> La Société peut mettre fin au contrat à tout moment sans motif, pourvu que le Cadre bénéficie d'une indemnité équivalant à {{indemnite_rupture}}, en plus des salaires de base impayés et des congés cumulés, déduction faite des retenues prévues par la loi, et sous réserve de la signature d'un reçu valant renonciation à toute poursuite.</p><p><strong>8.3 Coopération.</strong> Après notification de fin de contrat, le Cadre devra coopérer avec la Société pour faciliter la passation de poste.</p><h2>Article 9 — Invalidité et décès</h2><p>En cas d'invalidité totale, le Cadre percevra son salaire mensuel normal pendant les premiers mois d'invalidité ou jusqu'au relais de son assurance invalidité ; en cas d'invalidité partielle, sa rémunération sera calculée au prorata du temps qu'il peut consacrer à ses tâches. Toute contestation relative à l'invalidité sera réglée par un collège de trois médecins (un désigné par chaque partie, le troisième par les deux premiers). Si le Cadre décède pendant la durée du contrat, les sommes gagnées mais non payées seront versées à son conjoint survivant ou, à défaut, à ses héritiers.</p><h2>Article 10 — Informations confidentielles</h2><p>Le Cadre reconnaît que toutes les données relatives aux clients, partenaires, employés et actionnaires de la Société, ainsi que les secrets industriels et commerciaux, données techniques, formules, programmes, données et prévisions financières, plans de développement et listes de clients, constituent des informations confidentielles, biens exclusifs de la Société. Il s'interdit, pendant le contrat et après sa fin, de les divulguer ou de les utiliser à d'autres fins que celles autorisées par la Société.</p><h2>Article 11 — Exclusivité et non-sollicitation</h2><p>Pendant la durée du contrat, le Cadre ne posera aucun acte faisant concurrence aux activités actuelles ou potentielles de la Société. Pendant la durée du contrat et {{non_sollicitation}} après sa fin, le Cadre ne devra pas, sans autorisation écrite de la Société, solliciter ou encourager un employé, agent ou collaborateur de la Société à mettre fin à sa relation avec elle.</p><h2>Article 12 — Limitations d'autorité</h2><p>Sans autorisation écrite expresse de la Société, le Cadre n'aura aucune autorité de : garantir le crédit de la Société ; l'engager dans un contrat, une hypothèque ou un effet de commerce ; acquitter ou libérer une dette due à la Société ; vendre, hypothéquer ou céder un bien de la Société.</p><h2>Article 13 — Droit applicable et arbitrage</h2><p>Tout différend se rapportant à la validité, l'interprétation, l'exécution ou la résiliation du présent contrat sera régi par : {{droit}}.</p><h2>Article 14 — Dispositions générales</h2><p>Le présent contrat ne peut être modifié que par écrit signé des deux parties. Si une disposition était invalidée, les autres demeureraient applicables. Toute notification se fera par écrit, remise en main propre ou par courrier recommandé avec accusé de réception. Les restrictions du présent contrat survivront à sa fin.</p><p class="signatures">EN FOI DE QUOI, chaque partie a signé et délivré le présent contrat à {{lieu}}, le {{date_jour}}.<br/><br/>LA SOCIÉTÉ — LE CADRE</p></div>`,
    popularity: 50,
    countriesJson: C(
      'États OHADA : contrat de travail du cadre régi par les codes du travail nationaux (ex. Côte d’Ivoire, loi 2015-532) et la convention collective interprofessionnelle applicable ; l’AUSCGIE régit le cumul éventuel avec un mandat social.',
      'France : contrat cadre soumis au Code du travail et à la convention collective (statut cadre, forfait-jours éventuel art. L3121-58) ; cumul contrat de travail/mandat social strictement encadré.'
    ),
  },
  {
    code: 'rh_contrat_teletravail', name: 'Contrat de travail à distance (télétravail)', category: 'rh_emploi', price: 2000, priceMax: 4500,
    description: 'Avenant/contrat de télétravail : durée, heures et lieu de travail en annexe, congés, heures supplémentaires autorisées, équipement, inspection du domicile, sauvegarde des données et fin du programme.',
    fieldsJson: F([
      { key: 'employe', label: 'Employé (nom complet + domicile)', type: 'textarea', required: true },
      { key: 'entreprise', label: 'Entreprise (dénomination + forme + loi régissante + siège social)', type: 'textarea', required: true },
      { key: 'duree', label: 'Durée du contrat (avec dates de début et de fin)', type: 'text', required: true },
      { key: 'lieu_teletravail', label: 'Lieu de travail à distance (adresse du domicile ou autre)', type: 'text', required: true },
      { key: 'horaires', label: 'Heures normales de travail par jour (annexe : lundi à dimanche + lieu)', type: 'textarea', required: true },
      { key: 'preavis_inspection', label: 'Préavis avant inspection du lieu de télétravail (en heures)', type: 'text', required: true },
      { key: 'referent', label: 'Personne remettant les tâches et suivant le travail (nom + fonction)', type: 'text', required: true },
      { key: 'loi_accident', label: 'Loi couvrant les accidents du travail à distance', type: 'text', required: true },
      { key: 'conditions_fin', label: 'Conditions de fin du programme de télétravail et conséquences sur l’emploi', type: 'textarea', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE TRAVAIL À DISTANCE (TÉLÉTRAVAIL)</h1><p>Le présent contrat est signé et prend effet à compter du {{date_jour}},</p><p>ENTRE : <strong>{{employe}}</strong> (l'« Employé »), d'une part,</p><p>ET : <strong>{{entreprise}}</strong> (l'« Entreprise »), d'autre part.</p><h2>Préambule</h2><p>L'Employé s'engage à participer au programme de travail à distance et à se conformer aux procédures et politiques applicables en la matière. La Société accepte la participation de l'Employé et s'engage à respecter les mêmes procédures et politiques.</p><h2>Article 1 — Durée du contrat</h2><p>Le présent contrat sera valable pour une durée de {{duree}}. À la fin de ladite durée, les deux parties examineront dans quelle mesure elles renouvelleront le contrat.</p><h2>Article 2 — Heures et lieu de travail</h2><p>Le lieu de travail à distance est : <strong>{{lieu_teletravail}}</strong>. Les heures de travail de l'Employé sont les suivantes : {{horaires}}</p><h2>Article 3 — Salaire et présence</h2><p>Tous les salaires, congés et avantages de déplacement seront calculés sur la base du principal lieu de travail de l'Employé. Les heures de travail et la présence de l'Employé seront enregistrées comme l'accomplissement des tâches sur le principal lieu de travail.</p><h2>Article 4 — Congés</h2><p>L'Employé doit obtenir l'autorisation conformément aux procédures établies avant de prendre des congés. En signant le présent contrat, l'Employé s'engage à se conformer aux procédures régissant la demande et l'obtention de congés.</p><h2>Article 5 — Heures supplémentaires</h2><p>L'Employé qui effectue des heures supplémentaires sur demande et approbation préalables sera rémunéré conformément à la loi et aux règles applicables. L'Employé reconnaît que la Société n'acceptera pas les résultats des travaux réalisés en heures supplémentaires non autorisées ; le non-respect de cette règle peut conduire à la suppression du programme de travail à distance ou à toute autre mesure appropriée.</p><h2>Article 6 — Équipement</h2><p>L'Employé peut utiliser l'équipement de la Société sur le lieu du travail à distance sous autorisation de la Société. L'équipement devra être protégé contre les dommages et ne devra pas être utilisé à des fins non autorisées ; il sera entretenu par la Société. Tout équipement fourni par l'Employé sera sans frais pour la Société et entretenu par l'Employé.</p><h2>Article 7 — Inspection</h2><p>Le lieu de travail à distance sera inspecté périodiquement pour s'assurer que l'équipement de la Société est bien entretenu et que les normes de sécurité sont remplies. Une notification préalable devra être adressée à l'Employé au moins {{preavis_inspection}} heures avant l'inspection, laquelle peut se faire pendant les heures de travail.</p><h2>Article 8 — Responsabilité et remboursement</h2><p>La Société ne sera pas tenue responsable des dommages subis par les biens de l'Employé du fait de sa participation au programme de travail à distance. La Société ne prendra pas en charge les frais de fonctionnement ou d'entretien du domicile (gaz, électricité, eau) ; l'Employé conserve toutefois son droit au remboursement des dépenses professionnelles autorisées.</p><h2>Article 9 — Accidents du travail</h2><p>L'Employé est couvert par {{loi_accident}} en cas d'accident survenu dans le cadre de l'accomplissement des tâches officielles sur le lieu de travail à distance.</p><h2>Article 10 — Attribution des tâches et évaluation</h2><p>L'Employé rencontrera {{referent}} pour recevoir les tâches à accomplir conformément aux procédures de travail définies. L'évaluation des performances sera basée sur les normes et critères du plan de performance de l'Employé.</p><h2>Article 11 — Données et enregistrements</h2><p>L'Employé utilisera les méthodes de sauvegarde approuvées pour protéger les données de la Société contre la divulgation non autorisée ou les dommages. Les travaux réalisés sur le lieu de travail à distance appartiennent à la Société ; toutes les archives, documents imprimés, fichiers informatiques et correspondances devront être conservés pour être retournés au siège de la Société.</p><h2>Article 12 — Fin du programme de télétravail</h2><p>{{conditions_fin}}</p><h2>Article 13 — Obligation de travailler sur le lieu convenu</h2><p>L'Employé s'engage à accomplir les tâches assignées sur le principal lieu de travail ou au domicile approuvé par la Société. Le non-respect de la présente disposition peut conduire à la fin du contrat de travail à distance et/ou à toute action disciplinaire adéquate.</p><p class="signatures">EN FOI DE QUOI, les parties ont signé le présent contrat le {{date_jour}}.<br/><br/>LA SOCIÉTÉ — L'EMPLOYÉ</p></div>`,
    popularity: 58,
    countriesJson: C(
      'États OHADA : le télétravail est progressivement encadré par les codes du travail nationaux (ex. Côte d’Ivoire, décret d’application ; Sénégal, réformes récentes) — l’écrit fixant lieu, horaires et charges est fortement recommandé.',
      'France : art. L1222-9 s. du Code du travail — télétravail mis en place par accord collectif, charte ou accord individuel écrit ; prise en charge des frais professionnels et droit à la déconnexion.'
    ),
  },

  // ════════════════════════ CONSULTANTS & COLLABORATEURS EXTERNES ════════════════════════
  {
    code: 'rh_contrat_consultant', name: 'Contrat de consultant (mission de conseil)', category: 'rh_emploi', price: 2500, priceMax: 5000,
    description: 'Contrat de consultation : prestations de conseil, durée et résiliation, temps minimal consacré, lieu de la prestation, rémunération sur rapports, statut de collaborateur externe et confidentialité.',
    fieldsJson: F([
      { key: 'consultant', label: 'Consultant (nom/dénomination + forme + loi régissante + adresse)', type: 'textarea', required: true },
      { key: 'entreprise', label: 'Entreprise cliente (dénomination + forme + loi régissante + siège social)', type: 'textarea', required: true },
      { key: 'prestations', label: 'Prestations de conseil à fournir (missions, domaines d’intervention)', type: 'textarea', required: true },
      { key: 'date_debut', label: 'Date d’entrée en vigueur', type: 'date', required: true },
      { key: 'date_fin', label: 'Date de fin', type: 'date', required: true },
      { key: 'preavis', label: 'Préavis de résiliation (en jours)', type: 'text', required: true },
      { key: 'heures_min', label: 'Nombre minimal d’heures par mois consacrées à la mission', type: 'text', required: true },
      { key: 'taux', label: 'Taux horaire de rémunération', type: 'text', required: true },
      { key: 'minimum_mensuel', label: 'Rémunération minimale mensuelle garantie', type: 'text', required: true },
      { key: 'delai_paiement', label: 'Délai de paiement après réception du rapport (en jours)', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE CONSULTANT</h1><p>Le présent contrat est signé et prend effet à compter du {{date_jour}},</p><p>ENTRE : <strong>{{consultant}}</strong> (le « Consultant »), d'une part,</p><p>ET : <strong>{{entreprise}}</strong> (l'« Entreprise »), d'autre part.</p><h2>Article 1 — Prestations</h2><p>L'Entreprise emploiera le Consultant pour la fourniture des prestations suivantes : {{prestations}}. Le Consultant devra s'informer auprès des membres de l'administration et des employés de l'Entreprise sur l'organisation et la gestion de l'Entreprise, ses règles de gestion financière, les conditions d'embauche et, de façon générale, sur toute autre question se rapportant aux relations commerciales de l'Entreprise.</p><h2>Article 2 — Conditions du contrat et résiliation</h2><p>Ce contrat entre en vigueur le {{date_debut}} et prendra fin le {{date_fin}}. Chaque partie peut résilier ce contrat {{preavis}} jours après l'avoir notifié par écrit à l'autre partie. La lettre de notification devra être envoyée par courrier recommandé ou remise en main propre.</p><h2>Article 3 — Temps consacré par le Consultant</h2><p>Le temps nécessaire pourra varier de jour en jour ou de semaine en semaine. Toutefois, le Consultant devra consacrer un minimum de {{heures_min}} heures par mois à ses fonctions au titre du présent contrat.</p><h2>Article 4 — Lieu de la prestation</h2><p>Le choix du lieu où le Consultant exécutera les prestations est laissé à sa discrétion. Le Consultant pourra exécuter les prestations à distance et se rendra dans tout lieu nécessaire à l'exécution des obligations du présent contrat.</p><h2>Article 5 — Rémunération du Consultant</h2><p>Le Consultant sera payé au taux de {{taux}} pour le travail accompli et recevra au moins {{minimum_mensuel}} par mois, sans tenir compte du temps réellement passé au travail. Le Consultant devra soumettre un rapport détaillé sur le temps de travail et les prestations fournies. L'Entreprise procédera au paiement des montants dus {{delai_paiement}} jours après réception, sur la base des rapports soumis par le Consultant.</p><h2>Article 6 — Statut de collaborateur externe</h2><p>L'Entreprise et le Consultant reconnaissent que le Consultant intervient comme collaborateur externe indépendant au titre du présent contrat. Par conséquent, le Consultant sera responsable du paiement de tous impôts et cotisations relevant de ses prestations.</p><h2>Article 7 — Informations confidentielles</h2><p>Le Consultant accepte que toute information personnelle, financière ou concernant les activités de l'Entreprise, reçue pendant l'exécution de ses obligations dans le cadre de ce contrat, soit gardée confidentielle et ne soit divulguée à aucune autre personne, entreprise ou organisation.</p><h2>Article 8 — Emploi de tiers</h2><p>L'Entreprise pourra demander au Consultant de recourir à des tiers dans le cadre de ses fonctions ; les charges qu'entraîneraient ces prestations lui seront remboursées. Le Consultant ne devra en aucun cas recourir aux services de tiers sans l'autorisation écrite de l'Entreprise.</p><p class="signatures">EN FOI DE QUOI, les parties ont signé ce contrat qui prend effet à la date indiquée en début de document.<br/><br/>L'ENTREPRISE — LE CONSULTANT</p></div>`,
    popularity: 52,
    countriesJson: C(
      'États OHADA : contrat de prestation de services régi par l’Acte uniforme sur le droit commercial général et le droit commun des obligations — attention à la requalification en contrat de travail en cas de lien de subordination.',
      'France : contrat de prestation indépendante (art. 1710 Code civil) — risque de requalification en salariat (art. L8221-6 Code du travail) si subordination juridique permanente.'
    ),
  },
  {
    code: 'rh_nda_consultant', name: 'Accord de non-divulgation avec un consultant', category: 'rh_emploi', price: 1800, priceMax: 4000,
    description: 'NDA signé avec un consultant intervenant sur le système de l’entreprise : protection des informations propriétaires, cercle de diffusion restreint, copies, restitution, produit du travail et indemnisation.',
    fieldsJson: F([
      { key: 'consultant', label: 'Consultant (nom/dénomination + forme + loi régissante + adresse)', type: 'textarea', required: true },
      { key: 'entreprise', label: 'Entreprise (dénomination + forme + loi régissante + siège social)', type: 'textarea', required: true },
      { key: 'mission', label: 'Mission du consultant (travaux sur le système, périmètre d’accès aux informations)', type: 'textarea', required: true },
      { key: 'juridiction', label: 'État / pays dont la réglementation s’applique', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>ACCORD DE NON-DIVULGATION AVEC LE CONSULTANT</h1><p>Le présent accord est signé et prend effet à compter du {{date_jour}},</p><p>ENTRE : <strong>{{consultant}}</strong> (le « Consultant »), d'une part,</p><p>ET : <strong>{{entreprise}}</strong> (l'« Entreprise »), d'autre part.</p><p>Attendu que le Consultant a été ou sera engagé pour la mission suivante : {{mission}} — et qu'il lui sera permis pour cette raison d'accéder à certaines informations confidentielles et propriétaires de l'Entreprise ; attendu que le Consultant et l'Entreprise souhaitent décrire par cet accord la façon dont ces informations seront utilisées ; il est convenu ce qui suit :</p><h2>Article 1 — Informations propriétaires</h2><p>Le Consultant reconnaît que le système, le code source, le code objet et toute la documentation qui s'y rapporte (« Informations propriétaires ») sont confidentiels et appartiennent à l'Entreprise. Le Consultant accepte de protéger les Informations propriétaires avec diligence et efficacité, et d'éviter leur utilisation non autorisée ou leur divulgation.</p><h2>Article 2 — Non-divulgation</h2><p>Le Consultant ne devra divulguer ou donner accès aux Informations propriétaires qu'à ses employés, agents ou sous-traitants (le « Personnel du Consultant ») qui en ont besoin dans le cadre de l'accomplissement des obligations du Consultant. Le Consultant devra informer son personnel ayant accès aux Informations propriétaires de leur caractère confidentiel.</p><h2>Article 3 — Copies</h2><p>Toute copie ou reproduction des Informations propriétaires devra comporter les mêmes mentions de droits d'auteur que celles figurant sur l'original.</p><h2>Article 4 — Fin de l'accord et restitution</h2><p>Après avoir accompli les tâches qui lui ont été assignées, ou sur demande de l'Entreprise, le Consultant devra rendre toutes les Informations propriétaires, y compris toute copie ou reproduction en sa possession.</p><h2>Article 5 — Utilisation non autorisée</h2><p>Si le Consultant apprend que l'un de ses anciens ou actuels employés utilise ou divulgue sans autorisation les Informations propriétaires, il devra immédiatement en informer l'Entreprise par écrit.</p><h2>Article 6 — Produit du travail</h2><p>Le Consultant n'aura aucun droit d'auteur sur les produits réalisés dans l'accomplissement de ses obligations au titre du présent accord et transfère expressément à l'Entreprise tous les droits d'auteur, brevets, secrets professionnels et autres droits de propriété y afférents.</p><h2>Article 7 — Indemnisation</h2><p>Le Consultant devra défendre et indemniser à ses frais l'Entreprise, les détenteurs de ses licences, ses employés et agents contre toute plainte, revendication ou demande d'indemnisation dans la mesure où il sera établi que le Personnel du Consultant, pendant les interventions sur le système, a violé les droits d'auteur, brevets, licences ou droits de propriété d'une tierce partie, pourvu que le Consultant soit prévenu promptement par écrit de cette plainte. Si une prestation du Consultant est jugée contrefaisante et que son utilisation est ou pourrait être interdite, le Consultant pourra choisir soit de faire modifier à ses frais l'élément mis en cause, soit de procurer à l'Entreprise la licence et le droit d'utilisation de l'élément mis en cause.</p><h2>Article 8 — Conformité avec la législation</h2><p>Le Consultant accepte de se conformer à la réglementation, aux lois et ordonnances de {{juridiction}}.</p><p class="signatures">EN FOI DE QUOI, les parties se sont mises d'accord pour son application à compter de la date indiquée en début de document.<br/><br/>L'ENTREPRISE — LE CONSULTANT</p></div>`,
    popularity: 40,
    countriesJson: C(
      'États OHADA : la confidentialité relève de la liberté contractuelle (droit commun des obligations) ; le secret des affaires est aussi protégé par l’Accord de Bangui révisé (OAPI) pour la propriété intellectuelle.',
      'France : protection renforcée par la loi 2018-670 sur le secret des affaires (art. L151-1 s. Code de commerce) — le NDA écrit reste la meilleure preuve.'
    ),
  },

  // ════════════════════════ DISCIPLINE & COMPORTEMENTS ════════════════════════
  {
    code: 'rh_reprimande', name: 'Lettre de réprimande (rappel à l’ordre)', category: 'rh_emploi', price: 500, priceMax: 1500,
    description: 'Lettre de rappel à l’ordre suite à un comportement fautif signalé (ex. traitement discourtois d’un client) : rappel de la politique de l’entreprise et actions correctives demandées.',
    fieldsJson: F([
      { key: 'employe', label: 'Employé destinataire (nom + service)', type: 'textarea', required: true },
      { key: 'faits', label: 'Faits reprochés (incident, date, personne concernée)', type: 'textarea', required: true },
      { key: 'politique', label: 'Politique ou règle de l’entreprise violée', type: 'textarea', required: true },
      { key: 'actions', label: 'Actions correctives demandées (excuses, correction, suivi…)', type: 'textarea', required: true },
      { key: 'signataire', label: 'Signataire (nom + titre + contacts)', type: 'textarea', required: true },
      { key: 'entreprise', label: 'Entreprise (nom + adresse)', type: 'textarea', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p class="align-right">{{ville}}, le {{date_jour}}</p><p><strong>{{entreprise}}</strong></p><p>À : {{employe}}</p><p>Objet : <strong>Réprimande</strong></p><p>Madame, Monsieur,</p><p>Les faits suivants ont été portés à ma connaissance :</p><p>{{faits}}</p><p>Ce comportement est contraire à notre politique : {{politique}}</p><p>En conséquence, je vous prie de bien vouloir prendre sans délai les mesures suivantes :</p><p>{{actions}}</p><p>Je vous rappelle que le respect de nos règles internes conditionne la bonne marche de l'entreprise et la qualité de nos relations avec nos clients et partenaires. Je compte sur votre professionnalisme pour qu'un tel incident ne se reproduise plus ; à défaut, nous serions contraints d'envisager une sanction disciplinaire conformément au règlement intérieur.</p><p>Recevez, Madame, Monsieur, mes salutations distinguées.</p><p class="signatures">{{signataire}}</p></div>`,
    popularity: 30,
    countriesJson: C(
      'États OHADA : le rappel à l’ordre est le premier degré de l’échelle des sanctions prévue au règlement intérieur ; toute sanction plus grave doit respecter la procédure disciplinaire des codes du travail nationaux.',
      'France : la lettre d’observation simple n’est pas une sanction (art. L1331-1 Code du travail) — au-delà, la procédure disciplinaire s’applique.'
    ),
  },
  {
    code: 'rh_registre_disciplinaire', name: 'Enregistrement de mesure disciplinaire', category: 'rh_emploi', price: 800, priceMax: 2000,
    description: 'Fiche d’enregistrement d’un incident disciplinaire : description, témoins, politique violée, conseil de discipline, mesure prise (verbal, écrit, mise à l’essai, suspension), objectifs et déclaration de l’employé.',
    fieldsJson: F([
      { key: 'employe', label: 'Employé (nom + titre)', type: 'text', required: true },
      { key: 'responsable', label: 'Responsable hiérarchique (nom + titre)', type: 'text', required: true },
      { key: 'incident', label: 'Incident (date, heure, lieu de survenance + description détaillée)', type: 'textarea', required: true },
      { key: 'temoins', label: 'Témoins de l’incident', type: 'text', required: false },
      { key: 'politique', label: 'Politique de la société violée et en quoi l’incident l’a violée', type: 'textarea', required: true },
      { key: 'conseil', label: 'Personnes ayant pris part au conseil de discipline', type: 'textarea', required: false },
      { key: 'explication', label: 'Explication donnée par l’employé sur sa conduite', type: 'textarea', required: false },
      { key: 'mesure', label: 'Mesure disciplinaire prise (verbal, écrit, mise à l’essai avec dates, suspension, autre)', type: 'textarea', required: true },
      { key: 'objectifs', label: 'Objectifs à atteindre et conséquences en cas de non-amélioration', type: 'textarea', required: true },
      { key: 'antecedents', label: 'Entretiens ou avertissements antérieurs sur le sujet (verbaux ou écrits)', type: 'textarea', required: false },
    ]),
    body: `<div class="contrat"><h1>ENREGISTREMENT DE MESURE DISCIPLINAIRE</h1><p><strong>Date du jour :</strong> {{date_jour}}</p><p><strong>Employé :</strong> {{employe}}</p><p><strong>Responsable hiérarchique :</strong> {{responsable}}</p><h2>1. Description de l'incident</h2><p>{{incident}}</p><p><strong>Témoins de l'incident :</strong> {{temoins}}</p><h2>2. Politique violée</h2><p>Ledit incident viole-t-il une politique de la société ? ☐ Oui ☐ Non</p><p>{{politique}}</p><h2>3. Conseil de discipline</h2><p>Personnes ayant pris part au conseil de discipline : {{conseil}}</p><p>L'inadéquation de l'acte a-t-elle été expliquée à l'employé ? ☐ Oui ☐ Non</p><p>Explication donnée par l'employé sur sa conduite : {{explication}}</p><h2>4. Mesure disciplinaire ou action correctrice</h2><p>☐ Avertissement verbal — ☐ Avertissement écrit — ☐ Mise à l'essai — ☐ Suspension — ☐ Autre</p><p>{{mesure}}</p><h2>5. Objectifs à atteindre et conséquences</h2><p>{{objectifs}}</p><h2>6. Entretiens ou avertissements antérieurs</h2><p>{{antecedents}}</p><h2>Déclaration de l'employé</h2><p>Je reconnais avoir lu et compris les informations ci-dessus ainsi que leurs conséquences.</p><p class="signatures">Signature de l'employé — Date<br/>Signature du responsable hiérarchique — Date</p><p class="text-small">Ampliation : l'employé ; le responsable hiérarchique ; l'original à insérer dans le dossier personnel.</p></div>`,
    popularity: 33,
    countriesJson: C(
      'États OHADA : la traçabilité écrite des sanctions est exigée pour justifier un éventuel licenciement disciplinaire ultérieur (codes du travail nationaux — l’employé doit être mis en mesure de s’expliquer).',
      'France : art. L1332-1 s. et L1332-4 Code du travail — aucune sanction ne peut être prononcée plus de 2 mois après connaissance des faits ; l’écrit est obligatoire pour toute sanction autre que l’avertissement verbal.'
    ),
  },
  {
    code: 'rh_plainte_employe', name: 'Formulaire de plainte d’un employé (harcèlement, discrimination)', category: 'rh_emploi', price: 800, priceMax: 2000,
    description: 'Formulaire de dépôt de plainte interne : nature de la plainte, preuves et témoins, impact sur le travail, solutions proposées et déclaration sur l’honneur de l’employé.',
    fieldsJson: F([
      { key: 'employe', label: 'Employé plaignant (nom + titre + département)', type: 'text', required: true },
      { key: 'superviseur', label: 'Nom du superviseur', type: 'text', required: true },
      { key: 'nature', label: 'Nature de la plainte (faits détaillés, personnes, documents pouvant servir de preuve, témoins)', type: 'textarea', required: true },
      { key: 'impact', label: 'En quoi les faits ont affecté la capacité à bien accomplir le travail', type: 'textarea', required: true },
      { key: 'solutions', label: 'Solutions jugées convenables pour résoudre le problème', type: 'textarea', required: true },
      { key: 'complements', label: 'Aspects complémentaires à prendre en compte dans l’investigation', type: 'textarea', required: false },
      { key: 'juridiction', label: 'Législation applicable (pays / État) pour la déclaration sur l’honneur', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>FORMULAIRE DE PLAINTE D'UN EMPLOYÉ</h1><p>Notre entreprise prend très au sérieux les plaintes pour discrimination, harcèlement, conduite déloyale ou contraire à l'éthique. Afin de mener les investigations qui s'imposent et de mieux prendre en compte vos préoccupations, nous vous prions de remplir ce formulaire aussi complètement que possible. Après une investigation prompte et minutieuse, les démarches entreprises vous seront notifiées.</p><p><strong>Employé :</strong> {{employe}} — <strong>Superviseur :</strong> {{superviseur}} — <strong>Date :</strong> {{date_jour}}</p><h2>1. Nature de la plainte</h2><p>Décrivez avec autant de détails que possible la nature de votre plainte. Fournissez ou identifiez toutes les personnes connues, tous les documents pouvant servir de preuve ou de témoin :</p><p>{{nature}}</p><h2>2. Impact sur votre travail</h2><p>{{impact}}</p><h2>3. Solutions proposées</h2><p>{{solutions}}</p><h2>4. Éléments complémentaires pour l'investigation</h2><p>{{complements}}</p><h2>Déclaration</h2><p>Je déclare exacts tous les faits relatés ici et je sais, conformément aux lois de {{juridiction}}, que j'encours des poursuites judiciaires pour fausse déclaration si des faits avancés ici s'avéraient mensongers.</p><p class="signatures">Signature de l'employé — Date : {{date_jour}}</p></div>`,
    popularity: 28,
    countriesJson: C(
      'États OHADA : le harcèlement moral et sexuel est réprimé par les codes du travail et codes pénaux nationaux (ex. Côte d’Ivoire, loi 2015-532 art. 5 s.) — l’employeur doit enquêter et protéger le plaignant.',
      'France : art. L1152-1 s. et L1153-1 s. Code du travail — obligation de prévention et d’enquête de l’employeur ; protection du salarié qui relate des faits de harcèlement.'
    ),
  },

  // ════════════════════════ GESTION ADMINISTRATIVE DU PERSONNEL ════════════════════════
  {
    code: 'rh_autorisation_absence', name: 'Demande d’autorisation d’absence (événement familial)', category: 'rh_emploi', price: 500, priceMax: 1200,
    description: 'Lettre de demande d’autorisation d’absence adressée à l’employeur : motif (événement familial), durée, date de retour et coordonnées pendant l’absence.',
    fieldsJson: F([
      { key: 'destinataire', label: 'Destinataire (nom + fonction)', type: 'text', required: true },
      { key: 'motif', label: 'Motif de l’absence (mariage, événement familial, obligation personnelle…)', type: 'textarea', required: true },
      { key: 'nb_jours', label: 'Nombre de jours d’absence demandés', type: 'text', required: true },
      { key: 'date_retour', label: 'Date de retour au bureau', type: 'date', required: true },
      { key: 'contact', label: 'Numéro où être joint pendant l’absence', type: 'text', required: true },
      { key: 'demandeur', label: 'Demandeur (nom + poste + service)', type: 'textarea', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p class="align-right">{{ville}}, le {{date_jour}}</p><p>À : {{destinataire}}</p><p>Objet : <strong>Demande d'autorisation d'absence</strong></p><p>Madame, Monsieur,</p><p>{{motif}}</p><p>C'est la raison pour laquelle je sollicite une autorisation d'absence de {{nb_jours}} jours. Je serai de retour au bureau le {{date_retour}}.</p><p>En cas de besoin, vous pourrez me joindre au numéro suivant : {{contact}}.</p><p>Je vous remercie par avance de votre compréhension.</p><p>Recevez, Madame, Monsieur, mes salutations distinguées.</p><p class="signatures">{{demandeur}}</p></div>`,
    popularity: 44,
    countriesJson: C(
      'États OHADA : les permissions exceptionnelles d’absence pour événements familiaux (mariage, naissance, décès) sont prévues par les codes du travail et conventions collectives nationaux, souvent sans retenue de salaire dans une limite annuelle.',
      'France : congés pour événements familiaux garantis par les art. L3142-1 s. du Code du travail (mariage : 4 jours, naissance, décès…).'
    ),
  },
  {
    code: 'rh_note_service_conges', name: 'Note de service — nouvelle politique de congés', category: 'rh_emploi', price: 500, priceMax: 1500,
    description: 'Note de service RH informant le personnel d’une nouvelle politique de congés : délai de dépôt des demandes et planification pour assurer la continuité des activités.',
    fieldsJson: F([
      { key: 'entreprise_nom', label: 'Nom de l’entreprise', type: 'text', required: true },
      { key: 'delai', label: 'Délai minimal de dépôt de la demande de congé (en jours)', type: 'text', required: true },
      { key: 'precisions', label: 'Précisions complémentaires (procédure, formulaire, validation…)', type: 'textarea', required: false },
      { key: 'signataire', label: 'Signataire (nom + titre + contacts)', type: 'textarea', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p class="align-right">{{ville}}, le {{date_jour}}</p><p>À : L'ensemble du personnel</p><p>Objet : <strong>Note de service relative à la nouvelle politique de congés</strong></p><p>Mesdames, Messieurs,</p><p>La présente note de service vise à informer tous les employés de {{entreprise_nom}} de la nouvelle politique de l'entreprise en matière de congés.</p><p>Il est porté à la connaissance de tout le personnel que la demande de départ en congé doit être faite au plus tard {{delai}} jours avant la date d'effet du départ en congé. Ceci nous permettra de recourir à des intérimaires si le besoin se faisait sentir et de planifier les congés de façon à ne pas interrompre les activités de l'entreprise.</p><p>{{precisions}}</p><p>Merci pour votre coopération.</p><p>Salutations distinguées,</p><p class="signatures">{{signataire}}</p></div>`,
    popularity: 36,
  },
  {
    code: 'rh_heures_supplementaires', name: 'Formulaire d’autorisation d’heures supplémentaires', category: 'rh_emploi', price: 500, priceMax: 1200,
    description: 'Formulaire d’autorisation préalable d’heures supplémentaires : plage horaire, plafond d’heures, justification détaillée, clients concernés et double signature employé/supérieur.',
    fieldsJson: F([
      { key: 'employe', label: 'Employé (nom + fonction + département)', type: 'text', required: true },
      { key: 'plage', label: 'Heures supplémentaires nécessaires (de… à…)', type: 'text', required: true },
      { key: 'plafond', label: 'Plafond d’heures supplémentaires à ne pas excéder', type: 'text', required: true },
      { key: 'justification', label: 'Explication détaillée de la nécessité des heures supplémentaires', type: 'textarea', required: true },
      { key: 'clients', label: 'Clients ou dossiers pour lesquels les heures supplémentaires sont nécessaires', type: 'textarea', required: false },
      { key: 'superieur', label: 'Supérieur autorisant (nom + fonction)', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>FORMULAIRE D'AUTORISATION D'HEURES SUPPLÉMENTAIRES</h1><p><strong>Date :</strong> {{date_jour}}</p><p><strong>Employé :</strong> {{employe}}</p><p><strong>Heures supplémentaires nécessaires :</strong> {{plage}}</p><p><strong>Le total des heures supplémentaires ne doit pas excéder :</strong> {{plafond}} heures</p><h2>Explication détaillée de la nécessité des heures supplémentaires</h2><p>{{justification}}</p><h2>Clients ou dossiers concernés</h2><p>{{clients}}</p><p>L'employé reconnaît que les heures supplémentaires non autorisées préalablement ne seront pas prises en compte et que leur rémunération se fera conformément à la loi et aux règles applicables.</p><p class="signatures">Signature de l'employé — Date<br/>Signature du supérieur ({{superieur}}) — Date</p></div>`,
    popularity: 34,
    countriesJson: C(
      'États OHADA : heures supplémentaires plafonnées et majorées selon les codes du travail nationaux (ex. Côte d’Ivoire : majorations de 15 % à 100 % selon l’heure et le jour) — autorisation préalable recommandée.',
      'France : art. L3121-27 s. Code du travail — contingent annuel, majoration légale de 25 % (8 premières heures) puis 50 %.'
    ),
  },
  {
    code: 'rh_conge_maternite_reponse', name: 'Réponse à une demande de congé de maternité ou médical', category: 'rh_emploi', price: 1000, priceMax: 2500,
    description: 'Réponse formalisée de l’employeur à une demande de congé de maternité/paternité ou médical : éligibilité, certificat médical, maintien des assurances, garanties de retour à l’emploi et obligations réciproques.',
    fieldsJson: F([
      { key: 'employe', label: 'Employé demandeur (nom + département + titre)', type: 'text', required: true },
      { key: 'date_demande', label: 'Date de la demande de congé', type: 'date', required: true },
      { key: 'motif', label: 'Motif du congé (naissance/adoption, état de santé de l’employé, état de santé d’un proche)', type: 'textarea', required: true },
      { key: 'periode', label: 'Période de congé demandée (du… au…)', type: 'text', required: true },
      { key: 'eligibilite', label: 'Décision d’éligibilité et conditions (certificat médical, délais…)', type: 'textarea', required: true },
      { key: 'assurances', label: 'Modalités de maintien des assurances et avantages sociaux pendant le congé', type: 'textarea', required: true },
      { key: 'duree_droits', label: 'Durée de congé à laquelle l’employé a droit (semaines) et période de référence', type: 'text', required: true },
      { key: 'signataire', label: 'Signataire (nom + titre + département)', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>RÉPONSE À UNE DEMANDE DE CONGÉ DE MATERNITÉ OU MÉDICAL</h1><p><strong>Employé :</strong> {{employe}} — <strong>Date :</strong> {{date_jour}}</p><p>Le {{date_demande}}, vous nous avez informés que vous avez besoin d'un congé de maternité/paternité ou médical pour le motif suivant :</p><p>{{motif}}</p><p>Vous avez demandé un congé pour la période suivante : {{periode}}.</p><h2>1. Éligibilité et conditions</h2><p>{{eligibilite}}</p><h2>2. Assurances et avantages sociaux</h2><p>{{assurances}}</p><h2>3. Droits et garanties</h2><p>Sauf indication contraire ci-dessus, vous avez droit à {{duree_droits}}. Vos avantages sociaux seront maintenus pendant toute la durée du congé dans les mêmes conditions que si vous étiez au travail, et vous retrouverez le même emploi avec le même salaire, les mêmes avantages et les mêmes conditions dès votre retour de congé.</p><p>Si vous ne repreniez pas le travail après votre congé pour une raison autre que (1) la persistance, la récurrence ou l'aggravation de l'état de santé ayant justifié le congé, ou (2) des circonstances indépendantes de votre volonté, il pourra vous être demandé de rembourser à la société sa contribution au paiement de vos primes d'assurance maladie versées pendant le congé.</p><p class="signatures">{{signataire}}<br/>Signature — Date : {{date_jour}}</p></div>`,
    popularity: 37,
    countriesJson: C(
      'États OHADA : congé de maternité de 14 semaines en règle générale (ex. Côte d’Ivoire art. 23.5 ; Sénégal) avec interdiction de licenciement pendant la grossesse et le congé ; indemnités via la caisse de sécurité sociale nationale.',
      'France : congé maternité de 16 semaines minimum (art. L1225-17 Code du travail), protection absolue contre le licenciement pendant le congé ; indemnités journalières CPAM.'
    ),
  },
  {
    code: 'rh_dossier_personnel', name: 'Liste de vérification — dossier du personnel', category: 'rh_emploi', price: 600, priceMax: 1500,
    description: 'Check-list des documents à conserver dans le dossier individuel de chaque employé : recrutement, paie, contrats, reconnaissances de politiques, évaluations, discipline, fin de contrat et dossiers à accès restreint.',
    fieldsJson: F([
      { key: 'entreprise_nom', label: 'Nom de l’entreprise', type: 'text', required: true },
      { key: 'duree_paie', label: 'Durée de conservation des pièces de paie et administratives (ex. 3 ans)', type: 'text', required: true },
      { key: 'duree_sante', label: 'Durée de conservation des pièces santé/sécurité (ex. 5 ans)', type: 'text', required: true },
      { key: 'complements', label: 'Documents supplémentaires propres à l’entreprise (facultatif)', type: 'textarea', required: false },
    ]),
    body: `<div class="contrat"><h1>LISTE DE VÉRIFICATION — DOSSIER DU PERSONNEL</h1><p><strong>Entreprise :</strong> {{entreprise_nom}} — <strong>Date :</strong> {{date_jour}}</p><p>Les documents suivants devraient être gardés dans le dossier individuel du personnel. Il est recommandé que les fiches de paie et les autres pièces administratives soient conservées pendant {{duree_paie}} après leur utilisation, et les pièces relatives à la santé et à la sécurité pendant {{duree_sante}}.</p><h2>Recrutement</h2><ul><li>☐ CV</li><li>☐ Lettres de recommandation</li><li>☐ Lettres de demande d'emploi</li><li>☐ Dossier relatif à l'entretien de recrutement</li></ul><h2>Contrat et paie</h2><ul><li>☐ Contrats de travail</li><li>☐ Dossier relatif à la paie</li><li>☐ Titres d'affectation, avis de promotion et de mutation</li></ul><h2>Politiques et reconnaissances</h2><ul><li>☐ Reconnaissance du manuel de l'employé</li><li>☐ Reconnaissance de la politique relative à la discrimination et au harcèlement</li><li>☐ Accords relatifs aux clauses de confidentialité, de secret industriel et de non-divulgation</li><li>☐ Enquêtes sur la satisfaction du personnel</li></ul><h2>Performance et discipline</h2><ul><li>☐ Accords de performance et évaluations de performance</li><li>☐ Avis relatifs à la discipline</li><li>☐ Avis relatifs au retard et à l'absentéisme</li></ul><h2>Fin de contrat</h2><ul><li>☐ Avis de licenciement et de mise à la retraite</li><li>☐ Documents relatifs à la fin de contrat et entretiens de fin de contrat</li><li>☐ Documents relatifs aux indemnités de chômage et autres indemnités</li><li>☐ Accords relatifs à la mise en disponibilité et à la rupture de contrat</li></ul><h2>Accès restreint</h2><ul><li>☐ Dossier médical (accès restreint !)</li><li>☐ Registre des lésions et blessures (accès restreint !)</li><li>☐ Dossier relatif aux activités syndicales</li></ul><h2>Documents propres à l'entreprise</h2><p>{{complements}}</p></div>`,
    popularity: 29,
  },

  // ════════════════════════ RÉMUNÉRATION & MOTIVATION ════════════════════════
  {
    code: 'rh_octroi_prime', name: 'Lettre d’octroi de prime (bonus)', category: 'rh_emploi', price: 500, priceMax: 1500,
    description: 'Lettre de notification d’une prime exceptionnelle à un collaborateur : félicitations pour le travail accompli, remise du chèque ou virement et encouragements.',
    fieldsJson: F([
      { key: 'employe', label: 'Employé bénéficiaire (nom + poste)', type: 'text', required: true },
      { key: 'realisation', label: 'Réalisation récompensée (projet, document, résultat obtenu)', type: 'textarea', required: true },
      { key: 'modalite', label: 'Modalité de versement (chèque ci-joint, virement, montant…)', type: 'text', required: true },
      { key: 'signataire', label: 'Signataire (nom + titre + contacts)', type: 'textarea', required: true },
      { key: 'entreprise', label: 'Entreprise (nom + adresse)', type: 'textarea', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p class="align-right">{{ville}}, le {{date_jour}}</p><p><strong>{{entreprise}}</strong></p><p>À : {{employe}}</p><p>Objet : <strong>Lettre d'octroi de prime</strong></p><p>Chère collaboratrice, cher collaborateur,</p><p>C'est toujours un plaisir d'avoir des collaborateurs aussi excellents que vous. {{realisation}}</p><p>Il ne fait aucun doute que ce résultat a été obtenu grâce à la qualité de votre travail. J'espère que vous ferez partie de notre équipe pendant longtemps encore.</p><p>En reconnaissance de cette contribution, nous vous accordons une prime : {{modalite}}. C'est notre façon de vous remercier pour le travail bien fait.</p><p>Nous sommes fiers de vous compter parmi nous.</p><p>Recevez, Madame, Monsieur, mes salutations distinguées.</p><p class="signatures">{{signataire}}</p></div>`,
    popularity: 41,
    countriesJson: C(
      'États OHADA : la prime exceptionnelle est un élément de salaire soumis à cotisations et imposable ; répétée, elle peut devenir un usage d’entreprise obligatoire (jurisprudence des codes du travail nationaux).',
      'France : la prime versée de façon constante, fixe et générale devient un usage engageant l’employeur ; soumise à cotisations sociales.'
    ),
  },
  {
    code: 'rh_refus_augmentation', name: 'Réponse à une demande d’augmentation de salaire (refus motivé)', category: 'rh_emploi', price: 600, priceMax: 1500,
    description: 'Lettre confirmant l’employé à son poste tout en refusant courtoisement une demande d’augmentation jugée prématurée, avec échéance de réexamen et encouragements.',
    fieldsJson: F([
      { key: 'employe', label: 'Employé demandeur (nom + poste)', type: 'text', required: true },
      { key: 'date_demande', label: 'Date de la lettre de demande d’augmentation', type: 'date', required: true },
      { key: 'anciennete', label: 'Ancienneté ou période écoulée depuis l’embauche/la dernière révision (en mois)', type: 'text', required: true },
      { key: 'echeance', label: 'Échéance suggérée pour réévoquer la question (en mois)', type: 'text', required: true },
      { key: 'entreprise_nom', label: 'Nom de l’entreprise', type: 'text', required: true },
      { key: 'signataire', label: 'Signataire (nom + titre + contacts)', type: 'textarea', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p class="align-right">{{ville}}, le {{date_jour}}</p><p>À : {{employe}}</p><p>Objet : <strong>Réponse à votre demande d'augmentation de salaire</strong></p><p>Madame, Monsieur,</p><p>J'accuse par la présente réception de votre lettre en date du {{date_demande}}. Vous êtes définitivement confirmé(e) à votre poste pour les progrès effectués durant ces {{anciennete}} derniers mois. Au sein de {{entreprise_nom}}, nous apprécions beaucoup les personnes qui s'impliquent entièrement dans leur travail comme vous le faites.</p><p>Cependant, après évaluation de votre performance, j'estime que votre récente demande d'augmentation de salaire est un peu prématurée. Conformément à la politique de l'entreprise, je vous suggère d'évoquer à nouveau la question après {{echeance}} mois de travail. Si vous continuez sur la même lancée, je suis certain qu'en temps opportun votre demande d'augmentation sera prise en compte.</p><p>Vous faites un excellent travail et je compte sur vous pour continuer dans le même sens. Bon courage !</p><p>Recevez, Madame, Monsieur, mes salutations distinguées.</p><p class="signatures">{{signataire}}</p></div>`,
    popularity: 31,
  },

  // ════════════════════════ ÉTUDES & ÉVALUATIONS ════════════════════════
  {
    code: 'rh_etude_satisfaction', name: 'Étude de satisfaction du personnel (questionnaire anonyme)', category: 'rh_emploi', price: 1000, priceMax: 2500,
    description: 'Questionnaire anonyme de satisfaction des employés : notation de l’entreprise sur 11 critères (1 à 10), moral, assistance, formation, avantages sociaux, flexibilité, encadrement et suggestions.',
    fieldsJson: F([
      { key: 'entreprise_nom', label: 'Nom de l’entreprise', type: 'text', required: true },
      { key: 'periode', label: 'Période ou édition de l’étude (ex. 1er semestre 2026)', type: 'text', required: true },
      { key: 'retour', label: 'Modalités et date limite de retour du questionnaire', type: 'text', required: true },
      { key: 'questions_sup', label: 'Questions supplémentaires propres à l’entreprise (facultatif)', type: 'textarea', required: false },
    ]),
    body: `<div class="contrat"><h1>ÉTUDE DE SATISFACTION DU PERSONNEL</h1><p><strong>Entreprise :</strong> {{entreprise_nom}} — <strong>Édition :</strong> {{periode}}</p><p>Ceci constitue une étude sur les employés de {{entreprise_nom}} (la « Société »). Elle a pour but de fournir à la direction des informations lui permettant de prendre les décisions nécessaires à l'amélioration de l'environnement de travail. <strong>Vous remplirez ce formulaire de façon anonyme.</strong> Retour : {{retour}}.</p><h2>1. Notation de la Société</h2><p>Notez la Société sur les éléments suivants en entourant un nombre de 1 à 10 (1 constituant la note la plus basse et 10 la meilleure note) :</p><ul><li>Rémunération du personnel : 1 2 3 4 5 6 7 8 9 10</li><li>Chances de promotion : 1 2 3 4 5 6 7 8 9 10</li><li>Avantages sociaux : 1 2 3 4 5 6 7 8 9 10</li><li>Cadre de travail favorable : 1 2 3 4 5 6 7 8 9 10</li><li>Formation du personnel : 1 2 3 4 5 6 7 8 9 10</li><li>Évaluation des performances : 1 2 3 4 5 6 7 8 9 10</li><li>Encadrement du personnel : 1 2 3 4 5 6 7 8 9 10</li><li>Culture d'entreprise : 1 2 3 4 5 6 7 8 9 10</li><li>Sécurité du travail : 1 2 3 4 5 6 7 8 9 10</li><li>Flexibilité dans l'accomplissement des tâches : 1 2 3 4 5 6 7 8 9 10</li><li>Satisfaction générale au travail : 1 2 3 4 5 6 7 8 9 10</li></ul><h2>2. Moral du personnel</h2><p>Comment décririez-vous le moral général du personnel ? Avez-vous des recommandations spécifiques pour l'améliorer ?</p><h2>3. Assistance</h2><p>Bénéficiez-vous d'une assistance suffisante dans l'accomplissement de vos tâches ? Recevez-vous suffisamment de retours sur votre travail ? Quelles améliorations apporter au processus d'évaluation des performances ?</p><h2>4. Formation</h2><p>Quelles autres formations seraient bénéfiques pour les employés ?</p><h2>5. Technologie</h2><p>Quelles autres technologies seraient utiles à la Société ?</p><h2>6. Avantages sociaux</h2><p>Quels avantages sociaux actuels trouvez-vous importants ? Quels autres avantages auriez-vous souhaité que la Société offre ?</p><h2>7. Flexibilité</h2><p>Bénéficiez-vous de suffisamment de flexibilité dans l'accomplissement de vos tâches ? Quelles améliorations faudrait-il apporter ?</p><h2>8. Encadrement</h2><p>Êtes-vous encadré de façon adéquate ? Votre supérieur hiérarchique est-il pleinement conscient de vos préoccupations ? Quelles améliorations apporter aux procédures d'encadrement ?</p><h2>9. Rentabilité</h2><p>Avez-vous des suggestions pour l'amélioration de la rentabilité de la Société ?</p><h2>10. Autres</h2><p>Y a-t-il d'autres aspects nécessitant des changements ou améliorations dans la Société ?</p><p>{{questions_sup}}</p></div>`,
    popularity: 35,
  },
  {
    code: 'rh_auto_evaluation', name: 'Fiche d’auto-évaluation de l’employé', category: 'rh_emploi', price: 700, priceMax: 1800,
    description: 'Questionnaire d’auto-évaluation confidentiel avec grille de notation pondérée (x1 à x4) sur la compréhension du poste, de la hiérarchie, des objectifs et de la structure de l’entreprise.',
    fieldsJson: F([
      { key: 'employe', label: 'Employé (nom + poste + département)', type: 'text', required: true },
      { key: 'periode', label: 'Période évaluée', type: 'text', required: true },
      { key: 'questions_sup', label: 'Questions supplémentaires propres à l’entreprise (facultatif)', type: 'textarea', required: false },
    ]),
    body: `<div class="contrat"><h1>FICHE D'AUTO-ÉVALUATION</h1><p><strong>Employé :</strong> {{employe}} — <strong>Période :</strong> {{periode}} — <strong>Date :</strong> {{date_jour}}</p><p>Répondez aux questions ci-après en cochant la colonne qui convient : <strong>En deçà de la moyenne (x1) — Moyenne (x2) — Au-delà de la moyenne (x3) — Supérieur (x4)</strong>. Il est important que vous vous posiez des questions et que vous évaluiez honnêtement votre performance. Après avoir répondu à chaque question, faites le total des points de chaque colonne, multipliez-le par le coefficient de la colonne, puis additionnez les totaux pour obtenir votre résultat. Plus votre résultat est élevé, mieux vous comprenez notre entreprise, sa structure et le rôle que vous avez à y jouer. Ce questionnaire est strictement confidentiel : nul ne vous jugera sur la base des informations qu'il contient.</p><h2>Questions</h2><ol><li>Je sais quelles sont les responsabilités liées à mon poste.</li><li>Je sais qui est mon supérieur hiérarchique direct et ce dont il est chargé.</li><li>J'ai l'impression que ma charge de travail est trop importante.</li><li>Je crois pouvoir discuter de mes problèmes avec mon supérieur hiérarchique.</li><li>Je connais les indemnités et avantages auxquels j'ai droit.</li><li>J'ai le sentiment de faire partie d'une équipe de travail productive.</li><li>Je sais toujours quels sont mes objectifs journaliers et hebdomadaires.</li><li>Je sais quels sont les objectifs à long terme de l'entreprise.</li><li>Je connais la structure organisationnelle de l'entreprise.</li><li>J'ai le sentiment que ma formation me suffit pour bien accomplir mon travail.</li></ol><p>{{questions_sup}}</p><h2>Calcul du résultat</h2><p>Total des réponses par colonne : ______ — Multiplication par le coefficient (x1, x2, x3, x4) : ______ — <strong>TOTAL GÉNÉRAL : ______</strong></p><p class="signatures">Signature de l'employé — Date : {{date_jour}}</p></div>`,
    popularity: 30,
  },

  // ════════════════════════ FIN DE CONTRAT & DÉPARTS ════════════════════════
  {
    code: 'rh_acceptation_demission', name: 'Acceptation d’une démission (accusé de réception)', category: 'rh_emploi', price: 600, priceMax: 1500,
    description: 'Lettre par laquelle l’employeur accepte la démission d’un employé : regrets, remerciements pour la contribution, proposition de lettre de recommandation et vœux de réussite.',
    fieldsJson: F([
      { key: 'employe', label: 'Employé démissionnaire (nom + adresse)', type: 'textarea', required: true },
      { key: 'poste', label: 'Poste occupé par le démissionnaire', type: 'text', required: true },
      { key: 'societe_nom', label: 'Nom de la société', type: 'text', required: true },
      { key: 'signataire', label: 'Signataire (nom + titre + contacts)', type: 'textarea', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p class="align-right">{{ville}}, le {{date_jour}}</p><p>À : {{employe}}</p><p>Objet : <strong>Acceptation de votre lettre de démission</strong></p><p>Madame, Monsieur,</p><p>Je viens d'être informé que vous êtes sur le point de quitter {{societe_nom}}. Je dois avouer que c'est avec un profond regret que nous acceptons votre démission du poste de <strong>{{poste}}</strong>.</p><p>Nous sommes conscients des exigences de ce poste et vous remercions de votre excellente contribution aux performances de notre entreprise en tant que {{poste}}. Votre départ prendra effet à l'issue du préavis prévu par votre contrat et la réglementation applicable.</p><p>C'est avec plaisir que je vous rédigerai une lettre de recommandation, si vous le souhaitez. Ceci pourrait vous aider dans l'obtention d'un nouveau poste auprès d'une autre entreprise. Vous voudrez bien informer notre secrétariat de votre intention à cet effet afin que nous puissions la préparer avant votre départ.</p><p>Au nom de tous les membres de {{societe_nom}}, je vous souhaite une très bonne chance dans la suite de votre carrière.</p><p>Recevez, Madame, Monsieur, mes salutations distinguées.</p><p class="signatures">{{signataire}}</p></div>`,
    popularity: 43,
    countriesJson: C(
      'États OHADA : la démission n’a pas à être acceptée pour produire effet, mais l’accusé de réception fixe le point de départ du préavis (codes du travail nationaux) et sécurise le solde de tout compte.',
      'France : la démission doit résulter d’une volonté claire et non équivoque ; l’accusé de réception fixe le point de départ du préavis (jurisprudence constante).'
    ),
  },
  {
    code: 'rh_annonce_depart_retraite', name: 'Annonce de départ à la retraite d’un collaborateur', category: 'rh_emploi', price: 500, priceMax: 1200,
    description: 'Lettre annonçant au personnel le départ à la retraite d’un collaborateur : parcours dans l’entreprise, hommage, projets de retraite et invitation à la cérémonie de départ.',
    fieldsJson: F([
      { key: 'retraite', label: 'Collaborateur partant à la retraite (nom + poste actuel)', type: 'text', required: true },
      { key: 'parcours', label: 'Parcours dans l’entreprise (année d’entrée, fonctions successives, contributions marquantes)', type: 'textarea', required: true },
      { key: 'projets', label: 'Projets de retraite du collaborateur (facultatif)', type: 'textarea', required: false },
      { key: 'ceremonie', label: 'Cérémonie de départ (date, heure, lieu, programme)', type: 'textarea', required: true },
      { key: 'societe_nom', label: 'Nom de la société', type: 'text', required: true },
      { key: 'signataire', label: 'Signataire (nom + titre + contacts)', type: 'textarea', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p class="align-right">{{ville}}, le {{date_jour}}</p><p>À : L'ensemble du personnel de {{societe_nom}}</p><p>Objet : <strong>Annonce de départ en retraite</strong></p><p>Madame, Monsieur,</p><p><strong>{{retraite}}</strong> est sur le point de partir à la retraite.</p><p>{{parcours}}</p><p>Nous avons tous beaucoup appris à ses côtés et nous lui exprimons notre profonde gratitude pour toutes ces années de collaboration et d'engagement au service de {{societe_nom}}.</p><p>{{projets}}</p><p>Nous organisons une cérémonie en son honneur à l'occasion de son départ de notre entreprise : {{ceremonie}}. Nous vous invitons à y prendre part nombreux pour lui souhaiter une excellente et heureuse retraite.</p><p>Recevez, Madame, Monsieur, nos salutations distinguées.</p><p class="signatures">{{signataire}}</p></div>`,
    popularity: 25,
    countriesJson: C(
      'États OHADA : l’âge et les conditions de départ à la retraite sont fixés par les codes du travail et régimes de sécurité sociale nationaux (ex. CNPS en Côte d’Ivoire — 60 ans) ; indemnité de départ à la retraite selon la convention collective.',
      'France : mise à la retraite possible à 70 ans, départ volontaire dès l’âge légal ; indemnité de départ (art. L1237-9 Code du travail).'
    ),
  },
  {
    code: 'rh_revocation_autorite', name: 'Notification de révocation d’autorité (fin de délégation)', category: 'rh_emploi', price: 600, priceMax: 1500,
    description: 'Lettre informant les partenaires qu’un ancien employé n’est plus autorisé à agir au nom de la société : révocation de la délégation de pouvoirs et diffusion de l’information.',
    fieldsJson: F([
      { key: 'destinataire', label: 'Destinataire (partenaire, client, banque — nom + adresse)', type: 'textarea', required: true },
      { key: 'ancien_employe', label: 'Ancien employé concerné (nom + fonction occupée)', type: 'text', required: true },
      { key: 'date_fin', label: 'Date de fin des fonctions ou de la délégation', type: 'date', required: true },
      { key: 'signataire', label: 'Signataire (nom + titre + contacts)', type: 'textarea', required: true },
      { key: 'entreprise', label: 'Entreprise (nom + adresse)', type: 'textarea', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p class="align-right">{{ville}}, le {{date_jour}}</p><p><strong>{{entreprise}}</strong></p><p>À : {{destinataire}}</p><p>Objet : <strong>Notification de révocation d'autorité</strong></p><p>Madame, Monsieur,</p><p><strong>{{ancien_employe}}</strong> n'est plus employé par notre société depuis le {{date_fin}} et n'est de ce fait plus autorisé à agir, de quelque manière que ce soit, en notre nom.</p><p>Toute délégation de pouvoirs ou de signature qui lui avait été consentie est révoquée à compter de cette date. Aucun engagement pris par cette personne au nom de notre société postérieurement à cette date ne saurait nous être opposé.</p><p>Nous tenons à ce que cette information soit relayée à tous vos chefs de département et services concernés.</p><p>Nous vous remercions par avance de votre collaboration.</p><p>Recevez, Madame, Monsieur, mes salutations distinguées.</p><p class="signatures">{{signataire}}</p></div>`,
    popularity: 22,
    countriesJson: C(
      'États OHADA : la révocation du mandat doit être notifiée aux tiers pour leur être opposable (droit commun du mandat et AUSCGIE pour les dirigeants) — à défaut, le mandat apparent peut engager la société.',
      'France : art. 2003 s. Code civil — la révocation notifiée au seul mandataire est inopposable aux tiers qui ont traité dans l’ignorance de cette révocation.'
    ),
  },
  {
    code: 'rh_entrevue_fin_contrat', name: 'Formulaire d’entretien de fin de contrat (exit interview)', category: 'rh_emploi', price: 800, priceMax: 2000,
    description: 'Formulaire d’entretien de départ : motifs du départ, appréciation du poste, de l’encadrement et de la rémunération, points forts et axes d’amélioration de l’entreprise, recommandations.',
    fieldsJson: F([
      { key: 'employe', label: 'Employé partant (nom + poste + département + date d’entrée)', type: 'textarea', required: true },
      { key: 'date_depart', label: 'Date de départ effective', type: 'date', required: true },
      { key: 'motif_depart', label: 'Motif du départ (démission, fin de CDD, licenciement, retraite…)', type: 'text', required: true },
      { key: 'interviewer', label: 'Personne conduisant l’entretien (nom + fonction)', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>FORMULAIRE D'ENTRETIEN DE FIN DE CONTRAT</h1><p><strong>Employé :</strong> {{employe}}</p><p><strong>Date de départ :</strong> {{date_depart}} — <strong>Motif du départ :</strong> {{motif_depart}}</p><p><strong>Entretien conduit par :</strong> {{interviewer}} — <strong>Date de l'entretien :</strong> {{date_jour}}</p><h2>1. Raisons du départ</h2><p>Quelles sont les principales raisons de votre départ ? Qu'est-ce qui aurait pu vous faire rester ?</p><h2>2. Appréciation du poste</h2><p>Vos tâches correspondaient-elles à la description de votre poste ? Disposiez-vous des moyens et de la formation nécessaires pour bien travailler ?</p><h2>3. Encadrement et ambiance</h2><p>Comment évaluez-vous votre relation avec votre supérieur hiérarchique ? Avec vos collègues ? Vos préoccupations étaient-elles écoutées ?</p><h2>4. Rémunération et avantages</h2><p>Comment jugez-vous votre rémunération et vos avantages par rapport au marché et à votre charge de travail ?</p><h2>5. Points forts de l'entreprise</h2><p>Qu'avez-vous le plus apprécié dans votre expérience au sein de l'entreprise ?</p><h2>6. Axes d'amélioration</h2><p>Que devrait améliorer l'entreprise (organisation, communication, conditions de travail, perspectives d'évolution) ?</p><h2>7. Recommandation</h2><p>Recommanderiez-vous notre entreprise à un ami en recherche d'emploi ? ☐ Oui ☐ Non — Pourquoi ?</p><h2>8. Formalités de départ</h2><p>☐ Restitution du matériel — ☐ Restitution des badges et accès — ☐ Solde de tout compte remis — ☐ Certificat de travail remis — ☐ Rappel des obligations de confidentialité</p><p class="signatures">Signature de l'employé — Signature de l'interviewer<br/>Date : {{date_jour}}</p></div>`,
    popularity: 24,
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

  console.log('✅ Seed RH / GRH — passe profonde n°2 (Drive 3) terminé.');
  console.log(`   Templates du script : ${templates.length} (créés : ${created}, mis à jour : ${updated})`);
  console.log('   Répartition par catégorie (ce script) :');
  for (const [cat, n] of Object.entries(byCategory)) console.log(`     - ${cat} : ${n}`);
  console.log(`   Variantes pays (countriesJson) : ${withCountries} templates`);
  console.log(`   ➜ Total de templates en base : ${total}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
