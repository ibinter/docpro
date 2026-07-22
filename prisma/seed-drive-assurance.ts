// Seed Drive — ASSURANCE (Agent Drive-2/5) : 10 templates convertis depuis les
// modèles Google Drive IBI (kit IBI079 Banque & Assurance, kits RC et santé).
// Script ADDITIF : upsert par code — n'écrase aucun autre template.
// Exécution : npx tsx prisma/seed-drive-assurance.ts
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

// Variante pays commune aux contrats d'assurance.
const COUNTRIES_ASSURANCE = JSON.stringify({
  OHADA: { note: 'Se référer au Code CIMA applicable dans la zone CFA.' },
  FR: { note: 'Se référer au Code des assurances français.' },
});

const templates: CatalogTemplate[] = [
  // ─────────────────────────── 1. Assurance-vie ───────────────────────────
  {
    code: 'assur_vie', name: 'Contrat d’assurance-vie', category: 'assurance', price: 3000, priceMax: 6000,
    description: 'Contrat d’assurance-vie : capital ou rente garanti aux bénéficiaires désignés, primes, exclusions et résiliation.',
    fieldsJson: F([
      { key: 'assureur', label: 'Compagnie d’assurance (nom, n° d’enregistrement, siège social, représentant légal)', type: 'textarea', required: true },
      { key: 'souscripteur', label: 'Souscripteur (nom complet + adresse)', type: 'textarea', required: true },
      { key: 'beneficiaires', label: 'Bénéficiaire(s) désigné(s) (noms + liens avec le souscripteur)', type: 'textarea', required: true },
      { key: 'capital', label: 'Capital ou rente garanti (FCFA)', type: 'text', required: true },
      { key: 'primes', label: 'Montant et périodicité des primes', type: 'text', required: true },
      { key: 'duree', label: 'Durée du contrat', type: 'text', required: true },
      { key: 'ville', label: 'Ville de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT D'ASSURANCE-VIE</h1><p>Entre <strong>{{assureur}}</strong>, dûment habilitée à cet effet, ci-après dénommée « l'Assureur »,</p><p>Et <strong>{{souscripteur}}</strong>, ci-après dénommé « le Souscripteur »,</p><p>Ci-après dénommés collectivement les « Parties » et individuellement une « Partie ».</p><p>Considérant que l'Assureur est autorisé à fournir des services d'assurance conformément à la réglementation en vigueur, et que le Souscripteur souhaite souscrire un contrat d'assurance-vie auprès de l'Assureur conformément aux termes et conditions énoncés dans le présent contrat, les Parties conviennent ce qui suit :</p><h2>Article 1 — Objet du contrat</h2><p>L'Assureur s'engage à garantir le paiement d'un capital ou d'une rente de <strong>{{capital}} FCFA</strong> à un ou plusieurs bénéficiaires désignés par le Souscripteur en cas de survenance du risque assuré, conformément aux dispositions du présent contrat. Le contrat est conclu pour une durée de {{duree}}.</p><h2>Article 2 — Déclaration du risque</h2><p>Le Souscripteur s'engage à fournir à l'Assureur toutes les informations nécessaires et exactes concernant sa situation personnelle, financière et médicale, ainsi que toute autre information requise par l'Assureur pour l'évaluation du risque assuré.</p><h2>Article 3 — Cotisation et paiement des primes</h2><p>Le Souscripteur s'engage à payer les primes d'assurance selon les modalités suivantes : {{primes}}. En cas de non-paiement des primes dans les délais spécifiés, l'Assureur se réserve le droit de résilier le contrat conformément aux dispositions légales en vigueur.</p><h2>Article 4 — Désignation des bénéficiaires</h2><p>Le Souscripteur désigne comme bénéficiaire(s) du contrat : {{beneficiaires}}. Cette désignation peut être modifiée à tout moment par le Souscripteur en informant l'Assureur par écrit.</p><h2>Article 5 — Exclusions et limitations de garantie</h2><p>Le présent contrat d'assurance-vie est soumis à certaines exclusions et limitations de garantie spécifiées dans les conditions générales et particulières du contrat. Le Souscripteur reconnaît avoir pris connaissance de ces exclusions et limitations et les accepte expressément.</p><h2>Article 6 — Résiliation du contrat</h2><p>Le contrat d'assurance-vie peut être résilié par le Souscripteur ou par l'Assureur dans les conditions prévues par la réglementation en vigueur et les dispositions contractuelles spécifiques.</p><h2>Article 7 — Loi applicable</h2><p>Ce contrat est régi et interprété conformément aux lois en vigueur au lieu de sa conclusion.</p><p class="signatures">Fait en deux exemplaires originaux à {{ville}}, le {{date_jour}}<br/><br/>Pour l'Assureur (nom et signature du représentant légal) — Pour le Souscripteur (nom et signature)</p></div>`,
    popularity: 58,
    countriesJson: COUNTRIES_ASSURANCE,
  },

  // ─────────────────────────── 2. Assurance santé ───────────────────────────
  {
    code: 'assur_sante', name: 'Contrat d’assurance santé', category: 'assurance', price: 3000, priceMax: 6000,
    description: 'Contrat d’assurance santé : remboursement des frais médicaux et hospitaliers, plafond annuel, primes et résiliation.',
    fieldsJson: F([
      { key: 'assureur', label: 'Compagnie d’assurance (nom, n° d’enregistrement, siège social, représentant légal)', type: 'textarea', required: true },
      { key: 'assure', label: 'Assuré (nom complet + adresse)', type: 'textarea', required: true },
      { key: 'montant_couverture', label: 'Montant de la couverture annuelle (FCFA)', type: 'text', required: true },
      { key: 'prime', label: 'Prime d’assurance annuelle (FCFA)', type: 'text', required: true },
      { key: 'duree', label: 'Durée de la période d’assurance', type: 'text', required: true },
      { key: 'preavis', label: 'Préavis de résiliation (ex. 30 jours)', type: 'text', required: true },
      { key: 'ville', label: 'Ville de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT D'ASSURANCE SANTÉ</h1><p>Entre <strong>{{assureur}}</strong>, dûment habilitée à cet effet, ci-après dénommée « la Compagnie d'Assurance »,</p><p>Et <strong>{{assure}}</strong>, ci-après dénommé « l'Assuré »,</p><p>Ci-après dénommés collectivement les « Parties » et individuellement une « Partie ».</p><p>Considérant que la Compagnie d'Assurance est autorisée à fournir des services d'assurance santé conformément à la réglementation en vigueur, et que l'Assuré souhaite souscrire une assurance santé pour bénéficier d'une couverture médicale adéquate, les Parties conviennent ce qui suit :</p><h2>Article 1 — Objet de l'assurance</h2><p>La Compagnie d'Assurance s'engage à rembourser les frais médicaux et hospitaliers engagés par l'Assuré pour lui-même et ses bénéficiaires désignés, conformément aux termes et conditions de la présente police d'assurance.</p><h2>Article 2 — Périmètre de l'assurance</h2><p>Cette assurance couvre les frais médicaux et hospitaliers nécessaires pour traiter les maladies, blessures ou conditions médicales de l'Assuré, conformément aux dispositions de la police d'assurance.</p><h2>Article 3 — Montant de la couverture</h2><p>La Compagnie d'Assurance remboursera les frais médicaux et hospitaliers jusqu'à concurrence de <strong>{{montant_couverture}} FCFA</strong> par an, sous réserve des limites et exclusions énoncées dans la police.</p><h2>Article 4 — Primes d'assurance</h2><p>L'Assuré s'engage à payer à la Compagnie d'Assurance une prime d'assurance annuelle de <strong>{{prime}} FCFA</strong>, payable en une seule fois ou selon les modalités convenues entre les Parties.</p><h2>Article 5 — Durée de l'assurance</h2><p>Cette assurance est valable pour une période de {{duree}} à compter de la date de prise d'effet de la police, sauf résiliation anticipée conformément aux dispositions de la présente police.</p><h2>Article 6 — Résiliation</h2><p>Chaque Partie a le droit de résilier cette assurance moyennant un préavis écrit de {{preavis}} adressé à l'autre Partie.</p><h2>Article 7 — Loi applicable</h2><p>Ce contrat est régi et interprété conformément aux lois en vigueur au lieu de sa conclusion.</p><p class="signatures">Fait en deux exemplaires originaux à {{ville}}, le {{date_jour}}<br/><br/>Pour la Compagnie d'Assurance (représentant légal) — L'Assuré</p></div>`,
    popularity: 55,
    countriesJson: COUNTRIES_ASSURANCE,
  },

  // ─────────────────────── 3. Responsabilité civile ───────────────────────
  {
    code: 'assur_rc', name: 'Contrat d’assurance responsabilité civile', category: 'assurance', price: 2500, priceMax: 5000,
    description: 'Contrat d’assurance responsabilité civile : couverture des dommages corporels et matériels causés à des tiers.',
    fieldsJson: F([
      { key: 'assureur', label: 'Compagnie d’assurance (nom, n° d’enregistrement, siège social, représentant légal)', type: 'textarea', required: true },
      { key: 'souscripteur', label: 'Souscripteur (nom / raison sociale, adresse ou siège, représentant)', type: 'textarea', required: true },
      { key: 'activites', label: 'Activités couvertes (professionnelles ou privées)', type: 'textarea', required: true },
      { key: 'montant_garantie', label: 'Montant de la garantie (FCFA)', type: 'text', required: true },
      { key: 'prime', label: 'Prime d’assurance (montant et modalités)', type: 'text', required: true },
      { key: 'ville', label: 'Ville de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT D'ASSURANCE RESPONSABILITÉ CIVILE</h1><p>Entre <strong>{{assureur}}</strong>, dûment habilitée à cet effet, ci-après dénommée « la Compagnie d'Assurance »,</p><p>Et <strong>{{souscripteur}}</strong>, ci-après dénommé « le Souscripteur »,</p><p>Ci-après dénommés collectivement les « Parties » et individuellement une « Partie ».</p><p>Considérant que la Compagnie d'Assurance est autorisée à fournir des services d'assurance responsabilité civile conformément à la réglementation en vigueur, et que le Souscripteur souhaite se protéger contre les réclamations de tiers pour des dommages corporels ou matériels survenus dans le cadre de ses activités, les Parties conviennent ce qui suit :</p><h2>Article 1 — Objet de l'assurance</h2><p>La Compagnie d'Assurance s'engage à couvrir les risques de responsabilité civile du Souscripteur pour les dommages corporels et matériels causés à des tiers dans le cadre des activités suivantes : {{activites}}</p><h2>Article 2 — Étendue de la couverture</h2><p>La couverture de l'assurance responsabilité civile inclut, mais n'est pas limitée à, les dommages corporels, les dommages matériels, les frais médicaux, les frais juridiques et les pertes économiques subis par des tiers en raison des activités du Souscripteur.</p><h2>Article 3 — Limites de la couverture</h2><p>La garantie est accordée jusqu'à concurrence de <strong>{{montant_garantie}} FCFA</strong>. Les franchises et exclusions sont détaillées dans les conditions particulières de la police d'assurance, qui font partie intégrante du présent contrat.</p><h2>Article 4 — Prime d'assurance</h2><p>Le Souscripteur s'engage à payer la prime d'assurance suivante : {{prime}}, selon les modalités convenues entre les Parties et spécifiées dans la police d'assurance.</p><h2>Article 5 — Déclaration des sinistres</h2><p>En cas de survenance d'un sinistre couvert par l'assurance responsabilité civile, le Souscripteur s'engage à notifier immédiatement la Compagnie d'Assurance et à coopérer pleinement à l'enquête et à la gestion du sinistre.</p><h2>Article 6 — Résiliation de l'assurance</h2><p>La police d'assurance responsabilité civile peut être résiliée par le Souscripteur ou par la Compagnie d'Assurance selon les conditions stipulées dans la police et conformément à la réglementation en vigueur.</p><h2>Article 7 — Loi applicable</h2><p>Ce contrat est régi et interprété conformément aux lois en vigueur au lieu de sa conclusion.</p><p class="signatures">Fait en deux exemplaires originaux à {{ville}}, le {{date_jour}}<br/><br/>Pour la Compagnie d'Assurance (représentant légal) — Pour le Souscripteur</p></div>`,
    popularity: 50,
    countriesJson: COUNTRIES_ASSURANCE,
  },

  // ──────────────── 4. Responsabilité civile professionnelle ────────────────
  {
    code: 'assur_rc_pro', name: 'Contrat d’assurance RC professionnelle', category: 'assurance', price: 3000, priceMax: 6000,
    description: 'Contrat d’assurance responsabilité civile professionnelle : fautes, négligences et erreurs commises dans l’exercice du métier.',
    fieldsJson: F([
      { key: 'assureur', label: 'Société d’assurance (nom, siège social, représentant légal et titre)', type: 'textarea', required: true },
      { key: 'assure', label: 'Professionnel assuré (nom + adresse professionnelle)', type: 'textarea', required: true },
      { key: 'activite', label: 'Activité professionnelle couverte (ex. construction, conseil…)', type: 'text', required: true },
      { key: 'montant_couverture', label: 'Montant de couverture par incident (FCFA)', type: 'text', required: true },
      { key: 'limite_annuelle', label: 'Limite annuelle totale (FCFA)', type: 'text', required: true },
      { key: 'prime', label: 'Montant de la prime d’assurance (FCFA)', type: 'text', required: true },
      { key: 'duree', label: 'Durée du contrat (ex. 1 an, du 01/01/2027 au 31/12/2027)', type: 'text', required: true },
      { key: 'preavis', label: 'Préavis de résiliation (nombre de jours)', type: 'text', required: true },
      { key: 'ville', label: 'Ville de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT D'ASSURANCE RESPONSABILITÉ CIVILE PROFESSIONNELLE</h1><p>Entre <strong>{{assureur}}</strong>, ci-après dénommée « l'Assureur »,</p><p>Et <strong>{{assure}}</strong>, ci-après dénommé « l'Assuré »,</p><p>Il est convenu ce qui suit :</p><h2>Article 1 — Objet</h2><p>Le présent contrat a pour objet de définir les termes et conditions de la couverture d'assurance responsabilité civile professionnelle offerte par l'Assureur à l'Assuré pour son activité professionnelle : <strong>{{activite}}</strong>.</p><h2>Article 2 — Description de la couverture</h2><p>L'Assureur s'engage à fournir une couverture d'assurance responsabilité civile professionnelle pour l'Assuré. Cette couverture inclut les dommages causés à des tiers en raison de fautes, négligences ou erreurs professionnelles commises par l'Assuré dans le cadre de son activité professionnelle.</p><h2>Article 3 — Montant de la couverture</h2><p>Le montant de la couverture d'assurance est de <strong>{{montant_couverture}} FCFA</strong> par incident, avec une limite annuelle totale de <strong>{{limite_annuelle}} FCFA</strong>. Les détails spécifiques de la couverture sont énoncés dans les conditions particulières de la police d'assurance.</p><h2>Article 4 — Durée du contrat</h2><p>Le contrat d'assurance est établi pour une durée de {{duree}}, sauf renouvellement ou résiliation conformément aux termes du contrat.</p><h2>Article 5 — Prime d'assurance</h2><p>L'Assuré s'engage à payer la prime d'assurance, dont le montant est de <strong>{{prime}} FCFA</strong>, selon les modalités spécifiées dans la police d'assurance.</p><h2>Article 6 — Obligations de l'Assuré</h2><p>L'Assuré s'engage à fournir à l'Assureur toutes les informations nécessaires et à coopérer pleinement dans le cadre de toute enquête ou procédure relative à une réclamation.</p><h2>Article 7 — Résiliation</h2><p>Chacune des parties peut résilier le contrat d'assurance en respectant un préavis écrit de {{preavis}} jours. Les conditions de résiliation sont également détaillées dans la police d'assurance.</p><h2>Article 8 — Dispositions générales</h2><p>Le présent contrat est soumis aux lois en vigueur au lieu de sa conclusion. Toute modification du contrat doit être faite par écrit et signée par les deux parties.</p><p class="signatures">Fait à {{ville}}, le {{date_jour}}, en deux exemplaires originaux<br/><br/>Pour l'Assureur — Pour l'Assuré</p></div>`,
    popularity: 45,
    countriesJson: COUNTRIES_ASSURANCE,
  },

  // ─────────────── 5. RC des dirigeants (D&O) ───────────────
  {
    code: 'assur_rc_dirigeants', name: 'Contrat d’assurance RC des dirigeants (D&O)', category: 'assurance', price: 4000, priceMax: 6000,
    description: 'Assurance responsabilité civile des dirigeants et administrateurs (D&O) : protection contre les réclamations liées à leurs fonctions.',
    fieldsJson: F([
      { key: 'assureur', label: 'Compagnie d’assurance (nom, n° d’enregistrement, siège social, représentant légal)', type: 'textarea', required: true },
      { key: 'societe', label: 'Société assurée (dénomination, n° d’enregistrement, siège social, représentant légal)', type: 'textarea', required: true },
      { key: 'dirigeants', label: 'Dirigeants et administrateurs couverts (noms + fonctions)', type: 'textarea', required: true },
      { key: 'prime', label: 'Prime d’assurance (montant et modalités)', type: 'text', required: true },
      { key: 'franchise', label: 'Franchise applicable (FCFA)', type: 'text', required: true },
      { key: 'ville', label: 'Ville de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT D'ASSURANCE RESPONSABILITÉ CIVILE DES DIRIGEANTS (D&amp;O)</h1><p>Entre <strong>{{assureur}}</strong>, dûment habilitée à cet effet, ci-après dénommée « l'Assureur »,</p><p>Et <strong>{{societe}}</strong>, ci-après dénommée « l'Assuré »,</p><p>Ci-après dénommés collectivement les « Parties » et individuellement une « Partie ».</p><p>Considérant que l'Assureur est autorisé à fournir des services d'assurance responsabilité civile des dirigeants (D&amp;O) conformément à la réglementation en vigueur, et que l'Assuré souhaite protéger ses dirigeants et administrateurs contre les réclamations découlant de leurs fonctions officielles au sein de la société, les Parties conviennent ce qui suit :</p><h2>Article 1 — Objet de l'assurance</h2><p>L'Assureur s'engage à indemniser les dirigeants et administrateurs désignés de l'Assuré, à savoir : {{dirigeants}}, pour les pertes financières encourues en raison de réclamations couvertes par la présente police, conformément aux termes et conditions énoncés dans le contrat.</p><h2>Article 2 — Étendue de la couverture</h2><p>La police couvrira les réclamations découlant d'erreurs, de négligences, de violations de devoirs fiduciaires ou d'autres fautes commises par les dirigeants et administrateurs de l'Assuré dans l'exercice de leurs fonctions officielles.</p><h2>Article 3 — Prime d'assurance</h2><p>L'Assuré s'engage à payer la prime d'assurance suivante : {{prime}}. En cas de non-paiement de la prime dans les délais spécifiés, l'Assureur se réserve le droit de résilier la police conformément aux dispositions légales en vigueur.</p><h2>Article 4 — Franchise</h2><p>La police comporte une franchise de <strong>{{franchise}} FCFA</strong>, représentant la partie des pertes supportée par l'Assuré en cas de réclamation.</p><h2>Article 5 — Procédure de réclamation</h2><p>En cas de réclamation, l'Assuré s'engage à informer immédiatement l'Assureur et à coopérer pleinement dans la gestion de la réclamation. L'Assureur aura le droit exclusif de négocier, de régler ou de contester toute réclamation.</p><h2>Article 6 — Exclusions</h2><p>La police peut comporter des exclusions spécifiques, telles que les réclamations découlant de fraudes ou de violations délibérées de la loi par les dirigeants et administrateurs.</p><h2>Article 7 — Résiliation</h2><p>La police peut être résiliée par l'une ou l'autre des Parties moyennant un préavis écrit conformément aux dispositions légales en vigueur.</p><h2>Article 8 — Loi applicable</h2><p>Ce contrat est régi et interprété conformément aux lois en vigueur au lieu de sa conclusion.</p><p class="signatures">Fait en deux exemplaires originaux à {{ville}}, le {{date_jour}}<br/><br/>Pour l'Assureur (représentant légal) — Pour l'Assuré (représentant légal de la société)</p></div>`,
    popularity: 22,
    countriesJson: COUNTRIES_ASSURANCE,
  },

  // ─────────── 6. Risques naturels (fusion de la série « catastrophes ») ───────────
  {
    code: 'assur_risques_naturels', name: 'Contrat d’assurance risques naturels', category: 'assurance', price: 3500, priceMax: 6000,
    description: 'Contrat générique d’assurance contre les risques naturels et environnementaux : inondation, tempête, grêle, tsunami, glissement de terrain, pollution…',
    fieldsJson: F([
      { key: 'type_de_risque', label: 'Type de risque couvert', type: 'select', required: true, options: ['Inondation', 'Tempête', 'Grêle', 'Tsunami', 'Glissement de terrain', 'Pollution', 'Contamination', 'Déversement chimique'] },
      { key: 'assureur', label: 'Compagnie d’assurance (nom, n° d’enregistrement, siège social, représentant légal)', type: 'textarea', required: true },
      { key: 'assure', label: 'Assuré (nom / raison sociale + adresse ou siège social)', type: 'textarea', required: true },
      { key: 'biens', label: 'Biens assurés (désignation, valeur, localisation, mesures de prévention)', type: 'textarea', required: true },
      { key: 'montant_garantie', label: 'Montant de la garantie (FCFA)', type: 'text', required: true },
      { key: 'franchise', label: 'Franchise applicable (FCFA)', type: 'text', required: false },
      { key: 'ville', label: 'Ville de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT D'ASSURANCE POUR LES RISQUES DE {{type_de_risque}}</h1><p>Entre <strong>{{assureur}}</strong>, dûment habilitée à cet effet, ci-après dénommée « l'Assureur »,</p><p>Et <strong>{{assure}}</strong>, personne physique ou morale, ci-après dénommé « l'Assuré »,</p><p>Ci-après dénommés collectivement les « Parties » et individuellement une « Partie ».</p><p>Considérant que l'Assureur est autorisé à fournir des services d'assurance conformément à la réglementation en vigueur, et que l'Assuré souhaite se prémunir contre le risque suivant : <strong>{{type_de_risque}}</strong>, susceptible d'endommager ses biens et ses activités, les Parties conviennent ce qui suit :</p><h2>Article 1 — Objet du contrat</h2><p>L'Assureur s'engage à indemniser l'Assuré en cas de dommages causés par le risque de {{type_de_risque}}, conformément aux termes et conditions énoncés dans le présent contrat.</p><h2>Article 2 — Risques couverts</h2><p>Le présent contrat couvre les pertes et dommages matériels subis par l'Assuré en raison du risque de {{type_de_risque}}, y compris les dommages causés aux bâtiments, aux biens mobiliers, aux stocks, ainsi que les pertes d'exploitation consécutives et, le cas échéant, les coûts de nettoyage et de remise en état.</p><h2>Article 3 — Montant de la garantie</h2><p>La garantie offerte par l'Assureur est fixée à <strong>{{montant_garantie}} FCFA</strong> et sera précisée dans les conditions particulières du contrat, en fonction de la valeur des biens assurés, de leur localisation, de l'exposition au risque et d'autres facteurs pertinents.</p><h2>Article 4 — Déclaration du risque</h2><p>L'Assuré s'engage à fournir à l'Assureur toutes les informations nécessaires et exactes concernant les biens à assurer : {{biens}}</p><h2>Article 5 — Cotisation et paiement des primes</h2><p>L'Assuré s'engage à payer les primes d'assurance à l'Assureur selon les modalités convenues entre les Parties. Les primes seront calculées en fonction de la valeur des biens assurés, de l'exposition au risque, des mesures de prévention en place et d'autres facteurs pertinents.</p><h2>Article 6 — Exclusions et limitations de garantie</h2><p>Le présent contrat d'assurance est soumis à certaines exclusions et limitations de garantie spécifiées dans les conditions générales et particulières du contrat. L'Assuré reconnaît avoir pris connaissance de ces exclusions et limitations et les accepte expressément.</p><h2>Article 7 — Franchise</h2><p>En cas de sinistre, une franchise de {{franchise}} FCFA sera appliquée selon les termes convenus dans les conditions particulières du contrat. Le montant de la franchise sera déduit de l'indemnisation versée par l'Assureur à l'Assuré.</p><h2>Article 8 — Résiliation du contrat</h2><p>Le contrat d'assurance peut être résilié par l'Assuré ou par l'Assureur dans les conditions prévues par la réglementation en vigueur et les dispositions contractuelles spécifiques.</p><h2>Article 9 — Loi applicable</h2><p>Ce contrat est régi et interprété conformément aux lois en vigueur au lieu de sa conclusion.</p><p class="signatures">Fait en deux exemplaires originaux à {{ville}}, le {{date_jour}}<br/><br/>Pour l'Assureur (représentant légal) — Pour l'Assuré</p></div>`,
    popularity: 35,
    countriesJson: COUNTRIES_ASSURANCE,
  },

  // ─────────────── 7. Cyber-risques / vol de données ───────────────
  {
    code: 'assur_vol_donnees', name: 'Contrat d’assurance vol de données (cyber)', category: 'assurance', price: 4000, priceMax: 6000,
    description: 'Contrat d’assurance contre le vol, la perte ou l’accès non autorisé aux données confidentielles de l’entreprise.',
    fieldsJson: F([
      { key: 'assureur', label: 'Compagnie d’assurance (nom, n° d’enregistrement, siège social, représentant légal)', type: 'textarea', required: true },
      { key: 'assure', label: 'Assuré (nom / raison sociale + adresse ou siège social)', type: 'textarea', required: true },
      { key: 'donnees', label: 'Données assurées (nature : personnelles, financières, commerciales… et valeur)', type: 'textarea', required: true },
      { key: 'mesures_securite', label: 'Mesures de sécurité en place (chiffrement, sauvegardes, contrôle d’accès…)', type: 'textarea', required: true },
      { key: 'montant_garantie', label: 'Montant de la garantie (FCFA)', type: 'text', required: true },
      { key: 'ville', label: 'Ville de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT D'ASSURANCE POUR LES RISQUES DE VOL DE DONNÉES</h1><p>Entre <strong>{{assureur}}</strong>, dûment habilitée à cet effet, ci-après dénommée « l'Assureur »,</p><p>Et <strong>{{assure}}</strong>, personne physique ou morale, ci-après dénommé « l'Assuré »,</p><p>Ci-après dénommés collectivement les « Parties » et individuellement une « Partie ».</p><p>Considérant que l'Assureur est autorisé à fournir des services d'assurance conformément à la réglementation en vigueur, et que l'Assuré souhaite se prémunir contre les risques de vol, de perte ou d'accès non autorisé à ses données confidentielles, les Parties conviennent ce qui suit :</p><h2>Article 1 — Objet du contrat</h2><p>L'Assureur s'engage à indemniser l'Assuré en cas de vol, de perte ou d'accès non autorisé à ses données confidentielles, conformément aux termes et conditions énoncés dans le présent contrat.</p><h2>Article 2 — Risques couverts</h2><p>Le présent contrat couvre les pertes subies par l'Assuré en cas de vol, de perte ou d'accès non autorisé à ses données confidentielles, y compris mais sans s'y limiter, les données personnelles, financières, commerciales ou sensibles suivantes : {{donnees}}</p><h2>Article 3 — Montant de la garantie</h2><p>La garantie offerte par l'Assureur est fixée à <strong>{{montant_garantie}} FCFA</strong> et sera précisée dans les conditions particulières du contrat, en fonction de la valeur des données assurées, de leur importance pour l'activité de l'Assuré et d'autres facteurs pertinents.</p><h2>Article 4 — Déclaration du risque</h2><p>L'Assuré s'engage à fournir à l'Assureur toutes les informations nécessaires et exactes concernant ses données confidentielles à assurer, ainsi que les mesures de sécurité mises en place pour les protéger : {{mesures_securite}}</p><h2>Article 5 — Cotisation et paiement des primes</h2><p>L'Assuré s'engage à payer les primes d'assurance à l'Assureur selon les modalités convenues entre les Parties. Les primes seront calculées en fonction de la valeur des données assurées, du niveau de risque, des mesures de sécurité en place et d'autres facteurs pertinents.</p><h2>Article 6 — Exclusions et limitations de garantie</h2><p>Le présent contrat d'assurance est soumis à certaines exclusions et limitations de garantie spécifiées dans les conditions générales et particulières du contrat. L'Assuré reconnaît avoir pris connaissance de ces exclusions et limitations et les accepte expressément.</p><h2>Article 7 — Franchise</h2><p>En cas de sinistre, une franchise peut être appliquée selon les termes convenus dans les conditions particulières du contrat. Le montant de la franchise sera déduit de l'indemnisation versée par l'Assureur à l'Assuré.</p><h2>Article 8 — Résiliation du contrat</h2><p>Le contrat d'assurance peut être résilié par l'Assuré ou par l'Assureur dans les conditions prévues par la réglementation en vigueur et les dispositions contractuelles spécifiques.</p><h2>Article 9 — Loi applicable</h2><p>Ce contrat est régi et interprété conformément aux lois en vigueur au lieu de sa conclusion.</p><p class="signatures">Fait en deux exemplaires originaux à {{ville}}, le {{date_jour}}<br/><br/>Pour l'Assureur (représentant légal) — Pour l'Assuré</p></div>`,
    popularity: 30,
    countriesJson: COUNTRIES_ASSURANCE,
  },

  // ─────────────── 8. Risques liés à l'élevage ───────────────
  {
    code: 'assur_elevage', name: 'Contrat d’assurance risques d’élevage', category: 'assurance', price: 3000, priceMax: 5500,
    description: 'Assurance des activités d’élevage : maladies animales, accidents, pertes de bétail, prédateurs et catastrophes naturelles.',
    fieldsJson: F([
      { key: 'assureur', label: 'Compagnie d’assurance (nom, n° d’enregistrement, siège social, représentant légal)', type: 'textarea', required: true },
      { key: 'proprietaire', label: 'Propriétaire / exploitation agricole (nom + adresse ou siège social)', type: 'textarea', required: true },
      { key: 'cheptel', label: 'Cheptel assuré (espèces, nombre d’animaux, valeur, conditions de logement)', type: 'textarea', required: true },
      { key: 'risques_particuliers', label: 'Risques particuliers à couvrir (facultatif)', type: 'textarea', required: false },
      { key: 'primes', label: 'Primes d’assurance (montant et modalités)', type: 'text', required: true },
      { key: 'ville', label: 'Ville de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT D'ASSURANCE POUR LES RISQUES LIÉS À L'ÉLEVAGE</h1><p>Entre <strong>{{assureur}}</strong>, dûment habilitée à cet effet, ci-après dénommée « l'Assureur »,</p><p>Et <strong>{{proprietaire}}</strong>, personne physique ou morale, ci-après dénommé « le Propriétaire »,</p><p>Ci-après dénommés collectivement les « Parties » et individuellement une « Partie ».</p><p>Considérant que l'Assureur est autorisé à fournir des services d'assurance conformément à la réglementation en vigueur, et que le Propriétaire est propriétaire d'animaux ou exploite une activité d'élevage et souhaite obtenir une couverture d'assurance pour les risques liés à cette activité, les Parties conviennent ce qui suit :</p><h2>Article 1 — Objet du contrat</h2><p>L'Assureur s'engage à indemniser le Propriétaire pour les pertes ou dommages subis dans le cadre de son activité d'élevage, conformément aux termes et conditions énoncés dans le présent contrat.</p><h2>Article 2 — Risques couverts</h2><p>Le présent contrat couvre les pertes ou dommages résultant des risques spécifiés dans les conditions générales et particulières du contrat, y compris mais sans s'y limiter : les maladies animales, les accidents, les pertes de bétail, les dommages causés par des prédateurs et les catastrophes naturelles. Risques particuliers convenus : {{risques_particuliers}}</p><h2>Article 3 — Déclaration du risque</h2><p>Le Propriétaire s'engage à fournir à l'Assureur toutes les informations nécessaires et exactes concernant son activité d'élevage, notamment : {{cheptel}}, les pratiques d'alimentation et tout autre facteur pertinent pour l'évaluation du risque assuré.</p><h2>Article 4 — Cotisation et paiement des primes</h2><p>Le Propriétaire s'engage à payer les primes d'assurance suivantes : {{primes}}. Les primes sont calculées en fonction du nombre d'animaux assurés, de leur valeur, de leur espèce et d'autres facteurs de risque pertinents.</p><h2>Article 5 — Exclusions et limitations de garantie</h2><p>Le présent contrat d'assurance est soumis à certaines exclusions et limitations de garantie spécifiées dans les conditions générales et particulières du contrat. Le Propriétaire reconnaît avoir pris connaissance de ces exclusions et limitations et les accepte expressément.</p><h2>Article 6 — Franchise</h2><p>En cas de sinistre, une franchise peut être appliquée selon les termes convenus dans les conditions particulières du contrat. Le montant de la franchise sera déduit de l'indemnisation versée par l'Assureur au Propriétaire.</p><h2>Article 7 — Résiliation du contrat</h2><p>Le contrat d'assurance peut être résilié par le Propriétaire ou par l'Assureur dans les conditions prévues par la réglementation en vigueur et les dispositions contractuelles spécifiques.</p><h2>Article 8 — Loi applicable</h2><p>Ce contrat est régi et interprété conformément aux lois en vigueur au lieu de sa conclusion.</p><p class="signatures">Fait en deux exemplaires originaux à {{ville}}, le {{date_jour}}<br/><br/>Pour l'Assureur (représentant légal) — Pour le Propriétaire</p></div>`,
    popularity: 26,
    countriesJson: COUNTRIES_ASSURANCE,
  },

  // ─────────────── 9. Attestation d'assurance ───────────────
  {
    code: 'assur_attestation', name: 'Attestation d’assurance', category: 'assurance', price: 2000, priceMax: 4000,
    description: 'Attestation d’assurance délivrée par la compagnie : police en cours de validité, montant et période de couverture.',
    fieldsJson: F([
      { key: 'assureur', label: 'Compagnie d’assurance (nom + coordonnées)', type: 'textarea', required: true },
      { key: 'assure', label: 'Assuré (nom de l’entreprise ou du particulier)', type: 'text', required: true },
      { key: 'numero_police', label: 'Numéro de la police d’assurance', type: 'text', required: true },
      { key: 'type_couverture', label: 'Type de couverture', type: 'select', required: true, options: ['Responsabilité civile générale', 'Responsabilité civile professionnelle', 'Assurance de marchandises', 'Multirisque professionnelle', 'Assurance automobile'] },
      { key: 'montant_couverture', label: 'Montant de la couverture (FCFA)', type: 'text', required: true },
      { key: 'date_debut', label: 'Date de début de la couverture', type: 'date', required: true },
      { key: 'date_fin', label: 'Date de fin de la couverture', type: 'date', required: true },
      { key: 'organisme', label: 'Organisme demandeur / projet ou appel d’offres (facultatif)', type: 'text', required: false },
      { key: 'agent', label: 'Agent signataire (nom + titre)', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>ATTESTATION D'ASSURANCE</h1><p><strong>{{assureur}}</strong></p><p>La compagnie d'assurance atteste que <strong>{{assure}}</strong> est titulaire d'une police d'assurance valide et en cours de validité pour la période allant du {{date_debut}} au {{date_fin}}, conformément à la police d'assurance numéro <strong>{{numero_police}}</strong>.</p><h2>Détails de la couverture d'assurance</h2><p><strong>Type de couverture :</strong> {{type_couverture}}<br/><strong>Montant de la couverture :</strong> {{montant_couverture}} FCFA<br/><strong>Période de validité :</strong> du {{date_debut}} au {{date_fin}}</p><p><strong>Nature de la couverture :</strong> cette assurance couvre les dommages matériels, corporels et immatériels causés à des tiers par l'assuré ou ses employés dans le cadre de ses activités, conformément aux conditions de la police.</p><p>La compagnie d'assurance confirme que la police mentionnée ci-dessus est conforme aux exigences requises par : {{organisme}}.</p><p>La présente attestation est délivrée de bonne foi et n'implique aucune responsabilité supplémentaire au-delà de la couverture spécifiée dans la police d'assurance. Elle est établie pour servir et valoir ce que de droit.</p><p class="signatures">Date d'émission : {{date_jour}}<br/><br/>{{agent}}<br/>(signature de l'agent d'assurance et sceau de la compagnie)</p></div>`,
    popularity: 60,
  },

  // ─────────────── 10. Lettre de résiliation d'assurance santé ───────────────
  {
    code: 'assur_resiliation_sante', name: 'Lettre de résiliation d’assurance santé', category: 'assurance', price: 2000, priceMax: 3500,
    description: 'Lettre recommandée de résiliation d’un contrat d’assurance santé ou mutuelle, avec demande d’arrêt des prélèvements.',
    fieldsJson: F([
      { key: 'expediteur', label: 'Vos coordonnées (civilité, nom, prénom, adresse, téléphone, n° client)', type: 'textarea', required: true },
      { key: 'assureur', label: 'Assureur destinataire (nom + adresse)', type: 'textarea', required: true },
      { key: 'numero_contrat', label: 'Numéro du contrat d’assurance santé', type: 'text', required: true },
      { key: 'date_souscription', label: 'Date de souscription du contrat', type: 'date', required: true },
      { key: 'motif', label: 'Motif de la résiliation (ex. adhésion obligatoire à une assurance santé collective du nouvel employeur)', type: 'textarea', required: true },
      { key: 'date_effet', label: 'Date de résiliation souhaitée', type: 'date', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p><strong>{{expediteur}}</strong></p><p>À : {{assureur}}</p><p class="align-right">{{ville}}, le {{date_jour}}</p><p>Lettre recommandée avec avis de réception</p><p>Objet : <strong>Résiliation du contrat d'assurance santé n° {{numero_contrat}}</strong></p><p>Madame, Monsieur,</p><p>Je vous demande par la présente de bien vouloir mettre fin au contrat d'assurance santé n° {{numero_contrat}} que j'ai souscrit le {{date_souscription}}.</p><p>Cette résiliation est motivée par ce qui suit : {{motif}}</p><p>Je vous remercie donc de prendre en compte la résiliation de mon contrat d'assurance santé individuelle à compter du {{date_effet}}, et de me faire parvenir, dans les plus brefs délais, un relevé d'information ainsi qu'une confirmation écrite m'indiquant la date de résiliation effective de mon contrat.</p><p>Par suite, je vous prie de bien vouloir suspendre les prélèvements automatiques sur mon compte bancaire pour ce contrat d'assurance santé individuelle.</p><p>Vous souhaitant bonne réception de ce courrier, je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.</p><p class="signatures">Signature<br/><br/>Pièces jointes : copie du contrat d'assurance santé individuelle ; tout justificatif du motif invoqué.</p></div>`,
    popularity: 52,
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
  console.log('✅ Seed Drive ASSURANCE terminé.');
  console.log(`   Templates du script : ${templates.length} (créés : ${created}, mis à jour : ${updated})`);
  console.log(`   Catégorie : assurance — codes préfixés 'assur_'`);
  console.log(`   ➜ Total de templates en base : ${total}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
