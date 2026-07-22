// Seed Drive — COMMERCE INTERNATIONAL & TRANSPORT/LOGISTIQUE (Agent Drive-3/5).
// 10 modèles convertis depuis le Google Drive IBIG (Kit Transit Douane IBI078 & Kit Banque/Assurance IBI079).
// Script ADDITIF : upsert par code — n'écrase pas les templates existants.
// Exécution : npx tsx prisma/seed-drive-commerce.ts
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
  // ════════════════════════ TRANSPORT & LOGISTIQUE (8) ════════════════════════
  {
    code: 'trans_cmr_international', name: 'Lettre de Transport Routier International (CMR)', category: 'transport_logistique', price: 3000, priceMax: 6000,
    description: 'Lettre de voiture CMR pour le transport routier international de marchandises : expéditeur, destinataire, véhicule, incoterm et déclaration du transporteur.',
    fieldsJson: F([
      { key: 'numero_lettre', label: 'Numéro de la lettre de transport (CMR)', type: 'text', required: true },
      { key: 'expediteur', label: 'Expéditeur (entreprise, adresse, ville, pays, n° fiscal, contact, téléphone)', type: 'textarea', required: true },
      { key: 'destinataire', label: 'Destinataire (entreprise, adresse, ville, pays, n° fiscal, contact, téléphone)', type: 'textarea', required: true },
      { key: 'marchandises', label: 'Marchandises (description détaillée, nombre de colis, poids brut/net kg, volume m³, valeur déclarée et devise)', type: 'textarea', required: true },
      { key: 'itineraire', label: 'Itinéraire (lieu de chargement, lieu de déchargement, point de départ, point de destination)', type: 'textarea', required: true },
      { key: 'vehicule_chauffeur', label: 'Véhicule et chauffeur (immatriculation, nom du chauffeur, n° de permis de conduire)', type: 'textarea', required: true },
      { key: 'incoterm', label: 'Incoterm (ex. FOB, CIF, DAP…)', type: 'text', required: true },
      { key: 'conditions_speciales', label: 'Conditions spéciales ou instructions de transport', type: 'textarea', required: false },
      { key: 'transporteur_signataire', label: 'Représentant du transporteur (nom + qualité)', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>LETTRE DE TRANSPORT ROUTIER INTERNATIONAL (CMR)</h1><p><strong>Numéro de lettre de transport :</strong> {{numero_lettre}}<br/><strong>Date d'émission :</strong> {{date_jour}}</p><h2>1. Expéditeur</h2><p>{{expediteur}}</p><h2>2. Destinataire</h2><p>{{destinataire}}</p><h2>3. Description des marchandises</h2><p>{{marchandises}}</p><h2>4. Transport routier</h2><p>{{itineraire}}</p><p><strong>Véhicule et chauffeur :</strong><br/>{{vehicule_chauffeur}}</p><h2>5. Conditions de transport</h2><p><strong>Incoterm :</strong> {{incoterm}}</p><p><strong>Conditions spéciales ou instructions :</strong><br/>{{conditions_speciales}}</p><h2>6. Déclarations et signature</h2><p>Le transporteur déclare par la présente qu'il a reçu les marchandises mentionnées ci-dessus en bon état, sauf indication contraire, pour être transportées conformément aux termes et conditions de la présente lettre de voiture CMR.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>Signature du représentant du transporteur : {{transporteur_signataire}}</p></div>`,
    popularity: 60,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Acte uniforme OHADA relatif aux contrats de transport de marchandises par route (AUCTMR) — la lettre de voiture fait foi des conditions du contrat et de la réception des marchandises.' },
      FR: { note: 'Convention CMR de Genève du 19 mai 1956 relative au contrat de transport international de marchandises par route — 3 exemplaires originaux signés par l’expéditeur et le transporteur.' },
    }),
  },
  {
    code: 'trans_routier_domestique', name: 'Lettre de Transport Routier Domestique', category: 'transport_logistique', price: 2000, priceMax: 4500,
    description: 'Document de transport routier national : expédition, compagnie de transport, dates de chargement/déchargement, documents annexés et responsabilité du transporteur.',
    fieldsJson: F([
      { key: 'numero_lettre', label: 'Numéro de la lettre de transport routier', type: 'text', required: true },
      { key: 'expediteur', label: 'Expéditeur (entreprise, adresse de chargement, ville, pays, n° fiscal, contact, téléphone)', type: 'textarea', required: true },
      { key: 'destinataire', label: 'Destinataire (entreprise, adresse de livraison, ville, pays, n° fiscal, contact, téléphone)', type: 'textarea', required: true },
      { key: 'marchandises', label: 'Expédition (description des marchandises, nombre de colis, poids brut/net kg, volume m³, valeur déclarée)', type: 'textarea', required: true },
      { key: 'transporteur', label: 'Transport (compagnie de transport, immatriculation du véhicule, point de départ, point de destination)', type: 'textarea', required: true },
      { key: 'date_chargement', label: 'Date de chargement', type: 'date', required: true },
      { key: 'date_dechargement', label: 'Date de déchargement', type: 'date', required: true },
      { key: 'documents_annexes', label: 'Documents annexés (facture commerciale, liste de colisage, certificat d’origine…)', type: 'textarea', required: false },
    ]),
    body: `<div class="contrat"><h1>LETTRE DE TRANSPORT ROUTIER DOMESTIQUE</h1><p><strong>Numéro :</strong> {{numero_lettre}}<br/><strong>Date de transport :</strong> {{date_jour}}</p><h2>1. Expéditeur</h2><p>{{expediteur}}</p><h2>2. Destinataire</h2><p>{{destinataire}}</p><h2>3. Détails de l'expédition</h2><p>{{marchandises}}</p><h2>4. Transport routier</h2><p>{{transporteur}}</p><p><strong>Date de chargement :</strong> {{date_chargement}} — <strong>Date de déchargement :</strong> {{date_dechargement}}</p><h2>5. Documents annexés</h2><p>{{documents_annexes}}</p><h2>6. Assurance et responsabilité</h2><p>Le transporteur routier déclare par la présente qu'il prend en charge la responsabilité des marchandises pendant le transport conformément aux termes de son contrat d'assurance de transport.</p><h2>7. Déclarations et signature</h2><p>En émettant cette lettre de transport routier domestique, l'expéditeur confirme l'exactitude des détails de l'expédition mentionnés ci-dessus.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>Signature de l'Expéditeur</p></div>`,
    popularity: 45,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Transport intérieur régi par l’Acte uniforme OHADA relatif aux contrats de transport de marchandises par route (AUCTMR), applicable même aux trajets nationaux.' },
      FR: { note: 'France : lettre de voiture obligatoire pour le transport routier de marchandises (art. L3222-4 Code des transports, contrats types LOTI).' },
    }),
  },
  {
    code: 'trans_voiture_ferroviaire', name: 'Lettre de voiture ferroviaire (Rail Consignment Note)', category: 'transport_logistique', price: 2500, priceMax: 5000,
    description: 'Lettre de voiture pour le transport ferroviaire de marchandises : expéditeur, transporteur ferroviaire, destinataire, train, gares et conditions.',
    fieldsJson: F([
      { key: 'numero_lettre', label: 'Numéro de la Rail Consignment Note', type: 'text', required: true },
      { key: 'expediteur', label: 'Expéditeur/Chargeur (nom, adresse, ville, pays, téléphone, n° TVA/identification fiscale)', type: 'textarea', required: true },
      { key: 'transporteur', label: 'Transporteur ferroviaire (nom, adresse, ville, pays, téléphone, n° TVA/identification fiscale)', type: 'textarea', required: true },
      { key: 'destinataire', label: 'Destinataire/Réceptionnaire (nom, adresse, ville, pays, téléphone, n° TVA/identification fiscale)', type: 'textarea', required: true },
      { key: 'details_train', label: 'Détails du transport (n° de train, gare de départ, gare d’arrivée, date de départ, date d’arrivée prévue)', type: 'textarea', required: true },
      { key: 'marchandises', label: 'Marchandises (description, quantité, poids kg, valeur déclarée et devise, ligne par ligne)', type: 'textarea', required: true },
      { key: 'conditions_speciales', label: 'Conditions de transport spéciales', type: 'textarea', required: false },
      { key: 'instructions', label: 'Instructions spéciales de livraison', type: 'textarea', required: false },
    ]),
    body: `<div class="contrat"><h1>LETTRE DE VOITURE FERROVIAIRE (RAIL CONSIGNMENT NOTE)</h1><p><strong>Numéro :</strong> {{numero_lettre}}<br/><strong>Date d'émission :</strong> {{date_jour}}</p><h2>1. Expéditeur / Chargeur</h2><p>{{expediteur}}</p><h2>2. Transporteur ferroviaire</h2><p>{{transporteur}}</p><h2>3. Destinataire / Réceptionnaire</h2><p>{{destinataire}}</p><h2>4. Détails du transport</h2><p>{{details_train}}</p><h2>5. Description des marchandises</h2><p>{{marchandises}}</p><h2>6. Conditions de transport</h2><p>{{conditions_speciales}}</p><h2>7. Instructions spéciales</h2><p>{{instructions}}</p><h2>8. Déclarations et signature</h2><p>Je déclare par la présente que les informations fournies dans cette lettre de voiture ferroviaire (Rail Consignment Note) sont exactes et complètes.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>Signature de l'Expéditeur/Chargeur</p></div>`,
    popularity: 28,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Transport ferroviaire régi par les législations nationales et les conventions d’exploitation des réseaux (ex. SITARAIL Abidjan-Ouagadougou) ; la lettre de voiture constate le contrat de transport.' },
      FR: { note: 'Transport international ferroviaire régi par la Convention COTIF et les Règles uniformes CIM — la lettre de voiture CIM accompagne la marchandise.' },
    }),
  },
  {
    code: 'trans_fret_dangereux', name: 'Lettre de Transport pour Fret Dangereux', category: 'transport_logistique', price: 3500, priceMax: 6000,
    description: 'Document de transport de marchandises dangereuses : classe de danger, numéro ONU, conditionnement, étiquetage réglementaire et déclaration de conformité.',
    fieldsJson: F([
      { key: 'numero_document', label: 'Numéro de document', type: 'text', required: true },
      { key: 'expediteur', label: 'Expéditeur (entreprise, adresse, ville, pays, n° fiscal, contact, téléphone)', type: 'textarea', required: true },
      { key: 'destinataire', label: 'Destinataire (entreprise, adresse, ville, pays, n° fiscal, contact, téléphone)', type: 'textarea', required: true },
      { key: 'marchandise_dangereuse', label: 'Marchandise dangereuse (nom du produit, classe de danger, numéro ONU, quantité kg/L, symboles de danger)', type: 'textarea', required: true },
      { key: 'emballage', label: 'Emballage et étiquetage (type d’emballage : fût, bidon, citerne… ; conformité aux normes internationales)', type: 'textarea', required: true },
      { key: 'transport', label: 'Transport (mode : route/aérien/maritime, n° de vol/navire/véhicule, point de départ, point de destination)', type: 'textarea', required: true },
      { key: 'instructions_manipulation', label: 'Instructions particulières de manipulation', type: 'textarea', required: true },
      { key: 'documents_reglementaires', label: 'Documents réglementaires (déclaration du chargeur, certificat d’autorisation de transport…)', type: 'textarea', required: false },
    ]),
    body: `<div class="contrat"><h1>LETTRE DE TRANSPORT POUR FRET DANGEREUX</h1><p><strong>Numéro de document :</strong> {{numero_document}}<br/><strong>Date d'émission :</strong> {{date_jour}}</p><h2>1. Expéditeur</h2><p>{{expediteur}}</p><h2>2. Destinataire</h2><p>{{destinataire}}</p><h2>3. Description des marchandises dangereuses</h2><p>{{marchandise_dangereuse}}</p><p><strong>Instructions particulières de manipulation :</strong><br/>{{instructions_manipulation}}</p><h2>4. Informations sur le transport</h2><p>{{transport}}</p><h2>5. Emballage et étiquetage</h2><p>{{emballage}}</p><h2>6. Documents réglementaires</h2><p>{{documents_reglementaires}}</p><h2>7. Déclarations et signature</h2><p>Je déclare par la présente que les informations fournies dans cette Lettre de Transport pour Fret Dangereux sont exactes et complètes, et que toutes les réglementations et normes applicables ont été respectées pour assurer un transport sûr et conforme.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>Signature de l'Expéditeur</p></div>`,
    popularity: 32,
    countriesJson: JSON.stringify({
      OHADA: { note: 'AUCTMR OHADA : l’expéditeur doit signaler la nature dangereuse de la marchandise et les précautions à prendre (art. 8) ; réglementations nationales sur les matières dangereuses applicables.' },
      FR: { note: 'Accord ADR (transport routier de marchandises dangereuses), Code IMDG (maritime) et instructions techniques OACI/IATA (aérien) — document de transport obligatoire avec n° ONU, classe et groupe d’emballage.' },
    }),
  },
  {
    code: 'trans_aerien_awb', name: 'Lettre de Transport Aérien (Air Waybill — AWB)', category: 'transport_logistique', price: 2500, priceMax: 5500,
    description: 'Air Waybill pour le fret aérien : expéditeur, consignataire, compagnie aérienne, vol, aéroports de départ et d’arrivée, marchandises et instructions de livraison.',
    fieldsJson: F([
      { key: 'numero_awb', label: 'Numéro de Lettre de Transport Aérien (AWB)', type: 'text', required: true },
      { key: 'expediteur', label: 'Expéditeur principal (nom, adresse, ville, pays, téléphone, n° TVA/identification fiscale)', type: 'textarea', required: true },
      { key: 'destinataire', label: 'Destinataire/Consignataire (nom, adresse, ville, pays, téléphone, n° TVA/identification fiscale)', type: 'textarea', required: true },
      { key: 'details_vol', label: 'Détails du transport (compagnie aérienne, n° de vol, aéroport de départ, aéroport d’arrivée)', type: 'textarea', required: true },
      { key: 'date_depart', label: 'Date de départ', type: 'date', required: true },
      { key: 'marchandises', label: 'Marchandises (description, quantité, poids kg, valeur déclarée et devise, ligne par ligne)', type: 'textarea', required: true },
      { key: 'instructions_livraison', label: 'Instructions de livraison à destination', type: 'textarea', required: false },
    ]),
    body: `<div class="contrat"><h1>LETTRE DE TRANSPORT AÉRIEN — AIR WAYBILL (AWB)</h1><p><strong>Numéro AWB :</strong> {{numero_awb}}<br/><strong>Date d'émission :</strong> {{date_jour}}</p><h2>1. Expéditeur principal</h2><p>{{expediteur}}</p><h2>2. Destinataire / Consignataire</h2><p>{{destinataire}}</p><h2>3. Détails du transport</h2><p>{{details_vol}}</p><p><strong>Date de départ :</strong> {{date_depart}}</p><h2>4. Description des marchandises</h2><p>{{marchandises}}</p><h2>5. Instructions de livraison</h2><p>{{instructions_livraison}}</p><h2>6. Déclarations et signature</h2><p>Je déclare par la présente que les informations fournies dans cette lettre de transport aérien sont exactes et complètes.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>Signature de l'Expéditeur</p></div>`,
    popularity: 48,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Fret aérien régi par la Convention de Montréal de 1999 (ratifiée par la plupart des États OHADA) — la lettre de transport aérien fait preuve de la conclusion du contrat et de la réception de la marchandise.' },
      FR: { note: 'Convention de Montréal 1999 et résolutions IATA — l’AWB est non négociable et émis en trois exemplaires originaux.' },
    }),
  },
  {
    code: 'trans_maritime_seawaybill', name: 'Lettre de Transport Maritime (Sea Waybill)', category: 'transport_logistique', price: 2500, priceMax: 5500,
    description: 'Sea Waybill pour le fret maritime : expéditeur, transporteur maritime, destinataire, navire, ports de chargement/déchargement et marchandises.',
    fieldsJson: F([
      { key: 'numero_lettre', label: 'Numéro de Lettre de Transport Maritime (Sea Waybill)', type: 'text', required: true },
      { key: 'expediteur', label: 'Expéditeur/Chargeur (nom, adresse, ville, pays, téléphone)', type: 'textarea', required: true },
      { key: 'transporteur', label: 'Transporteur maritime (nom, adresse, ville, pays, téléphone)', type: 'textarea', required: true },
      { key: 'destinataire', label: 'Destinataire/Réceptionnaire (nom, adresse, ville, pays, téléphone)', type: 'textarea', required: true },
      { key: 'marchandises', label: 'Marchandises (description, quantité, poids kg, valeur déclarée et devise, ligne par ligne)', type: 'textarea', required: true },
      { key: 'navire_voyage', label: 'Conditions de transport (nom du navire, n° du voyage, port de chargement, port de déchargement, dates prévues)', type: 'textarea', required: true },
      { key: 'instructions', label: 'Instructions spéciales de livraison', type: 'textarea', required: false },
    ]),
    body: `<div class="contrat"><h1>LETTRE DE TRANSPORT MARITIME (SEA WAYBILL)</h1><p><strong>Numéro :</strong> {{numero_lettre}}<br/><strong>Date d'émission :</strong> {{date_jour}}</p><h2>1. Expéditeur / Chargeur</h2><p>{{expediteur}}</p><h2>2. Transporteur maritime</h2><p>{{transporteur}}</p><h2>3. Destinataire / Réceptionnaire</h2><p>{{destinataire}}</p><h2>4. Description des marchandises</h2><p>{{marchandises}}</p><h2>5. Conditions de transport</h2><p>{{navire_voyage}}</p><h2>6. Instructions spéciales</h2><p>{{instructions}}</p><h2>7. Déclarations et signature</h2><p>Je déclare par la présente que les informations fournies dans cette lettre de transport maritime (Sea Waybill) sont exactes et complètes.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>Signature de l'Expéditeur/Chargeur</p></div>`,
    popularity: 38,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Transport maritime régi par les codes de la marine marchande nationaux et les Règles de Hambourg de 1978 ratifiées par plusieurs États d’Afrique de l’Ouest.' },
      FR: { note: 'Sea Waybill non négociable : la marchandise est livrée au destinataire nommé sans présentation du document (Règles CMI pour les lettres de transport maritime, Règles de La Haye-Visby).' },
    }),
  },
  {
    code: 'trans_connaissement_maritime', name: 'Connaissement Maritime (Bill of Lading)', category: 'transport_logistique', price: 3000, priceMax: 6000,
    description: 'Connaissement maritime : titre de transport et de propriété des marchandises embarquées — exportateur, importateur, navire, ports, incoterm et déclaration du transporteur.',
    fieldsJson: F([
      { key: 'numero_connaissement', label: 'Numéro de connaissement', type: 'text', required: true },
      { key: 'expediteur', label: 'Expéditeur/Exportateur (entreprise, adresse, ville, pays, n° fiscal, contact, téléphone)', type: 'textarea', required: true },
      { key: 'destinataire', label: 'Destinataire/Importateur (entreprise, adresse, ville, pays, n° fiscal, contact, téléphone)', type: 'textarea', required: true },
      { key: 'marchandises', label: 'Marchandises (description détaillée, nombre de colis, poids brut/net kg, volume m³, valeur déclarée et devise)', type: 'textarea', required: true },
      { key: 'navire_voyage', label: 'Transport maritime (nom du navire, n° du voyage, port d’embarquement, port de débarquement, dates)', type: 'textarea', required: true },
      { key: 'incoterm', label: 'Incoterm (ex. FOB, CIF…)', type: 'text', required: true },
      { key: 'conditions_speciales', label: 'Conditions spéciales ou instructions de transport', type: 'textarea', required: false },
      { key: 'transporteur_signataire', label: 'Représentant du transporteur maritime (nom + qualité)', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONNAISSEMENT MARITIME (BILL OF LADING)</h1><p><strong>Numéro de connaissement :</strong> {{numero_connaissement}}<br/><strong>Date d'émission :</strong> {{date_jour}}</p><h2>1. Expéditeur / Exportateur</h2><p>{{expediteur}}</p><h2>2. Destinataire / Importateur</h2><p>{{destinataire}}</p><h2>3. Description des marchandises</h2><p>{{marchandises}}</p><h2>4. Transport maritime</h2><p>{{navire_voyage}}</p><h2>5. Conditions de transport</h2><p><strong>Incoterm :</strong> {{incoterm}}</p><p><strong>Conditions spéciales ou instructions :</strong><br/>{{conditions_speciales}}</p><h2>6. Déclarations et signature</h2><p>Le transporteur maritime déclare par la présente qu'il a reçu les marchandises mentionnées ci-dessus en bon état, sauf indication contraire, pour être transportées conformément aux termes et conditions du présent connaissement.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>Signature du représentant du transporteur maritime : {{transporteur_signataire}}</p></div>`,
    popularity: 52,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Le connaissement vaut titre représentatif de la marchandise ; régimes des Règles de Hambourg 1978 et codes de la marine marchande (ex. Côte d’Ivoire, Sénégal, Cameroun).' },
      FR: { note: 'Règles de La Haye-Visby (Convention de Bruxelles 1924 modifiée) — le connaissement fait foi de la réception des marchandises et peut être négociable (à ordre) ou nominatif.' },
    }),
  },
  {
    code: 'trans_intermodal', name: 'Lettre de Transport Intermodale', category: 'transport_logistique', price: 2500, priceMax: 5000,
    description: 'Document de transport combinant plusieurs modes (route, rail, mer, air) : transporteur intermodal, références par mode, prise en charge et livraison.',
    fieldsJson: F([
      { key: 'numero_lettre', label: 'Numéro de la lettre de transport intermodale', type: 'text', required: true },
      { key: 'expediteur', label: 'Expéditeur/Chargeur (nom, adresse, ville, pays, téléphone, n° TVA/identification fiscale)', type: 'textarea', required: true },
      { key: 'transporteur', label: 'Transporteur intermodal (nom, adresse, ville, pays, téléphone, n° TVA/identification fiscale)', type: 'textarea', required: true },
      { key: 'destinataire', label: 'Destinataire/Réceptionnaire (nom, adresse, ville, pays, téléphone, n° TVA/identification fiscale)', type: 'textarea', required: true },
      { key: 'modes_transport', label: 'Modes de transport utilisés et numéros de référence pour chaque mode', type: 'textarea', required: true },
      { key: 'prise_en_charge', label: 'Prise en charge (date et lieu) et livraison prévue (date et lieu)', type: 'textarea', required: true },
      { key: 'marchandises', label: 'Marchandises (description, quantité, poids kg, valeur déclarée et devise, ligne par ligne)', type: 'textarea', required: true },
      { key: 'conditions_speciales', label: 'Conditions de transport spéciales', type: 'textarea', required: false },
      { key: 'instructions', label: 'Instructions spéciales de livraison', type: 'textarea', required: false },
    ]),
    body: `<div class="contrat"><h1>LETTRE DE TRANSPORT INTERMODALE</h1><p><strong>Numéro :</strong> {{numero_lettre}}<br/><strong>Date d'émission :</strong> {{date_jour}}</p><h2>1. Expéditeur / Chargeur</h2><p>{{expediteur}}</p><h2>2. Transporteur intermodal</h2><p>{{transporteur}}</p><h2>3. Destinataire / Réceptionnaire</h2><p>{{destinataire}}</p><h2>4. Détails du transport</h2><p><strong>Modes de transport et références :</strong><br/>{{modes_transport}}</p><p><strong>Prise en charge et livraison :</strong><br/>{{prise_en_charge}}</p><h2>5. Description des marchandises</h2><p>{{marchandises}}</p><h2>6. Conditions de transport</h2><p>{{conditions_speciales}}</p><h2>7. Instructions spéciales</h2><p>{{instructions}}</p><h2>8. Déclarations et signature</h2><p>Je déclare par la présente que les informations fournies dans cette lettre de transport intermodale sont exactes et complètes.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>Signature de l'Expéditeur/Chargeur</p></div>`,
    popularity: 24,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Transport multimodal : chaque segment reste soumis à sa convention propre (AUCTMR pour la route, Règles de Hambourg pour la mer…) sauf convention de transport multimodal unique.' },
      FR: { note: 'Règles CNUCED/CCI applicables aux documents de transport multimodal (publication CCI n° 481) — le document combiné couvre l’ensemble du trajet porte-à-porte.' },
    }),
  },

  // ════════════════════════ COMMERCIAL & FINANCIER (2) ════════════════════════
  {
    code: 'com_permis_import_export', name: 'Demande de Permis d’Importation-Exportation', category: 'commercial_financier', price: 2000, priceMax: 4500,
    description: 'Lettre officielle de demande de permis d’importation ou d’exportation adressée à l’autorité compétente : marchandises, motifs, transport et pièces jointes.',
    fieldsJson: F([
      { key: 'demandeur', label: 'Demandeur (votre nom, poste, nom de l’entreprise, adresse du siège, coordonnées)', type: 'textarea', required: true },
      { key: 'autorite', label: 'Autorité compétente en charge des permis (nom, adresse, téléphone, e-mail)', type: 'textarea', required: true },
      { key: 'type_permis', label: 'Type de permis', type: 'select', required: true, options: ['Permis d’importation', 'Permis d’exportation', 'Permis d’importation et d’exportation'] },
      { key: 'marchandises', label: 'Marchandises (nom, description précise, quantité, poids, valeur, n° d’identification le cas échéant)', type: 'textarea', required: true },
      { key: 'pays_origine', label: 'Pays d’origine', type: 'text', required: true },
      { key: 'pays_destination', label: 'Pays de destination', type: 'text', required: true },
      { key: 'motifs', label: 'Motifs de l’importation/exportation (raisons commerciales, besoins de production, contrats, accords internationaux…)', type: 'textarea', required: true },
      { key: 'transport', label: 'Transport prévu (mode terrestre/maritime/aérien, nom du transporteur, itinéraire prévu)', type: 'textarea', required: true },
      { key: 'documents_joints', label: 'Documents joints (factures commerciales, certificats d’origine, documents d’assurance…)', type: 'textarea', required: false },
    ]),
    body: `<div class="lettre"><p class="align-right">Le {{date_jour}}</p><p><strong>{{demandeur}}</strong></p><p>À l'attention de :<br/>{{autorite}}</p><p>Objet : <strong>Demande de {{type_permis}}</strong></p><p>Monsieur/Madame,</p><p>Je soussigné(e), agissant en tant que représentant(e) légal(e) de l'entreprise désignée ci-dessus, souhaite solliciter auprès de votre autorité l'obtention d'un permis d'importation/exportation pour les marchandises suivantes :</p><p><strong>Description détaillée des marchandises :</strong><br/>{{marchandises}}</p><p><strong>Pays d'origine :</strong> {{pays_origine}}<br/><strong>Pays de destination :</strong> {{pays_destination}}</p><p><strong>Motifs de l'importation/exportation :</strong><br/>{{motifs}}</p><p><strong>Informations sur le transport :</strong><br/>{{transport}}</p><p><strong>Documents joints à la demande :</strong><br/>{{documents_joints}}</p><p>Je m'engage à respecter toutes les réglementations et exigences en vigueur concernant l'importation/exportation de ces marchandises. Je suis également prêt(e) à fournir tous les documents supplémentaires requis par votre autorité pour faciliter le processus d'obtention du permis.</p><p>Je vous prie de bien vouloir examiner ma demande avec attention et je reste à votre disposition pour toute information complémentaire.</p><p>Je vous remercie pour votre diligence.</p><p class="signatures">Cordialement,<br/><br/>{{demandeur}}</p></div>`,
    popularity: 42,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Régimes du commerce extérieur nationaux : code des douanes CEDEAO/CEMAC, licences et déclarations préalables d’importation (ex. FDI en Côte d’Ivoire, DPI au Cameroun).' },
      FR: { note: 'France/UE : licences d’importation-exportation gérées via le guichet unique douanier ; marchandises sensibles soumises à autorisation (biens à double usage, produits agricoles).' },
      MA: { note: 'Maroc : titres d’importation et engagements de change auprès de l’Office des Changes et du Ministère du Commerce extérieur (PortNet).' },
    }),
  },
  {
    code: 'com_lettre_credit', name: 'Contrat d’Émission de Lettre de Crédit', category: 'commercial_financier', price: 3500, priceMax: 6000,
    description: 'Contrat entre une banque émettrice et un bénéficiaire pour l’émission d’une lettre de crédit documentaire : engagement de paiement, conditions, frais et loi applicable.',
    fieldsJson: F([
      { key: 'banque_emettrice', label: 'Banque émettrice (nom, n° d’enregistrement, adresse du siège, représentant légal et titre)', type: 'textarea', required: true },
      { key: 'beneficiaire', label: 'Bénéficiaire (nom, statut personne physique/morale, nationalité, adresse ou siège social)', type: 'textarea', required: true },
      { key: 'montant', label: 'Montant garanti par la lettre de crédit (avec devise)', type: 'text', required: true },
      { key: 'duree_validite', label: 'Durée de validité de la lettre de crédit', type: 'text', required: true },
      { key: 'documents_exiges', label: 'Documents exigés pour le paiement (facture, connaissement, certificat d’origine…)', type: 'textarea', required: true },
      { key: 'lieu_signature', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT D'ÉMISSION DE LETTRE DE CRÉDIT</h1><p>Entre :</p><p><strong>{{banque_emettrice}}</strong>, agissant en vertu des pouvoirs qui lui sont conférés, ci-après dénommée « la Banque Émettrice », d'une part,</p><p>Et :</p><p><strong>{{beneficiaire}}</strong>, ci-après dénommé « le Bénéficiaire », d'autre part.</p><p>Il est convenu ce qui suit :</p><h2>Article 1 — Objet du contrat</h2><p>La Banque Émettrice s'engage à émettre une lettre de crédit en faveur du Bénéficiaire conformément aux termes et conditions énoncés dans le présent contrat.</p><h2>Article 2 — Description de la lettre de crédit</h2><p>La lettre de crédit émise par la Banque Émettrice garantira le paiement d'un montant de <strong>{{montant}}</strong> au Bénéficiaire, sous réserve de la présentation de documents conformes aux conditions stipulées dans la lettre de crédit.</p><h2>Article 3 — Conditions de la lettre de crédit</h2><p>Les conditions de la lettre de crédit, y compris le montant, la durée de validité ({{duree_validite}}), les documents exigés pour le paiement, les modalités de présentation et les frais applicables, seront définies dans un instrument séparé annexé au présent contrat, intitulé « Conditions de la Lettre de Crédit ».</p><p><strong>Documents exigés pour le paiement :</strong><br/>{{documents_exiges}}</p><h2>Article 4 — Engagement de paiement</h2><p>La Banque Émettrice garantit le paiement du montant spécifié dans la lettre de crédit dès réception des documents conformes et conformément aux termes de ladite lettre de crédit.</p><h2>Article 5 — Obligations du Bénéficiaire</h2><p>Le Bénéficiaire s'engage à respecter les conditions énoncées dans la lettre de crédit et à présenter tous les documents requis de manière complète et conforme aux exigences de la lettre de crédit.</p><h2>Article 6 — Frais et commission</h2><p>Les frais et commissions relatifs à l'émission et à la gestion de la lettre de crédit seront supportés par le Bénéficiaire, conformément aux tarifs en vigueur de la Banque Émettrice.</p><h2>Article 7 — Loi applicable</h2><p>Ce contrat est régi et interprété conformément aux lois en vigueur dans l'Espace OHADA.</p><p class="signatures">Fait en deux exemplaires originaux, à {{lieu_signature}}, le {{date_jour}}<br/><br/>Pour la Banque Émettrice — Pour le Bénéficiaire</p></div>`,
    popularity: 34,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Espace OHADA : opérations de crédit documentaire encadrées par la réglementation bancaire UEMOA/CEMAC et les usages internationaux ; loi applicable stipulée au contrat.' },
      FR: { note: 'Pratique internationale : Règles et Usances Uniformes de la CCI relatives aux crédits documentaires (RUU 600, publication CCI n° 600 de 2007).' },
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

  console.log('✅ Seed Drive — Commerce international & Transport/Logistique terminé.');
  console.log(`   Templates du script : ${templates.length} (créés : ${created}, mis à jour : ${updated})`);
  console.log('   Répartition par catégorie (ce script) :');
  for (const [cat, n] of Object.entries(byCategory)) console.log(`     - ${cat} : ${n}`);
  console.log(`   ➜ Total de templates en base : ${total}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
