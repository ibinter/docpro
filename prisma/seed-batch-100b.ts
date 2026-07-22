import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ── FINANCE ISLAMIQUE / BANQUE ISLAMIQUE (25 templates) ──────────────────────
  {
    code: 'banq3_murabaha', name: "Accord de Murabaha (Vente à Prix Révélé)", category: 'commercial_financier', price: 8000, priceMax: 24000,
    description: "Contrat de financement islamique par vente à prix révélé conforme à la Charia, utilisé par les banques islamiques en Afrique de l'Ouest.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 88,
    fieldsJson: F([
      {key:'banque',label:"Nom de la banque islamique",type:'text',required:true},
      {key:'client',label:"Nom du client",type:'text',required:true},
      {key:'bien',label:"Description du bien financé",type:'textarea',required:true},
      {key:'prix_achat',label:"Prix d'achat du bien (FCFA)",type:'text',required:true},
      {key:'marge',label:"Marge bénéficiaire de la banque (FCFA)",type:'text',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE MURABAHA</h1><h2>Vente à Prix Révélé — Finance Islamique</h2><p>Entre <strong>{{banque}}</strong> (ci-après la Banque) et <strong>{{client}}</strong> (ci-après le Client).</p><h3>Article 1 — Objet</h3><p>La Banque acquiert le bien suivant : {{bien}}, pour un prix d'achat de {{prix_achat}} FCFA, puis le revend au Client avec une marge bénéficiaire de {{marge}} FCFA, conformément aux principes de la Charia islamique.</p><h3>Article 2 — Modalités de Paiement</h3><p>Le Client s'engage à régler le prix total convenu selon l'échéancier annexé au présent accord.</p><h3>Article 3 — Conformité Charia</h3><p>Le présent accord a été validé par le Comité Charia de la Banque et est exempt de tout élément de Riba (intérêt prohibé).</p><p>Fait à Abidjan, le {{date_contrat}}</p></div>`
  },
  {
    code: 'banq3_ijara', name: "Accord de Ijara (Crédit-Bail Islamique)", category: 'commercial_financier', price: 7500, priceMax: 22000,
    description: "Contrat de crédit-bail islamique (Ijara) permettant la location d'actifs avec option d'achat, conforme aux règles de la Charia.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 82,
    fieldsJson: F([
      {key:'bailleur',label:"Nom du bailleur islamique",type:'text',required:true},
      {key:'locataire',label:"Nom du locataire",type:'text',required:true},
      {key:'actif',label:"Description de l'actif loué",type:'textarea',required:true},
      {key:'loyer_mensuel',label:"Loyer mensuel (FCFA)",type:'text',required:true},
      {key:'duree',label:"Durée du contrat (mois)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE IJARA</h1><h2>Crédit-Bail Islamique</h2><p>Entre <strong>{{bailleur}}</strong> (le Bailleur) et <strong>{{locataire}}</strong> (le Locataire).</p><h3>Article 1 — Objet du Contrat</h3><p>Le Bailleur met à disposition du Locataire l'actif suivant : {{actif}}, à compter du {{date_debut}}.</p><h3>Article 2 — Loyer</h3><p>Le Locataire verse un loyer mensuel de {{loyer_mensuel}} FCFA pendant une durée de {{duree}} mois. Aucun intérêt (Riba) n'est inclus dans ce montant.</p><h3>Article 3 — Option d'Achat</h3><p>À l'échéance du contrat, le Locataire dispose d'une option d'achat de l'actif à un prix convenu séparément, conformément à la structure Ijara Wa Iqtina.</p><p>Fait à Abidjan, le {{date_debut}}</p></div>`
  },
  {
    code: 'banq3_musharaka', name: "Accord de Musharaka (Participation aux Profits)", category: 'commercial_financier', price: 9000, priceMax: 28000,
    description: "Contrat de partenariat islamique avec participation aux profits et aux pertes selon les apports de chaque partie.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 79,
    fieldsJson: F([
      {key:'banque',label:"Nom de la banque",type:'text',required:true},
      {key:'partenaire',label:"Nom du partenaire",type:'text',required:true},
      {key:'projet',label:"Description du projet",type:'textarea',required:true},
      {key:'apport_banque',label:"Apport de la banque (FCFA)",type:'text',required:true},
      {key:'apport_partenaire',label:"Apport du partenaire (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE MUSHARAKA</h1><h2>Partenariat Islamique — Participation aux Profits et aux Pertes</h2><p>Entre <strong>{{banque}}</strong> et <strong>{{partenaire}}</strong>.</p><h3>Article 1 — Projet Commun</h3><p>Les parties s'associent pour réaliser le projet suivant : {{projet}}, à compter du {{date_debut}}.</p><h3>Article 2 — Apports</h3><p>La banque apporte {{apport_banque}} FCFA. Le partenaire apporte {{apport_partenaire}} FCFA. La répartition des profits et des pertes est proportionnelle aux apports respectifs.</p><h3>Article 3 — Gouvernance</h3><p>Les décisions de gestion du projet sont prises conjointement. Aucune partie ne peut s'engager seule au-delà des limites fixées à l'annexe.</p><p>Fait à Abidjan, le {{date_debut}}</p></div>`
  },
  {
    code: 'banq3_mudaraba', name: "Accord de Mudaraba (Commandite Islamique)", category: 'commercial_financier', price: 8500, priceMax: 25000,
    description: "Contrat de commandite islamique où un investisseur (Rab ul-Mal) confie des fonds à un entrepreneur (Mudarib) selon les règles de la Charia.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 75,
    fieldsJson: F([
      {key:'investisseur',label:"Nom de l'investisseur (Rab ul-Mal)",type:'text',required:true},
      {key:'entrepreneur',label:"Nom de l'entrepreneur (Mudarib)",type:'text',required:true},
      {key:'capital',label:"Montant du capital confié (FCFA)",type:'text',required:true},
      {key:'repartition',label:"Répartition des bénéfices (ex: 60/40)",type:'text',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE MUDARABA</h1><h2>Commandite Islamique</h2><p>Entre <strong>{{investisseur}}</strong> (Rab ul-Mal) et <strong>{{entrepreneur}}</strong> (Mudarib).</p><h3>Article 1 — Capital</h3><p>L'investisseur confie la somme de {{capital}} FCFA à l'entrepreneur pour la gestion d'une activité commerciale halal.</p><h3>Article 2 — Répartition des Profits</h3><p>Les bénéfices nets seront partagés selon la clé de répartition convenue : {{repartition}}. En cas de perte, l'investisseur supporte la perte financière et l'entrepreneur supporte la perte de son travail.</p><h3>Article 3 — Durée</h3><p>Le contrat prend effet le {{date_contrat}} et court jusqu'à la réalisation de l'objet ou dissolution amiable.</p><p>Fait à Abidjan, le {{date_contrat}}</p></div>`
  },
  {
    code: 'banq3_salam', name: "Accord de Salam (Vente à Terme de Marchandises)", category: 'commercial_financier', price: 6000, priceMax: 18000,
    description: "Contrat de vente islamique à terme où le prix est payé d'avance et la marchandise livrée ultérieurement, utilisé notamment en agriculture.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'acheteur',label:"Nom de l'acheteur",type:'text',required:true},
      {key:'vendeur',label:"Nom du vendeur",type:'text',required:true},
      {key:'marchandise',label:"Description de la marchandise",type:'textarea',required:true},
      {key:'prix_avance',label:"Prix payé d'avance (FCFA)",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison prévue",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SALAM</h1><h2>Vente à Terme de Marchandises — Finance Islamique</h2><p>Entre <strong>{{acheteur}}</strong> et <strong>{{vendeur}}</strong>.</p><h3>Article 1 — Objet</h3><p>L'acheteur paie d'avance la somme de {{prix_avance}} FCFA pour la livraison future de la marchandise suivante : {{marchandise}}.</p><h3>Article 2 — Livraison</h3><p>Le vendeur s'engage à livrer la marchandise au plus tard le {{date_livraison}}, dans les quantités et qualités spécifiées en annexe.</p><h3>Article 3 — Conformité</h3><p>Le contrat est conforme aux conditions du Salam islamique : prix intégralement payé à la signature, marchandise clairement définie, date de livraison certaine.</p><p>Fait à Abidjan</p></div>`
  },
  {
    code: 'banq3_istisna', name: "Accord de Istisna (Financement de Construction)", category: 'commercial_financier', price: 10000, priceMax: 32000,
    description: "Contrat islamique de financement à la commande pour la construction ou la fabrication d'un bien, conforme à la Charia.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'maitre_ouvrage',label:"Maître d'ouvrage",type:'text',required:true},
      {key:'fabricant',label:"Fabricant / constructeur",type:'text',required:true},
      {key:'objet',label:"Description de l'ouvrage ou bien à construire",type:'textarea',required:true},
      {key:'prix_total',label:"Prix total convenu (FCFA)",type:'text',required:true},
      {key:'delai_livraison',label:"Date de livraison prévue",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE ISTISNA</h1><h2>Financement de Construction Islamique</h2><p>Entre <strong>{{maitre_ouvrage}}</strong> (donneur d'ordre) et <strong>{{fabricant}}</strong> (exécutant).</p><h3>Article 1 — Commande</h3><p>Le donneur d'ordre commande la réalisation de l'ouvrage suivant : {{objet}}, pour un prix global de {{prix_total}} FCFA.</p><h3>Article 2 — Modalités de Paiement</h3><p>Le paiement s'effectue selon l'avancement des travaux, conformément à l'échéancier joint en annexe, sans application d'intérêts.</p><h3>Article 3 — Livraison</h3><p>L'exécutant s'engage à livrer l'ouvrage conforme au {{delai_livraison}}. Tout retard fera l'objet d'une pénalité conventionnelle halal.</p><p>Fait à Abidjan, le {{delai_livraison}}</p></div>`
  },
  {
    code: 'banq3_wakalah', name: "Accord de Wakalah (Mandat Islamique)", category: 'commercial_financier', price: 5000, priceMax: 15000,
    description: "Contrat de mandat islamique par lequel un mandant confie la gestion d'une opération à un agent (Wakil), sans élément de Riba.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'mandant',label:"Nom du mandant",type:'text',required:true},
      {key:'agent',label:"Nom de l'agent (Wakil)",type:'text',required:true},
      {key:'mission',label:"Description de la mission confiée",type:'textarea',required:true},
      {key:'honoraires',label:"Honoraires de l'agent (FCFA)",type:'text',required:true},
      {key:'date_mandat',label:"Date du mandat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE WAKALAH</h1><h2>Mandat Islamique</h2><p>Entre <strong>{{mandant}}</strong> (Muwakkil) et <strong>{{agent}}</strong> (Wakil).</p><h3>Article 1 — Objet du Mandat</h3><p>Le mandant confie à l'agent la mission suivante : {{mission}}, à compter du {{date_mandat}}.</p><h3>Article 2 — Honoraires</h3><p>L'agent perçoit des honoraires fixes de {{honoraires}} FCFA, indépendamment du résultat, conformément aux règles du Wakalah islamique.</p><h3>Article 3 — Obligations</h3><p>L'agent agit dans les limites du présent mandat, avec diligence et dans le respect des principes de la Charia.</p><p>Fait à Abidjan, le {{date_mandat}}</p></div>`
  },
  {
    code: 'banq3_wakala_invest', name: "Accord de Wakala bil Istithmar (Mandat d'Investissement)", category: 'commercial_financier', price: 9000, priceMax: 27000,
    description: "Mandat d'investissement islamique permettant à une institution de gérer des fonds pour le compte d'investisseurs selon la Charia.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'investisseur',label:"Nom de l'investisseur",type:'text',required:true},
      {key:'gestionnaire',label:"Nom du gestionnaire (Wakil)",type:'text',required:true},
      {key:'montant',label:"Montant confié en gestion (FCFA)",type:'text',required:true},
      {key:'strategie',label:"Stratégie d'investissement halal",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début du mandat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE WAKALA BIL ISTITHMAR</h1><h2>Mandat d'Investissement Islamique</h2><p>Entre <strong>{{investisseur}}</strong> et <strong>{{gestionnaire}}</strong>.</p><h3>Article 1 — Mandat</h3><p>L'investisseur confie la somme de {{montant}} FCFA au gestionnaire pour être investie selon la stratégie suivante : {{strategie}}, à compter du {{date_debut}}.</p><h3>Article 2 — Rémunération</h3><p>Le gestionnaire perçoit des honoraires de gestion préalablement convenus, sans garantie de rendement ni application d'intérêts.</p><h3>Article 3 — Conformité</h3><p>Toute opération d'investissement est soumise à l'approbation du Comité Charia et exclut les secteurs prohibés.</p><p>Fait à Abidjan, le {{date_debut}}</p></div>`
  },
  {
    code: 'banq3_sukuk', name: "Accord de Sukuk (Obligation Islamique)", category: 'commercial_financier', price: 12000, priceMax: 40000,
    description: "Document d'émission de Sukuk (certificats d'investissement islamiques) conformes à la Charia, alternative halal aux obligations conventionnelles.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 85,
    fieldsJson: F([
      {key:'emetteur',label:"Nom de l'émetteur",type:'text',required:true},
      {key:'montant_emission',label:"Montant total de l'émission (FCFA)",type:'text',required:true},
      {key:'structure',label:"Structure du Sukuk (Ijara, Murabaha, etc.)",type:'text',required:true},
      {key:'rendement',label:"Rendement prévisionnel (%)",type:'text',required:true},
      {key:'date_echeance',label:"Date d'échéance",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D'EMISSION DE SUKUK</h1><h2>Obligations Islamiques — Finance Islamique</h2><p>Émis par <strong>{{emetteur}}</strong>.</p><h3>Article 1 — Structure</h3><p>Les présents Sukuk sont structurés selon le modèle {{structure}}, pour un montant total de {{montant_emission}} FCFA. Ils représentent une part indivise dans les actifs sous-jacents.</p><h3>Article 2 — Rendement</h3><p>Le rendement prévisionnel est de {{rendement}}%, basé sur les revenus générés par les actifs sous-jacents. Ce rendement n'est pas garanti et ne constitue pas un intérêt (Riba).</p><h3>Article 3 — Échéance</h3><p>Les Sukuk arrivent à échéance le {{date_echeance}}, date à laquelle les porteurs recouvrent leur mise de fonds initiale.</p><p>Fait à Abidjan</p></div>`
  },
  {
    code: 'banq3_sukuk_souverain', name: "Accord d'Émission de Sukuk Souverain", category: 'commercial_financier', price: 12000, priceMax: 45000,
    description: "Accord d'émission de Sukuk souverains par un État ou une entité publique, permettant de lever des fonds conformes à la Charia sur les marchés internationaux.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 80,
    fieldsJson: F([
      {key:'etat',label:"Nom de l'État émetteur",type:'text',required:true},
      {key:'ministere',label:"Ministère compétent",type:'text',required:true},
      {key:'montant',label:"Montant de l'émission (FCFA)",type:'text',required:true},
      {key:'objet_financement',label:"Objet du financement public",type:'textarea',required:true},
      {key:'date_emission',label:"Date d'émission",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D'EMISSION DE SUKUK SOUVERAIN</h1><h2>Finance Islamique — Secteur Public</h2><p>L'État de <strong>{{etat}}</strong>, représenté par <strong>{{ministere}}</strong>.</p><h3>Article 1 — Objet</h3><p>Le présent accord autorise l'émission de Sukuk souverains d'un montant de {{montant}} FCFA, destinés au financement de : {{objet_financement}}.</p><h3>Article 2 — Conformité Charia</h3><p>L'émission est structurée de manière à garantir la conformité aux principes islamiques, validée par un Comité Charia indépendant.</p><h3>Article 3 — Date d'Effet</h3><p>Le présent accord prend effet le {{date_emission}}.</p><p>Fait à Abidjan, le {{date_emission}}</p></div>`
  },
  {
    code: 'banq3_takaful', name: "Accord de Takaful (Assurance Islamique)", category: 'commercial_financier', price: 6500, priceMax: 20000,
    description: "Contrat d'assurance islamique mutuelle (Takaful) reposant sur la solidarité entre participants, exempt de Riba et de Gharar excessif.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 77,
    fieldsJson: F([
      {key:'operateur',label:"Nom de l'opérateur Takaful",type:'text',required:true},
      {key:'participant',label:"Nom du participant",type:'text',required:true},
      {key:'risque',label:"Risque couvert",type:'text',required:true},
      {key:'contribution',label:"Contribution annuelle (FCFA)",type:'text',required:true},
      {key:'date_adhesion',label:"Date d'adhésion",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE TAKAFUL</h1><h2>Assurance Islamique Mutuelle</h2><p>Entre <strong>{{operateur}}</strong> (Opérateur) et <strong>{{participant}}</strong> (Participant).</p><h3>Article 1 — Adhésion</h3><p>Le participant adhère au fonds Takaful géré par l'opérateur à compter du {{date_adhesion}}, pour couvrir le risque suivant : {{risque}}.</p><h3>Article 2 — Contribution</h3><p>La contribution annuelle du participant est de {{contribution}} FCFA, versée dans le fonds commun de participants (Tabarru). Cette contribution est une donation et non une prime d'assurance conventionnelle.</p><h3>Article 3 — Indemnisation</h3><p>En cas de sinistre, le participant reçoit une indemnité prélevée sur le fonds commun, selon les règles de la mutualité islamique.</p><p>Fait à Abidjan, le {{date_adhesion}}</p></div>`
  },
  {
    code: 'banq3_retakaful', name: "Accord de Retakaful (Réassurance Islamique)", category: 'commercial_financier', price: 10000, priceMax: 32000,
    description: "Accord de réassurance islamique (Retakaful) permettant aux opérateurs Takaful de transférer une partie de leurs risques conformément à la Charia.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'cedant',label:"Opérateur Takaful cédant",type:'text',required:true},
      {key:'reassureur',label:"Réassureur Retakaful",type:'text',required:true},
      {key:'portefeuille',label:"Portefeuille de risques cédés",type:'textarea',required:true},
      {key:'quote_part',label:"Quote-part cédée (%)",type:'text',required:true},
      {key:'date_traite',label:"Date du traité",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE RETAKAFUL</h1><h2>Réassurance Islamique</h2><p>Entre <strong>{{cedant}}</strong> (Cédant) et <strong>{{reassureur}}</strong> (Retakaful).</p><h3>Article 1 — Objet</h3><p>Le cédant transfère au réassureur une quote-part de {{quote_part}}% du portefeuille suivant : {{portefeuille}}.</p><h3>Article 2 — Modalités</h3><p>Le présent traité de Retakaful est structuré selon le modèle Wakala, sans intérêts ni éléments de Gharar prohibés.</p><h3>Article 3 — Durée</h3><p>Le traité prend effet le {{date_traite}} et est renouvelable annuellement par accord des parties.</p><p>Fait à Abidjan, le {{date_traite}}</p></div>`
  },
  {
    code: 'banq3_takaful_vie', name: "Accord de Takaful Vie (Épargne Islamique)", category: 'commercial_financier', price: 6000, priceMax: 18000,
    description: "Contrat Takaful vie combinant protection décès et épargne islamique, conforme à la Charia et adapté au marché ouest-africain.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 73,
    fieldsJson: F([
      {key:'operateur',label:"Opérateur Takaful",type:'text',required:true},
      {key:'participant',label:"Nom du participant",type:'text',required:true},
      {key:'beneficiaire',label:"Nom du bénéficiaire désigné",type:'text',required:true},
      {key:'contribution',label:"Contribution mensuelle d'épargne (FCFA)",type:'text',required:true},
      {key:'duree',label:"Durée du plan (années)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE TAKAFUL VIE</h1><h2>Épargne et Protection Islamique</h2><p>Entre <strong>{{operateur}}</strong> et <strong>{{participant}}</strong>.</p><h3>Article 1 — Plan d'Épargne</h3><p>Le participant verse une contribution mensuelle de {{contribution}} FCFA sur une durée de {{duree}} ans. Une partie constitue la donation Tabarru (protection), l'autre est investie selon des principes halal.</p><h3>Article 2 — Bénéficiaire</h3><p>En cas de décès du participant, le capital accumulé et l'indemnité de protection sont versés à {{beneficiaire}}, désigné(e) comme bénéficiaire.</p><h3>Article 3 — Investissement</h3><p>Les fonds d'épargne sont exclusivement investis dans des actifs conformes à la Charia, sous contrôle du Comité Charia de l'opérateur.</p><p>Fait à Abidjan</p></div>`
  },
  {
    code: 'banq3_depot_islamique', name: "Accord de Dépôt Islamique (Compte d'Épargne Halal)", category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Contrat d'ouverture de compte d'épargne islamique sans intérêts, reposant sur le principe de Mudaraba entre la banque et l'épargnant.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 80,
    fieldsJson: F([
      {key:'banque',label:"Nom de la banque islamique",type:'text',required:true},
      {key:'deposant',label:"Nom du déposant",type:'text',required:true},
      {key:'montant_initial',label:"Montant du dépôt initial (FCFA)",type:'text',required:true},
      {key:'repartition_profits',label:"Clé de répartition des profits (%)",type:'text',required:true},
      {key:'date_ouverture',label:"Date d'ouverture",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE DEPOT ISLAMIQUE</h1><h2>Compte d'Épargne Halal</h2><p>Entre <strong>{{banque}}</strong> et <strong>{{deposant}}</strong>.</p><h3>Article 1 — Dépôt</h3><p>Le déposant confie à la banque, à titre de Mudaraba, la somme de {{montant_initial}} FCFA à compter du {{date_ouverture}}.</p><h3>Article 2 — Partage des Profits</h3><p>Les profits générés par l'investissement des fonds sont partagés selon la clé suivante : {{repartition_profits}}. Aucun intérêt fixe n'est garanti.</p><h3>Article 3 — Retrait</h3><p>Le déposant peut retirer ses fonds sous réserve d'un préavis convenu, sans pénalité contraire à la Charia.</p><p>Fait à Abidjan, le {{date_ouverture}}</p></div>`
  },
  {
    code: 'banq3_compte_courant', name: "Accord de Compte Courant Islamique (Sans Intérêts)", category: 'commercial_financier', price: 3500, priceMax: 10000,
    description: "Convention d'ouverture de compte courant islamique basé sur le principe de Qard (prêt sans intérêt), conforme aux normes AAOIFI.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 76,
    fieldsJson: F([
      {key:'banque',label:"Nom de la banque islamique",type:'text',required:true},
      {key:'titulaire',label:"Nom du titulaire du compte",type:'text',required:true},
      {key:'type_compte',label:"Type de compte (particulier, entreprise)",type:'text',required:true},
      {key:'date_ouverture',label:"Date d'ouverture",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE COMPTE COURANT ISLAMIQUE</h1><h2>Compte Sans Intérêts — Finance Islamique</h2><p>Entre <strong>{{banque}}</strong> et <strong>{{titulaire}}</strong>.</p><h3>Article 1 — Nature du Compte</h3><p>Il est ouvert au nom de {{titulaire}} un compte courant islamique de type {{type_compte}} à compter du {{date_ouverture}}. Les dépôts sont considérés comme un prêt (Qard) accordé à la banque.</p><h3>Article 2 — Absence d'Intérêts</h3><p>Aucun intérêt n'est crédité sur ce compte. La banque garantit le remboursement intégral du solde déposé.</p><h3>Article 3 — Services</h3><p>Le titulaire bénéficie de l'ensemble des services bancaires islamiques : virements, chéquiers, cartes conformes Charia, sans frais usuraires.</p><p>Fait à Abidjan, le {{date_ouverture}}</p></div>`
  },
  {
    code: 'banq3_immo_islamique', name: "Accord de Financement Immobilier Islamique (Murabaha Immobilier)", category: 'commercial_financier', price: 10000, priceMax: 35000,
    description: "Contrat de financement immobilier islamique par Murabaha, permettant l'acquisition d'un bien sans recours au crédit hypothécaire à intérêts.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 86,
    fieldsJson: F([
      {key:'banque',label:"Banque islamique finançant",type:'text',required:true},
      {key:'acquereur',label:"Nom de l'acquéreur",type:'text',required:true},
      {key:'bien',label:"Description du bien immobilier",type:'textarea',required:true},
      {key:'prix_achat',label:"Prix d'achat du bien (FCFA)",type:'text',required:true},
      {key:'marge',label:"Marge bénéficiaire de la banque (FCFA)",type:'text',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE FINANCEMENT IMMOBILIER ISLAMIQUE</h1><h2>Murabaha Immobilier</h2><p>Entre <strong>{{banque}}</strong> et <strong>{{acquereur}}</strong>.</p><h3>Article 1 — Acquisition et Revente</h3><p>La banque acquiert le bien suivant : {{bien}}, pour {{prix_achat}} FCFA, puis le revend immédiatement à l'acquéreur au prix total de (prix d'achat + marge : {{marge}} FCFA).</p><h3>Article 2 — Remboursement</h3><p>L'acquéreur règle le prix de revente par versements mensuels selon l'échéancier annexé, sans intérêts supplémentaires.</p><h3>Article 3 — Propriété</h3><p>La propriété du bien est transférée à l'acquéreur dès la signature du présent accord, sans clause de réserve de propriété conventionnelle.</p><p>Fait à Abidjan, le {{date_contrat}}</p></div>`
  },
  {
    code: 'banq3_carte_islamique', name: "Accord de Carte de Crédit Islamique (Qard Hassan)", category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Convention de carte de crédit islamique basée sur le Qard Hassan (prêt gracieux), sans intérêts ni frais usuraires.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 69,
    fieldsJson: F([
      {key:'banque',label:"Banque islamique émettrice",type:'text',required:true},
      {key:'titulaire',label:"Nom du titulaire",type:'text',required:true},
      {key:'plafond',label:"Plafond mensuel autorisé (FCFA)",type:'text',required:true},
      {key:'date_emission',label:"Date d'émission de la carte",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CARTE DE CREDIT ISLAMIQUE</h1><h2>Qard Hassan — Sans Intérêts</h2><p>Entre <strong>{{banque}}</strong> et <strong>{{titulaire}}</strong>.</p><h3>Article 1 — Ligne de Crédit</h3><p>La banque met à la disposition du titulaire une ligne de crédit islamique d'un plafond mensuel de {{plafond}} FCFA, à compter du {{date_emission}}.</p><h3>Article 2 — Remboursement</h3><p>Le titulaire s'engage à rembourser intégralement le solde utilisé dans le délai convenu, sans intérêts (Riba) ni pénalités usuraires.</p><h3>Article 3 — Frais</h3><p>Des frais administratifs fixes peuvent être appliqués conformément au tarif de la banque, dans la limite de ce que la Charia autorise.</p><p>Fait à Abidjan, le {{date_emission}}</p></div>`
  },
  {
    code: 'banq3_pme_islamique', name: "Accord de Financement PME Islamique", category: 'commercial_financier', price: 8000, priceMax: 25000,
    description: "Accord de financement islamique dédié aux PME africaines, combinant Murabaha et Musharaka pour soutenir l'entrepreneuriat halal.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 83,
    fieldsJson: F([
      {key:'banque',label:"Banque islamique",type:'text',required:true},
      {key:'pme',label:"Nom de la PME",type:'text',required:true},
      {key:'secteur',label:"Secteur d'activité halal",type:'text',required:true},
      {key:'montant',label:"Montant du financement (FCFA)",type:'text',required:true},
      {key:'structure',label:"Structure islamique choisie (Murabaha/Musharaka)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE FINANCEMENT PME ISLAMIQUE</h1><h2>Finance Islamique pour l'Entrepreneuriat</h2><p>Entre <strong>{{banque}}</strong> et <strong>{{pme}}</strong>, opérant dans le secteur {{secteur}}.</p><h3>Article 1 — Financement</h3><p>La banque accorde à la PME un financement de {{montant}} FCFA selon la structure islamique {{structure}}, à compter du {{date_accord}}.</p><h3>Article 2 — Utilisation</h3><p>Les fonds sont exclusivement destinés aux activités halal de la PME. Tout usage dans un secteur prohibé entraîne la résiliation immédiate.</p><h3>Article 3 — Suivi</h3><p>La banque accompagne la PME via son service de conseil islamique pour assurer la conformité continue des activités financées.</p><p>Fait à Abidjan, le {{date_accord}}</p></div>`
  },
  {
    code: 'banq3_sicav_halal', name: "Accord de Fonds d'Investissement Islamique (SICAV Halal)", category: 'commercial_financier', price: 10000, priceMax: 30000,
    description: "Accord de souscription à un fonds d'investissement collectif islamique (SICAV Halal), investi uniquement dans des actifs conformes à la Charia.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 74,
    fieldsJson: F([
      {key:'societe_gestion',label:"Société de gestion",type:'text',required:true},
      {key:'souscripteur',label:"Nom du souscripteur",type:'text',required:true},
      {key:'montant_souscription',label:"Montant de la souscription (FCFA)",type:'text',required:true},
      {key:'strategie',label:"Stratégie d'investissement halal",type:'textarea',required:true},
      {key:'date_souscription',label:"Date de souscription",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE FONDS D'INVESTISSEMENT ISLAMIQUE</h1><h2>SICAV Halal</h2><p>Entre <strong>{{societe_gestion}}</strong> et <strong>{{souscripteur}}</strong>.</p><h3>Article 1 — Souscription</h3><p>Le souscripteur investit {{montant_souscription}} FCFA dans le fonds SICAV Halal géré par la société de gestion, à compter du {{date_souscription}}.</p><h3>Article 2 — Politique d'Investissement</h3><p>Stratégie halal : {{strategie}}. Sont exclus : les secteurs de l'alcool, du tabac, des jeux d'argent, des armes et de tout secteur prohibé par la Charia.</p><h3>Article 3 — Supervision</h3><p>Un Comité Charia indépendant supervise en permanence la conformité du portefeuille aux principes islamiques.</p><p>Fait à Abidjan, le {{date_souscription}}</p></div>`
  },
  {
    code: 'banq3_certification_charia', name: "Accord de Certification Charia (Audit Islamique)", category: 'commercial_financier', price: 7000, priceMax: 22000,
    description: "Accord de mission d'audit et de certification Charia d'un produit ou d'une institution financière islamique en Afrique de l'Ouest.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 71,
    fieldsJson: F([
      {key:'auditeur',label:"Cabinet d'audit Charia",type:'text',required:true},
      {key:'institution',label:"Institution ou produit audité",type:'text',required:true},
      {key:'perimetre',label:"Périmètre de l'audit",type:'textarea',required:true},
      {key:'honoraires',label:"Honoraires d'audit (FCFA)",type:'text',required:true},
      {key:'date_mission',label:"Date de la mission",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CERTIFICATION CHARIA</h1><h2>Audit de Conformité Islamique</h2><p>Entre <strong>{{auditeur}}</strong> (Auditeur Charia) et <strong>{{institution}}</strong>.</p><h3>Article 1 — Mission</h3><p>Le cabinet d'audit est mandaté pour évaluer la conformité à la Charia du périmètre suivant : {{perimetre}}, à compter du {{date_mission}}.</p><h3>Article 2 — Méthodologie</h3><p>L'audit est conduit selon les normes AAOIFI et les standards de l'IFSB, avec émission d'un rapport de conformité et d'un certificat Charia.</p><h3>Article 3 — Honoraires</h3><p>Les honoraires d'audit s'élèvent à {{honoraires}} FCFA, payables selon l'échéancier convenu.</p><p>Fait à Abidjan, le {{date_mission}}</p></div>`
  },
  {
    code: 'banq3_comite_charia', name: "Accord de Comité Charia (Gouvernance Islamique)", category: 'commercial_financier', price: 8000, priceMax: 24000,
    description: "Accord de constitution et de fonctionnement d'un Comité Charia au sein d'une institution financière islamique en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 67,
    fieldsJson: F([
      {key:'institution',label:"Nom de l'institution financière",type:'text',required:true},
      {key:'president',label:"Nom du Président du Comité Charia",type:'text',required:true},
      {key:'membres',label:"Membres du Comité (noms et qualifications)",type:'textarea',required:true},
      {key:'periodicite',label:"Périodicité des réunions",type:'text',required:true},
      {key:'date_creation',label:"Date de création du Comité",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE COMITE CHARIA</h1><h2>Gouvernance Islamique</h2><p>Établi par <strong>{{institution}}</strong>, présidé par <strong>{{president}}</strong>.</p><h3>Article 1 — Composition</h3><p>Le Comité Charia est composé des membres suivants, tous savants islamiques qualifiés : {{membres}}.</p><h3>Article 2 — Missions</h3><p>Le Comité valide la conformité à la Charia de tous les produits, contrats et opérations de l'institution. Il émet des fatwas et avis religieux contraignants.</p><h3>Article 3 — Fonctionnement</h3><p>Le Comité se réunit {{periodicite}} depuis le {{date_creation}}. Ses décisions sont prises à la majorité des membres présents.</p><p>Fait à Abidjan, le {{date_creation}}</p></div>`
  },
  {
    code: 'banq3_fenetre_islamique', name: "Accord de Service de Banque Islamique (Fenêtre Islamique)", category: 'commercial_financier', price: 6000, priceMax: 18000,
    description: "Convention d'ouverture d'une fenêtre islamique au sein d'une banque conventionnelle pour offrir des produits halal, conforme aux règles BCEAO.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'banque',label:"Nom de la banque conventionnelle",type:'text',required:true},
      {key:'directeur',label:"Directeur de la Fenêtre Islamique",type:'text',required:true},
      {key:'produits',label:"Produits islamiques offerts",type:'textarea',required:true},
      {key:'date_lancement',label:"Date de lancement",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE BANQUE ISLAMIQUE</h1><h2>Fenêtre Islamique</h2><p><strong>{{banque}}</strong>, représentée par <strong>{{directeur}}</strong>.</p><h3>Article 1 — Création de la Fenêtre</h3><p>La banque crée une fenêtre islamique dédiée, offrant les produits suivants : {{produits}}, à compter du {{date_lancement}}.</p><h3>Article 2 — Séparation des Fonds</h3><p>Les fonds islamiques sont strictement séparés des fonds conventionnels. La comptabilité est tenue séparément et soumise à l'audit du Comité Charia.</p><h3>Article 3 — Conformité BCEAO</h3><p>La fenêtre islamique est opérée conformément aux circulaires de la BCEAO relatives à la finance islamique en zone UEMOA.</p><p>Fait à Abidjan, le {{date_lancement}}</p></div>`
  },
  {
    code: 'banq3_rapport_charia', name: "Rapport de Conformité Charia", category: 'commercial_financier', price: 6500, priceMax: 19000,
    description: "Rapport annuel de conformité Charia émis par le Comité Charia d'une institution financière islamique, attestant du respect des principes islamiques.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'institution',label:"Nom de l'institution",type:'text',required:true},
      {key:'comite',label:"Comité Charia émetteur",type:'text',required:true},
      {key:'exercice',label:"Exercice couvert",type:'text',required:true},
      {key:'observations',label:"Observations et recommandations principales",type:'textarea',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE CONFORMITE CHARIA</h1><h2>Exercice {{exercice}} — {{institution}}</h2><p>Émis par le <strong>{{comite}}</strong>.</p><h3>Article 1 — Opinion de Conformité</h3><p>Après examen approfondi des opérations, produits et contrats de {{institution}} pour l'exercice {{exercice}}, le Comité Charia atteste que les activités sont globalement conformes aux principes islamiques.</p><h3>Article 2 — Observations</h3><p>{{observations}}</p><h3>Article 3 — Recommandations</h3><p>Le Comité invite l'institution à mettre en oeuvre les recommandations du présent rapport dans les délais impartis et à soumettre un plan d'action.</p><p>Fait à Abidjan, le {{date_rapport}}</p></div>`
  },
  {
    code: 'banq3_plan_finance_islamique', name: "Plan de Développement Finance Islamique", category: 'commercial_financier', price: 9000, priceMax: 28000,
    description: "Document stratégique de développement de la finance islamique pour une institution ou un État de l'espace UEMOA, incluant objectifs et feuille de route.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 74,
    fieldsJson: F([
      {key:'entite',label:"Nom de l'entité (banque ou État)",type:'text',required:true},
      {key:'horizon',label:"Horizon du plan (ex: 2025-2030)",type:'text',required:true},
      {key:'objectifs',label:"Objectifs stratégiques principaux",type:'textarea',required:true},
      {key:'budget',label:"Budget alloué (FCFA)",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption du plan",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE DEVELOPPEMENT FINANCE ISLAMIQUE</h1><h2>{{entite}} — Horizon {{horizon}}</h2><p>Adopté le {{date_adoption}}, avec un budget de {{budget}} FCFA.</p><h3>1. Vision Stratégique</h3><p>{{entite}} s'engage à devenir un acteur de référence de la finance islamique en Afrique de l'Ouest sur la période {{horizon}}.</p><h3>2. Objectifs</h3><p>{{objectifs}}</p><h3>3. Feuille de Route</h3><p>Le plan comprend le développement de nouveaux produits islamiques, le renforcement des capacités humaines, l'obtention des agréments nécessaires et le déploiement d'une infrastructure Charia robuste.</p><p>Fait à Abidjan, le {{date_adoption}}</p></div>`
  },
  {
    code: 'banq3_charte_fi_ao', name: "Charte de la Finance Islamique en Afrique de l'Ouest", category: 'commercial_financier', price: 7000, priceMax: 21000,
    description: "Charte fondatrice définissant les principes, valeurs et engagements des acteurs de la finance islamique en Afrique de l'Ouest (UEMOA/CEDEAO).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 76,
    fieldsJson: F([
      {key:'organisation',label:"Organisation ou institution signataire",type:'text',required:true},
      {key:'representant',label:"Représentant légal",type:'text',required:true},
      {key:'engagements',label:"Engagements spécifiques de l'organisation",type:'textarea',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE LA FINANCE ISLAMIQUE EN AFRIQUE DE L'OUEST</h1><h2>Principes Fondateurs</h2><p>Signée par <strong>{{organisation}}</strong>, représentée par <strong>{{representant}}</strong>, le {{date_signature}}.</p><h3>Préambule</h3><p>Convaincus que la finance islamique constitue un levier de développement inclusif et durable pour l'Afrique de l'Ouest, les signataires s'engagent à promouvoir ses principes.</p><h3>Principes Fondamentaux</h3><p>1. Interdiction du Riba (intérêt) ; 2. Partage des profits et des pertes ; 3. Financement de l'économie réelle ; 4. Conformité permanente à la Charia.</p><h3>Engagements de {{organisation}}</h3><p>{{engagements}}</p><p>Fait à Abidjan, le {{date_signature}}</p></div>`
  },

  // ── ZAKAT / WAQF / ÉCONOMIE ISLAMIQUE (25 templates) ─────────────────────────
  {
    code: 'zakat_collecte', name: "Accord de Collecte de la Zakat (Institution Agréée)", category: 'association', price: 4000, priceMax: 12000,
    description: "Convention entre une institution agréée et un contribuable pour la collecte officielle de la Zakat, conformément aux règles islamiques et au droit ivoirien.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 82,
    fieldsJson: F([
      {key:'institution',label:"Nom de l'institution de collecte agréée",type:'text',required:true},
      {key:'contributeur',label:"Nom du contributeur (Muzakki)",type:'text',required:true},
      {key:'montant',label:"Montant de la Zakat (FCFA)",type:'text',required:true},
      {key:'type_zakat',label:"Type de Zakat (Mal, Fitr, etc.)",type:'text',required:true},
      {key:'date_versement',label:"Date de versement",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE COLLECTE DE LA ZAKAT</h1><h2>Institution Agréée</h2><p>Entre <strong>{{institution}}</strong> (Collecteur agréé) et <strong>{{contributeur}}</strong> (Muzakki).</p><h3>Article 1 — Versement</h3><p>Le contributeur verse la somme de {{montant}} FCFA au titre de la {{type_zakat}}, en date du {{date_versement}}.</p><h3>Article 2 — Affectation</h3><p>Les fonds collectés seront affectés aux huit catégories de bénéficiaires définis par le Coran (Sourate 9, verset 60), sous contrôle du Comité Charia de l'institution.</p><h3>Article 3 — Reçu</h3><p>Le présent accord vaut reçu officiel de versement de Zakat au profit du contributeur.</p><p>Fait à Abidjan, le {{date_versement}}</p></div>`
  },
  {
    code: 'zakat_distribution', name: "Accord de Distribution de la Zakat aux Bénéficiaires", category: 'association', price: 3500, priceMax: 10000,
    description: "Accord de distribution des fonds de Zakat aux bénéficiaires éligibles selon les critères islamiques, avec traçabilité et rapport d'affectation.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 78,
    fieldsJson: F([
      {key:'institution',label:"Institution distributrice",type:'text',required:true},
      {key:'beneficiaire',label:"Nom du bénéficiaire (Mustahiq)",type:'text',required:true},
      {key:'categorie',label:"Catégorie de bénéficiaire",type:'text',required:true},
      {key:'montant',label:"Montant distribué (FCFA)",type:'text',required:true},
      {key:'date_distribution',label:"Date de distribution",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE DISTRIBUTION DE LA ZAKAT</h1><h2>Aux Bénéficiaires Éligibles</h2><p>Entre <strong>{{institution}}</strong> et <strong>{{beneficiaire}}</strong> (Mustahiq).</p><h3>Article 1 — Éligibilité</h3><p>Le bénéficiaire est reconnu éligible à la Zakat dans la catégorie : {{categorie}}, conformément aux critères du Coran et de la Sunna.</p><h3>Article 2 — Aide Accordée</h3><p>L'institution distribue au bénéficiaire la somme de {{montant}} FCFA, en date du {{date_distribution}}.</p><h3>Article 3 — Dignité</h3><p>La distribution est effectuée dans le respect de la dignité du bénéficiaire, en conformité avec les valeurs islamiques de solidarité et de discrétion.</p><p>Fait à Abidjan, le {{date_distribution}}</p></div>`
  },
  {
    code: 'zakat_calcul', name: "Accord de Calcul de la Zakat (Nisab et Hawl)", category: 'association', price: 3000, priceMax: 9000,
    description: "Document de calcul officiel de la Zakat applicable aux biens d'un contribuable, vérifiant le Nisab et le Hawl selon les règles islamiques.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 74,
    fieldsJson: F([
      {key:'calculateur',label:"Conseiller ou institution calculant la Zakat",type:'text',required:true},
      {key:'contribuable',label:"Nom du contribuable",type:'text',required:true},
      {key:'actifs_zakatable',label:"Total des actifs zakatable (FCFA)",type:'text',required:true},
      {key:'nisab',label:"Valeur du Nisab applicable (FCFA)",type:'text',required:true},
      {key:'date_calcul',label:"Date du calcul",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CALCUL DE LA ZAKAT</h1><h2>Nisab et Hawl</h2><p>Établi par <strong>{{calculateur}}</strong> pour <strong>{{contribuable}}</strong>.</p><h3>Article 1 — Base de Calcul</h3><p>Le total des actifs zakatable du contribuable s'élève à {{actifs_zakatable}} FCFA. Le Nisab applicable est de {{nisab}} FCFA. Le Hawl (année lunaire de détention) est atteint.</p><h3>Article 2 — Montant Dû</h3><p>La Zakat due est calculée au taux de 2,5% sur les actifs zakatable dépassant le Nisab, soit le montant indiqué dans le tableau annexé.</p><h3>Article 3 — Certification</h3><p>Le présent document est certifié par le calculateur en date du {{date_calcul}}.</p><p>Fait à Abidjan, le {{date_calcul}}</p></div>`
  },
  {
    code: 'zakat_fitr', name: "Accord de Zakat el Fitr (Fin du Ramadan)", category: 'association', price: 3000, priceMax: 8000,
    description: "Accord de versement de la Zakat el Fitr à la fin du mois de Ramadan, conformément aux règles islamiques de la UEMOA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 85,
    fieldsJson: F([
      {key:'institution',label:"Institution collectrice",type:'text',required:true},
      {key:'famille',label:"Chef de famille versant",type:'text',required:true},
      {key:'nb_personnes',label:"Nombre de personnes à charge",type:'text',required:true},
      {key:'montant_unitaire',label:"Montant unitaire par personne (FCFA)",type:'text',required:true},
      {key:'date_versement',label:"Date de versement",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE ZAKAT EL FITR</h1><h2>Fin du Ramadan</h2><p>Entre <strong>{{institution}}</strong> et <strong>{{famille}}</strong>.</p><h3>Article 1 — Versement</h3><p>Le chef de famille verse la Zakat el Fitr pour {{nb_personnes}} personne(s) à charge, au montant unitaire de {{montant_unitaire}} FCFA, en date du {{date_versement}}.</p><h3>Article 2 — Délai</h3><p>Le versement est effectué avant la prière de l'Aïd el Fitr, conformément à la Sunna du Prophète.</p><h3>Article 3 — Distribution</h3><p>L'institution s'engage à distribuer les fonds collectés aux nécessiteux avant la prière de l'Aïd, pour leur permettre de célébrer la fête dans la dignité.</p><p>Fait à Abidjan, le {{date_versement}}</p></div>`
  },
  {
    code: 'zakat_constitution_waqf', name: "Accord de Constitution d'un Waqf (Fondation Pieuse)", category: 'association', price: 8000, priceMax: 25000,
    description: "Acte de constitution d'un Waqf islamique (fondation pieuse perpétuelle) en Côte d'Ivoire, avec définition des biens, objectifs et gestionnaire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 79,
    fieldsJson: F([
      {key:'fondateur',label:"Nom du fondateur (Waqif)",type:'text',required:true},
      {key:'gestionnaire',label:"Nom du gestionnaire (Nazir)",type:'text',required:true},
      {key:'biens',label:"Description des biens affectés au Waqf",type:'textarea',required:true},
      {key:'finalite',label:"Finalité du Waqf (religieuse, éducative, sociale...)",type:'text',required:true},
      {key:'date_acte',label:"Date de l'acte constitutif",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACTE DE CONSTITUTION DE WAQF</h1><h2>Fondation Pieuse Islamique</h2><p><strong>{{fondateur}}</strong> (Waqif) constitue le présent Waqf, confié en gestion à <strong>{{gestionnaire}}</strong> (Nazir).</p><h3>Article 1 — Biens Affectés</h3><p>Les biens suivants sont définitivement affectés au Waqf : {{biens}}. Ces biens sont inaliénables, ne peuvent être vendus ni donnés.</p><h3>Article 2 — Finalité</h3><p>Le Waqf a pour vocation : {{finalite}}. Les revenus générés sont exclusivement consacrés à cette finalité.</p><h3>Article 3 — Perpétuité</h3><p>Le Waqf est constitué à perpétuité. En cas d'impossibilité d'atteindre la finalité première, le gestionnaire oriente les fonds vers la finalité la plus proche.</p><p>Fait à Abidjan, le {{date_acte}}</p></div>`
  },
  {
    code: 'zakat_waqf_immo', name: "Accord de Gestion d'un Waqf Immobilier (Location Halal)", category: 'association', price: 6000, priceMax: 18000,
    description: "Convention de gestion d'un Waqf immobilier avec mise en location halal des biens, affectation des loyers à la finalité pieuse et reddition de comptes.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 73,
    fieldsJson: F([
      {key:'nazir',label:"Nom du gestionnaire (Nazir)",type:'text',required:true},
      {key:'locataire',label:"Nom du locataire",type:'text',required:true},
      {key:'bien',label:"Description du bien immobilier en Waqf",type:'textarea',required:true},
      {key:'loyer',label:"Loyer mensuel halal (FCFA)",type:'text',required:true},
      {key:'date_bail',label:"Date du bail",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE GESTION DE WAQF IMMOBILIER</h1><h2>Location Halal</h2><p>Entre le gestionnaire du Waqf <strong>{{nazir}}</strong> et <strong>{{locataire}}</strong>.</p><h3>Article 1 — Bien en Waqf</h3><p>Le bien suivant, constitué en Waqf, est mis en location : {{bien}}, à compter du {{date_bail}}.</p><h3>Article 2 — Loyer</h3><p>Le loyer mensuel est fixé à {{loyer}} FCFA, payable sans intérêts ni frais prohibés. Les loyers collectés sont intégralement affectés à la finalité du Waqf.</p><h3>Article 3 — Reddition de Comptes</h3><p>Le gestionnaire établit un rapport annuel sur la gestion du Waqf, soumis aux bénéficiaires et au Comité Charia.</p><p>Fait à Abidjan, le {{date_bail}}</p></div>`
  },
  {
    code: 'zakat_waqf_entreprise', name: "Accord de Gestion d'un Waqf d'Entreprise", category: 'association', price: 8000, priceMax: 24000,
    description: "Convention de constitution et de gestion d'un Waqf d'entreprise, permettant d'affecter une entreprise halal à une fondation pieuse perpétuelle.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 69,
    fieldsJson: F([
      {key:'fondateur',label:"Fondateur du Waqf",type:'text',required:true},
      {key:'entreprise',label:"Nom de l'entreprise affectée en Waqf",type:'text',required:true},
      {key:'activite',label:"Activité halal de l'entreprise",type:'textarea',required:true},
      {key:'finalite',label:"Finalité du Waqf d'entreprise",type:'text',required:true},
      {key:'date_constitution',label:"Date de constitution",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE GESTION DE WAQF D'ENTREPRISE</h1><h2>Fondation Pieuse Productive</h2><p>Constitué par <strong>{{fondateur}}</strong> pour l'entreprise <strong>{{entreprise}}</strong>.</p><h3>Article 1 — Entreprise en Waqf</h3><p>L'entreprise {{entreprise}}, exerçant l'activité halal suivante : {{activite}}, est constituée en Waqf à compter du {{date_constitution}}.</p><h3>Article 2 — Gestion</h3><p>L'entreprise continue d'être exploitée par un Nazir qualifié. Les bénéfices nets sont intégralement affectés à la finalité suivante : {{finalite}}.</p><h3>Article 3 — Contrôle</h3><p>Un Comité Charia supervise la conformité des activités et l'affectation des revenus du Waqf.</p><p>Fait à Abidjan, le {{date_constitution}}</p></div>`
  },
  {
    code: 'zakat_waqf_education', name: "Accord de Waqf pour l'Éducation (Bourse Islamique)", category: 'association', price: 5000, priceMax: 15000,
    description: "Accord de Waqf dédié au financement de bourses d'études islamiques et à l'accès à l'éducation pour les enfants défavorisés en Afrique de l'Ouest.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 84,
    fieldsJson: F([
      {key:'fondateur',label:"Fondateur du Waqf éducatif",type:'text',required:true},
      {key:'institution',label:"Institution bénéficiaire (école, université...)",type:'text',required:true},
      {key:'bourse_annuelle',label:"Montant annuel des bourses distribuées (FCFA)",type:'text',required:true},
      {key:'criteres',label:"Critères d'éligibilité des boursiers",type:'textarea',required:true},
      {key:'date_creation',label:"Date de création",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE WAQF POUR L'EDUCATION</h1><h2>Bourse Islamique Perpétuelle</h2><p>Constitué par <strong>{{fondateur}}</strong> au profit de <strong>{{institution}}</strong>, à compter du {{date_creation}}.</p><h3>Article 1 — Objet</h3><p>Le présent Waqf a pour objet le financement de bourses d'études islamiques et générales, à hauteur de {{bourse_annuelle}} FCFA par an.</p><h3>Article 2 — Bénéficiaires</h3><p>Les bourses sont accordées selon les critères suivants : {{criteres}}. La sélection est effectuée par une commission constituée par le Nazir et l'institution.</p><h3>Article 3 — Perpétuité</h3><p>Le Waqf éducatif est constitué à perpétuité pour assurer un flux continu de bourses aux générations futures.</p><p>Fait à Abidjan, le {{date_creation}}</p></div>`
  },
  {
    code: 'zakat_waqf_sante', name: "Accord de Waqf pour la Santé (Hôpital Islamique)", category: 'association', price: 6000, priceMax: 18000,
    description: "Accord de Waqf dédié au financement de soins de santé gratuits ou subventionnés pour les populations défavorisées, géré par un hôpital islamique.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 77,
    fieldsJson: F([
      {key:'fondateur',label:"Fondateur du Waqf de santé",type:'text',required:true},
      {key:'hopital',label:"Nom de l'hôpital ou structure de santé",type:'text',required:true},
      {key:'services',label:"Services de santé financés par le Waqf",type:'textarea',required:true},
      {key:'budget_annuel',label:"Budget annuel du Waqf de santé (FCFA)",type:'text',required:true},
      {key:'date_creation',label:"Date de création",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE WAQF POUR LA SANTE</h1><h2>Hôpital Islamique — Solidarité Médicale</h2><p>Constitué par <strong>{{fondateur}}</strong> au profit de <strong>{{hopital}}</strong>.</p><h3>Article 1 — Services Couverts</h3><p>Le Waqf finance les services suivants : {{services}}, pour un budget annuel de {{budget_annuel}} FCFA, depuis le {{date_creation}}.</p><h3>Article 2 — Bénéficiaires</h3><p>Toute personne dans le besoin peut bénéficier des soins financés par le Waqf, sans distinction de religion ni d'origine.</p><h3>Article 3 — Gestion</h3><p>L'hôpital rend compte annuellement de l'utilisation des fonds du Waqf au fondateur et au Comité Charia.</p><p>Fait à Abidjan, le {{date_creation}}</p></div>`
  },
  {
    code: 'zakat_waqf_eau', name: "Accord de Waqf pour l'Eau (Puits Islamique)", category: 'association', price: 4500, priceMax: 13000,
    description: "Accord de Waqf pour le financement et la gestion de points d'eau (puits, forages) au profit des communautés rurales, en Sadaqa Jariya perpétuelle.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 81,
    fieldsJson: F([
      {key:'donateur',label:"Nom du donateur (Waqif)",type:'text',required:true},
      {key:'localite',label:"Localité bénéficiaire",type:'text',required:true},
      {key:'type_infrastructure',label:"Type d'infrastructure (puits, forage...)",type:'text',required:true},
      {key:'capacite',label:"Capacité ou débit journalier",type:'text',required:true},
      {key:'date_inauguration',label:"Date d'inauguration",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE WAQF POUR L'EAU</h1><h2>Puits Islamique — Sadaqa Jariya</h2><p>Constitué par <strong>{{donateur}}</strong> au profit de la localité de <strong>{{localite}}</strong>.</p><h3>Article 1 — Infrastructure</h3><p>Le donateur finance la construction d'un(e) {{type_infrastructure}} d'une capacité de {{capacite}}, inauguré(e) le {{date_inauguration}}.</p><h3>Article 2 — Waqf Perpétuel</h3><p>L'infrastructure est constituée en Waqf perpétuel. Elle ne peut être aliénée. Son entretien est assuré par les fonds du Waqf.</p><h3>Article 3 — Bénéfice Spirituel</h3><p>Le donateur bénéficie d'une Sadaqa Jariya (aumône continue) tant que l'infrastructure est utilisée par la communauté.</p><p>Fait à Abidjan, le {{date_inauguration}}</p></div>`
  },
  {
    code: 'zakat_waqf_numerique', name: "Accord de Waqf Numérique (Waqf Digital)", category: 'association', price: 5000, priceMax: 15000,
    description: "Accord innovant de Waqf numérique permettant la collecte de fonds et la gestion d'un Waqf via des plateformes digitales, adapté au marché africain.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 71,
    fieldsJson: F([
      {key:'plateforme',label:"Nom de la plateforme numérique",type:'text',required:true},
      {key:'gestionnaire',label:"Gestionnaire du Waqf numérique",type:'text',required:true},
      {key:'objet',label:"Objet du Waqf numérique",type:'textarea',required:true},
      {key:'cible_collecte',label:"Objectif de collecte (FCFA)",type:'text',required:true},
      {key:'date_lancement',label:"Date de lancement",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE WAQF NUMERIQUE</h1><h2>Waqf Digital — Innovation Islamique</h2><p>Géré par <strong>{{gestionnaire}}</strong> via la plateforme <strong>{{plateforme}}</strong>.</p><h3>Article 1 — Objet</h3><p>Le Waqf numérique a pour objet : {{objet}}. La collecte est effectuée via la plateforme depuis le {{date_lancement}}.</p><h3>Article 2 — Objectif</h3><p>L'objectif de collecte est fixé à {{cible_collecte}} FCFA. Les contributions sont acceptées par mobile money, virement et autres moyens digitaux halal.</p><h3>Article 3 — Transparence</h3><p>Toutes les transactions sont traçables sur la plateforme. Un rapport mensuel est publié en ligne pour les contributeurs.</p><p>Fait à Abidjan, le {{date_lancement}}</p></div>`
  },
  {
    code: 'zakat_sadaqa_jariya', name: "Accord de Sadaqa Jariya (Aumône Perpétuelle)", category: 'association', price: 4000, priceMax: 12000,
    description: "Accord de don en Sadaqa Jariya pour le financement d'une oeuvre pieuse à bénéfice perpétuel, conformément à l'enseignement islamique.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 83,
    fieldsJson: F([
      {key:'donateur',label:"Nom du donateur",type:'text',required:true},
      {key:'organisation',label:"Organisation réceptrice",type:'text',required:true},
      {key:'oeuvre',label:"Description de l'oeuvre financée",type:'textarea',required:true},
      {key:'montant',label:"Montant du don (FCFA)",type:'text',required:true},
      {key:'date_don',label:"Date du don",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SADAQA JARIYA</h1><h2>Aumône Perpétuelle Islamique</h2><p>Entre <strong>{{donateur}}</strong> et <strong>{{organisation}}</strong>.</p><h3>Article 1 — Don</h3><p>Le donateur effectue un don de Sadaqa Jariya de {{montant}} FCFA en date du {{date_don}}, pour le financement de l'oeuvre suivante : {{oeuvre}}.</p><h3>Article 2 — Nature du Don</h3><p>Ce don est irrévocable et constitue une aumône à bénéfice continu (Jariya) pour le donateur, tant que l'oeuvre profite à des bénéficiaires.</p><h3>Article 3 — Rapport</h3><p>L'organisation s'engage à informer le donateur de l'impact de son don par un rapport annuel.</p><p>Fait à Abidjan, le {{date_don}}</p></div>`
  },
  {
    code: 'zakat_qard_hassan', name: "Accord de Qard Hassan (Prêt Sans Intérêt)", category: 'association', price: 3500, priceMax: 10000,
    description: "Contrat de prêt islamique sans intérêts (Qard Hassan) accordé à une personne dans le besoin, conformément aux valeurs de solidarité islamique.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 80,
    fieldsJson: F([
      {key:'preteur',label:"Nom du prêteur (institution ou individu)",type:'text',required:true},
      {key:'emprunteur',label:"Nom de l'emprunteur",type:'text',required:true},
      {key:'montant',label:"Montant du prêt (FCFA)",type:'text',required:true},
      {key:'delai_remboursement',label:"Délai de remboursement (mois)",type:'text',required:true},
      {key:'date_pret',label:"Date du prêt",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE QARD HASSAN</h1><h2>Prêt Sans Intérêt Islamique</h2><p>Entre <strong>{{preteur}}</strong> et <strong>{{emprunteur}}</strong>.</p><h3>Article 1 — Prêt</h3><p>Le prêteur accorde à l'emprunteur un prêt de {{montant}} FCFA en date du {{date_pret}}, sans intérêts ni frais supplémentaires, à titre de Qard Hassan.</p><h3>Article 2 — Remboursement</h3><p>L'emprunteur s'engage à rembourser intégralement la somme prêtée dans un délai de {{delai_remboursement}} mois. Seule la somme initiale est due.</p><h3>Article 3 — Esprit du Contrat</h3><p>Le présent prêt est accordé dans un esprit de fraternité islamique. En cas de difficulté avérée, le prêteur peut accorder un délai supplémentaire sans pénalité.</p><p>Fait à Abidjan, le {{date_pret}}</p></div>`
  },
  {
    code: 'zakat_kafala', name: "Accord de Kafala (Parrainage d'Orphelins)", category: 'association', price: 4000, priceMax: 12000,
    description: "Convention de Kafala (parrainage islamique d'orphelins) permettant à un bienfaiteur de subvenir aux besoins d'un enfant orphelin sans adoption.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 87,
    fieldsJson: F([
      {key:'parrain',label:"Nom du parrain (Kafil)",type:'text',required:true},
      {key:'institution',label:"Institution responsable de l'orphelin",type:'text',required:true},
      {key:'enfant',label:"Prénom de l'enfant parrainé",type:'text',required:true},
      {key:'aide_mensuelle',label:"Aide mensuelle versée (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début du parrainage",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE KAFALA</h1><h2>Parrainage Islamique d'Orphelin</h2><p>Entre <strong>{{parrain}}</strong> (Kafil) et <strong>{{institution}}</strong>, pour l'enfant <strong>{{enfant}}</strong>.</p><h3>Article 1 — Engagement du Parrain</h3><p>Le parrain s'engage à verser {{aide_mensuelle}} FCFA par mois à partir du {{date_debut}}, pour subvenir aux besoins de l'enfant parrainé.</p><h3>Article 2 — Nature de la Kafala</h3><p>La Kafala n'est pas une adoption au sens légal. Elle crée un lien de solidarité islamique sans modifier les droits successoraux de l'enfant.</p><h3>Article 3 — Suivi</h3><p>L'institution fournit trimestriellement au parrain un rapport sur la situation et le développement de l'enfant.</p><p>Fait à Abidjan, le {{date_debut}}</p></div>`
  },
  {
    code: 'zakat_mosquee', name: "Accord de Collecte pour Construction de Mosquée", category: 'association', price: 5000, priceMax: 15000,
    description: "Accord de collecte de fonds communautaires pour la construction ou la rénovation d'une mosquée, avec plan de gestion et reddition de comptes.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 86,
    fieldsJson: F([
      {key:'comite',label:"Nom du Comité de construction",type:'text',required:true},
      {key:'mosquee',label:"Nom de la mosquée à construire",type:'text',required:true},
      {key:'localite',label:"Localité d'implantation",type:'text',required:true},
      {key:'budget_previsionnel',label:"Budget prévisionnel total (FCFA)",type:'text',required:true},
      {key:'date_lancement',label:"Date de lancement de la collecte",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE COLLECTE POUR CONSTRUCTION DE MOSQUEE</h1><h2>{{mosquee}} — {{localite}}</h2><p>Le <strong>{{comite}}</strong> lance une collecte de fonds à compter du {{date_lancement}}.</p><h3>Article 1 — Objectif</h3><p>Le budget prévisionnel pour la construction de la mosquée {{mosquee}} à {{localite}} est de {{budget_previsionnel}} FCFA, répartis entre construction, équipement et aménagement.</p><h3>Article 2 — Collecte</h3><p>La collecte est ouverte à tous les fidèles et bienfaiteurs. Les dons sont reçus par le Comité, qui en tient une comptabilité rigoureuse.</p><h3>Article 3 — Transparence</h3><p>Le Comité publie un rapport mensuel sur l'état d'avancement de la collecte et des travaux, accessible à tous les donateurs.</p><p>Fait à Abidjan, le {{date_lancement}}</p></div>`
  },
  {
    code: 'zakat_biens_halqous', name: "Accord de Gestion de Biens Halqous (Biens Vacants)", category: 'association', price: 5500, priceMax: 16000,
    description: "Convention de gestion des biens Halqous (biens vacants ou sans maître) selon les principes islamiques, avec affectation à des fins pieuses.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      {key:'autorite',label:"Autorité islamique ou institution gestionnaire",type:'text',required:true},
      {key:'description_biens',label:"Description des biens vacants",type:'textarea',required:true},
      {key:'affectation',label:"Affectation prévue des biens",type:'text',required:true},
      {key:'valeur_estimee',label:"Valeur estimée des biens (FCFA)",type:'text',required:true},
      {key:'date_prise_en_charge',label:"Date de prise en charge",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE GESTION DE BIENS HALQOUS</h1><h2>Biens Vacants — Gestion Islamique</h2><p>Géré par <strong>{{autorite}}</strong>, à compter du {{date_prise_en_charge}}.</p><h3>Article 1 — Biens Concernés</h3><p>Les biens vacants suivants sont pris en charge : {{description_biens}}, pour une valeur estimée de {{valeur_estimee}} FCFA.</p><h3>Article 2 — Affectation</h3><p>Ces biens sont affectés à : {{affectation}}, conformément aux règles islamiques sur les biens sans maître.</p><h3>Article 3 — Gestion</h3><p>L'institution gestionnaire administre ces biens dans l'intérêt de la communauté et en rend compte annuellement.</p><p>Fait à Abidjan, le {{date_prise_en_charge}}</p></div>`
  },
  {
    code: 'zakat_abattage_halal', name: "Accord de Service d'Abattage Rituel Halal (Certificat)", category: 'association', price: 4500, priceMax: 13000,
    description: "Convention entre un abattoir et une autorité islamique pour la certification du processus d'abattage rituel Halal, conforme aux normes islamiques.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 75,
    fieldsJson: F([
      {key:'abattoir',label:"Nom de l'abattoir",type:'text',required:true},
      {key:'certificateur',label:"Organisme de certification Halal",type:'text',required:true},
      {key:'especes',label:"Espèces animales concernées",type:'text',required:true},
      {key:'capacite',label:"Capacité journalière d'abattage",type:'text',required:true},
      {key:'date_certification',label:"Date de certification",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ABATTAGE RITUEL HALAL</h1><h2>Certificat de Conformité Islamique</h2><p>Entre <strong>{{abattoir}}</strong> et <strong>{{certificateur}}</strong>.</p><h3>Article 1 — Périmètre</h3><p>L'abattoir est certifié pour l'abattage rituel Halal des espèces suivantes : {{especes}}, pour une capacité journalière de {{capacite}}.</p><h3>Article 2 — Conditions</h3><p>L'abattage est effectué par un sacrificateur musulman qualifié, avec invocation du nom d'Allah, orientation vers la Qibla, et couteau parfaitement aiguisé.</p><h3>Article 3 — Validité</h3><p>La certification Halal est accordée le {{date_certification}} et est valable un an, sous réserve de contrôles périodiques du certificateur.</p><p>Fait à Abidjan, le {{date_certification}}</p></div>`
  },
  {
    code: 'zakat_certif_halal_alim', name: "Accord de Certification Halal Produit Alimentaire", category: 'association', price: 5000, priceMax: 15000,
    description: "Accord de certification Halal d'un produit alimentaire par un organisme islamique agréé, permettant l'apposition du logo Halal sur l'emballage.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 82,
    fieldsJson: F([
      {key:'fabricant',label:"Nom du fabricant",type:'text',required:true},
      {key:'certificateur',label:"Organisme certificateur Halal",type:'text',required:true},
      {key:'produit',label:"Nom du produit alimentaire",type:'text',required:true},
      {key:'ingredients',label:"Ingrédients principaux déclarés",type:'textarea',required:true},
      {key:'date_certification',label:"Date de certification",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CERTIFICATION HALAL ALIMENTAIRE</h1><h2>Certificat de Conformité à la Charia</h2><p>Délivré à <strong>{{fabricant}}</strong> pour le produit <strong>{{produit}}</strong>, par <strong>{{certificateur}}</strong>.</p><h3>Article 1 — Produit</h3><p>Le produit {{produit}} est certifié Halal à compter du {{date_certification}}. Ingrédients déclarés : {{ingredients}}.</p><h3>Article 2 — Obligations</h3><p>Le fabricant s'engage à maintenir la conformité Halal de la formulation, de la production et de la chaîne d'approvisionnement.</p><h3>Article 3 — Contrôle</h3><p>Des audits inopinés peuvent être effectués par le certificateur. Tout écart entraîne la suspension immédiate de la certification.</p><p>Fait à Abidjan, le {{date_certification}}</p></div>`
  },
  {
    code: 'zakat_certif_cosmetique', name: "Accord de Certification Cosmétique Halal", category: 'association', price: 5000, priceMax: 15000,
    description: "Accord de certification Halal d'un produit cosmétique, attestant l'absence d'ingrédients prohibés et la conformité du processus de fabrication.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'marque',label:"Nom de la marque cosmétique",type:'text',required:true},
      {key:'certificateur',label:"Organisme certificateur",type:'text',required:true},
      {key:'gamme',label:"Gamme de produits certifiée",type:'text',required:true},
      {key:'composition',label:"Composition déclarée (ingrédients clés)",type:'textarea',required:true},
      {key:'date_certification',label:"Date de certification",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CERTIFICATION COSMETIQUE HALAL</h1><h2>Conformité Islamique des Cosmétiques</h2><p>Délivré à <strong>{{marque}}</strong> pour la gamme <strong>{{gamme}}</strong>, par <strong>{{certificateur}}</strong>.</p><h3>Article 1 — Conformité</h3><p>La gamme {{gamme}} est certifiée exempte de tout ingrédient prohibé (alcool d'origine haram, gélatine porcine, etc.) depuis le {{date_certification}}. Composition déclarée : {{composition}}.</p><h3>Article 2 — Affichage</h3><p>La marque est autorisée à apposer le logo Halal du certificateur sur ses emballages et supports de communication.</p><h3>Article 3 — Renouvellement</h3><p>La certification est annuelle et soumise à un audit de renouvellement.</p><p>Fait à Abidjan, le {{date_certification}}</p></div>`
  },
  {
    code: 'zakat_certif_pharma', name: "Accord de Certification Pharmaceutique Halal", category: 'association', price: 6000, priceMax: 18000,
    description: "Accord de certification Halal d'un médicament ou produit pharmaceutique, attestant la conformité des excipients et du processus de fabrication aux normes islamiques.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'laboratoire',label:"Nom du laboratoire pharmaceutique",type:'text',required:true},
      {key:'certificateur',label:"Organisme certificateur islamique",type:'text',required:true},
      {key:'medicament',label:"Nom du médicament ou produit",type:'text',required:true},
      {key:'excipients',label:"Excipients et principes actifs déclarés",type:'textarea',required:true},
      {key:'date_certification',label:"Date de certification",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CERTIFICATION PHARMACEUTIQUE HALAL</h1><h2>Médicaments et Produits de Santé Conformes</h2><p>Délivré à <strong>{{laboratoire}}</strong> pour le produit <strong>{{medicament}}</strong>, par <strong>{{certificateur}}</strong>.</p><h3>Article 1 — Conformité</h3><p>Le produit {{medicament}} est certifié Halal à compter du {{date_certification}}. Excipients et principes actifs déclarés : {{excipients}}.</p><h3>Article 2 — Normes</h3><p>La certification est accordée conformément aux normes ESMA et aux standards internationaux Halal pour les produits pharmaceutiques.</p><h3>Article 3 — Responsabilité</h3><p>Le laboratoire reste responsable de toute modification de formule et doit en informer immédiatement le certificateur.</p><p>Fait à Abidjan, le {{date_certification}}</p></div>`
  },
  {
    code: 'zakat_service_imam', name: "Accord de Service d'Imam (Mosquée)", category: 'association', price: 4000, priceMax: 12000,
    description: "Convention de prestation de service d'un imam auprès d'une mosquée ou d'une communauté islamique, définissant missions, rémunération et conditions.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 76,
    fieldsJson: F([
      {key:'mosquee',label:"Nom de la mosquée",type:'text',required:true},
      {key:'imam',label:"Nom de l'imam",type:'text',required:true},
      {key:'qualifications',label:"Qualifications religieuses de l'imam",type:'textarea',required:true},
      {key:'remuneration',label:"Rémunération mensuelle (FCFA)",type:'text',required:true},
      {key:'date_prise_fonction',label:"Date de prise de fonction",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'IMAM</h1><h2>Convention de Prestation Religieuse</h2><p>Entre la <strong>{{mosquee}}</strong> et <strong>{{imam}}</strong>.</p><h3>Article 1 — Mission</h3><p>L'imam assure la direction des prières quotidiennes, du prêche du vendredi (Khutba), l'enseignement coranique et le conseil spirituel de la communauté, à compter du {{date_prise_fonction}}.</p><h3>Article 2 — Qualifications</h3><p>L'imam atteste des qualifications suivantes : {{qualifications}}, reconnues par l'autorité islamique compétente.</p><h3>Article 3 — Rémunération</h3><p>La mosquée verse à l'imam une rémunération mensuelle de {{remuneration}} FCFA, qualifiée de salaire halal.</p><p>Fait à Abidjan, le {{date_prise_fonction}}</p></div>`
  },
  {
    code: 'zakat_enseignement_coranique', name: "Accord de Service d'Enseignement Coranique (Médersas)", category: 'association', price: 4000, priceMax: 12000,
    description: "Convention de prestation d'enseignement coranique dans une médersa ou école islamique, définissant le programme, les conditions d'enseignement et la rémunération.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 79,
    fieldsJson: F([
      {key:'medersa',label:"Nom de la médersa ou école islamique",type:'text',required:true},
      {key:'enseignant',label:"Nom de l'enseignant",type:'text',required:true},
      {key:'programme',label:"Programme d'enseignement coranique",type:'textarea',required:true},
      {key:'remuneration',label:"Rémunération mensuelle (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ENSEIGNEMENT CORANIQUE</h1><h2>Médersas et Écoles Islamiques</h2><p>Entre la <strong>{{medersa}}</strong> et <strong>{{enseignant}}</strong>.</p><h3>Article 1 — Mission</h3><p>L'enseignant dispense les cours suivants : {{programme}}, à compter du {{date_debut}}.</p><h3>Article 2 — Méthode</h3><p>L'enseignement est conduit selon les méthodes pédagogiques islamiques traditionnelles, dans le respect des élèves et de leur développement spirituel et intellectuel.</p><h3>Article 3 — Rémunération</h3><p>La médersa verse à l'enseignant une rémunération mensuelle de {{remuneration}} FCFA.</p><p>Fait à Abidjan, le {{date_debut}}</p></div>`
  },
  {
    code: 'zakat_rapport_annuel', name: "Rapport Annuel de la Zakat", category: 'association', price: 5000, priceMax: 15000,
    description: "Rapport annuel d'une institution de collecte et de distribution de la Zakat, présentant les ressources collectées, les bénéficiaires aidés et l'impact social.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 71,
    fieldsJson: F([
      {key:'institution',label:"Nom de l'institution Zakat",type:'text',required:true},
      {key:'exercice',label:"Exercice annuel (ex: 2025)",type:'text',required:true},
      {key:'total_collecte',label:"Total collecté (FCFA)",type:'text',required:true},
      {key:'nb_beneficiaires',label:"Nombre de bénéficiaires aidés",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT ANNUEL DE LA ZAKAT</h1><h2>{{institution}} — Exercice {{exercice}}</h2><p>Publié le {{date_rapport}}.</p><h3>1. Ressources Collectées</h3><p>Total de Zakat collecté au cours de l'exercice {{exercice}} : {{total_collecte}} FCFA, auprès de l'ensemble des contributeurs (Muzakki) enregistrés.</p><h3>2. Distribution</h3><p>Les fonds ont été distribués à {{nb_beneficiaires}} bénéficiaires (Mustahiqin) répartis dans les huit catégories coraniques, conformément aux règles de la Charia.</p><h3>3. Impact Social</h3><p>La Zakat distribuée a permis de soutenir les familles dans le besoin, de financer des bourses d'études et de contribuer au développement communautaire en Côte d'Ivoire et dans la sous-région.</p><p>Fait à Abidjan, le {{date_rapport}}</p></div>`
  },
  {
    code: 'zakat_plan_eco_islamique', name: "Plan de Développement Économie Islamique", category: 'association', price: 7000, priceMax: 21000,
    description: "Document stratégique de développement de l'économie islamique solidaire pour une organisation ou une communauté de l'espace UEMOA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 73,
    fieldsJson: F([
      {key:'organisation',label:"Nom de l'organisation",type:'text',required:true},
      {key:'horizon',label:"Horizon stratégique (ex: 2025-2030)",type:'text',required:true},
      {key:'axes_strategiques',label:"Axes stratégiques principaux",type:'textarea',required:true},
      {key:'budget_plan',label:"Budget du plan (FCFA)",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE DEVELOPPEMENT ECONOMIE ISLAMIQUE</h1><h2>{{organisation}} — Horizon {{horizon}}</h2><p>Adopté le {{date_adoption}}, avec un budget de {{budget_plan}} FCFA.</p><h3>1. Vision</h3><p>{{organisation}} ambitionne de contribuer à l'émergence d'une économie islamique inclusive et solidaire en Afrique de l'Ouest à l'horizon {{horizon}}.</p><h3>2. Axes Stratégiques</h3><p>{{axes_strategiques}}</p><h3>3. Gouvernance</h3><p>La mise en oeuvre du plan est supervisée par un Comité de pilotage comprenant des savants islamiques, des économistes et des représentants des communautés.</p><p>Fait à Abidjan, le {{date_adoption}}</p></div>`
  },
  {
    code: 'zakat_charte_eco_islamique', name: "Charte de l'Économie Islamique Solidaire en Afrique", category: 'association', price: 6000, priceMax: 18000,
    description: "Charte fondatrice des valeurs et engagements de l'économie islamique solidaire en Afrique, adoptée par les organisations membres d'un réseau islamique.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 77,
    fieldsJson: F([
      {key:'reseau',label:"Nom du réseau ou fédération",type:'text',required:true},
      {key:'signataire',label:"Nom de l'organisation signataire",type:'text',required:true},
      {key:'representant',label:"Représentant légal",type:'text',required:true},
      {key:'engagements',label:"Engagements spécifiques de l'organisation",type:'textarea',required:true},
      {key:'date_signature',label:"Date de signature de la Charte",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE L'ECONOMIE ISLAMIQUE SOLIDAIRE EN AFRIQUE</h1><h2>Réseau {{reseau}}</h2><p>Signée par <strong>{{signataire}}</strong>, représentée par <strong>{{representant}}</strong>, le {{date_signature}}.</p><h3>Préambule</h3><p>Inspirées par les valeurs coraniques de justice, d'équité et de solidarité, les organisations signataires s'engagent à bâtir une économie islamique au service du développement durable de l'Afrique.</p><h3>Principes de la Charte</h3><p>1. Économie réelle et productive ; 2. Finance éthique sans Riba ; 3. Redistribution via Zakat et Waqf ; 4. Commerce équitable et halal ; 5. Solidarité et inclusion.</p><h3>Engagements de {{signataire}}</h3><p>{{engagements}}</p><p>Fait à Abidjan, le {{date_signature}}</p></div>`
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
  console.log(`Batch 100b OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
