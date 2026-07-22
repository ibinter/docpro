// Seed Drive2 Banque — Agent Drive2-1/10 : 12 templates BANCAIRES convertis depuis
// le kit Google Drive IBI079 « 200 modèles de contrat pour le secteur Banque & Assurance ».
// Script ADDITIF : upsert par code — n'écrase aucun template existant.
// Exécution : npx tsx prisma/seed-drive2-banque.ts
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
  // ════════════════════ BANQUE — CRÉDIT & FINANCEMENT ════════════════════
  {
    code: 'bank_pret_bancaire',
    name: 'Contrat de prêt bancaire',
    category: 'commercial_financier',
    price: 4000, priceMax: 6000,
    description: 'Contrat par lequel une banque consent un prêt à un emprunteur (personne physique ou morale) : montant, remboursement, utilisation des fonds, sûretés, intérêts, remboursement anticipé et défaut de paiement.',
    fieldsJson: F([
      { key: 'banque', label: 'Banque (raison sociale, pays du droit applicable, n° d’enregistrement, adresse du siège)', type: 'textarea', required: true },
      { key: 'emprunteur', label: 'Emprunteur (nom, statut personne physique/morale, nationalité, adresse ou siège)', type: 'textarea', required: true },
      { key: 'montant', label: 'Montant total du prêt (en chiffres et en lettres, avec la devise)', type: 'text', required: true },
      { key: 'garantie', label: 'Sûreté ou garantie affectée (ex. hypothèque sur bien immobilier, garantie bancaire…)', type: 'textarea', required: true },
      { key: 'langue', label: 'Langue du contrat', type: 'text', required: true },
      { key: 'ville', label: 'Ville / lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE PRÊT BANCAIRE</h1><p><strong>Entre :</strong> {{banque}}, ci-après dénommée « la Banque », d'une part,</p><p><strong>Et :</strong> {{emprunteur}}, ci-après dénommé « l'Emprunteur », d'autre part.</p><p>Il est convenu ce qui suit :</p><h2>Article 1 — Objet du prêt</h2><p>La Banque consent à accorder à l'Emprunteur un prêt d'un montant total de <strong>{{montant}}</strong> (le « Prêt »), conformément aux termes et conditions énoncés dans le présent contrat.</p><h2>Article 2 — Montant et modalités de remboursement</h2><p>Le montant du Prêt, les modalités de remboursement, y compris les échéances, le taux d'intérêt applicable et toute autre condition de remboursement, sont définis dans l'annexe A du présent contrat.</p><h2>Article 3 — Utilisation des fonds</h2><p>L'Emprunteur utilisera les fonds du Prêt uniquement aux fins spécifiées dans l'annexe A et s'engage à ne pas utiliser les fonds à d'autres fins sans l'accord écrit préalable de la Banque.</p><h2>Article 4 — Sécurité</h2><p>En contrepartie du Prêt, l'Emprunteur affectera {{garantie}} comme garantie pour le remboursement du Prêt conformément aux modalités spécifiées dans l'annexe B.</p><h2>Article 5 — Intérêts</h2><p>Les intérêts sur le montant du Prêt seront calculés et payables selon les modalités spécifiées dans l'annexe A.</p><h2>Article 6 — Remboursement anticipé</h2><p>L'Emprunteur peut rembourser le Prêt par anticipation, en tout ou en partie, sous réserve des dispositions de l'annexe A et moyennant le paiement des frais de remboursement anticipé spécifiés dans ladite annexe.</p><h2>Article 7 — Défaut de paiement</h2><p>En cas de défaut de paiement de l'une quelconque des sommes dues en vertu du présent contrat, des pénalités de retard seront applicables conformément aux dispositions de l'annexe A.</p><h2>Article 8 — Loi applicable</h2><p>Ce contrat est régi et interprété conformément aux lois en vigueur dans l'Espace OHADA.</p><p class="signatures">Fait en deux exemplaires originaux, en {{langue}}, à {{ville}}, le {{date_jour}}<br/><br/>Pour la Banque — Pour l'Emprunteur<br/>Signature du représentant de la Banque — Signature de l'Emprunteur<br/>Nom du représentant de la Banque — Nom de l'Emprunteur</p></div>`,
    popularity: 58,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Droit bancaire UEMOA : loi portant réglementation bancaire de l’UMOA, instructions de la BCEAO (taux d’usure, TEG) et Acte uniforme OHADA portant organisation des sûretés pour les garanties.' },
      FR: { note: 'Code monétaire et financier (art. L.313-1 s. — opérations de crédit) et Code de la consommation pour les prêts aux particuliers (art. L.312-1 s.).' },
    }),
  },
  {
    code: 'bank_ouverture_credit',
    name: 'Contrat d’ouverture de crédit (ligne de crédit / découvert)',
    category: 'commercial_financier',
    price: 3500, priceMax: 6000,
    description: 'Contrat par lequel une institution financière accorde à une entreprise une ligne de crédit d’un montant maximal : utilisation, remboursement, taux d’intérêt, durée et résiliation.',
    fieldsJson: F([
      { key: 'crediteur', label: 'Créditeur — institution financière (raison sociale, adresse du siège, représentant légal et titre)', type: 'textarea', required: true },
      { key: 'emprunteur', label: 'Emprunteur (société, pays du droit, n° d’enregistrement, siège, représentant légal et titre)', type: 'textarea', required: true },
      { key: 'montant_max', label: 'Montant maximal de la ligne de crédit (avec la devise)', type: 'text', required: true },
      { key: 'taux', label: 'Taux d’intérêt applicable (%)', type: 'text', required: true },
      { key: 'methode_calcul', label: 'Méthode de calcul des intérêts', type: 'text', required: true },
      { key: 'duree', label: 'Durée de la ligne de crédit', type: 'text', required: true },
      { key: 'preavis', label: 'Durée du préavis de résiliation', type: 'text', required: true },
      { key: 'langue', label: 'Langue du contrat', type: 'text', required: true },
      { key: 'ville', label: 'Ville / lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT D'OUVERTURE DE CRÉDIT</h1><p><strong>Entre :</strong> {{crediteur}}, institution financière enregistrée et agréée selon les lois en vigueur dans l'Espace OHADA, dûment habilitée à cet effet, ci-après dénommée « le Créditeur », d'une part,</p><p><strong>Et :</strong> {{emprunteur}}, dûment habilité à cet effet, ci-après dénommé « l'Emprunteur », d'autre part.</p><p>Il est convenu ce qui suit :</p><h2>Article 1 — Objet</h2><p>Le Créditeur accorde à l'Emprunteur une ligne de crédit d'un montant maximal de <strong>{{montant_max}}</strong>, ci-après dénommée « la Ligne de Crédit », aux conditions et modalités définies dans le présent contrat.</p><h2>Article 2 — Utilisation de la Ligne de Crédit</h2><p>L'Emprunteur est autorisé à utiliser la Ligne de Crédit pour des besoins de financement légitimes liés à ses activités commerciales, conformément aux dispositions du présent contrat.</p><h2>Article 3 — Modalités de remboursement</h2><p>Le montant utilisé de la Ligne de Crédit sera remboursé par l'Emprunteur au Créditeur conformément aux termes convenus, y compris les intérêts, les frais et autres charges applicables.</p><h2>Article 4 — Taux d'intérêt</h2><p>Le taux d'intérêt applicable à la Ligne de Crédit est de <strong>{{taux}} %</strong>, calculé selon {{methode_calcul}}.</p><h2>Article 5 — Durée de la Ligne de Crédit</h2><p>La Ligne de Crédit demeure en vigueur pour une durée de {{duree}}, à moins qu'elle ne soit résiliée conformément aux dispositions du présent contrat.</p><h2>Article 6 — Conditions de résiliation</h2><p>Le Créditeur se réserve le droit de résilier la Ligne de Crédit à tout moment, moyennant un préavis écrit de {{preavis}} adressé à l'Emprunteur.</p><h2>Article 7 — Conditions générales</h2><p>Toutes les conditions générales applicables à la Ligne de Crédit sont spécifiées dans les annexes jointes au présent contrat, qui font partie intégrante de celui-ci.</p><h2>Article 8 — Loi applicable</h2><p>Ce contrat est régi et interprété conformément aux lois en vigueur dans l'Espace OHADA.</p><p class="signatures">Fait en deux exemplaires originaux, en {{langue}}, à {{ville}}, le {{date_jour}}<br/><br/>Pour le Créditeur — Pour l'Emprunteur<br/>Signature du représentant du Créditeur — Signature du représentant de l'Emprunteur<br/>Nom du représentant du Créditeur — Nom du représentant de l'Emprunteur</p></div>`,
    popularity: 40,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Ouvertures de crédit et découverts régis par la loi bancaire UMOA et les instructions BCEAO ; le taux effectif global ne peut dépasser le taux d’usure fixé par le Conseil des ministres de l’UMOA.' },
      FR: { note: 'Code monétaire et financier, art. L.313-12 : la réduction ou l’interruption d’un concours à durée indéterminée exige un préavis écrit (60 jours minimum).' },
    }),
  },
  {
    code: 'bank_credit_bail',
    name: 'Contrat de crédit-bail (leasing)',
    category: 'commercial_financier',
    price: 4000, priceMax: 6000,
    description: 'Contrat de crédit-bail (leasing) entre un bailleur et un preneur : description du bien, durée, loyers, entretien, assurance, transfert de propriété en fin de contrat et résiliation.',
    fieldsJson: F([
      { key: 'bailleur', label: 'Bailleur (société, pays du droit, n° d’enregistrement, siège, représentant légal et titre)', type: 'textarea', required: true },
      { key: 'preneur', label: 'Preneur (société, pays du droit, n° d’enregistrement, siège, représentant légal et titre)', type: 'textarea', required: true },
      { key: 'bien', label: 'Description détaillée du bien donné en crédit-bail', type: 'textarea', required: true },
      { key: 'duree', label: 'Durée du crédit-bail (en mois ou années)', type: 'text', required: true },
      { key: 'loyer', label: 'Montant du loyer mensuel (avec la devise)', type: 'text', required: true },
      { key: 'delai_mise_demeure', label: 'Délai de la mise en demeure avant résiliation (en jours)', type: 'text', required: true },
      { key: 'langue', label: 'Langue du contrat', type: 'text', required: true },
      { key: 'ville', label: 'Ville / lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE CRÉDIT-BAIL (LEASING)</h1><p><strong>Entre :</strong> {{bailleur}}, dûment habilité à cet effet, ci-après dénommé « le Bailleur », d'une part,</p><p><strong>Et :</strong> {{preneur}}, dûment habilité à cet effet, ci-après dénommé « le Preneur », d'autre part.</p><p>Il est convenu ce qui suit :</p><h2>Article 1 — Objet</h2><p>Le Bailleur donne en crédit-bail au Preneur et le Preneur accepte de prendre en crédit-bail auprès du Bailleur le bien désigné comme suit :</p><p>Description du bien : {{bien}}</p><h2>Article 2 — Durée du crédit-bail</h2><p>La durée du crédit-bail est de <strong>{{duree}}</strong> à compter de la date de prise d'effet du présent contrat, sauf résiliation anticipée conformément aux dispositions du présent contrat.</p><h2>Article 3 — Loyers</h2><p>Le Preneur s'engage à payer au Bailleur des loyers mensuels d'un montant de <strong>{{loyer}}</strong> payable à terme échu, et ce, pendant toute la durée du crédit-bail.</p><h2>Article 4 — Conditions de paiement</h2><p>Les loyers seront payables à l'adresse du Bailleur indiquée dans le préambule du présent contrat ou à toute autre adresse désignée par le Bailleur par écrit.</p><h2>Article 5 — Entretien et réparations</h2><p>Le Preneur est responsable de l'entretien courant du bien loué pendant la durée du crédit-bail. Le Bailleur est responsable des réparations majeures résultant de l'usure normale du bien.</p><h2>Article 6 — Assurance</h2><p>Le Preneur doit maintenir une assurance adéquate sur le bien loué pendant toute la durée du crédit-bail, avec le Bailleur nommé comme bénéficiaire de l'assurance.</p><h2>Article 7 — Transfert de propriété</h2><p>À la fin de la durée du crédit-bail et après paiement intégral de tous les loyers et charges, la propriété du bien sera transférée au Preneur.</p><h2>Article 8 — Résiliation</h2><p>En cas de manquement grave de l'une ou l'autre des parties aux obligations découlant du présent contrat, l'autre partie aura le droit de résilier le contrat après mise en demeure restée sans effet pendant {{delai_mise_demeure}} jours.</p><h2>Article 9 — Loi applicable</h2><p>Ce contrat est régi et interprété conformément aux lois en vigueur dans l'Espace OHADA.</p><p class="signatures">Fait en deux exemplaires originaux, en {{langue}}, à {{ville}}, le {{date_jour}}<br/><br/>Pour le Bailleur — Pour le Preneur<br/>Signature du représentant du Bailleur — Signature du représentant du Preneur<br/>Nom du représentant du Bailleur — Nom du représentant du Preneur</p></div>`,
    popularity: 45,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Crédit-bail régi dans l’UEMOA par les lois nationales inspirées de la loi uniforme relative au crédit-bail (BCEAO) ; l’opération est réservée aux établissements de crédit et établissements financiers agréés.' },
      FR: { note: 'Code monétaire et financier, art. L.313-7 s. — le crédit-bail est une opération de crédit réservée aux établissements agréés ; publicité obligatoire pour l’opposabilité aux tiers.' },
    }),
  },
  {
    code: 'bank_financement_projet',
    name: 'Contrat de financement de projet',
    category: 'commercial_financier',
    price: 4000, priceMax: 6000,
    description: 'Contrat de financement d’un projet entre un prêteur et un emprunteur : montant, modalités de versement et de remboursement, affectation exclusive des fonds, garanties et reporting.',
    fieldsJson: F([
      { key: 'preteur', label: 'Prêteur (société, forme juridique, n° d’enregistrement, adresse du siège)', type: 'textarea', required: true },
      { key: 'emprunteur', label: 'Emprunteur (société, forme juridique, n° d’enregistrement, adresse du siège)', type: 'textarea', required: true },
      { key: 'nom_projet', label: 'Nom / désignation du projet financé', type: 'text', required: true },
      { key: 'montant', label: 'Montant total du financement (en chiffres et en lettres, avec la devise)', type: 'text', required: true },
      { key: 'modalites', label: 'Modalités de versement, échéances de remboursement et taux d’intérêt applicable', type: 'textarea', required: true },
      { key: 'garanties', label: 'Garanties fournies (garanties personnelles, garanties réelles…)', type: 'textarea', required: true },
      { key: 'juridiction', label: 'Lieu des tribunaux compétents en cas de litige', type: 'text', required: true },
      { key: 'ville', label: 'Ville / lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE FINANCEMENT DE PROJET</h1><p><strong>Entre :</strong> {{preteur}}, ci-après dénommé « le Prêteur »,</p><p><strong>Et :</strong> {{emprunteur}}, ci-après dénommé « l'Emprunteur ».</p><p>Il est convenu ce qui suit :</p><h2>Article 1 — Objet du contrat</h2><p>Le Prêteur s'engage à accorder à l'Emprunteur un financement pour le projet désigné comme <strong>{{nom_projet}}</strong> (« le Projet »), conformément aux termes et conditions du présent contrat.</p><h2>Article 2 — Montant et modalités de financement</h2><p>Le montant total du financement est de <strong>{{montant}}</strong>. Ce montant sera mis à disposition de l'Emprunteur selon les modalités suivantes : {{modalites}}</p><h2>Article 3 — Utilisation des fonds</h2><p>Les fonds octroyés par le Prêteur seront exclusivement utilisés pour financer les dépenses liées au Projet telles que spécifiées dans le plan de financement joint en annexe au présent contrat.</p><h2>Article 4 — Garanties</h2><p>En contrepartie du financement accordé, l'Emprunteur s'engage à fournir les garanties convenues entre les parties, notamment : {{garanties}}</p><h2>Article 5 — Remboursement</h2><p>L'Emprunteur remboursera le Prêteur conformément au plan de remboursement convenu entre les parties, incluant le remboursement du capital emprunté ainsi que les intérêts calculés selon le taux convenu.</p><h2>Article 6 — Responsabilités de l'Emprunteur</h2><p>L'Emprunteur s'engage à mettre en œuvre le Projet conformément aux termes du contrat et à rendre compte régulièrement au Prêteur de l'avancement du Projet.</p><h2>Article 7 — Droit applicable et règlement des litiges</h2><p>Ce contrat est régi et interprété conformément aux lois en vigueur dans l'Espace OHADA. Tout litige découlant de l'interprétation ou de l'exécution du présent contrat sera soumis à la juridiction exclusive des tribunaux compétents de {{juridiction}}.</p><p class="signatures">Fait en deux exemplaires originaux, à {{ville}}, le {{date_jour}}<br/><br/>Pour le Prêteur — Pour l'Emprunteur<br/>Signature du représentant du Prêteur — Signature de l'Emprunteur<br/>Nom du représentant du Prêteur — Nom de l'Emprunteur</p></div>`,
    popularity: 38,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Financements régis par la loi bancaire UMOA et le droit commun des obligations ; les sûretés consenties relèvent de l’Acte uniforme OHADA portant organisation des sûretés (inscription au RCCM).' },
      FR: { note: 'Code monétaire et financier (monopole bancaire, art. L.511-5) et Code civil pour les obligations contractuelles ; garanties régies par les art. 2284 s. du Code civil.' },
    }),
  },
  {
    code: 'bank_affacturage',
    name: 'Contrat d’affacturage (factoring)',
    category: 'commercial_financier',
    price: 3500, priceMax: 5500,
    description: 'Contrat par lequel un client confie à un factor la gestion de son poste clients et le financement de ses créances commerciales : cession des créances, modalités de financement, commission et notification aux débiteurs.',
    fieldsJson: F([
      { key: 'factor', label: 'Factor (société, forme juridique, n° d’enregistrement, adresse du siège)', type: 'textarea', required: true },
      { key: 'client', label: 'Client (société, forme juridique, n° d’enregistrement, adresse du siège)', type: 'textarea', required: true },
      { key: 'modalites_financement', label: 'Modalités de financement des créances (taux d’escompte, frais associés…)', type: 'textarea', required: true },
      { key: 'conditions_commission', label: 'Conditions tarifaires de la commission du factor (facultatif)', type: 'textarea', required: false },
      { key: 'langue', label: 'Langue du contrat', type: 'text', required: true },
      { key: 'ville', label: 'Ville / lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT D'AFFACTURAGE</h1><p><strong>Entre :</strong> {{factor}}, ci-après dénommé « le Factor »,</p><p><strong>Et :</strong> {{client}}, ci-après dénommé « le Client ».</p><p>Il est convenu ce qui suit :</p><h2>Article 1 — Objet du contrat</h2><p>Le Client confie au Factor la gestion de son poste clients, ainsi que le financement des créances commerciales qui en découlent, dans les conditions définies par le présent contrat.</p><h2>Article 2 — Cession des créances</h2><p>Le Client cède au Factor de manière irrévocable et définitive toutes les créances commerciales résultant des ventes de biens ou de prestations de services, ainsi que tous les droits et garanties y afférents.</p><h2>Article 3 — Modalités de financement</h2><p>Le Factor s'engage à financer les créances cédées par le Client selon les modalités suivantes : {{modalites_financement}}</p><h2>Article 4 — Gestion du poste clients</h2><p>Le Factor assure la gestion du poste clients du Client, y compris la relance des débiteurs en cas de retard de paiement.</p><h2>Article 5 — Règlement des créances</h2><p>Les paiements effectués par les débiteurs seront adressés directement au Factor, qui encaissera les créances cédées par le Client.</p><h2>Article 6 — Commission</h2><p>En contrepartie de ses services, le Factor percevra une commission calculée sur les montants financés, conformément aux conditions tarifaires convenues entre les parties. {{conditions_commission}}</p><h2>Article 7 — Notification aux débiteurs</h2><p>Le Client s'engage à informer ses débiteurs de la cession des créances au Factor dès la conclusion du présent contrat.</p><h2>Article 8 — Confidentialité</h2><p>Les parties s'engagent à maintenir la confidentialité des informations échangées dans le cadre de ce contrat.</p><h2>Article 9 — Loi applicable</h2><p>Ce contrat est régi et interprété conformément aux lois en vigueur dans l'Espace OHADA.</p><p class="signatures">Fait en deux exemplaires originaux, en {{langue}}, à {{ville}}, le {{date_jour}}<br/><br/>Pour le Factor — Pour le Client<br/>Signature du représentant du Factor — Signature du Client<br/>Nom du représentant du Factor — Nom du Client</p></div>`,
    popularity: 33,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Affacturage adossé au droit commun de la cession de créance et, dans l’UEMOA, à la loi uniforme relative à l’affacturage (BCEAO) ; activité réservée aux établissements agréés.' },
      FR: { note: 'Code monétaire et financier — la cession de créances professionnelles peut s’opérer par bordereau Dailly (art. L.313-23 s.) ; l’affacturage est une opération de crédit réservée aux établissements agréés.' },
    }),
  },

  // ════════════════════ BANQUE — GARANTIES ════════════════════
  {
    code: 'bank_cautionnement',
    name: 'Contrat de cautionnement (société de cautionnement)',
    category: 'commercial_financier',
    price: 3500, priceMax: 5500,
    description: 'Contrat tripartite par lequel une société de cautionnement garantit au créancier le paiement des dettes du débiteur principal jusqu’à concurrence d’un montant garanti.',
    fieldsJson: F([
      { key: 'societe_caution', label: 'Société de cautionnement (forme juridique, n° d’enregistrement, siège, représentant légal et titre)', type: 'textarea', required: true },
      { key: 'debiteur', label: 'Débiteur principal (nom, statut personne physique/morale, nationalité, adresse ou siège)', type: 'textarea', required: true },
      { key: 'creancier', label: 'Créancier (nom, statut personne physique/morale, nationalité, adresse ou siège)', type: 'textarea', required: true },
      { key: 'montant_garanti', label: 'Montant garanti (avec la devise)', type: 'text', required: true },
      { key: 'contrat_principal', label: 'Contrat garanti (ex. contrat de prêt du 10/02/2026 entre le débiteur et le créancier)', type: 'text', required: true },
      { key: 'langue', label: 'Langue du contrat', type: 'text', required: true },
      { key: 'ville', label: 'Ville / lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE CAUTIONNEMENT</h1><p><strong>Entre :</strong> {{societe_caution}}, ci-après dénommée « la Société de Cautionnement », d'une part,</p><p><strong>Et :</strong> {{debiteur}}, ci-après dénommé « le Débiteur Principal »,</p><p><strong>Et :</strong> {{creancier}}, ci-après dénommé « le Créancier ».</p><p>Il est convenu ce qui suit :</p><h2>Article 1 — Objet du cautionnement</h2><p>La Société de Cautionnement s'engage à garantir le paiement de toutes les dettes et obligations contractées par le Débiteur Principal envers le Créancier jusqu'à concurrence de <strong>{{montant_garanti}}</strong> (le « Montant Garanti »), telles que spécifiées dans {{contrat_principal}}, et ce, conformément aux termes et conditions énoncés dans le présent contrat.</p><h2>Article 2 — Durée du cautionnement</h2><p>Le cautionnement prend effet à partir de la date de signature du présent contrat et demeure en vigueur jusqu'à la libération de la garantie par le Créancier, sous réserve que le Débiteur Principal se conforme à toutes ses obligations envers le Créancier.</p><h2>Article 3 — Obligations de la Société de Cautionnement</h2><p>La Société de Cautionnement s'engage à honorer toute demande de paiement formulée par le Créancier dans les délais spécifiés dans ladite demande, à condition que le Créancier fournisse à la Société de Cautionnement une preuve écrite de la défaillance du Débiteur Principal dans l'exécution de ses obligations contractuelles.</p><h2>Article 4 — Obligations du Débiteur Principal</h2><p>Le Débiteur Principal s'engage à notifier immédiatement à la Société de Cautionnement tout défaut de paiement ou tout autre manquement à ses obligations envers le Créancier.</p><h2>Article 5 — Limitation de responsabilité</h2><p>La responsabilité de la Société de Cautionnement en vertu du présent contrat est limitée au Montant Garanti spécifié à l'article 1.</p><h2>Article 6 — Loi applicable</h2><p>Ce contrat de cautionnement est régi et interprété conformément aux lois en vigueur dans l'Espace OHADA.</p><p class="signatures">Fait en trois exemplaires originaux, en {{langue}}, à {{ville}}, le {{date_jour}}<br/><br/>Pour la Société de Cautionnement — Pour le Débiteur Principal — Pour le Créancier<br/>Signature du représentant légal — Signature du Débiteur Principal — Signature du représentant légal<br/>Nom du représentant légal — Nom du Débiteur Principal — Nom du représentant légal</p></div>`,
    popularity: 48,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Cautionnement régi par l’Acte uniforme portant organisation des sûretés (AUS révisé du 15/12/2010), art. 13 s. — mention manuscrite du montant maximal garanti exigée de la caution.' },
      FR: { note: 'Articles 2288 s. du Code civil (réforme du droit des sûretés, ordonnance du 15/09/2021) — mention exigée à peine de nullité pour la caution personne physique.' },
    }),
  },
  {
    code: 'bank_garantie_bancaire',
    name: 'Contrat de garantie bancaire',
    category: 'commercial_financier',
    price: 3500, priceMax: 6000,
    description: 'Contrat par lequel une banque garantit, jusqu’à concurrence d’un montant fixé, le paiement des obligations financières de son client envers un créancier : montant, durée, conditions d’appel et remboursement.',
    fieldsJson: F([
      { key: 'banque', label: 'Banque (raison sociale, pays du droit applicable, n° d’enregistrement, adresse du siège)', type: 'textarea', required: true },
      { key: 'beneficiaire', label: 'Bénéficiaire de la garantie (nom, statut personne physique/morale, nationalité, adresse ou siège)', type: 'textarea', required: true },
      { key: 'creancier', label: 'Créancier envers lequel les obligations sont garanties (nom / société)', type: 'text', required: true },
      { key: 'montant', label: 'Montant de la garantie (en chiffres et en lettres, avec la devise)', type: 'text', required: true },
      { key: 'date_expiration', label: 'Date d’expiration de la garantie', type: 'date', required: true },
      { key: 'ville', label: 'Ville / lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE GARANTIE BANCAIRE</h1><p><strong>Entre :</strong> {{banque}}, ci-après dénommée « la Banque », d'une part,</p><p><strong>Et :</strong> {{beneficiaire}}, ci-après dénommé « le Bénéficiaire », d'autre part.</p><h2>Article 1 — Objet</h2><p>La Banque s'engage à garantir le paiement des obligations financières du Bénéficiaire envers <strong>{{creancier}}</strong> jusqu'à concurrence du montant spécifié dans la présente garantie, et ce conformément aux termes et conditions énoncés ci-après.</p><h2>Article 2 — Montant de la garantie</h2><p>Le montant de la garantie accordée par la Banque en faveur du Bénéficiaire est fixé à <strong>{{montant}}</strong>, sous réserve des dispositions spécifiques prévues dans les annexes à ce contrat.</p><h2>Article 3 — Durée de la garantie</h2><p>La présente garantie entre en vigueur à la date de sa signature et demeure en vigueur jusqu'au {{date_expiration}}, sauf résiliation anticipée conformément aux dispositions du présent contrat.</p><h2>Article 4 — Conditions d'utilisation de la garantie</h2><p>Le Bénéficiaire peut utiliser la garantie fournie par la Banque pour sécuriser le paiement de ses obligations envers le Créancier, dans les conditions prévues par les dispositions de la présente garantie et conformément aux termes du contrat sous-jacent entre le Bénéficiaire et le Créancier.</p><h2>Article 5 — Paiement par la Banque</h2><p>En cas de demande de paiement valide émise par le Créancier conformément aux termes du contrat sous-jacent, la Banque s'engage à effectuer le paiement au Créancier dans les meilleurs délais, et ce jusqu'à concurrence du montant de la garantie.</p><h2>Article 6 — Remboursement par le Bénéficiaire</h2><p>Le Bénéficiaire s'engage à rembourser à la Banque tout montant payé par cette dernière en exécution de la présente garantie, dans les conditions et délais convenus entre les parties.</p><h2>Article 7 — Responsabilité de la Banque</h2><p>La responsabilité de la Banque au titre de la présente garantie se limite strictement aux obligations définies dans ce contrat et ne peut être engagée au-delà de ces obligations, sauf en cas de faute lourde ou de négligence grave de sa part.</p><h2>Article 8 — Loi applicable</h2><p>Ce contrat est régi et interprété conformément aux lois en vigueur dans l'Espace OHADA.</p><p class="signatures">Fait en deux exemplaires originaux, à {{ville}}, le {{date_jour}}<br/><br/>Pour la Banque — Pour le Bénéficiaire<br/>Signature du représentant de la Banque — Signature du Bénéficiaire<br/>Nom du représentant de la Banque — Nom du Bénéficiaire</p></div>`,
    popularity: 44,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Garanties et contre-garanties autonomes régies par l’Acte uniforme portant organisation des sûretés (AUS révisé), art. 39 s. — engagement écrit mentionnant une somme maximale, à première demande ou sur justification.' },
      FR: { note: 'Article 2321 du Code civil — la garantie autonome oblige le garant à payer à première demande, sans pouvoir opposer les exceptions tenant à l’obligation garantie.' },
    }),
  },

  // ════════════════════ BANQUE — COMPTES & DÉPÔTS ════════════════════
  {
    code: 'bank_compte_bancaire',
    name: 'Contrat de compte bancaire (ouverture de compte)',
    category: 'commercial_financier',
    price: 2500, priceMax: 4500,
    description: 'Convention d’ouverture de compte entre une banque et son client : nature du compte, dépôts, retraits, frais, intérêts, confidentialité et clôture.',
    fieldsJson: F([
      { key: 'banque', label: 'Banque (raison sociale, pays du droit applicable, n° d’enregistrement, adresse du siège)', type: 'textarea', required: true },
      { key: 'client', label: 'Client (nom, statut personne physique/morale, nationalité, adresse ou siège)', type: 'textarea', required: true },
      { key: 'nature_compte', label: 'Nature du compte (compte courant, compte d’épargne, autre — précisez)', type: 'text', required: true },
      { key: 'langue', label: 'Langue du contrat', type: 'text', required: true },
      { key: 'ville', label: 'Ville / lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE COMPTE BANCAIRE</h1><p><strong>Entre :</strong> {{banque}}, ci-après dénommée « la Banque », d'une part,</p><p><strong>Et :</strong> {{client}}, ci-après dénommé « le Client », d'autre part.</p><p>Il est convenu ce qui suit :</p><h2>Article 1 — Ouverture du compte</h2><p>La Banque ouvrira un compte bancaire au nom du Client conformément aux modalités et conditions établies dans le présent contrat.</p><h2>Article 2 — Nature du compte</h2><p>Le compte ouvert sera un compte de nature suivante : <strong>{{nature_compte}}</strong>.</p><h2>Article 3 — Dépôts</h2><p>Le Client est autorisé à effectuer des dépôts sur son compte à tout moment pendant les heures d'ouverture de la Banque.</p><h2>Article 4 — Retraits</h2><p>Le Client peut effectuer des retraits sur son compte selon les procédures établies par la Banque. Les retraits peuvent être effectués aux guichets de la Banque ou par d'autres moyens autorisés.</p><h2>Article 5 — Frais et charges</h2><p>Le Client accepte de payer les frais et charges associés à l'utilisation du compte, tel que spécifié dans la grille tarifaire de la Banque en vigueur.</p><h2>Article 6 — Intérêts</h2><p>Les intérêts seront versés sur le solde créditeur du compte conformément aux conditions fixées par la Banque.</p><h2>Article 7 — Confidentialité</h2><p>La Banque s'engage à maintenir la confidentialité des informations relatives au compte du Client conformément aux lois et réglementations en vigueur.</p><h2>Article 8 — Clôture du compte</h2><p>Le Client peut demander la clôture de son compte à tout moment en fournissant un préavis écrit à la Banque. La Banque se réserve le droit de clôturer le compte en cas de non-respect des conditions énoncées dans ce contrat.</p><h2>Article 9 — Loi applicable</h2><p>Ce contrat est régi et interprété conformément aux lois en vigueur dans l'Espace OHADA.</p><p class="signatures">Fait en deux exemplaires originaux, en {{langue}}, à {{ville}}, le {{date_jour}}<br/><br/>Pour la Banque — Pour le Client<br/>Signature du représentant de la Banque — Signature du Client<br/>Nom du représentant de la Banque — Nom du Client</p></div>`,
    popularity: 52,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Convention de compte régie par la loi bancaire UMOA et les instructions BCEAO (conditions de banque, services bancaires offerts à titre gratuit) ; droit au compte auprès de la BCEAO en cas de refus d’ouverture.' },
      FR: { note: 'Code monétaire et financier, art. L.312-1 (droit au compte) et L.312-1-1 — convention de compte de dépôt écrite obligatoire.' },
    }),
  },
  {
    code: 'bank_depot_terme',
    name: 'Contrat de dépôt à terme (DAT)',
    category: 'commercial_financier',
    price: 2500, priceMax: 4500,
    description: 'Contrat de dépôt à terme : somme placée en banque pour une durée fixe contre un taux d’intérêt fixe, avec clause de non-résiliation anticipée et remboursement à l’échéance.',
    fieldsJson: F([
      { key: 'banque', label: 'Banque (raison sociale, pays du droit applicable, n° d’enregistrement, adresse du siège)', type: 'textarea', required: true },
      { key: 'deposant', label: 'Déposant (nom, statut personne physique/morale, nationalité, adresse ou siège)', type: 'textarea', required: true },
      { key: 'montant', label: 'Montant du dépôt (en chiffres et en lettres, avec la devise)', type: 'text', required: true },
      { key: 'duree', label: 'Durée du dépôt (en jours, mois ou années)', type: 'text', required: true },
      { key: 'taux', label: 'Taux d’intérêt fixe (%)', type: 'text', required: true },
      { key: 'periodicite', label: 'Périodicité du taux (par jour, par mois ou par année)', type: 'text', required: true },
      { key: 'ville', label: 'Ville / lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE DÉPÔT À TERME</h1><p><strong>Entre :</strong> {{banque}}, ci-après dénommée « la Banque », d'une part,</p><p><strong>Et :</strong> {{deposant}}, ci-après dénommé « le Déposant », d'autre part.</p><h2>Article 1 — Objet</h2><p>La Banque accepte, sur la base des termes et conditions énoncés dans ce contrat, de recevoir en dépôt de la part du Déposant une somme d'argent déterminée, en vue de la placer pour une durée fixe.</p><h2>Article 2 — Montant et durée du dépôt</h2><p>Le Déposant s'engage à déposer la somme de <strong>{{montant}}</strong> pour une durée de <strong>{{duree}}</strong>.</p><h2>Article 3 — Taux d'intérêt</h2><p>La Banque versera au Déposant un taux d'intérêt fixe de <strong>{{taux}} %</strong> par {{periodicite}}, calculé sur la base de la somme déposée et pour la durée convenue.</p><h2>Article 4 — Remboursement du dépôt</h2><p>À l'échéance convenue, la Banque remboursera au Déposant le montant initial du dépôt, ainsi que les intérêts accumulés, sous réserve des déductions et retenues éventuelles prévues par la loi.</p><h2>Article 5 — Clause de non-résiliation anticipée</h2><p>Le Déposant s'engage à ne pas demander le remboursement anticipé du dépôt avant l'échéance convenue, sauf accord écrit de la Banque et sous réserve des conditions spécifiées dans ledit accord.</p><h2>Article 6 — Responsabilité de la Banque</h2><p>La Banque s'engage à garantir la sécurité et la confidentialité du dépôt, conformément aux lois et réglementations en vigueur dans l'Espace OHADA.</p><h2>Article 7 — Loi applicable</h2><p>Ce contrat est régi et interprété conformément aux lois en vigueur dans l'Espace OHADA.</p><p class="signatures">Fait en deux exemplaires originaux, à {{ville}}, le {{date_jour}}<br/><br/>Pour la Banque — Pour le Déposant<br/>Signature du représentant de la Banque — Signature du Déposant<br/>Nom du représentant de la Banque — Nom du Déposant</p></div>`,
    popularity: 35,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Dépôts à terme régis par la loi bancaire UMOA ; conditions de rémunération encadrées par les instructions de la BCEAO et couverture par le Fonds de garantie des dépôts dans l’UMOA (FGD-UMOA).' },
      FR: { note: 'Code monétaire et financier — les fonds reçus du public (art. L.312-2) sont couverts par le Fonds de garantie des dépôts et de résolution (FGDR) jusqu’à 100 000 € par déposant.' },
    }),
  },
  {
    code: 'bank_depot_vue',
    name: 'Contrat de dépôt à vue',
    category: 'commercial_financier',
    price: 2000, priceMax: 4000,
    description: 'Contrat d’ouverture d’un compte de dépôt à vue permettant au déposant de déposer des fonds et de les retirer sur simple demande : dépôts, retraits, intérêts, frais et clôture.',
    fieldsJson: F([
      { key: 'banque', label: 'Banque (raison sociale, pays du droit applicable, n° d’enregistrement, adresse du siège)', type: 'textarea', required: true },
      { key: 'deposant', label: 'Déposant (nom, statut personne physique/morale, nationalité, adresse ou siège)', type: 'textarea', required: true },
      { key: 'arrangements_interets', label: 'Arrangements spécifiques sur la rémunération du compte (facultatif)', type: 'textarea', required: false },
      { key: 'langue', label: 'Langue du contrat', type: 'text', required: true },
      { key: 'ville', label: 'Ville / lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE DÉPÔT À VUE</h1><p><strong>Entre :</strong> {{banque}}, ci-après dénommée « la Banque », d'une part,</p><p><strong>Et :</strong> {{deposant}}, ci-après dénommé « le Déposant », d'autre part.</p><p>Il est convenu ce qui suit :</p><h2>Article 1 — Ouverture du compte de dépôt</h2><p>La Banque ouvrira un compte de dépôt à vue au nom du Déposant conformément aux modalités et conditions établies dans le présent contrat.</p><h2>Article 2 — Nature du compte</h2><p>Le compte de dépôt à vue permet au Déposant de déposer des fonds auprès de la Banque et de retirer ces fonds sur demande.</p><h2>Article 3 — Conditions de dépôt</h2><p>Le Déposant est autorisé à déposer des fonds sur son compte de dépôt à vue à tout moment pendant les heures d'ouverture de la Banque.</p><h2>Article 4 — Retraits</h2><p>Le Déposant peut effectuer des retraits sur son compte de dépôt à vue selon les procédures établies par la Banque. Les retraits peuvent être effectués aux guichets de la Banque ou par d'autres moyens autorisés.</p><h2>Article 5 — Intérêts</h2><p>Aucun intérêt n'est généralement versé sur les comptes de dépôt à vue, mais cela peut être sujet à des arrangements spécifiques entre la Banque et le Déposant. {{arrangements_interets}}</p><h2>Article 6 — Frais et charges</h2><p>Le Déposant accepte de payer les frais et charges associés à l'utilisation du compte de dépôt à vue, tel que spécifié dans la grille tarifaire de la Banque en vigueur.</p><h2>Article 7 — Confidentialité</h2><p>La Banque s'engage à maintenir la confidentialité des informations relatives au compte de dépôt à vue du Déposant conformément aux lois et réglementations en vigueur.</p><h2>Article 8 — Clôture du compte</h2><p>Le Déposant peut demander la clôture de son compte de dépôt à vue à tout moment en fournissant un préavis écrit à la Banque. La Banque se réserve le droit de clôturer le compte en cas de non-respect des conditions énoncées dans ce contrat.</p><h2>Article 9 — Loi applicable</h2><p>Ce contrat est régi et interprété conformément aux lois en vigueur dans l'Espace OHADA.</p><p class="signatures">Fait en deux exemplaires originaux, en {{langue}}, à {{ville}}, le {{date_jour}}<br/><br/>Pour la Banque — Pour le Déposant<br/>Signature du représentant de la Banque — Signature du Déposant<br/>Nom du représentant de la Banque — Nom du Déposant</p></div>`,
    popularity: 30,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Comptes de dépôt à vue régis par la loi bancaire UMOA ; la BCEAO fixe la liste des services bancaires offerts à titre gratuit et les conditions de rémunération des dépôts.' },
      FR: { note: 'Code monétaire et financier, art. L.312-1-1 — convention de compte de dépôt écrite ; fonds couverts par le FGDR.' },
    }),
  },

  // ════════════════════ BANQUE — PAIEMENTS ════════════════════
  {
    code: 'bank_transfert_fonds',
    name: 'Contrat de transfert de fonds',
    category: 'commercial_financier',
    price: 2500, priceMax: 4500,
    description: 'Contrat encadrant le transfert de fonds entre une société émettrice et une société bénéficiaire : ordre de transfert, modalités, frais, responsabilités, confirmation et confidentialité.',
    fieldsJson: F([
      { key: 'emetteur', label: 'Émetteur (société, type, n° d’enregistrement, siège, représentant légal et titre)', type: 'textarea', required: true },
      { key: 'beneficiaire', label: 'Bénéficiaire (société, type, n° d’enregistrement, siège, représentant légal et titre)', type: 'textarea', required: true },
      { key: 'modalites_particulieres', label: 'Modalités particulières convenues sur les frais et charges (facultatif)', type: 'textarea', required: false },
      { key: 'langue', label: 'Langue du contrat', type: 'text', required: true },
      { key: 'ville', label: 'Ville / lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE TRANSFERT DE FONDS</h1><p><strong>Entre :</strong> {{emetteur}}, dûment autorisée à agir aux termes du présent contrat, ci-après dénommée « l'Émetteur »,</p><p><strong>Et :</strong> {{beneficiaire}}, dûment autorisée à agir aux termes du présent contrat, ci-après dénommée « le Bénéficiaire ».</p><p>Il est convenu ce qui suit :</p><h2>Article 1 — Objet du contrat</h2><p>Le présent contrat a pour objet de régir le transfert de fonds de l'Émetteur vers le Bénéficiaire, conformément aux modalités et conditions définies ci-après.</p><h2>Article 2 — Montant et devise du transfert</h2><p>Le montant du transfert ainsi que la devise dans laquelle il sera effectué sont spécifiés dans un ordre de transfert émis par l'Émetteur et accepté par le Bénéficiaire.</p><h2>Article 3 — Modalités de transfert</h2><p>Le transfert de fonds sera effectué par l'Émetteur selon les instructions fournies par le Bénéficiaire, y compris les détails du compte bancaire du Bénéficiaire et toute information nécessaire pour garantir le bon déroulement du transfert.</p><h2>Article 4 — Frais et charges</h2><p>Les frais et charges liés au transfert de fonds seront supportés conformément aux termes convenus entre les parties et spécifiés dans l'ordre de transfert ou tout accord financier distinct conclu entre les parties. {{modalites_particulieres}}</p><h2>Article 5 — Responsabilités des parties</h2><p>L'Émetteur s'engage à effectuer le transfert de fonds dans les délais convenus et à garantir la disponibilité des fonds nécessaires sur son compte désigné.</p><p>Le Bénéficiaire s'engage à fournir à l'Émetteur toutes les informations requises pour faciliter le transfert de fonds et à notifier immédiatement l'Émetteur de toute modification ou anomalie éventuelle dans les instructions de transfert.</p><h2>Article 6 — Confirmation du transfert</h2><p>L'Émetteur s'engage à fournir au Bénéficiaire une confirmation écrite du transfert de fonds une fois celui-ci effectué, comprenant les détails du transfert tels que le montant transféré, la date d'exécution et toute autre information pertinente.</p><h2>Article 7 — Confidentialité</h2><p>Les informations relatives au transfert de fonds seront traitées de manière confidentielle par les deux parties et ne seront divulguées à aucun tiers sans le consentement écrit préalable de l'autre partie, sauf si cela est requis par la loi.</p><h2>Article 8 — Loi applicable</h2><p>Ce contrat est régi et interprété conformément aux lois en vigueur dans l'Espace OHADA.</p><p class="signatures">Fait en deux exemplaires originaux, en {{langue}}, à {{ville}}, le {{date_jour}}<br/><br/>Pour l'Émetteur — Pour le Bénéficiaire<br/>Signature du représentant légal de l'Émetteur — Signature du représentant légal du Bénéficiaire<br/>Nom du représentant légal de l'Émetteur — Nom du représentant légal du Bénéficiaire</p></div>`,
    popularity: 28,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Transferts de fonds régis par le Règlement n°15/2002/CM/UEMOA relatif aux systèmes de paiement dans l’UEMOA et la réglementation des relations financières extérieures (transferts hors zone).' },
      FR: { note: 'Code monétaire et financier, art. L.314-1 s. (services de paiement, DSP2) — les prestataires de services de paiement doivent être agréés.' },
    }),
  },
  {
    code: 'bank_prelevement_automatique',
    name: 'Contrat de mandat de prélèvement automatique',
    category: 'commercial_financier',
    price: 2000, priceMax: 4000,
    description: 'Mandat par lequel un débiteur autorise un créancier bénéficiaire à prélever automatiquement des montants convenus sur son compte bancaire : autorisation, montants, notification et résiliation.',
    fieldsJson: F([
      { key: 'beneficiaire', label: 'Bénéficiaire des prélèvements (société, type, n° d’enregistrement, siège, représentant légal et titre)', type: 'textarea', required: true },
      { key: 'debiteur', label: 'Débiteur (nom, statut personne physique/morale, nationalité, adresse ou siège)', type: 'textarea', required: true },
      { key: 'montants_frequence', label: 'Montants et fréquence des prélèvements convenus (facultatif — sinon précisés en annexe)', type: 'textarea', required: false },
      { key: 'langue', label: 'Langue du contrat', type: 'text', required: true },
      { key: 'ville', label: 'Ville / lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE MANDAT DE PRÉLÈVEMENT AUTOMATIQUE</h1><p><strong>Entre :</strong> {{beneficiaire}}, dûment autorisée à agir aux termes du présent contrat, ci-après dénommée « le Bénéficiaire »,</p><p><strong>Et :</strong> {{debiteur}}, ci-après dénommé « le Débiteur ».</p><p>Il est convenu ce qui suit :</p><h2>Article 1 — Objet du contrat</h2><p>Le Débiteur accorde au Bénéficiaire un mandat de prélèvement automatique pour effectuer des prélèvements sur son compte bancaire, conformément aux termes et conditions énoncés dans le présent contrat.</p><h2>Article 2 — Autorisation de prélèvement</h2><p>Le Débiteur autorise le Bénéficiaire à prélever automatiquement les montants spécifiés sur son compte bancaire, selon les modalités convenues entre les parties.</p><h2>Article 3 — Montants et fréquence des prélèvements</h2><p>Les montants des prélèvements ainsi que leur fréquence seront déterminés par écrit entre les parties et spécifiés dans un document annexe faisant partie intégrante du présent contrat. {{montants_frequence}}</p><h2>Article 4 — Modalités de prélèvement</h2><p>Les prélèvements seront effectués conformément aux instructions fournies par le Bénéficiaire à sa banque et seront crédités sur le compte bancaire spécifié par le Débiteur.</p><h2>Article 5 — Notification des prélèvements</h2><p>Le Bénéficiaire s'engage à notifier le Débiteur de tout prélèvement effectué sur son compte, en lui fournissant un relevé détaillé des transactions.</p><h2>Article 6 — Responsabilités du Débiteur</h2><p>Le Débiteur s'engage à veiller à ce que son compte bancaire dispose des fonds suffisants pour permettre l'exécution des prélèvements autorisés conformément aux termes du présent contrat.</p><h2>Article 7 — Modification ou résiliation du mandat</h2><p>Toute modification ou résiliation du présent mandat doit faire l'objet d'un accord écrit entre les parties et être notifiée à leur banque respective conformément à la réglementation en vigueur.</p><h2>Article 8 — Loi applicable</h2><p>Ce contrat est régi et interprété conformément aux lois en vigueur dans l'Espace OHADA.</p><p class="signatures">Fait en deux exemplaires originaux, en {{langue}}, à {{ville}}, le {{date_jour}}<br/><br/>Pour le Bénéficiaire — Pour le Débiteur<br/>Signature du représentant légal du Bénéficiaire — Signature du Débiteur<br/>Nom du représentant légal du Bénéficiaire — Nom du Débiteur</p></div>`,
    popularity: 26,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Prélèvements régis par le Règlement n°15/2002/CM/UEMOA relatif aux systèmes de paiement dans l’UEMOA — le prélèvement suppose un mandat écrit du débiteur.' },
      FR: { note: 'Code monétaire et financier, art. L.133-1 s. — prélèvement SEPA : mandat unique signé du débiteur, remboursement possible dans les 8 semaines pour une opération autorisée.' },
    }),
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
  const withCountries = templates.filter((t) => t.countriesJson).length;

  console.log('✅ Seed Drive2 Banque (IBI079) terminé.');
  console.log(`   Templates du script : ${templates.length} (créés : ${created}, mis à jour : ${updated})`);
  console.log('   Répartition par catégorie (ce script) :');
  for (const [cat, n] of Object.entries(byCategory)) console.log(`     - ${cat} : ${n}`);
  console.log(`   Variantes pays (countriesJson) : ${withCountries} templates`);
  console.log(`   ➜ Total de templates en base : ${total}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
