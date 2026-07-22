// Seed Drive4 Gestion & Management des risques — Agent Drive4-5/10.
// Source : KIT DE GESTION ET MANAGEMENT DES RISQUES (Drive IBIG, parentId 154vbo7LJ8qM3ymSOyQ497vDHxLzRT55Q).
// Le kit Drive ne contient que 3 modèles .docx exploitables (plan de gestion des risques,
// matrice de gestion des risques, modèle de matrice d'évaluation des risques) — les 2 matrices
// ont été FUSIONNÉES en une trame de criticité unique. Le reste du Drive étant des classeurs
// .xlsx/.xlsm et des livres PDF (ignorés), les modèles manquants du management des risques
// d'entreprise ont été complétés à partir des standards ISO 31000 / COSO ERM (signalé au rapport).
// Périmètre : MANAGEMENT des risques d'entreprise — ni assurance (assur_*) ni sécurité chantier (qhse_*).
// Script ADDITIF : upsert par code — n'écrase aucun template existant.
// Exécution : npx tsx prisma/seed-drive4-risques.ts
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

const RISK_COUNTRIES = JSON.stringify({
  OHADA: { note: 'Référentiels ISO 31000 (management du risque) et COSO ERM ; le dispositif de contrôle interne des sociétés relève de l’AUSCGIE et, pour les entités réglementées, des instructions sectorielles (BCEAO/COBAC, CIMA).' },
  FR: { note: 'ISO 31000 et cadre COSO ERM ; pour les sociétés cotées, dispositif de gestion des risques et de contrôle interne au sens de l’AMF (art. L.225-100 s. du Code de commerce).' },
});

