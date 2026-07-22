import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ─── 25 templates Assurance vie/Prévoyance (préfixe assv_) ───
  {
    code: 'assv_001', name: "Accord de police d'assurance vie individuelle (CIMA)", category: 'assurance',
    price: 6000, priceMax: 18000, description: "Police d'assurance vie individuelle conforme au Code CIMA pour l'Afrique francophone.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 78,
    fieldsJson: F([
      {key:'nom_assure',label:"Nom complet de l'assuré",type:'text',required:true},
      {key:'date_naissance',label:"Date de naissance de l'assuré",type:'date',required:true},
      {key:'capital_assure',label:"Capital assuré (FCFA)",type:'text',required:true},
      {key:'beneficiaire',label:"Nom du bénéficiaire désigné",type:'text',required:true},
      {key:'duree_contrat',label:"Durée du contrat (années)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>POLICE D'ASSURANCE VIE INDIVIDUELLE</h1><p>Conforme au Code CIMA — Afrique francophone</p><h2>PARTIES</h2><p><strong>Assuré :</strong> {{nom_assure}}, né(e) le {{date_naissance}}.</p><h2>OBJET</h2><p>La présente police a pour objet la couverture en assurance vie individuelle de l'assuré pour un capital de {{capital_assure}} FCFA.</p><h2>BÉNÉFICIAIRE</h2><p>En cas de décès, le capital sera versé à : {{beneficiaire}}.</p><h2>DURÉE</h2><p>Le contrat est conclu pour une durée de {{duree_contrat}} ans à compter de la date de signature.</p><h2>DISPOSITIONS CIMA</h2><p>Le présent contrat est régi par le Code des Assurances CIMA et les lois et règlements en vigueur dans l'espace CIMA.</p></div>`
  },
  {
    code: 'assv_002', name: "Accord de police d'assurance vie collective (entreprise)", category: 'assurance',
    price: 7000, priceMax: 21000, description: "Police d'assurance vie collective souscrite par une entreprise au bénéfice de ses salariés, conforme CIMA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'nom_entreprise',label:"Dénomination sociale de l'entreprise",type:'text',required:true},
      {key:'nombre_salaries',label:"Nombre de salariés couverts",type:'text',required:true},
      {key:'capital_unitaire',label:"Capital par salarié (FCFA)",type:'text',required:true},
      {key:'prime_annuelle',label:"Prime annuelle globale (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>POLICE D'ASSURANCE VIE COLLECTIVE ENTREPRISE</h1><h2>SOUSCRIPTEUR</h2><p><strong>Entreprise :</strong> {{nom_entreprise}}</p><p><strong>Nombre de salariés couverts :</strong> {{nombre_salaries}}</p><h2>OBJET</h2><p>La présente police garantit un capital décès de {{capital_unitaire}} FCFA par salarié couvert.</p><h2>PRIME</h2><p>La prime annuelle globale est fixée à {{prime_annuelle}} FCFA, payable selon l'échéancier annexé.</p><h2>DISPOSITIONS LÉGALES</h2><p>Contrat soumis au Code CIMA et au Code du Travail en vigueur.</p></div>`
  },
  {
    code: 'assv_003', name: "Accord de police d'assurance décès et invalidité (ADI)", category: 'assurance',
    price: 5000, priceMax: 15000, description: "Police ADI couvrant le décès et l'invalidité permanente totale ou partielle, conforme CIMA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 75,
    fieldsJson: F([
      {key:'nom_assure',label:"Nom complet de l'assuré",type:'text',required:true},
      {key:'capital_deces',label:"Capital décès garanti (FCFA)",type:'text',required:true},
      {key:'taux_invalidite',label:"Taux d'invalidité ouvrant droit (en %)",type:'text',required:true},
      {key:'prime_mensuelle',label:"Prime mensuelle (FCFA)",type:'text',required:true},
      {key:'date_prise_effet',label:"Date de prise d'effet",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>POLICE D'ASSURANCE DÉCÈS ET INVALIDITÉ (ADI)</h1><h2>ASSURÉ</h2><p>{{nom_assure}}</p><h2>GARANTIES</h2><p><strong>Capital décès :</strong> {{capital_deces}} FCFA</p><p><strong>Invalidité :</strong> Indemnisation à partir d'un taux de {{taux_invalidite}}%.</p><h2>PRIME</h2><p>Prime mensuelle : {{prime_mensuelle}} FCFA.</p><h2>PRISE D'EFFET</h2><p>Le contrat prend effet le {{date_prise_effet}}.</p></div>`
  },
  {
    code: 'assv_004', name: "Accord de police d'assurance perte d'emploi", category: 'assurance',
    price: 4000, priceMax: 12000, description: "Police d'assurance garantissant le remboursement de mensualités de crédit en cas de perte d'emploi involontaire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'nom_assure',label:"Nom complet de l'assuré",type:'text',required:true},
      {key:'employeur',label:"Nom de l'employeur actuel",type:'text',required:true},
      {key:'mensualite_credit',label:"Mensualité de crédit à couvrir (FCFA)",type:'text',required:true},
      {key:'duree_garantie',label:"Durée maximale d'indemnisation (mois)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>POLICE D'ASSURANCE PERTE D'EMPLOI</h1><h2>ASSURÉ</h2><p><strong>Nom :</strong> {{nom_assure}}</p><p><strong>Employeur :</strong> {{employeur}}</p><h2>GARANTIE</h2><p>En cas de perte d'emploi involontaire, l'assureur prend en charge la mensualité de crédit de {{mensualite_credit}} FCFA pendant une durée maximale de {{duree_garantie}} mois.</p><h2>CONDITIONS DE DÉCLENCHEMENT</h2><p>La garantie est déclenchée par un licenciement économique ou pour motif personnel, dûment justifié par les documents officiels de l'employeur.</p></div>`
  },
  {
    code: 'assv_005', name: "Accord de police d'assurance homme-clé (key man)", category: 'assurance',
    price: 8000, priceMax: 24000, description: "Police d'assurance sur la tête d'un dirigeant ou collaborateur indispensable à l'entreprise (key man).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'nom_homecle',label:"Nom et fonction de l'homme-clé",type:'text',required:true},
      {key:'nom_entreprise',label:"Dénomination sociale de l'entreprise",type:'text',required:true},
      {key:'capital_garanti',label:"Capital garanti (FCFA)",type:'text',required:true},
      {key:'prime_annuelle',label:"Prime annuelle (FCFA)",type:'text',required:true},
      {key:'motif_cle',label:"Justification du caractère indispensable",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>POLICE D'ASSURANCE HOMME-CLÉ (KEY MAN)</h1><h2>PARTIES</h2><p><strong>Entreprise souscriptrice :</strong> {{nom_entreprise}}</p><p><strong>Homme-clé assuré :</strong> {{nom_homecle}}</p><h2>OBJET</h2><p>{{motif_cle}}</p><h2>GARANTIE</h2><p>Capital garanti en cas de décès ou invalidité totale : {{capital_garanti}} FCFA.</p><h2>PRIME</h2><p>Prime annuelle : {{prime_annuelle}} FCFA, payable d'avance.</p></div>`
  },
  {
    code: 'assv_006', name: "Accord de police d'assurance épargne-retraite (PER individuel)", category: 'assurance',
    price: 5000, priceMax: 15000, description: "Police d'épargne-retraite individuelle à versements libres ou programmés, conforme CIMA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'nom_souscripteur',label:"Nom du souscripteur",type:'text',required:true},
      {key:'age_souscripteur',label:"Âge du souscripteur (années)",type:'text',required:true},
      {key:'versement_initial',label:"Versement initial (FCFA)",type:'text',required:true},
      {key:'age_retraite',label:"Âge de départ à la retraite prévu",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>POLICE D'ASSURANCE ÉPARGNE-RETRAITE — PER INDIVIDUEL</h1><h2>SOUSCRIPTEUR</h2><p><strong>Nom :</strong> {{nom_souscripteur}}, âgé(e) de {{age_souscripteur}} ans.</p><h2>OBJET</h2><p>Constitution d'une épargne en vue de la retraite, avec versement d'un capital ou d'une rente à l'âge de {{age_retraite}} ans.</p><h2>VERSEMENTS</h2><p>Versement initial : {{versement_initial}} FCFA. Versements complémentaires libres ou programmés selon l'annexe tarifaire.</p><h2>FISCALITÉ</h2><p>Les versements peuvent bénéficier d'une déduction fiscale dans les limites prévues par la législation en vigueur.</p></div>`
  },
  {
    code: 'assv_007', name: "Accord de police d'assurance épargne (capitalisation)", category: 'assurance',
    price: 5000, priceMax: 14000, description: "Contrat de capitalisation permettant de faire fructifier une épargne sur le long terme avec garantie en capital.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'nom_souscripteur',label:"Nom du souscripteur",type:'text',required:true},
      {key:'montant_epargne',label:"Montant de l'épargne initiale (FCFA)",type:'text',required:true},
      {key:'taux_garanti',label:"Taux d'intérêt garanti (%)",type:'text',required:true},
      {key:'echeance',label:"Date d'échéance du contrat",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>POLICE D'ASSURANCE ÉPARGNE — CAPITALISATION</h1><h2>SOUSCRIPTEUR</h2><p>{{nom_souscripteur}}</p><h2>OBJET</h2><p>Le présent contrat a pour objet la capitalisation d'une épargne de {{montant_epargne}} FCFA au taux garanti de {{taux_garanti}}% par an.</p><h2>ÉCHÉANCE</h2><p>Le capital augmenté des intérêts capitalisés sera versé à la date du {{echeance}}.</p><h2>GARANTIES</h2><p>Le capital initial est garanti à 100% à l'échéance du contrat, indépendamment des fluctuations des marchés.</p></div>`
  },
  {
    code: 'assv_008', name: "Accord de police d'assurance éducation (enfant)", category: 'assurance',
    price: 4000, priceMax: 12000, description: "Contrat d'assurance éducation garantissant le financement des études de l'enfant en cas de décès du souscripteur.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 73,
    fieldsJson: F([
      {key:'nom_souscripteur',label:"Nom du souscripteur (parent)",type:'text',required:true},
      {key:'nom_enfant',label:"Nom et prénom de l'enfant bénéficiaire",type:'text',required:true},
      {key:'date_naissance_enfant',label:"Date de naissance de l'enfant",type:'date',required:true},
      {key:'capital_etudes',label:"Capital études garanti (FCFA)",type:'text',required:true},
      {key:'age_versement',label:"Âge de versement du capital à l'enfant",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>POLICE D'ASSURANCE ÉDUCATION ENFANT</h1><h2>PARTIES</h2><p><strong>Souscripteur :</strong> {{nom_souscripteur}}</p><p><strong>Bénéficiaire :</strong> {{nom_enfant}}, né(e) le {{date_naissance_enfant}}</p><h2>OBJET</h2><p>Garantir à l'enfant le financement de ses études grâce à un capital de {{capital_etudes}} FCFA versé à l'âge de {{age_versement}} ans.</p><h2>GARANTIE DÉCÈS</h2><p>En cas de décès du souscripteur avant l'échéance, les primes cessent et le capital est maintenu.</p></div>`
  },
  {
    code: 'assv_009', name: "Accord de rachat de police d'assurance vie (valeur de rachat)", category: 'assurance',
    price: 4000, priceMax: 10000, description: "Accord formalisant la demande et les conditions de rachat total ou partiel d'un contrat d'assurance vie.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'nom_assure',label:"Nom du souscripteur-assuré",type:'text',required:true},
      {key:'numero_police',label:"Numéro de la police d'assurance",type:'text',required:true},
      {key:'type_rachat',label:"Type de rachat (total ou partiel)",type:'text',required:true},
      {key:'montant_rachat',label:"Montant du rachat demandé (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>DEMANDE DE RACHAT DE POLICE D'ASSURANCE VIE</h1><h2>IDENTITÉ DU DEMANDEUR</h2><p><strong>Souscripteur :</strong> {{nom_assure}}</p><p><strong>N° de police :</strong> {{numero_police}}</p><h2>OBJET DE LA DEMANDE</h2><p>Rachat {{type_rachat}} d'un montant de {{montant_rachat}} FCFA conformément à la valeur de rachat calculée à la date de la présente demande.</p><h2>CONDITIONS</h2><p>Le rachat entraîne les conséquences fiscales et contractuelles précisées dans les conditions générales du contrat.</p></div>`
  },
  {
    code: 'assv_010', name: "Accord de démembrement d'assurance vie (bénéficiaire)", category: 'assurance',
    price: 6000, priceMax: 18000, description: "Accord de démembrement de la clause bénéficiaire d'un contrat d'assurance vie entre usufruitier et nu-propriétaire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 58,
    fieldsJson: F([
      {key:'nom_souscripteur',label:"Nom du souscripteur",type:'text',required:true},
      {key:'nom_usufruitier',label:"Nom de l'usufruitier désigné",type:'text',required:true},
      {key:'nom_nu_proprietaire',label:"Nom du nu-propriétaire désigné",type:'text',required:true},
      {key:'numero_police',label:"Numéro de la police concernée",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE DÉMEMBREMENT DE CLAUSE BÉNÉFICIAIRE</h1><h2>CONTRAT CONCERNÉ</h2><p>Police n° {{numero_police}} — Souscripteur : {{nom_souscripteur}}</p><h2>DÉMEMBREMENT</h2><p><strong>Usufruitier :</strong> {{nom_usufruitier}}</p><p><strong>Nu-propriétaire :</strong> {{nom_nu_proprietaire}}</p><h2>EFFETS</h2><p>Au dénouement du contrat, l'usufruitier recevra les sommes dues à charge de les restituer au nu-propriétaire selon les règles du quasi-usufruit, conformément aux dispositions légales applicables.</p></div>`
  },
  {
    code: 'assv_011', name: "Accord de nantissement de police d'assurance vie", category: 'assurance',
    price: 6000, priceMax: 16000, description: "Convention de nantissement d'une police d'assurance vie en garantie d'un crédit bancaire, conforme OHADA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 62,
    fieldsJson: F([
      {key:'nom_debiteur',label:"Nom du débiteur-souscripteur",type:'text',required:true},
      {key:'nom_creancier',label:"Nom de l'établissement créancier",type:'text',required:true},
      {key:'numero_police',label:"Numéro de la police nantie",type:'text',required:true},
      {key:'montant_credit',label:"Montant du crédit garanti (FCFA)",type:'text',required:true},
      {key:'date_echeance_credit',label:"Date d'échéance du crédit",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CONVENTION DE NANTISSEMENT DE POLICE D'ASSURANCE VIE</h1><h2>PARTIES</h2><p><strong>Débiteur :</strong> {{nom_debiteur}}</p><p><strong>Créancier nanti :</strong> {{nom_creancier}}</p><h2>POLICE NANTIE</h2><p>N° {{numero_police}} — Valeur de rachat nantie en garantie du crédit de {{montant_credit}} FCFA.</p><h2>DURÉE</h2><p>Le nantissement prend fin à la date du {{date_echeance_credit}} ou dès remboursement total du crédit.</p><h2>BASE LÉGALE</h2><p>Acte conforme à l'Acte Uniforme OHADA sur les Sûretés et aux dispositions du Code CIMA.</p></div>`
  },
  {
    code: 'assv_012', name: "Accord de service de conseil en assurance-vie (IFA Afrique)", category: 'assurance',
    price: 5000, priceMax: 14000, description: "Convention liant un intermédiaire financier agréé (IFA) à un client pour une mission de conseil en assurance-vie.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'nom_ifa',label:"Nom / raison sociale de l'IFA",type:'text',required:true},
      {key:'numero_agrement',label:"Numéro d'agrément de l'IFA",type:'text',required:true},
      {key:'nom_client',label:"Nom du client",type:'text',required:true},
      {key:'mission',label:"Description de la mission de conseil",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CONSEIL EN ASSURANCE-VIE</h1><h2>INTERMÉDIAIRE</h2><p><strong>IFA :</strong> {{nom_ifa}} — Agrément n° {{numero_agrement}}</p><h2>CLIENT</h2><p>{{nom_client}}</p><h2>MISSION</h2><p>{{mission}}</p><h2>OBLIGATIONS DE L'IFA</h2><p>L'IFA s'engage à agir dans le meilleur intérêt du client, à lui fournir une information claire et complète, et à respecter les règles déontologiques en vigueur dans l'espace CIMA.</p></div>`
  },
  {
    code: 'assv_013', name: "Accord de souscription d'assurance collective prévoyance", category: 'assurance',
    price: 7000, priceMax: 20000, description: "Contrat de souscription d'un régime collectif de prévoyance (décès, incapacité, invalidité) pour les salariés d'une entreprise.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 74,
    fieldsJson: F([
      {key:'nom_entreprise',label:"Dénomination sociale de l'entreprise",type:'text',required:true},
      {key:'effectif_couverts',label:"Effectif couvert",type:'text',required:true},
      {key:'garanties_souscrites',label:"Garanties souscrites (décès, incapacité, invalidité)",type:'textarea',required:true},
      {key:'taux_cotisation',label:"Taux de cotisation global (%)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SOUSCRIPTION D'ASSURANCE COLLECTIVE PRÉVOYANCE</h1><h2>ENTREPRISE SOUSCRIPTRICE</h2><p>{{nom_entreprise}} — Effectif couvert : {{effectif_couverts}} salariés.</p><h2>GARANTIES</h2><p>{{garanties_souscrites}}</p><h2>FINANCEMENT</h2><p>Taux de cotisation global : {{taux_cotisation}}% de la masse salariale brute.</p><h2>GOUVERNANCE</h2><p>Le contrat est révisable annuellement lors de la réunion paritaire employeur-représentants du personnel.</p></div>`
  },
  {
    code: 'assv_014', name: "Accord de service de bilan prévoyance entreprise", category: 'assurance',
    price: 4000, priceMax: 12000, description: "Prestation d'audit et de bilan des garanties prévoyance existantes dans une entreprise, avec recommandations.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'nom_entreprise',label:"Nom de l'entreprise auditée",type:'text',required:true},
      {key:'nom_prestataire',label:"Nom du cabinet de conseil",type:'text',required:true},
      {key:'date_mission',label:"Date de réalisation du bilan",type:'date',required:true},
      {key:'perimetre',label:"Périmètre du bilan (sites, catégories de salariés)",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE BILAN PRÉVOYANCE ENTREPRISE</h1><h2>PARTIES</h2><p><strong>Entreprise :</strong> {{nom_entreprise}}</p><p><strong>Prestataire :</strong> {{nom_prestataire}}</p><h2>PÉRIMÈTRE</h2><p>{{perimetre}}</p><h2>MISSION</h2><p>Réalisée le {{date_mission}}, la mission comprend l'analyse des contrats existants, l'évaluation des niveaux de couverture et la formulation de recommandations d'optimisation.</p></div>`
  },
  {
    code: 'assv_015', name: "Accord de service d'assurance groupe entreprise (modèle Afrique)", category: 'assurance',
    price: 8000, priceMax: 22000, description: "Convention d'assurance groupe couvrant l'ensemble des salariés d'une entreprise, inspirée des modèles de grands opérateurs africains.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 71,
    fieldsJson: F([
      {key:'nom_assureur',label:"Nom de la compagnie d'assurance",type:'text',required:true},
      {key:'nom_entreprise',label:"Nom de l'entreprise souscriptrice",type:'text',required:true},
      {key:'date_prise_effet',label:"Date de prise d'effet du contrat",type:'date',required:true},
      {key:'prestations',label:"Détail des prestations garanties",type:'textarea',required:true},
      {key:'prime_globale',label:"Prime globale annuelle (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD D'ASSURANCE GROUPE ENTREPRISE</h1><h2>PARTIES</h2><p><strong>Assureur :</strong> {{nom_assureur}}</p><p><strong>Souscripteur :</strong> {{nom_entreprise}}</p><h2>PRISE D'EFFET</h2><p>{{date_prise_effet}}</p><h2>PRESTATIONS GARANTIES</h2><p>{{prestations}}</p><h2>PRIME</h2><p>Prime annuelle globale : {{prime_globale}} FCFA. Révisable chaque année sur la base de la sinistralité observée.</p></div>`
  },
  {
    code: 'assv_016', name: "Accord de service de courtage d'assurance-vie", category: 'assurance',
    price: 5000, priceMax: 15000, description: "Mandat confié à un courtier d'assurance agréé pour la recherche et la gestion de contrats d'assurance-vie.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'nom_courtier',label:"Nom / raison sociale du courtier",type:'text',required:true},
      {key:'num_agrement_courtier',label:"Numéro d'agrément du courtier",type:'text',required:true},
      {key:'nom_client',label:"Nom du client mandant",type:'text',required:true},
      {key:'remuneration',label:"Mode de rémunération du courtier (commission ou honoraires)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE COURTAGE EN ASSURANCE-VIE</h1><h2>COURTIER</h2><p>{{nom_courtier}} — Agrément n° {{num_agrement_courtier}}</p><h2>CLIENT</h2><p>{{nom_client}}</p><h2>MISSION</h2><p>Le courtier est mandaté pour rechercher, négocier et gérer les contrats d'assurance-vie les mieux adaptés aux besoins du client.</p><h2>RÉMUNÉRATION</h2><p>{{remuneration}}</p><h2>OBLIGATIONS</h2><p>Le courtier agit en toute indépendance et dans l'intérêt exclusif de son client, conformément aux règles du marché CIMA.</p></div>`
  },
  {
    code: 'assv_017', name: "Accord de service de réassurance vie", category: 'assurance',
    price: 10000, priceMax: 30000, description: "Traité de réassurance vie liant un assureur cédant à un réassureur pour le partage des risques importants.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 55,
    fieldsJson: F([
      {key:'nom_cedant',label:"Nom de la compagnie cédante",type:'text',required:true},
      {key:'nom_reassureur',label:"Nom du réassureur",type:'text',required:true},
      {key:'type_traite',label:"Type de traité (proportionnel / non proportionnel)",type:'text',required:true},
      {key:'taux_cession',label:"Taux de cession en réassurance (%)",type:'text',required:true},
      {key:'plein_retention',label:"Plein de rétention de la cédante (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>TRAITÉ DE RÉASSURANCE VIE</h1><h2>PARTIES</h2><p><strong>Cédante :</strong> {{nom_cedant}}</p><p><strong>Réassureur :</strong> {{nom_reassureur}}</p><h2>TYPE DE TRAITÉ</h2><p>{{type_traite}} — Taux de cession : {{taux_cession}}%</p><h2>RÉTENTION</h2><p>Plein de rétention de la cédante : {{plein_retention}} FCFA par tête assurée.</p><h2>DISPOSITIONS GÉNÉRALES</h2><p>Le présent traité est soumis aux usages internationaux de la réassurance et aux dispositions du Code CIMA applicables.</p></div>`
  },
  {
    code: 'assv_018', name: "Accord de service de notation solvabilité assureur-vie", category: 'assurance',
    price: 9000, priceMax: 25000, description: "Convention de mission de notation de la solvabilité d'une compagnie d'assurance-vie, sur le modèle des autorités de contrôle africaines.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 50,
    fieldsJson: F([
      {key:'nom_assureur',label:"Nom de la compagnie d'assurance évaluée",type:'text',required:true},
      {key:'nom_agence',label:"Nom de l'agence de notation",type:'text',required:true},
      {key:'perimetre_notation',label:"Périmètre de la notation (branches, marchés)",type:'textarea',required:true},
      {key:'date_remise_rapport',label:"Date prévue de remise du rapport",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE NOTATION SOLVABILITÉ ASSUREUR-VIE</h1><h2>PARTIES</h2><p><strong>Assureur évalué :</strong> {{nom_assureur}}</p><p><strong>Agence de notation :</strong> {{nom_agence}}</p><h2>PÉRIMÈTRE</h2><p>{{perimetre_notation}}</p><h2>CALENDRIER</h2><p>Le rapport de notation sera remis le {{date_remise_rapport}}.</p><h2>MÉTHODOLOGIE</h2><p>La notation est réalisée selon une méthodologie reconnue, intégrant les exigences de solvabilité CIMA et les standards internationaux applicables en Afrique.</p></div>`
  },
  {
    code: 'assv_019', name: "Accord de service de gestion d'un fonds de pension", category: 'assurance',
    price: 10000, priceMax: 30000, description: "Convention confiant à un gestionnaire agréé la gestion administrative et financière d'un fonds de pension.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 58,
    fieldsJson: F([
      {key:'nom_fonds',label:"Dénomination du fonds de pension",type:'text',required:true},
      {key:'nom_gestionnaire',label:"Nom de la société de gestion",type:'text',required:true},
      {key:'actif_sous_gestion',label:"Actif total sous gestion (FCFA)",type:'text',required:true},
      {key:'frais_gestion',label:"Frais de gestion annuels (%)",type:'text',required:true},
      {key:'objectif_rendement',label:"Objectif de rendement annuel (%)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE GESTION D'UN FONDS DE PENSION</h1><h2>PARTIES</h2><p><strong>Fonds :</strong> {{nom_fonds}}</p><p><strong>Gestionnaire :</strong> {{nom_gestionnaire}}</p><h2>GESTION</h2><p>Actif total sous gestion : {{actif_sous_gestion}} FCFA.</p><p>Frais de gestion : {{frais_gestion}}% par an.</p><p>Objectif de rendement : {{objectif_rendement}}% par an.</p><h2>OBLIGATIONS DU GESTIONNAIRE</h2><p>Gestion prudente et diversifiée, reporting trimestriel, respect des ratios de placement réglementaires.</p></div>`
  },
  {
    code: 'assv_020', name: "Accord de service de pilier 2 retraite (fonds de retraite professionnel supplémentaire)", category: 'assurance',
    price: 8000, priceMax: 22000, description: "Accord instituant un régime de retraite supplémentaire à cotisations définies pour les salariés d'une entreprise (pilier 2).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      {key:'nom_entreprise',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'nom_fonds',label:"Nom du fonds de retraite professionnel",type:'text',required:true},
      {key:'taux_patronal',label:"Taux de cotisation patronale (%)",type:'text',required:true},
      {key:'taux_salarial',label:"Taux de cotisation salariale (%)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE RÉGIME DE RETRAITE SUPPLÉMENTAIRE — PILIER 2</h1><h2>PARTIES</h2><p><strong>Entreprise :</strong> {{nom_entreprise}}</p><p><strong>Fonds de retraite :</strong> {{nom_fonds}}</p><h2>FINANCEMENT</h2><p>Cotisation patronale : {{taux_patronal}}% du salaire brut.</p><p>Cotisation salariale : {{taux_salarial}}% du salaire brut.</p><h2>PRESTATIONS</h2><p>À l'âge de la retraite, le salarié bénéficie d'un capital ou d'une rente viagère calculé(e) sur la base des droits acquis.</p></div>`
  },
  {
    code: 'assv_021', name: "Rapport de performance fonds d'assurance-vie", category: 'assurance',
    price: 4000, priceMax: 10000, description: "Rapport annuel de performance financière d'un fonds d'assurance-vie, à destination des souscripteurs.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 56,
    fieldsJson: F([
      {key:'nom_fonds',label:"Nom du fonds d'assurance-vie",type:'text',required:true},
      {key:'annee_rapport',label:"Année de référence du rapport",type:'text',required:true},
      {key:'rendement_annuel',label:"Rendement annuel net servi (%)",type:'text',required:true},
      {key:'commentaire_gestion',label:"Commentaire de gestion",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>RAPPORT ANNUEL DE PERFORMANCE — FONDS D'ASSURANCE-VIE</h1><h2>FONDS</h2><p>{{nom_fonds}} — Exercice {{annee_rapport}}</p><h2>PERFORMANCE</h2><p>Rendement annuel net servi aux souscripteurs : <strong>{{rendement_annuel}}%</strong></p><h2>COMMENTAIRE DE GESTION</h2><p>{{commentaire_gestion}}</p><h2>AVERTISSEMENT</h2><p>Les performances passées ne préjugent pas des performances futures. Ce rapport est fourni à titre indicatif.</p></div>`
  },
  {
    code: 'assv_022', name: "Plan de développement produit vie", category: 'assurance',
    price: 6000, priceMax: 16000, description: "Document de cadrage pour le développement d'un nouveau produit d'assurance vie destiné au marché africain.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 54,
    fieldsJson: F([
      {key:'nom_produit',label:"Nom du nouveau produit vie",type:'text',required:true},
      {key:'cible_marche',label:"Cible de marché visée",type:'text',required:true},
      {key:'proposition_valeur',label:"Proposition de valeur du produit",type:'textarea',required:true},
      {key:'date_lancement',label:"Date de lancement prévue",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT PRODUIT VIE</h1><h2>PRODUIT</h2><p><strong>Nom :</strong> {{nom_produit}}</p><p><strong>Cible :</strong> {{cible_marche}}</p><h2>PROPOSITION DE VALEUR</h2><p>{{proposition_valeur}}</p><h2>CALENDRIER</h2><p>Lancement prévu le {{date_lancement}}.</p><h2>ÉTAPES</h2><p>Étude de marché → Conception actuarielle → Validation CIMA → Distribution → Suivi de sinistralité.</p></div>`
  },
  {
    code: 'assv_023', name: "Accord de conformité CIMA assurance vie", category: 'assurance',
    price: 7000, priceMax: 20000, description: "Charte de mise en conformité d'une compagnie d'assurance vie avec les exigences réglementaires du Code CIMA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 59,
    fieldsJson: F([
      {key:'nom_compagnie',label:"Nom de la compagnie d'assurance",type:'text',required:true},
      {key:'responsable_conformite',label:"Nom du responsable conformité",type:'text',required:true},
      {key:'date_audit',label:"Date du dernier audit réglementaire",type:'date',required:true},
      {key:'ecarts_identifies',label:"Principaux écarts identifiés et plan de correction",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE CONFORMITÉ CIMA — ASSURANCE VIE</h1><h2>COMPAGNIE</h2><p>{{nom_compagnie}}</p><p><strong>Responsable conformité :</strong> {{responsable_conformite}}</p><h2>AUDIT</h2><p>Dernier audit réglementaire : {{date_audit}}</p><h2>PLAN DE CORRECTION</h2><p>{{ecarts_identifies}}</p><h2>ENGAGEMENT</h2><p>La direction s'engage à mettre en œuvre le plan de correction dans les délais impartis par la Commission Régionale de Contrôle des Assurances (CRCA) de la zone CIMA.</p></div>`
  },
  {
    code: 'assv_024', name: "Accord de partenariat banque-assurance (bancassurance)", category: 'assurance',
    price: 9000, priceMax: 26000, description: "Convention de partenariat bancassurance entre un établissement bancaire et une compagnie d'assurance pour la distribution de produits vie.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 69,
    fieldsJson: F([
      {key:'nom_banque',label:"Nom de la banque partenaire",type:'text',required:true},
      {key:'nom_assureur',label:"Nom de la compagnie d'assurance partenaire",type:'text',required:true},
      {key:'produits_distribues',label:"Produits d'assurance à distribuer",type:'textarea',required:true},
      {key:'commission_banque',label:"Taux de commission bancaire (%)",type:'text',required:true},
      {key:'duree_partenariat',label:"Durée du partenariat (années)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT BANCASSURANCE</h1><h2>PARTIES</h2><p><strong>Banque :</strong> {{nom_banque}}</p><p><strong>Assureur :</strong> {{nom_assureur}}</p><h2>PRODUITS</h2><p>{{produits_distribues}}</p><h2>RÉMUNÉRATION</h2><p>Commission bancaire : {{commission_banque}}% des primes collectées.</p><h2>DURÉE</h2><p>Partenariat conclu pour {{duree_partenariat}} ans, renouvelable par accord exprès.</p></div>`
  },
  {
    code: 'assv_025', name: "Charte de l'assurance-vie éthique et inclusive en Afrique", category: 'assurance',
    price: 3000, priceMax: 8000, description: "Charte d'engagement pour une assurance-vie éthique, inclusive et accessible aux populations à revenus modestes en Afrique francophone.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 52,
    fieldsJson: F([
      {key:'nom_signataire',label:"Nom de l'organisation signataire",type:'text',required:true},
      {key:'representant',label:"Nom et qualité du représentant",type:'text',required:true},
      {key:'date_signature',label:"Date de signature de la charte",type:'date',required:true},
      {key:'engagements_specifiques',label:"Engagements spécifiques de l'organisation",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>CHARTE DE L'ASSURANCE-VIE ÉTHIQUE ET INCLUSIVE EN AFRIQUE</h1><h2>SIGNATAIRE</h2><p>{{nom_signataire}}, représentée par {{representant}}</p><h2>DATE</h2><p>{{date_signature}}</p><h2>ENGAGEMENTS</h2><p>{{engagements_specifiques}}</p><h2>PRINCIPES FONDATEURS</h2><p>Accessibilité des primes aux populations à faibles revenus, transparence des contrats, lutte contre l'exclusion assurantielle, promotion de la micro-assurance et respect des cultures locales dans la désignation des bénéficiaires.</p></div>`
  },

  // ─── 25 templates Retraite/Protection sociale (préfixe ret2_) ───
  {
    code: 'ret2_001', name: "Accord de convention de retraite supplémentaire (entreprise)", category: 'rh_emploi',
    price: 7000, priceMax: 20000, description: "Convention instituant un régime de retraite supplémentaire à prestations définies au sein d'une entreprise.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'nom_entreprise',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'categories_beneficiaires',label:"Catégories de salariés bénéficiaires",type:'text',required:true},
      {key:'niveau_prestation',label:"Niveau de prestation garanti (% du dernier salaire)",type:'text',required:true},
      {key:'date_entree_vigueur',label:"Date d'entrée en vigueur",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CONVENTION DE RETRAITE SUPPLÉMENTAIRE ENTREPRISE</h1><h2>EMPLOYEUR</h2><p>{{nom_entreprise}}</p><h2>BÉNÉFICIAIRES</h2><p>{{categories_beneficiaires}}</p><h2>PRESTATION</h2><p>Rente viagère garantie représentant {{niveau_prestation}}% du dernier salaire de référence.</p><h2>ENTRÉE EN VIGUEUR</h2><p>{{date_entree_vigueur}}</p><h2>FINANCEMENT</h2><p>Régime à prestations définies, entièrement financé par l'employeur, géré par un fonds de pension agréé.</p></div>`
  },
  {
    code: 'ret2_002', name: "Accord de plan d'épargne retraite collectif (PERCO Afrique)", category: 'rh_emploi',
    price: 6000, priceMax: 18000, description: "Plan d'épargne retraite collectif permettant aux salariés de se constituer une épargne à long terme avec abondement de l'employeur.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 67,
    fieldsJson: F([
      {key:'nom_entreprise',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'plafond_versement_salarie',label:"Plafond de versement salarié annuel (FCFA)",type:'text',required:true},
      {key:'taux_abondement',label:"Taux d'abondement de l'employeur (%)",type:'text',required:true},
      {key:'gestionnaire_fonds',label:"Société de gestion du fonds",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>PLAN D'ÉPARGNE RETRAITE COLLECTIF (PERCO AFRIQUE)</h1><h2>EMPLOYEUR</h2><p>{{nom_entreprise}}</p><h2>FONCTIONNEMENT</h2><p>Versement salarié plafonné à {{plafond_versement_salarie}} FCFA par an.</p><p>Abondement de l'employeur : {{taux_abondement}}% des versements du salarié.</p><h2>GESTION</h2><p>Fonds géré par {{gestionnaire_fonds}} selon une allocation d'actifs diversifiée et prudente.</p><h2>DÉBLOCAGE</h2><p>L'épargne est disponible au départ à la retraite ou dans les cas de déblocage anticipé prévus par la réglementation.</p></div>`
  },
  {
    code: 'ret2_003', name: "Accord de contribution patronale au CNPS (cotisations sociales CI)", category: 'rh_emploi',
    price: 4000, priceMax: 10000, description: "Convention de régularisation et de versement des cotisations patronales et salariales à la Caisse Nationale de Prévoyance Sociale de Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 80,
    fieldsJson: F([
      {key:'nom_employeur',label:"Raison sociale de l'employeur",type:'text',required:true},
      {key:'num_immatriculation_cnps',label:"N° d'immatriculation CNPS",type:'text',required:true},
      {key:'masse_salariale',label:"Masse salariale brute déclarée (FCFA)",type:'text',required:true},
      {key:'periode_declaration',label:"Période de déclaration (mois/année)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE CONTRIBUTION PATRONALE AU CNPS</h1><h2>EMPLOYEUR</h2><p>{{nom_employeur}} — CNPS N° {{num_immatriculation_cnps}}</p><h2>DÉCLARATION</h2><p>Masse salariale brute déclarée pour la période {{periode_declaration}} : {{masse_salariale}} FCFA.</p><h2>COTISATIONS</h2><p>Les cotisations patronales et salariales sont calculées et versées conformément aux taux en vigueur fixés par la CNPS de Côte d'Ivoire.</p><h2>ENGAGEMENT</h2><p>L'employeur s'engage à verser les cotisations dans les délais légaux afin de préserver les droits à la retraite et aux prestations sociales de ses salariés.</p></div>`
  },
  {
    code: 'ret2_004', name: "Accord de convention de sécurité sociale (expatrié)", category: 'rh_emploi',
    price: 6000, priceMax: 16000, description: "Convention bilatérale de sécurité sociale réglant le statut d'un salarié expatrié en matière de retraite et de protection sociale.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 62,
    fieldsJson: F([
      {key:'nom_salarie',label:"Nom du salarié expatrié",type:'text',required:true},
      {key:'pays_origine',label:"Pays d'origine du salarié",type:'text',required:true},
      {key:'pays_accueil',label:"Pays d'accueil (Côte d'Ivoire ou autre)",type:'text',required:true},
      {key:'regime_applicable',label:"Régime de sécurité sociale applicable",type:'text',required:true},
      {key:'duree_detachement',label:"Durée du détachement",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CONVENTION DE SÉCURITÉ SOCIALE — SALARIÉ EXPATRIÉ</h1><h2>SALARIÉ</h2><p>{{nom_salarie}} — Nationalité : {{pays_origine}}</p><p>Pays d'accueil : {{pays_accueil}}</p><h2>RÉGIME APPLICABLE</h2><p>{{regime_applicable}}</p><h2>DURÉE</h2><p>Durée du détachement : {{duree_detachement}}.</p><h2>DROITS MAINTENUS</h2><p>Le salarié conserve ses droits acquis dans son pays d'origine pendant la durée du détachement, conformément à la convention bilatérale applicable.</p></div>`
  },
  {
    code: 'ret2_005', name: "Accord de portabilité des droits à la retraite (CEDEAO)", category: 'rh_emploi',
    price: 5000, priceMax: 14000, description: "Accord facilitant la portabilité des droits à la retraite des travailleurs migrants au sein de l'espace CEDEAO.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 58,
    fieldsJson: F([
      {key:'nom_travailleur',label:"Nom du travailleur migrant",type:'text',required:true},
      {key:'pays_emploi_precedent',label:"Pays d'emploi précédent (CEDEAO)",type:'text',required:true},
      {key:'pays_emploi_actuel',label:"Pays d'emploi actuel (CEDEAO)",type:'text',required:true},
      {key:'droits_transferes',label:"Droits à transférer (trimestres, capital, rente)",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PORTABILITÉ DES DROITS À LA RETRAITE — CEDEAO</h1><h2>TRAVAILLEUR</h2><p>{{nom_travailleur}}</p><p>Emploi précédent : {{pays_emploi_precedent}} → Emploi actuel : {{pays_emploi_actuel}}</p><h2>DROITS À TRANSFÉRER</h2><p>{{droits_transferes}}</p><h2>BASE LÉGALE</h2><p>Accord conclu dans le cadre du protocole CEDEAO sur la libre circulation des personnes et la portabilité des droits sociaux.</p></div>`
  },
  {
    code: 'ret2_006', name: "Accord de service de bilan retraite (simulation)", category: 'rh_emploi',
    price: 3500, priceMax: 9000, description: "Prestation de simulation et de bilan personnalisé des droits à la retraite d'un salarié.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'nom_salarie',label:"Nom du salarié",type:'text',required:true},
      {key:'date_naissance',label:"Date de naissance",type:'date',required:true},
      {key:'annees_cotisees',label:"Nombre d'années de cotisation validées",type:'text',required:true},
      {key:'salaire_moyen',label:"Salaire annuel moyen de référence (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>BILAN RETRAITE PERSONNALISÉ — SIMULATION</h1><h2>SALARIÉ</h2><p>{{nom_salarie}}, né(e) le {{date_naissance}}</p><h2>DROITS ACQUIS</h2><p>Années de cotisation : {{annees_cotisees}}</p><p>Salaire de référence : {{salaire_moyen}} FCFA</p><h2>ESTIMATION</h2><p>Sur la base des paramètres actuels, la pension estimée est calculée selon les règles de liquidation du régime obligatoire applicable.</p><h2>RECOMMANDATIONS</h2><p>Un accompagnement complémentaire est proposé pour optimiser le montant de la pension via des dispositifs supplémentaires.</p></div>`
  },
  {
    code: 'ret2_007', name: "Accord de plan de départ en retraite (PDR)", category: 'rh_emploi',
    price: 5000, priceMax: 14000, description: "Accord formalisant les modalités d'un départ en retraite anticipée ou à l'âge légal, avec indemnités et conditions.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 76,
    fieldsJson: F([
      {key:'nom_salarie',label:"Nom du salarié partant",type:'text',required:true},
      {key:'nom_employeur',label:"Nom de l'employeur",type:'text',required:true},
      {key:'date_depart',label:"Date effective de départ en retraite",type:'date',required:true},
      {key:'indemnite_depart',label:"Indemnité de départ en retraite (FCFA)",type:'text',required:true},
      {key:'conditions_particulieres',label:"Conditions particulières négociées",type:'textarea',required:false},
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉPART EN RETRAITE (PDR)</h1><h2>PARTIES</h2><p><strong>Salarié :</strong> {{nom_salarie}}</p><p><strong>Employeur :</strong> {{nom_employeur}}</p><h2>DÉPART</h2><p>Date effective de départ : {{date_depart}}</p><h2>INDEMNITÉ</h2><p>Indemnité de départ en retraite : {{indemnite_depart}} FCFA, calculée conformément au Code du Travail ivoirien et à la convention collective applicable.</p><h2>CONDITIONS PARTICULIÈRES</h2><p>{{conditions_particulieres}}</p></div>`
  },
  {
    code: 'ret2_008', name: "Accord de service d'accompagnement pré-retraite", category: 'rh_emploi',
    price: 4000, priceMax: 11000, description: "Prestation d'accompagnement des salariés en approche de la retraite : bilan, formation, orientation.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'nom_salarie',label:"Nom du salarié accompagné",type:'text',required:true},
      {key:'date_depart_prevu',label:"Date prévisionnelle de départ en retraite",type:'date',required:true},
      {key:'modules_accompagnement',label:"Modules d'accompagnement souscrits",type:'textarea',required:true},
      {key:'nom_prestataire',label:"Nom du prestataire d'accompagnement",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD D'ACCOMPAGNEMENT PRÉ-RETRAITE</h1><h2>BÉNÉFICIAIRE</h2><p>{{nom_salarie}} — Départ prévu le {{date_depart_prevu}}</p><h2>PRESTATAIRE</h2><p>{{nom_prestataire}}</p><h2>PROGRAMME</h2><p>{{modules_accompagnement}}</p><h2>OBJECTIFS</h2><p>Préparer sereinement la transition professionnelle, optimiser les droits à la retraite, et accompagner le salarié dans son nouveau projet de vie.</p></div>`
  },
  {
    code: 'ret2_009', name: "Accord de cumul emploi-retraite partielle", category: 'rh_emploi',
    price: 4000, priceMax: 10000, description: "Convention encadrant le cumul entre une activité salariée à temps partiel et la perception d'une pension de retraite.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'nom_retraite',label:"Nom du retraité-salarié",type:'text',required:true},
      {key:'nom_employeur',label:"Nom de l'employeur",type:'text',required:true},
      {key:'taux_activite',label:"Taux d'activité maintenu (%)",type:'text',required:true},
      {key:'montant_pension',label:"Montant de la pension perçue (FCFA/mois)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE CUMUL EMPLOI-RETRAITE PARTIELLE</h1><h2>PARTIES</h2><p><strong>Retraité-salarié :</strong> {{nom_retraite}}</p><p><strong>Employeur :</strong> {{nom_employeur}}</p><h2>MODALITÉS</h2><p>Taux d'activité maintenu : {{taux_activite}}% d'un temps plein.</p><p>Pension perçue : {{montant_pension}} FCFA par mois.</p><h2>CONDITIONS LÉGALES</h2><p>Le cumul est autorisé dans les limites fixées par la législation applicable, sans dépassement du plafond de revenus autorisé.</p></div>`
  },
  {
    code: 'ret2_010', name: "Accord de service de retraite progressive (temps partiel)", category: 'rh_emploi',
    price: 4000, priceMax: 10000, description: "Accord permettant à un salarié de réduire progressivement son temps de travail tout en percevant une fraction de sa pension.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'nom_salarie',label:"Nom du salarié",type:'text',required:true},
      {key:'nom_employeur',label:"Nom de l'employeur",type:'text',required:true},
      {key:'planning_reduction',label:"Planning de réduction du temps de travail",type:'textarea',required:true},
      {key:'date_retraite_totale',label:"Date prévue de retraite totale",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE RETRAITE PROGRESSIVE</h1><h2>PARTIES</h2><p><strong>Salarié :</strong> {{nom_salarie}}</p><p><strong>Employeur :</strong> {{nom_employeur}}</p><h2>PLANNING</h2><p>{{planning_reduction}}</p><h2>RETRAITE TOTALE</h2><p>Départ définitif en retraite prévu le {{date_retraite_totale}}.</p><h2>DROITS MAINTENUS</h2><p>Le salarié continue d'acquérir des droits à la retraite pendant la phase de retraite progressive.</p></div>`
  },
  {
    code: 'ret2_011', name: "Accord de service de pension alimentaire (divorce et retraite)", category: 'rh_emploi',
    price: 5000, priceMax: 13000, description: "Convention réglant les modalités de partage des droits à la retraite entre ex-époux lors d'un divorce.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 55,
    fieldsJson: F([
      {key:'nom_epoux_1',label:"Nom du premier ex-époux",type:'text',required:true},
      {key:'nom_epoux_2',label:"Nom du second ex-époux",type:'text',required:true},
      {key:'quote_part_pension',label:"Quote-part de pension attribuée (% ou montant FCFA)",type:'text',required:true},
      {key:'date_jugement_divorce',label:"Date du jugement de divorce",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTAGE DES DROITS À LA RETRAITE LORS D'UN DIVORCE</h1><h2>PARTIES</h2><p>{{nom_epoux_1}} et {{nom_epoux_2}}</p><h2>PARTAGE</h2><p>Quote-part de pension attribuée : {{quote_part_pension}}</p><h2>BASE LÉGALE</h2><p>Accord conclu conformément au jugement de divorce prononcé le {{date_jugement_divorce}} et aux dispositions légales régissant le partage des droits sociaux.</p></div>`
  },
  {
    code: 'ret2_012', name: "Accord de rachat de trimestres de retraite", category: 'rh_emploi',
    price: 4000, priceMax: 10000, description: "Demande et accord de rachat de périodes non cotisées pour améliorer les droits à la retraite d'un assuré.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'nom_assure',label:"Nom de l'assuré",type:'text',required:true},
      {key:'nombre_trimestres',label:"Nombre de trimestres à racheter",type:'text',required:true},
      {key:'periode_concernee',label:"Période concernée par le rachat",type:'text',required:true},
      {key:'cout_rachat',label:"Coût total du rachat (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE RACHAT DE TRIMESTRES DE RETRAITE</h1><h2>ASSURÉ</h2><p>{{nom_assure}}</p><h2>RACHAT</h2><p>Nombre de trimestres à racheter : {{nombre_trimestres}}</p><p>Période concernée : {{periode_concernee}}</p><p>Coût total du rachat : {{cout_rachat}} FCFA</p><h2>MODALITÉS DE PAIEMENT</h2><p>Le paiement peut être effectué en une seule fois ou échelonné sur une durée maximale fixée par la caisse de retraite compétente.</p></div>`
  },
  {
    code: 'ret2_013', name: "Accord de service de réversion de pension (conjoint survivant)", category: 'rh_emploi',
    price: 4000, priceMax: 10000, description: "Demande et convention de liquidation d'une pension de réversion au profit du conjoint survivant d'un retraité décédé.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 64,
    fieldsJson: F([
      {key:'nom_survivant',label:"Nom du conjoint survivant",type:'text',required:true},
      {key:'nom_defunt',label:"Nom du retraité décédé",type:'text',required:true},
      {key:'date_deces',label:"Date du décès",type:'date',required:true},
      {key:'taux_reversion',label:"Taux de réversion applicable (%)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PENSION DE RÉVERSION — CONJOINT SURVIVANT</h1><h2>DEMANDEUR</h2><p>{{nom_survivant}}, conjoint survivant de {{nom_defunt}}</p><h2>DÉCÈS</h2><p>Date du décès : {{date_deces}}</p><h2>PENSION</h2><p>Taux de réversion : {{taux_reversion}}% de la pension principale.</p><h2>PIÈCES REQUISES</h2><p>Acte de mariage, acte de décès, relevé de carrière du défunt, pièce d'identité du demandeur.</p></div>`
  },
  {
    code: 'ret2_014', name: "Accord de service d'assurance retraite complémentaire (modèle Afrique)", category: 'rh_emploi',
    price: 6000, priceMax: 16000, description: "Convention instituant un régime de retraite complémentaire inspiré des modèles ARRCO/AGIRC, adapté au contexte africain.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 63,
    fieldsJson: F([
      {key:'nom_entreprise',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'nom_institution',label:"Nom de l'institution de retraite complémentaire",type:'text',required:true},
      {key:'taux_cotisation_total',label:"Taux de cotisation total (%)",type:'text',required:true},
      {key:'repartition_patronal_salarial',label:"Répartition patronal/salarial",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE RETRAITE COMPLÉMENTAIRE — MODÈLE AFRIQUE</h1><h2>PARTIES</h2><p><strong>Entreprise :</strong> {{nom_entreprise}}</p><p><strong>Institution :</strong> {{nom_institution}}</p><h2>COTISATIONS</h2><p>Taux global : {{taux_cotisation_total}}%</p><p>Répartition : {{repartition_patronal_salarial}}</p><h2>DROITS</h2><p>Les cotisations génèrent des points de retraite complémentaire, convertibles en rente au moment du départ à la retraite selon la valeur du point en vigueur.</p></div>`
  },
  {
    code: 'ret2_015', name: "Accord de service de fonds de réserve pour les retraites (FRR)", category: 'rh_emploi',
    price: 9000, priceMax: 25000, description: "Convention régissant la création et la gestion d'un fonds de réserve destiné à sécuriser le financement à long terme des retraites.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 55,
    fieldsJson: F([
      {key:'nom_fonds',label:"Dénomination du fonds de réserve",type:'text',required:true},
      {key:'organisme_gestionnaire',label:"Organisme gestionnaire",type:'text',required:true},
      {key:'dotation_initiale',label:"Dotation initiale (FCFA)",type:'text',required:true},
      {key:'objectif_horizon',label:"Horizon d'investissement (années)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE GESTION DU FONDS DE RÉSERVE POUR LES RETRAITES (FRR)</h1><h2>FONDS</h2><p>{{nom_fonds}}</p><h2>GESTIONNAIRE</h2><p>{{organisme_gestionnaire}}</p><h2>CAPITALISATION</h2><p>Dotation initiale : {{dotation_initiale}} FCFA — Horizon d'investissement : {{objectif_horizon}} ans.</p><h2>GOUVERNANCE</h2><p>Conseil de surveillance paritaire, rapports annuels publiés, allocation d'actifs revue tous les trois ans.</p></div>`
  },
  {
    code: 'ret2_016', name: "Accord de service de plan de retraite individuellement financé (IRA Afrique)", category: 'rh_emploi',
    price: 5000, priceMax: 14000, description: "Plan de retraite individuel par capitalisation, librement souscrit par tout travailleur, inspiré du modèle IRA américain adapté à l'Afrique.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 61,
    fieldsJson: F([
      {key:'nom_souscripteur',label:"Nom du souscripteur",type:'text',required:true},
      {key:'versement_annuel',label:"Versement annuel programmé (FCFA)",type:'text',required:true},
      {key:'profil_investissement',label:"Profil d'investissement (prudent, équilibré, dynamique)",type:'text',required:true},
      {key:'age_disponibilite',label:"Âge de disponibilité des fonds",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>PLAN DE RETRAITE INDIVIDUELLEMENT FINANCÉ (IRA AFRIQUE)</h1><h2>SOUSCRIPTEUR</h2><p>{{nom_souscripteur}}</p><h2>ÉPARGNE</h2><p>Versement annuel : {{versement_annuel}} FCFA</p><p>Profil : {{profil_investissement}}</p><h2>DISPONIBILITÉ</h2><p>Les fonds sont disponibles à l'âge de {{age_disponibilite}} ans, sous forme de capital ou de rente.</p></div>`
  },
  {
    code: 'ret2_017', name: "Accord de service de gestion des pensions par capitalisation", category: 'rh_emploi',
    price: 8000, priceMax: 22000, description: "Convention de gestion d'un régime de retraite par capitalisation, opposée à la répartition, pour une entreprise ou un secteur professionnel.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 57,
    fieldsJson: F([
      {key:'nom_regime',label:"Nom du régime de capitalisation",type:'text',required:true},
      {key:'gestionnaire',label:"Société de gestion mandatée",type:'text',required:true},
      {key:'actif_total',label:"Actif total en capitalisation (FCFA)",type:'text',required:true},
      {key:'strategie_placement',label:"Stratégie de placement retenue",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE GESTION DES PENSIONS PAR CAPITALISATION</h1><h2>RÉGIME</h2><p>{{nom_regime}}</p><h2>GESTIONNAIRE</h2><p>{{gestionnaire}}</p><h2>ACTIF</h2><p>{{actif_total}} FCFA sous gestion.</p><h2>STRATÉGIE</h2><p>{{strategie_placement}}</p><h2>REPORTING</h2><p>Rapport de gestion semestriel remis au conseil d'administration du régime.</p></div>`
  },
  {
    code: 'ret2_018', name: "Accord de partenariat CNPS-employeur (convention)", category: 'rh_emploi',
    price: 5000, priceMax: 14000, description: "Convention de partenariat entre la CNPS de Côte d'Ivoire et un grand employeur pour la simplification des démarches sociales.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'nom_employeur',label:"Raison sociale de l'employeur",type:'text',required:true},
      {key:'num_adherent_cnps',label:"Numéro d'adhérent CNPS",type:'text',required:true},
      {key:'objet_partenariat',label:"Objet du partenariat",type:'textarea',required:true},
      {key:'date_signature',label:"Date de signature de la convention",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CONVENTION DE PARTENARIAT CNPS-EMPLOYEUR</h1><h2>PARTIES</h2><p><strong>CNPS Côte d'Ivoire</strong> et <strong>{{nom_employeur}}</strong> (N° adhérent : {{num_adherent_cnps}})</p><h2>OBJET</h2><p>{{objet_partenariat}}</p><h2>DATE</h2><p>Signée le {{date_signature}}.</p><h2>ENGAGEMENTS RÉCIPROQUES</h2><p>L'employeur s'engage à la déclaration et au paiement ponctuel des cotisations. La CNPS s'engage à un traitement accéléré des dossiers et à la mise à disposition d'un interlocuteur dédié.</p></div>`
  },
  {
    code: 'ret2_019', name: "Accord de gestion d'un régime de protection sociale d'entreprise", category: 'rh_emploi',
    price: 7000, priceMax: 20000, description: "Convention de gestion globale du régime de protection sociale d'une entreprise : santé, prévoyance, retraite.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'nom_entreprise',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'branches_couvertes',label:"Branches couvertes (santé, prévoyance, retraite)",type:'textarea',required:true},
      {key:'budget_annuel',label:"Budget annuel de protection sociale (FCFA)",type:'text',required:true},
      {key:'assureur_gestionnaire',label:"Assureur ou institution gestionnaire",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE GESTION DU RÉGIME DE PROTECTION SOCIALE D'ENTREPRISE</h1><h2>ENTREPRISE</h2><p>{{nom_entreprise}}</p><h2>COUVERTURE</h2><p>{{branches_couvertes}}</p><h2>BUDGET</h2><p>Budget annuel : {{budget_annuel}} FCFA</p><h2>GESTIONNAIRE</h2><p>{{assureur_gestionnaire}}</p><h2>GOUVERNANCE</h2><p>Comité paritaire de suivi trimestriel. Rapport annuel soumis à l'assemblée des représentants du personnel.</p></div>`
  },
  {
    code: 'ret2_020', name: "Accord de service d'audit social retraite", category: 'rh_emploi',
    price: 6000, priceMax: 16000, description: "Mission d'audit des obligations sociales et des régimes de retraite d'une entreprise, avec rapport de recommandations.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'nom_entreprise',label:"Nom de l'entreprise auditée",type:'text',required:true},
      {key:'nom_cabinet',label:"Nom du cabinet d'audit social",type:'text',required:true},
      {key:'perimetre_audit',label:"Périmètre de la mission d'audit",type:'textarea',required:true},
      {key:'date_remise_rapport',label:"Date de remise du rapport d'audit",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'AUDIT SOCIAL RETRAITE</h1><h2>PARTIES</h2><p><strong>Entreprise :</strong> {{nom_entreprise}}</p><p><strong>Cabinet :</strong> {{nom_cabinet}}</p><h2>PÉRIMÈTRE</h2><p>{{perimetre_audit}}</p><h2>LIVRABLE</h2><p>Rapport d'audit remis le {{date_remise_rapport}}, comprenant le diagnostic, les risques identifiés et les recommandations de mise en conformité.</p></div>`
  },
  {
    code: 'ret2_021', name: "Accord de service de formation des gestionnaires de paie (CNPS)", category: 'rh_emploi',
    price: 3500, priceMax: 9000, description: "Convention de formation des gestionnaires de paie sur les règles de cotisation et de déclaration à la CNPS de Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'nom_organisme_formation',label:"Nom de l'organisme de formation",type:'text',required:true},
      {key:'nom_entreprise_client',label:"Nom de l'entreprise cliente",type:'text',required:true},
      {key:'nombre_stagiaires',label:"Nombre de gestionnaires formés",type:'text',required:true},
      {key:'dates_formation',label:"Dates et durée de la formation",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE FORMATION DES GESTIONNAIRES DE PAIE — CNPS</h1><h2>PARTIES</h2><p><strong>Organisme de formation :</strong> {{nom_organisme_formation}}</p><p><strong>Entreprise cliente :</strong> {{nom_entreprise_client}}</p><h2>FORMATION</h2><p>Nombre de stagiaires : {{nombre_stagiaires}}</p><p>Dates et durée : {{dates_formation}}</p><h2>PROGRAMME</h2><p>Taux et assiettes de cotisation CNPS, télédéclaration, gestion des anomalies, droits aux prestations sociales des salariés.</p></div>`
  },
  {
    code: 'ret2_022', name: "Rapport de performance du fonds de retraite", category: 'rh_emploi',
    price: 4000, priceMax: 10000, description: "Rapport annuel de performance financière et sociale d'un fonds de retraite, à destination des ayants droit et administrateurs.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'nom_fonds',label:"Nom du fonds de retraite",type:'text',required:true},
      {key:'annee_rapport',label:"Exercice de référence",type:'text',required:true},
      {key:'rendement_fonds',label:"Rendement annuel du fonds (%)",type:'text',required:true},
      {key:'nombre_beneficiaires',label:"Nombre de bénéficiaires actifs",type:'text',required:true},
      {key:'commentaire_direction',label:"Commentaire de la direction du fonds",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>RAPPORT ANNUEL DE PERFORMANCE DU FONDS DE RETRAITE</h1><h2>FONDS</h2><p>{{nom_fonds}} — Exercice {{annee_rapport}}</p><h2>INDICATEURS CLÉS</h2><p>Rendement : {{rendement_fonds}}% — Bénéficiaires actifs : {{nombre_beneficiaires}}</p><h2>COMMENTAIRE</h2><p>{{commentaire_direction}}</p><h2>PERSPECTIVES</h2><p>Les projections actuarielles confirment la viabilité du fonds à l'horizon de 20 ans, sous réserve du maintien des contributions programmées.</p></div>`
  },
  {
    code: 'ret2_023', name: "Plan d'assainissement des régimes de protection sociale", category: 'rh_emploi',
    price: 8000, priceMax: 22000, description: "Document de planification pour l'assainissement financier et structurel d'un régime de protection sociale déficitaire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 52,
    fieldsJson: F([
      {key:'nom_regime',label:"Nom du régime concerné",type:'text',required:true},
      {key:'diagnostic_deficit',label:"Diagnostic du déficit et causes identifiées",type:'textarea',required:true},
      {key:'mesures_assainissement',label:"Mesures d'assainissement retenues",type:'textarea',required:true},
      {key:'horizon_retour_equilibre',label:"Horizon de retour à l'équilibre (années)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>PLAN D'ASSAINISSEMENT DU RÉGIME DE PROTECTION SOCIALE</h1><h2>RÉGIME</h2><p>{{nom_regime}}</p><h2>DIAGNOSTIC</h2><p>{{diagnostic_deficit}}</p><h2>MESURES</h2><p>{{mesures_assainissement}}</p><h2>HORIZON</h2><p>Retour à l'équilibre prévu dans {{horizon_retour_equilibre}} ans, sous condition de mise en œuvre intégrale du plan.</p></div>`
  },
  {
    code: 'ret2_024', name: "Accord de conformité législation CNPS et Code du travail CI", category: 'rh_emploi',
    price: 5000, priceMax: 14000, description: "Charte interne de conformité aux obligations légales en matière de CNPS et de droit du travail pour les employeurs ivoiriens.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 74,
    fieldsJson: F([
      {key:'nom_entreprise',label:"Raison sociale de l'entreprise",type:'text',required:true},
      {key:'responsable_rh',label:"Nom du responsable RH ou DRH",type:'text',required:true},
      {key:'date_mise_a_jour',label:"Date de mise à jour de la charte",type:'date',required:true},
      {key:'points_conformite',label:"Points de conformité vérifiés",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE CONFORMITÉ CNPS ET CODE DU TRAVAIL — CÔTE D'IVOIRE</h1><h2>ENTREPRISE</h2><p>{{nom_entreprise}}</p><p><strong>Responsable RH :</strong> {{responsable_rh}}</p><h2>MISE À JOUR</h2><p>{{date_mise_a_jour}}</p><h2>POINTS DE CONFORMITÉ</h2><p>{{points_conformite}}</p><h2>ENGAGEMENT</h2><p>L'entreprise s'engage à maintenir sa conformité aux exigences du Code du Travail ivoirien et aux règlements de la CNPS, sous peine des sanctions prévues par la loi.</p></div>`
  },
  {
    code: 'ret2_025', name: "Charte de la protection sociale universelle et de la retraite digne", category: 'rh_emploi',
    price: 3000, priceMax: 8000, description: "Charte d'engagement pour l'extension de la protection sociale universelle et l'accès à une retraite digne pour tous les travailleurs africains.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 54,
    fieldsJson: F([
      {key:'nom_organisation',label:"Nom de l'organisation signataire",type:'text',required:true},
      {key:'representant',label:"Nom et titre du représentant",type:'text',required:true},
      {key:'date_adhesion',label:"Date d'adhésion à la charte",type:'date',required:true},
      {key:'actions_engagees',label:"Actions concrètes engagées par l'organisation",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>CHARTE DE LA PROTECTION SOCIALE UNIVERSELLE ET DE LA RETRAITE DIGNE</h1><h2>SIGNATAIRE</h2><p>{{nom_organisation}}, représentée par {{representant}}</p><h2>DATE D'ADHÉSION</h2><p>{{date_adhesion}}</p><h2>ACTIONS</h2><p>{{actions_engagees}}</p><h2>PRINCIPES</h2><p>Extension de la couverture sociale à tous les travailleurs y compris informels, lutte contre la pauvreté des personnes âgées, financement durable et équitable des régimes de retraite, dignité et respect des aînés.</p></div>`
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
  console.log(`Batch 93b OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
