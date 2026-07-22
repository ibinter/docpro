// Seed Drive3 Juridique & Gestion Administrative — Agent Drive3-7/10 : 25 templates DISTINCTS
// tirés du pack Google Drive IBIG JUR-002 « Pack Juridique & Gestion Administrative — 150+ modèles »
// (sous-dossiers Constitution de Société, Procurations, Procédures judiciaires, Déclarations
// sous Serments, Renonciation à un Droit), complété par JUR-007 et IBI068.
//
// Le pack source est une bibliothèque de modèles génériques ; les actes de constitution / cession /
// procuration générique y figurant sont DÉJÀ couverts par les seeds aff_* (Drive2/Drive3 Affaires)
// et adm_* antérieurs. Ce script apporte donc les 25 pièces DISTINCTES et non prises que réclame
// un catalogue OHADA/CI réel : formes sociétaires unipersonnelles, formalités d'immatriculation et
// procédures civiles/pénales (AUPSRVE, AUSCGIE, CPC/CPP), plus les attestations administratives.
//
// FUSIONS opérées (textes source quasi identiques regroupés en un seul modèle paramétrable) :
//  - Procuration spéciale « banque / impôts / poste / véhicule » → adm_procuration_speciale (1 modèle, champ « objet »)
//  - Sommation « de payer » + sommation « de faire / de délivrer » → adm_sommation_payer_faire (1 modèle, champ « nature »)
//  - Plainte : simple → adm_plainte_simple ; avec constitution de partie civile → adm_plainte_partie_civile (conservés distincts, régimes différents)
//
// Script ADDITIF : upsert par code — n'écrase aucun template existant. Aucun code ne collisionne
// avec les codes existants (adm_* antérieurs, aff_*, statuts_sarl/sas/sa, procuration, pv_assemblee_generale…).
// Exécution : npx tsx prisma/seed-drive3-admin.ts
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

const SOCIETES_COUNTRIES = JSON.stringify({
  OHADA: { note: 'Acte uniforme relatif au droit des sociétés commerciales et du GIE (AUSCGIE révisé du 30/01/2014) ; immatriculation au Registre du Commerce et du Crédit Mobilier (RCCM).' },
  FR: { note: 'Code de commerce (livre II — sociétés commerciales) et Code civil (art. 1832 s.) ; immatriculation au Registre du commerce et des sociétés (RCS).' },
});

const SOCIETE_CIVILE_COUNTRIES = JSON.stringify({
  OHADA: { note: 'Société civile régie par le droit civil national des États membres (Code civil) ; l’AUSCGIE régit les sociétés commerciales, non les sociétés civiles.' },
  FR: { note: 'Code civil, art. 1832 s. et art. 1845 s. (sociétés civiles) ; immatriculation au RCS.' },
});

const RBE_COUNTRIES = JSON.stringify({
  OHADA: { note: 'Déclaration des bénéficiaires effectifs exigée par les dispositifs LBC/FT (Règlement CEMAC/UEMOA et lois nationales anti-blanchiment) et tenue au fichier du RCCM.' },
  FR: { note: 'Registre des bénéficiaires effectifs (RBE) — art. L.561-46 s. du Code monétaire et financier ; dépôt au greffe du tribunal de commerce.' },
});

const AUPSRVE_COUNTRIES = JSON.stringify({
  OHADA: { note: 'Acte uniforme portant organisation des procédures simplifiées de recouvrement et des voies d’exécution (AUPSRVE) : injonction de payer (art. 1 s.), saisie-attribution (art. 153 s.).' },
  FR: { note: 'Code de procédure civile (injonction de payer, art. 1405 s.) et Code des procédures civiles d’exécution (saisie-attribution, art. L.211-1 s.).' },
});

const PROCEDURE_COUNTRIES = JSON.stringify({
  OHADA: { note: 'Procédure civile régie par les codes nationaux (ex. Code de procédure civile, commerciale et administrative ivoirien) ; voies d’exécution par l’AUPSRVE.' },
  FR: { note: 'Code de procédure civile (assignation, constitution d’avocat, appel, opposition — art. 54 s., 538 s., 571 s.).' },
});

const PENAL_COUNTRIES = JSON.stringify({
  OHADA: { note: 'Procédure pénale régie par les codes de procédure pénale nationaux des États membres (plainte, constitution de partie civile devant le doyen des juges d’instruction).' },
  FR: { note: 'Code de procédure pénale : plainte simple (art. 40), plainte avec constitution de partie civile (art. 85 s.), main courante (registre de police/gendarmerie).' },
});

const MANDAT_COUNTRIES = JSON.stringify({
  OHADA: { note: 'Mandat régi par le droit national des obligations ; légalisation de signature par l’autorité administrative compétente (mairie, préfecture).' },
  FR: { note: 'Mandat — art. 1984 s. du Code civil ; légalisation de signature en mairie (décret n°2000-1277).' },
});

const ADMIN_COUNTRIES = JSON.stringify({
  OHADA: { note: 'Formalités administratives régies par les textes nationaux ; légalisation et certification matérielle de signature par l’autorité municipale ou consulaire.' },
  FR: { note: 'Formalités administratives ; autorisation de sortie du territoire du mineur (art. 371-6 du Code civil, décret n°2016-1483).' },
});

