import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ─── ASSURANCE VIE (avi_) ───────────────────────────────────────────────────
  {
    code: 'avi_contrat_individuel', name: "Contrat Assurance Vie Individuelle", category: 'assurance',
    price: 8000, priceMax: 24000, description: "Contrat d'assurance vie individuelle conforme au droit CIMA pour la constitution d'une épargne à long terme.", templateType: 'pdf', classe: 'B', active: true, popularity: 87,
    fieldsJson: F([
      {key:'nom_assure',label:"Nom complet de l'assuré",type:'text',required:true},
      {key:'date_naissance',label:"Date de naissance",type:'date',required:true},
      {key:'capital_souscrit',label:"Capital souscrit (FCFA)",type:'text',required:true},
      {key:'duree_contrat',label:"Durée du contrat (années)",type:'text',required:true},
      {key:'nom_beneficiaire',label:"Nom du bénéficiaire",type:'text',required:true},
      {key:'date_effet',label:"Date d'effet du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT D'ASSURANCE VIE INDIVIDUELLE</h1><p>Entre la compagnie d'assurance soussignée et l'assuré <strong>{{nom_assure}}</strong>, né(e) le {{date_naissance}}, ci-après dénommé l'Assuré.</p><h2>Article 1 – Objet du contrat</h2><p>Le présent contrat a pour objet de garantir le versement d'un capital ou d'une rente à l'assuré ou à ses bénéficiaires, en application des dispositions du Code CIMA.</p><h2>Article 2 – Capital garanti</h2><p>Le capital souscrit est fixé à <strong>{{capital_souscrit}} FCFA</strong> pour une durée de <strong>{{duree_contrat}} ans</strong>, à compter du {{date_effet}}.</p><h2>Article 3 – Bénéficiaire</h2><p>En cas de décès de l'assuré, le capital est versé à : <strong>{{nom_beneficiaire}}</strong>.</p><h2>Article 4 – Droit applicable</h2><p>Le présent contrat est régi par le Code des Assurances CIMA et la législation en vigueur en Côte d'Ivoire.</p></div>`
  },
  {
    code: 'avi_contrat_groupe', name: "Contrat Assurance Vie Groupe Entreprise", category: 'assurance',
    price: 12000, priceMax: 40000, description: "Contrat d'assurance vie collective souscrit par une entreprise au profit de ses salariés, conforme CIMA.", templateType: 'pdf', classe: 'A', active: true, popularity: 74,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale de l'entreprise",type:'text',required:true},
      {key:'nombre_adherents',label:"Nombre d'adhérents",type:'text',required:true},
      {key:'capital_par_tete',label:"Capital garanti par tête (FCFA)",type:'text',required:true},
      {key:'prime_annuelle',label:"Prime annuelle globale (FCFA)",type:'text',required:true},
      {key:'date_prise_effet',label:"Date de prise d'effet",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT D'ASSURANCE VIE GROUPE</h1><p>La société <strong>{{raison_sociale}}</strong>, souscripteur du présent contrat collectif, s'engage à couvrir l'ensemble de ses <strong>{{nombre_adherents}}</strong> salariés adhérents.</p><h2>Article 1 – Garanties</h2><p>Capital garanti par tête : <strong>{{capital_par_tete}} FCFA</strong>. Prime annuelle globale : <strong>{{prime_annuelle}} FCFA</strong>.</p><h2>Article 2 – Prise d'effet</h2><p>Le contrat prend effet le {{date_prise_effet}} et est renouvelable par tacite reconduction annuelle.</p><h2>Article 3 – Adhésion</h2><p>Tout salarié remplissant les conditions d'adhésion définies à l'annexe I bénéficie automatiquement des garanties du présent contrat.</p></div>`
  },
  {
    code: 'avi_avenant_beneficiaire', name: "Avenant Modification Bénéficiaire Assurance Vie", category: 'assurance',
    price: 3000, priceMax: 8000, description: "Avenant permettant à l'assuré de modifier la désignation du bénéficiaire de son contrat d'assurance vie.", templateType: 'pdf', classe: 'C', active: true, popularity: 61,
    fieldsJson: F([
      {key:'numero_contrat',label:"Numéro de contrat",type:'text',required:true},
      {key:'nom_assure',label:"Nom de l'assuré",type:'text',required:true},
      {key:'ancien_beneficiaire',label:"Ancien bénéficiaire",type:'text',required:true},
      {key:'nouveau_beneficiaire',label:"Nouveau bénéficiaire",type:'text',required:true},
      {key:'date_modification',label:"Date de modification",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>AVENANT DE MODIFICATION DE BÉNÉFICIAIRE</h1><p>Contrat n° <strong>{{numero_contrat}}</strong> – Assuré : <strong>{{nom_assure}}</strong></p><h2>Objet</h2><p>Par le présent avenant, l'assuré désigne en remplacement de <strong>{{ancien_beneficiaire}}</strong>, le nouveau bénéficiaire suivant : <strong>{{nouveau_beneficiaire}}</strong>, avec effet au {{date_modification}}.</p><h2>Conditions</h2><p>Cette modification annule et remplace toute désignation antérieure. Elle est irrévocable sauf accord écrit du bénéficiaire désigné.</p></div>`
  },
  {
    code: 'avi_rachat_partiel', name: "Demande de Rachat Partiel Assurance Vie", category: 'assurance',
    price: 4000, priceMax: 10000, description: "Formulaire de demande de rachat partiel sur un contrat d'assurance vie, avec calcul de la valeur de rachat.", templateType: 'pdf', classe: 'C', active: true, popularity: 58,
    fieldsJson: F([
      {key:'numero_contrat',label:"Numéro de contrat",type:'text',required:true},
      {key:'nom_assure',label:"Nom de l'assuré",type:'text',required:true},
      {key:'montant_rachat',label:"Montant du rachat demandé (FCFA)",type:'text',required:true},
      {key:'motif',label:"Motif du rachat",type:'textarea',required:false},
      {key:'date_demande',label:"Date de la demande",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>DEMANDE DE RACHAT PARTIEL</h1><p>Je soussigné(e) <strong>{{nom_assure}}</strong>, titulaire du contrat n° <strong>{{numero_contrat}}</strong>, sollicite un rachat partiel d'un montant de <strong>{{montant_rachat}} FCFA</strong> en date du {{date_demande}}.</p><h2>Motif</h2><p>{{motif}}</p><h2>Déclaration</h2><p>Je reconnais avoir été informé(e) des conséquences fiscales et contractuelles de cette opération conformément au Code CIMA.</p></div>`
  },
  {
    code: 'avi_rachat_total', name: "Demande de Rachat Total Assurance Vie", category: 'assurance',
    price: 4000, priceMax: 10000, description: "Demande de rachat total (résiliation) d'un contrat d'assurance vie avec versement de la valeur de rachat intégrale.", templateType: 'pdf', classe: 'C', active: true, popularity: 52,
    fieldsJson: F([
      {key:'numero_contrat',label:"Numéro de contrat",type:'text',required:true},
      {key:'nom_assure',label:"Nom de l'assuré",type:'text',required:true},
      {key:'valeur_rachat',label:"Valeur de rachat estimée (FCFA)",type:'text',required:true},
      {key:'rib_beneficiaire',label:"RIB / Coordonnées bancaires",type:'text',required:true},
      {key:'date_demande',label:"Date de la demande",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>DEMANDE DE RACHAT TOTAL</h1><p><strong>{{nom_assure}}</strong> – Contrat n° <strong>{{numero_contrat}}</strong></p><h2>Demande</h2><p>Je demande le rachat total de mon contrat d'assurance vie. La valeur de rachat estimée s'élève à <strong>{{valeur_rachat}} FCFA</strong>. Les fonds seront versés sur le compte : <strong>{{rib_beneficiaire}}</strong>.</p><h2>Date</h2><p>Fait le {{date_demande}}. Je reconnais que cette demande met fin définitivement à mon contrat.</p></div>`
  },
  {
    code: 'avi_deces_temporaire', name: "Contrat Assurance Décès Temporaire", category: 'assurance',
    price: 6000, priceMax: 18000, description: "Contrat d'assurance décès à terme fixe garantissant le versement d'un capital aux bénéficiaires en cas de décès de l'assuré avant le terme.", templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'nom_assure',label:"Nom de l'assuré",type:'text',required:true},
      {key:'capital_garanti',label:"Capital garanti (FCFA)",type:'text',required:true},
      {key:'duree_garantie',label:"Durée de la garantie (années)",type:'text',required:true},
      {key:'prime_mensuelle',label:"Prime mensuelle (FCFA)",type:'text',required:true},
      {key:'nom_beneficiaire',label:"Bénéficiaire désigné",type:'text',required:true},
      {key:'date_souscription',label:"Date de souscription",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT D'ASSURANCE DÉCÈS TEMPORAIRE</h1><p>Assuré : <strong>{{nom_assure}}</strong> – Date de souscription : {{date_souscription}}</p><h2>Article 1 – Garantie</h2><p>En cas de décès de l'assuré survenant dans un délai de <strong>{{duree_garantie}} ans</strong> à compter de la date d'effet, la compagnie versera un capital de <strong>{{capital_garanti}} FCFA</strong> au bénéficiaire <strong>{{nom_beneficiaire}}</strong>.</p><h2>Article 2 – Prime</h2><p>La prime mensuelle est fixée à <strong>{{prime_mensuelle}} FCFA</strong>, payable à terme échu.</p><h2>Article 3 – Exclusions</h2><p>Sont exclus : le suicide dans l'année suivant la souscription, les faits de guerre, les actes intentionnels du bénéficiaire.</p></div>`
  },
  {
    code: 'avi_deces_vie_entiere', name: "Contrat Assurance Décès Vie Entière", category: 'assurance',
    price: 7000, priceMax: 20000, description: "Contrat d'assurance décès vie entière garantissant le versement d'un capital quelle que soit la date du décès de l'assuré.", templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'nom_assure',label:"Nom de l'assuré",type:'text',required:true},
      {key:'capital_garanti',label:"Capital garanti (FCFA)",type:'text',required:true},
      {key:'prime_annuelle',label:"Prime annuelle (FCFA)",type:'text',required:true},
      {key:'nom_beneficiaire',label:"Bénéficiaire",type:'text',required:true},
      {key:'date_effet',label:"Date d'effet",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT D'ASSURANCE DÉCÈS VIE ENTIÈRE</h1><p>Assuré : <strong>{{nom_assure}}</strong> – Date d'effet : {{date_effet}}</p><h2>Article 1 – Objet</h2><p>La compagnie s'engage à verser, au décès de l'assuré, quel qu'en soit le moment, un capital de <strong>{{capital_garanti}} FCFA</strong> au bénéficiaire <strong>{{nom_beneficiaire}}</strong>.</p><h2>Article 2 – Prime</h2><p>Prime annuelle : <strong>{{prime_annuelle}} FCFA</strong>. Le contrat reste en vigueur tant que les primes sont régulièrement acquittées.</p></div>`
  },
  {
    code: 'avi_invalidite_permanente', name: "Contrat Assurance Invalidité Permanente Totale", category: 'assurance',
    price: 6000, priceMax: 16000, description: "Contrat d'assurance garantissant le versement d'un capital ou d'une rente en cas d'invalidité permanente totale de l'assuré.", templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'nom_assure',label:"Nom de l'assuré",type:'text',required:true},
      {key:'capital_invalidite',label:"Capital invalidité (FCFA)",type:'text',required:true},
      {key:'taux_invalidite_seuil',label:"Taux d'invalidité seuil (%)",type:'text',required:true},
      {key:'prime_mensuelle',label:"Prime mensuelle (FCFA)",type:'text',required:true},
      {key:'date_effet',label:"Date d'effet",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT ASSURANCE INVALIDITÉ PERMANENTE TOTALE</h1><p>Assuré : <strong>{{nom_assure}}</strong> – Effet : {{date_effet}}</p><h2>Garantie</h2><p>En cas d'invalidité permanente totale (IPT) à un taux égal ou supérieur à <strong>{{taux_invalidite_seuil}}%</strong>, constatée médicalement, la compagnie verse un capital de <strong>{{capital_invalidite}} FCFA</strong>.</p><h2>Prime</h2><p>Prime mensuelle : <strong>{{prime_mensuelle}} FCFA</strong>.</p></div>`
  },
  {
    code: 'avi_maladies_graves', name: "Contrat Assurance Maladies Graves", category: 'assurance',
    price: 7000, priceMax: 18000, description: "Contrat d'assurance prévoyant le versement d'un capital forfaitaire au diagnostic de maladies graves définies au contrat.", templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'nom_assure',label:"Nom de l'assuré",type:'text',required:true},
      {key:'capital_maladie',label:"Capital versé au diagnostic (FCFA)",type:'text',required:true},
      {key:'liste_maladies',label:"Maladies couvertes",type:'textarea',required:true},
      {key:'prime_annuelle',label:"Prime annuelle (FCFA)",type:'text',required:true},
      {key:'date_effet',label:"Date d'effet",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT ASSURANCE MALADIES GRAVES</h1><p>Assuré : <strong>{{nom_assure}}</strong> – Effet : {{date_effet}}</p><h2>Garanties</h2><p>Au premier diagnostic confirmé de l'une des maladies suivantes : <strong>{{liste_maladies}}</strong>, la compagnie verse un capital de <strong>{{capital_maladie}} FCFA</strong>.</p><h2>Prime annuelle</h2><p><strong>{{prime_annuelle}} FCFA</strong></p></div>`
  },
  {
    code: 'avi_avenant_augmentation_capital', name: "Avenant Augmentation de Capital Garanti", category: 'assurance',
    price: 3500, priceMax: 9000, description: "Avenant modifiant le capital garanti d'un contrat d'assurance vie par augmentation de la mise en garantie.", templateType: 'pdf', classe: 'C', active: true, popularity: 49,
    fieldsJson: F([
      {key:'numero_contrat',label:"Numéro de contrat",type:'text',required:true},
      {key:'nom_assure',label:"Nom de l'assuré",type:'text',required:true},
      {key:'ancien_capital',label:"Ancien capital garanti (FCFA)",type:'text',required:true},
      {key:'nouveau_capital',label:"Nouveau capital garanti (FCFA)",type:'text',required:true},
      {key:'date_avenant',label:"Date de l'avenant",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>AVENANT D'AUGMENTATION DE CAPITAL GARANTI</h1><p>Contrat n° <strong>{{numero_contrat}}</strong> – Assuré : <strong>{{nom_assure}}</strong></p><h2>Modification</h2><p>À compter du {{date_avenant}}, le capital garanti passe de <strong>{{ancien_capital}} FCFA</strong> à <strong>{{nouveau_capital}} FCFA</strong>. La prime est recalculée en conséquence.</p></div>`
  },
  {
    code: 'avi_declaration_sinistre_deces', name: "Déclaration de Sinistre Décès", category: 'assurance',
    price: 3000, priceMax: 7000, description: "Formulaire de déclaration de sinistre décès à adresser à la compagnie d'assurance vie pour déclencher le versement du capital.", templateType: 'pdf', classe: 'C', active: true, popularity: 55,
    fieldsJson: F([
      {key:'numero_contrat',label:"Numéro de contrat",type:'text',required:true},
      {key:'nom_defunt',label:"Nom du défunt (assuré)",type:'text',required:true},
      {key:'date_deces',label:"Date du décès",type:'date',required:true},
      {key:'cause_deces',label:"Cause du décès",type:'textarea',required:false},
      {key:'nom_declarant',label:"Nom du déclarant (bénéficiaire)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>DÉCLARATION DE SINISTRE DÉCÈS</h1><p>Je soussigné(e) <strong>{{nom_declarant}}</strong>, bénéficiaire désigné au contrat n° <strong>{{numero_contrat}}</strong>, déclare le décès de <strong>{{nom_defunt}}</strong>, survenu le {{date_deces}}.</p><h2>Cause du décès</h2><p>{{cause_deces}}</p><h2>Pièces jointes</h2><p>Acte de décès, pièce d'identité du bénéficiaire, extrait de contrat, RIB.</p></div>`
  },
  {
    code: 'avi_demande_prestation_deces', name: "Demande de Prestation Décès", category: 'assurance',
    price: 3000, priceMax: 8000, description: "Formulaire de demande de versement de la prestation décès par le bénéficiaire d'un contrat d'assurance vie.", templateType: 'pdf', classe: 'C', active: true, popularity: 53,
    fieldsJson: F([
      {key:'numero_contrat',label:"Numéro de contrat",type:'text',required:true},
      {key:'nom_beneficiaire',label:"Nom du bénéficiaire",type:'text',required:true},
      {key:'lien_assure',label:"Lien avec l'assuré",type:'text',required:true},
      {key:'coordonnees_bancaires',label:"Coordonnées bancaires (IBAN/RIB)",type:'text',required:true},
      {key:'date_demande',label:"Date de la demande",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>DEMANDE DE PRESTATION DÉCÈS</h1><p>Bénéficiaire : <strong>{{nom_beneficiaire}}</strong> – Lien : <strong>{{lien_assure}}</strong></p><p>Contrat n° <strong>{{numero_contrat}}</strong> – Date de la demande : {{date_demande}}</p><h2>Versement</h2><p>Je sollicite le versement du capital décès sur le compte : <strong>{{coordonnees_bancaires}}</strong>.</p></div>`
  },
  {
    code: 'avi_rente_education', name: "Contrat Rente Éducation Enfants", category: 'assurance',
    price: 7000, priceMax: 20000, description: "Contrat d'assurance garantissant le versement d'une rente éducation aux enfants bénéficiaires en cas de décès du souscripteur.", templateType: 'pdf', classe: 'B', active: true, popularity: 71,
    fieldsJson: F([
      {key:'nom_souscripteur',label:"Nom du souscripteur",type:'text',required:true},
      {key:'noms_enfants',label:"Noms et âges des enfants bénéficiaires",type:'textarea',required:true},
      {key:'montant_rente',label:"Montant de la rente annuelle (FCFA)",type:'text',required:true},
      {key:'age_limite',label:"Âge limite de versement (ans)",type:'text',required:true},
      {key:'date_effet',label:"Date d'effet",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT RENTE ÉDUCATION ENFANTS</h1><p>Souscripteur : <strong>{{nom_souscripteur}}</strong> – Effet : {{date_effet}}</p><h2>Bénéficiaires</h2><p>{{noms_enfants}}</p><h2>Garantie</h2><p>En cas de décès du souscripteur, une rente annuelle de <strong>{{montant_rente}} FCFA</strong> est versée à chaque enfant jusqu'à l'âge de <strong>{{age_limite}} ans</strong> pour financer ses études.</p></div>`
  },
  {
    code: 'avi_epargne_retraite', name: "Contrat Épargne Retraite Individuelle (PER)", category: 'assurance',
    price: 9000, priceMax: 28000, description: "Plan d'épargne retraite individuel par capitalisation, conforme à la réglementation CIMA, permettant de se constituer un complément de retraite.", templateType: 'pdf', classe: 'A', active: true, popularity: 78,
    fieldsJson: F([
      {key:'nom_souscripteur',label:"Nom du souscripteur",type:'text',required:true},
      {key:'age_retraite_cible',label:"Âge de retraite ciblé",type:'text',required:true},
      {key:'versement_initial',label:"Versement initial (FCFA)",type:'text',required:true},
      {key:'versement_periodique',label:"Versement périodique (FCFA)",type:'text',required:true},
      {key:'date_souscription',label:"Date de souscription",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT ÉPARGNE RETRAITE INDIVIDUELLE</h1><p>Souscripteur : <strong>{{nom_souscripteur}}</strong> – Date : {{date_souscription}}</p><h2>Objectif</h2><p>Constitution d'un capital retraite disponible à l'âge de <strong>{{age_retraite_cible}} ans</strong>.</p><h2>Versements</h2><p>Versement initial : <strong>{{versement_initial}} FCFA</strong>. Versements périodiques : <strong>{{versement_periodique}} FCFA</strong>.</p><h2>Sortie</h2><p>À l'échéance, le capital constitué peut être converti en rente viagère ou perçu en capital, selon le choix du souscripteur.</p></div>`
  },
  {
    code: 'avi_nantissement', name: "Accord de Nantissement Contrat Assurance Vie", category: 'assurance',
    price: 6000, priceMax: 15000, description: "Acte de nantissement d'un contrat d'assurance vie au profit d'un créancier (banque ou tiers), conforme au Code CIMA et à l'Acte uniforme OHADA sur les sûretés.", templateType: 'pdf', classe: 'B', active: true, popularity: 57,
    fieldsJson: F([
      {key:'numero_contrat',label:"Numéro de contrat nanti",type:'text',required:true},
      {key:'nom_assure',label:"Nom de l'assuré/souscripteur",type:'text',required:true},
      {key:'nom_creancier',label:"Nom du créancier bénéficiaire",type:'text',required:true},
      {key:'montant_garanti',label:"Montant de la créance garantie (FCFA)",type:'text',required:true},
      {key:'date_nantissement',label:"Date du nantissement",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE NANTISSEMENT DE CONTRAT D'ASSURANCE VIE</h1><p>Entre <strong>{{nom_assure}}</strong> (débiteur nantisseur) et <strong>{{nom_creancier}}</strong> (créancier bénéficiaire).</p><h2>Objet</h2><p>Le contrat d'assurance vie n° <strong>{{numero_contrat}}</strong> est nanti en garantie d'une créance de <strong>{{montant_garanti}} FCFA</strong> à compter du {{date_nantissement}}, conformément à l'Acte uniforme OHADA portant organisation des sûretés.</p></div>`
  },
  {
    code: 'avi_homme_cle', name: "Contrat Assurance Homme Clé (Key Man)", category: 'assurance',
    price: 10000, priceMax: 30000, description: "Contrat d'assurance souscrit par une entreprise sur la tête d'un dirigeant ou collaborateur clé, garantissant la continuité d'exploitation.", templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale de l'entreprise",type:'text',required:true},
      {key:'nom_homme_cle',label:"Nom de l'homme clé assuré",type:'text',required:true},
      {key:'fonction',label:"Fonction / rôle dans l'entreprise",type:'text',required:true},
      {key:'capital_garanti',label:"Capital garanti (FCFA)",type:'text',required:true},
      {key:'date_effet',label:"Date d'effet",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT ASSURANCE HOMME CLÉ</h1><p>Souscripteur : <strong>{{raison_sociale}}</strong> – Personne assurée : <strong>{{nom_homme_cle}}</strong>, <strong>{{fonction}}</strong>.</p><h2>Garantie</h2><p>En cas de décès ou d'invalidité totale et permanente de l'assuré, la compagnie verse à l'entreprise un capital de <strong>{{capital_garanti}} FCFA</strong>, destiné à compenser la perte d'exploitation et financer le remplacement. Effet : {{date_effet}}.</p></div>`
  },
  {
    code: 'avi_rapport_actuariel', name: "Rapport Actuariel Provisions Mathématiques", category: 'assurance',
    price: 15000, priceMax: 50000, description: "Rapport actuariel de calcul des provisions mathématiques d'un portefeuille d'assurance vie, conforme aux exigences CIMA.", templateType: 'pdf', classe: 'A', active: true, popularity: 45,
    fieldsJson: F([
      {key:'nom_compagnie',label:"Nom de la compagnie d'assurance",type:'text',required:true},
      {key:'periode_reporting',label:"Période de reporting",type:'text',required:true},
      {key:'effectif_portefeuille',label:"Effectif du portefeuille (contrats)",type:'text',required:true},
      {key:'provision_totale',label:"Provision mathématique totale (FCFA)",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT ACTUARIEL – PROVISIONS MATHÉMATIQUES</h1><p>Compagnie : <strong>{{nom_compagnie}}</strong> – Période : <strong>{{periode_reporting}}</strong> – Date : {{date_rapport}}</p><h2>1. Portefeuille</h2><p>Effectif analysé : <strong>{{effectif_portefeuille}}</strong> contrats.</p><h2>2. Provision mathématique</h2><p>La provision mathématique globale calculée selon la méthode prospective est de <strong>{{provision_totale}} FCFA</strong>.</p><h2>3. Conformité CIMA</h2><p>Le calcul respecte les tables de mortalité et les taux techniques définis par le Code CIMA en vigueur.</p></div>`
  },
  {
    code: 'avi_plan_retraite_capitalisation', name: "Plan de Financement Retraite par Capitalisation", category: 'assurance',
    price: 12000, priceMax: 36000, description: "Plan de financement d'un régime de retraite par capitalisation pour un groupe d'entreprises ou une association professionnelle.", templateType: 'pdf', classe: 'A', active: true, popularity: 62,
    fieldsJson: F([
      {key:'organisme_promoteur',label:"Organisme promoteur",type:'text',required:true},
      {key:'nombre_participants',label:"Nombre de participants",type:'text',required:true},
      {key:'cotisation_mensuelle',label:"Cotisation mensuelle par participant (FCFA)",type:'text',required:true},
      {key:'horizon_retraite',label:"Horizon de retraite (années)",type:'text',required:true},
      {key:'date_lancement',label:"Date de lancement",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE FINANCEMENT RETRAITE PAR CAPITALISATION</h1><p>Promoteur : <strong>{{organisme_promoteur}}</strong> – Lancement : {{date_lancement}}</p><h2>Paramètres</h2><p>Participants : <strong>{{nombre_participants}}</strong> – Cotisation mensuelle : <strong>{{cotisation_mensuelle}} FCFA</strong>/participant – Horizon : <strong>{{horizon_retraite}} ans</strong>.</p><h2>Gestion</h2><p>Les actifs sont gérés en capitalisation individuelle par comptes séparés, investis selon une allocation prudentielle conforme aux dispositions CIMA.</p></div>`
  },
  {
    code: 'avi_assurance_collective_dirigeants', name: "Convention Assurance Vie Collective Dirigeants", category: 'assurance',
    price: 14000, priceMax: 42000, description: "Convention d'assurance vie collective spécifiquement dédiée aux dirigeants d'entreprise, incluant garanties décès, invalidité et retraite supplémentaire.", templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'noms_dirigeants',label:"Noms des dirigeants assurés",type:'textarea',required:true},
      {key:'garanties',label:"Garanties souscrites",type:'textarea',required:true},
      {key:'prime_globale',label:"Prime globale annuelle (FCFA)",type:'text',required:true},
      {key:'date_effet',label:"Date d'effet",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONVENTION ASSURANCE VIE COLLECTIVE DIRIGEANTS</h1><p>Entreprise : <strong>{{raison_sociale}}</strong> – Effet : {{date_effet}}</p><h2>Assurés</h2><p>{{noms_dirigeants}}</p><h2>Garanties</h2><p>{{garanties}}</p><h2>Prime</h2><p>Prime globale annuelle : <strong>{{prime_globale}} FCFA</strong></p></div>`
  },
  {
    code: 'avi_attestation_valeur_rachat', name: "Attestation de Valeur de Rachat", category: 'assurance',
    price: 2500, priceMax: 6000, description: "Attestation officielle délivrée par la compagnie d'assurance indiquant la valeur de rachat d'un contrat d'assurance vie à une date donnée.", templateType: 'pdf', classe: 'C', active: true, popularity: 59,
    fieldsJson: F([
      {key:'numero_contrat',label:"Numéro de contrat",type:'text',required:true},
      {key:'nom_souscripteur',label:"Nom du souscripteur",type:'text',required:true},
      {key:'valeur_rachat',label:"Valeur de rachat à la date (FCFA)",type:'text',required:true},
      {key:'date_valeur',label:"Date de valeur",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ATTESTATION DE VALEUR DE RACHAT</h1><p>La compagnie soussignée atteste que le contrat n° <strong>{{numero_contrat}}</strong> souscrit par <strong>{{nom_souscripteur}}</strong> présente, à la date du {{date_valeur}}, une valeur de rachat de <strong>{{valeur_rachat}} FCFA</strong>. Cette attestation est délivrée à la demande du souscripteur et ne vaut pas engagement de rachat.</p></div>`
  },
  {
    code: 'avi_delegation_benefice', name: "Accord de Délégation de Bénéfice Assurance Vie", category: 'assurance',
    price: 5000, priceMax: 14000, description: "Acte de délégation de bénéfice d'un contrat d'assurance vie au profit d'un établissement de crédit dans le cadre d'un financement immobilier ou professionnel.", templateType: 'pdf', classe: 'B', active: true, popularity: 64,
    fieldsJson: F([
      {key:'numero_contrat',label:"Numéro du contrat d'assurance",type:'text',required:true},
      {key:'nom_assure',label:"Nom de l'assuré",type:'text',required:true},
      {key:'nom_banque',label:"Nom de la banque délégataire",type:'text',required:true},
      {key:'montant_credit',label:"Montant du crédit garanti (FCFA)",type:'text',required:true},
      {key:'date_delegation',label:"Date de la délégation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE DÉLÉGATION DE BÉNÉFICE</h1><p>L'assuré <strong>{{nom_assure}}</strong>, titulaire du contrat n° <strong>{{numero_contrat}}</strong>, délègue le bénéfice de son contrat d'assurance vie à <strong>{{nom_banque}}</strong> à hauteur de <strong>{{montant_credit}} FCFA</strong>, en garantie de son crédit. Date d'effet : {{date_delegation}}.</p></div>`
  },
  {
    code: 'avi_unites_compte', name: "Contrat Assurance Vie en Unités de Compte", category: 'assurance',
    price: 10000, priceMax: 32000, description: "Contrat d'assurance vie multisupport investi en unités de compte (UC), offrant un potentiel de rendement lié aux marchés financiers.", templateType: 'pdf', classe: 'A', active: true, popularity: 67,
    fieldsJson: F([
      {key:'nom_souscripteur',label:"Nom du souscripteur",type:'text',required:true},
      {key:'versement_initial',label:"Versement initial (FCFA)",type:'text',required:true},
      {key:'allocation_uc',label:"Allocation en unités de compte (%)",type:'text',required:true},
      {key:'supports_choisis',label:"Supports d'investissement choisis",type:'textarea',required:true},
      {key:'date_souscription',label:"Date de souscription",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT ASSURANCE VIE EN UNITÉS DE COMPTE</h1><p>Souscripteur : <strong>{{nom_souscripteur}}</strong> – Date : {{date_souscription}}</p><h2>Investissement</h2><p>Versement initial : <strong>{{versement_initial}} FCFA</strong>, dont <strong>{{allocation_uc}}%</strong> investis sur les unités de compte suivantes : {{supports_choisis}}.</p><h2>Avertissement</h2><p>Les unités de compte présentent un risque de perte en capital. La valeur des UC est sujette aux fluctuations des marchés financiers.</p></div>`
  },
  {
    code: 'avi_rapport_performance_fonds', name: "Rapport de Performance Fonds Assurance Vie", category: 'assurance',
    price: 12000, priceMax: 35000, description: "Rapport annuel de performance des fonds d'investissement sous-jacents à un contrat d'assurance vie, à destination des souscripteurs.", templateType: 'pdf', classe: 'A', active: true, popularity: 48,
    fieldsJson: F([
      {key:'nom_fonds',label:"Nom du fonds",type:'text',required:true},
      {key:'performance_annuelle',label:"Performance annuelle (%)",type:'text',required:true},
      {key:'actif_net',label:"Actif net total (FCFA)",type:'text',required:true},
      {key:'periode',label:"Période du rapport",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE FONDS ASSURANCE VIE</h1><p>Fonds : <strong>{{nom_fonds}}</strong> – Période : <strong>{{periode}}</strong> – Date : {{date_rapport}}</p><h2>Performance</h2><p>Rendement annuel : <strong>{{performance_annuelle}}%</strong> – Actif net : <strong>{{actif_net}} FCFA</strong>.</p><h2>Commentaires</h2><p>La gestion du fonds respecte la politique d'investissement définie et les contraintes réglementaires CIMA relatives aux placements des entreprises d'assurance.</p></div>`
  },
  {
    code: 'avi_prevoyance_mixte', name: "Plan de Prévoyance Mixte Décès-Invalidité", category: 'assurance',
    price: 8000, priceMax: 22000, description: "Plan de prévoyance combinant garanties décès et invalidité permanente, pour une couverture globale des risques personnels.", templateType: 'pdf', classe: 'B', active: true, popularity: 73,
    fieldsJson: F([
      {key:'nom_assure',label:"Nom de l'assuré",type:'text',required:true},
      {key:'capital_deces',label:"Capital décès (FCFA)",type:'text',required:true},
      {key:'capital_invalidite',label:"Capital invalidité (FCFA)",type:'text',required:true},
      {key:'prime_mensuelle',label:"Prime mensuelle totale (FCFA)",type:'text',required:true},
      {key:'date_effet',label:"Date d'effet",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE PRÉVOYANCE MIXTE DÉCÈS-INVALIDITÉ</h1><p>Assuré : <strong>{{nom_assure}}</strong> – Effet : {{date_effet}}</p><h2>Garanties</h2><ul><li>Décès : capital de <strong>{{capital_deces}} FCFA</strong></li><li>Invalidité Permanente Totale : capital de <strong>{{capital_invalidite}} FCFA</strong></li></ul><h2>Prime mensuelle</h2><p><strong>{{prime_mensuelle}} FCFA</strong></p></div>`
  },
  {
    code: 'avi_charte_conseil', name: "Charte de Conseil en Assurance Vie", category: 'assurance',
    price: 5000, priceMax: 12000, description: "Charte définissant les obligations de conseil et de devoir d'information de l'intermédiaire en assurance vie envers ses clients, conforme au Code CIMA.", templateType: 'pdf', classe: 'B', active: true, popularity: 44,
    fieldsJson: F([
      {key:'nom_intermediaire',label:"Nom de l'intermédiaire",type:'text',required:true},
      {key:'numero_agrement',label:"Numéro d'agrément CIMA",type:'text',required:true},
      {key:'nom_client',label:"Nom du client",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE CONSEIL EN ASSURANCE VIE</h1><p>Intermédiaire : <strong>{{nom_intermediaire}}</strong> – Agrément CIMA n° <strong>{{numero_agrement}}</strong></p><p>Client : <strong>{{nom_client}}</strong> – Date : {{date_signature}}</p><h2>Engagements</h2><p>L'intermédiaire s'engage à recueillir les informations pertinentes sur la situation financière, les objectifs et la tolérance au risque du client, à lui proposer des produits adaptés, et à lui remettre une fiche d'information standardisée avant toute souscription.</p></div>`
  },

  // ─── ASSURANCE DOMMAGES SPÉCIALISÉE (adom_) ─────────────────────────────────
  {
    code: 'adom_mrp', name: "Contrat Assurance Multirisque Professionnelle (MRP)", category: 'assurance',
    price: 10000, priceMax: 30000, description: "Contrat d'assurance multirisque professionnelle couvrant les locaux, le matériel, les stocks et la responsabilité civile de l'entreprise.", templateType: 'pdf', classe: 'A', active: true, popularity: 85,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'activite',label:"Activité professionnelle",type:'text',required:true},
      {key:'adresse_risque',label:"Adresse du risque assuré",type:'text',required:true},
      {key:'valeur_biens',label:"Valeur totale des biens (FCFA)",type:'text',required:true},
      {key:'prime_annuelle',label:"Prime annuelle (FCFA)",type:'text',required:true},
      {key:'date_effet',label:"Date d'effet",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT ASSURANCE MULTIRISQUE PROFESSIONNELLE</h1><p>Assuré : <strong>{{raison_sociale}}</strong> – Activité : <strong>{{activite}}</strong> – Adresse du risque : <strong>{{adresse_risque}}</strong></p><h2>Garanties</h2><p>Incendie et périls annexes, dégâts des eaux, vol, bris de glaces, responsabilité civile exploitation. Valeur des biens assurés : <strong>{{valeur_biens}} FCFA</strong>.</p><h2>Prime annuelle</h2><p><strong>{{prime_annuelle}} FCFA</strong> – Effet : {{date_effet}}</p></div>`
  },
  {
    code: 'adom_rcp', name: "Contrat Assurance Responsabilité Civile Professionnelle (RCP)", category: 'assurance',
    price: 8000, priceMax: 24000, description: "Contrat de responsabilité civile professionnelle couvrant les dommages causés aux tiers dans le cadre de l'exercice de l'activité professionnelle.", templateType: 'pdf', classe: 'B', active: true, popularity: 82,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'profession',label:"Profession / activité",type:'text',required:true},
      {key:'plafond_garantie',label:"Plafond de garantie (FCFA)",type:'text',required:true},
      {key:'prime_annuelle',label:"Prime annuelle (FCFA)",type:'text',required:true},
      {key:'date_effet',label:"Date d'effet",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT RESPONSABILITÉ CIVILE PROFESSIONNELLE</h1><p>Assuré : <strong>{{raison_sociale}}</strong> – Profession : <strong>{{profession}}</strong></p><h2>Garantie</h2><p>Plafond : <strong>{{plafond_garantie}} FCFA</strong> par sinistre et par année d'assurance. Prime : <strong>{{prime_annuelle}} FCFA</strong>. Effet : {{date_effet}}.</p><h2>Base de déclenchement</h2><p>Réclamation. Franchise contractuelle définie en annexe.</p></div>`
  },
  {
    code: 'adom_rce', name: "Contrat Assurance Responsabilité Civile Exploitation", category: 'assurance',
    price: 7000, priceMax: 20000, description: "Garantie de responsabilité civile couvrant les dommages corporels, matériels et immatériels causés aux tiers lors de l'exploitation courante.", templateType: 'pdf', classe: 'B', active: true, popularity: 75,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'nature_exploitation',label:"Nature de l'exploitation",type:'text',required:true},
      {key:'plafond_annuel',label:"Plafond annuel (FCFA)",type:'text',required:true},
      {key:'prime_annuelle',label:"Prime annuelle (FCFA)",type:'text',required:true},
      {key:'date_effet',label:"Date d'effet",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT RC EXPLOITATION</h1><p>Assuré : <strong>{{raison_sociale}}</strong> – Exploitation : <strong>{{nature_exploitation}}</strong></p><h2>Garantie</h2><p>Plafond annuel : <strong>{{plafond_annuel}} FCFA</strong> – Prime : <strong>{{prime_annuelle}} FCFA</strong> – Effet : {{date_effet}}.</p></div>`
  },
  {
    code: 'adom_pertes_exploitation', name: "Contrat Assurance Pertes d'Exploitation", category: 'assurance',
    price: 9000, priceMax: 28000, description: "Contrat garantissant la compensation des pertes de marge brute consécutives à un sinistre matériel ayant entraîné une interruption d'activité.", templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'chiffre_affaires',label:"Chiffre d'affaires annuel (FCFA)",type:'text',required:true},
      {key:'periode_indemnisation',label:"Période d'indemnisation maximale (mois)",type:'text',required:true},
      {key:'prime_annuelle',label:"Prime annuelle (FCFA)",type:'text',required:true},
      {key:'date_effet',label:"Date d'effet",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT ASSURANCE PERTES D'EXPLOITATION</h1><p>Assuré : <strong>{{raison_sociale}}</strong> – CA annuel : <strong>{{chiffre_affaires}} FCFA</strong></p><h2>Garantie</h2><p>Indemnisation des pertes de marge brute sur une période maximale de <strong>{{periode_indemnisation}} mois</strong> consécutifs à un sinistre. Prime : <strong>{{prime_annuelle}} FCFA</strong>. Effet : {{date_effet}}.</p></div>`
  },
  {
    code: 'adom_trc', name: "Contrat Assurance Tous Risques Chantier (TRC)", category: 'assurance',
    price: 12000, priceMax: 40000, description: "Contrat TRC couvrant l'ensemble des dommages matériels pouvant survenir sur un chantier de construction pendant la durée des travaux.", templateType: 'pdf', classe: 'A', active: true, popularity: 79,
    fieldsJson: F([
      {key:'maitre_ouvrage',label:"Maître d'ouvrage",type:'text',required:true},
      {key:'nature_travaux',label:"Nature des travaux",type:'text',required:true},
      {key:'valeur_travaux',label:"Valeur totale des travaux (FCFA)",type:'text',required:true},
      {key:'duree_chantier',label:"Durée du chantier (mois)",type:'text',required:true},
      {key:'date_ouverture',label:"Date d'ouverture du chantier",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT TOUS RISQUES CHANTIER (TRC)</h1><p>Maître d'ouvrage : <strong>{{maitre_ouvrage}}</strong> – Travaux : <strong>{{nature_travaux}}</strong></p><h2>Garanties</h2><p>Dommages aux ouvrages, matériaux, équipements de chantier. Valeur assurée : <strong>{{valeur_travaux}} FCFA</strong> – Durée : <strong>{{duree_chantier}} mois</strong> à compter du {{date_ouverture}}.</p></div>`
  },
  {
    code: 'adom_decennale', name: "Contrat Assurance Décennale Bâtiment", category: 'assurance',
    price: 11000, priceMax: 35000, description: "Contrat d'assurance décennale obligatoire pour les constructeurs, couvrant les dommages compromettant la solidité de l'ouvrage pendant dix ans.", templateType: 'pdf', classe: 'A', active: true, popularity: 83,
    fieldsJson: F([
      {key:'nom_constructeur',label:"Nom du constructeur / entrepreneur",type:'text',required:true},
      {key:'nature_ouvrage',label:"Nature de l'ouvrage",type:'text',required:true},
      {key:'adresse_ouvrage',label:"Adresse de l'ouvrage",type:'text',required:true},
      {key:'valeur_ouvrage',label:"Valeur de l'ouvrage (FCFA)",type:'text',required:true},
      {key:'date_reception',label:"Date de réception des travaux",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT ASSURANCE DÉCENNALE</h1><p>Constructeur : <strong>{{nom_constructeur}}</strong> – Ouvrage : <strong>{{nature_ouvrage}}</strong> – Adresse : <strong>{{adresse_ouvrage}}</strong></p><h2>Garantie</h2><p>Valeur assurée : <strong>{{valeur_ouvrage}} FCFA</strong>. La garantie couvre pendant dix ans à compter de la réception du {{date_reception}} les dommages affectant la solidité de l'ouvrage ou le rendant impropre à sa destination.</p></div>`
  },
  {
    code: 'adom_flotte_auto', name: "Contrat Assurance Flotte Automobile", category: 'assurance',
    price: 9000, priceMax: 26000, description: "Contrat d'assurance flotte pour la couverture de plusieurs véhicules appartenant à une entreprise ou à un parc automobile.", templateType: 'pdf', classe: 'A', active: true, popularity: 81,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale / propriétaire flotte",type:'text',required:true},
      {key:'nombre_vehicules',label:"Nombre de véhicules",type:'text',required:true},
      {key:'garanties_choisies',label:"Garanties choisies",type:'textarea',required:true},
      {key:'prime_annuelle',label:"Prime annuelle globale (FCFA)",type:'text',required:true},
      {key:'date_effet',label:"Date d'effet",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT ASSURANCE FLOTTE AUTOMOBILE</h1><p>Assuré : <strong>{{raison_sociale}}</strong> – Flotte : <strong>{{nombre_vehicules}}</strong> véhicules – Effet : {{date_effet}}</p><h2>Garanties</h2><p>{{garanties_choisies}}</p><h2>Prime globale annuelle</h2><p><strong>{{prime_annuelle}} FCFA</strong> – Régularisation annuelle sur déclaration d'effectif.</p></div>`
  },
  {
    code: 'adom_marchandises_transportees', name: "Contrat Assurance Marchandises Transportées", category: 'assurance',
    price: 7000, priceMax: 20000, description: "Contrat d'assurance transport couvrant les marchandises contre les risques de perte, avarie ou vol durant leur acheminement.", templateType: 'pdf', classe: 'B', active: true, popularity: 76,
    fieldsJson: F([
      {key:'nom_assure',label:"Nom de l'expéditeur/assuré",type:'text',required:true},
      {key:'nature_marchandises',label:"Nature des marchandises",type:'text',required:true},
      {key:'valeur_marchandises',label:"Valeur des marchandises (FCFA)",type:'text',required:true},
      {key:'itineraire',label:"Itinéraire (origine – destination)",type:'text',required:true},
      {key:'date_expedition',label:"Date d'expédition",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT ASSURANCE MARCHANDISES TRANSPORTÉES</h1><p>Assuré : <strong>{{nom_assure}}</strong> – Marchandises : <strong>{{nature_marchandises}}</strong></p><h2>Détails</h2><p>Valeur : <strong>{{valeur_marchandises}} FCFA</strong> – Itinéraire : <strong>{{itineraire}}</strong> – Expédition : {{date_expedition}}.</p><h2>Garanties</h2><p>Perte totale, avaries particulières, vol avec effraction, frais de sauvetage.</p></div>`
  },
  {
    code: 'adom_credit_commercial', name: "Contrat Assurance Crédit Commercial", category: 'assurance',
    price: 10000, priceMax: 32000, description: "Contrat d'assurance-crédit protégeant une entreprise contre le risque d'insolvabilité de ses clients débiteurs.", templateType: 'pdf', classe: 'A', active: true, popularity: 66,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale de l'assuré",type:'text',required:true},
      {key:'encours_garanti',label:"Encours clients garanti (FCFA)",type:'text',required:true},
      {key:'taux_couverture',label:"Taux de couverture (%)",type:'text',required:true},
      {key:'prime_annuelle',label:"Prime annuelle (FCFA)",type:'text',required:true},
      {key:'date_effet',label:"Date d'effet",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT ASSURANCE CRÉDIT COMMERCIAL</h1><p>Assuré : <strong>{{raison_sociale}}</strong> – Effet : {{date_effet}}</p><h2>Garantie</h2><p>Encours garanti : <strong>{{encours_garanti}} FCFA</strong> – Taux de couverture : <strong>{{taux_couverture}}%</strong> des créances impayées suite à insolvabilité du débiteur.</p><h2>Prime</h2><p><strong>{{prime_annuelle}} FCFA</strong></p></div>`
  },
  {
    code: 'adom_caution_marche_public', name: "Contrat Assurance Caution Marché Public", category: 'assurance',
    price: 8000, priceMax: 22000, description: "Caution d'assurance se substituant à la garantie bancaire pour les marchés publics OHADA : soumission, bonne exécution et retenue de garantie.", templateType: 'pdf', classe: 'B', active: true, popularity: 74,
    fieldsJson: F([
      {key:'nom_entreprise',label:"Nom de l'entreprise cautionnée",type:'text',required:true},
      {key:'reference_marche',label:"Référence du marché public",type:'text',required:true},
      {key:'type_caution',label:"Type de caution",type:'text',required:true},
      {key:'montant_caution',label:"Montant de la caution (FCFA)",type:'text',required:true},
      {key:'date_emission',label:"Date d'émission",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CAUTION DE MARCHÉ PUBLIC</h1><p>La compagnie soussignée se porte caution de <strong>{{nom_entreprise}}</strong> au titre du marché public n° <strong>{{reference_marche}}</strong>.</p><h2>Nature et montant</h2><p>Type : <strong>{{type_caution}}</strong> – Montant : <strong>{{montant_caution}} FCFA</strong> – Émis le {{date_emission}}.</p><h2>Engagement</h2><p>En cas de défaillance de l'entreprise cautionnée, la compagnie s'engage à payer le montant garanti à première demande du maître d'ouvrage.</p></div>`
  },
  {
    code: 'adom_cyber_risques', name: "Contrat Assurance Cyber-Risques", category: 'assurance',
    price: 12000, priceMax: 38000, description: "Contrat d'assurance couvrant les entreprises contre les cyberattaques, violations de données, rançongiciels et les pertes financières en résultant.", templateType: 'pdf', classe: 'A', active: true, popularity: 69,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'chiffre_affaires',label:"Chiffre d'affaires annuel (FCFA)",type:'text',required:true},
      {key:'plafond_garantie',label:"Plafond de garantie cyber (FCFA)",type:'text',required:true},
      {key:'prime_annuelle',label:"Prime annuelle (FCFA)",type:'text',required:true},
      {key:'date_effet',label:"Date d'effet",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT ASSURANCE CYBER-RISQUES</h1><p>Assuré : <strong>{{raison_sociale}}</strong> – CA : <strong>{{chiffre_affaires}} FCFA</strong> – Effet : {{date_effet}}</p><h2>Garanties</h2><p>Plafond : <strong>{{plafond_garantie}} FCFA</strong> – Couverture : intrusion informatique, ransomware, violation de données personnelles, frais de notification, pertes d'exploitation cyber, cyber-extorsion.</p><h2>Prime</h2><p><strong>{{prime_annuelle}} FCFA</strong></p></div>`
  },
  {
    code: 'adom_agricole_recoltes', name: "Contrat Assurance Agricole Récoltes", category: 'assurance',
    price: 6000, priceMax: 18000, description: "Contrat d'assurance agricole couvrant les récoltes contre les risques climatiques (sécheresse, inondation, grêle) et phytosanitaires.", templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'nom_exploitant',label:"Nom de l'exploitant agricole",type:'text',required:true},
      {key:'type_culture',label:"Type de culture assurée",type:'text',required:true},
      {key:'superficie_ha',label:"Superficie (hectares)",type:'text',required:true},
      {key:'rendement_garanti',label:"Rendement garanti (tonnes/ha)",type:'text',required:true},
      {key:'date_effet',label:"Date d'effet de la campagne",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT ASSURANCE AGRICOLE RÉCOLTES</h1><p>Exploitant : <strong>{{nom_exploitant}}</strong> – Culture : <strong>{{type_culture}}</strong> – Superficie : <strong>{{superficie_ha}} ha</strong></p><h2>Garanties</h2><p>Rendement garanti : <strong>{{rendement_garanti}} t/ha</strong>. Risques couverts : sécheresse, inondation, excès de pluie, grêle, incendie de récolte. Campagne débutant le {{date_effet}}.</p></div>`
  },
  {
    code: 'adom_betail', name: "Contrat Assurance Bétail", category: 'assurance',
    price: 5000, priceMax: 14000, description: "Contrat d'assurance couvrant les animaux d'élevage contre les risques de mortalité accidentelle, de maladie et de vol.", templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'nom_eleveur',label:"Nom de l'éleveur",type:'text',required:true},
      {key:'espece_animale',label:"Espèce animale",type:'text',required:true},
      {key:'nombre_tetes',label:"Nombre de têtes",type:'text',required:true},
      {key:'valeur_totale',label:"Valeur totale du cheptel (FCFA)",type:'text',required:true},
      {key:'date_effet',label:"Date d'effet",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT ASSURANCE BÉTAIL</h1><p>Éleveur : <strong>{{nom_eleveur}}</strong> – Espèce : <strong>{{espece_animale}}</strong> – Cheptel : <strong>{{nombre_tetes}}</strong> têtes</p><h2>Garanties</h2><p>Valeur assurée : <strong>{{valeur_totale}} FCFA</strong>. Risques couverts : mortalité accidentelle, maladie déclarée, vol avec effraction. Effet : {{date_effet}}.</p></div>`
  },
  {
    code: 'adom_materiel_equipements', name: "Contrat Assurance Matériel et Équipements", category: 'assurance',
    price: 7000, priceMax: 20000, description: "Contrat d'assurance dommages couvrant les équipements industriels, machines et matériels contre la casse, le vol et les avaries.", templateType: 'pdf', classe: 'B', active: true, popularity: 77,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'description_materiel',label:"Description du matériel assuré",type:'textarea',required:true},
      {key:'valeur_remplacement',label:"Valeur de remplacement totale (FCFA)",type:'text',required:true},
      {key:'prime_annuelle',label:"Prime annuelle (FCFA)",type:'text',required:true},
      {key:'date_effet',label:"Date d'effet",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT ASSURANCE MATÉRIEL ET ÉQUIPEMENTS</h1><p>Assuré : <strong>{{raison_sociale}}</strong> – Effet : {{date_effet}}</p><h2>Biens assurés</h2><p>{{description_materiel}}</p><h2>Valeur et prime</h2><p>Valeur de remplacement : <strong>{{valeur_remplacement}} FCFA</strong> – Prime : <strong>{{prime_annuelle}} FCFA</strong>.</p></div>`
  },
  {
    code: 'adom_sinistre_incendie', name: "Déclaration Sinistre Incendie Professionnel", category: 'assurance',
    price: 4000, priceMax: 10000, description: "Formulaire de déclaration de sinistre incendie pour les locaux professionnels, à transmettre à la compagnie d'assurance dans les délais réglementaires.", templateType: 'pdf', classe: 'C', active: true, popularity: 63,
    fieldsJson: F([
      {key:'numero_contrat',label:"Numéro de contrat",type:'text',required:true},
      {key:'raison_sociale',label:"Raison sociale de l'assuré",type:'text',required:true},
      {key:'date_sinistre',label:"Date et heure du sinistre",type:'date',required:true},
      {key:'description_sinistre',label:"Description du sinistre",type:'textarea',required:true},
      {key:'estimation_degats',label:"Estimation des dégâts (FCFA)",type:'text',required:false}
    ]),
    body: `<div class="doc"><h1>DÉCLARATION DE SINISTRE INCENDIE PROFESSIONNEL</h1><p>Contrat n° <strong>{{numero_contrat}}</strong> – Assuré : <strong>{{raison_sociale}}</strong></p><h2>Sinistre</h2><p>Date : {{date_sinistre}}</p><p>Description : {{description_sinistre}}</p><h2>Estimation</h2><p>Dégâts estimés : <strong>{{estimation_degats}} FCFA</strong> (sous réserve d'expertise).</p></div>`
  },
  {
    code: 'adom_rapport_expertise_sinistre', name: "Rapport Expertise Sinistre Matériel", category: 'assurance',
    price: 9000, priceMax: 26000, description: "Rapport d'expertise établi par un expert agréé à la suite d'un sinistre matériel, évaluant les dommages et proposant une indemnisation.", templateType: 'pdf', classe: 'A', active: true, popularity: 56,
    fieldsJson: F([
      {key:'nom_expert',label:"Nom de l'expert",type:'text',required:true},
      {key:'numero_dossier',label:"Numéro de dossier sinistre",type:'text',required:true},
      {key:'nature_sinistre',label:"Nature du sinistre",type:'text',required:true},
      {key:'montant_dommages',label:"Montant total des dommages (FCFA)",type:'text',required:true},
      {key:'date_expertise',label:"Date de l'expertise",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT D'EXPERTISE SINISTRE MATÉRIEL</h1><p>Expert : <strong>{{nom_expert}}</strong> – Dossier n° <strong>{{numero_dossier}}</strong> – Date : {{date_expertise}}</p><h2>Nature du sinistre</h2><p><strong>{{nature_sinistre}}</strong></p><h2>Évaluation des dommages</h2><p>Montant total des dommages constatés : <strong>{{montant_dommages}} FCFA</strong>.</p><h2>Conclusion</h2><p>Indemnisation recommandée après application de la franchise contractuelle, conformément aux conditions générales du contrat.</p></div>`
  },
  {
    code: 'adom_environnement_pollution', name: "Contrat Assurance Environnement Pollution", category: 'assurance',
    price: 13000, priceMax: 40000, description: "Contrat d'assurance couvrant la responsabilité civile environnementale de l'entreprise en cas de pollution accidentelle ou graduelle.", templateType: 'pdf', classe: 'A', active: true, popularity: 54,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'activite_polluante',label:"Activité à risque de pollution",type:'text',required:true},
      {key:'plafond_garantie',label:"Plafond de garantie (FCFA)",type:'text',required:true},
      {key:'prime_annuelle',label:"Prime annuelle (FCFA)",type:'text',required:true},
      {key:'date_effet',label:"Date d'effet",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT ASSURANCE ENVIRONNEMENT POLLUTION</h1><p>Assuré : <strong>{{raison_sociale}}</strong> – Activité : <strong>{{activite_polluante}}</strong> – Effet : {{date_effet}}</p><h2>Garantie</h2><p>Plafond : <strong>{{plafond_garantie}} FCFA</strong> par sinistre. Couvre la dépollution des sols et eaux, les frais de restauration et la RC vis-à-vis des tiers victimes d'une pollution.</p><h2>Prime</h2><p><strong>{{prime_annuelle}} FCFA</strong></p></div>`
  },
  {
    code: 'adom_evenements_annules', name: "Contrat Assurance Événements Annulés", category: 'assurance',
    price: 6000, priceMax: 18000, description: "Contrat d'assurance couvrant les pertes financières résultant de l'annulation, de l'interruption ou de la réduction d'un événement.", templateType: 'pdf', classe: 'B', active: true, popularity: 61,
    fieldsJson: F([
      {key:'organisateur',label:"Nom de l'organisateur",type:'text',required:true},
      {key:'nom_evenement',label:"Nom de l'événement",type:'text',required:true},
      {key:'budget_evenement',label:"Budget prévisionnel (FCFA)",type:'text',required:true},
      {key:'date_evenement',label:"Date prévue de l'événement",type:'date',required:true},
      {key:'prime',label:"Prime (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT ASSURANCE ANNULATION D'ÉVÉNEMENT</h1><p>Organisateur : <strong>{{organisateur}}</strong> – Événement : <strong>{{nom_evenement}}</strong> – Date prévue : {{date_evenement}}</p><h2>Garantie</h2><p>Budget garanti : <strong>{{budget_evenement}} FCFA</strong>. Risques couverts : annulation pour cause de force majeure, intempéries, défaillance prestataire principal, décision administrative.</p><h2>Prime</h2><p><strong>{{prime}} FCFA</strong></p></div>`
  },
  {
    code: 'adom_manifestation_sportive', name: "Contrat Assurance Manifestation Sportive", category: 'assurance',
    price: 7000, priceMax: 20000, description: "Contrat couvrant la responsabilité civile des organisateurs et les risques d'annulation d'une manifestation sportive.", templateType: 'pdf', classe: 'B', active: true, popularity: 59,
    fieldsJson: F([
      {key:'organisateur',label:"Nom de l'organisateur",type:'text',required:true},
      {key:'discipline_sportive',label:"Discipline sportive",type:'text',required:true},
      {key:'lieu',label:"Lieu de la manifestation",type:'text',required:true},
      {key:'nombre_participants',label:"Nombre de participants attendus",type:'text',required:true},
      {key:'date_manifestation',label:"Date de la manifestation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT ASSURANCE MANIFESTATION SPORTIVE</h1><p>Organisateur : <strong>{{organisateur}}</strong> – Discipline : <strong>{{discipline_sportive}}</strong></p><p>Lieu : <strong>{{lieu}}</strong> – Participants : <strong>{{nombre_participants}}</strong> – Date : {{date_manifestation}}</p><h2>Garanties</h2><p>Responsabilité civile organisateur, accidents corporels participants, annulation.</p></div>`
  },
  {
    code: 'adom_oeuvres_art', name: "Contrat Assurance Œuvres d'Art et Collections", category: 'assurance',
    price: 10000, priceMax: 30000, description: "Contrat d'assurance tous risques couvrant les œuvres d'art, objets de collection et pièces de valeur contre le vol, l'incendie et les accidents.", templateType: 'pdf', classe: 'A', active: true, popularity: 47,
    fieldsJson: F([
      {key:'nom_assure',label:"Nom du propriétaire / assuré",type:'text',required:true},
      {key:'description_collection',label:"Description de la collection",type:'textarea',required:true},
      {key:'valeur_agréée',label:"Valeur agréée totale (FCFA)",type:'text',required:true},
      {key:'prime_annuelle',label:"Prime annuelle (FCFA)",type:'text',required:true},
      {key:'date_effet',label:"Date d'effet",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT ASSURANCE ŒUVRES D'ART ET COLLECTIONS</h1><p>Assuré : <strong>{{nom_assure}}</strong> – Effet : {{date_effet}}</p><h2>Biens assurés</h2><p>{{description_collection}}</p><h2>Valeur et prime</h2><p>Valeur agréée : <strong>{{valeur_agréée}} FCFA</strong> – Prime : <strong>{{prime_annuelle}} FCFA</strong>. Garantie en valeur à neuf / agréée, sans application de vétusté.</p></div>`
  },
  {
    code: 'adom_rapport_gestion_sinistres', name: "Rapport de Gestion Sinistres Assureur", category: 'assurance',
    price: 14000, priceMax: 42000, description: "Rapport périodique de gestion du portefeuille de sinistres d'une compagnie d'assurance, incluant analyse de la sinistralité et des provisions.", templateType: 'pdf', classe: 'A', active: true, popularity: 42,
    fieldsJson: F([
      {key:'nom_compagnie',label:"Nom de la compagnie",type:'text',required:true},
      {key:'periode',label:"Période de gestion",type:'text',required:true},
      {key:'nombre_sinistres',label:"Nombre de sinistres déclarés",type:'text',required:true},
      {key:'cout_sinistres',label:"Coût total des sinistres (FCFA)",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE GESTION SINISTRES</h1><p>Compagnie : <strong>{{nom_compagnie}}</strong> – Période : <strong>{{periode}}</strong> – Date : {{date_rapport}}</p><h2>Sinistralité</h2><p>Sinistres déclarés : <strong>{{nombre_sinistres}}</strong> – Coût total : <strong>{{cout_sinistres}} FCFA</strong>.</p><h2>Analyse</h2><p>Le ratio sinistres-primes et les provisions pour sinistres à payer (PSAP) sont détaillés en annexe par branche d'assurance.</p></div>`
  },
  {
    code: 'adom_plan_prevention_risques', name: "Plan de Prévention des Risques Assureur", category: 'assurance',
    price: 8000, priceMax: 22000, description: "Document de plan de prévention des risques élaboré conjointement par l'assureur et l'assuré pour réduire la probabilité de sinistres.", templateType: 'pdf', classe: 'B', active: true, popularity: 50,
    fieldsJson: F([
      {key:'nom_assure',label:"Nom de l'assuré",type:'text',required:true},
      {key:'risques_identifies',label:"Risques identifiés",type:'textarea',required:true},
      {key:'mesures_prevention',label:"Mesures de prévention préconisées",type:'textarea',required:true},
      {key:'echeance_mise_en_oeuvre',label:"Échéance de mise en œuvre",type:'date',required:true},
      {key:'date_plan',label:"Date du plan",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE PRÉVENTION DES RISQUES</h1><p>Assuré : <strong>{{nom_assure}}</strong> – Date : {{date_plan}}</p><h2>Risques identifiés</h2><p>{{risques_identifies}}</p><h2>Mesures préconisées</h2><p>{{mesures_prevention}}</p><h2>Calendrier</h2><p>Mise en œuvre avant le {{echeance_mise_en_oeuvre}}. Un audit de conformité sera réalisé à cette date par l'assureur.</p></div>`
  },
  {
    code: 'adom_co_assurance', name: "Accord de Co-Assurance Grands Risques", category: 'assurance',
    price: 15000, priceMax: 48000, description: "Convention de co-assurance entre plusieurs compagnies d'assurance pour la couverture d'un grand risque industriel ou commercial.", templateType: 'pdf', classe: 'A', active: true, popularity: 46,
    fieldsJson: F([
      {key:'assureur_apériteur',label:"Assureur apériteur (chef de file)",type:'text',required:true},
      {key:'co_assureurs',label:"Co-assureurs et parts respectives",type:'textarea',required:true},
      {key:'nature_risque',label:"Nature du risque co-assuré",type:'text',required:true},
      {key:'capital_garanti',label:"Capital garanti total (FCFA)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CO-ASSURANCE GRANDS RISQUES</h1><p>Apériteur : <strong>{{assureur_apériteur}}</strong> – Risque : <strong>{{nature_risque}}</strong> – Capital : <strong>{{capital_garanti}} FCFA</strong></p><h2>Répartition</h2><p>{{co_assureurs}}</p><h2>Rôle de l'apériteur</h2><p>L'apériteur coordonne la gestion du contrat et des sinistres pour le compte des co-assureurs. Accord signé le {{date_accord}}.</p></div>`
  },
  {
    code: 'adom_reassurance_traite', name: "Accord de Réassurance Traité Proportionnel", category: 'assurance',
    price: 18000, priceMax: 55000, description: "Convention de réassurance en traité proportionnel entre une compagnie cédante et un réassureur, définissant les modalités de cession de primes et sinistres.", templateType: 'pdf', classe: 'A', active: true, popularity: 43,
    fieldsJson: F([
      {key:'compagnie_cedante',label:"Compagnie cédante",type:'text',required:true},
      {key:'nom_reassureur',label:"Nom du réassureur",type:'text',required:true},
      {key:'type_traite',label:"Type de traité (quote-part, excédent de plein)",type:'text',required:true},
      {key:'taux_cession',label:"Taux de cession (%)",type:'text',required:true},
      {key:'date_prise_effet',label:"Date de prise d'effet",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE RÉASSURANCE – TRAITÉ PROPORTIONNEL</h1><p>Cédante : <strong>{{compagnie_cedante}}</strong> – Réassureur : <strong>{{nom_reassureur}}</strong></p><h2>Conditions</h2><p>Type : <strong>{{type_traite}}</strong> – Taux de cession : <strong>{{taux_cession}}%</strong> des primes et sinistres du portefeuille défini en annexe.</p><h2>Prise d'effet</h2><p>{{date_prise_effet}} – Durée : un an, renouvelable par tacite reconduction.</p></div>`
  },
  {
    code: 'adom_charte_qualite_sinistre', name: "Charte Qualité Service Sinistre", category: 'assurance',
    price: 5000, priceMax: 14000, description: "Charte d'engagement qualité d'une compagnie d'assurance vis-à-vis de ses assurés en matière de gestion et de traitement des sinistres.", templateType: 'pdf', classe: 'B', active: true, popularity: 51,
    fieldsJson: F([
      {key:'nom_compagnie',label:"Nom de la compagnie d'assurance",type:'text',required:true},
      {key:'delai_accusé_reception',label:"Délai d'accusé de réception des déclarations (jours)",type:'text',required:true},
      {key:'delai_expertise',label:"Délai de mandatement expert (jours)",type:'text',required:true},
      {key:'delai_reglement',label:"Délai de règlement après accord (jours)",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption de la charte",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE QUALITÉ SERVICE SINISTRE</h1><p>Compagnie : <strong>{{nom_compagnie}}</strong> – Adoptée le {{date_adoption}}</p><h2>Engagements</h2><ul><li>Accusé de réception des déclarations : <strong>{{delai_accusé_reception}} jours</strong></li><li>Mandatement de l'expert : <strong>{{delai_expertise}} jours</strong></li><li>Règlement après accord : <strong>{{delai_reglement}} jours</strong></li></ul><h2>Recours</h2><p>En cas de non-respect de ces engagements, l'assuré peut saisir le médiateur de l'assurance désigné par la CRCA-CIMA.</p></div>`
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
  console.log(`Batch 46b OK — créés:${created} maj:${updated} TOTAL:${total}`);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
