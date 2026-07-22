// Seed Drive Finance & Juridique — Agent Drive-4/5 : 10 templates convertis depuis
// les modèles Google Drive IBIG (billets à ordre, sûretés, lettres juridiques, PI).
// Script ADDITIF : upsert par code — n'écrase aucun template existant.
// Exécution : npx tsx prisma/seed-drive-finance.ts
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

const BILLET_COUNTRIES = JSON.stringify({
  OHADA: { note: 'Régi par le Règlement n°15/2002/CM/UEMOA relatif aux systèmes de paiement.' },
  FR: { note: 'Articles L.512-1 s. du Code de commerce.' },
});

const templates: DriveTemplate[] = [
  // ════════════════════ COMMERCIAL & FINANCIER (5) ════════════════════
  {
    code: 'fin_billet_ordre_demande',
    name: 'Billet à ordre payable à demande',
    category: 'commercial_financier',
    price: 1500, priceMax: 3500,
    description: 'Billet à ordre par lequel l’emprunteur s’engage à payer au prêteur, à première demande, le principal et les intérêts au taux convenu.',
    fieldsJson: F([
      { key: 'preteur', label: 'Prêteur (nom / société + forme juridique + adresse du siège)', type: 'textarea', required: true },
      { key: 'emprunteur', label: 'Emprunteur (nom / société + forme juridique + adresse du siège)', type: 'textarea', required: true },
      { key: 'montant', label: 'Montant du principal (en chiffres et en lettres, avec la devise)', type: 'text', required: true },
      { key: 'taux', label: 'Taux d’intérêt annuel (%)', type: 'text', required: true },
      { key: 'delai_defaut', label: 'Délai de paiement après demande (en jours)', type: 'text', required: true },
      { key: 'date_emission', label: 'Date d’émission du billet', type: 'date', required: true },
      { key: 'ville', label: 'Ville de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>BILLET À ORDRE PAYABLE À DEMANDE</h1><p>Le présent billet à ordre est délivré et prend effet le {{date_emission}}.</p><p><strong>ENTRE :</strong> {{preteur}}, ci-après « le Prêteur », d'une part,</p><p><strong>ET :</strong> {{emprunteur}}, ci-après « l'Emprunteur », d'autre part.</p><h2>Engagement de payer</h2><p>EN VERTU DE CE QUI SUIT, le soussigné Emprunteur s'engage à payer à l'ordre du Prêteur la somme de <strong>{{montant}}</strong>, ainsi que les intérêts du solde impayé au taux annuel de <strong>{{taux}} %</strong>. La totalité du principal et tout intérêt accumulé seront immédiatement exigibles à la demande du Prêteur.</p><h2>Défaut de paiement</h2><p>En cas de défaut de paiement {{delai_defaut}} jours après la demande, et pour autant que le présent effet est transmis pour le recouvrement, l'Emprunteur s'engage à payer tous les frais de justice dans la limite tolérée par la loi. Le présent effet prendra effet en tant qu'acte signé et sera appliqué conformément aux lois applicables au lieu de paiement.</p><h2>Renonciations</h2><p>Toutes les parties concernées s'engagent à renoncer à toute convocation, notification de non-paiement, contestation ou notification de contestation, et s'engagent à demeurer pleinement responsables même en cas de remise de quelque partie, de prorogation, ou de modification des conditions ou de la levée de droit sur quelque garantie du présent effet.</p><p>EN VERTU DE CE QUI PRÉCÈDE, les soussignés ont approuvé et donné force exécutoire au présent effet payable à demande.</p><p class="signatures">Fait à {{ville}}, le {{date_jour}}<br/><br/>LE PRÊTEUR — L'EMPRUNTEUR<br/>Signature autorisée — Signature autorisée<br/>Nom et fonction — Nom et fonction</p></div>`,
    popularity: 55,
    countriesJson: BILLET_COUNTRIES,
  },
  {
    code: 'fin_billet_ordre_acceleration',
    name: 'Billet à ordre à demande avec clause d’accélération',
    category: 'commercial_financier',
    price: 2000, priceMax: 4000,
    description: 'Billet à ordre payable à demande comportant une clause d’accélération : en cas de défaut, la totalité du principal et des intérêts devient immédiatement exigible.',
    fieldsJson: F([
      { key: 'tireur', label: 'Tireur / bénéficiaire (nom / société + forme juridique + adresse)', type: 'textarea', required: true },
      { key: 'tire', label: 'Tiré / souscripteur (nom / société + forme juridique + adresse)', type: 'textarea', required: true },
      { key: 'lieu_paiement', label: 'Lieu de paiement (adresse des locaux du tireur)', type: 'text', required: true },
      { key: 'montant', label: 'Montant du principal (avec la devise)', type: 'text', required: true },
      { key: 'taux', label: 'Taux d’intérêt annuel (%)', type: 'text', required: true },
      { key: 'delai_retard', label: 'Délai de grâce après échéance (en jours)', type: 'text', required: true },
      { key: 'taux_retard', label: 'Taux d’intérêt de retard minimal (%)', type: 'text', required: true },
      { key: 'pays_monnaie', label: 'Pays dont la monnaie légale servira au paiement', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>BILLET À ORDRE PAYABLE À DEMANDE AVEC CLAUSE D'ACCÉLÉRATION</h1><p>Le présent billet à ordre est délivré et prend effet à partir du {{date_jour}}.</p><p><strong>ENTRE :</strong> {{tireur}}, ci-après « le Tireur », d'une part,</p><p><strong>ET :</strong> {{tire}}, ci-après « le Tiré », d'autre part.</p><h2>Conditions</h2><p>1. EN VERTU DE CE QUI SUIT, le soussigné Tiré s'engage à payer au Tireur, ou à son ordre, dans ses locaux sis {{lieu_paiement}}, le montant du principal s'élevant à <strong>{{montant}}</strong>, ainsi que les intérêts au taux prévu ci-dessous applicable au solde du principal du présent effet jusqu'à remboursement intégral.</p><p>2. Les intérêts seront cumulés au solde impayé du principal à compter de la date d'émission du présent effet, à un taux annuel de <strong>{{taux}} %</strong>. Seuls les intérêts seront payés par le Tiré au Tireur au plus tard le premier de chaque mois. Le principal sera dû et payable à demande.</p><p>3. Le Tiré effectuera tous lesdits remboursements au Tireur dans la monnaie légale de {{pays_monnaie}} et en fonds immédiatement disponibles.</p><h2>Clause d'accélération</h2><p>4. L'échéance du présent effet pourra être accélérée par le Tireur si le Tiré venait à violer ou à se trouver en non-conformité avec l'une quelconque des conditions ou conventions de tout autre accord conclu avec le Tireur ou ses associés. Si le défaut de paiement concerne un remboursement arrivé à échéance, la totalité du principal ainsi que les intérêts cumulés deviendront immédiatement dus et exigibles à la demande du porteur du présent effet.</p><p>5. Au cas où un remboursement ne serait pas effectué au plus tard {{delai_retard}} jours après son échéance, le Tiré s'engage à payer au porteur les intérêts sur ledit remboursement, à compter de la date d'échéance jusqu'à paiement effectif et intégral, à un taux annuel dont le niveau le plus bas sera de {{taux_retard}} % ou le taux le plus élevé prévu par la loi ; le temps constitue l'essence du présent effet.</p><h2>Renonciations et recouvrement</h2><p>6. Le Tiré renonce à toute convocation, exigence, notification de demande, contestation, notification de contestation ou de non-paiement relative à l'émission, l'acceptation, le respect ou la force exécutoire du présent effet ou de tout instrument représentant la garantie de son paiement.</p><p>7. L'incapacité du Tireur à exercer l'un quelconque de ses droits ne constituera pas une renonciation à de tels droits. En cas de procédure engagée pour assurer le paiement du présent effet, la partie défaillante supportera les frais de recouvrement ainsi que les honoraires d'avocat et frais de justice raisonnables.</p><p>8. Aucune disposition du présent effet ne sera considérée comme exigeant le paiement d'intérêts ou de charges excédant le taux toléré par la loi applicable ; tout excédent perçu sera déduit du solde du principal et tout surplus reversé au Tiré.</p><p class="signatures">EN VERTU DE CE QUI PRÉCÈDE, les parties ont signé et donné force au présent billet à ordre à la date écrite ci-dessus.<br/><br/>LE TIREUR — LE TIRÉ<br/>Signature autorisée — Signature autorisée<br/>Nom et fonction — Nom et fonction</p></div>`,
    popularity: 38,
    countriesJson: BILLET_COUNTRIES,
  },
  {
    code: 'fin_billet_ordre_tranches',
    name: 'Billet à ordre payable par tranches',
    category: 'commercial_financier',
    price: 1800, priceMax: 4000,
    description: 'Billet à ordre remboursable par tranches successives d’un montant égal, avec taux d’intérêt et exigibilité anticipée en cas de défaut.',
    fieldsJson: F([
      { key: 'preteur', label: 'Prêteur (nom / société + forme juridique + adresse)', type: 'textarea', required: true },
      { key: 'emprunteur', label: 'Emprunteur (nom / société + forme juridique + adresse)', type: 'textarea', required: true },
      { key: 'montant_total', label: 'Montant total du principal (avec la devise)', type: 'text', required: true },
      { key: 'taux', label: 'Taux d’intérêt annuel (%)', type: 'text', required: true },
      { key: 'nombre_tranches', label: 'Nombre de tranches', type: 'text', required: true },
      { key: 'montant_tranche', label: 'Montant de chaque tranche', type: 'text', required: true },
      { key: 'premier_paiement', label: 'Date du premier paiement', type: 'date', required: true },
      { key: 'date_solde', label: 'Date limite de paiement du solde intégral', type: 'date', required: true },
    ]),
    body: `<div class="contrat"><h1>BILLET À ORDRE PAYABLE PAR TRANCHES DE PAIEMENT</h1><p>Le présent billet à ordre est conclu et prend effet à partir du {{date_jour}}.</p><p><strong>ENTRE :</strong> {{preteur}}, ci-après « le Prêteur », d'une part,</p><p><strong>ET :</strong> {{emprunteur}}, ci-après « l'Emprunteur », d'autre part.</p><h2>Conditions</h2><p>EN VERTU DE CE QUI SUIT, l'Emprunteur soussigné s'engage à payer à l'ordre du Prêteur la somme de <strong>{{montant_total}}</strong> à un taux annuel de <strong>{{taux}} %</strong> sur le solde impayé.</p><h2>Modalités de paiement</h2><p>Le présent effet sera payé en <strong>{{nombre_tranches}}</strong> tranches successives d'un montant égal de <strong>{{montant_tranche}}</strong> chacune, le premier paiement devant être effectué le {{premier_paiement}}, puis à la même date de chaque période suivante ; la totalité du solde du principal ainsi que tous les intérêts cumulés devront être entièrement payés au plus tard le {{date_solde}}.</p><p>Le présent effet peut être payé sans pénalité aucune avant la date d'échéance. Les paiements seront d'abord imputés sur les intérêts, puis sur le principal.</p><h2>Défaut de paiement</h2><p>Le présent effet sera exigible en totalité à la demande du Prêteur au cas où l'Emprunteur serait en défaut de paiement au-delà du délai convenu à compter de la date d'échéance. Toutes les parties prenantes au présent effet renoncent à toute convocation, exigence ou contestation, et à toute notification y afférente. En cas de non-paiement, le soussigné s'engage à payer tous les frais exposés pour recouvrer la somme due. Les soussignés sont conjointement responsables du présent effet.</p><p class="signatures">EN VERTU DE CE QUI PRÉCÈDE, les parties ont signé et donné force exécutoire au présent billet à ordre payable par tranches.<br/><br/>LE PRÊTEUR — L'EMPRUNTEUR<br/>Signature autorisée — Signature autorisée<br/>Nom et fonction — Nom et fonction</p></div>`,
    popularity: 32,
    countriesJson: BILLET_COUNTRIES,
  },
  {
    code: 'fin_cession_creance',
    name: 'Contrat de cession de créance',
    category: 'commercial_financier',
    price: 2000, priceMax: 4000,
    description: 'Contrat par lequel un créancier (cédant) transfère à un cessionnaire la créance qu’il détient sur un débiteur, avec garanties et notification.',
    fieldsJson: F([
      { key: 'cedant', label: 'Cédant (nom / société, nationalité ou pays d’immatriculation, adresse)', type: 'textarea', required: true },
      { key: 'cessionnaire', label: 'Cessionnaire (nom / société, nationalité ou pays d’immatriculation, adresse)', type: 'textarea', required: true },
      { key: 'debiteur', label: 'Débiteur de la créance cédée (nom / société)', type: 'text', required: true },
      { key: 'montant_creance', label: 'Montant de la créance (avec la devise)', type: 'text', required: true },
      { key: 'nature_creance', label: 'Nature de la créance (ex. vente de marchandises du 12/01/2026)', type: 'textarea', required: true },
      { key: 'prix_cession', label: 'Prix de cession (avec la devise)', type: 'text', required: true },
      { key: 'ville', label: 'Ville de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE CESSION DE CRÉANCE</h1><p><strong>Entre :</strong> {{cedant}}, ci-après dénommé « le Cédant »,</p><p><strong>Et :</strong> {{cessionnaire}}, ci-après dénommé « le Cessionnaire ».</p><p>Il est convenu ce qui suit :</p><h2>Article 1 — Objet de la cession</h2><p>Le Cédant cède au Cessionnaire, qui accepte, la créance détenue sur <strong>{{debiteur}}</strong>, d'un montant de <strong>{{montant_creance}}</strong>, résultant de : {{nature_creance}}</p><h2>Article 2 — Prix de cession</h2><p>Le prix convenu pour la cession de la créance est de <strong>{{prix_cession}}</strong>.</p><h2>Article 3 — Paiement</h2><p>Le Cessionnaire s'engage à payer le prix de cession au Cédant selon les modalités convenues entre les parties.</p><h2>Article 4 — Garanties</h2><p>Le Cédant garantit au Cessionnaire que la créance cédée est libre de toute charge, nantissement ou tout autre droit au profit de tiers.</p><h2>Article 5 — Notification au débiteur</h2><p>Le Cédant s'engage à notifier au Débiteur la cession de la créance dès que celle-ci sera effectuée.</p><h2>Article 6 — Transfert de propriété</h2><p>Le Cédant transfère au Cessionnaire tous les droits, intérêts et avantages relatifs à la créance cédée.</p><h2>Article 7 — Loi applicable</h2><p>Le présent contrat est régi et interprété conformément aux lois en vigueur au lieu de sa signature.</p><p class="signatures">Fait en deux exemplaires originaux, à {{ville}}, le {{date_jour}}<br/><br/>Pour le Cédant — Pour le Cessionnaire<br/>(signatures précédées de la mention « Lu et approuvé »)</p></div>`,
    popularity: 42,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Cession de créance régie par l’Acte uniforme portant organisation des sûretés (AUS révisé, art. 80 s. pour la cession à titre de garantie) et le droit national des obligations.' },
      FR: { note: 'Articles 1321 à 1326 du Code civil — la cession est opposable au débiteur après notification ou prise d’acte.' },
    }),
  },
  {
    code: 'fin_nantissement',
    name: 'Contrat de nantissement',
    category: 'commercial_financier',
    price: 2500, priceMax: 4000,
    description: 'Contrat de nantissement de biens meubles remis en garantie d’obligations financières : description des biens, droits du créancier nanti, durée.',
    fieldsJson: F([
      { key: 'nantisseur', label: 'Nantisseur — débiteur constituant la garantie (société, n° d’enregistrement, siège, représentant)', type: 'textarea', required: true },
      { key: 'creancier_nanti', label: 'Créancier nanti — bénéficiaire de la garantie (société, n° d’enregistrement, siège, représentant)', type: 'textarea', required: true },
      { key: 'biens_nantis', label: 'Description détaillée des biens nantis (avec numéros d’identification le cas échéant)', type: 'textarea', required: true },
      { key: 'obligations_garanties', label: 'Obligations garanties (facultatif — ex. contrat de prêt du 15/03/2026)', type: 'textarea', required: false },
      { key: 'ville', label: 'Ville de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE NANTISSEMENT</h1><p><strong>Entre :</strong> {{nantisseur}}, dûment habilité à cet effet, ci-après dénommé « le Nantisseur », d'une part,</p><p><strong>Et :</strong> {{creancier_nanti}}, dûment habilité à cet effet, ci-après dénommé « le Créancier Nanti », d'autre part.</p><p>Il est convenu ce qui suit :</p><h2>Article 1 — Objet</h2><p>Le Nantisseur consent au Créancier Nanti un nantissement sur les biens meubles désignés comme suit :</p><p>{{biens_nantis}}</p><h2>Article 2 — Garantie</h2><p>Ce nantissement est constitué en garantie de toutes les sommes dues par le Nantisseur au Créancier Nanti en vertu de tout contrat, accord ou obligation en cours ou à venir entre les parties, y compris mais sans s'y limiter, les contrats de prêt, de crédit, de découvert et tout autre accord financier. {{obligations_garanties}}</p><h2>Article 3 — Droits du Créancier Nanti</h2><p>En cas de défaut de paiement par le Nantisseur ou de tout autre manquement aux obligations prévues dans les contrats ou accords mentionnés à l'article 2 ci-dessus, le Créancier Nanti aura le droit, dans les conditions prévues par la loi applicable, de faire réaliser les biens nantis pour recouvrer les sommes dues.</p><h2>Article 4 — Consentement du Nantisseur</h2><p>Le Nantisseur consent à ce que les biens nantis soient affectés en garantie des obligations susmentionnées, et il s'engage à prendre toutes les mesures nécessaires pour protéger les droits du Créancier Nanti sur les biens nantis.</p><h2>Article 5 — Responsabilités du Nantisseur</h2><p>Le Nantisseur s'engage à maintenir les biens nantis en bon état et à les assurer contre tout risque pendant la durée du nantissement.</p><h2>Article 6 — Durée du nantissement</h2><p>Le présent nantissement prendra effet à compter de la date de signature du présent contrat et restera en vigueur jusqu'à ce que toutes les obligations garanties aient été intégralement acquittées.</p><h2>Article 7 — Loi applicable</h2><p>Le présent contrat est régi et interprété conformément aux lois en vigueur dans l'espace juridique applicable au lieu de sa signature.</p><p class="signatures">Fait en deux exemplaires originaux, à {{ville}}, le {{date_jour}}<br/><br/>Pour le Nantisseur — Pour le Créancier Nanti<br/>(nom, qualité et signature des représentants)</p></div>`,
    popularity: 26,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Acte uniforme portant organisation des sûretés (AUS révisé du 15/12/2010), art. 125 s. — inscription au RCCM requise pour l’opposabilité.' },
      FR: { note: 'Articles 2355 s. du Code civil (nantissement de meubles incorporels) et 2333 s. (gage de meubles corporels).' },
    }),
  },

  // ════════════════════ JURIDIQUE & ADMINISTRATIF (5) ════════════════════
  {
    code: 'jur_attestation_propriete',
    name: 'Attestation de propriété de créations (employé)',
    category: 'juridique_admin',
    price: 2000, priceMax: 4000,
    description: 'Attestation par laquelle un employé garantit que la société détient tous les droits, titres et intérêts sur les créations qu’il a réalisées (droits d’auteur, brevets, secrets commerciaux).',
    fieldsJson: F([
      { key: 'employe', label: 'Employé (nom complet + adresse)', type: 'textarea', required: true },
      { key: 'societe', label: 'Société (raison sociale + forme juridique + siège social)', type: 'textarea', required: true },
      { key: 'creations_individuelles', label: 'Annexe A — Créations individuelles (description + période de création)', type: 'textarea', required: true },
      { key: 'creations_collectives', label: 'Annexe B — Créations collectives et co-auteurs (facultatif)', type: 'textarea', required: false },
      { key: 'oeuvres_anterieures', label: 'Annexe C — Œuvres antérieures de tiers intégrées (facultatif)', type: 'textarea', required: false },
      { key: 'pays', label: 'Pays dont la législation sur le droit d’auteur s’applique', type: 'text', required: true },
      { key: 'ville', label: 'Ville de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>ATTESTATION DE PROPRIÉTÉ</h1><p>La présente Attestation de Propriété (le « Contrat ») est signée et prend effet à compter de ce jour, {{date_jour}},</p><p><strong>ENTRE :</strong> {{employe}}, ci-après « l'Employé », d'une part,</p><p><strong>ET :</strong> {{societe}}, ci-après « la Société », d'autre part.</p><p>Le soussigné Employé s'engage et garantit par la présente, pour assurer la Société ainsi que toute autre partie devant s'y fier, que la Société possède tous les droits, titres et intérêts sur les créations pour lesquelles la Société revendique la propriété. L'Employé entend que les engagements et garanties contenus dans le présent contrat puissent être tenus pour vrais par toute partie désirant acquérir, donner en licence, distribuer ou obtenir tout autre intérêt sur les créations concernées.</p><h2>Engagements et garanties de l'Employé</h2><p>1. L'Employé a analysé chacun des engagements, garanties et reconnaissances contenus dans le présent contrat ainsi que les circonstances factuelles qu'ils impliquent.</p><p>2. L'Employé a pris ces engagements en pleine connaissance de l'intention de tierces parties d'en tenir compte dans la conclusion de partenariats avec la Société sur les Créations individuelles.</p><p>3. L'Employé est l'auteur des créations décrites à l'annexe « A » (les « Créations de l'Employé ») ; aucune autre partie n'est intervenue dans leur conception, développement, création ou planification ; elles ont été développées par l'Employé seul, à ses propres heures et à partir de ses propres matériaux, au cours de la période identifiée à l'annexe « A ».</p><p>4. L'Employé a été un auteur contribuant aux créations décrites à l'annexe « B » (les « Créations collectives ») ; seules les parties qui y sont citées ont contribué à leur conception et à leur réalisation ; les contributions de l'Employé ont été faites par lui seul, à ses propres heures et à partir de ses propres matériaux, au cours de la période identifiée à l'annexe « B ».</p><p>5. Dans le cadre du présent contrat, les Créations de l'Employé ainsi que ses contributions aux Créations collectives sont désignées ensemble les « Créations individuelles ».</p><p>6. L'Employé transfère tous les droits, titres et intérêts sur les Créations individuelles à la Société, laquelle obtient ainsi : (i) tous les droits d'auteur, dont les droits exclusifs conférés par la législation sur le droit d'auteur de {{pays}} ; (ii) tous les brevets, secrets commerciaux et autres droits de propriété de quelque nature que ce soit ; (iii) le droit de vendre, louer, concéder en licence, échanger, transmettre et transférer les Créations individuelles ; (iv) le droit de publier, distribuer, copier, utiliser publiquement et exposer les Créations individuelles, séparément ou avec d'autres œuvres ; (v) le droit de modifier, amender, améliorer et créer des œuvres dérivées fondées en tout ou partie sur les Créations individuelles ; (vi) le droit de prendre toutes dispositions nécessaires pour sécuriser et faire valoir les droits de la Société décrits ci-dessus.</p><p>7. Sauf pour l'intégration d'œuvres antérieures de tiers citées à l'annexe « C », les Créations individuelles ne violent les droits de propriété d'aucune autre partie, y compris brevets, marques, droits d'auteur, secrets commerciaux, droits à la vie privée ou droits moraux.</p><p>8. L'Employé a obtenu une licence légalement transférée d'utilisation des œuvres antérieures définies à l'annexe « C », sans paiement de redevances, à perpétuité et pour le monde entier, auprès de leurs propriétaires.</p><p>9. L'Employé n'a pas utilisé les Créations individuelles à des fins personnelles ni au bénéfice d'aucune partie autre que la Société.</p><p>10. Aucune plainte en cours ni menace de plainte n'existe qui pourrait avoir un effet direct ou indirect sur les Créations individuelles.</p><p>11. Les Créations individuelles n'ont pas été réalisées au cours d'une période d'emploi auprès d'un autre employeur et ne constituent pas un travail rémunéré pour une autre partie ; leur utilisation ne viole aucune convention de non-concurrence, de non-sollicitation ni aucune autre clause restrictive.</p><p>12. Les licences de tous les logiciels et outils utilisés par l'Employé pour réaliser les Créations individuelles lui ont été légalement accordées et ont été utilisées conformément à leurs contrats de licence.</p><h2>Annexes</h2><p><strong>Annexe A — Créations individuelles :</strong><br/>{{creations_individuelles}}</p><p><strong>Annexe B — Créations collectives :</strong><br/>{{creations_collectives}}</p><p><strong>Annexe C — Œuvres antérieures :</strong><br/>{{oeuvres_anterieures}}</p><p class="signatures">EN VERTU DE CE QUI PRÉCÈDE, l'Employé a signé la présente Attestation de Propriété en pleine connaissance de son contenu et de sa portée.<br/>Fait à {{ville}}, le {{date_jour}}<br/><br/>L'EMPLOYÉ — LA SOCIÉTÉ<br/>Signature — Signature autorisée<br/>Nom — Nom et fonction</p></div>`,
    popularity: 22,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Droit d’auteur et propriété industrielle régis par l’Accord de Bangui (OAPI) et les lois nationales sur le droit d’auteur.' },
      FR: { note: 'Code de la propriété intellectuelle — la cession des droits d’auteur doit être constatée par écrit (art. L.131-2 s.).' },
    }),
  },
  {
    code: 'jur_autorisation_negocier',
    name: 'Lettre d’autorisation de négocier',
    category: 'juridique_admin',
    price: 1000, priceMax: 2500,
    description: 'Lettre officielle autorisant un mandataire à négocier, discuter, signer des contrats et prendre des engagements au nom de votre société.',
    fieldsJson: F([
      { key: 'destinataire', label: 'Destinataire (nom + adresse complète)', type: 'textarea', required: true },
      { key: 'mandataire', label: 'Personne autorisée à négocier (nom + fonction)', type: 'text', required: true },
      { key: 'objet_negociation', label: 'Cadre de la négociation (projet, marché, dossier…)', type: 'textarea', required: true },
      { key: 'societe', label: 'Votre société (raison sociale)', type: 'text', required: true },
      { key: 'expediteur', label: 'Votre nom', type: 'text', required: true },
      { key: 'titre_expediteur', label: 'Votre titre / fonction', type: 'text', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p class="align-right">{{ville}}, le {{date_jour}}</p><p>{{destinataire}}</p><p>Courrier recommandé avec demande d'accusé de réception</p><p>Objet : <strong>Lettre d'autorisation de négocier</strong></p><p>Madame, Monsieur,</p><p>Nous vous autorisons par la présente à négocier, discuter et échanger de quelque autre manière avec <strong>{{mandataire}}</strong> dans le cadre de : {{objet_negociation}}</p><p>Nous autorisons également par la présente {{mandataire}} à agir en tout état de cause au nom de {{societe}}.</p><p>La présente autorisation ne peut être considérée comme limitant, de quelque manière que ce soit, la capacité de {{mandataire}} à agir en notre nom, à signer des contrats ou à prendre des engagements, aussi bien sur le plan financier que commercial.</p><p>De ce fait, par l'existence du présent acte, nous autorisons {{mandataire}} à accepter ou à rejeter des contrats, à signer des contrats obligeant {{societe}} et à agir de quelque manière qui soit nécessaire pour réaliser ce qui est prévu ou pourrait être nécessaire sur la base de cette lettre.</p><p>Recevez, Madame, Monsieur, nos salutations distinguées.</p><p class="signatures">{{expediteur}}<br/>{{titre_expediteur}}<br/>Pour {{societe}}</p></div>`,
    popularity: 30,
  },
  {
    code: 'jur_notification_action_justice',
    name: 'Lettre de notification d’action en justice',
    category: 'juridique_admin',
    price: 1000, priceMax: 2500,
    description: 'Lettre notifiant au débiteur, après échec du règlement à l’amiable, la décision d’engager une action en justice et la transmission du dossier à l’avocat.',
    fieldsJson: F([
      { key: 'destinataire', label: 'Destinataire (nom + adresse complète)', type: 'textarea', required: true },
      { key: 'date_promesse', label: 'Date à laquelle le remboursement avait été promis', type: 'date', required: true },
      { key: 'somme', label: 'Somme exigible (avec la devise)', type: 'text', required: true },
      { key: 'expediteur', label: 'Votre nom', type: 'text', required: true },
      { key: 'titre_expediteur', label: 'Votre titre / fonction', type: 'text', required: true },
      { key: 'societe', label: 'Votre société (raison sociale)', type: 'text', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p class="align-right">{{ville}}, le {{date_jour}}</p><p>{{destinataire}}</p><p>Courrier recommandé avec demande d'accusé de réception</p><p>Objet : <strong>Notification d'une action en justice</strong></p><p>Madame, Monsieur,</p><p>Tous nos efforts pour trouver un règlement à l'amiable dans cette affaire ont échoué. Nous avions préalablement écarté l'action en justice parce que vous nous aviez assurés de votre intention de nous rembourser la somme exigible de <strong>{{somme}}</strong> le {{date_promesse}}. Or, malgré vos vives assurances, vous ne nous avez pas remis la somme en question à la date prévue.</p><p>Nous vous informons donc que nous n'avons pas d'autre choix que de vous poursuivre en justice.</p><p>Nous transférons donc votre dossier à notre avocat. Tout en regrettant la nécessité d'une telle action, nous devons vous demander de prendre vos dispositions en conséquence.</p><p>Recevez, Madame, Monsieur, nos salutations distinguées.</p><p class="signatures">{{expediteur}}<br/>{{titre_expediteur}}<br/>Pour {{societe}}</p></div>`,
    popularity: 40,
  },
  {
    code: 'jur_licence_nom_marque',
    name: 'Demande de licence d’affichage de nom de marque',
    category: 'juridique_admin',
    price: 800, priceMax: 2000,
    description: 'Lettre sollicitant auprès d’une association ou d’un titulaire de marque une licence pour afficher son nom de marque au siège de votre société.',
    fieldsJson: F([
      { key: 'destinataire', label: 'Destinataire (nom + adresse complète)', type: 'textarea', required: true },
      { key: 'societe', label: 'Votre société (raison sociale)', type: 'text', required: true },
      { key: 'association', label: 'Association / titulaire de la marque', type: 'text', required: true },
      { key: 'nom_marque', label: 'Nom de marque à afficher', type: 'text', required: true },
      { key: 'adresse_siege', label: 'Adresse du siège où la marque sera affichée', type: 'text', required: true },
      { key: 'expediteur', label: 'Votre nom', type: 'text', required: true },
      { key: 'titre_expediteur', label: 'Votre titre / fonction', type: 'text', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p class="align-right">{{ville}}, le {{date_jour}}</p><p>{{destinataire}}</p><p>Objet : <strong>Demande de licence pour affichage de nom de marque</strong></p><p>Madame, Monsieur,</p><p>C'est avec une grande fierté que notre société <strong>{{societe}}</strong> sollicite par la présente une licence pour afficher le nom de marque de {{association}}, « <strong>{{nom_marque}}</strong> », à notre siège social situé à {{adresse_siege}}.</p><p>En tant que personne en charge de la présente demande, j'atteste qu'elle est en conformité avec la réglementation de {{association}}.</p><p>Je reconnais les règles de {{association}} régissant l'affichage desdits noms de marque et les méthodes de gestion des affaires, et m'engage à respecter lesdites règles à tout moment.</p><p>Je vous prie donc de bien vouloir m'envoyer par courrier, courrier électronique ou tout autre moyen le formulaire de demande ainsi que tout document utile à cet effet. Je vous ferai parvenir le règlement de tous les frais et/ou dépenses aussitôt après réception desdits documents.</p><p>Recevez, Madame, Monsieur, mes salutations distinguées.</p><p class="signatures">{{expediteur}}<br/>{{titre_expediteur}}<br/>Pour {{societe}}</p></div>`,
    popularity: 18,
  },
  {
    code: 'jur_autorisation_oeuvre_protegee',
    name: 'Demande d’autorisation d’utilisation d’œuvre protégée',
    category: 'juridique_admin',
    price: 800, priceMax: 2000,
    description: 'Lettre demandant à l’auteur d’une œuvre protégée l’autorisation de la reproduire ou de l’utiliser, avec bloc d’accord à contresigner.',
    fieldsJson: F([
      { key: 'destinataire', label: 'Auteur / titulaire des droits (nom + adresse complète)', type: 'textarea', required: true },
      { key: 'oeuvre', label: 'Œuvre protégée concernée (titre, article, extrait…)', type: 'text', required: true },
      { key: 'usage_prevu', label: 'Utilisation envisagée et limites (reproduction, diffusion…)', type: 'textarea', required: true },
      { key: 'domaine_activite', label: 'Votre domaine d’activité', type: 'text', required: true },
      { key: 'expediteur', label: 'Votre nom', type: 'text', required: true },
      { key: 'societe', label: 'Votre société / organisation', type: 'text', required: true },
      { key: 'ville', label: 'Ville', type: 'text', required: true },
    ]),
    body: `<div class="lettre"><p class="align-right">{{ville}}, le {{date_jour}}</p><p>{{destinataire}}</p><p>Objet : <strong>Demande d'autorisation pour l'utilisation d'une œuvre protégée</strong></p><p>Madame, Monsieur,</p><p>Nous vous contactons parce que vous êtes l'auteur de « <strong>{{oeuvre}}</strong> » et que nous souhaitons reproduire ou utiliser cette œuvre.</p><p>Nous évoluons dans le domaine de {{domaine_activite}}. Nous entendons limiter l'utilisation de l'œuvre à ce qui suit : {{usage_prevu}}. Nous ne l'utiliserons à aucune autre fin.</p><p>Nous demandons donc respectueusement votre appui en tant que propriétaire du droit d'auteur pour nous accorder le droit d'utiliser « {{oeuvre}} » sans frais. Si cela vous est acceptable, vous n'avez qu'à signer la présente lettre et nous en renvoyer une copie.</p><p>Nous vous remercions de votre aimable considération.</p><p>Recevez, Madame, Monsieur, nos salutations distinguées.</p><p class="signatures">{{expediteur}}<br/>Pour {{societe}}</p><h2>Accord du titulaire des droits</h2><p>L'autorisation est ici accordée conformément aux conditions de la présente lettre.</p><p class="signatures">Le propriétaire du droit d'auteur<br/>(nom, fonction, coordonnées et signature)</p></div>`,
    popularity: 28,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Droit d’auteur régi par l’Accord de Bangui (OAPI), Annexe VII, et les lois nationales sur le droit d’auteur.' },
      FR: { note: 'Art. L.122-4 du Code de la propriété intellectuelle — toute représentation ou reproduction sans consentement de l’auteur est illicite.' },
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

  console.log('✅ Seed Drive Finance & Juridique terminé.');
  console.log(`   Templates du script : ${templates.length} (créés : ${created}, mis à jour : ${updated})`);
  console.log('   Répartition par catégorie (ce script) :');
  for (const [cat, n] of Object.entries(byCategory)) console.log(`     - ${cat} : ${n}`);
  console.log(`   Variantes pays (countriesJson) : ${withCountries} templates`);
  console.log(`   ➜ Total de templates en base : ${total}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
