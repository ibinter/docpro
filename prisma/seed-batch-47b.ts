import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ── 25 Droit pénal / Procédure (pen_) ──────────────────────────────────────
  {
    code: 'pen_plainte_partie_civile',
    name: "Plainte pénale avec constitution de partie civile",
    category: 'juridique_admin',
    price: 8000, priceMax: 24000,
    description: "Plainte déposée auprès du Doyen des Juges d'Instruction avec constitution de partie civile, conformément au Code de procédure pénale OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 78,
    fieldsJson: F([
      { key: 'plaignant_nom', label: "Nom complet du plaignant", type: 'text', required: true },
      { key: 'plaignant_adresse', label: "Adresse du plaignant", type: 'text', required: true },
      { key: 'mis_en_cause', label: "Nom ou identité du mis en cause", type: 'text', required: true },
      { key: 'faits', label: "Description détaillée des faits", type: 'textarea', required: true },
      { key: 'date_faits', label: "Date des faits", type: 'date', required: true },
      { key: 'prejudice', label: "Nature et montant du préjudice subi", type: 'textarea', required: false },
    ]),
    body: `<div class="doc"><h1>PLAINTE AVEC CONSTITUTION DE PARTIE CIVILE</h1>
<p>À Monsieur le Doyen des Juges d'Instruction du Tribunal de Première Instance</p>
<p><strong>Du plaignant :</strong> {{plaignant_nom}}, demeurant à {{plaignant_adresse}}</p>
<h2>FAITS</h2>
<p>Le {{date_faits}}, {{faits}}</p>
<h2>MIS EN CAUSE</h2>
<p>{{mis_en_cause}}</p>
<h2>PRÉJUDICE</h2>
<p>{{prejudice}}</p>
<h2>PAR CES MOTIFS</h2>
<p>Le soussigné a l'honneur de porter plainte et de se constituer partie civile, sollicitant l'ouverture d'une information judiciaire.</p>
<p>Fait à ____________, le ____________</p>
<p>Signature : ____________________</p></div>`,
  },
  {
    code: 'pen_plainte_simple_procureur',
    name: "Plainte simple au Procureur de la République",
    category: 'juridique_admin',
    price: 5000, priceMax: 12000,
    description: "Plainte pénale adressée directement au Procureur de la République, sans constitution de partie civile.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 85,
    fieldsJson: F([
      { key: 'plaignant_nom', label: "Nom complet du plaignant", type: 'text', required: true },
      { key: 'plaignant_adresse', label: "Adresse du plaignant", type: 'text', required: true },
      { key: 'infraction', label: "Nature de l'infraction", type: 'text', required: true },
      { key: 'faits', label: "Exposé des faits", type: 'textarea', required: true },
      { key: 'date_faits', label: "Date des faits", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>PLAINTE PÉNALE</h1>
<p>À Monsieur le Procureur de la République</p>
<p><strong>Du plaignant :</strong> {{plaignant_nom}}, demeurant à {{plaignant_adresse}}</p>
<h2>OBJET : Plainte pour {{infraction}}</h2>
<h2>EXPOSÉ DES FAITS</h2>
<p>Le {{date_faits}}, {{faits}}</p>
<h2>DEMANDE</h2>
<p>En conséquence, le soussigné sollicite qu'il plaise à Monsieur le Procureur de la République de bien vouloir recevoir la présente plainte et d'y donner les suites qui s'imposent.</p>
<p>Fait à ____________, le ____________</p>
<p>Signature : ____________________</p></div>`,
  },
  {
    code: 'pen_deposition_temoin',
    name: "Déposition de témoin",
    category: 'juridique_admin',
    price: 3000, priceMax: 8000,
    description: "Déclaration officielle d'un témoin relatant les faits dont il a eu connaissance dans le cadre d'une procédure pénale.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      { key: 'temoin_nom', label: "Nom complet du témoin", type: 'text', required: true },
      { key: 'temoin_profession', label: "Profession du témoin", type: 'text', required: true },
      { key: 'temoin_adresse', label: "Adresse du témoin", type: 'text', required: true },
      { key: 'faits_temoignage', label: "Faits dont le témoin a eu connaissance", type: 'textarea', required: true },
      { key: 'date_faits', label: "Date des faits observés", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>DÉPOSITION DE TÉMOIN</h1>
<p>Je soussigné(e) {{temoin_nom}}, {{temoin_profession}}, demeurant à {{temoin_adresse}},</p>
<p>Dépose et atteste sur l'honneur avoir été témoin des faits suivants :</p>
<h2>DÉCLARATION</h2>
<p>Le {{date_faits}}, {{faits_temoignage}}</p>
<p>Je certifie l'exactitude de la présente déposition et m'expose aux sanctions prévues par la loi en cas de faux témoignage.</p>
<p>Fait à ____________, le ____________</p>
<p>Signature : ____________________</p></div>`,
  },
  {
    code: 'pen_attestation_honneur',
    name: "Attestation sur l'honneur",
    category: 'juridique_admin',
    price: 3000, priceMax: 7000,
    description: "Document par lequel une personne certifie sur l'honneur la véracité d'une information ou d'un fait.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 90,
    fieldsJson: F([
      { key: 'attestant_nom', label: "Nom complet de l'attestant", type: 'text', required: true },
      { key: 'attestant_qualite', label: "Qualité / Fonction de l'attestant", type: 'text', required: true },
      { key: 'objet_attestation', label: "Objet de l'attestation", type: 'textarea', required: true },
      { key: 'destinataire', label: "Destinataire de l'attestation", type: 'text', required: false },
    ]),
    body: `<div class="doc"><h1>ATTESTATION SUR L'HONNEUR</h1>
<p>Je soussigné(e) {{attestant_nom}}, agissant en qualité de {{attestant_qualite}},</p>
<p>Atteste sur l'honneur que :</p>
<p>{{objet_attestation}}</p>
<p>La présente attestation est établie pour servir et valoir ce que de droit, notamment à {{destinataire}}.</p>
<p>Je certifie l'exactitude des informations ci-dessus et m'expose aux sanctions légales en cas de fausse déclaration.</p>
<p>Fait à ____________, le ____________</p>
<p>Signature : ____________________</p></div>`,
  },
  {
    code: 'pen_declaration_vol',
    name: "Déclaration de vol (main courante)",
    category: 'juridique_admin',
    price: 3500, priceMax: 9000,
    description: "Déclaration de vol enregistrée en main courante auprès des services de police ou de gendarmerie.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 80,
    fieldsJson: F([
      { key: 'declarant_nom', label: "Nom complet du déclarant", type: 'text', required: true },
      { key: 'declarant_adresse', label: "Adresse du déclarant", type: 'text', required: true },
      { key: 'date_vol', label: "Date du vol", type: 'date', required: true },
      { key: 'lieu_vol', label: "Lieu du vol", type: 'text', required: true },
      { key: 'objets_voles', label: "Description des objets volés", type: 'textarea', required: true },
      { key: 'valeur_estimee', label: "Valeur estimée des biens volés (FCFA)", type: 'text', required: false },
    ]),
    body: `<div class="doc"><h1>DÉCLARATION DE VOL - MAIN COURANTE</h1>
<p>Je soussigné(e) {{declarant_nom}}, demeurant à {{declarant_adresse}},</p>
<p>Déclare avoir été victime d'un vol le {{date_vol}} à {{lieu_vol}}.</p>
<h2>BIENS DÉROBÉS</h2>
<p>{{objets_voles}}</p>
<p><strong>Valeur estimée :</strong> {{valeur_estimee}} FCFA</p>
<p>La présente déclaration est faite pour servir et valoir ce que de droit, notamment pour les démarches administratives et auprès des compagnies d'assurance.</p>
<p>Fait à ____________, le ____________</p>
<p>Signature du déclarant : ____________________</p>
<p>Cachet et signature de l'officier de police : ____________________</p></div>`,
  },
  {
    code: 'pen_declaration_perte_document',
    name: "Déclaration de perte de document officiel",
    category: 'juridique_admin',
    price: 3000, priceMax: 7500,
    description: "Déclaration officielle de perte d'un document administratif (CNI, passeport, permis, titre foncier, etc.).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 88,
    fieldsJson: F([
      { key: 'declarant_nom', label: "Nom complet du déclarant", type: 'text', required: true },
      { key: 'declarant_adresse', label: "Adresse du déclarant", type: 'text', required: true },
      { key: 'document_perdu', label: "Nature du document perdu", type: 'text', required: true },
      { key: 'reference_document', label: "Numéro ou référence du document", type: 'text', required: false },
      { key: 'date_perte', label: "Date de constatation de la perte", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>DÉCLARATION DE PERTE DE DOCUMENT OFFICIEL</h1>
<p>Je soussigné(e) {{declarant_nom}}, demeurant à {{declarant_adresse}},</p>
<p>Déclare avoir perdu le document suivant :</p>
<p><strong>Nature du document :</strong> {{document_perdu}}</p>
<p><strong>Référence / Numéro :</strong> {{reference_document}}</p>
<p><strong>Date de constatation de la perte :</strong> {{date_perte}}</p>
<p>Je certifie n'avoir pas fait usage dudit document depuis sa perte et m'engage à le restituer aux autorités compétentes si je venais à le retrouver.</p>
<p>Fait à ____________, le ____________</p>
<p>Signature : ____________________</p></div>`,
  },
  {
    code: 'pen_demande_classement_sans_suite',
    name: "Demande de classement sans suite (réponse)",
    category: 'juridique_admin',
    price: 6000, priceMax: 15000,
    description: "Mémoire en réponse à une décision de classement sans suite, demandant la réouverture des poursuites.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      { key: 'demandeur_nom', label: "Nom complet du demandeur", type: 'text', required: true },
      { key: 'demandeur_avocat', label: "Nom de l'avocat (si représenté)", type: 'text', required: false },
      { key: 'reference_dossier', label: "Numéro de référence du dossier", type: 'text', required: true },
      { key: 'motifs_reouverture', label: "Motifs justifiant la réouverture", type: 'textarea', required: true },
      { key: 'date_classement', label: "Date de la décision de classement", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>MÉMOIRE EN RÉPONSE À UNE DÉCISION DE CLASSEMENT SANS SUITE</h1>
<p>À Monsieur le Procureur de la République</p>
<p><strong>Du demandeur :</strong> {{demandeur_nom}}{{demandeur_avocat}}</p>
<p><strong>Dossier N° :</strong> {{reference_dossier}}</p>
<h2>OBJET : Demande de réouverture des poursuites suite au classement sans suite du {{date_classement}}</h2>
<h2>MOTIFS</h2>
<p>{{motifs_reouverture}}</p>
<h2>PAR CES MOTIFS</h2>
<p>Le soussigné sollicite qu'il plaise à Monsieur le Procureur de la République de bien vouloir réexaminer la décision de classement sans suite et d'ordonner la réouverture des poursuites.</p>
<p>Fait à ____________, le ____________</p>
<p>Signature : ____________________</p></div>`,
  },
  {
    code: 'pen_requete_refere_civil',
    name: "Requête en référé civil (urgence)",
    category: 'juridique_admin',
    price: 9000, priceMax: 25000,
    description: "Requête en référé devant le Président du Tribunal de Première Instance pour obtenir une mesure d'urgence.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      { key: 'requerant_nom', label: "Nom complet du requérant", type: 'text', required: true },
      { key: 'defendeur_nom', label: "Nom du défendeur", type: 'text', required: true },
      { key: 'mesure_demandee', label: "Mesure d'urgence sollicitée", type: 'textarea', required: true },
      { key: 'motifs_urgence', label: "Motifs justifiant l'urgence", type: 'textarea', required: true },
      { key: 'date_audience', label: "Date d'audience souhaitée", type: 'date', required: false },
    ]),
    body: `<div class="doc"><h1>REQUÊTE EN RÉFÉRÉ</h1>
<p>À Monsieur le Président du Tribunal de Première Instance</p>
<p><strong>Du requérant :</strong> {{requerant_nom}}</p>
<p><strong>Contre :</strong> {{defendeur_nom}}</p>
<h2>MESURE SOLLICITÉE EN URGENCE</h2>
<p>{{mesure_demandee}}</p>
<h2>MOTIFS D'URGENCE</h2>
<p>{{motifs_urgence}}</p>
<h2>PAR CES MOTIFS</h2>
<p>Le requérant sollicite qu'il plaise à Monsieur le Président d'ordonner en référé la mesure susvisée.</p>
<p>Fait à ____________, le ____________</p>
<p>Signature : ____________________</p></div>`,
  },
  {
    code: 'pen_demande_liberte_provisoire',
    name: "Demande de mise en liberté provisoire",
    category: 'juridique_admin',
    price: 10000, priceMax: 28000,
    description: "Requête adressée au juge d'instruction ou à la chambre d'accusation aux fins de mise en liberté provisoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      { key: 'prevenu_nom', label: "Nom complet du prévenu", type: 'text', required: true },
      { key: 'avocat_nom', label: "Nom de l'avocat", type: 'text', required: true },
      { key: 'date_detention', label: "Date de placement en détention", type: 'date', required: true },
      { key: 'motifs_liberation', label: "Motifs justifiant la mise en liberté", type: 'textarea', required: true },
      { key: 'garanties_presentation', label: "Garanties de représentation offertes", type: 'textarea', required: true },
    ]),
    body: `<div class="doc"><h1>DEMANDE DE MISE EN LIBERTÉ PROVISOIRE</h1>
<p>À Monsieur le Juge d'Instruction / Madame la Présidente de la Chambre d'Accusation</p>
<p><strong>Pour :</strong> {{prevenu_nom}}</p>
<p><strong>Avocat :</strong> {{avocat_nom}}</p>
<p><strong>En détention depuis le :</strong> {{date_detention}}</p>
<h2>MOTIFS DE LA DEMANDE</h2>
<p>{{motifs_liberation}}</p>
<h2>GARANTIES DE REPRÉSENTATION</h2>
<p>{{garanties_presentation}}</p>
<h2>PAR CES MOTIFS</h2>
<p>Il est demandé qu'il plaise à la juridiction saisie d'ordonner la mise en liberté provisoire du prévenu sous les conditions qu'elle jugera utiles.</p>
<p>Fait à ____________, le ____________</p>
<p>Signature de l'avocat : ____________________</p></div>`,
  },
  {
    code: 'pen_memoire_defense_penale',
    name: "Mémoire de défense pénale",
    category: 'juridique_admin',
    price: 12000, priceMax: 35000,
    description: "Mémoire développant les moyens de défense d'un prévenu devant une juridiction pénale.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      { key: 'prevenu_nom', label: "Nom complet du prévenu", type: 'text', required: true },
      { key: 'avocat_nom', label: "Nom de l'avocat défenseur", type: 'text', required: true },
      { key: 'infractions_reprochees', label: "Infractions reprochées", type: 'textarea', required: true },
      { key: 'moyens_defense', label: "Moyens de défense développés", type: 'textarea', required: true },
      { key: 'date_audience', label: "Date de l'audience", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>MÉMOIRE DE DÉFENSE PÉNALE</h1>
<p><strong>Pour :</strong> {{prevenu_nom}}, prévenu</p>
<p><strong>Avocat :</strong> {{avocat_nom}}</p>
<p><strong>Audience du :</strong> {{date_audience}}</p>
<h2>INFRACTIONS REPROCHÉES</h2>
<p>{{infractions_reprochees}}</p>
<h2>MOYENS DE DÉFENSE</h2>
<p>{{moyens_defense}}</p>
<h2>PAR CES MOTIFS</h2>
<p>La défense sollicite la relaxe pure et simple du prévenu, ou subsidiairement la requalification des faits et l'application de la peine minimale prévue par la loi.</p>
<p>Fait à ____________, le ____________</p>
<p>Signature de l'avocat : ____________________</p></div>`,
  },
  {
    code: 'pen_conclusions_defense',
    name: "Conclusions pénales de la défense",
    category: 'juridique_admin',
    price: 11000, priceMax: 30000,
    description: "Conclusions formelles déposées par la défense devant la juridiction pénale saisie.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      { key: 'prevenu_nom', label: "Nom du prévenu", type: 'text', required: true },
      { key: 'avocat_nom', label: "Nom de l'avocat", type: 'text', required: true },
      { key: 'juridiction', label: "Juridiction saisie", type: 'text', required: true },
      { key: 'faits_contestes', label: "Faits contestés et arguments", type: 'textarea', required: true },
      { key: 'demandes_defence', label: "Demandes formelles de la défense", type: 'textarea', required: true },
    ]),
    body: `<div class="doc"><h1>CONCLUSIONS DE LA DÉFENSE</h1>
<p><strong>Juridiction :</strong> {{juridiction}}</p>
<p><strong>Pour :</strong> {{prevenu_nom}}</p>
<p><strong>Avocat :</strong> {{avocat_nom}}</p>
<h2>DISCUSSION</h2>
<p>{{faits_contestes}}</p>
<h2>PAR CES MOTIFS, PLAISE AU TRIBUNAL DE :</h2>
<p>{{demandes_defence}}</p>
<p>Fait à ____________, le ____________</p>
<p>Signature : ____________________</p></div>`,
  },
  {
    code: 'pen_demande_renvoi_audience',
    name: "Demande de renvoi d'audience",
    category: 'juridique_admin',
    price: 4000, priceMax: 10000,
    description: "Requête aux fins de renvoi d'une affaire pénale à une audience ultérieure pour motif légitime.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      { key: 'demandeur_nom', label: "Nom du demandeur ou de son avocat", type: 'text', required: true },
      { key: 'numero_affaire', label: "Numéro de l'affaire", type: 'text', required: true },
      { key: 'date_audience_initiale', label: "Date d'audience initiale", type: 'date', required: true },
      { key: 'motif_renvoi', label: "Motif du renvoi sollicité", type: 'textarea', required: true },
    ]),
    body: `<div class="doc"><h1>DEMANDE DE RENVOI D'AUDIENCE</h1>
<p>À Monsieur le Président de l'audience</p>
<p><strong>Demandeur :</strong> {{demandeur_nom}}</p>
<p><strong>Affaire N° :</strong> {{numero_affaire}}</p>
<p><strong>Audience du :</strong> {{date_audience_initiale}}</p>
<h2>MOTIF DU RENVOI</h2>
<p>{{motif_renvoi}}</p>
<p>En conséquence, le demandeur sollicite qu'il plaise au Tribunal de bien vouloir renvoyer l'affaire à une prochaine audience.</p>
<p>Fait à ____________, le ____________</p>
<p>Signature : ____________________</p></div>`,
  },
  {
    code: 'pen_recours_appel_penal',
    name: "Recours en appel pénal",
    category: 'juridique_admin',
    price: 12000, priceMax: 32000,
    description: "Acte d'appel formé contre une décision de juridiction pénale de première instance.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      { key: 'appelant_nom', label: "Nom de l'appelant", type: 'text', required: true },
      { key: 'avocat_nom', label: "Nom de l'avocat", type: 'text', required: true },
      { key: 'decision_attaquee', label: "Référence de la décision attaquée", type: 'text', required: true },
      { key: 'date_decision', label: "Date de la décision attaquée", type: 'date', required: true },
      { key: 'moyens_appel', label: "Moyens d'appel développés", type: 'textarea', required: true },
    ]),
    body: `<div class="doc"><h1>DÉCLARATION D'APPEL</h1>
<p>À Monsieur le Greffier en Chef de la Cour d'Appel</p>
<p><strong>L'appelant :</strong> {{appelant_nom}}</p>
<p><strong>Avocat :</strong> {{avocat_nom}}</p>
<p>Déclare interjeter appel de la décision N° {{decision_attaquee}} rendue le {{date_decision}}.</p>
<h2>MOYENS D'APPEL</h2>
<p>{{moyens_appel}}</p>
<p>L'appelant conclut à l'infirmation de la décision attaquée dans toutes ses dispositions le concernant.</p>
<p>Fait à ____________, le ____________</p>
<p>Signature : ____________________</p></div>`,
  },
  {
    code: 'pen_pourvoi_cassation',
    name: "Pourvoi en cassation pénal",
    category: 'juridique_admin',
    price: 15000, priceMax: 42000,
    description: "Mémoire ampliatif à l'appui d'un pourvoi en cassation devant la Cour Suprême en matière pénale.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 45,
    fieldsJson: F([
      { key: 'demandeur_cassation', label: "Nom du demandeur en cassation", type: 'text', required: true },
      { key: 'avocat_nom', label: "Nom de l'avocat aux conseils", type: 'text', required: true },
      { key: 'arret_attaque', label: "Référence de l'arrêt attaqué", type: 'text', required: true },
      { key: 'date_arret', label: "Date de l'arrêt attaqué", type: 'date', required: true },
      { key: 'moyens_cassation', label: "Moyens de cassation développés", type: 'textarea', required: true },
    ]),
    body: `<div class="doc"><h1>MÉMOIRE AMPLIATIF EN CASSATION</h1>
<p>À Monsieur le Premier Président de la Cour Suprême</p>
<p><strong>Demandeur en cassation :</strong> {{demandeur_cassation}}</p>
<p><strong>Avocat :</strong> {{avocat_nom}}</p>
<p>Au soutien du pourvoi formé contre l'arrêt N° {{arret_attaque}} du {{date_arret}}</p>
<h2>MOYENS DE CASSATION</h2>
<p>{{moyens_cassation}}</p>
<h2>PAR CES MOTIFS</h2>
<p>Le demandeur conclut à la cassation et à l'annulation de l'arrêt attaqué, avec renvoi devant une autre juridiction du même ordre.</p>
<p>Fait à ____________, le ____________</p>
<p>Signature de l'avocat : ____________________</p></div>`,
  },
  {
    code: 'pen_demande_rehabilitation',
    name: "Demande de réhabilitation pénale",
    category: 'juridique_admin',
    price: 9000, priceMax: 22000,
    description: "Requête en réhabilitation judiciaire ou légale adressée au Procureur Général ou à la juridiction compétente.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 48,
    fieldsJson: F([
      { key: 'requerant_nom', label: "Nom du requérant", type: 'text', required: true },
      { key: 'condamnation', label: "Nature de la condamnation à effacer", type: 'textarea', required: true },
      { key: 'date_condamnation', label: "Date de la condamnation", type: 'date', required: true },
      { key: 'bonne_conduite', label: "Preuves de bonne conduite depuis la condamnation", type: 'textarea', required: true },
    ]),
    body: `<div class="doc"><h1>DEMANDE DE RÉHABILITATION PÉNALE</h1>
<p>À Monsieur le Procureur Général près la Cour d'Appel</p>
<p><strong>Du requérant :</strong> {{requerant_nom}}</p>
<h2>CONDAMNATION CONCERNÉE</h2>
<p>{{condamnation}}, prononcée le {{date_condamnation}}</p>
<h2>ÉLÉMENTS DE BONNE CONDUITE</h2>
<p>{{bonne_conduite}}</p>
<h2>PAR CES MOTIFS</h2>
<p>Le requérant sollicite qu'il lui soit accordé le bénéfice de la réhabilitation, conformément aux dispositions du Code pénal.</p>
<p>Fait à ____________, le ____________</p>
<p>Signature : ____________________</p></div>`,
  },
  {
    code: 'pen_constitution_avocat',
    name: "Acte de constitution d'avocat pénal",
    category: 'juridique_admin',
    price: 4000, priceMax: 10000,
    description: "Acte formel par lequel un avocat se constitue pour assister ou représenter un client dans une procédure pénale.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 75,
    fieldsJson: F([
      { key: 'avocat_nom', label: "Nom et prénom de l'avocat", type: 'text', required: true },
      { key: 'barreau', label: "Barreau d'inscription", type: 'text', required: true },
      { key: 'client_nom', label: "Nom du client représenté", type: 'text', required: true },
      { key: 'juridiction', label: "Juridiction devant laquelle l'avocat se constitue", type: 'text', required: true },
      { key: 'numero_affaire', label: "Numéro ou référence de l'affaire", type: 'text', required: false },
    ]),
    body: `<div class="doc"><h1>ACTE DE CONSTITUTION D'AVOCAT</h1>
<p>Je soussigné(e) Maître {{avocat_nom}}, Avocat inscrit au Barreau de {{barreau}},</p>
<p>Me constitue pour et au nom de {{client_nom}},</p>
<p>Devant {{juridiction}}, dans l'affaire N° {{numero_affaire}}.</p>
<p>Toutes significations et notifications devront m'être adressées à mon Cabinet.</p>
<p>Fait à ____________, le ____________</p>
<p>Signature de l'avocat : ____________________</p></div>`,
  },
  {
    code: 'pen_demande_avocat_commis',
    name: "Demande de désignation d'avocat commis d'office",
    category: 'juridique_admin',
    price: 3500, priceMax: 8500,
    description: "Demande adressée au Bâtonnier ou au juge compétent aux fins de désignation d'un avocat commis d'office.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 62,
    fieldsJson: F([
      { key: 'demandeur_nom', label: "Nom du demandeur (prévenu)", type: 'text', required: true },
      { key: 'situation_financiere', label: "Description de la situation financière", type: 'textarea', required: true },
      { key: 'nature_affaire', label: "Nature de l'affaire pénale", type: 'text', required: true },
      { key: 'date_audience', label: "Date de la prochaine audience", type: 'date', required: false },
    ]),
    body: `<div class="doc"><h1>DEMANDE DE DÉSIGNATION D'AVOCAT COMMIS D'OFFICE</h1>
<p>À Monsieur le Bâtonnier de l'Ordre des Avocats</p>
<p><strong>Du demandeur :</strong> {{demandeur_nom}}</p>
<p><strong>Affaire :</strong> {{nature_affaire}}</p>
<h2>SITUATION FINANCIÈRE</h2>
<p>{{situation_financiere}}</p>
<p>En raison de l'insuffisance de mes ressources, je sollicite la désignation d'un avocat commis d'office pour m'assister dans la présente procédure.</p>
<p>Fait à ____________, le ____________</p>
<p>Signature : ____________________</p></div>`,
  },
  {
    code: 'pen_requete_habeas_corpus',
    name: "Requête en habeas corpus",
    category: 'juridique_admin',
    price: 12000, priceMax: 30000,
    description: "Requête en habeas corpus tendant à faire cesser une détention arbitraire ou irrégulière.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 42,
    fieldsJson: F([
      { key: 'detenu_nom', label: "Nom du détenu", type: 'text', required: true },
      { key: 'lieu_detention', label: "Lieu de détention", type: 'text', required: true },
      { key: 'date_arrestation', label: "Date d'arrestation", type: 'date', required: true },
      { key: 'motifs_irregularite', label: "Motifs de l'irrégularité de la détention", type: 'textarea', required: true },
      { key: 'avocat_nom', label: "Nom de l'avocat requérant", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>REQUÊTE EN HABEAS CORPUS</h1>
<p>À Monsieur le Président du Tribunal de Première Instance</p>
<p><strong>Pour la liberté de :</strong> {{detenu_nom}}, détenu à {{lieu_detention}} depuis le {{date_arrestation}}</p>
<p><strong>Avocat requérant :</strong> {{avocat_nom}}</p>
<h2>IRRÉGULARITÉ DE LA DÉTENTION</h2>
<p>{{motifs_irregularite}}</p>
<h2>PAR CES MOTIFS</h2>
<p>Il est demandé qu'il plaise au Président de faire comparaître sans délai le détenu et d'ordonner sa mise en liberté immédiate.</p>
<p>Fait à ____________, le ____________</p>
<p>Signature de l'avocat : ____________________</p></div>`,
  },
  {
    code: 'pen_demande_grace_presidentielle',
    name: "Demande de grâce présidentielle",
    category: 'juridique_admin',
    price: 10000, priceMax: 28000,
    description: "Requête en grâce présidentielle adressée au Chef de l'État par un condamné ou ses proches.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 38,
    fieldsJson: F([
      { key: 'condamne_nom', label: "Nom du condamné", type: 'text', required: true },
      { key: 'nature_peine', label: "Nature et durée de la peine", type: 'text', required: true },
      { key: 'date_condamnation', label: "Date de la condamnation", type: 'date', required: true },
      { key: 'motifs_grace', label: "Motifs humanitaires ou autres justifiant la grâce", type: 'textarea', required: true },
    ]),
    body: `<div class="doc"><h1>DEMANDE DE GRÂCE PRÉSIDENTIELLE</h1>
<p>À Son Excellence Monsieur le Président de la République</p>
<p><strong>Concerne :</strong> {{condamne_nom}}</p>
<p><strong>Condamné à :</strong> {{nature_peine}}, par décision du {{date_condamnation}}</p>
<h2>EXPOSÉ DES MOTIFS</h2>
<p>{{motifs_grace}}</p>
<h2>TRÈS HUMBLE DEMANDE</h2>
<p>Fort de ces considérations, le soussigné implore la clémence de Son Excellence le Président de la République et sollicite très humblement l'octroi de la grâce présidentielle.</p>
<p>Fait à ____________, le ____________</p>
<p>Signature : ____________________</p></div>`,
  },
  {
    code: 'pen_demande_remise_peine',
    name: "Demande de remise de peine",
    category: 'juridique_admin',
    price: 8000, priceMax: 20000,
    description: "Demande de remise ou de réduction de peine adressée à la commission d'application des peines.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 44,
    fieldsJson: F([
      { key: 'detenu_nom', label: "Nom du détenu", type: 'text', required: true },
      { key: 'etablissement', label: "Établissement pénitentiaire", type: 'text', required: true },
      { key: 'peine_initiale', label: "Peine initiale prononcée", type: 'text', required: true },
      { key: 'motifs_remise', label: "Motifs et éléments de réinsertion", type: 'textarea', required: true },
      { key: 'date_ecrou', label: "Date d'écrou", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>DEMANDE DE REMISE DE PEINE</h1>
<p>À Monsieur le Président de la Commission d'Application des Peines</p>
<p><strong>Détenu :</strong> {{detenu_nom}}, à l'établissement de {{etablissement}}</p>
<p><strong>Peine :</strong> {{peine_initiale}}, depuis le {{date_ecrou}}</p>
<h2>MOTIFS ET ÉLÉMENTS DE RÉINSERTION</h2>
<p>{{motifs_remise}}</p>
<p>Le soussigné sollicite qu'il lui soit accordé le bénéfice d'une remise de peine, compte tenu de sa bonne conduite et de ses efforts de réinsertion.</p>
<p>Fait à ____________, le ____________</p>
<p>Signature du détenu : ____________________</p></div>`,
  },
  {
    code: 'pen_rapport_fin_detention',
    name: "Rapport de fin de détention provisoire",
    category: 'juridique_admin',
    price: 7000, priceMax: 18000,
    description: "Rapport établi à la fin d'une période de détention provisoire, récapitulant les conditions et la durée de la détention.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 40,
    fieldsJson: F([
      { key: 'detenu_nom', label: "Nom du détenu", type: 'text', required: true },
      { key: 'etablissement', label: "Établissement de détention", type: 'text', required: true },
      { key: 'date_entree', label: "Date d'entrée en détention", type: 'date', required: true },
      { key: 'date_sortie', label: "Date de sortie de détention", type: 'date', required: true },
      { key: 'observations', label: "Observations sur le comportement et la santé", type: 'textarea', required: false },
    ]),
    body: `<div class="doc"><h1>RAPPORT DE FIN DE DÉTENTION PROVISOIRE</h1>
<p><strong>Établissement :</strong> {{etablissement}}</p>
<p><strong>Détenu :</strong> {{detenu_nom}}</p>
<p><strong>Période de détention :</strong> du {{date_entree}} au {{date_sortie}}</p>
<h2>OBSERVATIONS</h2>
<p>{{observations}}</p>
<p>Le présent rapport est établi conformément aux dispositions légales applicables.</p>
<p>Fait à ____________, le ____________</p>
<p>Le Directeur de l'Établissement : ____________________</p></div>`,
  },
  {
    code: 'pen_demande_extradition',
    name: "Demande d'extradition (format État)",
    category: 'juridique_admin',
    price: 18000, priceMax: 55000,
    description: "Note verbale et dossier d'extradition adressés par un État requérant à un État requis.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 30,
    fieldsJson: F([
      { key: 'etat_requerant', label: "État requérant", type: 'text', required: true },
      { key: 'etat_requis', label: "État requis", type: 'text', required: true },
      { key: 'personne_reclamee', label: "Identité de la personne réclamée", type: 'text', required: true },
      { key: 'infractions_commises', label: "Infractions pour lesquelles l'extradition est demandée", type: 'textarea', required: true },
      { key: 'base_juridique', label: "Base juridique de la demande (traité, convention)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>DEMANDE D'EXTRADITION</h1>
<p>Le Gouvernement de {{etat_requerant}} adresse ses compliments au Gouvernement de {{etat_requis}} et a l'honneur de solliciter l'extradition de :</p>
<p><strong>{{personne_reclamee}}</strong></p>
<h2>INFRACTIONS REPROCHÉES</h2>
<p>{{infractions_commises}}</p>
<h2>BASE JURIDIQUE</h2>
<p>La présente demande est fondée sur {{base_juridique}}.</p>
<p>Le Gouvernement de {{etat_requerant}} s'engage à accorder la réciprocité en pareille circonstance.</p>
<p>Fait à ____________, le ____________</p>
<p>Pour le Ministre de la Justice : ____________________</p></div>`,
  },
  {
    code: 'pen_accord_cooperation_judiciaire',
    name: "Accord de coopération judiciaire pénale bilatérale",
    category: 'juridique_admin',
    price: 18000, priceMax: 55000,
    description: "Modèle d'accord bilatéral de coopération judiciaire en matière pénale entre deux États.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 28,
    fieldsJson: F([
      { key: 'etat_partie_a', label: "Premier État partie", type: 'text', required: true },
      { key: 'etat_partie_b', label: "Second État partie", type: 'text', required: true },
      { key: 'domaines_cooperation', label: "Domaines de coopération couverts", type: 'textarea', required: true },
      { key: 'date_signature', label: "Date de signature de l'accord", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE COOPÉRATION JUDICIAIRE PÉNALE</h1>
<p>Entre le Gouvernement de {{etat_partie_a}} et le Gouvernement de {{etat_partie_b}},</p>
<p>Désireux de renforcer leur coopération en matière pénale,</p>
<h2>DOMAINES DE COOPÉRATION</h2>
<p>{{domaines_cooperation}}</p>
<h2>ENTRÉE EN VIGUEUR</h2>
<p>Le présent accord entre en vigueur à compter de la date de sa signature par les deux parties.</p>
<p>Signé à ____________, le {{date_signature}}</p>
<p>Pour {{etat_partie_a}} : ____________________</p>
<p>Pour {{etat_partie_b}} : ____________________</p></div>`,
  },
  {
    code: 'pen_protocole_entraide_judiciaire',
    name: "Protocole d'entraide judiciaire internationale",
    category: 'juridique_admin',
    price: 16000, priceMax: 48000,
    description: "Protocole opérationnel d'entraide judiciaire internationale en matière pénale, précisant les modalités pratiques.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 27,
    fieldsJson: F([
      { key: 'autorite_requise', label: "Autorité judiciaire requise", type: 'text', required: true },
      { key: 'autorite_requise_pays', label: "Pays de l'autorité requise", type: 'text', required: true },
      { key: 'objet_demande', label: "Objet de la demande d'entraide", type: 'textarea', required: true },
      { key: 'diligences_requises', label: "Diligences demandées", type: 'textarea', required: true },
      { key: 'reference_affaire', label: "Référence de l'affaire pénale", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>PROTOCOLE D'ENTRAIDE JUDICIAIRE INTERNATIONALE</h1>
<p><strong>Autorité requérante :</strong> ________________________</p>
<p><strong>Autorité requise :</strong> {{autorite_requise}}, {{autorite_requise_pays}}</p>
<p><strong>Référence affaire :</strong> {{reference_affaire}}</p>
<h2>OBJET DE LA DEMANDE</h2>
<p>{{objet_demande}}</p>
<h2>DILIGENCES DEMANDÉES</h2>
<p>{{diligences_requises}}</p>
<p>La présente commission rogatoire internationale est adressée conformément aux conventions applicables.</p>
<p>Fait à ____________, le ____________</p>
<p>Le Magistrat requérant : ____________________</p></div>`,
  },
  {
    code: 'pen_charte_droits_prevenu',
    name: "Charte des droits du prévenu",
    category: 'juridique_admin',
    price: 5000, priceMax: 12000,
    description: "Document récapitulatif des droits fondamentaux du prévenu lors de sa garde à vue et tout au long de la procédure pénale.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 55,
    fieldsJson: F([
      { key: 'nom_prevenu', label: "Nom du prévenu", type: 'text', required: true },
      { key: 'date_notification', label: "Date de notification des droits", type: 'date', required: true },
      { key: 'officier_police', label: "Officier de police judiciaire notifiant", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>CHARTE DES DROITS DU PRÉVENU</h1>
<p>Notifiée à : {{nom_prevenu}}, le {{date_notification}}</p>
<p>Par : {{officier_police}}, Officier de Police Judiciaire</p>
<h2>VOS DROITS FONDAMENTAUX</h2>
<ol>
<li>Vous avez le droit de garder le silence et de ne pas vous incriminer.</li>
<li>Vous avez le droit d'être assisté par un avocat dès le début de la garde à vue.</li>
<li>Vous avez le droit d'informer un membre de votre famille ou votre employeur de votre situation.</li>
<li>Vous avez le droit d'être examiné par un médecin de votre choix.</li>
<li>Vous avez le droit d'être informé des charges retenues contre vous.</li>
<li>Vous avez le droit d'être jugé dans un délai raisonnable.</li>
<li>Vous avez le droit de ne pas être soumis à des traitements inhumains ou dégradants.</li>
</ol>
<p>Signature du prévenu attestant avoir pris connaissance de ses droits : ____________________</p>
<p>Signature de l'OPJ : ____________________</p></div>`,
  },
  // ── 25 Notariat / Actes authentiques (not_) ────────────────────────────────
  {
    code: 'not_vente_immobiliere',
    name: "Acte notarié de vente immobilière",
    category: 'juridique_admin',
    price: 15000, priceMax: 45000,
    description: "Acte authentique de vente immobilière établi par notaire, conforme au droit OHADA et au droit foncier ivoirien.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 88,
    fieldsJson: F([
      { key: 'vendeur_nom', label: "Nom complet du vendeur", type: 'text', required: true },
      { key: 'acquereur_nom', label: "Nom complet de l'acquéreur", type: 'text', required: true },
      { key: 'bien_description', label: "Description du bien immobilier", type: 'textarea', required: true },
      { key: 'prix_vente', label: "Prix de vente (en FCFA)", type: 'text', required: true },
      { key: 'date_acte', label: "Date de l'acte", type: 'date', required: true },
      { key: 'notaire_nom', label: "Nom du notaire instrumentant", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACTE DE VENTE IMMOBILIÈRE</h1>
<p>Par-devant Maître {{notaire_nom}}, Notaire,</p>
<p>A comparu :</p>
<p><strong>VENDEUR :</strong> {{vendeur_nom}}</p>
<p><strong>ACQUÉREUR :</strong> {{acquereur_nom}}</p>
<h2>DÉSIGNATION DU BIEN</h2>
<p>{{bien_description}}</p>
<h2>PRIX ET CONDITIONS</h2>
<p>La vente est consentie et acceptée moyennant le prix de {{prix_vente}} FCFA, dont quittance est donnée par la présente.</p>
<p>Fait à ____________, le {{date_acte}}</p>
<p>Signature du vendeur : ____________________</p>
<p>Signature de l'acquéreur : ____________________</p>
<p>Cachet et signature du notaire : ____________________</p></div>`,
  },
  {
    code: 'not_donation_entre_vifs',
    name: "Acte notarié de donation entre vifs",
    category: 'juridique_admin',
    price: 12000, priceMax: 35000,
    description: "Acte authentique de donation entre vifs, irrévocable, constaté par notaire conformément au Code Civil applicable.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      { key: 'donateur_nom', label: "Nom complet du donateur", type: 'text', required: true },
      { key: 'donataire_nom', label: "Nom complet du donataire", type: 'text', required: true },
      { key: 'bien_donne', label: "Description du bien ou somme donnée", type: 'textarea', required: true },
      { key: 'valeur_donation', label: "Valeur de la donation (FCFA)", type: 'text', required: true },
      { key: 'date_acte', label: "Date de l'acte", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACTE DE DONATION ENTRE VIFS</h1>
<p>Par-devant Maître ________________________, Notaire,</p>
<p><strong>DONATEUR :</strong> {{donateur_nom}}</p>
<p><strong>DONATAIRE :</strong> {{donataire_nom}}</p>
<h2>OBJET DE LA DONATION</h2>
<p>{{bien_donne}}</p>
<p><strong>Valeur :</strong> {{valeur_donation}} FCFA</p>
<p>Le donateur déclare faire donation pure et simple, irrévocable entre vifs, au donataire qui accepte.</p>
<p>Fait à ____________, le {{date_acte}}</p>
<p>Signatures des parties et du notaire : ____________________</p></div>`,
  },
  {
    code: 'not_testament_olographe',
    name: "Testament olographe (modèle)",
    category: 'juridique_admin',
    price: 6000, priceMax: 16000,
    description: "Modèle de testament olographe entièrement écrit, daté et signé de la main du testateur.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 62,
    fieldsJson: F([
      { key: 'testateur_nom', label: "Nom complet du testateur", type: 'text', required: true },
      { key: 'date_testament', label: "Date du testament", type: 'date', required: true },
      { key: 'dispositions', label: "Dispositions testamentaires", type: 'textarea', required: true },
      { key: 'legataires', label: "Identité des légataires", type: 'textarea', required: true },
    ]),
    body: `<div class="doc"><h1>TESTAMENT OLOGRAPHE</h1>
<p>Je soussigné(e) {{testateur_nom}}, sain(e) de corps et d'esprit, établis le présent testament olographe.</p>
<p>Fait à ____________, le {{date_testament}}</p>
<h2>MES DISPOSITIONS TESTAMENTAIRES</h2>
<p>{{dispositions}}</p>
<h2>MES LÉGATAIRES</h2>
<p>{{legataires}}</p>
<p>Le présent testament annule et remplace tout testament antérieur.</p>
<p>Signature manuscrite : ____________________</p>
<p><em>(Ce document doit être entièrement écrit de la main du testateur)</em></p></div>`,
  },
  {
    code: 'not_testament_authentique',
    name: "Testament authentique (acte notarié)",
    category: 'juridique_admin',
    price: 10000, priceMax: 28000,
    description: "Testament reçu par notaire en présence de témoins, offrant une sécurité juridique maximale.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      { key: 'testateur_nom', label: "Nom complet du testateur", type: 'text', required: true },
      { key: 'notaire_nom', label: "Nom du notaire", type: 'text', required: true },
      { key: 'dispositions', label: "Dispositions testamentaires dictées", type: 'textarea', required: true },
      { key: 'legataires', label: "Identité et parts des légataires", type: 'textarea', required: true },
      { key: 'date_acte', label: "Date de l'acte", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>TESTAMENT AUTHENTIQUE</h1>
<p>Par-devant Maître {{notaire_nom}}, Notaire, et en présence des témoins instrumentaires,</p>
<p>A comparu : {{testateur_nom}}, testateur</p>
<p>Lequel a dicté ses volontés comme suit :</p>
<h2>DISPOSITIONS TESTAMENTAIRES</h2>
<p>{{dispositions}}</p>
<h2>LÉGATAIRES DÉSIGNÉS</h2>
<p>{{legataires}}</p>
<p>Fait à ____________, le {{date_acte}}</p>
<p>Signature du testateur : ____________________</p>
<p>Signatures des témoins et du notaire : ____________________</p></div>`,
  },
  {
    code: 'not_acte_mariage_civil',
    name: "Acte de mariage civil (registre)",
    category: 'juridique_admin',
    price: 5000, priceMax: 13000,
    description: "Extrait d'acte de mariage civil issu du registre d'état civil, conforme aux dispositions légales.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 92,
    fieldsJson: F([
      { key: 'epoux_nom', label: "Nom complet de l'époux", type: 'text', required: true },
      { key: 'epouse_nom', label: "Nom complet de l'épouse", type: 'text', required: true },
      { key: 'date_mariage', label: "Date du mariage", type: 'date', required: true },
      { key: 'lieu_mariage', label: "Lieu (Mairie) du mariage", type: 'text', required: true },
      { key: 'officier_etat_civil', label: "Nom de l'officier d'état civil", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACTE DE MARIAGE</h1>
<p>RÉPUBLIQUE DE CÔTE D'IVOIRE</p>
<p>Mairie de {{lieu_mariage}} — Registre des actes de mariage</p>
<p>Le {{date_mariage}}, devant Nous {{officier_etat_civil}}, Officier d'État Civil,</p>
<p>Ont comparu : {{epoux_nom}} et {{epouse_nom}}</p>
<p>Lesquels ont déclaré vouloir se prendre pour époux et épouse.</p>
<p>Nous avons prononcé leur union au nom de la Loi.</p>
<p>Fait à {{lieu_mariage}}, le {{date_mariage}}</p>
<p>L'Officier d'État Civil : ____________________</p></div>`,
  },
  {
    code: 'not_acte_naissance',
    name: "Acte de naissance (extrait)",
    category: 'juridique_admin',
    price: 3500, priceMax: 9000,
    description: "Extrait d'acte de naissance délivré par l'officier d'état civil, certifié conforme au registre.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 95,
    fieldsJson: F([
      { key: 'enfant_nom', label: "Nom et prénoms de l'enfant", type: 'text', required: true },
      { key: 'date_naissance', label: "Date de naissance", type: 'date', required: true },
      { key: 'lieu_naissance', label: "Lieu de naissance", type: 'text', required: true },
      { key: 'pere_nom', label: "Nom complet du père", type: 'text', required: false },
      { key: 'mere_nom', label: "Nom complet de la mère", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>EXTRAIT D'ACTE DE NAISSANCE</h1>
<p>RÉPUBLIQUE DE CÔTE D'IVOIRE</p>
<p>Mairie de {{lieu_naissance}}</p>
<p><strong>Nom et prénoms :</strong> {{enfant_nom}}</p>
<p><strong>Né(e) le :</strong> {{date_naissance}} à {{lieu_naissance}}</p>
<p><strong>Père :</strong> {{pere_nom}}</p>
<p><strong>Mère :</strong> {{mere_nom}}</p>
<p>Le présent extrait est certifié conforme au registre des naissances.</p>
<p>Fait à ____________, le ____________</p>
<p>L'Officier d'État Civil : ____________________</p></div>`,
  },
  {
    code: 'not_acte_deces',
    name: "Acte de décès (extrait)",
    category: 'juridique_admin',
    price: 3500, priceMax: 9000,
    description: "Extrait d'acte de décès certifié conforme, délivré par l'officier d'état civil.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 85,
    fieldsJson: F([
      { key: 'defunt_nom', label: "Nom et prénoms du défunt", type: 'text', required: true },
      { key: 'date_deces', label: "Date du décès", type: 'date', required: true },
      { key: 'lieu_deces', label: "Lieu du décès", type: 'text', required: true },
      { key: 'declarant_nom', label: "Nom du déclarant", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>EXTRAIT D'ACTE DE DÉCÈS</h1>
<p>RÉPUBLIQUE DE CÔTE D'IVOIRE</p>
<p>Mairie de {{lieu_deces}}</p>
<p><strong>Nom et prénoms du défunt :</strong> {{defunt_nom}}</p>
<p><strong>Décédé(e) le :</strong> {{date_deces}} à {{lieu_deces}}</p>
<p><strong>Déclaration faite par :</strong> {{declarant_nom}}</p>
<p>Le présent extrait est certifié conforme au registre des décès.</p>
<p>Fait à ____________, le ____________</p>
<p>L'Officier d'État Civil : ____________________</p></div>`,
  },
  {
    code: 'not_legalisation_signature',
    name: "Légalisation de signature",
    category: 'juridique_admin',
    price: 4000, priceMax: 10000,
    description: "Acte de légalisation de signature apposée devant l'autorité compétente (notaire, mairie, consulat).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 80,
    fieldsJson: F([
      { key: 'signataire_nom', label: "Nom complet du signataire", type: 'text', required: true },
      { key: 'document_legalise', label: "Document sur lequel la signature est légalisée", type: 'text', required: true },
      { key: 'autorite_legalisant', label: "Autorité légalisante", type: 'text', required: true },
      { key: 'date_legalisation', label: "Date de légalisation", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>LÉGALISATION DE SIGNATURE</h1>
<p>Nous, {{autorite_legalisant}},</p>
<p>Certifions que la signature apposée sur le document intitulé {{document_legalise}} est bien celle de {{signataire_nom}}, dont l'identité a été vérifiée.</p>
<p>Fait à ____________, le {{date_legalisation}}</p>
<p>Cachet et signature de l'autorité légalisante : ____________________</p></div>`,
  },
  {
    code: 'not_apostille_haye',
    name: "Apostille de La Haye (modèle)",
    category: 'juridique_admin',
    price: 6000, priceMax: 16000,
    description: "Certificat d'apostille conforme à la Convention de La Haye du 5 octobre 1961 sur la légalisation des actes publics étrangers.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      { key: 'document_concerne', label: "Nature du document concerné", type: 'text', required: true },
      { key: 'signataire_document', label: "Nom du signataire du document d'origine", type: 'text', required: true },
      { key: 'qualite_signataire', label: "Qualité du signataire", type: 'text', required: true },
      { key: 'autorite_emettrice', label: "Autorité émettrice de l'apostille", type: 'text', required: true },
      { key: 'date_apostille', label: "Date de l'apostille", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>APOSTILLE</h1>
<p><em>(Convention de La Haye du 5 octobre 1961)</em></p>
<p><strong>RÉPUBLIQUE DE CÔTE D'IVOIRE</strong></p>
<table border="1" cellpadding="5" style="width:100%">
<tr><td>1. Pays : CÔTE D'IVOIRE</td></tr>
<tr><td>2. Le présent acte public a été signé par : {{signataire_document}}</td></tr>
<tr><td>3. Agissant en qualité de : {{qualite_signataire}}</td></tr>
<tr><td>4. Revêtu du sceau/timbre de : {{document_concerne}}</td></tr>
<tr><td>5. À ____________ le {{date_apostille}}</td></tr>
<tr><td>6. Par : {{autorite_emettrice}}</td></tr>
<tr><td>7. Sous N° : ____________</td></tr>
<tr><td>8. Sceau/Timbre : ____________________</td></tr>
<tr><td>9. Signature : ____________________</td></tr>
</table></div>`,
  },
  {
    code: 'not_procuration_generale',
    name: "Acte de procuration notariée générale",
    category: 'juridique_admin',
    price: 9000, priceMax: 22000,
    description: "Procuration générale authentique donnant tous pouvoirs à un mandataire pour agir au nom du mandant.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 82,
    fieldsJson: F([
      { key: 'mandant_nom', label: "Nom complet du mandant", type: 'text', required: true },
      { key: 'mandataire_nom', label: "Nom complet du mandataire", type: 'text', required: true },
      { key: 'pouvoirs', label: "Étendue des pouvoirs conférés", type: 'textarea', required: true },
      { key: 'duree_validite', label: "Durée de validité de la procuration", type: 'text', required: false },
      { key: 'date_acte', label: "Date de l'acte", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>PROCURATION NOTARIÉE GÉNÉRALE</h1>
<p>Par-devant Maître ________________________, Notaire,</p>
<p>A comparu : {{mandant_nom}} (le mandant)</p>
<p>Lequel donne par les présentes, pouvoir à {{mandataire_nom}} (le mandataire) de :</p>
<h2>POUVOIRS CONFÉRÉS</h2>
<p>{{pouvoirs}}</p>
<p><strong>Durée :</strong> {{duree_validite}}</p>
<p>Fait à ____________, le {{date_acte}}</p>
<p>Signature du mandant : ____________________</p>
<p>Signature du mandataire : ____________________</p>
<p>Cachet et signature du notaire : ____________________</p></div>`,
  },
  {
    code: 'not_procuration_speciale',
    name: "Acte de procuration spéciale",
    category: 'juridique_admin',
    price: 7000, priceMax: 18000,
    description: "Procuration spéciale limitée à un acte ou une opération déterminée, établie par notaire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 76,
    fieldsJson: F([
      { key: 'mandant_nom', label: "Nom complet du mandant", type: 'text', required: true },
      { key: 'mandataire_nom', label: "Nom complet du mandataire", type: 'text', required: true },
      { key: 'acte_specifique', label: "Acte ou opération spécifique autorisé(e)", type: 'textarea', required: true },
      { key: 'date_acte', label: "Date de l'acte", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>PROCURATION SPÉCIALE</h1>
<p>Par-devant Maître ________________________, Notaire,</p>
<p>A comparu : {{mandant_nom}}</p>
<p>Lequel donne spécialement pouvoir à {{mandataire_nom}} de :</p>
<h2>ACTE AUTORISÉ</h2>
<p>{{acte_specifique}}</p>
<p>Sans autres pouvoirs que ceux expressément mentionnés.</p>
<p>Fait à ____________, le {{date_acte}}</p>
<p>Signatures des parties et du notaire : ____________________</p></div>`,
  },
  {
    code: 'not_renonciation_succession',
    name: "Acte de renonciation à succession notariée",
    category: 'juridique_admin',
    price: 8000, priceMax: 20000,
    description: "Acte authentique par lequel un héritier renonce à la succession d'un défunt devant notaire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 52,
    fieldsJson: F([
      { key: 'renonciateur_nom', label: "Nom complet du renonciateur", type: 'text', required: true },
      { key: 'defunt_nom', label: "Nom du défunt", type: 'text', required: true },
      { key: 'date_deces', label: "Date du décès du défunt", type: 'date', required: true },
      { key: 'lien_parente', label: "Lien de parenté avec le défunt", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACTE DE RENONCIATION À SUCCESSION</h1>
<p>Par-devant Maître ________________________, Notaire,</p>
<p>A comparu : {{renonciateur_nom}}, {{lien_parente}} de {{defunt_nom}}, décédé le {{date_deces}},</p>
<p>Lequel déclare renoncer purement et simplement à la succession du défunt, sans retenir aucun bien de la succession.</p>
<p>Le renonciateur reconnaît avoir reçu toutes informations nécessaires sur les conséquences de la présente renonciation.</p>
<p>Fait à ____________, le ____________</p>
<p>Signature du renonciateur : ____________________</p>
<p>Cachet et signature du notaire : ____________________</p></div>`,
  },
  {
    code: 'not_partage_notarie',
    name: "Acte de partage notarié",
    category: 'juridique_admin',
    price: 14000, priceMax: 40000,
    description: "Acte authentique de partage d'une succession ou d'une indivision, établi par notaire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      { key: 'copartageants', label: "Noms des copartageants", type: 'textarea', required: true },
      { key: 'biens_partages', label: "Description des biens à partager", type: 'textarea', required: true },
      { key: 'lots_attribues', label: "Détail des lots attribués à chaque copartageant", type: 'textarea', required: true },
      { key: 'date_acte', label: "Date de l'acte", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACTE DE PARTAGE</h1>
<p>Par-devant Maître ________________________, Notaire,</p>
<h2>COPARTAGEANTS</h2>
<p>{{copartageants}}</p>
<h2>BIENS À PARTAGER</h2>
<p>{{biens_partages}}</p>
<h2>ATTRIBUTION DES LOTS</h2>
<p>{{lots_attribues}}</p>
<p>Les copartageants déclarent le présent partage définitif et sans recours réciproque sur les biens ainsi attribués.</p>
<p>Fait à ____________, le {{date_acte}}</p>
<p>Signatures des copartageants et du notaire : ____________________</p></div>`,
  },
  {
    code: 'not_constitution_sa',
    name: "Acte de constitution de société (SA)",
    category: 'juridique_admin',
    price: 18000, priceMax: 55000,
    description: "Statuts authentiques d'une Société Anonyme (SA) conformes à l'Acte Uniforme OHADA relatif aux sociétés commerciales.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      { key: 'denomination_sociale', label: "Dénomination sociale de la SA", type: 'text', required: true },
      { key: 'siege_social', label: "Siège social", type: 'text', required: true },
      { key: 'capital_social', label: "Montant du capital social (FCFA)", type: 'text', required: true },
      { key: 'objet_social', label: "Objet social", type: 'textarea', required: true },
      { key: 'actionnaires', label: "Liste des actionnaires fondateurs et apports", type: 'textarea', required: true },
      { key: 'date_acte', label: "Date de l'acte constitutif", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>STATUTS DE SOCIÉTÉ ANONYME</h1>
<p>Par-devant Maître ________________________, Notaire,</p>
<h2>ARTICLE 1 — FORME</h2>
<p>Il est constitué une Société Anonyme régie par l'Acte Uniforme OHADA.</p>
<h2>ARTICLE 2 — DÉNOMINATION</h2>
<p>{{denomination_sociale}}</p>
<h2>ARTICLE 3 — SIÈGE SOCIAL</h2>
<p>{{siege_social}}</p>
<h2>ARTICLE 4 — OBJET SOCIAL</h2>
<p>{{objet_social}}</p>
<h2>ARTICLE 5 — CAPITAL SOCIAL</h2>
<p>Le capital social est fixé à {{capital_social}} FCFA.</p>
<h2>ARTICLE 6 — ACTIONNAIRES FONDATEURS</h2>
<p>{{actionnaires}}</p>
<p>Fait à ____________, le {{date_acte}}</p>
<p>Signatures des fondateurs et du notaire : ____________________</p></div>`,
  },
  {
    code: 'not_modification_statuts',
    name: "Acte de modification de statuts",
    category: 'juridique_admin',
    price: 12000, priceMax: 32000,
    description: "Acte notarié constatant la modification des statuts d'une société commerciale, conforme à l'Acte Uniforme OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      { key: 'denomination_sociale', label: "Dénomination sociale", type: 'text', required: true },
      { key: 'rccm', label: "Numéro RCCM", type: 'text', required: true },
      { key: 'modifications', label: "Modifications apportées aux statuts", type: 'textarea', required: true },
      { key: 'date_assemblee', label: "Date de l'assemblée ayant décidé les modifications", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACTE DE MODIFICATION DE STATUTS</h1>
<p>La société {{denomination_sociale}}, RCCM N° {{rccm}},</p>
<p>Suite à l'assemblée générale extraordinaire du {{date_assemblee}},</p>
<h2>MODIFICATIONS DÉCIDÉES</h2>
<p>{{modifications}}</p>
<p>Les statuts sont modifiés en conséquence. Toutes les autres dispositions demeurent inchangées.</p>
<p>Fait à ____________, le ____________</p>
<p>Le Président du Conseil d'Administration : ____________________</p>
<p>Cachet et signature du notaire : ____________________</p></div>`,
  },
  {
    code: 'not_dissolution_societe',
    name: "Acte de dissolution de société",
    category: 'juridique_admin',
    price: 11000, priceMax: 28000,
    description: "Acte authentique constatant la dissolution amiable d'une société commerciale et nommant un liquidateur.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      { key: 'denomination_sociale', label: "Dénomination sociale", type: 'text', required: true },
      { key: 'rccm', label: "Numéro RCCM", type: 'text', required: true },
      { key: 'motif_dissolution', label: "Motif de la dissolution", type: 'textarea', required: true },
      { key: 'liquidateur_nom', label: "Nom et qualité du liquidateur désigné", type: 'text', required: true },
      { key: 'date_dissolution', label: "Date de dissolution", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACTE DE DISSOLUTION DE SOCIÉTÉ</h1>
<p>La société {{denomination_sociale}}, RCCM N° {{rccm}},</p>
<p>Est dissoute à compter du {{date_dissolution}}.</p>
<h2>MOTIF DE DISSOLUTION</h2>
<p>{{motif_dissolution}}</p>
<h2>LIQUIDATEUR</h2>
<p>{{liquidateur_nom}} est désigné comme liquidateur avec tous pouvoirs pour réaliser les opérations de liquidation.</p>
<p>Fait à ____________, le {{date_dissolution}}</p>
<p>Signatures des associés et du notaire : ____________________</p></div>`,
  },
  {
    code: 'not_fusion_societes',
    name: "Acte de fusion de sociétés",
    category: 'juridique_admin',
    price: 18000, priceMax: 55000,
    description: "Traité de fusion entre deux ou plusieurs sociétés, conforme à l'Acte Uniforme OHADA relatif aux sociétés commerciales.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 40,
    fieldsJson: F([
      { key: 'societe_absorbante', label: "Dénomination de la société absorbante", type: 'text', required: true },
      { key: 'societe_absorbee', label: "Dénomination de la société absorbée", type: 'text', required: true },
      { key: 'conditions_fusion', label: "Conditions et modalités de la fusion", type: 'textarea', required: true },
      { key: 'date_effet', label: "Date d'effet de la fusion", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>TRAITÉ DE FUSION</h1>
<p>Entre :</p>
<p><strong>La société absorbante :</strong> {{societe_absorbante}}</p>
<p><strong>La société absorbée :</strong> {{societe_absorbee}}</p>
<h2>CONDITIONS ET MODALITÉS</h2>
<p>{{conditions_fusion}}</p>
<h2>DATE D'EFFET</h2>
<p>La fusion prend effet le {{date_effet}}.</p>
<p>La société absorbée est dissoute sans liquidation, son patrimoine étant transmis universellement à la société absorbante.</p>
<p>Fait à ____________, le ____________</p>
<p>Signatures des représentants légaux et du notaire : ____________________</p></div>`,
  },
  {
    code: 'not_scission_societe',
    name: "Acte de scission de société",
    category: 'juridique_admin',
    price: 16000, priceMax: 48000,
    description: "Acte de scission d'une société en deux ou plusieurs entités distinctes, conforme à l'Acte Uniforme OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 35,
    fieldsJson: F([
      { key: 'societe_scindee', label: "Dénomination de la société scindée", type: 'text', required: true },
      { key: 'societes_nouvelles', label: "Dénomination des sociétés issues de la scission", type: 'textarea', required: true },
      { key: 'modalites_scission', label: "Modalités de répartition des actifs et passifs", type: 'textarea', required: true },
      { key: 'date_effet', label: "Date d'effet de la scission", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACTE DE SCISSION DE SOCIÉTÉ</h1>
<p><strong>Société scindée :</strong> {{societe_scindee}}</p>
<p><strong>Sociétés bénéficiaires :</strong> {{societes_nouvelles}}</p>
<h2>RÉPARTITION DES ACTIFS ET PASSIFS</h2>
<p>{{modalites_scission}}</p>
<p><strong>Date d'effet :</strong> {{date_effet}}</p>
<p>La société scindée est dissoute sans liquidation à compter de la date d'effet.</p>
<p>Fait à ____________, le ____________</p>
<p>Signatures et cachet du notaire : ____________________</p></div>`,
  },
  {
    code: 'not_contrat_mariage_separation',
    name: "Contrat de mariage (séparation de biens)",
    category: 'juridique_admin',
    price: 10000, priceMax: 26000,
    description: "Contrat de mariage établi sous le régime de la séparation de biens, reçu par notaire avant la célébration du mariage.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      { key: 'futur_epoux', label: "Nom complet du futur époux", type: 'text', required: true },
      { key: 'future_epouse', label: "Nom complet de la future épouse", type: 'text', required: true },
      { key: 'biens_propres_epoux', label: "Biens propres apportés par l'époux", type: 'textarea', required: false },
      { key: 'biens_propres_epouse', label: "Biens propres apportés par l'épouse", type: 'textarea', required: false },
      { key: 'date_acte', label: "Date du contrat", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE MARIAGE — SÉPARATION DE BIENS</h1>
<p>Par-devant Maître ________________________, Notaire,</p>
<p>Ont comparu : {{futur_epoux}} et {{future_epouse}}</p>
<h2>RÉGIME MATRIMONIAL</h2>
<p>Les futurs époux déclarent adopter le régime de la SÉPARATION DE BIENS.</p>
<p>Chacun des époux conserve la propriété, la jouissance et l'administration de ses biens personnels.</p>
<h2>BIENS PROPRES DE L'ÉPOUX</h2>
<p>{{biens_propres_epoux}}</p>
<h2>BIENS PROPRES DE L'ÉPOUSE</h2>
<p>{{biens_propres_epouse}}</p>
<p>Fait à ____________, le {{date_acte}}</p>
<p>Signatures des futurs époux et du notaire : ____________________</p></div>`,
  },
  {
    code: 'not_contrat_mariage_communaute',
    name: "Contrat de mariage (communauté réduite aux acquêts)",
    category: 'juridique_admin',
    price: 10000, priceMax: 26000,
    description: "Contrat de mariage sous le régime de la communauté réduite aux acquêts, établi par notaire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      { key: 'futur_epoux', label: "Nom complet du futur époux", type: 'text', required: true },
      { key: 'future_epouse', label: "Nom complet de la future épouse", type: 'text', required: true },
      { key: 'biens_communs_prevus', label: "Biens destinés à la communauté", type: 'textarea', required: false },
      { key: 'date_acte', label: "Date du contrat", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE MARIAGE — COMMUNAUTÉ RÉDUITE AUX ACQUÊTS</h1>
<p>Par-devant Maître ________________________, Notaire,</p>
<p>Ont comparu : {{futur_epoux}} et {{future_epouse}}</p>
<h2>RÉGIME MATRIMONIAL</h2>
<p>Les futurs époux adoptent le régime de la COMMUNAUTÉ RÉDUITE AUX ACQUÊTS.</p>
<p>Sont communs tous les biens acquis à titre onéreux pendant le mariage. Restent propres les biens possédés avant le mariage et ceux reçus par donation ou succession.</p>
<h2>BIENS DESTINÉS À LA COMMUNAUTÉ</h2>
<p>{{biens_communs_prevus}}</p>
<p>Fait à ____________, le {{date_acte}}</p>
<p>Signatures et cachet du notaire : ____________________</p></div>`,
  },
  {
    code: 'not_acte_adoption',
    name: "Acte d'adoption",
    category: 'juridique_admin',
    price: 12000, priceMax: 32000,
    description: "Acte authentique d'adoption simple ou plénière, établi après jugement du tribunal compétent.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 48,
    fieldsJson: F([
      { key: 'adoptant_nom', label: "Nom complet de l'adoptant", type: 'text', required: true },
      { key: 'adopte_nom', label: "Nom et prénoms de l'adopté", type: 'text', required: true },
      { key: 'date_naissance_adopte', label: "Date de naissance de l'adopté", type: 'date', required: true },
      { key: 'type_adoption', label: "Type d'adoption (simple ou plénière)", type: 'text', required: true },
      { key: 'reference_jugement', label: "Référence du jugement d'adoption", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACTE D'ADOPTION</h1>
<p>Par-devant Maître ________________________, Notaire, et suite au jugement N° {{reference_jugement}},</p>
<p><strong>Adoptant :</strong> {{adoptant_nom}}</p>
<p><strong>Adopté(e) :</strong> {{adopte_nom}}, né(e) le {{date_naissance_adopte}}</p>
<p><strong>Type d'adoption :</strong> {{type_adoption}}</p>
<p>L'adoption est constituée aux conditions fixées par le jugement précité et les dispositions légales applicables.</p>
<p>Fait à ____________, le ____________</p>
<p>Signatures et cachet du notaire : ____________________</p></div>`,
  },
  {
    code: 'not_reconnaissance_paternite',
    name: "Acte de reconnaissance de paternité",
    category: 'juridique_admin',
    price: 5000, priceMax: 13000,
    description: "Acte authentique par lequel un père reconnaît officiellement sa paternité devant un officier d'état civil ou notaire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 75,
    fieldsJson: F([
      { key: 'pere_nom', label: "Nom complet du père", type: 'text', required: true },
      { key: 'enfant_nom', label: "Nom et prénoms de l'enfant", type: 'text', required: true },
      { key: 'date_naissance_enfant', label: "Date de naissance de l'enfant", type: 'date', required: true },
      { key: 'mere_nom', label: "Nom complet de la mère", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACTE DE RECONNAISSANCE DE PATERNITÉ</h1>
<p>Je soussigné(e) {{pere_nom}},</p>
<p>Reconnaît être le père de l'enfant {{enfant_nom}}, né(e) le {{date_naissance_enfant}}, de mère {{mere_nom}}.</p>
<p>La présente reconnaissance est faite librement et en toute connaissance des droits et obligations qui en découlent.</p>
<p>Fait à ____________, le ____________</p>
<p>Signature du père : ____________________</p>
<p>Cachet et signature de l'officier d'état civil / notaire : ____________________</p></div>`,
  },
  {
    code: 'not_changement_nom',
    name: "Acte de changement de nom",
    category: 'juridique_admin',
    price: 9000, priceMax: 24000,
    description: "Acte authentique constatant un changement de nom autorisé par décret ou décision judiciaire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 50,
    fieldsJson: F([
      { key: 'demandeur_nom_actuel', label: "Nom actuel du demandeur", type: 'text', required: true },
      { key: 'nouveau_nom', label: "Nouveau nom souhaité", type: 'text', required: true },
      { key: 'motif_changement', label: "Motif du changement de nom", type: 'textarea', required: true },
      { key: 'reference_autorisation', label: "Référence du décret ou de la décision judiciaire", type: 'text', required: true },
      { key: 'date_effet', label: "Date d'effet du changement", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACTE DE CHANGEMENT DE NOM</h1>
<p><strong>Nom actuel :</strong> {{demandeur_nom_actuel}}</p>
<p><strong>Nouveau nom :</strong> {{nouveau_nom}}</p>
<p><strong>Autorisation :</strong> {{reference_autorisation}}</p>
<h2>MOTIF</h2>
<p>{{motif_changement}}</p>
<p>À compter du {{date_effet}}, le demandeur sera désigné sous le nom de {{nouveau_nom}} dans tous actes et documents officiels.</p>
<p>Fait à ____________, le ____________</p>
<p>Cachet et signature de l'autorité compétente : ____________________</p></div>`,
  },
  {
    code: 'not_acte_nationalite',
    name: "Acte de nationalité",
    category: 'juridique_admin',
    price: 7000, priceMax: 18000,
    description: "Certificat de nationalité ou acte attestant l'acquisition ou la confirmation de la nationalité ivoirienne.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 78,
    fieldsJson: F([
      { key: 'beneficiaire_nom', label: "Nom complet du bénéficiaire", type: 'text', required: true },
      { key: 'date_naissance', label: "Date de naissance", type: 'date', required: true },
      { key: 'lieu_naissance', label: "Lieu de naissance", type: 'text', required: true },
      { key: 'mode_acquisition', label: "Mode d'acquisition de la nationalité", type: 'text', required: true },
      { key: 'autorite_delivrante', label: "Autorité délivrante", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>CERTIFICAT DE NATIONALITÉ IVOIRIENNE</h1>
<p>RÉPUBLIQUE DE CÔTE D'IVOIRE</p>
<p>Nous, {{autorite_delivrante}},</p>
<p>Certifions que {{beneficiaire_nom}}, né(e) le {{date_naissance}} à {{lieu_naissance}},</p>
<p>Possède la nationalité ivoirienne par {{mode_acquisition}}.</p>
<p>Le présent certificat est délivré pour servir et valoir ce que de droit.</p>
<p>Fait à ____________, le ____________</p>
<p>Cachet et signature : ____________________</p></div>`,
  },
  {
    code: 'not_rapport_officier_etat_civil',
    name: "Rapport de l'officier d'état civil",
    category: 'juridique_admin',
    price: 5000, priceMax: 13000,
    description: "Rapport annuel ou circonstanciel de l'officier d'état civil sur la tenue des registres et les actes enregistrés.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 42,
    fieldsJson: F([
      { key: 'officier_nom', label: "Nom de l'officier d'état civil", type: 'text', required: true },
      { key: 'commune', label: "Commune ou sous-préfecture", type: 'text', required: true },
      { key: 'periode', label: "Période couverte par le rapport", type: 'text', required: true },
      { key: 'statistiques', label: "Statistiques des actes enregistrés", type: 'textarea', required: true },
      { key: 'observations', label: "Observations et recommandations", type: 'textarea', required: false },
    ]),
    body: `<div class="doc"><h1>RAPPORT DE L'OFFICIER D'ÉTAT CIVIL</h1>
<p>RÉPUBLIQUE DE CÔTE D'IVOIRE</p>
<p><strong>Commune / Sous-préfecture :</strong> {{commune}}</p>
<p><strong>Officier d'état civil :</strong> {{officier_nom}}</p>
<p><strong>Période :</strong> {{periode}}</p>
<h2>STATISTIQUES DES ACTES</h2>
<p>{{statistiques}}</p>
<h2>OBSERVATIONS ET RECOMMANDATIONS</h2>
<p>{{observations}}</p>
<p>Fait à {{commune}}, le ____________</p>
<p>L'Officier d'État Civil : ____________________</p></div>`,
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
  console.log(`Batch 47b OK — créés:${created} maj:${updated} TOTAL:${total}`);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
