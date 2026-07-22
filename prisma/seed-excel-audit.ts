import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const COUNTRIES = JSON.stringify(['CI','SN','CM','BJ','TG','BF','ML','GN','CD','CG','GA','NE','TD','MR']);

const templates = [
  // 1. xl_aud_programme — Programme audit annuel
  {
    code: 'xl_aud_programme',
    name: 'Programme audit annuel',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Planification annuelle des missions d\'audit : entités, types, auditeurs, dates et statut',
    price: 900, priceMax: 1400, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'entreprise', label: 'Entité auditrice', type: 'text', required: true },
      { name: 'annee', label: 'Année d\'audit', type: 'text', required: true },
      { name: 'responsable', label: 'Responsable audit', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Programme Audit',
          title: 'Programme d\'Audit Annuel',
          colorHeader: '4A148C',
          headers: ['N°', 'Entité / Département', 'Type d\'audit', 'Auditeur(s)', 'Date début prévue', 'Date fin prévue', 'Jours prévus', 'Statut', 'Observations'],
          rows: [
            [1, 'Direction Financière', 'Audit financier', 'M. Kouassi', '15/01/2025', '31/01/2025', 12, 'Planifié', ''],
            [2, 'Direction Commerciale', 'Audit opérationnel', 'Mme Diallo', '03/02/2025', '14/02/2025', 10, 'Planifié', ''],
            [3, 'Direction des Achats', 'Audit de conformité', 'M. Bah', '17/02/2025', '28/02/2025', 8, 'En cours', 'Retard fournisseurs'],
            [4, 'Ressources Humaines', 'Audit paie', 'M. Kouassi', '10/03/2025', '21/03/2025', 10, 'Planifié', ''],
            [5, 'Direction Informatique', 'Audit SI', 'Mme Traoré', '07/04/2025', '25/04/2025', 15, 'Planifié', ''],
            [6, 'Entrepôt / Logistique', 'Audit stocks', 'M. Bah', '05/05/2025', '16/05/2025', 10, 'Planifié', ''],
            [7, 'Direction Générale', 'Audit gouvernance', 'Mme Diallo', '02/06/2025', '13/06/2025', 10, 'Planifié', ''],
            [8, 'Service Fiscal', 'Revue fiscale', 'M. Kouassi', '30/06/2025', '11/07/2025', 10, 'Planifié', ''],
            [9, 'Agence Abidjan Nord', 'Audit terrain', 'M. Bah', '18/08/2025', '29/08/2025', 10, 'Planifié', ''],
            [10, 'Agence Bouaké', 'Audit terrain', 'Mme Traoré', '15/09/2025', '26/09/2025', 10, 'Planifié', ''],
          ],
          totalsRow: false,
          colWidths: [6, 28, 22, 18, 18, 18, 12, 14, 20],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 72,
  },

  // 2. xl_aud_questionnaire — Questionnaire audit interne
  {
    code: 'xl_aud_questionnaire',
    name: 'Questionnaire audit interne',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Questionnaire structuré par thèmes pour l\'évaluation de la conformité interne (O/N/NA)',
    price: 700, priceMax: 1200, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'entite', label: 'Entité auditée', type: 'text', required: true },
      { name: 'auditeur', label: 'Auditeur', type: 'text', required: true },
      { name: 'date_audit', label: 'Date d\'audit', type: 'date', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Questionnaire',
          title: 'Questionnaire d\'Audit Interne',
          colorHeader: '4A148C',
          headers: ['N°', 'Thème', 'Question de contrôle', 'Conformité (O/N/NA)', 'Observations / Justification', 'Référence document'],
          rows: [
            [1, 'Organisation', 'Les délégations de pouvoirs sont-elles formalisées et à jour ?', 'O', '', 'Manuel de délégation'],
            [2, 'Organisation', 'L\'organigramme est-il diffusé et connu du personnel ?', 'O', '', 'Intranet RH'],
            [3, 'Comptabilité', 'Le rapprochement bancaire est-il effectué mensuellement ?', 'O', 'Délai parfois dépassé', 'Procédure compta'],
            [4, 'Comptabilité', 'Les pièces justificatives sont-elles archivées de façon sécurisée ?', 'N', 'Archive physique insuffisante', ''],
            [5, 'Achats', 'Tout achat > 500 000 FCFA fait-il l\'objet d\'une mise en concurrence ?', 'O', '', 'Procédure achats'],
            [6, 'Achats', 'Les bons de commande sont-ils pré-numérotés et approuvés ?', 'NA', 'Non applicable filiale', ''],
            [7, 'Trésorerie', 'Les paiements en espèces sont-ils limités à un seuil défini ?', 'O', 'Seuil : 50 000 FCFA', 'Politique caisse'],
            [8, 'Trésorerie', 'La caisse est-elle contrôlée inopinément au moins 1 fois/mois ?', 'N', 'Aucun contrôle inopiné noté', ''],
            [9, 'Ressources Humaines', 'Les fiches de poste sont-elles disponibles pour chaque employé ?', 'O', '', 'SIRH'],
            [10, 'Ressources Humaines', 'Les entretiens annuels de performance sont-ils systématiquement réalisés ?', 'N', 'Taux réalisation : 60%', ''],
          ],
          totalsRow: false,
          colWidths: [6, 22, 42, 20, 30, 22],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 68,
  },

  // 3. xl_aud_constatations — Registre constatations audit
  {
    code: 'xl_aud_constatations',
    name: 'Registre constatations audit',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Registre structuré des constatations d\'audit : processus, risque, gravité et impact',
    price: 800, priceMax: 1300, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'mission', label: 'Mission d\'audit', type: 'text', required: true },
      { name: 'auditeur', label: 'Auditeur responsable', type: 'text', required: true },
      { name: 'date', label: 'Date de clôture mission', type: 'date', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Constatations',
          title: 'Registre des Constatations d\'Audit',
          colorHeader: '4A148C',
          headers: ['Réf.', 'Processus audité', 'Constatation', 'Cause identifiée', 'Risque associé', 'Gravité (1-5)', 'Impact financier estimé', 'Recommandation'],
          rows: [
            ['C-001', 'Trésorerie', 'Absence de rapprochement bancaire sur 3 mois', 'Manque de ressources', 'Soldes erronés non détectés', 4, 2500000, 'Mettre en place un rapprochement mensuel obligatoire'],
            ['C-002', 'Achats', 'Factures approuvées sans bon de commande', 'Procédure non respectée', 'Double paiement ou fraude', 4, 5000000, 'Rendre obligatoire le BC avant approbation facture'],
            ['C-003', 'Stocks', 'Écart de 8% entre stock physique et comptable', 'Inventaire incomplet', 'Pertes non comptabilisées', 3, 3200000, 'Réaliser inventaire mensuel contradictoire'],
            ['C-004', 'Paie', 'Employés fantômes détectés (2 cas)', 'Contrôle insuffisant', 'Fraude à la paie', 5, 7800000, 'Audit complet des effectifs avec justificatifs'],
            ['C-005', 'Fiscal', 'Retard de déclaration TVA (2 mois)', 'Organisation défaillante', 'Pénalités fiscales', 3, 850000, 'Mettre en place un calendrier fiscal automatisé'],
            ['C-006', 'Immobilisations', 'Biens non étiquetés ni inventoriés', 'Procédure absente', 'Risque de vol non détecté', 2, 1500000, 'Établir registre des immobilisations numéroté'],
            ['C-007', 'Gouvernance', 'PV de conseil absents sur 2 exercices', 'Formalisme insuffisant', 'Non-conformité légale', 3, 0, 'Rédiger et archiver les PV rétroactivement'],
            ['C-008', 'SI', 'Mots de passe génériques partagés entre utilisateurs', 'Politique sécurité absente', 'Accès non autorisés', 4, 0, 'Déployer politique de gestion des accès'],
            ['C-009', 'Comptabilité', 'Charges sans pièces justificatives (15 écritures)', 'Archivage défaillant', 'Rejet fiscal possible', 3, 1200000, 'Compléter les dossiers avant clôture annuelle'],
            ['C-010', 'Contractuel', 'Contrats fournisseurs expirés non renouvelés', 'Suivi inexistant', 'Litiges et engagements sans couverture', 3, 0, 'Créer un échéancier de suivi des contrats'],
          ],
          totalsRow: false,
          colWidths: [10, 22, 38, 24, 28, 14, 22, 38],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 74,
  },

  // 4. xl_aud_plan_actions — Plan d'actions correctives
  {
    code: 'xl_aud_plan_actions',
    name: 'Plan d\'actions correctives',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Suivi des actions correctives issues de l\'audit : responsable, délai, avancement et statut',
    price: 800, priceMax: 1300, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'mission', label: 'Mission d\'audit référencée', type: 'text', required: true },
      { name: 'responsable_audit', label: 'Responsable suivi audit', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Plan Actions',
          title: 'Plan d\'Actions Correctives',
          colorHeader: '4A148C',
          headers: ['Réf.', 'Constatation liée', 'Action corrective', 'Responsable', 'Date limite', 'Avancement %', 'Statut', 'Date clôture effective'],
          rows: [
            ['A-001', 'C-001', 'Mettre en place rapprochement bancaire mensuel', 'Chef comptable', '31/03/2025', 50, '=IF(F{r}=100,"Clôturé",IF(F{r}>=50,"En cours","Non démarré"))', ''],
            ['A-002', 'C-002', 'Former les acheteurs sur la procédure BC obligatoire', 'DAF', '28/02/2025', 80, '=IF(F{r}=100,"Clôturé",IF(F{r}>=50,"En cours","Non démarré"))', ''],
            ['A-003', 'C-003', 'Réaliser inventaire physique complet', 'Responsable logistique', '15/03/2025', 30, '=IF(F{r}=100,"Clôturé",IF(F{r}>=50,"En cours","Non démarré"))', ''],
            ['A-004', 'C-004', 'Audit complet des effectifs avec pièces d\'identité', 'DRH', '28/02/2025', 100, '=IF(F{r}=100,"Clôturé",IF(F{r}>=50,"En cours","Non démarré"))', '28/02/2025'],
            ['A-005', 'C-005', 'Mettre en place calendrier fiscal automatisé', 'Responsable fiscal', '31/01/2025', 100, '=IF(F{r}=100,"Clôturé",IF(F{r}>=50,"En cours","Non démarré"))', '25/01/2025'],
            ['A-006', 'C-006', 'Étiqueter et inventorier toutes les immobilisations', 'DAF', '30/04/2025', 10, '=IF(F{r}=100,"Clôturé",IF(F{r}>=50,"En cours","Non démarré"))', ''],
            ['A-007', 'C-007', 'Rédiger et archiver les PV de conseil manquants', 'Secrétaire général', '31/03/2025', 0, '=IF(F{r}=100,"Clôturé",IF(F{r}>=50,"En cours","Non démarré"))', ''],
            ['A-008', 'C-008', 'Déployer politique de gestion des accès SI', 'DSI', '30/06/2025', 20, '=IF(F{r}=100,"Clôturé",IF(F{r}>=50,"En cours","Non démarré"))', ''],
            ['A-009', 'C-009', 'Compléter les 15 dossiers de charges manquants', 'Chef comptable', '15/02/2025', 70, '=IF(F{r}=100,"Clôturé",IF(F{r}>=50,"En cours","Non démarré"))', ''],
            ['A-010', 'C-010', 'Créer un tableau de bord de suivi des contrats', 'DAF', '31/03/2025', 0, '=IF(F{r}=100,"Clôturé",IF(F{r}>=50,"En cours","Non démarré"))', ''],
          ],
          totalsRow: false,
          colWidths: [10, 14, 36, 22, 16, 14, 16, 22],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 76,
  },

  // 5. xl_aud_risques_financiers — Cartographie risques financiers
  {
    code: 'xl_aud_risques_financiers',
    name: 'Cartographie risques financiers',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Évaluation des risques financiers : probabilité, impact, score et dispositifs de contrôle',
    price: 1000, priceMax: 1800, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'entite', label: 'Entité', type: 'text', required: true },
      { name: 'exercice', label: 'Exercice', type: 'text', required: true },
      { name: 'responsable', label: 'Risk Manager', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Cartographie Risques',
          title: 'Cartographie des Risques Financiers',
          colorHeader: '4A148C',
          headers: ['N°', 'Risque identifié', 'Catégorie', 'Probabilité (1-5)', 'Impact (1-5)', 'Score brut', 'Contrôle existant', 'Score résiduel', 'Priorité'],
          rows: [
            [1, 'Fraude à la paie (employés fictifs)', 'Fraude interne', 4, 5, '=D{r}*E{r}', 'Contrôle mensuel DRH', 12, '=IF(H{r}>=15,"CRITIQUE",IF(H{r}>=10,"ÉLEVÉ",IF(H{r}>=5,"MODÉRÉ","FAIBLE")))'],
            [2, 'Erreur de rapprochement bancaire', 'Comptabilité', 3, 4, '=D{r}*E{r}', 'Rapprochement mensuel', 8, '=IF(H{r}>=15,"CRITIQUE",IF(H{r}>=10,"ÉLEVÉ",IF(H{r}>=5,"MODÉRÉ","FAIBLE")))'],
            [3, 'Non-conformité fiscale (TVA)', 'Fiscal', 3, 4, '=D{r}*E{r}', 'Revue trimestrielle', 9, '=IF(H{r}>=15,"CRITIQUE",IF(H{r}>=10,"ÉLEVÉ",IF(H{r}>=5,"MODÉRÉ","FAIBLE")))'],
            [4, 'Détournement de fonds caisse', 'Fraude interne', 4, 3, '=D{r}*E{r}', 'Contrôle inopinés', 6, '=IF(H{r}>=15,"CRITIQUE",IF(H{r}>=10,"ÉLEVÉ",IF(H{r}>=5,"MODÉRÉ","FAIBLE")))'],
            [5, 'Mauvaise évaluation des stocks', 'Comptabilité', 3, 3, '=D{r}*E{r}', 'Inventaire annuel', 6, '=IF(H{r}>=15,"CRITIQUE",IF(H{r}>=10,"ÉLEVÉ",IF(H{r}>=5,"MODÉRÉ","FAIBLE")))'],
            [6, 'Dépassement budgétaire non détecté', 'Gestion', 3, 4, '=D{r}*E{r}', 'Reporting mensuel', 8, '=IF(H{r}>=15,"CRITIQUE",IF(H{r}>=10,"ÉLEVÉ",IF(H{r}>=5,"MODÉRÉ","FAIBLE")))'],
            [7, 'Perte de liquidité court terme', 'Trésorerie', 2, 5, '=D{r}*E{r}', 'Plan de trésorerie', 5, '=IF(H{r}>=15,"CRITIQUE",IF(H{r}>=10,"ÉLEVÉ",IF(H{r}>=5,"MODÉRÉ","FAIBLE")))'],
            [8, 'Faux contrats fournisseurs', 'Fraude externe', 2, 5, '=D{r}*E{r}', 'Validation DAF', 5, '=IF(H{r}>=15,"CRITIQUE",IF(H{r}>=10,"ÉLEVÉ",IF(H{r}>=5,"MODÉRÉ","FAIBLE")))'],
            [9, 'Vol d\'immobilisations', 'Actif', 2, 3, '=D{r}*E{r}', 'Étiquetage + inventaire', 4, '=IF(H{r}>=15,"CRITIQUE",IF(H{r}>=10,"ÉLEVÉ",IF(H{r}>=5,"MODÉRÉ","FAIBLE")))'],
            [10, 'Manipulation données comptables SI', 'SI / Fraude', 2, 5, '=D{r}*E{r}', 'Droits accès restreints', 4, '=IF(H{r}>=15,"CRITIQUE",IF(H{r}>=10,"ÉLEVÉ",IF(H{r}>=5,"MODÉRÉ","FAIBLE")))'],
          ],
          totalsRow: false,
          colWidths: [6, 34, 18, 16, 14, 12, 28, 14, 14],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 78,
  },

  // 6. xl_aud_controle_interne — Grille évaluation contrôle interne
  {
    code: 'xl_aud_controle_interne',
    name: 'Grille évaluation contrôle interne',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Évaluation par processus de l\'efficacité des contrôles internes avec notation',
    price: 900, priceMax: 1500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'entite', label: 'Entité auditée', type: 'text', required: true },
      { name: 'auditeur', label: 'Auditeur', type: 'text', required: true },
      { name: 'date', label: 'Date d\'évaluation', type: 'date', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Contrôle Interne',
          title: 'Grille d\'Évaluation du Contrôle Interne',
          colorHeader: '4A148C',
          headers: ['N°', 'Processus', 'Objectif de contrôle', 'Contrôle en place', 'Fréquence', 'Test effectué', 'Efficacité (1-5)', 'Note qualitative', 'Recommandation'],
          rows: [
            [1, 'Trésorerie', 'Exhaustivité des encaissements', 'Rapprochement bancaire', 'Mensuelle', 'Oui', 3, 'Partielle', 'Renforcer la périodicité'],
            [2, 'Achats', 'Autorisation des dépenses', 'Signature DAF requise', 'À chaque opération', 'Oui', 4, 'Satisfaisante', ''],
            [3, 'Ventes', 'Réalité des revenus', 'Bons de livraison signés', 'À chaque vente', 'Oui', 4, 'Satisfaisante', ''],
            [4, 'Paie', 'Exactitude masse salariale', 'Double validation DRH/DAF', 'Mensuelle', 'Oui', 5, 'Très satisfaisante', ''],
            [5, 'Stocks', 'Valorisation correcte des stocks', 'Inventaire physique', 'Annuelle', 'Oui', 2, 'Insuffisante', 'Passer à un inventaire semestriel'],
            [6, 'Immobilisations', 'Existence et propriété des actifs', 'Registre des biens', 'Annuelle', 'Non', 1, 'Très insuffisante', 'Créer et tenir un registre complet'],
            [7, 'Fiscal', 'Conformité aux obligations fiscales', 'Calendrier fiscal', 'Mensuelle', 'Oui', 3, 'Partielle', 'Automatiser les alertes d\'échéances'],
            [8, 'SI', 'Sécurité des accès informatiques', 'Politique de mots de passe', 'Permanente', 'Non', 2, 'Insuffisante', 'Déployer gestion des identités'],
            [9, 'Contractuel', 'Validité des engagements', 'Revue juridique des contrats', 'Annuelle', 'Oui', 3, 'Partielle', 'Suivi des échéances contractuelles'],
            [10, 'Gouvernance', 'Respect des règles statutaires', 'Tenue PV CA/AG', 'Annuelle', 'Non', 1, 'Très insuffisante', 'Régulariser les PV manquants'],
          ],
          totalsRow: false,
          colWidths: [6, 20, 32, 26, 14, 14, 16, 18, 30],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 70,
  },

  // 7. xl_aud_echantillon — Plan de sondage audit
  {
    code: 'xl_aud_echantillon',
    name: 'Plan de sondage audit',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Définition de l\'échantillon d\'audit : population, méthode de sondage, résultats et taux d\'anomalies',
    price: 700, priceMax: 1200, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'mission', label: 'Mission d\'audit', type: 'text', required: true },
      { name: 'auditeur', label: 'Auditeur', type: 'text', required: true },
      { name: 'date', label: 'Date', type: 'date', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Plan Sondage',
          title: 'Plan de Sondage d\'Audit',
          colorHeader: '4A148C',
          headers: ['N°', 'Population testée', 'Taille population', 'Taille sondage', 'Méthode', 'Anomalies trouvées', 'Taux anomalies %', 'Conclusion', 'Risque résiduel'],
          rows: [
            [1, 'Factures fournisseurs payées', 1250, 60, 'Sondage aléatoire', 4, '=IFERROR(F{r}/D{r}*100,0)', '=IF(G{r}>5,"Non satisfaisant","Satisfaisant")', 'Modéré'],
            [2, 'Écritures de journal > 500 000 FCFA', 340, 40, 'Exhaustif seuil', 2, '=IFERROR(F{r}/D{r}*100,0)', '=IF(G{r}>5,"Non satisfaisant","Satisfaisant")', 'Faible'],
            [3, 'Remboursements de frais', 890, 50, 'Sondage systématique', 8, '=IFERROR(F{r}/D{r}*100,0)', '=IF(G{r}>5,"Non satisfaisant","Satisfaisant")', 'Élevé'],
            [4, 'Paiements en espèces', 420, 35, 'Sondage aléatoire', 1, '=IFERROR(F{r}/D{r}*100,0)', '=IF(G{r}>5,"Non satisfaisant","Satisfaisant")', 'Faible'],
            [5, 'Contrats fournisseurs actifs', 85, 85, 'Exhaustif', 12, '=IFERROR(F{r}/D{r}*100,0)', '=IF(G{r}>5,"Non satisfaisant","Satisfaisant")', 'Élevé'],
            [6, 'Sorties de stocks enregistrées', 2150, 80, 'Sondage monétaire', 5, '=IFERROR(F{r}/D{r}*100,0)', '=IF(G{r}>5,"Non satisfaisant","Satisfaisant")', 'Modéré'],
            [7, 'Bulletins de paie émis', 540, 30, 'Sondage aléatoire', 2, '=IFERROR(F{r}/D{r}*100,0)', '=IF(G{r}>5,"Non satisfaisant","Satisfaisant")', 'Faible'],
            [8, 'Avoirs clients accordés', 180, 30, 'Sondage ciblé', 6, '=IFERROR(F{r}/D{r}*100,0)', '=IF(G{r}>5,"Non satisfaisant","Satisfaisant")', 'Modéré'],
            [9, 'Comptes à régulariser', 95, 95, 'Exhaustif', 18, '=IFERROR(F{r}/D{r}*100,0)', '=IF(G{r}>5,"Non satisfaisant","Satisfaisant")', 'Critique'],
            [10, 'Immobilisations inscrites', 230, 45, 'Sondage aléatoire', 9, '=IFERROR(F{r}/D{r}*100,0)', '=IF(G{r}>5,"Non satisfaisant","Satisfaisant")', 'Élevé'],
          ],
          totalsRow: false,
          colWidths: [6, 30, 18, 14, 22, 18, 16, 22, 16],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 65,
  },

  // 8. xl_aud_cycles_comptables — Revue cycles comptables
  {
    code: 'xl_aud_cycles_comptables',
    name: 'Revue cycles comptables',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Revue des cycles comptables : assertions, tests réalisés, anomalies et conclusions d\'audit',
    price: 900, priceMax: 1500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'entite', label: 'Entité auditée', type: 'text', required: true },
      { name: 'exercice', label: 'Exercice contrôlé', type: 'text', required: true },
      { name: 'auditeur', label: 'Auditeur', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Cycles Comptables',
          title: 'Revue des Cycles Comptables',
          colorHeader: '4A148C',
          headers: ['Cycle', 'Comptes concernés', 'Assertions testées', 'Tests effectués', 'Anomalies détectées', 'Montant anomalies (FCFA)', 'Conclusion', 'Risque résiduel'],
          rows: [
            ['Ventes & clients', '411x, 701x-707x', 'Exhaustivité, Réalité', 'Circularisation clients (30)', 'Solde divergent x2', 850000, 'Satisfaisant', 'Faible'],
            ['Achats & fournisseurs', '401x, 601x-607x', 'Exactitude, Coupure', 'Revue factures + cut-off', '3 factures coupure N+1', 1200000, 'Insuffisant', 'Modéré'],
            ['Trésorerie', '512x, 514x', 'Existence, Évaluation', 'Rapprochement bancaire', 'Écart non justifié x1', 320000, 'Satisfaisant', 'Faible'],
            ['Stocks', '31x-37x', 'Évaluation, Exhaustivité', 'Observation inventaire', 'Écart valorisation 5%', 2800000, 'Insuffisant', 'Élevé'],
            ['Immobilisations', '21x-28x', 'Existence, Droits', 'Inspection physique + titre', 'Bien non trouvé x3', 4500000, 'Non satisfaisant', 'Élevé'],
            ['Capitaux propres', '10x-12x', 'Exactitude, Présentation', 'Revue variation capitaux', 'Aucune anomalie', 0, 'Satisfaisant', 'Faible'],
            ['Dettes financières', '16x', 'Exhaustivité, Évaluation', 'Confirmation banques', 'Intérêts courus omis', 680000, 'Insuffisant', 'Modéré'],
            ['Charges de personnel', '64x, 421x', 'Exactitude, Droits', 'Revue paie 3 mois', 'Doublon salarié x1', 1850000, 'Non satisfaisant', 'Critique'],
            ['Fiscalité différée', '444x, 447x', 'Exhaustivité, Évaluation', 'Revue calcul impôt', 'Base imposable sous-évaluée', 950000, 'Insuffisant', 'Modéré'],
            ['Résultat & affectation', '12x, 69x-79x', 'Exactitude, Présentation', 'Contrôle annuel résultat', 'Aucune anomalie', 0, 'Satisfaisant', 'Faible'],
          ],
          totalsRow: false,
          colWidths: [22, 18, 26, 26, 22, 22, 18, 16],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 67,
  },

  // 9. xl_aud_immobilisations — Audit immobilisations
  {
    code: 'xl_aud_immobilisations',
    name: 'Audit immobilisations',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Audit des immobilisations : valeur brute, amortissements, VNC et anomalies détectées',
    price: 800, priceMax: 1400, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'entite', label: 'Entité', type: 'text', required: true },
      { name: 'date_inventaire', label: 'Date d\'inventaire', type: 'date', required: true },
      { name: 'auditeur', label: 'Auditeur', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Audit Immobilisations',
          title: 'Audit des Immobilisations',
          colorHeader: '4A148C',
          headers: ['N° Bien', 'Désignation', 'Catégorie', 'Valeur brute (FCFA)', 'Amort. cumulés (FCFA)', 'VNC (FCFA)', 'Présent physiquement', 'État', 'Observations'],
          rows: [
            ['IMM-001', 'Immeuble siège social', 'Immobilier', 85000000, 12750000, '=D{r}-E{r}', 'Oui', 'Bon', ''],
            ['IMM-002', 'Véhicule Toyota Land Cruiser', 'Transport', 22500000, 13500000, '=D{r}-E{r}', 'Oui', 'Bon', ''],
            ['IMM-003', 'Groupe électrogène 150 KVA', 'Équipement', 8500000, 5950000, '=D{r}-E{r}', 'Oui', 'Dégradé', 'Maintenance urgente requise'],
            ['IMM-004', 'Serveur informatique Dell', 'Informatique', 4200000, 4200000, '=D{r}-E{r}', 'Non', 'Inconnu', 'Bien introuvable — vol probable'],
            ['IMM-005', 'Climatisation bureau direction', 'Équipement', 1800000, 1260000, '=D{r}-E{r}', 'Oui', 'Bon', ''],
            ['IMM-006', 'Mobilier salle de réunion', 'Mobilier', 3500000, 2100000, '=D{r}-E{r}', 'Oui', 'Bon', ''],
            ['IMM-007', 'Véhicule Peugeot 308 commercial', 'Transport', 12000000, 9600000, '=D{r}-E{r}', 'Oui', 'Moyen', 'Carrosserie endommagée'],
            ['IMM-008', 'Logiciel comptable ERP', 'Incorporel', 6500000, 3900000, '=D{r}-E{r}', 'N/A', 'Actif', ''],
            ['IMM-009', 'Matériel de pesage industriel', 'Équipement', 2800000, 2800000, '=D{r}-E{r}', 'Non', 'Inconnu', 'Non retrouvé lors de l\'inventaire'],
            ['IMM-010', 'Terrain industriel Yopougon', 'Immobilier', 45000000, 0, '=D{r}-E{r}', 'Oui', 'N/A', 'Titre foncier à jour'],
          ],
          totalsRow: true,
          colWidths: [12, 30, 16, 20, 20, 18, 20, 12, 28],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 66,
  },

  // 10. xl_aud_stocks_physique — Inventaire physique stocks
  {
    code: 'xl_aud_stocks_physique',
    name: 'Inventaire physique stocks',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Inventaire physique contradictoire des stocks : comparaison théorique vs physique et valorisation des écarts',
    price: 700, priceMax: 1200, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'entite', label: 'Entité', type: 'text', required: true },
      { name: 'date_inventaire', label: 'Date d\'inventaire', type: 'date', required: true },
      { name: 'responsable', label: 'Responsable inventaire', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Inventaire Stocks',
          title: 'Inventaire Physique des Stocks',
          colorHeader: '4A148C',
          headers: ['Référence', 'Désignation article', 'Unité', 'Stock théorique', 'Stock physique', 'Écart (qté)', 'Prix unitaire (FCFA)', 'Valeur écart (FCFA)', 'Cause présumée'],
          rows: [
            ['ART-001', 'Ciment Portland 50 kg', 'Sac', 450, 432, '=E{r}-D{r}', 8500, '=F{r}*G{r}', 'Pertes transport'],
            ['ART-002', 'Fer à béton 12 mm (barre)', 'Barre', 1200, 1185, '=E{r}-D{r}', 12000, '=F{r}*G{r}', 'Erreur comptage'],
            ['ART-003', 'Peinture acrylique blanche (20L)', 'Bidon', 85, 80, '=E{r}-D{r}', 45000, '=F{r}*G{r}', 'Évaporation / déversement'],
            ['ART-004', 'Câble électrique 2,5 mm² (rouleau)', 'Rouleau', 320, 325, '=E{r}-D{r}', 28000, '=F{r}*G{r}', 'Bon — excédent entrée'],
            ['ART-005', 'Carrelage 60x60 (m²)', 'm²', 2400, 2280, '=E{r}-D{r}', 9500, '=F{r}*G{r}', 'Casse stockage'],
            ['ART-006', 'Tube PVC 100 mm (barre 6m)', 'Barre', 560, 548, '=E{r}-D{r}', 6500, '=F{r}*G{r}', 'Pertes coupe'],
            ['ART-007', 'Huile moteur 5W30 (5L)', 'Bidon', 180, 168, '=E{r}-D{r}', 22000, '=F{r}*G{r}', 'Usage interne non enregistré'],
            ['ART-008', 'Papier rame A4 500f', 'Rame', 950, 940, '=E{r}-D{r}', 3500, '=F{r}*G{r}', 'Usage bureau non saisi'],
            ['ART-009', 'Détergent industriel (25L)', 'Bidon', 120, 108, '=E{r}-D{r}', 18000, '=F{r}*G{r}', 'Sortie non enregistrée'],
            ['ART-010', 'Batterie onduleur 200 Ah', 'Unité', 24, 22, '=E{r}-D{r}', 185000, '=F{r}*G{r}', 'Vol suspecté'],
          ],
          totalsRow: true,
          colWidths: [12, 28, 10, 16, 14, 14, 20, 20, 24],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 71,
  },

  // 11. xl_aud_tresorerie_audit — Audit trésorerie
  {
    code: 'xl_aud_tresorerie_audit',
    name: 'Audit trésorerie',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Audit des comptes de trésorerie : rapprochement soldes relevés bancaires vs comptabilité et analyse des écarts',
    price: 800, priceMax: 1400, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'entite', label: 'Entité auditée', type: 'text', required: true },
      { name: 'date_arrete', label: 'Date d\'arrêté', type: 'date', required: true },
      { name: 'auditeur', label: 'Auditeur', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Audit Trésorerie',
          title: 'Audit des Comptes de Trésorerie',
          colorHeader: '4A148C',
          headers: ['Compte', 'Banque / Institution', 'N° Compte', 'Solde relevé (FCFA)', 'Solde comptable (FCFA)', 'Écart brut (FCFA)', 'Éléments de rapprochement', 'Écart inexpliqué', 'Statut'],
          rows: [
            ['512100', 'Société Générale CI', 'CI0001234567', 48500000, 47850000, '=D{r}-E{r}', 'Chèque en transit : 650 000', 0, '=IF(H{r}=0,"OK","À justifier")'],
            ['512200', 'BICICI', 'CI9876543210', 12300000, 12300000, '=D{r}-E{r}', 'Aucun', 0, '=IF(H{r}=0,"OK","À justifier")'],
            ['512300', 'Ecobank CI', 'EC4567891234', 8750000, 8420000, '=D{r}-E{r}', 'Virement en cours : 330 000', 0, '=IF(H{r}=0,"OK","À justifier")'],
            ['512400', 'NSIA Banque', 'NS1122334455', 5200000, 5850000, '=D{r}-E{r}', 'Frais bancaires non comptabilisés', -650000, '=IF(H{r}=0,"OK","À justifier")'],
            ['514100', 'Caisse principale', 'N/A', 850000, 1050000, '=D{r}-E{r}', 'Avances non comptabilisées', -200000, '=IF(H{r}=0,"OK","À justifier")'],
            ['514200', 'Caisse agence Bouaké', 'N/A', 320000, 320000, '=D{r}-E{r}', 'Aucun', 0, '=IF(H{r}=0,"OK","À justifier")'],
            ['514300', 'Caisse agence Abidjan N.', 'N/A', 480000, 480000, '=D{r}-E{r}', 'Aucun', 0, '=IF(H{r}=0,"OK","À justifier")'],
            ['512500', 'Orabank CI', 'OR2233445566', 22100000, 22100000, '=D{r}-E{r}', 'Aucun', 0, '=IF(H{r}=0,"OK","À justifier")'],
            ['512600', 'UBA CI — USD', 'UBA987654321', 14500000, 14500000, '=D{r}-E{r}', 'Aucun (EUR/USD converti)', 0, '=IF(H{r}=0,"OK","À justifier")'],
            ['519000', 'Concours bancaires CT', 'CI0000123456', -3200000, -3200000, '=D{r}-E{r}', 'Aucun', 0, '=IF(H{r}=0,"OK","À justifier")'],
          ],
          totalsRow: true,
          colWidths: [10, 22, 16, 20, 20, 18, 30, 18, 14],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 73,
  },

  // 12. xl_aud_achats — Audit cycle achats
  {
    code: 'xl_aud_achats',
    name: 'Audit cycle achats',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Audit du cycle achats-fournisseurs : commandes, réception, facturation, paiements et anomalies',
    price: 900, priceMax: 1500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'entite', label: 'Entité auditée', type: 'text', required: true },
      { name: 'periode', label: 'Période auditée', type: 'text', required: true },
      { name: 'auditeur', label: 'Auditeur', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Audit Achats',
          title: 'Audit du Cycle Achats',
          colorHeader: '4A148C',
          headers: ['Réf. BC', 'Fournisseur', 'Objet', 'Montant BC (FCFA)', 'Réf. Facture', 'Montant Facture (FCFA)', 'Paiement effectué', 'Anomalie détectée', 'Gravité'],
          rows: [
            ['BC-2025-001', 'SITACI', 'Fournitures bureau', 850000, 'FAC-SITA-441', 850000, 'Oui', 'Aucune', 'Nulle'],
            ['BC-2025-002', 'PALMCI', 'Huiles industrielles', 2400000, 'FAC-PAL-882', 2650000, 'Oui', 'Facture > BC de 250 000 FCFA', 'Élevée'],
            ['BC-2025-003', 'AGORA BTP', 'Matériaux construction', 12500000, 'FAC-AGB-114', 12500000, 'Oui', 'Aucune', 'Nulle'],
            ['BC-2025-004', 'TECHNO INFO', 'Ordinateurs portables', 6800000, 'FAC-TI-229', 6800000, 'Oui', 'Pas de mise en concurrence', 'Modérée'],
            ['BC-2025-005', 'SETAO CI', 'Transport marchandises', 3200000, 'FAC-SET-773', 3200000, 'Non', 'Facture non encore payée (60j)', 'Modérée'],
            ['BC-2025-006', 'CARREFOUR CI', 'Consommables divers', 420000, 'FAC-CAR-556', 420000, 'Oui', 'Aucune', 'Nulle'],
            ['BC-2025-007', 'FOURNISSEUR INCONNU', 'Prestations diverses', 5500000, 'FAC-INC-001', 5500000, 'Oui', 'Fournisseur non référencé', 'Critique'],
            ['BC-2025-008', 'PERENCO', 'Carburant', 1800000, 'FAC-PER-334', 1800000, 'Oui', 'Aucune', 'Nulle'],
            ['BC-2025-009', 'SOUMAHORO & FRÈRES', 'Entretien locaux', 980000, 'FAC-SF-667', 1180000, 'Oui', 'Facture > BC de 200 000 FCFA', 'Élevée'],
            ['BC-2025-010', 'GROUPEMENT CI', 'Sécurité et gardiennage', 2500000, 'FAC-GCI-889', 2500000, 'Oui', 'Contrat expiré depuis 3 mois', 'Élevée'],
          ],
          totalsRow: false,
          colWidths: [14, 22, 24, 18, 16, 20, 18, 30, 12],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 69,
  },

  // 13. xl_aud_paie_controle — Contrôle paie
  {
    code: 'xl_aud_paie_controle',
    name: 'Contrôle paie',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Contrôle de la paie mensuelle : effectifs, masse salariale, charges sociales et anomalies',
    price: 900, priceMax: 1500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'entite', label: 'Entité', type: 'text', required: true },
      { name: 'mois', label: 'Mois contrôlé', type: 'text', required: true },
      { name: 'auditeur', label: 'Auditeur', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Contrôle Paie',
          title: 'Contrôle de la Paie',
          colorHeader: '4A148C',
          headers: ['Département', 'Effectif théorique', 'Effectif bulletins', 'Écart effectif', 'Masse salariale brute (FCFA)', 'Charges patronales (FCFA)', 'Total charges (FCFA)', 'Anomalies', 'Taux erreur %'],
          rows: [
            ['Direction Générale', 5, 5, '=C{r}-B{r}', 12500000, '=E{r}*0.25', '=E{r}+F{r}', 'Aucune', 0],
            ['Direction Financière', 12, 12, '=C{r}-B{r}', 18600000, '=E{r}*0.25', '=E{r}+F{r}', 'Aucune', 0],
            ['Direction Commerciale', 25, 26, '=C{r}-B{r}', 28500000, '=E{r}*0.25', '=E{r}+F{r}', '1 bulletin suspect (doublon)', 3.8],
            ['Direction des Achats', 8, 8, '=C{r}-B{r}', 11200000, '=E{r}*0.25', '=E{r}+F{r}', 'Aucune', 0],
            ['Direction RH', 10, 10, '=C{r}-B{r}', 14300000, '=E{r}*0.25', '=E{r}+F{r}', 'Salaire base modifié x2', 2.0],
            ['Direction SI', 7, 7, '=C{r}-B{r}', 15800000, '=E{r}*0.25', '=E{r}+F{r}', 'Aucune', 0],
            ['Logistique / Entrepôt', 18, 18, '=C{r}-B{r}', 16200000, '=E{r}*0.25', '=E{r}+F{r}', 'Prime non justifiée x1', 1.5],
            ['Agence Abidjan Nord', 15, 16, '=C{r}-B{r}', 14500000, '=E{r}*0.25', '=E{r}+F{r}', '1 employé fictif suspecté', 6.3],
            ['Agence Bouaké', 12, 12, '=C{r}-B{r}', 10800000, '=E{r}*0.25', '=E{r}+F{r}', 'Aucune', 0],
            ['Sécurité / Gardiennage', 20, 20, '=C{r}-B{r}', 9600000, '=E{r}*0.25', '=E{r}+F{r}', 'Aucune', 0],
          ],
          totalsRow: true,
          colWidths: [24, 16, 16, 14, 24, 22, 20, 26, 14],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 72,
  },

  // 14. xl_aud_fiscal — Revue fiscale
  {
    code: 'xl_aud_fiscal',
    name: 'Revue fiscale',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Revue des obligations fiscales : impôts déclarés vs recalculés, écarts et risques de redressement',
    price: 1000, priceMax: 1800, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'entite', label: 'Entité', type: 'text', required: true },
      { name: 'exercice', label: 'Exercice fiscal', type: 'text', required: true },
      { name: 'auditeur', label: 'Auditeur fiscal', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Revue Fiscale',
          title: 'Revue Fiscale',
          colorHeader: '4A148C',
          headers: ['Impôt / Taxe', 'Base imposable déclarée', 'Taux (%)', 'Montant déclaré (FCFA)', 'Base recalculée', 'Montant recalculé (FCFA)', 'Écart (FCFA)', 'Risque redressement', 'Commentaire'],
          rows: [
            ['TVA (mensuelle moy.)', 85000000, 18, 15300000, 88500000, '=E{r}*C{r}/100', '=F{r}-D{r}', '=IF(G{r}>0,"OUI","NON")', 'Base minorée de 3,5 M FCFA'],
            ['Impôt BIC', 420000000, 25, 105000000, 435000000, '=E{r}*C{r}/100', '=F{r}-D{r}', '=IF(G{r}>0,"OUI","NON")', 'Charges non déductibles omises'],
            ['IRVM (dividendes)', 50000000, 15, 7500000, 50000000, '=E{r}*C{r}/100', '=F{r}-D{r}', '=IF(G{r}>0,"OUI","NON")', 'OK'],
            ['Retenue à la source salaires', 85000000, 12, 10200000, 86500000, '=E{r}*C{r}/100', '=F{r}-D{r}', '=IF(G{r}>0,"OUI","NON")', 'Léger écart base'],
            ['Patente', 0, 0, 1850000, 0, 1850000, '=F{r}-D{r}', '=IF(G{r}>0,"OUI","NON")', 'Montant fixe — OK'],
            ['Taxe sur les salaires (CNPS)', 170000000, 16.4, 27880000, 172000000, '=E{r}*C{r}/100', '=F{r}-D{r}', '=IF(G{r}>0,"OUI","NON")', 'Écart mineur base'],
            ['Retenue à la source fournisseurs', 35000000, 5, 1750000, 38500000, '=E{r}*C{r}/100', '=F{r}-D{r}', '=IF(G{r}>0,"OUI","NON")', 'Montants non soumis inclus à tort'],
            ['Taxe foncière', 0, 0, 850000, 0, 850000, '=F{r}-D{r}', '=IF(G{r}>0,"OUI","NON")', 'Montant fixe — OK'],
            ['Contribution des patentes', 0, 0, 320000, 0, 420000, '=F{r}-D{r}', '=IF(G{r}>0,"OUI","NON")', 'Calcul à revoir'],
            ['Acomptes IS', 420000000, 1, 4200000, 435000000, '=E{r}*C{r}/100', '=F{r}-D{r}', '=IF(G{r}>0,"OUI","NON")', 'Acomptes sous-provisionnés'],
          ],
          totalsRow: false,
          colWidths: [28, 22, 10, 22, 20, 22, 18, 18, 28],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 75,
  },

  // 15. xl_aud_gouvernance — Évaluation gouvernance
  {
    code: 'xl_aud_gouvernance',
    name: 'Évaluation gouvernance',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Évaluation de la gouvernance selon le cadre COSO : critères, notation, commentaires et recommandations',
    price: 1200, priceMax: 2000, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'entite', label: 'Entité évaluée', type: 'text', required: true },
      { name: 'exercice', label: 'Exercice', type: 'text', required: true },
      { name: 'auditeur', label: 'Auditeur / Évaluateur', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Gouvernance COSO',
          title: 'Évaluation Gouvernance — Référentiel COSO',
          colorHeader: '4A148C',
          headers: ['Composante COSO', 'Critère d\'évaluation', 'Note (1-5)', 'Pondération (%)', 'Score pondéré', 'Niveau atteint', 'Recommandation'],
          rows: [
            ['Environnement de contrôle', 'Tone at the top et culture d\'intégrité', 4, 20, '=C{r}*D{r}/100', '=IF(E{r}>=0.8,"Excellent",IF(E{r}>=0.6,"Satisfaisant",IF(E{r}>=0.4,"Partiel","Insuffisant")))', 'Formaliser la charte éthique'],
            ['Environnement de contrôle', 'Compétences et formation du personnel', 3, 10, '=C{r}*D{r}/100', '=IF(E{r}>=0.8,"Excellent",IF(E{r}>=0.6,"Satisfaisant",IF(E{r}>=0.4,"Partiel","Insuffisant")))', 'Plan de formation annuel à établir'],
            ['Évaluation des risques', 'Identification et évaluation des risques', 3, 15, '=C{r}*D{r}/100', '=IF(E{r}>=0.8,"Excellent",IF(E{r}>=0.6,"Satisfaisant",IF(E{r}>=0.4,"Partiel","Insuffisant")))', 'Cartographie des risques à actualiser'],
            ['Évaluation des risques', 'Tolérance aux risques définie', 2, 10, '=C{r}*D{r}/100', '=IF(E{r}>=0.8,"Excellent",IF(E{r}>=0.6,"Satisfaisant",IF(E{r}>=0.4,"Partiel","Insuffisant")))', 'Définir les seuils de tolérance'],
            ['Activités de contrôle', 'Séparation des tâches', 4, 15, '=C{r}*D{r}/100', '=IF(E{r}>=0.8,"Excellent",IF(E{r}>=0.6,"Satisfaisant",IF(E{r}>=0.4,"Partiel","Insuffisant")))', 'Satisfaisant — maintenir'],
            ['Activités de contrôle', 'Contrôles informatiques (accès, sauvegardes)', 2, 10, '=C{r}*D{r}/100', '=IF(E{r}>=0.8,"Excellent",IF(E{r}>=0.6,"Satisfaisant",IF(E{r}>=0.4,"Partiel","Insuffisant")))', 'Déployer politique sécurité SI'],
            ['Information & Communication', 'Qualité et fiabilité du reporting interne', 3, 10, '=C{r}*D{r}/100', '=IF(E{r}>=0.8,"Excellent",IF(E{r}>=0.6,"Satisfaisant",IF(E{r}>=0.4,"Partiel","Insuffisant")))', 'Standardiser les tableaux de bord'],
            ['Information & Communication', 'Communication externe (parties prenantes)', 4, 5, '=C{r}*D{r}/100', '=IF(E{r}>=0.8,"Excellent",IF(E{r}>=0.6,"Satisfaisant",IF(E{r}>=0.4,"Partiel","Insuffisant")))', 'OK — rapport annuel publié'],
            ['Pilotage', 'Suivi des recommandations audit', 3, 3, '=C{r}*D{r}/100', '=IF(E{r}>=0.8,"Excellent",IF(E{r}>=0.6,"Satisfaisant",IF(E{r}>=0.4,"Partiel","Insuffisant")))', 'Taux de mise en œuvre à améliorer'],
            ['Pilotage', 'Évaluation périodique du dispositif de contrôle', 2, 2, '=C{r}*D{r}/100', '=IF(E{r}>=0.8,"Excellent",IF(E{r}>=0.6,"Satisfaisant",IF(E{r}>=0.4,"Partiel","Insuffisant")))', 'Planifier revues semestrielles'],
          ],
          totalsRow: false,
          colWidths: [26, 38, 12, 14, 14, 16, 34],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 68,
  },

  // 16. xl_aud_fraudes — Registre alertes fraude
  {
    code: 'xl_aud_fraudes',
    name: 'Registre alertes fraude',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Registre des signalements de fraude : nature, montant, investigation menée et conclusion',
    price: 1000, priceMax: 1800, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'entite', label: 'Entité', type: 'text', required: true },
      { name: 'responsable', label: 'Responsable investigation', type: 'text', required: true },
      { name: 'annee', label: 'Année', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Registre Fraudes',
          title: 'Registre des Alertes de Fraude',
          colorHeader: '4A148C',
          headers: ['Réf.', 'Date signalement', 'Source alerte', 'Nature présumée', 'Département concerné', 'Montant estimé (FCFA)', 'Investigation menée', 'Conclusion', 'Suites données'],
          rows: [
            ['FR-001', '12/01/2025', 'Audit interne', 'Employé fictif — paie', 'Agence Abidjan Nord', 7800000, 'Vérification fichiers RH + badges', 'Confirmée — 1 employé fantôme', 'Licenciement + plainte pénale'],
            ['FR-002', '18/01/2025', 'Lanceur d\'alerte', 'Double facturation fournisseur', 'Direction Achats', 2500000, 'Revue factures croisées', 'Partiellement confirmée', 'Redressement fournisseur'],
            ['FR-003', '25/01/2025', 'Contrôle caisse', 'Détournement caisse', 'Caisse agence Bouaké', 850000, 'Rapprochement caisse + CCTV', 'Confirmée — caissier', 'Saisine disciplinaire'],
            ['FR-004', '05/02/2025', 'Direction Générale', 'Conflits d\'intérêts achats', 'Direction Achats', 12000000, 'Audit fournisseurs + déclarations', 'Non confirmée', 'Classé sans suite'],
            ['FR-005', '14/02/2025', 'Contrôle interne', 'Faux bon de livraison', 'Logistique', 3200000, 'Contrôle BL + stocks', 'Confirmée — prestataire', 'Résiliation contrat + plainte'],
            ['FR-006', '28/02/2025', 'Audit interne', 'Surfacturation travaux', 'Direction Technique', 8500000, 'Comparaison devis + réalisé', 'En cours d\'investigation', 'Suspension paiement'],
            ['FR-007', '10/03/2025', 'Lanceur d\'alerte', 'Manipulation comptable', 'Direction Financière', 0, 'Revue écritures + logs SI', 'Non confirmée', 'Classé sans suite'],
            ['FR-008', '22/03/2025', 'Contrôle interne', 'Avances non remboursées', 'Direction Commerciale', 1850000, 'Revue livre de caisse', 'Confirmée — commercial', 'Retenue sur salaire'],
            ['FR-009', '08/04/2025', 'Audit interne', 'Stocks manquants suspects', 'Entrepôt', 4200000, 'Inventaire + analyse sorties', 'En cours d\'investigation', 'Blocage accès entrepôt'],
            ['FR-010', '19/04/2025', 'Direction RH', 'Faux diplômes recrutement', 'Direction RH', 0, 'Vérification auprès établissements', 'Confirmée — 2 employés', 'Licenciement pour faute grave'],
          ],
          totalsRow: false,
          colWidths: [10, 16, 20, 26, 22, 20, 30, 24, 26],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 74,
  },

  // 17. xl_aud_recommandations — Suivi recommandations audit
  {
    code: 'xl_aud_recommandations',
    name: 'Suivi recommandations audit',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Tableau de suivi de la mise en œuvre des recommandations d\'audit : priorité, responsable, échéance et avancement',
    price: 800, priceMax: 1400, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'entite', label: 'Entité', type: 'text', required: true },
      { name: 'responsable_audit', label: 'Responsable audit interne', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Suivi Recommandations',
          title: 'Suivi des Recommandations d\'Audit',
          colorHeader: '4A148C',
          headers: ['Réf.', 'Recommandation', 'Mission source', 'Priorité', 'Responsable mise en œuvre', 'Échéance', 'Avancement %', 'Statut', 'Commentaire suivi'],
          rows: [
            ['R-001', 'Mettre en place rapprochement bancaire mensuel', 'Audit trésorerie Jan-25', 'Haute', 'Chef comptable', '31/03/2025', 75, '=IF(G{r}=100,"Clôturé",IF(G{r}>=50,"En cours","Non démarré"))', 'Procédure rédigée, 3 mois réalisés'],
            ['R-002', 'Déployer politique de gestion des accès SI', 'Audit SI Fév-25', 'Haute', 'DSI', '30/06/2025', 30, '=IF(G{r}=100,"Clôturé",IF(G{r}>=50,"En cours","Non démarré"))', 'Étude en cours'],
            ['R-003', 'Réaliser inventaire physique semestriel', 'Audit stocks Fév-25', 'Moyenne', 'Responsable logistique', '30/04/2025', 50, '=IF(G{r}=100,"Clôturé",IF(G{r}>=50,"En cours","Non démarré"))', 'Procédure validée'],
            ['R-004', 'Régulariser les PV de conseil manquants', 'Audit gouvernance Mar-25', 'Haute', 'Secrétaire général', '31/03/2025', 100, '=IF(G{r}=100,"Clôturé",IF(G{r}>=50,"En cours","Non démarré"))', 'Clôturé le 28/03/2025'],
            ['R-005', 'Étiqueter toutes les immobilisations', 'Audit immob. Mar-25', 'Moyenne', 'DAF', '30/06/2025', 20, '=IF(G{r}=100,"Clôturé",IF(G{r}>=50,"En cours","Non démarré"))', 'En attente prestataire'],
            ['R-006', 'Auditer complet des effectifs', 'Audit paie Avr-25', 'Critique', 'DRH', '30/04/2025', 100, '=IF(G{r}=100,"Clôturé",IF(G{r}>=50,"En cours","Non démarré"))', 'Clôturé — 2 anomalies corrigées'],
            ['R-007', 'Formaliser la charte éthique', 'Audit gouvernance Mar-25', 'Moyenne', 'DG', '31/05/2025', 40, '=IF(G{r}=100,"Clôturé",IF(G{r}>=50,"En cours","Non démarré"))', 'Projet de charte rédigé'],
            ['R-008', 'Mettre en place calendrier fiscal automatisé', 'Revue fiscale Mar-25', 'Haute', 'Responsable fiscal', '30/04/2025', 100, '=IF(G{r}=100,"Clôturé",IF(G{r}>=50,"En cours","Non démarré"))', 'Clôturé — outil déployé'],
            ['R-009', 'Créer suivi des contrats fournisseurs', 'Audit achats Avr-25', 'Moyenne', 'DAF', '31/05/2025', 60, '=IF(G{r}=100,"Clôturé",IF(G{r}>=50,"En cours","Non démarré"))', 'Tableau de bord en test'],
            ['R-010', 'Plan de formation annuel du personnel', 'Audit gouvernance Mar-25', 'Faible', 'DRH', '30/09/2025', 10, '=IF(G{r}=100,"Clôturé",IF(G{r}>=50,"En cours","Non démarré"))', 'Diagnostic besoins en cours'],
          ],
          totalsRow: false,
          colWidths: [10, 36, 22, 12, 24, 14, 14, 14, 26],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 77,
  },

  // 18. xl_aud_budgetaire — Contrôle budgétaire
  {
    code: 'xl_aud_budgetaire',
    name: 'Contrôle budgétaire',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Contrôle budgétaire : comparaison budget initial, budget révisé, réalisé et analyse des écarts',
    price: 900, priceMax: 1500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'entite', label: 'Entité', type: 'text', required: true },
      { name: 'periode', label: 'Période', type: 'text', required: true },
      { name: 'auditeur', label: 'Auditeur / Contrôleur', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Contrôle Budgétaire',
          title: 'Contrôle Budgétaire',
          colorHeader: '4A148C',
          headers: ['Poste budgétaire', 'Budget initial (FCFA)', 'Budget révisé (FCFA)', 'Réalisé (FCFA)', 'Écart B.Révisé vs Réalisé', 'Taux réalisation %', 'Statut', 'Observation'],
          rows: [
            ['Chiffre d\'affaires', 850000000, 900000000, 875000000, '=D{r}-C{r}', '=IFERROR(D{r}/C{r}*100,0)', '=IF(F{r}>=95,"OK","Sous-réalisation")', 'Légèrement en deçà de l\'objectif révisé'],
            ['Achats & approvisionnements', 320000000, 310000000, 318000000, '=D{r}-C{r}', '=IFERROR(D{r}/C{r}*100,0)', '=IF(D{r}<=C{r},"OK","Dépassement")', 'Dépassement léger — fournisseurs'],
            ['Charges de personnel', 185000000, 192000000, 191500000, '=D{r}-C{r}', '=IFERROR(D{r}/C{r}*100,0)', '=IF(D{r}<=C{r},"OK","Dépassement")', 'Conforme au révisé'],
            ['Loyers & charges locatives', 24000000, 24000000, 24000000, '=D{r}-C{r}', '=IFERROR(D{r}/C{r}*100,0)', '=IF(D{r}<=C{r},"OK","Dépassement")', 'OK'],
            ['Marketing & communication', 35000000, 30000000, 42000000, '=D{r}-C{r}', '=IFERROR(D{r}/C{r}*100,0)', '=IF(D{r}<=C{r},"OK","Dépassement")', 'Dépassement significatif — campagne non budgétée'],
            ['Transport & logistique', 28000000, 31000000, 29500000, '=D{r}-C{r}', '=IFERROR(D{r}/C{r}*100,0)', '=IF(D{r}<=C{r},"OK","Dépassement")', 'Conforme'],
            ['Frais administratifs', 18000000, 18000000, 19200000, '=D{r}-C{r}', '=IFERROR(D{r}/C{r}*100,0)', '=IF(D{r}<=C{r},"OK","Dépassement")', 'Dépassement modéré'],
            ['Investissements', 95000000, 80000000, 72000000, '=D{r}-C{r}', '=IFERROR(D{r}/C{r}*100,0)', '=IF(F{r}>=85,"OK","Sous-consommation")', 'Report travaux Bouaké'],
            ['Charges financières', 12000000, 12000000, 11500000, '=D{r}-C{r}', '=IFERROR(D{r}/C{r}*100,0)', '=IF(D{r}<=C{r},"OK","Dépassement")', 'Légèrement en dessous'],
            ['Impôts & taxes', 45000000, 48000000, 51200000, '=D{r}-C{r}', '=IFERROR(D{r}/C{r}*100,0)', '=IF(D{r}<=C{r},"OK","Dépassement")', 'Dépassement — redressement fiscal'],
          ],
          totalsRow: true,
          colWidths: [28, 20, 20, 18, 22, 18, 18, 30],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 73,
  },

  // 19. xl_aud_marches — Audit marchés publics
  {
    code: 'xl_aud_marches',
    name: 'Audit marchés publics',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Audit de la passation des marchés publics : objet, montant, procédure, conformité et observations',
    price: 1200, priceMax: 2000, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'entite', label: 'Maître d\'ouvrage', type: 'text', required: true },
      { name: 'exercice', label: 'Exercice audité', type: 'text', required: true },
      { name: 'auditeur', label: 'Auditeur', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Audit Marchés',
          title: 'Audit des Marchés Publics',
          colorHeader: '4A148C',
          headers: ['N° Marché', 'Objet du marché', 'Attributaire', 'Montant (FCFA)', 'Procédure', 'Délai exécution', 'Conformité', 'Anomalies', 'Observations'],
          rows: [
            ['MP-2025-001', 'Construction bâtiment administratif', 'BTP AFRICA CI', 185000000, 'Appel d\'offres ouvert', '18 mois', 'Conforme', 'Aucune', 'Dossier complet'],
            ['MP-2025-002', 'Fourniture véhicules de service', 'AUTO ELITE CI', 82500000, 'Appel d\'offres restreint', '3 mois', 'Non conforme', 'Critères d\'éligibilité non publiés', 'Risque recours'],
            ['MP-2025-003', 'Maintenance informatique (3 ans)', 'TECHSOL', 24000000, 'Entente directe', '36 mois', 'Conforme', 'Aucune', 'Justification entente directe OK'],
            ['MP-2025-004', 'Études d\'impact environnemental', 'ECO CONSULT', 12500000, 'Consultation restreinte', '4 mois', 'Non conforme', 'Soumissionnaire unique — pas de concurrence', 'À régulariser'],
            ['MP-2025-005', 'Réhabilitation routes rurales', 'TRAVAUX PLUS', 350000000, 'Appel d\'offres international', '24 mois', 'Conforme', 'Aucune', 'Dossier conforme'],
            ['MP-2025-006', 'Prestation de gardiennage (1 an)', 'SÉCURI-WEST', 18000000, 'Consultation restreinte', '12 mois', 'Conforme', 'Aucune', 'Contrat signé dans délais'],
            ['MP-2025-007', 'Fourniture équipements électriques', 'ELEC IMPORT CI', 65000000, 'Appel d\'offres ouvert', '2 mois', 'Non conforme', 'Offre retenue non la moins-disante', 'Décision DG requise'],
            ['MP-2025-008', 'Nettoyage et entretien locaux (1 an)', 'PROPRECI', 9600000, 'Entente directe', '12 mois', 'Non conforme', 'Seuil entente directe dépassé', 'Procédure incorrecte'],
            ['MP-2025-009', 'Audit externe annuel', 'KPMG CI', 25000000, 'Consultation restreinte', '6 mois', 'Conforme', 'Aucune', 'Dossier complet'],
            ['MP-2025-010', 'Formation du personnel cadre', 'CABINET FORMA', 14500000, 'Consultation restreinte', '3 mois', 'Conforme', 'Aucune', 'Rapport formation attendu'],
          ],
          totalsRow: false,
          colWidths: [14, 30, 20, 18, 26, 16, 14, 30, 22],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 70,
  },

  // 20. xl_aud_rapport_synth — Synthèse rapport audit
  {
    code: 'xl_aud_rapport_synth',
    name: 'Synthèse rapport audit',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Synthèse du rapport d\'audit : constats, risques, recommandations prioritaires et score global',
    price: 1000, priceMax: 1800, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'entite', label: 'Entité auditée', type: 'text', required: true },
      { name: 'mission', label: 'Intitulé de la mission', type: 'text', required: true },
      { name: 'auditeur', label: 'Auditeur responsable', type: 'text', required: true },
      { name: 'date_rapport', label: 'Date du rapport', type: 'date', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Synthèse Rapport',
          title: 'Synthèse du Rapport d\'Audit',
          colorHeader: '4A148C',
          headers: ['Domaine audité', 'Nb constatations', 'Nb critiques', 'Nb élevées', 'Nb modérées', 'Nb faibles', 'Score domaine /100', 'Niveau de risque', 'Recommandation prioritaire'],
          rows: [
            ['Trésorerie & Banque', 5, 0, 2, 2, 1, 72, '=IF(G{r}>=80,"Faible",IF(G{r}>=60,"Modéré",IF(G{r}>=40,"Élevé","Critique")))', 'Rapprochements bancaires mensuels obligatoires'],
            ['Achats & Fournisseurs', 6, 1, 2, 2, 1, 55, '=IF(G{r}>=80,"Faible",IF(G{r}>=60,"Modéré",IF(G{r}>=40,"Élevé","Critique")))', 'Systématiser BC avant tout paiement'],
            ['Paie & Ressources Humaines', 4, 1, 1, 1, 1, 48, '=IF(G{r}>=80,"Faible",IF(G{r}>=60,"Modéré",IF(G{r}>=40,"Élevé","Critique")))', 'Audit exhaustif des effectifs immédiat'],
            ['Comptabilité & Clôture', 5, 0, 1, 3, 1, 68, '=IF(G{r}>=80,"Faible",IF(G{r}>=60,"Modéré",IF(G{r}>=40,"Élevé","Critique")))', 'Compléter les pièces justificatives manquantes'],
            ['Fiscal & Réglementaire', 4, 0, 2, 1, 1, 62, '=IF(G{r}>=80,"Faible",IF(G{r}>=60,"Modéré",IF(G{r}>=40,"Élevé","Critique")))', 'Mettre en place calendrier fiscal automatisé'],
            ['Immobilisations', 6, 0, 3, 2, 1, 50, '=IF(G{r}>=80,"Faible",IF(G{r}>=60,"Modéré",IF(G{r}>=40,"Élevé","Critique")))', 'Créer registre des biens complet et à jour'],
            ['Stocks & Logistique', 5, 0, 2, 2, 1, 58, '=IF(G{r}>=80,"Faible",IF(G{r}>=60,"Modéré",IF(G{r}>=40,"Élevé","Critique")))', 'Inventaire contradictoire semestriel'],
            ['Systèmes d\'Information', 5, 1, 2, 1, 1, 42, '=IF(G{r}>=80,"Faible",IF(G{r}>=60,"Modéré",IF(G{r}>=40,"Élevé","Critique")))', 'Déployer politique de sécurité des accès'],
            ['Gouvernance & Conformité', 4, 1, 1, 2, 0, 45, '=IF(G{r}>=80,"Faible",IF(G{r}>=60,"Modéré",IF(G{r}>=40,"Élevé","Critique")))', 'Régulariser PV et délégations de pouvoir'],
            ['SCORE GLOBAL', '=SUM(B2:B10)', '=SUM(C2:C10)', '=SUM(D2:D10)', '=SUM(E2:E10)', '=SUM(F2:F10)', '=ROUND(AVERAGE(G2:G10),1)', '=IF(G{r}>=80,"Faible",IF(G{r}>=60,"Modéré",IF(G{r}>=40,"Élevé","Critique")))', 'Voir plan d\'actions correctives complet'],
          ],
          totalsRow: false,
          colWidths: [26, 16, 14, 14, 14, 12, 18, 16, 36],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 80,
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
  console.log(`✅ Excel Audit: ${created} créés — Total BDD: ${total}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