const templates: DriveTemplate[] = [
  // ════════════════ CONSTITUTION DE SOCIÉTÉ — FORMES & FORMALITÉS (8) ════════════════
  {
    code: 'adm_statuts_sarl_unipersonnelle',
    name: 'Statuts de SARL unipersonnelle (associé unique)',
    category: 'juridique_admin',
    price: 3000, priceMax: 5000,
    description: 'Statuts complets d’une société à responsabilité limitée à associé unique (SARL unipersonnelle) conformes à l’AUSCGIE : forme, dénomination, objet, siège, durée, capital et apports de l’associé unique, gérance, pouvoirs de décision de l’associé unique, exercice social et affectation du résultat.',
    fieldsJson: F([
      { key: 'associe_unique', label: 'Associé unique (nom complet ou dénomination + adresse / nationalité)', type: 'textarea', required: true },
      { key: 'denomination', label: 'Dénomination sociale (suivie de « SARL unipersonnelle »)', type: 'text', required: true },
      { key: 'objet', label: 'Objet social (activités)', type: 'textarea', required: true },
      { key: 'siege', label: 'Siège social (adresse complète)', type: 'textarea', required: true },
      { key: 'duree', label: 'Durée de la société (en années, 99 maximum)', type: 'text', required: true },
      { key: 'capital', label: 'Montant du capital social (chiffres + lettres, devise)', type: 'text', required: true },
      { key: 'apports', label: 'Nature et évaluation des apports (numéraire et/ou nature)', type: 'textarea', required: true },
      { key: 'nombre_parts', label: 'Nombre de parts sociales et valeur nominale', type: 'text', required: true },
      { key: 'gerant', label: 'Gérant désigné (nom complet + adresse)', type: 'textarea', required: true },
      { key: 'ville_rccm', label: 'Ville d’immatriculation au RCCM', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>STATUTS</h1><h2>Société à responsabilité limitée à associé unique</h2><p>Le soussigné :</p><p>{{associe_unique}},</p><p>ci-après « l’Associé unique », a établi ainsi qu’il suit les statuts de la société à responsabilité limitée unipersonnelle qu’il constitue.</p><h2>Article 1 — Forme</h2><p>Il est formé une société à responsabilité limitée ne comportant qu’une seule personne, régie par l’Acte uniforme relatif au droit des sociétés commerciales et du groupement d’intérêt économique, par les lois en vigueur et par les présents statuts. Elle fonctionne comme une société à responsabilité limitée pluripersonnelle sous réserve des règles particulières applicables à l’associé unique.</p><h2>Article 2 — Dénomination</h2><p>La société a pour dénomination : <strong>{{denomination}}</strong>. Tous actes et documents émanant de la société portent la dénomination précédée ou suivie des mots « société à responsabilité limitée unipersonnelle » ou du sigle « SARL U » et de l’énonciation du capital social.</p><h2>Article 3 — Objet</h2><p>La société a pour objet, dans tout État et à l’étranger : {{objet}}, ainsi que toutes opérations se rattachant directement ou indirectement à cet objet et susceptibles d’en favoriser la réalisation.</p><h2>Article 4 — Siège social</h2><p>Le siège social est fixé à : {{siege}}. Il peut être transféré par décision de l’Associé unique.</p><h2>Article 5 — Durée</h2><p>La durée de la société est de {{duree}} années à compter de son immatriculation au Registre du Commerce et du Crédit Mobilier, sauf dissolution anticipée ou prorogation.</p><h2>Article 6 — Apports</h2><p>L’Associé unique apporte à la société : {{apports}}. Les apports en numéraire sont intégralement libérés et déposés au crédit d’un compte ouvert au nom de la société.</p><h2>Article 7 — Capital social</h2><p>Le capital social est fixé à la somme de <strong>{{capital}}</strong>. Il est divisé en {{nombre_parts}}, intégralement souscrites par l’Associé unique et entièrement libérées.</p><h2>Article 8 — Parts sociales</h2><p>Les parts sociales ne peuvent être représentées par des titres négociables. La cession et la transmission des parts s’opèrent librement au profit de toute personne ; en cas de pluralité d’associés ultérieure, elles obéissent aux règles de l’AUSCGIE.</p><h2>Article 9 — Gérance</h2><p>La société est gérée par {{gerant}}, nommé pour une durée indéterminée. Le gérant est investi des pouvoirs les plus étendus pour agir au nom de la société dans la limite de l’objet social. Lorsque l’Associé unique n’est pas gérant, il peut révoquer le gérant et en nommer un nouveau.</p><h2>Article 10 — Décisions de l’associé unique</h2><p>L’Associé unique exerce les pouvoirs dévolus à l’assemblée des associés. Ses décisions sont répertoriées dans un registre coté et paraphé. L’Associé unique ne peut déléguer ses pouvoirs. Il statue notamment sur l’approbation des comptes, l’affectation du résultat, la nomination du gérant et la modification des statuts.</p><h2>Article 11 — Exercice social</h2><p>L’exercice social commence le 1er janvier et se termine le 31 décembre de chaque année. Par exception, le premier exercice court de l’immatriculation au 31 décembre suivant.</p><h2>Article 12 — Affectation du résultat</h2><p>Sur le bénéfice net de l’exercice, il est prélevé les sommes portées en réserve légale. Le solde constitue le bénéfice distribuable dont l’Associé unique fixe l’affectation.</p><h2>Article 13 — Dissolution — Liquidation</h2><p>La dissolution de la société entraîne sa liquidation. L’Associé unique, personne physique, exerce les fonctions de liquidateur ou désigne un tiers.</p><h2>Article 14 — Immatriculation</h2><p>La société sera immatriculée au Registre du Commerce et du Crédit Mobilier de {{ville_rccm}}. Tous pouvoirs sont donnés au gérant à cet effet.</p><p class="signatures">Fait à {{ville_rccm}}, le {{date_jour}}, en autant d’originaux que requis par la loi.<br/><br/>L’ASSOCIÉ UNIQUE<br/>(Signature)</p></div>`,
    popularity: 48,
    countriesJson: SOCIETES_COUNTRIES,
  },
  {
    code: 'adm_statuts_sasu',
    name: 'Statuts de SAS unipersonnelle (SASU)',
    category: 'juridique_admin',
    price: 3000, priceMax: 5000,
    description: 'Statuts d’une société par actions simplifiée unipersonnelle (SASU) conformes à l’AUSCGIE : forme, capital et actions de l’associé unique, présidence, liberté d’organisation, décisions de l’associé unique, conventions réglementées, exercice social et clauses de sortie.',
    fieldsJson: F([
      { key: 'associe_unique', label: 'Associé unique (nom / dénomination + adresse)', type: 'textarea', required: true },
      { key: 'denomination', label: 'Dénomination sociale (suivie de « SASU »)', type: 'text', required: true },
      { key: 'objet', label: 'Objet social', type: 'textarea', required: true },
      { key: 'siege', label: 'Siège social', type: 'textarea', required: true },
      { key: 'duree', label: 'Durée (en années)', type: 'text', required: true },
      { key: 'capital', label: 'Capital social (chiffres + lettres + devise)', type: 'text', required: true },
      { key: 'nombre_actions', label: 'Nombre d’actions et valeur nominale', type: 'text', required: true },
      { key: 'apports', label: 'Apports (numéraire / nature)', type: 'textarea', required: true },
      { key: 'president', label: 'Président désigné (nom + adresse)', type: 'textarea', required: true },
      { key: 'ville_rccm', label: 'Ville d’immatriculation au RCCM', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>STATUTS</h1><h2>Société par actions simplifiée unipersonnelle</h2><p>Le soussigné : {{associe_unique}}, ci-après « l’Associé unique », établit les statuts de la société par actions simplifiée unipersonnelle qu’il constitue.</p><h2>Article 1 — Forme</h2><p>Il est formé une société par actions simplifiée ne comprenant qu’un seul associé, régie par l’Acte uniforme relatif au droit des sociétés commerciales et du GIE et par les présents statuts. Elle ne peut faire appel public à l’épargne.</p><h2>Article 2 — Dénomination</h2><p>La dénomination sociale est : <strong>{{denomination}}</strong>, précédée ou suivie des mots « société par actions simplifiée unipersonnelle » ou du sigle « SASU ».</p><h2>Article 3 — Objet</h2><p>La société a pour objet : {{objet}}, et toutes opérations connexes.</p><h2>Article 4 — Siège social</h2><p>Le siège social est fixé à : {{siege}}.</p><h2>Article 5 — Durée</h2><p>La durée est de {{duree}} années à compter de l’immatriculation au RCCM.</p><h2>Article 6 — Apports et capital</h2><p>L’Associé unique apporte : {{apports}}. Le capital social est fixé à <strong>{{capital}}</strong>, divisé en {{nombre_actions}}, intégralement souscrites et libérées par l’Associé unique.</p><h2>Article 7 — Actions</h2><p>Les actions sont nominatives. Tant que la société demeure unipersonnelle, les actions sont librement cessibles. La propriété résulte de leur inscription au registre des mouvements de titres.</p><h2>Article 8 — Président</h2><p>La société est représentée à l’égard des tiers par un Président, personne physique ou morale. Est nommé Président : {{president}}. Le Président dirige la société et la représente ; il est investi des pouvoirs les plus étendus dans la limite de l’objet social.</p><h2>Article 9 — Décisions de l’associé unique</h2><p>L’Associé unique exerce les pouvoirs dévolus à la collectivité des associés. Ses décisions sont constatées par des procès-verbaux inscrits sur un registre coté et paraphé. Il statue sur l’approbation des comptes annuels, l’affectation du résultat, la nomination des dirigeants et les modifications statutaires.</p><h2>Article 10 — Conventions réglementées</h2><p>Les conventions intervenues entre la société et son dirigeant ou son associé unique sont mentionnées au registre des décisions ; le commissaire aux comptes, s’il en existe, en est avisé.</p><h2>Article 11 — Commissaire aux comptes</h2><p>Un commissaire aux comptes est désigné lorsque les seuils légaux l’imposent.</p><h2>Article 12 — Exercice social et résultat</h2><p>L’exercice social court du 1er janvier au 31 décembre. Après dotation de la réserve légale, l’Associé unique fixe l’affectation du résultat.</p><h2>Article 13 — Dissolution</h2><p>La dissolution entraîne la liquidation dans les conditions de l’AUSCGIE.</p><h2>Article 14 — Immatriculation</h2><p>La société est immatriculée au RCCM de {{ville_rccm}} ; tous pouvoirs sont donnés au Président.</p><p class="signatures">Fait à {{ville_rccm}}, le {{date_jour}}.<br/><br/>L’ASSOCIÉ UNIQUE — LE PRÉSIDENT<br/>(Signatures)</p></div>`,
    popularity: 42,
    countriesJson: SOCIETES_COUNTRIES,
  },
  {
    code: 'adm_statuts_gie',
    name: 'Statuts de Groupement d’Intérêt Économique (GIE)',
    category: 'juridique_admin',
    price: 2500, priceMax: 4500,
    description: 'Statuts d’un groupement d’intérêt économique (GIE) conformes aux art. 869 et suivants de l’AUSCGIE : objet de prolongement de l’activité économique des membres, avec ou sans capital, administration, responsabilité indéfinie et solidaire des membres, admission et retrait, durée.',
    fieldsJson: F([
      { key: 'membres', label: 'Membres fondateurs (nom / dénomination + adresse, un par ligne)', type: 'textarea', required: true },
      { key: 'denomination', label: 'Dénomination du GIE', type: 'text', required: true },
      { key: 'objet', label: 'Objet du groupement (activité économique des membres à prolonger)', type: 'textarea', required: true },
      { key: 'siege', label: 'Siège du groupement', type: 'textarea', required: true },
      { key: 'duree', label: 'Durée du groupement (en années)', type: 'text', required: true },
      { key: 'capital', label: 'Capital (montant + devise) ou mention « sans capital »', type: 'text', required: true },
      { key: 'administrateur', label: 'Administrateur(s) du groupement (nom + adresse)', type: 'textarea', required: true },
      { key: 'ville_rccm', label: 'Ville d’immatriculation au RCCM', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>STATUTS DU GROUPEMENT D’INTÉRÊT ÉCONOMIQUE</h1><p>Entre les soussignés :</p><p>{{membres}},</p><p>ci-après « les Membres », il est constitué un groupement d’intérêt économique régi par les articles 869 et suivants de l’Acte uniforme relatif au droit des sociétés commerciales et du GIE et par les présents statuts.</p><h2>Article 1 — Constitution et objet</h2><p>Le groupement a pour but exclusif de mettre en œuvre tous les moyens propres à faciliter ou à développer l’activité économique de ses Membres, à améliorer ou accroître les résultats de cette activité. Son objet est : {{objet}}. Son activité se rattache essentiellement à l’activité économique de ses Membres et ne peut avoir qu’un caractère auxiliaire par rapport à celle-ci. Le groupement ne donne pas lieu par lui-même à réalisation et partage de bénéfices.</p><h2>Article 2 — Dénomination</h2><p>Le groupement a pour dénomination : <strong>{{denomination}}</strong>, suivie du sigle « GIE ».</p><h2>Article 3 — Siège</h2><p>Le siège est fixé à : {{siege}}.</p><h2>Article 4 — Durée</h2><p>La durée du groupement est de {{duree}} années à compter de son immatriculation au RCCM.</p><h2>Article 5 — Capital</h2><p>Le groupement est constitué avec le capital suivant : {{capital}}. Le groupement peut être constitué sans capital ; dans ce cas, son fonctionnement est assuré par les cotisations de ses Membres.</p><h2>Article 6 — Droits et obligations des membres</h2><p>Les Membres du groupement sont tenus des dettes de celui-ci sur leur patrimoine propre, indéfiniment et solidairement, sauf convention contraire avec le tiers cocontractant. Les Membres contribuent aux charges dans les proportions fixées par les présents statuts ou, à défaut, par parts égales.</p><h2>Article 7 — Administration</h2><p>Le groupement est administré par {{administrateur}}. L’administrateur engage le groupement pour tout acte entrant dans l’objet de celui-ci. Les Membres, réunis en assemblée, prennent toute décision, y compris de dissolution anticipée, dans les conditions fixées par les statuts.</p><h2>Article 8 — Admission et retrait</h2><p>De nouveaux membres peuvent être admis dans les conditions fixées par l’assemblée. Tout Membre peut se retirer dans les conditions prévues aux statuts, sous réserve d’avoir exécuté ses obligations.</p><h2>Article 9 — Dissolution</h2><p>Le groupement est dissous dans les cas prévus par l’AUSCGIE. La dissolution entraîne sa liquidation ; la personnalité morale subsiste pour les besoins de celle-ci.</p><h2>Article 10 — Immatriculation</h2><p>Le groupement est immatriculé au RCCM de {{ville_rccm}}.</p><p class="signatures">Fait à {{ville_rccm}}, le {{date_jour}}, en autant d’originaux que de Membres plus les dépôts légaux.<br/><br/>LES MEMBRES<br/>(Signatures)</p></div>`,
    popularity: 30,
    countriesJson: SOCIETES_COUNTRIES,
  },
  {
    code: 'adm_statuts_sci',
    name: 'Statuts de Société Civile Immobilière (SCI)',
    category: 'juridique_admin',
    price: 3000, priceMax: 5000,
    description: 'Statuts d’une société civile immobilière (SCI) : objet civil d’acquisition et de gestion d’immeubles, capital et parts, gérance, responsabilité indéfinie non solidaire des associés au prorata, cession de parts soumise à agrément, décisions collectives et exercice social.',
    fieldsJson: F([
      { key: 'associes', label: 'Associés (nom complet + adresse, un par ligne)', type: 'textarea', required: true },
      { key: 'denomination', label: 'Dénomination sociale (suivie de « SCI »)', type: 'text', required: true },
      { key: 'objet', label: 'Objet (immeubles à acquérir, gérer, louer)', type: 'textarea', required: true },
      { key: 'siege', label: 'Siège social', type: 'textarea', required: true },
      { key: 'duree', label: 'Durée (en années)', type: 'text', required: true },
      { key: 'capital', label: 'Capital social (chiffres + lettres + devise)', type: 'text', required: true },
      { key: 'repartition_parts', label: 'Répartition des parts (associé — nombre de parts)', type: 'textarea', required: true },
      { key: 'apports', label: 'Apports (numéraire et/ou immeuble apporté)', type: 'textarea', required: true },
      { key: 'gerant', label: 'Gérant désigné (nom + adresse)', type: 'textarea', required: true },
      { key: 'ville_rccm', label: 'Ville d’immatriculation (RCCM / RCS)', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>STATUTS DE SOCIÉTÉ CIVILE IMMOBILIÈRE</h1><p>Entre les soussignés :</p><p>{{associes}},</p><p>il est formé une société civile régie par le Code civil et les présents statuts.</p><h2>Article 1 — Forme</h2><p>La société est une société civile immobilière. Elle n’est pas commerciale par sa forme ni par son objet ; sa responsabilité relève du droit civil.</p><h2>Article 2 — Dénomination</h2><p>La société a pour dénomination : <strong>{{denomination}}</strong>, précédée ou suivie de la mention « société civile immobilière » ou du sigle « SCI ».</p><h2>Article 3 — Objet</h2><p>La société a pour objet, à titre civil : {{objet}} ; l’acquisition, la propriété, l’administration, la gestion et la location de tous immeubles ; et toutes opérations civiles s’y rattachant, à l’exclusion de toute opération commerciale.</p><h2>Article 4 — Siège social</h2><p>Le siège social est fixé à : {{siege}}.</p><h2>Article 5 — Durée</h2><p>La durée de la société est de {{duree}} années à compter de son immatriculation.</p><h2>Article 6 — Apports et capital</h2><p>Les associés apportent : {{apports}}. Le capital social est fixé à <strong>{{capital}}</strong>, divisé en parts sociales réparties comme suit : {{repartition_parts}}.</p><h2>Article 7 — Responsabilité des associés</h2><p>À l’égard des tiers, les associés répondent indéfiniment des dettes sociales à proportion de leur part dans le capital social à la date de l’exigibilité ou au jour de la cessation des paiements. Cette responsabilité n’est pas solidaire.</p><h2>Article 8 — Cession de parts</h2><p>Les parts sociales ne peuvent être cédées à des tiers étrangers à la société qu’avec l’agrément des associés représentant la majorité fixée aux présents statuts. Les cessions entre associés, au conjoint, aux ascendants ou descendants sont libres, sauf clause contraire. Toute cession est constatée par écrit et rendue opposable à la société et aux tiers dans les formes légales.</p><h2>Article 9 — Gérance</h2><p>La société est gérée par {{gerant}}. Le gérant représente la société à l’égard des tiers et accomplit tous actes de gestion conformes à l’intérêt social. Les actes de disposition portant sur les immeubles requièrent, sauf clause contraire, l’autorisation des associés.</p><h2>Article 10 — Décisions collectives</h2><p>Les décisions collectives sont prises en assemblée ou par consultation écrite. Les décisions ordinaires sont adoptées à la majorité des parts ; les modifications statutaires requièrent la majorité renforcée prévue aux statuts.</p><h2>Article 11 — Exercice social et résultat</h2><p>L’exercice social court du 1er janvier au 31 décembre. Le bénéfice ou la perte est réparti entre les associés au prorata de leurs parts.</p><h2>Article 12 — Dissolution</h2><p>La société est dissoute à l’arrivée du terme, par décision des associés ou pour les causes prévues par la loi. La dissolution entraîne la liquidation.</p><h2>Article 13 — Immatriculation</h2><p>La société est immatriculée à {{ville_rccm}}.</p><p class="signatures">Fait à {{ville_rccm}}, le {{date_jour}}, en autant d’originaux que d’associés plus les dépôts légaux.<br/><br/>LES ASSOCIÉS<br/>(Signatures)</p></div>`,
    popularity: 40,
    countriesJson: SOCIETE_CIVILE_COUNTRIES,
  },
  {
    code: 'adm_declaration_beneficiaires_effectifs',
    name: 'Déclaration des bénéficiaires effectifs (registre)',
    category: 'juridique_admin',
    price: 1500, priceMax: 3000,
    description: 'Déclaration des bénéficiaires effectifs d’une personne morale au titre des obligations de lutte contre le blanchiment : identification de chaque personne physique détenant directement ou indirectement plus de 25 % du capital ou des droits de vote, ou exerçant un contrôle, avec modalités de la détention et engagement d’actualisation.',
    fieldsJson: F([
      { key: 'societe', label: 'Société déclarante (dénomination + forme + siège + RCCM)', type: 'textarea', required: true },
      { key: 'representant', label: 'Représentant légal déclarant (nom + qualité)', type: 'textarea', required: true },
      { key: 'beneficiaires', label: 'Bénéficiaires effectifs (nom, date et lieu de naissance, nationalité, domicile — un par ligne)', type: 'textarea', required: true },
      { key: 'modalites_controle', label: 'Modalités de la détention ou du contrôle (% de capital / droits de vote / autre contrôle, par bénéficiaire)', type: 'textarea', required: true },
      { key: 'date_effet', label: 'Date à laquelle la personne est devenue bénéficiaire effectif', type: 'date', required: true },
      { key: 'greffe', label: 'Greffe / RCCM destinataire du dépôt', type: 'text', required: true },
    ]),
    body: `<div class="document"><h1>DÉCLARATION DES BÉNÉFICIAIRES EFFECTIFS</h1><p>Établie en application des dispositions relatives à la lutte contre le blanchiment de capitaux et le financement du terrorisme, aux fins de dépôt au fichier du Registre du Commerce et du Crédit Mobilier.</p><h2>1. Personne morale déclarante</h2><p>{{societe}}</p><h2>2. Déclarant</h2><p>Je soussigné(e), {{representant}}, agissant en qualité de représentant légal de la société ci-dessus, déclare sur l’honneur l’exactitude des informations ci-après relatives aux bénéficiaires effectifs de la société.</p><h2>3. Bénéficiaire(s) effectif(s)</h2><p>Est bénéficiaire effectif la ou les personne(s) physique(s) qui, directement ou indirectement, détiennent plus de 25 % du capital ou des droits de vote de la société, ou exercent par tout autre moyen un pouvoir de contrôle sur la société ou ses organes de direction :</p><p>{{beneficiaires}}</p><h2>4. Modalités de la détention ou du contrôle</h2><p>{{modalites_controle}}</p><h2>5. Date d’acquisition de la qualité</h2><p>Chaque personne ci-dessus est devenue bénéficiaire effectif à compter du {{date_effet}}.</p><h2>6. Engagement</h2><p>Le déclarant s’engage à déposer une déclaration rectificative dans le délai légal en cas de modification affectant l’identité des bénéficiaires effectifs ou les modalités de leur contrôle. Toute déclaration mensongère expose son auteur aux sanctions prévues par la loi.</p><h2>7. Dépôt</h2><p>La présente déclaration est déposée auprès de : {{greffe}}.</p><p class="signatures">Fait pour servir et valoir ce que de droit, le {{date_jour}}.<br/><br/>LE REPRÉSENTANT LÉGAL<br/>(Nom, qualité et signature)</p></div>`,
    popularity: 33,
    countriesJson: RBE_COUNTRIES,
  },
  {
    code: 'adm_annonce_legale_constitution',
    name: 'Avis de constitution (annonce légale)',
    category: 'juridique_admin',
    price: 800, priceMax: 2000,
    description: 'Avis de constitution destiné à la publication dans un journal d’annonces légales : mentions obligatoires de la société nouvellement créée (forme, dénomination, sigle, capital, siège, objet, durée, gérance ou présidence, immatriculation au RCCM) rédigées au format condensé d’insertion.',
    fieldsJson: F([
      { key: 'forme', label: 'Forme sociale (SARL, SARL U, SAS, SASU, SA, SCI, GIE…)', type: 'text', required: true },
      { key: 'denomination', label: 'Dénomination sociale et sigle', type: 'text', required: true },
      { key: 'capital', label: 'Montant du capital social (+ devise)', type: 'text', required: true },
      { key: 'siege', label: 'Siège social (adresse complète)', type: 'textarea', required: true },
      { key: 'objet', label: 'Objet social (résumé)', type: 'textarea', required: true },
      { key: 'duree', label: 'Durée (en années)', type: 'text', required: true },
      { key: 'dirigeant', label: 'Dirigeant (gérant / président) : nom + adresse', type: 'textarea', required: true },
      { key: 'date_statuts', label: 'Date de signature des statuts', type: 'date', required: true },
      { key: 'ville_rccm', label: 'Greffe / RCCM d’immatriculation', type: 'text', required: true },
      { key: 'journal', label: 'Journal d’annonces légales de publication', type: 'text', required: false },
    ]),
    body: `<div class="document"><h1>AVIS DE CONSTITUTION</h1><p><em>Insertion dans un journal habilité à recevoir les annonces légales — {{journal}}.</em></p><p>Aux termes d’un acte sous seing privé en date du {{date_statuts}}, il a été constitué une société présentant les caractéristiques suivantes :</p><p><strong>Forme :</strong> {{forme}}.</p><p><strong>Dénomination :</strong> {{denomination}}.</p><p><strong>Capital social :</strong> {{capital}}.</p><p><strong>Siège social :</strong> {{siege}}.</p><p><strong>Objet social :</strong> {{objet}}.</p><p><strong>Durée :</strong> {{duree}} années à compter de l’immatriculation au Registre du Commerce et du Crédit Mobilier.</p><p><strong>Direction :</strong> a été nommé pour une durée illimitée, en qualité de représentant légal : {{dirigeant}}.</p><p><strong>Immatriculation :</strong> la société sera immatriculée au Registre du Commerce et du Crédit Mobilier de {{ville_rccm}}.</p><p class="signatures">Pour avis, la Direction.<br/>Fait le {{date_jour}}.</p></div>`,
    popularity: 46,
    countriesJson: SOCIETES_COUNTRIES,
  },
  {
    code: 'adm_pv_nomination_gerant',
    name: 'Procès-verbal de nomination du gérant',
    category: 'juridique_admin',
    price: 1200, priceMax: 2500,
    description: 'Procès-verbal de l’assemblée générale (ou de la décision de l’associé unique) portant nomination d’un gérant : constatation du quorum, exposé, résolution de nomination, durée du mandat, étendue des pouvoirs, rémunération éventuelle et acceptation des fonctions.',
    fieldsJson: F([
      { key: 'societe', label: 'Société (dénomination + forme + capital + siège + RCCM)', type: 'textarea', required: true },
      { key: 'organe', label: 'Organe qui décide (assemblée générale des associés / associé unique)', type: 'text', required: true },
      { key: 'participants', label: 'Associés présents ou représentés et parts détenues (un par ligne)', type: 'textarea', required: true },
      { key: 'nouveau_gerant', label: 'Gérant nommé (nom complet + adresse + nationalité)', type: 'textarea', required: true },
      { key: 'duree_mandat', label: 'Durée du mandat (déterminée : nb d’années / ou indéterminée)', type: 'text', required: true },
      { key: 'remuneration', label: 'Rémunération du gérant (montant + périodicité, ou « à titre gratuit »)', type: 'text', required: true },
      { key: 'lieu', label: 'Lieu de la réunion', type: 'text', required: true },
    ]),
    body: `<div class="document"><h1>PROCÈS-VERBAL DE NOMINATION DU GÉRANT</h1><p><strong>Société :</strong> {{societe}}.</p><p>Le {{date_jour}}, à {{lieu}}, {{organe}} s’est réuni(e) à l’effet de délibérer sur la nomination d’un gérant.</p><h2>Présence</h2><p>Sont présents ou représentés :</p><p>{{participants}}</p><p>La majorité requise étant réunie, l’organe peut valablement délibérer.</p><h2>Exposé</h2><p>Le président de séance rappelle que l’ordre du jour porte sur la désignation d’un gérant de la société et sur la fixation de la durée de son mandat, de l’étendue de ses pouvoirs et de sa rémunération.</p><h2>Première résolution — Nomination</h2><p>Est nommé gérant de la société : <strong>{{nouveau_gerant}}</strong>, qui exercera ses fonctions conformément aux statuts et à la loi.</p><h2>Deuxième résolution — Durée du mandat</h2><p>Le mandat du gérant est conféré pour la durée suivante : {{duree_mandat}}.</p><h2>Troisième résolution — Pouvoirs</h2><p>Le gérant est investi des pouvoirs les plus étendus pour agir en toute circonstance au nom de la société, dans la limite de l’objet social et sous réserve des pouvoirs attribués par la loi et les statuts à la collectivité des associés. Il a la signature sociale et représente la société à l’égard des tiers, des administrations et des banques.</p><h2>Quatrième résolution — Rémunération</h2><p>La rémunération du gérant au titre de son mandat est fixée comme suit : {{remuneration}}.</p><h2>Acceptation</h2><p>Le gérant nommé, présent, déclare accepter les fonctions qui lui sont confiées et n’être frappé d’aucune incompatibilité ni interdiction de nature à empêcher sa nomination.</p><p>Toutes les résolutions ci-dessus sont adoptées. L’ordre du jour étant épuisé, la séance est levée.</p><p class="signatures">Fait à {{lieu}}, le {{date_jour}}.<br/><br/>LE PRÉSIDENT DE SÉANCE — LE GÉRANT NOMMÉ<br/>(Signatures)</p></div>`,
    popularity: 44,
    countriesJson: SOCIETES_COUNTRIES,
  },
  {
    code: 'adm_registre_decisions_associe_unique',
    name: 'Registre des décisions de l’associé unique',
    category: 'juridique_admin',
    price: 1200, priceMax: 2500,
    description: 'Modèle de feuillet du registre coté et paraphé recueillant les décisions de l’associé unique d’une SARL U ou d’une SASU : identification, rappel du pouvoir de l’associé unique, décision datée et numérotée (approbation des comptes, affectation du résultat, nomination, modification statutaire) et signature.',
    fieldsJson: F([
      { key: 'societe', label: 'Société (dénomination + forme + capital + siège + RCCM)', type: 'textarea', required: true },
      { key: 'associe_unique', label: 'Associé unique (nom / dénomination + adresse)', type: 'textarea', required: true },
      { key: 'numero_decision', label: 'Numéro d’ordre de la décision', type: 'text', required: true },
      { key: 'objet_decision', label: 'Objet de la décision (ex. approbation comptes exercice N, affectation résultat…)', type: 'textarea', required: true },
      { key: 'texte_decision', label: 'Texte de la ou des décision(s) prise(s)', type: 'textarea', required: true },
      { key: 'lieu', label: 'Lieu', type: 'text', required: true },
    ]),
    body: `<div class="document"><h1>REGISTRE DES DÉCISIONS DE L’ASSOCIÉ UNIQUE</h1><p><strong>Société :</strong> {{societe}}.</p><p><strong>Associé unique :</strong> {{associe_unique}}.</p><h2>Décision n° {{numero_decision}} — {{objet_decision}}</h2><p>Le {{date_jour}}, à {{lieu}}, l’associé unique de la société ci-dessus désignée, exerçant les pouvoirs dévolus par la loi et les statuts à la collectivité des associés, a pris la ou les décision(s) suivante(s), consignée(s) au présent registre coté et paraphé :</p><p>{{texte_decision}}</p><p>Cette décision est réputée valablement prise. Elle est inscrite sur le présent registre à sa date, sous son numéro d’ordre. Le cas échéant, le rapport de gestion, les comptes annuels et l’inventaire sont annexés à la présente décision.</p><p class="signatures">Fait à {{lieu}}, le {{date_jour}}.<br/><br/>L’ASSOCIÉ UNIQUE<br/>(Signature)</p></div>`,
    popularity: 28,
    countriesJson: SOCIETES_COUNTRIES,
  },

  // ════════════════ PROCURATIONS (1) ════════════════
  {
    code: 'adm_procuration_speciale',
    name: 'Procuration spéciale (banque / impôts / poste / véhicule)',
    category: 'juridique_admin',
    price: 1000, priceMax: 2500,
    description: 'Procuration spéciale par laquelle un mandant habilite un mandataire à accomplir en son nom une opération déterminée — opérations bancaires, démarches fiscales, retrait de courrier ou de colis à la poste, immatriculation ou vente d’un véhicule — avec étendue précise des pouvoirs, durée et faculté de révocation. Modèle unique paramétrable par l’objet du mandat.',
    fieldsJson: F([
      { key: 'mandant', label: 'Mandant (nom complet + date/lieu de naissance + adresse + pièce d’identité)', type: 'textarea', required: true },
      { key: 'mandataire', label: 'Mandataire (nom complet + adresse + pièce d’identité)', type: 'textarea', required: true },
      { key: 'objet', label: 'Objet du mandat (banque / impôts / poste / véhicule / autre)', type: 'text', required: true },
      { key: 'pouvoirs', label: 'Pouvoirs conférés (détail précis des actes autorisés)', type: 'textarea', required: true },
      { key: 'organisme', label: 'Organisme ou administration concerné (banque, centre des impôts, bureau de poste, service des mines…)', type: 'text', required: true },
      { key: 'reference', label: 'Référence de l’opération (n° de compte, avis d’imposition, n° de colis, immatriculation du véhicule…)', type: 'text', required: false },
      { key: 'validite', label: 'Durée de validité (date d’expiration ou « pour la seule opération visée »)', type: 'text', required: true },
      { key: 'lieu', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="document"><h1>PROCURATION SPÉCIALE</h1><p>Je soussigné(e), <strong>{{mandant}}</strong>, ci-après « le Mandant »,</p><p>donne par la présente procuration spéciale, pouvoir à :</p><p><strong>{{mandataire}}</strong>, ci-après « le Mandataire »,</p><h2>Objet du mandat</h2><p>À l’effet de me représenter et d’agir en mon nom et pour mon compte auprès de <strong>{{organisme}}</strong> pour l’objet suivant : <strong>{{objet}}</strong>. Référence : {{reference}}.</p><h2>Étendue des pouvoirs</h2><p>Le Mandataire est spécialement habilité à : {{pouvoirs}}.</p><p>À cet effet, le Mandataire pourra signer toute pièce, remplir tout formulaire, produire toute pièce justificative, encaisser ou remettre toute somme ou tout document se rapportant strictement à l’objet ci-dessus, et faire le nécessaire, le Mandant promettant de ratifier tout ce qui aura été régulièrement fait en vertu des présentes.</p><h2>Limites</h2><p>Les pouvoirs conférés sont limités à l’objet ci-dessus défini. La présente procuration ne confère aucun pouvoir général de disposition du patrimoine du Mandant au-delà de l’opération visée.</p><h2>Durée et révocation</h2><p>La présente procuration est valable : {{validite}}. Le Mandant se réserve le droit de la révoquer à tout moment par notification écrite au Mandataire et à l’organisme concerné.</p><p class="signatures">Fait à {{lieu}}, le {{date_jour}}, pour servir et valoir ce que de droit.<br/><br/>Bon pour pouvoir<br/>LE MANDANT — LE MANDATAIRE (précédé de « bon pour acceptation de mandat »)<br/>(Signatures)</p></div>`,
    popularity: 50,
    countriesJson: MANDAT_COUNTRIES,
  },

  // ════════════════ PROCÉDURES JUDICIAIRES CIVILES (AUPSRVE / CPC) (8) ════════════════
  {
    code: 'adm_requete_injonction_payer',
    name: 'Requête aux fins d’injonction de payer (AUPSRVE)',
    category: 'juridique_admin',
    price: 2500, priceMax: 5000,
    description: 'Requête à la juridiction compétente aux fins d’obtenir une ordonnance d’injonction de payer, conforme à la procédure simplifiée de recouvrement de l’AUPSRVE : créance certaine, liquide et exigible d’origine contractuelle ou cambiaire, décompte du principal et des accessoires, pièces justificatives et demande de titre exécutoire.',
    fieldsJson: F([
      { key: 'creancier', label: 'Créancier requérant (nom / dénomination + forme + siège + représentant)', type: 'textarea', required: true },
      { key: 'debiteur', label: 'Débiteur (nom / dénomination + adresse)', type: 'textarea', required: true },
      { key: 'juridiction', label: 'Juridiction saisie (tribunal + ville)', type: 'text', required: true },
      { key: 'origine_creance', label: 'Origine de la créance (contrat, facture, reconnaissance de dette, effet de commerce…)', type: 'textarea', required: true },
      { key: 'principal', label: 'Montant principal réclamé (chiffres + lettres + devise)', type: 'text', required: true },
      { key: 'accessoires', label: 'Intérêts et frais accessoires réclamés (décompte)', type: 'textarea', required: true },
      { key: 'pieces', label: 'Pièces justificatives produites (liste)', type: 'textarea', required: true },
    ]),
    body: `<div class="document"><h1>REQUÊTE AUX FINS D’INJONCTION DE PAYER</h1><p><strong>À Monsieur/Madame le Président du {{juridiction}}.</strong></p><h2>Pour</h2><p>{{creancier}}, requérant, d’une part ;</p><h2>Contre</h2><p>{{debiteur}}, débiteur, d’autre part.</p><h2>Exposé des faits et de la créance</h2><p>Le requérant est créancier du débiteur ci-dessus désigné en vertu de : {{origine_creance}}.</p><p>Cette créance est <strong>certaine, liquide et exigible</strong> : certaine en son principe, liquide en son montant et exigible faute de paiement à l’échéance convenue, malgré les démarches amiables du requérant restées vaines.</p><h2>Montant réclamé</h2><p>Le requérant réclame le paiement de la somme en principal de <strong>{{principal}}</strong>, outre les accessoires suivants : {{accessoires}}.</p><h2>Fondement</h2><p>La présente requête est fondée sur les dispositions de l’Acte uniforme portant organisation des procédures simplifiées de recouvrement et des voies d’exécution relatives à l’injonction de payer, la créance ayant une cause contractuelle ou résultant d’un engagement résultant de l’émission ou de l’acceptation d’un effet de commerce.</p><h2>Pièces produites</h2><p>{{pieces}}</p><h2>Par ces motifs</h2><p>Le requérant conclut à ce qu’il plaise à Monsieur/Madame le Président : rendre une ordonnance portant injonction au débiteur de payer la somme de {{principal}} en principal, augmentée des intérêts et frais ; dire que la présente ordonnance sera signifiée au débiteur ; et, à défaut d’opposition dans le délai légal, conférer à l’ordonnance la formule exécutoire pour valoir titre exécutoire.</p><p class="signatures">Fait le {{date_jour}}.<br/><br/>LE REQUÉRANT (ou son conseil)<br/>(Signature)</p></div>`,
    popularity: 52,
    countriesJson: AUPSRVE_COUNTRIES,
  },
  {
    code: 'adm_assignation_justice',
    name: 'Assignation devant le tribunal',
    category: 'juridique_admin',
    price: 3000, priceMax: 5000,
    description: 'Acte d’assignation par lequel un demandeur cite un défendeur à comparaître devant une juridiction : désignation des parties et de la juridiction, exposé des faits, moyens de droit, objet de la demande (le dispositif), énonciation des pièces et mentions relatives à la constitution d’avocat et aux conséquences du défaut de comparution.',
    fieldsJson: F([
      { key: 'demandeur', label: 'Demandeur (nom / dénomination + adresse + représentant / avocat)', type: 'textarea', required: true },
      { key: 'defendeur', label: 'Défendeur assigné (nom / dénomination + adresse)', type: 'textarea', required: true },
      { key: 'juridiction', label: 'Juridiction saisie (tribunal + ville + date/heure d’audience si connue)', type: 'text', required: true },
      { key: 'faits', label: 'Exposé des faits', type: 'textarea', required: true },
      { key: 'moyens', label: 'Moyens de droit (fondements juridiques invoqués)', type: 'textarea', required: true },
      { key: 'demandes', label: 'Objet des demandes (dispositif : ce qui est réclamé)', type: 'textarea', required: true },
      { key: 'pieces', label: 'Bordereau des pièces communiquées', type: 'textarea', required: true },
    ]),
    body: `<div class="document"><h1>ASSIGNATION</h1><p>L’an {{date_jour}}, à la requête de :</p><p><strong>{{demandeur}}</strong>, demandeur ;</p><p>J’ai donné assignation à :</p><p><strong>{{defendeur}}</strong>, défendeur ;</p><h2>À comparaître</h2><p>Devant le {{juridiction}}, pour voir statuer sur les demandes ci-après, le défendeur étant informé qu’il est tenu, s’il y a lieu, de constituer avocat et qu’à défaut de comparaître il s’expose à ce qu’une décision soit rendue contre lui sur les seuls éléments fournis par le demandeur.</p><h2>Exposé des faits</h2><p>{{faits}}</p><h2>Discussion — Moyens de droit</h2><p>{{moyens}}</p><h2>Par ces motifs</h2><p>Le demandeur conclut à ce qu’il plaise au tribunal de : {{demandes}}. Le tout avec exécution provisoire s’il y a lieu et condamnation du défendeur aux entiers dépens.</p><h2>Pièces</h2><p>Au soutien de ses prétentions, le demandeur communique les pièces suivantes : {{pieces}}.</p><p class="signatures">Sous toutes réserves.<br/>Fait le {{date_jour}}.<br/><br/>LE DEMANDEUR (ou son avocat)<br/>(Signature)</p></div>`,
    popularity: 45,
    countriesJson: PROCEDURE_COUNTRIES,
  },
  {
    code: 'adm_constitution_avocat',
    name: 'Constitution d’avocat',
    category: 'juridique_admin',
    price: 1000, priceMax: 2500,
    description: 'Acte de constitution d’avocat par lequel une partie à une instance déclare se faire représenter par un avocat déterminé, qui se constitue et occupe pour elle : identification de l’instance et des parties, désignation de l’avocat postulant, élection de domicile en son cabinet et notification à la partie adverse.',
    fieldsJson: F([
      { key: 'partie', label: 'Partie représentée (nom / dénomination + qualité : demandeur / défendeur)', type: 'textarea', required: true },
      { key: 'avocat', label: 'Avocat constitué (nom + barreau + adresse du cabinet)', type: 'textarea', required: true },
      { key: 'juridiction', label: 'Juridiction et référence de l’affaire (RG / rôle si connu)', type: 'text', required: true },
      { key: 'adversaire', label: 'Partie adverse et/ou son avocat (destinataire de la notification)', type: 'textarea', required: true },
    ]),
    body: `<div class="document"><h1>CONSTITUTION D’AVOCAT</h1><p><strong>Affaire :</strong> {{juridiction}}.</p><p>Dans l’instance opposant les parties ci-après, l’avocat soussigné déclare se constituer et occuper pour :</p><p><strong>{{partie}}</strong>.</p><h2>Avocat constitué</h2><p>{{avocat}}, lequel se constitue aux lieu et place de la partie ci-dessus, occupera pour elle et postulera en son nom dans la présente instance et ses suites.</p><h2>Élection de domicile</h2><p>La partie représentée fait élection de domicile au cabinet de l’avocat constitué, où pourront lui être valablement signifiés tous actes et pièces de la procédure.</p><h2>Notification</h2><p>La présente constitution est notifiée à : {{adversaire}}, ainsi qu’au greffe de la juridiction saisie, pour production et information.</p><p class="signatures">Fait le {{date_jour}}.<br/><br/>L’AVOCAT CONSTITUÉ<br/>(Signature et cachet)</p></div>`,
    popularity: 30,
    countriesJson: PROCEDURE_COUNTRIES,
  },
  {
    code: 'adm_opposition_decision',
    name: 'Opposition à une décision (injonction de payer / jugement par défaut)',
    category: 'juridique_admin',
    price: 2000, priceMax: 4000,
    description: 'Acte d’opposition formé par le débiteur ou la partie condamnée contre une ordonnance d’injonction de payer ou un jugement rendu par défaut, aux fins de rétractation et de nouvel examen contradictoire : rappel de la décision frappée d’opposition, respect du délai, moyens de contestation au fond et saisine de la juridiction qui a statué.',
    fieldsJson: F([
      { key: 'opposant', label: 'Opposant (nom / dénomination + adresse + qualité)', type: 'textarea', required: true },
      { key: 'adversaire', label: 'Partie adverse (créancier / demandeur initial)', type: 'textarea', required: true },
      { key: 'decision', label: 'Décision frappée d’opposition (nature, juridiction, date, n° et date de signification)', type: 'textarea', required: true },
      { key: 'juridiction', label: 'Juridiction saisie de l’opposition', type: 'text', required: true },
      { key: 'moyens', label: 'Moyens de contestation au fond (raisons de contester la créance ou la condamnation)', type: 'textarea', required: true },
      { key: 'demandes', label: 'Demandes de l’opposant (rétractation, débouté de l’adversaire, etc.)', type: 'textarea', required: true },
    ]),
    body: `<div class="document"><h1>OPPOSITION</h1><p><strong>À {{juridiction}}.</strong></p><h2>Pour</h2><p>{{opposant}}, opposant ;</p><h2>Contre</h2><p>{{adversaire}}, défendeur à l’opposition.</p><h2>Décision frappée d’opposition</h2><p>L’opposant forme opposition à la décision suivante : {{decision}}. L’opposition est formée dans le délai légal courant à compter de la signification de ladite décision.</p><h2>Recevabilité</h2><p>L’opposition, voie de recours ouverte à la partie qui n’a pas comparu ou au débiteur destinataire de l’ordonnance, tend à remettre en cause la décision et à provoquer un nouvel examen de l’affaire dans le respect du contradictoire devant la juridiction qui a statué.</p><h2>Discussion au fond</h2><p>{{moyens}}</p><h2>Par ces motifs</h2><p>L’opposant conclut à ce qu’il plaise à la juridiction de : recevoir l’opposition en la forme ; au fond, {{demandes}} ; et condamner la partie adverse aux dépens.</p><p class="signatures">Sous toutes réserves. Fait le {{date_jour}}.<br/><br/>L’OPPOSANT (ou son avocat)<br/>(Signature)</p></div>`,
    popularity: 31,
    countriesJson: PROCEDURE_COUNTRIES,
  },
  {
    code: 'adm_declaration_appel',
    name: 'Déclaration d’appel',
    category: 'juridique_admin',
    price: 2000, priceMax: 4000,
    description: 'Déclaration d’appel par laquelle une partie défère à la cour d’appel un jugement rendu en premier ressort : identification de l’appelant et de l’intimé, désignation du jugement attaqué (juridiction, date, numéro), portée de l’appel (total ou sur des chefs déterminés) et énoncé des chefs de jugement critiqués.',
    fieldsJson: F([
      { key: 'appelant', label: 'Appelant (nom / dénomination + adresse + avocat)', type: 'textarea', required: true },
      { key: 'intime', label: 'Intimé (partie adverse en appel)', type: 'textarea', required: true },
      { key: 'jugement', label: 'Jugement attaqué (juridiction, date, n° RG, date de signification)', type: 'textarea', required: true },
      { key: 'cour', label: 'Cour d’appel saisie', type: 'text', required: true },
      { key: 'portee', label: 'Portée de l’appel (appel total / appel limité à certains chefs)', type: 'text', required: true },
      { key: 'chefs_critiques', label: 'Chefs du jugement critiqués (énumération)', type: 'textarea', required: true },
    ]),
    body: `<div class="document"><h1>DÉCLARATION D’APPEL</h1><p><strong>Cour saisie :</strong> {{cour}}.</p><h2>Appelant</h2><p>{{appelant}}, qui déclare relever appel.</p><h2>Intimé</h2><p>{{intime}}.</p><h2>Décision attaquée</h2><p>Appel est interjeté du jugement suivant : {{jugement}}.</p><h2>Portée de l’appel</h2><p>{{portee}}.</p><h2>Chefs de jugement critiqués</h2><p>L’appel tend à la réformation ou à l’annulation des chefs suivants du jugement : {{chefs_critiques}}.</p><p>L’appelant se réserve de développer ses moyens dans ses conclusions d’appel signifiées dans les délais et formes prescrits. Il demande à la cour d’infirmer la décision entreprise dans la limite ci-dessus et de statuer à nouveau.</p><p class="signatures">Fait le {{date_jour}}, sous toutes réserves.<br/><br/>L’APPELANT (ou son avocat)<br/>(Signature)</p></div>`,
    popularity: 29,
    countriesJson: PROCEDURE_COUNTRIES,
  },
  {
    code: 'adm_sommation_payer_faire',
    name: 'Sommation de payer / de faire',
    category: 'juridique_admin',
    price: 1500, priceMax: 3000,
    description: 'Sommation interpellative mettant formellement le débiteur en demeure de payer une somme ou d’exécuter une obligation de faire (délivrer, restituer, achever) dans un délai imparti, sous peine de poursuites et de voies d’exécution. Modèle unique paramétrable selon la nature — payer ou faire — de l’obligation.',
    fieldsJson: F([
      { key: 'requerant', label: 'Requérant / créancier (nom / dénomination + adresse)', type: 'textarea', required: true },
      { key: 'destinataire', label: 'Destinataire / débiteur sommé (nom / dénomination + adresse)', type: 'textarea', required: true },
      { key: 'nature', label: 'Nature de la sommation (« de payer » ou « de faire »)', type: 'text', required: true },
      { key: 'obligation', label: 'Obligation en cause (montant à payer OU acte à accomplir : délivrer, restituer, achever…)', type: 'textarea', required: true },
      { key: 'fondement', label: 'Titre ou fondement de l’obligation (contrat, facture, jugement…)', type: 'textarea', required: true },
      { key: 'delai', label: 'Délai imparti pour s’exécuter (en jours)', type: 'text', required: true },
      { key: 'lieu', label: 'Lieu', type: 'text', required: true },
    ]),
    body: `<div class="document"><h1>SOMMATION {{nature}}</h1><p>À la requête de <strong>{{requerant}}</strong>,</p><p>Il est fait sommation à <strong>{{destinataire}}</strong> :</p><h2>Objet</h2><p>D’avoir à {{nature}}, savoir : {{obligation}}.</p><h2>Fondement</h2><p>Cette obligation résulte de : {{fondement}}. Le requérant a vainement réclamé son exécution ; le destinataire demeure ce jour défaillant.</p><h2>Mise en demeure</h2><p>En conséquence, le destinataire est sommé de s’exécuter dans un délai de <strong>{{delai}} jours</strong> à compter de la présente. La présente sommation vaut mise en demeure et fait courir, le cas échéant, les intérêts moratoires.</p><h2>Avertissement</h2><p>À défaut d’exécution dans le délai imparti, le requérant se réserve d’engager toutes procédures utiles et de faire procéder, en vertu d’un titre exécutoire, à toutes voies d’exécution, le tout aux frais, risques et périls du destinataire.</p><p class="signatures">Fait à {{lieu}}, le {{date_jour}}, pour valoir ce que de droit.<br/><br/>LE REQUÉRANT (ou l’huissier / commissaire de justice instrumentaire)<br/>(Signature)</p></div>`,
    popularity: 40,
    countriesJson: AUPSRVE_COUNTRIES,
  },
  {
    code: 'adm_protet_faute_paiement',
    name: 'Protêt faute de paiement',
    category: 'juridique_admin',
    price: 1800, priceMax: 3500,
    description: 'Acte de protêt constatant officiellement le défaut de paiement d’un effet de commerce (lettre de change, billet à ordre, chèque) à son échéance : désignation du porteur et du souscripteur/tiré, présentation de l’effet, constat du refus ou de l’absence de paiement et réserve des recours cambiaires.',
    fieldsJson: F([
      { key: 'porteur', label: 'Porteur de l’effet (nom / dénomination + adresse)', type: 'textarea', required: true },
      { key: 'tire', label: 'Tiré / souscripteur (débiteur de l’effet)', type: 'textarea', required: true },
      { key: 'effet', label: 'Effet de commerce (nature : lettre de change / billet à ordre / chèque ; lieu et date de création)', type: 'textarea', required: true },
      { key: 'montant', label: 'Montant de l’effet (chiffres + lettres + devise)', type: 'text', required: true },
      { key: 'echeance', label: 'Date d’échéance', type: 'date', required: true },
      { key: 'lieu_presentation', label: 'Lieu de présentation au paiement', type: 'text', required: true },
    ]),
    body: `<div class="document"><h1>PROTÊT FAUTE DE PAIEMENT</h1><p>L’an {{date_jour}}, à la requête de <strong>{{porteur}}</strong>, porteur de l’effet ci-après désigné ;</p><h2>Effet présenté</h2><p>Effet de commerce : {{effet}}, d’un montant de <strong>{{montant}}</strong>, venu à échéance le {{echeance}}, souscrit ou accepté par : {{tire}}.</p><h2>Présentation</h2><p>L’effet a été régulièrement présenté au paiement à {{lieu_presentation}}, entre les mains du tiré / souscripteur ou en son domicile.</p><h2>Constat du défaut de paiement</h2><p>Sommation lui ayant été faite de payer le montant de l’effet, le tiré / souscripteur n’a pas payé, faute de provision ou par refus. Faute de paiement, il est dressé le présent protêt.</p><h2>Réserves</h2><p>Sous réserve de tous les droits, actions et recours cambiaires du porteur contre le tiré, le souscripteur, les endosseurs et tous garants solidaires, et notamment le recours faute de paiement, avec intérêts, frais de protêt et accessoires.</p><p class="signatures">Dont acte, dressé le {{date_jour}} à {{lieu_presentation}}.<br/><br/>L’OFFICIER INSTRUMENTAIRE (huissier / commissaire de justice / notaire)<br/>(Signature et sceau)</p></div>`,
    popularity: 22,
    countriesJson: AUPSRVE_COUNTRIES,
  },
  {
    code: 'adm_demande_saisie_attribution',
    name: 'Demande de saisie-attribution de créances (AUPSRVE)',
    category: 'juridique_admin',
    price: 2500, priceMax: 5000,
    description: 'Requête / réquisition de saisie-attribution des créances de somme d’argent du débiteur entre les mains d’un tiers (banque, employeur), en vertu d’un titre exécutoire, conforme à l’AUPSRVE : rappel du titre et du montant, désignation du tiers saisi, effet attributif immédiat au profit du saisissant et dénonciation au débiteur.',
    fieldsJson: F([
      { key: 'saisissant', label: 'Créancier saisissant (nom / dénomination + adresse + avocat éventuel)', type: 'textarea', required: true },
      { key: 'debiteur', label: 'Débiteur saisi (nom / dénomination + adresse)', type: 'textarea', required: true },
      { key: 'tiers_saisi', label: 'Tiers saisi (banque / employeur : dénomination + adresse)', type: 'textarea', required: true },
      { key: 'titre', label: 'Titre exécutoire fondant la saisie (nature, juridiction, date, formule exécutoire)', type: 'textarea', required: true },
      { key: 'montant', label: 'Montant en vertu duquel la saisie est pratiquée (principal + accessoires + frais)', type: 'text', required: true },
    ]),
    body: `<div class="document"><h1>SAISIE-ATTRIBUTION DE CRÉANCES</h1><p>À la requête de <strong>{{saisissant}}</strong>, créancier muni d’un titre exécutoire ;</p><h2>Titre exécutoire</h2><p>La présente saisie est pratiquée en vertu de : {{titre}}, constatant une créance liquide et exigible.</p><h2>Montant de la saisie</h2><p>La saisie est pratiquée pour avoir paiement de la somme de <strong>{{montant}}</strong>.</p><h2>Tiers saisi</h2><p>Il est procédé, entre les mains de <strong>{{tiers_saisi}}</strong>, tiers saisi, à la saisie-attribution de toutes sommes d’argent que ce dernier détient ou doit à :</p><p><strong>{{debiteur}}</strong>, débiteur saisi.</p><h2>Effet attributif</h2><p>La présente saisie emporte, à concurrence des sommes pour lesquelles elle est pratiquée, attribution immédiate au profit du saisissant de la créance saisie disponible entre les mains du tiers saisi, ainsi que de tous ses accessoires. Le tiers saisi est tenu de déclarer sur-le-champ l’étendue de ses obligations à l’égard du débiteur et de s’acquitter entre les mains du saisissant dans les conditions et délais de l’Acte uniforme.</p><h2>Dénonciation</h2><p>La présente saisie sera dénoncée au débiteur saisi dans le délai légal, à peine de caducité, avec indication du délai et de la juridiction devant laquelle les contestations peuvent être portées.</p><p class="signatures">Fait le {{date_jour}}.<br/><br/>L’HUISSIER / COMMISSAIRE DE JUSTICE, pour le saisissant<br/>(Signature et sceau)</p></div>`,
    popularity: 34,
    countriesJson: AUPSRVE_COUNTRIES,
  },

  // ════════════════ PROCÉDURES PÉNALES (2) ════════════════
  {
    code: 'adm_plainte_simple',
    name: 'Plainte simple (au procureur de la République)',
    category: 'juridique_admin',
    price: 1500, priceMax: 3000,
    description: 'Plainte simple adressée au procureur de la République dénonçant des faits susceptibles de constituer une infraction : identité du plaignant, exposé circonstancié des faits, préjudice subi, désignation de l’auteur s’il est connu, pièces jointes et demande de poursuites.',
    fieldsJson: F([
      { key: 'plaignant', label: 'Plaignant (nom + date/lieu de naissance + profession + adresse)', type: 'textarea', required: true },
      { key: 'procureur', label: 'Procureur destinataire (tribunal + ville)', type: 'text', required: true },
      { key: 'mis_en_cause', label: 'Personne mise en cause (identité si connue, ou « auteur inconnu »)', type: 'textarea', required: true },
      { key: 'faits', label: 'Exposé détaillé des faits (dates, lieux, circonstances)', type: 'textarea', required: true },
      { key: 'prejudice', label: 'Préjudice subi (matériel, corporel, moral)', type: 'textarea', required: true },
      { key: 'pieces', label: 'Pièces jointes à l’appui de la plainte', type: 'textarea', required: false },
    ]),
    body: `<div class="document"><h1>PLAINTE SIMPLE</h1><p><strong>À Monsieur/Madame le Procureur de la République près le {{procureur}}.</strong></p><h2>Plaignant</h2><p>Je soussigné(e), {{plaignant}}, ai l’honneur de porter plainte contre :</p><p>{{mis_en_cause}}.</p><h2>Exposé des faits</h2><p>{{faits}}</p><h2>Préjudice</h2><p>Ces faits m’ont causé le préjudice suivant : {{prejudice}}.</p><h2>Qualification</h2><p>Les faits ci-dessus exposés me paraissent susceptibles de recevoir une qualification pénale et de constituer une ou plusieurs infractions punies par la loi.</p><h2>Demande</h2><p>C’est pourquoi je vous prie de bien vouloir faire procéder à toutes investigations utiles, engager les poursuites qui vous paraîtront justifiées et faire traduire le ou les auteurs devant la juridiction compétente. Je me tiens à la disposition de vos services pour toute audition.</p><h2>Pièces jointes</h2><p>{{pieces}}</p><p class="signatures">Veuillez agréer l’expression de ma haute considération.<br/>Fait le {{date_jour}}.<br/><br/>LE PLAIGNANT<br/>(Signature)</p></div>`,
    popularity: 47,
    countriesJson: PENAL_COUNTRIES,
  },
  {
    code: 'adm_plainte_partie_civile',
    name: 'Plainte avec constitution de partie civile',
    category: 'juridique_admin',
    price: 2500, priceMax: 4500,
    description: 'Plainte avec constitution de partie civile déposée entre les mains du doyen des juges d’instruction afin de mettre en mouvement l’action publique et d’obtenir réparation : exposé des faits et de l’infraction, préjudice, constitution formelle de partie civile, demande d’ouverture d’information et élection de domicile.',
    fieldsJson: F([
      { key: 'plaignant', label: 'Plaignant / partie civile (nom + naissance + profession + adresse)', type: 'textarea', required: true },
      { key: 'juge', label: 'Juridiction d’instruction saisie (doyen des juges d’instruction + tribunal + ville)', type: 'text', required: true },
      { key: 'mis_en_cause', label: 'Personne(s) visée(s) (identité si connue, ou « contre X »)', type: 'textarea', required: true },
      { key: 'faits', label: 'Exposé des faits et infraction reprochée', type: 'textarea', required: true },
      { key: 'prejudice', label: 'Préjudice et évaluation de la demande de réparation', type: 'textarea', required: true },
      { key: 'avocat', label: 'Avocat de la partie civile / domicile élu (facultatif)', type: 'textarea', required: false },
    ]),
    body: `<div class="document"><h1>PLAINTE AVEC CONSTITUTION DE PARTIE CIVILE</h1><p><strong>À Monsieur/Madame le Doyen des juges d’instruction près le {{juge}}.</strong></p><h2>Plaignant</h2><p>Je soussigné(e), {{plaignant}}, ai l’honneur de déposer entre vos mains une plainte avec constitution de partie civile contre :</p><p>{{mis_en_cause}}.</p><h2>Exposé des faits</h2><p>{{faits}}</p><h2>Préjudice</h2><p>Ces faits m’ont directement et personnellement causé le préjudice suivant, dont je demande réparation : {{prejudice}}.</p><h2>Constitution de partie civile</h2><p>Par la présente, je déclare expressément me constituer partie civile afin de mettre en mouvement l’action publique et d’obtenir réparation de mon préjudice. Je m’engage, en tant que de besoin, à consigner la somme qui sera fixée par vos soins pour la recevabilité de la présente plainte.</p><h2>Demande</h2><p>Je vous prie de bien vouloir ouvrir une information, procéder ou faire procéder à tous actes utiles à la manifestation de la vérité et renvoyer, le cas échéant, le ou les auteurs devant la juridiction de jugement.</p><h2>Élection de domicile</h2><p>{{avocat}}</p><p class="signatures">Avec l’expression de ma haute considération.<br/>Fait le {{date_jour}}.<br/><br/>LA PARTIE CIVILE (ou son avocat)<br/>(Signature)</p></div>`,
    popularity: 38,
    countriesJson: PENAL_COUNTRIES,
  },
  {
    code: 'adm_main_courante',
    name: 'Déclaration de main courante',
    category: 'juridique_admin',
    price: 800, priceMax: 1800,
    description: 'Déclaration de main courante consignant auprès des services de police ou de gendarmerie un fait ou un différend afin de lui donner date certaine, sans déclencher de poursuites : identité du déclarant, exposé du fait, personnes concernées et objet de la démarche (préconstitution de preuve).',
    fieldsJson: F([
      { key: 'declarant', label: 'Déclarant (nom + naissance + adresse + pièce d’identité)', type: 'textarea', required: true },
      { key: 'service', label: 'Service saisi (commissariat / brigade de gendarmerie + ville)', type: 'text', required: true },
      { key: 'faits', label: 'Exposé du fait ou différend (date, heure, lieu, circonstances)', type: 'textarea', required: true },
      { key: 'personnes', label: 'Personnes concernées ou mises en cause (si connues)', type: 'textarea', required: false },
      { key: 'objet', label: 'Objet de la déclaration (raison pour laquelle le déclarant souhaite acter le fait)', type: 'textarea', required: true },
    ]),
    body: `<div class="document"><h1>DÉCLARATION DE MAIN COURANTE</h1><p><strong>Service saisi :</strong> {{service}}.</p><h2>Déclarant</h2><p>Je soussigné(e), {{declarant}}, déclare ce qui suit et demande que la présente déclaration soit consignée sur le registre de main courante.</p><h2>Exposé du fait</h2><p>{{faits}}</p><h2>Personnes concernées</h2><p>{{personnes}}</p><h2>Objet de la démarche</h2><p>La présente déclaration a pour objet de donner date certaine aux faits ci-dessus et d’en conserver la trace : {{objet}}. Le déclarant est informé qu’une main courante ne constitue pas un dépôt de plainte et ne déclenche pas, à elle seule, de poursuites, mais qu’elle peut être ultérieurement invoquée comme élément de preuve.</p><p class="signatures">Lecture faite, persiste et signe.<br/>Fait le {{date_jour}}.<br/><br/>LE DÉCLARANT<br/>(Signature)</p></div>`,
    popularity: 35,
    countriesJson: PENAL_COUNTRIES,
  },

  // ════════════════ ATTESTATIONS, QUITUS & AUTORISATIONS ADMINISTRATIVES (4) ════════════════
  {
    code: 'adm_certificat_non_recours',
    name: 'Certificat de non-recours (non-opposition et non-appel)',
    category: 'juridique_admin',
    price: 1200, priceMax: 2500,
    description: 'Certificat délivré par le greffe attestant qu’une décision de justice signifiée n’a fait l’objet, dans les délais légaux, d’aucune voie de recours (opposition, appel, pourvoi), rendant la décision définitive et exécutoire : identification de la décision, des parties, de la signification et du délai expiré.',
    fieldsJson: F([
      { key: 'juridiction', label: 'Juridiction / greffe délivrant le certificat', type: 'text', required: true },
      { key: 'decision', label: 'Décision concernée (nature, date, n° RG / rôle)', type: 'textarea', required: true },
      { key: 'parties', label: 'Parties à l’instance (demandeur / défendeur)', type: 'textarea', required: true },
      { key: 'date_signification', label: 'Date de signification de la décision', type: 'date', required: true },
      { key: 'voies_recours', label: 'Voie(s) de recours dont l’absence est certifiée (opposition, appel, pourvoi)', type: 'text', required: true },
    ]),
    body: `<div class="document"><h1>CERTIFICAT DE NON-RECOURS</h1><p><strong>{{juridiction}}.</strong></p><p>Le greffier soussigné certifie ce qui suit.</p><h2>Décision concernée</h2><p>{{decision}}, rendue dans l’instance opposant : {{parties}}.</p><h2>Signification</h2><p>Ladite décision a été signifiée le {{date_signification}}.</p><h2>Attestation de non-recours</h2><p>Après vérification des registres du greffe, il est certifié qu’à ce jour, et après expiration des délais légaux courant à compter de la signification susvisée, la décision ci-dessus désignée n’a fait l’objet d’aucune des voies de recours suivantes : {{voies_recours}}.</p><p>En conséquence, ladite décision est passée en force de chose jugée ; elle est définitive et exécutoire.</p><p class="signatures">En foi de quoi, le présent certificat est délivré pour servir et valoir ce que de droit.<br/>Fait le {{date_jour}}.<br/><br/>LE GREFFIER<br/>(Signature et sceau du greffe)</p></div>`,
    popularity: 25,
    countriesJson: PROCEDURE_COUNTRIES,
  },
  {
    code: 'adm_quitus_gestion',
    name: 'Quitus de gestion',
    category: 'juridique_admin',
    price: 1000, priceMax: 2500,
    description: 'Acte par lequel une assemblée (associés, membres d’association, copropriétaires) donne quitus à un dirigeant, trésorier ou gérant pour sa gestion au titre d’un exercice écoulé, après approbation des comptes : constatation de l’examen des comptes, décharge de gestion et portée du quitus.',
    fieldsJson: F([
      { key: 'organisme', label: 'Société / association / syndicat donnant quitus (dénomination + siège)', type: 'textarea', required: true },
      { key: 'organe', label: 'Organe qui délibère (assemblée générale des associés / des membres…)', type: 'text', required: true },
      { key: 'beneficiaire', label: 'Bénéficiaire du quitus (nom + fonction : gérant, trésorier, président…)', type: 'textarea', required: true },
      { key: 'exercice', label: 'Exercice ou période de gestion couverte', type: 'text', required: true },
      { key: 'comptes', label: 'Comptes / rapport examinés et approuvés (référence)', type: 'textarea', required: true },
      { key: 'lieu', label: 'Lieu de la réunion', type: 'text', required: true },
    ]),
    body: `<div class="document"><h1>QUITUS DE GESTION</h1><p><strong>{{organisme}}.</strong></p><p>Le {{date_jour}}, à {{lieu}}, {{organe}} s’est réuni(e) et a examiné la gestion de {{beneficiaire}} au titre de : {{exercice}}.</p><h2>Examen des comptes</h2><p>Après présentation et examen des comptes et documents suivants : {{comptes}}, l’organe constate que la gestion a été régulièrement exercée et conforme à l’intérêt de la structure.</p><h2>Résolution — Quitus</h2><p>En conséquence, l’organe approuve les comptes de la période susvisée et donne, par la présente, <strong>quitus entier, plein et sans réserve</strong> à {{beneficiaire}} pour sa gestion au titre de {{exercice}}. Ce quitus emporte décharge de responsabilité au titre des actes de gestion accomplis et régulièrement portés à la connaissance de l’organe, sous réserve des actions et faits qui n’auraient pas été révélés.</p><p>Cette résolution est adoptée.</p><p class="signatures">Fait à {{lieu}}, le {{date_jour}}.<br/><br/>LE PRÉSIDENT DE SÉANCE — LE SECRÉTAIRE<br/>(Signatures)</p></div>`,
    popularity: 27,
    countriesJson: SOCIETES_COUNTRIES,
  },
  {
    code: 'adm_decharge_responsabilite',
    name: 'Décharge de responsabilité',
    category: 'juridique_admin',
    price: 1000, priceMax: 2500,
    description: 'Décharge par laquelle une personne exonère une autre de toute responsabilité au titre d’une activité, d’un prêt de matériel, d’un événement ou d’une remise de bien, en connaissance des risques : identification des parties, objet et périmètre de la décharge, reconnaissance des risques et renonciation à recours. Inspirée de l’« Acquittement unilatéral de responsabilité » du pack.',
    fieldsJson: F([
      { key: 'dechargeant', label: 'Personne qui décharge (nom / dénomination + adresse)', type: 'textarea', required: true },
      { key: 'beneficiaire', label: 'Personne déchargée (bénéficiaire de la décharge)', type: 'textarea', required: true },
      { key: 'objet', label: 'Objet / activité / bien concerné par la décharge', type: 'textarea', required: true },
      { key: 'risques', label: 'Risques reconnus et acceptés par le déchargeant', type: 'textarea', required: true },
      { key: 'perimetre', label: 'Périmètre et limites de la décharge (ce qui est couvert / exclu)', type: 'textarea', required: true },
      { key: 'lieu', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="document"><h1>DÉCHARGE DE RESPONSABILITÉ</h1><p>Je soussigné(e), <strong>{{dechargeant}}</strong>, ci-après « le Déchargeant »,</p><p>déclare décharger <strong>{{beneficiaire}}</strong>, ci-après « le Bénéficiaire », dans les conditions ci-après.</p><h2>Objet</h2><p>La présente décharge est consentie à l’occasion de : {{objet}}.</p><h2>Reconnaissance des risques</h2><p>Le Déchargeant reconnaît avoir été informé et avoir pris pleinement connaissance des risques suivants, qu’il accepte librement : {{risques}}.</p><h2>Décharge et renonciation à recours</h2><p>En conséquence, le Déchargeant décharge le Bénéficiaire de toute responsabilité et renonce à tout recours, réclamation, action ou demande d’indemnisation à son encontre au titre de tout dommage, perte ou préjudice pouvant résulter de l’objet ci-dessus, dans les limites suivantes : {{perimetre}}.</p><h2>Réserves</h2><p>La présente décharge ne couvre pas les dommages résultant d’une faute lourde, d’une faute intentionnelle ou d’un manquement délibéré du Bénéficiaire, ni les cas où la loi prohibe une telle exonération.</p><p class="signatures">Fait à {{lieu}}, le {{date_jour}}, en connaissance de cause.<br/>Bon pour décharge de responsabilité.<br/><br/>LE DÉCHARGEANT<br/>(Signature)</p></div>`,
    popularity: 36,
    countriesJson: ADMIN_COUNTRIES,
  },
  {
    code: 'adm_autorisation_parentale',
    name: 'Autorisation parentale (sortie / voyage du mineur)',
    category: 'juridique_admin',
    price: 800, priceMax: 2000,
    description: 'Autorisation délivrée par le(s) titulaire(s) de l’autorité parentale permettant à un enfant mineur de voyager, de sortir du territoire, de participer à une activité ou d’être pris en charge par un tiers : identification des parents et de l’enfant, objet et période de l’autorisation, personne accompagnatrice ou responsable et coordonnées d’urgence.',
    fieldsJson: F([
      { key: 'parents', label: 'Titulaire(s) de l’autorité parentale (nom + pièce d’identité + adresse)', type: 'textarea', required: true },
      { key: 'enfant', label: 'Enfant mineur (nom + date/lieu de naissance)', type: 'textarea', required: true },
      { key: 'objet', label: 'Objet de l’autorisation (voyage, sortie du territoire, activité, prise en charge…)', type: 'textarea', required: true },
      { key: 'periode', label: 'Période / dates concernées', type: 'text', required: true },
      { key: 'accompagnateur', label: 'Personne accompagnatrice ou responsable (nom + qualité + pièce d’identité)', type: 'textarea', required: false },
      { key: 'destination', label: 'Destination / lieu (le cas échéant)', type: 'text', required: false },
      { key: 'contact_urgence', label: 'Contact d’urgence (nom + téléphone)', type: 'text', required: true },
      { key: 'lieu', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="document"><h1>AUTORISATION PARENTALE</h1><p>Je soussigné(e) / Nous soussignés, <strong>{{parents}}</strong>, agissant en qualité de titulaire(s) de l’autorité parentale sur l’enfant mineur :</p><p><strong>{{enfant}}</strong>,</p><h2>Objet de l’autorisation</h2><p>autorise/autorisons expressément l’enfant susnommé à : {{objet}}. Destination / lieu : {{destination}}. Période concernée : {{periode}}.</p><h2>Accompagnement et responsabilité</h2><p>Durant cette période, l’enfant est placé sous la responsabilité de : {{accompagnateur}}. Le(s) soussigné(s) autorise(nt) cette personne à prendre, en cas d’urgence, toute mesure nécessaire à la protection et à la santé de l’enfant.</p><h2>Contact d’urgence</h2><p>En cas de besoin, contacter : {{contact_urgence}}.</p><h2>Déclaration</h2><p>Le(s) soussigné(s) déclare(nt) exercer l’autorité parentale sur l’enfant et délivrer la présente autorisation de son (leur) plein gré, pour servir et valoir ce que de droit auprès de toute autorité, administration ou organisme.</p><p class="signatures">Fait à {{lieu}}, le {{date_jour}}.<br/><br/>LE(S) TITULAIRE(S) DE L’AUTORITÉ PARENTALE<br/>(Nom, mention « lu et approuvé » et signature)</p></div>`,
    popularity: 43,
    countriesJson: ADMIN_COUNTRIES,
  },
  {
    code: 'adm_demande_legalisation_signature',
    name: 'Demande de légalisation de signature',
    category: 'juridique_admin',
    price: 800, priceMax: 1800,
    description: 'Demande adressée à l’autorité compétente (mairie, autorité administrative ou poste consulaire) aux fins de certification matérielle de la signature apposée par le demandeur sur un document : identification du demandeur, du document, présentation en personne et pièce d’identité, avec bloc de certification à compléter par l’autorité.',
    fieldsJson: F([
      { key: 'demandeur', label: 'Demandeur (nom + date/lieu de naissance + adresse + n° pièce d’identité)', type: 'textarea', required: true },
      { key: 'autorite', label: 'Autorité sollicitée (mairie / préfecture / poste consulaire + ville)', type: 'text', required: true },
      { key: 'document', label: 'Document sur lequel la signature doit être légalisée (nature + objet)', type: 'textarea', required: true },
      { key: 'usage', label: 'Usage / destinataire du document légalisé', type: 'text', required: true },
    ]),
    body: `<div class="document"><h1>DEMANDE DE LÉGALISATION DE SIGNATURE</h1><p><strong>À l’attention de : {{autorite}}.</strong></p><h2>Demandeur</h2><p>Je soussigné(e), {{demandeur}}, ai l’honneur de solliciter la légalisation (certification matérielle) de ma signature apposée sur le document ci-après.</p><h2>Document concerné</h2><p>{{document}}. Ce document est destiné à : {{usage}}.</p><h2>Modalités</h2><p>Je déclare me présenter en personne devant l’autorité compétente, muni(e) de ma pièce d’identité en cours de validité, et apposer ma signature en sa présence aux fins de certification. La légalisation atteste uniquement l’authenticité matérielle de la signature et non le contenu du document.</p><p class="signatures">Fait le {{date_jour}}.<br/><br/>LE DEMANDEUR<br/>(Signature à apposer devant l’autorité)</p><hr/><h2>Cadre réservé à l’autorité — Certification</h2><p>Vu pour la légalisation matérielle de la signature de {{demandeur}}, apposée en notre présence ce jour, l’intéressé(e) ayant justifié de son identité.</p><p class="signatures">Fait à ________________, le ________________.<br/>L’AUTORITÉ COMPÉTENTE<br/>(Nom, qualité, signature et sceau officiel)</p></div>`,
    popularity: 24,
    countriesJson: MANDAT_COUNTRIES,
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

  console.log('✅ Seed Drive3 Juridique & Gestion Administrative (JUR-002 — sélection distincte) terminé.');
  console.log(`   Templates du script : ${templates.length} (créés : ${created}, mis à jour : ${updated})`);
  console.log('   Répartition par catégorie (ce script) :');
  for (const [cat, n] of Object.entries(byCategory)) console.log(`     - ${cat} : ${n}`);
  console.log(`   Variantes pays (countriesJson) : ${withCountries} templates`);
  console.log(`   ➜ Total de templates en base : ${total}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
