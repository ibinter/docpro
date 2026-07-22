import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ─── 25 templates Prévoyance/Mutuelle santé avancée (prev2_) ───
  {
    code: 'prev2_assurance_vie_prevoyance',
    name: "Accord de contrat d'assurance-vie prévoyance (CIMA)",
    category: 'assurance', price: 5000, priceMax: 15000,
    description: "Contrat d'assurance-vie prévoyance conforme au Code CIMA pour la protection financière des bénéficiaires en cas de décès.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 80,
    fieldsJson: F([
      {key:'souscripteur',label:"Nom du souscripteur",type:'text',required:true},
      {key:'assure',label:"Nom de l'assuré",type:'text',required:true},
      {key:'beneficiaire',label:"Nom du bénéficiaire",type:'text',required:true},
      {key:'capital',label:"Capital assuré (FCFA)",type:'text',required:true},
      {key:'date_effet',label:"Date d'effet du contrat",type:'date',required:true},
      {key:'duree',label:"Durée du contrat (années)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT D'ASSURANCE-VIE PRÉVOYANCE</h1><p>Conforme au Code CIMA</p><h2>PARTIES</h2><p>Souscripteur : {{souscripteur}}</p><p>Assuré : {{assure}}</p><p>Bénéficiaire : {{beneficiaire}}</p><h2>GARANTIES</h2><p>Capital assuré : {{capital}} FCFA</p><p>Date d'effet : {{date_effet}}</p><p>Durée : {{duree}} ans</p><h2>CONDITIONS</h2><p>Le présent contrat est régi par le Code CIMA et les dispositions légales en vigueur en Côte d'Ivoire.</p></div>`
  },
  {
    code: 'prev2_prevoyance_deces',
    name: "Accord de contrat de prévoyance décès (capital décès)",
    category: 'assurance', price: 4000, priceMax: 12000,
    description: "Contrat de prévoyance décès garantissant le versement d'un capital aux bénéficiaires désignés en cas de décès de l'assuré.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 75,
    fieldsJson: F([
      {key:'assure',label:"Nom de l'assuré",type:'text',required:true},
      {key:'beneficiaire',label:"Bénéficiaire(s)",type:'text',required:true},
      {key:'capital_deces',label:"Capital décès (FCFA)",type:'text',required:true},
      {key:'prime_annuelle',label:"Prime annuelle (FCFA)",type:'text',required:true},
      {key:'date_souscription',label:"Date de souscription",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE PRÉVOYANCE DÉCÈS</h1><h2>IDENTIFICATION</h2><p>Assuré : {{assure}}</p><p>Bénéficiaire(s) : {{beneficiaire}}</p><h2>GARANTIE DÉCÈS</h2><p>Capital décès garanti : {{capital_deces}} FCFA</p><p>Prime annuelle : {{prime_annuelle}} FCFA</p><p>Date de souscription : {{date_souscription}}</p><h2>CONDITIONS DE VERSEMENT</h2><p>Le capital décès sera versé aux bénéficiaires désignés dans les conditions prévues au présent contrat.</p></div>`
  },
  {
    code: 'prev2_invalidite_permanente_totale',
    name: "Accord de contrat de prévoyance invalidité permanente totale (IPT)",
    category: 'assurance', price: 4500, priceMax: 13500,
    description: "Contrat garantissant le versement d'un capital ou d'une rente en cas d'invalidité permanente totale (IPT) de l'assuré.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'assure',label:"Nom de l'assuré",type:'text',required:true},
      {key:'taux_invalidite',label:"Taux d'invalidité couvert (%)",type:'text',required:true},
      {key:'capital_ipt',label:"Capital IPT (FCFA)",type:'text',required:true},
      {key:'prime_mensuelle',label:"Prime mensuelle (FCFA)",type:'text',required:true},
      {key:'date_effet',label:"Date d'effet",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE PRÉVOYANCE INVALIDITÉ PERMANENTE TOTALE (IPT)</h1><h2>ASSURÉ</h2><p>Nom : {{assure}}</p><h2>GARANTIE IPT</h2><p>Taux d'invalidité couvert : {{taux_invalidite}}%</p><p>Capital IPT : {{capital_ipt}} FCFA</p><p>Prime mensuelle : {{prime_mensuelle}} FCFA</p><p>Date d'effet : {{date_effet}}</p><h2>DÉFINITION DE L'IPT</h2><p>Est considérée comme invalidité permanente totale toute incapacité permanente d'un taux égal ou supérieur au taux contractuel.</p></div>`
  },
  {
    code: 'prev2_incapacite_temporaire_totale',
    name: "Accord de contrat de prévoyance incapacité temporaire totale (ITT)",
    category: 'assurance', price: 3500, priceMax: 10500,
    description: "Contrat de prévoyance couvrant l'incapacité temporaire totale de travail par le versement d'indemnités journalières.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'assure',label:"Nom de l'assuré",type:'text',required:true},
      {key:'indemnite_journaliere',label:"Indemnité journalière (FCFA)",type:'text',required:true},
      {key:'franchise',label:"Délai de franchise (jours)",type:'text',required:true},
      {key:'duree_max',label:"Durée maximale d'indemnisation (jours)",type:'text',required:true},
      {key:'date_souscription',label:"Date de souscription",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE PRÉVOYANCE INCAPACITÉ TEMPORAIRE TOTALE (ITT)</h1><h2>ASSURÉ</h2><p>Nom : {{assure}}</p><h2>GARANTIE ITT</h2><p>Indemnité journalière : {{indemnite_journaliere}} FCFA</p><p>Délai de franchise : {{franchise}} jours</p><p>Durée maximale : {{duree_max}} jours</p><p>Date de souscription : {{date_souscription}}</p><h2>CONDITIONS</h2><p>L'indemnité est versée à compter de la fin du délai de franchise et pendant toute la durée de l'incapacité dans la limite contractuelle.</p></div>`
  },
  {
    code: 'prev2_rente_education',
    name: "Accord de contrat de rente éducation (enfants)",
    category: 'assurance', price: 4000, priceMax: 12000,
    description: "Contrat de rente éducation assurant le financement des études des enfants bénéficiaires en cas de décès ou d'invalidité du souscripteur.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'souscripteur',label:"Nom du souscripteur",type:'text',required:true},
      {key:'enfants_beneficiaires',label:"Enfants bénéficiaires",type:'textarea',required:true},
      {key:'rente_annuelle',label:"Rente annuelle par enfant (FCFA)",type:'text',required:true},
      {key:'age_limite',label:"Âge limite d'études",type:'text',required:true},
      {key:'date_effet',label:"Date d'effet",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE RENTE ÉDUCATION ENFANTS</h1><h2>SOUSCRIPTEUR</h2><p>Nom : {{souscripteur}}</p><h2>BÉNÉFICIAIRES</h2><p>Enfants : {{enfants_beneficiaires}}</p><h2>GARANTIE RENTE ÉDUCATION</h2><p>Rente annuelle par enfant : {{rente_annuelle}} FCFA</p><p>Versée jusqu'à l'âge de : {{age_limite}} ans</p><p>Date d'effet : {{date_effet}}</p><h2>DÉCLENCHEMENT</h2><p>La rente est versée en cas de décès ou d'invalidité permanente totale du souscripteur.</p></div>`
  },
  {
    code: 'prev2_rente_conjoint',
    name: "Accord de contrat de rente conjoint",
    category: 'assurance', price: 4500, priceMax: 13500,
    description: "Contrat de rente conjoint garantissant le versement d'une rente viagère au conjoint survivant en cas de décès de l'assuré.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'assure',label:"Nom de l'assuré",type:'text',required:true},
      {key:'conjoint',label:"Nom du conjoint bénéficiaire",type:'text',required:true},
      {key:'rente_mensuelle',label:"Rente mensuelle (FCFA)",type:'text',required:true},
      {key:'date_mariage',label:"Date de mariage",type:'date',required:true},
      {key:'date_effet',label:"Date d'effet du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE RENTE CONJOINT</h1><h2>PARTIES</h2><p>Assuré : {{assure}}</p><p>Conjoint bénéficiaire : {{conjoint}}</p><h2>GARANTIE RENTE CONJOINT</h2><p>Rente mensuelle viagère : {{rente_mensuelle}} FCFA</p><p>Date de mariage : {{date_mariage}}</p><p>Date d'effet : {{date_effet}}</p><h2>CONDITIONS</h2><p>La rente est versée au conjoint survivant à compter du décès de l'assuré et jusqu'au décès du bénéficiaire.</p></div>`
  },
  {
    code: 'prev2_assurance_obseques',
    name: "Accord de contrat d'assurance obsèques (capital obsèques)",
    category: 'assurance', price: 3000, priceMax: 9000,
    description: "Contrat d'assurance obsèques garantissant le versement d'un capital destiné à couvrir les frais funéraires de l'assuré.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      {key:'assure',label:"Nom de l'assuré",type:'text',required:true},
      {key:'beneficiaire',label:"Bénéficiaire désigné",type:'text',required:true},
      {key:'capital_obseques',label:"Capital obsèques (FCFA)",type:'text',required:true},
      {key:'prime_mensuelle',label:"Prime mensuelle (FCFA)",type:'text',required:true},
      {key:'date_souscription',label:"Date de souscription",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT D'ASSURANCE OBSÈQUES</h1><h2>ASSURÉ</h2><p>Nom : {{assure}}</p><p>Bénéficiaire : {{beneficiaire}}</p><h2>GARANTIE OBSÈQUES</h2><p>Capital obsèques : {{capital_obseques}} FCFA</p><p>Prime mensuelle : {{prime_mensuelle}} FCFA</p><p>Date de souscription : {{date_souscription}}</p><h2>UTILISATION DU CAPITAL</h2><p>Le capital versé est exclusivement destiné à couvrir les frais d'obsèques et les prestations funéraires de l'assuré.</p></div>`
  },
  {
    code: 'prev2_assurance_dependance',
    name: "Accord de contrat d'assurance dépendance",
    category: 'assurance', price: 4000, priceMax: 12000,
    description: "Contrat d'assurance dépendance couvrant les besoins de l'assuré en cas de perte d'autonomie partielle ou totale.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 55,
    fieldsJson: F([
      {key:'assure',label:"Nom de l'assuré",type:'text',required:true},
      {key:'niveau_dependance',label:"Niveau de dépendance couvert",type:'text',required:true},
      {key:'rente_mensuelle',label:"Rente mensuelle dépendance (FCFA)",type:'text',required:true},
      {key:'prime_annuelle',label:"Prime annuelle (FCFA)",type:'text',required:true},
      {key:'date_effet',label:"Date d'effet",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT D'ASSURANCE DÉPENDANCE</h1><h2>ASSURÉ</h2><p>Nom : {{assure}}</p><h2>GARANTIE DÉPENDANCE</h2><p>Niveau couvert : {{niveau_dependance}}</p><p>Rente mensuelle : {{rente_mensuelle}} FCFA</p><p>Prime annuelle : {{prime_annuelle}} FCFA</p><p>Date d'effet : {{date_effet}}</p><h2>DÉFINITION DE LA DÉPENDANCE</h2><p>La dépendance est caractérisée par l'impossibilité d'effectuer seul les actes essentiels de la vie quotidienne.</p></div>`
  },
  {
    code: 'prev2_assurance_perte_emploi',
    name: "Accord de contrat d'assurance perte d'emploi",
    category: 'assurance', price: 3500, priceMax: 10500,
    description: "Contrat d'assurance perte d'emploi couvrant le remboursement d'échéances de crédit ou le versement d'indemnités en cas de chômage involontaire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 62,
    fieldsJson: F([
      {key:'assure',label:"Nom de l'assuré",type:'text',required:true},
      {key:'employeur',label:"Employeur actuel",type:'text',required:true},
      {key:'indemnite_mensuelle',label:"Indemnité mensuelle (FCFA)",type:'text',required:true},
      {key:'duree_indemnisation',label:"Durée maximale d'indemnisation (mois)",type:'text',required:true},
      {key:'date_souscription',label:"Date de souscription",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT D'ASSURANCE PERTE D'EMPLOI</h1><h2>ASSURÉ</h2><p>Nom : {{assure}}</p><p>Employeur : {{employeur}}</p><h2>GARANTIE PERTE D'EMPLOI</h2><p>Indemnité mensuelle : {{indemnite_mensuelle}} FCFA</p><p>Durée maximale : {{duree_indemnisation}} mois</p><p>Date de souscription : {{date_souscription}}</p><h2>CONDITIONS DE DÉCLENCHEMENT</h2><p>La garantie est activée en cas de licenciement économique involontaire dûment justifié.</p></div>`
  },
  {
    code: 'prev2_plan_epargne_retraite',
    name: "Accord de plan d'épargne retraite individuel (PER Afrique)",
    category: 'assurance', price: 5000, priceMax: 15000,
    description: "Plan d'épargne retraite individuel adapté au contexte africain pour constituer un capital ou une rente à la retraite.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'souscripteur',label:"Nom du souscripteur",type:'text',required:true},
      {key:'versement_mensuel',label:"Versement mensuel (FCFA)",type:'text',required:true},
      {key:'age_retraite',label:"Âge de départ à la retraite prévu",type:'text',required:true},
      {key:'mode_sortie',label:"Mode de sortie (capital/rente)",type:'text',required:true},
      {key:'date_souscription',label:"Date de souscription",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN D'ÉPARGNE RETRAITE INDIVIDUEL (PER AFRIQUE)</h1><h2>SOUSCRIPTEUR</h2><p>Nom : {{souscripteur}}</p><h2>CARACTÉRISTIQUES DU PLAN</h2><p>Versement mensuel : {{versement_mensuel}} FCFA</p><p>Âge de départ prévu : {{age_retraite}} ans</p><p>Mode de sortie : {{mode_sortie}}</p><p>Date de souscription : {{date_souscription}}</p><h2>FISCALITÉ</h2><p>Les versements peuvent être déductibles de l'assiette imposable dans les conditions prévues par la législation fiscale locale.</p></div>`
  },
  {
    code: 'prev2_mutuelle_sante_groupe',
    name: "Accord de contrat de mutuelle santé groupe (entreprise)",
    category: 'assurance', price: 6000, priceMax: 18000,
    description: "Contrat de mutuelle santé groupe pour la couverture collective des salariés d'une entreprise, conforme au droit social ivoirien.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 85,
    fieldsJson: F([
      {key:'entreprise',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'mutuelle',label:"Nom de la mutuelle",type:'text',required:true},
      {key:'nb_salaries',label:"Nombre de salariés couverts",type:'text',required:true},
      {key:'cotisation_mensuelle',label:"Cotisation mensuelle par salarié (FCFA)",type:'text',required:true},
      {key:'date_effet',label:"Date d'effet",type:'date',required:true},
      {key:'garanties',label:"Garanties incluses",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE MUTUELLE SANTÉ GROUPE ENTREPRISE</h1><h2>PARTIES</h2><p>Entreprise : {{entreprise}}</p><p>Mutuelle : {{mutuelle}}</p><h2>COUVERTURE</h2><p>Nombre de salariés : {{nb_salaries}}</p><p>Cotisation mensuelle par salarié : {{cotisation_mensuelle}} FCFA</p><p>Date d'effet : {{date_effet}}</p><h2>GARANTIES</h2><p>{{garanties}}</p><h2>OBLIGATIONS</h2><p>L'entreprise s'engage à verser les cotisations dans les délais et à informer ses salariés des modalités de prise en charge.</p></div>`
  },
  {
    code: 'prev2_mutuelle_sante_individuelle',
    name: "Accord de contrat de mutuelle santé individuelle",
    category: 'assurance', price: 3500, priceMax: 10500,
    description: "Contrat de mutuelle santé individuelle pour la couverture complémentaire des frais médicaux d'un assuré et de sa famille.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 78,
    fieldsJson: F([
      {key:'adherent',label:"Nom de l'adhérent",type:'text',required:true},
      {key:'ayants_droit',label:"Ayants droit couverts",type:'textarea',required:true},
      {key:'cotisation_mensuelle',label:"Cotisation mensuelle (FCFA)",type:'text',required:true},
      {key:'plafond_remboursement',label:"Plafond de remboursement annuel (FCFA)",type:'text',required:true},
      {key:'date_adhesion',label:"Date d'adhésion",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE MUTUELLE SANTÉ INDIVIDUELLE</h1><h2>ADHÉRENT</h2><p>Nom : {{adherent}}</p><p>Ayants droit : {{ayants_droit}}</p><h2>COTISATION</h2><p>Cotisation mensuelle : {{cotisation_mensuelle}} FCFA</p><p>Plafond annuel de remboursement : {{plafond_remboursement}} FCFA</p><p>Date d'adhésion : {{date_adhesion}}</p><h2>PRESTATIONS</h2><p>La mutuelle prend en charge les frais de santé selon le tableau de garanties en vigueur à la date d'adhésion.</p></div>`
  },
  {
    code: 'prev2_complementaire_sante_senior',
    name: "Accord de contrat de complémentaire santé senior",
    category: 'assurance', price: 4000, priceMax: 12000,
    description: "Contrat de complémentaire santé adapté aux besoins spécifiques des personnes de plus de 60 ans.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      {key:'assure',label:"Nom de l'assuré",type:'text',required:true},
      {key:'age',label:"Âge de l'assuré",type:'text',required:true},
      {key:'cotisation_mensuelle',label:"Cotisation mensuelle (FCFA)",type:'text',required:true},
      {key:'garanties_specifiques',label:"Garanties spécifiques senior",type:'textarea',required:true},
      {key:'date_effet',label:"Date d'effet",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE COMPLÉMENTAIRE SANTÉ SENIOR</h1><h2>ASSURÉ</h2><p>Nom : {{assure}}</p><p>Âge : {{age}} ans</p><h2>COUVERTURE SENIOR</h2><p>Cotisation mensuelle : {{cotisation_mensuelle}} FCFA</p><p>Garanties spécifiques : {{garanties_specifiques}}</p><p>Date d'effet : {{date_effet}}</p><h2>SPÉCIFICITÉS</h2><p>Ce contrat est conçu pour répondre aux besoins accrus en soins de santé des personnes âgées, avec des niveaux de remboursement adaptés.</p></div>`
  },
  {
    code: 'prev2_couverture_maternite',
    name: "Accord de contrat de couverture maternité (mutuelle)",
    category: 'assurance', price: 3000, priceMax: 9000,
    description: "Contrat de couverture maternité prenant en charge les frais liés à la grossesse, à l'accouchement et aux soins du nouveau-né.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 73,
    fieldsJson: F([
      {key:'adherente',label:"Nom de l'adhérente",type:'text',required:true},
      {key:'mutuelle',label:"Nom de la mutuelle",type:'text',required:true},
      {key:'plafond_maternite',label:"Plafond maternité (FCFA)",type:'text',required:true},
      {key:'delai_carence',label:"Délai de carence (mois)",type:'text',required:true},
      {key:'date_adhesion',label:"Date d'adhésion",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE COUVERTURE MATERNITÉ</h1><h2>ADHÉRENTE</h2><p>Nom : {{adherente}}</p><p>Mutuelle : {{mutuelle}}</p><h2>GARANTIE MATERNITÉ</h2><p>Plafond maternité : {{plafond_maternite}} FCFA</p><p>Délai de carence : {{delai_carence}} mois</p><p>Date d'adhésion : {{date_adhesion}}</p><h2>PRESTATIONS COUVERTES</h2><p>Consultations prénatales, accouchement, soins post-nataux et soins du nouveau-né dans la limite du plafond contractuel.</p></div>`
  },
  {
    code: 'prev2_forfait_hospitalisation',
    name: "Accord de contrat de forfait hospitalisation (dépassement)",
    category: 'assurance', price: 3500, priceMax: 10500,
    description: "Contrat de forfait hospitalisation couvrant les dépassements d'honoraires et les frais d'hospitalisation non remboursés par la sécurité sociale.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'assure',label:"Nom de l'assuré",type:'text',required:true},
      {key:'forfait_journalier',label:"Forfait journalier hospitalisation (FCFA)",type:'text',required:true},
      {key:'plafond_annuel',label:"Plafond annuel (FCFA)",type:'text',required:true},
      {key:'prime_mensuelle',label:"Prime mensuelle (FCFA)",type:'text',required:true},
      {key:'date_effet',label:"Date d'effet",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE FORFAIT HOSPITALISATION</h1><h2>ASSURÉ</h2><p>Nom : {{assure}}</p><h2>GARANTIE HOSPITALISATION</h2><p>Forfait journalier : {{forfait_journalier}} FCFA</p><p>Plafond annuel : {{plafond_annuel}} FCFA</p><p>Prime mensuelle : {{prime_mensuelle}} FCFA</p><p>Date d'effet : {{date_effet}}</p><h2>DÉPASSEMENTS COUVERTS</h2><p>Le présent contrat couvre les dépassements d'honoraires et les frais d'hébergement non remboursés dans les établissements conventionnés.</p></div>`
  },
  {
    code: 'prev2_dentaire_optique',
    name: "Accord de contrat dentaire et optique (mutuelle)",
    category: 'assurance', price: 3000, priceMax: 9000,
    description: "Contrat de mutuelle couvrant les soins dentaires et les dépenses d'optique avec remboursement complémentaire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 71,
    fieldsJson: F([
      {key:'adherent',label:"Nom de l'adhérent",type:'text',required:true},
      {key:'plafond_dentaire',label:"Plafond dentaire annuel (FCFA)",type:'text',required:true},
      {key:'plafond_optique',label:"Plafond optique annuel (FCFA)",type:'text',required:true},
      {key:'cotisation_mensuelle',label:"Cotisation mensuelle (FCFA)",type:'text',required:true},
      {key:'date_adhesion',label:"Date d'adhésion",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DENTAIRE ET OPTIQUE</h1><h2>ADHÉRENT</h2><p>Nom : {{adherent}}</p><h2>GARANTIES</h2><p>Plafond dentaire annuel : {{plafond_dentaire}} FCFA</p><p>Plafond optique annuel : {{plafond_optique}} FCFA</p><p>Cotisation mensuelle : {{cotisation_mensuelle}} FCFA</p><p>Date d'adhésion : {{date_adhesion}}</p><h2>SOINS COUVERTS</h2><p>Soins dentaires conservateurs, prothèses dentaires, lunettes de correction et lentilles de contact dans les limites fixées au tableau de garanties.</p></div>`
  },
  {
    code: 'prev2_tiers_payant_mutuelle',
    name: "Accord de service de tiers-payant (feuille soin mutuelle)",
    category: 'assurance', price: 2500, priceMax: 7500,
    description: "Convention de tiers-payant permettant à l'adhérent de bénéficier de soins sans avance de frais auprès des prestataires agréés.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'mutuelle',label:"Nom de la mutuelle",type:'text',required:true},
      {key:'prestataire',label:"Nom du prestataire de soins",type:'text',required:true},
      {key:'adherent',label:"Nom de l'adhérent",type:'text',required:true},
      {key:'numero_carte',label:"Numéro de carte mutuelle",type:'text',required:true},
      {key:'date_validite',label:"Date de validité de la carte",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE TIERS-PAYANT MUTUELLE</h1><h2>PARTIES</h2><p>Mutuelle : {{mutuelle}}</p><p>Prestataire de soins : {{prestataire}}</p><p>Adhérent : {{adherent}}</p><h2>IDENTIFIANT MUTUELLE</h2><p>Numéro de carte : {{numero_carte}}</p><p>Validité : {{date_validite}}</p><h2>MODALITÉS DU TIERS-PAYANT</h2><p>L'adhérent présente sa carte mutuelle au prestataire qui facture directement la mutuelle pour la part couverte, sans avance de frais pour l'adhérent.</p></div>`
  },
  {
    code: 'prev2_carte_mutuelle',
    name: "Accord de service de carte mutuelle (identifiant)",
    category: 'assurance', price: 2000, priceMax: 6000,
    description: "Convention relative à l'émission et à la gestion de la carte mutuelle servant d'identifiant pour l'accès aux soins couverts.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 62,
    fieldsJson: F([
      {key:'mutuelle',label:"Nom de la mutuelle",type:'text',required:true},
      {key:'adherent',label:"Nom de l'adhérent",type:'text',required:true},
      {key:'numero_adherent',label:"Numéro d'adhérent",type:'text',required:true},
      {key:'date_emission',label:"Date d'émission de la carte",type:'date',required:true},
      {key:'date_expiration',label:"Date d'expiration",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CARTE MUTUELLE</h1><h2>ÉMETTEUR</h2><p>Mutuelle : {{mutuelle}}</p><h2>TITULAIRE</h2><p>Adhérent : {{adherent}}</p><p>Numéro d'adhérent : {{numero_adherent}}</p><h2>VALIDITÉ</h2><p>Date d'émission : {{date_emission}}</p><p>Date d'expiration : {{date_expiration}}</p><h2>UTILISATION</h2><p>La carte mutuelle est strictement personnelle et doit être présentée à chaque accès aux soins auprès des prestataires du réseau.</p></div>`
  },
  {
    code: 'prev2_remboursement_frais_sante',
    name: "Accord de service de remboursement frais de santé (mutuelle)",
    category: 'assurance', price: 2500, priceMax: 7500,
    description: "Convention définissant les modalités de remboursement des frais de santé par la mutuelle à ses adhérents.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 67,
    fieldsJson: F([
      {key:'mutuelle',label:"Nom de la mutuelle",type:'text',required:true},
      {key:'adherent',label:"Nom de l'adhérent",type:'text',required:true},
      {key:'delai_remboursement',label:"Délai de remboursement (jours)",type:'text',required:true},
      {key:'taux_remboursement',label:"Taux de remboursement (%)",type:'text',required:true},
      {key:'date_convention',label:"Date de la convention",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE REMBOURSEMENT FRAIS DE SANTÉ</h1><h2>PARTIES</h2><p>Mutuelle : {{mutuelle}}</p><p>Adhérent : {{adherent}}</p><h2>MODALITÉS DE REMBOURSEMENT</h2><p>Délai de remboursement : {{delai_remboursement}} jours</p><p>Taux de remboursement : {{taux_remboursement}}%</p><p>Date de la convention : {{date_convention}}</p><h2>PROCÉDURE</h2><p>L'adhérent transmet les justificatifs de frais de santé à la mutuelle qui procède au remboursement dans les délais convenus.</p></div>`
  },
  {
    code: 'prev2_gestion_sinistres_maladie',
    name: "Accord de service de gestion des sinistres maladie (assureur)",
    category: 'assurance', price: 3000, priceMax: 9000,
    description: "Convention de gestion des sinistres maladie définissant les procédures de déclaration, d'instruction et de règlement des sinistres.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 58,
    fieldsJson: F([
      {key:'assureur',label:"Nom de l'assureur",type:'text',required:true},
      {key:'gestionnaire',label:"Gestionnaire de sinistres",type:'text',required:true},
      {key:'delai_declaration',label:"Délai de déclaration de sinistre (jours)",type:'text',required:true},
      {key:'delai_instruction',label:"Délai d'instruction (jours)",type:'text',required:true},
      {key:'date_convention',label:"Date de la convention",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE GESTION DES SINISTRES MALADIE</h1><h2>PARTIES</h2><p>Assureur : {{assureur}}</p><p>Gestionnaire : {{gestionnaire}}</p><h2>PROCÉDURES</h2><p>Délai de déclaration : {{delai_declaration}} jours</p><p>Délai d'instruction : {{delai_instruction}} jours</p><p>Date de la convention : {{date_convention}}</p><h2>GESTION DES LITIGES</h2><p>En cas de désaccord sur le règlement d'un sinistre, les parties conviennent de recourir à une procédure de médiation avant toute action judiciaire.</p></div>`
  },
  {
    code: 'prev2_partenariat_mutuelle_clinique',
    name: "Accord de partenariat mutuelle-clinique (réseau de soins)",
    category: 'assurance', price: 4000, priceMax: 12000,
    description: "Accord de partenariat entre une mutuelle et une clinique pour l'intégration au réseau de soins conventionné.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 63,
    fieldsJson: F([
      {key:'mutuelle',label:"Nom de la mutuelle",type:'text',required:true},
      {key:'clinique',label:"Nom de la clinique",type:'text',required:true},
      {key:'tarifs_conventionnes',label:"Description des tarifs conventionnés",type:'textarea',required:true},
      {key:'date_partenariat',label:"Date de prise d'effet du partenariat",type:'date',required:true},
      {key:'duree',label:"Durée du partenariat (années)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT MUTUELLE-CLINIQUE</h1><h2>PARTENAIRES</h2><p>Mutuelle : {{mutuelle}}</p><p>Clinique : {{clinique}}</p><h2>RÉSEAU DE SOINS</h2><p>Tarifs conventionnés : {{tarifs_conventionnes}}</p><p>Date d'effet : {{date_partenariat}}</p><p>Durée : {{duree}} ans</p><h2>ENGAGEMENTS</h2><p>La clinique s'engage à respecter les tarifs conventionnés et à pratiquer le tiers-payant pour les adhérents de la mutuelle.</p></div>`
  },
  {
    code: 'prev2_partenariat_mutuelle_pharmacie',
    name: "Accord de partenariat mutuelle-pharmacie",
    category: 'assurance', price: 3500, priceMax: 10500,
    description: "Accord de partenariat entre une mutuelle et une pharmacie agréée pour la délivrance de médicaments avec tiers-payant.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 61,
    fieldsJson: F([
      {key:'mutuelle',label:"Nom de la mutuelle",type:'text',required:true},
      {key:'pharmacie',label:"Nom de la pharmacie",type:'text',required:true},
      {key:'remise_accordee',label:"Remise accordée aux adhérents (%)",type:'text',required:true},
      {key:'date_partenariat',label:"Date du partenariat",type:'date',required:true},
      {key:'conditions_tiers_payant',label:"Conditions du tiers-payant",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT MUTUELLE-PHARMACIE</h1><h2>PARTENAIRES</h2><p>Mutuelle : {{mutuelle}}</p><p>Pharmacie : {{pharmacie}}</p><h2>CONDITIONS</h2><p>Remise accordée : {{remise_accordee}}%</p><p>Date du partenariat : {{date_partenariat}}</p><p>Conditions tiers-payant : {{conditions_tiers_payant}}</p><h2>ENGAGEMENTS</h2><p>La pharmacie s'engage à appliquer les tarifs convenus et à facturer directement la mutuelle pour la part prise en charge.</p></div>`
  },
  {
    code: 'prev2_bilan_actuariel_prevoyance',
    name: "Rapport de bilan actuariel prévoyance",
    category: 'assurance', price: 7000, priceMax: 21000,
    description: "Rapport de bilan actuariel analysant l'équilibre technique et financier d'un régime de prévoyance.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 50,
    fieldsJson: F([
      {key:'organisme',label:"Nom de l'organisme de prévoyance",type:'text',required:true},
      {key:'actuaire',label:"Nom de l'actuaire",type:'text',required:true},
      {key:'periode_analyse',label:"Période analysée",type:'text',required:true},
      {key:'nb_assures',label:"Nombre d'assurés",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE BILAN ACTUARIEL PRÉVOYANCE</h1><h2>IDENTIFICATION</h2><p>Organisme : {{organisme}}</p><p>Actuaire : {{actuaire}}</p><p>Période : {{periode_analyse}}</p><p>Nombre d'assurés : {{nb_assures}}</p><p>Date du rapport : {{date_rapport}}</p><h2>ANALYSE TECHNIQUE</h2><p>Le présent bilan actuariel analyse l'équilibre entre les cotisations perçues et les prestations versées, les provisions techniques constituées et les perspectives financières du régime.</p><h2>RECOMMANDATIONS</h2><p>Les recommandations actuarielles sont formulées en vue d'assurer la pérennité financière du régime de prévoyance.</p></div>`
  },
  {
    code: 'prev2_plan_developpement_mutuelle',
    name: "Plan de développement mutuelle santé",
    category: 'assurance', price: 6000, priceMax: 18000,
    description: "Document stratégique définissant les axes de développement d'une mutuelle santé sur 3 à 5 ans.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 48,
    fieldsJson: F([
      {key:'mutuelle',label:"Nom de la mutuelle",type:'text',required:true},
      {key:'zone_couverture',label:"Zone géographique de couverture",type:'text',required:true},
      {key:'objectif_adherents',label:"Objectif d'adhérents sur 5 ans",type:'text',required:true},
      {key:'axes_developpement',label:"Axes stratégiques de développement",type:'textarea',required:true},
      {key:'date_plan',label:"Date d'élaboration du plan",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT MUTUELLE SANTÉ</h1><h2>MUTUELLE</h2><p>Nom : {{mutuelle}}</p><p>Zone de couverture : {{zone_couverture}}</p><h2>OBJECTIFS</h2><p>Objectif adhérents à 5 ans : {{objectif_adherents}}</p><h2>AXES STRATÉGIQUES</h2><p>{{axes_developpement}}</p><p>Date du plan : {{date_plan}}</p><h2>MISE EN OEUVRE</h2><p>Le présent plan sera révisé annuellement et soumis à l'approbation du conseil d'administration de la mutuelle.</p></div>`
  },
  {
    code: 'prev2_charte_prevoyance_sante_afrique',
    name: "Charte de la prévoyance et de la protection santé en Afrique",
    category: 'assurance', price: 5000, priceMax: 15000,
    description: "Charte énonçant les principes fondamentaux de la prévoyance et de la protection santé dans le contexte africain.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 45,
    fieldsJson: F([
      {key:'organisme',label:"Organisme signataire",type:'text',required:true},
      {key:'representant',label:"Représentant légal",type:'text',required:true},
      {key:'pays',label:"Pays d'application",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE LA PRÉVOYANCE ET DE LA PROTECTION SANTÉ EN AFRIQUE</h1><h2>SIGNATAIRE</h2><p>Organisme : {{organisme}}</p><p>Représentant : {{representant}}</p><p>Pays : {{pays}}</p><p>Date de signature : {{date_signature}}</p><h2>PRINCIPES FONDAMENTAUX</h2><p>1. Universalité de l'accès aux soins de santé</p><p>2. Solidarité entre les membres</p><p>3. Transparence dans la gestion des fonds</p><p>4. Protection des droits des assurés</p><p>5. Adaptation aux réalités socio-économiques africaines</p><h2>ENGAGEMENT</h2><p>L'organisme signataire s'engage à respecter et promouvoir ces principes dans toutes ses activités.</p></div>`
  },

  // ─── 25 templates Mutuelles santé CIMA (mut_) ───
  {
    code: 'mut_creation_mutuelle_cima',
    name: "Accord de création d'une mutuelle de santé (loi CIMA)",
    category: 'assurance', price: 6000, priceMax: 18000,
    description: "Acte de création d'une mutuelle de santé conforme aux dispositions du Code CIMA et du droit communautaire OHADA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'nom_mutuelle',label:"Nom de la mutuelle",type:'text',required:true},
      {key:'siege_social',label:"Siège social",type:'text',required:true},
      {key:'fondateurs',label:"Noms des membres fondateurs",type:'textarea',required:true},
      {key:'objet_social',label:"Objet social de la mutuelle",type:'textarea',required:true},
      {key:'date_creation',label:"Date de création",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACTE DE CRÉATION D'UNE MUTUELLE DE SANTÉ (LOI CIMA)</h1><h2>IDENTIFICATION</h2><p>Nom : {{nom_mutuelle}}</p><p>Siège social : {{siege_social}}</p><p>Date de création : {{date_creation}}</p><h2>MEMBRES FONDATEURS</h2><p>{{fondateurs}}</p><h2>OBJET SOCIAL</h2><p>{{objet_social}}</p><h2>CADRE JURIDIQUE</h2><p>La présente mutuelle est créée conformément aux dispositions du Code CIMA, du droit OHADA et de la législation nationale en vigueur.</p></div>`
  },
  {
    code: 'mut_statuts_mutuelle_cima',
    name: "Accord de statuts mutuelle de santé (CIMA)",
    category: 'assurance', price: 5500, priceMax: 16500,
    description: "Statuts types d'une mutuelle de santé conformes au Code CIMA, définissant l'organisation, le fonctionnement et les droits des membres.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'nom_mutuelle',label:"Nom de la mutuelle",type:'text',required:true},
      {key:'siege',label:"Siège social",type:'text',required:true},
      {key:'capital_social',label:"Fonds d'établissement (FCFA)",type:'text',required:true},
      {key:'president',label:"Président du conseil d'administration",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption des statuts",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>STATUTS DE LA MUTUELLE DE SANTÉ</h1><h2>ARTICLE 1 - DÉNOMINATION</h2><p>Il est constitué une mutuelle de santé dénommée : {{nom_mutuelle}}</p><h2>ARTICLE 2 - SIÈGE SOCIAL</h2><p>{{siege}}</p><h2>ARTICLE 3 - FONDS D'ÉTABLISSEMENT</h2><p>{{capital_social}} FCFA</p><h2>ARTICLE 4 - DIRECTION</h2><p>Président : {{president}}</p><p>Date d'adoption : {{date_adoption}}</p><h2>ARTICLE 5 - CONFORMITÉ CIMA</h2><p>Les présents statuts sont établis conformément au Code CIMA et soumis au contrôle de la CIMA.</p></div>`
  },
  {
    code: 'mut_reglement_interieur',
    name: "Accord de règlement intérieur mutuelle",
    category: 'assurance', price: 4500, priceMax: 13500,
    description: "Règlement intérieur d'une mutuelle de santé précisant les règles de fonctionnement, les droits et obligations des membres.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'mutuelle',label:"Nom de la mutuelle",type:'text',required:true},
      {key:'conditions_adhesion',label:"Conditions d'adhésion",type:'textarea',required:true},
      {key:'cotisations',label:"Barème des cotisations",type:'textarea',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RÈGLEMENT INTÉRIEUR DE LA MUTUELLE</h1><h2>MUTUELLE</h2><p>{{mutuelle}}</p><h2>CONDITIONS D'ADHÉSION</h2><p>{{conditions_adhesion}}</p><h2>COTISATIONS</h2><p>{{cotisations}}</p><p>Date d'adoption : {{date_adoption}}</p><h2>SANCTIONS</h2><p>Tout membre ne respectant pas les dispositions du présent règlement s'expose à des sanctions pouvant aller jusqu'à l'exclusion de la mutuelle.</p></div>`
  },
  {
    code: 'mut_adhesion_individuelle',
    name: "Accord d'adhésion individuelle à une mutuelle",
    category: 'assurance', price: 2500, priceMax: 7500,
    description: "Formulaire d'adhésion individuelle à une mutuelle de santé avec engagement de l'adhérent et de la mutuelle.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 80,
    fieldsJson: F([
      {key:'adherent',label:"Nom et prénom de l'adhérent",type:'text',required:true},
      {key:'date_naissance',label:"Date de naissance",type:'date',required:true},
      {key:'mutuelle',label:"Nom de la mutuelle",type:'text',required:true},
      {key:'formule_choisie',label:"Formule choisie",type:'text',required:true},
      {key:'date_adhesion',label:"Date d'adhésion",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>FORMULAIRE D'ADHÉSION INDIVIDUELLE À LA MUTUELLE</h1><h2>ADHÉRENT</h2><p>Nom et prénom : {{adherent}}</p><p>Date de naissance : {{date_naissance}}</p><h2>MUTUELLE</h2><p>{{mutuelle}}</p><h2>ADHÉSION</h2><p>Formule choisie : {{formule_choisie}}</p><p>Date d'adhésion : {{date_adhesion}}</p><h2>ENGAGEMENT</h2><p>L'adhérent s'engage à respecter les statuts et règlement intérieur de la mutuelle et à payer ses cotisations aux échéances prévues.</p></div>`
  },
  {
    code: 'mut_adhesion_collective_entreprise',
    name: "Accord d'adhésion collective (entreprise-mutuelle)",
    category: 'assurance', price: 5000, priceMax: 15000,
    description: "Convention d'adhésion collective entre une entreprise et une mutuelle pour la couverture santé de l'ensemble du personnel.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 78,
    fieldsJson: F([
      {key:'entreprise',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'mutuelle',label:"Nom de la mutuelle",type:'text',required:true},
      {key:'nb_salaries',label:"Nombre de salariés couverts",type:'text',required:true},
      {key:'part_patronale',label:"Part patronale de cotisation (%)",type:'text',required:true},
      {key:'date_effet',label:"Date d'effet",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D'ADHÉSION COLLECTIVE ENTREPRISE-MUTUELLE</h1><h2>PARTIES</h2><p>Entreprise : {{entreprise}}</p><p>Mutuelle : {{mutuelle}}</p><h2>COUVERTURE COLLECTIVE</h2><p>Nombre de salariés : {{nb_salaries}}</p><p>Part patronale : {{part_patronale}}%</p><p>Date d'effet : {{date_effet}}</p><h2>OBLIGATIONS DE L'ENTREPRISE</h2><p>L'entreprise s'engage à verser sa contribution patronale aux échéances prévues et à communiquer à la mutuelle toute modification affectant le personnel couvert.</p></div>`
  },
  {
    code: 'mut_cotisation_mutualiste',
    name: "Accord de cotisation mutualiste (tableau des garanties)",
    category: 'assurance', price: 3000, priceMax: 9000,
    description: "Document définissant les niveaux de cotisation et le tableau des garanties correspondant pour chaque formule de la mutuelle.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 74,
    fieldsJson: F([
      {key:'mutuelle',label:"Nom de la mutuelle",type:'text',required:true},
      {key:'formules',label:"Formules et niveaux de cotisation",type:'textarea',required:true},
      {key:'tableau_garanties',label:"Tableau des garanties",type:'textarea',required:true},
      {key:'date_application',label:"Date d'application",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>TABLEAU DES COTISATIONS ET GARANTIES MUTUALISTES</h1><h2>MUTUELLE</h2><p>{{mutuelle}}</p><h2>FORMULES ET COTISATIONS</h2><p>{{formules}}</p><h2>TABLEAU DES GARANTIES</h2><p>{{tableau_garanties}}</p><p>Date d'application : {{date_application}}</p><h2>RÉVISION</h2><p>Le présent tableau est révisable annuellement par le conseil d'administration de la mutuelle.</p></div>`
  },
  {
    code: 'mut_mise_en_place_amo',
    name: "Accord de mise en place d'un AMO (assurance maladie obligatoire CI)",
    category: 'assurance', price: 7000, priceMax: 21000,
    description: "Convention de mise en place de l'Assurance Maladie Obligatoire (AMO) en Côte d'Ivoire, conformément à la loi sur la CMU.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 82,
    fieldsJson: F([
      {key:'employeur',label:"Nom de l'employeur",type:'text',required:true},
      {key:'nb_salaries',label:"Nombre de salariés affiliés",type:'text',required:true},
      {key:'taux_cotisation_patronal',label:"Taux de cotisation patronal (%)",type:'text',required:true},
      {key:'taux_cotisation_salarial',label:"Taux de cotisation salarial (%)",type:'text',required:true},
      {key:'date_affiliation',label:"Date d'affiliation à l'AMO",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE MISE EN PLACE DE L'AMO (ASSURANCE MALADIE OBLIGATOIRE)</h1><h2>EMPLOYEUR</h2><p>{{employeur}}</p><p>Nombre de salariés : {{nb_salaries}}</p><h2>COTISATIONS AMO</h2><p>Taux patronal : {{taux_cotisation_patronal}}%</p><p>Taux salarial : {{taux_cotisation_salarial}}%</p><p>Date d'affiliation : {{date_affiliation}}</p><h2>CADRE LÉGAL</h2><p>Le présent accord est établi en application de la loi instituant la Couverture Maladie Universelle (CMU) en Côte d'Ivoire et des textes réglementaires de la CNAM.</p></div>`
  },
  {
    code: 'mut_carte_amo_cnam',
    name: "Accord de service de carte AMO (CNAM CI)",
    category: 'assurance', price: 2500, priceMax: 7500,
    description: "Convention relative à l'émission de la carte AMO par la CNAM pour l'accès aux soins dans le cadre de la couverture maladie obligatoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 76,
    fieldsJson: F([
      {key:'assure',label:"Nom de l'assuré",type:'text',required:true},
      {key:'numero_cnam',label:"Numéro CNAM",type:'text',required:true},
      {key:'employeur',label:"Employeur affiliant",type:'text',required:true},
      {key:'date_emission',label:"Date d'émission",type:'date',required:true},
      {key:'date_expiration',label:"Date d'expiration",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE CARTE AMO - CNAM CI</h1><h2>BÉNÉFICIAIRE</h2><p>Assuré : {{assure}}</p><p>Numéro CNAM : {{numero_cnam}}</p><p>Employeur : {{employeur}}</p><h2>VALIDITÉ</h2><p>Date d'émission : {{date_emission}}</p><p>Date d'expiration : {{date_expiration}}</p><h2>UTILISATION</h2><p>La carte AMO donne accès aux soins auprès des formations sanitaires agréées par la CNAM en Côte d'Ivoire.</p></div>`
  },
  {
    code: 'mut_remboursement_amo',
    name: "Accord de service de remboursement AMO",
    category: 'assurance', price: 3000, priceMax: 9000,
    description: "Convention définissant les modalités de remboursement des frais de santé dans le cadre de l'Assurance Maladie Obligatoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 73,
    fieldsJson: F([
      {key:'cnam',label:"CNAM CI",type:'text',required:true},
      {key:'assure',label:"Nom de l'assuré",type:'text',required:true},
      {key:'taux_remboursement',label:"Taux de remboursement AMO (%)",type:'text',required:true},
      {key:'plafond_annuel',label:"Plafond annuel de remboursement (FCFA)",type:'text',required:true},
      {key:'date_convention',label:"Date de la convention",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE REMBOURSEMENT AMO</h1><h2>PARTIES</h2><p>Organisme : {{cnam}}</p><p>Assuré : {{assure}}</p><h2>PARAMÈTRES DE REMBOURSEMENT</h2><p>Taux de remboursement : {{taux_remboursement}}%</p><p>Plafond annuel : {{plafond_annuel}} FCFA</p><p>Date de la convention : {{date_convention}}</p><h2>PROCÉDURE</h2><p>L'assuré présente ses justificatifs de soins à la CNAM qui procède au remboursement selon les tarifs de référence AMO en vigueur.</p></div>`
  },
  {
    code: 'mut_tiers_payant_amo_clinique',
    name: "Accord de service de tiers-payant AMO (clinique agréée)",
    category: 'assurance', price: 4000, priceMax: 12000,
    description: "Convention de tiers-payant AMO entre la CNAM et une clinique agréée pour la prise en charge directe des assurés.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 71,
    fieldsJson: F([
      {key:'cnam',label:"CNAM CI",type:'text',required:true},
      {key:'clinique',label:"Nom de la clinique agréée",type:'text',required:true},
      {key:'numero_agrement',label:"Numéro d'agrément CNAM",type:'text',required:true},
      {key:'tarifs_ref',label:"Tarifs de référence applicables",type:'textarea',required:true},
      {key:'date_convention',label:"Date de la convention",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE TIERS-PAYANT AMO - CLINIQUE AGRÉÉE</h1><h2>PARTIES</h2><p>CNAM CI : {{cnam}}</p><p>Clinique : {{clinique}}</p><p>Numéro d'agrément : {{numero_agrement}}</p><h2>TARIFS DE RÉFÉRENCE</h2><p>{{tarifs_ref}}</p><p>Date de la convention : {{date_convention}}</p><h2>FACTURATION</h2><p>La clinique facture directement la CNAM pour la part AMO des soins prodigués aux assurés, sans avance de frais pour ceux-ci.</p></div>`
  },
  {
    code: 'mut_gestion_risque_maladie_cnam',
    name: "Accord de service de gestion du risque maladie (CNAM)",
    category: 'assurance', price: 5000, priceMax: 15000,
    description: "Convention de gestion du risque maladie définissant les modalités d'analyse, de contrôle et de maîtrise des dépenses de santé.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 58,
    fieldsJson: F([
      {key:'cnam',label:"CNAM CI",type:'text',required:true},
      {key:'partenaire',label:"Partenaire conventionné",type:'text',required:true},
      {key:'indicateurs_suivi',label:"Indicateurs de suivi du risque",type:'textarea',required:true},
      {key:'objectifs_maitrise',label:"Objectifs de maîtrise des dépenses",type:'textarea',required:true},
      {key:'date_convention',label:"Date de la convention",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE GESTION DU RISQUE MALADIE - CNAM</h1><h2>PARTIES</h2><p>CNAM CI : {{cnam}}</p><p>Partenaire : {{partenaire}}</p><h2>GESTION DU RISQUE</h2><p>Indicateurs de suivi : {{indicateurs_suivi}}</p><p>Objectifs de maîtrise : {{objectifs_maitrise}}</p><p>Date de la convention : {{date_convention}}</p><h2>REPORTING</h2><p>Un rapport trimestriel de suivi des indicateurs sera transmis à la CNAM dans les 30 jours suivant la fin de chaque trimestre.</p></div>`
  },
  {
    code: 'mut_financement_solidarite_maladie',
    name: "Accord de service de financement solidarité maladie (FONDS)",
    category: 'assurance', price: 6000, priceMax: 18000,
    description: "Convention de financement du fonds de solidarité maladie destiné à couvrir les populations vulnérables non couvertes par l'AMO.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 52,
    fieldsJson: F([
      {key:'fonds',label:"Nom du fonds de solidarité",type:'text',required:true},
      {key:'organisme_gestionnaire',label:"Organisme gestionnaire",type:'text',required:true},
      {key:'population_cible',label:"Population cible bénéficiaire",type:'textarea',required:true},
      {key:'dotation_annuelle',label:"Dotation annuelle (FCFA)",type:'text',required:true},
      {key:'date_convention',label:"Date de la convention",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE FINANCEMENT - FONDS DE SOLIDARITÉ MALADIE</h1><h2>FONDS</h2><p>Dénomination : {{fonds}}</p><p>Organisme gestionnaire : {{organisme_gestionnaire}}</p><h2>BÉNÉFICIAIRES</h2><p>Population cible : {{population_cible}}</p><h2>FINANCEMENT</h2><p>Dotation annuelle : {{dotation_annuelle}} FCFA</p><p>Date de la convention : {{date_convention}}</p><h2>GOUVERNANCE</h2><p>La gestion du fonds est soumise à un contrôle indépendant et à la publication annuelle d'un rapport d'activité.</p></div>`
  },
  {
    code: 'mut_partenariat_cnam_clinique_privee',
    name: "Accord de partenariat CNAM-clinique privée",
    category: 'assurance', price: 5000, priceMax: 15000,
    description: "Accord de partenariat entre la CNAM et une clinique privée pour l'élargissement du réseau de soins conventionné.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 66,
    fieldsJson: F([
      {key:'clinique',label:"Nom de la clinique privée",type:'text',required:true},
      {key:'specialites',label:"Spécialités médicales proposées",type:'textarea',required:true},
      {key:'tarifs_cnam',label:"Tarifs CNAM applicables",type:'textarea',required:true},
      {key:'zone_geographique',label:"Zone géographique de desserte",type:'text',required:true},
      {key:'date_partenariat',label:"Date du partenariat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT CNAM-CLINIQUE PRIVÉE</h1><h2>CLINIQUE</h2><p>{{clinique}}</p><p>Spécialités : {{specialites}}</p><p>Zone de desserte : {{zone_geographique}}</p><h2>CONDITIONS CNAM</h2><p>Tarifs CNAM : {{tarifs_cnam}}</p><p>Date du partenariat : {{date_partenariat}}</p><h2>OBLIGATIONS</h2><p>La clinique s'engage à accueillir les assurés CNAM selon les conditions tarifaires et qualitatives définies dans le présent accord.</p></div>`
  },
  {
    code: 'mut_partenariat_cnam_pharmacie',
    name: "Accord de partenariat CNAM-pharmacie agréée",
    category: 'assurance', price: 4000, priceMax: 12000,
    description: "Accord de partenariat entre la CNAM et une pharmacie agréée pour la délivrance de médicaments avec tiers-payant AMO.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 64,
    fieldsJson: F([
      {key:'pharmacie',label:"Nom de la pharmacie",type:'text',required:true},
      {key:'pharmacien',label:"Nom du pharmacien responsable",type:'text',required:true},
      {key:'liste_medicaments',label:"Liste des médicaments CNAM remboursables",type:'textarea',required:true},
      {key:'tarifs_ref',label:"Tarifs de référence",type:'text',required:true},
      {key:'date_agrement',label:"Date d'agrément",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT CNAM-PHARMACIE AGRÉÉE</h1><h2>PHARMACIE</h2><p>{{pharmacie}}</p><p>Pharmacien responsable : {{pharmacien}}</p><h2>CONDITIONS AMO</h2><p>Médicaments remboursables : {{liste_medicaments}}</p><p>Tarifs de référence : {{tarifs_ref}}</p><p>Date d'agrément : {{date_agrement}}</p><h2>FACTURATION</h2><p>La pharmacie facture la CNAM pour la part remboursable des médicaments prescrits aux assurés sur présentation de leur carte AMO.</p></div>`
  },
  {
    code: 'mut_partenariat_mutuelle_laboratoire',
    name: "Accord de partenariat mutuelle-laboratoire",
    category: 'assurance', price: 3500, priceMax: 10500,
    description: "Accord de partenariat entre une mutuelle et un laboratoire d'analyses médicales pour la prise en charge des examens biologiques.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 59,
    fieldsJson: F([
      {key:'mutuelle',label:"Nom de la mutuelle",type:'text',required:true},
      {key:'laboratoire',label:"Nom du laboratoire",type:'text',required:true},
      {key:'examens_couverts',label:"Examens biologiques couverts",type:'textarea',required:true},
      {key:'taux_prise_en_charge',label:"Taux de prise en charge (%)",type:'text',required:true},
      {key:'date_convention',label:"Date de la convention",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT MUTUELLE-LABORATOIRE</h1><h2>PARTIES</h2><p>Mutuelle : {{mutuelle}}</p><p>Laboratoire : {{laboratoire}}</p><h2>COUVERTURE</h2><p>Examens couverts : {{examens_couverts}}</p><p>Taux de prise en charge : {{taux_prise_en_charge}}%</p><p>Date de la convention : {{date_convention}}</p><h2>TIERS-PAYANT</h2><p>Les adhérents de la mutuelle bénéficient du tiers-payant pour les examens conventionnés sur présentation de leur carte mutuelle.</p></div>`
  },
  {
    code: 'mut_transport_medical_ambulance',
    name: "Accord de service de transport médical (ambulance mutuelle)",
    category: 'assurance', price: 3500, priceMax: 10500,
    description: "Convention de service de transport médical par ambulance pour les adhérents de la mutuelle en cas d'urgence ou d'hospitalisation.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 63,
    fieldsJson: F([
      {key:'mutuelle',label:"Nom de la mutuelle",type:'text',required:true},
      {key:'prestataire_transport',label:"Prestataire de transport médical",type:'text',required:true},
      {key:'couverture_transport',label:"Conditions de couverture du transport",type:'textarea',required:true},
      {key:'plafond_transport',label:"Plafond de prise en charge (FCFA)",type:'text',required:true},
      {key:'date_convention',label:"Date de la convention",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TRANSPORT MÉDICAL - AMBULANCE MUTUELLE</h1><h2>PARTIES</h2><p>Mutuelle : {{mutuelle}}</p><p>Prestataire : {{prestataire_transport}}</p><h2>COUVERTURE</h2><p>Conditions : {{couverture_transport}}</p><p>Plafond de prise en charge : {{plafond_transport}} FCFA</p><p>Date de la convention : {{date_convention}}</p><h2>DISPONIBILITÉ</h2><p>Le service d'ambulance est disponible 24h/24 et 7j/7 pour les adhérents de la mutuelle sur simple appel.</p></div>`
  },
  {
    code: 'mut_evacuation_sanitaire_evasan',
    name: "Accord de service d'évacuation sanitaire (EVASAN mutuelle)",
    category: 'assurance', price: 6000, priceMax: 18000,
    description: "Convention d'évacuation sanitaire pour la prise en charge du transport et des soins à l'étranger en cas d'urgence médicale grave.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 57,
    fieldsJson: F([
      {key:'mutuelle',label:"Nom de la mutuelle",type:'text',required:true},
      {key:'assure',label:"Nom de l'assuré",type:'text',required:true},
      {key:'plafond_evasan',label:"Plafond EVASAN (FCFA)",type:'text',required:true},
      {key:'destinations_couvertes',label:"Destinations couvertes",type:'textarea',required:true},
      {key:'date_effet',label:"Date d'effet",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D'ÉVACUATION SANITAIRE (EVASAN) - MUTUELLE</h1><h2>PARTIES</h2><p>Mutuelle : {{mutuelle}}</p><p>Assuré : {{assure}}</p><h2>GARANTIE EVASAN</h2><p>Plafond EVASAN : {{plafond_evasan}} FCFA</p><p>Destinations couvertes : {{destinations_couvertes}}</p><p>Date d'effet : {{date_effet}}</p><h2>DÉCLENCHEMENT</h2><p>L'évacuation sanitaire est déclenchée sur décision médicale certifiant que les soins nécessaires ne peuvent être dispensés localement.</p></div>`
  },
  {
    code: 'mut_soutien_psychologique',
    name: "Accord de service de soutien psychologique (mutuelle)",
    category: 'assurance', price: 3000, priceMax: 9000,
    description: "Convention de service de soutien psychologique pour les adhérents de la mutuelle bénéficiant d'une assistance psychologique.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 54,
    fieldsJson: F([
      {key:'mutuelle',label:"Nom de la mutuelle",type:'text',required:true},
      {key:'prestataire_psy',label:"Prestataire psychologique",type:'text',required:true},
      {key:'nb_seances',label:"Nombre de séances prises en charge par an",type:'text',required:true},
      {key:'modalites_acces',label:"Modalités d'accès au service",type:'textarea',required:true},
      {key:'date_convention',label:"Date de la convention",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SOUTIEN PSYCHOLOGIQUE - MUTUELLE</h1><h2>PARTIES</h2><p>Mutuelle : {{mutuelle}}</p><p>Prestataire : {{prestataire_psy}}</p><h2>PRESTATIONS</h2><p>Séances prises en charge : {{nb_seances}} par an</p><p>Modalités d'accès : {{modalites_acces}}</p><p>Date de la convention : {{date_convention}}</p><h2>CONFIDENTIALITÉ</h2><p>Les séances de soutien psychologique sont strictement confidentielles et aucune information médicale ne sera transmise à l'employeur ou à la mutuelle.</p></div>`
  },
  {
    code: 'mut_prevention_sante_programme',
    name: "Accord de service de prévention santé (programme mutuelle)",
    category: 'assurance', price: 3500, priceMax: 10500,
    description: "Convention de programme de prévention santé offert par la mutuelle à ses adhérents pour la promotion de la santé.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 56,
    fieldsJson: F([
      {key:'mutuelle',label:"Nom de la mutuelle",type:'text',required:true},
      {key:'actions_prevention',label:"Actions de prévention prévues",type:'textarea',required:true},
      {key:'population_cible',label:"Population cible du programme",type:'text',required:true},
      {key:'budget_prevention',label:"Budget prévention annuel (FCFA)",type:'text',required:true},
      {key:'date_lancement',label:"Date de lancement du programme",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PROGRAMME DE PRÉVENTION SANTÉ - MUTUELLE</h1><h2>MUTUELLE</h2><p>{{mutuelle}}</p><h2>PROGRAMME</h2><p>Actions de prévention : {{actions_prevention}}</p><p>Population cible : {{population_cible}}</p><p>Budget annuel : {{budget_prevention}} FCFA</p><p>Date de lancement : {{date_lancement}}</p><h2>ÉVALUATION</h2><p>L'efficacité du programme sera évaluée annuellement sur la base d'indicateurs de santé définis en amont.</p></div>`
  },
  {
    code: 'mut_numerique_application_mobile',
    name: "Accord de service de numérique mutuelle (application mobile)",
    category: 'assurance', price: 4000, priceMax: 12000,
    description: "Convention de développement et de déploiement d'une application mobile pour la gestion des services de la mutuelle.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 61,
    fieldsJson: F([
      {key:'mutuelle',label:"Nom de la mutuelle",type:'text',required:true},
      {key:'prestataire_tech',label:"Prestataire technologique",type:'text',required:true},
      {key:'fonctionnalites',label:"Fonctionnalités de l'application",type:'textarea',required:true},
      {key:'delai_livraison',label:"Délai de livraison (mois)",type:'text',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE NUMÉRIQUE MUTUELLE - APPLICATION MOBILE</h1><h2>PARTIES</h2><p>Mutuelle : {{mutuelle}}</p><p>Prestataire : {{prestataire_tech}}</p><h2>APPLICATION</h2><p>Fonctionnalités : {{fonctionnalites}}</p><p>Délai de livraison : {{delai_livraison}} mois</p><p>Date du contrat : {{date_contrat}}</p><h2>MAINTENANCE</h2><p>Le prestataire assure la maintenance corrective et évolutive de l'application pendant une durée de 3 ans après la livraison.</p></div>`
  },
  {
    code: 'mut_formation_gestionnaire',
    name: "Accord de service de formation gestionnaire mutuelle",
    category: 'assurance', price: 4500, priceMax: 13500,
    description: "Convention de formation des gestionnaires de mutuelles de santé aux techniques de gestion actuarielle et administrative.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 53,
    fieldsJson: F([
      {key:'mutuelle',label:"Nom de la mutuelle",type:'text',required:true},
      {key:'organisme_formation',label:"Organisme de formation",type:'text',required:true},
      {key:'modules_formation',label:"Modules de formation prévus",type:'textarea',required:true},
      {key:'nb_participants',label:"Nombre de participants",type:'text',required:true},
      {key:'date_formation',label:"Date de la formation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE FORMATION DES GESTIONNAIRES DE MUTUELLE</h1><h2>PARTIES</h2><p>Mutuelle : {{mutuelle}}</p><p>Organisme de formation : {{organisme_formation}}</p><h2>PROGRAMME</h2><p>Modules : {{modules_formation}}</p><p>Participants : {{nb_participants}}</p><p>Date de formation : {{date_formation}}</p><h2>CERTIFICATION</h2><p>Une attestation de formation sera délivrée à chaque participant à l'issue du programme.</p></div>`
  },
  {
    code: 'mut_gestion_impayes_cotisation',
    name: "Accord de gestion des impayés de cotisation",
    category: 'assurance', price: 3000, priceMax: 9000,
    description: "Convention définissant les procédures de gestion des impayés de cotisation et les mécanismes de recouvrement amiable.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 57,
    fieldsJson: F([
      {key:'mutuelle',label:"Nom de la mutuelle",type:'text',required:true},
      {key:'procedure_relance',label:"Procédure de relance des impayés",type:'textarea',required:true},
      {key:'delai_regularisation',label:"Délai de régularisation (jours)",type:'text',required:true},
      {key:'penalites',label:"Pénalités de retard applicables",type:'text',required:true},
      {key:'date_convention',label:"Date de la convention",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE GESTION DES IMPAYÉS DE COTISATION</h1><h2>MUTUELLE</h2><p>{{mutuelle}}</p><h2>PROCÉDURE DE RECOUVREMENT</h2><p>Procédure de relance : {{procedure_relance}}</p><p>Délai de régularisation : {{delai_regularisation}} jours</p><p>Pénalités de retard : {{penalites}}</p><p>Date de la convention : {{date_convention}}</p><h2>SUSPENSION DES DROITS</h2><p>En cas de non-paiement au-delà du délai de régularisation, les droits à la couverture de l'adhérent sont suspendus jusqu'à régularisation complète.</p></div>`
  },
  {
    code: 'mut_rapport_performance_mutuelle',
    name: "Rapport de performance mutuelle",
    category: 'assurance', price: 5000, priceMax: 15000,
    description: "Rapport annuel de performance d'une mutuelle de santé analysant les indicateurs clés de gestion, de couverture et de satisfaction des membres.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 50,
    fieldsJson: F([
      {key:'mutuelle',label:"Nom de la mutuelle",type:'text',required:true},
      {key:'periode',label:"Période du rapport",type:'text',required:true},
      {key:'nb_adherents',label:"Nombre d'adhérents",type:'text',required:true},
      {key:'taux_sinistralite',label:"Taux de sinistralité (%)",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE DE LA MUTUELLE</h1><h2>MUTUELLE</h2><p>{{mutuelle}}</p><p>Période : {{periode}}</p><h2>INDICATEURS CLÉS</h2><p>Nombre d'adhérents : {{nb_adherents}}</p><p>Taux de sinistralité : {{taux_sinistralite}}%</p><p>Date du rapport : {{date_rapport}}</p><h2>ANALYSE</h2><p>Le présent rapport analyse la performance de la mutuelle sur la période et formule des recommandations pour l'amélioration de la couverture et de la gestion.</p></div>`
  },
  {
    code: 'mut_plan_developpement_csu',
    name: "Plan de développement couverture santé universelle (CSU)",
    category: 'assurance', price: 7000, priceMax: 21000,
    description: "Plan stratégique de développement de la couverture santé universelle définissant les objectifs, les ressources et le calendrier de mise en oeuvre.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 55,
    fieldsJson: F([
      {key:'organisme',label:"Organisme porteur du plan",type:'text',required:true},
      {key:'population_cible',label:"Population cible à couvrir",type:'text',required:true},
      {key:'objectif_couverture',label:"Objectif de couverture (%)",type:'text',required:true},
      {key:'ressources_mobilisees',label:"Ressources mobilisées",type:'textarea',required:true},
      {key:'date_plan',label:"Date d'élaboration du plan",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT DE LA COUVERTURE SANTÉ UNIVERSELLE (CSU)</h1><h2>PORTEUR</h2><p>Organisme : {{organisme}}</p><h2>AMBITION</h2><p>Population cible : {{population_cible}}</p><p>Objectif de couverture : {{objectif_couverture}}%</p><h2>RESSOURCES</h2><p>{{ressources_mobilisees}}</p><p>Date d'élaboration : {{date_plan}}</p><h2>MISE EN OEUVRE</h2><p>Le plan sera décliné en plans d'actions annuels avec des indicateurs de suivi et un comité de pilotage dédié.</p></div>`
  },
  {
    code: 'mut_charte_csu_solidarite_afrique',
    name: "Charte de la couverture santé universelle et de la solidarité en Afrique",
    category: 'assurance', price: 5000, priceMax: 15000,
    description: "Charte des principes et engagements pour la promotion de la couverture santé universelle et de la solidarité en Afrique subsaharienne.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 48,
    fieldsJson: F([
      {key:'organisme_signataire',label:"Organisme signataire",type:'text',required:true},
      {key:'representant',label:"Représentant légal",type:'text',required:true},
      {key:'pays',label:"Pays concerné(s)",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE LA COUVERTURE SANTÉ UNIVERSELLE ET DE LA SOLIDARITÉ EN AFRIQUE</h1><h2>SIGNATAIRE</h2><p>Organisme : {{organisme_signataire}}</p><p>Représentant : {{representant}}</p><p>Pays : {{pays}}</p><p>Date de signature : {{date_signature}}</p><h2>PRINCIPES FONDAMENTAUX</h2><p>1. Droit universel à la santé pour tous les citoyens</p><p>2. Solidarité intergénérationnelle et sociale</p><p>3. Équité dans l'accès aux soins de santé</p><p>4. Financement soutenable et pérenne de la santé</p><p>5. Gouvernance transparente et participative des systèmes de santé</p><h2>ENGAGEMENTS</h2><p>Le signataire s'engage à promouvoir activement ces principes et à contribuer à l'extension de la couverture santé universelle sur le continent africain.</p></div>`
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
  console.log(`Batch 110b OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
