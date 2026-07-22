import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ─── 25 Import-Export avancé (impo_) ───────────────────────────────────────
  {
    code: 'impo_contrat_intl',
    name: "Accord de Contrat Import-Export International (Incoterms 2020)",
    category: 'commercial_financier', price: 8000, priceMax: 24000,
    description: "Contrat d'import-export international conforme aux Incoterms 2020 (CIF, FOB, CIP) pour opérations commerciales transfrontalières depuis la Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 90,
    fieldsJson: F([
      {key:'exportateur',label:"Raison sociale exportateur",type:'text',required:true},
      {key:'importateur',label:"Raison sociale importateur",type:'text',required:true},
      {key:'marchandise',label:"Désignation des marchandises",type:'textarea',required:true},
      {key:'incoterm',label:"Incoterm applicable (ex: FOB, CIF, CIP)",type:'text',required:true},
      {key:'montant',label:"Valeur totale de la transaction (FCFA ou devise)",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison prévue",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT D'IMPORT-EXPORT INTERNATIONAL</h1><p>Entre l'exportateur <strong>{{exportateur}}</strong> et l'importateur <strong>{{importateur}}</strong>, il est convenu ce qui suit :</p><h2>1. Objet du Contrat</h2><p>Vente et livraison de : {{marchandise}}</p><h2>2. Conditions de Livraison</h2><p>Incoterm applicable : <strong>{{incoterm}}</strong> (Incoterms 2020 ICC).</p><h2>3. Prix et Paiement</h2><p>Montant total : <strong>{{montant}}</strong>. Date de livraison prévue : {{date_livraison}}.</p><h2>4. Droit Applicable</h2><p>Le présent contrat est soumis aux règles de l'OHADA et aux Incoterms 2020 de la Chambre de Commerce Internationale.</p></div>`
  },
  {
    code: 'impo_credit_doc',
    name: "Accord de Crédit Documentaire — Lettre de Crédit (L/C)",
    category: 'commercial_financier', price: 7000, priceMax: 21000,
    description: "Convention de mise en place d'un crédit documentaire (lettre de crédit L/C) entre banque émettrice, banque notificatrice, acheteur et vendeur.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 85,
    fieldsJson: F([
      {key:'banque_emettrice',label:"Banque émettrice (nom et siège)",type:'text',required:true},
      {key:'beneficiaire',label:"Bénéficiaire (vendeur/exportateur)",type:'text',required:true},
      {key:'montant_lc',label:"Montant du crédit documentaire",type:'text',required:true},
      {key:'date_expiration',label:"Date d'expiration du crédit",type:'date',required:true},
      {key:'conditions',label:"Documents requis et conditions de paiement",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CRÉDIT DOCUMENTAIRE (LETTRE DE CRÉDIT)</h1><h2>1. Parties</h2><p>Banque émettrice : <strong>{{banque_emettrice}}</strong>. Bénéficiaire : <strong>{{beneficiaire}}</strong>.</p><h2>2. Montant et Validité</h2><p>Montant du crédit : <strong>{{montant_lc}}</strong>. Date d'expiration : {{date_expiration}}.</p><h2>3. Documents Requis</h2><p>{{conditions}}</p><h2>4. Cadre Réglementaire</h2><p>Le présent crédit est soumis aux Règles et Usances Uniformes de la CCI (RUU 600) et à la réglementation de la BCEAO.</p></div>`
  },
  {
    code: 'impo_remise_doc',
    name: "Accord de Remise Documentaire (Encaissement D/P — D/A)",
    category: 'commercial_financier', price: 5000, priceMax: 15000,
    description: "Accord d'encaissement documentaire (remise documentaire) entre exportateur, banque remettante et banque présentatrice, selon les RUE 522 CCI.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 75,
    fieldsJson: F([
      {key:'remettant',label:"Remettant (exportateur)",type:'text',required:true},
      {key:'tire',label:"Tiré (importateur)",type:'text',required:true},
      {key:'banque_remettante',label:"Banque remettante",type:'text',required:true},
      {key:'type_remise',label:"Type de remise (D/P ou D/A)",type:'text',required:true},
      {key:'montant',label:"Montant de la remise",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE REMISE DOCUMENTAIRE</h1><h2>1. Parties</h2><p>Remettant : <strong>{{remettant}}</strong>. Tiré : <strong>{{tire}}</strong>. Banque remettante : <strong>{{banque_remettante}}</strong>.</p><h2>2. Modalités</h2><p>Type de remise : <strong>{{type_remise}}</strong>. Montant : <strong>{{montant}}</strong>.</p><h2>3. Règles Applicables</h2><p>La présente remise documentaire est régie par les Règles Uniformes de la CCI relatives aux Encaissements (RUE 522).</p></div>`
  },
  {
    code: 'impo_garantie_intl',
    name: "Accord de Garantie Bancaire Internationale (SBLC / BG)",
    category: 'commercial_financier', price: 8000, priceMax: 28000,
    description: "Convention de garantie bancaire internationale (Stand-By Letter of Credit ou Bank Guarantee) pour sécuriser les transactions commerciales internationales.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 80,
    fieldsJson: F([
      {key:'garant',label:"Banque garante",type:'text',required:true},
      {key:'beneficiaire',label:"Bénéficiaire de la garantie",type:'text',required:true},
      {key:'donneur_ordre',label:"Donneur d'ordre (débiteur principal)",type:'text',required:true},
      {key:'type_garantie',label:"Type de garantie (SBLC ou BG)",type:'text',required:true},
      {key:'montant',label:"Montant garanti",type:'text',required:true},
      {key:'date_echeance',label:"Date d'échéance de la garantie",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE GARANTIE BANCAIRE INTERNATIONALE</h1><h2>1. Parties</h2><p>Banque garante : <strong>{{garant}}</strong>. Bénéficiaire : <strong>{{beneficiaire}}</strong>. Donneur d'ordre : <strong>{{donneur_ordre}}</strong>.</p><h2>2. Garantie</h2><p>Type : <strong>{{type_garantie}}</strong>. Montant garanti : <strong>{{montant}}</strong>. Échéance : {{date_echeance}}.</p><h2>3. Conditions d'Appel</h2><p>La garantie est payable à première demande, inconditionnellement, sur présentation d'une déclaration écrite de défaillance du donneur d'ordre.</p></div>`
  },
  {
    code: 'impo_couverture_change',
    name: "Accord de Couverture de Change (Forex Hedging)",
    category: 'commercial_financier', price: 6000, priceMax: 18000,
    description: "Convention de couverture du risque de change entre entreprise importatrice/exportatrice et établissement financier, pour opérations en devises étrangères.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'client',label:"Client (entreprise)",type:'text',required:true},
      {key:'banque',label:"Établissement financier",type:'text',required:true},
      {key:'devise',label:"Devise concernée",type:'text',required:true},
      {key:'montant_couvert',label:"Montant à couvrir",type:'text',required:true},
      {key:'echeance',label:"Date d'échéance de la couverture",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE COUVERTURE DE CHANGE (FOREX HEDGING)</h1><h2>1. Parties</h2><p>Client : <strong>{{client}}</strong>. Banque : <strong>{{banque}}</strong>.</p><h2>2. Paramètres de la Couverture</h2><p>Devise : <strong>{{devise}}</strong>. Montant couvert : <strong>{{montant_couvert}}</strong>. Échéance : {{echeance}}.</p><h2>3. Modalités</h2><p>Le présent accord fixe les conditions de la couverture contre le risque de change conformément à la réglementation BCEAO et aux pratiques du marché des changes de l'UEMOA.</p></div>`
  },
  {
    code: 'impo_commissionnaire_douane',
    name: "Accord de Service de Commissionnaire en Douane",
    category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Contrat de commission en douane confiant à un commissionnaire agréé les opérations de dédouanement pour le compte d'un importateur ou exportateur.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 82,
    fieldsJson: F([
      {key:'mandant',label:"Mandant (importateur/exportateur)",type:'text',required:true},
      {key:'commissionnaire',label:"Commissionnaire en douane agréé",type:'text',required:true},
      {key:'nature_operations',label:"Nature des opérations confiées",type:'textarea',required:true},
      {key:'honoraires',label:"Honoraires convenus (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE COMMISSIONNAIRE EN DOUANE</h1><h2>1. Parties</h2><p>Mandant : <strong>{{mandant}}</strong>. Commissionnaire agréé : <strong>{{commissionnaire}}</strong>.</p><h2>2. Mission</h2><p>Nature des opérations : {{nature_operations}}</p><h2>3. Rémunération</h2><p>Honoraires : <strong>{{honoraires}}</strong> FCFA, hors débours et taxes douanières.</p><h2>4. Obligations</h2><p>Le commissionnaire s'engage à accomplir les formalités douanières dans les délais réglementaires fixés par la Direction Générale des Douanes de Côte d'Ivoire (DGD CI).</p></div>`
  },
  {
    code: 'impo_transitaire_intl',
    name: "Accord de Service de Transitaire International",
    category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Convention de prestation de services de transit international confiée à un transitaire agréé pour l'organisation du transport et des formalités douanières.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 80,
    fieldsJson: F([
      {key:'chargeur',label:"Chargeur (client)",type:'text',required:true},
      {key:'transitaire',label:"Transitaire international",type:'text',required:true},
      {key:'trajet',label:"Trajet/origine-destination",type:'text',required:true},
      {key:'nature_marchandise',label:"Nature et volume des marchandises",type:'textarea',required:true},
      {key:'tarif',label:"Tarif de prestation (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TRANSITAIRE INTERNATIONAL</h1><h2>1. Parties</h2><p>Chargeur : <strong>{{chargeur}}</strong>. Transitaire : <strong>{{transitaire}}</strong>.</p><h2>2. Prestation</h2><p>Trajet : <strong>{{trajet}}</strong>. Marchandises : {{nature_marchandise}}</p><h2>3. Tarification</h2><p>Tarif convenu : <strong>{{tarif}}</strong> FCFA. La prestation comprend l'organisation du transport, les formalités douanières et le suivi de la marchandise jusqu'à destination.</p></div>`
  },
  {
    code: 'impo_agent_maritime',
    name: "Accord de Service d'Agent Maritime (Consignataire de Navire)",
    category: 'commercial_financier', price: 5000, priceMax: 15000,
    description: "Contrat de consignation de navire confiant à un agent maritime agréé la représentation de l'armateur et la gestion des escales au Port d'Abidjan.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'armateur',label:"Armateur/propriétaire du navire",type:'text',required:true},
      {key:'agent_maritime',label:"Agent maritime consignataire",type:'text',required:true},
      {key:'navire',label:"Nom et IMO du navire",type:'text',required:true},
      {key:'port',label:"Port(s) d'escale concerné(s)",type:'text',required:true},
      {key:'commission',label:"Commission d'agence (% ou montant fixe)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'AGENT MARITIME (CONSIGNATAIRE DE NAVIRE)</h1><h2>1. Parties</h2><p>Armateur : <strong>{{armateur}}</strong>. Agent maritime : <strong>{{agent_maritime}}</strong>.</p><h2>2. Navire et Escales</h2><p>Navire : <strong>{{navire}}</strong>. Port(s) d'escale : <strong>{{port}}</strong>.</p><h2>3. Mission et Rémunération</h2><p>L'agent maritime est chargé de la consignation du navire, de la gestion des escales, des formalités portuaires auprès du Port Autonome d'Abidjan. Commission : <strong>{{commission}}</strong>.</p></div>`
  },
  {
    code: 'impo_courtier_fret',
    name: "Accord de Service de Courtier en Fret Maritime",
    category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Convention de courtage en fret maritime pour la mise en relation entre chargeurs et armateurs et la négociation des conditions de transport par voie maritime.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'client',label:"Client (chargeur ou armateur)",type:'text',required:true},
      {key:'courtier',label:"Courtier en fret maritime",type:'text',required:true},
      {key:'trajet_maritime',label:"Route maritime (départ-arrivée)",type:'text',required:true},
      {key:'commission_courtage',label:"Commission de courtage (%)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE COURTIER EN FRET MARITIME</h1><h2>1. Parties</h2><p>Client : <strong>{{client}}</strong>. Courtier : <strong>{{courtier}}</strong>.</p><h2>2. Mission</h2><p>Route maritime : <strong>{{trajet_maritime}}</strong>. Le courtier est mandaté pour négocier les meilleures conditions de fret maritime pour le compte du client.</p><h2>3. Rémunération</h2><p>Commission de courtage : <strong>{{commission_courtage}}</strong> du montant du fret négocié, payable à la signature du contrat de transport.</p></div>`
  },
  {
    code: 'impo_fret_aerien',
    name: "Accord de Service de Fret Aérien Cargo (AWB)",
    category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Contrat de prestation de fret aérien cargo entre expéditeur et transporteur ou agent de fret, avec émission de lettre de transport aérien (AWB).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 74,
    fieldsJson: F([
      {key:'expediteur',label:"Expéditeur",type:'text',required:true},
      {key:'destinataire',label:"Destinataire",type:'text',required:true},
      {key:'agent_fret',label:"Agent de fret aérien",type:'text',required:true},
      {key:'aeroport_depart',label:"Aéroport de départ",type:'text',required:true},
      {key:'nature_colis',label:"Nature et poids des colis",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FRET AÉRIEN CARGO</h1><h2>1. Parties</h2><p>Expéditeur : <strong>{{expediteur}}</strong>. Destinataire : <strong>{{destinataire}}</strong>. Agent de fret : <strong>{{agent_fret}}</strong>.</p><h2>2. Transport</h2><p>Aéroport de départ : <strong>{{aeroport_depart}}</strong>. Nature et poids : {{nature_colis}}</p><h2>3. Documents</h2><p>Une Lettre de Transport Aérien (AWB) sera émise conformément aux règles de l'IATA et à la Convention de Montréal 1999.</p></div>`
  },
  {
    code: 'impo_groupage_maritime',
    name: "Accord de Service de Groupage Maritime (LCL)",
    category: 'commercial_financier', price: 3500, priceMax: 10500,
    description: "Convention de groupage maritime LCL (Less than Container Load) entre chargeurs et opérateur de groupage pour l'optimisation des coûts de transport maritime.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'chargeur',label:"Chargeur",type:'text',required:true},
      {key:'operateur_groupage',label:"Opérateur de groupage",type:'text',required:true},
      {key:'origine',label:"Port d'origine",type:'text',required:true},
      {key:'destination',label:"Port de destination",type:'text',required:true},
      {key:'volume',label:"Volume/poids de la marchandise",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GROUPAGE MARITIME (LCL)</h1><h2>1. Parties</h2><p>Chargeur : <strong>{{chargeur}}</strong>. Opérateur de groupage : <strong>{{operateur_groupage}}</strong>.</p><h2>2. Prestations</h2><p>Origine : <strong>{{origine}}</strong>. Destination : <strong>{{destination}}</strong>. Volume/poids : <strong>{{volume}}</strong>.</p><h2>3. Conditions</h2><p>Le chargeur confie ses marchandises au groupeur qui les consolide dans un conteneur avec d'autres expéditions, conformément aux pratiques professionnelles du transport maritime international.</p></div>`
  },
  {
    code: 'impo_fret_ferroviaire',
    name: "Accord de Service de Fret Ferroviaire (CI-SITARAIL)",
    category: 'commercial_financier', price: 3500, priceMax: 10500,
    description: "Convention de transport de marchandises par voie ferrée entre la Côte d'Ivoire et le Burkina Faso via SITARAIL, avec conditions tarifaires et délais d'acheminement.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'expediteur',label:"Expéditeur",type:'text',required:true},
      {key:'destinataire',label:"Destinataire",type:'text',required:true},
      {key:'gare_depart',label:"Gare de départ (CI)",type:'text',required:true},
      {key:'gare_arrivee',label:"Gare d'arrivée (BF)",type:'text',required:true},
      {key:'marchandise',label:"Désignation et tonnage",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FRET FERROVIAIRE — SITARAIL</h1><h2>1. Parties</h2><p>Expéditeur : <strong>{{expediteur}}</strong>. Destinataire : <strong>{{destinataire}}</strong>.</p><h2>2. Transport</h2><p>Gare de départ : <strong>{{gare_depart}}</strong>. Gare d'arrivée : <strong>{{gare_arrivee}}</strong>.</p><h2>3. Marchandise</h2><p>{{marchandise}}</p><h2>4. Cadre Légal</h2><p>Le transport est régi par la Convention internationale de transport ferroviaire et les tarifs SITARAIL en vigueur.</p></div>`
  },
  {
    code: 'impo_fret_routier_tir',
    name: "Accord de Service de Fret Routier International (TIR)",
    category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Contrat de transport routier international sous carnet TIR pour l'acheminement de marchandises entre pays membres de la convention TIR, incluant la Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 78,
    fieldsJson: F([
      {key:'chargeur',label:"Chargeur",type:'text',required:true},
      {key:'transporteur',label:"Transporteur routier international",type:'text',required:true},
      {key:'depart',label:"Lieu de départ",type:'text',required:true},
      {key:'destination',label:"Lieu de destination",type:'text',required:true},
      {key:'marchandise',label:"Nature, poids et valeur des marchandises",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FRET ROUTIER INTERNATIONAL (TIR)</h1><h2>1. Parties</h2><p>Chargeur : <strong>{{chargeur}}</strong>. Transporteur : <strong>{{transporteur}}</strong>.</p><h2>2. Transport</h2><p>Départ : <strong>{{depart}}</strong>. Destination : <strong>{{destination}}</strong>.</p><h2>3. Marchandise</h2><p>{{marchandise}}</p><h2>4. Régime TIR</h2><p>Le transport s'effectue sous couvert d'un carnet TIR conformément à la Convention douanière relative au transport international de marchandises sous couvert de carnets TIR (Convention TIR).</p></div>`
  },
  {
    code: 'impo_prefinancement_export',
    name: "Accord de Service de Pré-financement Export (Banque)",
    category: 'commercial_financier', price: 6000, priceMax: 18000,
    description: "Convention de pré-financement de commandes export accordé par une banque à un exportateur ivoirien pour la constitution du stock ou la production avant expédition.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'exportateur',label:"Exportateur bénéficiaire",type:'text',required:true},
      {key:'banque',label:"Banque prêteuse",type:'text',required:true},
      {key:'montant_financement',label:"Montant du financement (FCFA)",type:'text',required:true},
      {key:'duree',label:"Durée du pré-financement",type:'text',required:true},
      {key:'taux',label:"Taux d'intérêt annuel (%)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRÉ-FINANCEMENT EXPORT</h1><h2>1. Parties</h2><p>Exportateur : <strong>{{exportateur}}</strong>. Banque : <strong>{{banque}}</strong>.</p><h2>2. Financement</h2><p>Montant : <strong>{{montant_financement}}</strong> FCFA. Durée : <strong>{{duree}}</strong>. Taux : <strong>{{taux}}</strong>% par an.</p><h2>3. Conditions</h2><p>Le financement est accordé sur présentation d'un contrat de vente export ferme ou d'une lettre de crédit irrévocable et confirmée. Il est remboursable dès encaissement des devises d'exportation.</p></div>`
  },
  {
    code: 'impo_credit_acheteur',
    name: "Accord de Service de Crédit Acheteur (COFACE CI)",
    category: 'commercial_financier', price: 7000, priceMax: 21000,
    description: "Convention de crédit acheteur avec soutien COFACE CI permettant à l'importateur de financer ses achats auprès d'un exportateur français ou international.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'acheteur',label:"Acheteur étranger",type:'text',required:true},
      {key:'vendeur',label:"Vendeur/exportateur",type:'text',required:true},
      {key:'banque_financement',label:"Banque finançant le crédit acheteur",type:'text',required:true},
      {key:'montant_credit',label:"Montant du crédit acheteur",type:'text',required:true},
      {key:'date_echeance',label:"Date d'échéance finale",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CRÉDIT ACHETEUR (AVEC GARANTIE COFACE)</h1><h2>1. Parties</h2><p>Acheteur : <strong>{{acheteur}}</strong>. Vendeur : <strong>{{vendeur}}</strong>. Banque : <strong>{{banque_financement}}</strong>.</p><h2>2. Crédit</h2><p>Montant : <strong>{{montant_credit}}</strong>. Échéance finale : {{date_echeance}}.</p><h2>3. Garantie</h2><p>Le présent crédit bénéficie d'une garantie accordée par COFACE CI, couvrant le risque de défaut de paiement de l'acheteur.</p></div>`
  },
  {
    code: 'impo_assurance_export',
    name: "Accord de Service d'Assurance-Export (COFACE CI)",
    category: 'commercial_financier', price: 5000, priceMax: 15000,
    description: "Police d'assurance-export souscrite auprès de COFACE CI pour couvrir le risque de non-paiement par un acheteur étranger de créances d'exportation.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'assure',label:"Assuré (exportateur)",type:'text',required:true},
      {key:'acheteur_etranger',label:"Acheteur étranger couvert",type:'text',required:true},
      {key:'montant_assure',label:"Encours maximum assuré",type:'text',required:true},
      {key:'taux_prime',label:"Taux de prime d'assurance (%)",type:'text',required:true},
      {key:'date_prise_effet',label:"Date de prise d'effet de la police",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ASSURANCE-EXPORT (COFACE CI)</h1><h2>1. Parties</h2><p>Assuré : <strong>{{assure}}</strong>. Acheteur couvert : <strong>{{acheteur_etranger}}</strong>.</p><h2>2. Couverture</h2><p>Encours maximum : <strong>{{montant_assure}}</strong>. Taux de prime : <strong>{{taux_prime}}</strong>%. Prise d'effet : {{date_prise_effet}}.</p><h2>3. Conditions de Sinistre</h2><p>En cas de défaut de paiement avéré de l'acheteur après la période de carence contractuelle, COFACE CI indemnise l'assuré à hauteur du taux de couverture souscrit.</p></div>`
  },
  {
    code: 'impo_clearing_reglement',
    name: "Accord de Service de Clearing et Règlement International",
    category: 'commercial_financier', price: 5000, priceMax: 15000,
    description: "Convention de service de compensation et de règlement de transactions commerciales internationales entre banques correspondantes dans le cadre de l'UEMOA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 62,
    fieldsJson: F([
      {key:'banque_ci',label:"Banque ivoirienne",type:'text',required:true},
      {key:'banque_correspondante',label:"Banque correspondante internationale",type:'text',required:true},
      {key:'devise_reglement',label:"Devise de règlement",type:'text',required:true},
      {key:'systeme_clearing',label:"Système de clearing utilisé (SWIFT, RTGS, SICA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CLEARING ET RÈGLEMENT INTERNATIONAL</h1><h2>1. Parties</h2><p>Banque CI : <strong>{{banque_ci}}</strong>. Banque correspondante : <strong>{{banque_correspondante}}</strong>.</p><h2>2. Paramètres</h2><p>Devise : <strong>{{devise_reglement}}</strong>. Système de clearing : <strong>{{systeme_clearing}}</strong>.</p><h2>3. Cadre Légal</h2><p>Les opérations de clearing sont effectuées conformément aux règles de la BCEAO, du Système Interbancaire de Compensation Automatisé (SICA-UEMOA) et des standards SWIFT.</p></div>`
  },
  {
    code: 'impo_inspection_embarquement',
    name: "Accord de Service d'Inspection avant Embarquement (PSI)",
    category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Contrat de prestation d'inspection avant embarquement (PSI) pour la vérification de la qualité, quantité et conformité réglementaire des marchandises avant expédition.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 76,
    fieldsJson: F([
      {key:'importateur',label:"Importateur ou donneur d'ordre",type:'text',required:true},
      {key:'societe_inspection',label:"Société d'inspection agréée",type:'text',required:true},
      {key:'marchandise',label:"Marchandise à inspecter",type:'textarea',required:true},
      {key:'lieu_inspection',label:"Lieu d'inspection (pays exportateur)",type:'text',required:true},
      {key:'date_inspection',label:"Date d'inspection prévue",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'INSPECTION AVANT EMBARQUEMENT (PSI)</h1><h2>1. Parties</h2><p>Donneur d'ordre : <strong>{{importateur}}</strong>. Société d'inspection : <strong>{{societe_inspection}}</strong>.</p><h2>2. Mission</h2><p>Marchandise : {{marchandise}}. Lieu : <strong>{{lieu_inspection}}</strong>. Date : {{date_inspection}}.</p><h2>3. Rapport</h2><p>Un rapport d'inspection (Attestation de Vérification) sera émis à l'issue de l'inspection, conformément aux règles de l'OMC sur les procédures de licences d'importation et aux exigences de la DGD CI.</p></div>`
  },
  {
    code: 'impo_conformite_reglementaire',
    name: "Accord de Service de Vérification de Conformité Réglementaire (ONC CI)",
    category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Convention de vérification de la conformité réglementaire des produits importés en Côte d'Ivoire avec les normes CODINORM et les exigences de l'Office National de la Conformité (ONC CI).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'importateur',label:"Importateur",type:'text',required:true},
      {key:'verificateur',label:"Organisme vérificateur agréé ONC CI",type:'text',required:true},
      {key:'produits',label:"Produits soumis à vérification",type:'textarea',required:true},
      {key:'norme_applicable',label:"Norme applicable (ISO, CODINORM, etc.)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE VÉRIFICATION DE CONFORMITÉ RÉGLEMENTAIRE</h1><h2>1. Parties</h2><p>Importateur : <strong>{{importateur}}</strong>. Vérificateur agréé : <strong>{{verificateur}}</strong>.</p><h2>2. Produits et Normes</h2><p>Produits : {{produits}}. Norme : <strong>{{norme_applicable}}</strong>.</p><h2>3. Résultat</h2><p>Un certificat de conformité sera délivré si les produits satisfont aux exigences réglementaires de l'ONC CI et des normes CODINORM applicables en Côte d'Ivoire.</p></div>`
  },
  {
    code: 'impo_certification_origine',
    name: "Accord de Service de Certification d'Origine (Chambre de Commerce CI)",
    category: 'commercial_financier', price: 3500, priceMax: 10500,
    description: "Convention de délivrance de certificats d'origine pour les exportations ivoiriennes, émis par la Chambre de Commerce et d'Industrie de Côte d'Ivoire (CCI-CI).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 80,
    fieldsJson: F([
      {key:'exportateur',label:"Exportateur",type:'text',required:true},
      {key:'pays_destination',label:"Pays de destination",type:'text',required:true},
      {key:'marchandise',label:"Description des marchandises",type:'textarea',required:true},
      {key:'critere_origine',label:"Critère d'origine appliqué",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CERTIFICATION D'ORIGINE</h1><h2>1. Parties</h2><p>Exportateur : <strong>{{exportateur}}</strong>. Certificat délivré par la Chambre de Commerce et d'Industrie de Côte d'Ivoire (CCI-CI).</p><h2>2. Destination et Marchandises</h2><p>Pays de destination : <strong>{{pays_destination}}</strong>. Marchandises : {{marchandise}}</p><h2>3. Règles d'Origine</h2><p>Critère d'origine : <strong>{{critere_origine}}</strong>, conformément aux accords préférentiels applicables (CEDEAO, AGOA, APE UE-CEDEAO).</p></div>`
  },
  {
    code: 'impo_sourcing_fournisseur',
    name: "Accord de Service de Sourcing Fournisseur International",
    category: 'commercial_financier', price: 5000, priceMax: 16000,
    description: "Convention de prestation de sourcing de fournisseurs internationaux pour le compte d'une entreprise ivoirienne souhaitant identifier et qualifier des partenaires commerciaux étrangers.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 67,
    fieldsJson: F([
      {key:'client',label:"Client (acheteur ivoirien)",type:'text',required:true},
      {key:'prestataire_sourcing',label:"Prestataire de sourcing",type:'text',required:true},
      {key:'categorie_produits',label:"Catégorie de produits recherchés",type:'textarea',required:true},
      {key:'pays_cibles',label:"Pays fournisseurs ciblés",type:'text',required:true},
      {key:'honoraires_sourcing',label:"Honoraires de sourcing (FCFA ou %)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SOURCING FOURNISSEUR INTERNATIONAL</h1><h2>1. Parties</h2><p>Client : <strong>{{client}}</strong>. Prestataire : <strong>{{prestataire_sourcing}}</strong>.</p><h2>2. Mission</h2><p>Produits : {{categorie_produits}}. Pays ciblés : <strong>{{pays_cibles}}</strong>.</p><h2>3. Rémunération</h2><p>Honoraires : <strong>{{honoraires_sourcing}}</strong>. Le prestataire s'engage à présenter au minimum trois (3) fournisseurs qualifiés et à fournir un rapport d'évaluation comparative.</p></div>`
  },
  {
    code: 'impo_veille_reglementaire',
    name: "Accord de Service de Veille Réglementaire Commerce International",
    category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Convention de service de veille réglementaire sur l'évolution des normes, tarifs douaniers, accords commerciaux et exigences légales affectant les opérations d'import-export.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      {key:'client',label:"Client bénéficiaire",type:'text',required:true},
      {key:'prestataire_veille',label:"Prestataire de veille réglementaire",type:'text',required:true},
      {key:'secteurs_surveilles',label:"Secteurs/produits sous surveillance",type:'textarea',required:true},
      {key:'frequence_rapports',label:"Fréquence des rapports de veille",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE VEILLE RÉGLEMENTAIRE COMMERCE INTERNATIONAL</h1><h2>1. Parties</h2><p>Client : <strong>{{client}}</strong>. Prestataire : <strong>{{prestataire_veille}}</strong>.</p><h2>2. Périmètre de Veille</h2><p>Secteurs surveillés : {{secteurs_surveilles}}. Fréquence des rapports : <strong>{{frequence_rapports}}</strong>.</p><h2>3. Livrables</h2><p>Le prestataire s'engage à signaler toute modification réglementaire, tarifaire ou normative susceptible d'affecter les opérations commerciales internationales du client, dans un délai de 48 heures.</p></div>`
  },
  {
    code: 'impo_rapport_performance',
    name: "Rapport de Performance des Flux Import-Export",
    category: 'commercial_financier', price: 5000, priceMax: 15000,
    description: "Rapport périodique d'analyse des performances des flux d'importation et d'exportation d'une entreprise : volumes, coûts, délais, partenaires et indicateurs clés.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise analysée",type:'text',required:true},
      {key:'periode',label:"Période du rapport",type:'text',required:true},
      {key:'responsable',label:"Responsable commerce international",type:'text',required:true},
      {key:'faits_saillants',label:"Faits saillants et conclusions",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE DES FLUX IMPORT-EXPORT</h1><h2>Entreprise : {{entreprise}}</h2><h2>Période : {{periode}}</h2><p>Responsable : <strong>{{responsable}}</strong></p><h2>1. Synthèse Exécutive</h2><p>{{faits_saillants}}</p><h2>2. Indicateurs Clés (KPI)</h2><p>Volumes traités, valeur des transactions, délais moyens de dédouanement, taux de conformité documentaire et coût logistique total (TLC) sont analysés pour la période considérée.</p><h2>3. Recommandations</h2><p>Sur la base des données de la période, le présent rapport formule des recommandations d'optimisation des flux et de réduction des coûts logistiques.</p></div>`
  },
  {
    code: 'impo_plan_dev_commerce',
    name: "Plan de Développement Commerce International",
    category: 'commercial_financier', price: 6000, priceMax: 18000,
    description: "Plan stratégique de développement commercial à l'international pour une entreprise ivoirienne : marchés cibles, produits, financement et feuille de route.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 63,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise",type:'text',required:true},
      {key:'dirigeant',label:"Dirigeant responsable",type:'text',required:true},
      {key:'marches_cibles',label:"Marchés cibles identifiés",type:'textarea',required:true},
      {key:'horizon_plan',label:"Horizon du plan (ex: 3 ans, 5 ans)",type:'text',required:true},
      {key:'budget_previsionnel',label:"Budget prévisionnel (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT COMMERCE INTERNATIONAL</h1><h2>Entreprise : {{entreprise}}</h2><p>Dirigeant : <strong>{{dirigeant}}</strong>. Horizon : <strong>{{horizon_plan}}</strong>.</p><h2>1. Marchés Cibles</h2><p>{{marches_cibles}}</p><h2>2. Stratégie d'Entrée</h2><p>Le plan définit les modes d'entrée (exportation directe, agents, bureaux de représentation, filiales) adaptés à chaque marché cible identifié.</p><h2>3. Budget et Financement</h2><p>Budget prévisionnel total : <strong>{{budget_previsionnel}}</strong> FCFA. Le financement sera mobilisé auprès des banques partenaires et des mécanismes de soutien à l'export disponibles en Côte d'Ivoire.</p></div>`
  },
  {
    code: 'impo_charte_responsable',
    name: "Charte de l'Importateur et de l'Exportateur Responsables",
    category: 'commercial_financier', price: 3000, priceMax: 9000,
    description: "Charte d'engagement éthique et de responsabilité pour les opérateurs du commerce international en Côte d'Ivoire : conformité, durabilité et pratiques commerciales loyales.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 58,
    fieldsJson: F([
      {key:'operateur',label:"Raison sociale de l'opérateur",type:'text',required:true},
      {key:'representant',label:"Représentant légal signataire",type:'text',required:true},
      {key:'date_adhesion',label:"Date d'adhésion à la charte",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE L'IMPORTATEUR ET DE L'EXPORTATEUR RESPONSABLES</h1><p>L'opérateur <strong>{{operateur}}</strong>, représenté par <strong>{{representant}}</strong>, adhère en date du {{date_adhesion}} aux principes suivants :</p><h2>1. Conformité Légale et Réglementaire</h2><p>Respect strict des lois ivoiriennes, des règlements de la CEDEAO, des normes OHADA et des conventions internationales ratifiées par la Côte d'Ivoire.</p><h2>2. Éthique Commerciale</h2><p>Refus de toute pratique de corruption, de fraude douanière, de sous-facturation ou de surfacturation dans les transactions internationales.</p><h2>3. Responsabilité Environnementale et Sociale</h2><p>Engagement à privilégier des partenaires et des pratiques commerciales respectueux de l'environnement et des droits fondamentaux au travail.</p></div>`
  },

  // ─── 25 Douane CI / Transit avancé (doua2_) ─────────────────────────────────
  {
    code: 'doua2_dedouanement_import',
    name: "Accord de Service de Dédouanement Import (DGD CI)",
    category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Contrat de prestation de dédouanement à l'importation confié à un commissionnaire agréé auprès de la Direction Générale des Douanes de Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 88,
    fieldsJson: F([
      {key:'importateur',label:"Importateur",type:'text',required:true},
      {key:'commissionnaire',label:"Commissionnaire agréé DGD CI",type:'text',required:true},
      {key:'marchandise',label:"Description des marchandises importées",type:'textarea',required:true},
      {key:'valeur_douaniere',label:"Valeur en douane déclarée (FCFA)",type:'text',required:true},
      {key:'regime_douanier',label:"Régime douanier applicable (ex: IM4, IM7)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DÉDOUANEMENT IMPORT — DGD CI</h1><h2>1. Parties</h2><p>Importateur : <strong>{{importateur}}</strong>. Commissionnaire agréé : <strong>{{commissionnaire}}</strong>.</p><h2>2. Opération</h2><p>Marchandises : {{marchandise}}. Valeur en douane : <strong>{{valeur_douaniere}}</strong> FCFA. Régime douanier : <strong>{{regime_douanier}}</strong>.</p><h2>3. Obligations</h2><p>Le commissionnaire s'engage à déposer la déclaration en détail (DUN) dans le système SYDAonia de la DGD CI et à accomplir toutes les formalités requises dans les délais légaux.</p></div>`
  },
  {
    code: 'doua2_dedouanement_export',
    name: "Accord de Service de Dédouanement Export (DGD CI)",
    category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Contrat de dédouanement à l'exportation confié à un commissionnaire agréé, couvrant la déclaration export, les licences et la validation du bon à embarquer.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 85,
    fieldsJson: F([
      {key:'exportateur',label:"Exportateur",type:'text',required:true},
      {key:'commissionnaire',label:"Commissionnaire agréé DGD CI",type:'text',required:true},
      {key:'marchandise',label:"Description des marchandises exportées",type:'textarea',required:true},
      {key:'pays_destination',label:"Pays de destination",type:'text',required:true},
      {key:'valeur_fob',label:"Valeur FOB déclarée (FCFA ou USD)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DÉDOUANEMENT EXPORT — DGD CI</h1><h2>1. Parties</h2><p>Exportateur : <strong>{{exportateur}}</strong>. Commissionnaire agréé : <strong>{{commissionnaire}}</strong>.</p><h2>2. Opération Export</h2><p>Marchandises : {{marchandise}}. Destination : <strong>{{pays_destination}}</strong>. Valeur FOB : <strong>{{valeur_fob}}</strong>.</p><h2>3. Formalités</h2><p>Le commissionnaire établit la déclaration d'exportation dans SYDAonia, obtient le bon à embarquer et assure la remise des exemplaires douaniers à l'exportateur pour remboursement TVA.</p></div>`
  },
  {
    code: 'doua2_transit_t1',
    name: "Accord de Service de Transit Douanier (Régime Suspensif T1)",
    category: 'commercial_financier', price: 4500, priceMax: 13500,
    description: "Convention de prise en charge d'opérations de transit douanier sous régime suspensif T1, permettant la circulation de marchandises non dédouanées entre bureaux de douane.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 80,
    fieldsJson: F([
      {key:'titulaire',label:"Titulaire du régime de transit",type:'text',required:true},
      {key:'prestataire',label:"Prestataire de transit agréé",type:'text',required:true},
      {key:'bureau_depart',label:"Bureau de douane de départ",type:'text',required:true},
      {key:'bureau_destination',label:"Bureau de douane de destination",type:'text',required:true},
      {key:'marchandise',label:"Désignation et quantité des marchandises",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TRANSIT DOUANIER — RÉGIME SUSPENSIF T1</h1><h2>1. Parties</h2><p>Titulaire : <strong>{{titulaire}}</strong>. Prestataire : <strong>{{prestataire}}</strong>.</p><h2>2. Itinéraire</h2><p>Bureau de départ : <strong>{{bureau_depart}}</strong>. Bureau de destination : <strong>{{bureau_destination}}</strong>.</p><h2>3. Marchandises</h2><p>{{marchandise}}</p><h2>4. Caution</h2><p>Une caution de transit est constituée auprès de la DGD CI afin de garantir le paiement des droits et taxes en cas de détournement des marchandises du régime.</p></div>`
  },
  {
    code: 'doua2_entrepot_dedouanement',
    name: "Accord de Service d'Entrepôt de Dédouanement (ED)",
    category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Convention d'utilisation d'un entrepôt de dédouanement agréé pour le stockage temporaire de marchandises en attente de mise à la consommation ou de réexportation.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 74,
    fieldsJson: F([
      {key:'deposant',label:"Déposant (importateur)",type:'text',required:true},
      {key:'gestionnaire_ed',label:"Gestionnaire de l'entrepôt ED agréé",type:'text',required:true},
      {key:'localisation_ed',label:"Localisation de l'entrepôt ED",type:'text',required:true},
      {key:'duree_stockage',label:"Durée maximale de stockage autorisée",type:'text',required:true},
      {key:'tarif_entreposage',label:"Tarif d'entreposage (FCFA/m³ ou FCFA/tonne)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ENTREPÔT DE DÉDOUANEMENT (ED)</h1><h2>1. Parties</h2><p>Déposant : <strong>{{deposant}}</strong>. Gestionnaire ED : <strong>{{gestionnaire_ed}}</strong>.</p><h2>2. Entrepôt</h2><p>Localisation : <strong>{{localisation_ed}}</strong>. Durée maximale : <strong>{{duree_stockage}}</strong>. Tarif : <strong>{{tarif_entreposage}}</strong>.</p><h2>3. Régime</h2><p>Les marchandises sont placées sous régime d'entrepôt douanier conformément au Code des Douanes de Côte d'Ivoire. Les droits et taxes sont suspendus pendant la durée du stockage.</p></div>`
  },
  {
    code: 'doua2_zone_franche',
    name: "Accord de Service de Zone Franche (GZIT CI)",
    category: 'commercial_financier', price: 6000, priceMax: 18000,
    description: "Convention d'installation et d'exploitation dans la Zone Franche de Grand-Bassam (GZIT CI) avec avantages fiscaux et douaniers pour les entreprises industrielles exportatrices.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise candidate à la zone franche",type:'text',required:true},
      {key:'activite',label:"Nature de l'activité industrielle",type:'textarea',required:true},
      {key:'investissement',label:"Montant de l'investissement prévu (FCFA)",type:'text',required:true},
      {key:'emplois',label:"Nombre d'emplois directs créés",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE ZONE FRANCHE — GZIT CI</h1><h2>1. Entreprise</h2><p>Raison sociale : <strong>{{entreprise}}</strong>.</p><h2>2. Activité</h2><p>{{activite}}</p><h2>3. Investissement et Emploi</h2><p>Investissement prévu : <strong>{{investissement}}</strong> FCFA. Emplois directs : <strong>{{emplois}}</strong>.</p><h2>4. Avantages Zone Franche</h2><p>L'entreprise bénéficie des avantages prévus par la loi ivoirienne relative aux zones franches : exonération de droits de douane sur les intrants, exonération d'impôt sur les bénéfices pendant la période agréée, et statut d'exportateur privilégié.</p></div>`
  },
  {
    code: 'doua2_regime_transformation',
    name: "Accord de Service de Régime de Transformation (TP Douane CI)",
    category: 'commercial_financier', price: 5000, priceMax: 15000,
    description: "Convention d'utilisation du régime douanier de transformation/perfectionnement pour l'importation de matières premières destinées à être transformées et réexportées.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'operateur',label:"Opérateur industriel titulaire",type:'text',required:true},
      {key:'matiere_premiere',label:"Matières premières importées en TP",type:'textarea',required:true},
      {key:'produit_transforme',label:"Produit fini après transformation",type:'text',required:true},
      {key:'taux_rendement',label:"Taux de rendement prévu (%)",type:'text',required:true},
      {key:'duree_regime',label:"Durée maximale du régime TP (mois)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — RÉGIME DE TRANSFORMATION (TP) DOUANE CI</h1><h2>1. Titulaire</h2><p><strong>{{operateur}}</strong></p><h2>2. Marchandises</h2><p>Matières premières en TP : {{matiere_premiere}}. Produit fini : <strong>{{produit_transforme}}</strong>.</p><h2>3. Paramètres Techniques</h2><p>Taux de rendement : <strong>{{taux_rendement}}</strong>%. Durée du régime : <strong>{{duree_regime}}</strong> mois.</p><h2>4. Obligations</h2><p>Le titulaire s'engage à apurer le régime dans les délais fixés par la DGD CI et à présenter les justificatifs de réexportation ou de mise à la consommation des produits compensateurs.</p></div>`
  },
  {
    code: 'doua2_admission_temporaire',
    name: "Accord de Service d'Admission Temporaire (AT CI)",
    category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Convention d'utilisation du régime d'admission temporaire pour l'importation de matériels, équipements ou matières destinés à être réexportés en l'état après utilisation.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'beneficiaire',label:"Bénéficiaire de l'AT",type:'text',required:true},
      {key:'materiel',label:"Description du matériel/équipement en AT",type:'textarea',required:true},
      {key:'usage_prevu',label:"Usage prévu en Côte d'Ivoire",type:'text',required:true},
      {key:'duree_at',label:"Durée de l'admission temporaire (mois)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ADMISSION TEMPORAIRE (AT) — DGD CI</h1><h2>1. Bénéficiaire</h2><p><strong>{{beneficiaire}}</strong></p><h2>2. Matériel en AT</h2><p>{{materiel}}</p><h2>3. Utilisation et Durée</h2><p>Usage en CI : <strong>{{usage_prevu}}</strong>. Durée : <strong>{{duree_at}}</strong> mois.</p><h2>4. Obligation de Réexportation</h2><p>Le bénéficiaire s'engage à réexporter les marchandises en l'état avant l'expiration du délai d'AT, sous peine de paiement des droits et taxes en principal et en pénalités.</p></div>`
  },
  {
    code: 'doua2_carnet_ata',
    name: "Accord de Service de Carnet ATA (Importation Temporaire)",
    category: 'commercial_financier', price: 3500, priceMax: 10500,
    description: "Convention d'assistance à l'obtention et à l'utilisation du carnet ATA pour l'admission temporaire de marchandises dans les pays membres de la convention ATA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'titulaire',label:"Titulaire du carnet ATA",type:'text',required:true},
      {key:'chambre_commerce',label:"Chambre de Commerce délivrant le carnet",type:'text',required:true},
      {key:'marchandise_ata',label:"Marchandises couvertes par le carnet ATA",type:'textarea',required:true},
      {key:'pays_visites',label:"Pays d'utilisation prévus",type:'text',required:true},
      {key:'date_validite',label:"Date de validité du carnet ATA",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — CARNET ATA (IMPORTATION TEMPORAIRE)</h1><h2>1. Titulaire</h2><p><strong>{{titulaire}}</strong>. Carnet délivré par : <strong>{{chambre_commerce}}</strong>.</p><h2>2. Marchandises et Pays</h2><p>Marchandises : {{marchandise_ata}}. Pays d'utilisation : <strong>{{pays_visites}}</strong>.</p><h2>3. Validité</h2><p>Date de validité : {{date_validite}}. Le carnet ATA est reconnu dans tous les pays membres de la Convention ATA et permet l'importation temporaire sans paiement des droits et taxes.</p></div>`
  },
  {
    code: 'doua2_recours_douanier',
    name: "Accord de Service de Recours Douanier (Commission Contentieux DGD CI)",
    category: 'commercial_financier', price: 5000, priceMax: 15000,
    description: "Convention de représentation et d'assistance dans le cadre d'un recours administratif ou contentieux douanier devant la Commission des Infractions de la DGD CI.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'operateur',label:"Opérateur faisant l'objet du recours",type:'text',required:true},
      {key:'conseil',label:"Conseil/représentant juridique",type:'text',required:true},
      {key:'nature_litige',label:"Nature du litige douanier",type:'textarea',required:true},
      {key:'montant_en_litige',label:"Montant des droits en litige (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RECOURS DOUANIER</h1><h2>1. Parties</h2><p>Opérateur : <strong>{{operateur}}</strong>. Conseil : <strong>{{conseil}}</strong>.</p><h2>2. Litige</h2><p>Nature du litige : {{nature_litige}}. Montant en litige : <strong>{{montant_en_litige}}</strong> FCFA.</p><h2>3. Mission</h2><p>Le conseil est mandaté pour assister l'opérateur devant la Commission des Infractions Douanières de la DGD CI, déposer les mémoires en défense, négocier les transactions et représenter l'opérateur en cas de recours judiciaire.</p></div>`
  },
  {
    code: 'doua2_oea',
    name: "Accord de Service d'Agrément Opérateur Économique Agréé (OEA CI)",
    category: 'commercial_financier', price: 6000, priceMax: 18000,
    description: "Convention d'accompagnement pour l'obtention du statut d'Opérateur Économique Agréé (OEA) auprès de la DGD CI, permettant des procédures douanières simplifiées.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 73,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise candidate au statut OEA",type:'text',required:true},
      {key:'cabinet_accompagnement',label:"Cabinet d'accompagnement",type:'text',required:true},
      {key:'type_oea',label:"Type d'OEA demandé (sécurité, simplification, combiné)",type:'text',required:true},
      {key:'date_depot_dossier',label:"Date de dépôt du dossier prévue",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — AGRÉMENT OPÉRATEUR ÉCONOMIQUE AGRÉÉ (OEA CI)</h1><h2>1. Parties</h2><p>Entreprise candidate : <strong>{{entreprise}}</strong>. Cabinet d'accompagnement : <strong>{{cabinet_accompagnement}}</strong>.</p><h2>2. Demande OEA</h2><p>Type d'OEA : <strong>{{type_oea}}</strong>. Dépôt du dossier prévu le : {{date_depot_dossier}}.</p><h2>3. Avantages OEA</h2><p>Le statut OEA accordé par la DGD CI permet à l'entreprise de bénéficier de procédures simplifiées : dédouanement prioritaire, contrôles réduits, accès au dédouanement à domicile et reconnaissance mutuelle avec les douanes des pays partenaires.</p></div>`
  },
  {
    code: 'doua2_precontrole',
    name: "Accord de Service de Précontrôle Douanier (Déclaration Anticipée)",
    category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Convention de service de précontrôle douanier et de déclaration anticipée permettant d'accélérer la mainlevée des marchandises dès leur arrivée au port ou à l'aéroport.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 75,
    fieldsJson: F([
      {key:'operateur',label:"Opérateur bénéficiaire",type:'text',required:true},
      {key:'prestataire',label:"Prestataire de précontrôle agréé",type:'text',required:true},
      {key:'marchandise',label:"Nature des marchandises concernées",type:'textarea',required:true},
      {key:'delai_anticipe',label:"Délai de dépôt anticipé de la déclaration (jours)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRÉCONTRÔLE DOUANIER (DÉCLARATION ANTICIPÉE)</h1><h2>1. Parties</h2><p>Opérateur : <strong>{{operateur}}</strong>. Prestataire : <strong>{{prestataire}}</strong>.</p><h2>2. Opération</h2><p>Marchandises : {{marchandise}}. Délai de dépôt anticipé : <strong>{{delai_anticipe}}</strong> jours avant arrivée.</p><h2>3. Bénéfices</h2><p>La déclaration anticipée permet l'obtention du bon à enlever avant l'arrivée physique des marchandises, réduisant significativement les délais de séjour et les coûts de surestarie au Port Autonome d'Abidjan.</p></div>`
  },
  {
    code: 'doua2_inspection_visite',
    name: "Accord de Service d'Inspection et Visite Douanière",
    category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Convention d'assistance lors des opérations d'inspection et de visite douanière des marchandises par les agents de la DGD CI, avec représentation et conseil de l'opérateur.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'operateur',label:"Opérateur faisant l'objet de la visite",type:'text',required:true},
      {key:'assistant_douanier',label:"Assistant/conseil douanier",type:'text',required:true},
      {key:'lieu_visite',label:"Lieu de la visite douanière",type:'text',required:true},
      {key:'marchandise_visitee',label:"Description des marchandises visitées",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'INSPECTION ET VISITE DOUANIÈRE</h1><h2>1. Parties</h2><p>Opérateur : <strong>{{operateur}}</strong>. Assistant douanier : <strong>{{assistant_douanier}}</strong>.</p><h2>2. Visite</h2><p>Lieu : <strong>{{lieu_visite}}</strong>. Marchandises visitées : {{marchandise_visitee}}</p><h2>3. Mission</h2><p>L'assistant douanier accompagne l'opérateur lors de la visite physique des marchandises par les agents de la DGD CI, assure la présence des documents requis et conseille l'opérateur sur ses droits et obligations.</p></div>`
  },
  {
    code: 'doua2_scanner_conteneur',
    name: "Accord de Service de Scanner de Conteneur (Port d'Abidjan)",
    category: 'commercial_financier', price: 3500, priceMax: 10500,
    description: "Convention de service de passage au scanner de conteneurs au Port Autonome d'Abidjan pour la vérification non intrusive du contenu des unités de chargement.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'operateur',label:"Opérateur/importateur",type:'text',required:true},
      {key:'numero_conteneur',label:"Numéro(s) de conteneur à scanner",type:'text',required:true},
      {key:'port_terminal',label:"Terminal portuaire (ex: SETV, TC2)",type:'text',required:true},
      {key:'date_scan',label:"Date de passage au scanner",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SCANNER DE CONTENEUR — PORT D'ABIDJAN</h1><h2>1. Opérateur</h2><p><strong>{{operateur}}</strong></p><h2>2. Conteneur et Terminal</h2><p>Numéro(s) de conteneur : <strong>{{numero_conteneur}}</strong>. Terminal : <strong>{{port_terminal}}</strong>. Date de scan : {{date_scan}}.</p><h2>3. Procédure</h2><p>Le passage au scanner est effectué conformément aux procédures de la DGD CI et du Port Autonome d'Abidjan. Le rapport d'imagerie est transmis aux agents douaniers pour analyse et décision de ciblage.</p></div>`
  },
  {
    code: 'doua2_infractions_douanieres',
    name: "Accord de Service de Gestion des Infractions Douanières",
    category: 'commercial_financier', price: 5000, priceMax: 16000,
    description: "Convention d'accompagnement juridique et administratif dans la gestion des infractions douanières, négociation de transactions et représentation devant les instances compétentes.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 66,
    fieldsJson: F([
      {key:'contrevenant',label:"Opérateur contrevenant",type:'text',required:true},
      {key:'conseil',label:"Conseil spécialisé en droit douanier",type:'text',required:true},
      {key:'nature_infraction',label:"Nature de l'infraction douanière",type:'textarea',required:true},
      {key:'amende_notifiee',label:"Montant de l'amende notifiée (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GESTION DES INFRACTIONS DOUANIÈRES</h1><h2>1. Parties</h2><p>Opérateur : <strong>{{contrevenant}}</strong>. Conseil : <strong>{{conseil}}</strong>.</p><h2>2. Infraction</h2><p>Nature : {{nature_infraction}}. Amende notifiée : <strong>{{amende_notifiee}}</strong> FCFA.</p><h2>3. Stratégie de Défense</h2><p>Le conseil analyse le procès-verbal d'infraction, identifie les vices de procédure éventuels, prépare les observations écrites et négocie une transaction douanière avec la DGD CI dans le cadre des dispositions du Code des Douanes de Côte d'Ivoire.</p></div>`
  },
  {
    code: 'doua2_caution_douane',
    name: "Accord de Service de Caution en Douane (Commissionnaire Agréé)",
    category: 'commercial_financier', price: 4500, priceMax: 13500,
    description: "Convention de cautionnement douanier pour couvrir les droits et taxes suspendus dans le cadre des régimes économiques (transit, entrepôt, AT, transformation).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 74,
    fieldsJson: F([
      {key:'principal',label:"Débiteur principal (titulaire du régime)",type:'text',required:true},
      {key:'caution',label:"Caution (banque ou commissionnaire agréé)",type:'text',required:true},
      {key:'montant_caution',label:"Montant de la caution douanière (FCFA)",type:'text',required:true},
      {key:'regime_couvert',label:"Régime douanier couvert",type:'text',required:true},
      {key:'duree_caution',label:"Durée de la caution",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CAUTION EN DOUANE</h1><h2>1. Parties</h2><p>Débiteur principal : <strong>{{principal}}</strong>. Caution : <strong>{{caution}}</strong>.</p><h2>2. Garantie</h2><p>Montant cautionné : <strong>{{montant_caution}}</strong> FCFA. Régime couvert : <strong>{{regime_couvert}}</strong>. Durée : <strong>{{duree_caution}}</strong>.</p><h2>3. Engagement de la Caution</h2><p>La caution s'engage solidairement avec le débiteur principal à payer à la DGD CI, à première demande, les droits et taxes exigibles en cas de défaillance du débiteur principal dans l'apurement du régime douanier.</p></div>`
  },
  {
    code: 'doua2_suivi_marchandises',
    name: "Accord de Service de Suivi des Marchandises sous Douane",
    category: 'commercial_financier', price: 3500, priceMax: 10500,
    description: "Convention de suivi et traçabilité des marchandises placées sous un régime douanier suspensif, avec alertes d'échéance et rapports de situation.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'client',label:"Client (titulaire du régime)",type:'text',required:true},
      {key:'prestataire_suivi',label:"Prestataire de suivi douanier",type:'text',required:true},
      {key:'regime_concerne',label:"Régime douanier concerné",type:'text',required:true},
      {key:'frequence_reporting',label:"Fréquence des rapports de suivi",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SUIVI DES MARCHANDISES SOUS DOUANE</h1><h2>1. Parties</h2><p>Client : <strong>{{client}}</strong>. Prestataire : <strong>{{prestataire_suivi}}</strong>.</p><h2>2. Périmètre</h2><p>Régime concerné : <strong>{{regime_concerne}}</strong>. Fréquence des rapports : <strong>{{frequence_reporting}}</strong>.</p><h2>3. Livrables</h2><p>Le prestataire assure le suivi en temps réel de toutes les marchandises sous douane, émet des alertes 15 jours avant les échéances de régime et produit des rapports de situation réguliers transmis au client et à son commissionnaire en douane.</p></div>`
  },
  {
    code: 'doua2_frappe_produits',
    name: "Accord de Service de Frappe des Produits Sensibles (Vérificateur Privé)",
    category: 'commercial_financier', price: 4500, priceMax: 13500,
    description: "Convention de vérification physique et de frappe des produits sensibles soumis à des droits d'accises ou restrictions spécifiques par un vérificateur privé agréé DGD CI.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 67,
    fieldsJson: F([
      {key:'operateur',label:"Opérateur importateur",type:'text',required:true},
      {key:'verificateur_prive',label:"Vérificateur privé agréé DGD CI",type:'text',required:true},
      {key:'produits_sensibles',label:"Produits sensibles concernés",type:'textarea',required:true},
      {key:'quantite',label:"Quantité à vérifier/frapper",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FRAPPE DES PRODUITS SENSIBLES</h1><h2>1. Parties</h2><p>Opérateur : <strong>{{operateur}}</strong>. Vérificateur privé agréé : <strong>{{verificateur_prive}}</strong>.</p><h2>2. Produits</h2><p>Produits sensibles : {{produits_sensibles}}. Quantité : <strong>{{quantite}}</strong>.</p><h2>3. Mission</h2><p>Le vérificateur privé procède à la vérification physique des produits sensibles (alcools, tabacs, produits pétroliers, etc.), au marquage réglementaire et à l'établissement du procès-verbal de frappe conformément aux instructions de la DGD CI.</p></div>`
  },
  {
    code: 'doua2_paiement_sydaonia',
    name: "Accord de Service de Paiement des Droits et Taxes (SYDAonia CI)",
    category: 'commercial_financier', price: 3500, priceMax: 10500,
    description: "Convention de gestion des paiements électroniques des droits et taxes douanières via la plateforme SYDAonia de la DGD CI, avec réconciliation comptable.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 76,
    fieldsJson: F([
      {key:'assujetti',label:"Assujetti (importateur/exportateur)",type:'text',required:true},
      {key:'mandataire_paiement',label:"Mandataire pour le paiement SYDAonia",type:'text',required:true},
      {key:'mode_paiement',label:"Mode de paiement utilisé (virement, chèque certifié, mobile money)",type:'text',required:true},
      {key:'plafond_mensuel',label:"Plafond mensuel de paiement autorisé (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PAIEMENT DES DROITS ET TAXES — SYDAonia CI</h1><h2>1. Parties</h2><p>Assujetti : <strong>{{assujetti}}</strong>. Mandataire SYDAonia : <strong>{{mandataire_paiement}}</strong>.</p><h2>2. Paramètres de Paiement</h2><p>Mode de paiement : <strong>{{mode_paiement}}</strong>. Plafond mensuel : <strong>{{plafond_mensuel}}</strong> FCFA.</p><h2>3. Obligations</h2><p>Le mandataire s'engage à effectuer tous les paiements de droits et taxes via la plateforme SYDAonia de la DGD CI, à conserver les preuves de paiement et à transmettre une réconciliation comptable mensuelle à l'assujetti.</p></div>`
  },
  {
    code: 'doua2_reclamation_dgdi',
    name: "Accord de Service de Réclamation DGDI CI",
    category: 'commercial_financier', price: 5000, priceMax: 15000,
    description: "Convention d'assistance à la rédaction et au suivi de réclamations administratives auprès de la Direction Générale des Douanes et Impôts (DGDI) de Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 64,
    fieldsJson: F([
      {key:'reclamant',label:"Réclamant (opérateur économique)",type:'text',required:true},
      {key:'conseil_reclamation',label:"Conseil en charge de la réclamation",type:'text',required:true},
      {key:'objet_reclamation',label:"Objet de la réclamation",type:'textarea',required:true},
      {key:'montant_reclame',label:"Montant réclamé ou en litige (FCFA)",type:'text',required:true},
      {key:'date_depot',label:"Date de dépôt prévue",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RÉCLAMATION DGDI CI</h1><h2>1. Parties</h2><p>Réclamant : <strong>{{reclamant}}</strong>. Conseil : <strong>{{conseil_reclamation}}</strong>.</p><h2>2. Réclamation</h2><p>Objet : {{objet_reclamation}}. Montant : <strong>{{montant_reclame}}</strong> FCFA. Dépôt prévu le : {{date_depot}}.</p><h2>3. Procédure</h2><p>Le conseil prépare la réclamation administrative adressée au Directeur Général des Douanes, avec tous les documents justificatifs requis, et assure le suivi auprès des services compétents jusqu'à décision définitive.</p></div>`
  },
  {
    code: 'doua2_liasse_documentaire',
    name: "Accord de Service de Dépôt et Préparation de Liasse Documentaire",
    category: 'commercial_financier', price: 3500, priceMax: 10500,
    description: "Convention de préparation, vérification et dépôt de la liasse documentaire douanière complète (facture, colisage, connaissement, certificats) auprès de la DGD CI.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 82,
    fieldsJson: F([
      {key:'client',label:"Client (importateur/exportateur)",type:'text',required:true},
      {key:'prestataire_doc',label:"Prestataire documentaire",type:'text',required:true},
      {key:'type_operation',label:"Type d'opération douanière",type:'text',required:true},
      {key:'liste_documents',label:"Liste des documents à préparer",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRÉPARATION DE LIASSE DOCUMENTAIRE</h1><h2>1. Parties</h2><p>Client : <strong>{{client}}</strong>. Prestataire : <strong>{{prestataire_doc}}</strong>.</p><h2>2. Mission</h2><p>Type d'opération : <strong>{{type_operation}}</strong>.</p><h2>3. Documents à Préparer</h2><p>{{liste_documents}}</p><h2>4. Délais</h2><p>Le prestataire s'engage à remettre la liasse documentaire complète et conforme aux exigences de la DGD CI dans les délais convenus, permettant le dépôt de la déclaration en détail sans interruption de procédure.</p></div>`
  },
  {
    code: 'doua2_consultation_tarifaire',
    name: "Accord de Service de Consultation Tarifaire (Nomenclature CI)",
    category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Convention de consultation et d'avis sur le classement tarifaire des marchandises selon la nomenclature douanière harmonisée applicable en Côte d'Ivoire et dans l'UEMOA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 71,
    fieldsJson: F([
      {key:'client',label:"Client demandeur d'avis tarifaire",type:'text',required:true},
      {key:'expert_douanier',label:"Expert en classification tarifaire",type:'text',required:true},
      {key:'produit_classe',label:"Description précise du produit à classer",type:'textarea',required:true},
      {key:'position_suggeree',label:"Position tarifaire suggérée (SH 6 chiffres)",type:'text',required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CONSULTATION TARIFAIRE</h1><h2>1. Parties</h2><p>Client : <strong>{{client}}</strong>. Expert tarifaire : <strong>{{expert_douanier}}</strong>.</p><h2>2. Produit à Classer</h2><p>{{produit_classe}}</p><h2>3. Avis Tarifaire</h2><p>Position SH suggérée : <strong>{{position_suggeree}}</strong>. L'expert fournit un avis motivé sur le classement tarifaire du produit dans la Nomenclature Combinée de l'UEMOA et les taux de droits applicables (TEC CEDEAO, droits spécifiques CI).</p></div>`
  },
  {
    code: 'doua2_formation_douane',
    name: "Accord de Service de Formation Douane (Transitaires CI)",
    category: 'commercial_financier', price: 4500, priceMax: 13500,
    description: "Convention de formation professionnelle en réglementation et procédures douanières pour les équipes de transitaires, commissionnaires et opérateurs du commerce international en CI.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 67,
    fieldsJson: F([
      {key:'organisme_formation',label:"Organisme de formation",type:'text',required:true},
      {key:'entreprise_formee',label:"Entreprise bénéficiaire de la formation",type:'text',required:true},
      {key:'contenu_formation',label:"Contenu et modules de formation",type:'textarea',required:true},
      {key:'duree_formation',label:"Durée totale de la formation",type:'text',required:true},
      {key:'date_debut',label:"Date de début de la formation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FORMATION DOUANE — TRANSITAIRES CI</h1><h2>1. Parties</h2><p>Organisme de formation : <strong>{{organisme_formation}}</strong>. Entreprise bénéficiaire : <strong>{{entreprise_formee}}</strong>.</p><h2>2. Programme</h2><p>Contenu : {{contenu_formation}}. Durée : <strong>{{duree_formation}}</strong>. Début : {{date_debut}}.</p><h2>3. Certification</h2><p>À l'issue de la formation, une attestation de participation est délivrée par l'organisme de formation. Le programme est conforme aux standards de compétences de la Fédération des Transitaires et Commissionnaires en Douane de Côte d'Ivoire.</p></div>`
  },
  {
    code: 'doua2_rapport_operations',
    name: "Rapport d'Opérations Douanières",
    category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Rapport périodique récapitulant toutes les opérations douanières réalisées pour le compte d'un opérateur : statistiques, coûts, délais et indicateurs de performance.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'operateur',label:"Opérateur économique",type:'text',required:true},
      {key:'periode_rapport',label:"Période couverte par le rapport",type:'text',required:true},
      {key:'commissionnaire',label:"Commissionnaire en douane rapporteur",type:'text',required:true},
      {key:'synthese',label:"Synthèse des opérations et observations",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT D'OPÉRATIONS DOUANIÈRES</h1><h2>Opérateur : {{operateur}}</h2><h2>Période : {{periode_rapport}}</h2><p>Commissionnaire : <strong>{{commissionnaire}}</strong></p><h2>1. Synthèse</h2><p>{{synthese}}</p><h2>2. Statistiques des Opérations</h2><p>Le présent rapport détaille le nombre de déclarations déposées, les régimes douaniers utilisés, les délais moyens de dédouanement, les droits et taxes acquittés et les incidents enregistrés durant la période.</p><h2>3. Recommandations</h2><p>Des recommandations sont formulées pour optimiser les procédures douanières et réduire les coûts et délais de dédouanement lors des prochaines périodes.</p></div>`
  },
  {
    code: 'doua2_plan_conformite',
    name: "Plan de Conformité Douanière",
    category: 'commercial_financier', price: 5000, priceMax: 15000,
    description: "Plan stratégique de mise en conformité douanière pour un opérateur économique ivoirien : audit, actions correctives, procédures internes et objectifs OEA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise bénéficiaire",type:'text',required:true},
      {key:'responsable_conformite',label:"Responsable conformité douanière",type:'text',required:true},
      {key:'axes_amelioration',label:"Axes d'amélioration identifiés",type:'textarea',required:true},
      {key:'horizon_plan',label:"Horizon du plan de conformité",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE CONFORMITÉ DOUANIÈRE</h1><h2>Entreprise : {{entreprise}}</h2><p>Responsable : <strong>{{responsable_conformite}}</strong>. Horizon : <strong>{{horizon_plan}}</strong>.</p><h2>1. Diagnostic de Conformité</h2><p>Axes d'amélioration : {{axes_amelioration}}</p><h2>2. Actions Correctives</h2><p>Le plan détaille les mesures à mettre en place pour corriger les non-conformités identifiées lors de l'audit douanier interne : mise à jour des procédures, formation des équipes, amélioration des contrôles documentaires.</p><h2>3. Objectif OEA</h2><p>Le présent plan vise à préparer l'entreprise à l'obtention du statut d'Opérateur Économique Agréé (OEA) auprès de la DGD CI dans l'horizon prévu.</p></div>`
  },
  {
    code: 'doua2_charte_conformite',
    name: "Charte de la Conformité Douanière et du Commerce Légal",
    category: 'commercial_financier', price: 3000, priceMax: 9000,
    description: "Charte d'engagement à la conformité douanière et au commerce légal, signée par l'opérateur économique pour matérialiser son adhésion aux principes de légalité et d'éthique douanière.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      {key:'operateur',label:"Opérateur économique signataire",type:'text',required:true},
      {key:'dirigeant',label:"Dirigeant signataire",type:'text',required:true},
      {key:'date_signature',label:"Date de signature de la charte",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE LA CONFORMITÉ DOUANIÈRE ET DU COMMERCE LÉGAL</h1><p>L'opérateur <strong>{{operateur}}</strong>, représenté par son dirigeant <strong>{{dirigeant}}</strong>, soussigné, déclare adhérer en date du {{date_signature}} aux principes suivants :</p><h2>1. Légalité des Opérations</h2><p>Engagement à n'importer ou exporter que des marchandises légalement autorisées, en respectant toutes les prohibitions, restrictions et réglementations en vigueur en Côte d'Ivoire.</p><h2>2. Exactitude des Déclarations</h2><p>Engagement à déclarer la valeur, la quantité, l'origine et la nature exactes des marchandises aux autorités douanières, sans sous-facturation, fausse déclaration ni dissimulation.</p><h2>3. Lutte contre la Fraude et la Contrebande</h2><p>Refus absolu de tout recours à la contrebande, à la corruption douanière ou à tout autre mécanisme frauduleux dans les opérations de commerce international.</p><h2>4. Coopération avec les Autorités</h2><p>Engagement à coopérer pleinement avec la Direction Générale des Douanes de Côte d'Ivoire et à mettre à sa disposition les documents et informations requis lors de tout contrôle ou audit douanier.</p></div>`
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
  console.log(`Batch 107b OK — créés:${created} maj:${updated} TOTAL:${total}`);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
