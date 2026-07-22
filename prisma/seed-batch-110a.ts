import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // â”€â”€ 25 Animation / MultimÃ©dia / Jeux vidÃ©o â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    code: 'anim_jeu_video_studio',
    name: "Accord de service de crÃ©ation de jeu vidÃ©o (studio africain)",
    category: 'commercial_financier',
    price: 8000, priceMax: 24000,
    description: "Accord cadre entre un studio de jeu vidÃ©o africain et un client pour la crÃ©ation complÃ¨te d'un jeu vidÃ©o, incluant design, programmation et livraison.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'studio_nom',label:"Nom du studio",type:'text',required:true},
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'jeu_titre',label:"Titre du jeu",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison prÃ©vue",type:'date',required:true},
      {key:'budget_total',label:"Budget total (FCFA)",type:'text',required:true},
      {key:'description_jeu',label:"Description du jeu",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CRÃ‰ATION DE JEU VIDÃ‰O</h1><h2>Entre les soussignÃ©s</h2><p>Le studio <strong>{{studio_nom}}</strong>, ci-aprÃ¨s dÃ©nommÃ© Â«le PrestataireÂ»,</p><p>Et <strong>{{client_nom}}</strong>, ci-aprÃ¨s dÃ©nommÃ© Â«le ClientÂ»,</p><h2>Article 1 â€“ Objet</h2><p>Le Prestataire s'engage Ã  concevoir et dÃ©velopper le jeu vidÃ©o intitulÃ© <strong>{{jeu_titre}}</strong> selon les spÃ©cifications annexÃ©es au prÃ©sent accord.</p><h2>Article 2 â€“ Description du projet</h2><p>{{description_jeu}}</p><h2>Article 3 â€“ DÃ©lai</h2><p>Le jeu sera livrÃ© au plus tard le {{date_livraison}}.</p><h2>Article 4 â€“ RÃ©munÃ©ration</h2><p>Le budget total convenu est de <strong>{{budget_total}} FCFA</strong>, payable selon l'Ã©chÃ©ancier annexÃ©.</p><h2>Article 5 â€“ PropriÃ©tÃ© intellectuelle</h2><p>Ã€ complet paiement, les droits de propriÃ©tÃ© intellectuelle sur le jeu sont cÃ©dÃ©s au Client conformÃ©ment aux dispositions de l'Accord de Bangui rÃ©visÃ©.</p><p>Fait Ã  Abidjan, le â€¦â€¦â€¦â€¦â€¦</p><p>Le Prestataire : â€¦â€¦â€¦â€¦â€¦â€¦ Le Client : â€¦â€¦â€¦â€¦â€¦â€¦</p></div>`
  },
  {
    code: 'anim_app_mobile_game',
    name: "Accord de service de dÃ©veloppement d'application mobile (mobile game)",
    category: 'commercial_financier',
    price: 6000, priceMax: 18000,
    description: "Contrat de dÃ©veloppement d'un jeu mobile destinÃ© aux plateformes iOS et Android, prÃ©cisant les fonctionnalitÃ©s, les dÃ©lais et la rÃ©munÃ©ration.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'developpeur_nom',label:"Nom du dÃ©veloppeur",type:'text',required:true},
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'app_nom',label:"Nom de l'application",type:'text',required:true},
      {key:'plateforme',label:"Plateforme cible (iOS/Android)",type:'text',required:true},
      {key:'date_debut',label:"Date de dÃ©but",type:'date',required:true},
      {key:'montant',label:"Montant (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DÃ‰VELOPPEMENT D'APPLICATION MOBILE</h1><p>Entre <strong>{{developpeur_nom}}</strong> (le Prestataire) et <strong>{{client_nom}}</strong> (le Client),</p><h2>Article 1 â€“ Objet</h2><p>Le Prestataire s'engage Ã  dÃ©velopper le jeu mobile <strong>{{app_nom}}</strong> pour la plateforme <strong>{{plateforme}}</strong>.</p><h2>Article 2 â€“ DÃ©marrage</h2><p>Les travaux dÃ©buteront le {{date_debut}}.</p><h2>Article 3 â€“ RÃ©munÃ©ration</h2><p>Le montant forfaitaire est fixÃ© Ã  <strong>{{montant}} FCFA</strong>.</p><h2>Article 4 â€“ Obligations du Prestataire</h2><p>Le Prestataire garantit la conformitÃ© de l'application aux directives des stores et aux lois ivoiriennes en vigueur.</p><p>Fait Ã  Abidjan, le â€¦â€¦â€¦â€¦â€¦</p><p>Signatures : â€¦â€¦â€¦â€¦â€¦â€¦</p></div>`
  },
  {
    code: 'anim_conception_graphique_jeu',
    name: "Accord de service de conception graphique jeu (game design)",
    category: 'commercial_financier',
    price: 4000, priceMax: 12000,
    description: "Accord portant sur la conception graphique et le game design d'un jeu vidÃ©o, incluant interfaces, univers visuel et identitÃ© graphique.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 61,
    fieldsJson: F([
      {key:'designer_nom',label:"Nom du designer",type:'text',required:true},
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'projet_nom',label:"Nom du projet",type:'text',required:true},
      {key:'livrables',label:"Livrables attendus",type:'textarea',required:true},
      {key:'delai',label:"DÃ©lai de livraison",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CONCEPTION GRAPHIQUE JEU</h1><p>Entre <strong>{{designer_nom}}</strong> (le Designer) et <strong>{{client_nom}}</strong> (le Client),</p><h2>Article 1 â€“ Objet</h2><p>Le Designer rÃ©alise la conception graphique du projet <strong>{{projet_nom}}</strong>.</p><h2>Article 2 â€“ Livrables</h2><p>{{livrables}}</p><h2>Article 3 â€“ DÃ©lai</h2><p>Livraison prÃ©vue le {{delai}}.</p><h2>Article 4 â€“ Droits</h2><p>Les crÃ©ations sont cÃ©dÃ©es au Client aprÃ¨s rÃ¨glement intÃ©gral des honoraires.</p><p>Fait Ã  Abidjan, le â€¦â€¦â€¦â€¦â€¦</p></div>`
  },
  {
    code: 'anim_programmation_jeu',
    name: "Accord de service de programmation jeu (moteur Unity, Unreal)",
    category: 'commercial_financier',
    price: 7000, priceMax: 20000,
    description: "Contrat de programmation d'un jeu vidÃ©o sous les moteurs Unity ou Unreal Engine, avec spÃ©cifications techniques et conditions de livraison.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'programmeur_nom',label:"Nom du programmeur",type:'text',required:true},
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'moteur',label:"Moteur de jeu (Unity/Unreal)",type:'text',required:true},
      {key:'jeu_nom',label:"Nom du jeu",type:'text',required:true},
      {key:'date_fin',label:"Date de fin de mission",type:'date',required:true},
      {key:'tarif',label:"Tarif (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PROGRAMMATION DE JEU VIDÃ‰O</h1><p>Entre <strong>{{programmeur_nom}}</strong> (le Prestataire) et <strong>{{client_nom}}</strong> (le Client),</p><h2>Article 1 â€“ Objet</h2><p>Le Prestataire assure la programmation du jeu <strong>{{jeu_nom}}</strong> sous le moteur <strong>{{moteur}}</strong>.</p><h2>Article 2 â€“ DÃ©lai</h2><p>La mission prend fin le {{date_fin}}.</p><h2>Article 3 â€“ RÃ©munÃ©ration</h2><p>Tarif convenu : <strong>{{tarif}} FCFA</strong>.</p><h2>Article 4 â€“ ConfidentialitÃ©</h2><p>Le Prestataire s'engage Ã  garder confidentiels tous les Ã©lÃ©ments du projet.</p><p>Fait Ã  Abidjan, le â€¦â€¦â€¦â€¦â€¦</p></div>`
  },
  {
    code: 'anim_narration_interactive',
    name: "Accord de service de narration interactive (jeu narratif)",
    category: 'commercial_financier',
    price: 4000, priceMax: 12000,
    description: "Accord pour la crÃ©ation de scÃ©narios et d'arborescences narratives pour un jeu vidÃ©o narratif ancrÃ© dans les cultures africaines.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'auteur_nom',label:"Nom de l'auteur",type:'text',required:true},
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'jeu_nom',label:"Nom du jeu",type:'text',required:true},
      {key:'synopsis',label:"Synopsis du jeu",type:'textarea',required:true},
      {key:'date_livraison',label:"Date de livraison",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE NARRATION INTERACTIVE</h1><p>Entre <strong>{{auteur_nom}}</strong> (l'Auteur) et <strong>{{client_nom}}</strong> (le Client),</p><h2>Article 1 â€“ Objet</h2><p>L'Auteur crÃ©e le scÃ©nario narratif interactif du jeu <strong>{{jeu_nom}}</strong>.</p><h2>Article 2 â€“ Synopsis</h2><p>{{synopsis}}</p><h2>Article 3 â€“ DÃ©lai</h2><p>Livraison prÃ©vue le {{date_livraison}}.</p><h2>Article 4 â€“ Droits d'auteur</h2><p>Les droits sont rÃ©gis par les dispositions de l'Accord de Bangui rÃ©visÃ© et de la BURIDA.</p><p>Fait Ã  Abidjan, le â€¦â€¦â€¦â€¦â€¦</p></div>`
  },
  {
    code: 'anim_localisation_jeu',
    name: "Accord de service de localisation jeu vidÃ©o (franÃ§ais-dioula)",
    category: 'commercial_financier',
    price: 3000, priceMax: 9000,
    description: "Contrat de localisation d'un jeu vidÃ©o en langue dioula et en franÃ§ais, adaptÃ© aux rÃ©alitÃ©s culturelles ivoiriennes.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 48,
    fieldsJson: F([
      {key:'traducteur_nom',label:"Nom du traducteur",type:'text',required:true},
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'jeu_nom',label:"Nom du jeu",type:'text',required:true},
      {key:'langues',label:"Langues source/cible",type:'text',required:true},
      {key:'date_fin',label:"Date de fin",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE LOCALISATION JEU VIDÃ‰O</h1><p>Entre <strong>{{traducteur_nom}}</strong> (le Prestataire) et <strong>{{client_nom}}</strong> (le Client),</p><h2>Article 1 â€“ Objet</h2><p>Localisation du jeu <strong>{{jeu_nom}}</strong> dans les langues : <strong>{{langues}}</strong>.</p><h2>Article 2 â€“ DÃ©lai</h2><p>Travaux terminÃ©s le {{date_fin}}.</p><h2>Article 3 â€“ QualitÃ©</h2><p>Le Prestataire garantit une traduction fidÃ¨le et culturellement adaptÃ©e au contexte ivoirien.</p><p>Fait Ã  Abidjan, le â€¦â€¦â€¦â€¦â€¦</p></div>`
  },
  {
    code: 'anim_qa_testing_game',
    name: "Accord de service de test de jeu (QA testing game)",
    category: 'commercial_financier',
    price: 3500, priceMax: 10000,
    description: "Accord de prestation de tests qualitÃ© (QA) pour un jeu vidÃ©o, dÃ©finissant le pÃ©rimÃ¨tre des tests, les rapports de bugs et les critÃ¨res d'acceptation.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 52,
    fieldsJson: F([
      {key:'testeur_nom',label:"Nom du testeur / Ã©quipe QA",type:'text',required:true},
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'jeu_nom',label:"Nom du jeu",type:'text',required:true},
      {key:'phase_test',label:"Phase de test",type:'text',required:true},
      {key:'date_rapport',label:"Date de remise du rapport",type:'date',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TEST DE JEU VIDÃ‰O (QA)</h1><p>Entre <strong>{{testeur_nom}}</strong> (le Testeur) et <strong>{{client_nom}}</strong> (le Client),</p><h2>Article 1 â€“ Objet</h2><p>Le Testeur rÃ©alise les tests qualitÃ© du jeu <strong>{{jeu_nom}}</strong> en phase : <strong>{{phase_test}}</strong>.</p><h2>Article 2 â€“ Rapport</h2><p>Un rapport de bugs sera remis le {{date_rapport}}.</p><h2>Article 3 â€“ RÃ©munÃ©ration</h2><p>Honoraires : <strong>{{honoraires}} FCFA</strong>.</p><p>Fait Ã  Abidjan, le â€¦â€¦â€¦â€¦â€¦</p></div>`
  },
  {
    code: 'anim_monetisation_mobile',
    name: "Accord de service de monÃ©tisation jeu mobile (IAP, pub)",
    category: 'commercial_financier',
    price: 4000, priceMax: 12000,
    description: "Contrat de mise en place de stratÃ©gies de monÃ©tisation pour un jeu mobile (achats intÃ©grÃ©s, publicitÃ©s, abonnements) sur les marchÃ©s africains.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'prestataire_nom',label:"Nom du prestataire",type:'text',required:true},
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'jeu_nom',label:"Nom du jeu",type:'text',required:true},
      {key:'modele_monetisation',label:"ModÃ¨le de monÃ©tisation",type:'textarea',required:true},
      {key:'date_mise_en_oeuvre',label:"Date de mise en oeuvre",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MONÃ‰TISATION JEU MOBILE</h1><p>Entre <strong>{{prestataire_nom}}</strong> (le Prestataire) et <strong>{{client_nom}}</strong> (le Client),</p><h2>Article 1 â€“ Objet</h2><p>Le Prestataire implÃ©mente la stratÃ©gie de monÃ©tisation du jeu <strong>{{jeu_nom}}</strong>.</p><h2>Article 2 â€“ ModÃ¨le</h2><p>{{modele_monetisation}}</p><h2>Article 3 â€“ DÃ©marrage</h2><p>Mise en oeuvre le {{date_mise_en_oeuvre}}.</p><h2>Article 4 â€“ Partage des revenus</h2><p>Les modalitÃ©s de partage des revenus gÃ©nÃ©rÃ©s sont dÃ©finies en annexe.</p><p>Fait Ã  Abidjan, le â€¦â€¦â€¦â€¦â€¦</p></div>`
  },
  {
    code: 'anim_distribution_jeu',
    name: "Accord de service de distribution jeu (App Store, Google Play)",
    category: 'commercial_financier',
    price: 4000, priceMax: 12000,
    description: "Accord de distribution d'un jeu mobile sur les principales plateformes de tÃ©lÃ©chargement, couvrant la publication, le marketing et le suivi des ventes.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'distributeur_nom',label:"Nom du distributeur",type:'text',required:true},
      {key:'editeur_nom',label:"Nom de l'Ã©diteur",type:'text',required:true},
      {key:'jeu_nom',label:"Nom du jeu",type:'text',required:true},
      {key:'plateformes',label:"Plateformes de distribution",type:'text',required:true},
      {key:'date_publication',label:"Date de publication",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DISTRIBUTION DE JEU VIDÃ‰O</h1><p>Entre <strong>{{distributeur_nom}}</strong> (le Distributeur) et <strong>{{editeur_nom}}</strong> (l'Ã‰diteur),</p><h2>Article 1 â€“ Objet</h2><p>Distribution du jeu <strong>{{jeu_nom}}</strong> sur les plateformes : <strong>{{plateformes}}</strong>.</p><h2>Article 2 â€“ Publication</h2><p>Date de publication prÃ©vue : {{date_publication}}.</p><h2>Article 3 â€“ Revenus</h2><p>La rÃ©partition des revenus de vente est dÃ©taillÃ©e en annexe financiÃ¨re.</p><p>Fait Ã  Abidjan, le â€¦â€¦â€¦â€¦â€¦</p></div>`
  },
  {
    code: 'anim_jeu_educatif_ci',
    name: "Accord de service de jeu Ã©ducatif (serious game CI)",
    category: 'commercial_financier',
    price: 5000, priceMax: 15000,
    description: "Contrat de dÃ©veloppement d'un serious game Ã  vocation Ã©ducative pour le contexte ivoirien, destinÃ© aux Ã©tablissements scolaires ou Ã  la formation professionnelle.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'studio_nom',label:"Nom du studio",type:'text',required:true},
      {key:'commanditaire_nom',label:"Nom du commanditaire",type:'text',required:true},
      {key:'jeu_nom',label:"Nom du jeu Ã©ducatif",type:'text',required:true},
      {key:'public_cible',label:"Public cible",type:'text',required:true},
      {key:'objectifs_pedagogiques',label:"Objectifs pÃ©dagogiques",type:'textarea',required:true},
      {key:'date_livraison',label:"Date de livraison",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE JEU Ã‰DUCATIF (SERIOUS GAME)</h1><p>Entre <strong>{{studio_nom}}</strong> (le Prestataire) et <strong>{{commanditaire_nom}}</strong> (le Commanditaire),</p><h2>Article 1 â€“ Objet</h2><p>DÃ©veloppement du jeu Ã©ducatif <strong>{{jeu_nom}}</strong> destinÃ© Ã  <strong>{{public_cible}}</strong>.</p><h2>Article 2 â€“ Objectifs pÃ©dagogiques</h2><p>{{objectifs_pedagogiques}}</p><h2>Article 3 â€“ Livraison</h2><p>Date de livraison : {{date_livraison}}.</p><h2>Article 4 â€“ ConformitÃ©</h2><p>Le jeu sera conforme aux programmes scolaires officiels ivoiriens en vigueur.</p><p>Fait Ã  Abidjan, le â€¦â€¦â€¦â€¦â€¦</p></div>`
  },
  {
    code: 'anim_simulation_agricole',
    name: "Accord de service de jeu de simulation agricole (Afrique)",
    category: 'commercial_financier',
    price: 5000, priceMax: 15000,
    description: "Accord pour le dÃ©veloppement d'un jeu de simulation agricole adaptÃ© aux cultures africaines (cacao, cafÃ©, maÃ¯s) Ã  des fins Ã©ducatives et professionnelles.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 53,
    fieldsJson: F([
      {key:'studio_nom',label:"Nom du studio",type:'text',required:true},
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'cultures_simulees',label:"Cultures simulÃ©es",type:'text',required:true},
      {key:'description_projet',label:"Description du projet",type:'textarea',required:true},
      {key:'date_livraison',label:"Date de livraison",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE JEU DE SIMULATION AGRICOLE</h1><p>Entre <strong>{{studio_nom}}</strong> (le Prestataire) et <strong>{{client_nom}}</strong> (le Client),</p><h2>Article 1 â€“ Objet</h2><p>DÃ©veloppement d'un simulateur agricole couvrant les cultures : <strong>{{cultures_simulees}}</strong>.</p><h2>Article 2 â€“ Description</h2><p>{{description_projet}}</p><h2>Article 3 â€“ Livraison</h2><p>Livraison prÃ©vue le {{date_livraison}}.</p><p>Fait Ã  Abidjan, le â€¦â€¦â€¦â€¦â€¦</p></div>`
  },
  {
    code: 'anim_animation_2d',
    name: "Accord de service d'animation 2D (studio africain)",
    category: 'commercial_financier',
    price: 4500, priceMax: 13000,
    description: "Contrat de production d'animations 2D (sÃ©ries, courts-mÃ©trages, spots) par un studio africain, incluant storyboard, animation et postproduction.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 64,
    fieldsJson: F([
      {key:'studio_nom',label:"Nom du studio",type:'text',required:true},
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'oeuvre_titre',label:"Titre de l'oeuvre",type:'text',required:true},
      {key:'duree',label:"DurÃ©e totale (minutes)",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison",type:'date',required:true},
      {key:'budget',label:"Budget (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ANIMATION 2D</h1><p>Entre <strong>{{studio_nom}}</strong> (le Studio) et <strong>{{client_nom}}</strong> (le Client),</p><h2>Article 1 â€“ Objet</h2><p>Production de l'animation 2D intitulÃ©e <strong>{{oeuvre_titre}}</strong>, d'une durÃ©e de <strong>{{duree}} minutes</strong>.</p><h2>Article 2 â€“ Budget</h2><p>Budget total : <strong>{{budget}} FCFA</strong>.</p><h2>Article 3 â€“ Livraison</h2><p>Livraison le {{date_livraison}}.</p><h2>Article 4 â€“ Droits</h2><p>Les droits de diffusion sont prÃ©cisÃ©s en annexe conformÃ©ment Ã  l'Accord de Bangui rÃ©visÃ©.</p><p>Fait Ã  Abidjan, le â€¦â€¦â€¦â€¦â€¦</p></div>`
  },
  {
    code: 'anim_animation_3d_vfx',
    name: "Accord de service d'animation 3D (effets visuels VFX)",
    category: 'commercial_financier',
    price: 7000, priceMax: 22000,
    description: "Accord de prestation pour la rÃ©alisation d'effets visuels et d'animations 3D destinÃ©s au cinÃ©ma, Ã  la publicitÃ© ou aux jeux vidÃ©o.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 67,
    fieldsJson: F([
      {key:'studio_nom',label:"Nom du studio VFX",type:'text',required:true},
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'projet_nom',label:"Nom du projet",type:'text',required:true},
      {key:'specification_vfx',label:"SpÃ©cifications VFX requises",type:'textarea',required:true},
      {key:'date_rendu',label:"Date de rendu final",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ANIMATION 3D ET EFFETS VISUELS (VFX)</h1><p>Entre <strong>{{studio_nom}}</strong> (le Prestataire) et <strong>{{client_nom}}</strong> (le Client),</p><h2>Article 1 â€“ Objet</h2><p>RÃ©alisation des effets visuels 3D pour le projet <strong>{{projet_nom}}</strong>.</p><h2>Article 2 â€“ SpÃ©cifications</h2><p>{{specification_vfx}}</p><h2>Article 3 â€“ Rendu final</h2><p>Livraison du rendu final le {{date_rendu}}.</p><p>Fait Ã  Abidjan, le â€¦â€¦â€¦â€¦â€¦</p></div>`
  },
  {
    code: 'anim_realite_virtuelle',
    name: "Accord de service de rÃ©alitÃ© virtuelle (VR experience)",
    category: 'commercial_financier',
    price: 8000, priceMax: 24000,
    description: "Contrat de dÃ©veloppement d'une expÃ©rience de rÃ©alitÃ© virtuelle immersive pour des applications touristiques, Ã©ducatives ou commerciales en Afrique.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 59,
    fieldsJson: F([
      {key:'developpeur_nom',label:"Nom du dÃ©veloppeur VR",type:'text',required:true},
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'experience_nom',label:"Nom de l'expÃ©rience VR",type:'text',required:true},
      {key:'usage_prevu',label:"Usage prÃ©vu",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison",type:'date',required:true},
      {key:'tarif',label:"Tarif (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RÃ‰ALITÃ‰ VIRTUELLE (VR)</h1><p>Entre <strong>{{developpeur_nom}}</strong> (le Prestataire) et <strong>{{client_nom}}</strong> (le Client),</p><h2>Article 1 â€“ Objet</h2><p>DÃ©veloppement de l'expÃ©rience VR <strong>{{experience_nom}}</strong> pour usage : <strong>{{usage_prevu}}</strong>.</p><h2>Article 2 â€“ Tarif</h2><p>Tarif convenu : <strong>{{tarif}} FCFA</strong>.</p><h2>Article 3 â€“ Livraison</h2><p>Livraison prÃ©vue le {{date_livraison}}.</p><p>Fait Ã  Abidjan, le â€¦â€¦â€¦â€¦â€¦</p></div>`
  },
  {
    code: 'anim_realite_augmentee',
    name: "Accord de service de rÃ©alitÃ© augmentÃ©e (AR app)",
    category: 'commercial_financier',
    price: 7000, priceMax: 20000,
    description: "Accord pour la crÃ©ation d'une application de rÃ©alitÃ© augmentÃ©e destinÃ©e au commerce, au tourisme ou Ã  l'Ã©ducation sur le marchÃ© africain.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 57,
    fieldsJson: F([
      {key:'prestataire_nom',label:"Nom du prestataire AR",type:'text',required:true},
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'app_nom',label:"Nom de l'application AR",type:'text',required:true},
      {key:'description_fonctionnalites',label:"Description des fonctionnalitÃ©s",type:'textarea',required:true},
      {key:'date_livraison',label:"Date de livraison",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RÃ‰ALITÃ‰ AUGMENTÃ‰E (AR)</h1><p>Entre <strong>{{prestataire_nom}}</strong> (le Prestataire) et <strong>{{client_nom}}</strong> (le Client),</p><h2>Article 1 â€“ Objet</h2><p>DÃ©veloppement de l'application AR <strong>{{app_nom}}</strong>.</p><h2>Article 2 â€“ FonctionnalitÃ©s</h2><p>{{description_fonctionnalites}}</p><h2>Article 3 â€“ Livraison</h2><p>Livraison le {{date_livraison}}.</p><p>Fait Ã  Abidjan, le â€¦â€¦â€¦â€¦â€¦</p></div>`
  },
  {
    code: 'anim_bd_numerique_webtoon',
    name: "Accord de service de bande dessinÃ©e numÃ©rique (webtoon africain)",
    category: 'commercial_financier',
    price: 3500, priceMax: 10000,
    description: "Contrat de crÃ©ation d'une bande dessinÃ©e numÃ©rique (webtoon) mettant en valeur des personnages et des histoires africaines pour les plateformes en ligne.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 54,
    fieldsJson: F([
      {key:'auteur_nom',label:"Nom de l'auteur",type:'text',required:true},
      {key:'editeur_nom',label:"Nom de l'Ã©diteur",type:'text',required:true},
      {key:'bd_titre',label:"Titre de la BD",type:'text',required:true},
      {key:'nb_episodes',label:"Nombre d'Ã©pisodes prÃ©vus",type:'text',required:true},
      {key:'date_debut_publication',label:"Date de dÃ©but de publication",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE BANDE DESSINÃ‰E NUMÃ‰RIQUE (WEBTOON)</h1><p>Entre <strong>{{auteur_nom}}</strong> (l'Auteur) et <strong>{{editeur_nom}}</strong> (l'Ã‰diteur),</p><h2>Article 1 â€“ Objet</h2><p>CrÃ©ation et publication du webtoon <strong>{{bd_titre}}</strong> en <strong>{{nb_episodes}}</strong> Ã©pisodes.</p><h2>Article 2 â€“ Publication</h2><p>DÃ©but de publication prÃ©vu le {{date_debut_publication}}.</p><h2>Article 3 â€“ Droits d'auteur</h2><p>Les droits sont protÃ©gÃ©s conformÃ©ment aux dispositions de la BURIDA et de l'Accord de Bangui rÃ©visÃ©.</p><p>Fait Ã  Abidjan, le â€¦â€¦â€¦â€¦â€¦</p></div>`
  },
  {
    code: 'anim_character_design',
    name: "Accord de service de crÃ©ation de personnage (character design)",
    category: 'commercial_financier',
    price: 3000, priceMax: 9000,
    description: "Contrat de design de personnages originaux pour jeux vidÃ©o, animations ou bandes dessinÃ©es, avec cession des droits d'exploitation.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'designer_nom',label:"Nom du designer",type:'text',required:true},
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'nb_personnages',label:"Nombre de personnages",type:'text',required:true},
      {key:'description_univers',label:"Description de l'univers",type:'textarea',required:true},
      {key:'date_livraison',label:"Date de livraison",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CHARACTER DESIGN</h1><p>Entre <strong>{{designer_nom}}</strong> (le Designer) et <strong>{{client_nom}}</strong> (le Client),</p><h2>Article 1 â€“ Objet</h2><p>CrÃ©ation de <strong>{{nb_personnages}}</strong> personnages originaux.</p><h2>Article 2 â€“ Univers</h2><p>{{description_univers}}</p><h2>Article 3 â€“ Livraison</h2><p>Livraison le {{date_livraison}}.</p><h2>Article 4 â€“ Cession de droits</h2><p>Les droits d'exploitation des personnages sont cÃ©dÃ©s au Client aprÃ¨s paiement intÃ©gral.</p><p>Fait Ã  Abidjan, le â€¦â€¦â€¦â€¦â€¦</p></div>`
  },
  {
    code: 'anim_storyboard_concept_art',
    name: "Accord de service de storyboard et concept art",
    category: 'commercial_financier',
    price: 3000, priceMax: 9000,
    description: "Accord pour la rÃ©alisation de storyboards et de concept arts pour des projets audiovisuels, jeux vidÃ©o ou campagnes publicitaires.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 50,
    fieldsJson: F([
      {key:'artiste_nom',label:"Nom de l'artiste",type:'text',required:true},
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'projet_nom',label:"Nom du projet",type:'text',required:true},
      {key:'nb_planches',label:"Nombre de planches",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE STORYBOARD ET CONCEPT ART</h1><p>Entre <strong>{{artiste_nom}}</strong> (l'Artiste) et <strong>{{client_nom}}</strong> (le Client),</p><h2>Article 1 â€“ Objet</h2><p>RÃ©alisation de <strong>{{nb_planches}}</strong> planches de storyboard/concept art pour le projet <strong>{{projet_nom}}</strong>.</p><h2>Article 2 â€“ Livraison</h2><p>Livraison le {{date_livraison}}.</p><h2>Article 3 â€“ Corrections</h2><p>Deux cycles de corrections sont inclus dans le tarif convenu.</p><p>Fait Ã  Abidjan, le â€¦â€¦â€¦â€¦â€¦</p></div>`
  },
  {
    code: 'anim_musique_sound_design',
    name: "Accord de service de musique et sound design jeu",
    category: 'commercial_financier',
    price: 4000, priceMax: 12000,
    description: "Contrat de composition musicale et de conception sonore pour un jeu vidÃ©o, intÃ©grant des influences musicales africaines.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 56,
    fieldsJson: F([
      {key:'compositeur_nom',label:"Nom du compositeur",type:'text',required:true},
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'jeu_nom',label:"Nom du jeu",type:'text',required:true},
      {key:'livrables_audio',label:"Livrables audio attendus",type:'textarea',required:true},
      {key:'date_livraison',label:"Date de livraison",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MUSIQUE ET SOUND DESIGN</h1><p>Entre <strong>{{compositeur_nom}}</strong> (le Compositeur) et <strong>{{client_nom}}</strong> (le Client),</p><h2>Article 1 â€“ Objet</h2><p>Composition musicale et sound design pour le jeu <strong>{{jeu_nom}}</strong>.</p><h2>Article 2 â€“ Livrables</h2><p>{{livrables_audio}}</p><h2>Article 3 â€“ Livraison</h2><p>Livraison le {{date_livraison}}.</p><h2>Article 4 â€“ Droits voisins</h2><p>Les droits voisins sont gÃ©rÃ©s conformÃ©ment aux rÃ¨gles de la BURIDA CÃ´te d'Ivoire.</p><p>Fait Ã  Abidjan, le â€¦â€¦â€¦â€¦â€¦</p></div>`
  },
  {
    code: 'anim_streaming_gaming',
    name: "Accord de service de streaming gaming (Twitch, YouTube)",
    category: 'commercial_financier',
    price: 3500, priceMax: 10000,
    description: "Accord encadrant les prestations d'un streamer gaming africain pour le compte d'un annonceur ou d'un Ã©diteur de jeux vidÃ©o.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'streamer_nom',label:"Nom du streamer",type:'text',required:true},
      {key:'annonceur_nom',label:"Nom de l'annonceur",type:'text',required:true},
      {key:'plateforme',label:"Plateforme de streaming",type:'text',required:true},
      {key:'duree_contrat',label:"DurÃ©e du contrat",type:'text',required:true},
      {key:'date_debut',label:"Date de dÃ©but",type:'date',required:true},
      {key:'remuneration',label:"RÃ©munÃ©ration (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE STREAMING GAMING</h1><p>Entre <strong>{{streamer_nom}}</strong> (le Streamer) et <strong>{{annonceur_nom}}</strong> (l'Annonceur),</p><h2>Article 1 â€“ Objet</h2><p>Prestation de streaming gaming sur <strong>{{plateforme}}</strong> pour une durÃ©e de <strong>{{duree_contrat}}</strong>.</p><h2>Article 2 â€“ DÃ©but</h2><p>Date de dÃ©but : {{date_debut}}.</p><h2>Article 3 â€“ RÃ©munÃ©ration</h2><p>RÃ©munÃ©ration convenue : <strong>{{remuneration}} FCFA</strong>.</p><p>Fait Ã  Abidjan, le â€¦â€¦â€¦â€¦â€¦</p></div>`
  },
  {
    code: 'anim_formation_game_design',
    name: "Accord de service de formation game design (Ã©cole)",
    category: 'commercial_financier',
    price: 4000, priceMax: 12000,
    description: "Contrat de formation en game design dispensÃ©e par un professionnel Ã  une Ã©cole ou Ã  un groupe d'apprenants en CÃ´te d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'formateur_nom',label:"Nom du formateur",type:'text',required:true},
      {key:'etablissement_nom',label:"Nom de l'Ã©tablissement",type:'text',required:true},
      {key:'programme',label:"Programme de formation",type:'textarea',required:true},
      {key:'date_debut',label:"Date de dÃ©but",type:'date',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FORMATION GAME DESIGN</h1><p>Entre <strong>{{formateur_nom}}</strong> (le Formateur) et <strong>{{etablissement_nom}}</strong> (l'Ã‰tablissement),</p><h2>Article 1 â€“ Objet</h2><p>Formation en game design selon le programme ci-aprÃ¨s.</p><h2>Article 2 â€“ Programme</h2><p>{{programme}}</p><h2>Article 3 â€“ DÃ©but</h2><p>DÃ©but de la formation : {{date_debut}}.</p><h2>Article 4 â€“ Honoraires</h2><p>Honoraires : <strong>{{honoraires}} FCFA</strong>.</p><p>Fait Ã  Abidjan, le â€¦â€¦â€¦â€¦â€¦</p></div>`
  },
  {
    code: 'anim_partenariat_studio_editeur',
    name: "Accord de partenariat studio-Ã©diteur jeu vidÃ©o",
    category: 'commercial_financier',
    price: 6000, priceMax: 18000,
    description: "Accord de partenariat entre un studio de dÃ©veloppement et un Ã©diteur de jeux vidÃ©o africain, prÃ©cisant les droits, obligations et partage des bÃ©nÃ©fices.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'studio_nom',label:"Nom du studio",type:'text',required:true},
      {key:'editeur_nom',label:"Nom de l'Ã©diteur",type:'text',required:true},
      {key:'jeu_nom',label:"Titre du jeu",type:'text',required:true},
      {key:'partage_revenus',label:"ClÃ© de partage des revenus",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT STUDIO-Ã‰DITEUR JEU VIDÃ‰O</h1><p>Entre <strong>{{studio_nom}}</strong> (le Studio) et <strong>{{editeur_nom}}</strong> (l'Ã‰diteur),</p><h2>Article 1 â€“ Objet</h2><p>Partenariat pour la publication du jeu <strong>{{jeu_nom}}</strong>.</p><h2>Article 2 â€“ Partage des revenus</h2><p>ClÃ© de rÃ©partition : <strong>{{partage_revenus}}</strong>.</p><h2>Article 3 â€“ DurÃ©e</h2><p>Partenariat conclu Ã  compter du {{date_signature}} pour une durÃ©e de cinq ans renouvelable.</p><h2>Article 4 â€“ RÃ©siliation</h2><p>Chaque partie peut rÃ©silier avec un prÃ©avis de 90 jours.</p><p>Fait Ã  Abidjan, le {{date_signature}}</p></div>`
  },
  {
    code: 'anim_rapport_performance_studio',
    name: "Rapport de performance studio jeu vidÃ©o",
    category: 'commercial_financier',
    price: 3000, priceMax: 8000,
    description: "Rapport d'Ã©valuation des performances d'un studio de jeu vidÃ©o africain : ventes, tÃ©lÃ©chargements, revenus, indicateurs clÃ©s et recommandations.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 47,
    fieldsJson: F([
      {key:'studio_nom',label:"Nom du studio",type:'text',required:true},
      {key:'periode',label:"PÃ©riode couverte",type:'text',required:true},
      {key:'kpi_principaux',label:"KPI principaux",type:'textarea',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE STUDIO JEU VIDÃ‰O</h1><h2>Studio : {{studio_nom}}</h2><h2>PÃ©riode : {{periode}}</h2><h2>Date du rapport : {{date_rapport}}</h2><h2>1. Indicateurs clÃ©s de performance</h2><p>{{kpi_principaux}}</p><h2>2. Analyse</h2><p>Ce rapport prÃ©sente les rÃ©sultats obtenus au cours de la pÃ©riode considÃ©rÃ©e et identifie les axes d'amÃ©lioration prioritaires.</p><h2>3. Recommandations</h2><p>Les recommandations stratÃ©giques pour la pÃ©riode suivante sont dÃ©taillÃ©es en annexe.</p><p>Ã‰tabli Ã  Abidjan, le {{date_rapport}}</p></div>`
  },
  {
    code: 'anim_plan_dev_industrie_jeu',
    name: "Plan de dÃ©veloppement industrie du jeu africain",
    category: 'commercial_financier',
    price: 5000, priceMax: 15000,
    description: "Document stratÃ©gique dÃ©finissant un plan de dÃ©veloppement pour l'industrie du jeu vidÃ©o en Afrique francophone, incluant objectifs, ressources et Ã©chÃ©ancier.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 49,
    fieldsJson: F([
      {key:'organisme_nom',label:"Nom de l'organisme porteur",type:'text',required:true},
      {key:'vision',label:"Vision stratÃ©gique",type:'textarea',required:true},
      {key:'horizon_temporel',label:"Horizon temporel du plan",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>PLAN DE DÃ‰VELOPPEMENT DE L'INDUSTRIE DU JEU AFRICAIN</h1><h2>PortÃ© par : {{organisme_nom}}</h2><h2>Horizon : {{horizon_temporel}}</h2><h2>1. Vision</h2><p>{{vision}}</p><h2>2. Axes stratÃ©giques</h2><p>Ce plan articule les actions autour de quatre axes : formation des talents, accÃ¨s au financement, dÃ©veloppement des marchÃ©s et protection de la propriÃ©tÃ© intellectuelle.</p><h2>3. Gouvernance</h2><p>Un comitÃ© de pilotage est mis en place pour assurer le suivi et l'Ã©valuation du plan.</p><p>AdoptÃ© le {{date_adoption}}</p></div>`
  },
  {
    code: 'anim_charte_jeu_responsable',
    name: "Charte du jeu vidÃ©o responsable et de la culture africaine",
    category: 'commercial_financier',
    price: 3000, priceMax: 8000,
    description: "Charte Ã©thique engageant les acteurs du jeu vidÃ©o africain Ã  promouvoir des contenus responsables, inclusifs et valorisant les cultures africaines.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 45,
    fieldsJson: F([
      {key:'organisation_nom',label:"Nom de l'organisation",type:'text',required:true},
      {key:'valeurs_fondamentales',label:"Valeurs fondamentales",type:'textarea',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CHARTE DU JEU VIDÃ‰O RESPONSABLE ET DE LA CULTURE AFRICAINE</h1><h2>AdoptÃ©e par : {{organisation_nom}}</h2><h2>Date : {{date_adoption}}</h2><h2>PrÃ©ambule</h2><p>Les acteurs du jeu vidÃ©o africain, conscients de leur rÃ´le dans la promotion des cultures du continent, s'engagent Ã  respecter les principes de la prÃ©sente charte.</p><h2>Valeurs fondamentales</h2><p>{{valeurs_fondamentales}}</p><h2>Engagements</h2><p>Les signataires s'engagent Ã  produire des contenus qui reflÃ¨tent positivement les cultures africaines, Ã  lutter contre les stÃ©rÃ©otypes et Ã  favoriser l'inclusion de toutes les communautÃ©s.</p><p>SignÃ© Ã  Abidjan, le {{date_adoption}}</p></div>`
  },

  // â”€â”€ 25 Radio / TV / MÃ©dias audiovisuels â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    code: 'radi_creation_radio_locale',
    name: "Accord de service de crÃ©ation d'une radio locale (HACA CI)",
    category: 'commercial_financier',
    price: 6000, priceMax: 18000,
    description: "Accord cadre pour la crÃ©ation d'une radio locale en CÃ´te d'Ivoire, conformÃ©ment aux exigences rÃ©glementaires de la Haute AutoritÃ© de la Communication Audiovisuelle (HACA).",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'operateur_nom',label:"Nom de l'opÃ©rateur",type:'text',required:true},
      {key:'radio_nom',label:"Nom de la radio",type:'text',required:true},
      {key:'zone_couverture',label:"Zone de couverture",type:'text',required:true},
      {key:'frequence_fm',label:"FrÃ©quence FM demandÃ©e",type:'text',required:true},
      {key:'date_depot_dossier',label:"Date de dÃ©pÃ´t du dossier HACA",type:'date',required:true},
      {key:'capital_social',label:"Capital social (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CRÃ‰ATION D'UNE RADIO LOCALE</h1><h2>ConformÃ©ment aux dispositions de la HACA CI</h2><p>OpÃ©rateur : <strong>{{operateur_nom}}</strong></p><p>Nom de la radio : <strong>{{radio_nom}}</strong></p><h2>Article 1 â€“ Objet</h2><p>Le prÃ©sent accord encadre la crÃ©ation de la radio <strong>{{radio_nom}}</strong> sur la frÃ©quence <strong>{{frequence_fm}} MHz</strong>, couvrant la zone de <strong>{{zone_couverture}}</strong>.</p><h2>Article 2 â€“ Capital</h2><p>Capital social : <strong>{{capital_social}} FCFA</strong>.</p><h2>Article 3 â€“ ProcÃ©dure HACA</h2><p>Le dossier de demande d'autorisation sera dÃ©posÃ© auprÃ¨s de la HACA le {{date_depot_dossier}}.</p><h2>Article 4 â€“ Obligations</h2><p>L'opÃ©rateur s'engage Ã  respecter le cahier des charges Ã©ditorial fixÃ© par la HACA et Ã  diffuser un minimum de 40% de contenus locaux.</p><p>Fait Ã  Abidjan, le â€¦â€¦â€¦â€¦â€¦</p></div>`
  },
  {
    code: 'radi_licence_diffusion_fm',
    name: "Accord de licence de diffusion radio FM (HACA CI)",
    category: 'commercial_financier',
    price: 5000, priceMax: 15000,
    description: "Accord de licence autorisant la diffusion d'une radio FM en CÃ´te d'Ivoire, dÃ©livrÃ© dans le cadre des attributions de la HACA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'titulaire_nom',label:"Nom du titulaire de la licence",type:'text',required:true},
      {key:'radio_nom',label:"Nom de la radio",type:'text',required:true},
      {key:'frequence',label:"FrÃ©quence attribuÃ©e (MHz)",type:'text',required:true},
      {key:'date_debut_licence',label:"Date de dÃ©but de la licence",type:'date',required:true},
      {key:'duree_licence',label:"DurÃ©e de la licence (annÃ©es)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE LICENCE DE DIFFUSION RADIO FM</h1><h2>AutoritÃ© concÃ©dante : HACA CÃ´te d'Ivoire</h2><p>Titulaire : <strong>{{titulaire_nom}}</strong></p><h2>Article 1 â€“ Attribution</h2><p>La prÃ©sente licence autorise la diffusion de la radio <strong>{{radio_nom}}</strong> sur la frÃ©quence <strong>{{frequence}} MHz</strong>.</p><h2>Article 2 â€“ DurÃ©e</h2><p>Licence accordÃ©e Ã  compter du {{date_debut_licence}} pour une durÃ©e de <strong>{{duree_licence}} ans</strong>.</p><h2>Article 3 â€“ Obligations du titulaire</h2><p>Le titulaire s'engage Ã  respecter la lÃ©gislation ivoirienne sur la communication audiovisuelle et le cahier des charges annexÃ©.</p><p>Fait Ã  Abidjan, le â€¦â€¦â€¦â€¦â€¦</p></div>`
  },
  {
    code: 'radi_production_emission_radio',
    name: "Accord de service de production d'Ã©mission radio",
    category: 'commercial_financier',
    price: 3500, priceMax: 10000,
    description: "Contrat de production d'Ã©missions radiophoniques pour une station, prÃ©cisant le format, la frÃ©quence de diffusion et la rÃ©munÃ©ration du producteur.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'producteur_nom',label:"Nom du producteur",type:'text',required:true},
      {key:'radio_nom',label:"Nom de la radio",type:'text',required:true},
      {key:'emission_titre',label:"Titre de l'Ã©mission",type:'text',required:true},
      {key:'format',label:"Format et durÃ©e de l'Ã©mission",type:'text',required:true},
      {key:'date_premiere_diffusion',label:"Date de premiÃ¨re diffusion",type:'date',required:true},
      {key:'remuneration',label:"RÃ©munÃ©ration (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRODUCTION D'Ã‰MISSION RADIO</h1><p>Entre <strong>{{producteur_nom}}</strong> (le Producteur) et la radio <strong>{{radio_nom}}</strong>,</p><h2>Article 1 â€“ Objet</h2><p>Production de l'Ã©mission <strong>{{emission_titre}}</strong>, format : <strong>{{format}}</strong>.</p><h2>Article 2 â€“ Diffusion</h2><p>PremiÃ¨re diffusion prÃ©vue le {{date_premiere_diffusion}}.</p><h2>Article 3 â€“ RÃ©munÃ©ration</h2><p>RÃ©munÃ©ration : <strong>{{remuneration}} FCFA</strong> par Ã©mission.</p><p>Fait Ã  Abidjan, le â€¦â€¦â€¦â€¦â€¦</p></div>`
  },
  {
    code: 'radi_habillage_antenne_radio',
    name: "Accord de service d'habillage antenne radio",
    category: 'commercial_financier',
    price: 3000, priceMax: 9000,
    description: "Contrat pour la crÃ©ation de l'identitÃ© sonore d'une station radio : jingles, gÃ©nÃ©riques, spots d'habillage et musiques d'ambiance.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 52,
    fieldsJson: F([
      {key:'prestataire_nom',label:"Nom du prestataire sonore",type:'text',required:true},
      {key:'radio_nom',label:"Nom de la radio",type:'text',required:true},
      {key:'livrables',label:"Livrables sonores attendus",type:'textarea',required:true},
      {key:'date_livraison',label:"Date de livraison",type:'date',required:true},
      {key:'budget',label:"Budget (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'HABILLAGE ANTENNE RADIO</h1><p>Entre <strong>{{prestataire_nom}}</strong> (le Prestataire) et la radio <strong>{{radio_nom}}</strong>,</p><h2>Article 1 â€“ Objet</h2><p>CrÃ©ation de l'identitÃ© sonore de la radio incluant les Ã©lÃ©ments suivants.</p><h2>Article 2 â€“ Livrables</h2><p>{{livrables}}</p><h2>Article 3 â€“ Livraison</h2><p>Livraison le {{date_livraison}}. Budget : <strong>{{budget}} FCFA</strong>.</p><p>Fait Ã  Abidjan, le â€¦â€¦â€¦â€¦â€¦</p></div>`
  },
  {
    code: 'radi_regie_pub_radio',
    name: "Accord de service de rÃ©gie publicitaire radio",
    category: 'commercial_financier',
    price: 4000, priceMax: 12000,
    description: "Accord confiant la gestion de la rÃ©gie publicitaire d'une station radio Ã  une rÃ©gie externe, dÃ©finissant les objectifs, les tarifs et les commissions.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'regie_nom',label:"Nom de la rÃ©gie",type:'text',required:true},
      {key:'radio_nom',label:"Nom de la radio",type:'text',required:true},
      {key:'commission',label:"Taux de commission (%)",type:'text',required:true},
      {key:'duree_contrat',label:"DurÃ©e du contrat",type:'text',required:true},
      {key:'date_prise_effet',label:"Date de prise d'effet",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RÃ‰GIE PUBLICITAIRE RADIO</h1><p>Entre <strong>{{regie_nom}}</strong> (la RÃ©gie) et la radio <strong>{{radio_nom}}</strong>,</p><h2>Article 1 â€“ Mission</h2><p>La RÃ©gie assure la commercialisation des espaces publicitaires de la radio pour une durÃ©e de <strong>{{duree_contrat}}</strong>.</p><h2>Article 2 â€“ Commission</h2><p>Taux de commission : <strong>{{commission}}%</strong> sur le chiffre d'affaires publicitaire net.</p><h2>Article 3 â€“ Prise d'effet</h2><p>Contrat effectif Ã  compter du {{date_prise_effet}}.</p><p>Fait Ã  Abidjan, le â€¦â€¦â€¦â€¦â€¦</p></div>`
  },
  {
    code: 'radi_creation_chaine_tv',
    name: "Accord de service de crÃ©ation d'une chaÃ®ne de tÃ©lÃ©vision (HACA CI)",
    category: 'commercial_financier',
    price: 9000, priceMax: 28000,
    description: "Accord encadrant la crÃ©ation d'une chaÃ®ne de tÃ©lÃ©vision privÃ©e en CÃ´te d'Ivoire, conformÃ©ment aux exigences de la HACA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'operateur_nom',label:"Nom de l'opÃ©rateur",type:'text',required:true},
      {key:'chaine_nom',label:"Nom de la chaÃ®ne",type:'text',required:true},
      {key:'type_chaine',label:"Type de chaÃ®ne (gÃ©nÃ©raliste, thÃ©matique...)",type:'text',required:true},
      {key:'capital_social',label:"Capital social (FCFA)",type:'text',required:true},
      {key:'date_depot_dossier',label:"Date de dÃ©pÃ´t HACA",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CRÃ‰ATION D'UNE CHAÃŽNE DE TÃ‰LÃ‰VISION</h1><h2>RÃ©fÃ©rence rÃ©glementaire : HACA CÃ´te d'Ivoire</h2><p>OpÃ©rateur : <strong>{{operateur_nom}}</strong></p><h2>Article 1 â€“ Objet</h2><p>CrÃ©ation de la chaÃ®ne <strong>{{chaine_nom}}</strong> de type <strong>{{type_chaine}}</strong>.</p><h2>Article 2 â€“ Capital</h2><p>Capital social : <strong>{{capital_social}} FCFA</strong>.</p><h2>Article 3 â€“ ProcÃ©dure HACA</h2><p>Le dossier d'autorisation sera dÃ©posÃ© le {{date_depot_dossier}}.</p><h2>Article 4 â€“ Cahier des charges</h2><p>L'opÃ©rateur s'engage Ã  respecter les obligations de diffusion de contenus locaux et le pluralisme de l'information.</p><p>Fait Ã  Abidjan, le â€¦â€¦â€¦â€¦â€¦</p></div>`
  },
  {
    code: 'radi_licence_diffusion_tv',
    name: "Accord de licence de diffusion TV hertzienne (HACA CI)",
    category: 'commercial_financier',
    price: 7000, priceMax: 22000,
    description: "Licence de diffusion tÃ©lÃ©visuelle hertzienne dÃ©livrÃ©e par la HACA en CÃ´te d'Ivoire, prÃ©cisant les conditions d'exploitation et les obligations du titulaire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'titulaire_nom',label:"Nom du titulaire",type:'text',required:true},
      {key:'chaine_nom',label:"Nom de la chaÃ®ne",type:'text',required:true},
      {key:'canal',label:"Canal hertzien attribuÃ©",type:'text',required:true},
      {key:'date_debut',label:"Date de dÃ©but de la licence",type:'date',required:true},
      {key:'duree',label:"DurÃ©e de la licence (annÃ©es)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE LICENCE DE DIFFUSION TV HERTZIENNE</h1><h2>AutoritÃ© concÃ©dante : HACA CÃ´te d'Ivoire</h2><p>Titulaire : <strong>{{titulaire_nom}}</strong> â€” ChaÃ®ne : <strong>{{chaine_nom}}</strong></p><h2>Article 1 â€“ Attribution</h2><p>Diffusion autorisÃ©e sur le canal hertzien <strong>{{canal}}</strong>.</p><h2>Article 2 â€“ DurÃ©e</h2><p>Licence valide Ã  compter du {{date_debut}} pour <strong>{{duree}} ans</strong>.</p><h2>Article 3 â€“ Renouvellement</h2><p>La demande de renouvellement doit Ãªtre dÃ©posÃ©e six mois avant l'expiration.</p><p>Fait Ã  Abidjan, le â€¦â€¦â€¦â€¦â€¦</p></div>`
  },
  {
    code: 'radi_service_tnt',
    name: "Accord de service de TNT (tÃ©lÃ©vision numÃ©rique terrestre CI)",
    category: 'commercial_financier',
    price: 6000, priceMax: 18000,
    description: "Accord relatif Ã  la mise en place et Ã  l'exploitation d'un service de TÃ©lÃ©vision NumÃ©rique Terrestre (TNT) en CÃ´te d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 64,
    fieldsJson: F([
      {key:'operateur_nom',label:"Nom de l'opÃ©rateur TNT",type:'text',required:true},
      {key:'multiplexeur_nom',label:"Nom du multiplexeur",type:'text',required:true},
      {key:'chaines_integrees',label:"ChaÃ®nes intÃ©grÃ©es",type:'textarea',required:true},
      {key:'date_lancement',label:"Date de lancement prÃ©vu",type:'date',required:true},
      {key:'couverture',label:"Zone de couverture",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TÃ‰LÃ‰VISION NUMÃ‰RIQUE TERRESTRE (TNT)</h1><p>Entre <strong>{{operateur_nom}}</strong> (l'OpÃ©rateur) et <strong>{{multiplexeur_nom}}</strong> (le Multiplexeur),</p><h2>Article 1 â€“ Objet</h2><p>Exploitation du bouquet TNT couvrant <strong>{{couverture}}</strong>.</p><h2>Article 2 â€“ ChaÃ®nes</h2><p>{{chaines_integrees}}</p><h2>Article 3 â€“ Lancement</h2><p>Lancement prÃ©vu le {{date_lancement}}.</p><p>Fait Ã  Abidjan, le â€¦â€¦â€¦â€¦â€¦</p></div>`
  },
  {
    code: 'radi_production_emission_tv',
    name: "Accord de service de production d'Ã©mission TV",
    category: 'commercial_financier',
    price: 5000, priceMax: 15000,
    description: "Contrat de production d'Ã©missions tÃ©lÃ©visÃ©es pour une chaÃ®ne ivoirienne, couvrant le format, la pÃ©riodicitÃ©, les droits et la rÃ©munÃ©ration.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 67,
    fieldsJson: F([
      {key:'producteur_nom',label:"Nom du producteur",type:'text',required:true},
      {key:'chaine_nom',label:"Nom de la chaÃ®ne",type:'text',required:true},
      {key:'emission_titre',label:"Titre de l'Ã©mission",type:'text',required:true},
      {key:'format_duree',label:"Format et durÃ©e",type:'text',required:true},
      {key:'date_debut',label:"Date de dÃ©but",type:'date',required:true},
      {key:'budget_episode',label:"Budget par Ã©pisode (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRODUCTION D'Ã‰MISSION TV</h1><p>Entre <strong>{{producteur_nom}}</strong> (le Producteur) et la chaÃ®ne <strong>{{chaine_nom}}</strong>,</p><h2>Article 1 â€“ Objet</h2><p>Production de l'Ã©mission <strong>{{emission_titre}}</strong>, format <strong>{{format_duree}}</strong>.</p><h2>Article 2 â€“ DÃ©marrage</h2><p>DÃ©but de production : {{date_debut}}.</p><h2>Article 3 â€“ Budget</h2><p>Budget par Ã©pisode : <strong>{{budget_episode}} FCFA</strong>.</p><h2>Article 4 â€“ Droits de diffusion</h2><p>Les droits de diffusion sont accordÃ©s Ã  la chaÃ®ne pour le territoire ivoirien exclusivement.</p><p>Fait Ã  Abidjan, le â€¦â€¦â€¦â€¦â€¦</p></div>`
  },
  {
    code: 'radi_coproduction_tv_internationale',
    name: "Accord de service de coproduction TV internationale",
    category: 'commercial_financier',
    price: 8000, priceMax: 24000,
    description: "Accord de coproduction tÃ©lÃ©visuelle entre une structure ivoirienne et un partenaire international, prÃ©cisant les apports, les droits et les marchÃ©s de diffusion.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 61,
    fieldsJson: F([
      {key:'producteur_local_nom',label:"Nom du producteur ivoirien",type:'text',required:true},
      {key:'producteur_international_nom',label:"Nom du producteur international",type:'text',required:true},
      {key:'oeuvre_titre',label:"Titre de l'oeuvre",type:'text',required:true},
      {key:'apport_local',label:"Apport ivoirien (FCFA)",type:'text',required:true},
      {key:'date_debut_tournage',label:"Date de dÃ©but de tournage",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE COPRODUCTION TV INTERNATIONALE</h1><p>Entre <strong>{{producteur_local_nom}}</strong> (Coproducteur ivoirien) et <strong>{{producteur_international_nom}}</strong> (Coproducteur international),</p><h2>Article 1 â€“ Oeuvre</h2><p>Coproduction de <strong>{{oeuvre_titre}}</strong>.</p><h2>Article 2 â€“ Apports</h2><p>Apport ivoirien : <strong>{{apport_local}} FCFA</strong>. Les apports internationaux sont prÃ©cisÃ©s en annexe.</p><h2>Article 3 â€“ Tournage</h2><p>DÃ©but du tournage : {{date_debut_tournage}}.</p><h2>Article 4 â€“ Droits</h2><p>Les droits de diffusion par territoire sont rÃ©partis selon l'annexe de droits jointe.</p><p>Fait Ã  Abidjan, le â€¦â€¦â€¦â€¦â€¦</p></div>`
  },
  {
    code: 'radi_droits_diffusion_tv',
    name: "Accord de service de droits de diffusion TV (acquisition)",
    category: 'commercial_financier',
    price: 5000, priceMax: 15000,
    description: "Accord d'acquisition de droits de diffusion tÃ©lÃ©visuelle pour une oeuvre (film, sÃ©rie, documentaire) sur le marchÃ© ivoirien et africain.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'chaine_nom',label:"Nom de la chaÃ®ne acquÃ©reuse",type:'text',required:true},
      {key:'ayant_droit_nom',label:"Nom de l'ayant droit",type:'text',required:true},
      {key:'oeuvre_titre',label:"Titre de l'oeuvre",type:'text',required:true},
      {key:'territoire',label:"Territoire de diffusion",type:'text',required:true},
      {key:'date_debut_droits',label:"DÃ©but de la pÃ©riode de droits",type:'date',required:true},
      {key:'montant_droits',label:"Montant des droits (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD D'ACQUISITION DE DROITS DE DIFFUSION TV</h1><p>Entre <strong>{{ayant_droit_nom}}</strong> (le CÃ©dant) et <strong>{{chaine_nom}}</strong> (le Cessionnaire),</p><h2>Article 1 â€“ Objet</h2><p>Cession des droits de diffusion TV de <strong>{{oeuvre_titre}}</strong> sur le territoire : <strong>{{territoire}}</strong>.</p><h2>Article 2 â€“ PÃ©riode</h2><p>Droits valables Ã  compter du {{date_debut_droits}}.</p><h2>Article 3 â€“ Prix</h2><p>Montant des droits : <strong>{{montant_droits}} FCFA</strong>.</p><p>Fait Ã  Abidjan, le â€¦â€¦â€¦â€¦â€¦</p></div>`
  },
  {
    code: 'radi_habillage_antenne_tv',
    name: "Accord de service de habillage antenne TV",
    category: 'commercial_financier',
    price: 4000, priceMax: 12000,
    description: "Contrat de crÃ©ation de l'identitÃ© visuelle et sonore d'une chaÃ®ne de tÃ©lÃ©vision ivoirienne : logos animÃ©s, gÃ©nÃ©riques, bandeaux et habillages.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 57,
    fieldsJson: F([
      {key:'studio_nom',label:"Nom du studio crÃ©atif",type:'text',required:true},
      {key:'chaine_nom',label:"Nom de la chaÃ®ne",type:'text',required:true},
      {key:'livrables',label:"Livrables attendus",type:'textarea',required:true},
      {key:'date_livraison',label:"Date de livraison",type:'date',required:true},
      {key:'budget',label:"Budget (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'HABILLAGE ANTENNE TV</h1><p>Entre <strong>{{studio_nom}}</strong> (le Prestataire) et la chaÃ®ne <strong>{{chaine_nom}}</strong>,</p><h2>Article 1 â€“ Objet</h2><p>CrÃ©ation de l'identitÃ© visuelle complÃ¨te de la chaÃ®ne.</p><h2>Article 2 â€“ Livrables</h2><p>{{livrables}}</p><h2>Article 3 â€“ Livraison</h2><p>Livraison le {{date_livraison}}. Budget : <strong>{{budget}} FCFA</strong>.</p><p>Fait Ã  Abidjan, le â€¦â€¦â€¦â€¦â€¦</p></div>`
  },
  {
    code: 'radi_regie_pub_tv',
    name: "Accord de service de rÃ©gie publicitaire TV",
    category: 'commercial_financier',
    price: 5000, priceMax: 15000,
    description: "Accord confiant la commercialisation des espaces publicitaires d'une chaÃ®ne de tÃ©lÃ©vision ivoirienne Ã  une rÃ©gie externe.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'regie_nom',label:"Nom de la rÃ©gie publicitaire",type:'text',required:true},
      {key:'chaine_nom',label:"Nom de la chaÃ®ne TV",type:'text',required:true},
      {key:'commission',label:"Taux de commission (%)",type:'text',required:true},
      {key:'objectif_ca',label:"Objectif chiffre d'affaires (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de dÃ©but",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RÃ‰GIE PUBLICITAIRE TV</h1><p>Entre <strong>{{regie_nom}}</strong> (la RÃ©gie) et la chaÃ®ne <strong>{{chaine_nom}}</strong>,</p><h2>Article 1 â€“ Mission</h2><p>Commercialisation exclusive des espaces publicitaires TV.</p><h2>Article 2 â€“ Commission</h2><p>Taux : <strong>{{commission}}%</strong> sur CA publicitaire net.</p><h2>Article 3 â€“ Objectif</h2><p>Objectif annuel : <strong>{{objectif_ca}} FCFA</strong>.</p><h2>Article 4 â€“ DÃ©but</h2><p>Contrat effectif Ã  compter du {{date_debut}}.</p><p>Fait Ã  Abidjan, le â€¦â€¦â€¦â€¦â€¦</p></div>`
  },
  {
    code: 'radi_streaming_ott',
    name: "Accord de service de streaming OTT (plateforme vidÃ©o CI)",
    category: 'commercial_financier',
    price: 6000, priceMax: 18000,
    description: "Accord pour la mise en place d'une plateforme de streaming vidÃ©o OTT (Over-The-Top) destinÃ©e au public ivoirien et africain.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'prestataire_nom',label:"Nom du prestataire OTT",type:'text',required:true},
      {key:'operateur_nom',label:"Nom de l'opÃ©rateur de la plateforme",type:'text',required:true},
      {key:'plateforme_nom',label:"Nom de la plateforme",type:'text',required:true},
      {key:'catalogue_description',label:"Description du catalogue",type:'textarea',required:true},
      {key:'date_lancement',label:"Date de lancement",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE STREAMING OTT</h1><p>Entre <strong>{{prestataire_nom}}</strong> (le Prestataire technique) et <strong>{{operateur_nom}}</strong> (l'OpÃ©rateur),</p><h2>Article 1 â€“ Objet</h2><p>DÃ©ploiement de la plateforme de streaming <strong>{{plateforme_nom}}</strong>.</p><h2>Article 2 â€“ Catalogue</h2><p>{{catalogue_description}}</p><h2>Article 3 â€“ Lancement</h2><p>Lancement prÃ©vu le {{date_lancement}}.</p><h2>Article 4 â€“ MonÃ©tisation</h2><p>Les modÃ¨les de monÃ©tisation (SVOD, AVOD, TVOD) sont dÃ©taillÃ©s en annexe commerciale.</p><p>Fait Ã  Abidjan, le â€¦â€¦â€¦â€¦â€¦</p></div>`
  },
  {
    code: 'radi_podcast_distribution',
    name: "Accord de service de podcast radio (distribution)",
    category: 'commercial_financier',
    price: 3000, priceMax: 9000,
    description: "Contrat de production et de distribution d'un podcast radiophonique sur les plateformes numÃ©riques, adaptÃ© au marchÃ© africain francophone.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'podcasteur_nom',label:"Nom du podcasteur",type:'text',required:true},
      {key:'distributeur_nom',label:"Nom du distributeur",type:'text',required:true},
      {key:'podcast_titre',label:"Titre du podcast",type:'text',required:true},
      {key:'frequence',label:"FrÃ©quence de publication",type:'text',required:true},
      {key:'date_debut',label:"Date de dÃ©but",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PODCAST RADIO (DISTRIBUTION)</h1><p>Entre <strong>{{podcasteur_nom}}</strong> (le Producteur) et <strong>{{distributeur_nom}}</strong> (le Distributeur),</p><h2>Article 1 â€“ Objet</h2><p>Distribution du podcast <strong>{{podcast_titre}}</strong> publiÃ© <strong>{{frequence}}</strong>.</p><h2>Article 2 â€“ DÃ©but</h2><p>DÃ©marrage le {{date_debut}}.</p><h2>Article 3 â€“ Droits</h2><p>Le Producteur conserve ses droits d'auteur. Le Distributeur bÃ©nÃ©ficie d'une licence de distribution non exclusive.</p><p>Fait Ã  Abidjan, le â€¦â€¦â€¦â€¦â€¦</p></div>`
  },
  {
    code: 'radi_medias_en_ligne',
    name: "Accord de service de mÃ©dias en ligne (webTV, webradio)",
    category: 'commercial_financier',
    price: 4000, priceMax: 12000,
    description: "Accord cadre pour la crÃ©ation et l'exploitation d'un mÃ©dia en ligne (webTV ou webradio) en CÃ´te d'Ivoire, incluant aspects techniques et Ã©ditoriaux.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'editeur_nom',label:"Nom de l'Ã©diteur",type:'text',required:true},
      {key:'prestataire_technique_nom',label:"Nom du prestataire technique",type:'text',required:true},
      {key:'media_nom',label:"Nom du mÃ©dia en ligne",type:'text',required:true},
      {key:'type_media',label:"Type de mÃ©dia (webTV/webradio)",type:'text',required:true},
      {key:'date_lancement',label:"Date de lancement",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MÃ‰DIAS EN LIGNE</h1><p>Entre <strong>{{editeur_nom}}</strong> (l'Ã‰diteur) et <strong>{{prestataire_technique_nom}}</strong> (le Prestataire technique),</p><h2>Article 1 â€“ Objet</h2><p>CrÃ©ation et exploitation du mÃ©dia <strong>{{media_nom}}</strong> (type : <strong>{{type_media}}</strong>).</p><h2>Article 2 â€“ Lancement</h2><p>Mise en ligne prÃ©vue le {{date_lancement}}.</p><h2>Article 3 â€“ Obligations</h2><p>L'Ã‰diteur respectera les dispositions ivoiriennes relatives Ã  la presse en ligne et Ã  la libertÃ© de communication.</p><p>Fait Ã  Abidjan, le â€¦â€¦â€¦â€¦â€¦</p></div>`
  },
  {
    code: 'radi_formation_journalisme',
    name: "Accord de service de formation journalisme radio-TV",
    category: 'commercial_financier',
    price: 4000, priceMax: 12000,
    description: "Contrat de formation en journalisme radio et tÃ©lÃ©visuel destinÃ© aux rÃ©dactions ivoiriennes, couvrant techniques d'interview, Ã©criture audiovisuelle et dÃ©ontologie.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'formateur_nom',label:"Nom du formateur",type:'text',required:true},
      {key:'media_nom',label:"Nom du mÃ©dia bÃ©nÃ©ficiaire",type:'text',required:true},
      {key:'programme',label:"Programme de formation",type:'textarea',required:true},
      {key:'date_debut',label:"Date de dÃ©but",type:'date',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FORMATION JOURNALISME RADIO-TV</h1><p>Entre <strong>{{formateur_nom}}</strong> (le Formateur) et <strong>{{media_nom}}</strong> (le BÃ©nÃ©ficiaire),</p><h2>Article 1 â€“ Programme</h2><p>{{programme}}</p><h2>Article 2 â€“ DÃ©but</h2><p>Formation dÃ©butant le {{date_debut}}.</p><h2>Article 3 â€“ Honoraires</h2><p>Honoraires : <strong>{{honoraires}} FCFA</strong>.</p><p>Fait Ã  Abidjan, le â€¦â€¦â€¦â€¦â€¦</p></div>`
  },
  {
    code: 'radi_partenariat_media_annonceur',
    name: "Accord de partenariat mÃ©dia-annonceur (publicitÃ©)",
    category: 'commercial_financier',
    price: 4000, priceMax: 12000,
    description: "Accord de partenariat commercial entre un mÃ©dia ivoirien et un annonceur, prÃ©cisant les formats publicitaires, les tarifs et les engagements rÃ©ciproques.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 67,
    fieldsJson: F([
      {key:'media_nom',label:"Nom du mÃ©dia",type:'text',required:true},
      {key:'annonceur_nom',label:"Nom de l'annonceur",type:'text',required:true},
      {key:'formats_pub',label:"Formats publicitaires convenus",type:'textarea',required:true},
      {key:'budget_pub',label:"Budget publicitaire (FCFA)",type:'text',required:true},
      {key:'date_debut_campagne',label:"Date de dÃ©but de campagne",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT MÃ‰DIA-ANNONCEUR</h1><p>Entre <strong>{{media_nom}}</strong> (le MÃ©dia) et <strong>{{annonceur_nom}}</strong> (l'Annonceur),</p><h2>Article 1 â€“ Objet</h2><p>Partenariat publicitaire selon les formats convenus.</p><h2>Article 2 â€“ Formats</h2><p>{{formats_pub}}</p><h2>Article 3 â€“ Budget</h2><p>Budget : <strong>{{budget_pub}} FCFA</strong>.</p><h2>Article 4 â€“ Campagne</h2><p>DÃ©but de campagne : {{date_debut_campagne}}.</p><p>Fait Ã  Abidjan, le â€¦â€¦â€¦â€¦â€¦</p></div>`
  },
  {
    code: 'radi_contenu_africain_fonds',
    name: "Accord de service de crÃ©ation de contenu africain (fonds)",
    category: 'commercial_financier',
    price: 6000, priceMax: 18000,
    description: "Accord de financement et de production de contenu audiovisuel africain dans le cadre d'un fonds de soutien Ã  la crÃ©ation, destinÃ© aux producteurs ivoiriens.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'fonds_nom',label:"Nom du fonds de soutien",type:'text',required:true},
      {key:'producteur_nom',label:"Nom du producteur",type:'text',required:true},
      {key:'projet_titre',label:"Titre du projet",type:'text',required:true},
      {key:'montant_aide',label:"Montant de l'aide (FCFA)",type:'text',required:true},
      {key:'date_decision',label:"Date de dÃ©cision",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CRÃ‰ATION DE CONTENU AFRICAIN</h1><h2>Fonds de soutien : {{fonds_nom}}</h2><p>Entre le fonds et <strong>{{producteur_nom}}</strong> (le Producteur),</p><h2>Article 1 â€“ Objet</h2><p>Soutien Ã  la production du projet <strong>{{projet_titre}}</strong>.</p><h2>Article 2 â€“ Aide</h2><p>Montant de l'aide accordÃ©e : <strong>{{montant_aide}} FCFA</strong>.</p><h2>Article 3 â€“ DÃ©cision</h2><p>DÃ©cision notifiÃ©e le {{date_decision}}.</p><h2>Article 4 â€“ Obligations</h2><p>Le Producteur s'engage Ã  rÃ©aliser le projet et Ã  rendre compte de l'utilisation des fonds dans les dÃ©lais impartis.</p><p>Fait Ã  Abidjan, le â€¦â€¦â€¦â€¦â€¦</p></div>`
  },
  {
    code: 'radi_protection_droits_burida',
    name: "Accord de service de protection droits auteurs mÃ©dias (BURIDA CI)",
    category: 'commercial_financier',
    price: 3500, priceMax: 10000,
    description: "Accord de gestion collective des droits d'auteur pour les oeuvres audiovisuelles diffusÃ©es par les mÃ©dias, conformÃ©ment au rÃ´le de la BURIDA en CÃ´te d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'ayant_droit_nom',label:"Nom de l'ayant droit",type:'text',required:true},
      {key:'oeuvre_titre',label:"Titre de l'oeuvre",type:'text',required:true},
      {key:'type_oeuvre',label:"Type d'oeuvre",type:'text',required:true},
      {key:'media_diffuseur',label:"MÃ©dia diffuseur",type:'text',required:true},
      {key:'date_enregistrement',label:"Date d'enregistrement BURIDA",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PROTECTION DES DROITS D'AUTEUR MÃ‰DIAS</h1><h2>Organisme de gestion : BURIDA CÃ´te d'Ivoire</h2><p>Ayant droit : <strong>{{ayant_droit_nom}}</strong></p><h2>Article 1 â€“ Oeuvre protÃ©gÃ©e</h2><p>L'oeuvre intitulÃ©e <strong>{{oeuvre_titre}}</strong> (type : <strong>{{type_oeuvre}}</strong>) est enregistrÃ©e auprÃ¨s de la BURIDA.</p><h2>Article 2 â€“ Diffusion</h2><p>MÃ©dia autorisÃ© Ã  diffuser : <strong>{{media_diffuseur}}</strong>.</p><h2>Article 3 â€“ Enregistrement</h2><p>Date d'enregistrement : {{date_enregistrement}}.</p><h2>Article 4 â€“ Redevances</h2><p>Les redevances de diffusion sont perÃ§ues et rÃ©parties par la BURIDA conformÃ©ment Ã  ses statuts.</p><p>Fait Ã  Abidjan, le â€¦â€¦â€¦â€¦â€¦</p></div>`
  },
  {
    code: 'radi_archivage_audiovisuel',
    name: "Accord de service d'archivage audiovisuel (INA CI)",
    category: 'commercial_financier',
    price: 4000, priceMax: 12000,
    description: "Accord relatif Ã  l'archivage et Ã  la conservation du patrimoine audiovisuel ivoirien, dans le cadre des missions d'un Institut National de l'Audiovisuel en CÃ´te d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 50,
    fieldsJson: F([
      {key:'institution_nom',label:"Nom de l'institution",type:'text',required:true},
      {key:'detenteur_nom',label:"Nom du dÃ©tenteur des archives",type:'text',required:true},
      {key:'description_fonds',label:"Description du fonds audiovisuel",type:'textarea',required:true},
      {key:'date_depot',label:"Date de dÃ©pÃ´t",type:'date',required:true},
      {key:'conditions_acces',label:"Conditions d'accÃ¨s aux archives",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ARCHIVAGE AUDIOVISUEL</h1><p>Entre <strong>{{institution_nom}}</strong> (l'Institution) et <strong>{{detenteur_nom}}</strong> (le DÃ©tenteur),</p><h2>Article 1 â€“ Objet</h2><p>DÃ©pÃ´t et conservation du fonds audiovisuel dÃ©crit ci-aprÃ¨s.</p><h2>Article 2 â€“ Fonds</h2><p>{{description_fonds}}</p><h2>Article 3 â€“ DÃ©pÃ´t</h2><p>Date de dÃ©pÃ´t : {{date_depot}}.</p><h2>Article 4 â€“ AccÃ¨s</h2><p>Conditions d'accÃ¨s : <strong>{{conditions_acces}}</strong>.</p><p>Fait Ã  Abidjan, le â€¦â€¦â€¦â€¦â€¦</p></div>`
  },
  {
    code: 'radi_mesure_audience',
    name: "Accord de service de mesure d'audience media (Kantar CI)",
    category: 'commercial_financier',
    price: 5000, priceMax: 15000,
    description: "Accord de prestation de mesure d'audience pour les mÃ©dias ivoiriens (radio, TV, digital), fournissant des donnÃ©es certifiÃ©es pour le marchÃ© publicitaire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 59,
    fieldsJson: F([
      {key:'institut_nom',label:"Nom de l'institut de mesure",type:'text',required:true},
      {key:'media_nom',label:"Nom du mÃ©dia mesurÃ©",type:'text',required:true},
      {key:'methode_mesure',label:"MÃ©thode de mesure",type:'text',required:true},
      {key:'periodicite_rapport',label:"PÃ©riodicitÃ© des rapports",type:'text',required:true},
      {key:'date_debut',label:"Date de dÃ©but",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MESURE D'AUDIENCE MÃ‰DIA</h1><p>Entre <strong>{{institut_nom}}</strong> (l'Institut) et <strong>{{media_nom}}</strong> (le MÃ©dia),</p><h2>Article 1 â€“ Objet</h2><p>Mesure d'audience du mÃ©dia selon la mÃ©thode <strong>{{methode_mesure}}</strong>.</p><h2>Article 2 â€“ Rapports</h2><p>Rapports fournis <strong>{{periodicite_rapport}}</strong>, Ã  compter du {{date_debut}}.</p><h2>Article 3 â€“ Utilisation des donnÃ©es</h2><p>Les donnÃ©es d'audience sont certifiÃ©es et utilisables par les annonceurs et les agences mÃ©dia pour l'achat d'espace.</p><p>Fait Ã  Abidjan, le â€¦â€¦â€¦â€¦â€¦</p></div>`
  },
  {
    code: 'radi_rapport_performance_media',
    name: "Rapport de performance media",
    category: 'commercial_financier',
    price: 3000, priceMax: 8000,
    description: "Rapport pÃ©riodique Ã©valuant les performances d'un mÃ©dia ivoirien : audiences, revenus publicitaires, parts de marchÃ© et recommandations stratÃ©giques.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 53,
    fieldsJson: F([
      {key:'media_nom',label:"Nom du mÃ©dia",type:'text',required:true},
      {key:'periode',label:"PÃ©riode couverte",type:'text',required:true},
      {key:'resultats_cles',label:"RÃ©sultats clÃ©s",type:'textarea',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE MÃ‰DIA</h1><h2>MÃ©dia : {{media_nom}}</h2><h2>PÃ©riode : {{periode}}</h2><h2>Date : {{date_rapport}}</h2><h2>1. RÃ©sultats clÃ©s</h2><p>{{resultats_cles}}</p><h2>2. Analyse concurrentielle</h2><p>Ce rapport compare les performances du mÃ©dia avec les standards du marchÃ© ivoirien.</p><h2>3. Recommandations</h2><p>Les axes d'amÃ©lioration identifiÃ©s sont prÃ©sentÃ©s en annexe stratÃ©gique.</p><p>Ã‰tabli Ã  Abidjan, le {{date_rapport}}</p></div>`
  },
  {
    code: 'radi_plan_dev_media',
    name: "Plan de dÃ©veloppement media",
    category: 'commercial_financier',
    price: 5000, priceMax: 15000,
    description: "Document stratÃ©gique dÃ©finissant le plan de dÃ©veloppement pluriannuel d'un mÃ©dia ivoirien, couvrant l'audience, les revenus, le numÃ©rique et les ressources humaines.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 51,
    fieldsJson: F([
      {key:'media_nom',label:"Nom du mÃ©dia",type:'text',required:true},
      {key:'vision_strategique',label:"Vision stratÃ©gique",type:'textarea',required:true},
      {key:'horizon',label:"Horizon du plan (annÃ©es)",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>PLAN DE DÃ‰VELOPPEMENT MÃ‰DIA</h1><h2>MÃ©dia : {{media_nom}}</h2><h2>Horizon : {{horizon}} ans</h2><h2>1. Vision stratÃ©gique</h2><p>{{vision_strategique}}</p><h2>2. Axes de dÃ©veloppement</h2><p>Le plan couvre le dÃ©veloppement de l'audience, la diversification des revenus, la transformation numÃ©rique et le renforcement des ressources humaines.</p><h2>3. Indicateurs de suivi</h2><p>Un tableau de bord est mis en place pour assurer le suivi semestriel des objectifs.</p><p>AdoptÃ© le {{date_adoption}}</p></div>`
  },
  {
    code: 'radi_charte_presse_responsable',
    name: "Charte de la presse et des mÃ©dias responsables en Afrique",
    category: 'commercial_financier',
    price: 3000, priceMax: 8000,
    description: "Charte dÃ©ontologique engageant les professionnels des mÃ©dias africains Ã  exercer un journalisme responsable, pluraliste et respectueux des droits humains.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 46,
    fieldsJson: F([
      {key:'organisation_signataire',label:"Organisation signataire",type:'text',required:true},
      {key:'principes_directeurs',label:"Principes directeurs",type:'textarea',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CHARTE DE LA PRESSE ET DES MÃ‰DIAS RESPONSABLES EN AFRIQUE</h1><h2>AdoptÃ©e par : {{organisation_signataire}}</h2><h2>Date : {{date_adoption}}</h2><h2>PrÃ©ambule</h2><p>Les professionnels des mÃ©dias africains signataires, attachÃ©s aux valeurs de libertÃ© de la presse et de responsabilitÃ© sociale, s'engagent Ã  respecter les principes Ã©noncÃ©s dans la prÃ©sente charte.</p><h2>Principes directeurs</h2><p>{{principes_directeurs}}</p><h2>MÃ©canismes de mise en oeuvre</h2><p>Un comitÃ© d'Ã©thique paritaire est instituÃ© pour veiller au respect de la charte et traiter les manquements signalÃ©s.</p><p>SignÃ© Ã  Abidjan, le {{date_adoption}}</p></div>`
  },
];
async function main() {
  let created = 0, updated = 0;
  for (const t of templates) {
    const ex = await prisma.documentTemplate.findUnique({ where: { code: t.code } });
    await prisma.documentTemplate.upsert({ where: { code: t.code }, update: t, create: t });
    if (ex) updated++; else created++;
  }
  const total = await prisma.documentTemplate.count();
  console.log(`Batch 110a OK â€” crÃ©Ã©s:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());

