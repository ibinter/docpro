import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);

const templates = [
  // ──────────────────────────────────────────────
  // BLOC 1 — CHIRURGIE / BLOC OPÉRATOIRE (chir_)
  // ──────────────────────────────────────────────
  {
    code: 'chir_consent_general',
    name: "Consentement Chirurgical Général",
    category: 'sante',
    price: 5000,
    priceMax: 15000,
    description: "Formulaire de consentement éclairé du patient avant toute intervention chirurgicale, conforme aux exigences légales OHADA et aux bonnes pratiques médicales.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 85,
    fieldsJson: F([
      { key: 'nom_patient', label: "Nom complet du patient", type: 'text', required: true },
      { key: 'date_naissance', label: "Date de naissance", type: 'date', required: true },
      { key: 'nature_intervention', label: "Nature de l'intervention", type: 'textarea', required: true },
      { key: 'nom_chirurgien', label: "Nom du chirurgien", type: 'text', required: true },
      { key: 'date_intervention', label: "Date prévue de l'intervention", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>FORMULAIRE DE CONSENTEMENT CHIRURGICAL</h1>
<p>Je soussigné(e), <strong>{{nom_patient}}</strong>, né(e) le {{date_naissance}}, déclare avoir été informé(e) par le Dr {{nom_chirurgien}} de la nature, des risques et des bénéfices de l'intervention suivante :</p>
<p>{{nature_intervention}}</p>
<p>L'intervention est prévue le {{date_intervention}}. Je consens librement et en toute connaissance de cause à la réalisation de cette intervention.</p>
<p>Signature du patient : _____________________ Date : _____________</p></div>`
  },
  {
    code: 'chir_consent_cardiaque',
    name: "Consentement Chirurgie Cardiaque",
    category: 'sante',
    price: 8000,
    priceMax: 24000,
    description: "Formulaire de consentement éclairé spécifique aux interventions de chirurgie cardiaque (pontages, valvuloplasties, etc.), incluant les risques spécifiques cardiaques.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'nom_patient', label: "Nom complet du patient", type: 'text', required: true },
      { key: 'date_naissance', label: "Date de naissance", type: 'date', required: true },
      { key: 'type_chirurgie_cardiaque', label: "Type de chirurgie cardiaque", type: 'textarea', required: true },
      { key: 'nom_chirurgien_cardio', label: "Nom du chirurgien cardio-vasculaire", type: 'text', required: true },
      { key: 'risques_specifiques', label: "Risques spécifiques identifiés", type: 'textarea', required: false },
    ]),
    body: `<div class="doc"><h1>CONSENTEMENT ÉCLAIRÉ — CHIRURGIE CARDIAQUE</h1>
<p>Patient : <strong>{{nom_patient}}</strong>, né(e) le {{date_naissance}}.</p>
<p>Le Dr {{nom_chirurgien_cardio}} m'a expliqué la nature de l'intervention cardiaque envisagée : {{type_chirurgie_cardiaque}}.</p>
<p>Risques spécifiques portés à ma connaissance : {{risques_specifiques}}</p>
<p>J'accepte l'intervention et l'utilisation éventuelle de la circulation extra-corporelle.</p>
<p>Signature : _____________________ Date : _____________</p></div>`
  },
  {
    code: 'chir_consent_ortho',
    name: "Consentement Chirurgie Orthopédique",
    category: 'sante',
    price: 6000,
    priceMax: 18000,
    description: "Formulaire de consentement pour interventions orthopédiques (prothèses, ostéosynthèses, arthroscopies) avec information sur les risques infectieux et thrombo-emboliques.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 75,
    fieldsJson: F([
      { key: 'nom_patient', label: "Nom complet du patient", type: 'text', required: true },
      { key: 'membre_concerne', label: "Membre / articulation concerné(e)", type: 'text', required: true },
      { key: 'type_acte_ortho', label: "Type d'acte orthopédique", type: 'textarea', required: true },
      { key: 'nom_chirurgien_ortho', label: "Nom du chirurgien orthopédiste", type: 'text', required: true },
      { key: 'date_prevue', label: "Date prévue de l'intervention", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONSENTEMENT ÉCLAIRÉ — CHIRURGIE ORTHOPÉDIQUE</h1>
<p>Je, <strong>{{nom_patient}}</strong>, consens à l'acte orthopédique suivant : {{type_acte_ortho}} portant sur {{membre_concerne}}.</p>
<p>Chirurgien référent : Dr {{nom_chirurgien_ortho}}. Date prévue : {{date_prevue}}.</p>
<p>J'ai été informé(e) des risques infectieux, thromboemboliques et de reprise éventuelle.</p>
<p>Signature : _____________________ Date : _____________</p></div>`
  },
  {
    code: 'chir_consent_pediatrique',
    name: "Consentement Chirurgie Pédiatrique",
    category: 'sante',
    price: 5000,
    priceMax: 15000,
    description: "Formulaire de consentement parental pour interventions chirurgicales chez l'enfant mineur, incluant l'identité des représentants légaux.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 72,
    fieldsJson: F([
      { key: 'nom_enfant', label: "Nom complet de l'enfant", type: 'text', required: true },
      { key: 'date_naissance_enfant', label: "Date de naissance de l'enfant", type: 'date', required: true },
      { key: 'nom_representant_legal', label: "Nom du représentant légal", type: 'text', required: true },
      { key: 'lien_parente', label: "Lien de parenté", type: 'text', required: true },
      { key: 'nature_intervention_ped', label: "Nature de l'intervention", type: 'textarea', required: true },
    ]),
    body: `<div class="doc"><h1>CONSENTEMENT PARENTAL — CHIRURGIE PÉDIATRIQUE</h1>
<p>Je soussigné(e), <strong>{{nom_representant_legal}}</strong>, {{lien_parente}} de l'enfant {{nom_enfant}}, né(e) le {{date_naissance_enfant}}, consens à l'intervention chirurgicale suivante :</p>
<p>{{nature_intervention_ped}}</p>
<p>Je certifie disposer de l'autorité parentale et avoir reçu toutes les informations nécessaires.</p>
<p>Signature du représentant légal : _____________________ Date : _____________</p></div>`
  },
  {
    code: 'chir_consent_gyneco',
    name: "Consentement Chirurgie Gynécologique",
    category: 'sante',
    price: 6000,
    priceMax: 18000,
    description: "Formulaire de consentement pour actes chirurgicaux gynécologiques (hystérectomie, myomectomie, coelioscopie) incluant impact sur la fertilité.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 74,
    fieldsJson: F([
      { key: 'nom_patiente', label: "Nom complet de la patiente", type: 'text', required: true },
      { key: 'date_naissance', label: "Date de naissance", type: 'date', required: true },
      { key: 'acte_gyneco', label: "Acte gynécologique envisagé", type: 'textarea', required: true },
      { key: 'impact_fertilite', label: "Impact sur la fertilité (si applicable)", type: 'textarea', required: false },
      { key: 'nom_gynecologue', label: "Nom du chirurgien gynécologue", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>CONSENTEMENT ÉCLAIRÉ — CHIRURGIE GYNÉCOLOGIQUE</h1>
<p>Patiente : <strong>{{nom_patiente}}</strong>, née le {{date_naissance}}.</p>
<p>Acte envisagé : {{acte_gyneco}}.</p>
<p>Chirurgien : Dr {{nom_gynecologue}}.</p>
<p>Impact sur la fertilité : {{impact_fertilite}}</p>
<p>J'ai reçu toutes les informations et consens librement à cet acte.</p>
<p>Signature : _____________________ Date : _____________</p></div>`
  },
  {
    code: 'chir_consent_urologique',
    name: "Consentement Chirurgie Urologique",
    category: 'sante',
    price: 6000,
    priceMax: 18000,
    description: "Formulaire de consentement pour actes urologiques chirurgicaux (prostatectomie, néphrectomie, cystoscopie), conforme aux recommandations africaines de santé.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'nom_patient', label: "Nom complet du patient", type: 'text', required: true },
      { key: 'date_naissance', label: "Date de naissance", type: 'date', required: true },
      { key: 'acte_urologique', label: "Acte urologique envisagé", type: 'textarea', required: true },
      { key: 'nom_urologue', label: "Nom du chirurgien urologue", type: 'text', required: true },
      { key: 'date_intervention', label: "Date prévue", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONSENTEMENT ÉCLAIRÉ — CHIRURGIE UROLOGIQUE</h1>
<p>Patient : <strong>{{nom_patient}}</strong>, né le {{date_naissance}}.</p>
<p>Acte envisagé : {{acte_urologique}}.</p>
<p>Urologue : Dr {{nom_urologue}}. Date prévue : {{date_intervention}}.</p>
<p>J'ai été informé(e) des risques spécifiques (incontinence, dysfonction érectile, saignement) et y consens.</p>
<p>Signature : _____________________ Date : _____________</p></div>`
  },
  {
    code: 'chir_consent_anesthesie_generale',
    name: "Consentement Anesthésie Générale",
    category: 'sante',
    price: 5000,
    priceMax: 14000,
    description: "Formulaire de consentement éclairé pour anesthésie générale, incluant la consultation pré-anesthésique et les risques d'allergie et de réveil peropératoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 80,
    fieldsJson: F([
      { key: 'nom_patient', label: "Nom complet du patient", type: 'text', required: true },
      { key: 'allergies_connues', label: "Allergies connues", type: 'textarea', required: false },
      { key: 'nom_anesthesiste', label: "Nom de l'anesthésiste-réanimateur", type: 'text', required: true },
      { key: 'type_anesthesie', label: "Type d'anesthésie proposée", type: 'text', required: true },
      { key: 'date_prevue', label: "Date prévue", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONSENTEMENT ÉCLAIRÉ — ANESTHÉSIE GÉNÉRALE</h1>
<p>Patient : <strong>{{nom_patient}}</strong>.</p>
<p>Anesthésiste référent : Dr {{nom_anesthesiste}}.</p>
<p>Type d'anesthésie : {{type_anesthesie}}. Date prévue : {{date_prevue}}.</p>
<p>Allergies déclarées : {{allergies_connues}}.</p>
<p>J'ai reçu les informations sur les risques (allergie, réveil peropératoire, complications respiratoires) et consens à cette anesthésie.</p>
<p>Signature : _____________________ Date : _____________</p></div>`
  },
  {
    code: 'chir_consent_anesthesie_locoregionale',
    name: "Consentement Anesthésie Locorégionale",
    category: 'sante',
    price: 4000,
    priceMax: 12000,
    description: "Formulaire de consentement pour anesthésie locorégionale (péridurale, rachianesthésie, blocs nerveux), incluant risques spécifiques neurologiques.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 71,
    fieldsJson: F([
      { key: 'nom_patient', label: "Nom complet du patient", type: 'text', required: true },
      { key: 'type_alr', label: "Type d'anesthésie locorégionale", type: 'text', required: true },
      { key: 'zone_concernee', label: "Zone anatomique concernée", type: 'text', required: true },
      { key: 'nom_anesthesiste', label: "Nom de l'anesthésiste", type: 'text', required: true },
      { key: 'date_acte', label: "Date de l'acte", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONSENTEMENT ÉCLAIRÉ — ANESTHÉSIE LOCORÉGIONALE</h1>
<p>Patient : <strong>{{nom_patient}}</strong>.</p>
<p>Type d'ALR : {{type_alr}} — Zone : {{zone_concernee}}.</p>
<p>Anesthésiste : Dr {{nom_anesthesiste}}. Date : {{date_acte}}.</p>
<p>J'ai été informé(e) des risques spécifiques (céphalées post-rachianesthésie, toxicité neurologique, échec partiel) et y consens.</p>
<p>Signature : _____________________ Date : _____________</p></div>`
  },
  {
    code: 'chir_cr_operatoire',
    name: "Rapport de Compte Rendu Opératoire",
    category: 'sante',
    price: 7000,
    priceMax: 20000,
    description: "Document standardisé de compte rendu opératoire à compléter par le chirurgien après toute intervention, archivé au dossier médical du patient.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 88,
    fieldsJson: F([
      { key: 'nom_patient', label: "Nom complet du patient", type: 'text', required: true },
      { key: 'date_intervention', label: "Date de l'intervention", type: 'date', required: true },
      { key: 'diagnostic_preoperatoire', label: "Diagnostic préopératoire", type: 'textarea', required: true },
      { key: 'acte_realise', label: "Acte(s) réalisé(s)", type: 'textarea', required: true },
      { key: 'incidents_perop', label: "Incidents peropératoires", type: 'textarea', required: false },
      { key: 'nom_chirurgien', label: "Nom et signature du chirurgien", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>COMPTE RENDU OPÉRATOIRE</h1>
<p><strong>Patient :</strong> {{nom_patient}} — <strong>Date :</strong> {{date_intervention}}</p>
<p><strong>Diagnostic préopératoire :</strong> {{diagnostic_preoperatoire}}</p>
<p><strong>Acte(s) réalisé(s) :</strong> {{acte_realise}}</p>
<p><strong>Incidents peropératoires :</strong> {{incidents_perop}}</p>
<p><strong>Chirurgien :</strong> Dr {{nom_chirurgien}}</p>
<p>Signature : _____________________ Date de dictée : _____________</p></div>`
  },
  {
    code: 'chir_consult_preanesthesique',
    name: "Rapport de Consultation Pré-Anesthésique",
    category: 'sante',
    price: 6000,
    priceMax: 16000,
    description: "Formulaire de consultation pré-anesthésique (CPA) évaluant le score ASA, les antécédents et la stratégie anesthésique, obligatoire avant toute anesthésie.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 82,
    fieldsJson: F([
      { key: 'nom_patient', label: "Nom complet du patient", type: 'text', required: true },
      { key: 'date_cpa', label: "Date de la consultation", type: 'date', required: true },
      { key: 'score_asa', label: "Score ASA (I à V)", type: 'text', required: true },
      { key: 'antecedents', label: "Antécédents médicaux et chirurgicaux", type: 'textarea', required: true },
      { key: 'strategie_anesthesique', label: "Stratégie anesthésique retenue", type: 'textarea', required: true },
    ]),
    body: `<div class="doc"><h1>CONSULTATION PRÉ-ANESTHÉSIQUE</h1>
<p><strong>Patient :</strong> {{nom_patient}} — <strong>Date CPA :</strong> {{date_cpa}}</p>
<p><strong>Score ASA :</strong> {{score_asa}}</p>
<p><strong>Antécédents :</strong> {{antecedents}}</p>
<p><strong>Stratégie anesthésique :</strong> {{strategie_anesthesique}}</p>
<p>Anesthésiste : _____________________ Signature : _____________</p></div>`
  },
  {
    code: 'chir_checklist_oms',
    name: "Check-list Bloc Opératoire (OMS)",
    category: 'sante',
    price: 4000,
    priceMax: 10000,
    description: "Check-list sécurité chirurgicale OMS (Sign-In, Time-Out, Sign-Out) adaptée aux blocs opératoires des établissements africains.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 90,
    fieldsJson: F([
      { key: 'nom_patient', label: "Nom du patient", type: 'text', required: true },
      { key: 'date_intervention', label: "Date de l'intervention", type: 'date', required: true },
      { key: 'type_intervention', label: "Type d'intervention", type: 'text', required: true },
      { key: 'nom_chirurgien_principal', label: "Chirurgien principal", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>CHECK-LIST SÉCURITÉ CHIRURGICALE — OMS</h1>
<p><strong>Patient :</strong> {{nom_patient}} | <strong>Date :</strong> {{date_intervention}}</p>
<p><strong>Intervention :</strong> {{type_intervention}} | <strong>Chirurgien :</strong> Dr {{nom_chirurgien_principal}}</p>
<h2>SIGN-IN (avant induction anesthésique)</h2>
<p>☐ Identité patient confirmée ☐ Site opératoire marqué ☐ Consentement signé ☐ Matériel disponible</p>
<h2>TIME-OUT (avant incision)</h2>
<p>☐ Équipe présentée ☐ Antibioprophylaxie réalisée ☐ Images disponibles ☐ Risques identifiés</p>
<h2>SIGN-OUT (avant fermeture)</h2>
<p>☐ Compresses comptées ☐ Instruments comptés ☐ Pièces étiquetées ☐ CR dicté</p>
<p>Infirmier(ère) de salle : _____________________ Date : _____________</p></div>`
  },
  {
    code: 'chir_protocole_sterilisation',
    name: "Protocole de Stérilisation Bloc Opératoire",
    category: 'sante',
    price: 5000,
    priceMax: 14000,
    description: "Protocole de stérilisation et de traçabilité des instruments chirurgicaux du bloc opératoire, conforme aux normes ISO 17665 et aux recommandations de l'OMS.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'nom_etablissement', label: "Nom de l'établissement", type: 'text', required: true },
      { key: 'date_protocole', label: "Date de mise en vigueur", type: 'date', required: true },
      { key: 'responsable_sterilisation', label: "Responsable de la stérilisation", type: 'text', required: true },
      { key: 'methodes_utilisees', label: "Méthodes de stérilisation utilisées", type: 'textarea', required: true },
    ]),
    body: `<div class="doc"><h1>PROTOCOLE DE STÉRILISATION — BLOC OPÉRATOIRE</h1>
<p><strong>Établissement :</strong> {{nom_etablissement}} | <strong>En vigueur depuis :</strong> {{date_protocole}}</p>
<p><strong>Responsable :</strong> {{responsable_sterilisation}}</p>
<p><strong>Méthodes de stérilisation :</strong> {{methodes_utilisees}}</p>
<h2>Étapes obligatoires</h2>
<p>1. Pré-désinfection immédiate après usage — 2. Nettoyage manuel/automatique — 3. Conditionnement — 4. Stérilisation (autoclave/OE) — 5. Traçabilité et stockage.</p>
<p>Validation : _____________________ Date : _____________</p></div>`
  },
  {
    code: 'chir_contrat_chirurgien_vacataire',
    name: "Contrat de Chirurgien Vacataire",
    category: 'sante',
    price: 10000,
    priceMax: 30000,
    description: "Contrat encadrant l'exercice d'un chirurgien vacataire dans un établissement de santé privé en Côte d'Ivoire, précisant les vacations, honoraires et responsabilités.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 76,
    fieldsJson: F([
      { key: 'nom_chirurgien', label: "Nom et prénom du chirurgien", type: 'text', required: true },
      { key: 'specialite', label: "Spécialité chirurgicale", type: 'text', required: true },
      { key: 'nom_etablissement', label: "Nom de l'établissement d'accueil", type: 'text', required: true },
      { key: 'jours_vacations', label: "Jours et horaires de vacation", type: 'textarea', required: true },
      { key: 'remuneration_vacation', label: "Rémunération par vacation (FCFA)", type: 'text', required: true },
      { key: 'date_debut_contrat', label: "Date de début du contrat", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE CHIRURGIEN VACATAIRE</h1>
<p>Entre l'établissement <strong>{{nom_etablissement}}</strong> et le Dr <strong>{{nom_chirurgien}}</strong>, chirurgien spécialiste en {{specialite}}.</p>
<p><strong>Vacations :</strong> {{jours_vacations}}</p>
<p><strong>Rémunération :</strong> {{remuneration_vacation}} FCFA par vacation, versée mensuellement.</p>
<p><strong>Prise d'effet :</strong> {{date_debut_contrat}}</p>
<p>Le chirurgien conserve sa responsabilité civile professionnelle et doit justifier d'une assurance en cours de validité.</p>
<p>Signatures : _____________________ Date : _____________</p></div>`
  },
  {
    code: 'chir_contrat_anesthesiste',
    name: "Contrat d'Anesthésiste-Réanimateur",
    category: 'sante',
    price: 12000,
    priceMax: 36000,
    description: "Contrat de collaboration ou de salariat pour anesthésiste-réanimateur exerçant en clinique ou hôpital privé, incluant astreintes et gardes.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 73,
    fieldsJson: F([
      { key: 'nom_anesthesiste', label: "Nom et prénom de l'anesthésiste-réanimateur", type: 'text', required: true },
      { key: 'num_ordre', label: "Numéro d'ordre médical", type: 'text', required: true },
      { key: 'nom_etablissement', label: "Nom de l'établissement", type: 'text', required: true },
      { key: 'remuneration_mensuelle', label: "Rémunération mensuelle (FCFA)", type: 'text', required: true },
      { key: 'nombre_gardes', label: "Nombre de gardes / astreintes par mois", type: 'text', required: true },
      { key: 'date_debut', label: "Date de prise de fonction", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT D'ANESTHÉSISTE-RÉANIMATEUR</h1>
<p>Entre <strong>{{nom_etablissement}}</strong> et le Dr <strong>{{nom_anesthesiste}}</strong> (ordre n° {{num_ordre}}).</p>
<p><strong>Rémunération mensuelle :</strong> {{remuneration_mensuelle}} FCFA.</p>
<p><strong>Gardes / Astreintes :</strong> {{nombre_gardes}} par mois.</p>
<p><strong>Prise de fonction :</strong> {{date_debut}}</p>
<p>Le praticien est responsable de la sécurité anesthésique et s'engage à respecter les protocoles de l'établissement.</p>
<p>Signatures des parties : _____________________ Date : _____________</p></div>`
  },
  {
    code: 'chir_contrat_maintenance_equip',
    name: "Contrat de Maintenance Équipement Chirurgical",
    category: 'sante',
    price: 8000,
    priceMax: 24000,
    description: "Contrat de maintenance préventive et curative des équipements chirurgicaux (bistouris électriques, tables opératoires, moniteurs) passé avec un prestataire biomédical.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 67,
    fieldsJson: F([
      { key: 'nom_prestataire', label: "Nom du prestataire biomédical", type: 'text', required: true },
      { key: 'nom_etablissement', label: "Établissement bénéficiaire", type: 'text', required: true },
      { key: 'liste_equipements', label: "Liste des équipements couverts", type: 'textarea', required: true },
      { key: 'periodicite_maintenance', label: "Périodicité de la maintenance préventive", type: 'text', required: true },
      { key: 'cout_annuel', label: "Coût annuel du contrat (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE MAINTENANCE — ÉQUIPEMENTS CHIRURGICAUX</h1>
<p><strong>Prestataire :</strong> {{nom_prestataire}} | <strong>Client :</strong> {{nom_etablissement}}</p>
<p><strong>Équipements couverts :</strong> {{liste_equipements}}</p>
<p><strong>Périodicité préventive :</strong> {{periodicite_maintenance}}</p>
<p><strong>Coût annuel :</strong> {{cout_annuel}} FCFA HT</p>
<p>La maintenance curative est incluse avec délai d'intervention de 48h maximum.</p>
<p>Signatures : _____________________ Date : _____________</p></div>`
  },
  {
    code: 'chir_accord_bloc_externalise',
    name: "Accord de Service de Bloc Opératoire Externalisé",
    category: 'sante',
    price: 15000,
    priceMax: 45000,
    description: "Accord cadre pour la mise à disposition ou la gestion externalisée d'un bloc opératoire complet, incluant personnel, équipements et consommables.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 58,
    fieldsJson: F([
      { key: 'prestataire_bloc', label: "Opérateur du bloc opératoire externalisé", type: 'text', required: true },
      { key: 'etablissement_client', label: "Établissement client", type: 'text', required: true },
      { key: 'nb_salles', label: "Nombre de salles d'opération", type: 'text', required: true },
      { key: 'plages_horaires', label: "Plages horaires d'utilisation", type: 'textarea', required: true },
      { key: 'cout_mensuel', label: "Forfait mensuel (FCFA)", type: 'text', required: true },
      { key: 'date_debut_accord', label: "Date de début de l'accord", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — BLOC OPÉRATOIRE EXTERNALISÉ</h1>
<p><strong>Prestataire :</strong> {{prestataire_bloc}} | <strong>Client :</strong> {{etablissement_client}}</p>
<p><strong>Salles disponibles :</strong> {{nb_salles}} | <strong>Plages :</strong> {{plages_horaires}}</p>
<p><strong>Forfait mensuel :</strong> {{cout_mensuel}} FCFA</p>
<p><strong>Début :</strong> {{date_debut_accord}}</p>
<p>Le prestataire assure la mise à disposition du personnel infirmier de bloc, des équipements et des consommables chirurgicaux.</p>
<p>Signatures : _____________________ Date : _____________</p></div>`
  },
  {
    code: 'chir_rapport_mm',
    name: "Rapport de Morbidité-Mortalité (M&M)",
    category: 'sante',
    price: 7000,
    priceMax: 20000,
    description: "Rapport structuré de la réunion de morbi-mortalité chirurgicale, outil d'amélioration continue de la qualité et de la sécurité des soins au bloc opératoire.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 69,
    fieldsJson: F([
      { key: 'date_reunion', label: "Date de la réunion M&M", type: 'date', required: true },
      { key: 'cas_discutes', label: "Cas discutés (résumé)", type: 'textarea', required: true },
      { key: 'evenements_indesirables', label: "Événements indésirables analysés", type: 'textarea', required: true },
      { key: 'actions_correctives', label: "Actions correctives décidées", type: 'textarea', required: true },
      { key: 'animateur_reunion', label: "Animateur de la réunion", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>RAPPORT DE RÉUNION MORBI-MORTALITÉ (M&M)</h1>
<p><strong>Date :</strong> {{date_reunion}} | <strong>Animateur :</strong> Dr {{animateur_reunion}}</p>
<p><strong>Cas discutés :</strong> {{cas_discutes}}</p>
<p><strong>Événements indésirables :</strong> {{evenements_indesirables}}</p>
<p><strong>Actions correctives :</strong> {{actions_correctives}}</p>
<p>Ce document est confidentiel et réservé à l'usage interne du service de chirurgie.</p></div>`
  },
  {
    code: 'chir_plan_infections_nosocomiales',
    name: "Plan de Lutte Contre les Infections Nosocomiales",
    category: 'sante',
    price: 8000,
    priceMax: 22000,
    description: "Plan annuel de prévention et de contrôle des infections associées aux soins (IAS) pour le bloc opératoire, incluant surveillance épidémiologique et indicateurs.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 63,
    fieldsJson: F([
      { key: 'nom_etablissement', label: "Nom de l'établissement", type: 'text', required: true },
      { key: 'annee_plan', label: "Année du plan", type: 'text', required: true },
      { key: 'objectifs_prevention', label: "Objectifs de prévention", type: 'textarea', required: true },
      { key: 'responsable_hygiene', label: "Responsable hygiène hospitalière", type: 'text', required: true },
      { key: 'indicateurs_suivi', label: "Indicateurs de suivi retenus", type: 'textarea', required: true },
    ]),
    body: `<div class="doc"><h1>PLAN DE LUTTE CONTRE LES INFECTIONS NOSOCOMIALES</h1>
<p><strong>Établissement :</strong> {{nom_etablissement}} | <strong>Année :</strong> {{annee_plan}}</p>
<p><strong>Responsable hygiène :</strong> {{responsable_hygiene}}</p>
<p><strong>Objectifs :</strong> {{objectifs_prevention}}</p>
<p><strong>Indicateurs de suivi :</strong> {{indicateurs_suivi}}</p>
<p>Ce plan est validé par la Direction médicale et le CLIN (Comité de Lutte contre les Infections Nosocomiales).</p>
<p>Signature de la Direction : _____________________ Date : _____________</p></div>`
  },
  {
    code: 'chir_protocole_douleur_postop',
    name: "Protocole de Prise en Charge Douleur Post-Opératoire",
    category: 'sante',
    price: 5000,
    priceMax: 14000,
    description: "Protocole médical de prise en charge multimodale de la douleur postopératoire, incluant paliers analgésiques, voies d'administration et surveillance.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 77,
    fieldsJson: F([
      { key: 'nom_etablissement', label: "Établissement", type: 'text', required: true },
      { key: 'date_validation', label: "Date de validation du protocole", type: 'date', required: true },
      { key: 'classes_analgesiques', label: "Classes analgésiques utilisées", type: 'textarea', required: true },
      { key: 'echelle_douleur', label: "Échelle d'évaluation de la douleur utilisée", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>PROTOCOLE DOULEUR POST-OPÉRATOIRE</h1>
<p><strong>Établissement :</strong> {{nom_etablissement}} | <strong>Validé le :</strong> {{date_validation}}</p>
<p><strong>Échelle d'évaluation :</strong> {{echelle_douleur}}</p>
<p><strong>Analgésiques utilisés :</strong> {{classes_analgesiques}}</p>
<h2>Paliers analgésiques</h2>
<p>Palier 1 : Paracétamol ± AINS — Palier 2 : Tramadol — Palier 3 : Morphine titrée sous surveillance.</p>
<p>Réévaluation toutes les 4 heures par l'infirmier(ère) de salle de réveil.</p>
<p>Validé par : _____________________ Date : _____________</p></div>`
  },
  {
    code: 'chir_accord_ambulatoire',
    name: "Accord de Service de Chirurgie Ambulatoire",
    category: 'sante',
    price: 10000,
    priceMax: 28000,
    description: "Accord encadrant la prise en charge chirurgicale ambulatoire (hôpital de jour), définissant les critères d'éligibilité, les flux patients et les responsabilités.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'nom_etablissement', label: "Nom de l'établissement", type: 'text', required: true },
      { key: 'types_actes_ambulatoires', label: "Types d'actes réalisés en ambulatoire", type: 'textarea', required: true },
      { key: 'criteres_eligibilite', label: "Critères d'éligibilité patient", type: 'textarea', required: true },
      { key: 'responsable_unite', label: "Responsable de l'unité ambulatoire", type: 'text', required: true },
      { key: 'date_ouverture', label: "Date d'ouverture de l'unité", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — CHIRURGIE AMBULATOIRE</h1>
<p><strong>Établissement :</strong> {{nom_etablissement}} | <strong>Ouverture :</strong> {{date_ouverture}}</p>
<p><strong>Responsable :</strong> Dr {{responsable_unite}}</p>
<p><strong>Actes ambulatoires :</strong> {{types_actes_ambulatoires}}</p>
<p><strong>Critères d'éligibilité :</strong> {{criteres_eligibilite}}</p>
<p>Le patient doit être accompagné à la sortie et joignable pendant 24h pour surveillance à distance.</p>
<p>Signatures : _____________________ Date : _____________</p></div>`
  },
  {
    code: 'chir_contrat_endoscopie',
    name: "Contrat de Service d'Endoscopie Diagnostique",
    category: 'sante',
    price: 9000,
    priceMax: 27000,
    description: "Contrat de prestation de service pour la mise à disposition d'une unité d'endoscopie digestive diagnostique (fibroscopie, coloscopie) au sein d'un établissement.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 62,
    fieldsJson: F([
      { key: 'prestataire_endoscopie', label: "Prestataire endoscopie", type: 'text', required: true },
      { key: 'etablissement_client', label: "Établissement client", type: 'text', required: true },
      { key: 'actes_couverts', label: "Actes d'endoscopie couverts", type: 'textarea', required: true },
      { key: 'tarif_acte', label: "Tarif par acte (FCFA)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début du contrat", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE — ENDOSCOPIE DIAGNOSTIQUE</h1>
<p><strong>Prestataire :</strong> {{prestataire_endoscopie}} | <strong>Client :</strong> {{etablissement_client}}</p>
<p><strong>Actes couverts :</strong> {{actes_couverts}}</p>
<p><strong>Tarification :</strong> {{tarif_acte}} FCFA par acte</p>
<p><strong>Début :</strong> {{date_debut}}</p>
<p>Le prestataire fournit les endoscopes, les consommables et le personnel qualifié pour chaque session.</p>
<p>Signatures : _____________________ Date : _____________</p></div>`
  },
  {
    code: 'chir_accord_laser_ophtalmo',
    name: "Accord de Service de Chirurgie Laser Ophtalmologique",
    category: 'sante',
    price: 12000,
    priceMax: 36000,
    description: "Accord de prestation pour la mise à disposition d'un plateau technique de chirurgie laser ophtalmologique (LASIK, LASEK, traitement rétine) en clinique.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'prestataire_laser', label: "Prestataire de chirurgie laser", type: 'text', required: true },
      { key: 'etablissement_client', label: "Clinique cliente", type: 'text', required: true },
      { key: 'types_interventions_laser', label: "Types d'interventions laser proposées", type: 'textarea', required: true },
      { key: 'frequence_sessions', label: "Fréquence des sessions (jours)", type: 'text', required: true },
      { key: 'cout_session', label: "Coût par session (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — CHIRURGIE LASER OPHTALMOLOGIQUE</h1>
<p><strong>Prestataire :</strong> {{prestataire_laser}} | <strong>Clinique :</strong> {{etablissement_client}}</p>
<p><strong>Interventions proposées :</strong> {{types_interventions_laser}}</p>
<p><strong>Sessions :</strong> {{frequence_sessions}} | <strong>Coût :</strong> {{cout_session}} FCFA/session</p>
<p>Le prestataire prend en charge le transport, l'installation et la maintenance du laser et répond de toute défaillance technique.</p>
<p>Signatures : _____________________ Date : _____________</p></div>`
  },
  {
    code: 'chir_contrat_esthetique_reparatrice',
    name: "Contrat de Service de Chirurgie Esthétique et Réparatrice",
    category: 'sante',
    price: 10000,
    priceMax: 30000,
    description: "Contrat encadrant les prestations de chirurgie esthétique et réparatrice (rhinoplastie, mammoplastie, cicatrices) dans une clinique privée ivoirienne.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 64,
    fieldsJson: F([
      { key: 'nom_patient', label: "Nom du patient", type: 'text', required: true },
      { key: 'acte_esthetique', label: "Acte de chirurgie esthétique ou réparatrice", type: 'textarea', required: true },
      { key: 'nom_chirurgien_plasticien', label: "Chirurgien plasticien référent", type: 'text', required: true },
      { key: 'devis_ttc', label: "Devis total TTC (FCFA)", type: 'text', required: true },
      { key: 'date_intervention_prevue', label: "Date d'intervention prévue", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE — CHIRURGIE ESTHÉTIQUE ET RÉPARATRICE</h1>
<p><strong>Patient :</strong> {{nom_patient}} | <strong>Chirurgien :</strong> Dr {{nom_chirurgien_plasticien}}</p>
<p><strong>Acte envisagé :</strong> {{acte_esthetique}}</p>
<p><strong>Date prévue :</strong> {{date_intervention_prevue}}</p>
<p><strong>Devis total TTC :</strong> {{devis_ttc}} FCFA (acompte 50% à la signature)</p>
<p>Le patient reconnaît avoir été informé du caractère non remboursable de ces actes esthétiques et des délais de cicatrisation.</p>
<p>Signatures : _____________________ Date : _____________</p></div>`
  },
  {
    code: 'chir_plan_developpement_activite',
    name: "Plan de Développement Activité Chirurgicale",
    category: 'sante',
    price: 14000,
    priceMax: 42000,
    description: "Plan stratégique pluriannuel de développement de l'activité chirurgicale d'un établissement de santé : nouvelles spécialités, équipements, recrutements, volumes cibles.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 55,
    fieldsJson: F([
      { key: 'nom_etablissement', label: "Nom de l'établissement", type: 'text', required: true },
      { key: 'periode_plan', label: "Période du plan (ex. 2025-2028)", type: 'text', required: true },
      { key: 'specialites_cibles', label: "Nouvelles spécialités chirurgicales visées", type: 'textarea', required: true },
      { key: 'investissements_prevus', label: "Investissements prévus (équipements, travaux)", type: 'textarea', required: true },
      { key: 'volume_actes_cible', label: "Volume d'actes cible annuel", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT — ACTIVITÉ CHIRURGICALE</h1>
<p><strong>Établissement :</strong> {{nom_etablissement}} | <strong>Période :</strong> {{periode_plan}}</p>
<p><strong>Spécialités visées :</strong> {{specialites_cibles}}</p>
<p><strong>Investissements :</strong> {{investissements_prevus}}</p>
<p><strong>Volume cible annuel :</strong> {{volume_actes_cible}} actes chirurgicaux</p>
<p>Ce plan est soumis à l'approbation du Conseil d'Administration et fait l'objet d'un suivi trimestriel.</p>
<p>Directeur médical : _____________________ Date : _____________</p></div>`
  },
  {
    code: 'chir_rapport_qualite_securite',
    name: "Rapport Qualité et Sécurité des Soins Chirurgicaux",
    category: 'sante',
    price: 9000,
    priceMax: 27000,
    description: "Rapport périodique d'évaluation de la qualité et de la sécurité des soins chirurgicaux incluant indicateurs de résultats, taux de complications et plans d'action.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 66,
    fieldsJson: F([
      { key: 'nom_etablissement', label: "Nom de l'établissement", type: 'text', required: true },
      { key: 'periode_rapport', label: "Période couverte par le rapport", type: 'text', required: true },
      { key: 'nb_interventions', label: "Nombre total d'interventions réalisées", type: 'text', required: true },
      { key: 'taux_complications', label: "Taux de complications observé (%)", type: 'text', required: true },
      { key: 'actions_amelioration', label: "Actions d'amélioration engagées", type: 'textarea', required: true },
    ]),
    body: `<div class="doc"><h1>RAPPORT QUALITÉ ET SÉCURITÉ DES SOINS CHIRURGICAUX</h1>
<p><strong>Établissement :</strong> {{nom_etablissement}} | <strong>Période :</strong> {{periode_rapport}}</p>
<p><strong>Interventions réalisées :</strong> {{nb_interventions}}</p>
<p><strong>Taux de complications :</strong> {{taux_complications}}%</p>
<p><strong>Actions d'amélioration :</strong> {{actions_amelioration}}</p>
<p>Ce rapport est présenté à la Commission Médicale d'Établissement (CME) et archivé pour accréditation.</p>
<p>Responsable qualité : _____________________ Date : _____________</p></div>`
  },

  // ──────────────────────────────────────────────
  // BLOC 2 — HÔPITAL / CLINIQUE PRIVÉE (hosp_)
  // ──────────────────────────────────────────────
  {
    code: 'hosp_contrat_direction_medicale',
    name: "Contrat de Direction Médicale Clinique Privée",
    category: 'sante',
    price: 15000,
    priceMax: 45000,
    description: "Contrat nommant et encadrant l'exercice du Directeur Médical d'une clinique privée en Côte d'Ivoire : missions, pouvoirs, rémunération et conditions de rupture.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 72,
    fieldsJson: F([
      { key: 'nom_directeur_medical', label: "Nom du Directeur Médical", type: 'text', required: true },
      { key: 'nom_clinique', label: "Nom de la clinique", type: 'text', required: true },
      { key: 'remuneration_mensuelle', label: "Rémunération mensuelle brute (FCFA)", type: 'text', required: true },
      { key: 'date_prise_fonction', label: "Date de prise de fonction", type: 'date', required: true },
      { key: 'missions_principales', label: "Missions principales", type: 'textarea', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE DIRECTION MÉDICALE</h1>
<p>La clinique <strong>{{nom_clinique}}</strong> nomme le Dr <strong>{{nom_directeur_medical}}</strong> en qualité de Directeur Médical.</p>
<p><strong>Missions :</strong> {{missions_principales}}</p>
<p><strong>Rémunération mensuelle brute :</strong> {{remuneration_mensuelle}} FCFA</p>
<p><strong>Prise de fonction :</strong> {{date_prise_fonction}}</p>
<p>Ce contrat est régi par le Code du Travail ivoirien et les dispositions spécifiques aux professions médicales.</p>
<p>Signatures : _____________________ Date : _____________</p></div>`
  },
  {
    code: 'hosp_contrat_praticien_liberal',
    name: "Contrat de Praticien Libéral en Clinique",
    category: 'sante',
    price: 12000,
    priceMax: 35000,
    description: "Contrat d'exercice libéral à titre individuel au sein d'une clinique privée ivoirienne, précisant les conditions d'utilisation des plateaux techniques et le partage des frais.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 78,
    fieldsJson: F([
      { key: 'nom_praticien', label: "Nom et prénom du praticien", type: 'text', required: true },
      { key: 'specialite_medicale', label: "Spécialité médicale", type: 'text', required: true },
      { key: 'nom_clinique', label: "Nom de la clinique", type: 'text', required: true },
      { key: 'redevance_mensuelle', label: "Redevance mensuelle (FCFA)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début d'exercice", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT D'EXERCICE LIBÉRAL EN CLINIQUE</h1>
<p>Entre la clinique <strong>{{nom_clinique}}</strong> et le Dr <strong>{{nom_praticien}}</strong>, spécialiste en {{specialite_medicale}}.</p>
<p>Le praticien exerce à titre libéral et verse une redevance mensuelle de <strong>{{redevance_mensuelle}} FCFA</strong> pour l'utilisation des locaux et équipements.</p>
<p><strong>Début d'exercice :</strong> {{date_debut}}</p>
<p>Le praticien conserve son entière indépendance professionnelle et sa patientèle propre.</p>
<p>Signatures : _____________________ Date : _____________</p></div>`
  },
  {
    code: 'hosp_accord_partage_honoraires',
    name: "Accord de Partage d'Honoraires Médicaux",
    category: 'sante',
    price: 8000,
    priceMax: 22000,
    description: "Accord de répartition des honoraires médicaux entre praticiens d'une même spécialité exerçant en groupe au sein d'une clinique privée ivoirienne.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'noms_praticiens', label: "Noms des praticiens associés", type: 'textarea', required: true },
      { key: 'nom_clinique', label: "Clinique d'exercice", type: 'text', required: true },
      { key: 'cle_repartition', label: "Clé de répartition des honoraires (%)", type: 'textarea', required: true },
      { key: 'date_accord', label: "Date de l'accord", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTAGE D'HONORAIRES MÉDICAUX</h1>
<p><strong>Praticiens :</strong> {{noms_praticiens}}</p>
<p><strong>Clinique :</strong> {{nom_clinique}}</p>
<p><strong>Clé de répartition :</strong> {{cle_repartition}}</p>
<p><strong>Date :</strong> {{date_accord}}</p>
<p>Les honoraires communs sont perçus sur un compte joint et répartis mensuellement selon la clé définie.</p>
<p>Signatures des praticiens : _____________________ Date : _____________</p></div>`
  },
  {
    code: 'hosp_contrat_radiologie',
    name: "Contrat de Service de Radiologie (Imagerie Médicale)",
    category: 'sante',
    price: 12000,
    priceMax: 36000,
    description: "Contrat de prestation pour la mise à disposition d'une unité d'imagerie médicale (radiographie, échographie, scanner) au sein d'une clinique privée.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 74,
    fieldsJson: F([
      { key: 'prestataire_imagerie', label: "Prestataire d'imagerie médicale", type: 'text', required: true },
      { key: 'nom_clinique', label: "Clinique cliente", type: 'text', required: true },
      { key: 'equipements_mis_a_disposition', label: "Équipements mis à disposition", type: 'textarea', required: true },
      { key: 'tarifs_actes', label: "Grille tarifaire des actes (FCFA)", type: 'textarea', required: true },
      { key: 'date_debut_contrat', label: "Date de début du contrat", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE — RADIOLOGIE ET IMAGERIE MÉDICALE</h1>
<p><strong>Prestataire :</strong> {{prestataire_imagerie}} | <strong>Clinique :</strong> {{nom_clinique}}</p>
<p><strong>Équipements :</strong> {{equipements_mis_a_disposition}}</p>
<p><strong>Tarification :</strong> {{tarifs_actes}}</p>
<p><strong>Début :</strong> {{date_debut_contrat}}</p>
<p>Le prestataire fournit radiologue qualifié, personnel paramédical et assure la maintenance des équipements.</p>
<p>Signatures : _____________________ Date : _____________</p></div>`
  },
  {
    code: 'hosp_contrat_biologie_medicale',
    name: "Contrat de Service de Biologie Médicale (Laboratoire)",
    category: 'sante',
    price: 10000,
    priceMax: 30000,
    description: "Contrat de sous-traitance ou de mise à disposition d'un laboratoire de biologie médicale pour une clinique privée ivoirienne, incluant délais de rendu des résultats.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 76,
    fieldsJson: F([
      { key: 'nom_laboratoire', label: "Nom du laboratoire prestataire", type: 'text', required: true },
      { key: 'nom_clinique', label: "Clinique cliente", type: 'text', required: true },
      { key: 'analyses_couvertes', label: "Catégories d'analyses couvertes", type: 'textarea', required: true },
      { key: 'delai_rendu_resultats', label: "Délai de rendu des résultats", type: 'text', required: true },
      { key: 'remuneration_mensuelle', label: "Rémunération mensuelle (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE — BIOLOGIE MÉDICALE</h1>
<p><strong>Laboratoire :</strong> {{nom_laboratoire}} | <strong>Clinique :</strong> {{nom_clinique}}</p>
<p><strong>Analyses couvertes :</strong> {{analyses_couvertes}}</p>
<p><strong>Délai de rendu :</strong> {{delai_rendu_resultats}}</p>
<p><strong>Rémunération mensuelle :</strong> {{remuneration_mensuelle}} FCFA</p>
<p>Les résultats sont transmis de façon sécurisée et le biologiste est joignable pour interprétation critique.</p>
<p>Signatures : _____________________ Date : _____________</p></div>`
  },
  {
    code: 'hosp_contrat_anatomopathologie',
    name: "Contrat de Service d'Anatomopathologie",
    category: 'sante',
    price: 10000,
    priceMax: 30000,
    description: "Contrat de sous-traitance pour analyses anatomopathologiques (biopsies, cytologies, pièces opératoires) entre une clinique privée et un laboratoire spécialisé.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'nom_labo_anathopatho', label: "Laboratoire d'anatomopathologie", type: 'text', required: true },
      { key: 'nom_clinique', label: "Clinique cliente", type: 'text', required: true },
      { key: 'types_prelevement', label: "Types de prélèvements pris en charge", type: 'textarea', required: true },
      { key: 'delai_rapport', label: "Délai de rendu du rapport (jours ouvrables)", type: 'text', required: true },
      { key: 'tarif_analyse', label: "Tarif moyen par analyse (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE — ANATOMOPATHOLOGIE</h1>
<p><strong>Laboratoire :</strong> {{nom_labo_anathopatho}} | <strong>Clinique :</strong> {{nom_clinique}}</p>
<p><strong>Prélèvements pris en charge :</strong> {{types_prelevement}}</p>
<p><strong>Délai de rendu :</strong> {{delai_rapport}} jours ouvrables</p>
<p><strong>Tarif moyen :</strong> {{tarif_analyse}} FCFA par analyse</p>
<p>Les prélèvements sont fixés dans le formol et acheminés sous froid au laboratoire dans les 2h suivant le prélèvement.</p>
<p>Signatures : _____________________ Date : _____________</p></div>`
  },
  {
    code: 'hosp_accord_dialyse',
    name: "Accord de Service de Dialyse Rénale",
    category: 'sante',
    price: 14000,
    priceMax: 42000,
    description: "Accord encadrant la mise à disposition d'une unité de dialyse rénale (hémodialyse, dialyse péritonéale) dans une clinique privée en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 63,
    fieldsJson: F([
      { key: 'prestataire_dialyse', label: "Prestataire de dialyse rénale", type: 'text', required: true },
      { key: 'nom_clinique', label: "Clinique cliente", type: 'text', required: true },
      { key: 'nb_postes_dialyse', label: "Nombre de postes de dialyse", type: 'text', required: true },
      { key: 'seances_par_semaine', label: "Nombre de séances par semaine", type: 'text', required: true },
      { key: 'cout_seance', label: "Coût par séance (FCFA)", type: 'text', required: true },
      { key: 'date_debut_service', label: "Date de démarrage du service", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — DIALYSE RÉNALE</h1>
<p><strong>Prestataire :</strong> {{prestataire_dialyse}} | <strong>Clinique :</strong> {{nom_clinique}}</p>
<p><strong>Postes de dialyse :</strong> {{nb_postes_dialyse}} | <strong>Séances/semaine :</strong> {{seances_par_semaine}}</p>
<p><strong>Coût par séance :</strong> {{cout_seance}} FCFA</p>
<p><strong>Démarrage :</strong> {{date_debut_service}}</p>
<p>Le prestataire assure la fourniture des consommables, la maintenance des générateurs et la formation du personnel infirmier.</p>
<p>Signatures : _____________________ Date : _____________</p></div>`
  },
  {
    code: 'hosp_contrat_kinesitherapie',
    name: "Contrat de Service de Kinésithérapie",
    category: 'sante',
    price: 7000,
    priceMax: 20000,
    description: "Contrat de prestation de kinésithérapie (rééducation fonctionnelle, respiratoire, neurologique) au sein d'une clinique ou d'un hôpital privé ivoirien.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'nom_kinesitherapeute', label: "Nom du kinésithérapeute", type: 'text', required: true },
      { key: 'nom_etablissement', label: "Établissement d'exercice", type: 'text', required: true },
      { key: 'types_reeducation', label: "Types de rééducation proposés", type: 'textarea', required: true },
      { key: 'jours_presence', label: "Jours et horaires de présence", type: 'text', required: true },
      { key: 'tarif_seance', label: "Tarif par séance (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE — KINÉSITHÉRAPIE</h1>
<p><strong>Kinésithérapeute :</strong> {{nom_kinesitherapeute}} | <strong>Établissement :</strong> {{nom_etablissement}}</p>
<p><strong>Types de rééducation :</strong> {{types_reeducation}}</p>
<p><strong>Présence :</strong> {{jours_presence}} | <strong>Tarif séance :</strong> {{tarif_seance}} FCFA</p>
<p>Le kinésithérapeute élabore un bilan initial pour chaque patient et tient un dossier de rééducation archivé.</p>
<p>Signatures : _____________________ Date : _____________</p></div>`
  },
  {
    code: 'hosp_contrat_nutrition_clinique',
    name: "Contrat de Service de Nutrition Clinique",
    category: 'sante',
    price: 7000,
    priceMax: 18000,
    description: "Contrat de prestation de nutrition clinique (diététique hospitalière, nutrition entérale et parentérale) pour un établissement de santé privé.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 58,
    fieldsJson: F([
      { key: 'nom_nutritionniste', label: "Nom du nutritionniste clinicien", type: 'text', required: true },
      { key: 'nom_etablissement', label: "Établissement de santé", type: 'text', required: true },
      { key: 'types_prise_en_charge', label: "Types de prise en charge nutritionnelle", type: 'textarea', required: true },
      { key: 'remuneration', label: "Rémunération mensuelle (FCFA)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE — NUTRITION CLINIQUE</h1>
<p><strong>Nutritionniste :</strong> {{nom_nutritionniste}} | <strong>Établissement :</strong> {{nom_etablissement}}</p>
<p><strong>Prestations :</strong> {{types_prise_en_charge}}</p>
<p><strong>Rémunération :</strong> {{remuneration}} FCFA/mois | <strong>Début :</strong> {{date_debut}}</p>
<p>Le nutritionniste participe aux staffs pluridisciplinaires et rédige des prescriptions diététiques individualisées.</p>
<p>Signatures : _____________________ Date : _____________</p></div>`
  },
  {
    code: 'hosp_accord_ergotherapie',
    name: "Accord de Service d'Ergothérapie",
    category: 'sante',
    price: 6000,
    priceMax: 16000,
    description: "Accord de prestation d'ergothérapie pour la rééducation à l'autonomie des patients hospitalisés (AVC, traumatismes, maladies neurologiques).",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 52,
    fieldsJson: F([
      { key: 'nom_ergotherapeute', label: "Nom de l'ergothérapeute", type: 'text', required: true },
      { key: 'nom_etablissement', label: "Établissement d'exercice", type: 'text', required: true },
      { key: 'pathologies_cibles', label: "Pathologies ciblées", type: 'textarea', required: true },
      { key: 'volume_seances_semaine', label: "Volume de séances par semaine", type: 'text', required: true },
      { key: 'remuneration_mensuelle', label: "Rémunération mensuelle (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — ERGOTHÉRAPIE</h1>
<p><strong>Ergothérapeute :</strong> {{nom_ergotherapeute}} | <strong>Établissement :</strong> {{nom_etablissement}}</p>
<p><strong>Pathologies ciblées :</strong> {{pathologies_cibles}}</p>
<p><strong>Volume :</strong> {{volume_seances_semaine}} séances/semaine | <strong>Rémunération :</strong> {{remuneration_mensuelle}} FCFA/mois</p>
<p>L'ergothérapeute travaille en coordination avec l'équipe de rééducation pluridisciplinaire.</p>
<p>Signatures : _____________________ Date : _____________</p></div>`
  },
  {
    code: 'hosp_contrat_repas_patients',
    name: "Contrat de Prestataire de Repas Patients (Cuisine Hospitalière)",
    category: 'sante',
    price: 8000,
    priceMax: 24000,
    description: "Contrat de restauration hospitalière pour la fourniture de repas adaptés aux patients hospitalisés (régimes thérapeutiques, normes HACCP), passé avec un traiteur agréé.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 67,
    fieldsJson: F([
      { key: 'nom_prestataire_repas', label: "Nom du prestataire de restauration", type: 'text', required: true },
      { key: 'nom_etablissement', label: "Établissement de santé", type: 'text', required: true },
      { key: 'nb_repas_jour', label: "Nombre de repas par jour (couverts estimés)", type: 'text', required: true },
      { key: 'cout_repas_patient', label: "Coût unitaire par repas/patient (FCFA)", type: 'text', required: true },
      { key: 'regimes_speciaux', label: "Régimes spéciaux assurés", type: 'textarea', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE RESTAURATION HOSPITALIÈRE</h1>
<p><strong>Prestataire :</strong> {{nom_prestataire_repas}} | <strong>Établissement :</strong> {{nom_etablissement}}</p>
<p><strong>Couverture quotidienne :</strong> {{nb_repas_jour}} repas | <strong>Coût unitaire :</strong> {{cout_repas_patient}} FCFA</p>
<p><strong>Régimes spéciaux assurés :</strong> {{regimes_speciaux}}</p>
<p>Le prestataire respecte les normes HACCP et soumet ses menus hebdomadaires à validation de la diététicienne.</p>
<p>Signatures : _____________________ Date : _____________</p></div>`
  },
  {
    code: 'hosp_accord_buanderie',
    name: "Accord de Service de Buanderie Hospitalière",
    category: 'sante',
    price: 6000,
    priceMax: 16000,
    description: "Accord de prestation pour la collecte, le lavage, la désinfection thermique et le retour du linge hospitalier (draps, blouses, tenues de bloc) dans une clinique privée.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 55,
    fieldsJson: F([
      { key: 'nom_prestataire_buanderie', label: "Prestataire de buanderie", type: 'text', required: true },
      { key: 'nom_etablissement', label: "Établissement client", type: 'text', required: true },
      { key: 'volume_linge_semaine', label: "Volume de linge estimé par semaine (kg)", type: 'text', required: true },
      { key: 'cout_kg', label: "Coût au kilogramme (FCFA)", type: 'text', required: true },
      { key: 'frequence_collecte', label: "Fréquence de collecte", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — BUANDERIE HOSPITALIÈRE</h1>
<p><strong>Prestataire :</strong> {{nom_prestataire_buanderie}} | <strong>Établissement :</strong> {{nom_etablissement}}</p>
<p><strong>Volume estimé :</strong> {{volume_linge_semaine}} kg/semaine | <strong>Tarif :</strong> {{cout_kg}} FCFA/kg</p>
<p><strong>Collecte :</strong> {{frequence_collecte}}</p>
<p>Le linge infecté est collecté séparément en sacs hydrosolubles conformément aux règles d'hygiène hospitalière.</p>
<p>Signatures : _____________________ Date : _____________</p></div>`
  },
  {
    code: 'hosp_contrat_bionettoiement',
    name: "Contrat de Prestataire de Nettoyage Hôpital (Bionettoiement)",
    category: 'sante',
    price: 7000,
    priceMax: 20000,
    description: "Contrat de bionettoiement hospitalier pour la désinfection des locaux de soins, blocs opératoires et zones à risque d'une clinique privée ivoirienne.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'nom_prestataire_nettoyage', label: "Prestataire de bionettoiement", type: 'text', required: true },
      { key: 'nom_etablissement', label: "Établissement client", type: 'text', required: true },
      { key: 'zones_couvertes', label: "Zones couvertes par le contrat", type: 'textarea', required: true },
      { key: 'frequence_passage', label: "Fréquence et horaires de passage", type: 'text', required: true },
      { key: 'montant_mensuel', label: "Montant mensuel du contrat (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE BIONETTOIEMENT HOSPITALIER</h1>
<p><strong>Prestataire :</strong> {{nom_prestataire_nettoyage}} | <strong>Établissement :</strong> {{nom_etablissement}}</p>
<p><strong>Zones couvertes :</strong> {{zones_couvertes}}</p>
<p><strong>Passages :</strong> {{frequence_passage}} | <strong>Forfait mensuel :</strong> {{montant_mensuel}} FCFA</p>
<p>Le personnel de nettoyage est formé aux techniques de bionettoiement et utilise des produits biocides homologués.</p>
<p>Signatures : _____________________ Date : _____________</p></div>`
  },
  {
    code: 'hosp_accord_gardiennage',
    name: "Accord de Service de Gardiennage Hôpital",
    category: 'sante',
    price: 6000,
    priceMax: 16000,
    description: "Accord de prestation de gardiennage et de sécurité physique pour une clinique ou un hôpital privé en Côte d'Ivoire, incluant surveillance 24h/24.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'societe_gardiennage', label: "Société de gardiennage", type: 'text', required: true },
      { key: 'nom_etablissement', label: "Établissement client", type: 'text', required: true },
      { key: 'nb_agents', label: "Nombre d'agents de sécurité", type: 'text', required: true },
      { key: 'plages_horaires_garde', label: "Plages horaires de garde", type: 'text', required: true },
      { key: 'montant_mensuel', label: "Montant mensuel (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — GARDIENNAGE HOSPITALIER</h1>
<p><strong>Société :</strong> {{societe_gardiennage}} | <strong>Établissement :</strong> {{nom_etablissement}}</p>
<p><strong>Agents :</strong> {{nb_agents}} | <strong>Horaires :</strong> {{plages_horaires_garde}}</p>
<p><strong>Forfait mensuel :</strong> {{montant_mensuel}} FCFA</p>
<p>Les agents sont formés aux procédures hospitalières (confidentialité, gestion des conflits, secours de premiers soins).</p>
<p>Signatures : _____________________ Date : _____________</p></div>`
  },
  {
    code: 'hosp_contrat_maintenance_biomedicale',
    name: "Contrat de Maintenance Équipements Biomédicaux",
    category: 'sante',
    price: 10000,
    priceMax: 30000,
    description: "Contrat global de maintenance préventive et curative des équipements biomédicaux (moniteurs, défibrillateurs, respirateurs) d'une clinique privée.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 71,
    fieldsJson: F([
      { key: 'nom_prestataire_bio', label: "Prestataire biomédical", type: 'text', required: true },
      { key: 'nom_etablissement', label: "Établissement client", type: 'text', required: true },
      { key: 'inventaire_equipements', label: "Inventaire des équipements couverts", type: 'textarea', required: true },
      { key: 'visite_preventive_annuelle', label: "Nombre de visites préventives annuelles", type: 'text', required: true },
      { key: 'cout_contrat_annuel', label: "Coût annuel du contrat (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE MAINTENANCE — ÉQUIPEMENTS BIOMÉDICAUX</h1>
<p><strong>Prestataire :</strong> {{nom_prestataire_bio}} | <strong>Établissement :</strong> {{nom_etablissement}}</p>
<p><strong>Équipements couverts :</strong> {{inventaire_equipements}}</p>
<p><strong>Visites préventives :</strong> {{visite_preventive_annuelle}} par an | <strong>Coût annuel :</strong> {{cout_contrat_annuel}} FCFA</p>
<p>La maintenance curative est assurée avec intervention sous 24h et fourniture de pièces certifiées.</p>
<p>Signatures : _____________________ Date : _____________</p></div>`
  },
  {
    code: 'hosp_accord_sterilisation_centrale',
    name: "Accord de Service de Stérilisation Centrale",
    category: 'sante',
    price: 9000,
    priceMax: 26000,
    description: "Accord de prestation pour la stérilisation centralisée des instruments médicaux réutilisables d'une clinique privée par un prestataire externe agréé.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 57,
    fieldsJson: F([
      { key: 'prestataire_sterilisation', label: "Prestataire de stérilisation centrale", type: 'text', required: true },
      { key: 'nom_etablissement', label: "Établissement client", type: 'text', required: true },
      { key: 'volume_instruments_semaine', label: "Volume d'instruments par semaine (unités)", type: 'text', required: true },
      { key: 'delai_retour', label: "Délai de retour des instruments stérilisés (heures)", type: 'text', required: true },
      { key: 'cout_mensuel', label: "Coût mensuel (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — STÉRILISATION CENTRALE EXTERNALISÉE</h1>
<p><strong>Prestataire :</strong> {{prestataire_sterilisation}} | <strong>Établissement :</strong> {{nom_etablissement}}</p>
<p><strong>Volume hebdomadaire :</strong> {{volume_instruments_semaine}} unités | <strong>Délai retour :</strong> {{delai_retour}}h</p>
<p><strong>Coût mensuel :</strong> {{cout_mensuel}} FCFA</p>
<p>Chaque lot est traçable par numéro de lot et fiche de stérilisation conservée 5 ans.</p>
<p>Signatures : _____________________ Date : _____________</p></div>`
  },
  {
    code: 'hosp_plan_securite_incendie',
    name: "Plan de Sécurité Incendie Hôpital",
    category: 'sante',
    price: 7000,
    priceMax: 20000,
    description: "Plan de prévention et de gestion du risque incendie pour un établissement de santé privé, conformément aux normes ivoiriennes de sécurité des ERP (Établissements Recevant du Public).",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 64,
    fieldsJson: F([
      { key: 'nom_etablissement', label: "Nom de l'établissement", type: 'text', required: true },
      { key: 'responsable_securite', label: "Responsable sécurité incendie", type: 'text', required: true },
      { key: 'date_derniere_revision', label: "Date de dernière révision du plan", type: 'date', required: true },
      { key: 'points_rassemblement', label: "Points de rassemblement identifiés", type: 'textarea', required: true },
      { key: 'frequence_exercices', label: "Fréquence des exercices d'évacuation", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>PLAN DE SÉCURITÉ INCENDIE — ÉTABLISSEMENT DE SANTÉ</h1>
<p><strong>Établissement :</strong> {{nom_etablissement}} | <strong>Révisé le :</strong> {{date_derniere_revision}}</p>
<p><strong>Responsable sécurité :</strong> {{responsable_securite}}</p>
<p><strong>Points de rassemblement :</strong> {{points_rassemblement}}</p>
<p><strong>Exercices d'évacuation :</strong> {{frequence_exercices}}</p>
<p>En cas d'alerte : couper les fluides médicaux, évacuer les patients valides, appeler le 180 (pompiers), ne pas utiliser les ascenseurs.</p>
<p>Validation : _____________________ Date : _____________</p></div>`
  },
  {
    code: 'hosp_plan_dechets_medicaux',
    name: "Plan de Gestion des Déchets Médicaux",
    category: 'sante',
    price: 7000,
    priceMax: 20000,
    description: "Plan de gestion des déchets d'activités de soins à risques infectieux (DASRI) et des déchets chimiques d'une clinique privée, conforme à la réglementation ivoirienne.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 66,
    fieldsJson: F([
      { key: 'nom_etablissement', label: "Nom de l'établissement", type: 'text', required: true },
      { key: 'responsable_dechets', label: "Responsable gestion des déchets", type: 'text', required: true },
      { key: 'volume_dasri_mensuel', label: "Volume mensuel de DASRI estimé (kg)", type: 'text', required: true },
      { key: 'prestataire_elimination', label: "Prestataire d'élimination agréé", type: 'text', required: true },
      { key: 'date_validation', label: "Date de validation du plan", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>PLAN DE GESTION DES DÉCHETS MÉDICAUX (DASRI)</h1>
<p><strong>Établissement :</strong> {{nom_etablissement}} | <strong>Validé le :</strong> {{date_validation}}</p>
<p><strong>Responsable :</strong> {{responsable_dechets}}</p>
<p><strong>Volume DASRI mensuel :</strong> {{volume_dasri_mensuel}} kg | <strong>Prestataire :</strong> {{prestataire_elimination}}</p>
<h2>Filières de tri</h2>
<p>Sac jaune : DASRI — Sac rouge : déchets anatomiques — Boîte jaune : piquants/coupants — Sac noir : déchets assimilables aux ordures ménagères.</p>
<p>Signature du Directeur : _____________________ Date : _____________</p></div>`
  },
  {
    code: 'hosp_accord_conventionnement_assurance',
    name: "Accord de Conventionnement avec Assurance Maladie",
    category: 'sante',
    price: 12000,
    priceMax: 36000,
    description: "Convention de tiers-payant entre une clinique privée ivoirienne et une compagnie d'assurance maladie ou une mutuelle, précisant les tarifs, la facturation et les délais de paiement.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 80,
    fieldsJson: F([
      { key: 'nom_assureur', label: "Nom de la compagnie d'assurance / mutuelle", type: 'text', required: true },
      { key: 'nom_clinique', label: "Nom de la clinique", type: 'text', required: true },
      { key: 'grille_tarifaire', label: "Grille tarifaire conventionnée", type: 'textarea', required: true },
      { key: 'delai_paiement_jours', label: "Délai de paiement des factures (jours)", type: 'text', required: true },
      { key: 'date_entree_vigueur', label: "Date d'entrée en vigueur", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONVENTION DE TIERS-PAYANT — ASSURANCE MALADIE</h1>
<p><strong>Assureur :</strong> {{nom_assureur}} | <strong>Clinique :</strong> {{nom_clinique}}</p>
<p><strong>Tarification conventionnée :</strong> {{grille_tarifaire}}</p>
<p><strong>Délai de paiement :</strong> {{delai_paiement_jours}} jours à compter de la réception de la facture.</p>
<p><strong>En vigueur depuis :</strong> {{date_entree_vigueur}}</p>
<p>La clinique s'engage à ne pas facturer de dépassement d'honoraires aux assurés couverts par la présente convention.</p>
<p>Signatures : _____________________ Date : _____________</p></div>`
  },
  {
    code: 'hosp_contrat_pompes_funebres',
    name: "Contrat de Service de Pompes Funèbres Hospitalières",
    category: 'sante',
    price: 6000,
    priceMax: 16000,
    description: "Contrat de prestation avec une société de pompes funèbres agréée pour la prise en charge des corps de patients décédés dans un établissement de santé privé.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 53,
    fieldsJson: F([
      { key: 'societe_pf', label: "Société de pompes funèbres", type: 'text', required: true },
      { key: 'nom_etablissement', label: "Établissement de santé", type: 'text', required: true },
      { key: 'prestations_incluses', label: "Prestations incluses dans le contrat", type: 'textarea', required: true },
      { key: 'delai_intervention', label: "Délai d'intervention après décès (heures)", type: 'text', required: true },
      { key: 'tarif_base', label: "Tarif de base (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE — POMPES FUNÈBRES HOSPITALIÈRES</h1>
<p><strong>Prestataire :</strong> {{societe_pf}} | <strong>Établissement :</strong> {{nom_etablissement}}</p>
<p><strong>Prestations :</strong> {{prestations_incluses}}</p>
<p><strong>Délai d'intervention :</strong> {{delai_intervention}}h | <strong>Tarif de base :</strong> {{tarif_base}} FCFA</p>
<p>La société s'engage à intervenir avec discrétion et à respecter les convictions religieuses et culturelles des familles.</p>
<p>Signatures : _____________________ Date : _____________</p></div>`
  },
  {
    code: 'hosp_rapport_performance_clinique',
    name: "Rapport de Performance Clinique (Tableaux de Bord)",
    category: 'sante',
    price: 10000,
    priceMax: 28000,
    description: "Rapport périodique de performance clinique d'une clinique privée incluant indicateurs d'activité, de qualité des soins, financiers et de satisfaction patient.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 73,
    fieldsJson: F([
      { key: 'nom_clinique', label: "Nom de la clinique", type: 'text', required: true },
      { key: 'periode_rapport', label: "Période du rapport", type: 'text', required: true },
      { key: 'taux_occupation', label: "Taux d'occupation des lits (%)", type: 'text', required: true },
      { key: 'duree_moyenne_sejour', label: "Durée moyenne de séjour (jours)", type: 'text', required: true },
      { key: 'satisfaction_patient', label: "Score de satisfaction patient (/10)", type: 'text', required: true },
      { key: 'chiffre_affaires', label: "Chiffre d'affaires de la période (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE CLINIQUE</h1>
<p><strong>Clinique :</strong> {{nom_clinique}} | <strong>Période :</strong> {{periode_rapport}}</p>
<p><strong>Taux d'occupation :</strong> {{taux_occupation}}% | <strong>DMS :</strong> {{duree_moyenne_sejour}} jours</p>
<p><strong>Satisfaction patient :</strong> {{satisfaction_patient}}/10</p>
<p><strong>Chiffre d'affaires :</strong> {{chiffre_affaires}} FCFA</p>
<p>Ce tableau de bord est présenté mensuellement au Conseil de Direction pour pilotage stratégique.</p>
<p>Directeur Général : _____________________ Date : _____________</p></div>`
  },
  {
    code: 'hosp_plan_developpement_clinique',
    name: "Plan de Développement Clinique Privée",
    category: 'sante',
    price: 15000,
    priceMax: 45000,
    description: "Plan stratégique de développement d'une clinique privée ivoirienne : extension de capacité, nouvelles spécialités, marketing médical, ressources humaines et investissements.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 62,
    fieldsJson: F([
      { key: 'nom_clinique', label: "Nom de la clinique", type: 'text', required: true },
      { key: 'periode_plan', label: "Période du plan (ex. 2025-2030)", type: 'text', required: true },
      { key: 'axes_strategiques', label: "Axes stratégiques de développement", type: 'textarea', required: true },
      { key: 'investissements_totaux', label: "Investissements totaux prévus (FCFA)", type: 'text', required: true },
      { key: 'objectif_lits', label: "Objectif de capacité en lits", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT — CLINIQUE PRIVÉE</h1>
<p><strong>Clinique :</strong> {{nom_clinique}} | <strong>Période :</strong> {{periode_plan}}</p>
<p><strong>Axes stratégiques :</strong> {{axes_strategiques}}</p>
<p><strong>Investissements totaux :</strong> {{investissements_totaux}} FCFA</p>
<p><strong>Capacité cible :</strong> {{objectif_lits}} lits</p>
<p>Ce plan est soumis au Conseil d'Administration et révisé annuellement en fonction des résultats.</p>
<p>Président du CA : _____________________ Date : _____________</p></div>`
  },
  {
    code: 'hosp_accord_partenariat_chu',
    name: "Accord de Partenariat Clinique Privée-CHU",
    category: 'sante',
    price: 14000,
    priceMax: 40000,
    description: "Accord de coopération entre une clinique privée et un Centre Hospitalier Universitaire (CHU) en Côte d'Ivoire pour le transfert de patients, la formation et la recherche clinique.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'nom_clinique', label: "Nom de la clinique privée", type: 'text', required: true },
      { key: 'nom_chu', label: "Nom du CHU partenaire", type: 'text', required: true },
      { key: 'domaines_cooperation', label: "Domaines de coopération", type: 'textarea', required: true },
      { key: 'protocole_transfert', label: "Protocole de transfert de patients", type: 'textarea', required: true },
      { key: 'date_accord', label: "Date de signature de l'accord", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT — CLINIQUE PRIVÉE / CHU</h1>
<p>Entre la clinique <strong>{{nom_clinique}}</strong> et le <strong>{{nom_chu}}</strong>.</p>
<p><strong>Domaines de coopération :</strong> {{domaines_cooperation}}</p>
<p><strong>Protocole de transfert :</strong> {{protocole_transfert}}</p>
<p><strong>Signé le :</strong> {{date_accord}}</p>
<p>Cet accord est renouvelable annuellement par tacite reconduction, sauf dénonciation avec préavis de 3 mois.</p>
<p>Signatures des Directeurs : _____________________ Date : _____________</p></div>`
  },
  {
    code: 'hosp_plan_accreditation',
    name: "Plan d'Accréditation Établissement de Santé Privé",
    category: 'sante',
    price: 15000,
    priceMax: 45000,
    description: "Plan de préparation à l'accréditation ou à la certification qualité d'un établissement de santé privé ivoirien (HAS, ISO 9001, JCI ou référentiel national).",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'nom_etablissement', label: "Nom de l'établissement", type: 'text', required: true },
      { key: 'referentiel_cible', label: "Référentiel d'accréditation ciblé", type: 'text', required: true },
      { key: 'date_audit_prevu', label: "Date de l'audit d'accréditation prévu", type: 'date', required: true },
      { key: 'axes_amelioration', label: "Principaux axes d'amélioration identifiés", type: 'textarea', required: true },
      { key: 'responsable_projet', label: "Responsable du projet d'accréditation", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>PLAN D'ACCRÉDITATION — ÉTABLISSEMENT DE SANTÉ</h1>
<p><strong>Établissement :</strong> {{nom_etablissement}} | <strong>Référentiel :</strong> {{referentiel_cible}}</p>
<p><strong>Audit prévu le :</strong> {{date_audit_prevu}} | <strong>Responsable :</strong> {{responsable_projet}}</p>
<p><strong>Axes d'amélioration :</strong> {{axes_amelioration}}</p>
<h2>Phases du projet</h2>
<p>Phase 1 : Diagnostic auto-évaluation — Phase 2 : Plans d'action correctifs — Phase 3 : Audit blanc — Phase 4 : Visite d'accréditation.</p>
<p>Validation : _____________________ Date : _____________</p></div>`
  },
  {
    code: 'hosp_charte_patient',
    name: "Charte du Patient (Droits et Devoirs)",
    category: 'sante',
    price: 4000,
    priceMax: 10000,
    description: "Charte des droits et devoirs du patient hospitalisé dans une clinique privée ivoirienne, conforme à la loi ivoirienne sur la santé et aux recommandations de l'OMS.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 85,
    fieldsJson: F([
      { key: 'nom_etablissement', label: "Nom de l'établissement", type: 'text', required: true },
      { key: 'date_adoption', label: "Date d'adoption de la charte", type: 'date', required: true },
      { key: 'directeur_signe', label: "Nom du Directeur signataire", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>CHARTE DU PATIENT — DROITS ET DEVOIRS</h1>
<p><strong>{{nom_etablissement}}</strong> — Adoptée le {{date_adoption}}</p>
<h2>VOS DROITS</h2>
<p>1. Accès aux soins sans discrimination — 2. Information claire sur votre état de santé — 3. Consentement libre et éclairé — 4. Respect de votre dignité et de votre vie privée — 5. Confidentialité de votre dossier médical — 6. Désignation d'une personne de confiance — 7. Accès à votre dossier médical.</p>
<h2>VOS DEVOIRS</h2>
<p>1. Respecter le personnel soignant et les autres patients — 2. Fournir des informations médicales exactes — 3. Respecter le règlement intérieur — 4. S'acquitter des frais de séjour.</p>
<p>Le Directeur : {{directeur_signe}} — Signature : _____________________ Date : _____________</p></div>`
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
  console.log(`Batch 45a OK — créés:${created} maj:${updated} TOTAL:${total}`);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
