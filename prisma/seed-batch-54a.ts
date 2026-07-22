import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ─── ABATTOIRS / VIANDE (25 templates) ───────────────────────────────────
  {
    code: 'abat_bovins_service',
    name: "Contrat de service d'abattage bovins",
    category: 'agro_environnement',
    price: 5000,
    priceMax: 15000,
    description: "Contrat encadrant la prestation d'abattage de bovins entre un prestataire agréé MIRAH et un éleveur ou boucher.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 62,
    fieldsJson: F([
      { key: 'prestataire', label: "Raison sociale du prestataire", type: 'text', required: true },
      { key: 'client', label: "Nom / raison sociale du client", type: 'text', required: true },
      { key: 'nombre_bovins', label: "Nombre de bovins à abattre", type: 'text', required: true },
      { key: 'date_abattage', label: "Date prévue d'abattage", type: 'date', required: true },
      { key: 'tarif_unitaire', label: "Tarif unitaire par tête (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE D'ABATTAGE BOVINS</h1>
<p>Entre le prestataire <strong>{{prestataire}}</strong> agréé par la MIRAH, et le client <strong>{{client}}</strong>, il est convenu ce qui suit :</p>
<h2>Article 1 – Objet</h2>
<p>Le prestataire s'engage à abattre <strong>{{nombre_bovins}}</strong> têtes de bovins à la date du <strong>{{date_abattage}}</strong> dans les conditions sanitaires réglementaires en vigueur en Côte d'Ivoire.</p>
<h2>Article 2 – Prix</h2>
<p>Le tarif unitaire est fixé à <strong>{{tarif_unitaire}}</strong> FCFA par tête, toutes charges vétérinaires incluses.</p>
<h2>Article 3 – Obligations du prestataire</h2>
<p>Le prestataire garantit le respect des normes OHADA, des prescriptions de la MIRAH et assure la traçabilité de chaque carcasse.</p>
<h2>Article 4 – Loi applicable</h2>
<p>Le présent contrat est régi par le droit ivoirien et les actes uniformes OHADA applicables.</p>
<p class="signature">Fait à Abidjan, le {{date_abattage}}</p></div>`,
  },
  {
    code: 'abat_ovins_caprins_service',
    name: "Contrat de service d'abattage ovins et caprins",
    category: 'agro_environnement',
    price: 4000,
    priceMax: 10000,
    description: "Contrat de prestation pour l'abattage d'ovins et de caprins en abattoir agréé, conforme aux normes MIRAH.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 55,
    fieldsJson: F([
      { key: 'prestataire', label: "Nom du prestataire agréé", type: 'text', required: true },
      { key: 'client', label: "Nom du client", type: 'text', required: true },
      { key: 'espece', label: "Espèce (ovins / caprins / mixte)", type: 'text', required: true },
      { key: 'nombre_tetes', label: "Nombre de têtes", type: 'text', required: true },
      { key: 'date_prestation', label: "Date de la prestation", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE D'ABATTAGE OVINS / CAPRINS</h1>
<p>Le prestataire <strong>{{prestataire}}</strong> et le client <strong>{{client}}</strong> conviennent de la prestation suivante :</p>
<h2>Article 1 – Objet</h2>
<p>Abattage de <strong>{{nombre_tetes}}</strong> têtes d'espèce <strong>{{espece}}</strong> le <strong>{{date_prestation}}</strong>.</p>
<h2>Article 2 – Normes sanitaires</h2>
<p>L'abattage respecte les prescriptions de la MIRAH et le Règlement Sanitaire International applicable en Côte d'Ivoire.</p>
<h2>Article 3 – Responsabilité</h2>
<p>Le prestataire est responsable de toute non-conformité sanitaire constatée à l'inspection post-mortem.</p>
<p class="signature">Signé le {{date_prestation}}</p></div>`,
  },
  {
    code: 'abat_porcins_service',
    name: "Contrat de service d'abattage porcins",
    category: 'agro_environnement',
    price: 4500,
    priceMax: 12000,
    description: "Contrat pour la prestation d'abattage de porcs en abattoir agréé, avec inspection vétérinaire obligatoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 50,
    fieldsJson: F([
      { key: 'prestataire', label: "Prestataire agréé", type: 'text', required: true },
      { key: 'client', label: "Client (éleveur ou boucher)", type: 'text', required: true },
      { key: 'nombre_porcs', label: "Nombre de porcs", type: 'text', required: true },
      { key: 'poids_moyen', label: "Poids vif moyen estimé (kg)", type: 'text', required: true },
      { key: 'date_abattage', label: "Date d'abattage", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE D'ABATTAGE PORCINS</h1>
<p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong> :</p>
<h2>Article 1 – Prestation</h2>
<p>Abattage de <strong>{{nombre_porcs}}</strong> porcs d'un poids vif moyen de <strong>{{poids_moyen}}</strong> kg, le <strong>{{date_abattage}}</strong>.</p>
<h2>Article 2 – Inspection vétérinaire</h2>
<p>Toute carcasse jugée impropre à la consommation par le vétérinaire inspecteur sera saisie et détruite aux frais du propriétaire.</p>
<h2>Article 3 – Paiement</h2>
<p>Le règlement intervient au comptant dès remise des carcasses certifiées conformes.</p>
<p class="signature">Fait à Abidjan, le {{date_abattage}}</p></div>`,
  },
  {
    code: 'abat_volailles_service',
    name: "Contrat de service d'abattage volailles",
    category: 'agro_environnement',
    price: 3000,
    priceMax: 8000,
    description: "Contrat de prestation d'abattage industriel ou artisanal de volailles (poulets, dindes, pintades) en abattoir agréé.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'prestataire', label: "Nom du prestataire", type: 'text', required: true },
      { key: 'client', label: "Nom du client / aviculteur", type: 'text', required: true },
      { key: 'espece_volaille', label: "Espèce (poulet, dinde, pintade...)", type: 'text', required: true },
      { key: 'nombre_volailles', label: "Nombre de volailles", type: 'text', required: true },
      { key: 'date_prestation', label: "Date de la prestation", type: 'date', required: true },
      { key: 'tarif_lot', label: "Tarif forfaitaire du lot (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE D'ABATTAGE VOLAILLES</h1>
<p>Prestataire : <strong>{{prestataire}}</strong> — Client : <strong>{{client}}</strong></p>
<h2>Article 1 – Objet</h2>
<p>Abattage de <strong>{{nombre_volailles}}</strong> <strong>{{espece_volaille}}</strong> le <strong>{{date_prestation}}</strong>.</p>
<h2>Article 2 – Tarification</h2>
<p>Forfait du lot : <strong>{{tarif_lot}}</strong> FCFA incluant saignée, plumaison, éviscération et conditionnement primaire.</p>
<h2>Article 3 – Hygiène</h2>
<p>Le prestataire applique les Bonnes Pratiques d'Hygiène (BPH) conformément au Guide Sectoriel Avicole de Côte d'Ivoire.</p>
<p class="signature">Signé le {{date_prestation}}</p></div>`,
  },
  {
    code: 'abat_decoupe_conditionnement',
    name: "Accord de service de découpe et conditionnement",
    category: 'agro_environnement',
    price: 5000,
    priceMax: 14000,
    description: "Accord encadrant la prestation de découpe en portions et de conditionnement sous vide ou en barquettes de viandes diverses.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 57,
    fieldsJson: F([
      { key: 'prestataire', label: "Prestataire de découpe", type: 'text', required: true },
      { key: 'donneur_ordre', label: "Donneur d'ordre", type: 'text', required: true },
      { key: 'type_viande', label: "Type de viande", type: 'text', required: true },
      { key: 'volume_kg', label: "Volume estimé (kg)", type: 'text', required: true },
      { key: 'mode_conditionnement', label: "Mode de conditionnement", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DECOUPE ET CONDITIONNEMENT</h1>
<p>Entre <strong>{{prestataire}}</strong> et <strong>{{donneur_ordre}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>Découpe et conditionnement de <strong>{{volume_kg}}</strong> kg de <strong>{{type_viande}}</strong> en mode <strong>{{mode_conditionnement}}</strong>, à compter du <strong>{{date_debut}}</strong>.</p>
<h2>Article 2 – Traçabilité</h2>
<p>Chaque lot conditionné porte un numéro de lot et une date limite de consommation conformément à la réglementation ivoirienne.</p>
<h2>Article 3 – Non-conformité</h2>
<p>Tout lot non conforme est retourné au prestataire sans frais pour le donneur d'ordre.</p>
<p class="signature">Fait à Abidjan, le {{date_debut}}</p></div>`,
  },
  {
    code: 'abat_vente_carcasse_gros',
    name: "Contrat de vente de carcasse en gros (boucher grossiste)",
    category: 'agro_environnement',
    price: 6000,
    priceMax: 15000,
    description: "Contrat de vente en gros de carcasses de bovins ou petits ruminants entre un abattoir et un boucher grossiste.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'vendeur', label: "Nom / raison sociale du vendeur", type: 'text', required: true },
      { key: 'acheteur', label: "Nom du boucher grossiste", type: 'text', required: true },
      { key: 'espece', label: "Espèce et catégorie de carcasse", type: 'text', required: true },
      { key: 'poids_total_kg', label: "Poids total (kg)", type: 'text', required: true },
      { key: 'prix_kg', label: "Prix au kg (FCFA)", type: 'text', required: true },
      { key: 'date_livraison', label: "Date de livraison", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE VENTE DE CARCASSE EN GROS</h1>
<p>Vendeur : <strong>{{vendeur}}</strong> — Acheteur : <strong>{{acheteur}}</strong></p>
<h2>Article 1 – Objet de la vente</h2>
<p>Vente de <strong>{{poids_total_kg}}</strong> kg de carcasses de <strong>{{espece}}</strong> au prix de <strong>{{prix_kg}}</strong> FCFA/kg, livrées le <strong>{{date_livraison}}</strong>.</p>
<h2>Article 2 – Paiement</h2>
<p>Le paiement s'effectue à la livraison, contre émission de facture conforme aux dispositions de l'Acte Uniforme OHADA relatif aux contrats.</p>
<h2>Article 3 – Transfert de propriété et des risques</h2>
<p>Le transfert de propriété et des risques s'opère à la remise physique des carcasses certifiées conformes.</p>
<p class="signature">Fait à Abidjan, le {{date_livraison}}</p></div>`,
  },
  {
    code: 'abat_refrigeration_viande',
    name: "Accord de service de réfrigération viande",
    category: 'agro_environnement',
    price: 4000,
    priceMax: 10000,
    description: "Accord de mise en chambre froide et de maintien en température de viandes fraîches pour un opérateur de la filière.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 52,
    fieldsJson: F([
      { key: 'prestataire_froid', label: "Prestataire de froid", type: 'text', required: true },
      { key: 'client', label: "Client", type: 'text', required: true },
      { key: 'volume_m3', label: "Volume loué (m³)", type: 'text', required: true },
      { key: 'temperature_cible', label: "Température cible (°C)", type: 'text', required: true },
      { key: 'duree_mois', label: "Durée de stockage (mois)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE REFRIGERATION VIANDE</h1>
<p>Prestataire : <strong>{{prestataire_froid}}</strong> — Client : <strong>{{client}}</strong></p>
<h2>Article 1 – Objet</h2>
<p>Mise à disposition de <strong>{{volume_m3}}</strong> m³ de chambre froide à <strong>{{temperature_cible}}</strong>°C pour une durée de <strong>{{duree_mois}}</strong> mois.</p>
<h2>Article 2 – Garantie de performance</h2>
<p>Le prestataire garantit le maintien de la température cible 24h/24 et s'engage à alerter le client dans un délai de 2 heures en cas de défaillance.</p>
<h2>Article 3 – Responsabilité</h2>
<p>Toute perte de marchandise imputable à une défaillance technique du prestataire engage la responsabilité de ce dernier.</p>
<p class="signature">Signé à Abidjan</p></div>`,
  },
  {
    code: 'abat_transport_frigorifique',
    name: "Contrat de service de transport frigorifique viande",
    category: 'agro_environnement',
    price: 4500,
    priceMax: 12000,
    description: "Contrat encadrant le transport sous température contrôlée de viandes fraîches ou congelées sur le territoire ivoirien.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 59,
    fieldsJson: F([
      { key: 'transporteur', label: "Transporteur frigorifique", type: 'text', required: true },
      { key: 'expediteur', label: "Expéditeur", type: 'text', required: true },
      { key: 'trajet', label: "Trajet (origine - destination)", type: 'text', required: true },
      { key: 'poids_charge', label: "Poids de la charge (kg)", type: 'text', required: true },
      { key: 'date_transport', label: "Date de transport", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE TRANSPORT FRIGORIFIQUE VIANDE</h1>
<p>Transporteur : <strong>{{transporteur}}</strong> — Expéditeur : <strong>{{expediteur}}</strong></p>
<h2>Article 1 – Prestation</h2>
<p>Transport de <strong>{{poids_charge}}</strong> kg de viandes sur le trajet <strong>{{trajet}}</strong> le <strong>{{date_transport}}</strong>.</p>
<h2>Article 2 – Température</h2>
<p>La chaîne du froid est maintenue conformément aux normes CODEX ALIMENTARIUS et à la réglementation ivoirienne.</p>
<h2>Article 3 – Documents</h2>
<p>Le transporteur se munit du bon d'inspection vétérinaire et du bordereau de transport avant tout chargement.</p>
<p class="signature">Fait à Abidjan, le {{date_transport}}</p></div>`,
  },
  {
    code: 'abat_controle_veterinaire',
    name: "Accord de service de contrôle vétérinaire abattoir",
    category: 'agro_environnement',
    price: 5000,
    priceMax: 13000,
    description: "Convention de prestation de contrôle sanitaire et vétérinaire ante et post-mortem en abattoir, conforme aux exigences MIRAH.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 63,
    fieldsJson: F([
      { key: 'veterinaire', label: "Vétérinaire inspecteur / cabinet", type: 'text', required: true },
      { key: 'abattoir', label: "Nom de l'abattoir", type: 'text', required: true },
      { key: 'frequence', label: "Fréquence de passage (jours/semaine)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début de la convention", type: 'date', required: true },
      { key: 'honoraires_mensuels', label: "Honoraires mensuels (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CONTROLE VETERINAIRE ABATTOIR</h1>
<p>Entre le Dr / Cabinet <strong>{{veterinaire}}</strong> et l'abattoir <strong>{{abattoir}}</strong> :</p>
<h2>Article 1 – Mission</h2>
<p>Inspection ante-mortem et post-mortem <strong>{{frequence}}</strong> jours par semaine, à compter du <strong>{{date_debut}}</strong>.</p>
<h2>Article 2 – Rapports</h2>
<p>Un rapport hebdomadaire est remis à la direction de l'abattoir et transmis à la MIRAH selon le protocole en vigueur.</p>
<h2>Article 3 – Honoraires</h2>
<p>Honoraires mensuels : <strong>{{honoraires_mensuels}}</strong> FCFA, payables avant le 5 de chaque mois.</p>
<p class="signature">Fait à Abidjan, le {{date_debut}}</p></div>`,
  },
  {
    code: 'abat_rapport_inspection_mirah',
    name: "Rapport d'inspection sanitaire abattoir (MIRAH)",
    category: 'agro_environnement',
    price: 3000,
    priceMax: 7000,
    description: "Modèle de rapport d'inspection sanitaire officielle d'un abattoir par un agent de la MIRAH (Côte d'Ivoire).",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'inspecteur', label: "Nom de l'inspecteur MIRAH", type: 'text', required: true },
      { key: 'abattoir', label: "Dénomination de l'abattoir", type: 'text', required: true },
      { key: 'date_inspection', label: "Date de l'inspection", type: 'date', required: true },
      { key: 'constats', label: "Constats et observations", type: 'textarea', required: true },
      { key: 'recommandations', label: "Recommandations", type: 'textarea', required: true },
    ]),
    body: `<div class="doc"><h1>RAPPORT D'INSPECTION SANITAIRE ABATTOIR</h1>
<p><strong>Ministère des Ressources Animales et Halieutiques (MIRAH) – Côte d'Ivoire</strong></p>
<h2>1. Informations générales</h2>
<p>Inspecteur : <strong>{{inspecteur}}</strong> | Abattoir : <strong>{{abattoir}}</strong> | Date : <strong>{{date_inspection}}</strong></p>
<h2>2. Constats et observations</h2>
<p>{{constats}}</p>
<h2>3. Recommandations</h2>
<p>{{recommandations}}</p>
<h2>4. Conclusion</h2>
<p>Le présent rapport est établi conformément aux dispositions du Code de l'Élevage de Côte d'Ivoire et des normes OHADA applicables.</p>
<p class="signature">L'inspecteur MIRAH : <strong>{{inspecteur}}</strong></p></div>`,
  },
  {
    code: 'abat_certification_halal',
    name: "Accord de certification viande halal (inspection imam)",
    category: 'agro_environnement',
    price: 4000,
    priceMax: 10000,
    description: "Accord entre un abattoir et une autorité islamique agréée pour la certification halal des viandes abattues en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'abattoir', label: "Nom de l'abattoir", type: 'text', required: true },
      { key: 'autorite_islamique', label: "Autorité islamique / Imam certifiant", type: 'text', required: true },
      { key: 'especes_certifiees', label: "Espèces animales certifiées", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début de l'accord", type: 'date', required: true },
      { key: 'redevance', label: "Redevance mensuelle de certification (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE CERTIFICATION VIANDE HALAL</h1>
<p>L'abattoir <strong>{{abattoir}}</strong> et <strong>{{autorite_islamique}}</strong> conviennent :</p>
<h2>Article 1 – Objet</h2>
<p>Certification halal des <strong>{{especes_certifiees}}</strong> abattus dans l'établissement à compter du <strong>{{date_debut}}</strong>.</p>
<h2>Article 2 – Protocole</h2>
<p>L'abattage s'effectue selon les prescriptions islamiques (Tasmiya, orientation de la Qibla, saignée complète). L'inspecteur halal est présent à chaque abattage.</p>
<h2>Article 3 – Redevance</h2>
<p>Redevance mensuelle : <strong>{{redevance}}</strong> FCFA payable en début de mois.</p>
<h2>Article 4 – Étiquetage</h2>
<p>Le logo halal agréé est apposé sur chaque carcasse et conditionnement certifié.</p>
<p class="signature">Fait à Abidjan, le {{date_debut}}</p></div>`,
  },
  {
    code: 'abat_certification_casher',
    name: "Accord de certification viande casher",
    category: 'agro_environnement',
    price: 4500,
    priceMax: 11000,
    description: "Accord entre un abattoir et une autorité rabbinique pour la supervision et la certification casher des viandes abattues.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 42,
    fieldsJson: F([
      { key: 'abattoir', label: "Nom de l'abattoir", type: 'text', required: true },
      { key: 'autorite_rabbinique', label: "Autorité rabbinique / Mashgiach", type: 'text', required: true },
      { key: 'especes', label: "Espèces concernées", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE CERTIFICATION VIANDE CASHER</h1>
<p>L'abattoir <strong>{{abattoir}}</strong> et <strong>{{autorite_rabbinique}}</strong> (Mashgiach) concluent le présent accord :</p>
<h2>Article 1 – Objet</h2>
<p>Supervision et certification casher des <strong>{{especes}}</strong> à compter du <strong>{{date_debut}}</strong>.</p>
<h2>Article 2 – Protocole shechita</h2>
<p>L'abattage est réalisé par un Shochet agréé selon les lois de la cacheroute. Le Mashgiach supervise l'ensemble du processus et procède à la vérification (bedika) post-mortem.</p>
<h2>Article 3 – Conditions spéciales</h2>
<p>Les parties respectent la séparation stricte entre lignes casher et non-casher au sein de l'abattoir.</p>
<p class="signature">Fait à Abidjan, le {{date_debut}}</p></div>`,
  },
  {
    code: 'abat_tracabilite_codebare',
    name: "Contrat de service de traçabilité viande (code-barres)",
    category: 'agro_environnement',
    price: 5000,
    priceMax: 12000,
    description: "Contrat de mise en place et de gestion d'un système de traçabilité par code-barres ou QR code pour viandes en abattoir.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 54,
    fieldsJson: F([
      { key: 'fournisseur_solution', label: "Fournisseur de la solution", type: 'text', required: true },
      { key: 'abattoir', label: "Abattoir bénéficiaire", type: 'text', required: true },
      { key: 'type_code', label: "Type de code (code-barres / QR code)", type: 'text', required: true },
      { key: 'volume_etiquettes', label: "Volume mensuel d'étiquettes", type: 'text', required: true },
      { key: 'date_mise_en_service', label: "Date de mise en service", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE TRACABILITE VIANDE</h1>
<p>Fournisseur : <strong>{{fournisseur_solution}}</strong> — Abattoir : <strong>{{abattoir}}</strong></p>
<h2>Article 1 – Objet</h2>
<p>Mise en place d'un système de traçabilité par <strong>{{type_code}}</strong>, opérationnel le <strong>{{date_mise_en_service}}</strong>, pour un volume mensuel de <strong>{{volume_etiquettes}}</strong> étiquettes.</p>
<h2>Article 2 – Données</h2>
<p>Chaque étiquette contient : numéro de lot, date d'abattage, espèce, poids, numéro d'inspection vétérinaire.</p>
<h2>Article 3 – Maintenance</h2>
<p>Le fournisseur assure la maintenance corrective et évolutive du système pendant toute la durée du contrat.</p>
<p class="signature">Fait à Abidjan, le {{date_mise_en_service}}</p></div>`,
  },
  {
    code: 'abat_collecte_sous_produits',
    name: "Accord de service de collecte des sous-produits animaux",
    category: 'agro_environnement',
    price: 3500,
    priceMax: 9000,
    description: "Accord encadrant la collecte régulière des sous-produits animaux (cornes, os, sang, graisses) en sortie d'abattoir.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 48,
    fieldsJson: F([
      { key: 'collecteur', label: "Société de collecte", type: 'text', required: true },
      { key: 'abattoir', label: "Abattoir fournisseur", type: 'text', required: true },
      { key: 'types_sous_produits', label: "Types de sous-produits collectés", type: 'text', required: true },
      { key: 'frequence_collecte', label: "Fréquence de collecte", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE COLLECTE DES SOUS-PRODUITS ANIMAUX</h1>
<p>Collecteur : <strong>{{collecteur}}</strong> — Abattoir : <strong>{{abattoir}}</strong></p>
<h2>Article 1 – Objet</h2>
<p>Collecte de <strong>{{types_sous_produits}}</strong> à fréquence <strong>{{frequence_collecte}}</strong>, dès le <strong>{{date_debut}}</strong>.</p>
<h2>Article 2 – Obligations environnementales</h2>
<p>Le collecteur dispose des autorisations MINEDD requises et assure le transport sécurisé et valorisant des sous-produits conformément à la loi ivoirienne.</p>
<h2>Article 3 – Rémunération</h2>
<p>La rémunération est fixée par avenant tarifaire annexé au présent accord.</p>
<p class="signature">Signé à Abidjan, le {{date_debut}}</p></div>`,
  },
  {
    code: 'abat_traitement_dechets',
    name: "Contrat de service de traitement des déchets abattoir",
    category: 'agro_environnement',
    price: 5000,
    priceMax: 13000,
    description: "Contrat pour le traitement et l'élimination des déchets solides et liquides générés par un abattoir, conforme aux normes environnementales.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 53,
    fieldsJson: F([
      { key: 'prestataire_env', label: "Prestataire environnemental agréé", type: 'text', required: true },
      { key: 'abattoir', label: "Abattoir client", type: 'text', required: true },
      { key: 'types_dechets', label: "Types de déchets traités", type: 'text', required: true },
      { key: 'volume_mensuel', label: "Volume mensuel estimé (tonnes)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début du contrat", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE TRAITEMENT DES DECHETS ABATTOIR</h1>
<p>Prestataire : <strong>{{prestataire_env}}</strong> — Abattoir : <strong>{{abattoir}}</strong></p>
<h2>Article 1 – Objet</h2>
<p>Traitement de <strong>{{types_dechets}}</strong> (environ <strong>{{volume_mensuel}}</strong> t/mois), à compter du <strong>{{date_debut}}</strong>.</p>
<h2>Article 2 – Conformité</h2>
<p>Le prestataire détient les agréments MINEDD et CIAPOL requis. Il remet un bordereau de suivi de déchets (BSD) après chaque collecte.</p>
<h2>Article 3 – Pénalités</h2>
<p>Tout déversement illicite ou non-conformité environnementale engage la responsabilité exclusive du prestataire.</p>
<p class="signature">Fait à Abidjan, le {{date_debut}}</p></div>`,
  },
  {
    code: 'abat_cuir_peaux_tannerie',
    name: "Accord de service de cuir et peaux (tannerie)",
    category: 'agro_environnement',
    price: 4000,
    priceMax: 10000,
    description: "Accord de cession et de traitement des peaux et cuirs bruts d'abattoir vers une tannerie ou un négociant en peaux.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 46,
    fieldsJson: F([
      { key: 'abattoir', label: "Abattoir cédant", type: 'text', required: true },
      { key: 'tanneur', label: "Tannerie / négociant en peaux", type: 'text', required: true },
      { key: 'type_peaux', label: "Type de peaux (bovines, ovines...)", type: 'text', required: true },
      { key: 'volume_mensuel', label: "Volume mensuel (pièces)", type: 'text', required: true },
      { key: 'prix_piece', label: "Prix par pièce (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CUIR ET PEAUX</h1>
<p>L'abattoir <strong>{{abattoir}}</strong> cède à <strong>{{tanneur}}</strong> ses peaux brutes selon les modalités suivantes :</p>
<h2>Article 1 – Objet</h2>
<p>Cession de peaux brutes de <strong>{{type_peaux}}</strong>, à raison de <strong>{{volume_mensuel}}</strong> pièces/mois.</p>
<h2>Article 2 – Prix</h2>
<p>Prix unitaire : <strong>{{prix_piece}}</strong> FCFA/pièce, révisable trimestriellement d'un commun accord.</p>
<h2>Article 3 – Qualité</h2>
<p>Les peaux sont livrées fraîches, exemptes de défauts majeurs. Les saisies sanitaires ne sont pas comprises dans la cession.</p>
<p class="signature">Signé à Abidjan</p></div>`,
  },
  {
    code: 'abat_commercialisation_abats',
    name: "Contrat de service de commercialisation abats",
    category: 'agro_environnement',
    price: 3500,
    priceMax: 9000,
    description: "Contrat d'agent commercial pour la distribution et la vente des abats (foie, rognons, tripes, etc.) issus d'un abattoir.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 49,
    fieldsJson: F([
      { key: 'agent_commercial', label: "Agent commercial", type: 'text', required: true },
      { key: 'abattoir', label: "Abattoir mandant", type: 'text', required: true },
      { key: 'types_abats', label: "Types d'abats concernés", type: 'text', required: true },
      { key: 'commission', label: "Commission sur ventes (%)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début du mandat", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE COMMERCIALISATION D'ABATS</h1>
<p>Mandant : <strong>{{abattoir}}</strong> — Agent commercial : <strong>{{agent_commercial}}</strong></p>
<h2>Article 1 – Objet du mandat</h2>
<p>L'agent est chargé de commercialiser les <strong>{{types_abats}}</strong> auprès des revendeurs et restaurateurs locaux, à compter du <strong>{{date_debut}}</strong>.</p>
<h2>Article 2 – Rémunération</h2>
<p>Commission de <strong>{{commission}}</strong> % sur le prix de vente hors taxes de chaque lot vendu.</p>
<h2>Article 3 – Reporting</h2>
<p>L'agent remet un état hebdomadaire des ventes et reversements au mandant.</p>
<p class="signature">Fait à Abidjan, le {{date_debut}}</p></div>`,
  },
  {
    code: 'abat_congelation_surgelation',
    name: "Accord de service de congélation viande (surgélation)",
    category: 'agro_environnement',
    price: 4500,
    priceMax: 12000,
    description: "Accord pour la prestation de surgélation rapide de viandes fraîches afin d'assurer leur conservation longue durée.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 55,
    fieldsJson: F([
      { key: 'prestataire', label: "Prestataire de surgélation", type: 'text', required: true },
      { key: 'client', label: "Client", type: 'text', required: true },
      { key: 'volume_kg', label: "Volume à surgeler (kg)", type: 'text', required: true },
      { key: 'temperature_surgelation', label: "Température de surgélation (°C)", type: 'text', required: true },
      { key: 'date_prestation', label: "Date de la prestation", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CONGELATION VIANDE (SURGELATION)</h1>
<p>Prestataire : <strong>{{prestataire}}</strong> — Client : <strong>{{client}}</strong></p>
<h2>Article 1 – Objet</h2>
<p>Surgélation de <strong>{{volume_kg}}</strong> kg de viandes à <strong>{{temperature_surgelation}}</strong>°C le <strong>{{date_prestation}}</strong>.</p>
<h2>Article 2 – Norme</h2>
<p>La surgélation est réalisée conformément à la norme CODEX ALIMENTARIUS (température à coeur inférieure à -18°C atteinte en moins de 4 heures).</p>
<h2>Article 3 – Étiquetage</h2>
<p>Chaque unité porte la date de surgélation, la date limite de consommation et le numéro de lot.</p>
<p class="signature">Signé à Abidjan, le {{date_prestation}}</p></div>`,
  },
  {
    code: 'abat_decoupe_industrielle',
    name: "Contrat de service de découpe industrielle (steaks, filets)",
    category: 'agro_environnement',
    price: 6000,
    priceMax: 15000,
    description: "Contrat de prestation de découpe industrielle standardisée pour la production de steaks, filets et portions calibrées.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 58,
    fieldsJson: F([
      { key: 'prestataire', label: "Atelier de découpe industrielle", type: 'text', required: true },
      { key: 'client', label: "Client donneur d'ordre", type: 'text', required: true },
      { key: 'produits', label: "Produits à découper (steaks, filets, etc.)", type: 'text', required: true },
      { key: 'grammage_cible', label: "Grammage cible par pièce (g)", type: 'text', required: true },
      { key: 'volume_kg_semaine', label: "Volume hebdomadaire (kg)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE DECOUPE INDUSTRIELLE</h1>
<p>Atelier : <strong>{{prestataire}}</strong> — Donneur d'ordre : <strong>{{client}}</strong></p>
<h2>Article 1 – Objet</h2>
<p>Découpe industrielle de <strong>{{produits}}</strong> à <strong>{{grammage_cible}}</strong> g/pièce, pour un volume de <strong>{{volume_kg_semaine}}</strong> kg/semaine, à compter du <strong>{{date_debut}}</strong>.</p>
<h2>Article 2 – Tolérances</h2>
<p>La tolérance de poids est de ±5 % par pièce. Tout lot hors tolérance est refusé et repris sans frais.</p>
<h2>Article 3 – Hygiène et HACCP</h2>
<p>L'atelier est certifié HACCP et soumet ses données de contrôle au donneur d'ordre mensuellement.</p>
<p class="signature">Fait à Abidjan, le {{date_debut}}</p></div>`,
  },
  {
    code: 'abat_saucisserie_charcuterie',
    name: "Accord de service de saucisserie et charcuterie artisanale",
    category: 'agro_environnement',
    price: 4000,
    priceMax: 10000,
    description: "Accord de façonnage artisanal de produits de charcuterie (saucisses, merguez, pâtés) à partir de viandes fournies.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 51,
    fieldsJson: F([
      { key: 'artisan', label: "Artisan charcutier", type: 'text', required: true },
      { key: 'client', label: "Client fournisseur de viande", type: 'text', required: true },
      { key: 'produits_faconnes', label: "Produits façonnés (saucisses, merguez...)", type: 'text', required: true },
      { key: 'volume_kg', label: "Volume mensuel (kg de matière première)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SAUCISSERIE ET CHARCUTERIE ARTISANALE</h1>
<p>Artisan : <strong>{{artisan}}</strong> — Client : <strong>{{client}}</strong></p>
<h2>Article 1 – Prestation</h2>
<p>Façonnage artisanal de <strong>{{produits_faconnes}}</strong> à partir de <strong>{{volume_kg}}</strong> kg/mois de matière première fournie par le client, dès le <strong>{{date_debut}}</strong>.</p>
<h2>Article 2 – Recettes et secrets de fabrication</h2>
<p>Les recettes utilisées sont la propriété exclusive du client. L'artisan s'engage à la confidentialité totale.</p>
<h2>Article 3 – Contrôle qualité</h2>
<p>Le client effectue un contrôle organoleptique à chaque livraison. Tout lot refusé est reformulé sans supplément.</p>
<p class="signature">Signé à Abidjan, le {{date_debut}}</p></div>`,
  },
  {
    code: 'abat_rapport_performance',
    name: "Rapport de performance abattoir",
    category: 'agro_environnement',
    price: 3000,
    priceMax: 7000,
    description: "Modèle de rapport mensuel de performance opérationnelle d'un abattoir (volume, rendements, taux de saisie, chiffre d'affaires).",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 56,
    fieldsJson: F([
      { key: 'abattoir', label: "Nom de l'abattoir", type: 'text', required: true },
      { key: 'mois_annee', label: "Mois / Année du rapport", type: 'text', required: true },
      { key: 'volume_abattu_tonnes', label: "Volume total abattu (tonnes)", type: 'text', required: true },
      { key: 'taux_saisie_pct', label: "Taux de saisie sanitaire (%)", type: 'text', required: true },
      { key: 'synthese', label: "Synthèse et actions correctives", type: 'textarea', required: true },
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE ABATTOIR</h1>
<p>Abattoir : <strong>{{abattoir}}</strong> | Période : <strong>{{mois_annee}}</strong></p>
<h2>1. Volumes</h2>
<p>Volume total abattu : <strong>{{volume_abattu_tonnes}}</strong> tonnes</p>
<h2>2. Qualité sanitaire</h2>
<p>Taux de saisie : <strong>{{taux_saisie_pct}}</strong> %</p>
<h2>3. Synthèse et actions correctives</h2>
<p>{{synthese}}</p>
<p class="signature">Établi par la Direction de l'abattoir</p></div>`,
  },
  {
    code: 'abat_plan_developpement_filiere',
    name: "Plan de développement filière viande",
    category: 'agro_environnement',
    price: 6000,
    priceMax: 15000,
    description: "Document de planification stratégique pour le développement de la filière viande locale en Côte d'Ivoire (production, transformation, distribution).",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 47,
    fieldsJson: F([
      { key: 'porteur_projet', label: "Porteur de projet / Structure", type: 'text', required: true },
      { key: 'zone_geographique', label: "Zone géographique ciblée", type: 'text', required: true },
      { key: 'horizon_planification', label: "Horizon de planification (années)", type: 'text', required: true },
      { key: 'objectifs', label: "Objectifs stratégiques", type: 'textarea', required: true },
      { key: 'budget_previsionnel', label: "Budget prévisionnel global (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>PLAN DE DEVELOPPEMENT FILIERE VIANDE</h1>
<p>Porteur : <strong>{{porteur_projet}}</strong> | Zone : <strong>{{zone_geographique}}</strong> | Horizon : <strong>{{horizon_planification}}</strong> ans</p>
<h2>1. Objectifs stratégiques</h2>
<p>{{objectifs}}</p>
<h2>2. Budget prévisionnel</h2>
<p>Budget global estimé : <strong>{{budget_previsionnel}}</strong> FCFA</p>
<h2>3. Axes d'intervention</h2>
<p>Production — Transformation — Distribution — Exportation — Formation des acteurs</p>
<h2>4. Gouvernance</h2>
<p>Le plan est validé par le Comité de pilotage de la filière viande de Côte d'Ivoire conformément aux directives de la MIRAH.</p>
<p class="signature">Fait à Abidjan</p></div>`,
  },
  {
    code: 'abat_test_residus_antibio',
    name: "Accord de service de test résidus antibiotiques",
    category: 'agro_environnement',
    price: 5000,
    priceMax: 13000,
    description: "Accord de prestation de tests de détection de résidus d'antibiotiques et de métaux lourds dans les viandes destinées à la consommation.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 58,
    fieldsJson: F([
      { key: 'laboratoire', label: "Laboratoire d'analyse", type: 'text', required: true },
      { key: 'abattoir', label: "Abattoir client", type: 'text', required: true },
      { key: 'molecules_testees', label: "Molécules / résidus testés", type: 'text', required: true },
      { key: 'frequence_tests', label: "Fréquence des tests", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début du programme", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TEST RESIDUS ANTIBIOTIQUES</h1>
<p>Laboratoire : <strong>{{laboratoire}}</strong> — Abattoir : <strong>{{abattoir}}</strong></p>
<h2>Article 1 – Programme de surveillance</h2>
<p>Tests de détection de <strong>{{molecules_testees}}</strong>, à fréquence <strong>{{frequence_tests}}</strong>, à compter du <strong>{{date_debut}}</strong>.</p>
<h2>Article 2 – Méthodes analytiques</h2>
<p>Les analyses sont réalisées selon les méthodes LC-MS/MS accréditées, conformément aux LMR (Limites Maximales de Résidus) en vigueur.</p>
<h2>Article 3 – Résultats non conformes</h2>
<p>Tout résultat positif est signalé sous 24h à l'abattoir et à la MIRAH. Le lot concerné est immédiatement bloqué.</p>
<p class="signature">Fait à Abidjan, le {{date_debut}}</p></div>`,
  },
  {
    code: 'abat_vente_directe_eleveur_boucher',
    name: "Contrat de vente directe éleveur-boucher",
    category: 'agro_environnement',
    price: 4000,
    priceMax: 9000,
    description: "Contrat de vente directe d'animaux vifs entre un éleveur et un boucher, avec passage obligatoire en abattoir agréé.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 64,
    fieldsJson: F([
      { key: 'eleveur', label: "Nom / raison sociale de l'éleveur", type: 'text', required: true },
      { key: 'boucher', label: "Nom du boucher acheteur", type: 'text', required: true },
      { key: 'espece_nombre', label: "Espèce et nombre d'animaux", type: 'text', required: true },
      { key: 'prix_total', label: "Prix total (FCFA)", type: 'text', required: true },
      { key: 'date_transaction', label: "Date de la transaction", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE VENTE DIRECTE ELEVEUR – BOUCHER</h1>
<p>Éleveur : <strong>{{eleveur}}</strong> — Boucher : <strong>{{boucher}}</strong></p>
<h2>Article 1 – Objet</h2>
<p>Vente de <strong>{{espece_nombre}}</strong> pour un prix global de <strong>{{prix_total}}</strong> FCFA, le <strong>{{date_transaction}}</strong>.</p>
<h2>Article 2 – Abattage obligatoire</h2>
<p>Les animaux sont obligatoirement conduits en abattoir agréé pour l'abattage et l'inspection vétérinaire, conformément au Code de l'Élevage de Côte d'Ivoire.</p>
<h2>Article 3 – Garanties sanitaires</h2>
<p>L'éleveur garantit que les animaux sont vaccinés, correctement identifiés et exempts de maladies réglementées.</p>
<p class="signature">Fait à Abidjan, le {{date_transaction}}</p></div>`,
  },
  {
    code: 'abat_charte_bien_etre_animal',
    name: "Charte de bien-être animal en abattoir",
    category: 'agro_environnement',
    price: 3000,
    priceMax: 7000,
    description: "Charte d'engagement d'un abattoir au respect des principes de bien-être animal depuis la réception jusqu'à l'étourdissement et l'abattage.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 44,
    fieldsJson: F([
      { key: 'abattoir', label: "Nom et adresse de l'abattoir", type: 'text', required: true },
      { key: 'responsable', label: "Responsable bien-être animal", type: 'text', required: true },
      { key: 'date_adoption', label: "Date d'adoption de la charte", type: 'date', required: true },
      { key: 'engagements', label: "Engagements spécifiques de l'établissement", type: 'textarea', required: true },
    ]),
    body: `<div class="doc"><h1>CHARTE DE BIEN-ETRE ANIMAL EN ABATTOIR</h1>
<p>L'abattoir <strong>{{abattoir}}</strong>, représenté par <strong>{{responsable}}</strong>, adopte la présente Charte le <strong>{{date_adoption}}</strong>.</p>
<h2>Principes fondamentaux</h2>
<p>L'établissement s'engage à respecter les Cinq Libertés animales reconnues par l'OIE : liberté de ne pas souffrir de la faim et de la soif, de ne pas souffrir de contrainte physique, d'être indemne de douleur, de pouvoir exprimer un comportement normal, et d'être à l'abri de la peur.</p>
<h2>Engagements spécifiques</h2>
<p>{{engagements}}</p>
<h2>Contrôle et audit</h2>
<p>Un audit annuel de conformité est réalisé par un organisme tiers indépendant agréé.</p>
<p class="signature">Le Directeur de l'abattoir</p></div>`,
  },

  // ─── FORESTERIE / BOIS (25 templates) ────────────────────────────────────
  {
    code: 'bois_permis_exploitation',
    name: "Permis d'exploitation forestière",
    category: 'agro_environnement',
    price: 8000,
    priceMax: 20000,
    description: "Modèle de demande et d'octroi de permis d'exploitation forestière conforme à la législation ivoirienne (SODEFOR / MINEF).",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 72,
    fieldsJson: F([
      { key: 'exploitant', label: "Nom / raison sociale de l'exploitant", type: 'text', required: true },
      { key: 'localite_foret', label: "Localité et nom de la forêt", type: 'text', required: true },
      { key: 'superficie_ha', label: "Superficie à exploiter (ha)", type: 'text', required: true },
      { key: 'essences', label: "Essences autorisées", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début d'exploitation", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>PERMIS D'EXPLOITATION FORESTIERE</h1>
<p><strong>République de Côte d'Ivoire – Ministère des Eaux et Forêts (MINEF)</strong></p>
<h2>Article 1 – Bénéficiaire</h2>
<p>Le présent permis est accordé à <strong>{{exploitant}}</strong> pour l'exploitation de la forêt de <strong>{{localite_foret}}</strong>.</p>
<h2>Article 2 – Périmètre et essences</h2>
<p>Superficie : <strong>{{superficie_ha}}</strong> ha. Essences autorisées : <strong>{{essences}}</strong>.</p>
<h2>Article 3 – Durée</h2>
<p>Le permis prend effet le <strong>{{date_debut}}</strong> pour la durée fixée par le cahier des charges annexé.</p>
<h2>Article 4 – Obligations du titulaire</h2>
<p>Le titulaire est tenu au respect du Plan d'Aménagement Forestier, des quotas annuels et des obligations de reboisement fixées par la SODEFOR.</p>
<p class="signature">Le Directeur Général de la SODEFOR</p></div>`,
  },
  {
    code: 'bois_contrat_coupe_affermage',
    name: "Contrat de coupe de bois (affermage forestier)",
    category: 'agro_environnement',
    price: 7000,
    priceMax: 18000,
    description: "Contrat d'affermage forestier autorisant un preneur à abattre et à extraire du bois sur une parcelle délimitée, contre redevance.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'fermier', label: "Preneur / fermier forestier", type: 'text', required: true },
      { key: 'bailleur', label: "Bailleur (propriétaire ou SODEFOR)", type: 'text', required: true },
      { key: 'parcelle', label: "Désignation de la parcelle forestière", type: 'text', required: true },
      { key: 'volume_m3', label: "Volume autorisé (m³)", type: 'text', required: true },
      { key: 'redevance', label: "Redevance par m³ (FCFA)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE COUPE DE BOIS (AFFERMAGE FORESTIER)</h1>
<p>Bailleur : <strong>{{bailleur}}</strong> — Preneur : <strong>{{fermier}}</strong></p>
<h2>Article 1 – Objet</h2>
<p>Autorisation de coupe sur la parcelle <strong>{{parcelle}}</strong> pour un volume maximal de <strong>{{volume_m3}}</strong> m³, à compter du <strong>{{date_debut}}</strong>.</p>
<h2>Article 2 – Redevance</h2>
<p>Redevance : <strong>{{redevance}}</strong> FCFA/m³ extrait, déclarée mensuellement et payable sous 10 jours.</p>
<h2>Article 3 – Obligations environnementales</h2>
<p>Le preneur s'engage à replanter un arbre pour chaque arbre abattu et à ne pas empiéter sur les zones protégées adjacentes.</p>
<p class="signature">Fait à Abidjan, le {{date_debut}}</p></div>`,
  },
  {
    code: 'bois_gestion_durable_fsc',
    name: "Accord de gestion forestière durable (certification FSC)",
    category: 'agro_environnement',
    price: 9000,
    priceMax: 22000,
    description: "Accord cadre pour la mise en place d'une gestion forestière durable visant la certification FSC (Forest Stewardship Council).",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'operateur', label: "Opérateur forestier", type: 'text', required: true },
      { key: 'consultant_fsc', label: "Consultant FSC agréé", type: 'text', required: true },
      { key: 'superficie_ha', label: "Superficie à certifier (ha)", type: 'text', required: true },
      { key: 'date_lancement', label: "Date de lancement du processus", type: 'date', required: true },
      { key: 'echeance_certification', label: "Échéance cible pour la certification", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE GESTION FORESTIERE DURABLE – CERTIFICATION FSC</h1>
<p>Opérateur : <strong>{{operateur}}</strong> — Consultant FSC : <strong>{{consultant_fsc}}</strong></p>
<h2>Article 1 – Objectif</h2>
<p>Obtention de la certification FSC sur <strong>{{superficie_ha}}</strong> ha, avec un processus lancé le <strong>{{date_lancement}}</strong>, échéance cible : <strong>{{echeance_certification}}</strong>.</p>
<h2>Article 2 – Plan de gestion</h2>
<p>Un Plan de Gestion Forestière (PGF) conforme aux 10 Principes FSC est élaboré conjointement et soumis à l'auditeur FSC accrédité.</p>
<h2>Article 3 – Engagement communautaire</h2>
<p>L'opérateur consulte les communautés riveraines conformément aux exigences FSC en matière de droits des peuples autochtones et des communautés locales.</p>
<p class="signature">Fait à Abidjan, le {{date_lancement}}</p></div>`,
  },
  {
    code: 'bois_reboisement_service',
    name: "Contrat de service de reboisement",
    category: 'agro_environnement',
    price: 6000,
    priceMax: 15000,
    description: "Contrat de prestation de reboisement sur des terres dégradées ou en compensation d'exploitation forestière en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 61,
    fieldsJson: F([
      { key: 'prestataire', label: "Prestataire de reboisement", type: 'text', required: true },
      { key: 'maitre_ouvrage', label: "Maître d'ouvrage", type: 'text', required: true },
      { key: 'superficie_ha', label: "Superficie à reboiser (ha)", type: 'text', required: true },
      { key: 'essences_plantees', label: "Essences à planter", type: 'text', required: true },
      { key: 'date_plantation', label: "Date de plantation", type: 'date', required: true },
      { key: 'taux_reprise_garanti', label: "Taux de reprise garanti (%)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE REBOISEMENT</h1>
<p>Maître d'ouvrage : <strong>{{maitre_ouvrage}}</strong> — Prestataire : <strong>{{prestataire}}</strong></p>
<h2>Article 1 – Objet</h2>
<p>Plantation de <strong>{{essences_plantees}}</strong> sur <strong>{{superficie_ha}}</strong> ha, à compter du <strong>{{date_plantation}}</strong>.</p>
<h2>Article 2 – Garantie de reprise</h2>
<p>Le prestataire garantit un taux de reprise de <strong>{{taux_reprise_garanti}}</strong> % à 12 mois. Les plants morts sont remplacés sans frais.</p>
<h2>Article 3 – Entretien</h2>
<p>Le prestataire assure le désherbage, l'arrosage et la protection phytosanitaire pendant les 18 premiers mois.</p>
<p class="signature">Fait à Abidjan, le {{date_plantation}}</p></div>`,
  },
  {
    code: 'bois_pepiniere_forestiere',
    name: "Accord de service de pépinière forestière",
    category: 'agro_environnement',
    price: 4000,
    priceMax: 10000,
    description: "Accord pour la production et la fourniture de plants forestiers certifiés issus d'une pépinière agréée.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 53,
    fieldsJson: F([
      { key: 'pepinieriste', label: "Pépiniériste forestier", type: 'text', required: true },
      { key: 'acheteur', label: "Acheteur / reboiseur", type: 'text', required: true },
      { key: 'essences', label: "Essences commandées", type: 'text', required: true },
      { key: 'nombre_plants', label: "Nombre de plants", type: 'text', required: true },
      { key: 'date_livraison', label: "Date de livraison des plants", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PEPINIERE FORESTIERE</h1>
<p>Pépiniériste : <strong>{{pepinieriste}}</strong> — Acheteur : <strong>{{acheteur}}</strong></p>
<h2>Article 1 – Commande</h2>
<p>Production et fourniture de <strong>{{nombre_plants}}</strong> plants de <strong>{{essences}}</strong>, livrés le <strong>{{date_livraison}}</strong>.</p>
<h2>Article 2 – Qualité des plants</h2>
<p>Les plants sont issus de semences certifiées d'origine contrôlée. Hauteur minimale garantie : 30 cm au moment de la livraison.</p>
<h2>Article 3 – Paiement</h2>
<p>30 % à la commande, solde à la livraison contre bon de réception signé.</p>
<p class="signature">Signé à Abidjan, le {{date_livraison}}</p></div>`,
  },
  {
    code: 'bois_scierie_industrielle',
    name: "Contrat de service de scierie industrielle",
    category: 'agro_environnement',
    price: 7000,
    priceMax: 18000,
    description: "Contrat de prestation de sciage industriel de grumes en planches et madriers, avec plan de débit défini par le client.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 66,
    fieldsJson: F([
      { key: 'scierie', label: "Scierie industrielle", type: 'text', required: true },
      { key: 'client', label: "Client fournisseur de grumes", type: 'text', required: true },
      { key: 'essence', label: "Essence(s) à scier", type: 'text', required: true },
      { key: 'volume_m3', label: "Volume de grumes (m³)", type: 'text', required: true },
      { key: 'plan_debit', label: "Plan de débit (dimensions souhaitées)", type: 'textarea', required: true },
      { key: 'date_debut', label: "Date de début", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE SCIERIE INDUSTRIELLE</h1>
<p>Scierie : <strong>{{scierie}}</strong> — Client : <strong>{{client}}</strong></p>
<h2>Article 1 – Objet</h2>
<p>Sciage de <strong>{{volume_m3}}</strong> m³ de grumes de <strong>{{essence}}</strong> selon plan de débit défini, à compter du <strong>{{date_debut}}</strong>.</p>
<h2>Article 2 – Plan de débit</h2>
<p>{{plan_debit}}</p>
<h2>Article 3 – Rendement</h2>
<p>Le rendement sciage garanti est de 55 % minimum. Tout écart inférieur à ce seuil est compensé par un rabais sur la facture.</p>
<p class="signature">Fait à Abidjan, le {{date_debut}}</p></div>`,
  },
  {
    code: 'bois_menuiserie_industrielle',
    name: "Accord de service de transformation du bois (menuiserie industrielle)",
    category: 'agro_environnement',
    price: 6000,
    priceMax: 15000,
    description: "Accord de sous-traitance de fabrication de composants menuisés (portes, fenêtres, parquets) en usine de transformation du bois.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 58,
    fieldsJson: F([
      { key: 'usine', label: "Usine de menuiserie industrielle", type: 'text', required: true },
      { key: 'client', label: "Client donneur d'ordre", type: 'text', required: true },
      { key: 'produits', label: "Produits à fabriquer", type: 'text', required: true },
      { key: 'volume_pieces', label: "Volume mensuel (pièces)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début de production", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MENUISERIE INDUSTRIELLE</h1>
<p>Usine : <strong>{{usine}}</strong> — Donneur d'ordre : <strong>{{client}}</strong></p>
<h2>Article 1 – Objet</h2>
<p>Fabrication industrielle de <strong>{{produits}}</strong> à raison de <strong>{{volume_pieces}}</strong> pièces/mois, à compter du <strong>{{date_debut}}</strong>.</p>
<h2>Article 2 – Normes</h2>
<p>Les produits sont conformes aux normes NF bois ou équivalentes et aux cahiers des charges techniques remis par le donneur d'ordre.</p>
<h2>Article 3 – Contrôle qualité</h2>
<p>Un contrôle dimensionnel et visuel est effectué sur chaque lot avant expédition. Le taux de rebut toléré est de 2 % maximum.</p>
<p class="signature">Signé à Abidjan, le {{date_debut}}</p></div>`,
  },
  {
    code: 'bois_vente_grumes',
    name: "Contrat de vente de grumes (bois rond)",
    category: 'agro_environnement',
    price: 7000,
    priceMax: 18000,
    description: "Contrat de vente de grumes sur pied ou abattues entre un exploitant forestier et un acheteur industriel ou grossiste.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'vendeur', label: "Exploitant forestier vendeur", type: 'text', required: true },
      { key: 'acheteur', label: "Acheteur industriel", type: 'text', required: true },
      { key: 'essence', label: "Essence(s) vendue(s)", type: 'text', required: true },
      { key: 'volume_m3', label: "Volume (m³)", type: 'text', required: true },
      { key: 'prix_m3', label: "Prix unitaire par m³ (FCFA)", type: 'text', required: true },
      { key: 'date_livraison', label: "Date de livraison", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE VENTE DE GRUMES (BOIS ROND)</h1>
<p>Vendeur : <strong>{{vendeur}}</strong> — Acheteur : <strong>{{acheteur}}</strong></p>
<h2>Article 1 – Objet de la vente</h2>
<p>Vente de <strong>{{volume_m3}}</strong> m³ de grumes de <strong>{{essence}}</strong> au prix de <strong>{{prix_m3}}</strong> FCFA/m³, livrées le <strong>{{date_livraison}}</strong>.</p>
<h2>Article 2 – Cubage et mesurage</h2>
<p>Le cubage est effectué contradictoirement selon la méthode du milieu (formule de Huber), en présence des deux parties.</p>
<h2>Article 3 – Documents légaux</h2>
<p>Le vendeur fournit le bon d'enlèvement SODEFOR / MINEF et le certificat d'origine des bois.</p>
<p class="signature">Fait à Abidjan, le {{date_livraison}}</p></div>`,
  },
  {
    code: 'bois_vente_bois_debite',
    name: "Accord de vente de bois débité",
    category: 'agro_environnement',
    price: 5000,
    priceMax: 13000,
    description: "Accord de vente de bois débité (avivés, madriers, planches) entre une scierie et un client professionnel ou particulier.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 63,
    fieldsJson: F([
      { key: 'scierie_vendeur', label: "Scierie / vendeur", type: 'text', required: true },
      { key: 'acheteur', label: "Acheteur", type: 'text', required: true },
      { key: 'essence_qualite', label: "Essence et qualité du bois", type: 'text', required: true },
      { key: 'dimensions', label: "Dimensions (épaisseur x largeur x longueur)", type: 'text', required: true },
      { key: 'volume_m3', label: "Volume (m³)", type: 'text', required: true },
      { key: 'date_livraison', label: "Date de livraison", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE VENTE DE BOIS DEBITE</h1>
<p>Vendeur : <strong>{{scierie_vendeur}}</strong> — Acheteur : <strong>{{acheteur}}</strong></p>
<h2>Article 1 – Désignation</h2>
<p>Bois débité de <strong>{{essence_qualite}}</strong>, dimensions <strong>{{dimensions}}</strong> mm, volume : <strong>{{volume_m3}}</strong> m³.</p>
<h2>Article 2 – Livraison</h2>
<p>Livraison prévue le <strong>{{date_livraison}}</strong>, franco atelier de l'acheteur, sauf accord contraire.</p>
<h2>Article 3 – Réserve de propriété</h2>
<p>Le transfert de propriété est subordonné au paiement intégral du prix, conformément à l'Acte Uniforme OHADA.</p>
<p class="signature">Signé à Abidjan</p></div>`,
  },
  {
    code: 'bois_export_transforme',
    name: "Contrat d'export de bois transformé",
    category: 'agro_environnement',
    price: 9000,
    priceMax: 22000,
    description: "Contrat d'exportation de bois transformé (sciages, placages, contreplaqués) conforme aux réglementations FLEGT et CITES.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 67,
    fieldsJson: F([
      { key: 'exportateur', label: "Exportateur ivoirien", type: 'text', required: true },
      { key: 'importateur', label: "Importateur étranger", type: 'text', required: true },
      { key: 'produit', label: "Produit exporté (sciages, placages...)", type: 'text', required: true },
      { key: 'volume_m3', label: "Volume total (m³)", type: 'text', required: true },
      { key: 'port_embarquement', label: "Port d'embarquement", type: 'text', required: true },
      { key: 'date_expedition', label: "Date d'expédition prévue", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT D'EXPORT DE BOIS TRANSFORME</h1>
<p>Exportateur : <strong>{{exportateur}}</strong> — Importateur : <strong>{{importateur}}</strong></p>
<h2>Article 1 – Marchandise</h2>
<p><strong>{{produit}}</strong> — Volume : <strong>{{volume_m3}}</strong> m³ — Port : <strong>{{port_embarquement}}</strong> — Départ : <strong>{{date_expedition}}</strong></p>
<h2>Article 2 – Conformité légale</h2>
<p>L'exportateur fournit la Licence FLEGT (FORCOMS), le certificat d'origine, la phytosanitation et tout document CITES requis pour les essences protégées.</p>
<h2>Article 3 – Incoterm</h2>
<p>Livraison en termes FOB port d'embarquement, sauf disposition contraire dans la Lettre de Crédit documentaire.</p>
<p class="signature">Fait à Abidjan, le {{date_expedition}}</p></div>`,
  },
  {
    code: 'bois_traitement_sechage_ignifugation',
    name: "Accord de service de traitement du bois (séchage, ignifugation)",
    category: 'agro_environnement',
    price: 5000,
    priceMax: 13000,
    description: "Accord de prestation de séchage artificiel et d'ignifugation du bois pour améliorer ses performances techniques et sa durabilité.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 51,
    fieldsJson: F([
      { key: 'prestataire', label: "Prestataire de traitement", type: 'text', required: true },
      { key: 'client', label: "Client", type: 'text', required: true },
      { key: 'type_traitement', label: "Type de traitement (séchage / ignifugation / imprégnation)", type: 'text', required: true },
      { key: 'volume_m3', label: "Volume à traiter (m³)", type: 'text', required: true },
      { key: 'date_prestation', label: "Date de la prestation", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TRAITEMENT DU BOIS</h1>
<p>Prestataire : <strong>{{prestataire}}</strong> — Client : <strong>{{client}}</strong></p>
<h2>Article 1 – Prestation</h2>
<p>Traitement par <strong>{{type_traitement}}</strong> de <strong>{{volume_m3}}</strong> m³ de bois le <strong>{{date_prestation}}</strong>.</p>
<h2>Article 2 – Spécifications techniques</h2>
<p>Pour le séchage : teneur en humidité cible inférieure à 12 %. Pour l'ignifugation : classe de réaction au feu M1 ou B-s1, d0 (EN 13501-1).</p>
<h2>Article 3 – Certification</h2>
<p>Un certificat de traitement est remis au client pour chaque lot traité.</p>
<p class="signature">Signé à Abidjan, le {{date_prestation}}</p></div>`,
  },
  {
    code: 'bois_energie_charbon',
    name: "Contrat de service de bois énergie (charbon de bois)",
    category: 'agro_environnement',
    price: 3500,
    priceMax: 9000,
    description: "Contrat encadrant la production et la fourniture de charbon de bois issu de forêts gérées durablement en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 55,
    fieldsJson: F([
      { key: 'producteur', label: "Producteur de charbon de bois", type: 'text', required: true },
      { key: 'acheteur', label: "Acheteur / distributeur", type: 'text', required: true },
      { key: 'essence_source', label: "Essence source (bois utilisé)", type: 'text', required: true },
      { key: 'volume_sacs_mois', label: "Volume mensuel (sacs de 50 kg)", type: 'text', required: true },
      { key: 'prix_sac', label: "Prix par sac (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE BOIS ENERGIE – CHARBON DE BOIS</h1>
<p>Producteur : <strong>{{producteur}}</strong> — Acheteur : <strong>{{acheteur}}</strong></p>
<h2>Article 1 – Objet</h2>
<p>Fourniture de <strong>{{volume_sacs_mois}}</strong> sacs de 50 kg de charbon de bois de <strong>{{essence_source}}</strong> par mois.</p>
<h2>Article 2 – Prix</h2>
<p>Prix : <strong>{{prix_sac}}</strong> FCFA/sac, révisable semestriellement.</p>
<h2>Article 3 – Durabilité</h2>
<p>Le producteur justifie que le bois utilisé provient de zones autorisées par la SODEFOR ou de plantations privées légales. Il s'interdit tout prélèvement en forêt classée.</p>
<p class="signature">Signé à Abidjan</p></div>`,
  },
  {
    code: 'bois_plantation_teck',
    name: "Accord de service de gestion de plantation de teck",
    category: 'agro_environnement',
    price: 7000,
    priceMax: 18000,
    description: "Accord de gestion déléguée d'une plantation de teck (Tectona grandis) pour le compte d'un investisseur privé en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 62,
    fieldsJson: F([
      { key: 'gestionnaire', label: "Gestionnaire de plantation", type: 'text', required: true },
      { key: 'investisseur', label: "Investisseur propriétaire", type: 'text', required: true },
      { key: 'localisation', label: "Localisation de la plantation", type: 'text', required: true },
      { key: 'superficie_ha', label: "Superficie (ha)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début de gestion", type: 'date', required: true },
      { key: 'honoraires_annuels', label: "Honoraires annuels de gestion (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE GESTION DE PLANTATION DE TECK</h1>
<p>Investisseur : <strong>{{investisseur}}</strong> — Gestionnaire : <strong>{{gestionnaire}}</strong></p>
<h2>Article 1 – Objet</h2>
<p>Gestion déléguée d'une plantation de teck de <strong>{{superficie_ha}}</strong> ha sise à <strong>{{localisation}}</strong>, à compter du <strong>{{date_debut}}</strong>.</p>
<h2>Article 2 – Missions du gestionnaire</h2>
<p>Entretien sylvicole (désherbage, élagage, dépressage), protection phytosanitaire, reporting semestriel à l'investisseur.</p>
<h2>Article 3 – Rémunération</h2>
<p>Honoraires annuels : <strong>{{honoraires_annuels}}</strong> FCFA, payables en deux versements semestriels.</p>
<p class="signature">Fait à Abidjan, le {{date_debut}}</p></div>`,
  },
  {
    code: 'bois_eucalyptus_pate_papier',
    name: "Accord de service d'eucalyptus (pâte à papier)",
    category: 'agro_environnement',
    price: 6000,
    priceMax: 15000,
    description: "Accord de fourniture d'eucalyptus en bois court à une industrie de pâte à papier, issu de plantations gérées durablement.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 48,
    fieldsJson: F([
      { key: 'fournisseur', label: "Fournisseur d'eucalyptus", type: 'text', required: true },
      { key: 'industrie_papetiere', label: "Industrie papetière", type: 'text', required: true },
      { key: 'volume_steres_an', label: "Volume annuel (stères)", type: 'text', required: true },
      { key: 'prix_stere', label: "Prix par stère (FCFA)", type: 'text', required: true },
      { key: 'date_premiere_livraison', label: "Date de première livraison", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'EUCALYPTUS – PATE A PAPIER</h1>
<p>Fournisseur : <strong>{{fournisseur}}</strong> — Industrie : <strong>{{industrie_papetiere}}</strong></p>
<h2>Article 1 – Fourniture</h2>
<p>Livraison de <strong>{{volume_steres_an}}</strong> stères d'eucalyptus/an à <strong>{{prix_stere}}</strong> FCFA/stère, première livraison le <strong>{{date_premiere_livraison}}</strong>.</p>
<h2>Article 2 – Qualité</h2>
<p>Humidité inférieure à 35 %, absence d'écorce excessive, longueur de billes uniforme selon les spécifications de l'industrie.</p>
<h2>Article 3 – Durabilité</h2>
<p>Le fournisseur certifie que les eucalyptus proviennent de plantations légalement établies sur des terres non forestières classées.</p>
<p class="signature">Signé à Abidjan, le {{date_premiere_livraison}}</p></div>`,
  },
  {
    code: 'bois_bambou_construction',
    name: "Contrat de service de bambou (matériau construction)",
    category: 'agro_environnement',
    price: 4000,
    priceMax: 10000,
    description: "Contrat de fourniture et de traitement de bambou comme matériau de construction durable pour des projets BTP ou artisanaux.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 45,
    fieldsJson: F([
      { key: 'fournisseur', label: "Fournisseur de bambou", type: 'text', required: true },
      { key: 'client', label: "Client BTP / artisan", type: 'text', required: true },
      { key: 'espece_bambou', label: "Espèce de bambou", type: 'text', required: true },
      { key: 'volume_ml', label: "Volume (mètres linéaires ou nombre de tiges)", type: 'text', required: true },
      { key: 'date_livraison', label: "Date de livraison", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE BAMBOU – MATERIAU CONSTRUCTION</h1>
<p>Fournisseur : <strong>{{fournisseur}}</strong> — Client : <strong>{{client}}</strong></p>
<h2>Article 1 – Objet</h2>
<p>Fourniture de <strong>{{volume_ml}}</strong> de <strong>{{espece_bambou}}</strong> traité anti-insectes et anti-fongiques, livré le <strong>{{date_livraison}}</strong>.</p>
<h2>Article 2 – Spécifications</h2>
<p>Bambou coupé à maturité (plus de 3 ans), séché naturellement, diamètre et longueur conformes au cahier des charges technique.</p>
<h2>Article 3 – Usage</h2>
<p>Le bambou est destiné à un usage structurel ou de remplissage selon la fiche technique fournie par le client.</p>
<p class="signature">Signé à Abidjan, le {{date_livraison}}</p></div>`,
  },
  {
    code: 'bois_foret_communautaire',
    name: "Accord de gestion de forêt communautaire",
    category: 'agro_environnement',
    price: 5000,
    priceMax: 13000,
    description: "Accord tripartite entre une communauté riveraine, la SODEFOR et un opérateur privé pour la gestion participative d'une forêt communautaire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 56,
    fieldsJson: F([
      { key: 'communaute', label: "Communauté riveraine (village / chef)", type: 'text', required: true },
      { key: 'operateur', label: "Opérateur privé partenaire", type: 'text', required: true },
      { key: 'foret', label: "Nom et localisation de la forêt communautaire", type: 'text', required: true },
      { key: 'superficie_ha', label: "Superficie (ha)", type: 'text', required: true },
      { key: 'date_accord', label: "Date de l'accord", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE GESTION DE FORET COMMUNAUTAIRE</h1>
<p>Communauté : <strong>{{communaute}}</strong> — Opérateur : <strong>{{operateur}}</strong> — Forêt : <strong>{{foret}}</strong></p>
<h2>Article 1 – Objet</h2>
<p>Gestion participative de <strong>{{superficie_ha}}</strong> ha de forêt communautaire, en vigueur à compter du <strong>{{date_accord}}</strong>.</p>
<h2>Article 2 – Droits de la communauté</h2>
<p>La communauté conserve ses droits d'usage traditionnels (PFNL, bois de feu domestique). Tout prélèvement commercial est soumis à approbation du comité de gestion.</p>
<h2>Article 3 – Partage des bénéfices</h2>
<p>30 % des revenus nets issus de l'exploitation sont rétrocédés à la communauté pour financer des projets de développement local.</p>
<p class="signature">Fait à Abidjan, le {{date_accord}}</p></div>`,
  },
  {
    code: 'bois_redd_carbone_foret',
    name: "Accord de REDD+ forestier (carbone forêt)",
    category: 'agro_environnement',
    price: 10000,
    priceMax: 25000,
    description: "Accord de mise en oeuvre d'un projet REDD+ pour la réduction des émissions liées à la déforestation et la dégradation forestière en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 54,
    fieldsJson: F([
      { key: 'porteur_projet', label: "Porteur de projet REDD+", type: 'text', required: true },
      { key: 'partenaire_financement', label: "Partenaire de financement carbone", type: 'text', required: true },
      { key: 'zone_projet_ha', label: "Zone du projet (ha)", type: 'text', required: true },
      { key: 'volume_carbone_tco2', label: "Volume carbone estimé (tCO2e/an)", type: 'text', required: true },
      { key: 'date_demarrage', label: "Date de démarrage du projet", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE REDD+ FORESTIER – CARBONE FORET</h1>
<p>Porteur : <strong>{{porteur_projet}}</strong> — Partenaire financier : <strong>{{partenaire_financement}}</strong></p>
<h2>Article 1 – Objet</h2>
<p>Mise en oeuvre d'un projet REDD+ sur <strong>{{zone_projet_ha}}</strong> ha, générant <strong>{{volume_carbone_tco2}}</strong> tCO2e/an de crédits carbone vérifiables, dès le <strong>{{date_demarrage}}</strong>.</p>
<h2>Article 2 – Standard de vérification</h2>
<p>Le projet est développé selon le standard VCS (Verified Carbon Standard) ou Gold Standard et vérifié par un auditeur tiers accrédité.</p>
<h2>Article 3 – Partage des revenus carbone</h2>
<p>Les revenus carbone sont répartis selon le plan de partage des bénéfices annexé, incluant la part dévolue aux communautés locales.</p>
<p class="signature">Fait à Abidjan, le {{date_demarrage}}</p></div>`,
  },
  {
    code: 'bois_rapport_performance_exploitation',
    name: "Rapport de performance exploitation forestière",
    category: 'agro_environnement',
    price: 4000,
    priceMax: 10000,
    description: "Modèle de rapport annuel de performance d'une exploitation forestière (volumes, essences, rendements, incidents, reboisement).",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 57,
    fieldsJson: F([
      { key: 'exploitant', label: "Nom de l'exploitant", type: 'text', required: true },
      { key: 'annee', label: "Année du rapport", type: 'text', required: true },
      { key: 'volume_coupe_m3', label: "Volume total coupé (m³)", type: 'text', required: true },
      { key: 'superficie_reboisee_ha', label: "Superficie reboisée (ha)", type: 'text', required: true },
      { key: 'observations', label: "Observations et incidents notables", type: 'textarea', required: true },
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE EXPLOITATION FORESTIERE</h1>
<p>Exploitant : <strong>{{exploitant}}</strong> | Année : <strong>{{annee}}</strong></p>
<h2>1. Production</h2>
<p>Volume total coupé : <strong>{{volume_coupe_m3}}</strong> m³</p>
<h2>2. Reboisement compensatoire</h2>
<p>Superficie reboisée : <strong>{{superficie_reboisee_ha}}</strong> ha</p>
<h2>3. Observations et incidents</h2>
<p>{{observations}}</p>
<h2>4. Conformité réglementaire</h2>
<p>Le présent rapport est transmis à la SODEFOR et au MINEF conformément aux obligations de reporting annuel.</p>
<p class="signature">Le Responsable d'exploitation</p></div>`,
  },
  {
    code: 'bois_plan_gestion_pluriannuel',
    name: "Plan de gestion forestière pluriannuel",
    category: 'agro_environnement',
    price: 9000,
    priceMax: 22000,
    description: "Plan de gestion forestière pluriannuel (5 à 25 ans) définissant les objectifs, les interventions sylvicoles et les indicateurs de suivi.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 59,
    fieldsJson: F([
      { key: 'gestionnaire', label: "Gestionnaire forestier", type: 'text', required: true },
      { key: 'foret', label: "Nom et localisation de la forêt", type: 'text', required: true },
      { key: 'periode', label: "Période couverte (ex : 2025-2035)", type: 'text', required: true },
      { key: 'objectifs_gestion', label: "Objectifs de gestion", type: 'textarea', required: true },
      { key: 'date_approbation', label: "Date d'approbation du plan", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>PLAN DE GESTION FORESTIERE PLURIANNUEL</h1>
<p>Gestionnaire : <strong>{{gestionnaire}}</strong> | Forêt : <strong>{{foret}}</strong> | Période : <strong>{{periode}}</strong></p>
<h2>1. Objectifs de gestion</h2>
<p>{{objectifs_gestion}}</p>
<h2>2. Programme d'interventions</h2>
<p>Inventaire forestier — Coupes programmées par rotation — Reboisement — Entretien des pistes — Surveillance et protection</p>
<h2>3. Indicateurs de suivi</h2>
<p>Volume sur pied, taux de régénération naturelle, biodiversité (faune et flore), carbone séquestré, revenus générés.</p>
<h2>4. Approbation</h2>
<p>Plan approuvé le <strong>{{date_approbation}}</strong> par la SODEFOR et le MINEF conformément au Code Forestier de Côte d'Ivoire.</p>
<p class="signature">Approuvé par le Directeur Général de la SODEFOR</p></div>`,
  },
  {
    code: 'bois_controle_antibraconnage',
    name: "Accord de contrôle anti-braconnage",
    category: 'agro_environnement',
    price: 5000,
    priceMax: 12000,
    description: "Accord de prestation de surveillance et de lutte anti-braconnage forestier avec des agents assermentés en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 50,
    fieldsJson: F([
      { key: 'prestataire_surveillance', label: "Prestataire de surveillance forestière", type: 'text', required: true },
      { key: 'commanditaire', label: "Commanditaire (SODEFOR / exploitant)", type: 'text', required: true },
      { key: 'zone_surveillance', label: "Zone de surveillance", type: 'text', required: true },
      { key: 'effectif_agents', label: "Effectif d'agents déployés", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début de la mission", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE CONTROLE ANTI-BRACONNAGE</h1>
<p>Prestataire : <strong>{{prestataire_surveillance}}</strong> — Commanditaire : <strong>{{commanditaire}}</strong></p>
<h2>Article 1 – Mission</h2>
<p>Surveillance de la zone <strong>{{zone_surveillance}}</strong> par <strong>{{effectif_agents}}</strong> agents assermentés à compter du <strong>{{date_debut}}</strong>.</p>
<h2>Article 2 – Protocole de contrôle</h2>
<p>Patrouilles aléatoires diurnes et nocturnes, pose de pièges photographiques, signalement immédiat à la gendarmerie de toute infraction constatée.</p>
<h2>Article 3 – Reporting</h2>
<p>Rapport mensuel transmis au commanditaire et à la Direction Régionale du MINEF.</p>
<p class="signature">Fait à Abidjan, le {{date_debut}}</p></div>`,
  },
  {
    code: 'bois_inventaire_forestier',
    name: "Rapport d'inventaire forestier",
    category: 'agro_environnement',
    price: 6000,
    priceMax: 15000,
    description: "Rapport standardisé d'inventaire forestier présentant la composition en essences, les volumes sur pied et la densité de peuplement.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 61,
    fieldsJson: F([
      { key: 'bureau_etude', label: "Bureau d'étude forestière", type: 'text', required: true },
      { key: 'foret', label: "Forêt inventoriée", type: 'text', required: true },
      { key: 'date_inventaire', label: "Date de l'inventaire", type: 'date', required: true },
      { key: 'superficie_ha', label: "Superficie inventoriée (ha)", type: 'text', required: true },
      { key: 'resultats_principaux', label: "Résultats principaux", type: 'textarea', required: true },
    ]),
    body: `<div class="doc"><h1>RAPPORT D'INVENTAIRE FORESTIER</h1>
<p>Bureau d'étude : <strong>{{bureau_etude}}</strong> | Forêt : <strong>{{foret}}</strong> | Date : <strong>{{date_inventaire}}</strong></p>
<h2>1. Périmètre de l'inventaire</h2>
<p>Superficie : <strong>{{superficie_ha}}</strong> ha, inventoriée par placettes circulaires d'échantillonnage systématique.</p>
<h2>2. Résultats principaux</h2>
<p>{{resultats_principaux}}</p>
<h2>3. Recommandations</h2>
<p>Les données de cet inventaire servent de base à l'élaboration ou à la révision du Plan de Gestion Forestière.</p>
<p class="signature">Le Chef de mission forestière</p></div>`,
  },
  {
    code: 'bois_cartographie_sig',
    name: "Accord de service de cartographie forestière (SIG)",
    category: 'agro_environnement',
    price: 7000,
    priceMax: 18000,
    description: "Accord de prestation de cartographie forestière par Système d'Information Géographique (SIG) et images satellitaires.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 52,
    fieldsJson: F([
      { key: 'prestataire_sig', label: "Prestataire SIG / géomaticien", type: 'text', required: true },
      { key: 'client', label: "Client (SODEFOR / exploitant / ONG)", type: 'text', required: true },
      { key: 'zone_km2', label: "Zone à cartographier (km²)", type: 'text', required: true },
      { key: 'livrables', label: "Livrables attendus (cartes, shapefiles, rapport...)", type: 'textarea', required: true },
      { key: 'date_livraison', label: "Date de livraison des livrables", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CARTOGRAPHIE FORESTIERE (SIG)</h1>
<p>Prestataire SIG : <strong>{{prestataire_sig}}</strong> — Client : <strong>{{client}}</strong></p>
<h2>Article 1 – Objet</h2>
<p>Cartographie de <strong>{{zone_km2}}</strong> km² par SIG et images satellites haute résolution, livrables attendus le <strong>{{date_livraison}}</strong>.</p>
<h2>Article 2 – Livrables</h2>
<p>{{livrables}}</p>
<h2>Article 3 – Données sources</h2>
<p>Images Sentinel-2, Landsat-9 ou SPOT selon disponibilité et résolution requise. Données terrain validées par inventaire de vérité sol.</p>
<p class="signature">Fait à Abidjan, le {{date_livraison}}</p></div>`,
  },
  {
    code: 'bois_lutte_feux_brousse',
    name: "Contrat de service de lutte contre les feux de brousse",
    category: 'agro_environnement',
    price: 5000,
    priceMax: 13000,
    description: "Contrat de prestation de surveillance, prévention et lutte contre les feux de brousse en zone forestière et périforestière.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 58,
    fieldsJson: F([
      { key: 'prestataire', label: "Prestataire de lutte anti-incendie", type: 'text', required: true },
      { key: 'commanditaire', label: "Commanditaire", type: 'text', required: true },
      { key: 'zone_protegee', label: "Zone à protéger (ha ou localité)", type: 'text', required: true },
      { key: 'periode', label: "Période de veille (mois)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début de la mission", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE LUTTE CONTRE LES FEUX DE BROUSSE</h1>
<p>Prestataire : <strong>{{prestataire}}</strong> — Commanditaire : <strong>{{commanditaire}}</strong></p>
<h2>Article 1 – Mission</h2>
<p>Surveillance et protection de <strong>{{zone_protegee}}</strong> contre les feux de brousse pendant <strong>{{periode}}</strong> mois, à compter du <strong>{{date_debut}}</strong>.</p>
<h2>Article 2 – Moyens déployés</h2>
<p>Tours de guet, brigades mobiles de lutte, coupe-feux préventifs, sensibilisation des communautés riveraines.</p>
<h2>Article 3 – Coordination</h2>
<p>Le prestataire coordonne son action avec la Direction de la Protection de la Forêt (SODEFOR) et la Direction Générale de la Protection Civile.</p>
<p class="signature">Signé à Abidjan, le {{date_debut}}</p></div>`,
  },
  {
    code: 'bois_partenariat_sodefor_prive',
    name: "Accord de partenariat SODEFOR-privé",
    category: 'agro_environnement',
    price: 8000,
    priceMax: 20000,
    description: "Convention de partenariat public-privé entre la SODEFOR et un opérateur privé pour l'exploitation et l'aménagement d'un massif forestier classé.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 63,
    fieldsJson: F([
      { key: 'operateur_prive', label: "Opérateur privé partenaire", type: 'text', required: true },
      { key: 'foret_classee', label: "Forêt classée concernée", type: 'text', required: true },
      { key: 'superficie_ha', label: "Superficie (ha)", type: 'text', required: true },
      { key: 'duree_convention', label: "Durée de la convention (années)", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT SODEFOR – PRIVE</h1>
<p><strong>LA SODEFOR</strong>, représentée par son Directeur Général, et <strong>{{operateur_prive}}</strong> conviennent :</p>
<h2>Article 1 – Objet</h2>
<p>Exploitation et aménagement de la forêt classée de <strong>{{foret_classee}}</strong> (<strong>{{superficie_ha}}</strong> ha) pendant <strong>{{duree_convention}}</strong> ans, à compter du <strong>{{date_signature}}</strong>.</p>
<h2>Article 2 – Droits de l'opérateur</h2>
<p>Droit d'exploitation des essences autorisées par le cahier des charges, dans le respect des quotas annuels fixés par la SODEFOR.</p>
<h2>Article 3 – Obligations de l'opérateur</h2>
<p>Reboisement obligatoire de 20 % de la superficie annuellement exploitée, paiement de la redevance forestière, formation du personnel local.</p>
<p class="signature">Fait à Abidjan, le {{date_signature}}</p></div>`,
  },
  {
    code: 'bois_charte_gestion_responsable',
    name: "Charte de gestion forestière responsable Côte d'Ivoire",
    category: 'agro_environnement',
    price: 4000,
    priceMax: 10000,
    description: "Charte d'engagement volontaire d'un opérateur forestier aux principes de gestion responsable, de transparence et de respect des droits des communautés.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 49,
    fieldsJson: F([
      { key: 'operateur', label: "Opérateur forestier signataire", type: 'text', required: true },
      { key: 'representant', label: "Représentant légal", type: 'text', required: true },
      { key: 'date_adoption', label: "Date d'adoption de la charte", type: 'date', required: true },
      { key: 'engagements_specifiques', label: "Engagements spécifiques de l'opérateur", type: 'textarea', required: true },
    ]),
    body: `<div class="doc"><h1>CHARTE DE GESTION FORESTIERE RESPONSABLE – COTE D'IVOIRE</h1>
<p>L'opérateur <strong>{{operateur}}</strong>, représenté par <strong>{{representant}}</strong>, adopte la présente Charte le <strong>{{date_adoption}}</strong>.</p>
<h2>Préambule</h2>
<p>Conscient du rôle essentiel des forêts ivoiriennes pour la biodiversité, le climat, l'eau et les moyens de subsistance des communautés locales, l'opérateur s'engage à une gestion forestière légale, durable et équitable.</p>
<h2>Engagements fondamentaux</h2>
<p>Légalité — Durabilité — Équité communautaire — Transparence — Reboisement compensatoire — Zéro déforestation illégale</p>
<h2>Engagements spécifiques</h2>
<p>{{engagements_specifiques}}</p>
<h2>Contrôle et redevabilité</h2>
<p>L'opérateur soumet un rapport annuel de conformité à la SODEFOR, au MINEF et aux parties prenantes locales.</p>
<p class="signature"><strong>{{representant}}</strong>, au nom de <strong>{{operateur}}</strong></p></div>`,
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
  console.log(`Batch 54a OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
