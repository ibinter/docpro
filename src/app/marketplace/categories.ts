// Les catégories officielles de documents (mêmes codes que DocumentTemplate.category).
export const MARKETPLACE_CATEGORIES: Record<string, string> = {
  rh_emploi: 'RH & Emploi',
  juridique_admin: 'Juridique & Administratif',
  commercial: 'Commercial & Marketing',
  communication: 'Communication',
  comptabilite_audit: 'Comptabilité & Audit',
  finance_banque: 'Finance & Banque',
  informatique_tech: 'Informatique & Tech',
  gestion_management: 'Gestion & Management',
  gestion_projet: 'Gestion de Projet',
  qhse: 'QHSE',
  entrepreneuriat: 'Entrepreneuriat',
  academique: 'Académique',
  sante: 'Santé',
  immobilier: 'Immobilier',
  association: 'Association',
  btp_construction: 'BTP & Construction',
  assurance: 'Assurance',
  transport_logistique: 'Transport & Logistique',
  agro_environnement: 'Agro & Environnement',
};

/** Prix autorisés pour un template marketplace (FCFA). */
export const MKT_PRICE_MIN = 100;
export const MKT_PRICE_MAX = 10000;

/** Préfixe des codes de templates issus de la marketplace. */
export const MKT_CODE_PREFIX = 'mkt_';

/** Part créateur : 30 % des ventes (CDC §7.3). */
export const MKT_CREATOR_SHARE = 0.3;

export const FIELD_TYPES = ['text', 'email', 'date', 'textarea', 'select'] as const;
export type MktFieldType = (typeof FIELD_TYPES)[number];

