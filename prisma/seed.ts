// Seed IBIG DocPro — devises, forfaits, moyens de paiement, templates, comptes de démo.
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // ── Devises (CDC §18.1)
  const currencies = [
    { code: 'XOF', name: 'Franc CFA UEMOA', symbol: 'FCFA', rateToXof: 1, decimals: 0 },
    { code: 'XAF', name: 'Franc CFA CEMAC', symbol: 'FCFA', rateToXof: 1, decimals: 0 },
    { code: 'USD', name: 'Dollar américain', symbol: '$', rateToXof: 600, decimals: 2 },
    { code: 'EUR', name: 'Euro', symbol: '€', rateToXof: 655.96, decimals: 2 },
    { code: 'GBP', name: 'Livre sterling', symbol: '£', rateToXof: 760, decimals: 2 },
    { code: 'CDF', name: 'Franc congolais', symbol: 'FC', rateToXof: 0.21, decimals: 0 },
    { code: 'GNF', name: 'Franc guinéen', symbol: 'GNF', rateToXof: 0.07, decimals: 0 },
    { code: 'NGN', name: 'Naira', symbol: '₦', rateToXof: 0.38, decimals: 2 },
    { code: 'GHS', name: 'Cédi ghanéen', symbol: 'GH₵', rateToXof: 40, decimals: 2 },
  ];
  for (const c of currencies) {
    await prisma.currency.upsert({ where: { code: c.code }, update: c, create: c });
  }

  // ── Forfaits (CDC §7.2)
  const plans = [
    {
      code: 'STARTER', name: 'Starter', price: 1500, durationType: 'months', durationValue: 1,
      description: '5 documents/mois, 1 Go de stockage, 3 langues, support email',
      docsPerMonth: 5, storageMb: 1024, trialDays: 7, displayOrder: 1,
      featuresJson: JSON.stringify(['5 documents/mois', '1 Go stockage cloud', '3 langues', 'Support email']),
    },
    {
      code: 'PRO', name: 'Pro', price: 5000, durationType: 'months', durationValue: 1,
      description: '30 documents/mois, 10 Go, toutes langues, chat + email, API limitée',
      docsPerMonth: 30, storageMb: 10240, trialDays: 7, displayOrder: 2,
      featuresJson: JSON.stringify(['30 documents/mois', '10 Go stockage cloud', 'Toutes les langues', 'Support chat + email', 'Accès API limité']),
    },
    {
      code: 'PRO_ANNUEL', name: 'Pro Annuel', price: 50000, promoPrice: 45000, durationType: 'years', durationValue: 1,
      description: 'Forfait Pro facturé à l’année — 2 mois offerts',
      docsPerMonth: 30, storageMb: 10240, displayOrder: 3,
      featuresJson: JSON.stringify(['30 documents/mois', '10 Go stockage', 'Toutes les langues', '2 mois offerts']),
    },
    {
      code: 'ENTREPRISE', name: 'Entreprise', price: 25000, durationType: 'months', durationValue: 1,
      description: 'Documents illimités, 100 Go, API complète, white label, support dédié 24/7',
      docsPerMonth: null, storageMb: 102400, maxUsers: 25, maxEntities: 10, displayOrder: 4,
      featuresJson: JSON.stringify(['Documents illimités', '100 Go stockage', 'API complète', 'White label', 'Support dédié 24/7', '25 utilisateurs']),
    },
  ];
  for (const p of plans) {
    await prisma.plan.upsert({ where: { code: p.code }, update: p, create: p });
  }

  // ── Moyens de paiement configurables (CDC §12)
  const channels = [
    { type: 'processeur', provider: 'Moneroo', label: 'Paiement en ligne (Mobile Money & Carte)', currency: 'XOF', detailsJson: JSON.stringify({ mode: 'test' }), instructions: 'Paiement instantané sécurisé — activation automatique.', displayOrder: 0 },
    { type: 'mobile_money', provider: 'Orange Money', label: 'Orange Money CI', country: 'CI', currency: 'XOF', detailsJson: JSON.stringify({ numero: '+225 07 07 00 00 01', titulaire: 'IBIG SARL' }), instructions: 'Transférez le montant exact puis soumettez votre preuve (capture d’écran).', minAmount: 100, displayOrder: 1 },
    { type: 'mobile_money', provider: 'MTN MoMo', label: 'MTN Mobile Money CI', country: 'CI', currency: 'XOF', detailsJson: JSON.stringify({ numero: '+225 05 05 00 00 02', titulaire: 'IBIG SARL' }), instructions: 'Transférez puis soumettez la référence de transaction et la preuve.', minAmount: 100, displayOrder: 2 },
    { type: 'mobile_money', provider: 'Wave', label: 'Wave Sénégal', country: 'SN', currency: 'XOF', detailsJson: JSON.stringify({ numero: '+221 77 000 00 03', titulaire: 'IBIG SARL' }), instructions: 'Envoyez via Wave puis téléversez la capture de confirmation.', minAmount: 100, displayOrder: 3 },
    { type: 'banque_nationale', provider: 'BICICI', label: 'Virement bancaire national (CI)', country: 'CI', currency: 'XOF', detailsJson: JSON.stringify({ banque: 'BICICI', titulaire: 'IBIG SARL', compte: 'CI93 0100 0000 1234 5678 9012 345', agence: 'Abidjan Plateau' }), instructions: 'Indiquez impérativement votre numéro de commande en référence du virement.', displayOrder: 4 },
    { type: 'banque_internationale', provider: 'Ecobank', label: 'Virement international (SWIFT)', currency: 'USD', detailsJson: JSON.stringify({ banque: 'Ecobank CI', titulaire: 'IBIG SARL', iban: 'CI93ECOC00000123456789012345', swift: 'ECOCCIAB', adresse: 'Av. Terrasson de Fougères, Abidjan' }), instructions: 'Référence de commande obligatoire. Délai bancaire 2-5 jours ouvrés.', displayOrder: 5 },
    { type: 'transfert_international', provider: 'Western Union', label: 'Western Union', currency: 'USD', detailsJson: JSON.stringify({ beneficiaire: 'IBIG SARL', ville: 'Abidjan', pays: 'Côte d’Ivoire' }), instructions: 'Saisissez le numéro MTCN et le nom de l’expéditeur après envoi.', displayOrder: 6 },
    { type: 'especes', provider: 'Agence IBIG', label: 'Paiement en espèces (siège Abidjan)', country: 'CI', currency: 'XOF', detailsJson: JSON.stringify({ adresse: 'Siège IBIG SARL, Abidjan', horaires: 'Lun-Ven 8h-17h' }), instructions: 'Présentez votre numéro de commande à l’agent. Un reçu physique vous sera remis.', displayOrder: 7 },
  ];
  const existing = await prisma.paymentChannel.count();
  if (existing === 0) {
    for (const ch of channels) await prisma.paymentChannel.create({ data: ch });
  }

  // ── Comptes de démo
  const hash = await bcrypt.hash('Admin@2026', 10);
  await prisma.user.upsert({
    where: { email: 'admin@ibigsoft.com' },
    update: {},
    create: { email: 'admin@ibigsoft.com', passwordHash: hash, name: 'SuperAdmin IBIG', role: 'superadmin', country: 'CI', emailVerified: true },
  });
  const clientHash = await bcrypt.hash('Client@2026', 10);
  await prisma.user.upsert({
    where: { email: 'client@demo.com' },
    update: {},
    create: {
      email: 'client@demo.com', passwordHash: clientHash, name: 'Aya Koné', role: 'client', country: 'CI', emailVerified: true,
      profileJson: JSON.stringify({ nom: 'Koné', prenom: 'Aya', telephone: '+225 07 00 00 00 00', ville: 'Abidjan', profession: 'Développeuse web' }),
    },
  });

  // ── Templates de documents (CDC §5)
  const templates = [
    {
      code: 'cv_pro', name: 'CV Professionnel', category: 'rh_emploi', price: 500, priceMax: 1500,
      description: 'CV moderne optimisé ATS, adapté à votre secteur — 15 styles disponibles.',
      fieldsJson: JSON.stringify([
        { key: 'nom_complet', label: 'Nom complet', type: 'text', required: true },
        { key: 'titre', label: 'Titre professionnel visé', type: 'text', required: true },
        { key: 'email', label: 'Email', type: 'email', required: true },
        { key: 'telephone', label: 'Téléphone', type: 'text', required: true },
        { key: 'ville', label: 'Ville, Pays', type: 'text', required: true },
        { key: 'resume', label: 'Résumé professionnel (2-3 phrases)', type: 'textarea', required: true },
        { key: 'experiences', label: 'Expériences (poste — entreprise — dates — missions)', type: 'textarea', required: true },
        { key: 'formations', label: 'Formations et diplômes', type: 'textarea', required: true },
        { key: 'competences', label: 'Compétences clés (séparées par des virgules)', type: 'textarea', required: true },
        { key: 'langues', label: 'Langues parlées', type: 'text', required: false },
      ]),
      body: `<div class="cv"><header><h1>{{nom_complet}}</h1><p class="cv-title">{{titre}}</p><p class="cv-contact">{{email}} · {{telephone}} · {{ville}}</p></header><section><h2>Profil</h2><p>{{resume}}</p></section><section><h2>Expériences professionnelles</h2><p>{{experiences}}</p></section><section><h2>Formation</h2><p>{{formations}}</p></section><section><h2>Compétences</h2><p>{{competences}}</p></section><section><h2>Langues</h2><p>{{langues}}</p></section></div>`,
      popularity: 100,
    },
    {
      code: 'lettre_motivation', name: 'Lettre de motivation', category: 'rh_emploi', price: 200, priceMax: 1000,
      description: 'Lettre personnalisée par secteur et par poste, percutante et professionnelle.',
      fieldsJson: JSON.stringify([
        { key: 'nom_complet', label: 'Votre nom complet', type: 'text', required: true },
        { key: 'poste', label: 'Poste visé', type: 'text', required: true },
        { key: 'entreprise', label: 'Entreprise destinataire', type: 'text', required: true },
        { key: 'ville', label: 'Ville', type: 'text', required: true },
        { key: 'motivation', label: 'Pourquoi ce poste vous motive', type: 'textarea', required: true },
        { key: 'atouts', label: 'Vos principaux atouts pour ce poste', type: 'textarea', required: true },
      ]),
      body: `<div class="lettre"><p class="align-right">{{ville}}, le {{date_jour}}</p><p><strong>{{nom_complet}}</strong></p><p>Objet : Candidature au poste de {{poste}}</p><p>Madame, Monsieur,</p><p>Je me permets de vous adresser ma candidature pour le poste de {{poste}} au sein de {{entreprise}}. {{motivation}}</p><p>{{atouts}}</p><p>Je me tiens à votre disposition pour un entretien à votre convenance et vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.</p><p class="align-right"><strong>{{nom_complet}}</strong></p></div>`,
      popularity: 90,
    },
    {
      code: 'contrat_travail_cdi', name: 'Contrat de travail CDI', category: 'rh_emploi', price: 2000, priceMax: 5000,
      description: 'Contrat à durée indéterminée conforme au droit du travail de votre pays (OHADA).',
      fieldsJson: JSON.stringify([
        { key: 'employeur', label: 'Nom / Raison sociale de l’employeur', type: 'text', required: true },
        { key: 'employeur_adresse', label: 'Adresse de l’employeur', type: 'text', required: true },
        { key: 'salarie', label: 'Nom complet du salarié', type: 'text', required: true },
        { key: 'poste', label: 'Intitulé du poste', type: 'text', required: true },
        { key: 'salaire', label: 'Salaire mensuel brut (FCFA)', type: 'text', required: true },
        { key: 'date_debut', label: 'Date de début', type: 'date', required: true },
        { key: 'lieu', label: 'Lieu de travail', type: 'text', required: true },
      ]),
      body: `<div class="contrat"><h1>CONTRAT DE TRAVAIL À DURÉE INDÉTERMINÉE</h1><p>Entre <strong>{{employeur}}</strong>, dont le siège est situé {{employeur_adresse}}, ci-après « l'Employeur », et <strong>{{salarie}}</strong>, ci-après « le Salarié », il est convenu ce qui suit :</p><h2>Article 1 — Engagement</h2><p>Le Salarié est engagé en qualité de {{poste}} à compter du {{date_debut}}, sous réserve des dispositions légales applicables (Acte uniforme OHADA et code du travail national).</p><h2>Article 2 — Lieu de travail</h2><p>Le Salarié exercera ses fonctions à {{lieu}}.</p><h2>Article 3 — Rémunération</h2><p>Le Salarié percevra un salaire mensuel brut de {{salaire}} FCFA, versé au plus tard le dernier jour ouvrable de chaque mois.</p><h2>Article 4 — Durée</h2><p>Le présent contrat est conclu pour une durée indéterminée, avec une période d'essai conforme à la législation en vigueur.</p><p class="signatures">Fait à {{lieu}}, le {{date_jour}}<br/><br/>L'Employeur — Le Salarié</p></div>`,
      popularity: 70,
    },
    {
      code: 'bail_residentiel', name: 'Contrat de bail résidentiel', category: 'immobilier', price: 1000, priceMax: 3000,
      description: 'Bail d’habitation conforme à la législation nationale du pays sélectionné.',
      fieldsJson: JSON.stringify([
        { key: 'bailleur', label: 'Nom du bailleur (propriétaire)', type: 'text', required: true },
        { key: 'locataire', label: 'Nom du locataire', type: 'text', required: true },
        { key: 'adresse_bien', label: 'Adresse du bien loué', type: 'text', required: true },
        { key: 'description_bien', label: 'Description du bien (pièces, superficie)', type: 'textarea', required: true },
        { key: 'loyer', label: 'Loyer mensuel (FCFA)', type: 'text', required: true },
        { key: 'caution', label: 'Caution / Avance (FCFA)', type: 'text', required: true },
        { key: 'date_debut', label: 'Date d’entrée en jouissance', type: 'date', required: true },
      ]),
      body: `<div class="contrat"><h1>CONTRAT DE BAIL À USAGE D'HABITATION</h1><p>Entre <strong>{{bailleur}}</strong>, ci-après « le Bailleur », et <strong>{{locataire}}</strong>, ci-après « le Locataire ».</p><h2>Article 1 — Objet</h2><p>Le Bailleur donne en location le bien situé {{adresse_bien}} : {{description_bien}}.</p><h2>Article 2 — Loyer et caution</h2><p>Le loyer mensuel est fixé à {{loyer}} FCFA, payable d'avance. Une caution de {{caution}} FCFA est versée à la signature.</p><h2>Article 3 — Durée</h2><p>Le bail prend effet le {{date_debut}} pour une durée d'un an renouvelable par tacite reconduction.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>Le Bailleur — Le Locataire</p></div>`,
      popularity: 60,
    },
    {
      code: 'statuts_sarl', name: 'Statuts de société SARL', category: 'juridique_admin', price: 3000, priceMax: 8000,
      description: 'Statuts SARL conformes à l’Acte uniforme OHADA relatif aux sociétés commerciales.',
      fieldsJson: JSON.stringify([
        { key: 'denomination', label: 'Dénomination sociale', type: 'text', required: true },
        { key: 'capital', label: 'Capital social (FCFA)', type: 'text', required: true },
        { key: 'siege', label: 'Adresse du siège social', type: 'text', required: true },
        { key: 'objet', label: 'Objet social (activités)', type: 'textarea', required: true },
        { key: 'associes', label: 'Associés (noms + apports)', type: 'textarea', required: true },
        { key: 'gerant', label: 'Nom du gérant', type: 'text', required: true },
      ]),
      body: `<div class="contrat"><h1>STATUTS — {{denomination}} SARL</h1><h2>Article 1 — Forme</h2><p>Il est formé une Société À Responsabilité Limitée régie par l'Acte uniforme OHADA relatif au droit des sociétés commerciales et du GIE.</p><h2>Article 2 — Dénomination</h2><p>La société prend la dénomination : <strong>{{denomination}} SARL</strong>.</p><h2>Article 3 — Siège social</h2><p>Le siège social est fixé à {{siege}}.</p><h2>Article 4 — Objet</h2><p>{{objet}}</p><h2>Article 5 — Capital social</h2><p>Le capital social est fixé à {{capital}} FCFA, réparti entre les associés : {{associes}}.</p><h2>Article 6 — Gérance</h2><p>La société est gérée par {{gerant}}, nommé pour une durée indéterminée.</p><p class="signatures">Fait le {{date_jour}}</p></div>`,
      popularity: 50,
    },
    {
      code: 'facture_pro', name: 'Facture professionnelle', category: 'commercial_financier', price: 100, priceMax: 500,
      description: 'Facture conforme aux normes fiscales de votre pays, prête à envoyer.',
      fieldsJson: JSON.stringify([
        { key: 'emetteur', label: 'Votre entreprise (nom + adresse)', type: 'textarea', required: true },
        { key: 'client', label: 'Client (nom + adresse)', type: 'textarea', required: true },
        { key: 'numero', label: 'Numéro de facture', type: 'text', required: true },
        { key: 'lignes', label: 'Prestations (désignation — quantité — prix unitaire)', type: 'textarea', required: true },
        { key: 'total', label: 'Montant total (FCFA)', type: 'text', required: true },
        { key: 'echeance', label: 'Date d’échéance', type: 'date', required: true },
      ]),
      body: `<div class="facture"><h1>FACTURE N° {{numero}}</h1><div class="facture-parties"><div><h3>Émetteur</h3><p>{{emetteur}}</p></div><div><h3>Client</h3><p>{{client}}</p></div></div><h2>Détail des prestations</h2><p>{{lignes}}</p><h2>Total à payer : {{total}} FCFA</h2><p>Échéance de paiement : {{echeance}}</p><p class="text-small">Facture émise le {{date_jour}}.</p></div>`,
      popularity: 80,
    },
    {
      code: 'nda', name: 'Accord de confidentialité (NDA)', category: 'commercial_financier', price: 1500, priceMax: 4000,
      description: 'Accord de non-divulgation bilatéral protégeant vos informations sensibles.',
      fieldsJson: JSON.stringify([
        { key: 'partie1', label: 'Première partie (nom + adresse)', type: 'text', required: true },
        { key: 'partie2', label: 'Seconde partie (nom + adresse)', type: 'text', required: true },
        { key: 'objet', label: 'Objet de la collaboration', type: 'textarea', required: true },
        { key: 'duree', label: 'Durée de confidentialité (années)', type: 'text', required: true },
      ]),
      body: `<div class="contrat"><h1>ACCORD DE CONFIDENTIALITÉ</h1><p>Entre <strong>{{partie1}}</strong> et <strong>{{partie2}}</strong>.</p><h2>Article 1 — Objet</h2><p>Dans le cadre de : {{objet}}, les parties seront amenées à échanger des informations confidentielles.</p><h2>Article 2 — Obligations</h2><p>Chaque partie s'engage à ne pas divulguer les informations confidentielles reçues de l'autre partie, à ne les utiliser que dans le cadre de l'objet défini, et à les protéger avec le même soin que ses propres informations.</p><h2>Article 3 — Durée</h2><p>Le présent accord demeure en vigueur pendant {{duree}} ans à compter de sa signature.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>{{partie1}} — {{partie2}}</p></div>`,
      popularity: 40,
    },
    {
      code: 'attestation_travail', name: 'Attestation de travail', category: 'rh_emploi', price: 200, priceMax: 500,
      description: 'Attestation d’emploi officielle délivrée par l’employeur.',
      fieldsJson: JSON.stringify([
        { key: 'employeur', label: 'Entreprise (nom + adresse)', type: 'text', required: true },
        { key: 'signataire', label: 'Nom et fonction du signataire', type: 'text', required: true },
        { key: 'salarie', label: 'Nom du salarié', type: 'text', required: true },
        { key: 'poste', label: 'Poste occupé', type: 'text', required: true },
        { key: 'date_embauche', label: 'Date d’embauche', type: 'date', required: true },
      ]),
      body: `<div class="contrat"><h1>ATTESTATION DE TRAVAIL</h1><p>Je soussigné(e), {{signataire}}, agissant pour le compte de <strong>{{employeur}}</strong>, atteste que :</p><p><strong>{{salarie}}</strong> est employé(e) au sein de notre entreprise en qualité de <strong>{{poste}}</strong> depuis le {{date_embauche}}.</p><p>Cette attestation est délivrée à l'intéressé(e) pour servir et valoir ce que de droit.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>{{signataire}}</p></div>`,
      popularity: 55,
    },
    {
      code: 'demande_stage', name: 'Demande de stage', category: 'academique', price: 50, priceMax: 500,
      description: 'Lettre de demande de stage pour étudiants — format professionnel.',
      fieldsJson: JSON.stringify([
        { key: 'nom_complet', label: 'Votre nom complet', type: 'text', required: true },
        { key: 'formation', label: 'Votre formation actuelle', type: 'text', required: true },
        { key: 'etablissement', label: 'Votre établissement', type: 'text', required: true },
        { key: 'entreprise', label: 'Entreprise visée', type: 'text', required: true },
        { key: 'periode', label: 'Période de stage souhaitée', type: 'text', required: true },
        { key: 'motivation', label: 'Votre motivation', type: 'textarea', required: true },
      ]),
      body: `<div class="lettre"><p><strong>{{nom_complet}}</strong><br/>{{formation}} — {{etablissement}}</p><p>Objet : Demande de stage — {{periode}}</p><p>Madame, Monsieur,</p><p>Actuellement en {{formation}} à {{etablissement}}, je souhaite effectuer un stage au sein de {{entreprise}} pour la période {{periode}}.</p><p>{{motivation}}</p><p>Dans l'attente d'une réponse favorable, je vous prie d'agréer, Madame, Monsieur, mes salutations respectueuses.</p><p class="align-right"><strong>{{nom_complet}}</strong></p></div>`,
      popularity: 65,
    },
    {
      code: 'procuration', name: 'Procuration simple', category: 'juridique_admin', price: 500, priceMax: 1500,
      description: 'Procuration donnant pouvoir à un tiers pour agir en votre nom.',
      fieldsJson: JSON.stringify([
        { key: 'mandant', label: 'Mandant (vous — nom + pièce d’identité)', type: 'text', required: true },
        { key: 'mandataire', label: 'Mandataire (personne autorisée — nom + pièce)', type: 'text', required: true },
        { key: 'pouvoirs', label: 'Pouvoirs donnés (actes autorisés)', type: 'textarea', required: true },
        { key: 'validite', label: 'Durée de validité', type: 'text', required: true },
      ]),
      body: `<div class="contrat"><h1>PROCURATION</h1><p>Je soussigné(e) <strong>{{mandant}}</strong>, donne par la présente procuration à <strong>{{mandataire}}</strong>, pour :</p><p>{{pouvoirs}}</p><p>La présente procuration est valable {{validite}} à compter de sa signature.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>Signature du mandant (précédée de « Bon pour pouvoir »)</p></div>`,
      popularity: 35,
    },
  ];
  for (const t of templates) {
    await prisma.documentTemplate.upsert({ where: { code: t.code }, update: t, create: t });
  }

  // ── Modèles de notifications FR + EN (CDC §18.2)
  const notifTemplates = [
    { event: 'licence_activee', language: 'fr', channel: 'email', subject: 'Votre licence IBIG DocPro est active 🎉', body: 'Bonjour {{name}}, votre forfait {{plan}} est actif jusqu’au {{end}}. Merci de votre confiance !' },
    { event: 'licence_activee', language: 'en', channel: 'email', subject: 'Your IBIG DocPro license is active 🎉', body: 'Hello {{name}}, your {{plan}} plan is active until {{end}}. Thank you!' },
    { event: 'preuve_recue', language: 'fr', channel: 'email', subject: 'Preuve de paiement reçue', body: 'Votre preuve de paiement a été reçue et sera vérifiée par notre équipe dans les 24h.' },
    { event: 'preuve_recue', language: 'en', channel: 'email', subject: 'Payment proof received', body: 'Your payment proof has been received and will be verified within 24 hours.' },
    { event: 'expiration_j7', language: 'fr', channel: 'email', subject: 'Votre abonnement expire dans 7 jours', body: 'Bonjour {{name}}, votre forfait {{plan}} expire le {{end}}. Renouvelez dès maintenant pour ne pas perdre l’accès.' },
    { event: 'expiration_j7', language: 'en', channel: 'email', subject: 'Your subscription expires in 7 days', body: 'Hello {{name}}, your {{plan}} plan expires on {{end}}. Renew now to keep access.' },
  ];
  for (const nt of notifTemplates) {
    await prisma.notificationTemplate.upsert({
      where: { event_language_channel: { event: nt.event, language: nt.language, channel: nt.channel } },
      update: nt, create: nt,
    });
  }

  console.log('✅ Seed terminé : devises, forfaits, moyens de paiement, templates, comptes démo.');
  console.log('   SuperAdmin : admin@ibigsoft.com / Admin@2026');
  console.log('   Client démo : client@demo.com / Client@2026');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
