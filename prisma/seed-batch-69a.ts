import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ─── INDUSTRIE TEXTILE / CONFECTION (text2_) ───────────────────────────────
  {
    code: 'text2_filature_coton', name: "Contrat de service de filature de coton",
    category: 'commercial_financier', price: 5000, priceMax: 15000,
    description: "Contrat encadrant la prestation de filature de coton brut en fil textile, selon les normes OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'filateur',label:"Raison sociale du filateur",type:'text',required:true},
      {key:'donneur',label:"Raison sociale du donneur d'ordre",type:'text',required:true},
      {key:'quantite',label:"Quantité de coton brut (kg)",type:'text',required:true},
      {key:'titre_fil',label:"Titre du fil souhaité (Ne)",type:'text',required:true},
      {key:'delai',label:"Délai de livraison",type:'text',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE FILATURE DE COTON</h1>
<p>Entre <strong>{{filateur}}</strong> (ci-après «&nbsp;le Filateur&nbsp;»)<br/>
et <strong>{{donneur}}</strong> (ci-après «&nbsp;le Donneur d'ordre&nbsp;»),</p>
<p>il est convenu ce qui suit :</p>
<h2>classe 1 – Objet</h2>
<p>Le Filateur s'engage à transformer <strong>{{quantite}} kg</strong> de coton brut en fil de titre <strong>{{titre_fil}}</strong> selon les spécifications techniques annexées.</p>
<h2>classe 2 – Délai</h2>
<p>La livraison interviendra au plus tard le <strong>{{delai}}</strong> à compter de la réception de la matière première.</p>
<h2>classe 3 – Droit applicable</h2>
<p>Le présent contrat est régi par l'Acte uniforme OHADA relatif au droit commercial général.</p>
<p>Fait le <strong>{{date_contrat}}</strong>.</p>
<p>Signature du Filateur&nbsp;: _________________ &nbsp;&nbsp; Signature du Donneur d'ordre&nbsp;: _________________</p></div>`
  },
  {
    code: 'text2_tissage_industriel', name: "Accord de service de tissage industriel",
    category: 'commercial_financier', price: 5000, priceMax: 14000,
    description: "Accord encadrant la prestation de tissage industriel de fils en tissu écru ou fini.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'tisseur',label:"Raison sociale du tisseur",type:'text',required:true},
      {key:'client',label:"Raison sociale du client",type:'text',required:true},
      {key:'type_tissu',label:"Type de tissu à produire",type:'text',required:true},
      {key:'quantite_metres',label:"Quantité en mètres linéaires",type:'text',required:true},
      {key:'delai',label:"Délai de livraison",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TISSAGE INDUSTRIEL</h1>
<p>Entre <strong>{{tisseur}}</strong> (le Prestataire) et <strong>{{client}}</strong> (le Client),</p>
<p>il est convenu ce qui suit :</p>
<h2>classe 1 – Objet</h2>
<p>Le Prestataire s'engage à tisser <strong>{{quantite_metres}} mètres</strong> de <strong>{{type_tissu}}</strong> conformément aux échantillons validés par le Client.</p>
<h2>classe 2 – Délai</h2>
<p>Livraison prévue : <strong>{{delai}}</strong>.</p>
<h2>classe 3 – Qualité</h2>
<p>Le tissu produit devra satisfaire aux tests de solidité des coloris et de résistance à la traction définis en annexe.</p>
<h2>classe 4 – Droit applicable</h2>
<p>Acte uniforme OHADA relatif au droit commercial général.</p>
<p>Fait le <strong>{{date_accord}}</strong>.</p>
<p>Signatures&nbsp;: _________________ / _________________</p></div>`
  },
  {
    code: 'text2_teinture_impression', name: "Accord de service de teinture et impression textile",
    category: 'commercial_financier', price: 4500, priceMax: 13000,
    description: "Accord de prestation de teinture et d'impression sur tissu en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'prestataire',label:"Nom du prestataire",type:'text',required:true},
      {key:'client',label:"Nom du client",type:'text',required:true},
      {key:'type_impression',label:"Type d'impression (sérigraphie, numérique…)",type:'text',required:true},
      {key:'quantite',label:"Quantité (mètres ou pièces)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TEINTURE ET IMPRESSION TEXTILE</h1>
<p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong>,</p>
<h2>classe 1 – Objet</h2>
<p>Le Prestataire effectue des opérations de teinture et d'impression (<strong>{{type_impression}}</strong>) sur <strong>{{quantite}}</strong> selon les motifs validés.</p>
<h2>classe 2 – Solidité des coloris</h2>
<p>Le Prestataire garantit une solidité des coloris conforme aux normes ISO applicables (lavage, lumière, frottement).</p>
<h2>classe 3 – Responsabilité</h2>
<p>Toute non-conformité entraîne la reprise aux frais exclusifs du Prestataire.</p>
<p>Fait le <strong>{{date_accord}}</strong>. Signatures&nbsp;: _________________ / _________________</p></div>`
  },
  {
    code: 'text2_confection_faconnage', name: "Accord de service de confection de vêtements (façonnage)",
    category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Accord de façonnage de vêtements en coupe-couture industrielle ou semi-industrielle.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'facconnier',label:"Nom du façonnier",type:'text',required:true},
      {key:'donneur',label:"Donneur d'ordre",type:'text',required:true},
      {key:'modele',label:"Référence modèle / collection",type:'text',required:true},
      {key:'quantite_pieces',label:"Nombre de pièces",type:'text',required:true},
      {key:'prix_unitaire',label:"Prix unitaire de façon (FCFA)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CONFECTION DE VÊTEMENTS (FAÇONNAGE)</h1>
<p>Entre <strong>{{facconnier}}</strong> (le Façonnier) et <strong>{{donneur}}</strong> (le Donneur d'ordre),</p>
<h2>classe 1 – Objet</h2>
<p>Confection de <strong>{{quantite_pieces}} pièces</strong> du modèle <strong>{{modele}}</strong> à partir des matières fournies par le Donneur d'ordre.</p>
<h2>classe 2 – Rémunération</h2>
<p>Prix unitaire de façon : <strong>{{prix_unitaire}} FCFA</strong>.</p>
<h2>classe 3 – Contrôle qualité</h2>
<p>Un contrôle qualité contradictoire est effectué à la livraison. Les pièces non conformes sont reprises sans frais.</p>
<p>Fait le <strong>{{date_accord}}</strong>. Signatures&nbsp;: _________________ / _________________</p></div>`
  },
  {
    code: 'text2_broderie_machine', name: "Accord de service de broderie machine industrielle",
    category: 'commercial_financier', price: 3500, priceMax: 10000,
    description: "Accord de prestation de broderie machine sur vêtements ou textiles promotionnels.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 55,
    fieldsJson: F([
      {key:'brodeur',label:"Nom de l'atelier de broderie",type:'text',required:true},
      {key:'client',label:"Nom du client",type:'text',required:true},
      {key:'motif',label:"Description du motif / logo",type:'text',required:true},
      {key:'quantite',label:"Nombre de pièces à broder",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE BRODERIE MACHINE INDUSTRIELLE</h1>
<p>Entre <strong>{{brodeur}}</strong> et <strong>{{client}}</strong>,</p>
<h2>classe 1 – Objet</h2>
<p>Broderie du motif «&nbsp;<strong>{{motif}}</strong>&nbsp;» sur <strong>{{quantite}}</strong> pièces fournies par le client.</p>
<h2>classe 2 – Propriété du motif</h2>
<p>Le fichier numérique du motif reste la propriété exclusive du Client. Le Prestataire s'interdit toute utilisation à des fins tierces.</p>
<h2>classe 3 – Délai</h2>
<p>Délai convenu entre les parties par bon de commande annexé.</p>
<p>Fait le <strong>{{date_accord}}</strong>. Signatures&nbsp;: _________________ / _________________</p></div>`
  },
  {
    code: 'text2_pagne_wax', name: "Accord de service de production de pagne wax (modèle)",
    category: 'commercial_financier', price: 6000, priceMax: 18000,
    description: "Accord de production de pagne wax à motif exclusif pour marque ou distributeur.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'fabricant',label:"Nom du fabricant",type:'text',required:true},
      {key:'marque',label:"Nom de la marque commanditaire",type:'text',required:true},
      {key:'reference_motif',label:"Référence du motif exclusif",type:'text',required:true},
      {key:'tirage',label:"Tirage (mètres)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRODUCTION DE PAGNE WAX</h1>
<p>Entre <strong>{{fabricant}}</strong> (le Fabricant) et <strong>{{marque}}</strong> (la Marque),</p>
<h2>classe 1 – Objet</h2>
<p>Production d'un tirage de <strong>{{tirage}} mètres</strong> de pagne wax à motif exclusif référence <strong>{{reference_motif}}</strong>.</p>
<h2>classe 2 – Exclusivité</h2>
<p>Le Fabricant s'engage à ne produire ni commercialiser ce motif pour un tiers sans accord écrit de la Marque.</p>
<h2>classe 3 – Qualité</h2>
<p>Solidité des coloris garantie minimum note 4 sur l'échelle de gris ISO 105.</p>
<p>Fait le <strong>{{date_accord}}</strong>. Signatures&nbsp;: _________________ / _________________</p></div>`
  },
  {
    code: 'text2_pagne_bazin', name: "Accord de service de production de pagne bazin",
    category: 'commercial_financier', price: 5500, priceMax: 16000,
    description: "Accord de production et de finition de bazin riche à destination du marché ouest-africain.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'fabricant',label:"Nom du fabricant",type:'text',required:true},
      {key:'client',label:"Nom du client / grossiste",type:'text',required:true},
      {key:'qualite',label:"Qualité de bazin (Riche, Getzner, etc.)",type:'text',required:true},
      {key:'quantite',label:"Quantité commandée (mètres ou pièces)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRODUCTION DE PAGNE BAZIN</h1>
<p>Entre <strong>{{fabricant}}</strong> et <strong>{{client}}</strong>,</p>
<h2>classe 1 – Objet</h2>
<p>Production de <strong>{{quantite}}</strong> de bazin qualité <strong>{{qualite}}</strong> selon les spécifications techniques définies en annexe.</p>
<h2>classe 2 – Finition</h2>
<p>Le tissu est livré repassé, plié et emballé selon les standards de présentation du marché ivoirien.</p>
<h2>classe 3 – Garantie</h2>
<p>Garantie de non-déteinte au premier lavage à 30 °C.</p>
<p>Fait le <strong>{{date_accord}}</strong>. Signatures&nbsp;: _________________ / _________________</p></div>`
  },
  {
    code: 'text2_uniformes_pro', name: "Accord de service de production de tenues professionnelles (uniformes)",
    category: 'commercial_financier', price: 4500, priceMax: 13000,
    description: "Accord de confection d'uniformes professionnels pour entreprises, hôtels ou administrations.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'confectionneur',label:"Nom du confectionneur",type:'text',required:true},
      {key:'entreprise',label:"Nom de l'entreprise cliente",type:'text',required:true},
      {key:'type_tenue',label:"Type de tenue / poste concerné",type:'text',required:true},
      {key:'effectif',label:"Nombre d'uniformes",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRODUCTION DE TENUES PROFESSIONNELLES</h1>
<p>Entre <strong>{{confectionneur}}</strong> et <strong>{{entreprise}}</strong>,</p>
<h2>classe 1 – Objet</h2>
<p>Confection de <strong>{{effectif}}</strong> tenues de type <strong>{{type_tenue}}</strong> aux couleurs et spécifications de l'entreprise cliente.</p>
<h2>classe 2 – Livraison</h2>
<p>Livraison complète au plus tard le <strong>{{date_livraison}}</strong>.</p>
<h2>classe 3 – Garantie</h2>
<p>Garantie couture 6 mois à compter de la date de livraison.</p>
<p>Signatures&nbsp;: _________________ / _________________</p></div>`
  },
  {
    code: 'text2_tenues_scolaires', name: "Accord de service de production de tenues scolaires",
    category: 'commercial_financier', price: 3500, priceMax: 10000,
    description: "Accord de confection de tenues scolaires réglementaires pour établissements scolaires ivoiriens.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 66,
    fieldsJson: F([
      {key:'confectionneur',label:"Nom du confectionneur",type:'text',required:true},
      {key:'etablissement',label:"Nom de l'établissement scolaire",type:'text',required:true},
      {key:'modele',label:"Modèle de tenue (description)",type:'text',required:true},
      {key:'quantite',label:"Nombre de tenues",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRODUCTION DE TENUES SCOLAIRES</h1>
<p>Entre <strong>{{confectionneur}}</strong> et <strong>{{etablissement}}</strong>,</p>
<h2>classe 1 – Objet</h2>
<p>Production de <strong>{{quantite}}</strong> tenues scolaires modèle <strong>{{modele}}</strong> conformes aux directives du Ministère de l'Éducation Nationale.</p>
<h2>classe 2 – Tissu</h2>
<p>Tissu résistant, lavable à 40 °C, non déformant, fourni par le confectionneur.</p>
<h2>classe 3 – Contrôle</h2>
<p>Un échantillon validé par l'établissement sert de référence qualité.</p>
<p>Fait le <strong>{{date_accord}}</strong>. Signatures&nbsp;: _________________ / _________________</p></div>`
  },
  {
    code: 'text2_tenues_sportives', name: "Accord de service de production de tenues sportives",
    category: 'commercial_financier', price: 3500, priceMax: 10000,
    description: "Accord de confection de maillots, shorts et équipements sportifs pour clubs ou fédérations.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 60,
    fieldsJson: F([
      {key:'confectionneur',label:"Nom du confectionneur",type:'text',required:true},
      {key:'club',label:"Nom du club / fédération",type:'text',required:true},
      {key:'type_sport',label:"Sport concerné",type:'text',required:true},
      {key:'quantite',label:"Nombre de kits",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRODUCTION DE TENUES SPORTIVES</h1>
<p>Entre <strong>{{confectionneur}}</strong> et <strong>{{club}}</strong>,</p>
<h2>classe 1 – Objet</h2>
<p>Confection de <strong>{{quantite}}</strong> kits sportifs pour la discipline <strong>{{type_sport}}</strong> aux couleurs et logos du club.</p>
<h2>classe 2 – Matière</h2>
<p>Tissu technique (polyester recyclé ou microfibre) favorisant l'évacuation de l'humidité.</p>
<h2>classe 3 – Marquage</h2>
<p>Le flocage numéros, noms et logos est inclus dans la prestation.</p>
<p>Fait le <strong>{{date_accord}}</strong>. Signatures&nbsp;: _________________ / _________________</p></div>`
  },
  {
    code: 'text2_literie_maison', name: "Accord de service de production de literie et textiles maison",
    category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Accord de production de draps, couettes, serviettes et articles textiles de maison.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 55,
    fieldsJson: F([
      {key:'fabricant',label:"Nom du fabricant",type:'text',required:true},
      {key:'acheteur',label:"Nom de l'acheteur / distributeur",type:'text',required:true},
      {key:'type_article',label:"Type d'article (draps, serviettes…)",type:'text',required:true},
      {key:'quantite',label:"Quantité",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRODUCTION DE LITERIE ET TEXTILES MAISON</h1>
<p>Entre <strong>{{fabricant}}</strong> et <strong>{{acheteur}}</strong>,</p>
<h2>classe 1 – Objet</h2>
<p>Production de <strong>{{quantite}}</strong> articles de type <strong>{{type_article}}</strong> selon les fiches techniques validées.</p>
<h2>classe 2 – Normes</h2>
<p>Les produits sont conformes aux normes de sécurité textile en vigueur en Côte d'Ivoire et dans l'espace UEMOA.</p>
<h2>classe 3 – Conditionnement</h2>
<p>Emballage individuel avec étiquette composition et entretien.</p>
<p>Fait le <strong>{{date_accord}}</strong>. Signatures&nbsp;: _________________ / _________________</p></div>`
  },
  {
    code: 'text2_sacs_tissu', name: "Accord de service de production de sacs en tissu",
    category: 'commercial_financier', price: 3000, priceMax: 9000,
    description: "Accord de production de sacs en tissu recyclé, tote bags ou sacs promotionnels.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 52,
    fieldsJson: F([
      {key:'fabricant',label:"Nom du fabricant",type:'text',required:true},
      {key:'client',label:"Nom du client",type:'text',required:true},
      {key:'modele_sac',label:"Modèle de sac (dimensions, anses…)",type:'text',required:true},
      {key:'quantite',label:"Quantité",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRODUCTION DE SACS EN TISSU</h1>
<p>Entre <strong>{{fabricant}}</strong> et <strong>{{client}}</strong>,</p>
<h2>classe 1 – Objet</h2>
<p>Production de <strong>{{quantite}}</strong> sacs en tissu selon le modèle <strong>{{modele_sac}}</strong> avec impression du logo client.</p>
<h2>classe 2 – Matière</h2>
<p>Tissu non-tissé, coton ou jute selon devis accepté.</p>
<h2>classe 3 – Délai</h2>
<p>Délai convenu par bon de commande annexé.</p>
<p>Fait le <strong>{{date_accord}}</strong>. Signatures&nbsp;: _________________ / _________________</p></div>`
  },
  {
    code: 'text2_licence_marque_mode', name: "Accord de licence de marque de mode africaine",
    category: 'commercial_financier', price: 7000, priceMax: 20000,
    description: "Accord de licence d'exploitation d'une marque de mode africaine pour fabrication et distribution.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'concedant',label:"Nom du concédant (propriétaire de la marque)",type:'text',required:true},
      {key:'licencie',label:"Nom du licencié",type:'text',required:true},
      {key:'marque',label:"Dénomination de la marque",type:'text',required:true},
      {key:'territoire',label:"Territoire de la licence",type:'text',required:true},
      {key:'duree',label:"Durée de la licence (années)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE LICENCE DE MARQUE DE MODE AFRICAINE</h1>
<p>Entre <strong>{{concedant}}</strong> (le Concédant) et <strong>{{licencie}}</strong> (le Licencié),</p>
<h2>classe 1 – Objet</h2>
<p>Le Concédant accorde au Licencié le droit d'utiliser la marque <strong>{{marque}}</strong> sur le territoire de <strong>{{territoire}}</strong> pour une durée de <strong>{{duree}} an(s)</strong>.</p>
<h2>classe 2 – Redevance</h2>
<p>Le Licencié versera une redevance selon les modalités définies en annexe financière.</p>
<h2>classe 3 – Contrôle qualité</h2>
<p>Le Concédant se réserve le droit de contrôler la qualité des produits commercialisés sous la marque.</p>
<h2>classe 4 – Droit applicable</h2>
<p>Droit ivoirien et règlement OAPI pour la propriété intellectuelle.</p>
<p>Fait le <strong>{{date_accord}}</strong>. Signatures&nbsp;: _________________ / _________________</p></div>`
  },
  {
    code: 'text2_distribution_vetements', name: "Accord de distribution de vêtements (grossiste)",
    category: 'commercial_financier', price: 5000, priceMax: 15000,
    description: "Accord de distribution exclusive ou non exclusive de vêtements entre fabricant et grossiste.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'fournisseur',label:"Nom du fournisseur / fabricant",type:'text',required:true},
      {key:'distributeur',label:"Nom du distributeur grossiste",type:'text',required:true},
      {key:'zone',label:"Zone de distribution",type:'text',required:true},
      {key:'exclusivite',label:"Exclusivité (oui / non)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE DISTRIBUTION DE VÊTEMENTS (GROSSISTE)</h1>
<p>Entre <strong>{{fournisseur}}</strong> et <strong>{{distributeur}}</strong>,</p>
<h2>classe 1 – Objet</h2>
<p>Le Fournisseur confie au Distributeur la commercialisation en gros de ses collections sur la zone : <strong>{{zone}}</strong>. Exclusivité : <strong>{{exclusivite}}</strong>.</p>
<h2>classe 2 – Commandes minimales</h2>
<p>Le Distributeur s'engage sur un volume minimum d'achats défini en annexe commerciale.</p>
<h2>classe 3 – Prix et conditions</h2>
<p>Les prix et conditions de paiement figurent dans la grille tarifaire annexée, révisable chaque saison.</p>
<p>Fait le <strong>{{date_accord}}</strong>. Signatures&nbsp;: _________________ / _________________</p></div>`
  },
  {
    code: 'text2_franchise_mode', name: "Accord de franchise boutique de mode",
    category: 'commercial_financier', price: 8000, priceMax: 24000,
    description: "Accord de franchise pour l'ouverture et l'exploitation d'une boutique de mode sous enseigne.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'franchiseur',label:"Nom du franchiseur",type:'text',required:true},
      {key:'franchise',label:"Nom du franchisé",type:'text',required:true},
      {key:'enseigne',label:"Enseigne / marque",type:'text',required:true},
      {key:'ville',label:"Ville d'implantation",type:'text',required:true},
      {key:'droit_entree',label:"Droit d'entrée (FCFA)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE FRANCHISE BOUTIQUE DE MODE</h1>
<p>Entre <strong>{{franchiseur}}</strong> (le Franchiseur) et <strong>{{franchise}}</strong> (le Franchisé),</p>
<h2>classe 1 – Objet</h2>
<p>Le Franchiseur accorde le droit d'exploiter une boutique sous l'enseigne <strong>{{enseigne}}</strong> à <strong>{{ville}}</strong>.</p>
<h2>classe 2 – Droit d'entrée</h2>
<p>Le Franchisé s'acquitte d'un droit d'entrée de <strong>{{droit_entree}} FCFA</strong> à la signature.</p>
<h2>classe 3 – Redevances</h2>
<p>Redevance de fonctionnement et contribution publicitaire selon annexe financière.</p>
<h2>classe 4 – Obligations du Franchisé</h2>
<p>Respecter le concept, le manuel opératoire et les standards visuels définis par le Franchiseur.</p>
<p>Fait le <strong>{{date_accord}}</strong>. Signatures&nbsp;: _________________ / _________________</p></div>`
  },
  {
    code: 'text2_stylisme_design', name: "Accord de service de stylisme et design de mode",
    category: 'commercial_financier', price: 4500, priceMax: 13000,
    description: "Accord de prestation de stylisme, création de collections et design de mode africaine.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'styliste',label:"Nom du styliste / studio créatif",type:'text',required:true},
      {key:'maison',label:"Nom de la maison de mode / marque",type:'text',required:true},
      {key:'collection',label:"Nom / thème de la collection",type:'text',required:true},
      {key:'nombre_pieces',label:"Nombre de silhouettes à créer",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE STYLISME ET DESIGN DE MODE</h1>
<p>Entre <strong>{{styliste}}</strong> et <strong>{{maison}}</strong>,</p>
<h2>classe 1 – Objet</h2>
<p>Le Styliste conçoit <strong>{{nombre_pieces}} silhouettes</strong> pour la collection «&nbsp;<strong>{{collection}}</strong>&nbsp;».</p>
<h2>classe 2 – Cession de droits</h2>
<p>Les créations sont cédées à titre exclusif à la Maison de mode pour exploitation commerciale, moyennant la rémunération définie en annexe.</p>
<h2>classe 3 – Confidentialité</h2>
<p>Les croquis et prototypes restent confidentiels jusqu'à la date de présentation officielle.</p>
<p>Fait le <strong>{{date_accord}}</strong>. Signatures&nbsp;: _________________ / _________________</p></div>`
  },
  {
    code: 'text2_photo_mode', name: "Accord de service de photographie de mode (lookbook)",
    category: 'commercial_financier', price: 3500, priceMax: 10000,
    description: "Accord de prestation photographique pour la réalisation d'un lookbook de collection.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 58,
    fieldsJson: F([
      {key:'photographe',label:"Nom du photographe / studio",type:'text',required:true},
      {key:'client',label:"Nom du client (maison de mode)",type:'text',required:true},
      {key:'nb_visuels',label:"Nombre de visuels finalisés",type:'text',required:true},
      {key:'date_shoot',label:"Date de la prise de vue",type:'date',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PHOTOGRAPHIE DE MODE (LOOKBOOK)</h1>
<p>Entre <strong>{{photographe}}</strong> et <strong>{{client}}</strong>,</p>
<h2>classe 1 – Objet</h2>
<p>Réalisation de <strong>{{nb_visuels}}</strong> visuels finalisés lors de la séance du <strong>{{date_shoot}}</strong>.</p>
<h2>classe 2 – Cession de droits</h2>
<p>Le Client bénéficie d'une licence d'exploitation des clichés pour tous supports de communication pendant 3 ans.</p>
<h2>classe 3 – Crédit photo</h2>
<p>Le nom du photographe sera mentionné sur tous les supports imprimés.</p>
<p>Fait le <strong>{{date_accord}}</strong>. Signatures&nbsp;: _________________ / _________________</p></div>`
  },
  {
    code: 'text2_defile_mode', name: "Accord de service de défilé de mode (fashion show)",
    category: 'commercial_financier', price: 5000, priceMax: 15000,
    description: "Accord d'organisation et de production d'un défilé de mode en Afrique de l'Ouest.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'organisateur',label:"Nom de l'organisateur",type:'text',required:true},
      {key:'maison',label:"Nom de la maison de mode",type:'text',required:true},
      {key:'lieu',label:"Lieu du défilé",type:'text',required:true},
      {key:'date_defile',label:"Date du défilé",type:'date',required:true},
      {key:'budget',label:"Budget de production (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DÉFILÉ DE MODE (FASHION SHOW)</h1>
<p>Entre <strong>{{organisateur}}</strong> et <strong>{{maison}}</strong>,</p>
<h2>classe 1 – Objet</h2>
<p>Organisation d'un défilé de mode au <strong>{{lieu}}</strong> le <strong>{{date_defile}}</strong>.</p>
<h2>classe 2 – Budget</h2>
<p>Budget de production alloué : <strong>{{budget}} FCFA</strong> TTC, détaillé en annexe budgétaire.</p>
<h2>classe 3 – Prestations incluses</h2>
<p>Scénographie, casting modèles, son et lumière, relations presse, gestion du déroulé.</p>
<h2>classe 4 – Droits image</h2>
<p>Les images et vidéos du défilé peuvent être exploitées par les deux parties avec mention mutuelle.</p>
<p>Signatures&nbsp;: _________________ / _________________</p></div>`
  },
  {
    code: 'text2_maroquinerie', name: "Accord de service de production de maroquinerie haut de gamme",
    category: 'commercial_financier', price: 6000, priceMax: 18000,
    description: "Accord de production artisanale ou industrielle de maroquinerie haut de gamme.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'maroquinier',label:"Nom du maroquinier",type:'text',required:true},
      {key:'donneur',label:"Donneur d'ordre / marque",type:'text',required:true},
      {key:'type_article',label:"Type d'article (sac, ceinture, portefeuille…)",type:'text',required:true},
      {key:'quantite',label:"Quantité",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRODUCTION DE MAROQUINERIE HAUT DE GAMME</h1>
<p>Entre <strong>{{maroquinier}}</strong> et <strong>{{donneur}}</strong>,</p>
<h2>classe 1 – Objet</h2>
<p>Production de <strong>{{quantite}}</strong> articles de type <strong>{{type_article}}</strong> en cuir pleine fleur ou matières alternatives validées.</p>
<h2>classe 2 – Qualité</h2>
<p>Chaque pièce est soumise à un contrôle qualité individuel : couture, finitions, ferrures.</p>
<h2>classe 3 – Traçabilité</h2>
<p>Le cuir utilisé provient de sources certifiées sans travail forcé ni déforestation.</p>
<p>Fait le <strong>{{date_accord}}</strong>. Signatures&nbsp;: _________________ / _________________</p></div>`
  },
  {
    code: 'text2_couture_mesure', name: "Accord de service de couture sur mesure (atelier)",
    category: 'commercial_financier', price: 2500, priceMax: 7500,
    description: "Accord de prestation de couture sur mesure pour particuliers ou entreprises.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 70,
    fieldsJson: F([
      {key:'couturier',label:"Nom de l'atelier / couturier",type:'text',required:true},
      {key:'client',label:"Nom du client",type:'text',required:true},
      {key:'description_commande',label:"Description de la commande",type:'textarea',required:true},
      {key:'date_essayage',label:"Date d'essayage",type:'date',required:true},
      {key:'date_livraison',label:"Date de livraison",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE COUTURE SUR MESURE</h1>
<p>Entre <strong>{{couturier}}</strong> et <strong>{{client}}</strong>,</p>
<h2>classe 1 – Commande</h2>
<p>{{description_commande}}</p>
<h2>classe 2 – Essayage</h2>
<p>Un essayage intermédiaire est prévu le <strong>{{date_essayage}}</strong> pour validation des ajustements.</p>
<h2>classe 3 – Livraison</h2>
<p>La tenue est livrée définitivement le <strong>{{date_livraison}}</strong>.</p>
<h2>classe 4 – Acompte</h2>
<p>Un acompte de 50 % est versé à la commande, le solde à la livraison.</p>
<p>Signatures&nbsp;: _________________ / _________________</p></div>`
  },
  {
    code: 'text2_certification_oeko', name: "Accord de service de certification textile (OEKO-TEX)",
    category: 'commercial_financier', price: 5000, priceMax: 15000,
    description: "Accord d'accompagnement à la certification OEKO-TEX pour une unité textile.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'consultant',label:"Nom du cabinet conseil",type:'text',required:true},
      {key:'entreprise',label:"Nom de l'entreprise textile",type:'text',required:true},
      {key:'norme',label:"Norme visée (OEKO-TEX Standard 100, STeP…)",type:'text',required:true},
      {key:'duree_mission',label:"Durée de la mission (mois)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CERTIFICATION TEXTILE (OEKO-TEX)</h1>
<p>Entre <strong>{{consultant}}</strong> et <strong>{{entreprise}}</strong>,</p>
<h2>classe 1 – Objet</h2>
<p>Le Cabinet accompagne l'entreprise dans l'obtention de la certification <strong>{{norme}}</strong> sur une durée de <strong>{{duree_mission}} mois</strong>.</p>
<h2>classe 2 – Prestations</h2>
<p>Audit initial, plan de mise en conformité, formation du personnel, assistance audit de certification.</p>
<h2>classe 3 – Obligations de l'entreprise</h2>
<p>Fournir l'accès aux locaux, aux fiches techniques et aux fournisseurs de matières premières.</p>
<p>Fait le <strong>{{date_accord}}</strong>. Signatures&nbsp;: _________________ / _________________</p></div>`
  },
  {
    code: 'text2_partenariat_coton', name: "Accord de partenariat producteur coton-confectionneur",
    category: 'commercial_financier', price: 6000, priceMax: 18000,
    description: "Accord de partenariat amont-aval entre producteur de coton et confectionneur textile.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'producteur',label:"Nom du producteur de coton / coopérative",type:'text',required:true},
      {key:'confectionneur',label:"Nom du confectionneur",type:'text',required:true},
      {key:'volume_annuel',label:"Volume annuel de coton (tonnes)",type:'text',required:true},
      {key:'prix_convenu',label:"Prix convenu par kg (FCFA)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT PRODUCTEUR COTON – CONFECTIONNEUR</h1>
<p>Entre <strong>{{producteur}}</strong> et <strong>{{confectionneur}}</strong>,</p>
<h2>classe 1 – Objet</h2>
<p>Partenariat d'approvisionnement exclusif portant sur <strong>{{volume_annuel}} tonnes</strong> de coton brut par an au prix de <strong>{{prix_convenu}} FCFA/kg</strong>.</p>
<h2>classe 2 – Traçabilité</h2>
<p>Le Producteur fournit un certificat d'origine et un rapport de résidus phytosanitaires par lot.</p>
<h2>classe 3 – Financement</h2>
<p>Le Confectionneur peut accorder une avance de campagne selon les modalités définies en annexe.</p>
<p>Fait le <strong>{{date_accord}}</strong>. Signatures&nbsp;: _________________ / _________________</p></div>`
  },
  {
    code: 'text2_rapport_performance_usine', name: "Rapport de performance usine textile",
    category: 'commercial_financier', price: 3000, priceMax: 8000,
    description: "Rapport périodique de performance d'une usine textile (productivité, qualité, RH).",
    templateType: 'pdf', classe: 'C', active: true, popularity: 50,
    fieldsJson: F([
      {key:'usine',label:"Nom de l'usine",type:'text',required:true},
      {key:'periode',label:"Période couverte",type:'text',required:true},
      {key:'production_realisee',label:"Production réalisée (unités ou mètres)",type:'text',required:true},
      {key:'taux_rebuts',label:"Taux de rebuts (%)",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE USINE TEXTILE</h1>
<h2>Usine : {{usine}} — Période : {{periode}}</h2>
<h2>1. Production</h2>
<p>Production réalisée : <strong>{{production_realisee}}</strong></p>
<h2>2. Qualité</h2>
<p>Taux de rebuts : <strong>{{taux_rebuts}} %</strong></p>
<h2>3. Actions correctives</h2>
<p>Les non-conformités identifiées font l'objet d'un plan d'action défini en annexe.</p>
<p>Rapport établi le <strong>{{date_rapport}}</strong>.</p></div>`
  },
  {
    code: 'text2_plan_dev_textile', name: "Plan de développement industrie textile",
    category: 'commercial_financier', price: 5000, priceMax: 15000,
    description: "Document de planification stratégique pour le développement d'une unité industrielle textile.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'entreprise',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'horizon',label:"Horizon du plan (ex. 2025-2030)",type:'text',required:true},
      {key:'objectif_production',label:"Objectif de production cible",type:'text',required:true},
      {key:'investissement',label:"Investissement prévu (FCFA)",type:'text',required:true},
      {key:'date_doc',label:"Date du document",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT INDUSTRIE TEXTILE</h1>
<h2>Entreprise : {{entreprise}} — Horizon : {{horizon}}</h2>
<h2>1. Vision stratégique</h2>
<p>Objectif de production cible : <strong>{{objectif_production}}</strong>.</p>
<h2>2. Plan d'investissement</h2>
<p>Investissement global prévu : <strong>{{investissement}} FCFA</strong>, réparti sur la durée du plan.</p>
<h2>3. Axes de développement</h2>
<p>Modernisation des équipements, montée en compétence des équipes, certification internationale, développement des marchés export.</p>
<p>Document établi le <strong>{{date_doc}}</strong>.</p></div>`
  },
  {
    code: 'text2_charte_mode_durable', name: "Charte de la mode africaine durable et éthique",
    category: 'commercial_financier', price: 2500, priceMax: 7000,
    description: "Charte d'engagement pour une mode africaine respectueuse de l'environnement et des droits sociaux.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 58,
    fieldsJson: F([
      {key:'signataire',label:"Nom de l'entreprise signataire",type:'text',required:true},
      {key:'representant',label:"Nom du représentant légal",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE LA MODE AFRICAINE DURABLE ET ÉTHIQUE</h1>
<p>La société <strong>{{signataire}}</strong>, représentée par <strong>{{representant}}</strong>, s'engage à :</p>
<h2>classe 1 – Environnement</h2>
<p>Réduire l'empreinte hydrique et carbone de sa production, utiliser des matières premières issues de l'agriculture biologique ou recyclées.</p>
<h2>classe 2 – Social</h2>
<p>Garantir des conditions de travail décentes, des salaires équitables et l'interdiction du travail des enfants dans toute la chaîne de valeur.</p>
<h2>classe 3 – Traçabilité</h2>
<p>Publier annuellement un rapport de responsabilité sociale et environnementale.</p>
<p>Signé le <strong>{{date_signature}}</strong>. Signature&nbsp;: _________________</p></div>`
  },

  // ─── BOULANGERIE / PÂTISSERIE / ALIMENTATION (boul_) ──────────────────────
  {
    code: 'boul_boulangerie_industrielle', name: "Accord de service de boulangerie industrielle (pains)",
    category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Accord de production industrielle de pains de mie, baguettes et pains spéciaux.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'boulanger',label:"Raison sociale de la boulangerie",type:'text',required:true},
      {key:'client',label:"Nom du client (GMS, restauration…)",type:'text',required:true},
      {key:'type_pain',label:"Type de pain commandé",type:'text',required:true},
      {key:'volume_hebdo',label:"Volume hebdomadaire (unités)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE BOULANGERIE INDUSTRIELLE</h1>
<p>Entre <strong>{{boulanger}}</strong> et <strong>{{client}}</strong>,</p>
<h2>classe 1 – Objet</h2>
<p>Production et livraison de <strong>{{volume_hebdo}} unités/semaine</strong> de <strong>{{type_pain}}</strong>.</p>
<h2>classe 2 – Fraîcheur et hygiène</h2>
<p>Les produits sont fabriqués selon les bonnes pratiques d'hygiène (BPH) et livrés le jour de production.</p>
<h2>classe 3 – Emballage</h2>
<p>Emballage hermétique avec DLC et ingrédients conformes à la réglementation alimentaire ivoirienne.</p>
<p>Fait le <strong>{{date_accord}}</strong>. Signatures&nbsp;: _________________ / _________________</p></div>`
  },
  {
    code: 'boul_patisserie_industrielle', name: "Accord de service de pâtisserie industrielle (gâteaux)",
    category: 'commercial_financier', price: 4500, priceMax: 13000,
    description: "Accord de production industrielle de gâteaux, entremets et desserts en grande quantité.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'patissier',label:"Raison sociale de la pâtisserie",type:'text',required:true},
      {key:'client',label:"Nom du client",type:'text',required:true},
      {key:'gamme_produits',label:"Gamme de produits (description)",type:'text',required:true},
      {key:'volume_mensuel',label:"Volume mensuel (unités ou kg)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PÂTISSERIE INDUSTRIELLE</h1>
<p>Entre <strong>{{patissier}}</strong> et <strong>{{client}}</strong>,</p>
<h2>classe 1 – Objet</h2>
<p>Production mensuelle de <strong>{{volume_mensuel}}</strong> articles de la gamme : <strong>{{gamme_produits}}</strong>.</p>
<h2>classe 2 – Conservation</h2>
<p>Les produits respectent la chaîne du froid ou les conditions de conservation à température ambiante selon leur nature.</p>
<h2>classe 3 – Personnalisation</h2>
<p>Des personnalisations (logos, inscriptions) peuvent être réalisées sur commande spécifique.</p>
<p>Fait le <strong>{{date_accord}}</strong>. Signatures&nbsp;: _________________ / _________________</p></div>`
  },
  {
    code: 'boul_viennoiserie_artisanale', name: "Accord de service de viennoiserie artisanale",
    category: 'commercial_financier', price: 3500, priceMax: 10000,
    description: "Accord de production artisanale de croissants, pains au chocolat et viennoiseries.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 60,
    fieldsJson: F([
      {key:'artisan',label:"Nom de l'artisan boulanger",type:'text',required:true},
      {key:'client',label:"Nom du client",type:'text',required:true},
      {key:'references',label:"Références de viennoiseries commandées",type:'text',required:true},
      {key:'frequence',label:"Fréquence de livraison",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE VIENNOISERIE ARTISANALE</h1>
<p>Entre <strong>{{artisan}}</strong> et <strong>{{client}}</strong>,</p>
<h2>classe 1 – Objet</h2>
<p>Production artisanale des viennoiseries suivantes : <strong>{{references}}</strong>, livrées <strong>{{frequence}}</strong>.</p>
<h2>classe 2 – Fabrication</h2>
<p>Produits élaborés au beurre pur, sans additifs artificiels, selon les recettes traditionnelles françaises adaptées au marché ivoirien.</p>
<h2>classe 3 – Commandes</h2>
<p>Les commandes sont passées 24 h à l'avance par tout moyen écrit.</p>
<p>Fait le <strong>{{date_accord}}</strong>. Signatures&nbsp;: _________________ / _________________</p></div>`
  },
  {
    code: 'boul_biscuits_crackers', name: "Accord de service de production de biscuits et crackers",
    category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Accord de production industrielle de biscuits sucrés, crackers et snacks céréaliers.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'fabricant',label:"Nom du fabricant",type:'text',required:true},
      {key:'distributeur',label:"Nom du distributeur",type:'text',required:true},
      {key:'references',label:"Références produits",type:'text',required:true},
      {key:'volume_mensuel',label:"Volume mensuel (tonnes ou caisses)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRODUCTION DE BISCUITS ET CRACKERS</h1>
<p>Entre <strong>{{fabricant}}</strong> et <strong>{{distributeur}}</strong>,</p>
<h2>classe 1 – Objet</h2>
<p>Production de <strong>{{volume_mensuel}}</strong> des références <strong>{{references}}</strong> selon les fiches recettes et spécifications validées.</p>
<h2>classe 2 – Emballage</h2>
<p>Emballage sous atmosphère protectrice avec étiquetage nutritionnel conforme à la norme Codex Alimentarius.</p>
<h2>classe 3 – Hygiène</h2>
<p>Fabrication sous certification HACCP ou engagement de mise en conformité dans les 12 mois.</p>
<p>Fait le <strong>{{date_accord}}</strong>. Signatures&nbsp;: _________________ / _________________</p></div>`
  },
  {
    code: 'boul_confiserie', name: "Accord de service de confiserie (bonbons, chocolats)",
    category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Accord de production de confiseries, bonbons et chocolats artisanaux ou industriels.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 58,
    fieldsJson: F([
      {key:'confiseur',label:"Nom du confiseur / chocolatier",type:'text',required:true},
      {key:'client',label:"Nom du client",type:'text',required:true},
      {key:'gamme',label:"Gamme de produits (description)",type:'text',required:true},
      {key:'quantite',label:"Quantité (kg ou unités)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CONFISERIE (BONBONS, CHOCOLATS)</h1>
<p>Entre <strong>{{confiseur}}</strong> et <strong>{{client}}</strong>,</p>
<h2>classe 1 – Objet</h2>
<p>Production de <strong>{{quantite}}</strong> de la gamme : <strong>{{gamme}}</strong>.</p>
<h2>classe 2 – Ingrédients</h2>
<p>Utilisation de cacao de Côte d'Ivoire certifié, sucre et arômes naturels. Sans OGM.</p>
<h2>classe 3 – Conservation</h2>
<p>Stockage entre 15 et 18 °C à l'abri de l'humidité. DLC minimum 6 mois à la livraison.</p>
<p>Fait le <strong>{{date_accord}}</strong>. Signatures&nbsp;: _________________ / _________________</p></div>`
  },
  {
    code: 'boul_franchise_boulangerie', name: "Accord de franchise boulangerie",
    category: 'commercial_financier', price: 7000, priceMax: 21000,
    description: "Accord de franchise pour l'exploitation d'une boulangerie-pâtisserie sous enseigne.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'franchiseur',label:"Nom du franchiseur",type:'text',required:true},
      {key:'franchise',label:"Nom du franchisé",type:'text',required:true},
      {key:'ville',label:"Ville d'implantation",type:'text',required:true},
      {key:'droit_entree',label:"Droit d'entrée (FCFA)",type:'text',required:true},
      {key:'duree',label:"Durée du contrat (années)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE FRANCHISE BOULANGERIE</h1>
<p>Entre <strong>{{franchiseur}}</strong> et <strong>{{franchise}}</strong>,</p>
<h2>classe 1 – Objet</h2>
<p>Droit d'exploiter une boulangerie sous l'enseigne du Franchiseur à <strong>{{ville}}</strong> pour <strong>{{duree}} ans</strong>.</p>
<h2>classe 2 – Droit d'entrée</h2>
<p>Droit d'entrée : <strong>{{droit_entree}} FCFA</strong>, non remboursable.</p>
<h2>classe 3 – Savoir-faire</h2>
<p>Le Franchiseur transmet ses recettes, process, formations et logiciels de gestion.</p>
<h2>classe 4 – Approvisionnement</h2>
<p>Le Franchisé s'approvisionne en matières premières auprès des fournisseurs référencés par le Franchiseur.</p>
<p>Fait le <strong>{{date_accord}}</strong>. Signatures&nbsp;: _________________ / _________________</p></div>`
  },
  {
    code: 'boul_livraison_pain', name: "Accord de service de livraison de pain (distribution)",
    category: 'commercial_financier', price: 3000, priceMax: 9000,
    description: "Accord de distribution et livraison quotidienne de pain à des points de vente.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 65,
    fieldsJson: F([
      {key:'boulanger',label:"Nom de la boulangerie",type:'text',required:true},
      {key:'revendeur',label:"Nom du revendeur / point de vente",type:'text',required:true},
      {key:'quantite_jour',label:"Quantité journalière (unités)",type:'text',required:true},
      {key:'heure_livraison',label:"Heure de livraison",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE LIVRAISON DE PAIN</h1>
<p>Entre <strong>{{boulanger}}</strong> et <strong>{{revendeur}}</strong>,</p>
<h2>classe 1 – Objet</h2>
<p>Livraison quotidienne de <strong>{{quantite_jour}} unités</strong> à <strong>{{heure_livraison}}</strong> au point de vente du Revendeur.</p>
<h2>classe 2 – Invendus</h2>
<p>Les invendus ne sont pas repris sauf accord contraire écrit. La commande est ajustable avec 12 h de préavis.</p>
<h2>classe 3 – Paiement</h2>
<p>Règlement hebdomadaire ou mensuel selon modalités définies en annexe.</p>
<p>Fait le <strong>{{date_accord}}</strong>. Signatures&nbsp;: _________________ / _________________</p></div>`
  },
  {
    code: 'boul_glaces_sorbets', name: "Accord de service de production de glaces et sorbets",
    category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Accord de production industrielle ou artisanale de glaces et sorbets aux fruits locaux.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 60,
    fieldsJson: F([
      {key:'glacier',label:"Nom du glacier / producteur",type:'text',required:true},
      {key:'client',label:"Nom du client / distributeur",type:'text',required:true},
      {key:'parfums',label:"Parfums / références commandées",type:'text',required:true},
      {key:'volume_mensuel',label:"Volume mensuel (litres ou bacs)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRODUCTION DE GLACES ET SORBETS</h1>
<p>Entre <strong>{{glacier}}</strong> et <strong>{{client}}</strong>,</p>
<h2>classe 1 – Objet</h2>
<p>Production mensuelle de <strong>{{volume_mensuel}}</strong> des parfums : <strong>{{parfums}}</strong>.</p>
<h2>classe 2 – Chaîne du froid</h2>
<p>Les produits sont maintenus à -18 °C de la production à la livraison. Transport assuré en camion frigorifique.</p>
<h2>classe 3 – Ingrédients</h2>
<p>Utilisation de fruits frais locaux (mangue, ananas, bissap…) sans colorants artificiels.</p>
<p>Fait le <strong>{{date_accord}}</strong>. Signatures&nbsp;: _________________ / _________________</p></div>`
  },
  {
    code: 'boul_jus_fruits', name: "Accord de service de production de jus de fruits embouteillés",
    category: 'commercial_financier', price: 4500, priceMax: 13000,
    description: "Accord de production et d'embouteillage de jus de fruits naturels à base de fruits tropicaux.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'producteur',label:"Nom du producteur / transformateur",type:'text',required:true},
      {key:'client',label:"Nom du client / distributeur",type:'text',required:true},
      {key:'references',label:"Références de jus (mangue, ananas, goyave…)",type:'text',required:true},
      {key:'volume_mensuel',label:"Volume mensuel (litres ou caisses)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRODUCTION DE JUS DE FRUITS EMBOUTEILLÉS</h1>
<p>Entre <strong>{{producteur}}</strong> et <strong>{{client}}</strong>,</p>
<h2>classe 1 – Objet</h2>
<p>Production et embouteillage de <strong>{{volume_mensuel}}</strong> de jus : <strong>{{references}}</strong>, 100 % naturels, sans conservateurs.</p>
<h2>classe 2 – Pasteurisation</h2>
<p>Traitement thermique conforme aux normes sanitaires CODEX pour garantir une DLC minimale de 6 mois.</p>
<h2>classe 3 – Étiquetage</h2>
<p>Étiquetage bilingue français / langue locale, conforme aux exigences douanières UEMOA.</p>
<p>Fait le <strong>{{date_accord}}</strong>. Signatures&nbsp;: _________________ / _________________</p></div>`
  },
  {
    code: 'boul_eau_minerale', name: "Accord de service de production d'eau minérale",
    category: 'commercial_financier', price: 5000, priceMax: 15000,
    description: "Accord de production et conditionnement d'eau minérale naturelle ou purifiée.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'producteur',label:"Nom de l'unité de production",type:'text',required:true},
      {key:'distributeur',label:"Nom du distributeur",type:'text',required:true},
      {key:'formats',label:"Formats (33 cl, 50 cl, 1,5 L…)",type:'text',required:true},
      {key:'volume_mensuel',label:"Volume mensuel (cartons ou litres)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRODUCTION D'EAU MINÉRALE</h1>
<p>Entre <strong>{{producteur}}</strong> et <strong>{{distributeur}}</strong>,</p>
<h2>classe 1 – Objet</h2>
<p>Production et livraison de <strong>{{volume_mensuel}}</strong> en formats <strong>{{formats}}</strong>.</p>
<h2>classe 2 – Qualité</h2>
<p>Conformité aux normes OMS pour l'eau de boisson. Analyses bactériologiques mensuelles fournies au Distributeur.</p>
<h2>classe 3 – Autorisation</h2>
<p>Le Producteur détient l'autorisation d'exploitation délivrée par le Ministère de la Santé de Côte d'Ivoire.</p>
<p>Fait le <strong>{{date_accord}}</strong>. Signatures&nbsp;: _________________ / _________________</p></div>`
  },
  {
    code: 'boul_boissons_gazeuses', name: "Accord de service de production de boissons gazeuses",
    category: 'commercial_financier', price: 5000, priceMax: 15000,
    description: "Accord de production industrielle de boissons gazeuses ou sodas locaux.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'fabricant',label:"Nom du fabricant",type:'text',required:true},
      {key:'client',label:"Nom du client / distributeur",type:'text',required:true},
      {key:'references',label:"Références de boissons",type:'text',required:true},
      {key:'volume_mensuel',label:"Volume mensuel (caisses ou litres)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRODUCTION DE BOISSONS GAZEUSES</h1>
<p>Entre <strong>{{fabricant}}</strong> et <strong>{{client}}</strong>,</p>
<h2>classe 1 – Objet</h2>
<p>Production de <strong>{{volume_mensuel}}</strong> des boissons <strong>{{references}}</strong>.</p>
<h2>classe 2 – Formulation</h2>
<p>Recettes approuvées par l'autorité sanitaire ivoirienne. Teneur en sucre et additifs conforme à la réglementation.</p>
<h2>classe 3 – Conditionnement</h2>
<p>Bouteilles PET ou verre consigné selon l'accord commercial annexé.</p>
<p>Fait le <strong>{{date_accord}}</strong>. Signatures&nbsp;: _________________ / _________________</p></div>`
  },
  {
    code: 'boul_brasserie_artisanale', name: "Accord de service de brasserie artisanale (boissons locales)",
    category: 'commercial_financier', price: 5000, priceMax: 15000,
    description: "Accord de production artisanale de boissons fermentées locales (dolo, bandji, gnamankoudji).",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'brasseur',label:"Nom du brasseur artisanal",type:'text',required:true},
      {key:'client',label:"Nom du client / détaillant",type:'text',required:true},
      {key:'type_boisson',label:"Type de boisson locale produite",type:'text',required:true},
      {key:'volume_hebdo',label:"Volume hebdomadaire (litres)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE BRASSERIE ARTISANALE (BOISSONS LOCALES)</h1>
<p>Entre <strong>{{brasseur}}</strong> et <strong>{{client}}</strong>,</p>
<h2>classe 1 – Objet</h2>
<p>Production et livraison de <strong>{{volume_hebdo}} litres/semaine</strong> de <strong>{{type_boisson}}</strong>.</p>
<h2>classe 2 – Hygiène</h2>
<p>Fabrication dans des locaux autorisés, avec des équipements nettoyés et désinfectés selon les BPH.</p>
<h2>classe 3 – Conformité</h2>
<p>Le Brasseur s'engage à obtenir et maintenir les autorisations d'exploitation requises par la réglementation ivoirienne.</p>
<p>Fait le <strong>{{date_accord}}</strong>. Signatures&nbsp;: _________________ / _________________</p></div>`
  },
  {
    code: 'boul_condiments_sauces', name: "Accord de service de production de condiments et sauces",
    category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Accord de production de sauces pimentées, condiments et assaisonnements locaux.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 62,
    fieldsJson: F([
      {key:'fabricant',label:"Nom du fabricant",type:'text',required:true},
      {key:'distributeur',label:"Nom du distributeur",type:'text',required:true},
      {key:'references',label:"Références produits",type:'text',required:true},
      {key:'volume_mensuel',label:"Volume mensuel (kg ou caisses)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRODUCTION DE CONDIMENTS ET SAUCES</h1>
<p>Entre <strong>{{fabricant}}</strong> et <strong>{{distributeur}}</strong>,</p>
<h2>classe 1 – Objet</h2>
<p>Production de <strong>{{volume_mensuel}}</strong> des références : <strong>{{references}}</strong>.</p>
<h2>classe 2 – Recettes</h2>
<p>Recettes à base d'ingrédients naturels locaux. Sans conservateurs artificiels. Attestation de conformité sanitaire annexée.</p>
<h2>classe 3 – Durée de vie</h2>
<p>DLC minimum 12 mois à la livraison pour les produits pasteurisés en bocal hermétique.</p>
<p>Fait le <strong>{{date_accord}}</strong>. Signatures&nbsp;: _________________ / _________________</p></div>`
  },
  {
    code: 'boul_moutarde_ketchup', name: "Accord de service de production de moutarde et ketchup local",
    category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Accord de production locale de moutarde et ketchup à base d'ingrédients tropicaux.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 55,
    fieldsJson: F([
      {key:'fabricant',label:"Nom du fabricant",type:'text',required:true},
      {key:'client',label:"Nom du client",type:'text',required:true},
      {key:'gamme',label:"Gamme (moutarde fine, ketchup tomate locale…)",type:'text',required:true},
      {key:'volume_mensuel',label:"Volume mensuel (caisses ou kg)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRODUCTION DE MOUTARDE ET KETCHUP LOCAL</h1>
<p>Entre <strong>{{fabricant}}</strong> et <strong>{{client}}</strong>,</p>
<h2>classe 1 – Objet</h2>
<p>Production de <strong>{{volume_mensuel}}</strong> de la gamme : <strong>{{gamme}}</strong>.</p>
<h2>classe 2 – Matières premières</h2>
<p>Tomates, piments et épices issus de l'agriculture locale. Teneur en sel conforme aux recommandations OMS.</p>
<h2>classe 3 – Étiquetage</h2>
<p>Étiquetage complet avec DLC, ingrédients, valeurs nutritionnelles et numéro de lot.</p>
<p>Fait le <strong>{{date_accord}}</strong>. Signatures&nbsp;: _________________ / _________________</p></div>`
  },
  {
    code: 'boul_cafe_torrefie', name: "Accord de service de production de café torréfié",
    category: 'commercial_financier', price: 5000, priceMax: 15000,
    description: "Accord de torréfaction et conditionnement de café ivoirien à destination du marché local ou export.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'torrefacteur',label:"Nom du torréfacteur",type:'text',required:true},
      {key:'client',label:"Nom du client / importateur",type:'text',required:true},
      {key:'origine_cafe',label:"Origine du café (région ivoirienne)",type:'text',required:true},
      {key:'volume_mensuel',label:"Volume mensuel (kg)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRODUCTION DE CAFÉ TORRÉFIÉ</h1>
<p>Entre <strong>{{torrefacteur}}</strong> et <strong>{{client}}</strong>,</p>
<h2>classe 1 – Objet</h2>
<p>Torréfaction et conditionnement de <strong>{{volume_mensuel}} kg/mois</strong> de café d'origine <strong>{{origine_cafe}}</strong>.</p>
<h2>classe 2 – Profil de torréfaction</h2>
<p>Courbe de torréfaction validée conjointement par le Client. Dégustation de validation avant mise en production.</p>
<h2>classe 3 – Emballage</h2>
<p>Sachets à valve unidirectionnelle avec date de torréfaction et indicateur de fraîcheur.</p>
<p>Fait le <strong>{{date_accord}}</strong>. Signatures&nbsp;: _________________ / _________________</p></div>`
  },
  {
    code: 'boul_the_tisanes', name: "Accord de service de production de thé et tisanes locales",
    category: 'commercial_financier', price: 3500, priceMax: 10000,
    description: "Accord de production et conditionnement de thés et tisanes à base de plantes africaines.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 58,
    fieldsJson: F([
      {key:'producteur',label:"Nom du producteur",type:'text',required:true},
      {key:'client',label:"Nom du client",type:'text',required:true},
      {key:'references',label:"Références (kinkeliba, moringa, gingembre…)",type:'text',required:true},
      {key:'volume_mensuel',label:"Volume mensuel (boîtes ou kg)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRODUCTION DE THÉ ET TISANES LOCALES</h1>
<p>Entre <strong>{{producteur}}</strong> et <strong>{{client}}</strong>,</p>
<h2>classe 1 – Objet</h2>
<p>Production de <strong>{{volume_mensuel}}</strong> des références : <strong>{{references}}</strong>.</p>
<h2>classe 2 – Plantes</h2>
<p>Plantes séchées à basse température pour préserver les principes actifs. Sans pesticides (agriculture biologique ou raisonnée).</p>
<h2>classe 3 – Conformité</h2>
<p>Analyses microbiologiques et des contaminants par lot. Dossier disponible sur demande.</p>
<p>Fait le <strong>{{date_accord}}</strong>. Signatures&nbsp;: _________________ / _________________</p></div>`
  },
  {
    code: 'boul_lait_yaourts', name: "Accord de service de production de lait et yaourts",
    category: 'commercial_financier', price: 4500, priceMax: 13000,
    description: "Accord de production laitière et de transformation en yaourts et lait pasteurisé.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'laiterie',label:"Nom de la laiterie",type:'text',required:true},
      {key:'client',label:"Nom du distributeur / GMS",type:'text',required:true},
      {key:'references',label:"Références (lait entier, yaourt nature, yaourt fruité…)",type:'text',required:true},
      {key:'volume_hebdo',label:"Volume hebdomadaire (litres ou unités)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRODUCTION DE LAIT ET YAOURTS</h1>
<p>Entre <strong>{{laiterie}}</strong> et <strong>{{client}}</strong>,</p>
<h2>classe 1 – Objet</h2>
<p>Livraison hebdomadaire de <strong>{{volume_hebdo}}</strong> des références : <strong>{{references}}</strong>.</p>
<h2>classe 2 – Chaîne du froid</h2>
<p>Transport réfrigéré entre 2 et 6 °C. Registre de température fourni à chaque livraison.</p>
<h2>classe 3 – Qualité</h2>
<p>Analyses de qualité (taux matière grasse, matière sèche, flore totale) effectuées chaque semaine.</p>
<p>Fait le <strong>{{date_accord}}</strong>. Signatures&nbsp;: _________________ / _________________</p></div>`
  },
  {
    code: 'boul_fromages_locaux', name: "Accord de service de production de fromages locaux",
    category: 'commercial_financier', price: 4500, priceMax: 13000,
    description: "Accord de production artisanale de fromages locaux à base de lait de vache ou de chèvre.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'fromagerie',label:"Nom de la fromagerie",type:'text',required:true},
      {key:'client',label:"Nom du client",type:'text',required:true},
      {key:'types_fromages',label:"Types de fromages produits",type:'text',required:true},
      {key:'volume_mensuel',label:"Volume mensuel (kg)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRODUCTION DE FROMAGES LOCAUX</h1>
<p>Entre <strong>{{fromagerie}}</strong> et <strong>{{client}}</strong>,</p>
<h2>classe 1 – Objet</h2>
<p>Production de <strong>{{volume_mensuel}} kg/mois</strong> de fromages : <strong>{{types_fromages}}</strong>.</p>
<h2>classe 2 – Affinage</h2>
<p>Durée et conditions d'affinage spécifiées pour chaque variété en annexe technique.</p>
<h2>classe 3 – Traçabilité</h2>
<p>Chaque fromage porte un numéro de lot renvoyant au relevé de fabrication et à l'analyse du lait source.</p>
<p>Fait le <strong>{{date_accord}}</strong>. Signatures&nbsp;: _________________ / _________________</p></div>`
  },
  {
    code: 'boul_restauration_rapide', name: "Accord de service de restauration rapide (fast food local)",
    category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Accord de prestation de restauration rapide à base de plats locaux pour entreprises ou événements.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 68,
    fieldsJson: F([
      {key:'restaurateur',label:"Nom du restaurateur",type:'text',required:true},
      {key:'client',label:"Nom du client",type:'text',required:true},
      {key:'menu_type',label:"Type de menu proposé",type:'text',required:true},
      {key:'nb_couverts',label:"Nombre de couverts / jour",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RESTAURATION RAPIDE (FAST FOOD LOCAL)</h1>
<p>Entre <strong>{{restaurateur}}</strong> et <strong>{{client}}</strong>,</p>
<h2>classe 1 – Objet</h2>
<p>Service de restauration rapide de type <strong>{{menu_type}}</strong> pour <strong>{{nb_couverts}} couverts/jour</strong>.</p>
<h2>classe 2 – Hygiène</h2>
<p>Conformité aux normes HACCP. Personnel formé à l'hygiène alimentaire. Nettoyage journalier des équipements.</p>
<h2>classe 3 – Résiliation</h2>
<p>Résiliable par l'une ou l'autre partie avec un préavis de 15 jours.</p>
<p>Fait le <strong>{{date_accord}}</strong>. Signatures&nbsp;: _________________ / _________________</p></div>`
  },
  {
    code: 'boul_traiteur_evenementiel', name: "Accord de service de traiteur événementiel gastronomique",
    category: 'commercial_financier', price: 5000, priceMax: 15000,
    description: "Accord de prestation traiteur pour événements professionnels ou privés haut de gamme.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'traiteur',label:"Nom du traiteur",type:'text',required:true},
      {key:'client',label:"Nom du client",type:'text',required:true},
      {key:'type_evenement',label:"Type d'événement",type:'text',required:true},
      {key:'nb_convives',label:"Nombre de convives",type:'text',required:true},
      {key:'date_evenement',label:"Date de l'événement",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TRAITEUR ÉVÉNEMENTIEL GASTRONOMIQUE</h1>
<p>Entre <strong>{{traiteur}}</strong> et <strong>{{client}}</strong>,</p>
<h2>classe 1 – Objet</h2>
<p>Prestation traiteur pour l'événement «&nbsp;<strong>{{type_evenement}}</strong>&nbsp;» regroupant <strong>{{nb_convives}}</strong> convives le <strong>{{date_evenement}}</strong>.</p>
<h2>classe 2 – Prestations</h2>
<p>Menu, service en salle, vaisselle, personnel de service, installation et démontage inclus.</p>
<h2>classe 3 – Acompte</h2>
<p>Acompte de 40 % à la signature. Solde 48 h avant l'événement.</p>
<h2>classe 4 – Annulation</h2>
<p>Annulation moins de 7 jours avant l'événement : l'acompte est acquis au Traiteur.</p>
<p>Signatures&nbsp;: _________________ / _________________</p></div>`
  },
  {
    code: 'boul_circuit_court', name: "Accord de partenariat restaurateur-producteur local (circuit court)",
    category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Accord de partenariat en circuit court entre restaurant et producteur agricole local.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'restaurateur',label:"Nom du restaurateur",type:'text',required:true},
      {key:'producteur',label:"Nom du producteur agricole",type:'text',required:true},
      {key:'produits',label:"Produits concernés (légumes, viandes, poissons…)",type:'text',required:true},
      {key:'frequence',label:"Fréquence de livraison",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT RESTAURATEUR – PRODUCTEUR LOCAL (CIRCUIT COURT)</h1>
<p>Entre <strong>{{restaurateur}}</strong> et <strong>{{producteur}}</strong>,</p>
<h2>classe 1 – Objet</h2>
<p>Approvisionnement du restaurant en <strong>{{produits}}</strong> frais, locaux et de saison, livraison <strong>{{frequence}}</strong>.</p>
<h2>classe 2 – Prix</h2>
<p>Prix convenus en début de saison, révisables trimestriellement selon les cours locaux.</p>
<h2>classe 3 – Valorisation</h2>
<p>Le Restaurant s'engage à mentionner le Producteur sur ses menus et supports de communication.</p>
<p>Fait le <strong>{{date_accord}}</strong>. Signatures&nbsp;: _________________ / _________________</p></div>`
  },
  {
    code: 'boul_rapport_performance_alim', name: "Rapport de performance unité de production alimentaire",
    category: 'commercial_financier', price: 3000, priceMax: 8000,
    description: "Rapport périodique de performance d'une unité de transformation alimentaire.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 52,
    fieldsJson: F([
      {key:'unite',label:"Nom de l'unité de production",type:'text',required:true},
      {key:'periode',label:"Période du rapport",type:'text',required:true},
      {key:'volume_produit',label:"Volume total produit (tonnes ou unités)",type:'text',required:true},
      {key:'taux_non_conformite',label:"Taux de non-conformité (%)",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE UNITÉ DE PRODUCTION ALIMENTAIRE</h1>
<h2>Unité : {{unite}} — Période : {{periode}}</h2>
<h2>1. Production</h2>
<p>Volume total produit : <strong>{{volume_produit}}</strong></p>
<h2>2. Qualité</h2>
<p>Taux de non-conformité : <strong>{{taux_non_conformite}} %</strong></p>
<h2>3. Actions correctives</h2>
<p>Plan d'action corrective défini en annexe pour les non-conformités identifiées.</p>
<h2>4. Perspectives</h2>
<p>Objectifs de la prochaine période définis en réunion de direction qualité.</p>
<p>Rapport établi le <strong>{{date_rapport}}</strong>.</p></div>`
  },
  {
    code: 'boul_plan_dev_alim', name: "Plan de développement industrie alimentaire",
    category: 'commercial_financier', price: 5000, priceMax: 15000,
    description: "Document de planification stratégique pour le développement d'une industrie agroalimentaire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'entreprise',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'horizon',label:"Horizon du plan",type:'text',required:true},
      {key:'marches_cibles',label:"Marchés cibles",type:'text',required:true},
      {key:'investissement',label:"Investissement prévu (FCFA)",type:'text',required:true},
      {key:'date_doc',label:"Date du document",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT INDUSTRIE ALIMENTAIRE</h1>
<h2>Entreprise : {{entreprise}} — Horizon : {{horizon}}</h2>
<h2>1. Vision</h2>
<p>Devenir un acteur majeur du secteur alimentaire sur les marchés : <strong>{{marches_cibles}}</strong>.</p>
<h2>2. Plan d'investissement</h2>
<p>Investissement total prévu : <strong>{{investissement}} FCFA</strong>.</p>
<h2>3. Axes stratégiques</h2>
<p>Innovation produits, certification qualité internationale, développement des canaux de distribution modernes et traditionnels, valorisation des matières premières locales.</p>
<p>Document établi le <strong>{{date_doc}}</strong>.</p></div>`
  },
  {
    code: 'boul_certification_halal', name: "Accord de certification halal produits alimentaires",
    category: 'commercial_financier', price: 5000, priceMax: 15000,
    description: "Accord d'accompagnement à la certification halal d'une unité ou gamme de produits alimentaires.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'organisme',label:"Nom de l'organisme certificateur halal",type:'text',required:true},
      {key:'entreprise',label:"Nom de l'entreprise alimentaire",type:'text',required:true},
      {key:'gamme',label:"Gamme / références à certifier",type:'text',required:true},
      {key:'duree_mission',label:"Durée de la mission",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CERTIFICATION HALAL PRODUITS ALIMENTAIRES</h1>
<p>Entre <strong>{{organisme}}</strong> et <strong>{{entreprise}}</strong>,</p>
<h2>classe 1 – Objet</h2>
<p>Accompagnement à la certification halal de la gamme <strong>{{gamme}}</strong> sur une durée de <strong>{{duree_mission}}</strong>.</p>
<h2>classe 2 – Audit</h2>
<p>Audit des ingrédients, des procédés, des équipements et du personnel. Rapport d'audit transmis dans les 15 jours.</p>
<h2>classe 3 – Certificat</h2>
<p>Le certificat halal est valable 1 an, renouvelable après audit de surveillance annuel.</p>
<h2>classe 4 – Utilisation du logo</h2>
<p>Le logo halal ne peut être apposé que sur les produits explicitement certifiés.</p>
<p>Fait le <strong>{{date_accord}}</strong>. Signatures&nbsp;: _________________ / _________________</p></div>`
  },
  {
    code: 'boul_charte_securite_alim', name: "Charte de la sécurité alimentaire et qualité",
    category: 'commercial_financier', price: 2500, priceMax: 7000,
    description: "Charte d'engagement en matière de sécurité alimentaire et de qualité pour opérateurs ivoiriens.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 60,
    fieldsJson: F([
      {key:'signataire',label:"Nom de l'entreprise signataire",type:'text',required:true},
      {key:'representant',label:"Nom du représentant légal",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE LA SÉCURITÉ ALIMENTAIRE ET QUALITÉ</h1>
<p>La société <strong>{{signataire}}</strong>, représentée par <strong>{{representant}}</strong>, s'engage à :</p>
<h2>classe 1 – Sécurité alimentaire</h2>
<p>Mettre en œuvre un système de management de la sécurité alimentaire basé sur les principes HACCP et les bonnes pratiques d'hygiène.</p>
<h2>classe 2 – Traçabilité</h2>
<p>Assurer la traçabilité complète des produits de la matière première au consommateur final.</p>
<h2>classe 3 – Amélioration continue</h2>
<p>Procéder à des audits internes réguliers et à la formation continue du personnel.</p>
<h2>classe 4 – Transparence</h2>
<p>Informer sans délai les autorités compétentes de tout incident pouvant affecter la sécurité des consommateurs.</p>
<p>Signé le <strong>{{date_signature}}</strong>. Signature&nbsp;: _________________</p></div>`
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
  console.log(`Batch 69a OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
