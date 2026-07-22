// Seed « CV Professionnels — 30 templates sectoriels » IBIG DocPro
// Exécution : npx tsx prisma/seed-cv-pro.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const F = (fields: object[]) => JSON.stringify(fields);

// ─── CHAMPS COMMUNS RÉUTILISABLES ───
const baseFields = [
  { key: 'prenom_nom', label: 'Prénom et Nom complet', type: 'text', required: true },
  { key: 'titre_poste', label: 'Titre / Poste visé', type: 'text', required: true },
  { key: 'email', label: 'Adresse e-mail professionnelle', type: 'email', required: true },
  { key: 'telephone', label: 'Téléphone (mobile)', type: 'text', required: true },
  { key: 'ville_pays', label: 'Ville, Pays', type: 'text', required: true },
  { key: 'linkedin', label: 'Profil LinkedIn (URL)', type: 'text', required: false },
  { key: 'resume_profil', label: 'Résumé / Profil professionnel (3-5 lignes)', type: 'textarea', required: true },
  { key: 'experience_1_poste', label: 'Expérience 1 — Intitulé du poste', type: 'text', required: true },
  { key: 'experience_1_entreprise', label: 'Expérience 1 — Entreprise / Organisation', type: 'text', required: true },
  { key: 'experience_1_periode', label: 'Expérience 1 — Période (ex : Jan 2020 – Déc 2022)', type: 'text', required: true },
  { key: 'experience_1_missions', label: 'Expérience 1 — Missions et réalisations clés', type: 'textarea', required: true },
  { key: 'experience_2_poste', label: 'Expérience 2 — Intitulé du poste', type: 'text', required: false },
  { key: 'experience_2_entreprise', label: 'Expérience 2 — Entreprise / Organisation', type: 'text', required: false },
  { key: 'experience_2_periode', label: 'Expérience 2 — Période', type: 'text', required: false },
  { key: 'experience_2_missions', label: 'Expérience 2 — Missions et réalisations clés', type: 'textarea', required: false },
  { key: 'experience_3_poste', label: 'Expérience 3 — Intitulé du poste', type: 'text', required: false },
  { key: 'experience_3_entreprise', label: 'Expérience 3 — Entreprise / Organisation', type: 'text', required: false },
  { key: 'experience_3_periode', label: 'Expérience 3 — Période', type: 'text', required: false },
  { key: 'experience_3_missions', label: 'Expérience 3 — Missions et réalisations clés', type: 'textarea', required: false },
  { key: 'formation_1_diplome', label: 'Formation 1 — Diplôme / Titre', type: 'text', required: true },
  { key: 'formation_1_etablissement', label: 'Formation 1 — Établissement', type: 'text', required: true },
  { key: 'formation_1_annee', label: 'Formation 1 — Année d\'obtention', type: 'text', required: true },
  { key: 'formation_2_diplome', label: 'Formation 2 — Diplôme / Titre', type: 'text', required: false },
  { key: 'formation_2_etablissement', label: 'Formation 2 — Établissement', type: 'text', required: false },
  { key: 'formation_2_annee', label: 'Formation 2 — Année', type: 'text', required: false },
  { key: 'competences_techniques', label: 'Compétences techniques / métier', type: 'textarea', required: true },
  { key: 'competences_linguistiques', label: 'Langues maîtrisées (niveau)', type: 'textarea', required: true },
  { key: 'certifications', label: 'Certifications / Formations complémentaires', type: 'textarea', required: false },
  { key: 'centres_interet', label: 'Centres d\'intérêt / Activités extra-professionnelles', type: 'text', required: false },
];

// ─── BUILDER DE CORPS HTML GÉNÉRIQUE ───
function buildBody(color1: string, color2: string, accentColor: string): string {
  return `<div style="font-family: 'Calibri', Arial, sans-serif; max-width: 800px; margin: 0 auto; box-shadow: 0 2px 12px rgba(0,0,0,0.12);">
  <!-- EN-TÊTE COLORÉ -->
  <div style="background: linear-gradient(135deg, ${color1} 0%, ${color2} 100%); color: white; padding: 40px 40px 28px; border-radius: 4px 4px 0 0;">
    <h1 style="margin: 0 0 4px; font-size: 28px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;">{{prenom_nom}}</h1>
    <p style="margin: 0 0 16px; font-size: 15px; opacity: 0.9; font-weight: 300; letter-spacing: 0.5px;">{{titre_poste}}</p>
    <div style="display: flex; gap: 18px; flex-wrap: wrap; font-size: 12px; opacity: 0.85; border-top: 1px solid rgba(255,255,255,0.3); padding-top: 14px;">
      <span>✉ {{email}}</span>
      <span>📱 {{telephone}}</span>
      <span>📍 {{ville_pays}}</span>
      <span>🔗 {{linkedin}}</span>
    </div>
  </div>

  <div style="padding: 28px 40px 32px; background: #ffffff; border: 1px solid #e8e8e8; border-top: none; border-radius: 0 0 4px 4px;">

    <!-- PROFIL PROFESSIONNEL -->
    <section style="margin-bottom: 26px;">
      <h2 style="color: ${color1}; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 2.5px; border-bottom: 2px solid ${accentColor}; padding-bottom: 6px; margin-bottom: 12px;">Profil professionnel</h2>
      <p style="font-size: 13px; line-height: 1.75; color: #333; margin: 0;">{{resume_profil}}</p>
    </section>

    <!-- EXPÉRIENCES PROFESSIONNELLES -->
    <section style="margin-bottom: 26px;">
      <h2 style="color: ${color1}; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 2.5px; border-bottom: 2px solid ${accentColor}; padding-bottom: 6px; margin-bottom: 14px;">Expériences professionnelles</h2>

      <div style="margin-bottom: 18px; padding-left: 12px; border-left: 3px solid ${accentColor};">
        <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 4px;">
          <strong style="font-size: 13px; color: #1a1a1a;">{{experience_1_poste}}</strong>
          <span style="font-size: 11px; color: #777; background: #f5f5f5; padding: 2px 8px; border-radius: 10px; white-space: nowrap;">{{experience_1_periode}}</span>
        </div>
        <div style="font-size: 12px; color: ${color2}; margin: 3px 0 6px; font-weight: 600;">{{experience_1_entreprise}}</div>
        <p style="font-size: 12px; line-height: 1.65; color: #444; margin: 0;">{{experience_1_missions}}</p>
      </div>

      <div style="margin-bottom: 18px; padding-left: 12px; border-left: 3px solid ${accentColor};">
        <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 4px;">
          <strong style="font-size: 13px; color: #1a1a1a;">{{experience_2_poste}}</strong>
          <span style="font-size: 11px; color: #777; background: #f5f5f5; padding: 2px 8px; border-radius: 10px; white-space: nowrap;">{{experience_2_periode}}</span>
        </div>
        <div style="font-size: 12px; color: ${color2}; margin: 3px 0 6px; font-weight: 600;">{{experience_2_entreprise}}</div>
        <p style="font-size: 12px; line-height: 1.65; color: #444; margin: 0;">{{experience_2_missions}}</p>
      </div>

      <div style="margin-bottom: 4px; padding-left: 12px; border-left: 3px solid ${accentColor};">
        <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 4px;">
          <strong style="font-size: 13px; color: #1a1a1a;">{{experience_3_poste}}</strong>
          <span style="font-size: 11px; color: #777; background: #f5f5f5; padding: 2px 8px; border-radius: 10px; white-space: nowrap;">{{experience_3_periode}}</span>
        </div>
        <div style="font-size: 12px; color: ${color2}; margin: 3px 0 6px; font-weight: 600;">{{experience_3_entreprise}}</div>
        <p style="font-size: 12px; line-height: 1.65; color: #444; margin: 0;">{{experience_3_missions}}</p>
      </div>
    </section>

    <!-- FORMATION -->
    <section style="margin-bottom: 26px;">
      <h2 style="color: ${color1}; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 2.5px; border-bottom: 2px solid ${accentColor}; padding-bottom: 6px; margin-bottom: 14px;">Formation</h2>
      <div style="display: flex; gap: 8px; align-items: flex-start; margin-bottom: 10px;">
        <div style="min-width: 8px; height: 8px; background: ${accentColor}; border-radius: 50%; margin-top: 5px; flex-shrink: 0;"></div>
        <div>
          <strong style="font-size: 13px; color: #1a1a1a;">{{formation_1_diplome}}</strong>
          <span style="font-size: 11px; color: #777;"> — {{formation_1_annee}}</span>
          <div style="font-size: 12px; color: #555; margin-top: 2px; font-style: italic;">{{formation_1_etablissement}}</div>
        </div>
      </div>
      <div style="display: flex; gap: 8px; align-items: flex-start; margin-bottom: 10px;">
        <div style="min-width: 8px; height: 8px; background: ${accentColor}; border-radius: 50%; margin-top: 5px; flex-shrink: 0;"></div>
        <div>
          <strong style="font-size: 13px; color: #1a1a1a;">{{formation_2_diplome}}</strong>
          <span style="font-size: 11px; color: #777;"> — {{formation_2_annee}}</span>
          <div style="font-size: 12px; color: #555; margin-top: 2px; font-style: italic;">{{formation_2_etablissement}}</div>
        </div>
      </div>
    </section>

    <!-- COMPÉTENCES & LANGUES (grille 2 colonnes) -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 22px;">
      <section>
        <h2 style="color: ${color1}; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 2.5px; border-bottom: 2px solid ${accentColor}; padding-bottom: 6px; margin-bottom: 10px;">Compétences techniques</h2>
        <p style="font-size: 12px; line-height: 1.75; color: #444; margin: 0;">{{competences_techniques}}</p>
      </section>
      <section>
        <h2 style="color: ${color1}; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 2.5px; border-bottom: 2px solid ${accentColor}; padding-bottom: 6px; margin-bottom: 10px;">Langues & Certifications</h2>
        <p style="font-size: 12px; line-height: 1.75; color: #444; margin: 0 0 8px;">{{competences_linguistiques}}</p>
        <p style="font-size: 12px; line-height: 1.75; color: #444; margin: 0;">{{certifications}}</p>
      </section>
    </div>

    <!-- CENTRES D'INTÉRÊT -->
    <section style="background: #f9f9f9; border-radius: 4px; padding: 12px 16px;">
      <h2 style="color: ${color1}; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 2.5px; margin: 0 0 6px;">Centres d'intérêt</h2>
      <p style="font-size: 12px; color: #555; margin: 0;">{{centres_interet}}</p>
    </section>

  </div>
</div>`;
}

