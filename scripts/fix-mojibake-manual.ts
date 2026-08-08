// Corrections manuelles des 32 modèles à encodage mixte que fix-mojibake.ts
// ne pouvait pas décoder automatiquement (parties saines + séquences cassées).
// Corrections produites par relecture, clé stable = code du modèle.
// Usage : npx tsx scripts/fix-mojibake-manual.ts
import { prisma } from '../src/lib/db';

const FIXES: { code: string; name: string; description: string }[] = [
  { code: 'bank_bon_de_caisse', name: 'Accord de bon de caisse', description: "Émission d'un bon de caisse nominatif par une banque, représentant un placement à court terme au profit d'un souscripteur." },
  { code: 'scrum_001', name: 'Definition of Done – Équipe Scrum', description: "Document officiel de la Definition of Done validée par l'équipe Scrum." },
  { code: 'scrum_004', name: 'Charte Équipe Scrum', description: "Document de charte définissant les accords de travail de l'équipe Scrum." },
  { code: 'scrum_009', name: 'Rapport de Vélocité Équipe', description: 'Tableau de bord de vélocité Scrum par sprint sur un trimestre.' },
  { code: 'sprint_004', name: 'Daily Scrum – Compte-rendu', description: 'Fiche de relevé quotidien du Daily Scrum pour traçabilité.' },
  { code: 'sprint_005', name: 'Sprint Goal – Fiche Objectif', description: "Document formalisant l'objectif du sprint et les critères de succès." },
  { code: 'backlog_001', name: 'Product Backlog – Inventaire Initial', description: "Document d'inventaire initial du product backlog avec priorisation MoSCoW." },
  { code: 'backlog_002', name: 'Backlog Raffiné – Atelier Grooming', description: "Résultat d'un atelier de backlog grooming avec estimations Story Points." },
  { code: 'backlog_004', name: 'Fiche Épique Produit', description: "Description structurée d'une épique avec ses user stories associées." },
  { code: 'backlog_007', name: 'PV de Recette – Procès-Verbal', description: 'Procès-verbal officiel de recette signé par le client et le prestataire.' },
  { code: 'backlog_008', name: "PV VABF – Vérification d'Aptitude", description: "Procès-verbal de Vérification d'Aptitude au Bon Fonctionnement (VABF)." },
  { code: 'backlog_009', name: 'PV VSR – Vérification de Service Régulier', description: 'Procès-verbal de Vérification de Service Régulier après période de garantie.' },
  { code: 'kanban_001', name: 'Tableau Kanban – Configuration Initiale', description: "Document de configuration d'un tableau Kanban avec colonnes et limites WIP." },
  { code: 'kanban_003', name: 'Matrice de Compétences Équipe', description: "Cartographie des compétences de l'équipe dans une approche Kanban." },
  { code: 'kanban_005', name: 'Plan de Suivi-Évaluation Projet', description: 'Document cadre de suivi et évaluation des indicateurs de performance projet.' },
  { code: 'kanban_007', name: 'Termes de Référence – Consultant', description: "Termes de référence pour le recrutement ou la mission d'un consultant externe." },
  { code: 'moa_001', name: 'Contrat MOA/MOE – Accord Général', description: "Contrat type encadrant la relation entre Maîtrise d'Ouvrage et Maîtrise d'Œuvre." },
  { code: 'entr_002', name: 'Étude de Marché Startup', description: 'Analyse complète du marché cible pour une startup en phase de lancement.' },
  { code: 'entr_012', name: 'Étude de Faisabilité', description: "Analyse de viabilité technique, commerciale et financière d'un projet." },
  { code: 'lean_canvas_002', name: 'Lean Canvas — Segment Clients', description: "Lean Canvas centré sur l'identification et la segmentation des clients cibles." },
  { code: 'lean_canvas_003', name: 'Lean Canvas — Revenus et Coûts', description: 'Lean Canvas axé sur les flux de revenus et la structure des coûts.' },
  { code: 'lean_canvas_004', name: 'Lean Canvas — Avantage Concurrentiel', description: "Lean Canvas mettant en avant l'avantage concurrentiel et les métriques clés." },
  { code: 'lean_canvas_007', name: 'Lean Canvas — MVP Validation', description: 'Lean Canvas orienté validation du produit minimum viable (MVP).' },
  { code: 'bplan_008', name: 'Business Plan Éducation / Formation', description: 'Business plan pour un centre de formation, école privée ou plateforme e-learning.' },
  { code: 'bplan_009', name: 'Business Plan Énergie Renouvelable', description: "Business plan pour un projet d'énergie solaire, éolienne ou bioénergie." },
  { code: 'qualite_010', name: "Registre d'Étalonnage des Équipements", description: 'Suivi des étalonnages périodiques des instruments de mesure et de contrôle.' },
  { code: 'smq_009', name: 'Indicateurs KPI Qualité — Tableau de Suivi', description: 'Suivi mensuel des indicateurs de performance qualité (taux de rebut, satisfaction, délais).' },
  { code: 'non_conf_003', name: 'Registre des Non-Conformités — Suivi Global', description: 'Tableau de bord listant toutes les NC ouvertes et fermées avec leur statut.' },
  { code: 'non_conf_005', name: 'Analyse des Causes — Méthode 5 Pourquoi', description: "Outil d'analyse des causes profondes d'une non-conformité par la méthode des 5 Pourquoi." },
  { code: 'non_conf_007', name: 'Mise en Quarantaine — Étiquette et Rapport', description: "Rapport et étiquette de mise en quarantaine d'un produit non conforme." },
  { code: 'amelio_002', name: "Plan d'Action 5S", description: 'Plan de mise en œuvre et de suivi de la démarche 5S dans un atelier ou bureau.' },
  { code: 'haccp_001', name: 'Plan HACCP — Analyse des Dangers', description: 'Analyse des dangers biologiques, chimiques et physiques par étape du procédé.' },
];

async function main() {
  let ok = 0, absents = 0;
  for (const f of FIXES) {
    const res = await prisma.documentTemplate.updateMany({
      where: { code: f.code },
      data: { name: f.name, description: f.description },
    });
    if (res.count > 0) ok++; else { absents++; console.warn(`  (code introuvable : ${f.code})`); }
  }
  console.log(`✓ ${ok} modèles corrigés${absents ? `, ${absents} codes introuvables` : ''}.`);
  await prisma.$disconnect();
}
main();
