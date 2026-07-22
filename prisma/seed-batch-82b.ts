import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ── 25 templates Recrutement international (préfixe rec2_) ──
  {
    code: 'rec2_executive_search',
    name: "Accord de service de recrutement executive search (chasseur de tête)",
    category: 'rh_emploi', price: 8000, priceMax: 24000,
    description: "Accord encadrant la mission de chasse de têtes pour un poste de direction au sein d'une entreprise, conforme aux pratiques OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 80,
    fieldsJson: F([
      {key:'nom_cabinet',label:"Nom du cabinet de recrutement",type:'text',required:true},
      {key:'nom_entreprise',label:"Nom de l'entreprise cliente",type:'text',required:true},
      {key:'poste_cible',label:"Intitulé du poste à pourvoir",type:'text',required:true},
      {key:'honoraires',label:"Montant des honoraires (FCFA)",type:'text',required:true},
      {key:'delai_mission',label:"Délai de réalisation de la mission",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RECRUTEMENT EXECUTIVE SEARCH</h1><p>Entre <strong>{{nom_cabinet}}</strong> (ci-après «le Cabinet») et <strong>{{nom_entreprise}}</strong> (ci-après «le Client»), il est convenu ce qui suit :</p><h2>Article 1 – Objet de la mission</h2><p>Le Cabinet s'engage à identifier, approcher et présenter des candidats qualifiés pour le poste de <strong>{{poste_cible}}</strong> selon une approche directe (chasse de têtes).</p><h2>Article 2 – Honoraires</h2><p>Les honoraires convenus s'élèvent à <strong>{{honoraires}}</strong> FCFA, payables selon les modalités définies en annexe.</p><h2>Article 3 – Délai d'exécution</h2><p>La mission sera réalisée dans un délai de <strong>{{delai_mission}}</strong> à compter de la signature du présent accord.</p><h2>Article 4 – Confidentialité</h2><p>Les parties s'engagent à respecter la confidentialité des informations échangées dans le cadre de cette mission.</p><p>Fait à Abidjan, le <strong>{{date_signature}}</strong>.</p></div>`
  },
  {
    code: 'rec2_international',
    name: "Accord de service de recrutement international",
    category: 'rh_emploi', price: 7000, priceMax: 21000,
    description: "Convention de prestation pour le recrutement de talents à l'international destiné aux entreprises opérant en zone OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 75,
    fieldsJson: F([
      {key:'cabinet',label:"Cabinet de recrutement",type:'text',required:true},
      {key:'client',label:"Entreprise cliente",type:'text',required:true},
      {key:'pays_sourcing',label:"Pays de sourcing des candidats",type:'text',required:true},
      {key:'profil_recherche',label:"Profil recherché",type:'textarea',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RECRUTEMENT INTERNATIONAL</h1><p>Entre <strong>{{cabinet}}</strong> et <strong>{{client}}</strong>, il est convenu ce qui suit :</p><h2>Article 1 – Objet</h2><p>Le Cabinet assure le recrutement international de profils en provenance de <strong>{{pays_sourcing}}</strong> pour le compte du Client.</p><h2>Article 2 – Profil recherché</h2><p>{{profil_recherche}}</p><h2>Article 3 – Rémunération</h2><p>Les honoraires s'élèvent à <strong>{{honoraires}}</strong> FCFA.</p><h2>Article 4 – Droit applicable</h2><p>Le présent accord est soumis au droit ivoirien et aux dispositions de l'Acte Uniforme OHADA relatif au droit commercial général.</p><p>Fait à Abidjan, le <strong>{{date_contrat}}</strong>.</p></div>`
  },
  {
    code: 'rec2_masse',
    name: "Accord de service de recrutement de masse (volume hiring)",
    category: 'rh_emploi', price: 6000, priceMax: 18000,
    description: "Contrat de prestation pour le recrutement en volume de personnels d'exécution ou techniciens, adapté au contexte ivoirien.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'cabinet',label:"Cabinet prestataire",type:'text',required:true},
      {key:'client',label:"Entreprise cliente",type:'text',required:true},
      {key:'nombre_postes',label:"Nombre de postes à pourvoir",type:'text',required:true},
      {key:'type_profil',label:"Type de profil requis",type:'text',required:true},
      {key:'honoraires',label:"Honoraires globaux (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de démarrage",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RECRUTEMENT DE MASSE</h1><p>Entre <strong>{{cabinet}}</strong> et <strong>{{client}}</strong> :</p><h2>Article 1 – Objet</h2><p>Recrutement de <strong>{{nombre_postes}}</strong> postes de type <strong>{{type_profil}}</strong> dans le cadre d'un volume hiring.</p><h2>Article 2 – Engagements du Cabinet</h2><p>Le Cabinet s'engage à traiter les candidatures, organiser les entretiens collectifs et présenter des shortlists validées.</p><h2>Article 3 – Honoraires</h2><p>Montant global : <strong>{{honoraires}}</strong> FCFA, payable par tranche selon le tableau d'avancement.</p><p>Démarrage : <strong>{{date_debut}}</strong>.</p></div>`
  },
  {
    code: 'rec2_digital',
    name: "Accord de service de recrutement digital (job board)",
    category: 'rh_emploi', price: 3000, priceMax: 9000,
    description: "Convention d'utilisation d'une plateforme digitale de recrutement (job board) pour la diffusion d'offres d'emploi en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'plateforme',label:"Nom de la plateforme digitale",type:'text',required:true},
      {key:'client',label:"Entreprise cliente",type:'text',required:true},
      {key:'offres_incluses',label:"Nombre d'offres incluses",type:'text',required:true},
      {key:'duree_abonnement',label:"Durée de l'abonnement",type:'text',required:true},
      {key:'montant',label:"Montant de l'abonnement (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RECRUTEMENT DIGITAL – JOB BOARD</h1><p>Entre <strong>{{plateforme}}</strong> et <strong>{{client}}</strong> :</p><h2>Article 1 – Accès à la plateforme</h2><p>Le Client bénéficie d'un accès à la plateforme pour diffuser <strong>{{offres_incluses}}</strong> offres d'emploi pendant <strong>{{duree_abonnement}}</strong>.</p><h2>Article 2 – Tarification</h2><p>Montant : <strong>{{montant}}</strong> FCFA.</p><h2>Article 3 – Propriété des données</h2><p>Les données candidats collectées via la plateforme restent la propriété de l'opérateur conformément à la loi ivoirienne sur la protection des données personnelles.</p></div>`
  },
  {
    code: 'rec2_psychometrie',
    name: "Accord de service d'évaluation psychométrique (tests RH)",
    category: 'rh_emploi', price: 4000, priceMax: 12000,
    description: "Contrat de prestation pour la réalisation de tests psychométriques dans le cadre d'un processus de recrutement ou de développement RH.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire d'évaluation",type:'text',required:true},
      {key:'client',label:"Entreprise cliente",type:'text',required:true},
      {key:'nombre_candidats',label:"Nombre de candidats à évaluer",type:'text',required:true},
      {key:'outils_utilises',label:"Outils/tests utilisés",type:'textarea',required:true},
      {key:'cout_unitaire',label:"Coût unitaire par candidat (FCFA)",type:'text',required:true},
      {key:'date_evaluation',label:"Date prévue d'évaluation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ÉVALUATION PSYCHOMÉTRIQUE</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong> :</p><h2>Article 1 – Objet</h2><p>Évaluation psychométrique de <strong>{{nombre_candidats}}</strong> candidats à l'aide des outils suivants : {{outils_utilises}}.</p><h2>Article 2 – Tarification</h2><p>Coût unitaire : <strong>{{cout_unitaire}}</strong> FCFA par candidat.</p><h2>Article 3 – Restitution</h2><p>Les rapports d'évaluation seront remis au Client dans un délai de 5 jours ouvrés après la session du <strong>{{date_evaluation}}</strong>.</p><h2>Article 4 – Confidentialité</h2><p>Les résultats sont strictement confidentiels et ne peuvent être communiqués qu'aux personnes habilitées.</p></div>`
  },
  {
    code: 'rec2_background_check',
    name: "Accord de service de vérification d'antécédents (background check)",
    category: 'rh_emploi', price: 3500, priceMax: 10500,
    description: "Convention de prestation pour la vérification des antécédents professionnels, académiques et judiciaires d'un candidat en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'agence',label:"Agence de vérification",type:'text',required:true},
      {key:'client',label:"Entreprise cliente",type:'text',required:true},
      {key:'candidat',label:"Nom du candidat concerné",type:'text',required:true},
      {key:'elements_verifies',label:"Éléments à vérifier",type:'textarea',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE VÉRIFICATION D'ANTÉCÉDENTS</h1><p>Entre <strong>{{agence}}</strong> et <strong>{{client}}</strong> :</p><h2>Article 1 – Objet</h2><p>Vérification des antécédents de <strong>{{candidat}}</strong> portant sur : {{elements_verifies}}.</p><h2>Article 2 – Conformité légale</h2><p>Les vérifications sont effectuées conformément à la législation ivoirienne en vigueur et avec le consentement écrit du candidat.</p><h2>Article 3 – Honoraires</h2><p>Montant : <strong>{{honoraires}}</strong> FCFA, payable à la remise du rapport.</p></div>`
  },
  {
    code: 'rec2_assessment_center',
    name: "Accord de service d'assessment center",
    category: 'rh_emploi', price: 5000, priceMax: 15000,
    description: "Contrat d'organisation d'un assessment center pour l'évaluation de candidats internes ou externes dans un contexte de recrutement ou promotion.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 67,
    fieldsJson: F([
      {key:'cabinet',label:"Cabinet organisateur",type:'text',required:true},
      {key:'client',label:"Entreprise cliente",type:'text',required:true},
      {key:'nombre_participants',label:"Nombre de participants",type:'text',required:true},
      {key:'date_session',label:"Date de la session",type:'date',required:true},
      {key:'exercices',label:"Exercices prévus",type:'textarea',required:true},
      {key:'cout_total',label:"Coût total (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ASSESSMENT CENTER</h1><p>Entre <strong>{{cabinet}}</strong> et <strong>{{client}}</strong> :</p><h2>Article 1 – Organisation</h2><p>Le Cabinet organise un assessment center pour <strong>{{nombre_participants}}</strong> participants le <strong>{{date_session}}</strong>.</p><h2>Article 2 – Exercices</h2><p>{{exercices}}</p><h2>Article 3 – Livrables</h2><p>Le Cabinet remet un rapport individuel par participant dans les 7 jours ouvrés suivant la session.</p><h2>Article 4 – Coût</h2><p>Coût total : <strong>{{cout_total}}</strong> FCFA.</p></div>`
  },
  {
    code: 'rec2_mise_disposition',
    name: "Accord de service de mise à disposition de personnel (interim)",
    category: 'rh_emploi', price: 4500, priceMax: 13500,
    description: "Contrat de mise à disposition temporaire de personnel entre une agence et une entreprise utilisatrice, conforme au Code du Travail ivoirien.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'agence',label:"Agence de travail temporaire",type:'text',required:true},
      {key:'entreprise_utilisatrice',label:"Entreprise utilisatrice",type:'text',required:true},
      {key:'poste',label:"Poste du salarié mis à disposition",type:'text',required:true},
      {key:'duree',label:"Durée de la mise à disposition",type:'text',required:true},
      {key:'taux_horaire',label:"Taux horaire facturable (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de prise de poste",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE MISE À DISPOSITION DE PERSONNEL</h1><p>Entre <strong>{{agence}}</strong> (agence de travail temporaire) et <strong>{{entreprise_utilisatrice}}</strong> (entreprise utilisatrice) :</p><h2>Article 1 – Objet</h2><p>Mise à disposition d'un(e) salarié(e) au poste de <strong>{{poste}}</strong> pour une durée de <strong>{{duree}}</strong> à compter du <strong>{{date_debut}}</strong>.</p><h2>Article 2 – Facturation</h2><p>Taux horaire facturable : <strong>{{taux_horaire}}</strong> FCFA.</p><h2>Article 3 – Obligations de l'entreprise utilisatrice</h2><p>L'entreprise utilisatrice assure les conditions de travail conformes au Code du Travail ivoirien et veille à la sécurité du salarié mis à disposition.</p></div>`
  },
  {
    code: 'rec2_interim',
    name: "Accord de service de travail temporaire (agence d'intérim)",
    category: 'rh_emploi', price: 4000, priceMax: 12000,
    description: "Convention de travail temporaire entre une agence d'intérim et une entreprise utilisatrice, encadrée par la réglementation ivoirienne.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'agence',label:"Agence d'intérim",type:'text',required:true},
      {key:'utilisateur',label:"Entreprise utilisatrice",type:'text',required:true},
      {key:'motif',label:"Motif du recours à l'intérim",type:'text',required:true},
      {key:'qualification',label:"Qualification du salarié intérimaire",type:'text',required:true},
      {key:'duree_mission',label:"Durée de la mission",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE MISE À DISPOSITION – TRAVAIL TEMPORAIRE</h1><p>Entre <strong>{{agence}}</strong> et <strong>{{utilisateur}}</strong> :</p><h2>Article 1 – Motif</h2><p>Le recours au travail temporaire est justifié par : <strong>{{motif}}</strong>.</p><h2>Article 2 – Qualification</h2><p>Le salarié intérimaire possède la qualification suivante : <strong>{{qualification}}</strong>.</p><h2>Article 3 – Durée</h2><p>Mission du <strong>{{date_debut}}</strong> pour une durée de <strong>{{duree_mission}}</strong>, renouvelable dans les limites légales.</p></div>`
  },
  {
    code: 'rec2_pret_main_oeuvre',
    name: "Accord de service de prêt de main-d'oeuvre",
    category: 'rh_emploi', price: 3500, priceMax: 10500,
    description: "Convention de prêt de main-d'oeuvre à but non lucratif entre deux entités, encadrée par la législation ivoirienne du travail.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'entreprise_preteur',label:"Entreprise prêteuse",type:'text',required:true},
      {key:'entreprise_utilisatrice',label:"Entreprise utilisatrice",type:'text',required:true},
      {key:'salarie',label:"Nom du salarié mis à disposition",type:'text',required:true},
      {key:'duree',label:"Durée du prêt",type:'text',required:true},
      {key:'date_debut',label:"Date de début du prêt",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONVENTION DE PRÊT DE MAIN-D'OEUVRE</h1><p>Entre <strong>{{entreprise_preteur}}</strong> (entreprise prêteuse) et <strong>{{entreprise_utilisatrice}}</strong> (entreprise utilisatrice) :</p><h2>Article 1 – Objet</h2><p>Mise à disposition à titre non lucratif de <strong>{{salarie}}</strong> pour une durée de <strong>{{duree}}</strong> à compter du <strong>{{date_debut}}</strong>.</p><h2>Article 2 – Maintien du contrat de travail</h2><p>Le salarié mis à disposition demeure lié à l'entreprise prêteuse par son contrat de travail initial, dont les garanties sont maintenues.</p><h2>Article 3 – Accord du salarié</h2><p>Le présent accord a été signé avec le consentement écrit du salarié concerné, conformément au Code du Travail ivoirien.</p></div>`
  },
  {
    code: 'rec2_sst_rh',
    name: "Accord de service de sous-traitance de ressources humaines",
    category: 'rh_emploi', price: 5000, priceMax: 15000,
    description: "Contrat de sous-traitance de la fonction RH à un prestataire externe spécialisé, dans le cadre d'un partenariat d'externalisation en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire RH externe",type:'text',required:true},
      {key:'client',label:"Entreprise cliente",type:'text',required:true},
      {key:'fonctions_externalisees',label:"Fonctions RH externalisées",type:'textarea',required:true},
      {key:'duree_contrat',label:"Durée du contrat",type:'text',required:true},
      {key:'montant_mensuel',label:"Montant mensuel (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SOUS-TRAITANCE DE RESSOURCES HUMAINES</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong> :</p><h2>Article 1 – Périmètre</h2><p>Les fonctions RH externalisées sont les suivantes : {{fonctions_externalisees}}.</p><h2>Article 2 – Durée</h2><p>Le présent accord est conclu pour une durée de <strong>{{duree_contrat}}</strong>.</p><h2>Article 3 – Rémunération</h2><p>Montant mensuel forfaitaire : <strong>{{montant_mensuel}}</strong> FCFA.</p><h2>Article 4 – Confidentialité et RGPD</h2><p>Le prestataire s'engage à respecter la confidentialité des données RH conformément aux lois ivoiriennes applicables.</p></div>`
  },
  {
    code: 'rec2_eor',
    name: "Accord de service d'employeur de référence (EOR)",
    category: 'rh_emploi', price: 6000, priceMax: 18000,
    description: "Convention d'Employer of Record (EOR) permettant à une entreprise étrangère d'employer légalement un salarié en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'eor',label:"Entité EOR en Côte d'Ivoire",type:'text',required:true},
      {key:'client',label:"Entreprise cliente (donneur d'ordre)",type:'text',required:true},
      {key:'salarie',label:"Nom du salarié employé",type:'text',required:true},
      {key:'salaire_brut',label:"Salaire brut mensuel (FCFA)",type:'text',required:true},
      {key:'frais_gestion',label:"Frais de gestion EOR mensuels (FCFA)",type:'text',required:true},
      {key:'date_embauche',label:"Date d'embauche",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D'EMPLOYER OF RECORD (EOR)</h1><p>Entre <strong>{{eor}}</strong> (EOR) et <strong>{{client}}</strong> (donneur d'ordre) :</p><h2>Article 1 – Rôle de l'EOR</h2><p>L'EOR est l'employeur légal de <strong>{{salarie}}</strong> en Côte d'Ivoire. Il assume les obligations d'employeur au sens du Code du Travail ivoirien.</p><h2>Article 2 – Rémunération</h2><p>Salaire brut mensuel : <strong>{{salaire_brut}}</strong> FCFA. Frais de gestion EOR : <strong>{{frais_gestion}}</strong> FCFA/mois.</p><h2>Article 3 – Direction fonctionnelle</h2><p>Le Client assure la direction fonctionnelle du salarié, sans être son employeur légal.</p><p>Date d'embauche : <strong>{{date_embauche}}</strong>.</p></div>`
  },
  {
    code: 'rec2_gpec_global',
    name: "Accord de service de GRH à l'international (GPEC globale)",
    category: 'rh_emploi', price: 7000, priceMax: 21000,
    description: "Accord encadrant la Gestion Prévisionnelle des Emplois et des Compétences (GPEC) à l'échelle internationale pour un groupe présent en Afrique.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'cabinet',label:"Cabinet conseil RH",type:'text',required:true},
      {key:'groupe',label:"Groupe d'entreprises bénéficiaire",type:'text',required:true},
      {key:'pays_couverts',label:"Pays couverts par la GPEC",type:'text',required:true},
      {key:'duree_mission',label:"Durée de la mission",type:'text',required:true},
      {key:'honoraires',label:"Honoraires totaux (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GPEC GLOBALE</h1><p>Entre <strong>{{cabinet}}</strong> et le groupe <strong>{{groupe}}</strong> :</p><h2>Article 1 – Périmètre géographique</h2><p>La GPEC couvre les pays suivants : <strong>{{pays_couverts}}</strong>.</p><h2>Article 2 – Livrables</h2><p>Le Cabinet remet un diagnostic des emplois et compétences, une cartographie des métiers et un plan d'action triennal.</p><h2>Article 3 – Durée et honoraires</h2><p>Durée de la mission : <strong>{{duree_mission}}</strong>. Honoraires : <strong>{{honoraires}}</strong> FCFA.</p></div>`
  },
  {
    code: 'rec2_expatriation',
    name: "Accord de service de gestion de l'expatriation",
    category: 'rh_emploi', price: 5500, priceMax: 16500,
    description: "Convention de prestation pour la gestion complète du cycle d'expatriation d'un salarié, depuis la préparation au départ jusqu'au suivi sur place.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire en mobilité internationale",type:'text',required:true},
      {key:'entreprise',label:"Entreprise mandante",type:'text',required:true},
      {key:'expatrie',label:"Nom de l'expatrié",type:'text',required:true},
      {key:'pays_destination',label:"Pays de destination",type:'text',required:true},
      {key:'duree_expatriation',label:"Durée de l'expatriation",type:'text',required:true},
      {key:'honoraires',label:"Honoraires de gestion (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GESTION DE L'EXPATRIATION</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{entreprise}}</strong> :</p><h2>Article 1 – Salarié concerné</h2><p>Le présent accord concerne l'expatriation de <strong>{{expatrie}}</strong> vers <strong>{{pays_destination}}</strong> pour une durée de <strong>{{duree_expatriation}}</strong>.</p><h2>Article 2 – Prestations incluses</h2><p>Conseil fiscal, aide à la relocation, suivi administratif, accompagnement de la famille et gestion du retour.</p><h2>Article 3 – Honoraires</h2><p>Montant : <strong>{{honoraires}}</strong> FCFA.</p></div>`
  },
  {
    code: 'rec2_rapatriement',
    name: "Accord de service de rapatriement d'expatrié",
    category: 'rh_emploi', price: 4500, priceMax: 13500,
    description: "Contrat de prestation pour l'organisation et le suivi du rapatriement d'un salarié expatrié vers son pays d'origine ou un nouveau pays d'affectation.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire de rapatriement",type:'text',required:true},
      {key:'entreprise',label:"Entreprise mandante",type:'text',required:true},
      {key:'expatrie',label:"Nom de l'expatrié",type:'text',required:true},
      {key:'pays_retour',label:"Pays de retour",type:'text',required:true},
      {key:'date_rapatriement',label:"Date prévue de rapatriement",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RAPATRIEMENT D'EXPATRIÉ</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{entreprise}}</strong> :</p><h2>Article 1 – Objet</h2><p>Organisation du rapatriement de <strong>{{expatrie}}</strong> vers <strong>{{pays_retour}}</strong> prévu le <strong>{{date_rapatriement}}</strong>.</p><h2>Article 2 – Prestations</h2><p>Transport, déménagement des effets personnels, clôture administrative dans le pays hôte, réintégration professionnelle.</p><h2>Article 3 – Responsabilités</h2><p>L'entreprise mandante reste responsable des charges salariales jusqu'à la date effective du rapatriement.</p></div>`
  },
  {
    code: 'rec2_visa_permis',
    name: "Accord de service de visa et permis de travail",
    category: 'rh_emploi', price: 3500, priceMax: 10500,
    description: "Convention de prestation pour l'obtention de visas et permis de travail pour des salariés étrangers en Côte d'Ivoire ou des salariés ivoiriens à l'étranger.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 64,
    fieldsJson: F([
      {key:'cabinet',label:"Cabinet spécialisé en immigration",type:'text',required:true},
      {key:'entreprise',label:"Entreprise mandante",type:'text',required:true},
      {key:'beneficiaire',label:"Nom du bénéficiaire",type:'text',required:true},
      {key:'type_document',label:"Type de document requis (visa/permis)",type:'text',required:true},
      {key:'honoraires',label:"Honoraires (FCFA, hors taxes officielles)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – VISA ET PERMIS DE TRAVAIL</h1><p>Entre <strong>{{cabinet}}</strong> et <strong>{{entreprise}}</strong> :</p><h2>Article 1 – Mission</h2><p>Constitution et dépôt du dossier de demande de <strong>{{type_document}}</strong> pour <strong>{{beneficiaire}}</strong> auprès des autorités compétentes.</p><h2>Article 2 – Délai</h2><p>Le délai d'obtention dépend des administrations concernées et ne saurait engager la responsabilité du Cabinet en cas de retard imputable aux autorités.</p><h2>Article 3 – Honoraires</h2><p>Honoraires du Cabinet : <strong>{{honoraires}}</strong> FCFA (taxes officielles non incluses, refacturées au coût réel).</p></div>`
  },
  {
    code: 'rec2_relocation',
    name: "Accord de service de relocation (installation expatrié)",
    category: 'rh_emploi', price: 4000, priceMax: 12000,
    description: "Convention de prestation pour faciliter l'installation d'un expatrié et de sa famille dans le pays d'accueil (logement, école, démarches administratives).",
    templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'agence_relocation',label:"Agence de relocation",type:'text',required:true},
      {key:'entreprise',label:"Entreprise mandante",type:'text',required:true},
      {key:'expatrie',label:"Nom de l'expatrié",type:'text',required:true},
      {key:'ville_accueil',label:"Ville d'accueil",type:'text',required:true},
      {key:'services_inclus',label:"Services inclus dans le package",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RELOCATION</h1><p>Entre <strong>{{agence_relocation}}</strong> et <strong>{{entreprise}}</strong> :</p><h2>Article 1 – Bénéficiaire</h2><p>Services de relocation pour <strong>{{expatrie}}</strong> s'installant à <strong>{{ville_accueil}}</strong>.</p><h2>Article 2 – Services inclus</h2><p>{{services_inclus}}</p><h2>Article 3 – Engagements de l'agence</h2><p>L'agence assure un accompagnement personnalisé et met à disposition un consultant dédié pendant toute la durée de l'installation.</p></div>`
  },
  {
    code: 'rec2_interculturel',
    name: "Accord de service de formation interculturelle",
    category: 'rh_emploi', price: 3000, priceMax: 9000,
    description: "Contrat de formation interculturelle destiné à préparer les équipes ou expatriés à travailler dans un environnement multiculturel africain.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'organisme',label:"Organisme de formation",type:'text',required:true},
      {key:'client',label:"Entreprise cliente",type:'text',required:true},
      {key:'nombre_apprenants',label:"Nombre de participants",type:'text',required:true},
      {key:'duree_formation',label:"Durée de la formation",type:'text',required:true},
      {key:'cout',label:"Coût de la formation (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FORMATION INTERCULTURELLE</h1><p>Entre <strong>{{organisme}}</strong> et <strong>{{client}}</strong> :</p><h2>Article 1 – Programme</h2><p>Formation interculturelle pour <strong>{{nombre_apprenants}}</strong> participants, d'une durée de <strong>{{duree_formation}}</strong>, axée sur les pratiques professionnelles en Afrique de l'Ouest.</p><h2>Article 2 – Méthodes pédagogiques</h2><p>Simulations, études de cas locaux, jeux de rôles et apports théoriques sur les cultures d'affaires de la sous-région.</p><h2>Article 3 – Coût</h2><p>Montant : <strong>{{cout}}</strong> FCFA.</p></div>`
  },
  {
    code: 'rec2_diversite',
    name: "Accord de service de gestion de la diversité (D&I)",
    category: 'rh_emploi', price: 4000, priceMax: 12000,
    description: "Accord de prestation pour le déploiement d'une politique de diversité et inclusion (D&I) au sein d'une organisation en Afrique francophone.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'cabinet',label:"Cabinet conseil D&I",type:'text',required:true},
      {key:'client',label:"Entreprise cliente",type:'text',required:true},
      {key:'axes_prioritaires',label:"Axes prioritaires de la politique D&I",type:'textarea',required:true},
      {key:'duree_mission',label:"Durée de la mission",type:'text',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – GESTION DE LA DIVERSITÉ ET INCLUSION</h1><p>Entre <strong>{{cabinet}}</strong> et <strong>{{client}}</strong> :</p><h2>Article 1 – Axes prioritaires</h2><p>{{axes_prioritaires}}</p><h2>Article 2 – Livrables</h2><p>Diagnostic D&I, plan d'action, formation des managers et indicateurs de suivi.</p><h2>Article 3 – Durée et honoraires</h2><p>Durée : <strong>{{duree_mission}}</strong>. Honoraires : <strong>{{honoraires}}</strong> FCFA.</p></div>`
  },
  {
    code: 'rec2_equite_salariale',
    name: "Accord de service d'équité salariale globale",
    category: 'rh_emploi', price: 5000, priceMax: 15000,
    description: "Convention de prestation pour un audit et un plan d'action en matière d'équité salariale à l'échelle internationale, incluant les filiales africaines.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'cabinet',label:"Cabinet spécialisé en rémunération",type:'text',required:true},
      {key:'groupe',label:"Groupe d'entreprises",type:'text',required:true},
      {key:'perimetre',label:"Périmètre de l'audit",type:'textarea',required:true},
      {key:'duree',label:"Durée de la mission",type:'text',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ÉQUITÉ SALARIALE GLOBALE</h1><p>Entre <strong>{{cabinet}}</strong> et le groupe <strong>{{groupe}}</strong> :</p><h2>Article 1 – Périmètre de l'audit</h2><p>{{perimetre}}</p><h2>Article 2 – Méthodologie</h2><p>Analyse comparative des grilles de rémunération, identification des écarts non justifiés et recommandations de mise en conformité.</p><h2>Article 3 – Durée et honoraires</h2><p>Durée : <strong>{{duree}}</strong>. Honoraires : <strong>{{honoraires}}</strong> FCFA.</p></div>`
  },
  {
    code: 'rec2_rapport_perf_cabinet',
    name: "Rapport de performance cabinet de recrutement",
    category: 'rh_emploi', price: 2000, priceMax: 6000,
    description: "Document de reporting périodique mesurant la performance d'un cabinet de recrutement sur ses indicateurs clés (KPIs) pour le compte d'un client.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'cabinet',label:"Nom du cabinet",type:'text',required:true},
      {key:'client',label:"Entreprise cliente",type:'text',required:true},
      {key:'periode',label:"Période couverte",type:'text',required:true},
      {key:'kpis',label:"Indicateurs de performance (KPIs)",type:'textarea',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE – CABINET DE RECRUTEMENT</h1><p>Cabinet : <strong>{{cabinet}}</strong> | Client : <strong>{{client}}</strong> | Période : <strong>{{periode}}</strong></p><h2>1. Synthèse des indicateurs</h2><p>{{kpis}}</p><h2>2. Analyse des résultats</h2><p>Les résultats présentés ci-dessus sont analysés au regard des objectifs contractuels fixés en début de mission.</p><h2>3. Plan d'amélioration</h2><p>Des actions correctives seront mises en œuvre pour les indicateurs sous-performants au cours de la prochaine période.</p><p>Date du rapport : <strong>{{date_rapport}}</strong>.</p></div>`
  },
  {
    code: 'rec2_plan_annuel',
    name: "Plan de recrutement annuel",
    category: 'rh_emploi', price: 2500, priceMax: 7500,
    description: "Document de planification annuelle des besoins en recrutement d'une entreprise, servant de base au dialogue avec les partenaires RH et les prestataires.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'entreprise',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'responsable_rh',label:"Responsable RH en charge",type:'text',required:true},
      {key:'annee',label:"Année du plan",type:'text',required:true},
      {key:'postes_prevus',label:"Postes à recruter et volumes",type:'textarea',required:true},
      {key:'budget_total',label:"Budget total de recrutement (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE RECRUTEMENT ANNUEL {{annee}}</h1><p>Entreprise : <strong>{{entreprise}}</strong> | Responsable RH : <strong>{{responsable_rh}}</strong></p><h2>1. Postes prévus</h2><p>{{postes_prevus}}</p><h2>2. Budget</h2><p>Budget total alloué au recrutement : <strong>{{budget_total}}</strong> FCFA.</p><h2>3. Calendrier</h2><p>Les recrutements seront répartis sur l'année selon les besoins opérationnels de chaque direction.</p><h2>4. Validation</h2><p>Le présent plan est soumis à la validation de la Direction Générale avant mise en œuvre.</p></div>`
  },
  {
    code: 'rec2_partenariat_univ',
    name: "Accord de partenariat université-entreprise (jeunes talents)",
    category: 'rh_emploi', price: 3000, priceMax: 9000,
    description: "Convention de partenariat entre une université ou grande école et une entreprise pour le sourcing et le développement de jeunes talents.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 67,
    fieldsJson: F([
      {key:'universite',label:"Université ou grande école",type:'text',required:true},
      {key:'entreprise',label:"Entreprise partenaire",type:'text',required:true},
      {key:'objet_partenariat',label:"Objet du partenariat",type:'textarea',required:true},
      {key:'duree',label:"Durée du partenariat",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT UNIVERSITÉ – ENTREPRISE</h1><p>Entre <strong>{{universite}}</strong> et <strong>{{entreprise}}</strong> :</p><h2>Article 1 – Objet</h2><p>{{objet_partenariat}}</p><h2>Article 2 – Engagements réciproques</h2><p>L'entreprise s'engage à accueillir des stagiaires et apprentis, à intervenir dans les formations et à financer des bourses. L'université fournit un accès privilégié à ses étudiants et ses ressources académiques.</p><h2>Article 3 – Durée</h2><p>Le présent accord est conclu pour <strong>{{duree}}</strong>, renouvelable par tacite reconduction.</p><p>Signé le <strong>{{date_signature}}</strong>.</p></div>`
  },
  {
    code: 'rec2_employer_branding',
    name: "Accord de service de marque employeur (employer branding)",
    category: 'rh_emploi', price: 4500, priceMax: 13500,
    description: "Contrat de prestation pour le développement et le déploiement d'une stratégie de marque employeur destinée à attirer les talents en Afrique francophone.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 69,
    fieldsJson: F([
      {key:'agence',label:"Agence de marque employeur",type:'text',required:true},
      {key:'client',label:"Entreprise cliente",type:'text',required:true},
      {key:'livrables',label:"Livrables attendus",type:'textarea',required:true},
      {key:'duree_mission',label:"Durée de la mission",type:'text',required:true},
      {key:'budget',label:"Budget alloué (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – MARQUE EMPLOYEUR</h1><p>Entre <strong>{{agence}}</strong> et <strong>{{client}}</strong> :</p><h2>Article 1 – Livrables</h2><p>{{livrables}}</p><h2>Article 2 – Durée</h2><p>La mission se déroule sur <strong>{{duree_mission}}</strong>.</p><h2>Article 3 – Budget</h2><p>Budget alloué : <strong>{{budget}}</strong> FCFA, incluant les frais de production et de diffusion.</p><h2>Article 4 – Propriété intellectuelle</h2><p>Les créations réalisées dans le cadre de cette mission sont la propriété exclusive du Client après paiement intégral des honoraires.</p></div>`
  },
  {
    code: 'rec2_charte_recrutement',
    name: "Charte du recrutement éthique et inclusif",
    category: 'rh_emploi', price: 2000, priceMax: 6000,
    description: "Charte définissant les principes éthiques et les engagements d'une organisation en matière de recrutement équitable, non discriminatoire et inclusif.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'organisation',label:"Nom de l'organisation",type:'text',required:true},
      {key:'responsable',label:"Responsable signataire",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption de la charte",type:'date',required:true},
      {key:'engagements',label:"Engagements spécifiques de l'organisation",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DU RECRUTEMENT ÉTHIQUE ET INCLUSIF</h1><p>Organisation : <strong>{{organisation}}</strong></p><h2>Préambule</h2><p>Dans le respect des lois ivoiriennes et des conventions internationales du travail, <strong>{{organisation}}</strong> s'engage à mener ses recrutements de manière éthique, transparente et inclusive.</p><h2>Nos engagements</h2><p>{{engagements}}</p><h2>Principes fondamentaux</h2><p>Non-discrimination, égalité des chances, respect de la vie privée des candidats, transparence du processus, feedback constructif.</p><p>Adoptée le <strong>{{date_adoption}}</strong> par <strong>{{responsable}}</strong>.</p></div>`
  },

  // ── 25 templates Outplacement/Reconversion (préfixe out_) ──
  {
    code: 'out_individuel_cadre',
    name: "Accord de service d'outplacement individuel (cadre supérieur)",
    category: 'rh_emploi', price: 6000, priceMax: 18000,
    description: "Convention de prestation d'outplacement individuel destinée à un cadre supérieur en transition professionnelle en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'cabinet',label:"Cabinet d'outplacement",type:'text',required:true},
      {key:'entreprise',label:"Entreprise mandante",type:'text',required:true},
      {key:'beneficiaire',label:"Nom du cadre bénéficiaire",type:'text',required:true},
      {key:'duree_accompagnement',label:"Durée de l'accompagnement",type:'text',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de démarrage",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'OUTPLACEMENT INDIVIDUEL – CADRE SUPÉRIEUR</h1><p>Entre <strong>{{cabinet}}</strong> et <strong>{{entreprise}}</strong>, pour le bénéfice de <strong>{{beneficiaire}}</strong> :</p><h2>Article 1 – Objet</h2><p>Accompagnement individuel à la transition professionnelle du bénéficiaire pendant <strong>{{duree_accompagnement}}</strong> à compter du <strong>{{date_debut}}</strong>.</p><h2>Article 2 – Prestations incluses</h2><p>Bilan de compétences, définition du projet professionnel, coaching, techniques de recherche d'emploi, préparation aux entretiens, accès au réseau du Cabinet.</p><h2>Article 3 – Honoraires</h2><p>Montant : <strong>{{honoraires}}</strong> FCFA, à la charge de l'entreprise mandante.</p></div>`
  },
  {
    code: 'out_collectif_pse',
    name: "Accord de service d'outplacement collectif (PSE)",
    category: 'rh_emploi', price: 8000, priceMax: 24000,
    description: "Convention de prestation d'outplacement collectif dans le cadre d'un Plan de Sauvegarde de l'Emploi (PSE) ou plan social en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'cabinet',label:"Cabinet d'outplacement",type:'text',required:true},
      {key:'entreprise',label:"Entreprise mandante",type:'text',required:true},
      {key:'nombre_beneficiaires',label:"Nombre de salariés concernés",type:'text',required:true},
      {key:'duree_programme',label:"Durée du programme",type:'text',required:true},
      {key:'budget_total',label:"Budget total (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'OUTPLACEMENT COLLECTIF – PSE</h1><p>Entre <strong>{{cabinet}}</strong> et <strong>{{entreprise}}</strong> :</p><h2>Article 1 – Contexte</h2><p>La présente convention s'inscrit dans le cadre du plan social de l'entreprise et concerne <strong>{{nombre_beneficiaires}}</strong> salariés.</p><h2>Article 2 – Programme</h2><p>Ateliers collectifs, accompagnements individuels, accès à une cellule de reclassement pendant <strong>{{duree_programme}}</strong>.</p><h2>Article 3 – Budget</h2><p>Budget total : <strong>{{budget_total}}</strong> FCFA.</p><h2>Article 4 – Obligations légales</h2><p>Le présent programme tient compte des obligations légales de l'employeur en matière de reclassement prévues par le Code du Travail ivoirien.</p></div>`
  },
  {
    code: 'out_bilan_reconversion',
    name: "Accord de service de bilan professionnel de reconversion",
    category: 'rh_emploi', price: 3500, priceMax: 10500,
    description: "Contrat de prestation pour la réalisation d'un bilan professionnel orienté reconversion, permettant au salarié d'identifier un nouveau projet de carrière.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'organisme',label:"Organisme de bilan",type:'text',required:true},
      {key:'beneficiaire',label:"Nom du bénéficiaire",type:'text',required:true},
      {key:'duree_bilan',label:"Durée du bilan",type:'text',required:true},
      {key:'cout',label:"Coût du bilan (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début du bilan",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – BILAN PROFESSIONNEL DE RECONVERSION</h1><p>Entre <strong>{{organisme}}</strong> et <strong>{{beneficiaire}}</strong> :</p><h2>Article 1 – Objet</h2><p>Réalisation d'un bilan professionnel orienté reconversion d'une durée de <strong>{{duree_bilan}}</strong>, débutant le <strong>{{date_debut}}</strong>.</p><h2>Article 2 – Phases du bilan</h2><p>Phase préliminaire (analyse de la demande), phase d'investigation (compétences, intérêts, valeurs), phase de conclusion (projet et plan d'action).</p><h2>Article 3 – Coût</h2><p>Montant : <strong>{{cout}}</strong> FCFA.</p></div>`
  },
  {
    code: 'out_coaching_transition',
    name: "Accord de service de coaching de transition professionnelle",
    category: 'rh_emploi', price: 4000, priceMax: 12000,
    description: "Convention de coaching individuel pour accompagner un professionnel dans sa transition de carrière vers un nouveau secteur ou poste en Afrique.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'coach',label:"Coach professionnel certifié",type:'text',required:true},
      {key:'coache',label:"Nom du coaché",type:'text',required:true},
      {key:'nombre_seances',label:"Nombre de séances prévues",type:'text',required:true},
      {key:'cout_seance',label:"Coût par séance (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de la première séance",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE COACHING DE TRANSITION PROFESSIONNELLE</h1><p>Entre <strong>{{coach}}</strong> (coach) et <strong>{{coache}}</strong> (coaché) :</p><h2>Article 1 – Objectif</h2><p>Accompagnement du coaché dans sa transition professionnelle sur <strong>{{nombre_seances}}</strong> séances de coaching individuel.</p><h2>Article 2 – Tarification</h2><p>Coût unitaire : <strong>{{cout_seance}}</strong> FCFA/séance. Première séance le <strong>{{date_debut}}</strong>.</p><h2>Article 3 – Confidentialité</h2><p>Le coach s'engage à respecter la confidentialité absolue des échanges. Aucune information n'est communiquée à l'employeur sans accord écrit du coaché.</p></div>`
  },
  {
    code: 'out_formation_reconversion',
    name: "Accord de service de formation de reconversion (CIF/CPF Afrique)",
    category: 'rh_emploi', price: 4500, priceMax: 13500,
    description: "Convention de formation professionnelle pour la reconversion d'un salarié, mobilisant les dispositifs de financement de la formation en Côte d'Ivoire (FDFP).",
    templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'organisme',label:"Organisme de formation",type:'text',required:true},
      {key:'beneficiaire',label:"Nom du bénéficiaire",type:'text',required:true},
      {key:'intitule_formation',label:"Intitulé de la formation",type:'text',required:true},
      {key:'duree',label:"Durée de la formation",type:'text',required:true},
      {key:'financement',label:"Source de financement (FDFP, entreprise...)",type:'text',required:true},
      {key:'date_debut',label:"Date de début de la formation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FORMATION DE RECONVERSION</h1><p>Entre <strong>{{organisme}}</strong> et <strong>{{beneficiaire}}</strong> :</p><h2>Article 1 – Formation</h2><p>Formation intitulée <strong>{{intitule_formation}}</strong>, d'une durée de <strong>{{duree}}</strong>, débutant le <strong>{{date_debut}}</strong>.</p><h2>Article 2 – Financement</h2><p>La formation est financée par : <strong>{{financement}}</strong>.</p><h2>Article 3 – Certification</h2><p>À l'issue de la formation, le bénéficiaire obtiendra une attestation de compétences reconnue par les autorités compétentes en Côte d'Ivoire.</p></div>`
  },
  {
    code: 'out_vae_reconversion',
    name: "Accord de service de validation des acquis pour reconversion",
    category: 'rh_emploi', price: 3000, priceMax: 9000,
    description: "Convention d'accompagnement à la Validation des Acquis de l'Expérience (VAE) dans le cadre d'une démarche de reconversion professionnelle.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'accompagnateur',label:"Organisme accompagnateur VAE",type:'text',required:true},
      {key:'beneficiaire',label:"Nom du candidat VAE",type:'text',required:true},
      {key:'certification_visee',label:"Certification visée",type:'text',required:true},
      {key:'duree_accompagnement',label:"Durée de l'accompagnement",type:'text',required:true},
      {key:'cout',label:"Coût de l'accompagnement (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D'ACCOMPAGNEMENT VAE – VALIDATION DES ACQUIS</h1><p>Entre <strong>{{accompagnateur}}</strong> et <strong>{{beneficiaire}}</strong> :</p><h2>Article 1 – Certification visée</h2><p>Le candidat vise l'obtention de : <strong>{{certification_visee}}</strong>.</p><h2>Article 2 – Accompagnement</h2><p>L'organisme accompagne le candidat dans la rédaction du livret VAE et la préparation du jury pendant <strong>{{duree_accompagnement}}</strong>.</p><h2>Article 3 – Coût</h2><p>Montant de l'accompagnement : <strong>{{cout}}</strong> FCFA.</p></div>`
  },
  {
    code: 'out_essaimage',
    name: "Accord de service de création d'entreprise par un salarié (essaimage)",
    category: 'rh_emploi', price: 4000, priceMax: 12000,
    description: "Convention d'accompagnement à la création d'entreprise dans le cadre d'un dispositif d'essaimage, permettant à un salarié de devenir entrepreneur.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise d'origine (employeur)",type:'text',required:true},
      {key:'salarie',label:"Nom du salarié-créateur",type:'text',required:true},
      {key:'projet_entreprise',label:"Description du projet d'entreprise",type:'textarea',required:true},
      {key:'aide_financiere',label:"Aide financière accordée (FCFA)",type:'text',required:true},
      {key:'duree_accompagnement',label:"Durée de l'accompagnement post-création",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D'ESSAIMAGE – CRÉATION D'ENTREPRISE PAR UN SALARIÉ</h1><p>Entre <strong>{{entreprise}}</strong> et <strong>{{salarie}}</strong> :</p><h2>Article 1 – Projet</h2><p>{{projet_entreprise}}</p><h2>Article 2 – Aide financière</h2><p>L'entreprise accorde une aide financière de <strong>{{aide_financiere}}</strong> FCFA sous forme de prêt ou de subvention, selon les modalités en annexe.</p><h2>Article 3 – Accompagnement</h2><p>Un suivi post-création est assuré pendant <strong>{{duree_accompagnement}}</strong>.</p><h2>Article 4 – Rupture du contrat de travail</h2><p>Le contrat de travail du salarié est rompu d'un commun accord à la date de création effective de la nouvelle entité.</p></div>`
  },
  {
    code: 'out_portage_salarial',
    name: "Accord de service de portage salarial pour reconversion",
    category: 'rh_emploi', price: 3500, priceMax: 10500,
    description: "Convention de portage salarial permettant à un professionnel en reconversion d'exercer une activité indépendante sous statut salarié en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'societe_portage',label:"Société de portage salarial",type:'text',required:true},
      {key:'consultant',label:"Nom du consultant porté",type:'text',required:true},
      {key:'client_final',label:"Nom du client final",type:'text',required:true},
      {key:'taux_journalier',label:"Taux journalier moyen (TJM) en FCFA",type:'text',required:true},
      {key:'duree',label:"Durée de la mission portée",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PORTAGE SALARIAL</h1><p>Entre <strong>{{societe_portage}}</strong>, <strong>{{consultant}}</strong> et <strong>{{client_final}}</strong> :</p><h2>Article 1 – Principe</h2><p>Le consultant exerce son activité indépendante auprès du client final sous le statut de salarié de la société de portage.</p><h2>Article 2 – Mission</h2><p>TJM : <strong>{{taux_journalier}}</strong> FCFA. Durée : <strong>{{duree}}</strong>.</p><h2>Article 3 – Gestion administrative</h2><p>La société de portage assure la facturation, le paiement des cotisations sociales et la remise du bulletin de salaire au consultant.</p></div>`
  },
  {
    code: 'out_alumni',
    name: "Accord de service de réseau alumni d'entreprise",
    category: 'rh_emploi', price: 2500, priceMax: 7500,
    description: "Convention de création et d'animation d'un réseau alumni regroupant les anciens salariés d'une entreprise pour maintenir des liens professionnels durables.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire d'animation du réseau",type:'text',required:true},
      {key:'entreprise',label:"Entreprise commanditaire",type:'text',required:true},
      {key:'fonctionnalites',label:"Fonctionnalités de la plateforme alumni",type:'textarea',required:true},
      {key:'tarif_annuel',label:"Tarif annuel (FCFA)",type:'text',required:true},
      {key:'date_lancement',label:"Date de lancement",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – RÉSEAU ALUMNI D'ENTREPRISE</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{entreprise}}</strong> :</p><h2>Article 1 – Plateforme alumni</h2><p>Fonctionnalités incluses : {{fonctionnalites}}.</p><h2>Article 2 – Tarification</h2><p>Tarif annuel : <strong>{{tarif_annuel}}</strong> FCFA.</p><h2>Article 3 – Lancement</h2><p>La plateforme est mise en ligne le <strong>{{date_lancement}}</strong>.</p><h2>Article 4 – Données personnelles</h2><p>La gestion des données des membres alumni respecte la législation ivoirienne sur la protection des données personnelles.</p></div>`
  },
  {
    code: 'out_co_developpement',
    name: "Accord de service de co-développement professionnel",
    category: 'rh_emploi', price: 3000, priceMax: 9000,
    description: "Convention pour l'organisation de groupes de co-développement professionnel visant à soutenir les professionnels en transition ou en reconversion.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 57,
    fieldsJson: F([
      {key:'animateur',label:"Animateur / Facilitateur",type:'text',required:true},
      {key:'commanditaire',label:"Organisation commanditaire",type:'text',required:true},
      {key:'nombre_groupes',label:"Nombre de groupes",type:'text',required:true},
      {key:'nombre_seances',label:"Nombre de séances par groupe",type:'text',required:true},
      {key:'cout_total',label:"Coût total (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CO-DÉVELOPPEMENT PROFESSIONNEL</h1><p>Entre <strong>{{animateur}}</strong> et <strong>{{commanditaire}}</strong> :</p><h2>Article 1 – Dispositif</h2><p>Organisation de <strong>{{nombre_groupes}}</strong> groupe(s) de co-développement, chacun composé de 6 à 8 pairs, réunis lors de <strong>{{nombre_seances}}</strong> séances.</p><h2>Article 2 – Méthode</h2><p>Chaque séance suit la méthode Payette & Champagne : exposé d'un cas, questionnement, consultation et plan d'action.</p><h2>Article 3 – Coût</h2><p>Coût total : <strong>{{cout_total}}</strong> FCFA.</p></div>`
  },
  {
    code: 'out_mentoring_reconversion',
    name: "Accord de service de mentoring de reconversion",
    category: 'rh_emploi', price: 2500, priceMax: 7500,
    description: "Convention de mise en relation et d'encadrement d'un professionnel en reconversion avec un mentor expérimenté du secteur cible.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'programme',label:"Programme de mentoring",type:'text',required:true},
      {key:'mentor',label:"Nom du mentor",type:'text',required:true},
      {key:'mentore',label:"Nom du mentoré",type:'text',required:true},
      {key:'duree',label:"Durée du mentorat",type:'text',required:true},
      {key:'frequence',label:"Fréquence des rencontres",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE MENTORING DE RECONVERSION</h1><p>Programme : <strong>{{programme}}</strong> | Mentor : <strong>{{mentor}}</strong> | Mentoré : <strong>{{mentore}}</strong></p><h2>Article 1 – Objet</h2><p>Accompagnement du mentoré dans sa reconversion professionnelle sur une période de <strong>{{duree}}</strong>.</p><h2>Article 2 – Modalités</h2><p>Rencontres à la fréquence de <strong>{{frequence}}</strong>, en présentiel ou à distance.</p><h2>Article 3 – Engagements</h2><p>Le mentor partage son expérience, son réseau et ses conseils. Le mentoré s'engage à respecter les rendez-vous et à mettre en œuvre les actions convenues.</p></div>`
  },
  {
    code: 'out_mobilite_interne',
    name: "Accord de service de conseil en mobilité interne",
    category: 'rh_emploi', price: 3000, priceMax: 9000,
    description: "Convention de prestation pour l'accompagnement de salariés dans leur mobilité interne au sein d'un groupe, comme alternative à l'outplacement externe.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'cabinet',label:"Cabinet conseil RH",type:'text',required:true},
      {key:'entreprise',label:"Entreprise / Groupe",type:'text',required:true},
      {key:'nombre_beneficiaires',label:"Nombre de salariés accompagnés",type:'text',required:true},
      {key:'duree',label:"Durée du programme",type:'text',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – CONSEIL EN MOBILITÉ INTERNE</h1><p>Entre <strong>{{cabinet}}</strong> et <strong>{{entreprise}}</strong> :</p><h2>Article 1 – Objet</h2><p>Accompagnement de <strong>{{nombre_beneficiaires}}</strong> salarié(s) dans leur projet de mobilité interne sur <strong>{{duree}}</strong>.</p><h2>Article 2 – Prestations</h2><p>Analyse du potentiel, identification des opportunités internes, préparation aux entretiens de mobilité, accompagnement de la prise de poste.</p><h2>Article 3 – Honoraires</h2><p>Montant : <strong>{{honoraires}}</strong> FCFA.</p></div>`
  },
  {
    code: 'out_depart_retraite',
    name: "Accord de service d'accompagnement départ à la retraite",
    category: 'rh_emploi', price: 3500, priceMax: 10500,
    description: "Convention d'accompagnement des salariés à l'approche de la retraite pour préparer sereinement cette transition de vie majeure en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'organisme',label:"Organisme d'accompagnement",type:'text',required:true},
      {key:'entreprise',label:"Entreprise mandante",type:'text',required:true},
      {key:'nombre_beneficiaires',label:"Nombre de bénéficiaires",type:'text',required:true},
      {key:'contenu_programme',label:"Contenu du programme",type:'textarea',required:true},
      {key:'cout',label:"Coût par bénéficiaire (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – ACCOMPAGNEMENT DÉPART À LA RETRAITE</h1><p>Entre <strong>{{organisme}}</strong> et <strong>{{entreprise}}</strong> :</p><h2>Article 1 – Bénéficiaires</h2><p>Programme destiné à <strong>{{nombre_beneficiaires}}</strong> salarié(s) en approche de retraite.</p><h2>Article 2 – Contenu</h2><p>{{contenu_programme}}</p><h2>Article 3 – Tarification</h2><p>Coût par bénéficiaire : <strong>{{cout}}</strong> FCFA.</p></div>`
  },
  {
    code: 'out_prep_retraite_cnps',
    name: "Accord de service de préparation à la retraite (CNPS CI)",
    category: 'rh_emploi', price: 3000, priceMax: 9000,
    description: "Convention d'accompagnement spécifique à la préparation administrative et financière à la retraite auprès de la CNPS (Caisse Nationale de Prévoyance Sociale) en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'cabinet',label:"Cabinet conseil retraite",type:'text',required:true},
      {key:'entreprise',label:"Employeur mandant",type:'text',required:true},
      {key:'salarie',label:"Nom du salarié bénéficiaire",type:'text',required:true},
      {key:'date_depart_prevue',label:"Date de départ en retraite prévue",type:'date',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PRÉPARATION À LA RETRAITE – CNPS CI</h1><p>Entre <strong>{{cabinet}}</strong>, <strong>{{entreprise}}</strong> et <strong>{{salarie}}</strong> :</p><h2>Article 1 – Objet</h2><p>Accompagnement de <strong>{{salarie}}</strong> dans ses démarches de liquidation de droits à la retraite auprès de la CNPS CI, prévu le <strong>{{date_depart_prevue}}</strong>.</p><h2>Article 2 – Prestations</h2><p>Constitution du dossier CNPS, calcul de la pension prévisionnelle, conseil en complémentaire retraite, simulation financière post-retraite.</p><h2>Article 3 – Honoraires</h2><p>Montant : <strong>{{honoraires}}</strong> FCFA.</p></div>`
  },
  {
    code: 'out_retraite_progressive',
    name: "Accord de service de retraite progressive",
    category: 'rh_emploi', price: 2500, priceMax: 7500,
    description: "Convention organisant la transition vers une retraite progressive permettant au salarié de réduire son activité tout en percevant une fraction de sa pension.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'employeur',label:"Nom de l'employeur",type:'text',required:true},
      {key:'salarie',label:"Nom du salarié",type:'text',required:true},
      {key:'taux_activite',label:"Taux d'activité réduit convenu (%)",type:'text',required:true},
      {key:'duree_progressive',label:"Durée de la période de retraite progressive",type:'text',required:true},
      {key:'date_debut',label:"Date de début de la retraite progressive",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE RETRAITE PROGRESSIVE</h1><p>Entre <strong>{{employeur}}</strong> et <strong>{{salarie}}</strong> :</p><h2>Article 1 – Modalités</h2><p>À compter du <strong>{{date_debut}}</strong>, le salarié exerce son activité à <strong>{{taux_activite}}</strong>% de son temps de travail habituel pendant <strong>{{duree_progressive}}</strong>.</p><h2>Article 2 – Rémunération</h2><p>Le salaire est proratisé au taux d'activité convenu. La fraction de pension versée par la CNPS complète la rémunération partielle.</p><h2>Article 3 – Fin de la période</h2><p>Au terme de la période progressive, le salarié prend sa retraite complète selon les conditions légales en vigueur.</p></div>`
  },
  {
    code: 'out_cumul_emploi_retraite',
    name: "Accord de service de cumul emploi-retraite",
    category: 'rh_emploi', price: 2500, priceMax: 7500,
    description: "Convention encadrant le cumul d'une activité professionnelle et de la perception d'une pension de retraite, conformément au cadre juridique ivoirien.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'employeur',label:"Nom de l'employeur",type:'text',required:true},
      {key:'retraite_actif',label:"Nom du retraité actif",type:'text',required:true},
      {key:'nature_activite',label:"Nature de l'activité reprise",type:'text',required:true},
      {key:'duree_contrat',label:"Durée du contrat de travail",type:'text',required:true},
      {key:'remuneration',label:"Rémunération mensuelle (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CUMUL EMPLOI-RETRAITE</h1><p>Entre <strong>{{employeur}}</strong> et <strong>{{retraite_actif}}</strong> :</p><h2>Article 1 – Nature de l'activité</h2><p>Le retraité actif reprend une activité de <strong>{{nature_activite}}</strong> pour une durée de <strong>{{duree_contrat}}</strong>.</p><h2>Article 2 – Rémunération</h2><p>Rémunération mensuelle brute : <strong>{{remuneration}}</strong> FCFA, cumulable avec la pension de retraite dans les limites réglementaires.</p><h2>Article 3 – Régime social</h2><p>Le présent accord est établi conformément aux dispositions du Code du Travail ivoirien et des statuts de la CNPS régissant le cumul emploi-retraite.</p></div>`
  },
  {
    code: 'out_agefop',
    name: "Accord de service de conseiller à l'emploi (AGEFOP CI)",
    category: 'rh_emploi', price: 2000, priceMax: 6000,
    description: "Convention de prestation entre l'AGEFOP et un bénéficiaire pour un accompagnement à la recherche d'emploi et à l'insertion professionnelle en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'agefop_agence',label:"Agence AGEFOP concernée",type:'text',required:true},
      {key:'beneficiaire',label:"Nom du bénéficiaire",type:'text',required:true},
      {key:'projet_professionnel',label:"Projet professionnel du bénéficiaire",type:'textarea',required:true},
      {key:'duree_suivi',label:"Durée du suivi",type:'text',required:true},
      {key:'date_debut',label:"Date de début du suivi",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – CONSEILLER À L'EMPLOI (AGEFOP CI)</h1><p>Entre <strong>{{agefop_agence}}</strong> (AGEFOP) et <strong>{{beneficiaire}}</strong> :</p><h2>Article 1 – Projet professionnel</h2><p>{{projet_professionnel}}</p><h2>Article 2 – Accompagnement</h2><p>Suivi individuel par un conseiller AGEFOP pendant <strong>{{duree_suivi}}</strong> à compter du <strong>{{date_debut}}</strong>, incluant aide à la rédaction de CV, préparation aux entretiens et mise en relation avec les employeurs partenaires.</p><h2>Article 3 – Engagements du bénéficiaire</h2><p>Le bénéficiaire s'engage à participer activement aux séances et à effectuer les démarches recommandées par son conseiller.</p></div>`
  },
  {
    code: 'out_aide_recherche_emploi',
    name: "Accord de service d'aide à la recherche d'emploi",
    category: 'rh_emploi', price: 2500, priceMax: 7500,
    description: "Convention d'accompagnement à la recherche active d'emploi, incluant la définition d'une stratégie de candidature et la formation aux outils numériques de recherche.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'organisme',label:"Organisme d'accompagnement",type:'text',required:true},
      {key:'beneficiaire',label:"Nom du demandeur d'emploi",type:'text',required:true},
      {key:'secteurs_cibles',label:"Secteurs professionnels ciblés",type:'text',required:true},
      {key:'duree',label:"Durée de l'accompagnement",type:'text',required:true},
      {key:'cout',label:"Coût de la prestation (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D'AIDE À LA RECHERCHE D'EMPLOI</h1><p>Entre <strong>{{organisme}}</strong> et <strong>{{beneficiaire}}</strong> :</p><h2>Article 1 – Objectif</h2><p>Accompagnement intensif à la recherche d'emploi dans les secteurs : <strong>{{secteurs_cibles}}</strong> sur <strong>{{duree}}</strong>.</p><h2>Article 2 – Outils</h2><p>Stratégie de candidature, optimisation du profil LinkedIn, réseau professionnel, candidatures spontanées et réponse aux offres.</p><h2>Article 3 – Coût</h2><p>Montant : <strong>{{cout}}</strong> FCFA.</p></div>`
  },
  {
    code: 'out_job_dating',
    name: "Accord de service de job dating professionnel",
    category: 'rh_emploi', price: 3000, priceMax: 9000,
    description: "Convention d'organisation d'un événement de job dating permettant des rencontres rapides entre candidats en reconversion et recruteurs.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 64,
    fieldsJson: F([
      {key:'organisateur',label:"Organisateur de l'événement",type:'text',required:true},
      {key:'partenaires_entreprises',label:"Entreprises partenaires participantes",type:'textarea',required:true},
      {key:'nombre_candidats',label:"Nombre de candidats attendus",type:'text',required:true},
      {key:'date_evenement',label:"Date de l'événement",type:'date',required:true},
      {key:'cout_participation',label:"Coût de participation (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – JOB DATING PROFESSIONNEL</h1><p>Organisateur : <strong>{{organisateur}}</strong></p><h2>Article 1 – Entreprises partenaires</h2><p>{{partenaires_entreprises}}</p><h2>Article 2 – Format</h2><p>Rencontres de 10 minutes entre recruteurs et <strong>{{nombre_candidats}}</strong> candidats en reconversion, le <strong>{{date_evenement}}</strong>.</p><h2>Article 3 – Participation</h2><p>Coût de participation pour les entreprises : <strong>{{cout_participation}}</strong> FCFA par stand recruteur.</p></div>`
  },
  {
    code: 'out_plateforme_matching',
    name: "Accord de service de plateforme de matching emploi",
    category: 'rh_emploi', price: 3500, priceMax: 10500,
    description: "Convention d'utilisation d'une plateforme numérique de mise en relation (matching) entre candidats en reconversion et employeurs en Afrique francophone.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'plateforme',label:"Nom de la plateforme de matching",type:'text',required:true},
      {key:'client',label:"Entreprise ou organisation cliente",type:'text',required:true},
      {key:'type_abonnement',label:"Type d'abonnement souscrit",type:'text',required:true},
      {key:'duree_abonnement',label:"Durée de l'abonnement",type:'text',required:true},
      {key:'montant',label:"Montant de l'abonnement (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D'UTILISATION – PLATEFORME DE MATCHING EMPLOI</h1><p>Entre <strong>{{plateforme}}</strong> et <strong>{{client}}</strong> :</p><h2>Article 1 – Abonnement</h2><p>Abonnement de type <strong>{{type_abonnement}}</strong> pour une durée de <strong>{{duree_abonnement}}</strong>.</p><h2>Article 2 – Fonctionnalités</h2><p>Accès à l'algorithme de matching, gestion des profils candidats, messagerie intégrée, tableaux de bord de suivi des candidatures.</p><h2>Article 3 – Tarif</h2><p>Montant : <strong>{{montant}}</strong> FCFA.</p></div>`
  },
  {
    code: 'out_coaching_cv',
    name: "Accord de service de coaching CV et lettre de motivation",
    category: 'rh_emploi', price: 2000, priceMax: 6000,
    description: "Convention de coaching pour l'optimisation du CV et de la lettre de motivation d'un candidat en reconversion ou en recherche d'emploi.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'coach',label:"Coach ou consultant rédactionnel",type:'text',required:true},
      {key:'beneficiaire',label:"Nom du bénéficiaire",type:'text',required:true},
      {key:'prestations',label:"Prestations incluses",type:'textarea',required:true},
      {key:'delai_livraison',label:"Délai de livraison des documents",type:'text',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE COACHING CV ET LETTRE DE MOTIVATION</h1><p>Entre <strong>{{coach}}</strong> et <strong>{{beneficiaire}}</strong> :</p><h2>Article 1 – Prestations</h2><p>{{prestations}}</p><h2>Article 2 – Délai</h2><p>Les documents finalisés sont livrés dans un délai de <strong>{{delai_livraison}}</strong> après la séance de recueil d'informations.</p><h2>Article 3 – Honoraires</h2><p>Montant : <strong>{{honoraires}}</strong> FCFA, payables à la commande.</p><h2>Article 4 – Révisions</h2><p>Deux cycles de révisions sont inclus dans la prestation.</p></div>`
  },
  {
    code: 'out_rapport_perf_outplacement',
    name: "Rapport de performance programme d'outplacement",
    category: 'rh_emploi', price: 2000, priceMax: 6000,
    description: "Document de reporting mesurant l'efficacité d'un programme d'outplacement en termes de taux de retour à l'emploi et de délais de reconversion.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'cabinet',label:"Cabinet d'outplacement",type:'text',required:true},
      {key:'client',label:"Entreprise mandante",type:'text',required:true},
      {key:'periode',label:"Période de reporting",type:'text',required:true},
      {key:'indicateurs',label:"Indicateurs de performance clés",type:'textarea',required:true},
      {key:'date_rapport',label:"Date d'établissement du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE – PROGRAMME D'OUTPLACEMENT</h1><p>Cabinet : <strong>{{cabinet}}</strong> | Client : <strong>{{client}}</strong> | Période : <strong>{{periode}}</strong></p><h2>1. Indicateurs clés</h2><p>{{indicateurs}}</p><h2>2. Analyse</h2><p>Le taux de retour à l'emploi, le délai moyen de reconversion et la satisfaction des bénéficiaires sont analysés au regard des objectifs contractuels.</p><h2>3. Recommandations</h2><p>Des ajustements du programme seront proposés lors de la prochaine réunion de pilotage.</p><p>Rapport établi le <strong>{{date_rapport}}</strong>.</p></div>`
  },
  {
    code: 'out_plan_accompagnement',
    name: "Plan d'accompagnement transition professionnelle",
    category: 'rh_emploi', price: 2500, priceMax: 7500,
    description: "Document de planification individualisé définissant les étapes et actions d'un programme d'accompagnement à la transition professionnelle.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'beneficiaire',label:"Nom du bénéficiaire",type:'text',required:true},
      {key:'consultant',label:"Consultant accompagnateur",type:'text',required:true},
      {key:'objectif_transition',label:"Objectif de transition professionnelle",type:'textarea',required:true},
      {key:'etapes_cles',label:"Étapes clés du plan",type:'textarea',required:true},
      {key:'date_elaboration',label:"Date d'élaboration du plan",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN D'ACCOMPAGNEMENT – TRANSITION PROFESSIONNELLE</h1><p>Bénéficiaire : <strong>{{beneficiaire}}</strong> | Consultant : <strong>{{consultant}}</strong></p><h2>1. Objectif de transition</h2><p>{{objectif_transition}}</p><h2>2. Étapes clés</h2><p>{{etapes_cles}}</p><h2>3. Suivi</h2><p>Un point de progression est effectué mensuellement entre le bénéficiaire et son consultant.</p><p>Plan élaboré le <strong>{{date_elaboration}}</strong>.</p></div>`
  },
  {
    code: 'out_formation_agri_numerique',
    name: "Accord de service de formation reconversion secteur agri-numérique",
    category: 'rh_emploi', price: 4000, priceMax: 12000,
    description: "Convention de formation spécialisée pour la reconversion vers les métiers de l'agri-numérique (agriculture de précision, agri-tech) en Afrique de l'Ouest.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'organisme',label:"Organisme de formation agri-numérique",type:'text',required:true},
      {key:'beneficiaire',label:"Nom du bénéficiaire",type:'text',required:true},
      {key:'modules',label:"Modules de formation prévus",type:'textarea',required:true},
      {key:'duree',label:"Durée totale de la formation",type:'text',required:true},
      {key:'cout',label:"Coût de la formation (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE FORMATION – RECONVERSION SECTEUR AGRI-NUMÉRIQUE</h1><p>Entre <strong>{{organisme}}</strong> et <strong>{{beneficiaire}}</strong> :</p><h2>Article 1 – Modules</h2><p>{{modules}}</p><h2>Article 2 – Durée</h2><p>Formation d'une durée totale de <strong>{{duree}}</strong>, débutant le <strong>{{date_debut}}</strong>.</p><h2>Article 3 – Coût</h2><p>Montant : <strong>{{cout}}</strong> FCFA, finançable via les dispositifs de formation professionnelle ivoiriens (FDFP).</p><h2>Article 4 – Débouchés</h2><p>La formation prépare aux métiers de l'agri-tech : conseiller numérique agricole, opérateur de drones agricoles, analyste de données agroalimentaires.</p></div>`
  },
  {
    code: 'out_charte_transition',
    name: "Charte de la transition professionnelle responsable",
    category: 'rh_emploi', price: 2000, priceMax: 6000,
    description: "Charte définissant les principes éthiques et les engagements d'une organisation envers ses salariés en transition professionnelle ou en reconversion.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'organisation',label:"Nom de l'organisation",type:'text',required:true},
      {key:'signataire',label:"Nom et fonction du signataire",type:'text',required:true},
      {key:'engagements',label:"Engagements spécifiques de l'organisation",type:'textarea',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE LA TRANSITION PROFESSIONNELLE RESPONSABLE</h1><p>Organisation : <strong>{{organisation}}</strong></p><h2>Préambule</h2><p><strong>{{organisation}}</strong> reconnaît que la transition professionnelle est un moment délicat dans la vie d'un salarié et s'engage à l'accompagner avec respect, transparence et bienveillance.</p><h2>Nos engagements</h2><p>{{engagements}}</p><h2>Valeurs directrices</h2><p>Dignité des personnes, équité de traitement, soutien psychologique, maintien du lien social, transparence de l'information.</p><p>Adoptée le <strong>{{date_adoption}}</strong> par <strong>{{signataire}}</strong>.</p></div>`
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
  console.log(`Batch 82b OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
