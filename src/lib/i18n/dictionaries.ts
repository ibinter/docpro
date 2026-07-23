?// Dictionnaires FR/EN des pages publiques (CDC §1 �?? interface bilingue).
// Données pures, sans dépendance serveur �?? les NOMS de templates/forfaits (contenu BDD)
// ne sont PAS traduits ici : seuls les libellés d'interface le sont.

export type Lang = 'fr' | 'en';

const fr = {
  nav: {
    catalogue: 'Catalogue',
    tarifs: 'Tarifs',
    adminConsole: 'Console Admin',
    monEspace: 'Mon espace',
    connexion: 'Connexion',
    inscription: 'Créer un compte',
  },
  hero: {
    titre: 'Chaque document, chaque rêve, chaque ambition �?? générés en quelques secondes',
    sousTitre:
      'CV, contrats, statuts de société, factures, lettres de motivation�?� Des documents professionnels irréprochables, conformes aux lois de votre pays, à partir de 100 FCFA · $0.17.',
    ctaCatalogue: 'Explorer le catalogue',
    ctaInscription: 'Créer un compte gratuit',
  },
  etapes: {
    titre: 'Comment ça marche ?',
    sousTitre: "De l'idée au document final en moins de 60 secondes, en 4 étapes.",
    liste: [
      {
        titre: 'Choisissez votre document',
        texte:
          'Parcourez le catalogue visuel : CV, contrats, statuts, factures�?� avec aperçu, prix et délai de génération. Sans inscription obligatoire.',
      },
      {
        titre: 'Répondez au questionnaire IA',
        texte:
          "ChatDoc, l'assistant conversationnel, vous pose des questions simples en langage naturel ou via un formulaire guidé.",
      },
      {
        titre: 'Générez et prévisualisez',
        texte:
          'Votre document est généré en temps réel. Modifiez, régénérez ou changez de style autant de fois que nécessaire.',
      },
      {
        titre: 'Payez et téléchargez',
        texte:
          'Mobile Money, carte, virement ou espèces. Téléchargement sécurisé par lien unique valable 24 h, aux formats PDF, DOCX, ODT ou HTML.',
      },
    ],
  },
  features: {
    titre: 'Une plateforme unique au monde',
    sousTitre: 'Des fonctionnalités que vous ne trouverez nulle part ailleurs.',
    liste: [
      {
        icone: '�??�',
        titre: 'Assistant ChatDoc',
        texte:
          "Décrivez votre besoin en langage naturel : ChatDoc choisit le modèle optimal, l'adapte à votre pays et produit un document personnalisé.",
      },
      {
        icone: '�??️',
        titre: 'Adaptation légale par pays',
        texte:
          'Base légale mondiale : chaque document est conforme aux lois du pays sélectionné (OHADA pour l�??Afrique, loi Alur pour la France�?�).',
      },
      {
        icone: '�??�',
        titre: 'Traduction simultanée',
        texte:
          'Générez le même document en plusieurs langues en une seule opération : CV en français + anglais + espagnol simultanément.',
      },
      {
        icone: '⭐',
        titre: 'Score de qualité',
        texte:
          "Chaque document est noté automatiquement (lisibilité, conformité légale, attractivité pour les recruteurs) avec des suggestions d'amélioration.",
      },
      {
        icone: '�???',
        titre: 'QR de vérification',
        texte:
          "Chaque document porte un QR code de vérification d'authenticité : quiconque peut contrôler qu'il est authentique et non falsifié.",
      },
      {
        icone: '�??�',
        titre: 'Profil intelligent',
        texte:
          'Remplissez votre profil une seule fois : tous vos futurs documents sont pré-remplis automatiquement. Fin de la saisie répétitive.',
      },
    ],
  },
  pricing: {
    titre: 'Tarification à l\'acte �?? simple et transparente',
    sousTitre: 'Payez uniquement ce que vous utilisez. Pas d\'abonnement obligatoire.',
    bientot: 'Les tarifs seront bientôt disponibles.',
    comparer: 'Explorer le catalogue',
  },
  catalogue: {
    titre: 'Catalogue de documents',
    sousTitre: 'Des documents professionnels conformes aux lois de votre pays.',
    packsBanner: '�??� Découvrez nos packs économiques �?? plusieurs documents à prix réduit',
    packsBtn: 'Voir les packs �??',
    rechercherPlaceholder: 'Rechercher un document : CV, contrat, facture, bail�?�',
    rechercherAria: 'Rechercher un document',
    rechercherBtn: '�??� Rechercher',
    effacer: 'Effacer',
    resultatsPour: (n: number, q: string) => `${n} résultat${n > 1 ? 's' : ''} pour « ${q} »`,
    dansCategorie: (c: string) => ` dans « ${c} »`,
    modelesDisponibles: (n: number) => `${n} modèle${n > 1 ? 's' : ''} disponible${n > 1 ? 's' : ''}`,
    toutesCategories: 'Toutes les catégories',
    aucunResultatTitre: (q: string) => `Aucun document ne correspond à « ${q} »`,
    aucunResultatTexte:
      'Essayez un autre mot-clé (ex. « contrat », « facture », « CV ») ou parcourez toutes les catégories.',
    effacerRecherche: 'Effacer la recherche',
    toutLeCatalogue: 'Tout le catalogue',
    aucunDocumentCategorie: 'Aucun document disponible dans cette catégorie pour le moment.',
    generer: 'Générer',
    categories: {
      rh_emploi: 'RH & Emploi',
      juridique_admin: 'Juridique & Administratif',
      commercial: 'Commercial & Marketing',
      communication: 'Communication',
      comptabilite_audit: 'Comptabilit� & Audit',
      finance_banque: 'Finance & Banque',
      informatique_tech: 'Informatique & Tech',
      gestion_management: 'Gestion & Management',
      gestion_projet: 'Gestion de Projet',
      qhse: 'QHSE',
      entrepreneuriat: 'Entrepreneuriat',
      academique: 'Acad�mique',
      sante: 'Sant�',
      immobilier: 'Immobilier',
      association: 'Association',
      btp_construction: 'BTP & Construction',
      assurance: 'Assurance',
      transport_logistique: 'Transport & Logistique',
      agro_environnement: 'Agro & Environnement',
    } as Record<string, string>,
  },
  tarifs: {
    titre: 'Tarifs',
    intro:
      "Payez uniquement ce que vous utilisez, dès 100 FCFA. Rechargez votre portefeuille et économisez jusqu'à +30 %.",
    bientot: 'Les forfaits seront bientôt disponibles.',
    essaiGratuit: (jours: number) => `Essai gratuit ${jours} jours`,
    essaiNote: 'Sans engagement, sans moyen de paiement.',
    comparatif: 'Comparatif détaillé',
    caracteristique: 'Caractéristique',
    prix: 'Prix',
    docsParMois: 'Documents par mois',
    illimite: 'Illimité',
    stockage: 'Stockage cloud',
    utilisateurs: 'Utilisateurs',
    essai: 'Essai gratuit',
    jours: (n: number) => `${n} jours`,
    souscription: 'Souscription',
    souscrire: 'Souscrire',
    ponctuelTitre: "Besoin d'un document ponctuel ?",
    ponctuelTexte:
      "Paiement à l'acte, sans abonnement. Chaque document du catalogue à partir de 100 FCFA · $0.17. Rechargez votre portefeuille et économisez jusqu'à +30 %.",
    voirCatalogue: 'Voir le catalogue',
  },
  footer: {
    slogan:
      'La plateforme mondiale de génération intelligente de documents professionnels, conformes aux lois de votre pays.',
    navigation: 'Navigation',
    catalogue: 'Catalogue de documents',
    tarifs: 'Tarifs & forfaits',
    inscription: 'Créer un compte',
    connexion: 'Connexion',
    contact: 'Contact',
    droits: '© IBIG SARL 2026 �?? Tous droits réservés.',
    cgu: 'CGU',
    confidentialite: 'Confidentialité',
    mentions: 'Mentions légales',
  },
  auth: {
    connexionTitre: 'Connexion',
    inscriptionTitre: 'Créer un compte',
    email: 'Adresse email',
    motDePasse: 'Mot de passe',
    seConnecter: 'Se connecter',
  },
};

