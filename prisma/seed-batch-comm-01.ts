import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  let created = 0, updated = 0;

  const templates = [
    // ── CORPORATE (corp_001..010) ──────────────────────────────────────────
    {
      code: 'corp_001',
      name: 'Plan de communication corporate annuel',
      category: 'communication',
      templateType: 'pdf',
      classe: 'A',
      price: 12000,
      priceMax: 14000,
      popularity: 88,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'company_name', label: 'Nom de l\'entreprise', type: 'text', required: true },
        { name: 'fiscal_year', label: 'Exercice fiscal', type: 'text', required: true },
        { name: 'objectives', label: 'Objectifs de communication', type: 'textarea', required: true },
        { name: 'start_date', label: 'Date de début', type: 'date', required: true },
      ]),
      body: `<h2>Plan de Communication Corporate</h2>
<p><strong>Entreprise :</strong> {{company_name}} — Exercice {{fiscal_year}}</p>
<p><strong>Objectifs :</strong> {{objectives}}</p>
<p>Ce plan définit les axes stratégiques, les canaux prioritaires et le budget alloué à la communication pour l'année en cours.</p>
<p><em>Document confidentiel — usage interne uniquement.</em></p>`,
    },
    {
      code: 'corp_002',
      name: 'Stratégie de communication de crise',
      category: 'communication',
      templateType: 'pdf',
      classe: 'A',
      price: 13000,
      priceMax: 15000,
      popularity: 76,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'company_name', label: 'Entreprise', type: 'text', required: true },
        { name: 'crisis_type', label: 'Nature de la crise', type: 'textarea', required: true },
        { name: 'contact_name', label: 'Responsable communication', type: 'text', required: true },
        { name: 'date', label: 'Date d\'activation', type: 'date', required: true },
      ]),
      body: `<h2>Stratégie de Communication de Crise</h2>
<p><strong>Entreprise :</strong> {{company_name}} | <strong>Responsable :</strong> {{contact_name}}</p>
<p><strong>Nature de la crise :</strong> {{crisis_type}}</p>
<p>Ce document établit les protocoles de prise de parole, la cellule de crise et les messages-clés à diffuser.</p>
<p><em>Activation le {{date}} — diffusion restreinte aux membres de la cellule de crise.</em></p>`,
    },
    {
      code: 'corp_003',
      name: 'Rapport de communication trimestriel',
      category: 'communication',
      templateType: 'pdf',
      classe: 'B',
      price: 7000,
      priceMax: 9000,
      popularity: 65,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'company_name', label: 'Entreprise', type: 'text', required: true },
        { name: 'quarter', label: 'Trimestre (ex: T1 2025)', type: 'text', required: true },
        { name: 'summary', label: 'Résumé des actions menées', type: 'textarea', required: true },
        { name: 'report_date', label: 'Date du rapport', type: 'date', required: true },
      ]),
      body: `<h2>Rapport Communication — {{quarter}}</h2>
<p><strong>Entreprise :</strong> {{company_name}} | <strong>Date :</strong> {{report_date}}</p>
<p><strong>Synthèse :</strong> {{summary}}</p>
<p>Ce rapport présente les KPIs atteints, les retombées médias et les recommandations pour le trimestre suivant.</p>
<p><em>Document réservé à la direction générale et à l'équipe communication.</em></p>`,
    },
    {
      code: 'corp_004',
      name: 'Note interne de communication',
      category: 'communication',
      templateType: 'pdf',
      classe: 'C',
      price: 500,
      priceMax: 2500,
      popularity: 72,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'recipient', label: 'Destinataire(s)', type: 'text', required: true },
        { name: 'subject', label: 'Objet', type: 'text', required: true },
        { name: 'message', label: 'Corps du message', type: 'textarea', required: true },
        { name: 'date', label: 'Date', type: 'date', required: true },
      ]),
      body: `<h2>Note Interne</h2>
<p><strong>À :</strong> {{recipient}} | <strong>Date :</strong> {{date}}</p>
<p><strong>Objet :</strong> {{subject}}</p>
<p>{{message}}</p>
<p><em>Ce document est à usage interne exclusivement.</em></p>`,
    },
    {
      code: 'corp_005',
      name: 'Plan de lancement produit',
      category: 'communication',
      templateType: 'pdf',
      classe: 'A',
      price: 11000,
      priceMax: 13000,
      popularity: 83,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'product_name', label: 'Nom du produit', type: 'text', required: true },
        { name: 'target', label: 'Cible', type: 'textarea', required: true },
        { name: 'launch_date', label: 'Date de lancement', type: 'date', required: true },
        { name: 'budget', label: 'Budget alloué', type: 'text', required: false },
      ]),
      body: `<h2>Plan de Lancement — {{product_name}}</h2>
<p><strong>Cible :</strong> {{target}} | <strong>Lancement :</strong> {{launch_date}}</p>
<p><strong>Budget :</strong> {{budget}}</p>
<p>Ce plan détaille les phases de teasing, de lancement et de post-lancement ainsi que les canaux activés.</p>
<p><em>Document stratégique confidentiel.</em></p>`,
    },
    {
      code: 'corp_006',
      name: 'Discours institutionnel dirigeant',
      category: 'communication',
      templateType: 'pdf',
      classe: 'B',
      price: 6000,
      priceMax: 8000,
      popularity: 55,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'speaker_name', label: 'Nom de l\'intervenant', type: 'text', required: true },
        { name: 'event_name', label: 'Nom de l\'événement', type: 'text', required: true },
        { name: 'speech_content', label: 'Contenu du discours', type: 'textarea', required: true },
        { name: 'event_date', label: 'Date de l\'événement', type: 'date', required: true },
      ]),
      body: `<h2>Discours — {{event_name}}</h2>
<p><strong>Intervenant :</strong> {{speaker_name}} | <strong>Date :</strong> {{event_date}}</p>
<p>{{speech_content}}</p>
<p><em>Usage exclusif de l'intervenant — ne pas diffuser.</em></p>`,
    },
    {
      code: 'corp_007',
      name: 'Revue de presse mensuelle',
      category: 'communication',
      templateType: 'pdf',
      classe: 'B',
      price: 5000,
      priceMax: 7000,
      popularity: 61,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'company_name', label: 'Entreprise', type: 'text', required: true },
        { name: 'month', label: 'Mois concerné', type: 'text', required: true },
        { name: 'highlights', label: 'Points saillants', type: 'textarea', required: true },
        { name: 'date', label: 'Date d\'édition', type: 'date', required: true },
      ]),
      body: `<h2>Revue de Presse — {{month}}</h2>
<p><strong>Entreprise :</strong> {{company_name}} | <strong>Éditée le :</strong> {{date}}</p>
<p><strong>Points saillants :</strong> {{highlights}}</p>
<p>Cette revue compile les articles et mentions identifiés sur la période et évalue le sentiment médiatique global.</p>
<p><em>Document interne — équipe communication.</em></p>`,
    },
    {
      code: 'corp_008',
      name: 'Plan événementiel corporate',
      category: 'communication',
      templateType: 'excel',
      classe: 'A',
      price: 9000,
      priceMax: 11000,
      popularity: 79,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'event_name', label: 'Nom de l\'événement', type: 'text', required: true },
        { name: 'location', label: 'Lieu', type: 'text', required: true },
        { name: 'description', label: 'Description', type: 'textarea', required: false },
        { name: 'event_date', label: 'Date de l\'événement', type: 'date', required: true },
      ]),
      body: `<h2>Plan Événementiel — {{event_name}}</h2>
<p><strong>Lieu :</strong> {{location}} | <strong>Date :</strong> {{event_date}}</p>
<p><strong>Description :</strong> {{description}}</p>
<p>Ce tableau de bord liste les tâches, responsables, échéances et budgets pour chaque phase de l'événement.</p>
<p><em>Fichier de suivi opérationnel — équipe projet.</em></p>`,
    },
    {
      code: 'corp_009',
      name: 'Charte graphique et éditoriale',
      category: 'communication',
      templateType: 'pdf',
      classe: 'A',
      price: 10000,
      priceMax: 12000,
      popularity: 70,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'brand_name', label: 'Nom de la marque', type: 'text', required: true },
        { name: 'brand_values', label: 'Valeurs de la marque', type: 'textarea', required: true },
        { name: 'tone_of_voice', label: 'Ton éditorial', type: 'textarea', required: true },
        { name: 'date', label: 'Date de mise à jour', type: 'date', required: true },
      ]),
      body: `<h2>Charte Graphique & Éditoriale — {{brand_name}}</h2>
<p><strong>Valeurs :</strong> {{brand_values}}</p>
<p><strong>Ton éditorial :</strong> {{tone_of_voice}}</p>
<p>Ce document de référence définit les règles d'usage du logo, des couleurs, de la typographie et du style rédactionnel.</p>
<p><em>Mise à jour le {{date}} — document de référence interne.</em></p>`,
    },
    {
      code: 'corp_010',
      name: 'Plan de communication interne RH',
      category: 'communication',
      templateType: 'pdf',
      classe: 'B',
      price: 7500,
      priceMax: 9500,
      popularity: 58,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'company_name', label: 'Entreprise', type: 'text', required: true },
        { name: 'period', label: 'Période couverte', type: 'text', required: true },
        { name: 'actions', label: 'Actions de communication prévues', type: 'textarea', required: true },
        { name: 'start_date', label: 'Date de démarrage', type: 'date', required: true },
      ]),
      body: `<h2>Plan Communication Interne RH — {{company_name}}</h2>
<p><strong>Période :</strong> {{period}} | <strong>Démarrage :</strong> {{start_date}}</p>
<p><strong>Actions prévues :</strong> {{actions}}</p>
<p>Ce plan coordonne les messages RH (onboarding, culture, changements) diffusés aux collaborateurs.</p>
<p><em>Document réservé à la DRH et à la direction communication.</em></p>`,
    },

    // ── PRESSE (presse_001..010) ───────────────────────────────────────────
    {
      code: 'presse_001',
      name: 'Communiqué de presse standard',
      category: 'communication',
      templateType: 'pdf',
      classe: 'B',
      price: 3000,
      priceMax: 5000,
      popularity: 92,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'company_name', label: 'Entreprise', type: 'text', required: true },
        { name: 'headline', label: 'Titre du communiqué', type: 'text', required: true },
        { name: 'content', label: 'Corps du communiqué', type: 'textarea', required: true },
        { name: 'release_date', label: 'Date de diffusion', type: 'date', required: true },
      ]),
      body: `<h2>COMMUNIQUÉ DE PRESSE</h2>
<p><strong>{{headline}}</strong></p>
<p><em>{{company_name}} — Pour diffusion le {{release_date}}</em></p>
<p>{{content}}</p>
<p>Contact presse : relations-presse@{{company_name}}.com</p>`,
    },
    {
      code: 'presse_002',
      name: 'Dossier de presse produit',
      category: 'communication',
      templateType: 'pdf',
      classe: 'A',
      price: 8000,
      priceMax: 10000,
      popularity: 74,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'product_name', label: 'Nom du produit', type: 'text', required: true },
        { name: 'description', label: 'Description du produit', type: 'textarea', required: true },
        { name: 'company_name', label: 'Entreprise', type: 'text', required: true },
        { name: 'launch_date', label: 'Date de lancement', type: 'date', required: true },
      ]),
      body: `<h2>Dossier de Presse — {{product_name}}</h2>
<p><strong>Entreprise :</strong> {{company_name}} | <strong>Lancement :</strong> {{launch_date}}</p>
<p><strong>Présentation :</strong> {{description}}</p>
<p>Ce dossier comprend fiches techniques, visuels HD, biographies et citations pour les médias.</p>
<p><em>Embargo jusqu'au {{launch_date}} — ne pas publier avant cette date.</em></p>`,
    },
    {
      code: 'presse_003',
      name: 'Communiqué de crise',
      category: 'communication',
      templateType: 'pdf',
      classe: 'A',
      price: 9000,
      priceMax: 11000,
      popularity: 68,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'company_name', label: 'Entreprise', type: 'text', required: true },
        { name: 'incident', label: 'Description de l\'incident', type: 'textarea', required: true },
        { name: 'measures', label: 'Mesures prises', type: 'textarea', required: true },
        { name: 'date', label: 'Date du communiqué', type: 'date', required: true },
      ]),
      body: `<h2>Communiqué de Presse — Situation de Crise</h2>
<p><strong>{{company_name}}</strong> | <em>{{date}}</em></p>
<p><strong>Contexte :</strong> {{incident}}</p>
<p><strong>Mesures engagées :</strong> {{measures}}</p>
<p>Contact presse d'urgence disponible 24h/24 — coordonnées en annexe.</p>`,
    },
    {
      code: 'presse_004',
      name: 'Fiche média journaliste',
      category: 'communication',
      templateType: 'pdf',
      classe: 'C',
      price: 1500,
      priceMax: 3500,
      popularity: 50,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'journalist_name', label: 'Nom du journaliste', type: 'text', required: true },
        { name: 'media_name', label: 'Nom du média', type: 'text', required: true },
        { name: 'coverage', label: 'Domaines de couverture', type: 'textarea', required: true },
        { name: 'update_date', label: 'Date de mise à jour', type: 'date', required: true },
      ]),
      body: `<h2>Fiche Média</h2>
<p><strong>Journaliste :</strong> {{journalist_name}} | <strong>Média :</strong> {{media_name}}</p>
<p><strong>Couverture :</strong> {{coverage}}</p>
<p><em>Mise à jour le {{update_date}} — usage interne relations presse.</em></p>`,
    },
    {
      code: 'presse_005',
      name: 'Revue de presse quotidienne',
      category: 'communication',
      templateType: 'pdf',
      classe: 'C',
      price: 2000,
      priceMax: 4000,
      popularity: 63,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'company_name', label: 'Entreprise', type: 'text', required: true },
        { name: 'articles', label: 'Articles sélectionnés', type: 'textarea', required: true },
        { name: 'date', label: 'Date', type: 'date', required: true },
      ]),
      body: `<h2>Revue de Presse du {{date}}</h2>
<p><strong>Entreprise :</strong> {{company_name}}</p>
<p><strong>Sélection d'articles :</strong> {{articles}}</p>
<p>Synthèse des parutions du jour : presse nationale, régionale, spécialisée et digital.</p>
<p><em>Diffusion : direction générale + équipe communication — 8h00.</em></p>`,
    },
    {
      code: 'presse_006',
      name: 'Plan relations médias annuel',
      category: 'communication',
      templateType: 'excel',
      classe: 'A',
      price: 10000,
      priceMax: 12000,
      popularity: 71,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'company_name', label: 'Entreprise', type: 'text', required: true },
        { name: 'year', label: 'Année', type: 'text', required: true },
        { name: 'media_targets', label: 'Médias cibles', type: 'textarea', required: true },
        { name: 'start_date', label: 'Date de départ', type: 'date', required: true },
      ]),
      body: `<h2>Plan Relations Médias — {{year}}</h2>
<p><strong>Entreprise :</strong> {{company_name}} | <strong>Démarrage :</strong> {{start_date}}</p>
<p><strong>Médias cibles :</strong> {{media_targets}}</p>
<p>Ce tableau planifie les prises de contact, les événements presse et les jalons de diffusion.</p>
<p><em>Document stratégique — direction communication.</em></p>`,
    },
    {
      code: 'presse_007',
      name: 'Invitation conférence de presse',
      category: 'communication',
      templateType: 'pdf',
      classe: 'C',
      price: 1000,
      priceMax: 3000,
      popularity: 80,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'company_name', label: 'Entreprise', type: 'text', required: true },
        { name: 'event_theme', label: 'Thème de la conférence', type: 'text', required: true },
        { name: 'location', label: 'Lieu', type: 'text', required: true },
        { name: 'event_date', label: 'Date et heure', type: 'date', required: true },
      ]),
      body: `<h2>Invitation — Conférence de Presse</h2>
<p><strong>{{company_name}}</strong> vous invite à sa conférence de presse : <em>{{event_theme}}</em></p>
<p><strong>Lieu :</strong> {{location}} | <strong>Date :</strong> {{event_date}}</p>
<p>Accréditation obligatoire. Merci de confirmer votre présence par retour de mail.</p>
<p>Contact presse : relations-presse@{{company_name}}.com</p>`,
    },
    {
      code: 'presse_008',
      name: 'Kit presse entreprise',
      category: 'communication',
      templateType: 'pdf',
      classe: 'A',
      price: 7000,
      priceMax: 9000,
      popularity: 66,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'company_name', label: 'Entreprise', type: 'text', required: true },
        { name: 'company_overview', label: 'Présentation de l\'entreprise', type: 'textarea', required: true },
        { name: 'key_figures', label: 'Chiffres clés', type: 'textarea', required: false },
        { name: 'date', label: 'Date d\'édition', type: 'date', required: true },
      ]),
      body: `<h2>Kit Presse — {{company_name}}</h2>
<p><strong>Présentation :</strong> {{company_overview}}</p>
<p><strong>Chiffres clés :</strong> {{key_figures}}</p>
<p>Ce kit inclut : fiche signalétique, biographies dirigeants, logos HD, citations autorisées.</p>
<p><em>Édition {{date}} — à usage exclusif des journalistes accrédités.</em></p>`,
    },
    {
      code: 'presse_009',
      name: 'Rapport de retombées presse',
      category: 'communication',
      templateType: 'excel',
      classe: 'B',
      price: 5000,
      priceMax: 7000,
      popularity: 57,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'company_name', label: 'Entreprise', type: 'text', required: true },
        { name: 'period', label: 'Période analysée', type: 'text', required: true },
        { name: 'summary', label: 'Résumé des retombées', type: 'textarea', required: true },
        { name: 'report_date', label: 'Date du rapport', type: 'date', required: true },
      ]),
      body: `<h2>Rapport de Retombées Presse — {{period}}</h2>
<p><strong>Entreprise :</strong> {{company_name}} | <strong>Date :</strong> {{report_date}}</p>
<p><strong>Résumé :</strong> {{summary}}</p>
<p>Ce tableau récapitule les articles, reach estimé, sentiment et équivalent publicitaire (AVE).</p>
<p><em>Document analytique — équipe relations presse.</em></p>`,
    },
    {
      code: 'presse_010',
      name: 'Communiqué de presse événement',
      category: 'communication',
      templateType: 'pdf',
      classe: 'B',
      price: 3500,
      priceMax: 5500,
      popularity: 85,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'event_name', label: 'Nom de l\'événement', type: 'text', required: true },
        { name: 'company_name', label: 'Organisateur', type: 'text', required: true },
        { name: 'event_summary', label: 'Résumé de l\'événement', type: 'textarea', required: true },
        { name: 'event_date', label: 'Date de l\'événement', type: 'date', required: true },
      ]),
      body: `<h2>COMMUNIQUÉ DE PRESSE — {{event_name}}</h2>
<p><strong>Organisateur :</strong> {{company_name}} | <strong>Date :</strong> {{event_date}}</p>
<p>{{event_summary}}</p>
<p>Pour toute demande d'accréditation ou d'interview, contactez le service presse.</p>
<p><em>Libre de diffusion après le {{event_date}}.</em></p>`,
    },

    // ── BRAND (brand_001..010) ─────────────────────────────────────────────
    {
      code: 'brand_001',
      name: 'Pitch marque investisseurs',
      category: 'communication',
      templateType: 'pdf',
      classe: 'A',
      price: 13000,
      priceMax: 15000,
      popularity: 90,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'brand_name', label: 'Nom de la marque', type: 'text', required: true },
        { name: 'value_proposition', label: 'Proposition de valeur', type: 'textarea', required: true },
        { name: 'market_size', label: 'Taille du marché', type: 'text', required: false },
        { name: 'pitch_date', label: 'Date du pitch', type: 'date', required: true },
      ]),
      body: `<h2>Pitch Marque — {{brand_name}}</h2>
<p><strong>Proposition de valeur :</strong> {{value_proposition}}</p>
<p><strong>Marché adressable :</strong> {{market_size}}</p>
<p>Ce pitch présente la vision, le modèle économique, la traction et les besoins en financement.</p>
<p><em>Présentation confidentielle — {{pitch_date}}.</em></p>`,
    },
    {
      code: 'brand_002',
      name: 'Brief créatif campagne marque',
      category: 'communication',
      templateType: 'pdf',
      classe: 'B',
      price: 6000,
      priceMax: 8000,
      popularity: 78,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'brand_name', label: 'Marque', type: 'text', required: true },
        { name: 'campaign_objective', label: 'Objectif de la campagne', type: 'textarea', required: true },
        { name: 'target_audience', label: 'Audience cible', type: 'textarea', required: true },
        { name: 'deadline', label: 'Date limite de livraison', type: 'date', required: true },
      ]),
      body: `<h2>Brief Créatif — {{brand_name}}</h2>
<p><strong>Objectif :</strong> {{campaign_objective}}</p>
<p><strong>Cible :</strong> {{target_audience}} | <strong>Deadline :</strong> {{deadline}}</p>
<p>Ce brief balise le territoire créatif, le ton, les livrables attendus et les contraintes techniques.</p>
<p><em>Document de référence pour l'agence créative.</em></p>`,
    },
    {
      code: 'brand_003',
      name: 'Stratégie de marque employeur',
      category: 'communication',
      templateType: 'pdf',
      classe: 'A',
      price: 11000,
      priceMax: 13000,
      popularity: 67,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'company_name', label: 'Entreprise', type: 'text', required: true },
        { name: 'evp', label: 'Proposition de valeur employeur (EVP)', type: 'textarea', required: true },
        { name: 'channels', label: 'Canaux de diffusion', type: 'textarea', required: false },
        { name: 'date', label: 'Date d\'élaboration', type: 'date', required: true },
      ]),
      body: `<h2>Stratégie Marque Employeur — {{company_name}}</h2>
<p><strong>EVP :</strong> {{evp}}</p>
<p><strong>Canaux :</strong> {{channels}}</p>
<p>Ce document définit le positionnement RH de l'entreprise auprès des candidats et collaborateurs.</p>
<p><em>Élaboré le {{date}} — DRH & Communication.</em></p>`,
    },
    {
      code: 'brand_004',
      name: 'Guide de marque partenaires',
      category: 'communication',
      templateType: 'pdf',
      classe: 'B',
      price: 7500,
      priceMax: 9500,
      popularity: 59,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'brand_name', label: 'Marque', type: 'text', required: true },
        { name: 'usage_rules', label: 'Règles d\'usage', type: 'textarea', required: true },
        { name: 'contact', label: 'Contact marque', type: 'text', required: false },
        { name: 'date', label: 'Date de mise à jour', type: 'date', required: true },
      ]),
      body: `<h2>Guide de Marque Partenaires — {{brand_name}}</h2>
<p><strong>Règles d'usage :</strong> {{usage_rules}}</p>
<p><strong>Contact :</strong> {{contact}} | <em>Mis à jour le {{date}}</em></p>
<p>Ce guide encadre l'utilisation des actifs de marque par les partenaires et revendeurs.</p>
<p><em>Tout usage non conforme engage la responsabilité du partenaire.</em></p>`,
    },
    {
      code: 'brand_005',
      name: 'Rapport d\'image de marque',
      category: 'communication',
      templateType: 'pdf',
      classe: 'A',
      price: 9500,
      priceMax: 11500,
      popularity: 62,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'brand_name', label: 'Marque', type: 'text', required: true },
        { name: 'period', label: 'Période d\'analyse', type: 'text', required: true },
        { name: 'findings', label: 'Principaux enseignements', type: 'textarea', required: true },
        { name: 'report_date', label: 'Date du rapport', type: 'date', required: true },
      ]),
      body: `<h2>Rapport d'Image de Marque — {{brand_name}}</h2>
<p><strong>Période :</strong> {{period}} | <strong>Date :</strong> {{report_date}}</p>
<p><strong>Enseignements :</strong> {{findings}}</p>
<p>Analyse de notoriété, perception, Net Promoter Score et benchmark concurrentiel.</p>
<p><em>Document stratégique — direction marketing & communication.</em></p>`,
    },
    {
      code: 'brand_006',
      name: 'Contrat de sponsoring',
      category: 'communication',
      templateType: 'pdf',
      classe: 'A',
      price: 12000,
      priceMax: 14000,
      popularity: 73,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'sponsor_name', label: 'Sponsor', type: 'text', required: true },
        { name: 'sponsored_entity', label: 'Entité sponsorisée', type: 'text', required: true },
        { name: 'amount', label: 'Montant du sponsoring', type: 'text', required: true },
        { name: 'start_date', label: 'Date de début', type: 'date', required: true },
      ]),
      body: `<h2>Contrat de Sponsoring</h2>
<p><strong>Sponsor :</strong> {{sponsor_name}} | <strong>Bénéficiaire :</strong> {{sponsored_entity}}</p>
<p><strong>Montant :</strong> {{amount}} | <strong>Début :</strong> {{start_date}}</p>
<p>Ce contrat définit les droits de visibilité, les contreparties et les obligations des deux parties.</p>
<p><em>Document juridiquement contraignant — visa juridique requis avant signature.</em></p>`,
    },
    {
      code: 'brand_007',
      name: 'Plan d\'influence marque',
      category: 'communication',
      templateType: 'excel',
      classe: 'B',
      price: 8000,
      priceMax: 10000,
      popularity: 81,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'brand_name', label: 'Marque', type: 'text', required: true },
        { name: 'influencer_targets', label: 'Influenceurs ciblés', type: 'textarea', required: true },
        { name: 'campaign_objective', label: 'Objectif de la campagne', type: 'textarea', required: true },
        { name: 'start_date', label: 'Date de lancement', type: 'date', required: true },
      ]),
      body: `<h2>Plan d'Influence — {{brand_name}}</h2>
<p><strong>Influenceurs ciblés :</strong> {{influencer_targets}}</p>
<p><strong>Objectif :</strong> {{campaign_objective}} | <strong>Lancement :</strong> {{start_date}}</p>
<p>Ce plan détaille le mapping influenceurs, les KPIs, les briefs et le calendrier de publication.</p>
<p><em>Document stratégique — équipe marketing digital.</em></p>`,
    },
    {
      code: 'brand_008',
      name: 'Plateforme de marque',
      category: 'communication',
      templateType: 'pdf',
      classe: 'A',
      price: 13000,
      priceMax: 15000,
      popularity: 69,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'brand_name', label: 'Nom de la marque', type: 'text', required: true },
        { name: 'brand_mission', label: 'Mission de la marque', type: 'textarea', required: true },
        { name: 'brand_vision', label: 'Vision', type: 'textarea', required: true },
        { name: 'date', label: 'Date de validation', type: 'date', required: true },
      ]),
      body: `<h2>Plateforme de Marque — {{brand_name}}</h2>
<p><strong>Mission :</strong> {{brand_mission}}</p>
<p><strong>Vision :</strong> {{brand_vision}}</p>
<p>Ce document fondateur formalise la raison d'être, les valeurs, le positionnement et le territoire d'expression.</p>
<p><em>Validé le {{date}} — document de référence stratégique.</em></p>`,
    },
    {
      code: 'brand_009',
      name: 'Cahier des charges agence communication',
      category: 'communication',
      templateType: 'pdf',
      classe: 'B',
      price: 6500,
      priceMax: 8500,
      popularity: 64,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'company_name', label: 'Entreprise', type: 'text', required: true },
        { name: 'mission_scope', label: 'Périmètre de la mission', type: 'textarea', required: true },
        { name: 'budget', label: 'Budget indicatif', type: 'text', required: false },
        { name: 'deadline', label: 'Date limite de réponse', type: 'date', required: true },
      ]),
      body: `<h2>Cahier des Charges — Appel d'Offres Communication</h2>
<p><strong>Entreprise :</strong> {{company_name}} | <strong>Réponse avant :</strong> {{deadline}}</p>
<p><strong>Périmètre :</strong> {{mission_scope}}</p>
<p><strong>Budget indicatif :</strong> {{budget}}</p>
<p>Ce document cadre les attentes, livrables et critères d'évaluation des agences candidates.</p>`,
    },
    {
      code: 'brand_010',
      name: 'Bilan de campagne de communication',
      category: 'communication',
      templateType: 'pdf',
      classe: 'B',
      price: 5500,
      priceMax: 7500,
      popularity: 76,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'campaign_name', label: 'Nom de la campagne', type: 'text', required: true },
        { name: 'brand_name', label: 'Marque', type: 'text', required: true },
        { name: 'results', label: 'Résultats obtenus', type: 'textarea', required: true },
        { name: 'end_date', label: 'Date de clôture', type: 'date', required: true },
      ]),
      body: `<h2>Bilan de Campagne — {{campaign_name}}</h2>
<p><strong>Marque :</strong> {{brand_name}} | <strong>Clôture :</strong> {{end_date}}</p>
<p><strong>Résultats :</strong> {{results}}</p>
<p>Analyse post-campagne : reach, engagement, conversions, ROI et enseignements pour les prochains cycles.</p>
<p><em>Document de retour d'expérience — équipe communication.</em></p>`,
    },

    // ── SPOT (spot_001..010) ───────────────────────────────────────────────
    {
      code: 'spot_001',
      name: 'Brief spot publicitaire TV',
      category: 'communication',
      templateType: 'pdf',
      classe: 'A',
      price: 12000,
      priceMax: 14000,
      popularity: 77,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'brand_name', label: 'Marque', type: 'text', required: true },
        { name: 'message', label: 'Message publicitaire clé', type: 'textarea', required: true },
        { name: 'duration', label: 'Durée du spot (secondes)', type: 'text', required: true },
        { name: 'air_date', label: 'Date de diffusion prévue', type: 'date', required: true },
      ]),
      body: `<h2>Brief Spot TV — {{brand_name}}</h2>
<p><strong>Message clé :</strong> {{message}}</p>
<p><strong>Durée :</strong> {{duration}}s | <strong>Diffusion :</strong> {{air_date}}</p>
<p>Ce brief précise le concept créatif, le casting, les décors, la musique et les contraintes légales.</p>
<p><em>Document de travail — production audiovisuelle.</em></p>`,
    },
    {
      code: 'spot_002',
      name: 'Plan média campagne digitale',
      category: 'communication',
      templateType: 'excel',
      classe: 'A',
      price: 11000,
      priceMax: 13000,
      popularity: 86,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'brand_name', label: 'Marque', type: 'text', required: true },
        { name: 'channels', label: 'Canaux digitaux', type: 'textarea', required: true },
        { name: 'budget', label: 'Budget total', type: 'text', required: true },
        { name: 'start_date', label: 'Date de départ', type: 'date', required: true },
      ]),
      body: `<h2>Plan Média Digital — {{brand_name}}</h2>
<p><strong>Canaux :</strong> {{channels}} | <strong>Budget :</strong> {{budget}}</p>
<p><strong>Démarrage :</strong> {{start_date}}</p>
<p>Ce tableau de bord répartit le budget par canal, format et période et projette les KPIs attendus.</p>
<p><em>Document de planification média — équipe achats médias.</em></p>`,
    },
    {
      code: 'spot_003',
      name: 'Script spot radio',
      category: 'communication',
      templateType: 'pdf',
      classe: 'B',
      price: 4000,
      priceMax: 6000,
      popularity: 60,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'brand_name', label: 'Marque', type: 'text', required: true },
        { name: 'script', label: 'Script du spot', type: 'textarea', required: true },
        { name: 'duration', label: 'Durée (secondes)', type: 'text', required: true },
        { name: 'air_date', label: 'Date de diffusion', type: 'date', required: true },
      ]),
      body: `<h2>Script Spot Radio — {{brand_name}}</h2>
<p><strong>Durée :</strong> {{duration}}s | <strong>Diffusion :</strong> {{air_date}}</p>
<p><strong>Script :</strong> {{script}}</p>
<p>Indications de jeu, musique et effets sonores précisés en annexe.</p>
<p><em>Document de studio — production audio.</em></p>`,
    },
    {
      code: 'spot_004',
      name: 'Cahier de diffusion médias',
      category: 'communication',
      templateType: 'excel',
      classe: 'B',
      price: 5000,
      priceMax: 7000,
      popularity: 53,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'campaign_name', label: 'Campagne', type: 'text', required: true },
        { name: 'media_list', label: 'Liste des médias', type: 'textarea', required: true },
        { name: 'start_date', label: 'Début de diffusion', type: 'date', required: true },
      ]),
      body: `<h2>Cahier de Diffusion — {{campaign_name}}</h2>
<p><strong>Médias retenus :</strong> {{media_list}}</p>
<p><strong>Début de diffusion :</strong> {{start_date}}</p>
<p>Ce fichier recense les passages, horaires, formats et coûts bruts/nets par support.</p>
<p><em>Document opérationnel — régie publicitaire.</em></p>`,
    },
    {
      code: 'spot_005',
      name: 'Rapport d\'efficacité publicitaire',
      category: 'communication',
      templateType: 'pdf',
      classe: 'A',
      price: 9000,
      priceMax: 11000,
      popularity: 70,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'campaign_name', label: 'Campagne', type: 'text', required: true },
        { name: 'period', label: 'Période', type: 'text', required: true },
        { name: 'kpis', label: 'KPIs principaux', type: 'textarea', required: true },
        { name: 'report_date', label: 'Date du rapport', type: 'date', required: true },
      ]),
      body: `<h2>Rapport d'Efficacité Publicitaire — {{campaign_name}}</h2>
<p><strong>Période :</strong> {{period}} | <strong>Date :</strong> {{report_date}}</p>
<p><strong>KPIs :</strong> {{kpis}}</p>
<p>Analyse GRP, reach, fréquence, coût au contact et impact sur les ventes.</p>
<p><em>Document post-campagne — direction marketing.</em></p>`,
    },
    {
      code: 'spot_006',
      name: 'Storyboard spot digital',
      category: 'communication',
      templateType: 'pdf',
      classe: 'B',
      price: 6000,
      priceMax: 8000,
      popularity: 74,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'brand_name', label: 'Marque', type: 'text', required: true },
        { name: 'concept', label: 'Concept créatif', type: 'textarea', required: true },
        { name: 'duration', label: 'Durée totale (secondes)', type: 'text', required: true },
        { name: 'delivery_date', label: 'Date de livraison', type: 'date', required: true },
      ]),
      body: `<h2>Storyboard — {{brand_name}}</h2>
<p><strong>Concept :</strong> {{concept}}</p>
<p><strong>Durée :</strong> {{duration}}s | <strong>Livraison :</strong> {{delivery_date}}</p>
<p>Chaque case décrit l'image, la voix off, la musique et les textes à l'écran.</p>
<p><em>Document de validation créative avant tournage.</em></p>`,
    },
    {
      code: 'spot_007',
      name: 'Brief affichage outdoor',
      category: 'communication',
      templateType: 'pdf',
      classe: 'C',
      price: 3000,
      priceMax: 5000,
      popularity: 56,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'brand_name', label: 'Marque', type: 'text', required: true },
        { name: 'message', label: 'Message principal', type: 'textarea', required: true },
        { name: 'locations', label: 'Zones géographiques', type: 'textarea', required: true },
        { name: 'campaign_start', label: 'Date de début campagne', type: 'date', required: true },
      ]),
      body: `<h2>Brief Affichage Outdoor — {{brand_name}}</h2>
<p><strong>Message :</strong> {{message}}</p>
<p><strong>Zones :</strong> {{locations}} | <strong>Départ :</strong> {{campaign_start}}</p>
<p>Ce brief précise les formats (4x3, abri-bus, etc.), la zone de diffusion et les contraintes visuelles.</p>
<p><em>Document de travail — achat espace outdoor.</em></p>`,
    },
    {
      code: 'spot_008',
      name: 'Plan média presse print',
      category: 'communication',
      templateType: 'excel',
      classe: 'B',
      price: 7000,
      priceMax: 9000,
      popularity: 49,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'brand_name', label: 'Marque', type: 'text', required: true },
        { name: 'titles', label: 'Titres de presse', type: 'textarea', required: true },
        { name: 'formats', label: 'Formats d\'annonce', type: 'textarea', required: true },
        { name: 'start_date', label: 'Date de parution', type: 'date', required: true },
      ]),
      body: `<h2>Plan Média Presse Print — {{brand_name}}</h2>
<p><strong>Supports :</strong> {{titles}}</p>
<p><strong>Formats :</strong> {{formats}} | <strong>Parution :</strong> {{start_date}}</p>
<p>Ce fichier planifie les parutions, formats, coûts bruts/nets et conditions techniques.</p>
<p><em>Document achat médias — équipe planification.</em></p>`,
    },
    {
      code: 'spot_009',
      name: 'Rapport monitoring digital',
      category: 'communication',
      templateType: 'pdf',
      classe: 'B',
      price: 5500,
      priceMax: 7500,
      popularity: 67,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'brand_name', label: 'Marque', type: 'text', required: true },
        { name: 'period', label: 'Période analysée', type: 'text', required: true },
        { name: 'insights', label: 'Insights principaux', type: 'textarea', required: true },
        { name: 'report_date', label: 'Date du rapport', type: 'date', required: true },
      ]),
      body: `<h2>Rapport Monitoring Digital — {{brand_name}}</h2>
<p><strong>Période :</strong> {{period}} | <strong>Date :</strong> {{report_date}}</p>
<p><strong>Insights :</strong> {{insights}}</p>
<p>Analyse des performances SEA, social ads, display : impressions, CTR, CPC, conversions.</p>
<p><em>Document de pilotage — équipe performance marketing.</em></p>`,
    },
    {
      code: 'spot_010',
      name: 'Plan de campagne 360°',
      category: 'communication',
      templateType: 'pdf',
      classe: 'A',
      price: 13000,
      priceMax: 15000,
      popularity: 95,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'brand_name', label: 'Marque', type: 'text', required: true },
        { name: 'campaign_name', label: 'Nom de la campagne', type: 'text', required: true },
        { name: 'strategy', label: 'Stratégie globale', type: 'textarea', required: true },
        { name: 'launch_date', label: 'Date de lancement', type: 'date', required: true },
      ]),
      body: `<h2>Plan Campagne 360° — {{campaign_name}}</h2>
<p><strong>Marque :</strong> {{brand_name}} | <strong>Lancement :</strong> {{launch_date}}</p>
<p><strong>Stratégie :</strong> {{strategy}}</p>
<p>Ce plan orchestre TV, radio, digital, affichage, RP et événementiel en un dispositif intégré.</p>
<p><em>Document de référence stratégique — directeur communication.</em></p>`,
    },

    // ── NEWSLETTER (newsletter_001..010) ───────────────────────────────────
    {
      code: 'newsletter_001',
      name: 'Newsletter corporate mensuelle',
      category: 'communication',
      templateType: 'pdf',
      classe: 'C',
      price: 2500,
      priceMax: 4500,
      popularity: 88,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'company_name', label: 'Entreprise', type: 'text', required: true },
        { name: 'month', label: 'Mois', type: 'text', required: true },
        { name: 'editorial', label: 'Édito', type: 'textarea', required: true },
        { name: 'date', label: 'Date d\'envoi', type: 'date', required: true },
      ]),
      body: `<h2>Newsletter {{month}} — {{company_name}}</h2>
<p><strong>Édito :</strong> {{editorial}}</p>
<p>Au sommaire ce mois-ci : actualités entreprise, focus métier, agenda des événements et portrait collaborateur.</p>
<p><em>Newsletter interne — diffusion le {{date}}.</em></p>`,
    },
    {
      code: 'newsletter_002',
      name: 'Newsletter externe clients',
      category: 'communication',
      templateType: 'pdf',
      classe: 'C',
      price: 3000,
      priceMax: 5000,
      popularity: 82,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'company_name', label: 'Entreprise', type: 'text', required: true },
        { name: 'highlights', label: 'Points forts du mois', type: 'textarea', required: true },
        { name: 'cta', label: 'Appel à l\'action principal', type: 'text', required: false },
        { name: 'send_date', label: 'Date d\'envoi', type: 'date', required: true },
      ]),
      body: `<h2>Newsletter Clients — {{company_name}}</h2>
<p><strong>Points forts :</strong> {{highlights}}</p>
<p><strong>Action :</strong> {{cta}}</p>
<p><em>Envoyée le {{send_date}} — désinscription possible via le lien en bas de page.</em></p>`,
    },
    {
      code: 'newsletter_003',
      name: 'Newsletter RH collaborateurs',
      category: 'communication',
      templateType: 'pdf',
      classe: 'C',
      price: 2000,
      priceMax: 4000,
      popularity: 75,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'company_name', label: 'Entreprise', type: 'text', required: true },
        { name: 'hr_news', label: 'Actualités RH', type: 'textarea', required: true },
        { name: 'date', label: 'Date de diffusion', type: 'date', required: true },
      ]),
      body: `<h2>Newsletter RH — {{company_name}}</h2>
<p><strong>Actualités RH :</strong> {{hr_news}}</p>
<p>Retrouvez également : les nouvelles arrivées, les mobilités internes et les prochaines formations.</p>
<p><em>Diffusée le {{date}} à l'ensemble des collaborateurs.</em></p>`,
    },
    {
      code: 'newsletter_004',
      name: 'Newsletter sectorielle veille',
      category: 'communication',
      templateType: 'pdf',
      classe: 'B',
      price: 4000,
      priceMax: 6000,
      popularity: 61,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'sector', label: 'Secteur de veille', type: 'text', required: true },
        { name: 'key_trends', label: 'Tendances clés', type: 'textarea', required: true },
        { name: 'edition', label: 'Numéro d\'édition', type: 'text', required: false },
        { name: 'date', label: 'Date', type: 'date', required: true },
      ]),
      body: `<h2>Newsletter Veille — {{sector}}</h2>
<p><strong>Édition {{edition}}</strong> | <em>{{date}}</em></p>
<p><strong>Tendances :</strong> {{key_trends}}</p>
<p>Sélection des articles, études et signaux faibles identifiés cette semaine dans le secteur.</p>`,
    },
    {
      code: 'newsletter_005',
      name: 'Newsletter investisseurs',
      category: 'communication',
      templateType: 'pdf',
      classe: 'A',
      price: 8000,
      priceMax: 10000,
      popularity: 58,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'company_name', label: 'Entreprise', type: 'text', required: true },
        { name: 'financial_update', label: 'Point financier', type: 'textarea', required: true },
        { name: 'strategic_news', label: 'Actualités stratégiques', type: 'textarea', required: true },
        { name: 'date', label: 'Date', type: 'date', required: true },
      ]),
      body: `<h2>Newsletter Investisseurs — {{company_name}}</h2>
<p><strong>Point financier :</strong> {{financial_update}}</p>
<p><strong>Actualités stratégiques :</strong> {{strategic_news}}</p>
<p><em>Document confidentiel — réservé aux actionnaires et investisseurs — {{date}}.</em></p>`,
    },
    {
      code: 'newsletter_006',
      name: 'Plan éditorial newsletter annuel',
      category: 'communication',
      templateType: 'excel',
      classe: 'B',
      price: 5000,
      priceMax: 7000,
      popularity: 66,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'company_name', label: 'Entreprise', type: 'text', required: true },
        { name: 'year', label: 'Année', type: 'text', required: true },
        { name: 'editorial_lines', label: 'Lignes éditoriales', type: 'textarea', required: true },
        { name: 'start_date', label: 'Date de départ', type: 'date', required: true },
      ]),
      body: `<h2>Plan Éditorial Newsletter — {{year}}</h2>
<p><strong>Entreprise :</strong> {{company_name}} | <strong>Démarrage :</strong> {{start_date}}</p>
<p><strong>Lignes éditoriales :</strong> {{editorial_lines}}</p>
<p>Ce calendrier planifie les thématiques, rubriques et dates d'envoi sur 12 mois.</p>
<p><em>Document de référence éditorial — équipe communication.</em></p>`,
    },
    {
      code: 'newsletter_007',
      name: 'Rapport performances newsletter',
      category: 'communication',
      templateType: 'pdf',
      classe: 'B',
      price: 4500,
      priceMax: 6500,
      popularity: 54,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'newsletter_name', label: 'Nom de la newsletter', type: 'text', required: true },
        { name: 'period', label: 'Période', type: 'text', required: true },
        { name: 'metrics', label: 'Métriques principales', type: 'textarea', required: true },
        { name: 'report_date', label: 'Date du rapport', type: 'date', required: true },
      ]),
      body: `<h2>Rapport Performances — {{newsletter_name}}</h2>
<p><strong>Période :</strong> {{period}} | <strong>Date :</strong> {{report_date}}</p>
<p><strong>Métriques :</strong> {{metrics}}</p>
<p>Analyse : taux d'ouverture, taux de clic, désabonnements, croissance de la base et top contenus.</p>
<p><em>Document analytique — équipe CRM & communication.</em></p>`,
    },
    {
      code: 'newsletter_008',
      name: 'Template email transactionnel',
      category: 'communication',
      templateType: 'pdf',
      classe: 'C',
      price: 1500,
      priceMax: 3500,
      popularity: 79,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'company_name', label: 'Entreprise', type: 'text', required: true },
        { name: 'email_type', label: 'Type d\'email (confirmation, rappel...)', type: 'text', required: true },
        { name: 'content', label: 'Contenu principal', type: 'textarea', required: true },
        { name: 'date', label: 'Date de création', type: 'date', required: true },
      ]),
      body: `<h2>Email Transactionnel — {{email_type}}</h2>
<p><strong>Entreprise :</strong> {{company_name}}</p>
<p>{{content}}</p>
<p><em>Template créé le {{date}} — intégration équipe technique requise.</em></p>`,
    },
    {
      code: 'newsletter_009',
      name: 'Newsletter partenaires B2B',
      category: 'communication',
      templateType: 'pdf',
      classe: 'B',
      price: 4000,
      priceMax: 6000,
      popularity: 63,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'company_name', label: 'Entreprise éditrice', type: 'text', required: true },
        { name: 'partner_news', label: 'Actualités partenaires', type: 'textarea', required: true },
        { name: 'cta', label: 'Call to action', type: 'text', required: false },
        { name: 'send_date', label: 'Date d\'envoi', type: 'date', required: true },
      ]),
      body: `<h2>Newsletter Partenaires — {{company_name}}</h2>
<p><strong>Actualités :</strong> {{partner_news}}</p>
<p><strong>Action :</strong> {{cta}}</p>
<p><em>Diffusée le {{send_date}} à l'écosystème partenaires.</em></p>`,
    },
    {
      code: 'newsletter_010',
      name: 'Plan éditorial réseaux sociaux',
      category: 'communication',
      templateType: 'excel',
      classe: 'B',
      price: 6000,
      priceMax: 8000,
      popularity: 91,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'brand_name', label: 'Marque', type: 'text', required: true },
        { name: 'platforms', label: 'Plateformes (LinkedIn, Insta...)', type: 'text', required: true },
        { name: 'content_pillars', label: 'Piliers de contenu', type: 'textarea', required: true },
        { name: 'start_date', label: 'Date de départ', type: 'date', required: true },
      ]),
      body: `<h2>Plan Éditorial Réseaux Sociaux — {{brand_name}}</h2>
<p><strong>Plateformes :</strong> {{platforms}} | <strong>Démarrage :</strong> {{start_date}}</p>
<p><strong>Piliers de contenu :</strong> {{content_pillars}}</p>
<p>Ce planning organise les publications : format, texte, visuels, hashtags et heure de diffusion.</p>
<p><em>Document opérationnel — community management.</em></p>`,
    },
  ];

  for (const t of templates) {
    const r = await prisma.documentTemplate.upsert({
      where: { code: t.code },
      update: t,
      create: t,
    });
    if (r.createdAt === r.updatedAt) created++;
    else updated++;
  }

  const total = await prisma.documentTemplate.count();
  console.log(`Batch comm-01 OK — créés:${created} maj:${updated} TOTAL:${total}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
