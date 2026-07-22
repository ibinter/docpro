// Seed Drive4 Marketing — Agent Drive4-6/10 : extraction des MODÈLES des kits
// MARKETING & COMMUNICATION du Drive IBIG :
//   • IBI02 « Documents de Communication » (parentId 1-SpuYOBumzRfUpm3EyppTwiUSArEpW07)
//   • Kit MARKETING & COMMUNICATION (parentId 1BPcaoiZdGe_rAbA3WtjbpUqpfgsS3-aK)
//   • Kit « Stratégie marketing » TOME 1/2/3 (parentId 1altSGf_FeJME5TaEo2-hy4nVnXdbai3g)
//
// 18 modèles DISTINCTS et utiles, absents du catalogue existant. Les livres PDF et
// fichiers .xlsx ont été ignorés ; seuls les MODÈLES .docx exploitables ont été retenus.
//
// FUSIONS documentées (variantes proches consolidées en un template + champ select) :
//   • mkg_communique_presse  ← les 14 « Communiqué de presse_… » (nouveau produit,
//                               fusion, acquisition, ouverture succursale, obtention de
//                               prix/financement, recrutement, promotion, extension
//                               d'usine, nouveau réseau, partenariat, résultats
//                               trimestriels, réalisation importante) → champ {{type}}.
//   • mkg_annonce_commerciale ← les 11 « Annonce de… » (réduction de prix, augmentation,
//                               nouvelle politique de prix, programme d'incitation,
//                               changement d'adresse, de représentant, fusion, reprise de
//                               contrôle, livraison gratuite, catalogue) → champ {{objet}}.
//   • mkg_questionnaire_enquete ← « Étude de la satisfaction de la clientèle » +
//                               « Étude de la fidélité à une marque » +
//                               « Questionnaire_Étude de marché générale » → champ {{type_enquete}}.
//   • mkg_etude_marche       ← « Plan d'étude de marché » + « Étude de marché B2B » +
//                               variantes (degré d'importance, niveau de qualité) → champ {{type_etude}}.
//   • mkg_proposition_commerciale ← « Lettre de proposition de service » + « Lettre de
//                               transmission de proposition/offre » (versions courte/longue).
//   • mkg_evaluation_campagne ← « Fiche d'évaluation de campagne marketing » +
//                               « Fiche d'évaluation de votre marketing ».
//
// MODÈLES COMPLÉTÉS (non présents tels quels dans le Drive — trames standard construites
// et SIGNALÉES ; voir rapport) : mkg_brief_creatif, mkg_cahier_charges_site_web,
// mkg_plan_media, mkg_calendrier_editorial, mkg_charte_graphique, mkg_dossier_presse.
//
// Script ADDITIF : upsert par code — n'écrase aucun template existant. Codes 'mkg_*'.
// Exécution : npx tsx prisma/seed-drive4-marketing.ts
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
  // ════════════════════ PLANIFICATION MARKETING ════════════════════
  {
    code: 'mkg_plan_marketing',
    name: 'Plan marketing',
    category: 'commercial_financier',
    price: 3000, priceMax: 5000,
    description: 'Plan marketing complet : analyse de la situation, marché cible, objectifs SMART, positionnement, mix marketing (produit, prix, distribution, promotion), budget et indicateurs de suivi.',
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise (nom + activité)', type: 'textarea', required: true },
      { key: 'periode', label: 'Période couverte par le plan (ex : année 2026)', type: 'text', required: true },
      { key: 'analyse_situation', label: 'Analyse de la situation (marché, concurrence, forces/faiblesses)', type: 'textarea', required: true },
      { key: 'marche_cible', label: 'Marché cible et segments visés', type: 'textarea', required: true },
      { key: 'objectifs', label: 'Objectifs marketing (SMART : ventes, notoriété, parts de marché…)', type: 'textarea', required: true },
      { key: 'positionnement', label: 'Positionnement et proposition de valeur', type: 'textarea', required: true },
      { key: 'produit', label: 'Stratégie produit / service', type: 'textarea', required: true },
      { key: 'prix', label: 'Stratégie de prix', type: 'textarea', required: true },
      { key: 'distribution', label: 'Stratégie de distribution (canaux)', type: 'textarea', required: true },
      { key: 'promotion', label: 'Stratégie de communication et de promotion', type: 'textarea', required: true },
      { key: 'budget', label: 'Budget marketing et répartition', type: 'textarea', required: true },
      { key: 'indicateurs', label: 'Indicateurs de suivi et de performance (KPI)', type: 'textarea', required: true },
    ]),
    body: `<div class="document"><h1>PLAN MARKETING</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Période :</strong> {{periode}}</p><p><strong>Date d'établissement :</strong> {{date_jour}}</p><h2>1. Résumé exécutif</h2><p>Ce plan marketing présente la stratégie de {{entreprise}} pour la période {{periode}}, ses objectifs prioritaires et les moyens mobilisés pour les atteindre.</p><h2>2. Analyse de la situation</h2><p>{{analyse_situation}}</p><h2>3. Marché cible</h2><p>{{marche_cible}}</p><h2>4. Objectifs marketing</h2><p>{{objectifs}}</p><h2>5. Positionnement</h2><p>{{positionnement}}</p><h2>6. Mix marketing</h2><p>6.1 <strong>Produit / Service :</strong> {{produit}}</p><p>6.2 <strong>Prix :</strong> {{prix}}</p><p>6.3 <strong>Distribution :</strong> {{distribution}}</p><p>6.4 <strong>Communication et promotion :</strong> {{promotion}}</p><h2>7. Budget marketing</h2><p>{{budget}}</p><h2>8. Suivi et évaluation</h2><p>{{indicateurs}}</p><p>Le plan fera l'objet d'un suivi régulier et sera ajusté en fonction des résultats mesurés et de l'évolution du marché.</p></div>`,
    popularity: 48,
  },
  {
    code: 'mkg_etude_marche',
    name: 'Rapport d’étude de marché',
    category: 'commercial_financier',
    price: 3000, priceMax: 5000,
    description: 'Rapport structuré d’étude de marché : objectif, méthodologie, taille et tendances du marché, segment cible, potentiel et opportunités, risques, positionnement concurrentiel et recommandations.',
    fieldsJson: F([
      { key: 'titre', label: 'Titre de l’étude', type: 'text', required: true },
      { key: 'entreprise', label: 'Entreprise commanditaire', type: 'text', required: true },
      { key: 'auteur', label: 'Auteur / cabinet ayant réalisé l’étude', type: 'text', required: true },
      { key: 'type_etude', label: 'Type d’étude', type: 'select', required: true, options: ['Étude de marché générale', 'Étude de marché B2B', 'Étude de faisabilité produit/service', 'Étude de niveau de qualité', 'Étude du degré d’importance des critères', 'Autre'] },
      { key: 'produits_services', label: 'Produits / services concernés', type: 'text', required: true },
      { key: 'objectif', label: 'Objectif de l’étude', type: 'textarea', required: true },
      { key: 'methodologie', label: 'Approche et méthodologie (sources, collecte, analyse)', type: 'textarea', required: true },
      { key: 'taille_tendances', label: 'Taille et tendances du marché', type: 'textarea', required: true },
      { key: 'segment_cible', label: 'Définition du segment cible', type: 'textarea', required: true },
      { key: 'opportunites', label: 'Potentiel et opportunités du marché', type: 'textarea', required: true },
      { key: 'risques', label: 'Risques et défis', type: 'textarea', required: true },
      { key: 'concurrents', label: 'Principaux concurrents et positionnement', type: 'textarea', required: true },
      { key: 'recommandations', label: 'Conclusion et recommandations', type: 'textarea', required: true },
    ]),
    body: `<div class="document"><h1>ÉTUDE DE MARCHÉ : {{titre}}</h1><p><strong>Réalisée pour :</strong> {{entreprise}}</p><p><strong>Par :</strong> {{auteur}}</p><p><strong>Type d’étude :</strong> {{type_etude}}</p><p><strong>Date :</strong> {{date_jour}}</p><h2>1. Introduction et objectif</h2><p>La présente étude porte sur les marchés des {{produits_services}}. {{objectif}}</p><h2>2. Approche et méthodologie</h2><p>{{methodologie}}</p><h2>3. Taille et tendances du marché</h2><p>{{taille_tendances}}</p><h2>4. Segment cible</h2><p>{{segment_cible}}</p><h2>5. Potentiel et opportunités du marché</h2><p>{{opportunites}}</p><h2>6. Risques et défis</h2><p>{{risques}}</p><h2>7. Positionnement concurrentiel</h2><p>{{concurrents}}</p><h2>8. Conclusion et recommandations</h2><p>{{recommandations}}</p></div>`,
    popularity: 40,
  },
  {
    code: 'mkg_questionnaire_enquete',
    name: 'Questionnaire d’enquête (satisfaction / marché)',
    category: 'commercial_financier',
    price: 1000, priceMax: 2500,
    description: 'Trame de questionnaire d’enquête personnalisable selon l’objectif (satisfaction client, fidélité à la marque, étude de marché, notoriété) : introduction, identification du répondant et questions structurées.',
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise réalisant l’enquête', type: 'text', required: true },
      { key: 'type_enquete', label: 'Type d’enquête', type: 'select', required: true, options: ['Satisfaction de la clientèle', 'Fidélité à la marque', 'Étude de marché', 'Notoriété et image', 'Test de nouveau produit/service', 'Autre'] },
      { key: 'objectif', label: 'Objectif de l’enquête', type: 'textarea', required: true },
      { key: 'cible', label: 'Public cible / répondants visés', type: 'text', required: true },
      { key: 'questions', label: 'Liste des questions (une par ligne)', type: 'textarea', required: true },
      { key: 'echelle', label: 'Échelle de réponse utilisée (ex : 1 à 5, oui/non, choix multiple)', type: 'text', required: true },
    ]),
    body: `<div class="document"><h1>QUESTIONNAIRE D’ENQUÊTE</h1><p><strong>Réalisé par :</strong> {{entreprise}}</p><p><strong>Type d’enquête :</strong> {{type_enquete}}</p><p><strong>Date :</strong> {{date_jour}}</p><h2>Introduction</h2><p>{{objectif}} Vos réponses sont précieuses et seront traitées de manière confidentielle. Ce questionnaire s’adresse à : {{cible}}.</p><h2>Identification du répondant</h2><p>Nom : ____________________ &nbsp; Fonction / profil : ____________________</p><p>Date : ____________________ &nbsp; Contact (facultatif) : ____________________</p><h2>Questions</h2><p><em>Échelle de réponse : {{echelle}}</em></p><p>{{questions}}</p><h2>Remarques libres</h2><p>Avez-vous d’autres commentaires ou suggestions à partager ?</p><p>_______________________________________________________________</p><p>Nous vous remercions du temps consacré à cette enquête.</p></div>`,
    popularity: 34,
  },
  {
    code: 'mkg_evaluation_campagne',
    name: 'Fiche d’évaluation de campagne marketing',
    category: 'commercial_financier',
    price: 1000, priceMax: 2500,
    description: 'Fiche de bilan d’une campagne marketing : objectifs visés, cibles, canaux et actions menées, budget engagé, résultats obtenus, retour sur investissement et enseignements.',
    fieldsJson: F([
      { key: 'campagne', label: 'Nom de la campagne', type: 'text', required: true },
      { key: 'responsable', label: 'Responsable de la campagne', type: 'text', required: true },
      { key: 'periode', label: 'Période de la campagne', type: 'text', required: true },
      { key: 'objectifs', label: 'Objectifs visés', type: 'textarea', required: true },
      { key: 'cibles', label: 'Cibles visées', type: 'textarea', required: true },
      { key: 'canaux', label: 'Canaux et actions menées', type: 'textarea', required: true },
      { key: 'budget', label: 'Budget engagé', type: 'text', required: true },
      { key: 'resultats', label: 'Résultats obtenus (chiffres, KPI)', type: 'textarea', required: true },
      { key: 'roi', label: 'Retour sur investissement (ROI)', type: 'text', required: true },
      { key: 'enseignements', label: 'Enseignements et recommandations', type: 'textarea', required: true },
    ]),
    body: `<div class="document"><h1>FICHE D’ÉVALUATION DE CAMPAGNE MARKETING</h1><p><strong>Campagne :</strong> {{campagne}}</p><p><strong>Responsable :</strong> {{responsable}}</p><p><strong>Période :</strong> {{periode}}</p><h2>1. Objectifs visés</h2><p>{{objectifs}}</p><h2>2. Cibles</h2><p>{{cibles}}</p><h2>3. Canaux et actions menées</h2><p>{{canaux}}</p><h2>4. Budget engagé</h2><p>{{budget}}</p><h2>5. Résultats obtenus</h2><p>{{resultats}}</p><h2>6. Retour sur investissement</h2><p>{{roi}}</p><h2>7. Enseignements et recommandations</h2><p>{{enseignements}}</p><p><em>Fiche établie le {{date_jour}}.</em></p></div>`,
    popularity: 30,
  },
  {
    code: 'mkg_fiche_developpement_produit',
    name: 'Fiche de développement de nouveau produit/service',
    category: 'commercial_financier',
    price: 1000, priceMax: 2500,
    description: 'Fiche de cadrage d’un nouveau produit ou service : idée, avantages, marchés cibles, calendrier de lancement, estimation des ventes et des coûts, impact et actions à entreprendre.',
    fieldsJson: F([
      { key: 'responsable', label: 'Personne responsable', type: 'text', required: true },
      { key: 'idee', label: 'Idée du produit / service', type: 'textarea', required: true },
      { key: 'avantages', label: 'Avantages qu’il va offrir', type: 'textarea', required: true },
      { key: 'marches_cibles', label: 'Marchés cibles', type: 'textarea', required: true },
      { key: 'lancement', label: 'Temps / date de lancement prévu', type: 'text', required: true },
      { key: 'estimation_ventes', label: 'Estimation des ventes (en montant ou unités, par trimestre)', type: 'textarea', required: true },
      { key: 'estimation_couts', label: 'Estimation des coûts (développement, publicité, mailing, télémarketing…)', type: 'textarea', required: true },
      { key: 'impact', label: 'Impact sur les autres produits / services', type: 'textarea', required: true },
      { key: 'actions', label: 'Actions à entreprendre', type: 'textarea', required: true },
    ]),
    body: `<div class="document"><h1>FICHE DE DÉVELOPPEMENT DE NOUVEAU PRODUIT / SERVICE</h1><p><strong>Personne responsable :</strong> {{responsable}}</p><p><strong>Date de revue :</strong> {{date_jour}}</p><h2>1. Idée du produit / service</h2><p>{{idee}}</p><h2>2. Avantages offerts</h2><p>{{avantages}}</p><h2>3. Marchés cibles</h2><p>{{marches_cibles}}</p><h2>4. Temps de lancement</h2><p>{{lancement}}</p><h2>5. Estimation des ventes</h2><p>{{estimation_ventes}}</p><h2>6. Estimation des coûts</h2><p>{{estimation_couts}}</p><h2>7. Impact sur les autres produits / services</h2><p>{{impact}}</p><h2>8. Actions entreprises</h2><p>{{actions}}</p></div>`,
    popularity: 28,
  },
  {
    code: 'mkg_analyse_concurrence',
    name: 'Fiche d’analyse de la concurrence',
    category: 'commercial_financier',
    price: 1000, priceMax: 2500,
    description: 'Grille d’analyse concurrentielle : identification des concurrents, offre et positionnement, prix, forces et faiblesses, parts de marché et avantage concurrentiel de l’entreprise.',
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise réalisant l’analyse', type: 'text', required: true },
      { key: 'secteur', label: 'Secteur / marché analysé', type: 'text', required: true },
      { key: 'concurrents', label: 'Concurrents identifiés (noms)', type: 'textarea', required: true },
      { key: 'offre', label: 'Offre et positionnement de chaque concurrent', type: 'textarea', required: true },
      { key: 'prix', label: 'Politique de prix des concurrents', type: 'textarea', required: true },
      { key: 'forces_faiblesses', label: 'Forces et faiblesses des concurrents', type: 'textarea', required: true },
      { key: 'parts_marche', label: 'Parts de marché estimées', type: 'textarea', required: true },
      { key: 'avantage', label: 'Avantage concurrentiel de notre entreprise', type: 'textarea', required: true },
    ]),
    body: `<div class="document"><h1>FICHE D’ANALYSE DE LA CONCURRENCE</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Secteur analysé :</strong> {{secteur}}</p><p><strong>Date :</strong> {{date_jour}}</p><h2>1. Concurrents identifiés</h2><p>{{concurrents}}</p><h2>2. Offre et positionnement</h2><p>{{offre}}</p><h2>3. Politique de prix</h2><p>{{prix}}</p><h2>4. Forces et faiblesses</h2><p>{{forces_faiblesses}}</p><h2>5. Parts de marché estimées</h2><p>{{parts_marche}}</p><h2>6. Notre avantage concurrentiel</h2><p>{{avantage}}</p></div>`,
    popularity: 32,
  },
  // ════════════════════ COMMUNICATION & RELATIONS PRESSE ════════════════════
  {
    code: 'mkg_communique_presse',
    name: 'Communiqué de presse (trame)',
    category: 'commercial_financier',
    price: 1000, priceMax: 2500,
    description: 'Trame de communiqué de presse professionnelle adaptable à l’événement annoncé (lancement de produit, fusion, acquisition, ouverture, obtention de prix/financement, nomination, résultats…) : accroche, corps, citation et contacts presse.',
    fieldsJson: F([
      { key: 'entreprise', label: 'Nom de l’entreprise', type: 'text', required: true },
      { key: 'type', label: 'Type d’annonce', type: 'select', required: true, options: ['Lancement de nouveau produit/service', 'Fusion d’entreprises', 'Acquisition d’une entreprise', 'Ouverture d’une succursale', 'Obtention d’un prix / d’une distinction', 'Obtention de financement', 'Recrutement / nomination d’un dirigeant', 'Promotion d’un employé', 'Extension d’usine / de site', 'Nouveau partenariat', 'Résultats trimestriels', 'Réalisation importante', 'Autre'] },
      { key: 'titre', label: 'Titre du communiqué', type: 'text', required: true },
      { key: 'sous_titre', label: 'Sous-titre (facultatif)', type: 'text', required: false },
      { key: 'ville_date', label: 'Ville et date de diffusion', type: 'text', required: true },
      { key: 'corps', label: 'Corps de l’annonce (faits, chiffres, contexte)', type: 'textarea', required: true },
      { key: 'citation', label: 'Citation d’un dirigeant', type: 'textarea', required: true },
      { key: 'a_propos', label: 'À propos de l’entreprise (paragraphe de présentation)', type: 'textarea', required: true },
      { key: 'contact', label: 'Contact presse (nom, fonction, téléphone, e-mail)', type: 'textarea', required: true },
    ]),
    body: `<div class="document"><p><strong>{{entreprise}}</strong></p><h1>COMMUNIQUÉ DE PRESSE</h1><p><strong>POUR DIFFUSION IMMÉDIATE</strong></p><h2>{{titre}}</h2><p><em>{{sous_titre}}</em></p><p><strong>{{ville_date}}</strong> — {{corps}}</p><p>« {{citation}} »</p><h3>À propos de {{entreprise}}</h3><p>{{a_propos}}</p><h3>Contact presse</h3><p>{{contact}}</p><p style="text-align:center">— 30 —</p></div>`,
    popularity: 42,
  },
  {
    code: 'mkg_dossier_presse',
    name: 'Dossier de presse (trame)',
    category: 'commercial_financier',
    price: 1500, priceMax: 3000,
    description: 'Trame de dossier de presse : page de couverture, communiqué de synthèse, présentation de l’entreprise, points forts de l’actualité, chiffres clés, visuels disponibles et contacts presse.',
    fieldsJson: F([
      { key: 'entreprise', label: 'Nom de l’entreprise', type: 'text', required: true },
      { key: 'sujet', label: 'Sujet / événement du dossier de presse', type: 'text', required: true },
      { key: 'communique_synthese', label: 'Communiqué de synthèse (résumé de l’actualité)', type: 'textarea', required: true },
      { key: 'presentation', label: 'Présentation de l’entreprise (histoire, mission, activités)', type: 'textarea', required: true },
      { key: 'points_forts', label: 'Points forts / temps forts de l’actualité', type: 'textarea', required: true },
      { key: 'chiffres_cles', label: 'Chiffres clés', type: 'textarea', required: true },
      { key: 'visuels', label: 'Visuels et ressources disponibles (photos, logos, vidéos)', type: 'textarea', required: true },
      { key: 'contact', label: 'Contact presse (nom, fonction, téléphone, e-mail)', type: 'textarea', required: true },
    ]),
    body: `<div class="document"><h1>DOSSIER DE PRESSE</h1><p><strong>{{entreprise}}</strong></p><p><strong>Sujet :</strong> {{sujet}}</p><p><strong>Date :</strong> {{date_jour}}</p><h2>1. Communiqué de synthèse</h2><p>{{communique_synthese}}</p><h2>2. Présentation de {{entreprise}}</h2><p>{{presentation}}</p><h2>3. Points forts de l’actualité</h2><p>{{points_forts}}</p><h2>4. Chiffres clés</h2><p>{{chiffres_cles}}</p><h2>5. Ressources et visuels disponibles</h2><p>{{visuels}}</p><h2>6. Contact presse</h2><p>{{contact}}</p></div>`,
    popularity: 26,
  },
  {
    code: 'mkg_politique_relations_medias',
    name: 'Politique de relations avec les médias',
    category: 'commercial_financier',
    price: 1500, priceMax: 3000,
    description: 'Politique interne encadrant les relations avec les médias : désignation du porte-parole, circuit de traitement des demandes, règles de prise de parole et engagement de l’employé.',
    fieldsJson: F([
      { key: 'entreprise', label: 'Nom de l’entreprise', type: 'text', required: true },
      { key: 'porte_parole', label: 'Porte-parole désigné (nom et fonction)', type: 'text', required: true },
      { key: 'suppleant', label: 'Suppléant (nom et fonction)', type: 'text', required: true },
      { key: 'principes', label: 'Principes et règles de communication avec les médias', type: 'textarea', required: true },
    ]),
    body: `<div class="document"><h1>POLITIQUE DE RELATIONS AVEC LES MÉDIAS</h1><p>Afin de préserver la cohérence et la réputation de <strong>{{entreprise}}</strong> (« l’Entreprise »), toute demande émanant des médias est traitée conformément à la présente politique.</p><h2>1. Porte-parole</h2><p>Toutes les demandes des médias sont adressées à <strong>{{porte_parole}}</strong> (le « Porte-parole »). Le Porte-parole répond directement ou désigne une tierce personne habilitée à s’exprimer au nom de l’Entreprise, et détermine le processus conduisant à la réponse ou à la prise de position.</p><h2>2. Suppléance</h2><p>En l’absence du Porte-parole, les demandes sont adressées à {{suppleant}}.</p><h2>3. Principes de communication</h2><p>{{principes}}</p><p>La présente politique couvre toutes les formes de réponses aux médias, y compris les propos « hors micro » et les avis anonymes. Elle peut être modifiée à tout moment.</p><h2>4. Engagement de l’employé</h2><p>J’ai lu, compris et m’engage à respecter la présente politique régissant les relations avec les médias.</p><p>Date : {{date_jour}}<br/>Nom de l’employé : ____________________<br/>Signature : ____________________</p></div>`,
    popularity: 24,
  },
  {
    code: 'mkg_annonce_commerciale',
    name: 'Lettre d’annonce commerciale (trame)',
    category: 'commercial_financier',
    price: 1000, priceMax: 2500,
    description: 'Trame de lettre d’annonce adressée aux clients, adaptable à l’objet (réduction ou augmentation de prix, nouvelle politique tarifaire, programme d’incitation, changement d’adresse ou de représentant, fusion…) : objet, corps et coordonnées.',
    fieldsJson: F([
      { key: 'expediteur', label: 'Expéditeur (nom, titre, entreprise)', type: 'textarea', required: true },
      { key: 'destinataire', label: 'Destinataire (nom et adresse)', type: 'textarea', required: true },
      { key: 'objet', label: 'Objet de l’annonce', type: 'select', required: true, options: ['Réduction de prix', 'Augmentation de prix', 'Nouvelle politique de prix', 'Programme d’incitation des clients', 'Réduction des prix de catalogue', 'Changement d’adresse', 'Nouveau représentant commercial', 'Fusion d’entreprises', 'Reprise de contrôle par la direction', 'Changement de limite de livraison gratuite', 'Autre'] },
      { key: 'date_effet', label: 'Date de prise d’effet', type: 'text', required: true },
      { key: 'corps', label: 'Corps du message (détails de l’annonce)', type: 'textarea', required: true },
    ]),
    body: `<div class="document"><p>{{date_jour}}</p><p>{{destinataire}}</p><p><strong>OBJET : {{objet}}</strong></p><p>Madame, Monsieur,</p><p>{{corps}}</p><p>Cette mesure prend effet à compter du {{date_effet}}. Nous restons à votre disposition pour toute question complémentaire.</p><p>Nous vous prions d’agréer, Madame, Monsieur, l’expression de nos salutations distinguées.</p><p>{{expediteur}}</p></div>`,
    popularity: 30,
  },
  {
    code: 'mkg_proposition_commerciale',
    name: 'Proposition commerciale marketing',
    category: 'commercial_financier',
    price: 1500, priceMax: 3500,
    description: 'Proposition commerciale de services : contexte et besoins identifiés, solution proposée, prestations détaillées, calendrier, budget et conditions, avec lettre de transmission.',
    fieldsJson: F([
      { key: 'prestataire', label: 'Prestataire (nom, entreprise, coordonnées)', type: 'textarea', required: true },
      { key: 'client', label: 'Client destinataire (nom, entreprise)', type: 'textarea', required: true },
      { key: 'contexte', label: 'Contexte et besoins identifiés', type: 'textarea', required: true },
      { key: 'solution', label: 'Solution / approche proposée', type: 'textarea', required: true },
      { key: 'prestations', label: 'Prestations détaillées et livrables', type: 'textarea', required: true },
      { key: 'calendrier', label: 'Calendrier de réalisation', type: 'textarea', required: true },
      { key: 'budget', label: 'Budget et modalités de paiement', type: 'textarea', required: true },
      { key: 'validite', label: 'Durée de validité de l’offre', type: 'text', required: true },
    ]),
    body: `<div class="document"><h1>PROPOSITION COMMERCIALE</h1><p><strong>De :</strong> {{prestataire}}</p><p><strong>À l’attention de :</strong> {{client}}</p><p><strong>Date :</strong> {{date_jour}}</p><h2>Lettre de transmission</h2><p>Madame, Monsieur,</p><p>Suite à l’identification de vos besoins, nous avons le plaisir de vous soumettre la présente proposition destinée à y répondre. Toutes les informations échangées demeureront confidentielles. Nous vous remercions de l’opportunité offerte.</p><h2>1. Contexte et besoins</h2><p>{{contexte}}</p><h2>2. Solution proposée</h2><p>{{solution}}</p><h2>3. Prestations et livrables</h2><p>{{prestations}}</p><h2>4. Calendrier</h2><p>{{calendrier}}</p><h2>5. Budget et modalités</h2><p>{{budget}}</p><h2>6. Validité de l’offre</h2><p>La présente proposition est valable {{validite}} à compter de sa date d’émission.</p><p class="signatures">Fait le {{date_jour}}<br/>{{prestataire}}</p></div>`,
    popularity: 36,
  },
  // ════════════════════ PUBLICITÉ, MÉDIA & CRÉATION ════════════════════
  {
    code: 'mkg_contrat_agence_publicite',
    name: 'Contrat avec une agence de publicité',
    category: 'commercial_financier',
    price: 3000, priceMax: 5000,
    description: 'Contrat entre un annonceur et une agence de publicité : services de conception et de placement média, exclusivité, rémunération (commission média / taux horaire), facturation, propriété des créations, indemnisation et résiliation.',
    fieldsJson: F([
      { key: 'annonceur', label: 'Annonceur (société, type, loi, siège social)', type: 'textarea', required: true },
      { key: 'agence', label: 'Agence de publicité (société, type, loi, siège social)', type: 'textarea', required: true },
      { key: 'produits', label: 'Produits et services concernés', type: 'textarea', required: true },
      { key: 'exclusivite', label: 'Exclusivité et territoire', type: 'select', required: true, options: ['Exclusive', 'Non exclusive'] },
      { key: 'commission_media', label: 'Commission sur frais média (pourcentage)', type: 'text', required: true },
      { key: 'taux_horaire', label: 'Taux horaire maximum (hors commission)', type: 'text', required: true },
      { key: 'delai_facturation', label: 'Délai de règlement des factures (jours)', type: 'text', required: true },
      { key: 'preavis', label: 'Préavis de résiliation (jours)', type: 'text', required: true },
      { key: 'juridiction', label: 'Loi applicable (État / province / pays)', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT AVEC UNE AGENCE DE PUBLICITÉ</h1><p>Le présent contrat prend effet à compter du {{date_jour}}.</p><p><strong>ENTRE :</strong> {{annonceur}} (l’« Annonceur »),</p><p><strong>ET :</strong> {{agence}} (l’« Agence »).</p><p>L’Agence fournit des services de publicité en contrepartie d’honoraires. L’Annonceur souhaite l’employer et l’Agence accepte de fournir les services décrits ci-après.</p><h2>1. Recrutement et services</h2><p>L’Agence est chargée de planifier et préparer la campagne de publicité : analyse des produits et marchés, création et soumission des idées et programmes publicitaires pour approbation, estimation des coûts, conception et production des opérations, commande d’espace et de temps média aux meilleurs taux, contrôle des insertions et audit des factures.</p><h2>2. Produits concernés</h2><p>{{produits}}</p><h2>3. Exclusivité</h2><p>L’Agence sera l’agence de publicité <strong>{{exclusivite}}</strong> de l’Annonceur pour les produits visés à l’article 2.</p><h2>4. Rémunération</h2><p>4.1 L’Agence perçoit une commission de <strong>{{commission_media}}</strong> sur les frais bruts facturés par les médias pour la publicité qu’elle place, dans le respect des lois applicables aux agences de publicité.</p><p>4.2 Lorsqu’elle n’est pas rémunérée à la commission, l’Agence est payée à un taux horaire n’excédant pas {{taux_horaire}}. Les projets spéciaux font l’objet d’une estimation préalable approuvée par l’Annonceur.</p><h2>5. Facturation</h2><p>Les factures sont soumises dans un format détaillé et réglées au plus tard {{delai_facturation}} jours après leur date. Les réductions pour paiement anticipé sont attribuées à l’Annonceur.</p><h2>6. Concurrents</h2><p>Pendant la durée du contrat, l’Agence s’interdit de servir tout produit ou service directement concurrent de ceux de l’Annonceur couverts par le présent contrat.</p><h2>7. Propriété des créations</h2><p>L’Annonceur détient les droits de propriété intellectuelle sur les créations réalisées et payées dans le cadre du contrat. Les projets non retenus et non payés restent la propriété de l’Agence.</p><h2>8. Indemnisation et assurance</h2><p>L’Agence garantit l’Annonceur contre toute réclamation (diffamation, contrefaçon, atteinte à la vie privée…) liée aux éléments qu’elle prépare, sauf s’ils résultent de matériels fournis par l’Annonceur, et maintient une assurance de responsabilité adéquate.</p><h2>9. Durée et résiliation</h2><p>Le contrat reste en vigueur jusqu’à sa résiliation par l’une des parties moyennant un préavis écrit d’au moins {{preavis}} jours. En cas de défaut non corrigé après notification, la partie non défaillante peut y mettre fin.</p><h2>10. Loi applicable</h2><p>Le présent contrat est régi et interprété conformément aux lois de {{juridiction}}.</p><p class="signatures">En foi de quoi, les parties ont signé le {{date_jour}}<br/><br/>L’ANNONCEUR — L’AGENCE<br/>Signature autorisée — Signature autorisée<br/>Nom et fonction — Nom et fonction</p></div>`,
    popularity: 38,
  },
  {
    code: 'mkg_plan_media',
    name: 'Plan média',
    category: 'commercial_financier',
    price: 2000, priceMax: 4000,
    description: 'Plan média d’une campagne publicitaire : objectifs, cible et couverture, sélection des canaux et supports, calendrier des insertions, budget par média et indicateurs de performance.',
    fieldsJson: F([
      { key: 'annonceur', label: 'Annonceur / entreprise', type: 'text', required: true },
      { key: 'campagne', label: 'Campagne concernée', type: 'text', required: true },
      { key: 'objectifs', label: 'Objectifs média (notoriété, couverture, conversions…)', type: 'textarea', required: true },
      { key: 'cible', label: 'Cible visée et zone géographique', type: 'textarea', required: true },
      { key: 'canaux', label: 'Canaux et supports retenus (TV, radio, presse, affichage, digital, réseaux sociaux…)', type: 'textarea', required: true },
      { key: 'calendrier', label: 'Calendrier des insertions / diffusion', type: 'textarea', required: true },
      { key: 'budget', label: 'Budget par média et budget total', type: 'textarea', required: true },
      { key: 'indicateurs', label: 'Indicateurs de performance (GRP, portée, coût par contact, ROI…)', type: 'textarea', required: true },
    ]),
    body: `<div class="document"><h1>PLAN MÉDIA</h1><p><strong>Annonceur :</strong> {{annonceur}}</p><p><strong>Campagne :</strong> {{campagne}}</p><p><strong>Date :</strong> {{date_jour}}</p><h2>1. Objectifs média</h2><p>{{objectifs}}</p><h2>2. Cible et couverture</h2><p>{{cible}}</p><h2>3. Canaux et supports</h2><p>{{canaux}}</p><h2>4. Calendrier des insertions</h2><p>{{calendrier}}</p><h2>5. Budget média</h2><p>{{budget}}</p><h2>6. Indicateurs de performance</h2><p>{{indicateurs}}</p></div>`,
    popularity: 28,
  },
  {
    code: 'mkg_brief_creatif',
    name: 'Brief créatif',
    category: 'commercial_financier',
    price: 1000, priceMax: 2500,
    description: 'Brief créatif à destination d’une agence ou d’un studio : contexte, problématique, objectifs, cible, message clé, ton et style, livrables attendus, contraintes, budget et délais.',
    fieldsJson: F([
      { key: 'annonceur', label: 'Annonceur / marque', type: 'text', required: true },
      { key: 'projet', label: 'Intitulé du projet / de la campagne', type: 'text', required: true },
      { key: 'contexte', label: 'Contexte et problématique', type: 'textarea', required: true },
      { key: 'objectifs', label: 'Objectifs de communication', type: 'textarea', required: true },
      { key: 'cible', label: 'Cible (insight, description)', type: 'textarea', required: true },
      { key: 'message', label: 'Message clé à faire passer', type: 'textarea', required: true },
      { key: 'ton', label: 'Ton, style et univers de marque', type: 'textarea', required: true },
      { key: 'livrables', label: 'Livrables attendus (formats, supports)', type: 'textarea', required: true },
      { key: 'contraintes', label: 'Contraintes (charte, mentions légales, techniques)', type: 'textarea', required: true },
      { key: 'budget_delais', label: 'Budget et délais', type: 'textarea', required: true },
    ]),
    body: `<div class="document"><h1>BRIEF CRÉATIF</h1><p><strong>Annonceur / marque :</strong> {{annonceur}}</p><p><strong>Projet :</strong> {{projet}}</p><p><strong>Date :</strong> {{date_jour}}</p><h2>1. Contexte et problématique</h2><p>{{contexte}}</p><h2>2. Objectifs de communication</h2><p>{{objectifs}}</p><h2>3. Cible</h2><p>{{cible}}</p><h2>4. Message clé</h2><p>{{message}}</p><h2>5. Ton et style</h2><p>{{ton}}</p><h2>6. Livrables attendus</h2><p>{{livrables}}</p><h2>7. Contraintes</h2><p>{{contraintes}}</p><h2>8. Budget et délais</h2><p>{{budget_delais}}</p></div>`,
    popularity: 32,
  },
  {
    code: 'mkg_cahier_charges_site_web',
    name: 'Cahier des charges (site web / logo)',
    category: 'commercial_financier',
    price: 2000, priceMax: 4500,
    description: 'Cahier des charges pour la création d’un site web ou d’une identité visuelle (logo) : présentation, objectifs, cible, périmètre et fonctionnalités attendues, contraintes techniques et graphiques, arborescence, budget et planning.',
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise / porteur du projet', type: 'text', required: true },
      { key: 'type_projet', label: 'Type de projet', type: 'select', required: true, options: ['Site web vitrine', 'Site e-commerce', 'Application web', 'Refonte de site', 'Création de logo / identité visuelle', 'Autre'] },
      { key: 'presentation', label: 'Présentation de l’entreprise et du contexte', type: 'textarea', required: true },
      { key: 'objectifs', label: 'Objectifs du projet', type: 'textarea', required: true },
      { key: 'cible', label: 'Cible / utilisateurs visés', type: 'textarea', required: true },
      { key: 'perimetre', label: 'Périmètre et fonctionnalités / livrables attendus', type: 'textarea', required: true },
      { key: 'contraintes_tech', label: 'Contraintes techniques (hébergement, CMS, compatibilité…)', type: 'textarea', required: false },
      { key: 'contraintes_graph', label: 'Contraintes graphiques (charte, couleurs, références)', type: 'textarea', required: true },
      { key: 'arborescence', label: 'Arborescence / structure envisagée (le cas échéant)', type: 'textarea', required: false },
      { key: 'budget_planning', label: 'Budget et planning', type: 'textarea', required: true },
    ]),
    body: `<div class="document"><h1>CAHIER DES CHARGES</h1><p><strong>Porteur du projet :</strong> {{entreprise}}</p><p><strong>Type de projet :</strong> {{type_projet}}</p><p><strong>Date :</strong> {{date_jour}}</p><h2>1. Présentation et contexte</h2><p>{{presentation}}</p><h2>2. Objectifs</h2><p>{{objectifs}}</p><h2>3. Cible</h2><p>{{cible}}</p><h2>4. Périmètre et livrables attendus</h2><p>{{perimetre}}</p><h2>5. Contraintes techniques</h2><p>{{contraintes_tech}}</p><h2>6. Contraintes graphiques</h2><p>{{contraintes_graph}}</p><h2>7. Arborescence / structure</h2><p>{{arborescence}}</p><h2>8. Budget et planning</h2><p>{{budget_planning}}</p></div>`,
    popularity: 34,
  },
  {
    code: 'mkg_charte_graphique',
    name: 'Charte graphique (trame)',
    category: 'commercial_financier',
    price: 2000, priceMax: 4000,
    description: 'Trame de charte graphique décrivant les règles d’usage de l’identité visuelle : logo et variantes, couleurs, typographies, iconographie, ton éditorial et exemples d’application.',
    fieldsJson: F([
      { key: 'marque', label: 'Marque / entreprise', type: 'text', required: true },
      { key: 'valeurs', label: 'Valeurs et personnalité de la marque', type: 'textarea', required: true },
      { key: 'logo', label: 'Logo : versions, zone de protection, tailles minimales, usages interdits', type: 'textarea', required: true },
      { key: 'couleurs', label: 'Palette de couleurs (références Pantone / RVB / hexadécimal)', type: 'textarea', required: true },
      { key: 'typographies', label: 'Typographies (principale, secondaire, usages)', type: 'textarea', required: true },
      { key: 'iconographie', label: 'Iconographie et style visuel (photos, illustrations)', type: 'textarea', required: true },
      { key: 'ton', label: 'Ton éditorial et style rédactionnel', type: 'textarea', required: true },
      { key: 'applications', label: 'Exemples d’application (papeterie, web, réseaux sociaux, signalétique)', type: 'textarea', required: true },
    ]),
    body: `<div class="document"><h1>CHARTE GRAPHIQUE — {{marque}}</h1><p><strong>Date :</strong> {{date_jour}}</p><h2>1. Notre marque</h2><p>{{valeurs}}</p><h2>2. Le logo</h2><p>{{logo}}</p><h2>3. Les couleurs</h2><p>{{couleurs}}</p><h2>4. Les typographies</h2><p>{{typographies}}</p><h2>5. L’iconographie et le style visuel</h2><p>{{iconographie}}</p><h2>6. Le ton éditorial</h2><p>{{ton}}</p><h2>7. Exemples d’application</h2><p>{{applications}}</p><p><em>Cette charte garantit la cohérence de l’identité visuelle de {{marque}} sur l’ensemble des supports.</em></p></div>`,
    popularity: 30,
  },
  {
    code: 'mkg_calendrier_editorial',
    name: 'Calendrier éditorial (trame)',
    category: 'commercial_financier',
    price: 1000, priceMax: 2500,
    description: 'Trame de calendrier éditorial pour planifier les publications de contenu (blog, réseaux sociaux, newsletter) : ligne éditoriale, rubriques, fréquence, canaux et planning des contenus.',
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise / marque', type: 'text', required: true },
      { key: 'periode', label: 'Période couverte (mois, trimestre…)', type: 'text', required: true },
      { key: 'ligne_editoriale', label: 'Ligne éditoriale et objectifs de contenu', type: 'textarea', required: true },
      { key: 'rubriques', label: 'Rubriques / thématiques récurrentes', type: 'textarea', required: true },
      { key: 'canaux', label: 'Canaux de diffusion (blog, Facebook, Instagram, LinkedIn, newsletter…)', type: 'textarea', required: true },
      { key: 'frequence', label: 'Fréquence de publication par canal', type: 'textarea', required: true },
      { key: 'planning', label: 'Planning des contenus (date, sujet, format, canal, responsable, statut)', type: 'textarea', required: true },
    ]),
    body: `<div class="document"><h1>CALENDRIER ÉDITORIAL</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Période :</strong> {{periode}}</p><h2>1. Ligne éditoriale</h2><p>{{ligne_editoriale}}</p><h2>2. Rubriques et thématiques</h2><p>{{rubriques}}</p><h2>3. Canaux de diffusion</h2><p>{{canaux}}</p><h2>4. Fréquence de publication</h2><p>{{frequence}}</p><h2>5. Planning des contenus</h2><p><em>Format conseillé : Date | Sujet | Format | Canal | Responsable | Statut</em></p><p>{{planning}}</p><p><em>Calendrier établi le {{date_jour}}.</em></p></div>`,
    popularity: 30,
  },
  {
    code: 'mkg_brief_brochure',
    name: 'Brief de conception d’une brochure',
    category: 'commercial_financier',
    price: 1000, priceMax: 2500,
    description: 'Brief de conception d’une brochure ou support imprimé : objectif, cible, contenu et messages, format et pagination, éléments visuels, charte et contraintes d’impression.',
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise / marque', type: 'text', required: true },
      { key: 'objectif', label: 'Objectif de la brochure', type: 'textarea', required: true },
      { key: 'cible', label: 'Cible / lecteurs visés', type: 'textarea', required: true },
      { key: 'contenu', label: 'Contenu et messages à intégrer', type: 'textarea', required: true },
      { key: 'format', label: 'Format et pagination (ex : A4 plié, 8 pages)', type: 'text', required: true },
      { key: 'visuels', label: 'Éléments visuels (photos, logos, illustrations)', type: 'textarea', required: true },
      { key: 'charte', label: 'Charte graphique et contraintes d’impression (couleurs, papier, finition)', type: 'textarea', required: true },
      { key: 'diffusion', label: 'Mode de diffusion et quantité', type: 'text', required: true },
    ]),
    body: `<div class="document"><h1>BRIEF DE CONCEPTION D’UNE BROCHURE</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Date :</strong> {{date_jour}}</p><h2>1. Objectif</h2><p>{{objectif}}</p><h2>2. Cible</h2><p>{{cible}}</p><h2>3. Contenu et messages</h2><p>{{contenu}}</p><h2>4. Format et pagination</h2><p>{{format}}</p><h2>5. Éléments visuels</h2><p>{{visuels}}</p><h2>6. Charte et contraintes d’impression</h2><p>{{charte}}</p><h2>7. Diffusion</h2><p>{{diffusion}}</p></div>`,
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

  console.log('✅ Seed Drive4 Marketing & Communication terminé.');
  console.log(`   Templates du script : ${templates.length} (créés : ${created}, mis à jour : ${updated})`);
  console.log('   Répartition par catégorie (ce script) :');
  for (const [cat, n] of Object.entries(byCategory)) console.log(`     - ${cat} : ${n}`);
  console.log(`   ➜ Total de templates en base : ${total}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