export type Dict = typeof fr;

const en: Dict = {
  nav: {
    catalogue: 'Catalog',
    tarifs: 'Pricing',
    adminConsole: 'Admin Console',
    monEspace: 'My account',
    connexion: 'Sign in',
    inscription: 'Create an account',
  },
  hero: {
    titre: 'Every document, every dream, every ambition �?? generated in seconds',
    sousTitre:
      'Resumes, contracts, company bylaws, invoices, cover letters�?� Flawless professional documents, compliant with the laws of your country, starting at 50 FCFA.',
    ctaCatalogue: 'Explore the catalog',
    ctaInscription: 'Create a free account',
  },
  etapes: {
    titre: 'How does it work?',
    sousTitre: 'From idea to final document in under 60 seconds, in 4 steps.',
    liste: [
      {
        titre: 'Choose your document',
        texte:
          'Browse the visual catalog: resumes, contracts, bylaws, invoices�?� with preview, price and generation time. No sign-up required.',
      },
      {
        titre: 'Answer the AI questionnaire',
        texte:
          'ChatDoc asks you simple questions in natural language or through a guided form, then produces a tailored document for your country.',
      },
      {
        titre: 'Generate and preview',
        texte:
          'Your document is generated in real time. Edit, regenerate or switch styles as many times as you need.',
      },
      {
        titre: 'Pay and download',
        texte:
          'Mobile Money, card, bank transfer or cash. Secure download through a unique 24-hour link, in PDF, DOCX, ODT or HTML format.',
      },
    ],
  },
  features: {
    titre: 'A platform unlike any other',
    sousTitre: 'Features you will not find anywhere else.',
    liste: [
      {
        icone: '�??�',
        titre: 'ChatDoc assistant',
        texte:
          'Describe your need in natural language: the AI picks the best template, adapts it to your country and generates a personalized document.',
      },
      {
        icone: '�??️',
        titre: 'Country-specific legal adaptation',
        texte:
          'Global legal base: every document complies with the laws of the selected country (OHADA for Africa, Alur law for France�?�).',
      },
      {
        icone: '�??�',
        titre: 'Simultaneous translation',
        texte:
          'Generate the same document in several languages in a single operation: a resume in French + English + Spanish at once.',
      },
      {
        icone: '⭐',
        titre: 'AI quality score',
        texte:
          'The AI rates your document (readability, legal compliance, appeal to recruiters) and suggests improvements.',
      },
      {
        icone: '�???',
        titre: 'Verification QR code',
        texte:
          'Every document carries an authenticity verification QR code: anyone can check that it is genuine and unaltered.',
      },
      {
        icone: '�??�',
        titre: 'Smart profile',
        texte:
          'Fill in your profile once: all your future documents are pre-filled automatically. No more repetitive typing.',
      },
    ],
  },
  pricing: {
    titre: 'Plans for every need',
    sousTitre: 'Pay per document from 50 FCFA, or pick a subscription and generate without limits.',
    bientot: 'Plans will be available soon.',
    comparer: 'Browse the catalogue',
  },
  catalogue: {
    titre: 'Document catalog',
    sousTitre: 'Professional AI-generated documents, adapted to the laws of your country.',
    packsBanner: '�??� Discover our value packs �?? several documents at a reduced price',
    packsBtn: 'View packs �??',
    rechercherPlaceholder: 'Search for a document: resume, contract, invoice, lease�?�',
    rechercherAria: 'Search for a document',
    rechercherBtn: '�??� Search',
    effacer: 'Clear',
    resultatsPour: (n: number, q: string) => `${n} result${n > 1 ? 's' : ''} for "${q}"`,
    dansCategorie: (c: string) => ` in "${c}"`,
    modelesDisponibles: (n: number) => `${n} template${n > 1 ? 's' : ''} available`,
    toutesCategories: 'All categories',
    aucunResultatTitre: (q: string) => `No document matches "${q}"`,
    aucunResultatTexte:
      'Try another keyword (e.g. "contract", "invoice", "resume") or browse all categories.',
    effacerRecherche: 'Clear search',
    toutLeCatalogue: 'Full catalog',
    aucunDocumentCategorie: 'No document available in this category yet.',
    generer: 'Generate',
    categories: {
      rh_emploi: 'HR & Employment',
      juridique_admin: 'Legal & Administrative',
      commercial: 'Commercial & Marketing',
      communication: 'Communication',
      comptabilite_audit: 'Accounting & Audit',
      finance_banque: 'Finance & Banking',
      informatique_tech: 'IT & Technology',
      gestion_management: 'Management & Strategy',
      gestion_projet: 'Project Management',
      qhse: 'QHSE',
      entrepreneuriat: 'Entrepreneurship',
      academique: 'Academic',
      sante: 'Health',
      immobilier: 'Real Estate',
      association: 'Non-profit',
      btp_construction: 'Construction',
      assurance: 'Insurance',
      transport_logistique: 'Transport & Logistics',
      agro_environnement: 'Agriculture & Environment',
    } as Record<string, string>,
  },
  tarifs: {
    titre: 'Pricing & plans',
    intro:
      'Generate documents one at a time (50 to 10,000 FCFA depending on the document) or pick a subscription and generate without limits. No commitment, cancel anytime.',
    bientot: 'Plans will be available soon.',
    essaiGratuit: (jours: number) => `${jours}-day free trial`,
    essaiNote: 'No commitment, no payment method required.',
    comparatif: 'Detailed comparison',
    caracteristique: 'Feature',
    prix: 'Price',
    docsParMois: 'Documents per month',
    illimite: 'Unlimited',
    stockage: 'Cloud storage',
    utilisateurs: 'Users',
    essai: 'Free trial',
    jours: (n: number) => `${n} days`,
    souscription: 'Subscribe',
    souscrire: 'Subscribe',
    ponctuelTitre: 'Need a one-off document?',
    ponctuelTexte:
      'No subscription needed: every document in the catalog can be generated and paid for individually, from 50 FCFA.',
    voirCatalogue: 'View the catalog',
  },
  footer: {
    slogan:
      'The global platform for intelligent generation of professional documents, compliant with the laws of your country.',
    navigation: 'Navigation',
    catalogue: 'Document catalog',
    tarifs: 'Pricing & plans',
    inscription: 'Create an account',
    connexion: 'Sign in',
    contact: 'Contact',
    droits: '© IBIG SARL 2026 �?? All rights reserved.',
    cgu: 'Terms of use',
    confidentialite: 'Privacy',
    mentions: 'Legal notice',
  },
  auth: {
    connexionTitre: 'Sign in',
    inscriptionTitre: 'Create an account',
    email: 'Email address',
    motDePasse: 'Password',
    seConnecter: 'Sign in',
  },
};

export const dictionaries: Record<Lang, Dict> = { fr, en };

