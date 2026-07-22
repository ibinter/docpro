import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ─── 25 templates Coopératives / Mutuelles ───────────────────────────────
  {
    code: 'coop_statuts_agricole',
    name: "Statuts de coopérative agricole",
    category: 'association',
    price: 6000, priceMax: 18000,
    description: "Statuts constitutifs d'une coopérative agricole conformes au droit OHADA et aux lois nationales sur la coopération.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 82,
    fieldsJson: F([
      {key:'nom_coop',label:"Dénomination de la coopérative",type:'text',required:true},
      {key:'siege',label:"Siège social",type:'text',required:true},
      {key:'objet',label:"Objet social",type:'textarea',required:true},
      {key:'capital',label:"Capital social initial (FCFA)",type:'text',required:true},
      {key:'date_ag_const',label:"Date de l'assemblée générale constitutive",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>STATUTS DE LA COOPÉRATIVE AGRICOLE {{nom_coop}}</h1><h2>PRÉAMBULE</h2><p>Les soussignés, réunis en assemblée générale constitutive le {{date_ag_const}}, ont adopté les présents statuts régissant la coopérative agricole dénommée {{nom_coop}}, dont le siège est fixé à {{siege}}.</p><h2>ARTICLE 1 — DÉNOMINATION</h2><p>Il est fondé entre les adhérents aux présents statuts une coopérative agricole régie par le droit OHADA et la législation nationale en vigueur, ayant pour dénomination : {{nom_coop}}.</p><h2>ARTICLE 2 — OBJET</h2><p>{{objet}}</p><h2>ARTICLE 3 — CAPITAL SOCIAL</h2><p>Le capital social est fixé à {{capital}} FCFA, divisé en parts sociales de valeur nominale égale.</p><h2>ARTICLE 4 — DURÉE</h2><p>La coopérative est constituée pour une durée indéterminée à compter de son immatriculation au registre compétent.</p><h2>ARTICLE 5 — MEMBRES</h2><p>Peut être membre toute personne physique ou morale répondant aux conditions fixées par le règlement intérieur.</p><h2>ARTICLE 6 — GOUVERNANCE</h2><p>La coopérative est administrée par un conseil d'administration élu par l'assemblée générale des membres.</p><p>Fait à {{siege}}, le {{date_ag_const}}.</p></div>` },

  {
    code: 'coop_reglement_interieur',
    name: "Règlement intérieur de coopérative",
    category: 'association',
    price: 4000, priceMax: 12000,
    description: "Règlement intérieur précisant les modalités de fonctionnement quotidien d'une coopérative agricole ou de services.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 74,
    fieldsJson: F([
      {key:'nom_coop',label:"Nom de la coopérative",type:'text',required:true},
      {key:'siege',label:"Siège social",type:'text',required:true},
      {key:'montant_part',label:"Montant de la part sociale (FCFA)",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption du règlement",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>RÈGLEMENT INTÉRIEUR DE {{nom_coop}}</h1><h2>CHAPITRE I — DISPOSITIONS GÉNÉRALES</h2><p>Le présent règlement intérieur, adopté le {{date_adoption}} par l'assemblée générale de la coopérative {{nom_coop}} dont le siège est à {{siege}}, précise et complète les statuts.</p><h2>CHAPITRE II — ADHÉSION</h2><p>Toute demande d'adhésion est adressée par écrit au conseil d'administration. Chaque membre souscrit au minimum une part sociale d'une valeur de {{montant_part}} FCFA.</p><h2>CHAPITRE III — OBLIGATIONS DES MEMBRES</h2><p>Les membres s'engagent à participer activement aux activités de la coopérative, à respecter les décisions des organes et à s'acquitter de leurs cotisations dans les délais impartis.</p><h2>CHAPITRE IV — DISCIPLINE</h2><p>Tout manquement aux présentes dispositions peut entraîner un avertissement, une suspension ou l'exclusion prononcée par le conseil d'administration, avec droit de recours devant l'assemblée générale.</p><h2>CHAPITRE V — MODIFICATION</h2><p>Le présent règlement peut être modifié par l'assemblée générale statuant à la majorité des deux tiers des membres présents ou représentés.</p><p>Adopté à {{siege}}, le {{date_adoption}}.</p></div>` },

  {
    code: 'coop_adhesion_membre',
    name: "Adhésion à une coopérative",
    category: 'association',
    price: 1500, priceMax: 4500,
    description: "Formulaire d'adhésion d'un nouveau membre à une coopérative, avec engagement de souscription de parts sociales.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 91,
    fieldsJson: F([
      {key:'nom_membre',label:"Nom et prénoms du demandeur",type:'text',required:true},
      {key:'profession',label:"Profession / activité",type:'text',required:true},
      {key:'adresse',label:"Adresse du demandeur",type:'text',required:true},
      {key:'nom_coop',label:"Nom de la coopérative",type:'text',required:true},
      {key:'nb_parts',label:"Nombre de parts souscrites",type:'text',required:true},
      {key:'date_demande',label:"Date de la demande",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>DEMANDE D'ADHÉSION À {{nom_coop}}</h1><p>Je soussigné(e), {{nom_membre}}, exerçant la profession de {{profession}}, demeurant à {{adresse}}, sollicite mon admission en qualité de membre de la coopérative {{nom_coop}}.</p><p>Je déclare avoir pris connaissance des statuts et du règlement intérieur de la coopérative et m'engage à les respecter.</p><p>Je souscris {{nb_parts}} part(s) sociale(s) et m'engage à en régler la valeur selon les modalités prévues.</p><p>Je reconnais que mon adhésion ne sera effective qu'après approbation du conseil d'administration et libération des parts souscrites.</p><p>Fait à {{adresse}}, le {{date_demande}}.</p><br/><p>Signature du demandeur : ___________________________</p><br/><p>Pour le conseil d'administration — Visa : ___________________________</p></div>` },

  {
    code: 'coop_contrat_gerant',
    name: "Contrat de gérant de coopérative",
    category: 'association',
    price: 5000, priceMax: 15000,
    description: "Contrat de mandat ou de travail du directeur général ou gérant salarié d'une coopérative, conforme au droit OHADA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 63,
    fieldsJson: F([
      {key:'nom_gerant',label:"Nom et prénoms du gérant",type:'text',required:true},
      {key:'nom_coop',label:"Nom de la coopérative",type:'text',required:true},
      {key:'remuneration',label:"Rémunération mensuelle (FCFA)",type:'text',required:true},
      {key:'duree',label:"Durée du contrat / mandat",type:'text',required:true},
      {key:'date_debut',label:"Date de prise de fonction",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE GÉRANT DE COOPÉRATIVE</h1><p>Entre la coopérative <strong>{{nom_coop}}</strong>, représentée par le président du conseil d'administration, et M./Mme <strong>{{nom_gerant}}</strong>,</p><h2>ARTICLE 1 — FONCTION</h2><p>{{nom_gerant}} est nommé(e) gérant(e) de la coopérative {{nom_coop}} à compter du {{date_debut}} pour une durée de {{duree}}.</p><h2>ARTICLE 2 — MISSIONS</h2><p>Le gérant assure la direction opérationnelle, représente la coopérative dans ses actes courants, prépare et exécute les décisions du conseil d'administration.</p><h2>ARTICLE 3 — RÉMUNÉRATION</h2><p>Le gérant percevra une rémunération mensuelle brute de {{remuneration}} FCFA, révisable annuellement.</p><h2>ARTICLE 4 — OBLIGATIONS</h2><p>Le gérant est soumis à un devoir de loyauté, de confidentialité et de reddition de comptes trimestrielle au conseil d'administration.</p><h2>ARTICLE 5 — CESSATION</h2><p>Le mandat prend fin à l'échéance, par révocation ou démission, dans le respect des statuts et de la législation applicable.</p><p>Fait en double exemplaire.</p><p>Le Président du Conseil d'Administration : ___________________________</p><p>Le Gérant : ___________________________</p></div>` },

  {
    code: 'coop_pv_ag',
    name: "Procès-verbal d'assemblée générale coopérative",
    category: 'association',
    price: 3000, priceMax: 9000,
    description: "Procès-verbal type d'une assemblée générale ordinaire ou extraordinaire d'une coopérative agricole ou de services.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 88,
    fieldsJson: F([
      {key:'nom_coop',label:"Nom de la coopérative",type:'text',required:true},
      {key:'date_ag',label:"Date de l'assemblée",type:'date',required:true},
      {key:'lieu_ag',label:"Lieu de l'assemblée",type:'text',required:true},
      {key:'nb_membres_presents',label:"Nombre de membres présents ou représentés",type:'text',required:true},
      {key:'ordre_du_jour',label:"Ordre du jour",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>PROCÈS-VERBAL D'ASSEMBLÉE GÉNÉRALE DE {{nom_coop}}</h1><p>Le {{date_ag}}, les membres de la coopérative {{nom_coop}} se sont réunis en assemblée générale au lieu suivant : {{lieu_ag}}.</p><h2>1. PRÉSENCE ET QUORUM</h2><p>Nombre de membres présents ou représentés : {{nb_membres_presents}}. Le quorum requis par les statuts est atteint, l'assemblée peut valablement délibérer.</p><h2>2. ORDRE DU JOUR</h2><p>{{ordre_du_jour}}</p><h2>3. DÉLIBÉRATIONS</h2><p>Chaque point de l'ordre du jour est discuté, soumis au vote et adopté ou rejeté à la majorité des voix exprimées, conformément aux statuts.</p><h2>4. RÉSOLUTIONS ADOPTÉES</h2><p>[À compléter par les résolutions numérotées issues des délibérations]</p><h2>5. CLÔTURE</h2><p>L'ordre du jour étant épuisé, la séance est levée à _______ heures.</p><p>Le Président de séance : ___________________________</p><p>Le Secrétaire de séance : ___________________________</p></div>` },

  {
    code: 'coop_rapport_gestion',
    name: "Rapport de gestion coopérative annuel",
    category: 'association',
    price: 5000, priceMax: 14000,
    description: "Rapport annuel de gestion présenté par le conseil d'administration d'une coopérative à l'assemblée générale.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 71,
    fieldsJson: F([
      {key:'nom_coop',label:"Nom de la coopérative",type:'text',required:true},
      {key:'exercice',label:"Exercice concerné (année)",type:'text',required:true},
      {key:'president',label:"Nom du président du CA",type:'text',required:true},
      {key:'bilan_activites',label:"Bilan des activités de l'exercice",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>RAPPORT DE GESTION — EXERCICE {{exercice}}</h1><h2>{{nom_coop}}</h2><p>Mesdames et Messieurs les membres,</p><p>En application des statuts, le conseil d'administration vous présente le rapport de gestion de la coopérative {{nom_coop}} pour l'exercice {{exercice}}.</p><h2>I. ACTIVITÉS DE L'EXERCICE</h2><p>{{bilan_activites}}</p><h2>II. SITUATION FINANCIÈRE</h2><p>Les comptes de l'exercice, établis conformément aux normes comptables en vigueur, font apparaître les résultats présentés en annexe.</p><h2>III. ÉVÉNEMENTS SIGNIFICATIFS</h2><p>[À compléter : événements intervenus depuis la clôture de l'exercice]</p><h2>IV. PERSPECTIVES</h2><p>Le conseil d'administration expose ici les orientations stratégiques pour le prochain exercice.</p><h2>V. RÉSOLUTIONS PROPOSÉES</h2><p>Le conseil propose à l'assemblée d'approuver les comptes et d'affecter le résultat conformément aux statuts.</p><p>Le Président du Conseil d'Administration : <strong>{{president}}</strong></p></div>` },

  {
    code: 'coop_plan_developpement',
    name: "Plan de développement coopérative",
    category: 'association',
    price: 6000, priceMax: 18000,
    description: "Document de planification stratégique pluriannuelle d'une coopérative agricole ou de services en zone OHADA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 59,
    fieldsJson: F([
      {key:'nom_coop',label:"Nom de la coopérative",type:'text',required:true},
      {key:'periode',label:"Période du plan (ex. 2025-2028)",type:'text',required:true},
      {key:'vision',label:"Vision stratégique",type:'textarea',required:true},
      {key:'axes',label:"Axes prioritaires de développement",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT {{periode}}</h1><h2>{{nom_coop}}</h2><h2>I. VISION</h2><p>{{vision}}</p><h2>II. AXES PRIORITAIRES</h2><p>{{axes}}</p><h2>III. PLAN D'ACTION</h2><p>Pour chaque axe prioritaire, des actions concrètes, des indicateurs de performance et des responsables sont identifiés dans le tableau annexé.</p><h2>IV. BUDGET PRÉVISIONNEL</h2><p>Le budget prévisionnel sur la période {{periode}} est établi en cohérence avec les ressources propres, les contributions des membres et les financements extérieurs mobilisables.</p><h2>V. SUIVI ET ÉVALUATION</h2><p>Un comité de suivi se réunit semestriellement pour évaluer la mise en œuvre du plan et proposer les ajustements nécessaires.</p></div>` },

  {
    code: 'coop_accord_fusion',
    name: "Accord de fusion de coopératives",
    category: 'association',
    price: 8000, priceMax: 24000,
    description: "Convention de fusion-absorption ou fusion-création entre deux ou plusieurs coopératives en droit OHADA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 45,
    fieldsJson: F([
      {key:'coop_absorbante',label:"Coopérative absorbante / nouvelle entité",type:'text',required:true},
      {key:'coop_absorbee',label:"Coopérative absorbée",type:'text',required:true},
      {key:'date_effet',label:"Date d'effet de la fusion",type:'date',required:true},
      {key:'valeur_actif_net',label:"Valeur de l'actif net apporté (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE FUSION DE COOPÉRATIVES</h1><p>Entre la coopérative <strong>{{coop_absorbante}}</strong> (ci-après la Bénéficiaire) et la coopérative <strong>{{coop_absorbee}}</strong> (ci-après l'Apporteuse),</p><h2>ARTICLE 1 — OBJET</h2><p>Les parties conviennent de réaliser une fusion par voie d'absorption aux termes de laquelle la coopérative {{coop_absorbee}} transmet l'intégralité de son patrimoine à la coopérative {{coop_absorbante}}.</p><h2>ARTICLE 2 — DATE D'EFFET</h2><p>La fusion prend effet le {{date_effet}}, sous réserve des approbations requises par les assemblées générales respectives et les autorités compétentes.</p><h2>ARTICLE 3 — APPORT</h2><p>L'actif net apporté est évalué à {{valeur_actif_net}} FCFA selon l'état des actifs et passifs annexé au présent accord.</p><h2>ARTICLE 4 — SORT DES MEMBRES</h2><p>Les membres de la coopérative absorbée deviennent de plein droit membres de la coopérative bénéficiaire dans les conditions prévues par ses statuts.</p><h2>ARTICLE 5 — DISSOLUTION</h2><p>La coopérative absorbée est dissoute sans liquidation à la date d'effet de la fusion.</p></div>` },

  {
    code: 'coop_contrat_consommateurs',
    name: "Contrat de coopérative de consommateurs",
    category: 'association',
    price: 4500, priceMax: 13500,
    description: "Statuts et accord fondateur d'une coopérative de consommateurs pour l'approvisionnement groupé en biens et services.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 52,
    fieldsJson: F([
      {key:'nom_coop',label:"Nom de la coopérative de consommateurs",type:'text',required:true},
      {key:'siege',label:"Siège social",type:'text',required:true},
      {key:'domaine',label:"Domaine d'approvisionnement (ex. produits alimentaires)",type:'text',required:true},
      {key:'date_creation',label:"Date de création",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT CONSTITUTIF — COOPÉRATIVE DE CONSOMMATEURS {{nom_coop}}</h1><p>Les membres fondateurs réunis le {{date_creation}} à {{siege}} conviennent de créer une coopérative de consommateurs dénommée {{nom_coop}}.</p><h2>ARTICLE 1 — OBJET</h2><p>La coopérative a pour objet l'approvisionnement collectif de ses membres en {{domaine}}, dans le but de réduire les coûts et d'améliorer la qualité des produits et services accessibles.</p><h2>ARTICLE 2 — PRINCIPES</h2><p>La coopérative est fondée sur les principes coopératifs internationaux : adhésion volontaire, contrôle démocratique, participation économique des membres, autonomie, éducation et coopération entre coopératives.</p><h2>ARTICLE 3 — RÉPARTITION DES AVANTAGES</h2><p>Les excédents réalisés sont répartis entre les membres au prorata de leurs achats effectués au cours de l'exercice.</p><p>Fait à {{siege}}, le {{date_creation}}.</p></div>` },

  {
    code: 'coop_statuts_coopec',
    name: "Statuts de mutuelle d'épargne et de crédit (COOPEC)",
    category: 'association',
    price: 7000, priceMax: 21000,
    description: "Statuts d'une Coopérative d'Épargne et de Crédit (COOPEC) conformes à la réglementation BCEAO et au droit OHADA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 78,
    fieldsJson: F([
      {key:'nom_coopec',label:"Dénomination de la COOPEC",type:'text',required:true},
      {key:'siege',label:"Siège social",type:'text',required:true},
      {key:'zone_intervention',label:"Zone géographique d'intervention",type:'text',required:true},
      {key:'capital_min',label:"Capital social minimum (FCFA)",type:'text',required:true},
      {key:'date_ag',label:"Date de l'assemblée constitutive",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>STATUTS DE LA COOPÉRATIVE D'ÉPARGNE ET DE CRÉDIT (COOPEC) {{nom_coopec}}</h1><h2>PRÉAMBULE</h2><p>Conformément à la loi portant réglementation des Systèmes Financiers Décentralisés (SFD) et à la réglementation de la BCEAO, les membres fondateurs réunis le {{date_ag}} ont constitué la COOPEC {{nom_coopec}}.</p><h2>ARTICLE 1 — DÉNOMINATION ET SIÈGE</h2><p>La coopérative est dénommée {{nom_coopec}}. Son siège social est établi à {{siege}}.</p><h2>ARTICLE 2 — ZONE D'INTERVENTION</h2><p>La COOPEC opère dans la zone géographique suivante : {{zone_intervention}}.</p><h2>ARTICLE 3 — OBJET</h2><p>La COOPEC a pour objet de collecter l'épargne de ses membres et de leur consentir des crédits à des taux d'intérêt accessibles.</p><h2>ARTICLE 4 — CAPITAL</h2><p>Le capital social minimum est fixé à {{capital_min}} FCFA, constitué de parts sociales nominatives et indivisibles.</p><h2>ARTICLE 5 — AGRÉMENT</h2><p>La COOPEC est soumise à l'agrément et à la surveillance des autorités de supervision des SFD conformément à la réglementation en vigueur.</p></div>` },

  {
    code: 'coop_reglement_coopec',
    name: "Règlement de la COOPEC",
    category: 'association',
    price: 4000, priceMax: 12000,
    description: "Règlement intérieur d'une COOPEC précisant les conditions d'épargne, de crédit et de gouvernance des membres.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 67,
    fieldsJson: F([
      {key:'nom_coopec',label:"Nom de la COOPEC",type:'text',required:true},
      {key:'taux_epargne',label:"Taux de rémunération de l'épargne (%)",type:'text',required:true},
      {key:'taux_credit',label:"Taux d'intérêt sur crédit (%)",type:'text',required:true},
      {key:'plafond_credit',label:"Plafond maximum de crédit (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>RÈGLEMENT INTÉRIEUR DE LA COOPEC {{nom_coopec}}</h1><h2>CHAPITRE I — ÉPARGNE</h2><p>Chaque membre est tenu de maintenir un compte d'épargne actif. L'épargne est rémunérée au taux annuel de {{taux_epargne}} %. Les retraits sont soumis aux conditions fixées par le conseil d'administration.</p><h2>CHAPITRE II — CRÉDIT</h2><p>Les membres éligibles peuvent solliciter des crédits dont le montant ne peut excéder {{plafond_credit}} FCFA. Les crédits sont accordés à un taux d'intérêt de {{taux_credit}} % par an. Toute demande est instruite par le comité de crédit.</p><h2>CHAPITRE III — GARANTIES</h2><p>Les garanties acceptées comprennent le nantissement de l'épargne, la caution solidaire de membres, et les sûretés réelles conformes au droit OHADA.</p><h2>CHAPITRE IV — CONTENTIEUX</h2><p>En cas d'impayé, la COOPEC engage les procédures de recouvrement prévues par ses statuts et la réglementation en vigueur.</p></div>` },

  {
    code: 'coop_adhesion_coopec',
    name: "Adhésion COOPEC",
    category: 'association',
    price: 1500, priceMax: 4500,
    description: "Formulaire d'adhésion et d'ouverture de compte d'un membre dans une Coopérative d'Épargne et de Crédit.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 85,
    fieldsJson: F([
      {key:'nom_membre',label:"Nom et prénoms",type:'text',required:true},
      {key:'date_naissance',label:"Date de naissance",type:'date',required:true},
      {key:'adresse',label:"Adresse",type:'text',required:true},
      {key:'nom_coopec',label:"Nom de la COOPEC",type:'text',required:true},
      {key:'depot_initial',label:"Montant du dépôt initial (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>DEMANDE D'ADHÉSION ET D'OUVERTURE DE COMPTE — {{nom_coopec}}</h1><p>Je soussigné(e) <strong>{{nom_membre}}</strong>, né(e) le {{date_naissance}}, domicilié(e) à {{adresse}}, sollicite mon admission comme membre de la COOPEC {{nom_coopec}} et l'ouverture d'un compte d'épargne en mon nom.</p><p>Je m'engage à respecter les statuts et le règlement intérieur de la COOPEC, à souscrire les parts sociales requises et à effectuer un dépôt initial de {{depot_initial}} FCFA.</p><p>Je reconnais avoir reçu copie des statuts et du règlement intérieur.</p><p>Fait à ______________, le ______________.</p><p>Signature du demandeur : ___________________________</p><p>Visa du Directeur de la COOPEC : ___________________________</p></div>` },

  {
    code: 'coop_pret_membre_coopec',
    name: "Contrat de prêt COOPEC membre",
    category: 'association',
    price: 3000, priceMax: 9000,
    description: "Contrat de prêt accordé par une COOPEC à l'un de ses membres, avec plan de remboursement et garanties.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 90,
    fieldsJson: F([
      {key:'nom_emprunteur',label:"Nom et prénoms de l'emprunteur",type:'text',required:true},
      {key:'nom_coopec',label:"Nom de la COOPEC",type:'text',required:true},
      {key:'montant_pret',label:"Montant du prêt (FCFA)",type:'text',required:true},
      {key:'taux',label:"Taux d'intérêt annuel (%)",type:'text',required:true},
      {key:'duree_mois',label:"Durée de remboursement (mois)",type:'text',required:true},
      {key:'date_octroi',label:"Date d'octroi du prêt",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE PRÊT</h1><p>Entre la COOPEC <strong>{{nom_coopec}}</strong> (le Prêteur) et M./Mme <strong>{{nom_emprunteur}}</strong> (l'Emprunteur),</p><h2>ARTICLE 1 — OBJET</h2><p>La COOPEC consent à l'Emprunteur un prêt d'un montant de <strong>{{montant_pret}} FCFA</strong>, décaissé le {{date_octroi}}.</p><h2>ARTICLE 2 — INTÉRÊTS</h2><p>Le prêt porte intérêt au taux annuel de {{taux}} %, calculé sur le capital restant dû.</p><h2>ARTICLE 3 — REMBOURSEMENT</h2><p>Le prêt est remboursable en {{duree_mois}} mensualités égales comprenant capital et intérêts, selon l'échéancier joint en annexe.</p><h2>ARTICLE 4 — GARANTIES</h2><p>L'Emprunteur constitue en garantie le nantissement de son épargne et/ou la caution solidaire des membres garants désignés en annexe.</p><h2>ARTICLE 5 — DÉFAUT</h2><p>Tout retard de remboursement entraîne des pénalités et peut donner lieu à des procédures de recouvrement conformément aux statuts de la COOPEC.</p><p>Signatures des parties : ___________________________</p></div>` },

  {
    code: 'coop_rapport_perf_coopec',
    name: "Rapport de performance COOPEC",
    category: 'association',
    price: 4500, priceMax: 13500,
    description: "Rapport annuel de performance financière et sociale d'une COOPEC destiné aux membres et aux autorités de supervision.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 62,
    fieldsJson: F([
      {key:'nom_coopec',label:"Nom de la COOPEC",type:'text',required:true},
      {key:'exercice',label:"Exercice (année)",type:'text',required:true},
      {key:'nb_membres',label:"Nombre total de membres",type:'text',required:true},
      {key:'encours_epargne',label:"Encours total d'épargne (FCFA)",type:'text',required:true},
      {key:'encours_credit',label:"Encours total de crédits (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE — COOPEC {{nom_coopec}} — EXERCICE {{exercice}}</h1><h2>I. DONNÉES SOCIALES</h2><p>Nombre de membres au 31 décembre {{exercice}} : <strong>{{nb_membres}}</strong>.</p><h2>II. DONNÉES FINANCIÈRES</h2><p>Encours total d'épargne : <strong>{{encours_epargne}} FCFA</strong>.<br/>Encours total de crédits : <strong>{{encours_credit}} FCFA</strong>.</p><h2>III. QUALITÉ DU PORTEFEUILLE</h2><p>Le taux de portefeuille à risque (PAR 30) et le taux de remboursement sont présentés dans les tableaux annexés.</p><h2>IV. INDICATEURS DE RENTABILITÉ</h2><p>Le rendement sur actifs (ROA) et le rendement sur fonds propres (ROE) sont calculés conformément aux normes prudentielles des SFD.</p><h2>V. PERSPECTIVES</h2><p>Les orientations pour l'exercice suivant sont définies en tenant compte des performances de l'exercice écoulé.</p></div>` },

  {
    code: 'coop_plan_dev_coopec',
    name: "Plan de développement COOPEC",
    category: 'association',
    price: 6000, priceMax: 18000,
    description: "Plan stratégique de développement d'une COOPEC couvrant la croissance de l'épargne, du crédit et des services aux membres.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 54,
    fieldsJson: F([
      {key:'nom_coopec',label:"Nom de la COOPEC",type:'text',required:true},
      {key:'periode',label:"Période du plan",type:'text',required:true},
      {key:'objectif_membres',label:"Objectif de membres à atteindre",type:'text',required:true},
      {key:'objectif_epargne',label:"Objectif d'encours d'épargne (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT {{periode}} — COOPEC {{nom_coopec}}</h1><h2>I. CONTEXTE</h2><p>La COOPEC {{nom_coopec}} souhaite renforcer son impact sur la période {{periode}} en répondant aux besoins financiers croissants de ses membres et des communautés qu'elle dessert.</p><h2>II. OBJECTIFS</h2><p>- Atteindre {{objectif_membres}} membres actifs.<br/>- Porter l'encours d'épargne à {{objectif_epargne}} FCFA.<br/>- Diversifier les produits financiers offerts.</p><h2>III. STRATÉGIES</h2><p>Les stratégies incluent la sensibilisation, la formation financière des membres, le renforcement des capacités du personnel et le développement de nouveaux points de service.</p><h2>IV. RESSOURCES</h2><p>Le plan est financé par les fonds propres, les résultats mis en réserve et les partenariats institutionnels.</p></div>` },

  {
    code: 'coop_accord_reseau',
    name: "Accord de réseau de coopératives",
    category: 'association',
    price: 5000, priceMax: 15000,
    description: "Convention de mise en réseau de plusieurs coopératives pour mutualiser des ressources et harmoniser des pratiques.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 48,
    fieldsJson: F([
      {key:'nom_reseau',label:"Dénomination du réseau",type:'text',required:true},
      {key:'membres_fondateurs',label:"Coopératives membres fondatrices",type:'textarea',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE RÉSEAU DE COOPÉRATIVES — {{nom_reseau}}</h1><p>Les coopératives suivantes, ci-après dénommées les Membres :</p><p>{{membres_fondateurs}}</p><p>Conviennent, le {{date_accord}}, de constituer le réseau {{nom_reseau}} aux fins de mutualiser leurs ressources, harmoniser leurs pratiques et renforcer leur représentation collective.</p><h2>ARTICLE 1 — GOUVERNANCE DU RÉSEAU</h2><p>Le réseau est géré par un comité de coordination composé d'un représentant par coopérative membre, se réunissant au minimum deux fois par an.</p><h2>ARTICLE 2 — PARTAGE DES RESSOURCES</h2><p>Les membres conviennent de partager les ressources humaines, techniques et logistiques selon les modalités définies en annexe.</p><h2>ARTICLE 3 — COTISATIONS</h2><p>Chaque membre contribue annuellement au fonctionnement du réseau selon un barème adopté par le comité de coordination.</p></div>` },

  {
    code: 'coop_convention_federation',
    name: "Convention de fédération de coopératives",
    category: 'association',
    price: 6000, priceMax: 18000,
    description: "Convention constitutive d'une fédération ou union de coopératives pour la représentation et le plaidoyer sectoriel.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 43,
    fieldsJson: F([
      {key:'nom_federation',label:"Nom de la fédération",type:'text',required:true},
      {key:'secteur',label:"Secteur représenté",type:'text',required:true},
      {key:'siege',label:"Siège de la fédération",type:'text',required:true},
      {key:'date_creation',label:"Date de création",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CONVENTION DE FÉDÉRATION DE COOPÉRATIVES — {{nom_federation}}</h1><p>Les coopératives du secteur {{secteur}}, réunies en assemblée le {{date_creation}} à {{siege}}, constituent la fédération {{nom_federation}}.</p><h2>ARTICLE 1 — MISSIONS</h2><p>La fédération a pour missions de représenter les intérêts collectifs de ses membres, d'assurer leur formation, de promouvoir le mouvement coopératif et de négocier avec les pouvoirs publics et les partenaires.</p><h2>ARTICLE 2 — ADHÉSION</h2><p>Toute coopérative du secteur {{secteur}} régulièrement constituée peut demander son adhésion à la fédération, sous réserve d'acceptation par l'assemblée générale.</p><h2>ARTICLE 3 — FINANCEMENT</h2><p>La fédération est financée par les cotisations de ses membres, les subventions et les prestations de services rendus aux membres.</p></div>` },

  {
    code: 'coop_accord_partenariat_ong',
    name: "Accord de partenariat coopérative-ONG",
    category: 'association',
    price: 4000, priceMax: 12000,
    description: "Convention de partenariat entre une coopérative et une ONG pour la mise en œuvre conjointe d'un projet de développement.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'nom_coop',label:"Nom de la coopérative",type:'text',required:true},
      {key:'nom_ong',label:"Nom de l'ONG partenaire",type:'text',required:true},
      {key:'objet_partenariat',label:"Objet du partenariat",type:'textarea',required:true},
      {key:'duree',label:"Durée du partenariat",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT COOPÉRATIVE — ONG</h1><p>Entre la coopérative <strong>{{nom_coop}}</strong> et l'organisation non gouvernementale <strong>{{nom_ong}}</strong>,</p><h2>ARTICLE 1 — OBJET</h2><p>{{objet_partenariat}}</p><h2>ARTICLE 2 — DURÉE</h2><p>Le présent accord est conclu pour une durée de {{duree}} à compter du {{date_signature}}, renouvelable par accord exprès des parties.</p><h2>ARTICLE 3 — RÔLES ET RESPONSABILITÉS</h2><p>Les rôles, responsabilités, contributions et ressources de chaque partie sont détaillés dans le plan d'action annexé.</p><h2>ARTICLE 4 — RAPPORTAGE</h2><p>Les parties produisent des rapports d'avancement trimestriels et un rapport final à la clôture du partenariat.</p><p>Signé le {{date_signature}}.</p></div>` },

  {
    code: 'coop_contrat_service_conseil',
    name: "Contrat de service de conseil coopérative",
    category: 'association',
    price: 4000, priceMax: 12000,
    description: "Contrat de prestation de conseil (technique, organisationnel, financier) fourni à une coopérative par un prestataire spécialisé.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 57,
    fieldsJson: F([
      {key:'nom_coop',label:"Nom de la coopérative cliente",type:'text',required:true},
      {key:'nom_prestataire',label:"Nom du prestataire de conseil",type:'text',required:true},
      {key:'mission',label:"Description de la mission de conseil",type:'textarea',required:true},
      {key:'honoraires',label:"Honoraires convenus (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début de la mission",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE PRESTATION DE CONSEIL</h1><p>Entre la coopérative <strong>{{nom_coop}}</strong> (le Client) et <strong>{{nom_prestataire}}</strong> (le Consultant),</p><h2>ARTICLE 1 — OBJET DE LA MISSION</h2><p>{{mission}}</p><h2>ARTICLE 2 — DURÉE</h2><p>La mission débute le {{date_debut}}. Sa durée et les jalons sont précisés dans les termes de référence annexés.</p><h2>ARTICLE 3 — HONORAIRES</h2><p>Le Client versera au Consultant des honoraires de {{honoraires}} FCFA, selon l'échéancier défini en annexe.</p><h2>ARTICLE 4 — LIVRABLES</h2><p>Le Consultant remet les livrables convenus (rapports, plans, formations) aux dates stipulées dans les termes de référence.</p><h2>ARTICLE 5 — CONFIDENTIALITÉ</h2><p>Le Consultant s'engage à maintenir confidentielles toutes les informations obtenues dans le cadre de la mission.</p></div>` },

  {
    code: 'coop_rapport_audit',
    name: "Rapport d'audit coopérative",
    category: 'association',
    price: 5000, priceMax: 15000,
    description: "Rapport d'audit externe des comptes et de la gouvernance d'une coopérative agricole ou financière.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      {key:'nom_coop',label:"Nom de la coopérative auditée",type:'text',required:true},
      {key:'exercice',label:"Exercice audité",type:'text',required:true},
      {key:'nom_auditeur',label:"Cabinet ou auditeur",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>RAPPORT D'AUDIT — {{nom_coop}} — EXERCICE {{exercice}}</h1><h2>I. MISSION</h2><p>Le cabinet <strong>{{nom_auditeur}}</strong> a été mandaté pour procéder à l'audit des comptes et de la gouvernance de la coopérative {{nom_coop}} pour l'exercice {{exercice}}.</p><h2>II. MÉTHODOLOGIE</h2><p>L'audit a été conduit conformément aux normes professionnelles applicables, incluant l'examen des pièces comptables, les entretiens avec les dirigeants et la revue des procès-verbaux des organes statutaires.</p><h2>III. CONSTATATIONS</h2><p>[Les constatations détaillées sont présentées dans les sections thématiques ci-après : situation financière, gouvernance, conformité réglementaire, gestion des risques.]</p><h2>IV. RECOMMANDATIONS</h2><p>[Les recommandations formulées sont classées par ordre de priorité et accompagnées d'un plan d'action proposé.]</p><h2>V. CONCLUSION</h2><p>Sous réserve des observations formulées ci-dessus, les comptes de l'exercice {{exercice}} présentent sincèrement la situation de la coopérative.</p><p>Fait le {{date_rapport}} par {{nom_auditeur}}.</p></div>` },

  {
    code: 'coop_accord_label_equitable',
    name: "Accord de label coopérative équitable",
    category: 'association',
    price: 5000, priceMax: 15000,
    description: "Convention entre une coopérative et un organisme de certification pour l'obtention et l'usage d'un label commerce équitable.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 50,
    fieldsJson: F([
      {key:'nom_coop',label:"Nom de la coopérative",type:'text',required:true},
      {key:'nom_organisme',label:"Organisme certificateur",type:'text',required:true},
      {key:'label',label:"Dénomination du label",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE LABEL COMMERCE ÉQUITABLE</h1><p>Entre la coopérative <strong>{{nom_coop}}</strong> et l'organisme certificateur <strong>{{nom_organisme}}</strong>,</p><h2>ARTICLE 1 — OBJET</h2><p>Le présent accord autorise la coopérative {{nom_coop}} à utiliser le label <strong>{{label}}</strong> sur ses produits et communications, sous réserve du respect continu des critères de certification.</p><h2>ARTICLE 2 — OBLIGATIONS DE LA COOPÉRATIVE</h2><p>La coopérative s'engage à respecter les standards du label, à se soumettre aux audits annuels de l'organisme et à verser les redevances prévues.</p><h2>ARTICLE 3 — OBLIGATIONS DE L'ORGANISME</h2><p>L'organisme assure la promotion du label, conduit les audits et fournit un soutien technique à la coopérative.</p><h2>ARTICLE 4 — DURÉE</h2><p>L'accord est conclu pour une durée de trois (3) ans à compter du {{date_accord}}, renouvelable.</p></div>` },

  {
    code: 'coop_plan_formation_membres',
    name: "Plan de formation membres coopérative",
    category: 'association',
    price: 3500, priceMax: 10500,
    description: "Plan annuel ou pluriannuel de renforcement des capacités et de formation des membres d'une coopérative agricole.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 64,
    fieldsJson: F([
      {key:'nom_coop',label:"Nom de la coopérative",type:'text',required:true},
      {key:'periode',label:"Période du plan de formation",type:'text',required:true},
      {key:'themes',label:"Thèmes de formation prioritaires",type:'textarea',required:true},
      {key:'budget_formation',label:"Budget alloué à la formation (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>PLAN DE FORMATION DES MEMBRES — {{nom_coop}} — {{periode}}</h1><h2>I. CONTEXTE ET BESOINS</h2><p>L'analyse des besoins en compétences des membres de la coopérative {{nom_coop}} a mis en évidence les priorités suivantes pour la période {{periode}}.</p><h2>II. THÈMES DE FORMATION</h2><p>{{themes}}</p><h2>III. MODALITÉS</h2><p>Les formations seront dispensées sous forme de sessions collectives, visites d'échange et accompagnement individuel, en faisant appel à des formateurs internes et externes qualifiés.</p><h2>IV. BUDGET</h2><p>Le budget total alloué à la formation est de <strong>{{budget_formation}} FCFA</strong>, financé par les ressources propres de la coopérative et les contributions des partenaires.</p><h2>V. SUIVI</h2><p>La participation, la satisfaction des membres et l'application des acquis sont suivies et rapportées annuellement.</p></div>` },

  {
    code: 'coop_accord_central_achat',
    name: "Accord de commerce de groupe (central d'achat coopérative)",
    category: 'association',
    price: 5000, priceMax: 15000,
    description: "Accord de central d'achat permettant à des coopératives membres de négocier et acheter groupément intrants et équipements.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'nom_central',label:"Dénomination du central d'achat",type:'text',required:true},
      {key:'membres',label:"Coopératives membres participantes",type:'textarea',required:true},
      {key:'produits',label:"Catégories de produits concernés",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE CENTRAL D'ACHAT COOPÉRATIF — {{nom_central}}</h1><p>Les coopératives membres suivantes :</p><p>{{membres}}</p><p>Conviennent, le {{date_accord}}, de mettre en place le central d'achat {{nom_central}} pour les catégories de produits suivantes : {{produits}}.</p><h2>ARTICLE 1 — OBJECTIF</h2><p>Mutualiser les achats afin d'obtenir de meilleures conditions tarifaires, garantir la qualité et sécuriser l'approvisionnement des membres.</p><h2>ARTICLE 2 — FONCTIONNEMENT</h2><p>Les commandes groupées sont initiées par le gestionnaire du central sur la base des besoins agrégés des membres. La facturation est effectuée directement aux membres concernés.</p><h2>ARTICLE 3 — FINANCEMENT</h2><p>Les frais de fonctionnement du central sont répartis entre les membres au prorata des volumes achetés.</p></div>` },

  {
    code: 'coop_convention_supervision_minader',
    name: "Convention de supervision MINADER coopératives",
    category: 'association',
    price: 4000, priceMax: 12000,
    description: "Convention entre une coopérative agricole et le Ministère de l'Agriculture pour la supervision et l'appui technique.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 41,
    fieldsJson: F([
      {key:'nom_coop',label:"Nom de la coopérative",type:'text',required:true},
      {key:'region',label:"Région d'implantation",type:'text',required:true},
      {key:'date_convention',label:"Date de la convention",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CONVENTION DE SUPERVISION ET D'APPUI TECHNIQUE</h1><p>Entre le Ministère de l'Agriculture et du Développement Rural (MINADER) représenté par la Direction Régionale de {{region}}, et la coopérative agricole <strong>{{nom_coop}}</strong>,</p><h2>ARTICLE 1 — OBJET</h2><p>La présente convention définit les modalités de supervision technique et d'appui institutionnel fournis par le MINADER à la coopérative {{nom_coop}} dans la région de {{region}}.</p><h2>ARTICLE 2 — ENGAGEMENTS DU MINADER</h2><p>Le MINADER s'engage à mettre à disposition des agents de vulgarisation, à faciliter l'accès aux intrants subventionnés et à appuyer les démarches de certification de la coopérative.</p><h2>ARTICLE 3 — ENGAGEMENTS DE LA COOPÉRATIVE</h2><p>La coopérative s'engage à se conformer aux normes techniques recommandées, à fournir des données statistiques fiables et à participer aux programmes nationaux de développement agricole.</p><p>Signé le {{date_convention}}.</p></div>` },

  {
    code: 'coop_charte_valeurs',
    name: "Charte des valeurs coopératives",
    category: 'association',
    price: 2500, priceMax: 7500,
    description: "Charte énonçant les valeurs, principes éthiques et engagements fondamentaux d'une coopérative vis-à-vis de ses membres et de la société.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 69,
    fieldsJson: F([
      {key:'nom_coop',label:"Nom de la coopérative",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption de la charte",type:'date',required:true},
      {key:'valeurs',label:"Valeurs fondamentales de la coopérative",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>CHARTE DES VALEURS DE {{nom_coop}}</h1><p>Adoptée le {{date_adoption}} par l'assemblée générale,</p><h2>PRÉAMBULE</h2><p>La coopérative {{nom_coop}} adhère pleinement aux valeurs universelles du mouvement coopératif : aide mutuelle, responsabilité, démocratie, égalité, équité et solidarité.</p><h2>NOS VALEURS FONDAMENTALES</h2><p>{{valeurs}}</p><h2>NOS ENGAGEMENTS</h2><p>Nous nous engageons à placer l'humain au centre de nos activités, à agir de manière transparente et responsable envers nos membres, nos partenaires et les communautés que nous servons.</p><h2>APPLICATION</h2><p>Cette charte guide toutes les décisions et comportements au sein de la coopérative. Chaque membre, dirigeant et employé est tenu de la respecter et de la promouvoir.</p></div>` },

  // ─── 25 templates Associations / Fondations ──────────────────────────────
  {
    code: 'fond_statuts_fondation',
    name: "Statuts de fondation d'utilité publique",
    category: 'association',
    price: 8000, priceMax: 24000,
    description: "Statuts constitutifs d'une fondation reconnue d'utilité publique, conformes au droit applicable en zone OHADA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 75,
    fieldsJson: F([
      {key:'nom_fondation',label:"Dénomination de la fondation",type:'text',required:true},
      {key:'fondateur',label:"Nom du ou des fondateurs",type:'text',required:true},
      {key:'siege',label:"Siège social",type:'text',required:true},
      {key:'objet',label:"Objet d'intérêt général",type:'textarea',required:true},
      {key:'dotation_initiale',label:"Dotation initiale (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>STATUTS DE LA FONDATION {{nom_fondation}}</h1><h2>ARTICLE 1 — DÉNOMINATION</h2><p>Il est créé une fondation dénommée <strong>{{nom_fondation}}</strong>, à l'initiative de {{fondateur}}.</p><h2>ARTICLE 2 — OBJET</h2><p>La fondation a pour objet d'intérêt général : {{objet}}</p><h2>ARTICLE 3 — SIÈGE</h2><p>Le siège de la fondation est fixé à {{siege}}. Il peut être transféré par décision du conseil d'administration.</p><h2>ARTICLE 4 — DOTATION</h2><p>La dotation initiale est fixée à {{dotation_initiale}} FCFA. Elle est inaliénable et doit être affectée exclusivement à la réalisation de l'objet de la fondation.</p><h2>ARTICLE 5 — GOUVERNANCE</h2><p>La fondation est administrée par un conseil d'administration dont la composition, les pouvoirs et le mode de fonctionnement sont définis aux articles suivants.</p><h2>ARTICLE 6 — DISSOLUTION</h2><p>En cas de dissolution, les actifs de la fondation sont dévolus à une entité poursuivant un objet similaire.</p></div>` },

  {
    code: 'fond_acte_dotation',
    name: "Acte de dotation fondation",
    category: 'association',
    price: 5000, priceMax: 15000,
    description: "Acte notarié ou sous seing privé par lequel un donateur constitue la dotation initiale ou complémentaire d'une fondation.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 58,
    fieldsJson: F([
      {key:'nom_donateur',label:"Nom du donateur",type:'text',required:true},
      {key:'nom_fondation',label:"Nom de la fondation bénéficiaire",type:'text',required:true},
      {key:'montant_dotation',label:"Montant de la dotation (FCFA)",type:'text',required:true},
      {key:'affectation',label:"Affectation spécifique de la dotation",type:'textarea',required:true},
      {key:'date_acte',label:"Date de l'acte",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACTE DE DOTATION</h1><p>Je soussigné(e) <strong>{{nom_donateur}}</strong> (le Donateur), déclare affecter de manière irrévocable à la fondation <strong>{{nom_fondation}}</strong> (la Fondation) la somme de <strong>{{montant_dotation}} FCFA</strong>.</p><h2>ARTICLE 1 — AFFECTATION</h2><p>{{affectation}}</p><h2>ARTICLE 2 — IRRÉVOCABILITÉ</h2><p>La présente dotation est consentie à titre irrévocable. La Fondation ne peut en disposer que dans le cadre de l'objet défini ci-dessus et de ses statuts.</p><h2>ARTICLE 3 — GESTION</h2><p>La Fondation s'engage à gérer la dotation avec prudence, à en préserver le capital et à n'en utiliser que les revenus ou produits pour réaliser son objet, sauf autorisation expresse du Donateur.</p><p>Fait le {{date_acte}}.</p><p>Signature du Donateur : ___________________________</p><p>Pour la Fondation : ___________________________</p></div>` },

  {
    code: 'fond_reglement_prix_bourse',
    name: "Règlement d'attribution de prix ou bourse",
    category: 'association',
    price: 3000, priceMax: 9000,
    description: "Règlement fixant les critères, procédures de sélection et modalités d'attribution d'un prix ou d'une bourse par une fondation.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'nom_prix',label:"Nom du prix ou de la bourse",type:'text',required:true},
      {key:'nom_fondation',label:"Fondation attributrice",type:'text',required:true},
      {key:'montant',label:"Montant du prix ou de la bourse (FCFA)",type:'text',required:true},
      {key:'criteres',label:"Critères d'éligibilité",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>RÈGLEMENT DU {{nom_prix}}</h1><h2>ARTICLE 1 — INSTITUTION</h2><p>La fondation <strong>{{nom_fondation}}</strong> institue le <strong>{{nom_prix}}</strong> d'un montant de <strong>{{montant}} FCFA</strong>.</p><h2>ARTICLE 2 — OBJECTIF</h2><p>Ce prix vise à récompenser et encourager l'excellence et l'innovation dans le domaine d'action de la fondation.</p><h2>ARTICLE 3 — CRITÈRES D'ÉLIGIBILITÉ</h2><p>{{criteres}}</p><h2>ARTICLE 4 — PROCÉDURE DE SÉLECTION</h2><p>Les candidatures sont soumises selon les modalités et délais publiés par la fondation. Un jury indépendant, dont la composition est définie par le conseil d'administration, sélectionne le ou les lauréats.</p><h2>ARTICLE 5 — DÉCISION</h2><p>La décision du jury est souveraine et sans appel. Le ou les lauréats sont informés par écrit.</p></div>` },

  {
    code: 'fond_rapport_annuel',
    name: "Rapport annuel de fondation",
    category: 'association',
    price: 5000, priceMax: 14000,
    description: "Rapport annuel d'activités et financier d'une fondation d'utilité publique, destiné aux donateurs et aux autorités de tutelle.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'nom_fondation',label:"Nom de la fondation",type:'text',required:true},
      {key:'exercice',label:"Exercice (année)",type:'text',required:true},
      {key:'president',label:"Nom du président de la fondation",type:'text',required:true},
      {key:'synthese_activites',label:"Synthèse des activités de l'année",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>RAPPORT ANNUEL {{exercice}} — {{nom_fondation}}</h1><h2>MOT DU PRÉSIDENT</h2><p>Chers donateurs, partenaires et bénéficiaires,</p><p>L'exercice {{exercice}} a été marqué par les réalisations décrites ci-après, fidèles à l'objet de notre fondation.</p><p>{{president}}</p><h2>I. SYNTHÈSE DES ACTIVITÉS</h2><p>{{synthese_activites}}</p><h2>II. IMPACT</h2><p>Les indicateurs d'impact social et les témoignages de bénéficiaires sont présentés en annexe.</p><h2>III. RAPPORT FINANCIER</h2><p>Les états financiers de l'exercice {{exercice}}, certifiés par les commissaires aux comptes, sont joints au présent rapport.</p><h2>IV. PERSPECTIVES</h2><p>Les programmes et priorités pour l'exercice suivant sont décrits dans le plan d'action annexé.</p></div>` },

  {
    code: 'fond_contrat_directeur',
    name: "Contrat de directeur de fondation",
    category: 'association',
    price: 6000, priceMax: 18000,
    description: "Contrat de travail du directeur général d'une fondation, définissant ses missions, rémunération et conditions d'exercice.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 55,
    fieldsJson: F([
      {key:'nom_directeur',label:"Nom du directeur",type:'text',required:true},
      {key:'nom_fondation',label:"Nom de la fondation",type:'text',required:true},
      {key:'remuneration',label:"Rémunération mensuelle brute (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de prise de poste",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE DIRECTEUR GÉNÉRAL</h1><p>Entre la fondation <strong>{{nom_fondation}}</strong> (l'Employeur), représentée par le président du conseil d'administration, et <strong>{{nom_directeur}}</strong> (le Directeur),</p><h2>ARTICLE 1 — POSTE</h2><p>{{nom_directeur}} est engagé(e) en qualité de Directeur(trice) Général(e) de la fondation {{nom_fondation}}, à compter du {{date_debut}}.</p><h2>ARTICLE 2 — MISSIONS</h2><p>Le Directeur assure la direction opérationnelle, représente la fondation, gère les équipes et les programmes, et rend compte au conseil d'administration.</p><h2>ARTICLE 3 — RÉMUNÉRATION</h2><p>La rémunération mensuelle brute est fixée à {{remuneration}} FCFA, plus les avantages définis en annexe.</p><h2>ARTICLE 4 — DÉONTOLOGIE</h2><p>Le Directeur est soumis à des obligations de confidentialité, d'impartialité et de respect des valeurs de la fondation.</p></div>` },

  {
    code: 'fond_accord_partenariat_entreprise',
    name: "Accord de partenariat fondation-entreprise",
    category: 'association',
    price: 4500, priceMax: 13500,
    description: "Convention de partenariat stratégique entre une fondation et une entreprise privée pour le financement et la mise en œuvre de projets sociaux.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 67,
    fieldsJson: F([
      {key:'nom_fondation',label:"Nom de la fondation",type:'text',required:true},
      {key:'nom_entreprise',label:"Nom de l'entreprise partenaire",type:'text',required:true},
      {key:'projet',label:"Projet ou programme concerné",type:'textarea',required:true},
      {key:'contribution',label:"Contribution de l'entreprise (FCFA ou nature)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT FONDATION — ENTREPRISE</h1><p>Entre la fondation <strong>{{nom_fondation}}</strong> et la société <strong>{{nom_entreprise}}</strong>,</p><h2>ARTICLE 1 — PROJET</h2><p>{{projet}}</p><h2>ARTICLE 2 — CONTRIBUTION DE L'ENTREPRISE</h2><p>L'entreprise s'engage à contribuer à hauteur de {{contribution}} pour la réalisation du projet décrit ci-dessus.</p><h2>ARTICLE 3 — VISIBILITÉ</h2><p>La fondation assurera la visibilité de l'entreprise partenaire dans ses communications, selon les modalités définies en annexe.</p><h2>ARTICLE 4 — RAPPORTAGE</h2><p>La fondation produit des rapports d'utilisation des contributions à l'attention de l'entreprise, avec indicateurs d'impact.</p><p>Signé le {{date_accord}}.</p></div>` },

  {
    code: 'fond_accord_mecenat',
    name: "Accord de mécénat d'entreprise",
    category: 'association',
    price: 4000, priceMax: 12000,
    description: "Convention de mécénat financier ou en nature entre une entreprise et une fondation, avec justificatifs fiscaux.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 61,
    fieldsJson: F([
      {key:'nom_mecene',label:"Nom de l'entreprise mécène",type:'text',required:true},
      {key:'nom_fondation',label:"Nom de la fondation bénéficiaire",type:'text',required:true},
      {key:'nature_mecenat',label:"Nature du mécénat (financier, en nature, de compétence)",type:'text',required:true},
      {key:'valeur',label:"Valeur du mécénat (FCFA)",type:'text',required:true},
      {key:'date',label:"Date de l'accord",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE MÉCÉNAT</h1><p>Entre la société <strong>{{nom_mecene}}</strong> (le Mécène) et la fondation <strong>{{nom_fondation}}</strong> (le Bénéficiaire),</p><h2>ARTICLE 1 — OBJET</h2><p>Le Mécène consent un soutien de nature <strong>{{nature_mecenat}}</strong> d'une valeur de <strong>{{valeur}} FCFA</strong> à la Fondation, sans contrepartie directe.</p><h2>ARTICLE 2 — ABSENCE DE CONTREPARTIE COMMERCIALE</h2><p>Le présent accord ne constitue pas un contrat de prestations de services. Le Mécène ne bénéficie d'aucune contrepartie directe et proportionnelle à sa contribution.</p><h2>ARTICLE 3 — REÇU FISCAL</h2><p>La Fondation délivre au Mécène un reçu conforme à la réglementation fiscale en vigueur, permettant la déduction applicable.</p><h2>ARTICLE 4 — UTILISATION</h2><p>Le soutien est affecté exclusivement aux programmes de la Fondation, conformément à son objet statutaire.</p><p>Fait le {{date}}.</p></div>` },

  {
    code: 'fond_contrat_parrainage',
    name: "Contrat de parrainage (sponsoring associatif)",
    category: 'association',
    price: 3500, priceMax: 10500,
    description: "Contrat de sponsoring entre une fondation ou association et un parrain commercial, avec contreparties de visibilité définies.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'nom_association',label:"Nom de l'association ou fondation",type:'text',required:true},
      {key:'nom_parrain',label:"Nom du parrain / sponsor",type:'text',required:true},
      {key:'evenement',label:"Événement ou programme sponsorisé",type:'text',required:true},
      {key:'montant',label:"Montant du parrainage (FCFA)",type:'text',required:true},
      {key:'date',label:"Date du contrat",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE PARRAINAGE (SPONSORING)</h1><p>Entre <strong>{{nom_association}}</strong> (l'Organisation) et <strong>{{nom_parrain}}</strong> (le Parrain),</p><h2>ARTICLE 1 — OBJET</h2><p>Le Parrain s'engage à soutenir financièrement <strong>{{evenement}}</strong> organisé par l'Organisation, pour un montant de <strong>{{montant}} FCFA</strong>.</p><h2>ARTICLE 2 — CONTREPARTIES</h2><p>En contrepartie du parrainage, l'Organisation assure au Parrain une visibilité définie dans le document de contreparties annexé (logo, mentions, stands, etc.).</p><h2>ARTICLE 3 — PAIEMENT</h2><p>Le montant du parrainage est versé selon l'échéancier défini en annexe.</p><h2>ARTICLE 4 — RÉSILIATION</h2><p>En cas d'annulation de l'événement pour cause de force majeure, les modalités de remboursement ou de report sont définies d'un commun accord.</p><p>Signé le {{date}}.</p></div>` },

  {
    code: 'fond_accord_don_affecte',
    name: "Accord de don affecté",
    category: 'association',
    price: 3000, priceMax: 9000,
    description: "Convention de don dont l'utilisation est strictement affectée à un programme ou projet spécifique de la fondation.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 73,
    fieldsJson: F([
      {key:'nom_donateur',label:"Nom du donateur",type:'text',required:true},
      {key:'nom_fondation',label:"Nom de la fondation",type:'text',required:true},
      {key:'montant_don',label:"Montant du don (FCFA)",type:'text',required:true},
      {key:'affectation',label:"Affectation précise du don",type:'textarea',required:true},
      {key:'date',label:"Date de l'accord",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE DON AFFECTÉ</h1><p>Entre <strong>{{nom_donateur}}</strong> (le Donateur) et la fondation <strong>{{nom_fondation}}</strong> (le Bénéficiaire),</p><h2>ARTICLE 1 — DON</h2><p>Le Donateur effectue un don de <strong>{{montant_don}} FCFA</strong> au bénéfice de la Fondation.</p><h2>ARTICLE 2 — AFFECTATION</h2><p>Le don est strictement affecté à : {{affectation}}. La Fondation s'interdit d'utiliser les fonds à toute autre fin sans accord écrit préalable du Donateur.</p><h2>ARTICLE 3 — RAPPORT D'UTILISATION</h2><p>La Fondation s'engage à remettre au Donateur un rapport d'utilisation des fonds dans les douze mois suivant le versement.</p><h2>ARTICLE 4 — RESTITUTION</h2><p>En cas de non-réalisation du projet, les fonds non utilisés seront restitués au Donateur ou réaffectés selon son instruction écrite.</p><p>Fait le {{date}}.</p></div>` },

  {
    code: 'fond_rapport_utilisation_don',
    name: "Rapport d'utilisation du don",
    category: 'association',
    price: 2500, priceMax: 7500,
    description: "Rapport détaillant l'utilisation des fonds d'un don par une fondation, remis au donateur pour rendre compte des résultats.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 80,
    fieldsJson: F([
      {key:'nom_fondation',label:"Nom de la fondation",type:'text',required:true},
      {key:'nom_donateur',label:"Nom du donateur",type:'text',required:true},
      {key:'montant_don',label:"Montant du don (FCFA)",type:'text',required:true},
      {key:'utilisation',label:"Utilisation détaillée des fonds",type:'textarea',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>RAPPORT D'UTILISATION DU DON</h1><p>Cher(ère) <strong>{{nom_donateur}}</strong>,</p><p>La fondation <strong>{{nom_fondation}}</strong> vous adresse le présent rapport en date du {{date_rapport}}, relatif à l'utilisation de votre don de <strong>{{montant_don}} FCFA</strong>.</p><h2>I. UTILISATION DES FONDS</h2><p>{{utilisation}}</p><h2>II. RÉSULTATS OBTENUS</h2><p>Grâce à votre générosité, les bénéficiaires ont pu bénéficier des actions décrites ci-dessus. Les principaux résultats et témoignages sont présentés en annexe.</p><h2>III. SOLDE DES FONDS</h2><p>Le tableau de suivi budgétaire joint précise le montant utilisé, les dépenses engagées et le solde éventuel.</p><h2>REMERCIEMENTS</h2><p>Nous vous remercions sincèrement pour votre soutien qui contribue directement à notre mission.</p></div>` },

  {
    code: 'fond_plan_pluriannuel',
    name: "Plan pluriannuel fondation",
    category: 'association',
    price: 6000, priceMax: 18000,
    description: "Plan stratégique pluriannuel d'une fondation couvrant ses programmes, ressources et objectifs d'impact sur plusieurs années.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 57,
    fieldsJson: F([
      {key:'nom_fondation',label:"Nom de la fondation",type:'text',required:true},
      {key:'periode',label:"Période du plan (ex. 2025-2029)",type:'text',required:true},
      {key:'mission',label:"Mission de la fondation",type:'textarea',required:true},
      {key:'programmes',label:"Programmes prioritaires",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>PLAN STRATÉGIQUE PLURIANNUEL {{periode}} — {{nom_fondation}}</h1><h2>I. MISSION</h2><p>{{mission}}</p><h2>II. PROGRAMMES PRIORITAIRES</h2><p>{{programmes}}</p><h2>III. OBJECTIFS D'IMPACT</h2><p>Pour chaque programme, des indicateurs d'impact, des cibles chiffrées et des méthodes d'évaluation sont définis dans les fiches de programme annexées.</p><h2>IV. RESSOURCES</h2><p>Le plan financier pluriannuel prévoit la mobilisation de ressources issues de la dotation, des donations, du mécénat et des partenaires institutionnels.</p><h2>V. GOUVERNANCE ET SUIVI</h2><p>Le conseil d'administration examine la mise en œuvre du plan à chaque réunion semestrielle et en rend compte dans le rapport annuel.</p></div>` },

  {
    code: 'fond_accord_cooperation_ong',
    name: "Accord de coopération fondation-ONG",
    category: 'association',
    price: 4000, priceMax: 12000,
    description: "Convention de coopération entre une fondation et une ONG pour la mise en œuvre conjointe de projets humanitaires ou de développement.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'nom_fondation',label:"Nom de la fondation",type:'text',required:true},
      {key:'nom_ong',label:"Nom de l'ONG",type:'text',required:true},
      {key:'objet',label:"Objet de la coopération",type:'textarea',required:true},
      {key:'date',label:"Date de l'accord",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE COOPÉRATION FONDATION — ONG</h1><p>Entre la fondation <strong>{{nom_fondation}}</strong> et l'ONG <strong>{{nom_ong}}</strong>,</p><h2>ARTICLE 1 — OBJET</h2><p>{{objet}}</p><h2>ARTICLE 2 — PRINCIPES DE COOPÉRATION</h2><p>Les parties s'engagent à coopérer dans un esprit de transparence, d'égalité, de respect mutuel et de complémentarité des expertises.</p><h2>ARTICLE 3 — RÔLES</h2><p>Les rôles, responsabilités et contributions de chaque partie sont définis dans le plan de travail conjoint annexé.</p><h2>ARTICLE 4 — PROPRIÉTÉ INTELLECTUELLE</h2><p>Les produits et connaissances développés conjointement dans le cadre du présent accord appartiennent aux deux parties et sont partagés librement.</p><p>Signé le {{date}}.</p></div>` },

  {
    code: 'fond_contrat_conseil_philanthropique',
    name: "Contrat de service de conseil philanthropique",
    category: 'association',
    price: 5000, priceMax: 15000,
    description: "Contrat de prestation de conseil philanthropique et stratégique fourni à une fondation par un cabinet spécialisé.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 49,
    fieldsJson: F([
      {key:'nom_fondation',label:"Nom de la fondation cliente",type:'text',required:true},
      {key:'nom_cabinet',label:"Cabinet de conseil",type:'text',required:true},
      {key:'mission',label:"Périmètre de la mission de conseil",type:'textarea',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true},
      {key:'date',label:"Date du contrat",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE CONSEIL PHILANTHROPIQUE</h1><p>Entre la fondation <strong>{{nom_fondation}}</strong> (la Cliente) et le cabinet <strong>{{nom_cabinet}}</strong> (le Conseil),</p><h2>ARTICLE 1 — MISSION</h2><p>{{mission}}</p><h2>ARTICLE 2 — HONORAIRES</h2><p>Les honoraires convenus sont de {{honoraires}} FCFA, payables selon l'échéancier annexé.</p><h2>ARTICLE 3 — LIVRABLES</h2><p>Le Conseil remet les livrables convenus aux dates et selon les spécifications définies dans les termes de référence joints.</p><h2>ARTICLE 4 — INDÉPENDANCE</h2><p>Le Conseil exerce sa mission de manière indépendante et ne peut représenter d'autres clients dont les intérêts seraient en conflit avec ceux de la Cliente.</p><p>Signé le {{date}}.</p></div>` },

  {
    code: 'fond_accord_endowment',
    name: "Accord de fonds de dotation (endowment)",
    category: 'association',
    price: 7000, priceMax: 21000,
    description: "Convention de constitution et gestion d'un fonds de dotation permanente dont seuls les revenus financent les activités de la fondation.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 44,
    fieldsJson: F([
      {key:'nom_fondation',label:"Nom de la fondation",type:'text',required:true},
      {key:'gestionnaire',label:"Institution gestionnaire du fonds",type:'text',required:true},
      {key:'montant_initial',label:"Montant initial du fonds (FCFA)",type:'text',required:true},
      {key:'politique_investissement',label:"Politique d'investissement",type:'textarea',required:true},
      {key:'date',label:"Date de l'accord",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE FONDS DE DOTATION (ENDOWMENT)</h1><p>Entre la fondation <strong>{{nom_fondation}}</strong> (la Fondation) et <strong>{{gestionnaire}}</strong> (le Gestionnaire),</p><h2>ARTICLE 1 — CONSTITUTION DU FONDS</h2><p>La Fondation confie au Gestionnaire la gestion d'un fonds de dotation d'un montant initial de <strong>{{montant_initial}} FCFA</strong>.</p><h2>ARTICLE 2 — POLITIQUE D'INVESTISSEMENT</h2><p>{{politique_investissement}}</p><h2>ARTICLE 3 — UTILISATION DES REVENUS</h2><p>Seuls les revenus et produits du fonds sont distribués à la Fondation pour financer ses programmes. Le capital est préservé en permanence.</p><h2>ARTICLE 4 — RAPPORTAGE</h2><p>Le Gestionnaire remet à la Fondation un rapport trimestriel sur la performance et la composition du portefeuille.</p><p>Signé le {{date}}.</p></div>` },

  {
    code: 'fond_accord_fiscal_sponsorship',
    name: "Accord de fondation abritante (fiscal sponsorship)",
    category: 'association',
    price: 5000, priceMax: 15000,
    description: "Convention par laquelle une fondation reconnue accueille fiscalement un projet ou une initiative ne disposant pas de statut juridique propre.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 40,
    fieldsJson: F([
      {key:'nom_fondation',label:"Nom de la fondation abritante",type:'text',required:true},
      {key:'nom_projet',label:"Nom du projet abrité",type:'text',required:true},
      {key:'responsable_projet',label:"Responsable du projet",type:'text',required:true},
      {key:'date',label:"Date de l'accord",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE FONDATION ABRITANTE (FISCAL SPONSORSHIP)</h1><p>Entre la fondation <strong>{{nom_fondation}}</strong> (la Fondation Abritante) et <strong>{{responsable_projet}}</strong>, porteur du projet <strong>{{nom_projet}}</strong> (le Projet),</p><h2>ARTICLE 1 — OBJET</h2><p>La Fondation Abritante accepte d'accueillir le Projet sous son égide, lui permettant de bénéficier de son statut juridique et fiscal pour collecter des fonds et recevoir des dons.</p><h2>ARTICLE 2 — GESTION DES FONDS</h2><p>Les fonds collectés au nom du Projet sont gérés dans un compte séparé par la Fondation et décaissés au profit du Projet selon les procédures définies en annexe.</p><h2>ARTICLE 3 — FRAIS DE GESTION</h2><p>La Fondation perçoit des frais de gestion définis en annexe, en contrepartie de ses services d'hébergement fiscal.</p><h2>ARTICLE 4 — FIN DE L'ACCORD</h2><p>L'accord prend fin lorsque le Projet acquiert son propre statut juridique ou en cas de cessation d'activité.</p><p>Signé le {{date}}.</p></div>` },

  {
    code: 'fond_rapport_impact_social',
    name: "Rapport d'impact social fondation",
    category: 'association',
    price: 5000, priceMax: 14000,
    description: "Rapport mesurant et communicant l'impact social et les résultats obtenus par une fondation auprès de ses bénéficiaires.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 76,
    fieldsJson: F([
      {key:'nom_fondation',label:"Nom de la fondation",type:'text',required:true},
      {key:'periode',label:"Période couverte",type:'text',required:true},
      {key:'nb_beneficiaires',label:"Nombre de bénéficiaires",type:'text',required:true},
      {key:'resultats',label:"Principaux résultats et impacts obtenus",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>RAPPORT D'IMPACT SOCIAL {{periode}} — {{nom_fondation}}</h1><h2>I. INTRODUCTION</h2><p>La fondation {{nom_fondation}} publie ce rapport pour rendre compte de l'impact de ses actions sur la période {{periode}}.</p><h2>II. BÉNÉFICIAIRES</h2><p>Nombre de personnes directement bénéficiaires sur la période : <strong>{{nb_beneficiaires}}</strong>.</p><h2>III. RÉSULTATS ET IMPACTS</h2><p>{{resultats}}</p><h2>IV. TÉMOIGNAGES</h2><p>Des témoignages sélectionnés de bénéficiaires illustrent les changements observés dans leur vie quotidienne grâce aux programmes de la fondation.</p><h2>V. PERSPECTIVES</h2><p>Fort de ces résultats, la fondation s'engage à amplifier ses actions dans les domaines identifiés comme prioritaires pour la prochaine période.</p></div>` },

  {
    code: 'fond_accord_bourses_etudes',
    name: "Accord de bourses d'études fondation",
    category: 'association',
    price: 3500, priceMax: 10500,
    description: "Convention d'attribution d'une bourse d'études entre une fondation et un étudiant bénéficiaire, avec conditions et obligations.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 84,
    fieldsJson: F([
      {key:'nom_fondation',label:"Nom de la fondation",type:'text',required:true},
      {key:'nom_etudiant',label:"Nom et prénoms de l'étudiant",type:'text',required:true},
      {key:'etablissement',label:"Établissement d'enseignement",type:'text',required:true},
      {key:'montant_bourse',label:"Montant annuel de la bourse (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début de la bourse",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CONVENTION DE BOURSE D'ÉTUDES</h1><p>Entre la fondation <strong>{{nom_fondation}}</strong> (la Fondation) et l'étudiant(e) <strong>{{nom_etudiant}}</strong> (le/la Boursier(ère)),</p><h2>ARTICLE 1 — OBJET</h2><p>La Fondation attribue au/à la Boursier(ère) une bourse d'études d'un montant annuel de <strong>{{montant_bourse}} FCFA</strong>, pour la poursuite de ses études à {{etablissement}}.</p><h2>ARTICLE 2 — CONDITIONS DE MAINTIEN</h2><p>La bourse est renouvelable annuellement sous condition de résultats académiques satisfaisants, d'assiduité et de conduite irréprochable, attestés par {{etablissement}}.</p><h2>ARTICLE 3 — OBLIGATIONS DU BOURSIER</h2><p>Le/la Boursier(ère) s'engage à informer la Fondation de tout changement de cursus, d'établissement ou de situation personnelle susceptible d'affecter son éligibilité.</p><h2>ARTICLE 4 — RESTITUTION</h2><p>En cas de fausse déclaration ou de manquement grave aux obligations, la Fondation peut mettre fin à la bourse et demander restitution des sommes versées.</p><p>Signé le {{date_debut}}.</p></div>` },

  {
    code: 'fond_contrat_volontariat',
    name: "Contrat de programme de volontariat fondation",
    category: 'association',
    price: 2500, priceMax: 7500,
    description: "Contrat d'engagement de volontariat entre une fondation et un volontaire, précisant missions, droits et obligations.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 79,
    fieldsJson: F([
      {key:'nom_fondation',label:"Nom de la fondation",type:'text',required:true},
      {key:'nom_volontaire',label:"Nom et prénoms du volontaire",type:'text',required:true},
      {key:'mission',label:"Mission de volontariat",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE VOLONTARIAT</h1><p>Entre la fondation <strong>{{nom_fondation}}</strong> et <strong>{{nom_volontaire}}</strong> (le/la Volontaire),</p><h2>ARTICLE 1 — ENGAGEMENT</h2><p>Le/la Volontaire s'engage à réaliser bénévolement la mission suivante pour la Fondation :</p><p>{{mission}}</p><h2>ARTICLE 2 — DURÉE</h2><p>Le présent engagement prend effet le {{date_debut}}. Sa durée est précisée dans la fiche de mission annexée.</p><h2>ARTICLE 3 — CONDITIONS</h2><p>Le/la Volontaire bénéficie d'une couverture d'assurance accidents fournie par la Fondation et du remboursement des frais engagés dans l'exercice de sa mission, sur présentation de justificatifs.</p><h2>ARTICLE 4 — CONFIDENTIALITÉ</h2><p>Le/la Volontaire s'engage à respecter la confidentialité des informations auxquelles il/elle a accès dans le cadre de sa mission.</p></div>` },

  {
    code: 'fond_convention_academique',
    name: "Convention de collaboration académique fondation",
    category: 'association',
    price: 4000, priceMax: 12000,
    description: "Convention de coopération entre une fondation et une université ou institution de recherche pour des projets communs.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 53,
    fieldsJson: F([
      {key:'nom_fondation',label:"Nom de la fondation",type:'text',required:true},
      {key:'nom_institution',label:"Nom de l'institution académique",type:'text',required:true},
      {key:'domaine',label:"Domaine de collaboration",type:'text',required:true},
      {key:'date',label:"Date de la convention",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CONVENTION DE COLLABORATION ACADÉMIQUE</h1><p>Entre la fondation <strong>{{nom_fondation}}</strong> et <strong>{{nom_institution}}</strong>,</p><h2>ARTICLE 1 — OBJET</h2><p>Les parties conviennent de collaborer dans le domaine de <strong>{{domaine}}</strong> en vue de produire des connaissances, former des compétences et innover au service des bénéficiaires de la fondation.</p><h2>ARTICLE 2 — ACTIVITÉS CONJOINTES</h2><p>La collaboration peut inclure des programmes de recherche, des publications conjointes, des formations et des échanges d'experts, selon le plan de travail annexé.</p><h2>ARTICLE 3 — PROPRIÉTÉ INTELLECTUELLE</h2><p>Les droits sur les travaux et publications issus de la collaboration appartiennent conjointement aux deux parties selon les modalités définies en annexe.</p><p>Signé le {{date}}.</p></div>` },

  {
    code: 'fond_accord_prix_excellence',
    name: "Accord de prix d'excellence fondation",
    category: 'association',
    price: 3000, priceMax: 9000,
    description: "Convention par laquelle une fondation institue et organise un prix d'excellence dans son domaine d'intervention.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'nom_fondation',label:"Nom de la fondation",type:'text',required:true},
      {key:'nom_prix',label:"Intitulé du prix d'excellence",type:'text',required:true},
      {key:'domaine',label:"Domaine récompensé",type:'text',required:true},
      {key:'valeur_prix',label:"Valeur du prix (FCFA)",type:'text',required:true},
      {key:'date',label:"Date de l'accord",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD D'INSTITUTION DU {{nom_prix}}</h1><p>La fondation <strong>{{nom_fondation}}</strong>, le {{date}}, institue le prix d'excellence dénommé <strong>{{nom_prix}}</strong>.</p><h2>I. DOMAINE RÉCOMPENSÉ</h2><p>Le prix récompense l'excellence dans le domaine de <strong>{{domaine}}</strong>, en cohérence avec la mission de la fondation.</p><h2>II. VALEUR ET NATURE DU PRIX</h2><p>Le prix est d'une valeur de <strong>{{valeur_prix}} FCFA</strong> et peut inclure une dotation financière, un trophée et une médaille d'honneur.</p><h2>III. ORGANISATION</h2><p>La fondation est responsable de la promotion, de la collecte des candidatures, de la sélection par un jury indépendant et de la cérémonie de remise du prix.</p><h2>IV. PÉRENNITÉ</h2><p>Le prix est reconduit annuellement, sauf décision contraire du conseil d'administration de la fondation.</p></div>` },

  {
    code: 'fond_rapport_communication',
    name: "Rapport de communication fondation",
    category: 'association',
    price: 3000, priceMax: 9000,
    description: "Rapport annuel de communication d'une fondation présentant ses actions de visibilité, ses publications et son rayonnement.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 56,
    fieldsJson: F([
      {key:'nom_fondation',label:"Nom de la fondation",type:'text',required:true},
      {key:'exercice',label:"Exercice",type:'text',required:true},
      {key:'responsable_com',label:"Responsable communication",type:'text',required:true},
      {key:'actions',label:"Actions de communication réalisées",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>RAPPORT DE COMMUNICATION {{exercice}} — {{nom_fondation}}</h1><p>Préparé par : {{responsable_com}}</p><h2>I. ACTIONS DE COMMUNICATION</h2><p>{{actions}}</p><h2>II. PRÉSENCE DIGITALE</h2><p>Le rapport présente les statistiques de présence sur les réseaux sociaux, le site web et les newsletters, ainsi que l'évolution de l'audience sur l'exercice.</p><h2>III. ÉVÉNEMENTS ET PRISE DE PAROLE</h2><p>La fondation a participé aux forums, conférences et cérémonies détaillés en annexe, renforçant ainsi sa visibilité et son réseau.</p><h2>IV. PERSPECTIVES</h2><p>Le plan de communication de l'exercice suivant vise à accroître la notoriété de la fondation et à amplifier son message auprès de nouveaux publics.</p></div>` },

  {
    code: 'fond_accord_collectivite',
    name: "Accord de partenariat fondation-collectivité",
    category: 'association',
    price: 4500, priceMax: 13500,
    description: "Convention de partenariat entre une fondation et une collectivité territoriale pour le financement et la mise en œuvre de projets locaux.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 61,
    fieldsJson: F([
      {key:'nom_fondation',label:"Nom de la fondation",type:'text',required:true},
      {key:'nom_collectivite',label:"Nom de la collectivité",type:'text',required:true},
      {key:'projet',label:"Projet ou programme commun",type:'textarea',required:true},
      {key:'date',label:"Date de l'accord",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT FONDATION — COLLECTIVITÉ TERRITORIALE</h1><p>Entre la fondation <strong>{{nom_fondation}}</strong> et la collectivité territoriale <strong>{{nom_collectivite}}</strong>,</p><h2>ARTICLE 1 — PROJET COMMUN</h2><p>{{projet}}</p><h2>ARTICLE 2 — CONTRIBUTIONS RESPECTIVES</h2><p>Les contributions financières, techniques et en nature de chaque partie sont détaillées dans le plan de financement annexé.</p><h2>ARTICLE 3 — GOUVERNANCE DU PROJET</h2><p>Un comité de pilotage paritaire se réunit trimestriellement pour suivre l'avancement du projet et prendre les décisions nécessaires.</p><h2>ARTICLE 4 — DURÉE</h2><p>Le présent accord est conclu pour la durée du projet, avec possibilité de renouvellement par accord exprès des parties.</p><p>Signé le {{date}}.</p></div>` },

  {
    code: 'fond_contrat_gala',
    name: "Contrat d'événement de levée de fonds (gala)",
    category: 'association',
    price: 4000, priceMax: 12000,
    description: "Contrat d'organisation d'un gala ou événement de collecte de fonds pour le compte d'une fondation, avec prestataire événementiel.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'nom_fondation',label:"Nom de la fondation",type:'text',required:true},
      {key:'nom_prestataire',label:"Prestataire événementiel",type:'text',required:true},
      {key:'date_evenement',label:"Date de l'événement",type:'date',required:true},
      {key:'lieu',label:"Lieu de l'événement",type:'text',required:true},
      {key:'budget',label:"Budget de l'événement (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT D'ORGANISATION DE GALA DE LEVÉE DE FONDS</h1><p>Entre la fondation <strong>{{nom_fondation}}</strong> (l'Organisatrice) et <strong>{{nom_prestataire}}</strong> (le Prestataire),</p><h2>ARTICLE 1 — OBJET</h2><p>Le Prestataire est mandaté pour organiser le gala de levée de fonds de la Fondation prévu le {{date_evenement}} au lieu suivant : {{lieu}}.</p><h2>ARTICLE 2 — BUDGET</h2><p>Le budget global de l'événement est fixé à {{budget}} FCFA. Tout dépassement doit être approuvé par la Fondation avant engagement.</p><h2>ARTICLE 3 — PRESTATIONS</h2><p>Le Prestataire assure la logistique, le traiteur, la décoration, la sonorisation, la sécurité et la coordination générale de l'événement selon le cahier des charges annexé.</p><h2>ARTICLE 4 — RECETTES</h2><p>L'intégralité des recettes de l'événement (billets, enchères, dons) est collectée et gérée par la Fondation.</p></div>` },

  {
    code: 'fond_rapport_evaluation_beneficiaires',
    name: "Rapport d'évaluation des bénéficiaires",
    category: 'association',
    price: 4000, priceMax: 12000,
    description: "Rapport d'évaluation externe ou interne des résultats obtenus par les bénéficiaires des programmes d'une fondation.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 66,
    fieldsJson: F([
      {key:'nom_fondation',label:"Nom de la fondation",type:'text',required:true},
      {key:'programme',label:"Programme évalué",type:'text',required:true},
      {key:'evaluateur',label:"Évaluateur ou cabinet",type:'text',required:true},
      {key:'periode',label:"Période d'évaluation",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>RAPPORT D'ÉVALUATION DES BÉNÉFICIAIRES</h1><h2>Programme : {{programme}}</h2><h2>Fondation : {{nom_fondation}}</h2><p>Rapport préparé par <strong>{{evaluateur}}</strong>, pour la période {{periode}}, le {{date_rapport}}.</p><h2>I. MÉTHODOLOGIE</h2><p>L'évaluation a été conduite à travers des enquêtes de terrain, des entretiens individuels et des focus groups avec les bénéficiaires, selon une approche participative.</p><h2>II. PROFIL DES BÉNÉFICIAIRES</h2><p>Les données socio-démographiques et le niveau de vie initial des bénéficiaires sont présentés dans les tableaux annexés.</p><h2>III. RÉSULTATS</h2><p>Les indicateurs de changement positif observés chez les bénéficiaires sont détaillés par thématique et comparés aux cibles initiales du programme.</p><h2>IV. RECOMMANDATIONS</h2><p>Sur la base des résultats, l'évaluateur formule des recommandations pour améliorer l'efficacité et l'impact des futurs cycles du programme.</p></div>` },

  {
    code: 'fond_charte_gouvernance',
    name: "Charte de gouvernance de fondation",
    category: 'association',
    price: 5000, priceMax: 15000,
    description: "Charte définissant les principes, organes, rôles et responsabilités de gouvernance d'une fondation d'utilité publique.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 71,
    fieldsJson: F([
      {key:'nom_fondation',label:"Nom de la fondation",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption de la charte",type:'date',required:true},
      {key:'composition_ca',label:"Composition du conseil d'administration",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>CHARTE DE GOUVERNANCE — {{nom_fondation}}</h1><p>Adoptée le {{date_adoption}},</p><h2>I. PRINCIPES DE GOUVERNANCE</h2><p>La fondation {{nom_fondation}} adhère aux principes de transparence, d'imputabilité, de participation, d'équité et d'efficacité dans sa gouvernance.</p><h2>II. ORGANES DE GOUVERNANCE</h2><p><strong>Conseil d'Administration :</strong></p><p>{{composition_ca}}</p><p>Le conseil d'administration est l'organe suprême de la fondation. Il définit la stratégie, approuve les budgets, supervise la direction et rend compte aux parties prenantes.</p><h2>III. COMITÉS SPÉCIALISÉS</h2><p>Le conseil peut constituer des comités spécialisés (audit, nomination, programmes) dont les attributions sont définies par voie de résolution.</p><h2>IV. CONFLITS D'INTÉRÊTS</h2><p>Tout membre du conseil doit déclarer ses conflits d'intérêts potentiels et s'abstenir de voter sur les décisions concernées.</p><h2>V. REDDITION DE COMPTES</h2><p>La fondation publie annuellement son rapport d'activités et ses états financiers certifiés, accessibles à toutes les parties prenantes.</p></div>` },
];

async function main() {
  let created = 0, updated = 0;
  for (const t of templates) {
    const ex = await prisma.documentTemplate.findUnique({ where: { code: t.code } });
    await prisma.documentTemplate.upsert({ where: { code: t.code }, update: t, create: t });
    if (ex) updated++; else created++;
  }
  const total = await prisma.documentTemplate.count();
  console.log(`Batch 48a OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
