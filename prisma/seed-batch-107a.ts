import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ─── PHOTOGRAPHIE PROFESSIONNELLE (25 templates) ───
  {
    code: 'photo_reportage_evenement',
    name: "Accord de service de reportage photo événement",
    category: 'commercial_financier',
    price: 3000,
    priceMax: 9000,
    description: "Contrat de prestation de reportage photographique pour événements (mariage, baptême, cérémonie) en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 85,
    fieldsJson: F([
      {key:'nom_client',label:"Nom du client",type:'text',required:true},
      {key:'type_evenement',label:"Type d'événement",type:'text',required:true},
      {key:'date_evenement',label:"Date de l'événement",type:'date',required:true},
      {key:'lieu_evenement',label:"Lieu de l'événement",type:'text',required:true},
      {key:'montant_prestation',label:"Montant de la prestation (FCFA)",type:'text',required:true},
      {key:'conditions_particulieres',label:"Conditions particulières",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE REPORTAGE PHOTOGRAPHIQUE</h1><h2>ÉVÉNEMENT : {{type_evenement}}</h2><p>Entre le photographe professionnel soussigné et <strong>{{nom_client}}</strong>, ci-après dénommé le Client.</p><h3>Article 1 – Objet</h3><p>Le photographe s'engage à réaliser un reportage photo complet de l'événement de type {{type_evenement}} prévu le {{date_evenement}} à {{lieu_evenement}}.</p><h3>Article 2 – Prestations incluses</h3><p>La prestation comprend la prise de vue pendant toute la durée de l'événement, la sélection et le retouche basique des clichés, ainsi que la livraison des photos en haute résolution.</p><h3>Article 3 – Rémunération</h3><p>La prestation est fixée à <strong>{{montant_prestation}} FCFA</strong>, payable 50% à la signature et 50% à la livraison des photos.</p><h3>Article 4 – Droits d'auteur et droit à l'image</h3><p>Le photographe conserve les droits d'auteur sur ses œuvres. Le client bénéficie d'une licence d'utilisation personnelle et non commerciale des photographies livrées.</p><h3>Article 5 – Conditions particulières</h3><p>{{conditions_particulieres}}</p><h3>Article 6 – Droit applicable</h3><p>Le présent accord est régi par le droit ivoirien et les dispositions de l'OHADA en matière de contrats de prestation de services.</p><p class="signature-block">Fait à Abidjan, le {{date_evenement}}</p><p>Signature du photographe : _______________</p><p>Signature du client : _______________</p></div>`
  },
  {
    code: 'photo_shooting_mode_pub',
    name: "Accord de service de shooting mode et publicité",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 15000,
    description: "Contrat de prestation photographique pour shooting mode, publicité et campagnes marketing en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 78,
    fieldsJson: F([
      {key:'nom_client',label:"Nom de l'annonceur / client",type:'text',required:true},
      {key:'objet_shooting',label:"Objet du shooting (marque, produit)",type:'text',required:true},
      {key:'date_shooting',label:"Date du shooting",type:'date',required:true},
      {key:'duree_utilisation',label:"Durée d'utilisation des images (mois)",type:'text',required:true},
      {key:'montant_prestation',label:"Montant total (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SHOOTING MODE ET PUBLICITÉ</h1><p>Entre le studio photographique soussigné et <strong>{{nom_client}}</strong>, ci-après le Client.</p><h3>Article 1 – Objet</h3><p>Le présent accord porte sur la réalisation d'un shooting photographique dédié à {{objet_shooting}}, prévu le {{date_shooting}}.</p><h3>Article 2 – Droits d'utilisation</h3><p>Le client est autorisé à utiliser les images produites à des fins publicitaires et commerciales pour une durée de {{duree_utilisation}} mois à compter de la livraison.</p><h3>Article 3 – Rémunération</h3><p>Le montant global de la prestation est de <strong>{{montant_prestation}} FCFA</strong>.</p><h3>Article 4 – Exclusivité</h3><p>Le photographe s'engage à ne pas céder les mêmes visuels à un concurrent du client pendant la durée d'utilisation définie.</p><h3>Article 5 – Droit applicable</h3><p>Accord soumis au droit ivoirien et aux règles de l'OHADA.</p><p class="signature-block">Signatures des parties : _______________</p></div>`
  },
  {
    code: 'photo_produits_catalogue',
    name: "Accord de service de photographie de produits (catalogue)",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 12000,
    description: "Contrat de photographie de produits pour catalogues commerciaux et e-commerce en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 72,
    fieldsJson: F([
      {key:'nom_client',label:"Nom du client",type:'text',required:true},
      {key:'nombre_produits',label:"Nombre de produits à photographier",type:'text',required:true},
      {key:'date_prestation',label:"Date de la prestation",type:'date',required:true},
      {key:'format_livraison',label:"Format de livraison (JPEG, PNG, etc.)",type:'text',required:true},
      {key:'montant_prestation',label:"Montant (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PHOTOGRAPHIE DE PRODUITS</h1><p>Entre le photographe professionnel soussigné et <strong>{{nom_client}}</strong>.</p><h3>Article 1 – Objet</h3><p>Le photographe s'engage à réaliser la photographie de {{nombre_produits}} produits destinés à un catalogue commercial ou à une boutique en ligne.</p><h3>Article 2 – Date et livraison</h3><p>La séance est prévue le {{date_prestation}}. Les fichiers seront livrés au format {{format_livraison}} dans un délai de 7 jours ouvrés.</p><h3>Article 3 – Rémunération</h3><p>Le montant de la prestation est de <strong>{{montant_prestation}} FCFA</strong>.</p><h3>Article 4 – Propriété des images</h3><p>Le client acquiert l'ensemble des droits d'exploitation commerciale des images livrées.</p><h3>Article 5 – Droit applicable</h3><p>Accord soumis au droit ivoirien.</p><p class="signature-block">Signatures : _______________</p></div>`
  },
  {
    code: 'photo_architecturale',
    name: "Accord de service de photographie architecturale",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 16000,
    description: "Contrat de prestation photographique pour bâtiments, intérieurs et projets architecturaux en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 65,
    fieldsJson: F([
      {key:'nom_client',label:"Nom du client / cabinet d'architecture",type:'text',required:true},
      {key:'adresse_bien',label:"Adresse du bien à photographier",type:'text',required:true},
      {key:'date_prestation',label:"Date de la prestation",type:'date',required:true},
      {key:'usage_prevu',label:"Usage prévu des photos (portfolio, publication)",type:'text',required:true},
      {key:'montant_prestation',label:"Montant (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PHOTOGRAPHIE ARCHITECTURALE</h1><p>Entre le photographe soussigné et <strong>{{nom_client}}</strong>.</p><h3>Article 1 – Objet</h3><p>Réalisation d'un reportage photographique du bâtiment ou projet architectural situé à {{adresse_bien}}, prévu le {{date_prestation}}.</p><h3>Article 2 – Usage des images</h3><p>Les photographies seront utilisées pour : {{usage_prevu}}.</p><h3>Article 3 – Rémunération</h3><p>Montant de la prestation : <strong>{{montant_prestation}} FCFA</strong>.</p><h3>Article 4 – Droits</h3><p>Le client bénéficie d'une licence d'utilisation pour l'usage défini à l'article 2.</p><h3>Article 5 – Droit applicable</h3><p>Droit ivoirien et dispositions OHADA.</p><p class="signature-block">Signatures : _______________</p></div>`
  },
  {
    code: 'photo_industrielle',
    name: "Accord de service de photographie industrielle",
    category: 'commercial_financier',
    price: 6000,
    priceMax: 18000,
    description: "Contrat de photographie pour sites industriels, usines et équipements en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 58,
    fieldsJson: F([
      {key:'nom_client',label:"Nom de l'entreprise cliente",type:'text',required:true},
      {key:'site_industriel',label:"Nom / adresse du site industriel",type:'text',required:true},
      {key:'date_prestation',label:"Date de la prestation",type:'date',required:true},
      {key:'conditions_acces',label:"Conditions d'accès et de sécurité",type:'textarea',required:true},
      {key:'montant_prestation',label:"Montant (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PHOTOGRAPHIE INDUSTRIELLE</h1><p>Entre le photographe professionnel soussigné et <strong>{{nom_client}}</strong>.</p><h3>Article 1 – Objet</h3><p>Réalisation d'un reportage photographique du site industriel {{site_industriel}} le {{date_prestation}}.</p><h3>Article 2 – Conditions d'accès</h3><p>{{conditions_acces}}</p><h3>Article 3 – Confidentialité</h3><p>Le photographe s'engage à traiter avec discrétion toute information sensible relative aux procédés industriels du client.</p><h3>Article 4 – Rémunération</h3><p>Montant : <strong>{{montant_prestation}} FCFA</strong>.</p><h3>Article 5 – Droit applicable</h3><p>Droit ivoirien et OHADA.</p><p class="signature-block">Signatures : _______________</p></div>`
  },
  {
    code: 'photo_aerienne_drone',
    name: "Accord de service de photographie aérienne (drone photo)",
    category: 'commercial_financier',
    price: 7000,
    priceMax: 20000,
    description: "Contrat de prestation de photographie aérienne par drone en Côte d'Ivoire, conformément à la réglementation de l'ANAC-CI.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 70,
    fieldsJson: F([
      {key:'nom_client',label:"Nom du client",type:'text',required:true},
      {key:'zone_vol',label:"Zone de vol / localisation",type:'text',required:true},
      {key:'date_prestation',label:"Date de la prestation",type:'date',required:true},
      {key:'autorisation_anac',label:"Numéro d'autorisation ANAC-CI",type:'text',required:true},
      {key:'montant_prestation',label:"Montant (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PHOTOGRAPHIE AÉRIENNE PAR DRONE</h1><p>Entre l'opérateur de drone soussigné et <strong>{{nom_client}}</strong>.</p><h3>Article 1 – Objet</h3><p>Réalisation de prises de vue aériennes par drone sur la zone {{zone_vol}} le {{date_prestation}}.</p><h3>Article 2 – Conformité réglementaire</h3><p>La mission sera conduite conformément à la réglementation de l'Autorité Nationale de l'Aviation Civile de Côte d'Ivoire (ANAC-CI), autorisation n° {{autorisation_anac}}.</p><h3>Article 3 – Responsabilité</h3><p>L'opérateur est assuré pour les risques liés aux vols de drones. Toute zone restreinte sera exclue du plan de vol.</p><h3>Article 4 – Rémunération</h3><p>Montant : <strong>{{montant_prestation}} FCFA</strong>.</p><h3>Article 5 – Droit applicable</h3><p>Droit ivoirien et OHADA.</p><p class="signature-block">Signatures : _______________</p></div>`
  },
  {
    code: 'photo_studio',
    name: "Accord de service de studio de photographie",
    category: 'commercial_financier',
    price: 2000,
    priceMax: 8000,
    description: "Contrat de location et prestation en studio photographique en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 75,
    fieldsJson: F([
      {key:'nom_client',label:"Nom du client",type:'text',required:true},
      {key:'date_session',label:"Date de la session studio",type:'date',required:true},
      {key:'duree_session',label:"Durée de la session (heures)",type:'text',required:true},
      {key:'type_prise_vue',label:"Type de prise de vue (portrait, produit, mode)",type:'text',required:true},
      {key:'montant_prestation',label:"Montant (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE STUDIO DE PHOTOGRAPHIE</h1><p>Entre le studio photographique soussigné et <strong>{{nom_client}}</strong>.</p><h3>Article 1 – Objet</h3><p>Mise à disposition du studio et prestation photographique de type {{type_prise_vue}} le {{date_session}} pour une durée de {{duree_session}} heure(s).</p><h3>Article 2 – Prestations incluses</h3><p>La prestation comprend l'accès au studio, l'éclairage professionnel, les fonds disponibles et l'accompagnement du photographe.</p><h3>Article 3 – Rémunération</h3><p>Montant : <strong>{{montant_prestation}} FCFA</strong>, payable à la réservation.</p><h3>Article 4 – Annulation</h3><p>Toute annulation moins de 48h avant la session entraîne la facturation de 50% du montant.</p><h3>Article 5 – Droit applicable</h3><p>Droit ivoirien.</p><p class="signature-block">Signatures : _______________</p></div>`
  },
  {
    code: 'photo_portrait_identite',
    name: "Accord de service de portrait et identité",
    category: 'commercial_financier',
    price: 2000,
    priceMax: 6000,
    description: "Contrat de prestation photographique pour portraits professionnels et photos d'identité en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 80,
    fieldsJson: F([
      {key:'nom_client',label:"Nom du client",type:'text',required:true},
      {key:'date_session',label:"Date de la session",type:'date',required:true},
      {key:'usage_portrait',label:"Usage des portraits (CV, entreprise, identité)",type:'text',required:true},
      {key:'nombre_poses',label:"Nombre de poses / retouches incluses",type:'text',required:true},
      {key:'montant_prestation',label:"Montant (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PORTRAIT ET PHOTOGRAPHIE D'IDENTITÉ</h1><p>Entre le photographe soussigné et <strong>{{nom_client}}</strong>.</p><h3>Article 1 – Objet</h3><p>Réalisation de portraits photographiques à usage {{usage_portrait}} le {{date_session}}, incluant {{nombre_poses}} pose(s) et retouche(s).</p><h3>Article 2 – Droit à l'image</h3><p>Le client autorise le photographe à conserver une copie des portraits à titre d'archive uniquement, sans diffusion publique.</p><h3>Article 3 – Rémunération</h3><p>Montant : <strong>{{montant_prestation}} FCFA</strong>.</p><h3>Article 4 – Droit applicable</h3><p>Droit ivoirien.</p><p class="signature-block">Signatures : _______________</p></div>`
  },
  {
    code: 'photo_presse_journalisme',
    name: "Accord de service de photographie de presse (journalisme)",
    category: 'commercial_financier',
    price: 3000,
    priceMax: 9000,
    description: "Contrat de mission photographique pour la presse et le journalisme en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 60,
    fieldsJson: F([
      {key:'nom_media',label:"Nom du média / organe de presse",type:'text',required:true},
      {key:'sujet_reportage',label:"Sujet du reportage",type:'text',required:true},
      {key:'date_mission',label:"Date de la mission",type:'date',required:true},
      {key:'conditions_publication',label:"Conditions de publication et crédit photo",type:'textarea',required:true},
      {key:'montant_cession',label:"Montant de cession des droits (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PHOTOGRAPHIE DE PRESSE</h1><p>Entre le photojournaliste soussigné et <strong>{{nom_media}}</strong>.</p><h3>Article 1 – Objet</h3><p>Mission photographique portant sur le sujet suivant : {{sujet_reportage}}, réalisée le {{date_mission}}.</p><h3>Article 2 – Droits de publication</h3><p>{{conditions_publication}}</p><h3>Article 3 – Crédit photo</h3><p>Toute publication des photographies doit mentionner le nom du photographe et la source.</p><h3>Article 4 – Rémunération</h3><p>Montant de la cession : <strong>{{montant_cession}} FCFA</strong>.</p><h3>Article 5 – Droit applicable</h3><p>Droit ivoirien, loi sur la presse et l'audiovisuel de Côte d'Ivoire.</p><p class="signature-block">Signatures : _______________</p></div>`
  },
  {
    code: 'photo_sportive',
    name: "Accord de service de photographie sportive",
    category: 'commercial_financier',
    price: 3000,
    priceMax: 9000,
    description: "Contrat de prestation photographique pour événements et compétitions sportives en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 62,
    fieldsJson: F([
      {key:'nom_client',label:"Nom du client / organisateur",type:'text',required:true},
      {key:'evenement_sportif',label:"Nom de l'événement sportif",type:'text',required:true},
      {key:'date_evenement',label:"Date de l'événement",type:'date',required:true},
      {key:'lieu_evenement',label:"Lieu de l'événement",type:'text',required:true},
      {key:'montant_prestation',label:"Montant (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PHOTOGRAPHIE SPORTIVE</h1><p>Entre le photographe soussigné et <strong>{{nom_client}}</strong>.</p><h3>Article 1 – Objet</h3><p>Couverture photographique de l'événement sportif {{evenement_sportif}} prévu le {{date_evenement}} à {{lieu_evenement}}.</p><h3>Article 2 – Accès et accréditation</h3><p>Le client s'engage à fournir les accréditations nécessaires pour l'accès aux zones de prise de vue.</p><h3>Article 3 – Utilisation des images</h3><p>Les images sont cédées pour un usage interne et promotionnel de l'événement uniquement.</p><h3>Article 4 – Rémunération</h3><p>Montant : <strong>{{montant_prestation}} FCFA</strong>.</p><h3>Article 5 – Droit applicable</h3><p>Droit ivoirien.</p><p class="signature-block">Signatures : _______________</p></div>`
  },
  {
    code: 'photo_nature_faune',
    name: "Accord de service de photographie de nature et faune sauvage",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 15000,
    description: "Contrat de mission photographique naturaliste pour la documentation de la biodiversité en Afrique de l'Ouest.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 55,
    fieldsJson: F([
      {key:'nom_client',label:"Nom du client / commanditaire",type:'text',required:true},
      {key:'zone_mission',label:"Zone géographique de la mission",type:'text',required:true},
      {key:'date_debut',label:"Date de début de mission",type:'date',required:true},
      {key:'duree_mission',label:"Durée de la mission (jours)",type:'text',required:true},
      {key:'usage_images',label:"Usage prévu des images",type:'textarea',required:true},
      {key:'montant_prestation',label:"Montant total (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PHOTOGRAPHIE DE NATURE ET FAUNE SAUVAGE</h1><p>Entre le photographe naturaliste soussigné et <strong>{{nom_client}}</strong>.</p><h3>Article 1 – Objet</h3><p>Mission photographique de documentation de la faune et de la flore dans la zone {{zone_mission}}, débutant le {{date_debut}} pour une durée de {{duree_mission}} jour(s).</p><h3>Article 2 – Usage des images</h3><p>{{usage_images}}</p><h3>Article 3 – Respect de l'environnement</h3><p>Le photographe s'engage à respecter la réglementation en matière de protection de la faune et des espaces naturels protégés de Côte d'Ivoire.</p><h3>Article 4 – Rémunération</h3><p>Montant : <strong>{{montant_prestation}} FCFA</strong>.</p><h3>Article 5 – Droit applicable</h3><p>Droit ivoirien, législation sur la biodiversité.</p><p class="signature-block">Signatures : _______________</p></div>`
  },
  {
    code: 'photo_retouche_posttraitement',
    name: "Accord de service de retouche et post-traitement photo",
    category: 'commercial_financier',
    price: 2000,
    priceMax: 7000,
    description: "Contrat de prestation de retouche photographique et post-traitement numérique en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 68,
    fieldsJson: F([
      {key:'nom_client',label:"Nom du client",type:'text',required:true},
      {key:'nombre_images',label:"Nombre d'images à retoucher",type:'text',required:true},
      {key:'type_retouche',label:"Type de retouche (basique, avancée, composite)",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison souhaitée",type:'date',required:true},
      {key:'montant_prestation',label:"Montant (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RETOUCHE ET POST-TRAITEMENT PHOTOGRAPHIQUE</h1><p>Entre le retoucheur professionnel soussigné et <strong>{{nom_client}}</strong>.</p><h3>Article 1 – Objet</h3><p>Réalisation de la retouche et du post-traitement de {{nombre_images}} image(s) de type {{type_retouche}}, avec livraison prévue le {{date_livraison}}.</p><h3>Article 2 – Format de livraison</h3><p>Les fichiers retouchés seront livrés en haute résolution au format JPEG et/ou TIFF selon les besoins du client.</p><h3>Article 3 – Révisions</h3><p>Deux cycles de révisions sont inclus dans la prestation. Toute révision supplémentaire fera l'objet d'une facturation additionnelle.</p><h3>Article 4 – Rémunération</h3><p>Montant : <strong>{{montant_prestation}} FCFA</strong>.</p><h3>Article 5 – Droit applicable</h3><p>Droit ivoirien.</p><p class="signature-block">Signatures : _______________</p></div>`
  },
  {
    code: 'photo_cession_droits_exclusif',
    name: "Accord de cession de droits photographiques (exclusivité)",
    category: 'commercial_financier',
    price: 8000,
    priceMax: 25000,
    description: "Contrat de cession exclusive de droits photographiques conformément au droit ivoirien de la propriété intellectuelle.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 63,
    fieldsJson: F([
      {key:'nom_cedant',label:"Nom du photographe cédant",type:'text',required:true},
      {key:'nom_cessionnaire',label:"Nom du cessionnaire",type:'text',required:true},
      {key:'description_oeuvres',label:"Description des œuvres photographiques cédées",type:'textarea',required:true},
      {key:'territoire',label:"Territoire de cession",type:'text',required:true},
      {key:'duree_cession',label:"Durée de la cession (années)",type:'text',required:true},
      {key:'montant_cession',label:"Montant de la cession (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CESSION EXCLUSIVE DE DROITS PHOTOGRAPHIQUES</h1><p>Entre <strong>{{nom_cedant}}</strong>, photographe auteur, ci-après le Cédant, et <strong>{{nom_cessionnaire}}</strong>, ci-après le Cessionnaire.</p><h3>Article 1 – Objet de la cession</h3><p>Le Cédant cède à titre exclusif au Cessionnaire les droits patrimoniaux sur les œuvres photographiques suivantes : {{description_oeuvres}}.</p><h3>Article 2 – Étendue et territoire</h3><p>La cession est exclusive et couvre le territoire suivant : {{territoire}}, pour une durée de {{duree_cession}} an(s).</p><h3>Article 3 – Droits moraux</h3><p>Le Cédant conserve ses droits moraux. Le Cessionnaire s'engage à mentionner le nom du photographe sur toute exploitation des œuvres.</p><h3>Article 4 – Rémunération</h3><p>Montant de la cession : <strong>{{montant_cession}} FCFA</strong>.</p><h3>Article 5 – Droit applicable</h3><p>Loi ivoirienne sur la propriété intellectuelle et les droits d'auteur, dispositions OHADA.</p><p class="signature-block">Signatures des parties : _______________</p></div>`
  },
  {
    code: 'photo_licence_non_exclusive',
    name: "Accord de licence de photo (usage non-exclusif)",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 12000,
    description: "Contrat de licence non-exclusive d'utilisation de photographies en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 60,
    fieldsJson: F([
      {key:'nom_photographe',label:"Nom du photographe",type:'text',required:true},
      {key:'nom_licencie',label:"Nom du licencié",type:'text',required:true},
      {key:'description_photos',label:"Description des photographies",type:'textarea',required:true},
      {key:'usage_autorise',label:"Usage autorisé (web, print, réseaux sociaux)",type:'text',required:true},
      {key:'montant_licence',label:"Montant de la licence (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE LICENCE D'UTILISATION DE PHOTOGRAPHIES (NON-EXCLUSIF)</h1><p>Entre <strong>{{nom_photographe}}</strong>, titulaire des droits, et <strong>{{nom_licencie}}</strong>, licencié.</p><h3>Article 1 – Objet</h3><p>Le photographe accorde une licence non-exclusive d'utilisation des photographies suivantes : {{description_photos}}.</p><h3>Article 2 – Usage autorisé</h3><p>Les photographies ne peuvent être utilisées qu'aux fins suivantes : {{usage_autorise}}.</p><h3>Article 3 – Interdictions</h3><p>Toute revente, sous-licence ou modification substantielle des photographies est strictement interdite sans accord écrit préalable du photographe.</p><h3>Article 4 – Rémunération</h3><p>Montant de la licence : <strong>{{montant_licence}} FCFA</strong>.</p><h3>Article 5 – Droit applicable</h3><p>Droit ivoirien de la propriété intellectuelle.</p><p class="signature-block">Signatures : _______________</p></div>`
  },
  {
    code: 'photo_archivage_banque_images',
    name: "Accord de service d'archivage et banque d'images",
    category: 'commercial_financier',
    price: 3000,
    priceMax: 10000,
    description: "Contrat de service de constitution, gestion et archivage de banque d'images photographiques pour entreprises en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 52,
    fieldsJson: F([
      {key:'nom_client',label:"Nom de l'entreprise cliente",type:'text',required:true},
      {key:'volume_images',label:"Volume estimé d'images (nombre)",type:'text',required:true},
      {key:'duree_archivage',label:"Durée d'archivage (années)",type:'text',required:true},
      {key:'format_acces',label:"Format d'accès (cloud, disque dur, plateforme)",type:'text',required:true},
      {key:'montant_annuel',label:"Montant annuel (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ARCHIVAGE ET BANQUE D'IMAGES</h1><p>Entre le prestataire d'archivage soussigné et <strong>{{nom_client}}</strong>.</p><h3>Article 1 – Objet</h3><p>Constitution et gestion d'une banque d'images photographiques de {{volume_images}} images pour une durée de {{duree_archivage}} an(s).</p><h3>Article 2 – Modalités d'accès</h3><p>Les images seront accessibles via : {{format_acces}}.</p><h3>Article 3 – Sécurité et confidentialité</h3><p>Le prestataire s'engage à sécuriser les données conformément aux normes en vigueur et à la législation ivoirienne sur la protection des données.</p><h3>Article 4 – Rémunération</h3><p>Montant annuel : <strong>{{montant_annuel}} FCFA</strong>.</p><h3>Article 5 – Droit applicable</h3><p>Droit ivoirien.</p><p class="signature-block">Signatures : _______________</p></div>`
  },
  {
    code: 'photo_formation_photographie',
    name: "Accord de service de formation photographie",
    category: 'commercial_financier',
    price: 3000,
    priceMax: 9000,
    description: "Contrat de formation professionnelle en photographie en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 65,
    fieldsJson: F([
      {key:'nom_stagiaire',label:"Nom du stagiaire / de l'entreprise",type:'text',required:true},
      {key:'programme_formation',label:"Programme de formation",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'duree_formation',label:"Durée de la formation (jours/heures)",type:'text',required:true},
      {key:'montant_formation',label:"Montant de la formation (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FORMATION EN PHOTOGRAPHIE</h1><p>Entre l'organisme de formation soussigné et <strong>{{nom_stagiaire}}</strong>.</p><h3>Article 1 – Programme</h3><p>Formation en photographie selon le programme suivant : {{programme_formation}}, débutant le {{date_debut}} pour une durée de {{duree_formation}}.</p><h3>Article 2 – Attestation</h3><p>À l'issue de la formation, une attestation de participation sera délivrée au stagiaire.</p><h3>Article 3 – Rémunération</h3><p>Montant : <strong>{{montant_formation}} FCFA</strong>, payable avant le début de la formation.</p><h3>Article 4 – Droit applicable</h3><p>Droit ivoirien de la formation professionnelle.</p><p class="signature-block">Signatures : _______________</p></div>`
  },
  {
    code: 'photo_exposition',
    name: "Accord de service d'exposition photographique",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 12000,
    description: "Contrat d'organisation et de participation à une exposition photographique en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 58,
    fieldsJson: F([
      {key:'nom_photographe',label:"Nom du photographe exposant",type:'text',required:true},
      {key:'nom_organisateur',label:"Nom de l'organisateur / lieu d'exposition",type:'text',required:true},
      {key:'titre_exposition',label:"Titre de l'exposition",type:'text',required:true},
      {key:'date_debut',label:"Date d'ouverture",type:'date',required:true},
      {key:'conditions_vente',label:"Conditions de vente des œuvres exposées",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'EXPOSITION PHOTOGRAPHIQUE</h1><h2>{{titre_exposition}}</h2><p>Entre <strong>{{nom_photographe}}</strong>, artiste exposant, et <strong>{{nom_organisateur}}</strong>, organisateur.</p><h3>Article 1 – Objet</h3><p>Organisation et présentation d'une exposition photographique intitulée {{titre_exposition}}, dont l'ouverture est prévue le {{date_debut}}.</p><h3>Article 2 – Mise à disposition des œuvres</h3><p>Le photographe confie ses œuvres à l'organisateur pour la durée de l'exposition. L'organisateur en assure la garde et la mise en valeur.</p><h3>Article 3 – Vente des œuvres</h3><p>{{conditions_vente}}</p><h3>Article 4 – Responsabilité</h3><p>L'organisateur est responsable de la bonne conservation des œuvres pendant toute la durée de l'exposition.</p><h3>Article 5 – Droit applicable</h3><p>Droit ivoirien, législation sur les arts et la culture.</p><p class="signature-block">Signatures : _______________</p></div>`
  },
  {
    code: 'photo_film_institutionnel_corp',
    name: "Accord de service de film institutionnel (corporate)",
    category: 'commercial_financier',
    price: 8000,
    priceMax: 24000,
    description: "Contrat de réalisation de film institutionnel et corporate pour entreprises en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 70,
    fieldsJson: F([
      {key:'nom_entreprise',label:"Nom de l'entreprise cliente",type:'text',required:true},
      {key:'objet_film',label:"Objet et message du film institutionnel",type:'textarea',required:true},
      {key:'date_tournage',label:"Date de tournage prévue",type:'date',required:true},
      {key:'duree_film',label:"Durée souhaitée du film (minutes)",type:'text',required:true},
      {key:'montant_prestation',label:"Montant total (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FILM INSTITUTIONNEL</h1><p>Entre le prestataire audiovisuel soussigné et <strong>{{nom_entreprise}}</strong>.</p><h3>Article 1 – Objet</h3><p>Réalisation d'un film institutionnel d'une durée de {{duree_film}} minute(s). Contenu et message : {{objet_film}}. Tournage prévu le {{date_tournage}}.</p><h3>Article 2 – Prestations</h3><p>La prestation inclut le scénario, le tournage, le montage, l'étalonnage et la livraison du film en formats HD.</p><h3>Article 3 – Droits</h3><p>Le client acquiert l'ensemble des droits d'exploitation du film livré pour un usage interne et promotionnel illimité.</p><h3>Article 4 – Rémunération</h3><p>Montant : <strong>{{montant_prestation}} FCFA</strong>.</p><h3>Article 5 – Droit applicable</h3><p>Droit ivoirien et OHADA.</p><p class="signature-block">Signatures : _______________</p></div>`
  },
  {
    code: 'photo_vente_tirages_galerie',
    name: "Accord de service de vente de tirages photo (galerie)",
    category: 'commercial_financier',
    price: 3000,
    priceMax: 10000,
    description: "Contrat de mandat de vente de tirages photographiques en galerie d'art en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 55,
    fieldsJson: F([
      {key:'nom_photographe',label:"Nom du photographe",type:'text',required:true},
      {key:'nom_galerie',label:"Nom de la galerie",type:'text',required:true},
      {key:'description_tirages',label:"Description des tirages confiés",type:'textarea',required:true},
      {key:'commission_galerie',label:"Commission de la galerie (%)",type:'text',required:true},
      {key:'prix_vente',label:"Prix de vente au public (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE MANDAT DE VENTE DE TIRAGES PHOTOGRAPHIQUES</h1><p>Entre <strong>{{nom_photographe}}</strong>, artiste mandant, et <strong>{{nom_galerie}}</strong>, mandataire.</p><h3>Article 1 – Objet</h3><p>Le photographe confie à la galerie les tirages suivants en vue de leur vente : {{description_tirages}}.</p><h3>Article 2 – Prix et commission</h3><p>Les tirages sont mis en vente au prix public de <strong>{{prix_vente}} FCFA</strong>. La galerie perçoit une commission de {{commission_galerie}}% sur chaque vente.</p><h3>Article 3 – Compte rendu</h3><p>La galerie fournit un état des ventes mensuel au photographe.</p><h3>Article 4 – Restitution</h3><p>Les tirages invendus sont restitués au photographe à sa demande ou à la fin de l'exposition.</p><h3>Article 5 – Droit applicable</h3><p>Droit ivoirien.</p><p class="signature-block">Signatures : _______________</p></div>`
  },
  {
    code: 'photo_photojournalisme_agence',
    name: "Accord de service de photojournalisme (agence presse)",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 12000,
    description: "Contrat de collaboration entre un photojournaliste et une agence de presse en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 57,
    fieldsJson: F([
      {key:'nom_photojournaliste',label:"Nom du photojournaliste",type:'text',required:true},
      {key:'nom_agence',label:"Nom de l'agence de presse",type:'text',required:true},
      {key:'date_debut',label:"Date de début de collaboration",type:'date',required:true},
      {key:'territoires_couverture',label:"Territoires et sujets de couverture",type:'textarea',required:true},
      {key:'tarif_photo',label:"Tarif par photo publiée (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE COLLABORATION PHOTOJOURNALISTE – AGENCE DE PRESSE</h1><p>Entre <strong>{{nom_photojournaliste}}</strong> et l'agence <strong>{{nom_agence}}</strong>, à compter du {{date_debut}}.</p><h3>Article 1 – Objet</h3><p>Collaboration en matière de fourniture de reportages photographiques couvrant : {{territoires_couverture}}.</p><h3>Article 2 – Rémunération</h3><p>Le photojournaliste perçoit <strong>{{tarif_photo}} FCFA</strong> par photo publiée par l'agence ou ses clients.</p><h3>Article 3 – Crédit et droits moraux</h3><p>Toute publication d'une photo doit mentionner le nom du photojournaliste et le crédit de l'agence.</p><h3>Article 4 – Exclusivité</h3><p>Aucune exclusivité n'est imposée, sauf accord écrit spécifique.</p><h3>Article 5 – Droit applicable</h3><p>Droit ivoirien, code de la presse.</p><p class="signature-block">Signatures : _______________</p></div>`
  },
  {
    code: 'photo_partenariat_photographe_agence_pub',
    name: "Accord de partenariat photographe-agence pub",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 15000,
    description: "Contrat de partenariat entre un photographe indépendant et une agence de publicité en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 63,
    fieldsJson: F([
      {key:'nom_photographe',label:"Nom du photographe",type:'text',required:true},
      {key:'nom_agence',label:"Nom de l'agence de publicité",type:'text',required:true},
      {key:'date_debut',label:"Date de début du partenariat",type:'date',required:true},
      {key:'conditions_partenariat',label:"Conditions et modalités du partenariat",type:'textarea',required:true},
      {key:'remuneration_base',label:"Rémunération de base mensuelle (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT PHOTOGRAPHE – AGENCE DE PUBLICITÉ</h1><p>Entre <strong>{{nom_photographe}}</strong> et <strong>{{nom_agence}}</strong>, à compter du {{date_debut}}.</p><h3>Article 1 – Objet du partenariat</h3><p>Les parties s'associent pour la réalisation de projets photographiques dans le cadre des campagnes publicitaires de l'agence.</p><h3>Article 2 – Modalités</h3><p>{{conditions_partenariat}}</p><h3>Article 3 – Rémunération</h3><p>Rémunération mensuelle de base : <strong>{{remuneration_base}} FCFA</strong>, complétée par des honoraires par mission selon devis.</p><h3>Article 4 – Propriété intellectuelle</h3><p>Les droits sur les œuvres créées dans le cadre du partenariat sont définis au cas par cas dans chaque ordre de mission.</p><h3>Article 5 – Droit applicable</h3><p>Droit ivoirien et OHADA.</p><p class="signature-block">Signatures : _______________</p></div>`
  },
  {
    code: 'photo_360_visite_virtuelle',
    name: "Accord de service de photographie 360 (visite virtuelle)",
    category: 'commercial_financier',
    price: 6000,
    priceMax: 18000,
    description: "Contrat de prestation de photographie 360° et création de visites virtuelles pour immobilier et entreprises en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 68,
    fieldsJson: F([
      {key:'nom_client',label:"Nom du client",type:'text',required:true},
      {key:'adresse_lieu',label:"Adresse du lieu à photographier en 360°",type:'text',required:true},
      {key:'nombre_scenes',label:"Nombre de scènes / points de vue",type:'text',required:true},
      {key:'date_prestation',label:"Date de la prestation",type:'date',required:true},
      {key:'montant_prestation',label:"Montant (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PHOTOGRAPHIE 360° ET VISITE VIRTUELLE</h1><p>Entre le prestataire spécialisé soussigné et <strong>{{nom_client}}</strong>.</p><h3>Article 1 – Objet</h3><p>Réalisation d'une visite virtuelle à 360° du lieu situé à {{adresse_lieu}}, comprenant {{nombre_scenes}} scène(s), prévue le {{date_prestation}}.</p><h3>Article 2 – Livraison</h3><p>La visite virtuelle sera accessible en ligne via un lien dédié et/ou intégrable sur le site web du client.</p><h3>Article 3 – Hébergement</h3><p>L'hébergement de la visite virtuelle est inclus pour une durée d'un an à compter de la livraison.</p><h3>Article 4 – Rémunération</h3><p>Montant : <strong>{{montant_prestation}} FCFA</strong>.</p><h3>Article 5 – Droit applicable</h3><p>Droit ivoirien.</p><p class="signature-block">Signatures : _______________</p></div>`
  },
  {
    code: 'photo_rapport_mission',
    name: "Rapport de mission photo",
    category: 'commercial_financier',
    price: 2000,
    priceMax: 6000,
    description: "Document de rapport de mission photographique à remettre au client en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 60,
    fieldsJson: F([
      {key:'nom_photographe',label:"Nom du photographe",type:'text',required:true},
      {key:'nom_client',label:"Nom du client",type:'text',required:true},
      {key:'date_mission',label:"Date de la mission",type:'date',required:true},
      {key:'description_mission',label:"Description de la mission réalisée",type:'textarea',required:true},
      {key:'nombre_photos_livrees',label:"Nombre de photos livrées",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE MISSION PHOTOGRAPHIQUE</h1><p>Photographe : <strong>{{nom_photographe}}</strong></p><p>Client : <strong>{{nom_client}}</strong></p><p>Date de la mission : {{date_mission}}</p><h3>1. Description de la mission</h3><p>{{description_mission}}</p><h3>2. Résultats de la mission</h3><p>Nombre de photos livrées : <strong>{{nombre_photos_livrees}}</strong></p><h3>3. Conditions de livraison</h3><p>Les fichiers ont été livrés en haute résolution au format convenu. Le client a reçu et validé les livrables.</p><h3>4. Observations</h3><p>Mission réalisée conformément aux termes du contrat de prestation photographique.</p><p class="signature-block">Signature du photographe : _______________</p><p>Visa du client : _______________</p></div>`
  },
  {
    code: 'photo_plan_developpement_studio',
    name: "Plan de développement studio photo",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 12000,
    description: "Document de plan de développement stratégique pour un studio de photographie en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 53,
    fieldsJson: F([
      {key:'nom_studio',label:"Nom du studio photographique",type:'text',required:true},
      {key:'date_redaction',label:"Date de rédaction du plan",type:'date',required:true},
      {key:'vision_studio',label:"Vision et positionnement du studio",type:'textarea',required:true},
      {key:'objectifs_annuels',label:"Objectifs annuels (CA, clientèle, services)",type:'textarea',required:true},
      {key:'budget_previsionnel',label:"Budget prévisionnel annuel (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT STUDIO PHOTOGRAPHIQUE</h1><h2>{{nom_studio}}</h2><p>Document établi le : {{date_redaction}}</p><h3>1. Vision et positionnement</h3><p>{{vision_studio}}</p><h3>2. Objectifs annuels</h3><p>{{objectifs_annuels}}</p><h3>3. Budget prévisionnel</h3><p>Budget annuel estimé : <strong>{{budget_previsionnel}} FCFA</strong></p><h3>4. Axes de développement</h3><p>Le studio envisage de développer ses activités dans les domaines suivants : photographie d'entreprise, événementielle, portrait, et formation. Une présence sur les réseaux sociaux sera renforcée pour accroître la visibilité.</p><h3>5. Indicateurs de performance</h3><p>Chiffre d'affaires mensuel, nombre de clients, taux de fidélisation, note de satisfaction client.</p><p class="signature-block">Signature du dirigeant : _______________</p></div>`
  },
  {
    code: 'photo_charte_photographe_droits_image',
    name: "Charte du photographe professionnel et des droits à l'image",
    category: 'commercial_financier',
    price: 2000,
    priceMax: 6000,
    description: "Charte professionnelle énonçant les règles déontologiques et les droits à l'image applicables en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 67,
    fieldsJson: F([
      {key:'nom_studio_photographe',label:"Nom du studio / photographe",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption de la charte",type:'date',required:true},
      {key:'engagements_supplementaires',label:"Engagements supplémentaires spécifiques",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>CHARTE DU PHOTOGRAPHE PROFESSIONNEL ET DES DROITS À L'IMAGE</h1><h2>{{nom_studio_photographe}}</h2><p>Adoptée le : {{date_adoption}}</p><h3>Article 1 – Respect des personnes</h3><p>Le photographe s'engage à obtenir le consentement explicite de toute personne photographiée avant toute diffusion publique de son image, conformément au droit ivoirien de la personnalité.</p><h3>Article 2 – Intégrité des œuvres</h3><p>Le photographe refuse toute retouche substantielle modifiant la réalité des faits ou portant atteinte à la dignité des personnes représentées.</p><h3>Article 3 – Confidentialité</h3><p>Toutes les informations relatives aux clients et aux missions sont traitées avec la plus stricte confidentialité.</p><h3>Article 4 – Tarification transparente</h3><p>Les honoraires et droits sont communiqués par écrit avant toute prestation.</p><h3>Article 5 – Engagements spécifiques</h3><p>{{engagements_supplementaires}}</p><h3>Article 6 – Droit applicable</h3><p>Droit ivoirien, code de déontologie de la photographie professionnelle.</p><p class="signature-block">Signature : _______________</p></div>`
  },

  // ─── PRODUCTION VIDÉO / AUDIOVISUEL (25 templates) ───
  {
    code: 'video_film_publicitaire_tvc',
    name: "Accord de service de production de film publicitaire (TVC)",
    category: 'commercial_financier',
    price: 10000,
    priceMax: 30000,
    description: "Contrat de production d'un film publicitaire (TVC) pour diffusion télévisuelle et digitale en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 80,
    fieldsJson: F([
      {key:'nom_annonceur',label:"Nom de l'annonceur",type:'text',required:true},
      {key:'nom_producteur',label:"Nom de la société de production",type:'text',required:true},
      {key:'description_spot',label:"Description du spot publicitaire",type:'textarea',required:true},
      {key:'date_tournage',label:"Date de tournage",type:'date',required:true},
      {key:'duree_spot',label:"Durée du spot (secondes)",type:'text',required:true},
      {key:'montant_production',label:"Montant de production (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRODUCTION DE FILM PUBLICITAIRE (TVC)</h1><p>Entre <strong>{{nom_producteur}}</strong>, société de production, et <strong>{{nom_annonceur}}</strong>, annonceur.</p><h3>Article 1 – Objet</h3><p>Production d'un spot publicitaire de {{duree_spot}} secondes décrit comme suit : {{description_spot}}. Tournage prévu le {{date_tournage}}.</p><h3>Article 2 – Droits de diffusion</h3><p>L'annonceur acquiert les droits de diffusion du spot sur les chaînes télévisées et plateformes digitales pour la durée définie dans le brief créatif.</p><h3>Article 3 – Rémunération</h3><p>Montant de production : <strong>{{montant_production}} FCFA</strong>, payable en trois tranches : 40% à la signature, 40% au tournage, 20% à la livraison.</p><h3>Article 4 – Révisions</h3><p>Deux cycles de révision au montage sont inclus.</p><h3>Article 5 – Droit applicable</h3><p>Droit ivoirien, Code de la publicité, dispositions OHADA.</p><p class="signature-block">Signatures : _______________</p></div>`
  },
  {
    code: 'video_clip_musical',
    name: "Accord de service de production de clip musical",
    category: 'commercial_financier',
    price: 8000,
    priceMax: 25000,
    description: "Contrat de production audiovisuelle pour clip musical en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 82,
    fieldsJson: F([
      {key:'nom_artiste',label:"Nom de l'artiste / groupe",type:'text',required:true},
      {key:'titre_chanson',label:"Titre de la chanson",type:'text',required:true},
      {key:'nom_producteur',label:"Nom de la société de production",type:'text',required:true},
      {key:'date_tournage',label:"Date de tournage",type:'date',required:true},
      {key:'montant_production',label:"Montant de production (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRODUCTION DE CLIP MUSICAL</h1><p>Entre <strong>{{nom_producteur}}</strong> et <strong>{{nom_artiste}}</strong>.</p><h3>Article 1 – Objet</h3><p>Production audiovisuelle du clip musical de la chanson intitulée {{titre_chanson}}, tournage prévu le {{date_tournage}}.</p><h3>Article 2 – Droits audiovisuels</h3><p>L'artiste conserve les droits patrimoniaux sur le clip. Le producteur bénéficie d'un droit de mention de sa société dans le générique.</p><h3>Article 3 – Rémunération</h3><p>Montant : <strong>{{montant_production}} FCFA</strong>, payable 50% à la signature et 50% à la livraison du master.</p><h3>Article 4 – Livraison</h3><p>Le clip sera livré en résolution 4K et formats adaptés aux plateformes digitales (YouTube, etc.).</p><h3>Article 5 – Droit applicable</h3><p>Droit ivoirien, loi sur les droits d'auteur et droits voisins.</p><p class="signature-block">Signatures : _______________</p></div>`
  },
  {
    code: 'video_documentaire',
    name: "Accord de service de production de film documentaire",
    category: 'commercial_financier',
    price: 12000,
    priceMax: 35000,
    description: "Contrat de production d'un film documentaire en Côte d'Ivoire et en Afrique de l'Ouest.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 68,
    fieldsJson: F([
      {key:'nom_commanditaire',label:"Nom du commanditaire",type:'text',required:true},
      {key:'nom_realisateur',label:"Nom du réalisateur / société de production",type:'text',required:true},
      {key:'sujet_documentaire',label:"Sujet du documentaire",type:'textarea',required:true},
      {key:'date_debut_tournage',label:"Date de début de tournage",type:'date',required:true},
      {key:'duree_documentaire',label:"Durée prévue (minutes)",type:'text',required:true},
      {key:'budget_total',label:"Budget total de production (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRODUCTION DE FILM DOCUMENTAIRE</h1><p>Entre <strong>{{nom_realisateur}}</strong>, producteur/réalisateur, et <strong>{{nom_commanditaire}}</strong>, commanditaire.</p><h3>Article 1 – Objet</h3><p>Production d'un film documentaire d'une durée de {{duree_documentaire}} minutes portant sur : {{sujet_documentaire}}. Début de tournage : {{date_debut_tournage}}.</p><h3>Article 2 – Droits</h3><p>Les droits de diffusion et d'exploitation du documentaire sont définis dans une annexe spécifique. Le réalisateur conserve ses droits moraux.</p><h3>Article 3 – Budget</h3><p>Budget total : <strong>{{budget_total}} FCFA</strong>. Un plan de financement détaillé est joint en annexe.</p><h3>Article 4 – Livrables</h3><p>Master HD, version sous-titrée, dossier de presse et bande-annonce.</p><h3>Article 5 – Droit applicable</h3><p>Droit ivoirien, loi sur le cinéma et l'audiovisuel.</p><p class="signature-block">Signatures : _______________</p></div>`
  },
  {
    code: 'video_film_institutionnel',
    name: "Accord de service de production de film institutionnel",
    category: 'commercial_financier',
    price: 9000,
    priceMax: 27000,
    description: "Contrat de production de film institutionnel pour organisations publiques et privées en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 72,
    fieldsJson: F([
      {key:'nom_organisation',label:"Nom de l'organisation cliente",type:'text',required:true},
      {key:'objectif_film',label:"Objectif et message du film",type:'textarea',required:true},
      {key:'date_tournage',label:"Date de tournage",type:'date',required:true},
      {key:'canaux_diffusion',label:"Canaux de diffusion prévus",type:'text',required:true},
      {key:'montant_production',label:"Montant (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRODUCTION DE FILM INSTITUTIONNEL</h1><p>Entre la société de production soussignée et <strong>{{nom_organisation}}</strong>.</p><h3>Article 1 – Objet</h3><p>Production d'un film institutionnel dont l'objectif est : {{objectif_film}}. Tournage prévu le {{date_tournage}}.</p><h3>Article 2 – Diffusion</h3><p>Canaux de diffusion prévus : {{canaux_diffusion}}.</p><h3>Article 3 – Droits</h3><p>L'organisation cliente acquiert l'intégralité des droits d'exploitation du film livré.</p><h3>Article 4 – Rémunération</h3><p>Montant : <strong>{{montant_production}} FCFA</strong>.</p><h3>Article 5 – Droit applicable</h3><p>Droit ivoirien et OHADA.</p><p class="signature-block">Signatures : _______________</p></div>`
  },
  {
    code: 'video_mariage_videaste',
    name: "Accord de service de production de film de mariage (vidéaste)",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 12000,
    description: "Contrat de prestation vidéo pour la couverture de mariage et cérémonies familiales en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 85,
    fieldsJson: F([
      {key:'nom_client',label:"Nom des mariés / du client",type:'text',required:true},
      {key:'date_mariage',label:"Date du mariage",type:'date',required:true},
      {key:'lieu_mariage',label:"Lieu du mariage",type:'text',required:true},
      {key:'duree_video',label:"Durée souhaitée du film (minutes)",type:'text',required:true},
      {key:'montant_prestation',label:"Montant (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRODUCTION DE FILM DE MARIAGE</h1><p>Entre le vidéaste soussigné et <strong>{{nom_client}}</strong>.</p><h3>Article 1 – Objet</h3><p>Couverture vidéo complète du mariage prévu le {{date_mariage}} à {{lieu_mariage}}, avec production d'un film souvenir d'environ {{duree_video}} minutes.</p><h3>Article 2 – Prestations incluses</h3><p>Tournage le jour J, montage, étalonnage et musique, livraison sur support numérique haute résolution.</p><h3>Article 3 – Droits</h3><p>Le client reçoit une copie destinée à un usage strictement privé et familial.</p><h3>Article 4 – Rémunération</h3><p>Montant : <strong>{{montant_prestation}} FCFA</strong>, 50% à la réservation et 50% à la livraison.</p><h3>Article 5 – Droit applicable</h3><p>Droit ivoirien.</p><p class="signature-block">Signatures : _______________</p></div>`
  },
  {
    code: 'video_serie_web',
    name: "Accord de service de production de série web (webserie)",
    category: 'commercial_financier',
    price: 10000,
    priceMax: 30000,
    description: "Contrat de production d'une série web (webserie) pour plateformes digitales en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 65,
    fieldsJson: F([
      {key:'nom_producteur',label:"Nom de la société de production",type:'text',required:true},
      {key:'nom_diffuseur',label:"Nom du diffuseur / commanditaire",type:'text',required:true},
      {key:'titre_serie',label:"Titre de la série web",type:'text',required:true},
      {key:'nombre_episodes',label:"Nombre d'épisodes prévus",type:'text',required:true},
      {key:'budget_total',label:"Budget total (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRODUCTION DE SÉRIE WEB</h1><h2>{{titre_serie}}</h2><p>Entre <strong>{{nom_producteur}}</strong> et <strong>{{nom_diffuseur}}</strong>.</p><h3>Article 1 – Objet</h3><p>Production de la série web {{titre_serie}} composée de {{nombre_episodes}} épisode(s) destinés à la diffusion sur plateformes digitales.</p><h3>Article 2 – Droits</h3><p>Le diffuseur bénéficie d'un droit exclusif de première diffusion en ligne. Le producteur conserve les droits pour une exploitation ultérieure.</p><h3>Article 3 – Budget</h3><p>Budget total : <strong>{{budget_total}} FCFA</strong>.</p><h3>Article 4 – Calendrier</h3><p>Un rétroplanning de production sera joint en annexe au présent accord.</p><h3>Article 5 – Droit applicable</h3><p>Droit ivoirien, code de la communication audiovisuelle.</p><p class="signature-block">Signatures : _______________</p></div>`
  },
  {
    code: 'video_captation_live_stream',
    name: "Accord de service de captation live (stream concert)",
    category: 'commercial_financier',
    price: 6000,
    priceMax: 18000,
    description: "Contrat de prestation de captation vidéo en direct (livestream) pour concerts et événements en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 70,
    fieldsJson: F([
      {key:'nom_organisateur',label:"Nom de l'organisateur de l'événement",type:'text',required:true},
      {key:'nom_evenement',label:"Nom de l'événement",type:'text',required:true},
      {key:'date_evenement',label:"Date de l'événement",type:'date',required:true},
      {key:'plateforme_stream',label:"Plateforme de diffusion en direct (YouTube, Facebook, etc.)",type:'text',required:true},
      {key:'montant_prestation',label:"Montant (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CAPTATION LIVE ET STREAMING</h1><p>Entre le prestataire audiovisuel soussigné et <strong>{{nom_organisateur}}</strong>.</p><h3>Article 1 – Objet</h3><p>Captation vidéo en direct de l'événement {{nom_evenement}} le {{date_evenement}}, avec diffusion sur la plateforme {{plateforme_stream}}.</p><h3>Article 2 – Équipements</h3><p>Le prestataire fournit l'ensemble du matériel de captation et de diffusion nécessaire à la qualité de la transmission.</p><h3>Article 3 – Droits de diffusion</h3><p>L'organisateur est responsable de l'obtention de toutes les autorisations de diffusion, notamment pour la musique et les droits voisins.</p><h3>Article 4 – Rémunération</h3><p>Montant : <strong>{{montant_prestation}} FCFA</strong>.</p><h3>Article 5 – Droit applicable</h3><p>Droit ivoirien.</p><p class="signature-block">Signatures : _______________</p></div>`
  },
  {
    code: 'video_montage_postproduction',
    name: "Accord de service de montage vidéo (post-production)",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 12000,
    description: "Contrat de prestation de montage vidéo et post-production en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 75,
    fieldsJson: F([
      {key:'nom_client',label:"Nom du client",type:'text',required:true},
      {key:'description_projet',label:"Description du projet vidéo à monter",type:'textarea',required:true},
      {key:'date_livraison',label:"Date de livraison souhaitée",type:'date',required:true},
      {key:'format_final',label:"Format final souhaité (MP4, MOV, etc.)",type:'text',required:true},
      {key:'montant_prestation',label:"Montant (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MONTAGE VIDÉO ET POST-PRODUCTION</h1><p>Entre le monteur soussigné et <strong>{{nom_client}}</strong>.</p><h3>Article 1 – Objet</h3><p>Réalisation du montage et de la post-production du projet suivant : {{description_projet}}, avec livraison prévue le {{date_livraison}} au format {{format_final}}.</p><h3>Article 2 – Prestations incluses</h3><p>Montage, étalonnage colorimétrique, habillage sonore et mixage de base, export dans les formats convenus.</p><h3>Article 3 – Révisions</h3><p>Deux cycles de révisions inclus dans le forfait.</p><h3>Article 4 – Rémunération</h3><p>Montant : <strong>{{montant_prestation}} FCFA</strong>.</p><h3>Article 5 – Droit applicable</h3><p>Droit ivoirien.</p><p class="signature-block">Signatures : _______________</p></div>`
  },
  {
    code: 'video_animation_2d_motion_design',
    name: "Accord de service d'animation 2D et motion design",
    category: 'commercial_financier',
    price: 6000,
    priceMax: 18000,
    description: "Contrat de création de vidéos animées 2D et motion design pour communication visuelle en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 72,
    fieldsJson: F([
      {key:'nom_client',label:"Nom du client",type:'text',required:true},
      {key:'description_animation',label:"Description de l'animation souhaitée",type:'textarea',required:true},
      {key:'duree_video',label:"Durée de la vidéo animée (secondes)",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison",type:'date',required:true},
      {key:'montant_prestation',label:"Montant (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ANIMATION 2D ET MOTION DESIGN</h1><p>Entre le studio d'animation soussigné et <strong>{{nom_client}}</strong>.</p><h3>Article 1 – Objet</h3><p>Création d'une vidéo animée en 2D et motion design de {{duree_video}} secondes décrite comme suit : {{description_animation}}. Livraison prévue le {{date_livraison}}.</p><h3>Article 2 – Processus créatif</h3><p>Le prestataire soumet un storyboard pour validation avant la production. La validation du storyboard enclenche la phase d'animation.</p><h3>Article 3 – Droits</h3><p>Le client acquiert les droits d'utilisation illimités de la vidéo livrée pour tous supports.</p><h3>Article 4 – Rémunération</h3><p>Montant : <strong>{{montant_prestation}} FCFA</strong>.</p><h3>Article 5 – Droit applicable</h3><p>Droit ivoirien.</p><p class="signature-block">Signatures : _______________</p></div>`
  },
  {
    code: 'video_animation_3d_effets_speciaux',
    name: "Accord de service d'animation 3D (effets spéciaux)",
    category: 'commercial_financier',
    price: 10000,
    priceMax: 30000,
    description: "Contrat de production d'animations 3D et d'effets visuels spéciaux pour films et publicités en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 65,
    fieldsJson: F([
      {key:'nom_client',label:"Nom du client",type:'text',required:true},
      {key:'description_sequence',label:"Description de la séquence 3D / effets spéciaux",type:'textarea',required:true},
      {key:'duree_sequence',label:"Durée de la séquence (secondes)",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison",type:'date',required:true},
      {key:'montant_prestation',label:"Montant (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ANIMATION 3D ET EFFETS SPÉCIAUX</h1><p>Entre le studio 3D soussigné et <strong>{{nom_client}}</strong>.</p><h3>Article 1 – Objet</h3><p>Production d'une séquence d'animation 3D / effets visuels de {{duree_sequence}} secondes : {{description_sequence}}. Livraison prévue le {{date_livraison}}.</p><h3>Article 2 – Processus</h3><p>Les étapes de production incluent : modélisation, rigging, animation, rendu, compositing et étalonnage.</p><h3>Article 3 – Droits</h3><p>Le client acquiert l'ensemble des droits d'exploitation de la séquence livrée.</p><h3>Article 4 – Rémunération</h3><p>Montant : <strong>{{montant_prestation}} FCFA</strong>, versé en trois tranches.</p><h3>Article 5 – Droit applicable</h3><p>Droit ivoirien.</p><p class="signature-block">Signatures : _______________</p></div>`
  },
  {
    code: 'video_doublage_postsynchronisation',
    name: "Accord de service de doublage et postsynchronisation",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 15000,
    description: "Contrat de prestation de doublage et de postsynchronisation de productions audiovisuelles en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 58,
    fieldsJson: F([
      {key:'nom_client',label:"Nom du client / producteur",type:'text',required:true},
      {key:'titre_production',label:"Titre de la production à doubler",type:'text',required:true},
      {key:'langue_doublage',label:"Langue(s) de doublage",type:'text',required:true},
      {key:'date_enregistrement',label:"Date d'enregistrement",type:'date',required:true},
      {key:'montant_prestation',label:"Montant (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DOUBLAGE ET POSTSYNCHRONISATION</h1><p>Entre le studio de doublage soussigné et <strong>{{nom_client}}</strong>.</p><h3>Article 1 – Objet</h3><p>Doublage et postsynchronisation de la production {{titre_production}} en {{langue_doublage}}, enregistrement prévu le {{date_enregistrement}}.</p><h3>Article 2 – Prestations</h3><p>Casting des comédiens de doublage, enregistrement en studio, synchronisation labiale et mixage final.</p><h3>Article 3 – Droits des comédiens</h3><p>Les droits des comédiens de doublage sont réglés conformément aux accords collectifs en vigueur en Côte d'Ivoire.</p><h3>Article 4 – Rémunération</h3><p>Montant : <strong>{{montant_prestation}} FCFA</strong>.</p><h3>Article 5 – Droit applicable</h3><p>Droit ivoirien, droits voisins.</p><p class="signature-block">Signatures : _______________</p></div>`
  },
  {
    code: 'video_mixage_son_musique_studio',
    name: "Accord de service de mixage son et musique (studio)",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 12000,
    description: "Contrat de prestation de mixage audio et musical en studio d'enregistrement en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 68,
    fieldsJson: F([
      {key:'nom_artiste_client',label:"Nom de l'artiste / client",type:'text',required:true},
      {key:'titre_projet',label:"Titre du projet (album, EP, single)",type:'text',required:true},
      {key:'nombre_titres',label:"Nombre de titres à mixer",type:'text',required:true},
      {key:'date_session',label:"Date de session studio",type:'date',required:true},
      {key:'montant_prestation',label:"Montant (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MIXAGE SON ET MUSIQUE EN STUDIO</h1><p>Entre le studio d'enregistrement soussigné et <strong>{{nom_artiste_client}}</strong>.</p><h3>Article 1 – Objet</h3><p>Mixage audio et musical du projet {{titre_projet}}, comprenant {{nombre_titres}} titre(s). Session studio prévue le {{date_session}}.</p><h3>Article 2 – Prestations incluses</h3><p>Mixage multipiste, étalonnage sonore, mastering de base et livraison en formats WAV et MP3.</p><h3>Article 3 – Révisions</h3><p>Deux cycles de révisions inclus dans le forfait.</p><h3>Article 4 – Rémunération</h3><p>Montant : <strong>{{montant_prestation}} FCFA</strong>.</p><h3>Article 5 – Droit applicable</h3><p>Droit ivoirien.</p><p class="signature-block">Signatures : _______________</p></div>`
  },
  {
    code: 'video_composition_musicale_originale',
    name: "Accord de service de composition musicale originale",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 16000,
    description: "Contrat de commande de composition musicale originale pour productions audiovisuelles en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 62,
    fieldsJson: F([
      {key:'nom_compositeur',label:"Nom du compositeur",type:'text',required:true},
      {key:'nom_client',label:"Nom du client / producteur",type:'text',required:true},
      {key:'description_oeuvre',label:"Description de l'œuvre musicale à composer",type:'textarea',required:true},
      {key:'date_livraison',label:"Date de livraison",type:'date',required:true},
      {key:'montant_commande',label:"Montant de la commande (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE COMPOSITION MUSICALE ORIGINALE</h1><p>Entre <strong>{{nom_compositeur}}</strong>, compositeur, et <strong>{{nom_client}}</strong>, commanditaire.</p><h3>Article 1 – Objet</h3><p>Composition d'une œuvre musicale originale décrite comme suit : {{description_oeuvre}}. Livraison prévue le {{date_livraison}}.</p><h3>Article 2 – Droits d'auteur</h3><p>Le compositeur conserve ses droits moraux. Les droits patrimoniaux d'exploitation sont cédés au client selon les conditions définies en annexe.</p><h3>Article 3 – Enregistrement BURIDA</h3><p>Le compositeur s'engage à déclarer l'œuvre auprès du Bureau Ivoirien du Droit d'Auteur (BURIDA).</p><h3>Article 4 – Rémunération</h3><p>Montant : <strong>{{montant_commande}} FCFA</strong>.</p><h3>Article 5 – Droit applicable</h3><p>Droit ivoirien, loi sur les droits d'auteur, BURIDA.</p><p class="signature-block">Signatures : _______________</p></div>`
  },
  {
    code: 'video_cession_droits_auteur_audiovisuel',
    name: "Accord de service de cession de droits d'auteur audiovisuel",
    category: 'commercial_financier',
    price: 8000,
    priceMax: 24000,
    description: "Contrat de cession des droits d'auteur sur une œuvre audiovisuelle en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 60,
    fieldsJson: F([
      {key:'nom_auteur',label:"Nom de l'auteur / créateur",type:'text',required:true},
      {key:'nom_cessionnaire',label:"Nom du cessionnaire",type:'text',required:true},
      {key:'titre_oeuvre',label:"Titre de l'œuvre audiovisuelle",type:'text',required:true},
      {key:'etendue_cession',label:"Étendue de la cession (territoire, durée, supports)",type:'textarea',required:true},
      {key:'montant_cession',label:"Montant de la cession (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CESSION DE DROITS D'AUTEUR AUDIOVISUEL</h1><p>Entre <strong>{{nom_auteur}}</strong>, auteur cédant, et <strong>{{nom_cessionnaire}}</strong>, cessionnaire.</p><h3>Article 1 – Objet</h3><p>Cession des droits patrimoniaux sur l'œuvre audiovisuelle intitulée {{titre_oeuvre}}.</p><h3>Article 2 – Étendue</h3><p>{{etendue_cession}}</p><h3>Article 3 – Droits moraux</h3><p>L'auteur conserve ses droits moraux incessibles. Toute exploitation doit mentionner son nom.</p><h3>Article 4 – Rémunération</h3><p>Montant de la cession : <strong>{{montant_cession}} FCFA</strong>.</p><h3>Article 5 – Droit applicable</h3><p>Loi ivoirienne sur la propriété intellectuelle, BURIDA, OHADA.</p><p class="signature-block">Signatures : _______________</p></div>`
  },
  {
    code: 'video_distribution_film_ci',
    name: "Accord de service de distribution d'un film (distributeur CI)",
    category: 'commercial_financier',
    price: 10000,
    priceMax: 30000,
    description: "Contrat de distribution cinématographique et audiovisuelle en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 57,
    fieldsJson: F([
      {key:'nom_producteur',label:"Nom du producteur",type:'text',required:true},
      {key:'nom_distributeur',label:"Nom du distributeur",type:'text',required:true},
      {key:'titre_film',label:"Titre du film",type:'text',required:true},
      {key:'territoire_distribution',label:"Territoire de distribution",type:'text',required:true},
      {key:'conditions_remuneration',label:"Conditions de rémunération (% recettes)",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE DISTRIBUTION DE FILM</h1><p>Entre <strong>{{nom_producteur}}</strong>, producteur, et <strong>{{nom_distributeur}}</strong>, distributeur, pour la Côte d'Ivoire et territoires définis.</p><h3>Article 1 – Objet</h3><p>Distribution du film intitulé {{titre_film}} sur le territoire : {{territoire_distribution}}.</p><h3>Article 2 – Droits accordés</h3><p>Le producteur accorde au distributeur un droit exclusif de distribution en salles, en VOD et sur supports physiques pour la durée du présent accord.</p><h3>Article 3 – Rémunération</h3><p>{{conditions_remuneration}}</p><h3>Article 4 – Compte rendu d'exploitation</h3><p>Le distributeur fournit un état trimestriel des recettes au producteur.</p><h3>Article 5 – Droit applicable</h3><p>Droit ivoirien, code du cinéma, OHADA.</p><p class="signature-block">Signatures : _______________</p></div>`
  },
  {
    code: 'video_coproduction_audiovisuelle',
    name: "Accord de service de coproduction audiovisuelle",
    category: 'commercial_financier',
    price: 12000,
    priceMax: 36000,
    description: "Contrat de coproduction audiovisuelle entre plusieurs sociétés en Afrique de l'Ouest (cadre OHADA).",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 55,
    fieldsJson: F([
      {key:'nom_coproducteur_1',label:"Nom du coproducteur 1 (mandataire)",type:'text',required:true},
      {key:'nom_coproducteur_2',label:"Nom du coproducteur 2",type:'text',required:true},
      {key:'titre_projet',label:"Titre du projet audiovisuel",type:'text',required:true},
      {key:'quote_part_1',label:"Quote-part coproducteur 1 (%)",type:'text',required:true},
      {key:'budget_total',label:"Budget total du projet (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE COPRODUCTION AUDIOVISUELLE</h1><p>Entre <strong>{{nom_coproducteur_1}}</strong> (coproducteur mandataire) et <strong>{{nom_coproducteur_2}}</strong> (coproducteur minoritaire).</p><h3>Article 1 – Objet</h3><p>Coproduction du projet audiovisuel intitulé {{titre_projet}}.</p><h3>Article 2 – Quote-parts</h3><p>Coproducteur 1 : {{quote_part_1}}% du budget. Coproducteur 2 : le solde. Budget total : <strong>{{budget_total}} FCFA</strong>.</p><h3>Article 3 – Droits</h3><p>Les droits d'exploitation sont répartis au prorata des apports, sauf accord contraire défini en annexe.</p><h3>Article 4 – Gouvernance</h3><p>Les décisions artistiques et financières importantes requièrent l'accord des deux coproducteurs.</p><h3>Article 5 – Droit applicable</h3><p>Droit ivoirien, Acte Uniforme OHADA sur les sociétés.</p><p class="signature-block">Signatures : _______________</p></div>`
  },
  {
    code: 'video_script_scenariste',
    name: "Accord de service de script et écriture scénariste",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 15000,
    description: "Contrat de commande d'écriture de script et de scénario audiovisuel en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 62,
    fieldsJson: F([
      {key:'nom_scenariste',label:"Nom du scénariste",type:'text',required:true},
      {key:'nom_commanditaire',label:"Nom du commanditaire / producteur",type:'text',required:true},
      {key:'description_projet',label:"Description du projet (genre, format, synopsis)",type:'textarea',required:true},
      {key:'date_livraison',label:"Date de livraison du script",type:'date',required:true},
      {key:'montant_commande',label:"Montant de la commande (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ÉCRITURE DE SCRIPT ET SCÉNARIO</h1><p>Entre <strong>{{nom_scenariste}}</strong>, scénariste, et <strong>{{nom_commanditaire}}</strong>, commanditaire.</p><h3>Article 1 – Objet</h3><p>Écriture du script et scénario pour le projet suivant : {{description_projet}}. Livraison prévue le {{date_livraison}}.</p><h3>Article 2 – Droits d'auteur</h3><p>Le scénariste conserve ses droits moraux. Les droits d'adaptation audiovisuelle sont cédés au commanditaire selon les conditions financières prévues.</p><h3>Article 3 – Révisions</h3><p>Le commanditaire peut demander deux séries de modifications sans surcoût.</p><h3>Article 4 – Rémunération</h3><p>Montant : <strong>{{montant_commande}} FCFA</strong>.</p><h3>Article 5 – Droit applicable</h3><p>Droit ivoirien, BURIDA.</p><p class="signature-block">Signatures : _______________</p></div>`
  },
  {
    code: 'video_location_materiel_tournage',
    name: "Accord de service de location de matériel de tournage",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 12000,
    description: "Contrat de location de matériel audiovisuel et de tournage en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 65,
    fieldsJson: F([
      {key:'nom_loueur',label:"Nom du loueur (société de location)",type:'text',required:true},
      {key:'nom_locataire',label:"Nom du locataire",type:'text',required:true},
      {key:'liste_materiel',label:"Liste du matériel loué",type:'textarea',required:true},
      {key:'date_location',label:"Date de début de location",type:'date',required:true},
      {key:'montant_location',label:"Montant de la location (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE LOCATION DE MATÉRIEL DE TOURNAGE</h1><p>Entre <strong>{{nom_loueur}}</strong>, loueur, et <strong>{{nom_locataire}}</strong>, locataire.</p><h3>Article 1 – Objet</h3><p>Location du matériel audiovisuel suivant à compter du {{date_location}} : {{liste_materiel}}.</p><h3>Article 2 – Responsabilité</h3><p>Le locataire est responsable de la bonne conservation du matériel loué. Toute détérioration ou perte est à sa charge.</p><h3>Article 3 – Caution</h3><p>Une caution équivalente à 30% de la valeur du matériel est versée à la prise en charge.</p><h3>Article 4 – Rémunération</h3><p>Montant de la location : <strong>{{montant_location}} FCFA</strong>.</p><h3>Article 5 – Droit applicable</h3><p>Droit ivoirien, Acte Uniforme OHADA sur le contrat de bail.</p><p class="signature-block">Signatures : _______________</p></div>`
  },
  {
    code: 'video_formation_metiers_audiovisuels',
    name: "Accord de service de formation aux métiers audiovisuels",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 12000,
    description: "Contrat de formation professionnelle aux métiers de l'audiovisuel en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 63,
    fieldsJson: F([
      {key:'nom_stagiaire',label:"Nom du stagiaire / de l'entreprise",type:'text',required:true},
      {key:'programme_formation',label:"Programme de formation",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'duree_formation',label:"Durée de la formation",type:'text',required:true},
      {key:'montant_formation',label:"Montant (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FORMATION AUX MÉTIERS AUDIOVISUELS</h1><p>Entre l'organisme de formation soussigné et <strong>{{nom_stagiaire}}</strong>.</p><h3>Article 1 – Programme</h3><p>Formation aux métiers audiovisuels selon le programme : {{programme_formation}}, débutant le {{date_debut}} pour une durée de {{duree_formation}}.</p><h3>Article 2 – Sanction de la formation</h3><p>Une attestation de formation sera remise au stagiaire à l'issue du programme.</p><h3>Article 3 – Rémunération</h3><p>Montant : <strong>{{montant_formation}} FCFA</strong>.</p><h3>Article 4 – Droit applicable</h3><p>Droit ivoirien de la formation professionnelle continue.</p><p class="signature-block">Signatures : _______________</p></div>`
  },
  {
    code: 'video_plateforme_vod_streaming',
    name: "Accord de service de plateforme VOD (diffusion streaming)",
    category: 'commercial_financier',
    price: 8000,
    priceMax: 24000,
    description: "Contrat d'accord de diffusion sur plateforme de vidéo à la demande (VOD) en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 68,
    fieldsJson: F([
      {key:'nom_producteur',label:"Nom du producteur / ayant droit",type:'text',required:true},
      {key:'nom_plateforme',label:"Nom de la plateforme VOD",type:'text',required:true},
      {key:'titre_catalogue',label:"Titre(s) du catalogue à diffuser",type:'textarea',required:true},
      {key:'duree_accord',label:"Durée de l'accord (mois)",type:'text',required:true},
      {key:'conditions_remuneration',label:"Conditions de rémunération (abonnement, à l'acte)",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE DIFFUSION SUR PLATEFORME VOD</h1><p>Entre <strong>{{nom_producteur}}</strong>, ayant droit, et <strong>{{nom_plateforme}}</strong>, plateforme de diffusion.</p><h3>Article 1 – Objet</h3><p>Mise à disposition pour diffusion en streaming des contenus suivants : {{titre_catalogue}}, pour une durée de {{duree_accord}} mois.</p><h3>Article 2 – Rémunération</h3><p>{{conditions_remuneration}}</p><h3>Article 3 – Qualité et accessibilité</h3><p>La plateforme s'engage à diffuser les contenus en qualité HD, avec des options de sous-titrage.</p><h3>Article 4 – Rapport d'exploitation</h3><p>Un rapport mensuel des vues et revenus est transmis au producteur.</p><h3>Article 5 – Droit applicable</h3><p>Droit ivoirien du numérique et OHADA.</p><p class="signature-block">Signatures : _______________</p></div>`
  },
  {
    code: 'video_partenariat_chaine_tv_producteur',
    name: "Accord de partenariat chaîne TV-producteur",
    category: 'commercial_financier',
    price: 10000,
    priceMax: 30000,
    description: "Contrat de partenariat entre une chaîne de télévision et un producteur audiovisuel en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 62,
    fieldsJson: F([
      {key:'nom_chaine',label:"Nom de la chaîne de télévision",type:'text',required:true},
      {key:'nom_producteur',label:"Nom de la société de production",type:'text',required:true},
      {key:'objet_partenariat',label:"Objet du partenariat (programme, série, émission)",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début du partenariat",type:'date',required:true},
      {key:'conditions_financieres',label:"Conditions financières (apport chaîne, droits de diffusion)",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT CHAÎNE TV – PRODUCTEUR AUDIOVISUEL</h1><p>Entre <strong>{{nom_chaine}}</strong> et <strong>{{nom_producteur}}</strong>, à compter du {{date_debut}}.</p><h3>Article 1 – Objet</h3><p>{{objet_partenariat}}</p><h3>Article 2 – Apports et droits</h3><p>{{conditions_financieres}}</p><h3>Article 3 – Droits de diffusion</h3><p>La chaîne bénéficie d'un droit de première diffusion sur ses antennes hertziennes et en streaming. Le producteur conserve les droits pour les exploitations secondaires.</p><h3>Article 4 – Gouvernance</h3><p>Un comité de suivi paritaire est mis en place pour superviser la production et la diffusion.</p><h3>Article 5 – Droit applicable</h3><p>Droit ivoirien, HACA, OHADA.</p><p class="signature-block">Signatures : _______________</p></div>`
  },
  {
    code: 'video_podcast_audio_professionnel',
    name: "Accord de service de podcast audio professionnel",
    category: 'commercial_financier',
    price: 3000,
    priceMax: 9000,
    description: "Contrat de production de podcast audio professionnel pour marques et institutions en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 70,
    fieldsJson: F([
      {key:'nom_client',label:"Nom du client / commanditaire",type:'text',required:true},
      {key:'nom_podcast',label:"Nom du podcast",type:'text',required:true},
      {key:'nombre_episodes',label:"Nombre d'épisodes commandés",type:'text',required:true},
      {key:'date_premier_episode',label:"Date de livraison du premier épisode",type:'date',required:true},
      {key:'montant_prestation',label:"Montant total (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRODUCTION DE PODCAST AUDIO PROFESSIONNEL</h1><p>Entre le studio de production soussigné et <strong>{{nom_client}}</strong>.</p><h3>Article 1 – Objet</h3><p>Production du podcast intitulé {{nom_podcast}}, composé de {{nombre_episodes}} épisode(s). Premier épisode livré le {{date_premier_episode}}.</p><h3>Article 2 – Prestations</h3><p>Enregistrement en studio, montage audio, habillage sonore, et mise en ligne sur les principales plateformes de streaming audio.</p><h3>Article 3 – Droits</h3><p>Le client est propriétaire du contenu éditorial. Le studio conserve un droit de mention de sa participation technique.</p><h3>Article 4 – Rémunération</h3><p>Montant : <strong>{{montant_prestation}} FCFA</strong>.</p><h3>Article 5 – Droit applicable</h3><p>Droit ivoirien.</p><p class="signature-block">Signatures : _______________</p></div>`
  },
  {
    code: 'video_rapport_production_audiovisuelle',
    name: "Rapport de production audiovisuelle",
    category: 'commercial_financier',
    price: 2000,
    priceMax: 6000,
    description: "Document de rapport de production audiovisuelle à remettre au client ou aux parties prenantes en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 58,
    fieldsJson: F([
      {key:'nom_producteur',label:"Nom de la société de production",type:'text',required:true},
      {key:'titre_production',label:"Titre de la production",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true},
      {key:'resume_production',label:"Résumé de la production réalisée",type:'textarea',required:true},
      {key:'livrables_remis',label:"Livrables remis au client",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PRODUCTION AUDIOVISUELLE</h1><h2>{{titre_production}}</h2><p>Société de production : <strong>{{nom_producteur}}</strong></p><p>Date du rapport : {{date_rapport}}</p><h3>1. Résumé de la production</h3><p>{{resume_production}}</p><h3>2. Livrables remis</h3><p>{{livrables_remis}}</p><h3>3. Bilan financier</h3><p>Le budget prévisionnel a été respecté / ajusté selon les avenants signés en cours de production.</p><h3>4. Perspectives</h3><p>La société de production reste disponible pour toute exploitation secondaire ou projet complémentaire.</p><p class="signature-block">Signature du producteur : _______________</p><p>Visa du client : _______________</p></div>`
  },
  {
    code: 'video_plan_developpement_studio_production',
    name: "Plan de développement studio de production",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 12000,
    description: "Document de plan de développement stratégique pour un studio de production audiovisuelle en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 53,
    fieldsJson: F([
      {key:'nom_studio',label:"Nom du studio de production",type:'text',required:true},
      {key:'date_redaction',label:"Date de rédaction du plan",type:'date',required:true},
      {key:'vision_studio',label:"Vision et positionnement stratégique",type:'textarea',required:true},
      {key:'objectifs_annuels',label:"Objectifs annuels (productions, CA, emplois)",type:'textarea',required:true},
      {key:'budget_previsionnel',label:"Budget prévisionnel annuel (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT STUDIO DE PRODUCTION AUDIOVISUELLE</h1><h2>{{nom_studio}}</h2><p>Document établi le : {{date_redaction}}</p><h3>1. Vision et positionnement</h3><p>{{vision_studio}}</p><h3>2. Objectifs annuels</h3><p>{{objectifs_annuels}}</p><h3>3. Budget prévisionnel</h3><p>Budget annuel estimé : <strong>{{budget_previsionnel}} FCFA</strong></p><h3>4. Axes de développement</h3><p>Le studio entend développer ses capacités en production de contenu local (fiction, documentaire, publicité), former des talents ivoiriens aux métiers audiovisuels et nouer des partenariats régionaux en Afrique de l'Ouest.</p><h3>5. Indicateurs clés de performance</h3><p>Nombre de productions annuelles, chiffre d'affaires, nombre d'emplois créés, diffusions obtenues.</p><p class="signature-block">Signature du dirigeant : _______________</p></div>`
  },
  {
    code: 'video_charte_production_responsable_droits_createurs',
    name: "Charte de la production audiovisuelle responsable et des droits des créateurs",
    category: 'commercial_financier',
    price: 2000,
    priceMax: 6000,
    description: "Charte énonçant les principes de production audiovisuelle éthique et la protection des droits des créateurs en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 65,
    fieldsJson: F([
      {key:'nom_studio_organisation',label:"Nom du studio / de l'organisation",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption de la charte",type:'date',required:true},
      {key:'engagements_supplementaires',label:"Engagements supplémentaires spécifiques",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>CHARTE DE LA PRODUCTION AUDIOVISUELLE RESPONSABLE ET DES DROITS DES CRÉATEURS</h1><h2>{{nom_studio_organisation}}</h2><p>Adoptée le : {{date_adoption}}</p><h3>Article 1 – Respect des droits d'auteur</h3><p>Le studio s'engage à déclarer et rémunérer équitablement tous les créateurs (réalisateurs, scénaristes, compositeurs, acteurs) participant à ses productions, conformément à la législation ivoirienne et aux règles du BURIDA.</p><h3>Article 2 – Conditions de travail équitables</h3><p>Tous les collaborateurs travaillent dans des conditions respectant le Code du Travail ivoirien : contrats écrits, rémunération au moins égale au SMIG, couverture sociale.</p><h3>Article 3 – Diversité et inclusion</h3><p>Le studio favorise la diversité devant et derrière la caméra, et s'oppose à toute discrimination basée sur le genre, l'origine ou la religion.</p><h3>Article 4 – Responsabilité environnementale</h3><p>Le studio minimise l'empreinte écologique de ses tournages (gestion des déchets, transport responsable).</p><h3>Article 5 – Engagements spécifiques</h3><p>{{engagements_supplementaires}}</p><h3>Article 6 – Droit applicable</h3><p>Droit ivoirien, Code du Travail, législation sur les droits d'auteur, BURIDA.</p><p class="signature-block">Signature du dirigeant : _______________</p></div>`
  },
];

async function main() {
  let created = 0, updated = 0;
  for (const t of templates) {
    const ex = await prisma.documentTemplate.findUnique({ where: { code: t.code } });
    await prisma.documentTemplate.upsert({ where: { code: t.code }, update: t, create: t });
    if (ex) updated++; else created++;
  }
  const total = await prisma.documentTemplate.count();
  console.log(`Batch 107a OK — créés:${created} maj:${updated} TOTAL:${total}`);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
