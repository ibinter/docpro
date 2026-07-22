// Seed « RH / GRH » IBIG DocPro — Agent Drive2-4/10.
// Templates convertis depuis les modèles RH du Google Drive :
// IBI07 « Kit administratif GRH », IBI062 « Kit emploi et vie professionnelle »,
// dossiers « CONTRAT DE TRAVAIL » et « Licenciement et Fin de Contrat ».
// Script ADDITIF : upsert par code — n'écrase pas les templates existants.
// Exécution : npx tsx prisma/seed-drive2-rh.ts
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
  // ════════════════════════ CONTRATS DE TRAVAIL SPÉCIAUX ════════════════════════
  {
    code: 'rh_contrat_apprentissage', name: 'Contrat d’apprentissage', category: 'rh_emploi', price: 2000, priceMax: 5000,
    description: 'Contrat d’apprentissage complet : programme de formation pratique et théorique, durée, rémunération et obligations réciproques de l’employeur et de l’apprenti.',
    fieldsJson: F([
      { key: 'employeur', label: 'Employeur (raison sociale + siège + représentant et sa qualité)', type: 'textarea', required: true },
      { key: 'apprenti', label: 'Apprenti (nom complet + adresse)', type: 'textarea', required: true },
      { key: 'secteur', label: 'Secteur ou métier d’apprentissage (ex. BTP, mécanique, couture…)', type: 'text', required: true },
      { key: 'programme', label: 'Programme de formation (compétences à acquérir, tâches, périodes en entreprise et en centre)', type: 'textarea', required: true },
      { key: 'duree', label: 'Durée du contrat (ex. 24 mois)', type: 'text', required: true },
      { key: 'date_debut', label: 'Date de début', type: 'date', required: true },
      { key: 'date_fin', label: 'Date de fin', type: 'date', required: true },
      { key: 'ville', label: 'Ville de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT D'APPRENTISSAGE</h1><p>Entre les soussignés :</p><p><strong>{{employeur}}</strong>, ci-après désigné « l'Employeur »,</p><p>et</p><p><strong>{{apprenti}}</strong>, ci-après désigné « l'Apprenti »,</p><p>Il a été convenu ce qui suit :</p><h2>Article 1 — Objet</h2><p>Le présent contrat a pour objet de définir les termes et conditions selon lesquels l'Apprenti s'engage à suivre une formation pratique et théorique dans le secteur de {{secteur}} sous la supervision et la direction de l'Employeur.</p><h2>Article 2 — Programme de formation</h2><p>Le programme de formation comprendra : {{programme}}</p><h2>Article 3 — Durée</h2><p>Le contrat d'apprentissage est établi pour une durée de {{duree}}, débutant le {{date_debut}} et se terminant le {{date_fin}}.</p><h2>Article 4 — Rémunération</h2><p>L'Apprenti recevra une rémunération correspondant à un pourcentage du salaire minimum, conformément à la réglementation en vigueur, payable mensuellement.</p><h2>Article 5 — Horaires de travail et de formation</h2><p>Les horaires seront répartis entre le temps passé en entreprise et le temps consacré à la formation théorique selon un planning établi par l'Employeur.</p><h2>Article 6 — Obligations de l'Apprenti</h2><p>L'Apprenti s'engage à :</p><ul><li>Suivre assidûment la formation théorique et pratique ;</li><li>Respecter les règles et procédures de l'entreprise et du centre de formation ;</li><li>Accomplir avec sérieux les tâches qui lui sont confiées.</li></ul><h2>Article 7 — Obligations de l'Employeur</h2><p>L'Employeur s'engage à :</p><ul><li>Assurer une formation conforme au programme établi ;</li><li>Fournir les moyens nécessaires à la réalisation de l'apprentissage ;</li><li>Suivre et évaluer régulièrement les progrès de l'Apprenti.</li></ul><h2>Article 8 — Fin de contrat</h2><p>Le contrat prend fin à l'issue de la période convenue, à la réussite de l'examen final de l'Apprenti, ou peut être résilié anticipativement selon les conditions prévues par la loi.</p><h2>Article 9 — Dispositions générales</h2><p>Le présent contrat est régi par la législation du travail applicable. Toute modification de ce contrat doit être faite par écrit et signée par les deux parties.</p><p class="signatures">Fait à {{ville}}, le {{date_jour}}, en deux exemplaires originaux.<br/><br/>Pour l'Employeur — Pour l'Apprenti</p></div>`,
    popularity: 55,
    countriesJson: C(
      'États OHADA : contrat d’apprentissage régi par les codes du travail nationaux (ex. Côte d’Ivoire, loi 2015-532 art. 13.1 s.) — contrat écrit, visa éventuel de l’inspection du travail, rémunération en pourcentage du SMIG.',
      'France : art. L6221-1 s. du Code du travail — dépôt auprès de l’OPCO, rémunération en pourcentage du SMIC selon l’âge et l’année de formation.'
    ),
  },
  {
    code: 'rh_convention_stage', name: 'Convention de stage en entreprise', category: 'rh_emploi', price: 1500, priceMax: 4000,
    description: 'Convention tripartite de stage (entreprise, établissement de formation, stagiaire) : encadrement, tuteur, horaires, assurances et confidentialité.',
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise d’accueil (dénomination + adresse + représentant et sa fonction)', type: 'textarea', required: true },
      { key: 'etablissement', label: 'Établissement de formation (nom + chef d’établissement + contacts)', type: 'textarea', required: true },
      { key: 'stagiaire', label: 'Stagiaire (nom + adresse + date de naissance + filière)', type: 'textarea', required: true },
      { key: 'date_debut', label: 'Date de début du stage', type: 'date', required: true },
      { key: 'date_fin', label: 'Date de fin du stage', type: 'date', required: true },
      { key: 'tuteur', label: 'Tuteur en entreprise (nom + fonction)', type: 'text', required: true },
      { key: 'maitre_stage', label: 'Enseignant maître de stage (nom + contacts)', type: 'text', required: true },
      { key: 'objectifs', label: 'Objectifs de la formation et compétences à développer', type: 'textarea', required: true },
    ]),
    body: `<div class="contrat"><h1>CONVENTION DE STAGE EN ENTREPRISE</h1><p>Entre les soussignés :</p><p><strong>{{entreprise}}</strong>, ci-après dénommée « l'entreprise » ;</p><p><strong>{{etablissement}}</strong>, ci-après dénommé « l'établissement de formation » ;</p><p><strong>{{stagiaire}}</strong>, ci-après dénommé « le stagiaire ».</p><p>Il est convenu ce qui suit :</p><h2>Article 1 — Accueil et encadrement</h2><p>L'entreprise accepte d'accueillir le stagiaire inscrit à l'établissement de formation susmentionné. Elle s'engage à encadrer le stagiaire, à le traiter en bon père de famille, à lui désigner un tuteur et à lui offrir des situations de travail réelles dans une véritable perspective de formation. L'entreprise s'engage à respecter les projets éducatifs et pédagogiques en vigueur dans l'établissement, les choix pédagogiques définis en matière de formation professionnelle (objectifs, contenu, modalités de supervision et d'évaluation) ainsi que la planification des stages faite par l'établissement.</p><h2>Article 2 — Objectifs de la formation</h2><p>Les objectifs de la formation sont les suivants : {{objectifs}}. Ce programme est cosigné par le tuteur et par l'enseignant maître de stage visé à l'article 5.</p><h2>Article 3 — Non-débauchage</h2><p>L'entreprise s'engage à ne pas interrompre, par des propositions d'engagement, la poursuite de la formation du stagiaire.</p><h2>Article 4 — Durée et horaires</h2><p>La présente convention prend cours le {{date_debut}} et se terminera le {{date_fin}}. Toute modification devra faire l'objet d'un accord entre les parties et d'un avenant. En aucun cas les prestations du stagiaire ne pourront excéder 40 heures par semaine et 8 heures par jour, périodes de formation comprises. Le stagiaire ne peut fournir de prestations pendant plus de 4 heures et demie sans une interruption minimale d'une demi-heure, et l'intervalle entre deux journées de stage doit être de 12 heures consécutives au moins. Les stages de nuit sont interdits.</p><h2>Article 5 — Tuteur et maître de stage</h2><p>L'établissement désigne <strong>{{maitre_stage}}</strong> en qualité d'enseignant maître de stage. L'entreprise désigne <strong>{{tuteur}}</strong> en qualité de tuteur, lequel partagera avec le maître de stage le soin de conduire la formation en entreprise, en concordance avec les objectifs poursuivis.</p><h2>Article 6 — Information réciproque</h2><p>En cas de force majeure, le stagiaire qui ne peut se présenter avertit aussitôt l'établissement et l'entreprise. Le tuteur informera l'établissement de toute absence du stagiaire ou de tout problème de nature à influencer la formation. Ces informations revêtent un caractère de confidentialité.</p><h2>Article 7 — Statut du stagiaire et assurances</h2><p>Le stagiaire continue de relever de la responsabilité de l'établissement où il est inscrit ; il n'existe entre lui et l'entreprise aucun engagement de louage de services. Il reste entièrement sous statut scolaire et, de ce fait, n'est ni rémunéré ni assujetti à la législation sur la sécurité sociale. L'établissement veillera à ce que son contrat d'assurance couvre la responsabilité civile du stagiaire ainsi que les accidents corporels pouvant survenir au sein de l'entreprise et sur les trajets. L'entreprise vérifiera que son contrat d'assurance couvre sa responsabilité civile vis-à-vis du stagiaire.</p><h2>Article 8 — Sécurité et santé</h2><p>L'entreprise veille à fournir au stagiaire les vêtements et équipements de sécurité spécifiques à des tâches particulières et avertit l'établissement de tout problème de nature médicale constaté.</p><h2>Article 9 — Obligations du stagiaire</h2><p>Le stagiaire se conforme au règlement en vigueur dans l'entreprise et aux impératifs de sécurité. Il s'engage à ne pas dévoiler les informations à caractère confidentiel dont il aurait eu connaissance et à remettre à l'entreprise, à la fin du stage, tout document, matériau ou équipement mis à sa disposition. Sur le lieu du stage, il doit être en possession de son carnet de stage et demeure toujours sous la guidance du tuteur ; des travaux étrangers à la profession ne peuvent lui être confiés.</p><h2>Article 10 — Fin et suspension</h2><p>Il pourra être mis fin à la convention de stage après concertation préalable entre les parties. Elle pourra être suspendue selon les mêmes modalités.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>Pour l'entreprise (cachet) — Pour l'établissement de formation (cachet) — Le stagiaire (et, le cas échéant, son représentant légal)<br/>Signatures précédées de « Lu et approuvé »</p></div>`,
    popularity: 60,
    countriesJson: C(
      'États OHADA : convention de stage régie par les codes du travail nationaux et textes sur la formation professionnelle (ex. Côte d’Ivoire : stage-école non rémunéré, stage de qualification encadré).',
      'France : art. L124-1 s. du Code de l’éducation — convention tripartite obligatoire, gratification obligatoire au-delà de 2 mois.'
    ),
  },
  {
    code: 'rh_contrat_temporaire', name: 'Contrat de travail temporaire (surcroît d’activité)', category: 'rh_emploi', price: 2000, priceMax: 4500,
    description: 'Contrat de travail temporaire pour surcroît d’activité : services, durée déterminée, rémunération, confidentialité et résiliation.',
    fieldsJson: F([
      { key: 'employeur', label: 'Employeur (raison sociale + adresse)', type: 'textarea', required: true },
      { key: 'travailleur', label: 'Travailleur temporaire (nom complet + adresse)', type: 'textarea', required: true },
      { key: 'services', label: 'Description des services à fournir (Annexe A)', type: 'textarea', required: true },
      { key: 'periode', label: 'Période déterminée du contrat (dates de début et de fin)', type: 'text', required: true },
      { key: 'remuneration', label: 'Rémunération et modalités de paiement (Annexe B)', type: 'textarea', required: true },
      { key: 'preavis', label: 'Préavis de résiliation (nombre de jours)', type: 'text', required: true },
      { key: 'juridiction', label: 'Juridiction compétente / loi applicable', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE TRAVAIL TEMPORAIRE POUR SURCROÎT D'ACTIVITÉ</h1><p>ENTRE :</p><p><strong>{{employeur}}</strong>, ci-après dénommé « l'Employeur »,</p><p>ET</p><p><strong>{{travailleur}}</strong>, ci-après dénommé « le Travailleur Temporaire ».</p><p>CONSIDÉRANT QUE :</p><ol><li>L'Employeur a besoin de renforcer son personnel en raison d'un surcroît d'activité temporaire.</li><li>Le Travailleur Temporaire est disposé à fournir ses services à l'Employeur pour la période déterminée spécifiée dans ce contrat.</li></ol><p>IL EST CONVENU COMME SUIT :</p><h2>Article 1 — Objet du contrat</h2><p>1.1 L'Employeur engage le Travailleur Temporaire pour fournir des services temporaires conformément aux termes et conditions énoncés dans ce contrat.</p><h2>Article 2 — Description des services</h2><p>2.1 Le Travailleur Temporaire fournira les services suivants, qui font partie intégrante de ce contrat : {{services}}</p><h2>Article 3 — Durée du contrat</h2><p>3.1 Le contrat entre en vigueur à compter de la date de signature par les deux parties et reste en vigueur jusqu'à la fin de la période déterminée suivante : {{periode}}.</p><h2>Article 4 — Rémunération</h2><p>4.1 En contrepartie des services fournis, l'Employeur paiera au Travailleur Temporaire une rémunération selon les modalités suivantes : {{remuneration}}</p><h2>Article 5 — Obligations du Travailleur Temporaire</h2><p>5.1 Le Travailleur Temporaire s'engage à fournir les services convenus avec diligence et professionnalisme.</p><h2>Article 6 — Obligations de l'Employeur</h2><p>6.1 L'Employeur s'engage à fournir au Travailleur Temporaire les ressources et les conditions de travail nécessaires à l'exécution des services.</p><h2>Article 7 — Résiliation du contrat</h2><p>7.1 Ce contrat peut être résilié par l'une ou l'autre des parties avec un préavis écrit de {{preavis}} jours.</p><h2>Article 8 — Confidentialité</h2><p>8.1 Le Travailleur Temporaire s'engage à maintenir la confidentialité de toutes les informations sensibles de l'Employeur auxquelles il aurait accès pendant la durée de ce contrat.</p><h2>Article 9 — Loi applicable</h2><p>9.1 Ce contrat est régi par les lois en vigueur dans {{juridiction}}.</p><h2>Article 10 — Entrée en vigueur et signature</h2><p>Le présent Contrat de Travail Temporaire pour Surcroît d'Activité entre en vigueur à la date de signature par les deux parties.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>L'Employeur — Le Travailleur Temporaire</p></div>`,
    popularity: 48,
    countriesJson: C(
      'États OHADA : le recours au travail temporaire pour surcroît d’activité est encadré par les codes du travail nationaux (durée maximale, interdiction de pourvoir un emploi permanent).',
      'France : art. L1251-5 s. du Code du travail — recours limité (accroissement temporaire d’activité), indemnité de fin de mission de 10 %.'
    ),
  },

  // ════════════════════════ EMBAUCHE & VIE PROFESSIONNELLE ════════════════════════
  {
    code: 'rh_promesse_embauche', name: 'Promesse d’embauche (confirmation de recrutement)', category: 'rh_emploi', price: 800, priceMax: 2000,
    description: 'Lettre officielle confirmant le recrutement d’un candidat : poste, supérieur hiérarchique, date de prise de service, salaire et congés.',
    fieldsJson: F([
      { key: 'candidat', label: 'Candidat recruté (nom + adresse)', type: 'textarea', required: true },
      { key: 'poste', label: 'Poste proposé', type: 'text', required: true },
      { key: 'superieur', label: 'Supérieur hiérarchique direct (nom + fonction)', type: 'text', required: true },
      { key: 'date_service', label: 'Date de prise de service', type: 'date', required: true },
      { key: 'salaire', label: 'Salaire (montant + périodicité)', type: 'text', required: true },
      { key: 'conges', label: 'Nombre de jours de congé par an', type: 'text', required: true },
      { key: 'signataire', label: 'Signataire (nom + titre + contacts)', type: 'textarea', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p class="align-right">{{ville}}, le {{date_jour}}</p><p>À : <strong>{{candidat}}</strong></p><p>Objet : <strong>Lettre de confirmation de recrutement</strong></p><p>Madame, Monsieur,</p><p>Nous sommes heureux de vous confirmer votre recrutement par notre entreprise au poste de <strong>{{poste}}</strong>.</p><p>Vous travaillerez directement sous les ordres de {{superieur}} et vous prendrez service à partir du {{date_service}}.</p><p>Votre salaire sera de {{salaire}}. Vous bénéficierez aussi des avantages habituels accordés à tous les employés de l'entreprise ainsi que d'autres avantages qui vous seront expliqués. Durant la première année, un forfait de jours de congé vous sera accordé : vous aurez droit à {{conges}} jours de repos par an.</p><p>Il est entendu et accepté que le contrat qui nous lie est un contrat basé sur le consentement mutuel et qu'il pourrait prendre fin, dans les conditions prévues par la loi, sur l'initiative de l'une ou l'autre des deux parties.</p><p>Si les différentes précisions contenues dans cette lettre vous agréent et reflètent ce dont nous avons ensemble convenu, vous voudrez bien la signer ci-dessous et nous la retourner.</p><p>Nous attendons avec impatience votre prise de service.</p><p>Recevez, Madame, Monsieur, nos salutations distinguées.</p><p class="signatures">{{signataire}}<br/><br/>Lu et approuvé :<br/>L'Employé — Date</p></div>`,
    popularity: 62,
    countriesJson: C(
      'États OHADA : la promesse d’embauche acceptée vaut engagement — sa rupture abusive ouvre droit à des dommages-intérêts (droit commun des obligations et codes du travail nationaux).',
      'France : l’offre et la promesse unilatérale de contrat de travail engagent l’employeur (Cass. soc. 21 sept. 2017, n° 16-20103).'
    ),
  },
  {
    code: 'rh_fiche_poste', name: 'Fiche de poste', category: 'rh_emploi', price: 700, priceMax: 2000,
    description: 'Fiche de poste structurée : identification du poste, description du rôle, profil recherché et perspectives d’évolution.',
    fieldsJson: F([
      { key: 'titre', label: 'Titre du poste', type: 'text', required: true },
      { key: 'superieur', label: 'Supérieur hiérarchique', type: 'text', required: true },
      { key: 'conditions', label: 'Conditions (échelle salariale, lieu de travail, horaires, nature du poste, risques)', type: 'textarea', required: true },
      { key: 'role', label: 'Rôle du poste', type: 'textarea', required: true },
      { key: 'taches', label: 'Tâches, responsabilités et objectifs', type: 'textarea', required: true },
      { key: 'profil', label: 'Profil recherché (compétences techniques, savoir-être, formations, expérience)', type: 'textarea', required: true },
      { key: 'evolution', label: 'Perspectives d’évolution (avancement, formation)', type: 'textarea', required: false },
    ]),
    body: `<div class="contrat"><h1>FICHE DE POSTE</h1><h2>Identification du poste</h2><p><strong>Titre :</strong> {{titre}}</p><p><strong>Supérieur hiérarchique :</strong> {{superieur}}</p><p><strong>Conditions du poste</strong> (échelle salariale, lieu de travail — télétravail, hybride ou présence au bureau —, horaires de travail — temps plein, temps partiel, soirs et week-end —, nature du poste — permanent, saisonnier, temporaire — et risques liés au poste) :<br/>{{conditions}}</p><h2>Description du poste</h2><p><strong>Rôle :</strong> {{role}}</p><p><strong>Tâches, responsabilités et objectifs :</strong><br/>{{taches}}</p><h2>Profil recherché</h2><p>{{profil}}</p><h2>Perspectives d'évolution du poste</h2><p>{{evolution}}</p><p class="text-small">Fiche établie le {{date_jour}}.</p></div>`,
    popularity: 45,
  },
  {
    code: 'rh_evaluation_personnel', name: 'Formulaire d’évaluation du personnel (entretien annuel)', category: 'rh_emploi', price: 800, priceMax: 2500,
    description: 'Formulaire d’entretien annuel d’évaluation : réalisations, forces, points à améliorer, notation par critères et plan d’actions.',
    fieldsJson: F([
      { key: 'employe', label: 'Employé évalué (nom + poste)', type: 'text', required: true },
      { key: 'evaluateur', label: 'Évaluateur (nom + fonction)', type: 'text', required: true },
      { key: 'realisations', label: 'Principales réalisations depuis le dernier entretien', type: 'textarea', required: true },
      { key: 'forces', label: 'Principales forces de l’employé', type: 'textarea', required: true },
      { key: 'ameliorations', label: 'Problèmes survenus et principaux points à améliorer', type: 'textarea', required: true },
      { key: 'notes', label: 'Notation par critères (attitude, initiative, qualité du travail, productivité, organisation…)', type: 'textarea', required: true },
      { key: 'plan_actions', label: 'Plan d’actions et échéances (avec dates des prochaines évaluations)', type: 'textarea', required: false },
      { key: 'performance', label: 'Performance générale (Excellent 90-100, Très Bien 80-89, Bien 75-79, Assez Bien 70-74, Passable 60-69, Insuffisant < 60)', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>FORMULAIRE D'ÉVALUATION DU PERSONNEL</h1><p><strong>Date :</strong> {{date_jour}}</p><p><strong>Nom de l'employé :</strong> {{employe}}</p><p><strong>Évaluation effectuée par :</strong> {{evaluateur}}</p><h2>A. Principales réalisations depuis le dernier entretien d'évaluation de performances</h2><p>{{realisations}}</p><h2>B. Principales forces de l'employé</h2><p>{{forces}}</p><h2>C. Problèmes survenus et principaux points à améliorer</h2><p>{{ameliorations}}</p><h2>D. Notation de l'employé</h2><p>Critères notés de « Excellent » à « Insuffisant » : attitude, initiative, crédibilité, qualité du travail, productivité, connaissance du travail, apport à l'équipe, organisation, jugement, responsabilité.</p><p>{{notes}}</p><h2>E. Actions à entreprendre en cas de besoin d'amélioration</h2><p>{{plan_actions}}</p><h2>F. Performance générale</h2><p><strong>{{performance}}</strong></p><p>La présente évaluation a-t-elle été effectuée avec l'employé ? ☐ Oui ☐ Non</p><p class="signatures">L'Évaluateur — L'Employé</p></div>`,
    popularity: 42,
  },
  {
    code: 'rh_non_concurrence', name: 'Contrat de non-concurrence (employé)', category: 'rh_emploi', price: 2500, priceMax: 5000,
    description: 'Accord de non-concurrence signé par l’employé : interdiction d’activité concurrente, non-sollicitation des clients, secrets industriels et pénalité.',
    fieldsJson: F([
      { key: 'employe', label: 'Employé (nom complet + domicile)', type: 'textarea', required: true },
      { key: 'societe', label: 'Société (dénomination + forme + loi régissante + siège social)', type: 'textarea', required: true },
      { key: 'duree', label: 'Durée de la non-concurrence après la fin du contrat (ex. 2 ans)', type: 'text', required: true },
      { key: 'activite', label: 'Activité interdite (type d’activité dans laquelle l’employé ne peut s’engager)', type: 'textarea', required: true },
      { key: 'territoire', label: 'Territoire géographique concerné', type: 'text', required: true },
      { key: 'penalite', label: 'Pénalité en cas de violation (montant)', type: 'text', required: true },
      { key: 'lieu', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE NON-CONCURRENCE PAR L'EMPLOYÉ</h1><p>Le présent contrat est signé et prend effet à compter du {{date_jour}},</p><p>ENTRE : <strong>{{employe}}</strong> (l'« Employé »), d'une part,</p><p>ET : <strong>{{societe}}</strong> (la « Société »), d'autre part.</p><h2>Article 1 — Promesse de ne pas faire concurrence</h2><p>En contrepartie de l'embauche de l'Employé, l'Employé ne devra pas, pour une période d'au moins {{duree}} après qu'il aura quitté son poste, mener directement ou indirectement, personnellement ou en tant qu'employé, directeur associé, gérant, agent ou autre, ou par quelque moyen institutionnel ou autre, des activités de {{activite}} sur le territoire géographique de {{territoire}}. L'Employé ne devra pas non plus, durant une telle période, solliciter des commandes, directement ou indirectement, auprès des clients de la Société pour la vente de produits vendus par la Société, que ce soit pour lui ou en tant qu'employé d'une autre personne, firme ou société.</p><h2>Article 2 — Définition des termes</h2><p>Le terme « non-concurrence », tel qu'il est utilisé dans le présent contrat, signifie que l'Employé ne devra pas posséder, gérer, exploiter, conseiller, pratiquer ou être employé dans le cadre d'une activité substantiellement similaire ou concurrente de l'activité actuelle de la Société, ou dans quelque autre activité de la Société dans laquelle elle s'est engagée avant la fin du contrat de travail.</p><h2>Article 3 — Secrets industriels</h2><p>L'Employé reconnaît que la Société peut, sur la base du présent contrat, lui donner accès à des secrets industriels, des données sur les clients et autres données confidentielles et fonds de commerce. L'Employé s'engage à garder ces informations en toute confidentialité, à ne pas les utiliser en son propre nom et à ne les fournir à aucune tierce partie. Il prendra les dispositions nécessaires pour garder confidentiels les secrets commerciaux de la Société — informations sur les clients, les fournisseurs, informations financières, logistique, recherche et développement — pendant et après la fin de son contrat de travail.</p><h2>Article 4 — Clause spéciale de non-sollicitation</h2><p>En cas de rupture du contrat de travail de l'Employé avec la Société, peu importe la raison, l'Employé ne devra solliciter aucun client de la Société qui était client pendant le cours de son emploi, que ce client continue d'être ou non un client de la Société. En outre, l'Employé ne devra pas aider autrui à solliciter un tel client pour une période de {{duree}} à compter de la date de fin du contrat de travail.</p><h2>Article 5 — Indemnisation</h2><p>En sus des dommages-intérêts, l'Employé s'engage à payer une pénalité d'un montant de {{penalite}} pour toute violation de toute convention de non-concurrence contenue dans le présent contrat.</p><h2>Article 6 — Effets et validité</h2><p>Si une partie de la présente promesse venait à être jugée non valable, les parties acceptent qu'elle soit séparée du contrat sans affecter la validité ni l'applicabilité du reste de la promesse. Le présent contrat ne s'applique qu'à {{territoire}} et sera pleinement valable et applicable pour {{duree}} à compter de la date de fin du contrat de travail. Il obligera et sera au bénéfice des parties, de leurs successibles, légataires, héritiers et mandataires.</p><p class="signatures">EN FOI DE QUOI, chacune des parties a signé le présent contrat et l'a délivré à {{lieu}}, le {{date_jour}}.<br/><br/>LA SOCIÉTÉ — L'EMPLOYÉ</p></div>`,
    popularity: 40,
    countriesJson: C(
      'États OHADA : clause licite si limitée dans le temps, l’espace et l’activité (codes du travail nationaux — ex. Côte d’Ivoire art. 15.5 : maximum en principe 1 an).',
      'France : jurisprudence constante — la clause doit être limitée dans le temps et l’espace, proportionnée et assortie d’une contrepartie financière, à peine de nullité.'
    ),
  },

  // ════════════════════════ DISCIPLINE, LICENCIEMENT & FIN DE CONTRAT ════════════════════════
  {
    code: 'rh_dernier_avertissement', name: 'Dernier avertissement avant licenciement', category: 'rh_emploi', price: 800, priceMax: 2000,
    description: 'Lettre de dernier avertissement disciplinaire avant licenciement : griefs reprochés et mise en garde formelle.',
    fieldsJson: F([
      { key: 'employe', label: 'Employé destinataire (nom + adresse)', type: 'textarea', required: true },
      { key: 'poste', label: 'Poste de l’employé', type: 'text', required: true },
      { key: 'griefs', label: 'Griefs reprochés (faits précis rapportés par le supérieur)', type: 'textarea', required: true },
      { key: 'signataire', label: 'Signataire (nom + titre + contacts)', type: 'textarea', required: true },
      { key: 'entreprise', label: 'Entreprise (nom + adresse)', type: 'textarea', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p class="align-right">{{ville}}, le {{date_jour}}</p><p><strong>{{entreprise}}</strong></p><p>À : {{employe}}</p><p>Objet : <strong>Dernier avertissement avant licenciement</strong></p><p>Madame, Monsieur,</p><p>Vous avez précédemment été informé(e) de certains problèmes liés à vos récentes performances en tant qu'employé(e) au poste de {{poste}}, lesquels problèmes continuent de se poser. Parce que nous pensons que vous pouvez améliorer vos performances et changer de comportement, nous entendons vous donner une dernière chance. Voici ce qui vous est reproché, tel que votre supérieur nous l'a rapporté :</p><p>{{griefs}}</p><p>Si vous violez une prochaine fois les procédures et politiques de l'entreprise ou ne réussissez pas à améliorer vos performances conformément à nos normes, nous serons dans l'obligation de mettre immédiatement fin à votre contrat, dans le respect de la procédure et du préavis prévus par la loi.</p><p>Recevez, Madame, Monsieur, nos salutations distinguées.</p><p class="signatures">{{signataire}}</p></div>`,
    popularity: 38,
    countriesJson: C(
      'États OHADA : la sanction doit être notifiée par écrit et l’employé mis en mesure de s’expliquer ; l’échelle des sanctions figure au règlement intérieur (codes du travail nationaux).',
      'France : art. L1332-1 s. du Code du travail — procédure disciplinaire (convocation, entretien, notification motivée).'
    ),
  },
  {
    code: 'rh_lettre_licenciement', name: 'Lettre de licenciement (notification de fin de contrat)', category: 'rh_emploi', price: 1200, priceMax: 3000,
    description: 'Notification officielle de fin de contrat de travail : motifs détaillés, règlement des droits, avantages cumulés et restitution des biens de l’entreprise.',
    fieldsJson: F([
      { key: 'employe', label: 'Employé destinataire (nom + adresse)', type: 'textarea', required: true },
      { key: 'motifs', label: 'Motifs du licenciement (détailler les raisons)', type: 'textarea', required: true },
      { key: 'delai_etat', label: 'Délai d’envoi de l’état des avantages cumulés (en jours)', type: 'text', required: true },
      { key: 'contact_rh', label: 'Personne à contacter pour les formalités de départ (nom + fonction)', type: 'text', required: true },
      { key: 'signataire', label: 'Signataire (nom + titre + contacts)', type: 'textarea', required: true },
      { key: 'entreprise', label: 'Entreprise (nom + adresse)', type: 'textarea', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p class="align-right">{{ville}}, le {{date_jour}}</p><p><strong>{{entreprise}}</strong></p><p>À : {{employe}}</p><p>Lettre recommandée avec accusé de réception</p><p>Objet : <strong>Notification de fin de contrat</strong></p><p>Madame, Monsieur,</p><p>Nous sommes au regret de vous informer que votre contrat de travail prend fin dès la réception de cette lettre pour les raisons suivantes :</p><p>{{motifs}}</p><p>Vous voudrez bien quitter votre poste avec tous vos effets, dans le respect du préavis applicable. Nous vous verserons votre salaire en cours jusqu'à ce jour ainsi que tous vos autres droits. Dans les {{delai_etat}} jours suivant la fin de votre contrat, nous vous enverrons un état de vos avantages cumulés. Tous les avantages d'assurance restent valables conformément à la loi et/ou aux dispositions de notre politique du personnel.</p><p>Nous vous prions de contacter {{contact_rh}} le plus tôt possible ; il/elle se chargera de vous expliquer les différents aspects de votre départ et verra avec vous les dispositions à prendre pour restituer les biens de l'entreprise en votre possession.</p><p>Recevez, Madame, Monsieur, nos salutations distinguées.</p><p class="signatures">{{signataire}}</p></div>`,
    popularity: 58,
    countriesJson: C(
      'États OHADA : licenciement subordonné à un motif légitime, notification écrite motivée, préavis et indemnité de licenciement selon l’ancienneté (codes du travail nationaux, ex. Côte d’Ivoire art. 18.1 s.).',
      'France : art. L1232-1 s. du Code du travail — cause réelle et sérieuse, convocation à entretien préalable et notification motivée obligatoires.'
    ),
  },
  {
    code: 'rh_chomage_technique', name: 'Notification de mise en chômage technique', category: 'rh_emploi', price: 1000, priceMax: 2500,
    description: 'Lettre notifiant à un employé sa mise en chômage technique pour restructuration, avec proposition de lettre de recommandation.',
    fieldsJson: F([
      { key: 'employe', label: 'Employé destinataire (nom + adresse)', type: 'textarea', required: true },
      { key: 'date_effet', label: 'Date d’effet de la mesure', type: 'date', required: true },
      { key: 'contexte', label: 'Contexte (facultatif : précisions sur la restructuration ou les difficultés)', type: 'textarea', required: false },
      { key: 'signataire', label: 'Signataire (nom + titre + contacts)', type: 'textarea', required: true },
      { key: 'entreprise', label: 'Entreprise (nom + adresse)', type: 'textarea', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p class="align-right">{{ville}}, le {{date_jour}}</p><p><strong>{{entreprise}}</strong></p><p>À : {{employe}}</p><p>Objet : <strong>Notification de mise en chômage technique</strong></p><p>Madame, Monsieur,</p><p>Nous espérions pouvoir garder tous nos employés pendant cette période difficile de restructuration, mais ce n'est malheureusement pas possible. {{contexte}}</p><p>Dans ces circonstances, nous n'avons d'autre choix que de vous notifier que nous ne serons plus en mesure d'avoir recours à vos services à partir du {{date_effet}}. Nous avons apprécié les qualités dont vous avez fait montre durant votre emploi dans notre entreprise et regretterons de ne plus vous compter parmi nous.</p><p>C'est avec plaisir que nous vous rédigerons une lettre de recommandation, si vous le demandez. Ceci pourrait vous aider dans l'obtention d'un nouveau poste auprès d'une autre entreprise. Vous voudrez bien informer notre secrétariat de votre intention à cet effet afin que nous puissions la préparer pour vous avant votre départ.</p><p>Nous vous souhaitons bonne chance dans vos projets.</p><p>Recevez, Madame, Monsieur, nos salutations distinguées.</p><p class="signatures">{{signataire}}</p></div>`,
    popularity: 32,
    countriesJson: C(
      'États OHADA : le chômage technique est encadré par les codes du travail nationaux (durée maximale, information de l’inspection du travail, indemnisation éventuelle — ex. Côte d’Ivoire art. 15.11).',
      'France : dispositif équivalent d’activité partielle (art. L5122-1 Code du travail) soumis à autorisation administrative.'
    ),
  },
  {
    code: 'rh_demission_indemnisation', name: 'Contrat de démission et d’indemnisation (départ négocié)', category: 'rh_emploi', price: 2000, priceMax: 4500,
    description: 'Accord de départ négocié : démission volontaire contre indemnité, confidentialité, restitution des biens et solde des engagements.',
    fieldsJson: F([
      { key: 'employe', label: 'Employé (nom complet + domicile)', type: 'textarea', required: true },
      { key: 'employeur', label: 'Employeur (dénomination + forme + loi régissante + siège social)', type: 'textarea', required: true },
      { key: 'date_fin', label: 'Date de fin volontaire du contrat de travail', type: 'date', required: true },
      { key: 'montant', label: 'Montant de l’indemnité convenue (FCFA)', type: 'text', required: true },
      { key: 'date_paiement', label: 'Date de versement de l’indemnité', type: 'date', required: true },
      { key: 'loi', label: 'Loi applicable (pays)', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE DÉMISSION ET D'INDEMNISATION</h1><p>Le présent contrat est signé et prend effet à compter du {{date_jour}},</p><p>ENTRE : <strong>{{employe}}</strong> (l'« Employé »), d'une part,</p><p>ET : <strong>{{employeur}}</strong> (l'« Employeur »), d'autre part.</p><h2>Article 1 — Démission et indemnité</h2><p>En considération de la signature du présent contrat par l'Employé et de sa lettre de démission ci-jointe, son contrat de travail prend volontairement fin le {{date_fin}} et l'Employeur s'engage à lui payer la somme de <strong>{{montant}} FCFA</strong>, qui lui sera versée le {{date_paiement}}.</p><h2>Article 2 — Déductions</h2><p>Le paiement fait conformément à l'article précédent sera frappé des déductions et taxes applicables.</p><h2>Article 3 — Confidentialité</h2><p>L'Employé s'engage à ne pas discuter les dispositions du présent contrat, sauf avec ses conseillers juridiques et financiers.</p><h2>Article 4 — Restitution des biens</h2><p>L'Employé s'engage à remettre à l'Employeur les biens, les documents et les copies de documents appartenant à l'Employeur mais se trouvant actuellement à sa disposition. L'Employé comprend que le défaut de respecter cette clause pourrait entraîner des poursuites judiciaires à son endroit.</p><h2>Article 5 — Modification et renonciation</h2><p>Aucune disposition du présent contrat ne sera modifiée, amendée ou abandonnée, sauf par accord mutuel écrit des parties. Par ailleurs, seule la renonciation écrite expresse à un droit par une des parties vaudra renonciation à un tel droit.</p><h2>Article 6 — Intégralité de l'accord</h2><p>Le présent contrat remplace tout autre contrat, arrangement et entente relatifs à son objet convenus par les parties avant sa signature.</p><h2>Article 7 — Exemplaires</h2><p>Le présent contrat sera imprimé en une ou plusieurs copies, chacune des copies constituant un seul et même acte.</p><h2>Article 8 — Loi applicable</h2><p>Le présent contrat est conclu conformément aux lois de {{loi}} et les droits et obligations des parties seront régis et déterminés conformément à ces lois.</p><h2>Article 9 — Consentement</h2><p>L'Employé reconnaît avoir lu, étudié, compris et signé ce contrat en pleine connaissance de cause.</p><p class="signatures">Les parties ont signé le présent contrat à la date figurant en dessous de leur signature.<br/><br/>L'EMPLOYÉ — L'EMPLOYEUR</p></div>`,
    popularity: 35,
    countriesJson: C(
      'États OHADA : le départ négocié (rupture d’un commun accord) est admis par les codes du travail nationaux ; l’accord écrit sécurise l’indemnité et le solde de tout compte.',
      'France : privilégier la rupture conventionnelle homologuée (art. L1237-11 s. Code du travail) pour sécuriser l’indemnisation et les droits au chômage.'
    ),
  },
  {
    code: 'rh_attestation_fin_contrat', name: 'Attestation de fin de contrat (restitution et obligations)', category: 'rh_emploi', price: 700, priceMax: 1800,
    description: 'Attestation signée par l’employé en fin de contrat : restitution des biens et documents confidentiels de l’entreprise et respect des engagements post-contractuels.',
    fieldsJson: F([
      { key: 'employe', label: 'Employé (nom complet)', type: 'text', required: true },
      { key: 'entreprise', label: 'Entreprise (dénomination)', type: 'text', required: true },
      { key: 'engagements', label: 'Contrats et engagements signés à rappeler (confidentialité, non-concurrence, non-sollicitation…)', type: 'textarea', required: false },
      { key: 'juridiction', label: 'Législation applicable (pays / État)', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>ATTESTATION DE FIN DE CONTRAT</h1><p>Je soussigné(e) <strong>{{employe}}</strong>, anciennement employé(e) de <strong>{{entreprise}}</strong>, atteste, en signant le présent document, que je n'ai pas en ma possession, ni manqué de retourner, tous les secrets commerciaux, informations propres ou confidentielles de la compagnie, dont les spécifications, les schémas, les maquettes, les reproductions, les notes, les rapports, les propositions, les plans, les listes de clients, les documents de communication marketing, les autres documents, outils, équipements ou biens appartenant à l'entreprise.</p><p>J'atteste par ailleurs que j'ai respecté, et que je continuerai de respecter, tous les termes des contrats de travail, d'invention, de secrets commerciaux, d'informations personnelles, de confidentialité, de non-concurrence, de non-sollicitation et de non-recrutement que j'ai signés avec l'entreprise, dont notamment : {{engagements}}</p><p>Je m'engage par ailleurs à respecter les contrats référencés ci-dessus et à garder confidentielles toutes les informations personnelles, techniques et de gestion au sujet de l'entreprise.</p><p>Je reconnais que j'ai reçu une copie de la présente attestation et que je l'ai signée de mon propre gré.</p><p>Je certifie que ce qui précède est vrai et correct, sous peine de sanctions pour fausse déclaration conformément aux lois de {{juridiction}}.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>Signature de l'employé</p></div>`,
    popularity: 30,
    countriesJson: C(
      'États OHADA : ce document complète le reçu pour solde de tout compte prévu par les codes du travail nationaux (délai de dénonciation limité).',
      'France : distinct du reçu pour solde de tout compte (art. L1234-20 Code du travail) — il formalise la restitution des biens et le rappel des obligations post-contractuelles.'
    ),
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

  console.log('✅ Seed RH / GRH (Drive 2) terminé.');
  console.log(`   Templates du script : ${templates.length} (créés : ${created}, mis à jour : ${updated})`);
  console.log('   Répartition par catégorie (ce script) :');
  for (const [cat, n] of Object.entries(byCategory)) console.log(`     - ${cat} : ${n}`);
  console.log(`   Variantes pays (countriesJson) : ${withCountries} templates`);
  console.log(`   ➜ Total de templates en base : ${total}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
