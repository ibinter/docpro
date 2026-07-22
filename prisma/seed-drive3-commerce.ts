// Seed Drive 3 — TRANSIT DOUANE & IMPORT-EXPORT (IBI078) + COMMUNICATION PROFESSIONNELLE (IBI073) — Agent Drive3-10/10.
// 25 modèles convertis depuis le Google Drive IBIG : 13 documents douane/transit restants du Kit IBI078
// et 12 lettres/e-mails professionnels restants du Kit IBI073.
// Script ADDITIF : upsert par code — n'écrase pas les templates existants.
// Exécution : npx tsx prisma/seed-drive3-commerce.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type CatalogTemplate = {
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

const templates: CatalogTemplate[] = [
  // ════════════════════════ KIT IBI078 — TRANSIT DOUANE & IMPORT-EXPORT (13) ════════════════════════
  {
    code: 'trans_facture_commerciale_export', name: 'Facture Commerciale (Export / Import)', category: 'transport_logistique', price: 2000, priceMax: 4500,
    description: 'Facture commerciale pour le commerce international : expéditeur, destinataire, marchandises ligne par ligne, incoterm, mode de paiement et instructions de livraison — pièce maîtresse du dossier de dédouanement.',
    fieldsJson: F([
      { key: 'numero_facture', label: 'Numéro de facture', type: 'text', required: true },
      { key: 'expediteur', label: 'Expéditeur (entreprise, adresse, ville, pays, n° TVA/identification fiscale, contact, téléphone)', type: 'textarea', required: true },
      { key: 'destinataire', label: 'Destinataire (entreprise, adresse, ville, pays, n° TVA/identification fiscale, contact, téléphone)', type: 'textarea', required: true },
      { key: 'marchandises', label: 'Marchandises (description, quantité, prix unitaire, montant total — ligne par ligne, avec devise)', type: 'textarea', required: true },
      { key: 'incoterm', label: 'Incoterm (ex. FOB, CIF, DAP…)', type: 'text', required: true },
      { key: 'mode_paiement', label: 'Mode de paiement (ex. lettre de crédit, virement bancaire…)', type: 'text', required: true },
      { key: 'devise', label: 'Devise de la transaction (ex. XOF, USD, EUR…)', type: 'text', required: true },
      { key: 'conditions_paiement', label: 'Conditions de paiement (ex. paiement anticipé, à la livraison, 30 jours…)', type: 'text', required: true },
      { key: 'instructions_livraison', label: 'Instructions de livraison (mode de transport, port/lieu de déchargement…)', type: 'textarea', required: false },
    ]),
    body: `<div class="contrat"><h1>FACTURE COMMERCIALE</h1><p><strong>Numéro de facture :</strong> {{numero_facture}}<br/><strong>Date de facturation :</strong> {{date_jour}}</p><h2>1. Informations sur l'Expéditeur</h2><p>{{expediteur}}</p><h2>2. Informations sur le Destinataire</h2><p>{{destinataire}}</p><h2>3. Description des marchandises</h2><p>{{marchandises}}</p><h2>4. Conditions de vente</h2><p><strong>Incoterm :</strong> {{incoterm}}<br/><strong>Mode de paiement :</strong> {{mode_paiement}}<br/><strong>Devise de la transaction :</strong> {{devise}}<br/><strong>Conditions de paiement :</strong> {{conditions_paiement}}</p><h2>5. Instructions de livraison</h2><p>{{instructions_livraison}}</p><h2>6. Déclarations et signature</h2><p>Je déclare par la présente que les informations fournies dans cette facture sont exactes et conformes à la transaction commerciale en question.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>Signature de l'Expéditeur</p></div>`,
    popularity: 58,
    countriesJson: JSON.stringify({
      OHADA: { note: 'CEDEAO/CEMAC : la facture commerciale est exigée à l’appui de la déclaration en douane (valeur transactionnelle, art. VII GATT) ; mentions fiscales nationales obligatoires (n° contribuable, RCCM).' },
      FR: { note: 'Incoterms 2020 de la CCI (publication n° 723) : l’incoterm mentionné sur la facture détermine le transfert des risques et la répartition des frais entre vendeur et acheteur.' },
    }),
  },
  {
    code: 'trans_facture_proforma', name: 'Facture Pro Forma', category: 'transport_logistique', price: 1500, priceMax: 3500,
    description: 'Facture pro forma préalable à la transaction : devis formalisé pour l’ouverture de lettre de crédit, la demande de licence d’importation ou la domiciliation bancaire — sans valeur comptable.',
    fieldsJson: F([
      { key: 'numero_proforma', label: 'Numéro de facture pro forma', type: 'text', required: true },
      { key: 'expediteur', label: 'Expéditeur (entreprise, adresse, ville, pays, n° TVA/identification fiscale, contact, téléphone)', type: 'textarea', required: true },
      { key: 'destinataire', label: 'Destinataire (entreprise, adresse, ville, pays, n° TVA/identification fiscale, contact, téléphone)', type: 'textarea', required: true },
      { key: 'marchandises', label: 'Marchandises (description, quantité, prix unitaire, montant total — ligne par ligne, avec devise)', type: 'textarea', required: true },
      { key: 'incoterm', label: 'Incoterm (ex. FOB, CIF, DAP…)', type: 'text', required: true },
      { key: 'mode_paiement', label: 'Mode de paiement envisagé (ex. lettre de crédit, virement…)', type: 'text', required: true },
      { key: 'devise', label: 'Devise de la transaction', type: 'text', required: true },
      { key: 'conditions_paiement', label: 'Conditions de paiement', type: 'text', required: true },
      { key: 'instructions_livraison', label: 'Instructions de livraison prévues (mode de transport, port/lieu de déchargement…)', type: 'textarea', required: false },
    ]),
    body: `<div class="contrat"><h1>FACTURE PRO FORMA</h1><p><strong>Numéro de facture pro forma :</strong> {{numero_proforma}}<br/><strong>Date d'émission :</strong> {{date_jour}}</p><h2>1. Informations sur l'Expéditeur</h2><p>{{expediteur}}</p><h2>2. Informations sur le Destinataire</h2><p>{{destinataire}}</p><h2>3. Description des marchandises</h2><p>{{marchandises}}</p><h2>4. Conditions de vente</h2><p><strong>Incoterm :</strong> {{incoterm}}<br/><strong>Mode de paiement :</strong> {{mode_paiement}}<br/><strong>Devise de la transaction :</strong> {{devise}}<br/><strong>Conditions de paiement :</strong> {{conditions_paiement}}</p><h2>5. Instructions de livraison</h2><p>{{instructions_livraison}}</p><h2>6. Déclarations et signature</h2><p>Je déclare par la présente que les informations fournies dans cette facture pro forma sont exactes et servent uniquement à des fins de référence. Le présent document ne constitue pas une facture définitive et n'a pas de valeur comptable.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>Signature de l'Expéditeur</p></div>`,
    popularity: 46,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Afrique de l’Ouest/Centrale : la facture pro forma est exigée pour la domiciliation bancaire des importations (réglementation des changes UEMOA/BEAC) et les demandes d’intention d’importation (FDI, DPI).' },
      FR: { note: 'Document précontractuel sans valeur comptable : sert de base à l’ouverture d’un crédit documentaire (RUU 600 CCI) ou à une demande de licence d’importation.' },
    }),
  },
  {
    code: 'trans_certificat_origine', name: 'Certificat d’Origine', category: 'transport_logistique', price: 1500, priceMax: 3500,
    description: 'Certificat d’origine des marchandises exportées : produit, expéditeur, fabricant, pays d’origine et déclaration sur l’honneur — indispensable pour bénéficier des préférences tarifaires.',
    fieldsJson: F([
      { key: 'numero_certificat', label: 'Numéro de certificat', type: 'text', required: true },
      { key: 'produit', label: 'Produit (description des marchandises, n° de série ou référence, quantité, poids net kg, prix unitaire et devise)', type: 'textarea', required: true },
      { key: 'expediteur', label: 'Expéditeur (entreprise, adresse, ville, pays, n° TVA/identification fiscale, contact, téléphone)', type: 'textarea', required: true },
      { key: 'fabricant', label: 'Fabricant (entreprise, adresse, ville, pays, n° TVA/identification fiscale, contact, téléphone)', type: 'textarea', required: true },
      { key: 'pays_origine', label: 'Pays d’origine des marchandises', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CERTIFICAT D'ORIGINE</h1><p><strong>Numéro de certificat :</strong> {{numero_certificat}}<br/><strong>Date de certification :</strong> {{date_jour}}</p><h2>1. Informations sur le produit</h2><p>{{produit}}</p><h2>2. Informations sur l'Expéditeur</h2><p>{{expediteur}}</p><h2>3. Informations sur le Fabricant</h2><p>{{fabricant}}</p><h2>4. Pays d'origine</h2><p>Le produit mentionné ci-dessus est originaire de : <strong>{{pays_origine}}</strong></p><h2>5. Déclaration de l'Expéditeur/Fabricant</h2><p>Nous, soussignés, déclarons par la présente, en vertu des lois et réglementations applicables et en toute bonne foi, que les marchandises décrites ci-dessus sont entièrement produites et fabriquées dans le pays mentionné ci-dessus.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>Signature de l'Expéditeur/Fabricant</p></div>`,
    popularity: 50,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Certificat d’origine CEDEAO (schéma de libéralisation des échanges — SLE) ou CEMAC : exonération des droits de douane pour les produits originaires agréés ; visa de la chambre de commerce ou de l’autorité désignée.' },
      FR: { note: 'UE : certificat d’origine non préférentiel délivré par les chambres de commerce ; origine préférentielle attestée par EUR.1, déclaration d’origine ou système REX selon l’accord applicable.' },
    }),
  },
  {
    code: 'trans_liste_colisage', name: 'Liste de Colisage (Packing List)', category: 'transport_logistique', price: 1500, priceMax: 3500,
    description: 'Packing list détaillant le contenu de l’expédition : articles, quantités, poids et valeurs par colis, mode de transport et instructions spéciales — document de contrôle exigé en douane.',
    fieldsJson: F([
      { key: 'numero_liste', label: 'Numéro de liste de colisage', type: 'text', required: true },
      { key: 'expediteur', label: 'Expéditeur (nom, adresse, ville, code postal, pays, téléphone)', type: 'textarea', required: true },
      { key: 'destinataire', label: 'Destinataire (nom, adresse, ville, code postal, pays, téléphone)', type: 'textarea', required: true },
      { key: 'date_expedition', label: 'Date d’expédition', type: 'date', required: true },
      { key: 'mode_transport', label: 'Mode de transport (routier, maritime, aérien, ferroviaire…)', type: 'text', required: true },
      { key: 'reference_transport', label: 'Numéro de référence du transport (connaissement, LTA, CMR…)', type: 'text', required: false },
      { key: 'articles', label: 'Articles (description, quantité, poids kg, valeur et devise — ligne par ligne, par colis)', type: 'textarea', required: true },
      { key: 'instructions', label: 'Instructions spéciales (manutention, marquage, empilage…)', type: 'textarea', required: false },
    ]),
    body: `<div class="contrat"><h1>LISTE DE COLISAGE (PACKING LIST)</h1><p><strong>Numéro :</strong> {{numero_liste}}<br/><strong>Date d'émission :</strong> {{date_jour}}</p><h2>1. Informations sur l'Expéditeur</h2><p>{{expediteur}}</p><h2>2. Informations sur le Destinataire</h2><p>{{destinataire}}</p><h2>3. Détails de l'expédition</h2><p><strong>Date d'expédition :</strong> {{date_expedition}}<br/><strong>Mode de transport :</strong> {{mode_transport}}<br/><strong>Numéro de référence du transport :</strong> {{reference_transport}}</p><h2>4. Description des articles</h2><p>{{articles}}</p><h2>5. Instructions spéciales</h2><p>{{instructions}}</p><h2>6. Déclarations et signature</h2><p>Je déclare par la présente que les informations fournies dans cette liste de colisage sont exactes et complètes.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>Signature de l'Expéditeur</p></div>`,
    popularity: 44,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Document exigé à l’appui de la déclaration en douane CEDEAO/CEMAC pour la vérification physique des marchandises ; doit concorder avec la facture commerciale et le titre de transport.' },
      FR: { note: 'Usage international : la packing list facilite les contrôles douaniers et les réclamations d’assurance ; recommandée colis par colis avec poids brut/net et dimensions.' },
    }),
  },
  {
    code: 'trans_declaration_douane', name: 'Formulaire de Déclaration en Douane', category: 'transport_logistique', price: 2000, priceMax: 4500,
    description: 'Déclaration en douane import/export : exportateur, importateur, marchandises, valeur en douane, taxes et documents joints, avec engagement sur l’exactitude des informations.',
    fieldsJson: F([
      { key: 'numero_declaration', label: 'Numéro de déclaration douanière (si attribué)', type: 'text', required: false },
      { key: 'exportateur', label: 'Expéditeur/Exportateur (entreprise, adresse, ville, pays, n° d’identification fiscale, contact, téléphone)', type: 'textarea', required: true },
      { key: 'importateur', label: 'Destinataire/Importateur (entreprise, adresse, ville, pays, n° d’identification fiscale, contact, téléphone)', type: 'textarea', required: true },
      { key: 'marchandises', label: 'Marchandises (description, quantité, poids kg, valeur et devise — ligne par ligne)', type: 'textarea', required: true },
      { key: 'valeur_marchandises', label: 'Montant total de la valeur des marchandises (avec devise)', type: 'text', required: true },
      { key: 'frais_expedition', label: 'Frais d’expédition (avec devise)', type: 'text', required: true },
      { key: 'autres_frais', label: 'Autres frais (assurance, manutention… avec devise)', type: 'text', required: false },
      { key: 'valeur_douane', label: 'Valeur en douane totale (avec devise)', type: 'text', required: true },
      { key: 'documents_joints', label: 'Documents joints (facture commerciale, liste de colisage, certificat d’origine, autres…)', type: 'textarea', required: true },
    ]),
    body: `<div class="contrat"><h1>FORMULAIRE DE DÉCLARATION EN DOUANE</h1><p><strong>Numéro de déclaration douanière :</strong> {{numero_declaration}}<br/><strong>Date de déclaration :</strong> {{date_jour}}</p><h2>1. Expéditeur / Exportateur</h2><p>{{exportateur}}</p><h2>2. Destinataire / Importateur</h2><p>{{importateur}}</p><h2>3. Description des marchandises</h2><p>{{marchandises}}</p><h2>4. Valeur en douane et taxes</h2><p><strong>Montant total de la valeur des marchandises :</strong> {{valeur_marchandises}}<br/><strong>Frais d'expédition :</strong> {{frais_expedition}}<br/><strong>Autres frais :</strong> {{autres_frais}}<br/><strong>Valeur en douane totale :</strong> {{valeur_douane}}</p><h2>5. Documents joints à la déclaration</h2><p>{{documents_joints}}</p><h2>6. Déclarations et signature</h2><p>Je déclare par la présente que les informations fournies dans cette déclaration sont complètes et exactes. Je prends connaissance que toute fausse déclaration pourrait entraîner des sanctions conformément à la législation douanière en vigueur.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>Signature de l'Expéditeur/Exportateur</p></div>`,
    popularity: 52,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Code des douanes CEDEAO/CEMAC : déclaration en détail obligatoire (SYDONIA/GUCE) déposée par le déclarant ou son commissionnaire en douane agréé ; valeur transactionnelle selon l’accord OMC sur l’évaluation en douane.' },
      FR: { note: 'UE : déclaration via le système DELTA/Guichet unique ; fausse déclaration passible d’amendes et de confiscation (Code des douanes de l’Union — CDU).' },
    }),
  },
  {
    code: 'trans_mandat_representation_douane', name: 'Accord de Représentation en Douane (Mandat de Transitaire)', category: 'transport_logistique', price: 3000, priceMax: 4500,
    description: 'Mandat donné à un représentant en douane / transitaire : gestion des procédures de dédouanement, responsabilités des parties, honoraires, durée et loi applicable.',
    fieldsJson: F([
      { key: 'mandant', label: 'Mandant — importateur/exportateur (entreprise, adresse, téléphone)', type: 'textarea', required: true },
      { key: 'representant', label: 'Représentant en douane / transitaire (entreprise, adresse, téléphone, n° d’agrément)', type: 'textarea', required: true },
      { key: 'honoraires', label: 'Honoraires et modalités (montant ou renvoi à un accord financier distinct)', type: 'textarea', required: true },
      { key: 'preavis', label: 'Préavis de résiliation (nombre de jours)', type: 'text', required: true },
      { key: 'loi_juridiction', label: 'Loi applicable et juridiction (pays et tribunaux compétents)', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>ACCORD DE REPRÉSENTATION EN DOUANE</h1><p>Entre :</p><p><strong>{{mandant}}</strong>, ci-après dénommé « le Mandant », d'une part,</p><p>Et :</p><p><strong>{{representant}}</strong>, ci-après dénommé « le Représentant en douane », d'autre part.</p><p>Il est convenu ce qui suit :</p><h2>Article 1 — Objet de l'accord</h2><p>Le Mandant confie au Représentant en douane la représentation et la gestion des procédures douanières nécessaires pour le dédouanement des marchandises importées/exportées par le Mandant.</p><h2>Article 2 — Responsabilités du Représentant en douane</h2><p>Le Représentant en douane s'engage à :</p><ul><li>Agir au nom et pour le compte du Mandant dans toutes les démarches douanières nécessaires ;</li><li>Préparer et soumettre tous les documents requis pour le dédouanement des marchandises ;</li><li>Assurer la conformité aux réglementations douanières en vigueur ;</li><li>Représenter le Mandant auprès des autorités douanières compétentes ;</li><li>Informer le Mandant de toute exigence ou restriction douanière pertinente.</li></ul><h2>Article 3 — Responsabilités du Mandant</h2><p>Le Mandant s'engage à :</p><ul><li>Fournir au Représentant en douane tous les documents et informations nécessaires pour le dédouanement des marchandises ;</li><li>Payer les frais et honoraires convenus pour les services de représentation en douane ;</li><li>Collaborer avec le Représentant en douane pour résoudre tout problème ou toute irrégularité éventuels dans le processus de dédouanement.</li></ul><h2>Article 4 — Honoraires</h2><p>{{honoraires}}</p><h2>Article 5 — Durée de l'accord</h2><p>Cet accord entre en vigueur à la date de signature et reste en vigueur jusqu'à ce qu'il soit résilié par écrit par l'une ou l'autre des parties, avec un préavis de {{preavis}} jours.</p><h2>Article 6 — Loi applicable et juridiction</h2><p>Cet accord est régi et interprété conformément aux lois en vigueur dans {{loi_juridiction}}.</p><p class="signatures">En foi de quoi, les parties ont signé cet accord le {{date_jour}}<br/><br/>Pour le Mandant — Pour le Représentant en douane</p></div>`,
    popularity: 40,
    countriesJson: JSON.stringify({
      OHADA: { note: 'CEDEAO/CEMAC : seuls les commissionnaires en douane agréés peuvent déclarer pour autrui ; l’agrément est délivré par l’administration des douanes (ex. décision du Directeur général des douanes).' },
      FR: { note: 'UE : représentation directe ou indirecte au sens de l’art. 18 du Code des douanes de l’Union ; le représentant en douane enregistré (RDE) doit justifier de son habilitation.' },
    }),
  },
  {
    code: 'trans_entrepot_sous_douane', name: 'Accord de Gestion d’Entrepôt Sous Douane', category: 'transport_logistique', price: 3000, priceMax: 4500,
    description: 'Contrat de gestion d’un entrepôt sous douane : réception et entreposage des marchandises, tenue des registres douaniers, surveillance, tarifs, confidentialité et durée.',
    fieldsJson: F([
      { key: 'proprietaire', label: 'Propriétaire de l’entrepôt (entreprise, adresse, n° d’agrément d’entrepôt sous douane)', type: 'textarea', required: true },
      { key: 'gestionnaire', label: 'Gestionnaire de l’entrepôt (entreprise, adresse, références)', type: 'textarea', required: true },
      { key: 'localisation_entrepot', label: 'Localisation et description de l’entrepôt sous douane', type: 'textarea', required: true },
      { key: 'tarifs', label: 'Tarifs des services et modalités de paiement', type: 'textarea', required: true },
      { key: 'preavis', label: 'Préavis de résiliation (nombre de jours)', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>ACCORD DE GESTION D'ENTREPÔT SOUS DOUANE</h1><p>Entre :</p><p><strong>{{proprietaire}}</strong>, ci-après dénommé « le Propriétaire de l'Entrepôt », d'une part,</p><p>Et :</p><p><strong>{{gestionnaire}}</strong>, ci-après dénommé « le Gestionnaire de l'Entrepôt », d'autre part.</p><h2>Préambule</h2><p>Le Propriétaire de l'Entrepôt détient un entrepôt sous douane pour le stockage de marchandises importées ou destinées à l'exportation. Le Gestionnaire de l'Entrepôt possède l'expertise et les ressources nécessaires pour gérer efficacement l'entrepôt et assurer sa conformité aux réglementations douanières.</p><p><strong>Entrepôt concerné :</strong><br/>{{localisation_entrepot}}</p><h2>Article 1 — Objet</h2><p>Le présent accord a pour objet de définir les termes et conditions de la gestion de l'entrepôt sous douane par le Gestionnaire de l'Entrepôt pour le compte du Propriétaire de l'Entrepôt.</p><h2>Article 2 — Services fournis</h2><p>Le Gestionnaire de l'Entrepôt s'engage à fournir les services suivants :</p><ul><li>Réception, entreposage et gestion des marchandises dans l'entrepôt sous douane ;</li><li>Tenue des registres douaniers et gestion des documents de déclaration en douane ;</li><li>Surveillance et sécurité de l'entrepôt conformément aux normes douanières ;</li><li>Préparation des marchandises pour l'exportation ou la livraison.</li></ul><h2>Article 3 — Responsabilités du Propriétaire de l'Entrepôt</h2><p>Le Propriétaire de l'Entrepôt s'engage à fournir au Gestionnaire de l'Entrepôt toutes les informations et ressources nécessaires pour l'exécution des services convenus.</p><h2>Article 4 — Tarifs et paiement</h2><p>{{tarifs}}</p><h2>Article 5 — Confidentialité</h2><p>Les Parties s'engagent à maintenir la confidentialité des informations commerciales et des données sensibles échangées dans le cadre de ce contrat.</p><h2>Article 6 — Durée du contrat</h2><p>Ce contrat entre en vigueur à la date de sa signature et reste en vigueur jusqu'à résiliation par l'une ou l'autre partie avec un préavis écrit de {{preavis}} jours.</p><h2>Article 7 — Déclarations et signature</h2><p>Les Parties reconnaissent avoir lu, compris et accepté les termes et conditions de ce contrat.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>Signature du Propriétaire de l'Entrepôt — Signature du Gestionnaire de l'Entrepôt</p></div>`,
    popularity: 26,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Régime de l’entrepôt de douane (public, privé ou spécial) prévu par les codes des douanes CEDEAO/CEMAC : suspension des droits et taxes pendant le stockage, sous caution et surveillance douanière.' },
      FR: { note: 'UE : régime particulier de l’entrepôt douanier (art. 240 s. CDU) — autorisation préalable, garantie et comptabilité matières exigées.' },
    }),
  },
  {
    code: 'trans_assurance_cargo', name: 'Police d’Assurance Cargo', category: 'transport_logistique', price: 2500, priceMax: 4500,
    description: 'Police d’assurance des marchandises transportées : type de couverture, marchandises assurées, montant, franchise, prime, conditions spécifiques et exclusions.',
    fieldsJson: F([
      { key: 'assureur', label: 'Assureur (compagnie d’assurance, adresse, contact)', type: 'textarea', required: true },
      { key: 'assure', label: 'Assuré (entreprise ou personne, adresse, contact)', type: 'textarea', required: true },
      { key: 'numero_police', label: 'Numéro de police', type: 'text', required: true },
      { key: 'periode_couverture', label: 'Période de couverture (date de début — date de fin)', type: 'text', required: true },
      { key: 'type_couverture', label: 'Type de couverture', type: 'select', required: true, options: ['Assurance tous risques', 'Assurance au voyage', 'Assurance FAP sauf (franc d’avaries particulières)', 'Autre (préciser dans les conditions)'] },
      { key: 'marchandises_assurees', label: 'Marchandises assurées (description, trajet couvert)', type: 'textarea', required: true },
      { key: 'montant_assure', label: 'Montant assuré (avec devise)', type: 'text', required: true },
      { key: 'franchise', label: 'Franchise (montant, le cas échéant)', type: 'text', required: false },
      { key: 'prime', label: 'Prime d’assurance (montant avec devise)', type: 'text', required: true },
      { key: 'conditions_specifiques', label: 'Conditions spécifiques ou clauses particulières', type: 'textarea', required: false },
      { key: 'exclusions', label: 'Exclusions de la couverture', type: 'textarea', required: false },
    ]),
    body: `<div class="contrat"><h1>POLICE D'ASSURANCE CARGO</h1><p><strong>Assureur :</strong><br/>{{assureur}}</p><p><strong>Assuré :</strong><br/>{{assure}}</p><p><strong>Numéro de police :</strong> {{numero_police}}<br/><strong>Période de couverture :</strong> {{periode_couverture}}</p><h2>1. Détails de l'assurance</h2><p><strong>Type de couverture :</strong> {{type_couverture}}</p><p><strong>Marchandises assurées :</strong><br/>{{marchandises_assurees}}</p><p><strong>Montant assuré :</strong> {{montant_assure}}<br/><strong>Franchise :</strong> {{franchise}}<br/><strong>Prime d'assurance :</strong> {{prime}}</p><h2>2. Conditions spécifiques</h2><p>{{conditions_specifiques}}</p><h2>3. Exclusions</h2><p>{{exclusions}}</p><h2>4. Conditions générales</h2><ul><li>L'assurance est sujette aux termes et conditions stipulés dans la police d'assurance cargo.</li><li>Toute réclamation doit être signalée à l'assureur dans les délais spécifiés.</li></ul><h2>5. Déclarations et signature</h2><p>En souscrivant à cette police d'assurance cargo, l'assuré reconnaît avoir pris connaissance des termes et conditions de la couverture et accepte de s'y conformer.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>Signature de l'Assuré — Pour l'Assureur</p></div>`,
    popularity: 36,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Code CIMA (Conférence Interafricaine des Marchés d’Assurances) : obligation d’assurance locale des facultés à l’importation dans la plupart des États membres (ex. art. 278 Code CIMA et lois nationales).' },
      FR: { note: 'Assurance facultés régie par le Code des assurances (police française d’assurance maritime sur facultés) ; clauses types Institute Cargo Clauses A/B/C en pratique internationale.' },
    }),
  },
  {
    code: 'trans_transport_express', name: 'Lettre de Transport Express (Messagerie / Courrier Express)', category: 'transport_logistique', price: 2000, priceMax: 4000,
    description: 'Express consignment note pour les envois par messagerie rapide (type DHL, UPS, FedEx) : expéditeur, destinataire, colis, numéro de suivi, documents annexés et responsabilité du transporteur.',
    fieldsJson: F([
      { key: 'numero_lettre', label: 'Numéro de lettre de transport express', type: 'text', required: true },
      { key: 'expediteur', label: 'Expéditeur (entreprise, adresse, ville, pays, n° d’identification fiscale, contact, téléphone)', type: 'textarea', required: true },
      { key: 'destinataire', label: 'Destinataire (entreprise, adresse, ville, pays, n° d’identification fiscale, contact, téléphone)', type: 'textarea', required: true },
      { key: 'marchandises', label: 'Marchandises (description détaillée, nombre de colis, poids brut/net kg, volume m³, valeur déclarée et devise)', type: 'textarea', required: true },
      { key: 'compagnie_express', label: 'Compagnie de transport express (nom, agence)', type: 'text', required: true },
      { key: 'numero_suivi', label: 'Numéro de suivi (tracking)', type: 'text', required: true },
      { key: 'itineraire', label: 'Point de départ et point de destination', type: 'textarea', required: true },
      { key: 'conditions_speciales', label: 'Conditions spéciales ou instructions de transport', type: 'textarea', required: false },
      { key: 'documents_annexes', label: 'Documents annexés (facture commerciale, liste de colisage, certificat d’origine…)', type: 'textarea', required: false },
    ]),
    body: `<div class="contrat"><h1>LETTRE DE TRANSPORT EXPRESS (EXPRESS CONSIGNMENT NOTE)</h1><p><strong>Numéro :</strong> {{numero_lettre}}<br/><strong>Date d'émission :</strong> {{date_jour}}</p><h2>1. Expéditeur</h2><p>{{expediteur}}</p><h2>2. Destinataire</h2><p>{{destinataire}}</p><h2>3. Description des marchandises</h2><p>{{marchandises}}</p><h2>4. Informations sur le transport express</h2><p><strong>Compagnie de transport express :</strong> {{compagnie_express}}<br/><strong>Numéro de suivi :</strong> {{numero_suivi}}</p><p>{{itineraire}}</p><h2>5. Conditions de transport</h2><p>{{conditions_speciales}}</p><h2>6. Documents annexés</h2><p>{{documents_annexes}}</p><h2>7. Assurance et responsabilité</h2><p>Le transporteur express déclare par la présente qu'il prend en charge la responsabilité des marchandises pendant le transport conformément aux termes de son contrat d'assurance de transport.</p><h2>8. Déclarations et signature</h2><p>Le transporteur express déclare par la présente qu'il a reçu les marchandises mentionnées ci-dessus en bon état, sauf indication contraire, pour être transportées conformément aux termes et conditions de cette lettre de transport express.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>Signature du Représentant du Transporteur Express</p></div>`,
    popularity: 38,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Envois express soumis aux procédures douanières simplifiées (dédouanement express) des codes CEDEAO/CEMAC ; seuils de valeur de minimis variables selon les États.' },
      FR: { note: 'Messagerie internationale : conventions applicables selon le mode (Montréal 1999 pour l’aérien, CMR pour la route) et conditions générales du transporteur express.' },
    }),
  },
  {
    code: 'trans_franchise_douaniere', name: 'Contrat de Franchise Douanière', category: 'transport_logistique', price: 3500, priceMax: 4500,
    description: 'Contrat de franchise entre un franchiseur expert en opérations douanières et un franchisé : licence d’utilisation des méthodes et procédures, formation, frais de franchise, confidentialité et résiliation.',
    fieldsJson: F([
      { key: 'franchiseur', label: 'Franchiseur (entreprise, adresse, téléphone)', type: 'textarea', required: true },
      { key: 'franchise', label: 'Franchisé (entreprise, adresse, téléphone)', type: 'textarea', required: true },
      { key: 'duree', label: 'Durée de la franchise (en années)', type: 'text', required: true },
      { key: 'frais_franchise', label: 'Frais de franchise et modalités de paiement', type: 'textarea', required: true },
      { key: 'preavis', label: 'Préavis de résiliation en cas de violation (nombre de jours)', type: 'text', required: true },
      { key: 'loi_juridiction', label: 'Loi applicable et juridiction (pays et tribunaux compétents)', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE FRANCHISE DOUANIÈRE</h1><p>Ce contrat de franchise douanière (le « Contrat ») est conclu le {{date_jour}} entre :</p><p><strong>{{franchiseur}}</strong>, ci-après dénommé « le Franchiseur », d'une part,</p><p>Et :</p><p><strong>{{franchise}}</strong>, ci-après dénommé « le Franchisé », d'autre part,</p><p>ci-après dénommés collectivement les « Parties ».</p><h2>Préambule</h2><p>Le Franchiseur possède une expertise dans le domaine des opérations douanières et propose de fournir une franchise au Franchisé pour l'exploitation de ses méthodes et procédures douanières. Le Franchisé souhaite bénéficier de cette franchise pour développer ses activités dans le domaine des opérations douanières.</p><h2>Article 1 — Objet</h2><p>1.1 Le Franchiseur accorde au Franchisé une licence non exclusive pour utiliser ses méthodes et procédures douanières dans le cadre de ses activités commerciales.</p><h2>Article 2 — Durée de la franchise</h2><p>2.1 La franchise est accordée pour une durée de {{duree}}, à compter de la date d'entrée en vigueur du Contrat, sauf résiliation anticipée conformément aux dispositions du présent Contrat.</p><h2>Article 3 — Obligations du Franchiseur</h2><p>3.1 Le Franchiseur s'engage à fournir au Franchisé toute la formation et l'assistance nécessaires pour utiliser efficacement ses méthodes et procédures douanières.</p><p>3.2 Le Franchiseur s'engage à mettre à jour régulièrement ses méthodes et procédures douanières et à informer le Franchisé de toutes les modifications pertinentes.</p><h2>Article 4 — Obligations du Franchisé</h2><p>4.1 Le Franchisé s'engage à utiliser les méthodes et procédures douanières du Franchiseur conformément aux directives et aux normes établies.</p><p>4.2 Le Franchisé s'engage à payer les frais de franchise convenus au Franchiseur selon les modalités suivantes :</p><p>{{frais_franchise}}</p><h2>Article 5 — Confidentialité</h2><p>5.1 Les Parties conviennent de maintenir la confidentialité de toutes les informations commerciales et techniques échangées dans le cadre de la franchise.</p><h2>Article 6 — Résiliation</h2><p>6.1 En cas de violation substantielle par l'une des Parties de ses obligations aux termes du présent Contrat, l'autre Partie peut résilier le Contrat moyennant un préavis écrit de {{preavis}} jours.</p><h2>Article 7 — Loi applicable et règlement des litiges</h2><p>7.1 Ce Contrat est régi et interprété conformément aux lois en vigueur dans {{loi_juridiction}}.</p><p class="signatures">En foi de quoi, les Parties ont signé le présent Contrat le {{date_jour}}<br/><br/>Pour le Franchiseur — Pour le Franchisé</p></div>`,
    popularity: 20,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Contrat innommé régi par le droit commun des contrats OHADA (AUDCG pour les intermédiaires de commerce) ; l’activité de déclarant en douane reste soumise à agrément administratif personnel.' },
      FR: { note: 'Franchise soumise à l’obligation d’information précontractuelle (loi Doubin, art. L330-3 Code de commerce) ; le savoir-faire douanier doit être secret, substantiel et identifié.' },
    }),
  },
  {
    code: 'trans_commission_transit', name: 'Contrat de Commission de Transit', category: 'transport_logistique', price: 3000, priceMax: 4500,
    description: 'Contrat entre un commissionnaire de transport/transit et son client : formalités douanières, organisation du transport multimodal, obligations réciproques, frais de commission et durée.',
    fieldsJson: F([
      { key: 'commissionnaire', label: 'Commissionnaire de transport/transit (entreprise, adresse, téléphone, e-mail)', type: 'textarea', required: true },
      { key: 'client', label: 'Client (entreprise, adresse, téléphone, e-mail)', type: 'textarea', required: true },
      { key: 'modalites_financieres', label: 'Modalités financières (montant des commissions, échéances de paiement…)', type: 'textarea', required: true },
      { key: 'preavis', label: 'Durée du préavis de résiliation', type: 'text', required: true },
      { key: 'loi_applicable', label: 'Loi applicable (pays ou État compétent)', type: 'text', required: true },
      { key: 'lieu_signature', label: 'Lieu de signature', type: 'text', required: true },
      { key: 'signataire_commissionnaire', label: 'Représentant du Commissionnaire (nom + fonction)', type: 'text', required: true },
      { key: 'signataire_client', label: 'Représentant du Client (nom + fonction)', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE COMMISSION DE TRANSIT</h1><p>Entre :</p><p><strong>{{commissionnaire}}</strong>, ci-après dénommé « le Commissionnaire », d'une part,</p><p>Et :</p><p><strong>{{client}}</strong>, ci-après dénommé « le Client », d'autre part.</p><h2>Objet</h2><p>Le présent contrat a pour objet de définir les modalités et conditions de la prestation de services de transit par le Commissionnaire en faveur du Client.</p><h2>Article 1 — Services de transit</h2><p>Le Commissionnaire s'engage à fournir au Client les services de transit suivants :</p><ul><li>Gestion des formalités douanières ;</li><li>Organisation du transport terrestre, maritime ou aérien selon les besoins ;</li><li>Suivi et coordination des opérations de transit ;</li><li>Autres services connexes nécessaires à l'exécution des opérations de transit.</li></ul><h2>Article 2 — Obligations du Commissionnaire</h2><p>Le Commissionnaire s'engage à :</p><ul><li>Exécuter les opérations de transit conformément aux instructions du Client ;</li><li>Agir avec diligence, professionnalisme et compétence dans l'exercice de ses fonctions ;</li><li>Informer régulièrement le Client de l'avancement des opérations de transit.</li></ul><h2>Article 3 — Obligations du Client</h2><p>Le Client s'engage à :</p><ul><li>Fournir au Commissionnaire toutes les informations et documents nécessaires à l'exécution des opérations de transit ;</li><li>Payer les frais de commission de transit selon les modalités définies dans le présent contrat ;</li><li>Respecter les délais convenus pour la fourniture des informations et documents requis.</li></ul><h2>Article 4 — Modalités financières</h2><p>Les frais de commission de transit seront facturés par le Commissionnaire et payés par le Client selon les modalités suivantes :</p><p>{{modalites_financieres}}</p><h2>Article 5 — Durée du contrat</h2><p>Le présent contrat entre en vigueur à compter de la date de signature par les deux parties et reste en vigueur jusqu'à sa résiliation par l'une ou l'autre partie, moyennant un préavis écrit de {{preavis}}.</p><h2>Article 6 — Loi applicable</h2><p>Le présent contrat est régi et interprété conformément aux lois en vigueur dans {{loi_applicable}}.</p><p class="signatures">Fait en double exemplaire, à {{lieu_signature}}, le {{date_jour}}<br/><br/>Signature du Commissionnaire : {{signataire_commissionnaire}}<br/>Signature du Client : {{signataire_client}}</p></div>`,
    popularity: 34,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Le commissionnaire de transport est un intermédiaire de commerce régi par l’AUDCG OHADA (commission, art. 192 s.) ; l’activité de transit douanier requiert l’agrément de commissionnaire en douane.' },
      FR: { note: 'Commissionnaire de transport : garant de ses substitués (art. L132-4 s. Code de commerce), contrat type commission de transport ; le transitaire simple mandataire ne répond que de ses fautes.' },
    }),
  },
  {
    code: 'trans_manifeste_cargaison', name: 'Manifeste de Cargaison (Cargo Manifest)', category: 'transport_logistique', price: 2000, priceMax: 4000,
    description: 'Manifeste de cargaison du navire, avion ou véhicule : compagnie de transport, moyen de transport, cargaison ligne par ligne, chargeur et destinataire — document remis aux autorités douanières.',
    fieldsJson: F([
      { key: 'numero_manifeste', label: 'Numéro de manifeste', type: 'text', required: true },
      { key: 'compagnie_transport', label: 'Compagnie de transport (nom, adresse, ville, pays, téléphone)', type: 'textarea', required: true },
      { key: 'moyen_transport', label: 'Navire/Avion/Véhicule (nom, n° d’identification, port/aéroport de départ, port/aéroport d’arrivée)', type: 'textarea', required: true },
      { key: 'cargaison', label: 'Cargaison (description, quantité, poids kg, valeur et devise — ligne par ligne)', type: 'textarea', required: true },
      { key: 'chargeur', label: 'Chargeur/Expéditeur (nom, adresse, ville, pays, téléphone)', type: 'textarea', required: true },
      { key: 'destinataire', label: 'Destinataire/Réceptionnaire (nom, adresse, ville, pays, téléphone)', type: 'textarea', required: true },
      { key: 'instructions', label: 'Instructions spéciales (livraison, exigences particulières…)', type: 'textarea', required: false },
      { key: 'agent_responsable', label: 'Agent responsable (nom + qualité)', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>MANIFESTE DE CARGAISON (CARGO MANIFEST)</h1><p><strong>Numéro de manifeste :</strong> {{numero_manifeste}}<br/><strong>Date d'émission :</strong> {{date_jour}}</p><h2>1. Compagnie de transport</h2><p>{{compagnie_transport}}</p><h2>2. Navire / Avion / Véhicule</h2><p>{{moyen_transport}}</p><h2>3. Informations sur la cargaison</h2><p>{{cargaison}}</p><h2>4. Détails du Chargeur / Expéditeur</h2><p>{{chargeur}}</p><h2>5. Détails du Destinataire / Réceptionnaire</h2><p>{{destinataire}}</p><h2>6. Instructions spéciales</h2><p>{{instructions}}</p><h2>7. Déclarations et signature</h2><p>Je déclare par la présente que les informations fournies dans ce manifeste de cargaison sont exactes et complètes.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>Signature de l'Agent Responsable : {{agent_responsable}}</p></div>`,
    popularity: 30,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Codes des douanes CEDEAO/CEMAC : dépôt du manifeste obligatoire avant déchargement (conduite en douane) ; transmission électronique via les guichets uniques portuaires (ex. GUCE, Webb Fontaine).' },
      FR: { note: 'UE : déclaration sommaire d’entrée (ENS) et manifeste exigés par le Code des douanes de l’Union avant l’arrivée du moyen de transport.' },
    }),
  },
  {
    code: 'trans_avis_arrivee', name: 'Avis d’Arrivée (Arrival Notice)', category: 'transport_logistique', price: 1500, priceMax: 3000,
    description: 'Avis d’arrivée adressé au destinataire d’une expédition : références du connaissement, marchandises, mode de transport, date d’arrivée prévue et instructions de réception.',
    fieldsJson: F([
      { key: 'numero_avis', label: 'Numéro de référence de l’avis', type: 'text', required: true },
      { key: 'destinataire', label: 'Destinataire (entreprise, adresse, ville, code postal, pays)', type: 'textarea', required: true },
      { key: 'numero_connaissement', label: 'Numéro de connaissement / titre de transport (le cas échéant)', type: 'text', required: false },
      { key: 'marchandises', label: 'Description des marchandises', type: 'textarea', required: true },
      { key: 'mode_transport', label: 'Mode de transport (maritime, aérien, routier…)', type: 'text', required: true },
      { key: 'reference_voyage', label: 'Numéro de vol / navire / véhicule', type: 'text', required: true },
      { key: 'date_arrivee', label: 'Date d’arrivée prévue', type: 'date', required: true },
      { key: 'instructions', label: 'Instructions spécifiques pour la réception des marchandises', type: 'textarea', required: false },
      { key: 'contact', label: 'Coordonnées du contact (nom, téléphone, e-mail)', type: 'textarea', required: true },
    ]),
    body: `<div class="contrat"><h1>AVIS D'ARRIVÉE (ARRIVAL NOTICE)</h1><p><strong>Numéro de référence :</strong> {{numero_avis}}<br/><strong>Date d'émission :</strong> {{date_jour}}</p><h2>1. Destinataire</h2><p>{{destinataire}}</p><h2>2. Détails de l'expédition</h2><p><strong>Numéro de connaissement :</strong> {{numero_connaissement}}<br/><strong>Description des marchandises :</strong> {{marchandises}}<br/><strong>Mode de transport :</strong> {{mode_transport}}<br/><strong>Numéro de vol/navire/véhicule :</strong> {{reference_voyage}}</p><p><strong>Date d'arrivée prévue :</strong> {{date_arrivee}}</p><h2>3. Instructions spéciales</h2><p>{{instructions}}</p><h2>4. Coordonnées du contact</h2><p>{{contact}}</p><h2>5. Instructions de réception</h2><p>Veuillez confirmer la réception de cet avis et coordonner les arrangements nécessaires pour la réception des marchandises (dédouanement, enlèvement, paiement des frais de destination le cas échéant).</p><h2>6. Signature</h2><p>Je confirme par la présente que les informations fournies dans cet Avis d'Arrivée sont exactes et complètes.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>Signature de l'Expéditeur / du Responsable</p></div>`,
    popularity: 28,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Pratique portuaire CEDEAO/CEMAC : l’avis d’arrivée déclenche les délais de franchise de magasinage et les formalités d’enlèvement (bon à délivrer du consignataire).' },
      FR: { note: 'L’avis d’arrivée émis par l’agent du transporteur invite le destinataire à retirer la marchandise ; les surestaries et frais de stationnement courent après le délai de franchise.' },
    }),
  },

  // ════════════════════════ KIT IBI073 — COMMUNICATION PROFESSIONNELLE (12) ════════════════════════
  {
    code: 'let_confirmation_commande', name: 'Lettre de Confirmation de Commande', category: 'commercial_financier', price: 400, priceMax: 1000,
    description: 'Lettre confirmant la réception et le traitement d’une commande client : numéro et date de commande, produits, quantités, prix, mode de paiement et délais de livraison.',
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise expéditrice (en-tête : nom, adresse, ville, téléphone, e-mail)', type: 'textarea', required: true },
      { key: 'client', label: 'Client (nom, adresse, ville, code postal)', type: 'textarea', required: true },
      { key: 'nom_client', label: 'Nom du client (pour la formule d’appel)', type: 'text', required: true },
      { key: 'numero_commande', label: 'Numéro de commande', type: 'text', required: true },
      { key: 'date_commande', label: 'Date de commande', type: 'date', required: true },
      { key: 'produits', label: 'Produit(s) commandé(s) (liste avec détails, quantités, prix unitaire et total)', type: 'textarea', required: true },
      { key: 'mode_paiement', label: 'Mode de paiement sélectionné par le client', type: 'text', required: true },
      { key: 'delais_livraison', label: 'Délais de livraison prévus ou informations sur le traitement', type: 'textarea', required: false },
      { key: 'contact_service_client', label: 'Contact du service client (e-mail et téléphone)', type: 'text', required: true },
      { key: 'signataire', label: 'Signataire (nom, titre, entreprise)', type: 'textarea', required: true },
    ]),
    body: `<div class="lettre"><p><strong>{{entreprise}}</strong></p><p class="align-right">Le {{date_jour}}</p><p>{{client}}</p><p>Objet : <strong>Confirmation de commande n° {{numero_commande}}</strong></p><p>Cher/Chère {{nom_client}},</p><p>Nous vous remercions pour votre récente commande. Nous sommes ravis de vous confirmer que votre commande a bien été reçue et est en cours de traitement. Veuillez trouver ci-dessous les détails de votre commande :</p><p><strong>Numéro de commande :</strong> {{numero_commande}}<br/><strong>Date de commande :</strong> {{date_commande}}</p><p><strong>Produit(s) commandé(s) :</strong><br/>{{produits}}</p><p><strong>Mode de paiement :</strong> {{mode_paiement}}</p><p>Nous tenons à vous assurer que nous traitons votre commande avec la plus grande attention et que nous mettons tout en œuvre pour expédier vos articles dans les meilleurs délais. Vous recevrez une confirmation d'expédition dès que votre commande sera prête à être expédiée.</p><p>{{delais_livraison}}</p><p>Nous vous remercions de votre confiance et de votre soutien continu. Si vous avez des questions ou des préoccupations concernant votre commande, n'hésitez pas à nous contacter : {{contact_service_client}}.</p><p>Encore une fois, merci de votre commande. Nous sommes impatients de vous fournir des produits et des services de qualité.</p><p class="signatures">Cordialement,<br/><br/>{{signataire}}</p></div>`,
    popularity: 42,
  },
  {
    code: 'let_plainte_pro', name: 'Lettre de Plainte Professionnelle', category: 'commercial_financier', price: 400, priceMax: 1000,
    description: 'Lettre de plainte formelle adressée à une entreprise ou un service : exposé du problème, démarches déjà entreprises, impact subi, solutions proposées et demande de mesures correctives.',
    fieldsJson: F([
      { key: 'expediteur', label: 'Expéditeur (prénom, nom, adresse, ville, téléphone, e-mail)', type: 'textarea', required: true },
      { key: 'destinataire', label: 'Destinataire (nom, titre, entreprise ou service, adresse, ville)', type: 'textarea', required: true },
      { key: 'nom_destinataire', label: 'Nom du destinataire (pour la formule d’appel)', type: 'text', required: true },
      { key: 'objet_plainte', label: 'Description courte du problème (pour l’objet)', type: 'text', required: true },
      { key: 'probleme', label: 'Exposé détaillé du problème ou de l’incident (faits concrets, dates, exemples précis)', type: 'textarea', required: true },
      { key: 'demarches', label: 'Actions déjà entreprises ou tentatives de communication précédentes', type: 'textarea', required: true },
      { key: 'impact', label: 'Impact négatif du problème (sur vous, le travail, l’entreprise…)', type: 'textarea', required: true },
      { key: 'solutions', label: 'Suggestions ou solutions proposées (facultatif)', type: 'textarea', required: false },
    ]),
    body: `<div class="lettre"><p><strong>{{expediteur}}</strong></p><p class="align-right">Le {{date_jour}}</p><p>{{destinataire}}</p><p>Objet : <strong>Plainte concernant {{objet_plainte}}</strong></p><p>Cher/Chère {{nom_destinataire}},</p><p>Je vous écris pour exprimer ma préoccupation concernant {{objet_plainte}}. Malheureusement, malgré {{demarches}}, la situation n'a pas été résolue de manière satisfaisante.</p><p>{{probleme}}</p><p>Ce problème a eu un impact important : {{impact}}. Il est crucial que des mesures correctives soient prises rapidement pour éviter toute récurrence de cette situation à l'avenir.</p><p>{{solutions}}</p><p>Je suis ouvert(e) à discuter de cette question en personne pour trouver une solution constructive qui bénéficiera à toutes les parties concernées. Je suis disponible à votre convenance pour une réunion ou une conversation téléphonique afin de discuter plus en détail de cette plainte.</p><p>Je vous remercie par avance de votre attention à cette question et je suis impatient(e) de recevoir une réponse de votre part.</p><p class="signatures">Veuillez agréer, Cher/Chère {{nom_destinataire}}, l'expression de mes salutations distinguées.<br/><br/>{{expediteur}}</p></div>`,
    popularity: 32,
  },
  {
    code: 'let_remerciement_pro', name: 'Lettre de Remerciement Professionnelle', category: 'commercial_financier', price: 300, priceMax: 800,
    description: 'Lettre de remerciement à un partenaire, collaborateur ou client : motif du remerciement, impact de la contribution et perspectives de collaboration future.',
    fieldsJson: F([
      { key: 'expediteur', label: 'Expéditeur (prénom, nom, poste, entreprise, adresse, ville)', type: 'textarea', required: true },
      { key: 'destinataire', label: 'Destinataire (prénom, nom, titre, entreprise, adresse, ville)', type: 'textarea', required: true },
      { key: 'prenom_destinataire', label: 'Prénom du destinataire (pour la formule d’appel)', type: 'text', required: true },
      { key: 'motif', label: 'Motif du remerciement (ex. soutien lors du projet X, collaboration sur le dossier Y…)', type: 'text', required: true },
      { key: 'projet', label: 'Projet ou activité concerné(e)', type: 'text', required: true },
      { key: 'benefices', label: 'En quoi la contribution du destinataire a été bénéfique', type: 'textarea', required: true },
      { key: 'perspectives', label: 'Projets futurs ou opportunités de collaboration (facultatif)', type: 'textarea', required: false },
    ]),
    body: `<div class="lettre"><p><strong>{{expediteur}}</strong></p><p class="align-right">Le {{date_jour}}</p><p>{{destinataire}}</p><p>Objet : <strong>Remerciements sincères</strong></p><p>Cher/Chère {{prenom_destinataire}},</p><p>Je tiens à prendre un moment pour exprimer ma sincère gratitude pour {{motif}}. Votre contribution a été extrêmement précieuse et a grandement contribué au succès de {{projet}}.</p><p>{{benefices}}</p><p>Votre expertise, votre engagement et votre professionnalisme ont été remarquables et ont fait une différence significative dans notre travail ensemble. Je suis reconnaissant(e) d'avoir eu l'opportunité de travailler avec vous et j'espère que cette collaboration se poursuivra à l'avenir.</p><p>{{perspectives}}</p><p>Je suis convaincu(e) que notre partenariat continuera à être fructueux et bénéfique pour les deux parties. Je suis impatient(e) de travailler à nouveau avec vous dans un proche avenir.</p><p>Encore une fois, merci pour votre soutien et votre engagement. Vos efforts sont grandement appréciés.</p><p class="signatures">Cordialement,<br/><br/>{{expediteur}}</p></div>`,
    popularity: 30,
  },
  {
    code: 'let_retour_conge', name: 'Lettre de Retour de Congé (Reprise de Service)', category: 'rh_emploi', price: 300, priceMax: 800,
    description: 'Lettre informant le supérieur hiérarchique du retour de congé et de la reprise des activités : disponibilité, suivi des projets en cours et engagement pour une transition en douceur.',
    fieldsJson: F([
      { key: 'employe', label: 'Employé (prénom, nom, adresse, ville, téléphone, e-mail)', type: 'textarea', required: true },
      { key: 'superieur', label: 'Supérieur hiérarchique (nom, titre, entreprise, adresse, ville)', type: 'textarea', required: true },
      { key: 'nom_superieur', label: 'Nom du supérieur hiérarchique (pour la formule d’appel)', type: 'text', required: true },
      { key: 'entreprise', label: 'Nom de l’entreprise', type: 'text', required: true },
      { key: 'activites_conge', label: 'Mention brève du congé (ex. passer du temps en famille, me reposer et me ressourcer…)', type: 'text', required: false },
    ]),
    body: `<div class="lettre"><p><strong>{{employe}}</strong></p><p class="align-right">Le {{date_jour}}</p><p>{{superieur}}</p><p>Objet : <strong>Retour de congé — reprise de service</strong></p><p>Cher/Chère {{nom_superieur}},</p><p>Je suis heureux(se) de vous informer que je suis de retour de mon congé et prêt(e) à reprendre mes activités au sein de {{entreprise}}. Mon congé a été bénéfique et j'ai pu {{activites_conge}}.</p><p>Je tiens à vous assurer que je suis pleinement opérationnel(le) et que je suis prêt(e) à reprendre mes responsabilités dès que possible. Je me suis tenu(e) informé(e) des projets en cours pendant mon absence et je suis prêt(e) à collaborer avec mes collègues pour rattraper tout retard et assurer une transition en douceur.</p><p>Je suis reconnaissant(e) pour l'opportunité qui m'a été donnée de prendre ce congé et je suis déterminé(e) à redoubler d'efforts pour contribuer au succès de notre entreprise. Je suis disponible pour discuter de mon retour et pour toute autre question que vous pourriez avoir.</p><p>Je vous remercie de votre compréhension et de votre soutien pendant mon absence et je suis impatient(e) de retrouver l'équipe.</p><p class="signatures">Veuillez agréer, Cher/Chère {{nom_superieur}}, l'expression de mes salutations distinguées.<br/><br/>{{employe}}</p></div>`,
    popularity: 22,
  },
  {
    code: 'let_candidature', name: 'Lettre de Candidature à un Poste', category: 'rh_emploi', price: 300, priceMax: 800,
    description: 'Lettre de candidature en réponse à une offre d’emploi : poste visé, source de l’offre, compétences clés, réalisations et adéquation avec les exigences du poste.',
    fieldsJson: F([
      { key: 'candidat', label: 'Candidat (prénom, nom, adresse, ville, téléphone, e-mail)', type: 'textarea', required: true },
      { key: 'entreprise', label: 'Entreprise (nom, adresse, ville, code postal)', type: 'textarea', required: true },
      { key: 'poste', label: 'Intitulé du poste', type: 'text', required: true },
      { key: 'source_offre', label: 'Source où l’offre d’emploi a été trouvée', type: 'text', required: true },
      { key: 'motivation', label: 'Pourquoi ce poste et cette entreprise vous intéressent (compétences et expérience pertinentes)', type: 'textarea', required: true },
      { key: 'experience', label: 'Expérience (nombre d’années, domaine, compétences clés, réalisations)', type: 'textarea', required: true },
      { key: 'adequation', label: 'Comment vos compétences correspondent aux exigences spécifiques du poste', type: 'textarea', required: true },
      { key: 'attrait_entreprise', label: 'Aspect spécifique de l’entreprise qui vous attire', type: 'text', required: false },
    ]),
    body: `<div class="lettre"><p><strong>{{candidat}}</strong></p><p class="align-right">Le {{date_jour}}</p><p>{{entreprise}}</p><p>Objet : <strong>Candidature pour le poste de {{poste}}</strong></p><p>Madame, Monsieur,</p><p>Je me permets de vous adresser ma candidature pour le poste de {{poste}}, tel que publié dans {{source_offre}}. Après avoir pris connaissance de la description de poste et des exigences du profil recherché, je suis convaincu(e) de pouvoir apporter une contribution significative à votre équipe.</p><p>{{motivation}}</p><p>{{experience}}</p><p>{{adequation}}</p><p>Je suis particulièrement enthousiaste à l'idée de rejoindre votre entreprise en raison de {{attrait_entreprise}}. Je suis convaincu(e) que mon expérience antérieure me permettra de m'intégrer rapidement et de contribuer de manière significative à vos projets.</p><p>Je reste à votre disposition pour toute information complémentaire ou pour convenir d'un entretien afin de discuter plus en détail de ma candidature. Je vous remercie par avance de l'attention que vous porterez à ma candidature.</p><p class="signatures">Veuillez agréer, Madame, Monsieur, l'expression de mes salutations distinguées.<br/><br/>{{candidat}}</p></div>`,
    popularity: 40,
  },
  {
    code: 'let_offre_emploi', name: 'Lettre d’Offre d’Emploi à un Candidat', category: 'rh_emploi', price: 500, priceMax: 1200,
    description: 'Lettre officielle d’offre d’emploi à un candidat sélectionné : poste, salaire, avantages sociaux, date de début, superviseur, conditions préalables et modalités d’acceptation.',
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise (en-tête : nom, adresse, ville, téléphone, e-mail)', type: 'textarea', required: true },
      { key: 'candidat', label: 'Candidat (prénom, nom, adresse, ville, code postal)', type: 'textarea', required: true },
      { key: 'prenom_candidat', label: 'Prénom du candidat (pour la formule d’appel)', type: 'text', required: true },
      { key: 'poste', label: 'Intitulé du poste', type: 'text', required: true },
      { key: 'points_forts', label: 'Raisons de la sélection / compétences remarquées chez le candidat', type: 'textarea', required: true },
      { key: 'salaire', label: 'Salaire proposé (montant et périodicité)', type: 'text', required: true },
      { key: 'avantages', label: 'Avantages sociaux (assurance santé, congés payés, primes…)', type: 'textarea', required: true },
      { key: 'date_debut', label: 'Date de début prévue', type: 'date', required: true },
      { key: 'superviseur', label: 'Nom du superviseur ou du responsable', type: 'text', required: true },
      { key: 'conditions_prealables', label: 'Conditions préalables (vérification des antécédents, visite médicale…)', type: 'textarea', required: false },
      { key: 'date_limite', label: 'Date limite d’acceptation de l’offre', type: 'date', required: true },
      { key: 'signataire', label: 'Signataire (nom, titre, entreprise, téléphone, e-mail)', type: 'textarea', required: true },
    ]),
    body: `<div class="lettre"><p><strong>{{entreprise}}</strong></p><p class="align-right">Le {{date_jour}}</p><p>{{candidat}}</p><p>Objet : <strong>Offre d'emploi pour le poste de {{poste}}</strong></p><p>Cher/Chère {{prenom_candidat}},</p><p>Je suis ravi(e) de vous informer que vous avez été sélectionné(e) pour occuper le poste de {{poste}} au sein de notre entreprise. Après avoir examiné attentivement votre candidature et mené des entretiens, nous sommes convaincus que votre expérience et vos compétences correspondent parfaitement à ce que nous recherchons.</p><p>{{points_forts}}</p><p>Nous sommes impatients de vous accueillir dans notre entreprise et sommes convaincus que vous apporterez une contribution précieuse à notre équipe.</p><p><strong>Conditions d'emploi proposées :</strong></p><p>Nous proposons un salaire de <strong>{{salaire}}</strong> ainsi qu'une gamme d'avantages sociaux, y compris :<br/>{{avantages}}</p><p>Votre date de début prévue est le <strong>{{date_debut}}</strong>, et vous serez placé(e) sous la supervision de {{superviseur}}.</p><p>{{conditions_prealables}}</p><p>Nous sommes convaincus que vous serez un ajout précieux à notre équipe et nous sommes impatients de travailler avec vous. Veuillez confirmer votre acceptation de cette offre en signant et en renvoyant une copie de cette lettre d'ici le <strong>{{date_limite}}</strong>.</p><p>Nous sommes disponibles pour répondre à toutes vos questions et nous sommes heureux de vous aider dans votre processus de prise de décision. Nous avons hâte de vous accueillir dans notre entreprise et de commencer à travailler ensemble.</p><p class="signatures">Cordialement,<br/><br/>{{signataire}}</p></div>`,
    popularity: 34,
  },
  {
    code: 'let_condoleances_pro', name: 'Message de Condoléances Professionnelles', category: 'commercial_financier', price: 300, priceMax: 800,
    description: 'Message ou e-mail de condoléances adressé à un collègue, partenaire ou client suite à un deuil : expression de sympathie, soutien et disponibilité, sur un ton sobre et respectueux.',
    fieldsJson: F([
      { key: 'nom_destinataire', label: 'Nom du destinataire', type: 'text', required: true },
      { key: 'nom_defunt', label: 'Nom du défunt', type: 'text', required: true },
      { key: 'lien', label: 'Relation avec le destinataire (ex. votre père, votre épouse, votre collègue…)', type: 'text', required: true },
      { key: 'souvenirs', label: 'Souvenirs ou mots réconfortants à partager (facultatif)', type: 'textarea', required: false },
      { key: 'expediteur', label: 'Expéditeur (prénom et nom, poste ou relation, entreprise le cas échéant, coordonnées)', type: 'textarea', required: true },
    ]),
    body: `<div class="lettre"><p><strong>Objet : Sincères condoléances</strong></p><p>Cher/Chère {{nom_destinataire}},</p><p>C'est avec une profonde tristesse que j'ai appris le décès de {{nom_defunt}}, {{lien}}. Je tiens à vous exprimer mes plus sincères condoléances, ainsi qu'à votre famille, en cette période difficile.</p><p>Perdre un être cher est une épreuve douloureuse et je tiens à ce que vous sachiez que vous n'êtes pas seul(e). Mes pensées vous accompagnent, ainsi que vos proches, dans cette période de deuil.</p><p>{{souvenirs}}</p><p>Je suis là pour vous soutenir dans la mesure de mes possibilités. N'hésitez pas à me contacter si vous avez besoin de parler ou si vous avez besoin d'aide pour quoi que ce soit.</p><p>Je vous adresse mes plus profondes condoléances et vous assure de tout mon soutien dans cette période difficile.</p><p class="signatures">Avec toute ma sympathie,<br/><br/>{{expediteur}}</p></div>`,
    popularity: 24,
  },
  {
    code: 'let_reponse_demande_info', name: 'E-mail de Réponse à une Demande d’Informations', category: 'commercial_financier', price: 300, priceMax: 800,
    description: 'E-mail professionnel répondant à une demande d’informations d’un prospect ou client : rappel de la demande, réponses point par point et invitation à poursuivre l’échange.',
    fieldsJson: F([
      { key: 'nom_destinataire', label: 'Nom du destinataire', type: 'text', required: true },
      { key: 'sujet_demande', label: 'Sujet de la demande (ex. nos produits, nos services, nos tarifs…)', type: 'text', required: true },
      { key: 'reponses', label: 'Informations demandées et réponses (point par point)', type: 'textarea', required: true },
      { key: 'expediteur', label: 'Expéditeur (prénom et nom, poste, entreprise, coordonnées de contact)', type: 'textarea', required: true },
    ]),
    body: `<div class="lettre"><p><strong>Objet : Réponse à votre demande d'informations</strong></p><p>Cher/Chère {{nom_destinataire}},</p><p>Je vous remercie pour votre récente demande d'informations concernant {{sujet_demande}}.</p><p>Nous vous remercions de l'intérêt que vous nous portez, et nous sommes ravis de pouvoir répondre à vos questions. Voici les informations que vous avez demandées :</p><p>{{reponses}}</p><p>Si vous avez besoin de plus de détails ou si vous avez d'autres questions, n'hésitez pas à nous contacter à nouveau. Nous sommes là pour vous aider et nous nous engageons à vous fournir toutes les informations dont vous avez besoin pour prendre une décision éclairée.</p><p>Nous espérons avoir l'opportunité de travailler avec vous à l'avenir.</p><p class="signatures">Cordialement,<br/><br/>{{expediteur}}</p></div>`,
    popularity: 28,
  },
  {
    code: 'let_prise_contact_pro', name: 'E-mail de Prise de Contact Professionnelle', category: 'commercial_financier', price: 300, priceMax: 800,
    description: 'E-mail d’introduction et de prise de contact avec une entreprise : présentation de votre société, intérêt pour l’activité du destinataire et proposition d’un échange en vue d’une collaboration.',
    fieldsJson: F([
      { key: 'nom_destinataire', label: 'Nom du destinataire', type: 'text', required: true },
      { key: 'votre_poste', label: 'Votre poste', type: 'text', required: true },
      { key: 'votre_entreprise', label: 'Nom de votre entreprise', type: 'text', required: true },
      { key: 'entreprise_cible', label: 'Nom de la société du destinataire', type: 'text', required: true },
      { key: 'secteur', label: 'Secteur d’activité ou domaine spécifique du destinataire', type: 'text', required: true },
      { key: 'aspect_interessant', label: 'Aspect spécifique qui vous a intéressé(e) ou attiré(e)', type: 'text', required: true },
      { key: 'presentation', label: 'Présentation de votre entreprise (produits, services, solutions)', type: 'textarea', required: true },
      { key: 'expediteur', label: 'Expéditeur (prénom et nom, poste, entreprise, coordonnées de contact)', type: 'textarea', required: true },
    ]),
    body: `<div class="lettre"><p><strong>Objet : Introduction et prise de contact</strong></p><p>Cher/Chère {{nom_destinataire}},</p><p>Je me permets de vous contacter en tant que {{votre_poste}} chez {{votre_entreprise}}. J'ai récemment eu connaissance de {{entreprise_cible}} et de ses activités dans {{secteur}}. Je suis impressionné(e) par {{aspect_interessant}}.</p><p>Je souhaiterais saisir cette occasion pour vous présenter brièvement notre entreprise. Chez {{votre_entreprise}}, nous nous spécialisons dans : {{presentation}}. Notre équipe est composée de professionnels expérimentés et nous sommes fiers de fournir à nos clients des solutions de qualité supérieure et un service client exceptionnel.</p><p>Je pense qu'il pourrait être intéressant d'explorer des possibilités de collaboration entre nos deux entreprises, compte tenu de nos domaines d'expertise respectifs. Serait-il possible de planifier un appel ou une réunion pour discuter davantage de la manière dont nous pourrions potentiellement travailler ensemble ?</p><p>Je vous remercie par avance pour votre attention et je reste à votre disposition pour toute question ou pour convenir d'un rendez-vous. Dans l'attente de votre réponse, je vous souhaite une excellente journée.</p><p class="signatures">Cordialement,<br/><br/>{{expediteur}}</p></div>`,
    popularity: 30,
  },
  {
    code: 'let_email_suivi', name: 'E-mail de Suivi après une Discussion', category: 'commercial_financier', price: 300, priceMax: 800,
    description: 'E-mail de suivi après une réunion ou discussion : remerciements, rappel des points abordés, sujets à approfondir et proposition d’un prochain échange.',
    fieldsJson: F([
      { key: 'nom_destinataire', label: 'Nom du destinataire', type: 'text', required: true },
      { key: 'discussion', label: 'Date et sujet de la discussion récente', type: 'text', required: true },
      { key: 'points_cles', label: 'Sujets abordés ou points clés de la discussion', type: 'textarea', required: true },
      { key: 'sujet_a_approfondir', label: 'Sujet spécifique ou action prévue à discuter', type: 'textarea', required: true },
      { key: 'expediteur', label: 'Expéditeur (prénom et nom, poste, entreprise, coordonnées de contact)', type: 'textarea', required: true },
    ]),
    body: `<div class="lettre"><p><strong>Objet : Suivi de notre discussion</strong></p><p>Cher/Chère {{nom_destinataire}},</p><p>J'espère que ce message vous trouve bien.</p><p>Je tenais à vous remercier une fois de plus pour notre récente discussion ({{discussion}}). C'était un plaisir d'échanger avec vous et d'en apprendre davantage sur : {{points_cles}}.</p><p>Suite à notre conversation, j'ai pris le temps de réfléchir aux points que nous avons abordés et j'aimerais revenir sur certains d'entre eux. Plus particulièrement, je voudrais discuter de : {{sujet_a_approfondir}}.</p><p>De plus, je suis disponible pour répondre à toutes vos questions supplémentaires ou pour fournir des informations complémentaires sur notre proposition ou notre offre de services.</p><p>Je vous invite à convenir d'un moment qui vous convient pour poursuivre notre discussion par téléphone ou par visioconférence. N'hésitez pas à me faire savoir vos disponibilités afin que nous puissions planifier notre prochain échange.</p><p>Je vous remercie pour votre temps et votre attention, et je reste dans l'attente de notre prochain contact.</p><p class="signatures">Bien cordialement,<br/><br/>{{expediteur}}</p></div>`,
    popularity: 26,
  },
  {
    code: 'let_email_proposition', name: 'E-mail de Proposition Commerciale', category: 'commercial_financier', price: 400, priceMax: 1000,
    description: 'E-mail de présentation d’une proposition commerciale personnalisée : description de l’offre, avantages pour le client, conditions et modalités, avec invitation à une réunion.',
    fieldsJson: F([
      { key: 'nom_destinataire', label: 'Nom du destinataire', type: 'text', required: true },
      { key: 'objet_proposition', label: 'Nom du produit ou du service proposé', type: 'text', required: true },
      { key: 'sujet', label: 'Sujet de la proposition (ex. offre de services en marketing digital…)', type: 'text', required: true },
      { key: 'entreprise_cible', label: 'Entreprise du destinataire ou son projet', type: 'text', required: true },
      { key: 'description_offre', label: 'Description de l’offre (principaux points ou services inclus)', type: 'textarea', required: true },
      { key: 'avantages', label: 'Avantages pour l’entreprise du destinataire (avantages clés, résultats attendus)', type: 'textarea', required: true },
      { key: 'conditions', label: 'Conditions et modalités (paiement, délais de livraison…)', type: 'textarea', required: true },
      { key: 'expediteur', label: 'Expéditeur (prénom et nom, poste, entreprise, coordonnées de contact)', type: 'textarea', required: true },
    ]),
    body: `<div class="lettre"><p><strong>Objet : Proposition de {{objet_proposition}}</strong></p><p>Cher/Chère {{nom_destinataire}},</p><p>J'espère que ce message vous trouve bien.</p><p>Je me permets de vous contacter au sujet de {{sujet}}.</p><p>Après avoir pris connaissance de vos besoins et de vos objectifs, nous avons élaboré une proposition personnalisée qui répond à vos exigences et qui pourrait grandement bénéficier à {{entreprise_cible}}.</p><p>Notre proposition comprend les éléments suivants :</p><p><strong>Description de l'offre :</strong><br/>{{description_offre}}</p><p><strong>Avantages pour votre entreprise :</strong><br/>{{avantages}}</p><p><strong>Conditions et modalités :</strong><br/>{{conditions}}</p><p>Je serais ravi(e) de discuter plus en détail de notre proposition et de répondre à toutes vos questions. Je propose de fixer un rendez-vous pour une réunion où nous pourrons passer en revue les détails de l'offre et explorer les possibilités de collaboration.</p><p>Merci beaucoup pour votre attention et votre considération. N'hésitez pas à me contacter si vous avez besoin de plus amples informations ou si vous souhaitez organiser une réunion.</p><p class="signatures">Dans l'attente de votre réponse, je vous adresse mes salutations les meilleures.<br/><br/>{{expediteur}}</p></div>`,
    popularity: 32,
  },
  {
    code: 'let_email_annonce', name: 'E-mail d’Annonce Importante', category: 'commercial_financier', price: 300, priceMax: 800,
    description: 'E-mail annonçant une nouvelle importante aux clients ou partenaires : présentation de l’annonce, avantages pour les destinataires et appel à l’action.',
    fieldsJson: F([
      { key: 'nom_destinataire', label: 'Nom du destinataire (ou « clients et partenaires »)', type: 'text', required: true },
      { key: 'sujet_annonce', label: 'Sujet de l’annonce (ex. notre entreprise, nos produits, nos services…)', type: 'text', required: true },
      { key: 'annonce', label: 'Explication de l’annonce (aspects significatifs, avantages pour le destinataire)', type: 'textarea', required: true },
      { key: 'details', label: 'Détails supplémentaires ou informations contextuelles (facultatif)', type: 'textarea', required: false },
      { key: 'benefices', label: 'Avantages ou améliorations que l’annonce apportera aux destinataires', type: 'textarea', required: true },
      { key: 'appel_action', label: 'Appel à l’action (ex. visitez notre site web, contactez-nous pour une démonstration…)', type: 'text', required: false },
      { key: 'expediteur', label: 'Expéditeur (prénom et nom, poste, entreprise, coordonnées de contact)', type: 'textarea', required: true },
    ]),
    body: `<div class="lettre"><p><strong>Objet : Annonce importante — {{sujet_annonce}}</strong></p><p>Cher/Chère {{nom_destinataire}},</p><p>Je suis ravi(e) de partager avec vous une nouvelle importante concernant {{sujet_annonce}}.</p><p>{{annonce}}</p><p>{{details}}</p><p>Nous sommes convaincus que cette nouvelle apportera les bénéfices suivants : {{benefices}}.</p><p>{{appel_action}}</p><p>Nous sommes impatients de partager davantage de détails avec vous dans les prochains jours. En attendant, n'hésitez pas à nous contacter si vous avez des questions ou si vous souhaitez discuter plus en détail de cette annonce.</p><p>Nous vous remercions pour votre attention et votre soutien continus.</p><p class="signatures">Cordialement,<br/><br/>{{expediteur}}</p></div>`,
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

  console.log('✅ Seed Drive 3 — Transit Douane & Import-Export (IBI078) + Communication professionnelle (IBI073) terminé.');
  console.log(`   Templates du script : ${templates.length} (créés : ${created}, mis à jour : ${updated})`);
  console.log('   Répartition par catégorie (ce script) :');
  for (const [cat, n] of Object.entries(byCategory)) console.log(`     - ${cat} : ${n}`);
  console.log(`   ➜ Total de templates en base : ${total}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
