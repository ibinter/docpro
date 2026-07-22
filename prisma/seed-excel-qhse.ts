import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const COUNTRIES = JSON.stringify(['CI','SN','CM','BJ','TG','BF','ML','GN','CD','CG','GA','NE','TD','MR']);

const templates = [
  // 1. xl_qhse_registre_accidents — Registre accidents/incidents
  {
    code: 'xl_qhse_registre_accidents',
    name: 'Registre accidents et incidents',
    category: 'juridique_admin',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Enregistrement et suivi des accidents/incidents : date, lieu, nature, gravité et actions correctives',
    price: 800, priceMax: 1300, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'annee', label: 'Année', type: 'text', required: true },
      { name: 'responsable_hse', label: 'Responsable HSE', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Registre Accidents',
          title: 'Registre des Accidents et Incidents',
          colorHeader: 'FF6F00',
          headers: ['N°', 'Date', 'Lieu', 'Nature de l\'événement', 'Personnes impliquées', 'Gravité', 'Arrêt travail (j)', 'Causes identifiées', 'Actions correctives', 'Délai', 'Statut', 'Responsable'],
          rows: [
            [1, '02/01/2025', 'Atelier mécanique', 'Chute de plain-pied', 'Koné A.', 'Bénin', 2, 'Sol glissant, absence EPI', 'Pose revêtement antidérapant', '15/01/2025', 'Clôturé', 'Chef atelier'],
            [2, '14/01/2025', 'Entrepôt', 'Coupure main', 'Traoré B.', 'Superficielle', 0, 'Outil mal entretenu', 'Remplacement outillage', '20/01/2025', 'Clôturé', 'Magasinier'],
            [3, '28/01/2025', 'Chantier ext.', 'Projection particules', 'Diallo C.', 'Modérée', 1, 'Non-port lunettes protection', 'Rappel port EPI obligatoire', '05/02/2025', 'Clôturé', 'Chef chantier'],
            [4, '10/02/2025', 'Bureau', 'Incendie équipement', 'Aucune', 'Matériel', 0, 'Court-circuit prise électrique', 'Vérification installation électrique', '20/02/2025', 'En cours', 'Électricien'],
            [5, '22/02/2025', 'Parking', 'Accident véhicule', 'Ouédraogo D.', 'Légère', 0, 'Vitesse excessive', 'Formation sécurité routière', '10/03/2025', 'Planifié', 'RH'],
            [6, '05/03/2025', 'Laboratoire', 'Contact produit chimique', 'Sow E.', 'Modérée', 3, 'Absence gants résistants', 'Achat EPI adaptés', '15/03/2025', 'Clôturé', 'Chef labo'],
            [7, '19/03/2025', 'Toiture', 'Presque-accident chute', 'Bamba F.', 'Potentielle', 0, 'Absence harnais', 'Audit travaux en hauteur', '30/03/2025', 'En cours', 'HSE'],
            [8, '02/04/2025', 'Atelier', 'Coincement doigt', 'Yao G.', 'Légère', 1, 'Distraction, capot non protégé', 'Installation protège-courroie', '12/04/2025', 'Clôturé', 'Chef atelier'],
            [9, '15/04/2025', 'Cuisine', 'Brûlure thermique', 'Coulibaly H.', 'Superficielle', 0, 'Contact plaque chauffante', 'Formation premiers secours', '25/04/2025', 'Clôturé', 'Intendant'],
            [10, '30/04/2025', 'Escalier', 'Entorse cheville', 'Mensah I.', 'Bénigne', 5, 'Rampe absente, éclairage insuffisant', 'Pose rampe + amélioration éclairage', '15/05/2025', 'En cours', 'Maintenance'],
          ],
          totalsRow: false,
          colWidths: [6, 14, 18, 26, 18, 14, 16, 28, 30, 14, 12, 16],
        },
        {
          name: 'Statistiques',
          title: 'Statistiques Accidents',
          colorHeader: 'E65100',
          headers: ['Indicateur', 'Valeur', 'Commentaire'],
          rows: [
            ['Nombre total d\'accidents', '=COUNTA(\'Registre Accidents\'!A2:A11)', 'Cumul période'],
            ['Accidents avec arrêt', '=COUNTIF(\'Registre Accidents\'!G2:G11,">0")', 'Arrêt > 0 jour'],
            ['Total jours d\'arrêt', '=SUM(\'Registre Accidents\'!G2:G11)', 'Jours perdus'],
            ['Accidents clôturés', '=COUNTIF(\'Registre Accidents\'!K2:K11,"Clôturé")', ''],
            ['Accidents en cours', '=COUNTIF(\'Registre Accidents\'!K2:K11,"En cours")', ''],
            ['Taux de clôture (%)', '=IFERROR(COUNTIF(\'Registre Accidents\'!K2:K11,"Clôturé")/COUNTA(\'Registre Accidents\'!A2:A11)*100,0)', ''],
          ],
          totalsRow: false,
          colWidths: [32, 16, 28],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 72,
  },

  // 2. xl_qhse_inspection_chantier — Checklist inspection sécurité chantier
  {
    code: 'xl_qhse_inspection_chantier',
    name: 'Checklist inspection sécurité chantier',
    category: 'juridique_admin',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Points de contrôle sécurité sur chantier : conformité, observations et actions correctives',
    price: 700, priceMax: 1200, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_chantier', label: 'Nom du chantier', type: 'text', required: true },
      { name: 'date_inspection', label: 'Date d\'inspection', type: 'date', required: true },
      { name: 'inspecteur', label: 'Inspecteur HSE', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Inspection Chantier',
          title: 'Checklist Inspection Sécurité Chantier',
          colorHeader: 'FF6F00',
          headers: ['N°', 'Point de contrôle', 'Domaine', 'Conforme', 'Non conforme', 'N/A', 'Observations', 'Action requise', 'Délai', 'Responsable'],
          rows: [
            [1, 'Signalisation d\'entrée chantier', 'Signalisation', 'X', '', '', 'Panneaux présents et lisibles', '', '', ''],
            [2, 'Clôture et accès contrôlés', 'Accès', 'X', '', '', 'Portail verrouillé hors heures', '', '', ''],
            [3, 'EPI disponibles et portés', 'EPI', '', 'X', '', 'Casques non portés par 3 ouvriers', 'Rappel port EPI obligatoire', '24h', 'Chef chantier'],
            [4, 'Échafaudages conformes', 'Travaux en hauteur', 'X', '', '', 'Planchers complets, garde-corps OK', '', '', ''],
            [5, 'Harnais antichute présents', 'Travaux en hauteur', '', 'X', '', '2 harnais manquants', 'Commander harnais manquants', '48h', 'Responsable matériel'],
            [6, 'Extincteurs accessibles', 'Incendie', 'X', '', '', '3 extincteurs opérationnels', '', '', ''],
            [7, 'Trousse de premiers secours', 'Urgences', 'X', '', '', 'Trousse complète et accessible', '', '', ''],
            [8, 'Élimination déchets chantier', 'Environnement', '', 'X', '', 'Accumulation gravats non triés', 'Évacuation déchets vers décharge', '3j', 'Chef chantier'],
            [9, 'Installations électriques temporaires', 'Électricité', 'X', '', '', 'Coffret électrique fermé', '', '', ''],
            [10, 'Plan d\'évacuation affiché', 'Urgences', '', '', 'X', 'Chantier linéaire sans bâtiment fixe', '', '', ''],
            [11, 'Registre sécurité à jour', 'Administratif', 'X', '', '', 'Registre tenu par le conducteur', '', '', ''],
            [12, 'Vérification engins de levage', 'Engins', '', 'X', '', 'Grue sans attestation récente', 'Contrôle technique urgence', '72h', 'Responsable engins'],
          ],
          totalsRow: false,
          colWidths: [6, 34, 20, 12, 14, 8, 30, 32, 10, 16],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 68,
  },

  // 3. xl_qhse_habilitations — Suivi habilitations électriques
  {
    code: 'xl_qhse_habilitations',
    name: 'Suivi habilitations électriques',
    category: 'juridique_admin',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Suivi des habilitations électriques du personnel : type, date d\'obtention, expiration et renouvellement',
    price: 700, priceMax: 1200, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'responsable', label: 'Responsable électrique', type: 'text', required: true },
      { name: 'annee', label: 'Année de suivi', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Habilitations Électriques',
          title: 'Suivi des Habilitations Électriques',
          colorHeader: 'FF6F00',
          headers: ['N°', 'Nom & Prénom', 'Poste', 'Type habilitation', 'Niveau', 'Date obtention', 'Date expiration', 'Organisme formateur', 'Renouvellement prévu', 'Statut', 'Observations'],
          rows: [
            [1, 'Koné Aboubakar', 'Électricien', 'Habilitation électrique', 'B2V', '15/03/2023', '15/03/2026', 'CFPA Abidjan', '01/02/2026', 'Valide', ''],
            [2, 'Traoré Seydou', 'Chef électricien', 'Habilitation électrique', 'H2V', '20/06/2022', '20/06/2025', 'INPHB Yamoussoukro', '01/05/2025', 'À renouveler', 'Renouvellement urgent'],
            [3, 'Diallo Mamadou', 'Technicien', 'Habilitation électrique', 'BR', '10/09/2023', '10/09/2026', 'CFPA Abidjan', '01/08/2026', 'Valide', ''],
            [4, 'Coulibaly Issiaka', 'Electricien polyvalent', 'Habilitation électrique', 'B1V', '05/01/2024', '05/01/2027', 'ESMG Dakar', '01/12/2026', 'Valide', ''],
            [5, 'Bamba Fanta', 'Conducteur de travaux', 'Habilitation électrique', 'BC', '12/11/2022', '12/11/2025', 'CFPA Abidjan', '01/10/2025', 'À renouveler', ''],
            [6, 'Yao Kouamé', 'Agent de maintenance', 'Habilitation électrique', 'B0', '03/04/2024', '03/04/2027', 'Centre Pro Bouaké', '01/03/2027', 'Valide', ''],
            [7, 'Ouédraogo Issa', 'Technicien réseau', 'Habilitation électrique', 'H1V', '18/07/2023', '18/07/2026', 'INPHB Yamoussoukro', '01/06/2026', 'Valide', ''],
            [8, 'Mensah Koffi', 'Électricien bâtiment', 'Habilitation électrique', 'B2', '25/02/2023', '25/02/2026', 'CFPA Abidjan', '01/01/2026', 'Valide', ''],
            [9, 'Sawadogo Paul', 'Chef d\'équipe', 'Habilitation électrique', 'BE Manœuvre', '30/10/2021', '30/10/2024', 'ESMG Dakar', 'EXPIRÉ', 'Expiré', 'Renouvellement en attente'],
            [10, 'Aké Serge', 'Ingénieur électricité', 'Habilitation électrique', 'H2', '14/08/2024', '14/08/2027', 'INPHB Yamoussoukro', '01/07/2027', 'Valide', ''],
          ],
          totalsRow: false,
          colWidths: [6, 22, 22, 24, 14, 16, 16, 24, 18, 14, 20],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 65,
  },

  // 4. xl_qhse_epi — Gestion EPI
  {
    code: 'xl_qhse_epi',
    name: 'Gestion des EPI',
    category: 'juridique_admin',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Suivi des équipements de protection individuelle : remise aux agents, état et renouvellement',
    price: 600, priceMax: 1100, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'responsable_hse', label: 'Responsable HSE', type: 'text', required: true },
      { name: 'annee', label: 'Année', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Gestion EPI',
          title: 'Gestion des Équipements de Protection Individuelle',
          colorHeader: 'FF6F00',
          headers: ['N°', 'Agent', 'Poste', 'Type EPI', 'Référence/Taille', 'Date remise', 'État actuel', 'Durée vie (mois)', 'Renouvellement prévu', 'Signature agent', 'Observations'],
          rows: [
            [1, 'Koné Aboubakar', 'Soudeur', 'Casque de sécurité', 'Taille M', '03/01/2025', 'Bon', 24, '03/01/2027', 'OK', ''],
            [2, 'Koné Aboubakar', 'Soudeur', 'Écran facial soudure', 'Universel', '03/01/2025', 'Bon', 12, '03/01/2026', 'OK', ''],
            [3, 'Traoré Seydou', 'Électricien', 'Gants isolants 1000V', 'Taille L', '10/01/2025', 'Usé', 6, '10/07/2025', 'OK', 'Remplacement urgent'],
            [4, 'Diallo Mamadou', 'Maçon', 'Chaussures sécurité S3', 'P42', '15/01/2025', 'Bon', 18, '15/07/2026', 'OK', ''],
            [5, 'Coulibaly Issiaka', 'Peintre', 'Masque respiratoire FFP3', 'Taille M', '20/01/2025', 'Bon', 3, '20/04/2025', 'OK', 'À renouveler bientôt'],
            [6, 'Bamba Fanta', 'Couvreur', 'Harnais antichute', 'Taille L', '05/02/2025', 'Bon', 60, '05/02/2030', 'OK', ''],
            [7, 'Yao Kouamé', 'Mécanicien', 'Lunettes protection', 'Universel', '10/02/2025', 'Endommagé', 12, 'À remplacer', 'OK', 'Verre rayé'],
            [8, 'Ouédraogo Issa', 'Agent chimique', 'Combinaison chimique', 'Taille XL', '15/02/2025', 'Bon', 12, '15/02/2026', 'OK', ''],
            [9, 'Mensah Koffi', 'Manutentionnaire', 'Gilet haute visibilité', 'Taille XL', '01/03/2025', 'Bon', 24, '01/03/2027', 'OK', ''],
            [10, 'Sawadogo Paul', 'Chauffeur', 'Ceinture lombaire', 'Taille L', '05/03/2025', 'Bon', 18, '05/09/2026', 'OK', ''],
          ],
          totalsRow: false,
          colWidths: [6, 20, 18, 24, 16, 14, 14, 16, 18, 16, 20],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 70,
  },

  // 5. xl_qhse_plan_prevention — Plan de prévention travaux dangereux
  {
    code: 'xl_qhse_plan_prevention',
    name: 'Plan de prévention travaux dangereux',
    category: 'juridique_admin',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Plan de prévention pour travaux dangereux : entreprises intervenantes, risques, mesures et responsables',
    price: 900, priceMax: 1400, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Entreprise utilisatrice', type: 'text', required: true },
      { name: 'date_debut_travaux', label: 'Date début travaux', type: 'date', required: true },
      { name: 'responsable_securite', label: 'Responsable sécurité', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Plan Prévention',
          title: 'Plan de Prévention — Travaux Dangereux',
          colorHeader: 'FF6F00',
          headers: ['N°', 'Entreprise intervenante', 'Nature des travaux', 'Zone intervention', 'Risques identifiés', 'Niveau risque', 'Mesures prévention', 'EPI requis', 'Responsable', 'Visa EU', 'Visa EE', 'Statut'],
          rows: [
            [1, 'ELEC-PRO CI', 'Travaux électriques HT', 'Local TGBT', 'Électrocution, arc électrique', 'Élevé', 'Consignation, habilitation H2V obligatoire', 'Gants HT, écran facial', 'Traoré S.', 'OK', 'OK', 'Validé'],
            [2, 'TOITURES AFRICA', 'Réfection toiture', 'Toit bâtiment A', 'Chute de hauteur, intempéries', 'Élevé', 'Harnais, filet sécurité, météo favorable', 'Harnais, casque', 'Diallo M.', 'OK', 'OK', 'Validé'],
            [3, 'SOUDURE EXPERT', 'Soudure charpente', 'Atelier fabrication', 'Brûlures, incendie, fumées', 'Moyen', 'Permis de feu, ventilation forcée', 'Écran soudure, gants', 'Koné A.', 'OK', 'OK', 'Validé'],
            [4, 'CHIMIE PROPRE', 'Nettoyage cuves chimiques', 'Zone stockage', 'Intoxication, explosion', 'Élevé', 'Analyse atmosphère, EPI chimiques', 'Combinaison, masque', 'Bamba F.', 'OK', '', 'En attente'],
            [5, 'CONSTRUCT+', 'Démolition partielle mur', 'Bâtiment B ext.', 'Effondrement, poussières amiante', 'Élevé', 'Diagnostic amiante, évacuation zone', 'Masque P3, combinaison', 'Coulibaly I.', 'OK', 'OK', 'Validé'],
            [6, 'ENGINS LOURD', 'Travaux de terrassement', 'Terrain nord', 'Collision engins, renversement', 'Moyen', 'Plan circulation, balisage, signaleur', 'Gilet HV, casque', 'Yao K.', 'OK', 'OK', 'Validé'],
            [7, 'CLIM EXPERT', 'Installation climatisation', 'Bureaux direction', 'Chute, électrique, fluides frigorigènes', 'Faible', 'Nacelle homologuée, consignation', 'Casque, harnais', 'Ouédraogo I.', 'OK', 'OK', 'Validé'],
            [8, 'PEINTURE PRO', 'Peinture anticorrosion', 'Charpente métal', 'Vapeurs toxiques, chute hauteur', 'Moyen', 'Ventilation, EPI chimiques, nacelle', 'Masque FFP3, combinaison', 'Mensah K.', 'OK', 'OK', 'Validé'],
          ],
          totalsRow: false,
          colWidths: [6, 20, 24, 18, 28, 14, 32, 22, 14, 10, 10, 12],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 62,
  },

  // 6. xl_qhse_risques — Document unique évaluation risques
  {
    code: 'xl_qhse_risques',
    name: 'Document unique évaluation des risques',
    category: 'juridique_admin',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'DUER : identification des unités de travail, dangers, cotation probabilité/gravité et priorité d\'action',
    price: 1200, priceMax: 1500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'date_evaluation', label: 'Date d\'évaluation', type: 'date', required: true },
      { name: 'evaluateur', label: 'Évaluateur', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Évaluation Risques',
          title: 'Document Unique d\'Évaluation des Risques',
          colorHeader: 'FF6F00',
          headers: ['N°', 'Unité de travail', 'Danger identifié', 'Situation dangereuse', 'Fréquence (1-4)', 'Gravité (1-4)', 'Maîtrise exist. (1-4)', 'Criticité', 'Priorité', 'Actions prévention', 'Responsable', 'Échéance'],
          rows: [
            [1, 'Atelier mécanique', 'Machines tournantes', 'Contact avec pièces en rotation', 3, 4, 2, '=E{r}*F{r}/G{r}', '=IF(H{r}>=8,"CRITIQUE",IF(H{r}>=4,"ÉLEVÉ","FAIBLE"))', 'Capotage machines, formation', 'Chef atelier', '30/06/2025'],
            [2, 'Atelier mécanique', 'Projection de copeaux', 'Opération d\'usinage sans écran', 3, 3, 3, '=E{r}*F{r}/G{r}', '=IF(H{r}>=8,"CRITIQUE",IF(H{r}>=4,"ÉLEVÉ","FAIBLE"))', 'Écrans de protection, lunettes', 'Chef atelier', '15/06/2025'],
            [3, 'Entrepôt', 'Manutention manuelle', 'Port de charges > 25 kg', 4, 2, 2, '=E{r}*F{r}/G{r}', '=IF(H{r}>=8,"CRITIQUE",IF(H{r}>=4,"ÉLEVÉ","FAIBLE"))', 'Formation gestes, chariots élévateurs', 'Responsable logistique', '01/07/2025'],
            [4, 'Local chimique', 'Produits dangereux', 'Manipulation sans EPI', 2, 4, 2, '=E{r}*F{r}/G{r}', '=IF(H{r}>=8,"CRITIQUE",IF(H{r}>=4,"ÉLEVÉ","FAIBLE"))', 'EPI obligatoires, FDS accessibles', 'Responsable chimique', '15/06/2025'],
            [5, 'Bureaux', 'Écrans de visualisation', 'Travail prolongé sur ordinateur', 4, 1, 3, '=E{r}*F{r}/G{r}', '=IF(H{r}>=8,"CRITIQUE",IF(H{r}>=4,"ÉLEVÉ","FAIBLE"))', 'Pauses régulières, ergonomie poste', 'DRH', '01/09/2025'],
            [6, 'Chantier extérieur', 'Travaux en hauteur', 'Intervention > 2m sans protection', 2, 4, 1, '=E{r}*F{r}/G{r}', '=IF(H{r}>=8,"CRITIQUE",IF(H{r}>=4,"ÉLEVÉ","FAIBLE"))', 'Harnais, nacelles, permis de travail', 'Chef chantier', '01/06/2025'],
            [7, 'Zone électrique', 'Risque électrique', 'Intervention sans habilitation', 1, 4, 3, '=E{r}*F{r}/G{r}', '=IF(H{r}>=8,"CRITIQUE",IF(H{r}>=4,"ÉLEVÉ","FAIBLE"))', 'Habilitation obligatoire, consignation', 'Responsable électrique', '30/06/2025'],
            [8, 'Cuisine/Réfectoire', 'Incendie', 'Cuisson sans surveillance', 2, 3, 3, '=E{r}*F{r}/G{r}', '=IF(H{r}>=8,"CRITIQUE",IF(H{r}>=4,"ÉLEVÉ","FAIBLE"))', 'Détecteur fumée, extincteur CO2', 'Intendant', '30/07/2025'],
            [9, 'Parking', 'Circulation véhicules', 'Piétons et véhicules sans séparation', 3, 3, 2, '=E{r}*F{r}/G{r}', '=IF(H{r}>=8,"CRITIQUE",IF(H{r}>=4,"ÉLEVÉ","FAIBLE"))', 'Marquage au sol, signalisation', 'Responsable site', '15/08/2025'],
            [10, 'Tous postes', 'Stress professionnel', 'Surcharge travail, conflits', 3, 2, 2, '=E{r}*F{r}/G{r}', '=IF(H{r}>=8,"CRITIQUE",IF(H{r}>=4,"ÉLEVÉ","FAIBLE"))', 'Entretiens individuels, formation managers', 'DRH', '01/10/2025'],
          ],
          totalsRow: false,
          colWidths: [6, 20, 22, 28, 14, 12, 18, 12, 12, 30, 18, 14],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 75,
  },

  // 7. xl_qhse_formations_secu — Suivi formations sécurité
  {
    code: 'xl_qhse_formations_secu',
    name: 'Suivi formations sécurité',
    category: 'juridique_admin',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Suivi des formations sécurité du personnel : thèmes, dates, durée, participants et résultats',
    price: 700, priceMax: 1200, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'annee', label: 'Année', type: 'text', required: true },
      { name: 'responsable_formation', label: 'Responsable formation', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Formations Sécurité',
          title: 'Suivi des Formations Sécurité',
          colorHeader: 'FF6F00',
          headers: ['N°', 'Intitulé formation', 'Thème', 'Agent(s) formé(s)', 'Formateur/Organisme', 'Date', 'Durée (h)', 'Lieu', 'Résultat', 'Attestation', 'Prochaine échéance', 'Coût (FCFA)'],
          rows: [
            [1, 'Gestes et postures', 'TMS prévention', 'Tout le personnel entrepôt (18)', 'Médecin travail', '12/01/2025', 4, 'Salle formation interne', 'Réussi', 'Oui', '12/01/2027', 150000],
            [2, 'Habilitation électrique B0', 'Risque électrique', 'Koné A., Traoré B., Diallo C.', 'CFPA Abidjan', '20/01/2025', 16, 'CFPA Abidjan', 'Réussi', 'Oui', '20/01/2028', 180000],
            [3, 'Premiers secours SST', 'Secourisme', 'Bamba F., Coulibaly I.', 'Croix-Rouge CI', '05/02/2025', 14, 'Salle formation interne', 'Réussi', 'Oui', '05/02/2027', 120000],
            [4, 'Travail en hauteur', 'Chute de hauteur', 'Équipe chantier (8)', 'Bureau Veritas', '18/02/2025', 8, 'Chantier Nord', 'Réussi', 'Oui', '18/02/2027', 200000],
            [5, 'Manipulation produits chimiques', 'Risque chimique', 'Mensah K., Yao G., Sow E.', 'INPHB Yamoussoukro', '03/03/2025', 7, 'Laboratoire', 'Réussi', 'Oui', '03/03/2026', 90000],
            [6, 'Incendie et évacuation', 'Risque incendie', 'Tout le personnel (45)', 'GSPM Abidjan', '15/03/2025', 4, 'Site principal', 'Réussi', 'Oui', '15/03/2026', 250000],
            [7, 'Conduite sécurisée', 'Risque routier', 'Chauffeurs (6)', 'SOTRA Formation', '28/03/2025', 8, 'Circuit interne', 'Réussi', 'Oui', '28/03/2027', 180000],
            [8, 'Risques psychosociaux', 'RPS managers', 'Encadrement (12)', 'Cabinet RH Conseil', '10/04/2025', 6, 'Salle conférence', 'En cours', 'Non', '10/04/2027', 300000],
            [9, 'Port EPI', 'Sensibilisation EPI', 'Nouvel embauchés (5)', 'HSE interne', '22/04/2025', 3, 'Salle formation', 'Réussi', 'Oui', '22/04/2026', 0],
            [10, 'Risque amiante SS3', 'Sous-section 3', 'Koné A., Bamba F.', 'CETIH Abidjan', '05/05/2025', 35, 'CETIH Abidjan', 'Planifié', 'Non', '05/05/2028', 450000],
          ],
          totalsRow: true,
          colWidths: [6, 30, 22, 28, 24, 14, 12, 22, 12, 12, 18, 16],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 68,
  },

  // 8. xl_qhse_non_conformites — Registre non-conformités
  {
    code: 'xl_qhse_non_conformites',
    name: 'Registre des non-conformités',
    category: 'juridique_admin',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Suivi des non-conformités qualité/HSE : source, description, causes racines, actions correctives et statut',
    price: 800, priceMax: 1300, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'annee', label: 'Année', type: 'text', required: true },
      { name: 'responsable_qualite', label: 'Responsable qualité', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Non-Conformités',
          title: 'Registre des Non-Conformités',
          colorHeader: 'FF6F00',
          headers: ['N° NC', 'Date détection', 'Source', 'Processus', 'Description NC', 'Gravité', 'Causes racines', 'Action corrective', 'Responsable', 'Délai prévu', 'Délai réel', 'Statut', 'Efficacité vérifiée'],
          rows: [
            ['NC-2025-001', '07/01/2025', 'Audit interne', 'Achats', 'Fournisseur non évalué commandé sans procédure', 'Majeure', 'Procédure non connue acheteur', 'Formation acheteurs + mise à jour procédure', 'Responsable achats', '21/01/2025', '19/01/2025', 'Clôturée', 'Oui'],
            ['NC-2025-002', '15/01/2025', 'Contrôle réception', 'Logistique', 'Marchandises sans étiquetage lot', 'Mineure', 'Fournisseur non informé exigences', 'Cahier des charges fournisseur actualisé', 'Responsable logistique', '31/01/2025', '28/01/2025', 'Clôturée', 'Oui'],
            ['NC-2025-003', '22/01/2025', 'Réclamation client', 'Production', 'Dimensions hors tolérance produit X', 'Critique', 'Réglage machine non contrôlé', 'Étalonnage + gamme de réglage', 'Chef production', '05/02/2025', '08/02/2025', 'Clôturée', 'Oui'],
            ['NC-2025-004', '03/02/2025', 'Inspection HSE', 'Maintenance', 'Extincteur périmé zone atelier', 'Majeure', 'Absence suivi périodique', 'Plan maintenance préventive extincteurs', 'Responsable maintenance', '10/02/2025', '09/02/2025', 'Clôturée', 'Oui'],
            ['NC-2025-005', '14/02/2025', 'Auto-contrôle', 'Qualité', 'Rapport essai sans visa responsable', 'Mineure', 'Oubli procédure validation', 'Rappel procédure + liste de contrôle', 'Responsable qualité', '21/02/2025', '20/02/2025', 'Clôturée', 'Oui'],
            ['NC-2025-006', '25/02/2025', 'Audit externe', 'RH', 'Registre formation non à jour', 'Majeure', 'Absence processus mise à jour', 'Procédure gestion formation révisée', 'DRH', '15/03/2025', '', 'En cours', 'Non'],
            ['NC-2025-007', '08/03/2025', 'Revue direction', 'Commercial', 'Indicateurs commerciaux non renseignés Q1', 'Mineure', 'Changement logiciel CRM', 'Formation équipe nouveau CRM', 'Directeur commercial', '31/03/2025', '', 'En cours', 'Non'],
            ['NC-2025-008', '19/03/2025', 'Réclamation client', 'Livraison', 'Retard livraison 72h sur commande urgente', 'Majeure', 'Rupture stock composant critique', 'Plan approv. sécurisé fournisseur alternatif', 'Responsable supply chain', '05/04/2025', '', 'Ouverte', 'Non'],
            ['NC-2025-009', '02/04/2025', 'Contrôle qualité', 'Laboratoire', 'Résultats analyses sans double vérification', 'Majeure', 'Procédure non respectée', 'Audit procédure labo + rappel réglementaire', 'Chef labo', '16/04/2025', '', 'Ouverte', 'Non'],
            ['NC-2025-010', '15/04/2025', 'Inspection HSE', 'Entrepôt', 'Stockage produits incompatibles côte à côte', 'Critique', 'Méconnaissance règles stockage', 'Formation + affichage plan stockage', 'Responsable entrepôt', '22/04/2025', '', 'Ouverte', 'Non'],
          ],
          totalsRow: false,
          colWidths: [14, 16, 18, 16, 32, 12, 28, 32, 20, 14, 14, 12, 18],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 70,
  },

  // 9. xl_qhse_audits_internes — Planning audits qualité internes
  {
    code: 'xl_qhse_audits_internes',
    name: 'Planning audits qualité internes',
    category: 'juridique_admin',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Planification et suivi des audits qualité internes : processus, auditeurs, dates, résultats et écarts',
    price: 900, priceMax: 1400, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'annee', label: 'Année du programme', type: 'text', required: true },
      { name: 'responsable_audits', label: 'Responsable audits', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Planning Audits',
          title: 'Programme des Audits Qualité Internes',
          colorHeader: 'FF6F00',
          headers: ['N°', 'Processus audité', 'Référentiel', 'Auditeur(s)', 'Date prévue', 'Date réelle', 'Durée (h)', 'Auditeur chef', 'N° EC', 'N° EMI', 'N° OA', 'Résultat global', 'Rapport envoyé', 'Suivi clôture'],
          rows: [
            [1, 'Direction / Management', 'ISO 9001 §5', 'Koné A., Traoré B.', '15/01/2025', '15/01/2025', 4, 'Koné A.', 0, 1, 2, 'Satisfaisant', 'Oui', 'En cours'],
            [2, 'Ressources Humaines', 'ISO 9001 §7.1', 'Diallo C., Coulibaly I.', '28/01/2025', '29/01/2025', 3, 'Diallo C.', 1, 0, 1, 'Satisfaisant', 'Oui', 'Clôturé'],
            [3, 'Achats / Approvisionnements', 'ISO 9001 §8.4', 'Bamba F., Yao K.', '12/02/2025', '12/02/2025', 5, 'Bamba F.', 2, 1, 3, 'Mineur', 'Oui', 'En cours'],
            [4, 'Production / Réalisation', 'ISO 9001 §8.5', 'Ouédraogo I., Mensah K.', '25/02/2025', '26/02/2025', 8, 'Ouédraogo I.', 1, 2, 2, 'Satisfaisant', 'Oui', 'Clôturé'],
            [5, 'Contrôle qualité', 'ISO 9001 §8.6', 'Koné A., Sawadogo P.', '11/03/2025', '11/03/2025', 4, 'Koné A.', 0, 1, 1, 'Satisfaisant', 'Oui', 'Clôturé'],
            [6, 'Logistique & Livraisons', 'ISO 9001 §8.5.5', 'Traoré B., Diallo C.', '25/03/2025', '27/03/2025', 4, 'Traoré B.', 1, 0, 2, 'Mineur', 'Oui', 'En cours'],
            [7, 'Service Après-Vente', 'ISO 9001 §9.1.2', 'Coulibaly I., Yao K.', '08/04/2025', '', 3, 'Coulibaly I.', 0, 0, 0, 'Planifié', 'Non', 'N/A'],
            [8, 'HSE / Sécurité', 'ISO 45001 §8', 'Bamba F., Mensah K.', '22/04/2025', '', 6, 'Bamba F.', 0, 0, 0, 'Planifié', 'Non', 'N/A'],
            [9, 'Environnement', 'ISO 14001 §8', 'Ouédraogo I., Koné A.', '06/05/2025', '', 5, 'Ouédraogo I.', 0, 0, 0, 'Planifié', 'Non', 'N/A'],
            [10, 'Amélioration continue', 'ISO 9001 §10', 'Sawadogo P., Traoré B.', '20/05/2025', '', 3, 'Sawadogo P.', 0, 0, 0, 'Planifié', 'Non', 'N/A'],
          ],
          totalsRow: false,
          colWidths: [6, 26, 16, 26, 14, 14, 12, 18, 10, 10, 10, 16, 14, 16],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 66,
  },

  // 10. xl_qhse_indicateurs — Tableau de bord QHSE
  {
    code: 'xl_qhse_indicateurs',
    name: 'Tableau de bord QHSE',
    category: 'juridique_admin',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Indicateurs QHSE : taux de fréquence, taux de gravité, NC ouvertes, formations, audits réalisés',
    price: 1000, priceMax: 1500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'annee', label: 'Année', type: 'text', required: true },
      { name: 'responsable_qhse', label: 'Responsable QHSE', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Tableau de Bord QHSE',
          title: 'Tableau de Bord QHSE Annuel',
          colorHeader: 'FF6F00',
          headers: ['Indicateur', 'Unité', 'Cible', 'T1 Réalisé', 'T2 Réalisé', 'T3 Réalisé', 'T4 Réalisé', 'Annuel', 'Taux atteinte %', 'Tendance'],
          rows: [
            ['Taux de fréquence (TF)', 'Acc/Mh', '< 5', 4.2, 3.8, 5.1, 0, '=IFERROR(SUM(D{r}:G{r})/COUNTA(D{r}:G{r}),0)', '=IFERROR((C{r}-H{r})/C{r}*100,0)', '=IF(H{r}<C{r},"▲ Favorable","▼ Défavorable")'],
            ['Taux de gravité (TG)', 'Jours/Mh', '< 0.3', 0.18, 0.22, 0.31, 0, '=IFERROR(SUM(D{r}:G{r})/COUNTA(D{r}:G{r}),0)', '=IFERROR((C{r}-H{r})/C{r}*100,0)', '=IF(H{r}<C{r},"▲ Favorable","▼ Défavorable")'],
            ['Accidents avec arrêt', 'Nb', '0', 1, 1, 2, 0, '=SUM(D{r}:G{r})', '', '=IF(H{r}=0,"▲ Objectif","▼ Non atteint")'],
            ['Presque-accidents déclarés', 'Nb', '> 10', 5, 7, 4, 0, '=SUM(D{r}:G{r})', '=IFERROR(H{r}/C{r}*100,0)', ''],
            ['Taux formation sécurité (%)', '%', '> 90', 82, 88, 91, 0, '=IFERROR(SUM(D{r}:G{r})/COUNTA(D{r}:G{r}),0)', '=IFERROR(H{r}/C{r}*100,0)', '=IF(H{r}>=C{r},"▲ Atteint","▼ En cours")'],
            ['NC ouvertes (cumulé)', 'Nb', '< 5', 3, 6, 4, 0, '=G{r}', '=IFERROR((C{r}-H{r})/C{r}*100,0)', '=IF(H{r}<=C{r},"▲ OK","▼ Dépassé")'],
            ['Taux clôture NC (%)', '%', '> 80', 75, 82, 85, 0, '=IFERROR(SUM(D{r}:G{r})/COUNTA(D{r}:G{r}),0)', '=IFERROR(H{r}/C{r}*100,0)', '=IF(H{r}>=C{r},"▲ Atteint","▼ En cours")'],
            ['Audits réalisés / prévus', 'Nb', '10', 3, 4, 3, 0, '=SUM(D{r}:G{r})', '=IFERROR(H{r}/C{r}*100,0)', '=IF(H{r}>=C{r},"▲ Atteint","▼ En cours")'],
            ['Exercices évacuation', 'Nb', '2', 1, 0, 1, 0, '=SUM(D{r}:G{r})', '=IFERROR(H{r}/C{r}*100,0)', '=IF(H{r}>=C{r},"▲ Atteint","▼ En cours")'],
            ['Satisfaction client qualité (%)', '%', '> 85', 88, 86, 87, 0, '=IFERROR(SUM(D{r}:G{r})/COUNTA(D{r}:G{r}),0)', '=IFERROR(H{r}/C{r}*100,0)', '=IF(H{r}>=C{r},"▲ Atteint","▼ En cours")'],
          ],
          totalsRow: false,
          colWidths: [30, 14, 12, 14, 14, 14, 14, 14, 18, 20],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 78,
  },

  // 11. xl_qhse_dechets — Registre déchets
  {
    code: 'xl_qhse_dechets',
    name: 'Registre des déchets',
    category: 'juridique_admin',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Suivi des déchets produits : type, producteur, quantité, filière d\'élimination et coût',
    price: 700, priceMax: 1200, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'annee', label: 'Année', type: 'text', required: true },
      { name: 'responsable_environnement', label: 'Responsable environnement', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Registre Déchets',
          title: 'Registre des Déchets',
          colorHeader: 'FF6F00',
          headers: ['N°', 'Date', 'Type de déchet', 'Code déchet', 'Catégorie', 'Producteur', 'Quantité (kg)', 'Unité', 'Prestataire collecte', 'Filière élimination', 'Bordereau suivi', 'Coût (FCFA)', 'Observations'],
          rows: [
            [1, '10/01/2025', 'Huiles usagées', '13 02 05', 'DID', 'Atelier mécanique', 180, 'kg', 'ECO-COLLECT', 'Régénération', 'BSE-001-2025', 45000, ''],
            [2, '15/01/2025', 'Emballages carton', '15 01 01', 'DIB', 'Entrepôt', 320, 'kg', 'RECYPLAST CI', 'Recyclage', 'BSE-002-2025', 0, 'Reprise gratuite recycleur'],
            [3, '22/01/2025', 'Déchets électroniques', '16 02 14', 'DID', 'Informatique', 45, 'kg', 'DECHETS TECH', 'Filière agréée', 'BSE-003-2025', 18000, ''],
            [4, '31/01/2025', 'Déchets de chantier inertes', '17 01 01', 'DI', 'Chantier Nord', 2500, 'kg', 'CONSTRUC-ENVI', 'Décharge class. inertes', 'BSE-004-2025', 75000, ''],
            [5, '07/02/2025', 'Chiffons contaminés', '15 02 02', 'DID', 'Atelier mécanique', 25, 'kg', 'ECO-COLLECT', 'Incinération', 'BSE-005-2025', 12500, ''],
            [6, '14/02/2025', 'Plastiques mélangés', '15 01 06', 'DIB', 'Production', 210, 'kg', 'RECYPLAST CI', 'Recyclage', 'BSE-006-2025', 0, ''],
            [7, '21/02/2025', 'Piles et batteries', '16 06 05', 'DID', 'Tous sites', 8, 'kg', 'BATP', 'Filière agréée', 'BSE-007-2025', 4000, ''],
            [8, '28/02/2025', 'Déchets alimentaires', '20 01 08', 'DIB', 'Réfectoire', 95, 'kg', 'COMPOST CI', 'Compostage', 'BSE-008-2025', 0, 'Convention composteur'],
            [9, '07/03/2025', 'Solvants usagés', '14 06 03', 'DID', 'Labo peinture', 35, 'kg', 'ECO-COLLECT', 'Incinération', 'BSE-009-2025', 17500, ''],
            [10, '14/03/2025', 'Ferrailles et métaux', '17 04 05', 'DIB', 'Atelier', 680, 'kg', 'IFRI-RECYCLE', 'Recyclage', 'BSE-010-2025', 34000, 'Vente ferrailleur agréé'],
          ],
          totalsRow: true,
          colWidths: [6, 14, 24, 14, 10, 18, 14, 10, 20, 24, 16, 14, 20],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 62,
  },

  // 12. xl_qhse_bruit — Relevé exposition au bruit
  {
    code: 'xl_qhse_bruit',
    name: 'Relevé exposition au bruit',
    category: 'juridique_admin',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Mesures d\'exposition au bruit par poste de travail : niveaux mesurés, VLE réglementaires et actions',
    price: 700, priceMax: 1200, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'date_campagne', label: 'Date de campagne de mesure', type: 'date', required: true },
      { name: 'organisme_mesure', label: 'Organisme de mesure', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Exposition Bruit',
          title: 'Relevé d\'Exposition au Bruit par Poste',
          colorHeader: 'FF6F00',
          headers: ['N°', 'Poste de travail', 'Zone', 'Effectif exposé', 'Durée exposition (h/j)', 'LEX,8h mesuré (dB)', 'LCpeak (dB)', 'VLE LEX (dB)', 'VLE LCpeak (dB)', 'Dépassement VLE', 'EPI requis', 'Actions techniques', 'Priorité', 'Délai'],
          rows: [
            [1, 'Opérateur presse', 'Atelier forge', 8, 8, 91, 138, 87, 140, 'OUI (LEX)', 'Protège-oreilles EN 352', 'Encoffrement machine, amortisseurs', 'URGENT', '01/06/2025'],
            [2, 'Soudeur', 'Atelier soudure', 6, 7, 85, 132, 87, 140, 'NON', 'Bouchons moulés', 'Panneaux absorbants', 'Moyen', '01/09/2025'],
            [3, 'Conducteur engin TP', 'Chantier extérieur', 4, 9, 88, 135, 87, 140, 'OUI (LEX)', 'Casque anti-bruit', 'Remplacement cabine insonorisée', 'URGENT', '01/07/2025'],
            [4, 'Opérateur compresseur', 'Local technique', 2, 4, 94, 141, 87, 140, 'OUI (LEX+LCp)', 'Casque anti-bruit + bouchons', 'Isolement local compresseur', 'CRITIQUE', '01/05/2025'],
            [5, 'Mécanicien atelier', 'Garage', 5, 8, 83, 128, 87, 140, 'NON', 'Bouchons jetables', 'Réduction vitesse outils pneumatiques', 'Faible', '01/12/2025'],
            [6, 'Agent de production', 'Atelier production', 15, 8, 86, 130, 87, 140, 'NON', 'Protège-oreilles', 'Maintenance machines, huile silencieuse', 'Moyen', '01/09/2025'],
            [7, 'Chauffeur camion', 'Transport', 3, 9, 80, 125, 87, 140, 'NON', 'Aucun requis', 'Vérification silencieux véhicules', 'Faible', '01/12/2025'],
            [8, 'Agent de nettoyage', 'Tous sites', 8, 2, 72, 110, 87, 140, 'NON', 'Aucun requis', 'Aucune', 'Nul', 'N/A'],
            [9, 'Technicien laboratoire', 'Laboratoire', 4, 8, 65, 105, 87, 140, 'NON', 'Aucun requis', 'Aucune', 'Nul', 'N/A'],
            [10, 'Opérateur tronçonneuse', 'Chantier', 2, 3, 96, 143, 87, 140, 'OUI (LEX+LCp)', 'Casque + bouchons', 'Réduction durée exposition, outil silencieux', 'CRITIQUE', '01/05/2025'],
          ],
          totalsRow: false,
          colWidths: [6, 24, 18, 14, 18, 18, 16, 14, 16, 16, 22, 32, 12, 14],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 58,
  },

  // 13. xl_qhse_chimiques — Inventaire produits chimiques
  {
    code: 'xl_qhse_chimiques',
    name: 'Inventaire produits chimiques',
    category: 'juridique_admin',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Inventaire des produits chimiques : risques, FDS disponibles, conditions stockage et EPI requis',
    price: 800, priceMax: 1300, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'date_inventaire', label: 'Date d\'inventaire', type: 'date', required: true },
      { name: 'responsable', label: 'Responsable', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Inventaire Chimiques',
          title: 'Inventaire des Produits Chimiques',
          colorHeader: 'FF6F00',
          headers: ['N°', 'Désignation produit', 'Fournisseur', 'N° CAS', 'Mentions danger', 'Pictogrammes', 'Quantité stock (L/kg)', 'Zone stockage', 'Température stockage', 'FDS disponible', 'FDS à jour', 'EPI manipulation', 'Incompatibilités', 'Substitution possible'],
          rows: [
            [1, 'Acide sulfurique 96%', 'CHIMIE DIST', '7664-93-9', 'H314, H290', 'Corrosif, Danger environnement', '50 L', 'Local chimique A', '15-25°C', 'Oui', 'Oui (2024)', 'Combinaison, gants nitrile, visière', 'Bases, métaux', 'Non'],
            [2, 'Soude caustique 30%', 'ALKALABS', '1310-73-2', 'H314', 'Corrosif', '100 L', 'Local chimique A', '10-30°C', 'Oui', 'Oui (2024)', 'Tablier PVC, gants caoutchouc', 'Acides', 'Non'],
            [3, 'Acétone', 'SOLVANTS CI', '67-64-1', 'H225, H319, H336', 'Inflammable, Nocif', '30 L', 'Local inflammables', '< 25°C', 'Oui', 'Oui (2023)', 'Gants nitrile, masque vapeurs org.', 'Oxydants, acides', 'Oui (eau+savon)'],
            [4, 'Trichloréthylène', 'CHLOROSOL', '79-01-6', 'H341, H350, H372', 'CMR, Nocif', '20 L', 'Armoire ventilée', '15-25°C', 'Oui', 'Non (2021)', 'Combinaison, gants butyl, masque P3', 'Alcalins forts', 'En évaluation'],
            [5, 'Diluant peinture', 'PEINTURES AFRICA', 'Mélange', 'H226, H304', 'Inflammable, Danger aspiration', '60 L', 'Local inflammables', '< 30°C', 'Oui', 'Oui (2024)', 'Gants nitrile, masque vapeurs', 'Oxydants', 'Non'],
            [6, 'Alcool isopropylique 70%', 'LABOCHEM', '67-63-0', 'H225, H319', 'Inflammable, Irritant', '25 L', 'Laboratoire', '15-25°C', 'Oui', 'Oui (2024)', 'Gants nitrile', 'Oxydants', 'Non'],
            [7, 'Ammoniaque 28%', 'AMMONIX', '1336-21-6', 'H290, H314, H335', 'Corrosif, Toxique inhal.', '15 L', 'Local chimique B', '15-25°C', 'Oui', 'Oui (2024)', 'Masque P3+A, combinaison', 'Acides, halogènes', 'Non'],
            [8, 'Huile hydraulique', 'PETROCI', 'Mélange', 'H304, H411', 'Danger aspiration', '200 L', 'Local huiles', 'Ambiante', 'Oui', 'Oui (2023)', 'Gants nitrile', 'Oxydants forts', 'Non'],
            [9, 'Peinture époxy bicomposante', 'CORROPROTECT', 'Mélange', 'H225, H317, H373', 'Inflammable, Sensibilisant', '40 kg', 'Local peintures', '5-30°C', 'Oui', 'Oui (2024)', 'Combinaison, masque vapeurs', 'Humidité', 'Non'],
            [10, 'Antigel / liquide refroidissement', 'FROID-PLUS', '107-21-1', 'H302, H373', 'Nocif', '25 L', 'Garage', 'Ambiante', 'Oui', 'Oui (2023)', 'Gants nitrile', 'Oxydants', 'Non'],
          ],
          totalsRow: false,
          colWidths: [6, 26, 16, 14, 20, 24, 18, 18, 18, 14, 14, 28, 20, 18],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 65,
  },

  // 14. xl_qhse_incendie — Contrôle extincteurs
  {
    code: 'xl_qhse_incendie',
    name: 'Contrôle extincteurs',
    category: 'juridique_admin',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Registre de contrôle des extincteurs : emplacements, types, dates de contrôle et état',
    price: 600, priceMax: 1100, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_site', label: 'Nom du site', type: 'text', required: true },
      { name: 'responsable_securite', label: 'Responsable sécurité incendie', type: 'text', required: true },
      { name: 'annee', label: 'Année', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Contrôle Extincteurs',
          title: 'Registre de Contrôle des Extincteurs',
          colorHeader: 'FF6F00',
          headers: ['N° extincteur', 'Emplacement', 'Bâtiment/Zone', 'Type', 'Capacité', 'N° série', 'Dernier contrôle', 'Prestataire contrôle', 'Prochain contrôle', 'Pression OK', 'Goupille OK', 'État général', 'Accessibilité', 'Observations/Actions'],
          rows: [
            ['EXT-001', 'Couloir RDC', 'Bâtiment Admin', 'CO2', '5 kg', 'CO2-2019-001', '15/01/2025', 'FIRE-PROTECT CI', '15/01/2026', 'Oui', 'Oui', 'Bon', 'Oui', ''],
            ['EXT-002', 'Cuisine', 'Bâtiment Admin', 'Poudre ABC', '6 kg', 'ABC-2018-002', '15/01/2025', 'FIRE-PROTECT CI', '15/01/2026', 'Oui', 'Oui', 'Bon', 'Oui', ''],
            ['EXT-003', 'Atelier mécanique', 'Atelier', 'CO2', '5 kg', 'CO2-2020-003', '15/01/2025', 'FIRE-PROTECT CI', '15/01/2026', 'Non', 'Oui', 'Recharge', 'Oui', 'Recharge urgente planifiée'],
            ['EXT-004', 'Local électrique', 'Atelier', 'CO2', '9 kg', 'CO2-2019-004', '15/01/2025', 'FIRE-PROTECT CI', '15/01/2026', 'Oui', 'Oui', 'Bon', 'Oui', ''],
            ['EXT-005', 'Entrepôt zone A', 'Entrepôt', 'Poudre ABC', '12 kg', 'ABC-2020-005', '15/01/2025', 'FIRE-PROTECT CI', '15/01/2026', 'Oui', 'Non', 'Bon', 'Non', 'Goupille à remplacer, accès obstrué'],
            ['EXT-006', 'Entrepôt zone B', 'Entrepôt', 'Poudre ABC', '12 kg', 'ABC-2021-006', '15/01/2025', 'FIRE-PROTECT CI', '15/01/2026', 'Oui', 'Oui', 'Bon', 'Oui', ''],
            ['EXT-007', 'Local chimique', 'Bâtiment produits', 'Poudre BC', '6 kg', 'BC-2022-007', '15/01/2025', 'FIRE-PROTECT CI', '15/01/2026', 'Oui', 'Oui', 'Bon', 'Oui', ''],
            ['EXT-008', 'Parking véhicules', 'Extérieur', 'Poudre ABC', '6 kg', 'ABC-2019-008', '15/01/2025', 'FIRE-PROTECT CI', '15/01/2026', 'Oui', 'Oui', 'Corrodé', 'Oui', 'Remplacement prévu T2 2025'],
            ['EXT-009', 'Salle serveurs', 'Bâtiment Admin', 'CO2', '5 kg', 'CO2-2022-009', '15/01/2025', 'FIRE-PROTECT CI', '15/01/2026', 'Oui', 'Oui', 'Bon', 'Oui', ''],
            ['EXT-010', 'Laboratoire', 'Bâtiment labo', 'CO2', '5 kg', 'CO2-2023-010', '15/01/2025', 'FIRE-PROTECT CI', '15/01/2026', 'Oui', 'Oui', 'Neuf', 'Oui', ''],
          ],
          totalsRow: false,
          colWidths: [14, 20, 18, 14, 12, 16, 16, 20, 16, 12, 12, 14, 14, 28],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 63,
  },

  // 15. xl_qhse_permis_feu — Registre permis de feu
  {
    code: 'xl_qhse_permis_feu',
    name: 'Registre permis de feu',
    category: 'juridique_admin',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Suivi des permis de feu délivrés : date, lieu des travaux, responsable, durée et clôture',
    price: 600, priceMax: 1100, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_site', label: 'Nom du site', type: 'text', required: true },
      { name: 'annee', label: 'Année', type: 'text', required: true },
      { name: 'responsable_hse', label: 'Responsable HSE', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Permis de Feu',
          title: 'Registre des Permis de Feu',
          colorHeader: 'FF6F00',
          headers: ['N° permis', 'Date', 'Lieu précis', 'Nature travaux', 'Entreprise', 'Responsable travaux', 'Durée prévue (h)', 'Heure début', 'Heure fin', 'Mesures protection', 'Extincteur présent', 'Ronde surveillance', 'Clôture permis', 'Signature HSE'],
          rows: [
            ['PF-2025-001', '08/01/2025', 'Atelier mécanique - poste 3', 'Soudure réparation bâti', 'SOUDURE EXPERT', 'Koné Aboubakar', 4, '08:00', '12:00', 'Dégagement zone 5m, écrans ignifuges', 'Oui (CO2 5kg)', 'Toutes les 30 min', 'Oui', 'OK'],
            ['PF-2025-002', '15/01/2025', 'Toiture bâtiment B', 'Découpe tôles étanchéité', 'TOITURES AFRICA', 'Traoré Seydou', 6, '07:30', '13:30', 'Bâchage, guetteur incendie', 'Oui (ABC 6kg)', 'Toutes les 30 min', 'Oui', 'OK'],
            ['PF-2025-003', '22/01/2025', 'Local technique sous-sol', 'Soudure tuyauterie vapeur', 'PLUMB-CI', 'Diallo Mamadou', 3, '09:00', '12:00', 'Ventilation forcée, évacuation zone', 'Oui (CO2 5kg)', 'Continu', 'Oui', 'OK'],
            ['PF-2025-004', '05/02/2025', 'Zone stockage hydrocarbures', 'Soudure canalisation', 'PETRO-WORKS', 'Coulibaly Issiaka', 2, '06:00', '08:00', 'Analyse atmosphère, consignation', 'Oui (ABC 12kg)', 'Continu + rondier', 'Oui', 'OK'],
            ['PF-2025-005', '12/02/2025', 'Atelier chaudronnerie', 'Découpe plasma acier', 'METAL-PRO', 'Bamba Fanta', 8, '08:00', '16:00', 'Écrans de soudure, aspiration fumées', 'Oui (CO2 5kg)', 'Toutes les 30 min', 'Oui', 'OK'],
            ['PF-2025-006', '19/02/2025', 'Parking couvert niveau 2', 'Soudure structure métallique', 'STRUCT-BATI', 'Yao Kouamé', 5, '07:00', '12:00', 'Dépose véhicules zone, bâchage', 'Oui (ABC 6kg)', 'Toutes les 30 min', 'Oui', 'OK'],
            ['PF-2025-007', '26/02/2025', 'Chaufferie centrale', 'Soudure raccord gaz', 'GAZ-EXPERT', 'Ouédraogo Issa', 2, '10:00', '12:00', 'Coupure gaz, analyse atmosphère', 'Oui (CO2 9kg)', 'Continu', 'Oui', 'OK'],
            ['PF-2025-008', '05/03/2025', 'Entrepôt cartons zone C', 'Soudure pied rayon', 'STRUCT-BATI', 'Mensah Koffi', 1, '14:00', '15:00', 'Dégagement zone, arrosage', 'Oui (ABC 6kg)', 'Continu', 'Oui', 'OK'],
            ['PF-2025-009', '12/03/2025', 'Toit terrasse bâtiment A', 'Torche bitume étanchéité', 'ETANCH-CI', 'Sawadogo Paul', 7, '07:30', '14:30', 'Sablage zone, bâchage matériaux', 'Oui (ABC 12kg)', 'Toutes les 30 min', 'Oui', 'OK'],
            ['PF-2025-010', '19/03/2025', 'Couloir technique réseau', 'Soudure fourreaux électriques', 'ELEC-PRO CI', 'Aké Serge', 3, '08:00', '11:00', 'Consignation, zone dégagée', 'Oui (CO2 5kg)', 'Toutes les 30 min', 'Oui', 'OK'],
          ],
          totalsRow: false,
          colWidths: [14, 12, 28, 24, 18, 20, 14, 12, 12, 28, 16, 20, 14, 14],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 61,
  },

  // 16. xl_qhse_arrets_travail — Analyse arrêts de travail
  {
    code: 'xl_qhse_arrets_travail',
    name: 'Analyse arrêts de travail',
    category: 'juridique_admin',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Suivi et analyse des arrêts de travail : agents, motifs, durée, coût estimé et récurrence',
    price: 700, priceMax: 1200, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'annee', label: 'Année', type: 'text', required: true },
      { name: 'responsable_rh', label: 'Responsable RH', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Arrêts de Travail',
          title: 'Analyse des Arrêts de Travail',
          colorHeader: 'FF6F00',
          headers: ['N°', 'Agent', 'Service', 'Poste', 'Motif arrêt', 'Date début', 'Date fin', 'Durée (j)', 'Coût journée (FCFA)', 'Coût total (FCFA)', 'Rechute/Récurrence', 'Actions RH/HSE', 'Reprise aménagée'],
          rows: [
            [1, 'Koné Aboubakar', 'Atelier', 'Soudeur', 'Accident travail - brûlure', '06/01/2025', '17/01/2025', 12, 25000, '=H{r}*I{r}', 'Non', 'Visite reprise médecin travail', 'Oui (poste allégé)'],
            [2, 'Traoré Seydou', 'Maintenance', 'Électricien', 'Maladie ordinaire - paludisme', '14/01/2025', '20/01/2025', 7, 30000, '=H{r}*I{r}', 'Non', 'Suivi santé préventif', 'Non'],
            [3, 'Diallo Mamadou', 'Logistique', 'Manutentionnaire', 'AT - lombalgie manutention', '28/01/2025', '25/02/2025', 29, 18000, '=H{r}*I{r}', 'Oui (3e fois)', 'Formation gestes postures, AT', 'Oui (port charge réduit)'],
            [4, 'Coulibaly Issiaka', 'Production', 'Opérateur', 'Maladie - fièvre typhoïde', '05/02/2025', '14/02/2025', 10, 20000, '=H{r}*I{r}', 'Non', 'Amélioration eau potable site', 'Non'],
            [5, 'Bamba Fanta', 'Chantier', 'Couvreur', 'AT - entorse cheville chute', '19/02/2025', '14/03/2025', 24, 22000, '=H{r}*I{r}', 'Non', 'Visite reprise, AT déclaré CNPS', 'Oui (sol plat uniquement)'],
            [6, 'Yao Kouamé', 'Atelier', 'Mécanicien', 'Maladie profess. - surdité', '03/03/2025', '28/03/2025', 26, 23000, '=H{r}*I{r}', 'Oui (MP reconnue)', 'Mutation poste calme + EPI', 'Oui (zone bruit faible)'],
            [7, 'Ouédraogo Issa', 'Labo', 'Technicien chimiste', 'AT - irritation respiratoire', '17/03/2025', '24/03/2025', 8, 28000, '=H{r}*I{r}', 'Non', 'AT déclaré, amélioration ventilation', 'Non'],
            [8, 'Mensah Koffi', 'Entrepôt', 'Magasinier', 'Maladie ordinaire - paludisme', '01/04/2025', '07/04/2025', 7, 20000, '=H{r}*I{r}', 'Non', 'Sensibilisation prévention paludisme', 'Non'],
            [9, 'Sawadogo Paul', 'Transport', 'Chauffeur', 'AT - accident de route', '14/04/2025', '30/05/2025', 47, 22000, '=H{r}*I{r}', 'Non', 'Enquête accident, formation sécu routière', 'Oui (poste bureau temp.)'],
            [10, 'Aké Serge', 'Bureau', 'Ingénieur', 'Maladie - burn-out RPS', '28/04/2025', '09/05/2025', 12, 45000, '=H{r}*I{r}', 'Non', 'Accompagnement psychologue', 'Oui (temps partiel)'],
          ],
          totalsRow: true,
          colWidths: [6, 20, 16, 18, 28, 14, 14, 12, 18, 16, 20, 32, 18],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 67,
  },

  // 17. xl_qhse_veille_reglementaire — Veille réglementaire HSE
  {
    code: 'xl_qhse_veille_reglementaire',
    name: 'Veille réglementaire HSE',
    category: 'juridique_admin',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Suivi des textes réglementaires HSE applicables : exigences, conformité, actions et délais',
    price: 900, priceMax: 1400, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'pays', label: 'Pays d\'application', type: 'text', required: true },
      { name: 'responsable_veille', label: 'Responsable veille réglementaire', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Veille Réglementaire',
          title: 'Veille Réglementaire HSE',
          colorHeader: 'FF6F00',
          headers: ['N°', 'Référence texte', 'Domaine', 'Intitulé texte', 'Date publication', 'Exigences applicables', 'Conformité', 'Écart constaté', 'Actions requises', 'Responsable', 'Délai', 'Statut veille'],
          rows: [
            [1, 'Code du Travail CI Art. 41', 'Sécurité travail', 'Médecine du travail obligatoire', '01/01/2015', 'Visite médicale annuelle tout salarié', 'Partielle', '3 agents non vus en 2024', 'Planifier visites manquantes T2 2025', 'DRH', '30/06/2025', 'Actif'],
            [2, 'Décret 2017-672 CI', 'EPI', 'Fourniture EPI obligatoire employeur', '10/08/2017', 'EPI gratuits adaptés risques, traçabilité', 'Conforme', 'Aucun', 'Maintenir registre EPI', 'Responsable HSE', 'Continu', 'Actif'],
            [3, 'Arrêté 2019-014 MSHP CI', 'Déchets dangereux', 'Gestion déchets industriels dangereux', '15/03/2019', 'Prestataire agréé, registre déchets', 'Conforme', 'Aucun', 'Renouveler contrats prestataires', 'Responsable HSE', '01/07/2025', 'Actif'],
            [4, 'Décret 96-206 CI', 'Risque chimique', 'Utilisation produits dangereux', '07/03/1996', 'FDS disponibles, formation travailleurs', 'Partielle', 'FDS trichloréthylène obsolète', 'Obtenir FDS à jour fournisseur', 'Responsable labo', '30/05/2025', 'Actif'],
            [5, 'Loi 96-766 CI', 'Environnement', 'Code de l\'environnement', '03/10/1996', 'Déclaration installations classées', 'Conforme', 'Aucun', 'Renouvellement autorisation 2026', 'Direction', '01/01/2026', 'Actif'],
            [6, 'Convention OIT n°155', 'Sécurité générale', 'Sécurité et santé au travail', '03/06/1981', 'DUER, comité HSE, affichage', 'Partielle', 'Comité HSE non mis en place', 'Constituer comité paritaire HSE', 'DG', '30/09/2025', 'Actif'],
            [7, 'ISO 45001:2018', 'SMS', 'Système management SST', '12/03/2018', 'Identification risques, programme SST', 'Partielle', 'Certification non obtenue', 'Plan certification ISO 45001', 'Responsable qualité', '31/12/2026', 'Actif'],
            [8, 'Décret 2005-03 CI', 'Incendie', 'Prévention incendie ERP/entreprises', '06/01/2005', 'Exercice évacuation annuel, SSIAP', 'Conforme', 'Aucun', 'Planifier exercice S2 2025', 'Responsable HSE', '01/10/2025', 'Actif'],
            [9, 'Arrêté 2012-098 CI', 'Bruit', 'Exposition professionnelle au bruit', '25/04/2012', 'Mesurage périodique, VLE 87 dB', 'Partielle', '2 postes dépassent VLE', 'Plan réduction bruit à source', 'Chef atelier', '30/06/2025', 'Actif'],
            [10, 'Décret 2002-359 CI', 'ATEX', 'Atmosphères explosives', '03/07/2002', 'DRPE, formation, matériel ATEX', 'Conforme', 'Aucun', 'Vérification annuelle installations ATEX', 'Responsable maintenance', '01/09/2025', 'Actif'],
          ],
          totalsRow: false,
          colWidths: [6, 22, 18, 36, 16, 34, 14, 26, 32, 18, 14, 14],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 63,
  },

  // 18. xl_qhse_exercices — Suivi exercices évacuation
  {
    code: 'xl_qhse_exercices',
    name: 'Suivi exercices évacuation',
    category: 'juridique_admin',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Registre des exercices d\'évacuation : dates, durée, nombre de participants, observations et améliorations',
    price: 600, priceMax: 1100, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_site', label: 'Nom du site', type: 'text', required: true },
      { name: 'responsable_evacuation', label: 'Responsable évacuation', type: 'text', required: true },
      { name: 'annee', label: 'Année', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Exercices Évacuation',
          title: 'Suivi des Exercices d\'Évacuation',
          colorHeader: 'FF6F00',
          headers: ['N°', 'Date', 'Heure déclenchement', 'Type exercice', 'Bâtiment(s)', 'Nb personnes présentes', 'Nb évacués', 'Taux évacuation %', 'Durée évacuation (min)', 'Objectif (min)', 'Conforme délai', 'Trappés/Manquants', 'Observations', 'Améliorations décidées', 'Prochain exercice prévu'],
          rows: [
            [1, '20/03/2025', '10h15', 'Évacuation totale incendie', 'Tous bâtiments', 87, 85, '=G{r}/F{r}*100', 4.5, 5, 'Oui', 2, '2 agents en réunion externe. Sirène entendue dans tous les locaux.', 'Procédure visiteurs à améliorer', '20/09/2025'],
            [2, '15/09/2024', '14h30', 'Évacuation totale incendie', 'Tous bâtiments', 92, 90, '=G{r}/F{r}*100', 5.2, 5, 'Non', 2, 'Porte secours bloc B bloquée. Délai légèrement dépassé.', 'Vérification mensuelle portes secours', '20/03/2025'],
            [3, '12/03/2024', '09h00', 'Évacuation partielle - simulation', 'Bâtiment Admin', 45, 45, '=G{r}/F{r}*100', 3.1, 4, 'Oui', 0, 'Exercice non annoncé. Très bon résultat. Escalier B utilisé efficacement.', 'Formation guide-file nouveaux arrivants', '15/09/2024'],
            [4, '10/09/2023', '11h00', 'Évacuation totale + point rassemblement', 'Tous bâtiments', 78, 76, '=G{r}/F{r}*100', 6.8, 5, 'Non', 2, 'Ascenseur utilisé par 1 personne (interdit). Confusion au point rassemblement.', 'Marquage clair point rassemblement, rappel consignes', '12/03/2024'],
            [5, '15/03/2023', '10h00', 'Évacuation incendie + premiers secours', 'Tous bâtiments', 95, 94, '=G{r}/F{r}*100', 4.2, 5, 'Oui', 1, 'Agent PMR bien pris en charge. SST intervenus rapidement.', 'Intégrer davantage SST dans exercice', '10/09/2023'],
            [6, '12/09/2022', '15h00', 'Évacuation totale', 'Tous bâtiments', 82, 80, '=G{r}/F{r}*100', 7.3, 5, 'Non', 2, 'Sirène non entendue côté entrepôt. Personnel entrepôt averti manuellement.', 'Extension réseau alarme entrepôt', '15/03/2023'],
            [7, '10/03/2022', '08h30', 'Exercice partiel - aile production', 'Bâtiment production', 40, 40, '=G{r}/F{r}*100', 3.8, 4, 'Oui', 0, 'Premier exercice bâtiment production. Bon déroulement global.', 'Affichage consignes évacuation postes de travail', '12/09/2022'],
            [8, '08/09/2021', '10h30', 'Évacuation totale incendie', 'Tous bâtiments', 70, 68, '=G{r}/F{r}*100', 5.5, 5, 'Non', 2, 'Exercice post-COVID. Agents peu habitués. Distancing respecté.', 'Plan évacuation version COVID archivé', '10/03/2022'],
          ],
          totalsRow: false,
          colWidths: [6, 14, 18, 26, 22, 18, 14, 18, 20, 16, 14, 18, 36, 32, 22],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 60,
  },

  // 19. xl_qhse_fournisseurs_hse — Évaluation fournisseurs HSE
  {
    code: 'xl_qhse_fournisseurs_hse',
    name: 'Évaluation fournisseurs HSE',
    category: 'juridique_admin',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Grille d\'évaluation HSE des fournisseurs et sous-traitants : critères, notes, résultat et qualification',
    price: 800, priceMax: 1300, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Entreprise donneur d\'ordres', type: 'text', required: true },
      { name: 'annee', label: 'Année d\'évaluation', type: 'text', required: true },
      { name: 'evaluateur', label: 'Évaluateur HSE', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Évaluation Fournisseurs HSE',
          title: 'Grille d\'Évaluation HSE des Fournisseurs',
          colorHeader: 'FF6F00',
          headers: ['N°', 'Fournisseur', 'Activité', 'Politique HSE écrite (/20)', 'Plan prévention (/20)', 'Formation personnel (/20)', 'EPI fournis (/20)', 'Accidents déclarés (/20)', 'Note totale (/100)', 'Résultat %', 'Qualification HSE', 'Observations', 'Prochaine éval.'],
          rows: [
            [1, 'SOUDURE EXPERT', 'Travaux soudure', 16, 18, 15, 17, 18, '=SUM(D{r}:H{r})', '=IFERROR(I{r}/100*100,0)', '=IF(J{r}>=80,"QUALIFIÉ",IF(J{r}>=60,"CONDITIONNEL","ÉLIMINÉ"))', 'Très bon prestataire. Quelques lacunes formation.', '01/2026'],
            [2, 'TOITURES AFRICA', 'Travaux toiture', 14, 16, 12, 15, 16, '=SUM(D{r}:H{r})', '=IFERROR(I{r}/100*100,0)', '=IF(J{r}>=80,"QUALIFIÉ",IF(J{r}>=60,"CONDITIONNEL","ÉLIMINÉ"))', 'Bonne maturité HSE. Formation à renforcer.', '01/2026'],
            [3, 'ELEC-PRO CI', 'Travaux électriques', 18, 19, 18, 18, 20, '=SUM(D{r}:H{r})', '=IFERROR(I{r}/100*100,0)', '=IF(J{r}>=80,"QUALIFIÉ",IF(J{r}>=60,"CONDITIONNEL","ÉLIMINÉ"))', 'Excellent niveau HSE. Référence secteur.', '01/2026'],
            [4, 'CHIMIE PROPRE', 'Nettoyage industriel', 12, 13, 11, 14, 15, '=SUM(D{r}:H{r})', '=IFERROR(I{r}/100*100,0)', '=IF(J{r}>=80,"QUALIFIÉ",IF(J{r}>=60,"CONDITIONNEL","ÉLIMINÉ"))', 'Niveau moyen. Plan amélioration exigé.', '07/2025'],
            [5, 'CONSTRUCT+', 'Démolition/Construction', 10, 11, 9, 12, 14, '=SUM(D{r}:H{r})', '=IFERROR(I{r}/100*100,0)', '=IF(J{r}>=80,"QUALIFIÉ",IF(J{r}>=60,"CONDITIONNEL","ÉLIMINÉ"))', 'Niveau insuffisant. Action corrective requise.', '04/2025'],
            [6, 'ENGINS LOURD', 'Location engins TP', 15, 16, 14, 16, 18, '=SUM(D{r}:H{r})', '=IFERROR(I{r}/100*100,0)', '=IF(J{r}>=80,"QUALIFIÉ",IF(J{r}>=60,"CONDITIONNEL","ÉLIMINÉ"))', 'Bon prestataire. Engins bien entretenus.', '01/2026'],
            [7, 'CLIM EXPERT', 'Installation CVC', 16, 17, 16, 17, 19, '=SUM(D{r}:H{r})', '=IFERROR(I{r}/100*100,0)', '=IF(J{r}>=80,"QUALIFIÉ",IF(J{r}>=60,"CONDITIONNEL","ÉLIMINÉ"))', 'Très bonne gestion HSE. Zéro accident 3 ans.', '01/2026'],
            [8, 'ECO-COLLECT', 'Collecte déchets', 17, 15, 16, 14, 18, '=SUM(D{r}:H{r})', '=IFERROR(I{r}/100*100,0)', '=IF(J{r}>=80,"QUALIFIÉ",IF(J{r}>=60,"CONDITIONNEL","ÉLIMINÉ"))', 'Agréé ministère. Traçabilité bonne.', '01/2026'],
            [9, 'PEINTURE PRO', 'Peinture anticorrosion', 11, 12, 10, 13, 16, '=SUM(D{r}:H{r})', '=IFERROR(I{r}/100*100,0)', '=IF(J{r}>=80,"QUALIFIÉ",IF(J{r}>=60,"CONDITIONNEL","ÉLIMINÉ"))', 'Déficit formation risque chimique. Plan requis.', '07/2025'],
            [10, 'GAZ-EXPERT', 'Travaux gaz', 19, 20, 18, 19, 20, '=SUM(D{r}:H{r})', '=IFERROR(I{r}/100*100,0)', '=IF(J{r}>=80,"QUALIFIÉ",IF(J{r}>=60,"CONDITIONNEL","ÉLIMINÉ"))', 'Excellente maîtrise risques gaz. Certifié.', '01/2026'],
          ],
          totalsRow: false,
          colWidths: [6, 20, 24, 18, 18, 18, 14, 18, 16, 14, 14, 32, 14],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 64,
  },

  // 20. xl_qhse_objectifs — Objectifs QHSE annuels
  {
    code: 'xl_qhse_objectifs',
    name: 'Objectifs QHSE annuels',
    category: 'juridique_admin',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Tableau de suivi des objectifs QHSE : indicateurs de mesure, cibles, réalisé et taux d\'atteinte',
    price: 800, priceMax: 1300, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'annee', label: 'Année', type: 'text', required: true },
      { name: 'directeur_qhse', label: 'Directeur QHSE', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Objectifs QHSE',
          title: 'Objectifs QHSE Annuels',
          colorHeader: 'FF6F00',
          headers: ['N°', 'Axe QHSE', 'Objectif', 'Indicateur de mesure', 'Unité', 'Baseline N-1', 'Cible N', 'T1', 'T2', 'T3', 'T4', 'Réalisé annuel', 'Taux atteinte %', 'Statut'],
          rows: [
            [1, 'Sécurité', 'Réduire accidents avec arrêt', 'Taux de fréquence', 'Nb/Mh', 6.8, '< 5', 4.2, 3.8, 5.1, 0, '=IFERROR(SUM(H{r}:K{r})/COUNTA(H{r}:K{r}),0)', '=IFERROR((F{r}-L{r})/F{r}*100,0)', '=IF(L{r}<G{r},"Atteint","En cours")'],
            [2, 'Sécurité', 'Réduire la gravité accidents', 'Taux de gravité', 'Jours/Mh', 0.42, '< 0.3', 0.18, 0.22, 0.31, 0, '=IFERROR(SUM(H{r}:K{r})/COUNTA(H{r}:K{r}),0)', '=IFERROR((F{r}-L{r})/F{r}*100,0)', '=IF(L{r}<G{r},"Atteint","En cours")'],
            [3, 'Santé', 'Améliorer couverture visites médicales', 'Taux visites médicales', '%', 78, '> 95', 82, 88, 91, 0, '=IFERROR(SUM(H{r}:K{r})/COUNTA(H{r}:K{r}),0)', '=IFERROR(L{r}/G{r}*100,0)', '=IF(L{r}>=G{r},"Atteint","En cours")'],
            [4, 'Sécurité', 'Augmenter remontées presque-accidents', 'Nb presque-accidents déclarés', 'Nb', 8, '> 20', 5, 7, 4, 0, '=SUM(H{r}:K{r})', '=IFERROR(L{r}/G{r}*100,0)', '=IF(L{r}>=G{r},"Atteint","En cours")'],
            [5, 'Formation', 'Former tout le personnel sécurité', 'Taux formation sécurité', '%', 65, '> 90', 72, 80, 85, 0, '=IFERROR(SUM(H{r}:K{r})/COUNTA(H{r}:K{r}),0)', '=IFERROR(L{r}/G{r}*100,0)', '=IF(L{r}>=G{r},"Atteint","En cours")'],
            [6, 'Qualité', 'Réduire NC majeures', 'Nb NC majeures ouvertes', 'Nb', 12, '< 5', 8, 6, 4, 0, '=G{r}', '=IFERROR((F{r}-L{r})/F{r}*100,0)', '=IF(L{r}<=G{r},"Atteint","En cours")'],
            [7, 'Qualité', 'Améliorer taux clôture NC', 'Taux clôture NC', '%', 62, '> 85', 68, 75, 82, 0, '=IFERROR(SUM(H{r}:K{r})/COUNTA(H{r}:K{r}),0)', '=IFERROR(L{r}/G{r}*100,0)', '=IF(L{r}>=G{r},"Atteint","En cours")'],
            [8, 'Audits', 'Réaliser programme audits internes', 'Nb audits réalisés / prévus', 'Nb', 6, 10, 3, 4, 3, 0, '=SUM(H{r}:K{r})', '=IFERROR(L{r}/G{r}*100,0)', '=IF(L{r}>=G{r},"Atteint","En cours")'],
            [9, 'Environnement', 'Réduire déchets dangereux', 'Tonnage DID produit', 'kg', 850, '< 600', 210, 195, 180, 0, '=SUM(H{r}:K{r})', '=IFERROR((F{r}-L{r})/F{r}*100,0)', '=IF(L{r}<G{r},"Atteint","En cours")'],
            [10, 'Certification', 'Obtenir certification ISO 45001', 'Avancement plan certif.', '%', 0, 100, 25, 50, 65, 0, '=K{r}', '=IFERROR(L{r}/G{r}*100,0)', '=IF(L{r}>=G{r},"Atteint","En cours")'],
          ],
          totalsRow: false,
          colWidths: [6, 16, 36, 30, 10, 14, 12, 10, 10, 10, 10, 16, 16, 14],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 74,
  },
];

async function main() {
  let created = 0;
  for (const t of templates) {
    await prisma.documentTemplate.upsert({
      where: { code: t.code },
      update: t,
      create: t,
    });
    created++;
  }
  const total = await prisma.documentTemplate.count();
  console.log(`✅ Excel QHSE: ${created} créés — Total BDD: ${total}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