const templates: DriveTemplate[] = [
  // ════════════════ MODÈLES ISSUS DU DRIVE (2 après fusion) ════════════════
  {
    code: 'risk_plan_gestion',
    name: 'Plan de gestion des risques (entreprise / projet)',
    category: 'juridique_admin',
    price: 4000, priceMax: 6000,
    description: 'Plan de gestion des risques structuré : propriété du projet, versions, processus, besoins en ressources, rôles et responsabilités, impact financier et calendaire, surveillance, catégories de risque, matrice d’évaluation, matrice de classement des mesures d’atténuation et tolérances des parties prenantes.',
    fieldsJson: F([
      { key: 'entreprise', label: 'Nom de l’entreprise', type: 'text', required: true },
      { key: 'projet', label: 'Nom du projet / périmètre couvert', type: 'text', required: true },
      { key: 'apercu', label: 'Aperçu du projet ou du périmètre', type: 'textarea', required: true },
      { key: 'chef_projet', label: 'Nom du chef de projet / responsable des risques', type: 'text', required: true },
      { key: 'coordonnees', label: 'Coordonnées du responsable (téléphone, e-mail, adresse)', type: 'textarea', required: true },
      { key: 'version', label: 'Version du plan', type: 'text', required: true },
      { key: 'processus', label: 'Processus / approche de gestion des risques retenue', type: 'textarea', required: true },
      { key: 'ressources', label: 'Besoins en ressources (outils, données, équipe)', type: 'textarea', required: true },
      { key: 'roles', label: 'Rôles et responsabilités (une ligne par activité)', type: 'textarea', required: true },
      { key: 'frais_initiaux', label: 'Frais initiaux estimés (avec la devise)', type: 'text', required: false },
      { key: 'frais_recurrents', label: 'Frais récurrents estimés (avec la devise)', type: 'text', required: false },
      { key: 'categories', label: 'Catégories de risque retenues', type: 'textarea', required: true },
      { key: 'frequence_surveillance', label: 'Fréquence des examens et de la surveillance', type: 'text', required: true },
      { key: 'tolerances', label: 'Tolérances des parties prenantes (délais et réserves pour imprévus)', type: 'textarea', required: true },
      { key: 'prepare_par', label: 'Préparé par', type: 'text', required: true },
      { key: 'approuve_par', label: 'Approuvé par', type: 'text', required: true },
    ]),
    body: `<div class="document"><h1>PLAN DE GESTION DES RISQUES</h1><p><strong>{{entreprise}}</strong> — {{projet}}<br/>Version {{version}} — {{date_jour}}</p><p>Préparé par : {{prepare_par}} — Approuvé par : {{approuve_par}}</p><h2>1. Propriété du projet</h2><p><strong>Nom du projet :</strong> {{projet}}</p><p><strong>Aperçu :</strong> {{apercu}}</p><p><strong>Chef de projet / responsable des risques :</strong> {{chef_projet}}</p><p><strong>Coordonnées :</strong> {{coordonnees}}</p><h2>2. Version du plan</h2><p>Le présent plan est maintenu sous contrôle de version. Chaque révision précise la version, la date, l’auteur, la raison de la modification, les sections touchées et la liste de distribution.</p><h2>3. Processus de gestion des risques</h2><p>{{processus}}</p><p>Le processus couvre l’identification, l’analyse, l’évaluation, le traitement, la surveillance et la communication des risques, de façon itérative sur toute la durée du périmètre.</p><h2>4. Besoins en ressources</h2><p>{{ressources}}</p><h2>5. Rôles et responsabilités</h2><p>Pour chaque activité du plan, les parties responsables et leurs responsabilités sont définies comme suit :</p><p>{{roles}}</p><h2>6. Impact financier</h2><p>Estimation des fonds nécessaires et impact budgétaire — Frais initiaux : {{frais_initiaux}} ; Frais récurrents : {{frais_recurrents}}. La méthodologie de tarification et les hypothèses retenues sont documentées et l’incidence budgétaire est validée par le responsable financier.</p><h2>7. Impact sur la chronologie</h2><p>Tout impact sur le calendrier de planification (dates de début et de fin ajustées) est décrit et suivi.</p><h2>8. Surveillance des risques</h2><p><strong>Fréquence des examens et de la surveillance :</strong> {{frequence_surveillance}}. Les examens vérifient les problèmes qui ont pu se propager ; les parties responsables de l’examen et du reporting sont désignées.</p><h2>9. Catégories de risque</h2><p>{{categories}}</p><h2>10. Matrice d’évaluation des risques</h2><p>Chaque risque est coté selon sa <strong>probabilité</strong> (improbable, possible, probable) et sa <strong>gravité</strong> (acceptable, tolérable, indésirable, intolérable). Le croisement donne un niveau de risque : bas, moyen, élevé ou extrême, associé à une clé d’action (OK pour continuer, prendre des mesures d’atténuation, demander de l’aide, mettre l’événement en attente).</p><h2>11. Matrice de classement des mesures d’atténuation</h2><p>Chaque risque se voit attribuer une note (A, B, C, D, N) déterminant l’action : (A) mesures réduisant probabilité et gravité identifiées et mises en œuvre en priorité au début du projet ; (B) mesures identifiées et mises en œuvre tout au long du projet ; (C) mesures identifiées et chiffrées en vue d’une action éventuelle si les fonds le permettent ; (D) et (N) risque à noter, sans mesure requise sauf aggravation du classement.</p><h2>12. Tolérances des parties prenantes</h2><p>{{tolerances}}</p><h2>13. Pièces jointes</h2><p>Registre des risques, matrice de criticité, plans de traitement et tout document de référence sont annexés (nom du fichier, format, description).</p><p class="signatures">Préparé par : {{prepare_par}} — Date : {{date_jour}}<br/>Revu par : ______________________ — Date : ____________<br/>Approuvé par : {{approuve_par}} — Date : ____________</p></div>`,
    popularity: 40,
    countriesJson: RISK_COUNTRIES,
  },
  {
    code: 'risk_matrice_criticite',
    name: 'Matrice de criticité et d’évaluation des risques (trame)',
    category: 'juridique_admin',
    price: 2000, priceMax: 4000,
    description: 'Trame de matrice de criticité fusionnant l’évaluation des risques (probabilité × gravité) et le suivi pré/post-atténuation : clé de cotation, niveaux de risque, mesures d’atténuation et décision d’acceptation. Support d’atelier de cotation des risques.',
    fieldsJson: F([
      { key: 'entite', label: 'Entité / département évalué', type: 'text', required: true },
      { key: 'objectif', label: 'Objectif de l’évaluation', type: 'textarea', required: true },
      { key: 'echelle_gravite', label: 'Échelle de gravité retenue (ex. acceptable, tolérable, indésirable, intolérable)', type: 'textarea', required: true },
      { key: 'echelle_probabilite', label: 'Échelle de probabilité retenue (ex. improbable, possible, probable)', type: 'textarea', required: true },
      { key: 'seuil_acceptation', label: 'Seuil d’acceptation du risque (niveau à partir duquel une action est requise)', type: 'text', required: true },
      { key: 'risques', label: 'Liste des risques à coter (une ligne par risque : réf, risque, département)', type: 'textarea', required: true },
      { key: 'responsable', label: 'Responsable de la cotation', type: 'text', required: true },
    ]),
    body: `<div class="document"><h1>MATRICE DE CRITICITÉ ET D’ÉVALUATION DES RISQUES</h1><p><strong>Entité :</strong> {{entite}} — <strong>Date :</strong> {{date_jour}} — <strong>Responsable :</strong> {{responsable}}</p><p><strong>Objectif :</strong> {{objectif}}</p><h2>1. Clé de cotation des risques</h2><p><strong>Gravité (Severity) :</strong> {{echelle_gravite}}. À titre indicatif : ACCEPTABLE (peu ou pas d’effet) → TOLÉRABLE (effets ressentis, non essentiels) → INDÉSIRABLE (impact sérieux sur le plan d’action et les résultats) → INTOLÉRABLE (pourrait entraîner une catastrophe).</p><p><strong>Probabilité (Likelihood) :</strong> {{echelle_probabilite}}. À titre indicatif : IMPROBABLE (il est peu probable que le risque se produise) → POSSIBLE (risque probable) → PROBABLE (le risque se produira).</p><h2>2. Niveau de risque (croisement probabilité × gravité)</h2><p>Le croisement de la probabilité et de la gravité détermine le niveau de risque — BAS, MOYEN, ÉLEVÉ ou EXTRÊME — et la clé d’action associée :</p><p>— BAS (0 · Acceptable) : OK pour continuer ;<br/>— MOYEN (1 · ALARP, aussi bas que raisonnablement possible) : prendre des mesures d’atténuation ;<br/>— ÉLEVÉ (2 · généralement inacceptable) : demander de l’aide ;<br/>— EXTRÊME (3 · intolérable) : mettre l’événement en attente.</p><p><strong>Seuil d’acceptation :</strong> {{seuil_acceptation}}.</p><h2>3. Grille de cotation pré-atténuation et post-atténuation</h2><p>Pour chaque risque, renseigner en <strong>pré-atténuation</strong> : gravité, probabilité et niveau de risque. Documenter ensuite les <strong>atténuations / avertissements / remèdes</strong>, le département ou l’emplacement concerné, puis en <strong>post-atténuation</strong> : gravité, probabilité, niveau de risque résiduel et la décision « Acceptable d’aller de l’avant ? » (OUI / NON).</p><table border="1"><thead><tr><th>Réf / ID</th><th>Risque</th><th>Gravité (pré)</th><th>Probabilité (pré)</th><th>Niveau (pré)</th><th>Département</th><th>Atténuations / remèdes</th><th>Gravité (post)</th><th>Probabilité (post)</th><th>Niveau résiduel</th><th>Acceptable ? (O/N)</th></tr></thead><tbody><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table><h2>4. Risques à coter</h2><p>{{risques}}</p><p class="signatures">Établi le {{date_jour}} par {{responsable}}.<br/>Validé par : ______________________</p></div>`,
    popularity: 42,
    countriesJson: RISK_COUNTRIES,
  },

  // ════════════════ GOUVERNANCE & POLITIQUE DU RISQUE (4) ════════════════
  {
    code: 'risk_politique',
    name: 'Politique de management des risques',
    category: 'juridique_admin',
    price: 3000, priceMax: 5000,
    description: 'Politique-cadre de management des risques : objectifs, périmètre, principes ISO 31000, appétence au risque, organisation et responsabilités, processus, communication et révision. Document de référence adopté par la direction.',
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise (raison sociale + siège)', type: 'textarea', required: true },
      { key: 'objectifs', label: 'Objectifs de la politique', type: 'textarea', required: true },
      { key: 'perimetre', label: 'Périmètre d’application (entités, activités concernées)', type: 'textarea', required: true },
      { key: 'appetence', label: 'Appétence globale au risque (posture de l’entreprise)', type: 'textarea', required: true },
      { key: 'organisation', label: 'Organisation et responsabilités (direction, comité des risques, risk manager, opérationnels)', type: 'textarea', required: true },
      { key: 'frequence_revue', label: 'Fréquence de révision de la politique', type: 'text', required: true },
      { key: 'approbateur', label: 'Organe d’approbation (ex. conseil d’administration, direction générale)', type: 'text', required: true },
    ]),
    body: `<div class="document"><h1>POLITIQUE DE MANAGEMENT DES RISQUES</h1><p><strong>{{entreprise}}</strong><br/>Adoptée le {{date_jour}} — Approuvée par : {{approbateur}}</p><h2>1. Objet et objectifs</h2><p>{{objectifs}}</p><p>La présente politique établit le cadre par lequel {{entreprise}} identifie, analyse, évalue, traite, surveille et communique ses risques afin de protéger sa valeur, la continuité de ses activités et la réalisation de ses objectifs stratégiques et opérationnels.</p><h2>2. Périmètre</h2><p>{{perimetre}}</p><h2>3. Principes directeurs</h2><p>Le management des risques s’appuie sur les principes du référentiel ISO 31000 : il est intégré à la gouvernance et aux processus décisionnels, structuré et exhaustif, adapté au contexte, inclusif, dynamique, fondé sur la meilleure information disponible, tient compte des facteurs humains et culturels, et fait l’objet d’une amélioration continue.</p><h2>4. Appétence au risque</h2><p>{{appetence}}</p><p>L’appétence traduit le niveau de risque que l’entreprise est prête à accepter dans la poursuite de ses objectifs ; elle est déclinée par catégorie de risque en seuils de tolérance opérationnels.</p><h2>5. Organisation et responsabilités</h2><p>{{organisation}}</p><p>Le dispositif s’articule autour des trois lignes de maîtrise : les opérationnels (première ligne) qui possèdent et gèrent les risques ; les fonctions de pilotage et de conformité (deuxième ligne) qui définissent le cadre et surveillent ; l’audit interne (troisième ligne) qui fournit une assurance indépendante.</p><h2>6. Processus de management des risques</h2><p>Le processus couvre l’établissement du contexte, l’identification des risques, leur analyse (probabilité et impact), leur évaluation au regard des critères d’acceptation, leur traitement (éviter, réduire, transférer, accepter), puis la surveillance, la revue et la communication.</p><h2>7. Communication et remontée d’information</h2><p>Les risques significatifs et les incidents sont remontés selon la procédure d’escalade en vigueur. Un reporting périodique est présenté à la direction et à l’organe de gouvernance.</p><h2>8. Révision</h2><p>La présente politique est révisée {{frequence_revue}}, et à chaque évolution majeure du contexte, de l’organisation ou de la réglementation.</p><p class="signatures">Fait le {{date_jour}}.<br/>Pour {{entreprise}} — {{approbateur}}<br/>Signature : ______________________</p></div>`,
    popularity: 38,
    countriesJson: RISK_COUNTRIES,
  },
  {
    code: 'risk_charte',
    name: 'Charte de gestion des risques et du comité des risques',
    category: 'juridique_admin',
    price: 2500, priceMax: 4500,
    description: 'Charte de gouvernance des risques : mission, composition et fonctionnement du comité des risques, missions du risk manager, mandats, périodicité des réunions, reporting et règles de confidentialité.',
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise (raison sociale + siège)', type: 'textarea', required: true },
      { key: 'mission', label: 'Mission du dispositif de gestion des risques', type: 'textarea', required: true },
      { key: 'composition', label: 'Composition du comité des risques (fonctions membres)', type: 'textarea', required: true },
      { key: 'president', label: 'Président du comité des risques', type: 'text', required: true },
      { key: 'risk_manager', label: 'Fonction du responsable des risques (risk manager)', type: 'text', required: true },
      { key: 'frequence_reunions', label: 'Fréquence des réunions du comité', type: 'text', required: true },
      { key: 'quorum', label: 'Règle de quorum et de prise de décision', type: 'textarea', required: true },
    ]),
    body: `<div class="document"><h1>CHARTE DE GESTION DES RISQUES</h1><p><strong>{{entreprise}}</strong> — En vigueur à compter du {{date_jour}}</p><h2>1. Objet et mission</h2><p>{{mission}}</p><p>La présente charte définit la gouvernance du management des risques et le fonctionnement du comité des risques.</p><h2>2. Composition du comité des risques</h2><p>{{composition}}</p><p>Le comité est présidé par : {{president}}. Le responsable des risques ({{risk_manager}}) en assure le secrétariat et l’animation.</p><h2>3. Missions du comité</h2><p>Le comité : valide la politique et l’appétence au risque ; examine la cartographie et le registre des risques majeurs ; approuve les plans de traitement et en suit l’avancement ; analyse les incidents significatifs et les enseignements tirés ; s’assure de l’adéquation des ressources ; rend compte à l’organe de gouvernance.</p><h2>4. Missions du responsable des risques</h2><p>Le risk manager coordonne le dispositif, tient à jour la cartographie et le registre, méthodologie et outils à l’appui, forme et sensibilise les opérationnels, consolide le reporting et alerte sans délai en cas de risque critique.</p><h2>5. Fonctionnement</h2><p>Le comité se réunit {{frequence_reunions}} et en séance extraordinaire à la demande de son président ou du risk manager. Quorum et décisions : {{quorum}}. Un compte rendu est établi et diffusé aux membres.</p><h2>6. Reporting et confidentialité</h2><p>Les travaux du comité donnent lieu à un rapport périodique à la direction générale et à l’organe de gouvernance. Les membres sont tenus à une stricte confidentialité sur les informations examinées.</p><h2>7. Révision</h2><p>La présente charte est revue au moins une fois par an et adaptée en tant que de besoin.</p><p class="signatures">Adoptée le {{date_jour}}.<br/>Le Président du comité des risques : {{president}}<br/>Signature : ______________________</p></div>`,
    popularity: 30,
    countriesJson: RISK_COUNTRIES,
  },
  {
    code: 'risk_appetence',
    name: 'Déclaration d’appétence au risque (risk appetite statement)',
    category: 'juridique_admin',
    price: 2500, priceMax: 4500,
    description: 'Déclaration formelle de l’appétence au risque de l’entreprise : posture globale, déclinaison par catégorie de risque, seuils de tolérance et limites, indicateurs de suivi et modalités de gouvernance. Support de pilotage stratégique.',
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise (raison sociale + siège)', type: 'textarea', required: true },
      { key: 'posture_globale', label: 'Posture globale face au risque (prudente, équilibrée, offensive…)', type: 'textarea', required: true },
      { key: 'categories_seuils', label: 'Déclinaison par catégorie (stratégique, financier, opérationnel, conformité, réputation…) avec seuils de tolérance', type: 'textarea', required: true },
      { key: 'limites', label: 'Limites et interdits (risques non acceptables en toutes circonstances)', type: 'textarea', required: true },
      { key: 'indicateurs', label: 'Indicateurs de suivi de l’appétence (KRI)', type: 'textarea', required: true },
      { key: 'approbateur', label: 'Organe d’approbation', type: 'text', required: true },
      { key: 'frequence_revue', label: 'Fréquence de révision', type: 'text', required: true },
    ]),
    body: `<div class="document"><h1>DÉCLARATION D’APPÉTENCE AU RISQUE</h1><p><strong>{{entreprise}}</strong><br/>Approuvée le {{date_jour}} par : {{approbateur}}</p><h2>1. Objet</h2><p>La présente déclaration exprime le niveau et le type de risques que {{entreprise}} est disposée à accepter dans la poursuite de ses objectifs. Elle oriente la prise de décision, l’allocation des ressources et le pilotage des risques à tous les niveaux.</p><h2>2. Posture globale</h2><p>{{posture_globale}}</p><h2>3. Appétence par catégorie de risque</h2><p>{{categories_seuils}}</p><p>Pour chaque catégorie, le seuil de tolérance distingue la zone acceptable (poursuite normale), la zone de vigilance (mesures d’atténuation et surveillance renforcée) et la zone inacceptable (action corrective immédiate et escalade).</p><h2>4. Limites et risques non acceptables</h2><p>{{limites}}</p><h2>5. Indicateurs de suivi (KRI)</h2><p>{{indicateurs}}</p><p>Le dépassement d’un seuil déclenche la procédure d’escalade prévue au dispositif de gestion des risques.</p><h2>6. Gouvernance et révision</h2><p>L’appétence est proposée par le comité des risques, approuvée par {{approbateur}}, communiquée au management et révisée {{frequence_revue}} ou en cas d’évolution significative du contexte.</p><p class="signatures">Fait le {{date_jour}}.<br/>{{approbateur}} — Signature : ______________________</p></div>`,
    popularity: 22,
    countriesJson: RISK_COUNTRIES,
  },

  // ════════════════ IDENTIFICATION & ANALYSE (5) ════════════════
  {
    code: 'risk_cartographie',
    name: 'Cartographie des risques (trame)',
    category: 'juridique_admin',
    price: 3000, priceMax: 5500,
    description: 'Trame méthodologique de cartographie des risques : contexte, méthodologie de cotation, univers et catégories de risques, cotation brute et nette, hiérarchisation, positionnement sur la matrice et plan d’action associé. Livrable central du management des risques.',
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise / entité cartographiée', type: 'text', required: true },
      { key: 'perimetre', label: 'Périmètre et objectifs de la cartographie', type: 'textarea', required: true },
      { key: 'methodologie', label: 'Méthodologie de cotation (échelles de probabilité et d’impact)', type: 'textarea', required: true },
      { key: 'univers_risques', label: 'Univers des risques / familles retenues', type: 'textarea', required: true },
      { key: 'liste_risques', label: 'Liste des risques identifiés (réf, intitulé, famille, propriétaire)', type: 'textarea', required: true },
      { key: 'top_risques', label: 'Risques majeurs à surveiller en priorité (top risques)', type: 'textarea', required: true },
      { key: 'responsable', label: 'Responsable de la cartographie', type: 'text', required: true },
    ]),
    body: `<div class="document"><h1>CARTOGRAPHIE DES RISQUES</h1><p><strong>{{entreprise}}</strong> — Établie le {{date_jour}} par {{responsable}}</p><h2>1. Contexte et périmètre</h2><p>{{perimetre}}</p><h2>2. Méthodologie</h2><p>{{methodologie}}</p><p>Chaque risque est apprécié en <strong>criticité brute</strong> (avant maîtrise) puis en <strong>criticité nette</strong> (après prise en compte des dispositifs de contrôle existants), la criticité résultant du croisement probabilité × impact.</p><h2>3. Univers des risques</h2><p>{{univers_risques}}</p><h2>4. Recensement et cotation des risques</h2><p>{{liste_risques}}</p><table border="1"><thead><tr><th>Réf</th><th>Risque</th><th>Famille</th><th>Propriétaire</th><th>Proba. brute</th><th>Impact brut</th><th>Criticité brute</th><th>Dispositifs existants</th><th>Criticité nette</th></tr></thead><tbody><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table><h2>5. Hiérarchisation et positionnement</h2><p>Les risques sont positionnés sur la matrice de criticité et hiérarchisés du plus au moins critique. Les risques majeurs (top risques) font l’objet d’un plan de traitement dédié.</p><p><strong>Top risques :</strong> {{top_risques}}</p><h2>6. Plan d’action</h2><p>Pour chaque risque majeur : mesures de traitement, propriétaire, échéance et indicateur de suivi. La cartographie est actualisée périodiquement et à chaque évolution significative.</p><p class="signatures">Établie le {{date_jour}} par {{responsable}}.<br/>Validée par : ______________________</p></div>`,
    popularity: 44,
    countriesJson: RISK_COUNTRIES,
  },
  {
    code: 'risk_registre',
    name: 'Registre des risques (trame narrative)',
    category: 'juridique_admin',
    price: 2000, priceMax: 4000,
    description: 'Registre des risques sous forme de trame narrative : identification, description, causes et conséquences, propriétaire, cotation, mesures de maîtrise, risque résiduel, actions et statut de suivi. Journal vivant de la maîtrise des risques.',
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise / périmètre', type: 'text', required: true },
      { key: 'responsable', label: 'Responsable de la tenue du registre', type: 'text', required: true },
      { key: 'risques', label: 'Risques à consigner (réf, description, cause, conséquence, propriétaire)', type: 'textarea', required: true },
      { key: 'frequence_maj', label: 'Fréquence de mise à jour du registre', type: 'text', required: true },
    ]),
    body: `<div class="document"><h1>REGISTRE DES RISQUES</h1><p><strong>{{entreprise}}</strong> — Tenu par {{responsable}} — Mis à jour le {{date_jour}}</p><h2>1. Objet</h2><p>Le présent registre recense de manière vivante l’ensemble des risques identifiés, leur évaluation, les mesures de maîtrise et l’avancement des actions de traitement. Il constitue la mémoire opérationnelle du dispositif de gestion des risques.</p><h2>2. Structure d’une fiche de risque</h2><p>Pour chaque risque consigné : <strong>Référence / ID</strong> ; <strong>Description</strong> (nature de l’événement redouté) ; <strong>Causes</strong> (facteurs déclencheurs) ; <strong>Conséquences</strong> (impacts potentiels) ; <strong>Propriétaire du risque</strong> ; <strong>Cotation</strong> (probabilité, impact, niveau) ; <strong>Mesures de maîtrise existantes</strong> ; <strong>Risque résiduel</strong> ; <strong>Actions de traitement</strong> (avec échéance et responsable) ; <strong>Statut</strong> (ouvert, en cours, maîtrisé, clôturé) ; <strong>Date de dernière revue</strong>.</p><h2>3. Risques consignés</h2><p>{{risques}}</p><table border="1"><thead><tr><th>ID</th><th>Description</th><th>Causes</th><th>Conséquences</th><th>Propriétaire</th><th>Proba.</th><th>Impact</th><th>Niveau</th><th>Mesures de maîtrise</th><th>Risque résiduel</th><th>Actions / échéance</th><th>Statut</th></tr></thead><tbody><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table><h2>4. Mise à jour</h2><p>Le registre est mis à jour {{frequence_maj}} et à chaque survenance ou modification significative d’un risque. Toute modification est datée et tracée.</p><p class="signatures">Tenu par {{responsable}} — Dernière revue le {{date_jour}}.</p></div>`,
    popularity: 41,
    countriesJson: RISK_COUNTRIES,
  },
  {
    code: 'risk_rapport_analyse',
    name: 'Rapport d’analyse de risque',
    category: 'juridique_admin',
    price: 2500, priceMax: 5000,
    description: 'Rapport d’analyse approfondie d’un risque ou d’une décision : contexte, description du risque, méthode d’analyse, scénarios, évaluation de la criticité, options de traitement, recommandation et plan d’action. Support d’aide à la décision.',
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise / commanditaire', type: 'text', required: true },
      { key: 'objet', label: 'Objet de l’analyse (risque, projet ou décision analysé)', type: 'textarea', required: true },
      { key: 'contexte', label: 'Contexte et enjeux', type: 'textarea', required: true },
      { key: 'methode', label: 'Méthode d’analyse utilisée (ex. AMDEC, bow-tie, arbre de causes, scénarios)', type: 'text', required: true },
      { key: 'scenarios', label: 'Scénarios de risque étudiés', type: 'textarea', required: true },
      { key: 'evaluation', label: 'Évaluation de la criticité (probabilité, impact, niveau)', type: 'textarea', required: true },
      { key: 'options', label: 'Options de traitement envisagées', type: 'textarea', required: true },
      { key: 'recommandation', label: 'Recommandation', type: 'textarea', required: true },
      { key: 'auteur', label: 'Auteur du rapport', type: 'text', required: true },
    ]),
    body: `<div class="document"><h1>RAPPORT D’ANALYSE DE RISQUE</h1><p><strong>{{entreprise}}</strong><br/>Objet : {{objet}}<br/>Rédigé le {{date_jour}} par {{auteur}}</p><h2>1. Contexte et enjeux</h2><p>{{contexte}}</p><h2>2. Méthode d’analyse</h2><p>Méthode retenue : {{methode}}. L’analyse identifie les causes, les événements redoutés et les conséquences, puis en apprécie la vraisemblance et la gravité.</p><h2>3. Scénarios étudiés</h2><p>{{scenarios}}</p><h2>4. Évaluation de la criticité</h2><p>{{evaluation}}</p><p>La criticité résulte du croisement de la probabilité d’occurrence et de la gravité des conséquences, comparé aux critères d’acceptation de l’entreprise.</p><h2>5. Options de traitement</h2><p>{{options}}</p><p>Chaque option est appréciée selon son efficacité attendue, son coût, sa faisabilité et le risque résiduel.</p><h2>6. Recommandation</h2><p>{{recommandation}}</p><h2>7. Plan d’action</h2><p>Les actions retenues sont déclinées en mesures, propriétaires, échéances et indicateurs de suivi, et intégrées au registre des risques.</p><p class="signatures">Rédigé le {{date_jour}} par {{auteur}}.<br/>Avis / décision : ______________________</p></div>`,
    popularity: 29,
    countriesJson: RISK_COUNTRIES,
  },
  {
    code: 'risk_plan_traitement',
    name: 'Plan de traitement des risques',
    category: 'juridique_admin',
    price: 2500, priceMax: 4500,
    description: 'Plan de traitement structurant la réponse aux risques : stratégie retenue (éviter, réduire, transférer, accepter), actions de maîtrise, propriétaires, échéances, budget, risque résiduel visé et suivi de l’efficacité.',
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise / périmètre', type: 'text', required: true },
      { key: 'risques_traites', label: 'Risques à traiter (réf, intitulé, niveau)', type: 'textarea', required: true },
      { key: 'strategies', label: 'Stratégies de traitement par risque (éviter, réduire, transférer, accepter)', type: 'textarea', required: true },
      { key: 'actions', label: 'Actions de maîtrise (action, propriétaire, échéance, coût)', type: 'textarea', required: true },
      { key: 'residuel_vise', label: 'Niveau de risque résiduel visé', type: 'text', required: true },
      { key: 'suivi', label: 'Modalités de suivi de l’efficacité', type: 'textarea', required: true },
      { key: 'responsable', label: 'Responsable du plan', type: 'text', required: true },
    ]),
    body: `<div class="document"><h1>PLAN DE TRAITEMENT DES RISQUES</h1><p><strong>{{entreprise}}</strong> — Établi le {{date_jour}} — Responsable : {{responsable}}</p><h2>1. Risques concernés</h2><p>{{risques_traites}}</p><h2>2. Stratégie de traitement</h2><p>{{strategies}}</p><p>Pour chaque risque, la réponse retenue relève de l’une des options : <strong>éviter</strong> (supprimer la source ou renoncer à l’activité), <strong>réduire</strong> (diminuer la probabilité et/ou l’impact), <strong>transférer</strong> (assurance, sous-traitance, clauses contractuelles) ou <strong>accepter</strong> (assumer le risque en connaissance de cause, dans les limites d’appétence).</p><h2>3. Actions de maîtrise</h2><p>{{actions}}</p><table border="1"><thead><tr><th>Risque</th><th>Stratégie</th><th>Action de maîtrise</th><th>Propriétaire</th><th>Échéance</th><th>Coût</th><th>Statut</th></tr></thead><tbody><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table><h2>4. Risque résiduel visé</h2><p>{{residuel_vise}}. Le risque résiduel après traitement doit être ramené dans les limites de tolérance ; à défaut, une acceptation formelle par le niveau habilité est requise.</p><h2>5. Suivi de l’efficacité</h2><p>{{suivi}}</p><p>L’avancement des actions et l’évolution du risque résiduel sont revus périodiquement et consignés au registre des risques.</p><p class="signatures">Établi le {{date_jour}} par {{responsable}}.<br/>Validé par : ______________________</p></div>`,
    popularity: 31,
    countriesJson: RISK_COUNTRIES,
  },

  // ════════════════ SURVEILLANCE & INCIDENTS (3) ════════════════
  {
    code: 'risk_kri',
    name: 'Tableau de bord de suivi des risques (indicateurs KRI)',
    category: 'juridique_admin',
    price: 2000, priceMax: 4000,
    description: 'Tableau de bord de pilotage des risques : indicateurs clés de risque (KRI), seuils d’alerte, tendance, statut, corrélation aux risques majeurs et actions déclenchées. Support de reporting périodique au comité des risques.',
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise / périmètre', type: 'text', required: true },
      { key: 'periode', label: 'Période couverte par le tableau de bord', type: 'text', required: true },
      { key: 'indicateurs', label: 'Indicateurs suivis (nom, risque associé, mode de calcul)', type: 'textarea', required: true },
      { key: 'seuils', label: 'Seuils d’alerte (vert / orange / rouge) par indicateur', type: 'textarea', required: true },
      { key: 'faits_marquants', label: 'Faits marquants et alertes de la période', type: 'textarea', required: true },
      { key: 'responsable', label: 'Responsable du reporting', type: 'text', required: true },
    ]),
    body: `<div class="document"><h1>TABLEAU DE BORD DE SUIVI DES RISQUES</h1><p><strong>{{entreprise}}</strong> — Période : {{periode}} — Établi le {{date_jour}} par {{responsable}}</p><h2>1. Objet</h2><p>Le présent tableau de bord assure le suivi périodique des risques majeurs au moyen d’indicateurs clés de risque (KRI). Il alerte sur les dérives et objective les décisions du comité des risques.</p><h2>2. Indicateurs suivis</h2><p>{{indicateurs}}</p><h2>3. Seuils d’alerte</h2><p>{{seuils}}</p><p>Un code couleur signale l’état de chaque indicateur : <strong>vert</strong> (dans la tolérance), <strong>orange</strong> (zone de vigilance, surveillance renforcée), <strong>rouge</strong> (seuil dépassé, escalade et action corrective).</p><h2>4. Synthèse de la période</h2><table border="1"><thead><tr><th>Indicateur (KRI)</th><th>Risque associé</th><th>Valeur</th><th>Seuil</th><th>Statut</th><th>Tendance</th><th>Action déclenchée</th></tr></thead><tbody><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table><h2>5. Faits marquants et alertes</h2><p>{{faits_marquants}}</p><p class="signatures">Établi le {{date_jour}} par {{responsable}}.<br/>Présenté au comité des risques du : ____________</p></div>`,
    popularity: 20,
    countriesJson: RISK_COUNTRIES,
  },
  {
    code: 'risk_fiche_incident',
    name: 'Fiche de déclaration d’incident',
    category: 'juridique_admin',
    price: 1500, priceMax: 3000,
    description: 'Fiche de déclaration et de suivi d’un incident ou événement de risque avéré : description, chronologie, impacts, cause racine, mesures immédiates et correctives, gravité et enseignements. Alimente le registre des incidents.',
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise / entité concernée', type: 'text', required: true },
      { key: 'declarant', label: 'Déclarant (nom et fonction)', type: 'text', required: true },
      { key: 'date_incident', label: 'Date et heure de l’incident', type: 'text', required: true },
      { key: 'description', label: 'Description de l’incident', type: 'textarea', required: true },
      { key: 'chronologie', label: 'Chronologie des faits', type: 'textarea', required: true },
      { key: 'impacts', label: 'Impacts constatés (opérationnels, financiers, humains, image)', type: 'textarea', required: true },
      { key: 'cause', label: 'Cause racine identifiée (si connue)', type: 'textarea', required: false },
      { key: 'mesures_immediates', label: 'Mesures immédiates prises', type: 'textarea', required: true },
      { key: 'gravite', label: 'Gravité (mineure, majeure, critique)', type: 'text', required: true },
    ]),
    body: `<div class="document"><h1>FICHE DE DÉCLARATION D’INCIDENT</h1><p><strong>{{entreprise}}</strong><br/>Déclarant : {{declarant}} — Fiche établie le {{date_jour}}</p><h2>1. Identification de l’incident</h2><p><strong>Date et heure :</strong> {{date_incident}}<br/><strong>Gravité :</strong> {{gravite}}</p><h2>2. Description</h2><p>{{description}}</p><h2>3. Chronologie des faits</h2><p>{{chronologie}}</p><h2>4. Impacts constatés</h2><p>{{impacts}}</p><h2>5. Analyse de la cause racine</h2><p>{{cause}}</p><h2>6. Mesures immédiates</h2><p>{{mesures_immediates}}</p><h2>7. Mesures correctives et préventives</h2><p>Actions correctives (traiter les conséquences) et préventives (éviter la récurrence) : à définir avec propriétaire et échéance, puis à reporter au registre des risques.</p><table border="1"><thead><tr><th>Action</th><th>Type (corrective / préventive)</th><th>Propriétaire</th><th>Échéance</th><th>Statut</th></tr></thead><tbody><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table><h2>8. Enseignements</h2><p>Leçons tirées et diffusion aux équipes concernées.</p><p class="signatures">Déclaré le {{date_jour}} par {{declarant}}.<br/>Visa du responsable des risques : ______________________</p></div>`,
    popularity: 28,
    countriesJson: RISK_COUNTRIES,
  },
  {
    code: 'risk_procedure_escalade',
    name: 'Procédure d’escalade des risques et incidents',
    category: 'juridique_admin',
    price: 1500, priceMax: 3500,
    description: 'Procédure définissant les critères, niveaux et délais de remontée des risques et incidents vers la hiérarchie et la direction : matrice d’escalade, rôles, canaux de communication et délais de réponse par niveau de gravité.',
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise / périmètre', type: 'text', required: true },
      { key: 'criteres', label: 'Critères de déclenchement de l’escalade', type: 'textarea', required: true },
      { key: 'niveaux', label: 'Niveaux d’escalade (N1, N2, N3…) et fonctions destinataires', type: 'textarea', required: true },
      { key: 'delais', label: 'Délais de remontée et de réponse par niveau de gravité', type: 'textarea', required: true },
      { key: 'canaux', label: 'Canaux de communication (e-mail, téléphone, réunion de crise…)', type: 'textarea', required: true },
      { key: 'responsable', label: 'Responsable de la procédure', type: 'text', required: true },
    ]),
    body: `<div class="document"><h1>PROCÉDURE D’ESCALADE DES RISQUES ET INCIDENTS</h1><p><strong>{{entreprise}}</strong> — En vigueur à compter du {{date_jour}} — Responsable : {{responsable}}</p><h2>1. Objet</h2><p>La présente procédure définit comment un risque significatif ou un incident est remonté, sans délai et au bon niveau, afin de garantir une décision rapide et proportionnée.</p><h2>2. Critères de déclenchement</h2><p>{{criteres}}</p><p>L’escalade est déclenchée dès qu’un seuil de tolérance est dépassé, qu’un incident de gravité majeure ou critique survient, ou qu’un risque ne peut être maîtrisé au niveau où il est détecté.</p><h2>3. Niveaux d’escalade</h2><p>{{niveaux}}</p><h2>4. Matrice d’escalade</h2><table border="1"><thead><tr><th>Gravité</th><th>Niveau destinataire</th><th>Délai de remontée</th><th>Délai de réponse attendu</th><th>Canal</th></tr></thead><tbody><tr><td>Mineure</td><td>N1 — Responsable opérationnel</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>Majeure</td><td>N2 — Risk manager / direction métier</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>Critique</td><td>N3 — Direction générale / cellule de crise</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table><h2>5. Délais et canaux</h2><p><strong>Délais :</strong> {{delais}}</p><p><strong>Canaux de communication :</strong> {{canaux}}</p><h2>6. Traçabilité</h2><p>Chaque escalade est tracée (date, émetteur, destinataire, décision) et reliée à la fiche d’incident ou au registre des risques correspondant.</p><p class="signatures">Établie le {{date_jour}} par {{responsable}}.<br/>Approuvée par : ______________________</p></div>`,
    popularity: 24,
    countriesJson: RISK_COUNTRIES,
  },

  // ════════════════ CONTINUITÉ & CRISE (4) ════════════════
  {
    code: 'risk_continuite_bia',
    name: 'Bilan d’impact sur l’activité (BIA)',
    category: 'juridique_admin',
    price: 2500, priceMax: 4500,
    description: 'Analyse d’impact sur l’activité (Business Impact Analysis) : recensement des processus critiques, évaluation des impacts d’une interruption dans le temps, définition des objectifs de reprise (RTO/RPO) et des ressources minimales. Fondation du PCA/PRA.',
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise / périmètre analysé', type: 'text', required: true },
      { key: 'processus', label: 'Processus / activités recensés', type: 'textarea', required: true },
      { key: 'impacts', label: 'Nature des impacts évalués (financier, réglementaire, image, opérationnel)', type: 'textarea', required: true },
      { key: 'ressources_critiques', label: 'Ressources critiques par processus (personnes, SI, fournisseurs, locaux)', type: 'textarea', required: true },
      { key: 'rto_rpo', label: 'Objectifs de reprise visés (RTO / RPO) par processus', type: 'textarea', required: true },
      { key: 'responsable', label: 'Responsable de l’analyse', type: 'text', required: true },
    ]),
    body: `<div class="document"><h1>BILAN D’IMPACT SUR L’ACTIVITÉ (BIA)</h1><p><strong>{{entreprise}}</strong> — Réalisé le {{date_jour}} par {{responsable}}</p><h2>1. Objet</h2><p>Le présent bilan identifie les processus critiques de l’entreprise et évalue les conséquences d’une interruption dans le temps, afin de déterminer les priorités et objectifs de reprise. Il constitue le socle du plan de continuité et du plan de reprise d’activité.</p><h2>2. Processus recensés</h2><p>{{processus}}</p><h2>3. Évaluation des impacts d’une interruption</h2><p>{{impacts}}</p><p>Pour chaque processus, l’impact est apprécié selon la durée d’indisponibilité (ex. 4 h, 24 h, 72 h, 1 semaine) afin d’identifier la <strong>durée maximale d’interruption admissible (DMIA / MTPD)</strong>.</p><table border="1"><thead><tr><th>Processus</th><th>Criticité</th><th>Impact à 4h</th><th>Impact à 24h</th><th>Impact à 72h</th><th>DMIA</th><th>RTO</th><th>RPO</th></tr></thead><tbody><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table><h2>4. Ressources critiques</h2><p>{{ressources_critiques}}</p><h2>5. Objectifs de reprise</h2><p>{{rto_rpo}}</p><p>Le <strong>RTO</strong> (Recovery Time Objective) fixe le délai cible de remise en service ; le <strong>RPO</strong> (Recovery Point Objective) fixe la perte de données maximale admissible.</p><p class="signatures">Réalisé le {{date_jour}} par {{responsable}}.<br/>Validé par : ______________________</p></div>`,
    popularity: 26,
    countriesJson: RISK_COUNTRIES,
  },
  {
    code: 'risk_pca',
    name: 'Plan de continuité d’activité (PCA)',
    category: 'juridique_admin',
    price: 4000, priceMax: 6000,
    description: 'Plan de continuité d’activité : objectifs et périmètre, processus critiques et objectifs de reprise, scénarios d’indisponibilité, stratégies et dispositifs de continuité, organisation de gestion, procédures de bascule, tests et maintien en conditions opérationnelles.',
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise (raison sociale + siège)', type: 'textarea', required: true },
      { key: 'perimetre', label: 'Périmètre et objectifs du PCA', type: 'textarea', required: true },
      { key: 'processus_critiques', label: 'Processus critiques et objectifs de reprise (RTO/RPO)', type: 'textarea', required: true },
      { key: 'scenarios', label: 'Scénarios d’indisponibilité couverts (locaux, SI, personnel, fournisseurs)', type: 'textarea', required: true },
      { key: 'strategies', label: 'Stratégies et dispositifs de continuité (site de repli, télétravail, secours SI…)', type: 'textarea', required: true },
      { key: 'organisation', label: 'Organisation de gestion de la continuité (cellule, rôles, contacts)', type: 'textarea', required: true },
      { key: 'tests', label: 'Programme de tests et d’exercices', type: 'textarea', required: true },
      { key: 'responsable', label: 'Responsable du plan de continuité (RPCA)', type: 'text', required: true },
    ]),
    body: `<div class="document"><h1>PLAN DE CONTINUITÉ D’ACTIVITÉ (PCA)</h1><p><strong>{{entreprise}}</strong><br/>En vigueur à compter du {{date_jour}} — Responsable (RPCA) : {{responsable}}</p><h2>1. Objet et périmètre</h2><p>{{perimetre}}</p><p>Le PCA a pour objet de garantir la poursuite ou la reprise rapide des activités essentielles de l’entreprise en cas de sinistre ou d’événement majeur, dans le respect des objectifs de service et des obligations réglementaires.</p><h2>2. Processus critiques et objectifs de reprise</h2><p>{{processus_critiques}}</p><p>Les priorités et objectifs (RTO/RPO) sont issus du bilan d’impact sur l’activité (BIA).</p><h2>3. Scénarios d’indisponibilité</h2><p>{{scenarios}}</p><p>Sont notamment couverts : indisponibilité des locaux, du système d’information, du personnel clé, d’un fournisseur ou prestataire critique.</p><h2>4. Stratégies et dispositifs de continuité</h2><p>{{strategies}}</p><h2>5. Organisation de gestion</h2><p>{{organisation}}</p><p>La cellule de continuité est activée selon les critères d’escalade en vigueur ; les rôles, suppléances et annuaire de crise sont tenus à jour.</p><h2>6. Procédures de bascule et de retour à la normale</h2><p>Les modes opératoires de déclenchement, de fonctionnement en mode dégradé et de retour à la normale sont documentés et accessibles hors ligne.</p><h2>7. Tests, exercices et maintien en conditions opérationnelles</h2><p>{{tests}}</p><p>Le PCA est testé périodiquement, mis à jour après chaque test, incident ou changement significatif, et fait l’objet d’une revue annuelle.</p><p class="signatures">Établi le {{date_jour}} — RPCA : {{responsable}}.<br/>Approuvé par la direction : ______________________</p></div>`,
    popularity: 39,
    countriesJson: RISK_COUNTRIES,
  },
  {
    code: 'risk_pra',
    name: 'Plan de reprise d’activité informatique (PRA)',
    category: 'juridique_admin',
    price: 3500, priceMax: 6000,
    description: 'Plan de reprise d’activité (Disaster Recovery Plan) du système d’information : périmètre technique, cartographie des applications critiques, objectifs RTO/RPO, dispositifs de secours et sauvegarde, procédures de reprise, rôles et scénarios de test.',
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise / DSI', type: 'text', required: true },
      { key: 'perimetre', label: 'Périmètre technique couvert', type: 'textarea', required: true },
      { key: 'applications', label: 'Applications et infrastructures critiques (avec priorité de reprise)', type: 'textarea', required: true },
      { key: 'rto_rpo', label: 'Objectifs RTO / RPO par système', type: 'textarea', required: true },
      { key: 'dispositifs', label: 'Dispositifs de secours et de sauvegarde (réplication, site de secours, backups)', type: 'textarea', required: true },
      { key: 'procedures', label: 'Procédures de reprise (séquence de redémarrage)', type: 'textarea', required: true },
      { key: 'equipe', label: 'Équipe de reprise et contacts', type: 'textarea', required: true },
      { key: 'tests', label: 'Programme de tests du PRA', type: 'textarea', required: true },
    ]),
    body: `<div class="document"><h1>PLAN DE REPRISE D’ACTIVITÉ INFORMATIQUE (PRA)</h1><p><strong>{{entreprise}}</strong> — Version en vigueur au {{date_jour}}</p><h2>1. Objet et périmètre</h2><p>{{perimetre}}</p><p>Le PRA décrit les moyens et procédures permettant de restaurer le système d’information après un sinistre, dans le respect des objectifs de reprise définis. Il complète le plan de continuité d’activité sur le volet technique.</p><h2>2. Applications et infrastructures critiques</h2><p>{{applications}}</p><h2>3. Objectifs de reprise</h2><p>{{rto_rpo}}</p><table border="1"><thead><tr><th>Système / application</th><th>Priorité</th><th>RTO</th><th>RPO</th><th>Dispositif de secours</th></tr></thead><tbody><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table><h2>4. Dispositifs de secours et de sauvegarde</h2><p>{{dispositifs}}</p><p>Les sauvegardes sont régulières, externalisées et testées en restauration ; le site de secours et les mécanismes de réplication sont documentés.</p><h2>5. Procédures de reprise</h2><p>{{procedures}}</p><p>La séquence de redémarrage respecte les dépendances techniques et les priorités métier définies au BIA.</p><h2>6. Équipe de reprise</h2><p>{{equipe}}</p><h2>7. Tests et maintenance</h2><p>{{tests}}</p><p>Le PRA est testé périodiquement (restauration, bascule sur site de secours) et mis à jour après chaque test ou changement majeur d’architecture.</p><p class="signatures">Établi le {{date_jour}}.<br/>Approuvé par le DSI / la direction : ______________________</p></div>`,
    popularity: 33,
    countriesJson: RISK_COUNTRIES,
  },
  {
    code: 'risk_plan_crise',
    name: 'Plan de gestion de crise',
    category: 'juridique_admin',
    price: 3500, priceMax: 6000,
    description: 'Plan de gestion de crise : critères de déclenchement, composition et activation de la cellule de crise, rôles, main courante, communication de crise interne et externe, logistique, sortie de crise et retour d’expérience.',
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise (raison sociale + siège)', type: 'textarea', required: true },
      { key: 'criteres_declenchement', label: 'Critères de déclenchement d’une crise', type: 'textarea', required: true },
      { key: 'cellule', label: 'Composition de la cellule de crise (fonctions et rôles)', type: 'textarea', required: true },
      { key: 'directeur_crise', label: 'Directeur de crise (fonction)', type: 'text', required: true },
      { key: 'activation', label: 'Modalités d’activation et de convocation (alerte, lieu, moyens)', type: 'textarea', required: true },
      { key: 'communication', label: 'Stratégie de communication de crise (interne, externe, porte-parole)', type: 'textarea', required: true },
      { key: 'contacts', label: 'Contacts d’urgence et parties prenantes clés', type: 'textarea', required: true },
    ]),
    body: `<div class="document"><h1>PLAN DE GESTION DE CRISE</h1><p><strong>{{entreprise}}</strong><br/>En vigueur à compter du {{date_jour}} — Directeur de crise : {{directeur_crise}}</p><h2>1. Objet</h2><p>Le présent plan organise la réponse de l’entreprise à un événement majeur menaçant ses personnes, ses activités, ses actifs ou sa réputation, afin d’en limiter les conséquences et de rétablir une situation maîtrisée.</p><h2>2. Critères de déclenchement</h2><p>{{criteres_declenchement}}</p><p>Le déclenchement relève du directeur de crise ou de son suppléant, sur alerte remontée selon la procédure d’escalade.</p><h2>3. Cellule de crise</h2><p>{{cellule}}</p><p>La cellule est pilotée par : {{directeur_crise}}. Chaque membre dispose d’un rôle défini (pilotage, opérations, communication, logistique, juridique, RH, SI) et d’un suppléant.</p><h2>4. Activation et fonctionnement</h2><p>{{activation}}</p><p>La cellule tient une <strong>main courante</strong> horodatée consignant faits, décisions et actions. Les points de situation sont réguliers.</p><h2>5. Communication de crise</h2><p>{{communication}}</p><p>Un porte-parole unique est désigné ; les messages sont validés avant diffusion ; les publics internes et externes (salariés, clients, autorités, médias) sont adressés de façon coordonnée.</p><h2>6. Logistique et moyens</h2><p>Salle de crise (physique ou virtuelle), moyens de communication de secours, annuaire d’urgence et documentation de référence sont préparés et accessibles.</p><p><strong>Contacts d’urgence :</strong> {{contacts}}</p><h2>7. Sortie de crise et retour d’expérience</h2><p>La levée du dispositif est décidée par le directeur de crise. Un retour d’expérience est réalisé pour tirer les enseignements et améliorer le dispositif.</p><p class="signatures">Établi le {{date_jour}}.<br/>Approuvé par la direction : ______________________</p></div>`,
    popularity: 37,
    countriesJson: RISK_COUNTRIES,
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

  console.log('✅ Seed Drive4 Gestion & Management des risques terminé.');
  console.log(`   Templates du script : ${templates.length} (créés : ${created}, mis à jour : ${updated})`);
  console.log('   Répartition par catégorie (ce script) :');
  for (const [cat, n] of Object.entries(byCategory)) console.log(`     - ${cat} : ${n}`);
  console.log(`   Variantes pays (countriesJson) : ${withCountries} templates`);
  console.log(`   ➜ Total de templates en base : ${total}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
