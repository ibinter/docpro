// ─────────────────────────────────────────────────────────────────────────────
// Référentiel juridique par pays.
//
// Le contexte pays était jusqu'ici une phrase générique (« utilise les
// références légales locales appropriées ») : une invitation à inventer des
// textes. Ce fichier fournit des faits vérifiables, injectés à la génération
// ET au contrôle qualité, qui dispose ainsi de la même base pour valider.
//
// Règle de tenue : n'inscrire ici que ce qui est certain. Une rubrique absente
// vaut mieux qu'une référence approximative — le prompt demande alors de rester
// général plutôt que de citer un texte au hasard.
// ─────────────────────────────────────────────────────────────────────────────

export interface DroitPays {
  nom: string;
  /** Devise et son code ISO. */
  devise: string;
  /** Régime du droit des affaires. */
  affaires: string;
  /** Droit du travail applicable. */
  travail: string;
  /** Organisme de sécurité sociale / retraite. */
  social: string;
  /** Registre du commerce et identifiants d'entreprise. */
  registre: string;
  /** Fiscalité : TVA et impôt sur les sociétés. */
  fiscalite: string;
  /** Juridictions et voies de règlement des litiges. */
  juridictions: string;
  /** Points de vigilance propres au pays. */
  vigilance?: string[];
}

const AUX_OHADA =
  "Droit des affaires régi par les Actes uniformes OHADA, d'application directe : AUDCG (droit commercial général, bail commercial, fonds de commerce), AUSCGIE (sociétés commerciales et GIE, révisé le 30/01/2014), AUS (sûretés, 15/12/2010), AUPSRVE (procédures simplifiées de recouvrement et voies d'exécution), AUPC (procédures collectives), AUDCIF/SYSCOHADA révisé pour la comptabilité";

const CCJA =
  "Cour Commune de Justice et d'Arbitrage (CCJA, Abidjan) compétente en cassation pour le droit OHADA et pour l'arbitrage ; tribunaux de commerce et de première instance locaux en premier ressort";