type CvTemplate = {
  code: string;
  name: string;
  category: string;
  price: number;
  priceMax: number;
  description: string;
  fieldsJson: string;
  body: string;
  formatsJson: string;
  templateType: string;
  popularity: number;
};

const templates: CvTemplate[] = [
  // ══════════════════════════════════════════════
  // 1. cv_dirigeant — CEO / PDG / DG
  // ══════════════════════════════════════════════
  {
    code: 'cv_dirigeant',
    name: 'CV Dirigeant / DG / PDG / CEO',
    category: 'rh_emploi',
    price: 1500,
    priceMax: 3000,
    description: 'Template de CV haut de gamme pour dirigeants, PDG, DG et CEO. Design premium bleu marine, sections gouvernance, vision stratégique, conseil d\'administration et indicateurs de performance clés.',
    fieldsJson: F([
      ...baseFields,
      { key: 'secteurs_expertise', label: 'Secteurs d\'expertise (ex : Banque, Énergie, FMCG)', type: 'text', required: true },
      { key: 'chiffre_affaires_gere', label: 'Chiffre d\'affaires géré / portefeuille (en FCFA ou USD)', type: 'text', required: false },
      { key: 'taille_equipes', label: 'Taille des équipes dirigées (effectif max)', type: 'text', required: false },
      { key: 'mandats_conseil', label: 'Mandats d\'administrateur / Conseil d\'administration', type: 'textarea', required: false },
      { key: 'realisations_phares', label: 'Réalisations phares & indicateurs clés (KPI)', type: 'textarea', required: true },
    ]),
    body: buildBody('#0f2d4a', '#1a5276', '#2980b9'),
    formatsJson: '["pdf","docx"]',
    templateType: 'document',
    popularity: 85,
  },

  // ══════════════════════════════════════════════
  // 2. cv_daf — Directeur Administratif et Financier
  // ══════════════════════════════════════════════
  {
    code: 'cv_daf',
    name: 'CV Directeur Administratif et Financier (DAF)',
    category: 'rh_emploi',
    price: 1500,
    priceMax: 2500,
    description: 'CV spécialisé pour DAF, CFO et directeurs financiers. Sections budget, trésorerie, reporting IFRS/SYSCOHADA, contrôle interne et relations bancaires.',
    fieldsJson: F([
      ...baseFields,
      { key: 'budget_gere', label: 'Budget géré (en FCFA / millions)', type: 'text', required: false },
      { key: 'normes_comptables', label: 'Normes maîtrisées (SYSCOHADA, IFRS, GAAP…)', type: 'text', required: false },
      { key: 'logiciels_finance', label: 'Logiciels financiers (SAP, Sage, Oracle, Odoo…)', type: 'text', required: false },
      { key: 'domaines_expertise', label: 'Domaines d\'expertise financière', type: 'textarea', required: true },
    ]),
    body: buildBody('#1a2e44', '#1f618d', '#2471a3'),
    formatsJson: '["pdf","docx"]',
    templateType: 'document',
    popularity: 78,
  },

  // ══════════════════════════════════════════════
  // 3. cv_drh — Directeur des Ressources Humaines
  // ══════════════════════════════════════════════
  {
    code: 'cv_drh',
    name: 'CV Directeur des Ressources Humaines (DRH)',
    category: 'rh_emploi',
    price: 1500,
    priceMax: 2500,
    description: 'CV premium pour DRH, DRHG et Responsables RH confirmés. Accent sur la GPEC, les relations sociales, la politique salariale, le recrutement et la transformation RH.',
    fieldsJson: F([
      ...baseFields,
      { key: 'effectif_gere', label: 'Effectif géré (nombre de collaborateurs)', type: 'text', required: false },
      { key: 'domaines_rh', label: 'Domaines RH maîtrisés (recrutement, formation, paie…)', type: 'textarea', required: true },
      { key: 'logiciels_rh', label: 'SIRH / Logiciels RH utilisés (ex : Workday, SAP HCM)', type: 'text', required: false },
      { key: 'conventions_collectives', label: 'Conventions collectives / Branches professionnelles', type: 'text', required: false },
    ]),
    body: buildBody('#2c1654', '#6c3483', '#8e44ad'),
    formatsJson: '["pdf","docx"]',
    templateType: 'document',
    popularity: 72,
  },

  // ══════════════════════════════════════════════
  // 4. cv_directeur_commercial — Dir. Commercial & Marketing
  // ══════════════════════════════════════════════
  {
    code: 'cv_directeur_commercial',
    name: 'CV Directeur Commercial & Marketing',
    category: 'rh_emploi',
    price: 1200,
    priceMax: 2200,
    description: 'CV pour directeurs commerciaux, directeurs marketing et responsables développement des ventes. Sections CA généré, portefeuille clients, stratégie go-to-market et équipes pilotées.',
    fieldsJson: F([
      ...baseFields,
      { key: 'ca_genere', label: 'Chiffre d\'affaires généré / objectifs atteints', type: 'text', required: false },
      { key: 'portefeuille_clients', label: 'Portefeuille clients (grands comptes, PME, B2C…)', type: 'text', required: false },
      { key: 'zones_geographiques', label: 'Zones géographiques couvertes (pays, régions)', type: 'text', required: false },
      { key: 'outils_crm', label: 'Outils CRM / Marketing (Salesforce, HubSpot, Power BI…)', type: 'text', required: false },
    ]),
    body: buildBody('#1a4a2e', '#1e8449', '#27ae60'),
    formatsJson: '["pdf","docx"]',
    templateType: 'document',
    popularity: 80,
  },

  // ══════════════════════════════════════════════
  // 5. cv_ingenieur_btp — Ingénieur BTP / Génie Civil
  // ══════════════════════════════════════════════
  {
    code: 'cv_ingenieur_btp',
    name: 'CV Ingénieur BTP / Génie Civil',
    category: 'rh_emploi',
    price: 1000,
    priceMax: 1800,
    description: 'CV technique pour ingénieurs BTP, génie civil, conducteurs de travaux et chefs de chantier. Sections projets réalisés, logiciels CAO/DAO, normes de construction et budget chantier.',
    fieldsJson: F([
      ...baseFields,
      { key: 'types_projets', label: 'Types de projets (bâtiment, route, pont, hydraulique…)', type: 'text', required: true },
      { key: 'logiciels_btp', label: 'Logiciels techniques (AutoCAD, Revit, MS Project, Robot…)', type: 'text', required: false },
      { key: 'budget_chantier', label: 'Budget de chantier maximal géré', type: 'text', required: false },
      { key: 'normes_construction', label: 'Normes et réglementations maîtrisées (DTU, Eurocodes…)', type: 'text', required: false },
      { key: 'projets_phares', label: 'Projets phares (nom, montant, durée)', type: 'textarea', required: true },
    ]),
    body: buildBody('#4a2b0f', '#784212', '#935116'),
    formatsJson: '["pdf","docx"]',
    templateType: 'document',
    popularity: 74,
  },

  // ══════════════════════════════════════════════
  // 6. cv_ingenieur_informatique — Ingénieur Info / Dev Senior
  // ══════════════════════════════════════════════
  {
    code: 'cv_ingenieur_informatique',
    name: 'CV Ingénieur Informatique / Développeur Senior',
    category: 'rh_emploi',
    price: 1000,
    priceMax: 1800,
    description: 'CV moderne pour ingénieurs logiciels, développeurs full-stack et architectes IT. Sections stack technique, projets GitHub/GitLab, méthodes agiles et architecture systèmes.',
    fieldsJson: F([
      ...baseFields,
      { key: 'langages_programmation', label: 'Langages de programmation maîtrisés', type: 'text', required: true },
      { key: 'frameworks_technos', label: 'Frameworks & technologies (React, Node, Django, Spring…)', type: 'text', required: true },
      { key: 'cloud_devops', label: 'Cloud & DevOps (AWS, Azure, Docker, Kubernetes, CI/CD)', type: 'text', required: false },
      { key: 'methodologies', label: 'Méthodologies (Agile/Scrum, TDD, Kanban, SAFe…)', type: 'text', required: false },
      { key: 'github_portfolio', label: 'GitHub / Portfolio / Lien projets', type: 'text', required: false },
    ]),
    body: buildBody('#1a1a2e', '#16213e', '#0f3460'),
    formatsJson: '["pdf","docx"]',
    templateType: 'document',
    popularity: 90,
  },

  // ══════════════════════════════════════════════
  // 7. cv_medecin — Médecin / Praticien Hospitalier
  // ══════════════════════════════════════════════
  {
    code: 'cv_medecin',
    name: 'CV Médecin / Praticien Hospitalier',
    category: 'rh_emploi',
    price: 1200,
    priceMax: 2000,
    description: 'CV professionnel pour médecins généralistes, spécialistes et praticiens hospitaliers. Sections spécialité, actes pratiqués, publications médicales et memberships professionnels.',
    fieldsJson: F([
      ...baseFields,
      { key: 'specialite_medicale', label: 'Spécialité médicale (Cardiologie, Pédiatrie, Chirurgie…)', type: 'text', required: true },
      { key: 'numero_ordre', label: 'Numéro d\'inscription à l\'Ordre des médecins', type: 'text', required: false },
      { key: 'actes_pratiques', label: 'Actes médicaux / Techniques pratiquées', type: 'textarea', required: true },
      { key: 'publications', label: 'Publications scientifiques / Communications', type: 'textarea', required: false },
      { key: 'affiliations', label: 'Sociétés médicales / Associations professionnelles', type: 'text', required: false },
    ]),
    body: buildBody('#5b0000', '#922b21', '#b03a2e'),
    formatsJson: '["pdf","docx"]',
    templateType: 'document',
    popularity: 68,
  },

  // ══════════════════════════════════════════════
  // 8. cv_juriste — Juriste / Avocat d'affaires
  // ══════════════════════════════════════════════
  {
    code: 'cv_juriste',
    name: 'CV Juriste / Avocat d\'affaires',
    category: 'rh_emploi',
    price: 1200,
    priceMax: 2000,
    description: 'CV élégant pour juristes, avocats d\'affaires, conseils juridiques et juristes d\'entreprise. Sections droit des affaires, contentieux, rédaction de contrats et dossiers plaidés.',
    fieldsJson: F([
      ...baseFields,
      { key: 'domaines_droit', label: 'Domaines du droit maîtrisés (OHADA, droit social, fiscal…)', type: 'textarea', required: true },
      { key: 'barreau', label: 'Barreau d\'inscription (ville, pays)', type: 'text', required: false },
      { key: 'langues_juridiques', label: 'Langues de travail juridique (FR, EN, PT…)', type: 'text', required: false },
      { key: 'dossiers_phares', label: 'Dossiers / affaires marquants (type, enjeu)', type: 'textarea', required: false },
    ]),
    body: buildBody('#2e1a0e', '#5d4037', '#795548'),
    formatsJson: '["pdf","docx"]',
    templateType: 'document',
    popularity: 65,
  },

  // ══════════════════════════════════════════════
  // 9. cv_comptable — Expert-Comptable / DAF Junior
  // ══════════════════════════════════════════════
  {
    code: 'cv_comptable',
    name: 'CV Expert-Comptable / DAF Junior',
    category: 'rh_emploi',
    price: 1000,
    priceMax: 1800,
    description: 'CV pour comptables, experts-comptables stagiaires et DAF juniors. Sections clôtures, normes SYSCOHADA/IFRS, déclarations fiscales et logiciels comptables.',
    fieldsJson: F([
      ...baseFields,
      { key: 'normes_maitrisees', label: 'Normes comptables maîtrisées (SYSCOHADA, IFRS, PCG…)', type: 'text', required: true },
      { key: 'logiciels_compta', label: 'Logiciels comptables (Sage, SAARI, Cegid, SAP FI…)', type: 'text', required: true },
      { key: 'fiscalite', label: 'Fiscalité / déclarations maîtrisées (TVA, IS, IR, patente…)', type: 'textarea', required: false },
      { key: 'ordre_expertise', label: 'Inscription à l\'Ordre des Experts-Comptables', type: 'text', required: false },
    ]),
    body: buildBody('#1a3a4a', '#1f4e6a', '#2471a3'),
    formatsJson: '["pdf","docx"]',
    templateType: 'document',
    popularity: 76,
  },

  // ══════════════════════════════════════════════
  // 10. cv_commercial — Commercial terrain / Représentant
  // ══════════════════════════════════════════════
  {
    code: 'cv_commercial',
    name: 'CV Commercial / Représentant terrain',
    category: 'rh_emploi',
    price: 800,
    priceMax: 1500,
    description: 'CV dynamique pour commerciaux, attachés commerciaux et représentants terrain. Accent sur les chiffres de vente, la prospection, la fidélisation clients et les outils CRM.',
    fieldsJson: F([
      ...baseFields,
      { key: 'secteur_vente', label: 'Secteur de vente (FMCG, pharma, BTP, tech, assurance…)', type: 'text', required: true },
      { key: 'objectifs_atteints', label: 'Objectifs commerciaux atteints (% dépassement, CA)', type: 'text', required: false },
      { key: 'zone_prospection', label: 'Zone de prospection / territoire couvert', type: 'text', required: false },
      { key: 'outils_vente', label: 'Outils de vente et CRM utilisés', type: 'text', required: false },
    ]),
    body: buildBody('#0a4a2a', '#117a45', '#1abc9c'),
    formatsJson: '["pdf","docx"]',
    templateType: 'document',
    popularity: 82,
  },

  // ══════════════════════════════════════════════
  // 11. cv_enseignant — Enseignant / Formateur
  // ══════════════════════════════════════════════
  {
    code: 'cv_enseignant',
    name: 'CV Enseignant / Formateur professionnel',
    category: 'rh_emploi',
    price: 800,
    priceMax: 1400,
    description: 'CV structuré pour enseignants du primaire au supérieur, formateurs professionnels et consultants en ingénierie pédagogique. Sections disciplines enseignées, niveaux, publications et innovations pédagogiques.',
    fieldsJson: F([
      ...baseFields,
      { key: 'disciplines_enseignees', label: 'Disciplines / matières enseignées', type: 'textarea', required: true },
      { key: 'niveaux_classes', label: 'Niveaux d\'enseignement (Primaire, Lycée, Licence, Master…)', type: 'text', required: true },
      { key: 'publications_pedagogiques', label: 'Publications / manuels / supports pédagogiques', type: 'textarea', required: false },
      { key: 'innovations_pedagogiques', label: 'Innovations pédagogiques / méthodes actives', type: 'textarea', required: false },
    ]),
    body: buildBody('#1a3c1a', '#196f3d', '#27ae60'),
    formatsJson: '["pdf","docx"]',
    templateType: 'document',
    popularity: 70,
  },

  // ══════════════════════════════════════════════
  // 12. cv_architecte — Architecte / Urbaniste
  // ══════════════════════════════════════════════
  {
    code: 'cv_architecte',
    name: 'CV Architecte / Urbaniste',
    category: 'rh_emploi',
    price: 1000,
    priceMax: 1800,
    description: 'CV créatif et structuré pour architectes DPLG, urbanistes et paysagistes. Sections portfolio de réalisations, logiciels de conception, types de projets et prix obtenus.',
    fieldsJson: F([
      ...baseFields,
      { key: 'types_projets_archi', label: 'Types de projets (logement, tertiaire, équipement public, urbanisme…)', type: 'text', required: true },
      { key: 'logiciels_conception', label: 'Logiciels de conception (ArchiCAD, Revit, SketchUp, AutoCAD, Lumion…)', type: 'text', required: true },
      { key: 'portfolio_url', label: 'Lien vers portfolio / site personnel', type: 'text', required: false },
      { key: 'prix_distinctions', label: 'Prix / Distinctions architecturales obtenus', type: 'textarea', required: false },
      { key: 'ordre_architectes', label: 'Inscription à l\'Ordre des Architectes (N°, Pays)', type: 'text', required: false },
    ]),
    body: buildBody('#2c2c2c', '#4a4a4a', '#e67e22'),
    formatsJson: '["pdf","docx"]',
    templateType: 'document',
    popularity: 62,
  },

  // ══════════════════════════════════════════════
  // 13. cv_logistique — Responsable Logistique / Supply Chain
  // ══════════════════════════════════════════════
  {
    code: 'cv_logistique',
    name: 'CV Responsable Logistique / Supply Chain Manager',
    category: 'rh_emploi',
    price: 1000,
    priceMax: 1800,
    description: 'CV pour responsables logistique, supply chain managers et directeurs des opérations. Sections gestion des stocks, flux, transport, ERP et optimisation des coûts.',
    fieldsJson: F([
      ...baseFields,
      { key: 'modes_transport', label: 'Modes de transport maîtrisés (maritime, aérien, routier, ferroviaire)', type: 'text', required: false },
      { key: 'volume_stock', label: 'Volume de stocks gérés (valeur ou quantité)', type: 'text', required: false },
      { key: 'logiciels_erp', label: 'ERP / WMS / TMS utilisés (SAP, Oracle, Odoo, Manhattan…)', type: 'text', required: false },
      { key: 'certifications_supply', label: 'Certifications (APICS, CSCMP, Lean, 5S, ISO 9001…)', type: 'text', required: false },
    ]),
    body: buildBody('#1a3a1a', '#1e5631', '#28b463'),
    formatsJson: '["pdf","docx"]',
    templateType: 'document',
    popularity: 67,
  },

  // ══════════════════════════════════════════════
  // 14. cv_banquier — Banquier / Analyste Financier
  // ══════════════════════════════════════════════
  {
    code: 'cv_banquier',
    name: 'CV Banquier / Analyste Financier',
    category: 'rh_emploi',
    price: 1200,
    priceMax: 2000,
    description: 'CV pour banquiers, chargés d\'affaires, analystes crédit et responsables clientèle en banque et assurance. Sections portefeuille, analyse risques, produits bancaires et réglementation.',
    fieldsJson: F([
      ...baseFields,
      { key: 'etablissement_bancaire', label: 'Type d\'établissement (banque commerciale, banque d\'affaires, microfinance…)', type: 'text', required: false },
      { key: 'volume_portefeuille', label: 'Volume du portefeuille géré (en milliards FCFA)', type: 'text', required: false },
      { key: 'produits_bancaires', label: 'Produits bancaires maîtrisés (crédit, FX, trésorerie, leasing…)', type: 'textarea', required: true },
      { key: 'reglementation', label: 'Réglementation maîtrisée (BCEAO, COBAC, Bâle III, UEMOA…)', type: 'text', required: false },
    ]),
    body: buildBody('#0d1b2a', '#1b3a5c', '#2e6da4'),
    formatsJson: '["pdf","docx"]',
    templateType: 'document',
    popularity: 73,
  },

  // ══════════════════════════════════════════════
  // 15. cv_consultant — Consultant / Manager de Transition
  // ══════════════════════════════════════════════
  {
    code: 'cv_consultant',
    name: 'CV Consultant / Manager de Transition',
    category: 'rh_emploi',
    price: 1200,
    priceMax: 2200,
    description: 'CV haut de gamme pour consultants en management, managers de transition et experts indépendants. Sections missions réalisées, secteurs d\'intervention, livrables et taux journalier.',
    fieldsJson: F([
      ...baseFields,
      { key: 'domaines_conseil', label: 'Domaines de conseil (stratégie, RH, finance, IT, opérations…)', type: 'textarea', required: true },
      { key: 'secteurs_intervention', label: 'Secteurs d\'intervention (banque, industrie, santé, énergie…)', type: 'text', required: true },
      { key: 'missions_recentes', label: 'Missions récentes marquantes (client, durée, résultat)', type: 'textarea', required: true },
      { key: 'methodologies_conseil', label: 'Méthodologies (McKinsey 7S, Lean, Six Sigma, PRINCE2…)', type: 'text', required: false },
    ]),
    body: buildBody('#1a1a3e', '#2c3e7a', '#3498db'),
    formatsJson: '["pdf","docx"]',
    templateType: 'document',
    popularity: 79,
  },

  // ══════════════════════════════════════════════
  // 16. cv_marketing_digital — Marketing Digital / CM
  // ══════════════════════════════════════════════
  {
    code: 'cv_marketing_digital',
    name: 'CV Responsable Marketing Digital / Community Manager',
    category: 'rh_emploi',
    price: 800,
    priceMax: 1500,
    description: 'CV moderne pour responsables marketing digital, community managers et growth hackers. Sections réseaux sociaux, SEO/SEA, analytics, campagnes et KPIs digitaux.',
    fieldsJson: F([
      ...baseFields,
      { key: 'reseaux_sociaux', label: 'Réseaux sociaux gérés (Facebook, Instagram, LinkedIn, TikTok…)', type: 'text', required: true },
      { key: 'outils_marketing', label: 'Outils marketing digital (Google Analytics, Mailchimp, HubSpot, Canva, Meta Ads…)', type: 'text', required: true },
      { key: 'seo_sea', label: 'Compétences SEO / SEA / SEM', type: 'textarea', required: false },
      { key: 'kpi_obtenus', label: 'KPIs obtenus (taux d\'engagement, croissance abonnés, ROAS…)', type: 'textarea', required: false },
    ]),
    body: buildBody('#1a0a3e', '#6c2bd9', '#9b59b6'),
    formatsJson: '["pdf","docx"]',
    templateType: 'document',
    popularity: 88,
  },

  // ══════════════════════════════════════════════
  // 17. cv_rh_generalist — RH Généraliste / Chargé de recrutement
  // ══════════════════════════════════════════════
  {
    code: 'cv_rh_generalist',
    name: 'CV Responsable RH / Chargé de recrutement',
    category: 'rh_emploi',
    price: 800,
    priceMax: 1500,
    description: 'CV professionnel pour responsables RH généralistes, chargés de recrutement et gestionnaires de paie. Sections recrutement, gestion des carrières, formation et paie.',
    fieldsJson: F([
      ...baseFields,
      { key: 'effectif_suivi', label: 'Effectif suivi / géré (nombre de salariés)', type: 'text', required: false },
      { key: 'fonctions_rh', label: 'Fonctions RH maîtrisées (recrutement, formation, paie, GPEC, IRP…)', type: 'textarea', required: true },
      { key: 'sirh_utilises', label: 'SIRH utilisés (Silae, PayFit, ADP, Workday, SAP HCM…)', type: 'text', required: false },
      { key: 'diplomes_rh', label: 'Diplômes / certifications RH spécifiques', type: 'text', required: false },
    ]),
    body: buildBody('#3a0a4a', '#7d3c98', '#a569bd'),
    formatsJson: '["pdf","docx"]',
    templateType: 'document',
    popularity: 71,
  },

  // ══════════════════════════════════════════════
  // 18. cv_audit_controle — Auditeur / Contrôleur de gestion
  // ══════════════════════════════════════════════
  {
    code: 'cv_audit_controle',
    name: 'CV Auditeur / Contrôleur de gestion',
    category: 'rh_emploi',
    price: 1000,
    priceMax: 1800,
    description: 'CV pour auditeurs internes/externes et contrôleurs de gestion. Sections missions d\'audit, tableaux de bord, contrôle budgétaire, analyse des risques et recommandations.',
    fieldsJson: F([
      ...baseFields,
      { key: 'type_audit', label: 'Type d\'audit (interne, externe, opérationnel, qualité, SI…)', type: 'text', required: true },
      { key: 'normes_audit', label: 'Normes d\'audit maîtrisées (ISA, IIA, COSO, IFACI…)', type: 'text', required: false },
      { key: 'outils_controle', label: 'Outils de contrôle de gestion (Power BI, Cognos, Hyperion, Excel avancé…)', type: 'text', required: false },
      { key: 'certifications_audit', label: 'Certifications (CIA, CISA, CPA, DEC, DSCG…)', type: 'text', required: false },
    ]),
    body: buildBody('#2a1a0a', '#6e4c1e', '#935116'),
    formatsJson: '["pdf","docx"]',
    templateType: 'document',
    popularity: 66,
  },

  // ══════════════════════════════════════════════
  // 19. cv_agronome — Agronome / Ingénieur agricole
  // ══════════════════════════════════════════════
  {
    code: 'cv_agronome',
    name: 'CV Agronome / Ingénieur agricole',
    category: 'rh_emploi',
    price: 800,
    priceMax: 1500,
    description: 'CV spécialisé pour agronomes, ingénieurs agricoles et responsables de projets de développement rural. Sections filières, cultures, irrigation, financement et organisation des producteurs.',
    fieldsJson: F([
      ...baseFields,
      { key: 'filieres_agricoles', label: 'Filières agricoles maîtrisées (cacao, café, coton, maraîchage, élevage…)', type: 'text', required: true },
      { key: 'types_cultures', label: 'Types de cultures / espèces animales', type: 'text', required: false },
      { key: 'techniques_agronomiques', label: 'Techniques agronomiques (SRI, irrigation, agroforesterie, BPA…)', type: 'textarea', required: true },
      { key: 'projets_agricoles', label: 'Projets agricoles conduits (bailleurs, superficie, bénéficiaires)', type: 'textarea', required: false },
    ]),
    body: buildBody('#1a3a0a', '#2e7d32', '#43a047'),
    formatsJson: '["pdf","docx"]',
    templateType: 'document',
    popularity: 58,
  },

  // ══════════════════════════════════════════════
  // 20. cv_informatique_junior — Dev Junior / Alternant IT
  // ══════════════════════════════════════════════
  {
    code: 'cv_informatique_junior',
    name: 'CV Développeur Junior / Alternant IT',
    category: 'rh_emploi',
    price: 700,
    priceMax: 1200,
    description: 'CV soigné pour développeurs juniors, alternants et jeunes diplômés en informatique. Sections projets académiques, stack technique, GitHub et compétences transversales.',
    fieldsJson: F([
      ...baseFields,
      { key: 'langages_maîtrises', label: 'Langages de programmation maîtrisés', type: 'text', required: true },
      { key: 'projets_personnels', label: 'Projets personnels / académiques (description, technos)', type: 'textarea', required: true },
      { key: 'github_lien', label: 'GitHub / GitLab / Portfolio URL', type: 'text', required: false },
      { key: 'stages_effectues', label: 'Stages effectués (entreprise, durée, missions)', type: 'textarea', required: false },
    ]),
    body: buildBody('#0f1c2e', '#1565c0', '#1976d2'),
    formatsJson: '["pdf","docx"]',
    templateType: 'document',
    popularity: 85,
  },

  // ══════════════════════════════════════════════
  // 21. cv_etudiant_stage — Étudiant cherchant stage
  // ══════════════════════════════════════════════
  {
    code: 'cv_etudiant_stage',
    name: 'CV Étudiant cherchant stage / 1ère expérience',
    category: 'rh_emploi',
    price: 500,
    priceMax: 1000,
    description: 'CV accessible et moderne pour étudiants cherchant un stage ou un premier emploi. Met en avant la formation, les projets académiques, les compétences et la motivation.',
    fieldsJson: F([
      { key: 'prenom_nom', label: 'Prénom et Nom complet', type: 'text', required: true },
      { key: 'titre_poste', label: 'Poste recherché / Type de stage', type: 'text', required: true },
      { key: 'email', label: 'Adresse e-mail', type: 'email', required: true },
      { key: 'telephone', label: 'Téléphone', type: 'text', required: true },
      { key: 'ville_pays', label: 'Ville, Pays', type: 'text', required: true },
      { key: 'linkedin', label: 'LinkedIn (URL)', type: 'text', required: false },
      { key: 'resume_profil', label: 'Profil / Présentation (2-3 phrases de motivation)', type: 'textarea', required: true },
      { key: 'formation_1_diplome', label: 'Formation principale — Diplôme / Filière', type: 'text', required: true },
      { key: 'formation_1_etablissement', label: 'Formation principale — Établissement', type: 'text', required: true },
      { key: 'formation_1_annee', label: 'Formation principale — Année en cours / Diplôme obtenu', type: 'text', required: true },
      { key: 'formation_2_diplome', label: 'Formation précédente — Diplôme (Bac…)', type: 'text', required: false },
      { key: 'formation_2_etablissement', label: 'Formation précédente — Établissement', type: 'text', required: false },
      { key: 'formation_2_annee', label: 'Formation précédente — Année', type: 'text', required: false },
      { key: 'experience_1_poste', label: 'Expérience / Stage 1 — Intitulé', type: 'text', required: false },
      { key: 'experience_1_entreprise', label: 'Expérience / Stage 1 — Entreprise', type: 'text', required: false },
      { key: 'experience_1_periode', label: 'Expérience / Stage 1 — Période', type: 'text', required: false },
      { key: 'experience_1_missions', label: 'Expérience / Stage 1 — Missions', type: 'textarea', required: false },
      { key: 'projets_academiques', label: 'Projets académiques / travaux universitaires', type: 'textarea', required: false },
      { key: 'competences_techniques', label: 'Compétences techniques / informatique', type: 'textarea', required: true },
      { key: 'competences_linguistiques', label: 'Langues (niveau)', type: 'textarea', required: true },
      { key: 'activites_associatives', label: 'Activités associatives / bénévolat / délégué', type: 'text', required: false },
      { key: 'centres_interet', label: 'Centres d\'intérêt', type: 'text', required: false },
    ]),
    body: buildBody('#0a2744', '#1565c0', '#42a5f5'),
    formatsJson: '["pdf","docx"]',
    templateType: 'document',
    popularity: 95,
  },

  // ══════════════════════════════════════════════
  // 22. cv_chef_projet — Chef de Projet / PMP
  // ══════════════════════════════════════════════
  {
    code: 'cv_chef_projet',
    name: 'CV Chef de Projet / PMP certifié',
    category: 'rh_emploi',
    price: 1000,
    priceMax: 1800,
    description: 'CV structuré pour chefs de projet, managers de programme et PMO. Sections portefeuille de projets, budget géré, équipes pilotées, certifications PM et outils de gestion de projet.',
    fieldsJson: F([
      ...baseFields,
      { key: 'certifications_pm', label: 'Certifications en gestion de projet (PMP, PRINCE2, AgilePM, PMI-ACP…)', type: 'text', required: false },
      { key: 'outils_gestion_projet', label: 'Outils de gestion de projet (MS Project, Jira, Asana, Monday, Trello…)', type: 'text', required: true },
      { key: 'budget_projets', label: 'Budget total des projets gérés (en FCFA / €)', type: 'text', required: false },
      { key: 'projets_cles', label: 'Projets clés (nom, secteur, budget, durée, résultat)', type: 'textarea', required: true },
      { key: 'methodologie_projet', label: 'Méthodologie privilégiée (Agile, Waterfall, Prince2, Hybride)', type: 'text', required: false },
    ]),
    body: buildBody('#1a2a4a', '#2471a3', '#3498db'),
    formatsJson: '["pdf","docx"]',
    templateType: 'document',
    popularity: 77,
  },

  // ══════════════════════════════════════════════
  // 23. cv_secteur_minier — Ingénieur Mines / Géologue
  // ══════════════════════════════════════════════
  {
    code: 'cv_secteur_minier',
    name: 'CV Ingénieur Mines / Géologue',
    category: 'rh_emploi',
    price: 1000,
    priceMax: 1800,
    description: 'CV technique pour ingénieurs des mines, géologues et géotechniciens. Sections type de minerai, méthodes d\'extraction, études de faisabilité, normes HSE et logiciels miniers.',
    fieldsJson: F([
      ...baseFields,
      { key: 'mineraux_exploites', label: 'Minéraux / ressources exploitées (or, manganèse, bauxite, diamant…)', type: 'text', required: true },
      { key: 'methodes_extraction', label: 'Méthodes d\'extraction / exploitation maîtrisées', type: 'textarea', required: true },
      { key: 'logiciels_miniers', label: 'Logiciels miniers (Surpac, Vulcan, Leapfrog, ArcGIS, AutoCAD Mine…)', type: 'text', required: false },
      { key: 'normes_hse_mines', label: 'Normes HSE / environnementales minières', type: 'text', required: false },
      { key: 'pays_operations', label: 'Pays d\'opérations (Afrique de l\'Ouest, Afrique centrale…)', type: 'text', required: false },
    ]),
    body: buildBody('#2d1b00', '#5d3a00', '#8b5e3c'),
    formatsJson: '["pdf","docx"]',
    templateType: 'document',
    popularity: 55,
  },

  // ══════════════════════════════════════════════
  // 24. cv_secteur_petrolier — Ingénieur Pétrole & Gaz / HSE
  // ══════════════════════════════════════════════
  {
    code: 'cv_secteur_petrolier',
    name: 'CV Ingénieur Pétrole & Gaz / HSE',
    category: 'rh_emploi',
    price: 1200,
    priceMax: 2000,
    description: 'CV technique pour ingénieurs pétroliers, HSE et spécialistes Pétrole & Gaz. Sections upstream/downstream, puits forés, normes QHSE internationales et contrats PSC.',
    fieldsJson: F([
      ...baseFields,
      { key: 'specialite_petroliere', label: 'Spécialité pétrolière (forage, production, raffinage, transport, HSE…)', type: 'text', required: true },
      { key: 'normes_hse_petrole', label: 'Normes QHSE maîtrisées (OHSAS 18001, ISO 14001, API, IOGP…)', type: 'text', required: false },
      { key: 'logiciels_petroliers', label: 'Logiciels pétroliers (Petrel, Eclipse, PIPESIM, OFM, WellFlo…)', type: 'text', required: false },
      { key: 'pays_contrats', label: 'Pays / blocs opérés (Côte d\'Ivoire, Sénégal, Congo, Nigeria…)', type: 'text', required: false },
      { key: 'certifications_hse', label: 'Certifications HSE (NEBOSH, IOSH, BOSIET, HUET…)', type: 'text', required: false },
    ]),
    body: buildBody('#1a0000', '#7b241c', '#c0392b'),
    formatsJson: '["pdf","docx"]',
    templateType: 'document',
    popularity: 60,
  },

  // ══════════════════════════════════════════════
  // 25. cv_telecom — Ingénieur Télécom / Réseaux
  // ══════════════════════════════════════════════
  {
    code: 'cv_telecom',
    name: 'CV Ingénieur Télécom / Réseaux & Systèmes',
    category: 'rh_emploi',
    price: 1000,
    priceMax: 1800,
    description: 'CV technique pour ingénieurs télécoms, réseaux et systèmes. Sections technologies radio (2G/3G/4G/5G), protocoles IP, certifications Cisco/Huawei et architecture réseau.',
    fieldsJson: F([
      ...baseFields,
      { key: 'technologies_radio', label: 'Technologies radio maîtrisées (2G/3G/4G/5G, VSAT, fibre…)', type: 'text', required: true },
      { key: 'protocoles_reseau', label: 'Protocoles réseau (TCP/IP, BGP, OSPF, MPLS, VPN, VoIP…)', type: 'text', required: true },
      { key: 'equipementiers', label: 'Équipementiers maîtrisés (Cisco, Huawei, Ericsson, Nokia, Juniper…)', type: 'text', required: false },
      { key: 'certifications_telecom', label: 'Certifications (CCNA, CCNP, HCIA, HCNP, Juniper JNCIA…)', type: 'text', required: false },
    ]),
    body: buildBody('#001a3a', '#0d47a1', '#1976d2'),
    formatsJson: '["pdf","docx"]',
    templateType: 'document',
    popularity: 69,
  },

  // ══════════════════════════════════════════════
  // 26. cv_createur_startup — Entrepreneur / Fondateur de startup
  // ══════════════════════════════════════════════
  {
    code: 'cv_createur_startup',
    name: 'CV Entrepreneur / Fondateur de startup',
    category: 'rh_emploi',
    price: 1000,
    priceMax: 1800,
    description: 'CV moderne et percutant pour entrepreneurs, fondateurs de startups et intrapreneurs. Sections entreprises créées, levées de fonds, traction, équipe et impact.',
    fieldsJson: F([
      ...baseFields,
      { key: 'startups_creees', label: 'Startups / entreprises créées (nom, secteur, stade)', type: 'textarea', required: true },
      { key: 'levees_fonds', label: 'Levées de fonds réalisées (montant, investisseurs)', type: 'text', required: false },
      { key: 'traction_kpi', label: 'Traction & KPIs (CA, utilisateurs, croissance MoM…)', type: 'textarea', required: false },
      { key: 'ecosysteme_startup', label: 'Incubateurs / Accélérateurs / Réseaux d\'entrepreneurs', type: 'text', required: false },
      { key: 'pitch_deck_url', label: 'Lien Pitch Deck / Site de la startup', type: 'text', required: false },
    ]),
    body: buildBody('#1a0a2e', '#4a235a', '#8e44ad'),
    formatsJson: '["pdf","docx"]',
    templateType: 'document',
    popularity: 75,
  },

  // ══════════════════════════════════════════════
  // 27. cv_restauration_hotel — Responsable Restauration / Hôtellerie
  // ══════════════════════════════════════════════
  {
    code: 'cv_restauration_hotel',
    name: 'CV Responsable Restauration / Hôtellerie',
    category: 'rh_emploi',
    price: 800,
    priceMax: 1500,
    description: 'CV élégant pour managers en hôtellerie-restauration, directeurs d\'établissement, chefs de cuisine et responsables F&B. Sections établissements gérés, étoiles, normes HACCP et coût matière.',
    fieldsJson: F([
      ...baseFields,
      { key: 'type_etablissement', label: 'Type d\'établissement (hôtel 3/4/5 étoiles, restaurant gastronomique, chaîne…)', type: 'text', required: true },
      { key: 'capacite_accueil', label: 'Capacité d\'accueil gérée (couverts/jour, chambres)', type: 'text', required: false },
      { key: 'normes_hygiene', label: 'Normes d\'hygiène maîtrisées (HACCP, ISO 22000, PMS…)', type: 'text', required: false },
      { key: 'cuisines_maitrisees', label: 'Cuisines / Spécialités culinaires maîtrisées', type: 'text', required: false },
      { key: 'logiciels_hotel', label: 'Logiciels hôteliers (Opera PMS, Micros, FOLS, Fidelio…)', type: 'text', required: false },
    ]),
    body: buildBody('#2a0a00', '#6e2c00', '#e65100'),
    formatsJson: '["pdf","docx"]',
    templateType: 'document',
    popularity: 60,
  },

  // ══════════════════════════════════════════════
  // 28. cv_securite — Responsable Sécurité / RSSI / Risk Manager
  // ══════════════════════════════════════════════
  {
    code: 'cv_securite',
    name: 'CV Responsable Sécurité / RSSI / Risk Manager',
    category: 'rh_emploi',
    price: 1200,
    priceMax: 2000,
    description: 'CV pour RSSI, responsables sécurité des systèmes d\'information et risk managers. Sections gouvernance sécurité, gestion des incidents, normes ISO 27001 et outils SIEM.',
    fieldsJson: F([
      ...baseFields,
      { key: 'type_securite', label: 'Type de sécurité (cybersécurité SI, sécurité physique, risk management…)', type: 'text', required: true },
      { key: 'normes_securite', label: 'Normes et cadres maîtrisés (ISO 27001, NIST, SOC 2, PCI-DSS, RGPD…)', type: 'text', required: true },
      { key: 'outils_securite', label: 'Outils de sécurité (SIEM, SOC, EDR, CASB, firewall, Splunk, QRadar…)', type: 'text', required: false },
      { key: 'certifications_securite', label: 'Certifications sécurité (CISSP, CISM, CEH, ISO 27001 Lead Auditor…)', type: 'text', required: false },
      { key: 'incidents_geres', label: 'Incidents / crises gérées (type, impact, résolution)', type: 'textarea', required: false },
    ]),
    body: buildBody('#0a0a0a', '#1a1a2e', '#c0392b'),
    formatsJson: '["pdf","docx"]',
    templateType: 'document',
    popularity: 64,
  },

  // ══════════════════════════════════════════════
  // 29. cv_international — Profil bilingue / International
  // ══════════════════════════════════════════════
  {
    code: 'cv_international',
    name: 'CV Bilingue / Profil international (FR/EN)',
    category: 'rh_emploi',
    price: 1000,
    priceMax: 1800,
    description: 'CV bilingue français-anglais pour profils internationaux, expatriés et candidats aux organisations internationales (ONU, ONG, Banque Mondiale, Union Africaine). Structure adaptée aux standards internationaux.',
    fieldsJson: F([
      ...baseFields,
      { key: 'nationalite', label: 'Nationalité(s)', type: 'text', required: false },
      { key: 'visa_permis', label: 'Statut visa / Permis de travail (pays)', type: 'text', required: false },
      { key: 'organisations_int', label: 'Organisations internationales / ONG ciblées', type: 'text', required: false },
      { key: 'mobilite_geo', label: 'Mobilité géographique (pays, continents)', type: 'text', required: false },
      { key: 'publications_int', label: 'Publications / rapports internationaux', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family: 'Georgia', serif; max-width: 800px; margin: 0 auto; box-shadow: 0 2px 12px rgba(0,0,0,0.12);">
  <div style="background: linear-gradient(135deg, #1a3a5c 0%, #c0392b 50%, #f39c12 100%); color: white; padding: 40px 40px 28px; border-radius: 4px 4px 0 0;">
    <h1 style="margin: 0 0 4px; font-size: 28px; font-weight: 700; letter-spacing: 1px;">{{prenom_nom}}</h1>
    <p style="margin: 0 0 16px; font-size: 15px; opacity: 0.9; font-weight: 300;">{{titre_poste}}</p>
    <div style="display: flex; gap: 18px; flex-wrap: wrap; font-size: 12px; opacity: 0.9; border-top: 1px solid rgba(255,255,255,0.3); padding-top: 14px;">
      <span>✉ {{email}}</span><span>📱 {{telephone}}</span><span>📍 {{ville_pays}}</span><span>🔗 {{linkedin}}</span>
    </div>
  </div>
  <div style="padding: 28px 40px 32px; background: #fff; border: 1px solid #e8e8e8; border-top: none; border-radius: 0 0 4px 4px;">
    <section style="margin-bottom: 26px;">
      <h2 style="color: #1a3a5c; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 2.5px; border-bottom: 2px solid #c0392b; padding-bottom: 6px; margin-bottom: 12px;">Professional Profile / Profil professionnel</h2>
      <p style="font-size: 13px; line-height: 1.75; color: #333; margin: 0;">{{resume_profil}}</p>
    </section>
    <section style="margin-bottom: 26px;">
      <h2 style="color: #1a3a5c; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 2.5px; border-bottom: 2px solid #c0392b; padding-bottom: 6px; margin-bottom: 14px;">Professional Experience / Expériences</h2>
      <div style="margin-bottom: 18px; padding-left: 12px; border-left: 3px solid #f39c12;">
        <div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 4px;">
          <strong style="font-size: 13px;">{{experience_1_poste}}</strong>
          <span style="font-size: 11px; color: #777; background: #f5f5f5; padding: 2px 8px; border-radius: 10px;">{{experience_1_periode}}</span>
        </div>
        <div style="font-size: 12px; color: #c0392b; margin: 3px 0 6px; font-weight: 600;">{{experience_1_entreprise}}</div>
        <p style="font-size: 12px; line-height: 1.65; color: #444; margin: 0;">{{experience_1_missions}}</p>
      </div>
      <div style="margin-bottom: 18px; padding-left: 12px; border-left: 3px solid #f39c12;">
        <div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 4px;">
          <strong style="font-size: 13px;">{{experience_2_poste}}</strong>
          <span style="font-size: 11px; color: #777; background: #f5f5f5; padding: 2px 8px; border-radius: 10px;">{{experience_2_periode}}</span>
        </div>
        <div style="font-size: 12px; color: #c0392b; margin: 3px 0 6px; font-weight: 600;">{{experience_2_entreprise}}</div>
        <p style="font-size: 12px; line-height: 1.65; color: #444; margin: 0;">{{experience_2_missions}}</p>
      </div>
      <div style="margin-bottom: 4px; padding-left: 12px; border-left: 3px solid #f39c12;">
        <div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 4px;">
          <strong style="font-size: 13px;">{{experience_3_poste}}</strong>
          <span style="font-size: 11px; color: #777; background: #f5f5f5; padding: 2px 8px; border-radius: 10px;">{{experience_3_periode}}</span>
        </div>
        <div style="font-size: 12px; color: #c0392b; margin: 3px 0 6px; font-weight: 600;">{{experience_3_entreprise}}</div>
        <p style="font-size: 12px; line-height: 1.65; color: #444; margin: 0;">{{experience_3_missions}}</p>
      </div>
    </section>
    <section style="margin-bottom: 26px;">
      <h2 style="color: #1a3a5c; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 2.5px; border-bottom: 2px solid #c0392b; padding-bottom: 6px; margin-bottom: 14px;">Education / Formation</h2>
      <div style="margin-bottom: 10px;">
        <strong style="font-size: 13px;">{{formation_1_diplome}}</strong>
        <span style="font-size: 11px; color: #777;"> — {{formation_1_annee}}</span>
        <div style="font-size: 12px; color: #555; margin-top: 2px; font-style: italic;">{{formation_1_etablissement}}</div>
      </div>
      <div>
        <strong style="font-size: 13px;">{{formation_2_diplome}}</strong>
        <span style="font-size: 11px; color: #777;"> — {{formation_2_annee}}</span>
        <div style="font-size: 12px; color: #555; margin-top: 2px; font-style: italic;">{{formation_2_etablissement}}</div>
      </div>
    </section>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 20px;">
      <section>
        <h2 style="color: #1a3a5c; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 2.5px; border-bottom: 2px solid #c0392b; padding-bottom: 6px; margin-bottom: 10px;">Skills / Compétences</h2>
        <p style="font-size: 12px; line-height: 1.75; color: #444; margin: 0;">{{competences_techniques}}</p>
      </section>
      <section>
        <h2 style="color: #1a3a5c; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 2.5px; border-bottom: 2px solid #c0392b; padding-bottom: 6px; margin-bottom: 10px;">Languages & Certifications</h2>
        <p style="font-size: 12px; line-height: 1.75; color: #444; margin: 0 0 8px;">{{competences_linguistiques}}</p>
        <p style="font-size: 12px; line-height: 1.75; color: #444; margin: 0;">{{certifications}}</p>
      </section>
    </div>
    <section style="background: #f9f9f9; border-radius: 4px; padding: 12px 16px;">
      <h2 style="color: #1a3a5c; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 2.5px; margin: 0 0 6px;">Interests / Centres d'intérêt</h2>
      <p style="font-size: 12px; color: #555; margin: 0;">{{centres_interet}}</p>
    </section>
  </div>
</div>`,
    formatsJson: '["pdf","docx"]',
    templateType: 'document',
    popularity: 70,
  },

  // ══════════════════════════════════════════════
  // 30. cv_fonctionnaire — Fonctionnaire / Concours
  // ══════════════════════════════════════════════
  {
    code: 'cv_fonctionnaire',
    name: 'CV Fonctionnaire / Candidature concours de la fonction publique',
    category: 'rh_emploi',
    price: 700,
    priceMax: 1200,
    description: 'CV adapté aux candidatures dans la fonction publique, aux concours administratifs et aux postes dans les institutions de l\'État. Format sobre et structuré, conforme aux attentes des jurys.',
    fieldsJson: F([
      ...baseFields,
      { key: 'corps_grade', label: 'Corps / Grade visé (Attaché d\'Administration, Inspecteur, Commissaire…)', type: 'text', required: true },
      { key: 'concours_vise', label: 'Concours visé / Poste ouvert', type: 'text', required: true },
      { key: 'administration_cible', label: 'Ministère / Administration ciblée', type: 'text', required: false },
      { key: 'situation_actuelle', label: 'Situation actuelle (fonctionnaire en poste, contractuel, civil…)', type: 'text', required: false },
      { key: 'anciennete_service', label: 'Ancienneté dans les services publics (années)', type: 'text', required: false },
    ]),
    body: `<div style="font-family: 'Times New Roman', Georgia, serif; max-width: 800px; margin: 0 auto; box-shadow: 0 2px 12px rgba(0,0,0,0.10);">
  <div style="background: linear-gradient(135deg, #0a2744 0%, #1a4a8a 100%); color: white; padding: 36px 40px 24px; border-radius: 4px 4px 0 0; border-top: 6px solid #c9a227;">
    <div style="text-align: center;">
      <h1 style="margin: 0 0 4px; font-size: 24px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;">{{prenom_nom}}</h1>
      <p style="margin: 0 0 16px; font-size: 14px; opacity: 0.9; font-weight: 400; letter-spacing: 0.5px;">{{titre_poste}}</p>
      <div style="display: flex; justify-content: center; gap: 24px; flex-wrap: wrap; font-size: 12px; opacity: 0.85; border-top: 1px solid rgba(255,255,255,0.3); padding-top: 12px;">
        <span>✉ {{email}}</span><span>📱 {{telephone}}</span><span>📍 {{ville_pays}}</span>
      </div>
    </div>
  </div>
  <div style="padding: 28px 40px 32px; background: #fff; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 4px 4px;">
    <section style="margin-bottom: 24px; background: #f4f6f9; padding: 14px 18px; border-left: 4px solid #c9a227; border-radius: 0 4px 4px 0;">
      <h2 style="color: #0a2744; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 8px;">Profil — Candidature au concours : {{concours_vise}}</h2>
      <p style="font-size: 13px; line-height: 1.75; color: #333; margin: 0;">{{resume_profil}}</p>
    </section>
    <section style="margin-bottom: 24px;">
      <h2 style="color: #0a2744; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; border-bottom: 2px solid #c9a227; padding-bottom: 5px; margin-bottom: 14px;">Expériences professionnelles</h2>
      <div style="margin-bottom: 16px; padding-left: 12px; border-left: 3px solid #1a4a8a;">
        <div style="display: flex; justify-content: space-between; flex-wrap: wrap;">
          <strong style="font-size: 13px;">{{experience_1_poste}}</strong>
          <span style="font-size: 11px; color: #777; background: #f0f0f0; padding: 2px 8px; border-radius: 10px;">{{experience_1_periode}}</span>
        </div>
        <div style="font-size: 12px; color: #1a4a8a; margin: 3px 0 6px; font-style: italic;">{{experience_1_entreprise}}</div>
        <p style="font-size: 12px; line-height: 1.65; color: #444; margin: 0;">{{experience_1_missions}}</p>
      </div>
      <div style="margin-bottom: 16px; padding-left: 12px; border-left: 3px solid #1a4a8a;">
        <div style="display: flex; justify-content: space-between; flex-wrap: wrap;">
          <strong style="font-size: 13px;">{{experience_2_poste}}</strong>
          <span style="font-size: 11px; color: #777; background: #f0f0f0; padding: 2px 8px; border-radius: 10px;">{{experience_2_periode}}</span>
        </div>
        <div style="font-size: 12px; color: #1a4a8a; margin: 3px 0 6px; font-style: italic;">{{experience_2_entreprise}}</div>
        <p style="font-size: 12px; line-height: 1.65; color: #444; margin: 0;">{{experience_2_missions}}</p>
      </div>
      <div style="margin-bottom: 4px; padding-left: 12px; border-left: 3px solid #1a4a8a;">
        <div style="display: flex; justify-content: space-between; flex-wrap: wrap;">
          <strong style="font-size: 13px;">{{experience_3_poste}}</strong>
          <span style="font-size: 11px; color: #777; background: #f0f0f0; padding: 2px 8px; border-radius: 10px;">{{experience_3_periode}}</span>
        </div>
        <div style="font-size: 12px; color: #1a4a8a; margin: 3px 0 6px; font-style: italic;">{{experience_3_entreprise}}</div>
        <p style="font-size: 12px; line-height: 1.65; color: #444; margin: 0;">{{experience_3_missions}}</p>
      </div>
    </section>
    <section style="margin-bottom: 24px;">
      <h2 style="color: #0a2744; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; border-bottom: 2px solid #c9a227; padding-bottom: 5px; margin-bottom: 14px;">Formation académique</h2>
      <div style="margin-bottom: 10px;">
        <strong style="font-size: 13px;">{{formation_1_diplome}}</strong>
        <span style="font-size: 11px; color: #777;"> — {{formation_1_annee}}</span>
        <div style="font-size: 12px; color: #555; font-style: italic; margin-top: 2px;">{{formation_1_etablissement}}</div>
      </div>
      <div>
        <strong style="font-size: 13px;">{{formation_2_diplome}}</strong>
        <span style="font-size: 11px; color: #777;"> — {{formation_2_annee}}</span>
        <div style="font-size: 12px; color: #555; font-style: italic; margin-top: 2px;">{{formation_2_etablissement}}</div>
      </div>
    </section>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 20px;">
      <section>
        <h2 style="color: #0a2744; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; border-bottom: 2px solid #c9a227; padding-bottom: 5px; margin-bottom: 10px;">Compétences</h2>
        <p style="font-size: 12px; line-height: 1.75; color: #444; margin: 0;">{{competences_techniques}}</p>
      </section>
      <section>
        <h2 style="color: #0a2744; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; border-bottom: 2px solid #c9a227; padding-bottom: 5px; margin-bottom: 10px;">Langues & Certifications</h2>
        <p style="font-size: 12px; line-height: 1.75; color: #444; margin: 0 0 6px;">{{competences_linguistiques}}</p>
        <p style="font-size: 12px; line-height: 1.75; color: #444; margin: 0;">{{certifications}}</p>
      </section>
    </div>
    <section style="background: #f4f6f9; border-radius: 4px; padding: 12px 16px;">
      <h2 style="color: #0a2744; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 6px;">Centres d'intérêt</h2>
      <p style="font-size: 12px; color: #555; margin: 0;">{{centres_interet}}</p>
    </section>
  </div>
</div>`,
    formatsJson: '["pdf","docx"]',
    templateType: 'document',
    popularity: 65,
  },
];

async function main() {
  let created = 0;
  let updated = 0;

  for (const t of templates) {
    const existing = await prisma.documentTemplate.findUnique({ where: { code: t.code } });
    if (existing) {
      await prisma.documentTemplate.update({ where: { code: t.code }, data: t });
      updated++;
    } else {
      await prisma.documentTemplate.create({ data: t });
      created++;
    }
  }

  const total = await prisma.documentTemplate.count();
  console.log(`✅ Seed CV Pro terminé. ${templates.length} templates traités (créés: ${created}, mis à jour: ${updated}) — Total BDD: ${total}`);
}

main()
  .catch((e) => {
    console.error('❌ Erreur seed CV Pro:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
