import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);

const templates = [
  // ─── MÉDIATION / RÉSOLUTION ALTERNATIVE DES CONFLITS (jus2_) ───────────────

  {
    code: 'jus2_med_caci',
    name: "Accord de médiation civile et commerciale (CACI CI)",
    category: 'juridique_admin',
    price: 8000,
    priceMax: 24000,
    description: "Accord de médiation civile et commerciale conforme au règlement du Centre d'Arbitrage, de Conciliation et d'Investigation de Côte d'Ivoire (CACI CI) dans le cadre de l'OHADA.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 78,
    fieldsJson: F([
      { key: 'parties', label: "Identité des parties", type: 'textarea', required: true },
      { key: 'objet_litige', label: "Objet du litige", type: 'textarea', required: true },
      { key: 'mediateur', label: "Nom du médiateur désigné", type: 'text', required: true },
      { key: 'date_seance', label: "Date de la première séance", type: 'date', required: true },
      { key: 'lieu', label: "Lieu de la médiation", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE MÉDIATION CIVILE ET COMMERCIALE</h1><h2>CENTRE D'ARBITRAGE, DE CONCILIATION ET D'INVESTIGATION DE CÔTE D'IVOIRE (CACI CI)</h2><p><strong>Entre les soussignés :</strong></p><p>{{parties}}</p><p><strong>Objet du litige :</strong> {{objet_litige}}</p><p><strong>Médiateur désigné :</strong> {{mediateur}}</p><p><strong>Date de la première séance :</strong> {{date_seance}}</p><p><strong>Lieu :</strong> {{lieu}}</p><p>Les parties conviennent de soumettre leur différend à la médiation conformément au Règlement du CACI CI et aux dispositions de l'Acte Uniforme OHADA applicable.</p><p>Les parties s'engagent à participer de bonne foi au processus de médiation et à respecter la confidentialité des échanges.</p><p>Fait à {{lieu}}, le {{date_seance}}</p><p>Signatures des parties et du médiateur</p></div>`
  },

  {
    code: 'jus2_med_fam',
    name: "Accord de médiation familiale conventionnelle",
    category: 'juridique_admin',
    price: 6000,
    priceMax: 16000,
    description: "Accord de médiation familiale conventionnelle pour la résolution amiable des conflits familiaux (succession, garde, pension) en droit ivoirien.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'demandeur', label: "Demandeur (nom, prénom)", type: 'text', required: true },
      { key: 'defenseur', label: "Défendeur (nom, prénom)", type: 'text', required: true },
      { key: 'objet_familial', label: "Objet du différend familial", type: 'textarea', required: true },
      { key: 'mediateur_fam', label: "Médiateur familial agréé", type: 'text', required: true },
      { key: 'date_accord', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE MÉDIATION FAMILIALE CONVENTIONNELLE</h1><p>Les soussignés :</p><p><strong>Première partie :</strong> {{demandeur}}</p><p><strong>Deuxième partie :</strong> {{defenseur}}</p><p>Conviennent de recourir à la médiation familiale conventionnelle afin de résoudre amiablement leur différend.</p><p><strong>Objet du différend :</strong> {{objet_familial}}</p><p><strong>Médiateur familial agréé :</strong> {{mediateur_fam}}</p><p>Les parties reconnaissent le caractère volontaire de la médiation et s'engagent à respecter la confidentialité des discussions. Tout accord issu de ce processus sera consigné dans un procès-verbal signé par les parties et le médiateur.</p><p>Fait le {{date_accord}}</p></div>`
  },

  {
    code: 'jus2_med_pen',
    name: "Accord de médiation pénale (restauration)",
    category: 'juridique_admin',
    price: 7000,
    priceMax: 20000,
    description: "Accord de médiation pénale à visée restauratrice permettant la réparation du préjudice entre l'auteur des faits et la victime, en alternative aux poursuites pénales.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'auteur', label: "Auteur des faits (identité)", type: 'text', required: true },
      { key: 'victime', label: "Victime (identité)", type: 'text', required: true },
      { key: 'faits', label: "Description des faits reprochés", type: 'textarea', required: true },
      { key: 'reparation', label: "Modalités de réparation convenues", type: 'textarea', required: true },
      { key: 'date_signature', label: "Date de signature de l'accord", type: 'date', required: true },
      { key: 'parquet_ref', label: "Référence dossier parquet", type: 'text', required: false },
    ]),
    body: `<div class="doc"><h1>ACCORD DE MÉDIATION PÉNALE</h1><h2>JUSTICE RESTAURATRICE</h2><p><strong>Auteur des faits :</strong> {{auteur}}</p><p><strong>Victime :</strong> {{victime}}</p><p><strong>Référence dossier parquet :</strong> {{parquet_ref}}</p><p><strong>Faits à l'origine de la médiation :</strong></p><p>{{faits}}</p><p><strong>Modalités de réparation convenues :</strong></p><p>{{reparation}}</p><p>Le présent accord est conclu dans le cadre du processus de médiation pénale, en présence du médiateur désigné par le Procureur de la République. Son exécution vaut désistement des poursuites pénales conformément aux dispositions légales en vigueur.</p><p>Signé le {{date_signature}}</p></div>`
  },

  {
    code: 'jus2_med_soc',
    name: "Accord de médiation sociale (travail)",
    category: 'juridique_admin',
    price: 7000,
    priceMax: 18000,
    description: "Accord de médiation sociale en matière de conflits individuels ou collectifs du travail, dans le respect du Code du Travail ivoirien.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 72,
    fieldsJson: F([
      { key: 'employeur', label: "Employeur (raison sociale)", type: 'text', required: true },
      { key: 'salarie', label: "Salarié(s) concerné(s)", type: 'text', required: true },
      { key: 'litige_travail', label: "Nature du litige de travail", type: 'textarea', required: true },
      { key: 'solution_med', label: "Solution retenue par médiation", type: 'textarea', required: true },
      { key: 'date_med', label: "Date de l'accord", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE MÉDIATION SOCIALE</h1><h2>RÉSOLUTION AMIABLE DU LITIGE DE TRAVAIL</h2><p><strong>Employeur :</strong> {{employeur}}</p><p><strong>Salarié(s) :</strong> {{salarie}}</p><p><strong>Nature du litige :</strong></p><p>{{litige_travail}}</p><p><strong>Solution retenue à l'issue de la médiation :</strong></p><p>{{solution_med}}</p><p>Le présent accord met fin au différend entre les parties. Il est établi en application du Code du Travail de Côte d'Ivoire et des principes de la médiation sociale.</p><p>Date : {{date_med}}</p><p>Signatures des parties et du médiateur social</p></div>`
  },

  {
    code: 'jus2_med_vois',
    name: "Accord de médiation de voisinage",
    category: 'juridique_admin',
    price: 4000,
    priceMax: 10000,
    description: "Accord de médiation pour la résolution amiable des conflits de voisinage (nuisances, limites de propriété, bruits, odeurs) en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'voisin1', label: "Premier voisin (identité et adresse)", type: 'text', required: true },
      { key: 'voisin2', label: "Deuxième voisin (identité et adresse)", type: 'text', required: true },
      { key: 'conflit_vois', label: "Description du conflit de voisinage", type: 'textarea', required: true },
      { key: 'engagements', label: "Engagements réciproques", type: 'textarea', required: true },
      { key: 'date_vois', label: "Date de l'accord", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE MÉDIATION DE VOISINAGE</h1><p><strong>Partie 1 :</strong> {{voisin1}}</p><p><strong>Partie 2 :</strong> {{voisin2}}</p><p><strong>Nature du conflit :</strong></p><p>{{conflit_vois}}</p><p><strong>Engagements réciproques des parties :</strong></p><p>{{engagements}}</p><p>Le présent accord, conclu à l'amiable avec l'assistance d'un médiateur, met fin au différend de voisinage. Les parties s'engagent à respecter les termes ci-dessus sous peine de recours judiciaire.</p><p>Fait le {{date_vois}}</p></div>`
  },

  {
    code: 'jus2_conc_prud',
    name: "Accord de conciliation en matière prud'homale",
    category: 'juridique_admin',
    price: 6000,
    priceMax: 16000,
    description: "Procès-verbal de conciliation prud'homale établi devant le Bureau de Conciliation du Conseil de Prud'hommes conformément au Code du Travail ivoirien.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 74,
    fieldsJson: F([
      { key: 'employeur_prud', label: "Employeur défendeur", type: 'text', required: true },
      { key: 'salarie_prud', label: "Salarié demandeur", type: 'text', required: true },
      { key: 'pretentions', label: "Prétentions du salarié", type: 'textarea', required: true },
      { key: 'accord_prud', label: "Termes de la conciliation", type: 'textarea', required: true },
      { key: 'date_prud', label: "Date de l'audience de conciliation", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>PROCÈS-VERBAL DE CONCILIATION PRUD'HOMALE</h1><p>L'an {{date_prud}}, le Bureau de Conciliation du Conseil de Prud'hommes étant réuni,</p><p><strong>Employeur :</strong> {{employeur_prud}}</p><p><strong>Salarié :</strong> {{salarie_prud}}</p><p><strong>Prétentions du salarié :</strong></p><p>{{pretentions}}</p><p><strong>Accord de conciliation :</strong></p><p>{{accord_prud}}</p><p>Le présent procès-verbal de conciliation vaut titre exécutoire. Les parties renoncent à tout recours ultérieur relatif au présent litige.</p><p>Le Président du Bureau de Conciliation</p></div>`
  },

  {
    code: 'jus2_conc_com',
    name: "Accord de conciliation commerciale (chambre de commerce)",
    category: 'juridique_admin',
    price: 8000,
    priceMax: 22000,
    description: "Accord de conciliation commerciale conduit sous l'égide de la Chambre de Commerce et d'Industrie de Côte d'Ivoire (CCI-CI) pour litiges entre commerçants.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 71,
    fieldsJson: F([
      { key: 'societe1', label: "Société demanderesse (dénomination, RCCM)", type: 'text', required: true },
      { key: 'societe2', label: "Société défenderesse (dénomination, RCCM)", type: 'text', required: true },
      { key: 'litige_com', label: "Nature du litige commercial", type: 'textarea', required: true },
      { key: 'accord_com', label: "Solution convenue", type: 'textarea', required: true },
      { key: 'montant', label: "Montant éventuel de l'indemnisation (FCFA)", type: 'text', required: false },
      { key: 'date_conc', label: "Date de conciliation", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE CONCILIATION COMMERCIALE</h1><h2>CHAMBRE DE COMMERCE ET D'INDUSTRIE DE CÔTE D'IVOIRE (CCI-CI)</h2><p><strong>Partie demanderesse :</strong> {{societe1}}</p><p><strong>Partie défenderesse :</strong> {{societe2}}</p><p><strong>Litige commercial :</strong></p><p>{{litige_com}}</p><p><strong>Solution convenue :</strong></p><p>{{accord_com}}</p><p><strong>Indemnisation :</strong> {{montant}} FCFA</p><p>Le présent accord de conciliation est définitif et met fin à tout litige entre les parties. Il est signé le {{date_conc}} devant le conciliateur de la CCI-CI.</p></div>`
  },

  {
    code: 'jus2_med_banc',
    name: "Accord de médiation bancaire",
    category: 'juridique_admin',
    price: 7000,
    priceMax: 20000,
    description: "Accord de médiation entre un client et son établissement bancaire pour résoudre un différend relatif à un compte, un crédit ou des frais bancaires.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'client_banc', label: "Client (nom, numéro compte)", type: 'text', required: true },
      { key: 'banque', label: "Établissement bancaire", type: 'text', required: true },
      { key: 'litige_banc', label: "Objet du litige bancaire", type: 'textarea', required: true },
      { key: 'solution_banc', label: "Solution agréée par les parties", type: 'textarea', required: true },
      { key: 'date_banc', label: "Date de l'accord", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE MÉDIATION BANCAIRE</h1><p><strong>Client :</strong> {{client_banc}}</p><p><strong>Établissement bancaire :</strong> {{banque}}</p><p><strong>Objet du litige :</strong></p><p>{{litige_banc}}</p><p><strong>Solution agréée :</strong></p><p>{{solution_banc}}</p><p>Le présent accord est conclu suite à la procédure de médiation bancaire conduite conformément à la réglementation de la BCEAO et de l'UEMOA. Il est signé le {{date_banc}} et met fin au différend entre les parties.</p></div>`
  },

  {
    code: 'jus2_med_ass',
    name: "Accord de médiation des assurances",
    category: 'juridique_admin',
    price: 6000,
    priceMax: 18000,
    description: "Accord de médiation entre un assuré et sa compagnie d'assurance pour règlement amiable d'un sinistre ou d'un différend contractuel, conforme au Code CIMA.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 66,
    fieldsJson: F([
      { key: 'assure', label: "Assuré (nom, numéro police)", type: 'text', required: true },
      { key: 'assureur', label: "Compagnie d'assurance", type: 'text', required: true },
      { key: 'sinistre', label: "Description du sinistre ou litige", type: 'textarea', required: true },
      { key: 'indemnite', label: "Indemnité convenue (FCFA)", type: 'text', required: true },
      { key: 'date_ass', label: "Date de l'accord", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE MÉDIATION DES ASSURANCES</h1><p>Conforme au Code des Assurances CIMA</p><p><strong>Assuré :</strong> {{assure}}</p><p><strong>Compagnie d'assurance :</strong> {{assureur}}</p><p><strong>Sinistre / Litige :</strong></p><p>{{sinistre}}</p><p><strong>Indemnité convenue :</strong> {{indemnite}} FCFA</p><p>Les parties déclarent mettre fin à leur différend par le présent accord de médiation. L'assuré renonce à tout recours ultérieur relatif au sinistre décrit ci-dessus dès réception du paiement de l'indemnité convenue.</p><p>Signé le {{date_ass}}</p></div>`
  },

  {
    code: 'jus2_med_immo',
    name: "Accord de médiation immobilière",
    category: 'juridique_admin',
    price: 8000,
    priceMax: 24000,
    description: "Accord de médiation pour la résolution amiable de litiges immobiliers (baux, copropriété, vente, construction) en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 67,
    fieldsJson: F([
      { key: 'partie_a', label: "Partie A (bailleur/vendeur/promoteur)", type: 'text', required: true },
      { key: 'partie_b', label: "Partie B (locataire/acquéreur)", type: 'text', required: true },
      { key: 'bien', label: "Désignation du bien immobilier", type: 'text', required: true },
      { key: 'litige_immo', label: "Objet du litige immobilier", type: 'textarea', required: true },
      { key: 'accord_immo', label: "Termes de l'accord amiable", type: 'textarea', required: true },
      { key: 'date_immo', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE MÉDIATION IMMOBILIÈRE</h1><p><strong>Partie A :</strong> {{partie_a}}</p><p><strong>Partie B :</strong> {{partie_b}}</p><p><strong>Bien immobilier :</strong> {{bien}}</p><p><strong>Objet du litige :</strong></p><p>{{litige_immo}}</p><p><strong>Accord amiable :</strong></p><p>{{accord_immo}}</p><p>Le présent accord de médiation immobilière, signé le {{date_immo}}, met fin au litige entre les parties. Il peut faire l'objet d'une homologation judiciaire sur demande de l'une ou l'autre partie.</p></div>`
  },

  {
    code: 'jus2_med_conso',
    name: "Accord de médiation de consommation",
    category: 'juridique_admin',
    price: 4000,
    priceMax: 12000,
    description: "Accord de médiation entre un consommateur et un professionnel pour résolution amiable d'un litige de consommation (produit défectueux, service, garantie).",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 62,
    fieldsJson: F([
      { key: 'consommateur', label: "Consommateur (identité)", type: 'text', required: true },
      { key: 'professionnel', label: "Professionnel / Enseigne", type: 'text', required: true },
      { key: 'litige_conso', label: "Nature du litige de consommation", type: 'textarea', required: true },
      { key: 'solution_conso', label: "Solution convenue (remboursement, échange...)", type: 'textarea', required: true },
      { key: 'date_conso', label: "Date de l'accord", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE MÉDIATION DE CONSOMMATION</h1><p><strong>Consommateur :</strong> {{consommateur}}</p><p><strong>Professionnel :</strong> {{professionnel}}</p><p><strong>Litige :</strong></p><p>{{litige_conso}}</p><p><strong>Solution convenue :</strong></p><p>{{solution_conso}}</p><p>Le présent accord est conclu conformément aux règles de protection du consommateur applicables en Côte d'Ivoire. Il met fin au différend entre les parties à la date du {{date_conso}}.</p></div>`
  },

  {
    code: 'jus2_med_trans',
    name: "Accord de médiation transfrontalière OHADA",
    category: 'juridique_admin',
    price: 12000,
    priceMax: 36000,
    description: "Accord de médiation transfrontalière entre opérateurs économiques de pays membres de l'OHADA, avec désignation du droit applicable et du médiateur international.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 75,
    fieldsJson: F([
      { key: 'op_pays1', label: "Opérateur Pays 1 (société, pays, RCCM)", type: 'text', required: true },
      { key: 'op_pays2', label: "Opérateur Pays 2 (société, pays, RCCM)", type: 'text', required: true },
      { key: 'litige_trans', label: "Description du litige transfrontalier", type: 'textarea', required: true },
      { key: 'droit_applicable', label: "Droit applicable choisi", type: 'text', required: true },
      { key: 'mediateur_trans', label: "Médiateur international désigné", type: 'text', required: true },
      { key: 'date_trans', label: "Date de l'accord", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE MÉDIATION TRANSFRONTALIÈRE OHADA</h1><p><strong>Opérateur Pays 1 :</strong> {{op_pays1}}</p><p><strong>Opérateur Pays 2 :</strong> {{op_pays2}}</p><p><strong>Litige :</strong></p><p>{{litige_trans}}</p><p><strong>Droit applicable :</strong> {{droit_applicable}}</p><p><strong>Médiateur international :</strong> {{mediateur_trans}}</p><p>Le présent accord est régi par le Traité OHADA et les Actes Uniformes en vigueur. Les parties acceptent le médiateur désigné et s'engagent à respecter les termes de tout accord issu du processus.</p><p>Signé le {{date_trans}}</p></div>`
  },

  {
    code: 'jus2_med_odr',
    name: "Accord de règlement de conflit inter-entreprises (ODR en ligne)",
    category: 'juridique_admin',
    price: 9000,
    priceMax: 25000,
    description: "Accord de résolution en ligne des litiges commerciaux inter-entreprises (Online Dispute Resolution) dans l'espace OHADA, avec plateforme numérique agréée.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 69,
    fieldsJson: F([
      { key: 'entreprise_dem', label: "Entreprise demanderesse", type: 'text', required: true },
      { key: 'entreprise_def', label: "Entreprise défenderesse", type: 'text', required: true },
      { key: 'litige_odr', label: "Description du litige", type: 'textarea', required: true },
      { key: 'plateforme', label: "Plateforme ODR utilisée", type: 'text', required: true },
      { key: 'date_odr', label: "Date de l'accord en ligne", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE RÈGLEMENT EN LIGNE DES LITIGES (ODR)</h1><h2>RÉSOLUTION INTER-ENTREPRISES PAR VOIE NUMÉRIQUE</h2><p><strong>Entreprise demanderesse :</strong> {{entreprise_dem}}</p><p><strong>Entreprise défenderesse :</strong> {{entreprise_def}}</p><p><strong>Litige :</strong></p><p>{{litige_odr}}</p><p><strong>Plateforme ODR :</strong> {{plateforme}}</p><p>Les parties acceptent de recourir au processus ODR via la plateforme mentionnée. Toute communication électronique dans ce cadre aura valeur probatoire. L'accord final signé électroniquement le {{date_odr}} est juridiquement contraignant.</p></div>`
  },

  {
    code: 'jus2_med_dial',
    name: "Accord de facilitateur de dialogue communautaire",
    category: 'juridique_admin',
    price: 5000,
    priceMax: 14000,
    description: "Accord cadre de facilitation du dialogue au sein d'une communauté locale pour résoudre des conflits fonciers, intercommunautaires ou sociaux en Afrique de l'Ouest.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 63,
    fieldsJson: F([
      { key: 'communaute1', label: "Communauté / Groupe 1", type: 'text', required: true },
      { key: 'communaute2', label: "Communauté / Groupe 2", type: 'text', required: true },
      { key: 'conflit_com', label: "Nature du conflit communautaire", type: 'textarea', required: true },
      { key: 'facilitateur', label: "Facilitateur de dialogue (identité)", type: 'text', required: true },
      { key: 'engagements_com', label: "Engagements des communautés", type: 'textarea', required: true },
      { key: 'date_dial', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE DIALOGUE COMMUNAUTAIRE</h1><h2>FACILITATION DE LA RÉSOLUTION AMIABLE</h2><p><strong>Communauté 1 :</strong> {{communaute1}}</p><p><strong>Communauté 2 :</strong> {{communaute2}}</p><p><strong>Nature du conflit :</strong></p><p>{{conflit_com}}</p><p><strong>Facilitateur :</strong> {{facilitateur}}</p><p><strong>Engagements des parties :</strong></p><p>{{engagements_com}}</p><p>Le présent accord de dialogue communautaire est signé en présence des chefs coutumiers et autorités locales le {{date_dial}}. Les parties s'engagent à respecter la paix sociale et les termes convenus.</p></div>`
  },

  {
    code: 'jus2_med_env',
    name: "Accord de médiation environnementale",
    category: 'juridique_admin',
    price: 10000,
    priceMax: 30000,
    description: "Accord de médiation pour la résolution des conflits environnementaux (pollution, déforestation, nuisances industrielles) impliquant entreprises, communautés et État.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'pollueur', label: "Entreprise ou entité mise en cause", type: 'text', required: true },
      { key: 'victimes_env', label: "Communautés ou personnes affectées", type: 'text', required: true },
      { key: 'prejudice_env', label: "Description du préjudice environnemental", type: 'textarea', required: true },
      { key: 'mesures_env', label: "Mesures de réparation et de prévention", type: 'textarea', required: true },
      { key: 'date_env', label: "Date de l'accord", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE MÉDIATION ENVIRONNEMENTALE</h1><p><strong>Entité mise en cause :</strong> {{pollueur}}</p><p><strong>Communautés / Personnes affectées :</strong> {{victimes_env}}</p><p><strong>Préjudice environnemental :</strong></p><p>{{prejudice_env}}</p><p><strong>Mesures de réparation et prévention :</strong></p><p>{{mesures_env}}</p><p>Le présent accord, signé le {{date_env}}, engage l'entité mise en cause à mettre en oeuvre les mesures de réparation dans les délais convenus. Toute inexécution entraînera le recours aux juridictions compétentes ou aux autorités de régulation environnementale.</p></div>`
  },

  {
    code: 'jus2_med_ppp',
    name: "Accord de médiation dans les projets PPP",
    category: 'juridique_admin',
    price: 15000,
    priceMax: 45000,
    description: "Accord de médiation pour la résolution des différends survenant dans le cadre de Partenariats Public-Privé (PPP) en Afrique, en application du cadre légal OHADA.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 76,
    fieldsJson: F([
      { key: 'autorite_pub', label: "Autorité publique contractante", type: 'text', required: true },
      { key: 'partenaire_priv', label: "Partenaire privé (société, RCCM)", type: 'text', required: true },
      { key: 'projet_ppp', label: "Dénomination et objet du projet PPP", type: 'text', required: true },
      { key: 'litige_ppp', label: "Description du différend PPP", type: 'textarea', required: true },
      { key: 'mediateur_ppp', label: "Médiateur ou panel de médiation", type: 'text', required: true },
      { key: 'date_ppp', label: "Date de l'accord de médiation", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE MÉDIATION - PARTENARIAT PUBLIC-PRIVÉ</h1><p><strong>Autorité publique :</strong> {{autorite_pub}}</p><p><strong>Partenaire privé :</strong> {{partenaire_priv}}</p><p><strong>Projet PPP :</strong> {{projet_ppp}}</p><p><strong>Différend :</strong></p><p>{{litige_ppp}}</p><p><strong>Médiateur :</strong> {{mediateur_ppp}}</p><p>Les parties conviennent de soumettre leur différend à la médiation avant tout recours à l'arbitrage ou aux juridictions compétentes, conformément à la convention de PPP et au droit OHADA.</p><p>Signé le {{date_ppp}}</p></div>`
  },

  {
    code: 'jus2_form_med',
    name: "Accord de service de formation de médiateurs professionnels",
    category: 'juridique_admin',
    price: 10000,
    priceMax: 28000,
    description: "Convention de service entre un organisme de formation et des candidats médiateurs pour la délivrance d'une formation professionnelle certifiante en médiation OHADA.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'organisme_form', label: "Organisme de formation", type: 'text', required: true },
      { key: 'candidat', label: "Candidat(s) médiateur(s)", type: 'text', required: true },
      { key: 'programme', label: "Programme et durée de la formation", type: 'textarea', required: true },
      { key: 'cout_form', label: "Coût de la formation (FCFA)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début de formation", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONVENTION DE FORMATION DE MÉDIATEURS PROFESSIONNELS</h1><p><strong>Organisme de formation :</strong> {{organisme_form}}</p><p><strong>Candidat(s) :</strong> {{candidat}}</p><p><strong>Programme de formation :</strong></p><p>{{programme}}</p><p><strong>Coût total :</strong> {{cout_form}} FCFA</p><p><strong>Date de début :</strong> {{date_debut}}</p><p>La formation dispensée couvre les techniques de médiation, la déontologie du médiateur et le cadre juridique OHADA de la médiation. Une attestation sera délivrée à l'issue de la formation avec succès.</p></div>`
  },

  {
    code: 'jus2_label_med',
    name: "Accord de labellisation de médiateur professionnel",
    category: 'juridique_admin',
    price: 8000,
    priceMax: 20000,
    description: "Accord entre un organisme de labellisation et un médiateur pour la reconnaissance officielle de ses compétences et l'inscription sur la liste des médiateurs agréés.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 62,
    fieldsJson: F([
      { key: 'organisme_label', label: "Organisme de labellisation", type: 'text', required: true },
      { key: 'mediateur_label', label: "Médiateur candidat à la labellisation", type: 'text', required: true },
      { key: 'specialite', label: "Spécialité(s) de médiation", type: 'text', required: true },
      { key: 'conditions', label: "Conditions et critères de labellisation remplis", type: 'textarea', required: true },
      { key: 'date_label', label: "Date de délivrance du label", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE LABELLISATION DE MÉDIATEUR PROFESSIONNEL</h1><p><strong>Organisme de labellisation :</strong> {{organisme_label}}</p><p><strong>Médiateur :</strong> {{mediateur_label}}</p><p><strong>Spécialité(s) :</strong> {{specialite}}</p><p><strong>Critères remplis :</strong></p><p>{{conditions}}</p><p>Le présent accord atteste que le médiateur mentionné satisfait aux critères de compétence, de formation et de déontologie requis. Il est inscrit sur la liste officielle des médiateurs agréés à compter du {{date_label}}.</p></div>`
  },

  {
    code: 'jus2_centre_med',
    name: "Accord de service de centre de médiation institutionnel",
    category: 'juridique_admin',
    price: 12000,
    priceMax: 35000,
    description: "Convention de service entre un centre de médiation institutionnel et des parties souhaitant recourir à ses services pour la conduite d'une procédure de médiation.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 67,
    fieldsJson: F([
      { key: 'centre', label: "Centre de médiation (dénomination)", type: 'text', required: true },
      { key: 'parties_service', label: "Parties demanderesses", type: 'text', required: true },
      { key: 'type_mediation', label: "Type de médiation sollicitée", type: 'text', required: true },
      { key: 'honoraires', label: "Honoraires du centre (FCFA)", type: 'text', required: true },
      { key: 'date_service', label: "Date de signature du contrat de service", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE CENTRE DE MÉDIATION INSTITUTIONNEL</h1><p><strong>Centre de médiation :</strong> {{centre}}</p><p><strong>Parties :</strong> {{parties_service}}</p><p><strong>Type de médiation :</strong> {{type_mediation}}</p><p><strong>Honoraires :</strong> {{honoraires}} FCFA</p><p>Le centre s'engage à mettre à disposition ses locaux, son médiateur accrédité et son secrétariat pour conduire la procédure de médiation conformément à son règlement intérieur. Les parties acceptent le règlement de procédure du centre.</p><p>Signé le {{date_service}}</p></div>`
  },

  {
    code: 'jus2_proto_med',
    name: "Protocole de médiation (règlement de procédure)",
    category: 'juridique_admin',
    price: 7000,
    priceMax: 18000,
    description: "Document cadre définissant les règles de procédure applicables à une médiation : calendrier, confidentialité, rôle du médiateur, modalités d'accord.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 64,
    fieldsJson: F([
      { key: 'parties_proto', label: "Parties à la médiation", type: 'text', required: true },
      { key: 'mediateur_proto', label: "Médiateur désigné", type: 'text', required: true },
      { key: 'calendrier', label: "Calendrier prévisionnel des séances", type: 'textarea', required: true },
      { key: 'regles_conf', label: "Règles de confidentialité applicables", type: 'textarea', required: true },
      { key: 'date_proto', label: "Date de signature du protocole", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>PROTOCOLE DE MÉDIATION</h1><h2>RÈGLEMENT DE PROCÉDURE</h2><p><strong>Parties :</strong> {{parties_proto}}</p><p><strong>Médiateur :</strong> {{mediateur_proto}}</p><p><strong>Calendrier :</strong></p><p>{{calendrier}}</p><p><strong>Confidentialité :</strong></p><p>{{regles_conf}}</p><p>Le présent protocole régit le déroulement de la procédure de médiation entre les parties. Il est signé le {{date_proto}} et engage les participants dès leur première séance commune.</p></div>`
  },

  {
    code: 'jus2_susp_presc',
    name: "Accord de suspension du délai de prescription pendant médiation",
    category: 'juridique_admin',
    price: 5000,
    priceMax: 14000,
    description: "Accord entre les parties et leur médiateur constatant la suspension des délais de prescription et de forclusion pendant la durée de la procédure de médiation.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'parties_susp', label: "Parties concernées", type: 'text', required: true },
      { key: 'droit_concerne', label: "Droit ou action dont la prescription est suspendue", type: 'textarea', required: true },
      { key: 'date_debut_susp', label: "Date de début de suspension", type: 'date', required: true },
      { key: 'date_fin_susp', label: "Date de fin prévisionnelle de suspension", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SUSPENSION DU DÉLAI DE PRESCRIPTION</h1><h2>PENDANT PROCÉDURE DE MÉDIATION</h2><p><strong>Parties :</strong> {{parties_susp}}</p><p><strong>Action concernée :</strong></p><p>{{droit_concerne}}</p><p><strong>Suspension du :</strong> {{date_debut_susp}}</p><p><strong>Au :</strong> {{date_fin_susp}}</p><p>Conformément aux dispositions légales applicables en Côte d'Ivoire et dans l'espace OHADA, les parties conviennent que le délai de prescription ou de forclusion est suspendu pendant toute la durée de la procédure de médiation. Cette suspension prend fin au lendemain du constat d'échec ou de la signature d'un accord de médiation.</p></div>`
  },

  {
    code: 'jus2_conf_med',
    name: "Accord de confidentialité de la médiation",
    category: 'juridique_admin',
    price: 4000,
    priceMax: 12000,
    description: "Accord de confidentialité signé par les parties, le médiateur et les tiers intervenants, garantissant la confidentialité absolue des informations échangées en médiation.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 72,
    fieldsJson: F([
      { key: 'signataires_conf', label: "Signataires de l'accord (parties, médiateur, tiers)", type: 'textarea', required: true },
      { key: 'perimetre_conf', label: "Périmètre des informations confidentielles", type: 'textarea', required: true },
      { key: 'duree_conf', label: "Durée de la confidentialité", type: 'text', required: true },
      { key: 'date_conf', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE CONFIDENTIALITÉ DE LA MÉDIATION</h1><p><strong>Signataires :</strong></p><p>{{signataires_conf}}</p><p><strong>Informations confidentielles :</strong></p><p>{{perimetre_conf}}</p><p><strong>Durée de la confidentialité :</strong> {{duree_conf}}</p><p>Les signataires s'engagent à ne divulguer aucune information échangée lors du processus de médiation. Cet accord est irrévocable et survit à l'issue du processus de médiation. Toute violation engage la responsabilité civile du contrevenant.</p><p>Signé le {{date_conf}}</p></div>`
  },

  {
    code: 'jus2_rapport_med',
    name: "Rapport de médiation (PV accord ou désaccord)",
    category: 'juridique_admin',
    price: 5000,
    priceMax: 14000,
    description: "Procès-verbal dressé par le médiateur à l'issue de la procédure, constatant soit un accord total ou partiel, soit un constat d'échec de la médiation.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 73,
    fieldsJson: F([
      { key: 'mediateur_rap', label: "Médiateur (identité et qualité)", type: 'text', required: true },
      { key: 'parties_rap', label: "Parties à la médiation", type: 'text', required: true },
      { key: 'deroulement', label: "Déroulement de la procédure (synthèse)", type: 'textarea', required: true },
      { key: 'resultat', label: "Résultat : accord total, partiel ou échec", type: 'textarea', required: true },
      { key: 'date_rap', label: "Date du procès-verbal", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>RAPPORT DE MÉDIATION</h1><h2>PROCÈS-VERBAL DE FIN DE PROCÉDURE</h2><p><strong>Médiateur :</strong> {{mediateur_rap}}</p><p><strong>Parties :</strong> {{parties_rap}}</p><p><strong>Déroulement :</strong></p><p>{{deroulement}}</p><p><strong>Résultat de la médiation :</strong></p><p>{{resultat}}</p><p>Le présent rapport est établi le {{date_rap}}. Il est signé par le médiateur et remis aux parties. En cas d'accord, il est annexé au protocole d'accord signé par les parties. En cas d'échec, il permet aux parties de saisir la juridiction compétente.</p></div>`
  },

  {
    code: 'jus2_plan_centre',
    name: "Plan de développement centre de médiation",
    category: 'juridique_admin',
    price: 14000,
    priceMax: 40000,
    description: "Document stratégique définissant le plan de développement d'un centre de médiation : gouvernance, ressources, offres de services, partenariats et objectifs.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 61,
    fieldsJson: F([
      { key: 'nom_centre', label: "Dénomination du centre", type: 'text', required: true },
      { key: 'gouvernance', label: "Structure de gouvernance", type: 'textarea', required: true },
      { key: 'offres', label: "Offres de services de médiation", type: 'textarea', required: true },
      { key: 'objectifs', label: "Objectifs stratégiques sur 3 ans", type: 'textarea', required: true },
      { key: 'date_plan', label: "Date d'adoption du plan", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT</h1><h2>CENTRE DE MÉDIATION - {{nom_centre}}</h2><p><strong>Gouvernance :</strong></p><p>{{gouvernance}}</p><p><strong>Offres de services :</strong></p><p>{{offres}}</p><p><strong>Objectifs stratégiques :</strong></p><p>{{objectifs}}</p><p>Ce plan de développement est adopté le {{date_plan}} par les organes de direction du centre. Il sera révisé annuellement pour tenir compte de l'évolution du secteur de la médiation en Afrique de l'Ouest.</p></div>`
  },

  {
    code: 'jus2_charte_med',
    name: "Charte du médiateur professionnel en Afrique",
    category: 'juridique_admin',
    price: 6000,
    priceMax: 16000,
    description: "Charte déontologique du médiateur professionnel en Afrique francophone, définissant les principes d'indépendance, d'impartialité, de confidentialité et de compétence.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'org_charte', label: "Organisation émettrice de la charte", type: 'text', required: true },
      { key: 'principes', label: "Principes déontologiques fondamentaux", type: 'textarea', required: true },
      { key: 'obligations', label: "Obligations du médiateur signataire", type: 'textarea', required: true },
      { key: 'sanctions', label: "Sanctions en cas de manquement", type: 'textarea', required: true },
      { key: 'date_charte', label: "Date d'adoption de la charte", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CHARTE DU MÉDIATEUR PROFESSIONNEL EN AFRIQUE</h1><p>Émise par : {{org_charte}}</p><p><strong>Principes déontologiques :</strong></p><p>{{principes}}</p><p><strong>Obligations du médiateur :</strong></p><p>{{obligations}}</p><p><strong>Sanctions :</strong></p><p>{{sanctions}}</p><p>En signant la présente charte le {{date_charte}}, le médiateur s'engage solennellement à respecter les principes d'éthique professionnelle qui fondent la confiance des justiciables en la médiation.</p></div>`
  },

  // ─── ARBITRAGE INTERNATIONAL (arb2_) ───────────────────────────────────────

  {
    code: 'arb2_conv_adhoc',
    name: "Convention d'arbitrage ad hoc (clause compromissoire)",
    category: 'juridique_admin',
    price: 10000,
    priceMax: 28000,
    description: "Clause compromissoire ad hoc insérée dans un contrat commercial pour soumettre les litiges futurs à un arbitrage indépendant de toute institution, selon le droit OHADA.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 80,
    fieldsJson: F([
      { key: 'parties_adhoc', label: "Parties au contrat", type: 'text', required: true },
      { key: 'contrat_ref', label: "Référence du contrat principal", type: 'text', required: true },
      { key: 'siege_arb', label: "Siège de l'arbitrage", type: 'text', required: true },
      { key: 'langue_arb', label: "Langue de la procédure", type: 'text', required: true },
      { key: 'droit_fond', label: "Droit applicable au fond", type: 'text', required: true },
      { key: 'date_conv', label: "Date de la convention", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONVENTION D'ARBITRAGE AD HOC</h1><h2>CLAUSE COMPROMISSOIRE</h2><p><strong>Parties :</strong> {{parties_adhoc}}</p><p><strong>Contrat de référence :</strong> {{contrat_ref}}</p><p>Tout litige, différend ou réclamation né ou à naître du présent contrat ou en relation avec lui, y compris sa validité, son interprétation ou sa résiliation, sera soumis à un arbitrage ad hoc.</p><p><strong>Siège de l'arbitrage :</strong> {{siege_arb}}</p><p><strong>Langue de procédure :</strong> {{langue_arb}}</p><p><strong>Droit applicable au fond :</strong> {{droit_fond}}</p><p>Signé le {{date_conv}}</p></div>`
  },

  {
    code: 'arb2_conv_inst',
    name: "Convention d'arbitrage institutionnel (CCJA OHADA)",
    category: 'juridique_admin',
    price: 12000,
    priceMax: 35000,
    description: "Clause ou convention d'arbitrage institutionnel soumettant le litige à la Cour Commune de Justice et d'Arbitrage (CCJA) de l'OHADA, conformément à son Règlement d'arbitrage.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 85,
    fieldsJson: F([
      { key: 'parties_ccja', label: "Parties à la convention", type: 'text', required: true },
      { key: 'objet_contrat', label: "Objet du contrat principal", type: 'textarea', required: true },
      { key: 'nb_arbitres', label: "Nombre d'arbitres (1 ou 3)", type: 'text', required: true },
      { key: 'siege_ccja', label: "Siège de l'arbitrage", type: 'text', required: true },
      { key: 'date_ccja', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONVENTION D'ARBITRAGE INSTITUTIONNEL</h1><h2>COUR COMMUNE DE JUSTICE ET D'ARBITRAGE (CCJA) - OHADA</h2><p><strong>Parties :</strong> {{parties_ccja}}</p><p><strong>Objet du contrat :</strong></p><p>{{objet_contrat}}</p><p>Tout litige né du présent contrat sera soumis à l'arbitrage de la CCJA, conformément à son Règlement d'arbitrage en vigueur.</p><p><strong>Nombre d'arbitres :</strong> {{nb_arbitres}}</p><p><strong>Siège :</strong> {{siege_ccja}}</p><p>La sentence rendue par la CCJA sera définitive et obligatoire. Les parties renoncent à tout recours devant les juridictions nationales en dehors de l'annulation prévue par le Traité OHADA.</p><p>Signé le {{date_ccja}}</p></div>`
  },

  {
    code: 'arb2_compromis',
    name: "Compromis d'arbitrage (après litige né)",
    category: 'juridique_admin',
    price: 10000,
    priceMax: 28000,
    description: "Compromis d'arbitrage conclu après la naissance du litige pour soumettre un différend déjà né à un tribunal arbitral, en dehors de toute clause préalable.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 77,
    fieldsJson: F([
      { key: 'parties_comp', label: "Parties au compromis", type: 'text', required: true },
      { key: 'litige_comp', label: "Description précise du litige soumis à l'arbitrage", type: 'textarea', required: true },
      { key: 'arbitres_comp', label: "Arbitre(s) désigné(s)", type: 'text', required: true },
      { key: 'delai_sentence', label: "Délai imparti pour rendre la sentence", type: 'text', required: true },
      { key: 'date_comp', label: "Date du compromis", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>COMPROMIS D'ARBITRAGE</h1><p><strong>Parties :</strong> {{parties_comp}}</p><p>Les parties, en présence d'un litige déjà né entre elles, conviennent de le soumettre à l'arbitrage.</p><p><strong>Litige soumis à l'arbitrage :</strong></p><p>{{litige_comp}}</p><p><strong>Arbitre(s) désigné(s) :</strong> {{arbitres_comp}}</p><p><strong>Délai pour rendre la sentence :</strong> {{delai_sentence}}</p><p>Les parties s'engagent à exécuter la sentence arbitrale comme si elle était une décision judiciaire définitive. Le présent compromis est signé le {{date_comp}}.</p></div>`
  },

  {
    code: 'arb2_trib_const',
    name: "Accord de constitution du tribunal arbitral (3 arbitres)",
    category: 'juridique_admin',
    price: 11000,
    priceMax: 30000,
    description: "Accord de constitution d'un tribunal arbitral de trois membres : désignation des co-arbitres par chaque partie et accord sur le président du tribunal.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 74,
    fieldsJson: F([
      { key: 'demandeur_arb', label: "Partie demanderesse", type: 'text', required: true },
      { key: 'defendeur_arb', label: "Partie défenderesse", type: 'text', required: true },
      { key: 'arbitre1', label: "Arbitre désigné par le demandeur", type: 'text', required: true },
      { key: 'arbitre2', label: "Arbitre désigné par le défendeur", type: 'text', required: true },
      { key: 'president', label: "Président du tribunal arbitral", type: 'text', required: true },
      { key: 'date_const', label: "Date de constitution", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE CONSTITUTION DU TRIBUNAL ARBITRAL</h1><p><strong>Demandeur :</strong> {{demandeur_arb}}</p><p><strong>Défendeur :</strong> {{defendeur_arb}}</p><p>Les parties conviennent de constituer un tribunal arbitral de trois membres :</p><ul><li><strong>Arbitre du demandeur :</strong> {{arbitre1}}</li><li><strong>Arbitre du défendeur :</strong> {{arbitre2}}</li><li><strong>Président :</strong> {{president}}</li></ul><p>Les arbitres ont accepté leur mission et ont déclaré leur indépendance et leur impartialité. Le tribunal est constitué le {{date_const}}.</p></div>`
  },

  {
    code: 'arb2_recus_arb',
    name: "Accord de récusation d'arbitre",
    category: 'juridique_admin',
    price: 8000,
    priceMax: 22000,
    description: "Requête et accord de récusation d'un arbitre pour cause de conflit d'intérêts, de partialité ou de manquement aux obligations d'indépendance dans une procédure arbitrale.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'partie_recus', label: "Partie demandant la récusation", type: 'text', required: true },
      { key: 'arbitre_recuse', label: "Arbitre visé par la récusation", type: 'text', required: true },
      { key: 'motifs_recus', label: "Motifs de la récusation", type: 'textarea', required: true },
      { key: 'preuves', label: "Éléments de preuve produits", type: 'textarea', required: true },
      { key: 'date_recus', label: "Date de la requête en récusation", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>REQUÊTE EN RÉCUSATION D'ARBITRE</h1><p><strong>Partie requérante :</strong> {{partie_recus}}</p><p><strong>Arbitre visé :</strong> {{arbitre_recuse}}</p><p><strong>Motifs de récusation :</strong></p><p>{{motifs_recus}}</p><p><strong>Preuves et pièces jointes :</strong></p><p>{{preuves}}</p><p>La présente requête est soumise à l'institution d'arbitrage ou au co-arbitres le {{date_recus}}. La partie adverse dispose d'un délai pour répondre conformément au règlement d'arbitrage applicable.</p></div>`
  },

  {
    code: 'arb2_jonc_inst',
    name: "Accord de jonction d'instances arbitrales",
    category: 'juridique_admin',
    price: 10000,
    priceMax: 28000,
    description: "Accord de jonction de plusieurs instances arbitrales connexes devant le même tribunal ou institution, pour une procédure plus efficace et des sentences cohérentes.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 63,
    fieldsJson: F([
      { key: 'instances', label: "Références des instances à joindre", type: 'textarea', required: true },
      { key: 'parties_jonc', label: "Toutes les parties concernées", type: 'textarea', required: true },
      { key: 'motif_jonc', label: "Motif de la jonction", type: 'textarea', required: true },
      { key: 'tribunal_jonc', label: "Tribunal arbitral compétent après jonction", type: 'text', required: true },
      { key: 'date_jonc', label: "Date de l'accord de jonction", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE JONCTION D'INSTANCES ARBITRALES</h1><p><strong>Instances à joindre :</strong></p><p>{{instances}}</p><p><strong>Parties :</strong></p><p>{{parties_jonc}}</p><p><strong>Motif de la jonction :</strong></p><p>{{motif_jonc}}</p><p><strong>Tribunal arbitral compétent :</strong> {{tribunal_jonc}}</p><p>Les parties et le tribunal arbitral acceptent la jonction des instances ci-dessus. La procédure jointe se déroulera selon le calendrier établi par le tribunal. Signé le {{date_jonc}}.</p></div>`
  },

  {
    code: 'arb2_mem_dem',
    name: "Mémoire en demande (statement of claim)",
    category: 'juridique_admin',
    price: 14000,
    priceMax: 40000,
    description: "Mémoire introductif d'instance arbitrale (statement of claim) exposant les faits, les fondements juridiques et les demandes du demandeur devant le tribunal arbitral.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 82,
    fieldsJson: F([
      { key: 'demandeur_mem', label: "Demandeur (identité complète)", type: 'text', required: true },
      { key: 'defendeur_mem', label: "Défendeur (identité complète)", type: 'text', required: true },
      { key: 'faits_mem', label: "Exposé des faits", type: 'textarea', required: true },
      { key: 'fondements', label: "Fondements juridiques de la demande", type: 'textarea', required: true },
      { key: 'demandes', label: "Demandes formulées au tribunal", type: 'textarea', required: true },
      { key: 'date_mem', label: "Date de dépôt du mémoire", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>MÉMOIRE EN DEMANDE</h1><h2>STATEMENT OF CLAIM</h2><p><strong>Demandeur :</strong> {{demandeur_mem}}</p><p><strong>Défendeur :</strong> {{defendeur_mem}}</p><p><strong>I. EXPOSÉ DES FAITS</strong></p><p>{{faits_mem}}</p><p><strong>II. FONDEMENTS JURIDIQUES</strong></p><p>{{fondements}}</p><p><strong>III. DEMANDES</strong></p><p>{{demandes}}</p><p>Déposé le {{date_mem}} auprès du tribunal arbitral.</p></div>`
  },

  {
    code: 'arb2_mem_def',
    name: "Mémoire en défense arbitrale",
    category: 'juridique_admin',
    price: 14000,
    priceMax: 38000,
    description: "Mémoire en défense du défendeur répondant au mémoire en demande, contestant les faits allégués et les fondements juridiques invoqués par le demandeur.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 79,
    fieldsJson: F([
      { key: 'defendeur_def', label: "Défendeur (identité)", type: 'text', required: true },
      { key: 'demandeur_def', label: "Demandeur (identité)", type: 'text', required: true },
      { key: 'contestation_faits', label: "Contestation des faits allégués", type: 'textarea', required: true },
      { key: 'moyens_def', label: "Moyens de défense et exceptions", type: 'textarea', required: true },
      { key: 'conclusions', label: "Conclusions : rejet des demandes", type: 'textarea', required: true },
      { key: 'date_def', label: "Date de dépôt de la défense", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>MÉMOIRE EN DÉFENSE ARBITRALE</h1><p><strong>Défendeur :</strong> {{defendeur_def}}</p><p><strong>Demandeur :</strong> {{demandeur_def}}</p><p><strong>I. CONTESTATION DES FAITS</strong></p><p>{{contestation_faits}}</p><p><strong>II. MOYENS DE DÉFENSE</strong></p><p>{{moyens_def}}</p><p><strong>III. CONCLUSIONS</strong></p><p>{{conclusions}}</p><p>Déposé le {{date_def}} auprès du tribunal arbitral.</p></div>`
  },

  {
    code: 'arb2_counterclaim',
    name: "Réponse au mémoire en demande (counterclaim)",
    category: 'juridique_admin',
    price: 12000,
    priceMax: 35000,
    description: "Demande reconventionnelle (counterclaim) du défendeur contestant les demandes du demandeur et formulant ses propres prétentions devant le tribunal arbitral.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 76,
    fieldsJson: F([
      { key: 'defendeur_cc', label: "Défendeur / Demandeur reconventionnel", type: 'text', required: true },
      { key: 'faits_cc', label: "Faits propres à la demande reconventionnelle", type: 'textarea', required: true },
      { key: 'fondements_cc', label: "Fondements juridiques de la reconvention", type: 'textarea', required: true },
      { key: 'demandes_cc', label: "Prétentions reconventionnelles", type: 'textarea', required: true },
      { key: 'date_cc', label: "Date de dépôt", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>DEMANDE RECONVENTIONNELLE (COUNTERCLAIM)</h1><p><strong>Demandeur reconventionnel :</strong> {{defendeur_cc}}</p><p><strong>I. FAITS</strong></p><p>{{faits_cc}}</p><p><strong>II. FONDEMENTS JURIDIQUES</strong></p><p>{{fondements_cc}}</p><p><strong>III. PRÉTENTIONS RECONVENTIONNELLES</strong></p><p>{{demandes_cc}}</p><p>Déposé le {{date_cc}} conformément au calendrier de procédure fixé par le tribunal arbitral.</p></div>`
  },

  {
    code: 'arb2_ord_proc',
    name: "Ordonnance de procédure arbitrale",
    category: 'juridique_admin',
    price: 9000,
    priceMax: 24000,
    description: "Ordonnance de procédure rendue par le tribunal arbitral fixant le calendrier, les délais de dépôt des mémoires, les langues et le mode de communication des pièces.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'tribunal_ord', label: "Composition du tribunal arbitral", type: 'text', required: true },
      { key: 'ref_arb', label: "Référence de l'affaire arbitrale", type: 'text', required: true },
      { key: 'calendrier_ord', label: "Calendrier de procédure détaillé", type: 'textarea', required: true },
      { key: 'regles_ord', label: "Règles de communication des pièces", type: 'textarea', required: true },
      { key: 'date_ord', label: "Date de l'ordonnance", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ORDONNANCE DE PROCÉDURE N° 1</h1><p><strong>Affaire :</strong> {{ref_arb}}</p><p><strong>Tribunal arbitral :</strong> {{tribunal_ord}}</p><p><strong>Calendrier de procédure :</strong></p><p>{{calendrier_ord}}</p><p><strong>Communication des pièces :</strong></p><p>{{regles_ord}}</p><p>La présente ordonnance est rendue le {{date_ord}} et s'impose aux parties. Toute dérogation au calendrier devra être autorisée par le tribunal.</p></div>`
  },

  {
    code: 'arb2_ord_cons',
    name: "Ordonnance sur les mesures conservatoires",
    category: 'juridique_admin',
    price: 10000,
    priceMax: 28000,
    description: "Ordonnance du tribunal arbitral ou du juge d'appui ordonnant des mesures conservatoires d'urgence pour préserver les droits d'une partie pendant la procédure.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 74,
    fieldsJson: F([
      { key: 'partie_dem_cons', label: "Partie demanderesse des mesures", type: 'text', required: true },
      { key: 'mesures', label: "Mesures conservatoires demandées et accordées", type: 'textarea', required: true },
      { key: 'urgence', label: "Justification de l'urgence", type: 'textarea', required: true },
      { key: 'garantie', label: "Garantie ou caution exigée (FCFA)", type: 'text', required: false },
      { key: 'date_cons', label: "Date de l'ordonnance", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ORDONNANCE DE MESURES CONSERVATOIRES</h1><p><strong>Demandeur :</strong> {{partie_dem_cons}}</p><p><strong>Mesures ordonnées :</strong></p><p>{{mesures}}</p><p><strong>Urgence justifiée par :</strong></p><p>{{urgence}}</p><p><strong>Garantie requise :</strong> {{garantie}} FCFA</p><p>La présente ordonnance est rendue le {{date_cons}} et prend effet immédiatement. Elle peut être révisée par le tribunal sur demande motivée de l'une des parties.</p></div>`
  },

  {
    code: 'arb2_rap_exp',
    name: "Rapport d'expert arbitral",
    category: 'juridique_admin',
    price: 13000,
    priceMax: 38000,
    description: "Rapport d'expertise rendu par un expert désigné par le tribunal arbitral pour éclairer les questions techniques, comptables ou scientifiques du litige.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 72,
    fieldsJson: F([
      { key: 'expert', label: "Expert désigné (identité, qualification)", type: 'text', required: true },
      { key: 'mission', label: "Mission d'expertise confiée par le tribunal", type: 'textarea', required: true },
      { key: 'constatations', label: "Constatations de l'expert", type: 'textarea', required: true },
      { key: 'avis', label: "Avis technique et conclusions", type: 'textarea', required: true },
      { key: 'date_exp', label: "Date du rapport d'expertise", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>RAPPORT D'EXPERTISE ARBITRALE</h1><p><strong>Expert :</strong> {{expert}}</p><p><strong>Mission :</strong></p><p>{{mission}}</p><p><strong>I. CONSTATATIONS</strong></p><p>{{constatations}}</p><p><strong>II. AVIS ET CONCLUSIONS</strong></p><p>{{avis}}</p><p>Le présent rapport est déposé auprès du tribunal arbitral le {{date_exp}}. L'expert s'est conformé à sa mission telle que définie par l'ordonnance de procédure.</p></div>`
  },

  {
    code: 'arb2_pv_aud',
    name: "Procès-verbal d'audience arbitrale",
    category: 'juridique_admin',
    price: 8000,
    priceMax: 22000,
    description: "Procès-verbal dressé par le secrétaire du tribunal arbitral relatant le déroulement d'une audience (plaidoiries, auditions de témoins, production de pièces).",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'ref_pv', label: "Référence de l'affaire", type: 'text', required: true },
      { key: 'composition_pv', label: "Composition du tribunal présent", type: 'text', required: true },
      { key: 'presents', label: "Parties et conseils présents", type: 'textarea', required: true },
      { key: 'deroulement_aud', label: "Déroulement de l'audience", type: 'textarea', required: true },
      { key: 'date_aud', label: "Date et heure de l'audience", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>PROCÈS-VERBAL D'AUDIENCE ARBITRALE</h1><p><strong>Affaire :</strong> {{ref_pv}}</p><p><strong>Tribunal :</strong> {{composition_pv}}</p><p><strong>Présents :</strong></p><p>{{presents}}</p><p><strong>Déroulement de l'audience :</strong></p><p>{{deroulement_aud}}</p><p>Le présent procès-verbal est établi le {{date_aud}} par le secrétaire d'arbitrage et signé par le président du tribunal.</p></div>`
  },

  {
    code: 'arb2_sent_part',
    name: "Sentence arbitrale partielle",
    category: 'juridique_admin',
    price: 15000,
    priceMax: 45000,
    description: "Sentence arbitrale partielle tranchant certaines questions préliminaires (compétence, droit applicable, responsabilité) avant la sentence définitive sur les réparations.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 76,
    fieldsJson: F([
      { key: 'ref_sent_part', label: "Référence de l'affaire", type: 'text', required: true },
      { key: 'questions', label: "Questions tranchées par la sentence partielle", type: 'textarea', required: true },
      { key: 'motifs_part', label: "Motifs de la sentence partielle", type: 'textarea', required: true },
      { key: 'dispositif_part', label: "Dispositif de la sentence partielle", type: 'textarea', required: true },
      { key: 'date_sent_part', label: "Date de la sentence", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>SENTENCE ARBITRALE PARTIELLE</h1><p><strong>Affaire :</strong> {{ref_sent_part}}</p><p><strong>Questions tranchées :</strong></p><p>{{questions}}</p><p><strong>MOTIFS</strong></p><p>{{motifs_part}}</p><p><strong>DISPOSITIF</strong></p><p>{{dispositif_part}}</p><p>La présente sentence partielle est rendue le {{date_sent_part}} par le tribunal arbitral siégeant en formation délibérante. Elle est définitive sur les points qu'elle tranche et susceptible d'exequatur.</p></div>`
  },

  {
    code: 'arb2_sent_def',
    name: "Sentence arbitrale définitive (dispositif)",
    category: 'juridique_admin',
    price: 18000,
    priceMax: 55000,
    description: "Sentence arbitrale définitive comprenant le dispositif complet : condamnations, réparations, partage des frais et clôture de la procédure arbitrale.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 90,
    fieldsJson: F([
      { key: 'ref_sent_def', label: "Référence de l'affaire", type: 'text', required: true },
      { key: 'tribunal_sent', label: "Composition du tribunal arbitral", type: 'text', required: true },
      { key: 'motifs_def', label: "Principaux motifs de la sentence", type: 'textarea', required: true },
      { key: 'dispositif_def', label: "Dispositif complet de la sentence", type: 'textarea', required: true },
      { key: 'frais', label: "Partage des frais d'arbitrage", type: 'text', required: true },
      { key: 'date_sent_def', label: "Date de la sentence définitive", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>SENTENCE ARBITRALE DÉFINITIVE</h1><p><strong>Affaire :</strong> {{ref_sent_def}}</p><p><strong>Tribunal arbitral :</strong> {{tribunal_sent}}</p><p><strong>MOTIFS</strong></p><p>{{motifs_def}}</p><p><strong>DISPOSITIF</strong></p><p>{{dispositif_def}}</p><p><strong>FRAIS D'ARBITRAGE :</strong> {{frais}}</p><p>La présente sentence est définitive et obligatoire pour les parties. Elle est rendue le {{date_sent_def}} et peut faire l'objet d'une procédure d'exequatur devant les juridictions compétentes pour son exécution forcée.</p></div>`
  },

  {
    code: 'arb2_interp_sent',
    name: "Accord d'interprétation de sentence arbitrale",
    category: 'juridique_admin',
    price: 8000,
    priceMax: 22000,
    description: "Requête et accord d'interprétation d'une sentence arbitrale dont le dispositif est ambigu ou peu clair, adressés au tribunal arbitral initial.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 64,
    fieldsJson: F([
      { key: 'ref_interp', label: "Référence de la sentence à interpréter", type: 'text', required: true },
      { key: 'partie_req', label: "Partie requérante", type: 'text', required: true },
      { key: 'passage_ambigu', label: "Passage ambigu et motif de la demande", type: 'textarea', required: true },
      { key: 'interpretation', label: "Interprétation proposée ou rendue", type: 'textarea', required: true },
      { key: 'date_interp', label: "Date de l'accord d'interprétation", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD D'INTERPRÉTATION DE SENTENCE ARBITRALE</h1><p><strong>Sentence de référence :</strong> {{ref_interp}}</p><p><strong>Partie requérante :</strong> {{partie_req}}</p><p><strong>Passage ambigu :</strong></p><p>{{passage_ambigu}}</p><p><strong>Interprétation :</strong></p><p>{{interpretation}}</p><p>La présente interprétation fait partie intégrante de la sentence arbitrale initiale et entre en vigueur le {{date_interp}}.</p></div>`
  },

  {
    code: 'arb2_correct_sent',
    name: "Accord de correction de sentence (erreur matérielle)",
    category: 'juridique_admin',
    price: 6000,
    priceMax: 16000,
    description: "Requête en correction d'erreur matérielle (chiffres, noms, dates) dans une sentence arbitrale, sans modification du fond de la décision.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'ref_correct', label: "Référence de la sentence à corriger", type: 'text', required: true },
      { key: 'erreur_mat', label: "Erreur matérielle constatée", type: 'textarea', required: true },
      { key: 'correction', label: "Correction apportée", type: 'textarea', required: true },
      { key: 'date_correct', label: "Date de la correction", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CORRECTION D'ERREUR MATÉRIELLE</h1><h2>SENTENCE ARBITRALE N° {{ref_correct}}</h2><p><strong>Erreur matérielle identifiée :</strong></p><p>{{erreur_mat}}</p><p><strong>Correction apportée :</strong></p><p>{{correction}}</p><p>La présente correction est rendue le {{date_correct}} par le tribunal arbitral. Elle ne modifie pas le fond de la sentence mais rectifie une erreur purement matérielle. Elle fait partie intégrante de la sentence initiale.</p></div>`
  },

  {
    code: 'arb2_recours_ann',
    name: "Accord de recours en annulation de sentence (CCJA)",
    category: 'juridique_admin',
    price: 14000,
    priceMax: 40000,
    description: "Mémoire introductif d'un recours en annulation de sentence arbitrale devant la CCJA, fondé sur les cas limitativement énumérés par le Traité OHADA.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 78,
    fieldsJson: F([
      { key: 'requerant_ann', label: "Partie requérante (demandeur en annulation)", type: 'text', required: true },
      { key: 'sent_contestee', label: "Sentence arbitrale contestée (référence)", type: 'text', required: true },
      { key: 'moyens_ann', label: "Moyens d'annulation invoqués", type: 'textarea', required: true },
      { key: 'conclusion_ann', label: "Conclusions au fond", type: 'textarea', required: true },
      { key: 'date_ann', label: "Date de dépôt du recours", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>RECOURS EN ANNULATION DE SENTENCE ARBITRALE</h1><h2>DEVANT LA COUR COMMUNE DE JUSTICE ET D'ARBITRAGE (CCJA)</h2><p><strong>Requérant :</strong> {{requerant_ann}}</p><p><strong>Sentence contestée :</strong> {{sent_contestee}}</p><p><strong>I. MOYENS D'ANNULATION</strong></p><p>{{moyens_ann}}</p><p><strong>II. CONCLUSIONS</strong></p><p>{{conclusion_ann}}</p><p>Le présent recours est déposé le {{date_ann}} dans le délai légal prévu par le Traité OHADA et le Règlement d'arbitrage de la CCJA.</p></div>`
  },

  {
    code: 'arb2_exequatur',
    name: "Accord d'exequatur de sentence OHADA",
    category: 'juridique_admin',
    price: 10000,
    priceMax: 28000,
    description: "Requête en exequatur d'une sentence arbitrale OHADA devant le juge étatique compétent, pour obtenir la force exécutoire permettant l'exécution forcée en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 82,
    fieldsJson: F([
      { key: 'creancier', label: "Créancier de la sentence (partie gagnante)", type: 'text', required: true },
      { key: 'debiteur', label: "Débiteur de la sentence (partie perdante)", type: 'text', required: true },
      { key: 'sent_exequatur', label: "Référence de la sentence à rendre exécutoire", type: 'text', required: true },
      { key: 'condamnation', label: "Condamnation prononcée (montant/obligation)", type: 'textarea', required: true },
      { key: 'date_req', label: "Date de la requête en exequatur", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>REQUÊTE EN EXEQUATUR DE SENTENCE ARBITRALE OHADA</h1><p><strong>Requérant (créancier) :</strong> {{creancier}}</p><p><strong>Débiteur :</strong> {{debiteur}}</p><p><strong>Sentence :</strong> {{sent_exequatur}}</p><p><strong>Condamnation :</strong></p><p>{{condamnation}}</p><p>Le requérant sollicite du Président du Tribunal compétent l'apposition de la formule exécutoire sur la sentence arbitrale ci-dessus mentionnée, conformément à l'Acte Uniforme relatif à l'arbitrage OHADA.</p><p>Déposée le {{date_req}}</p></div>`
  },

  {
    code: 'arb2_recon_cci',
    name: "Accord de reconnaissance de sentence CCI à l'étranger",
    category: 'juridique_admin',
    price: 16000,
    priceMax: 48000,
    description: "Requête en reconnaissance et exequatur d'une sentence arbitrale CCI (ou autre institution internationale) prononcée à l'étranger, devant les juridictions ivoiriennes.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 74,
    fieldsJson: F([
      { key: 'partie_recon', label: "Partie requérante", type: 'text', required: true },
      { key: 'sent_etrang', label: "Sentence étrangère (institution, date, lieu)", type: 'text', required: true },
      { key: 'conditions_conv', label: "Convention internationale applicable (New York 1958...)", type: 'text', required: true },
      { key: 'objet_recon', label: "Objet de la reconnaissance", type: 'textarea', required: true },
      { key: 'date_recon', label: "Date de la requête", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>REQUÊTE EN RECONNAISSANCE DE SENTENCE ÉTRANGÈRE</h1><h2>SENTENCE CCI / ARBITRAGE INTERNATIONAL</h2><p><strong>Requérant :</strong> {{partie_recon}}</p><p><strong>Sentence étrangère :</strong> {{sent_etrang}}</p><p><strong>Convention applicable :</strong> {{conditions_conv}}</p><p><strong>Objet :</strong></p><p>{{objet_recon}}</p><p>En application de la Convention de New York du 10 juin 1958 et du droit ivoirien de l'arbitrage, le requérant sollicite la reconnaissance et l'exequatur de la sentence ci-dessus devant la juridiction compétente. Déposée le {{date_recon}}.</p></div>`
  },

  {
    code: 'arb2_serv_arb',
    name: "Accord de service d'arbitre indépendant",
    category: 'juridique_admin',
    price: 10000,
    priceMax: 28000,
    description: "Convention de service conclue entre un arbitre indépendant et les parties, définissant sa mission, ses honoraires et ses obligations déontologiques.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'arbitre_serv', label: "Arbitre (identité, qualifications)", type: 'text', required: true },
      { key: 'parties_serv', label: "Parties au litige", type: 'text', required: true },
      { key: 'mission_arb', label: "Mission de l'arbitre", type: 'textarea', required: true },
      { key: 'honoraires_arb', label: "Honoraires de l'arbitre (FCFA)", type: 'text', required: true },
      { key: 'date_serv', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONVENTION DE SERVICE D'ARBITRE INDÉPENDANT</h1><p><strong>Arbitre :</strong> {{arbitre_serv}}</p><p><strong>Parties :</strong> {{parties_serv}}</p><p><strong>Mission :</strong></p><p>{{mission_arb}}</p><p><strong>Honoraires :</strong> {{honoraires_arb}} FCFA</p><p>L'arbitre accepte sa mission et s'engage à conduire la procédure avec diligence, indépendance et impartialité. Il n'a aucun conflit d'intérêts avec les parties et s'engage à en informer les parties de tout élément nouveau susceptible d'affecter son indépendance.</p><p>Signé le {{date_serv}}</p></div>`
  },

  {
    code: 'arb2_serv_sec',
    name: "Accord de service de secrétariat d'arbitrage",
    category: 'juridique_admin',
    price: 8000,
    priceMax: 22000,
    description: "Convention de prestation de services entre un secrétariat d'arbitrage et les parties, couvrant la gestion administrative de la procédure arbitrale.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 62,
    fieldsJson: F([
      { key: 'secretariat', label: "Prestataire secrétariat d'arbitrage", type: 'text', required: true },
      { key: 'parties_sec', label: "Parties concernées", type: 'text', required: true },
      { key: 'prestations', label: "Prestations de secrétariat incluses", type: 'textarea', required: true },
      { key: 'tarif_sec', label: "Tarif du secrétariat (FCFA)", type: 'text', required: true },
      { key: 'date_sec', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONVENTION DE SERVICE DE SECRÉTARIAT D'ARBITRAGE</h1><p><strong>Secrétariat :</strong> {{secretariat}}</p><p><strong>Parties :</strong> {{parties_sec}}</p><p><strong>Prestations :</strong></p><p>{{prestations}}</p><p><strong>Tarif :</strong> {{tarif_sec}} FCFA</p><p>Le secrétariat assure la réception et la transmission des actes de procédure, la tenue des délais, la gestion des communications entre le tribunal et les parties, ainsi que la conservation des archives de la procédure. Signé le {{date_sec}}.</p></div>`
  },

  {
    code: 'arb2_partner_bat',
    name: "Accord de partenariat centre d'arbitrage-association bâtonnier",
    category: 'juridique_admin',
    price: 11000,
    priceMax: 30000,
    description: "Accord de partenariat institutionnel entre un centre d'arbitrage et le Barreau de Côte d'Ivoire pour la promotion de l'arbitrage et la formation des avocats arbitres.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'centre_part', label: "Centre d'arbitrage partenaire", type: 'text', required: true },
      { key: 'barreau', label: "Barreau / Association du bâtonnier", type: 'text', required: true },
      { key: 'objet_partner', label: "Objet du partenariat", type: 'textarea', required: true },
      { key: 'engagements_part', label: "Engagements réciproques des partenaires", type: 'textarea', required: true },
      { key: 'date_partner', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT</h1><h2>CENTRE D'ARBITRAGE ET BARREAU</h2><p><strong>Centre d'arbitrage :</strong> {{centre_part}}</p><p><strong>Barreau / Association :</strong> {{barreau}}</p><p><strong>Objet du partenariat :</strong></p><p>{{objet_partner}}</p><p><strong>Engagements réciproques :</strong></p><p>{{engagements_part}}</p><p>Le présent accord de partenariat est conclu pour une durée de trois (3) ans renouvelable. Il entre en vigueur à la date de sa signature le {{date_partner}}.</p></div>`
  },

  {
    code: 'arb2_rapport_ann',
    name: "Rapport annuel du centre d'arbitrage",
    category: 'juridique_admin',
    price: 12000,
    priceMax: 32000,
    description: "Rapport annuel d'activités d'un centre d'arbitrage présentant les statistiques de l'année, les affaires traitées, les finances et les perspectives de développement.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 63,
    fieldsJson: F([
      { key: 'centre_rap', label: "Centre d'arbitrage (dénomination)", type: 'text', required: true },
      { key: 'annee_rap', label: "Année de référence du rapport", type: 'text', required: true },
      { key: 'stats', label: "Statistiques des affaires (nombre, types, montants)", type: 'textarea', required: true },
      { key: 'bilan_fin', label: "Bilan financier de l'exercice", type: 'textarea', required: true },
      { key: 'perspectives', label: "Perspectives et axes de développement", type: 'textarea', required: true },
      { key: 'date_rap_ann', label: "Date d'approbation du rapport", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>RAPPORT ANNUEL D'ACTIVITÉS</h1><h2>{{centre_rap}} - EXERCICE {{annee_rap}}</h2><p><strong>I. STATISTIQUES DES AFFAIRES</strong></p><p>{{stats}}</p><p><strong>II. BILAN FINANCIER</strong></p><p>{{bilan_fin}}</p><p><strong>III. PERSPECTIVES</strong></p><p>{{perspectives}}</p><p>Le présent rapport annuel est approuvé par les organes de direction du centre le {{date_rap_ann}} et sera diffusé aux parties prenantes et aux autorités compétentes.</p></div>`
  },

  {
    code: 'arb2_charte_arb',
    name: "Charte de l'arbitrage international en Afrique francophone",
    category: 'juridique_admin',
    price: 9000,
    priceMax: 25000,
    description: "Charte de bonnes pratiques de l'arbitrage international en Afrique francophone, définissant les principes d'éthique, d'efficacité et d'accessibilité des tribunaux arbitraux.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 72,
    fieldsJson: F([
      { key: 'org_charte_arb', label: "Organisation émettrice de la charte", type: 'text', required: true },
      { key: 'principes_arb', label: "Principes fondamentaux de l'arbitrage", type: 'textarea', required: true },
      { key: 'bonnes_pratiques', label: "Bonnes pratiques recommandées", type: 'textarea', required: true },
      { key: 'adhesion', label: "Modalités d'adhésion à la charte", type: 'textarea', required: true },
      { key: 'date_charte_arb', label: "Date d'adoption de la charte", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CHARTE DE L'ARBITRAGE INTERNATIONAL EN AFRIQUE FRANCOPHONE</h1><p>Adoptée par : {{org_charte_arb}}</p><p><strong>I. PRINCIPES FONDAMENTAUX</strong></p><p>{{principes_arb}}</p><p><strong>II. BONNES PRATIQUES</strong></p><p>{{bonnes_pratiques}}</p><p><strong>III. MODALITÉS D'ADHÉSION</strong></p><p>{{adhesion}}</p><p>La présente charte est adoptée le {{date_charte_arb}} et constitue un référentiel de qualité pour les praticiens de l'arbitrage international dans l'espace francophone africain et la zone OHADA.</p></div>`
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
  console.log(`Batch 79b OK — créés:${created} maj:${updated} TOTAL:${total}`);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
