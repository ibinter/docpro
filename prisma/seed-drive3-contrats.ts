// Seed Drive3 Contrats — Agent Drive3-5/10 : PASSE PROFONDE n°2 sur le
// MÉGA PACK JUR-006 « 160 Modèles de Contrats Utiles » du Drive IBIG
// (dossier 1LcOTXd-8hoLnrNXIyihf1oieqqOgbBC7 — 171 fichiers, 2 pages).
// 25 contrats DISTINCTS et UTILES, absents du catalogue existant, dont 5 templates
// « à select » fusionnant les familles pléthoriques du pack.
//
// FUSIONS documentées (variantes proches consolidées en un seul template + champ select) :
//   • ctr_services_conseil        ← « CONTRAT DE SERVICES DE CONSEIL » + toutes les variantes
//                                     « … DE CONSEIL EN X » (stratégie d'entreprise, RH, marketing
//                                     stratégique, gestion de projet, gestion de crise, conformité
//                                     réglementaire, financier, expansion internationale, marque…)
//                                     → champ {{domaine}} à options.
//   • ctr_partenariat_projet      ← ~20 « CONTRAT DE PARTENARIAT POUR PROJET DE DÉVELOPPEMENT DE X »
//                                     (énergies renouvelables, applications mobiles, IoT, IA santé,
//                                     immobilier durable, déchets, ressources hydriques, éducatif…)
//                                     → champ {{domaine_projet}} à options.
//   • ctr_conseil_supply_chain    ← ~8 « CONTRAT DE PRESTATION DE SERVICES DE CONSEIL EN GESTION
//                                     DE LA CHAÎNE D'APPROVISIONNEMENT DE X » (alimentaire, chimique,
//                                     textile, pharmaceutique, électronique, beauté, tech…)
//                                     → champ {{secteur}} à options.
//   • ctr_developpement_logiciel  ← « CONTRAT DE DEVELOPPEMENT DE LOGICIEL » + « … PRESTATION DE
//                                     SERVICES DE DÉVELOPPEMENT DE LOGICIEL » + « … PROJET DE
//                                     DÉVELOPPEMENT D'APPLICATIONS MOBILES ».
//   • ctr_traduction              ← « CONTRAT DE SERVICES DE TRADUCTION » + « … DE TRADUCTION
//                                     JURIDIQUE ».
//
// Script ADDITIF : upsert par code — n'écrase aucun template existant.
// Exécution : npx tsx prisma/seed-drive3-contrats.ts
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
  // ════════════════════ FUSIONS À SELECT (5) ════════════════════
  {
    code: 'ctr_services_conseil',
    name: 'Contrat de services de conseil',
    category: 'commercial_financier',
    price: 2500, priceMax: 4500,
    description: 'Contrat par lequel un consultant fournit à un client des services de conseil dans un domaine choisi (stratégie, RH, marketing, gestion de projet, conformité, finance…) : objet, honoraires, confidentialité, résiliation.',
    fieldsJson: F([
      { key: 'consultant', label: 'Consultant (société + adresse + représentant légal)', type: 'textarea', required: true },
      { key: 'client', label: 'Client (société + adresse + représentant légal)', type: 'textarea', required: true },
      { key: 'domaine', label: 'Domaine du conseil', type: 'select', required: true, options: ['Stratégie d’entreprise', 'Marketing stratégique', 'Ressources humaines', 'Gestion de projet', 'Gestion de crise', 'Conformité réglementaire', 'Conseil financier', 'Chaîne logistique', 'Expansion internationale', 'Développement de marque', 'Autre'] },
      { key: 'description_services', label: 'Description détaillée des services de conseil', type: 'textarea', required: true },
      { key: 'duree', label: 'Durée du contrat (mois ou années)', type: 'text', required: true },
      { key: 'honoraires', label: 'Honoraires et modalités de paiement', type: 'text', required: true },
      { key: 'preavis', label: 'Préavis de résiliation (en jours)', type: 'text', required: true },
      { key: 'juridiction', label: 'Loi applicable et tribunaux compétents', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE SERVICES DE CONSEIL</h1><p><strong>ENTRE :</strong> {{consultant}}, ci-après dénommé le « Consultant »,</p><p><strong>ET :</strong> {{client}}, ci-après dénommé le « Client ».</p><h2>1. Objet du contrat</h2><p>Le Consultant s'engage à fournir au Client des services de conseil en <strong>{{domaine}}</strong>, décrits comme suit : {{description_services}} (ci-après les « Services »), conformément aux termes et conditions du présent contrat.</p><h2>2. Durée du contrat</h2><p>Ce contrat entre en vigueur à compter de la date de signature et restera en vigueur pour une durée de {{duree}}, à moins qu'il ne soit résilié conformément aux termes énoncés dans ce contrat.</p><h2>3. Engagements du Consultant</h2><p>3.1 Le Consultant s'engage à fournir les Services conformément aux normes professionnelles les plus élevées, en faisant preuve de compétence, de diligence et de soins raisonnables.</p><p>3.2 Le Consultant s'engage à maintenir la confidentialité de toutes les informations confidentielles du Client auxquelles il peut avoir accès pendant la prestation des Services.</p><h2>4. Engagements du Client</h2><p>4.1 Le Client s'engage à payer au Consultant les honoraires convenus : <strong>{{honoraires}}</strong>.</p><p>4.2 Le Client coopérera avec le Consultant en fournissant les informations et l'accès nécessaires à la prestation des Services.</p><h2>5. Résiliation</h2><p>Ce contrat peut être résilié par l'une ou l'autre des parties en cas de non-respect substantiel des termes et conditions par l'autre partie, moyennant un préavis écrit de {{preavis}} jours.</p><h2>6. Dispositions générales</h2><p>6.1 <strong>Loi applicable :</strong> ce contrat est régi par les lois de {{juridiction}}.</p><p>6.2 <strong>Intégralité de l'accord :</strong> ce contrat constitue l'intégralité de l'accord entre les parties et remplace tous les accords antérieurs ou simultanés, écrits ou verbaux, relatifs à son objet.</p><p>6.3 <strong>Modification :</strong> toute modification de ce contrat doit être faite par écrit et signée par les deux parties.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>POUR LE CONSULTANT — POUR LE CLIENT<br/>Signature — Signature<br/>Nom et titre du représentant légal — Nom et titre du représentant légal</p></div>`,
    popularity: 52,
  },
  {
    code: 'ctr_partenariat_projet',
    name: 'Contrat de partenariat pour projet de développement',
    category: 'commercial_financier',
    price: 3000, priceMax: 5000,
    description: 'Contrat de partenariat entre deux parties pour le développement, la mise en œuvre et l’exploitation d’un projet dans un domaine choisi : engagements respectifs, répartition des coûts, partage des profits, propriété intellectuelle et médiation.',
    fieldsJson: F([
      { key: 'partie_a', label: 'Partie A (société + juridiction + siège social)', type: 'textarea', required: true },
      { key: 'partie_b', label: 'Partie B (société + juridiction + siège social)', type: 'textarea', required: true },
      { key: 'domaine_projet', label: 'Domaine du projet de développement', type: 'select', required: true, options: ['Énergies renouvelables', 'Applications mobiles', 'Internet des objets (IoT)', 'Intelligence artificielle appliquée à la santé', 'Immobilier durable', 'Gestion des déchets', 'Ressources hydriques', 'Développement éducatif', 'Infrastructure', 'Tourisme', 'Autre'] },
      { key: 'engagements_a', label: 'Engagements de la Partie A (financement, terrains, construction…)', type: 'textarea', required: true },
      { key: 'engagements_b', label: 'Engagements de la Partie B (technologie, exploitation, permis…)', type: 'textarea', required: true },
      { key: 'repartition', label: 'Répartition des coûts et partage des profits', type: 'textarea', required: true },
      { key: 'duree', label: 'Durée du contrat', type: 'text', required: true },
      { key: 'preavis', label: 'Préavis de résiliation (en jours)', type: 'text', required: true },
      { key: 'juridiction', label: 'Loi applicable et lieu de médiation', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE PARTENARIAT POUR PROJET DE DÉVELOPPEMENT</h1><p><strong>ENTRE :</strong> {{partie_a}}, ci-après dénommée « Partie A »,</p><p><strong>ET :</strong> {{partie_b}}, ci-après dénommée « Partie B »</p><p>(individuellement une « Partie » et collectivement les « Parties »).</p><h2>1. Objet du contrat</h2><p>Le présent contrat vise à établir une collaboration entre les Parties en vue du développement, de la mise en œuvre et de l'exploitation d'un projet en <strong>{{domaine_projet}}</strong>, conformément aux termes et conditions énoncés ci-dessous.</p><h2>2. Durée du contrat</h2><p>Ce contrat entrera en vigueur à la date de sa signature par toutes les Parties et demeurera en vigueur pour une durée de {{duree}}, sauf résiliation anticipée conformément à ses dispositions.</p><h2>3. Engagements des Parties</h2><p>3.1 <strong>Partie A :</strong> {{engagements_a}}</p><p>3.2 <strong>Partie B :</strong> {{engagements_b}}</p><h2>4. Financement et partage des profits</h2><p>Les coûts associés au projet et le partage des profits générés sont répartis comme suit : {{repartition}}</p><h2>5. Propriété intellectuelle</h2><p>Les droits de propriété intellectuelle relatifs au projet développé en vertu du présent contrat seront détenus conjointement par les Parties, sauf disposition contraire prévue dans un accord distinct.</p><h2>6. Résiliation</h2><p>Ce contrat peut être résilié par l'une ou l'autre des Parties en cas de non-respect substantiel des obligations contractuelles par l'autre Partie, sous réserve d'un préavis écrit de {{preavis}} jours.</p><h2>7. Dispositions générales</h2><p>7.1 <strong>Loi applicable :</strong> ce contrat sera régi et interprété conformément aux lois de {{juridiction}}.</p><p>7.2 <strong>Règlement des différends :</strong> tout différend sera soumis à la médiation avant tout recours judiciaire.</p><p>7.3 <strong>Intégralité de l'accord :</strong> ce contrat remplace tout accord antérieur, écrit ou verbal, relatif à son objet.</p><p class="signatures">En foi de quoi, les Parties ont signé le {{date_jour}}<br/><br/>PARTIE A — PARTIE B<br/>Signature — Signature<br/>Nom et fonction — Nom et fonction</p></div>`,
    popularity: 45,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Partenariat innommé relevant de la liberté contractuelle ; en cas de société créée de fait ou en participation, application de l’Acte uniforme sur les sociétés commerciales et le GIE (AUSCGIE).' },
      FR: { note: 'Contrat de partenariat / société en participation (art. 1871 s. du Code civil) ; copropriété des droits de PI à préciser par écrit (art. L.113-3 CPI).' },
    }),
  },
  {
    code: 'ctr_conseil_supply_chain',
    name: 'Contrat de conseil en gestion de la chaîne d’approvisionnement',
    category: 'commercial_financier',
    price: 2800, priceMax: 4800,
    description: 'Contrat par lequel un cabinet de conseil accompagne un client dans l’optimisation de sa chaîne d’approvisionnement pour un secteur choisi : évaluation, recommandations, mise en œuvre, honoraires et confidentialité.',
    fieldsJson: F([
      { key: 'cabinet', label: 'Cabinet de conseil (société + pays + siège + représentant)', type: 'textarea', required: true },
      { key: 'client', label: 'Client (personne morale + pays + siège + représentant)', type: 'textarea', required: true },
      { key: 'secteur', label: 'Secteur de la chaîne d’approvisionnement', type: 'select', required: true, options: ['Produits alimentaires', 'Produits alimentaires biologiques', 'Produits chimiques', 'Textile et habillement durable', 'Produits pharmaceutiques', 'Produits électroniques industriels', 'Produits technologiques de pointe', 'Produits de beauté', 'Logistique générale', 'Autre'] },
      { key: 'description_services', label: 'Description des services (évaluation, optimisation, livrables, honoraires)', type: 'textarea', required: true },
      { key: 'juridiction', label: 'Loi applicable (pays)', type: 'text', required: true },
      { key: 'ville', label: 'Ville des tribunaux compétents', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE PRESTATION DE SERVICES DE CONSEIL EN GESTION DE LA CHAÎNE D'APPROVISIONNEMENT</h1><p>Ce contrat (le « Contrat ») est conclu entre {{cabinet}}, ci-après dénommée « le Cabinet de Conseil », et {{client}}, ci-après dénommée « le Client » (ci-après collectivement les « Parties »).</p><p><strong>CONSIDÉRANT</strong> que le Client souhaite bénéficier des services de conseil en gestion de la chaîne d'approvisionnement dans le secteur <strong>{{secteur}}</strong>, et que le Cabinet de Conseil possède l'expertise nécessaire ;</p><h2>Article 1 - Objet du contrat</h2><p>Le Cabinet de Conseil s'engage à fournir au Client des services de conseil en gestion de la chaîne d'approvisionnement, incluant l'évaluation de la chaîne existante, la recommandation de mesures d'optimisation et l'assistance à leur mise en œuvre.</p><h2>Article 2 - Modalités des services</h2><p>2.1 Les services sont fournis conformément aux spécifications suivantes : {{description_services}}</p><p>2.2 Le Cabinet de Conseil assignera des consultants qualifiés pour réaliser les services.</p><h2>Article 3 - Honoraires et paiement</h2><p>En contrepartie des services fournis, le Client versera au Cabinet de Conseil les honoraires et selon les modalités décrits ci-dessus.</p><h2>Article 4 - Confidentialité</h2><p>Le Cabinet de Conseil s'engage à maintenir la confidentialité de toutes les informations confidentielles du Client auxquelles il a accès.</p><h2>Article 5 - Responsabilité</h2><p>Le Cabinet de Conseil exécutera les services avec le soin et la diligence requis. Il ne sera pas responsable des dommages indirects ou consécutifs, sauf en cas de faute grave ou de négligence grave.</p><h2>Article 6 - Loi applicable et juridiction</h2><p>Ce Contrat est régi et interprété conformément aux lois de {{juridiction}}. Tout litige sera soumis à la juridiction exclusive des tribunaux de {{ville}}.</p><p class="signatures">Fait le {{date_jour}}, en deux exemplaires originaux<br/><br/>LE CABINET DE CONSEIL — LE CLIENT<br/>Signature — Signature<br/>Nom et titre du représentant légal — Nom et titre du représentant légal</p></div>`,
    popularity: 38,
  },
  {
    code: 'ctr_developpement_logiciel',
    name: 'Contrat de développement de logiciel',
    category: 'commercial_financier',
    price: 3000, priceMax: 5000,
    description: 'Contrat par lequel un développeur réalise pour un client un logiciel, une application ou un site sur mesure : spécifications, délais, paiement échelonné, propriété du code source, support et confidentialité.',
    fieldsJson: F([
      { key: 'client', label: 'Client (nom / société + adresse + contact)', type: 'textarea', required: true },
      { key: 'developpeur', label: 'Développeur (nom / société + adresse + contact)', type: 'textarea', required: true },
      { key: 'description_projet', label: 'Description du projet (spécifications et utilisation prévue)', type: 'textarea', required: true },
      { key: 'delais', label: 'Délais (date de début et date d’achèvement prévues)', type: 'text', required: true },
      { key: 'montant', label: 'Montant total et échéancier de paiement', type: 'text', required: true },
      { key: 'garantie', label: 'Durée du support et de la maintenance après livraison (ex. 90 jours)', type: 'text', required: true },
      { key: 'juridiction', label: 'Loi applicable', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE DÉVELOPPEMENT DE LOGICIEL</h1><p><strong>ENTRE :</strong> {{client}}, ci-après dénommé « le Client »,</p><p><strong>ET :</strong> {{developpeur}}, ci-après dénommé « le Développeur ».</p><h2>1. Description du projet</h2><p>Le Client engage le Développeur pour développer un logiciel personnalisé selon les spécifications suivantes : {{description_projet}}.</p><h2>2. Délais</h2><p>{{delais}}. Les deux parties reconnaissent que des retards peuvent survenir en raison de circonstances imprévues, mais le Développeur s'efforcera de respecter les délais.</p><h2>3. Paiement</h2><p>Le Client versera au Développeur la somme convenue pour le développement du logiciel selon les modalités suivantes : <strong>{{montant}}</strong>. Un paiement initial est dû à la signature du contrat, les paiements ultérieurs étant effectués selon l'échéancier convenu jusqu'au règlement intégral.</p><h2>4. Droit de propriété intellectuelle</h2><p>Une fois le paiement intégral reçu, le logiciel, y compris le code source, sera la propriété exclusive du Client. Le Développeur peut conserver une copie du code source à des fins de référence personnelle.</p><h2>5. Soutien et maintenance</h2><p>Le Développeur fournira un soutien et une maintenance du logiciel pour une période de {{garantie}} à compter de la livraison.</p><h2>6. Confidentialité</h2><p>Le Développeur et le Client s'engagent à maintenir la confidentialité de toutes les informations confidentielles échangées pendant le projet.</p><h2>7. Loi applicable</h2><p>Ce contrat est régi par les lois de {{juridiction}}.</p><p class="signatures">Fait le {{date_jour}}, en deux exemplaires ayant même valeur légale<br/><br/>LE CLIENT — LE DÉVELOPPEUR<br/>Signature — Signature<br/>Nom — Nom</p></div>`,
    popularity: 50,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Le logiciel est protégé par le droit d’auteur (Accord de Bangui / OAPI, Annexe VII) ; la cession du code source au Client doit être stipulée par écrit.' },
      FR: { note: 'Développement de logiciel sur commande : la titularité des droits (art. L.111-1 et L.131-3 CPI) suppose une cession écrite précise ; garantie légale des vices.' },
    }),
  },
  {
    code: 'ctr_traduction',
    name: 'Contrat de services de traduction',
    category: 'commercial_financier',
    price: 1500, priceMax: 3000,
    description: 'Contrat par lequel un traducteur fournit à un client des services de traduction (généraux ou juridiques) : documents et langues, tarif au mot ou à la page, délais, qualité, propriété intellectuelle et confidentialité.',
    fieldsJson: F([
      { key: 'traducteur', label: 'Traducteur (nom / société + adresse + contact)', type: 'textarea', required: true },
      { key: 'client', label: 'Client (nom / société + adresse + contact)', type: 'textarea', required: true },
      { key: 'documents', label: 'Documents à traduire, langue source, langue cible et volume estimé', type: 'textarea', required: true },
      { key: 'delai_livraison', label: 'Date limite de livraison', type: 'text', required: true },
      { key: 'tarif', label: 'Tarif (par mot / page) et modalités de paiement', type: 'text', required: true },
      { key: 'preavis', label: 'Préavis de résiliation (en jours)', type: 'text', required: true },
      { key: 'juridiction', label: 'Loi applicable et tribunaux compétents', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE SERVICES DE TRADUCTION</h1><p><strong>ENTRE :</strong> {{traducteur}}, ci-après dénommé le « Traducteur »,</p><p><strong>ET :</strong> {{client}}, ci-après dénommé le « Client ».</p><h2>1. Objet du contrat</h2><p>Le présent contrat a pour objet de définir les conditions dans lesquelles le Traducteur fournira des services de traduction au Client.</p><h2>2. Description des services</h2><p>Le Traducteur s'engage à fournir des services de traduction pour les éléments suivants : {{documents}}. Date limite de livraison : {{delai_livraison}}.</p><h2>3. Tarification et paiement</h2><p>Le tarif des services de traduction et les modalités de paiement sont les suivants : <strong>{{tarif}}</strong>.</p><h2>4. Qualité et délais</h2><p>4.1 Le Traducteur s'engage à fournir des services de traduction de haute qualité conformément aux normes de l'industrie.</p><p>4.2 La date de livraison prévue est indicative et peut être modifiée d'un commun accord en cas de circonstances exceptionnelles.</p><h2>5. Droits de propriété intellectuelle</h2><p>Tous les droits de propriété intellectuelle sur les traductions produites appartiendront au Client une fois le paiement intégral reçu par le Traducteur.</p><h2>6. Confidentialité</h2><p>Le Traducteur s'engage à traiter toutes les informations fournies par le Client de manière confidentielle.</p><h2>7. Résiliation</h2><p>Le Client ou le Traducteur peut résilier ce contrat par écrit moyennant un préavis de {{preavis}} jours.</p><h2>8. Loi applicable et juridiction compétente</h2><p>Ce contrat est régi par les lois de {{juridiction}} et tout litige sera soumis à la juridiction exclusive des tribunaux compétents de ce ressort.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>LE TRADUCTEUR — LE CLIENT<br/>Signature — Signature</p></div>`,
    popularity: 30,
  },

  // ════════════════════ SERVICES NUMÉRIQUES & COMMUNICATION (6) ════════════════════
  {
    code: 'ctr_hebergement_saas',
    name: 'Contrat de prestation de services en ligne (hébergement / SaaS)',
    category: 'commercial_financier',
    price: 2500, priceMax: 4500,
    description: 'Contrat régissant la fourniture de services en ligne (hébergement web, application SaaS, prestations à distance) : description des services, paiement, propriété intellectuelle, confidentialité, résiliation et signature électronique.',
    fieldsJson: F([
      { key: 'prestataire', label: 'Prestataire (entreprise / individu + adresse)', type: 'textarea', required: true },
      { key: 'client', label: 'Client (entreprise / individu + adresse)', type: 'textarea', required: true },
      { key: 'description_services', label: 'Description détaillée des services (hébergement, SaaS, délais…)', type: 'textarea', required: true },
      { key: 'montant', label: 'Montant total et modalités de paiement', type: 'text', required: true },
      { key: 'propriete', label: 'Titulaire des droits de propriété intellectuelle (Client ou Prestataire)', type: 'text', required: true },
      { key: 'preavis', label: 'Préavis de résiliation (en jours)', type: 'text', required: true },
      { key: 'juridiction', label: 'Loi applicable et tribunaux compétents', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE PRESTATION DE SERVICES EN LIGNE</h1><p><strong>ENTRE :</strong> {{prestataire}}, ci-après dénommé le « Prestataire »,</p><p><strong>ET :</strong> {{client}}, ci-après dénommé le « Client ».</p><h2>1. Objet du contrat</h2><p>Le présent contrat a pour objet de régir la prestation de services en ligne par le Prestataire au Client.</p><h2>2. Description des services</h2><p>Le Prestataire s'engage à fournir au Client les services suivants : {{description_services}}.</p><h2>3. Paiement</h2><p>En contrepartie des services fournis, le Client s'engage à payer les frais selon les modalités suivantes : <strong>{{montant}}</strong>.</p><h2>4. Droits de propriété intellectuelle</h2><p>Tous les droits de propriété intellectuelle découlant des services fournis en vertu du présent contrat seront la propriété de : {{propriete}}.</p><h2>5. Confidentialité</h2><p>Les parties conviennent de maintenir la confidentialité de toutes les informations confidentielles obtenues dans le cadre de l'exécution de ce contrat.</p><h2>6. Résiliation</h2><p>Ce contrat peut être résilié par l'une ou l'autre des parties en cas de non-respect substantiel des obligations par l'autre partie, moyennant un préavis écrit de {{preavis}} jours.</p><h2>7. Loi applicable</h2><p>Ce contrat est régi par les lois de {{juridiction}} et tout litige sera soumis à la compétence exclusive des tribunaux de ce ressort.</p><h2>8. Signature électronique</h2><p>Les parties acceptent que leurs signatures électroniques, telles que définies par les lois applicables sur les transactions électroniques, aient la même force que des signatures manuscrites.</p><p class="signatures">Signé le {{date_jour}}<br/><br/>LE PRESTATAIRE — LE CLIENT<br/>Signature — Signature<br/>Nom et titre du représentant — Nom et titre du représentant</p></div>`,
    popularity: 44,
  },
  {
    code: 'ctr_community_management',
    name: 'Contrat de gestion des réseaux sociaux (community management)',
    category: 'commercial_financier',
    price: 1800, priceMax: 3500,
    description: 'Contrat par lequel un prestataire assure la gestion des réseaux sociaux d’un client : création et publication de contenu, animation de communauté, publicité et analyse de performance, honoraires et confidentialité.',
    fieldsJson: F([
      { key: 'prestataire', label: 'Société de gestion des réseaux sociaux (nom + adresse + contact)', type: 'textarea', required: true },
      { key: 'client', label: 'Client (nom + adresse + contact)', type: 'textarea', required: true },
      { key: 'services', label: 'Liste des services (contenu, community management, publicité, analyse…)', type: 'textarea', required: true },
      { key: 'honoraires', label: 'Honoraires (montant total et modalités de paiement)', type: 'text', required: true },
      { key: 'preavis', label: 'Préavis de résiliation (en jours)', type: 'text', required: true },
      { key: 'juridiction', label: 'Loi applicable et tribunaux compétents', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE PRESTATION DE SERVICES DE GESTION DES RÉSEAUX SOCIAUX</h1><p><strong>ENTRE :</strong> {{prestataire}}, ci-après « la Société de gestion »,</p><p><strong>ET :</strong> {{client}}, ci-après « le Client ».</p><h2>1. Description des services</h2><p>La Société de gestion s'engage à fournir les services de gestion des réseaux sociaux suivants : {{services}}.</p><h2>2. Durée du contrat</h2><p>Ce contrat commence à la date de signature et se poursuit jusqu'à sa résiliation par l'une ou l'autre des parties conformément à l'article 5.</p><h2>3. Honoraires et paiement</h2><p>Le Client s'engage à payer à la Société de gestion : <strong>{{honoraires}}</strong>.</p><h2>4. Responsabilités des parties</h2><p>4.1 La Société de gestion s'engage à fournir les services avec compétence et professionnalisme.</p><p>4.2 Le Client s'engage à fournir toutes les informations et ressources nécessaires, y compris l'accès aux comptes de réseaux sociaux.</p><h2>5. Propriété intellectuelle et confidentialité</h2><p>5.1 Tout contenu créé ou utilisé dans le cadre de ce contrat, y compris les publications, reste la propriété du Client.</p><p>5.2 Les deux parties s'engagent à maintenir la confidentialité de toutes les informations sensibles échangées.</p><h2>6. Résiliation</h2><p>Ce contrat peut être résilié par écrit par l'une ou l'autre des parties avec un préavis de {{preavis}} jours. En cas de résiliation, le Client s'engage à payer tous les honoraires dus pour les services déjà rendus.</p><h2>7. Droit applicable</h2><p>Ce contrat est régi par les lois de {{juridiction}} et tout litige sera soumis à la compétence exclusive des tribunaux compétents de ce ressort.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>LA SOCIÉTÉ DE GESTION — LE CLIENT<br/>Signature — Signature</p></div>`,
    popularity: 40,
  },
  {
    code: 'ctr_marketing_influence',
    name: 'Contrat de services de marketing d’influence',
    category: 'commercial_financier',
    price: 2000, priceMax: 4000,
    description: 'Contrat entre un annonceur et un influenceur (ou son agence) pour une campagne de marketing d’influence : contenu et mentions de collaboration, calendrier, rémunération, propriété intellectuelle et confidentialité.',
    fieldsJson: F([
      { key: 'annonceur', label: 'Annonceur (entreprise + adresse + contact)', type: 'textarea', required: true },
      { key: 'influenceur', label: 'Influenceur ou agence (nom + adresse + contact)', type: 'textarea', required: true },
      { key: 'campagne', label: 'Campagne (nom, objectifs, réseaux, produits promus…)', type: 'textarea', required: true },
      { key: 'date_debut', label: 'Date de début de la campagne', type: 'date', required: true },
      { key: 'date_fin', label: 'Date de fin de la campagne', type: 'date', required: true },
      { key: 'remuneration', label: 'Rémunération (montant total et modalités de paiement)', type: 'text', required: true },
      { key: 'preavis', label: 'Préavis de résiliation (en jours)', type: 'text', required: true },
      { key: 'juridiction', label: 'Loi applicable et tribunaux compétents', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE SERVICES DE MARKETING D'INFLUENCE</h1><p><strong>ENTRE :</strong> {{annonceur}}, ci-après « l'Annonceur »,</p><p><strong>ET :</strong> {{influenceur}}, ci-après « le Prestataire » (influenceur ou agence).</p><h2>1. Objet du contrat</h2><p>Le Prestataire s'engage à fournir des services de marketing d'influence à l'Annonceur pour la campagne suivante : {{campagne}}.</p><h2>2. Durée de la campagne</h2><p>La campagne débutera le {{date_debut}} et se terminera le {{date_fin}}.</p><h2>3. Obligations du Prestataire</h2><p>Le Prestataire s'engage à : créer et publier le contenu convenu sur ses canaux conformément aux directives de l'Annonceur ; mentionner clairement sa collaboration avec l'Annonceur, conformément aux règles et réglementations en vigueur ; fournir des rapports réguliers sur les performances (engagement, portée, interaction) ; respecter les délais de publication convenus.</p><h2>4. Rémunération</h2><p>En contrepartie des services fournis, l'Annonceur versera au Prestataire : <strong>{{remuneration}}</strong>.</p><h2>5. Obligations de l'Annonceur</h2><p>L'Annonceur s'engage à fournir tous les éléments nécessaires (produits, informations, directives créatives), à respecter les délais convenus et à payer la rémunération convenue.</p><h2>6. Droits de propriété intellectuelle</h2><p>Tous les droits de propriété intellectuelle liés au contenu créé restent la propriété de l'Annonceur ; le Prestataire lui accorde une licence d'utilisation du contenu conformément au présent contrat.</p><h2>7. Confidentialité</h2><p>Les deux parties s'engagent à maintenir la confidentialité des informations confidentielles échangées.</p><h2>8. Résiliation</h2><p>En cas de non-respect substantiel des termes par l'une des parties, l'autre partie peut résilier le contrat avec un préavis écrit de {{preavis}} jours.</p><h2>9. Loi applicable et juridiction compétente</h2><p>Ce contrat est régi par les lois de {{juridiction}} et tout litige sera soumis à la juridiction exclusive des tribunaux de ce ressort.</p><p class="signatures">Fait le {{date_jour}}, en deux exemplaires originaux<br/><br/>L'ANNONCEUR — LE PRESTATAIRE<br/>Signature — Signature</p></div>`,
    popularity: 43,
  },
  {
    code: 'ctr_agence_communication',
    name: 'Contrat de marketing / promotion (agence de communication)',
    category: 'commercial_financier',
    price: 2200, priceMax: 4000,
    description: 'Contrat par lequel une agence de communication fournit à un client des services de marketing ou de promotion : description des prestations, durée, rémunération, respect des lois, confidentialité et résiliation.',
    fieldsJson: F([
      { key: 'client', label: 'Client (nom / entreprise + siège social)', type: 'textarea', required: true },
      { key: 'agence', label: 'Agence de marketing / partenaire de promotion (nom + siège social)', type: 'textarea', required: true },
      { key: 'description_services', label: 'Description des services de marketing / promotion', type: 'textarea', required: true },
      { key: 'duree', label: 'Durée du contrat (mois ou années)', type: 'text', required: true },
      { key: 'remuneration', label: 'Rémunération et modalités de paiement', type: 'text', required: true },
      { key: 'preavis', label: 'Préavis de résiliation (en jours)', type: 'text', required: true },
      { key: 'juridiction', label: 'Loi applicable et tribunaux compétents', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE MARKETING OU DE PROMOTION</h1><p><strong>ENTRE :</strong> {{client}}, ci-après dénommé le « Client »,</p><p><strong>ET :</strong> {{agence}}, ci-après dénommée l'« Agence ».</p><h2>1. Objet du contrat</h2><p>Le présent contrat a pour objet la fourniture de services de marketing ou de promotion par l'Agence au Client, conformément aux termes et conditions énoncés ci-dessous.</p><h2>2. Durée</h2><p>Ce contrat entre en vigueur à compter de la date de signature et restera en vigueur pour une période de {{duree}}, à moins qu'il ne soit résilié conformément à ses modalités.</p><h2>3. Description des services</h2><p>L'Agence s'engage à fournir les services suivants au Client : {{description_services}}.</p><h2>4. Paiement</h2><p>Le Client s'engage à payer à l'Agence, en contrepartie des services fournis : <strong>{{remuneration}}</strong>.</p><h2>5. Respect des lois et règlements</h2><p>Les parties conviennent de se conformer à toutes les lois et réglementations applicables en lien avec les services fournis.</p><h2>6. Confidentialité</h2><p>Les parties s'engagent à maintenir la confidentialité de toutes les informations confidentielles obtenues dans le cadre de l'exécution de ce contrat.</p><h2>7. Résiliation</h2><p>Ce contrat peut être résilié par l'une ou l'autre des parties en cas de non-respect substantiel des obligations par l'autre partie, moyennant un préavis écrit de {{preavis}} jours.</p><h2>8. Loi applicable</h2><p>Ce contrat est régi par les lois de {{juridiction}} et tout litige sera soumis à la compétence exclusive des tribunaux de ce ressort.</p><p class="signatures">Signé le {{date_jour}}, en deux exemplaires originaux<br/><br/>LE CLIENT — L'AGENCE<br/>Signature — Signature<br/>Nom et titre du représentant — Nom et titre du représentant</p></div>`,
    popularity: 38,
  },
  {
    code: 'ctr_design_graphique',
    name: 'Contrat de prestation de services de design graphique',
    category: 'commercial_financier',
    price: 1500, priceMax: 3000,
    description: 'Contrat par lequel un designer graphique réalise pour un client des créations visuelles (logos, bannières, supports marketing) : description des services, délais, tarifs, propriété intellectuelle, révisions et résiliation.',
    fieldsJson: F([
      { key: 'client', label: 'Client (nom / entreprise + adresse + contact)', type: 'textarea', required: true },
      { key: 'designer', label: 'Designer graphique (nom + adresse + contact)', type: 'textarea', required: true },
      { key: 'description_services', label: 'Description des services (logos, bannières, supports…)', type: 'textarea', required: true },
      { key: 'tarifs', label: 'Tarifs (horaire / forfaitaire) et modalités de paiement', type: 'text', required: true },
      { key: 'delai_revision', label: 'Délai pour demander des révisions après livraison (en jours)', type: 'text', required: true },
      { key: 'juridiction', label: 'Loi applicable et tribunaux compétents', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE PRESTATION DE SERVICES DE DESIGN GRAPHIQUE</h1><p><strong>ENTRE :</strong> {{client}}, ci-après « le Client »,</p><p><strong>ET :</strong> {{designer}}, ci-après « le Designer graphique ».</p><h2>1. Objet du contrat</h2><p>Le Client engage le Designer graphique pour fournir des services de design graphique portant sur les éléments suivants : {{description_services}}.</p><h2>2. Délais</h2><p>Les parties conviennent des délais de livraison spécifiques pour chaque projet ou élément de design, mutuellement convenus avant le début de chaque projet.</p><h2>3. Tarifs et paiements</h2><p>Le Client paiera au Designer graphique les tarifs convenus, selon les modalités suivantes : <strong>{{tarifs}}</strong>.</p><h2>4. Propriété intellectuelle</h2><p>Une fois le paiement effectué, les droits de propriété intellectuelle sur les créations graphiques seront transférés au Client. Le Designer graphique conserve le droit de montrer les créations dans son portfolio à des fins de promotion.</p><h2>5. Révisions et corrections</h2><p>Le Client peut demander des révisions et corrections des créations dans un délai de {{delai_revision}} jours après la livraison initiale. Les révisions couvrent uniquement les erreurs ou omissions par rapport aux instructions initiales.</p><h2>6. Responsabilités du Client</h2><p>Le Client fournira toutes les informations, images, contenus et directives nécessaires, et sera responsable de toute information inexacte ou incomplète fournie.</p><h2>7. Résiliation</h2><p>Ce contrat peut être résilié par l'une ou l'autre des parties en cas de non-respect substantiel des termes par l'autre partie. La résiliation doit être notifiée par écrit.</p><h2>8. Loi applicable et juridiction compétente</h2><p>Ce contrat est régi par les lois de {{juridiction}} et tout litige sera soumis à la juridiction exclusive des tribunaux de ce ressort.</p><p class="signatures">Fait le {{date_jour}}, en deux exemplaires originaux<br/><br/>LE CLIENT — LE DESIGNER GRAPHIQUE<br/>Signature — Signature</p></div>`,
    popularity: 32,
  },

  // ════════════════════ PROPRIÉTÉ INTELLECTUELLE & CRÉATION (4) ════════════════════
  {
    code: 'ctr_licence_musique_audiovisuel',
    name: 'Contrat de licence de musique ou de contenu audiovisuel',
    category: 'juridique_admin',
    price: 2500, priceMax: 4500,
    description: 'Contrat par lequel le titulaire des droits d’une œuvre musicale ou audiovisuelle en concède l’usage à un licencié : type de licence, territoire, durée, redevances et réserve des droits non cédés.',
    fieldsJson: F([
      { key: 'concedant', label: 'Concédant — titulaire des droits (nom / société + adresse + contact)', type: 'textarea', required: true },
      { key: 'licencie', label: 'Licencié (nom / société + adresse + contact)', type: 'textarea', required: true },
      { key: 'oeuvre', label: 'Œuvre (titre, auteur(s) / compositeur(s), date de création)', type: 'textarea', required: true },
      { key: 'type_licence', label: 'Type de licence', type: 'select', required: true, options: ['exclusive', 'non exclusive'] },
      { key: 'usage', label: 'Usage autorisé (diffusion TV, streaming, publicité…)', type: 'text', required: true },
      { key: 'territoire', label: 'Territoire de la licence', type: 'text', required: true },
      { key: 'duree', label: 'Durée de la licence', type: 'text', required: true },
      { key: 'redevances', label: 'Redevances (montant, échéances, modalités)', type: 'text', required: true },
      { key: 'juridiction', label: 'Loi applicable et tribunaux compétents', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE LICENCE DE MUSIQUE OU DE CONTENU AUDIOVISUEL</h1><p>Ce contrat de licence (le « Contrat ») est conclu entre {{concedant}}, titulaire des droits (ci-après le « Concédant »), et {{licencie}}, ci-après le « Licencié ».</p><h2>1. Objet du contrat</h2><p>Le Concédant détient les droits d'une œuvre musicale ou audiovisuelle (l'« Œuvre ») décrite comme suit : {{oeuvre}}. Le Concédant souhaite accorder une licence au Licencié pour l'utilisation de l'Œuvre selon les modalités définies ci-dessous.</p><h2>2. Droits de licence</h2><p>2.1 <strong>Type de licence :</strong> le Concédant accorde au Licencié une licence <strong>{{type_licence}}</strong> pour utiliser l'Œuvre aux fins suivantes : {{usage}}.</p><p>2.2 <strong>Territoire :</strong> la licence est valable dans le territoire suivant : {{territoire}}.</p><p>2.3 <strong>Durée :</strong> la licence est valide à compter de la date d'entrée en vigueur du Contrat et demeure en vigueur pour {{duree}}.</p><p>2.4 <strong>Redevances :</strong> en contrepartie de la licence accordée, le Licencié versera au Concédant : {{redevances}}.</p><h2>3. Droits du Licencié</h2><p>Le Licencié peut utiliser l'Œuvre conformément aux modalités de cette licence. Il ne peut sous-licencier l'Œuvre qu'avec le consentement écrit préalable du Concédant.</p><h2>4. Droits du Concédant</h2><p>Le Concédant conserve tous les droits sur l'Œuvre qui ne sont pas expressément accordés par ce Contrat et a le droit de percevoir les redevances convenues.</p><h2>5. Résiliation</h2><p>Ce Contrat peut être résilié par l'une ou l'autre des parties en cas de non-respect substantiel des termes par l'autre partie, moyennant un préavis écrit.</p><h2>6. Loi applicable</h2><p>Ce Contrat est régi et interprété conformément aux lois de {{juridiction}}.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>LE CONCÉDANT — LE LICENCIÉ<br/>Signature — Signature<br/>Nom imprimé — Nom imprimé</p></div>`,
    popularity: 33,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Œuvre protégée par le droit d’auteur (Accord de Bangui / OAPI, Annexe VII) ; gestion collective possible via les bureaux nationaux du droit d’auteur (ex. BURIDA en Côte d’Ivoire).' },
      FR: { note: 'Cession / licence de droits d’auteur : mentions obligatoires de l’art. L.131-3 CPI (étendue, destination, territoire, durée) ; droits voisins pour les producteurs (art. L.212 s.).' },
    }),
  },
  {
    code: 'ctr_cession_droit_publication',
    name: 'Contrat de cession de droit de publication',
    category: 'juridique_admin',
    price: 2000, priceMax: 3800,
    description: 'Contrat par lequel un auteur (cédant) cède à un éditeur (cessionnaire) les droits de publication d’une œuvre : droits cédés, durée, rémunération, modifications soumises à accord et droit de révocation.',
    fieldsJson: F([
      { key: 'cedant', label: 'Cédant — auteur (nom + adresse + contact)', type: 'textarea', required: true },
      { key: 'cessionnaire', label: 'Cessionnaire — éditeur (nom + adresse + contact)', type: 'textarea', required: true },
      { key: 'oeuvre', label: 'Œuvre (titre et description)', type: 'textarea', required: true },
      { key: 'droits_cedes', label: 'Droits cédés (livre imprimé, site web, numérique…)', type: 'textarea', required: true },
      { key: 'duree', label: 'Durée de la cession (ex. 2 ans, indéfiniment)', type: 'text', required: true },
      { key: 'remuneration', label: 'Rémunération (montant et modalités de paiement)', type: 'text', required: true },
      { key: 'juridiction', label: 'Loi applicable et tribunaux compétents', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE CESSION DE DROIT DE PUBLICATION</h1><p><strong>ENTRE :</strong> {{cedant}}, ci-après le « Cédant »,</p><p><strong>ET :</strong> {{cessionnaire}}, ci-après le « Cessionnaire ».</p><h2>1. Objet du contrat</h2><p>Le Cédant cède au Cessionnaire les droits de publication de l'œuvre suivante : {{oeuvre}}.</p><h2>2. Droits cédés</h2><p>Le Cédant cède au Cessionnaire les droits exclusifs de publication de l'œuvre aux fins suivantes : {{droits_cedes}}.</p><h2>3. Durée de la cession</h2><p>La cession prend effet à compter de la date de signature du présent contrat et reste en vigueur pour une durée de {{duree}}.</p><h2>4. Rémunération</h2><p>En contrepartie de la cession des droits de publication, le Cessionnaire versera au Cédant : <strong>{{remuneration}}</strong>.</p><h2>5. Responsabilités du Cessionnaire</h2><p>Le Cessionnaire s'engage à respecter les droits du Cédant sur l'œuvre cédée et est responsable de son utilisation conformément aux lois sur le droit d'auteur.</p><h2>6. Modifications et adaptations</h2><p>Le Cessionnaire peut apporter des modifications ou adaptations à l'œuvre cédée uniquement avec le consentement écrit préalable du Cédant.</p><h2>7. Droit de révocation</h2><p>Le Cédant se réserve le droit de révoquer la cession en cas de violation substantielle des termes du contrat par le Cessionnaire.</p><h2>8. Loi applicable et juridiction compétente</h2><p>Ce contrat est régi par les lois de {{juridiction}} et tout litige sera soumis à la juridiction exclusive des tribunaux de ce ressort.</p><p class="signatures">Fait le {{date_jour}}, en deux exemplaires originaux<br/><br/>LE CÉDANT — LE CESSIONNAIRE<br/>Signature — Signature<br/>Nom imprimé — Nom imprimé</p></div>`,
    popularity: 28,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Cession de droits d’auteur soumise à l’Accord de Bangui (OAPI, Annexe VII) ; le contrat d’édition doit préciser l’étendue des droits cédés et la rémunération de l’auteur.' },
      FR: { note: 'Contrat d’édition régi par les art. L.132-1 s. du CPI ; mentions obligatoires de l’art. L.131-3 et rémunération proportionnelle de principe (art. L.131-4).' },
    }),
  },
  {
    code: 'ctr_gestion_droits_auteur',
    name: 'Contrat de gestion de droits d’auteur',
    category: 'juridique_admin',
    price: 2000, priceMax: 3800,
    description: 'Contrat par lequel un titulaire de droits d’auteur confie à un agent la gestion, la promotion et la négociation de ses œuvres : pouvoirs de l’agent, commission sur les revenus, obligations du titulaire et reddition de comptes.',
    fieldsJson: F([
      { key: 'titulaire', label: 'Titulaire des droits d’auteur (auteur / créateur + adresse + contact)', type: 'textarea', required: true },
      { key: 'agent', label: 'Agent de gestion (nom / société + adresse + contact)', type: 'textarea', required: true },
      { key: 'oeuvres', label: 'Liste des œuvres (titres et descriptions)', type: 'textarea', required: true },
      { key: 'duree', label: 'Durée du contrat (ex. 1 an, indéfiniment)', type: 'text', required: true },
      { key: 'commission', label: 'Commission de l’agent (pourcentage ou montant)', type: 'text', required: true },
      { key: 'preavis', label: 'Préavis de résiliation (en jours)', type: 'text', required: true },
      { key: 'juridiction', label: 'Loi applicable et tribunaux compétents', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE GESTION DE DROITS D'AUTEUR</h1><p><strong>ENTRE :</strong> {{titulaire}}, titulaire des droits d'auteur,</p><p><strong>ET :</strong> {{agent}}, ci-après l'« Agent de gestion ».</p><h2>1. Objet du contrat</h2><p>Le titulaire des droits d'auteur confie à l'Agent de gestion la responsabilité de gérer, promouvoir et négocier les droits d'auteur pour les œuvres suivantes : {{oeuvres}}.</p><h2>2. Durée du contrat</h2><p>Ce contrat prend effet à compter de la date de signature et reste en vigueur pour une durée de {{duree}}, sauf résiliation anticipée conformément à ses termes.</p><h2>3. Pouvoirs et responsabilités de l'Agent</h2><p>L'Agent de gestion s'engage à : promouvoir les œuvres en vue de générer des revenus, y compris la négociation de licences et d'accords ; gérer les droits, percevoir les revenus et distribuer les paiements au titulaire ; représenter le titulaire dans toutes les négociations et transactions relatives aux droits d'auteur ; fournir des rapports réguliers sur les activités de gestion et les revenus générés.</p><h2>4. Rémunération</h2><p>En contrepartie des services fournis, l'Agent de gestion percevra une commission de <strong>{{commission}}</strong> sur les revenus générés par les œuvres. Les frais de gestion (collecte, distribution) seront déduits des revenus avant le calcul de la commission.</p><h2>5. Obligations du titulaire</h2><p>Le titulaire s'engage à fournir toutes les informations et documents nécessaires à la gestion efficace des droits et à respecter les délais convenus pour la signature des contrats de licence.</p><h2>6. Résiliation</h2><p>Ce contrat peut être résilié par l'une ou l'autre des parties en cas de non-respect substantiel des termes par l'autre partie, moyennant un préavis écrit de {{preavis}} jours. La résiliation met fin à la représentation de l'Agent.</p><h2>7. Loi applicable et juridiction compétente</h2><p>Ce contrat est régi par les lois de {{juridiction}} et tout litige sera soumis à la juridiction exclusive des tribunaux de ce ressort.</p><p class="signatures">Fait le {{date_jour}}, en deux exemplaires originaux<br/><br/>LE TITULAIRE DES DROITS D'AUTEUR — L'AGENT DE GESTION<br/>Signature — Signature<br/>Nom imprimé — Nom imprimé</p></div>`,
    popularity: 26,
  },
  {
    code: 'ctr_prestations_artistiques',
    name: 'Contrat de prestations artistiques',
    category: 'commercial_financier',
    price: 1800, priceMax: 3500,
    description: 'Contrat par lequel un artiste (ou un groupe) fournit une prestation à un client : description, date, lieu et durée de la prestation, honoraires, droits d’auteur réservés, obligations et conditions d’annulation.',
    fieldsJson: F([
      { key: 'artiste', label: 'Artiste / groupe (nom + adresse + contact)', type: 'textarea', required: true },
      { key: 'client', label: 'Client (entreprise / particulier + adresse + contact)', type: 'textarea', required: true },
      { key: 'description_prestation', label: 'Prestation (description, date, heure, lieu, durée prévue)', type: 'textarea', required: true },
      { key: 'honoraires', label: 'Honoraires convenus et modalités de paiement', type: 'text', required: true },
      { key: 'delai_annulation', label: 'Seuil d’annulation (nombre de jours avant la prestation)', type: 'text', required: true },
      { key: 'pourcentage_annulation', label: 'Pourcentage remboursé en cas d’annulation au-delà du seuil (%)', type: 'text', required: true },
      { key: 'juridiction', label: 'Loi applicable et tribunaux compétents', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE PRESTATIONS ARTISTIQUES</h1><p><strong>ENTRE :</strong> {{artiste}}, ci-après l'« Artiste »,</p><p><strong>ET :</strong> {{client}}, ci-après le « Client ».</p><h2>1. Description de la prestation</h2><p>L'Artiste s'engage à fournir les services artistiques suivants : {{description_prestation}}. Honoraires convenus : {{honoraires}}.</p><h2>2. Droits d'auteur et propriété intellectuelle</h2><p>Tous les droits d'auteur et droits de propriété intellectuelle liés à la prestation restent la propriété de l'Artiste. Le Client n'a pas le droit de reproduire, distribuer ou vendre la prestation sans le consentement écrit préalable de l'Artiste.</p><h2>3. Obligations de l'Artiste</h2><p>L'Artiste s'engage à fournir la prestation de manière professionnelle et compétente, à respecter les horaires et délais convenus, à fournir son propre équipement sauf accord contraire et à respecter toutes les lois et réglementations applicables.</p><h2>4. Obligations du Client</h2><p>Le Client s'engage à fournir toutes les informations et conditions nécessaires à la prestation et à payer les honoraires convenus selon les modalités spécifiées.</p><h2>5. Annulation</h2><p>En cas d'annulation par le Client : si l'annulation intervient {{delai_annulation}} jours ou plus avant la date de la prestation, le Client remboursera {{pourcentage_annulation}} % des honoraires convenus ; si elle intervient moins de {{delai_annulation}} jours avant, le Client remboursera l'intégralité des honoraires convenus.</p><h2>6. Loi applicable</h2><p>Ce Contrat est régi par les lois de {{juridiction}} et tout litige sera soumis à la compétence exclusive des tribunaux de ce ressort.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>L'ARTISTE — LE CLIENT<br/>Signature — Signature</p></div>`,
    popularity: 34,
  },

  // ════════════════════ SERVICES AUX ENTREPRISES & PERSONNES (10) ════════════════════
  {
    code: 'ctr_franchise_restauration',
    name: 'Contrat de franchise de restauration',
    category: 'commercial_financier',
    price: 3500, priceMax: 5000,
    description: 'Contrat de franchise dans la restauration : le franchiseur concède au franchisé le droit d’exploiter un restaurant sous sa marque et son concept ; formation, assistance, fourniture, redevances, durée et confidentialité.',
    fieldsJson: F([
      { key: 'franchiseur', label: 'Franchiseur (société + type + pays + siège social)', type: 'textarea', required: true },
      { key: 'franchise_partie', label: 'Franchisé (personne physique / société + pays + siège social)', type: 'textarea', required: true },
      { key: 'enseigne', label: 'Marque / enseigne du système de franchise', type: 'text', required: true },
      { key: 'adresse_restaurant', label: 'Adresse du restaurant exploité', type: 'text', required: true },
      { key: 'duree', label: 'Durée de la franchise (en années)', type: 'text', required: true },
      { key: 'preavis', label: 'Préavis pour remédier à une violation (en jours)', type: 'text', required: true },
      { key: 'juridiction', label: 'Loi applicable et tribunaux compétents', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE FRANCHISE DE RESTAURATION</h1><p>Ce contrat de franchise (le « Contrat ») est conclu à la Date d'Effet entre {{franchiseur}} (ci-après le « Franchiseur ») et {{franchise_partie}} (ci-après le « Franchisé »), collectivement les « Parties ».</p><h2>1. Objet du contrat</h2><p>Le Franchiseur est le détenteur des droits de franchise de la marque et du concept de restaurant connu sous le nom de « <strong>{{enseigne}}</strong> » (le « Système de Franchise »). Le Franchiseur accorde au Franchisé le droit et la licence d'exploiter un restaurant sous cette marque et ce concept à l'emplacement situé à {{adresse_restaurant}} (le « Restaurant »).</p><h2>2. Responsabilités du Franchiseur</h2><p>2.1 <strong>Formation :</strong> le Franchiseur fournira la formation nécessaire pour exploiter le Restaurant conformément aux normes du Système de Franchise.</p><p>2.2 <strong>Assistance :</strong> le Franchiseur fournira une assistance continue en gestion, marketing, approvisionnement et autres aspects de l'exploitation.</p><p>2.3 <strong>Fourniture :</strong> le Franchiseur peut fournir certains produits, équipements ou fournitures nécessaires, conformément aux modalités convenues.</p><h2>3. Responsabilités du Franchisé</h2><p>3.1 Le Franchisé exploitera le Restaurant conformément aux normes, procédures et directives du Système de Franchise.</p><p>3.2 Le Franchisé utilisera la marque et l'enseigne conformément aux directives du Franchiseur.</p><p>3.3 Le Franchisé paiera au Franchiseur les redevances convenues, conformément aux modalités financières spécifiées en annexe.</p><h2>4. Durée du contrat</h2><p>Ce Contrat entre en vigueur à la Date d'Effet et restera en vigueur pour une durée de {{duree}} ans, sauf résiliation anticipée.</p><h2>5. Résiliation</h2><p>Ce Contrat peut être résilié par l'une ou l'autre des Parties en cas de violation substantielle de ses termes par l'autre Partie, sous réserve d'un préavis écrit de {{preavis}} jours pour remédier à la violation.</p><h2>6. Confidentialité</h2><p>Les Parties conviennent de maintenir la confidentialité de toutes les informations commerciales et techniques divulguées.</p><h2>7. Loi applicable et juridiction</h2><p>Ce Contrat est régi par les lois de {{juridiction}} et tout litige sera soumis à la juridiction exclusive des tribunaux de ce ressort.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>LE FRANCHISEUR — LE FRANCHISÉ<br/>Nom du signataire — Nom du signataire<br/>Signature — Signature</p></div>`,
    popularity: 40,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Franchise innommée relevant de la liberté contractuelle et de l’AUDCG ; la marque et l’enseigne doivent être protégées auprès de l’OAPI (Accord de Bangui) ; respect des règles d’hygiène alimentaire nationales.' },
      FR: { note: 'Loi Doubin (art. L.330-3 du Code de commerce) : document d’information précontractuelle (DIP) remis au moins 20 jours avant la signature ; normes sanitaires (paquet hygiène).' },
    }),
  },
  {
    code: 'ctr_prestation_transport',
    name: 'Contrat de prestation de services de transport',
    category: 'commercial_financier',
    price: 2200, priceMax: 4200,
    description: 'Contrat par lequel un transporteur assure pour un client le transport de marchandises ou de personnes : description des services, véhicules et conducteurs, sécurité, responsabilité, tarifs et résiliation.',
    fieldsJson: F([
      { key: 'transporteur', label: 'Transporteur (entreprise + adresse + représentant légal)', type: 'textarea', required: true },
      { key: 'client', label: 'Client (société + adresse + représentant légal)', type: 'textarea', required: true },
      { key: 'description_services', label: 'Description des services (transport de marchandises, de passagers…)', type: 'textarea', required: true },
      { key: 'tarifs', label: 'Tarifs (horaire, kilométrique, forfait…)', type: 'text', required: true },
      { key: 'duree', label: 'Durée du contrat (mois ou années)', type: 'text', required: true },
      { key: 'preavis', label: 'Préavis de résiliation (en jours)', type: 'text', required: true },
      { key: 'juridiction', label: 'Loi applicable et tribunaux compétents', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE PRESTATION DE SERVICES DE TRANSPORT</h1><p><strong>ENTRE :</strong> {{transporteur}}, ci-après le « Transporteur »,</p><p><strong>ET :</strong> {{client}}, ci-après le « Client ».</p><h2>1. Objet du contrat</h2><p>Le Transporteur s'engage à fournir des services de transport au Client conformément aux termes et conditions de ce contrat.</p><h2>2. Description des services</h2><p>Les services de transport comprennent : {{description_services}}. Les itinéraires et horaires seront définis dans des accords distincts entre les parties.</p><h2>3. Obligations du Transporteur</h2><p>3.1 <strong>Véhicules et conducteurs :</strong> le Transporteur s'engage à utiliser des véhicules en bon état de fonctionnement et des conducteurs qualifiés.</p><p>3.2 <strong>Sécurité :</strong> le Transporteur respectera toutes les réglementations de sécurité applicables et prendra les mesures nécessaires pour garantir la sécurité des passagers et/ou des marchandises.</p><p>3.3 <strong>Responsabilité :</strong> le Transporteur est responsable des dommages causés aux passagers et/ou aux marchandises pendant le transport, sauf force majeure ou faute du Client.</p><h2>4. Obligations du Client</h2><p>Le Client s'engage à payer les tarifs convenus et à coopérer en fournissant les informations nécessaires à l'organisation des services.</p><h2>5. Rémunération</h2><p>Les tarifs pour les services de transport sont les suivants : <strong>{{tarifs}}</strong>.</p><h2>6. Durée et résiliation</h2><p>Ce contrat entre en vigueur à compter de la date de signature et restera en vigueur pour une durée de {{duree}}. Il peut être résilié par l'une ou l'autre des parties en cas de non-respect substantiel des termes par l'autre partie, moyennant un préavis écrit de {{preavis}} jours.</p><h2>7. Loi applicable</h2><p>Ce contrat est régi par les lois de {{juridiction}}.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>LE TRANSPORTEUR — LE CLIENT<br/>Signature — Signature<br/>Nom du représentant légal — Nom du représentant légal</p></div>`,
    popularity: 36,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Transport de marchandises par route régi par l’Acte uniforme relatif aux contrats de transport de marchandises par route (AUCTMR) ; transport de personnes soumis aux réglementations nationales de licences (VTC, taxi).' },
      FR: { note: 'Contrat de transport régi par le Code des transports et le Code de commerce (art. L.133-1 s.) ; transport public de personnes soumis à autorisation (LOTI, VTC).' },
    }),
  },
  {
    code: 'ctr_location_leasing',
    name: 'Contrat de location de biens (leasing opérationnel)',
    category: 'commercial_financier',
    price: 2200, priceMax: 4000,
    description: 'Contrat de location opérationnelle (leasing) par lequel un bailleur met des biens ou équipements (véhicules, matériel) à la disposition d’un preneur moyennant un loyer : durée, renouvellement, entretien, assurance et absence de transfert de propriété.',
    fieldsJson: F([
      { key: 'bailleur', label: 'Bailleur (société + statut juridique + siège social)', type: 'textarea', required: true },
      { key: 'preneur', label: 'Preneur (société + statut juridique + siège social)', type: 'textarea', required: true },
      { key: 'biens', label: 'Description détaillée des biens ou équipements loués', type: 'textarea', required: true },
      { key: 'date_debut', label: 'Date de début du contrat', type: 'date', required: true },
      { key: 'date_fin', label: 'Date de fin du contrat', type: 'date', required: true },
      { key: 'loyer', label: 'Loyer (montant mensuel et modalités de paiement)', type: 'text', required: true },
      { key: 'juridiction', label: 'Loi applicable et tribunaux compétents', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE LOCATION DE BIENS (LEASING)</h1><p><strong>ENTRE :</strong> {{bailleur}}, ci-après le « Bailleur »,</p><p><strong>ET :</strong> {{preneur}}, ci-après le « Preneur »</p><p>(collectivement les « Parties »). Date de début : {{date_debut}} — Date de fin : {{date_fin}}.</p><h2>1. Objet du contrat</h2><p>1.1 Le Bailleur s'engage à mettre à la disposition du Preneur, et le Preneur s'engage à louer, les biens ou équipements suivants (les « Biens ») : {{biens}}.</p><p>1.2 Le Preneur utilisera les Biens conformément aux modalités du présent contrat.</p><h2>2. Durée du contrat et renouvellement</h2><p>2.1 Ce contrat entre en vigueur à la date de début et demeure en vigueur jusqu'à la date de fin, sauf résiliation conformément à ses dispositions.</p><p>2.2 À la fin de la période de location, le Preneur a la possibilité de renouveler le contrat, sous réserve d'un accord écrit entre les Parties.</p><h2>3. Loyer et paiements</h2><p>Le Preneur paiera au Bailleur : <strong>{{loyer}}</strong>. Tous les paiements seront effectués par virement bancaire ou tout autre moyen convenu.</p><h2>4. Entretien et réparations</h2><p>4.1 Le Preneur est responsable de l'entretien courant des Biens et des réparations mineures.</p><p>4.2 Le Bailleur est responsable de l'entretien majeur des Biens, conformément aux spécifications du fabricant.</p><h2>5. Assurance</h2><p>Le Preneur est tenu de maintenir une assurance adéquate pour les Biens loués.</p><h2>6. Transfert de propriété</h2><p>À la fin du contrat, le Preneur n'acquiert aucun droit de propriété sur les Biens et les restituera en bon état, sauf usure normale, au Bailleur.</p><h2>7. Loi applicable et juridiction</h2><p>Ce contrat est régi par les lois de {{juridiction}} et tout litige sera soumis à la juridiction exclusive des tribunaux de ce ressort.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>LE BAILLEUR — LE PRENEUR<br/>Nom et fonction — Nom et fonction<br/>Signature — Signature</p></div>`,
    popularity: 33,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Location simple (bail de meubles) distincte du crédit-bail ; en cas d’option d’achat, application du régime du crédit-bail. Aucune translation de propriété en location opérationnelle.' },
      FR: { note: 'Louage de choses (art. 1709 s. du Code civil) ; à distinguer du crédit-bail (art. L.313-7 du Code monétaire et financier) qui comporte une option d’achat.' },
    }),
  },
  {
    code: 'ctr_location_terrain_evenement',
    name: 'Contrat de location de terrain pour événement',
    category: 'commercial_financier',
    price: 1800, priceMax: 3500,
    description: 'Contrat par lequel un propriétaire loue un terrain à un organisateur pour la tenue d’un événement : description du terrain, durée, loyer, usage exclusif, responsabilités, assurance et remise en état.',
    fieldsJson: F([
      { key: 'proprietaire', label: 'Propriétaire du terrain (nom + adresse)', type: 'textarea', required: true },
      { key: 'organisateur', label: 'Organisateur de l’événement (entreprise + adresse)', type: 'textarea', required: true },
      { key: 'terrain', label: 'Terrain (adresse, taille, caractéristiques, aménagements)', type: 'textarea', required: true },
      { key: 'date_debut', label: 'Date de début de la location', type: 'date', required: true },
      { key: 'date_fin', label: 'Date de fin de la location', type: 'date', required: true },
      { key: 'loyer', label: 'Loyer total et modalités de paiement', type: 'text', required: true },
      { key: 'juridiction', label: 'Loi applicable', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE LOCATION DE TERRAIN POUR ÉVÉNEMENT</h1><p><strong>ENTRE :</strong> {{proprietaire}}, ci-après le « Propriétaire »,</p><p><strong>ET :</strong> {{organisateur}}, ci-après l'« Organisateur de l'Événement ».</p><p>Le Propriétaire loue le terrain décrit ci-dessous à l'Organisateur pour la tenue d'un événement.</p><h2>1. Description du terrain</h2><p>Le terrain objet de cette location est décrit comme suit : {{terrain}}.</p><h2>2. Durée de la location</h2><p>La location commencera le {{date_debut}} et se terminera le {{date_fin}}. L'Organisateur doit remettre le terrain dans l'état où il l'a trouvé au début de la location.</p><h2>3. Loyer</h2><p>En contrepartie de la location, l'Organisateur paiera au Propriétaire un loyer total de <strong>{{loyer}}</strong>.</p><h2>4. Utilisation du terrain</h2><p>L'Organisateur utilisera le terrain exclusivement pour l'événement spécifié. Toute autre utilisation nécessite le consentement écrit préalable du Propriétaire.</p><h2>5. Responsabilités de l'Organisateur</h2><p>L'Organisateur est responsable de toutes les autorisations, licences et assurances nécessaires, ainsi que de la sécurité, de la propreté et de la réparation de tout dommage causé au terrain pendant la période de location.</p><h2>6. Assurance</h2><p>L'Organisateur doit souscrire une assurance responsabilité civile adéquate couvrant l'événement et nommant le Propriétaire comme bénéficiaire ou coassuré, le cas échéant.</p><h2>7. Résiliation</h2><p>Le Propriétaire se réserve le droit de résilier ce Contrat en cas de violation substantielle par l'Organisateur de l'une de ses obligations.</p><h2>8. Loi applicable et litiges</h2><p>Ce Contrat est régi par les lois de {{juridiction}}. Tout litige sera soumis à l'arbitrage et la décision de l'arbitre sera définitive et exécutoire.</p><p class="signatures">Fait le {{date_jour}}, en double exemplaire<br/><br/>LE PROPRIÉTAIRE — L'ORGANISATEUR DE L'ÉVÉNEMENT<br/>Signature — Signature</p></div>`,
    popularity: 31,
  },
  {
    code: 'ctr_coaching_personnel',
    name: 'Contrat de prestation de services de coaching personnel',
    category: 'commercial_financier',
    price: 1500, priceMax: 3000,
    description: 'Contrat par lequel un coach accompagne un client vers ses objectifs personnels ou professionnels : objectifs, responsabilités, durée et fréquence des séances, honoraires, confidentialité et règlement des litiges par arbitrage.',
    fieldsJson: F([
      { key: 'coach', label: 'Coach (nom + adresse + contact)', type: 'textarea', required: true },
      { key: 'client', label: 'Client (nom + adresse + contact)', type: 'textarea', required: true },
      { key: 'objectifs', label: 'Objectifs du coaching (domaines à améliorer, résultats attendus)', type: 'textarea', required: true },
      { key: 'duree', label: 'Durée du contrat (mois ou années)', type: 'text', required: true },
      { key: 'frequence', label: 'Fréquence, horaires et durée des séances', type: 'text', required: true },
      { key: 'honoraires', label: 'Honoraires et modalités de paiement', type: 'text', required: true },
      { key: 'organisme_arbitrage', label: 'Organisme d’arbitrage pour le règlement des litiges', type: 'text', required: true },
      { key: 'juridiction', label: 'Loi applicable', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE PRESTATION DE SERVICES DE COACHING PERSONNEL</h1><p><strong>ENTRE :</strong> {{coach}}, ci-après le « Coach »,</p><p><strong>ET :</strong> {{client}}, ci-après le « Client »</p><p>(collectivement les « Parties »).</p><h2>Préambule</h2><p>Le Client souhaite bénéficier des services de coaching personnel fournis par le Coach pour atteindre ses objectifs personnels et/ou professionnels. Le Coach est qualifié pour fournir ces services.</p><h2>Article 1 : Objectifs du coaching</h2><p>Les objectifs spécifiques du coaching sont les suivants : {{objectifs}}.</p><h2>Article 2 : Responsabilités du Coach</h2><p>2.1 Le Coach s'engage à fournir des services de coaching personnalisés en utilisant ses compétences et son expertise pour aider le Client à atteindre ses objectifs.</p><p>2.2 Le Coach s'engage à maintenir la confidentialité de toutes les informations partagées par le Client pendant la période de coaching, sauf obligation légale contraire.</p><h2>Article 3 : Responsabilités du Client</h2><p>Le Client s'engage à participer activement au processus de coaching, à suivre les conseils du Coach et à prendre des mesures pour atteindre ses objectifs.</p><h2>Article 4 : Durée et fréquence des séances</h2><p>4.1 Ce Contrat entre en vigueur à la date de sa signature et demeure en vigueur pour une période de {{duree}}.</p><p>4.2 Fréquence des séances : {{frequence}}.</p><h2>Article 5 : Honoraires et paiement</h2><p>Les honoraires du Coach et les modalités de paiement sont les suivants : <strong>{{honoraires}}</strong>.</p><h2>Article 6 : Résiliation</h2><p>Ce Contrat peut être résilié par l'une ou l'autre Partie dans les conditions convenues entre elles, moyennant un préavis écrit.</p><h2>Article 7 : Loi applicable et règlement des litiges</h2><p>7.1 Ce Contrat est régi par les lois de {{juridiction}}.</p><p>7.2 Tout litige sera soumis à un arbitrage conformément aux règles d'arbitrage de {{organisme_arbitrage}} et définitivement réglé par arbitrage.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>LE COACH — LE CLIENT<br/>Signature — Signature<br/>Prénom et nom — Prénom et nom</p></div>`,
    popularity: 35,
  },
  {
    code: 'ctr_partenariat_sportif',
    name: 'Contrat de partenariat sportif',
    category: 'commercial_financier',
    price: 2000, priceMax: 4000,
    description: 'Contrat entre un sportif (ou une entité sportive) et un partenaire commercial : soutien financier, droits et avantages, utilisation du nom et de l’image, obligations de visibilité et intégrité sportive.',
    fieldsJson: F([
      { key: 'partenaire', label: 'Le Partenaire — sportif / entité sportive (nom + adresse + contact)', type: 'textarea', required: true },
      { key: 'partenaire_commercial', label: 'Le Partenaire Commercial (entreprise + adresse + contact)', type: 'textarea', required: true },
      { key: 'description_activites', label: 'Description des activités sportives ou de l’événement', type: 'textarea', required: true },
      { key: 'soutien_financier', label: 'Montant du soutien financier', type: 'text', required: true },
      { key: 'droits_avantages', label: 'Droits et avantages accordés (visibilité, promotion…)', type: 'textarea', required: true },
      { key: 'date_fin', label: 'Date d’expiration du contrat', type: 'date', required: true },
      { key: 'juridiction', label: 'Loi applicable et tribunaux compétents', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE PARTENARIAT SPORTIF</h1><p><strong>ENTRE :</strong> {{partenaire}}, ci-après le « Partenaire »,</p><p><strong>ET :</strong> {{partenaire_commercial}}, ci-après le « Partenaire Commercial »</p><p>(collectivement les « Parties »).</p><h2>1. Objet du contrat</h2><p>Le Partenaire s'engage à promouvoir, soutenir ou associer le Partenaire Commercial à ses activités sportives, décrites comme suit : {{description_activites}}.</p><h2>2. Obligations du Partenaire Commercial</h2><p>2.1 <strong>Prestations financières :</strong> le Partenaire Commercial s'engage à fournir une contribution financière de {{soutien_financier}} en échange des avantages et droits définis dans ce Contrat.</p><p>2.2 <strong>Droits et avantages :</strong> le Partenaire Commercial bénéficiera des droits suivants pendant la durée du Contrat : {{droits_avantages}}.</p><p>2.3 <strong>Utilisation du nom et de l'image :</strong> le Partenaire Commercial peut utiliser le nom, l'image et les réalisations du Partenaire dans ses activités promotionnelles conformément aux directives fournies par le Partenaire.</p><h2>3. Obligations du Partenaire</h2><p>3.1 <strong>Visibilité et promotion :</strong> le Partenaire s'engage à offrir une visibilité adéquate et à promouvoir le Partenaire Commercial lors des activités sportives ou de l'événement.</p><p>3.2 <strong>Respect des engagements :</strong> le Partenaire s'engage à respecter tous les engagements et droits accordés au Partenaire Commercial.</p><p>3.3 <strong>Intégrité sportive :</strong> le Partenaire s'engage à maintenir l'intégrité sportive et à se conformer aux règles et réglementations sportives applicables.</p><h2>4. Durée du contrat</h2><p>Ce Contrat entre en vigueur à la date de signature et reste en vigueur jusqu'au {{date_fin}}, sauf résiliation conformément à ses termes.</p><h2>5. Loi applicable et juridiction</h2><p>Ce Contrat est régi par les lois de {{juridiction}} et toute action légale sera portée devant les tribunaux compétents de ce ressort.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>LE PARTENAIRE — LE PARTENAIRE COMMERCIAL<br/>Signature — Signature</p></div>`,
    popularity: 32,
  },
  {
    code: 'ctr_audit_financier',
    name: 'Contrat de prestation de services d’audit financier',
    category: 'commercial_financier',
    price: 2500, priceMax: 4500,
    description: 'Contrat par lequel un cabinet d’audit réalise l’audit des états financiers d’un client : périmètre et exercice audité, honoraires, accès aux informations, émission du rapport, confidentialité et arbitrage.',
    fieldsJson: F([
      { key: 'cabinet_audit', label: 'Cabinet d’audit (société + adresse)', type: 'textarea', required: true },
      { key: 'client', label: 'Client (entreprise + adresse)', type: 'textarea', required: true },
      { key: 'exercice', label: 'Exercice financier audité (date de clôture)', type: 'text', required: true },
      { key: 'honoraires', label: 'Honoraires et modalités de paiement', type: 'text', required: true },
      { key: 'institut_arbitrage', label: 'Institut d’arbitrage pour le règlement des litiges', type: 'text', required: true },
      { key: 'juridiction', label: 'Loi applicable', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE PRESTATION DE SERVICES D'AUDIT FINANCIER</h1><p><strong>ENTRE :</strong> {{cabinet_audit}}, ci-après le « Cabinet d'Audit »,</p><p><strong>ET :</strong> {{client}}, ci-après le « Client ».</p><p>Le Cabinet d'Audit fournira des services d'audit financier au Client (les « Services ») conformément aux termes suivants.</p><h2>1. Description des services</h2><p>Les Services incluent l'audit des états financiers du Client pour l'exercice financier se terminant le {{exercice}}, conformément aux normes d'audit applicables.</p><h2>2. Durée de la prestation</h2><p>La prestation des Services commencera à la date de signature du Contrat et se terminera à la remise du rapport d'audit final au Client.</p><h2>3. Honoraires</h2><p>Le Client paiera au Cabinet d'Audit des honoraires pour les Services selon les modalités suivantes : <strong>{{honoraires}}</strong>.</p><h2>4. Responsabilités des Parties</h2><p>4.1 Le Client fournira au Cabinet d'Audit un accès complet et en temps opportun à toutes les informations, documents et enregistrements nécessaires à l'audit.</p><p>4.2 Le Cabinet d'Audit effectuera l'audit conformément aux normes d'audit professionnelles et émettra un rapport conforme aux exigences légales et réglementaires.</p><h2>5. Confidentialité</h2><p>Le Cabinet d'Audit et le Client s'engagent à maintenir la confidentialité de toutes les informations confidentielles obtenues dans le cadre de la prestation des Services.</p><h2>6. Loi applicable et litiges</h2><p>Ce Contrat est régi par les lois de {{juridiction}}. Tout litige sera soumis à l'arbitrage conformément aux règles de {{institut_arbitrage}} et la décision de l'arbitre sera définitive et exécutoire.</p><p class="signatures">Fait le {{date_jour}}, en double exemplaire<br/><br/>LE CABINET D'AUDIT — LE CLIENT<br/>Signature — Signature</p></div>`,
    popularity: 34,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Audit et commissariat aux comptes régis par l’Acte uniforme sur les sociétés commerciales et le GIE (AUSCGIE) ; recours aux normes ISA et à l’Ordre national des experts-comptables.' },
      FR: { note: 'Mission d’audit soumise au Code de commerce et aux normes d’exercice professionnel (NEP) ; commissariat aux comptes réglementé (H2A / anciennement H3C).' },
    }),
  },
  {
    code: 'ctr_cybersecurite',
    name: 'Contrat de services de cybersécurité',
    category: 'commercial_financier',
    price: 3000, priceMax: 5000,
    description: 'Contrat par lequel un prestataire fournit à un client des services de cybersécurité : périmètre des prestations, mise en œuvre des meilleures pratiques, rapports d’incidents et de vulnérabilités, durée, confidentialité et résiliation.',
    fieldsJson: F([
      { key: 'prestataire', label: 'Prestataire de services de cybersécurité (société + type + pays + siège)', type: 'textarea', required: true },
      { key: 'client', label: 'Client (société + type + pays + siège)', type: 'textarea', required: true },
      { key: 'portee_services', label: 'Portée des services de cybersécurité (annexe A)', type: 'textarea', required: true },
      { key: 'duree', label: 'Durée du contrat (en années)', type: 'text', required: true },
      { key: 'preavis', label: 'Préavis de résiliation (en jours)', type: 'text', required: true },
      { key: 'juridiction', label: 'Loi applicable et tribunaux compétents', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE SERVICES DE CYBERSÉCURITÉ</h1><p>Ce contrat (le « Contrat ») est conclu à la Date d'Effet entre {{prestataire}} (ci-après le « Prestataire de Services ») et {{client}} (ci-après le « Client »), collectivement les « Parties ».</p><h2>1. Objet du contrat</h2><p>Le Prestataire de Services s'engage à fournir au Client des services de cybersécurité conformément aux termes du présent Contrat (les « Services de Cybersécurité »).</p><h2>2. Responsabilités du Prestataire</h2><p>2.1 <strong>Services :</strong> le Prestataire fournira les services de cybersécurité suivants (la « Portée des Services ») : {{portee_services}}.</p><p>2.2 <strong>Engagements :</strong> le Prestataire mettra en œuvre les meilleures pratiques en matière de cybersécurité pour protéger les systèmes, les données et les ressources du Client contre les menaces informatiques.</p><p>2.3 <strong>Rapports :</strong> le Prestataire fournira régulièrement au Client des rapports sur l'état de la cybersécurité, les incidents, les vulnérabilités et les mesures prises.</p><h2>3. Responsabilités du Client</h2><p>Le Client s'engage à collaborer activement, à fournir toutes les informations nécessaires, à respecter les politiques de cybersécurité et à mettre en œuvre les recommandations du Prestataire.</p><h2>4. Durée du contrat</h2><p>Ce Contrat entre en vigueur à la Date d'Effet et restera en vigueur pour une durée de {{duree}} ans, sauf résiliation anticipée.</p><h2>5. Résiliation</h2><p>Ce Contrat peut être résilié par l'une ou l'autre des Parties sous réserve d'un préavis écrit de {{preavis}} jours. En cas de résiliation, le Client paiera tous les frais engagés jusqu'à la date de résiliation.</p><h2>6. Confidentialité</h2><p>Les Parties conviennent de maintenir la confidentialité de toutes les informations confidentielles divulguées dans le cadre de ce Contrat.</p><h2>7. Loi applicable et juridiction</h2><p>Ce Contrat est régi par les lois de {{juridiction}} et tout litige sera soumis à la juridiction exclusive des tribunaux de ce ressort.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>LE PRESTATAIRE DE SERVICES — LE CLIENT<br/>Nom du signataire — Nom du signataire<br/>Signature — Signature</p></div>`,
    popularity: 38,
  },
  {
    code: 'ctr_maintenance_industrielle',
    name: 'Contrat de prestation de services de maintenance industrielle',
    category: 'commercial_financier',
    price: 2500, priceMax: 4500,
    description: 'Contrat par lequel un fournisseur assure la maintenance industrielle des équipements et installations d’un client : périmètre et fréquence des interventions, obligations des parties, rapports, garanties et résiliation.',
    fieldsJson: F([
      { key: 'fournisseur', label: 'Fournisseur de services de maintenance (société + adresse + contact)', type: 'textarea', required: true },
      { key: 'client', label: 'Client (entreprise + adresse + contact)', type: 'textarea', required: true },
      { key: 'description_services', label: 'Services, équipements/installations concernés et fréquence des interventions', type: 'textarea', required: true },
      { key: 'honoraires', label: 'Honoraires convenus et modalités de paiement', type: 'text', required: true },
      { key: 'duree', label: 'Durée du contrat (mois ou années)', type: 'text', required: true },
      { key: 'preavis', label: 'Préavis de résiliation (en jours)', type: 'text', required: true },
      { key: 'juridiction', label: 'Loi applicable et tribunaux compétents', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE PRESTATION DE SERVICES DE MAINTENANCE INDUSTRIELLE</h1><p><strong>ENTRE :</strong> {{fournisseur}}, ci-après le « Fournisseur »,</p><p><strong>ET :</strong> {{client}}, ci-après le « Client ».</p><h2>1. Description des services</h2><p>Le Fournisseur s'engage à fournir les services de maintenance industrielle suivants : {{description_services}}. Honoraires convenus : {{honoraires}}.</p><h2>2. Durée du contrat</h2><p>Ce Contrat entre en vigueur à compter de la date de signature et reste en vigueur pour une période de {{duree}}, à moins qu'il ne soit résilié conformément à ses termes.</p><h2>3. Obligations du Fournisseur</h2><p>Le Fournisseur s'engage à : fournir les services de maintenance conformément aux normes de l'industrie ; respecter les horaires convenus pour les visites ; utiliser du personnel qualifié et formé ; fournir des rapports de maintenance réguliers au Client.</p><h2>4. Obligations du Client</h2><p>Le Client s'engage à : fournir un accès sûr et approprié aux équipements/emplacements ; informer le Fournisseur de tout problème lié à la maintenance ; payer les honoraires convenus selon les modalités spécifiées.</p><h2>5. Résiliation</h2><p>Chacune des parties peut résilier ce Contrat en cas de non-respect substantiel des termes par l'autre partie, moyennant un préavis écrit de {{preavis}} jours.</p><h2>6. Responsabilités et garanties</h2><p>Le Fournisseur n'est pas responsable des dommages résultant de l'usure normale des équipements. Le Fournisseur garantit que les services seront effectués de manière professionnelle et compétente.</p><h2>7. Loi applicable</h2><p>Ce Contrat est régi par les lois de {{juridiction}} et tout litige sera soumis à la compétence exclusive des tribunaux de ce ressort.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>LE FOURNISSEUR — LE CLIENT<br/>Signature — Signature</p></div>`,
    popularity: 33,
  },

  // ════════════════════ JURIDIQUE & MANDAT (2) ════════════════════
  {
    code: 'ctr_assistance_juridique',
    name: 'Contrat de prestation de services d’assistance juridique',
    category: 'juridique_admin',
    price: 2500, priceMax: 4500,
    description: 'Contrat par lequel un cabinet d’avocats fournit à un client des services juridiques (conseils, consultations, rédaction de contrats) dans un domaine du droit déterminé : objet, honoraires, confidentialité et responsabilité.',
    fieldsJson: F([
      { key: 'cabinet_avocats', label: 'Cabinet d’avocats (société + pays + siège + avocat responsable)', type: 'textarea', required: true },
      { key: 'client', label: 'Client (personne physique ou morale + pays + siège + représentant)', type: 'textarea', required: true },
      { key: 'domaine_droit', label: 'Domaine du droit (contrats, travail, sociétés…)', type: 'text', required: true },
      { key: 'description_services', label: 'Description des services juridiques (délais, livrables, honoraires)', type: 'textarea', required: true },
      { key: 'honoraires', label: 'Honoraires et modalités de paiement', type: 'text', required: true },
      { key: 'ville', label: 'Ville des tribunaux compétents', type: 'text', required: true },
      { key: 'juridiction', label: 'Loi applicable (pays)', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE PRESTATION DE SERVICES D'ASSISTANCE JURIDIQUE</h1><p>Ce contrat (le « Contrat ») est conclu entre {{cabinet_avocats}}, ci-après « le Cabinet d'Avocats », et {{client}}, ci-après « le Client » (collectivement les « Parties »).</p><p><strong>CONSIDÉRANT</strong> que le Client a besoin de services juridiques dans le domaine {{domaine_droit}}, et que le Cabinet d'Avocats possède l'expertise nécessaire ;</p><h2>Article 1 - Objet du contrat</h2><p>Le Cabinet d'Avocats s'engage à fournir au Client des services juridiques, y compris des conseils, consultations, analyses, rédactions de contrats et tout autre service juridique nécessaire dans le domaine spécifié.</p><h2>Article 2 - Modalités des services</h2><p>2.1 Les services juridiques seront fournis conformément aux spécifications suivantes : {{description_services}}.</p><p>2.2 Le Cabinet d'Avocats assignera un avocat ou une équipe d'avocats qualifiés pour traiter les questions juridiques du Client.</p><h2>Article 3 - Honoraires et paiement</h2><p>En contrepartie des services fournis, le Client versera au Cabinet d'Avocats : <strong>{{honoraires}}</strong>.</p><h2>Article 4 - Confidentialité</h2><p>Le Cabinet d'Avocats s'engage à maintenir la confidentialité de toutes les informations confidentielles du Client auxquelles il a accès.</p><h2>Article 5 - Responsabilité</h2><p>Le Cabinet d'Avocats exécutera les services avec le soin et la diligence requis. Il ne sera pas responsable des dommages indirects ou consécutifs, sauf en cas de faute grave ou de négligence grave.</p><h2>Article 6 - Loi applicable et juridiction</h2><p>Ce Contrat est régi et interprété conformément aux lois de {{juridiction}}. Tout litige sera soumis à la juridiction exclusive des tribunaux de {{ville}}.</p><h2>Article 7 - Intégralité de l'accord</h2><p>Ce Contrat constitue l'intégralité de l'accord entre les Parties et remplace tout accord antérieur ou contemporain, oral ou écrit.</p><p class="signatures">Fait le {{date_jour}}, en deux exemplaires originaux<br/><br/>LE CABINET D'AVOCATS — LE CLIENT<br/>Signature — Signature<br/>Nom et titre de l'avocat responsable — Nom et titre du représentant légal</p></div>`,
    popularity: 36,
  },
  {
    code: 'ctr_mandat',
    name: 'Contrat de mandat',
    category: 'juridique_admin',
    price: 1800, priceMax: 3500,
    description: 'Contrat par lequel un mandant charge un mandataire d’agir en son nom et pour son compte (gestion, négociation, représentation) : objet et étendue du mandat, pouvoirs, responsabilités, rémunération et confidentialité.',
    fieldsJson: F([
      { key: 'mandant', label: 'Mandant (nom + adresse + contact)', type: 'textarea', required: true },
      { key: 'mandataire', label: 'Mandataire (nom + adresse + contact)', type: 'textarea', required: true },
      { key: 'objet_mandat', label: 'Objet du mandat (gestion, négociation, représentation…)', type: 'textarea', required: true },
      { key: 'remuneration', label: 'Rémunération du mandataire (montant / modalités)', type: 'text', required: true },
      { key: 'preavis', label: 'Préavis de résiliation (en jours)', type: 'text', required: true },
      { key: 'juridiction', label: 'Loi applicable et tribunaux compétents', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE MANDAT</h1><p><strong>ENTRE :</strong> {{mandant}}, ci-après le « Mandant »,</p><p><strong>ET :</strong> {{mandataire}}, ci-après le « Mandataire ».</p><h2>1. Objet du contrat</h2><p>Le Mandant désigne le Mandataire pour agir en son nom et pour son compte dans le but suivant : {{objet_mandat}}.</p><h2>2. Durée du mandat</h2><p>Ce mandat entre en vigueur à partir de la date de signature et reste en vigueur jusqu'à ce qu'il soit résilié par l'une ou l'autre des parties avec un préavis écrit de {{preavis}} jours.</p><h2>3. Pouvoirs du Mandataire</h2><p>Le Mandataire est autorisé à accomplir tous les actes nécessaires à l'exécution du mandat, conformément aux instructions du Mandant. Le Mandant peut donner des instructions spécifiques au Mandataire en cours de mandat.</p><h2>4. Responsabilités du Mandataire</h2><p>Le Mandataire agira avec diligence, compétence et soin dans l'exercice de ses pouvoirs et responsabilités. Il tiendra le Mandant régulièrement informé de l'état d'avancement des tâches.</p><h2>5. Rémunération</h2><p>Le Mandant rémunérera le Mandataire comme suit : <strong>{{remuneration}}</strong>.</p><h2>6. Confidentialité</h2><p>Le Mandataire s'engage à maintenir la confidentialité de toutes les informations et documents reçus du Mandant dans le cadre de ce mandat.</p><h2>7. Résiliation</h2><p>Ce contrat peut être résilié par l'une ou l'autre des parties avec un préavis écrit de {{preavis}} jours.</p><h2>8. Loi applicable et juridiction</h2><p>Ce contrat est régi par les lois de {{juridiction}}. Tout litige sera soumis à la juridiction exclusive des tribunaux compétents de ce ressort.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>LE MANDANT — LE MANDATAIRE<br/>Signature — Signature<br/>Nom (en lettres capitales) — Nom (en lettres capitales)</p></div>`,
    popularity: 40,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Mandat commercial et intermédiaires de commerce (commissionnaire, courtier, agent commercial) régis par l’Acte uniforme relatif au droit commercial général (AUDCG), art. 169 s.' },
      FR: { note: 'Contrat de mandat régi par les art. 1984 s. du Code civil ; obligation de reddition de comptes (art. 1993) et responsabilité du mandataire (art. 1992).' },
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

  console.log('✅ Seed Drive3 Contrats (JUR-006, passe n°2) terminé.');
  console.log(`   Templates du script : ${templates.length} (créés : ${created}, mis à jour : ${updated})`);
  console.log('   Répartition par catégorie (ce script) :');
  for (const [cat, n] of Object.entries(byCategory)) console.log(`     - ${cat} : ${n}`);
  console.log(`   Variantes pays (countriesJson) : ${withCountries} templates`);
  console.log(`   ➜ Total de templates en base : ${total}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
