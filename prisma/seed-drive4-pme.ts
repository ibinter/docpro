// Seed Drive4 PME — Agent Drive4-2/10 : modèles utiles extraits du
// « KIT AUTO-ENTREPRENEURS ET PME » du Drive IBIG (parentId 1w5w346wmg2MH4ZUB6pM0VCaIrpp6scdm).
// Le kit est composé essentiellement d'outils Excel (.xlsx/.xlsm) et de manuels PDF
// (ignorés) ; les MODÈLES bureautiques exploitables sont les lettres et fiches
// commerciales des sous-dossiers DIVERS et GESTION COMMERCIALE. Les actes juridiques
// « auto-entrepreneur » attendus (déclaration de début d'activité, immatriculation,
// attestation de TVA non applicable, mandat de facturation…) sont ABSENTS du Drive.
// Script ADDITIF : upsert par code — n'écrase aucun template existant.
// Exécution : npx tsx prisma/seed-drive4-pme.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type DriveTemplate = {
  code: string;
  name: string;
  category: string;
  price: number;
  priceMax: number;
  description: string;
  fieldsJson: string;
  body: string;
  popularity: number;
  countriesJson?: string;
};

const F = (fields: object[]) => JSON.stringify(fields);

const templates: DriveTemplate[] = [
  // ════════════════════ COMMERCIAL & FINANCIER ════════════════════
  {
    code: 'pme_proposition_commerciale',
    name: 'Proposition commerciale / de services (projet)',
    category: 'commercial_financier',
    price: 2000, priceMax: 4000,
    description: 'Proposition commerciale structurée pour répondre à un appel d’offres ou à un besoin client : contexte, analyse de la demande, objectifs, solution proposée, planning, conditions de réalisation et proposition tarifaire. Adaptée aux PME et prestataires indépendants.',
    fieldsJson: F([
      { key: 'prestataire', label: 'Votre société / prestataire (raison sociale + coordonnées complètes)', type: 'textarea', required: true },
      { key: 'client', label: 'Client destinataire (société + interlocuteur)', type: 'textarea', required: true },
      { key: 'projet', label: 'Intitulé du projet / de la mission', type: 'text', required: true },
      { key: 'contexte', label: 'Contexte et historique du projet', type: 'textarea', required: true },
      { key: 'besoins', label: 'Besoins / manques identifiés lors de l’analyse', type: 'textarea', required: true },
      { key: 'objectifs', label: 'Objectifs (opérationnels, budgétaires, autres)', type: 'textarea', required: true },
      { key: 'solution', label: 'Descriptif de la solution proposée et des étapes', type: 'textarea', required: true },
      { key: 'livrables', label: 'Principaux livrables du projet', type: 'textarea', required: true },
      { key: 'prix', label: 'Proposition tarifaire / devis (avec devise)', type: 'textarea', required: true },
      { key: 'validite', label: 'Durée de validité de l’offre (en jours)', type: 'text', required: true },
      { key: 'lieu', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="document"><h1>PROPOSITION COMMERCIALE</h1><p><strong>Projet :</strong> {{projet}}</p><p><strong>Émetteur :</strong> {{prestataire}}</p><p><strong>Destinataire :</strong> {{client}}</p><p>Date : {{date_jour}}</p><h2>1. Le contexte</h2><p>{{contexte}}</p><p>Cette section rappelle l’origine du besoin et démontre notre compréhension de votre situation.</p><h2>2. L’analyse de la demande</h2><p>La phase d’analyse (entretiens, échanges d’informations) a permis d’identifier les besoins suivants :</p><p>{{besoins}}</p><h2>3. Les objectifs</h2><p>Nous résumons les objectifs de la mission comme suit :</p><p>{{objectifs}}</p><h2>4. La solution proposée</h2><p>{{solution}}</p><h2>5. Livrables</h2><p>Le projet donnera lieu aux livrables suivants :</p><p>{{livrables}}</p><h2>6. Conditions de réalisation et proposition tarifaire</h2><p>{{prix}}</p><p>Cette proposition est garantie et valable pendant {{validite}} jours à compter de sa date d’émission. Au-delà, les prix et délais pourront être révisés avant l’exécution du contrat.</p><p class="signatures">Fait à {{lieu}}, le {{date_jour}}<br/><br/>POUR {{prestataire}}<br/>Tampon et signature</p></div>`,
    popularity: 50,
  },
  {
    code: 'pme_analyse_concurrentielle',
    name: 'Grille d’analyse concurrentielle',
    category: 'commercial_financier',
    price: 800, priceMax: 2000,
    description: 'Tableau de benchmark permettant de comparer votre société à ses principaux concurrents sur des critères clés : implantation, client cible, chiffre d’affaires, forces, faiblesses, identité de marque, services, produits et marketing.',
    fieldsJson: F([
      { key: 'societe', label: 'Nom de votre société', type: 'text', required: true },
      { key: 'concurrent1', label: 'Société concurrente n°1', type: 'text', required: true },
      { key: 'concurrent2', label: 'Société concurrente n°2', type: 'text', required: false },
      { key: 'concurrent3', label: 'Société concurrente n°3', type: 'text', required: false },
      { key: 'date_analyse', label: 'Date de l’analyse', type: 'date', required: true },
    ]),
    body: `<div class="document"><h1>ANALYSE CONCURRENTIELLE</h1><p>Analyse réalisée le {{date_analyse}} par <strong>{{societe}}</strong>.</p><table border="1" cellspacing="0" cellpadding="4"><thead><tr><th>Catégorie</th><th>{{societe}}</th><th>{{concurrent1}}</th><th>{{concurrent2}}</th><th>{{concurrent3}}</th></tr></thead><tbody><tr><td>Implantation</td><td></td><td></td><td></td><td></td></tr><tr><td>Client cible</td><td></td><td></td><td></td><td></td></tr><tr><td>Chiffre d’affaires</td><td></td><td></td><td></td><td></td></tr><tr><td>Date de création</td><td></td><td></td><td></td><td></td></tr><tr><td>Forces</td><td></td><td></td><td></td><td></td></tr><tr><td>Faiblesses</td><td></td><td></td><td></td><td></td></tr><tr><td>Identité de la marque</td><td></td><td></td><td></td><td></td></tr><tr><td>Mission</td><td></td><td></td><td></td><td></td></tr><tr><td>Services</td><td></td><td></td><td></td><td></td></tr><tr><td>Salariés</td><td></td><td></td><td></td><td></td></tr><tr><td>Produit</td><td></td><td></td><td></td><td></td></tr><tr><td>Marketing</td><td></td><td></td><td></td><td></td></tr></tbody></table><p>Complétez chaque cellule pour situer votre positionnement et dégager vos avantages concurrentiels.</p></div>`,
    popularity: 40,
  },
  {
    code: 'pme_fiche_prospection',
    name: 'Fiche de prospection commerciale',
    category: 'commercial_financier',
    price: 600, priceMax: 1500,
    description: 'Fiche de préparation et de suivi d’un contact de prospection : coordonnées du prospect, décideur, objectifs de l’appel, objectifs du client, objections anticipées et moyens de satisfaction.',
    fieldsJson: F([
      { key: 'entreprise', label: 'Nom et type d’entreprise du prospect', type: 'text', required: true },
      { key: 'adresse', label: 'Adresse complète (ville, code postal, téléphone)', type: 'textarea', required: true },
      { key: 'decideur', label: 'Décideur / interlocuteur (nom + fonction)', type: 'text', required: true },
      { key: 'objectifs_appel', label: 'Objectifs de l’appel / de la visite', type: 'textarea', required: true },
      { key: 'kit_media', label: 'Envoyer le kit média ? (Oui / Non)', type: 'text', required: false },
    ]),
    body: `<div class="document"><h1>FICHE DE PROSPECTION</h1><p><strong>Envoyer le kit média :</strong> {{kit_media}}</p><h2>Informations sur le prospect</h2><p>Entreprise : {{entreprise}}</p><p>{{adresse}}</p><p>Décideur : {{decideur}}</p><h2>Objectifs de l’appel</h2><p>{{objectifs_appel}}</p><h2>Objectifs du client</h2><p>…</p><h2>Moyens pour aider le client à atteindre ses objectifs</h2><p>…</p><h2>Objections du client</h2><p>…</p><h2>Réponses aux objections</h2><p>…</p><h2>Moyens pour satisfaire le client</h2><p>…</p></div>`,
    popularity: 38,
  },
  {
    code: 'pme_fiche_fixation_prix',
    name: 'Fiche d’aide à la fixation des prix',
    category: 'commercial_financier',
    price: 800, priceMax: 2000,
    description: 'Grille d’aide à la décision pour fixer ses prix de vente : critères pour se positionner au-dessus ou en-dessous des concurrents, estimation de la demande, analyse de la concurrence, part de marché et stratégie tarifaire.',
    fieldsJson: F([
      { key: 'societe', label: 'Nom de votre société', type: 'text', required: true },
      { key: 'produit', label: 'Produit ou service concerné', type: 'text', required: true },
      { key: 'date_analyse', label: 'Date de l’analyse', type: 'date', required: true },
    ]),
    body: `<div class="document"><h1>FICHE DE FIXATION DE PRIX</h1><p>Société : <strong>{{societe}}</strong> — Produit / service : {{produit}} — Date : {{date_analyse}}</p><h2>Se positionner au-dessus des concurrents si…</h2><p>— le marché n’est pas sensible au changement de prix ;<br/>— la clientèle est constituée d’entreprises en croissance ;<br/>— le produit est partie intégrante d’un système établi ;<br/>— la réputation (statut, service) améliore la valeur perçue ;<br/>— les clients intègrent facilement vos prix à leurs prix de vente ;<br/>— le produit représente un faible pourcentage des coûts du client.</p><h2>Se positionner en-dessous des concurrents si…</h2><p>— le marché est très sensible au prix ;<br/>— les clients rachètent régulièrement composants ou fournitures ;<br/>— l’entreprise est trop petite pour déclencher une guerre des prix ;<br/>— des économies de production réduisent les coûts unitaires ;<br/>— la pleine capacité de production n’est pas atteinte.</p><h2>Estimation de la demande</h2><p>Quels produits/services sont recherchés ? Lesquels sont demandés à prix élevé ? Existe-t-il une saisonnalité ? Quelle gamme de prix les clients attendent-ils ? Quelle relation prix/qualité sur le marché ?</p><h2>Concurrence</h2><p>Stratégies de prix des concurrents, marge brute moyenne du secteur, cohérence de votre stratégie de vente, réactions des concurrents à vos prix.</p><h2>Part de marché et stratégie</h2><p>Part de marché actuelle et cible, impact d’un changement de prix, adéquation avec la capacité de production, effet sur les objectifs de volume, tests de marché, cohérence avec les tendances économiques.</p></div>`,
    popularity: 30,
  },
  {
    code: 'pme_fiche_commissions',
    name: 'Fiche récapitulative des commissions sur ventes',
    category: 'commercial_financier',
    price: 600, priceMax: 1500,
    description: 'Fiche de calcul et de récapitulation des commissions dues à un vendeur ou représentant sur une période : détail des commandes, taux et montants, commissions brutes, avances et net à payer.',
    fieldsJson: F([
      { key: 'vendeur', label: 'Nom du vendeur / représentant', type: 'text', required: true },
      { key: 'zone', label: 'Zone d’intervention', type: 'text', required: true },
      { key: 'periode_debut', label: 'Période allant du', type: 'date', required: true },
      { key: 'periode_fin', label: 'Au', type: 'date', required: true },
    ]),
    body: `<div class="document"><h1>FICHE RÉCAPITULATIVE DE COMMISSION</h1><p>Vendeur : <strong>{{vendeur}}</strong> — Zone d’intervention : {{zone}}</p><p>Période du {{periode_debut}} au {{periode_fin}}.</p><table border="1" cellspacing="0" cellpadding="4"><thead><tr><th>Date</th><th>Commande</th><th>Client</th><th>Durée</th><th>Commission %</th><th>Montant</th></tr></thead><tbody><tr><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td></tr></tbody></table><table border="1" cellspacing="0" cellpadding="4"><tbody><tr><td>Total facturé</td><td></td></tr><tr><td>Commissions brutes obtenues</td><td></td></tr><tr><td>Moins les avances</td><td></td></tr><tr><td>Autres déductions</td><td></td></tr><tr><td><strong>Net à payer</strong></td><td></td></tr></tbody></table></div>`,
    popularity: 32,
  },
  {
    code: 'pme_evaluation_representant',
    name: 'Liste de vérification — évaluation d’un représentant commercial',
    category: 'commercial_financier',
    price: 700, priceMax: 1800,
    description: 'Liste de contrôle pour évaluer un représentant commercial indépendant avant de le mandater : produits concurrents, structure des commissions, zone couverte, comptes-clés, expérience, supports, reporting et gestion des créances.',
    fieldsJson: F([
      { key: 'societe', label: 'Votre société', type: 'text', required: true },
      { key: 'representant', label: 'Représentant commercial évalué (nom)', type: 'text', required: true },
      { key: 'date_eval', label: 'Date de l’évaluation', type: 'date', required: true },
    ]),
    body: `<div class="document"><h1>LISTE DE VÉRIFICATION — ÉVALUATION D’UN REPRÉSENTANT COMMERCIAL</h1><p>Société : <strong>{{societe}}</strong> — Représentant évalué : {{representant}} — Date : {{date_eval}}</p><p>Beaucoup de PME n’ont pas les moyens d’une force de vente interne substantielle et recourent à des représentants commerciaux indépendants rémunérés à la commission. Cette liste aide à évaluer chaque candidat avant de signer un contrat.</p><ul><li>Le représentant vend-il des produits concurrents ou incompatibles avec les vôtres ?</li><li>Quelle est la structure de ses commissions ?</li><li>Quelle est la zone géographique couverte ?</li><li>Quels sont ses comptes-clés ?</li><li>Depuis combien d’années évolue-t-il dans le secteur ? Peut-il fournir des références ?</li><li>Quels supports de promotion met-il à disposition ?</li><li>À quel rythme fournit-il des rapports de prospection ?</li><li>Quelle est sa fréquence de participation aux salons ?</li><li>Quelle est sa spécialité et l’étendue des marchés listés ?</li><li>Connaît-il vraiment le profil du client cible ?</li><li>Quelle sera la date de paiement des commissions ?</li><li>Quelle sera la période de recouvrement des créances et les déductions pour créances non recouvrables ?</li><li>Quels seront ses droits quant au rejet d’une demande de vente à crédit ?</li><li>Les catalogues et supports de vente sont-ils requis ?</li><li>Pouvez-vous assister à ses présentations de vente ?</li><li>Peut-il acheter des échantillons à prix réduit ? Gère-t-il du stock ?</li></ul></div>`,
    popularity: 28,
  },
  {
    code: 'pme_preparation_entretien_prospect',
    name: 'Liste de vérification — entretien avec un client potentiel',
    category: 'commercial_financier',
    price: 600, priceMax: 1500,
    description: 'Aide-mémoire pour préparer un entretien de vente avec un dirigeant ou un cadre : profil psychologique du décideur, bonnes pratiques de communication, raisons possibles d’un « non » et leviers pour obtenir un « oui ».',
    fieldsJson: F([
      { key: 'societe', label: 'Votre société', type: 'text', required: true },
      { key: 'prospect', label: 'Client potentiel / entreprise ciblée', type: 'text', required: true },
      { key: 'date_rdv', label: 'Date du rendez-vous', type: 'date', required: false },
    ]),
    body: `<div class="document"><h1>LISTE DE VÉRIFICATION — ENTRETIEN AVEC UN CLIENT POTENTIEL</h1><p>Société : <strong>{{societe}}</strong> — Prospect : {{prospect}} — Rendez-vous : {{date_rdv}}</p><h2>Comprendre le décideur</h2><p>Les chefs d’entreprise et cadres recherchent des défis, prennent des risques, sont orientés résultats, ont une grande confiance en eux, veulent gagner, travaillent dur, sont indépendants, créatifs et aiment les débats d’idées.</p><h2>Ce qu’il faut faire</h2><ul><li>Poser des questions, proposer des alternatives, les laisser décider.</li><li>Être spécifique et ne rien laisser au hasard.</li><li>Suggérer des solutions déjà adoptées par d’autres.</li><li>Éviter les interruptions et arriver avec un kit bien organisé (objectifs, supports marketing).</li></ul><h2>Pourquoi un prospect dit « non »</h2><ul><li>Il ne voit pas le rapport coût/avantage ou perçoit trop de risques.</li><li>Il pense manquer de temps ou avoir déjà une solution.</li><li>Absence de relation et de crédibilité perçue.</li><li>Il ne veut pas tout reprendre à zéro ni prendre de risque.</li></ul><h2>Pourquoi un prospect dit « oui »</h2><ul><li>Le produit vaut son coût en temps et en argent.</li><li>Le produit est facile à comprendre et à adopter.</li><li>L’entreprise et l’interlocuteur paraissent crédibles.</li></ul></div>`,
    popularity: 25,
  },
  {
    code: 'pme_reponse_renseignements',
    name: 'Lettre de réponse à une demande de renseignements',
    category: 'commercial_financier',
    price: 500, priceMax: 1200,
    description: 'Lettre type de réponse à un prospect ayant demandé des informations : transmission du catalogue et de la liste de prix, invitation à recontacter pour toute question complémentaire.',
    fieldsJson: F([
      { key: 'lieu', label: 'Lieu', type: 'text', required: true },
      { key: 'destinataire', label: 'Destinataire (nom + adresse complète)', type: 'textarea', required: true },
      { key: 'contact', label: 'Nom du contact (Madame/Monsieur …)', type: 'text', required: true },
      { key: 'expediteur', label: 'Votre nom, titre et coordonnées', type: 'textarea', required: true },
      { key: 'societe', label: 'Nom de votre société', type: 'text', required: true },
    ]),
    body: `<div class="document"><h1>RÉPONSE À UNE DEMANDE DE RENSEIGNEMENTS</h1><p>{{lieu}}, le {{date_jour}}</p><p>{{destinataire}}</p><p><strong>Objet : réponse à votre demande de renseignements</strong></p><p>Madame, Monsieur {{contact}},</p><p>Nous vous prions de trouver ci-joint notre catalogue ainsi que notre liste de prix et espérons que cette documentation répondra aux questions que vous avez posées.</p><p>Si vous avez besoin d’une information complémentaire au sujet de nos produits, n’hésitez pas à nous contacter. C’est avec plaisir que nous vous apporterons notre assistance.</p><p>Nous vous remercions de l’intérêt que vous portez à notre ligne de produits.</p><p>Veuillez agréer, Madame, Monsieur, l’expression de nos sentiments distingués.</p><p class="signatures">{{expediteur}}<br/>{{societe}}</p></div>`,
    popularity: 35,
  },
  {
    code: 'pme_lettre_retard_livraison',
    name: 'Lettre d’information — retard de livraison de marchandises',
    category: 'commercial_financier',
    price: 500, priceMax: 1200,
    description: 'Lettre par laquelle un fournisseur informe son client d’un retard de livraison, présente ses excuses, indique le nouveau délai et s’engage à expédier dès que possible.',
    fieldsJson: F([
      { key: 'lieu', label: 'Lieu', type: 'text', required: true },
      { key: 'destinataire', label: 'Destinataire (nom + adresse complète)', type: 'textarea', required: true },
      { key: 'contact', label: 'Nom du contact', type: 'text', required: true },
      { key: 'produits', label: 'Produits et quantités concernés', type: 'text', required: true },
      { key: 'date_prevue', label: 'Date de livraison initialement prévue', type: 'date', required: true },
      { key: 'num_commande', label: 'Numéro de bon de commande', type: 'text', required: true },
      { key: 'jours_retard', label: 'Nombre de jours de retard estimé', type: 'text', required: true },
      { key: 'expediteur', label: 'Votre nom, titre et coordonnées', type: 'textarea', required: true },
    ]),
    body: `<div class="document"><h1>RETARD DANS LA LIVRAISON DE MARCHANDISES</h1><p>{{lieu}}, le {{date_jour}}</p><p>{{destinataire}}</p><p><strong>Objet : retard dans la livraison de marchandises</strong></p><p>Madame, Monsieur {{contact}},</p><p>J’ai le regret de vous informer que nous ne sommes pas en mesure de vous livrer {{produits}} le {{date_prevue}}, en référence à votre bon de commande n° {{num_commande}}.</p><p>Compte tenu des informations dont nous disposons actuellement, la marchandise ne pourra être expédiée que {{jours_retard}} jours après la date initiale de livraison. J’espère que vous pourrez patienter jusqu’à cette date. Je vous assure que nous livrerons la marchandise aussitôt après réception.</p><p>Je vous prie de bien vouloir accepter toutes nos excuses pour ce retard et vous remercie de votre compréhension. Pour toute question, n’hésitez pas à me contacter.</p><p>Veuillez agréer, Madame, Monsieur, l’expression de nos sentiments distingués.</p><p class="signatures">{{expediteur}}</p></div>`,
    popularity: 33,
  },
  {
    code: 'pme_suivi_plainte_client',
    name: 'Lettre de suivi d’une plainte client',
    category: 'commercial_financier',
    price: 500, priceMax: 1200,
    description: 'Lettre de suivi adressée à un client mécontent : remerciements pour ses commentaires, présentation d’excuses, engagement sur les mesures correctives et invitation à renouveler sa confiance.',
    fieldsJson: F([
      { key: 'lieu', label: 'Lieu', type: 'text', required: true },
      { key: 'destinataire', label: 'Destinataire (nom + adresse complète)', type: 'textarea', required: true },
      { key: 'objet_plainte', label: 'Objet de la plainte / du commentaire', type: 'text', required: true },
      { key: 'responsable', label: 'Nom / poste du responsable saisi du dossier', type: 'text', required: true },
      { key: 'delai', label: 'Délai des changements prévus (jours / semaines / mois)', type: 'text', required: true },
      { key: 'expediteur', label: 'Votre nom, titre et coordonnées', type: 'textarea', required: true },
    ]),
    body: `<div class="document"><h1>SUIVI DE PLAINTE DU CLIENT</h1><p>{{lieu}}, le {{date_jour}}</p><p>{{destinataire}}</p><p>Madame, Monsieur,</p><p>Je tiens à vous remercier d’avoir pris le soin de nous faire part de vos remarques. Les commentaires de nos clients nous permettent d’améliorer notre service. Je vous informe avoir porté vos observations relatives à <strong>{{objet_plainte}}</strong> à la connaissance de {{responsable}}. Nous procéderons aux changements nécessaires d’ici {{delai}}.</p><p>Bien que ce défaut de service arrive rarement, rien ne l’excuse. Nous sommes sincèrement désolés pour les désagréments que cet incident a pu vous causer.</p><p>Je vous remercie encore de vos commentaires et veillerai à ce que nos services soient améliorés dans la poursuite de notre objectif d’excellence. Nous espérons que vous nous donnerez à nouveau l’occasion de vous servir.</p><p>Veuillez agréer, Madame, Monsieur, l’expression de nos sentiments distingués.</p><p class="signatures">{{expediteur}}</p></div>`,
    popularity: 34,
  },

  // ════════════════════ JURIDIQUE & ADMINISTRATIF ════════════════════
  {
    code: 'pme_politique_remboursement_frais',
    name: 'Politique de remboursement des frais professionnels',
    category: 'juridique_admin',
    price: 900, priceMax: 2500,
    description: 'Politique interne encadrant le remboursement des frais professionnels des commerciaux et salariés : procédure de demande, matériel fourni, frais kilométriques, repas, hôtel, stationnement et fournitures.',
    fieldsJson: F([
      { key: 'societe', label: 'Nom de votre société', type: 'text', required: true },
      { key: 'formulaire', label: 'Nom / référence du formulaire de note de frais', type: 'text', required: true },
      { key: 'taux_km', label: 'Taux de remboursement kilométrique (montant par km)', type: 'text', required: true },
      { key: 'plafond_repas', label: 'Plafond de remboursement des repas (par jour)', type: 'text', required: true },
      { key: 'plafond_hotel', label: 'Plafond de remboursement d’hôtel (par nuit)', type: 'text', required: true },
    ]),
    body: `<div class="document"><h1>POLITIQUE DE REMBOURSEMENT DES FRAIS PROFESSIONNELS</h1><p>La présente politique s’applique au sein de <strong>{{societe}}</strong>.</p><p>Les frais de représentation commerciale doivent être réclamés au moyen du formulaire {{formulaire}}. Une fois rempli, ce formulaire est remis au service comptabilité au dernier jour ouvrable de chaque mois ; les frais sont remboursés la semaine suivante.</p><ol><li>Un ordinateur portable est alloué au représentant pour les présentations de ventes et les tâches administratives ; il reste la propriété de {{societe}}.</li><li>Le téléphone mobile peut être acquis par le salarié ; les frais d’usage mensuel engagés pendant les heures de travail sont pris en charge par {{societe}}.</li><li>Les déplacements en voiture à des fins commerciales sont remboursés au taux de {{taux_km}} par kilomètre.</li><li>Les frais de stationnement engagés lors des activités commerciales sont remboursés sur présentation des reçus.</li><li>Les déjeuners d’affaires raisonnables sont remboursés dans la limite de {{plafond_repas}} par jour.</li><li>Les frais d’hôtel, en cas de besoin, sont remboursés dans la limite de {{plafond_hotel}} par nuit.</li><li>Tous les autres frais (location de salle, achat d’équipement, etc.) doivent être approuvés au préalable par le supérieur hiérarchique.</li><li>{{societe}} ne fournit pas les fournitures de bureau courantes mais en rembourse le coût sur présentation des reçus.</li></ol><p>Pour toute précision sur les éléments ci-dessus, adressez-vous à votre supérieur hiérarchique.</p></div>`,
    popularity: 30,
  },
];

async function main() {
  let created = 0;
  let updated = 0;
  const byCategory: Record<string, number> = {};

  for (const t of templates) {
    const data = {
      code: t.code,
      name: t.name,
      category: t.category,
      description: t.description,
      price: t.price,
      priceMax: t.priceMax,
      fieldsJson: t.fieldsJson,
      body: t.body,
      popularity: t.popularity,
      countriesJson: t.countriesJson ?? null,
    };
    const existing = await prisma.documentTemplate.findUnique({ where: { code: t.code } });
    await prisma.documentTemplate.upsert({ where: { code: t.code }, update: data, create: data });
    if (existing) updated += 1; else created += 1;
    byCategory[t.category] = (byCategory[t.category] ?? 0) + 1;
  }

  const total = await prisma.documentTemplate.count();

  console.log('✅ Seed Drive4 PME (KIT AUTO-ENTREPRENEURS ET PME) terminé.');
  console.log(`   Templates du script : ${templates.length} (créés : ${created}, mis à jour : ${updated})`);
  console.log('   Répartition par catégorie (ce script) :');
  for (const [cat, n] of Object.entries(byCategory)) console.log(`     - ${cat} : ${n}`);
  console.log(`   ➜ Total de templates en base : ${total}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
