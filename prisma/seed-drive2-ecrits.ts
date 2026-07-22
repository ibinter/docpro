// Seed « Écrits professionnels & secrétariat » IBIG DocPro — Agent Drive2-9/10.
// Templates convertis depuis les modèles du Google Drive :
// Kit IBI073 « Communication professionnelle » (NOTE DE SERVICE, MEMO, COMPTE RENDU DE REUNION,
// RAPPORT, BULLETIN D'INFORMATION, COURRIEL PROFESSIONNEL), Kit Secrétariat Bureautique
// (Documents modifiables) et dossiers de correspondance associative / transit.
// Script ADDITIF : upsert par code — n'écrase pas les templates existants.
// Exécution : npx tsx prisma/seed-drive2-ecrits.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type EcritTemplate = {
  code: string;
  name: string;
  category: string;
  price: number;
  priceMax: number;
  description: string;
  fieldsJson: string;
  body: string;
  popularity: number;
};

const F = (fields: object[]) => JSON.stringify(fields);

const templates: EcritTemplate[] = [
  // ════════════════════════ NOTES & MÉMOS INTERNES ════════════════════════
  {
    code: 'sec_note_service', name: 'Note de service', category: 'commercial_financier', price: 300, priceMax: 800,
    description: 'Note de service interne pour informer un service ou l’ensemble du personnel d’une décision, d’un changement d’organisation ou d’une consigne.',
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise (nom + service émetteur)', type: 'text', required: true },
      { key: 'destinataires', label: 'Destinataire(s) (ex. tous les employés du département des ventes)', type: 'text', required: true },
      { key: 'objet', label: 'Objet de la note', type: 'text', required: true },
      { key: 'contenu', label: 'Contenu de la note (décision, changement, consignes et date d’effet)', type: 'textarea', required: true },
      { key: 'consigne', label: 'Consigne finale aux destinataires (facultatif)', type: 'text', required: false },
      { key: 'signataire', label: 'Signataire (nom + fonction)', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p><strong>{{entreprise}}</strong></p><p class="align-center"><strong>NOTE DE SERVICE</strong></p><p>Date : {{date_jour}}</p><p>Destinataire(s) : {{destinataires}}</p><p>Objet : <strong>{{objet}}</strong></p><p>Chers collègues,</p><p>Nous vous informons par la présente que {{contenu}}</p><p>Nous vous remercions de prendre note de ce changement. {{consigne}}</p><p class="signatures">{{signataire}}</p></div>`,
    popularity: 62,
  },
  {
    code: 'sec_memo_information', name: 'Mémo / note d’information interne', category: 'commercial_financier', price: 300, priceMax: 800,
    description: 'Mémo d’information rapide et structuré (À / De / Date / Objet) pour transmettre une information importante de manière succincte et efficace.',
    fieldsJson: F([
      { key: 'destinataires', label: 'À (destinataire(s))', type: 'text', required: true },
      { key: 'expediteur', label: 'De (votre nom)', type: 'text', required: true },
      { key: 'objet', label: 'Objet du mémo', type: 'text', required: true },
      { key: 'information', label: 'Information à communiquer', type: 'textarea', required: true },
      { key: 'instructions', label: 'Explications, instructions ou conclusions (facultatif)', type: 'textarea', required: false },
      { key: 'signataire', label: 'Signature (prénom nom + titre + entreprise)', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p class="align-center"><strong>MÉMO D'INFORMATION</strong></p><p>À : {{destinataires}}</p><p>De : {{expediteur}}</p><p>Date : {{date_jour}}</p><p>Objet : <strong>{{objet}}</strong></p><p>Chers collègues,</p><p>Je souhaite vous informer de {{information}}</p><p>{{instructions}}</p><p>Merci de votre attention à ce sujet.</p><p>Cordialement,</p><p class="signatures">{{signataire}}</p></div>`,
    popularity: 55,
  },
  {
    code: 'sec_memo_gestion_depenses', name: 'Mémo — procédures de gestion des dépenses (notes de frais)', category: 'rh_emploi', price: 400, priceMax: 1000,
    description: 'Mémo interne informant les employés des nouvelles procédures de gestion des dépenses et de remboursement des notes de frais : politique, soumission, approbations, délais et formation.',
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise', type: 'text', required: true },
      { key: 'responsable', label: 'De (nom du responsable des finances)', type: 'text', required: true },
      { key: 'date_effet', label: 'Date d’entrée en vigueur des nouvelles procédures', type: 'date', required: true },
      { key: 'systeme', label: 'Système ou outil de soumission des demandes (ex. plateforme en ligne)', type: 'text', required: true },
      { key: 'precisions', label: 'Précisions complémentaires (plafonds, catégories de dépenses…) (facultatif)', type: 'textarea', required: false },
      { key: 'signataire', label: 'Signature (prénom nom + titre)', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p class="align-center"><strong>MÉMO — NOUVELLES PROCÉDURES DE GESTION DES DÉPENSES</strong></p><p>À : Tous les employés</p><p>De : {{responsable}} — {{entreprise}}</p><p>Date : {{date_jour}}</p><p>Objet : <strong>Nouvelles procédures de gestion des dépenses</strong></p><p>Chers collègues,</p><p>Je vous écris pour vous informer des nouvelles procédures de gestion des dépenses qui entreront en vigueur à partir du {{date_effet}}. Ces changements visent à améliorer l'efficacité et la transparence de notre processus de gestion des dépenses.</p><p><strong>1. Politique de dépenses :</strong> une politique de dépenses mise à jour sera publiée et distribuée à tous les employés. Veuillez prendre le temps de la lire attentivement pour vous familiariser avec les nouvelles directives et les exigences en matière de dépenses.</p><p><strong>2. Processus de soumission des demandes de remboursement :</strong> toutes les demandes de remboursement doivent être soumises via {{systeme}}. Les employés sont tenus de fournir des reçus ou des justificatifs appropriés pour chaque dépense demandée.</p><p><strong>3. Approbations :</strong> les demandes de remboursement seront soumises à l'approbation de votre superviseur direct ainsi que du service des finances. Veuillez vous assurer que toutes les informations requises sont correctement saisies pour éviter tout retard dans le traitement de votre demande.</p><p><strong>4. Délais de traitement :</strong> nous nous engageons à traiter les demandes de remboursement dans les plus brefs délais. Toutefois, veuillez noter que les délais de traitement peuvent varier en fonction du volume des demandes et des exigences de vérification.</p><p><strong>5. Sensibilisation et formation :</strong> des sessions de sensibilisation et de formation seront organisées pour vous guider à travers les nouvelles procédures et vous fournir des conseils sur la manière de soumettre correctement vos demandes de remboursement.</p><p>{{precisions}}</p><p>Nous vous remercions de votre coopération pour assurer le succès de la mise en œuvre de ces nouvelles procédures. Si vous avez des questions ou des préoccupations, n'hésitez pas à contacter le service des finances.</p><p>Cordialement,</p><p class="signatures">{{signataire}}<br/>{{entreprise}}</p></div>`,
    popularity: 42,
  },

  // ════════════════════════ RÉUNIONS ════════════════════════
  {
    code: 'sec_compte_rendu_reunion', name: 'Compte rendu de réunion', category: 'commercial_financier', price: 500, priceMax: 1200,
    description: 'Compte rendu de réunion d’affaires structuré : participants, ordre du jour, points discutés, décisions prises, actions à entreprendre et prochaine réunion.',
    fieldsJson: F([
      { key: 'titre', label: 'Titre / objet de la réunion', type: 'text', required: true },
      { key: 'date_heure_lieu', label: 'Date, heure (début - fin) et lieu de la réunion', type: 'text', required: true },
      { key: 'participants', label: 'Participants présents (et absents le cas échéant)', type: 'textarea', required: true },
      { key: 'animation', label: 'Animateur et secrétaire de séance', type: 'text', required: true },
      { key: 'points_discutes', label: 'Ordre du jour et principaux points discutés', type: 'textarea', required: true },
      { key: 'decisions', label: 'Décisions prises', type: 'textarea', required: true },
      { key: 'actions', label: 'Actions à entreprendre (responsables + dates limites) et prochaine réunion', type: 'textarea', required: true },
    ]),
    body: `<div class="lettre"><p class="align-center"><strong>COMPTE RENDU DE RÉUNION</strong></p><p>Objet : <strong>{{titre}}</strong></p><p>Date, heure et lieu : {{date_heure_lieu}}</p><p><strong>Participants :</strong><br/>{{participants}}</p><p><strong>Animation :</strong> {{animation}}</p><p><strong>1. Introduction</strong></p><p>La réunion s'est tenue aux date, heure et lieu indiqués ci-dessus. L'objectif principal de la réunion était : {{titre}}.</p><p><strong>2. Points à l'ordre du jour et principaux points discutés</strong></p><p>{{points_discutes}}</p><p><strong>3. Décisions prises</strong></p><p>{{decisions}}</p><p><strong>4. Actions à entreprendre et prochaine réunion</strong></p><p>{{actions}}</p><p><strong>5. Clôture</strong></p><p>La réunion a été clôturée à l'heure indiquée. Pour toute question ou clarification, veuillez contacter le secrétaire de séance.</p><p>Fait le {{date_jour}}.</p></div>`,
    popularity: 65,
  },
  {
    code: 'sec_rapport_reunion', name: 'Rapport / procès-verbal de réunion de direction', category: 'commercial_financier', price: 600, priceMax: 1500,
    description: 'Rapport détaillé d’une réunion de comité de direction : présents et excusés, ordre du jour, présentations, discussions et décisions point par point.',
    fieldsJson: F([
      { key: 'reunion', label: 'Intitulé de la réunion (ex. Comité de Direction)', type: 'text', required: true },
      { key: 'entreprise', label: 'Entreprise et lieu de la réunion', type: 'text', required: true },
      { key: 'date_heure', label: 'Date et heure (début - fin)', type: 'text', required: true },
      { key: 'presents', label: 'Présents (noms + fonctions)', type: 'textarea', required: true },
      { key: 'excuses', label: 'Excusés (noms + fonctions) (facultatif)', type: 'textarea', required: false },
      { key: 'ordre_du_jour', label: 'Ordre du jour (points numérotés)', type: 'textarea', required: true },
      { key: 'deliberations', label: 'Pour chaque point : présentation, discussion et décision', type: 'textarea', required: true },
    ]),
    body: `<div class="lettre"><p class="align-center"><strong>RAPPORT DE RÉUNION</strong></p><p>Réunion : <strong>{{reunion}}</strong></p><p>Entreprise et lieu : {{entreprise}}</p><p>Date et heure : {{date_heure}}</p><p><strong>Présents :</strong><br/>{{presents}}</p><p><strong>Excusés :</strong><br/>{{excuses}}</p><p><strong>Ordre du jour :</strong></p><p>{{ordre_du_jour}}</p><p><strong>Ouverture de la réunion</strong></p><p>La réunion a débuté à l'heure indiquée avec une brève introduction du président de séance, qui a accueilli les membres présents et a procédé à la vérification des présences et des excusés.</p><p><strong>Délibérations (présentations, discussions et décisions)</strong></p><p>{{deliberations}}</p><p><strong>Clôture de la réunion</strong></p><p>Le président de séance a résumé les principales décisions prises lors de la réunion et a souligné les prochaines étapes à suivre, notamment le suivi régulier des progrès et la communication avec toutes les parties prenantes. La réunion a été clôturée avec un remerciement à tous les participants pour leur contribution et leur engagement.</p><p>Fait le {{date_jour}}.</p></div>`,
    popularity: 48,
  },
  {
    code: 'sec_convocation_reunion', name: 'Lettre de convocation à une réunion (conseil d’administration)', category: 'commercial_financier', price: 400, priceMax: 1000,
    description: 'Lettre de convocation officielle des membres à une réunion du conseil d’administration : date, heure, lieu, ordre du jour et possibilité de représentation.',
    fieldsJson: F([
      { key: 'organisation', label: 'Organisation / association (dénomination)', type: 'text', required: true },
      { key: 'expediteur', label: 'Expéditeur (nom + adresse + téléphone)', type: 'textarea', required: true },
      { key: 'destinataire', label: 'Destinataire (civilité, nom + adresse)', type: 'textarea', required: true },
      { key: 'article_statuts', label: 'Article des statuts prévoyant la réunion', type: 'text', required: true },
      { key: 'date_heure_lieu', label: 'Date, heure et lieu de la réunion', type: 'text', required: true },
      { key: 'ordre_du_jour', label: 'Ordre du jour', type: 'textarea', required: true },
      { key: 'signataire', label: 'Signataire (nom + qualité, en général le Président)', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p class="align-right">Le {{date_jour}}</p><p><strong>{{expediteur}}</strong></p><p>À : {{destinataire}}</p><p>Objet : <strong>Convocation à la réunion du Conseil d'administration de {{organisation}}</strong></p><p>Madame, Monsieur,</p><p>J'ai l'honneur de vous informer, conformément à l'article {{article_statuts}} de nos statuts, que vous êtes convié(e) à la réunion du Conseil d'administration de {{organisation}}.</p><p>Cette réunion se tiendra : <strong>{{date_heure_lieu}}</strong>.</p><p>L'ordre du jour sera le suivant :</p><p>{{ordre_du_jour}}</p><p>En outre, j'ai le plaisir de vous informer que tous les documents d'information relatifs à cette réunion sont tenus à votre disposition au siège et sont consultables durant les heures de permanence.</p><p>Je vous rappelle qu'en cas d'empêchement de votre part, vous pouvez vous faire représenter par un autre membre du Conseil d'administration muni d'un pouvoir en bonne et due forme, conformément aux dispositions des statuts. Seuls les membres à jour de leurs cotisations pourront participer à la réunion.</p><p>Veuillez agréer, Madame, Monsieur, l'expression de mes sentiments distingués.</p><p class="signatures">{{signataire}}</p></div>`,
    popularity: 46,
  },

  // ════════════════════════ MISSIONS & RAPPORTS ════════════════════════
  {
    code: 'sec_rapport_mission', name: 'Rapport de mission', category: 'rh_emploi', price: 700, priceMax: 1500,
    description: 'Rapport de mission professionnel complet : objectifs, méthodologie, résultats, conclusions, recommandations et plan d’action.',
    fieldsJson: F([
      { key: 'commanditaire', label: 'Mission réalisée pour (entreprise / commanditaire)', type: 'text', required: true },
      { key: 'equipe', label: 'Nom du consultant / de l’équipe', type: 'text', required: true },
      { key: 'periode_lieu', label: 'Dates et lieu de la mission', type: 'text', required: true },
      { key: 'objectifs', label: 'Objectifs de la mission', type: 'textarea', required: true },
      { key: 'methodologie', label: 'Méthodologie (collecte d’informations, analyses, consultations)', type: 'textarea', required: true },
      { key: 'resultats', label: 'Résultats de la mission (observations et conclusions)', type: 'textarea', required: true },
      { key: 'recommandations', label: 'Recommandations et plan d’action', type: 'textarea', required: true },
    ]),
    body: `<div class="lettre"><p class="align-center"><strong>RAPPORT DE MISSION</strong></p><p><strong>Informations générales</strong></p><p>Mission réalisée pour : {{commanditaire}}<br/>Nom du consultant / de l'équipe : {{equipe}}<br/>Dates et lieu de la mission : {{periode_lieu}}</p><p><strong>Objectifs de la mission</strong></p><p>{{objectifs}}</p><p><strong>Méthodologie</strong></p><p>{{methodologie}}</p><p><strong>Résultats de la mission</strong></p><p>{{resultats}}</p><p><strong>Recommandations et plan d'action</strong></p><p>{{recommandations}}</p><p><strong>Suivi et évaluation</strong></p><p>Nous suivrons les progrès réalisés dans la réalisation des objectifs et évaluerons régulièrement les résultats obtenus par rapport aux objectifs fixés, en apportant des ajustements au plan d'action au besoin.</p><p><strong>Conclusion</strong></p><p>Ce rapport de mission met en évidence les résultats obtenus pour {{commanditaire}} et formule des recommandations stratégiques pour maximiser les retombées de la mission.</p><p>Fait le {{date_jour}}.</p><p class="signatures">{{equipe}}</p></div>`,
    popularity: 50,
  },

  // ════════════════════════ TRANSMISSION & EXPÉDITION ════════════════════════
  {
    code: 'sec_bordereau_expedition', name: 'Bordereau d’expédition / d’envoi', category: 'commercial_financier', price: 500, priceMax: 1200,
    description: 'Bordereau d’expédition détaillé : expéditeur, destinataire, articles expédiés, transporteur, conditions de livraison et signature.',
    fieldsJson: F([
      { key: 'numero', label: 'Numéro de bordereau d’expédition', type: 'text', required: true },
      { key: 'expediteur', label: 'Expéditeur (entreprise + adresse + contact + téléphone)', type: 'textarea', required: true },
      { key: 'destinataire', label: 'Destinataire (entreprise + adresse de livraison + contact)', type: 'textarea', required: true },
      { key: 'articles', label: 'Détails de l’expédition (articles : description, quantité, poids, volume)', type: 'textarea', required: true },
      { key: 'transporteur', label: 'Transporteur (compagnie + numéro de suivi)', type: 'text', required: true },
      { key: 'conditions', label: 'Conditions de livraison (Incoterm + lieu de livraison)', type: 'text', required: true },
      { key: 'instructions', label: 'Instructions spéciales (facultatif)', type: 'textarea', required: false },
    ]),
    body: `<div class="contrat"><h1>BORDEREAU D'EXPÉDITION</h1><p>Numéro de bordereau : <strong>{{numero}}</strong><br/>Date d'expédition : {{date_jour}}</p><h2>1. Informations sur l'expéditeur</h2><p>{{expediteur}}</p><h2>2. Informations sur le destinataire</h2><p>{{destinataire}}</p><h2>3. Détails de l'expédition</h2><p>{{articles}}</p><h2>4. Transporteur / mode de transport</h2><p>{{transporteur}}</p><h2>5. Conditions de livraison</h2><p>{{conditions}}</p><h2>6. Instructions spéciales</h2><p>{{instructions}}</p><h2>7. Déclarations et signature</h2><p>En émettant ce bordereau d'expédition, l'expéditeur confirme l'exactitude des détails de l'expédition mentionnés ci-dessus.</p><p>Date : {{date_jour}}</p><p class="signatures">Signature de l'expéditeur : ______________________</p></div>`,
    popularity: 40,
  },
  {
    code: 'sec_transmission_documents', name: 'Courrier de transmission de documents', category: 'commercial_financier', price: 300, priceMax: 800,
    description: 'Courrier ou e-mail accompagnant l’envoi de documents demandés : liste des pièces transmises, consignes d’archivage et contact en cas de difficulté.',
    fieldsJson: F([
      { key: 'destinataire', label: 'Destinataire (nom + référence de dossier le cas échéant)', type: 'text', required: true },
      { key: 'liste_documents', label: 'Liste des documents transmis (avec brève description)', type: 'textarea', required: true },
      { key: 'contact', label: 'Contact en cas de difficulté (e-mail + téléphone)', type: 'text', required: true },
      { key: 'expediteur', label: 'Expéditeur (nom + poste + entreprise + coordonnées)', type: 'textarea', required: true },
    ]),
    body: `<div class="lettre"><p class="align-right">Le {{date_jour}}</p><p>Objet : <strong>Transmission des documents demandés — {{destinataire}}</strong></p><p>Cher/Chère {{destinataire}},</p><p>Nous vous écrivons pour vous informer que les documents que vous avez demandés sont maintenant prêts et sont joints au présent envoi pour votre convenance.</p><p>Voici la liste des documents transmis :</p><p>{{liste_documents}}</p><p>Veuillez vérifier les pièces jointes pour accéder aux documents. Nous vous recommandons de sauvegarder une copie de ces documents pour vos archives personnelles.</p><p>Si vous rencontrez des difficultés pour ouvrir les documents ou si vous avez besoin d'informations supplémentaires, n'hésitez pas à nous contacter : {{contact}}. Nous sommes là pour vous aider.</p><p>Nous espérons que ces documents répondront à vos attentes et contribueront à répondre à vos besoins. Pour toute autre demande ou assistance, nous restons à votre disposition.</p><p>Cordialement,</p><p class="signatures">{{expediteur}}</p></div>`,
    popularity: 52,
  },

  // ════════════════════════ COMMUNICATION & RENDEZ-VOUS ════════════════════════
  {
    code: 'sec_bulletin_information', name: 'Bulletin d’information d’entreprise', category: 'commercial_financier', price: 400, priceMax: 1000,
    description: 'Bulletin d’information périodique de l’entreprise : actualités, événements à venir, reconnaissance des employés et rappel des politiques.',
    fieldsJson: F([
      { key: 'entreprise', label: 'Nom de l’entreprise', type: 'text', required: true },
      { key: 'periode', label: 'Période du bulletin (ex. Février 2026)', type: 'text', required: true },
      { key: 'actualites', label: 'Actualités de l’entreprise (nouveaux produits, partenariats, expansion…)', type: 'textarea', required: true },
      { key: 'evenements', label: 'Événements à venir (dates + descriptions)', type: 'textarea', required: true },
      { key: 'reconnaissance', label: 'Reconnaissance des employés (facultatif)', type: 'textarea', required: false },
      { key: 'rappel', label: 'Rappel des politiques internes (facultatif)', type: 'textarea', required: false },
    ]),
    body: `<div class="lettre"><p class="align-center"><strong>BULLETIN D'INFORMATION — {{periode}}</strong></p><p>Bienvenue au bulletin d'information de {{entreprise}} pour la période : {{periode}}. Ce bulletin fournit des mises à jour importantes sur les activités récentes, les événements à venir et d'autres actualités pertinentes pour nos clients et nos employés.</p><p><strong>Actualités de l'entreprise :</strong></p><p>{{actualites}}</p><p><strong>Événements à venir :</strong></p><p>{{evenements}}</p><p><strong>Reconnaissance des employés :</strong></p><p>{{reconnaissance}}</p><p><strong>Rappel des politiques :</strong></p><p>{{rappel}}</p><p>Ce bulletin d'information vous a fourni des informations utiles et intéressantes sur les activités de notre entreprise. Restez à l'écoute pour plus de mises à jour dans les mois à venir. Merci de votre soutien continu !</p><p>Cordialement,</p><p class="signatures">L'équipe de {{entreprise}}</p></div>`,
    popularity: 38,
  },
  {
    code: 'sec_demande_rendez_vous', name: 'Demande de rendez-vous professionnel', category: 'commercial_financier', price: 300, priceMax: 800,
    description: 'Courrier de demande de rendez-vous ou d’audience auprès d’un partenaire, client ou expert : motif, intérêt de la rencontre et disponibilités.',
    fieldsJson: F([
      { key: 'destinataire', label: 'Destinataire (nom)', type: 'text', required: true },
      { key: 'expediteur', label: 'Vous (nom + poste + entreprise + brève description de l’activité)', type: 'textarea', required: true },
      { key: 'motif', label: 'Ce qui vous amène à demander ce rendez-vous', type: 'textarea', required: true },
      { key: 'interet', label: 'Pourquoi une rencontre serait bénéfique', type: 'textarea', required: true },
      { key: 'disponibilites', label: 'Vos disponibilités', type: 'text', required: true },
      { key: 'moyen', label: 'Moyen de rencontre préféré (visioconférence, téléphone, en personne…)', type: 'text', required: true },
      { key: 'signature', label: 'Signature (nom + poste + entreprise + coordonnées)', type: 'textarea', required: true },
    ]),
    body: `<div class="lettre"><p class="align-right">Le {{date_jour}}</p><p>Objet : <strong>Demande de rendez-vous</strong></p><p>Bonjour {{destinataire}},</p><p>J'espère que vous allez bien. Je me présente : {{expediteur}}</p><p>Je vous contacte aujourd'hui car je suis très intéressé(e) par {{motif}}. Je crois fermement que {{interet}}</p><p>Serait-il possible de programmer un rendez-vous pour discuter de cette opportunité plus en détail ? Je suis convaincu(e) qu'une conversation pourrait nous permettre d'explorer des avenues de collaboration potentielles et de discuter de la manière dont nous pourrions travailler ensemble.</p><p>Je suis disponible {{disponibilites}}, mais je suis prêt(e) à m'adapter à votre emploi du temps pour que cette rencontre soit le plus pratique possible pour vous. La réunion pourrait se tenir via {{moyen}}.</p><p>Je vous remercie par avance pour votre temps et votre considération, et j'espère sincèrement avoir l'opportunité de vous parler bientôt.</p><p>Cordialement,</p><p class="signatures">{{signature}}</p></div>`,
    popularity: 58,
  },
  {
    code: 'sec_convocation_entretien', name: 'Lettre de rendez-vous pour entretien et test de recrutement', category: 'rh_emploi', price: 300, priceMax: 800,
    description: 'Lettre RH notifiant à un candidat la date de son entretien d’embauche et du test de recrutement : interlocuteur, lieu et contact en cas d’empêchement.',
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise (nom + adresse + téléphone)', type: 'textarea', required: true },
      { key: 'candidat', label: 'Candidat (nom et prénom + adresse)', type: 'textarea', required: true },
      { key: 'date_entretien', label: 'Date de l’entretien', type: 'date', required: true },
      { key: 'heure', label: 'Heure de l’entretien', type: 'text', required: true },
      { key: 'interlocuteur', label: 'Interlocuteur (nom + poste + emplacement du bureau)', type: 'text', required: true },
      { key: 'signataire', label: 'Signataire (nom + titre + téléphone + e-mail)', type: 'textarea', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p class="align-right">{{ville}}, le {{date_jour}}</p><p><strong>{{entreprise}}</strong></p><p>À : {{candidat}}</p><p>Objet : <strong>Rendez-vous pour un entretien et un test de recrutement</strong></p><p>Madame, Monsieur,</p><p>Au nom de {{entreprise}}, je voudrais vous remercier d'avoir récemment postulé à un poste au sein de notre entreprise.</p><p>J'ai le plaisir de vous informer qu'un entretien est prévu pour vous le <strong>{{date_entretien}} à {{heure}}</strong> avec {{interlocuteur}}.</p><p>Vous devrez passer un test d'environ une heure après l'entretien. Si pour une quelconque raison vous étiez dans l'incapacité d'honorer ce rendez-vous ou que vous aviez des questions, veuillez m'appeler au numéro indiqué ci-dessous.</p><p>Recevez, Madame, Monsieur, nos salutations distinguées.</p><p class="signatures">{{signataire}}</p></div>`,
    popularity: 44,
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
    };
    const existing = await prisma.documentTemplate.findUnique({ where: { code: t.code } });
    await prisma.documentTemplate.upsert({ where: { code: t.code }, update: data, create: data });
    if (existing) updated += 1; else created += 1;
    byCategory[t.category] = (byCategory[t.category] ?? 0) + 1;
  }

  const total = await prisma.documentTemplate.count();

  console.log('✅ Seed écrits professionnels & secrétariat (Drive2) terminé.');
  console.log(`   Templates du script : ${templates.length} (créés : ${created}, mis à jour : ${updated})`);
  console.log('   Répartition par catégorie (ce script) :');
  for (const [cat, n] of Object.entries(byCategory)) console.log(`     - ${cat} : ${n}`);
  console.log(`   ➜ Total de templates en base : ${total}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
