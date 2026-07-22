// Seed Drive4 — PACK BUSINESS PLAN & GESTION FINANCIÈRE + PACK AGRO PASTORAL (business plans)
// (Agent Drive4-7/10). Modèles convertis depuis les modèles Google Drive IBI :
//   • « 10 modèles de business plan standard » (Institut de beauté, Garage, Nettoyage, BTP,
//     Cabinet de recrutement, Boutique de vêtements, Boulangerie, Agence immobilière,
//     Agence de voyage, Agence de communication) → FUSIONNÉS en 1 « business plan sectoriel ».
//   • « Business plan Word à remplir » + « Sommaire Business Plan » (trame narrative, pitch pptx).
//   • PACK AGRO PASTORAL > Business plans_ (Ferme agro-pastorale, Poulet de chair, Poulets
//     améliorés, Ferme avicole, Transformation manioc) → FUSIONNÉS en 1 « business plan agro-pastoral ».
// Les riches sections financières de ces modèles (plan de financement, compte d'exploitation,
// amortissement/remboursement, seuil de rentabilité, trésorerie, synthèse d'investissement)
// donnent lieu à des documents financiers distincts.
// Script ADDITIF : upsert par code — n'écrase aucun autre template. Le template 'business_plan'
// existant du catalogue n'est PAS recréé.
// Exécution : npx tsx prisma/seed-drive4-businessplan.ts
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
  // ═══════════════ 1. Business plan sectoriel (FUSION des 10 modèles) ═══════════════
  {
    code: 'bp_sectoriel', name: 'Business plan sectoriel (PME / commerce / services)', category: 'commercial_financier', price: 5000, priceMax: 8000,
    description: 'Business plan complet adapté à votre secteur (boulangerie, garage, salon de beauté, BTP, commerce, agence, nettoyage, restauration…) : présentation, étude de marché, stratégie, moyens, risques, prévisions financières.',
    fieldsJson: F([
      { key: 'projet', label: 'Nom du projet / de l’entreprise', type: 'text', required: true },
      { key: 'secteur', label: 'Secteur d’activité', type: 'select', required: true, options: ['Boulangerie-pâtisserie', 'Salon / institut de beauté', 'Garage automobile', 'Entreprise de nettoyage', 'Entreprise de BTP', 'Boutique de vêtements', 'Agence immobilière', 'Agence de voyage', 'Agence de communication', 'Cabinet de recrutement', 'Restauration', 'Commerce de détail', 'Transport', 'Autre service'] },
      { key: 'porteur', label: 'Porteur(s) de projet (nom, formation, expérience)', type: 'textarea', required: true },
      { key: 'resume', label: 'Résumé du projet (activité, proposition de valeur en quelques phrases)', type: 'textarea', required: true },
      { key: 'origine', label: 'Origine et objectifs du projet', type: 'textarea', required: true },
      { key: 'marche', label: 'Étude de marché (demande, clientèle cible, concurrence)', type: 'textarea', required: true },
      { key: 'strategie', label: 'Stratégie marketing et moyens commerciaux (offre, prix, communication)', type: 'textarea', required: true },
      { key: 'moyens', label: 'Moyens de production et organisation (locaux, matériel, personnel, fournisseurs)', type: 'textarea', required: true },
      { key: 'statut', label: 'Statut juridique retenu', type: 'text', required: true },
      { key: 'risques', label: 'Principaux risques et mesures de traitement', type: 'textarea', required: true },
      { key: 'previsions', label: 'Prévisions financières (chiffre d’affaires, charges, résultat, besoin de financement)', type: 'textarea', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>BUSINESS PLAN — {{projet}}</h1><p class="text-small">Secteur : {{secteur}} — Document confidentiel établi à {{ville}}, le {{date_jour}}.</p><h2>1. Présentation du porteur de projet</h2><p>{{porteur}}</p><h2>2. Présentation du projet</h2><p><strong>Résumé.</strong> {{resume}}</p><p><strong>Origine et objectifs.</strong> {{origine}}</p><h2>3. Étude de marché</h2><p>{{marche}}</p><h2>4. Stratégie marketing et moyens commerciaux</h2><p>{{strategie}}</p><h2>5. Moyens de production et organisation</h2><p>{{moyens}}</p><h2>6. Statut juridique</h2><p>La forme juridique retenue est : {{statut}}. Ce choix est justifié par la nature de l’activité, le niveau de capital engagé et la volonté du porteur d’associer, le cas échéant, des partenaires à la gouvernance.</p><h2>7. Étude des risques</h2><p>{{risques}}</p><h2>8. Plan financier prévisionnel</h2><p>{{previsions}}</p><h2>9. Conclusion</h2><p>Le présent business plan démontre la cohérence et la viabilité économique du projet {{projet}} dans le secteur « {{secteur}} ». Les hypothèses retenues sont prudentes et documentées ; elles constituent la base des échanges avec les partenaires financiers, banques et investisseurs.</p><p class="signatures">Fait à {{ville}}, le {{date_jour}}<br/><br/>{{porteur}}</p></div>`,
    popularity: 54,
  },

  // ═══════════════ 2. Business plan agro-pastoral (FUSION des BP agro) ═══════════════
  {
    code: 'bp_agropastoral', name: 'Business plan agro-pastoral / d’élevage (par filière)', category: 'commercial_financier', price: 5000, priceMax: 8000,
    description: 'Business plan pour un projet agricole ou d’élevage (aviculture, porciculture, ferme mixte, transformation agroalimentaire…) : présentation, itinéraire technique, marché, plan de production, plan financier et rentabilité.',
    fieldsJson: F([
      { key: 'projet', label: 'Titre du projet', type: 'text', required: true },
      { key: 'filiere', label: 'Filière / atelier de production', type: 'select', required: true, options: ['Aviculture — poules pondeuses', 'Aviculture — poulet de chair', 'Porciculture', 'Cuniculture (lapins)', 'Ferme mixte agro-pastorale', 'Élevage de petits ruminants', 'Transformation agroalimentaire', 'Production végétale / maraîchage', 'Autre filière agricole'] },
      { key: 'promoteur', label: 'Promoteur (nom, âge, formation, expérience, structure d’accompagnement)', type: 'textarea', required: true },
      { key: 'localisation', label: 'Localisation et description du site (superficie, bâtiments, zone agro-écologique)', type: 'textarea', required: true },
      { key: 'presentation', label: 'Présentation du projet et de l’équipe dirigeante', type: 'textarea', required: true },
      { key: 'produits', label: 'Produits et débouchés (nature, usages, marché cible)', type: 'textarea', required: true },
      { key: 'marche', label: 'Analyse du marché et stratégie de commercialisation', type: 'textarea', required: true },
      { key: 'production', label: 'Plan de production et itinéraire technique (processus, capacité, prophylaxie)', type: 'textarea', required: true },
      { key: 'investissements', label: 'Coût des investissements et frais de fonctionnement', type: 'textarea', required: true },
      { key: 'financement', label: 'Plan de financement (apport promoteur, crédit sollicité)', type: 'textarea', required: true },
      { key: 'rentabilite', label: 'Rentabilité prévisionnelle (recettes, résultat, seuil de rentabilité)', type: 'textarea', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>BUSINESS PLAN — {{projet}}</h1><p class="text-small">Filière : {{filiere}} — Établi à {{ville}}, le {{date_jour}}.</p><h2>1. Présentation du promoteur</h2><p>{{promoteur}}</p><h2>2. Présentation du projet</h2><p>{{presentation}}</p><p><strong>Localisation et site.</strong> {{localisation}}</p><h2>3. Produits et débouchés</h2><p>{{produits}}</p><h2>4. Analyse du marché et stratégie de commercialisation</h2><p>{{marche}}</p><h2>5. Plan de production et itinéraire technique</h2><p>{{production}}</p><h2>6. Plan d’investissement et frais de fonctionnement</h2><p>{{investissements}}</p><h2>7. Plan de financement</h2><p>{{financement}}</p><h2>8. Rentabilité et analyse financière</h2><p>{{rentabilite}}</p><h2>9. Conclusion</h2><p>Le projet « {{projet}} » (filière {{filiere}}) adopte des pratiques résilientes et un itinéraire technique maîtrisé. L’analyse financière confirme sa rentabilité et sa capacité de remboursement, justifiant le concours des partenaires financiers sollicités.</p><p class="signatures">Fait à {{ville}}, le {{date_jour}}<br/><br/>{{promoteur}}</p></div>`,
    popularity: 49,
  },

  // ═══════════════ 3. Plan d'affaires simplifié ═══════════════
  {
    code: 'bp_simplifie', name: 'Plan d’affaires simplifié (porteur individuel)', category: 'commercial_financier', price: 2000, priceMax: 4000,
    description: 'Version condensée du business plan pour une micro-entreprise ou un porteur individuel : idée, marché, moyens et chiffres clés sur une trame courte.',
    fieldsJson: F([
      { key: 'projet', label: 'Nom du projet', type: 'text', required: true },
      { key: 'porteur', label: 'Porteur du projet (nom, contact)', type: 'text', required: true },
      { key: 'idee', label: 'L’idée en quelques phrases (produit / service, clientèle)', type: 'textarea', required: true },
      { key: 'marche', label: 'Marché et concurrence', type: 'textarea', required: true },
      { key: 'moyens', label: 'Moyens nécessaires (matériel, local, personnel)', type: 'textarea', required: true },
      { key: 'chiffres', label: 'Chiffres clés (investissement de départ, CA visé, résultat attendu)', type: 'textarea', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>PLAN D’AFFAIRES SIMPLIFIÉ — {{projet}}</h1><p class="text-small">Porteur : {{porteur}} — {{ville}}, le {{date_jour}}.</p><h2>1. L’idée</h2><p>{{idee}}</p><h2>2. Marché et concurrence</h2><p>{{marche}}</p><h2>3. Moyens à mettre en œuvre</h2><p>{{moyens}}</p><h2>4. Chiffres clés</h2><p>{{chiffres}}</p><h2>5. Synthèse</h2><p>Ce plan d’affaires simplifié présente les fondamentaux du projet {{projet}}. Il pourra être approfondi par une étude financière détaillée à la demande des partenaires.</p><p class="signatures">{{porteur}} — {{ville}}, le {{date_jour}}</p></div>`,
    popularity: 40,
  },

  // ═══════════════ 4. Executive summary / résumé exécutif ═══════════════
  {
    code: 'bp_executive_summary', name: 'Executive summary (résumé exécutif)', category: 'commercial_financier', price: 2000, priceMax: 4500,
    description: 'Résumé exécutif percutant à placer en tête d’un business plan ou d’un dossier d’investissement : activité, marché, équipe, chiffres clés et besoin.',
    fieldsJson: F([
      { key: 'projet', label: 'Nom du projet / de l’entreprise', type: 'text', required: true },
      { key: 'activite', label: 'Activité et proposition de valeur', type: 'textarea', required: true },
      { key: 'marche', label: 'Marché visé et opportunité', type: 'textarea', required: true },
      { key: 'equipe', label: 'Équipe dirigeante (atouts clés)', type: 'textarea', required: true },
      { key: 'chiffres', label: 'Chiffres clés (CA prévisionnel, marge, horizon)', type: 'textarea', required: true },
      { key: 'besoin', label: 'Besoin de financement et utilisation des fonds', type: 'textarea', required: true },
    ]),
    body: `<div class="contrat"><h1>EXECUTIVE SUMMARY — {{projet}}</h1><p class="text-small">STRICTEMENT CONFIDENTIEL — {{date_jour}}.</p><h2>Activité</h2><p>{{activite}}</p><h2>Marché</h2><p>{{marche}}</p><h2>Équipe</h2><p>{{equipe}}</p><h2>Chiffres clés</h2><p>{{chiffres}}</p><h2>Besoin</h2><p>{{besoin}}</p><p>Ce résumé exécutif offre une vue d’ensemble du projet {{projet}}. Le business plan complet, disponible sur demande, détaille l’étude de marché, la stratégie et les prévisions financières.</p></div>`,
    popularity: 38,
  },

  // ═══════════════ 5. Note de synthèse d'investissement ═══════════════
  {
    code: 'bp_note_synthese_invest', name: 'Note de synthèse d’investissement (fiche projet)', category: 'commercial_financier', price: 2500, priceMax: 5000,
    description: 'Fiche de synthèse d’une page présentant l’essentiel d’un projet d’investissement : promoteur, projet, coût, financement, modalités de crédit, rentabilité et emplois.',
    fieldsJson: F([
      { key: 'promoteur', label: 'Nature et identité du promoteur (nom, sexe, adresse, structure d’accompagnement)', type: 'textarea', required: true },
      { key: 'titre_projet', label: 'Titre du projet', type: 'text', required: true },
      { key: 'secteur', label: 'Secteur d’activité et localisation', type: 'text', required: true },
      { key: 'cout_projet', label: 'Coût total du projet (FCFA)', type: 'text', required: true },
      { key: 'apport', label: 'Apport personnel (FCFA)', type: 'text', required: true },
      { key: 'credit', label: 'Crédit sollicité (FCFA)', type: 'text', required: true },
      { key: 'modalites', label: 'Modalités de crédit envisagées (taux, durée, différé, périodicité)', type: 'textarea', required: true },
      { key: 'rentabilite', label: 'Rentabilité (CA et revenus nets prévisionnels)', type: 'textarea', required: true },
      { key: 'emplois', label: 'Emplois prévus (directs et indirects)', type: 'text', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>NOTE DE SYNTHÈSE D’INVESTISSEMENT</h1><h2>Informations sur le promoteur</h2><p>{{promoteur}}</p><h2>Informations sur le projet</h2><p><strong>Titre :</strong> {{titre_projet}}</p><p><strong>Secteur et localisation :</strong> {{secteur}}</p><h2>Plan de financement</h2><p><strong>Coût total du projet :</strong> {{cout_projet}} FCFA</p><p><strong>Apport personnel :</strong> {{apport}} FCFA</p><p><strong>Crédit sollicité :</strong> {{credit}} FCFA</p><h2>Modalités du crédit</h2><p>{{modalites}}</p><h2>Rentabilité du projet</h2><p>{{rentabilite}}</p><h2>Impact emploi</h2><p>{{emplois}}</p><p class="text-small">Fiche de synthèse établie à {{ville}}, le {{date_jour}}, à l’attention des partenaires financiers.</p></div>`,
    popularity: 35,
  },

  // ═══════════════ 6. Plan de financement ═══════════════
  {
    code: 'bp_plan_financement', name: 'Plan de financement (emplois / ressources)', category: 'commercial_financier', price: 2500, priceMax: 5500,
    description: 'Trame narrative du plan de financement d’un projet : besoins durables (emplois) et ressources durables, équilibre et commentaire.',
    fieldsJson: F([
      { key: 'projet', label: 'Nom du projet', type: 'text', required: true },
      { key: 'investissements', label: 'Investissements et immobilisations (emplois durables)', type: 'textarea', required: true },
      { key: 'bfr', label: 'Besoin en fonds de roulement de démarrage', type: 'textarea', required: true },
      { key: 'apport', label: 'Apports du/des porteur(s) (numéraire et nature)', type: 'textarea', required: true },
      { key: 'emprunts', label: 'Emprunts et concours bancaires sollicités', type: 'textarea', required: true },
      { key: 'subventions', label: 'Subventions et autres ressources (le cas échéant)', type: 'textarea', required: false },
      { key: 'commentaire', label: 'Commentaire sur l’équilibre du plan', type: 'textarea', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>PLAN DE FINANCEMENT — {{projet}}</h1><p class="text-small">{{ville}}, le {{date_jour}}.</p><h2>1. Emplois durables (besoins)</h2><p><strong>Investissements et immobilisations.</strong> {{investissements}}</p><p><strong>Besoin en fonds de roulement.</strong> {{bfr}}</p><h2>2. Ressources durables</h2><p><strong>Apports des porteurs.</strong> {{apport}}</p><p><strong>Emprunts et concours bancaires.</strong> {{emprunts}}</p><p><strong>Subventions et autres ressources.</strong> {{subventions}}</p><h2>3. Équilibre du plan</h2><p>{{commentaire}}</p><p>Le plan de financement du projet {{projet}} est équilibré : le total des ressources durables couvre l’intégralité des emplois durables, garantissant le démarrage de l’activité dans des conditions financières saines.</p><p class="signatures">{{ville}}, le {{date_jour}}</p></div>`,
    popularity: 36,
  },

  // ═══════════════ 7. Étude de faisabilité ═══════════════
  {
    code: 'bp_etude_faisabilite', name: 'Étude de faisabilité de projet', category: 'commercial_financier', price: 3000, priceMax: 7000,
    description: 'Étude de faisabilité structurée d’un projet : faisabilité commerciale, technique, organisationnelle, juridique et financière, avec conclusion sur la viabilité.',
    fieldsJson: F([
      { key: 'projet', label: 'Nom du projet', type: 'text', required: true },
      { key: 'contexte', label: 'Contexte et objectifs du projet', type: 'textarea', required: true },
      { key: 'commerciale', label: 'Faisabilité commerciale (marché, demande, concurrence)', type: 'textarea', required: true },
      { key: 'technique', label: 'Faisabilité technique (moyens, process, ressources)', type: 'textarea', required: true },
      { key: 'organisationnelle', label: 'Faisabilité organisationnelle et humaine', type: 'textarea', required: true },
      { key: 'juridique', label: 'Faisabilité juridique et réglementaire', type: 'textarea', required: true },
      { key: 'financiere', label: 'Faisabilité financière (coût, financement, rentabilité)', type: 'textarea', required: true },
      { key: 'conclusion', label: 'Conclusion sur la viabilité (GO / NO-GO, conditions)', type: 'textarea', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>ÉTUDE DE FAISABILITÉ — {{projet}}</h1><p class="text-small">{{ville}}, le {{date_jour}}.</p><h2>1. Contexte et objectifs</h2><p>{{contexte}}</p><h2>2. Faisabilité commerciale</h2><p>{{commerciale}}</p><h2>3. Faisabilité technique</h2><p>{{technique}}</p><h2>4. Faisabilité organisationnelle</h2><p>{{organisationnelle}}</p><h2>5. Faisabilité juridique et réglementaire</h2><p>{{juridique}}</p><h2>6. Faisabilité financière</h2><p>{{financiere}}</p><h2>7. Conclusion</h2><p>{{conclusion}}</p><p>Au regard de l’ensemble des dimensions analysées, l’étude de faisabilité du projet {{projet}} permet de statuer sur son opportunité et d’identifier les conditions de sa réussite.</p><p class="signatures">{{ville}}, le {{date_jour}}</p></div>`,
    popularity: 34,
  },

  // ═══════════════ 8. Dossier de demande de crédit ═══════════════
  {
    code: 'bp_dossier_credit', name: 'Dossier de demande de crédit bancaire', category: 'commercial_financier', price: 3000, priceMax: 6500,
    description: 'Dossier structuré de demande de crédit à l’attention d’une banque ou institution de microfinance : présentation, objet du financement, plan de remboursement et garanties.',
    fieldsJson: F([
      { key: 'demandeur', label: 'Demandeur (identité, activité, ancienneté, références bancaires)', type: 'textarea', required: true },
      { key: 'banque', label: 'Établissement sollicité', type: 'text', required: true },
      { key: 'objet', label: 'Objet et montant du financement demandé (FCFA)', type: 'textarea', required: true },
      { key: 'utilisation', label: 'Utilisation détaillée des fonds', type: 'textarea', required: true },
      { key: 'apport', label: 'Apport personnel et autofinancement', type: 'text', required: true },
      { key: 'remboursement', label: 'Capacité et plan de remboursement (durée, échéances, taux envisagé)', type: 'textarea', required: true },
      { key: 'garanties', label: 'Garanties proposées', type: 'textarea', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>DOSSIER DE DEMANDE DE CRÉDIT</h1><p>À l’attention de : <strong>{{banque}}</strong></p><p class="text-small">{{ville}}, le {{date_jour}}.</p><h2>1. Présentation du demandeur</h2><p>{{demandeur}}</p><h2>2. Objet et montant du financement</h2><p>{{objet}}</p><h2>3. Utilisation des fonds</h2><p>{{utilisation}}</p><h2>4. Apport personnel</h2><p>{{apport}}</p><h2>5. Plan de remboursement</h2><p>{{remboursement}}</p><h2>6. Garanties proposées</h2><p>{{garanties}}</p><h2>7. Conclusion</h2><p>Le demandeur sollicite le concours de {{banque}} pour le financement décrit ci-dessus. La rentabilité de l’activité et les garanties offertes assurent une capacité de remboursement satisfaisante. Le demandeur reste à disposition pour tout complément d’information.</p><p class="signatures">Fait à {{ville}}, le {{date_jour}}<br/><br/>Signature du demandeur</p></div>`,
    popularity: 42,
  },

  // ═══════════════ 9. Plan de trésorerie prévisionnel ═══════════════
  {
    code: 'bp_plan_tresorerie', name: 'Plan de trésorerie prévisionnel', category: 'commercial_financier', price: 2500, priceMax: 5500,
    description: 'Trame narrative du plan de trésorerie : encaissements, décaissements, solde mensuel et commentaire sur les tensions de trésorerie.',
    fieldsJson: F([
      { key: 'projet', label: 'Nom du projet / de l’entreprise', type: 'text', required: true },
      { key: 'periode', label: 'Période couverte (ex. 12 premiers mois)', type: 'text', required: true },
      { key: 'encaissements', label: 'Encaissements prévus (ventes, apports, emprunts…)', type: 'textarea', required: true },
      { key: 'decaissements', label: 'Décaissements prévus (achats, salaires, charges, échéances…)', type: 'textarea', required: true },
      { key: 'solde', label: 'Évolution du solde de trésorerie (mensuel / cumulé)', type: 'textarea', required: true },
      { key: 'tensions', label: 'Tensions de trésorerie identifiées et solutions (découvert, échelonnement…)', type: 'textarea', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>PLAN DE TRÉSORERIE PRÉVISIONNEL — {{projet}}</h1><p class="text-small">Période : {{periode}} — {{ville}}, le {{date_jour}}.</p><h2>1. Encaissements</h2><p>{{encaissements}}</p><h2>2. Décaissements</h2><p>{{decaissements}}</p><h2>3. Solde de trésorerie</h2><p>{{solde}}</p><h2>4. Tensions et solutions</h2><p>{{tensions}}</p><h2>5. Synthèse</h2><p>Le plan de trésorerie du projet {{projet}} permet d’anticiper les besoins de financement à court terme et de sécuriser la liquidité de l’activité sur la période considérée.</p><p class="signatures">{{ville}}, le {{date_jour}}</p></div>`,
    popularity: 33,
  },

  // ═══════════════ 10. Compte d'exploitation prévisionnel ═══════════════
  {
    code: 'bp_compte_exploitation', name: 'Compte d’exploitation prévisionnel', category: 'commercial_financier', price: 2500, priceMax: 5500,
    description: 'Trame narrative du compte d’exploitation prévisionnel : produits, charges variables et fixes, résultat et cash-flow sur plusieurs exercices.',
    fieldsJson: F([
      { key: 'projet', label: 'Nom du projet / de l’entreprise', type: 'text', required: true },
      { key: 'horizon', label: 'Horizon de prévision (ex. 3 à 5 ans)', type: 'text', required: true },
      { key: 'produits', label: 'Produits d’exploitation / recettes (par exercice)', type: 'textarea', required: true },
      { key: 'charges_variables', label: 'Charges variables (matières premières, approvisionnements…)', type: 'textarea', required: true },
      { key: 'charges_fixes', label: 'Charges fixes (salaires, amortissements, intérêts…)', type: 'textarea', required: true },
      { key: 'resultat', label: 'Résultat net prévisionnel et cash-flow', type: 'textarea', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>COMPTE D’EXPLOITATION PRÉVISIONNEL — {{projet}}</h1><p class="text-small">Horizon : {{horizon}} — {{ville}}, le {{date_jour}}.</p><h2>1. Produits d’exploitation</h2><p>{{produits}}</p><h2>2. Charges variables</h2><p>{{charges_variables}}</p><h2>3. Charges fixes</h2><p>{{charges_fixes}}</p><h2>4. Résultat et cash-flow</h2><p>{{resultat}}</p><h2>5. Interprétation</h2><p>Le compte d’exploitation prévisionnel du projet {{projet}} met en évidence la formation du résultat net et la capacité d’autofinancement dégagée sur la période. Ces éléments attestent de la viabilité économique de l’activité.</p><p class="signatures">{{ville}}, le {{date_jour}}</p></div>`,
    popularity: 32,
  },

  // ═══════════════ 11. Note d'opportunité d'affaires ═══════════════
  {
    code: 'bp_note_opportunite', name: 'Note d’opportunité d’affaires', category: 'commercial_financier', price: 2000, priceMax: 4500,
    description: 'Note courte présentant une opportunité d’affaires à des partenaires ou décideurs : problème, solution, marché, avantage concurrentiel et prochaine étape.',
    fieldsJson: F([
      { key: 'titre', label: 'Titre de l’opportunité', type: 'text', required: true },
      { key: 'probleme', label: 'Problème / besoin identifié', type: 'textarea', required: true },
      { key: 'solution', label: 'Solution proposée', type: 'textarea', required: true },
      { key: 'marche', label: 'Marché et potentiel (taille, tendance)', type: 'textarea', required: true },
      { key: 'avantage', label: 'Avantage concurrentiel', type: 'textarea', required: true },
      { key: 'etape', label: 'Prochaine étape et sollicitation', type: 'textarea', required: true },
    ]),
    body: `<div class="contrat"><h1>NOTE D’OPPORTUNITÉ — {{titre}}</h1><p class="text-small">Établie le {{date_jour}}.</p><h2>1. Le problème</h2><p>{{probleme}}</p><h2>2. La solution</h2><p>{{solution}}</p><h2>3. Le marché</h2><p>{{marche}}</p><h2>4. Notre avantage</h2><p>{{avantage}}</p><h2>5. Prochaine étape</h2><p>{{etape}}</p><p>Cette note d’opportunité vise à susciter l’intérêt des partenaires pour « {{titre}} ». Un business plan détaillé peut être communiqué sur demande.</p></div>`,
    popularity: 30,
  },

  // ═══════════════ 12. Pitch deck investisseurs (trame texte) ═══════════════
  {
    code: 'bp_pitch_deck', name: 'Pitch deck investisseurs (trame texte)', category: 'commercial_financier', price: 3000, priceMax: 6000,
    description: 'Trame texte d’un pitch deck, slide par slide : problème, solution, marché, produit, business model, équipe, chiffres et demande de financement.',
    fieldsJson: F([
      { key: 'projet', label: 'Nom du projet / de la start-up', type: 'text', required: true },
      { key: 'accroche', label: 'Slide 1 — Accroche / vision (une phrase)', type: 'textarea', required: true },
      { key: 'probleme', label: 'Slide 2 — Problème', type: 'textarea', required: true },
      { key: 'solution', label: 'Slide 3 — Solution / produit', type: 'textarea', required: true },
      { key: 'marche', label: 'Slide 4 — Marché (taille, cible)', type: 'textarea', required: true },
      { key: 'business_model', label: 'Slide 5 — Business model (comment vous gagnez de l’argent)', type: 'textarea', required: true },
      { key: 'traction', label: 'Slide 6 — Traction / chiffres clés', type: 'textarea', required: true },
      { key: 'equipe', label: 'Slide 7 — Équipe', type: 'textarea', required: true },
      { key: 'demande', label: 'Slide 8 — Demande de financement et utilisation', type: 'textarea', required: true },
    ]),
    body: `<div class="contrat"><h1>PITCH DECK — {{projet}}</h1><p class="text-small">Support de présentation investisseurs — {{date_jour}}.</p><h2>Slide 1 — Vision</h2><p>{{accroche}}</p><h2>Slide 2 — Problème</h2><p>{{probleme}}</p><h2>Slide 3 — Solution</h2><p>{{solution}}</p><h2>Slide 4 — Marché</h2><p>{{marche}}</p><h2>Slide 5 — Business model</h2><p>{{business_model}}</p><h2>Slide 6 — Traction</h2><p>{{traction}}</p><h2>Slide 7 — Équipe</h2><p>{{equipe}}</p><h2>Slide 8 — Demande de financement</h2><p>{{demande}}</p><p class="text-small">Chaque section correspond à un slide. Reprenez ces contenus dans votre outil de présentation en soignant visuels et graphiques.</p></div>`,
    popularity: 37,
  },

  // ═══════════════ 13. Demande de financement / subvention entreprise ═══════════════
  {
    code: 'bp_demande_subvention', name: 'Demande de financement / subvention (projet entreprise)', category: 'commercial_financier', price: 2500, priceMax: 6000,
    description: 'Dossier de demande de financement ou de subvention auprès d’un bailleur : présentation, justification, objectifs, activités, budget détaillé et cofinancement.',
    fieldsJson: F([
      { key: 'porteur', label: 'Structure / porteur de projet (identité, membres)', type: 'textarea', required: true },
      { key: 'bailleur', label: 'Bailleur / organisme sollicité', type: 'text', required: true },
      { key: 'titre_projet', label: 'Titre du projet', type: 'text', required: true },
      { key: 'resume', label: 'Résumé du projet', type: 'textarea', required: true },
      { key: 'justification', label: 'Justification et contexte (situation de départ)', type: 'textarea', required: true },
      { key: 'objectifs', label: 'Objectif global et objectifs spécifiques', type: 'textarea', required: true },
      { key: 'activites', label: 'Activités prévues et résultats attendus', type: 'textarea', required: true },
      { key: 'budget', label: 'Budget total, contribution demandée et cofinancement (FCFA)', type: 'textarea', required: true },
      { key: 'impact', label: 'Impacts attendus (économique, social, environnemental) et emplois', type: 'textarea', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>DEMANDE DE FINANCEMENT — {{titre_projet}}</h1><p>À l’attention de : <strong>{{bailleur}}</strong></p><p class="text-small">{{ville}}, le {{date_jour}}.</p><h2>1. Présentation du porteur</h2><p>{{porteur}}</p><h2>2. Résumé du projet</h2><p>{{resume}}</p><h2>3. Justification</h2><p>{{justification}}</p><h2>4. Objectifs</h2><p>{{objectifs}}</p><h2>5. Activités et résultats attendus</h2><p>{{activites}}</p><h2>6. Budget et plan de financement</h2><p>{{budget}}</p><h2>7. Impacts et pérennisation</h2><p>{{impact}}</p><h2>8. Conclusion</h2><p>Le porteur sollicite le concours de {{bailleur}} pour la réalisation du projet « {{titre_projet}} ». Ce projet, à fort impact socio-économique, s’inscrit dans une démarche de pérennisation et de création d’emplois durables.</p><p class="signatures">Fait à {{ville}}, le {{date_jour}}<br/><br/>Le porteur de projet</p></div>`,
    popularity: 39,
  },

  // ═══════════════ 14. Étude de marché ═══════════════
  {
    code: 'bp_etude_marche', name: 'Étude de marché (trame)', category: 'commercial_financier', price: 2500, priceMax: 6000,
    description: 'Trame d’étude de marché : méthode, approche générale du marché, demande, offre/concurrence, environnement et estimation du chiffre d’affaires.',
    fieldsJson: F([
      { key: 'projet', label: 'Produit / service et projet étudié', type: 'text', required: true },
      { key: 'methode', label: 'Hypothèses et méthode d’étude (questionnaire, documentaire, concurrence…)', type: 'textarea', required: true },
      { key: 'approche', label: 'Approche générale du marché (caractéristiques, historique, perspectives)', type: 'textarea', required: true },
      { key: 'demande', label: 'Caractéristiques de la demande (volume, tendances, segmentation clientèle)', type: 'textarea', required: true },
      { key: 'offre', label: 'Caractéristiques de l’offre (concurrence directe et indirecte, forces/faiblesses)', type: 'textarea', required: true },
      { key: 'environnement', label: 'Environnement (cadre légal, réglementaire, technologique) — menaces et opportunités', type: 'textarea', required: true },
      { key: 'ca', label: 'Part de marché visée et chiffre d’affaires prévisible', type: 'textarea', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>ÉTUDE DE MARCHÉ — {{projet}}</h1><p class="text-small">{{ville}}, le {{date_jour}}.</p><h2>1. Hypothèses et méthode</h2><p>{{methode}}</p><h2>2. Approche générale du marché</h2><p>{{approche}}</p><h2>3. Caractéristiques de la demande</h2><p>{{demande}}</p><h2>4. Caractéristiques de l’offre</h2><p>{{offre}}</p><h2>5. Caractéristiques de l’environnement</h2><p>{{environnement}}</p><h2>6. Chiffre d’affaires prévisible</h2><p>{{ca}}</p><h2>7. Conclusion</h2><p>Cette étude de marché confirme l’existence d’une demande solvable pour {{projet}} et fournit les bases chiffrées nécessaires à l’élaboration du business plan et des prévisions financières.</p><p class="signatures">{{ville}}, le {{date_jour}}</p></div>`,
    popularity: 41,
  },
];

async function main() {
  let created = 0;
  let updated = 0;

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
  }

  const total = await prisma.documentTemplate.count();
  console.log('✅ Seed Drive4 BUSINESS PLAN & GESTION FINANCIÈRE terminé.');
  console.log(`   Templates du script : ${templates.length} (créés : ${created}, mis à jour : ${updated})`);
  console.log(`   Catégorie : commercial_financier — codes préfixés 'bp_'`);
  console.log(`   ➜ Total de templates en base : ${total}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
