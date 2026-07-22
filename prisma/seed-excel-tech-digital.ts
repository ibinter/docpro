import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const COUNTRIES = JSON.stringify(['CI','SN','CM','BJ','TG','BF','ML','GN','CD','CG','GA','NE','TD','MR']);

const templates = [
  // 1. xl_tec_projet_it — Suivi projet informatique
  {
    code: 'xl_tec_projet_it',
    name: 'Suivi projet informatique',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Suivi des tâches, responsables, planning et avancement d\'un projet IT',
    price: 800, priceMax: 1300, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_projet', label: 'Nom du projet', type: 'text', required: true },
      { name: 'chef_projet', label: 'Chef de projet', type: 'text', required: true },
      { name: 'date_debut', label: 'Date de début', type: 'date', required: true },
      { name: 'date_fin', label: 'Date de fin prévue', type: 'date', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Suivi Projet IT',
          title: 'Suivi Projet Informatique',
          colorHeader: '0D47A1',
          headers: ['Tâche', 'Responsable', 'Date début', 'Date fin', 'Avancement %', 'Statut', 'Commentaire'],
          rows: [
            ['Analyse des besoins', '', '', '', 0, '=IF(F{r}=100,"Terminé",IF(F{r}>0,"En cours","Non démarré"))', ''],
            ['Rédaction cahier des charges', '', '', '', 0, '=IF(E{r}=100,"Terminé",IF(E{r}>0,"En cours","Non démarré"))', ''],
            ['Conception architecture', '', '', '', 0, '=IF(E{r}=100,"Terminé",IF(E{r}>0,"En cours","Non démarré"))', ''],
            ['Développement', '', '', '', 0, '=IF(E{r}=100,"Terminé",IF(E{r}>0,"En cours","Non démarré"))', ''],
            ['Tests unitaires', '', '', '', 0, '=IF(E{r}=100,"Terminé",IF(E{r}>0,"En cours","Non démarré"))', ''],
            ['Recette fonctionnelle', '', '', '', 0, '=IF(E{r}=100,"Terminé",IF(E{r}>0,"En cours","Non démarré"))', ''],
            ['Formation utilisateurs', '', '', '', 0, '=IF(E{r}=100,"Terminé",IF(E{r}>0,"En cours","Non démarré"))', ''],
            ['Mise en production', '', '', '', 0, '=IF(E{r}=100,"Terminé",IF(E{r}>0,"En cours","Non démarré"))', ''],
            ['Suivi post-déploiement', '', '', '', 0, '=IF(E{r}=100,"Terminé",IF(E{r}>0,"En cours","Non démarré"))', ''],
            ['Clôture projet', '', '', '', 0, '=IF(E{r}=100,"Terminé",IF(E{r}>0,"En cours","Non démarré"))', ''],
          ],
          totalsRow: false,
          colWidths: [30, 20, 14, 14, 16, 14, 25],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 72,
  },

  // 2. xl_tec_budget_it — Budget DSI annuel
  {
    code: 'xl_tec_budget_it',
    name: 'Budget DSI annuel',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Planification budgétaire annuelle de la Direction des Systèmes d\'Information',
    price: 1000, priceMax: 1500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'annee', label: 'Année budgétaire', type: 'text', required: true },
      { name: 'dsi', label: 'Directeur DSI', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Budget DSI',
          title: 'Budget DSI Annuel',
          colorHeader: '0D47A1',
          headers: ['Poste budgétaire', 'Budgété (FCFA)', 'Réalisé (FCFA)', 'Écart', 'Écart %', 'Commentaire'],
          rows: [
            ['Licences logicielles', 0, 0, '=B{r}-C{r}', '=IFERROR((B{r}-C{r})/B{r}*100,0)', ''],
            ['Matériel informatique', 0, 0, '=B{r}-C{r}', '=IFERROR((B{r}-C{r})/B{r}*100,0)', ''],
            ['Infrastructure cloud', 0, 0, '=B{r}-C{r}', '=IFERROR((B{r}-C{r})/B{r}*100,0)', ''],
            ['Maintenance & support', 0, 0, '=B{r}-C{r}', '=IFERROR((B{r}-C{r})/B{r}*100,0)', ''],
            ['Personnel IT', 0, 0, '=B{r}-C{r}', '=IFERROR((B{r}-C{r})/B{r}*100,0)', ''],
            ['Cybersécurité', 0, 0, '=B{r}-C{r}', '=IFERROR((B{r}-C{r})/B{r}*100,0)', ''],
            ['Formation & certifications', 0, 0, '=B{r}-C{r}', '=IFERROR((B{r}-C{r})/B{r}*100,0)', ''],
            ['Projets de développement', 0, 0, '=B{r}-C{r}', '=IFERROR((B{r}-C{r})/B{r}*100,0)', ''],
            ['Télécommunications', 0, 0, '=B{r}-C{r}', '=IFERROR((B{r}-C{r})/B{r}*100,0)', ''],
            ['Divers IT', 0, 0, '=B{r}-C{r}', '=IFERROR((B{r}-C{r})/B{r}*100,0)', ''],
            ['TOTAL DSI', '=SUM(B2:B11)', '=SUM(C2:C11)', '=B{r}-C{r}', '=IFERROR((B{r}-C{r})/B{r}*100,0)', ''],
          ],
          totalsRow: false,
          colWidths: [28, 18, 18, 16, 12, 25],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 68,
  },

  // 3. xl_tec_incidents — Registre incidents informatiques
  {
    code: 'xl_tec_incidents',
    name: 'Registre incidents informatiques',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Suivi des tickets d\'incidents : criticité, description, résolution et respect des SLA',
    price: 700, priceMax: 1200, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'periode', label: 'Période', type: 'text', required: true },
      { name: 'responsable', label: 'Responsable support', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Registre Incidents',
          title: 'Registre des Incidents Informatiques',
          colorHeader: '0D47A1',
          headers: ['N° Ticket', 'Date ouverture', 'Criticité', 'Description', 'Responsable', 'Date résolution', 'Durée (h)', 'SLA (h)', 'Respect SLA', 'Statut'],
          rows: [
            ['INC-001', '', 'Critique', '', '', '', 0, 4, '=IF(G{r}<=H{r},"OUI","NON")', 'Ouvert'],
            ['INC-002', '', 'Haute', '', '', '', 0, 8, '=IF(G{r}<=H{r},"OUI","NON")', 'Ouvert'],
            ['INC-003', '', 'Moyenne', '', '', '', 0, 24, '=IF(G{r}<=H{r},"OUI","NON")', 'Ouvert'],
            ['INC-004', '', 'Basse', '', '', '', 0, 72, '=IF(G{r}<=H{r},"OUI","NON")', 'Ouvert'],
            ['INC-005', '', 'Haute', '', '', '', 0, 8, '=IF(G{r}<=H{r},"OUI","NON")', 'Ouvert'],
            ['INC-006', '', 'Moyenne', '', '', '', 0, 24, '=IF(G{r}<=H{r},"OUI","NON")', 'Ouvert'],
            ['INC-007', '', 'Critique', '', '', '', 0, 4, '=IF(G{r}<=H{r},"OUI","NON")', 'Ouvert'],
            ['INC-008', '', 'Basse', '', '', '', 0, 72, '=IF(G{r}<=H{r},"OUI","NON")', 'Ouvert'],
          ],
          totalsRow: false,
          colWidths: [12, 16, 12, 30, 18, 16, 12, 10, 14, 12],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 65,
  },

  // 4. xl_tec_inventaire_si — Inventaire parc informatique
  {
    code: 'xl_tec_inventaire_si',
    name: 'Inventaire parc informatique',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Inventaire complet des équipements IT : marque, modèle, utilisateur, valeur',
    price: 700, priceMax: 1200, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'date_inventaire', label: 'Date d\'inventaire', type: 'date', required: true },
      { name: 'responsable', label: 'Responsable IT', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Inventaire SI',
          title: 'Inventaire du Parc Informatique',
          colorHeader: '0D47A1',
          headers: ['N° Asset', 'Type équipement', 'Marque', 'Modèle', 'N° Série', 'Utilisateur', 'Site/Localisation', 'Date achat', 'Valeur achat (FCFA)', 'Valeur résiduelle', 'État'],
          rows: [
            ['IT-001', 'Ordinateur portable', '', '', '', '', '', '', 0, '=I{r}*0.6', 'Bon'],
            ['IT-002', 'Ordinateur portable', '', '', '', '', '', '', 0, '=I{r}*0.6', 'Bon'],
            ['IT-003', 'Ordinateur fixe', '', '', '', '', '', '', 0, '=I{r}*0.5', 'Bon'],
            ['IT-004', 'Imprimante', '', '', '', '', '', '', 0, '=I{r}*0.4', 'Bon'],
            ['IT-005', 'Serveur', '', '', '', '', '', '', 0, '=I{r}*0.7', 'Bon'],
            ['IT-006', 'Switch réseau', '', '', '', '', '', '', 0, '=I{r}*0.5', 'Bon'],
            ['IT-007', 'Tablette', '', '', '', '', '', '', 0, '=I{r}*0.5', 'Bon'],
            ['IT-008', 'Écran', '', '', '', '', '', '', 0, '=I{r}*0.4', 'Bon'],
            ['IT-009', 'Routeur', '', '', '', '', '', '', 0, '=I{r}*0.5', 'Bon'],
            ['IT-010', 'Onduleur', '', '', '', '', '', '', 0, '=I{r}*0.4', 'Bon'],
          ],
          totalsRow: true,
          colWidths: [10, 22, 14, 16, 16, 20, 18, 14, 18, 18, 10],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 63,
  },

  // 5. xl_tec_licences — Suivi licences logicielles
  {
    code: 'xl_tec_licences',
    name: 'Suivi licences logicielles',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Gestion des licences logicielles : éditeurs, postes couverts, expiration et coûts',
    price: 600, priceMax: 1100, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'responsable', label: 'Responsable IT', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Licences',
          title: 'Suivi des Licences Logicielles',
          colorHeader: '0D47A1',
          headers: ['Logiciel', 'Éditeur', 'Version', 'Nb postes achetés', 'Nb postes utilisés', 'Date expiration', 'Coût renouvellement (FCFA)', 'Alerte renouvellement', 'Statut'],
          rows: [
            ['Microsoft Office', 'Microsoft', '', 0, 0, '', 0, '=IF(F{r}<>"",IF(DATEVALUE(F{r})-TODAY()<60,"URGENT","OK"),"N/A")', 'Actif'],
            ['Windows Server', 'Microsoft', '', 0, 0, '', 0, '=IF(F{r}<>"",IF(DATEVALUE(F{r})-TODAY()<60,"URGENT","OK"),"N/A")', 'Actif'],
            ['Antivirus', '', '', 0, 0, '', 0, '=IF(F{r}<>"",IF(DATEVALUE(F{r})-TODAY()<60,"URGENT","OK"),"N/A")', 'Actif'],
            ['ERP/CRM', '', '', 0, 0, '', 0, '=IF(F{r}<>"",IF(DATEVALUE(F{r})-TODAY()<60,"URGENT","OK"),"N/A")', 'Actif'],
            ['Adobe Creative', 'Adobe', '', 0, 0, '', 0, '=IF(F{r}<>"",IF(DATEVALUE(F{r})-TODAY()<60,"URGENT","OK"),"N/A")', 'Actif'],
            ['Outil BI/Reporting', '', '', 0, 0, '', 0, '=IF(F{r}<>"",IF(DATEVALUE(F{r})-TODAY()<60,"URGENT","OK"),"N/A")', 'Actif'],
            ['Base de données', '', '', 0, 0, '', 0, '=IF(F{r}<>"",IF(DATEVALUE(F{r})-TODAY()<60,"URGENT","OK"),"N/A")', 'Actif'],
            ['Outil de sauvegarde', '', '', 0, 0, '', 0, '=IF(F{r}<>"",IF(DATEVALUE(F{r})-TODAY()<60,"URGENT","OK"),"N/A")', 'Actif'],
          ],
          totalsRow: true,
          colWidths: [22, 16, 12, 18, 18, 16, 24, 22, 12],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 61,
  },

  // 6. xl_tec_kpi_it — Tableau de bord KPIs IT
  {
    code: 'xl_tec_kpi_it',
    name: 'Tableau de bord KPIs IT',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Indicateurs clés de performance IT : disponibilité, MTTR, MTBF, SLA',
    price: 1000, priceMax: 1500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'periode', label: 'Période de reporting', type: 'text', required: true },
      { name: 'dsi', label: 'Directeur DSI', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'KPIs IT',
          title: 'Tableau de Bord KPIs IT',
          colorHeader: '0D47A1',
          headers: ['Indicateur KPI', 'Objectif', 'Réalisé', 'Unité', 'Performance', 'Tendance'],
          rows: [
            ['Disponibilité systèmes', 99.5, 0, '%', '=IFERROR(C{r}/B{r}*100,0)', '=IF(C{r}>=B{r},"▲","▼")'],
            ['MTTR (Mean Time To Repair)', 4, 0, 'heures', '=IFERROR(B{r}/C{r}*100,0)', '=IF(C{r}<=B{r},"▲","▼")'],
            ['MTBF (Mean Time Between Failures)', 720, 0, 'heures', '=IFERROR(C{r}/B{r}*100,0)', '=IF(C{r}>=B{r},"▲","▼")'],
            ['Tickets résolus dans les délais', 95, 0, '%', '=IFERROR(C{r}/B{r}*100,0)', '=IF(C{r}>=B{r},"▲","▼")'],
            ['Taux de respect des SLA', 98, 0, '%', '=IFERROR(C{r}/B{r}*100,0)', '=IF(C{r}>=B{r},"▲","▼")'],
            ['Nombre incidents critiques', 2, 0, 'nb', '=IFERROR(B{r}/C{r}*100,0)', '=IF(C{r}<=B{r},"▲","▼")'],
            ['Taux utilisation serveurs', 80, 0, '%', '=IFERROR(C{r}/B{r}*100,0)', '=IF(C{r}<=100,"OK","CRITIQUE")'],
            ['Satisfaction utilisateurs IT', 80, 0, '/100', '=IFERROR(C{r}/B{r}*100,0)', '=IF(C{r}>=B{r},"▲","▼")'],
            ['Délai moyen résolution ticket', 24, 0, 'heures', '=IFERROR(B{r}/C{r}*100,0)', '=IF(C{r}<=B{r},"▲","▼")'],
          ],
          totalsRow: false,
          colWidths: [34, 14, 14, 10, 14, 12],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 74,
  },

  // 7. xl_tec_plan_reprise — Plan de reprise d'activité informatique
  {
    code: 'xl_tec_plan_reprise',
    name: "Plan de reprise d'activité informatique",
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'PRA/PCA informatique : RTO, RPO, procédures de reprise et tests',
    price: 1200, priceMax: 1500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'responsable', label: 'Responsable PRA', type: 'text', required: true },
      { name: 'date_revision', label: 'Date de révision', type: 'date', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Plan Reprise',
          title: "Plan de Reprise d'Activité Informatique",
          colorHeader: '0D47A1',
          headers: ['Système / Application', 'Criticité', 'RTO (heures)', 'RPO (heures)', 'Procédure de reprise', 'Responsable', 'Dernier test', 'Résultat test'],
          rows: [
            ['ERP principal', 'Critique', 4, 1, '', '', '', 'Réussi'],
            ['Serveur messagerie', 'Haute', 8, 4, '', '', '', 'Réussi'],
            ['Serveur de fichiers', 'Haute', 8, 2, '', '', '', 'Réussi'],
            ['Système de paie', 'Critique', 4, 1, '', '', '', 'Réussi'],
            ['Site web / e-commerce', 'Haute', 2, 1, '', '', '', 'Réussi'],
            ['CRM', 'Moyenne', 24, 8, '', '', '', 'Réussi'],
            ['Système de sauvegarde', 'Critique', 2, 0, '', '', '', 'Réussi'],
            ['Réseau / Télécoms', 'Critique', 4, 0, '', '', '', 'Réussi'],
            ['Sécurité (AD, firewall)', 'Critique', 2, 0, '', '', '', 'Réussi'],
          ],
          totalsRow: false,
          colWidths: [26, 12, 14, 14, 30, 18, 14, 14],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 60,
  },

  // 8. xl_tec_cybersecurite — Suivi vulnérabilités cybersécurité
  {
    code: 'xl_tec_cybersecurite',
    name: 'Suivi vulnérabilités cybersécurité',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Registre des vulnérabilités CVE : gravité, systèmes affectés, statut des patchs',
    price: 1000, priceMax: 1500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'responsable', label: 'Responsable sécurité (RSSI)', type: 'text', required: true },
      { name: 'periode', label: 'Période', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Cybersécurité',
          title: 'Suivi Vulnérabilités Cybersécurité',
          colorHeader: '0D47A1',
          headers: ['CVE / Référence', 'Date détection', 'Gravité (CVSS)', 'Système affecté', 'Description', 'Responsable patch', 'Délai correction (j)', 'Statut patch', 'Date résolution'],
          rows: [
            ['CVE-2024-0001', '', 'Critique (9-10)', '', '', '', 7, 'En attente', ''],
            ['CVE-2024-0002', '', 'Haute (7-8.9)', '', '', '', 14, 'En attente', ''],
            ['CVE-2024-0003', '', 'Moyenne (4-6.9)', '', '', '', 30, 'En cours', ''],
            ['CVE-2024-0004', '', 'Haute (7-8.9)', '', '', '', 14, 'En attente', ''],
            ['CVE-2024-0005', '', 'Critique (9-10)', '', '', '', 7, 'En cours', ''],
            ['CVE-2024-0006', '', 'Basse (0-3.9)', '', '', '', 90, 'Planifié', ''],
            ['CVE-2024-0007', '', 'Moyenne (4-6.9)', '', '', '', 30, 'En attente', ''],
            ['CVE-2024-0008', '', 'Haute (7-8.9)', '', '', '', 14, 'Corrigé', ''],
          ],
          totalsRow: false,
          colWidths: [16, 14, 18, 22, 28, 18, 20, 14, 14],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 66,
  },

  // 9. xl_tec_cloud_couts — Analyse coûts cloud
  {
    code: 'xl_tec_cloud_couts',
    name: 'Analyse coûts cloud',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Suivi et optimisation des coûts cloud par service et fournisseur',
    price: 900, priceMax: 1400, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'annee', label: 'Année', type: 'text', required: true },
      { name: 'responsable', label: 'Responsable cloud', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Coûts Cloud',
          title: 'Analyse des Coûts Cloud',
          colorHeader: '0D47A1',
          headers: ['Service cloud', 'Fournisseur', 'Usage/mois', 'Unité', 'Coût/mois (FCFA)', 'Coût/an estimé', 'Optimisation possible', 'Économie potentielle', 'Priorité'],
          rows: [
            ['Machines virtuelles', 'AWS/Azure/GCP', 0, 'vCPU', 0, '=E{r}*12', '', 0, 'Haute'],
            ['Stockage objet (S3/Blob)', 'AWS/Azure/GCP', 0, 'TB', 0, '=E{r}*12', '', 0, 'Moyenne'],
            ['Base de données cloud', '', 0, 'instances', 0, '=E{r}*12', '', 0, 'Haute'],
            ['Réseau / CDN', '', 0, 'TB', 0, '=E{r}*12', '', 0, 'Basse'],
            ['Services IA/ML', '', 0, 'appels API', 0, '=E{r}*12', '', 0, 'Moyenne'],
            ['Kubernetes / Containers', '', 0, 'nœuds', 0, '=E{r}*12', '', 0, 'Moyenne'],
            ['Sauvegardes cloud', '', 0, 'TB', 0, '=E{r}*12', '', 0, 'Basse'],
            ['Licences SaaS', '', 0, 'utilisateurs', 0, '=E{r}*12', '', 0, 'Haute'],
            ['TOTAL', '', '', '', '=SUM(E2:E9)', '=SUM(F2:F9)', '', '=SUM(H2:H9)', ''],
          ],
          totalsRow: false,
          colWidths: [26, 16, 14, 12, 18, 18, 24, 20, 12],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 69,
  },

  // 10. xl_tec_roi_digital — Calcul ROI transformation digitale
  {
    code: 'xl_tec_roi_digital',
    name: 'Calcul ROI transformation digitale',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Évaluation du retour sur investissement d\'un projet de transformation digitale',
    price: 1200, priceMax: 1500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'nom_projet', label: 'Nom du projet digital', type: 'text', required: true },
      { name: 'responsable', label: 'Responsable projet', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'ROI Digital',
          title: 'Calcul ROI Transformation Digitale',
          colorHeader: '0D47A1',
          headers: ['Catégorie', 'Description', 'Année 1 (FCFA)', 'Année 2 (FCFA)', 'Année 3 (FCFA)', 'Total 3 ans'],
          rows: [
            ['INVESTISSEMENTS', 'Coûts initiaux', '', '', '', '=SUM(C{r}:E{r})'],
            ['Développement logiciel', '', 0, 0, 0, '=SUM(C{r}:E{r})'],
            ['Infrastructure IT', '', 0, 0, 0, '=SUM(C{r}:E{r})'],
            ['Formation personnel', '', 0, 0, 0, '=SUM(C{r}:E{r})'],
            ['Conduite du changement', '', 0, 0, 0, '=SUM(C{r}:E{r})'],
            ['TOTAL INVESTISSEMENTS', '', '=SUM(C3:C6)', '=SUM(D3:D6)', '=SUM(E3:E6)', '=SUM(F3:F6)'],
            ['GAINS ATTENDUS', 'Bénéfices estimés', '', '', '', '=SUM(C{r}:E{r})'],
            ['Gains productivité', '', 0, 0, 0, '=SUM(C{r}:E{r})'],
            ['Réduction coûts opérationnels', '', 0, 0, 0, '=SUM(C{r}:E{r})'],
            ['Augmentation revenus', '', 0, 0, 0, '=SUM(C{r}:E{r})'],
            ['TOTAL GAINS', '', '=SUM(C9:C11)', '=SUM(D9:D11)', '=SUM(E9:E11)', '=SUM(F9:F11)'],
            ['ROI (%)', '', '=IFERROR((C13-C7)/C7*100,0)', '=IFERROR((D13-D7)/D7*100,0)', '=IFERROR((E13-E7)/E7*100,0)', '=IFERROR((F13-F7)/F7*100,0)'],
          ],
          totalsRow: false,
          colWidths: [28, 26, 18, 18, 18, 18],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 71,
  },

  // 11. xl_tel_parc_mobile — Gestion parc téléphonie mobile
  {
    code: 'xl_tel_parc_mobile',
    name: 'Gestion parc téléphonie mobile',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Suivi des lignes mobiles professionnelles : SIM, utilisateurs, forfaits et consommation',
    price: 700, priceMax: 1200, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'periode', label: 'Période', type: 'text', required: true },
      { name: 'responsable', label: 'Responsable télécom', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Parc Mobile',
          title: 'Gestion du Parc Téléphonie Mobile',
          colorHeader: '01579B',
          headers: ['N° SIM / Ligne', 'Utilisateur', 'Département', 'Opérateur', 'Type forfait', 'Plafond (FCFA)', 'Consommation (FCFA)', 'Dépassement', 'Statut'],
          rows: [
            ['', '', '', '', 'Voix + Data', 0, 0, '=IF(G{r}>F{r},G{r}-F{r},0)', 'Actif'],
            ['', '', '', '', 'Voix + Data', 0, 0, '=IF(G{r}>F{r},G{r}-F{r},0)', 'Actif'],
            ['', '', '', '', 'Voix + Data', 0, 0, '=IF(G{r}>F{r},G{r}-F{r},0)', 'Actif'],
            ['', '', '', '', 'Data uniquement', 0, 0, '=IF(G{r}>F{r},G{r}-F{r},0)', 'Actif'],
            ['', '', '', '', 'Voix + Data', 0, 0, '=IF(G{r}>F{r},G{r}-F{r},0)', 'Actif'],
            ['', '', '', '', 'Voix + Data', 0, 0, '=IF(G{r}>F{r},G{r}-F{r},0)', 'Actif'],
            ['', '', '', '', 'Voix seulement', 0, 0, '=IF(G{r}>F{r},G{r}-F{r},0)', 'Actif'],
            ['', '', '', '', 'Voix + Data', 0, 0, '=IF(G{r}>F{r},G{r}-F{r},0)', 'Actif'],
            ['', '', '', '', 'Data uniquement', 0, 0, '=IF(G{r}>F{r},G{r}-F{r},0)', 'Actif'],
            ['TOTAL', '', '', '', '', '=SUM(F2:F10)', '=SUM(G2:G10)', '=SUM(H2:H10)', ''],
          ],
          totalsRow: false,
          colWidths: [18, 20, 18, 14, 18, 16, 20, 16, 10],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 67,
  },

  // 12. xl_tel_factures_telecom — Analyse factures télécoms
  {
    code: 'xl_tel_factures_telecom',
    name: 'Analyse factures télécoms',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Analyse et optimisation des factures télécoms par opérateur et service',
    price: 800, priceMax: 1300, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'annee', label: 'Année', type: 'text', required: true },
      { name: 'responsable', label: 'Responsable télécom', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Factures Télécom',
          title: 'Analyse Factures Télécoms',
          colorHeader: '01579B',
          headers: ['Opérateur', 'Service', 'Montant janv', 'Montant févr', 'Montant mars', 'Montant avr', 'Montant mai', 'Montant juin', 'Total S1', 'Évolution %', 'Optimisation'],
          rows: [
            ['Opérateur A', 'Téléphonie fixe', 0, 0, 0, 0, 0, 0, '=SUM(C{r}:H{r})', '=IFERROR((H{r}-C{r})/C{r}*100,0)', ''],
            ['Opérateur A', 'Téléphonie mobile', 0, 0, 0, 0, 0, 0, '=SUM(C{r}:H{r})', '=IFERROR((H{r}-C{r})/C{r}*100,0)', ''],
            ['Opérateur A', 'Internet fibre', 0, 0, 0, 0, 0, 0, '=SUM(C{r}:H{r})', '=IFERROR((H{r}-C{r})/C{r}*100,0)', ''],
            ['Opérateur B', 'Téléphonie mobile', 0, 0, 0, 0, 0, 0, '=SUM(C{r}:H{r})', '=IFERROR((H{r}-C{r})/C{r}*100,0)', ''],
            ['Opérateur B', 'ADSL/VDSL', 0, 0, 0, 0, 0, 0, '=SUM(C{r}:H{r})', '=IFERROR((H{r}-C{r})/C{r}*100,0)', ''],
            ['Opérateur C', 'Data mobile', 0, 0, 0, 0, 0, 0, '=SUM(C{r}:H{r})', '=IFERROR((H{r}-C{r})/C{r}*100,0)', ''],
            ['Autres', 'Roaming', 0, 0, 0, 0, 0, 0, '=SUM(C{r}:H{r})', '=IFERROR((H{r}-C{r})/C{r}*100,0)', ''],
            ['TOTAL', '', '=SUM(C2:C8)', '=SUM(D2:D8)', '=SUM(E2:E8)', '=SUM(F2:F8)', '=SUM(G2:G8)', '=SUM(H2:H8)', '=SUM(I2:I8)', '', ''],
          ],
          totalsRow: false,
          colWidths: [14, 20, 14, 14, 14, 14, 14, 14, 14, 14, 20],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 64,
  },

  // 13. xl_tel_couverture_reseau — Cartographie couverture réseau
  {
    code: 'xl_tel_couverture_reseau',
    name: 'Cartographie couverture réseau',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Suivi de la couverture réseau par zone : signal, technologie, débit et qualité',
    price: 900, priceMax: 1400, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'operateur', label: 'Opérateur', type: 'text', required: true },
      { name: 'region', label: 'Région / Pays', type: 'text', required: true },
      { name: 'date_mesure', label: 'Date de mesure', type: 'date', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Couverture Réseau',
          title: 'Cartographie Couverture Réseau',
          colorHeader: '01579B',
          headers: ['Zone / Localité', 'Région', 'Technologie (2G/3G/4G/5G)', 'Niveau signal (dBm)', 'Débit descendant (Mbps)', 'Débit montant (Mbps)', 'Qualité voix (MOS)', 'Taux couverture pop. %', 'Observations'],
          rows: [
            ['Zone urbaine centre', '', '4G/LTE', -75, 0, 0, 0, 0, ''],
            ['Zone urbaine périphérie', '', '4G/LTE', -85, 0, 0, 0, 0, ''],
            ['Zone péri-urbaine', '', '3G', -90, 0, 0, 0, 0, ''],
            ['Zone rurale proche', '', '3G', -95, 0, 0, 0, 0, ''],
            ['Zone rurale éloignée', '', '2G', -100, 0, 0, 0, 0, ''],
            ['Axe routier principal', '', '4G/LTE', -80, 0, 0, 0, 0, ''],
            ['Zone industrielle', '', '4G/LTE', -78, 0, 0, 0, 0, ''],
            ['Site sensible (hôpital)', '', '4G/LTE', -72, 0, 0, 0, 0, ''],
            ['Zone non couverte', '', 'Aucune', 0, 0, 0, 0, 0, 'À couvrir'],
          ],
          totalsRow: false,
          colWidths: [24, 16, 24, 18, 22, 20, 20, 22, 20],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 58,
  },

  // 14. xl_tel_trafic_data — Analyse trafic data
  {
    code: 'xl_tel_trafic_data',
    name: 'Analyse trafic data',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Analyse du trafic data par période : volumes, pics, coûts et prévisions',
    price: 700, priceMax: 1200, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'operateur', label: 'Opérateur / Entreprise', type: 'text', required: true },
      { name: 'annee', label: 'Année', type: 'text', required: true },
      { name: 'unite', label: 'Unité de mesure (Go/To)', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Trafic Data',
          title: 'Analyse Trafic Data',
          colorHeader: '01579B',
          headers: ['Mois', 'Volume data (Go)', 'Pic journalier (Go)', 'Coût data (FCFA)', 'Coût/Go (FCFA)', 'Prévision N+1 (Go)', 'Variation %'],
          rows: [
            ['Janvier', 0, 0, 0, '=IFERROR(D{r}/B{r},0)', 0, ''],
            ['Février', 0, 0, 0, '=IFERROR(D{r}/B{r},0)', 0, '=IFERROR((B{r}-B2)/B2*100,0)'],
            ['Mars', 0, 0, 0, '=IFERROR(D{r}/B{r},0)', 0, '=IFERROR((B{r}-B3)/B3*100,0)'],
            ['Avril', 0, 0, 0, '=IFERROR(D{r}/B{r},0)', 0, '=IFERROR((B{r}-B4)/B4*100,0)'],
            ['Mai', 0, 0, 0, '=IFERROR(D{r}/B{r},0)', 0, '=IFERROR((B{r}-B5)/B5*100,0)'],
            ['Juin', 0, 0, 0, '=IFERROR(D{r}/B{r},0)', 0, '=IFERROR((B{r}-B6)/B6*100,0)'],
            ['Juillet', 0, 0, 0, '=IFERROR(D{r}/B{r},0)', 0, '=IFERROR((B{r}-B7)/B7*100,0)'],
            ['Août', 0, 0, 0, '=IFERROR(D{r}/B{r},0)', 0, '=IFERROR((B{r}-B8)/B8*100,0)'],
            ['Septembre', 0, 0, 0, '=IFERROR(D{r}/B{r},0)', 0, '=IFERROR((B{r}-B9)/B9*100,0)'],
            ['Octobre', 0, 0, 0, '=IFERROR(D{r}/B{r},0)', 0, '=IFERROR((B{r}-B10)/B10*100,0)'],
            ['Novembre', 0, 0, 0, '=IFERROR(D{r}/B{r},0)', 0, '=IFERROR((B{r}-B11)/B11*100,0)'],
            ['Décembre', 0, 0, 0, '=IFERROR(D{r}/B{r},0)', 0, '=IFERROR((B{r}-B12)/B12*100,0)'],
            ['TOTAL', '=SUM(B2:B13)', '=MAX(C2:C13)', '=SUM(D2:D13)', '=IFERROR(D14/B14,0)', '=SUM(F2:F13)', ''],
          ],
          totalsRow: false,
          colWidths: [14, 18, 20, 18, 18, 20, 14],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 62,
  },

  // 15. xl_tel_kpi_operateur — KPIs opérateur télécom
  {
    code: 'xl_tel_kpi_operateur',
    name: 'KPIs opérateur télécom',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Tableau de bord KPIs opérateur : MoU, ARPU, churn, NPS, disponibilité réseau',
    price: 1000, priceMax: 1500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'operateur', label: 'Nom de l\'opérateur', type: 'text', required: true },
      { name: 'periode', label: 'Période de reporting', type: 'text', required: true },
      { name: 'region', label: 'Région / Marché', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'KPIs Opérateur',
          title: 'KPIs Opérateur Télécom',
          colorHeader: '01579B',
          headers: ['Indicateur KPI', 'Unité', 'Objectif', 'Réalisé', 'Écart', 'Performance %', 'Tendance'],
          rows: [
            ['MoU (Minutes of Use)', 'min/abonné/mois', 0, 0, '=D{r}-C{r}', '=IFERROR(D{r}/C{r}*100,0)', '=IF(D{r}>=C{r},"▲","▼")'],
            ['ARPU (Average Revenue Per User)', 'FCFA/abonné/mois', 0, 0, '=D{r}-C{r}', '=IFERROR(D{r}/C{r}*100,0)', '=IF(D{r}>=C{r},"▲","▼")'],
            ['Churn rate (taux résiliation)', '%/mois', 0, 0, '=D{r}-C{r}', '=IFERROR(C{r}/D{r}*100,0)', '=IF(D{r}<=C{r},"▲","▼")'],
            ['NPS (Net Promoter Score)', 'score', 0, 0, '=D{r}-C{r}', '=IFERROR(D{r}/C{r}*100,0)', '=IF(D{r}>=C{r},"▲","▼")'],
            ['Disponibilité réseau', '%', 99.5, 0, '=D{r}-C{r}', '=IFERROR(D{r}/C{r}*100,0)', '=IF(D{r}>=C{r},"▲","▼")'],
            ['Taux appels réussis (NER)', '%', 0, 0, '=D{r}-C{r}', '=IFERROR(D{r}/C{r}*100,0)', '=IF(D{r}>=C{r},"▲","▼")'],
            ['Nombre abonnés actifs', 'milliers', 0, 0, '=D{r}-C{r}', '=IFERROR(D{r}/C{r}*100,0)', '=IF(D{r}>=C{r},"▲","▼")'],
            ['Part de marché', '%', 0, 0, '=D{r}-C{r}', '=IFERROR(D{r}/C{r}*100,0)', '=IF(D{r}>=C{r},"▲","▼")'],
            ['EBITDA margin', '%', 0, 0, '=D{r}-C{r}', '=IFERROR(D{r}/C{r}*100,0)', '=IF(D{r}>=C{r},"▲","▼")'],
          ],
          totalsRow: false,
          colWidths: [30, 22, 14, 14, 14, 16, 12],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 70,
  },

  // 16. xl_tel_maintenance_reseau — Plan maintenance réseau télécom
  {
    code: 'xl_tel_maintenance_reseau',
    name: 'Plan maintenance réseau télécom',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Planification et suivi de la maintenance du réseau télécom',
    price: 800, priceMax: 1300, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'operateur', label: 'Opérateur / Entreprise', type: 'text', required: true },
      { name: 'annee', label: 'Année', type: 'text', required: true },
      { name: 'responsable', label: 'Responsable technique', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Maintenance Réseau',
          title: 'Plan de Maintenance Réseau Télécom',
          colorHeader: '01579B',
          headers: ['Équipement / Site', 'Type équipement', 'Localisation', 'Fréquence maintenance', 'Dernière maintenance', 'Prochaine maintenance', 'Coût prévu (FCFA)', 'Disponibilité cible %', 'Prestataire', 'Statut'],
          rows: [
            ['BTS/NB-IoT Site 1', 'Station de base', '', 'Trimestrielle', '', '', 0, 99.5, '', 'Planifié'],
            ['BTS/NB-IoT Site 2', 'Station de base', '', 'Trimestrielle', '', '', 0, 99.5, '', 'Planifié'],
            ['Core network', 'Équipement cœur', '', 'Mensuelle', '', '', 0, 99.9, '', 'Planifié'],
            ['Transmission fibre', 'Réseau transport', '', 'Semestrielle', '', '', 0, 99.8, '', 'Planifié'],
            ['Routeurs IP', 'Équipement IP', '', 'Trimestrielle', '', '', 0, 99.5, '', 'Planifié'],
            ['Systèmes de refroidissement', 'Énergie/Climatisation', '', 'Mensuelle', '', '', 0, 99, '', 'Planifié'],
            ['Groupes électrogènes', 'Énergie', '', 'Mensuelle', '', '', 0, 99, '', 'Planifié'],
            ['Liens satellitaires', 'Transmission', '', 'Semestrielle', '', '', 0, 99.5, '', 'Planifié'],
          ],
          totalsRow: true,
          colWidths: [22, 20, 16, 20, 18, 18, 18, 20, 16, 12],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 59,
  },

  // 17. xl_tel_deploiement — Suivi déploiement infrastructure
  {
    code: 'xl_tel_deploiement',
    name: 'Suivi déploiement infrastructure télécom',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Suivi du déploiement de l\'infrastructure télécom : sites, statuts et budgets',
    price: 1000, priceMax: 1500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'operateur', label: 'Opérateur', type: 'text', required: true },
      { name: 'programme', label: 'Programme de déploiement', type: 'text', required: true },
      { name: 'chef_projet', label: 'Chef de projet', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Déploiement',
          title: 'Suivi Déploiement Infrastructure Télécom',
          colorHeader: '01579B',
          headers: ['Site / Zone', 'Région', 'Type déploiement', 'Opérateur', 'Date début prévue', 'Date fin prévue', 'Avancement %', 'Budget prévu (FCFA)', 'Budget réalisé (FCFA)', 'Statut'],
          rows: [
            ['Site 001', '', '4G/LTE', '', '', '', 0, 0, 0, 'Planifié'],
            ['Site 002', '', '4G/LTE', '', '', '', 0, 0, 0, 'Planifié'],
            ['Site 003', '', '5G', '', '', '', 0, 0, 0, 'En cours'],
            ['Site 004', '', 'Fibre optique', '', '', '', 0, 0, 0, 'Planifié'],
            ['Site 005', '', '4G/LTE', '', '', '', 0, 0, 0, 'En cours'],
            ['Site 006', '', '3G Extension', '', '', '', 0, 0, 0, 'Planifié'],
            ['Site 007', '', '5G', '', '', '', 0, 0, 0, 'Planifié'],
            ['Site 008', '', 'Fibre optique', '', '', '', 0, 0, 0, 'En cours'],
            ['Site 009', '', '4G/LTE', '', '', '', 0, 0, 0, 'Terminé'],
            ['Site 010', '', '4G/LTE', '', '', '', 0, 0, 0, 'Planifié'],
          ],
          totalsRow: true,
          colWidths: [12, 14, 20, 14, 16, 16, 14, 20, 20, 12],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 63,
  },

  // 18. xl_tel_roaming — Analyse coûts roaming
  {
    code: 'xl_tel_roaming',
    name: 'Analyse coûts roaming',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Analyse et optimisation des coûts de roaming international par destination',
    price: 700, priceMax: 1200, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'periode', label: 'Période', type: 'text', required: true },
      { name: 'responsable', label: 'Responsable télécom', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Roaming',
          title: 'Analyse Coûts Roaming International',
          colorHeader: '01579B',
          headers: ['Destination (pays)', 'Opérateur local', 'Nb jours', 'Volume data (Mo)', 'Durée voix (min)', 'Coût data (FCFA)', 'Coût voix (FCFA)', 'Coût total (FCFA)', 'Coût/jour (FCFA)', 'Optimisation'],
          rows: [
            ['France', '', 0, 0, 0, 0, 0, '=F{r}+G{r}', '=IFERROR(H{r}/C{r},0)', ''],
            ['Maroc', '', 0, 0, 0, 0, 0, '=F{r}+G{r}', '=IFERROR(H{r}/C{r},0)', ''],
            ['Sénégal', '', 0, 0, 0, 0, 0, '=F{r}+G{r}', '=IFERROR(H{r}/C{r},0)', ''],
            ['Côte d\'Ivoire', '', 0, 0, 0, 0, 0, '=F{r}+G{r}', '=IFERROR(H{r}/C{r},0)', ''],
            ['Ghana', '', 0, 0, 0, 0, 0, '=F{r}+G{r}', '=IFERROR(H{r}/C{r},0)', ''],
            ['Nigeria', '', 0, 0, 0, 0, 0, '=F{r}+G{r}', '=IFERROR(H{r}/C{r},0)', ''],
            ['USA', '', 0, 0, 0, 0, 0, '=F{r}+G{r}', '=IFERROR(H{r}/C{r},0)', ''],
            ['Chine', '', 0, 0, 0, 0, 0, '=F{r}+G{r}', '=IFERROR(H{r}/C{r},0)', ''],
            ['TOTAL', '', '=SUM(C2:C9)', '=SUM(D2:D9)', '=SUM(E2:E9)', '=SUM(F2:F9)', '=SUM(G2:G9)', '=SUM(H2:H9)', '', ''],
          ],
          totalsRow: false,
          colWidths: [18, 16, 10, 18, 18, 18, 18, 18, 18, 20],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 60,
  },

  // 19. xl_tel_sla_operateur — Suivi SLA opérateur
  {
    code: 'xl_tel_sla_operateur',
    name: 'Suivi SLA opérateur télécom',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Suivi des engagements SLA opérateur : métriques, réalisé, pénalités et tendances',
    price: 900, priceMax: 1400, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'operateur', label: 'Opérateur télécom', type: 'text', required: true },
      { name: 'periode', label: 'Période de suivi', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'SLA Opérateur',
          title: 'Suivi SLA Opérateur Télécom',
          colorHeader: '01579B',
          headers: ['Engagement SLA', 'Métrique', 'Cible contractuelle', 'Réalisé', 'Respect SLA', 'Pénalité applicable', 'Pénalité (FCFA)', 'Tendance'],
          rows: [
            ['Disponibilité réseau', '%', 99.5, 0, '=IF(D{r}>=C{r},"OUI","NON")', 'Crédit service', 0, ''],
            ['Délai rétablissement', 'heures', 4, 0, '=IF(D{r}<=C{r},"OUI","NON")', 'Pénalité', 0, ''],
            ['Taux appels réussis', '%', 97, 0, '=IF(D{r}>=C{r},"OUI","NON")', 'Crédit service', 0, ''],
            ['Qualité voix (MOS)', 'score /5', 3.5, 0, '=IF(D{r}>=C{r},"OUI","NON")', 'Pénalité', 0, ''],
            ['Débit internet garanti', 'Mbps', 0, 0, '=IF(D{r}>=C{r},"OUI","NON")', 'Crédit service', 0, ''],
            ['Délai résolution incidents', 'heures', 8, 0, '=IF(D{r}<=C{r},"OUI","NON")', 'Pénalité', 0, ''],
            ['Taux livraison SMS', '%', 98, 0, '=IF(D{r}>=C{r},"OUI","NON")', 'Crédit service', 0, ''],
            ['Support technique 24/7', 'score', 90, 0, '=IF(D{r}>=C{r},"OUI","NON")', 'Pénalité', 0, ''],
            ['TOTAL PÉNALITÉS', '', '', '', '', '', '=SUM(G2:G9)', ''],
          ],
          totalsRow: false,
          colWidths: [28, 18, 22, 14, 14, 22, 18, 14],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 65,
  },

  // 20. xl_tel_business_case — Business case service télécom
  {
    code: 'xl_tel_business_case',
    name: 'Business case service télécom',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Business case complet pour un service télécom : revenus, coûts, EBITDA, VAN, TRI et payback',
    price: 1500, priceMax: 1500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'operateur', label: 'Opérateur / Porteur du projet', type: 'text', required: true },
      { name: 'nom_service', label: 'Nom du service', type: 'text', required: true },
      { name: 'date_lancement', label: 'Date de lancement prévue', type: 'date', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Business Case',
          title: 'Business Case Service Télécom',
          colorHeader: '01579B',
          headers: ['Rubrique', 'Année 0 (invest.)', 'Année 1', 'Année 2', 'Année 3', 'Année 4', 'Année 5', 'Total 5 ans'],
          rows: [
            ['Abonnés cibles (milliers)', 0, 0, 0, 0, 0, 0, ''],
            ['ARPU mensuel (FCFA)', 0, 0, 0, 0, 0, 0, ''],
            ['REVENUS TOTAUX', 0, '=B2*B3*12*1000', '=C2*C3*12*1000', '=D2*D3*12*1000', '=E2*E3*12*1000', '=F2*F3*12*1000', '=SUM(C{r}:G{r})'],
            ['Coûts réseau & infrastructure', 0, 0, 0, 0, 0, 0, '=SUM(B{r}:G{r})'],
            ['Coûts commerciaux & marketing', 0, 0, 0, 0, 0, 0, '=SUM(B{r}:G{r})'],
            ['Coûts opérationnels', 0, 0, 0, 0, 0, 0, '=SUM(B{r}:G{r})'],
            ['TOTAL COÛTS', '=SUM(B5:B7)', '=SUM(C5:C7)', '=SUM(D5:D7)', '=SUM(E5:E7)', '=SUM(F5:F7)', '=SUM(G5:G7)', '=SUM(H5:H7)'],
            ['EBITDA', '=B4-B8', '=C4-C8', '=D4-D8', '=E4-E8', '=F4-F8', '=G4-G8', '=SUM(B{r}:G{r})'],
            ['Marge EBITDA %', '', '=IFERROR(C9/C4*100,0)', '=IFERROR(D9/D4*100,0)', '=IFERROR(E9/E4*100,0)', '=IFERROR(F9/F4*100,0)', '=IFERROR(G9/G4*100,0)', '=IFERROR(H9/H4*100,0)'],
            ['Flux de trésorerie net', '=-B8', '=C9', '=D9', '=E9', '=F9', '=G9', '=SUM(B{r}:G{r})'],
            ['Flux cumulés', '=B11', '=B12+C11', '=C12+D11', '=D12+E11', '=E12+F11', '=F12+G11', ''],
            ['VAN (taux 12%)', '=NPV(0.12,C11:G11)+B11', '', '', '', '', '', ''],
            ['TRI', '=IFERROR(IRR(B11:G11)*100,0)', '', '', '', '', '', ''],
            ['Payback (années)', '=IFERROR(MATCH(TRUE,B12:G12>=0,0)-1+(ABS(INDEX(B12:G12,MATCH(TRUE,B12:G12>=0,0)-1))/INDEX(B11:G11,MATCH(TRUE,B12:G12>=0,0))),0)', '', '', '', '', '', ''],
          ],
          totalsRow: false,
          colWidths: [28, 20, 18, 18, 18, 18, 18, 18],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 73,
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
  console.log(`✅ Excel Tech/Digital: ${created} créés — Total BDD: ${total}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
