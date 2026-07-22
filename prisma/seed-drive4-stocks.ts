// Seed « Stocks & Approvisionnements » IBIG DocPro — Agent Drive4-3/10.
// Templates convertis depuis les modèles Google Drive des kits STOCKS & APPROVISIONNEMENTS
// (parentId '11SkA1irYiFKo554REbwr6u80SoJmiuqY' et '13kaqdi1R2dYo2NFcCAjS5dbzsl7yY_Ze').
// Ces kits ne contiennent quasiment que des applications Excel (.xlsx/.xlsm) et des livres PDF
// (ignorés) ; le seul modèle .docx présent est « FEUILLE D'INVENTAIRE PHYSIQUE ». Les autres
// trames de flux/stock et d'achat proviennent des dossiers connexes du Drive IBI
// (Kit Transit-Douane IBI078 : bons de réception/sortie/retour, bordereau d'expédition,
// permis import/export ; dossiers Achats & Fournisseurs : contrats d'appro / d'achat / d'appel
// d'offres, fiche d'évaluation & fichier fournisseur, demande d'offre, réapprovisionnement).
// Variantes fusionnées (voir rapport). Script ADDITIF : upsert par code.
// Exécution : npx tsx prisma/seed-drive4-stocks.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type StockTemplate = {
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

