import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ─── 25 templates Diplomatie/Consulaire (dipl2_) ───────────────────────────
  {
    code: 'dipl2_accord_bilat_coop_eco',
    name: "Accord bilatéral de coopération économique",
    category: 'juridique_admin',
    price: 20000,
    priceMax: 60000,
    description: "Accord bilatéral formalisant la coopération économique entre deux États souverains, conformément aux principes du droit international public.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 75,
    fieldsJson: F([
      { key: 'etat_partie_a', label: "État Partie A", type: 'text', required: true },
      { key: 'etat_partie_b', label: "État Partie B", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
      { key: 'lieu_signature', label: "Lieu de signature", type: 'text', required: true },
      { key: 'domaines_cooperation', label: "Domaines de coopération", type: 'textarea', required: true },
      { key: 'duree_accord', label: "Durée de l'accord", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD BILATÉRAL DE COOPÉRATION ÉCONOMIQUE</h1>
<p>Entre le Gouvernement de <strong>{{etat_partie_a}}</strong> et le Gouvernement de <strong>{{etat_partie_b}}</strong>,</p>
<p>Ci-après dénommés "les Parties",</p>
<h2>PRÉAMBULE</h2>
<p>Les Parties, animées du désir de renforcer les liens d'amitié et de coopération entre leurs deux pays, soucieuses de développer leurs relations économiques sur la base de l'égalité, du respect mutuel de la souveraineté et de l'avantage réciproque,</p>
<h2>ARTICLE 1 — OBJET</h2>
<p>Le présent Accord a pour objet de définir le cadre général de la coopération économique entre les deux États dans les domaines suivants : {{domaines_cooperation}}.</p>
<h2>ARTICLE 2 — DURÉE</h2>
<p>Le présent Accord est conclu pour une durée de {{duree_accord}}, renouvelable par tacite reconduction.</p>
<h2>ARTICLE 3 — ENTRÉE EN VIGUEUR</h2>
<p>Le présent Accord entre en vigueur à la date de sa signature.</p>
<p>Fait à {{lieu_signature}}, le {{date_signature}}, en deux exemplaires originaux en langue française, faisant également foi.</p>
<p><strong>Pour le Gouvernement de {{etat_partie_a}}</strong></p>
<p><strong>Pour le Gouvernement de {{etat_partie_b}}</strong></p></div>`,
  },
  {
    code: 'dipl2_protocole_accord_intergouv',
    name: "Protocole d'accord intergouvernemental",
    category: 'juridique_admin',
    price: 18000,
    priceMax: 54000,
    description: "Protocole d'accord formalisant les engagements intergouvernementaux dans un secteur spécifique de coopération bilatérale.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'gouvernement_a', label: "Gouvernement A", type: 'text', required: true },
      { key: 'gouvernement_b', label: "Gouvernement B", type: 'text', required: true },
      { key: 'secteur_cooperation', label: "Secteur de coopération", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
      { key: 'engagements', label: "Engagements des Parties", type: 'textarea', required: true },
    ]),
    body: `<div class="doc"><h1>PROTOCOLE D'ACCORD INTERGOUVERNEMENTAL</h1>
<p>Entre le Gouvernement de <strong>{{gouvernement_a}}</strong> et le Gouvernement de <strong>{{gouvernement_b}}</strong>,</p>
<h2>ARTICLE 1 — SECTEUR</h2>
<p>Le présent Protocole porte sur la coopération dans le secteur : {{secteur_cooperation}}.</p>
<h2>ARTICLE 2 — ENGAGEMENTS</h2>
<p>{{engagements}}</p>
<h2>ARTICLE 3 — SUIVI</h2>
<p>Un comité mixte de suivi sera mis en place pour assurer la mise en oeuvre du présent Protocole.</p>
<p>Signé le {{date_signature}}.</p>
<p><strong>Pour {{gouvernement_a}}</strong> &nbsp;&nbsp;&nbsp; <strong>Pour {{gouvernement_b}}</strong></p></div>`,
  },
  {
    code: 'dipl2_mou_etats',
    name: "Mémorandum d'entente (MOU) entre États",
    category: 'juridique_admin',
    price: 16000,
    priceMax: 48000,
    description: "Mémorandum d'entente (Memorandum of Understanding) entre deux États pour encadrer une coopération non contraignante dans un domaine précis.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 72,
    fieldsJson: F([
      { key: 'etat_a', label: "Premier État", type: 'text', required: true },
      { key: 'etat_b', label: "Second État", type: 'text', required: true },
      { key: 'objet_mou', label: "Objet du MOU", type: 'textarea', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
      { key: 'representants', label: "Représentants habilités", type: 'textarea', required: true },
    ]),
    body: `<div class="doc"><h1>MÉMORANDUM D'ENTENTE</h1>
<p>Entre le Gouvernement de <strong>{{etat_a}}</strong> et le Gouvernement de <strong>{{etat_b}}</strong>,</p>
<h2>OBJET</h2>
<p>{{objet_mou}}</p>
<h2>REPRÉSENTANTS</h2>
<p>{{representants}}</p>
<h2>NATURE DU DOCUMENT</h2>
<p>Le présent Mémorandum d'entente n'est pas juridiquement contraignant au sens du droit international. Il exprime la volonté politique commune des Parties de coopérer dans les domaines visés.</p>
<p>Signé le {{date_signature}}.</p></div>`,
  },
  {
    code: 'dipl2_coop_technique_intl',
    name: "Accord de coopération technique internationale",
    category: 'juridique_admin',
    price: 17000,
    priceMax: 51000,
    description: "Accord encadrant le transfert de savoir-faire technique, l'envoi d'experts et la formation de personnel entre deux États.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'pays_donateur', label: "Pays donateur", type: 'text', required: true },
      { key: 'pays_beneficiaire', label: "Pays bénéficiaire", type: 'text', required: true },
      { key: 'domaine_technique', label: "Domaine technique", type: 'text', required: true },
      { key: 'programme_formation', label: "Programme de formation prévu", type: 'textarea', required: true },
      { key: 'duree', label: "Durée du programme", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE COOPÉRATION TECHNIQUE INTERNATIONALE</h1>
<p>Entre le Gouvernement de <strong>{{pays_donateur}}</strong> (Partie fournissant l'assistance) et le Gouvernement de <strong>{{pays_beneficiaire}}</strong> (Partie bénéficiaire),</p>
<h2>ARTICLE 1 — DOMAINE</h2>
<p>La coopération technique porte sur : {{domaine_technique}}.</p>
<h2>ARTICLE 2 — PROGRAMME</h2>
<p>{{programme_formation}}</p>
<h2>ARTICLE 3 — DURÉE</h2>
<p>Le présent accord couvre une période de {{duree}}.</p>
<p>Fait le {{date_signature}}.</p></div>`,
  },
  {
    code: 'dipl2_don_g2g',
    name: "Accord de don de gouvernement à gouvernement (G2G)",
    category: 'juridique_admin',
    price: 19000,
    priceMax: 57000,
    description: "Accord de don G2G formalisant le transfert gratuit de ressources financières ou matérielles d'un gouvernement à un autre.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'gouvernement_donateur', label: "Gouvernement donateur", type: 'text', required: true },
      { key: 'gouvernement_receveur', label: "Gouvernement receveur", type: 'text', required: true },
      { key: 'montant_don', label: "Montant ou nature du don", type: 'text', required: true },
      { key: 'affectation_don', label: "Affectation du don", type: 'textarea', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE DON DE GOUVERNEMENT À GOUVERNEMENT (G2G)</h1>
<p>Entre le Gouvernement de <strong>{{gouvernement_donateur}}</strong> et le Gouvernement de <strong>{{gouvernement_receveur}}</strong>,</p>
<h2>ARTICLE 1 — OBJET DU DON</h2>
<p>Le Gouvernement de {{gouvernement_donateur}} octroie à titre de don la somme ou les ressources suivantes : <strong>{{montant_don}}</strong>.</p>
<h2>ARTICLE 2 — AFFECTATION</h2>
<p>{{affectation_don}}</p>
<h2>ARTICLE 3 — CONDITIONS</h2>
<p>Le présent don est accordé sans condition de remboursement. Le Gouvernement receveur s'engage à en rendre compte dans les conditions définies en annexe.</p>
<p>Signé le {{date_signature}}.</p></div>`,
  },
  {
    code: 'dipl2_pret_concessionnel',
    name: "Accord de prêt concessionnel (aide bilatérale)",
    category: 'juridique_admin',
    price: 22000,
    priceMax: 66000,
    description: "Accord de prêt à conditions préférentielles (taux réduit, longue durée) accordé par un État à un autre dans le cadre de la coopération bilatérale.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'pret_etat_creancier', label: "État créancier", type: 'text', required: true },
      { key: 'pret_etat_debiteur', label: "État débiteur", type: 'text', required: true },
      { key: 'montant_pret', label: "Montant du prêt (en FCFA ou devise)", type: 'text', required: true },
      { key: 'taux_interet', label: "Taux d'intérêt annuel (%)", type: 'text', required: true },
      { key: 'duree_remboursement', label: "Durée de remboursement", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE PRÊT CONCESSIONNEL</h1>
<p>Entre le Gouvernement de <strong>{{pret_etat_creancier}}</strong> (le Prêteur) et le Gouvernement de <strong>{{pret_etat_debiteur}}</strong> (l'Emprunteur),</p>
<h2>ARTICLE 1 — MONTANT</h2>
<p>Le Prêteur accorde à l'Emprunteur un prêt concessionnel d'un montant de <strong>{{montant_pret}}</strong>.</p>
<h2>ARTICLE 2 — CONDITIONS FINANCIÈRES</h2>
<p>Taux d'intérêt annuel : {{taux_interet}} — Durée de remboursement : {{duree_remboursement}}.</p>
<h2>ARTICLE 3 — UTILISATION</h2>
<p>Les fonds seront utilisés exclusivement aux fins convenues dans le programme de développement annexé.</p>
<p>Signé le {{date_signature}}.</p></div>`,
  },
  {
    code: 'dipl2_garantie_souveraine',
    name: "Accord de garantie souveraine (banque multilatérale)",
    category: 'juridique_admin',
    price: 23000,
    priceMax: 69000,
    description: "Accord par lequel un État garantit souverainement le remboursement d'un prêt accordé par une banque multilatérale de développement.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 62,
    fieldsJson: F([
      { key: 'etat_garant', label: "État garant", type: 'text', required: true },
      { key: 'banque_multilaterale', label: "Banque multilatérale", type: 'text', required: true },
      { key: 'montant_garanti', label: "Montant garanti", type: 'text', required: true },
      { key: 'projet_finance', label: "Projet financé", type: 'textarea', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE GARANTIE SOUVERAINE</h1>
<p>Entre le Gouvernement de <strong>{{etat_garant}}</strong> et <strong>{{banque_multilaterale}}</strong>,</p>
<h2>ARTICLE 1 — OBJET DE LA GARANTIE</h2>
<p>L'État garant s'engage irrévocablement à garantir le remboursement des sommes dues au titre du prêt d'un montant de <strong>{{montant_garanti}}</strong> accordé pour financer : {{projet_finance}}.</p>
<h2>ARTICLE 2 — ÉTENDUE DE LA GARANTIE</h2>
<p>La garantie souveraine couvre le principal, les intérêts et tous frais accessoires.</p>
<p>Signé le {{date_signature}}.</p></div>`,
  },
  {
    code: 'dipl2_investissement_bilat_bit',
    name: "Accord d'investissement bilatéral (BIT)",
    category: 'juridique_admin',
    price: 21000,
    priceMax: 63000,
    description: "Traité bilatéral d'investissement (BIT) offrant des protections aux investisseurs des deux États et prévoyant des mécanismes d'arbitrage international.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 73,
    fieldsJson: F([
      { key: 'etat_a', label: "Premier État", type: 'text', required: true },
      { key: 'etat_b', label: "Second État", type: 'text', required: true },
      { key: 'protections_investisseurs', label: "Protections accordées aux investisseurs", type: 'textarea', required: true },
      { key: 'mecanisme_arbitrage', label: "Mécanisme d'arbitrage (CIRDI / CNUDCI)", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD D'INVESTISSEMENT BILATÉRAL (BIT)</h1>
<p>Entre le Gouvernement de <strong>{{etat_a}}</strong> et le Gouvernement de <strong>{{etat_b}}</strong>,</p>
<h2>ARTICLE 1 — PROTECTION DES INVESTISSEMENTS</h2>
<p>{{protections_investisseurs}}</p>
<h2>ARTICLE 2 — RÈGLEMENT DES DIFFÉRENDS</h2>
<p>Tout différend entre un investisseur et un État hôte sera soumis à arbitrage selon les règles : {{mecanisme_arbitrage}}.</p>
<h2>ARTICLE 3 — TRAITEMENT NATIONAL ET NPF</h2>
<p>Chaque État accordera aux investisseurs de l'autre Partie un traitement non moins favorable que celui accordé à ses propres investisseurs.</p>
<p>Signé le {{date_signature}}.</p></div>`,
  },
  {
    code: 'dipl2_non_double_imposition',
    name: "Accord de non double imposition (convention fiscale)",
    category: 'juridique_admin',
    price: 20000,
    priceMax: 60000,
    description: "Convention fiscale bilatérale visant à éliminer la double imposition des personnes physiques et morales exerçant des activités dans les deux États.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 78,
    fieldsJson: F([
      { key: 'etat_a', label: "Premier État contractant", type: 'text', required: true },
      { key: 'etat_b', label: "Second État contractant", type: 'text', required: true },
      { key: 'impots_vises', label: "Impôts visés par la convention", type: 'textarea', required: true },
      { key: 'methode_elimination', label: "Méthode d'élimination de la double imposition", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONVENTION FISCALE — NON DOUBLE IMPOSITION</h1>
<p>Entre le Gouvernement de <strong>{{etat_a}}</strong> et le Gouvernement de <strong>{{etat_b}}</strong>,</p>
<h2>ARTICLE 1 — IMPÔTS VISÉS</h2>
<p>{{impots_vises}}</p>
<h2>ARTICLE 2 — RÉSIDENCE FISCALE</h2>
<p>La résidence fiscale d'une personne est déterminée selon les règles établies dans la présente Convention.</p>
<h2>ARTICLE 3 — ÉLIMINATION DE LA DOUBLE IMPOSITION</h2>
<p>Méthode retenue : {{methode_elimination}}.</p>
<h2>ARTICLE 4 — NON-DISCRIMINATION</h2>
<p>Les ressortissants d'un État contractant ne seront soumis dans l'autre État à aucune imposition plus lourde que les ressortissants de cet autre État.</p>
<p>Signé le {{date_signature}}.</p></div>`,
  },
  {
    code: 'dipl2_libre_echange_zlecaf',
    name: "Accord de libre-échange (ZLECAF modèle)",
    category: 'juridique_admin',
    price: 22000,
    priceMax: 66000,
    description: "Accord de libre-échange inspiré du cadre de la Zone de Libre-Échange Continentale Africaine (ZLECAF), applicable aux échanges commerciaux bilatéraux.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 71,
    fieldsJson: F([
      { key: 'etat_a', label: "Premier État", type: 'text', required: true },
      { key: 'etat_b', label: "Second État", type: 'text', required: true },
      { key: 'produits_vises', label: "Produits et secteurs visés", type: 'textarea', required: true },
      { key: 'calendrier_demant', label: "Calendrier de démantèlement tarifaire", type: 'textarea', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE LIBRE-ÉCHANGE (MODÈLE ZLECAF)</h1>
<p>Entre le Gouvernement de <strong>{{etat_a}}</strong> et le Gouvernement de <strong>{{etat_b}}</strong>,</p>
<h2>ARTICLE 1 — ZONE DE LIBRE-ÉCHANGE</h2>
<p>Les Parties établissent entre elles une zone de libre-échange portant sur : {{produits_vises}}.</p>
<h2>ARTICLE 2 — DÉMANTÈLEMENT TARIFAIRE</h2>
<p>{{calendrier_demant}}</p>
<h2>ARTICLE 3 — RÈGLES D'ORIGINE</h2>
<p>Les règles d'origine applicables sont définies en annexe au présent Accord, conformément au cadre ZLECAF.</p>
<p>Signé le {{date_signature}}.</p></div>`,
  },
  {
    code: 'dipl2_coop_douaniere',
    name: "Accord de coopération douanière inter-États",
    category: 'juridique_admin',
    price: 15000,
    priceMax: 45000,
    description: "Accord de coopération entre administrations douanières de deux États pour lutter contre la fraude, faciliter le commerce et harmoniser les procédures.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 66,
    fieldsJson: F([
      { key: 'admin_douaniere_a', label: "Administration douanière A", type: 'text', required: true },
      { key: 'admin_douaniere_b', label: "Administration douanière B", type: 'text', required: true },
      { key: 'domaines_coop', label: "Domaines de coopération douanière", type: 'textarea', required: true },
      { key: 'echange_renseignements', label: "Modalités d'échange de renseignements", type: 'textarea', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE COOPÉRATION DOUANIÈRE INTER-ÉTATS</h1>
<p>Entre <strong>{{admin_douaniere_a}}</strong> et <strong>{{admin_douaniere_b}}</strong>,</p>
<h2>ARTICLE 1 — DOMAINES DE COOPÉRATION</h2>
<p>{{domaines_coop}}</p>
<h2>ARTICLE 2 — ÉCHANGE DE RENSEIGNEMENTS</h2>
<p>{{echange_renseignements}}</p>
<h2>ARTICLE 3 — ASSISTANCE MUTUELLE</h2>
<p>Les Parties s'engagent à se prêter mutuellement assistance pour prévenir et réprimer les infractions douanières conformément à leur droit interne.</p>
<p>Signé le {{date_signature}}.</p></div>`,
  },
  {
    code: 'dipl2_coop_policiere_judiciaire',
    name: "Accord de coopération policière et judiciaire",
    category: 'juridique_admin',
    price: 17000,
    priceMax: 51000,
    description: "Accord bilatéral de coopération entre services de police et autorités judiciaires pour la lutte contre la criminalité transnationale.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 64,
    fieldsJson: F([
      { key: 'etat_a', label: "Premier État", type: 'text', required: true },
      { key: 'etat_b', label: "Second État", type: 'text', required: true },
      { key: 'formes_cooperation', label: "Formes de coopération prévues", type: 'textarea', required: true },
      { key: 'autorites_competentes', label: "Autorités compétentes désignées", type: 'textarea', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE COOPÉRATION POLICIÈRE ET JUDICIAIRE</h1>
<p>Entre le Gouvernement de <strong>{{etat_a}}</strong> et le Gouvernement de <strong>{{etat_b}}</strong>,</p>
<h2>ARTICLE 1 — FORMES DE COOPÉRATION</h2>
<p>{{formes_cooperation}}</p>
<h2>ARTICLE 2 — AUTORITÉS COMPÉTENTES</h2>
<p>{{autorites_competentes}}</p>
<h2>ARTICLE 3 — PROTECTION DES DONNÉES</h2>
<p>Les informations échangées dans le cadre du présent Accord sont protégées conformément à la législation de chaque État et aux normes internationales applicables.</p>
<p>Signé le {{date_signature}}.</p></div>`,
  },
  {
    code: 'dipl2_extradition_bilat',
    name: "Accord d'extradition bilatérale",
    category: 'juridique_admin',
    price: 19000,
    priceMax: 57000,
    description: "Traité d'extradition bilatérale définissant les conditions et procédures de remise de personnes poursuivies ou condamnées entre deux États.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 61,
    fieldsJson: F([
      { key: 'etat_requerant', label: "État requérant", type: 'text', required: true },
      { key: 'etat_requis', label: "État requis", type: 'text', required: true },
      { key: 'infractions_extradables', label: "Infractions pouvant donner lieu à extradition", type: 'textarea', required: true },
      { key: 'motifs_refus', label: "Motifs de refus d'extradition", type: 'textarea', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD D'EXTRADITION BILATÉRALE</h1>
<p>Entre le Gouvernement de <strong>{{etat_requerant}}</strong> et le Gouvernement de <strong>{{etat_requis}}</strong>,</p>
<h2>ARTICLE 1 — OBLIGATION D'EXTRADER</h2>
<p>Les Parties s'engagent à se livrer réciproquement les personnes qui se trouvent sur leur territoire et qui sont poursuivies ou ont été condamnées par les autorités judiciaires de l'autre Partie pour les infractions suivantes : {{infractions_extradables}}.</p>
<h2>ARTICLE 2 — MOTIFS DE REFUS</h2>
<p>{{motifs_refus}}</p>
<h2>ARTICLE 3 — PRINCIPE NON BIS IN IDEM</h2>
<p>L'extradition est refusée si la personne réclamée a déjà été définitivement jugée pour les mêmes faits dans l'État requis.</p>
<p>Signé le {{date_signature}}.</p></div>`,
  },
  {
    code: 'dipl2_readmission_migrants',
    name: "Accord de réadmission des migrants",
    category: 'juridique_admin',
    price: 16000,
    priceMax: 48000,
    description: "Accord bilatéral de réadmission définissant les conditions et procédures de retour des ressortissants en situation irrégulière.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 67,
    fieldsJson: F([
      { key: 'etat_a', label: "Premier État", type: 'text', required: true },
      { key: 'etat_b', label: "Second État", type: 'text', required: true },
      { key: 'categories_personnes', label: "Catégories de personnes concernées", type: 'textarea', required: true },
      { key: 'procedure_readmission', label: "Procédure de réadmission", type: 'textarea', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE RÉADMISSION DES MIGRANTS</h1>
<p>Entre le Gouvernement de <strong>{{etat_a}}</strong> et le Gouvernement de <strong>{{etat_b}}</strong>,</p>
<h2>ARTICLE 1 — CHAMP D'APPLICATION</h2>
<p>Le présent Accord s'applique aux catégories de personnes suivantes : {{categories_personnes}}.</p>
<h2>ARTICLE 2 — PROCÉDURE</h2>
<p>{{procedure_readmission}}</p>
<h2>ARTICLE 3 — DROITS DES PERSONNES RÉADMISES</h2>
<p>Les Parties garantissent le respect des droits fondamentaux des personnes réadmises, conformément au droit international des droits de l'homme.</p>
<p>Signé le {{date_signature}}.</p></div>`,
  },
  {
    code: 'dipl2_mobilite_mdo_cedeao',
    name: "Accord de mobilité de la main-d'oeuvre (CEDEAO)",
    category: 'juridique_admin',
    price: 15000,
    priceMax: 45000,
    description: "Accord bilatéral facilitant la libre circulation des travailleurs dans le cadre du Protocole CEDEAO sur la libre circulation des personnes.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 74,
    fieldsJson: F([
      { key: 'etat_a', label: "Premier État membre CEDEAO", type: 'text', required: true },
      { key: 'etat_b', label: "Second État membre CEDEAO", type: 'text', required: true },
      { key: 'secteurs_vises', label: "Secteurs professionnels visés", type: 'textarea', required: true },
      { key: 'conditions_acces', label: "Conditions d'accès au marché du travail", type: 'textarea', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE MOBILITÉ DE LA MAIN-D'OEUVRE (CEDEAO)</h1>
<p>Entre le Gouvernement de <strong>{{etat_a}}</strong> et le Gouvernement de <strong>{{etat_b}}</strong>,</p>
<p>Vu le Protocole de la CEDEAO relatif à la libre circulation des personnes, au droit de résidence et d'établissement,</p>
<h2>ARTICLE 1 — SECTEURS CONCERNÉS</h2>
<p>{{secteurs_vises}}</p>
<h2>ARTICLE 2 — CONDITIONS D'ACCÈS</h2>
<p>{{conditions_acces}}</p>
<h2>ARTICLE 3 — PROTECTION SOCIALE</h2>
<p>Les travailleurs migrants bénéficieront de la protection sociale assurée aux nationaux dans les conditions définies en annexe.</p>
<p>Signé le {{date_signature}}.</p></div>`,
  },
  {
    code: 'dipl2_coop_univ_bilat',
    name: "Accord de coopération universitaire bilatérale",
    category: 'juridique_admin',
    price: 12000,
    priceMax: 36000,
    description: "Accord-cadre de coopération entre universités ou ministères de l'enseignement supérieur de deux États pour la mobilité étudiante et la recherche conjointe.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 69,
    fieldsJson: F([
      { key: 'universite_a', label: "Institution / Ministère A", type: 'text', required: true },
      { key: 'universite_b', label: "Institution / Ministère B", type: 'text', required: true },
      { key: 'axes_cooperation', label: "Axes de coopération", type: 'textarea', required: true },
      { key: 'mobilite_etudiants', label: "Quota annuel de mobilité étudiante", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE COOPÉRATION UNIVERSITAIRE BILATÉRALE</h1>
<p>Entre <strong>{{universite_a}}</strong> et <strong>{{universite_b}}</strong>,</p>
<h2>ARTICLE 1 — AXES DE COOPÉRATION</h2>
<p>{{axes_cooperation}}</p>
<h2>ARTICLE 2 — MOBILITÉ ÉTUDIANTE</h2>
<p>Les Parties conviennent d'un quota annuel de mobilité étudiante de {{mobilite_etudiants}} étudiants par an et par Partie.</p>
<h2>ARTICLE 3 — PROGRAMMES CONJOINTS</h2>
<p>Les Parties pourront développer des programmes de formation conjoints et des projets de recherche communs dans les domaines définis en annexe.</p>
<p>Signé le {{date_signature}}.</p></div>`,
  },
  {
    code: 'dipl2_reconnaissance_diplomes',
    name: "Accord de reconnaissance mutuelle des diplômes",
    category: 'juridique_admin',
    price: 13000,
    priceMax: 39000,
    description: "Convention bilatérale de reconnaissance mutuelle des diplômes et qualifications académiques délivrés par les établissements des deux États.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 72,
    fieldsJson: F([
      { key: 'etat_a', label: "Premier État", type: 'text', required: true },
      { key: 'etat_b', label: "Second État", type: 'text', required: true },
      { key: 'niveaux_diplomes', label: "Niveaux de diplômes reconnus", type: 'textarea', required: true },
      { key: 'autorite_evaluation', label: "Autorité d'évaluation compétente", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE RECONNAISSANCE MUTUELLE DES DIPLÔMES</h1>
<p>Entre le Gouvernement de <strong>{{etat_a}}</strong> et le Gouvernement de <strong>{{etat_b}}</strong>,</p>
<h2>ARTICLE 1 — DIPLÔMES RECONNUS</h2>
<p>Les Parties reconnaissent mutuellement les diplômes suivants : {{niveaux_diplomes}}.</p>
<h2>ARTICLE 2 — AUTORITÉ D'ÉVALUATION</h2>
<p>En cas de litige ou d'incertitude, l'autorité compétente est : {{autorite_evaluation}}.</p>
<h2>ARTICLE 3 — ÉQUIVALENCES</h2>
<p>Un tableau des équivalences est annexé au présent Accord et mis à jour annuellement par une commission mixte.</p>
<p>Signé le {{date_signature}}.</p></div>`,
  },
  {
    code: 'dipl2_protocole_culturel',
    name: "Protocole de coopération culturelle",
    category: 'juridique_admin',
    price: 11000,
    priceMax: 33000,
    description: "Protocole bilatéral de coopération culturelle pour les échanges artistiques, la protection du patrimoine et la promotion des langues.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 63,
    fieldsJson: F([
      { key: 'etat_a', label: "Premier État", type: 'text', required: true },
      { key: 'etat_b', label: "Second État", type: 'text', required: true },
      { key: 'domaines_culturels', label: "Domaines culturels couverts", type: 'textarea', required: true },
      { key: 'activites_prevues', label: "Activités culturelles prévues", type: 'textarea', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>PROTOCOLE DE COOPÉRATION CULTURELLE</h1>
<p>Entre le Gouvernement de <strong>{{etat_a}}</strong> et le Gouvernement de <strong>{{etat_b}}</strong>,</p>
<h2>ARTICLE 1 — DOMAINES CULTURELS</h2>
<p>{{domaines_culturels}}</p>
<h2>ARTICLE 2 — ACTIVITÉS PRÉVUES</h2>
<p>{{activites_prevues}}</p>
<h2>ARTICLE 3 — PATRIMOINE COMMUN</h2>
<p>Les Parties s'engagent à coopérer pour la protection et la valorisation du patrimoine culturel commun et à lutter contre le trafic illicite de biens culturels.</p>
<p>Signé le {{date_signature}}.</p></div>`,
  },
  {
    code: 'dipl2_visa_courtoisie',
    name: "Accord de visa de courtoisie diplomatique",
    category: 'juridique_admin',
    price: 10000,
    priceMax: 30000,
    description: "Accord bilatéral établissant un régime de visa de courtoisie ou d'exemption de visa pour les titulaires de passeports diplomatiques et de service.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'etat_a', label: "Premier État", type: 'text', required: true },
      { key: 'etat_b', label: "Second État", type: 'text', required: true },
      { key: 'categories_passeports', label: "Catégories de passeports concernées", type: 'text', required: true },
      { key: 'duree_sejour', label: "Durée maximale du séjour sans visa", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE VISA DE COURTOISIE DIPLOMATIQUE</h1>
<p>Entre le Gouvernement de <strong>{{etat_a}}</strong> et le Gouvernement de <strong>{{etat_b}}</strong>,</p>
<h2>ARTICLE 1 — EXEMPTION DE VISA</h2>
<p>Les titulaires de {{categories_passeports}} sont exemptés de visa pour des séjours n'excédant pas {{duree_sejour}}.</p>
<h2>ARTICLE 2 — CONDITIONS</h2>
<p>Cette exemption est accordée à titre de courtoisie diplomatique et peut être suspendue par l'une ou l'autre des Parties moyennant un préavis de trente (30) jours.</p>
<h2>ARTICLE 3 — ENTRÉE EN VIGUEUR</h2>
<p>Le présent Accord entre en vigueur à la date de sa signature.</p>
<p>Signé le {{date_signature}}.</p></div>`,
  },
  {
    code: 'dipl2_protection_diplo_vienne',
    name: "Accord de protection des diplomates (Convention de Vienne)",
    category: 'juridique_admin',
    price: 14000,
    priceMax: 42000,
    description: "Accord bilatéral complémentaire à la Convention de Vienne sur les relations diplomatiques, précisant les modalités de protection des agents diplomatiques.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'etat_accreditant', label: "État accréditant", type: 'text', required: true },
      { key: 'etat_accreditaire', label: "État accréditaire", type: 'text', required: true },
      { key: 'privileges_immunites', label: "Privilèges et immunités accordés", type: 'textarea', required: true },
      { key: 'taille_mission', label: "Taille maximale de la mission diplomatique", type: 'text', required: false },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE PROTECTION DES DIPLOMATES</h1>
<p>Vu la Convention de Vienne sur les relations diplomatiques du 18 avril 1961,</p>
<p>Entre le Gouvernement de <strong>{{etat_accreditant}}</strong> et le Gouvernement de <strong>{{etat_accreditaire}}</strong>,</p>
<h2>ARTICLE 1 — PRIVILÈGES ET IMMUNITÉS</h2>
<p>{{privileges_immunites}}</p>
<h2>ARTICLE 2 — TAILLE DE LA MISSION</h2>
<p>Taille maximale convenue : {{taille_mission}}.</p>
<h2>ARTICLE 3 — OBLIGATIONS DE L'ÉTAT ACCRÉDITANT</h2>
<p>L'État accréditant s'engage à respecter les lois et règlements de l'État accréditaire et à ne pas s'ingérer dans ses affaires intérieures.</p>
<p>Signé le {{date_signature}}.</p></div>`,
  },
  {
    code: 'dipl2_siege_org_intl',
    name: "Accord de siège d'organisation internationale",
    category: 'juridique_admin',
    price: 20000,
    priceMax: 60000,
    description: "Accord par lequel un État hôte accueille le siège d'une organisation internationale et lui accorde des privilèges, immunités et facilités.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 58,
    fieldsJson: F([
      { key: 'etat_hote', label: "État hôte", type: 'text', required: true },
      { key: 'organisation', label: "Organisation internationale", type: 'text', required: true },
      { key: 'localisation_siege', label: "Localisation du siège", type: 'text', required: true },
      { key: 'privileges_accordes', label: "Privilèges et facilités accordés", type: 'textarea', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SIÈGE D'ORGANISATION INTERNATIONALE</h1>
<p>Entre le Gouvernement de <strong>{{etat_hote}}</strong> et <strong>{{organisation}}</strong>,</p>
<h2>ARTICLE 1 — SIÈGE</h2>
<p>L'Organisation établit son siège à {{localisation_siege}}, sur le territoire de l'État hôte.</p>
<h2>ARTICLE 2 — PRIVILÈGES ET FACILITÉS</h2>
<p>{{privileges_accordes}}</p>
<h2>ARTICLE 3 — INVIOLABILITÉ DES LOCAUX</h2>
<p>Les locaux de l'Organisation sont inviolables. Les autorités de l'État hôte ne peuvent y pénétrer sans le consentement du Chef de l'Organisation.</p>
<p>Signé le {{date_signature}}.</p></div>`,
  },
  {
    code: 'dipl2_immunite_diplo_personnelle',
    name: "Accord d'immunité diplomatique personnelle",
    category: 'juridique_admin',
    price: 13000,
    priceMax: 39000,
    description: "Accord précisant les immunités personnelles accordées à un envoyé spécial ou représentant diplomatique dans un cadre particulier.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 56,
    fieldsJson: F([
      { key: 'nom_diplomate', label: "Nom et qualité du diplomate", type: 'text', required: true },
      { key: 'etat_envoye', label: "État envoyant", type: 'text', required: true },
      { key: 'etat_accueillant', label: "État accueillant", type: 'text', required: true },
      { key: 'etendue_immunite', label: "Étendue de l'immunité accordée", type: 'textarea', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD D'IMMUNITÉ DIPLOMATIQUE PERSONNELLE</h1>
<p>Entre le Gouvernement de <strong>{{etat_envoye}}</strong> et le Gouvernement de <strong>{{etat_accueillant}}</strong>,</p>
<h2>ARTICLE 1 — BÉNÉFICIAIRE</h2>
<p>Le présent Accord confère des immunités personnelles à <strong>{{nom_diplomate}}</strong>.</p>
<h2>ARTICLE 2 — ÉTENDUE DE L'IMMUNITÉ</h2>
<p>{{etendue_immunite}}</p>
<h2>ARTICLE 3 — DURÉE</h2>
<p>Les immunités accordées par le présent Accord cessent à la fin de la mission diplomatique concernée.</p>
<p>Signé le {{date_signature}}.</p></div>`,
  },
  {
    code: 'dipl2_coop_militaire_tech',
    name: "Accord de coopération militaire technique",
    category: 'juridique_admin',
    price: 22000,
    priceMax: 66000,
    description: "Accord bilatéral de coopération dans les domaines de la défense, de la formation militaire et du transfert d'équipements de défense.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 59,
    fieldsJson: F([
      { key: 'etat_fournisseur', label: "État fournisseur de l'assistance", type: 'text', required: true },
      { key: 'etat_beneficiaire', label: "État bénéficiaire", type: 'text', required: true },
      { key: 'domaines_militaires', label: "Domaines de coopération militaire", type: 'textarea', required: true },
      { key: 'equipements_transferes', label: "Équipements ou formations prévus", type: 'textarea', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE COOPÉRATION MILITAIRE TECHNIQUE</h1>
<p>Entre le Gouvernement de <strong>{{etat_fournisseur}}</strong> et le Gouvernement de <strong>{{etat_beneficiaire}}</strong>,</p>
<h2>ARTICLE 1 — DOMAINES DE COOPÉRATION</h2>
<p>{{domaines_militaires}}</p>
<h2>ARTICLE 2 — ÉQUIPEMENTS ET FORMATIONS</h2>
<p>{{equipements_transferes}}</p>
<h2>ARTICLE 3 — CONFIDENTIALITÉ</h2>
<p>Les informations échangées dans le cadre du présent Accord sont classifiées et ne peuvent être divulguées à des tiers sans l'accord écrit des deux Parties.</p>
<p>Signé le {{date_signature}}.</p></div>`,
  },
  {
    code: 'dipl2_coop_securitaire_transfrontaliere',
    name: "Accord de coopération sécuritaire transfrontalière",
    category: 'juridique_admin',
    price: 18000,
    priceMax: 54000,
    description: "Accord bilatéral de coopération pour la sécurité des zones frontalières communes, la lutte contre le terrorisme et les trafics illicites.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'etat_a', label: "Premier État", type: 'text', required: true },
      { key: 'etat_b', label: "Second État", type: 'text', required: true },
      { key: 'zones_frontalieres', label: "Zones frontalières concernées", type: 'text', required: true },
      { key: 'menaces_visees', label: "Menaces sécuritaires visées", type: 'textarea', required: true },
      { key: 'mecanismes_coordination', label: "Mécanismes de coordination opérationnelle", type: 'textarea', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE COOPÉRATION SÉCURITAIRE TRANSFRONTALIÈRE</h1>
<p>Entre le Gouvernement de <strong>{{etat_a}}</strong> et le Gouvernement de <strong>{{etat_b}}</strong>,</p>
<h2>ARTICLE 1 — ZONES CONCERNÉES</h2>
<p>Le présent Accord couvre les zones frontalières suivantes : {{zones_frontalieres}}.</p>
<h2>ARTICLE 2 — MENACES VISÉES</h2>
<p>{{menaces_visees}}</p>
<h2>ARTICLE 3 — COORDINATION OPÉRATIONNELLE</h2>
<p>{{mecanismes_coordination}}</p>
<p>Signé le {{date_signature}}.</p></div>`,
  },
  {
    code: 'dipl2_charte_diplo_africaine_dev',
    name: "Charte de la diplomatie africaine du développement",
    category: 'juridique_admin',
    price: 14000,
    priceMax: 42000,
    description: "Charte multilatérale africaine définissant les principes et engagements communs pour une diplomatie orientée vers le développement durable du continent.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 55,
    fieldsJson: F([
      { key: 'etats_signataires', label: "États signataires", type: 'textarea', required: true },
      { key: 'principes_directeurs', label: "Principes directeurs de la charte", type: 'textarea', required: true },
      { key: 'objectifs_dev', label: "Objectifs de développement prioritaires", type: 'textarea', required: true },
      { key: 'date_adoption', label: "Date d'adoption", type: 'date', required: true },
      { key: 'lieu_adoption', label: "Lieu d'adoption", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>CHARTE DE LA DIPLOMATIE AFRICAINE DU DÉVELOPPEMENT</h1>
<p>Nous, les États signataires : {{etats_signataires}},</p>
<h2>PRINCIPES DIRECTEURS</h2>
<p>{{principes_directeurs}}</p>
<h2>OBJECTIFS DE DÉVELOPPEMENT</h2>
<p>{{objectifs_dev}}</p>
<h2>ENGAGEMENTS COLLECTIFS</h2>
<p>Les États signataires s'engagent à mobiliser leurs outils diplomatiques au service du développement durable, de la paix et de la prospérité partagée du continent africain.</p>
<p>Adoptée à {{lieu_adoption}}, le {{date_adoption}}.</p></div>`,
  },

  // ─── 25 templates Coopération internationale / ONG (ong3_) ─────────────────
  {
    code: 'ong3_financement_bailleur_ong',
    name: "Accord de financement bailleur-ONG (subvention)",
    category: 'association',
    price: 12000,
    priceMax: 36000,
    description: "Accord de subvention entre un bailleur de fonds et une ONG bénéficiaire définissant les conditions d'utilisation des fonds et les obligations de redevabilité.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 82,
    fieldsJson: F([
      { key: 'bailleur', label: "Bailleur de fonds", type: 'text', required: true },
      { key: 'ong_beneficiaire', label: "ONG bénéficiaire", type: 'text', required: true },
      { key: 'montant_subvention', label: "Montant de la subvention (FCFA)", type: 'text', required: true },
      { key: 'objet_projet', label: "Objet du projet financé", type: 'textarea', required: true },
      { key: 'duree_projet', label: "Durée du projet", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE FINANCEMENT — SUBVENTION ONG</h1>
<p>Entre <strong>{{bailleur}}</strong> (le Bailleur) et <strong>{{ong_beneficiaire}}</strong> (le Bénéficiaire),</p>
<h2>ARTICLE 1 — SUBVENTION</h2>
<p>Le Bailleur accorde au Bénéficiaire une subvention d'un montant de <strong>{{montant_subvention}} FCFA</strong> pour financer : {{objet_projet}}.</p>
<h2>ARTICLE 2 — DURÉE</h2>
<p>Le projet est mis en oeuvre sur une période de {{duree_projet}}.</p>
<h2>ARTICLE 3 — CONDITIONS D'UTILISATION</h2>
<p>Les fonds sont utilisés exclusivement aux fins prévues. Toute modification substantielle du budget requiert l'approbation écrite préalable du Bailleur.</p>
<h2>ARTICLE 4 — REDEVABILITÉ</h2>
<p>Le Bénéficiaire soumettra des rapports d'avancement trimestriels et un rapport final dans les soixante (60) jours suivant la fin du projet.</p>
<p>Signé le {{date_signature}}.</p></div>`,
  },
  {
    code: 'ong3_financement_usaid',
    name: "Accord de financement USAID-ONG",
    category: 'association',
    price: 15000,
    priceMax: 45000,
    description: "Accord de coopération ou subvention USAID (Cooperative Agreement / Grant) adapté au contexte des ONG africaines opérant avec le financement américain.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 79,
    fieldsJson: F([
      { key: 'bureau_usaid', label: "Bureau USAID compétent", type: 'text', required: true },
      { key: 'ong_partenaire', label: "ONG partenaire", type: 'text', required: true },
      { key: 'numero_accord', label: "Numéro de l'accord USAID", type: 'text', required: true },
      { key: 'montant_total', label: "Montant total de l'accord (USD)", type: 'text', required: true },
      { key: 'periode_performance', label: "Période de performance", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE FINANCEMENT USAID</h1>
<p>Accord N° <strong>{{numero_accord}}</strong></p>
<p>Entre <strong>{{bureau_usaid}}</strong> (USAID) et <strong>{{ong_partenaire}}</strong> (le Récipiendaire),</p>
<h2>ARTICLE 1 — FINANCEMENT</h2>
<p>USAID octroie un financement de <strong>{{montant_total}} USD</strong> pour la période de {{periode_performance}}.</p>
<h2>ARTICLE 2 — CONFORMITÉ</h2>
<p>Le Récipiendaire s'engage à respecter les règlements USAID applicables (2 CFR 200, ADS), à tenir une comptabilité séparée et à se soumettre aux audits requis.</p>
<h2>ARTICLE 3 — RAPPORTAGE</h2>
<p>Des rapports programmatiques et financiers seront soumis selon le calendrier défini en annexe.</p>
<p>Signé le {{date_signature}}.</p></div>`,
  },
  {
    code: 'ong3_financement_ue',
    name: "Accord de financement UE-ONG (contrat de subvention)",
    category: 'association',
    price: 14000,
    priceMax: 42000,
    description: "Contrat de subvention de l'Union européenne adapté pour les ONG africaines bénéficiaires de financements EDF, NDICI ou instruments thématiques.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 80,
    fieldsJson: F([
      { key: 'delegation_ue', label: "Délégation UE compétente", type: 'text', required: true },
      { key: 'ong_contractante', label: "ONG contractante", type: 'text', required: true },
      { key: 'reference_contrat', label: "Référence du contrat", type: 'text', required: true },
      { key: 'montant_ue', label: "Montant UE (EUR)", type: 'text', required: true },
      { key: 'cofinancement', label: "Cofinancement ONG (%)", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SUBVENTION UE-ONG</h1>
<p>Réf. : <strong>{{reference_contrat}}</strong></p>
<p>Entre la <strong>{{delegation_ue}}</strong> au nom de l'Union européenne et <strong>{{ong_contractante}}</strong> (le Bénéficiaire),</p>
<h2>ARTICLE 1 — MONTANT ET COFINANCEMENT</h2>
<p>La contribution UE s'élève à <strong>{{montant_ue}} EUR</strong>. Le Bénéficiaire apporte un cofinancement de {{cofinancement}} du coût total éligible.</p>
<h2>ARTICLE 2 — RÈGLES APPLICABLES</h2>
<p>Le présent contrat est régi par les règles et procédures de l'UE pour les contrats de subvention externes (PRAG).</p>
<h2>ARTICLE 3 — VISIBILITÉ</h2>
<p>Le Bénéficiaire s'engage à assurer la visibilité du financement UE conformément aux directives de communication de l'Union européenne.</p>
<p>Signé le {{date_signature}}.</p></div>`,
  },
  {
    code: 'ong3_financement_afd',
    name: "Accord de financement AFD-ONG",
    category: 'association',
    price: 13000,
    priceMax: 39000,
    description: "Convention de subvention ou de délégation de maîtrise d'ouvrage entre l'Agence Française de Développement (AFD) et une ONG partenaire.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 76,
    fieldsJson: F([
      { key: 'agence_afd', label: "Agence AFD compétente", type: 'text', required: true },
      { key: 'ong_moa', label: "ONG maître d'ouvrage délégué", type: 'text', required: true },
      { key: 'montant_afd', label: "Montant de la subvention AFD (EUR)", type: 'text', required: true },
      { key: 'pays_intervention', label: "Pays d'intervention", type: 'text', required: true },
      { key: 'duree_convention', label: "Durée de la convention", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONVENTION AFD-ONG — FINANCEMENT DE PROJET</h1>
<p>Entre l'<strong>{{agence_afd}}</strong> (AFD) et <strong>{{ong_moa}}</strong> (le Maître d'Ouvrage Délégué),</p>
<h2>ARTICLE 1 — OBJET</h2>
<p>L'AFD confie au Maître d'Ouvrage Délégué la réalisation d'actions de développement au {{pays_intervention}} pour un montant de <strong>{{montant_afd}} EUR</strong>.</p>
<h2>ARTICLE 2 — DURÉE</h2>
<p>La présente convention est conclue pour {{duree_convention}}.</p>
<h2>ARTICLE 3 — OBLIGATIONS</h2>
<p>Le Maître d'Ouvrage Délégué s'engage à respecter les procédures de passation de marchés AFD, à rendre compte trimestriellement et à faciliter les missions de supervision.</p>
<p>Signé le {{date_signature}}.</p></div>`,
  },
  {
    code: 'ong3_financement_bm',
    name: "Accord de financement Banque Mondiale-ONG",
    category: 'association',
    price: 15000,
    priceMax: 45000,
    description: "Accord de partenariat entre la Banque Mondiale (ou un projet Banque Mondiale) et une ONG pour la mise en oeuvre d'activités sur le terrain.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 77,
    fieldsJson: F([
      { key: 'projet_bm', label: "Projet Banque Mondiale / Unité de gestion", type: 'text', required: true },
      { key: 'ong_implementeur', label: "ONG implémentatrice", type: 'text', required: true },
      { key: 'montant_bm', label: "Montant alloué (USD)", type: 'text', required: true },
      { key: 'composante_projet', label: "Composante du projet concernée", type: 'textarea', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT BANQUE MONDIALE-ONG</h1>
<p>Entre le <strong>{{projet_bm}}</strong> et <strong>{{ong_implementeur}}</strong> (l'Implémentatrice),</p>
<h2>ARTICLE 1 — ACTIVITÉS</h2>
<p>L'Implémentatrice prend en charge la mise en oeuvre des activités de la composante suivante : {{composante_projet}}.</p>
<h2>ARTICLE 2 — FINANCEMENT</h2>
<p>Un montant de <strong>{{montant_bm}} USD</strong> est alloué à cet effet, selon le plan de décaissement annexé.</p>
<h2>ARTICLE 3 — SAUVEGARDE</h2>
<p>L'Implémentatrice applique les politiques de sauvegarde environnementale et sociale de la Banque Mondiale applicables au projet.</p>
<p>Signé le {{date_signature}}.</p></div>`,
  },
  {
    code: 'ong3_aide_budgetaire_sectorielle',
    name: "Accord de coopération délégué (aide budgétaire sectorielle)",
    category: 'association',
    price: 16000,
    priceMax: 48000,
    description: "Accord de coopération déléguée par lequel un bailleur confie à une organisation partenaire la gestion d'un appui budgétaire sectorielle.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 64,
    fieldsJson: F([
      { key: 'bailleur_delegant', label: "Bailleur délégant", type: 'text', required: true },
      { key: 'organisme_delegue', label: "Organisme délégué", type: 'text', required: true },
      { key: 'secteur_cible', label: "Secteur cible de l'appui budgétaire", type: 'text', required: true },
      { key: 'montant_delegue', label: "Montant délégué", type: 'text', required: true },
      { key: 'indicateurs_resultat', label: "Indicateurs de résultats attendus", type: 'textarea', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE COOPÉRATION DÉLÉGUÉE — AIDE BUDGÉTAIRE SECTORIELLE</h1>
<p>Entre <strong>{{bailleur_delegant}}</strong> et <strong>{{organisme_delegue}}</strong>,</p>
<h2>ARTICLE 1 — DÉLÉGATION</h2>
<p>Le Bailleur délégant confie à l'Organisme délégué la gestion d'un appui budgétaire au secteur {{secteur_cible}} d'un montant de <strong>{{montant_delegue}}</strong>.</p>
<h2>ARTICLE 2 — INDICATEURS</h2>
<p>{{indicateurs_resultat}}</p>
<h2>ARTICLE 3 — RESPONSABILITÉ FIDUCIAIRE</h2>
<p>L'Organisme délégué assume la pleine responsabilité fiduciaire et technique pour la gestion des fonds délégués.</p>
<p>Signé le {{date_signature}}.</p></div>`,
  },
  {
    code: 'ong3_partenariat_intl_locale',
    name: "Accord de partenariat ONG internationale-ONG locale",
    category: 'association',
    price: 10000,
    priceMax: 30000,
    description: "Accord de partenariat stratégique entre une ONG internationale et une ONG locale pour la mise en oeuvre conjointe de programmes de développement.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 85,
    fieldsJson: F([
      { key: 'ong_intl', label: "ONG internationale", type: 'text', required: true },
      { key: 'ong_locale', label: "ONG locale partenaire", type: 'text', required: true },
      { key: 'zone_intervention', label: "Zone et secteur d'intervention", type: 'textarea', required: true },
      { key: 'repartition_roles', label: "Répartition des rôles et responsabilités", type: 'textarea', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT ONG INTERNATIONALE — ONG LOCALE</h1>
<p>Entre <strong>{{ong_intl}}</strong> (le Partenaire international) et <strong>{{ong_locale}}</strong> (le Partenaire local),</p>
<h2>ARTICLE 1 — ZONE ET SECTEUR</h2>
<p>{{zone_intervention}}</p>
<h2>ARTICLE 2 — RÔLES ET RESPONSABILITÉS</h2>
<p>{{repartition_roles}}</p>
<h2>ARTICLE 3 — RENFORCEMENT DE CAPACITÉS</h2>
<p>Le Partenaire international s'engage à appuyer le renforcement institutionnel et technique du Partenaire local dans le cadre du présent accord.</p>
<h2>ARTICLE 4 — PARTAGE DES RESSOURCES</h2>
<p>Les modalités de partage des ressources financières, humaines et matérielles sont définies en annexe budgétaire.</p>
<p>Signé le {{date_signature}}.</p></div>`,
  },
  {
    code: 'ong3_sous_traitance_sous_beneficiaire',
    name: "Accord de sous-traitance ONG (sous-bénéficiaire)",
    category: 'association',
    price: 9000,
    priceMax: 27000,
    description: "Accord par lequel une ONG bénéficiaire principale transfère une partie des activités et des fonds à une organisation sous-bénéficiaire.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 78,
    fieldsJson: F([
      { key: 'ong_principale', label: "ONG bénéficiaire principale", type: 'text', required: true },
      { key: 'sous_beneficiaire', label: "Organisation sous-bénéficiaire", type: 'text', required: true },
      { key: 'activites_sous_traitees', label: "Activités sous-traitées", type: 'textarea', required: true },
      { key: 'budget_transfere', label: "Budget transféré (FCFA)", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SOUS-TRAITANCE ONG — SOUS-BÉNÉFICIAIRE</h1>
<p>Entre <strong>{{ong_principale}}</strong> (le Bénéficiaire Principal) et <strong>{{sous_beneficiaire}}</strong> (le Sous-bénéficiaire),</p>
<h2>ARTICLE 1 — ACTIVITÉS</h2>
<p>Le Sous-bénéficiaire est chargé de mettre en oeuvre les activités suivantes : {{activites_sous_traitees}}.</p>
<h2>ARTICLE 2 — TRANSFERT DE FONDS</h2>
<p>Un budget de <strong>{{budget_transfere}} FCFA</strong> est transféré au Sous-bénéficiaire conformément au plan de décaissement annexé.</p>
<h2>ARTICLE 3 — CONFORMITÉ BAILLEUR</h2>
<p>Le Sous-bénéficiaire respecte les règles du bailleur principal applicables à l'accord de financement initial.</p>
<p>Signé le {{date_signature}}.</p></div>`,
  },
  {
    code: 'ong3_accord_vsi',
    name: "Accord de service de volontaire international (VSI)",
    category: 'association',
    price: 8000,
    priceMax: 24000,
    description: "Accord encadrant la mise à disposition d'un volontaire de solidarité internationale (VSI) auprès d'une organisation partenaire en Afrique.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'organisme_envoi', label: "Organisme d'envoi du volontaire", type: 'text', required: true },
      { key: 'organisation_accueil', label: "Organisation d'accueil", type: 'text', required: true },
      { key: 'nom_volontaire', label: "Nom du volontaire", type: 'text', required: true },
      { key: 'mission_volontaire', label: "Mission et tâches du volontaire", type: 'textarea', required: true },
      { key: 'duree_mission', label: "Durée de la mission", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début de mission", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE VOLONTAIRE INTERNATIONAL (VSI)</h1>
<p>Entre <strong>{{organisme_envoi}}</strong> et <strong>{{organisation_accueil}}</strong>,</p>
<h2>ARTICLE 1 — VOLONTAIRE</h2>
<p>L'Organisme d'envoi met à disposition de l'Organisation d'accueil M./Mme <strong>{{nom_volontaire}}</strong> pour une durée de {{duree_mission}}, à compter du {{date_debut}}.</p>
<h2>ARTICLE 2 — MISSION</h2>
<p>{{mission_volontaire}}</p>
<h2>ARTICLE 3 — CONDITIONS MATÉRIELLES</h2>
<p>L'Organisation d'accueil assure au volontaire un espace de travail adéquat, les équipements nécessaires et un accompagnement dans son intégration locale.</p></div>`,
  },
  {
    code: 'ong3_accord_benevole_intl',
    name: "Accord de service de bénévole international",
    category: 'association',
    price: 6000,
    priceMax: 18000,
    description: "Accord définissant les conditions d'engagement d'un bénévole international au sein d'une ONG en Afrique francophone.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'ong_accueillante', label: "ONG accueillante", type: 'text', required: true },
      { key: 'nom_benevole', label: "Nom du bénévole", type: 'text', required: true },
      { key: 'nationalite_benevole', label: "Nationalité du bénévole", type: 'text', required: true },
      { key: 'taches_benevole', label: "Tâches bénévoles", type: 'textarea', required: true },
      { key: 'date_debut', label: "Date de début", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE BÉNÉVOLE INTERNATIONAL</h1>
<p>Entre <strong>{{ong_accueillante}}</strong> et M./Mme <strong>{{nom_benevole}}</strong>, de nationalité {{nationalite_benevole}},</p>
<h2>ARTICLE 1 — ENGAGEMENT BÉNÉVOLE</h2>
<p>Le bénévole s'engage à réaliser les tâches suivantes à titre gratuit : {{taches_benevole}}.</p>
<h2>ARTICLE 2 — STATUT</h2>
<p>Le présent accord ne constitue pas un contrat de travail. Le bénévole conserve son statut de volontaire non rémunéré.</p>
<h2>ARTICLE 3 — REMBOURSEMENT DE FRAIS</h2>
<p>Les frais de déplacement et de logement engagés dans le cadre de la mission pourront être remboursés sur présentation de justificatifs, dans les limites du budget disponible.</p>
<p>Prise d'effet le {{date_debut}}.</p></div>`,
  },
  {
    code: 'ong3_partenariat_academique_recherche',
    name: "Accord de partenariat académique-ONG (recherche)",
    category: 'association',
    price: 10000,
    priceMax: 30000,
    description: "Accord de partenariat entre une institution académique et une ONG pour la conduite de recherches appliquées au service du développement.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'institution_academique', label: "Institution académique", type: 'text', required: true },
      { key: 'ong_partenaire', label: "ONG partenaire de recherche", type: 'text', required: true },
      { key: 'theme_recherche', label: "Thème de recherche", type: 'textarea', required: true },
      { key: 'propriete_resultats', label: "Propriété des résultats de recherche", type: 'textarea', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT ACADÉMIQUE-ONG (RECHERCHE)</h1>
<p>Entre <strong>{{institution_academique}}</strong> et <strong>{{ong_partenaire}}</strong>,</p>
<h2>ARTICLE 1 — THÈME DE RECHERCHE</h2>
<p>{{theme_recherche}}</p>
<h2>ARTICLE 2 — PROPRIÉTÉ INTELLECTUELLE</h2>
<p>{{propriete_resultats}}</p>
<h2>ARTICLE 3 — DIFFUSION</h2>
<p>Les résultats de la recherche seront diffusés conjointement par les deux Parties, avec attribution appropriée des contributions de chacune.</p>
<p>Signé le {{date_signature}}.</p></div>`,
  },
  {
    code: 'ong3_consultant_intl_court_terme',
    name: "Accord de service de consultant international court terme",
    category: 'association',
    price: 8000,
    priceMax: 24000,
    description: "Contrat de services pour un consultant international engagé à court terme par une ONG pour une mission spécifique.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 80,
    fieldsJson: F([
      { key: 'ong_contractante', label: "ONG contractante", type: 'text', required: true },
      { key: 'consultant_nom', label: "Nom du consultant", type: 'text', required: true },
      { key: 'mission_consultant', label: "Termes de référence / Mission", type: 'textarea', required: true },
      { key: 'honoraires_journaliers', label: "Honoraires journaliers (USD)", type: 'text', required: true },
      { key: 'nombre_jours', label: "Nombre de jours de mission", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début de mission", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE CONSULTANT INTERNATIONAL — COURT TERME</h1>
<p>Entre <strong>{{ong_contractante}}</strong> et M./Mme <strong>{{consultant_nom}}</strong> (le Consultant),</p>
<h2>ARTICLE 1 — MISSION</h2>
<p>{{mission_consultant}}</p>
<h2>ARTICLE 2 — RÉMUNÉRATION</h2>
<p>Honoraires journaliers : <strong>{{honoraires_journaliers}} USD</strong> — Nombre de jours : {{nombre_jours}} jours. Montant total : calculé selon le nombre de jours effectivement travaillés.</p>
<h2>ARTICLE 3 — LIVRABLES</h2>
<p>Le Consultant soumettra les livrables définis dans les termes de référence dans les délais convenus.</p>
<p>Mission débutant le {{date_debut}}.</p></div>`,
  },
  {
    code: 'ong3_consultant_national_long_terme',
    name: "Accord de service de consultant national long terme",
    category: 'association',
    price: 9000,
    priceMax: 27000,
    description: "Contrat de services pour un consultant national engagé à long terme par une ONG ou un projet de développement.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 82,
    fieldsJson: F([
      { key: 'ong_employeur', label: "ONG employeur", type: 'text', required: true },
      { key: 'consultant_national', label: "Nom du consultant national", type: 'text', required: true },
      { key: 'poste_consultant', label: "Intitulé du poste", type: 'text', required: true },
      { key: 'salaire_mensuel', label: "Rémunération mensuelle (FCFA)", type: 'text', required: true },
      { key: 'duree_contrat', label: "Durée du contrat", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE CONSULTANT NATIONAL — LONG TERME</h1>
<p>Entre <strong>{{ong_employeur}}</strong> et M./Mme <strong>{{consultant_national}}</strong>,</p>
<h2>ARTICLE 1 — POSTE</h2>
<p>Le Consultant est engagé en qualité de <strong>{{poste_consultant}}</strong> pour une durée de {{duree_contrat}}, à compter du {{date_debut}}.</p>
<h2>ARTICLE 2 — RÉMUNÉRATION</h2>
<p>La rémunération mensuelle est fixée à <strong>{{salaire_mensuel}} FCFA</strong>, incluant toutes charges et indemnités.</p>
<h2>ARTICLE 3 — OBLIGATIONS</h2>
<p>Le Consultant s'engage à travailler exclusivement pour l'ONG pendant la durée du contrat et à respecter les codes de conduite et politiques de l'organisation.</p></div>`,
  },
  {
    code: 'ong3_rapport_avancement_intermediaire',
    name: "Rapport d'avancement de projet (rapport intermédiaire)",
    category: 'association',
    price: 5000,
    priceMax: 15000,
    description: "Modèle de rapport d'avancement intermédiaire pour les projets ONG, couvrant les résultats atteints, les dépenses et les difficultés rencontrées.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 88,
    fieldsJson: F([
      { key: 'nom_projet', label: "Nom du projet", type: 'text', required: true },
      { key: 'periode_rapport', label: "Période couverte par le rapport", type: 'text', required: true },
      { key: 'resultats_atteints', label: "Résultats atteints durant la période", type: 'textarea', required: true },
      { key: 'depenses_engagees', label: "Dépenses engagées (FCFA)", type: 'text', required: true },
      { key: 'difficultes_solutions', label: "Difficultés rencontrées et solutions", type: 'textarea', required: true },
      { key: 'date_rapport', label: "Date du rapport", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>RAPPORT D'AVANCEMENT INTERMÉDIAIRE</h1>
<h2>Projet : {{nom_projet}}</h2>
<p>Période couverte : <strong>{{periode_rapport}}</strong> — Date : {{date_rapport}}</p>
<h2>1. RÉSULTATS ATTEINTS</h2>
<p>{{resultats_atteints}}</p>
<h2>2. SITUATION FINANCIÈRE</h2>
<p>Dépenses engagées durant la période : <strong>{{depenses_engagees}} FCFA</strong>.</p>
<h2>3. DIFFICULTÉS ET SOLUTIONS</h2>
<p>{{difficultes_solutions}}</p>
<h2>4. PERSPECTIVES</h2>
<p>Les activités planifiées pour la prochaine période sont détaillées dans le plan de travail mis à jour joint en annexe.</p></div>`,
  },
  {
    code: 'ong3_rapport_fin_projet',
    name: "Rapport de fin de projet ONG",
    category: 'association',
    price: 6000,
    priceMax: 18000,
    description: "Modèle de rapport de fin de projet ONG documentant les résultats finaux, les leçons apprises et la durabilité des interventions.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 86,
    fieldsJson: F([
      { key: 'titre_projet', label: "Titre du projet", type: 'text', required: true },
      { key: 'duree_totale', label: "Durée totale du projet", type: 'text', required: true },
      { key: 'resultats_finaux', label: "Résultats finaux et impacts obtenus", type: 'textarea', required: true },
      { key: 'budget_total_depense', label: "Budget total dépensé (FCFA)", type: 'text', required: true },
      { key: 'lecons_apprises', label: "Leçons apprises", type: 'textarea', required: true },
      { key: 'date_rapport', label: "Date du rapport final", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>RAPPORT FINAL DE PROJET</h1>
<h2>{{titre_projet}}</h2>
<p>Durée totale du projet : {{duree_totale}} — Date de clôture : {{date_rapport}}</p>
<h2>1. RÉSULTATS ET IMPACTS</h2>
<p>{{resultats_finaux}}</p>
<h2>2. BILAN FINANCIER</h2>
<p>Budget total dépensé : <strong>{{budget_total_depense}} FCFA</strong>. Le rapport financier détaillé est joint en annexe.</p>
<h2>3. LEÇONS APPRISES</h2>
<p>{{lecons_apprises}}</p>
<h2>4. DURABILITÉ</h2>
<p>Les mécanismes de pérennisation des acquis du projet sont décrits dans le plan de sortie joint.</p></div>`,
  },
  {
    code: 'ong3_plan_travail_annuel',
    name: "Plan de travail annuel (AWP) ONG",
    category: 'association',
    price: 5000,
    priceMax: 15000,
    description: "Modèle de plan de travail annuel (Annual Work Plan) pour les ONG, structurant les activités, les responsables, les délais et les budgets prévisionnels.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 90,
    fieldsJson: F([
      { key: 'ong_nom', label: "Nom de l'ONG", type: 'text', required: true },
      { key: 'annee_plan', label: "Année du plan de travail", type: 'text', required: true },
      { key: 'objectifs_annuels', label: "Objectifs annuels prioritaires", type: 'textarea', required: true },
      { key: 'activites_prevues', label: "Activités prévues et calendrier", type: 'textarea', required: true },
      { key: 'budget_previsionnel', label: "Budget prévisionnel total (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>PLAN DE TRAVAIL ANNUEL (AWP)</h1>
<h2>{{ong_nom}} — Année {{annee_plan}}</h2>
<h2>1. OBJECTIFS ANNUELS</h2>
<p>{{objectifs_annuels}}</p>
<h2>2. ACTIVITÉS ET CALENDRIER</h2>
<p>{{activites_prevues}}</p>
<h2>3. BUDGET PRÉVISIONNEL</h2>
<p>Budget total prévu : <strong>{{budget_previsionnel}} FCFA</strong>. La ventilation budgétaire par activité est présentée dans le tableau annexé.</p>
<h2>4. SUIVI ET ÉVALUATION</h2>
<p>Un tableau de bord de suivi des indicateurs sera mis à jour mensuellement par le responsable Suivi-Évaluation.</p></div>`,
  },
  {
    code: 'ong3_transfert_fonds_ong_ong',
    name: "Accord de transfert de fonds ONG-ONG",
    category: 'association',
    price: 8000,
    priceMax: 24000,
    description: "Accord définissant les modalités de transfert de fonds entre deux ONG dans le cadre d'un programme commun ou d'une délégation financière.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 74,
    fieldsJson: F([
      { key: 'ong_transferante', label: "ONG transférante", type: 'text', required: true },
      { key: 'ong_receptrice', label: "ONG réceptrice", type: 'text', required: true },
      { key: 'montant_transfert', label: "Montant du transfert (FCFA)", type: 'text', required: true },
      { key: 'objet_transfert', label: "Objet et justification du transfert", type: 'textarea', required: true },
      { key: 'date_transfert', label: "Date prévue du transfert", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE TRANSFERT DE FONDS ONG-ONG</h1>
<p>Entre <strong>{{ong_transferante}}</strong> et <strong>{{ong_receptrice}}</strong>,</p>
<h2>ARTICLE 1 — TRANSFERT</h2>
<p>L'ONG transférante s'engage à virer à l'ONG réceptrice la somme de <strong>{{montant_transfert}} FCFA</strong> avant le {{date_transfert}}.</p>
<h2>ARTICLE 2 — OBJET</h2>
<p>{{objet_transfert}}</p>
<h2>ARTICLE 3 — UTILISATION ET JUSTIFICATION</h2>
<p>L'ONG réceptrice s'engage à utiliser les fonds exclusivement aux fins prévues et à fournir des pièces justificatives dans un délai de trente (30) jours suivant la réalisation des dépenses.</p></div>`,
  },
  {
    code: 'ong3_gestion_caisse_projet',
    name: "Accord de gestion de caisse de projet",
    category: 'association',
    price: 6000,
    priceMax: 18000,
    description: "Procédures et accord de gestion de la petite caisse et des avances de fonds pour un projet ONG, assurant la traçabilité des dépenses.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 72,
    fieldsJson: F([
      { key: 'nom_projet', label: "Nom du projet", type: 'text', required: true },
      { key: 'responsable_caisse', label: "Responsable de la caisse", type: 'text', required: true },
      { key: 'plafond_caisse', label: "Plafond de la petite caisse (FCFA)", type: 'text', required: true },
      { key: 'procedure_justification', label: "Procédure de justification des dépenses", type: 'textarea', required: true },
      { key: 'date_prise_effet', label: "Date de prise d'effet", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE GESTION DE CAISSE DE PROJET</h1>
<h2>Projet : {{nom_projet}}</h2>
<p>Date de prise d'effet : {{date_prise_effet}}</p>
<h2>ARTICLE 1 — RESPONSABLE</h2>
<p>M./Mme <strong>{{responsable_caisse}}</strong> est désigné(e) responsable de la gestion de la petite caisse du projet.</p>
<h2>ARTICLE 2 — PLAFOND</h2>
<p>Le plafond de la petite caisse est fixé à <strong>{{plafond_caisse}} FCFA</strong>. Toute dépense dépassant ce plafond doit être traitée par virement bancaire.</p>
<h2>ARTICLE 3 — PROCÉDURE DE JUSTIFICATION</h2>
<p>{{procedure_justification}}</p></div>`,
  },
  {
    code: 'ong3_rapport_audit_projet',
    name: "Rapport d'audit de projet ONG",
    category: 'association',
    price: 10000,
    priceMax: 30000,
    description: "Modèle de rapport d'audit financier et de conformité pour un projet ONG, destiné à être soumis au bailleur de fonds.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 76,
    fieldsJson: F([
      { key: 'nom_projet', label: "Nom du projet audité", type: 'text', required: true },
      { key: 'cabinet_audit', label: "Cabinet d'audit", type: 'text', required: true },
      { key: 'periode_auditee', label: "Période auditée", type: 'text', required: true },
      { key: 'conclusions_audit', label: "Conclusions principales de l'audit", type: 'textarea', required: true },
      { key: 'recommandations', label: "Recommandations de l'auditeur", type: 'textarea', required: true },
      { key: 'date_rapport', label: "Date du rapport d'audit", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>RAPPORT D'AUDIT DE PROJET ONG</h1>
<h2>Projet : {{nom_projet}}</h2>
<p>Cabinet d'audit : <strong>{{cabinet_audit}}</strong> — Période auditée : {{periode_auditee}} — Date : {{date_rapport}}</p>
<h2>1. OPINION DE L'AUDITEUR</h2>
<p>Sur la base de nos travaux d'audit réalisés conformément aux normes internationales d'audit (ISA), nous exprimons notre opinion sur les états financiers du projet.</p>
<h2>2. CONCLUSIONS</h2>
<p>{{conclusions_audit}}</p>
<h2>3. RECOMMANDATIONS</h2>
<p>{{recommandations}}</p>
<h2>4. RÉPONSE DE LA DIRECTION</h2>
<p>La réponse de la Direction aux recommandations de l'auditeur est présentée en annexe au présent rapport.</p></div>`,
  },
  {
    code: 'ong3_passation_marches_bailleurs',
    name: "Accord de passation de marchés ONG (règles bailleurs)",
    category: 'association',
    price: 9000,
    priceMax: 27000,
    description: "Procédures de passation de marchés adaptées aux ONG pour respecter les règles des bailleurs de fonds internationaux lors des achats de biens et services.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 73,
    fieldsJson: F([
      { key: 'ong_nom', label: "Nom de l'ONG", type: 'text', required: true },
      { key: 'bailleur_applicable', label: "Bailleur dont les règles s'appliquent", type: 'text', required: true },
      { key: 'seuils_procedures', label: "Seuils et procédures applicables", type: 'textarea', required: true },
      { key: 'composition_commission', label: "Composition de la commission d'évaluation", type: 'textarea', required: true },
      { key: 'date_adoption', label: "Date d'adoption du manuel", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>MANUEL DE PASSATION DE MARCHÉS ONG</h1>
<h2>{{ong_nom}}</h2>
<p>Règles applicables : <strong>{{bailleur_applicable}}</strong> — Adopté le {{date_adoption}}</p>
<h2>1. SEUILS ET PROCÉDURES</h2>
<p>{{seuils_procedures}}</p>
<h2>2. COMMISSION D'ÉVALUATION</h2>
<p>{{composition_commission}}</p>
<h2>3. PRINCIPES GÉNÉRAUX</h2>
<p>Toute passation de marchés doit respecter les principes d'économie, d'efficacité, d'équité, de transparence et de redevabilité envers les bénéficiaires et les bailleurs.</p></div>`,
  },
  {
    code: 'ong3_gestion_actifs_remise_gouv',
    name: "Accord de gestion des actifs de projet (remise gouvernement)",
    category: 'association',
    price: 8000,
    priceMax: 24000,
    description: "Accord encadrant la remise des actifs acquis dans le cadre d'un projet ONG au gouvernement ou aux bénéficiaires à la clôture du projet.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'ong_remettante', label: "ONG remettante", type: 'text', required: true },
      { key: 'entite_receptrice', label: "Entité réceptrice (gouvernement / communauté)", type: 'text', required: true },
      { key: 'liste_actifs', label: "Liste des actifs à remettre", type: 'textarea', required: true },
      { key: 'valeur_residuelle', label: "Valeur résiduelle des actifs", type: 'text', required: true },
      { key: 'date_remise', label: "Date de remise", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE REMISE D'ACTIFS DE PROJET</h1>
<p>Entre <strong>{{ong_remettante}}</strong> et <strong>{{entite_receptrice}}</strong>,</p>
<h2>ARTICLE 1 — ACTIFS REMIS</h2>
<p>{{liste_actifs}}</p>
<h2>ARTICLE 2 — VALEUR RÉSIDUELLE</h2>
<p>La valeur résiduelle des actifs remis est estimée à <strong>{{valeur_residuelle}} FCFA</strong>.</p>
<h2>ARTICLE 3 — ENGAGEMENT DE L'ENTITÉ RÉCEPTRICE</h2>
<p>L'entité réceptrice s'engage à utiliser les actifs reçus exclusivement aux fins pour lesquelles ils ont été acquis et à en assurer l'entretien approprié.</p>
<p>Remise effectuée le {{date_remise}}.</p></div>`,
  },
  {
    code: 'ong3_strategie_sortie_projet',
    name: "Accord de stratégie de sortie de projet",
    category: 'association',
    price: 7000,
    priceMax: 21000,
    description: "Document-cadre définissant la stratégie de sortie d'un projet ONG pour assurer la durabilité des acquis après la fin du financement.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'nom_projet', label: "Nom du projet", type: 'text', required: true },
      { key: 'date_cloture', label: "Date de clôture prévue", type: 'date', required: true },
      { key: 'acquis_perenniser', label: "Acquis à pérenniser", type: 'textarea', required: true },
      { key: 'acteurs_prise_relais', label: "Acteurs prenant le relais", type: 'textarea', required: true },
      { key: 'actions_transition', label: "Actions de transition prévues", type: 'textarea', required: true },
    ]),
    body: `<div class="doc"><h1>STRATÉGIE DE SORTIE DE PROJET</h1>
<h2>Projet : {{nom_projet}}</h2>
<p>Date de clôture prévue : {{date_cloture}}</p>
<h2>1. ACQUIS À PÉRENNISER</h2>
<p>{{acquis_perenniser}}</p>
<h2>2. ACTEURS DE RELAIS</h2>
<p>{{acteurs_prise_relais}}</p>
<h2>3. PLAN DE TRANSITION</h2>
<p>{{actions_transition}}</p>
<h2>4. RISQUES ET MITIGATION</h2>
<p>Les risques liés à la transition et les mesures de mitigation sont détaillés dans la matrice des risques jointe en annexe.</p></div>`,
  },
  {
    code: 'ong3_capitalisation_lecons',
    name: "Accord de capitalisation et leçons apprises",
    category: 'association',
    price: 6000,
    priceMax: 18000,
    description: "Document de capitalisation documentant les bonnes pratiques, les leçons apprises et les innovations d'un projet ONG pour partage et réplication.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 66,
    fieldsJson: F([
      { key: 'titre_capitalisation', label: "Titre du document de capitalisation", type: 'text', required: true },
      { key: 'projet_reference', label: "Projet de référence", type: 'text', required: true },
      { key: 'bonnes_pratiques', label: "Bonnes pratiques identifiées", type: 'textarea', required: true },
      { key: 'lecons_apprises', label: "Leçons apprises", type: 'textarea', required: true },
      { key: 'date_redaction', label: "Date de rédaction", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>DOCUMENT DE CAPITALISATION</h1>
<h2>{{titre_capitalisation}}</h2>
<p>Projet de référence : {{projet_reference}} — Rédigé le {{date_redaction}}</p>
<h2>1. BONNES PRATIQUES</h2>
<p>{{bonnes_pratiques}}</p>
<h2>2. LEÇONS APPRISES</h2>
<p>{{lecons_apprises}}</p>
<h2>3. RECOMMANDATIONS POUR LA RÉPLICATION</h2>
<p>Sur la base des expériences du projet, les conditions requises pour une réplication réussie dans d'autres contextes sont détaillées ci-après.</p>
<h2>4. DIFFUSION</h2>
<p>Le présent document sera partagé avec les parties prenantes clés et déposé dans la base de connaissances de l'organisation.</p></div>`,
  },
  {
    code: 'ong3_partenariat_diaspora',
    name: "Accord de partenariat diaspora-ONG",
    category: 'association',
    price: 7000,
    priceMax: 21000,
    description: "Accord de partenariat entre une organisation de la diaspora africaine et une ONG locale pour canaliser les transferts de fonds vers des projets de développement.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 71,
    fieldsJson: F([
      { key: 'organisation_diaspora', label: "Organisation de la diaspora", type: 'text', required: true },
      { key: 'ong_locale', label: "ONG locale partenaire", type: 'text', required: true },
      { key: 'projets_vises', label: "Projets de développement visés", type: 'textarea', required: true },
      { key: 'mecanisme_transfert', label: "Mécanisme de transfert des fonds", type: 'textarea', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT DIASPORA-ONG</h1>
<p>Entre <strong>{{organisation_diaspora}}</strong> et <strong>{{ong_locale}}</strong>,</p>
<h2>ARTICLE 1 — PROJETS FINANCÉS</h2>
<p>{{projets_vises}}</p>
<h2>ARTICLE 2 — TRANSFERT DE FONDS</h2>
<p>{{mecanisme_transfert}}</p>
<h2>ARTICLE 3 — TRANSPARENCE</h2>
<p>L'ONG locale rendra compte trimestriellement à l'organisation de la diaspora de l'utilisation des fonds et des progrès réalisés, avec photos et pièces justificatives à l'appui.</p>
<h2>ARTICLE 4 — GOUVERNANCE PARTAGÉE</h2>
<p>Un comité de pilotage mixte composé de représentants des deux Parties se réunira deux fois par an pour évaluer l'avancement des projets.</p>
<p>Signé le {{date_signature}}.</p></div>`,
  },
  {
    code: 'ong3_charte_redevabilite_aide',
    name: "Charte de redevabilité de l'aide internationale",
    category: 'association',
    price: 8000,
    priceMax: 24000,
    description: "Charte organisationnelle engageant une ONG à respecter des principes de redevabilité envers ses bénéficiaires, donateurs et parties prenantes.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 75,
    fieldsJson: F([
      { key: 'nom_ong', label: "Nom de l'ONG signataire", type: 'text', required: true },
      { key: 'engagements_redevabilite', label: "Engagements de redevabilité", type: 'textarea', required: true },
      { key: 'mecanismes_plainte', label: "Mécanismes de plainte des bénéficiaires", type: 'textarea', required: true },
      { key: 'standards_references', label: "Standards et codes de référence", type: 'text', required: true },
      { key: 'date_adoption', label: "Date d'adoption de la charte", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CHARTE DE REDEVABILITÉ DE L'AIDE INTERNATIONALE</h1>
<h2>{{nom_ong}}</h2>
<p>Adoptée le {{date_adoption}}</p>
<h2>1. ENGAGEMENTS DE REDEVABILITÉ</h2>
<p>{{engagements_redevabilite}}</p>
<h2>2. MÉCANISMES DE PLAINTE</h2>
<p>{{mecanismes_plainte}}</p>
<h2>3. STANDARDS DE RÉFÉRENCE</h2>
<p>La présente Charte s'inspire des standards suivants : {{standards_references}}.</p>
<h2>4. RÉVISION</h2>
<p>La présente Charte est révisée annuellement par le Conseil d'Administration et partagée publiquement avec toutes les parties prenantes de l'organisation.</p></div>`,
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
  console.log(`Batch 60a OK — créés:${created} maj:${updated} TOTAL:${total}`);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