export const DROIT_PAYS: Record<string, DroitPays> = {
  CI: {
    nom: "Côte d'Ivoire",
    devise: 'Franc CFA UEMOA (XOF)',
    affaires: AUX_OHADA,
    travail:
      'Code du travail : loi n°2015-532 du 20 juillet 2015. CDD limité à 2 ans renouvellements compris, au-delà requalification en CDI. SMIG 75 000 FCFA/mois',
    social: 'CNPS (Caisse Nationale de Prévoyance Sociale) — déclaration du salarié dans les 8 jours de l’embauche',
    registre: 'RCCM au greffe du tribunal de commerce (format CI-ABJ-AAAA-B-NNNNN) ; création via le guichet unique CEPICI ; numéro de compte contribuable (DGI)',
    fiscalite: 'TVA 18 % ; impôt sur les sociétés 25 % ; droits d’enregistrement selon le CGI ivoirien',
    juridictions: `${CCJA} ; tribunal de commerce d’Abidjan ; tribunal du travail pour les litiges individuels`,
    vigilance: [
      "Foncier urbain : ACD (Arrêté de Concession Définitive) et titre foncier délivrés par le ministère chargé de la construction — la loi n°98-750 concerne le foncier RURAL et ne doit pas être citée pour l'urbain",
      'Bail d’habitation : loi n°2018-575 — caution plafonnée à 2 mois de loyer et avance à 2 mois',
    ],
  },
  SN: {
    nom: 'Sénégal',
    devise: 'Franc CFA UEMOA (XOF)',
    affaires: AUX_OHADA,
    travail: 'Code du travail : loi n°97-17 du 1er décembre 1997 et ses textes d’application',
    social: 'IPRES (retraite) et Caisse de Sécurité Sociale (CSS)',
    registre: 'RCCM ; NINEA (identifiant national des entreprises et associations) ; création via le guichet unique APIX',
    fiscalite: 'TVA 18 % ; impôt sur les sociétés 30 %',
    juridictions: `${CCJA} ; tribunaux de commerce de Dakar ; tribunal du travail`,
  },
  CM: {
    nom: 'Cameroun',
    devise: 'Franc CFA CEMAC (XAF)',
    affaires: AUX_OHADA,
    travail: 'Code du travail : loi n°92/007 du 14 août 1992',
    social: 'CNPS (Caisse Nationale de Prévoyance Sociale)',
    registre: 'RCCM ; numéro d’identifiant unique (NIU) délivré par la DGI ; création via les CFCE',
    fiscalite: 'TVA 19,25 % (17,5 % majorés des centimes additionnels communaux) ; impôt sur les sociétés 33 %',
    juridictions: `${CCJA} ; tribunaux de première instance et de grande instance ; juridiction bilingue français/anglais`,
    vigilance: ['Système juridique mixte : droit civil dans les régions francophones, common law dans le Nord-Ouest et le Sud-Ouest'],
  },
  BF: {
    nom: 'Burkina Faso',
    devise: 'Franc CFA UEMOA (XOF)',
    affaires: AUX_OHADA,
    travail: 'Code du travail : loi n°028-2008/AN du 13 mai 2008',
    social: 'CNSS (Caisse Nationale de Sécurité Sociale)',
    registre: 'RCCM ; IFU (identifiant financier unique) ; création via les CEFORE',
    fiscalite: 'TVA 18 % ; impôt sur les sociétés 27,5 %',
    juridictions: `${CCJA} ; tribunaux de commerce de Ouagadougou et Bobo-Dioulasso`,
  },
  ML: {
    nom: 'Mali',
    devise: 'Franc CFA UEMOA (XOF)',
    affaires: AUX_OHADA,
    travail: 'Code du travail : loi n°92-020 du 23 septembre 1992',
    social: 'INPS (Institut National de Prévoyance Sociale)',
    registre: 'RCCM ; NIF (numéro d’identification fiscale) ; création via l’API-Mali',
    fiscalite: 'TVA 18 % ; impôt sur les sociétés 30 %',
    juridictions: `${CCJA} ; tribunal de commerce de Bamako`,
  },
  TG: {
    nom: 'Togo',
    devise: 'Franc CFA UEMOA (XOF)',
    affaires: AUX_OHADA,
    travail: 'Code du travail : loi n°2021-012 du 18 juin 2021',
    social: 'CNSS (Caisse Nationale de Sécurité Sociale)',
    registre: 'RCCM ; NIF ; création via le CFE',
    fiscalite: 'TVA 18 % ; impôt sur les sociétés 27 %',
    juridictions: `${CCJA} ; tribunaux de Lomé`,
  },
  BJ: {
    nom: 'Bénin',
    devise: 'Franc CFA UEMOA (XOF)',
    affaires: AUX_OHADA,
    travail: 'Code du travail : loi n°98-004 du 27 janvier 1998',
    social: 'CNSS (Caisse Nationale de Sécurité Sociale)',
    registre: 'RCCM ; IFU ; création via l’APIEx',
    fiscalite: 'TVA 18 % ; impôt sur les sociétés 30 %',
    juridictions: `${CCJA} ; tribunal de commerce de Cotonou`,
  },
  NE: {
    nom: 'Niger',
    devise: 'Franc CFA UEMOA (XOF)',
    affaires: AUX_OHADA,
    travail: 'Code du travail : loi n°2012-45 du 25 septembre 2012',
    social: 'CNSS (Caisse Nationale de Sécurité Sociale)',
    registre: 'RCCM ; NIF ; création via la Maison de l’Entreprise',
    fiscalite: 'TVA 19 % ; impôt sur les sociétés 30 %',
    juridictions: `${CCJA} ; tribunal de commerce de Niamey`,
  },
  GN: {
    nom: 'Guinée',
    devise: 'Franc guinéen (GNF)',
    affaires: AUX_OHADA,
    travail: 'Code du travail : loi L/2014/072/CNT du 10 janvier 2014',
    social: 'CNSS (Caisse Nationale de Sécurité Sociale)',
    registre: 'RCCM ; NIF ; création via l’APIP',
    fiscalite: 'TVA 18 % ; impôt sur les sociétés 25 %',
    juridictions: `${CCJA} ; tribunaux de commerce de Conakry`,
    vigilance: ['Monnaie : franc guinéen (GNF), et non franc CFA — ne jamais libeller les montants en FCFA'],
  },
  GA: {
    nom: 'Gabon',
    devise: 'Franc CFA CEMAC (XAF)',
    affaires: AUX_OHADA,
    travail: 'Code du travail gabonais en vigueur',
    social: 'CNSS et CNAMGS (assurance maladie)',
    registre: 'RCCM ; NIF ; création via l’ANPI-Gabon',
    fiscalite: 'TVA 18 % ; impôt sur les sociétés 30 %',
    juridictions: `${CCJA} ; tribunaux de Libreville`,
  },
  CG: {
    nom: 'Congo',
    devise: 'Franc CFA CEMAC (XAF)',
    affaires: AUX_OHADA,
    travail: 'Code du travail : loi n°45-75 du 15 mars 1975 et textes modificatifs',
    social: 'CNSS (Caisse Nationale de Sécurité Sociale)',
    registre: 'RCCM ; NIU ; création via l’API',
    fiscalite: 'TVA 18 % ; impôt sur les sociétés 28 %',
    juridictions: `${CCJA} ; tribunaux de commerce de Brazzaville et Pointe-Noire`,
  },
  CD: {
    nom: 'RD Congo',
    devise: 'Franc congolais (CDF)',
    affaires: `${AUX_OHADA} — la RDC est membre de l'OHADA depuis le 12 septembre 2012`,
    travail: 'Code du travail : loi n°015/2002 du 16 octobre 2002, modifiée en 2016',
    social: 'CNSS (ex-INSS)',
    registre: 'RCCM ; numéro impôt ; création via le Guichet Unique de Création d’Entreprise',
    fiscalite: 'TVA 16 % ; impôt sur les bénéfices 30 %',
    juridictions: `${CCJA} ; tribunaux de commerce de Kinshasa et Lubumbashi`,
    vigilance: ['Monnaie : franc congolais (CDF) — ne jamais libeller les montants en FCFA'],
  },
  MA: {
    nom: 'Maroc',
    devise: 'Dirham marocain (MAD)',
    affaires:
      "Pays NON membre de l'OHADA : ne jamais citer les Actes uniformes. Droit des affaires régi par le Code de commerce (loi n°15-95) et la loi n°17-95 sur les sociétés anonymes, la loi n°5-96 pour les SARL",
    travail: 'Code du travail : loi n°65-99 promulguée par le dahir n°1-03-194 du 11 septembre 2003',
    social: 'CNSS (Caisse Nationale de Sécurité Sociale) ; AMO pour la couverture maladie',
    registre: 'Registre du commerce au tribunal de commerce ; identifiant commun de l’entreprise (ICE) ; création via les CRI',
    fiscalite: 'TVA 20 % (taux normal) ; impôt sur les sociétés à barème progressif',
    juridictions: 'Tribunaux de commerce ; cour de cassation ; arbitrage selon la loi n°95-17',
    vigilance: ['Hors zone OHADA et hors zone franc : citer les textes marocains et libeller en dirhams'],
  },
  DZ: {
    nom: 'Algérie',
    devise: 'Dinar algérien (DZD)',
    affaires:
      "Pays NON membre de l'OHADA : ne jamais citer les Actes uniformes. Droit des affaires régi par le Code de commerce algérien",
    travail: 'Relations de travail : loi n°90-11 du 21 avril 1990',
    social: 'CNAS (salariés) et CASNOS (non-salariés)',
    registre: 'Registre du commerce (CNRC) ; numéro d’identification fiscale (NIF)',
    fiscalite: 'TVA 19 % (taux normal) ; impôt sur les bénéfices des sociétés selon l’activité',
    juridictions: 'Tribunaux et cours ; chambres commerciales',
    vigilance: ['Hors OHADA et hors zone franc : libeller en dinars algériens'],
  },
  TN: {
    nom: 'Tunisie',
    devise: 'Dinar tunisien (TND)',
    affaires:
      "Pays NON membre de l'OHADA : ne jamais citer les Actes uniformes. Code des sociétés commerciales et Code de commerce tunisiens",
    travail: 'Code du travail tunisien et conventions collectives sectorielles',
    social: 'CNSS (secteur privé)',
    registre: 'Registre national des entreprises (RNE) ; matricule fiscal',
    fiscalite: 'TVA 19 % (taux normal) ; impôt sur les sociétés selon le secteur',
    juridictions: 'Tribunaux de première instance ; chambres commerciales ; conseil de prud’hommes',
    vigilance: ['Hors OHADA et hors zone franc : libeller en dinars tunisiens'],
  },
  FR: {
    nom: 'France',
    devise: 'Euro (EUR)',
    affaires:
      "Pays NON membre de l'OHADA : ne jamais citer les Actes uniformes. Code de commerce et Code civil français",
    travail: 'Code du travail français et conventions collectives de branche',
    social: 'URSSAF ; régimes de retraite complémentaire AGIRC-ARRCO',
    registre: 'RCS (registre du commerce et des sociétés) ; SIREN/SIRET ; guichet unique INPI',
    fiscalite: 'TVA 20 % (taux normal) ; impôt sur les sociétés 25 %',
    juridictions: 'Tribunaux de commerce ; conseils de prud’hommes ; tribunaux judiciaires',
    vigilance: ['RGPD applicable pour tout traitement de données personnelles'],
  },
  BE: {
    nom: 'Belgique',
    devise: 'Euro (EUR)',
    affaires: "Pays NON membre de l'OHADA. Code des sociétés et des associations (CSA)",
    travail: 'Droit du travail belge et commissions paritaires sectorielles',
    social: 'ONSS (Office National de Sécurité Sociale)',
    registre: 'Banque-Carrefour des Entreprises (BCE) ; numéro d’entreprise',
    fiscalite: 'TVA 21 % (taux normal) ; impôt des sociétés 25 %',
    juridictions: 'Tribunaux de l’entreprise ; tribunaux du travail',
  },
  CH: {
    nom: 'Suisse',
    devise: 'Franc suisse (CHF)',
    affaires: "Pays NON membre de l'OHADA. Code des obligations (CO) et Code civil suisse",
    travail: 'Code des obligations (contrat de travail, art. 319 ss.) et loi sur le travail',
    social: 'AVS/AI/APG ; LPP pour la prévoyance professionnelle',
    registre: 'Registre du commerce cantonal ; numéro IDE',
    fiscalite: 'TVA 8,1 % (taux normal) ; imposition cantonale et fédérale',
    juridictions: 'Tribunaux cantonaux ; Tribunal fédéral',
  },
  CA: {
    nom: 'Canada',
    devise: 'Dollar canadien (CAD)',
    affaires:
      "Pays NON membre de l'OHADA. Droit fédéral et provincial : Code civil du Québec au Québec, common law dans les autres provinces",
    travail: 'Normes du travail provinciales (ex. Loi sur les normes du travail au Québec) ou Code canadien du travail',
    social: 'RRQ/RPC ; assurance-emploi',
    registre: 'Registraire des entreprises provincial ; numéro d’entreprise (NE) fédéral',
    fiscalite: 'TPS 5 % plus taxes provinciales (TVQ 9,975 % au Québec)',
    juridictions: 'Tribunaux provinciaux ; Cour fédérale',
    vigilance: ['Préciser la province : le droit applicable en dépend directement'],
  },
  US: {
    nom: 'États-Unis',
    devise: 'Dollar américain (USD)',
    affaires:
      "Pays NON membre de l'OHADA. Droit essentiellement étatique : Uniform Commercial Code adopté avec variantes par chaque État",
    travail: 'Droit fédéral (FLSA, Title VII) complété par le droit de chaque État ; emploi « at-will » dans la plupart des États',
    social: 'Social Security ; unemployment insurance par État',
    registre: 'Secretary of State de l’État d’immatriculation ; EIN délivré par l’IRS',
    fiscalite: 'Pas de TVA fédérale : sales tax par État et par comté ; impôt fédéral sur les sociétés 21 %',
    juridictions: 'Cours d’État et cours fédérales',
    vigilance: ["Préciser l'État : le droit applicable en dépend directement"],
  },
};