const templates: StockTemplate[] = [
  // ════════════════════════ FLUX & MOUVEMENTS DE STOCK ════════════════════════
  {
    code: 'stock_bon_reception', name: 'Bon de réception de marchandises', category: 'transport_logistique', price: 300, priceMax: 900,
    description: 'Bon de réception attestant l’entrée en stock de marchandises livrées par un fournisseur : identité des parties, description des articles, facturation, état à la réception et signature du destinataire.',
    fieldsJson: F([
      { key: 'numero', label: 'Numéro de bon de réception', type: 'text', required: true },
      { key: 'fournisseur', label: 'Fournisseur / expéditeur (nom, adresse, téléphone)', type: 'textarea', required: true },
      { key: 'destinataire', label: 'Destinataire / client (nom, adresse, téléphone)', type: 'textarea', required: true },
      { key: 'marchandises', label: 'Description des marchandises, quantité et prix', type: 'textarea', required: true },
      { key: 'facturation', label: 'Informations de facturation (n° facture, montant, date)', type: 'textarea', required: false },
      { key: 'etat', label: 'État des marchandises à la réception et remarques', type: 'textarea', required: true },
      { key: 'signataire', label: 'Représentant du destinataire (nom + fonction)', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p class="align-center"><strong>BON DE RÉCEPTION</strong></p><p>Bon de réception N° : <strong>{{numero}}</strong> — Date de réception : {{date_jour}}</p><p><strong>1. Fournisseur / expéditeur</strong><br/>{{fournisseur}}</p><p><strong>2. Destinataire / client</strong><br/>{{destinataire}}</p><p><strong>3. Description des marchandises</strong><br/>{{marchandises}}</p><p><strong>4. Informations de facturation</strong><br/>{{facturation}}</p><p><strong>5. Conditions de réception</strong><br/>{{etat}}</p><p><strong>6. Déclaration et signature</strong></p><p>Je confirme par la présente la réception des marchandises mentionnées ci-dessus conformément aux termes et conditions convenus.</p><p>Fait le {{date_jour}}.</p><p class="signatures">{{signataire}}</p></div>`,
    popularity: 48,
  },
  {
    code: 'stock_bon_sortie', name: 'Bon de sortie de stock', category: 'transport_logistique', price: 300, priceMax: 900,
    description: 'Bon de sortie justifiant le retrait d’articles d’un entrepôt ou lieu de stockage : entrepôt émetteur, destinataire, liste des articles retirés, motif de la sortie et signature de l’agent d’entrepôt.',
    fieldsJson: F([
      { key: 'numero', label: 'Numéro de bon de sortie', type: 'text', required: true },
      { key: 'entrepot', label: 'Entrepôt / lieu de stockage (nom, adresse, contact)', type: 'textarea', required: true },
      { key: 'destinataire', label: 'Destinataire (nom, adresse, contact)', type: 'textarea', required: true },
      { key: 'articles', label: 'Articles / marchandises sortis (n°, description, quantité, remarques)', type: 'textarea', required: true },
      { key: 'motif', label: 'Motif de la sortie', type: 'textarea', required: true },
      { key: 'agent', label: 'Agent d’entrepôt (nom + fonction)', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p class="align-center"><strong>BON DE SORTIE DE STOCK</strong></p><p>Bon de sortie N° : <strong>{{numero}}</strong> — Date de sortie : {{date_jour}}</p><p><strong>1. Entrepôt / lieu de stockage</strong><br/>{{entrepot}}</p><p><strong>2. Destinataire</strong><br/>{{destinataire}}</p><p><strong>3. Articles / marchandises</strong><br/>{{articles}}</p><p><strong>4. Motif de la sortie</strong><br/>{{motif}}</p><p><strong>5. Signature</strong></p><p>Je confirme par la présente que les articles énumérés ci-dessus ont été correctement retirés de l'entrepôt / du lieu de stockage.</p><p>Fait le {{date_jour}}.</p><p class="signatures">{{agent}}</p></div>`,
    popularity: 45,
  },
  {
    code: 'stock_bon_retour', name: 'Bon de retour de marchandises', category: 'transport_logistique', price: 300, priceMax: 900,
    description: 'Bon de retour formalisant le renvoi d’articles vers un entrepôt ou un fournisseur : client expéditeur, destinataire, liste des articles retournés avec motif, instructions spéciales et signature du responsable de réception.',
    fieldsJson: F([
      { key: 'numero', label: 'Numéro de bon de retour', type: 'text', required: true },
      { key: 'expediteur', label: 'Client / expéditeur (nom, adresse, contact)', type: 'textarea', required: true },
      { key: 'destinataire', label: 'Destinataire / entrepôt (nom, adresse, contact)', type: 'textarea', required: true },
      { key: 'articles', label: 'Articles retournés (n°, description, quantité, raison du retour)', type: 'textarea', required: true },
      { key: 'instructions', label: 'Instructions spéciales pour le traitement du retour', type: 'textarea', required: false },
      { key: 'responsable', label: 'Responsable de la réception (nom + fonction)', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p class="align-center"><strong>BON DE RETOUR DE MARCHANDISES</strong></p><p>Bon de retour N° : <strong>{{numero}}</strong> — Date de retour : {{date_jour}}</p><p><strong>1. Client / expéditeur</strong><br/>{{expediteur}}</p><p><strong>2. Destinataire / entrepôt</strong><br/>{{destinataire}}</p><p><strong>3. Articles / marchandises retournés</strong><br/>{{articles}}</p><p><strong>4. Instructions spéciales pour le retour</strong><br/>{{instructions}}</p><p><strong>5. Signature</strong></p><p>Je confirme par la présente que les articles énumérés ci-dessus ont été correctement retournés conformément aux instructions fournies.</p><p>Fait le {{date_jour}}.</p><p class="signatures">{{responsable}}</p></div>`,
    popularity: 38,
  },
  {
    code: 'stock_bordereau_expedition', name: 'Bordereau d’expédition', category: 'transport_logistique', price: 400, priceMax: 1200,
    description: 'Bordereau d’expédition accompagnant un envoi de marchandises : expéditeur et destinataire avec identification fiscale, détail des articles (poids et volume), transporteur, numéro de suivi, Incoterm et conditions de livraison.',
    fieldsJson: F([
      { key: 'numero', label: 'Numéro de bordereau d’expédition', type: 'text', required: true },
      { key: 'expediteur', label: 'Expéditeur (entreprise, adresse, n° fiscal, contact)', type: 'textarea', required: true },
      { key: 'destinataire', label: 'Destinataire (entreprise, adresse de livraison, n° fiscal, contact)', type: 'textarea', required: true },
      { key: 'details', label: 'Détails de l’expédition (n°, article, quantité, poids, volume)', type: 'textarea', required: true },
      { key: 'transport', label: 'Transporteur / mode de transport et numéro de suivi', type: 'textarea', required: true },
      { key: 'livraison', label: 'Conditions de livraison (Incoterm, lieu de livraison)', type: 'text', required: true },
      { key: 'instructions', label: 'Instructions spéciales (facultatif)', type: 'textarea', required: false },
      { key: 'signataire', label: 'Signataire (nom + fonction de l’expéditeur)', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p class="align-center"><strong>BORDEREAU D'EXPÉDITION</strong></p><p>Bordereau N° : <strong>{{numero}}</strong> — Date d'expédition : {{date_jour}}</p><p><strong>1. Expéditeur</strong><br/>{{expediteur}}</p><p><strong>2. Destinataire</strong><br/>{{destinataire}}</p><p><strong>3. Détails de l'expédition</strong><br/>{{details}}</p><p><strong>4. Transporteur / mode de transport</strong><br/>{{transport}}</p><p><strong>5. Conditions de livraison</strong><br/>{{livraison}}</p><p><strong>6. Instructions spéciales</strong><br/>{{instructions}}</p><p><strong>7. Déclaration et signature</strong></p><p>En émettant ce bordereau d'expédition, l'expéditeur confirme l'exactitude des détails de l'expédition mentionnés ci-dessus.</p><p>Fait le {{date_jour}}.</p><p class="signatures">{{signataire}}</p></div>`,
    popularity: 34,
  },
  {
    code: 'stock_feuille_inventaire', name: 'Feuille d’inventaire physique (trame)', category: 'transport_logistique', price: 300, priceMax: 900,
    description: 'Trame de feuille d’inventaire physique pour recenser les articles en stock lors d’un comptage : numéro d’inventaire, description, prix d’achat, quantité et emplacement, avec en-tête (feuille, date, département) et signature.',
    fieldsJson: F([
      { key: 'numero_feuille', label: 'Numéro de la feuille', type: 'text', required: true },
      { key: 'departement', label: 'Département / magasin inventorié', type: 'text', required: true },
      { key: 'effectue_par', label: 'Inventaire effectué par (nom + fonction)', type: 'text', required: true },
      { key: 'articles', label: 'Articles recensés (n° inventaire, description, prix d’achat, quantité, emplacement)', type: 'textarea', required: true },
      { key: 'observations', label: 'Observations (écarts constatés, articles endommagés…) (facultatif)', type: 'textarea', required: false },
      { key: 'signataire', label: 'Signataire (nom + fonction)', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p class="align-center"><strong>FEUILLE D'INVENTAIRE PHYSIQUE</strong></p><p>Feuille N° : <strong>{{numero_feuille}}</strong> — Date : {{date_jour}}</p><p>Département : {{departement}}<br/>Effectué par : {{effectue_par}}</p><p><strong>Articles recensés</strong> (n° inventaire — description — prix d'achat — quantité — emplacement) :</p><p>{{articles}}</p><p><strong>Observations</strong><br/>{{observations}}</p><p>Fait le {{date_jour}}.</p><p class="signatures">{{signataire}}</p></div>`,
    popularity: 42,
  },
  {
    code: 'stock_fiche_inventaire_equipements', name: 'Fiche d’inventaire d’équipements', category: 'transport_logistique', price: 300, priceMax: 1000,
    description: 'Fiche d’inventaire des équipements et immobilisations : désignation (marque, modèle), numéro de série, date d’acquisition, vendeur ou bailleur, coût et valeur actuelle de chaque matériel.',
    fieldsJson: F([
      { key: 'entite', label: 'Entité / service détenteur des équipements', type: 'text', required: true },
      { key: 'responsable', label: 'Responsable de l’inventaire (nom + fonction)', type: 'text', required: true },
      { key: 'equipements', label: 'Équipements (n° inventaire, désignation + marque/modèle, n° de série, date d’acquisition, vendeur/bailleur, coût, valeur actuelle)', type: 'textarea', required: true },
      { key: 'observations', label: 'Observations (état, localisation…) (facultatif)', type: 'textarea', required: false },
      { key: 'signataire', label: 'Signataire (nom + fonction)', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p class="align-center"><strong>FICHE D'INVENTAIRE D'ÉQUIPEMENTS</strong></p><p>Entité / service : {{entite}}<br/>Responsable de l'inventaire : {{responsable}}<br/>Date : {{date_jour}}</p><p><strong>Équipements recensés</strong> (n° inventaire — désignation, marque et modèle — n° de série — date d'acquisition — vendeur ou bailleur — coût — valeur actuelle) :</p><p>{{equipements}}</p><p><strong>Observations</strong><br/>{{observations}}</p><p>Fait le {{date_jour}}.</p><p class="signatures">{{signataire}}</p></div>`,
    popularity: 30,
  },
  {
    code: 'stock_permis_import_export', name: 'Demande de permis d’importation / exportation', category: 'transport_logistique', price: 600, priceMax: 1800,
    description: 'Lettre de demande de permis d’importation / exportation adressée à l’autorité compétente : description détaillée des marchandises, motifs, informations de transport et documents joints (factures, certificats d’origine, assurance).',
    fieldsJson: F([
      { key: 'autorite', label: 'Autorité compétente (nom, adresse, contact)', type: 'textarea', required: true },
      { key: 'representant', label: 'Représentant légal (nom + poste)', type: 'text', required: true },
      { key: 'entreprise', label: 'Entreprise (nom + siège social + coordonnées)', type: 'textarea', required: true },
      { key: 'marchandises', label: 'Description des marchandises (nom, quantité, poids, valeur, origine, destination)', type: 'textarea', required: true },
      { key: 'motifs', label: 'Motifs de l’importation / exportation', type: 'textarea', required: true },
      { key: 'transport', label: 'Informations sur le transport (mode, transporteur, itinéraire)', type: 'textarea', required: true },
      { key: 'documents', label: 'Documents joints (factures, certificats d’origine, assurance…)', type: 'textarea', required: false },
    ]),
    body: `<div class="lettre"><p class="align-right">Le {{date_jour}}</p><p><strong>Autorité compétente en charge des permis</strong><br/>{{autorite}}</p><p>Objet : <strong>Demande de permis d'importation / exportation</strong></p><p>Madame, Monsieur,</p><p>Je soussigné(e) {{representant}}, agissant en tant que représentant(e) légal(e) de l'entreprise ci-après, souhaite solliciter auprès de votre autorité l'obtention d'un permis d'importation / exportation.</p><p><strong>Entreprise demandeuse :</strong><br/>{{entreprise}}</p><p><strong>Description des marchandises :</strong><br/>{{marchandises}}</p><p><strong>Motifs de l'importation / exportation :</strong><br/>{{motifs}}</p><p><strong>Informations sur le transport :</strong><br/>{{transport}}</p><p><strong>Documents joints à la demande :</strong><br/>{{documents}}</p><p>Je m'engage à respecter toutes les réglementations et exigences en vigueur concernant l'importation / exportation de ces marchandises et reste à votre disposition pour toute information complémentaire.</p><p>Je vous remercie pour votre diligence et vous prie d'agréer, Madame, Monsieur, mes salutations distinguées.</p><p class="signatures">{{representant}}</p></div>`,
    popularity: 26,
  },

  // ════════════════════════ ACHATS & FOURNISSEURS ════════════════════════
  {
    code: 'stock_contrat_approvisionnement', name: 'Contrat d’approvisionnement', category: 'commercial_financier', price: 800, priceMax: 3000,
    description: 'Contrat d’approvisionnement entre un fournisseur et un acheteur : objet, description des biens ou services, quantité et prix, conditions de paiement, livraison, responsabilités, garantie, résiliation et loi applicable.',
    fieldsJson: F([
      { key: 'fournisseur', label: 'Fournisseur (nom, adresse, n° d’identification)', type: 'textarea', required: true },
      { key: 'acheteur', label: 'Acheteur (nom, adresse, n° d’identification)', type: 'textarea', required: true },
      { key: 'biens', label: 'Description détaillée des biens ou services à approvisionner', type: 'textarea', required: true },
      { key: 'quantite_prix', label: 'Quantité, prix unitaire et montant total', type: 'textarea', required: true },
      { key: 'paiement', label: 'Conditions de paiement (acompte, solde, délais)', type: 'textarea', required: true },
      { key: 'livraison', label: 'Lieu et calendrier de livraison', type: 'textarea', required: true },
      { key: 'garantie', label: 'Période de garantie', type: 'text', required: false },
      { key: 'juridiction', label: 'Loi applicable et lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p class="align-center"><strong>CONTRAT D'APPROVISIONNEMENT</strong></p><p><strong>Entre le fournisseur :</strong><br/>{{fournisseur}}</p><p><strong>Et l'acheteur :</strong><br/>{{acheteur}}</p><p><strong>Objet du contrat</strong></p><p>Le présent contrat a pour objet de définir les termes et conditions de l'approvisionnement de biens (ou services) par le fournisseur à l'acheteur.</p><p><strong>Description des biens ou services</strong><br/>{{biens}}</p><p><strong>Quantité et prix</strong><br/>{{quantite_prix}}</p><p><strong>Conditions de paiement</strong><br/>{{paiement}}</p><p><strong>Livraison</strong><br/>{{livraison}}</p><p><strong>Responsabilités du fournisseur :</strong> fournir les biens ou services conformément aux spécifications convenues, en assurer la qualité et respecter les délais de livraison.</p><p><strong>Responsabilités de l'acheteur :</strong> payer le fournisseur conformément aux modalités convenues et coopérer pour faciliter la livraison et la réception.</p><p><strong>Garantie</strong><br/>Le fournisseur garantit que les biens fournis sont exempts de défauts de matériaux et de fabrication pour une période de {{garantie}} à compter de la date de livraison.</p><p><strong>Résiliation</strong><br/>Le présent contrat peut être résilié par l'une ou l'autre des parties en cas de non-respect des obligations qui y sont définies ou pour toute autre raison légalement valable.</p><p><strong>Loi applicable</strong><br/>{{juridiction}}</p><p>En foi de quoi, les parties ont signé le présent contrat en deux exemplaires, le {{date_jour}}.</p><p class="signatures">Signature du fournisseur : _______________________<br/>Signature de l'acheteur : _______________________</p></div>`,
    popularity: 40,
  },
  {
    code: 'stock_contrat_achat_fourniture', name: 'Contrat d’achat ou de fourniture', category: 'commercial_financier', price: 700, priceMax: 2500,
    description: 'Contrat d’achat ou de fourniture de biens ou services : objet, durée, prix et modalités de paiement, responsabilités des parties, résiliation, confidentialité, loi applicable et juridiction.',
    fieldsJson: F([
      { key: 'acheteur', label: 'Acheteur (entreprise, adresse, téléphone, e-mail)', type: 'textarea', required: true },
      { key: 'fournisseur', label: 'Fournisseur (entreprise, adresse, téléphone, e-mail)', type: 'textarea', required: true },
      { key: 'objet', label: 'Description détaillée des biens ou services à acheter / fournir', type: 'textarea', required: true },
      { key: 'prix', label: 'Prix total et modalités de paiement (montant, fréquence, échéances)', type: 'textarea', required: true },
      { key: 'preavis', label: 'Préavis de résiliation (nombre de jours)', type: 'text', required: true },
      { key: 'juridiction', label: 'Loi applicable et juridiction compétente', type: 'text', required: true },
      { key: 'date_signature', label: 'Lieu / date de signature (facultatif)', type: 'text', required: false },
    ]),
    body: `<div class="lettre"><p class="align-center"><strong>CONTRAT D'ACHAT OU DE FOURNITURE</strong></p><p><strong>Entre l'Acheteur :</strong><br/>{{acheteur}}</p><p><strong>Et le Fournisseur :</strong><br/>{{fournisseur}}</p><p><strong>1. Objet du contrat</strong></p><p>L'Acheteur s'engage à acheter et le Fournisseur s'engage à fournir les biens ou services suivants (les « Biens/Services ») : {{objet}}. Les Biens/Services seront fournis conformément aux termes et conditions énoncés dans le présent contrat.</p><p><strong>2. Durée</strong><br/>Le présent contrat entre en vigueur à la date de sa signature par les deux parties et demeure en vigueur jusqu'à la réalisation complète de la fourniture des Biens/Services, sauf résiliation anticipée.</p><p><strong>3. Prix et paiement</strong><br/>{{prix}}</p><p><strong>4. Responsabilités des parties</strong><br/>Le Fournisseur fournit les Biens/Services conformément aux normes de qualité convenues ; l'Acheteur s'engage à en accepter la livraison conformément aux termes du contrat.</p><p><strong>5. Résiliation</strong><br/>Le présent contrat peut être résilié par l'une ou l'autre des parties en cas de non-respect substantiel de ses termes, sous réserve d'un préavis écrit de {{preavis}} jours.</p><p><strong>6. Confidentialité</strong><br/>Les parties conviennent de maintenir la confidentialité de toute information confidentielle échangée dans le cadre du présent contrat.</p><p><strong>7. Loi applicable et juridiction</strong><br/>{{juridiction}}</p><p>Signé par les parties soussignées le {{date_signature}} {{date_jour}}.</p><p class="signatures">L'Acheteur : _______________________<br/>Le Fournisseur : _______________________</p></div>`,
    popularity: 36,
  },
  {
    code: 'stock_contrat_appel_offres', name: 'Contrat d’appel d’offres (fournisseur retenu)', category: 'commercial_financier', price: 800, priceMax: 3000,
    description: 'Contrat conclu à l’issue d’un appel d’offres avec le fournisseur retenu : rappel de l’appel d’offres et de l’offre soumise, description des biens ou services, paiement, responsabilités, résiliation et juridiction.',
    fieldsJson: F([
      { key: 'acheteur', label: 'Acheteur (entreprise, adresse, téléphone, e-mail)', type: 'textarea', required: true },
      { key: 'fournisseur', label: 'Fournisseur retenu (entreprise, adresse, téléphone, e-mail)', type: 'textarea', required: true },
      { key: 'objet_appel', label: 'Objet de l’appel d’offres', type: 'textarea', required: true },
      { key: 'biens', label: 'Description détaillée des biens ou services à fournir', type: 'textarea', required: true },
      { key: 'paiement', label: 'Prix total et modalités de paiement', type: 'textarea', required: true },
      { key: 'preavis', label: 'Préavis de résiliation (nombre de jours)', type: 'text', required: true },
      { key: 'juridiction', label: 'Loi applicable et juridiction compétente', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p class="align-center"><strong>CONTRAT D'APPEL D'OFFRES</strong></p><p><strong>Entre l'Acheteur :</strong><br/>{{acheteur}}</p><p><strong>Et le Fournisseur retenu :</strong><br/>{{fournisseur}}</p><p><strong>1. Objet du contrat</strong></p><p>L'Acheteur a lancé un appel d'offres portant sur : {{objet_appel}}. Le Fournisseur a soumis une offre en réponse à cet appel d'offres et a été sélectionné comme le fournisseur retenu pour exécuter le projet ou fournir les biens/services correspondants.</p><p><strong>2. Durée</strong><br/>Le présent contrat entre en vigueur à la date de sa signature par les deux parties et demeure en vigueur jusqu'à la réalisation complète du projet ou la livraison complète des biens/services, sauf résiliation anticipée.</p><p><strong>3. Description des biens / services fournis</strong><br/>{{biens}}<br/>Toute modification substantielle des spécifications doit faire l'objet d'un avenant écrit signé par les deux parties.</p><p><strong>4. Paiement et tarifs</strong><br/>{{paiement}}</p><p><strong>5. Responsabilités et obligations</strong><br/>L'Acheteur collabore avec le Fournisseur et lui fournit toute information nécessaire ; le Fournisseur garantit la conformité des biens/services aux spécifications de l'appel d'offres et aux normes de qualité convenues.</p><p><strong>6. Résiliation</strong><br/>Le présent contrat peut être résilié en cas de non-respect substantiel de ses termes, sous réserve d'un préavis écrit de {{preavis}} jours.</p><p><strong>7. Loi applicable et juridiction</strong><br/>{{juridiction}}</p><p>Signé par les parties soussignées le {{date_jour}}.</p><p class="signatures">L'Acheteur : _______________________<br/>Le Fournisseur : _______________________</p></div>`,
    popularity: 28,
  },
  {
    code: 'stock_demande_offre_fournisseur', name: 'Demande d’offre (appel d’offres fournisseur)', category: 'commercial_financier', price: 300, priceMax: 900,
    description: 'Lettre de demande d’offre invitant un fournisseur présélectionné à soumettre une proposition technique et financière pour un produit ou service, avec date limite de réponse et référence au cahier des charges.',
    fieldsJson: F([
      { key: 'destinataire', label: 'Fournisseur destinataire (nom + adresse)', type: 'textarea', required: true },
      { key: 'produit', label: 'Produit ou service concerné', type: 'text', required: true },
      { key: 'date_limite', label: 'Date limite de remise de la proposition', type: 'date', required: true },
      { key: 'mandats', label: 'Référence / intitulé du cahier des charges (mandats)', type: 'text', required: false },
      { key: 'signataire', label: 'Signature (nom + titre + entreprise + coordonnées)', type: 'textarea', required: true },
    ]),
    body: `<div class="lettre"><p class="align-right">Le {{date_jour}}</p><p>À : {{destinataire}}</p><p>Objet : <strong>Demande d'offre pour {{produit}}</strong></p><p>Madame, Monsieur,</p><p>Notre entreprise a besoin de {{produit}}. Nous avons évalué différents fournisseurs au cours des dernières semaines et en avons retenu un nombre réduit qui semblent être les acteurs majeurs du secteur. Après évaluation, nous sommes heureux de vous annoncer que votre entreprise fait partie du groupe de fournisseurs potentiels sélectionnés.</p><p>Nous vous prions de nous envoyer une proposition technique et financière au plus tard le <strong>{{date_limite}}</strong>, ainsi que tout document que vous jugerez important. Vous voudrez bien mettre un accent particulier sur la valeur unique de votre entreprise. Vous trouverez plus de détails dans le cahier des charges ci-joint : {{mandats}}.</p><p>Nous vous remercions de votre promptitude dans la réponse à la présente requête et vous prions d'agréer, Madame, Monsieur, nos salutations distinguées.</p><p class="signatures">{{signataire}}</p></div>`,
    popularity: 33,
  },
  {
    code: 'stock_evaluation_fournisseur', name: 'Fiche d’évaluation des fournisseurs', category: 'commercial_financier', price: 400, priceMax: 1200,
    description: 'Fiche d’évaluation de la performance d’un fournisseur : identité de l’entreprise et notation (1 à 5) sur les délais de livraison, la qualité, la compétitivité des prix, le service, la solidité financière et l’expertise technique.',
    fieldsJson: F([
      { key: 'date_eval', label: 'Date de l’évaluation et numéro', type: 'text', required: true },
      { key: 'prepare_par', label: 'Préparé par (nom + fonction)', type: 'text', required: true },
      { key: 'fournisseur', label: 'Fournisseur (nom, type et forme juridique, adresse, contacts)', type: 'textarea', required: true },
      { key: 'notation', label: 'Notation par critère (délais, qualité, prix, service, solvabilité, situation financière, notoriété, expertise technique…) sur une échelle de 1 à 5', type: 'textarea', required: true },
      { key: 'total', label: 'Total des points et appréciation globale', type: 'textarea', required: true },
      { key: 'signataire', label: 'Signataire (nom + fonction)', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p class="align-center"><strong>FICHE D'ÉVALUATION DU FOURNISSEUR</strong></p><p>Date : {{date_eval}} — Préparé par : {{prepare_par}}</p><p>Cette fiche sert à évaluer la performance des fournisseurs actuels ou potentiels. Chaque critère est noté de 1 à 5 (5 étant la meilleure note) ; le total des colonnes est ensuite comparé à celui des fournisseurs de même type.</p><p><strong>Informations sur le fournisseur</strong><br/>{{fournisseur}}</p><p><strong>Notation par critère</strong><br/>{{notation}}</p><p>Critères évalués : respect des délais de livraison, qualité des produits à la livraison et globale, compétitivité des prix, qualité du service, compétitivité des conditions, solvabilité et situation financière, notoriété, conformité de la fabrication aux spécifications, assistance R&amp;D et expertise du personnel technique.</p><p><strong>Total et appréciation globale</strong><br/>{{total}}</p><p>Fait le {{date_jour}}.</p><p class="signatures">{{signataire}}</p></div>`,
    popularity: 35,
  },
  {
    code: 'stock_fichier_fournisseur', name: 'Fiche / fichier fournisseur (liste de vérification)', category: 'commercial_financier', price: 300, priceMax: 800,
    description: 'Liste de vérification pour constituer et tenir à jour le fichier de chaque fournisseur habituel ou potentiel : catalogue et tarifs, contacts, conditions de livraison et de retour, garanties, remises et contrats de long terme.',
    fieldsJson: F([
      { key: 'fournisseur', label: 'Fournisseur concerné (nom + activité)', type: 'text', required: true },
      { key: 'contacts', label: 'Contacts et commerciaux (noms, téléphones, e-mails)', type: 'textarea', required: true },
      { key: 'elements', label: 'Éléments présents dans le fichier (catalogue/tarifs, remises et volume minimum, délais de livraison, garanties, politique de retour, factures, contrats de long terme…)', type: 'textarea', required: true },
      { key: 'observations', label: 'Observations / éléments manquants (facultatif)', type: 'textarea', required: false },
      { key: 'responsable', label: 'Responsable du fichier (nom + fonction)', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p class="align-center"><strong>FICHE / FICHIER FOURNISSEUR — LISTE DE VÉRIFICATION</strong></p><p>Fournisseur : <strong>{{fournisseur}}</strong> — Date : {{date_jour}}</p><p>Tenez un fichier pour chacun de vos fournisseurs habituels ou potentiels et vérifiez la présence des éléments ci-dessous.</p><p><strong>Contacts</strong><br/>{{contacts}}</p><p><strong>Éléments à conserver dans le fichier</strong><br/>{{elements}}</p><p>Éléments recommandés : catalogue ou liste de prix à jour et descriptions de produits, cartes de visite des commerciaux et du support technique, plan de remises et volume minimum d'achat, modalités et délais de livraison, assistance technique et services disponibles, politique de retour de marchandises, informations de garantie, demandes de cotation, copies des factures, contacts importants, termes de remise pour paiement accéléré, contrats de long terme, options de location-vente.</p><p><strong>Observations</strong><br/>{{observations}}</p><p class="signatures">{{responsable}}</p></div>`,
    popularity: 24,
  },
  {
    code: 'stock_suggestion_reapprovisionnement', name: 'Lettre de suggestion de réapprovisionnement', category: 'commercial_financier', price: 300, priceMax: 800,
    description: 'Lettre commerciale suggérant à un client de passer une nouvelle commande avant rupture de stock, avec bon de commande pré-rempli, garantie de satisfaction et remise conditionnée à un délai.',
    fieldsJson: F([
      { key: 'destinataire', label: 'Destinataire (nom + adresse)', type: 'textarea', required: true },
      { key: 'mois_commande', label: 'Mois de la précédente commande', type: 'text', required: true },
      { key: 'contact', label: 'Numéro / moyen pour renouveler la commande', type: 'text', required: true },
      { key: 'remise', label: 'Remise proposée (%) et délai / code pour en bénéficier', type: 'text', required: false },
      { key: 'signataire', label: 'Signature (nom + titre + entreprise + coordonnées)', type: 'textarea', required: true },
    ]),
    body: `<div class="lettre"><p class="align-right">Le {{date_jour}}</p><p>À : {{destinataire}}</p><p>Objet : <strong>Suggestion d'une nouvelle commande</strong></p><p>Madame, Monsieur,</p><p>En {{mois_commande}}, vous avez commandé les produits énumérés dans la liste ci-jointe. Nous vous remercions de cette opportunité et vous suggérons de passer une nouvelle commande avant que votre stock ne soit limité.</p><p>La seule information dont vous avez besoin pour commander à nouveau se trouve sur le bon de commande inclus dans la présente lettre. Vérifiez cette information, ajustez les quantités si nécessaire ou ajoutez de nouveaux produits, puis retournez-nous ce formulaire ou contactez-nous au {{contact}} ; nous nous occuperons du reste.</p><p>Vous êtes l'un de nos plus fidèles clients et c'est avec plaisir que nous continuerons à vous offrir une garantie de satisfaction à 100 %.</p><p>Recevez, Madame, Monsieur, nos salutations distinguées.</p><p class="signatures">{{signataire}}</p><p>P.-S. Commandez dès maintenant et économisez : {{remise}}. Les prix figurant sur le bon de commande incluent déjà cette réduction. Nous vous remercions de votre confiance.</p></div>`,
    popularity: 27,
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

  console.log('✅ Seed Stocks & Approvisionnements (Drive4) terminé.');
  console.log(`   Templates du script : ${templates.length} (créés : ${created}, mis à jour : ${updated})`);
  console.log('   Répartition par catégorie (ce script) :');
  for (const [cat, n] of Object.entries(byCategory)) console.log(`     - ${cat} : ${n}`);
  console.log(`   ➜ Total de templates en base : ${total}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
