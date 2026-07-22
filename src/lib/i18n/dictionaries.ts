// Dictionnaires FR/EN des pages publiques (CDC Â§1 â€” interface bilingue).
// DonnÃ©es pures, sans dÃ©pendance serveur â€” les NOMS de templates/forfaits (contenu BDD)
// ne sont PAS traduits ici : seuls les libellÃ©s d'interface le sont.

export type Lang = 'fr' | 'en';

const fr = {
  nav: {
    catalogue: 'Catalogue',
    tarifs: 'Tarifs',
    adminConsole: 'Console Admin',
    monEspace: 'Mon espace',
    connexion: 'Connexion',
    inscription: 'CrÃ©er un compte',
  },
  hero: {
    titre: 'Chaque document, chaque rÃªve, chaque ambition â€” gÃ©nÃ©rÃ©s en quelques secondes',
    sousTitre:
      'CV, contrats, statuts de sociÃ©tÃ©, factures, lettres de motivationâ€¦ Des documents professionnels irrÃ©prochables, conformes aux lois de votre pays, Ã  partir de 100 FCFA Â· $0.17.',
    ctaCatalogue: 'Explorer le catalogue',
    ctaInscription: 'CrÃ©er un compte gratuit',
  },
  etapes: {
    titre: 'Comment Ã§a marche ?',
    sousTitre: "De l'idÃ©e au document final en moins de 60 secondes, en 4 Ã©tapes.",
    liste: [
      {
        titre: 'Choisissez votre document',
        texte:
          'Parcourez le catalogue visuel : CV, contrats, statuts, facturesâ€¦ avec aperÃ§u, prix et dÃ©lai de gÃ©nÃ©ration. Sans inscription obligatoire.',
      },
      {
        titre: 'RÃ©pondez au questionnaire IA',
        texte:
          "ChatDoc, l'assistant conversationnel, vous pose des questions simples en langage naturel ou via un formulaire guidÃ©.",
      },
      {
        titre: 'GÃ©nÃ©rez et prÃ©visualisez',
        texte:
          'Votre document est gÃ©nÃ©rÃ© en temps rÃ©el. Modifiez, rÃ©gÃ©nÃ©rez ou changez de style autant de fois que nÃ©cessaire.',
      },
      {
        titre: 'Payez et tÃ©lÃ©chargez',
        texte:
          'Mobile Money, carte, virement ou espÃ¨ces. TÃ©lÃ©chargement sÃ©curisÃ© par lien unique valable 24 h, aux formats PDF, DOCX, ODT ou HTML.',
      },
    ],
  },
  features: {
    titre: 'Une plateforme unique au monde',
    sousTitre: 'Des fonctionnalitÃ©s que vous ne trouverez nulle part ailleurs.',
    liste: [
      {
        icone: 'ðŸ’¬',
        titre: 'Assistant ChatDoc',
        texte:
          "DÃ©crivez votre besoin en langage naturel : ChatDoc choisit le modÃ¨le optimal, l'adapte Ã  votre pays et produit un document personnalisÃ©.",
      },
      {
        icone: 'âš–ï¸',
        titre: 'Adaptation lÃ©gale par pays',
        texte:
          'Base lÃ©gale mondiale : chaque document est conforme aux lois du pays sÃ©lectionnÃ© (OHADA pour lâ€™Afrique, loi Alur pour la Franceâ€¦).',
      },
      {
        icone: 'ðŸŒ',
        titre: 'Traduction simultanÃ©e',
        texte:
          'GÃ©nÃ©rez le mÃªme document en plusieurs langues en une seule opÃ©ration : CV en franÃ§ais + anglais + espagnol simultanÃ©ment.',
      },
      {
        icone: 'â­',
        titre: 'Score de qualitÃ©',
        texte:
          "Chaque document est notÃ© automatiquement (lisibilitÃ©, conformitÃ© lÃ©gale, attractivitÃ© pour les recruteurs) avec des suggestions d'amÃ©lioration.",
      },
      {
        icone: 'ðŸ”’',
        titre: 'QR de vÃ©rification',
        texte:
          "Chaque document porte un QR code de vÃ©rification d'authenticitÃ© : quiconque peut contrÃ´ler qu'il est authentique et non falsifiÃ©.",
      },
      {
        icone: 'ðŸ‘¤',
        titre: 'Profil intelligent',
        texte:
          'Remplissez votre profil une seule fois : tous vos futurs documents sont prÃ©-remplis automatiquement. Fin de la saisie rÃ©pÃ©titive.',
      },
    ],
  },
  pricing: {
    titre: 'Tarification Ã  l\'acte â€” simple et transparente',
    sousTitre: 'Payez uniquement ce que vous utilisez. Pas d\'abonnement obligatoire.',
    bientot: 'Les tarifs seront bientÃ´t disponibles.',
    comparer: 'Explorer le catalogue',
  },
  catalogue: {
    titre: 'Catalogue de documents',
    sousTitre: 'Des documents professionnels conformes aux lois de votre pays.',
    packsBanner: 'ðŸ“¦ DÃ©couvrez nos packs Ã©conomiques â€” plusieurs documents Ã  prix rÃ©duit',
    packsBtn: 'Voir les packs â†’',
    rechercherPlaceholder: 'Rechercher un document : CV, contrat, facture, bailâ€¦',
    rechercherAria: 'Rechercher un document',
    rechercherBtn: 'ðŸ” Rechercher',
    effacer: 'Effacer',
    resultatsPour: (n: number, q: string) => `${n} rÃ©sultat${n > 1 ? 's' : ''} pour Â« ${q} Â»`,
    dansCategorie: (c: string) => ` dans Â« ${c} Â»`,
    modelesDisponibles: (n: number) => `${n} modÃ¨le${n > 1 ? 's' : ''} disponible${n > 1 ? 's' : ''}`,
    toutesCategories: 'Toutes les catÃ©gories',
    aucunResultatTitre: (q: string) => `Aucun document ne correspond Ã  Â« ${q} Â»`,
    aucunResultatTexte:
      'Essayez un autre mot-clÃ© (ex. Â« contrat Â», Â« facture Â», Â« CV Â») ou parcourez toutes les catÃ©gories.',
    effacerRecherche: 'Effacer la recherche',
    toutLeCatalogue: 'Tout le catalogue',
    aucunDocumentCategorie: 'Aucun document disponible dans cette catÃ©gorie pour le moment.',
    generer: 'GÃ©nÃ©rer',
    categories: {
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
    } as Record<string, string>,
  },
  tarifs: {
    titre: 'Tarifs',
    intro:
      "Payez uniquement ce que vous utilisez, dÃ¨s 100 FCFA. Rechargez votre portefeuille et Ã©conomisez jusqu'Ã  +30 %.",
    bientot: 'Les forfaits seront bientÃ´t disponibles.',
    essaiGratuit: (jours: number) => `Essai gratuit ${jours} jours`,
    essaiNote: 'Sans engagement, sans moyen de paiement.',
    comparatif: 'Comparatif dÃ©taillÃ©',
    caracteristique: 'CaractÃ©ristique',
    prix: 'Prix',
    docsParMois: 'Documents par mois',
    illimite: 'IllimitÃ©',
    stockage: 'Stockage cloud',
    utilisateurs: 'Utilisateurs',
    essai: 'Essai gratuit',
    jours: (n: number) => `${n} jours`,
    souscription: 'Souscription',
    souscrire: 'Souscrire',
    ponctuelTitre: "Besoin d'un document ponctuel ?",
    ponctuelTexte:
      "Paiement Ã  l'acte, sans abonnement. Chaque document du catalogue Ã  partir de 100 FCFA Â· $0.17. Rechargez votre portefeuille et Ã©conomisez jusqu'Ã  +30 %.",
    voirCatalogue: 'Voir le catalogue',
  },
  footer: {
    slogan:
      'La plateforme mondiale de gÃ©nÃ©ration intelligente de documents professionnels, conformes aux lois de votre pays.',
    navigation: 'Navigation',
    catalogue: 'Catalogue de documents',
    tarifs: 'Tarifs & forfaits',
    inscription: 'CrÃ©er un compte',
    connexion: 'Connexion',
    contact: 'Contact',
    droits: 'Â© IBIG SARL 2026 â€” Tous droits rÃ©servÃ©s.',
    cgu: 'CGU',
    confidentialite: 'ConfidentialitÃ©',
    mentions: 'Mentions lÃ©gales',
  },
  auth: {
    connexionTitre: 'Connexion',
    inscriptionTitre: 'CrÃ©er un compte',
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
    titre: 'Every document, every dream, every ambition â€” generated in seconds',
    sousTitre:
      'Resumes, contracts, company bylaws, invoices, cover lettersâ€¦ Flawless professional documents, compliant with the laws of your country, starting at 50 FCFA.',
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
          'Browse the visual catalog: resumes, contracts, bylaws, invoicesâ€¦ with preview, price and generation time. No sign-up required.',
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
        icone: 'ðŸ’¬',
        titre: 'ChatDoc assistant',
        texte:
          'Describe your need in natural language: the AI picks the best template, adapts it to your country and generates a personalized document.',
      },
      {
        icone: 'âš–ï¸',
        titre: 'Country-specific legal adaptation',
        texte:
          'Global legal base: every document complies with the laws of the selected country (OHADA for Africa, Alur law for Franceâ€¦).',
      },
      {
        icone: 'ðŸŒ',
        titre: 'Simultaneous translation',
        texte:
          'Generate the same document in several languages in a single operation: a resume in French + English + Spanish at once.',
      },
      {
        icone: 'â­',
        titre: 'AI quality score',
        texte:
          'The AI rates your document (readability, legal compliance, appeal to recruiters) and suggests improvements.',
      },
      {
        icone: 'ðŸ”’',
        titre: 'Verification QR code',
        texte:
          'Every document carries an authenticity verification QR code: anyone can check that it is genuine and unaltered.',
      },
      {
        icone: 'ðŸ‘¤',
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
    packsBanner: 'ðŸ“¦ Discover our value packs â€” several documents at a reduced price',
    packsBtn: 'View packs â†’',
    rechercherPlaceholder: 'Search for a document: resume, contract, invoice, leaseâ€¦',
    rechercherAria: 'Search for a document',
    rechercherBtn: 'ðŸ” Search',
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
    droits: 'Â© IBIG SARL 2026 â€” All rights reserved.',
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

