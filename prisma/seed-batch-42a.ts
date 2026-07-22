import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);

const templates = [
  // ── MARCHÉS PUBLICS (25 templates) ──────────────────────────────────────────

  {
    code: "mpu_dao_ouvert",
    name: "Dossier d'Appel d'Offres Ouvert",
    category: "juridique_admin",
    price: 15000,
    priceMax: 45000,
    description: "Dossier complet d'appel d'offres ouvert conforme au Code des marchés publics OHADA, incluant le règlement particulier, les cahiers des charges et les formulaires de soumission.",
    templateType: "pdf",
    classe: "A",
    active: true,
    popularity: 88,
    fieldsJson: F([
      { key: "autorite_contractante", label: "Autorité contractante", type: "text", required: true },
      { key: "objet_marche", label: "Objet du marché", type: "textarea", required: true },
      { key: "numero_aao", label: "Numéro de l'AAO", type: "text", required: true },
      { key: "date_limite_depot", label: "Date limite de dépôt des offres", type: "date", required: true },
      { key: "montant_caution", label: "Montant de la caution de soumission (FCFA)", type: "text", required: true },
      { key: "source_financement", label: "Source de financement", type: "text", required: false }
    ]),
    body: `<div class="doc"><h1>DOSSIER D'APPEL D'OFFRES OUVERT</h1><h2>{{autorite_contractante}}</h2><p><strong>Objet :</strong> {{objet_marche}}</p><p><strong>Référence :</strong> {{numero_aao}}</p><p><strong>Financement :</strong> {{source_financement}}</p><p><strong>Date limite de dépôt :</strong> {{date_limite_depot}}</p><p><strong>Caution de soumission :</strong> {{montant_caution}} FCFA</p></div>`
  },

  {
    code: "mpu_aao",
    name: "Avis d'Appel d'Offres (AAO)",
    category: "juridique_admin",
    price: 5000,
    priceMax: 12000,
    description: "Avis officiel d'appel d'offres destiné à la publication au Journal des Marchés Publics et dans la presse nationale, conforme aux dispositions du Code OHADA.",
    templateType: "pdf",
    classe: "B",
    active: true,
    popularity: 92,
    fieldsJson: F([
      { key: "autorite_contractante", label: "Autorité contractante", type: "text", required: true },
      { key: "objet_marche", label: "Objet du marché", type: "textarea", required: true },
      { key: "date_publication", label: "Date de publication", type: "date", required: true },
      { key: "date_limite_retrait", label: "Date limite de retrait du DAO", type: "date", required: true },
      { key: "lieu_depot", label: "Lieu de dépôt des offres", type: "text", required: true }
    ]),
    body: `<div class="doc"><h1>AVIS D'APPEL D'OFFRES</h1><p><strong>Autorité contractante :</strong> {{autorite_contractante}}</p><p><strong>Objet :</strong> {{objet_marche}}</p><p><strong>Date de publication :</strong> {{date_publication}}</p><p><strong>Retrait du DAO jusqu'au :</strong> {{date_limite_retrait}}</p><p><strong>Lieu de dépôt :</strong> {{lieu_depot}}</p></div>`
  },

  {
    code: "mpu_ccag",
    name: "Cahier des Clauses Administratives Générales (CCAG)",
    category: "juridique_admin",
    price: 12000,
    priceMax: 36000,
    description: "Cahier des clauses administratives générales applicable aux marchés publics de travaux, services ou fournitures, définissant les obligations réciproques des parties.",
    templateType: "pdf",
    classe: "A",
    active: true,
    popularity: 75,
    fieldsJson: F([
      { key: "type_marche", label: "Type de marché (travaux / services / fournitures)", type: "text", required: true },
      { key: "autorite_contractante", label: "Autorité contractante", type: "text", required: true },
      { key: "annee_edition", label: "Année d'édition", type: "text", required: true },
      { key: "legislation_applicable", label: "Législation applicable", type: "text", required: false }
    ]),
    body: `<div class="doc"><h1>CAHIER DES CLAUSES ADMINISTRATIVES GÉNÉRALES</h1><p><strong>Type de marché :</strong> {{type_marche}}</p><p><strong>Autorité contractante :</strong> {{autorite_contractante}}</p><p><strong>Édition :</strong> {{annee_edition}}</p><p><strong>Législation :</strong> {{legislation_applicable}}</p></div>`
  },

  {
    code: "mpu_cctp",
    name: "Cahier des Clauses Techniques Particulières (CCTP)",
    category: "juridique_admin",
    price: 10000,
    priceMax: 30000,
    description: "Cahier définissant les spécifications techniques détaillées, les normes et les performances attendues pour l'exécution d'un marché public de travaux ou de services.",
    templateType: "pdf",
    classe: "A",
    active: true,
    popularity: 80,
    fieldsJson: F([
      { key: "objet_marche", label: "Objet du marché", type: "textarea", required: true },
      { key: "numero_marche", label: "Numéro du marché", type: "text", required: true },
      { key: "specifications_techniques", label: "Spécifications techniques principales", type: "textarea", required: true },
      { key: "normes_applicables", label: "Normes applicables (ISO, OHADA, etc.)", type: "text", required: false },
      { key: "delai_execution", label: "Délai d'exécution", type: "text", required: true }
    ]),
    body: `<div class="doc"><h1>CAHIER DES CLAUSES TECHNIQUES PARTICULIÈRES</h1><p><strong>Marché N° :</strong> {{numero_marche}}</p><p><strong>Objet :</strong> {{objet_marche}}</p><p><strong>Spécifications :</strong> {{specifications_techniques}}</p><p><strong>Normes :</strong> {{normes_applicables}}</p><p><strong>Délai :</strong> {{delai_execution}}</p></div>`
  },

  {
    code: "mpu_soumission_ao",
    name: "Soumission à un Appel d'Offres",
    category: "juridique_admin",
    price: 4000,
    priceMax: 10000,
    description: "Lettre de soumission officielle par laquelle un candidat présente son offre en réponse à un appel d'offres, avec engagement ferme sur les prix et délais proposés.",
    templateType: "pdf",
    classe: "B",
    active: true,
    popularity: 85,
    fieldsJson: F([
      { key: "nom_soumissionnaire", label: "Nom ou raison sociale du soumissionnaire", type: "text", required: true },
      { key: "reference_aao", label: "Référence de l'AAO", type: "text", required: true },
      { key: "montant_offre", label: "Montant total de l'offre (FCFA HT)", type: "text", required: true },
      { key: "delai_execution", label: "Délai d'exécution proposé", type: "text", required: true },
      { key: "date_soumission", label: "Date de soumission", type: "date", required: true }
    ]),
    body: `<div class="doc"><h1>LETTRE DE SOUMISSION</h1><p>Je soussigné(e), représentant <strong>{{nom_soumissionnaire}}</strong>, soumets la présente offre en réponse à l'AAO N° <strong>{{reference_aao}}</strong>.</p><p><strong>Montant de l'offre :</strong> {{montant_offre}} FCFA HT</p><p><strong>Délai d'exécution :</strong> {{delai_execution}}</p><p><strong>Date :</strong> {{date_soumission}}</p></div>`
  },

  {
    code: "mpu_offre_technique",
    name: "Offre Technique de Candidature",
    category: "juridique_admin",
    price: 8000,
    priceMax: 22000,
    description: "Document de présentation de l'offre technique d'un candidat, incluant la méthodologie, les ressources humaines, le matériel et les références de prestations similaires.",
    templateType: "pdf",
    classe: "B",
    active: true,
    popularity: 78,
    fieldsJson: F([
      { key: "nom_entreprise", label: "Nom de l'entreprise candidate", type: "text", required: true },
      { key: "objet_marche", label: "Objet du marché concerné", type: "textarea", required: true },
      { key: "methodologie", label: "Méthodologie d'exécution", type: "textarea", required: true },
      { key: "references_similaires", label: "Références de prestations similaires", type: "textarea", required: true },
      { key: "effectif_personnel", label: "Effectif du personnel clé mobilisé", type: "text", required: true }
    ]),
    body: `<div class="doc"><h1>OFFRE TECHNIQUE</h1><h2>{{nom_entreprise}}</h2><p><strong>Objet :</strong> {{objet_marche}}</p><p><strong>Méthodologie :</strong> {{methodologie}}</p><p><strong>Références :</strong> {{references_similaires}}</p><p><strong>Personnel clé :</strong> {{effectif_personnel}}</p></div>`
  },

  {
    code: "mpu_offre_financiere",
    name: "Offre Financière de Candidature",
    category: "juridique_admin",
    price: 6000,
    priceMax: 16000,
    description: "Document présentant le détail financier de l'offre du candidat, avec bordereau des prix unitaires, devis estimatif et récapitulatif général des coûts.",
    templateType: "pdf",
    classe: "B",
    active: true,
    popularity: 82,
    fieldsJson: F([
      { key: "nom_entreprise", label: "Nom de l'entreprise candidate", type: "text", required: true },
      { key: "reference_aao", label: "Référence AAO", type: "text", required: true },
      { key: "montant_ht", label: "Montant total HT (FCFA)", type: "text", required: true },
      { key: "taux_tva", label: "Taux de TVA applicable (%)", type: "text", required: true },
      { key: "montant_ttc", label: "Montant total TTC (FCFA)", type: "text", required: true },
      { key: "validite_offre", label: "Durée de validité de l'offre (jours)", type: "text", required: true }
    ]),
    body: `<div class="doc"><h1>OFFRE FINANCIÈRE</h1><h2>{{nom_entreprise}}</h2><p><strong>AAO N° :</strong> {{reference_aao}}</p><p><strong>Montant HT :</strong> {{montant_ht}} FCFA</p><p><strong>TVA ({{taux_tva}}%) :</strong> incluse</p><p><strong>Montant TTC :</strong> {{montant_ttc}} FCFA</p><p><strong>Validité :</strong> {{validite_offre}} jours</p></div>`
  },

  {
    code: "mpu_accord_gme",
    name: "Accord de Groupement Momentané d'Entreprises (GME)",
    category: "juridique_admin",
    price: 9000,
    priceMax: 25000,
    description: "Convention constitutive d'un groupement momentané d'entreprises pour répondre à un appel d'offres, désignant le mandataire et définissant les quotes-parts de chaque membre.",
    templateType: "pdf",
    classe: "A",
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: "entreprise_mandataire", label: "Entreprise mandataire du groupement", type: "text", required: true },
      { key: "membres_groupement", label: "Liste des membres du groupement", type: "textarea", required: true },
      { key: "objet_marche", label: "Objet du marché visé", type: "textarea", required: true },
      { key: "repartition_lots", label: "Répartition des lots ou quotes-parts (%)", type: "textarea", required: true },
      { key: "date_accord", label: "Date de signature de l'accord", type: "date", required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE GROUPEMENT MOMENTANÉ D'ENTREPRISES</h1><p><strong>Mandataire :</strong> {{entreprise_mandataire}}</p><p><strong>Membres :</strong> {{membres_groupement}}</p><p><strong>Objet :</strong> {{objet_marche}}</p><p><strong>Répartition :</strong> {{repartition_lots}}</p><p><strong>Date :</strong> {{date_accord}}</p></div>`
  },

  {
    code: "mpu_contrat_travaux",
    name: "Contrat de Marché Public de Travaux",
    category: "juridique_admin",
    price: 18000,
    priceMax: 54000,
    description: "Contrat type de marché public de travaux conforme au droit OHADA, précisant les obligations des parties, le prix, les délais, les pénalités et les conditions de réception.",
    templateType: "pdf",
    classe: "A",
    active: true,
    popularity: 90,
    fieldsJson: F([
      { key: "autorite_contractante", label: "Autorité contractante", type: "text", required: true },
      { key: "titulaire_marche", label: "Titulaire du marché (entreprise)", type: "text", required: true },
      { key: "objet_travaux", label: "Objet des travaux", type: "textarea", required: true },
      { key: "montant_marche", label: "Montant du marché (FCFA TTC)", type: "text", required: true },
      { key: "delai_execution", label: "Délai d'exécution", type: "text", required: true },
      { key: "date_signature", label: "Date de signature du contrat", type: "date", required: true }
    ]),
    body: `<div class="doc"><h1>CONTRAT DE MARCHÉ PUBLIC DE TRAVAUX</h1><p><strong>Autorité contractante :</strong> {{autorite_contractante}}</p><p><strong>Titulaire :</strong> {{titulaire_marche}}</p><p><strong>Objet :</strong> {{objet_travaux}}</p><p><strong>Montant TTC :</strong> {{montant_marche}} FCFA</p><p><strong>Délai :</strong> {{delai_execution}}</p><p><strong>Signé le :</strong> {{date_signature}}</p></div>`
  },

  {
    code: "mpu_contrat_services",
    name: "Contrat de Marché Public de Services",
    category: "juridique_admin",
    price: 15000,
    priceMax: 45000,
    description: "Contrat type de marché public de services intellectuels ou courants, conforme au Code des marchés publics, couvrant les missions, honoraires et modalités de paiement.",
    templateType: "pdf",
    classe: "A",
    active: true,
    popularity: 85,
    fieldsJson: F([
      { key: "autorite_contractante", label: "Autorité contractante", type: "text", required: true },
      { key: "prestataire", label: "Prestataire de services", type: "text", required: true },
      { key: "nature_services", label: "Nature des services", type: "textarea", required: true },
      { key: "montant_honoraires", label: "Montant des honoraires (FCFA)", type: "text", required: true },
      { key: "duree_mission", label: "Durée de la mission", type: "text", required: true }
    ]),
    body: `<div class="doc"><h1>CONTRAT DE MARCHÉ PUBLIC DE SERVICES</h1><p><strong>Autorité contractante :</strong> {{autorite_contractante}}</p><p><strong>Prestataire :</strong> {{prestataire}}</p><p><strong>Services :</strong> {{nature_services}}</p><p><strong>Honoraires :</strong> {{montant_honoraires}} FCFA</p><p><strong>Durée :</strong> {{duree_mission}}</p></div>`
  },

  {
    code: "mpu_contrat_fournitures",
    name: "Contrat de Marché Public de Fournitures",
    category: "juridique_admin",
    price: 12000,
    priceMax: 36000,
    description: "Contrat type de marché public de fournitures, définissant les spécifications des biens à livrer, les conditions de livraison, de garantie et les modalités de paiement.",
    templateType: "pdf",
    classe: "A",
    active: true,
    popularity: 80,
    fieldsJson: F([
      { key: "autorite_contractante", label: "Autorité contractante", type: "text", required: true },
      { key: "fournisseur", label: "Fournisseur titulaire", type: "text", required: true },
      { key: "designation_fournitures", label: "Désignation des fournitures", type: "textarea", required: true },
      { key: "montant_total", label: "Montant total (FCFA TTC)", type: "text", required: true },
      { key: "delai_livraison", label: "Délai de livraison", type: "text", required: true },
      { key: "lieu_livraison", label: "Lieu de livraison", type: "text", required: true }
    ]),
    body: `<div class="doc"><h1>CONTRAT DE MARCHÉ PUBLIC DE FOURNITURES</h1><p><strong>Autorité contractante :</strong> {{autorite_contractante}}</p><p><strong>Fournisseur :</strong> {{fournisseur}}</p><p><strong>Fournitures :</strong> {{designation_fournitures}}</p><p><strong>Montant TTC :</strong> {{montant_total}} FCFA</p><p><strong>Délai :</strong> {{delai_livraison}}</p><p><strong>Livraison à :</strong> {{lieu_livraison}}</p></div>`
  },

  {
    code: "mpu_avenant",
    name: "Avenant à un Marché Public",
    category: "juridique_admin",
    price: 8000,
    priceMax: 22000,
    description: "Avenant modificatif à un marché public existant, constatant les modifications de prix, de délai ou de périmètre et justifiant les motifs de la modification.",
    templateType: "pdf",
    classe: "A",
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: "numero_marche_initial", label: "Numéro du marché initial", type: "text", required: true },
      { key: "numero_avenant", label: "Numéro de l'avenant", type: "text", required: true },
      { key: "objet_modification", label: "Objet de la modification", type: "textarea", required: true },
      { key: "montant_initial", label: "Montant initial du marché (FCFA)", type: "text", required: true },
      { key: "montant_avenant", label: "Montant de l'avenant (FCFA)", type: "text", required: true },
      { key: "date_signature", label: "Date de signature de l'avenant", type: "date", required: true }
    ]),
    body: `<div class="doc"><h1>AVENANT N° {{numero_avenant}} AU MARCHÉ N° {{numero_marche_initial}}</h1><p><strong>Objet :</strong> {{objet_modification}}</p><p><strong>Montant initial :</strong> {{montant_initial}} FCFA</p><p><strong>Montant de l'avenant :</strong> {{montant_avenant}} FCFA</p><p><strong>Date :</strong> {{date_signature}}</p></div>`
  },

  {
    code: "mpu_os_demarrage",
    name: "Ordre de Service de Démarrage",
    category: "juridique_admin",
    price: 3000,
    priceMax: 8000,
    description: "Ordre de service notifiant au titulaire d'un marché l'ordre de commencer l'exécution des travaux ou des prestations à une date précise.",
    templateType: "pdf",
    classe: "C",
    active: true,
    popularity: 88,
    fieldsJson: F([
      { key: "numero_os", label: "Numéro de l'ordre de service", type: "text", required: true },
      { key: "numero_marche", label: "Numéro du marché", type: "text", required: true },
      { key: "titulaire", label: "Titulaire du marché", type: "text", required: true },
      { key: "date_demarrage", label: "Date de démarrage des prestations", type: "date", required: true }
    ]),
    body: `<div class="doc"><h1>ORDRE DE SERVICE N° {{numero_os}} — DÉMARRAGE</h1><p><strong>Marché N° :</strong> {{numero_marche}}</p><p><strong>À :</strong> {{titulaire}}</p><p>Il vous est ordonné de démarrer l'exécution des prestations le <strong>{{date_demarrage}}</strong>.</p></div>`
  },

  {
    code: "mpu_os_modification",
    name: "Ordre de Service de Modification",
    category: "juridique_admin",
    price: 4000,
    priceMax: 10000,
    description: "Ordre de service prescrivant une modification dans l'exécution des travaux ou prestations en cours, avec indication de l'incidence sur les délais et les prix.",
    templateType: "pdf",
    classe: "C",
    active: true,
    popularity: 72,
    fieldsJson: F([
      { key: "numero_os", label: "Numéro de l'ordre de service", type: "text", required: true },
      { key: "numero_marche", label: "Numéro du marché", type: "text", required: true },
      { key: "nature_modification", label: "Nature de la modification prescrite", type: "textarea", required: true },
      { key: "impact_delai", label: "Impact sur le délai d'exécution", type: "text", required: true },
      { key: "date_os", label: "Date de l'ordre de service", type: "date", required: true }
    ]),
    body: `<div class="doc"><h1>ORDRE DE SERVICE N° {{numero_os}} — MODIFICATION</h1><p><strong>Marché N° :</strong> {{numero_marche}}</p><p><strong>Modification prescrite :</strong> {{nature_modification}}</p><p><strong>Impact délai :</strong> {{impact_delai}}</p><p><strong>Date :</strong> {{date_os}}</p></div>`
  },

  {
    code: "mpu_pv_reception_prov",
    name: "Procès-Verbal de Réception Provisoire",
    category: "juridique_admin",
    price: 7000,
    priceMax: 18000,
    description: "Procès-verbal constatant la réception provisoire des travaux ou des fournitures, dressé par la commission de réception avec mention des réserves éventuelles.",
    templateType: "pdf",
    classe: "B",
    active: true,
    popularity: 82,
    fieldsJson: F([
      { key: "numero_marche", label: "Numéro du marché", type: "text", required: true },
      { key: "titulaire", label: "Titulaire du marché", type: "text", required: true },
      { key: "objet_marche", label: "Objet du marché", type: "textarea", required: true },
      { key: "date_reception", label: "Date de réception provisoire", type: "date", required: true },
      { key: "reserves", label: "Réserves formulées (si aucune, indiquer Néant)", type: "textarea", required: true }
    ]),
    body: `<div class="doc"><h1>PROCÈS-VERBAL DE RÉCEPTION PROVISOIRE</h1><p><strong>Marché N° :</strong> {{numero_marche}}</p><p><strong>Titulaire :</strong> {{titulaire}}</p><p><strong>Objet :</strong> {{objet_marche}}</p><p><strong>Date de réception :</strong> {{date_reception}}</p><p><strong>Réserves :</strong> {{reserves}}</p></div>`
  },

  {
    code: "mpu_pv_reception_def",
    name: "Procès-Verbal de Réception Définitive",
    category: "juridique_admin",
    price: 7000,
    priceMax: 18000,
    description: "Procès-verbal de réception définitive mettant fin au délai de garantie et libérant le titulaire de ses obligations contractuelles après levée de toutes les réserves.",
    templateType: "pdf",
    classe: "B",
    active: true,
    popularity: 80,
    fieldsJson: F([
      { key: "numero_marche", label: "Numéro du marché", type: "text", required: true },
      { key: "titulaire", label: "Titulaire du marché", type: "text", required: true },
      { key: "date_reception_prov", label: "Date de réception provisoire", type: "date", required: true },
      { key: "date_reception_def", label: "Date de réception définitive", type: "date", required: true },
      { key: "constat_levee_reserves", label: "Constat de levée des réserves", type: "textarea", required: true }
    ]),
    body: `<div class="doc"><h1>PROCÈS-VERBAL DE RÉCEPTION DÉFINITIVE</h1><p><strong>Marché N° :</strong> {{numero_marche}}</p><p><strong>Titulaire :</strong> {{titulaire}}</p><p><strong>Réception provisoire :</strong> {{date_reception_prov}}</p><p><strong>Réception définitive :</strong> {{date_reception_def}}</p><p><strong>Levée des réserves :</strong> {{constat_levee_reserves}}</p></div>`
  },

  {
    code: "mpu_rapport_controle",
    name: "Rapport de Contrôle de Marchés Publics",
    category: "juridique_admin",
    price: 10000,
    priceMax: 28000,
    description: "Rapport de mission de contrôle ou d'audit de la passation et de l'exécution des marchés publics, établi par l'ANRMP ou un contrôleur mandaté.",
    templateType: "pdf",
    classe: "A",
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: "organe_controle", label: "Organe de contrôle", type: "text", required: true },
      { key: "entite_controlee", label: "Entité contrôlée", type: "text", required: true },
      { key: "periode_controle", label: "Période contrôlée", type: "text", required: true },
      { key: "constats_principaux", label: "Constats principaux", type: "textarea", required: true },
      { key: "recommandations", label: "Recommandations", type: "textarea", required: true },
      { key: "date_rapport", label: "Date du rapport", type: "date", required: true }
    ]),
    body: `<div class="doc"><h1>RAPPORT DE CONTRÔLE DES MARCHÉS PUBLICS</h1><p><strong>Organe de contrôle :</strong> {{organe_controle}}</p><p><strong>Entité contrôlée :</strong> {{entite_controlee}}</p><p><strong>Période :</strong> {{periode_controle}}</p><p><strong>Constats :</strong> {{constats_principaux}}</p><p><strong>Recommandations :</strong> {{recommandations}}</p><p><strong>Date :</strong> {{date_rapport}}</p></div>`
  },

  {
    code: "mpu_recours_attribution",
    name: "Recours contre une Décision d'Attribution",
    category: "juridique_admin",
    price: 6000,
    priceMax: 16000,
    description: "Requête adressée à l'ANRMP pour contester une décision d'attribution d'un marché public, exposant les motifs de droit et de fait justifiant le recours.",
    templateType: "pdf",
    classe: "B",
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: "requerant", label: "Requérant (entreprise plaignante)", type: "text", required: true },
      { key: "autorite_contractante", label: "Autorité contractante mise en cause", type: "text", required: true },
      { key: "reference_aao", label: "Référence de l'AAO contesté", type: "text", required: true },
      { key: "motifs_recours", label: "Motifs du recours", type: "textarea", required: true },
      { key: "date_recours", label: "Date de dépôt du recours", type: "date", required: true }
    ]),
    body: `<div class="doc"><h1>RECOURS CONTRE LA DÉCISION D'ATTRIBUTION</h1><p><strong>Requérant :</strong> {{requerant}}</p><p><strong>Autorité contractante :</strong> {{autorite_contractante}}</p><p><strong>AAO N° :</strong> {{reference_aao}}</p><p><strong>Motifs :</strong> {{motifs_recours}}</p><p><strong>Date :</strong> {{date_recours}}</p></div>`
  },

  {
    code: "mpu_accord_nantissement",
    name: "Accord de Nantissement de Marché Public",
    category: "juridique_admin",
    price: 9000,
    priceMax: 26000,
    description: "Accord de nantissement permettant au titulaire d'un marché public de mobiliser le financement bancaire en donnant en garantie ses créances sur le marché.",
    templateType: "pdf",
    classe: "A",
    active: true,
    popularity: 55,
    fieldsJson: F([
      { key: "titulaire_marche", label: "Titulaire du marché", type: "text", required: true },
      { key: "etablissement_bancaire", label: "Établissement bancaire bénéficiaire", type: "text", required: true },
      { key: "numero_marche", label: "Numéro du marché nanti", type: "text", required: true },
      { key: "montant_nantissement", label: "Montant du nantissement (FCFA)", type: "text", required: true },
      { key: "date_accord", label: "Date de l'accord", type: "date", required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE NANTISSEMENT DE MARCHÉ PUBLIC</h1><p><strong>Titulaire :</strong> {{titulaire_marche}}</p><p><strong>Banque :</strong> {{etablissement_bancaire}}</p><p><strong>Marché N° :</strong> {{numero_marche}}</p><p><strong>Montant nanti :</strong> {{montant_nantissement}} FCFA</p><p><strong>Date :</strong> {{date_accord}}</p></div>`
  },

  {
    code: "mpu_caution_execution",
    name: "Cautionnement de Bonne Exécution",
    category: "juridique_admin",
    price: 5000,
    priceMax: 14000,
    description: "Acte de cautionnement bancaire garantissant la bonne exécution d'un marché public, représentant généralement 5% du montant du marché.",
    templateType: "pdf",
    classe: "B",
    active: true,
    popularity: 78,
    fieldsJson: F([
      { key: "banque_caution", label: "Banque émettrice de la caution", type: "text", required: true },
      { key: "titulaire", label: "Titulaire du marché (débiteur principal)", type: "text", required: true },
      { key: "numero_marche", label: "Numéro du marché", type: "text", required: true },
      { key: "montant_caution", label: "Montant de la caution (FCFA)", type: "text", required: true },
      { key: "date_expiration", label: "Date d'expiration de la caution", type: "date", required: true }
    ]),
    body: `<div class="doc"><h1>CAUTIONNEMENT DE BONNE EXÉCUTION</h1><p><strong>Banque garante :</strong> {{banque_caution}}</p><p><strong>Titulaire :</strong> {{titulaire}}</p><p><strong>Marché N° :</strong> {{numero_marche}}</p><p><strong>Montant garanti :</strong> {{montant_caution}} FCFA</p><p><strong>Expiration :</strong> {{date_expiration}}</p></div>`
  },

  {
    code: "mpu_caution_avance",
    name: "Cautionnement de Restitution d'Avance",
    category: "juridique_admin",
    price: 5000,
    priceMax: 14000,
    description: "Acte de cautionnement bancaire garantissant le remboursement de l'avance de démarrage versée au titulaire d'un marché public en cas de défaillance.",
    templateType: "pdf",
    classe: "B",
    active: true,
    popularity: 74,
    fieldsJson: F([
      { key: "banque_caution", label: "Banque émettrice de la caution", type: "text", required: true },
      { key: "titulaire", label: "Titulaire du marché", type: "text", required: true },
      { key: "montant_avance", label: "Montant de l'avance garantie (FCFA)", type: "text", required: true },
      { key: "numero_marche", label: "Numéro du marché", type: "text", required: true },
      { key: "date_expiration", label: "Date d'expiration de la caution", type: "date", required: true }
    ]),
    body: `<div class="doc"><h1>CAUTIONNEMENT DE RESTITUTION D'AVANCE</h1><p><strong>Banque garante :</strong> {{banque_caution}}</p><p><strong>Titulaire :</strong> {{titulaire}}</p><p><strong>Marché N° :</strong> {{numero_marche}}</p><p><strong>Avance garantie :</strong> {{montant_avance}} FCFA</p><p><strong>Expiration :</strong> {{date_expiration}}</p></div>`
  },

  {
    code: "mpu_attestation_fiscale",
    name: "Attestation de Régularité Fiscale pour Marché Public",
    category: "juridique_admin",
    price: 3000,
    priceMax: 7000,
    description: "Attestation délivrée par la Direction Générale des Impôts certifiant qu'un candidat à un marché public est à jour de ses obligations fiscales.",
    templateType: "pdf",
    classe: "C",
    active: true,
    popularity: 86,
    fieldsJson: F([
      { key: "nom_entreprise", label: "Dénomination sociale de l'entreprise", type: "text", required: true },
      { key: "numero_contribuable", label: "Numéro de compte contribuable (NCC)", type: "text", required: true },
      { key: "periode_validite", label: "Période de validité", type: "text", required: true },
      { key: "date_delivrance", label: "Date de délivrance", type: "date", required: true }
    ]),
    body: `<div class="doc"><h1>ATTESTATION DE RÉGULARITÉ FISCALE</h1><p><strong>Entreprise :</strong> {{nom_entreprise}}</p><p><strong>NCC :</strong> {{numero_contribuable}}</p><p>La Direction Générale des Impôts certifie que l'entreprise sus-désignée est à jour de ses obligations fiscales.</p><p><strong>Valable :</strong> {{periode_validite}}</p><p><strong>Délivrée le :</strong> {{date_delivrance}}</p></div>`
  },

  {
    code: "mpu_attestation_cnps",
    name: "Attestation de Régularité Sociale CNPS pour Marché Public",
    category: "juridique_admin",
    price: 3000,
    priceMax: 7000,
    description: "Attestation délivrée par la Caisse Nationale de Prévoyance Sociale (CNPS) certifiant qu'un candidat est à jour de ses cotisations sociales.",
    templateType: "pdf",
    classe: "C",
    active: true,
    popularity: 84,
    fieldsJson: F([
      { key: "nom_entreprise", label: "Dénomination sociale de l'entreprise", type: "text", required: true },
      { key: "numero_cnps", label: "Numéro d'immatriculation CNPS", type: "text", required: true },
      { key: "periode_validite", label: "Période de validité", type: "text", required: true },
      { key: "date_delivrance", label: "Date de délivrance", type: "date", required: true }
    ]),
    body: `<div class="doc"><h1>ATTESTATION DE RÉGULARITÉ SOCIALE — CNPS</h1><p><strong>Entreprise :</strong> {{nom_entreprise}}</p><p><strong>N° CNPS :</strong> {{numero_cnps}}</p><p>La CNPS certifie que l'entreprise sus-désignée est à jour de ses cotisations sociales obligatoires.</p><p><strong>Valable :</strong> {{periode_validite}}</p><p><strong>Délivrée le :</strong> {{date_delivrance}}</p></div>`
  },

  {
    code: "mpu_ppm",
    name: "Plan de Passation de Marchés (PPM)",
    category: "juridique_admin",
    price: 12000,
    priceMax: 32000,
    description: "Plan annuel de passation des marchés d'une entité publique, recensant l'ensemble des acquisitions prévues avec les modes de passation et calendriers indicatifs.",
    templateType: "pdf",
    classe: "A",
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: "entite_publique", label: "Entité publique concernée", type: "text", required: true },
      { key: "exercice_budgetaire", label: "Exercice budgétaire", type: "text", required: true },
      { key: "montant_total_prevu", label: "Montant total prévu (FCFA)", type: "text", required: true },
      { key: "nombre_marches", label: "Nombre de marchés prévus", type: "text", required: true },
      { key: "date_approbation", label: "Date d'approbation du PPM", type: "date", required: true }
    ]),
    body: `<div class="doc"><h1>PLAN DE PASSATION DE MARCHÉS — {{exercice_budgetaire}}</h1><p><strong>Entité :</strong> {{entite_publique}}</p><p><strong>Nombre de marchés prévus :</strong> {{nombre_marches}}</p><p><strong>Montant total :</strong> {{montant_total_prevu}} FCFA</p><p><strong>Approuvé le :</strong> {{date_approbation}}</p></div>`
  },

  {
    code: "mpu_rapport_performance",
    name: "Rapport de Performance des Marchés Publics",
    category: "juridique_admin",
    price: 10000,
    priceMax: 28000,
    description: "Rapport périodique évaluant la performance du système de passation des marchés d'une entité, mesurant les indicateurs de délai, de coût et de conformité réglementaire.",
    templateType: "pdf",
    classe: "A",
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: "entite_rapportante", label: "Entité rapportante", type: "text", required: true },
      { key: "periode_rapport", label: "Période couverte par le rapport", type: "text", required: true },
      { key: "taux_execution_ppm", label: "Taux d'exécution du PPM (%)", type: "text", required: true },
      { key: "observations", label: "Observations et enseignements", type: "textarea", required: true },
      { key: "date_rapport", label: "Date du rapport", type: "date", required: true }
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE DES MARCHÉS PUBLICS</h1><p><strong>Entité :</strong> {{entite_rapportante}}</p><p><strong>Période :</strong> {{periode_rapport}}</p><p><strong>Taux d'exécution PPM :</strong> {{taux_execution_ppm}}</p><p><strong>Observations :</strong> {{observations}}</p><p><strong>Date :</strong> {{date_rapport}}</p></div>`
  },

  // ── ADMINISTRATION PUBLIQUE (25 templates) ───────────────────────────────────

  {
    code: "adm_arrete_municipal",
    name: "Arrêté Municipal",
    category: "juridique_admin",
    price: 5000,
    priceMax: 13000,
    description: "Acte réglementaire ou individuel pris par le Maire dans l'exercice de ses attributions, applicable sur le territoire de la commune conformément au Code des collectivités.",
    templateType: "pdf",
    classe: "B",
    active: true,
    popularity: 80,
    fieldsJson: F([
      { key: "commune", label: "Commune", type: "text", required: true },
      { key: "numero_arrete", label: "Numéro de l'arrêté", type: "text", required: true },
      { key: "objet_arrete", label: "Objet de l'arrêté", type: "textarea", required: true },
      { key: "date_signature", label: "Date de signature", type: "date", required: true },
      { key: "nom_maire", label: "Nom et titre du Maire", type: "text", required: true }
    ]),
    body: `<div class="doc"><h1>ARRÊTÉ MUNICIPAL N° {{numero_arrete}}</h1><h2>MAIRIE DE {{commune}}</h2><p>Le Maire de la Commune de {{commune}},</p><p><strong>Objet :</strong> {{objet_arrete}}</p><p>Fait à {{commune}}, le {{date_signature}}</p><p><strong>Le Maire</strong><br/>{{nom_maire}}</p></div>`
  },

  {
    code: "adm_decision_admin",
    name: "Décision Administrative",
    category: "juridique_admin",
    price: 4000,
    priceMax: 11000,
    description: "Acte administratif individuel ou collectif portant nomination, affectation, sanction, autorisation ou toute autre décision unilatérale d'une autorité administrative.",
    templateType: "pdf",
    classe: "B",
    active: true,
    popularity: 82,
    fieldsJson: F([
      { key: "autorite_decisionnelle", label: "Autorité qui prend la décision", type: "text", required: true },
      { key: "numero_decision", label: "Numéro de la décision", type: "text", required: true },
      { key: "objet_decision", label: "Objet de la décision", type: "textarea", required: true },
      { key: "destinataire", label: "Destinataire ou personne visée", type: "text", required: true },
      { key: "date_prise_effet", label: "Date de prise d'effet", type: "date", required: true }
    ]),
    body: `<div class="doc"><h1>DÉCISION N° {{numero_decision}}</h1><p><strong>Autorité :</strong> {{autorite_decisionnelle}}</p><p><strong>Destinataire :</strong> {{destinataire}}</p><p><strong>Objet :</strong> {{objet_decision}}</p><p><strong>Prise d'effet :</strong> {{date_prise_effet}}</p></div>`
  },

  {
    code: "adm_arrete_prefectoral",
    name: "Arrêté Préfectoral",
    category: "juridique_admin",
    price: 5000,
    priceMax: 13000,
    description: "Acte réglementaire pris par le Préfet dans l'exercice de ses attributions de représentant de l'État et de dépositaire de l'autorité de l'État dans le département.",
    templateType: "pdf",
    classe: "B",
    active: true,
    popularity: 75,
    fieldsJson: F([
      { key: "prefecture", label: "Préfecture / Département", type: "text", required: true },
      { key: "numero_arrete", label: "Numéro de l'arrêté", type: "text", required: true },
      { key: "objet_arrete", label: "Objet de l'arrêté", type: "textarea", required: true },
      { key: "nom_prefet", label: "Nom et titre du Préfet", type: "text", required: true },
      { key: "date_signature", label: "Date de signature", type: "date", required: true }
    ]),
    body: `<div class="doc"><h1>ARRÊTÉ PRÉFECTORAL N° {{numero_arrete}}</h1><h2>PRÉFECTURE DE {{prefecture}}</h2><p>Le Préfet du Département de {{prefecture}},</p><p><strong>Objet :</strong> {{objet_arrete}}</p><p>Fait à {{prefecture}}, le {{date_signature}}</p><p><strong>Le Préfet</strong><br/>{{nom_prefet}}</p></div>`
  },

  {
    code: "adm_circulaire",
    name: "Circulaire Administrative",
    category: "juridique_admin",
    price: 3000,
    priceMax: 8000,
    description: "Circulaire adressée par une autorité administrative à ses services subordonnés pour préciser les modalités d'application d'une loi, d'un décret ou d'une décision.",
    templateType: "pdf",
    classe: "C",
    active: true,
    popularity: 72,
    fieldsJson: F([
      { key: "emetteur", label: "Autorité émettrice", type: "text", required: true },
      { key: "numero_circulaire", label: "Numéro de la circulaire", type: "text", required: true },
      { key: "objet_circulaire", label: "Objet de la circulaire", type: "textarea", required: true },
      { key: "destinataires", label: "Destinataires", type: "text", required: true },
      { key: "date_circulaire", label: "Date de la circulaire", type: "date", required: true }
    ]),
    body: `<div class="doc"><h1>CIRCULAIRE N° {{numero_circulaire}}</h1><p><strong>De :</strong> {{emetteur}}</p><p><strong>À :</strong> {{destinataires}}</p><p><strong>Objet :</strong> {{objet_circulaire}}</p><p><strong>Date :</strong> {{date_circulaire}}</p></div>`
  },

  {
    code: "adm_note_service",
    name: "Note de Service Administration",
    category: "juridique_admin",
    price: 2000,
    priceMax: 5000,
    description: "Note de service interne à une administration publique, transmettant des instructions, des informations ou des directives aux agents du service.",
    templateType: "pdf",
    classe: "C",
    active: true,
    popularity: 90,
    fieldsJson: F([
      { key: "service_emetteur", label: "Service émetteur", type: "text", required: true },
      { key: "objet_note", label: "Objet de la note", type: "textarea", required: true },
      { key: "destinataires", label: "Destinataires", type: "text", required: true },
      { key: "date_note", label: "Date de la note", type: "date", required: true }
    ]),
    body: `<div class="doc"><h1>NOTE DE SERVICE</h1><p><strong>De :</strong> {{service_emetteur}}</p><p><strong>À :</strong> {{destinataires}}</p><p><strong>Objet :</strong> {{objet_note}}</p><p><strong>Date :</strong> {{date_note}}</p></div>`
  },

  {
    code: "adm_rapport_inspection",
    name: "Rapport d'Inspection Administrative",
    category: "juridique_admin",
    price: 10000,
    priceMax: 28000,
    description: "Rapport établi à la suite d'une mission d'inspection d'un service public, décrivant les constats, les dysfonctionnements relevés et les recommandations formulées.",
    templateType: "pdf",
    classe: "A",
    active: true,
    popularity: 66,
    fieldsJson: F([
      { key: "inspecteur", label: "Inspecteur ou corps d'inspection", type: "text", required: true },
      { key: "service_inspecte", label: "Service ou entité inspectée", type: "text", required: true },
      { key: "periode_inspection", label: "Période d'inspection", type: "text", required: true },
      { key: "constats", label: "Constats principaux", type: "textarea", required: true },
      { key: "recommandations", label: "Recommandations", type: "textarea", required: true },
      { key: "date_rapport", label: "Date du rapport", type: "date", required: true }
    ]),
    body: `<div class="doc"><h1>RAPPORT D'INSPECTION ADMINISTRATIVE</h1><p><strong>Inspecteur :</strong> {{inspecteur}}</p><p><strong>Service inspecté :</strong> {{service_inspecte}}</p><p><strong>Période :</strong> {{periode_inspection}}</p><p><strong>Constats :</strong> {{constats}}</p><p><strong>Recommandations :</strong> {{recommandations}}</p><p><strong>Date :</strong> {{date_rapport}}</p></div>`
  },

  {
    code: "adm_rapport_audit",
    name: "Rapport d'Audit Interne Service Public",
    category: "juridique_admin",
    price: 12000,
    priceMax: 34000,
    description: "Rapport d'audit interne évaluant les dispositifs de contrôle interne, la gestion des risques et la gouvernance d'un service ou d'un établissement public.",
    templateType: "pdf",
    classe: "A",
    active: true,
    popularity: 62,
    fieldsJson: F([
      { key: "auditeur", label: "Auditeur ou cellule d'audit", type: "text", required: true },
      { key: "entite_auditee", label: "Entité auditée", type: "text", required: true },
      { key: "perimetre_audit", label: "Périmètre de l'audit", type: "textarea", required: true },
      { key: "conclusions", label: "Conclusions et risques identifiés", type: "textarea", required: true },
      { key: "plan_action", label: "Plan d'actions correctives recommandé", type: "textarea", required: true }
    ]),
    body: `<div class="doc"><h1>RAPPORT D'AUDIT INTERNE</h1><p><strong>Auditeur :</strong> {{auditeur}}</p><p><strong>Entité auditée :</strong> {{entite_auditee}}</p><p><strong>Périmètre :</strong> {{perimetre_audit}}</p><p><strong>Conclusions :</strong> {{conclusions}}</p><p><strong>Plan d'actions :</strong> {{plan_action}}</p></div>`
  },

  {
    code: "adm_pta",
    name: "Plan de Travail Annuel Service Public (PTA)",
    category: "juridique_admin",
    price: 8000,
    priceMax: 22000,
    description: "Plan de travail annuel d'un service ou d'une direction publique, déclinant les objectifs stratégiques en activités opérationnelles avec indicateurs de performance et budgets.",
    templateType: "pdf",
    classe: "A",
    active: true,
    popularity: 74,
    fieldsJson: F([
      { key: "service", label: "Service ou Direction concerné", type: "text", required: true },
      { key: "annee", label: "Année du PTA", type: "text", required: true },
      { key: "objectifs_strategiques", label: "Objectifs stratégiques retenus", type: "textarea", required: true },
      { key: "activites_prevues", label: "Activités prévues et calendrier", type: "textarea", required: true },
      { key: "budget_alloue", label: "Budget alloué (FCFA)", type: "text", required: true }
    ]),
    body: `<div class="doc"><h1>PLAN DE TRAVAIL ANNUEL {{annee}}</h1><p><strong>Service :</strong> {{service}}</p><p><strong>Objectifs :</strong> {{objectifs_strategiques}}</p><p><strong>Activités :</strong> {{activites_prevues}}</p><p><strong>Budget :</strong> {{budget_alloue}} FCFA</p></div>`
  },

  {
    code: "adm_contrat_performance",
    name: "Contrat de Performance Administration",
    category: "juridique_admin",
    price: 10000,
    priceMax: 28000,
    description: "Contrat de performance conclu entre un ministère de tutelle et une direction ou un établissement public, fixant des objectifs mesurables et les moyens alloués.",
    templateType: "pdf",
    classe: "A",
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: "autorite_tutelle", label: "Autorité de tutelle", type: "text", required: true },
      { key: "entite_signataire", label: "Entité signataire (direction ou établissement)", type: "text", required: true },
      { key: "objectifs_mesurables", label: "Objectifs et indicateurs mesurables", type: "textarea", required: true },
      { key: "moyens_accordes", label: "Moyens accordés (budget, RH, équipements)", type: "textarea", required: true },
      { key: "duree_contrat", label: "Durée du contrat", type: "text", required: true },
      { key: "date_signature", label: "Date de signature", type: "date", required: true }
    ]),
    body: `<div class="doc"><h1>CONTRAT DE PERFORMANCE</h1><p><strong>Tutelle :</strong> {{autorite_tutelle}}</p><p><strong>Entité :</strong> {{entite_signataire}}</p><p><strong>Objectifs :</strong> {{objectifs_mesurables}}</p><p><strong>Moyens :</strong> {{moyens_accordes}}</p><p><strong>Durée :</strong> {{duree_contrat}}</p><p><strong>Signé le :</strong> {{date_signature}}</p></div>`
  },

  {
    code: "adm_rapport_perf_trim",
    name: "Rapport de Performance Trimestriel Service",
    category: "juridique_admin",
    price: 6000,
    priceMax: 16000,
    description: "Rapport trimestriel de suivi des indicateurs de performance d'un service public, comparant les réalisations aux cibles fixées dans le contrat de performance ou le PTA.",
    templateType: "pdf",
    classe: "B",
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: "service", label: "Service ou Direction rapportante", type: "text", required: true },
      { key: "trimestre", label: "Trimestre concerné (ex. T1-2026)", type: "text", required: true },
      { key: "taux_realisation", label: "Taux de réalisation global (%)", type: "text", required: true },
      { key: "resultats_indicateurs", label: "Résultats par indicateur", type: "textarea", required: true },
      { key: "ecarts_constates", label: "Écarts constatés et explications", type: "textarea", required: false }
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE — {{trimestre}}</h1><p><strong>Service :</strong> {{service}}</p><p><strong>Taux de réalisation :</strong> {{taux_realisation}}</p><p><strong>Résultats :</strong> {{resultats_indicateurs}}</p><p><strong>Écarts :</strong> {{ecarts_constates}}</p></div>`
  },

  {
    code: "adm_rapport_activites",
    name: "Rapport d'Activités Annuel Service Public",
    category: "juridique_admin",
    price: 8000,
    priceMax: 22000,
    description: "Rapport annuel d'activités d'un service ou d'un établissement public rendant compte des réalisations, des résultats atteints, des difficultés rencontrées et des perspectives.",
    templateType: "pdf",
    classe: "A",
    active: true,
    popularity: 76,
    fieldsJson: F([
      { key: "service", label: "Service ou Établissement", type: "text", required: true },
      { key: "annee", label: "Année du rapport", type: "text", required: true },
      { key: "realisations", label: "Principales réalisations", type: "textarea", required: true },
      { key: "difficultes", label: "Difficultés rencontrées", type: "textarea", required: true },
      { key: "perspectives", label: "Perspectives pour l'année suivante", type: "textarea", required: false }
    ]),
    body: `<div class="doc"><h1>RAPPORT D'ACTIVITÉS ANNUEL {{annee}}</h1><p><strong>Service :</strong> {{service}}</p><p><strong>Réalisations :</strong> {{realisations}}</p><p><strong>Difficultés :</strong> {{difficultes}}</p><p><strong>Perspectives :</strong> {{perspectives}}</p></div>`
  },

  {
    code: "adm_cr_cabinet",
    name: "Compte Rendu de Réunion de Cabinet",
    category: "juridique_admin",
    price: 4000,
    priceMax: 10000,
    description: "Compte rendu officiel d'une réunion de cabinet ministériel ou de direction, enregistrant les points discutés, les décisions prises et les tâches assignées.",
    templateType: "pdf",
    classe: "C",
    active: true,
    popularity: 78,
    fieldsJson: F([
      { key: "presidence_reunion", label: "Présidence de la réunion", type: "text", required: true },
      { key: "date_reunion", label: "Date de la réunion", type: "date", required: true },
      { key: "participants", label: "Liste des participants", type: "textarea", required: true },
      { key: "points_discutes", label: "Points discutés", type: "textarea", required: true },
      { key: "decisions_prises", label: "Décisions prises", type: "textarea", required: true }
    ]),
    body: `<div class="doc"><h1>COMPTE RENDU DE RÉUNION DE CABINET</h1><p><strong>Présidence :</strong> {{presidence_reunion}}</p><p><strong>Date :</strong> {{date_reunion}}</p><p><strong>Participants :</strong> {{participants}}</p><p><strong>Points discutés :</strong> {{points_discutes}}</p><p><strong>Décisions :</strong> {{decisions_prises}}</p></div>`
  },

  {
    code: "adm_pv_conseil_mun",
    name: "Procès-Verbal de Conseil Municipal",
    category: "juridique_admin",
    price: 6000,
    priceMax: 16000,
    description: "Procès-verbal officiel d'une séance du conseil municipal consignant les délibérations, les votes et les décisions adoptées par les conseillers municipaux.",
    templateType: "pdf",
    classe: "B",
    active: true,
    popularity: 72,
    fieldsJson: F([
      { key: "commune", label: "Commune", type: "text", required: true },
      { key: "date_seance", label: "Date de la séance", type: "date", required: true },
      { key: "nombre_conseillers_presents", label: "Nombre de conseillers présents", type: "text", required: true },
      { key: "ordre_du_jour", label: "Ordre du jour", type: "textarea", required: true },
      { key: "deliberations", label: "Délibérations et votes", type: "textarea", required: true }
    ]),
    body: `<div class="doc"><h1>PROCÈS-VERBAL DU CONSEIL MUNICIPAL</h1><h2>COMMUNE DE {{commune}}</h2><p><strong>Date :</strong> {{date_seance}}</p><p><strong>Conseillers présents :</strong> {{nombre_conseillers_presents}}</p><p><strong>Ordre du jour :</strong> {{ordre_du_jour}}</p><p><strong>Délibérations :</strong> {{deliberations}}</p></div>`
  },

  {
    code: "adm_note_deliberation",
    name: "Note de Délibération Conseil Municipal",
    category: "juridique_admin",
    price: 4000,
    priceMax: 11000,
    description: "Note préparatoire ou extractive d'une délibération du conseil municipal, synthétisant le contexte, la proposition soumise au vote et le dispositif retenu.",
    templateType: "pdf",
    classe: "C",
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: "commune", label: "Commune", type: "text", required: true },
      { key: "numero_deliberation", label: "Numéro de la délibération", type: "text", required: true },
      { key: "objet_deliberation", label: "Objet de la délibération", type: "textarea", required: true },
      { key: "decision_adoptee", label: "Décision adoptée", type: "textarea", required: true },
      { key: "date_adoption", label: "Date d'adoption", type: "date", required: true }
    ]),
    body: `<div class="doc"><h1>DÉLIBÉRATION N° {{numero_deliberation}}</h1><h2>CONSEIL MUNICIPAL DE {{commune}}</h2><p><strong>Objet :</strong> {{objet_deliberation}}</p><p><strong>Le Conseil municipal a décidé :</strong> {{decision_adoptee}}</p><p><strong>Adoptée le :</strong> {{date_adoption}}</p></div>`
  },

  {
    code: "adm_convention_ppp",
    name: "Convention de Partenariat Public-Privé (PPP)",
    category: "juridique_admin",
    price: 18000,
    priceMax: 54000,
    description: "Convention-cadre de partenariat public-privé encadrant la conception, le financement, la construction, l'exploitation ou la maintenance d'un ouvrage ou service public.",
    templateType: "pdf",
    classe: "A",
    active: true,
    popularity: 62,
    fieldsJson: F([
      { key: "autorite_publique", label: "Autorité publique partie à la convention", type: "text", required: true },
      { key: "partenaire_prive", label: "Partenaire privé", type: "text", required: true },
      { key: "objet_ppp", label: "Objet du partenariat", type: "textarea", required: true },
      { key: "duree_contrat", label: "Durée du contrat PPP", type: "text", required: true },
      { key: "investissement_prive", label: "Investissement privé prévu (FCFA)", type: "text", required: true },
      { key: "date_signature", label: "Date de signature", type: "date", required: true }
    ]),
    body: `<div class="doc"><h1>CONVENTION DE PARTENARIAT PUBLIC-PRIVÉ</h1><p><strong>Autorité publique :</strong> {{autorite_publique}}</p><p><strong>Partenaire privé :</strong> {{partenaire_prive}}</p><p><strong>Objet :</strong> {{objet_ppp}}</p><p><strong>Durée :</strong> {{duree_contrat}}</p><p><strong>Investissement :</strong> {{investissement_prive}} FCFA</p><p><strong>Signé le :</strong> {{date_signature}}</p></div>`
  },

  {
    code: "adm_accord_dsp",
    name: "Accord de Délégation de Service Public (DSP)",
    category: "juridique_admin",
    price: 15000,
    priceMax: 45000,
    description: "Accord par lequel une personne publique délègue la gestion d'un service public à un délégataire privé, qui l'exploite à ses risques et assume la responsabilité opérationnelle.",
    templateType: "pdf",
    classe: "A",
    active: true,
    popularity: 58,
    fieldsJson: F([
      { key: "autorite_delegante", label: "Autorité délégante", type: "text", required: true },
      { key: "delégataire", label: "Délégataire (opérateur privé)", type: "text", required: true },
      { key: "service_delegue", label: "Service public délégué", type: "textarea", required: true },
      { key: "duree_delegation", label: "Durée de la délégation", type: "text", required: true },
      { key: "date_signature", label: "Date de signature", type: "date", required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE DÉLÉGATION DE SERVICE PUBLIC</h1><p><strong>Autorité délégante :</strong> {{autorite_delegante}}</p><p><strong>Délégataire :</strong> {{delégataire}}</p><p><strong>Service délégué :</strong> {{service_delegue}}</p><p><strong>Durée :</strong> {{duree_delegation}}</p><p><strong>Signé le :</strong> {{date_signature}}</p></div>`
  },

  {
    code: "adm_contrat_gestion_del",
    name: "Contrat de Gestion Déléguée",
    category: "juridique_admin",
    price: 14000,
    priceMax: 42000,
    description: "Contrat confiant la gestion opérationnelle d'une infrastructure ou d'un service public à un opérateur privé rémunéré par des redevances ou des frais de gestion.",
    templateType: "pdf",
    classe: "A",
    active: true,
    popularity: 56,
    fieldsJson: F([
      { key: "autorite_contractante", label: "Autorité contractante", type: "text", required: true },
      { key: "gestionnaire_delegue", label: "Gestionnaire délégué", type: "text", required: true },
      { key: "objet_gestion", label: "Objet de la gestion déléguée", type: "textarea", required: true },
      { key: "remuneration", label: "Modalités de rémunération", type: "textarea", required: true },
      { key: "duree_contrat", label: "Durée du contrat", type: "text", required: true }
    ]),
    body: `<div class="doc"><h1>CONTRAT DE GESTION DÉLÉGUÉE</h1><p><strong>Autorité contractante :</strong> {{autorite_contractante}}</p><p><strong>Gestionnaire :</strong> {{gestionnaire_delegue}}</p><p><strong>Objet :</strong> {{objet_gestion}}</p><p><strong>Rémunération :</strong> {{remuneration}}</p><p><strong>Durée :</strong> {{duree_contrat}}</p></div>`
  },

  {
    code: "adm_rapport_suivi_ppp",
    name: "Rapport de Suivi de PPP",
    category: "juridique_admin",
    price: 8000,
    priceMax: 22000,
    description: "Rapport périodique de suivi de l'exécution d'un contrat de PPP, évaluant la performance du partenaire privé au regard des indicateurs contractuels de qualité de service.",
    templateType: "pdf",
    classe: "A",
    active: true,
    popularity: 55,
    fieldsJson: F([
      { key: "intitule_ppp", label: "Intitulé du projet PPP", type: "text", required: true },
      { key: "periode_suivi", label: "Période de suivi", type: "text", required: true },
      { key: "niveau_performance", label: "Niveau de performance du partenaire (%)", type: "text", required: true },
      { key: "incidents_constates", label: "Incidents ou écarts constatés", type: "textarea", required: false },
      { key: "mesures_correctives", label: "Mesures correctives engagées", type: "textarea", required: false },
      { key: "date_rapport", label: "Date du rapport", type: "date", required: true }
    ]),
    body: `<div class="doc"><h1>RAPPORT DE SUIVI PPP — {{intitule_ppp}}</h1><p><strong>Période :</strong> {{periode_suivi}}</p><p><strong>Performance :</strong> {{niveau_performance}}</p><p><strong>Incidents :</strong> {{incidents_constates}}</p><p><strong>Mesures :</strong> {{mesures_correctives}}</p><p><strong>Date :</strong> {{date_rapport}}</p></div>`
  },

  {
    code: "adm_pcd",
    name: "Plan de Développement Communal (PCD)",
    category: "juridique_admin",
    price: 15000,
    priceMax: 45000,
    description: "Document de planification stratégique d'une commune définissant la vision de développement, les axes prioritaires, les projets à réaliser et les ressources mobilisables sur 5 ans.",
    templateType: "pdf",
    classe: "A",
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: "commune", label: "Commune", type: "text", required: true },
      { key: "periode_planification", label: "Période de planification", type: "text", required: true },
      { key: "vision_developpement", label: "Vision de développement", type: "textarea", required: true },
      { key: "axes_prioritaires", label: "Axes prioritaires de développement", type: "textarea", required: true },
      { key: "budget_previsionnel", label: "Budget prévisionnel (FCFA)", type: "text", required: true }
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT COMMUNAL</h1><h2>COMMUNE DE {{commune}} — {{periode_planification}}</h2><p><strong>Vision :</strong> {{vision_developpement}}</p><p><strong>Axes prioritaires :</strong> {{axes_prioritaires}}</p><p><strong>Budget :</strong> {{budget_previsionnel}} FCFA</p></div>`
  },

  {
    code: "adm_plu",
    name: "Plan Local d'Urbanisme (PLU)",
    category: "juridique_admin",
    price: 18000,
    priceMax: 54000,
    description: "Document d'urbanisme fixant les règles générales d'utilisation du sol sur le territoire communal, en cohérence avec les orientations du plan de développement communal.",
    templateType: "pdf",
    classe: "A",
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: "commune", label: "Commune", type: "text", required: true },
      { key: "date_approbation", label: "Date d'approbation du PLU", type: "date", required: true },
      { key: "zones_definies", label: "Zones définies (résidentielle, commerciale, industrielle, verte)", type: "textarea", required: true },
      { key: "regles_generales", label: "Règles générales de construction", type: "textarea", required: true },
      { key: "servitudes", label: "Servitudes d'utilité publique", type: "textarea", required: false }
    ]),
    body: `<div class="doc"><h1>PLAN LOCAL D'URBANISME</h1><h2>COMMUNE DE {{commune}}</h2><p><strong>Approuvé le :</strong> {{date_approbation}}</p><p><strong>Zones :</strong> {{zones_definies}}</p><p><strong>Règles :</strong> {{regles_generales}}</p><p><strong>Servitudes :</strong> {{servitudes}}</p></div>`
  },

  {
    code: "adm_procedure_permis",
    name: "Procédure de Délivrance de Permis",
    category: "juridique_admin",
    price: 5000,
    priceMax: 13000,
    description: "Document décrivant la procédure administrative de délivrance d'un permis (construire, exploiter, lotir), les pièces requises, les délais et les frais applicables.",
    templateType: "pdf",
    classe: "B",
    active: true,
    popularity: 78,
    fieldsJson: F([
      { key: "type_permis", label: "Type de permis (construire, exploiter, etc.)", type: "text", required: true },
      { key: "autorite_delivrance", label: "Autorité de délivrance", type: "text", required: true },
      { key: "pieces_requises", label: "Pièces requises", type: "textarea", required: true },
      { key: "delai_instruction", label: "Délai d'instruction", type: "text", required: true },
      { key: "frais_dossier", label: "Frais de dossier (FCFA)", type: "text", required: true }
    ]),
    body: `<div class="doc"><h1>PROCÉDURE DE DÉLIVRANCE : {{type_permis}}</h1><p><strong>Autorité :</strong> {{autorite_delivrance}}</p><p><strong>Pièces requises :</strong> {{pieces_requises}}</p><p><strong>Délai d'instruction :</strong> {{delai_instruction}}</p><p><strong>Frais :</strong> {{frais_dossier}} FCFA</p></div>`
  },

  {
    code: "adm_acte_mise_demeure",
    name: "Acte Administratif de Mise en Demeure",
    category: "juridique_admin",
    price: 4000,
    priceMax: 11000,
    description: "Acte administratif mettant formellement en demeure une personne physique ou morale de se conformer à une obligation légale ou réglementaire dans un délai imparti.",
    templateType: "pdf",
    classe: "B",
    active: true,
    popularity: 74,
    fieldsJson: F([
      { key: "autorite_emettrice", label: "Autorité administrative émettrice", type: "text", required: true },
      { key: "destinataire", label: "Destinataire de la mise en demeure", type: "text", required: true },
      { key: "obligation_meconnue", label: "Obligation méconnue ou manquement constaté", type: "textarea", required: true },
      { key: "delai_regularisation", label: "Délai de régularisation accordé", type: "text", required: true },
      { key: "sanctions_encourues", label: "Sanctions encourues en cas de non-conformité", type: "textarea", required: true },
      { key: "date_acte", label: "Date de l'acte", type: "date", required: true }
    ]),
    body: `<div class="doc"><h1>MISE EN DEMEURE</h1><p><strong>Autorité :</strong> {{autorite_emettrice}}</p><p><strong>Destinataire :</strong> {{destinataire}}</p><p><strong>Manquement :</strong> {{obligation_meconnue}}</p><p><strong>Délai :</strong> {{delai_regularisation}}</p><p><strong>Sanctions :</strong> {{sanctions_encourues}}</p><p><strong>Date :</strong> {{date_acte}}</p></div>`
  },

  {
    code: "adm_recours_gracieux",
    name: "Recours Gracieux Administratif",
    category: "juridique_admin",
    price: 4000,
    priceMax: 10000,
    description: "Recours gracieux adressé à l'auteur d'une décision administrative pour en demander le retrait, la réformation ou l'abrogation, préalablement à tout recours contentieux.",
    templateType: "pdf",
    classe: "B",
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: "requerant", label: "Nom du requérant", type: "text", required: true },
      { key: "autorite_saisie", label: "Autorité saisie (auteur de la décision)", type: "text", required: true },
      { key: "decision_contestee", label: "Décision contestée et sa référence", type: "textarea", required: true },
      { key: "motifs", label: "Motifs du recours", type: "textarea", required: true },
      { key: "date_recours", label: "Date du recours", type: "date", required: true }
    ]),
    body: `<div class="doc"><h1>RECOURS GRACIEUX</h1><p><strong>Requérant :</strong> {{requerant}}</p><p><strong>À :</strong> {{autorite_saisie}}</p><p><strong>Décision contestée :</strong> {{decision_contestee}}</p><p><strong>Motifs :</strong> {{motifs}}</p><p><strong>Date :</strong> {{date_recours}}</p></div>`
  },

  {
    code: "adm_recours_hierarchique",
    name: "Recours Hiérarchique Administratif",
    category: "juridique_admin",
    price: 4000,
    priceMax: 10000,
    description: "Recours hiérarchique adressé au supérieur hiérarchique de l'auteur d'une décision administrative contestée, en vue d'obtenir l'annulation ou la réformation de ladite décision.",
    templateType: "pdf",
    classe: "B",
    active: true,
    popularity: 66,
    fieldsJson: F([
      { key: "requerant", label: "Nom du requérant", type: "text", required: true },
      { key: "superieur_hierarchique", label: "Autorité hiérarchique saisie", type: "text", required: true },
      { key: "auteur_decision", label: "Auteur de la décision contestée", type: "text", required: true },
      { key: "decision_contestee", label: "Décision contestée", type: "textarea", required: true },
      { key: "moyens_droit", label: "Moyens de droit et de fait", type: "textarea", required: true },
      { key: "date_recours", label: "Date du recours", type: "date", required: true }
    ]),
    body: `<div class="doc"><h1>RECOURS HIÉRARCHIQUE</h1><p><strong>Requérant :</strong> {{requerant}}</p><p><strong>À :</strong> {{superieur_hierarchique}}</p><p><strong>Décision de :</strong> {{auteur_decision}}</p><p><strong>Objet :</strong> {{decision_contestee}}</p><p><strong>Moyens :</strong> {{moyens_droit}}</p><p><strong>Date :</strong> {{date_recours}}</p></div>`
  },

  {
    code: "adm_charte_deontologie",
    name: "Charte de Déontologie de la Fonction Publique",
    category: "juridique_admin",
    price: 7000,
    priceMax: 20000,
    description: "Charte énonçant les principes éthiques et déontologiques auxquels sont tenus les agents de la fonction publique : intégrité, impartialité, loyauté, discrétion et neutralité.",
    templateType: "pdf",
    classe: "A",
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: "administration", label: "Administration ou corps concerné", type: "text", required: true },
      { key: "principes_fondamentaux", label: "Principes fondamentaux retenus", type: "textarea", required: true },
      { key: "obligations_agents", label: "Obligations des agents", type: "textarea", required: true },
      { key: "sanctions_disciplinaires", label: "Sanctions disciplinaires applicables", type: "textarea", required: false },
      { key: "date_adoption", label: "Date d'adoption de la charte", type: "date", required: true }
    ]),
    body: `<div class="doc"><h1>CHARTE DE DÉONTOLOGIE DE LA FONCTION PUBLIQUE</h1><p><strong>Administration :</strong> {{administration}}</p><p><strong>Principes fondamentaux :</strong> {{principes_fondamentaux}}</p><p><strong>Obligations :</strong> {{obligations_agents}}</p><p><strong>Sanctions :</strong> {{sanctions_disciplinaires}}</p><p><strong>Adoptée le :</strong> {{date_adoption}}</p></div>`
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
  console.log(`Batch 42a OK — créés:${created} maj:${updated} TOTAL:${total}`);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
