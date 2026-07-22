// Seed Drive2 Contrats — Agent Drive2-5/10 : 12 contrats utiles convertis depuis le
// MÉGA PACK JUR-006 « 160 Modèles de Contrats Utiles » du Drive IBIG.
// Script ADDITIF : upsert par code — n'écrase aucun template existant.
// Exécution : npx tsx prisma/seed-drive2-contrats.ts
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
  // ════════════════════ COMMERCIAL & FINANCIER (10) ════════════════════
  {
    code: 'ctr_licence_logiciel',
    name: 'Contrat de licence de logiciel',
    category: 'commercial_financier',
    price: 3000, priceMax: 5000,
    description: 'Contrat par lequel l’éditeur d’un logiciel concède à un licencié une licence d’utilisation non exclusive : portée, restrictions, propriété intellectuelle, support technique, garanties limitées.',
    fieldsJson: F([
      { key: 'proprietaire', label: 'Propriétaire du logiciel / éditeur (nom + siège social)', type: 'textarea', required: true },
      { key: 'licencie', label: 'Licencié (nom / société + siège social)', type: 'textarea', required: true },
      { key: 'logiciel', label: 'Logiciel concerné (nom et version)', type: 'text', required: true },
      { key: 'portee', label: 'Portée de la licence (nombre d’ordinateurs, serveurs, utilisateurs…)', type: 'text', required: true },
      { key: 'juridiction', label: 'Loi applicable (pays / juridiction)', type: 'text', required: true },
      { key: 'ville_tribunaux', label: 'Ville des tribunaux compétents', type: 'text', required: true },
      { key: 'date_acceptation', label: 'Date d’acceptation par le licencié', type: 'date', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE LICENCE DE LOGICIEL</h1><p>Ce contrat de licence de logiciel (le « Contrat ») est conclu entre {{proprietaire}}, ci-après dénommé le « Propriétaire du Logiciel », et {{licencie}}, ci-après dénommé le « Licencié ».</p><h2>1. Objet du contrat</h2><p>Le Propriétaire du Logiciel accorde au Licencié une licence non exclusive pour utiliser le logiciel <strong>{{logiciel}}</strong> (ci-après dénommé le « Logiciel ») dans les conditions définies ci-dessous.</p><h2>2. Droits de licence</h2><p>2.1 <strong>Portée de la Licence :</strong> La licence permet au Licencié d'installer et d'utiliser le Logiciel sur {{portee}}, conformément aux spécifications indiquées dans la documentation fournie avec le Logiciel.</p><p>2.2 <strong>Restrictions :</strong> Le Licencié s'engage à ne pas :</p><p>a) Copier, reproduire ou distribuer le Logiciel, sauf autorisation expresse du Propriétaire du Logiciel.</p><p>b) Modifier, adapter, traduire ou créer des œuvres dérivées basées sur le Logiciel.</p><p>c) Révoquer ou supprimer toute notification de droit d'auteur, de marque déposée ou de tout autre avis de propriété apposé sur le Logiciel.</p><h2>3. Propriété intellectuelle</h2><p>Le Logiciel et tous les droits de propriété intellectuelle qui y sont associés restent la propriété exclusive du Propriétaire du Logiciel. Ce Contrat ne confère au Licencié aucun droit de propriété sur le Logiciel, à l'exception des droits de licence spécifiquement accordés ici.</p><h2>4. Support technique</h2><p>Le Propriétaire du Logiciel fournira au Licencié un support technique pour le Logiciel pendant la durée de validité de cette licence, conformément aux modalités et aux conditions spécifiées dans un accord de support technique distinct.</p><h2>5. Durée du contrat</h2><p>Ce Contrat est valide à compter de la date d'acceptation par le Licencié et restera en vigueur jusqu'à résiliation. Le Licencié peut résilier ce Contrat à tout moment en détruisant toutes les copies du Logiciel en sa possession. Le Propriétaire du Logiciel peut résilier ce Contrat en cas de violation des termes et conditions par le Licencié.</p><h2>6. Garanties et responsabilité</h2><p>6.1 <strong>Garantie limitée :</strong> Le Logiciel est fourni « tel quel », sans aucune garantie expresse ou implicite de quelque nature que ce soit. Le Propriétaire du Logiciel ne garantit pas que le Logiciel répondra aux besoins du Licencié ou qu'il fonctionnera sans interruption ou sans erreur.</p><p>6.2 <strong>Limitation de responsabilité :</strong> En aucun cas, le Propriétaire du Logiciel ne pourra être tenu responsable des dommages directs, indirects, spéciaux, fortuits ou consécutifs résultant de l'utilisation ou de l'incapacité d'utiliser le Logiciel.</p><h2>7. Loi applicable et juridiction</h2><p>Ce Contrat est régi par les lois de {{juridiction}}. Tout litige découlant de ce Contrat sera soumis à la juridiction exclusive des tribunaux de {{ville_tribunaux}}.</p><p>En acceptant ce Contrat, le Licencié reconnaît avoir lu et compris ses termes et conditions, et accepte de les respecter.</p><p>Date d'acceptation par le Licencié : {{date_acceptation}}</p><p class="signatures">Fait le {{date_jour}}<br/><br/>LE LICENCIÉ — LE PROPRIÉTAIRE DU LOGICIEL<br/>Signature — Signature<br/>Nom et titre du signataire — Nom et titre du signataire</p></div>`,
    popularity: 45,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Le logiciel est protégé par le droit d’auteur en vertu de l’Accord de Bangui (OAPI), Annexe VII. La licence relève de la liberté contractuelle.' },
      FR: { note: 'Articles L.122-6 s. du Code de la propriété intellectuelle — droits d’exploitation du logiciel et limites de la licence d’utilisation.' },
    }),
  },
  {
    code: 'ctr_maintenance_informatique',
    name: 'Contrat de maintenance informatique',
    category: 'commercial_financier',
    price: 2500, priceMax: 4500,
    description: 'Contrat de maintenance informatique entre un prestataire et un client : maintenance préventive et corrective, mises à jour, support technique, renouvellement et conditions financières.',
    fieldsJson: F([
      { key: 'prestataire', label: 'Prestataire (société + adresse + téléphone)', type: 'textarea', required: true },
      { key: 'client', label: 'Client (nom / société + adresse + téléphone)', type: 'textarea', required: true },
      { key: 'duree', label: 'Durée initiale du contrat (en mois ou années)', type: 'text', required: true },
      { key: 'periode_renouvellement', label: 'Durée de chaque période de renouvellement', type: 'text', required: true },
      { key: 'preavis', label: 'Préavis de non-renouvellement (en jours)', type: 'text', required: true },
      { key: 'montant', label: 'Frais de maintenance (montant avec devise)', type: 'text', required: true },
      { key: 'periodicite', label: 'Périodicité des paiements (mensuelle, trimestrielle…)', type: 'text', required: true },
      { key: 'juridiction', label: 'Loi applicable et tribunaux compétents', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE MAINTENANCE INFORMATIQUE</h1><p><strong>ENTRE :</strong> {{prestataire}}, ci-après dénommée « le Prestataire »,</p><p><strong>ET :</strong> {{client}}, ci-après dénommé « le Client ».</p><h2>1. Objet du contrat</h2><p>Le présent contrat a pour objet de définir les termes et conditions de la prestation de services de maintenance informatique fournie par le Prestataire au Client.</p><h2>2. Services de maintenance</h2><p>2.1. Les services de maintenance comprennent, mais ne se limitent pas à, les éléments suivants :</p><p>a. <strong>Maintenance préventive :</strong> le Prestataire effectuera des vérifications régulières pour prévenir les pannes et les problèmes potentiels.</p><p>b. <strong>Maintenance corrective :</strong> le Prestataire interviendra pour résoudre les problèmes et les pannes signalés par le Client.</p><p>c. <strong>Mises à jour logicielles :</strong> le Prestataire s'assurera que les logiciels et les systèmes du Client sont mis à jour régulièrement.</p><p>d. <strong>Support technique :</strong> le Prestataire fournira une assistance téléphonique ou en ligne en cas de problèmes ou de questions.</p><p>2.2. Les services seront fournis pendant la durée du contrat, telle que spécifiée à l'article 3 ci-dessous.</p><h2>3. Durée du contrat</h2><p>Ce contrat entre en vigueur à partir de la date de signature et reste en vigueur pour une durée de <strong>{{duree}}</strong>. Il peut être renouvelé automatiquement pour des périodes successives de {{periode_renouvellement}}, sauf si l'une des parties notifie par écrit son intention de ne pas renouveler au moins {{preavis}} jours avant la date d'expiration.</p><h2>4. Conditions financières</h2><p>4.1. Le Client s'engage à payer au Prestataire des frais de maintenance de <strong>{{montant}}</strong> par {{periodicite}}.</p><p>4.2. Les paiements doivent être effectués à l'adresse du Prestataire spécifiée en tête du présent contrat.</p><h2>5. Responsabilités du Client</h2><p>Le Client s'engage à :</p><p>a. Fournir un accès adéquat aux systèmes informatiques et aux informations nécessaires pour effectuer la maintenance.</p><p>b. Signaler tout problème ou panne dès qu'il en a connaissance.</p><p>c. Respecter les recommandations du Prestataire en matière de sécurité informatique.</p><h2>6. Responsabilités du Prestataire</h2><p>Le Prestataire s'engage à :</p><p>a. Fournir les services de maintenance conformément aux termes de ce contrat.</p><p>b. Répondre aux problèmes et aux pannes dans un délai raisonnable.</p><p>c. Protéger la confidentialité des informations du Client.</p><h2>7. Résiliation</h2><p>En cas de violation grave par l'une des parties des termes de ce contrat, l'autre partie peut résilier le contrat immédiatement par écrit.</p><h2>8. Loi applicable et juridiction</h2><p>Ce contrat est régi par les lois de {{juridiction}}, et tout litige découlant de ce contrat sera soumis à la juridiction exclusive des tribunaux compétents de ce ressort.</p><h2>9. Acceptation du contrat</h2><p>Le Client et le Prestataire reconnaissent avoir lu et compris les termes de ce contrat et acceptent d'être liés par ceux-ci.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>LE CLIENT — LE PRESTATAIRE<br/>Signature — Signature<br/>Nom imprimé — Nom imprimé</p></div>`,
    popularity: 50,
  },
  {
    code: 'ctr_franchise',
    name: 'Contrat de franchise',
    category: 'commercial_financier',
    price: 3500, priceMax: 5000,
    description: 'Contrat de franchise accordant au franchisé le droit d’exploiter une entreprise sous le nom et la marque du franchiseur : normes, redevances, formation, assistance, non-concurrence et résiliation.',
    fieldsJson: F([
      { key: 'franchiseur', label: 'Franchiseur — société mère (raison sociale + siège social)', type: 'textarea', required: true },
      { key: 'franchise_partie', label: 'Franchisé (nom / société + siège social)', type: 'textarea', required: true },
      { key: 'enseigne', label: 'Nom / marque de l’enseigne franchisée', type: 'text', required: true },
      { key: 'duree', label: 'Durée du contrat (en années)', type: 'text', required: true },
      { key: 'juridiction', label: 'Loi applicable et tribunaux compétents', type: 'text', required: true },
      { key: 'ville', label: 'Ville de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE FRANCHISE</h1><p><strong>Entre :</strong> {{franchiseur}}, ci-après dénommée « la Franchiseuse »,</p><p><strong>Et :</strong> {{franchise_partie}}, ci-après dénommé « le Franchisé ».</p><h2>1. Objet du contrat</h2><p>La Franchiseuse accorde au Franchisé le droit d'exploiter une entreprise sous le nom et la marque « <strong>{{enseigne}}</strong> » de la Franchiseuse, conformément aux termes et conditions énoncés dans le présent contrat. Le Franchisé exploitera son entreprise conformément aux normes et aux procédures établies par la Franchiseuse.</p><h2>2. Droits et obligations du Franchisé</h2><p>2.1. Le Franchisé exploitera l'entreprise de manière professionnelle et efficace, conformément aux normes de qualité et aux procédures établies par la Franchiseuse.</p><p>2.2. Le Franchisé ne modifiera pas le nom de l'entreprise ni la marque de la Franchiseuse sans l'autorisation écrite préalable de la Franchiseuse.</p><p>2.3. Le Franchisé paiera à la Franchiseuse les redevances et les frais de franchise conformément aux termes du contrat.</p><p>2.4. Le Franchisé n'exploitera aucune autre entreprise concurrente pendant la durée du contrat.</p><h2>3. Droits et obligations de la Franchiseuse</h2><p>3.1. La Franchiseuse fournira au Franchisé une formation initiale pour l'exploitation de l'entreprise.</p><p>3.2. La Franchiseuse soutiendra le Franchisé en fournissant des directives opérationnelles, des fournitures, des normes de qualité et d'autres informations nécessaires à l'exploitation de l'entreprise.</p><p>3.3. La Franchiseuse peut inspecter l'entreprise du Franchisé pour s'assurer que les normes sont respectées.</p><h2>4. Durée du contrat</h2><p>Ce contrat de franchise débutera à la date de signature et se poursuivra pour une durée de <strong>{{duree}}</strong> ans, à moins que les parties n'en décident autrement.</p><h2>5. Résiliation</h2><p>5.1. Ce contrat peut être résilié par le Franchisé ou la Franchiseuse en cas de non-respect substantiel des termes du contrat par l'autre partie.</p><p>5.2. La Franchiseuse peut résilier ce contrat si le Franchisé ne maintient pas les normes de qualité ou ne respecte pas les procédures établies.</p><h2>6. Loi applicable et juridiction</h2><p>Ce contrat est régi par les lois de {{juridiction}}. Tout litige découlant de ce contrat sera soumis à la juridiction exclusive des tribunaux compétents de ce ressort.</p><p class="signatures">Ce contrat de franchise est convenu et signé à {{ville}}, le {{date_jour}}<br/><br/>LA FRANCHISEUSE — LE FRANCHISÉ<br/>Signature autorisée — Signature<br/>Nom et titre du représentant — Nom</p></div>`,
    popularity: 48,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Contrat innommé régi par la liberté contractuelle et l’AUDCG ; la marque franchisée doit être protégée auprès de l’OAPI (Accord de Bangui).' },
      FR: { note: 'Loi Doubin — art. L.330-3 du Code de commerce : remise d’un document d’information précontractuelle (DIP) au moins 20 jours avant la signature.' },
    }),
  },
  {
    code: 'ctr_sponsoring',
    name: 'Contrat de sponsoring',
    category: 'commercial_financier',
    price: 2000, priceMax: 4000,
    description: 'Contrat de sponsoring par lequel un sponsor apporte un soutien financier ou matériel à un bénéficiaire (club, événement, projet) en échange d’avantages promotionnels et de visibilité.',
    fieldsJson: F([
      { key: 'sponsor', label: 'Sponsor (société + statut juridique + pays d’enregistrement + siège social)', type: 'textarea', required: true },
      { key: 'beneficiaire', label: 'Bénéficiaire (société / organisation + statut juridique + pays + siège)', type: 'textarea', required: true },
      { key: 'nature_soutien', label: 'Nature du soutien (financier, matériel, ressources…)', type: 'textarea', required: true },
      { key: 'montant', label: 'Montant ou description du soutien versé', type: 'text', required: true },
      { key: 'date_debut', label: 'Date de début du contrat', type: 'date', required: true },
      { key: 'date_fin', label: 'Date de fin du contrat', type: 'date', required: true },
      { key: 'preavis', label: 'Préavis pour remédier à un manquement (en jours)', type: 'text', required: true },
      { key: 'juridiction', label: 'Loi applicable et tribunaux compétents', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE SPONSORING</h1><p><strong>Entre :</strong> {{sponsor}}, ci-après dénommé le « Sponsor »,</p><p><strong>Et :</strong> {{beneficiaire}}, ci-après dénommé le « Bénéficiaire ».</p><p>Collectivement désignés ci-après comme les « Parties ».</p><p>Date de début du contrat : {{date_debut}} — Date de fin du contrat : {{date_fin}}</p><h2>1. Objet du contrat</h2><p>1.1 Le Sponsor s'engage à fournir un soutien financier et/ou des ressources ({{nature_soutien}}) au Bénéficiaire en échange de divers avantages promotionnels et de visibilité, tels que spécifiés dans l'Annexe A jointe au présent contrat.</p><h2>2. Obligations du Sponsor</h2><p>2.1 Le Sponsor s'engage à verser <strong>{{montant}}</strong> au Bénéficiaire conformément aux modalités de paiement spécifiées dans l'Annexe A.</p><p>2.2 Le Sponsor a le droit de bénéficier des avantages promotionnels et de visibilité conformément aux termes convenus.</p><h2>3. Obligations du Bénéficiaire</h2><p>3.1 Le Bénéficiaire s'engage à fournir les avantages promotionnels et de visibilité convenus au Sponsor conformément aux modalités spécifiées dans l'Annexe A.</p><p>3.2 Le Bénéficiaire s'engage à utiliser le soutien financier et/ou les ressources du Sponsor de manière responsable et conforme à l'objet de ce contrat.</p><h2>4. Durée du contrat et résiliation</h2><p>4.1 Ce contrat entre en vigueur à partir de la date de début spécifiée et demeure en vigueur jusqu'à la date de fin spécifiée.</p><p>4.2 Les Parties peuvent résilier ce contrat par écrit en cas de manquement substantiel à ses termes par l'une ou l'autre des Parties, avec un préavis écrit de {{preavis}} jours pour remédier au manquement.</p><h2>5. Propriété intellectuelle</h2><p>5.1 Tous les droits de propriété intellectuelle relatifs aux avantages promotionnels créés dans le cadre de ce contrat appartiendront au Bénéficiaire, sauf accord contraire écrit entre les Parties.</p><h2>6. Loi applicable et juridiction</h2><p>6.1 Ce contrat est régi par les lois de {{juridiction}}. Tout litige découlant de ce contrat sera soumis à la juridiction exclusive des tribunaux compétents de ce ressort.</p><p class="signatures">En foi de quoi, les Parties ont signé ce contrat de sponsoring le {{date_jour}}<br/><br/>POUR LE SPONSOR — POUR LE BÉNÉFICIAIRE<br/>Nom et fonction — Nom et fonction<br/>Signature — Signature</p></div>`,
    popularity: 42,
  },
  {
    code: 'ctr_depot_vente',
    name: 'Contrat de dépôt-vente',
    category: 'commercial_financier',
    price: 1800, priceMax: 3500,
    description: 'Contrat de dépôt-vente : un déposant confie ses biens à un dépositaire qui les vend en son nom moyennant commission, avec obligations de stockage, registres et remise du produit de vente.',
    fieldsJson: F([
      { key: 'deposant', label: 'Déposant (entreprise ou particulier + adresse)', type: 'textarea', required: true },
      { key: 'depositaire', label: 'Dépositaire (entreprise ou particulier + adresse)', type: 'textarea', required: true },
      { key: 'biens', label: 'Description détaillée des biens déposés (numéros de série, caractéristiques…)', type: 'textarea', required: true },
      { key: 'commission', label: 'Frais et commission du dépositaire (montant ou %)', type: 'text', required: true },
      { key: 'delai_remise', label: 'Délai de remise du produit de la vente au déposant (en jours)', type: 'text', required: true },
      { key: 'preavis', label: 'Préavis de résiliation (en jours)', type: 'text', required: true },
      { key: 'juridiction', label: 'Loi applicable et tribunaux compétents', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE DÉPÔT-VENTE</h1><p><strong>ENTRE :</strong> {{deposant}}, ci-après dénommé le « Déposant »,</p><p><strong>ET :</strong> {{depositaire}}, ci-après dénommé le « Dépositaire ».</p><h2>Objet du contrat</h2><p>Le présent contrat a pour objet de régir le dépôt-vente des biens du Déposant par le Dépositaire, tel que décrit ci-dessous.</p><h2>Description des biens</h2><p>Le Déposant s'engage à déposer les biens suivants auprès du Dépositaire :</p><p>{{biens}}</p><h2>Durée du contrat</h2><p>Ce contrat de dépôt-vente commence à compter de la date de signature et reste en vigueur jusqu'à ce que les biens soient vendus ou jusqu'à ce que les parties conviennent par écrit de le résilier.</p><h2>Conditions de vente</h2><p>1. Le Dépositaire s'engage à vendre les biens au nom du Déposant à un prix convenu entre les parties.</p><p>2. Le produit de la vente, après déduction des frais convenus et des commissions du Dépositaire ({{commission}}), sera remis au Déposant dans un délai de {{delai_remise}} jours à compter de la vente.</p><h2>Obligations du Dépositaire</h2><p>1. Le Dépositaire s'engage à entretenir, stocker et promouvoir les biens dans des conditions optimales pour faciliter leur vente.</p><p>2. Le Dépositaire doit tenir des registres précis de toutes les ventes et des montants dus au Déposant.</p><h2>Résiliation</h2><p>Ce contrat de dépôt-vente peut être résilié par l'une ou l'autre des parties à tout moment en cas de non-respect substantiel des obligations prévues par ce contrat par l'autre partie, moyennant un préavis écrit de {{preavis}} jours.</p><h2>Loi applicable</h2><p>Ce contrat est régi par les lois de {{juridiction}} et tout litige découlant de ce contrat sera soumis à la compétence exclusive des tribunaux compétents de ce ressort.</p><p class="signatures">Le présent contrat est signé le {{date_jour}}<br/><br/>LE DÉPOSANT — LE DÉPOSITAIRE<br/>Nom et titre du représentant — Nom et titre du représentant<br/>Signature — Signature</p></div>`,
    popularity: 30,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Combinaison du dépôt et du mandat de vente régie par le droit national des obligations et l’AUDCG (commission, art. 192 s.).' },
      FR: { note: 'Articles 1915 s. (dépôt) et 1984 s. (mandat) du Code civil.' },
    }),
  },
  {
    code: 'ctr_gestion_evenement',
    name: 'Contrat de gestion d’événement',
    category: 'commercial_financier',
    price: 2000, priceMax: 4000,
    description: 'Contrat de prestation événementielle : planification, organisation et gestion complète d’un événement par un prestataire, avec budget, modalités de paiement et conditions d’annulation.',
    fieldsJson: F([
      { key: 'client', label: 'Client (entreprise ou particulier + adresse + téléphone + e-mail)', type: 'textarea', required: true },
      { key: 'prestataire', label: 'Prestataire de services événementiels (entreprise + adresse + téléphone + e-mail)', type: 'textarea', required: true },
      { key: 'evenement', label: 'Description de l’événement (nature, date, lieu, nombre d’invités…) — Annexe A', type: 'textarea', required: true },
      { key: 'budget', label: 'Budget total de l’événement (avec devise)', type: 'text', required: true },
      { key: 'modalites_paiement', label: 'Modalités de paiement (acompte, échéances…)', type: 'textarea', required: true },
      { key: 'preavis', label: 'Préavis pour remédier à un manquement (en jours)', type: 'text', required: true },
      { key: 'juridiction', label: 'Loi applicable et tribunaux compétents', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE GESTION D'ÉVÉNEMENT</h1><p><strong>Entre :</strong> {{client}}, ci-après dénommé le « Client »,</p><p><strong>Et :</strong> {{prestataire}}, ci-après dénommé le « Prestataire ».</p><p>Collectivement désignés ci-après comme les « Parties ».</p><h2>1. Objet du contrat</h2><p>1.1 Le Client engage le Prestataire pour la planification, l'organisation et la gestion de l'événement décrit en détail dans l'Annexe A du présent contrat (ci-après dénommé l'« Événement ») :</p><p>{{evenement}}</p><p>1.2 Le Prestataire accepte de fournir les services nécessaires pour la planification et l'exécution de l'Événement conformément aux modalités spécifiées dans le présent contrat.</p><h2>2. Responsabilités du Client</h2><p>2.1 Le Client fournira au Prestataire toutes les informations et les détails nécessaires relatifs à l'Événement.</p><p>2.2 Le Client sera responsable de l'obtention de toutes les autorisations, licences, permis et assurances nécessaires pour l'Événement.</p><h2>3. Responsabilités du Prestataire</h2><p>3.1 Le Prestataire planifiera, organisera et gérera l'Événement conformément aux spécifications convenues avec le Client.</p><p>3.2 Le Prestataire veillera à ce que l'Événement soit exécuté de manière professionnelle et conforme aux normes de qualité attendues.</p><h2>4. Budget et paiements</h2><p>4.1 Le budget total de l'Événement est fixé à <strong>{{budget}}</strong>.</p><p>4.2 Les paiements seront effectués selon les modalités suivantes : {{modalites_paiement}}</p><h2>5. Annulation et résiliation</h2><p>5.1 En cas d'annulation de l'Événement par le Client, les frais d'annulation et les modalités de remboursement sont détaillés dans l'Annexe A.</p><p>5.2 Les Parties peuvent résilier ce contrat par écrit en cas de manquement substantiel à ses termes par l'une ou l'autre des Parties, avec un préavis écrit de {{preavis}} jours pour remédier au manquement.</p><h2>6. Loi applicable et juridiction</h2><p>6.1 Ce contrat est régi par les lois de {{juridiction}}. Tout litige découlant de ce contrat sera soumis à la juridiction exclusive des tribunaux compétents de ce ressort.</p><p class="signatures">En foi de quoi, les Parties ont signé ce contrat de gestion d'événement le {{date_jour}}<br/><br/>POUR LE CLIENT — POUR LE PRESTATAIRE<br/>Nom — Nom<br/>Signature — Signature</p></div>`,
    popularity: 46,
  },
  {
    code: 'ctr_location_gerance',
    name: 'Contrat de location-gérance',
    category: 'commercial_financier',
    price: 3000, priceMax: 5000,
    description: 'Contrat de location-gérance : le bailleur confie l’exploitation commerciale de son bien au locataire-gérant moyennant un loyer, avec charges, entretien, licences et obligations réciproques.',
    fieldsJson: F([
      { key: 'bailleur', label: 'Bailleur (nom + adresse + téléphone)', type: 'textarea', required: true },
      { key: 'locataire_gerant', label: 'Locataire-gérant (nom + adresse + téléphone)', type: 'textarea', required: true },
      { key: 'bien', label: 'Bien loué (adresse + description : fonds, locaux, matériel…)', type: 'textarea', required: true },
      { key: 'date_debut', label: 'Date de début de la location-gérance', type: 'date', required: true },
      { key: 'date_fin', label: 'Date de fin de la location-gérance', type: 'date', required: true },
      { key: 'loyer', label: 'Loyer mensuel (montant avec devise)', type: 'text', required: true },
      { key: 'jour_paiement', label: 'Jour de paiement du loyer chaque mois', type: 'text', required: true },
      { key: 'preavis', label: 'Préavis de résiliation (en jours)', type: 'text', required: true },
      { key: 'juridiction', label: 'Loi applicable et tribunaux compétents', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE LOCATION-GÉRANCE</h1><p><strong>BAILLEUR :</strong> {{bailleur}}, ci-après dénommé « le Bailleur »,</p><p><strong>LOCATAIRE-GÉRANT :</strong> {{locataire_gerant}}, ci-après dénommé « le Locataire-Gérant ».</p><h2>Objet du contrat</h2><p>Le Bailleur loue au Locataire-Gérant, et ce dernier accepte de louer, aux termes et conditions énoncés dans le présent contrat, le bien décrit ci-dessous (le « Bien ») :</p><p>{{bien}}</p><h2>Durée du contrat</h2><p>La location-gérance débutera le {{date_debut}} et se terminera le {{date_fin}}.</p><h2>Conditions financières</h2><p>1. Le Locataire-Gérant versera au Bailleur un loyer mensuel de <strong>{{loyer}}</strong>, payable le {{jour_paiement}} de chaque mois.</p><p>2. Le Locataire-Gérant est également responsable du paiement des charges et frais d'exploitation liés au Bien, y compris les taxes foncières, les frais d'entretien et les services publics.</p><h2>Obligations du Locataire-Gérant</h2><p>Pendant la durée de la location-gérance, le Locataire-Gérant s'engage à :</p><p>1. Utiliser le Bien uniquement à des fins commerciales, conformément à toutes les lois et réglementations locales en vigueur.</p><p>2. Entretenir le Bien en bon état et effectuer toutes les réparations nécessaires à ses frais.</p><p>3. Respecter toutes les obligations légales liées à l'exploitation du Bien, y compris l'obtention de toutes les licences et permis requis.</p><h2>Obligations du Bailleur</h2><p>Pendant la durée de la location-gérance, le Bailleur s'engage à :</p><p>1. Assurer au Locataire-Gérant un accès paisible et continu au Bien.</p><p>2. Ne pas interférer dans l'exploitation commerciale du Locataire-Gérant, sauf en cas de violation substantielle du présent contrat.</p><h2>Résiliation</h2><p>En cas de violation substantielle des termes et conditions du présent contrat par l'une des parties, l'autre partie peut résilier ce contrat moyennant un préavis écrit de {{preavis}} jours.</p><h2>Loi applicable</h2><p>Le présent contrat est régi par les lois de {{juridiction}} et tout litige découlant de ce contrat sera soumis à la juridiction exclusive des tribunaux compétents de ce ressort.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>LE BAILLEUR — LE LOCATAIRE-GÉRANT<br/>Signature — Signature<br/>Date — Date</p></div>`,
    popularity: 33,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Location-gérance du fonds de commerce régie par les articles 138 à 146 de l’AUDCG révisé : publicité au RCCM et dans un journal d’annonces légales.' },
      FR: { note: 'Articles L.144-1 s. du Code de commerce — publicité obligatoire et solidarité temporaire du loueur pour les dettes d’exploitation.' },
    }),
  },
  {
    code: 'ctr_photographie',
    name: 'Contrat de prestation de services de photographie',
    category: 'commercial_financier',
    price: 1500, priceMax: 3000,
    description: 'Contrat entre un photographe et son client : description de la séance, honoraires et acompte, droits d’utilisation des photographies, délai de livraison, annulation et responsabilité.',
    fieldsJson: F([
      { key: 'photographe', label: 'Photographe (nom + adresse + téléphone + e-mail)', type: 'textarea', required: true },
      { key: 'client', label: 'Client (nom + adresse + téléphone + e-mail)', type: 'textarea', required: true },
      { key: 'services', label: 'Services de photographie convenus (type de séance, lieu, date, heure…)', type: 'textarea', required: true },
      { key: 'montant_total', label: 'Montant total des honoraires (avec devise)', type: 'text', required: true },
      { key: 'acompte', label: 'Montant de l’acompte et date d’échéance du paiement', type: 'text', required: true },
      { key: 'mode_paiement', label: 'Mode de paiement (virement, mobile money, chèque…)', type: 'text', required: true },
      { key: 'delai_livraison', label: 'Délai de livraison des photographies (ex. 4 semaines)', type: 'text', required: true },
      { key: 'conditions_annulation', label: 'Conditions d’annulation (ex. moins de 14 jours avant la date prévue)', type: 'text', required: true },
      { key: 'juridiction', label: 'Loi applicable et tribunaux compétents', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE PRESTATION DE SERVICES DE PHOTOGRAPHIE</h1><p><strong>Entre :</strong> {{photographe}}, ci-après « le Photographe »,</p><p><strong>Et :</strong> {{client}}, ci-après « le Client ».</p><h2>1. Description des services</h2><p>Le Photographe s'engage à fournir les services de photographie suivants (décrits en détail, y compris le lieu, la date et l'heure) :</p><p>{{services}}</p><h2>2. Honoraires et paiement</h2><p>Le Client s'engage à payer au Photographe les honoraires suivants :</p><p>— Montant total : <strong>{{montant_total}}</strong></p><p>— Acompte et échéance : {{acompte}}</p><p>Le paiement sera effectué par {{mode_paiement}} à l'ordre du Photographe.</p><h2>3. Droits d'utilisation des photographies</h2><p>Le Photographe détient les droits d'auteur sur toutes les photographies prises pendant la prestation de services. Cependant, le Client se voit accorder une licence non exclusive pour utiliser les photographies à des fins personnelles, non commerciales.</p><h2>4. Livraison des photographies</h2><p>Les photographies seront livrées au Client sous forme numérique dans un délai de {{delai_livraison}} à compter de la date de la prestation de services. Le Photographe fournira les photographies sous forme de fichiers numériques de haute qualité.</p><h2>5. Annulation</h2><p>En cas d'annulation de la prestation de services par le Client ({{conditions_annulation}}), l'acompte ne sera pas remboursé.</p><h2>6. Responsabilité</h2><p>Le Photographe ne peut être tenu responsable des circonstances indépendantes de sa volonté qui pourraient empêcher ou compromettre la réalisation de la prestation de services, y compris, mais sans s'y limiter, des conditions météorologiques défavorables.</p><h2>7. Résiliation</h2><p>Ce contrat peut être résilié par écrit par l'une ou l'autre des parties en cas de violation substantielle des termes et conditions par l'autre partie.</p><h2>8. Droit applicable</h2><p>Ce contrat est régi par les lois de {{juridiction}} et tout litige découlant de ce contrat sera soumis à la compétence exclusive des tribunaux compétents de ce ressort.</p><h2>9. Signature</h2><p>Les parties reconnaissent avoir lu, compris et accepté les termes de ce contrat.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>LE PHOTOGRAPHE — LE CLIENT<br/>Signature — Signature<br/>Date — Date</p></div>`,
    popularity: 55,
  },
  {
    code: 'ctr_coentreprise',
    name: 'Contrat de coentreprise (joint-venture)',
    category: 'commercial_financier',
    price: 3500, priceMax: 5000,
    description: 'Contrat de coentreprise entre deux parties : objet et nom de la joint-venture, apports respectifs, comité de direction, répartition des profits et pertes, durée et résiliation.',
    fieldsJson: F([
      { key: 'partie_a', label: 'Partie A (nom + adresse + téléphone + e-mail)', type: 'textarea', required: true },
      { key: 'partie_b', label: 'Partie B (nom + adresse + téléphone + e-mail)', type: 'textarea', required: true },
      { key: 'objectif', label: 'Objectif / mission de la coentreprise', type: 'textarea', required: true },
      { key: 'nom_coentreprise', label: 'Nom de la coentreprise', type: 'text', required: true },
      { key: 'apports_a', label: 'Apports de la Partie A (actifs, compétences, fonds…)', type: 'textarea', required: true },
      { key: 'apports_b', label: 'Apports de la Partie B (actifs, compétences, fonds…)', type: 'textarea', required: true },
      { key: 'repartition', label: 'Répartition des profits et pertes (ex. 50/50 ou au prorata des apports)', type: 'text', required: true },
      { key: 'duree', label: 'Durée de la coentreprise (ex. 5 ans)', type: 'text', required: true },
      { key: 'juridiction', label: 'Loi applicable (pays / juridiction)', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE COENTREPRISE</h1><p>Ce Contrat de Coentreprise (le « Contrat ») est conclu ce {{date_jour}} (la « Date d'Effet ») entre :</p><p><strong>PARTIE A :</strong> {{partie_a}}</p><p><strong>PARTIE B :</strong> {{partie_b}}</p><p>Ensemble dénommées les « Parties ».</p><h2>1. Objet de la coentreprise</h2><p>1.1 Les Parties conviennent de former une coentreprise (la « Coentreprise ») dans le but de : {{objectif}}</p><p>1.2 La Coentreprise sera exploitée sous le nom de « <strong>{{nom_coentreprise}}</strong> ».</p><h2>2. Apports des Parties</h2><p>2.1 La Partie A apportera à la Coentreprise : {{apports_a}}</p><p>2.2 La Partie B apportera à la Coentreprise : {{apports_b}}</p><h2>3. Structure de la coentreprise</h2><p>3.1 La Coentreprise sera gérée par un comité de direction composé de membres désignés d'un commun accord par les Parties.</p><p>3.2 Les décisions importantes de la Coentreprise nécessiteront un consensus entre les Parties.</p><h2>4. Répartition des profits et des pertes</h2><p>4.1 Les profits et les pertes de la Coentreprise seront répartis entre les Parties conformément à la clé de répartition suivante : {{repartition}}.</p><h2>5. Responsabilités et obligations des Parties</h2><p>5.1 Les Parties acceptent de collaborer de manière loyale et de mettre en œuvre leurs compétences et ressources pour la réussite de la Coentreprise.</p><p>5.2 Les Parties conviennent de respecter les obligations et responsabilités spécifiques définies d'un commun accord dans le cadre de la Coentreprise.</p><h2>6. Durée de la coentreprise</h2><p>La Coentreprise débutera à la Date d'Effet et se poursuivra pour une durée de {{duree}}. À la fin de cette période, les Parties pourront décider de renouveler ou de mettre fin à la Coentreprise.</p><h2>7. Résiliation</h2><p>Ce Contrat pourra être résilié par accord écrit des Parties ou en cas de violation substantielle des termes de ce Contrat par l'une des Parties.</p><h2>8. Loi applicable</h2><p>Ce Contrat sera régi par les lois de {{juridiction}}.</p><h2>9. Signature des Parties</h2><p class="signatures">PARTIE A — PARTIE B<br/>Nom et titre du représentant autorisé — Nom et titre du représentant autorisé<br/>Signature — Signature<br/>Date : {{date_jour}}</p></div>`,
    popularity: 28,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Peut prendre la forme d’une société en participation (art. 854 s. AUSCGIE) ou d’une société commune immatriculée.' },
      FR: { note: 'Contrat innommé — souvent adossé à une société en participation (art. 1871 s. du Code civil) ou à une société commune.' },
    }),
  },
  {
    code: 'ctr_cession_fonds_commerce',
    name: 'Contrat de cession de fonds de commerce',
    category: 'commercial_financier',
    price: 4000, priceMax: 5000,
    description: 'Contrat de cession d’un fonds de commerce : description des éléments cédés (actifs, contrats, clientèle), prix et modalités de paiement, garanties du cédant et formalités administratives.',
    fieldsJson: F([
      { key: 'cedant', label: 'Cédant (nom + adresse + numéro d’identification)', type: 'textarea', required: true },
      { key: 'cessionnaire', label: 'Cessionnaire (nom + adresse + numéro d’identification)', type: 'textarea', required: true },
      { key: 'adresse_fonds', label: 'Adresse du fonds de commerce cédé', type: 'text', required: true },
      { key: 'elements', label: 'Éléments compris dans la cession (équipements, mobilier, stocks, contrats, clientèle, dettes…)', type: 'textarea', required: true },
      { key: 'prix', label: 'Prix de cession (en chiffres et en lettres, avec devise)', type: 'text', required: true },
      { key: 'modalites_paiement', label: 'Modalités de paiement (échéances, conditions…)', type: 'textarea', required: true },
      { key: 'juridiction', label: 'Loi applicable (pays / juridiction)', type: 'text', required: true },
      { key: 'ville', label: 'Ville de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE CESSION DE FONDS DE COMMERCE</h1><p><strong>ENTRE :</strong> {{cedant}}, ci-après dénommé le « Cédant »,</p><p><strong>ET :</strong> {{cessionnaire}}, ci-après dénommé le « Cessionnaire ».</p><h2>Article 1 — Objet de la cession</h2><p>Le Cédant cède au Cessionnaire, qui accepte, le fonds de commerce situé à <strong>{{adresse_fonds}}</strong> (ci-après dénommé le « Fonds de Commerce »), comprenant tous les actifs, passifs, droits et obligations y afférents, conformément aux termes et conditions de ce contrat.</p><h2>Article 2 — Description du Fonds de Commerce</h2><p>Le Fonds de Commerce comprend notamment les éléments suivants :</p><p>{{elements}}</p><h2>Article 3 — Prix de cession</h2><p>Le prix de cession du Fonds de Commerce est fixé à <strong>{{prix}}</strong> (ci-après dénommé le « Prix de Cession »).</p><h2>Article 4 — Modalités de paiement</h2><p>Le Prix de Cession sera payé de la manière suivante : {{modalites_paiement}}</p><h2>Article 5 — Garanties du Cédant</h2><p>Le Cédant garantit au Cessionnaire que le Fonds de Commerce est exempt de tout passif, dette, litige ou charge non déclaré(e) ou non inclus(e) dans la présente cession.</p><h2>Article 6 — Assistance</h2><p>Le Cédant s'engage à fournir une assistance raisonnable au Cessionnaire pour faciliter la transition et la continuité des opérations du Fonds de Commerce.</p><h2>Article 7 — Engagements du Cessionnaire</h2><p>Le Cessionnaire s'engage à exploiter le Fonds de Commerce conformément aux lois et réglementations en vigueur et à respecter tous les contrats et engagements inclus dans la cession. Le Cessionnaire assume la responsabilité de toutes les obligations et dettes du Fonds de Commerce à compter de la date de cession.</p><h2>Article 8 — Formalités administratives</h2><p>Les parties s'engagent à collaborer pour accomplir toutes les formalités administratives nécessaires à la cession du Fonds de Commerce, y compris la notification aux autorités compétentes, le cas échéant.</p><h2>Article 9 — Loi applicable</h2><p>Ce contrat est régi par les lois de {{juridiction}}.</p><h2>Article 10 — Intégralité de l'accord</h2><p>Ce contrat constitue l'intégralité de l'accord entre les parties et remplace tous les accords précédents ou simultanés, écrits ou verbaux, concernant l'objet de ce contrat.</p><p class="signatures">EN FOI DE QUOI, les parties ont signé ce contrat à {{ville}}, le {{date_jour}}<br/><br/>POUR LE CÉDANT — POUR LE CESSIONNAIRE<br/>Signature — Signature<br/>Nom du représentant légal — Nom du représentant légal</p></div>`,
    popularity: 38,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Cession du fonds de commerce régie par les articles 147 à 168 de l’AUDCG révisé : écrit obligatoire, mentions, publicité au RCCM et dans un journal d’annonces légales, opposition des créanciers.' },
      FR: { note: 'Articles L.141-1 s. du Code de commerce — mentions obligatoires, enregistrement et publicité de la cession, séquestre du prix.' },
    }),
  },

  // ════════════════════ JURIDIQUE & ADMINISTRATIF (2) ════════════════════
  {
    code: 'ctr_pret_materiel',
    name: 'Contrat de prêt de matériel ou d’équipement (comodat)',
    category: 'juridique_admin',
    price: 1500, priceMax: 3000,
    description: 'Contrat de prêt à usage (comodat) de matériel ou d’équipement : description du matériel, durée, obligations de l’emprunteur, gratuité ou frais, dépôt de garantie et restitution.',
    fieldsJson: F([
      { key: 'preteur', label: 'Prêteur (entreprise ou particulier + adresse)', type: 'textarea', required: true },
      { key: 'emprunteur', label: 'Emprunteur (entreprise ou particulier + adresse)', type: 'textarea', required: true },
      { key: 'materiel', label: 'Description détaillée du matériel ou de l’équipement (numéros de série, caractéristiques techniques…)', type: 'textarea', required: true },
      { key: 'date_retour', label: 'Date de retour convenue', type: 'date', required: true },
      { key: 'frais', label: 'Frais (indiquer « prêt gratuit » ou le montant des frais)', type: 'text', required: true },
      { key: 'depot_garantie', label: 'Dépôt de garantie exigé (facultatif — montant)', type: 'text', required: false },
      { key: 'preavis', label: 'Préavis de résiliation (en jours)', type: 'text', required: true },
      { key: 'juridiction', label: 'Loi applicable et tribunaux compétents', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE PRÊT DE MATÉRIEL OU D'ÉQUIPEMENT</h1><p><strong>ENTRE :</strong> {{preteur}}, ci-après dénommé le « Prêteur »,</p><p><strong>ET :</strong> {{emprunteur}}, ci-après dénommé l'« Emprunteur ».</p><h2>Objet du contrat</h2><p>Le présent contrat a pour objet de régir le prêt de matériel ou d'équipement par le Prêteur à l'Emprunteur, tel que décrit ci-dessous.</p><h2>Description du matériel ou de l'équipement</h2><p>Le Prêteur s'engage à prêter à l'Emprunteur le matériel ou l'équipement suivant :</p><p>{{materiel}}</p><h2>Durée du prêt</h2><p>Ce prêt débutera à compter de la date de signature du contrat et se terminera à la date de retour convenue, soit le {{date_retour}}, sauf prolongation convenue par écrit entre les parties.</p><h2>Obligations de l'Emprunteur</h2><p>1. L'Emprunteur s'engage à utiliser le matériel ou l'équipement conformément aux spécifications du fabricant et aux bonnes pratiques industrielles.</p><p>2. L'Emprunteur assume la responsabilité de tout dommage ou perte du matériel ou de l'équipement pendant la durée du prêt, sauf en cas de force majeure.</p><p>3. L'Emprunteur s'engage à retourner le matériel ou l'équipement en bon état de fonctionnement à la date de fin du prêt.</p><h2>Frais et dépôt de garantie</h2><p>Frais du prêt : {{frais}}. Le Prêteur peut exiger un dépôt de garantie ({{depot_garantie}}), remboursable à la fin du prêt sous réserve que le matériel ou l'équipement soit retourné en bon état.</p><h2>Résiliation</h2><p>Ce contrat de prêt peut être résilié par l'une ou l'autre des parties à tout moment en cas de non-respect substantiel des obligations prévues par ce contrat par l'autre partie, moyennant un préavis écrit de {{preavis}} jours.</p><h2>Loi applicable</h2><p>Ce contrat est régi par les lois de {{juridiction}} et tout litige découlant de ce contrat sera soumis à la compétence exclusive des tribunaux compétents de ce ressort.</p><p class="signatures">Le présent contrat est signé le {{date_jour}}<br/><br/>LE PRÊTEUR — L'EMPRUNTEUR<br/>Nom et titre du représentant — Nom et titre du représentant<br/>Signature — Signature</p></div>`,
    popularity: 35,
    countriesJson: JSON.stringify({
      OHADA: { note: 'Prêt à usage (comodat) régi par le droit national des obligations civiles applicable dans chaque État membre.' },
      FR: { note: 'Articles 1875 à 1891 du Code civil — le prêt à usage est essentiellement gratuit et l’emprunteur répond de la conservation de la chose.' },
    }),
  },
  {
    code: 'ctr_formation_professionnelle',
    name: 'Contrat de formation professionnelle',
    category: 'juridique_admin',
    price: 1800, priceMax: 3500,
    description: 'Contrat de formation professionnelle entre un employeur et un stagiaire : durée et description de la formation, rémunération, obligations réciproques et certificat de fin de formation.',
    fieldsJson: F([
      { key: 'employeur', label: 'Employeur (nom de l’entreprise + adresse + numéro d’identification)', type: 'textarea', required: true },
      { key: 'stagiaire', label: 'Stagiaire (nom et prénom + adresse + n° de sécurité sociale le cas échéant)', type: 'textarea', required: true },
      { key: 'date_debut', label: 'Date de début de la formation', type: 'date', required: true },
      { key: 'date_fin', label: 'Date de fin de la formation', type: 'date', required: true },
      { key: 'duree', label: 'Durée totale de la formation (en mois ou années)', type: 'text', required: true },
      { key: 'description_formation', label: 'Description détaillée de la formation (compétences et connaissances à acquérir)', type: 'textarea', required: true },
      { key: 'remuneration', label: 'Rémunération mensuelle du stagiaire (montant avec devise)', type: 'text', required: true },
      { key: 'lieu', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE FORMATION PROFESSIONNELLE</h1><p><strong>Entre :</strong></p><p><strong>L'employeur :</strong> {{employeur}}</p><p><strong>Le stagiaire :</strong> {{stagiaire}}</p><h2>Objet du contrat</h2><p>Le présent contrat de formation professionnelle a pour objet de définir les termes et conditions de la formation professionnelle du stagiaire au sein de l'entreprise.</p><h2>Durée de la formation</h2><p>La formation professionnelle débutera le {{date_debut}} et se terminera le {{date_fin}}. La formation aura une durée totale de <strong>{{duree}}</strong>.</p><h2>Description de la formation</h2><p>La formation professionnelle consistera en : {{description_formation}}</p><h2>Rémunération</h2><p>Pendant la durée de la formation, le stagiaire percevra une rémunération mensuelle de <strong>{{remuneration}}</strong>.</p><h2>Obligations du stagiaire</h2><p>Le stagiaire s'engage à :</p><p>1. Suivre assidûment la formation.</p><p>2. Respecter les règles et les politiques de l'entreprise.</p><p>3. Travailler de manière diligente et assurer les tâches qui lui seront assignées dans le cadre de la formation.</p><p>4. Garder confidentielles toutes les informations sensibles de l'entreprise auxquelles il aura accès pendant la formation.</p><h2>Obligations de l'employeur</h2><p>L'employeur s'engage à :</p><p>1. Fournir au stagiaire les ressources nécessaires pour suivre la formation.</p><p>2. Encadrer et superviser le stagiaire pendant la formation.</p><p>3. Payer la rémunération convenue au stagiaire.</p><h2>Fin de la formation</h2><p>À la fin de la formation, l'employeur délivrera au stagiaire un certificat de formation professionnelle attestant des compétences acquises pendant la formation.</p><h2>Résiliation</h2><p>Ce contrat de formation professionnelle peut être résilié par l'une ou l'autre des parties en cas de non-respect des obligations définies dans ce contrat ou pour d'autres raisons légalement valables.</p><h2>Loi applicable</h2><p>Ce contrat de formation professionnelle est régi par les lois en vigueur au lieu de sa signature.</p><p class="signatures">En foi de quoi, les parties ont signé le présent contrat de formation professionnelle en deux exemplaires, à {{lieu}}, le {{date_jour}}<br/><br/>LE STAGIAIRE — L'EMPLOYEUR<br/>Signature — Signature et cachet de l'entreprise</p></div>`,
    popularity: 40,
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

  console.log('✅ Seed Drive2 Contrats (JUR-006) terminé.');
  console.log(`   Templates du script : ${templates.length} (créés : ${created}, mis à jour : ${updated})`);
  console.log('   Répartition par catégorie (ce script) :');
  for (const [cat, n] of Object.entries(byCategory)) console.log(`     - ${cat} : ${n}`);
  console.log(`   Variantes pays (countriesJson) : ${withCountries} templates`);
  console.log(`   ➜ Total de templates en base : ${total}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
