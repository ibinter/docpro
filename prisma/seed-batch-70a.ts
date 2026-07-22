import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ── AUTOMOBILE / CONCESSION (auto2_) ──────────────────────────────────────
  {
    code: 'auto2_vente_neuf', name: "Contrat de vente de véhicule neuf (concessionnaire)", category: 'commercial_financier', price: 6000, priceMax: 18000,
    description: "Contrat de vente d'un véhicule neuf établi par un concessionnaire agréé, conforme aux usages OHADA.", templateType: 'pdf', classe: 'B', active: true, popularity: 85,
    fieldsJson: F([
      {key:'nom_acheteur',label:"Nom complet de l'acheteur",type:'text',required:true},
      {key:'marque_modele',label:"Marque et modèle du véhicule",type:'text',required:true},
      {key:'numero_chassis',label:"Numéro de châssis (VIN)",type:'text',required:true},
      {key:'prix_vente',label:"Prix de vente TTC (FCFA)",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison prévue",type:'date',required:true},
      {key:'conditions_paiement',label:"Conditions de paiement",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE VENTE DE VÉHICULE NEUF</h1><p>Entre le soussigné concessionnaire agréé et <strong>{{nom_acheteur}}</strong>, il est convenu ce qui suit :</p><h2>Article 1 – Désignation du véhicule</h2><p>Marque et modèle : {{marque_modele}}<br/>Numéro de châssis : {{numero_chassis}}</p><h2>Article 2 – Prix</h2><p>Prix de vente TTC : {{prix_vente}} FCFA</p><h2>Article 3 – Modalités de paiement</h2><p>{{conditions_paiement}}</p><h2>Article 4 – Livraison</h2><p>Date de livraison prévue : {{date_livraison}}</p><h2>Article 5 – Garantie</h2><p>Le véhicule est livré avec la garantie constructeur applicable en Côte d'Ivoire.</p><p>Fait à Abidjan, le {{date_livraison}}</p><p>Signature acheteur : _______________ Signature concessionnaire : _______________</p></div>`
  },
  {
    code: 'auto2_vente_occasion', name: "Contrat de vente de véhicule d'occasion", category: 'commercial_financier', price: 4000, priceMax: 10000,
    description: "Contrat de cession d'un véhicule d'occasion entre particulier ou professionnel, avec déclaration d'état.", templateType: 'pdf', classe: 'B', active: true, popularity: 80,
    fieldsJson: F([
      {key:'vendeur',label:"Identité du vendeur",type:'text',required:true},
      {key:'acheteur',label:"Identité de l'acheteur",type:'text',required:true},
      {key:'vehicule',label:"Désignation du véhicule (marque, modèle, année)",type:'text',required:true},
      {key:'kilometrage',label:"Kilométrage au compteur",type:'text',required:true},
      {key:'prix_cession',label:"Prix de cession (FCFA)",type:'text',required:true},
      {key:'date_cession',label:"Date de la cession",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE VENTE DE VÉHICULE D'OCCASION</h1><p><strong>Vendeur :</strong> {{vendeur}}<br/><strong>Acheteur :</strong> {{acheteur}}</p><h2>Article 1 – Désignation</h2><p>{{vehicule}} — kilométrage : {{kilometrage}} km</p><h2>Article 2 – Prix</h2><p>Prix de cession convenu : {{prix_cession}} FCFA, payé comptant à la signature.</p><h2>Article 3 – État du véhicule</h2><p>Le vendeur déclare vendre le véhicule en l'état, sans vices cachés à sa connaissance.</p><h2>Article 4 – Transfert de propriété</h2><p>Le transfert de propriété intervient à la date de cession : {{date_cession}}.</p><p>Fait à Abidjan, le {{date_cession}}</p><p>Signature vendeur : _______________ Signature acheteur : _______________</p></div>`
  },
  {
    code: 'auto2_reprise_tradein', name: "Accord de reprise de véhicule (trade-in)", category: 'commercial_financier', price: 3500, priceMax: 9000,
    description: "Accord formalisant la reprise d'un véhicule ancien en déduction du prix d'achat d'un nouveau véhicule.", templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'client',label:"Nom du client",type:'text',required:true},
      {key:'vehicule_repris',label:"Véhicule repris (marque, modèle, immatriculation)",type:'text',required:true},
      {key:'valeur_reprise',label:"Valeur de reprise accordée (FCFA)",type:'text',required:true},
      {key:'vehicule_achat',label:"Nouveau véhicule acheté",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE REPRISE DE VÉHICULE (TRADE-IN)</h1><p>Le présent accord est conclu entre le concessionnaire et <strong>{{client}}</strong>.</p><h2>Article 1 – Véhicule repris</h2><p>{{vehicule_repris}}</p><h2>Article 2 – Valeur de reprise</h2><p>Le concessionnaire s'engage à reprendre ledit véhicule pour une valeur de <strong>{{valeur_reprise}} FCFA</strong>, imputable sur le prix du nouveau véhicule.</p><h2>Article 3 – Nouveau véhicule</h2><p>{{vehicule_achat}}</p><h2>Article 4 – Conditions</h2><p>La reprise est effective à la date de livraison du nouveau véhicule. Le client cède tous droits sur le véhicule repris.</p><p>Fait à Abidjan, le {{date_accord}}</p><p>Signature client : _______________ Signature concessionnaire : _______________</p></div>`
  },
  {
    code: 'auto2_credit_bail', name: "Accord de financement automobile (crédit-bail)", category: 'commercial_financier', price: 7000, priceMax: 18000,
    description: "Accord de crédit-bail (leasing financier) pour l'acquisition d'un véhicule avec option d'achat finale.", templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'preneur',label:"Nom/raison sociale du preneur",type:'text',required:true},
      {key:'vehicule',label:"Désignation du véhicule financé",type:'text',required:true},
      {key:'valeur_financement',label:"Valeur de financement (FCFA)",type:'text',required:true},
      {key:'loyer_mensuel',label:"Loyer mensuel (FCFA)",type:'text',required:true},
      {key:'duree_mois',label:"Durée du crédit-bail (mois)",type:'text',required:true},
      {key:'date_debut',label:"Date de début du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE FINANCEMENT AUTOMOBILE — CRÉDIT-BAIL</h1><p>Entre l'établissement financier bailleur et <strong>{{preneur}}</strong> (preneur), il est convenu :</p><h2>Article 1 – Objet</h2><p>Le bailleur acquiert et met à disposition du preneur le véhicule suivant : {{vehicule}}</p><h2>Article 2 – Valeur de financement</h2><p>{{valeur_financement}} FCFA</p><h2>Article 3 – Loyer</h2><p>Loyer mensuel : {{loyer_mensuel}} FCFA sur une durée de {{duree_mois}} mois à compter du {{date_debut}}.</p><h2>Article 4 – Option d'achat</h2><p>À l'échéance, le preneur peut lever l'option d'achat au prix résiduel défini en annexe.</p><h2>Article 5 – Droit applicable</h2><p>Le présent accord est régi par le droit OHADA et les lois de Côte d'Ivoire.</p><p>Fait à Abidjan, le {{date_debut}}</p><p>Signature preneur : _______________ Signature bailleur : _______________</p></div>`
  },
  {
    code: 'auto2_leasing_lld', name: "Accord de leasing automobile longue durée", category: 'commercial_financier', price: 7000, priceMax: 16000,
    description: "Contrat de location longue durée (LLD) de véhicule sans option d'achat, incluant services intégrés.", templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'locataire',label:"Nom/raison sociale du locataire",type:'text',required:true},
      {key:'vehicule',label:"Désignation du véhicule",type:'text',required:true},
      {key:'loyer_ht',label:"Loyer mensuel HT (FCFA)",type:'text',required:true},
      {key:'duree_mois',label:"Durée de la location (mois)",type:'text',required:true},
      {key:'kilometrage_annuel',label:"Kilométrage annuel autorisé",type:'text',required:true},
      {key:'date_prise_effet',label:"Date de prise d'effet",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE LEASING AUTOMOBILE — LOCATION LONGUE DURÉE</h1><p>Locataire : <strong>{{locataire}}</strong></p><h2>Article 1 – Véhicule loué</h2><p>{{vehicule}}</p><h2>Article 2 – Durée et loyer</h2><p>Durée : {{duree_mois}} mois — Loyer mensuel HT : {{loyer_ht}} FCFA</p><h2>Article 3 – Kilométrage</h2><p>Kilométrage annuel contractuel : {{kilometrage_annuel}} km. Tout dépassement fera l'objet d'une facturation complémentaire.</p><h2>Article 4 – Services inclus</h2><p>Entretien préventif, assistance 24h/24, gestion des pneumatiques selon modalités en annexe.</p><h2>Article 5 – Restitution</h2><p>Le véhicule doit être restitué en bon état à la fin du contrat.</p><p>Fait à Abidjan, le {{date_prise_effet}}</p><p>Signature locataire : _______________ Signature société : _______________</p></div>`
  },
  {
    code: 'auto2_garantie_constructeur', name: "Accord de garantie constructeur (extension de garantie)", category: 'commercial_financier', price: 4000, priceMax: 10000,
    description: "Extension de garantie constructeur pour véhicule neuf ou récent, couvrant pièces et main-d'oeuvre.", templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'beneficiaire',label:"Nom du bénéficiaire",type:'text',required:true},
      {key:'vehicule',label:"Désignation du véhicule",type:'text',required:true},
      {key:'numero_chassis',label:"Numéro de châssis",type:'text',required:true},
      {key:'duree_garantie',label:"Durée de l'extension (mois)",type:'text',required:true},
      {key:'date_effet',label:"Date d'effet de la garantie",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D'EXTENSION DE GARANTIE CONSTRUCTEUR</h1><p>Bénéficiaire : <strong>{{beneficiaire}}</strong></p><h2>Article 1 – Véhicule concerné</h2><p>{{vehicule}} — Châssis : {{numero_chassis}}</p><h2>Article 2 – Durée</h2><p>Extension de garantie de {{duree_garantie}} mois à compter du {{date_effet}}.</p><h2>Article 3 – Couverture</h2><p>La garantie couvre les défauts de pièces mécaniques et la main-d'oeuvre dans les ateliers agréés du réseau concessionnaire.</p><h2>Article 4 – Exclusions</h2><p>Sont exclus : usure normale, dommages accidentels, modifications non homologuées.</p><p>Fait à Abidjan, le {{date_effet}}</p><p>Signature bénéficiaire : _______________ Signature garant : _______________</p></div>`
  },
  {
    code: 'auto2_sav', name: "Accord de service après-vente (SAV) automobile", category: 'commercial_financier', price: 3500, priceMax: 8000,
    description: "Convention de service après-vente entre un concessionnaire et un client, définissant les prestations SAV.", templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'client',label:"Nom du client",type:'text',required:true},
      {key:'vehicule',label:"Désignation du véhicule",type:'text',required:true},
      {key:'prestations',label:"Prestations SAV incluses",type:'textarea',required:true},
      {key:'tarif_horaire',label:"Tarif horaire main-d'oeuvre (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début de la convention",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE APRÈS-VENTE AUTOMOBILE</h1><p>Client : <strong>{{client}}</strong><br/>Véhicule : {{vehicule}}</p><h2>Article 1 – Prestations</h2><p>{{prestations}}</p><h2>Article 2 – Tarification</h2><p>Tarif horaire main-d'oeuvre : {{tarif_horaire}} FCFA HT. Les pièces sont facturées au prix du tarif catalogue en vigueur.</p><h2>Article 3 – Délais d'intervention</h2><p>Le concessionnaire s'engage à prendre en charge le véhicule dans les 48 heures ouvrables suivant le dépôt.</p><h2>Article 4 – Durée</h2><p>Convention valable 12 mois à compter du {{date_debut}}, renouvelable par tacite reconduction.</p><p>Fait à Abidjan, le {{date_debut}}</p><p>Signature client : _______________ Signature concessionnaire : _______________</p></div>`
  },
  {
    code: 'auto2_revision_entretien', name: "Accord de service de révision et entretien véhicule", category: 'commercial_financier', price: 2500, priceMax: 6000,
    description: "Forfait de révision et entretien périodique d'un véhicule par un atelier agréé ou indépendant.", templateType: 'pdf', classe: 'C', active: true, popularity: 75,
    fieldsJson: F([
      {key:'client',label:"Nom du propriétaire",type:'text',required:true},
      {key:'vehicule',label:"Véhicule (marque, modèle, immatriculation)",type:'text',required:true},
      {key:'type_revision',label:"Type de révision (petite, grande, complète)",type:'text',required:true},
      {key:'montant_forfait',label:"Montant forfaitaire (FCFA)",type:'text',required:true},
      {key:'date_rdv',label:"Date du rendez-vous",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>BON DE COMMANDE — RÉVISION ET ENTRETIEN VÉHICULE</h1><p>Client : <strong>{{client}}</strong><br/>Véhicule : {{vehicule}}</p><h2>Article 1 – Prestation</h2><p>Type de révision : {{type_revision}}</p><h2>Article 2 – Tarif forfaitaire</h2><p>Montant TTC : {{montant_forfait}} FCFA</p><h2>Article 3 – Date d'intervention</h2><p>{{date_rdv}}</p><h2>Article 4 – Garantie des travaux</h2><p>Les travaux sont garantis 3 mois ou 5 000 km (le premier terme échu).</p><p>Fait à Abidjan, le {{date_rdv}}</p><p>Signature client : _______________ Signature atelier : _______________</p></div>`
  },
  {
    code: 'auto2_carrosserie', name: "Accord de service de réparation carrosserie", category: 'commercial_financier', price: 3000, priceMax: 8000,
    description: "Bon de commande de réparation carrosserie, peinture et débosselage, avec descriptif des dommages.", templateType: 'pdf', classe: 'C', active: true, popularity: 65,
    fieldsJson: F([
      {key:'client',label:"Nom du client",type:'text',required:true},
      {key:'vehicule',label:"Véhicule (marque, modèle, immatriculation)",type:'text',required:true},
      {key:'description_dommages',label:"Description des dommages constatés",type:'textarea',required:true},
      {key:'devis_montant',label:"Montant du devis TTC (FCFA)",type:'text',required:true},
      {key:'date_depot',label:"Date de dépôt du véhicule",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE RÉPARATION CARROSSERIE</h1><p>Client : <strong>{{client}}</strong><br/>Véhicule : {{vehicule}}</p><h2>Article 1 – Dommages constatés</h2><p>{{description_dommages}}</p><h2>Article 2 – Devis accepté</h2><p>Montant TTC accepté : {{devis_montant}} FCFA</p><h2>Article 3 – Délai de restitution</h2><p>Le véhicule sera restitué dans le délai convenu à la date de dépôt : {{date_depot}}. Tout retard sera communiqué au client.</p><h2>Article 4 – Paiement</h2><p>Le règlement est dû à la restitution du véhicule.</p><p>Fait à Abidjan, le {{date_depot}}</p><p>Signature client : _______________ Signature carrossier : _______________</p></div>`
  },
  {
    code: 'auto2_pneumatiques', name: "Accord de service de pneumatiques (pneus)", category: 'commercial_financier', price: 2000, priceMax: 5000,
    description: "Bon de commande de montage, équilibrage et remplacement de pneumatiques pour véhicule.", templateType: 'pdf', classe: 'C', active: true, popularity: 60,
    fieldsJson: F([
      {key:'client',label:"Nom du client",type:'text',required:true},
      {key:'vehicule',label:"Véhicule concerné",type:'text',required:true},
      {key:'type_pneus',label:"Type et dimensions des pneumatiques",type:'text',required:true},
      {key:'quantite',label:"Nombre de pneus",type:'text',required:true},
      {key:'date_service',label:"Date de prestation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>BON DE COMMANDE — SERVICE PNEUMATIQUES</h1><p>Client : <strong>{{client}}</strong><br/>Véhicule : {{vehicule}}</p><h2>Article 1 – Prestation</h2><p>Fourniture et montage de {{quantite}} pneumatique(s) de type : {{type_pneus}}</p><h2>Article 2 – Prestations incluses</h2><p>Démontage, montage, équilibrage et gonflage aux pressions préconisées constructeur.</p><h2>Article 3 – Date</h2><p>{{date_service}}</p><p>Fait à Abidjan, le {{date_service}}</p><p>Signature client : _______________ Signature prestataire : _______________</p></div>`
  },
  {
    code: 'auto2_geolocalisation_flotte', name: "Accord de service de géolocalisation de flotte (GPS)", category: 'commercial_financier', price: 5000, priceMax: 14000,
    description: "Contrat d'abonnement au service de géolocalisation GPS pour la gestion d'une flotte de véhicules.", templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'entreprise',label:"Raison sociale de l'entreprise",type:'text',required:true},
      {key:'nombre_vehicules',label:"Nombre de véhicules équipés",type:'text',required:true},
      {key:'abonnement_mensuel',label:"Abonnement mensuel par véhicule (FCFA)",type:'text',required:true},
      {key:'duree_contrat',label:"Durée du contrat (mois)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GÉOLOCALISATION DE FLOTTE</h1><p>Entreprise : <strong>{{entreprise}}</strong></p><h2>Article 1 – Périmètre</h2><p>{{nombre_vehicules}} véhicule(s) équipé(s) de balises GPS fournies par le prestataire.</p><h2>Article 2 – Abonnement</h2><p>{{abonnement_mensuel}} FCFA HT par véhicule et par mois, pour une durée de {{duree_contrat}} mois.</p><h2>Article 3 – Services inclus</h2><p>Accès à la plateforme de suivi temps réel, historique des trajets, alertes de zone, rapports mensuels.</p><h2>Article 4 – Confidentialité</h2><p>Les données de localisation sont à usage exclusif du client.</p><p>Fait à Abidjan, le {{date_debut}}</p><p>Signature client : _______________ Signature prestataire : _______________</p></div>`
  },
  {
    code: 'auto2_controle_technique', name: "Accord de service de contrôle technique (SOTRA CI)", category: 'commercial_financier', price: 2000, priceMax: 5000,
    description: "Bon de passage au contrôle technique périodique obligatoire des véhicules en Côte d'Ivoire.", templateType: 'pdf', classe: 'C', active: true, popularity: 78,
    fieldsJson: F([
      {key:'proprietaire',label:"Nom du propriétaire",type:'text',required:true},
      {key:'vehicule',label:"Marque, modèle, immatriculation",type:'text',required:true},
      {key:'date_visite',label:"Date de visite",type:'date',required:true},
      {key:'centre_controle',label:"Centre de contrôle technique",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>BON DE PASSAGE — CONTRÔLE TECHNIQUE VÉHICULE</h1><p>Propriétaire : <strong>{{proprietaire}}</strong><br/>Véhicule : {{vehicule}}</p><h2>Article 1 – Objet</h2><p>Le présent document confirme le passage du véhicule au contrôle technique périodique obligatoire.</p><h2>Article 2 – Centre</h2><p>Centre de contrôle : {{centre_controle}}<br/>Date de visite : {{date_visite}}</p><h2>Article 3 – Obligations</h2><p>Le propriétaire s'engage à présenter le véhicule dans un état permettant l'examen complet des organes de sécurité.</p><p>Fait à Abidjan, le {{date_visite}}</p><p>Signature propriétaire : _______________</p></div>`
  },
  {
    code: 'auto2_lavage_auto', name: "Accord de service de lavage auto professionnel", category: 'commercial_financier', price: 2000, priceMax: 4500,
    description: "Abonnement ou bon de commande de lavage automobile professionnel pour particulier ou flotte.", templateType: 'pdf', classe: 'C', active: true, popularity: 55,
    fieldsJson: F([
      {key:'client',label:"Nom du client",type:'text',required:true},
      {key:'formule',label:"Formule choisie (basique, premium, détailing)",type:'text',required:true},
      {key:'nombre_lavages',label:"Nombre de lavages (abonnement mensuel)",type:'text',required:true},
      {key:'tarif',label:"Tarif mensuel (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE LAVAGE AUTO PROFESSIONNEL</h1><p>Client : <strong>{{client}}</strong></p><h2>Article 1 – Formule</h2><p>Formule souscrite : {{formule}} — {{nombre_lavages}} lavage(s) par mois</p><h2>Article 2 – Tarif</h2><p>{{tarif}} FCFA par mois, prélevé en début de période.</p><h2>Article 3 – Validité</h2><p>Abonnement mensuel renouvelable par tacite reconduction à compter du {{date_debut}}.</p><p>Fait à Abidjan, le {{date_debut}}</p><p>Signature client : _______________ Signature prestataire : _______________</p></div>`
  },
  {
    code: 'auto2_station_carwash', name: "Accord de service de station-service et carwash", category: 'commercial_financier', price: 2000, priceMax: 5000,
    description: "Convention d'approvisionnement en carburant et services carwash pour une flotte d'entreprise.", templateType: 'pdf', classe: 'C', active: true, popularity: 58,
    fieldsJson: F([
      {key:'entreprise',label:"Raison sociale de l'entreprise",type:'text',required:true},
      {key:'nombre_vehicules',label:"Nombre de véhicules de la flotte",type:'text',required:true},
      {key:'plafond_mensuel',label:"Plafond mensuel carburant (FCFA)",type:'text',required:true},
      {key:'remise',label:"Remise accordée (%)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONVENTION STATION-SERVICE ET CARWASH — FLOTTE ENTREPRISE</h1><p>Entreprise : <strong>{{entreprise}}</strong> — Flotte de {{nombre_vehicules}} véhicule(s)</p><h2>Article 1 – Approvisionnement en carburant</h2><p>Plafond mensuel autorisé : {{plafond_mensuel}} FCFA avec une remise de {{remise}}% sur le prix pompe.</p><h2>Article 2 – Service carwash</h2><p>Accès au service carwash intégré selon la formule convenue en annexe.</p><h2>Article 3 – Facturation</h2><p>Facturation mensuelle consolidée avec relevé détaillé par véhicule.</p><p>Fait à Abidjan, le {{date_debut}}</p><p>Signature entreprise : _______________ Signature station : _______________</p></div>`
  },
  {
    code: 'auto2_remorquage', name: "Accord de service de remorquage et dépannage", category: 'commercial_financier', price: 3000, priceMax: 7000,
    description: "Contrat d'assistance remorquage et dépannage routier pour particulier ou entreprise en Côte d'Ivoire.", templateType: 'pdf', classe: 'C', active: true, popularity: 62,
    fieldsJson: F([
      {key:'beneficiaire',label:"Nom du bénéficiaire",type:'text',required:true},
      {key:'vehicule',label:"Véhicule couvert",type:'text',required:true},
      {key:'zone_couverture',label:"Zone de couverture géographique",type:'text',required:true},
      {key:'tarif_annuel',label:"Cotisation annuelle (FCFA)",type:'text',required:true},
      {key:'date_adhesion',label:"Date d'adhésion",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D'ASSISTANCE — REMORQUAGE ET DÉPANNAGE</h1><p>Bénéficiaire : <strong>{{beneficiaire}}</strong><br/>Véhicule : {{vehicule}}</p><h2>Article 1 – Zone de couverture</h2><p>{{zone_couverture}}</p><h2>Article 2 – Prestations</h2><p>Intervention d'urgence 24h/24 — 7j/7 : remorquage jusqu'à l'atelier agréé le plus proche, dépannage sur place dans la limite des possibilités techniques.</p><h2>Article 3 – Cotisation</h2><p>{{tarif_annuel}} FCFA par an à compter du {{date_adhesion}}.</p><p>Fait à Abidjan, le {{date_adhesion}}</p><p>Signature bénéficiaire : _______________ Signature prestataire : _______________</p></div>`
  },
  {
    code: 'auto2_location_courte', name: "Accord de service de location de voiture courte durée", category: 'commercial_financier', price: 3000, priceMax: 7500,
    description: "Contrat de location de véhicule à courte durée pour particulier ou professionnel.", templateType: 'pdf', classe: 'B', active: true, popularity: 75,
    fieldsJson: F([
      {key:'locataire',label:"Nom du locataire",type:'text',required:true},
      {key:'permis',label:"Numéro de permis de conduire",type:'text',required:true},
      {key:'vehicule',label:"Véhicule loué",type:'text',required:true},
      {key:'tarif_jour',label:"Tarif journalier (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date et heure de prise en charge",type:'date',required:true},
      {key:'date_retour',label:"Date et heure de retour prévue",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE LOCATION DE VÉHICULE — COURTE DURÉE</h1><p>Locataire : <strong>{{locataire}}</strong> — Permis : {{permis}}</p><h2>Article 1 – Véhicule</h2><p>{{vehicule}}</p><h2>Article 2 – Durée et tarif</h2><p>Du {{date_debut}} au {{date_retour}} — Tarif : {{tarif_jour}} FCFA/jour</p><h2>Article 3 – Conditions</h2><p>Le locataire s'engage à restituer le véhicule propre, avec le plein de carburant, sans dommage. Tout dommage non couvert par la franchise sera facturé.</p><p>Fait à Abidjan, le {{date_debut}}</p><p>Signature locataire : _______________ Signature loueur : _______________</p></div>`
  },
  {
    code: 'auto2_auto_ecole', name: "Accord de service de formation conducteur (auto-école)", category: 'commercial_financier', price: 3000, priceMax: 7000,
    description: "Convention d'inscription et de formation au permis de conduire dans une auto-école agréée en Côte d'Ivoire.", templateType: 'pdf', classe: 'C', active: true, popularity: 68,
    fieldsJson: F([
      {key:'apprenant',label:"Nom de l'apprenant",type:'text',required:true},
      {key:'categorie_permis',label:"Catégorie de permis visée (A, B, C, D…)",type:'text',required:true},
      {key:'forfait',label:"Forfait de formation (FCFA)",type:'text',required:true},
      {key:'nombre_heures',label:"Nombre d'heures de conduite",type:'text',required:true},
      {key:'date_inscription',label:"Date d'inscription",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONVENTION D'INSCRIPTION — AUTO-ÉCOLE</h1><p>Apprenant : <strong>{{apprenant}}</strong></p><h2>Article 1 – Formation</h2><p>Catégorie de permis : {{categorie_permis}} — {{nombre_heures}} heures de conduite pratique</p><h2>Article 2 – Forfait</h2><p>{{forfait}} FCFA incluant la formation théorique (code de la route) et les heures pratiques prévues.</p><h2>Article 3 – Présentation à l'examen</h2><p>L'auto-école s'engage à présenter l'apprenant à l'examen officiel dès validation de la formation.</p><h2>Article 4 – Remboursement</h2><p>En cas d'abandon, les heures déjà dispensées ne sont pas remboursables.</p><p>Fait à Abidjan, le {{date_inscription}}</p><p>Signature apprenant : _______________ Signature directeur : _______________</p></div>`
  },
  {
    code: 'auto2_partenariat_assurance', name: "Accord de partenariat concessionnaire-compagnie d'assurance auto", category: 'commercial_financier', price: 6000, priceMax: 15000,
    description: "Convention de partenariat entre un concessionnaire automobile et une compagnie d'assurance pour proposer des offres intégrées.", templateType: 'pdf', classe: 'A', active: true, popularity: 62,
    fieldsJson: F([
      {key:'concessionnaire',label:"Raison sociale du concessionnaire",type:'text',required:true},
      {key:'assureur',label:"Raison sociale de la compagnie d'assurance",type:'text',required:true},
      {key:'produits_assurance',label:"Produits d'assurance proposés",type:'textarea',required:true},
      {key:'commission',label:"Taux de commission concessionnaire (%)",type:'text',required:true},
      {key:'date_debut',label:"Date d'entrée en vigueur",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT CONCESSIONNAIRE — ASSURANCE AUTO</h1><p><strong>{{concessionnaire}}</strong> et <strong>{{assureur}}</strong> conviennent du partenariat suivant :</p><h2>Article 1 – Objet</h2><p>Le concessionnaire distribue, pour le compte de l'assureur, les produits suivants : {{produits_assurance}}</p><h2>Article 2 – Rémunération</h2><p>Le concessionnaire perçoit une commission de {{commission}}% sur les primes nettes souscrites via son réseau.</p><h2>Article 3 – Formation</h2><p>L'assureur s'engage à former le personnel du concessionnaire à la présentation des produits.</p><h2>Article 4 – Durée</h2><p>Partenariat d'un an renouvelable à compter du {{date_debut}}.</p><p>Fait à Abidjan, le {{date_debut}}</p><p>Signature concessionnaire : _______________ Signature assureur : _______________</p></div>`
  },
  {
    code: 'auto2_partenariat_financier', name: "Accord de partenariat concessionnaire-institution financière", category: 'commercial_financier', price: 7000, priceMax: 16000,
    description: "Accord-cadre de partenariat entre un concessionnaire automobile et une banque ou SFD pour le financement clientèle.", templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'concessionnaire',label:"Raison sociale du concessionnaire",type:'text',required:true},
      {key:'institution',label:"Raison sociale de l'institution financière",type:'text',required:true},
      {key:'taux_interet',label:"Taux d'intérêt préférentiel (%)",type:'text',required:true},
      {key:'apport_minimum',label:"Apport minimum requis (%)",type:'text',required:true},
      {key:'date_debut',label:"Date de début du partenariat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT — CONCESSIONNAIRE ET INSTITUTION FINANCIÈRE</h1><p><strong>{{concessionnaire}}</strong> et <strong>{{institution}}</strong></p><h2>Article 1 – Objet</h2><p>Faciliter l'accès au crédit automobile pour les clients du concessionnaire via des offres de financement préférentielles.</p><h2>Article 2 – Conditions préférentielles</h2><p>Taux d'intérêt : {{taux_interet}}% — Apport minimum : {{apport_minimum}}% du prix du véhicule</p><h2>Article 3 – Instruction des dossiers</h2><p>L'institution s'engage à instruire les dossiers transmis par le concessionnaire dans un délai de 5 jours ouvrables.</p><h2>Article 4 – Durée</h2><p>Accord d'un an renouvelable à compter du {{date_debut}}.</p><p>Fait à Abidjan, le {{date_debut}}</p><p>Signature concessionnaire : _______________ Signature institution : _______________</p></div>`
  },
  {
    code: 'auto2_franchise_reparateurs', name: "Accord de franchise réseau de réparateurs", category: 'commercial_financier', price: 8000, priceMax: 18000,
    description: "Contrat de franchise pour intégrer un réseau de garages et réparateurs automobiles agréés en Côte d'Ivoire.", templateType: 'pdf', classe: 'A', active: true, popularity: 58,
    fieldsJson: F([
      {key:'franchiseur',label:"Raison sociale du franchiseur (tête de réseau)",type:'text',required:true},
      {key:'franchisé',label:"Raison sociale du franchisé",type:'text',required:true},
      {key:'zone_exclusivite',label:"Zone géographique d'exclusivité",type:'text',required:true},
      {key:'droit_entree',label:"Droit d'entrée (FCFA)",type:'text',required:true},
      {key:'redevance_mensuelle',label:"Redevance mensuelle (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE FRANCHISE — RÉSEAU DE RÉPARATEURS AUTOMOBILES</h1><p>Franchiseur : <strong>{{franchiseur}}</strong><br/>Franchisé : <strong>{{franchisé}}</strong></p><h2>Article 1 – Objet</h2><p>Le franchiseur concède au franchisé le droit d'exploiter un atelier de réparation automobile sous son enseigne dans la zone : {{zone_exclusivite}}</p><h2>Article 2 – Contrepartie financière</h2><p>Droit d'entrée : {{droit_entree}} FCFA — Redevance mensuelle : {{redevance_mensuelle}} FCFA</p><h2>Article 3 – Obligations du franchisé</h2><p>Respect du cahier des charges technique, utilisation exclusive des pièces agréées, formation continue du personnel.</p><h2>Article 4 – Durée</h2><p>5 ans renouvelables à compter du {{date_debut}}.</p><p>Fait à Abidjan, le {{date_debut}}</p><p>Signature franchiseur : _______________ Signature franchisé : _______________</p></div>`
  },
  {
    code: 'auto2_pieces_detachees', name: "Accord de distribution de pièces détachées automobiles", category: 'commercial_financier', price: 5000, priceMax: 12000,
    description: "Convention de distribution exclusive ou non exclusive de pièces détachées automobiles entre importateur et revendeur.", templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'fournisseur',label:"Raison sociale du fournisseur/importateur",type:'text',required:true},
      {key:'distributeur',label:"Raison sociale du distributeur",type:'text',required:true},
      {key:'marques_couvertes',label:"Marques et familles de pièces couvertes",type:'textarea',required:true},
      {key:'remise_commerciale',label:"Remise commerciale accordée (%)",type:'text',required:true},
      {key:'date_debut',label:"Date d'entrée en vigueur",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE DISTRIBUTION — PIÈCES DÉTACHÉES AUTOMOBILES</h1><p>Fournisseur : <strong>{{fournisseur}}</strong><br/>Distributeur : <strong>{{distributeur}}</strong></p><h2>Article 1 – Objet</h2><p>Le fournisseur accorde au distributeur le droit de commercialiser les pièces détachées suivantes : {{marques_couvertes}}</p><h2>Article 2 – Conditions commerciales</h2><p>Remise sur prix catalogue : {{remise_commerciale}}%. Minimum de commande mensuelle défini en annexe.</p><h2>Article 3 – Garantie produits</h2><p>Les pièces sont garanties conformes aux spécifications d'origine. Le distributeur ne peut vendre des pièces contrefaites.</p><h2>Article 4 – Durée</h2><p>Accord valable un an renouvelable à compter du {{date_debut}}.</p><p>Fait à Abidjan, le {{date_debut}}</p><p>Signature fournisseur : _______________ Signature distributeur : _______________</p></div>`
  },
  {
    code: 'auto2_rapport_performance', name: "Rapport de performance concession automobile", category: 'commercial_financier', price: 4000, priceMax: 10000,
    description: "Rapport mensuel ou trimestriel de performance commerciale et financière d'une concession automobile.", templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'concession',label:"Nom de la concession",type:'text',required:true},
      {key:'periode',label:"Période couverte (mois/trimestre/année)",type:'text',required:true},
      {key:'ventes_vn',label:"Nombre de véhicules neufs vendus",type:'text',required:true},
      {key:'ventes_vo',label:"Nombre de véhicules d'occasion vendus",type:'text',required:true},
      {key:'chiffre_affaires',label:"Chiffre d'affaires total (FCFA)",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE — CONCESSION AUTOMOBILE</h1><p>Concession : <strong>{{concession}}</strong><br/>Période : {{periode}}</p><h2>1. Ventes</h2><p>Véhicules neufs (VN) vendus : {{ventes_vn}}<br/>Véhicules d'occasion (VO) vendus : {{ventes_vo}}</p><h2>2. Chiffre d'affaires</h2><p>CA total : {{chiffre_affaires}} FCFA</p><h2>3. Analyse et perspectives</h2><p>Commentaires de la direction commerciale sur les performances de la période et les objectifs de la période suivante.</p><p>Rapport établi le : {{date_rapport}}</p><p>Signature directeur de concession : _______________</p></div>`
  },
  {
    code: 'auto2_plan_reseau', name: "Plan de développement réseau de distribution auto", category: 'commercial_financier', price: 6000, priceMax: 15000,
    description: "Document stratégique de développement et d'extension d'un réseau de distribution automobile en Afrique de l'Ouest.", templateType: 'pdf', classe: 'A', active: true, popularity: 50,
    fieldsJson: F([
      {key:'entreprise',label:"Raison sociale de l'entreprise",type:'text',required:true},
      {key:'marque',label:"Marque(s) représentée(s)",type:'text',required:true},
      {key:'zones_cibles',label:"Zones géographiques cibles",type:'textarea',required:true},
      {key:'objectif_points_vente',label:"Objectif nombre de points de vente",type:'text',required:true},
      {key:'date_plan',label:"Date du plan",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT — RÉSEAU DE DISTRIBUTION AUTOMOBILE</h1><p>Entreprise : <strong>{{entreprise}}</strong> — Marque(s) : {{marque}}</p><h2>1. Ambition</h2><p>Objectif : {{objectif_points_vente}} points de vente actifs dans les zones : {{zones_cibles}}</p><h2>2. Critères de sélection des partenaires</h2><p>Surface minimale de showroom, capacité financière, expérience sectorielle, infrastructure SAV.</p><h2>3. Support apporté</h2><p>Formation initiale, outils marketing, allocation de stock, conditions de financement préférentielles.</p><h2>4. Calendrier</h2><p>Déploiement progressif selon jalons définis en annexe opérationnelle.</p><p>Document établi le : {{date_plan}}</p><p>Signature directeur réseau : _______________</p></div>`
  },
  {
    code: 'auto2_vente_encheres', name: "Accord de service de vente aux enchères véhicules", category: 'commercial_financier', price: 4000, priceMax: 10000,
    description: "Accord de mandat pour la mise en vente aux enchères d'un ou plusieurs véhicules par une société spécialisée.", templateType: 'pdf', classe: 'B', active: true, popularity: 52,
    fieldsJson: F([
      {key:'mandant',label:"Nom du mandant (vendeur)",type:'text',required:true},
      {key:'vehicules',label:"Description des véhicules mis en vente",type:'textarea',required:true},
      {key:'prix_reserve',label:"Prix de réserve minimum (FCFA)",type:'text',required:true},
      {key:'commission_vente',label:"Commission de vente (%)",type:'text',required:true},
      {key:'date_enchere',label:"Date de la vente aux enchères",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE VENTE AUX ENCHÈRES — VÉHICULES</h1><p>Mandant : <strong>{{mandant}}</strong></p><h2>Article 1 – Véhicules</h2><p>{{vehicules}}</p><h2>Article 2 – Prix de réserve</h2><p>Les véhicules ne seront attribués qu'au-dessus du prix de réserve fixé à {{prix_reserve}} FCFA.</p><h2>Article 3 – Commission</h2><p>En cas de vente, le mandataire perçoit {{commission_vente}}% du prix d'adjudication.</p><h2>Article 4 – Date</h2><p>Vente organisée le {{date_enchere}}.</p><p>Fait à Abidjan, le {{date_enchere}}</p><p>Signature mandant : _______________ Signature mandataire : _______________</p></div>`
  },
  {
    code: 'auto2_charte_qualite', name: "Charte de qualité service automobile", category: 'commercial_financier', price: 3000, priceMax: 7000,
    description: "Charte de qualité définissant les standards de service et d'accueil d'un réseau automobile agréé.", templateType: 'pdf', classe: 'B', active: true, popularity: 57,
    fieldsJson: F([
      {key:'reseau',label:"Nom du réseau ou de la concession",type:'text',required:true},
      {key:'marque',label:"Marque(s) couverte(s)",type:'text',required:true},
      {key:'engagements',label:"Engagements qualité principaux",type:'textarea',required:true},
      {key:'date_adoption',label:"Date d'adoption de la charte",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE QUALITÉ SERVICE AUTOMOBILE</h1><p>Réseau : <strong>{{reseau}}</strong> — Marque(s) : {{marque}}</p><h2>Préambule</h2><p>Le réseau {{reseau}} s'engage à offrir à chaque client une expérience de qualité, conforme aux standards constructeur et aux attentes du marché ivoirien.</p><h2>Nos engagements</h2><p>{{engagements}}</p><h2>Indicateurs de suivi</h2><p>Satisfaction client mesurée par enquêtes trimestrielles — Taux de résolution premier contact — Délai moyen de prise en charge atelier.</p><h2>Date d'adoption</h2><p>{{date_adoption}}</p><p>Signature directeur général : _______________</p></div>`
  },

  // ── IMMOBILIER RÉSIDENTIEL / PROMOTION (prom_) ─────────────────────────────
  {
    code: 'prom_vefa_contrat', name: "Contrat de promotion immobilière (VEFA - Vente en Etat Futur d'Achèvement)", category: 'immobilier', price: 12000, priceMax: 30000,
    description: "Contrat de vente en état futur d'achèvement conforme au droit ivoirien et aux pratiques OHADA.", templateType: 'pdf', classe: 'A', active: true, popularity: 85,
    fieldsJson: F([
      {key:'promoteur',label:"Raison sociale du promoteur",type:'text',required:true},
      {key:'acquereur',label:"Nom complet de l'acquéreur",type:'text',required:true},
      {key:'description_bien',label:"Description du bien (type, superficie, programme)",type:'textarea',required:true},
      {key:'prix_vente',label:"Prix de vente TTC (FCFA)",type:'text',required:true},
      {key:'echeancier',label:"Échéancier de paiement",type:'textarea',required:true},
      {key:'date_livraison',label:"Date de livraison prévisionnelle",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE VENTE EN ÉTAT FUTUR D'ACHÈVEMENT (VEFA)</h1><p>Promoteur : <strong>{{promoteur}}</strong><br/>Acquéreur : <strong>{{acquereur}}</strong></p><h2>Article 1 – Désignation du bien</h2><p>{{description_bien}}</p><h2>Article 2 – Prix</h2><p>Prix de vente TTC : {{prix_vente}} FCFA</p><h2>Article 3 – Modalités de paiement</h2><p>{{echeancier}}</p><h2>Article 4 – Délai de livraison</h2><p>Date de livraison prévisionnelle : {{date_livraison}}. Tout retard de plus de 30 jours ouvrira droit à pénalités.</p><h2>Article 5 – Garanties</h2><p>Garantie financière d'achèvement et garantie de remboursement conformément à la réglementation en vigueur.</p><p>Fait à Abidjan, en l'étude notariale.</p><p>Signature acquéreur : _______________ Signature promoteur : _______________</p></div>`
  },
  {
    code: 'prom_reservation_vefa', name: "Contrat de réservation VEFA", category: 'immobilier', price: 5000, priceMax: 12000,
    description: "Contrat préliminaire de réservation d'un bien en VEFA avec dépôt de garantie.", templateType: 'pdf', classe: 'B', active: true, popularity: 80,
    fieldsJson: F([
      {key:'reservataire',label:"Nom du réservataire",type:'text',required:true},
      {key:'promoteur',label:"Raison sociale du promoteur",type:'text',required:true},
      {key:'lot',label:"Numéro de lot réservé",type:'text',required:true},
      {key:'prix_previsionnel',label:"Prix prévisionnel (FCFA)",type:'text',required:true},
      {key:'depot_garantie',label:"Montant du dépôt de garantie (FCFA)",type:'text',required:true},
      {key:'date_reservation',label:"Date de réservation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE RÉSERVATION — VEFA</h1><p>Réservataire : <strong>{{reservataire}}</strong><br/>Promoteur : <strong>{{promoteur}}</strong></p><h2>Article 1 – Bien réservé</h2><p>Lot n° {{lot}} — Prix prévisionnel : {{prix_previsionnel}} FCFA</p><h2>Article 2 – Dépôt de garantie</h2><p>Un dépôt de garantie de {{depot_garantie}} FCFA est versé par le réservataire à la signature du présent contrat.</p><h2>Article 3 – Délai de signature du contrat définitif</h2><p>Le contrat de vente définitif sera signé dans les 3 mois suivant le {{date_reservation}}.</p><h2>Article 4 – Restitution</h2><p>Le dépôt sera restitué intégralement si le promoteur ne propose pas de contrat conforme dans le délai imparti.</p><p>Fait à Abidjan, le {{date_reservation}}</p><p>Signature réservataire : _______________ Signature promoteur : _______________</p></div>`
  },
  {
    code: 'prom_gfa', name: "Accord de garantie financière d'achèvement (GFA)", category: 'immobilier', price: 8000, priceMax: 20000,
    description: "Acte de garantie financière d'achèvement émis par un établissement financier en faveur des acquéreurs VEFA.", templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'garant',label:"Établissement garant (banque ou assureur)",type:'text',required:true},
      {key:'promoteur',label:"Raison sociale du promoteur",type:'text',required:true},
      {key:'programme',label:"Dénomination du programme immobilier",type:'text',required:true},
      {key:'montant_garanti',label:"Montant garanti (FCFA)",type:'text',required:true},
      {key:'date_emission',label:"Date d'émission de la garantie",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>GARANTIE FINANCIÈRE D'ACHÈVEMENT (GFA)</h1><p>Garant : <strong>{{garant}}</strong><br/>Promoteur : <strong>{{promoteur}}</strong></p><h2>Article 1 – Programme garanti</h2><p>{{programme}}</p><h2>Article 2 – Montant</h2><p>Garantie d'un montant de {{montant_garanti}} FCFA.</p><h2>Article 3 – Objet</h2><p>Le garant s'engage irrévocablement à financer l'achèvement de l'immeuble en cas de défaillance du promoteur, jusqu'à concurrence du montant garanti.</p><h2>Article 4 – Bénéficiaires</h2><p>Tous acquéreurs ayant conclu un contrat VEFA pour ledit programme.</p><p>Fait à Abidjan, le {{date_emission}}</p><p>Signature garant : _______________</p></div>`
  },
  {
    code: 'prom_garantie_remboursement', name: "Accord de garantie de remboursement VEFA", category: 'immobilier', price: 6000, priceMax: 14000,
    description: "Garantie de remboursement des sommes versées par les acquéreurs VEFA en cas de non-réalisation de la vente.", templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'garant',label:"Établissement garant",type:'text',required:true},
      {key:'promoteur',label:"Raison sociale du promoteur",type:'text',required:true},
      {key:'programme',label:"Programme immobilier concerné",type:'text',required:true},
      {key:'plafond_garantie',label:"Plafond de garantie (FCFA)",type:'text',required:true},
      {key:'date_emission',label:"Date d'émission",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>GARANTIE DE REMBOURSEMENT — VEFA</h1><p>Garant : <strong>{{garant}}</strong><br/>Promoteur : <strong>{{promoteur}}</strong></p><h2>Article 1 – Objet</h2><p>Le garant s'engage à rembourser les acquéreurs du programme <strong>{{programme}}</strong> des sommes versées en cas de non-conclusion du contrat de vente définitif ou de résolution judiciaire.</p><h2>Article 2 – Plafond</h2><p>{{plafond_garantie}} FCFA.</p><h2>Article 3 – Mise en jeu</h2><p>La garantie est mise en jeu sur simple demande de l'acquéreur lésé accompagnée d'un justificatif de versement.</p><p>Fait à Abidjan, le {{date_emission}}</p><p>Signature garant : _______________</p></div>`
  },
  {
    code: 'prom_ccmi', name: "Contrat de construction de maison individuelle (CCMI)", category: 'immobilier', price: 10000, priceMax: 25000,
    description: "Contrat de construction de maison individuelle entre un constructeur et un maître d'ouvrage, avec garanties légales.", templateType: 'pdf', classe: 'A', active: true, popularity: 78,
    fieldsJson: F([
      {key:'constructeur',label:"Raison sociale du constructeur",type:'text',required:true},
      {key:'maitre_ouvrage',label:"Nom du maître d'ouvrage",type:'text',required:true},
      {key:'adresse_terrain',label:"Adresse et référence cadastrale du terrain",type:'text',required:true},
      {key:'prix_construction',label:"Prix de la construction TTC (FCFA)",type:'text',required:true},
      {key:'delai_travaux',label:"Délai d'exécution des travaux (mois)",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE CONSTRUCTION DE MAISON INDIVIDUELLE (CCMI)</h1><p>Constructeur : <strong>{{constructeur}}</strong><br/>Maître d'ouvrage : <strong>{{maitre_ouvrage}}</strong></p><h2>Article 1 – Terrain</h2><p>{{adresse_terrain}}</p><h2>Article 2 – Prix</h2><p>Prix forfaitaire et définitif TTC : {{prix_construction}} FCFA</p><h2>Article 3 – Délai</h2><p>Délai d'exécution : {{delai_travaux}} mois à compter de l'ouverture de chantier. Des pénalités de retard sont prévues en annexe.</p><h2>Article 4 – Garanties</h2><p>Garantie de parfait achèvement, garantie biennale, garantie décennale souscrites par le constructeur.</p><h2>Article 5 – Droit applicable</h2><p>Droit ivoirien et Acte Uniforme OHADA sur le droit commercial.</p><p>Fait à Abidjan, le {{date_signature}}</p><p>Signature maître d'ouvrage : _______________ Signature constructeur : _______________</p></div>`
  },
  {
    code: 'prom_amo', name: "Accord de maîtrise d'ouvrage délégué (AMO)", category: 'immobilier', price: 7000, priceMax: 16000,
    description: "Convention de délégation de maîtrise d'ouvrage confiée à un prestataire spécialisé pour piloter un projet immobilier.", templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      {key:'mandant',label:"Nom du maître d'ouvrage mandant",type:'text',required:true},
      {key:'amo',label:"Raison sociale du prestataire AMO",type:'text',required:true},
      {key:'projet',label:"Description du projet immobilier",type:'textarea',required:true},
      {key:'honoraires',label:"Honoraires AMO (FCFA ou % budget)",type:'text',required:true},
      {key:'date_debut',label:"Date de début de mission",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE MAÎTRISE D'OUVRAGE DÉLÉGUÉ (AMO)</h1><p>Mandant : <strong>{{mandant}}</strong><br/>Prestataire AMO : <strong>{{amo}}</strong></p><h2>Article 1 – Projet</h2><p>{{projet}}</p><h2>Article 2 – Mission</h2><p>L'AMO est chargé de piloter le projet en toutes ses phases : programmation, consultation entreprises, suivi chantier, réception des travaux.</p><h2>Article 3 – Honoraires</h2><p>{{honoraires}}</p><h2>Article 4 – Durée</h2><p>Mission courant à compter du {{date_debut}} jusqu'à la livraison définitive de l'ouvrage.</p><p>Fait à Abidjan, le {{date_debut}}</p><p>Signature mandant : _______________ Signature AMO : _______________</p></div>`
  },
  {
    code: 'prom_architecture_moe', name: "Accord de service d'architecture et maîtrise d'oeuvre", category: 'immobilier', price: 8000, priceMax: 18000,
    description: "Contrat de mission d'architecture et de maîtrise d'oeuvre pour la conception et le suivi d'un projet immobilier.", templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'client',label:"Nom du client (maître d'ouvrage)",type:'text',required:true},
      {key:'architecte',label:"Nom/raison sociale de l'architecte",type:'text',required:true},
      {key:'projet',label:"Description et localisation du projet",type:'textarea',required:true},
      {key:'honoraires',label:"Honoraires (% du coût des travaux ou forfait FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début de mission",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT D'ARCHITECTURE ET DE MAÎTRISE D'OEUVRE</h1><p>Client : <strong>{{client}}</strong><br/>Architecte : <strong>{{architecte}}</strong></p><h2>Article 1 – Projet</h2><p>{{projet}}</p><h2>Article 2 – Mission</h2><p>Esquisse, avant-projet, permis de construire, dossier de consultation des entreprises, direction des travaux, réception.</p><h2>Article 3 – Honoraires</h2><p>{{honoraires}}</p><h2>Article 4 – Responsabilité</h2><p>L'architecte est souscripteur d'une assurance responsabilité civile professionnelle et décennale.</p><p>Fait à Abidjan, le {{date_debut}}</p><p>Signature client : _______________ Signature architecte : _______________</p></div>`
  },
  {
    code: 'prom_promotion_residentielle', name: "Accord de service de promotion immobilière résidentielle", category: 'immobilier', price: 8000, priceMax: 20000,
    description: "Convention de promotion immobilière pour le développement d'un programme résidentiel (villas, appartements).", templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'promoteur',label:"Raison sociale du promoteur",type:'text',required:true},
      {key:'proprietaire_terrain',label:"Propriétaire du terrain",type:'text',required:true},
      {key:'programme',label:"Description du programme immobilier",type:'textarea',required:true},
      {key:'cle_repartition',label:"Clé de répartition des bénéfices",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PROMOTION IMMOBILIÈRE RÉSIDENTIELLE</h1><p>Promoteur : <strong>{{promoteur}}</strong><br/>Propriétaire terrain : <strong>{{proprietaire_terrain}}</strong></p><h2>Article 1 – Programme</h2><p>{{programme}}</p><h2>Article 2 – Apports</h2><p>Le propriétaire apporte le terrain. Le promoteur apporte son savoir-faire, les financements et assure la commercialisation.</p><h2>Article 3 – Répartition</h2><p>{{cle_repartition}}</p><h2>Article 4 – Durée</h2><p>Convention courant à compter du {{date_debut}} jusqu'à la vente complète du programme.</p><p>Fait à Abidjan, le {{date_debut}}</p><p>Signature propriétaire : _______________ Signature promoteur : _______________</p></div>`
  },
  {
    code: 'prom_lotissement', name: "Accord de service de lotissement résidentiel", category: 'immobilier', price: 9000, priceMax: 22000,
    description: "Convention de lotissement et de viabilisation d'un terrain en vue de la création d'un quartier résidentiel.", templateType: 'pdf', classe: 'A', active: true, popularity: 62,
    fieldsJson: F([
      {key:'lotisseur',label:"Raison sociale du lotisseur",type:'text',required:true},
      {key:'proprietaire',label:"Propriétaire foncier",type:'text',required:true},
      {key:'localisation',label:"Localisation et superficie du terrain (ha)",type:'text',required:true},
      {key:'nombre_lots',label:"Nombre de lots créés",type:'text',required:true},
      {key:'date_debut',label:"Date de début des travaux",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE LOTISSEMENT RÉSIDENTIEL</h1><p>Lotisseur : <strong>{{lotisseur}}</strong><br/>Propriétaire foncier : <strong>{{proprietaire}}</strong></p><h2>Article 1 – Terrain</h2><p>Localisation : {{localisation}}</p><h2>Article 2 – Opération</h2><p>Création de {{nombre_lots}} lots résidentiels viabilisés (voirie, eau, électricité, assainissement).</p><h2>Article 3 – Autorisations</h2><p>Le lotisseur prend en charge l'obtention du permis de lotir auprès des autorités compétentes.</p><h2>Article 4 – Commercialisation</h2><p>La vente des parcelles est assurée par le lotisseur selon un plan de vente annexé.</p><p>Fait à Abidjan, le {{date_debut}}</p><p>Signature propriétaire : _______________ Signature lotisseur : _______________</p></div>`
  },
  {
    code: 'prom_vente_parcelle', name: "Accord de vente de parcelle lotie viabilisée", category: 'immobilier', price: 6000, priceMax: 15000,
    description: "Acte de vente d'une parcelle lotie et viabilisée entre un lotisseur ou particulier et un acquéreur.", templateType: 'pdf', classe: 'A', active: true, popularity: 75,
    fieldsJson: F([
      {key:'vendeur',label:"Nom/raison sociale du vendeur",type:'text',required:true},
      {key:'acquereur',label:"Nom de l'acquéreur",type:'text',required:true},
      {key:'lot_reference',label:"Référence du lot et superficie (m²)",type:'text',required:true},
      {key:'prix_vente',label:"Prix de vente (FCFA)",type:'text',required:true},
      {key:'date_vente',label:"Date de la vente",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACTE DE VENTE — PARCELLE LOTIE VIABILISÉE</h1><p>Vendeur : <strong>{{vendeur}}</strong><br/>Acquéreur : <strong>{{acquereur}}</strong></p><h2>Article 1 – Désignation</h2><p>Lot : {{lot_reference}}</p><h2>Article 2 – Prix</h2><p>{{prix_vente}} FCFA, payé comptant à la signature du présent acte.</p><h2>Article 3 – Titre de propriété</h2><p>Le vendeur garantit être propriétaire et libre de tout litige sur ladite parcelle. Le transfert de propriété est effectif à la date de la vente.</p><h2>Article 4 – Frais</h2><p>Les frais de mutation et d'enregistrement sont à la charge de l'acquéreur.</p><p>Fait à Abidjan, le {{date_vente}}</p><p>Signature vendeur : _______________ Signature acquéreur : _______________</p></div>`
  },
  {
    code: 'prom_vente_villa', name: "Accord de vente de villa (particulier à particulier)", category: 'immobilier', price: 8000, priceMax: 20000,
    description: "Compromis ou acte de vente d'une villa entre particuliers en Côte d'Ivoire, conforme aux pratiques notariales.", templateType: 'pdf', classe: 'A', active: true, popularity: 80,
    fieldsJson: F([
      {key:'vendeur',label:"Identité du vendeur",type:'text',required:true},
      {key:'acquereur',label:"Identité de l'acquéreur",type:'text',required:true},
      {key:'description_villa',label:"Description de la villa (adresse, superficie, pièces)",type:'textarea',required:true},
      {key:'prix_vente',label:"Prix de vente (FCFA)",type:'text',required:true},
      {key:'date_acte',label:"Date de l'acte",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACTE DE VENTE — VILLA RÉSIDENTIELLE</h1><p>Vendeur : <strong>{{vendeur}}</strong><br/>Acquéreur : <strong>{{acquereur}}</strong></p><h2>Article 1 – Bien vendu</h2><p>{{description_villa}}</p><h2>Article 2 – Prix</h2><p>Prix convenu : {{prix_vente}} FCFA</p><h2>Article 3 – Garanties du vendeur</h2><p>Le vendeur garantit l'absence d'hypothèque, de servitude non apparente ou de litige en cours sur ledit bien.</p><h2>Article 4 – Conditions suspensives</h2><p>L'acte définitif sera établi en l'étude notariale dans un délai de 60 jours.</p><p>Fait à Abidjan, le {{date_acte}}</p><p>Signature vendeur : _______________ Signature acquéreur : _______________</p></div>`
  },
  {
    code: 'prom_vente_appartement', name: "Accord de vente d'appartement (copropriété)", category: 'immobilier', price: 8000, priceMax: 20000,
    description: "Acte de vente d'un appartement en copropriété avec annexion des documents de copropriété obligatoires.", templateType: 'pdf', classe: 'A', active: true, popularity: 76,
    fieldsJson: F([
      {key:'vendeur',label:"Identité du vendeur",type:'text',required:true},
      {key:'acquereur',label:"Identité de l'acquéreur",type:'text',required:true},
      {key:'appartement',label:"Description du lot de copropriété (étage, superficie, tantièmes)",type:'textarea',required:true},
      {key:'prix_vente',label:"Prix de vente (FCFA)",type:'text',required:true},
      {key:'date_acte',label:"Date de l'acte",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACTE DE VENTE — APPARTEMENT EN COPROPRIÉTÉ</h1><p>Vendeur : <strong>{{vendeur}}</strong><br/>Acquéreur : <strong>{{acquereur}}</strong></p><h2>Article 1 – Désignation du lot</h2><p>{{appartement}}</p><h2>Article 2 – Prix</h2><p>{{prix_vente}} FCFA</p><h2>Article 3 – Charges de copropriété</h2><p>Les charges de copropriété sont réparties à la date de signature. L'acquéreur reprend les charges à compter de cette date.</p><h2>Article 4 – Règlement de copropriété</h2><p>L'acquéreur reconnaît avoir pris connaissance du règlement de copropriété annexé.</p><p>Fait à Abidjan, le {{date_acte}}</p><p>Signature vendeur : _______________ Signature acquéreur : _______________</p></div>`
  },
  {
    code: 'prom_syndic_copropriete', name: "Accord de service de syndic de copropriété", category: 'immobilier', price: 5000, priceMax: 12000,
    description: "Convention de gestion de copropriété entre le syndicat des copropriétaires et un syndic professionnel.", templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'immeuble',label:"Dénomination et adresse de la copropriété",type:'text',required:true},
      {key:'syndic',label:"Raison sociale du syndic",type:'text',required:true},
      {key:'honoraires_annuels',label:"Honoraires annuels TTC (FCFA)",type:'text',required:true},
      {key:'budget_charges',label:"Budget prévisionnel des charges communes (FCFA)",type:'text',required:true},
      {key:'date_prise_effet',label:"Date de prise d'effet",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>MANDAT DE SYNDIC DE COPROPRIÉTÉ</h1><p>Copropriété : <strong>{{immeuble}}</strong><br/>Syndic : <strong>{{syndic}}</strong></p><h2>Article 1 – Mission</h2><p>Administration des parties communes, gestion financière du syndicat, exécution des décisions d'assemblée générale.</p><h2>Article 2 – Honoraires</h2><p>{{honoraires_annuels}} FCFA TTC par an</p><h2>Article 3 – Budget de charges</h2><p>Budget prévisionnel : {{budget_charges}} FCFA</p><h2>Article 4 – Durée</h2><p>Mandat d'un an renouvelable par décision d'assemblée générale à compter du {{date_prise_effet}}.</p><p>Fait à Abidjan, le {{date_prise_effet}}</p><p>Signature président du syndicat : _______________ Signature syndic : _______________</p></div>`
  },
  {
    code: 'prom_reglement_copropriete', name: "Règlement de copropriété", category: 'immobilier', price: 10000, priceMax: 24000,
    description: "Document fondateur de la copropriété définissant les droits, obligations et règles de vie en commun des copropriétaires.", templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'immeuble',label:"Dénomination et adresse de l'immeuble",type:'text',required:true},
      {key:'nombre_lots',label:"Nombre total de lots",type:'text',required:true},
      {key:'destination',label:"Destination de l'immeuble (résidentielle, mixte…)",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption du règlement",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RÈGLEMENT DE COPROPRIÉTÉ</h1><p>Immeuble : <strong>{{immeuble}}</strong><br/>Nombre de lots : {{nombre_lots}} — Destination : {{destination}}</p><h2>Titre I – Désignation et destination</h2><p>L'immeuble est à usage {{destination}}. Chaque lot comprend une partie privative et une quote-part des parties communes.</p><h2>Titre II – Charges</h2><p>Les charges générales sont réparties proportionnellement aux tantièmes. Les charges spéciales sont imputées selon les services desservis.</p><h2>Titre III – Administration</h2><p>La copropriété est administrée par un syndic désigné par l'assemblée générale des copropriétaires.</p><h2>Titre IV – Règles de vie</h2><p>Interdiction de modifier l'aspect extérieur sans autorisation — respect de la tranquillité et de la salubrité communes.</p><p>Adopté le {{date_adoption}}</p><p>Signature président fondateur : _______________</p></div>`
  },
  {
    code: 'prom_bail_habitation_villa', name: "Accord de location de villa résidentielle (bail d'habitation)", category: 'immobilier', price: 4000, priceMax: 10000,
    description: "Bail d'habitation portant sur une villa résidentielle, conforme à la loi ivoirienne sur les baux d'habitation.", templateType: 'pdf', classe: 'B', active: true, popularity: 85,
    fieldsJson: F([
      {key:'bailleur',label:"Nom du bailleur",type:'text',required:true},
      {key:'locataire',label:"Nom du locataire",type:'text',required:true},
      {key:'adresse_villa',label:"Adresse de la villa",type:'text',required:true},
      {key:'loyer_mensuel',label:"Loyer mensuel (FCFA)",type:'text',required:true},
      {key:'depot_garantie',label:"Dépôt de garantie (FCFA)",type:'text',required:true},
      {key:'date_entree',label:"Date d'entrée dans les lieux",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>BAIL D'HABITATION — VILLA RÉSIDENTIELLE</h1><p>Bailleur : <strong>{{bailleur}}</strong><br/>Locataire : <strong>{{locataire}}</strong></p><h2>Article 1 – Bien loué</h2><p>Villa située : {{adresse_villa}}</p><h2>Article 2 – Loyer</h2><p>Loyer mensuel : {{loyer_mensuel}} FCFA, payable d'avance le 5 de chaque mois.</p><h2>Article 3 – Dépôt de garantie</h2><p>{{depot_garantie}} FCFA, restituable en fin de bail sous réserve d'absence de dommages.</p><h2>Article 4 – Durée</h2><p>Bail d'un an renouvelable par tacite reconduction à compter du {{date_entree}}.</p><h2>Article 5 – Charges</h2><p>Le locataire supporte les charges locatives (eau, électricité, entretien courant).</p><p>Fait à Abidjan, le {{date_entree}}</p><p>Signature bailleur : _______________ Signature locataire : _______________</p></div>`
  },
  {
    code: 'prom_bail_appartement_meuble', name: "Accord de location d'appartement meublé", category: 'immobilier', price: 3500, priceMax: 9000,
    description: "Bail de location meublée pour un appartement, comprenant l'inventaire du mobilier et équipements fournis.", templateType: 'pdf', classe: 'B', active: true, popularity: 78,
    fieldsJson: F([
      {key:'bailleur',label:"Nom du bailleur",type:'text',required:true},
      {key:'locataire',label:"Nom du locataire",type:'text',required:true},
      {key:'appartement',label:"Description de l'appartement",type:'text',required:true},
      {key:'loyer_mensuel',label:"Loyer mensuel charges comprises (FCFA)",type:'text',required:true},
      {key:'date_entree',label:"Date d'entrée",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>BAIL DE LOCATION MEUBLÉE</h1><p>Bailleur : <strong>{{bailleur}}</strong><br/>Locataire : <strong>{{locataire}}</strong></p><h2>Article 1 – Logement</h2><p>{{appartement}}, loué meublé selon inventaire annexé signé par les deux parties.</p><h2>Article 2 – Loyer</h2><p>{{loyer_mensuel}} FCFA par mois, charges comprises.</p><h2>Article 3 – Durée</h2><p>Bail d'un an renouvelable à compter du {{date_entree}}.</p><h2>Article 4 – Obligation du locataire</h2><p>Le locataire s'engage à maintenir le mobilier en bon état et à signaler toute dégradation sans délai.</p><p>Fait à Abidjan, le {{date_entree}}</p><p>Signature bailleur : _______________ Signature locataire : _______________</p></div>`
  },
  {
    code: 'prom_bail_colocation', name: "Accord de colocation", category: 'immobilier', price: 3000, priceMax: 7000,
    description: "Contrat de colocation fixant les droits et obligations de chaque colocataire et les modalités de partage du loyer.", templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'bailleur',label:"Nom du bailleur",type:'text',required:true},
      {key:'colocataires',label:"Noms des colocataires",type:'textarea',required:true},
      {key:'adresse',label:"Adresse du logement",type:'text',required:true},
      {key:'loyer_total',label:"Loyer total mensuel (FCFA)",type:'text',required:true},
      {key:'date_entree',label:"Date d'entrée",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE COLOCATION</h1><p>Bailleur : <strong>{{bailleur}}</strong><br/>Colocataires : {{colocataires}}</p><h2>Article 1 – Logement</h2><p>{{adresse}}</p><h2>Article 2 – Loyer et répartition</h2><p>Loyer total : {{loyer_total}} FCFA — Chaque colocataire est solidairement responsable du paiement intégral du loyer.</p><h2>Article 3 – Règles de vie commune</h2><p>Les colocataires s'engagent à respecter la tranquillité du voisinage et à entretenir les espaces communs du logement.</p><h2>Article 4 – Durée</h2><p>Bail d'un an renouvelable à compter du {{date_entree}}.</p><p>Fait à Abidjan, le {{date_entree}}</p><p>Signatures de toutes les parties : _______________</p></div>`
  },
  {
    code: 'prom_sous_location', name: "Accord de sous-location avec accord du bailleur", category: 'immobilier', price: 3000, priceMax: 7500,
    description: "Contrat de sous-location autorisée par le bailleur principal, fixant les conditions entre locataire et sous-locataire.", templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'locataire_principal',label:"Nom du locataire principal",type:'text',required:true},
      {key:'sous_locataire',label:"Nom du sous-locataire",type:'text',required:true},
      {key:'logement',label:"Description du logement sous-loué",type:'text',required:true},
      {key:'loyer_sous_location',label:"Loyer de sous-location (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SOUS-LOCATION</h1><p>Locataire principal : <strong>{{locataire_principal}}</strong><br/>Sous-locataire : <strong>{{sous_locataire}}</strong></p><h2>Article 1 – Autorisation du bailleur</h2><p>Le présent accord est conclu avec l'accord exprès du bailleur principal (accord joint en annexe).</p><h2>Article 2 – Logement</h2><p>{{logement}}</p><h2>Article 3 – Loyer</h2><p>{{loyer_sous_location}} FCFA par mois, payable au locataire principal.</p><h2>Article 4 – Durée</h2><p>La sous-location court à compter du {{date_debut}} et ne peut excéder la durée du bail principal.</p><p>Fait à Abidjan, le {{date_debut}}</p><p>Signature locataire principal : _______________ Signature sous-locataire : _______________</p></div>`
  },
  {
    code: 'prom_depot_etat_lieux', name: "Accord de dépôt de garantie et état des lieux", category: 'immobilier', price: 2500, priceMax: 6000,
    description: "Document joint au bail constatant l'état des lieux à l'entrée et la remise du dépôt de garantie.", templateType: 'pdf', classe: 'C', active: true, popularity: 80,
    fieldsJson: F([
      {key:'bailleur',label:"Nom du bailleur",type:'text',required:true},
      {key:'locataire',label:"Nom du locataire",type:'text',required:true},
      {key:'logement',label:"Adresse du logement",type:'text',required:true},
      {key:'montant_depot',label:"Montant du dépôt de garantie (FCFA)",type:'text',required:true},
      {key:'date_etat_lieux',label:"Date de l'état des lieux",type:'date',required:true},
      {key:'observations',label:"Observations sur l'état du logement",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ÉTAT DES LIEUX ET DÉPÔT DE GARANTIE</h1><p>Bailleur : <strong>{{bailleur}}</strong><br/>Locataire : <strong>{{locataire}}</strong><br/>Logement : {{logement}}</p><h2>Dépôt de garantie</h2><p>Montant remis : {{montant_depot}} FCFA — Remis le {{date_etat_lieux}}</p><h2>État des lieux à l'entrée</h2><p>{{observations}}</p><h2>Restitution</h2><p>Le dépôt sera restitué dans un délai d'un mois après restitution des clés, déduction faite des éventuelles réparations locatives.</p><p>Fait le {{date_etat_lieux}}</p><p>Signature bailleur : _______________ Signature locataire : _______________</p></div>`
  },
  {
    code: 'prom_gestion_locative', name: "Accord de service de gestion locative (agence)", category: 'immobilier', price: 4000, priceMax: 10000,
    description: "Mandat de gestion locative confié à une agence immobilière pour la gestion d'un ou plusieurs biens.", templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'mandant',label:"Nom du propriétaire mandant",type:'text',required:true},
      {key:'agence',label:"Raison sociale de l'agence",type:'text',required:true},
      {key:'biens',label:"Description du/des bien(s) confié(s)",type:'textarea',required:true},
      {key:'taux_gestion',label:"Taux d'honoraires de gestion (% du loyer)",type:'text',required:true},
      {key:'date_debut',label:"Date de début du mandat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>MANDAT DE GESTION LOCATIVE</h1><p>Mandant : <strong>{{mandant}}</strong><br/>Agence : <strong>{{agence}}</strong></p><h2>Article 1 – Biens gérés</h2><p>{{biens}}</p><h2>Article 2 – Mission</h2><p>Recherche de locataires, rédaction des baux, encaissement des loyers, gestion des travaux courants, relation avec les locataires.</p><h2>Article 3 – Honoraires</h2><p>{{taux_gestion}}% des loyers encaissés TTC</p><h2>Article 4 – Durée</h2><p>Mandat d'un an renouvelable par tacite reconduction à compter du {{date_debut}}.</p><p>Fait à Abidjan, le {{date_debut}}</p><p>Signature mandant : _______________ Signature agence : _______________</p></div>`
  },
  {
    code: 'prom_home_staging', name: "Accord de service de home staging", category: 'immobilier', price: 3000, priceMax: 7000,
    description: "Contrat de prestation de home staging pour valoriser un bien immobilier avant sa mise en vente ou en location.", templateType: 'pdf', classe: 'C', active: true, popularity: 50,
    fieldsJson: F([
      {key:'client',label:"Nom du client",type:'text',required:true},
      {key:'prestataire',label:"Nom du prestataire home stager",type:'text',required:true},
      {key:'bien',label:"Description du bien à valoriser",type:'text',required:true},
      {key:'honoraires',label:"Honoraires de prestation (FCFA)",type:'text',required:true},
      {key:'date_intervention',label:"Date d'intervention",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE HOME STAGING</h1><p>Client : <strong>{{client}}</strong><br/>Prestataire : <strong>{{prestataire}}</strong></p><h2>Article 1 – Bien concerné</h2><p>{{bien}}</p><h2>Article 2 – Prestations</h2><p>Désencombrement, réagencement du mobilier, décoration légère, conseils photographiques pour annonces immobilières.</p><h2>Article 3 – Honoraires</h2><p>{{honoraires}} FCFA, payables à la réalisation de la prestation.</p><h2>Article 4 – Date</h2><p>Intervention prévue le {{date_intervention}}.</p><p>Fait à Abidjan, le {{date_intervention}}</p><p>Signature client : _______________ Signature prestataire : _______________</p></div>`
  },
  {
    code: 'prom_diagnostics_immo', name: "Accord de service de diagnostics immobiliers", category: 'immobilier', price: 3000, priceMax: 7000,
    description: "Commande de diagnostics immobiliers techniques obligatoires (structure, électricité, humidité) avant vente ou location.", templateType: 'pdf', classe: 'C', active: true, popularity: 60,
    fieldsJson: F([
      {key:'client',label:"Nom du client",type:'text',required:true},
      {key:'diagnostiqueur',label:"Raison sociale du diagnostiqueur",type:'text',required:true},
      {key:'bien',label:"Adresse du bien",type:'text',required:true},
      {key:'diagnostics_commandes',label:"Diagnostics commandés",type:'textarea',required:true},
      {key:'date_intervention',label:"Date d'intervention",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>BON DE COMMANDE — DIAGNOSTICS IMMOBILIERS</h1><p>Client : <strong>{{client}}</strong><br/>Diagnostiqueur : <strong>{{diagnostiqueur}}</strong></p><h2>Article 1 – Bien diagnostiqué</h2><p>{{bien}}</p><h2>Article 2 – Diagnostics commandés</h2><p>{{diagnostics_commandes}}</p><h2>Article 3 – Remise du rapport</h2><p>Le rapport de diagnostic sera remis sous 5 jours ouvrables après l'intervention du {{date_intervention}}.</p><h2>Article 4 – Responsabilité</h2><p>Le diagnostiqueur engage sa responsabilité professionnelle sur les conclusions du rapport.</p><p>Fait à Abidjan, le {{date_intervention}}</p><p>Signature client : _______________ Signature diagnostiqueur : _______________</p></div>`
  },
  {
    code: 'prom_expertise_valeur', name: "Rapport d'expertise de valeur immobilière", category: 'immobilier', price: 6000, priceMax: 15000,
    description: "Rapport d'expertise établissant la valeur vénale d'un bien immobilier par un expert agréé.", templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'expert',label:"Nom et qualité de l'expert",type:'text',required:true},
      {key:'donneurs_ordre',label:"Donneur d'ordre (propriétaire, banque, tribunal)",type:'text',required:true},
      {key:'bien',label:"Description et localisation du bien expertisé",type:'textarea',required:true},
      {key:'valeur_venale',label:"Valeur vénale estimée (FCFA)",type:'text',required:true},
      {key:'date_expertise',label:"Date de l'expertise",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT D'EXPERTISE IMMOBILIÈRE</h1><p>Expert : <strong>{{expert}}</strong><br/>Donneur d'ordre : {{donneurs_ordre}}</p><h2>1. Désignation du bien</h2><p>{{bien}}</p><h2>2. Méthodologie</h2><p>L'expertise est fondée sur la méthode par comparaison (analyse des transactions comparables sur le marché ivoirien) et la méthode par le revenu.</p><h2>3. Valeur estimée</h2><p>Valeur vénale au {{date_expertise}} : <strong>{{valeur_venale}} FCFA</strong></p><h2>4. Réserves</h2><p>Cette estimation est valable 6 mois à compter de la date d'expertise.</p><p>Fait à Abidjan, le {{date_expertise}}</p><p>Signature expert : _______________</p></div>`
  },
  {
    code: 'prom_plan_programme_residentiel', name: "Plan de développement programme immobilier résidentiel", category: 'immobilier', price: 7000, priceMax: 18000,
    description: "Document de cadrage stratégique et financier pour le développement d'un programme immobilier résidentiel.", templateType: 'pdf', classe: 'A', active: true, popularity: 55,
    fieldsJson: F([
      {key:'promoteur',label:"Raison sociale du promoteur",type:'text',required:true},
      {key:'programme',label:"Nom et localisation du programme",type:'text',required:true},
      {key:'nombre_logements',label:"Nombre de logements prévus",type:'text',required:true},
      {key:'budget_total',label:"Budget total prévisionnel (FCFA)",type:'text',required:true},
      {key:'date_lancement',label:"Date de lancement prévue",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT — PROGRAMME IMMOBILIER RÉSIDENTIEL</h1><p>Promoteur : <strong>{{promoteur}}</strong><br/>Programme : {{programme}}</p><h2>1. Présentation</h2><p>{{nombre_logements}} logements résidentiels — Budget total : {{budget_total}} FCFA</p><h2>2. Phasage</h2><p>Phase 1 — Études et permis (3 mois) → Phase 2 — Construction (18 mois) → Phase 3 — Commercialisation et livraison</p><h2>3. Financement</h2><p>Fonds propres + crédit promoteur + VEFA anticipée selon tableau financier en annexe.</p><h2>4. Commercialisation</h2><p>Lancement commercial prévu le {{date_lancement}} avec objectif de taux de réservation de 30% avant démarrage des travaux.</p><p>Document validé par la direction générale</p><p>Signature directeur général : _______________</p></div>`
  },
  {
    code: 'prom_charte_promoteur', name: "Charte du promoteur immobilier responsable", category: 'immobilier', price: 4000, priceMax: 10000,
    description: "Charte éthique et de responsabilité sociale définissant les engagements d'un promoteur immobilier en Côte d'Ivoire.", templateType: 'pdf', classe: 'B', active: true, popularity: 52,
    fieldsJson: F([
      {key:'promoteur',label:"Raison sociale du promoteur",type:'text',required:true},
      {key:'valeurs',label:"Valeurs fondamentales de l'entreprise",type:'textarea',required:true},
      {key:'engagements_rse',label:"Engagements RSE principaux",type:'textarea',required:true},
      {key:'date_adoption',label:"Date d'adoption de la charte",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DU PROMOTEUR IMMOBILIER RESPONSABLE</h1><p>Promoteur : <strong>{{promoteur}}</strong></p><h2>Nos valeurs</h2><p>{{valeurs}}</p><h2>Engagements RSE</h2><p>{{engagements_rse}}</p><h2>Engagements envers les acquéreurs</h2><p>Transparence totale sur les prix et délais — Respect des garanties légales — Information régulière sur l'avancement des travaux — Gestion des réclamations dans un délai maximum de 15 jours ouvrables.</p><h2>Engagement environnemental</h2><p>Intégration de matériaux durables et de solutions d'efficacité énergétique dans nos programmes.</p><p>Adoptée le {{date_adoption}}</p><p>Signature directeur général : _______________</p></div>`
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
  console.log(`Batch 70a OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
