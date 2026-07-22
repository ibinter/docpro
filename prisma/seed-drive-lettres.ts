// Seed « Lettres professionnelles & courriers » IBIG DocPro — Agent Drive-5/5.
// Templates convertis depuis les modèles de lettres du Google Drive
// (dossier « MODELES DE LETTRES ET D'EMAILS » et dossiers de correspondance commerciale).
// Script ADDITIF : upsert par code — n'écrase pas les templates existants.
// Exécution : npx tsx prisma/seed-drive-lettres.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type LettreTemplate = {
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

const templates: LettreTemplate[] = [
  // ════════════════════════ RH & EMPLOI ════════════════════════
  {
    code: 'let_demission', name: 'Lettre de démission', category: 'rh_emploi', price: 300, priceMax: 800,
    description: 'Lettre de démission professionnelle avec date de départ, respect du préavis et remerciements.',
    fieldsJson: F([
      { key: 'salarie', label: 'Votre nom complet', type: 'text', required: true },
      { key: 'poste', label: 'Votre poste actuel', type: 'text', required: true },
      { key: 'entreprise', label: 'Nom de l’entreprise', type: 'text', required: true },
      { key: 'destinataire', label: 'Destinataire (supérieur ou responsable RH : nom + fonction)', type: 'text', required: true },
      { key: 'date_depart', label: 'Date de départ effective (fin de préavis)', type: 'date', required: true },
      { key: 'motif', label: 'Motif ou message personnel (facultatif)', type: 'textarea', required: false },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p class="align-right">{{ville}}, le {{date_jour}}</p><p><strong>{{salarie}}</strong><br/>{{poste}}</p><p>À l'attention de {{destinataire}}<br/>{{entreprise}}</p><p>Objet : <strong>Annonce de ma démission</strong></p><p>Madame, Monsieur,</p><p>Je vous informe par la présente de ma décision de démissionner de mon poste de {{poste}} au sein de {{entreprise}}. Ma démission sera effective à partir du {{date_depart}}, conformément aux conditions de mon contrat de travail et au préavis applicable.</p><p>Cette décision n'a pas été facile à prendre, mais après mûre réflexion, j'ai conclu qu'il était temps pour moi de relever de nouveaux défis et de poursuivre d'autres opportunités professionnelles. {{motif}}</p><p>Je tiens à exprimer ma sincère gratitude pour l'opportunité qui m'a été offerte de faire partie de cette entreprise et pour tout ce que j'ai appris et accompli au cours de mon passage ici.</p><p>Je m'engage à faciliter une transition aussi fluide que possible pendant la période de préavis et à collaborer pour assurer la continuité des activités. Je reste également à votre disposition pour aider à former et à intégrer un nouveau membre dans l'équipe, si nécessaire.</p><p>Je tiens à remercier toute l'équipe pour son soutien et sa collaboration. Je souhaite à l'entreprise et à mes collègues tout le succès qu'ils méritent à l'avenir.</p><p>Je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.</p><p class="signatures">{{salarie}}</p></div>`,
    popularity: 70,
  },
  {
    code: 'let_promotion', name: 'Lettre de promotion (annonce à un employé)', category: 'rh_emploi', price: 500, priceMax: 1200,
    description: 'Lettre officielle annonçant à un employé sa promotion : nouveau poste, responsabilités et rémunération.',
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise (raison sociale + adresse)', type: 'textarea', required: true },
      { key: 'employe', label: 'Employé promu (nom complet)', type: 'text', required: true },
      { key: 'nouveau_poste', label: 'Nouveau titre du poste', type: 'text', required: true },
      { key: 'date_effet', label: 'Date d’entrée en vigueur de la promotion', type: 'date', required: true },
      { key: 'responsabilites', label: 'Nouvelles responsabilités et missions clés', type: 'textarea', required: true },
      { key: 'remuneration', label: 'Nouvelle rémunération et avantages (facultatif)', type: 'text', required: false },
      { key: 'signataire', label: 'Signataire (nom + fonction)', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p class="align-right">Le {{date_jour}}</p><p><strong>{{entreprise}}</strong></p><p>À : <strong>{{employe}}</strong></p><p>Objet : <strong>Annonce de promotion</strong></p><p>Cher/Chère {{employe}},</p><p>Nous sommes heureux de vous informer officiellement de votre promotion au poste de <strong>{{nouveau_poste}}</strong>. Cette promotion entre en vigueur à partir du {{date_effet}}.</p><p>Votre dévouement, votre travail acharné et vos compétences exceptionnelles ont été reconnus et appréciés par l'ensemble de l'équipe de direction. Nous sommes convaincus que vous continuerez à exceller dans ce nouveau rôle et à contribuer de manière significative à la réussite de notre entreprise.</p><p><strong>Nouvelles responsabilités :</strong> en tant que {{nouveau_poste}}, vous serez responsable de : {{responsabilites}}</p><p><strong>Rémunération et avantages :</strong> {{remuneration}}. Les détails complets seront inclus dans votre avenant au contrat de travail.</p><p>Veuillez accepter nos félicitations les plus sincères pour cette réalisation remarquable. Nous sommes impatients de voir les contributions que vous apporterez dans votre nouveau rôle et de continuer à vous soutenir dans votre développement professionnel.</p><p>Cordialement,</p><p class="signatures">{{signataire}}<br/>{{entreprise}}</p></div>`,
    popularity: 42,
  },

  // ════════════════════════ JURIDIQUE & ADMINISTRATIF ════════════════════════
  {
    code: 'let_resiliation_contrat', name: 'Lettre de résiliation de contrat', category: 'juridique_admin', price: 500, priceMax: 1500,
    description: 'Lettre notifiant la résiliation d’un contrat (abonnement, prestation, partenariat) dans le respect des modalités prévues.',
    fieldsJson: F([
      { key: 'expediteur', label: 'Expéditeur (nom + adresse + contacts)', type: 'textarea', required: true },
      { key: 'destinataire', label: 'Destinataire (nom / société + adresse)', type: 'textarea', required: true },
      { key: 'contrat', label: 'Contrat concerné (type + référence + date de signature)', type: 'text', required: true },
      { key: 'motif', label: 'Raisons de la résiliation', type: 'textarea', required: true },
      { key: 'modalites', label: 'Modalités de résiliation prévues au contrat (préavis, restitution…)', type: 'textarea', required: false },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p class="align-right">{{ville}}, le {{date_jour}}</p><p><strong>{{expediteur}}</strong></p><p>À : {{destinataire}}</p><p>Lettre recommandée avec accusé de réception</p><p>Objet : <strong>Résiliation de contrat</strong></p><p>Madame, Monsieur,</p><p>Je vous écris pour vous informer de ma décision de résilier le contrat suivant : {{contrat}}. Cette décision est prise après mûre réflexion, pour les raisons suivantes :</p><p>{{motif}}</p><p>Je tiens à souligner que j'apprécie notre collaboration jusqu'à présent. Cependant, je crois qu'il est dans l'intérêt de toutes les parties concernées de mettre fin à notre contrat à ce stade.</p><p>{{modalites}}</p><p>Je m'engage à respecter toutes les clauses de résiliation telles qu'indiquées dans le contrat et à travailler de manière collaborative pour faciliter une transition en douceur. Je suis disponible pour discuter de cette résiliation plus en détail si nécessaire.</p><p>Veuillez me confirmer la réception de cette lettre de résiliation ainsi que les étapes à suivre pour finaliser la résiliation du contrat.</p><p>Je vous remercie de votre compréhension et vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.</p><p class="signatures">{{expediteur}}</p></div>`,
    popularity: 72,
  },
  {
    code: 'let_reclamation', name: 'Lettre de réclamation', category: 'juridique_admin', price: 400, priceMax: 1000,
    description: 'Lettre de réclamation formelle : produit défectueux, service non conforme, avec demande de réparation et délai de réponse.',
    fieldsJson: F([
      { key: 'expediteur', label: 'Expéditeur (nom + adresse + contacts)', type: 'textarea', required: true },
      { key: 'destinataire', label: 'Destinataire (service client / société + adresse)', type: 'textarea', required: true },
      { key: 'probleme', label: 'Problème ou incident (faits précis, dates, références)', type: 'textarea', required: true },
      { key: 'demarches', label: 'Démarches déjà entreprises (appels, courriers…)', type: 'textarea', required: false },
      { key: 'reparation', label: 'Réparation demandée (remboursement, remplacement…)', type: 'text', required: true },
      { key: 'delai', label: 'Délai de réponse exigé (ex. 14 jours ouvrables)', type: 'text', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p class="align-right">{{ville}}, le {{date_jour}}</p><p><strong>{{expediteur}}</strong></p><p>À : {{destinataire}}</p><p>Objet : <strong>Réclamation</strong></p><p>Madame, Monsieur,</p><p>Je vous écris pour exprimer ma préoccupation concernant le problème suivant : {{probleme}}</p><p>Malgré les démarches suivantes : {{demarches}}, la situation n'a pas été résolue de manière satisfaisante.</p><p>Je vous demande donc : <strong>{{reparation}}</strong>.</p><p>Je m'attends à ce que cette question soit traitée avec la plus grande attention et résolue de manière satisfaisante dans les plus brefs délais. Je vous serais reconnaissant(e) de me fournir une réponse écrite à cette réclamation dans un délai de {{delai}}.</p><p>Je vous remercie de votre attention à cette question et je reste disponible pour discuter de cette réclamation plus en détail si nécessaire.</p><p>Veuillez agréer, Madame, Monsieur, l'expression de mes salutations distinguées.</p><p class="signatures">{{expediteur}}</p></div>`,
    popularity: 60,
  },
  {
    code: 'let_notification_justice', name: 'Notification d’action en justice', category: 'juridique_admin', price: 700, priceMax: 1500,
    description: 'Courrier recommandé informant un débiteur qu’une action en justice est engagée après échec du règlement amiable.',
    fieldsJson: F([
      { key: 'creancier', label: 'Créancier / expéditeur (société + adresse + contacts)', type: 'textarea', required: true },
      { key: 'destinataire', label: 'Débiteur destinataire (nom / société + adresse)', type: 'textarea', required: true },
      { key: 'montant', label: 'Somme exigible (FCFA)', type: 'text', required: true },
      { key: 'date_promesse', label: 'Date de remboursement promise et non honorée', type: 'date', required: true },
      { key: 'signataire', label: 'Signataire (nom + titre)', type: 'text', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p class="align-right">{{ville}}, le {{date_jour}}</p><p><strong>{{creancier}}</strong></p><p>À : {{destinataire}}</p><p>Courrier recommandé avec demande d'accusé de réception</p><p>Objet : <strong>Notification d'une action en justice</strong></p><p>Madame, Monsieur,</p><p>Tous nos efforts pour trouver un règlement à l'amiable dans cette affaire ont échoué. Nous avions préalablement écarté l'action en justice parce que vous nous aviez assuré de votre intention de nous rembourser la somme exigible de <strong>{{montant}} FCFA</strong> au plus tard le {{date_promesse}}. Or, malgré vos vives assurances, vous ne nous avez pas remis la somme en question à la date prévue.</p><p>Nous vous informons donc que nous n'avons pas d'autre choix que de vous poursuivre en justice.</p><p>Nous transférons votre dossier à notre avocat. Tout en regrettant la nécessité d'une telle action, nous devons vous demander de prendre vos dispositions en conséquence.</p><p>Recevez, Madame, Monsieur, nos salutations distinguées.</p><p class="signatures">{{signataire}}<br/>{{creancier}}</p></div>`,
    popularity: 38,
  },

  // ════════════════════════ COMMERCIAL & FINANCIER ════════════════════════
  {
    code: 'let_relance', name: 'Lettre de relance (demande sans réponse)', category: 'commercial_financier', price: 300, priceMax: 800,
    description: 'Lettre de relance courtoise après un courrier, un devis ou une proposition restés sans réponse.',
    fieldsJson: F([
      { key: 'expediteur', label: 'Expéditeur (nom + poste + coordonnées)', type: 'textarea', required: true },
      { key: 'destinataire', label: 'Destinataire (nom + société)', type: 'text', required: true },
      { key: 'objet_initial', label: 'Objet du précédent message (devis, proposition, réunion…)', type: 'text', required: true },
      { key: 'date_envoi', label: 'Date du précédent message', type: 'date', required: true },
      { key: 'enjeu', label: 'Pourquoi une réponse est importante à ce stade', type: 'textarea', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p class="align-right">{{ville}}, le {{date_jour}}</p><p><strong>{{expediteur}}</strong></p><p>À : {{destinataire}}</p><p>Objet : <strong>Relance concernant {{objet_initial}}</strong></p><p>Madame, Monsieur,</p><p>J'espère que vous allez bien. Je me permets de vous écrire de nouveau concernant {{objet_initial}}, que je vous avais adressé(e) le {{date_envoi}}.</p><p>Comme je n'ai pas encore eu l'occasion de recevoir votre retour, je voulais m'assurer que mon précédent message vous a bien été transmis et qu'il n'a pas échappé à votre attention.</p><p>Je comprends parfaitement que vous puissiez être occupé(e), mais une réponse est importante pour nous à ce stade : {{enjeu}}</p><p>Je vous serais reconnaissant(e) de bien vouloir prendre un moment pour me faire part de votre réponse ou, si nécessaire, de m'indiquer un délai dans lequel nous pourrions attendre votre retour. Si vous avez besoin de plus d'informations ou si une discussion serait préférable, je suis à votre disposition pour convenir d'un appel ou d'une réunion à votre convenance.</p><p>Je vous remercie par avance pour votre attention à cette relance et reste dans l'attente de votre retour.</p><p>Cordialement,</p><p class="signatures">{{expediteur}}</p></div>`,
    popularity: 58,
  },
  {
    code: 'let_relance_client_inactif', name: 'Lettre de relance d’un client inactif', category: 'commercial_financier', price: 400, priceMax: 1000,
    description: 'Lettre commerciale pour reconquérir un client qui n’achète plus : nouveautés, avantages et proposition de contact.',
    fieldsJson: F([
      { key: 'entreprise', label: 'Votre entreprise (nom + adresse + contacts)', type: 'textarea', required: true },
      { key: 'client', label: 'Client (nom + adresse)', type: 'textarea', required: true },
      { key: 'duree_inactivite', label: 'Durée d’inactivité (ex. 2 ans)', type: 'text', required: true },
      { key: 'ameliorations', label: 'Nouveautés et améliorations de vos services / offres', type: 'textarea', required: true },
      { key: 'signataire', label: 'Signataire (nom + titre)', type: 'text', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p class="align-right">{{ville}}, le {{date_jour}}</p><p><strong>{{entreprise}}</strong></p><p>À : {{client}}</p><p>Objet : <strong>Nous serons heureux de vous servir à nouveau</strong></p><p>Madame, Monsieur,</p><p>Nous regrettons que votre nom ne figure plus parmi ceux de nos clients depuis {{duree_inactivite}}. Si vous avez rencontré un problème avec nos produits ou services, c'est avec plaisir que nous y remédierons.</p><p>Nous avons développé et amélioré nos offres récemment, et nos prix sont restés très compétitifs : {{ameliorations}}</p><p>Nous vous contacterons dès la semaine prochaine pour voir dans quelle mesure nous pourrions répondre à vos questions au sujet de nos nouveaux services. Nous serions heureux de vous accueillir à nouveau parmi nos clients.</p><p>Recevez, Madame, Monsieur, nos salutations distinguées.</p><p class="signatures">{{signataire}}<br/>{{entreprise}}</p></div>`,
    popularity: 46,
  },
  {
    code: 'let_voeux_clients', name: 'Lettre de vœux et remerciements aux clients', category: 'commercial_financier', price: 200, priceMax: 600,
    description: 'Lettre de fin d’année pour remercier vos clients de leur fidélité et leur présenter vos meilleurs vœux.',
    fieldsJson: F([
      { key: 'entreprise', label: 'Votre entreprise (nom + adresse + contacts)', type: 'textarea', required: true },
      { key: 'client', label: 'Client destinataire (nom + adresse)', type: 'textarea', required: true },
      { key: 'message_personnalise', label: 'Message personnalisé (bilan de l’année, offre spéciale…)', type: 'textarea', required: false },
      { key: 'signataire', label: 'Signataire (nom + titre)', type: 'text', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p class="align-right">{{ville}}, le {{date_jour}}</p><p><strong>{{entreprise}}</strong></p><p>À : {{client}}</p><p>Objet : <strong>Présentation de nos vœux et remerciements</strong></p><p>Madame, Monsieur,</p><p>Nous sommes toujours heureux quand la période de présentation des vœux approche, car ces merveilleux moments de fêtes nous offrent l'opportunité de remercier tous nos amis et partenaires.</p><p>Nous avons passé une excellente année et nous vous remercions de nous avoir été fidèle et de nous avoir permis de vous servir.</p><p>{{message_personnalise}}</p><p><strong>NOS MEILLEURS VŒUX !</strong></p><p>Recevez, Madame, Monsieur, nos salutations distinguées.</p><p class="signatures">{{signataire}}<br/>{{entreprise}}</p></div>`,
    popularity: 40,
  },
  {
    code: 'let_prolongation_contrat', name: 'Lettre de prolongation de contrat', category: 'commercial_financier', price: 400, priceMax: 1000,
    description: 'Notification d’exercice de l’option de renouvellement / prolongation d’un contrat de service ou de fourniture.',
    fieldsJson: F([
      { key: 'expediteur', label: 'Expéditeur (société + adresse + contacts)', type: 'textarea', required: true },
      { key: 'destinataire', label: 'Destinataire (nom / société + adresse)', type: 'textarea', required: true },
      { key: 'contrat', label: 'Contrat concerné (type de service ou produit)', type: 'text', required: true },
      { key: 'duree_prolongation', label: 'Durée de la prolongation (ex. 12 mois)', type: 'text', required: true },
      { key: 'date_effet', label: 'Date de prise d’effet du renouvellement', type: 'date', required: true },
      { key: 'signataire', label: 'Signataire (nom + titre)', type: 'text', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p class="align-right">{{ville}}, le {{date_jour}}</p><p><strong>{{expediteur}}</strong></p><p>À : {{destinataire}}</p><p>Objet : <strong>Notification d'exercice d'option de prolongation de contrat</strong></p><p>Madame, Monsieur,</p><p>Notre contrat de {{contrat}} prévoit une option de renouvellement d'une durée de <strong>{{duree_prolongation}}</strong>.</p><p>Par la présente, nous vous notifions notre décision d'exercer cette option : le contrat est donc renouvelé à compter du {{date_effet}}, aux mêmes conditions, pour la durée indiquée ci-dessus.</p><p>Nous restons à votre disposition pour tout échange relatif à la poursuite de notre collaboration.</p><p>Recevez, Madame, Monsieur, nos salutations distinguées.</p><p class="signatures">{{signataire}}<br/>{{expediteur}}</p></div>`,
    popularity: 44,
  },
  {
    code: 'let_excuses_pro', name: 'Lettre d’excuses professionnelles', category: 'commercial_financier', price: 300, priceMax: 800,
    description: 'Lettre d’excuses sincères à un client ou partenaire après une erreur, un retard ou un service non conforme.',
    fieldsJson: F([
      { key: 'expediteur', label: 'Expéditeur (nom + fonction + société + contacts)', type: 'textarea', required: true },
      { key: 'destinataire', label: 'Destinataire (nom + société + adresse)', type: 'textarea', required: true },
      { key: 'faits', label: 'Erreur ou incident pour lequel vous vous excusez', type: 'textarea', required: true },
      { key: 'impact', label: 'Personnes ou activités affectées', type: 'text', required: true },
      { key: 'mesures', label: 'Mesures correctives prises ou prévues (facultatif)', type: 'textarea', required: false },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p class="align-right">{{ville}}, le {{date_jour}}</p><p><strong>{{expediteur}}</strong></p><p>À : {{destinataire}}</p><p>Objet : <strong>Excuses sincères</strong></p><p>Madame, Monsieur,</p><p>Je vous écris pour présenter mes excuses les plus sincères pour : {{faits}}</p><p>Je reconnais pleinement que ces faits ont eu un impact négatif sur {{impact}}.</p><p>Je comprends l'importance de maintenir des normes élevées de professionnalisme et de qualité dans notre travail, et je regrette profondément de ne pas avoir respecté ces normes dans cette situation particulière.</p><p>{{mesures}}</p><p>Je m'engage à apprendre de cette expérience et à faire tout mon possible pour regagner votre confiance. Je vous assure que cela ne se reproduira pas à l'avenir.</p><p>Je vous remercie de votre compréhension et de votre indulgence.</p><p>Veuillez agréer, Madame, Monsieur, l'expression de mes plus sincères excuses.</p><p class="signatures">{{expediteur}}</p></div>`,
    popularity: 48,
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

  console.log('✅ Seed lettres professionnelles (Drive) terminé.');
  console.log(`   Templates du script : ${templates.length} (créés : ${created}, mis à jour : ${updated})`);
  console.log('   Répartition par catégorie (ce script) :');
  for (const [cat, n] of Object.entries(byCategory)) console.log(`     - ${cat} : ${n}`);
  console.log(`   ➜ Total de templates en base : ${total}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
