// Données sectorielles injectées dans les prompts Pro et Expert.
// Une entrée par catégorie du catalogue : réglementation applicable, institutions
// clés, repères de marché (ordres de grandeur FCFA, zone UEMOA sauf mention) et
// usages professionnels. Ces repères ancrent les documents dans la réalité du
// terrain africain au lieu de généralités.

export interface SectorData {
  reglementation: string[];
  institutions: string[];
  reperes: string[];
  usages: string[];
}

export const SECTOR_DATA: Record<string, SectorData> = {
  commercial: {
    reglementation: [
      'AUDCG OHADA (Acte uniforme droit commercial général, révisé 15/12/2010) : statut du commerçant, bail commercial, fonds de commerce, intermédiaires',
      "Immatriculation RCCM obligatoire avant tout acte de commerce",
      'TVA 18 % (UEMOA) / 19,25 % (Cameroun) ; retenue à la source sur prestations selon CGI local',
    ],
    institutions: ['CCI locale (chambre de commerce)', 'CEPICI (CI) / APIX (SN) pour les formalités', 'Tribunal de commerce', 'CCJA Abidjan pour l’arbitrage'],
    reperes: [
      'Délais de paiement B2B usuels : 30 à 60 jours, pénalités de retard 1 à 1,5 %/mois',
      'Commission d’agent commercial usuelle : 3 à 10 % du CA apporté selon secteur',
      'Remises distributeurs usuelles : 15 à 35 % sur prix public',
    ],
    usages: ['Acompte de 30 à 50 % à la commande dans le négoce', 'Clause de réserve de propriété fréquente jusqu’au paiement intégral'],
  },
  juridique_admin: {
    reglementation: [
      'Actes uniformes OHADA applicables selon l’objet : AUDCG (commerce), AUSCGIE (sociétés), AUS (sûretés), AUPSRVE (recouvrement)',
      'Droit civil et procédures : codes nationaux (Code civil, Code de procédure civile locaux)',
      'Enregistrement des actes : droits fixes ou proportionnels selon CGI local (souvent 18 000 FCFA fixe ou 1 à 10 %)',
    ],
    institutions: ['Notaires et huissiers près les tribunaux', 'Conservation foncière (actes immobiliers)', 'CCJA (arbitrage OHADA)', 'Barreaux nationaux'],
    reperes: [
      'Honoraires notariés usuels : barème dégressif ~1 à 4 % de la valeur de l’acte',
      'Délai moyen d’une procédure commerciale de première instance : 6 à 18 mois',
      'Injonction de payer AUPSRVE : requête au président du tribunal, opposition sous 15 jours',
    ],
    usages: ['Légalisation des signatures en mairie courante pour les actes sous seing privé', 'Quatre exemplaires originaux d’usage pour les actes enregistrés'],
  },
  rh_emploi: {
    reglementation: [
      'Code du travail national (CI : loi n°2015-532 ; SN : loi n°97-17 ; CM : loi n°92/007)',
      'CDD : durée et renouvellements plafonnés (CI : 2 ans renouvellements compris) ; au-delà, requalification en CDI',
      'CNPS/IPRES/CNSS : déclaration sous 8 jours à l’embauche ; cotisations patronales ~15-18 %, salariales ~6 %',
    ],
    institutions: ['Inspection du travail (visa de certains contrats)', 'CNPS (CI), IPRES/CSS (SN), CNPS (CM)', 'AGEPE/emploi jeunes', 'Tribunaux du travail'],
    reperes: [
      'SMIG : CI 75 000 FCFA/mois (2023), SN ~64 000, CM 60 000 ; cadres débutants 150 000-350 000, cadres confirmés 400 000-1 200 000',
      'Période d’essai usuelle : ouvriers 8 jours à 1 mois, agents de maîtrise 2-3 mois, cadres 3-6 mois',
      'Préavis usuels : 8 jours à 4 mois selon catégorie et ancienneté ; indemnité de licenciement ~30 %/35 %/40 % du salaire mensuel moyen par année selon tranche',
    ],
    usages: ['13e mois répandu mais non obligatoire sauf convention collective', 'Prime de transport et de logement usuelles dans les packages cadres'],
  },
  communication: {
    reglementation: [
      'Régulation des communications : HACA (CI), CNRA (SN), CNC (CM) pour l’audiovisuel',
      'Droit d’auteur : accords de Bangui (OAPI) ; BURIDA (CI), BSDA/SODAV (SN) pour la gestion collective',
      'Publicité : interdictions sectorielles (tabac, alcool encadré), mentions obligatoires',
    ],
    institutions: ['OAPI (propriété intellectuelle, Yaoundé)', 'BURIDA/SODAV (droits d’auteur)', 'Conseils de régulation de la publicité'],
    reperes: [
      'Budget campagne 360° PME : 5 à 50 M FCFA ; spot radio national : 50 000-300 000 FCFA/diffusion ; affichage 12 m² Abidjan/Dakar : 250 000-600 000 FCFA/mois',
      'Community management PME : 150 000-500 000 FCFA/mois ; production vidéo corporate : 1 à 10 M FCFA',
      'Taux d’engagement moyen réseaux sociaux Afrique de l’Ouest : 2-5 % ; pénétration mobile > 100 %, internet ~40-60 %',
    ],
    usages: ['Cession des droits sur les créations à préciser expressément (support, durée, territoire)', 'Facturation 50 % à la commande, 50 % à la livraison'],
  },
  comptabilite_audit: {
    reglementation: [
      'SYSCOHADA révisé (en vigueur 01/01/2018) : plan comptable, états financiers annuels (bilan, compte de résultat, TAFIRE, notes)',
      'AUDCIF OHADA : obligations comptables des entreprises ; seuils du système minimal de trésorerie',
      'Commissariat aux comptes obligatoire selon seuils AUSCGIE (SA toujours ; SARL si capital > 10 M ou CA > 250 M ou effectif > 50)',
    ],
    institutions: ['Ordres des experts-comptables nationaux (OECCA-CI…)', 'CNCC locaux', 'DGI (administration fiscale)', 'CREPMF pour les sociétés cotées BRVM'],
    reperes: [
      'Honoraires tenue comptable PME : 100 000-500 000 FCFA/mois ; mission d’audit légal PME : 2 à 15 M FCFA/an',
      'Dépôt des états financiers : au greffe + DGI dans les 6 mois de la clôture (liasse normalisée)',
      'IS : CI 25 %, SN 30 %, CM 33 % ; acomptes trimestriels ; impôt minimum forfaitaire si déficit',
    ],
    usages: ['Exercice comptable calé sur l’année civile (obligatoire OHADA)', 'États financiers signés par expert-comptable inscrit à l’ordre'],
  },
  finance_banque: {
    reglementation: [
      'Réglementation bancaire UMOA : loi bancaire, dispositif prudentiel Bâle II/III transposé par la Commission Bancaire',
      'Usure : taux plafonds BCEAO (banques ~15 %, SFD ~24 %)',
      'Microfinance : loi PARMEC/SFD ; agrément du ministère des Finances',
    ],
    institutions: ['BCEAO / BEAC (banques centrales)', 'Commission Bancaire UMOA/COBAC', 'BRVM (bourse régionale, Abidjan)', 'Fonds de garantie des dépôts'],
    reperes: [
      'Taux débiteurs PME usuels : 7-12 % banques, 12-24 % microfinance ; taux créditeurs DAT : 3-6 %',
      'Frais de dossier crédit : 1-2 % ; garanties exigées souvent 120-150 % du montant',
      'Mobile money : > 60 % des adultes UEMOA ; plafonds portefeuille usuels 2 M FCFA (compte simple)',
    ],
    usages: ['Domiciliation des revenus exigée pour les crédits aux particuliers', 'Caution solidaire et nantissement courants pour les PME'],
  },
  informatique_tech: {
    reglementation: [
      'Protection des données : lois nationales (CI : loi 2013-450 ; SN : loi 2008-12) et autorités (ARTCI, CDP)',
      'Transactions électroniques : actes additionnels UEMOA, signatures électroniques reconnues',
      'Cybercriminalité : directives CEDEAO transposées',
    ],
    institutions: ['ARTCI (CI), ARTP/CDP (SN), ART (CM)', 'Agences nationales du numérique', 'Incubateurs et hubs (CcHub, Jokkolabs, Impact Hub Abidjan)'],
    reperes: [
      'TJM développeur local : 50 000-150 000 FCFA ; intégration ERP PME : 5 à 50 M FCFA',
      'Hébergement : datacenters locaux (MainOne, Orange) ou cloud ; latence UE ~100-150 ms',
      'Maintenance annuelle usuelle : 15-20 % du coût projet ; SLA disponibilité courant : 99,5 %',
    ],
    usages: ['Paiement des licences SaaS en FCFA via mobile money de plus en plus courant', 'Propriété du code source à stipuler expressément dans les contrats de développement'],
  },
  gestion_management: {
    reglementation: [
      'Gouvernance : AUSCGIE pour les organes sociaux (gérance, CA, DG, conventions réglementées)',
      'Délégations de pouvoirs : écrites, précises, limitées pour être opposables',
    ],
    institutions: ['Chambres de commerce', 'Associations patronales (CGECI, CNP, GICAM)', 'Cabinets conseil régionaux'],
    reperes: [
      'Honoraires conseil en organisation : 150 000-500 000 FCFA/jour selon séniorité',
      'Turnover cadres secteur privé moderne : 10-20 %/an dans les hubs (Abidjan, Dakar)',
    ],
    usages: ['Comités de direction hebdomadaires, reporting mensuel standard', 'Objectifs SMART et entretiens annuels de plus en plus répandus dans les PME structurées'],
  },
  gestion_projet: {
    reglementation: [
      'Marchés publics : codes nationaux (CI : décret 2019-679) ; seuils d’appel d’offres ; ANRMP pour les recours',
      'Financements bailleurs : procédures Banque mondiale/BAD/UE si projet financé',
    ],
    institutions: ['ANRMP/ARMP (régulation marchés publics)', 'Cellules d’exécution des projets (bailleurs)', 'PMI chapters locaux'],
    reperes: [
      'Provision pour imprévus usuelle : 5-10 % du budget ; maîtrise d’œuvre : 8-12 %',
      'Garantie de bonne exécution marchés publics : 3-5 % du montant ; retenue de garantie 5-10 %',
    ],
    usages: ['Méthodologie cadre logique exigée par les bailleurs ; PMBOK/Prince2 dans le privé', 'Rapports d’avancement mensuels et comités de pilotage trimestriels'],
  },
  qhse: {
    reglementation: [
      'Codes du travail : obligation générale de sécurité de l’employeur ; CHSCT/CSST obligatoire selon effectif (souvent ≥ 50)',
      'Codes de l’environnement nationaux : EIES obligatoire pour les projets classés ; agences (ANDE CI, DEEC SN)',
      'Normes volontaires : ISO 9001:2015, ISO 14001:2015, ISO 45001:2018',
    ],
    institutions: ['Inspection du travail', 'ANDE/DEEC (environnement)', 'Organismes certificateurs (Bureau Veritas, SGS, AFNOR Afrique)', 'Codinorm (CI), ASN (SN)'],
    reperes: [
      'Certification ISO 9001 PME : 3 à 10 M FCFA sur 12-18 mois, audits de suivi annuels',
      'Taux de fréquence accidents BTP région : 15-30 ; objectif usuel < 10',
      'EPI budget usuel : 50 000-150 000 FCFA/ouvrier/an',
    ],
    usages: ['Quart d’heure sécurité quotidien sur les chantiers structurés', 'Registres obligatoires : accidents, observations inspection'],
  },
  entrepreneuriat: {
    reglementation: [
      'Création : guichets uniques (CEPICI 24-72 h, APIX) ; SARL capital libre dans la plupart des pays OHADA',
      'Statut de l’entreprenant AUDCG : régime simplifié sans RCCM complet',
      'Régimes fiscaux : régime de l’entreprenant/TEE, réel simplifié, réel normal selon CA',
    ],
    institutions: ['CEPICI/APIX/API (guichets uniques)', 'Agences PME (Côte d’Ivoire PME, ADEPME, APME)', 'Fonds : FAFCI, FONGIP, incubateurs'],
    reperes: [
      'Coût création SARL CI : ~15 000-50 000 FCFA (formalités) ; délai 24-72 h',
      'Financement amorçage local : love money, tontines, microfinance 12-24 %, fonds d’appui publics',
      'Survie à 3 ans des TPE régionales : ~50 % ; causes principales : trésorerie et informalité',
    ],
    usages: ['Business plan exigé par toutes les banques ; apport propre demandé 10-30 %', 'Compte bancaire ou mobile money professionnel séparé recommandé dès le départ'],
  },
  btp_construction: {
    reglementation: [
      'Permis de construire obligatoire (ministères de la construction) ; délais légaux 30-90 jours',
      'Garantie décennale et responsabilité des constructeurs (codes civils locaux, inspirés art. 1792)',
      'Marchés publics de travaux : cahiers des clauses administratives générales nationaux',
    ],
    institutions: ['Ministères de la construction / LBTP (laboratoire, CI)', 'Ordres des architectes et ingénieurs', 'CNPS (déclaration chantiers)'],
    reperes: [
      'Coût construction gros œuvre : 120 000-250 000 FCFA/m² économique, 300 000-600 000 standing',
      'Ciment : 75 000-95 000 FCFA/tonne ; fer à béton : 550 000-750 000 FCFA/tonne (volatil)',
      'Retenue de garantie : 5-10 % libérée à réception définitive (1 an) ; avance démarrage 10-20 % contre caution',
    ],
    usages: ['Situations de travaux mensuelles validées par le maître d’œuvre', 'Compte prorata pour les dépenses communes de chantier'],
  },
  assurance: {
    reglementation: [
      'Code CIMA (14 pays) : contrat d’assurance, agréments, règles prudentielles ; article 13 : paiement des sinistres sous 30 jours après accord',
      'Assurances obligatoires : RC auto, RC décennale construction (selon pays), assurance importation faculté',
      'No commission sans agrément : courtiers et agents généraux agréés CIMA',
    ],
    institutions: ['CIMA/CRCA (régulation régionale)', 'Directions nationales des assurances', 'ASA-CI, FSSA (associations de sociétés)', 'Fonds de garantie automobile'],
    reperes: [
      'RC auto : prime moyenne 40 000-120 000 FCFA/an selon puissance ; taux de pénétration assurance ~1-3 % du PIB',
      'Multirisque habitation : 0,5-1,5 ‰ de la valeur assurée ; multirisque pro PME : 200 000-2 M FCFA/an',
      'Délai réglementaire CIMA de paiement sinistre : 30 jours après accord ; contestation devant la CRCA possible',
    ],
    usages: ['Attestation d’assurance exigée pour les marchés et chantiers', 'Coassurance et pools pour les grands risques industriels'],
  },
  transport_logistique: {
    reglementation: [
      'Transport routier inter-États : conventions TIE/TRIE CEDEAO, carnet TRIE pour le transit',
      'Maritime : code CEMAC/codes nationaux de la marine marchande ; connaissement (AUDCG pour le transport de marchandises)',
      'Charge à l’essieu : règlement 14 UEMOA (11,5 t/essieu) — amendes en vigueur',
    ],
    institutions: ['OIC/ports autonomes (Abidjan, Dakar, Douala)', 'Conseils de chargeurs (OIC, COSEC)', 'Douanes (SYDAM, GAINDE)', 'Shippers councils'],
    reperes: [
      'Fret conteneur 40’ Chine → Abidjan : 2 500-5 000 USD selon période ; passage portuaire : 5-10 jours',
      'Transport routier Abidjan-Ouaga (~1 100 km) : 25 000-35 000 FCFA/tonne ; camion 10 t location : 150 000-250 000 FCFA/jour',
      'Dédouanement : DD 5-35 % selon catégorie + TVA 18 % + prélèvements communautaires ~2,5 %',
    ],
    usages: ['Lettre de voiture obligatoire ; assurance faculté recommandée dès 1 M FCFA de valeur', 'Transitaire agréé en douane indispensable pour l’import régulier'],
  },
  immobilier: {
    reglementation: [
      'Foncier urbain : titre foncier seul titre de propriété définitif (ACD en CI depuis 2013) ; attestations villageoises = précaires',
      'Bail à usage d’habitation : lois nationales (CI : loi 2018-575 — caution max 2 mois + 2 mois d’avance)',
      'Bail commercial : AUDCG art. 101 ss. — droit au renouvellement après 2 ans',
      'Mutation : droits d’enregistrement 4-10 % selon pays + conservation foncière',
    ],
    institutions: ['Conservation foncière / MCLAU', 'Notaires (obligatoires pour la vente)', 'Agences immobilières agréées', 'Tribunaux (contentieux locatif)'],
    reperes: [
      'Loyers Abidjan : studio Yopougon 60 000-100 000, 3 pièces Cocody 250 000-600 000, bureaux Plateau 10 000-25 000 FCFA/m²/mois',
      'Rendement locatif brut : 6-10 % ; terrain Cocody : 80 000-250 000 FCFA/m², zones périphériques 15 000-40 000',
      'Honoraires d’agence usuels : 1 mois de loyer (location), 3-5 % (vente) ; notaire vente : ~7-10 % tous frais',
    ],
    usages: ['Vérification du titre foncier à la conservation avant toute transaction', 'État des lieux d’entrée contradictoire systématique'],
  },
  academique: {
    reglementation: [
      'Système LMD généralisé (REESAO/CAMES) ; crédits ECTS 180 (licence) / 300 (master)',
      'Reconnaissance des diplômes : CAMES pour l’enseignement supérieur',
      'Établissements privés : agréments ministériels obligatoires',
    ],
    institutions: ['CAMES (Ouagadougou)', 'Universités publiques (FHB, UCAD, Yaoundé I)', 'DECO/Office du Bac', 'Campus France / bourses d’excellence'],
    reperes: [
      'Scolarité privée supérieure : 300 000-1 500 000 FCFA/an (licence), jusqu’à 3 M (MBA)',
      'Taux de réussite bac région : 30-50 % selon années ; insertion des diplômés : 6-24 mois de recherche',
      'Mémoire de master : 60-120 pages, soutenance devant jury de 3-5 membres',
    ],
    usages: ['Normes de rédaction APA ou ISO 690 selon établissements', 'Stage de fin d’études de 3-6 mois avec rapport soutenu'],
  },
  sante: {
    reglementation: [
      'Exercice médical : inscription à l’ordre national obligatoire ; clinique privée soumise à autorisation ministérielle',
      'Pharmacie : monopole pharmaceutique, autorisations DPM ; médicaments : AMM nationale',
      'CMU/RAMU : couverture maladie universelle en déploiement (CI : CMU 1 000 FCFA/mois)',
      'Données de santé : secret médical (codes de déontologie), lois données personnelles',
    ],
    institutions: ['Ordres des médecins/pharmaciens', 'Ministères de la santé, DPM', 'Nouvelle PSP (CI), PNA (SN) — centrales d’achat', 'OMS AFRO, Institut Pasteur'],
    reperes: [
      'Consultation généraliste privée : 5 000-15 000 FCFA, spécialiste 15 000-40 000 ; journée hospitalisation clinique : 30 000-150 000 FCFA',
      'Assurance santé entreprise : 80 000-300 000 FCFA/employé/an selon couverture (taux de couverture 70-100 %, plafonds)',
      'Ratio médecins région : ~1-2/10 000 habitants (cible OMS : 1/1 000)',
    ],
    usages: ['Tiers payant avec les assurances via réseaux de soins agréés', 'Tarification par acte (nomenclature) dans les conventions cliniques-assureurs'],
  },
  association: {
    reglementation: [
      'Associations : lois nationales (CI : loi 60-315 ; SN : Code des obligations civiles et commerciales)',
      'ONG : agréments spécifiques (conventions avec ministères de tutelle), avantages fiscaux conditionnés',
      'SYCEBNL OHADA (01/01/2024) : comptabilité obligatoire des entités à but non lucratif',
    ],
    institutions: ['Ministères de l’intérieur (récépissés)', 'Directions des ONG', 'Bailleurs : UE, USAID, AFD, PNUD, fondations', 'Plateformes nationales d’ONG'],
    reperes: [
      'Frais administratifs acceptés par les bailleurs : 7-15 % du budget projet',
      'Cotisations associatives usuelles : 1 000-10 000 FCFA/mois ; assemblée générale annuelle obligatoire',
      'Audit externe exigé au-delà de ~50 M FCFA de subventions annuelles',
    ],
    usages: ['Comptabilité SYCEBNL et rapport annuel d’activité aux bailleurs', 'Manuel de procédures exigé pour les financements internationaux'],
  },
  agro_environnement: {
    reglementation: [
      'Foncier rural : lois spécifiques (CI : loi 98-750 modifiée — certificat foncier rural, bail rural)',
      'Filières régulées : Conseil Café-Cacao (prix bord champ fixé), Conseil Coton-Anacarde (CI) ; interprofessions',
      'Environnement : EIES pour les agro-industries ; certification durable (RA, UTZ, bio UE) pour l’export',
      'Semences et intrants : catalogues nationaux, homologation des pesticides (comités sahélien/CI)',
    ],
    institutions: ['ANADER (CI), ANCAR (SN) — conseil agricole', 'FIRCA (financement filières)', 'Conseil Café-Cacao, CCA', 'SODEXAM (météo), CNRA/ISRA (recherche)'],
    reperes: [
      'Cacao : prix bord champ 2024-2025 : 1 500-1 800 FCFA/kg ; rendement moyen 400-600 kg/ha (potentiel 1 500)',
      'Anacarde : 275-425 FCFA/kg bord champ ; mangue export : 200-400 FCFA/kg',
      'Coût création 1 ha verger : 300 000-800 000 FCFA ; irrigation goutte-à-goutte : 1,5-3 M FCFA/ha',
      'Prime certification durable cacao : 70-100 FCFA/kg reversés au producteur',
    ],
    usages: ['Contrats d’achat avec préfinancement de campagne courants dans les filières', 'Coopératives (SCOOPS/COOP-CA OHADA) : forme dominante d’organisation des producteurs'],
  },
};

/** Bloc de connaissances sectorielles à injecter dans le prompt (Pro/Expert). */
export function sectorKnowledge(category: string | null | undefined, niveau: 'pro' | 'expert'): string {
  const data = category ? SECTOR_DATA[category] : undefined;
  if (!data) return '';

  const parts = [
    `RÉGLEMENTATION SECTORIELLE À MOBILISER :\n${data.reglementation.map(r => `- ${r}`).join('\n')}`,
    `INSTITUTIONS DE RÉFÉRENCE : ${data.institutions.join(' ; ')}`,
    `REPÈRES DE MARCHÉ (ordres de grandeur à adapter au cas) :\n${data.reperes.map(r => `- ${r}`).join('\n')}`,
  ];
  if (niveau === 'expert') {
    parts.push(`USAGES PROFESSIONNELS DU SECTEUR :\n${data.usages.map(u => `- ${u}`).join('\n')}`);
  }
  return parts.join('\n\n');
}
