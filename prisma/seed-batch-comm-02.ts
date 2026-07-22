import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  let created = 0, updated = 0;

  const templates = [
    {
      code: 'dig_com_001',
      name: 'Plan Community Management Mensuel',
      description: 'Planification mensuelle des activités community management',
      category: 'communication',
      templateType: 'pdf',
      classe: 'B',
      price: 3500,
      priceMax: 5500,
      popularity: 78,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
        { name: 'mois', label: 'Mois concerné', type: 'text', required: true },
        { name: 'objectifs', label: 'Objectifs du mois', type: 'textarea', required: true },
        { name: 'date_debut', label: 'Date de début', type: 'date', required: true },
      ]),
      body: `<h2>Plan Community Management — {{mois}}</h2>
<p><strong>Entreprise :</strong> {{entreprise}}</p>
<p><strong>Période :</strong> du {{date_debut}}</p>
<h3>Objectifs</h3>
<p>{{objectifs}}</p>`,
    },
    {
      code: 'dig_com_002',
      name: 'Calendrier Éditorial Réseaux Sociaux',
      description: 'Planning de publication multi-plateformes',
      category: 'communication',
      templateType: 'excel',
      classe: 'A',
      price: 4000,
      priceMax: 6000,
      popularity: 92,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'marque', label: 'Marque', type: 'text', required: true },
        { name: 'periode', label: 'Période', type: 'text', required: true },
        { name: 'plateformes', label: 'Plateformes ciblées', type: 'textarea', required: true },
        { name: 'date_lancement', label: 'Date de lancement', type: 'date', required: true },
      ]),
      body: `<h2>Calendrier Éditorial — {{marque}}</h2>
<p><strong>Période :</strong> {{periode}}</p>
<p><strong>Plateformes :</strong> {{plateformes}}</p>
<p><strong>Lancement :</strong> {{date_lancement}}</p>`,
    },
    {
      code: 'dig_com_003',
      name: 'Rapport KPI Communication Trimestriel',
      description: 'Rapport d\'analyse des indicateurs clés de performance',
      category: 'communication',
      templateType: 'pdf',
      classe: 'A',
      price: 6000,
      priceMax: 8000,
      popularity: 85,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'organisation', label: 'Organisation', type: 'text', required: true },
        { name: 'trimestre', label: 'Trimestre', type: 'text', required: true },
        { name: 'synthese', label: 'Synthèse des résultats', type: 'textarea', required: true },
        { name: 'date_rapport', label: 'Date du rapport', type: 'date', required: true },
      ]),
      body: `<h2>Rapport KPI — {{trimestre}}</h2>
<p><strong>Organisation :</strong> {{organisation}}</p>
<p><strong>Date :</strong> {{date_rapport}}</p>
<h3>Synthèse</h3>
<p>{{synthese}}</p>`,
    },
    {
      code: 'dig_com_004',
      name: 'Cahier des Charges Site Web',
      description: 'Spécifications techniques et fonctionnelles pour refonte web',
      category: 'communication',
      templateType: 'pdf',
      classe: 'A',
      price: 8000,
      priceMax: 10000,
      popularity: 88,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'client', label: 'Client', type: 'text', required: true },
        { name: 'projet', label: 'Nom du projet', type: 'text', required: true },
        { name: 'besoins', label: 'Besoins fonctionnels', type: 'textarea', required: true },
        { name: 'date_livraison', label: 'Date de livraison souhaitée', type: 'date', required: true },
      ]),
      body: `<h2>Cahier des Charges Web — {{projet}}</h2>
<p><strong>Client :</strong> {{client}}</p>
<p><strong>Livraison souhaitée :</strong> {{date_livraison}}</p>
<h3>Besoins</h3>
<p>{{besoins}}</p>`,
    },
    {
      code: 'dig_com_005',
      name: 'Programme Webinaire',
      description: 'Structure et déroulé d\'un webinaire professionnel',
      category: 'communication',
      templateType: 'pdf',
      classe: 'B',
      price: 2500,
      priceMax: 4500,
      popularity: 74,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'titre_webinaire', label: 'Titre du webinaire', type: 'text', required: true },
        { name: 'intervenant', label: 'Intervenant principal', type: 'text', required: true },
        { name: 'programme', label: 'Programme détaillé', type: 'textarea', required: true },
        { name: 'date_webinaire', label: 'Date du webinaire', type: 'date', required: true },
      ]),
      body: `<h2>Webinaire : {{titre_webinaire}}</h2>
<p><strong>Intervenant :</strong> {{intervenant}}</p>
<p><strong>Date :</strong> {{date_webinaire}}</p>
<h3>Programme</h3>
<p>{{programme}}</p>`,
    },
    {
      code: 'dig_com_006',
      name: 'Charte Rédactionnelle de Marque',
      description: 'Guide du ton, style et voix éditoriale de la marque',
      category: 'communication',
      templateType: 'pdf',
      classe: 'A',
      price: 7000,
      priceMax: 9000,
      popularity: 81,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'marque', label: 'Nom de la marque', type: 'text', required: true },
        { name: 'valeurs', label: 'Valeurs de la marque', type: 'textarea', required: true },
        { name: 'ton_editorial', label: 'Ton éditorial', type: 'textarea', required: true },
        { name: 'date_creation', label: 'Date de création', type: 'date', required: true },
      ]),
      body: `<h2>Charte Rédactionnelle — {{marque}}</h2>
<p><strong>Date :</strong> {{date_creation}}</p>
<h3>Valeurs</h3>
<p>{{valeurs}}</p>
<h3>Ton éditorial</h3>
<p>{{ton_editorial}}</p>`,
    },
    {
      code: 'dig_com_007',
      name: 'Brief Photo / Shooting',
      description: 'Document de briefing pour une séance photo professionnelle',
      category: 'communication',
      templateType: 'pdf',
      classe: 'B',
      price: 3000,
      priceMax: 5000,
      popularity: 69,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'client', label: 'Client', type: 'text', required: true },
        { name: 'concept', label: 'Concept visuel', type: 'textarea', required: true },
        { name: 'livrables', label: 'Livrables attendus', type: 'textarea', required: true },
        { name: 'date_shooting', label: 'Date du shooting', type: 'date', required: true },
      ]),
      body: `<h2>Brief Photo — {{client}}</h2>
<p><strong>Date :</strong> {{date_shooting}}</p>
<h3>Concept</h3>
<p>{{concept}}</p>
<h3>Livrables</h3>
<p>{{livrables}}</p>`,
    },
    {
      code: 'dig_com_008',
      name: 'Brief Production Vidéo',
      description: 'Briefing complet pour production de contenu vidéo',
      category: 'communication',
      templateType: 'pdf',
      classe: 'B',
      price: 3500,
      priceMax: 5500,
      popularity: 72,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'client', label: 'Client', type: 'text', required: true },
        { name: 'format_video', label: 'Format vidéo', type: 'text', required: true },
        { name: 'message_cle', label: 'Message clé', type: 'textarea', required: true },
        { name: 'date_tournage', label: 'Date de tournage', type: 'date', required: true },
      ]),
      body: `<h2>Brief Vidéo — {{client}}</h2>
<p><strong>Format :</strong> {{format_video}}</p>
<p><strong>Tournage :</strong> {{date_tournage}}</p>
<h3>Message clé</h3>
<p>{{message_cle}}</p>`,
    },
    {
      code: 'dig_com_009',
      name: 'Mémo Interne Communication',
      description: 'Note interne pour diffusion d\'informations en entreprise',
      category: 'communication',
      templateType: 'pdf',
      classe: 'C',
      price: 1000,
      priceMax: 3000,
      popularity: 55,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'destinataires', label: 'Destinataires', type: 'text', required: true },
        { name: 'objet', label: 'Objet du mémo', type: 'text', required: true },
        { name: 'contenu', label: 'Contenu du mémo', type: 'textarea', required: true },
        { name: 'date_memo', label: 'Date', type: 'date', required: true },
      ]),
      body: `<h2>MÉMO INTERNE</h2>
<p><strong>À :</strong> {{destinataires}}</p>
<p><strong>Objet :</strong> {{objet}}</p>
<p><strong>Date :</strong> {{date_memo}}</p>
<p>{{contenu}}</p>`,
    },
    {
      code: 'dig_com_010',
      name: 'Plan de Formation Communication',
      description: 'Programme de formation aux techniques de communication',
      category: 'communication',
      templateType: 'pdf',
      classe: 'B',
      price: 5000,
      priceMax: 7000,
      popularity: 67,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'organisme', label: 'Organisme de formation', type: 'text', required: true },
        { name: 'public_cible', label: 'Public cible', type: 'text', required: true },
        { name: 'modules', label: 'Modules de formation', type: 'textarea', required: true },
        { name: 'date_debut', label: 'Date de début', type: 'date', required: true },
      ]),
      body: `<h2>Plan de Formation — Communication</h2>
<p><strong>Organisme :</strong> {{organisme}}</p>
<p><strong>Public :</strong> {{public_cible}}</p>
<p><strong>Début :</strong> {{date_debut}}</p>
<h3>Modules</h3>
<p>{{modules}}</p>`,
    },
    {
      code: 'dig_com_011',
      name: 'Compte Rendu Conférence de Presse',
      description: 'Synthèse officielle d\'une conférence de presse',
      category: 'communication',
      templateType: 'pdf',
      classe: 'B',
      price: 2500,
      priceMax: 4500,
      popularity: 63,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'organisation', label: 'Organisation', type: 'text', required: true },
        { name: 'titre_conference', label: 'Titre de la conférence', type: 'text', required: true },
        { name: 'synthese', label: 'Points clés abordés', type: 'textarea', required: true },
        { name: 'date_conference', label: 'Date de la conférence', type: 'date', required: true },
      ]),
      body: `<h2>Compte Rendu — {{titre_conference}}</h2>
<p><strong>Organisation :</strong> {{organisation}}</p>
<p><strong>Date :</strong> {{date_conference}}</p>
<h3>Points clés</h3>
<p>{{synthese}}</p>`,
    },
    {
      code: 'soc_med_001',
      name: 'Plan Gestion des Commentaires',
      description: 'Protocole de modération et réponse aux commentaires en ligne',
      category: 'communication',
      templateType: 'pdf',
      classe: 'B',
      price: 3000,
      priceMax: 5000,
      popularity: 70,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'marque', label: 'Marque', type: 'text', required: true },
        { name: 'plateformes', label: 'Plateformes concernées', type: 'text', required: true },
        { name: 'protocole', label: 'Protocole de réponse', type: 'textarea', required: true },
        { name: 'date_application', label: 'Date d\'application', type: 'date', required: true },
      ]),
      body: `<h2>Plan Gestion Commentaires — {{marque}}</h2>
<p><strong>Plateformes :</strong> {{plateformes}}</p>
<p><strong>En vigueur :</strong> {{date_application}}</p>
<h3>Protocole</h3>
<p>{{protocole}}</p>`,
    },
    {
      code: 'soc_med_002',
      name: 'Fiche Suivi Relations Presse',
      description: 'Suivi des contacts journalistes et retombées presse',
      category: 'communication',
      templateType: 'excel',
      classe: 'B',
      price: 2500,
      priceMax: 4500,
      popularity: 58,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'organisation', label: 'Organisation', type: 'text', required: true },
        { name: 'journaliste', label: 'Journaliste / Média', type: 'text', required: true },
        { name: 'notes_contact', label: 'Notes de contact', type: 'textarea', required: true },
        { name: 'date_contact', label: 'Date de contact', type: 'date', required: true },
      ]),
      body: `<h2>Fiche Suivi Presse</h2>
<p><strong>Organisation :</strong> {{organisation}}</p>
<p><strong>Contact :</strong> {{journaliste}}</p>
<p><strong>Date :</strong> {{date_contact}}</p>
<p>{{notes_contact}}</p>`,
    },
    {
      code: 'soc_med_003',
      name: 'Tableau de Bord Communication',
      description: 'Dashboard de suivi des indicateurs de communication',
      category: 'communication',
      templateType: 'excel',
      classe: 'A',
      price: 5500,
      priceMax: 7500,
      popularity: 90,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'entite', label: 'Entité', type: 'text', required: true },
        { name: 'periode', label: 'Période', type: 'text', required: true },
        { name: 'indicateurs', label: 'Indicateurs suivis', type: 'textarea', required: true },
        { name: 'date_maj', label: 'Date de mise à jour', type: 'date', required: true },
      ]),
      body: `<h2>Dashboard Communication — {{entite}}</h2>
<p><strong>Période :</strong> {{periode}}</p>
<p><strong>MAJ :</strong> {{date_maj}}</p>
<h3>Indicateurs</h3>
<p>{{indicateurs}}</p>`,
    },
    {
      code: 'soc_med_004',
      name: 'Plan Activation Terrain',
      description: 'Organisation d\'événements et activations brand sur le terrain',
      category: 'communication',
      templateType: 'pdf',
      classe: 'B',
      price: 4500,
      priceMax: 6500,
      popularity: 66,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'marque', label: 'Marque', type: 'text', required: true },
        { name: 'lieu', label: 'Lieu de l\'activation', type: 'text', required: true },
        { name: 'dispositif', label: 'Dispositif prévu', type: 'textarea', required: true },
        { name: 'date_activation', label: 'Date d\'activation', type: 'date', required: true },
      ]),
      body: `<h2>Plan Activation Terrain — {{marque}}</h2>
<p><strong>Lieu :</strong> {{lieu}}</p>
<p><strong>Date :</strong> {{date_activation}}</p>
<h3>Dispositif</h3>
<p>{{dispositif}}</p>`,
    },
    {
      code: 'soc_med_005',
      name: 'Script Radio / Podcast',
      description: 'Script de présentation pour émission radio ou podcast',
      category: 'communication',
      templateType: 'pdf',
      classe: 'C',
      price: 2000,
      priceMax: 4000,
      popularity: 52,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'emission', label: 'Nom de l\'émission', type: 'text', required: true },
        { name: 'animateur', label: 'Animateur', type: 'text', required: true },
        { name: 'script', label: 'Contenu du script', type: 'textarea', required: true },
        { name: 'date_diffusion', label: 'Date de diffusion', type: 'date', required: true },
      ]),
      body: `<h2>Script — {{emission}}</h2>
<p><strong>Animateur :</strong> {{animateur}}</p>
<p><strong>Diffusion :</strong> {{date_diffusion}}</p>
<h3>Script</h3>
<p>{{script}}</p>`,
    },
    {
      code: 'content_001',
      name: 'Guide Prise de Parole Publique',
      description: 'Préparation et structuration d\'une intervention publique',
      category: 'communication',
      templateType: 'pdf',
      classe: 'B',
      price: 3500,
      priceMax: 5500,
      popularity: 73,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'orateur', label: 'Nom de l\'orateur', type: 'text', required: true },
        { name: 'sujet', label: 'Sujet de l\'intervention', type: 'text', required: true },
        { name: 'points_cles', label: 'Points clés à aborder', type: 'textarea', required: true },
        { name: 'date_intervention', label: 'Date de l\'intervention', type: 'date', required: true },
      ]),
      body: `<h2>Guide Prise de Parole — {{orateur}}</h2>
<p><strong>Sujet :</strong> {{sujet}}</p>
<p><strong>Date :</strong> {{date_intervention}}</p>
<h3>Points clés</h3>
<p>{{points_cles}}</p>`,
    },
    {
      code: 'content_002',
      name: 'Plan de Communication Interne',
      description: 'Stratégie de communication au sein de l\'organisation',
      category: 'communication',
      templateType: 'pdf',
      classe: 'A',
      price: 7500,
      priceMax: 9500,
      popularity: 83,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'organisation', label: 'Organisation', type: 'text', required: true },
        { name: 'objectifs', label: 'Objectifs de communication', type: 'textarea', required: true },
        { name: 'canaux', label: 'Canaux utilisés', type: 'textarea', required: true },
        { name: 'date_debut', label: 'Date de mise en œuvre', type: 'date', required: true },
      ]),
      body: `<h2>Plan Com Interne — {{organisation}}</h2>
<p><strong>Début :</strong> {{date_debut}}</p>
<h3>Objectifs</h3>
<p>{{objectifs}}</p>
<h3>Canaux</h3>
<p>{{canaux}}</p>`,
    },
    {
      code: 'content_003',
      name: 'Rapport Veille Médiatique',
      description: 'Synthèse des mentions et couvertures médias',
      category: 'communication',
      templateType: 'pdf',
      classe: 'B',
      price: 4000,
      priceMax: 6000,
      popularity: 76,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'marque', label: 'Marque / Organisation', type: 'text', required: true },
        { name: 'periode', label: 'Période de veille', type: 'text', required: true },
        { name: 'mentions', label: 'Principales mentions', type: 'textarea', required: true },
        { name: 'date_rapport', label: 'Date du rapport', type: 'date', required: true },
      ]),
      body: `<h2>Rapport Veille Médiatique — {{marque}}</h2>
<p><strong>Période :</strong> {{periode}}</p>
<p><strong>Date :</strong> {{date_rapport}}</p>
<h3>Mentions clés</h3>
<p>{{mentions}}</p>`,
    },
    {
      code: 'content_004',
      name: 'Plan Éditorial Blog / Site',
      description: 'Planification du contenu éditorial pour blog ou site web',
      category: 'communication',
      templateType: 'excel',
      classe: 'A',
      price: 4500,
      priceMax: 6500,
      popularity: 87,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'site', label: 'Nom du site / blog', type: 'text', required: true },
        { name: 'themes', label: 'Thèmes éditoriaux', type: 'textarea', required: true },
        { name: 'frequence', label: 'Fréquence de publication', type: 'text', required: true },
        { name: 'date_debut', label: 'Date de démarrage', type: 'date', required: true },
      ]),
      body: `<h2>Plan Éditorial — {{site}}</h2>
<p><strong>Fréquence :</strong> {{frequence}}</p>
<p><strong>Démarrage :</strong> {{date_debut}}</p>
<h3>Thèmes</h3>
<p>{{themes}}</p>`,
    },
    {
      code: 'content_005',
      name: 'Template Newsletter Professionnelle',
      description: 'Maquette de newsletter pour communication régulière',
      category: 'communication',
      templateType: 'pdf',
      classe: 'B',
      price: 2500,
      priceMax: 4500,
      popularity: 80,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'marque', label: 'Marque', type: 'text', required: true },
        { name: 'titre_edition', label: 'Titre de l\'édition', type: 'text', required: true },
        { name: 'contenu_principal', label: 'Contenu principal', type: 'textarea', required: true },
        { name: 'date_envoi', label: 'Date d\'envoi', type: 'date', required: true },
      ]),
      body: `<h2>Newsletter {{marque}} — {{titre_edition}}</h2>
<p><strong>Envoi :</strong> {{date_envoi}}</p>
<hr/>
<p>{{contenu_principal}}</p>`,
    },
    {
      code: 'campagne_001',
      name: 'Brief Campagne Publicitaire',
      description: 'Document de cadrage pour une campagne de communication',
      category: 'communication',
      templateType: 'pdf',
      classe: 'A',
      price: 6500,
      priceMax: 8500,
      popularity: 91,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'annonceur', label: 'Annonceur', type: 'text', required: true },
        { name: 'produit', label: 'Produit / Service', type: 'text', required: true },
        { name: 'message', label: 'Message principal', type: 'textarea', required: true },
        { name: 'date_lancement', label: 'Date de lancement', type: 'date', required: true },
      ]),
      body: `<h2>Brief Campagne — {{annonceur}}</h2>
<p><strong>Produit :</strong> {{produit}}</p>
<p><strong>Lancement :</strong> {{date_lancement}}</p>
<h3>Message</h3>
<p>{{message}}</p>`,
    },
    {
      code: 'campagne_002',
      name: 'Plan Médias Digital',
      description: 'Stratégie de diffusion et achat médias en ligne',
      category: 'communication',
      templateType: 'excel',
      classe: 'A',
      price: 7000,
      priceMax: 9000,
      popularity: 84,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'annonceur', label: 'Annonceur', type: 'text', required: true },
        { name: 'budget', label: 'Budget médias', type: 'text', required: true },
        { name: 'canaux', label: 'Canaux de diffusion', type: 'textarea', required: true },
        { name: 'date_campagne', label: 'Date de début campagne', type: 'date', required: true },
      ]),
      body: `<h2>Plan Médias — {{annonceur}}</h2>
<p><strong>Budget :</strong> {{budget}}</p>
<p><strong>Début :</strong> {{date_campagne}}</p>
<h3>Canaux</h3>
<p>{{canaux}}</p>`,
    },
    {
      code: 'campagne_003',
      name: 'Rapport Performance Campagne',
      description: 'Bilan de performance d\'une campagne de communication',
      category: 'communication',
      templateType: 'pdf',
      classe: 'A',
      price: 5000,
      priceMax: 7000,
      popularity: 86,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'campagne', label: 'Nom de la campagne', type: 'text', required: true },
        { name: 'resultats', label: 'Résultats obtenus', type: 'textarea', required: true },
        { name: 'recommandations', label: 'Recommandations', type: 'textarea', required: true },
        { name: 'date_bilan', label: 'Date du bilan', type: 'date', required: true },
      ]),
      body: `<h2>Rapport Campagne — {{campagne}}</h2>
<p><strong>Bilan au :</strong> {{date_bilan}}</p>
<h3>Résultats</h3>
<p>{{resultats}}</p>
<h3>Recommandations</h3>
<p>{{recommandations}}</p>`,
    },
    {
      code: 'campagne_004',
      name: 'Plan Influence Marketing',
      description: 'Stratégie de collaboration avec des influenceurs',
      category: 'communication',
      templateType: 'pdf',
      classe: 'B',
      price: 5500,
      priceMax: 7500,
      popularity: 79,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'marque', label: 'Marque', type: 'text', required: true },
        { name: 'profil_influenceur', label: 'Profil influenceur cible', type: 'textarea', required: true },
        { name: 'objectifs', label: 'Objectifs de la collaboration', type: 'textarea', required: true },
        { name: 'date_debut', label: 'Date de début', type: 'date', required: true },
      ]),
      body: `<h2>Plan Influence — {{marque}}</h2>
<p><strong>Début :</strong> {{date_debut}}</p>
<h3>Profil recherché</h3>
<p>{{profil_influenceur}}</p>
<h3>Objectifs</h3>
<p>{{objectifs}}</p>`,
    },
    {
      code: 'campagne_005',
      name: 'Stratégie Email Marketing',
      description: 'Plan de campagnes emailing et automation',
      category: 'communication',
      templateType: 'pdf',
      classe: 'B',
      price: 4000,
      priceMax: 6000,
      popularity: 77,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'entreprise', label: 'Entreprise', type: 'text', required: true },
        { name: 'segments', label: 'Segments cibles', type: 'textarea', required: true },
        { name: 'sequences', label: 'Séquences d\'emails', type: 'textarea', required: true },
        { name: 'date_lancement', label: 'Date de lancement', type: 'date', required: true },
      ]),
      body: `<h2>Stratégie Email — {{entreprise}}</h2>
<p><strong>Lancement :</strong> {{date_lancement}}</p>
<h3>Segments</h3>
<p>{{segments}}</p>
<h3>Séquences</h3>
<p>{{sequences}}</p>`,
    },
    {
      code: 'rapport_com_001',
      name: 'Rapport Mensuel Communication',
      description: 'Bilan mensuel de toutes les actions de communication',
      category: 'communication',
      templateType: 'pdf',
      classe: 'B',
      price: 3000,
      priceMax: 5000,
      popularity: 75,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'organisation', label: 'Organisation', type: 'text', required: true },
        { name: 'mois', label: 'Mois', type: 'text', required: true },
        { name: 'actions_realisees', label: 'Actions réalisées', type: 'textarea', required: true },
        { name: 'date_rapport', label: 'Date du rapport', type: 'date', required: true },
      ]),
      body: `<h2>Rapport Com Mensuel — {{mois}}</h2>
<p><strong>Organisation :</strong> {{organisation}}</p>
<p><strong>Date :</strong> {{date_rapport}}</p>
<h3>Actions réalisées</h3>
<p>{{actions_realisees}}</p>`,
    },
    {
      code: 'rapport_com_002',
      name: 'Rapport Annuel Communication',
      description: 'Bilan annuel des actions et résultats de communication',
      category: 'communication',
      templateType: 'pdf',
      classe: 'A',
      price: 8000,
      priceMax: 10000,
      popularity: 82,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'organisation', label: 'Organisation', type: 'text', required: true },
        { name: 'annee', label: 'Année', type: 'text', required: true },
        { name: 'bilan', label: 'Bilan global', type: 'textarea', required: true },
        { name: 'date_rapport', label: 'Date du rapport', type: 'date', required: true },
      ]),
      body: `<h2>Rapport Annuel Com — {{annee}}</h2>
<p><strong>Organisation :</strong> {{organisation}}</p>
<p><strong>Date :</strong> {{date_rapport}}</p>
<h3>Bilan</h3>
<p>{{bilan}}</p>`,
    },
    {
      code: 'rapport_com_003',
      name: 'Rapport Réseaux Sociaux',
      description: 'Analyse des performances sur les réseaux sociaux',
      category: 'communication',
      templateType: 'excel',
      classe: 'B',
      price: 3500,
      priceMax: 5500,
      popularity: 89,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'marque', label: 'Marque', type: 'text', required: true },
        { name: 'periode', label: 'Période analysée', type: 'text', required: true },
        { name: 'metriques', label: 'Métriques clés', type: 'textarea', required: true },
        { name: 'date_analyse', label: 'Date d\'analyse', type: 'date', required: true },
      ]),
      body: `<h2>Rapport Réseaux Sociaux — {{marque}}</h2>
<p><strong>Période :</strong> {{periode}}</p>
<p><strong>Analyse :</strong> {{date_analyse}}</p>
<h3>Métriques</h3>
<p>{{metriques}}</p>`,
    },
    {
      code: 'rapport_com_004',
      name: 'Rapport Engagement Audience',
      description: 'Analyse du niveau d\'engagement de l\'audience cible',
      category: 'communication',
      templateType: 'pdf',
      classe: 'B',
      price: 4500,
      priceMax: 6500,
      popularity: 71,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'marque', label: 'Marque', type: 'text', required: true },
        { name: 'canal', label: 'Canal analysé', type: 'text', required: true },
        { name: 'insights', label: 'Insights audience', type: 'textarea', required: true },
        { name: 'date_rapport', label: 'Date du rapport', type: 'date', required: true },
      ]),
      body: `<h2>Rapport Engagement — {{marque}}</h2>
<p><strong>Canal :</strong> {{canal}}</p>
<p><strong>Date :</strong> {{date_rapport}}</p>
<h3>Insights</h3>
<p>{{insights}}</p>`,
    },
    {
      code: 'charte_com_001',
      name: 'Charte Graphique Communication',
      description: 'Guide d\'identité visuelle pour les supports de communication',
      category: 'communication',
      templateType: 'pdf',
      classe: 'A',
      price: 9000,
      priceMax: 11000,
      popularity: 94,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'marque', label: 'Marque', type: 'text', required: true },
        { name: 'couleurs', label: 'Palette de couleurs', type: 'textarea', required: true },
        { name: 'typographies', label: 'Typographies', type: 'textarea', required: true },
        { name: 'date_creation', label: 'Date de création', type: 'date', required: true },
      ]),
      body: `<h2>Charte Graphique — {{marque}}</h2>
<p><strong>Date :</strong> {{date_creation}}</p>
<h3>Couleurs</h3>
<p>{{couleurs}}</p>
<h3>Typographies</h3>
<p>{{typographies}}</p>`,
    },
    {
      code: 'charte_com_002',
      name: 'Charte des Réseaux Sociaux',
      description: 'Guide d\'utilisation des réseaux sociaux pour la marque',
      category: 'communication',
      templateType: 'pdf',
      classe: 'B',
      price: 5000,
      priceMax: 7000,
      popularity: 78,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'marque', label: 'Marque', type: 'text', required: true },
        { name: 'regles', label: 'Règles d\'usage', type: 'textarea', required: true },
        { name: 'comportements', label: 'Comportements attendus', type: 'textarea', required: true },
        { name: 'date_validation', label: 'Date de validation', type: 'date', required: true },
      ]),
      body: `<h2>Charte Réseaux Sociaux — {{marque}}</h2>
<p><strong>Validée le :</strong> {{date_validation}}</p>
<h3>Règles</h3>
<p>{{regles}}</p>
<h3>Comportements attendus</h3>
<p>{{comportements}}</p>`,
    },
    {
      code: 'brief_com_001',
      name: 'Brief Stratégie de Communication',
      description: 'Document de cadrage stratégique pour une communication globale',
      category: 'communication',
      templateType: 'pdf',
      classe: 'A',
      price: 10000,
      priceMax: 12000,
      popularity: 95,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'client', label: 'Client', type: 'text', required: true },
        { name: 'enjeux', label: 'Enjeux de communication', type: 'textarea', required: true },
        { name: 'cibles', label: 'Cibles prioritaires', type: 'textarea', required: true },
        { name: 'date_brief', label: 'Date du brief', type: 'date', required: true },
      ]),
      body: `<h2>Brief Stratégie — {{client}}</h2>
<p><strong>Date :</strong> {{date_brief}}</p>
<h3>Enjeux</h3>
<p>{{enjeux}}</p>
<h3>Cibles</h3>
<p>{{cibles}}</p>`,
    },
    {
      code: 'brief_com_002',
      name: 'Brief Création Contenu',
      description: 'Instructions créatives pour la production de contenu',
      category: 'communication',
      templateType: 'pdf',
      classe: 'B',
      price: 3000,
      priceMax: 5000,
      popularity: 73,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'marque', label: 'Marque', type: 'text', required: true },
        { name: 'type_contenu', label: 'Type de contenu', type: 'text', required: true },
        { name: 'instructions', label: 'Instructions créatives', type: 'textarea', required: true },
        { name: 'date_livraison', label: 'Date de livraison', type: 'date', required: true },
      ]),
      body: `<h2>Brief Contenu — {{marque}}</h2>
<p><strong>Type :</strong> {{type_contenu}}</p>
<p><strong>Livraison :</strong> {{date_livraison}}</p>
<h3>Instructions</h3>
<p>{{instructions}}</p>`,
    },
    {
      code: 'webinar_001',
      name: 'Dossier Intervenant Webinaire',
      description: 'Kit complet pour les intervenants d\'un webinaire',
      category: 'communication',
      templateType: 'pdf',
      classe: 'B',
      price: 2000,
      priceMax: 4000,
      popularity: 61,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'webinaire', label: 'Titre du webinaire', type: 'text', required: true },
        { name: 'intervenant', label: 'Nom de l\'intervenant', type: 'text', required: true },
        { name: 'consignes', label: 'Consignes techniques', type: 'textarea', required: true },
        { name: 'date_evenement', label: 'Date de l\'événement', type: 'date', required: true },
      ]),
      body: `<h2>Dossier Intervenant — {{webinaire}}</h2>
<p><strong>Intervenant :</strong> {{intervenant}}</p>
<p><strong>Date :</strong> {{date_evenement}}</p>
<h3>Consignes</h3>
<p>{{consignes}}</p>`,
    },
    {
      code: 'webinar_002',
      name: 'Support de Communication Webinaire',
      description: 'Kit de promotion et communication autour d\'un webinaire',
      category: 'communication',
      templateType: 'pdf',
      classe: 'B',
      price: 2500,
      priceMax: 4500,
      popularity: 65,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'webinaire', label: 'Titre du webinaire', type: 'text', required: true },
        { name: 'description', label: 'Description de l\'événement', type: 'textarea', required: true },
        { name: 'cta', label: 'Appel à l\'action', type: 'text', required: true },
        { name: 'date_webinaire', label: 'Date du webinaire', type: 'date', required: true },
      ]),
      body: `<h2>{{webinaire}}</h2>
<p><strong>Date :</strong> {{date_webinaire}}</p>
<p>{{description}}</p>
<p><strong>{{cta}}</strong></p>`,
    },
    {
      code: 'webinar_003',
      name: 'Compte Rendu Post-Webinaire',
      description: 'Synthèse et suites données après un webinaire',
      category: 'communication',
      templateType: 'pdf',
      classe: 'C',
      price: 1500,
      priceMax: 3500,
      popularity: 54,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'webinaire', label: 'Titre du webinaire', type: 'text', required: true },
        { name: 'participants', label: 'Nombre de participants', type: 'text', required: true },
        { name: 'synthese', label: 'Synthèse des échanges', type: 'textarea', required: true },
        { name: 'date_webinaire', label: 'Date du webinaire', type: 'date', required: true },
      ]),
      body: `<h2>CR Post-Webinaire — {{webinaire}}</h2>
<p><strong>Date :</strong> {{date_webinaire}}</p>
<p><strong>Participants :</strong> {{participants}}</p>
<h3>Synthèse</h3>
<p>{{synthese}}</p>`,
    },
    {
      code: 'formation_com_001',
      name: 'Module Formation Réseaux Sociaux',
      description: 'Support pédagogique pour formation aux réseaux sociaux',
      category: 'communication',
      templateType: 'pdf',
      classe: 'B',
      price: 4000,
      priceMax: 6000,
      popularity: 68,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'formateur', label: 'Formateur', type: 'text', required: true },
        { name: 'niveau', label: 'Niveau du public', type: 'text', required: true },
        { name: 'contenu_module', label: 'Contenu du module', type: 'textarea', required: true },
        { name: 'date_formation', label: 'Date de formation', type: 'date', required: true },
      ]),
      body: `<h2>Module Formation RS — {{formateur}}</h2>
<p><strong>Niveau :</strong> {{niveau}}</p>
<p><strong>Date :</strong> {{date_formation}}</p>
<h3>Contenu</h3>
<p>{{contenu_module}}</p>`,
    },
    {
      code: 'formation_com_002',
      name: 'Kit Onboarding Communication',
      description: 'Dossier d\'intégration pour les équipes communication',
      category: 'communication',
      templateType: 'pdf',
      classe: 'B',
      price: 3500,
      priceMax: 5500,
      popularity: 62,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'entreprise', label: 'Entreprise', type: 'text', required: true },
        { name: 'nouveau_membre', label: 'Nom du nouveau membre', type: 'text', required: true },
        { name: 'outils', label: 'Outils et process à maîtriser', type: 'textarea', required: true },
        { name: 'date_arrivee', label: 'Date d\'arrivée', type: 'date', required: true },
      ]),
      body: `<h2>Onboarding Com — {{nouveau_membre}}</h2>
<p><strong>Entreprise :</strong> {{entreprise}}</p>
<p><strong>Arrivée :</strong> {{date_arrivee}}</p>
<h3>Outils / Process</h3>
<p>{{outils}}</p>`,
    },
    {
      code: 'dig_com_012',
      name: 'Stratégie SEO & Contenu',
      description: 'Plan d\'optimisation SEO et production de contenu',
      category: 'communication',
      templateType: 'pdf',
      classe: 'A',
      price: 8000,
      priceMax: 10000,
      popularity: 93,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'site', label: 'Site web', type: 'text', required: true },
        { name: 'mots_cles', label: 'Mots-clés cibles', type: 'textarea', required: true },
        { name: 'plan_action', label: 'Plan d\'action SEO', type: 'textarea', required: true },
        { name: 'date_audit', label: 'Date d\'audit', type: 'date', required: true },
      ]),
      body: `<h2>Stratégie SEO — {{site}}</h2>
<p><strong>Audit :</strong> {{date_audit}}</p>
<h3>Mots-clés</h3>
<p>{{mots_cles}}</p>
<h3>Plan d'action</h3>
<p>{{plan_action}}</p>`,
    },
    {
      code: 'dig_com_013',
      name: 'Rapport Google Analytics',
      description: 'Analyse du trafic et comportement utilisateurs',
      category: 'communication',
      templateType: 'excel',
      classe: 'B',
      price: 3000,
      priceMax: 5000,
      popularity: 85,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'site', label: 'Site web', type: 'text', required: true },
        { name: 'periode', label: 'Période d\'analyse', type: 'text', required: true },
        { name: 'observations', label: 'Observations clés', type: 'textarea', required: true },
        { name: 'date_rapport', label: 'Date du rapport', type: 'date', required: true },
      ]),
      body: `<h2>Rapport Analytics — {{site}}</h2>
<p><strong>Période :</strong> {{periode}}</p>
<p><strong>Date :</strong> {{date_rapport}}</p>
<h3>Observations</h3>
<p>{{observations}}</p>`,
    },
    {
      code: 'dig_com_014',
      name: 'Plan Lancement Produit',
      description: 'Stratégie de communication pour un lancement produit',
      category: 'communication',
      templateType: 'pdf',
      classe: 'A',
      price: 9000,
      priceMax: 11000,
      popularity: 96,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'marque', label: 'Marque', type: 'text', required: true },
        { name: 'produit', label: 'Produit lancé', type: 'text', required: true },
        { name: 'plan_actions', label: 'Plan d\'actions', type: 'textarea', required: true },
        { name: 'date_lancement', label: 'Date de lancement', type: 'date', required: true },
      ]),
      body: `<h2>Lancement — {{produit}} | {{marque}}</h2>
<p><strong>Date :</strong> {{date_lancement}}</p>
<h3>Plan d'actions</h3>
<p>{{plan_actions}}</p>`,
    },
    {
      code: 'dig_com_015',
      name: 'Dossier de Presse',
      description: 'Kit média complet pour relations presse',
      category: 'communication',
      templateType: 'pdf',
      classe: 'A',
      price: 7000,
      priceMax: 9000,
      popularity: 88,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'organisation', label: 'Organisation', type: 'text', required: true },
        { name: 'sujet', label: 'Sujet principal', type: 'text', required: true },
        { name: 'presentation', label: 'Présentation de l\'organisation', type: 'textarea', required: true },
        { name: 'date_dp', label: 'Date du dossier', type: 'date', required: true },
      ]),
      body: `<h2>Dossier de Presse — {{organisation}}</h2>
<p><strong>Sujet :</strong> {{sujet}}</p>
<p><strong>Date :</strong> {{date_dp}}</p>
<h3>Présentation</h3>
<p>{{presentation}}</p>`,
    },
    {
      code: 'dig_com_016',
      name: 'Communiqué de Presse',
      description: 'Rédaction d\'un communiqué de presse officiel',
      category: 'communication',
      templateType: 'pdf',
      classe: 'B',
      price: 2000,
      priceMax: 4000,
      popularity: 82,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'organisation', label: 'Organisation', type: 'text', required: true },
        { name: 'titre', label: 'Titre du communiqué', type: 'text', required: true },
        { name: 'corps', label: 'Corps du communiqué', type: 'textarea', required: true },
        { name: 'date_diffusion', label: 'Date de diffusion', type: 'date', required: true },
      ]),
      body: `<h2>COMMUNIQUÉ DE PRESSE</h2>
<p><strong>{{titre}}</strong></p>
<p><em>{{organisation}} — {{date_diffusion}}</em></p>
<p>{{corps}}</p>`,
    },
    {
      code: 'dig_com_017',
      name: 'Plan Crise Communication',
      description: 'Protocole de gestion de crise et communication d\'urgence',
      category: 'communication',
      templateType: 'pdf',
      classe: 'A',
      price: 12000,
      priceMax: 14000,
      popularity: 97,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'organisation', label: 'Organisation', type: 'text', required: true },
        { name: 'scenarios', label: 'Scénarios de crise', type: 'textarea', required: true },
        { name: 'protocole', label: 'Protocole de réponse', type: 'textarea', required: true },
        { name: 'date_validation', label: 'Date de validation', type: 'date', required: true },
      ]),
      body: `<h2>Plan de Crise — {{organisation}}</h2>
<p><strong>Validé le :</strong> {{date_validation}}</p>
<h3>Scénarios</h3>
<p>{{scenarios}}</p>
<h3>Protocole</h3>
<p>{{protocole}}</p>`,
    },
    {
      code: 'dig_com_018',
      name: 'Stratégie de Contenu UGC',
      description: 'Plan de valorisation du contenu généré par les utilisateurs',
      category: 'communication',
      templateType: 'pdf',
      classe: 'B',
      price: 4000,
      priceMax: 6000,
      popularity: 69,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'marque', label: 'Marque', type: 'text', required: true },
        { name: 'mecanismes', label: 'Mécanismes d\'encouragement UGC', type: 'textarea', required: true },
        { name: 'valorisation', label: 'Actions de valorisation', type: 'textarea', required: true },
        { name: 'date_debut', label: 'Date de début', type: 'date', required: true },
      ]),
      body: `<h2>Stratégie UGC — {{marque}}</h2>
<p><strong>Début :</strong> {{date_debut}}</p>
<h3>Mécanismes</h3>
<p>{{mecanismes}}</p>
<h3>Valorisation</h3>
<p>{{valorisation}}</p>`,
    },
    {
      code: 'dig_com_019',
      name: 'Plan Communication Événementielle',
      description: 'Stratégie de communication autour d\'un événement',
      category: 'communication',
      templateType: 'pdf',
      classe: 'B',
      price: 5000,
      priceMax: 7000,
      popularity: 76,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'evenement', label: 'Nom de l\'événement', type: 'text', required: true },
        { name: 'organisateur', label: 'Organisateur', type: 'text', required: true },
        { name: 'plan_com', label: 'Plan de communication', type: 'textarea', required: true },
        { name: 'date_evenement', label: 'Date de l\'événement', type: 'date', required: true },
      ]),
      body: `<h2>Com Événementielle — {{evenement}}</h2>
<p><strong>Organisateur :</strong> {{organisateur}}</p>
<p><strong>Date :</strong> {{date_evenement}}</p>
<h3>Plan</h3>
<p>{{plan_com}}</p>`,
    },
    {
      code: 'dig_com_020',
      name: 'Audit Communication Digitale',
      description: 'Évaluation complète de la présence digitale d\'une organisation',
      category: 'communication',
      templateType: 'pdf',
      classe: 'A',
      price: 11000,
      priceMax: 13000,
      popularity: 91,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'organisation', label: 'Organisation', type: 'text', required: true },
        { name: 'perimetre', label: 'Périmètre de l\'audit', type: 'textarea', required: true },
        { name: 'constats', label: 'Constats et recommandations', type: 'textarea', required: true },
        { name: 'date_audit', label: 'Date d\'audit', type: 'date', required: true },
      ]),
      body: `<h2>Audit Digital — {{organisation}}</h2>
<p><strong>Date :</strong> {{date_audit}}</p>
<h3>Périmètre</h3>
<p>{{perimetre}}</p>
<h3>Constats</h3>
<p>{{constats}}</p>`,
    },
    {
      code: 'dig_com_021',
      name: 'Benchmark Concurrentiel Communication',
      description: 'Analyse comparative des stratégies de communication concurrentes',
      category: 'communication',
      templateType: 'excel',
      classe: 'A',
      price: 9000,
      priceMax: 11000,
      popularity: 84,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'marque', label: 'Marque analysante', type: 'text', required: true },
        { name: 'concurrents', label: 'Concurrents analysés', type: 'textarea', required: true },
        { name: 'criteres', label: 'Critères de comparaison', type: 'textarea', required: true },
        { name: 'date_benchmark', label: 'Date du benchmark', type: 'date', required: true },
      ]),
      body: `<h2>Benchmark Com — {{marque}}</h2>
<p><strong>Date :</strong> {{date_benchmark}}</p>
<h3>Concurrents</h3>
<p>{{concurrents}}</p>
<h3>Critères</h3>
<p>{{criteres}}</p>`,
    },
    {
      code: 'dig_com_022',
      name: 'Stratégie Podcast de Marque',
      description: 'Plan de développement d\'un podcast branded',
      category: 'communication',
      templateType: 'pdf',
      classe: 'B',
      price: 5500,
      priceMax: 7500,
      popularity: 67,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'marque', label: 'Marque', type: 'text', required: true },
        { name: 'concept_podcast', label: 'Concept du podcast', type: 'textarea', required: true },
        { name: 'planning', label: 'Planning de production', type: 'textarea', required: true },
        { name: 'date_lancement', label: 'Date de lancement', type: 'date', required: true },
      ]),
      body: `<h2>Stratégie Podcast — {{marque}}</h2>
<p><strong>Lancement :</strong> {{date_lancement}}</p>
<h3>Concept</h3>
<p>{{concept_podcast}}</p>
<h3>Planning</h3>
<p>{{planning}}</p>`,
    },
    {
      code: 'dig_com_023',
      name: 'Plan Storytelling de Marque',
      description: 'Architecture narrative et storytelling pour la marque',
      category: 'communication',
      templateType: 'pdf',
      classe: 'A',
      price: 7500,
      priceMax: 9500,
      popularity: 80,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'marque', label: 'Marque', type: 'text', required: true },
        { name: 'histoire', label: 'Histoire de la marque', type: 'textarea', required: true },
        { name: 'archetypes', label: 'Archétypes et personnages', type: 'textarea', required: true },
        { name: 'date_document', label: 'Date du document', type: 'date', required: true },
      ]),
      body: `<h2>Storytelling — {{marque}}</h2>
<p><strong>Date :</strong> {{date_document}}</p>
<h3>Histoire</h3>
<p>{{histoire}}</p>
<h3>Archétypes</h3>
<p>{{archetypes}}</p>`,
    },
    {
      code: 'dig_com_024',
      name: 'Tableau de Suivi Influenceurs',
      description: 'Outil de gestion et suivi des partenariats influenceurs',
      category: 'communication',
      templateType: 'excel',
      classe: 'B',
      price: 3500,
      priceMax: 5500,
      popularity: 75,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'marque', label: 'Marque', type: 'text', required: true },
        { name: 'campagne', label: 'Campagne', type: 'text', required: true },
        { name: 'criteres_selection', label: 'Critères de sélection', type: 'textarea', required: true },
        { name: 'date_campagne', label: 'Date de campagne', type: 'date', required: true },
      ]),
      body: `<h2>Suivi Influenceurs — {{marque}}</h2>
<p><strong>Campagne :</strong> {{campagne}}</p>
<p><strong>Date :</strong> {{date_campagne}}</p>
<h3>Critères</h3>
<p>{{criteres_selection}}</p>`,
    },
    {
      code: 'dig_com_025',
      name: 'Guide Ligne Éditoriale',
      description: 'Document définissant la ligne éditoriale des communications',
      category: 'communication',
      templateType: 'pdf',
      classe: 'A',
      price: 6000,
      priceMax: 8000,
      popularity: 83,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'organisation', label: 'Organisation', type: 'text', required: true },
        { name: 'positionnement', label: 'Positionnement éditorial', type: 'textarea', required: true },
        { name: 'interdits', label: 'Sujets à éviter', type: 'textarea', required: true },
        { name: 'date_document', label: 'Date du document', type: 'date', required: true },
      ]),
      body: `<h2>Ligne Éditoriale — {{organisation}}</h2>
<p><strong>Date :</strong> {{date_document}}</p>
<h3>Positionnement</h3>
<p>{{positionnement}}</p>
<h3>À éviter</h3>
<p>{{interdits}}</p>`,
    },
    {
      code: 'dig_com_026',
      name: 'Plan Communication RSE',
      description: 'Stratégie de communication sur la responsabilité sociétale',
      category: 'communication',
      templateType: 'pdf',
      classe: 'A',
      price: 8500,
      priceMax: 10500,
      popularity: 79,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'entreprise', label: 'Entreprise', type: 'text', required: true },
        { name: 'engagements', label: 'Engagements RSE', type: 'textarea', required: true },
        { name: 'messages_cles', label: 'Messages clés', type: 'textarea', required: true },
        { name: 'date_plan', label: 'Date du plan', type: 'date', required: true },
      ]),
      body: `<h2>Plan Com RSE — {{entreprise}}</h2>
<p><strong>Date :</strong> {{date_plan}}</p>
<h3>Engagements</h3>
<p>{{engagements}}</p>
<h3>Messages clés</h3>
<p>{{messages_cles}}</p>`,
    },
    {
      code: 'dig_com_027',
      name: 'Rapport Satisfaction Client',
      description: 'Analyse des retours et satisfaction de la clientèle',
      category: 'communication',
      templateType: 'excel',
      classe: 'B',
      price: 4000,
      priceMax: 6000,
      popularity: 72,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'entreprise', label: 'Entreprise', type: 'text', required: true },
        { name: 'periode', label: 'Période', type: 'text', required: true },
        { name: 'resultats', label: 'Résultats de satisfaction', type: 'textarea', required: true },
        { name: 'date_rapport', label: 'Date du rapport', type: 'date', required: true },
      ]),
      body: `<h2>Rapport Satisfaction — {{entreprise}}</h2>
<p><strong>Période :</strong> {{periode}}</p>
<p><strong>Date :</strong> {{date_rapport}}</p>
<h3>Résultats</h3>
<p>{{resultats}}</p>`,
    },
    {
      code: 'dig_com_028',
      name: 'Plan Sponsoring Communication',
      description: 'Stratégie de sponsoring et partenariats médias',
      category: 'communication',
      templateType: 'pdf',
      classe: 'B',
      price: 5000,
      priceMax: 7000,
      popularity: 64,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'marque', label: 'Marque', type: 'text', required: true },
        { name: 'evenements', label: 'Événements sponsorisés', type: 'textarea', required: true },
        { name: 'retombees', label: 'Retombées attendues', type: 'textarea', required: true },
        { name: 'date_debut', label: 'Date de début', type: 'date', required: true },
      ]),
      body: `<h2>Plan Sponsoring — {{marque}}</h2>
<p><strong>Début :</strong> {{date_debut}}</p>
<h3>Événements</h3>
<p>{{evenements}}</p>
<h3>Retombées</h3>
<p>{{retombees}}</p>`,
    },
    {
      code: 'dig_com_029',
      name: 'Note de Cadrage Communication',
      description: 'Document de cadrage pour un projet de communication',
      category: 'communication',
      templateType: 'pdf',
      classe: 'B',
      price: 3000,
      priceMax: 5000,
      popularity: 66,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'projet', label: 'Nom du projet', type: 'text', required: true },
        { name: 'commanditaire', label: 'Commanditaire', type: 'text', required: true },
        { name: 'perimetre', label: 'Périmètre du projet', type: 'textarea', required: true },
        { name: 'date_cadrage', label: 'Date de cadrage', type: 'date', required: true },
      ]),
      body: `<h2>Note de Cadrage — {{projet}}</h2>
<p><strong>Commanditaire :</strong> {{commanditaire}}</p>
<p><strong>Date :</strong> {{date_cadrage}}</p>
<h3>Périmètre</h3>
<p>{{perimetre}}</p>`,
    },
    {
      code: 'dig_com_030',
      name: 'Synthèse Veille Concurrentielle',
      description: 'Rapport de veille sur les communications concurrentes',
      category: 'communication',
      templateType: 'pdf',
      classe: 'B',
      price: 3500,
      priceMax: 5500,
      popularity: 70,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'marque', label: 'Marque', type: 'text', required: true },
        { name: 'concurrents', label: 'Concurrents surveillés', type: 'text', required: true },
        { name: 'observations', label: 'Observations clés', type: 'textarea', required: true },
        { name: 'date_veille', label: 'Date de veille', type: 'date', required: true },
      ]),
      body: `<h2>Veille Concurrentielle — {{marque}}</h2>
<p><strong>Concurrents :</strong> {{concurrents}}</p>
<p><strong>Date :</strong> {{date_veille}}</p>
<h3>Observations</h3>
<p>{{observations}}</p>`,
    },
  ];

  for (const t of templates) {
    const r = await prisma.documentTemplate.upsert({
      where: { code: t.code },
      update: t,
      create: t,
    });
    if (r.createdAt === r.updatedAt) {
      created++;
    } else {
      updated++;
    }
  }

  const total = await prisma.documentTemplate.count();
  console.log(`Batch comm-02 OK — créés:${created} maj:${updated} TOTAL:${total}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
