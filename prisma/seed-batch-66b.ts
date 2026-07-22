import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ─── 25 AVIATION CIVILE (avia2_) ───
  {
    code: 'avia2_transport_regulier',
    name: "Accord de service de transport aérien régulier (ACNUSA)",
    category: 'transport_logistique', price: 12000, priceMax: 36000,
    description: "Accord cadre entre compagnies aériennes ou avec un aéroport pour l'exploitation de liaisons aériennes régulières conformément aux réglementations ACNUSA et OACI.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'compagnie_aerienne',label:"Dénomination de la compagnie aérienne",type:'text',required:true},
      {key:'aeroport_depart',label:"Aéroport de départ",type:'text',required:true},
      {key:'aeroport_arrivee',label:"Aéroport d'arrivée",type:'text',required:true},
      {key:'frequence_vols',label:"Fréquence des vols (ex: 3 vols/semaine)",type:'text',required:true},
      {key:'date_debut',label:"Date de début d'exploitation",type:'date',required:true},
      {key:'date_fin',label:"Date de fin d'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TRANSPORT AÉRIEN RÉGULIER</h1><p>Entre la compagnie aérienne <strong>{{compagnie_aerienne}}</strong> et l'autorité aéroportuaire compétente, il est convenu ce qui suit :</p><h2>Article 1 — Objet</h2><p>Le présent accord définit les conditions d'exploitation des liaisons aériennes régulières entre <strong>{{aeroport_depart}}</strong> et <strong>{{aeroport_arrivee}}</strong>, à raison de <strong>{{frequence_vols}}</strong>.</p><h2>Article 2 — Durée</h2><p>L'accord prend effet le <strong>{{date_debut}}</strong> et expire le <strong>{{date_fin}}</strong>.</p><h2>Article 3 — Obligations des parties</h2><p>La compagnie s'engage à respecter les créneaux attribués, les normes de sécurité OACI et les exigences de ponctualité fixées par l'autorité compétente.</p><h2>Article 4 — Droit applicable</h2><p>Le présent accord est régi par le droit ivoirien et les conventions internationales de l'aviation civile auxquelles la Côte d'Ivoire est partie.</p></div>`
  },
  {
    code: 'avia2_charter',
    name: "Accord de service de charter aérien",
    category: 'transport_logistique', price: 9000, priceMax: 27000,
    description: "Contrat d'affrètement de vols charter entre un organisateur de voyages ou une entreprise et une compagnie aérienne pour des vols non réguliers.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'affréteur',label:"Nom de l'affréteur",type:'text',required:true},
      {key:'compagnie_aerienne',label:"Compagnie aérienne affrétée",type:'text',required:true},
      {key:'trajet',label:"Trajet (départ — arrivée)",type:'text',required:true},
      {key:'date_vol',label:"Date du vol charter",type:'date',required:true},
      {key:'nombre_sieges',label:"Nombre de sièges réservés",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CHARTER AÉRIEN</h1><p><strong>{{affréteur}}</strong> (ci-après l'Affréteur) et <strong>{{compagnie_aerienne}}</strong> (ci-après le Transporteur) conviennent :</p><h2>Article 1 — Objet</h2><p>Le Transporteur met à disposition de l'Affréteur un aéronef pour effectuer le vol <strong>{{trajet}}</strong> le <strong>{{date_vol}}</strong> pour <strong>{{nombre_sieges}}</strong> passagers.</p><h2>Article 2 — Prix et conditions de paiement</h2><p>Le prix global de l'affrètement est arrêté d'un commun accord. Un acompte de 30 % est versé à la signature, le solde 72 heures avant le départ.</p><h2>Article 3 — Responsabilités</h2><p>Le Transporteur est seul responsable de la sécurité du vol. L'Affréteur est responsable de la liste des passagers et des formalités d'embarquement.</p></div>`
  },
  {
    code: 'avia2_acmi',
    name: "Accord d'affrètement d'aéronef (contrat ACMI)",
    category: 'transport_logistique', price: 15000, priceMax: 45000,
    description: "Contrat ACMI (Aircraft, Crew, Maintenance, Insurance) par lequel un loueur met à disposition un aéronef avec équipage, maintenance et assurance.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 58,
    fieldsJson: F([
      {key:'loueur',label:"Dénomination du loueur (lessor)",type:'text',required:true},
      {key:'locataire',label:"Dénomination du locataire (lessee)",type:'text',required:true},
      {key:'type_aeronef',label:"Type et immatriculation de l'aéronef",type:'text',required:true},
      {key:'date_debut',label:"Date de début du contrat ACMI",type:'date',required:true},
      {key:'duree_contrat',label:"Durée du contrat (mois)",type:'text',required:true},
      {key:'heures_garanties',label:"Heures de vol minimales garanties/mois",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT ACMI — AFFRÈTEMENT D'AÉRONEF AVEC ÉQUIPAGE, MAINTENANCE ET ASSURANCE</h1><p>Entre <strong>{{loueur}}</strong> (Loueur) et <strong>{{locataire}}</strong> (Locataire), il est convenu :</p><h2>Article 1 — Objet</h2><p>Le Loueur met à disposition le <strong>{{type_aeronef}}</strong> avec équipage qualifié, maintenance certifiée et couverture assurance complète pour une durée de <strong>{{duree_contrat}}</strong> mois à compter du <strong>{{date_debut}}</strong>.</p><h2>Article 2 — Heures garanties</h2><p>Le Locataire garantit un minimum de <strong>{{heures_garanties}}</strong> heures de vol par mois. Les heures non consommées restent dues.</p><h2>Article 3 — Responsabilités opérationnelles</h2><p>Le Loueur conserve le contrôle opérationnel de l'aéronef. Le Locataire assure le contrôle commercial des vols effectués sous son code IATA.</p></div>`
  },
  {
    code: 'avia2_handling',
    name: "Accord de service d'assistance en escale (handling)",
    category: 'transport_logistique', price: 8000, priceMax: 24000,
    description: "Accord entre une compagnie aérienne et un prestataire de handling aéroportuaire pour les services d'assistance au sol (piste, passagers, bagages, fret).",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'compagnie_cliente',label:"Compagnie aérienne cliente",type:'text',required:true},
      {key:'prestataire_handling',label:"Prestataire d'assistance en escale",type:'text',required:true},
      {key:'aeroport',label:"Aéroport concerné",type:'text',required:true},
      {key:'services_inclus',label:"Liste des services inclus (piste, passagers, fret...)",type:'textarea',required:true},
      {key:'date_effet',label:"Date d'entrée en vigueur",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ASSISTANCE EN ESCALE (HANDLING)</h1><p><strong>{{compagnie_cliente}}</strong> et <strong>{{prestataire_handling}}</strong> concluent le présent accord pour l'aéroport de <strong>{{aeroport}}</strong>.</p><h2>Article 1 — Services fournis</h2><p>Le Prestataire assure les services suivants : <strong>{{services_inclus}}</strong>, conformément aux standards IATA Ground Operations Manual (IGOM).</p><h2>Article 2 — Niveaux de service (SLA)</h2><p>Les délais de rotation minimaux sont définis en annexe. Tout dépassement donne lieu à pénalités contractuelles.</p><h2>Article 3 — Durée et résiliation</h2><p>L'accord prend effet le <strong>{{date_effet}}</strong> pour une durée d'un an renouvelable tacitement, avec préavis de 90 jours.</p></div>`
  },
  {
    code: 'avia2_catering',
    name: "Accord de service de catering aérien",
    category: 'transport_logistique', price: 7000, priceMax: 21000,
    description: "Contrat de fourniture de repas et prestations de restauration à bord des aéronefs entre une compagnie aérienne et un fournisseur de catering aérien.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'compagnie_aerienne',label:"Compagnie aérienne",type:'text',required:true},
      {key:'fournisseur_catering',label:"Fournisseur de catering aérien",type:'text',required:true},
      {key:'aeroport_base',label:"Aéroport de base du catering",type:'text',required:true},
      {key:'type_repas',label:"Types de repas et classes de service",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CATERING AÉRIEN</h1><p>Entre <strong>{{compagnie_aerienne}}</strong> et <strong>{{fournisseur_catering}}</strong> pour les vols au départ de <strong>{{aeroport_base}}</strong>.</p><h2>Article 1 — Prestations</h2><p>Le Fournisseur prépare et livre les repas et boissons suivants : <strong>{{type_repas}}</strong>, conformément aux spécifications de la compagnie et aux normes HACCP.</p><h2>Article 2 — Délais de livraison</h2><p>Les repas sont livrés au moins 2 heures avant le départ de chaque vol. Les menus spéciaux (SPML) doivent être commandés 24h à l'avance.</p><h2>Article 3 — Hygiène et traçabilité</h2><p>Le Fournisseur garantit la traçabilité complète des denrées, la chaîne du froid et les certifications sanitaires requises.</p></div>`
  },
  {
    code: 'avia2_fuel',
    name: "Accord de service de carburant aviation (fuel)",
    category: 'transport_logistique', price: 10000, priceMax: 30000,
    description: "Contrat d'approvisionnement en carburant aviation (Jet A-1, Avgas) entre une compagnie aérienne ou un opérateur et un fournisseur de carburant aéroportuaire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'compagnie_cliente',label:"Compagnie cliente / opérateur",type:'text',required:true},
      {key:'fournisseur_fuel',label:"Fournisseur de carburant aviation",type:'text',required:true},
      {key:'type_carburant',label:"Type de carburant (Jet A-1, Avgas...)",type:'text',required:true},
      {key:'volume_annuel',label:"Volume annuel estimé (litres)",type:'text',required:true},
      {key:'aeroport',label:"Aéroport(s) d'avitaillement",type:'text',required:true},
      {key:'date_debut',label:"Date de début du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CARBURANT AVIATION</h1><p>Entre <strong>{{compagnie_cliente}}</strong> et <strong>{{fournisseur_fuel}}</strong>, fournisseur accrédité sur l'aéroport de <strong>{{aeroport}}</strong>.</p><h2>Article 1 — Objet</h2><p>Le Fournisseur assure l'avitaillement en <strong>{{type_carburant}}</strong> pour un volume annuel estimé à <strong>{{volume_annuel}}</strong> litres, à compter du <strong>{{date_debut}}</strong>.</p><h2>Article 2 — Qualité et normes</h2><p>Le carburant est fourni conformément aux spécifications DEF STAN 91-091 (Jet A-1) et ASTM D910 (Avgas). Des prélèvements sont effectués à chaque avitaillement.</p><h2>Article 3 — Prix et révision</h2><p>Le prix est indexé sur le cours du pétrole (Platts CIF NWE Jet). La révision tarifaire est mensuelle.</p></div>`
  },
  {
    code: 'avia2_mro',
    name: "Accord de service de maintenance aéronef (MRO)",
    category: 'transport_logistique', price: 18000, priceMax: 54000,
    description: "Contrat de maintenance, réparation et révision (MRO) d'aéronefs entre une compagnie aérienne et un organisme de maintenance agréé ANAC.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      {key:'compagnie_aerienne',label:"Compagnie aérienne propriétaire",type:'text',required:true},
      {key:'organisme_mro',label:"Organisme MRO agréé (n° agrément ANAC)",type:'text',required:true},
      {key:'type_aeronef',label:"Type(s) d'aéronef couverts",type:'text',required:true},
      {key:'niveau_maintenance',label:"Niveau de maintenance (A/B/C/D check)",type:'text',required:true},
      {key:'date_debut',label:"Date de début du contrat",type:'date',required:true},
      {key:'duree_contrat',label:"Durée du contrat (années)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MAINTENANCE AÉRONEF (MRO)</h1><p>Entre <strong>{{compagnie_aerienne}}</strong> et <strong>{{organisme_mro}}</strong>, organisme de maintenance agréé.</p><h2>Article 1 — Périmètre des travaux</h2><p>Le présent contrat couvre la maintenance de type <strong>{{niveau_maintenance}}</strong> sur les aéronefs <strong>{{type_aeronef}}</strong> pour une durée de <strong>{{duree_contrat}}</strong> ans à compter du <strong>{{date_debut}}</strong>.</p><h2>Article 2 — Agréments et certifications</h2><p>L'Organisme MRO garantit le maintien de ses agréments ANAC et PART-145 (le cas échéant) pendant toute la durée du contrat.</p><h2>Article 3 — Délais et garanties</h2><p>Les délais d'immobilisation sont fixés en annexe. L'Organisme garantit ses travaux pendant 6 mois ou jusqu'au prochain check planifié.</p></div>`
  },
  {
    code: 'avia2_formation_pilotes',
    name: "Accord de service de formation des pilotes",
    category: 'transport_logistique', price: 14000, priceMax: 42000,
    description: "Contrat de formation théorique et pratique de pilotes entre une compagnie aérienne et un organisme de formation agréé (ATO) conformément aux exigences ANAC.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 55,
    fieldsJson: F([
      {key:'compagnie_cliente',label:"Compagnie aérienne cliente",type:'text',required:true},
      {key:'organisme_ato',label:"Organisme de formation agréé ATO",type:'text',required:true},
      {key:'type_qualification',label:"Type de qualification visée (CPL, ATPL, TR...)",type:'text',required:true},
      {key:'nombre_stagiaires',label:"Nombre de stagiaires",type:'text',required:true},
      {key:'date_debut',label:"Date de début de la formation",type:'date',required:true},
      {key:'duree_formation',label:"Durée de la formation (mois)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FORMATION DES PILOTES</h1><p>Entre <strong>{{compagnie_cliente}}</strong> et l'ATO <strong>{{organisme_ato}}</strong>.</p><h2>Article 1 — Programme de formation</h2><p>L'ATO dispense la formation menant à l'obtention de la qualification <strong>{{type_qualification}}</strong> pour <strong>{{nombre_stagiaires}}</strong> stagiaires, sur une durée de <strong>{{duree_formation}}</strong> mois à compter du <strong>{{date_debut}}</strong>.</p><h2>Article 2 — Simulateurs et équipements</h2><p>La formation utilise des simulateurs de vol qualifiés FNPT II ou FFS Level D selon le programme approuvé par l'ANAC.</p><h2>Article 3 — Certification</h2><p>L'ATO s'engage à délivrer les attestations de formation conformes aux exigences de l'ANAC Côte d'Ivoire.</p></div>`
  },
  {
    code: 'avia2_formation_cabine',
    name: "Accord de service de formation du personnel de cabine",
    category: 'transport_logistique', price: 8000, priceMax: 24000,
    description: "Contrat de formation du personnel navigant commercial (PNC / hôtesses et stewards) entre une compagnie aérienne et un centre de formation agréé.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'compagnie_aerienne',label:"Compagnie aérienne",type:'text',required:true},
      {key:'centre_formation',label:"Centre de formation agréé",type:'text',required:true},
      {key:'modules_formation',label:"Modules de formation (sécurité, premiers secours, service...)",type:'textarea',required:true},
      {key:'nombre_pnc',label:"Nombre de PNC à former",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FORMATION DU PERSONNEL DE CABINE</h1><p>Entre <strong>{{compagnie_aerienne}}</strong> et <strong>{{centre_formation}}</strong>.</p><h2>Article 1 — Programme</h2><p>La formation porte sur les modules suivants : <strong>{{modules_formation}}</strong>, pour <strong>{{nombre_pnc}}</strong> personnels navigants commerciaux, à compter du <strong>{{date_debut}}</strong>.</p><h2>Article 2 — Conformité réglementaire</h2><p>La formation est dispensée conformément au règlement ANAC relatif aux PNC et aux standards IATA IOSA.</p><h2>Article 3 — Évaluation et certification</h2><p>Chaque stagiaire est évalué en fin de module. Les attestations sont délivrées après validation par le responsable formation.</p></div>`
  },
  {
    code: 'avia2_surete',
    name: "Accord de service de sécurité aéroportuaire (sûreté)",
    category: 'transport_logistique', price: 10000, priceMax: 30000,
    description: "Contrat de prestation de services de sûreté aéroportuaire (contrôle aux points de sûreté, filtrage, rondes) entre l'aéroport et une société de sécurité agréée.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 64,
    fieldsJson: F([
      {key:'autorite_aeroportuaire',label:"Autorité aéroportuaire",type:'text',required:true},
      {key:'prestataire_surete',label:"Prestataire de sûreté agréé",type:'text',required:true},
      {key:'aeroport',label:"Aéroport concerné",type:'text',required:true},
      {key:'perimetre_surete',label:"Périmètre des missions de sûreté",type:'textarea',required:true},
      {key:'date_debut',label:"Date de prise d'effet",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SÛRETÉ AÉROPORTUAIRE</h1><p>Entre <strong>{{autorite_aeroportuaire}}</strong> et <strong>{{prestataire_surete}}</strong> pour l'aéroport de <strong>{{aeroport}}</strong>.</p><h2>Article 1 — Missions</h2><p>Le Prestataire assure les missions suivantes : <strong>{{perimetre_surete}}</strong>, conformément au Programme National de Sûreté de l'Aviation Civile (PNSAC).</p><h2>Article 2 — Agrément et habilitations</h2><p>Le Prestataire justifie de son agrément délivré par l'ANAC et s'assure que tout son personnel dispose des habilitations requises.</p><h2>Article 3 — Reporting</h2><p>Des rapports d'incidents de sûreté sont transmis à l'Autorité aéroportuaire dans les 2 heures suivant tout événement.</p></div>`
  },
  {
    code: 'avia2_duty_free',
    name: "Accord de concession boutiques duty-free",
    category: 'transport_logistique', price: 12000, priceMax: 36000,
    description: "Contrat de concession commerciale pour l'exploitation de boutiques hors taxes (duty-free) dans l'enceinte aéroportuaire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      {key:'autorite_aeroportuaire',label:"Autorité aéroportuaire concédante",type:'text',required:true},
      {key:'concessionnaire',label:"Concessionnaire duty-free",type:'text',required:true},
      {key:'superficie_m2',label:"Superficie des locaux concédés (m²)",type:'text',required:true},
      {key:'redevance_annuelle',label:"Redevance annuelle ou % du CA",type:'text',required:true},
      {key:'date_debut',label:"Date de début de la concession",type:'date',required:true},
      {key:'date_fin',label:"Date de fin de la concession",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CONCESSION DE BOUTIQUES DUTY-FREE</h1><p>Entre <strong>{{autorite_aeroportuaire}}</strong> (le Concédant) et <strong>{{concessionnaire}}</strong> (le Concessionnaire).</p><h2>Article 1 — Objet</h2><p>Le Concédant accorde au Concessionnaire le droit d'exploiter des boutiques hors taxes d'une superficie de <strong>{{superficie_m2}}</strong> m² dans l'aéroport, du <strong>{{date_debut}}</strong> au <strong>{{date_fin}}</strong>.</p><h2>Article 2 — Redevances</h2><p>Le Concessionnaire verse une redevance de <strong>{{redevance_annuelle}}</strong>, payable trimestriellement.</p><h2>Article 3 — Régime douanier</h2><p>Les marchandises vendues sont soumises au régime de l'exportation. Le Concessionnaire tient une comptabilité matières conforme aux exigences douanières.</p></div>`
  },
  {
    code: 'avia2_parking',
    name: "Accord de service de gestion de parking aéroport",
    category: 'transport_logistique', price: 7000, priceMax: 21000,
    description: "Contrat de concession ou de gestion déléguée des parkings automobiles d'un aéroport entre l'autorité aéroportuaire et un gestionnaire de parking.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'autorite_aeroportuaire',label:"Autorité aéroportuaire",type:'text',required:true},
      {key:'gestionnaire_parking',label:"Gestionnaire de parking",type:'text',required:true},
      {key:'nombre_places',label:"Nombre de places de parking",type:'text',required:true},
      {key:'tarification',label:"Grille tarifaire (courte/longue durée)",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début de gestion",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GESTION DE PARKING AÉROPORT</h1><p>Entre <strong>{{autorite_aeroportuaire}}</strong> et <strong>{{gestionnaire_parking}}</strong>.</p><h2>Article 1 — Périmètre</h2><p>Le Gestionnaire prend en charge l'exploitation de <strong>{{nombre_places}}</strong> places de parking à compter du <strong>{{date_debut}}</strong>.</p><h2>Article 2 — Tarification</h2><p>La grille tarifaire applicable est la suivante : <strong>{{tarification}}</strong>. Toute modification tarifaire est soumise à l'approbation préalable de l'Autorité aéroportuaire.</p><h2>Article 3 — Reversement</h2><p>Le Gestionnaire reverse à l'Autorité une quote-part des recettes définie en annexe financière.</p></div>`
  },
  {
    code: 'avia2_restauration_aeroport',
    name: "Accord de concession restauration aéroport",
    category: 'transport_logistique', price: 9000, priceMax: 27000,
    description: "Contrat de concession pour l'exploitation de points de restauration (restaurants, cafés, snacks) dans l'enceinte aéroportuaire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'autorite_aeroportuaire',label:"Autorité aéroportuaire concédante",type:'text',required:true},
      {key:'restaurateur',label:"Restaurateur concessionnaire",type:'text',required:true},
      {key:'type_restauration',label:"Type(s) de restauration exploitée(s)",type:'text',required:true},
      {key:'superficie_m2',label:"Superficie totale (m²)",type:'text',required:true},
      {key:'date_debut',label:"Date d'ouverture",type:'date',required:true},
      {key:'date_fin',label:"Fin de la concession",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CONCESSION RESTAURATION AÉROPORT</h1><p>Entre <strong>{{autorite_aeroportuaire}}</strong> et <strong>{{restaurateur}}</strong>.</p><h2>Article 1 — Objet</h2><p>Le Restaurateur exploite les points de vente de type <strong>{{type_restauration}}</strong> sur une superficie de <strong>{{superficie_m2}}</strong> m², du <strong>{{date_debut}}</strong> au <strong>{{date_fin}}</strong>.</p><h2>Article 2 — Normes sanitaires</h2><p>Le Restaurateur respecte les normes HACCP et les exigences de la Direction des Services Vétérinaires. Les contrôles sont effectués trimestriellement.</p><h2>Article 3 — Image aéroportuaire</h2><p>La charte graphique, les tenues du personnel et la qualité du service respectent les standards imposés par l'Autorité aéroportuaire.</p></div>`
  },
  {
    code: 'avia2_navette',
    name: "Accord de service de navette aéroport-ville",
    category: 'transport_logistique', price: 6000, priceMax: 18000,
    description: "Contrat de service de transport en navette entre l'aéroport et le centre-ville, entre un opérateur de transport et l'autorité aéroportuaire ou une collectivité.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'operateur_transport',label:"Opérateur de transport (navette)",type:'text',required:true},
      {key:'autorite_contractante',label:"Autorité contractante",type:'text',required:true},
      {key:'trajet',label:"Trajet desservi (aéroport — ville)",type:'text',required:true},
      {key:'frequence',label:"Fréquence des navettes",type:'text',required:true},
      {key:'date_debut',label:"Date de début du service",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE NAVETTE AÉROPORT-VILLE</h1><p>Entre <strong>{{operateur_transport}}</strong> et <strong>{{autorite_contractante}}</strong>.</p><h2>Article 1 — Service</h2><p>L'Opérateur assure une navette régulière sur le trajet <strong>{{trajet}}</strong> avec une fréquence de <strong>{{frequence}}</strong>, à compter du <strong>{{date_debut}}</strong>.</p><h2>Article 2 — Qualité de service</h2><p>L'Opérateur garantit la ponctualité (ponctualité minimale de 90 %), la propreté des véhicules et la formation du personnel conducteur.</p><h2>Article 3 — Tarifs</h2><p>Les tarifs passagers sont fixés en concertation avec l'Autorité et affichés dans les véhicules et sur les points de vente.</p></div>`
  },
  {
    code: 'avia2_fret_aerien',
    name: "Accord de service de fret aérien",
    category: 'transport_logistique', price: 11000, priceMax: 33000,
    description: "Contrat de transport de marchandises par voie aérienne entre un chargeur ou un transitaire et une compagnie de fret aérien.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 67,
    fieldsJson: F([
      {key:'expediteur',label:"Expéditeur / chargeur",type:'text',required:true},
      {key:'compagnie_fret',label:"Compagnie de fret aérien",type:'text',required:true},
      {key:'nature_marchandises',label:"Nature des marchandises",type:'textarea',required:true},
      {key:'poids_volume',label:"Poids et volume estimés",type:'text',required:true},
      {key:'trajet',label:"Aéroport de départ — Aéroport de destination",type:'text',required:true},
      {key:'date_chargement',label:"Date de chargement prévue",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FRET AÉRIEN</h1><p>Entre <strong>{{expediteur}}</strong> et <strong>{{compagnie_fret}}</strong>.</p><h2>Article 1 — Marchandises</h2><p>La Compagnie prend en charge le transport des marchandises suivantes : <strong>{{nature_marchandises}}</strong>, d'un poids/volume de <strong>{{poids_volume}}</strong>, sur le trajet <strong>{{trajet}}</strong>, avec chargement le <strong>{{date_chargement}}</strong>.</p><h2>Article 2 — Documents de transport</h2><p>La Lettre de Transport Aérien (LTA) fait foi. L'Expéditeur est responsable de l'exactitude des déclarations douanières.</p><h2>Article 3 — Responsabilité</h2><p>La responsabilité de la Compagnie est limitée conformément à la Convention de Montréal de 1999.</p></div>`
  },
  {
    code: 'avia2_agent_fret_iata',
    name: "Accord de service d'agent de fret aérien (IATA)",
    category: 'transport_logistique', price: 9000, priceMax: 27000,
    description: "Contrat entre une compagnie aérienne et un agent de fret accrédité IATA pour la vente et la gestion des expéditions de fret aérien.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'compagnie_aerienne',label:"Compagnie aérienne mandante",type:'text',required:true},
      {key:'agent_fret',label:"Agent de fret accrédité IATA",type:'text',required:true},
      {key:'numero_iata',label:"Numéro d'accréditation IATA de l'agent",type:'text',required:true},
      {key:'territoire',label:"Territoire de compétence de l'agent",type:'text',required:true},
      {key:'date_effet',label:"Date d'entrée en vigueur",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'AGENT DE FRET AÉRIEN (IATA)</h1><p>Entre <strong>{{compagnie_aerienne}}</strong> et l'agent IATA <strong>{{agent_fret}}</strong> (n° <strong>{{numero_iata}}</strong>).</p><h2>Article 1 — Mandat</h2><p>La Compagnie mandate l'Agent pour commercialiser et gérer ses capacités de fret aérien sur le territoire de <strong>{{territoire}}</strong>, à compter du <strong>{{date_effet}}</strong>.</p><h2>Article 2 — Commissions</h2><p>L'Agent perçoit les commissions définies dans la grille tarifaire annexée, conformément aux résolutions IATA cargo.</p><h2>Article 3 — Obligations de l'agent</h2><p>L'Agent respecte les procédures de sûreté du fret, les réglementations marchandises dangereuses (IATA DGR) et les délais de remise des cargaisons.</p></div>`
  },
  {
    code: 'avia2_transit_escale',
    name: "Accord de service de transit aérien et escale technique",
    category: 'transport_logistique', price: 8000, priceMax: 24000,
    description: "Accord relatif aux conditions d'accueil des aéronefs en transit technique sur un aéroport, incluant le ravitaillement, la maintenance légère et les formalités.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 57,
    fieldsJson: F([
      {key:'compagnie_aerienne',label:"Compagnie aérienne en transit",type:'text',required:true},
      {key:'autorite_aeroport',label:"Autorité de l'aéroport de transit",type:'text',required:true},
      {key:'aeroport_transit',label:"Aéroport de transit",type:'text',required:true},
      {key:'services_escale',label:"Services fournis lors de l'escale technique",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TRANSIT AÉRIEN ET ESCALE TECHNIQUE</h1><p>Entre <strong>{{compagnie_aerienne}}</strong> et <strong>{{autorite_aeroport}}</strong> pour l'aéroport de <strong>{{aeroport_transit}}</strong>.</p><h2>Article 1 — Services d'escale</h2><p>L'Autorité assure lors de chaque escale technique les services suivants : <strong>{{services_escale}}</strong>, dans les délais convenus en annexe.</p><h2>Article 2 — Formalités</h2><p>Les formalités douanières et d'immigration pour les passagers en transit direct sont réduites au minimum conformément aux conventions en vigueur.</p><h2>Article 3 — Redevances d'escale</h2><p>Les redevances d'atterrissage, de stationnement et d'usage des installations sont facturées selon le barème de l'aéroport en vigueur à la date de l'accord.</p></div>`
  },
  {
    code: 'avia2_meteo',
    name: "Accord de service de météorologie aéronautique",
    category: 'transport_logistique', price: 7000, priceMax: 21000,
    description: "Contrat de fourniture de services météorologiques aéronautiques (METAR, TAF, SIGMET, Pirep) entre une compagnie aérienne et un service météorologique.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 52,
    fieldsJson: F([
      {key:'compagnie_aerienne',label:"Compagnie aérienne cliente",type:'text',required:true},
      {key:'service_meteo',label:"Service météorologique fournisseur",type:'text',required:true},
      {key:'produits_meteo',label:"Produits météo fournis (METAR, TAF, SIGMET...)",type:'textarea',required:true},
      {key:'periodicite',label:"Périodicité de transmission des données",type:'text',required:true},
      {key:'date_debut',label:"Date d'entrée en vigueur",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MÉTÉOROLOGIE AÉRONAUTIQUE</h1><p>Entre <strong>{{compagnie_aerienne}}</strong> et <strong>{{service_meteo}}</strong>.</p><h2>Article 1 — Produits et services</h2><p>Le Service Météo fournit les produits suivants : <strong>{{produits_meteo}}</strong>, transmis avec une périodicité de <strong>{{periodicite}}</strong>, conformément aux normes OACI Annexe 3.</p><h2>Article 2 — Disponibilité</h2><p>La disponibilité des services est garantie à 99,5 % (hors cas de force majeure). Un système de redondance assure la continuité en cas de panne.</p><h2>Article 3 — Responsabilité</h2><p>Le Service Météo répond de l'exactitude des données transmises. Sa responsabilité est limitée aux dommages directs prouvés.</p></div>`
  },
  {
    code: 'avia2_atc',
    name: "Accord de service de contrôle aérien (ATC)",
    category: 'transport_logistique', price: 10000, priceMax: 30000,
    description: "Convention de service de contrôle de la circulation aérienne (ATC) entre l'autorité de l'aviation civile et un prestataire de services de navigation aérienne.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 55,
    fieldsJson: F([
      {key:'autorite_aviation',label:"Autorité de l'aviation civile (ANAC)",type:'text',required:true},
      {key:'prestataire_ansp',label:"Prestataire de services de navigation aérienne (ANSP)",type:'text',required:true},
      {key:'espace_aerien',label:"Espace aérien couvert (FIR, TMA, CTR...)",type:'text',required:true},
      {key:'equipements',label:"Équipements ATC mis à disposition",type:'textarea',required:true},
      {key:'date_debut',label:"Date de prise d'effet",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CONTRÔLE DE LA CIRCULATION AÉRIENNE (ATC)</h1><p>Entre <strong>{{autorite_aviation}}</strong> et le prestataire ANSP <strong>{{prestataire_ansp}}</strong>.</p><h2>Article 1 — Périmètre</h2><p>Le Prestataire assure les services ATC dans l'espace aérien <strong>{{espace_aerien}}</strong> à compter du <strong>{{date_debut}}</strong>, en utilisant les équipements suivants : <strong>{{equipements}}</strong>.</p><h2>Article 2 — Normes</h2><p>Les services sont rendus conformément aux PANS-ATM (Doc 4444 OACI) et aux procédures nationales approuvées par l'ANAC.</p><h2>Article 3 — Incidents</h2><p>Tout incident de la circulation aérienne fait l'objet d'un rapport immédiat transmis au Bureau d'Enquête et d'Analyse.</p></div>`
  },
  {
    code: 'avia2_bail_hangar',
    name: "Accord de bail hangar aéroport",
    category: 'transport_logistique', price: 9000, priceMax: 27000,
    description: "Contrat de location d'un hangar aéroportuaire entre l'autorité aéroportuaire et une compagnie aérienne ou un organisme de maintenance.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'bailleur',label:"Bailleur (Autorité aéroportuaire)",type:'text',required:true},
      {key:'locataire',label:"Locataire",type:'text',required:true},
      {key:'superficie_hangar',label:"Superficie du hangar (m²)",type:'text',required:true},
      {key:'loyer_mensuel',label:"Loyer mensuel (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date d'entrée en jouissance",type:'date',required:true},
      {key:'duree_bail',label:"Durée du bail (années)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE BAIL DE HANGAR AÉROPORTUAIRE</h1><p>Entre <strong>{{bailleur}}</strong> (Bailleur) et <strong>{{locataire}}</strong> (Locataire).</p><h2>Article 1 — Objet du bail</h2><p>Le Bailleur loue au Locataire un hangar de <strong>{{superficie_hangar}}</strong> m² pour un usage exclusivement aéronautique, à compter du <strong>{{date_debut}}</strong> pour une durée de <strong>{{duree_bail}}</strong> ans.</p><h2>Article 2 — Loyer</h2><p>Le loyer mensuel est fixé à <strong>{{loyer_mensuel}}</strong> FCFA, payable le 5 de chaque mois. Il est révisable annuellement selon l'indice des prix.</p><h2>Article 3 — Usage</h2><p>Le hangar est destiné exclusivement au stationnement et à la maintenance des aéronefs. Toute sous-location est interdite sans accord écrit préalable du Bailleur.</p></div>`
  },
  {
    code: 'avia2_concession_sodexam',
    name: "Accord de concession aéroportuaire (SODEXAM CI)",
    category: 'transport_logistique', price: 15000, priceMax: 45000,
    description: "Convention de concession aéroportuaire entre l'État de Côte d'Ivoire et la SODEXAM pour la gestion, l'exploitation et le développement des aéroports nationaux.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 50,
    fieldsJson: F([
      {key:'concedant',label:"État concédant (représenté par)",type:'text',required:true},
      {key:'concessionnaire',label:"Concessionnaire (SODEXAM ou autre)",type:'text',required:true},
      {key:'aeroports_concedes',label:"Aéroports faisant l'objet de la concession",type:'textarea',required:true},
      {key:'duree_concession',label:"Durée de la concession (années)",type:'text',required:true},
      {key:'date_debut',label:"Date d'entrée en vigueur",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CONCESSION AÉROPORTUAIRE</h1><p>Entre <strong>{{concedant}}</strong> (le Concédant) et <strong>{{concessionnaire}}</strong> (le Concessionnaire).</p><h2>Article 1 — Objet</h2><p>L'État concède à <strong>{{concessionnaire}}</strong> la gestion, l'exploitation et le développement des aéroports suivants : <strong>{{aeroports_concedes}}</strong>, pour une durée de <strong>{{duree_concession}}</strong> ans à compter du <strong>{{date_debut}}</strong>.</p><h2>Article 2 — Investissements</h2><p>Le Concessionnaire s'engage à réaliser un programme d'investissements défini dans le plan directeur aéroportuaire approuvé par l'ANAC.</p><h2>Article 3 — Redevances</h2><p>Le Concessionnaire reverse à l'État une redevance domaniale et une quote-part des redevances aéronautiques selon les modalités de l'annexe financière.</p></div>`
  },
  {
    code: 'avia2_partenariat_compagnie_aeroport',
    name: "Accord de partenariat compagnie aérienne-aéroport",
    category: 'transport_logistique', price: 10000, priceMax: 30000,
    description: "Accord de développement commercial et opérationnel entre une compagnie aérienne et un aéroport pour l'ouverture ou le développement de liaisons.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 62,
    fieldsJson: F([
      {key:'compagnie_aerienne',label:"Compagnie aérienne partenaire",type:'text',required:true},
      {key:'aeroport',label:"Aéroport partenaire",type:'text',required:true},
      {key:'liaisons_ciblees',label:"Liaisons ou marchés ciblés",type:'textarea',required:true},
      {key:'engagements_aeroport',label:"Engagements de l'aéroport (incitations, marketing...)",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début du partenariat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT COMPAGNIE AÉRIENNE-AÉROPORT</h1><p>Entre <strong>{{compagnie_aerienne}}</strong> et <strong>{{aeroport}}</strong>.</p><h2>Article 1 — Objectifs</h2><p>Les parties s'engagent à développer les liaisons suivantes : <strong>{{liaisons_ciblees}}</strong>, dans un objectif de croissance mutuelle du trafic passagers et fret.</p><h2>Article 2 — Engagements de l'aéroport</h2><p><strong>{{engagements_aeroport}}</strong></p><h2>Article 3 — Engagements de la compagnie</h2><p>La Compagnie s'engage sur des objectifs de fréquence et de capacité définis en annexe. Elle participe aux actions de co-marketing avec l'aéroport.</p></div>`
  },
  {
    code: 'avia2_rapport_performance',
    name: "Rapport de performance compagnie aérienne",
    category: 'transport_logistique', price: 5000, priceMax: 15000,
    description: "Document de rapport périodique des indicateurs de performance opérationnelle et commerciale d'une compagnie aérienne (OTP, load factor, CO2...).",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'compagnie_aerienne',label:"Compagnie aérienne",type:'text',required:true},
      {key:'periode_rapport',label:"Période couverte par le rapport",type:'text',required:true},
      {key:'ponctualite_otp',label:"Taux de ponctualité OTP (%)",type:'text',required:true},
      {key:'taux_remplissage',label:"Taux de remplissage moyen (load factor %)",type:'text',required:true},
      {key:'regularite',label:"Taux de régularité (%)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE — COMPAGNIE AÉRIENNE</h1><p>Compagnie : <strong>{{compagnie_aerienne}}</strong> — Période : <strong>{{periode_rapport}}</strong></p><h2>1. Ponctualité (OTP)</h2><p>Taux de ponctualité : <strong>{{ponctualite_otp}}</strong>%. Objectif contractuel : 85%. Analyse des causes de retard en annexe.</p><h2>2. Remplissage commercial</h2><p>Load factor moyen : <strong>{{taux_remplissage}}</strong>%. Analyse par route et par saison IATA détaillée en annexe.</p><h2>3. Régularité</h2><p>Taux de régularité (vols non annulés) : <strong>{{regularite}}</strong>%. Plan d'action corrective joint en cas d'écart par rapport aux objectifs.</p></div>`
  },
  {
    code: 'avia2_plan_reseau',
    name: "Plan de développement réseau aérien",
    category: 'transport_logistique', price: 8000, priceMax: 24000,
    description: "Document stratégique de planification du réseau de routes aériennes d'une compagnie, incluant l'analyse de marché et les projections de trafic.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 52,
    fieldsJson: F([
      {key:'compagnie_aerienne',label:"Compagnie aérienne",type:'text',required:true},
      {key:'horizon_planification',label:"Horizon de planification (ex: 2025-2027)",type:'text',required:true},
      {key:'nouvelles_liaisons',label:"Nouvelles liaisons envisagées",type:'textarea',required:true},
      {key:'objectif_passagers',label:"Objectif trafic passagers annuel",type:'text',required:true},
      {key:'date_approbation',label:"Date d'approbation du plan",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT DU RÉSEAU AÉRIEN</h1><p>Compagnie : <strong>{{compagnie_aerienne}}</strong> — Horizon : <strong>{{horizon_planification}}</strong></p><h2>1. Nouvelles liaisons</h2><p>Les routes suivantes sont ciblées pour ouverture : <strong>{{nouvelles_liaisons}}</strong>. L'analyse de marché et la rentabilité prévisionnelle figurent en annexe.</p><h2>2. Objectifs de trafic</h2><p>La compagnie vise un trafic annuel de <strong>{{objectif_passagers}}</strong> passagers sur la période considérée.</p><h2>3. Flotte et créneaux</h2><p>Le plan de flotte et les demandes de créneaux auprès des coordinateurs aéroportuaires sont détaillés en annexe stratégique.</p></div>`
  },
  {
    code: 'avia2_charte_securite_ponctualite',
    name: "Charte de sécurité et ponctualité aérienne",
    category: 'transport_logistique', price: 5000, priceMax: 15000,
    description: "Document de référence interne ou interpartenarial fixant les engagements de sécurité et de ponctualité d'une compagnie aérienne ou d'un aéroport.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'organisation',label:"Nom de l'organisation signataire",type:'text',required:true},
      {key:'responsable_securite',label:"Responsable Sécurité (nom et titre)",type:'text',required:true},
      {key:'objectif_ponctualite',label:"Objectif de ponctualité fixé (%)",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption de la charte",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE SÉCURITÉ ET DE PONCTUALITÉ AÉRIENNE</h1><p>Organisation : <strong>{{organisation}}</strong></p><p>Responsable Sécurité : <strong>{{responsable_securite}}</strong></p><p>Date d'adoption : <strong>{{date_adoption}}</strong></p><h2>Engagement 1 — Priorité à la sécurité</h2><p>La sécurité est la valeur non négociable de l'organisation. Aucune considération commerciale ou opérationnelle ne peut primer sur la sécurité.</p><h2>Engagement 2 — Ponctualité</h2><p>L'organisation s'engage à atteindre un taux de ponctualité de <strong>{{objectif_ponctualite}}</strong>% sur une base annuelle. Les retards sont analysés et font l'objet de plans correctifs.</p><h2>Engagement 3 — Culture de reporting</h2><p>Tout incident de sécurité ou risque de retard est immédiatement signalé aux équipes compétentes, sans crainte de représailles.</p></div>`
  },

  // ─── 25 LOGISTIQUE / SUPPLY CHAIN AVANCÉE (scm2_) ───
  {
    code: 'scm2_vmi',
    name: "Accord de gestion de stock en consignation (VMI)",
    category: 'transport_logistique', price: 9000, priceMax: 27000,
    description: "Accord de Vendor Managed Inventory (VMI) par lequel le fournisseur gère les niveaux de stock chez le client et déclenche lui-même les réapprovisionnements.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'fournisseur',label:"Fournisseur gestionnaire du stock",type:'text',required:true},
      {key:'client',label:"Client dépositaire",type:'text',required:true},
      {key:'references_produits',label:"Références produits concernées",type:'textarea',required:true},
      {key:'niveau_min_max',label:"Niveaux de stock min/max convenus",type:'text',required:true},
      {key:'date_debut',label:"Date de mise en place du VMI",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE GESTION DE STOCK EN CONSIGNATION (VMI)</h1><p>Entre <strong>{{fournisseur}}</strong> (Fournisseur gestionnaire) et <strong>{{client}}</strong> (Client dépositaire).</p><h2>Article 1 — Principe</h2><p>Le Fournisseur prend en charge la gestion des stocks des références suivantes : <strong>{{references_produits}}</strong>, dans les entrepôts du Client, avec des niveaux min/max de <strong>{{niveau_min_max}}</strong>, à compter du <strong>{{date_debut}}</strong>.</p><h2>Article 2 — Propriété des stocks</h2><p>Les marchandises restent la propriété du Fournisseur jusqu'à leur consommation par le Client. Le transfert de propriété s'opère à la sortie de stock.</p><h2>Article 3 — Partage d'informations</h2><p>Le Client transmet quotidiennement ses données de consommation et niveaux de stock via EDI ou portail web dédié.</p></div>`
  },
  {
    code: 'scm2_cross_docking',
    name: "Accord de service de cross-docking",
    category: 'transport_logistique', price: 8000, priceMax: 24000,
    description: "Contrat de prestation de cross-docking entre un donneur d'ordre et un prestataire logistique pour le transfert direct de marchandises sans stockage intermédiaire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'donneur_ordre',label:"Donneur d'ordre",type:'text',required:true},
      {key:'prestataire',label:"Prestataire de cross-docking",type:'text',required:true},
      {key:'plateforme',label:"Plateforme logistique concernée",type:'text',required:true},
      {key:'flux_produits',label:"Flux de produits traités en cross-docking",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début de la prestation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CROSS-DOCKING</h1><p>Entre <strong>{{donneur_ordre}}</strong> et <strong>{{prestataire}}</strong> sur la plateforme de <strong>{{plateforme}}</strong>.</p><h2>Article 1 — Principe</h2><p>Le Prestataire réalise le transbordement des flux suivants : <strong>{{flux_produits}}</strong> sans stockage intermédiaire, à compter du <strong>{{date_debut}}</strong>.</p><h2>Article 2 — Délais</h2><p>Le délai maximal de transit sur la plateforme est de 24 heures entre la réception des marchandises entrantes et l'expédition vers les destinataires finaux.</p><h2>Article 3 — Traçabilité</h2><p>Chaque flux fait l'objet d'un scan à l'entrée et à la sortie de la plateforme. Le Prestataire transmet les données de traçabilité en temps réel.</p></div>`
  },
  {
    code: 'scm2_entrepot_douane',
    name: "Accord de service d'entrepôt sous douane",
    category: 'transport_logistique', price: 10000, priceMax: 30000,
    description: "Contrat de gestion d'entrepôt sous régime douanier (entrepôt fictif, entrepôt sous douane OHADA) entre un importateur et un prestataire logistique agréé.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 58,
    fieldsJson: F([
      {key:'importateur',label:"Importateur / propriétaire des marchandises",type:'text',required:true},
      {key:'prestataire_douane',label:"Prestataire logistique agréé en douane",type:'text',required:true},
      {key:'entrepot',label:"Localisation et référence de l'entrepôt",type:'text',required:true},
      {key:'nature_marchandises',label:"Nature des marchandises entreposées",type:'textarea',required:true},
      {key:'date_debut',label:"Date de prise d'effet",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ENTREPÔT SOUS DOUANE</h1><p>Entre <strong>{{importateur}}</strong> et <strong>{{prestataire_douane}}</strong> pour l'entrepôt <strong>{{entrepot}}</strong>.</p><h2>Article 1 — Régime douanier</h2><p>Les marchandises suivantes : <strong>{{nature_marchandises}}</strong> sont placées en entrepôt sous douane selon les modalités du Code des Douanes de l'UEMOA, à compter du <strong>{{date_debut}}</strong>.</p><h2>Article 2 — Obligations du Prestataire</h2><p>Le Prestataire tient la comptabilité matières réglementaire, assure la conservation des marchandises et informe l'Importateur de tout risque d'avarie ou de dépassement de délai légal.</p><h2>Article 3 — Apurement</h2><p>L'Importateur s'engage à apurer le régime dans les délais réglementaires pour éviter toute mise en contentieux douanier.</p></div>`
  },
  {
    code: 'scm2_zone_franche',
    name: "Accord de service de zone franche logistique",
    category: 'transport_logistique', price: 12000, priceMax: 36000,
    description: "Accord d'exploitation de services logistiques au sein d'une zone franche industrielle ou commerciale, avec avantages douaniers et fiscaux applicables en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 55,
    fieldsJson: F([
      {key:'operateur_zone',label:"Opérateur en zone franche",type:'text',required:true},
      {key:'autorite_zone',label:"Autorité gestionnaire de la zone franche",type:'text',required:true},
      {key:'activites',label:"Activités logistiques exercées en zone franche",type:'textarea',required:true},
      {key:'superficie',label:"Superficie des locaux en zone franche (m²)",type:'text',required:true},
      {key:'date_debut',label:"Date d'entrée dans la zone franche",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE ZONE FRANCHE LOGISTIQUE</h1><p>Entre <strong>{{operateur_zone}}</strong> et <strong>{{autorite_zone}}</strong>.</p><h2>Article 1 — Activités</h2><p>L'Opérateur est autorisé à exercer les activités suivantes dans la zone franche : <strong>{{activites}}</strong>, sur une superficie de <strong>{{superficie}}</strong> m², à compter du <strong>{{date_debut}}</strong>.</p><h2>Article 2 — Avantages et obligations</h2><p>L'Opérateur bénéficie des exonérations douanières et fiscales prévues par le Code des Zones Franches de Côte d'Ivoire, sous réserve du respect des obligations de reporting et d'emploi local.</p><h2>Article 3 — Contrôles</h2><p>L'Autorité procède à des contrôles périodiques des stocks et des flux. L'Opérateur tient à jour un registre des entrées et sorties de marchandises.</p></div>`
  },
  {
    code: 'scm2_3pl',
    name: "Accord de service de 3PL (prestataire logistique tiers)",
    category: 'transport_logistique', price: 11000, priceMax: 33000,
    description: "Contrat de prestation logistique tiers (3PL) incluant le stockage, la préparation de commandes, le transport et la gestion des retours.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'donneur_ordre',label:"Donneur d'ordre",type:'text',required:true},
      {key:'prestataire_3pl',label:"Prestataire 3PL",type:'text',required:true},
      {key:'perimetre_services',label:"Périmètre des services 3PL (stockage, transport, picking...)",type:'textarea',required:true},
      {key:'entrepot_localisation',label:"Localisation de l'entrepôt principal",type:'text',required:true},
      {key:'date_debut',label:"Date de début du contrat",type:'date',required:true},
      {key:'duree_contrat',label:"Durée du contrat (années)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRESTATAIRE LOGISTIQUE TIERS (3PL)</h1><p>Entre <strong>{{donneur_ordre}}</strong> et <strong>{{prestataire_3pl}}</strong>.</p><h2>Article 1 — Périmètre des services</h2><p>Le 3PL prend en charge les services suivants : <strong>{{perimetre_services}}</strong> depuis l'entrepôt de <strong>{{entrepot_localisation}}</strong>, pour une durée de <strong>{{duree_contrat}}</strong> ans à compter du <strong>{{date_debut}}</strong>.</p><h2>Article 2 — Niveaux de service (KPIs)</h2><p>Les indicateurs clés de performance (taux de service, exactitude des stocks, délais de préparation) sont définis en annexe SLA. Des pénalités s'appliquent en cas de dépassement des seuils.</p><h2>Article 3 — Systèmes d'information</h2><p>Le 3PL met à disposition un WMS (Warehouse Management System) interfacé avec l'ERP du Donneur d'ordre pour une visibilité en temps réel.</p></div>`
  },
  {
    code: 'scm2_4pl',
    name: "Accord de service de 4PL (intégrateur logistique)",
    category: 'transport_logistique', price: 14000, priceMax: 42000,
    description: "Contrat d'intégration logistique 4PL (Fourth Party Logistics) par lequel un intégrateur orchestre l'ensemble de la chaîne logistique pour le compte d'un donneur d'ordre.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      {key:'donneur_ordre',label:"Donneur d'ordre",type:'text',required:true},
      {key:'integrateur_4pl',label:"Intégrateur 4PL",type:'text',required:true},
      {key:'perimetre_gestion',label:"Périmètre de gestion (fournisseurs, 3PL, transporteurs...)",type:'textarea',required:true},
      {key:'economies_cibles',label:"Économies logistiques cibles (%)",type:'text',required:true},
      {key:'date_debut',label:"Date de début du mandat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'INTÉGRATEUR LOGISTIQUE (4PL)</h1><p>Entre <strong>{{donneur_ordre}}</strong> et <strong>{{integrateur_4pl}}</strong> (Intégrateur).</p><h2>Article 1 — Mission de l'intégrateur</h2><p>L'Intégrateur orchestre et optimise l'ensemble des prestataires logistiques du Donneur d'ordre couvrant : <strong>{{perimetre_gestion}}</strong>, à compter du <strong>{{date_debut}}</strong>.</p><h2>Article 2 — Objectifs de performance</h2><p>L'Intégrateur vise des économies logistiques de <strong>{{economies_cibles}}</strong>% sur le coût total de la supply chain sur 3 ans.</p><h2>Article 3 — Rémunération</h2><p>L'Intégrateur est rémunéré par un honoraire fixe et un intéressement aux économies réalisées, selon la formule définie en annexe financière.</p></div>`
  },
  {
    code: 'scm2_tracabilite',
    name: "Accord de service de traçabilité (RFID, QR code)",
    category: 'transport_logistique', price: 9000, priceMax: 27000,
    description: "Contrat de déploiement et d'exploitation d'un système de traçabilité des produits par RFID ou QR code dans la chaîne logistique.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'client',label:"Client donneur d'ordre",type:'text',required:true},
      {key:'fournisseur_techno',label:"Fournisseur de solution de traçabilité",type:'text',required:true},
      {key:'technologie',label:"Technologie utilisée (RFID UHF, QR code, Data Matrix...)",type:'text',required:true},
      {key:'references_tracees',label:"Références produits tracées",type:'textarea',required:true},
      {key:'date_deploiement',label:"Date de déploiement",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TRAÇABILITÉ (RFID / QR CODE)</h1><p>Entre <strong>{{client}}</strong> et <strong>{{fournisseur_techno}}</strong>.</p><h2>Article 1 — Solution déployée</h2><p>Le Fournisseur déploie une solution de traçabilité basée sur la technologie <strong>{{technologie}}</strong> pour les références suivantes : <strong>{{references_tracees}}</strong>, opérationnelle à compter du <strong>{{date_deploiement}}</strong>.</p><h2>Article 2 — Données de traçabilité</h2><p>Le système capture automatiquement les données de mouvement, de date et d'heure, de localisation et d'état pour chaque unité tracée.</p><h2>Article 3 — Propriété des données</h2><p>Les données de traçabilité appartiennent au Client. Le Fournisseur ne peut les exploiter à d'autres fins sans autorisation écrite.</p></div>`
  },
  {
    code: 'scm2_temperature_dirigee',
    name: "Accord de service de température dirigée (reefer)",
    category: 'transport_logistique', price: 10000, priceMax: 30000,
    description: "Contrat de transport et de stockage sous température dirigée (chaîne du froid) pour des denrées périssables, produits pharmaceutiques ou chimiques sensibles.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'expediteur',label:"Expéditeur / propriétaire des marchandises",type:'text',required:true},
      {key:'prestataire_froid',label:"Prestataire spécialisé température dirigée",type:'text',required:true},
      {key:'type_produits',label:"Type de produits (pharma, alimentaire, chimique...)",type:'text',required:true},
      {key:'plage_temperature',label:"Plage de température requise (°C)",type:'text',required:true},
      {key:'date_debut',label:"Date de début de la prestation",type:'date',required:true},
      {key:'trajet_ou_entrepot',label:"Trajet ou entrepôt concerné",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TEMPÉRATURE DIRIGÉE (REEFER)</h1><p>Entre <strong>{{expediteur}}</strong> et <strong>{{prestataire_froid}}</strong>.</p><h2>Article 1 — Conditions de température</h2><p>Le Prestataire garantit le maintien d'une température de <strong>{{plage_temperature}}</strong> °C pour les produits <strong>{{type_produits}}</strong> sur l'itinéraire ou dans l'entrepôt suivant : <strong>{{trajet_ou_entrepot}}</strong>, à compter du <strong>{{date_debut}}</strong>.</p><h2>Article 2 — Surveillance et enregistrement</h2><p>La température est enregistrée en continu par des dataloggers certifiés. Le rapport de température est transmis au destinataire à chaque livraison.</p><h2>Article 3 — Rupture de chaîne du froid</h2><p>Toute rupture de la chaîne du froid est immédiatement notifiée à l'Expéditeur. La responsabilité du Prestataire est engagée pour les pertes prouvées liées à son fait.</p></div>`
  },
  {
    code: 'scm2_emballage_conditionnement',
    name: "Accord de service d'emballage et conditionnement",
    category: 'transport_logistique', price: 7000, priceMax: 21000,
    description: "Contrat de prestation d'emballage, de conditionnement et d'étiquetage de produits pour le compte d'un industriel ou d'un distributeur.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'donneur_ordre',label:"Donneur d'ordre industriel",type:'text',required:true},
      {key:'prestataire_emballage',label:"Prestataire d'emballage",type:'text',required:true},
      {key:'references_produits',label:"Références produits à conditionner",type:'textarea',required:true},
      {key:'specifications_emballage',label:"Spécifications d'emballage (matière, format, étiquetage)",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début de la prestation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'EMBALLAGE ET CONDITIONNEMENT</h1><p>Entre <strong>{{donneur_ordre}}</strong> et <strong>{{prestataire_emballage}}</strong>.</p><h2>Article 1 — Prestations</h2><p>Le Prestataire assure l'emballage et le conditionnement des références suivantes : <strong>{{references_produits}}</strong>, conformément aux spécifications : <strong>{{specifications_emballage}}</strong>, à compter du <strong>{{date_debut}}</strong>.</p><h2>Article 2 — Qualité</h2><p>Le Prestataire effectue un contrôle qualité à 100% pour les produits sensibles et par échantillonnage (AQL 1.0) pour les articles standards.</p><h2>Article 3 — Déchets d'emballage</h2><p>Le Prestataire gère les déchets d'emballage conformément à la réglementation environnementale ivoirienne en vigueur.</p></div>`
  },
  {
    code: 'scm2_co_packing',
    name: "Accord de service de co-packing",
    category: 'transport_logistique', price: 8000, priceMax: 24000,
    description: "Contrat de co-packing par lequel un prestataire assemble plusieurs produits de marques différentes en un seul coffret ou pack promotionnel.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'marque_mandante',label:"Marque / Donneur d'ordre",type:'text',required:true},
      {key:'prestataire_copacking',label:"Prestataire de co-packing",type:'text',required:true},
      {key:'description_pack',label:"Description du pack promotionnel à assembler",type:'textarea',required:true},
      {key:'volume_previsionnel',label:"Volume prévisionnel (unités/mois)",type:'text',required:true},
      {key:'date_lancement',label:"Date de lancement du co-packing",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CO-PACKING</h1><p>Entre <strong>{{marque_mandante}}</strong> et <strong>{{prestataire_copacking}}</strong>.</p><h2>Article 1 — Description du pack</h2><p>Le Prestataire assemble le pack suivant : <strong>{{description_pack}}</strong>, pour un volume prévisionnel de <strong>{{volume_previsionnel}}</strong> unités/mois, à compter du <strong>{{date_lancement}}</strong>.</p><h2>Article 2 — Propriété intellectuelle</h2><p>Les droits sur le design du pack appartiennent au Donneur d'ordre. Le Prestataire ne peut reproduire les visuels à d'autres fins.</p><h2>Article 3 — Délais</h2><p>Le délai de fabrication des packs est de 72 heures après réception des composants. Tout retard imputable au Prestataire donne lieu à pénalités.</p></div>`
  },
  {
    code: 'scm2_co_manufacturing',
    name: "Accord de service de co-manufacturing",
    category: 'transport_logistique', price: 13000, priceMax: 39000,
    description: "Contrat de co-fabrication (co-manufacturing) entre une marque et un fabricant sous-traitant pour la production de produits finis ou semi-finis.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 55,
    fieldsJson: F([
      {key:'marque_mandante',label:"Marque / Donneur d'ordre industriel",type:'text',required:true},
      {key:'co_manufacturier',label:"Co-manufacturier (sous-traitant)",type:'text',required:true},
      {key:'produits_fabriquer',label:"Produits à fabriquer (description et spécifications)",type:'textarea',required:true},
      {key:'volumes_annuels',label:"Volumes annuels contractuels",type:'text',required:true},
      {key:'date_debut',label:"Date de début de production",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CO-MANUFACTURING</h1><p>Entre <strong>{{marque_mandante}}</strong> et <strong>{{co_manufacturier}}</strong>.</p><h2>Article 1 — Produits et spécifications</h2><p>Le Co-manufacturier fabrique les produits suivants : <strong>{{produits_fabriquer}}</strong> pour un volume annuel de <strong>{{volumes_annuels}}</strong>, à compter du <strong>{{date_debut}}</strong>.</p><h2>Article 2 — Propriété des formules et recettes</h2><p>Les formules, recettes et procédés de fabrication restent la propriété exclusive du Donneur d'ordre. Le Co-manufacturier signe un accord de confidentialité renforcé.</p><h2>Article 3 — Contrôle qualité</h2><p>Le Donneur d'ordre réalise des audits qualité trimestriels des lignes de production. Le Co-manufacturier assure un contrôle en ligne et des analyses de fin de lot.</p></div>`
  },
  {
    code: 'scm2_last_mile',
    name: "Accord de service de distribution urbaine (last mile)",
    category: 'transport_logistique', price: 7000, priceMax: 21000,
    description: "Contrat de livraison du dernier kilomètre (last mile delivery) en milieu urbain, incluant les délais, les fenêtres de livraison et la gestion des échecs de livraison.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'expediteur',label:"Expéditeur / e-commerçant",type:'text',required:true},
      {key:'transporteur_last_mile',label:"Transporteur last mile",type:'text',required:true},
      {key:'zone_livraison',label:"Zone(s) de livraison couverte(s)",type:'text',required:true},
      {key:'delai_livraison',label:"Délai de livraison garanti (heures/jours)",type:'text',required:true},
      {key:'date_debut',label:"Date de début du service",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DISTRIBUTION URBAINE (LAST MILE)</h1><p>Entre <strong>{{expediteur}}</strong> et <strong>{{transporteur_last_mile}}</strong>.</p><h2>Article 1 — Zone et délais</h2><p>Le Transporteur assure la livraison dans les zones suivantes : <strong>{{zone_livraison}}</strong> en <strong>{{delai_livraison}}</strong> à compter du dépôt du colis en entrepôt de transit, à partir du <strong>{{date_debut}}</strong>.</p><h2>Article 2 — Preuve de livraison</h2><p>Chaque livraison est attestée par une signature électronique ou une photo de dépôt. Les données sont accessibles en temps réel via le portail de suivi.</p><h2>Article 3 — Échec de livraison</h2><p>En cas d'échec, le Transporteur effectue une seconde tentative sous 24h. Après deux échecs, le colis est retourné en point relais ou à l'expéditeur.</p></div>`
  },
  {
    code: 'scm2_reverse_logistics',
    name: "Accord de service de retour produits (reverse logistics)",
    category: 'transport_logistique', price: 8000, priceMax: 24000,
    description: "Contrat de gestion des flux retour (reverse logistics) incluant la collecte, le tri, la reconditionnement et l'élimination des produits retournés.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'donneur_ordre',label:"Donneur d'ordre",type:'text',required:true},
      {key:'prestataire_retour',label:"Prestataire de reverse logistics",type:'text',required:true},
      {key:'types_retours',label:"Types de retours traités (SAV, fin de vie, excédents...)",type:'textarea',required:true},
      {key:'traitement_prevu',label:"Traitement prévu (reconditionnement, destruction, recyclage...)",type:'textarea',required:true},
      {key:'date_debut',label:"Date de prise d'effet",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE REVERSE LOGISTICS</h1><p>Entre <strong>{{donneur_ordre}}</strong> et <strong>{{prestataire_retour}}</strong>.</p><h2>Article 1 — Périmètre</h2><p>Le Prestataire gère les flux retour suivants : <strong>{{types_retours}}</strong>, à compter du <strong>{{date_debut}}</strong>.</p><h2>Article 2 — Traitement des produits</h2><p>Les produits retournés font l'objet du traitement suivant : <strong>{{traitement_prevu}}</strong>. Un rapport de destruction ou de recyclage est fourni mensuellement.</p><h2>Article 3 — Responsabilité environnementale</h2><p>Le Prestataire garantit que la destruction ou le recyclage est effectué conformément aux normes environnementales ivoiriennes et ne donne pas lieu à des filières illicites.</p></div>`
  },
  {
    code: 'scm2_gestion_dechets',
    name: "Accord de service de gestion déchets industriels",
    category: 'transport_logistique', price: 9000, priceMax: 27000,
    description: "Contrat de collecte, transport, traitement et élimination des déchets industriels banals (DIB) et des déchets industriels spéciaux (DIS) générés par une entreprise.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 58,
    fieldsJson: F([
      {key:'producteur_dechets',label:"Producteur de déchets industriels",type:'text',required:true},
      {key:'prestataire_dechets',label:"Prestataire agréé de gestion des déchets",type:'text',required:true},
      {key:'types_dechets',label:"Types et codes déchets (DIB/DIS)",type:'textarea',required:true},
      {key:'frequence_collecte',label:"Fréquence de collecte",type:'text',required:true},
      {key:'date_debut',label:"Date de prise d'effet",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GESTION DES DÉCHETS INDUSTRIELS</h1><p>Entre <strong>{{producteur_dechets}}</strong> et <strong>{{prestataire_dechets}}</strong>, prestataire agréé.</p><h2>Article 1 — Déchets concernés</h2><p>Le présent accord porte sur la gestion des déchets suivants : <strong>{{types_dechets}}</strong>, collectés avec une fréquence de <strong>{{frequence_collecte}}</strong>, à compter du <strong>{{date_debut}}</strong>.</p><h2>Article 2 — Bordereau de suivi</h2><p>Tout mouvement de déchets fait l'objet d'un bordereau de suivi déchets (BSD) conformément à la réglementation en vigueur. Le Prestataire remet au Producteur le volet de validation après traitement.</p><h2>Article 3 — Traçabilité et élimination</h2><p>Le Prestataire justifie de l'élimination ou de la valorisation des déchets et fournit un rapport annuel de bilan matière.</p></div>`
  },
  {
    code: 'scm2_audit_supply_chain',
    name: "Accord de service d'audit de supply chain",
    category: 'transport_logistique', price: 12000, priceMax: 36000,
    description: "Contrat de prestation d'audit de la chaîne logistique incluant l'évaluation des processus, des coûts, des risques et des axes d'amélioration de la supply chain.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      {key:'entreprise_cliente',label:"Entreprise cliente",type:'text',required:true},
      {key:'cabinet_audit',label:"Cabinet ou consultant en supply chain",type:'text',required:true},
      {key:'perimetre_audit',label:"Périmètre de l'audit (entrepôts, transport, achats...)",type:'textarea',required:true},
      {key:'date_debut_audit',label:"Date de début de la mission d'audit",type:'date',required:true},
      {key:'duree_mission',label:"Durée de la mission (semaines)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'AUDIT DE SUPPLY CHAIN</h1><p>Entre <strong>{{entreprise_cliente}}</strong> et <strong>{{cabinet_audit}}</strong>.</p><h2>Article 1 — Périmètre de la mission</h2><p>Le Cabinet réalise un audit de la supply chain portant sur : <strong>{{perimetre_audit}}</strong>, du <strong>{{date_debut_audit}}</strong> pour une durée de <strong>{{duree_mission}}</strong> semaines.</p><h2>Article 2 — Méthodologie</h2><p>L'audit comprend : entretiens avec les équipes, visite des sites, analyse documentaire des flux et des coûts, benchmarking sectoriel et remise d'un rapport de recommandations.</p><h2>Article 3 — Confidentialité</h2><p>Le Cabinet s'engage à une stricte confidentialité sur toutes les informations recueillies pendant la mission. Les livrables appartiennent au Client.</p></div>`
  },
  {
    code: 'scm2_demand_planning',
    name: "Accord de service de prévision de la demande (demand planning)",
    category: 'transport_logistique', price: 10000, priceMax: 30000,
    description: "Contrat de prestation de service de prévision de la demande et de planification des approvisionnements pour optimiser les niveaux de stock et de production.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'entreprise_cliente',label:"Entreprise cliente",type:'text',required:true},
      {key:'prestataire_planning',label:"Prestataire en demand planning",type:'text',required:true},
      {key:'familles_produits',label:"Familles de produits couvertes",type:'textarea',required:true},
      {key:'horizon_prevision',label:"Horizon de prévision (semaines/mois)",type:'text',required:true},
      {key:'date_debut',label:"Date de début de la prestation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRÉVISION DE LA DEMANDE (DEMAND PLANNING)</h1><p>Entre <strong>{{entreprise_cliente}}</strong> et <strong>{{prestataire_planning}}</strong>.</p><h2>Article 1 — Périmètre</h2><p>Le Prestataire élabore des prévisions de demande pour les familles de produits suivantes : <strong>{{familles_produits}}</strong>, sur un horizon de <strong>{{horizon_prevision}}</strong>, à compter du <strong>{{date_debut}}</strong>.</p><h2>Article 2 — Méthodes et outils</h2><p>Les prévisions sont produites par des modèles statistiques (séries temporelles, machine learning) alimentés par les historiques de ventes, les promotions et les données macro-économiques.</p><h2>Article 3 — Précision cible</h2><p>Le Prestataire cible un taux d'erreur MAPE inférieur à 15% sur les prévisions à 12 semaines. Des revues mensuelles évaluent la précision et ajustent les paramètres des modèles.</p></div>`
  },
  {
    code: 'scm2_sop',
    name: "Accord de service de gestion des approvisionnements (S&OP)",
    category: 'transport_logistique', price: 11000, priceMax: 33000,
    description: "Contrat de pilotage du processus Sales and Operations Planning (S&OP) pour aligner les plans commerciaux, de production et logistiques d'une entreprise.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 55,
    fieldsJson: F([
      {key:'entreprise_cliente',label:"Entreprise cliente",type:'text',required:true},
      {key:'consultant_sop',label:"Consultant S&OP",type:'text',required:true},
      {key:'perimetre_business',label:"Périmètre des activités couvertes par le S&OP",type:'textarea',required:true},
      {key:'frequence_cycles',label:"Fréquence des cycles S&OP (mensuelle...)",type:'text',required:true},
      {key:'date_lancement',label:"Date de lancement du processus S&OP",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GESTION S&OP (SALES AND OPERATIONS PLANNING)</h1><p>Entre <strong>{{entreprise_cliente}}</strong> et <strong>{{consultant_sop}}</strong>.</p><h2>Article 1 — Périmètre du S&OP</h2><p>Le processus S&OP couvre les activités suivantes : <strong>{{perimetre_business}}</strong>, avec une cadence de cycles <strong>{{frequence_cycles}}</strong>, à compter du <strong>{{date_lancement}}</strong>.</p><h2>Article 2 — Livrables</h2><p>Chaque cycle S&OP produit : un plan de demande consensuel, un plan d'approvisionnement, un plan de production et un plan de trésorerie logistique.</p><h2>Article 3 — Animation des réunions</h2><p>Le Consultant anime les réunions de revue de demande, revue d'approvisionnement et réunion exécutive S&OP conformément au processus IBP (Integrated Business Planning).</p></div>`
  },
  {
    code: 'scm2_srm',
    name: "Accord de service de performance fournisseur (SRM)",
    category: 'transport_logistique', price: 9000, priceMax: 27000,
    description: "Contrat de mise en place d'un programme de Supplier Relationship Management (SRM) pour évaluer, développer et fidéliser les fournisseurs stratégiques.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'entreprise_cliente',label:"Entreprise cliente (acheteur)",type:'text',required:true},
      {key:'fournisseur_evalue',label:"Fournisseur(s) évalué(s)",type:'text',required:true},
      {key:'criteres_evaluation',label:"Critères d'évaluation SRM (qualité, délai, prix, RSE...)",type:'textarea',required:true},
      {key:'frequence_revues',label:"Fréquence des revues de performance",type:'text',required:true},
      {key:'date_debut',label:"Date de début du programme SRM",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PERFORMANCE FOURNISSEUR (SRM)</h1><p>Entre <strong>{{entreprise_cliente}}</strong> (Acheteur) et <strong>{{fournisseur_evalue}}</strong> (Fournisseur).</p><h2>Article 1 — Critères d'évaluation</h2><p>La performance du Fournisseur est évaluée selon les critères suivants : <strong>{{criteres_evaluation}}</strong>, avec des revues <strong>{{frequence_revues}}</strong>, à compter du <strong>{{date_debut}}</strong>.</p><h2>Article 2 — Plan de progrès</h2><p>En cas de score insuffisant, un plan de progrès est élaboré conjointement avec des objectifs chiffrés et un calendrier de mise en oeuvre.</p><h2>Article 3 — Segmentation fournisseurs</h2><p>Les fournisseurs sont classés en catégories (Stratégique, Préféré, Approuvé) selon leur score SRM annuel. Le statut conditionne les volumes alloués.</p></div>`
  },
  {
    code: 'scm2_iqc',
    name: "Accord de service de contrôle qualité entrant (IQC)",
    category: 'transport_logistique', price: 8000, priceMax: 24000,
    description: "Contrat de prestation de contrôle qualité à la réception des approvisionnements (Incoming Quality Control) pour vérifier la conformité des produits livrés.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'industriel_client',label:"Industriel / Client donneur d'ordre",type:'text',required:true},
      {key:'laboratoire_iqc',label:"Laboratoire ou prestataire IQC",type:'text',required:true},
      {key:'familles_produits',label:"Familles de produits contrôlés",type:'textarea',required:true},
      {key:'plan_echantillonnage',label:"Plan d'échantillonnage (AQL, niveau d'inspection)",type:'text',required:true},
      {key:'date_debut',label:"Date de mise en place du contrôle",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CONTRÔLE QUALITÉ ENTRANT (IQC)</h1><p>Entre <strong>{{industriel_client}}</strong> et <strong>{{laboratoire_iqc}}</strong>.</p><h2>Article 1 — Périmètre du contrôle</h2><p>Le Prestataire effectue les contrôles qualité à la réception des familles de produits suivantes : <strong>{{familles_produits}}</strong>, selon le plan d'échantillonnage <strong>{{plan_echantillonnage}}</strong>, à compter du <strong>{{date_debut}}</strong>.</p><h2>Article 2 — Rapport de contrôle</h2><p>Un rapport IQC est émis dans les 4 heures suivant chaque contrôle, avec décision Accept/Reject et justification. Le lot refusé est bloqué en quarantaine.</p><h2>Article 3 — Non-conformités</h2><p>Les non-conformités détectées sont immédiatement notifiées au Fournisseur concerné. Le Client décide du traitement (tri 100%, retour fournisseur, dérogation).</p></div>`
  },
  {
    code: 'scm2_sqa',
    name: "Accord de service d'assurance qualité fournisseur (SQA)",
    category: 'transport_logistique', price: 10000, priceMax: 30000,
    description: "Contrat d'assurance qualité fournisseur (Supplier Quality Assurance) définissant les exigences qualité auxquelles le fournisseur doit se conformer et les modalités d'audit.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 58,
    fieldsJson: F([
      {key:'acheteur',label:"Acheteur donneur d'ordre",type:'text',required:true},
      {key:'fournisseur',label:"Fournisseur",type:'text',required:true},
      {key:'exigences_qualite',label:"Référentiel qualité applicable (ISO, IATF, IFS...)",type:'text',required:true},
      {key:'frequence_audits',label:"Fréquence des audits qualité fournisseur",type:'text',required:true},
      {key:'date_debut',label:"Date d'entrée en vigueur",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D'ASSURANCE QUALITÉ FOURNISSEUR (SQA)</h1><p>Entre <strong>{{acheteur}}</strong> et <strong>{{fournisseur}}</strong>.</p><h2>Article 1 — Exigences qualité</h2><p>Le Fournisseur s'engage à respecter les exigences du référentiel <strong>{{exigences_qualite}}</strong> et les spécifications techniques de l'Acheteur, à compter du <strong>{{date_debut}}</strong>.</p><h2>Article 2 — Audits qualité</h2><p>L'Acheteur réalise des audits qualité <strong>{{frequence_audits}}</strong>. Le Fournisseur donne libre accès à ses sites, documents et systèmes qualité.</p><h2>Article 3 — Actions correctives</h2><p>Toute non-conformité détectée fait l'objet d'une demande d'action corrective (DAC). Le Fournisseur répond dans un délai de 10 jours ouvrables avec un plan 8D.</p></div>`
  },
  {
    code: 'scm2_kpi_rapport',
    name: "Rapport de performance supply chain (KPIs)",
    category: 'transport_logistique', price: 5000, priceMax: 15000,
    description: "Document de tableau de bord périodique des indicateurs clés de performance de la supply chain (OTIF, rotation des stocks, taux de service...).",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise",type:'text',required:true},
      {key:'periode_rapport',label:"Période du rapport",type:'text',required:true},
      {key:'taux_service_otif',label:"Taux de service OTIF (%)",type:'text',required:true},
      {key:'rotation_stocks',label:"Rotation des stocks (jours de stock)",type:'text',required:true},
      {key:'taux_remplissage_camions',label:"Taux de remplissage camions (%)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE SUPPLY CHAIN — TABLEAU DE BORD KPIs</h1><p>Entreprise : <strong>{{entreprise}}</strong> — Période : <strong>{{periode_rapport}}</strong></p><h2>1. Taux de service OTIF</h2><p>Taux OTIF (On Time In Full) : <strong>{{taux_service_otif}}</strong>%. Objectif : 95%. Analyse des écarts et causes racines en annexe.</p><h2>2. Gestion des stocks</h2><p>Rotation des stocks : <strong>{{rotation_stocks}}</strong> jours. Objectif : inférieur à 45 jours. Détail par famille de produits joint.</p><h2>3. Efficacité transport</h2><p>Taux de remplissage moyen des camions : <strong>{{taux_remplissage_camions}}</strong>%. Plan d'optimisation des tournées et consolidation des envois en annexe.</p></div>`
  },
  {
    code: 'scm2_bcp_logistique',
    name: "Plan de continuité logistique (BCP)",
    category: 'transport_logistique', price: 10000, priceMax: 30000,
    description: "Plan de continuité des activités logistiques (Business Continuity Plan) définissant les procédures de résilience en cas de crise (rupture fournisseur, catastrophe naturelle, pandémie).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise titulaire du BCP",type:'text',required:true},
      {key:'responsable_bcp',label:"Responsable du plan de continuité",type:'text',required:true},
      {key:'scenarios_risques',label:"Scénarios de risques couverts",type:'textarea',required:true},
      {key:'fournisseurs_alternatifs',label:"Fournisseurs et prestataires alternatifs identifiés",type:'textarea',required:true},
      {key:'date_approbation',label:"Date d'approbation du BCP",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE CONTINUITÉ LOGISTIQUE (BCP)</h1><p>Entreprise : <strong>{{entreprise}}</strong> — Responsable : <strong>{{responsable_bcp}}</strong> — Approuvé le : <strong>{{date_approbation}}</strong></p><h2>1. Scénarios de risques couverts</h2><p><strong>{{scenarios_risques}}</strong></p><h2>2. Fournisseurs et prestataires alternatifs</h2><p>En cas d'indisponibilité des partenaires principaux, les alternatives suivantes sont activées : <strong>{{fournisseurs_alternatifs}}</strong>.</p><h2>3. Procédures d'activation</h2><p>Le BCP est activé par décision du Responsable après évaluation de l'impact sur la chaîne logistique. Une cellule de crise est constituée dans les 2 heures. Des exercices de simulation sont conduits semestriellement.</p></div>`
  },
  {
    code: 'scm2_durabilite_scope3',
    name: "Accord de service de durabilité supply chain (scope 3)",
    category: 'transport_logistique', price: 11000, priceMax: 33000,
    description: "Accord de collaboration pour la mesure et la réduction des émissions de gaz à effet de serre scope 3 (amont et aval) dans la chaîne logistique.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 55,
    fieldsJson: F([
      {key:'entreprise_leader',label:"Entreprise leader (pilote de la démarche)",type:'text',required:true},
      {key:'partenaires_supply_chain',label:"Partenaires supply chain engagés",type:'textarea',required:true},
      {key:'objectif_reduction_co2',label:"Objectif de réduction CO2 scope 3 (%)",type:'text',required:true},
      {key:'horizon_temporel',label:"Horizon temporel de l'objectif",type:'text',required:true},
      {key:'date_debut',label:"Date de lancement de la démarche",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE DURABILITÉ SUPPLY CHAIN — RÉDUCTION ÉMISSIONS SCOPE 3</h1><p>Initié par <strong>{{entreprise_leader}}</strong> avec les partenaires suivants : <strong>{{partenaires_supply_chain}}</strong>.</p><h2>Article 1 — Engagement</h2><p>Les signataires s'engagent à réduire collectivement les émissions de GES scope 3 de <strong>{{objectif_reduction_co2}}</strong>% d'ici <strong>{{horizon_temporel}}</strong>, à partir du <strong>{{date_debut}}</strong>.</p><h2>Article 2 — Mesure et reporting</h2><p>Chaque partenaire mesure ses émissions selon la méthodologie GHG Protocol et communique ses données annuellement pour consolidation. Le rapport scope 3 consolidé est publié chaque année.</p><h2>Article 3 — Leviers d'action</h2><p>Les leviers prioritaires incluent : optimisation du remplissage transport, report modal, éco-conception emballages, approvisionnement local et agriculture régénératrice.</p></div>`
  },
  {
    code: 'scm2_partenariat_port_entrepot',
    name: "Accord de partenariat logistique port-entrepôt-transporteur",
    category: 'transport_logistique', price: 12000, priceMax: 36000,
    description: "Accord tripartite de coordination logistique entre un opérateur portuaire, un gestionnaire d'entrepôt et un transporteur routier pour fluidifier les flux import/export.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 62,
    fieldsJson: F([
      {key:'operateur_portuaire',label:"Opérateur portuaire",type:'text',required:true},
      {key:'gestionnaire_entrepot',label:"Gestionnaire d'entrepôt",type:'text',required:true},
      {key:'transporteur',label:"Transporteur routier",type:'text',required:true},
      {key:'flux_cibles',label:"Flux logistiques ciblés (import, export, transit...)",type:'textarea',required:true},
      {key:'date_debut',label:"Date d'entrée en vigueur",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT LOGISTIQUE PORT-ENTREPÔT-TRANSPORTEUR</h1><p>Entre <strong>{{operateur_portuaire}}</strong>, <strong>{{gestionnaire_entrepot}}</strong> et <strong>{{transporteur}}</strong>.</p><h2>Article 1 — Objet</h2><p>Les trois parties s'engagent à coordonner les flux logistiques suivants : <strong>{{flux_cibles}}</strong> pour réduire les délais de transit et optimiser les coûts de la chaîne portuaire, à compter du <strong>{{date_debut}}</strong>.</p><h2>Article 2 — Échange de données</h2><p>Les parties partagent en temps réel leurs données opérationnelles (arrivées navires, disponibilité entrepôts, plannings transport) via une plateforme d'intégration commune.</p><h2>Article 3 — Comité de pilotage</h2><p>Un comité de pilotage tripartite se réunit mensuellement pour suivre les KPIs et résoudre les points de friction opérationnels.</p></div>`
  },
  {
    code: 'scm2_charte_responsable',
    name: "Charte de la supply chain responsable",
    category: 'transport_logistique', price: 5000, priceMax: 15000,
    description: "Charte d'engagement en faveur d'une supply chain responsable intégrant les critères RSE, éthique des affaires, droits sociaux et impact environnemental.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'entreprise_signataire',label:"Entreprise signataire",type:'text',required:true},
      {key:'directeur_general',label:"Directeur Général (nom et titre)",type:'text',required:true},
      {key:'engagements_rse',label:"Principaux engagements RSE supply chain",type:'textarea',required:true},
      {key:'date_adoption',label:"Date d'adoption de la charte",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE LA SUPPLY CHAIN RESPONSABLE</h1><p>Entreprise : <strong>{{entreprise_signataire}}</strong> — Engagée par : <strong>{{directeur_general}}</strong> — Adoptée le : <strong>{{date_adoption}}</strong></p><h2>Préambule</h2><p>Notre entreprise s'engage à construire une chaîne d'approvisionnement qui respecte l'environnement, les droits humains et les principes de l'éthique des affaires, en cohérence avec les ODD et le Pacte Mondial de l'ONU.</p><h2>Nos engagements</h2><p><strong>{{engagements_rse}}</strong></p><h2>Mise en oeuvre et reporting</h2><p>Ces engagements sont déployés auprès de l'ensemble de nos fournisseurs et prestataires via notre programme SRM responsable. Un rapport annuel de performance RSE supply chain est publié et rendu public.</p></div>`
  }
];

async function main() {
  let created = 0, updated = 0;
  for (const t of templates) {
    const ex = await prisma.documentTemplate.findUnique({ where: { code: t.code } });
    await prisma.documentTemplate.upsert({ where: { code: t.code }, update: t, create: t });
    if (ex) updated++; else created++;
  }
  const total = await prisma.documentTemplate.count();
  console.log(`Batch 66b OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
