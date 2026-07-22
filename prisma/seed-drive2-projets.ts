// Seed « Appels d'offres & Gestion de projet » IBIG DocPro — Agent Drive2-8/10.
// Templates convertis depuis les modèles du Google Drive :
// - Kit IBI065 « Appel d'offre réussi » (dossier « Fichiers modifiable »)
// - « LE KIT DU CHEF DE PROJETS » (Initialisation, Exécution, Contrôle, Clôture)
// Script ADDITIF : upsert par code — n'écrase pas les templates existants.
// Exécution : npx tsx prisma/seed-drive2-projets.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type ProjetTemplate = {
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

const templates: ProjetTemplate[] = [
  // ════════════════════════ APPELS D'OFFRES (7) ════════════════════════
  {
    code: 'ao_lettre_candidature', name: 'Lettre de candidature à un appel d’offres', category: 'commercial_financier', price: 1500, priceMax: 3500,
    description: 'Lettre officielle de candidature à un appel d’offres : présentation de l’entreprise, attestations de régularité et engagement sur les délais.',
    fieldsJson: F([
      { key: 'entreprise', label: 'Votre entreprise (raison sociale + adresse + téléphone + e-mail)', type: 'textarea', required: true },
      { key: 'activite', label: 'Activité principale de votre entreprise', type: 'text', required: true },
      { key: 'autorite', label: 'Organisme lanceur de l’appel d’offres (nom + adresse)', type: 'textarea', required: true },
      { key: 'reference_ao', label: 'Nom / référence de l’appel d’offres', type: 'text', required: true },
      { key: 'date_publication', label: 'Date de publication de l’appel d’offres', type: 'date', required: true },
      { key: 'representant', label: 'Représentant légal (prénom, nom + fonction)', type: 'text', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p><strong>{{entreprise}}</strong></p><p class="align-right">{{ville}}, le {{date_jour}}</p><p>À : {{autorite}}</p><p>Objet : <strong>Lettre de candidature pour l'appel d'offres {{reference_ao}}</strong></p><p>Madame, Monsieur,</p><p>Nous avons l'honneur de vous soumettre notre candidature en réponse à l'appel d'offres {{reference_ao}} publié par votre organisme le {{date_publication}}.</p><p>Notre entreprise est spécialisée dans {{activite}}. Nous sommes convaincus que notre expertise et notre expérience nous permettent de répondre aux exigences du présent appel d'offres et de contribuer efficacement à la réalisation du projet.</p><p>Nous attestons sur l'honneur que notre entreprise est en règle avec les obligations légales et réglementaires en vigueur. À cet effet, nous avons inclus les pièces administratives requises, telles que le registre du commerce, les attestations fiscales et sociales, les certifications pertinentes, ainsi que les références de projets similaires que nous avons réalisés avec succès.</p><p>Nous disposons d'une équipe compétente, dotée des qualifications nécessaires pour mener à bien le projet de manière professionnelle et rigoureuse. De plus, notre entreprise est équipée des ressources techniques et matérielles nécessaires pour garantir la qualité et la conformité des livrables.</p><p>Nous avons également établi un plan de gestion de la qualité et un plan de prévention des risques, visant à assurer le bon déroulement du projet et à minimiser les éventuels risques. En ce qui concerne le plan de financement du projet, nous vous soumettons les détails de notre proposition financière conforme aux conditions de l'appel d'offres.</p><p>Nous nous engageons à respecter les délais impartis et à fournir des prestations conformes aux spécifications définies dans le cahier des charges.</p><p>Dans l'espoir de contribuer activement à la réalisation de ce projet, nous restons à votre disposition pour toute information complémentaire ou rencontre éventuelle.</p><p>Veuillez agréer, Madame, Monsieur, l'expression de nos salutations distinguées.</p><p class="signatures">{{representant}}<br/>Pour {{entreprise}}</p></div>`,
    popularity: 55,
    countriesJson: JSON.stringify({
      UEMOA: { note: 'Directives UEMOA n°04/2005/CM/UEMOA et 05/2005/CM/UEMOA portant procédures de passation et de contrôle des marchés publics — candidature accompagnée des pièces administratives exigées par le dossier d’appel d’offres.' },
      CI: { note: 'Côte d’Ivoire : Code des marchés publics (ordonnance n°2019-679) — production du registre du commerce, des attestations fiscales (DGI) et sociales (CNPS) à jour.' },
      SN: { note: 'Sénégal : Code des marchés publics (décret n°2022-2295) — les candidatures sont déposées auprès de l’autorité contractante dans les formes prescrites par le dossier d’appel à la concurrence.' },
    }),
  },
  {
    code: 'ao_formulaire_soumission', name: 'Formulaire de soumission d’offre (appel d’offres)', category: 'commercial_financier', price: 2000, priceMax: 4500,
    description: 'Formulaire de soumission structuré : informations générales, expérience et références, capacités techniques, proposition financière et documents joints.',
    fieldsJson: F([
      { key: 'soumissionnaire', label: 'Entreprise soumissionnaire (raison sociale, adresse, téléphone, e-mail, site web)', type: 'textarea', required: true },
      { key: 'autorite', label: 'Organisation émettrice de l’appel d’offres (nom + adresse)', type: 'textarea', required: true },
      { key: 'reference_ao', label: 'Numéro de référence de l’appel d’offres', type: 'text', required: true },
      { key: 'objet', label: 'Objet du projet ou du service', type: 'text', required: true },
      { key: 'experience', label: 'Expérience (années dans le domaine + références de projets similaires)', type: 'textarea', required: true },
      { key: 'equipe', label: 'Équipe dédiée au projet (compétences et qualifications)', type: 'textarea', required: true },
      { key: 'proposition_financiere', label: 'Proposition financière (montant total, détail des coûts, mode de paiement)', type: 'textarea', required: true },
      { key: 'documents', label: 'Documents joints (certificats, références, licences…)', type: 'textarea', required: true },
    ]),
    body: `<div class="contrat"><h1>FORMULAIRE DE SOUMISSION</h1><p><strong>Référence de l'appel d'offres :</strong> {{reference_ao}}<br/><strong>Date de soumission :</strong> {{date_jour}}</p><p><strong>À :</strong> {{autorite}}</p><p>Objet : <strong>Soumission pour {{objet}}</strong></p><h2>1. Informations générales sur le soumissionnaire</h2><p>{{soumissionnaire}}</p><h2>2. Expérience et références</h2><p>{{experience}}</p><h2>3. Capacités techniques</h2><p>Équipe dédiée au projet, compétences et qualifications :</p><p>{{equipe}}</p><h2>4. Proposition financière</h2><p>{{proposition_financiere}}</p><h2>5. Documents requis</h2><p>Veuillez trouver ci-joint les documents suivants :</p><p>{{documents}}</p><h2>6. Conditions générales</h2><p>En soumettant cette proposition, nous confirmons que nous avons lu, compris et accepté les termes et conditions énoncés dans le cahier des charges de l'appel d'offres. Nous déclarons également que tous les renseignements fournis dans cette proposition sont exacts et véridiques.</p><p class="signatures">Signature du représentant autorisé — Sceau de l'entreprise soumissionnaire<br/><br/>Fait le {{date_jour}}</p><p class="text-small">Note : respecter la date limite de soumission mentionnée dans l'appel d'offres et fournir tous les documents requis de manière complète et précise.</p></div>`,
    popularity: 48,
    countriesJson: JSON.stringify({
      UEMOA: { note: 'Espace UEMOA : la soumission suit le modèle du dossier type d’appel d’offres ; l’offre est signée par une personne dûment habilitée et accompagnée de la garantie de soumission si exigée.' },
      CI: { note: 'Côte d’Ivoire : dépôt des offres sous double enveloppe (offre technique / offre financière) selon le Code des marchés publics et le règlement particulier de l’appel d’offres.' },
      SN: { note: 'Sénégal : les offres sont rédigées et déposées conformément au dossier d’appel d’offres ; toute offre non conforme pour l’essentiel est écartée.' },
    }),
  },
  {
    code: 'ao_declaration_honneur_marche', name: 'Déclaration sur l’honneur (marchés publics)', category: 'commercial_financier', price: 1000, priceMax: 2500,
    description: 'Déclaration sur l’honneur pour appel d’offres : sincérité des informations, régularité fiscale et sociale, absence de condamnation et authenticité des pièces.',
    fieldsJson: F([
      { key: 'representant', label: 'Représentant légal (prénom et nom)', type: 'text', required: true },
      { key: 'fonction', label: 'Fonction du représentant légal', type: 'text', required: true },
      { key: 'entreprise', label: 'Entreprise (raison sociale + adresse)', type: 'textarea', required: true },
      { key: 'autorite', label: 'Organisme lanceur de l’appel d’offres (nom + adresse)', type: 'textarea', required: true },
      { key: 'reference_ao', label: 'Nom / référence de l’appel d’offres', type: 'text', required: true },
      { key: 'date_publication', label: 'Date de publication de l’appel d’offres', type: 'date', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>DÉCLARATION SUR L'HONNEUR</h1><p>À : {{autorite}}</p><p>Madame, Monsieur,</p><p>Par la présente, je soussigné(e) <strong>{{representant}}</strong>, agissant en qualité de {{fonction}} au sein de l'entreprise <strong>{{entreprise}}</strong>, déclare sur l'honneur que l'ensemble des informations fournies dans le cadre de notre candidature à l'appel d'offres <strong>{{reference_ao}}</strong>, publié par votre organisme le {{date_publication}}, sont sincères, exactes et complètes.</p><p>Nous attestons que notre entreprise est en situation régulière vis-à-vis de ses obligations légales, fiscales et sociales, conformément aux lois et règlements en vigueur dans notre pays.</p><p>De plus, nous confirmons que notre entreprise n'a fait l'objet d'aucune condamnation pour des pratiques anticoncurrentielles, de fraude, ou de tout autre délit susceptible de remettre en cause notre éligibilité à participer à cet appel d'offres.</p><p>Nous déclarons également que les pièces administratives et justificatives fournies dans le cadre de notre candidature sont authentiques et ne comportent aucune altération.</p><p>Nous nous engageons à respecter les exigences, les délais et les conditions définies dans le cahier des charges de l'appel d'offres, et à fournir des informations complémentaires ou des documents supplémentaires si nécessaire pour étayer notre candidature.</p><p>Enfin, nous attestons avoir pris connaissance des conséquences juridiques attachées à la présente déclaration sur l'honneur, notamment en cas de fausse déclaration.</p><p>Veuillez agréer, Madame, Monsieur, l'expression de nos salutations distinguées.</p><p class="signatures">Fait à {{ville}}, le {{date_jour}}<br/><br/>{{representant}}<br/>{{fonction}} — {{entreprise}}</p></div>`,
    popularity: 52,
    countriesJson: JSON.stringify({
      UEMOA: { note: 'Directive UEMOA n°04/2005 : les candidats attestent sur l’honneur qu’ils ne tombent sous le coup d’aucune interdiction de soumissionner (faillite, fraude, corruption, défaut fiscal ou social).' },
      CI: { note: 'Côte d’Ivoire : la fausse déclaration entraîne le rejet de l’offre et l’exclusion de la commande publique, sans préjudice des sanctions pénales (Code des marchés publics).' },
      SN: { note: 'Sénégal : déclaration exigée par les dossiers types de l’ARCOP ; l’inexactitude des mentions expose aux sanctions prévues par le Code des marchés publics.' },
    }),
  },
  {
    code: 'ao_memoire_technique', name: 'Mémoire technique / méthodologie de travail (réponse AO)', category: 'commercial_financier', price: 3000, priceMax: 5000,
    description: 'Mémoire technique de réponse à un appel d’offres : approche globale, étapes du projet, méthodes de travail, gestion des risques, qualité et communication.',
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise soumissionnaire (raison sociale)', type: 'text', required: true },
      { key: 'reference_ao', label: 'Projet / référence de l’appel d’offres', type: 'text', required: true },
      { key: 'approche', label: 'Approche globale (stratégie, philosophie de travail, principes directeurs)', type: 'textarea', required: true },
      { key: 'etapes', label: 'Étapes du projet et activités par étape', type: 'textarea', required: true },
      { key: 'planification', label: 'Planification et gestion du projet (outils, réunions, rapports de suivi)', type: 'textarea', required: true },
      { key: 'risques', label: 'Gestion des risques (identification, évaluation, traitement)', type: 'textarea', required: true },
      { key: 'qualite', label: 'Qualité et contrôle (processus de contrôle, audits, tests)', type: 'textarea', required: true },
      { key: 'communication', label: 'Communication et transfert de compétences (rapports, réunions, formation)', type: 'textarea', required: true },
    ]),
    body: `<div class="contrat"><h1>MÉMOIRE TECHNIQUE — MÉTHODOLOGIE DE TRAVAIL</h1><p><strong>Soumissionnaire :</strong> {{entreprise}}<br/><strong>Projet :</strong> {{reference_ao}}<br/><strong>Date :</strong> {{date_jour}}</p><p>La présente méthodologie décrit la façon dont {{entreprise}} entend mener à bien le projet, incluant les approches, les techniques, les processus, les outils et les ressources qui seront utilisés pour atteindre les objectifs du projet.</p><h2>1. Description de l'approche globale</h2><p>{{approche}}</p><h2>2. Étapes du projet</h2><p>{{etapes}}</p><h2>3. Planification et gestion du projet</h2><p>{{planification}}</p><h2>4. Gestion des risques</h2><p>{{risques}}</p><h2>5. Qualité et contrôle</h2><p>{{qualite}}</p><h2>6. Communication, formation et transfert de compétences</h2><p>{{communication}}</p><p>Cette méthodologie permet à l'organisme acheteur de comprendre comment notre entreprise compte réaliser le projet de manière efficace et professionnelle, et témoigne de nos compétences et de la solidité de notre approche.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>Pour {{entreprise}}</p></div>`,
    popularity: 42,
    countriesJson: JSON.stringify({
      UEMOA: { note: 'Espace UEMOA : le mémoire technique est évalué selon les critères du règlement particulier d’appel d’offres (méthodologie, personnel, matériel, planning) — critères notés et pondérés.' },
      CI: { note: 'Côte d’Ivoire : l’offre technique est présentée dans une enveloppe distincte de l’offre financière et évaluée avant ouverture de cette dernière pour les prestations intellectuelles.' },
    }),
  },
  {
    code: 'ao_demande_eclaircissements', name: 'Demande d’éclaircissements (appel d’offres)', category: 'commercial_financier', price: 1000, priceMax: 2500,
    description: 'Lettre de demande d’éclaircissements adressée à l’autorité contractante pendant la période de questions d’un appel d’offres.',
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise soumissionnaire (raison sociale + adresse + contact)', type: 'textarea', required: true },
      { key: 'autorite', label: 'Organisme acheteur (nom + adresse)', type: 'textarea', required: true },
      { key: 'reference_ao', label: 'Référence de l’appel d’offres', type: 'text', required: true },
      { key: 'questions', label: 'Questions / points à clarifier (numérotés)', type: 'textarea', required: true },
      { key: 'canal_reponse', label: 'Canal de réponse souhaité (e-mail, portail…)', type: 'text', required: true },
      { key: 'signataire', label: 'Signataire (nom + fonction)', type: 'text', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p><strong>{{entreprise}}</strong></p><p class="align-right">{{ville}}, le {{date_jour}}</p><p>À : {{autorite}}</p><p>Objet : <strong>Demande d'éclaircissements — Appel d'offres {{reference_ao}}</strong></p><p>Madame, Monsieur,</p><p>Dans le cadre de la préparation de notre offre en réponse à l'appel d'offres {{reference_ao}}, et conformément à la période de questions prévue par le dossier de consultation, nous souhaitons obtenir des éclaircissements sur les points suivants :</p><p>{{questions}}</p><p>Ces clarifications nous permettront de finaliser une offre complète, compétitive et conforme aux exigences du cahier des charges. Nous vous saurions gré de bien vouloir nous transmettre vos réponses par {{canal_reponse}}, et de les communiquer, le cas échéant, à l'ensemble des soumissionnaires afin de garantir l'égalité de traitement et la transparence du processus.</p><p>Si les réponses apportées le justifient, nous vous remercions par avance d'examiner l'opportunité d'un report de la date limite de soumission afin de permettre l'intégration de ces clarifications dans les offres.</p><p>Dans l'attente de votre retour, nous vous prions d'agréer, Madame, Monsieur, l'expression de nos salutations distinguées.</p><p class="signatures">{{signataire}}<br/>Pour {{entreprise}}</p></div>`,
    popularity: 30,
    countriesJson: JSON.stringify({
      UEMOA: { note: 'Espace UEMOA : les demandes d’éclaircissements et les réponses de l’autorité contractante sont communiquées à tous les candidats pour garantir l’égalité de traitement et la transparence.' },
      CI: { note: 'Côte d’Ivoire : les éclaircissements sont demandés par écrit dans le délai fixé par le dossier d’appel d’offres ; les réponses sont notifiées à tous les acquéreurs du dossier.' },
    }),
  },
  {
    code: 'ao_invitation_soumission', name: 'Lettre d’invitation à soumissionner', category: 'commercial_financier', price: 1500, priceMax: 3500,
    description: 'Lettre par laquelle une entreprise ou un organisme invite un fournisseur présélectionné à soumissionner pour un projet ou un service.',
    fieldsJson: F([
      { key: 'expediteur', label: 'Expéditeur (nom + titre/fonction)', type: 'text', required: true },
      { key: 'organisation', label: 'Votre entreprise / organisation (nom + adresse)', type: 'textarea', required: true },
      { key: 'destinataire', label: 'Soumissionnaire invité (nom / société)', type: 'text', required: true },
      { key: 'projet', label: 'Nom du projet ou du service', type: 'text', required: true },
      { key: 'description', label: 'Description brève du projet ou du service', type: 'textarea', required: true },
      { key: 'modalites', label: 'Détails de la soumission (date limite, mode de dépôt, documents requis…)', type: 'textarea', required: true },
      { key: 'contact', label: 'Contact pour questions (e-mail + téléphone)', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p><strong>{{organisation}}</strong></p><p class="align-right">Le {{date_jour}}</p><p>Objet : <strong>Invitation à soumissionner</strong></p><p>Cher {{destinataire}},</p><p>Nous avons le plaisir de vous inviter à soumissionner pour <strong>{{projet}}</strong> organisé par {{organisation}}. Nous avons pris connaissance de votre réputation et de vos compétences dans le domaine, et nous pensons que votre entreprise serait un candidat potentiel pour ce projet.</p><p><strong>Description du projet :</strong> {{description}}</p><p><strong>Détails de la soumission :</strong> {{modalites}}</p><p>Si vous êtes intéressé par cette opportunité, veuillez soumettre votre proposition conformément aux exigences mentionnées dans le dossier de soumission joint. Pour toute question ou demande de clarification, n'hésitez pas à nous contacter : {{contact}}.</p><p>Nous vous remercions de l'intérêt que vous portez à ce projet et nous avons hâte de recevoir votre proposition.</p><p>Cordialement,</p><p class="signatures">{{expediteur}}<br/>{{organisation}}</p></div>`,
    popularity: 28,
    countriesJson: JSON.stringify({
      UEMOA: { note: 'Espace UEMOA : l’appel d’offres restreint (sur invitation) n’est admis que dans les conditions prévues par la réglementation des marchés publics et après avis de l’organe de contrôle.' },
      CI: { note: 'Côte d’Ivoire : la consultation restreinte s’adresse à des candidats présélectionnés en raison de leur capacité ; les invitations précisent la date limite et les modalités de dépôt.' },
    }),
  },
  {
    code: 'ao_garantie_soumission', name: 'Lettre de garantie de soumission', category: 'commercial_financier', price: 2000, priceMax: 4500,
    description: 'Garantie de soumission émise par une banque ou un organisme garant en faveur d’un soumissionnaire, payable à première demande à l’autorité contractante.',
    fieldsJson: F([
      { key: 'garant', label: 'Organisme garant (banque : nom + adresse)', type: 'textarea', required: true },
      { key: 'soumissionnaire', label: 'Soumissionnaire garanti (nom + adresse)', type: 'textarea', required: true },
      { key: 'beneficiaire', label: 'Organisation émettrice de l’appel d’offres (bénéficiaire)', type: 'text', required: true },
      { key: 'reference_ao', label: 'Numéro / titre de l’appel d’offres', type: 'text', required: true },
      { key: 'objet', label: 'Objet du projet ou du service', type: 'text', required: true },
      { key: 'montant', label: 'Montant de la garantie (en chiffres et en lettres + devise)', type: 'text', required: true },
      { key: 'date_expiration', label: 'Date d’expiration de la garantie', type: 'date', required: true },
      { key: 'ville', label: 'Ville d’émission', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>LETTRE DE GARANTIE DE SOUMISSION</h1><p><strong>Organisme garant :</strong> {{garant}}</p><p><strong>Soumissionnaire :</strong> {{soumissionnaire}}</p><p>Objet : <strong>Garantie de soumission pour l'appel d'offres {{reference_ao}}</strong></p><p>Madame, Monsieur,</p><p>Nous, {{garant}}, agissant en tant qu'organisme garant, confirmons par la présente que nous sommes prêts à fournir une garantie de soumission en faveur de {{soumissionnaire}} pour sa participation à l'appel d'offres susmentionné.</p><p>Le soumissionnaire a soumis une offre pour {{objet}} et s'est engagé à respecter toutes les conditions et exigences énoncées dans l'appel d'offres.</p><p>Par la présente, nous nous engageons à verser à <strong>{{beneficiaire}}</strong> une somme équivalente à <strong>{{montant}}</strong>, en cas de retrait de l'offre par le soumissionnaire pendant la période de validité de l'offre, telle que spécifiée dans l'appel d'offres, ou en cas de non-respect des conditions de l'appel d'offres par le soumissionnaire retenu.</p><p>Cette garantie est valide pendant toute la période de validité de l'offre, conformément aux termes de l'appel d'offres. Nous garantissons que le montant de la garantie de soumission sera disponible et payable immédiatement à première demande écrite de {{beneficiaire}}.</p><p>La présente lettre de garantie de soumission est valable jusqu'au <strong>{{date_expiration}}</strong>, après quoi elle sera nulle et non avenue.</p><p class="signatures">Fait à {{ville}}, le {{date_jour}}<br/><br/>Signature du représentant autorisé de l'organisme garant</p></div>`,
    popularity: 26,
    countriesJson: JSON.stringify({
      UEMOA: { note: 'Espace UEMOA : la garantie de soumission (1 à 3 % du montant prévisionnel du marché selon les réglementations nationales) est exigée pour les appels d’offres de travaux et de fournitures.' },
      CI: { note: 'Côte d’Ivoire : cautionnement provisoire fixé par le dossier d’appel d’offres, émis par une banque ou un établissement financier agréé ; restitué aux soumissionnaires non retenus.' },
      SN: { note: 'Sénégal : la garantie de soumission est saisie en cas de retrait de l’offre pendant son délai de validité ou de refus de signer le marché attribué.' },
    }),
  },

  // ════════════════════════ GESTION DE PROJET (5) ════════════════════════
  {
    code: 'proj_charte_projet', name: 'Charte de projet', category: 'commercial_financier', price: 3000, priceMax: 5000,
    description: 'Charte de projet complète : motivation, objectifs SMART et KPI, périmètre, hypothèses et contraintes, budget, jalons et autorité du chef de projet.',
    fieldsJson: F([
      { key: 'projet', label: 'Nom / code du projet', type: 'text', required: true },
      { key: 'organisation', label: 'Service / organisation', type: 'text', required: true },
      { key: 'chef_projet', label: 'Chef de projet (nom + niveau d’autorité)', type: 'text', required: true },
      { key: 'motivation', label: 'Présentation et motivation du projet (raison, situation initiale)', type: 'textarea', required: true },
      { key: 'objectifs', label: 'Objectifs SMART et indicateurs clés de performance (KPI + cibles)', type: 'textarea', required: true },
      { key: 'perimetre', label: 'Périmètre / hors périmètre, hypothèses et contraintes', type: 'textarea', required: true },
      { key: 'budget', label: 'Estimation des ressources financières (budget)', type: 'text', required: true },
      { key: 'jalons', label: 'Échéancier (jalons : chantier, date, description)', type: 'textarea', required: true },
    ]),
    body: `<div class="contrat"><h1>CHARTE DE PROJET</h1><p><strong>Nom / Code projet :</strong> {{projet}}<br/><strong>Service / Organisation :</strong> {{organisation}}<br/><strong>Chef de projet :</strong> {{chef_projet}}<br/><strong>Date :</strong> {{date_jour}}</p><h2>1. Présentation et motivation du projet</h2><p>{{motivation}}</p><h2>2. Objectifs et indicateurs clés de performance</h2><p>{{objectifs}}</p><h2>3. Périmètre, hypothèses et contraintes</h2><p>{{perimetre}}</p><h2>4. Livrables et réception</h2><p>Les livrables attendus du projet, leurs destinataires et les modalités d'approbation sont détaillés dans le cahier des charges qui sera établi pendant la phase de planification. Des portes d'approbation seront disponibles à chaque phase du projet pour confirmer le bon déroulement de la mise en place.</p><h2>5. Estimation des ressources financières</h2><p>{{budget}}</p><h2>6. Échéancier — jalons</h2><p>{{jalons}}</p><h2>7. Autorité du chef de projet</h2><p>{{chef_projet}} est confirmé(e) comme chef de projet. Il/elle contrôlera le budget, assumera la responsabilité des équipes assignées au projet et disposera de l'autorité nécessaire pour engager les dépenses prévues et constituer l'équipe projet.</p><h2>8. Approbations</h2><p>La présente charte est soumise à l'approbation du sponsor et de la direction. En cas de non-approbation, les raisons invoquées seront documentées et serviront de leçons pour les projets futurs.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>Le Chef de projet — Le Sponsor — La Direction</p></div>`,
    popularity: 45,
  },
  {
    code: 'proj_cahier_charges', name: 'Cahier des charges de projet', category: 'commercial_financier', price: 3500, priceMax: 5000,
    description: 'Cahier des charges fonctionnel et technique : contexte, objectifs, périmètre, description fonctionnelle des livrables, contraintes techniques, ressources, délais et budget.',
    fieldsJson: F([
      { key: 'projet', label: 'Nom / code du projet', type: 'text', required: true },
      { key: 'organisation', label: 'Service / organisation et chef de projet', type: 'text', required: true },
      { key: 'contexte', label: 'Contexte du projet (origine, besoins initiaux, bénéfices espérés)', type: 'textarea', required: true },
      { key: 'objectifs', label: 'Objectifs du projet (bénéfices attendus, objectifs mesurables, KPI)', type: 'textarea', required: true },
      { key: 'perimetre', label: 'Périmètre du projet (limites, hors périmètre, hypothèses, contraintes)', type: 'textarea', required: true },
      { key: 'fonctionnel', label: 'Description fonctionnelle (objectifs découpés en livrables L1, L2…)', type: 'textarea', required: true },
      { key: 'technique', label: 'Contraintes techniques (équipements, licences, réseau, compétences)', type: 'textarea', required: true },
      { key: 'ressources_delais', label: 'Ressources, délais et budget (équipe, jalons, coûts)', type: 'textarea', required: true },
    ]),
    body: `<div class="contrat"><h1>CAHIER DES CHARGES</h1><p><strong>Nom / Code projet :</strong> {{projet}}<br/><strong>Service / Organisation — Chef de projet :</strong> {{organisation}}<br/><strong>Date :</strong> {{date_jour}}</p><h2>1. Contexte du projet</h2><p>{{contexte}}</p><h2>2. Objectifs du projet</h2><p>{{objectifs}}</p><h2>3. Périmètre du projet</h2><p>{{perimetre}}</p><p class="text-small">Note : définir ce qui sort des limites du projet est aussi important que de définir ce qui va être fait. Cela évite des malentendus et des discussions ultérieures.</p><h2>4. Aspects fonctionnels — description des livrables</h2><p>{{fonctionnel}}</p><h2>5. Aspects techniques — contraintes</h2><p>{{technique}}</p><h2>6. Ressources, délais et budget</h2><p>{{ressources_delais}}</p><p>Le cahier des charges sera approuvé par les chefs de départements et leurs experts avant toute réalisation. Tout changement ultérieur devra faire l'objet d'une documentation détaillée et d'une approbation officielle.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>Le Chef de projet — Le Sponsor</p></div>`,
    popularity: 44,
  },
  {
    code: 'proj_pv_copil', name: 'Minutes de réunion — comité de pilotage (COPIL)', category: 'commercial_financier', price: 2000, priceMax: 4000,
    description: 'Procès-verbal de comité de pilotage : ordre du jour, note de synthèse, avancement, prévisions, risques, situation budgétaire, décisions prises et prochaine réunion.',
    fieldsJson: F([
      { key: 'projet', label: 'Nom / code du projet', type: 'text', required: true },
      { key: 'chef_projet', label: 'Chef de projet', type: 'text', required: true },
      { key: 'participants', label: 'Participants (nom, service, présent/excusé)', type: 'textarea', required: true },
      { key: 'avancement', label: 'État d’avancement depuis la réunion précédente', type: 'textarea', required: true },
      { key: 'previsions', label: 'Prévisions pour la période suivante', type: 'textarea', required: true },
      { key: 'risques_budget', label: 'Résumé des risques et situation budgétaire', type: 'textarea', required: true },
      { key: 'decisions', label: 'Points discutés et décisions prises', type: 'textarea', required: true },
      { key: 'prochaine_reunion', label: 'Prochaine réunion (date, heure, lieu, points à ajouter)', type: 'textarea', required: true },
    ]),
    body: `<div class="contrat"><h1>MINUTES DE RÉUNION — COMITÉ DE PILOTAGE</h1><p><strong>Projet :</strong> {{projet}}<br/><strong>Chef de projet :</strong> {{chef_projet}}<br/><strong>Date :</strong> {{date_jour}}</p><h2>Participants</h2><p>{{participants}}</p><h2>Ordre du jour</h2><p>Note de synthèse — État d'avancement depuis la réunion précédente — Prévisions pour la période suivante — Problèmes rencontrés et solutions apportées — Résumé des risques — Situation budgétaire — Points à discuter et décisions à prendre — Prochaine réunion.</p><h2>État d'avancement depuis la réunion précédente</h2><p>{{avancement}}</p><h2>Prévisions pour la période suivante</h2><p>{{previsions}}</p><h2>Résumé des risques et situation budgétaire</h2><p>{{risques_budget}}</p><h2>Points discutés et décisions prises</h2><p>{{decisions}}</p><h2>Prochaine réunion</h2><p>{{prochaine_reunion}}</p><p class="text-small">Cette synthèse a pour but de donner au comité exécutif la possibilité de suivre le projet. Les documents utilisés en réunion (tableau de bord, rapports d'avancement des modules) sont annexés au présent compte rendu.</p><p class="signatures">Rédigé le {{date_jour}}<br/><br/>{{chef_projet}} — Chef de projet</p></div>`,
    popularity: 38,
  },
  {
    code: 'proj_cr_reunion', name: 'Compte rendu de réunion projet', category: 'commercial_financier', price: 1000, priceMax: 2500,
    description: 'Compte rendu de réunion synthétique : objectif, ordre du jour, échanges et décisions par sujet, actions, appréciations et prochaines réunions.',
    fieldsJson: F([
      { key: 'projet', label: 'Référence du projet', type: 'text', required: true },
      { key: 'auteur', label: 'Auteur du compte rendu', type: 'text', required: true },
      { key: 'date_reunion', label: 'Date et heure de la réunion', type: 'text', required: true },
      { key: 'lieu', label: 'Lieu de la réunion', type: 'text', required: true },
      { key: 'participants', label: 'Destinataires / participants (nom, service ou société, e-mail)', type: 'textarea', required: true },
      { key: 'objectif', label: 'Objectif de la réunion', type: 'textarea', required: true },
      { key: 'echanges', label: 'Sujets abordés : synthèse des discussions, conclusions et décisions par sujet', type: 'textarea', required: true },
      { key: 'prochaines_reunions', label: 'Prochaines réunions (dates et lieux) — facultatif', type: 'text', required: false },
    ]),
    body: `<div class="contrat"><h1>COMPTE RENDU DE RÉUNION</h1><p><strong>Référence du projet :</strong> {{projet}}<br/><strong>Auteur :</strong> {{auteur}}<br/><strong>Date et heure de la réunion :</strong> {{date_reunion}}<br/><strong>Lieu :</strong> {{lieu}}</p><h2>Destinataires et participants</h2><p>{{participants}}</p><h2>Objectif de la réunion</h2><p>{{objectif}}</p><h2>Échanges — sujets abordés</h2><p>{{echanges}}</p><h2>Tableau des actions</h2><p>Référez-vous au tableau de suivi des actions pour la liste exhaustive des actions décidées en réunion (responsable, échéance, statut).</p><h2>Appréciations</h2><p>Efficacité et atteinte des objectifs de la réunion, couverture des points prévus dans l'ordre du jour initial, difficultés particulières liées à l'organisation et points à améliorer.</p><h2>Prochaines réunions</h2><p>{{prochaines_reunions}}</p><p class="signatures">Compte rendu établi le {{date_jour}}<br/><br/>{{auteur}}</p></div>`,
    popularity: 35,
  },
  {
    code: 'proj_pv_reception_livrables', name: 'PV de réception des livrables (clôture de projet)', category: 'commercial_financier', price: 2500, priceMax: 5000,
    description: 'Procès-verbal de réception des livrables d’un projet : description détaillée, approbation avec ou sans réserves, plan d’action et signatures des parties.',
    fieldsJson: F([
      { key: 'projet', label: 'Nom / code du projet', type: 'text', required: true },
      { key: 'chef_projet', label: 'Chef de projet', type: 'text', required: true },
      { key: 'livrables', label: 'Description détaillée des livrables reçus (référence au cahier des charges, résultats confirmés)', type: 'textarea', required: true },
      { key: 'receptionnaire', label: 'Réceptionnaire (nom + fonction, représentant le maître d’ouvrage)', type: 'text', required: true },
      { key: 'conformite', label: 'Conclusion de la réception', type: 'select', required: true, options: ['Livrables conformes aux attentes', 'Livrables conformes aux attentes sous réserves', 'Livrables non conformes aux attentes'] },
      { key: 'reserves', label: 'Réserves (corrections attendues, délais, coûts, date de prochaine réception) — le cas échéant', type: 'textarea', required: false },
      { key: 'maitre_oeuvre', label: 'Signataire pour le maître d’œuvre (prénom, nom, fonction)', type: 'text', required: true },
      { key: 'ville', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>PROCÈS-VERBAL DE RÉCEPTION DES LIVRABLES</h1><p><strong>Projet :</strong> {{projet}}<br/><strong>Chef de projet :</strong> {{chef_projet}}<br/><strong>Date :</strong> {{date_jour}}</p><h2>1. Description du (des) livrable(s)</h2><p>{{livrables}}</p><p class="text-small">Tout changement par rapport au cahier des charges initial doit faire l'objet d'une documentation détaillée et avoir été approuvé officiellement. Ne laissez ici aucune place à l'interprétation.</p><h2>2. Approbation</h2><p>Je soussigné(e), <strong>{{receptionnaire}}</strong>, représentant le maître d'ouvrage, reconnais par la présente avoir reçu la livraison du (des) livrable(s) mentionné(s) ci-dessus et déclare : <strong>{{conformite}}</strong>.</p><h2>3. Réserves des parties</h2><p>{{reserves}}</p><h2>4. Remarques</h2><p>Si les réserves nécessitent un plan d'action, les accords entre les parties et les délais négociés sont consignés ci-dessus et confirmés par le maître d'œuvre. La liste des corrections restant à finaliser est tenue à la disposition des utilisateurs-clés et des chefs de service.</p><p class="signatures">Fait en deux exemplaires à {{ville}}, le {{date_jour}}<br/><br/>Pour le Maître d'œuvre : {{maitre_oeuvre}} — Pour le Maître d'ouvrage : {{receptionnaire}}</p></div>`,
    popularity: 32,
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

  console.log('✅ Seed Drive — Appels d\'offres & Gestion de projet terminé.');
  console.log(`   Templates du script : ${templates.length} (créés : ${created}, mis à jour : ${updated})`);
  console.log('   Répartition par catégorie (ce script) :');
  for (const [cat, n] of Object.entries(byCategory)) console.log(`     - ${cat} : ${n}`);
  console.log(`   ➜ Total de templates en base : ${total}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
