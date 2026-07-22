import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ─── 25 VOLONTARIAT / BÉNÉVOLAT ───────────────────────────────────────────
  {
    code: 'vol_accord_benevolat',
    name: "Accord de Bénévolat (Contrat de Volontariat)",
    category: 'association',
    price: 2000, priceMax: 6000,
    description: "Contrat formalisant l'engagement d'un bénévole au sein d'une association en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 72,
    fieldsJson: F([
      {key:'nom_association',label:"Nom de l'association",type:'text',required:true},
      {key:'nom_benevole',label:"Nom complet du bénévole",type:'text',required:true},
      {key:'mission',label:"Description de la mission",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'date_fin',label:"Date de fin",type:'date',required:false},
      {key:'lieu_mission',label:"Lieu de la mission",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE BÉNÉVOLAT</h1>
<h2>CONTRAT DE VOLONTARIAT</h2>
<p>Entre l'association <strong>{{nom_association}}</strong>, ci-après dénommée "l'Association",</p>
<p>Et Monsieur/Madame <strong>{{nom_benevole}}</strong>, ci-après dénommé(e) "le Bénévole",</p>
<h3>Article 1 – Objet</h3>
<p>Le présent accord a pour objet de définir les conditions d'engagement bénévole au sein de l'Association.</p>
<h3>Article 2 – Mission</h3>
<p>{{mission}}</p>
<h3>Article 3 – Durée</h3>
<p>Du {{date_debut}} au {{date_fin}}, au lieu suivant : {{lieu_mission}}.</p>
<h3>Article 4 – Bénévolat</h3>
<p>Le Bénévole agit à titre gratuit, sans lien de subordination. Aucune rémunération n'est prévue.</p>
<h3>Article 5 – Droit applicable</h3>
<p>Le présent accord est régi par la loi ivoirienne et les statuts de l'Association.</p>
<p>Fait à Abidjan, le ____________________</p>
<p>Signature de l'Association _____________________ Signature du Bénévole _____________________</p></div>`
  },
  {
    code: 'vol_svn_ci',
    name: "Accord de Volontariat National (SVN-CI)",
    category: 'association',
    price: 2500, priceMax: 7000,
    description: "Accord de Service de Volontariat National en Côte d'Ivoire, conforme au dispositif SVN-CI.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 65,
    fieldsJson: F([
      {key:'organisme_accueil',label:"Organisme d'accueil",type:'text',required:true},
      {key:'nom_volontaire',label:"Nom du volontaire",type:'text',required:true},
      {key:'domaine_intervention',label:"Domaine d'intervention",type:'text',required:true},
      {key:'date_prise_fonction',label:"Date de prise de fonction",type:'date',required:true},
      {key:'duree_engagement',label:"Durée de l'engagement (mois)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE VOLONTARIAT NATIONAL</h1>
<h2>SERVICE DE VOLONTARIAT NATIONAL – CÔTE D'IVOIRE (SVN-CI)</h2>
<p>L'organisme d'accueil <strong>{{organisme_accueil}}</strong> et le volontaire <strong>{{nom_volontaire}}</strong> concluent le présent accord.</p>
<h3>Article 1 – Domaine d'intervention</h3>
<p>{{domaine_intervention}}</p>
<h3>Article 2 – Durée</h3>
<p>Prise de fonction le {{date_prise_fonction}} pour une durée de {{duree_engagement}} mois.</p>
<h3>Article 3 – Indemnités</h3>
<p>Une indemnité mensuelle de subsistance est versée conformément au barème SVN-CI en vigueur.</p>
<h3>Article 4 – Obligations du volontaire</h3>
<p>Le volontaire s'engage à respecter le règlement intérieur, la déontologie et les objectifs de l'organisme d'accueil.</p>
<p>Fait à Abidjan, le ____________________</p>
<p>Pour l'organisme d'accueil _____________________ Le volontaire _____________________</p></div>`
  },
  {
    code: 'vol_service_civique',
    name: "Accord de Service Civique (Modèle)",
    category: 'association',
    price: 2000, priceMax: 5500,
    description: "Modèle d'accord de service civique pour jeunes volontaires ivoiriens au sein d'associations agréées.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 60,
    fieldsJson: F([
      {key:'association_agreeee',label:"Association agréée",type:'text',required:true},
      {key:'nom_jeune',label:"Nom du jeune volontaire",type:'text',required:true},
      {key:'missions_civiques',label:"Missions civiques",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'date_fin',label:"Date de fin",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE CIVIQUE</h1>
<p>Entre <strong>{{association_agreeee}}</strong> et <strong>{{nom_jeune}}</strong>.</p>
<h3>Article 1 – Missions</h3>
<p>{{missions_civiques}}</p>
<h3>Article 2 – Durée</h3>
<p>Du {{date_debut}} au {{date_fin}}.</p>
<h3>Article 3 – Statut</h3>
<p>Le volontaire n'est pas salarié. Il bénéficie d'une indemnité et d'une couverture en responsabilité civile.</p>
<h3>Article 4 – Formation</h3>
<p>L'association s'engage à former et accompagner le jeune volontaire tout au long de sa mission.</p>
<p>Fait à __________________, le ____________________</p>
<p>L'association _____________________ Le volontaire _____________________</p></div>`
  },
  {
    code: 'vol_benevolat_associatif',
    name: "Accord de Bénévolat Associatif",
    category: 'association',
    price: 1500, priceMax: 4500,
    description: "Accord standard de bénévolat pour toute association loi 1960 ou OHADA, applicable en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 68,
    fieldsJson: F([
      {key:'nom_association',label:"Nom de l'association",type:'text',required:true},
      {key:'siege_social',label:"Siège social",type:'text',required:true},
      {key:'nom_benevole',label:"Nom du bénévole",type:'text',required:true},
      {key:'activites_benevolat',label:"Activités bénévoles",type:'textarea',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE BÉNÉVOLAT ASSOCIATIF</h1>
<p>L'association <strong>{{nom_association}}</strong>, dont le siège est à <strong>{{siege_social}}</strong>,</p>
<p>et le bénévole <strong>{{nom_benevole}}</strong> conviennent de ce qui suit :</p>
<h3>Article 1 – Activités</h3>
<p>{{activites_benevolat}}</p>
<h3>Article 2 – Gratuité</h3>
<p>Le bénévolat est exercé à titre entièrement gratuit et bénévole, sans aucune contrepartie financière.</p>
<h3>Article 3 – Confidentialité</h3>
<p>Le bénévole s'engage à respecter la confidentialité des informations de l'association.</p>
<p>Fait le {{date_signature}}</p>
<p>L'association _____________________ Le bénévole _____________________</p></div>`
  },
  {
    code: 'vol_mission_etranger',
    name: "Accord de Mission de Bénévole à l'Étranger",
    category: 'association',
    price: 3500, priceMax: 9000,
    description: "Accord encadrant la mission d'un bénévole ivoirien à l'étranger ou d'un bénévole étranger en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 55,
    fieldsJson: F([
      {key:'organisation_envoyante',label:"Organisation envoyante",type:'text',required:true},
      {key:'nom_benevole',label:"Nom du bénévole",type:'text',required:true},
      {key:'pays_destination',label:"Pays de destination",type:'text',required:true},
      {key:'objet_mission',label:"Objet de la mission",type:'textarea',required:true},
      {key:'date_depart',label:"Date de départ",type:'date',required:true},
      {key:'date_retour',label:"Date de retour prévue",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE MISSION DE BÉNÉVOLE À L'ÉTRANGER</h1>
<p>Entre <strong>{{organisation_envoyante}}</strong> et <strong>{{nom_benevole}}</strong>.</p>
<h3>Article 1 – Destination</h3>
<p>Pays de destination : <strong>{{pays_destination}}</strong></p>
<h3>Article 2 – Mission</h3>
<p>{{objet_mission}}</p>
<h3>Article 3 – Durée</h3>
<p>Du {{date_depart}} au {{date_retour}}.</p>
<h3>Article 4 – Prise en charge</h3>
<p>L'organisation prend en charge les frais de transport, de logement et assure la couverture médicale du bénévole.</p>
<h3>Article 5 – Rapatriement</h3>
<p>En cas d'urgence, l'organisation prend en charge le rapatriement du bénévole.</p>
<p>Fait à Abidjan, le ____________________</p>
<p>L'organisation _____________________ Le bénévole _____________________</p></div>`
  },
  {
    code: 'vol_vsi',
    name: "Accord de Volontariat de Solidarité Internationale (VSI)",
    category: 'association',
    price: 4000, priceMax: 10000,
    description: "Accord VSI conforme aux standards internationaux pour les missions de solidarité internationale depuis la Côte d'Ivoire.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 62,
    fieldsJson: F([
      {key:'ong_mandataire',label:"ONG mandataire",type:'text',required:true},
      {key:'nom_volontaire',label:"Nom du volontaire VSI",type:'text',required:true},
      {key:'pays_mission',label:"Pays de la mission",type:'text',required:true},
      {key:'secteur_intervention',label:"Secteur d'intervention",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'duree_mois',label:"Durée (mois)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE VOLONTARIAT DE SOLIDARITÉ INTERNATIONALE</h1>
<h2>VSI – VOLONTARIAT DE SOLIDARITÉ INTERNATIONALE</h2>
<p>L'ONG <strong>{{ong_mandataire}}</strong> et le volontaire <strong>{{nom_volontaire}}</strong> concluent le présent accord VSI.</p>
<h3>Article 1 – Pays et secteur</h3>
<p>Mission au <strong>{{pays_mission}}</strong> dans le secteur : <strong>{{secteur_intervention}}</strong>.</p>
<h3>Article 2 – Durée</h3>
<p>À compter du {{date_debut}} pour {{duree_mois}} mois.</p>
<h3>Article 3 – Conditions</h3>
<p>Le volontaire bénéficie d'une indemnité mensuelle, d'une couverture sociale et d'un billet de retour.</p>
<h3>Article 4 – Obligations</h3>
<p>Le volontaire respecte les principes de solidarité, de non-discrimination et de redevabilité envers les populations bénéficiaires.</p>
<p>Fait à Abidjan, le ____________________</p>
<p>L'ONG _____________________ Le volontaire _____________________</p></div>`
  },
  {
    code: 'vol_vnu',
    name: "Accord de Volontariat des Nations Unies (VNU)",
    category: 'association',
    price: 4500, priceMax: 10000,
    description: "Modèle d'accord VNU pour les volontaires des Nations Unies affectés en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 58,
    fieldsJson: F([
      {key:'agence_onu',label:"Agence des Nations Unies",type:'text',required:true},
      {key:'nom_vnu',label:"Nom du Volontaire des Nations Unies",type:'text',required:true},
      {key:'poste_affectation',label:"Poste d'affectation",type:'text',required:true},
      {key:'lieu_affectation',label:"Lieu d'affectation",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE VOLONTARIAT DES NATIONS UNIES</h1>
<h2>PROGRAMME VNU – VOLONTAIRES DES NATIONS UNIES</h2>
<p>Entre <strong>{{agence_onu}}</strong> et <strong>{{nom_vnu}}</strong>.</p>
<h3>Article 1 – Affectation</h3>
<p>Poste : <strong>{{poste_affectation}}</strong> – Lieu : <strong>{{lieu_affectation}}</strong></p>
<h3>Article 2 – Date de début</h3>
<p>{{date_debut}}</p>
<h3>Article 3 – Statut</h3>
<p>Le VNU est un volontaire international, non fonctionnaire des Nations Unies, bénéficiant d'une allocation mensuelle de subsistance.</p>
<h3>Article 4 – Code de conduite</h3>
<p>Le VNU respecte les valeurs des Nations Unies, l'intégrité, le professionnalisme et le respect de la diversité.</p>
<p>Fait à Abidjan, le ____________________</p>
<p>L'agence ONU _____________________ Le VNU _____________________</p></div>`
  },
  {
    code: 'vol_peace_corps',
    name: "Accord de Corps de la Paix (Peace Corps Modèle)",
    category: 'association',
    price: 3000, priceMax: 8000,
    description: "Modèle d'accord pour volontaires type Peace Corps en mission en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 45,
    fieldsJson: F([
      {key:'organisation_partenaire',label:"Organisation partenaire locale",type:'text',required:true},
      {key:'nom_volontaire',label:"Nom du volontaire",type:'text',required:true},
      {key:'domaine_service',label:"Domaine de service",type:'text',required:true},
      {key:'communaute_accueil',label:"Communauté d'accueil",type:'text',required:true},
      {key:'date_affectation',label:"Date d'affectation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CORPS DE LA PAIX</h1>
<h2>MODÈLE – PEACE CORPS VOLUNTEER AGREEMENT</h2>
<p>Entre <strong>{{organisation_partenaire}}</strong> et le volontaire <strong>{{nom_volontaire}}</strong>.</p>
<h3>Article 1 – Domaine de service</h3>
<p><strong>{{domaine_service}}</strong> au sein de la communauté <strong>{{communaute_accueil}}</strong>.</p>
<h3>Article 2 – Date d'affectation</h3>
<p>{{date_affectation}}</p>
<h3>Article 3 – Engagements</h3>
<p>Le volontaire s'engage à vivre et travailler au sein de la communauté, à respecter les us et coutumes locaux et à contribuer au développement durable.</p>
<h3>Article 4 – Soutien</h3>
<p>L'organisation partenaire fournit le logement, l'accueil communautaire et un accompagnement technique.</p>
<p>Fait à __________________, le ____________________</p>
<p>L'organisation _____________________ Le volontaire _____________________</p></div>`
  },
  {
    code: 'vol_mecenat_competences',
    name: "Accord de Bénévolat de Compétence (Mécénat de Compétences)",
    category: 'association',
    price: 3500, priceMax: 9000,
    description: "Accord de mécénat de compétences entre une entreprise et une association en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 63,
    fieldsJson: F([
      {key:'nom_entreprise',label:"Nom de l'entreprise mécène",type:'text',required:true},
      {key:'nom_association',label:"Nom de l'association bénéficiaire",type:'text',required:true},
      {key:'nom_salarie',label:"Nom du salarié mis à disposition",type:'text',required:true},
      {key:'competences_apportees',label:"Compétences apportées",type:'textarea',required:true},
      {key:'duree_mission',label:"Durée de la mission",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE MÉCÉNAT DE COMPÉTENCES</h1>
<h2>BÉNÉVOLAT DE COMPÉTENCE EN ENTREPRISE</h2>
<p>Entre l'entreprise <strong>{{nom_entreprise}}</strong> et l'association <strong>{{nom_association}}</strong>.</p>
<h3>Article 1 – Salarié mis à disposition</h3>
<p>Monsieur/Madame <strong>{{nom_salarie}}</strong> est mis(e) à disposition de l'association.</p>
<h3>Article 2 – Compétences</h3>
<p>{{competences_apportees}}</p>
<h3>Article 3 – Durée</h3>
<p>{{duree_mission}} à compter du {{date_debut}}.</p>
<h3>Article 4 – Statut du salarié</h3>
<p>Le salarié conserve son contrat de travail et sa rémunération versée par l'entreprise durant la mission.</p>
<h3>Article 5 – Valorisation</h3>
<p>L'entreprise peut valoriser cette mise à disposition comme don en nature dans le cadre de la loi sur le mécénat.</p>
<p>Fait à Abidjan, le ____________________</p>
<p>L'entreprise _____________________ L'association _____________________</p></div>`
  },
  {
    code: 'vol_parrainage_benevole',
    name: "Accord de Parrainage de Bénévole (Tutorat)",
    category: 'association',
    price: 1500, priceMax: 4000,
    description: "Accord de parrainage et de tutorat entre un bénévole expérimenté et un nouveau bénévole.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 50,
    fieldsJson: F([
      {key:'nom_association',label:"Nom de l'association",type:'text',required:true},
      {key:'nom_parrain',label:"Nom du bénévole parrain",type:'text',required:true},
      {key:'nom_filleul',label:"Nom du bénévole filleul",type:'text',required:true},
      {key:'objectifs_tutorat',label:"Objectifs du tutorat",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début du tutorat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARRAINAGE DE BÉNÉVOLE</h1>
<h2>TUTORAT BÉNÉVOLE</h2>
<p>Au sein de l'association <strong>{{nom_association}}</strong>,</p>
<p>Le parrain <strong>{{nom_parrain}}</strong> et le filleul <strong>{{nom_filleul}}</strong> concluent cet accord.</p>
<h3>Article 1 – Objectifs</h3>
<p>{{objectifs_tutorat}}</p>
<h3>Article 2 – Engagements du parrain</h3>
<p>Le parrain s'engage à accueillir, orienter, accompagner et soutenir le filleul dans ses missions bénévoles.</p>
<h3>Article 3 – Engagements du filleul</h3>
<p>Le filleul s'engage à participer activement aux réunions de tutorat et à respecter les conseils du parrain.</p>
<h3>Article 4 – Durée</h3>
<p>À compter du {{date_debut}}, pour une durée minimale de 3 mois.</p>
<p>Fait à __________________, le ____________________</p>
<p>Le parrain _____________________ Le filleul _____________________</p></div>`
  },
  {
    code: 'vol_formation_benevole',
    name: "Accord de Formation de Bénévole",
    category: 'association',
    price: 2000, priceMax: 5000,
    description: "Accord encadrant la formation offerte à un bénévole par une association ivoirienne.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 54,
    fieldsJson: F([
      {key:'nom_association',label:"Nom de l'association",type:'text',required:true},
      {key:'nom_benevole',label:"Nom du bénévole",type:'text',required:true},
      {key:'intitule_formation',label:"Intitulé de la formation",type:'text',required:true},
      {key:'duree_formation',label:"Durée de la formation",type:'text',required:true},
      {key:'date_formation',label:"Date de la formation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE FORMATION DE BÉNÉVOLE</h1>
<p>L'association <strong>{{nom_association}}</strong> s'engage à former le bénévole <strong>{{nom_benevole}}</strong>.</p>
<h3>Article 1 – Formation</h3>
<p>Intitulé : <strong>{{intitule_formation}}</strong> – Durée : {{duree_formation}}</p>
<h3>Article 2 – Date</h3>
<p>La formation débute le {{date_formation}}.</p>
<h3>Article 3 – Prise en charge</h3>
<p>L'association prend en charge les frais pédagogiques. Le bénévole s'engage à restituer les acquis au service de l'association.</p>
<h3>Article 4 – Engagement</h3>
<p>En contrepartie, le bénévole s'engage à poursuivre son engagement associatif pendant au moins 6 mois après la formation.</p>
<p>Fait à __________________, le ____________________</p>
<p>L'association _____________________ Le bénévole _____________________</p></div>`
  },
  {
    code: 'vol_remboursement_frais',
    name: "Accord de Remboursement de Frais du Bénévole",
    category: 'association',
    price: 1500, priceMax: 4000,
    description: "Accord définissant les modalités de remboursement des frais engagés par un bénévole en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 57,
    fieldsJson: F([
      {key:'nom_association',label:"Nom de l'association",type:'text',required:true},
      {key:'nom_benevole',label:"Nom du bénévole",type:'text',required:true},
      {key:'types_frais',label:"Types de frais remboursables",type:'textarea',required:true},
      {key:'plafond_mensuel',label:"Plafond mensuel de remboursement (FCFA)",type:'text',required:true},
      {key:'procedure_remboursement',label:"Procédure de remboursement",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE REMBOURSEMENT DE FRAIS DU BÉNÉVOLE</h1>
<p>L'association <strong>{{nom_association}}</strong> et le bénévole <strong>{{nom_benevole}}</strong> conviennent des modalités de remboursement.</p>
<h3>Article 1 – Frais éligibles</h3>
<p>{{types_frais}}</p>
<h3>Article 2 – Plafond</h3>
<p>Le plafond mensuel de remboursement est fixé à <strong>{{plafond_mensuel}} FCFA</strong>.</p>
<h3>Article 3 – Procédure</h3>
<p>{{procedure_remboursement}}</p>
<h3>Article 4 – Pièces justificatives</h3>
<p>Tout remboursement est subordonné à la présentation de pièces justificatives originales (reçus, factures, billets).</p>
<p>Fait à __________________, le ____________________</p>
<p>L'association _____________________ Le bénévole _____________________</p></div>`
  },
  {
    code: 'vol_reconnaissance_engagement',
    name: "Accord de Reconnaissance de l'Engagement Bénévole",
    category: 'association',
    price: 1000, priceMax: 3000,
    description: "Document officiel de reconnaissance et de valorisation de l'engagement bénévole au sein d'une association.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 61,
    fieldsJson: F([
      {key:'nom_association',label:"Nom de l'association",type:'text',required:true},
      {key:'nom_benevole',label:"Nom du bénévole",type:'text',required:true},
      {key:'missions_accomplies',label:"Missions accomplies",type:'textarea',required:true},
      {key:'periode_engagement',label:"Période d'engagement",type:'text',required:true},
      {key:'date_remise',label:"Date de remise de la reconnaissance",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ATTESTATION DE RECONNAISSANCE DE L'ENGAGEMENT BÉNÉVOLE</h1>
<p>L'association <strong>{{nom_association}}</strong> décerne la présente attestation à <strong>{{nom_benevole}}</strong>.</p>
<h3>Période d'engagement</h3>
<p>{{periode_engagement}}</p>
<h3>Missions accomplies</h3>
<p>{{missions_accomplies}}</p>
<h3>Reconnaissance</h3>
<p>L'association exprime sa gratitude et sa reconnaissance pour l'engagement exemplaire, la disponibilité et le dévouement dont a fait preuve le bénévole au service des populations et des valeurs associatives.</p>
<p>Remis à __________________, le {{date_remise}}</p>
<p>Le Président de l'association _____________________</p></div>`
  },
  {
    code: 'vol_benevolat_evenementiel',
    name: "Accord de Bénévolat Événementiel",
    category: 'association',
    price: 1500, priceMax: 4500,
    description: "Accord de bénévolat ponctuel pour un événement associatif, culturel ou sportif en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 66,
    fieldsJson: F([
      {key:'nom_organisateur',label:"Nom de l'organisateur",type:'text',required:true},
      {key:'nom_evenement',label:"Nom de l'événement",type:'text',required:true},
      {key:'nom_benevole',label:"Nom du bénévole",type:'text',required:true},
      {key:'role_evenement',label:"Rôle lors de l'événement",type:'text',required:true},
      {key:'date_evenement',label:"Date de l'événement",type:'date',required:true},
      {key:'lieu_evenement',label:"Lieu de l'événement",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE BÉNÉVOLAT ÉVÉNEMENTIEL</h1>
<p>L'organisateur <strong>{{nom_organisateur}}</strong> et le bénévole <strong>{{nom_benevole}}</strong> concluent cet accord pour l'événement <strong>{{nom_evenement}}</strong>.</p>
<h3>Article 1 – Rôle</h3>
<p>Rôle du bénévole : <strong>{{role_evenement}}</strong></p>
<h3>Article 2 – Date et lieu</h3>
<p>Le {{date_evenement}} à <strong>{{lieu_evenement}}</strong>.</p>
<h3>Article 3 – Conditions</h3>
<p>Le bénévole agit à titre gratuit. L'organisateur prend en charge la restauration et le transport sur site le jour de l'événement.</p>
<h3>Article 4 – Image</h3>
<p>Le bénévole autorise l'organisateur à utiliser son image dans le cadre de la communication liée à l'événement.</p>
<p>Fait à __________________, le ____________________</p>
<p>L'organisateur _____________________ Le bénévole _____________________</p></div>`
  },
  {
    code: 'vol_benevolat_scolaire',
    name: "Accord de Bénévolat Scolaire et Parascolaire",
    category: 'association',
    price: 1500, priceMax: 4000,
    description: "Accord de bénévolat pour interventions scolaires et parascolaires dans les établissements ivoiriens.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 59,
    fieldsJson: F([
      {key:'nom_etablissement',label:"Nom de l'établissement scolaire",type:'text',required:true},
      {key:'nom_benevole',label:"Nom du bénévole intervenant",type:'text',required:true},
      {key:'type_intervention',label:"Type d'intervention (cours, atelier, etc.)",type:'text',required:true},
      {key:'public_cible',label:"Public cible (classe, niveau)",type:'text',required:true},
      {key:'date_debut',label:"Date de début des interventions",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE BÉNÉVOLAT SCOLAIRE ET PARASCOLAIRE</h1>
<p>L'établissement <strong>{{nom_etablissement}}</strong> et le bénévole <strong>{{nom_benevole}}</strong> conviennent de ce qui suit.</p>
<h3>Article 1 – Type d'intervention</h3>
<p>{{type_intervention}} auprès de : <strong>{{public_cible}}</strong></p>
<h3>Article 2 – Début des interventions</h3>
<p>{{date_debut}}</p>
<h3>Article 3 – Encadrement</h3>
<p>Le bénévole intervient sous la supervision du directeur pédagogique et respecte le règlement intérieur de l'établissement.</p>
<h3>Article 4 – Protection des mineurs</h3>
<p>Le bénévole s'engage à respecter les règles de protection de l'enfance et à signaler tout comportement inapproprié.</p>
<p>Fait à __________________, le ____________________</p>
<p>Le directeur _____________________ Le bénévole _____________________</p></div>`
  },
  {
    code: 'vol_benevolat_handicap',
    name: "Accord de Bénévolat de Personne en Situation de Handicap",
    category: 'association',
    price: 1500, priceMax: 4500,
    description: "Accord adapté pour l'accueil de bénévoles en situation de handicap au sein d'une association ivoirienne.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 48,
    fieldsJson: F([
      {key:'nom_association',label:"Nom de l'association",type:'text',required:true},
      {key:'nom_benevole',label:"Nom du bénévole",type:'text',required:true},
      {key:'type_handicap',label:"Nature du handicap (si communiqué)",type:'text',required:false},
      {key:'amenagements_prevus',label:"Aménagements prévus",type:'textarea',required:true},
      {key:'missions_adaptees',label:"Missions adaptées",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE BÉNÉVOLAT – PERSONNE EN SITUATION DE HANDICAP</h1>
<p>L'association <strong>{{nom_association}}</strong> s'engage à accueillir le bénévole <strong>{{nom_benevole}}</strong> dans le plein respect de ses droits et de sa dignité.</p>
<h3>Article 1 – Aménagements</h3>
<p>{{amenagements_prevus}}</p>
<h3>Article 2 – Missions adaptées</h3>
<p>{{missions_adaptees}}</p>
<h3>Article 3 – Nature du handicap</h3>
<p>{{type_handicap}}</p>
<h3>Article 4 – Non-discrimination</h3>
<p>L'association garantit l'égalité de traitement et l'absence de toute discrimination liée au handicap, conformément aux conventions internationales ratifiées par la Côte d'Ivoire.</p>
<p>Fait à __________________, le ____________________</p>
<p>L'association _____________________ Le bénévole _____________________</p></div>`
  },
  {
    code: 'vol_telebenevolat',
    name: "Accord de Télébénévolat (Bénévolat à Distance)",
    category: 'association',
    price: 1500, priceMax: 4000,
    description: "Accord de bénévolat à distance (télébénévolat) via outils numériques, adapté au contexte ivoirien.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 52,
    fieldsJson: F([
      {key:'nom_association',label:"Nom de l'association",type:'text',required:true},
      {key:'nom_benevole',label:"Nom du télébénévole",type:'text',required:true},
      {key:'missions_distance',label:"Missions réalisées à distance",type:'textarea',required:true},
      {key:'outils_utilises',label:"Outils numériques utilisés",type:'text',required:true},
      {key:'disponibilite_hebdo',label:"Disponibilité hebdomadaire (heures)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE TÉLÉBÉNÉVOLAT</h1>
<h2>BÉNÉVOLAT À DISTANCE</h2>
<p>L'association <strong>{{nom_association}}</strong> et le télébénévole <strong>{{nom_benevole}}</strong> conviennent de ce qui suit.</p>
<h3>Article 1 – Missions à distance</h3>
<p>{{missions_distance}}</p>
<h3>Article 2 – Outils</h3>
<p>{{outils_utilises}}</p>
<h3>Article 3 – Disponibilité</h3>
<p>Le télébénévole s'engage sur une disponibilité hebdomadaire de {{disponibilite_hebdo}} heures.</p>
<h3>Article 4 – Confidentialité numérique</h3>
<p>Le télébénévole s'engage à respecter la confidentialité des données numériques auxquelles il a accès et à ne pas les divulguer à des tiers.</p>
<p>Fait à __________________, le ____________________</p>
<p>L'association _____________________ Le télébénévole _____________________</p></div>`
  },
  {
    code: 'vol_benevole_retraite',
    name: "Accord de Bénévolat de Retraité Actif",
    category: 'association',
    price: 1500, priceMax: 4000,
    description: "Accord valorisant l'engagement bénévole des retraités actifs au sein d'associations ivoiriennes.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 53,
    fieldsJson: F([
      {key:'nom_association',label:"Nom de l'association",type:'text',required:true},
      {key:'nom_retraite',label:"Nom du retraité bénévole",type:'text',required:true},
      {key:'expertise_apportee',label:"Expertise et expérience apportées",type:'textarea',required:true},
      {key:'jours_disponibilite',label:"Jours de disponibilité par semaine",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE BÉNÉVOLAT DE RETRAITÉ ACTIF</h1>
<p>L'association <strong>{{nom_association}}</strong> et le retraité bénévole <strong>{{nom_retraite}}</strong> concluent cet accord.</p>
<h3>Article 1 – Expertise</h3>
<p>{{expertise_apportee}}</p>
<h3>Article 2 – Disponibilité</h3>
<p>Le retraité bénévole est disponible {{jours_disponibilite}} jours par semaine, à compter du {{date_debut}}.</p>
<h3>Article 3 – Valorisation des compétences</h3>
<p>L'association reconnaît la valeur de l'expérience professionnelle du retraité et l'intègre dans ses projets de développement.</p>
<h3>Article 4 – Couverture</h3>
<p>Le retraité bénévole est couvert par l'assurance responsabilité civile de l'association lors de ses missions.</p>
<p>Fait à __________________, le ____________________</p>
<p>L'association _____________________ Le retraité bénévole _____________________</p></div>`
  },
  {
    code: 'vol_benevolat_sportif',
    name: "Accord de Bénévolat Sportif (Encadrement)",
    category: 'association',
    price: 2000, priceMax: 5000,
    description: "Accord de bénévolat pour encadreurs sportifs bénévoles dans les clubs et associations sportives ivoiriennes.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 64,
    fieldsJson: F([
      {key:'club_association',label:"Club ou association sportive",type:'text',required:true},
      {key:'nom_encadreur',label:"Nom de l'encadreur bénévole",type:'text',required:true},
      {key:'discipline_sportive',label:"Discipline sportive",type:'text',required:true},
      {key:'categories_encadrees',label:"Catégories encadrées (minimes, seniors, etc.)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE BÉNÉVOLAT SPORTIF</h1>
<h2>ENCADREMENT BÉNÉVOLE</h2>
<p>Le club <strong>{{club_association}}</strong> et l'encadreur bénévole <strong>{{nom_encadreur}}</strong> concluent cet accord.</p>
<h3>Article 1 – Discipline</h3>
<p><strong>{{discipline_sportive}}</strong> – Catégories : <strong>{{categories_encadrees}}</strong></p>
<h3>Article 2 – Prise de fonction</h3>
<p>{{date_debut}}</p>
<h3>Article 3 – Obligations</h3>
<p>L'encadreur bénévole s'engage à respecter l'éthique sportive, les règles de protection des mineurs et les directives techniques du club.</p>
<h3>Article 4 – Assurance</h3>
<p>Le club assure l'encadreur bénévole pour tout accident survenu dans le cadre de ses missions.</p>
<p>Fait à __________________, le ____________________</p>
<p>Le club _____________________ L'encadreur bénévole _____________________</p></div>`
  },
  {
    code: 'vol_benevolat_culturel',
    name: "Accord de Bénévolat Culturel (Animateur)",
    category: 'association',
    price: 1500, priceMax: 4500,
    description: "Accord de bénévolat pour animateurs culturels bénévoles dans des associations culturelles ivoiriennes.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 56,
    fieldsJson: F([
      {key:'association_culturelle',label:"Association culturelle",type:'text',required:true},
      {key:'nom_animateur',label:"Nom de l'animateur bénévole",type:'text',required:true},
      {key:'domaine_culturel',label:"Domaine culturel (théâtre, musique, arts plastiques, etc.)",type:'text',required:true},
      {key:'activites_prevues',label:"Activités culturelles prévues",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE BÉNÉVOLAT CULTUREL</h1>
<h2>ANIMATEUR CULTUREL BÉNÉVOLE</h2>
<p>L'association <strong>{{association_culturelle}}</strong> et l'animateur bénévole <strong>{{nom_animateur}}</strong> concluent cet accord.</p>
<h3>Article 1 – Domaine d'animation</h3>
<p><strong>{{domaine_culturel}}</strong></p>
<h3>Article 2 – Activités</h3>
<p>{{activites_prevues}}</p>
<h3>Article 3 – Prise de fonction</h3>
<p>{{date_debut}}</p>
<h3>Article 4 – Droits d'auteur</h3>
<p>Les créations réalisées dans le cadre du bénévolat restent la propriété de l'animateur bénévole, sauf accord contraire écrit avec l'association.</p>
<p>Fait à __________________, le ____________________</p>
<p>L'association _____________________ L'animateur bénévole _____________________</p></div>`
  },
  {
    code: 'vol_rapport_annuel_benevole',
    name: "Rapport Annuel de l'Engagement Bénévole",
    category: 'association',
    price: 2000, priceMax: 5000,
    description: "Modèle de rapport annuel documentant et valorisant l'engagement bénévole d'une association ivoirienne.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 47,
    fieldsJson: F([
      {key:'nom_association',label:"Nom de l'association",type:'text',required:true},
      {key:'annee_rapport',label:"Année du rapport",type:'text',required:true},
      {key:'nombre_benevoles',label:"Nombre de bénévoles actifs",type:'text',required:true},
      {key:'heures_benevolat',label:"Total heures de bénévolat",type:'text',required:true},
      {key:'actions_realisees',label:"Principales actions réalisées",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT ANNUEL DE L'ENGAGEMENT BÉNÉVOLE</h1>
<h2>{{nom_association}} – Année {{annee_rapport}}</h2>
<h3>Chiffres clés</h3>
<p>Nombre de bénévoles actifs : <strong>{{nombre_benevoles}}</strong></p>
<p>Total heures de bénévolat : <strong>{{heures_benevolat}} heures</strong></p>
<h3>Principales actions réalisées</h3>
<p>{{actions_realisees}}</p>
<h3>Valorisation</h3>
<p>L'engagement bénévole constitue le socle de notre association et représente une contribution essentielle au développement communautaire et social.</p>
<h3>Perspectives</h3>
<p>L'association s'engage à renforcer son dispositif de recrutement et de fidélisation des bénévoles pour l'année à venir.</p>
<p>Le Président de l'association _____________________</p></div>`
  },
  {
    code: 'vol_plan_recrutement_benevoles',
    name: "Plan de Recrutement et Fidélisation des Bénévoles",
    category: 'association',
    price: 2500, priceMax: 6000,
    description: "Plan stratégique de recrutement et de fidélisation des bénévoles pour une association ivoirienne.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 49,
    fieldsJson: F([
      {key:'nom_association',label:"Nom de l'association",type:'text',required:true},
      {key:'objectif_benevoles',label:"Objectif de recrutement (nombre)",type:'text',required:true},
      {key:'profils_recherches',label:"Profils de bénévoles recherchés",type:'textarea',required:true},
      {key:'actions_recrutement',label:"Actions de recrutement prévues",type:'textarea',required:true},
      {key:'actions_fidelisation',label:"Actions de fidélisation prévues",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE RECRUTEMENT ET FIDÉLISATION DES BÉNÉVOLES</h1>
<h2>{{nom_association}}</h2>
<h3>Objectif</h3>
<p>Recruter <strong>{{objectif_benevoles}}</strong> nouveaux bénévoles.</p>
<h3>Profils recherchés</h3>
<p>{{profils_recherches}}</p>
<h3>Actions de recrutement</h3>
<p>{{actions_recrutement}}</p>
<h3>Actions de fidélisation</h3>
<p>{{actions_fidelisation}}</p>
<h3>Suivi</h3>
<p>Un tableau de bord mensuel permettra de suivre les indicateurs de recrutement et de fidélisation et d'ajuster les actions en conséquence.</p>
<p>Approuvé par le bureau de l'association _____________________</p></div>`
  },
  {
    code: 'vol_plateforme_mise_en_relation',
    name: "Accord de Service de Plateforme de Mise en Relation Bénévoles",
    category: 'association',
    price: 3000, priceMax: 8000,
    description: "Accord entre une plateforme numérique de mise en relation et une association utilisatrice en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 46,
    fieldsJson: F([
      {key:'nom_plateforme',label:"Nom de la plateforme",type:'text',required:true},
      {key:'nom_association',label:"Nom de l'association utilisatrice",type:'text',required:true},
      {key:'services_fournis',label:"Services fournis par la plateforme",type:'textarea',required:true},
      {key:'cout_abonnement',label:"Coût de l'abonnement (FCFA/an)",type:'text',required:false},
      {key:'date_debut',label:"Date de début du service",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – PLATEFORME DE MISE EN RELATION BÉNÉVOLES</h1>
<p>La plateforme <strong>{{nom_plateforme}}</strong> et l'association <strong>{{nom_association}}</strong> concluent cet accord.</p>
<h3>Article 1 – Services</h3>
<p>{{services_fournis}}</p>
<h3>Article 2 – Tarif</h3>
<p>Abonnement annuel : {{cout_abonnement}} FCFA.</p>
<h3>Article 3 – Données personnelles</h3>
<p>La plateforme s'engage à protéger les données des bénévoles conformément à la réglementation ivoirienne sur la protection des données personnelles.</p>
<h3>Article 4 – Durée</h3>
<p>À compter du {{date_debut}}, renouvelable par tacite reconduction.</p>
<p>Fait à Abidjan, le ____________________</p>
<p>La plateforme _____________________ L'association _____________________</p></div>`
  },
  {
    code: 'vol_partenariat_entreprise',
    name: "Accord de Partenariat Association-Entreprise (Bénévolat Corporate)",
    category: 'association',
    price: 3500, priceMax: 9000,
    description: "Accord de partenariat entre une association et une entreprise pour la mise en place de bénévolat corporate en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 67,
    fieldsJson: F([
      {key:'nom_association',label:"Nom de l'association",type:'text',required:true},
      {key:'nom_entreprise',label:"Nom de l'entreprise partenaire",type:'text',required:true},
      {key:'engagements_entreprise',label:"Engagements de l'entreprise",type:'textarea',required:true},
      {key:'engagements_association',label:"Engagements de l'association",type:'textarea',required:true},
      {key:'duree_partenariat',label:"Durée du partenariat",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT ASSOCIATION-ENTREPRISE</h1>
<h2>BÉNÉVOLAT CORPORATE</h2>
<p>L'association <strong>{{nom_association}}</strong> et l'entreprise <strong>{{nom_entreprise}}</strong> concluent le présent partenariat.</p>
<h3>Article 1 – Engagements de l'entreprise</h3>
<p>{{engagements_entreprise}}</p>
<h3>Article 2 – Engagements de l'association</h3>
<p>{{engagements_association}}</p>
<h3>Article 3 – Durée</h3>
<p>{{duree_partenariat}}</p>
<h3>Article 4 – Communication</h3>
<p>Les deux parties peuvent communiquer sur ce partenariat dans le respect de leurs chartes graphiques respectives.</p>
<p>Fait à Abidjan, le {{date_signature}}</p>
<p>L'association _____________________ L'entreprise _____________________</p></div>`
  },
  {
    code: 'vol_charte_benevole',
    name: "Charte du Bénévole et du Volontaire",
    category: 'association',
    price: 1000, priceMax: 3000,
    description: "Charte définissant les droits, devoirs et valeurs des bénévoles et volontaires d'une association ivoirienne.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 70,
    fieldsJson: F([
      {key:'nom_association',label:"Nom de l'association",type:'text',required:true},
      {key:'valeurs_association',label:"Valeurs fondamentales de l'association",type:'textarea',required:true},
      {key:'droits_benevole',label:"Droits du bénévole",type:'textarea',required:true},
      {key:'devoirs_benevole',label:"Devoirs du bénévole",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DU BÉNÉVOLE ET DU VOLONTAIRE</h1>
<h2>{{nom_association}}</h2>
<h3>Préambule</h3>
<p>La présente charte définit les principes régissant l'engagement bénévole et volontaire au sein de l'association.</p>
<h3>Valeurs fondamentales</h3>
<p>{{valeurs_association}}</p>
<h3>Droits du bénévole</h3>
<p>{{droits_benevole}}</p>
<h3>Devoirs du bénévole</h3>
<p>{{devoirs_benevole}}</p>
<h3>Engagement</h3>
<p>En rejoignant l'association, chaque bénévole et volontaire s'engage à respecter la présente charte et à en promouvoir les valeurs dans toutes ses actions.</p>
<p>Adopté par l'Assemblée Générale de l'association _____________________</p></div>`
  },

  // ─── 25 ACTION HUMANITAIRE ────────────────────────────────────────────────
  {
    code: 'hum_accord_cadre_partenariat',
    name: "Accord-Cadre de Partenariat Humanitaire (HCR/UNICEF Modèle)",
    category: 'association',
    price: 5000, priceMax: 12000,
    description: "Accord-cadre de partenariat humanitaire inspiré des modèles HCR et UNICEF, adapté au contexte ivoirien.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 75,
    fieldsJson: F([
      {key:'agence_internationale',label:"Agence internationale partenaire",type:'text',required:true},
      {key:'organisation_nationale',label:"Organisation nationale partenaire",type:'text',required:true},
      {key:'domaines_cooperation',label:"Domaines de coopération",type:'textarea',required:true},
      {key:'zone_intervention',label:"Zone géographique d'intervention",type:'text',required:true},
      {key:'duree_accord',label:"Durée de l'accord-cadre",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD-CADRE DE PARTENARIAT HUMANITAIRE</h1>
<p>Entre <strong>{{agence_internationale}}</strong> et <strong>{{organisation_nationale}}</strong>.</p>
<h3>Article 1 – Domaines de coopération</h3>
<p>{{domaines_cooperation}}</p>
<h3>Article 2 – Zone d'intervention</h3>
<p>{{zone_intervention}}</p>
<h3>Article 3 – Durée</h3>
<p>{{duree_accord}}</p>
<h3>Article 4 – Principes humanitaires</h3>
<p>Les parties s'engagent à respecter les principes d'humanité, de neutralité, d'impartialité et d'indépendance dans toutes leurs actions.</p>
<h3>Article 5 – Redevabilité</h3>
<p>Les parties rendent compte régulièrement de l'utilisation des ressources et de l'atteinte des résultats humanitaires.</p>
<p>Fait à Abidjan, le {{date_signature}}</p>
<p>L'agence internationale _____________________ L'organisation nationale _____________________</p></div>`
  },
  {
    code: 'hum_mise_en_oeuvre',
    name: "Accord de Mise en Oeuvre Humanitaire (Sous-traitance ONG)",
    category: 'association',
    price: 4500, priceMax: 11000,
    description: "Accord de sous-traitance entre une ONG principale et une ONG de mise en oeuvre pour des activités humanitaires.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 68,
    fieldsJson: F([
      {key:'ong_principale',label:"ONG principale (mandant)",type:'text',required:true},
      {key:'ong_mise_en_oeuvre',label:"ONG de mise en oeuvre",type:'text',required:true},
      {key:'activites_sous_traitees',label:"Activités sous-traitées",type:'textarea',required:true},
      {key:'budget_alloue',label:"Budget alloué (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'date_fin',label:"Date de fin",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE MISE EN OEUVRE HUMANITAIRE</h1>
<h2>SOUS-TRAITANCE ONG</h2>
<p>L'ONG principale <strong>{{ong_principale}}</strong> confie à l'ONG de mise en oeuvre <strong>{{ong_mise_en_oeuvre}}</strong> les activités suivantes.</p>
<h3>Article 1 – Activités</h3>
<p>{{activites_sous_traitees}}</p>
<h3>Article 2 – Budget</h3>
<p>Budget alloué : <strong>{{budget_alloue}} FCFA</strong></p>
<h3>Article 3 – Période</h3>
<p>Du {{date_debut}} au {{date_fin}}.</p>
<h3>Article 4 – Rapportage</h3>
<p>L'ONG de mise en oeuvre soumet des rapports narratifs et financiers mensuels à l'ONG principale.</p>
<h3>Article 5 – Audit</h3>
<p>L'ONG principale se réserve le droit de diligenter un audit à tout moment durant la période de mise en oeuvre.</p>
<p>Fait à __________________, le ____________________</p>
<p>L'ONG principale _____________________ L'ONG de mise en oeuvre _____________________</p></div>`
  },
  {
    code: 'hum_aide_alimentaire',
    name: "Accord de Service d'Aide Alimentaire d'Urgence (PAM)",
    category: 'association',
    price: 4000, priceMax: 10000,
    description: "Accord de service d'aide alimentaire d'urgence inspiré des standards PAM, applicable en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 72,
    fieldsJson: F([
      {key:'organisation_executante',label:"Organisation exécutante",type:'text',required:true},
      {key:'zone_distribution',label:"Zone de distribution",type:'text',required:true},
      {key:'nombre_beneficiaires',label:"Nombre de bénéficiaires ciblés",type:'text',required:true},
      {key:'type_assistance',label:"Type d'assistance alimentaire",type:'textarea',required:true},
      {key:'date_debut_distribution',label:"Date de début de distribution",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'AIDE ALIMENTAIRE D'URGENCE</h1>
<h2>PROGRAMME ALIMENTAIRE MONDIAL – MODÈLE PAM</h2>
<p>L'organisation exécutante <strong>{{organisation_executante}}</strong> s'engage à mettre en oeuvre l'aide alimentaire dans la zone <strong>{{zone_distribution}}</strong>.</p>
<h3>Article 1 – Bénéficiaires</h3>
<p>Nombre de bénéficiaires ciblés : <strong>{{nombre_beneficiaires}}</strong></p>
<h3>Article 2 – Type d'assistance</h3>
<p>{{type_assistance}}</p>
<h3>Article 3 – Date de début</h3>
<p>{{date_debut_distribution}}</p>
<h3>Article 4 – Standards</h3>
<p>La distribution respecte les standards SPHERE en matière de sécurité alimentaire et de nutrition.</p>
<h3>Article 5 – Ciblage</h3>
<p>Le ciblage des bénéficiaires est effectué selon des critères de vulnérabilité objectifs et transparents.</p>
<p>Fait à __________________, le ____________________</p>
<p>Organisation exécutante _____________________ Bailleur/Coordinateur _____________________</p></div>`
  },
  {
    code: 'hum_distribution_nfi',
    name: "Accord de Service de Distribution de NFI (Articles Non Alimentaires)",
    category: 'association',
    price: 3500, priceMax: 9000,
    description: "Accord de service pour la distribution d'articles non alimentaires (NFI) dans les situations d'urgence humanitaire.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 65,
    fieldsJson: F([
      {key:'ong_distributrice',label:"ONG chargée de la distribution",type:'text',required:true},
      {key:'liste_nfi',label:"Liste des NFI à distribuer",type:'textarea',required:true},
      {key:'zone_distribution',label:"Zone de distribution",type:'text',required:true},
      {key:'nombre_menages',label:"Nombre de ménages ciblés",type:'text',required:true},
      {key:'date_distribution',label:"Date prévue de distribution",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DISTRIBUTION DE NFI</h1>
<h2>ARTICLES NON ALIMENTAIRES – URGENCE HUMANITAIRE</h2>
<p>L'ONG <strong>{{ong_distributrice}}</strong> est mandatée pour la distribution de NFI dans la zone <strong>{{zone_distribution}}</strong>.</p>
<h3>Article 1 – Articles NFI</h3>
<p>{{liste_nfi}}</p>
<h3>Article 2 – Ménages ciblés</h3>
<p>{{nombre_menages}} ménages bénéficiaires.</p>
<h3>Article 3 – Date de distribution</h3>
<p>{{date_distribution}}</p>
<h3>Article 4 – Vérification</h3>
<p>Un système de vérification (listes de bénéficiaires signées) est mis en place pour garantir la traçabilité de chaque distribution.</p>
<p>Fait à __________________, le ____________________</p>
<p>L'ONG distributrice _____________________ Le coordinateur humanitaire _____________________</p></div>`
  },
  {
    code: 'hum_wash_urgence',
    name: "Accord de Service de WASH en Urgence Humanitaire",
    category: 'association',
    price: 4000, priceMax: 10000,
    description: "Accord de service WASH (Eau, Assainissement et Hygiène) en contexte d'urgence humanitaire en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 70,
    fieldsJson: F([
      {key:'organisation_wash',label:"Organisation WASH",type:'text',required:true},
      {key:'zone_intervention',label:"Zone d'intervention",type:'text',required:true},
      {key:'activites_wash',label:"Activités WASH prévues",type:'textarea',required:true},
      {key:'nombre_beneficiaires',label:"Nombre de bénéficiaires",type:'text',required:true},
      {key:'date_debut',label:"Date de début des activités",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE WASH EN URGENCE HUMANITAIRE</h1>
<h2>EAU – ASSAINISSEMENT – HYGIÈNE</h2>
<p>L'organisation WASH <strong>{{organisation_wash}}</strong> intervient dans la zone <strong>{{zone_intervention}}</strong>.</p>
<h3>Article 1 – Activités WASH</h3>
<p>{{activites_wash}}</p>
<h3>Article 2 – Bénéficiaires</h3>
<p>{{nombre_beneficiaires}} personnes bénéficiaires.</p>
<h3>Article 3 – Date de début</h3>
<p>{{date_debut}}</p>
<h3>Article 4 – Standards techniques</h3>
<p>Toutes les activités WASH respectent les standards SPHERE : minimum 15 litres d'eau potable par personne et par jour, 1 latrine pour 20 personnes.</p>
<p>Fait à __________________, le ____________________</p>
<p>L'organisation WASH _____________________ Le cluster WASH _____________________</p></div>`
  },
  {
    code: 'hum_sante_humanitaire',
    name: "Accord de Service de Santé en Contexte Humanitaire",
    category: 'association',
    price: 4500, priceMax: 11000,
    description: "Accord de service pour la fourniture de soins de santé primaires en situation d'urgence humanitaire.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 73,
    fieldsJson: F([
      {key:'organisation_sante',label:"Organisation de santé",type:'text',required:true},
      {key:'type_services_sante',label:"Types de services de santé",type:'textarea',required:true},
      {key:'zone_couverture',label:"Zone de couverture sanitaire",type:'text',required:true},
      {key:'nombre_consultations',label:"Nombre de consultations cibles/mois",type:'text',required:true},
      {key:'date_debut',label:"Date de début des services",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SANTÉ EN CONTEXTE HUMANITAIRE</h1>
<p>L'organisation <strong>{{organisation_sante}}</strong> fournit des services de santé dans la zone <strong>{{zone_couverture}}</strong>.</p>
<h3>Article 1 – Services</h3>
<p>{{type_services_sante}}</p>
<h3>Article 2 – Cibles</h3>
<p>{{nombre_consultations}} consultations/mois.</p>
<h3>Article 3 – Début des services</h3>
<p>{{date_debut}}</p>
<h3>Article 4 – Protocoles</h3>
<p>Les services respectent les protocoles du Ministère de la Santé et les standards de l'OMS pour les urgences humanitaires.</p>
<h3>Article 5 – Référencement</h3>
<p>Un système de référencement vers les structures hospitalières est mis en place pour les cas dépassant les capacités de la structure.</p>
<p>Fait à __________________, le ____________________</p>
<p>L'organisation de santé _____________________ Le cluster Santé _____________________</p></div>`
  },
  {
    code: 'hum_abris_urgence',
    name: "Accord de Service d'Abris d'Urgence et Reconstruction",
    category: 'association',
    price: 4000, priceMax: 10000,
    description: "Accord de service pour la mise en place d'abris d'urgence et la reconstruction post-crise en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 61,
    fieldsJson: F([
      {key:'organisation_abris',label:"Organisation en charge des abris",type:'text',required:true},
      {key:'type_abris',label:"Type d'abris (tentes, kits shelter, etc.)",type:'text',required:true},
      {key:'nombre_abris',label:"Nombre d'abris à mettre en place",type:'text',required:true},
      {key:'zone_intervention',label:"Zone d'intervention",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ABRIS D'URGENCE ET RECONSTRUCTION</h1>
<p>L'organisation <strong>{{organisation_abris}}</strong> est responsable de la mise en place des abris dans la zone <strong>{{zone_intervention}}</strong>.</p>
<h3>Article 1 – Type d'abris</h3>
<p><strong>{{type_abris}}</strong> – Quantité : {{nombre_abris}}</p>
<h3>Article 2 – Date de début</h3>
<p>{{date_debut}}</p>
<h3>Article 3 – Standards</h3>
<p>Les abris respectent les standards SPHERE : minimum 3,5 m² par personne pour les abris d'urgence.</p>
<h3>Article 4 – Participation communautaire</h3>
<p>Les bénéficiaires sont associés à la mise en place des abris dans la mesure du possible afin de renforcer l'appropriation.</p>
<p>Fait à __________________, le ____________________</p>
<p>L'organisation _____________________ Le cluster Abris _____________________</p></div>`
  },
  {
    code: 'hum_protection_deplaces',
    name: "Accord de Service de Protection des Personnes Déplacées",
    category: 'association',
    price: 4500, priceMax: 11000,
    description: "Accord de service pour la protection des personnes déplacées internes et réfugiés en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 69,
    fieldsJson: F([
      {key:'organisation_protection',label:"Organisation de protection",type:'text',required:true},
      {key:'population_cible',label:"Population cible (PDI, réfugiés, etc.)",type:'text',required:true},
      {key:'activites_protection',label:"Activités de protection",type:'textarea',required:true},
      {key:'zone_intervention',label:"Zone d'intervention",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PROTECTION DES PERSONNES DÉPLACÉES</h1>
<p>L'organisation <strong>{{organisation_protection}}</strong> assure la protection de <strong>{{population_cible}}</strong> dans la zone <strong>{{zone_intervention}}</strong>.</p>
<h3>Article 1 – Activités</h3>
<p>{{activites_protection}}</p>
<h3>Article 2 – Date de début</h3>
<p>{{date_debut}}</p>
<h3>Article 3 – Principes directeurs</h3>
<p>Les activités respectent les Principes directeurs relatifs au déplacement de personnes à l'intérieur de leur propre pays (ONU, 1998).</p>
<h3>Article 4 – Do No Harm</h3>
<p>L'organisation applique le principe "Ne pas nuire" dans toutes ses interventions auprès des populations déplacées.</p>
<p>Fait à __________________, le ____________________</p>
<p>L'organisation de protection _____________________ Le cluster Protection _____________________</p></div>`
  },
  {
    code: 'hum_protection_enfance',
    name: "Accord de Service de Protection de l'Enfance en Urgence",
    category: 'association',
    price: 4500, priceMax: 11000,
    description: "Accord de service pour la protection des enfants dans les situations d'urgence humanitaire en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 77,
    fieldsJson: F([
      {key:'organisation_pe',label:"Organisation de protection de l'enfance",type:'text',required:true},
      {key:'services_pe',label:"Services de protection de l'enfance",type:'textarea',required:true},
      {key:'nombre_enfants',label:"Nombre d'enfants cibles",type:'text',required:true},
      {key:'zone_intervention',label:"Zone d'intervention",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PROTECTION DE L'ENFANCE EN URGENCE</h1>
<p>L'organisation <strong>{{organisation_pe}}</strong> intervient au profit de <strong>{{nombre_enfants}}</strong> enfants dans la zone <strong>{{zone_intervention}}</strong>.</p>
<h3>Article 1 – Services</h3>
<p>{{services_pe}}</p>
<h3>Article 2 – Début</h3>
<p>{{date_debut}}</p>
<h3>Article 3 – Convention relative aux droits de l'enfant</h3>
<p>Toutes les activités respectent les dispositions de la Convention relative aux droits de l'enfant et la politique de sauvegarde de l'enfance.</p>
<h3>Article 4 – Espaces amis des enfants</h3>
<p>Des espaces amis des enfants sont mis en place pour offrir un soutien psychosocial et des activités éducatives.</p>
<p>Fait à __________________, le ____________________</p>
<p>L'organisation _____________________ Le sous-cluster PE _____________________</p></div>`
  },
  {
    code: 'hum_vbg',
    name: "Accord de Service de Violences Basées sur le Genre (VBG)",
    category: 'association',
    price: 4500, priceMax: 11000,
    description: "Accord de service pour la prévention et la réponse aux violences basées sur le genre en situation d'urgence.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 74,
    fieldsJson: F([
      {key:'organisation_vbg',label:"Organisation de réponse VBG",type:'text',required:true},
      {key:'services_vbg',label:"Services de prévention et réponse VBG",type:'textarea',required:true},
      {key:'zone_intervention',label:"Zone d'intervention",type:'text',required:true},
      {key:'nombre_survivantes',label:"Nombre de survivant(e)s cibles",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE VIOLENCES BASÉES SUR LE GENRE (VBG)</h1>
<p>L'organisation <strong>{{organisation_vbg}}</strong> assure la réponse VBG dans la zone <strong>{{zone_intervention}}</strong>.</p>
<h3>Article 1 – Services</h3>
<p>{{services_vbg}}</p>
<h3>Article 2 – Personnes ciblées</h3>
<p>{{nombre_survivantes}} survivant(e)s de VBG.</p>
<h3>Article 3 – Début</h3>
<p>{{date_debut}}</p>
<h3>Article 4 – Confidentialité et sécurité</h3>
<p>La confidentialité absolue est garantie pour toutes les survivantes. Le principe de sécurité prime sur toute autre considération.</p>
<h3>Article 5 – Approche centrée sur la survivante</h3>
<p>Toutes les interventions adoptent une approche centrée sur la survivante, fondée sur le respect, la non-discrimination et l'autonomisation.</p>
<p>Fait à __________________, le ____________________</p>
<p>L'organisation VBG _____________________ Le sous-cluster VBG _____________________</p></div>`
  },
  {
    code: 'hum_reintegration_refugies',
    name: "Accord de Service de Réintégration des Réfugiés",
    category: 'association',
    price: 4000, priceMax: 10000,
    description: "Accord de service pour l'appui à la réintégration durable des réfugiés et retournés en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 62,
    fieldsJson: F([
      {key:'organisation_reintegration',label:"Organisation de réintégration",type:'text',required:true},
      {key:'activites_reintegration',label:"Activités de réintégration",type:'textarea',required:true},
      {key:'zone_retour',label:"Zone de retour",type:'text',required:true},
      {key:'nombre_beneficiaires',label:"Nombre de bénéficiaires",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RÉINTÉGRATION DES RÉFUGIÉS</h1>
<p>L'organisation <strong>{{organisation_reintegration}}</strong> appuie la réintégration dans la zone <strong>{{zone_retour}}</strong>.</p>
<h3>Article 1 – Activités</h3>
<p>{{activites_reintegration}}</p>
<h3>Article 2 – Bénéficiaires</h3>
<p>{{nombre_beneficiaires}} personnes.</p>
<h3>Article 3 – Début</h3>
<p>{{date_debut}}</p>
<h3>Article 4 – Approche communautaire</h3>
<p>La réintégration implique les communautés d'accueil afin de favoriser la coexistence pacifique et la cohésion sociale.</p>
<p>Fait à __________________, le ____________________</p>
<p>L'organisation _____________________ Le HCR / partenaire _____________________</p></div>`
  },
  {
    code: 'hum_soutien_psychosocial',
    name: "Accord de Service d'Appui Psychosocial en Urgence",
    category: 'association',
    price: 3500, priceMax: 9000,
    description: "Accord de service pour la fourniture d'appui psychosocial aux populations affectées par une crise humanitaire.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 66,
    fieldsJson: F([
      {key:'organisation_pss',label:"Organisation de soutien psychosocial",type:'text',required:true},
      {key:'activites_pss',label:"Activités psychosociales",type:'textarea',required:true},
      {key:'population_cible',label:"Population cible",type:'text',required:true},
      {key:'zone_intervention',label:"Zone d'intervention",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'APPUI PSYCHOSOCIAL EN URGENCE</h1>
<p>L'organisation <strong>{{organisation_pss}}</strong> fournit un soutien psychosocial à <strong>{{population_cible}}</strong> dans la zone <strong>{{zone_intervention}}</strong>.</p>
<h3>Article 1 – Activités</h3>
<p>{{activites_pss}}</p>
<h3>Article 2 – Début</h3>
<p>{{date_debut}}</p>
<h3>Article 3 – Pyramide MHPSS</h3>
<p>Les activités s'inscrivent dans l'approche pyramidale MHPSS (Mental Health and Psychosocial Support) de l'IASC.</p>
<h3>Article 4 – Orientation</h3>
<p>Un mécanisme d'orientation vers des services de santé mentale spécialisés est mis en place pour les cas nécessitant une prise en charge clinique.</p>
<p>Fait à __________________, le ____________________</p>
<p>L'organisation _____________________ Le cluster Protection _____________________</p></div>`
  },
  {
    code: 'hum_coordination_cluster',
    name: "Accord de Service de Coordination Humanitaire (Cluster)",
    category: 'association',
    price: 4000, priceMax: 10000,
    description: "Accord de service pour la coordination humanitaire au sein d'un cluster sectoriel en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 58,
    fieldsJson: F([
      {key:'agence_cheffe_file',label:"Agence cheffe de file du cluster",type:'text',required:true},
      {key:'secteur_cluster',label:"Secteur du cluster",type:'text',required:true},
      {key:'organisations_membres',label:"Organisations membres du cluster",type:'textarea',required:true},
      {key:'objectifs_coordination',label:"Objectifs de coordination",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début de coordination",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE COORDINATION HUMANITAIRE</h1>
<h2>SYSTÈME CLUSTER – APPROCHE CLUSTERISÉE</h2>
<p>L'agence cheffe de file <strong>{{agence_cheffe_file}}</strong> coordonne le cluster <strong>{{secteur_cluster}}</strong>.</p>
<h3>Article 1 – Membres du cluster</h3>
<p>{{organisations_membres}}</p>
<h3>Article 2 – Objectifs de coordination</h3>
<p>{{objectifs_coordination}}</p>
<h3>Article 3 – Date de début</h3>
<p>{{date_debut}}</p>
<h3>Article 4 – Mécanismes</h3>
<p>Le cluster se réunit mensuellement pour partager les informations, éviter les doublons et assurer une couverture optimale des besoins humanitaires.</p>
<p>Fait à Abidjan, le ____________________</p>
<p>L'agence cheffe de file _____________________</p></div>`
  },
  {
    code: 'hum_gestion_camp',
    name: "Accord de Service de Gestion d'un Camp de Réfugiés",
    category: 'association',
    price: 5000, priceMax: 12000,
    description: "Accord de service pour la gestion et la coordination d'un camp de réfugiés ou de déplacés internes.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 63,
    fieldsJson: F([
      {key:'organisation_gestionnaire',label:"Organisation gestionnaire du camp",type:'text',required:true},
      {key:'nom_camp',label:"Nom ou localisation du camp",type:'text',required:true},
      {key:'capacite_accueil',label:"Capacité d'accueil (personnes)",type:'text',required:true},
      {key:'services_geres',label:"Services gérés dans le camp",type:'textarea',required:true},
      {key:'date_ouverture',label:"Date d'ouverture du camp",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GESTION DE CAMP</h1>
<h2>CAMP DE RÉFUGIÉS / DÉPLACÉS INTERNES</h2>
<p>L'organisation <strong>{{organisation_gestionnaire}}</strong> gère le camp <strong>{{nom_camp}}</strong>.</p>
<h3>Article 1 – Capacité</h3>
<p>Capacité d'accueil : <strong>{{capacite_accueil}} personnes</strong></p>
<h3>Article 2 – Services</h3>
<p>{{services_geres}}</p>
<h3>Article 3 – Ouverture</h3>
<p>{{date_ouverture}}</p>
<h3>Article 4 – Gestion participative</h3>
<p>Un comité de résidents représentatif est mis en place pour assurer la participation des déplacés à la gestion du camp.</p>
<h3>Article 5 – Protection</h3>
<p>L'organisation garantit la sécurité de tous les résidents et met en place des mécanismes de gestion des plaintes accessibles.</p>
<p>Fait à __________________, le ____________________</p>
<p>L'organisation gestionnaire _____________________ Le CCCM cluster _____________________</p></div>`
  },
  {
    code: 'hum_logistique_humanitaire',
    name: "Accord de Service de Logistique Humanitaire",
    category: 'association',
    price: 4000, priceMax: 10000,
    description: "Accord de service logistique pour le transport et la distribution de l'aide humanitaire en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 67,
    fieldsJson: F([
      {key:'prestataire_logistique',label:"Prestataire logistique",type:'text',required:true},
      {key:'ong_cliente',label:"ONG cliente",type:'text',required:true},
      {key:'types_services_logistiques',label:"Types de services logistiques",type:'textarea',required:true},
      {key:'zone_operations',label:"Zone des opérations",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE LOGISTIQUE HUMANITAIRE</h1>
<p>Le prestataire <strong>{{prestataire_logistique}}</strong> et l'ONG <strong>{{ong_cliente}}</strong> concluent cet accord.</p>
<h3>Article 1 – Services logistiques</h3>
<p>{{types_services_logistiques}}</p>
<h3>Article 2 – Zone d'opérations</h3>
<p>{{zone_operations}}</p>
<h3>Article 3 – Début</h3>
<p>{{date_debut}}</p>
<h3>Article 4 – Traçabilité</h3>
<p>Le prestataire assure la traçabilité complète des marchandises humanitaires (waybill, reporting de livraison) conformément aux exigences des bailleurs.</p>
<p>Fait à __________________, le ____________________</p>
<p>Le prestataire logistique _____________________ L'ONG cliente _____________________</p></div>`
  },
  {
    code: 'hum_financement_cerf_dref',
    name: "Accord de Service de Financement Humanitaire (CERF/DREF)",
    category: 'association',
    price: 5000, priceMax: 12000,
    description: "Accord de service pour la gestion de financements humanitaires d'urgence (CERF ou DREF) en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 56,
    fieldsJson: F([
      {key:'organisation_destinataire',label:"Organisation destinataire du financement",type:'text',required:true},
      {key:'mecanisme_financement',label:"Mécanisme de financement (CERF/DREF)",type:'text',required:true},
      {key:'montant_finance',label:"Montant financé (USD)",type:'text',required:true},
      {key:'secteur_intervention',label:"Secteur d'intervention",type:'text',required:true},
      {key:'date_debut',label:"Date de début du projet",type:'date',required:true},
      {key:'date_fin',label:"Date de fin du projet",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FINANCEMENT HUMANITAIRE</h1>
<h2>{{mecanisme_financement}}</h2>
<p>L'organisation <strong>{{organisation_destinataire}}</strong> reçoit un financement humanitaire d'urgence.</p>
<h3>Article 1 – Montant</h3>
<p><strong>{{montant_finance}} USD</strong></p>
<h3>Article 2 – Secteur</h3>
<p>{{secteur_intervention}}</p>
<h3>Article 3 – Période</h3>
<p>Du {{date_debut}} au {{date_fin}}.</p>
<h3>Article 4 – Conditions de décaissement</h3>
<p>Le décaissement est conditionné à la soumission d'un plan d'action détaillé et d'un budget approuvé par le mécanisme de financement.</p>
<h3>Article 5 – Rapport final</h3>
<p>Un rapport final narratif et financier est soumis dans les 30 jours suivant la clôture du projet.</p>
<p>Fait à __________________, le ____________________</p>
<p>L'organisation bénéficiaire _____________________ Le mécanisme de financement _____________________</p></div>`
  },
  {
    code: 'hum_reporting_bailleurs',
    name: "Accord de Service de Reporting Bailleurs Humanitaires (OCHA)",
    category: 'association',
    price: 3500, priceMax: 8500,
    description: "Accord définissant les exigences de reporting humanitaire envers les bailleurs conformément aux standards OCHA.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 54,
    fieldsJson: F([
      {key:'organisation_rapporteuse',label:"Organisation rapporteuse",type:'text',required:true},
      {key:'bailleur_humanitaire',label:"Bailleur humanitaire",type:'text',required:true},
      {key:'frequence_rapports',label:"Fréquence des rapports",type:'text',required:true},
      {key:'indicateurs_cles',label:"Indicateurs clés de performance",type:'textarea',required:true},
      {key:'date_premier_rapport',label:"Date du premier rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE REPORTING HUMANITAIRE</h1>
<h2>STANDARDS OCHA – REPORTING BAILLEURS</h2>
<p>Entre <strong>{{organisation_rapporteuse}}</strong> (rapporteuse) et <strong>{{bailleur_humanitaire}}</strong> (bailleur).</p>
<h3>Article 1 – Fréquence</h3>
<p>Rapports <strong>{{frequence_rapports}}</strong></p>
<h3>Article 2 – Indicateurs</h3>
<p>{{indicateurs_cles}}</p>
<h3>Article 3 – Premier rapport</h3>
<p>{{date_premier_rapport}}</p>
<h3>Article 4 – Format</h3>
<p>Les rapports sont soumis dans le format standard requis par le bailleur, incluant données quantitatives, analyse qualitative et photographies.</p>
<h3>Article 5 – 3W</h3>
<p>Les informations 3W (Qui fait Quoi Où) sont partagées régulièrement avec OCHA pour la coordination humanitaire.</p>
<p>Fait à __________________, le ____________________</p>
<p>L'organisation _____________________ Le bailleur _____________________</p></div>`
  },
  {
    code: 'hum_redevabilite_populations',
    name: "Accord de Service de Redevabilité envers les Populations (AAP)",
    category: 'association',
    price: 3000, priceMax: 8000,
    description: "Accord établissant les mécanismes de redevabilité envers les populations affectées dans les opérations humanitaires.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 60,
    fieldsJson: F([
      {key:'organisation_humanitaire',label:"Organisation humanitaire",type:'text',required:true},
      {key:'mecanismes_feedback',label:"Mécanismes de feedback prévus",type:'textarea',required:true},
      {key:'mecanismes_plaintes',label:"Mécanismes de gestion des plaintes",type:'textarea',required:true},
      {key:'zone_intervention',label:"Zone d'intervention",type:'text',required:true},
      {key:'date_mise_en_oeuvre',label:"Date de mise en oeuvre",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE REDEVABILITÉ ENVERS LES POPULATIONS (AAP)</h1>
<h2>ACCOUNTABILITY TO AFFECTED POPULATIONS</h2>
<p>L'organisation <strong>{{organisation_humanitaire}}</strong> s'engage à mettre en place des mécanismes AAP dans la zone <strong>{{zone_intervention}}</strong>.</p>
<h3>Article 1 – Mécanismes de feedback</h3>
<p>{{mecanismes_feedback}}</p>
<h3>Article 2 – Mécanismes de plaintes</h3>
<p>{{mecanismes_plaintes}}</p>
<h3>Article 3 – Mise en oeuvre</h3>
<p>{{date_mise_en_oeuvre}}</p>
<h3>Article 4 – Engagement</h3>
<p>L'organisation s'engage à intégrer les retours des populations dans l'adaptation de ses programmes humanitaires.</p>
<p>Fait à __________________, le ____________________</p>
<p>L'organisation humanitaire _____________________</p></div>`
  },
  {
    code: 'hum_gestion_donnees_hdx',
    name: "Accord de Service de Gestion de Données Humanitaires (HDX)",
    category: 'association',
    price: 3500, priceMax: 9000,
    description: "Accord de service pour la gestion et le partage de données humanitaires via les plateformes HDX/OCHA.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 50,
    fieldsJson: F([
      {key:'organisation_productrice',label:"Organisation productrice de données",type:'text',required:true},
      {key:'types_donnees',label:"Types de données humanitaires",type:'textarea',required:true},
      {key:'plateforme_partage',label:"Plateforme de partage (HDX, ReliefWeb, etc.)",type:'text',required:true},
      {key:'frequence_mise_a_jour',label:"Fréquence de mise à jour des données",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE GESTION DE DONNÉES HUMANITAIRES</h1>
<h2>HUMANITARIAN DATA EXCHANGE (HDX)</h2>
<p>L'organisation <strong>{{organisation_productrice}}</strong> s'engage à partager ses données humanitaires sur <strong>{{plateforme_partage}}</strong>.</p>
<h3>Article 1 – Types de données</h3>
<p>{{types_donnees}}</p>
<h3>Article 2 – Fréquence de mise à jour</h3>
<p>{{frequence_mise_a_jour}}</p>
<h3>Article 3 – Début</h3>
<p>{{date_debut}}</p>
<h3>Article 4 – Protection des données</h3>
<p>Les données sensibles sont anonymisées avant publication. Les principes de protection des données humanitaires du CICR sont respectés.</p>
<p>Fait à __________________, le ____________________</p>
<p>L'organisation _____________________ Le gestionnaire de données _____________________</p></div>`
  },
  {
    code: 'hum_partenariat_ong_int_nat',
    name: "Accord de Partenariat ONG Internationale-ONG Nationale",
    category: 'association',
    price: 4500, priceMax: 11000,
    description: "Accord de partenariat stratégique entre une ONG internationale et une ONG nationale ivoirienne.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 71,
    fieldsJson: F([
      {key:'ong_internationale',label:"ONG internationale",type:'text',required:true},
      {key:'ong_nationale',label:"ONG nationale ivoirienne",type:'text',required:true},
      {key:'domaines_partenariat',label:"Domaines de partenariat",type:'textarea',required:true},
      {key:'apports_ong_int',label:"Apports de l'ONG internationale",type:'textarea',required:true},
      {key:'apports_ong_nat',label:"Apports de l'ONG nationale",type:'textarea',required:true},
      {key:'duree_partenariat',label:"Durée du partenariat",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT ONG INTERNATIONALE – ONG NATIONALE</h1>
<p>Entre <strong>{{ong_internationale}}</strong> et <strong>{{ong_nationale}}</strong>.</p>
<h3>Article 1 – Domaines de partenariat</h3>
<p>{{domaines_partenariat}}</p>
<h3>Article 2 – Apports de l'ONG internationale</h3>
<p>{{apports_ong_int}}</p>
<h3>Article 3 – Apports de l'ONG nationale</h3>
<p>{{apports_ong_nat}}</p>
<h3>Article 4 – Durée</h3>
<p>{{duree_partenariat}}</p>
<h3>Article 5 – Localisation</h3>
<p>Les parties s'engagent en faveur de la localisation de l'aide humanitaire et du renforcement des capacités de l'ONG nationale.</p>
<p>Fait à Abidjan, le ____________________</p>
<p>L'ONG internationale _____________________ L'ONG nationale _____________________</p></div>`
  },
  {
    code: 'hum_cash_transfer',
    name: "Accord de Transfert Monétaire Humanitaire (Cash Transfer)",
    category: 'association',
    price: 4000, priceMax: 10000,
    description: "Accord de service pour la mise en oeuvre de programmes de transferts monétaires humanitaires en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 69,
    fieldsJson: F([
      {key:'organisation_mise_en_oeuvre',label:"Organisation de mise en oeuvre",type:'text',required:true},
      {key:'modalite_transfert',label:"Modalité de transfert (mobile money, voucher, cash)",type:'text',required:true},
      {key:'montant_transfert',label:"Montant du transfert par ménage (FCFA)",type:'text',required:true},
      {key:'nombre_menages',label:"Nombre de ménages bénéficiaires",type:'text',required:true},
      {key:'date_debut_transferts',label:"Date de début des transferts",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE TRANSFERT MONÉTAIRE HUMANITAIRE</h1>
<h2>CASH TRANSFER PROGRAMMING (CTP)</h2>
<p>L'organisation <strong>{{organisation_mise_en_oeuvre}}</strong> met en oeuvre un programme de transfert monétaire.</p>
<h3>Article 1 – Modalité</h3>
<p><strong>{{modalite_transfert}}</strong></p>
<h3>Article 2 – Montant et bénéficiaires</h3>
<p>{{montant_transfert}} FCFA par ménage pour {{nombre_menages}} ménages.</p>
<h3>Article 3 – Début des transferts</h3>
<p>{{date_debut_transferts}}</p>
<h3>Article 4 – Ciblage et enregistrement</h3>
<p>Le ciblage utilise des critères de vulnérabilité validés et l'enregistrement biométrique garantit l'unicité des bénéficiaires.</p>
<h3>Article 5 – Suivi post-distribution</h3>
<p>Un suivi post-distribution est effectué pour évaluer l'utilisation des fonds et l'impact sur les ménages bénéficiaires.</p>
<p>Fait à __________________, le ____________________</p>
<p>L'organisation _____________________ Le bailleur _____________________</p></div>`
  },
  {
    code: 'hum_sitrep',
    name: "Rapport de Situation Humanitaire (SitRep)",
    category: 'association',
    price: 2500, priceMax: 6000,
    description: "Modèle de rapport de situation humanitaire (SitRep) pour les acteurs humanitaires en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 64,
    fieldsJson: F([
      {key:'organisation_rapporteuse',label:"Organisation rapporteuse",type:'text',required:true},
      {key:'date_situation',label:"Date de la situation",type:'date',required:true},
      {key:'resume_situation',label:"Résumé de la situation",type:'textarea',required:true},
      {key:'besoins_identifies',label:"Besoins humanitaires identifiés",type:'textarea',required:true},
      {key:'reponse_en_cours',label:"Réponse humanitaire en cours",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE SITUATION HUMANITAIRE</h1>
<h2>SITREP – {{organisation_rapporteuse}}</h2>
<h3>Date : {{date_situation}}</h3>
<h3>1. Résumé de la situation</h3>
<p>{{resume_situation}}</p>
<h3>2. Besoins humanitaires</h3>
<p>{{besoins_identifies}}</p>
<h3>3. Réponse en cours</h3>
<p>{{reponse_en_cours}}</p>
<h3>4. Gaps et priorités</h3>
<p>Les gaps identifiés sont soumis au Coordinateur humanitaire pour mobilisation de ressources additionnelles.</p>
<h3>5. Prochaines étapes</h3>
<p>Le prochain SitRep sera publié dans 72 heures ou selon l'évolution de la situation.</p>
<p>Préparé par : _____________________ Chef de mission _____________________</p></div>`
  },
  {
    code: 'hum_plan_reponse',
    name: "Plan de Réponse Humanitaire (HRP)",
    category: 'association',
    price: 5000, priceMax: 12000,
    description: "Modèle de plan de réponse humanitaire (HRP) pour la planification stratégique des opérations humanitaires.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 57,
    fieldsJson: F([
      {key:'pays_contexte',label:"Pays et contexte de la crise",type:'text',required:true},
      {key:'periode_hrp',label:"Période couverte par le HRP",type:'text',required:true},
      {key:'population_dans_besoin',label:"Population dans le besoin (PIN)",type:'text',required:true},
      {key:'objectif_strategique',label:"Objectif stratégique humanitaire",type:'textarea',required:true},
      {key:'budget_requis',label:"Budget total requis (USD)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE RÉPONSE HUMANITAIRE</h1>
<h2>HUMANITARIAN RESPONSE PLAN (HRP) – {{pays_contexte}}</h2>
<h3>Période : {{periode_hrp}}</h3>
<h3>Population dans le besoin (PIN)</h3>
<p><strong>{{population_dans_besoin}} personnes</strong></p>
<h3>Objectif stratégique</h3>
<p>{{objectif_strategique}}</p>
<h3>Budget requis</h3>
<p><strong>{{budget_requis}} USD</strong></p>
<h3>Approche sectorielle</h3>
<p>Le HRP est structuré autour des clusters humanitaires : Alimentation, Santé, WASH, Abris, Protection, Éducation, Nutrition.</p>
<h3>Principes directeurs</h3>
<p>Toutes les interventions respectent les principes humanitaires fondamentaux d'humanité, neutralité, impartialité et indépendance.</p>
<p>Approuvé par le Coordinateur humanitaire _____________________</p></div>`
  },
  {
    code: 'hum_formation_sphere',
    name: "Accord de Service de Formation aux Standards SPHERE",
    category: 'association',
    price: 3500, priceMax: 9000,
    description: "Accord de service pour la formation des acteurs humanitaires aux standards SPHERE en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 55,
    fieldsJson: F([
      {key:'organisme_formateur',label:"Organisme formateur",type:'text',required:true},
      {key:'organisation_participante',label:"Organisation participante",type:'text',required:true},
      {key:'modules_sphere',label:"Modules SPHERE couverts",type:'textarea',required:true},
      {key:'nombre_participants',label:"Nombre de participants",type:'text',required:true},
      {key:'date_formation',label:"Date de la formation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FORMATION AUX STANDARDS SPHERE</h1>
<p>L'organisme formateur <strong>{{organisme_formateur}}</strong> et l'organisation <strong>{{organisation_participante}}</strong> concluent cet accord.</p>
<h3>Article 1 – Modules SPHERE</h3>
<p>{{modules_sphere}}</p>
<h3>Article 2 – Participants</h3>
<p>{{nombre_participants}} participants.</p>
<h3>Article 3 – Date</h3>
<p>{{date_formation}}</p>
<h3>Article 4 – Certification</h3>
<p>Les participants recevront une attestation de participation à la formation SPHERE et seront habilités à appliquer ces standards dans leurs opérations.</p>
<p>Fait à __________________, le ____________________</p>
<p>L'organisme formateur _____________________ L'organisation participante _____________________</p></div>`
  },
  {
    code: 'hum_charte_humanitaire',
    name: "Charte Humanitaire et Principes Humanitaires (CICR)",
    category: 'association',
    price: 2000, priceMax: 5500,
    description: "Charte et engagement sur les principes humanitaires fondamentaux inspirés des standards CICR et SPHERE.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 76,
    fieldsJson: F([
      {key:'nom_organisation',label:"Nom de l'organisation humanitaire",type:'text',required:true},
      {key:'zone_operations',label:"Zone d'opérations",type:'text',required:true},
      {key:'engagements_specifiques',label:"Engagements spécifiques de l'organisation",type:'textarea',required:true},
      {key:'date_adoption',label:"Date d'adoption de la charte",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE HUMANITAIRE ET PRINCIPES HUMANITAIRES</h1>
<h2>{{nom_organisation}}</h2>
<h3>Préambule</h3>
<p>L'organisation <strong>{{nom_organisation}}</strong> opérant dans la zone <strong>{{zone_operations}}</strong> adopte la présente charte humanitaire.</p>
<h3>Les quatre principes humanitaires fondamentaux</h3>
<p><strong>1. Humanité :</strong> La souffrance humaine doit être traitée où qu'elle se trouve. L'objectif est de protéger la vie et la santé et d'assurer le respect des êtres humains.</p>
<p><strong>2. Neutralité :</strong> L'organisation ne prend pas parti dans les hostilités ni dans les controverses d'ordre politique, racial, religieux ou idéologique.</p>
<p><strong>3. Impartialité :</strong> L'action humanitaire est menée sur la seule base du besoin, sans discrimination entre nationalités, races, religions, conditions sociales ou appartenances politiques.</p>
<p><strong>4. Indépendance :</strong> L'organisation maintient son autonomie par rapport aux autorités politiques, économiques, militaires ou autres.</p>
<h3>Engagements spécifiques</h3>
<p>{{engagements_specifiques}}</p>
<h3>Droit international humanitaire</h3>
<p>L'organisation respecte le droit international humanitaire, les Conventions de Genève et leurs Protocoles additionnels dans toutes ses opérations.</p>
<p>Adopté le {{date_adoption}}</p>
<p>La direction de l'organisation _____________________</p></div>`
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
  console.log(`Batch 83a OK — créés:${created} maj:${updated} TOTAL:${total}`);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
