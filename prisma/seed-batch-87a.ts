import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ─── CINEMA / AUDIOVISUEL (25) ───
  {
    code: 'cin_001', name: "Contrat de Coproduction Cinématographique", category: 'commercial_financier',
    price: 15000, priceMax: 45000, description: "Contrat encadrant la coproduction d'une oeuvre cinématographique entre plusieurs sociétés de production selon le droit OHADA.", templateType: 'pdf', classe: 'A', active: true, popularity: 78,
    fieldsJson: F([
      {key:'titre_film',label:"Titre du film",type:'text',required:true},
      {key:'coproducteur_1',label:"Premier coproducteur",type:'text',required:true},
      {key:'coproducteur_2',label:"Deuxième coproducteur",type:'text',required:true},
      {key:'quote_part',label:"Quote-part de chaque partie (%)",type:'text',required:true},
      {key:'budget_total',label:"Budget total du film (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début de production",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE COPRODUCTION CINÉMATOGRAPHIQUE</h1><p>Entre <strong>{{coproducteur_1}}</strong> et <strong>{{coproducteur_2}}</strong>, ci-après dénommés les Coproducteurs, il est convenu ce qui suit :</p><h2>Article 1 — Objet</h2><p>Les Coproducteurs s'engagent à coproduire l'oeuvre cinématographique intitulée <strong>{{titre_film}}</strong>, dont le budget total est estimé à <strong>{{budget_total}} FCFA</strong>.</p><h2>Article 2 — Quote-part</h2><p>La répartition des apports et des droits est fixée à : {{quote_part}}.</p><h2>Article 3 — Début de production</h2><p>La production débutera le <strong>{{date_debut}}</strong>.</p><h2>Article 4 — Droit applicable</h2><p>Le présent contrat est soumis au droit OHADA et aux lois en vigueur en Côte d'Ivoire.</p></div>`
  },
  {
    code: 'cin_002', name: "Accord de Financement de Film (Investisseur)", category: 'commercial_financier',
    price: 12000, priceMax: 36000, description: "Accord liant un investisseur à une société de production pour le financement d'un film, avec modalités de retour sur investissement.", templateType: 'pdf', classe: 'A', active: true, popularity: 71,
    fieldsJson: F([
      {key:'titre_film',label:"Titre du film",type:'text',required:true},
      {key:'investisseur',label:"Nom de l'investisseur",type:'text',required:true},
      {key:'producteur',label:"Société de production",type:'text',required:true},
      {key:'montant_invest',label:"Montant investi (FCFA)",type:'text',required:true},
      {key:'pourcentage_retour',label:"Pourcentage de retour sur recettes (%)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE FINANCEMENT DE FILM</h1><p><strong>{{investisseur}}</strong>, ci-après Investisseur, et <strong>{{producteur}}</strong>, ci-après Producteur, conviennent ce qui suit :</p><h2>Article 1 — Apport financier</h2><p>L'Investisseur apporte la somme de <strong>{{montant_invest}} FCFA</strong> pour la production du film intitulé <strong>{{titre_film}}</strong>.</p><h2>Article 2 — Retour sur investissement</h2><p>L'Investisseur percevra <strong>{{pourcentage_retour}}%</strong> des recettes nettes d'exploitation jusqu'au remboursement intégral de son apport, puis un intéressement aux bénéfices.</p><h2>Article 3 — Gouvernance</h2><p>Le Producteur conserve le contrôle artistique et commercial de l'oeuvre. L'Investisseur reçoit des rapports financiers trimestriels.</p></div>`
  },
  {
    code: 'cin_003', name: "Accord de Service de Réalisation Cinématographique (Metteur en Scène)", category: 'commercial_financier',
    price: 10000, priceMax: 30000, description: "Contrat de prestation liant un metteur en scène à une société de production pour la réalisation d'un film.", templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'realisateur',label:"Nom du réalisateur",type:'text',required:true},
      {key:'producteur',label:"Société de production",type:'text',required:true},
      {key:'titre_film',label:"Titre du film",type:'text',required:true},
      {key:'remuneration',label:"Rémunération totale (FCFA)",type:'text',required:true},
      {key:'date_tournage',label:"Date de début de tournage",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RÉALISATION CINÉMATOGRAPHIQUE</h1><p><strong>{{realisateur}}</strong>, ci-après le Réalisateur, et <strong>{{producteur}}</strong>, ci-après le Producteur, concluent le présent accord.</p><h2>Article 1 — Mission</h2><p>Le Réalisateur est chargé de la mise en scène du film <strong>{{titre_film}}</strong> à compter du <strong>{{date_tournage}}</strong>.</p><h2>Article 2 — Rémunération</h2><p>Le Producteur versera au Réalisateur la somme de <strong>{{remuneration}} FCFA</strong> selon un calendrier convenu.</p><h2>Article 3 — Droits moraux</h2><p>Le Réalisateur est reconnu auteur de l'oeuvre. Ses droits moraux sont incessibles conformément à la législation ivoirienne sur la propriété littéraire et artistique.</p></div>`
  },
  {
    code: 'cin_004', name: "Accord de Service de Production Exécutif", category: 'commercial_financier',
    price: 9000, priceMax: 27000, description: "Contrat de prestation pour un producteur exécutif supervisant la réalisation opérationnelle d'un film.", templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'prod_executif',label:"Nom du producteur exécutif",type:'text',required:true},
      {key:'societe',label:"Société mandante",type:'text',required:true},
      {key:'titre_film',label:"Titre du film",type:'text',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true},
      {key:'duree_mission',label:"Durée de la mission",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRODUCTION EXÉCUTIF</h1><p><strong>{{prod_executif}}</strong>, Producteur Exécutif, et <strong>{{societe}}</strong> conviennent ce qui suit :</p><h2>Article 1 — Périmètre</h2><p>Le Producteur Exécutif assure la supervision opérationnelle de la production du film <strong>{{titre_film}}</strong> pendant une durée de <strong>{{duree_mission}}</strong>.</p><h2>Article 2 — Honoraires</h2><p>Des honoraires de <strong>{{honoraires}} FCFA</strong> seront versés selon les jalons de production définis en annexe.</p></div>`
  },
  {
    code: 'cin_005', name: "Accord de Service de Script et Scénario (Droit d'Auteur)", category: 'commercial_financier',
    price: 8000, priceMax: 24000, description: "Contrat de commande ou de cession de scénario, fixant les droits d'auteur du scénariste sur l'oeuvre audiovisuelle.", templateType: 'pdf', classe: 'B', active: true, popularity: 64,
    fieldsJson: F([
      {key:'scenariste',label:"Nom du scénariste",type:'text',required:true},
      {key:'producteur',label:"Société de production",type:'text',required:true},
      {key:'titre_scenario',label:"Titre du scénario",type:'text',required:true},
      {key:'remuneration',label:"Rémunération de commande (FCFA)",type:'text',required:true},
      {key:'droits_cedes',label:"Droits cédés (exploitation, adaptation...)",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SCRIPT ET SCÉNARIO</h1><p><strong>{{scenariste}}</strong>, Auteur, cède à <strong>{{producteur}}</strong>, Cessionnaire, les droits d'exploitation du scénario intitulé <strong>{{titre_scenario}}</strong>.</p><h2>Article 1 — Rémunération</h2><p>Le Cessionnaire verse au Scénariste la somme de <strong>{{remuneration}} FCFA</strong> à titre de garantie minimale.</p><h2>Article 2 — Droits cédés</h2><p>{{droits_cedes}}</p><h2>Article 3 — Droits moraux</h2><p>L'Auteur conserve ses droits moraux inaliénables sur l'oeuvre conformément à la loi ivoirienne n°96-564 du 25 juillet 1996.</p></div>`
  },
  {
    code: 'cin_006', name: "Accord de Service de Directeur de la Photographie", category: 'commercial_financier',
    price: 7000, priceMax: 21000, description: "Contrat de prestation pour un directeur de la photographie (chef opérateur) travaillant sur un film.", templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'dop',label:"Nom du directeur de la photographie",type:'text',required:true},
      {key:'producteur',label:"Société de production",type:'text',required:true},
      {key:'titre_film',label:"Titre du film",type:'text',required:true},
      {key:'semaines_tournage',label:"Nombre de semaines de tournage",type:'text',required:true},
      {key:'cachet_semaine',label:"Cachet hebdomadaire (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — DIRECTEUR DE LA PHOTOGRAPHIE</h1><p><strong>{{dop}}</strong> et <strong>{{producteur}}</strong> conviennent ce qui suit pour le film <strong>{{titre_film}}</strong>.</p><h2>Article 1 — Prestation</h2><p>Le Directeur de la Photographie assure la direction artistique et technique de l'image pendant <strong>{{semaines_tournage}} semaines</strong> de tournage.</p><h2>Article 2 — Rémunération</h2><p>Un cachet de <strong>{{cachet_semaine}} FCFA</strong> par semaine sera versé chaque vendredi.</p></div>`
  },
  {
    code: 'cin_007', name: "Accord de Service de Chef Décorateur", category: 'commercial_financier',
    price: 6000, priceMax: 18000, description: "Contrat de prestation liant un chef décorateur à une production cinématographique.", templateType: 'pdf', classe: 'B', active: true, popularity: 54,
    fieldsJson: F([
      {key:'decorateur',label:"Nom du chef décorateur",type:'text',required:true},
      {key:'producteur',label:"Société de production",type:'text',required:true},
      {key:'titre_film',label:"Titre du film",type:'text',required:true},
      {key:'budget_decors',label:"Budget décors alloué (FCFA)",type:'text',required:true},
      {key:'remuneration',label:"Rémunération personnelle (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — CHEF DÉCORATEUR</h1><p><strong>{{decorateur}}</strong> est engagé par <strong>{{producteur}}</strong> en qualité de Chef Décorateur pour le film <strong>{{titre_film}}</strong>.</p><h2>Article 1 — Mission</h2><p>Le Chef Décorateur conçoit et supervise la réalisation de tous les décors du film, dans la limite d'un budget de <strong>{{budget_decors}} FCFA</strong>.</p><h2>Article 2 — Rémunération</h2><p>Sa rémunération personnelle est fixée à <strong>{{remuneration}} FCFA</strong>.</p></div>`
  },
  {
    code: 'cin_008', name: "Accord de Service de Costumier de Film", category: 'commercial_financier',
    price: 5000, priceMax: 15000, description: "Contrat de prestation pour un costumier chargé de concevoir et gérer les costumes d'un film.", templateType: 'pdf', classe: 'C', active: true, popularity: 50,
    fieldsJson: F([
      {key:'costumier',label:"Nom du costumier",type:'text',required:true},
      {key:'producteur',label:"Société de production",type:'text',required:true},
      {key:'titre_film',label:"Titre du film",type:'text',required:true},
      {key:'nombre_costumes',label:"Nombre estimé de costumes",type:'text',required:true},
      {key:'remuneration',label:"Rémunération (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — COSTUMIER DE FILM</h1><p><strong>{{costumier}}</strong> et <strong>{{producteur}}</strong> conviennent de la prestation suivante pour le film <strong>{{titre_film}}</strong>.</p><h2>Article 1 — Prestation</h2><p>Le Costumier est chargé de la conception, de la location ou de la confection d'environ <strong>{{nombre_costumes}} costumes</strong>.</p><h2>Article 2 — Rémunération</h2><p>La rémunération est fixée à <strong>{{remuneration}} FCFA</strong> pour l'ensemble de la prestation.</p></div>`
  },
  {
    code: 'cin_009', name: "Accord de Service de Maquillage et Coiffure de Film", category: 'commercial_financier',
    price: 4000, priceMax: 12000, description: "Contrat de prestation pour un artiste maquilleur/coiffeur intervenant sur un tournage cinématographique.", templateType: 'pdf', classe: 'C', active: true, popularity: 47,
    fieldsJson: F([
      {key:'maquilleur',label:"Nom du maquilleur/coiffeur",type:'text',required:true},
      {key:'producteur',label:"Société de production",type:'text',required:true},
      {key:'titre_film',label:"Titre du film",type:'text',required:true},
      {key:'jours_tournage',label:"Nombre de jours de tournage",type:'text',required:true},
      {key:'cachet_journalier',label:"Cachet journalier (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — MAQUILLAGE ET COIFFURE DE FILM</h1><p><strong>{{maquilleur}}</strong> est engagé par <strong>{{producteur}}</strong> pour assurer les prestations de maquillage et coiffure sur le tournage du film <strong>{{titre_film}}</strong>.</p><h2>Article 1 — Durée</h2><p>La prestation couvre <strong>{{jours_tournage}} jours</strong> de tournage.</p><h2>Article 2 — Cachet</h2><p>Le cachet journalier est de <strong>{{cachet_journalier}} FCFA</strong>.</p></div>`
  },
  {
    code: 'cin_010', name: "Accord de Service d'Acteur (Contrat de Comédien)", category: 'commercial_financier',
    price: 8000, priceMax: 25000, description: "Contrat d'engagement d'un comédien pour un rôle dans un film, fixant cachet, droits à l'image et obligations.", templateType: 'pdf', classe: 'B', active: true, popularity: 82,
    fieldsJson: F([
      {key:'comedien',label:"Nom du comédien",type:'text',required:true},
      {key:'producteur',label:"Société de production",type:'text',required:true},
      {key:'titre_film',label:"Titre du film",type:'text',required:true},
      {key:'role',label:"Nom du personnage / rôle",type:'text',required:true},
      {key:'cachet_total',label:"Cachet total (FCFA)",type:'text',required:true},
      {key:'date_tournage',label:"Période de tournage",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE COMÉDIEN</h1><p><strong>{{comedien}}</strong>, Comédien, et <strong>{{producteur}}</strong>, Producteur, conviennent ce qui suit :</p><h2>Article 1 — Rôle</h2><p>Le Comédien interprète le personnage de <strong>{{role}}</strong> dans le film <strong>{{titre_film}}</strong>.</p><h2>Article 2 — Période</h2><p>Les prestations de tournage sont prévues sur la période : <strong>{{date_tournage}}</strong>.</p><h2>Article 3 — Cachet</h2><p>Le cachet total est fixé à <strong>{{cachet_total}} FCFA</strong>, versé en deux tranches : 50% à la signature, 50% à la fin du tournage.</p><h2>Article 4 — Droits à l'image</h2><p>Le Producteur est autorisé à utiliser l'image et la voix du Comédien à des fins de promotion du film sur tous supports et territoires.</p></div>`
  },
  {
    code: 'cin_011', name: "Accord de Service de Figurant", category: 'commercial_financier',
    price: 3000, priceMax: 9000, description: "Contrat simplifié d'engagement de figurants pour un tournage cinématographique.", templateType: 'pdf', classe: 'C', active: true, popularity: 42,
    fieldsJson: F([
      {key:'figurant',label:"Nom du figurant",type:'text',required:true},
      {key:'producteur',label:"Société de production",type:'text',required:true},
      {key:'titre_film',label:"Titre du film",type:'text',required:true},
      {key:'date_tournage',label:"Date de tournage",type:'date',required:true},
      {key:'cachet',label:"Cachet journalier (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — FIGURANT</h1><p><strong>{{figurant}}</strong> accepte de participer au tournage du film <strong>{{titre_film}}</strong> produit par <strong>{{producteur}}</strong>.</p><h2>Article 1 — Date</h2><p>La prestation est prévue le <strong>{{date_tournage}}</strong>.</p><h2>Article 2 — Cachet</h2><p>Un cachet de <strong>{{cachet}} FCFA</strong> sera versé à l'issue de la journée de tournage.</p><h2>Article 3 — Cession de droits</h2><p>Le Figurant cède à titre définitif et exclusif ses droits à l'image sur la prestation effectuée dans le film.</p></div>`
  },
  {
    code: 'cin_012', name: "Accord de Service de Cascadeur", category: 'commercial_financier',
    price: 7000, priceMax: 21000, description: "Contrat de prestation pour un cascadeur réalisant des scènes d'action sur un tournage cinématographique.", templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'cascadeur',label:"Nom du cascadeur",type:'text',required:true},
      {key:'producteur',label:"Société de production",type:'text',required:true},
      {key:'titre_film',label:"Titre du film",type:'text',required:true},
      {key:'description_cascades',label:"Description des cascades prévues",type:'textarea',required:true},
      {key:'remuneration',label:"Rémunération totale (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — CASCADEUR</h1><p><strong>{{cascadeur}}</strong>, ci-après Cascadeur, est engagé par <strong>{{producteur}}</strong> pour le film <strong>{{titre_film}}</strong>.</p><h2>Article 1 — Prestations</h2><p>{{description_cascades}}</p><h2>Article 2 — Sécurité</h2><p>Le Producteur s'engage à fournir l'équipement de sécurité adéquat, à souscrire une assurance spécifique et à respecter toutes les normes de sécurité applicables.</p><h2>Article 3 — Rémunération</h2><p>La rémunération est fixée à <strong>{{remuneration}} FCFA</strong>.</p></div>`
  },
  {
    code: 'cin_013', name: "Accord de Service de Musique de Film (Compositeur)", category: 'commercial_financier',
    price: 9000, priceMax: 27000, description: "Contrat de commande musicale entre un producteur de film et un compositeur, avec cession des droits musicaux.", templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'compositeur',label:"Nom du compositeur",type:'text',required:true},
      {key:'producteur',label:"Société de production",type:'text',required:true},
      {key:'titre_film',label:"Titre du film",type:'text',required:true},
      {key:'duree_musique',label:"Durée totale de musique commandée (minutes)",type:'text',required:true},
      {key:'remuneration',label:"Rémunération (FCFA)",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — MUSIQUE DE FILM</h1><p><strong>{{compositeur}}</strong>, Compositeur, et <strong>{{producteur}}</strong>, Producteur, s'accordent sur la création de la bande originale du film <strong>{{titre_film}}</strong>.</p><h2>Article 1 — Commande</h2><p>Le Compositeur crée environ <strong>{{duree_musique}} minutes</strong> de musique originale, livrée le <strong>{{date_livraison}}</strong>.</p><h2>Article 2 — Droits</h2><p>Le Compositeur cède les droits de synchronisation et de reproduction sur tous supports pour les besoins du film. Les droits de diffusion publique restent perçus par le Compositeur via les sociétés de gestion collective (BURIDA).</p><h2>Article 3 — Rémunération</h2><p>La commande est rémunérée <strong>{{remuneration}} FCFA</strong>.</p></div>`
  },
  {
    code: 'cin_014', name: "Accord de Service de Montage Vidéo", category: 'commercial_financier',
    price: 7000, priceMax: 21000, description: "Contrat de prestation pour un monteur vidéo en charge de l'assemblage et de l'étalonnage d'un film.", templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'monteur',label:"Nom du monteur",type:'text',required:true},
      {key:'producteur',label:"Société de production",type:'text',required:true},
      {key:'titre_film',label:"Titre du film",type:'text',required:true},
      {key:'semaines_montage',label:"Durée estimée du montage (semaines)",type:'text',required:true},
      {key:'remuneration',label:"Rémunération (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — MONTAGE VIDÉO</h1><p><strong>{{monteur}}</strong> est engagé par <strong>{{producteur}}</strong> pour assurer le montage du film <strong>{{titre_film}}</strong>.</p><h2>Article 1 — Prestation</h2><p>Le Monteur réalise le montage image, le rough cut, le montage fin et l'étalonnage en <strong>{{semaines_montage}} semaines</strong>.</p><h2>Article 2 — Rémunération</h2><p>La rémunération globale est de <strong>{{remuneration}} FCFA</strong>.</p><h2>Article 3 — Confidentialité</h2><p>Le Monteur s'engage à la confidentialité la plus stricte sur le contenu du film avant sa sortie officielle.</p></div>`
  },
  {
    code: 'cin_015', name: "Accord de Service d'Effets Spéciaux et VFX", category: 'commercial_financier',
    price: 12000, priceMax: 36000, description: "Contrat de prestation pour un studio ou un artiste VFX réalisant des effets visuels pour un film.", templateType: 'pdf', classe: 'A', active: true, popularity: 59,
    fieldsJson: F([
      {key:'studio_vfx',label:"Nom du studio / artiste VFX",type:'text',required:true},
      {key:'producteur',label:"Société de production",type:'text',required:true},
      {key:'titre_film',label:"Titre du film",type:'text',required:true},
      {key:'nombre_plans',label:"Nombre de plans VFX prévus",type:'text',required:true},
      {key:'budget_vfx',label:"Budget VFX (FCFA)",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison finale",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — EFFETS SPÉCIAUX ET VFX</h1><p><strong>{{studio_vfx}}</strong> et <strong>{{producteur}}</strong> conviennent de la prestation de création d'effets visuels pour le film <strong>{{titre_film}}</strong>.</p><h2>Article 1 — Périmètre</h2><p>La prestation porte sur <strong>{{nombre_plans}} plans VFX</strong> tels que définis dans le cahier des charges annexé.</p><h2>Article 2 — Budget et délais</h2><p>Le budget alloué est de <strong>{{budget_vfx}} FCFA</strong>. La livraison finale est prévue le <strong>{{date_livraison}}</strong>.</p><h2>Article 3 — Propriété</h2><p>L'ensemble des fichiers sources et des rendus sont cédés au Producteur à réception du paiement intégral.</p></div>`
  },
  {
    code: 'cin_016', name: "Accord de Service de Post-Production Audio (Mixage Son)", category: 'commercial_financier',
    price: 8000, priceMax: 24000, description: "Contrat de prestation pour un ingénieur du son réalisant le mixage final d'un film.", templateType: 'pdf', classe: 'B', active: true, popularity: 57,
    fieldsJson: F([
      {key:'ingenieur_son',label:"Nom de l'ingénieur du son",type:'text',required:true},
      {key:'studio',label:"Nom du studio de mixage",type:'text',required:true},
      {key:'producteur',label:"Société de production",type:'text',required:true},
      {key:'titre_film',label:"Titre du film",type:'text',required:true},
      {key:'remuneration',label:"Rémunération (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — POST-PRODUCTION AUDIO / MIXAGE SON</h1><p><strong>{{ingenieur_son}}</strong> du studio <strong>{{studio}}</strong> réalise le mixage final du film <strong>{{titre_film}}</strong> pour <strong>{{producteur}}</strong>.</p><h2>Article 1 — Prestation</h2><p>La prestation comprend le prémixage, le mixage dialogues/bruitages/musiques et la livraison d'un DCP conforme aux normes de la Dolby et des salles africaines.</p><h2>Article 2 — Rémunération</h2><p>La rémunération est de <strong>{{remuneration}} FCFA</strong>, incluant les frais de studio.</p></div>`
  },
  {
    code: 'cin_017', name: "Accord de Service de Doublage et Sous-Titrage", category: 'commercial_financier',
    price: 6000, priceMax: 18000, description: "Contrat de prestation pour la localisation d'un film par doublage ou sous-titrage en français ou en langues africaines.", templateType: 'pdf', classe: 'B', active: true, popularity: 52,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire de doublage/sous-titrage",type:'text',required:true},
      {key:'producteur',label:"Société de production / distributeur",type:'text',required:true},
      {key:'titre_film',label:"Titre du film",type:'text',required:true},
      {key:'langues',label:"Langues cibles",type:'text',required:true},
      {key:'remuneration',label:"Rémunération (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — DOUBLAGE ET SOUS-TITRAGE</h1><p><strong>{{prestataire}}</strong> prend en charge la localisation du film <strong>{{titre_film}}</strong> pour <strong>{{producteur}}</strong>.</p><h2>Article 1 — Langues</h2><p>Les langues cibles sont : <strong>{{langues}}</strong>.</p><h2>Article 2 — Rémunération</h2><p>La rémunération globale est de <strong>{{remuneration}} FCFA</strong>.</p><h2>Article 3 — Délai</h2><p>Les fichiers livrables seront fournis dans les délais convenus en annexe.</p></div>`
  },
  {
    code: 'cin_018', name: "Accord de Vente Internationale de Film (Distributeur)", category: 'commercial_financier',
    price: 15000, priceMax: 45000, description: "Accord de vente des droits d'un film à un distributeur international, avec territoire et fenêtre d'exploitation.", templateType: 'pdf', classe: 'A', active: true, popularity: 73,
    fieldsJson: F([
      {key:'vendeur',label:"Vendeur (société de ventes internationales)",type:'text',required:true},
      {key:'acheteur',label:"Acheteur (distributeur)",type:'text',required:true},
      {key:'titre_film',label:"Titre du film",type:'text',required:true},
      {key:'territoire',label:"Territoire couvert",type:'text',required:true},
      {key:'prix_acquisition',label:"Prix d'acquisition (FCFA ou USD)",type:'text',required:true},
      {key:'duree_licence',label:"Durée de la licence (années)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE VENTE INTERNATIONALE DE FILM</h1><p><strong>{{vendeur}}</strong>, Vendeur, cède à <strong>{{acheteur}}</strong>, Acheteur, les droits d'exploitation du film <strong>{{titre_film}}</strong>.</p><h2>Article 1 — Territoire et durée</h2><p>La présente licence couvre le territoire : <strong>{{territoire}}</strong> pour une durée de <strong>{{duree_licence}} ans</strong>.</p><h2>Article 2 — Prix</h2><p>Le prix d'acquisition est de <strong>{{prix_acquisition}}</strong>, versé selon les modalités définies en annexe.</p><h2>Article 3 — Fenêtres d'exploitation</h2><p>L'ordre des fenêtres (salle, VOD, TV, DVD) est fixé en annexe. Toute diffusion hors territoire est strictement interdite.</p></div>`
  },
  {
    code: 'cin_019', name: "Accord de Distribution Cinématographique Nationale", category: 'commercial_financier',
    price: 10000, priceMax: 30000, description: "Contrat de distribution d'un film sur le territoire national ivoirien entre un producteur et un distributeur local.", templateType: 'pdf', classe: 'A', active: true, popularity: 69,
    fieldsJson: F([
      {key:'producteur',label:"Société de production",type:'text',required:true},
      {key:'distributeur',label:"Distributeur national",type:'text',required:true},
      {key:'titre_film',label:"Titre du film",type:'text',required:true},
      {key:'pourcentage_distribution',label:"Pourcentage de commission du distributeur (%)",type:'text',required:true},
      {key:'date_sortie',label:"Date de sortie prévue",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE DISTRIBUTION CINÉMATOGRAPHIQUE NATIONALE</h1><p><strong>{{producteur}}</strong> mandate <strong>{{distributeur}}</strong> pour la distribution exclusive du film <strong>{{titre_film}}</strong> sur le territoire de la Côte d'Ivoire.</p><h2>Article 1 — Sortie</h2><p>La date de sortie nationale est fixée au <strong>{{date_sortie}}</strong>.</p><h2>Article 2 — Commission</h2><p>Le Distributeur perçoit <strong>{{pourcentage_distribution}}%</strong> des recettes brutes d'exploitation. Le solde est versé mensuellement au Producteur.</p><h2>Article 3 — Reddition des comptes</h2><p>Le Distributeur remet au Producteur un relevé mensuel détaillé des recettes encaissées.</p></div>`
  },
  {
    code: 'cin_020', name: "Accord de Service de Salle de Cinéma (Exploitant)", category: 'commercial_financier',
    price: 7000, priceMax: 21000, description: "Contrat entre un distributeur et un exploitant de salle pour la projection d'un film.", templateType: 'pdf', classe: 'B', active: true, popularity: 56,
    fieldsJson: F([
      {key:'distributeur',label:"Distributeur",type:'text',required:true},
      {key:'exploitant',label:"Exploitant de salle",type:'text',required:true},
      {key:'nom_salle',label:"Nom de la salle",type:'text',required:true},
      {key:'titre_film',label:"Titre du film",type:'text',required:true},
      {key:'semaines_programmation',label:"Nombre de semaines de programmation",type:'text',required:true},
      {key:'partage_recettes',label:"Clé de partage des recettes (%)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SALLE DE CINÉMA</h1><p><strong>{{distributeur}}</strong> et <strong>{{exploitant}}</strong> (salle : <strong>{{nom_salle}}</strong>) conviennent de la programmation du film <strong>{{titre_film}}</strong>.</p><h2>Article 1 — Programmation</h2><p>Le film sera projeté pendant <strong>{{semaines_programmation}} semaines</strong> dans la salle désignée.</p><h2>Article 2 — Partage des recettes</h2><p>La clé de partage est : <strong>{{partage_recettes}}</strong> en faveur du Distributeur sur les recettes guichet nettes de taxes.</p></div>`
  },
  {
    code: 'cin_021', name: "Accord de Service de Plateforme de Streaming Africaine (VOD)", category: 'commercial_financier',
    price: 10000, priceMax: 30000, description: "Accord de diffusion d'un film sur une plateforme VOD africaine, avec modalités de rémunération.", templateType: 'pdf', classe: 'A', active: true, popularity: 75,
    fieldsJson: F([
      {key:'producteur',label:"Ayant-droit / Producteur",type:'text',required:true},
      {key:'plateforme',label:"Nom de la plateforme VOD",type:'text',required:true},
      {key:'titre_film',label:"Titre du film",type:'text',required:true},
      {key:'model_monetisation',label:"Modèle de monétisation (AVOD/SVOD/TVOD)",type:'text',required:true},
      {key:'remuneration',label:"Garantie minimale ou % de revenus",type:'text',required:true},
      {key:'duree_licence',label:"Durée de la licence (mois)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — PLATEFORME DE STREAMING (VOD)</h1><p><strong>{{producteur}}</strong> autorise <strong>{{plateforme}}</strong> à diffuser le film <strong>{{titre_film}}</strong> en streaming.</p><h2>Article 1 — Modèle</h2><p>Le modèle de monétisation retenu est : <strong>{{model_monetisation}}</strong>.</p><h2>Article 2 — Rémunération</h2><p>{{remuneration}}</p><h2>Article 3 — Durée</h2><p>La présente licence est accordée pour une durée de <strong>{{duree_licence}} mois</strong>.</p><h2>Article 4 — Intégrité</h2><p>La plateforme s'engage à ne pas modifier, couper ou altérer l'oeuvre sans accord écrit préalable du Producteur.</p></div>`
  },
  {
    code: 'cin_022', name: "Accord de Service de Publicité dans les Cinémas", category: 'commercial_financier',
    price: 5000, priceMax: 15000, description: "Contrat entre un annonceur et un exploitant ou régie pour la diffusion de publicités avant les séances cinéma.", templateType: 'pdf', classe: 'C', active: true, popularity: 45,
    fieldsJson: F([
      {key:'annonceur',label:"Annonceur",type:'text',required:true},
      {key:'regie',label:"Régie publicitaire / exploitant",type:'text',required:true},
      {key:'duree_spot',label:"Durée du spot (secondes)",type:'text',required:true},
      {key:'nombre_salles',label:"Nombre de salles",type:'text',required:true},
      {key:'prix',label:"Prix total (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PUBLICITÉ EN SALLE DE CINÉMA</h1><p><strong>{{annonceur}}</strong> et <strong>{{regie}}</strong> conviennent de la diffusion d'un spot publicitaire avant les séances.</p><h2>Article 1 — Format</h2><p>Spot d'une durée de <strong>{{duree_spot}} secondes</strong>, diffusé dans <strong>{{nombre_salles}} salles</strong>.</p><h2>Article 2 — Prix</h2><p>Le prix total de la campagne est de <strong>{{prix}} FCFA</strong>.</p></div>`
  },
  {
    code: 'cin_023', name: "Accord de Partenariat Film-Festival (FESPACO, CLAP IVOIRE)", category: 'commercial_financier',
    price: 8000, priceMax: 24000, description: "Accord de partenariat entre un festival de cinéma africain et un producteur ou sponsor pour la programmation ou le financement.", templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'festival',label:"Nom du festival",type:'text',required:true},
      {key:'partenaire',label:"Partenaire (producteur ou sponsor)",type:'text',required:true},
      {key:'objet_partenariat',label:"Objet du partenariat",type:'textarea',required:true},
      {key:'contribution',label:"Contribution financière ou en nature (FCFA)",type:'text',required:true},
      {key:'contreparties',label:"Contreparties offertes par le festival",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT — FESTIVAL DE CINÉMA AFRICAIN</h1><p><strong>{{festival}}</strong> et <strong>{{partenaire}}</strong> concluent le présent accord de partenariat.</p><h2>Article 1 — Objet</h2><p>{{objet_partenariat}}</p><h2>Article 2 — Contribution</h2><p>La contribution du Partenaire est évaluée à <strong>{{contribution}} FCFA</strong>.</p><h2>Article 3 — Contreparties</h2><p>{{contreparties}}</p><h2>Article 4 — Droit applicable</h2><p>Le présent accord est régi par le droit ivoirien.</p></div>`
  },
  {
    code: 'cin_024', name: "Rapport de Production Cinématographique", category: 'commercial_financier',
    price: 5000, priceMax: 15000, description: "Document de suivi budgétaire et opérationnel d'une production cinématographique, à destination des investisseurs.", templateType: 'pdf', classe: 'B', active: true, popularity: 53,
    fieldsJson: F([
      {key:'titre_film',label:"Titre du film",type:'text',required:true},
      {key:'producteur',label:"Société de production",type:'text',required:true},
      {key:'periode_rapport',label:"Période couverte par le rapport",type:'text',required:true},
      {key:'avancement',label:"État d'avancement de la production",type:'textarea',required:true},
      {key:'depenses_engagees',label:"Dépenses engagées à ce jour (FCFA)",type:'text',required:true},
      {key:'solde_budget',label:"Solde disponible (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PRODUCTION CINÉMATOGRAPHIQUE</h1><h2>Film : {{titre_film}}</h2><p>Produit par : <strong>{{producteur}}</strong> | Période : <strong>{{periode_rapport}}</strong></p><h2>1. État d'avancement</h2><p>{{avancement}}</p><h2>2. Situation financière</h2><p>Dépenses engagées : <strong>{{depenses_engagees}} FCFA</strong></p><p>Solde disponible : <strong>{{solde_budget}} FCFA</strong></p><h2>3. Prochaines étapes</h2><p>Les prochaines étapes de production seront communiquées lors de la prochaine réunion de production.</p></div>`
  },
  {
    code: 'cin_025', name: "Charte du Cinéma Africain et des Droits des Créateurs", category: 'commercial_financier',
    price: 6000, priceMax: 18000, description: "Document de référence énonçant les principes éthiques et les droits fondamentaux des créateurs du cinéma africain.", templateType: 'pdf', classe: 'B', active: true, popularity: 48,
    fieldsJson: F([
      {key:'organisation',label:"Organisation signataire",type:'text',required:true},
      {key:'representant',label:"Représentant légal",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true},
      {key:'engagements',label:"Engagements spécifiques de l'organisation",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DU CINÉMA AFRICAIN ET DES DROITS DES CRÉATEURS</h1><p><strong>{{organisation}}</strong>, représentée par <strong>{{representant}}</strong>, adopte la présente Charte le <strong>{{date_adoption}}</strong>.</p><h2>Préambule</h2><p>Convaincue de la nécessité de préserver et de promouvoir la diversité culturelle africaine à travers le cinéma, notre organisation s'engage à défendre les droits économiques et moraux de tous les créateurs.</p><h2>Article 1 — Droits des auteurs</h2><p>Tout créateur (réalisateur, scénariste, compositeur) conserve ses droits moraux inaliénables sur son oeuvre.</p><h2>Article 2 — Rémunération équitable</h2><p>Chaque intervenant doit percevoir une rémunération juste et transparente, proportionnelle à sa contribution.</p><h2>Article 3 — Engagements de l'organisation</h2><p>{{engagements}}</p></div>`
  },

  // ─── PUBLICITÉ / COMMUNICATION (25) ───
  {
    code: 'pub_001', name: "Accord de Service de Création de Campagne Publicitaire", category: 'commercial_financier',
    price: 10000, priceMax: 30000, description: "Contrat de prestation créative entre une agence de publicité et un annonceur pour la conception d'une campagne.", templateType: 'pdf', classe: 'A', active: true, popularity: 80,
    fieldsJson: F([
      {key:'agence',label:"Nom de l'agence",type:'text',required:true},
      {key:'annonceur',label:"Nom de l'annonceur",type:'text',required:true},
      {key:'produit_service',label:"Produit ou service à promouvoir",type:'text',required:true},
      {key:'budget_creation',label:"Budget de création (FCFA)",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison des maquettes",type:'date',required:true},
      {key:'supports',label:"Supports prévus (TV, radio, digital...)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — CRÉATION DE CAMPAGNE PUBLICITAIRE</h1><p><strong>{{agence}}</strong>, Agence, et <strong>{{annonceur}}</strong>, Annonceur, conviennent ce qui suit :</p><h2>Article 1 — Mission</h2><p>L'Agence est chargée de concevoir une campagne publicitaire pour le produit/service : <strong>{{produit_service}}</strong>, sur les supports suivants : <strong>{{supports}}</strong>.</p><h2>Article 2 — Budget et honoraires</h2><p>Le budget de création est fixé à <strong>{{budget_creation}} FCFA</strong>, hors achat d'espaces.</p><h2>Article 3 — Délai</h2><p>Les premières propositions créatives seront livrées le <strong>{{date_livraison}}</strong>.</p><h2>Article 4 — Propriété intellectuelle</h2><p>Les créations restent la propriété de l'Annonceur dès paiement intégral des honoraires.</p></div>`
  },
  {
    code: 'pub_002', name: "Accord de Service d'Agence de Publicité (Mandat)", category: 'commercial_financier',
    price: 8000, priceMax: 24000, description: "Contrat de mandat confiant à une agence la gestion globale de la communication d'un annonceur.", templateType: 'pdf', classe: 'A', active: true, popularity: 74,
    fieldsJson: F([
      {key:'agence',label:"Agence mandataire",type:'text',required:true},
      {key:'annonceur',label:"Annonceur mandant",type:'text',required:true},
      {key:'perimetre',label:"Périmètre du mandat",type:'textarea',required:true},
      {key:'honoraires_annuels',label:"Honoraires annuels (FCFA)",type:'text',required:true},
      {key:'duree_contrat',label:"Durée du contrat (mois)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE MANDAT — AGENCE DE PUBLICITÉ</h1><p><strong>{{annonceur}}</strong> mandate <strong>{{agence}}</strong> pour gérer sa communication selon les termes ci-après.</p><h2>Article 1 — Périmètre</h2><p>{{perimetre}}</p><h2>Article 2 — Honoraires</h2><p>Les honoraires annuels sont de <strong>{{honoraires_annuels}} FCFA</strong>, facturés mensuellement.</p><h2>Article 3 — Durée</h2><p>Le présent accord est conclu pour <strong>{{duree_contrat}} mois</strong>, renouvelable par tacite reconduction.</p></div>`
  },
  {
    code: 'pub_003', name: "Accord de Service de Conseil en Communication", category: 'commercial_financier',
    price: 7000, priceMax: 21000, description: "Contrat de conseil stratégique en communication entre un consultant et une entreprise cliente.", templateType: 'pdf', classe: 'B', active: true, popularity: 67,
    fieldsJson: F([
      {key:'consultant',label:"Consultant / Cabinet",type:'text',required:true},
      {key:'client',label:"Entreprise cliente",type:'text',required:true},
      {key:'mission',label:"Mission de conseil",type:'textarea',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true},
      {key:'duree_mission',label:"Durée de la mission",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — CONSEIL EN COMMUNICATION</h1><p><strong>{{consultant}}</strong> est mandaté par <strong>{{client}}</strong> pour une mission de conseil en communication.</p><h2>Article 1 — Mission</h2><p>{{mission}}</p><h2>Article 2 — Honoraires</h2><p>Les honoraires sont fixés à <strong>{{honoraires}} FCFA</strong> pour une durée de <strong>{{duree_mission}}</strong>.</p><h2>Article 3 — Confidentialité</h2><p>Le Consultant s'engage à la stricte confidentialité des informations stratégiques communiquées par le Client.</p></div>`
  },
  {
    code: 'pub_004', name: "Accord de Service de Relations Publiques (RP)", category: 'commercial_financier',
    price: 7000, priceMax: 21000, description: "Contrat de prestation pour une agence de relations publiques chargée de la communication institutionnelle d'un client.", templateType: 'pdf', classe: 'B', active: true, popularity: 61,
    fieldsJson: F([
      {key:'agence_rp',label:"Agence de relations publiques",type:'text',required:true},
      {key:'client',label:"Client",type:'text',required:true},
      {key:'objectifs_rp',label:"Objectifs de relations publiques",type:'textarea',required:true},
      {key:'honoraires_mensuels',label:"Honoraires mensuels (FCFA)",type:'text',required:true},
      {key:'duree',label:"Durée du contrat (mois)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — RELATIONS PUBLIQUES</h1><p><strong>{{agence_rp}}</strong> est chargée par <strong>{{client}}</strong> de la gestion de ses relations publiques.</p><h2>Article 1 — Objectifs</h2><p>{{objectifs_rp}}</p><h2>Article 2 — Honoraires</h2><p>Les honoraires mensuels sont de <strong>{{honoraires_mensuels}} FCFA</strong>.</p><h2>Article 3 — Durée</h2><p>Le contrat est conclu pour <strong>{{duree}} mois</strong>.</p><h2>Article 4 — Reporting</h2><p>L'Agence remet au Client un rapport mensuel d'activité et de retombées presse.</p></div>`
  },
  {
    code: 'pub_005', name: "Accord de Service d'Influence Marketing (Influenceur)", category: 'commercial_financier',
    price: 5000, priceMax: 15000, description: "Contrat encadrant la collaboration entre une marque et un influenceur pour une campagne de communication digitale.", templateType: 'pdf', classe: 'B', active: true, popularity: 85,
    fieldsJson: F([
      {key:'influenceur',label:"Nom de l'influenceur",type:'text',required:true},
      {key:'marque',label:"Marque partenaire",type:'text',required:true},
      {key:'livrables',label:"Livrables attendus (posts, stories, vidéos...)",type:'textarea',required:true},
      {key:'remuneration',label:"Rémunération (FCFA)",type:'text',required:true},
      {key:'date_campagne',label:"Période de la campagne",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — INFLUENCE MARKETING</h1><p><strong>{{influenceur}}</strong> et <strong>{{marque}}</strong> concluent le présent accord de partenariat pour une campagne d'influence marketing.</p><h2>Article 1 — Livrables</h2><p>{{livrables}}</p><h2>Article 2 — Rémunération</h2><p>La rémunération est fixée à <strong>{{remuneration}} FCFA</strong>.</p><h2>Article 3 — Période</h2><p>La campagne se déroule sur la période : <strong>{{date_campagne}}</strong>.</p><h2>Article 4 — Transparence</h2><p>L'influenceur s'engage à mentionner explicitement le partenariat commercial conformément aux bonnes pratiques et à la réglementation applicable.</p></div>`
  },
  {
    code: 'pub_006', name: "Accord de Service de Community Management", category: 'commercial_financier',
    price: 4000, priceMax: 12000, description: "Contrat de prestation pour un community manager chargé d'animer les réseaux sociaux d'une entreprise.", templateType: 'pdf', classe: 'C', active: true, popularity: 72,
    fieldsJson: F([
      {key:'community_manager',label:"Nom du community manager",type:'text',required:true},
      {key:'client',label:"Entreprise cliente",type:'text',required:true},
      {key:'reseaux',label:"Réseaux sociaux gérés",type:'text',required:true},
      {key:'honoraires_mensuels',label:"Honoraires mensuels (FCFA)",type:'text',required:true},
      {key:'nombre_publications',label:"Nombre de publications par mois",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — COMMUNITY MANAGEMENT</h1><p><strong>{{community_manager}}</strong> assure la gestion des communautés en ligne de <strong>{{client}}</strong>.</p><h2>Article 1 — Réseaux gérés</h2><p><strong>{{reseaux}}</strong></p><h2>Article 2 — Volume</h2><p><strong>{{nombre_publications}} publications</strong> par mois, incluant la modération des commentaires.</p><h2>Article 3 — Honoraires</h2><p>Honoraires mensuels : <strong>{{honoraires_mensuels}} FCFA</strong>.</p></div>`
  },
  {
    code: 'pub_007', name: "Accord de Service de Création de Contenu (Content Marketing)", category: 'commercial_financier',
    price: 5000, priceMax: 15000, description: "Contrat de prestation pour un rédacteur ou une agence de contenu chargé de produire des contenus marketing.", templateType: 'pdf', classe: 'C', active: true, popularity: 66,
    fieldsJson: F([
      {key:'redacteur',label:"Rédacteur / Agence de contenu",type:'text',required:true},
      {key:'client',label:"Client",type:'text',required:true},
      {key:'types_contenus',label:"Types de contenus (articles, vidéos, infographies...)",type:'text',required:true},
      {key:'volume_mensuel',label:"Volume mensuel",type:'text',required:true},
      {key:'honoraires',label:"Honoraires mensuels (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — CRÉATION DE CONTENU</h1><p><strong>{{redacteur}}</strong> produit des contenus marketing pour <strong>{{client}}</strong>.</p><h2>Article 1 — Types de contenus</h2><p>{{types_contenus}}</p><h2>Article 2 — Volume</h2><p>Volume mensuel : <strong>{{volume_mensuel}}</strong>.</p><h2>Article 3 — Honoraires</h2><p>Honoraires mensuels : <strong>{{honoraires}} FCFA</strong>.</p><h2>Article 4 — Propriété</h2><p>Les contenus produits sont cédés au Client dès paiement.</p></div>`
  },
  {
    code: 'pub_008', name: "Accord de Service de SEO et Référencement Naturel", category: 'commercial_financier',
    price: 6000, priceMax: 18000, description: "Contrat de prestation SEO pour l'amélioration du référencement naturel d'un site web.", templateType: 'pdf', classe: 'C', active: true, popularity: 70,
    fieldsJson: F([
      {key:'agence_seo',label:"Agence SEO",type:'text',required:true},
      {key:'client',label:"Client",type:'text',required:true},
      {key:'url_site',label:"URL du site web",type:'text',required:true},
      {key:'mots_cles',label:"Principaux mots-clés cibles",type:'textarea',required:true},
      {key:'honoraires_mensuels',label:"Honoraires mensuels (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — SEO ET RÉFÉRENCEMENT NATUREL</h1><p><strong>{{agence_seo}}</strong> prend en charge le référencement naturel du site <strong>{{url_site}}</strong> de <strong>{{client}}</strong>.</p><h2>Article 1 — Mots-clés cibles</h2><p>{{mots_cles}}</p><h2>Article 2 — Prestations</h2><p>Les prestations comprennent l'audit technique, l'optimisation on-page, la création de backlinks et le reporting mensuel.</p><h2>Article 3 — Honoraires</h2><p>Honoraires mensuels : <strong>{{honoraires_mensuels}} FCFA</strong>.</p></div>`
  },
  {
    code: 'pub_009', name: "Accord de Service de Publicité sur les Réseaux Sociaux", category: 'commercial_financier',
    price: 5000, priceMax: 15000, description: "Contrat de gestion des campagnes publicitaires payantes sur les réseaux sociaux (Meta, TikTok, etc.).", templateType: 'pdf', classe: 'C', active: true, popularity: 77,
    fieldsJson: F([
      {key:'agence',label:"Agence de gestion",type:'text',required:true},
      {key:'annonceur',label:"Annonceur",type:'text',required:true},
      {key:'plateformes',label:"Plateformes (Meta, TikTok, LinkedIn...)",type:'text',required:true},
      {key:'budget_media',label:"Budget média mensuel (FCFA)",type:'text',required:true},
      {key:'honoraires_gestion',label:"Honoraires de gestion (% ou FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — PUBLICITÉ RÉSEAUX SOCIAUX</h1><p><strong>{{agence}}</strong> gère les campagnes publicitaires de <strong>{{annonceur}}</strong> sur les plateformes : <strong>{{plateformes}}</strong>.</p><h2>Article 1 — Budget</h2><p>Budget média mensuel : <strong>{{budget_media}} FCFA</strong>.</p><h2>Article 2 — Honoraires</h2><p>Honoraires de gestion : <strong>{{honoraires_gestion}}</strong>.</p><h2>Article 3 — Reporting</h2><p>Un rapport de performance hebdomadaire sera transmis à l'Annonceur.</p></div>`
  },
  {
    code: 'pub_010', name: "Accord de Service de Publicité en Ligne (Google Ads)", category: 'commercial_financier',
    price: 6000, priceMax: 18000, description: "Contrat de gestion de campagnes Google Ads pour un annonceur par une agence spécialisée.", templateType: 'pdf', classe: 'C', active: true, popularity: 71,
    fieldsJson: F([
      {key:'agence',label:"Agence Google Ads",type:'text',required:true},
      {key:'annonceur',label:"Annonceur",type:'text',required:true},
      {key:'budget_mensuel',label:"Budget mensuel Google Ads (FCFA)",type:'text',required:true},
      {key:'honoraires',label:"Honoraires de gestion mensuels (FCFA)",type:'text',required:true},
      {key:'objectifs',label:"Objectifs de campagne (trafic, leads, ventes...)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — PUBLICITÉ EN LIGNE (GOOGLE ADS)</h1><p><strong>{{agence}}</strong> gère les campagnes Google Ads de <strong>{{annonceur}}</strong>.</p><h2>Article 1 — Objectifs</h2><p><strong>{{objectifs}}</strong></p><h2>Article 2 — Budget et honoraires</h2><p>Budget mensuel : <strong>{{budget_mensuel}} FCFA</strong>. Honoraires : <strong>{{honoraires}} FCFA</strong>.</p><h2>Article 3 — Accès</h2><p>L'Annonceur reste propriétaire du compte Google Ads et des données.</p></div>`
  },
  {
    code: 'pub_011', name: "Accord de Service de Publicité Extérieure (Panneaux, Affiches)", category: 'commercial_financier',
    price: 7000, priceMax: 21000, description: "Contrat de location d'espaces publicitaires extérieurs entre un annonceur et une régie d'affichage.", templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'regie',label:"Régie d'affichage",type:'text',required:true},
      {key:'annonceur',label:"Annonceur",type:'text',required:true},
      {key:'nombre_panneaux',label:"Nombre de panneaux",type:'text',required:true},
      {key:'localisation',label:"Localisation des panneaux",type:'textarea',required:true},
      {key:'prix_total',label:"Prix total de la campagne (FCFA)",type:'text',required:true},
      {key:'duree_campagne',label:"Durée de la campagne (semaines)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — PUBLICITÉ EXTÉRIEURE</h1><p><strong>{{regie}}</strong> met à disposition de <strong>{{annonceur}}</strong> des espaces d'affichage publicitaire.</p><h2>Article 1 — Emplacements</h2><p>Nombre : <strong>{{nombre_panneaux}} panneaux</strong>. Localisation : <strong>{{localisation}}</strong>.</p><h2>Article 2 — Durée</h2><p><strong>{{duree_campagne}} semaines</strong>.</p><h2>Article 3 — Prix</h2><p>Prix total : <strong>{{prix_total}} FCFA</strong>, payable 50% à la commande.</p></div>`
  },
  {
    code: 'pub_012', name: "Accord de Service de Publicité Radio", category: 'commercial_financier',
    price: 5000, priceMax: 15000, description: "Contrat de diffusion de spots publicitaires sur une station de radio.", templateType: 'pdf', classe: 'C', active: true, popularity: 58,
    fieldsJson: F([
      {key:'station_radio',label:"Station de radio",type:'text',required:true},
      {key:'annonceur',label:"Annonceur",type:'text',required:true},
      {key:'duree_spot',label:"Durée du spot (secondes)",type:'text',required:true},
      {key:'nombre_passages',label:"Nombre de passages par semaine",type:'text',required:true},
      {key:'prix_semaine',label:"Prix par semaine (FCFA)",type:'text',required:true},
      {key:'duree_campagne',label:"Durée de la campagne (semaines)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — PUBLICITÉ RADIO</h1><p><strong>{{station_radio}}</strong> diffuse les spots publicitaires de <strong>{{annonceur}}</strong>.</p><h2>Article 1 — Format</h2><p>Spot de <strong>{{duree_spot}} secondes</strong>, diffusé <strong>{{nombre_passages}} fois par semaine</strong>.</p><h2>Article 2 — Durée et prix</h2><p>Durée : <strong>{{duree_campagne}} semaines</strong>. Prix par semaine : <strong>{{prix_semaine}} FCFA</strong>.</p></div>`
  },
  {
    code: 'pub_013', name: "Accord de Service de Publicité Télévision", category: 'commercial_financier',
    price: 12000, priceMax: 36000, description: "Contrat de diffusion de spots publicitaires sur une chaîne de télévision.", templateType: 'pdf', classe: 'A', active: true, popularity: 76,
    fieldsJson: F([
      {key:'chaine',label:"Chaîne de télévision",type:'text',required:true},
      {key:'annonceur',label:"Annonceur",type:'text',required:true},
      {key:'duree_spot',label:"Durée du spot (secondes)",type:'text',required:true},
      {key:'tranches_horaires',label:"Tranches horaires de diffusion",type:'text',required:true},
      {key:'prix_total',label:"Prix total de la campagne (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — PUBLICITÉ TÉLÉVISION</h1><p><strong>{{chaine}}</strong> s'engage à diffuser le spot publicitaire de <strong>{{annonceur}}</strong>.</p><h2>Article 1 — Format</h2><p>Spot d'une durée de <strong>{{duree_spot}} secondes</strong>.</p><h2>Article 2 — Diffusion</h2><p>Tranches horaires : <strong>{{tranches_horaires}}</strong>.</p><h2>Article 3 — Prix</h2><p>Prix total : <strong>{{prix_total}} FCFA</strong>.</p><h2>Article 4 — Contenu</h2><p>L'Annonceur certifie que le spot est conforme à la réglementation publicitaire en vigueur en Côte d'Ivoire (ARTP).</p></div>`
  },
  {
    code: 'pub_014', name: "Accord de Service de Publicité Presse Écrite", category: 'commercial_financier',
    price: 5000, priceMax: 15000, description: "Contrat de publication d'encarts publicitaires dans un journal ou magazine.", templateType: 'pdf', classe: 'C', active: true, popularity: 54,
    fieldsJson: F([
      {key:'journal',label:"Titre du journal / magazine",type:'text',required:true},
      {key:'annonceur',label:"Annonceur",type:'text',required:true},
      {key:'format_encart',label:"Format de l'encart (demi-page, pleine page...)",type:'text',required:true},
      {key:'nombre_parutions',label:"Nombre de parutions",type:'text',required:true},
      {key:'prix_unitaire',label:"Prix unitaire par parution (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — PUBLICITÉ PRESSE ÉCRITE</h1><p><strong>{{journal}}</strong> publie les encarts publicitaires de <strong>{{annonceur}}</strong>.</p><h2>Article 1 — Format</h2><p><strong>{{format_encart}}</strong></p><h2>Article 2 — Parutions</h2><p>Nombre de parutions : <strong>{{nombre_parutions}}</strong> au prix unitaire de <strong>{{prix_unitaire}} FCFA</strong>.</p></div>`
  },
  {
    code: 'pub_015', name: "Accord de Service de Publicité par SMS", category: 'commercial_financier',
    price: 4000, priceMax: 12000, description: "Contrat de routage de campagnes SMS marketing pour le compte d'un annonceur.", templateType: 'pdf', classe: 'C', active: true, popularity: 60,
    fieldsJson: F([
      {key:'routeur',label:"Routeur / Opérateur SMS",type:'text',required:true},
      {key:'annonceur',label:"Annonceur",type:'text',required:true},
      {key:'volume_sms',label:"Volume de SMS à envoyer",type:'text',required:true},
      {key:'prix_unitaire',label:"Prix par SMS (FCFA)",type:'text',required:true},
      {key:'date_envoi',label:"Date d'envoi prévue",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — PUBLICITÉ PAR SMS</h1><p><strong>{{routeur}}</strong> assure le routage de <strong>{{volume_sms}} SMS</strong> pour le compte de <strong>{{annonceur}}</strong>.</p><h2>Article 1 — Envoi</h2><p>Date d'envoi prévue : <strong>{{date_envoi}}</strong>.</p><h2>Article 2 — Prix</h2><p>Prix unitaire : <strong>{{prix_unitaire}} FCFA</strong> par SMS.</p><h2>Article 3 — Conformité</h2><p>L'Annonceur certifie disposer du consentement des destinataires et respecter la réglementation ARTCI sur la protection des données personnelles.</p></div>`
  },
  {
    code: 'pub_016', name: "Accord de Service d'Email Marketing", category: 'commercial_financier',
    price: 4000, priceMax: 12000, description: "Contrat de prestation d'emailing entre une plateforme ou agence et un annonceur.", templateType: 'pdf', classe: 'C', active: true, popularity: 55,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire email marketing",type:'text',required:true},
      {key:'client',label:"Client / Annonceur",type:'text',required:true},
      {key:'volume_emails',label:"Volume d'emails par envoi",type:'text',required:true},
      {key:'frequence',label:"Fréquence des envois",type:'text',required:true},
      {key:'honoraires_mensuels',label:"Honoraires mensuels (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — EMAIL MARKETING</h1><p><strong>{{prestataire}}</strong> assure les prestations d'email marketing pour <strong>{{client}}</strong>.</p><h2>Article 1 — Volume et fréquence</h2><p>Volume : <strong>{{volume_emails}} emails par envoi</strong>. Fréquence : <strong>{{frequence}}</strong>.</p><h2>Article 2 — Honoraires</h2><p>Honoraires mensuels : <strong>{{honoraires_mensuels}} FCFA</strong>.</p><h2>Article 3 — RGPD et données</h2><p>Les bases de données utilisées appartiennent au Client qui est seul responsable de leur légalité.</p></div>`
  },
  {
    code: 'pub_017', name: "Accord de Service de Production d'un Spot TV", category: 'commercial_financier',
    price: 15000, priceMax: 45000, description: "Contrat de production d'un spot publicitaire télévisé entre un annonceur et une société de production audiovisuelle.", templateType: 'pdf', classe: 'A', active: true, popularity: 79,
    fieldsJson: F([
      {key:'producteur',label:"Société de production",type:'text',required:true},
      {key:'annonceur',label:"Annonceur",type:'text',required:true},
      {key:'titre_spot',label:"Titre / concept du spot",type:'text',required:true},
      {key:'duree_spot',label:"Durée du spot (secondes)",type:'text',required:true},
      {key:'budget_production',label:"Budget de production (FCFA)",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — PRODUCTION DE SPOT TV</h1><p><strong>{{producteur}}</strong> produit un spot publicitaire pour <strong>{{annonceur}}</strong>.</p><h2>Article 1 — Concept</h2><p>Titre du spot : <strong>{{titre_spot}}</strong>, durée : <strong>{{duree_spot}} secondes</strong>.</p><h2>Article 2 — Budget</h2><p>Budget de production : <strong>{{budget_production}} FCFA</strong>.</p><h2>Article 3 — Livraison</h2><p>Le master HD sera livré le <strong>{{date_livraison}}</strong> au format broadcast.</p><h2>Article 4 — Propriété</h2><p>L'Annonceur acquiert la pleine propriété du spot dès paiement intégral.</p></div>`
  },
  {
    code: 'pub_018', name: "Accord de Service de Production de Jingle Radio", category: 'commercial_financier',
    price: 6000, priceMax: 18000, description: "Contrat de création et production d'un jingle publicitaire pour la radio.", templateType: 'pdf', classe: 'C', active: true, popularity: 50,
    fieldsJson: F([
      {key:'compositeur',label:"Compositeur / Studio de production",type:'text',required:true},
      {key:'annonceur',label:"Annonceur",type:'text',required:true},
      {key:'duree_jingle',label:"Durée du jingle (secondes)",type:'text',required:true},
      {key:'nombre_versions',label:"Nombre de versions (15s, 30s...)",type:'text',required:true},
      {key:'remuneration',label:"Rémunération totale (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — PRODUCTION DE JINGLE RADIO</h1><p><strong>{{compositeur}}</strong> crée et produit un jingle publicitaire pour <strong>{{annonceur}}</strong>.</p><h2>Article 1 — Caractéristiques</h2><p>Durée principale : <strong>{{duree_jingle}} secondes</strong>. Nombre de versions : <strong>{{nombre_versions}}</strong>.</p><h2>Article 2 — Rémunération</h2><p>Rémunération globale : <strong>{{remuneration}} FCFA</strong>.</p><h2>Article 3 — Cession de droits</h2><p>Le Compositeur cède à l'Annonceur les droits de reproduction et de diffusion du jingle sur tout support et territoire.</p></div>`
  },
  {
    code: 'pub_019', name: "Accord de Service de Mesure d'Audience (Nielsen Afrique)", category: 'commercial_financier',
    price: 9000, priceMax: 27000, description: "Contrat d'abonnement à des services de mesure d'audience médias pour le marché africain.", templateType: 'pdf', classe: 'B', active: true, popularity: 46,
    fieldsJson: F([
      {key:'prestataire',label:"Société de mesure d'audience",type:'text',required:true},
      {key:'client',label:"Client (annonceur ou media)",type:'text',required:true},
      {key:'perimetres_mesures',label:"Périmètres mesurés (TV, digital, radio...)",type:'text',required:true},
      {key:'abonnement_annuel',label:"Abonnement annuel (FCFA)",type:'text',required:true},
      {key:'frequence_rapports',label:"Fréquence des rapports",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — MESURE D'AUDIENCE</h1><p><strong>{{prestataire}}</strong> fournit des services de mesure d'audience à <strong>{{client}}</strong>.</p><h2>Article 1 — Périmètre</h2><p>Mesures couvertes : <strong>{{perimetres_mesures}}</strong>.</p><h2>Article 2 — Rapports</h2><p>Fréquence : <strong>{{frequence_rapports}}</strong>.</p><h2>Article 3 — Abonnement</h2><p>Abonnement annuel : <strong>{{abonnement_annuel}} FCFA</strong>.</p></div>`
  },
  {
    code: 'pub_020', name: "Accord de Service de Veille Réputationnelle (E-réputation)", category: 'commercial_financier',
    price: 7000, priceMax: 21000, description: "Contrat de prestation de veille et de gestion de l'e-réputation d'une entreprise ou d'une personnalité.", templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'agence_veille',label:"Agence de veille / cabinet",type:'text',required:true},
      {key:'client',label:"Client",type:'text',required:true},
      {key:'sujets_veille',label:"Sujets et mots-clés surveillés",type:'textarea',required:true},
      {key:'honoraires_mensuels',label:"Honoraires mensuels (FCFA)",type:'text',required:true},
      {key:'canaux',label:"Canaux surveillés (web, réseaux, presse...)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — VEILLE RÉPUTATIONNELLE</h1><p><strong>{{agence_veille}}</strong> assure la veille e-réputation de <strong>{{client}}</strong>.</p><h2>Article 1 — Périmètre</h2><p>Canaux : <strong>{{canaux}}</strong>. Sujets surveillés : <strong>{{sujets_veille}}</strong>.</p><h2>Article 2 — Honoraires</h2><p>Honoraires mensuels : <strong>{{honoraires_mensuels}} FCFA</strong>.</p><h2>Article 3 — Alertes</h2><p>Toute mention négative significative déclenchera une alerte immédiate au Client.</p></div>`
  },
  {
    code: 'pub_021', name: "Accord de Service de Gestion de Crise de Communication", category: 'commercial_financier',
    price: 12000, priceMax: 36000, description: "Contrat de prestation pour accompagner une entreprise dans la gestion d'une crise de communication.", templateType: 'pdf', classe: 'A', active: true, popularity: 62,
    fieldsJson: F([
      {key:'consultant',label:"Consultant / Cabinet de gestion de crise",type:'text',required:true},
      {key:'client',label:"Entreprise en crise",type:'text',required:true},
      {key:'nature_crise',label:"Nature de la crise",type:'textarea',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true},
      {key:'duree_mission',label:"Durée estimée de la mission",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — GESTION DE CRISE DE COMMUNICATION</h1><p><strong>{{consultant}}</strong> est mandaté en urgence par <strong>{{client}}</strong> pour gérer la crise de communication suivante.</p><h2>Article 1 — Contexte de la crise</h2><p>{{nature_crise}}</p><h2>Article 2 — Mission</h2><p>Le Consultant pilote la stratégie de communication de crise, coordonne les prises de parole et accompagne la direction pour une durée estimée à <strong>{{duree_mission}}</strong>.</p><h2>Article 3 — Honoraires</h2><p>Honoraires : <strong>{{honoraires}} FCFA</strong>.</p><h2>Article 4 — Confidentialité</h2><p>Toutes les informations partagées sont strictement confidentielles.</p></div>`
  },
  {
    code: 'pub_022', name: "Accord de Service d'Étude de Marché (Sondage, Focus Group)", category: 'commercial_financier',
    price: 10000, priceMax: 30000, description: "Contrat de réalisation d'études de marché quantitatives et qualitatives pour un commanditaire.", templateType: 'pdf', classe: 'B', active: true, popularity: 64,
    fieldsJson: F([
      {key:'institut',label:"Institut d'études / Agence de recherche",type:'text',required:true},
      {key:'commanditaire',label:"Commanditaire",type:'text',required:true},
      {key:'objet_etude',label:"Objet de l'étude",type:'textarea',required:true},
      {key:'methodologie',label:"Méthodologie retenue (sondage, focus group...)",type:'text',required:true},
      {key:'budget_etude',label:"Budget de l'étude (FCFA)",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — ÉTUDE DE MARCHÉ</h1><p><strong>{{institut}}</strong> réalise pour <strong>{{commanditaire}}</strong> l'étude suivante.</p><h2>Article 1 — Objet</h2><p>{{objet_etude}}</p><h2>Article 2 — Méthodologie</h2><p>{{methodologie}}</p><h2>Article 3 — Budget et délai</h2><p>Budget : <strong>{{budget_etude}} FCFA</strong>. Livraison du rapport : <strong>{{date_livraison}}</strong>.</p><h2>Article 4 — Propriété des données</h2><p>Le Commanditaire est propriétaire exclusif des résultats et données collectées.</p></div>`
  },
  {
    code: 'pub_023', name: "Rapport de Performance Campagne Publicitaire", category: 'commercial_financier',
    price: 4000, priceMax: 12000, description: "Document de reporting standardisé des KPIs d'une campagne publicitaire multi-supports.", templateType: 'pdf', classe: 'C', active: true, popularity: 68,
    fieldsJson: F([
      {key:'agence',label:"Agence de publicité",type:'text',required:true},
      {key:'annonceur',label:"Annonceur",type:'text',required:true},
      {key:'nom_campagne',label:"Nom de la campagne",type:'text',required:true},
      {key:'periode',label:"Période d'analyse",type:'text',required:true},
      {key:'synthese_resultats',label:"Synthèse des résultats et KPIs",type:'textarea',required:true},
      {key:'recommandations',label:"Recommandations",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE — CAMPAGNE PUBLICITAIRE</h1><h2>Campagne : {{nom_campagne}}</h2><p>Agence : <strong>{{agence}}</strong> | Annonceur : <strong>{{annonceur}}</strong> | Période : <strong>{{periode}}</strong></p><h2>1. Synthèse des résultats</h2><p>{{synthese_resultats}}</p><h2>2. Recommandations</h2><p>{{recommandations}}</p></div>`
  },
  {
    code: 'pub_024', name: "Plan de Communication Annuel", category: 'commercial_financier',
    price: 8000, priceMax: 24000, description: "Document stratégique définissant les axes, les actions et le budget de communication d'une organisation pour l'année.", templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'organisation',label:"Organisation / Entreprise",type:'text',required:true},
      {key:'annee',label:"Année du plan",type:'text',required:true},
      {key:'objectifs_communication',label:"Objectifs de communication",type:'textarea',required:true},
      {key:'budget_annuel',label:"Budget annuel de communication (FCFA)",type:'text',required:true},
      {key:'axes_prioritaires',label:"Axes prioritaires et actions clés",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE COMMUNICATION ANNUEL {{annee}}</h1><h2>Organisation : {{organisation}}</h2><h2>1. Objectifs de communication</h2><p>{{objectifs_communication}}</p><h2>2. Axes prioritaires et actions</h2><p>{{axes_prioritaires}}</p><h2>3. Budget</h2><p>Budget annuel alloué : <strong>{{budget_annuel}} FCFA</strong>.</p><h2>4. Calendrier</h2><p>Un planning détaillé est joint en annexe.</p></div>`
  },
  {
    code: 'pub_025', name: "Charte de la Publicité Responsable et Éthique", category: 'commercial_financier',
    price: 5000, priceMax: 15000, description: "Document engageant une organisation à respecter des standards éthiques dans ses pratiques publicitaires.", templateType: 'pdf', classe: 'C', active: true, popularity: 44,
    fieldsJson: F([
      {key:'organisation',label:"Organisation signataire",type:'text',required:true},
      {key:'representant',label:"Représentant légal",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
      {key:'engagements_specifiques',label:"Engagements spécifiques de l'organisation",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE LA PUBLICITÉ RESPONSABLE ET ÉTHIQUE</h1><p><strong>{{organisation}}</strong>, représentée par <strong>{{representant}}</strong>, adopte la présente Charte le <strong>{{date_signature}}</strong>.</p><h2>Préambule</h2><p>Consciente de l'influence de la publicité sur les comportements et les valeurs, notre organisation s'engage à promouvoir une communication honnête, respectueuse et socialement responsable.</p><h2>Article 1 — Véracité</h2><p>Toute publicité doit être véridique et ne pas induire le consommateur en erreur.</p><h2>Article 2 — Dignité</h2><p>Aucune publicité ne doit porter atteinte à la dignité humaine, ni véhiculer des stéréotypes négatifs.</p><h2>Article 3 — Protection des mineurs</h2><p>Nos publicités ne ciblent pas les mineurs pour des produits inadaptés à leur âge.</p><h2>Article 4 — Engagements</h2><p>{{engagements_specifiques}}</p></div>`
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
  console.log(`Batch 87a OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
