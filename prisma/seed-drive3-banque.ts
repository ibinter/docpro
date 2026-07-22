// Seed Drive3 Banque — Agent Drive3-1/10 : PASSE PROFONDE n°2 sur le dossier BANQUE
// du kit Google Drive IBI079 « 200 modèles de contrat pour le secteur Banque & Assurance ».
// 25 templates (dont 6 fusions de variantes quasi identiques — voir commentaires).
// Script ADDITIF : upsert par code — n'écrase aucun template existant.
// Exécution : npx tsx prisma/seed-drive3-banque.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type DriveTemplate = {
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

const templates: DriveTemplate[] = [
  // ════════════════════ CRÉDIT & OPÉRATIONS DE MARCHÉ ════════════════════
  {
    code: 'bank_syndication_credit',
    name: 'Contrat de syndication de crédit',
    category: 'commercial_financier',
    price: 5000, priceMax: 6000,
    description: 'Contrat entre une banque mandatée (arrangeur) et des banques syndiquées pour la mise en place d’un crédit syndiqué au profit d’un client : rôle du chef de file, quotes-parts, responsabilités et conditions générales de la syndication.',
    fieldsJson: F([
      { key: 'banque_mandatee', label: 'Banque mandatée / chef de file (raison sociale, n° d’enregistrement, adresse du siège, représentant légal et titre)', type: 'textarea', required: true },
      { key: 'banques_syndiquees', label: 'Banques syndiquées (liste : raisons sociales, n° d’enregistrement, sièges, représentants légaux et titres)', type: 'textarea', required: true },
      { key: 'client', label: 'Client bénéficiaire du crédit syndiqué (nom / société)', type: 'text', required: true },
      { key: 'juridiction', label: 'Juridiction compétente en cas de litige', type: 'text', required: true },
      { key: 'langue', label: 'Langue du contrat', type: 'text', required: true },
      { key: 'ville', label: 'Ville / lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE SYNDICATION DE CRÉDIT</h1><p><strong>Entre :</strong> {{banque_mandatee}}, agissant en vertu des pouvoirs qui lui sont conférés, ci-après dénommée « la Banque Mandatée »,</p><p><strong>Et :</strong> {{banques_syndiquees}}, agissant conjointement et solidairement, ci-après dénommées « les Banques Syndiquées »,</p><p>Ci-après collectivement dénommées « les Parties ».</p><p>Il est convenu ce qui suit :</p><h2>Article 1 — Objet du contrat</h2><p>1.1 La Banque Mandatée agira en tant que mandataire et coordonnera la syndication du crédit octroyé à <strong>{{client}}</strong> (« le Client ») conformément aux termes et conditions de ce contrat.</p><p>1.2 Les Banques Syndiquées acceptent de participer à la syndication du crédit selon les termes convenus dans ce contrat.</p><h2>Article 2 — Montant du crédit et conditions de syndication</h2><p>2.1 Le montant total du crédit, ainsi que les modalités de sa répartition entre les Banques Syndiquées, sont définis dans l'accord de syndication annexé à ce contrat.</p><p>2.2 Chaque Banque Syndiquée s'engage à fournir sa part respective du crédit conformément aux conditions convenues.</p><h2>Article 3 — Responsabilités de la Banque Mandatée</h2><p>3.1 La Banque Mandatée sera responsable de la coordination de la syndication, y compris la communication avec les Banques Syndiquées, la collecte des fonds et la distribution des paiements au Client.</p><p>3.2 La Banque Mandatée s'engage à agir dans le meilleur intérêt du Client et à respecter les instructions émises par celui-ci, sous réserve des termes convenus dans ce contrat.</p><h2>Article 4 — Responsabilités des Banques Syndiquées</h2><p>4.1 Chaque Banque Syndiquée est responsable de fournir sa part du crédit conformément aux termes de l'accord de syndication.</p><p>4.2 Les Banques Syndiquées s'engagent à respecter les dispositions de ce contrat et à coopérer avec la Banque Mandatée pour assurer une syndication efficace.</p><h2>Article 5 — Conditions générales</h2><p>Les conditions générales de la syndication, y compris les taux d'intérêt, les échéances de remboursement, les garanties et autres termes financiers, sont détaillées dans l'accord de syndication annexé à ce contrat.</p><h2>Article 6 — Loi applicable et règlement des litiges</h2><p>Ce contrat est régi par les lois en vigueur dans l'Espace OHADA. Tout litige découlant de ce contrat sera soumis à la juridiction exclusive des tribunaux compétents de {{juridiction}}.</p><p class="signatures">Fait en deux exemplaires originaux, en {{langue}}, à {{ville}}, le {{date_jour}}<br/><br/>Pour la Banque Mandatée — Pour les Banques Syndiquées<br/>Signature du représentant légal de la Banque Mandatée — Signature des représentants légaux des Banques Syndiquées<br/>Nom du représentant légal de la Banque Mandatée — Noms des représentants légaux des Banques Syndiquées</p></div>`,
    popularity: 30,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Crédits syndiqués régis par la loi bancaire UMOA et les instructions BCEAO ; les sûretés du pool bancaire peuvent être gérées par un agent des sûretés (Acte uniforme OHADA sur les sûretés, art. 5 s.).' },
      FR: { note: 'Pas de régime légal spécifique : montage contractuel fondé sur le mandat (Code civil, art. 1984 s.) et le Code monétaire et financier ; pratique de place inspirée des modèles LMA.' },
    }),
  },
  {
    code: 'bank_emission_lettre_credit',
    name: 'Contrat d’émission de lettre de crédit (crédit documentaire)',
    category: 'commercial_financier',
    price: 4000, priceMax: 6000,
    description: 'Contrat par lequel une banque émettrice s’engage à émettre une lettre de crédit en faveur d’un bénéficiaire : description de la lettre de crédit, conditions documentaires, engagement de paiement, obligations du bénéficiaire et frais.',
    fieldsJson: F([
      { key: 'banque_emettrice', label: 'Banque émettrice (raison sociale, n° d’enregistrement, adresse du siège, représentant légal et titre)', type: 'textarea', required: true },
      { key: 'beneficiaire', label: 'Bénéficiaire (nom, statut personne physique/morale, nationalité, adresse ou siège)', type: 'textarea', required: true },
      { key: 'montant', label: 'Montant garanti par la lettre de crédit (avec la devise)', type: 'text', required: true },
      { key: 'langue', label: 'Langue du contrat', type: 'text', required: true },
      { key: 'ville', label: 'Ville / lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT D'ÉMISSION DE LETTRE DE CRÉDIT</h1><p><strong>Entre :</strong> {{banque_emettrice}}, agissant en vertu des pouvoirs qui lui sont conférés, ci-après dénommée « la Banque Émettrice », d'une part,</p><p><strong>Et :</strong> {{beneficiaire}}, ci-après dénommé « le Bénéficiaire », d'autre part.</p><p>Il est convenu ce qui suit :</p><h2>Article 1 — Objet du contrat</h2><p>La Banque Émettrice s'engage à émettre une lettre de crédit en faveur du Bénéficiaire conformément aux termes et conditions énoncés dans le présent contrat.</p><h2>Article 2 — Description de la lettre de crédit</h2><p>La lettre de crédit émise par la Banque Émettrice garantira le paiement d'un montant de <strong>{{montant}}</strong> au Bénéficiaire, sous réserve de la présentation de documents conformes aux conditions stipulées dans la lettre de crédit.</p><h2>Article 3 — Conditions de la lettre de crédit</h2><p>Les conditions de la lettre de crédit, y compris le montant, la durée de validité, les documents exigés pour le paiement, les modalités de présentation et les frais applicables, seront définies dans un instrument séparé annexé au présent contrat, intitulé « Conditions de la Lettre de Crédit ».</p><h2>Article 4 — Engagement de paiement</h2><p>La Banque Émettrice garantit le paiement du montant spécifié dans la lettre de crédit dès réception des documents conformes et conformément aux termes de ladite lettre de crédit.</p><h2>Article 5 — Obligations du Bénéficiaire</h2><p>Le Bénéficiaire s'engage à respecter les conditions énoncées dans la lettre de crédit et à présenter tous les documents requis de manière complète et conforme aux exigences de la lettre de crédit.</p><h2>Article 6 — Frais et commission</h2><p>Les frais et commissions relatifs à l'émission et à la gestion de la lettre de crédit seront supportés par le Bénéficiaire, conformément aux tarifs en vigueur de la Banque Émettrice.</p><h2>Article 7 — Loi applicable</h2><p>Ce contrat est régi et interprété conformément aux lois en vigueur dans l'Espace OHADA.</p><p class="signatures">Fait en deux exemplaires originaux, en {{langue}}, à {{ville}}, le {{date_jour}}<br/><br/>Pour la Banque Émettrice — Pour le Bénéficiaire<br/>Signature du représentant légal de la Banque Émettrice — Signature du Bénéficiaire<br/>Nom du représentant légal de la Banque Émettrice — Nom du Bénéficiaire</p></div>`,
    popularity: 35,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Crédit documentaire pratiqué sous l’empire des Règles et Usances Uniformes de la CCI (RUU 600) auxquelles renvoient les banques de l’UMOA ; opération soumise à la réglementation des relations financières extérieures de l’UEMOA.' },
      FR: { note: 'Pas de texte légal dédié : le crédit documentaire est régi par les RUU 600 de la CCI incorporées au contrat et par le droit commun du Code civil.' },
    }),
  },
  {
    code: 'bank_swap',
    name: 'Contrat de swap (échange de flux financiers)',
    category: 'commercial_financier',
    price: 4500, priceMax: 6000,
    description: 'Contrat de swap entre deux parties pour l’échange périodique de flux financiers indexés sur des références différentes (taux fixe/variable, change, indice) : modalités de l’échange, durée, conditions de paiement, cession et résiliation.',
    fieldsJson: F([
      { key: 'partie_a', label: 'Partie A (société, n° d’enregistrement, adresse du siège, représentant légal et titre)', type: 'textarea', required: true },
      { key: 'partie_b', label: 'Partie B (société, n° d’enregistrement, adresse du siège, représentant légal et titre)', type: 'textarea', required: true },
      { key: 'duree', label: 'Durée du contrat de swap (ex. 5 ans)', type: 'text', required: true },
      { key: 'juridiction', label: 'Juridiction compétente en cas de différend', type: 'text', required: true },
      { key: 'langue', label: 'Langue du contrat', type: 'text', required: true },
      { key: 'ville', label: 'Ville / lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE SWAP</h1><p><strong>Entre :</strong> {{partie_a}}, agissant en vertu des pouvoirs qui lui sont conférés, ci-après dénommée « la Partie A », d'une part,</p><p><strong>Et :</strong> {{partie_b}}, agissant en vertu des pouvoirs qui lui sont conférés, ci-après dénommée « la Partie B », d'autre part.</p><p>Ensemble désignées comme « les Parties ».</p><h2>Article 1 — Objet du contrat</h2><p>Les Parties conviennent d'établir un contrat de swap pour échanger des flux financiers sur une base périodique conformément aux termes et conditions énoncés dans le présent contrat.</p><h2>Article 2 — Modalités de l'échange</h2><p>1. La Partie A s'engage à payer à la Partie B un montant déterminé à des intervalles convenus, basé sur un taux d'intérêt fixe ou variable, un taux de change, un indice boursier ou toute autre référence définie dans le contrat.</p><p>2. En contrepartie, la Partie B s'engage à payer à la Partie A un montant équivalent à des intervalles convenus, basé sur une référence différente de celle définie pour les paiements de la Partie A.</p><h2>Article 3 — Durée du contrat</h2><p>La durée du contrat de swap est définie comme <strong>{{duree}}</strong> à compter de la date de signature du présent contrat, sauf résiliation anticipée conforme aux dispositions de l'article 6.</p><h2>Article 4 — Conditions de paiement</h2><p>Les modalités de paiement, y compris les montants, les dates d'échéance, les taux applicables et les méthodes de calcul, seront spécifiées dans un instrument séparé annexé au présent contrat, intitulé « Conditions du Swap ».</p><h2>Article 5 — Cession et sous-traitance</h2><p>Aucune des Parties ne peut céder ni sous-traiter les droits et obligations découlant du présent contrat sans le consentement écrit préalable de l'autre Partie.</p><h2>Article 6 — Résiliation</h2><p>En cas de défaut ou de manquement d'une des Parties à ses obligations en vertu du présent contrat, l'autre Partie a le droit de résilier le contrat de swap par notification écrite à la partie défaillante.</p><h2>Article 7 — Loi applicable et règlement des différends</h2><p>Ce contrat est régi par les lois en vigueur dans l'Espace OHADA. Tout différend découlant de ce contrat sera soumis à la juridiction exclusive des tribunaux compétents de {{juridiction}}.</p><p class="signatures">Fait en deux exemplaires originaux, en {{langue}}, à {{ville}}, le {{date_jour}}<br/><br/>Pour la Partie A — Pour la Partie B<br/>Signature du représentant légal de la Partie A — Signature du représentant légal de la Partie B<br/>Nom du représentant légal de la Partie A — Nom du représentant légal de la Partie B</p></div>`,
    popularity: 22,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Instruments dérivés de gré à gré non spécifiquement réglementés dans l’UEMOA : liberté contractuelle sous réserve de la réglementation des changes et de la loi bancaire UMOA pour les établissements de crédit.' },
      FR: { note: 'Contrats financiers définis à l’art. L.211-1 III du Code monétaire et financier ; conventions-cadres de place (FBF, ISDA) et résiliation-compensation reconnues par l’art. L.211-36-1.' },
    }),
  },
  {
    code: 'bank_titrisation',
    name: 'Contrat de titrisation d’actifs',
    category: 'commercial_financier',
    price: 5000, priceMax: 6000,
    description: 'Convention entre une société de titrisation et une société émettrice pour la cession d’actifs à titriser : description des actifs, modalités et prix de cession, obligations des parties et conformité réglementaire.',
    fieldsJson: F([
      { key: 'societe_titrisation', label: 'Société de titrisation (n° d’enregistrement, adresse du siège, représentant légal et titre)', type: 'textarea', required: true },
      { key: 'societe_emettrice', label: 'Société émettrice / cédante (n° d’enregistrement, adresse du siège, représentant légal et titre)', type: 'textarea', required: true },
      { key: 'actifs', label: 'Description sommaire des actifs à titriser (facultatif — détail dans la « Liste des Actifs à Titriser » annexée)', type: 'textarea', required: false },
      { key: 'langue', label: 'Langue du contrat', type: 'text', required: true },
      { key: 'ville', label: 'Ville / lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE TITRISATION</h1><p><strong>Entre :</strong> {{societe_titrisation}}, agissant en vertu des pouvoirs qui lui sont conférés, ci-après dénommée « la Société de Titrisation », d'une part,</p><p><strong>Et :</strong> {{societe_emettrice}}, agissant en vertu des pouvoirs qui lui sont conférés, ci-après dénommée « la Société Émettrice », d'autre part.</p><p>Il est convenu ce qui suit :</p><h2>Article 1 — Objet du contrat</h2><p>La présente convention a pour objet de régir les modalités de titrisation des actifs détenus par la Société Émettrice au profit de la Société de Titrisation.</p><h2>Article 2 — Description des actifs à titriser</h2><p>La Société Émettrice s'engage à céder à la Société de Titrisation les actifs définis dans un document annexé au présent contrat, intitulé « Liste des Actifs à Titriser », qui fait partie intégrante de la présente convention. {{actifs}}</p><h2>Article 3 — Modalités de cession des actifs</h2><p>La cession des actifs s'effectuera conformément aux dispositions légales en vigueur dans l'Espace OHADA régissant la titrisation, notamment en ce qui concerne la notification des créanciers, la publicité des actes et la transmission des droits afférents aux actifs cédés.</p><h2>Article 4 — Prix de cession</h2><p>Le prix de cession des actifs sera déterminé d'un commun accord entre les parties et consigné dans un document annexé au présent contrat, intitulé « Modalités Financières de la Titrisation ».</p><h2>Article 5 — Obligations de la Société de Titrisation</h2><p>La Société de Titrisation s'engage à respecter les obligations légales et réglementaires applicables à la titrisation des actifs, notamment en ce qui concerne la gestion des actifs cédés, la distribution des titres émis et la communication aux investisseurs.</p><h2>Article 6 — Obligations de la Société Émettrice</h2><p>La Société Émettrice garantit à la Société de Titrisation la propriété et la qualité des actifs cédés, ainsi que la conformité de la cession avec les dispositions légales et réglementaires en vigueur.</p><h2>Article 7 — Loi applicable</h2><p>Ce contrat est régi et interprété conformément aux lois en vigueur dans l'Espace OHADA.</p><p class="signatures">Fait en deux exemplaires originaux, en {{langue}}, à {{ville}}, le {{date_jour}}<br/><br/>Pour la Société de Titrisation — Pour la Société Émettrice<br/>Signature du représentant légal de la Société de Titrisation — Signature du représentant légal de la Société Émettrice<br/>Nom du représentant légal de la Société de Titrisation — Nom du représentant légal de la Société Émettrice</p></div>`,
    popularity: 18,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Titrisation régie dans l’UEMOA par le Règlement n°02/2010/CM/UEMOA relatif aux fonds communs de titrisation de créances et aux opérations de titrisation, sous le contrôle de l’AMF-UMOA (ex-CREPMF).' },
      FR: { note: 'Code monétaire et financier, art. L.214-166-1 s. — organismes de financement et fonds communs de titrisation ; cession des créances par simple bordereau.' },
    }),
  },
  {
    code: 'bank_change',
    name: 'Contrat de change (opérations sur devises)',
    category: 'commercial_financier',
    price: 3000, priceMax: 5000,
    description: 'Contrat régissant les opérations de change entre une banque et son client : instructions de change, devises concernées, taux et commissions, modalités de paiement, responsabilités et confidentialité.',
    fieldsJson: F([
      { key: 'banque', label: 'Banque (raison sociale, n° d’enregistrement, adresse du siège, représentant légal et titre)', type: 'textarea', required: true },
      { key: 'client', label: 'Client (nom, statut personne physique/morale, nationalité, adresse ou siège)', type: 'textarea', required: true },
      { key: 'juridiction', label: 'Juridiction compétente en cas de litige', type: 'text', required: true },
      { key: 'langue', label: 'Langue du contrat', type: 'text', required: true },
      { key: 'ville', label: 'Ville / lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE CHANGE</h1><p><strong>Entre :</strong> {{banque}}, agissant en vertu des pouvoirs qui lui sont conférés, ci-après dénommée « la Banque », d'une part,</p><p><strong>Et :</strong> {{client}}, ci-après dénommé « le Client », d'autre part.</p><p>Il est convenu ce qui suit :</p><h2>Article 1 — Objet du contrat</h2><p>Le présent contrat a pour objet de régir les opérations de change effectuées entre la Banque et le Client, conformément aux lois et réglementations en vigueur.</p><h2>Article 2 — Opérations de change</h2><p>La Banque s'engage à effectuer des opérations de change pour le compte du Client, conformément aux instructions données par ce dernier et aux taux de change en vigueur au moment de chaque transaction.</p><h2>Article 3 — Devises concernées</h2><p>Les devises concernées par les opérations de change seront spécifiées dans chaque instruction de change fournie par le Client à la Banque.</p><h2>Article 4 — Conditions de change</h2><p>Les conditions de change, y compris les taux de change applicables, les frais et commissions, seront déterminées par la Banque et communiquées au Client au moment de chaque transaction.</p><h2>Article 5 — Modalités de paiement</h2><p>Le paiement des montants échangés sera effectué conformément aux instructions du Client, soit par crédit sur le compte bancaire désigné par le Client, soit par tout autre moyen convenu entre les parties.</p><h2>Article 6 — Responsabilités du Client</h2><p>Le Client est responsable de fournir des instructions précises et complètes à la Banque pour chaque opération de change, ainsi que de respecter les lois et réglementations applicables en matière de change.</p><h2>Article 7 — Confidentialité</h2><p>Les informations échangées entre la Banque et le Client dans le cadre de ce contrat sont confidentielles et ne peuvent être divulguées à des tiers sans le consentement écrit préalable de la partie concernée.</p><h2>Article 8 — Loi applicable et règlement des litiges</h2><p>Ce contrat est régi et interprété conformément aux lois en vigueur dans l'Espace OHADA. Tout litige découlant de ce contrat sera soumis à la juridiction exclusive des tribunaux compétents de {{juridiction}}.</p><p class="signatures">Fait en deux exemplaires originaux, en {{langue}}, à {{ville}}, le {{date_jour}}<br/><br/>Pour la Banque — Pour le Client<br/>Signature du représentant légal de la Banque — Signature du Client<br/>Nom du représentant légal de la Banque — Nom du Client</p></div>`,
    popularity: 28,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Opérations de change soumises au Règlement n°09/2010/CM/UEMOA relatif aux relations financières extérieures des États membres de l’UEMOA ; les banques agréées sont intermédiaires habilités ; parité fixe FCFA/euro.' },
      FR: { note: 'Liberté des changes ; les prestataires de services de change manuel sont soumis à autorisation de l’ACPR (Code monétaire et financier, art. L.524-1 s.).' },
    }),
  },
  {
    code: 'bank_operation_pension',
    name: 'Contrat d’opération de pension (gestion de fonds de pension)',
    category: 'commercial_financier',
    price: 3000, priceMax: 5000,
    description: 'Contrat entre une société de gestion de fonds de pension et un participant : ouverture du compte de pension, contributions, gestion des investissements, reporting, frais de gestion et modalités de liquidation.',
    fieldsJson: F([
      { key: 'societe_gestion', label: 'Société de gestion de fonds de pension (n° d’enregistrement, adresse du siège, représentant légal et titre)', type: 'textarea', required: true },
      { key: 'participant', label: 'Participant (nom, n° d’identification, adresse de résidence)', type: 'textarea', required: true },
      { key: 'preavis', label: 'Délai de préavis de résiliation', type: 'text', required: true },
      { key: 'langue', label: 'Langue du contrat', type: 'text', required: true },
      { key: 'ville', label: 'Ville / lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT D'OPÉRATION DE PENSION</h1><p><strong>Entre :</strong> {{societe_gestion}}, agissant en vertu des pouvoirs qui lui sont conférés, ci-après dénommée « la Société de Gestion », d'une part,</p><p><strong>Et :</strong> {{participant}}, ci-après dénommé « le Participant », d'autre part.</p><p>Il est convenu ce qui suit :</p><h2>Article 1 — Objet du contrat</h2><p>La Société de Gestion s'engage à administrer et à gérer les fonds de pension du Participant conformément aux termes et conditions énoncés dans le présent contrat.</p><h2>Article 2 — Compte de pension</h2><p>La Société de Gestion ouvrira un compte de pension au nom du Participant dans le cadre du régime de pension, dans lequel seront investis les fonds de pension du Participant conformément à ses instructions.</p><h2>Article 3 — Contributions</h2><p>Le Participant s'engage à effectuer des contributions régulières au régime de pension conformément aux modalités convenues entre les parties.</p><h2>Article 4 — Gestion des investissements</h2><p>La Société de Gestion est autorisée à investir les fonds de pension du Participant dans des instruments financiers conformes à la réglementation en vigueur et aux directives du Participant.</p><h2>Article 5 — Reporting et communication</h2><p>La Société de Gestion fournira au Participant des rapports réguliers sur la performance de son compte de pension et le tiendra informé de tout changement significatif affectant ses investissements.</p><h2>Article 6 — Frais de gestion</h2><p>Le Participant versera à la Société de Gestion des frais de gestion, dont le montant et les modalités de paiement seront spécifiés dans un tarif annexé au présent contrat.</p><h2>Article 7 — Durée du contrat</h2><p>Le présent contrat entre en vigueur à la date de signature et reste en vigueur pour une durée indéterminée, sauf résiliation par l'une ou l'autre des parties moyennant un préavis écrit de {{preavis}}.</p><h2>Article 8 — Résiliation</h2><p>En cas de résiliation anticipée du contrat par l'une ou l'autre des parties, les modalités de liquidation du compte de pension seront déterminées conformément aux dispositions du règlement du régime de pension.</p><h2>Article 9 — Loi applicable</h2><p>Ce contrat est régi et interprété conformément aux lois en vigueur dans l'Espace OHADA.</p><p class="signatures">Fait en deux exemplaires originaux, en {{langue}}, à {{ville}}, le {{date_jour}}<br/><br/>Pour la Société de Gestion — Pour le Participant<br/>Signature du représentant légal de la Société de Gestion — Signature du Participant<br/>Nom du représentant légal de la Société de Gestion — Nom du Participant</p></div>`,
    popularity: 20,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Régimes complémentaires de pension par capitalisation encadrés par les législations nationales et la Conférence Interafricaine de la Prévoyance Sociale (CIPRES) pour les organismes de prévoyance.' },
      FR: { note: 'Plans d’épargne retraite régis par la loi PACTE (Code monétaire et financier, art. L.224-1 s.) ; gestion réservée aux entreprises agréées.' },
    }),
  },

  // ════════════════════ GESTION D'ACTIFS & INVESTISSEMENT ════════════════════
  {
    // FUSION : « Contrat de Gestion de Patrimoine » + « Contrat de Gestion de Fortune »
    // (structures quasi identiques — champ select type_gestion).
    code: 'bank_gestion_patrimoine',
    name: 'Contrat de gestion de patrimoine / gestion de fortune',
    category: 'commercial_financier',
    price: 4000, priceMax: 6000,
    description: 'Contrat par lequel une société de gestion assure la gestion du patrimoine ou de la fortune d’un client : analyse de la situation financière, mandat de gestion, stratégie personnalisée, objectifs d’investissement, reporting et honoraires.',
    fieldsJson: F([
      { key: 'type_gestion', label: 'Type de mandat', type: 'select', required: true, options: ['GESTION DE PATRIMOINE', 'GESTION DE FORTUNE'] },
      { key: 'societe_gestion', label: 'Société de gestion (n° d’enregistrement, adresse du siège, représentant légal et titre)', type: 'textarea', required: true },
      { key: 'client', label: 'Client (nom, statut personne physique/morale, nationalité, adresse ou siège)', type: 'textarea', required: true },
      { key: 'preavis', label: 'Délai de préavis de résiliation', type: 'text', required: true },
      { key: 'langue', label: 'Langue du contrat', type: 'text', required: true },
      { key: 'ville', label: 'Ville / lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE {{type_gestion}}</h1><p><strong>Entre :</strong> {{societe_gestion}}, agissant en vertu des pouvoirs qui lui sont conférés, ci-après dénommée « la Société de Gestion », d'une part,</p><p><strong>Et :</strong> {{client}}, ci-après dénommé « le Client », d'autre part.</p><p>Il est convenu ce qui suit :</p><h2>Article 1 — Objet du contrat</h2><p>La Société de Gestion s'engage à gérer les avoirs financiers et patrimoniaux du Client conformément aux instructions spécifiques et aux objectifs d'investissement convenus entre les parties.</p><h2>Article 2 — Mandat et description des services</h2><p>Le Client confie à la Société de Gestion un mandat de gestion de son patrimoine financier. Les services incluent, mais ne se limitent pas à :</p><p>1. Analyse de la situation financière du Client.<br/>2. Développement d'une stratégie de gestion personnalisée.<br/>3. Gestion active des actifs financiers du Client, incluant la répartition des actifs et la gestion des risques.<br/>4. Conseils en investissement et allocation d'actifs.<br/>5. Suivi régulier de la performance du portefeuille du Client.<br/>6. Reporting financier périodique au Client.</p><h2>Article 3 — Objectifs d'investissement</h2><p>Les objectifs d'investissement du Client, y compris les rendements attendus, les contraintes de liquidité et les préférences en matière de risque, sont définis dans un document annexé au présent contrat, intitulé « Profil d'Investisseur ».</p><h2>Article 4 — Responsabilités de la Société de Gestion</h2><p>La Société de Gestion s'engage à agir dans le meilleur intérêt du Client et à exercer ses fonctions avec le degré de diligence, de compétence et de soin requis par les normes professionnelles en vigueur. Elle est autorisée à prendre toutes les décisions nécessaires à la gestion efficace du patrimoine financier du Client, dans le respect des objectifs d'investissement convenus et des lois et réglementations en vigueur.</p><h2>Article 5 — Responsabilités du Client</h2><p>Le Client s'engage à fournir à la Société de Gestion toutes les informations pertinentes nécessaires à la gestion efficace de son patrimoine. Le Client reconnaît que toutes les décisions d'investissement sont prises à ses propres risques.</p><h2>Article 6 — Confidentialité</h2><p>Les parties conviennent de maintenir la confidentialité de toutes les informations et documents échangés dans le cadre de ce contrat, sauf dans les cas où la divulgation est requise par la loi.</p><h2>Article 7 — Honoraires</h2><p>Les honoraires et commissions de la Société de Gestion pour les services rendus seront convenus entre les parties et spécifiés dans un document distinct intitulé « Frais et Commission ».</p><h2>Article 8 — Durée du contrat</h2><p>Ce contrat entre en vigueur à la date de sa signature par les deux parties et reste en vigueur jusqu'à résiliation par l'une ou l'autre partie, moyennant un préavis écrit de {{preavis}} à l'autre partie.</p><h2>Article 9 — Loi applicable</h2><p>Ce contrat est régi et interprété conformément aux lois en vigueur dans l'Espace OHADA.</p><p class="signatures">Fait en deux exemplaires originaux, en {{langue}}, à {{ville}}, le {{date_jour}}<br/><br/>Pour la Société de Gestion — Pour le Client<br/>Signature du représentant légal de la Société de Gestion — Signature du Client<br/>Nom du représentant légal de la Société de Gestion — Nom du Client</p></div>`,
    popularity: 32,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Gestion sous mandat régie dans l’UMOA par le Règlement général de l’AMF-UMOA : activité réservée aux sociétés de gestion de patrimoine et SGI agréées.' },
      FR: { note: 'Mandat de gestion encadré par le Code monétaire et financier (art. L.533-13, adéquation au profil client — MIF 2) et le Règlement général de l’AMF ; conseillers en gestion de patrimoine soumis au statut CIF.' },
    }),
  },
  {
    // FUSION : « Contrat de Mandat de Gestion de Portefeuille » + « Contrat de Gestion
    // d'Actifs Financiers » (mêmes clauses de mandat — champ select objet_mandat).
    code: 'bank_gestion_portefeuille',
    name: 'Contrat de mandat de gestion de portefeuille / d’actifs financiers',
    category: 'commercial_financier',
    price: 4000, priceMax: 6000,
    description: 'Mandat par lequel un client confie à une société de gestion la gestion discrétionnaire de son portefeuille de valeurs mobilières ou de ses actifs financiers : portée du mandat, pouvoirs du mandataire, objectifs de gestion, honoraires et reporting.',
    fieldsJson: F([
      { key: 'objet_mandat', label: 'Objet du mandat', type: 'select', required: true, options: ['portefeuille de valeurs mobilières', 'actifs financiers (gestion discrétionnaire)'] },
      { key: 'mandataire', label: 'Mandataire — société de gestion (n° d’enregistrement, adresse du siège, représentant légal et titre)', type: 'textarea', required: true },
      { key: 'mandant', label: 'Mandant (nom, statut personne physique/morale, nationalité, adresse ou siège)', type: 'textarea', required: true },
      { key: 'langue', label: 'Langue du contrat', type: 'text', required: true },
      { key: 'ville', label: 'Ville / lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE MANDAT DE GESTION DE PORTEFEUILLE</h1><p><strong>Entre :</strong> {{mandataire}}, agissant en vertu des pouvoirs qui lui sont conférés, ci-après dénommée « le Mandataire », d'une part,</p><p><strong>Et :</strong> {{mandant}}, ci-après dénommé « le Mandant », d'autre part.</p><p>Il est convenu ce qui suit :</p><h2>Article 1 — Objet du mandat</h2><p>Le Mandant confie au Mandataire la gestion de son {{objet_mandat}} conformément aux termes et conditions énoncés dans le présent contrat.</p><h2>Article 2 — Portée du mandat</h2><p>Le mandat de gestion confère au Mandataire le pouvoir d'acheter, vendre, échanger, négocier ou autrement traiter les valeurs mobilières et actifs financiers spécifiés dans une liste annexée au présent contrat, au nom et pour le compte du Mandant.</p><h2>Article 3 — Pouvoirs du Mandataire</h2><p>Le Mandataire agira de manière diligente et prudente dans la gestion du portefeuille du Mandant, conformément aux objectifs et aux directives définis par ce dernier. Il est autorisé à prendre toutes les décisions d'investissement nécessaires pour atteindre les objectifs définis, dans les limites fixées par le Mandant.</p><h2>Article 4 — Objectifs de gestion</h2><p>Les objectifs de gestion, les stratégies d'investissement et les restrictions éventuelles seront définis par écrit entre le Mandant et le Mandataire, et incluront notamment les critères de rendement, de risque et d'échéance.</p><h2>Article 5 — Honoraires</h2><p>Les honoraires du Mandataire seront déterminés selon les modalités convenues entre les parties, conformément à la réglementation en vigueur.</p><h2>Article 6 — Rapports et informations</h2><p>Le Mandataire fournira régulièrement des rapports au Mandant sur l'état et la performance du portefeuille, ainsi que sur les opérations effectuées en son nom, et le tiendra informé de tout événement significatif affectant son portefeuille.</p><h2>Article 7 — Durée du mandat</h2><p>Le présent mandat entre en vigueur à la date de signature et reste en vigueur jusqu'à résiliation par l'une ou l'autre des parties conformément aux dispositions du présent contrat.</p><h2>Article 8 — Loi applicable</h2><p>Ce contrat est régi et interprété conformément aux lois en vigueur dans l'Espace OHADA.</p><p class="signatures">Fait en deux exemplaires originaux, en {{langue}}, à {{ville}}, le {{date_jour}}<br/><br/>Pour le Mandataire — Pour le Mandant<br/>Signature du représentant légal du Mandataire — Signature du Mandant<br/>Nom du représentant légal du Mandataire — Nom du Mandant</p></div>`,
    popularity: 26,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Gestion de portefeuille sous mandat réservée aux SGI et sociétés de gestion agréées par l’AMF-UMOA (Règlement général du marché financier régional de l’UMOA).' },
      FR: { note: 'Service d’investissement de gestion de portefeuille pour compte de tiers (Code monétaire et financier, art. L.321-1, 4°) — agrément AMF requis ; convention écrite obligatoire.' },
    }),
  },
  {
    // FUSION : « Contrat de Placement Financier » + « Contrat d'Intermédiation Financière »
    // (articles 3 à 8 identiques — champ select type_service).
    code: 'bank_placement_financier',
    name: 'Contrat de placement financier / intermédiation financière',
    category: 'commercial_financier',
    price: 3500, priceMax: 5500,
    description: 'Contrat de services de placement ou d’intermédiation financière : recommandation d’instruments financiers, exécution d’ordres, gestion de comptes et de portefeuille, obligations du client, frais, responsabilité et confidentialité.',
    fieldsJson: F([
      { key: 'type_service', label: 'Nature du contrat', type: 'select', required: true, options: ['PLACEMENT FINANCIER', 'INTERMÉDIATION FINANCIÈRE'] },
      { key: 'prestataire', label: 'Prestataire de services (société, n° d’enregistrement, adresse du siège, représentant légal et titre)', type: 'textarea', required: true },
      { key: 'client', label: 'Client (nom, statut personne physique/morale, n° d’enregistrement le cas échéant, adresse ou siège)', type: 'textarea', required: true },
      { key: 'preavis', label: 'Délai de préavis de résiliation', type: 'text', required: true },
      { key: 'langue', label: 'Langue du contrat', type: 'text', required: true },
      { key: 'ville', label: 'Ville / lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE {{type_service}}</h1><p><strong>Entre :</strong> {{prestataire}}, agissant en vertu des pouvoirs qui lui sont conférés, ci-après dénommée « le Prestataire de Services », d'une part,</p><p><strong>Et :</strong> {{client}}, ci-après dénommé « le Client », d'autre part.</p><p>Il est convenu ce qui suit :</p><h2>Article 1 — Objet du contrat</h2><p>Le Prestataire de Services s'engage à fournir des services de {{type_service}} au Client conformément aux termes et conditions énoncés dans le présent contrat.</p><h2>Article 2 — Services fournis</h2><p>Les services fournis par le Prestataire de Services comprennent notamment :</p><p>- La recommandation et la proposition de divers instruments financiers pour l'investissement.<br/>- L'exécution d'ordres d'achat et de vente d'instruments financiers et de valeurs mobilières pour le compte du Client.<br/>- La gestion des comptes et des transactions du Client.<br/>- La gestion du portefeuille d'investissement du Client conformément à ses objectifs et préférences.</p><h2>Article 3 — Obligations du Client</h2><p>Le Client s'engage à fournir au Prestataire de Services toutes les informations nécessaires concernant ses objectifs d'investissement, son profil de risque et ses préférences afin de permettre au Prestataire de Services de recommander des placements appropriés.</p><h2>Article 4 — Frais et honoraires</h2><p>Les frais et honoraires relatifs aux services fournis par le Prestataire de Services seront convenus entre les parties et spécifiés dans un tarif annexé au présent contrat.</p><h2>Article 5 — Responsabilité</h2><p>Le Prestataire de Services exerce ses fonctions avec le devoir de diligence et de prudence requis par la réglementation en vigueur. Cependant, il ne peut être tenu responsable des pertes résultant de décisions d'investissement prises par le Client.</p><h2>Article 6 — Confidentialité</h2><p>Les parties conviennent de garder confidentielles toutes les informations et documents échangés dans le cadre de l'exécution du présent contrat, sauf autorisation expresse écrite ou obligation légale de divulguer de telles informations.</p><h2>Article 7 — Durée du contrat</h2><p>Le présent contrat entre en vigueur à la date de signature et reste en vigueur pour une durée indéterminée, sauf résiliation par l'une ou l'autre des parties moyennant un préavis écrit de {{preavis}}.</p><h2>Article 8 — Loi applicable</h2><p>Ce contrat est régi et interprété conformément aux lois en vigueur dans l'Espace OHADA.</p><p class="signatures">Fait en deux exemplaires originaux, en {{langue}}, à {{ville}}, le {{date_jour}}<br/><br/>Pour le Prestataire de Services — Pour le Client<br/>Signature du représentant légal du Prestataire de Services — Signature du Client<br/>Nom du représentant légal du Prestataire de Services — Nom du Client</p></div>`,
    popularity: 24,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Placement et intermédiation sur le marché financier régional de l’UMOA réservés aux Sociétés de Gestion et d’Intermédiation (SGI) et intermédiaires agréés par l’AMF-UMOA.' },
      FR: { note: 'Services d’investissement (réception-transmission d’ordres, exécution, conseil — Code monétaire et financier, art. L.321-1) réservés aux prestataires agréés ACPR/AMF.' },
    }),
  },
  {
    code: 'bank_mandat_courtage',
    name: 'Contrat de mandat de courtage',
    category: 'commercial_financier',
    price: 3000, priceMax: 5000,
    description: 'Mandat exclusif par lequel un mandant confie à une société de courtage la négociation de transactions en son nom et pour son compte : portée du mandat, pouvoirs du courtier, obligations du mandant, commission et responsabilités.',
    fieldsJson: F([
      { key: 'mandataire', label: 'Mandataire — société de courtage (n° d’enregistrement, adresse du siège, représentant légal et titre)', type: 'textarea', required: true },
      { key: 'mandant', label: 'Mandant (nom, statut personne physique/morale, nationalité, adresse ou siège)', type: 'textarea', required: true },
      { key: 'produits', label: 'Biens ou services concernés par le mandat (les « Produits »)', type: 'textarea', required: true },
      { key: 'langue', label: 'Langue du contrat', type: 'text', required: true },
      { key: 'ville', label: 'Ville / lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE MANDAT DE COURTAGE</h1><p><strong>Entre :</strong> {{mandataire}}, agissant en vertu des pouvoirs qui lui sont conférés, ci-après dénommée « le Mandataire », d'une part,</p><p><strong>Et :</strong> {{mandant}}, ci-après dénommé « le Mandant », d'autre part.</p><p>Il est convenu ce qui suit :</p><h2>Article 1 — Objet du mandat</h2><p>Le Mandant confie au Mandataire le mandat exclusif de négocier, en son nom et pour son compte, des transactions portant sur {{produits}}, ci-après dénommés les « Produits », conformément aux termes et conditions énoncés dans le présent contrat.</p><h2>Article 2 — Portée du mandat</h2><p>Le Mandataire est autorisé à rechercher des acheteurs ou des vendeurs potentiels pour les Produits, à négocier les conditions de vente ou d'achat, à conclure des contrats au nom du Mandant et à entreprendre toute action nécessaire pour réaliser les transactions convenues.</p><h2>Article 3 — Pouvoirs du Mandataire</h2><p>Le Mandataire agira de manière diligente et professionnelle dans l'exercice de ses fonctions, conformément aux instructions du Mandant et aux pratiques commerciales habituelles du secteur.</p><h2>Article 4 — Obligations du Mandant</h2><p>Le Mandant s'engage à fournir au Mandataire toutes les informations nécessaires et à coopérer pleinement avec ce dernier pour faciliter la conclusion des transactions.</p><h2>Article 5 — Rémunération du Mandataire</h2><p>Le Mandataire percevra une commission pour ses services, dont le montant sera déterminé en fonction du prix de vente ou d'achat des Produits, conformément aux modalités convenues entre les parties.</p><h2>Article 6 — Responsabilités</h2><p>Le Mandataire agira en tant qu'agent du Mandant et ne sera pas responsable des actions ou des omissions des tiers impliqués dans les transactions, sauf en cas de faute lourde ou de violation manifeste de ses obligations contractuelles.</p><h2>Article 7 — Durée du mandat</h2><p>Le présent mandat entre en vigueur à la date de signature et reste en vigueur jusqu'à résiliation par l'une ou l'autre des parties conformément aux dispositions du présent contrat.</p><h2>Article 8 — Loi applicable</h2><p>Ce contrat est régi et interprété conformément aux lois en vigueur dans l'Espace OHADA.</p><p class="signatures">Fait en deux exemplaires originaux, en {{langue}}, à {{ville}}, le {{date_jour}}<br/><br/>Pour le Mandataire — Pour le Mandant<br/>Signature du représentant légal du Mandataire — Signature du Mandant<br/>Nom du représentant légal du Mandataire — Nom du Mandant</p></div>`,
    popularity: 22,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Courtage régi par l’Acte uniforme OHADA portant sur le droit commercial général (art. 208 s. — le courtier est un intermédiaire de commerce) ; courtage en bourse réservé aux SGI agréées AMF-UMOA.' },
      FR: { note: 'Courtage régi par le droit commun du mandat (Code civil, art. 1984 s.) ; le courtage en instruments financiers ou en assurance exige une immatriculation ORIAS ou un agrément spécifique.' },
    }),
  },

  // ════════════════════ GESTION DES COMPTES (FUSIONS) ════════════════════
  {
    // MÉGA-FUSION : ~22 fichiers « Contrat de Gestion des Comptes … » quasi identiques
    // (Courants, d'Épargne, de Dépôt, d'Investissement, de Crédit, de Paiement, Professionnels,
    // de Retraite, de Pension, Fiduciaires, de Fiducie, Offshore, en Devises Étrangères,
    // de Particuliers, de Société, de PME, de Grandes Entreprises, de Multinationales,
    // de Collectivités Locales, de Gouvernements, de Trusts, de Fondations)
    // → un seul template avec selects type_compte + type_titulaire.
    code: 'bank_gestion_comptes',
    name: 'Contrat de gestion de comptes bancaires (tous types de comptes et de clientèles)',
    category: 'commercial_financier',
    price: 3000, priceMax: 5000,
    description: 'Convention de gestion de compte bancaire adaptable à tout type de compte (courant, épargne, dépôt, investissement, paiement, retraite, fiduciaire, devises, offshore…) et de titulaire (particulier, société, PME, grande entreprise, collectivité, gouvernement, fondation) : ouverture, opérations autorisées, frais, intérêts, confidentialité et clôture.',
    fieldsJson: F([
      { key: 'banque', label: 'Banque (raison sociale, n° d’enregistrement, adresse du siège, représentant légal et titre)', type: 'textarea', required: true },
      { key: 'titulaire', label: 'Titulaire du compte (nom ou raison sociale, n° d’identification, adresse ou siège, représentant le cas échéant)', type: 'textarea', required: true },
      { key: 'type_compte', label: 'Type de compte géré', type: 'select', required: true, options: ['compte courant', 'compte d’épargne', 'compte de dépôt', 'compte d’investissement', 'compte de crédit', 'compte de paiement', 'compte professionnel', 'compte de retraite / pension', 'compte fiduciaire / de fiducie / trust', 'compte en devises étrangères', 'compte offshore'] },
      { key: 'type_titulaire', label: 'Catégorie de clientèle', type: 'select', required: true, options: ['Particulier', 'Société / PME', 'Grande entreprise / multinationale', 'Collectivité locale / gouvernement', 'Fondation / organisation'] },
      { key: 'preavis', label: 'Délai de préavis de résiliation', type: 'text', required: true },
      { key: 'langue', label: 'Langue du contrat', type: 'text', required: true },
      { key: 'ville', label: 'Ville / lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE GESTION DE COMPTE BANCAIRE</h1><p><strong>Entre :</strong> {{banque}}, agissant en vertu des pouvoirs qui lui sont conférés, ci-après dénommée « la Banque », d'une part,</p><p><strong>Et :</strong> {{titulaire}}, agissant en qualité de {{type_titulaire}}, ci-après dénommé « le Titulaire du Compte », d'autre part.</p><p>Il est convenu ce qui suit :</p><h2>Article 1 — Ouverture du compte</h2><p>La Banque ouvrira et gérera un <strong>{{type_compte}}</strong> au nom du Titulaire du Compte conformément aux termes et conditions de ce contrat, aux procédures internes de la Banque et aux dispositions légales et réglementaires en vigueur.</p><h2>Article 2 — Utilisation du compte et opérations autorisées</h2><p>Le Titulaire du Compte est autorisé à effectuer des dépôts, des retraits, des virements, des conversions le cas échéant, et toutes autres opérations autorisées sur le compte conformément aux lois et réglementations en vigueur et aux politiques de la Banque.</p><h2>Article 3 — Frais et charges</h2><p>Le Titulaire du Compte accepte de payer les frais et charges applicables au compte tels que spécifiés dans le barème tarifaire de la Banque, en vigueur au moment de l'ouverture du compte et pendant toute la durée du contrat.</p><h2>Article 4 — Intérêts</h2><p>La Banque versera des intérêts sur les soldes créditeurs du compte conformément aux conditions et aux taux spécifiés dans le barème tarifaire en vigueur et aux dispositions réglementaires applicables au type de compte concerné.</p><h2>Article 5 — Déclaration d'identité et documents</h2><p>Le Titulaire du Compte fournira à la Banque toutes les informations et documents nécessaires à l'ouverture et à la gestion du compte, y compris une pièce d'identité valide ou les documents sociaux de l'entité, des preuves d'adresse et toute autre information demandée par la Banque.</p><h2>Article 6 — Reporting et suivi</h2><p>La Banque fournira au Titulaire du Compte des relevés de compte réguliers ainsi que les états des transactions et tout rapport nécessaire au suivi du compte.</p><h2>Article 7 — Confidentialité</h2><p>La Banque s'engage à traiter toutes les informations relatives au compte du Titulaire du Compte de manière confidentielle et à ne divulguer ces informations qu'aux personnes autorisées par la loi ou par le Titulaire du Compte.</p><h2>Article 8 — Clôture du compte</h2><p>Le Titulaire du Compte peut demander la clôture du compte à tout moment en respectant les procédures de clôture spécifiées par la Banque, moyennant un préavis écrit de {{preavis}}. La Banque se réserve également le droit de clôturer le compte conformément à ses politiques et aux lois en vigueur.</p><h2>Article 9 — Loi applicable</h2><p>Ce contrat est régi et interprété conformément aux lois en vigueur dans l'Espace OHADA.</p><p class="signatures">Fait en deux exemplaires originaux, en {{langue}}, à {{ville}}, le {{date_jour}}<br/><br/>Pour la Banque — Pour le Titulaire du Compte<br/>Signature du représentant légal de la Banque — Signature du Titulaire du Compte<br/>Nom du représentant légal de la Banque — Nom du Titulaire du Compte</p></div>`,
    popularity: 42,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Conventions de compte régies par la loi bancaire UMOA et les instructions BCEAO (services bancaires gratuits, conditions débitrices/créditrices) ; comptes en devises et offshore soumis au Règlement n°09/2010/CM/UEMOA sur les relations financières extérieures.' },
      FR: { note: 'Convention de compte écrite obligatoire (Code monétaire et financier, art. L.312-1-1) ; obligations KYC issues des art. L.561-1 s. (lutte anti-blanchiment).' },
    }),
  },
  {
    // MÉGA-FUSION : ~40 fichiers « Contrat de Gestion des Comptes de Fonds … » quasi identiques
    // (Fonds d'Investissement, Capital-Risque et toutes ses variantes sectorielles — agricole,
    // culturel, éducatif, environnemental, technologique, santé, immobilier, énergétique,
    // innovation sociale —, Capital-Investissement, Capital-Développement, Capital-Semence,
    // Capital de Démarrage, Capital d'Impact, Fonds de Pension, Retraite, Prévoyance, Souverains,
    // Mutuels, Indiciels, ETF, Couverture, Garantie, Crédit, Prêt, Subvention, Bourse, Secours,
    // Bienfaisance, Dotation, Développement, Participation, Assurance, Trusts, Fondations…)
    // → un seul template banque dépositaire / société de gestion avec select type_fonds.
    code: 'bank_gestion_comptes_fonds',
    name: 'Contrat de gestion des comptes de fonds (banque dépositaire / société de gestion)',
    category: 'commercial_financier',
    price: 4000, priceMax: 6000,
    description: 'Contrat par lequel une banque agit comme dépositaire et gestionnaire des comptes d’un fonds (investissement, capital-risque, capital-investissement, pension, souverain, mutuel, ETF, couverture, garantie, dotation…) géré par une société de gestion : ouverture des comptes, opérations autorisées, reporting, flux financiers et frais.',
    fieldsJson: F([
      { key: 'banque', label: 'Banque dépositaire (raison sociale, n° d’enregistrement, adresse du siège, représentant légal et titre)', type: 'textarea', required: true },
      { key: 'societe_gestion', label: 'Société de gestion du fonds (n° d’enregistrement, adresse du siège, représentant légal et titre)', type: 'textarea', required: true },
      { key: 'type_fonds', label: 'Type de fonds concerné', type: 'select', required: true, options: ['fonds d’investissement', 'fonds de capital-risque (y compris variantes sectorielles : agricole, technologique, santé, environnemental, culturel, éducatif, innovation sociale…)', 'fonds de capital-investissement (y compris durable, énergétique, immobilier, santé)', 'fonds de capital-développement / capital-semence / capital de démarrage', 'fonds d’impact / d’investissement social', 'fonds de pension / retraite / prévoyance', 'fonds souverain', 'fonds mutuel / indiciel / négocié en bourse (ETF)', 'fonds de couverture (hedge fund)', 'fonds de garantie / de crédit / de prêt', 'fonds de subvention / bourse / secours / bienfaisance / dotation', 'fonds de développement / de participation', 'fonds d’assurance', 'trust / fondation'] },
      { key: 'preavis', label: 'Délai de préavis de résiliation', type: 'text', required: true },
      { key: 'juridiction', label: 'Juridiction compétente en cas de litige', type: 'text', required: true },
      { key: 'langue', label: 'Langue du contrat', type: 'text', required: true },
      { key: 'ville', label: 'Ville / lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE GESTION DES COMPTES DE FONDS</h1><p><strong>Entre :</strong> {{banque}}, dûment habilitée à agir en son nom, ci-après dénommée « la Banque »,</p><p><strong>Et :</strong> {{societe_gestion}}, dûment habilitée à agir en son nom, ci-après dénommée « la Société de Gestion ».</p><p>Ci-après collectivement dénommées « les Parties ».</p><p>Il est convenu ce qui suit :</p><h2>Article 1 — Objet</h2><p>1.1 La Banque agira en qualité de dépositaire et gestionnaire des comptes du <strong>{{type_fonds}}</strong> géré par la Société de Gestion, conformément aux termes et conditions énoncés dans le présent contrat.</p><h2>Article 2 — Ouverture des comptes</h2><p>2.1 La Banque ouvrira et gérera des comptes bancaires pour chaque fonds géré par la Société de Gestion, conformément aux instructions de la Société de Gestion et aux dispositions légales et réglementaires en vigueur.</p><h2>Article 3 — Opérations autorisées</h2><p>3.1 La Société de Gestion est autorisée à effectuer des opérations de dépôt, de retrait, de virement, de change, d'investissement et toute autre opération bancaire standard sur les comptes du fonds, conformément aux dispositions légales et aux politiques internes de la Banque.</p><h2>Article 4 — Reporting et suivi</h2><p>4.1 La Banque fournira à la Société de Gestion des rapports réguliers sur l'état des comptes du fonds, y compris les relevés de compte, les états des transactions et tout autre rapport nécessaire à la gestion financière du fonds.</p><h2>Article 5 — Gestion des flux financiers</h2><p>5.1 La Banque agira en qualité de gestionnaire des flux financiers du fonds, notamment en facilitant les paiements, les transactions sur titres, les transferts de fonds et toute autre opération financière conforme aux instructions de la Société de Gestion.</p><h2>Article 6 — Frais et charges</h2><p>6.1 La Société de Gestion accepte de payer à la Banque tous les frais et charges associés à la gestion des comptes du fonds, conformément aux tarifs des frais bancaires en vigueur et aux accords spécifiques convenus entre les Parties.</p><h2>Article 7 — Confidentialité</h2><p>7.1 Les informations relatives aux comptes du fonds seront traitées par la Banque de manière confidentielle et ne seront divulguées à des tiers que conformément à la loi ou avec le consentement écrit de la Société de Gestion.</p><h2>Article 8 — Durée du contrat</h2><p>8.1 Le présent contrat entre en vigueur à la date de sa signature par les deux Parties et demeure en vigueur pour une durée indéterminée, sauf résiliation anticipée conformément aux dispositions de l'article 9 du présent contrat.</p><h2>Article 9 — Résiliation</h2><p>9.1 Chaque Partie peut résilier le présent contrat moyennant un préavis écrit de {{preavis}}.</p><h2>Article 10 — Loi applicable et règlement des litiges</h2><p>Ce contrat est régi par les lois en vigueur dans l'Espace OHADA. Tout litige découlant de ce contrat sera soumis à la juridiction exclusive des tribunaux compétents de {{juridiction}}.</p><p class="signatures">Fait en deux exemplaires originaux, en {{langue}}, à {{ville}}, le {{date_jour}}<br/><br/>Pour la Banque — Pour la Société de Gestion<br/>Signature du représentant légal de la Banque — Signature du représentant légal de la Société de Gestion<br/>Nom du représentant légal de la Banque — Nom du représentant légal de la Société de Gestion</p></div>`,
    popularity: 25,
    countriesJson: JSON.stringify({
      OHADA: { note: 'OPCVM et fonds du marché financier régional de l’UMOA soumis à l’agrément de l’AMF-UMOA ; la fonction de dépositaire est réservée aux banques et établissements agréés (Règlement général AMF-UMOA).' },
      FR: { note: 'Dépositaire d’OPC obligatoire (Code monétaire et financier, art. L.214-10 s.) : garde des actifs, contrôle de la régularité des décisions de la société de gestion.' },
    }),
  },
  {
    code: 'bank_domiciliation',
    name: 'Contrat de domiciliation bancaire',
    category: 'commercial_financier',
    price: 2000, priceMax: 4000,
    description: 'Contrat par lequel une banque fournit des services de domiciliation à un client : adresse de domiciliation, réception et gestion du courrier, obligations du client, frais, durée et résiliation.',
    fieldsJson: F([
      { key: 'banque', label: 'Banque (raison sociale, n° d’enregistrement, adresse du siège, représentant légal et titre)', type: 'textarea', required: true },
      { key: 'client', label: 'Client (nom, statut personne physique/morale, nationalité, adresse ou siège)', type: 'textarea', required: true },
      { key: 'duree', label: 'Durée déterminée du contrat', type: 'text', required: true },
      { key: 'preavis', label: 'Délai de préavis de résiliation', type: 'text', required: true },
      { key: 'langue', label: 'Langue du contrat', type: 'text', required: true },
      { key: 'ville', label: 'Ville / lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE DOMICILIATION BANCAIRE</h1><p><strong>Entre :</strong> {{banque}}, agissant en vertu des pouvoirs qui lui sont conférés, ci-après dénommée « la Banque », d'une part,</p><p><strong>Et :</strong> {{client}}, ci-après dénommé « le Client », d'autre part.</p><p>Il est convenu ce qui suit :</p><h2>Article 1 — Objet du contrat</h2><p>La Banque s'engage à fournir des services de domiciliation bancaire au Client, conformément aux termes et conditions énoncés dans le présent contrat.</p><h2>Article 2 — Services de domiciliation</h2><p>Les services de domiciliation bancaire comprennent la mise à disposition d'une adresse de domiciliation pour le siège social / l'établissement du Client, la réception et la gestion du courrier postal, et d'autres services connexes convenus entre les parties.</p><h2>Article 3 — Obligations du Client</h2><p>Le Client s'engage à informer la Banque de tout changement relatif à son adresse, à notifier à la Banque tout courrier important et à respecter les règles et les procédures de la Banque en matière de domiciliation.</p><h2>Article 4 — Frais de domiciliation</h2><p>Le Client versera à la Banque des frais de domiciliation, dont le montant et les modalités de paiement seront spécifiés dans un tarif annexé au présent contrat.</p><h2>Article 5 — Durée du contrat</h2><p>Le présent contrat entre en vigueur à la date de signature et reste en vigueur pour une durée déterminée de {{duree}}, renouvelable par tacite reconduction, sauf résiliation par l'une ou l'autre des parties moyennant un préavis écrit de {{preavis}}.</p><h2>Article 6 — Résiliation</h2><p>En cas de résiliation anticipée du contrat par l'une ou l'autre des parties, les frais de domiciliation restent dus jusqu'à la fin de la période convenue, sauf disposition contraire prévue dans le présent contrat.</p><h2>Article 7 — Loi applicable</h2><p>Ce contrat est régi et interprété conformément aux lois en vigueur dans l'Espace OHADA.</p><p class="signatures">Fait en deux exemplaires originaux, en {{langue}}, à {{ville}}, le {{date_jour}}<br/><br/>Pour la Banque — Pour le Client<br/>Signature du représentant légal de la Banque — Signature du Client<br/>Nom du représentant légal de la Banque — Nom du Client</p></div>`,
    popularity: 30,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Domiciliation d’entreprise admise par l’Acte uniforme OHADA sur le droit commercial général (indication du siège) ; la domiciliation des opérations d’import-export auprès d’une banque est exigée par la réglementation des changes UEMOA.' },
      FR: { note: 'Domiciliation d’entreprise régie par le Code de commerce (art. L.123-11-2 s.) — agrément préfectoral du domiciliataire et contrat écrit obligatoire.' },
    }),
  },
  {
    code: 'bank_domiciliation_titres',
    name: 'Contrat de domiciliation de titres (conservation de titres)',
    category: 'commercial_financier',
    price: 3000, priceMax: 5000,
    description: 'Contrat de dépôt et de conservation de titres auprès d’une banque : dépôt des titres, obligations du dépositaire, droits du client, frais, responsabilité et résiliation.',
    fieldsJson: F([
      { key: 'banque', label: 'Banque ou établissement financier (n° d’enregistrement, adresse du siège, représentant légal et titre)', type: 'textarea', required: true },
      { key: 'client', label: 'Client (nom ou raison sociale, n° d’identification, adresse ou siège)', type: 'textarea', required: true },
      { key: 'preavis', label: 'Délai de préavis de résiliation (en jours ou mois)', type: 'text', required: true },
      { key: 'juridiction', label: 'Juridiction compétente en cas de litige', type: 'text', required: true },
      { key: 'langue', label: 'Langue du contrat', type: 'text', required: true },
      { key: 'ville', label: 'Ville / lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE DOMICILIATION DE TITRES</h1><p><strong>Entre :</strong> {{banque}}, agissant en vertu des pouvoirs qui lui sont conférés, ci-après dénommée « la Banque », d'une part,</p><p><strong>Et :</strong> {{client}}, ci-après dénommé « le Client », d'autre part.</p><p>Il est convenu ce qui suit :</p><h2>Article 1 — Objet du contrat</h2><p>La Banque accepte de fournir au Client des services de domiciliation de titres conformément aux termes et conditions énoncés dans le présent contrat. La domiciliation de titres permet au Client de déposer ses titres auprès de la Banque pour une conservation sécurisée et une gestion efficace.</p><h2>Article 2 — Dépôt des titres</h2><p>Le Client s'engage à déposer les titres spécifiés dans une liste jointe à ce contrat auprès de la Banque. Ces titres seront déposés dans un compte titres ou tout autre mécanisme de conservation désigné par la Banque à cet effet.</p><h2>Article 3 — Obligations de la Banque</h2><p>La Banque s'engage à conserver en sécurité les titres déposés par le Client et à exercer les droits qui y sont attachés conformément aux instructions du Client. La Banque fournira également au Client des relevés périodiques détaillant les titres détenus et les opérations effectuées sur ces titres.</p><h2>Article 4 — Droits du Client</h2><p>Le Client conserve la propriété pleine et entière des titres déposés auprès de la Banque. Le Client a le droit de retirer les titres déposés ou de donner des instructions à la Banque concernant la gestion de ces titres conformément aux modalités convenues entre les parties.</p><h2>Article 5 — Frais et honoraires</h2><p>Les frais de domiciliation de titres et autres frais associés à ce contrat seront convenus entre les parties dans un document distinct intitulé « Grille Tarifaire ». Le Client s'engage à payer ces frais à la Banque selon les modalités convenues.</p><h2>Article 6 — Responsabilité de la Banque</h2><p>La Banque s'engage à exercer le soin et la diligence raisonnables dans la conservation des titres déposés par le Client. Cependant, la responsabilité de la Banque ne pourra être engagée que pour toute perte ou dommage résultant de sa faute lourde ou intentionnelle.</p><h2>Article 7 — Durée du contrat</h2><p>Ce contrat entre en vigueur à la date de sa signature par les deux parties et reste en vigueur jusqu'à résiliation par l'une ou l'autre partie moyennant un préavis écrit de {{preavis}} à l'autre partie.</p><h2>Article 8 — Loi applicable et juridiction</h2><p>Ce contrat est régi et interprété conformément aux lois en vigueur dans l'Espace OHADA. Tout litige découlant de ce contrat sera soumis à la juridiction exclusive des tribunaux compétents de {{juridiction}}.</p><p class="signatures">Fait en deux exemplaires originaux, en {{langue}}, à {{ville}}, le {{date_jour}}<br/><br/>Pour la Banque — Pour le Client<br/>Signature du représentant légal de la Banque — Signature du représentant légal du Client<br/>Nom du représentant légal de la Banque — Nom du représentant légal du Client</p></div>`,
    popularity: 18,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Conservation de titres sur le marché financier régional de l’UMOA assurée par les teneurs de compte-conservateurs agréés par l’AMF-UMOA, avec dénouement au Dépositaire Central/Banque de Règlement (DC/BR).' },
      FR: { note: 'Tenue de compte-conservation régie par le Code monétaire et financier (art. L.542-1) — service réservé aux établissements habilités, sous contrôle AMF.' },
    }),
  },

  // ════════════════════ PAIEMENTS & SERVICES BANCAIRES ════════════════════
  {
    // FUSION : « Contrat de Service de Paiement » + « Contrat de Mandat de Gestion de Paiement »
    // (mêmes prestations d'encaissement/traitement — champ select cadre_prestation).
    code: 'bank_service_paiement',
    name: 'Contrat de service de paiement / mandat de gestion de paiement',
    category: 'commercial_financier',
    price: 3000, priceMax: 5000,
    description: 'Contrat entre un prestataire de services de paiement et un client : mise à disposition de moyens de paiement électroniques, réception et traitement des paiements, gestion des comptes de paiement, rapports de transactions, sécurité des données et responsabilité.',
    fieldsJson: F([
      { key: 'cadre_prestation', label: 'Cadre de la prestation', type: 'select', required: true, options: ['Fourniture de services de paiement au client', 'Mandat de gestion des paiements (encaissement pour le compte du client)'] },
      { key: 'prestataire', label: 'Prestataire de services de paiement (société, n° d’enregistrement, adresse du siège, représentant légal et titre)', type: 'textarea', required: true },
      { key: 'client', label: 'Client / entité mandante (nom ou société, n° d’enregistrement le cas échéant, adresse ou siège, représentant le cas échéant)', type: 'textarea', required: true },
      { key: 'preavis', label: 'Délai de préavis de résiliation', type: 'text', required: true },
      { key: 'langue', label: 'Langue du contrat', type: 'text', required: true },
      { key: 'ville', label: 'Ville / lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE SERVICE DE PAIEMENT</h1><p><strong>Entre :</strong> {{prestataire}}, agissant en vertu des pouvoirs qui lui sont conférés, ci-après dénommé « le Prestataire de Services », d'une part,</p><p><strong>Et :</strong> {{client}}, ci-après dénommé « le Client », d'autre part.</p><p>Il est convenu ce qui suit :</p><h2>Article 1 — Objet du contrat</h2><p>Le Prestataire de Services s'engage à fournir des services de paiement au Client dans le cadre suivant : <strong>{{cadre_prestation}}</strong>, conformément aux termes et conditions énoncés dans le présent contrat.</p><h2>Article 2 — Services fournis</h2><p>Les services fournis par le Prestataire de Services comprennent, mais ne se limitent pas à :</p><p>- La mise à disposition de moyens de paiement électroniques permettant au Client de réaliser des transactions financières.<br/>- La réception des paiements des clients du Client et leur traitement conformément à ses instructions.<br/>- La gestion des comptes de paiement associés.<br/>- La fourniture de rapports périodiques et de relevés de transactions.</p><h2>Article 3 — Obligations du Client</h2><p>Le Client s'engage à utiliser les services de paiement fournis par le Prestataire de Services conformément aux lois et réglementations en vigueur, ainsi qu'aux instructions et procédures communiquées par le Prestataire de Services. Il est responsable de l'exactitude des informations fournies au Prestataire et garantit que toutes les transactions sont conformes à la législation applicable.</p><h2>Article 4 — Obligations du Prestataire</h2><p>Le Prestataire de Services s'engage à exécuter les services de paiement avec diligence, professionnalisme et conformément aux lois et réglementations en vigueur. Il garantit la sécurité et la confidentialité des données des clients du Client et des informations relatives aux transactions.</p><h2>Article 5 — Frais et honoraires</h2><p>Les frais et honoraires relatifs aux services de paiement fournis par le Prestataire de Services seront convenus entre les parties et spécifiés dans un tarif annexé au présent contrat.</p><h2>Article 6 — Responsabilité</h2><p>Le Prestataire de Services exerce ses fonctions avec le devoir de diligence et de prudence requis par la réglementation en vigueur. Cependant, il ne peut être tenu responsable des pertes résultant de transactions non autorisées ou mal exécutées, sauf en cas de négligence grave ou de faute intentionnelle de sa part.</p><h2>Article 7 — Confidentialité</h2><p>Les parties conviennent de garder confidentielles toutes les informations et données relatives aux services de paiement échangées dans le cadre de l'exécution du présent contrat, sauf autorisation expresse écrite ou obligation légale de divulguer de telles informations.</p><h2>Article 8 — Durée du contrat</h2><p>Le présent contrat entre en vigueur à la date de signature et reste en vigueur pour une durée indéterminée, sauf résiliation par l'une ou l'autre des parties moyennant un préavis écrit de {{preavis}}.</p><h2>Article 9 — Loi applicable</h2><p>Ce contrat est régi et interprété conformément aux lois en vigueur dans l'Espace OHADA.</p><p class="signatures">Fait en deux exemplaires originaux, en {{langue}}, à {{ville}}, le {{date_jour}}<br/><br/>Pour le Prestataire de Services — Pour le Client<br/>Signature du représentant légal du Prestataire de Services — Signature du Client<br/>Nom du représentant légal du Prestataire de Services — Nom du Client</p></div>`,
    popularity: 30,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Services de paiement régis par le Règlement n°15/2002/CM/UEMOA sur les systèmes de paiement et l’Instruction BCEAO n°001-2024 relative aux services de paiement ; émission de monnaie électronique soumise à agrément BCEAO.' },
      FR: { note: 'Prestataires de services de paiement agréés par l’ACPR (Code monétaire et financier, art. L.522-1 s. — DSP2) ; contrat-cadre de services de paiement obligatoire (art. L.314-12).' },
    }),
  },
  {
    code: 'bank_exploitation_dab',
    name: 'Contrat d’exploitation de distributeurs automatiques',
    category: 'commercial_financier',
    price: 2500, priceMax: 4500,
    description: 'Contrat entre le propriétaire d’un distributeur automatique et son exploitant : mise à disposition, entretien et conformité, gestion quotidienne, redevance mensuelle, durée et résiliation.',
    fieldsJson: F([
      { key: 'proprietaire', label: 'Propriétaire du distributeur (nom ou société, n° d’enregistrement, adresse, représentant légal et titre)', type: 'textarea', required: true },
      { key: 'exploitant', label: 'Exploitant (nom ou société, n° d’enregistrement, adresse, représentant légal et titre)', type: 'textarea', required: true },
      { key: 'emplacement', label: 'Emplacement du distributeur automatique', type: 'text', required: true },
      { key: 'duree', label: 'Durée du contrat', type: 'text', required: true },
      { key: 'redevance', label: 'Montant de la redevance mensuelle (avec la devise)', type: 'text', required: true },
      { key: 'preavis', label: 'Délai de préavis de résiliation', type: 'text', required: true },
      { key: 'juridiction', label: 'Juridiction compétente en cas de litige', type: 'text', required: true },
      { key: 'langue', label: 'Langue du contrat', type: 'text', required: true },
      { key: 'ville', label: 'Ville / lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT D'EXPLOITATION DE DISTRIBUTEURS AUTOMATIQUES</h1><p><strong>Entre :</strong> {{proprietaire}}, agissant en vertu des pouvoirs qui lui sont conférés, ci-après dénommé « le Propriétaire »,</p><p><strong>Et :</strong> {{exploitant}}, agissant en vertu des pouvoirs qui lui sont conférés, ci-après dénommé « l'Exploitant ».</p><p>Ci-après collectivement dénommés « les Parties ».</p><p>Il est convenu ce qui suit :</p><h2>Article 1 — Objet du contrat</h2><p>1.1 Le Propriétaire met à la disposition de l'Exploitant un distributeur automatique situé à <strong>{{emplacement}}</strong>, ci-après dénommé « le Distributeur Automatique », aux fins d'exploitation commerciale.</p><p>1.2 L'Exploitant exploitera le Distributeur Automatique conformément aux termes et conditions énoncés dans ce contrat.</p><h2>Article 2 — Responsabilités du Propriétaire</h2><p>2.1 Le Propriétaire s'engage à assurer le bon fonctionnement du Distributeur Automatique, y compris les réparations et l'entretien régulier nécessaires.</p><p>2.2 Le Propriétaire garantit que le Distributeur Automatique est conforme à toutes les normes de sécurité et de qualité applicables.</p><h2>Article 3 — Responsabilités de l'Exploitant</h2><p>3.1 L'Exploitant exploitera le Distributeur Automatique de manière professionnelle et conforme à toutes les lois et réglementations en vigueur.</p><p>3.2 L'Exploitant sera responsable de la gestion quotidienne du Distributeur Automatique, y compris le réapprovisionnement, la maintenance de base et la gestion des paiements.</p><h2>Article 4 — Durée du contrat</h2><p>4.1 Le présent contrat entre en vigueur à la date de sa signature par les deux Parties et demeure en vigueur pour une durée de {{duree}}, sauf résiliation anticipée conformément aux dispositions de l'article 6 du présent contrat.</p><h2>Article 5 — Redevances et paiements</h2><p>5.1 En contrepartie de l'exploitation du Distributeur Automatique, l'Exploitant versera au Propriétaire une redevance mensuelle de <strong>{{redevance}}</strong> payable selon les modalités convenues entre les Parties.</p><h2>Article 6 — Résiliation</h2><p>6.1 En cas de manquement grave par l'une des Parties à ses obligations en vertu du présent contrat, l'autre Partie aura le droit de résilier le contrat moyennant un préavis écrit de {{preavis}}.</p><h2>Article 7 — Loi applicable et règlement des litiges</h2><p>Ce contrat est régi par les lois en vigueur dans l'Espace OHADA. Tout litige découlant de ce contrat sera soumis à la juridiction exclusive des tribunaux compétents de {{juridiction}}.</p><p class="signatures">Fait en deux exemplaires originaux, en {{langue}}, à {{ville}}, le {{date_jour}}<br/><br/>Pour le Propriétaire — Pour l'Exploitant<br/>Signature du représentant légal du Propriétaire — Signature du représentant légal de l'Exploitant<br/>Nom du représentant légal du Propriétaire — Nom du représentant légal de l'Exploitant</p></div>`,
    popularity: 16,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Location-exploitation régie par le droit commun des contrats et l’Acte uniforme OHADA sur le droit commercial général ; l’exploitation de GAB/DAB bancaires requiert le statut d’établissement agréé ou d’agent mandaté BCEAO.' },
      FR: { note: 'Contrat innommé soumis au droit commun (Code civil) ; l’exploitation d’automates bancaires relève des prestataires agréés au titre du Code monétaire et financier.' },
    }),
  },
  {
    code: 'bank_securisation_transactions',
    name: 'Contrat de sécurisation des transactions bancaires',
    category: 'commercial_financier',
    price: 3500, priceMax: 5500,
    description: 'Contrat entre une société de sécurité et une banque cliente : détection et prévention des fraudes, surveillance en temps réel des transactions, audit des systèmes informatiques, confidentialité, honoraires et durée.',
    fieldsJson: F([
      { key: 'societe_securite', label: 'Société de sécurité des transactions (n° d’enregistrement, adresse du siège, représentant légal et titre)', type: 'textarea', required: true },
      { key: 'banque_cliente', label: 'Banque cliente (n° d’enregistrement, adresse du siège, représentant légal et titre)', type: 'textarea', required: true },
      { key: 'honoraires', label: 'Modalités de facturation des honoraires (tarif horaire, forfait…)', type: 'textarea', required: true },
      { key: 'duree', label: 'Durée du contrat', type: 'text', required: true },
      { key: 'preavis', label: 'Délai de préavis de résiliation', type: 'text', required: true },
      { key: 'langue', label: 'Langue du contrat', type: 'text', required: true },
      { key: 'ville', label: 'Ville / lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE SÉCURISATION DES TRANSACTIONS BANCAIRES</h1><p><strong>Entre :</strong> {{societe_securite}}, dûment habilitée à cet effet, ci-après dénommée « la Société de Sécurité »,</p><p><strong>Et :</strong> {{banque_cliente}}, dûment habilitée à cet effet, ci-après dénommée « la Banque Cliente ».</p><p>Ci-après dénommées collectivement les « Parties » et individuellement une « Partie ».</p><p><strong>Considérant ce qui suit :</strong></p><p>- La Banque Cliente gère un grand volume de transactions financières et est confrontée à des risques de sécurité informatique et de fraude.<br/>- La Société de Sécurité propose des solutions de sécurité avancées et des services de surveillance pour protéger les transactions bancaires de ses clients.</p><p>En conséquence, les Parties conviennent ce qui suit :</p><h2>Article 1 — Objet</h2><p>La Société de Sécurité s'engage à fournir à la Banque Cliente des services de sécurisation des transactions bancaires, conformément aux termes et conditions énoncés dans le présent contrat.</p><h2>Article 2 — Services de sécurisation des transactions bancaires</h2><p>Les services fournis par la Société de Sécurité peuvent inclure, mais ne sont pas limités à :</p><p>- La mise en place de systèmes de détection et de prévention des fraudes.<br/>- La surveillance en temps réel des transactions bancaires pour détecter toute activité suspecte.<br/>- L'audit et l'analyse des systèmes informatiques de la Banque Cliente pour identifier les vulnérabilités et proposer des solutions de sécurité.</p><h2>Article 3 — Obligations de la Banque Cliente</h2><p>La Banque Cliente s'engage à fournir à la Société de Sécurité toutes les informations et les accès nécessaires pour permettre une évaluation précise de ses besoins en matière de sécurité des transactions bancaires.</p><h2>Article 4 — Confidentialité</h2><p>Les Parties s'engagent à maintenir la confidentialité de toutes les informations et des données auxquelles elles ont accès dans le cadre de l'exécution du présent contrat.</p><h2>Article 5 — Honoraires</h2><p>Les honoraires de la Société de Sécurité pour les services rendus dans le cadre de ce contrat sont définis comme suit : {{honoraires}}</p><h2>Article 6 — Durée du contrat</h2><p>Ce contrat entre en vigueur à la date de sa signature par les deux parties et reste en vigueur pour une durée de {{duree}}, sauf résiliation anticipée conformément aux dispositions prévues dans le présent contrat.</p><h2>Article 7 — Résiliation</h2><p>Chaque partie peut résilier ce contrat moyennant un préavis écrit de {{preavis}} adressé à l'autre partie.</p><h2>Article 8 — Loi applicable</h2><p>Ce contrat est régi et interprété conformément aux lois en vigueur dans l'Espace OHADA.</p><p class="signatures">Fait en deux exemplaires originaux, en {{langue}}, à {{ville}}, le {{date_jour}}<br/><br/>Pour la Société de Sécurité des Transactions Bancaires — Pour la Banque Cliente<br/>Signature du représentant légal de la Société de Sécurité — Signature du représentant légal de la Banque Cliente<br/>Nom du représentant légal de la Société de Sécurité — Nom du représentant légal de la Banque Cliente</p></div>`,
    popularity: 20,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Sécurité des systèmes d’information bancaires encadrée par les instructions BCEAO et la Directive UEMOA sur la lutte contre la cybercriminalité ; externalisation soumise aux exigences de la Commission Bancaire de l’UMOA.' },
      FR: { note: 'Externalisation de prestations essentielles encadrée par l’arrêté du 3 novembre 2014 (contrôle interne) et les orientations EBA ; RGPD applicable aux données de transaction.' },
    }),
  },

  // ════════════════════ SERVICES FINANCIERS AUX ENTREPRISES ════════════════════
  {
    code: 'bank_recouvrement_creances',
    name: 'Contrat de recouvrement de créances',
    category: 'commercial_financier',
    price: 3000, priceMax: 5000,
    description: 'Mandat de recouvrement par lequel un créancier confie à une société spécialisée la récupération de ses créances impayées : relance des débiteurs, plans de paiement, procédures judiciaires, commission sur les montants récupérés et reporting.',
    fieldsJson: F([
      { key: 'creancier', label: 'Créancier (société, n° d’enregistrement, adresse du siège, représentant légal et titre)', type: 'textarea', required: true },
      { key: 'mandataire', label: 'Mandataire de recouvrement (société, n° d’enregistrement, adresse du siège, représentant légal et titre)', type: 'textarea', required: true },
      { key: 'remuneration', label: 'Modalités de rémunération du mandataire (ex. commission de X % sur les montants récupérés)', type: 'textarea', required: true },
      { key: 'preavis', label: 'Délai de préavis de résiliation (en jours)', type: 'text', required: true },
      { key: 'juridiction', label: 'Juridiction compétente en cas de litige', type: 'text', required: true },
      { key: 'ville', label: 'Ville / lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE RECOUVREMENT DE CRÉANCES</h1><p><strong>Entre :</strong> {{creancier}}, dûment autorisé à agir aux termes du présent contrat, ci-après désigné « le Créancier »,</p><p><strong>Et :</strong> {{mandataire}}, société spécialisée en recouvrement de créances, dûment autorisée à agir aux termes du présent contrat, ci-après désignée « le Mandataire ».</p><p>Il est convenu ce qui suit :</p><h2>Article 1 — Objet du contrat</h2><p>Le Créancier mandate le Mandataire de Recouvrement pour récupérer et recouvrer les créances impayées détenues par le Créancier auprès de ses débiteurs.</p><h2>Article 2 — Portée des services</h2><p>Le Mandataire de Recouvrement s'engage à effectuer toutes les actions nécessaires pour récupérer les créances impayées, y compris la relance des débiteurs, la négociation de plans de paiement, et le recours à des procédures judiciaires le cas échéant.</p><h2>Article 3 — Modalités de paiement</h2><p>Le Mandataire de Recouvrement percevra une commission sur les montants récupérés, selon les modalités suivantes : {{remuneration}}</p><h2>Article 4 — Information et transparence</h2><p>Le Mandataire de Recouvrement s'engage à fournir au Créancier des rapports réguliers sur l'avancement des actions de recouvrement entreprises, ainsi que sur les montants recouvrés.</p><h2>Article 5 — Confidentialité</h2><p>Les parties conviennent de maintenir la confidentialité de toutes les informations échangées dans le cadre du présent contrat.</p><h2>Article 6 — Durée du contrat</h2><p>Le présent contrat prend effet à la date de sa signature et reste en vigueur jusqu'à ce que toutes les créances confiées au Mandataire de Recouvrement aient été recouvrées, sauf résiliation anticipée par l'une ou l'autre des parties moyennant un préavis écrit de {{preavis}} jours.</p><h2>Article 7 — Loi applicable et règlement des litiges</h2><p>Ce contrat est régi et interprété conformément aux lois en vigueur dans l'Espace OHADA. Tout litige découlant du présent contrat sera soumis à la compétence exclusive des tribunaux compétents de {{juridiction}}.</p><p class="signatures">Fait en deux exemplaires originaux, à {{ville}}, le {{date_jour}}<br/><br/>Pour le Créancier — Pour le Mandataire de Recouvrement<br/>Signature du représentant légal du Créancier — Signature du représentant légal du Mandataire de Recouvrement<br/>Nom du représentant légal du Créancier — Nom du représentant légal du Mandataire de Recouvrement</p></div>`,
    popularity: 34,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Recouvrement encadré par l’Acte uniforme OHADA portant organisation des procédures simplifiées de recouvrement et des voies d’exécution (injonction de payer, art. 1 s.).' },
      FR: { note: 'Recouvrement amiable pour compte d’autrui réglementé par le Code des procédures civiles d’exécution (art. R.124-1 s.) — convention écrite obligatoire.' },
    }),
  },
  {
    code: 'bank_gestion_tresorerie',
    name: 'Contrat de gestion de la trésorerie',
    category: 'commercial_financier',
    price: 3500, priceMax: 5500,
    description: 'Contrat par lequel une banque fournit à un client des services de gestion de trésorerie : analyse des besoins en liquidités, optimisation des flux, surveillance et reporting, conseil en placement de trésorerie et rémunération.',
    fieldsJson: F([
      { key: 'banque', label: 'Banque ou établissement financier (n° d’enregistrement, adresse du siège, représentant légal et titre)', type: 'textarea', required: true },
      { key: 'client', label: 'Client (nom ou raison sociale, n° d’identification, adresse ou siège)', type: 'textarea', required: true },
      { key: 'preavis', label: 'Délai de préavis de résiliation', type: 'text', required: true },
      { key: 'juridiction', label: 'Juridiction compétente en cas de litige', type: 'text', required: true },
      { key: 'langue', label: 'Langue du contrat', type: 'text', required: true },
      { key: 'ville', label: 'Ville / lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE GESTION DE LA TRÉSORERIE</h1><p><strong>Entre :</strong> {{banque}}, agissant en vertu des pouvoirs qui lui sont conférés, ci-après dénommée « la Banque », d'une part,</p><p><strong>Et :</strong> {{client}}, ci-après dénommé « le Client », d'autre part.</p><p>Il est convenu ce qui suit :</p><h2>Article 1 — Objet du contrat</h2><p>Le présent contrat a pour objet de définir les modalités selon lesquelles la Banque fournira au Client des services de gestion de trésorerie, incluant la gestion des liquidités, des flux de trésorerie et des placements financiers.</p><h2>Article 2 — Services de gestion de la trésorerie</h2><p>La Banque s'engage à fournir les services suivants au Client :</p><p>- Analyse des besoins en liquidités du Client et proposition de solutions de gestion optimale de trésorerie.<br/>- Mise en place de systèmes de gestion de trésorerie pour optimiser la disponibilité des fonds et minimiser les coûts de financement.<br/>- Surveillance et analyse des flux de trésorerie du Client, avec des rapports réguliers sur la situation de trésorerie.<br/>- Conseil sur les stratégies de placement de trésorerie et gestion des investissements financiers.</p><h2>Article 3 — Responsabilités du Client</h2><p>Le Client s'engage à :</p><p>- Fournir à la Banque toutes les informations nécessaires pour évaluer adéquatement ses besoins en gestion de trésorerie.<br/>- Collaborer avec la Banque dans la mise en œuvre des recommandations de gestion de trésorerie.<br/>- Respecter les conditions convenues pour l'utilisation des produits et services de gestion de trésorerie de la Banque.</p><h2>Article 4 — Confidentialité</h2><p>Les parties conviennent de maintenir la confidentialité de toutes les informations commerciales et financières échangées dans le cadre de ce contrat, sauf autorisation contraire expresse.</p><h2>Article 5 — Durée du contrat</h2><p>Ce contrat entre en vigueur à la date de sa signature par les deux parties et reste en vigueur jusqu'à résiliation par l'une ou l'autre partie moyennant un préavis écrit de {{preavis}} à l'autre partie.</p><h2>Article 6 — Rémunération</h2><p>Les honoraires de la Banque pour les services de gestion de trésorerie seront convenus entre les parties dans un document distinct intitulé « Grille Tarifaire ».</p><h2>Article 7 — Loi applicable et juridiction</h2><p>Ce contrat est régi et interprété conformément aux lois en vigueur dans l'Espace OHADA. Tout litige découlant de ce contrat sera soumis à la juridiction exclusive des tribunaux compétents de {{juridiction}}.</p><p class="signatures">Fait en deux exemplaires originaux, en {{langue}}, à {{ville}}, le {{date_jour}}<br/><br/>Pour la Banque — Pour le Client<br/>Signature du représentant légal de la Banque — Signature du représentant légal du Client<br/>Nom du représentant légal de la Banque — Nom du représentant légal du Client</p></div>`,
    popularity: 26,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Services de gestion de trésorerie fournis par les banques agréées UMOA ; placements de trésorerie sur le marché monétaire régis par les règles BCEAO (bons et obligations du Trésor via UMOA-Titres).' },
      FR: { note: 'Cash management bancaire régi par le Code monétaire et financier ; la gestion de placements pour compte de tiers requiert le statut de prestataire de services d’investissement.' },
    }),
  },
  {
    code: 'bank_gestion_risques_financiers',
    name: 'Contrat de gestion des risques financiers',
    category: 'commercial_financier',
    price: 3500, priceMax: 5500,
    description: 'Contrat de services de gestion des risques financiers entre une banque et un client : identification et évaluation des risques, surveillance continue, stratégies de couverture (y compris dérivés), reporting et rémunération.',
    fieldsJson: F([
      { key: 'banque', label: 'Banque ou établissement financier (n° d’enregistrement, adresse du siège, représentant légal et titre)', type: 'textarea', required: true },
      { key: 'client', label: 'Client (nom ou raison sociale, n° d’identification, adresse ou siège)', type: 'textarea', required: true },
      { key: 'preavis', label: 'Délai de préavis de résiliation', type: 'text', required: true },
      { key: 'juridiction', label: 'Juridiction compétente en cas de litige', type: 'text', required: true },
      { key: 'langue', label: 'Langue du contrat', type: 'text', required: true },
      { key: 'ville', label: 'Ville / lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE GESTION DES RISQUES FINANCIERS</h1><p><strong>Entre :</strong> {{banque}}, agissant en vertu des pouvoirs qui lui sont conférés, ci-après dénommée « la Banque », d'une part,</p><p><strong>Et :</strong> {{client}}, ci-après dénommé « le Client », d'autre part.</p><p>Il est convenu ce qui suit :</p><h2>Article 1 — Objet du contrat</h2><p>Le présent contrat a pour objet de définir les modalités selon lesquelles la Banque fournira au Client des services de gestion des risques financiers, incluant l'évaluation, la surveillance et la gestion des risques financiers auxquels le Client est exposé dans le cadre de ses activités.</p><h2>Article 2 — Services de gestion des risques financiers</h2><p>La Banque s'engage à fournir les services suivants au Client :</p><p>- Identification et évaluation des risques financiers potentiels encourus par le Client.<br/>- Mise en place de systèmes et procédures de surveillance continue des risques financiers.<br/>- Développement et mise en œuvre de stratégies de gestion des risques financiers, y compris l'utilisation d'instruments financiers dérivés.<br/>- Rapports réguliers sur l'exposition aux risques financiers et les mesures prises pour les gérer.</p><h2>Article 3 — Responsabilités du Client</h2><p>Le Client s'engage à :</p><p>- Fournir à la Banque toutes les informations nécessaires pour évaluer adéquatement les risques financiers auxquels il est exposé.<br/>- Collaborer avec la Banque dans la mise en œuvre des mesures de gestion des risques recommandées.<br/>- Informer immédiatement la Banque de tout changement significatif dans sa situation financière ou dans les facteurs de risque auxquels il est exposé.</p><h2>Article 4 — Confidentialité</h2><p>Les parties conviennent de maintenir la confidentialité de toutes les informations commerciales et financières échangées dans le cadre de ce contrat, sauf autorisation contraire expresse.</p><h2>Article 5 — Durée du contrat</h2><p>Ce contrat entre en vigueur à la date de sa signature par les deux parties et reste en vigueur jusqu'à résiliation par l'une ou l'autre partie moyennant un préavis écrit de {{preavis}} à l'autre partie.</p><h2>Article 6 — Rémunération</h2><p>Les honoraires de la Banque pour les services de gestion des risques financiers seront convenus entre les parties dans un document distinct intitulé « Grille Tarifaire ».</p><h2>Article 7 — Loi applicable et juridiction</h2><p>Ce contrat est régi et interprété conformément aux lois en vigueur dans l'Espace OHADA. Tout litige découlant de ce contrat sera soumis à la juridiction exclusive des tribunaux compétents de {{juridiction}}.</p><p class="signatures">Fait en deux exemplaires originaux, en {{langue}}, à {{ville}}, le {{date_jour}}<br/><br/>Pour la Banque — Pour le Client<br/>Signature du représentant légal de la Banque — Signature du représentant légal du Client<br/>Nom du représentant légal de la Banque — Nom du représentant légal du Client</p></div>`,
    popularity: 22,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Gestion des risques bancaires encadrée par le dispositif prudentiel Bâle II/III applicable dans l’UMOA (Circulaires de la Commission Bancaire) ; couvertures par dérivés soumises à la réglementation des changes UEMOA.' },
      FR: { note: 'Conseil en gestion des risques financiers libre ; l’exécution d’opérations de couverture sur instruments financiers relève des prestataires agréés (Code monétaire et financier, art. L.531-1 s.).' },
    }),
  },
  {
    code: 'bank_reporting_financier',
    name: 'Contrat de reporting financier',
    category: 'commercial_financier',
    price: 2500, priceMax: 4500,
    description: 'Contrat de prestation de reporting financier : collecte et analyse des données financières, préparation de rapports périodiques, conseils d’interprétation, propriété intellectuelle, confidentialité et responsabilité.',
    fieldsJson: F([
      { key: 'prestataire', label: 'Prestataire — société de reporting financier (n° d’enregistrement, adresse du siège, représentant légal et titre)', type: 'textarea', required: true },
      { key: 'client', label: 'Client (société, n° d’enregistrement, adresse du siège, représentant légal et titre)', type: 'textarea', required: true },
      { key: 'duree', label: 'Durée du contrat', type: 'text', required: true },
      { key: 'preavis', label: 'Délai de préavis de résiliation', type: 'text', required: true },
      { key: 'langue', label: 'Langue du contrat', type: 'text', required: true },
      { key: 'ville', label: 'Ville / lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE REPORTING FINANCIER</h1><p><strong>Entre :</strong> {{prestataire}}, agissant en vertu des pouvoirs qui lui sont conférés, ci-après dénommée « le Prestataire de Services », d'une part,</p><p><strong>Et :</strong> {{client}}, agissant en vertu des pouvoirs qui lui sont conférés, ci-après dénommée « le Client », d'autre part.</p><p>Il est convenu ce qui suit :</p><h2>Article 1 — Objet du contrat</h2><p>Le Prestataire de Services s'engage à fournir des services de reporting financier au Client conformément aux termes et conditions énoncés dans le présent contrat.</p><h2>Article 2 — Services fournis</h2><p>Les services fournis par le Prestataire de Services comprennent notamment :</p><p>- La collecte, la compilation et l'analyse des données financières du Client.<br/>- La préparation de rapports financiers périodiques selon les spécifications du Client.<br/>- La fourniture de conseils sur l'interprétation des rapports financiers.</p><h2>Article 3 — Obligations du Client</h2><p>Le Client s'engage à fournir au Prestataire de Services toutes les informations et données financières nécessaires à l'exécution des services de reporting, de manière complète et en temps voulu.</p><h2>Article 4 — Confidentialité</h2><p>Les parties conviennent de garder confidentielles toutes les informations financières échangées dans le cadre de l'exécution du présent contrat, sauf autorisation expresse écrite ou obligation légale de divulguer de telles informations.</p><h2>Article 5 — Propriété intellectuelle</h2><p>Le Client reconnaît que les rapports financiers préparés par le Prestataire de Services sont la propriété intellectuelle de ce dernier. Le Client ne peut reproduire, distribuer ou divulguer ces rapports sans le consentement écrit préalable du Prestataire de Services.</p><h2>Article 6 — Responsabilité</h2><p>Le Prestataire de Services exerce ses fonctions avec le devoir de diligence et de prudence requis par les normes professionnelles en vigueur. Cependant, il ne peut être tenu responsable des pertes résultant de l'utilisation des rapports financiers, sauf en cas de faute lourde ou intentionnelle de sa part.</p><h2>Article 7 — Durée du contrat</h2><p>Le présent contrat entre en vigueur à la date de signature et reste en vigueur pour une durée de {{duree}}, renouvelable par tacite reconduction sauf résiliation par l'une ou l'autre des parties moyennant un préavis écrit de {{preavis}}.</p><h2>Article 8 — Loi applicable</h2><p>Ce contrat est régi et interprété conformément aux lois en vigueur dans l'Espace OHADA.</p><p class="signatures">Fait en deux exemplaires originaux, en {{langue}}, à {{ville}}, le {{date_jour}}<br/><br/>Pour le Prestataire de Services — Pour le Client<br/>Signature du représentant légal du Prestataire de Services — Signature du représentant légal du Client<br/>Nom du représentant légal du Prestataire de Services — Nom du représentant légal du Client</p></div>`,
    popularity: 20,
    countriesJson: JSON.stringify({
      OHADA: { note: 'États financiers établis selon le référentiel SYSCOHADA révisé (Acte uniforme relatif au droit comptable et à l’information financière — AUDCIF).' },
      FR: { note: 'Reporting comptable et financier régi par le Code de commerce (art. L.123-12 s.) et le PCG ; l’établissement des comptes peut relever de l’expertise comptable réglementée (ordonnance de 1945).' },
    }),
  },
  {
    code: 'bank_distribution_produits_financiers',
    name: 'Contrat de distribution de produits financiers',
    category: 'commercial_financier',
    price: 3500, priceMax: 5500,
    description: 'Contrat entre un producteur de produits financiers et un distributeur : produits concernés, zone géographique, exclusivité, obligations des parties, commissions sur les ventes, durée et résiliation.',
    fieldsJson: F([
      { key: 'distributeur', label: 'Distributeur (société, n° d’enregistrement, adresse du siège, représentant légal et titre)', type: 'textarea', required: true },
      { key: 'producteur', label: 'Producteur des produits financiers (société, n° d’enregistrement, adresse du siège, représentant légal et titre)', type: 'textarea', required: true },
      { key: 'produits', label: 'Liste des produits financiers concernés', type: 'textarea', required: true },
      { key: 'exclusivite', label: 'Nature de la distribution', type: 'select', required: true, options: ['exclusive', 'non exclusive'] },
      { key: 'zone', label: 'Zone géographique de distribution', type: 'text', required: true },
      { key: 'duree', label: 'Durée du contrat', type: 'text', required: true },
      { key: 'preavis', label: 'Délai de préavis de résiliation', type: 'text', required: true },
      { key: 'langue', label: 'Langue du contrat', type: 'text', required: true },
      { key: 'ville', label: 'Ville / lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE DISTRIBUTION DE PRODUITS FINANCIERS</h1><p><strong>Entre :</strong> {{distributeur}}, agissant en vertu des pouvoirs qui lui sont conférés, ci-après dénommée « le Distributeur », d'une part,</p><p><strong>Et :</strong> {{producteur}}, agissant en vertu des pouvoirs qui lui sont conférés, ci-après dénommée « le Producteur », d'autre part.</p><p>Il est convenu ce qui suit :</p><h2>Article 1 — Objet du contrat</h2><p>Le Producteur confie au Distributeur la distribution des produits financiers spécifiés dans le présent contrat, et le Distributeur accepte d'agir en tant que distributeur {{exclusivite}} de ces produits dans la zone géographique suivante : <strong>{{zone}}</strong>.</p><h2>Article 2 — Produits financiers concernés</h2><p>Les produits financiers objet du présent contrat sont les suivants : {{produits}}</p><h2>Article 3 — Obligations du Distributeur</h2><p>3.1 Le Distributeur s'engage à promouvoir et à commercialiser les produits financiers du Producteur dans la zone géographique spécifiée.</p><p>3.2 Le Distributeur agira de bonne foi dans l'exercice de ses fonctions et respectera toutes les réglementations en vigueur dans la distribution de produits financiers.</p><h2>Article 4 — Obligations du Producteur</h2><p>4.1 Le Producteur s'engage à fournir au Distributeur les produits financiers conformes aux spécifications convenues, en quantité suffisante pour répondre à la demande du marché.</p><p>4.2 Le Producteur fournira au Distributeur toutes les informations nécessaires sur les caractéristiques, les conditions et les modalités des produits financiers distribués.</p><h2>Article 5 — Paiement et commission</h2><p>5.1 Le Distributeur sera rémunéré sous forme de commissions sur les ventes de produits financiers réalisées dans le cadre du présent contrat. Les modalités de calcul et de paiement des commissions sont définies en annexe au présent contrat.</p><p>5.2 Les commissions seront payées par le Producteur au Distributeur selon les modalités convenues, et ce dans les délais spécifiés.</p><h2>Article 6 — Durée du contrat</h2><p>Le présent contrat entre en vigueur à la date de sa signature et reste en vigueur pour une durée de {{duree}}, renouvelable par tacite reconduction sauf résiliation par l'une ou l'autre des parties moyennant un préavis écrit de {{preavis}}.</p><h2>Article 7 — Résiliation</h2><p>En cas de non-respect des obligations contractuelles par l'une ou l'autre des parties, ce contrat pourra être résilié par l'autre partie moyennant un préavis écrit de {{preavis}}.</p><h2>Article 8 — Loi applicable</h2><p>Ce contrat est régi et interprété conformément aux lois en vigueur dans l'Espace OHADA.</p><p class="signatures">Fait en deux exemplaires originaux, en {{langue}}, à {{ville}}, le {{date_jour}}<br/><br/>Pour le Distributeur — Pour le Producteur<br/>Signature du représentant légal du Distributeur — Signature du représentant légal du Producteur<br/>Nom du représentant légal du Distributeur — Nom du représentant légal du Producteur</p></div>`,
    popularity: 24,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Démarchage et distribution de produits financiers dans l’UMOA soumis à l’agrément et au contrôle de l’AMF-UMOA (apporteurs d’affaires, démarcheurs) et de la BCEAO pour les produits bancaires.' },
      FR: { note: 'Distribution encadrée par le Code monétaire et financier : statut d’agent lié, CIF ou IOBSP selon les produits ; gouvernance des produits (MIF 2) applicable entre producteur et distributeur.' },
    }),
  },
  {
    code: 'bank_conseil_strategie_financiere',
    name: 'Contrat de conseil en stratégie financière',
    category: 'commercial_financier',
    price: 3000, priceMax: 5000,
    description: 'Contrat de conseil en stratégie financière : évaluation de la situation financière, analyse des tendances de marché, recommandations d’investissement, assistance à la mise en œuvre, suivi des performances, honoraires et confidentialité.',
    fieldsJson: F([
      { key: 'consultant', label: 'Consultant en stratégie financière (société, n° d’enregistrement, adresse du siège, représentant légal et titre)', type: 'textarea', required: true },
      { key: 'client', label: 'Société cliente (n° d’enregistrement, adresse du siège, représentant légal et titre)', type: 'textarea', required: true },
      { key: 'honoraires', label: 'Modalités de facturation des honoraires (tarif horaire, forfait…)', type: 'textarea', required: true },
      { key: 'duree', label: 'Durée du contrat', type: 'text', required: true },
      { key: 'preavis', label: 'Délai de préavis de résiliation', type: 'text', required: true },
      { key: 'langue', label: 'Langue du contrat', type: 'text', required: true },
      { key: 'ville', label: 'Ville / lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE CONSEIL EN STRATÉGIE FINANCIÈRE</h1><p><strong>Entre :</strong> {{consultant}}, dûment habilitée à cet effet, ci-après dénommée « le Consultant en Stratégie Financière »,</p><p><strong>Et :</strong> {{client}}, dûment habilitée à cet effet, ci-après dénommée « le Client ».</p><p>Ci-après dénommés collectivement les « Parties » et individuellement une « Partie ».</p><p><strong>Considérant ce qui suit :</strong></p><p>- Le Consultant en Stratégie Financière est une société spécialisée dans le domaine du conseil en stratégie financière et est en mesure de fournir des services de conseil adaptés aux besoins du Client.<br/>- Le Client souhaite obtenir des conseils professionnels en matière de stratégie financière pour améliorer ses performances et atteindre ses objectifs financiers.</p><p>En conséquence, les Parties conviennent ce qui suit :</p><h2>Article 1 — Objet</h2><p>Le Consultant en Stratégie Financière s'engage à fournir au Client des services de conseil en stratégie financière, conformément aux termes et conditions énoncés dans le présent contrat.</p><h2>Article 2 — Services de conseil en stratégie financière</h2><p>Les services fournis par le Consultant en Stratégie Financière peuvent inclure, mais ne sont pas limités à :</p><p>- L'évaluation de la situation financière actuelle du Client.<br/>- L'analyse des tendances du marché financier pertinentes pour le Client.<br/>- La recommandation de stratégies d'investissement adaptées aux objectifs du Client.<br/>- L'assistance dans la mise en œuvre des stratégies financières recommandées.<br/>- Le suivi et l'évaluation des performances financières du Client.</p><h2>Article 3 — Obligations du Client</h2><p>Le Client s'engage à fournir au Consultant en Stratégie Financière toutes les informations nécessaires pour permettre une évaluation précise de sa situation financière et de ses besoins.</p><h2>Article 4 — Confidentialité</h2><p>Les Parties s'engagent à maintenir la confidentialité de toutes les informations et des données auxquelles elles ont accès dans le cadre de l'exécution du présent contrat.</p><h2>Article 5 — Honoraires</h2><p>Les honoraires du Consultant en Stratégie Financière pour les services rendus dans le cadre de ce contrat sont définis comme suit : {{honoraires}}</p><h2>Article 6 — Durée du contrat</h2><p>Ce contrat entre en vigueur à la date de sa signature par les deux parties et reste en vigueur pour une durée de {{duree}}, sauf résiliation anticipée conformément aux dispositions prévues dans le présent contrat.</p><h2>Article 7 — Résiliation</h2><p>Chaque partie peut résilier ce contrat moyennant un préavis écrit de {{preavis}} adressé à l'autre partie.</p><h2>Article 8 — Loi applicable</h2><p>Ce contrat est régi et interprété conformément aux lois en vigueur dans l'Espace OHADA.</p><p class="signatures">Fait en deux exemplaires originaux, en {{langue}}, à {{ville}}, le {{date_jour}}<br/><br/>Pour le Consultant en Stratégie Financière — Pour le Client<br/>Signature du Représentant Légal du Consultant — Signature du Représentant Légal du Client<br/>Nom du Représentant Légal du Consultant — Nom du Représentant Légal du Client</p></div>`,
    popularity: 25,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Conseil financier libre sous réserve des activités réglementées (conseil en investissement sur le marché régional soumis à l’agrément AMF-UMOA).' },
      FR: { note: 'Conseil en stratégie libre ; le conseil en investissements financiers relève du statut CIF (Code monétaire et financier, art. L.541-1) avec adhésion à une association agréée AMF.' },
    }),
  },

  // ════════════════════ CONFORMITÉ & RELATION BANCAIRE ════════════════════
  {
    code: 'bank_conformite_reglementaire',
    name: 'Contrat de conformité réglementaire (services bancaires)',
    category: 'commercial_financier',
    price: 3500, priceMax: 5500,
    description: 'Contrat entre une banque et une société de conformité : évaluation de la conformité, procédures internes, formation du personnel, surveillance des risques de non-conformité (KYC/LBC-FT), rapports réglementaires et audits.',
    fieldsJson: F([
      { key: 'banque', label: 'Banque (n° d’enregistrement, adresse du siège, représentant légal et titre)', type: 'textarea', required: true },
      { key: 'societe_conformite', label: 'Société de conformité (n° d’enregistrement, adresse du siège, représentant légal et titre)', type: 'textarea', required: true },
      { key: 'duree', label: 'Durée du contrat', type: 'text', required: true },
      { key: 'preavis', label: 'Délai de préavis de résiliation', type: 'text', required: true },
      { key: 'langue', label: 'Langue du contrat', type: 'text', required: true },
      { key: 'ville', label: 'Ville / lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE CONFORMITÉ RÉGLEMENTAIRE</h1><p><strong>Entre :</strong> {{banque}}, dûment habilitée à cet effet, ci-après dénommée « la Banque »,</p><p><strong>Et :</strong> {{societe_conformite}}, dûment habilitée à cet effet, ci-après dénommée « la Société de Conformité ».</p><p>Ci-après dénommées collectivement les « Parties » et individuellement une « Partie ».</p><p><strong>Considérant ce qui suit :</strong></p><p>- La Banque est soucieuse de respecter toutes les lois, réglementations et normes applicables dans le cadre de ses activités bancaires.<br/>- La Société de Conformité est une société spécialisée dans le domaine de la conformité réglementaire et est en mesure de fournir des services de conseil et d'assistance à la Banque pour assurer sa conformité.<br/>- Les Parties souhaitent conclure un contrat pour définir les termes et conditions de la prestation des services de conformité réglementaire.</p><p>En conséquence, les Parties conviennent ce qui suit :</p><h2>Article 1 — Objet</h2><p>La Société de Conformité s'engage à fournir à la Banque des services de conseil et d'assistance en matière de conformité réglementaire, conformément aux termes et conditions énoncés dans le présent contrat.</p><h2>Article 2 — Services de conformité réglementaire</h2><p>Les services fournis par la Société de Conformité peuvent inclure, mais ne sont pas limités à :</p><p>- L'évaluation de la conformité de la Banque avec les lois et réglementations en vigueur.<br/>- La mise en place de procédures internes pour assurer la conformité réglementaire.<br/>- La formation du personnel de la Banque sur les questions de conformité.<br/>- La surveillance régulière des activités de la Banque pour identifier les risques de non-conformité.<br/>- L'assistance dans la préparation des rapports réglementaires et des audits.</p><h2>Article 3 — Obligations de la Banque</h2><p>La Banque s'engage à fournir à la Société de Conformité toutes les informations et les accès nécessaires pour mener à bien les services de conformité réglementaire.</p><h2>Article 4 — Confidentialité</h2><p>Les Parties s'engagent à maintenir la confidentialité de toutes les informations et des données auxquelles elles ont accès dans le cadre de l'exécution du présent contrat.</p><h2>Article 5 — Durée du contrat</h2><p>Ce contrat entre en vigueur à la date de sa signature par les deux parties et reste en vigueur pour une durée de {{duree}}, sauf résiliation anticipée conformément aux dispositions prévues dans le présent contrat.</p><h2>Article 6 — Résiliation</h2><p>Chaque partie peut résilier ce contrat moyennant un préavis écrit de {{preavis}} adressé à l'autre partie.</p><h2>Article 7 — Loi applicable</h2><p>Ce contrat est régi et interprété conformément aux lois en vigueur dans l'Espace OHADA.</p><p class="signatures">Fait en deux exemplaires originaux, en {{langue}}, à {{ville}}, le {{date_jour}}<br/><br/>Pour la Banque — Pour la Société de Conformité<br/>Signature du Représentant Légal de la Banque — Signature du Représentant Légal de la Société de Conformité<br/>Nom du Représentant Légal de la Banque — Nom du Représentant Légal de la Société de Conformité</p></div>`,
    popularity: 24,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Conformité bancaire encadrée dans l’UMOA par la Loi uniforme LBC/FT (transposant la Directive n°02/2015/CM/UEMOA), les circulaires de la Commission Bancaire (gouvernance, contrôle interne) et les diligences KYC de la BCEAO.' },
      FR: { note: 'Dispositif LCB-FT du Code monétaire et financier (art. L.561-1 s.) et arrêté du 6 janvier 2021 ; la fonction conformité peut être externalisée sous conditions (arrêté du 3 novembre 2014).' },
    }),
  },
  {
    code: 'bank_mediation_bancaire',
    name: 'Contrat de médiation bancaire',
    category: 'commercial_financier',
    price: 2500, priceMax: 4500,
    description: 'Contrat par lequel une banque engage un médiateur indépendant pour la résolution amiable des différends avec ses clients : méthodes de médiation, indépendance et impartialité, confidentialité, honoraires et durée.',
    fieldsJson: F([
      { key: 'banque', label: 'Banque (n° d’enregistrement, adresse du siège, représentant légal et titre)', type: 'textarea', required: true },
      { key: 'mediateur', label: 'Médiateur (nom, statut personne physique/morale, domicile ou siège)', type: 'textarea', required: true },
      { key: 'langue', label: 'Langue du contrat', type: 'text', required: true },
      { key: 'ville', label: 'Ville / lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE MÉDIATION BANCAIRE</h1><p><strong>Entre :</strong> {{banque}}, agissant en vertu des pouvoirs qui lui sont conférés, ci-après dénommée « la Banque », d'une part,</p><p><strong>Et :</strong> {{mediateur}}, spécialisé dans la médiation bancaire, ci-après dénommé « le Médiateur », d'autre part.</p><p>Il est convenu ce qui suit :</p><h2>Article 1 — Objet du contrat</h2><p>La Banque engage le Médiateur pour agir en tant que tiers neutre dans la résolution des différends entre la Banque et ses clients.</p><h2>Article 2 — Méthodes de médiation</h2><p>Le Médiateur s'engage à utiliser des méthodes de médiation appropriées pour faciliter la communication entre la Banque et ses clients, à aider à identifier les problèmes, à explorer les options de règlement et à faciliter un accord mutuellement acceptable.</p><h2>Article 3 — Indépendance et impartialité</h2><p>Le Médiateur agira de manière indépendante et impartiale, sans prendre parti pour l'une ou l'autre des parties. Il respectera les principes de confidentialité tout au long du processus de médiation.</p><h2>Article 4 — Confidentialité</h2><p>Toutes les discussions, documents et informations partagés dans le cadre de la médiation seront confidentiels et ne seront divulgués à aucune autre partie sans le consentement écrit préalable des parties concernées, sauf dans les cas prévus par la loi.</p><h2>Article 5 — Honoraires du Médiateur</h2><p>Les honoraires du Médiateur seront convenus entre les parties avant le début de la médiation et seront basés sur le temps passé, les frais de déplacement et autres frais liés à la médiation.</p><h2>Article 6 — Durée du contrat</h2><p>Ce contrat entrera en vigueur à la date de signature par les deux parties et restera en vigueur jusqu'à ce que toutes les questions en suspens aient été résolues ou jusqu'à ce que les parties décident de mettre fin à la médiation.</p><h2>Article 7 — Loi applicable</h2><p>Ce contrat est régi et interprété conformément aux lois en vigueur dans l'Espace OHADA.</p><p class="signatures">Fait en deux exemplaires originaux, en {{langue}}, à {{ville}}, le {{date_jour}}<br/><br/>Pour la Banque — Pour le Médiateur<br/>Signature du Représentant Légal de la Banque — Signature du Médiateur<br/>Nom du Représentant Légal de la Banque — Nom du Médiateur</p></div>`,
    popularity: 15,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Médiation régie par l’Acte uniforme OHADA relatif à la médiation (23/11/2017) ; dispositifs de médiation bancaire promus par les Observatoires de la qualité des services financiers de l’UMOA.' },
      FR: { note: 'Médiateur bancaire obligatoire et gratuit pour les clients particuliers (Code monétaire et financier, art. L.316-1) ; médiation de la consommation régie par le Code de la consommation (art. L.611-1 s.).' },
    }),
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

  console.log('✅ Seed Drive3 Banque (IBI079 — passe profonde n°2) terminé.');
  console.log(`   Templates du script : ${templates.length} (créés : ${created}, mis à jour : ${updated})`);
  console.log('   Répartition par catégorie (ce script) :');
  for (const [cat, n] of Object.entries(byCategory)) console.log(`     - ${cat} : ${n}`);
  console.log(`   Variantes pays (countriesJson) : ${withCountries} templates`);
  console.log(`   ➜ Total de templates en base : ${total}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