/** Bloc de contexte juridique factuel injecté dans les prompts. */
export function contexteJuridique(code: string | null | undefined): string {
  if (!code) return '';
  const d = DROIT_PAYS[code.toUpperCase()];
  if (!d) return '';

  const lignes = [
    `CADRE JURIDIQUE APPLICABLE — ${d.nom} :`,
    `- Monnaie : ${d.devise}. Tous les montants sont libellés dans cette devise.`,
    `- Droit des affaires : ${d.affaires}`,
    `- Droit du travail : ${d.travail}`,
    `- Protection sociale : ${d.social}`,
    `- Immatriculation : ${d.registre}`,
    `- Fiscalité : ${d.fiscalite}`,
    `- Litiges : ${d.juridictions}`,
  ];
  if (d.vigilance?.length) {
    lignes.push(`- Points de vigilance : ${d.vigilance.join(' ; ')}`);
  }
  lignes.push(
    "RÈGLE ABSOLUE : n'invoque QUE des textes de ce pays. Ne cite jamais une loi d'un autre pays, ni un texte dont tu n'es pas certain. Si une référence précise te manque, formule la clause sans citer de numéro de texte plutôt que d'en inventer un."
  );
  return lignes.join('\n');
}

/** Devise attendue pour un pays (contrôle qualité). */
export function deviseAttendue(code: string | null | undefined): string | null {
  if (!code) return null;
  return DROIT_PAYS[code.toUpperCase()]?.devise ?? null;
}
