// Seed « Stratégie d'entreprise » IBIG DocPro — Agent Drive4-1/10.
// Le « KIT DE LA STRATEGIE D'ENTREPRISE » (parentId 1aAHPTeNIn0YqQwM5R9MzkEQ90gezfqMV)
// ne contient QUE des livres PDF (43 ouvrages de stratégie) — aucun modèle .docx exploitable.
// Conformément à la consigne de repli, les modèles ci-dessous sont convertis à partir des
// TRAMES de stratégie du Drive (fiches / listes de vérification / grilles), notamment :
// - Fiche d'analyse des forces et faiblesses / Analyse du secteur & forces concurrentielles
// - Fiche d'analyse de marché cible / Fiche d'analyse démographique (fusionnées)
// - Analyse d'opportunité d'affaires / Analyse concurrentielle
// - Liste de vérification : session de planification stratégique / Définition de stratégie de service
// - Objectif de gestion (fixation d'objectifs)
// Complétés par les documents de cadrage stratégique standard du même thème.
// Script ADDITIF : upsert par code — n'écrase pas les templates existants.
// Exécution : npx tsx prisma/seed-drive4-strategie.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type StrategieTemplate = {
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

const templates: StrategieTemplate[] = [
  // ════════════════════════ CADRAGE & PLANIFICATION ════════════════════════
  {
    code: 'strat_plan_strategique', name: 'Plan stratégique d’entreprise', category: 'commercial_financier', price: 3500, priceMax: 5000,
    description: 'Plan stratégique complet : vision, mission et valeurs, diagnostic interne et externe, axes stratégiques, objectifs mesurables, plan d’action et pilotage.',
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise (raison sociale + secteur d’activité)', type: 'textarea', required: true },
      { key: 'horizon', label: 'Horizon du plan (ex. 2026-2028)', type: 'text', required: true },
      { key: 'vision_mission', label: 'Vision, mission et valeurs de l’entreprise', type: 'textarea', required: true },
      { key: 'diagnostic', label: 'Diagnostic stratégique (forces, faiblesses, opportunités, menaces)', type: 'textarea', required: true },
      { key: 'axes', label: 'Axes stratégiques prioritaires', type: 'textarea', required: true },
      { key: 'objectifs', label: 'Objectifs stratégiques et indicateurs (KPI + cibles)', type: 'textarea', required: true },
      { key: 'plan_action', label: 'Plan d’action (chantiers, responsables, échéances, ressources)', type: 'textarea', required: true },
      { key: 'pilotage', label: 'Pilotage et suivi (instances, revues, tableaux de bord)', type: 'textarea', required: true },
    ]),
    body: `<div class="contrat"><h1>PLAN STRATÉGIQUE</h1><p><strong>Entreprise :</strong> {{entreprise}}<br/><strong>Horizon du plan :</strong> {{horizon}}<br/><strong>Date d’élaboration :</strong> {{date_jour}}</p><h2>1. Vision, mission et valeurs</h2><p>{{vision_mission}}</p><h2>2. Diagnostic stratégique</h2><p>Le diagnostic ci-dessous confronte les capacités internes de l’entreprise (forces et faiblesses) aux tendances de son environnement (opportunités et menaces) afin d’éclairer les choix stratégiques.</p><p>{{diagnostic}}</p><h2>3. Axes stratégiques prioritaires</h2><p>{{axes}}</p><h2>4. Objectifs stratégiques et indicateurs de performance</h2><p>Chaque objectif est formulé de manière spécifique, mesurable, réaliste et assorti d’une échéance, et associé à un ou plusieurs indicateurs clés de performance (KPI) avec leur cible.</p><p>{{objectifs}}</p><h2>5. Plan d’action</h2><p>{{plan_action}}</p><h2>6. Pilotage et suivi</h2><p>{{pilotage}}</p><p class="text-small">Le présent plan stratégique est révisé au moins une fois par an lors d’une séance de planification réunissant la direction et les responsables de service, afin d’évaluer l’avancement des objectifs et d’ajuster les orientations en fonction de l’évolution du marché.</p><p class="signatures">Établi le {{date_jour}}<br/><br/>Pour {{entreprise}} — La Direction générale</p></div>`,
    popularity: 48,
  },
  {
    code: 'strat_note_cadrage', name: 'Note de cadrage stratégique', category: 'commercial_financier', price: 2000, priceMax: 4000,
    description: 'Note de cadrage d’une démarche stratégique : contexte, enjeux, objectifs, périmètre, parties prenantes, livrables, planning et gouvernance.',
    fieldsJson: F([
      { key: 'organisation', label: 'Organisation / entité concernée', type: 'text', required: true },
      { key: 'intitule', label: 'Intitulé de la démarche stratégique', type: 'text', required: true },
      { key: 'contexte', label: 'Contexte et enjeux (situation actuelle, éléments déclencheurs)', type: 'textarea', required: true },
      { key: 'objectifs', label: 'Objectifs de la démarche (résultats attendus)', type: 'textarea', required: true },
      { key: 'perimetre', label: 'Périmètre (inclus / hors périmètre, hypothèses, contraintes)', type: 'textarea', required: true },
      { key: 'parties_prenantes', label: 'Parties prenantes et rôles (commanditaire, pilote, contributeurs)', type: 'textarea', required: true },
      { key: 'livrables_planning', label: 'Livrables attendus et planning (jalons, échéances)', type: 'textarea', required: true },
      { key: 'gouvernance', label: 'Gouvernance (instances de décision, fréquence des points)', type: 'textarea', required: true },
    ]),
    body: `<div class="contrat"><h1>NOTE DE CADRAGE STRATÉGIQUE</h1><p><strong>Organisation :</strong> {{organisation}}<br/><strong>Démarche :</strong> {{intitule}}<br/><strong>Date :</strong> {{date_jour}}</p><h2>1. Contexte et enjeux</h2><p>{{contexte}}</p><h2>2. Objectifs de la démarche</h2><p>{{objectifs}}</p><h2>3. Périmètre</h2><p>{{perimetre}}</p><p class="text-small">Note : définir ce qui sort du périmètre est aussi important que de définir ce qui en fait partie ; cela évite les malentendus ultérieurs.</p><h2>4. Parties prenantes et rôles</h2><p>{{parties_prenantes}}</p><h2>5. Livrables et planning</h2><p>{{livrables_planning}}</p><h2>6. Gouvernance</h2><p>{{gouvernance}}</p><p class="signatures">Validé le {{date_jour}}<br/><br/>Le commanditaire — Le pilote de la démarche</p></div>`,
    popularity: 34,
  },
  {
    code: 'strat_vision_mission', name: 'Canevas Vision, Mission & Valeurs', category: 'commercial_financier', price: 1500, priceMax: 3500,
    description: 'Canevas de formalisation de l’identité stratégique : énoncé de vision, énoncé de mission, valeurs fondamentales, ambition et proposition de valeur.',
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise', type: 'text', required: true },
      { key: 'vision', label: 'Énoncé de vision (où l’entreprise veut être à long terme)', type: 'textarea', required: true },
      { key: 'mission', label: 'Énoncé de mission (raison d’être, ce que fait l’entreprise et pour qui)', type: 'textarea', required: true },
      { key: 'valeurs', label: 'Valeurs fondamentales (principes qui guident les comportements)', type: 'textarea', required: true },
      { key: 'ambition', label: 'Ambition / objectifs majeurs à moyen terme', type: 'textarea', required: true },
      { key: 'proposition_valeur', label: 'Proposition de valeur (bénéfice distinctif offert aux clients)', type: 'textarea', required: true },
    ]),
    body: `<div class="contrat"><h1>VISION, MISSION & VALEURS</h1><p><strong>Entreprise :</strong> {{entreprise}}<br/><strong>Date :</strong> {{date_jour}}</p><h2>1. Notre vision</h2><p>{{vision}}</p><h2>2. Notre mission</h2><p>{{mission}}</p><h2>3. Nos valeurs</h2><p>{{valeurs}}</p><h2>4. Notre ambition</h2><p>{{ambition}}</p><h2>5. Notre proposition de valeur</h2><p>{{proposition_valeur}}</p><p class="text-small">Ce canevas constitue le socle identitaire de l’entreprise : il aide chaque collaborateur à rester concentré sur une mission commune et à porter une vision claire et partagée.</p><p class="signatures">Formalisé le {{date_jour}}<br/><br/>Pour {{entreprise}}</p></div>`,
    popularity: 30,
  },

  // ════════════════════════ DIAGNOSTIC STRATÉGIQUE ════════════════════════
  {
    code: 'strat_swot', name: 'Analyse SWOT (diagnostic forces-faiblesses-opportunités-menaces)', category: 'commercial_financier', price: 2000, priceMax: 4500,
    description: 'Trame d’analyse SWOT : audit interne des forces et faiblesses (marketing, finances, production, organisation) et analyse externe des opportunités et menaces, avec orientations.',
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise / activité analysée', type: 'text', required: true },
      { key: 'forces', label: 'Forces internes (marketing, finances, production, organisation…)', type: 'textarea', required: true },
      { key: 'faiblesses', label: 'Faiblesses internes (points à améliorer)', type: 'textarea', required: true },
      { key: 'opportunites', label: 'Opportunités de l’environnement (marché, technologie, réglementation…)', type: 'textarea', required: true },
      { key: 'menaces', label: 'Menaces de l’environnement (concurrence, risques, contraintes…)', type: 'textarea', required: true },
      { key: 'orientations', label: 'Orientations stratégiques déduites de l’analyse', type: 'textarea', required: true },
    ]),
    body: `<div class="contrat"><h1>ANALYSE SWOT</h1><p><strong>Objet de l’analyse :</strong> {{entreprise}}<br/><strong>Date :</strong> {{date_jour}}</p><p>L’analyse SWOT confronte le diagnostic interne (forces et faiblesses de l’entreprise, appréciées notamment sur les dimensions marketing, finances, production et organisation) au diagnostic externe (opportunités et menaces de l’environnement) afin d’éclairer les choix stratégiques.</p><h2>1. Forces (internes)</h2><p>{{forces}}</p><h2>2. Faiblesses (internes)</h2><p>{{faiblesses}}</p><h2>3. Opportunités (externes)</h2><p>{{opportunites}}</p><h2>4. Menaces (externes)</h2><p>{{menaces}}</p><h2>5. Orientations stratégiques</h2><p>Les orientations ci-dessous visent à s’appuyer sur les forces pour saisir les opportunités, à corriger les faiblesses et à se prémunir contre les menaces identifiées.</p><p>{{orientations}}</p><p class="signatures">Réalisé le {{date_jour}}<br/><br/>Pour {{entreprise}}</p></div>`,
    popularity: 46,
  },
  {
    code: 'strat_pestel', name: 'Analyse PESTEL de l’environnement', category: 'commercial_financier', price: 2000, priceMax: 4500,
    description: 'Trame d’analyse PESTEL du macro-environnement : facteurs politiques, économiques, socioculturels, technologiques, écologiques et légaux, avec impacts et implications.',
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise / marché analysé', type: 'text', required: true },
      { key: 'politique', label: 'Facteurs Politiques (stabilité, politiques publiques, fiscalité…)', type: 'textarea', required: true },
      { key: 'economique', label: 'Facteurs Économiques (croissance, inflation, pouvoir d’achat, change…)', type: 'textarea', required: true },
      { key: 'socioculturel', label: 'Facteurs Socioculturels (démographie, modes de vie, attentes…)', type: 'textarea', required: true },
      { key: 'technologique', label: 'Facteurs Technologiques (innovations, digitalisation, R&D…)', type: 'textarea', required: true },
      { key: 'ecologique', label: 'Facteurs Écologiques (environnement, énergie, développement durable…)', type: 'textarea', required: true },
      { key: 'legal', label: 'Facteurs Légaux (réglementation, normes, droit du travail…)', type: 'textarea', required: true },
      { key: 'implications', label: 'Synthèse : opportunités, menaces et implications stratégiques', type: 'textarea', required: true },
    ]),
    body: `<div class="contrat"><h1>ANALYSE PESTEL</h1><p><strong>Objet :</strong> {{entreprise}}<br/><strong>Date :</strong> {{date_jour}}</p><p>L’analyse PESTEL identifie les facteurs du macro-environnement susceptibles d’influencer l’activité de l’entreprise, afin d’anticiper les opportunités et les menaces qui en découlent.</p><h2>1. Facteurs Politiques</h2><p>{{politique}}</p><h2>2. Facteurs Économiques</h2><p>{{economique}}</p><h2>3. Facteurs Socioculturels</h2><p>{{socioculturel}}</p><h2>4. Facteurs Technologiques</h2><p>{{technologique}}</p><h2>5. Facteurs Écologiques</h2><p>{{ecologique}}</p><h2>6. Facteurs Légaux</h2><p>{{legal}}</p><h2>7. Synthèse et implications stratégiques</h2><p>{{implications}}</p><p class="signatures">Réalisé le {{date_jour}}<br/><br/>Pour {{entreprise}}</p></div>`,
    popularity: 38,
  },
  {
    code: 'strat_5forces_porter', name: 'Analyse du secteur et des forces concurrentielles (5 forces de Porter)', category: 'commercial_financier', price: 2500, priceMax: 4500,
    description: 'Trame d’analyse sectorielle selon les cinq forces de Porter : rivalité, entrants potentiels, produits de substitution, pouvoir des clients et des fournisseurs, avec attractivité globale.',
    fieldsJson: F([
      { key: 'secteur', label: 'Secteur / marché analysé', type: 'text', required: true },
      { key: 'rivalite', label: 'Rivalité entre concurrents actuels (intensité, nombre, croissance…)', type: 'textarea', required: true },
      { key: 'entrants', label: 'Menace des entrants potentiels (barrières à l’entrée)', type: 'textarea', required: true },
      { key: 'substituts', label: 'Menace des produits de substitution', type: 'textarea', required: true },
      { key: 'clients', label: 'Pouvoir de négociation des clients / acheteurs', type: 'textarea', required: true },
      { key: 'fournisseurs', label: 'Pouvoir de négociation des fournisseurs', type: 'textarea', required: true },
      { key: 'conclusion', label: 'Conclusion : attractivité du secteur et positionnement recommandé', type: 'textarea', required: true },
    ]),
    body: `<div class="contrat"><h1>ANALYSE DES FORCES CONCURRENTIELLES</h1><p><strong>Secteur analysé :</strong> {{secteur}}<br/><strong>Date :</strong> {{date_jour}}</p><p>Pour chaque force, on identifie si les caractéristiques du secteur représentent une <strong>menace</strong> ou une <strong>opportunité</strong> pour l’entreprise, afin d’apprécier l’attractivité globale du marché.</p><h2>1. Rivalité entre concurrents actuels</h2><p>{{rivalite}}</p><h2>2. Menace des entrants potentiels</h2><p>{{entrants}}</p><h2>3. Menace des produits de substitution</h2><p>{{substituts}}</p><h2>4. Pouvoir de négociation des acheteurs</h2><p>{{clients}}</p><h2>5. Pouvoir de négociation des fournisseurs</h2><p>{{fournisseurs}}</p><h2>6. Conclusion — attractivité du secteur</h2><p>{{conclusion}}</p><p class="signatures">Réalisé le {{date_jour}}<br/><br/>Pour l’analyse sectorielle de {{secteur}}</p></div>`,
    popularity: 36,
  },
  {
    code: 'strat_analyse_concurrentielle', name: 'Analyse concurrentielle (benchmark des concurrents)', category: 'commercial_financier', price: 2000, priceMax: 4000,
    description: 'Trame de benchmark concurrentiel : comparaison de l’entreprise et de ses principaux concurrents sur l’implantation, la cible, les forces et faiblesses, l’offre et le positionnement.',
    fieldsJson: F([
      { key: 'notre_societe', label: 'Notre société (nom, implantation, client cible, offre, forces/faiblesses)', type: 'textarea', required: true },
      { key: 'concurrent1', label: 'Concurrent n°1 (nom, implantation, cible, forces, faiblesses, offre)', type: 'textarea', required: true },
      { key: 'concurrent2', label: 'Concurrent n°2 (nom, implantation, cible, forces, faiblesses, offre)', type: 'textarea', required: true },
      { key: 'concurrent3', label: 'Concurrent n°3 (nom, implantation, cible, forces, faiblesses, offre) — facultatif', type: 'textarea', required: false },
      { key: 'synthese', label: 'Synthèse : avantages concurrentiels et axes de différenciation à développer', type: 'textarea', required: true },
    ]),
    body: `<div class="contrat"><h1>ANALYSE CONCURRENTIELLE</h1><p><strong>Date :</strong> {{date_jour}}</p><p>Ce benchmark compare notre entreprise à ses principaux concurrents sur des catégories clés (implantation, client cible, chiffre d’affaires, forces et faiblesses, identité de marque, mission, offre de services et de produits, marketing) afin d’identifier nos avantages concurrentiels.</p><h2>Notre société</h2><p>{{notre_societe}}</p><h2>Société concurrente n°1</h2><p>{{concurrent1}}</p><h2>Société concurrente n°2</h2><p>{{concurrent2}}</p><h2>Société concurrente n°3</h2><p>{{concurrent3}}</p><h2>Synthèse et axes de différenciation</h2><p>{{synthese}}</p><p class="signatures">Réalisé le {{date_jour}}</p></div>`,
    popularity: 40,
  },
  {
    code: 'strat_analyse_marche_cible', name: 'Analyse du marché cible et profil client', category: 'commercial_financier', price: 2000, priceMax: 4500,
    description: 'Trame d’analyse du marché cible fusionnant profil démographique et comportemental : concept, description de la cible, habitudes et canaux, taille de marché et sensibilité au prix.',
    fieldsJson: F([
      { key: 'concept', label: 'Description du concept / produit / service et son usage', type: 'textarea', required: true },
      { key: 'profil_client', label: 'Profil des clients (individus : sexe, âge, statut, style de vie… / entreprises : secteur, taille, ventes…)', type: 'textarea', required: true },
      { key: 'profil_geo', label: 'Profil géographique (localisation des clients, taille du marché en volume et en valeur)', type: 'textarea', required: true },
      { key: 'habitudes', label: 'Habitudes (loisirs, formation, lieux d’achat, médias lus/regardés, sites visités)', type: 'textarea', required: true },
      { key: 'prix', label: 'Sensibilité au prix (prix acceptés, valeur ajoutée attendue)', type: 'textarea', required: true },
      { key: 'viabilite', label: 'Conclusion sur la viabilité et l’adéquation offre / cible', type: 'textarea', required: true },
    ]),
    body: `<div class="contrat"><h1>ANALYSE DU MARCHÉ CIBLE</h1><p><strong>Date :</strong> {{date_jour}}</p><p>Cette analyse aide à définir la cible de l’entreprise en décrivant ses caractéristiques démographiques et comportementales, afin de mesurer l’adéquation entre l’offre et le segment de marché visé. Si l’entreprise vend à plusieurs groupes, chacun est décrit séparément.</p><h2>1. Le concept</h2><p>{{concept}}</p><h2>2. Profil des clients</h2><p>{{profil_client}}</p><h2>3. Profil géographique et taille du marché</h2><p>{{profil_geo}}</p><h2>4. Habitudes et canaux de contact</h2><p>{{habitudes}}</p><h2>5. Sensibilité au prix et valeur attendue</h2><p>{{prix}}</p><h2>6. Viabilité et adéquation offre / cible</h2><p>{{viabilite}}</p><p class="signatures">Réalisé le {{date_jour}}</p></div>`,
    popularity: 35,
  },
  {
    code: 'strat_analyse_opportunite', name: 'Analyse d’opportunité d’affaires', category: 'commercial_financier', price: 1500, priceMax: 3500,
    description: 'Trame d’évaluation d’une opportunité d’affaires : adéquation avec les objectifs, potentiel de rentabilité, niveau de risque, potentiel du produit et recommandation.',
    fieldsJson: F([
      { key: 'opportunite', label: 'Opportunité / produit évalué', type: 'text', required: true },
      { key: 'adequation', label: 'Adéquation avec vos objectifs (expérience, investissement, revenu, réalisation personnelle)', type: 'textarea', required: true },
      { key: 'rentabilite', label: 'Potentiel de rentabilité et de croissance estimé', type: 'textarea', required: true },
      { key: 'risque', label: 'Niveau de risque et temps de travail nécessaire (acceptabilité)', type: 'textarea', required: true },
      { key: 'produit', label: 'Potentiel du produit (adéquation au marché cible, compétitivité prix, demande, spécificités)', type: 'textarea', required: true },
      { key: 'recommandation', label: 'Conclusion et recommandation (poursuivre / écarter / approfondir)', type: 'textarea', required: true },
    ]),
    body: `<div class="contrat"><h1>ANALYSE D’OPPORTUNITÉ D’AFFAIRES</h1><p><strong>Opportunité évaluée :</strong> {{opportunite}}<br/><strong>Date :</strong> {{date_jour}}</p><p>Cette fiche aide à évaluer les chances de succès d’un projet d’affaires en appréciant l’opportunité au regard des objectifs de l’entrepreneur, de son potentiel de rentabilité, du niveau de risque et du potentiel du produit sur son marché.</p><h2>1. Adéquation avec vos objectifs</h2><p>{{adequation}}</p><h2>2. Potentiel de rentabilité et de croissance</h2><p>{{rentabilite}}</p><h2>3. Niveau de risque et charge de travail</h2><p>{{risque}}</p><h2>4. Potentiel du produit</h2><p>{{produit}}</p><h2>5. Conclusion et recommandation</h2><p>{{recommandation}}</p><p class="signatures">Réalisé le {{date_jour}}</p></div>`,
    popularity: 28,
  },
  {
    code: 'strat_matrice_bcg', name: 'Matrice BCG (portefeuille d’activités)', category: 'commercial_financier', price: 2000, priceMax: 4000,
    description: 'Trame d’analyse de portefeuille selon la matrice BCG : classement des activités en vedettes, vaches à lait, dilemmes et poids morts, avec décisions d’allocation de ressources.',
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise / portefeuille analysé', type: 'text', required: true },
      { key: 'vedettes', label: 'Vedettes (forte croissance, forte part de marché)', type: 'textarea', required: true },
      { key: 'vaches', label: 'Vaches à lait (faible croissance, forte part de marché)', type: 'textarea', required: true },
      { key: 'dilemmes', label: 'Dilemmes / points d’interrogation (forte croissance, faible part de marché)', type: 'textarea', required: true },
      { key: 'poids_morts', label: 'Poids morts (faible croissance, faible part de marché)', type: 'textarea', required: true },
      { key: 'decisions', label: 'Décisions d’allocation des ressources (investir, maintenir, récolter, abandonner)', type: 'textarea', required: true },
    ]),
    body: `<div class="contrat"><h1>MATRICE BCG — ANALYSE DE PORTEFEUILLE</h1><p><strong>Entreprise :</strong> {{entreprise}}<br/><strong>Date :</strong> {{date_jour}}</p><p>La matrice BCG positionne chaque domaine d’activité selon deux axes — le taux de croissance du marché et la part de marché relative — afin d’orienter les décisions d’allocation des ressources.</p><h2>1. Vedettes</h2><p>{{vedettes}}</p><h2>2. Vaches à lait</h2><p>{{vaches}}</p><h2>3. Dilemmes</h2><p>{{dilemmes}}</p><h2>4. Poids morts</h2><p>{{poids_morts}}</p><h2>5. Décisions d’allocation des ressources</h2><p>{{decisions}}</p><p class="signatures">Réalisé le {{date_jour}}<br/><br/>Pour {{entreprise}}</p></div>`,
    popularity: 30,
  },

  // ════════════════════════ DÉPLOIEMENT & PILOTAGE ════════════════════════
  {
    code: 'strat_objectifs_smart', name: 'Fiche de fixation d’objectifs stratégiques (SMART)', category: 'commercial_financier', price: 1500, priceMax: 3000,
    description: 'Fiche de fixation d’objectifs de gestion : objectifs SMART, moyens de mise en œuvre, objectifs quantitatifs et qualitatifs à court et moyen terme, suivi et commentaires.',
    fieldsJson: F([
      { key: 'projet', label: 'Nom et description du projet / de l’activité', type: 'textarea', required: true },
      { key: 'responsable', label: 'Responsable', type: 'text', required: true },
      { key: 'objectifs', label: 'Objectif(s) (réalistes, mesurables, dotés d’une échéance)', type: 'textarea', required: true },
      { key: 'moyens', label: 'Moyens de mise en œuvre (où, quand, comment)', type: 'textarea', required: true },
      { key: 'quantitatifs', label: 'Objectifs quantitatifs (ventes, bénéfice, part de marché, effectif… à 1 et 3 ans)', type: 'textarea', required: true },
      { key: 'qualitatifs', label: 'Objectifs qualitatifs (état du marché, cibles, style de gestion…)', type: 'textarea', required: true },
      { key: 'suivi', label: 'Prochaine rencontre de suivi et commentaires', type: 'textarea', required: false },
    ]),
    body: `<div class="contrat"><h1>FICHE DE FIXATION D’OBJECTIFS</h1><p><strong>Date :</strong> {{date_jour}}<br/><strong>Responsable :</strong> {{responsable}}</p><h2>1. Projet / activité</h2><p>{{projet}}</p><h2>2. Objectif(s)</h2><p>Les objectifs sont formulés de manière réaliste et mesurable, et dotés d’une échéance précise.</p><p>{{objectifs}}</p><h2>3. Moyens (où, quand, comment)</h2><p>{{moyens}}</p><h2>4. Objectifs quantitatifs (horizon 1 an et 3 ans)</h2><p>{{quantitatifs}}</p><h2>5. Objectifs qualitatifs</h2><p>{{qualitatifs}}</p><h2>6. Suivi et commentaires</h2><p>{{suivi}}</p><p class="signatures">Établi le {{date_jour}}<br/><br/>{{responsable}}</p></div>`,
    popularity: 32,
  },
  {
    code: 'strat_plan_action', name: 'Plan d’action stratégique', category: 'commercial_financier', price: 2000, priceMax: 4000,
    description: 'Plan d’action déclinant la stratégie en initiatives concrètes : objectif, actions, responsables, échéances, ressources, indicateurs de suivi et modalités de reporting.',
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise / service', type: 'text', required: true },
      { key: 'objectif', label: 'Objectif stratégique visé par ce plan d’action', type: 'textarea', required: true },
      { key: 'actions', label: 'Actions / initiatives à mener (liste)', type: 'textarea', required: true },
      { key: 'responsables', label: 'Responsables et contributeurs par action', type: 'textarea', required: true },
      { key: 'echeances', label: 'Échéances et jalons', type: 'textarea', required: true },
      { key: 'ressources', label: 'Ressources et budget mobilisés', type: 'textarea', required: true },
      { key: 'indicateurs', label: 'Indicateurs de suivi et modalités de reporting', type: 'textarea', required: true },
    ]),
    body: `<div class="contrat"><h1>PLAN D’ACTION STRATÉGIQUE</h1><p><strong>Entreprise / service :</strong> {{entreprise}}<br/><strong>Date :</strong> {{date_jour}}</p><h2>1. Objectif stratégique visé</h2><p>{{objectif}}</p><h2>2. Actions à mener</h2><p>{{actions}}</p><h2>3. Responsables et contributeurs</h2><p>{{responsables}}</p><h2>4. Échéances et jalons</h2><p>{{echeances}}</p><h2>5. Ressources et budget</h2><p>{{ressources}}</p><h2>6. Indicateurs de suivi et reporting</h2><p>{{indicateurs}}</p><p class="text-small">Chaque action est suivie lors des points d’avancement ; les écarts par rapport aux échéances sont documentés et donnent lieu à des mesures correctives.</p><p class="signatures">Établi le {{date_jour}}<br/><br/>Pour {{entreprise}}</p></div>`,
    popularity: 42,
  },
  {
    code: 'strat_feuille_route', name: 'Feuille de route stratégique', category: 'commercial_financier', price: 2000, priceMax: 4000,
    description: 'Feuille de route séquençant les grands chantiers stratégiques dans le temps : ambition, phases et jalons, livrables, dépendances, ressources et facteurs clés de succès.',
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise / programme', type: 'text', required: true },
      { key: 'horizon', label: 'Horizon de la feuille de route (ex. 2026-2028)', type: 'text', required: true },
      { key: 'ambition', label: 'Ambition et objectifs cibles', type: 'textarea', required: true },
      { key: 'phases', label: 'Phases et jalons (court, moyen, long terme) avec chantiers associés', type: 'textarea', required: true },
      { key: 'livrables', label: 'Livrables clés par phase', type: 'textarea', required: true },
      { key: 'dependances', label: 'Dépendances, prérequis et ressources nécessaires', type: 'textarea', required: true },
      { key: 'fcs', label: 'Facteurs clés de succès et risques à surveiller', type: 'textarea', required: true },
    ]),
    body: `<div class="contrat"><h1>FEUILLE DE ROUTE STRATÉGIQUE</h1><p><strong>Entreprise / programme :</strong> {{entreprise}}<br/><strong>Horizon :</strong> {{horizon}}<br/><strong>Date :</strong> {{date_jour}}</p><h2>1. Ambition et objectifs cibles</h2><p>{{ambition}}</p><h2>2. Phases et jalons</h2><p>{{phases}}</p><h2>3. Livrables clés par phase</h2><p>{{livrables}}</p><h2>4. Dépendances, prérequis et ressources</h2><p>{{dependances}}</p><h2>5. Facteurs clés de succès et risques</h2><p>{{fcs}}</p><p class="signatures">Établie le {{date_jour}}<br/><br/>Pour {{entreprise}}</p></div>`,
    popularity: 34,
  },
  {
    code: 'strat_tableau_bord', name: 'Tableau de bord stratégique (trame narrative)', category: 'commercial_financier', price: 2000, priceMax: 4500,
    description: 'Trame narrative de tableau de bord stratégique organisée par axes (financier, client, processus internes, apprentissage) : objectifs, indicateurs, cibles, résultats et actions.',
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise / service', type: 'text', required: true },
      { key: 'periode', label: 'Période couverte (ex. T1 2026)', type: 'text', required: true },
      { key: 'axe_financier', label: 'Axe Financier — objectifs, indicateurs, cibles, résultats', type: 'textarea', required: true },
      { key: 'axe_client', label: 'Axe Client — objectifs, indicateurs, cibles, résultats', type: 'textarea', required: true },
      { key: 'axe_processus', label: 'Axe Processus internes — objectifs, indicateurs, cibles, résultats', type: 'textarea', required: true },
      { key: 'axe_apprentissage', label: 'Axe Apprentissage & innovation — objectifs, indicateurs, cibles, résultats', type: 'textarea', required: true },
      { key: 'actions', label: 'Synthèse des écarts et actions correctives', type: 'textarea', required: true },
    ]),
    body: `<div class="contrat"><h1>TABLEAU DE BORD STRATÉGIQUE</h1><p><strong>Entreprise / service :</strong> {{entreprise}}<br/><strong>Période :</strong> {{periode}}<br/><strong>Date d’édition :</strong> {{date_jour}}</p><p>Ce tableau de bord suit la performance stratégique selon quatre axes complémentaires. Pour chaque axe sont précisés les objectifs, les indicateurs clés, les cibles et les résultats constatés.</p><h2>1. Axe Financier</h2><p>{{axe_financier}}</p><h2>2. Axe Client</h2><p>{{axe_client}}</p><h2>3. Axe Processus internes</h2><p>{{axe_processus}}</p><h2>4. Axe Apprentissage et innovation</h2><p>{{axe_apprentissage}}</p><h2>5. Synthèse des écarts et actions correctives</h2><p>{{actions}}</p><p class="signatures">Édité le {{date_jour}}<br/><br/>Pour {{entreprise}}</p></div>`,
    popularity: 38,
  },
  {
    code: 'strat_strategie_service', name: 'Définition de la stratégie de service', category: 'commercial_financier', price: 1500, priceMax: 3500,
    description: 'Trame de définition d’une stratégie de service : mission, attentes des clients par segment, image visée, éléments de différenciation et expérience client cible.',
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise', type: 'text', required: true },
      { key: 'mission', label: 'Définition de la mission de service', type: 'textarea', required: true },
      { key: 'attentes', label: 'Attentes des clients (segments servis, besoins, types de services attendus)', type: 'textarea', required: true },
      { key: 'image', label: 'Image visée (perception dans la communauté, services offerts, valeur ajoutée)', type: 'textarea', required: true },
      { key: 'differenciation', label: 'Différenciation (ce qui vous distingue, attentes que vous pouvez dépasser)', type: 'textarea', required: true },
      { key: 'experience', label: 'Expérience client cible (ce que vous voulez que les clients ressentent et disent)', type: 'textarea', required: true },
    ]),
    body: `<div class="contrat"><h1>STRATÉGIE DE SERVICE</h1><p><strong>Entreprise :</strong> {{entreprise}}<br/><strong>Date :</strong> {{date_jour}}</p><h2>1. Mission de service</h2><p>{{mission}}</p><h2>2. Attentes des clients</h2><p>{{attentes}}</p><h2>3. Image visée</h2><p>{{image}}</p><h2>4. Différenciation</h2><p>{{differenciation}}</p><h2>5. Expérience client cible</h2><p>{{experience}}</p><p class="text-small">La stratégie de service traduit la promesse de l’entreprise en une expérience concrète, cohérente et différenciante à chaque point de contact avec le client.</p><p class="signatures">Définie le {{date_jour}}<br/><br/>Pour {{entreprise}}</p></div>`,
    popularity: 26,
  },
  {
    code: 'strat_plan_dev_commercial', name: 'Plan de développement commercial', category: 'commercial_financier', price: 2500, priceMax: 5000,
    description: 'Plan de développement commercial : objectifs de vente, marchés et segments cibles, offre et positionnement, actions commerciales et marketing, moyens et indicateurs de performance.',
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise', type: 'text', required: true },
      { key: 'objectifs', label: 'Objectifs commerciaux (chiffre d’affaires, nombre de clients, part de marché…)', type: 'textarea', required: true },
      { key: 'cibles', label: 'Marchés et segments cibles', type: 'textarea', required: true },
      { key: 'offre', label: 'Offre et positionnement (proposition de valeur, différenciation, prix)', type: 'textarea', required: true },
      { key: 'actions', label: 'Actions commerciales et marketing (prospection, canaux, promotion, fidélisation)', type: 'textarea', required: true },
      { key: 'moyens', label: 'Moyens (équipe commerciale, budget, outils)', type: 'textarea', required: true },
      { key: 'indicateurs', label: 'Indicateurs de performance et suivi', type: 'textarea', required: true },
    ]),
    body: `<div class="contrat"><h1>PLAN DE DÉVELOPPEMENT COMMERCIAL</h1><p><strong>Entreprise :</strong> {{entreprise}}<br/><strong>Date :</strong> {{date_jour}}</p><h2>1. Objectifs commerciaux</h2><p>{{objectifs}}</p><h2>2. Marchés et segments cibles</h2><p>{{cibles}}</p><h2>3. Offre et positionnement</h2><p>{{offre}}</p><h2>4. Actions commerciales et marketing</h2><p>Ce plan mobilise, selon les cibles, des stratégies de segmentation, de différenciation et de positionnement, ainsi que les leviers du mix marketing (produit, prix, distribution, promotion) et de fidélisation de la clientèle.</p><p>{{actions}}</p><h2>5. Moyens</h2><p>{{moyens}}</p><h2>6. Indicateurs de performance et suivi</h2><p>{{indicateurs}}</p><p class="signatures">Établi le {{date_jour}}<br/><br/>Pour {{entreprise}}</p></div>`,
    popularity: 44,
  },
  {
    code: 'strat_session_planification', name: 'Guide de séance de planification stratégique', category: 'commercial_financier', price: 1500, priceMax: 3000,
    description: 'Trame d’organisation et de compte rendu d’une séance de planification stratégique : participants, ordre du jour, sujets et impacts, décisions, plan d’actions et suivi.',
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise', type: 'text', required: true },
      { key: 'date_seance', label: 'Date et lieu de la séance', type: 'text', required: true },
      { key: 'participants', label: 'Participants (managers, chefs de service…)', type: 'textarea', required: true },
      { key: 'ordre_jour', label: 'Ordre du jour (sujets à traiter)', type: 'textarea', required: true },
      { key: 'echanges', label: 'Sujets abordés : synthèse des échanges et impact stratégique', type: 'textarea', required: true },
      { key: 'decisions', label: 'Décisions et nouvelles stratégies retenues', type: 'textarea', required: true },
      { key: 'plan_suivi', label: 'Plan d’actions et séances de suivi (responsables, échéances)', type: 'textarea', required: true },
    ]),
    body: `<div class="contrat"><h1>SÉANCE DE PLANIFICATION STRATÉGIQUE</h1><p><strong>Entreprise :</strong> {{entreprise}}<br/><strong>Date et lieu :</strong> {{date_seance}}<br/><strong>Compte rendu établi le :</strong> {{date_jour}}</p><p>La séance de planification stratégique, tenue au moins une fois par an, réunit les managers et chefs de service afin d’évaluer les objectifs passés et de développer de nouvelles stratégies fondées sur l’analyse du marché. Chacun dispose d’une voix égale en matière de suggestions et de critiques.</p><h2>1. Participants</h2><p>{{participants}}</p><h2>2. Ordre du jour</h2><p>{{ordre_jour}}</p><h2>3. Sujets abordés et impact stratégique</h2><p>{{echanges}}</p><h2>4. Décisions et stratégies retenues</h2><p>{{decisions}}</p><h2>5. Plan d’actions et suivi</h2><p>Pour chaque sujet, un plan des actions spécifiques est arrêté et des séances de suivi sont prévues pour évaluer les progrès réalisés.</p><p>{{plan_suivi}}</p><p class="signatures">Établi le {{date_jour}}<br/><br/>Pour {{entreprise}}</p></div>`,
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

  console.log('✅ Seed Drive — Stratégie d\'entreprise terminé.');
  console.log(`   Templates du script : ${templates.length} (créés : ${created}, mis à jour : ${updated})`);
  console.log('   Répartition par catégorie (ce script) :');
  for (const [cat, n] of Object.entries(byCategory)) console.log(`     - ${cat} : ${n}`);
  console.log(`   ➜ Total de templates en base : ${total}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
