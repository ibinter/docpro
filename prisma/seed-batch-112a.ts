import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ─── 25 templates Jurisprudence OHADA / Contentieux commercial (juri2_) ───
  {
    code: 'juri2_mise_en_demeure',
    name: "Lettre de mise en demeure de payer",
    category: 'juridique_admin',
    price: 5000,
    priceMax: 15000,
    description: "Lettre formelle de mise en demeure adressée à un débiteur pour exiger le paiement d'une créance sous délai, conforme au droit OHADA.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 80,
    fieldsJson: F([
      { key: 'creancier_nom', label: "Nom du créancier", type: 'text', required: true },
      { key: 'debiteur_nom', label: "Nom du débiteur", type: 'text', required: true },
      { key: 'montant_du', label: "Montant dû (FCFA)", type: 'text', required: true },
      { key: 'delai_paiement', label: "Délai accordé (jours)", type: 'text', required: true },
      { key: 'date_lettre', label: "Date de la lettre", type: 'date', required: true },
      { key: 'reference_creance', label: "Référence de la créance", type: 'text', required: false }
    ]),
    body: `<div class="doc"><h1>LETTRE DE MISE EN DEMEURE DE PAYER</h1><p>Abidjan, le {{date_lettre}}</p><p>De : <strong>{{creancier_nom}}</strong><br/>À : <strong>{{debiteur_nom}}</strong></p><h2>OBJET : Mise en demeure de payer la somme de {{montant_du}} FCFA</h2><p>Monsieur / Madame,</p><p>Par la présente, nous vous mettons en demeure de nous régler, dans un délai de <strong>{{delai_paiement}} jours</strong> à compter de la réception de ce courrier, la somme de <strong>{{montant_du}} FCFA</strong> correspondant à la créance référencée <strong>{{reference_creance}}</strong> que vous nous devez.</p><p>À défaut de paiement dans ce délai, nous nous réserverons le droit de saisir la juridiction compétente et d'engager toutes voies d'exécution prévues par l'Acte Uniforme OHADA portant organisation des procédures simplifiées de recouvrement et des voies d'exécution.</p><p>Veuillez agréer, Monsieur / Madame, l'expression de nos salutations distinguées.</p><p><strong>{{creancier_nom}}</strong></p></div>`
  },
  {
    code: 'juri2_injonction_payer',
    name: "Requête en injonction de payer (procédure OHADA)",
    category: 'juridique_admin',
    price: 6000,
    priceMax: 18000,
    description: "Requête aux fins d'injonction de payer conforme à l'Acte Uniforme OHADA portant organisation des procédures simplifiées de recouvrement.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 82,
    fieldsJson: F([
      { key: 'requérant_nom', label: "Nom du requérant (créancier)", type: 'text', required: true },
      { key: 'debiteur_nom', label: "Nom du débiteur", type: 'text', required: true },
      { key: 'montant_creance', label: "Montant de la créance (FCFA)", type: 'text', required: true },
      { key: 'origine_creance', label: "Origine et nature de la créance", type: 'textarea', required: true },
      { key: 'juridiction', label: "Juridiction saisie", type: 'text', required: true },
      { key: 'date_requete', label: "Date de la requête", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>REQUÊTE EN INJONCTION DE PAYER</h1><p>(Acte Uniforme OHADA du 10 avril 1998)</p><p>Date : {{date_requete}}</p><h2>AU PRÉSIDENT DU {{juridiction}}</h2><p><strong>REQUÉRANT :</strong> {{requérant_nom}}</p><p><strong>DÉBITEUR :</strong> {{debiteur_nom}}</p><h2>OBJET DE LA REQUÊTE</h2><p>Le requérant a l'honneur de soumettre à votre juridiction la présente requête aux fins d'injonction de payer la somme de <strong>{{montant_creance}} FCFA</strong>.</p><h2>FAITS ET MOYENS</h2><p>{{origine_creance}}</p><h2>DEMANDE</h2><p>En conséquence, le requérant vous demande de bien vouloir rendre une ordonnance portant injonction faite au débiteur <strong>{{debiteur_nom}}</strong> de payer la somme de <strong>{{montant_creance}} FCFA</strong>, conformément aux articles 1 et suivants de l'Acte Uniforme OHADA.</p><p><strong>{{requérant_nom}}</strong></p></div>`
  },
  {
    code: 'juri2_saisie_attribution',
    name: "Accord de saisie-attribution de créances",
    category: 'juridique_admin',
    price: 7000,
    priceMax: 20000,
    description: "Acte de saisie-attribution de créances pratiqué entre les mains d'un tiers, conformément à l'AUPSRVE OHADA.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'saisissant_nom', label: "Nom du créancier saisissant", type: 'text', required: true },
      { key: 'debiteur_saisi_nom', label: "Nom du débiteur saisi", type: 'text', required: true },
      { key: 'tiers_saisi_nom', label: "Nom du tiers saisi", type: 'text', required: true },
      { key: 'montant_saisie', label: "Montant de la saisie (FCFA)", type: 'text', required: true },
      { key: 'titre_executoire', label: "Référence du titre exécutoire", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>ACTE DE SAISIE-ATTRIBUTION DE CRÉANCES</h1><p>(Articles 153 et suivants AUPSRVE OHADA)</p><p><strong>CRÉANCIER SAISISSANT :</strong> {{saisissant_nom}}</p><p><strong>DÉBITEUR SAISI :</strong> {{debiteur_saisi_nom}}</p><p><strong>TIERS SAISI :</strong> {{tiers_saisi_nom}}</p><h2>OBJET</h2><p>En vertu du titre exécutoire référencé <strong>{{titre_executoire}}</strong>, il est procédé à la saisie-attribution entre les mains du tiers saisi <strong>{{tiers_saisi_nom}}</strong> de toutes les sommes et créances appartenant au débiteur <strong>{{debiteur_saisi_nom}}</strong>, jusqu'à concurrence de <strong>{{montant_saisie}} FCFA</strong>.</p><p>Le tiers saisi est requis de déclarer l'étendue de ses obligations envers le débiteur et les modalités qui pourraient les affecter, conformément à l'article 156 AUPSRVE.</p></div>`
  },
  {
    code: 'juri2_saisie_vente',
    name: "Accord de saisie-vente de biens meubles (voie d'exécution OHADA)",
    category: 'juridique_admin',
    price: 7000,
    priceMax: 21000,
    description: "Procès-verbal de saisie-vente portant sur des biens meubles corporels, voie d'exécution prévue par l'AUPSRVE OHADA.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'creancier_nom', label: "Nom du créancier", type: 'text', required: true },
      { key: 'debiteur_nom', label: "Nom du débiteur", type: 'text', required: true },
      { key: 'biens_saisis', label: "Description des biens saisis", type: 'textarea', required: true },
      { key: 'montant_creance', label: "Montant de la créance (FCFA)", type: 'text', required: true },
      { key: 'date_saisie', label: "Date de la saisie", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>PROCÈS-VERBAL DE SAISIE-VENTE DE BIENS MEUBLES</h1><p>(Articles 91 et suivants AUPSRVE OHADA)</p><p>En date du <strong>{{date_saisie}}</strong>,</p><p><strong>CRÉANCIER :</strong> {{creancier_nom}}<br/><strong>DÉBITEUR :</strong> {{debiteur_nom}}</p><h2>OBJET</h2><p>En vertu d'un titre exécutoire et pour avoir paiement de la somme de <strong>{{montant_creance}} FCFA</strong>, il a été procédé à la saisie des biens meubles corporels appartenant au débiteur, désignés comme suit :</p><p>{{biens_saisis}}</p><h2>MISE EN GARDE</h2><p>Le débiteur est informé que les biens saisis seront vendus aux enchères publiques à l'expiration du délai légal si la créance n'est pas réglée, conformément aux dispositions de l'AUPSRVE.</p></div>`
  },
  {
    code: 'juri2_saisie_immobiliere',
    name: "Accord de saisie immobilière (OHADA)",
    category: 'juridique_admin',
    price: 10000,
    priceMax: 35000,
    description: "Commandement valant saisie immobilière, procédure d'exécution forcée sur immeuble conforme à l'OHADA et au droit ivoirien.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'creancier_nom', label: "Nom du créancier poursuivant", type: 'text', required: true },
      { key: 'debiteur_nom', label: "Nom du débiteur propriétaire", type: 'text', required: true },
      { key: 'description_immeuble', label: "Description de l'immeuble", type: 'textarea', required: true },
      { key: 'montant_creance', label: "Montant de la créance (FCFA)", type: 'text', required: true },
      { key: 'titre_foncier', label: "Numéro du titre foncier", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>COMMANDEMENT VALANT SAISIE IMMOBILIÈRE</h1><p>(Acte Uniforme OHADA portant organisation des procédures simplifiées de recouvrement)</p><p><strong>CRÉANCIER POURSUIVANT :</strong> {{creancier_nom}}<br/><strong>DÉBITEUR :</strong> {{debiteur_nom}}</p><h2>OBJET</h2><p>En vertu d'un titre exécutoire, et pour avoir paiement de la somme de <strong>{{montant_creance}} FCFA</strong>, il est signifié commandement de payer au débiteur, faute de quoi l'immeuble ci-après désigné sera saisi et vendu en justice.</p><h2>DÉSIGNATION DE L'IMMEUBLE</h2><p>{{description_immeuble}}</p><p>Titre foncier n° <strong>{{titre_foncier}}</strong></p><h2>DÉLAI</h2><p>Le débiteur dispose d'un délai légal pour s'acquitter ou formuler opposition, conformément aux textes OHADA en vigueur.</p></div>`
  },
  {
    code: 'juri2_assignation_tribunal',
    name: "Accord d'assignation en justice (Tribunal de Commerce CI)",
    category: 'juridique_admin',
    price: 7000,
    priceMax: 22000,
    description: "Acte d'assignation à comparaître devant le Tribunal de Commerce d'Abidjan en matière de contentieux commercial.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 75,
    fieldsJson: F([
      { key: 'demandeur_nom', label: "Nom du demandeur", type: 'text', required: true },
      { key: 'defendeur_nom', label: "Nom du défendeur", type: 'text', required: true },
      { key: 'objet_litige', label: "Objet du litige", type: 'textarea', required: true },
      { key: 'montant_reclame', label: "Montant réclamé (FCFA)", type: 'text', required: true },
      { key: 'date_audience', label: "Date d'audience", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>ACTE D'ASSIGNATION</h1><h2>TRIBUNAL DE COMMERCE D'ABIDJAN</h2><p><strong>DEMANDEUR :</strong> {{demandeur_nom}}<br/><strong>DÉFENDEUR :</strong> {{defendeur_nom}}</p><h2>OBJET DU LITIGE</h2><p>{{objet_litige}}</p><h2>PRÉTENTIONS</h2><p>Le demandeur sollicite la condamnation du défendeur au paiement de la somme de <strong>{{montant_reclame}} FCFA</strong> ainsi que tous dommages et intérêts, frais et dépens.</p><h2>CONVOCATION</h2><p>Le défendeur est assigné à comparaître à l'audience du <strong>{{date_audience}}</strong> du Tribunal de Commerce d'Abidjan, sous peine de jugement rendu par défaut.</p><p>Pour valoir ce que de droit.</p></div>`
  },
  {
    code: 'juri2_plainte_partie_civile',
    name: "Accord de plainte avec constitution de partie civile",
    category: 'juridique_admin',
    price: 6000,
    priceMax: 18000,
    description: "Lettre de plainte avec constitution de partie civile déposée devant le Doyen des Juges d'instruction en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'plaignant_nom', label: "Nom du plaignant", type: 'text', required: true },
      { key: 'mis_en_cause_nom', label: "Nom du mis en cause", type: 'text', required: true },
      { key: 'faits_incrimines', label: "Description des faits incriminés", type: 'textarea', required: true },
      { key: 'prejudice_subi', label: "Nature et montant du préjudice (FCFA)", type: 'text', required: true },
      { key: 'date_plainte', label: "Date de la plainte", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>PLAINTE AVEC CONSTITUTION DE PARTIE CIVILE</h1><p>Abidjan, le {{date_plainte}}</p><h2>À MONSIEUR LE DOYEN DES JUGES D'INSTRUCTION<br/>TRIBUNAL DE PREMIÈRE INSTANCE D'ABIDJAN</h2><p><strong>PLAIGNANT :</strong> {{plaignant_nom}}</p><p><strong>MIS EN CAUSE :</strong> {{mis_en_cause_nom}}</p><h2>EXPOSÉ DES FAITS</h2><p>{{faits_incrimines}}</p><h2>PRÉJUDICE</h2><p>Le plaignant a subi un préjudice évalué à <strong>{{prejudice_subi}} FCFA</strong>.</p><h2>DEMANDE</h2><p>Le plaignant dépose la présente plainte avec constitution de partie civile et sollicite l'ouverture d'une information judiciaire contre le mis en cause pour les faits susvisés. Il se réserve le droit de chiffrer et d'étendre ses demandes en réparation au cours de l'instruction.</p><p><strong>{{plaignant_nom}}</strong></p></div>`
  },
  {
    code: 'juri2_plainte_abs',
    name: "Accord de plainte pour abus de biens sociaux (ABS)",
    category: 'juridique_admin',
    price: 8000,
    priceMax: 25000,
    description: "Plainte pénale pour abus de biens sociaux visant un dirigeant social, infraction prévue par l'Acte Uniforme OHADA relatif au droit des sociétés commerciales.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 67,
    fieldsJson: F([
      { key: 'societe_nom', label: "Dénomination sociale de la société", type: 'text', required: true },
      { key: 'dirigeant_mis_en_cause', label: "Nom du dirigeant mis en cause", type: 'text', required: true },
      { key: 'actes_incrimines', label: "Description des actes d'abus de biens sociaux", type: 'textarea', required: true },
      { key: 'montant_detourne', label: "Montant estimé détourné (FCFA)", type: 'text', required: true },
      { key: 'plaignant_qualite', label: "Qualité du plaignant (associé, actionnaire...)", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>PLAINTE POUR ABUS DE BIENS SOCIAUX</h1><h2>À MONSIEUR LE DOYEN DES JUGES D'INSTRUCTION<br/>TRIBUNAL DE PREMIÈRE INSTANCE D'ABIDJAN</h2><p><strong>SOCIÉTÉ :</strong> {{societe_nom}}<br/><strong>DIRIGEANT MIS EN CAUSE :</strong> {{dirigeant_mis_en_cause}}<br/><strong>QUALITÉ DU PLAIGNANT :</strong> {{plaignant_qualite}}</p><h2>EXPOSÉ DES FAITS</h2><p>{{actes_incrimines}}</p><h2>QUALIFICATION JURIDIQUE</h2><p>Les faits ainsi décrits constituent l'infraction d'abus de biens sociaux au sens de l'article 891 de l'Acte Uniforme OHADA relatif au droit des sociétés commerciales et du groupement d'intérêt économique, le dirigeant ayant utilisé les biens de la société à des fins personnelles contraires à l'intérêt social.</p><h2>PRÉJUDICE</h2><p>Le préjudice subi par la société est estimé à <strong>{{montant_detourne}} FCFA</strong>.</p><p>Le plaignant sollicite l'ouverture d'une information judiciaire et se constitue partie civile.</p></div>`
  },
  {
    code: 'juri2_plainte_escroquerie',
    name: "Accord de plainte pour escroquerie commerciale",
    category: 'juridique_admin',
    price: 6000,
    priceMax: 18000,
    description: "Plainte pénale pour escroquerie en matière commerciale, fondée sur les dispositions du Code pénal ivoirien.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 72,
    fieldsJson: F([
      { key: 'victime_nom', label: "Nom de la victime", type: 'text', required: true },
      { key: 'auteur_presume', label: "Nom de l'auteur présumé", type: 'text', required: true },
      { key: 'manoeuvres_frauduleuses', label: "Description des manoeuvres frauduleuses", type: 'textarea', required: true },
      { key: 'somme_escroquee', label: "Somme escroquée (FCFA)", type: 'text', required: true },
      { key: 'date_faits', label: "Date des faits", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>PLAINTE POUR ESCROQUERIE COMMERCIALE</h1><h2>À MONSIEUR LE PROCUREUR DE LA RÉPUBLIQUE<br/>TRIBUNAL DE PREMIÈRE INSTANCE D'ABIDJAN</h2><p><strong>VICTIME :</strong> {{victime_nom}}<br/><strong>AUTEUR PRÉSUMÉ :</strong> {{auteur_presume}}</p><h2>EXPOSÉ DES FAITS</h2><p>Le {{date_faits}}, l'auteur présumé a, par des manoeuvres frauduleuses, trompé la victime et obtenu la remise de la somme de <strong>{{somme_escroquee}} FCFA</strong>.</p><p>Description des manoeuvres : {{manoeuvres_frauduleuses}}</p><h2>QUALIFICATION</h2><p>Ces faits sont constitutifs de l'infraction d'escroquerie prévue et réprimée par le Code pénal de la République de Côte d'Ivoire.</p><p>La victime sollicite des poursuites et se constitue partie civile.</p><p><strong>{{victime_nom}}</strong></p></div>`
  },
  {
    code: 'juri2_recours_ccja',
    name: "Accord de recours en annulation d'une décision de la CCJA",
    category: 'juridique_admin',
    price: 12000,
    priceMax: 40000,
    description: "Requête en annulation d'une décision de la Cour Commune de Justice et d'Arbitrage (CCJA) de l'OHADA pour excès de pouvoir ou violation des principes fondamentaux.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 55,
    fieldsJson: F([
      { key: 'requerant_nom', label: "Nom du requérant", type: 'text', required: true },
      { key: 'decision_attaquee', label: "Référence de la décision attaquée", type: 'text', required: true },
      { key: 'moyens_annulation', label: "Moyens et arguments d'annulation", type: 'textarea', required: true },
      { key: 'date_decision', label: "Date de la décision contestée", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>REQUÊTE EN ANNULATION</h1><h2>DEVANT LA COUR COMMUNE DE JUSTICE ET D'ARBITRAGE (CCJA)<br/>OHADA — ABIDJAN</h2><p><strong>REQUÉRANT :</strong> {{requerant_nom}}</p><h2>DÉCISION CONTESTÉE</h2><p>Décision n° <strong>{{decision_attaquee}}</strong> rendue le <strong>{{date_decision}}</strong>.</p><h2>MOYENS D'ANNULATION</h2><p>{{moyens_annulation}}</p><h2>DEMANDE</h2><p>Le requérant sollicite respectueusement de la CCJA qu'elle prononce l'annulation de la décision susvisée pour les motifs exposés, et statue à nouveau sur l'affaire ou renvoie devant la juridiction compétente, conformément au Règlement de procédure de la CCJA.</p><p><strong>{{requerant_nom}}</strong></p></div>`
  },
  {
    code: 'juri2_mesures_conservatoires',
    name: "Accord de demande de mesures conservatoires (OHADA)",
    category: 'juridique_admin',
    price: 7000,
    priceMax: 21000,
    description: "Requête aux fins d'obtention de mesures conservatoires en urgence, conformément à l'Acte Uniforme OHADA sur les procédures simplifiées de recouvrement.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'requerant_nom', label: "Nom du requérant", type: 'text', required: true },
      { key: 'creance_a_proteger', label: "Nature et montant de la créance à protéger", type: 'textarea', required: true },
      { key: 'biens_a_saisir', label: "Biens ou créances visés", type: 'textarea', required: true },
      { key: 'urgence_justification', label: "Justification de l'urgence", type: 'textarea', required: true },
      { key: 'juridiction', label: "Juridiction saisie", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>REQUÊTE AUX FINS DE MESURES CONSERVATOIRES</h1><p>(Articles 50 et suivants AUPSRVE OHADA)</p><h2>À MONSIEUR LE PRÉSIDENT DU {{juridiction}}</h2><p><strong>REQUÉRANT :</strong> {{requerant_nom}}</p><h2>CRÉANCE À PROTÉGER</h2><p>{{creance_a_proteger}}</p><h2>BIENS OU CRÉANCES VISÉS</h2><p>{{biens_a_saisir}}</p><h2>URGENCE</h2><p>{{urgence_justification}}</p><h2>DEMANDE</h2><p>Le requérant sollicite qu'il lui soit autorisé de pratiquer des mesures conservatoires sur les biens et créances désignés ci-dessus, sans commandement préalable, en raison du péril en la demeure, conformément à l'AUPSRVE OHADA.</p></div>`
  },
  {
    code: 'juri2_demande_scelle',
    name: "Accord de demande de mise sous scellés (procédure CI)",
    category: 'juridique_admin',
    price: 5000,
    priceMax: 15000,
    description: "Requête en apposition de scellés sur des biens ou documents dans le cadre d'une procédure judiciaire en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 58,
    fieldsJson: F([
      { key: 'requerant_nom', label: "Nom du requérant", type: 'text', required: true },
      { key: 'biens_a_sceller', label: "Description des biens à mettre sous scellés", type: 'textarea', required: true },
      { key: 'lieu_scelles', label: "Lieu d'apposition des scellés", type: 'text', required: true },
      { key: 'motif_demande', label: "Motif de la demande", type: 'textarea', required: true }
    ]),
    body: `<div class="doc"><h1>REQUÊTE EN APPOSITION DE SCELLÉS</h1><h2>À MONSIEUR LE PRÉSIDENT DU TRIBUNAL DE PREMIÈRE INSTANCE<br/>D'ABIDJAN</h2><p><strong>REQUÉRANT :</strong> {{requerant_nom}}</p><h2>OBJET</h2><p>Le requérant sollicite l'apposition de scellés sur les biens et documents ci-après désignés, en vue de leur conservation dans l'intérêt de la justice.</p><h2>BIENS À METTRE SOUS SCELLÉS</h2><p>{{biens_a_sceller}}</p><p>Lieu : <strong>{{lieu_scelles}}</strong></p><h2>MOTIFS</h2><p>{{motif_demande}}</p><p>Le requérant sollicite qu'il soit fait droit à sa demande d'urgence.</p><p><strong>{{requerant_nom}}</strong></p></div>`
  },
  {
    code: 'juri2_transaction_amiable',
    name: "Accord de transaction extrajudiciaire amiable",
    category: 'juridique_admin',
    price: 6000,
    priceMax: 18000,
    description: "Protocole de transaction amiable mettant fin à un litige commercial, opposant les parties à toute action judiciaire ultérieure sur le même différend.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 78,
    fieldsJson: F([
      { key: 'partie_a_nom', label: "Nom de la partie A", type: 'text', required: true },
      { key: 'partie_b_nom', label: "Nom de la partie B", type: 'text', required: true },
      { key: 'objet_litige', label: "Objet du litige transigé", type: 'textarea', required: true },
      { key: 'montant_transaction', label: "Montant convenu de la transaction (FCFA)", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
      { key: 'modalites_paiement', label: "Modalités de paiement", type: 'textarea', required: false }
    ]),
    body: `<div class="doc"><h1>ACCORD DE TRANSACTION EXTRAJUDICIAIRE AMIABLE</h1><p>Entre :<br/><strong>{{partie_a_nom}}</strong> (Partie A)<br/><strong>{{partie_b_nom}}</strong> (Partie B)</p><p>Date : {{date_signature}}</p><h2>OBJET DU LITIGE</h2><p>{{objet_litige}}</p><h2>ACCORD</h2><p>Les parties conviennent de mettre fin définitivement au litige ci-dessus par le versement par la Partie débitrice d'une somme globale et forfaitaire de <strong>{{montant_transaction}} FCFA</strong>.</p><h2>MODALITÉS DE PAIEMENT</h2><p>{{modalites_paiement}}</p><h2>RENONCIATION</h2><p>En contrepartie, les parties renoncent mutuellement à toute action en justice relative au litige transigé, valant quittance pour solde de tout compte.</p><p>Fait à Abidjan, le {{date_signature}}</p><p>Signature Partie A : _______________ Signature Partie B : _______________</p></div>`
  },
  {
    code: 'juri2_protocole_fin_litige',
    name: "Accord de protocole de fin de litige commercial",
    category: 'juridique_admin',
    price: 6000,
    priceMax: 20000,
    description: "Protocole d'accord mettant fin à un différend commercial, incluant les engagements réciproques et les conditions suspensives.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 71,
    fieldsJson: F([
      { key: 'partie_a_nom', label: "Nom de la partie A", type: 'text', required: true },
      { key: 'partie_b_nom', label: "Nom de la partie B", type: 'text', required: true },
      { key: 'litige_origine', label: "Description du litige d'origine", type: 'textarea', required: true },
      { key: 'engagements_reciproques', label: "Engagements réciproques des parties", type: 'textarea', required: true },
      { key: 'date_protocole', label: "Date du protocole", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>PROTOCOLE DE FIN DE LITIGE COMMERCIAL</h1><p>Entre :<br/><strong>{{partie_a_nom}}</strong><br/><strong>{{partie_b_nom}}</strong></p><p>Date : {{date_protocole}}</p><h2>LITIGE D'ORIGINE</h2><p>{{litige_origine}}</p><h2>ENGAGEMENTS DES PARTIES</h2><p>{{engagements_reciproques}}</p><h2>EFFETS</h2><p>Le présent protocole met définitivement fin au litige susvisé. Toutes les procédures judiciaires ou arbitrales en cours relatives à ce différend seront suspendues puis retirées dès exécution des engagements convenus.</p><p>Fait à Abidjan, le {{date_protocole}}</p><p>Signatures : _______________ / _______________</p></div>`
  },
  {
    code: 'juri2_renonciation_action',
    name: "Accord de renonciation à action en justice (quittance finale)",
    category: 'juridique_admin',
    price: 4000,
    priceMax: 12000,
    description: "Acte de renonciation définitive à toute action en justice et quittance pour solde de tout compte entre deux parties.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'renonciateur_nom', label: "Nom du renonciateur (créancier)", type: 'text', required: true },
      { key: 'beneficiaire_nom', label: "Nom du bénéficiaire (débiteur)", type: 'text', required: true },
      { key: 'objet_renonciation', label: "Objet de la renonciation", type: 'textarea', required: true },
      { key: 'contrepartie', label: "Contrepartie reçue (si applicable)", type: 'text', required: false },
      { key: 'date_acte', label: "Date de l'acte", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>ACTE DE RENONCIATION À ACTION EN JUSTICE<br/>ET QUITTANCE POUR SOLDE DE TOUT COMPTE</h1><p>Je soussigné(e), <strong>{{renonciateur_nom}}</strong>, déclare renoncer définitivement et irrévocablement à toute action en justice, poursuite ou réclamation à l'encontre de <strong>{{beneficiaire_nom}}</strong> concernant :</p><p>{{objet_renonciation}}</p><p>Contrepartie reçue : <strong>{{contrepartie}}</strong></p><p>Le présent acte vaut quittance définitive pour solde de tout compte. Aucune action ne pourra être intentée ou reprise au titre du différend visé.</p><p>Fait à Abidjan, le <strong>{{date_acte}}</strong></p><p>Signature : _______________</p></div>`
  },
  {
    code: 'juri2_cession_creance_litigieuse',
    name: "Accord de cession de créance litigieuse",
    category: 'juridique_admin',
    price: 7000,
    priceMax: 22000,
    description: "Acte de cession d'une créance contestée ou litigieuse entre un cédant et un cessionnaire, avec notification au débiteur.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'cedant_nom', label: "Nom du cédant (créancier original)", type: 'text', required: true },
      { key: 'cessionnaire_nom', label: "Nom du cessionnaire (acquéreur)", type: 'text', required: true },
      { key: 'debiteur_nom', label: "Nom du débiteur cédé", type: 'text', required: true },
      { key: 'montant_creance', label: "Montant nominal de la créance (FCFA)", type: 'text', required: true },
      { key: 'prix_cession', label: "Prix de cession (FCFA)", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>ACTE DE CESSION DE CRÉANCE LITIGIEUSE</h1><p><strong>CÉDANT :</strong> {{cedant_nom}}<br/><strong>CESSIONNAIRE :</strong> {{cessionnaire_nom}}<br/><strong>DÉBITEUR CÉDÉ :</strong> {{debiteur_nom}}</p><h2>OBJET</h2><p>Le cédant cède au cessionnaire, qui accepte, la créance d'un montant nominal de <strong>{{montant_creance}} FCFA</strong> détenue à l'encontre du débiteur cédé, pour le prix de <strong>{{prix_cession}} FCFA</strong>.</p><h2>CARACTÈRE LITIGIEUX</h2><p>La créance cédée est en cours de contestation judiciaire ou susceptible d'être contestée. Le cessionnaire acquiert la créance en connaissance de ce caractère litigieux.</p><h2>NOTIFICATION</h2><p>La présente cession sera notifiée au débiteur cédé conformément aux dispositions applicables du droit ivoirien.</p><p>Signatures : _______________ / _______________</p></div>`
  },
  {
    code: 'juri2_subrogation_creancier',
    name: "Accord de subrogation dans les droits d'un créancier",
    category: 'juridique_admin',
    price: 7000,
    priceMax: 20000,
    description: "Acte de subrogation conventionnelle par lequel un tiers payeur est substitué dans les droits du créancier originel.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 58,
    fieldsJson: F([
      { key: 'creancier_subroge_nom', label: "Nom du créancier subrogé (tiers payeur)", type: 'text', required: true },
      { key: 'creancier_originel_nom', label: "Nom du créancier originel", type: 'text', required: true },
      { key: 'debiteur_nom', label: "Nom du débiteur", type: 'text', required: true },
      { key: 'somme_payee', label: "Somme payée au créancier originel (FCFA)", type: 'text', required: true },
      { key: 'date_subrogation', label: "Date de la subrogation", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>ACTE DE SUBROGATION CONVENTIONNELLE</h1><p>Date : {{date_subrogation}}</p><p><strong>CRÉANCIER SUBROGÉ :</strong> {{creancier_subroge_nom}}<br/><strong>CRÉANCIER ORIGINEL :</strong> {{creancier_originel_nom}}<br/><strong>DÉBITEUR :</strong> {{debiteur_nom}}</p><h2>DÉCLARATION DE SUBROGATION</h2><p>Le créancier originel <strong>{{creancier_originel_nom}}</strong> déclare avoir reçu de <strong>{{creancier_subroge_nom}}</strong> la somme de <strong>{{somme_payee}} FCFA</strong> en paiement de sa créance, et subroge ce dernier dans tous ses droits, actions, privilèges et hypothèques à l'encontre du débiteur <strong>{{debiteur_nom}}</strong>.</p><p>Cette subrogation est consentie conformément aux dispositions du Code civil applicable en Côte d'Ivoire.</p><p>Signatures : _______________ / _______________</p></div>`
  },
  {
    code: 'juri2_service_avocat_ohada',
    name: "Accord de service d'avocat conseil OHADA (mission)",
    category: 'juridique_admin',
    price: 8000,
    priceMax: 25000,
    description: "Convention de services juridiques entre un client et un avocat spécialisé en droit OHADA, définissant la mission de conseil.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 74,
    fieldsJson: F([
      { key: 'avocat_nom', label: "Nom et barreau de l'avocat", type: 'text', required: true },
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'mission_description', label: "Description de la mission de conseil", type: 'textarea', required: true },
      { key: 'honoraires_ttc', label: "Honoraires convenus (FCFA TTC)", type: 'text', required: true },
      { key: 'duree_mission', label: "Durée de la mission", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>CONVENTION DE SERVICES JURIDIQUES<br/>AVOCAT CONSEIL — DROIT OHADA</h1><p><strong>AVOCAT :</strong> {{avocat_nom}}<br/><strong>CLIENT :</strong> {{client_nom}}</p><h2>MISSION</h2><p>{{mission_description}}</p><h2>DURÉE</h2><p>{{duree_mission}}</p><h2>HONORAIRES</h2><p>Les honoraires convenus pour l'accomplissement de la mission s'élèvent à <strong>{{honoraires_ttc}} FCFA TTC</strong>, payables selon les modalités convenues entre les parties.</p><h2>ENGAGEMENTS</h2><p>L'avocat s'engage à exécuter sa mission avec diligence et compétence, dans le respect du secret professionnel et des règles déontologiques du Barreau de Côte d'Ivoire.</p><p>Signatures : _______________ / _______________</p></div>`
  },
  {
    code: 'juri2_service_consultation_contentieux',
    name: "Accord de service de consultation juridique contentieux",
    category: 'juridique_admin',
    price: 5000,
    priceMax: 15000,
    description: "Convention de consultation juridique spécialisée dans la gestion contentieuse, pour conseiller une entreprise dans un litige commercial.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'consultant_nom', label: "Nom du consultant juridique", type: 'text', required: true },
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'objet_consultation', label: "Objet de la consultation", type: 'textarea', required: true },
      { key: 'tarif_consultation', label: "Tarif de la consultation (FCFA)", type: 'text', required: true },
      { key: 'date_consultation', label: "Date de la consultation", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CONSULTATION JURIDIQUE CONTENTIEUX</h1><p>Date : {{date_consultation}}</p><p><strong>CONSULTANT :</strong> {{consultant_nom}}<br/><strong>CLIENT :</strong> {{client_nom}}</p><h2>OBJET</h2><p>{{objet_consultation}}</p><h2>TARIF</h2><p>La consultation est facturée au tarif de <strong>{{tarif_consultation}} FCFA</strong>.</p><h2>CONFIDENTIALITÉ</h2><p>Le consultant s'engage à traiter toutes les informations communiquées par le client avec la plus stricte confidentialité.</p><p>Le présent accord vaut bon de commande et consentement mutuel.</p><p>Signatures : _______________ / _______________</p></div>`
  },
  {
    code: 'juri2_service_representation_ccja',
    name: "Accord de service de représentation devant la CCJA",
    category: 'juridique_admin',
    price: 12000,
    priceMax: 40000,
    description: "Mandat de représentation et d'assistance devant la Cour Commune de Justice et d'Arbitrage (CCJA) de l'OHADA.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 55,
    fieldsJson: F([
      { key: 'mandataire_nom', label: "Nom de l'avocat mandataire", type: 'text', required: true },
      { key: 'mandant_nom', label: "Nom du mandant (client)", type: 'text', required: true },
      { key: 'affaire_reference', label: "Référence de l'affaire devant la CCJA", type: 'text', required: true },
      { key: 'honoraires', label: "Honoraires de représentation (FCFA)", type: 'text', required: true },
      { key: 'etendue_mandat', label: "Étendue du mandat", type: 'textarea', required: true }
    ]),
    body: `<div class="doc"><h1>MANDAT DE REPRÉSENTATION DEVANT LA CCJA<br/>(Cour Commune de Justice et d'Arbitrage — OHADA)</h1><p><strong>MANDATAIRE :</strong> {{mandataire_nom}}<br/><strong>MANDANT :</strong> {{mandant_nom}}<br/><strong>AFFAIRE :</strong> {{affaire_reference}}</p><h2>ÉTENDUE DU MANDAT</h2><p>{{etendue_mandat}}</p><h2>HONORAIRES</h2><p>Les honoraires de représentation s'élèvent à <strong>{{honoraires}} FCFA</strong>, incluant les frais de déplacement à Abidjan ou dans les États membres.</p><h2>OBLIGATIONS DU MANDATAIRE</h2><p>Le mandataire s'engage à accomplir tous les actes de procédure nécessaires devant la CCJA dans les délais impartis, à informer régulièrement le mandant de l'avancement de la procédure, et à défendre au mieux ses intérêts.</p><p>Signatures : _______________ / _______________</p></div>`
  },
  {
    code: 'juri2_service_recouvrement_amiable',
    name: "Accord de service de recouvrement de créance amiable",
    category: 'juridique_admin',
    price: 5000,
    priceMax: 16000,
    description: "Convention de mandat de recouvrement amiable de créances commerciales, avant tout recours judiciaire.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 76,
    fieldsJson: F([
      { key: 'mandataire_recouvrement_nom', label: "Nom du mandataire (société de recouvrement)", type: 'text', required: true },
      { key: 'creancier_nom', label: "Nom du créancier mandant", type: 'text', required: true },
      { key: 'debiteur_nom', label: "Nom du débiteur", type: 'text', required: true },
      { key: 'montant_creance', label: "Montant de la créance (FCFA)", type: 'text', required: true },
      { key: 'commission_taux', label: "Taux de commission (%)", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>CONVENTION DE MANDAT DE RECOUVREMENT AMIABLE</h1><p><strong>MANDATAIRE :</strong> {{mandataire_recouvrement_nom}}<br/><strong>CRÉANCIER MANDANT :</strong> {{creancier_nom}}<br/><strong>DÉBITEUR :</strong> {{debiteur_nom}}</p><h2>OBJET</h2><p>Le créancier confie au mandataire le recouvrement amiable de la créance de <strong>{{montant_creance}} FCFA</strong> due par le débiteur.</p><h2>RÉMUNÉRATION</h2><p>Le mandataire percevra une commission de <strong>{{commission_taux}}%</strong> sur les sommes effectivement recouvrées.</p><h2>PÉRIMÈTRE</h2><p>La mission est strictement limitée au recouvrement amiable. Toute action judiciaire nécessitera un mandat spécifique complémentaire.</p><p>Signatures : _______________ / _______________</p></div>`
  },
  {
    code: 'juri2_service_recouvrement_judiciaire',
    name: "Accord de service de recouvrement judiciaire de créance",
    category: 'juridique_admin',
    price: 8000,
    priceMax: 25000,
    description: "Convention de mandat de recouvrement judiciaire de créances commerciales incluant les voies d'exécution OHADA.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 72,
    fieldsJson: F([
      { key: 'cabinet_avocat', label: "Cabinet d'avocats mandataire", type: 'text', required: true },
      { key: 'creancier_nom', label: "Nom du créancier", type: 'text', required: true },
      { key: 'montant_creance', label: "Montant de la créance (FCFA)", type: 'text', required: true },
      { key: 'voies_execution', label: "Voies d'exécution autorisées", type: 'textarea', required: true },
      { key: 'honoraires_succes', label: "Honoraires de succès (%)", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>CONVENTION DE MANDAT DE RECOUVREMENT JUDICIAIRE</h1><p><strong>MANDATAIRE :</strong> {{cabinet_avocat}}<br/><strong>CRÉANCIER :</strong> {{creancier_nom}}</p><h2>OBJET</h2><p>Le créancier confie au cabinet mandataire le recouvrement judiciaire de la créance de <strong>{{montant_creance}} FCFA</strong>, incluant l'engagement de toutes procédures judiciaires et voies d'exécution nécessaires.</p><h2>VOIES D'EXÉCUTION AUTORISÉES</h2><p>{{voies_execution}}</p><h2>HONORAIRES</h2><p>Honoraires de succès : <strong>{{honoraires_succes}}%</strong> des sommes recouvrées, en sus des honoraires de diligences convenus séparément.</p><p>Signatures : _______________ / _______________</p></div>`
  },
  {
    code: 'juri2_rapport_contentieux',
    name: "Rapport de contentieux commercial",
    category: 'juridique_admin',
    price: 6000,
    priceMax: 18000,
    description: "Rapport de synthèse des contentieux commerciaux en cours, adressé à la direction générale d'une entreprise pour pilotage.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'entreprise_nom', label: "Nom de l'entreprise", type: 'text', required: true },
      { key: 'periode_rapport', label: "Période couverte par le rapport", type: 'text', required: true },
      { key: 'litiges_en_cours', label: "Description des litiges en cours", type: 'textarea', required: true },
      { key: 'provisions_risques', label: "Provisions pour risques (FCFA)", type: 'text', required: true },
      { key: 'date_rapport', label: "Date du rapport", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>RAPPORT DE CONTENTIEUX COMMERCIAL</h1><p><strong>ENTREPRISE :</strong> {{entreprise_nom}}<br/><strong>PÉRIODE :</strong> {{periode_rapport}}<br/><strong>DATE :</strong> {{date_rapport}}</p><h2>SYNTHÈSE DES LITIGES EN COURS</h2><p>{{litiges_en_cours}}</p><h2>ÉVALUATION FINANCIÈRE</h2><p>Provisions pour risques contentieux constituées : <strong>{{provisions_risques}} FCFA</strong></p><h2>RECOMMANDATIONS</h2><p>Le département juridique recommande une revue stratégique de la politique contentieuse et une mise à jour des clauses contractuelles pour réduire l'exposition aux risques de litiges futurs.</p><p><em>Rapport confidentiel — Usage interne</em></p></div>`
  },
  {
    code: 'juri2_plan_gestion_litiges',
    name: "Plan de gestion des litiges",
    category: 'juridique_admin',
    price: 7000,
    priceMax: 20000,
    description: "Document de planification stratégique pour la gestion préventive et curative des litiges commerciaux d'une entreprise.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 63,
    fieldsJson: F([
      { key: 'entreprise_nom', label: "Nom de l'entreprise", type: 'text', required: true },
      { key: 'responsable_juridique', label: "Responsable juridique", type: 'text', required: true },
      { key: 'objectifs_plan', label: "Objectifs du plan de gestion", type: 'textarea', required: true },
      { key: 'actions_preventives', label: "Actions préventives prévues", type: 'textarea', required: true },
      { key: 'budget_contentieux', label: "Budget annuel contentieux (FCFA)", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>PLAN DE GESTION DES LITIGES COMMERCIAUX</h1><p><strong>ENTREPRISE :</strong> {{entreprise_nom}}<br/><strong>RESPONSABLE JURIDIQUE :</strong> {{responsable_juridique}}</p><h2>OBJECTIFS</h2><p>{{objectifs_plan}}</p><h2>ACTIONS PRÉVENTIVES</h2><p>{{actions_preventives}}</p><h2>BUDGET</h2><p>Budget annuel alloué à la gestion des contentieux : <strong>{{budget_contentieux}} FCFA</strong></p><h2>INDICATEURS DE PERFORMANCE</h2><ul><li>Nombre de litiges résolus à l'amiable</li><li>Taux de succès des procédures judiciaires</li><li>Délai moyen de résolution des litiges</li><li>Coût moyen par litige</li></ul></div>`
  },
  {
    code: 'juri2_charte_resolution_differends',
    name: "Charte de la résolution des différends et de l'accès à la justice commerciale en Afrique",
    category: 'juridique_admin',
    price: 8000,
    priceMax: 25000,
    description: "Charte institutionnelle engageant les signataires à promouvoir la résolution amiable et rapide des différends commerciaux dans l'espace OHADA.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'organisation_initiatrice', label: "Organisation initiatrice de la charte", type: 'text', required: true },
      { key: 'signataires', label: "Noms des signataires", type: 'textarea', required: true },
      { key: 'principes_fondateurs', label: "Principes fondateurs de la charte", type: 'textarea', required: true },
      { key: 'date_adoption', label: "Date d'adoption", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>CHARTE DE LA RÉSOLUTION DES DIFFÉRENDS<br/>ET DE L'ACCÈS À LA JUSTICE COMMERCIALE EN AFRIQUE</h1><p><strong>ORGANISATION INITIATRICE :</strong> {{organisation_initiatrice}}<br/><strong>DATE D'ADOPTION :</strong> {{date_adoption}}</p><h2>PRÉAMBULE</h2><p>Les signataires, convaincus de la nécessité de renforcer la sécurité juridique des échanges commerciaux dans l'espace OHADA, adoptent la présente Charte.</p><h2>PRINCIPES FONDATEURS</h2><p>{{principes_fondateurs}}</p><h2>ENGAGEMENTS</h2><ul><li>Promouvoir la médiation et la conciliation avant toute saisine judiciaire</li><li>Respecter les délais de traitement des litiges commerciaux</li><li>Contribuer au renforcement des capacités judiciaires dans l'espace OHADA</li><li>Soutenir le développement de l'arbitrage comme mode de résolution des conflits</li></ul><h2>SIGNATAIRES</h2><p>{{signataires}}</p></div>`
  },

  // ─── 25 templates Arbitrage commercial international (arb3_) ───
  {
    code: 'arb3_accord_ccja',
    name: "Accord d'arbitrage CCJA (Centre d'Arbitrage OHADA)",
    category: 'juridique_admin',
    price: 10000,
    priceMax: 35000,
    description: "Convention d'arbitrage soumettant les différends des parties au Centre d'Arbitrage de la CCJA, selon le Règlement d'Arbitrage OHADA.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 72,
    fieldsJson: F([
      { key: 'partie_a_nom', label: "Nom de la partie A", type: 'text', required: true },
      { key: 'partie_b_nom', label: "Nom de la partie B", type: 'text', required: true },
      { key: 'objet_contrat', label: "Objet du contrat principal", type: 'textarea', required: true },
      { key: 'siege_arbitrage', label: "Siège de l'arbitrage", type: 'text', required: true },
      { key: 'langue_arbitrage', label: "Langue de l'arbitrage", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>CONVENTION D'ARBITRAGE — CCJA / OHADA</h1><p><strong>PARTIE A :</strong> {{partie_a_nom}}<br/><strong>PARTIE B :</strong> {{partie_b_nom}}</p><h2>CLAUSE D'ARBITRAGE</h2><p>Tout différend, litige ou contestation résultant du présent contrat ou en relation avec celui-ci, notamment concernant son exécution, son interprétation ou sa validité, sera soumis à l'arbitrage de la Cour Commune de Justice et d'Arbitrage (CCJA) de l'OHADA, conformément à son Règlement d'Arbitrage.</p><h2>MODALITÉS</h2><p><strong>Siège :</strong> {{siege_arbitrage}}<br/><strong>Langue :</strong> {{langue_arbitrage}}</p><h2>OBJET DU CONTRAT PRINCIPAL</h2><p>{{objet_contrat}}</p><p>La sentence arbitrale sera définitive et obligatoire pour les parties.</p><p>Signatures : _______________ / _______________</p></div>`
  },
  {
    code: 'arb3_accord_caci',
    name: "Accord d'arbitrage CACI (Centre Abidjan)",
    category: 'juridique_admin',
    price: 9000,
    priceMax: 28000,
    description: "Convention d'arbitrage soumettant les différends au Centre d'Arbitrage, de Conciliation et d'Expertise de Côte d'Ivoire (CACI).",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'partie_a_nom', label: "Nom de la partie A", type: 'text', required: true },
      { key: 'partie_b_nom', label: "Nom de la partie B", type: 'text', required: true },
      { key: 'objet_litige_potentiel', label: "Nature du litige potentiel", type: 'textarea', required: true },
      { key: 'nombre_arbitres', label: "Nombre d'arbitres (1 ou 3)", type: 'text', required: true },
      { key: 'droit_applicable', label: "Droit applicable au fond", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>CONVENTION D'ARBITRAGE — CACI<br/>(Centre d'Arbitrage, de Conciliation et d'Expertise de Côte d'Ivoire)</h1><p><strong>PARTIE A :</strong> {{partie_a_nom}}<br/><strong>PARTIE B :</strong> {{partie_b_nom}}</p><h2>CLAUSE D'ARBITRAGE</h2><p>Tout différend né ou à naître entre les parties concernant le présent accord sera définitivement tranché par voie d'arbitrage conformément au Règlement du CACI, par <strong>{{nombre_arbitres}} arbitre(s)</strong>.</p><h2>DROIT APPLICABLE</h2><p>{{droit_applicable}}</p><h2>NATURE DU LITIGE POTENTIEL</h2><p>{{objet_litige_potentiel}}</p><p>Le siège de l'arbitrage est fixé à Abidjan, Côte d'Ivoire.</p><p>Signatures : _______________ / _______________</p></div>`
  },
  {
    code: 'arb3_accord_ohada_cci',
    name: "Accord d'arbitrage OHADA-CCI (Règlement)",
    category: 'juridique_admin',
    price: 12000,
    priceMax: 40000,
    description: "Clause d'arbitrage combinant les dispositions de l'Acte Uniforme OHADA sur l'arbitrage et le Règlement d'arbitrage de la CCI.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'partie_a_nom', label: "Nom de la partie A", type: 'text', required: true },
      { key: 'partie_b_nom', label: "Nom de la partie B", type: 'text', required: true },
      { key: 'siege_arbitrage', label: "Siège de l'arbitrage", type: 'text', required: true },
      { key: 'langue_procedure', label: "Langue de la procédure", type: 'text', required: true },
      { key: 'droit_fond', label: "Droit applicable au fond du litige", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>CLAUSE D'ARBITRAGE INTERNATIONAL<br/>OHADA — CCI</h1><p><strong>PARTIE A :</strong> {{partie_a_nom}}<br/><strong>PARTIE B :</strong> {{partie_b_nom}}</p><h2>CLAUSE D'ARBITRAGE</h2><p>Tout litige découlant du présent contrat ou en relation avec celui-ci sera soumis à l'arbitrage conformément au Règlement d'arbitrage de la Chambre de Commerce Internationale (CCI), en tenant compte des dispositions de l'Acte Uniforme OHADA relatif au droit de l'arbitrage.</p><h2>MODALITÉS</h2><ul><li>Siège : {{siege_arbitrage}}</li><li>Langue : {{langue_procedure}}</li><li>Droit applicable : {{droit_fond}}</li></ul><p>Signatures : _______________ / _______________</p></div>`
  },
  {
    code: 'arb3_clause_compromissoire',
    name: "Accord de clause compromissoire dans un contrat commercial",
    category: 'juridique_admin',
    price: 6000,
    priceMax: 18000,
    description: "Clause compromissoire type à insérer dans un contrat commercial pour soumettre les futurs litiges à l'arbitrage.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 80,
    fieldsJson: F([
      { key: 'contractant_a', label: "Nom du contractant A", type: 'text', required: true },
      { key: 'contractant_b', label: "Nom du contractant B", type: 'text', required: true },
      { key: 'institution_arbitrage', label: "Institution d'arbitrage choisie", type: 'text', required: true },
      { key: 'siege', label: "Siège de l'arbitrage", type: 'text', required: true },
      { key: 'langue', label: "Langue de la procédure", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>CLAUSE COMPROMISSOIRE</h1><p><strong>CONTRACTANT A :</strong> {{contractant_a}}<br/><strong>CONTRACTANT B :</strong> {{contractant_b}}</p><h2>CLAUSE TYPE</h2><p>Les parties conviennent expressément que tout différend, controverse ou réclamation née du présent contrat, de sa violation, de sa résiliation ou de sa nullité sera soumis à l'arbitrage conformément au Règlement de <strong>{{institution_arbitrage}}</strong>.</p><p>L'arbitrage aura son siège à <strong>{{siege}}</strong> et se déroulera en langue <strong>{{langue}}</strong>.</p><p>La sentence sera définitive et s'imposera aux parties qui renoncent à toute voie de recours dans la mesure permise par la loi.</p><p>Signatures : _______________ / _______________</p></div>`
  },
  {
    code: 'arb3_compromis_arbitrage',
    name: "Accord de compromis d'arbitrage (après litige né)",
    category: 'juridique_admin',
    price: 8000,
    priceMax: 25000,
    description: "Compromis d'arbitrage conclu après la naissance d'un litige, déterminant les modalités de la procédure arbitrale.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'demandeur_nom', label: "Nom du demandeur à l'arbitrage", type: 'text', required: true },
      { key: 'defendeur_nom', label: "Nom du défendeur à l'arbitrage", type: 'text', required: true },
      { key: 'description_litige', label: "Description précise du litige soumis à arbitrage", type: 'textarea', required: true },
      { key: 'institution_arbitrage', label: "Institution d'arbitrage", type: 'text', required: true },
      { key: 'date_compromis', label: "Date du compromis", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>COMPROMIS D'ARBITRAGE</h1><p>Date : {{date_compromis}}</p><p><strong>DEMANDEUR :</strong> {{demandeur_nom}}<br/><strong>DÉFENDEUR :</strong> {{defendeur_nom}}</p><h2>LITIGE SOUMIS À ARBITRAGE</h2><p>{{description_litige}}</p><h2>PROCÉDURE</h2><p>Les parties s'accordent pour soumettre le litige ci-dessus à l'arbitrage de <strong>{{institution_arbitrage}}</strong>, dont elles acceptent le Règlement de procédure.</p><h2>RENONCIATION AUX RECOURS</h2><p>Les parties renoncent à saisir les juridictions étatiques pour le litige défini au présent compromis.</p><p>Signatures : _______________ / _______________</p></div>`
  },
  {
    code: 'arb3_designation_arbitre_unique',
    name: "Accord de désignation d'arbitre unique",
    category: 'juridique_admin',
    price: 6000,
    priceMax: 18000,
    description: "Acte de désignation conjointe ou institutionnelle d'un arbitre unique pour la résolution d'un différend commercial.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'partie_a_nom', label: "Nom de la partie A", type: 'text', required: true },
      { key: 'partie_b_nom', label: "Nom de la partie B", type: 'text', required: true },
      { key: 'arbitre_nom', label: "Nom et qualité de l'arbitre unique", type: 'text', required: true },
      { key: 'mission_arbitre', label: "Mission de l'arbitre", type: 'textarea', required: true },
      { key: 'delai_sentence', label: "Délai pour rendre la sentence", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>ACTE DE DÉSIGNATION D'ARBITRE UNIQUE</h1><p><strong>PARTIE A :</strong> {{partie_a_nom}}<br/><strong>PARTIE B :</strong> {{partie_b_nom}}</p><h2>DÉSIGNATION</h2><p>Les parties désignent d'un commun accord <strong>{{arbitre_nom}}</strong> en qualité d'arbitre unique, chargé de trancher le différend qui les oppose.</p><h2>MISSION</h2><p>{{mission_arbitre}}</p><h2>DÉLAI</h2><p>L'arbitre devra rendre sa sentence dans un délai de <strong>{{delai_sentence}}</strong> à compter de la constitution du tribunal arbitral.</p><p>L'arbitre accepte cette désignation en signant le présent acte.</p><p>Signatures : _______________ / _______________ / _______________</p></div>`
  },
  {
    code: 'arb3_college_arbitres',
    name: "Accord de désignation d'un collège de 3 arbitres",
    category: 'juridique_admin',
    price: 8000,
    priceMax: 25000,
    description: "Acte de constitution d'un tribunal arbitral composé de trois arbitres, avec désignation du président.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'partie_a_nom', label: "Nom de la partie A", type: 'text', required: true },
      { key: 'partie_b_nom', label: "Nom de la partie B", type: 'text', required: true },
      { key: 'arbitre_partie_a', label: "Arbitre désigné par la partie A", type: 'text', required: true },
      { key: 'arbitre_partie_b', label: "Arbitre désigné par la partie B", type: 'text', required: true },
      { key: 'president_tribunal', label: "Président du tribunal arbitral", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>ACTE DE CONSTITUTION DU TRIBUNAL ARBITRAL<br/>COLLÈGE DE TROIS ARBITRES</h1><p><strong>PARTIE A :</strong> {{partie_a_nom}}<br/><strong>PARTIE B :</strong> {{partie_b_nom}}</p><h2>COMPOSITION DU TRIBUNAL</h2><ul><li>Arbitre désigné par la Partie A : <strong>{{arbitre_partie_a}}</strong></li><li>Arbitre désigné par la Partie B : <strong>{{arbitre_partie_b}}</strong></li><li>Président du tribunal arbitral : <strong>{{president_tribunal}}</strong></li></ul><h2>DÉCLARATION D'INDÉPENDANCE</h2><p>Chaque arbitre déclare être indépendant et impartial à l'égard des parties, et s'engage à accomplir sa mission avec diligence et objectivité.</p><p>Signatures des arbitres : _______________ / _______________ / _______________</p><p>Signatures des parties : _______________ / _______________</p></div>`
  },
  {
    code: 'arb3_procedure_acceleree',
    name: "Accord de procédure arbitrale accélérée (fast track)",
    category: 'juridique_admin',
    price: 9000,
    priceMax: 28000,
    description: "Convention de procédure arbitrale accélérée permettant un règlement rapide du différend avec délais raccourcis.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 66,
    fieldsJson: F([
      { key: 'partie_a_nom', label: "Nom de la partie A", type: 'text', required: true },
      { key: 'partie_b_nom', label: "Nom de la partie B", type: 'text', required: true },
      { key: 'delai_total_procedure', label: "Délai total de la procédure", type: 'text', required: true },
      { key: 'montant_litige', label: "Montant du litige (FCFA)", type: 'text', required: true },
      { key: 'institution_fast_track', label: "Institution d'arbitrage accélérée", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>CONVENTION DE PROCÉDURE ARBITRALE ACCÉLÉRÉE<br/>(FAST TRACK)</h1><p><strong>PARTIE A :</strong> {{partie_a_nom}}<br/><strong>PARTIE B :</strong> {{partie_b_nom}}</p><h2>OBJET</h2><p>Pour un différend portant sur <strong>{{montant_litige}} FCFA</strong>, les parties conviennent de recourir à la procédure accélérée de <strong>{{institution_fast_track}}</strong>.</p><h2>MODALITÉS</h2><ul><li>Arbitre unique pour statuer rapidement</li><li>Délai total de procédure : <strong>{{delai_total_procedure}}</strong></li><li>Échanges de mémoires limités</li><li>Audience unique si nécessaire</li></ul><h2>RENONCIATION</h2><p>Les parties renoncent à toute procédure incidente dilatoire et s'engagent à coopérer de bonne foi pour respecter le calendrier accéléré.</p><p>Signatures : _______________ / _______________</p></div>`
  },
  {
    code: 'arb3_recusation_arbitre',
    name: "Accord de récusation d'un arbitre",
    category: 'juridique_admin',
    price: 7000,
    priceMax: 22000,
    description: "Requête en récusation d'un arbitre pour défaut d'indépendance, d'impartialité ou de qualification, conformément aux règles arbitrales applicables.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 55,
    fieldsJson: F([
      { key: 'partie_recusante', label: "Partie demandant la récusation", type: 'text', required: true },
      { key: 'arbitre_recuse_nom', label: "Nom de l'arbitre récusé", type: 'text', required: true },
      { key: 'motifs_recusation', label: "Motifs de la récusation", type: 'textarea', required: true },
      { key: 'institution_arbitrage', label: "Institution d'arbitrage saisie", type: 'text', required: true },
      { key: 'date_requete', label: "Date de la requête", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>REQUÊTE EN RÉCUSATION D'ARBITRE</h1><p>Date : {{date_requete}}</p><p><strong>PARTIE REQUÉRANTE :</strong> {{partie_recusante}}<br/><strong>ARBITRE RÉCUSÉ :</strong> {{arbitre_recuse_nom}}</p><h2>À {{institution_arbitrage}}</h2><h2>MOTIFS DE LA RÉCUSATION</h2><p>{{motifs_recusation}}</p><h2>DEMANDE</h2><p>La partie requérante demande à l'institution d'arbitrage de prononcer la récusation de l'arbitre susvisé et de procéder à son remplacement dans les meilleurs délais, afin de garantir l'intégrité de la procédure arbitrale.</p><p><strong>{{partie_recusante}}</strong></p></div>`
  },
  {
    code: 'arb3_nomination_arbitre_remplacement',
    name: "Accord de nomination d'un arbitre de remplacement",
    category: 'juridique_admin',
    price: 6000,
    priceMax: 18000,
    description: "Acte de nomination d'un arbitre de remplacement suite à récusation, décès, incapacité ou démission d'un arbitre initial.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 58,
    fieldsJson: F([
      { key: 'institution_arbitrage', label: "Institution d'arbitrage", type: 'text', required: true },
      { key: 'arbitre_remplace_nom', label: "Nom de l'arbitre remplacé", type: 'text', required: true },
      { key: 'motif_remplacement', label: "Motif du remplacement", type: 'text', required: true },
      { key: 'nouvel_arbitre_nom', label: "Nom du nouvel arbitre désigné", type: 'text', required: true },
      { key: 'date_nomination', label: "Date de la nomination", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>ACTE DE NOMINATION D'UN ARBITRE DE REMPLACEMENT</h1><p>Date : {{date_nomination}}</p><p><strong>INSTITUTION :</strong> {{institution_arbitrage}}</p><h2>CONTEXTE</h2><p>Suite au remplacement de <strong>{{arbitre_remplace_nom}}</strong> pour motif de <strong>{{motif_remplacement}}</strong>, il est procédé à la nomination d'un nouvel arbitre.</p><h2>NOMINATION</h2><p><strong>{{nouvel_arbitre_nom}}</strong> est nommé en qualité d'arbitre de remplacement. Il accepte cette nomination et déclare être indépendant et impartial à l'égard de toutes les parties.</p><h2>REPRISE DE PROCÉDURE</h2><p>Le tribunal arbitral, ainsi reconstitué, reprendra la procédure au stade où elle en était, après consultation des parties sur les éventuelles répétitions d'actes nécessaires.</p><p>Signatures : _______________</p></div>`
  },
  {
    code: 'arb3_expertise_technique',
    name: "Accord d'expertise technique dans l'arbitrage",
    category: 'juridique_admin',
    price: 10000,
    priceMax: 32000,
    description: "Convention de mission d'expertise technique ordonnée par le tribunal arbitral pour éclairer les questions de fait dans un litige.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 63,
    fieldsJson: F([
      { key: 'expert_nom', label: "Nom et qualités de l'expert", type: 'text', required: true },
      { key: 'mission_expertise', label: "Mission de l'expert", type: 'textarea', required: true },
      { key: 'delai_rapport', label: "Délai de dépôt du rapport", type: 'text', required: true },
      { key: 'honoraires_expert', label: "Honoraires de l'expert (FCFA)", type: 'text', required: true },
      { key: 'affaire_reference', label: "Référence de l'affaire arbitrale", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>CONVENTION DE MISSION D'EXPERTISE TECHNIQUE<br/>DANS LE CADRE D'UN ARBITRAGE</h1><p><strong>AFFAIRE :</strong> {{affaire_reference}}<br/><strong>EXPERT :</strong> {{expert_nom}}</p><h2>MISSION</h2><p>Le tribunal arbitral confie à l'expert la mission suivante :<br/>{{mission_expertise}}</p><h2>DÉLAI</h2><p>L'expert devra déposer son rapport dans un délai de <strong>{{delai_rapport}}</strong> à compter de la notification de sa désignation.</p><h2>HONORAIRES</h2><p>Les honoraires de l'expert sont fixés à <strong>{{honoraires_expert}} FCFA</strong>, provisionnés en parts égales par les parties.</p><h2>INDÉPENDANCE</h2><p>L'expert déclare n'avoir aucun lien avec les parties susceptible de compromettre son indépendance.</p></div>`
  },
  {
    code: 'arb3_mesures_conservatoires_emergency',
    name: "Accord de mesures conservatoires (emergency arbitrator)",
    category: 'juridique_admin',
    price: 12000,
    priceMax: 40000,
    description: "Requête aux fins de mesures conservatoires d'urgence devant un arbitre d'urgence, avant constitution du tribunal arbitral.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'partie_requerante', label: "Partie requérante", type: 'text', required: true },
      { key: 'partie_adverse', label: "Partie adverse", type: 'text', required: true },
      { key: 'mesures_sollicitees', label: "Mesures conservatoires sollicitées", type: 'textarea', required: true },
      { key: 'urgence_justification', label: "Justification de l'urgence", type: 'textarea', required: true },
      { key: 'institution_arbitrage', label: "Institution d'arbitrage saisie", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>REQUÊTE AUX FINS DE MESURES CONSERVATOIRES D'URGENCE<br/>(EMERGENCY ARBITRATOR)</h1><p><strong>PARTIE REQUÉRANTE :</strong> {{partie_requerante}}<br/><strong>PARTIE ADVERSE :</strong> {{partie_adverse}}</p><h2>À {{institution_arbitrage}}</h2><h2>MESURES SOLLICITÉES</h2><p>{{mesures_sollicitees}}</p><h2>URGENCE</h2><p>{{urgence_justification}}</p><h2>FONDEMENT</h2><p>La présente requête est fondée sur les dispositions relatives à l'arbitre d'urgence du Règlement de <strong>{{institution_arbitrage}}</strong>, permettant l'octroi de mesures conservatoires avant constitution du tribunal arbitral principal.</p><p><strong>{{partie_requerante}}</strong></p></div>`
  },
  {
    code: 'arb3_sentence_arbitrale',
    name: "Accord de sentence arbitrale (modèle)",
    category: 'juridique_admin',
    price: 10000,
    priceMax: 35000,
    description: "Modèle de sentence arbitrale finale tranchant un différend commercial international, avec dispositif et condamnations.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'demandeur_nom', label: "Nom du demandeur", type: 'text', required: true },
      { key: 'defendeur_nom', label: "Nom du défendeur", type: 'text', required: true },
      { key: 'tribunal_composition', label: "Composition du tribunal arbitral", type: 'text', required: true },
      { key: 'dispositif_sentence', label: "Dispositif de la sentence", type: 'textarea', required: true },
      { key: 'date_sentence', label: "Date de la sentence", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>SENTENCE ARBITRALE FINALE</h1><p>Affaire entre :<br/><strong>DEMANDEUR :</strong> {{demandeur_nom}}<br/><strong>DÉFENDEUR :</strong> {{defendeur_nom}}</p><p>Rendue le <strong>{{date_sentence}}</strong> par le tribunal arbitral composé de : <strong>{{tribunal_composition}}</strong></p><h2>DISPOSITIF</h2><p>{{dispositif_sentence}}</p><h2>CARACTÈRE DÉFINITIF</h2><p>La présente sentence est définitive et obligatoire pour les parties. Elle est susceptible d'exécution forcée dans tous les États parties à la Convention de New York du 10 juin 1958 sur la reconnaissance et l'exécution des sentences arbitrales étrangères.</p><p>Signatures des arbitres : _______________</p></div>`
  },
  {
    code: 'arb3_reconnaissance_execution',
    name: "Accord de reconnaissance et d'exécution d'une sentence (New York)",
    category: 'juridique_admin',
    price: 10000,
    priceMax: 32000,
    description: "Requête en reconnaissance et exécution d'une sentence arbitrale étrangère, fondée sur la Convention de New York de 1958.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 62,
    fieldsJson: F([
      { key: 'requerant_nom', label: "Nom du requérant bénéficiaire", type: 'text', required: true },
      { key: 'debiteur_sentence', label: "Nom du débiteur de la sentence", type: 'text', required: true },
      { key: 'sentence_reference', label: "Référence et date de la sentence", type: 'text', required: true },
      { key: 'montant_condamnation', label: "Montant de la condamnation (FCFA ou devise)", type: 'text', required: true },
      { key: 'juridiction_saisie', label: "Juridiction ivoirienne saisie", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>REQUÊTE EN RECONNAISSANCE ET EXÉCUTION<br/>DE SENTENCE ARBITRALE ÉTRANGÈRE</h1><p>(Convention de New York du 10 juin 1958)</p><p><strong>REQUÉRANT :</strong> {{requerant_nom}}<br/><strong>DÉBITEUR :</strong> {{debiteur_sentence}}</p><h2>À MONSIEUR LE PRÉSIDENT DU {{juridiction_saisie}}</h2><h2>OBJET</h2><p>Le requérant sollicite la reconnaissance et l'exécution sur le territoire ivoirien de la sentence arbitrale {{sentence_reference}}, qui condamne le débiteur à payer la somme de <strong>{{montant_condamnation}}</strong>.</p><h2>FONDEMENT</h2><p>La demande est fondée sur les articles III et IV de la Convention de New York de 1958, à laquelle la Côte d'Ivoire est partie.</p><p><strong>{{requerant_nom}}</strong></p></div>`
  },
  {
    code: 'arb3_service_avocat_arbitrage',
    name: "Accord de service d'avocat en arbitrage international",
    category: 'juridique_admin',
    price: 12000,
    priceMax: 45000,
    description: "Convention de mission d'un avocat pour la représentation et la défense des intérêts d'un client dans une procédure d'arbitrage international.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'avocat_cabinet', label: "Cabinet d'avocats", type: 'text', required: true },
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'affaire_description', label: "Description de l'affaire arbitrale", type: 'textarea', required: true },
      { key: 'honoraires_base', label: "Honoraires de base (FCFA)", type: 'text', required: true },
      { key: 'institution_arbitrage', label: "Institution d'arbitrage", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>CONVENTION DE SERVICE D'AVOCAT<br/>EN ARBITRAGE INTERNATIONAL</h1><p><strong>CABINET :</strong> {{avocat_cabinet}}<br/><strong>CLIENT :</strong> {{client_nom}}<br/><strong>INSTITUTION :</strong> {{institution_arbitrage}}</p><h2>DESCRIPTION DE L'AFFAIRE</h2><p>{{affaire_description}}</p><h2>MISSION</h2><p>Le cabinet est mandaté pour représenter et défendre les intérêts du client à toutes les étapes de la procédure arbitrale, incluant la rédaction des mémoires, la participation aux audiences et, si nécessaire, les recours post-sentence.</p><h2>HONORAIRES</h2><p>Honoraires de base convenus : <strong>{{honoraires_base}} FCFA</strong>, modulables en fonction des actes effectivement accomplis.</p><p>Signatures : _______________ / _______________</p></div>`
  },
  {
    code: 'arb3_service_secretariat',
    name: "Accord de service de secrétariat d'arbitrage",
    category: 'juridique_admin',
    price: 7000,
    priceMax: 22000,
    description: "Convention de service de secrétariat administratif pour un tribunal arbitral, couvrant la gestion des communications et des actes de procédure.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 58,
    fieldsJson: F([
      { key: 'secretariat_nom', label: "Nom de l'entité assurant le secrétariat", type: 'text', required: true },
      { key: 'tribunal_composition', label: "Composition du tribunal arbitral", type: 'text', required: true },
      { key: 'affaire_reference', label: "Référence de l'affaire", type: 'text', required: true },
      { key: 'tarif_secretariat', label: "Tarif du secrétariat (FCFA)", type: 'text', required: true },
      { key: 'duree_mission', label: "Durée estimée de la mission", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>CONVENTION DE SERVICE DE SECRÉTARIAT D'ARBITRAGE</h1><p><strong>SECRÉTARIAT :</strong> {{secretariat_nom}}<br/><strong>TRIBUNAL :</strong> {{tribunal_composition}}<br/><strong>AFFAIRE :</strong> {{affaire_reference}}</p><h2>MISSION DU SECRÉTARIAT</h2><ul><li>Réception et diffusion des communications entre les parties et les arbitres</li><li>Conservation et archivage de toutes les pièces de procédure</li><li>Organisation logistique des audiences</li><li>Assistance administrative aux arbitres</li></ul><h2>TARIF ET DURÉE</h2><p>Tarif : <strong>{{tarif_secretariat}} FCFA</strong><br/>Durée estimée : <strong>{{duree_mission}}</strong></p><p>Signatures : _______________ / _______________</p></div>`
  },
  {
    code: 'arb3_service_expert_investissement',
    name: "Accord de service d'expert en arbitrage (investissement)",
    category: 'juridique_admin',
    price: 15000,
    priceMax: 50000,
    description: "Convention de mission d'expert spécialisé dans les litiges d'investissement soumis à l'arbitrage international.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 55,
    fieldsJson: F([
      { key: 'expert_nom', label: "Nom et spécialité de l'expert", type: 'text', required: true },
      { key: 'partie_mandante', label: "Partie mandante", type: 'text', required: true },
      { key: 'litige_investissement', label: "Description du litige d'investissement", type: 'textarea', required: true },
      { key: 'montant_investissement', label: "Montant de l'investissement concerné (FCFA)", type: 'text', required: true },
      { key: 'honoraires_expert', label: "Honoraires de l'expert (FCFA)", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>CONVENTION DE SERVICE D'EXPERT<br/>EN ARBITRAGE D'INVESTISSEMENT</h1><p><strong>EXPERT :</strong> {{expert_nom}}<br/><strong>PARTIE MANDANTE :</strong> {{partie_mandante}}</p><h2>LITIGE D'INVESTISSEMENT</h2><p>{{litige_investissement}}</p><p>Montant de l'investissement concerné : <strong>{{montant_investissement}} FCFA</strong></p><h2>MISSION DE L'EXPERT</h2><p>L'expert est mandaté pour fournir une analyse technique et économique indépendante sur les questions de fait pertinentes dans la procédure arbitrale d'investissement, et le cas échéant témoigner à l'audience en qualité d'expert-témoin.</p><h2>HONORAIRES</h2><p><strong>{{honoraires_expert}} FCFA</strong></p><p>Signatures : _______________ / _______________</p></div>`
  },
  {
    code: 'arb3_service_conseil_pre_arbitral',
    name: "Accord de service de conseil pré-arbitral (négociation)",
    category: 'juridique_admin',
    price: 7000,
    priceMax: 20000,
    description: "Convention de conseil juridique préalable à l'engagement d'une procédure arbitrale, pour optimiser la stratégie de négociation.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'conseiller_nom', label: "Nom du conseiller", type: 'text', required: true },
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'objet_negotiation', label: "Objet de la négociation pré-arbitrale", type: 'textarea', required: true },
      { key: 'duree_mission', label: "Durée de la mission", type: 'text', required: true },
      { key: 'tarif_conseil', label: "Tarif de la mission (FCFA)", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>CONVENTION DE SERVICE DE CONSEIL PRÉ-ARBITRAL</h1><p><strong>CONSEILLER :</strong> {{conseiller_nom}}<br/><strong>CLIENT :</strong> {{client_nom}}</p><h2>OBJET DE LA MISSION</h2><p>{{objet_negotiation}}</p><h2>PÉRIMÈTRE</h2><p>La mission consiste à assister le client dans la phase de négociation amiable avec la partie adverse, avant tout recours à l'arbitrage, en vue d'obtenir le meilleur règlement possible du différend.</p><h2>DURÉE ET TARIF</h2><p>Durée : <strong>{{duree_mission}}</strong><br/>Tarif : <strong>{{tarif_conseil}} FCFA</strong></p><p>Signatures : _______________ / _______________</p></div>`
  },
  {
    code: 'arb3_neutralisation_clause_nulle',
    name: "Accord de neutralisation d'une clause d'arbitrage nulle",
    category: 'juridique_admin',
    price: 8000,
    priceMax: 25000,
    description: "Acte visant à constater et neutraliser une clause d'arbitrage pathologique ou nulle, et à convenir d'un mode alternatif de résolution du différend.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 55,
    fieldsJson: F([
      { key: 'partie_a_nom', label: "Nom de la partie A", type: 'text', required: true },
      { key: 'partie_b_nom', label: "Nom de la partie B", type: 'text', required: true },
      { key: 'clause_nulle_description', label: "Description et motif de nullité de la clause", type: 'textarea', required: true },
      { key: 'mode_alternatif', label: "Mode alternatif de résolution convenu", type: 'text', required: true },
      { key: 'date_acte', label: "Date de l'acte", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>ACTE DE NEUTRALISATION D'UNE CLAUSE D'ARBITRAGE NULLE</h1><p>Date : {{date_acte}}</p><p><strong>PARTIE A :</strong> {{partie_a_nom}}<br/><strong>PARTIE B :</strong> {{partie_b_nom}}</p><h2>CLAUSE CONCERNÉE</h2><p>{{clause_nulle_description}}</p><h2>CONSTAT</h2><p>Les parties conviennent que la clause d'arbitrage susvisée est nulle ou inapplicable, et renoncent à s'en prévaloir.</p><h2>MODE ALTERNATIF</h2><p>En remplacement, les parties conviennent de soumettre leurs différends à : <strong>{{mode_alternatif}}</strong>.</p><p>Signatures : _______________ / _______________</p></div>`
  },
  {
    code: 'arb3_med_arb',
    name: "Accord de combinaison arbitrage-médiation (med-arb)",
    category: 'juridique_admin',
    price: 9000,
    priceMax: 28000,
    description: "Convention de procédure hybride med-arb combinant une phase de médiation suivie, en cas d'échec, d'un arbitrage contraignant.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'partie_a_nom', label: "Nom de la partie A", type: 'text', required: true },
      { key: 'partie_b_nom', label: "Nom de la partie B", type: 'text', required: true },
      { key: 'mediateur_arbitre_nom', label: "Nom du médiateur / arbitre", type: 'text', required: true },
      { key: 'delai_mediation', label: "Délai de la phase de médiation", type: 'text', required: true },
      { key: 'institution_med_arb', label: "Institution administrant la procédure", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>CONVENTION DE PROCÉDURE MED-ARB<br/>(Médiation puis Arbitrage)</h1><p><strong>PARTIE A :</strong> {{partie_a_nom}}<br/><strong>PARTIE B :</strong> {{partie_b_nom}}<br/><strong>MÉDIATEUR / ARBITRE :</strong> {{mediateur_arbitre_nom}}</p><h2>PHASE 1 — MÉDIATION</h2><p>Les parties s'engagent d'abord à tenter de résoudre leur différend par la médiation, administrée par <strong>{{institution_med_arb}}</strong>, dans un délai de <strong>{{delai_mediation}}</strong>.</p><h2>PHASE 2 — ARBITRAGE</h2><p>Si la médiation échoue, le médiateur se transforme en arbitre et tranche le différend par une sentence définitive et obligatoire, sauf accord contraire des parties sur la nomination d'un arbitre différent.</p><p>Signatures : _______________ / _______________</p></div>`
  },
  {
    code: 'arb3_financement_tiers',
    name: "Accord de financement d'arbitrage par tiers (third party funding)",
    category: 'juridique_admin',
    price: 12000,
    priceMax: 40000,
    description: "Convention de financement d'une procédure arbitrale par un tiers financeur, avec partage des gains en cas de succès.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 58,
    fieldsJson: F([
      { key: 'financeur_nom', label: "Nom du tiers financeur", type: 'text', required: true },
      { key: 'partie_financee_nom', label: "Nom de la partie financée", type: 'text', required: true },
      { key: 'affaire_arbitrale', label: "Description de l'affaire arbitrale", type: 'textarea', required: true },
      { key: 'montant_financement', label: "Montant du financement accordé (FCFA)", type: 'text', required: true },
      { key: 'retour_sur_succes', label: "Retour financeur en cas de succès (%)", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>CONVENTION DE FINANCEMENT D'ARBITRAGE PAR TIERS<br/>(Third Party Funding)</h1><p><strong>FINANCEUR :</strong> {{financeur_nom}}<br/><strong>PARTIE FINANCÉE :</strong> {{partie_financee_nom}}</p><h2>AFFAIRE ARBITRALE</h2><p>{{affaire_arbitrale}}</p><h2>FINANCEMENT</h2><p>Le financeur s'engage à prendre en charge les coûts de la procédure arbitrale jusqu'à concurrence de <strong>{{montant_financement}} FCFA</strong>.</p><h2>RETOUR SUR SUCCÈS</h2><p>En cas de succès de la partie financée, le financeur percevra <strong>{{retour_sur_succes}}%</strong> des sommes effectivement recouvrées.</p><h2>RISQUE D'ÉCHEC</h2><p>En cas d'échec, le financeur supporte seul les coûts engagés, sans recours contre la partie financée.</p><p>Signatures : _______________ / _______________</p></div>`
  },
  {
    code: 'arb3_confidentialite',
    name: "Accord de confidentialité en arbitrage",
    category: 'juridique_admin',
    price: 5000,
    priceMax: 15000,
    description: "Accord de confidentialité liant les parties, les arbitres et toute personne impliquée dans une procédure arbitrale commerciale.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 72,
    fieldsJson: F([
      { key: 'partie_a_nom', label: "Nom de la partie A", type: 'text', required: true },
      { key: 'partie_b_nom', label: "Nom de la partie B", type: 'text', required: true },
      { key: 'perimetre_confidentialite', label: "Périmètre des informations confidentielles", type: 'textarea', required: true },
      { key: 'duree_confidentialite', label: "Durée de l'obligation de confidentialité", type: 'text', required: true },
      { key: 'affaire_reference', label: "Référence de l'affaire arbitrale", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE CONFIDENTIALITÉ EN ARBITRAGE</h1><p><strong>AFFAIRE :</strong> {{affaire_reference}}</p><p><strong>PARTIE A :</strong> {{partie_a_nom}}<br/><strong>PARTIE B :</strong> {{partie_b_nom}}</p><h2>OBJET</h2><p>Les parties, leurs conseils, les arbitres et tout intervenant à la procédure s'engagent à maintenir la confidentialité de la procédure arbitrale et de toutes les informations échangées dans ce cadre.</p><h2>PÉRIMÈTRE</h2><p>{{perimetre_confidentialite}}</p><h2>DURÉE</h2><p>L'obligation de confidentialité s'applique pendant la procédure et pour une durée de <strong>{{duree_confidentialite}}</strong> après la sentence.</p><p>Signatures : _______________ / _______________</p></div>`
  },
  {
    code: 'arb3_rapport_bilan_arbitrage',
    name: "Rapport de bilan d'arbitrage",
    category: 'juridique_admin',
    price: 7000,
    priceMax: 22000,
    description: "Rapport de synthèse et d'analyse d'une procédure arbitrale achevée, à usage interne de l'entreprise pour tirer les enseignements.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'entreprise_nom', label: "Nom de l'entreprise", type: 'text', required: true },
      { key: 'affaire_arbitrale', label: "Identification de l'affaire arbitrale", type: 'text', required: true },
      { key: 'resultat_sentence', label: "Résultat de la sentence", type: 'textarea', required: true },
      { key: 'cout_total_procedure', label: "Coût total de la procédure (FCFA)", type: 'text', required: true },
      { key: 'date_rapport', label: "Date du rapport", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>RAPPORT DE BILAN D'ARBITRAGE</h1><p><strong>ENTREPRISE :</strong> {{entreprise_nom}}<br/><strong>AFFAIRE :</strong> {{affaire_arbitrale}}<br/><strong>DATE :</strong> {{date_rapport}}</p><h2>RÉSULTAT DE LA SENTENCE</h2><p>{{resultat_sentence}}</p><h2>BILAN FINANCIER</h2><p>Coût total de la procédure : <strong>{{cout_total_procedure}} FCFA</strong></p><h2>ENSEIGNEMENTS ET RECOMMANDATIONS</h2><ul><li>Révision des clauses compromissoires dans les futurs contrats</li><li>Renforcement de la documentation contractuelle</li><li>Formation des équipes à la gestion des litiges</li><li>Évaluation de l'opportunité de mécanismes préventifs</li></ul><p><em>Document confidentiel — Usage interne</em></p></div>`
  },
  {
    code: 'arb3_plan_strategie_pre_contentieux',
    name: "Plan de stratégie pré-contentieux",
    category: 'juridique_admin',
    price: 8000,
    priceMax: 25000,
    description: "Document de planification stratégique avant l'engagement d'un contentieux ou d'un arbitrage, pour maximiser les chances de succès.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 64,
    fieldsJson: F([
      { key: 'entreprise_nom', label: "Nom de l'entreprise", type: 'text', required: true },
      { key: 'adversaire_identite', label: "Identité de la partie adverse", type: 'text', required: true },
      { key: 'analyse_dossier', label: "Analyse des forces et faiblesses du dossier", type: 'textarea', required: true },
      { key: 'objectifs_strategiques', label: "Objectifs stratégiques prioritaires", type: 'textarea', required: true },
      { key: 'budget_previsionnel', label: "Budget prévisionnel contentieux (FCFA)", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>PLAN DE STRATÉGIE PRÉ-CONTENTIEUX</h1><p><strong>ENTREPRISE :</strong> {{entreprise_nom}}<br/><strong>PARTIE ADVERSE :</strong> {{adversaire_identite}}</p><h2>ANALYSE DU DOSSIER</h2><p>{{analyse_dossier}}</p><h2>OBJECTIFS STRATÉGIQUES</h2><p>{{objectifs_strategiques}}</p><h2>BUDGET PRÉVISIONNEL</h2><p>Budget alloué : <strong>{{budget_previsionnel}} FCFA</strong></p><h2>ÉTAPES CLÉS</h2><ol><li>Tentative de règlement amiable</li><li>Mise en demeure formelle si nécessaire</li><li>Saisine d'un médiateur ou d'un arbitre</li><li>Engagement de la procédure contentieuse si les étapes précédentes échouent</li></ol><p><em>Document confidentiel — Usage stratégique</em></p></div>`
  },
  {
    code: 'arb3_charte_arbitrage_etat_droit',
    name: "Charte de l'arbitrage commercial et de l'état de droit en Afrique",
    category: 'juridique_admin',
    price: 8000,
    priceMax: 25000,
    description: "Charte institutionnelle promouvant le développement de l'arbitrage commercial et le renforcement de l'état de droit dans l'espace africain OHADA.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 58,
    fieldsJson: F([
      { key: 'organisation_promotrice', label: "Organisation promotrice de la charte", type: 'text', required: true },
      { key: 'engagements_signataires', label: "Engagements des signataires", type: 'textarea', required: true },
      { key: 'vision_strategique', label: "Vision stratégique pour l'arbitrage africain", type: 'textarea', required: true },
      { key: 'date_adoption', label: "Date d'adoption de la charte", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>CHARTE DE L'ARBITRAGE COMMERCIAL<br/>ET DE L'ÉTAT DE DROIT EN AFRIQUE</h1><p><strong>ORGANISATION PROMOTRICE :</strong> {{organisation_promotrice}}<br/><strong>DATE D'ADOPTION :</strong> {{date_adoption}}</p><h2>PRÉAMBULE</h2><p>Convaincus que l'arbitrage commercial constitue un pilier essentiel de la sécurité juridique et de l'attractivité économique de l'Afrique, les signataires adoptent la présente Charte.</p><h2>VISION STRATÉGIQUE</h2><p>{{vision_strategique}}</p><h2>ENGAGEMENTS DES SIGNATAIRES</h2><p>{{engagements_signataires}}</p><h2>PRINCIPES DIRECTEURS</h2><ul><li>Indépendance et impartialité des arbitres</li><li>Confidentialité et intégrité des procédures</li><li>Célérité et efficacité de la résolution des litiges</li><li>Accessibilité de l'arbitrage pour les PME africaines</li><li>Coopération entre les institutions arbitrales africaines</li></ul><h2>SIGNATAIRES</h2><p>_______________________________________________</p></div>`
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
  console.log(`Batch 112a OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
