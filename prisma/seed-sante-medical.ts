import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const templates = [
  {
    code: 'med_ordonnance',
    name: 'Ordonnance médicale',
    category: 'sante',
    description: 'Ordonnance médicale standard conforme aux pratiques OHADA',
    price: 300,
    currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_medecin', label: 'Nom du médecin', type: 'text', required: true },
      { name: 'specialite', label: 'Spécialité', type: 'text', required: true },
      { name: 'numero_ordre', label: 'N° Ordre médical', type: 'text', required: false },
      { name: 'etablissement', label: 'Établissement / Cabinet', type: 'text', required: false },
      { name: 'ville', label: 'Ville', type: 'text', required: true },
      { name: 'nom_patient', label: 'Nom du patient', type: 'text', required: true },
      { name: 'age_patient', label: 'Âge du patient', type: 'text', required: true },
      { name: 'date_consultation', label: 'Date de consultation', type: 'date', required: true },
      { name: 'prescriptions', label: 'Prescriptions médicales', type: 'textarea', required: true },
      { name: 'posologie', label: 'Posologie et durée', type: 'textarea', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;border:1px solid #ddd;">
<div style="border-bottom:2px solid #1565C0;padding-bottom:10px;margin-bottom:15px;">
<h2 style="color:#1565C0;margin:0;">Dr. {{nom_medecin}}</h2>
<p style="margin:4px 0;color:#555;">{{specialite}} — N° Ordre : {{numero_ordre}}</p>
<p style="margin:4px 0;color:#555;">{{etablissement}} — {{ville}}</p>
</div>
<div style="text-align:right;margin-bottom:15px;"><strong>ORDONNANCE MÉDICALE</strong><br/>Date : {{date_consultation}}</div>
<div style="margin-bottom:15px;"><strong>Patient :</strong> {{nom_patient}} — Âge : {{age_patient}}</div>
<div style="background:#F8F9FA;padding:15px;border-left:3px solid #1565C0;min-height:80px;">
<strong>Prescriptions :</strong><br/>{{prescriptions}}<br/><br/>
<strong>Posologie :</strong><br/>{{posologie}}
</div>
<div style="margin-top:30px;text-align:right;">
<p>Signature et cachet du médecin</p>
<div style="border:1px solid #ccc;width:150px;height:60px;display:inline-block;margin-top:5px;"></div>
</div>
<div style="margin-top:15px;font-size:10px;color:#999;text-align:center;border-top:1px solid #eee;padding-top:8px;">Document à usage médical — Confidentiel</div>
</div>`,
    countriesJson: JSON.stringify(['CI','SN','CM','BJ','TG','BF','ML','GN','CD','CG','GA','NE','TD','MR']),
    active: true,
    popularity: 60,
  },
  {
    code: 'med_certificat_aptitude',
    name: 'Certificat d\'aptitude médicale',
    category: 'sante',
    description: 'Certificat médical d\'aptitude physique pour emploi, sport ou formation',
    price: 300,
    currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_medecin', label: 'Nom du médecin', type: 'text', required: true },
      { name: 'specialite', label: 'Spécialité', type: 'text', required: false },
      { name: 'numero_ordre', label: 'N° Ordre médical', type: 'text', required: false },
      { name: 'nom_patient', label: 'Nom complet du patient', type: 'text', required: true },
      { name: 'date_naissance', label: 'Date de naissance', type: 'date', required: true },
      { name: 'objet_aptitude', label: 'Objet de l\'aptitude', type: 'text', required: true },
      { name: 'conclusion', label: 'Conclusion médicale', type: 'select', required: true, options: ['Apte','Apte avec réserves','Inapte temporairement','Inapte définitivement'] },
      { name: 'reserves', label: 'Réserves éventuelles', type: 'textarea', required: false },
      { name: 'date_examen', label: 'Date de l\'examen', type: 'date', required: true },
      { name: 'validite', label: 'Validité du certificat', type: 'text', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;border:1px solid #ccc;">
<div style="text-align:center;border-bottom:2px solid #2E7D32;padding-bottom:10px;margin-bottom:20px;">
<h2 style="color:#2E7D32;margin:0;">CERTIFICAT D'APTITUDE MÉDICALE</h2>
<p style="color:#555;margin:4px 0;">Dr. {{nom_medecin}} — {{specialite}} — N° Ordre : {{numero_ordre}}</p>
</div>
<p>Je soussigné(e), <strong>Dr. {{nom_medecin}}</strong>, certifie avoir examiné ce jour :</p>
<table style="width:100%;border-collapse:collapse;margin:10px 0;">
<tr><td style="padding:4px;font-weight:bold;width:40%;">Nom :</td><td>{{nom_patient}}</td></tr>
<tr><td style="padding:4px;font-weight:bold;">Date de naissance :</td><td>{{date_naissance}}</td></tr>
<tr><td style="padding:4px;font-weight:bold;">Objet :</td><td>{{objet_aptitude}}</td></tr>
</table>
<div style="background:#E8F5E9;border-left:4px solid #2E7D32;padding:12px;margin:15px 0;">
<strong>Conclusion :</strong> <span style="font-size:1.1em;">{{conclusion}}</span><br/>
<span style="color:#555;">{{reserves}}</span>
</div>
<p>Certificat établi le <strong>{{date_examen}}</strong> — Validité : {{validite}}</p>
<div style="text-align:right;margin-top:20px;">
<p>Signature et cachet</p>
<div style="border:1px solid #ccc;width:140px;height:60px;display:inline-block;"></div>
</div>
</div>`,
    countriesJson: JSON.stringify(['CI','SN','CM','BJ','TG','BF','ML','GN','CD','CG','GA','NE','TD','MR']),
    active: true,
    popularity: 55,
  },
  {
    code: 'med_certificat_incapacite',
    name: 'Certificat médical d\'incapacité temporaire',
    category: 'sante',
    description: 'Certificat d\'arrêt de travail ou d\'incapacité temporaire de travail',
    price: 300,
    currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_medecin', label: 'Nom du médecin', type: 'text', required: true },
      { name: 'numero_ordre', label: 'N° Ordre médical', type: 'text', required: false },
      { name: 'nom_patient', label: 'Nom du patient', type: 'text', required: true },
      { name: 'date_naissance', label: 'Date de naissance', type: 'date', required: false },
      { name: 'profession', label: 'Profession', type: 'text', required: false },
      { name: 'motif', label: 'Motif médical (diagnostic)', type: 'textarea', required: true },
      { name: 'date_debut', label: 'Date de début d\'incapacité', type: 'date', required: true },
      { name: 'date_fin', label: 'Date de fin d\'incapacité', type: 'date', required: true },
      { name: 'date_certificat', label: 'Date du certificat', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;border:1px solid #ccc;">
<div style="text-align:center;border-bottom:2px solid #C62828;padding-bottom:10px;margin-bottom:20px;">
<h2 style="color:#C62828;margin:0;">CERTIFICAT MÉDICAL D'INCAPACITÉ TEMPORAIRE</h2>
<p style="color:#555;margin:4px 0;">Dr. {{nom_medecin}} — N° Ordre : {{numero_ordre}}</p>
</div>
<p>Je soussigné(e), <strong>Dr. {{nom_medecin}}</strong>, certifie que l'état de santé de :</p>
<table style="width:100%;border-collapse:collapse;margin:10px 0;">
<tr><td style="padding:4px;font-weight:bold;width:40%;">Nom :</td><td>{{nom_patient}}</td></tr>
<tr><td style="padding:4px;font-weight:bold;">Né(e) le :</td><td>{{date_naissance}}</td></tr>
<tr><td style="padding:4px;font-weight:bold;">Profession :</td><td>{{profession}}</td></tr>
</table>
<div style="background:#FFEBEE;border-left:4px solid #C62828;padding:12px;margin:15px 0;">
<strong>Motif :</strong> {{motif}}
</div>
<p>Justifie une <strong>incapacité temporaire de travail</strong> du <strong>{{date_debut}}</strong> au <strong>{{date_fin}}</strong> inclus.</p>
<p style="margin-top:20px;">Fait le <strong>{{date_certificat}}</strong></p>
<div style="text-align:right;margin-top:15px;">
<p>Signature et cachet du médecin</p>
<div style="border:1px solid #ccc;width:140px;height:60px;display:inline-block;"></div>
</div>
</div>`,
    countriesJson: JSON.stringify(['CI','SN','CM','BJ','TG','BF','ML','GN','CD','CG','GA','NE','TD','MR']),
    active: true,
    popularity: 65,
  },
  {
    code: 'med_bon_examen',
    name: 'Bon d\'examen complémentaire',
    category: 'sante',
    description: 'Bon de prescription pour examens biologiques, radiologiques ou spécialisés',
    price: 200,
    currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_medecin', label: 'Nom du médecin prescripteur', type: 'text', required: true },
      { name: 'specialite', label: 'Spécialité', type: 'text', required: false },
      { name: 'nom_patient', label: 'Nom du patient', type: 'text', required: true },
      { name: 'age_patient', label: 'Âge', type: 'text', required: false },
      { name: 'type_examen', label: 'Type d\'examen', type: 'select', required: true, options: ['Biologie','Radiologie','Échographie','Scanner','IRM','Endoscopie','Autre'] },
      { name: 'examens_demandes', label: 'Examens demandés', type: 'textarea', required: true },
      { name: 'motif_clinique', label: 'Motif clinique', type: 'textarea', required: false },
      { name: 'degre_urgence', label: 'Degré d\'urgence', type: 'select', required: false, options: ['Normal','Urgent','Très urgent'] },
      { name: 'date_prescription', label: 'Date', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;border:1px solid #ccc;">
<div style="border-bottom:2px solid #6A1B9A;padding-bottom:10px;margin-bottom:15px;">
<h2 style="color:#6A1B9A;margin:0;">BON D'EXAMEN COMPLÉMENTAIRE</h2>
<p style="color:#555;margin:4px 0;">Dr. {{nom_medecin}} — {{specialite}}</p>
</div>
<p><strong>Patient :</strong> {{nom_patient}} — Âge : {{age_patient}}</p>
<p><strong>Date :</strong> {{date_prescription}} — <strong>Type :</strong> {{type_examen}} — <strong>Urgence :</strong> {{degre_urgence}}</p>
<div style="background:#F3E5F5;border-left:4px solid #6A1B9A;padding:12px;margin:15px 0;">
<strong>Examens demandés :</strong><br/>{{examens_demandes}}
</div>
<div style="background:#FAFAFA;padding:10px;border:1px dashed #ccc;margin-top:10px;">
<strong>Contexte clinique :</strong><br/>{{motif_clinique}}
</div>
<div style="text-align:right;margin-top:20px;">
<p>Signature et cachet</p>
<div style="border:1px solid #ccc;width:140px;height:60px;display:inline-block;"></div>
</div>
</div>`,
    countriesJson: JSON.stringify(['CI','SN','CM','BJ','TG','BF','ML','GN','CD','CG','GA','NE','TD','MR']),
    active: true,
    popularity: 50,
  },
  {
    code: 'med_lettre_confrere',
    name: 'Lettre de correspondance médicale',
    category: 'sante',
    description: 'Lettre médicale de correspondance entre confrères pour adressage ou avis spécialisé',
    price: 300,
    currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_expediteur', label: 'Médecin expéditeur', type: 'text', required: true },
      { name: 'specialite_expediteur', label: 'Spécialité expéditeur', type: 'text', required: false },
      { name: 'nom_destinataire', label: 'Médecin destinataire', type: 'text', required: true },
      { name: 'specialite_destinataire', label: 'Spécialité destinataire', type: 'text', required: false },
      { name: 'nom_patient', label: 'Nom du patient', type: 'text', required: true },
      { name: 'age_patient', label: 'Âge', type: 'text', required: false },
      { name: 'motif_adressage', label: 'Motif d\'adressage', type: 'textarea', required: true },
      { name: 'antecedents', label: 'Antécédents pertinents', type: 'textarea', required: false },
      { name: 'traitement_actuel', label: 'Traitement en cours', type: 'textarea', required: false },
      { name: 'date_lettre', label: 'Date', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;border:1px solid #ccc;">
<div style="border-bottom:2px solid #0277BD;padding-bottom:10px;margin-bottom:15px;">
<p style="margin:0;font-weight:bold;">Dr. {{nom_expediteur}} — {{specialite_expediteur}}</p>
</div>
<p style="text-align:right;">{{date_lettre}}</p>
<p><strong>À l'attention du Dr. {{nom_destinataire}}</strong><br/>{{specialite_destinataire}}</p>
<p>Cher(e) Confrère,</p>
<p>Je vous adresse mon patient(e) <strong>{{nom_patient}}</strong> ({{age_patient}}) pour :</p>
<div style="background:#E1F5FE;border-left:4px solid #0277BD;padding:12px;margin:10px 0;">
<strong>Motif :</strong> {{motif_adressage}}
</div>
<p><strong>Antécédents :</strong> {{antecedents}}</p>
<p><strong>Traitement actuel :</strong> {{traitement_actuel}}</p>
<p>Restant à votre disposition pour tout renseignement complémentaire.</p>
<p>Confraternellement,</p>
<div style="text-align:right;margin-top:15px;">
<div style="border:1px solid #ccc;width:140px;height:60px;display:inline-block;"></div>
</div>
</div>`,
    countriesJson: JSON.stringify(['CI','SN','CM','BJ','TG','BF','ML','GN','CD','CG','GA','NE','TD','MR']),
    active: true,
    popularity: 45,
  },
  {
    code: 'med_compte_rendu_hospit',
    name: 'Compte rendu d\'hospitalisation',
    category: 'sante',
    description: 'Compte rendu de sortie d\'hospitalisation pour le médecin traitant',
    price: 400,
    currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'etablissement', label: 'Établissement hospitalier', type: 'text', required: true },
      { name: 'service', label: 'Service', type: 'text', required: true },
      { name: 'medecin_responsable', label: 'Médecin responsable', type: 'text', required: true },
      { name: 'nom_patient', label: 'Nom du patient', type: 'text', required: true },
      { name: 'date_naissance', label: 'Date de naissance', type: 'date', required: false },
      { name: 'date_entree', label: 'Date d\'entrée', type: 'date', required: true },
      { name: 'date_sortie', label: 'Date de sortie', type: 'date', required: true },
      { name: 'diagnostic', label: 'Diagnostic principal', type: 'textarea', required: true },
      { name: 'traitement_realise', label: 'Traitement réalisé', type: 'textarea', required: true },
      { name: 'consignes_sortie', label: 'Consignes de sortie', type: 'textarea', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;border:1px solid #ccc;">
<div style="text-align:center;background:#1565C0;color:white;padding:12px;margin-bottom:15px;">
<h2 style="margin:0;">COMPTE RENDU D'HOSPITALISATION</h2>
<p style="margin:4px 0;">{{etablissement}} — Service : {{service}}</p>
</div>
<table style="width:100%;border-collapse:collapse;margin-bottom:15px;font-size:14px;">
<tr><td style="padding:4px;font-weight:bold;width:40%;">Patient :</td><td>{{nom_patient}}</td></tr>
<tr><td style="padding:4px;font-weight:bold;">Né(e) le :</td><td>{{date_naissance}}</td></tr>
<tr><td style="padding:4px;font-weight:bold;">Entrée / Sortie :</td><td>{{date_entree}} → {{date_sortie}}</td></tr>
<tr><td style="padding:4px;font-weight:bold;">Médecin :</td><td>Dr. {{medecin_responsable}}</td></tr>
</table>
<div style="background:#E3F2FD;padding:10px;border-left:3px solid #1565C0;margin-bottom:10px;">
<strong>Diagnostic :</strong><br/>{{diagnostic}}
</div>
<div style="background:#FAFAFA;padding:10px;border-left:3px solid #555;margin-bottom:10px;">
<strong>Traitement réalisé :</strong><br/>{{traitement_realise}}
</div>
<div style="background:#E8F5E9;padding:10px;border-left:3px solid #2E7D32;">
<strong>Consignes de sortie :</strong><br/>{{consignes_sortie}}
</div>
<div style="text-align:right;margin-top:20px;">
<div style="border:1px solid #ccc;width:140px;height:60px;display:inline-block;"></div>
</div>
</div>`,
    countriesJson: JSON.stringify(['CI','SN','CM','BJ','TG','BF','ML','GN','CD','CG','GA','NE','TD','MR']),
    active: true,
    popularity: 50,
  },
  {
    code: 'med_rapport_expertise',
    name: 'Rapport d\'expertise médicale',
    category: 'sante',
    description: 'Rapport d\'expertise médicale légale ou judiciaire',
    price: 600,
    currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'expert_nom', label: 'Nom de l\'expert', type: 'text', required: true },
      { name: 'expert_qualite', label: 'Qualité / Titre', type: 'text', required: true },
      { name: 'autorite_mandante', label: 'Autorité mandante', type: 'text', required: true },
      { name: 'reference_dossier', label: 'Référence du dossier', type: 'text', required: false },
      { name: 'nom_expertisee', label: 'Nom de la personne expertisée', type: 'text', required: true },
      { name: 'date_expertise', label: 'Date de l\'expertise', type: 'date', required: true },
      { name: 'objet_expertise', label: 'Objet de la mission', type: 'textarea', required: true },
      { name: 'constatations', label: 'Constatations médicales', type: 'textarea', required: true },
      { name: 'conclusion_expertise', label: 'Conclusions', type: 'textarea', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;border:2px solid #333;">
<div style="text-align:center;border-bottom:2px solid #333;padding-bottom:10px;margin-bottom:15px;">
<h2 style="margin:0;">RAPPORT D'EXPERTISE MÉDICALE</h2>
<p style="margin:4px 0;">Ref. : {{reference_dossier}} — {{autorite_mandante}}</p>
</div>
<p><strong>Expert :</strong> {{expert_nom}} — {{expert_qualite}}</p>
<p><strong>Personne expertisée :</strong> {{nom_expertisee}}</p>
<p><strong>Date :</strong> {{date_expertise}}</p>
<div style="background:#F5F5F5;padding:10px;border-left:3px solid #333;margin:10px 0;">
<strong>Mission :</strong><br/>{{objet_expertise}}
</div>
<div style="background:#FAFAFA;padding:10px;border-left:3px solid #555;margin:10px 0;">
<strong>Constatations :</strong><br/>{{constatations}}
</div>
<div style="background:#FFF9C4;padding:10px;border-left:3px solid #F57F17;margin:10px 0;">
<strong>Conclusions :</strong><br/>{{conclusion_expertise}}
</div>
<div style="text-align:right;margin-top:20px;">
<p>L'Expert médical</p>
<div style="border:1px solid #ccc;width:140px;height:60px;display:inline-block;"></div>
</div>
</div>`,
    countriesJson: JSON.stringify(['CI','SN','CM','BJ','TG','BF','ML','GN','CD','CG','GA','NE','TD','MR']),
    active: true,
    popularity: 40,
  },
  {
    code: 'med_fiche_patient',
    name: 'Dossier médical patient',
    category: 'sante',
    description: 'Fiche de dossier médical patient pour cabinet ou clinique',
    price: 300,
    currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_patient', label: 'Nom complet', type: 'text', required: true },
      { name: 'date_naissance', label: 'Date de naissance', type: 'date', required: true },
      { name: 'sexe', label: 'Sexe', type: 'select', required: true, options: ['Masculin','Féminin'] },
      { name: 'adresse', label: 'Adresse', type: 'text', required: false },
      { name: 'telephone', label: 'Téléphone', type: 'text', required: false },
      { name: 'contact_urgence', label: 'Contact d\'urgence', type: 'text', required: false },
      { name: 'groupe_sanguin', label: 'Groupe sanguin', type: 'select', required: false, options: ['A+','A-','B+','B-','AB+','AB-','O+','O-','Inconnu'] },
      { name: 'allergies', label: 'Allergies connues', type: 'textarea', required: false },
      { name: 'antecedents', label: 'Antécédents médicaux', type: 'textarea', required: false },
      { name: 'traitements_chroniques', label: 'Traitements chroniques', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;border:1px solid #ccc;">
<div style="background:#0277BD;color:white;padding:12px;margin-bottom:15px;">
<h2 style="margin:0;">DOSSIER MÉDICAL PATIENT</h2>
</div>
<table style="width:100%;border-collapse:collapse;margin-bottom:15px;">
<tr style="background:#E3F2FD;"><td style="padding:6px;font-weight:bold;width:35%;">Nom</td><td style="padding:6px;">{{nom_patient}}</td></tr>
<tr><td style="padding:6px;font-weight:bold;">Date de naissance</td><td style="padding:6px;">{{date_naissance}}</td></tr>
<tr style="background:#E3F2FD;"><td style="padding:6px;font-weight:bold;">Sexe</td><td style="padding:6px;">{{sexe}}</td></tr>
<tr><td style="padding:6px;font-weight:bold;">Téléphone</td><td style="padding:6px;">{{telephone}}</td></tr>
<tr style="background:#E3F2FD;"><td style="padding:6px;font-weight:bold;">Groupe sanguin</td><td style="padding:6px;">{{groupe_sanguin}}</td></tr>
<tr><td style="padding:6px;font-weight:bold;">Contact urgence</td><td style="padding:6px;">{{contact_urgence}}</td></tr>
</table>
<div style="background:#FFEBEE;border-left:3px solid #C62828;padding:10px;margin-bottom:10px;">
<strong>Allergies :</strong> {{allergies}}
</div>
<div style="padding:10px;border:1px solid #eee;margin-bottom:10px;">
<strong>Antécédents :</strong><br/>{{antecedents}}
</div>
<div style="padding:10px;border:1px solid #eee;">
<strong>Traitements chroniques :</strong><br/>{{traitements_chroniques}}
</div>
</div>`,
    countriesJson: JSON.stringify(['CI','SN','CM','BJ','TG','BF','ML','GN','CD','CG','GA','NE','TD','MR']),
    active: true,
    popularity: 55,
  },
  {
    code: 'med_consentement_chirurgie',
    name: 'Consentement éclairé chirurgie',
    category: 'sante',
    description: 'Formulaire de consentement éclairé pour intervention chirurgicale',
    price: 400,
    currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'etablissement', label: 'Établissement', type: 'text', required: true },
      { name: 'chirurgien', label: 'Chirurgien', type: 'text', required: true },
      { name: 'nom_patient', label: 'Nom du patient', type: 'text', required: true },
      { name: 'date_naissance', label: 'Date de naissance', type: 'date', required: false },
      { name: 'intervention', label: 'Intitulé de l\'intervention', type: 'text', required: true },
      { name: 'indication', label: 'Indication médicale', type: 'textarea', required: true },
      { name: 'risques', label: 'Risques et complications possibles', type: 'textarea', required: true },
      { name: 'date_intervention', label: 'Date prévue', type: 'date', required: false },
      { name: 'date_signature', label: 'Date de signature', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;border:1px solid #ccc;">
<div style="text-align:center;border-bottom:2px solid #E65100;padding-bottom:10px;margin-bottom:15px;">
<h2 style="color:#E65100;margin:0;">CONSENTEMENT ÉCLAIRÉ — CHIRURGIE</h2>
<p style="color:#555;">{{etablissement}} — Dr. {{chirurgien}}</p>
</div>
<p>Je soussigné(e) <strong>{{nom_patient}}</strong>, né(e) le {{date_naissance}}, déclare avoir été informé(e) par le Dr. <strong>{{chirurgien}}</strong> :</p>
<div style="background:#FFF3E0;border-left:4px solid #E65100;padding:12px;margin:10px 0;">
<strong>Intervention :</strong> {{intervention}}<br/>
<strong>Indication :</strong> {{indication}}
</div>
<div style="background:#FFEBEE;border-left:4px solid #C62828;padding:12px;margin:10px 0;">
<strong>Risques potentiels :</strong><br/>{{risques}}
</div>
<p>Ayant reçu une information claire et complète, je consens librement à cette intervention prévue le <strong>{{date_intervention}}</strong>.</p>
<div style="display:flex;justify-content:space-between;margin-top:25px;">
<div><p>Le patient(e)</p><div style="border:1px solid #ccc;width:150px;height:60px;"></div></div>
<div><p>Le médecin</p><div style="border:1px solid #ccc;width:150px;height:60px;"></div></div>
</div>
<p style="margin-top:10px;">Fait le : <strong>{{date_signature}}</strong></p>
</div>`,
    countriesJson: JSON.stringify(['CI','SN','CM','BJ','TG','BF','ML','GN','CD','CG','GA','NE','TD','MR']),
    active: true,
    popularity: 45,
  },
  {
    code: 'med_protocole_soin',
    name: 'Protocole de soins infirmiers',
    category: 'sante',
    description: 'Protocole de soins infirmiers pour suivi de patient hospitalisé ou ambulatoire',
    price: 300,
    currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'etablissement', label: 'Établissement', type: 'text', required: true },
      { name: 'service', label: 'Service', type: 'text', required: true },
      { name: 'nom_patient', label: 'Nom du patient', type: 'text', required: true },
      { name: 'numero_chambre', label: 'N° Chambre / Lit', type: 'text', required: false },
      { name: 'diagnostic', label: 'Diagnostic', type: 'text', required: true },
      { name: 'soins_prescrits', label: 'Soins prescrits', type: 'textarea', required: true },
      { name: 'medicaments', label: 'Médicaments et posologie', type: 'textarea', required: false },
      { name: 'surveillance', label: 'Paramètres à surveiller', type: 'textarea', required: false },
      { name: 'date_protocole', label: 'Date', type: 'date', required: true },
      { name: 'infirmier_responsable', label: 'Infirmier(ère) responsable', type: 'text', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;border:1px solid #ccc;">
<div style="background:#00695C;color:white;padding:12px;margin-bottom:15px;">
<h2 style="margin:0;">PROTOCOLE DE SOINS INFIRMIERS</h2>
<p style="margin:4px 0;">{{etablissement}} — Service : {{service}}</p>
</div>
<table style="width:100%;border-collapse:collapse;margin-bottom:15px;font-size:14px;">
<tr style="background:#E0F2F1;"><td style="padding:5px;font-weight:bold;width:35%;">Patient</td><td style="padding:5px;">{{nom_patient}}</td></tr>
<tr><td style="padding:5px;font-weight:bold;">Chambre / Lit</td><td style="padding:5px;">{{numero_chambre}}</td></tr>
<tr style="background:#E0F2F1;"><td style="padding:5px;font-weight:bold;">Diagnostic</td><td style="padding:5px;">{{diagnostic}}</td></tr>
<tr><td style="padding:5px;font-weight:bold;">Date</td><td style="padding:5px;">{{date_protocole}}</td></tr>
</table>
<div style="background:#E0F2F1;border-left:4px solid #00695C;padding:10px;margin-bottom:10px;">
<strong>Soins prescrits :</strong><br/>{{soins_prescrits}}
</div>
<div style="padding:10px;border:1px solid #eee;margin-bottom:10px;">
<strong>Médicaments :</strong><br/>{{medicaments}}
</div>
<div style="padding:10px;border:1px solid #eee;">
<strong>Surveillance :</strong><br/>{{surveillance}}
</div>
<p style="margin-top:15px;"><strong>Infirmier(ère) :</strong> {{infirmier_responsable}}</p>
</div>`,
    countriesJson: JSON.stringify(['CI','SN','CM','BJ','TG','BF','ML','GN','CD','CG','GA','NE','TD','MR']),
    active: true,
    popularity: 40,
  },
  {
    code: 'med_bon_transport',
    name: 'Bon de transport médical',
    category: 'sante',
    description: 'Prescription médicale de transport sanitaire pour patient',
    price: 200,
    currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_medecin', label: 'Médecin prescripteur', type: 'text', required: true },
      { name: 'numero_ordre', label: 'N° Ordre', type: 'text', required: false },
      { name: 'nom_patient', label: 'Nom du patient', type: 'text', required: true },
      { name: 'adresse_patient', label: 'Adresse du patient', type: 'text', required: false },
      { name: 'lieu_depart', label: 'Lieu de départ', type: 'text', required: true },
      { name: 'lieu_destination', label: 'Destination', type: 'text', required: true },
      { name: 'type_transport', label: 'Mode de transport', type: 'select', required: true, options: ['Ambulance','VSL','Taxi conventionné','Autre'] },
      { name: 'motif_transport', label: 'Motif médical', type: 'textarea', required: true },
      { name: 'date_transport', label: 'Date de transport', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;border:1px solid #ccc;">
<div style="border-bottom:2px solid #1565C0;padding-bottom:10px;margin-bottom:15px;">
<h2 style="color:#1565C0;margin:0;">BON DE TRANSPORT MÉDICAL</h2>
<p style="color:#555;margin:4px 0;">Dr. {{nom_medecin}} — N° Ordre : {{numero_ordre}}</p>
</div>
<table style="width:100%;border-collapse:collapse;margin-bottom:15px;">
<tr style="background:#E3F2FD;"><td style="padding:5px;font-weight:bold;width:35%;">Patient</td><td style="padding:5px;">{{nom_patient}}</td></tr>
<tr><td style="padding:5px;font-weight:bold;">Adresse</td><td style="padding:5px;">{{adresse_patient}}</td></tr>
<tr style="background:#E3F2FD;"><td style="padding:5px;font-weight:bold;">Date</td><td style="padding:5px;">{{date_transport}}</td></tr>
<tr><td style="padding:5px;font-weight:bold;">Mode</td><td style="padding:5px;">{{type_transport}}</td></tr>
<tr style="background:#E3F2FD;"><td style="padding:5px;font-weight:bold;">Départ</td><td style="padding:5px;">{{lieu_depart}}</td></tr>
<tr><td style="padding:5px;font-weight:bold;">Destination</td><td style="padding:5px;">{{lieu_destination}}</td></tr>
</table>
<div style="background:#E3F2FD;border-left:4px solid #1565C0;padding:10px;margin-bottom:15px;">
<strong>Motif médical :</strong><br/>{{motif_transport}}
</div>
<div style="text-align:right;margin-top:20px;">
<p>Signature et cachet</p>
<div style="border:1px solid #ccc;width:140px;height:60px;display:inline-block;"></div>
</div>
</div>`,
    countriesJson: JSON.stringify(['CI','SN','CM','BJ','TG','BF','ML','GN','CD','CG','GA','NE','TD','MR']),
    active: true,
    popularity: 35,
  },
  {
    code: 'med_certificat_deces',
    name: 'Certificat de décès médical',
    category: 'sante',
    description: 'Certificat médical de décès établi par le médecin constatant',
    price: 400,
    currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_medecin', label: 'Médecin constatant', type: 'text', required: true },
      { name: 'numero_ordre', label: 'N° Ordre', type: 'text', required: false },
      { name: 'nom_defunt', label: 'Nom du défunt', type: 'text', required: true },
      { name: 'date_naissance_defunt', label: 'Date de naissance', type: 'date', required: false },
      { name: 'sexe_defunt', label: 'Sexe', type: 'select', required: true, options: ['Masculin','Féminin'] },
      { name: 'date_deces', label: 'Date du décès', type: 'date', required: true },
      { name: 'heure_deces', label: 'Heure du décès', type: 'text', required: false },
      { name: 'lieu_deces', label: 'Lieu du décès', type: 'text', required: true },
      { name: 'cause_deces', label: 'Cause du décès', type: 'textarea', required: true },
      { name: 'obstacle_inhumation', label: 'Obstacle médico-légal', type: 'select', required: true, options: ['Non','Oui'] },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;border:2px solid #333;">
<div style="text-align:center;border-bottom:2px solid #333;padding-bottom:10px;margin-bottom:15px;">
<h2 style="margin:0;">CERTIFICAT DE DÉCÈS</h2>
<p style="color:#555;">Document officiel — Usage administratif</p>
</div>
<p>Je soussigné(e), <strong>Dr. {{nom_medecin}}</strong> (N° Ordre : {{numero_ordre}}), certifie avoir constaté le décès de :</p>
<table style="width:100%;border-collapse:collapse;margin:10px 0;">
<tr style="background:#F5F5F5;"><td style="padding:5px;font-weight:bold;width:35%;">Nom</td><td style="padding:5px;">{{nom_defunt}}</td></tr>
<tr><td style="padding:5px;font-weight:bold;">Né(e) le</td><td style="padding:5px;">{{date_naissance_defunt}}</td></tr>
<tr style="background:#F5F5F5;"><td style="padding:5px;font-weight:bold;">Sexe</td><td style="padding:5px;">{{sexe_defunt}}</td></tr>
<tr><td style="padding:5px;font-weight:bold;">Date du décès</td><td style="padding:5px;">{{date_deces}} à {{heure_deces}}</td></tr>
<tr style="background:#F5F5F5;"><td style="padding:5px;font-weight:bold;">Lieu</td><td style="padding:5px;">{{lieu_deces}}</td></tr>
</table>
<div style="background:#F5F5F5;padding:10px;border-left:3px solid #333;margin:10px 0;">
<strong>Cause du décès :</strong><br/>{{cause_deces}}
</div>
<p><strong>Obstacle médico-légal à l'inhumation :</strong> {{obstacle_inhumation}}</p>
<div style="text-align:right;margin-top:20px;">
<p>Signature et cachet</p>
<div style="border:1px solid #ccc;width:140px;height:60px;display:inline-block;"></div>
</div>
</div>`,
    countriesJson: JSON.stringify(['CI','SN','CM','BJ','TG','BF','ML','GN','CD','CG','GA','NE','TD','MR']),
    active: true,
    popularity: 30,
  },
  {
    code: 'med_attestation_handicap',
    name: 'Attestation médicale handicap',
    category: 'sante',
    description: 'Attestation médicale de handicap ou d\'invalidité pour droits sociaux',
    price: 400,
    currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_medecin', label: 'Médecin attestant', type: 'text', required: true },
      { name: 'specialite', label: 'Spécialité', type: 'text', required: false },
      { name: 'numero_ordre', label: 'N° Ordre', type: 'text', required: false },
      { name: 'nom_patient', label: 'Nom du patient', type: 'text', required: true },
      { name: 'date_naissance', label: 'Date de naissance', type: 'date', required: true },
      { name: 'nature_handicap', label: 'Nature du handicap', type: 'textarea', required: true },
      { name: 'taux_incapacite', label: 'Taux d\'incapacité estimé (%)', type: 'text', required: false },
      { name: 'caractere', label: 'Caractère', type: 'select', required: true, options: ['Permanent','Temporaire','Évolutif'] },
      { name: 'date_attestation', label: 'Date de l\'attestation', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;border:1px solid #ccc;">
<div style="text-align:center;border-bottom:2px solid #4527A0;padding-bottom:10px;margin-bottom:15px;">
<h2 style="color:#4527A0;margin:0;">ATTESTATION MÉDICALE DE HANDICAP</h2>
<p style="color:#555;">Dr. {{nom_medecin}} — {{specialite}} — N° Ordre : {{numero_ordre}}</p>
</div>
<p>Je soussigné(e), <strong>Dr. {{nom_medecin}}</strong>, atteste que :</p>
<table style="width:100%;border-collapse:collapse;margin:10px 0;">
<tr style="background:#EDE7F6;"><td style="padding:5px;font-weight:bold;width:35%;">Nom</td><td style="padding:5px;">{{nom_patient}}</td></tr>
<tr><td style="padding:5px;font-weight:bold;">Né(e) le</td><td style="padding:5px;">{{date_naissance}}</td></tr>
</table>
<div style="background:#EDE7F6;border-left:4px solid #4527A0;padding:12px;margin:15px 0;">
<strong>Nature du handicap :</strong><br/>{{nature_handicap}}<br/><br/>
<strong>Taux d'incapacité :</strong> {{taux_incapacite}}% — <strong>Caractère :</strong> {{caractere}}
</div>
<p>Cette attestation est établie pour valoir ce que de droit.</p>
<p>Fait le <strong>{{date_attestation}}</strong></p>
<div style="text-align:right;margin-top:20px;">
<p>Signature et cachet</p>
<div style="border:1px solid #ccc;width:140px;height:60px;display:inline-block;"></div>
</div>
</div>`,
    countriesJson: JSON.stringify(['CI','SN','CM','BJ','TG','BF','ML','GN','CD','CG','GA','NE','TD','MR']),
    active: true,
    popularity: 45,
  },
  {
    code: 'med_plan_soins',
    name: 'Plan de soins personnalisé',
    category: 'sante',
    description: 'Plan de soins individualisé pour suivi de pathologie chronique',
    price: 300,
    currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_patient', label: 'Nom du patient', type: 'text', required: true },
      { name: 'date_naissance', label: 'Date de naissance', type: 'date', required: false },
      { name: 'pathologie', label: 'Pathologie principale', type: 'text', required: true },
      { name: 'objectifs_soins', label: 'Objectifs thérapeutiques', type: 'textarea', required: true },
      { name: 'traitements', label: 'Traitements prescrits', type: 'textarea', required: true },
      { name: 'surveillance_clinique', label: 'Surveillance clinique', type: 'textarea', required: false },
      { name: 'consultations_planifiees', label: 'Consultations planifiées', type: 'textarea', required: false },
      { name: 'medecin_referent', label: 'Médecin référent', type: 'text', required: true },
      { name: 'date_plan', label: 'Date d\'établissement', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;border:1px solid #ccc;">
<div style="background:#1B5E20;color:white;padding:12px;margin-bottom:15px;">
<h2 style="margin:0;">PLAN DE SOINS PERSONNALISÉ</h2>
<p style="margin:4px 0;">Dr. {{medecin_referent}} — Établi le {{date_plan}}</p>
</div>
<table style="width:100%;border-collapse:collapse;margin-bottom:15px;font-size:14px;">
<tr style="background:#E8F5E9;"><td style="padding:5px;font-weight:bold;width:35%;">Patient</td><td style="padding:5px;">{{nom_patient}}</td></tr>
<tr><td style="padding:5px;font-weight:bold;">Né(e) le</td><td style="padding:5px;">{{date_naissance}}</td></tr>
<tr style="background:#E8F5E9;"><td style="padding:5px;font-weight:bold;">Pathologie</td><td style="padding:5px;">{{pathologie}}</td></tr>
</table>
<div style="background:#E8F5E9;border-left:4px solid #1B5E20;padding:10px;margin-bottom:10px;">
<strong>Objectifs :</strong><br/>{{objectifs_soins}}
</div>
<div style="padding:10px;border:1px solid #eee;margin-bottom:10px;">
<strong>Traitements :</strong><br/>{{traitements}}
</div>
<div style="padding:10px;border:1px solid #eee;margin-bottom:10px;">
<strong>Surveillance :</strong><br/>{{surveillance_clinique}}
</div>
<div style="padding:10px;border:1px solid #eee;">
<strong>Consultations planifiées :</strong><br/>{{consultations_planifiees}}
</div>
</div>`,
    countriesJson: JSON.stringify(['CI','SN','CM','BJ','TG','BF','ML','GN','CD','CG','GA','NE','TD','MR']),
    active: true,
    popularity: 40,
  },
  {
    code: 'med_prescription_kine',
    name: 'Prescription kinésithérapie',
    category: 'sante',
    description: 'Ordonnance de prescription de séances de kinésithérapie',
    price: 200,
    currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_medecin', label: 'Médecin prescripteur', type: 'text', required: true },
      { name: 'numero_ordre', label: 'N° Ordre', type: 'text', required: false },
      { name: 'nom_patient', label: 'Nom du patient', type: 'text', required: true },
      { name: 'age_patient', label: 'Âge', type: 'text', required: false },
      { name: 'diagnostic', label: 'Diagnostic', type: 'text', required: true },
      { name: 'type_kine', label: 'Type de kinésithérapie', type: 'select', required: true, options: ['Rééducation motrice','Respiratoire','Cardiovasculaire','Neurologique','Périnéale','Autre'] },
      { name: 'nombre_seances', label: 'Nombre de séances', type: 'text', required: true },
      { name: 'frequence', label: 'Fréquence', type: 'text', required: false },
      { name: 'objectifs', label: 'Objectifs', type: 'textarea', required: false },
      { name: 'date_prescription', label: 'Date', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;border:1px solid #ccc;">
<div style="border-bottom:2px solid #00796B;padding-bottom:10px;margin-bottom:15px;">
<h2 style="color:#00796B;margin:0;">PRESCRIPTION DE KINÉSITHÉRAPIE</h2>
<p style="color:#555;">Dr. {{nom_medecin}} — N° Ordre : {{numero_ordre}}</p>
</div>
<p><strong>Patient :</strong> {{nom_patient}} — Âge : {{age_patient}}</p>
<p><strong>Diagnostic :</strong> {{diagnostic}}</p>
<div style="background:#E0F2F1;border-left:4px solid #00796B;padding:12px;margin:15px 0;">
<strong>Type :</strong> {{type_kine}}<br/>
<strong>Nombre de séances :</strong> {{nombre_seances}}<br/>
<strong>Fréquence :</strong> {{frequence}}<br/><br/>
<strong>Objectifs :</strong><br/>{{objectifs}}
</div>
<p>Date de prescription : <strong>{{date_prescription}}</strong></p>
<div style="text-align:right;margin-top:15px;">
<p>Signature et cachet</p>
<div style="border:1px solid #ccc;width:140px;height:60px;display:inline-block;"></div>
</div>
</div>`,
    countriesJson: JSON.stringify(['CI','SN','CM','BJ','TG','BF','ML','GN','CD','CG','GA','NE','TD','MR']),
    active: true,
    popularity: 40,
  },
  {
    code: 'med_rapport_accident_travail',
    name: 'Rapport médical accident du travail',
    category: 'sante',
    description: 'Rapport médical initial suite à un accident du travail',
    price: 400,
    currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_medecin', label: 'Médecin', type: 'text', required: true },
      { name: 'numero_ordre', label: 'N° Ordre', type: 'text', required: false },
      { name: 'nom_patient', label: 'Nom du patient', type: 'text', required: true },
      { name: 'employeur', label: 'Employeur', type: 'text', required: false },
      { name: 'date_accident', label: 'Date de l\'accident', type: 'date', required: true },
      { name: 'circonstances', label: 'Circonstances de l\'accident', type: 'textarea', required: true },
      { name: 'lesions_constatees', label: 'Lésions constatées', type: 'textarea', required: true },
      { name: 'soins_prodigues', label: 'Soins prodigués', type: 'textarea', required: false },
      { name: 'arret_travail', label: 'Arrêt de travail', type: 'select', required: true, options: ['Oui','Non'] },
      { name: 'duree_arret', label: 'Durée de l\'arrêt', type: 'text', required: false },
      { name: 'date_rapport', label: 'Date du rapport', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;border:1px solid #ccc;">
<div style="text-align:center;background:#BF360C;color:white;padding:12px;margin-bottom:15px;">
<h2 style="margin:0;">RAPPORT MÉDICAL — ACCIDENT DU TRAVAIL</h2>
<p style="margin:4px 0;">Dr. {{nom_medecin}} — N° Ordre : {{numero_ordre}}</p>
</div>
<table style="width:100%;border-collapse:collapse;margin-bottom:15px;font-size:14px;">
<tr style="background:#FBE9E7;"><td style="padding:5px;font-weight:bold;width:35%;">Patient</td><td style="padding:5px;">{{nom_patient}}</td></tr>
<tr><td style="padding:5px;font-weight:bold;">Employeur</td><td style="padding:5px;">{{employeur}}</td></tr>
<tr style="background:#FBE9E7;"><td style="padding:5px;font-weight:bold;">Date accident</td><td style="padding:5px;">{{date_accident}}</td></tr>
</table>
<div style="padding:10px;border-left:3px solid #BF360C;background:#FBE9E7;margin-bottom:10px;">
<strong>Circonstances :</strong><br/>{{circonstances}}
</div>
<div style="padding:10px;border:1px solid #eee;margin-bottom:10px;">
<strong>Lésions constatées :</strong><br/>{{lesions_constatees}}
</div>
<div style="padding:10px;border:1px solid #eee;margin-bottom:10px;">
<strong>Soins prodigués :</strong><br/>{{soins_prodigues}}
</div>
<p><strong>Arrêt de travail :</strong> {{arret_travail}} — Durée : {{duree_arret}}</p>
<p>Rapport établi le <strong>{{date_rapport}}</strong></p>
<div style="text-align:right;margin-top:15px;">
<div style="border:1px solid #ccc;width:140px;height:60px;display:inline-block;"></div>
</div>
</div>`,
    countriesJson: JSON.stringify(['CI','SN','CM','BJ','TG','BF','ML','GN','CD','CG','GA','NE','TD','MR']),
    active: true,
    popularity: 45,
  },
  {
    code: 'med_convention_clinique',
    name: 'Convention d\'hospitalisation clinique privée',
    category: 'sante',
    description: 'Convention d\'hospitalisation entre patient et clinique privée',
    price: 500,
    currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_clinique', label: 'Nom de la clinique', type: 'text', required: true },
      { name: 'adresse_clinique', label: 'Adresse', type: 'text', required: false },
      { name: 'directeur_clinique', label: 'Directeur médical', type: 'text', required: false },
      { name: 'nom_patient', label: 'Nom du patient', type: 'text', required: true },
      { name: 'date_naissance', label: 'Date de naissance', type: 'date', required: false },
      { name: 'type_chambre', label: 'Type de chambre', type: 'select', required: true, options: ['Chambre individuelle','Chambre double','Salle commune','Suite'] },
      { name: 'date_admission', label: 'Date d\'admission prévue', type: 'date', required: true },
      { name: 'duree_prevue', label: 'Durée prévisionnelle', type: 'text', required: false },
      { name: 'tarif_journalier', label: 'Tarif journalier (XOF)', type: 'text', required: false },
      { name: 'modalites_paiement', label: 'Modalités de paiement', type: 'textarea', required: false },
      { name: 'date_convention', label: 'Date de signature', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;border:1px solid #ccc;">
<div style="text-align:center;border-bottom:2px solid #0D47A1;padding-bottom:10px;margin-bottom:15px;">
<h2 style="color:#0D47A1;margin:0;">CONVENTION D'HOSPITALISATION</h2>
<p style="color:#555;">{{nom_clinique}} — {{adresse_clinique}}</p>
</div>
<p><strong>Entre :</strong> La clinique <strong>{{nom_clinique}}</strong>, représentée par Dr. {{directeur_clinique}}</p>
<p><strong>Et :</strong> Le patient <strong>{{nom_patient}}</strong>, né(e) le {{date_naissance}}</p>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#E3F2FD;"><td style="padding:6px;font-weight:bold;width:40%;">Type de chambre</td><td style="padding:6px;">{{type_chambre}}</td></tr>
<tr><td style="padding:6px;font-weight:bold;">Date d'admission</td><td style="padding:6px;">{{date_admission}}</td></tr>
<tr style="background:#E3F2FD;"><td style="padding:6px;font-weight:bold;">Durée prévisionnelle</td><td style="padding:6px;">{{duree_prevue}}</td></tr>
<tr><td style="padding:6px;font-weight:bold;">Tarif journalier</td><td style="padding:6px;">{{tarif_journalier}} XOF</td></tr>
</table>
<div style="background:#E3F2FD;padding:10px;border-left:3px solid #0D47A1;margin-bottom:15px;">
<strong>Modalités de paiement :</strong><br/>{{modalites_paiement}}
</div>
<p>Fait à {{adresse_clinique}}, le <strong>{{date_convention}}</strong></p>
<div style="display:flex;justify-content:space-between;margin-top:20px;">
<div><p>La clinique</p><div style="border:1px solid #ccc;width:150px;height:55px;"></div></div>
<div><p>Le patient</p><div style="border:1px solid #ccc;width:150px;height:55px;"></div></div>
</div>
</div>`,
    countriesJson: JSON.stringify(['CI','SN','CM','BJ','TG','BF','ML','GN','CD','CG','GA','NE','TD','MR']),
    active: true,
    popularity: 35,
  },
  {
    code: 'med_contrat_medecin',
    name: 'Contrat d\'exercice libéral médecin',
    category: 'sante',
    description: 'Contrat d\'exercice libéral pour médecin en cabinet ou clinique',
    price: 700,
    currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_medecin', label: 'Nom du médecin', type: 'text', required: true },
      { name: 'specialite', label: 'Spécialité', type: 'text', required: true },
      { name: 'numero_ordre', label: 'N° Ordre', type: 'text', required: true },
      { name: 'nom_cabinet', label: 'Nom du cabinet / établissement', type: 'text', required: true },
      { name: 'adresse_cabinet', label: 'Adresse', type: 'text', required: false },
      { name: 'type_contrat', label: 'Type d\'exercice', type: 'select', required: true, options: ['Libéral exclusif','Libéral partiel','Collaboration','Remplacement'] },
      { name: 'date_debut', label: 'Date de début', type: 'date', required: true },
      { name: 'duree_contrat', label: 'Durée', type: 'text', required: false },
      { name: 'remuneration', label: 'Rémunération / Partage honoraires', type: 'textarea', required: false },
      { name: 'obligations', label: 'Obligations des parties', type: 'textarea', required: false },
      { name: 'date_signature', label: 'Date de signature', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;border:1px solid #ccc;">
<div style="text-align:center;border-bottom:2px solid #1A237E;padding-bottom:10px;margin-bottom:15px;">
<h2 style="color:#1A237E;margin:0;">CONTRAT D'EXERCICE LIBÉRAL</h2>
<p style="color:#555;">{{type_contrat}}</p>
</div>
<p><strong>Entre :</strong> Dr. <strong>{{nom_medecin}}</strong>, {{specialite}}, N° Ordre {{numero_ordre}}</p>
<p><strong>Et :</strong> <strong>{{nom_cabinet}}</strong>, {{adresse_cabinet}}</p>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#E8EAF6;"><td style="padding:5px;font-weight:bold;width:40%;">Date de début</td><td style="padding:5px;">{{date_debut}}</td></tr>
<tr><td style="padding:5px;font-weight:bold;">Durée</td><td style="padding:5px;">{{duree_contrat}}</td></tr>
</table>
<div style="padding:10px;border-left:3px solid #1A237E;background:#E8EAF6;margin-bottom:10px;">
<strong>Rémunération :</strong><br/>{{remuneration}}
</div>
<div style="padding:10px;border:1px solid #eee;margin-bottom:15px;">
<strong>Obligations des parties :</strong><br/>{{obligations}}
</div>
<p>Fait en deux exemplaires le <strong>{{date_signature}}</strong></p>
<div style="display:flex;justify-content:space-between;margin-top:20px;">
<div><p>Le médecin</p><div style="border:1px solid #ccc;width:150px;height:55px;"></div></div>
<div><p>Le cabinet</p><div style="border:1px solid #ccc;width:150px;height:55px;"></div></div>
</div>
</div>`,
    countriesJson: JSON.stringify(['CI','SN','CM','BJ','TG','BF','ML','GN','CD','CG','GA','NE','TD','MR']),
    active: true,
    popularity: 35,
  },
  {
    code: 'med_lettre_prise_en_charge',
    name: 'Demande de prise en charge assurance maladie',
    category: 'sante',
    description: 'Lettre de demande de prise en charge médicale auprès de l\'assurance maladie',
    price: 300,
    currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_patient', label: 'Nom du patient', type: 'text', required: true },
      { name: 'numero_assure', label: 'N° assuré / affilié', type: 'text', required: true },
      { name: 'nom_assurance', label: 'Organisme assureur', type: 'text', required: true },
      { name: 'nom_medecin', label: 'Médecin prescripteur', type: 'text', required: true },
      { name: 'acte_medical', label: 'Acte ou traitement concerné', type: 'textarea', required: true },
      { name: 'montant_estime', label: 'Coût estimé (XOF)', type: 'text', required: false },
      { name: 'justification', label: 'Justification médicale', type: 'textarea', required: true },
      { name: 'date_demande', label: 'Date de la demande', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;border:1px solid #ccc;">
<p style="text-align:right;">{{date_demande}}</p>
<p><strong>À :</strong> {{nom_assurance}}</p>
<p><strong>Objet :</strong> Demande de prise en charge médicale</p>
<p><strong>Assuré :</strong> {{nom_patient}} — N° {{numero_assure}}</p>
<p>Monsieur / Madame,</p>
<p>Sur prescription du Dr. <strong>{{nom_medecin}}</strong>, je vous sollicite une prise en charge pour :</p>
<div style="background:#E3F2FD;border-left:4px solid #1565C0;padding:12px;margin:15px 0;">
<strong>Acte / Traitement :</strong><br/>{{acte_medical}}<br/><br/>
<strong>Coût estimé :</strong> {{montant_estime}} XOF
</div>
<div style="background:#FAFAFA;padding:10px;border:1px dashed #ccc;margin-bottom:15px;">
<strong>Justification médicale :</strong><br/>{{justification}}
</div>
<p>Dans l'attente de votre accord favorable, veuillez agréer mes salutations distinguées.</p>
<div style="text-align:right;margin-top:20px;">
<p>Signature du patient</p>
<div style="border:1px solid #ccc;width:140px;height:55px;display:inline-block;"></div>
</div>
</div>`,
    countriesJson: JSON.stringify(['CI','SN','CM','BJ','TG','BF','ML','GN','CD','CG','GA','NE','TD','MR']),
    active: true,
    popularity: 50,
  },
  {
    code: 'med_reclamation_mutuelle',
    name: 'Lettre de réclamation mutuelle',
    category: 'sante',
    description: 'Lettre de réclamation adressée à une mutuelle ou assurance complémentaire santé',
    price: 300,
    currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_assure', label: 'Nom de l\'assuré', type: 'text', required: true },
      { name: 'numero_contrat', label: 'N° de contrat', type: 'text', required: true },
      { name: 'nom_mutuelle', label: 'Nom de la mutuelle', type: 'text', required: true },
      { name: 'objet_reclamation', label: 'Objet de la réclamation', type: 'text', required: true },
      { name: 'description_litige', label: 'Description du litige', type: 'textarea', required: true },
      { name: 'montant_reclame', label: 'Montant réclamé (XOF)', type: 'text', required: false },
      { name: 'documents_joints', label: 'Documents joints', type: 'textarea', required: false },
      { name: 'date_lettre', label: 'Date', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;border:1px solid #ccc;">
<div style="border-bottom:2px solid #B71C1C;padding-bottom:10px;margin-bottom:15px;">
<p style="margin:0;font-weight:bold;">{{nom_assure}}</p>
<p style="margin:4px 0;color:#555;">N° Contrat : {{numero_contrat}}</p>
</div>
<p style="text-align:right;">{{date_lettre}}</p>
<p><strong>À :</strong> {{nom_mutuelle}}</p>
<p><strong>Objet :</strong> Réclamation — {{objet_reclamation}}</p>
<p>Madame, Monsieur,</p>
<p>Je me permets de vous adresser la présente réclamation concernant :</p>
<div style="background:#FFEBEE;border-left:4px solid #B71C1C;padding:12px;margin:15px 0;">
<strong>Description du litige :</strong><br/>{{description_litige}}<br/><br/>
<strong>Montant réclamé :</strong> {{montant_reclame}} XOF
</div>
<div style="background:#FAFAFA;padding:10px;border:1px dashed #ccc;margin-bottom:15px;">
<strong>Documents joints :</strong><br/>{{documents_joints}}
</div>
<p>Je vous remercie de bien vouloir traiter cette réclamation dans les meilleurs délais.</p>
<p>Veuillez agréer, Madame, Monsieur, mes salutations distinguées.</p>
<div style="text-align:right;margin-top:20px;">
<p>Signature</p>
<div style="border:1px solid #ccc;width:140px;height:55px;display:inline-block;"></div>
</div>
</div>`,
    countriesJson: JSON.stringify(['CI','SN','CM','BJ','TG','BF','ML','GN','CD','CG','GA','NE','TD','MR']),
    active: true,
    popularity: 45,
  },
];

async function main() {
  let created = 0, updated = 0;
  for (const t of templates) {
    const existing = await prisma.documentTemplate.findUnique({ where: { code: t.code } });
    if (existing) {
      await prisma.documentTemplate.update({ where: { code: t.code }, data: t });
      updated++;
    } else {
      await prisma.documentTemplate.create({ data: t });
      created++;
    }
  }
  const total = await prisma.documentTemplate.count();
  console.log(`✅ Seed Santé & Médical terminé. ${templates.length} templates (créés: ${created}, màj: ${updated}) — Total BDD: ${total}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
