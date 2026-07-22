import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ─── 25 templates RSE/Gouvernance (gov2_, juridique_admin) ───
  {
    code: 'gov2_charte_gouvernance', name: "Charte de gouvernance d'entreprise", category: 'juridique_admin',
    price: 9000, priceMax: 27000, description: "Charte definissant les principes de gouvernance d'entreprise conformes aux standards OHADA et aux meilleures pratiques africaines.", templateType: 'pdf', classe: 'A', active: true, popularity: 78,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale de l'entreprise",type:'text',required:true},
      {key:'siege_social',label:"Siege social",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption de la charte",type:'date',required:true},
      {key:'president_conseil',label:"President du conseil d'administration",type:'text',required:true},
      {key:'nombre_administrateurs',label:"Nombre d'administrateurs",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CHARTE DE GOUVERNANCE D'ENTREPRISE</h1><p>La societe <strong>{{raison_sociale}}</strong>, dont le siege social est etabli a <strong>{{siege_social}}</strong>, adopte la presente charte de gouvernance en date du <strong>{{date_adoption}}</strong>.</p><h2>Article 1 — Objet</h2><p>La presente charte definit les regles et principes de gouvernance applicables au sein de la societe, en conformite avec les dispositions de l'Acte uniforme OHADA relatif au droit des societes commerciales et du groupement d'interet economique.</p><h2>Article 2 — Composition du conseil</h2><p>Le conseil d'administration est compose de <strong>{{nombre_administrateurs}}</strong> membres, sous la presidence de <strong>{{president_conseil}}</strong>.</p><h2>Article 3 — Principes fondamentaux</h2><p>La gouvernance de la societe repose sur les principes de transparence, de responsabilite, d'equite et de redevabilite envers l'ensemble des parties prenantes.</p><h2>Article 4 — Entree en vigueur</h2><p>La presente charte entre en vigueur a compter de sa date d'adoption et s'impose a tous les organes de direction et d'administration.</p></div>`
  },
  {
    code: 'gov2_reglement_conseil_admin', name: "Reglement interieur du conseil d'administration", category: 'juridique_admin',
    price: 8500, priceMax: 25500, description: "Reglement interieur fixant les modalites de fonctionnement du conseil d'administration selon le droit OHADA.", templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'date_reglement',label:"Date du reglement",type:'date',required:true},
      {key:'frequence_reunions',label:"Frequence des reunions (ex: trimestrielle)",type:'text',required:true},
      {key:'quorum',label:"Quorum requis (ex: majorite simple)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>REGLEMENT INTERIEUR DU CONSEIL D'ADMINISTRATION</h1><p>Adopte par le conseil d'administration de <strong>{{raison_sociale}}</strong> en date du <strong>{{date_reglement}}</strong>.</p><h2>Article 1 — Objet</h2><p>Le present reglement interieur a pour objet de preciser et de completer les statuts de la societe en ce qui concerne l'organisation et le fonctionnement du conseil d'administration.</p><h2>Article 2 — Reunions</h2><p>Le conseil se reunit a frequence <strong>{{frequence_reunions}}</strong>. Les reunions sont convoquees par le president avec un preavis minimum de quinze (15) jours.</p><h2>Article 3 — Quorum et votes</h2><p>Le quorum est fixe a <strong>{{quorum}}</strong> des membres en exercice. Les decisions sont prises a la majorite des membres presents ou representes.</p><h2>Article 4 — Confidentialite</h2><p>Les administrateurs sont tenus a une obligation stricte de confidentialite concernant les deliberations et informations portees a leur connaissance.</p></div>`
  },
  {
    code: 'gov2_charte_comite_audit', name: "Charte du comite d'audit", category: 'juridique_admin',
    price: 7500, priceMax: 22500, description: "Charte encadrant les missions et le fonctionnement du comite d'audit au sein des entreprises africaines.", templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'composition_comite',label:"Composition du comite d'audit",type:'text',required:true},
      {key:'president_comite',label:"President du comite",type:'text',required:true},
      {key:'date_charte',label:"Date d'adoption",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CHARTE DU COMITE D'AUDIT</h1><p>La presente charte regit le fonctionnement du comite d'audit de <strong>{{raison_sociale}}</strong>, adoptee le <strong>{{date_charte}}</strong>.</p><h2>Article 1 — Mission</h2><p>Le comite d'audit assiste le conseil d'administration dans le controle de l'information financiere, de l'efficacite des systemes de controle interne et de la mission des commissaires aux comptes.</p><h2>Article 2 — Composition</h2><p>Le comite est compose de <strong>{{composition_comite}}</strong> membres, sous la presidence de <strong>{{president_comite}}</strong>. La majorite des membres doivent etre des administrateurs independants.</p><h2>Article 3 — Attributions</h2><p>Le comite examine les comptes sociaux et consolides, evalue les risques significatifs et veille au respect des normes comptables SYSCOHADA.</p><h2>Article 4 — Compte rendu</h2><p>Le president du comite rend compte au conseil d'administration de ses travaux lors de chaque reunion du conseil.</p></div>`
  },
  {
    code: 'gov2_charte_comite_risques', name: "Charte du comite des risques", category: 'juridique_admin',
    price: 7500, priceMax: 22500, description: "Charte definissant le mandat et le fonctionnement du comite des risques d'une entreprise africaine.", templateType: 'pdf', classe: 'A', active: true, popularity: 61,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'membres_comite',label:"Membres du comite des risques",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true},
      {key:'secteur_activite',label:"Secteur d'activite",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CHARTE DU COMITE DES RISQUES</h1><p>Adoptee par le conseil d'administration de <strong>{{raison_sociale}}</strong> (<strong>{{secteur_activite}}</strong>) le <strong>{{date_adoption}}</strong>.</p><h2>Article 1 — Objet</h2><p>Le comite des risques a pour mission d'assister le conseil d'administration dans l'identification, l'evaluation et la maitrise des risques auxquels la societe est exposee.</p><h2>Article 2 — Composition</h2><p>Le comite est compose de : <strong>{{membres_comite}}</strong>. Il se reunit au minimum deux fois par an.</p><h2>Article 3 — Missions</h2><p>Le comite evalue la politique de gestion des risques, veille a la mise en oeuvre d'un dispositif de controle interne efficace et s'assure de la conformite reglementaire dans l'espace OHADA.</p><h2>Article 4 — Rapports</h2><p>Le comite soumet un rapport annuel au conseil d'administration sur l'etat des risques identifies et les mesures de mitigation adoptees.</p></div>`
  },
  {
    code: 'gov2_charte_comite_nominations', name: "Charte du comite des nominations et remunerations", category: 'juridique_admin',
    price: 7000, priceMax: 21000, description: "Charte regissant le comite des nominations et remunerations pour une gouvernance transparente des dirigeants.", templateType: 'pdf', classe: 'A', active: true, popularity: 58,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'president_comite',label:"President du comite",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true},
      {key:'nombre_membres',label:"Nombre de membres",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CHARTE DU COMITE DES NOMINATIONS ET REMUNERATIONS</h1><p>Adoptee par <strong>{{raison_sociale}}</strong> le <strong>{{date_adoption}}</strong>, sous la presidence de <strong>{{president_comite}}</strong>.</p><h2>Article 1 — Mission</h2><p>Le comite des nominations et remunerations formule des recommandations au conseil d'administration sur la selection des dirigeants, la politique de remuneration et la gestion des talents.</p><h2>Article 2 — Composition</h2><p>Le comite comprend <strong>{{nombre_membres}}</strong> membres dont la majorite sont des administrateurs independants.</p><h2>Article 3 — Attributions remunerations</h2><p>Le comite propose les elements de remuneration des dirigeants mandataires sociaux en tenant compte des performances et des pratiques de marche en Afrique subsaharienne.</p><h2>Article 4 — Attributions nominations</h2><p>Le comite identifie et propose des candidats aux postes d'administrateurs en veillant a la diversite et a l'expertise du conseil.</p></div>`
  },
  {
    code: 'gov2_politique_remuneration_dirigeants', name: "Politique de remuneration des dirigeants (say on pay)", category: 'juridique_admin',
    price: 8000, priceMax: 24000, description: "Document de politique de remuneration des mandataires sociaux soumis au vote consultatif des actionnaires.", templateType: 'pdf', classe: 'A', active: true, popularity: 67,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'exercice',label:"Exercice concerne",type:'text',required:true},
      {key:'dg_nom',label:"Nom du Directeur General",type:'text',required:true},
      {key:'remuneration_fixe',label:"Remuneration fixe annuelle (FCFA)",type:'text',required:true},
      {key:'criteres_variable',label:"Criteres de la part variable",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>POLITIQUE DE REMUNERATION DES DIRIGEANTS — SAY ON PAY</h1><p>Exercice <strong>{{exercice}}</strong> — <strong>{{raison_sociale}}</strong></p><h2>1. Principe general</h2><p>La politique de remuneration des mandataires sociaux repose sur les principes d'equite interne, de competitivite externe et d'alignement sur la creation de valeur a long terme.</p><h2>2. Structure de la remuneration du Directeur General</h2><p>Le Directeur General, <strong>{{dg_nom}}</strong>, percoit une remuneration fixe annuelle de <strong>{{remuneration_fixe}}</strong> FCFA bruts.</p><h2>3. Part variable</h2><p>La part variable est determinee selon les criteres suivants : <strong>{{criteres_variable}}</strong>.</p><h2>4. Gouvernance</h2><p>La presente politique est soumise au vote consultatif de l'assemblee generale des actionnaires conformement aux recommandations de bonne gouvernance applicables dans l'espace OHADA.</p></div>`
  },
  {
    code: 'gov2_politique_independance_admin', name: "Politique d'independance des administrateurs", category: 'juridique_admin',
    price: 6500, priceMax: 19500, description: "Politique fixant les criteres d'independance des administrateurs au sein du conseil d'administration.", templateType: 'pdf', classe: 'A', active: true, popularity: 55,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true},
      {key:'seuil_independance',label:"Pourcentage d'administrateurs independants requis",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>POLITIQUE D'INDEPENDANCE DES ADMINISTRATEURS</h1><p>Adoptee par <strong>{{raison_sociale}}</strong> le <strong>{{date_adoption}}</strong>.</p><h2>Article 1 — Definition de l'independance</h2><p>Est considere comme independant, tout administrateur ne se trouvant pas dans une situation susceptible de compromettre l'exercice de sa liberte de jugement. Notamment, l'administrateur ne doit pas entretenir de relations d'affaires significatives avec la societe.</p><h2>Article 2 — Criteres d'independance</h2><p>Les criteres d'independance retenus sont : absence de mandat executif dans la societe depuis moins de cinq ans ; absence de relations commerciales significatives ; absence de lien familial avec les dirigeants.</p><h2>Article 3 — Proportion requise</h2><p>Le conseil d'administration doit comprendre au moins <strong>{{seuil_independance}}</strong> d'administrateurs independants.</p><h2>Article 4 — Evaluation annuelle</h2><p>L'independance de chaque administrateur est evaluee annuellement par le comite des nominations.</p></div>`
  },
  {
    code: 'gov2_politique_diversite_conseil', name: "Politique de diversite au conseil d'administration", category: 'juridique_admin',
    price: 6000, priceMax: 18000, description: "Politique promouvant la diversite de genre, d'expertise et de profil au sein du conseil d'administration.", templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'objectif_genre',label:"Objectif de representation du genre feminin",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true},
      {key:'horizon_objectif',label:"Horizon pour atteindre l'objectif (annee)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>POLITIQUE DE DIVERSITE AU CONSEIL D'ADMINISTRATION</h1><p><strong>{{raison_sociale}}</strong> — Adoptee le <strong>{{date_adoption}}</strong>.</p><h2>1. Engagement</h2><p>La societe s'engage a promouvoir la diversite au sein de son conseil d'administration, facteur reconnu de performance et de bonne gouvernance.</p><h2>2. Objectif de genre</h2><p>La societe vise une representation feminine d'au moins <strong>{{objectif_genre}}</strong> au sein du conseil d'administration d'ici <strong>{{horizon_objectif}}</strong>.</p><h2>3. Diversite des competences</h2><p>Le conseil veille a disposer de competences diversifiees couvrant notamment : la finance, le droit OHADA, les metiers de la societe, la gestion des risques et le developpement durable.</p><h2>4. Rapport annuel</h2><p>La composition du conseil et les progres vers les objectifs de diversite sont publies annuellement dans le rapport de gouvernance.</p></div>`
  },
  {
    code: 'gov2_gestion_conflits_interets', name: "Politique de gestion des conflits d'interets administrateurs", category: 'juridique_admin',
    price: 7000, priceMax: 21000, description: "Politique encadrant l'identification, la declaration et la gestion des conflits d'interets des administrateurs.", templateType: 'pdf', classe: 'A', active: true, popularity: 63,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true},
      {key:'organe_controle',label:"Organe de controle des conflits",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>POLITIQUE DE GESTION DES CONFLITS D'INTERETS — ADMINISTRATEURS</h1><p>Adoptee par <strong>{{raison_sociale}}</strong> le <strong>{{date_adoption}}</strong>.</p><h2>Article 1 — Definition</h2><p>Constitue un conflit d'interets toute situation dans laquelle un administrateur dispose d'un interet personnel susceptible d'influencer l'exercice impartial de ses fonctions.</p><h2>Article 2 — Declaration</h2><p>Tout administrateur ayant connaissance d'un conflit potentiel est tenu de le declarer au president du conseil avant la deliberation concernee et de s'abstenir de participer au vote.</p><h2>Article 3 — Registre</h2><p>L'organe de controle <strong>{{organe_controle}}</strong> tient un registre des conflits declares, accessible au commissaire aux comptes.</p><h2>Article 4 — Sanctions</h2><p>Tout manquement aux obligations de declaration constitue une faute de gestion engageant la responsabilite personnelle de l'administrateur concerne.</p></div>`
  },
  {
    code: 'gov2_dpef', name: "Declaration de performance extra-financiere (DPEF)", category: 'juridique_admin',
    price: 10000, priceMax: 30000, description: "Declaration de performance extra-financiere integrant les enjeux sociaux, environnementaux et de gouvernance de l'entreprise.", templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'exercice',label:"Exercice de reference",type:'text',required:true},
      {key:'effectif_total',label:"Effectif total",type:'text',required:true},
      {key:'chiffre_affaires',label:"Chiffre d'affaires (FCFA)",type:'text',required:true},
      {key:'responsable_rse',label:"Responsable RSE",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>DECLARATION DE PERFORMANCE EXTRA-FINANCIERE</h1><p><strong>{{raison_sociale}}</strong> — Exercice <strong>{{exercice}}</strong></p><h2>1. Presentation generale</h2><p>La societe emploie <strong>{{effectif_total}}</strong> collaborateurs et realise un chiffre d'affaires de <strong>{{chiffre_affaires}}</strong> FCFA. La politique RSE est coordonnee par <strong>{{responsable_rse}}</strong>.</p><h2>2. Volet social</h2><p>La societe s'engage en faveur de l'emploi local, de la formation professionnelle et de la sante et securite au travail de ses collaborateurs.</p><h2>3. Volet environnemental</h2><p>La societe mesure et reduit son empreinte carbone, optimise sa consommation d'eau et d'energie, et gere de maniere responsable ses dechets.</p><h2>4. Volet gouvernance</h2><p>La societe applique des regles de bonne gouvernance, lutte contre la corruption et respecte les droits de l'homme tout au long de sa chaine de valeur.</p></div>`
  },
  {
    code: 'gov2_rapport_rse', name: "Rapport RSE / developpement durable", category: 'juridique_admin',
    price: 10000, priceMax: 30000, description: "Rapport annuel de responsabilite societale et de developpement durable de l'entreprise africaine.", templateType: 'pdf', classe: 'A', active: true, popularity: 74,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'exercice',label:"Exercice",type:'text',required:true},
      {key:'pdg_nom',label:"Nom du PDG / Directeur General",type:'text',required:true},
      {key:'pays_operation',label:"Pays d'operation principaux",type:'text',required:true},
      {key:'engagements_phares',label:"Engagements RSE phares",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>RAPPORT RSE / DEVELOPPEMENT DURABLE</h1><p><strong>{{raison_sociale}}</strong> — Exercice <strong>{{exercice}}</strong></p><h2>Message du Directeur General</h2><p>Sous la direction de <strong>{{pdg_nom}}</strong>, <strong>{{raison_sociale}}</strong> presente ses engagements RSE pour l'exercice <strong>{{exercice}}</strong> dans ses pays d'operation : <strong>{{pays_operation}}</strong>.</p><h2>Engagements phares</h2><p><strong>{{engagements_phares}}</strong></p><h2>Performance environnementale</h2><p>La societe a engage des actions concretes de reduction de son empreinte environnementale, notamment par l'efficacite energetique et la gestion des dechets.</p><h2>Performance sociale</h2><p>La societe investit dans le developpement des competences locales, la parite et le bien-etre des collaborateurs.</p><h2>Performance de gouvernance</h2><p>La societe maintient des standards eleves de transparence, de lutte anti-corruption et de respect des droits humains.</p></div>`
  },
  {
    code: 'gov2_politique_environnementale', name: "Politique environnementale (empreinte carbone)", category: 'juridique_admin',
    price: 7000, priceMax: 21000, description: "Politique environnementale de l'entreprise incluant les objectifs de reduction de l'empreinte carbone.", templateType: 'pdf', classe: 'A', active: true, popularity: 62,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true},
      {key:'objectif_reduction',label:"Objectif de reduction des emissions (%)",type:'text',required:true},
      {key:'annee_reference',label:"Annee de reference (baseline)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>POLITIQUE ENVIRONNEMENTALE — EMPREINTE CARBONE</h1><p><strong>{{raison_sociale}}</strong> — Adoptee le <strong>{{date_adoption}}</strong>.</p><h2>1. Engagement</h2><p>La societe s'engage a reduire ses emissions de gaz a effet de serre de <strong>{{objectif_reduction}}</strong>% par rapport a l'annee de reference <strong>{{annee_reference}}</strong>.</p><h2>2. Perimetre</h2><p>La politique couvre les emissions directes (scope 1), les emissions indirectes liees a l'energie (scope 2), et dans la mesure du possible les emissions de la chaine de valeur (scope 3).</p><h2>3. Actions prioritaires</h2><p>Les actions prioritaires comprennent : l'efficacite energetique des batiments, la transition vers des vehicules moins emissifs, l'optimisation logistique et la sensibilisation des fournisseurs.</p><h2>4. Reporting</h2><p>Un bilan carbone annuel est realise et publie dans le rapport RSE de la societe.</p></div>`
  },
  {
    code: 'gov2_politique_sociale', name: "Politique sociale (bien-etre salaries)", category: 'juridique_admin',
    price: 6500, priceMax: 19500, description: "Politique sociale de l'entreprise couvrant le bien-etre, la sante et le developpement des salaries.", templateType: 'pdf', classe: 'A', active: true, popularity: 66,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true},
      {key:'drh_nom',label:"Directeur des ressources humaines",type:'text',required:true},
      {key:'budget_formation',label:"Budget annuel de formation (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>POLITIQUE SOCIALE — BIEN-ETRE DES SALARIES</h1><p><strong>{{raison_sociale}}</strong> — Adoptee le <strong>{{date_adoption}}</strong>, pilotee par <strong>{{drh_nom}}</strong>.</p><h2>1. Sante et securite</h2><p>La societe garantit un environnement de travail sain et securise, conforme au Code du Travail et aux conventions de l'OIT ratifiees dans l'espace OHADA.</p><h2>2. Formation et developpement</h2><p>Un budget annuel de <strong>{{budget_formation}}</strong> FCFA est alloue a la formation continue et au developpement des competences des collaborateurs.</p><h2>3. Dialogue social</h2><p>La societe favorise un dialogue social de qualite avec les representants du personnel dans le respect des dispositions du Code du Travail.</p><h2>4. Qualite de vie au travail</h2><p>Des programmes de bien-etre (soutien psychologique, activites sportives, couverture medicale etendue) sont mis en place pour ameliorer la qualite de vie des collaborateurs.</p></div>`
  },
  {
    code: 'gov2_politique_achats_responsables', name: "Politique d'achats responsables", category: 'juridique_admin',
    price: 6500, priceMax: 19500, description: "Politique d'achats responsables integrant les criteres sociaux, environnementaux et ethiques dans la selection des fournisseurs.", templateType: 'pdf', classe: 'A', active: true, popularity: 57,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true},
      {key:'responsable_achats',label:"Responsable des achats",type:'text',required:true},
      {key:'part_locale',label:"Part minimale d'achats locaux vise (%)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>POLITIQUE D'ACHATS RESPONSABLES</h1><p><strong>{{raison_sociale}}</strong> — Adoptee le <strong>{{date_adoption}}</strong>, pilotee par <strong>{{responsable_achats}}</strong>.</p><h2>1. Objectifs</h2><p>La politique d'achats responsables vise a integrer des criteres RSE dans la selection et l'evaluation des fournisseurs et sous-traitants.</p><h2>2. Ancrage local</h2><p>La societe s'engage a atteindre une part d'achats locaux d'au moins <strong>{{part_locale}}</strong>% afin de soutenir le tissu economique local.</p><h2>3. Criteres de selection</h2><p>Les fournisseurs sont evalues sur leurs pratiques sociales, environnementales et ethiques, en complement des criteres de prix et de qualite.</p><h2>4. Charte fournisseurs</h2><p>Tout fournisseur reference s'engage a respecter la charte fournisseurs responsables de la societe, incluant l'interdiction du travail des enfants et le respect des droits humains fondamentaux.</p></div>`
  },
  {
    code: 'gov2_devoir_vigilance', name: "Due diligence en droits de l'homme (devoir de vigilance)", category: 'juridique_admin',
    price: 9000, priceMax: 27000, description: "Plan de vigilance relatif aux droits de l'homme et aux libertes fondamentales dans la chaine de valeur.", templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'exercice',label:"Exercice couvert",type:'text',required:true},
      {key:'perimetre_vigilance',label:"Perimetre de vigilance (fournisseurs, filiales, etc.)",type:'textarea',required:true},
      {key:'referent_vigilance',label:"Referent du plan de vigilance",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>PLAN DE VIGILANCE — DROITS DE L'HOMME ET LIBERTES FONDAMENTALES</h1><p><strong>{{raison_sociale}}</strong> — Exercice <strong>{{exercice}}</strong>. Referent : <strong>{{referent_vigilance}}</strong>.</p><h2>1. Identification des risques</h2><p>La societe a procede a une cartographie des risques en matiere de droits de l'homme couvrant le perimetre suivant : <strong>{{perimetre_vigilance}}</strong>.</p><h2>2. Mesures de prevention</h2><p>Des procedures de due diligence sont mises en oeuvre pour chaque fournisseur et sous-traitant identifie comme presentant un risque significatif.</p><h2>3. Mecanisme d'alerte</h2><p>Un dispositif d'alerte accessible aux parties prenantes internes et externes est mis en place pour signaler tout manquement constate.</p><h2>4. Suivi et evaluation</h2><p>Le plan fait l'objet d'un suivi annuel et d'une evaluation de son efficacite. Les resultats sont publies dans le rapport RSE.</p></div>`
  },
  {
    code: 'gov2_sobriete_energetique', name: "Plan de sobriete energetique entreprise", category: 'juridique_admin',
    price: 6000, priceMax: 18000, description: "Plan de sobriete energetique definissant les engagements et actions de reduction de la consommation d'energie.", templateType: 'pdf', classe: 'A', active: true, popularity: 53,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'consommation_reference',label:"Consommation energetique de reference (kWh/an)",type:'text',required:true},
      {key:'objectif_economie',label:"Objectif d'economie (%)",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>PLAN DE SOBRIETE ENERGETIQUE</h1><p><strong>{{raison_sociale}}</strong> — Adopte le <strong>{{date_adoption}}</strong>.</p><h2>1. Etat des lieux</h2><p>La consommation energetique de reference de la societe est de <strong>{{consommation_reference}}</strong> kWh par an.</p><h2>2. Objectif</h2><p>La societe s'engage a reduire sa consommation energetique de <strong>{{objectif_economie}}</strong>% dans les trois prochaines annees.</p><h2>3. Mesures adoptees</h2><p>Les mesures comprennent : l'extinction automatique des equipements, l'optimisation de la climatisation, le remplacement des equipements energivores et la sensibilisation des collaborateurs.</p><h2>4. Pilotage</h2><p>Un tableau de bord mensuel de suivi des consommations est mis en place et presente au comite de direction.</p></div>`
  },
  {
    code: 'gov2_neutralite_carbone', name: "Accord de neutralite carbone (compensation carbone)", category: 'juridique_admin',
    price: 8000, priceMax: 24000, description: "Accord encadrant la strategie de neutralite carbone et les mecanismes de compensation des emissions residuelles.", templateType: 'pdf', classe: 'A', active: true, popularity: 59,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'prestataire_compensation',label:"Prestataire de compensation carbone",type:'text',required:true},
      {key:'volume_compensation',label:"Volume de compensation annuel (tCO2e)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE NEUTRALITE CARBONE — COMPENSATION CARBONE</h1><p>Entre <strong>{{raison_sociale}}</strong> et <strong>{{prestataire_compensation}}</strong>, en date du <strong>{{date_accord}}</strong>.</p><h2>Article 1 — Objet</h2><p>Le present accord definit les modalites de compensation des emissions de gaz a effet de serre residuelles de la societe, dans le cadre de sa strategie de neutralite carbone.</p><h2>Article 2 — Volume</h2><p>La societe compense annuellement <strong>{{volume_compensation}}</strong> tonnes de CO2 equivalent via des projets certifies (Gold Standard ou Verified Carbon Standard).</p><h2>Article 3 — Projets eligibles</h2><p>Les projets de compensation sont localises preferentiellement en Afrique subsaharienne afin de generer des co-benefices locaux (emplois, biodiversite, sante).</p><h2>Article 4 — Transparence</h2><p>Les credits carbone acquis sont publiquement declares et les certificats correspondants sont annules pour eviter tout double comptage.</p></div>`
  },
  {
    code: 'gov2_mecenat', name: "Programme de mecenat culturel et sportif", category: 'juridique_admin',
    price: 5500, priceMax: 16500, description: "Convention de mecenat encadrant les engagements de l'entreprise en faveur de la culture et du sport.", templateType: 'pdf', classe: 'A', active: true, popularity: 48,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale du mecene",type:'text',required:true},
      {key:'beneficiaire',label:"Beneficiaire (association/organisation)",type:'text',required:true},
      {key:'montant',label:"Montant du mecenat (FCFA)",type:'text',required:true},
      {key:'date_convention',label:"Date de la convention",type:'date',required:true},
      {key:'objet_mecenat',label:"Objet et projet soutenu",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>CONVENTION DE MECENAT CULTUREL ET SPORTIF</h1><p>Entre <strong>{{raison_sociale}}</strong> (le mecene) et <strong>{{beneficiaire}}</strong>, le <strong>{{date_convention}}</strong>.</p><h2>Article 1 — Objet</h2><p>Le mecene soutient le projet suivant : <strong>{{objet_mecenat}}</strong>.</p><h2>Article 2 — Montant</h2><p>Le mecenat est d'un montant de <strong>{{montant}}</strong> FCFA, verse selon les modalites convenues entre les parties.</p><h2>Article 3 — Obligations du beneficiaire</h2><p>En contrepartie, le beneficiaire s'engage a associer le nom et le logo du mecene a la communication du projet et a fournir un compte rendu d'utilisation des fonds.</p><h2>Article 4 — Duree</h2><p>La presente convention est conclue pour la duree du projet soutenu, telle que definie a l'article 1.</p></div>`
  },
  {
    code: 'gov2_partenariat_ong', name: "Accord de partenariat entreprise-ONG (RSE)", category: 'juridique_admin',
    price: 7000, priceMax: 21000, description: "Accord de partenariat entre une entreprise et une ONG dans le cadre d'un programme RSE.", templateType: 'pdf', classe: 'A', active: true, popularity: 61,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale de l'entreprise",type:'text',required:true},
      {key:'ong_nom',label:"Nom de l'ONG partenaire",type:'text',required:true},
      {key:'programme_rse',label:"Programme RSE concerne",type:'textarea',required:true},
      {key:'duree',label:"Duree du partenariat",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT ENTREPRISE-ONG (RSE)</h1><p>Entre <strong>{{raison_sociale}}</strong> et <strong>{{ong_nom}}</strong>, en date du <strong>{{date_accord}}</strong>.</p><h2>Article 1 — Objet</h2><p>Le present accord formalise le partenariat entre les parties pour la mise en oeuvre du programme RSE suivant : <strong>{{programme_rse}}</strong>.</p><h2>Article 2 — Engagements de l'entreprise</h2><p>L'entreprise apporte son soutien financier, logistique et en competences pour la realisation du programme.</p><h2>Article 3 — Engagements de l'ONG</h2><p>L'ONG assure la mise en oeuvre operationnelle du programme, le suivi des beneficiaires et le reporting vers l'entreprise partenaire.</p><h2>Article 4 — Duree et reconduction</h2><p>Le partenariat est conclu pour une duree de <strong>{{duree}}</strong>, renouvelable par accord expres des deux parties.</p></div>`
  },
  {
    code: 'gov2_rapport_integre', name: "Publication d'un rapport integre (IIRC)", category: 'juridique_admin',
    price: 11000, priceMax: 33000, description: "Structure et contenu d'un rapport integre selon le cadre de l'International Integrated Reporting Council.", templateType: 'pdf', classe: 'A', active: true, popularity: 64,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'exercice',label:"Exercice de reference",type:'text',required:true},
      {key:'modele_affaires',label:"Description du modele d'affaires",type:'textarea',required:true},
      {key:'capitaux_cles',label:"Capitaux cles mobilises",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>RAPPORT INTEGRE — IIRC FRAMEWORK</h1><p><strong>{{raison_sociale}}</strong> — Exercice <strong>{{exercice}}</strong>.</p><h2>1. Modele d'affaires</h2><p><strong>{{modele_affaires}}</strong></p><h2>2. Capitaux mobilises</h2><p>La societe mobilise les capitaux suivants pour creer de la valeur : <strong>{{capitaux_cles}}</strong>.</p><h2>3. Environnement externe</h2><p>Ce chapitre analyse les tendances macro-economiques, reglementaires et sectorielles affectant la creation de valeur de la societe.</p><h2>4. Risques et opportunites</h2><p>Les principaux risques et opportunites identifies par la direction sont presentes avec les strategies de reponse associees.</p><h2>5. Performance et perspectives</h2><p>Ce chapitre presente les resultats financiers et extra-financiers de l'exercice et les perspectives pour les periodes futures.</p></div>`
  },
  {
    code: 'gov2_certification_bcorp', name: "Certification B Corp (entreprise)", category: 'juridique_admin',
    price: 9000, priceMax: 27000, description: "Dossier de candidature et d'engagement pour la certification B Corp d'une entreprise africaine.", templateType: 'pdf', classe: 'A', active: true, popularity: 52,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'secteur',label:"Secteur d'activite",type:'text',required:true},
      {key:'score_bimpact',label:"Score BIA (B Impact Assessment)",type:'text',required:true},
      {key:'date_evaluation',label:"Date de l'evaluation",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>DOSSIER DE CERTIFICATION B CORP</h1><p><strong>{{raison_sociale}}</strong> — Secteur : <strong>{{secteur}}</strong>.</p><h2>1. Engagement de l'entreprise</h2><p>La direction de <strong>{{raison_sociale}}</strong> s'engage dans la demarche de certification B Corp, attestant de son engagement envers les personnes, la planete et la prosperite partagee.</p><h2>2. Score B Impact Assessment</h2><p>L'evaluation realisee le <strong>{{date_evaluation}}</strong> a produit un score BIA de <strong>{{score_bimpact}}</strong> points. Un score minimum de 80 points est requis pour la certification.</p><h2>3. Points forts identifies</h2><p>Les domaines d'excellence identifie lors de l'evaluation sont presentes en detail dans les annexes du present dossier.</p><h2>4. Plan d'amelioration</h2><p>Un plan d'amelioration sur 3 ans est joint pour renforcer les domaines ou des progres sont attendus.</p></div>`
  },
  {
    code: 'gov2_audit_rse', name: "Accord de service d'audit RSE", category: 'juridique_admin',
    price: 8000, priceMax: 24000, description: "Contrat de prestation d'audit RSE confiant a un cabinet specialise la verification des engagements de l'entreprise.", templateType: 'pdf', classe: 'A', active: true, popularity: 58,
    fieldsJson: F([
      {key:'client_raison_sociale',label:"Raison sociale du client",type:'text',required:true},
      {key:'cabinet_audit',label:"Cabinet d'audit RSE",type:'text',required:true},
      {key:'perimetre_audit',label:"Perimetre de l'audit",type:'textarea',required:true},
      {key:'honoraires',label:"Honoraires (FCFA HT)",type:'text',required:true},
      {key:'date_mission',label:"Date de la mission",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'AUDIT RSE</h1><p>Entre <strong>{{client_raison_sociale}}</strong> (le client) et <strong>{{cabinet_audit}}</strong> (l'auditeur), en date du <strong>{{date_mission}}</strong>.</p><h2>Article 1 — Objet</h2><p>Le present accord a pour objet de confier a l'auditeur la realisation d'un audit RSE portant sur : <strong>{{perimetre_audit}}</strong>.</p><h2>Article 2 — Methodologie</h2><p>L'audit est realise selon les standards internationaux (GRI, AA1000AS) et les referentiels sectoriels applicables. Il comprend une revue documentaire, des entretiens et des visites de terrain.</p><h2>Article 3 — Honoraires</h2><p>Les honoraires de la mission sont fixes a <strong>{{honoraires}}</strong> FCFA HT, payables selon le calendrier convenu en annexe.</p><h2>Article 4 — Livrables</h2><p>L'auditeur remet un rapport d'audit comprenant les constatations, les ecarts par rapport aux engagements declares et les recommandations d'amelioration.</p></div>`
  },
  {
    code: 'gov2_formation_admin', name: "Accord de service de formation des administrateurs (ICA Afrique)", category: 'juridique_admin',
    price: 7500, priceMax: 22500, description: "Convention de formation des administrateurs de societe aux standards de gouvernance africains et OHADA.", templateType: 'pdf', classe: 'A', active: true, popularity: 55,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'organisme_formation',label:"Organisme de formation",type:'text',required:true},
      {key:'nombre_participants',label:"Nombre de participants",type:'text',required:true},
      {key:'duree_formation',label:"Duree de la formation",type:'text',required:true},
      {key:'date_formation',label:"Date de la formation",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FORMATION DES ADMINISTRATEURS</h1><p>Entre <strong>{{raison_sociale}}</strong> et <strong>{{organisme_formation}}</strong>, pour une formation le <strong>{{date_formation}}</strong>.</p><h2>Article 1 — Objet</h2><p>Le present accord porte sur la realisation d'une formation en gouvernance d'entreprise pour <strong>{{nombre_participants}}</strong> administrateurs, d'une duree de <strong>{{duree_formation}}</strong>.</p><h2>Article 2 — Programme</h2><p>La formation couvre : le droit OHADA des societes, les responsabilites des administrateurs, les meilleures pratiques de gouvernance en Afrique, la gestion des conflits d'interets et la lecture des comptes SYSCOHADA.</p><h2>Article 3 — Attestation</h2><p>Les participants recevront une attestation de formation reconnue dans l'espace OHADA a l'issue de la formation.</p><h2>Article 4 — Modalites pratiques</h2><p>Les details pratiques (lieu, horaires, supports pedagogiques) sont precises en annexe du present accord.</p></div>`
  },
  {
    code: 'gov2_rapport_annuel_gouvernance', name: "Rapport annuel de gouvernance", category: 'juridique_admin',
    price: 9000, priceMax: 27000, description: "Rapport annuel de gouvernance d'entreprise destine aux actionnaires et aux parties prenantes.", templateType: 'pdf', classe: 'A', active: true, popularity: 71,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'exercice',label:"Exercice",type:'text',required:true},
      {key:'president_ca',label:"President du conseil d'administration",type:'text',required:true},
      {key:'nombre_reunions',label:"Nombre de reunions du conseil",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>RAPPORT ANNUEL DE GOUVERNANCE</h1><p><strong>{{raison_sociale}}</strong> — Exercice <strong>{{exercice}}</strong>. President du conseil : <strong>{{president_ca}}</strong>.</p><h2>1. Composition du conseil</h2><p>Ce chapitre presente la composition detaillee du conseil d'administration, les profils et les competences de chaque administrateur, ainsi que le taux de presence aux reunions.</p><h2>2. Activites du conseil</h2><p>Le conseil s'est reuni <strong>{{nombre_reunions}}</strong> fois au cours de l'exercice. Ce chapitre decrit les principaux sujets traites et les decisions prises.</p><h2>3. Fonctionnement des comites</h2><p>Le rapport detaille les activites des comites specialises (audit, risques, nominations et remunerations) et leurs principales recommandations.</p><h2>4. Remuneration des dirigeants</h2><p>La structure de remuneration des mandataires sociaux est presentee en toute transparence, conformement a la politique say on pay approuvee par les actionnaires.</p></div>`
  },
  {
    code: 'gov2_charte_esg', name: "Charte de gouvernance ESG de l'entreprise africaine", category: 'juridique_admin',
    price: 8500, priceMax: 25500, description: "Charte integrant les dimensions environnementales, sociales et de gouvernance dans la strategie de l'entreprise africaine.", templateType: 'pdf', classe: 'A', active: true, popularity: 73,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true},
      {key:'ambition_esg',label:"Ambition ESG de l'entreprise",type:'textarea',required:true},
      {key:'signataires',label:"Signataires de la charte",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CHARTE DE GOUVERNANCE ESG — ENTREPRISE AFRICAINE</h1><p><strong>{{raison_sociale}}</strong> — Adoptee le <strong>{{date_adoption}}</strong> par <strong>{{signataires}}</strong>.</p><h2>Notre ambition ESG</h2><p><strong>{{ambition_esg}}</strong></p><h2>Pilier Environnement</h2><p>La societe s'engage a gerer de maniere responsable ses impacts environnementaux, a reduire ses emissions de GES et a contribuer a la preservation des ecosystemes africains.</p><h2>Pilier Social</h2><p>La societe place l'humain au coeur de sa strategie : emploi local, formation, dialogue social, respect des droits de l'homme et contribution au developpement des communautes.</p><h2>Pilier Gouvernance</h2><p>La societe maintient les plus hauts standards d'ethique, de transparence et de redevabilite envers l'ensemble de ses parties prenantes, en conformite avec les textes OHADA.</p></div>`
  },

  // ─── 25 templates Reporting ESG/Impact (esg_, commercial_financier) ───
  {
    code: 'esg_reporting_gri', name: "Accord de reporting GRI (Global Reporting Initiative)", category: 'commercial_financier',
    price: 9000, priceMax: 27000, description: "Contrat de prestation pour la preparation d'un rapport de durabilite conforme au referentiel GRI.", templateType: 'pdf', classe: 'A', active: true, popularity: 76,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'prestataire',label:"Prestataire GRI",type:'text',required:true},
      {key:'niveau_conformite',label:"Niveau de conformite GRI vise (Core/Comprehensive)",type:'text',required:true},
      {key:'exercice',label:"Exercice couvert",type:'text',required:true},
      {key:'honoraires',label:"Honoraires (FCFA HT)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE REPORTING GRI</h1><p>Entre <strong>{{raison_sociale}}</strong> et <strong>{{prestataire}}</strong> pour l'exercice <strong>{{exercice}}</strong>.</p><h2>Article 1 — Objet</h2><p>Le present accord porte sur l'accompagnement de <strong>{{raison_sociale}}</strong> dans la preparation de son rapport de durabilite conforme au referentiel GRI Standards, niveau <strong>{{niveau_conformite}}</strong>.</p><h2>Article 2 — Prestations</h2><p>Le prestataire assure : la selection des indicateurs GRI pertinents, la collecte et validation des donnees, la redaction du rapport et la preparation de l'index GRI.</p><h2>Article 3 — Honoraires</h2><p>Les honoraires sont fixes a <strong>{{honoraires}}</strong> FCFA HT.</p><h2>Article 4 — Calendrier</h2><p>Le rapport definitif sera livre dans les delais convenus en annexe, compatibles avec le calendrier de publication de la societe.</p></div>`
  },
  {
    code: 'esg_reporting_sasb', name: "Accord de reporting SASB (Sustainability Accounting Standards Board)", category: 'commercial_financier',
    price: 8500, priceMax: 25500, description: "Convention de reporting selon les standards SASB adaptes au secteur et au contexte africain.", templateType: 'pdf', classe: 'A', active: true, popularity: 62,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'secteur_sasb',label:"Secteur SASB applicable",type:'text',required:true},
      {key:'prestataire',label:"Cabinet conseil SASB",type:'text',required:true},
      {key:'exercice',label:"Exercice",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE REPORTING SASB</h1><p>Entre <strong>{{raison_sociale}}</strong> et <strong>{{prestataire}}</strong> — Secteur SASB : <strong>{{secteur_sasb}}</strong> — Exercice <strong>{{exercice}}</strong>.</p><h2>Article 1 — Objet</h2><p>Le present accord porte sur la production d'un rapport de durabilite conforme aux standards SASB applicables au secteur <strong>{{secteur_sasb}}</strong>.</p><h2>Article 2 — Indicateurs retenus</h2><p>Les indicateurs specifiques au secteur SASB concerne sont identifies conjointement par les parties et listes en annexe du present accord.</p><h2>Article 3 — Collecte des donnees</h2><p>Le prestataire accompagne la societe dans la mise en place d'un dispositif de collecte et de validation des donnees extra-financieres.</p><h2>Article 4 — Livrable</h2><p>Le livrable final est un rapport SASB complet, pret a etre publie et communique aux parties prenantes investisseurs.</p></div>`
  },
  {
    code: 'esg_reporting_tcfd', name: "Accord de reporting TCFD (climate financial disclosures)", category: 'commercial_financier',
    price: 9500, priceMax: 28500, description: "Prestation d'accompagnement pour la publication des informations financieres liees au climat selon le cadre TCFD.", templateType: 'pdf', classe: 'A', active: true, popularity: 67,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'prestataire',label:"Cabinet conseil TCFD",type:'text',required:true},
      {key:'scenarios_climatiques',label:"Scenarios climatiques analyses",type:'textarea',required:true},
      {key:'exercice',label:"Exercice",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE REPORTING TCFD</h1><p>Entre <strong>{{raison_sociale}}</strong> et <strong>{{prestataire}}</strong> pour l'exercice <strong>{{exercice}}</strong>.</p><h2>Article 1 — Objet</h2><p>Le present accord porte sur l'accompagnement TCFD (Task Force on Climate-related Financial Disclosures) couvrant les quatre piliers : gouvernance, strategie, gestion des risques, metriques et objectifs.</p><h2>Article 2 — Scenarios</h2><p>L'analyse est conduite sur les scenarios climatiques suivants : <strong>{{scenarios_climatiques}}</strong>, conformement aux recommandations TCFD.</p><h2>Article 3 — Risques et opportunites</h2><p>Le prestataire accompagne l'identification et la quantification des risques physiques et de transition liee au changement climatique.</p><h2>Article 4 — Publication</h2><p>Les informations TCFD sont integrees au rapport annuel ou publiees separement selon les preferences de la societe.</p></div>`
  },
  {
    code: 'esg_rapport_integre_iirc', name: "Accord de rapport integre (integrated reporting)", category: 'commercial_financier',
    price: 10000, priceMax: 30000, description: "Convention d'accompagnement pour la production d'un rapport integre selon le cadre IIRC.", templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'prestataire',label:"Cabinet conseil",type:'text',required:true},
      {key:'exercice',label:"Exercice",type:'text',required:true},
      {key:'horizon_strategique',label:"Horizon strategique (ex: 3 ans)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE RAPPORT INTEGRE — CADRE IIRC</h1><p>Entre <strong>{{raison_sociale}}</strong> et <strong>{{prestataire}}</strong> pour l'exercice <strong>{{exercice}}</strong>.</p><h2>Article 1 — Objet</h2><p>Le present accord porte sur la production d'un rapport integre de la societe selon le cadre de l'International Integrated Reporting Council (IIRC), articulant performance financiere et creation de valeur globale sur un horizon de <strong>{{horizon_strategique}}</strong>.</p><h2>Article 2 — Structure du rapport</h2><p>Le rapport integre comprend : presentation de l'organisation, gouvernance, modele d'affaires, risques et opportunites, strategie, performance et perspectives.</p><h2>Article 3 — Processus de production</h2><p>Le prestataire anime les ateliers de materialite, coordonne la collecte de donnees et redige le rapport en collaboration avec les equipes de la societe.</p><h2>Article 4 — Revue</h2><p>Le rapport est soumis a une revue externe independante avant publication.</p></div>`
  },
  {
    code: 'esg_bilan_carbone_ghg', name: "Accord de bilan carbone (GHG Protocol)", category: 'commercial_financier',
    price: 8000, priceMax: 24000, description: "Prestation de realisation d'un bilan des emissions de gaz a effet de serre selon le protocole GHG.", templateType: 'pdf', classe: 'A', active: true, popularity: 71,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'prestataire_bilan',label:"Prestataire bilan GHG",type:'text',required:true},
      {key:'annee_bilan',label:"Annee du bilan",type:'text',required:true},
      {key:'perimetre_organisationnel',label:"Perimetre organisationnel",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE BILAN CARBONE — GHG PROTOCOL</h1><p>Entre <strong>{{raison_sociale}}</strong> et <strong>{{prestataire_bilan}}</strong> pour l'annee <strong>{{annee_bilan}}</strong>.</p><h2>Article 1 — Objet</h2><p>Le present accord porte sur la realisation du bilan des emissions de gaz a effet de serre de <strong>{{raison_sociale}}</strong> selon le GHG Protocol Corporate Standard.</p><h2>Article 2 — Perimetre</h2><p>Perimetre organisationnel : <strong>{{perimetre_organisationnel}}</strong>. Le bilan couvre les scopes 1, 2 et 3 (categories prioritaires).</p><h2>Article 3 — Methodologie</h2><p>Le prestataire applique les facteurs d'emission appropries au contexte africain et aux specificites nationales du pays d'operation.</p><h2>Article 4 — Rapport</h2><p>Le rapport de bilan GHG est livré avec les données détaillées par source d'emission et les recommandations de reduction.</p></div>`
  },
  {
    code: 'esg_scope1', name: "Accord de calcul de l'empreinte carbone scope 1", category: 'commercial_financier',
    price: 6000, priceMax: 18000, description: "Prestation de calcul des emissions directes de GES (scope 1) de l'entreprise.", templateType: 'pdf', classe: 'A', active: true, popularity: 58,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'prestataire',label:"Prestataire",type:'text',required:true},
      {key:'annee',label:"Annee de calcul",type:'text',required:true},
      {key:'sources_emission',label:"Sources d'emission scope 1 identifiees",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE CALCUL — EMPREINTE CARBONE SCOPE 1</h1><p>Entre <strong>{{raison_sociale}}</strong> et <strong>{{prestataire}}</strong> pour l'annee <strong>{{annee}}</strong>.</p><h2>Article 1 — Objet</h2><p>Le scope 1 couvre les emissions directes de GES provenant des sources controlees par la societe.</p><h2>Article 2 — Sources identifiees</h2><p>Les sources d'emission scope 1 identifiees sont : <strong>{{sources_emission}}</strong>.</p><h2>Article 3 — Methodologie</h2><p>Le calcul est realise selon la methodologie GHG Protocol, avec les facteurs d'emission du GIEC et les donnees specifiques au pays d'operation.</p><h2>Article 4 — Livrable</h2><p>Le livrable comprend : le tableau de calcul detaille, le total en tCO2e et les recommandations de reduction prioritaires.</p></div>`
  },
  {
    code: 'esg_scope2', name: "Accord de calcul de l'empreinte carbone scope 2", category: 'commercial_financier',
    price: 6000, priceMax: 18000, description: "Prestation de calcul des emissions indirectes liees a la consommation d'energie (scope 2).", templateType: 'pdf', classe: 'A', active: true, popularity: 56,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'prestataire',label:"Prestataire",type:'text',required:true},
      {key:'annee',label:"Annee de calcul",type:'text',required:true},
      {key:'fournisseur_electricite',label:"Fournisseur d'electricite",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE CALCUL — EMPREINTE CARBONE SCOPE 2</h1><p>Entre <strong>{{raison_sociale}}</strong> et <strong>{{prestataire}}</strong> pour l'annee <strong>{{annee}}</strong>.</p><h2>Article 1 — Objet</h2><p>Le scope 2 couvre les emissions indirectes liees a la consommation d'electricite, de vapeur et de chaleur achetees par la societe.</p><h2>Article 2 — Approche de calcul</h2><p>Deux approches sont appliquees : l'approche par localisation (facteur d'emission du reseau national fourni par <strong>{{fournisseur_electricite}}</strong>) et l'approche par marche.</p><h2>Article 3 — Donnees requises</h2><p>La societe fournit ses releves de consommation energetique (electricite, vapeur) pour l'annee de reference.</p><h2>Article 4 — Rapport</h2><p>Le rapport presente les emissions scope 2 calculees selon les deux approches et les opportunites de reduction (efficacite energetique, energies renouvelables).</p></div>`
  },
  {
    code: 'esg_scope3', name: "Accord de calcul de l'empreinte carbone scope 3", category: 'commercial_financier',
    price: 7500, priceMax: 22500, description: "Prestation de calcul des emissions indirectes de la chaine de valeur (scope 3).", templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'prestataire',label:"Prestataire",type:'text',required:true},
      {key:'categories_scope3',label:"Categories scope 3 retenues",type:'textarea',required:true},
      {key:'annee',label:"Annee de calcul",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE CALCUL — EMPREINTE CARBONE SCOPE 3</h1><p>Entre <strong>{{raison_sociale}}</strong> et <strong>{{prestataire}}</strong> pour l'annee <strong>{{annee}}</strong>.</p><h2>Article 1 — Objet</h2><p>Le scope 3 couvre les emissions indirectes de la chaine de valeur, en amont (achats, transport amont) et en aval (utilisation des produits, fin de vie) des activites de la societe.</p><h2>Article 2 — Categories retenues</h2><p>Les categories scope 3 couvertes sont : <strong>{{categories_scope3}}</strong>, conformement aux 15 categories du GHG Protocol Scope 3 Standard.</p><h2>Article 3 — Collecte des donnees</h2><p>Le prestataire accompagne la collecte de donnees aupres des fournisseurs principaux et l'utilisation de bases de donnees d'emission secondaires.</p><h2>Article 4 — Livrable</h2><p>Un rapport detaille par categorie scope 3 est produit avec une analyse des leviers de reduction prioritaires.</p></div>`
  },
  {
    code: 'esg_plan_transition_sbti', name: "Accord de plan de transition bas-carbone (SBTi)", category: 'commercial_financier',
    price: 9500, priceMax: 28500, description: "Prestation d'elaboration d'un plan de transition bas-carbone base sur des objectifs scientifiques (SBTi).", templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'prestataire',label:"Prestataire SBTi",type:'text',required:true},
      {key:'objectif_temperature',label:"Objectif de temperature vise (ex: 1,5°C)",type:'text',required:true},
      {key:'annee_cible',label:"Annee cible de l'objectif",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PLAN DE TRANSITION BAS-CARBONE — SBTI</h1><p>Entre <strong>{{raison_sociale}}</strong> et <strong>{{prestataire}}</strong>.</p><h2>Article 1 — Objet</h2><p>Le present accord porte sur l'elaboration d'un plan de transition bas-carbone aligné sur une trajectoire <strong>{{objectif_temperature}}</strong>, conformement aux methodologies de la Science Based Targets initiative (SBTi).</p><h2>Article 2 — Feuille de route</h2><p>La feuille de route de reduction des emissions couvre les scopes 1, 2 et 3 avec des jalons intermediaires jusqu'en <strong>{{annee_cible}}</strong>.</p><h2>Article 3 — Validation externe</h2><p>Les objectifs de reduction sont soumis a la validation de la SBTi selon sa methodologie officielle.</p><h2>Article 4 — Integration strategique</h2><p>Le plan de transition est integre dans la strategie financiere et operationnelle de la societe et presente au conseil d'administration.</p></div>`
  },
  {
    code: 'esg_certification_iso14064', name: "Accord de certification ISO 14064 (GHG)", category: 'commercial_financier',
    price: 8000, priceMax: 24000, description: "Contrat d'accompagnement pour la certification ISO 14064 relative a la quantification des emissions de GES.", templateType: 'pdf', classe: 'A', active: true, popularity: 55,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'organisme_verification',label:"Organisme de verification ISO 14064",type:'text',required:true},
      {key:'perimetre',label:"Perimetre de la certification",type:'textarea',required:true},
      {key:'date_audit',label:"Date de l'audit de certification",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE CERTIFICATION ISO 14064</h1><p>Entre <strong>{{raison_sociale}}</strong> et <strong>{{organisme_verification}}</strong>, audit prevu le <strong>{{date_audit}}</strong>.</p><h2>Article 1 — Objet</h2><p>Le present accord porte sur la verification et la certification du bilan GES de <strong>{{raison_sociale}}</strong> conformement a la norme ISO 14064-3.</p><h2>Article 2 — Perimetre</h2><p>Perimetre couvert : <strong>{{perimetre}}</strong>.</p><h2>Article 3 — Processus de verification</h2><p>La verification comprend : la revue documentaire, l'audit sur site, l'evaluation de la methodologie et des facteurs d'emission utilises, et la verification des calculs.</p><h2>Article 4 — Declaration de verification</h2><p>A l'issue de la verification, l'organisme emet une declaration de verification (assurance limitee ou raisonnable) conformement a l'ISO 14064-3.</p></div>`
  },
  {
    code: 'esg_audit_social_sa8000', name: "Accord de service d'audit social (SA8000)", category: 'commercial_financier',
    price: 8000, priceMax: 24000, description: "Contrat d'audit social conforme au standard SA8000 pour les entreprises africaines et leurs fournisseurs.", templateType: 'pdf', classe: 'A', active: true, popularity: 59,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale de l'entreprise auditee",type:'text',required:true},
      {key:'cabinet_audit',label:"Cabinet d'audit social",type:'text',required:true},
      {key:'sites_audites',label:"Sites audites",type:'textarea',required:true},
      {key:'date_audit',label:"Date de l'audit",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'AUDIT SOCIAL — SA8000</h1><p>Entre <strong>{{raison_sociale}}</strong> et <strong>{{cabinet_audit}}</strong>, audit le <strong>{{date_audit}}</strong>.</p><h2>Article 1 — Objet</h2><p>Le present accord porte sur la realisation d'un audit social selon le referentiel SA8000 sur les sites suivants : <strong>{{sites_audites}}</strong>.</p><h2>Article 2 — Domaines audites</h2><p>L'audit couvre : le travail des enfants, le travail force, la sante et securite, la liberte d'association, la discrimination, les pratiques disciplinaires, le temps de travail et la remuneration.</p><h2>Article 3 — Rapport</h2><p>Le rapport d'audit identifie les non-conformites, les points d'amelioration et les bonnes pratiques observees.</p><h2>Article 4 — Plan correctif</h2><p>Un plan correctif est elabore conjointement pour corriger les non-conformites dans un delai convenu.</p></div>`
  },
  {
    code: 'esg_notation_esg', name: "Accord de service de notation ESG", category: 'commercial_financier',
    price: 9000, priceMax: 27000, description: "Contrat de notation ESG d'une entreprise africaine par un organisme de notation specialise.", templateType: 'pdf', classe: 'A', active: true, popularity: 64,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'agence_notation',label:"Agence de notation ESG",type:'text',required:true},
      {key:'referentiel',label:"Referentiel de notation applique",type:'text',required:true},
      {key:'date_notation',label:"Date de la notation",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE NOTATION ESG</h1><p>Entre <strong>{{raison_sociale}}</strong> et <strong>{{agence_notation}}</strong>, notation le <strong>{{date_notation}}</strong>.</p><h2>Article 1 — Objet</h2><p>Le present accord porte sur la realisation d'une notation ESG de <strong>{{raison_sociale}}</strong> selon le referentiel <strong>{{referentiel}}</strong>.</p><h2>Article 2 — Processus de notation</h2><p>La notation comprend : la collecte de donnees (questionnaire ESG), l'analyse documentaire, les entretiens avec le management et l'attribution d'une note globale et par pilier (E, S, G).</p><h2>Article 3 — Utilisation de la note</h2><p>La note ESG peut etre utilisee pour la communication financiere, les appels d'offres et le suivi de la progression des performances extra-financieres.</p><h2>Article 4 — Mise a jour</h2><p>La notation est renouvelee annuellement sur la base des nouvelles donnees fournies par la societe.</p></div>`
  },
  {
    code: 'esg_agence_notation_vigeo', name: "Accord de service d'agence de notation extra-financiere (Vigeo Afrique)", category: 'commercial_financier',
    price: 10000, priceMax: 30000, description: "Convention avec une agence de notation extra-financiere specialisee dans le contexte africain.", templateType: 'pdf', classe: 'A', active: true, popularity: 58,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'agence',label:"Agence de notation (ex: Vigeo Afrique)",type:'text',required:true},
      {key:'perimetere_evaluation',label:"Perimetre de l'evaluation",type:'textarea',required:true},
      {key:'duree_contrat',label:"Duree du contrat",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE NOTATION EXTRA-FINANCIERE</h1><p>Entre <strong>{{raison_sociale}}</strong> et <strong>{{agence}}</strong>.</p><h2>Article 1 — Objet</h2><p>Le present accord porte sur la realisation d'une evaluation extra-financiere sur le perimetre suivant : <strong>{{perimetere_evaluation}}</strong>, pour une duree de <strong>{{duree_contrat}}</strong>.</p><h2>Article 2 — Methodologie</h2><p>L'evaluation est conduite selon une methodologie rigoureuse integrant les specificites reglementaires, sociales et environnementales du continent africain.</p><h2>Article 3 — Livrables</h2><p>Le livrable principal est un rapport de notation detaillant les forces et faiblesses de la societe sur chaque dimension ESG evaluee.</p><h2>Article 4 — Confidentialite</h2><p>Les resultats sont confidentiels et reserves a la societe evaluee, sauf accord expres pour une publication.</p></div>`
  },
  {
    code: 'esg_green_bond', name: "Accord d'obligation verte (green bond framework)", category: 'commercial_financier',
    price: 12000, priceMax: 36000, description: "Cadre d'emission d'obligations vertes conforme aux principes de l'ICMA pour le financement de projets environnementaux.", templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'emetteur',label:"Emetteur de l'obligation verte",type:'text',required:true},
      {key:'montant_emission',label:"Montant de l'emission (FCFA)",type:'text',required:true},
      {key:'categorie_projets',label:"Categories de projets eligibles",type:'textarea',required:true},
      {key:'verificateur',label:"Verificateur independant (Second Opinion)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CADRE D'EMISSION D'OBLIGATION VERTE — GREEN BOND FRAMEWORK</h1><p>Emetteur : <strong>{{emetteur}}</strong>. Montant : <strong>{{montant_emission}}</strong> FCFA.</p><h2>1. Utilisation des fonds</h2><p>Les fonds leves seront exclusivement affectes au financement des categories de projets eligibles suivantes : <strong>{{categorie_projets}}</strong>, conformement aux Green Bond Principles de l'ICMA.</p><h2>2. Processus de selection</h2><p>Un comite dedié evalue et selectionne les projets eligibles sur la base de criteres environnementaux et d'impact definis dans le present cadre.</p><h2>3. Gestion des fonds</h2><p>Les fonds sont loges dans un compte dedie et traçables a tout moment. Un rapport de suivi semestriel est produit.</p><h2>4. Verification</h2><p>Le cadre d'emission et l'allocation des fonds sont verifies par <strong>{{verificateur}}</strong> (Second Party Opinion).</p></div>`
  },
  {
    code: 'esg_social_bond', name: "Accord d'obligation sociale (social bond framework)", category: 'commercial_financier',
    price: 12000, priceMax: 36000, description: "Cadre d'emission d'obligations sociales pour le financement de projets a impact social positif en Afrique.", templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'emetteur',label:"Emetteur",type:'text',required:true},
      {key:'montant_emission',label:"Montant de l'emission (FCFA)",type:'text',required:true},
      {key:'populations_cibles',label:"Populations cibles",type:'textarea',required:true},
      {key:'types_projets',label:"Types de projets sociaux eligibles",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>CADRE D'EMISSION D'OBLIGATION SOCIALE — SOCIAL BOND FRAMEWORK</h1><p>Emetteur : <strong>{{emetteur}}</strong>. Montant : <strong>{{montant_emission}}</strong> FCFA.</p><h2>1. Utilisation des fonds</h2><p>Les fonds sont affectes au financement de projets sociaux eligibles de type : <strong>{{types_projets}}</strong>, beneficiant prioritairement aux populations cibles suivantes : <strong>{{populations_cibles}}</strong>.</p><h2>2. Conformite aux Social Bond Principles</h2><p>Le present cadre est conforme aux Social Bond Principles de l'ICMA et aux exigences de la BRVM pour les emissions sur le marche financier de l'UEMOA.</p><h2>3. Reporting d'impact</h2><p>Un rapport annuel d'impact social mesure les indicateurs cles definis en annexe pour chaque categorie de projets finances.</p><h2>4. Gouvernance</h2><p>Un comite de selection independant valide l'eligibilite de chaque projet avant allocation des fonds.</p></div>`
  },
  {
    code: 'esg_sustainability_bond', name: "Accord d'obligation durabilite (sustainability bond)", category: 'commercial_financier',
    price: 12000, priceMax: 36000, description: "Cadre d'emission d'obligations durabilite combinant volets vert et social pour l'Afrique francophone.", templateType: 'pdf', classe: 'A', active: true, popularity: 63,
    fieldsJson: F([
      {key:'emetteur',label:"Emetteur",type:'text',required:true},
      {key:'montant_emission',label:"Montant de l'emission (FCFA)",type:'text',required:true},
      {key:'repartition_vert_social',label:"Repartition entre volet vert et volet social (%)",type:'text',required:true},
      {key:'date_emission',label:"Date d'emission prevue",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CADRE D'EMISSION D'OBLIGATION DURABILITE — SUSTAINABILITY BOND</h1><p>Emetteur : <strong>{{emetteur}}</strong>. Montant : <strong>{{montant_emission}}</strong> FCFA. Date prevue : <strong>{{date_emission}}</strong>.</p><h2>1. Objet</h2><p>L'obligation durabilite combine le financement de projets environnementaux et sociaux, selon une repartition de <strong>{{repartition_vert_social}}</strong>.</p><h2>2. Eligibilite des projets</h2><p>Les projets eligible sont determines conformement aux Sustainability Bond Guidelines de l'ICMA, en coherence avec les Objectifs de Developpement Durable (ODD) de l'ONU pertinents pour le contexte africain.</p><h2>3. Reporting</h2><p>Un rapport annuel combine rend compte de l'allocation des fonds et de l'impact environnemental et social genere.</p><h2>4. Second Party Opinion</h2><p>Un avis independant (Second Party Opinion) est obtenu avant l'emission pour valider la conformite du cadre.</p></div>`
  },
  {
    code: 'esg_sll', name: "Accord de pret a impact (sustainability-linked loan SLL)", category: 'commercial_financier',
    price: 10000, priceMax: 30000, description: "Convention de pret dont les conditions financieres sont indexees sur des indicateurs de performance ESG.", templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'emprunteur',label:"Emprunteur",type:'text',required:true},
      {key:'preteur',label:"Preteur",type:'text',required:true},
      {key:'montant_pret',label:"Montant du pret (FCFA)",type:'text',required:true},
      {key:'kpis_esg',label:"KPIs ESG de reference",type:'textarea',required:true},
      {key:'ajustement_taux',label:"Mecanisme d'ajustement du taux (bps)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PRET A IMPACT — SUSTAINABILITY-LINKED LOAN (SLL)</h1><p>Entre <strong>{{emprunteur}}</strong> et <strong>{{preteur}}</strong>. Montant : <strong>{{montant_pret}}</strong> FCFA.</p><h2>Article 1 — Structure du pret</h2><p>Le present pret a impact lie les conditions financieres a la performance ESG de l'emprunteur sur les indicateurs suivants : <strong>{{kpis_esg}}</strong>.</p><h2>Article 2 — Ajustement du taux</h2><p>Le mecanisme d'ajustement du taux d'interet est le suivant : <strong>{{ajustement_taux}}</strong> points de base d'ajustement annuel selon l'atteinte ou le manquement aux cibles ESG.</p><h2>Article 3 — Verification</h2><p>La performance ESG est verifiee annuellement par un verificateur independant agree par les deux parties.</p><h2>Article 4 — Reporting</h2><p>L'emprunteur fournit annuellement un rapport ESG certifie attestant des performances sur les indicateurs contractuels.</p></div>`
  },
  {
    code: 'esg_label_luxflag', name: "Accord de label de financement durable (LuxFLAG)", category: 'commercial_financier',
    price: 9000, priceMax: 27000, description: "Convention d'obtention du label LuxFLAG pour un fonds ou produit de financement durable africain.", templateType: 'pdf', classe: 'A', active: true, popularity: 52,
    fieldsJson: F([
      {key:'gestionnaire_fonds',label:"Gestionnaire du fonds",type:'text',required:true},
      {key:'nom_fonds',label:"Nom du fonds",type:'text',required:true},
      {key:'type_label',label:"Type de label LuxFLAG vise",type:'text',required:true},
      {key:'date_candidature',label:"Date de candidature",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CONVENTION DE CANDIDATURE AU LABEL LUXFLAG</h1><p><strong>{{gestionnaire_fonds}}</strong> — Fonds : <strong>{{nom_fonds}}</strong> — Label vise : <strong>{{type_label}}</strong> — Candidature du <strong>{{date_candidature}}</strong>.</p><h2>Article 1 — Objet</h2><p>Le gestionnaire s'engage dans la demarche d'obtention du label LuxFLAG <strong>{{type_label}}</strong> pour le fonds <strong>{{nom_fonds}}</strong>, attestant de son engagement en matiere d'investissement durable.</p><h2>Article 2 — Criteres d'eligibilite</h2><p>Le fonds respecte les criteres d'eligibilite LuxFLAG applicables : politique d'investissement ESG formalisee, processus de due diligence ESG documente et reporting ESG regulier.</p><h2>Article 3 — Obligations</h2><p>Le gestionnaire s'engage a maintenir les criteres requis pendant toute la duree du label et a soumettre les rapports annuels requis a LuxFLAG.</p><h2>Article 4 — Renouvellement</h2><p>Le label est soumis a renouvellement annuel sous condition de conformite continue aux criteres LuxFLAG.</p></div>`
  },
  {
    code: 'esg_impact_investing', name: "Accord de service d'impact investing", category: 'commercial_financier',
    price: 10000, priceMax: 30000, description: "Convention de conseil et de gestion pour des investissements a impact social et environnemental en Afrique.", templateType: 'pdf', classe: 'A', active: true, popularity: 66,
    fieldsJson: F([
      {key:'investisseur',label:"Investisseur",type:'text',required:true},
      {key:'gestionnaire',label:"Gestionnaire impact",type:'text',required:true},
      {key:'ticket_investissement',label:"Ticket d'investissement (FCFA)",type:'text',required:true},
      {key:'themes_impact',label:"Themes d'impact vises",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'IMPACT INVESTING</h1><p>Entre <strong>{{investisseur}}</strong> et <strong>{{gestionnaire}}</strong>. Ticket : <strong>{{ticket_investissement}}</strong> FCFA.</p><h2>Article 1 — Intention d'impact</h2><p>Le present accord porte sur la gestion d'investissements a impact visant : <strong>{{themes_impact}}</strong>, avec une intention d'impact explicite et mesurable.</p><h2>Article 2 — Theorie du changement</h2><p>La theorie du changement de chaque investissement est documentee et lie les activites financees aux impacts sociaux et/ou environnementaux vises.</p><h2>Article 3 — Mesure de l'impact</h2><p>Le gestionnaire produit un rapport annuel d'impact mesure selon les indicateurs IRIS+ ou equivalents, adaptes au contexte africain.</p><h2>Article 4 — Equilibre rendement/impact</h2><p>Les parties conviennent d'un equilibre entre la recherche de rendement financier et la maximisation de l'impact, tel que precise en annexe financiere.</p></div>`
  },
  {
    code: 'esg_sroi', name: "Accord de mesure d'impact social (SROI)", category: 'commercial_financier',
    price: 8000, priceMax: 24000, description: "Convention de realisation d'une analyse du retour social sur investissement (SROI) pour un programme ou projet.", templateType: 'pdf', classe: 'A', active: true, popularity: 57,
    fieldsJson: F([
      {key:'commanditaire',label:"Commanditaire de l'analyse",type:'text',required:true},
      {key:'programme',label:"Programme ou projet evalue",type:'text',required:true},
      {key:'prestataire',label:"Prestataire SROI",type:'text',required:true},
      {key:'periode_evaluation',label:"Periode d'evaluation",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE MESURE D'IMPACT SOCIAL — SROI</h1><p>Entre <strong>{{commanditaire}}</strong> et <strong>{{prestataire}}</strong> pour l'evaluation du programme <strong>{{programme}}</strong> sur la periode <strong>{{periode_evaluation}}</strong>.</p><h2>Article 1 — Objet</h2><p>Le present accord porte sur la realisation d'une analyse SROI (Social Return on Investment) du programme <strong>{{programme}}</strong>, afin de mesurer et valoriser l'impact social cree par euro investi.</p><h2>Article 2 — Methodologie</h2><p>L'analyse est conduite conformement au guide SROI de Social Value International, en six etapes : parties prenantes, cartographie des resultats, indicateurs, monetisation, calcul du SROI, validation.</p><h2>Article 3 — Participation des parties prenantes</h2><p>Des consultations des parties prenantes directes (beneficiaires, partenaires) sont menees dans le cadre de l'analyse.</p><h2>Article 4 — Rapport</h2><p>Le rapport SROI final comprend le ratio SROI calcule, les limites de l'analyse et les recommandations pour ameliorer l'impact du programme.</p></div>`
  },
  {
    code: 'esg_communication_dd', name: "Accord de service de communication developpement durable", category: 'commercial_financier',
    price: 7000, priceMax: 21000, description: "Convention de conseil en communication sur les engagements de developpement durable de l'entreprise.", templateType: 'pdf', classe: 'A', active: true, popularity: 54,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'agence',label:"Agence de communication DD",type:'text',required:true},
      {key:'supports_vises',label:"Supports de communication vises",type:'textarea',required:true},
      {key:'budget',label:"Budget de communication (FCFA HT)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE COMMUNICATION DEVELOPPEMENT DURABLE</h1><p>Entre <strong>{{raison_sociale}}</strong> et <strong>{{agence}}</strong>. Budget : <strong>{{budget}}</strong> FCFA HT.</p><h2>Article 1 — Objet</h2><p>Le present accord porte sur la conception et la production des supports de communication relatifs aux engagements RSE et de developpement durable de la societe.</p><h2>Article 2 — Supports</h2><p>Les supports vises sont : <strong>{{supports_vises}}</strong>. Ils sont concus dans le respect du principe d'anti-greenwashing et de la factualite des informations communiquees.</p><h2>Article 3 — Conformite</h2><p>L'agence s'assure que les communications sont conformes aux referentiels RSE applicables (GRI, OHADA) et ne constituent pas de fausses declarations environnementales.</p><h2>Article 4 — Validation</h2><p>Toute communication est validee par le responsable RSE de la societe avant diffusion.</p></div>`
  },
  {
    code: 'esg_partenariat_pnud', name: "Accord de partenariat entreprise-PNUD (ODD)", category: 'commercial_financier',
    price: 9000, priceMax: 27000, description: "Accord de partenariat entre une entreprise africaine et le PNUD pour la mise en oeuvre des Objectifs de Developpement Durable.", templateType: 'pdf', classe: 'A', active: true, popularity: 62,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'bureau_pnud',label:"Bureau PNUD concerne",type:'text',required:true},
      {key:'odds_vises',label:"ODD vises par le partenariat",type:'textarea',required:true},
      {key:'duree_partenariat',label:"Duree du partenariat",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT ENTREPRISE-PNUD (ODD)</h1><p>Entre <strong>{{raison_sociale}}</strong> et <strong>{{bureau_pnud}}</strong>.</p><h2>Article 1 — Objet</h2><p>Le present accord formalise un partenariat entre <strong>{{raison_sociale}}</strong> et le PNUD pour la mise en oeuvre d'actions contribuant aux ODD suivants : <strong>{{odds_vises}}</strong>.</p><h2>Article 2 — Roles et responsabilites</h2><p>Le PNUD apporte son expertise, ses methodes et son reseau. L'entreprise contribue par ses ressources financieres, ses competences et son ancrage local.</p><h2>Article 3 — Gouvernance</h2><p>Un comite de pilotage conjoint se reunit trimestriellement pour evaluer les progres et ajuster les activites.</p><h2>Article 4 — Duree</h2><p>Le partenariat est conclu pour une duree de <strong>{{duree_partenariat}}</strong>, renouvelable par accord expres.</p></div>`
  },
  {
    code: 'esg_rapport_impact_annuel', name: "Rapport de mesure d'impact annuel", category: 'commercial_financier',
    price: 8500, priceMax: 25500, description: "Rapport annuel presentant les indicateurs d'impact social et environnemental des activites de l'entreprise.", templateType: 'pdf', classe: 'A', active: true, popularity: 69,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'exercice',label:"Exercice",type:'text',required:true},
      {key:'indicateurs_cles',label:"Indicateurs d'impact cles",type:'textarea',required:true},
      {key:'responsable_impact',label:"Responsable impact",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>RAPPORT DE MESURE D'IMPACT ANNUEL</h1><p><strong>{{raison_sociale}}</strong> — Exercice <strong>{{exercice}}</strong>. Responsable impact : <strong>{{responsable_impact}}</strong>.</p><h2>1. Indicateurs d'impact cles</h2><p>Ce rapport mesure les indicateurs d'impact suivants : <strong>{{indicateurs_cles}}</strong>.</p><h2>2. Impact environnemental</h2><p>Ce chapitre presente les resultats mesures sur les indicateurs environnementaux : emissions de GES evitees, eau prelevee, dechets produits et recycles, biodiversite preservee.</p><h2>3. Impact social</h2><p>Ce chapitre presente les resultats mesures sur les indicateurs sociaux : emplois crees/maintenus, personnes formees, beneficiaires de programmes communautaires, parite genre.</p><h2>4. Gouvernance et ethique</h2><p>Ce chapitre rend compte des indicateurs de gouvernance : conformite reglementaire, incidents signales, formation a l'ethique des collaborateurs.</p></div>`
  },
  {
    code: 'esg_plan_transition_esg', name: "Plan de transition ESG", category: 'commercial_financier',
    price: 10000, priceMax: 30000, description: "Plan strategique de transition vers un modele d'affaires integrant pleinement les criteres ESG.", templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'horizon_plan',label:"Horizon du plan (ex: 2030)",type:'text',required:true},
      {key:'ambitions_esg',label:"Ambitions ESG a l'horizon cible",type:'textarea',required:true},
      {key:'investissements_prevus',label:"Investissements prevus pour la transition (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>PLAN DE TRANSITION ESG</h1><p><strong>{{raison_sociale}}</strong> — Horizon <strong>{{horizon_plan}}</strong>.</p><h2>1. Vision et ambitions</h2><p>A l'horizon <strong>{{horizon_plan}}</strong>, la societe vise : <strong>{{ambitions_esg}}</strong>.</p><h2>2. Feuille de route environnementale</h2><p>Le plan de transition prevoit des actions concretes de reduction de l'empreinte environnementale de la societe, avec des jalons mesurables.</p><h2>3. Feuille de route sociale</h2><p>Le volet social du plan porte sur l'amelioration des conditions de travail, le renforcement de la diversite et l'engagement communautaire.</p><h2>4. Investissements</h2><p>Un budget de <strong>{{investissements_prevus}}</strong> FCFA est prevu pour financer les projets de transition sur la duree du plan.</p><h2>5. Gouvernance du plan</h2><p>Le comite executif pilote le plan de transition et rend compte trimestriellement au conseil d'administration des avancees.</p></div>`
  },
  {
    code: 'esg_charte_finance_durable', name: "Charte de la finance durable et responsable en Afrique", category: 'commercial_financier',
    price: 8000, priceMax: 24000, description: "Charte definissant les engagements d'un acteur financier africain en matiere de finance durable et responsable.", templateType: 'pdf', classe: 'A', active: true, popularity: 67,
    fieldsJson: F([
      {key:'institution',label:"Institution financiere",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true},
      {key:'dg_nom',label:"Nom du Directeur General",type:'text',required:true},
      {key:'engagements_phares',label:"Engagements phares de la charte",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>CHARTE DE LA FINANCE DURABLE ET RESPONSABLE EN AFRIQUE</h1><p><strong>{{institution}}</strong> — Adoptee le <strong>{{date_adoption}}</strong> par <strong>{{dg_nom}}</strong>.</p><h2>Preambule</h2><p><strong>{{institution}}</strong> s'engage dans une demarche de finance durable et responsable, convaincue que la performance financiere et l'impact positif sur la societe et l'environnement sont indissociables dans le contexte africain.</p><h2>Engagements phares</h2><p><strong>{{engagements_phares}}</strong></p><h2>Pilier 1 — Integration ESG dans les financements</h2><p>L'institution s'engage a integrer les criteres ESG dans l'analyse des demandes de financement et dans la gestion de son portefeuille.</p><h2>Pilier 2 — Produits financiers durables</h2><p>L'institution developpe une gamme de produits financiers durables (prets verts, obligations a impact, financement agricole durable) adaptes aux besoins du marche africain.</p><h2>Pilier 3 — Reporting et transparence</h2><p>L'institution publie annuellement un rapport de finance durable mesurant ses engagements et leur contribution aux ODD et aux priorites de developpement africaines.</p></div>`
  },
];

async function main() {
  let created = 0, updated = 0;
  for (const t of templates) {
    const ex = await prisma.documentTemplate.findUnique({ where: { code: t.code } });
    await prisma.documentTemplate.upsert({ where: { code: t.code }, update: t, create: t });
    if (ex) updated++; else created++;
  }
  const total = await prisma.documentTemplate.count();
  console.log(`Batch 91b OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
