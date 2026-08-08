// /tutoriels — parcours pas à pas par cas d'usage réel.
import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/public/SiteFooter';

export const metadata: Metadata = {
  title: 'Tutoriels — IBIG DocPro',
  description:
    'Parcours pas à pas pour générer vos documents : CV, contrat de travail, bail, statuts de SARL, business plan, facture. Chaque tutoriel mène directement au modèle.',
};

interface Tutoriel {
  emoji: string;
  titre: string;
  pour: string;
  duree: string;
  code: string;
  etapes: string[];
  conseil: string;
}

const TUTORIELS: Tutoriel[] = [
  {
    emoji: '📄',
    titre: 'Rédiger un CV qui passe le premier tri',
    pour: 'Candidats, jeunes diplômés, cadres en reconversion',
    duree: '5 minutes',
    code: 'cv_pro',
    etapes: [
      'Ouvrez le modèle « CV Professionnel » et sélectionnez votre pays : la mise en forme suit les usages locaux du recrutement.',
      'Renseignez votre titre professionnel visé — c’est la première ligne que lit un recruteur, soyez précis (« Comptable senior » plutôt que « Comptabilité »).',
      'Dans vos expériences, indiquez pour chaque poste 3 à 5 réalisations chiffrées : montants en FCFA, pourcentages, effectifs encadrés, volumes traités.',
      'Complétez formations, langues et compétences, puis lancez la génération.',
      'Relisez l’aperçu, ajustez si besoin, puis téléchargez en PDF (ou en Word avec les niveaux Pro et Expert pour continuer à le modifier).',
    ],
    conseil: 'Un CV sans chiffres se lit comme une liste de tâches. Avec des chiffres, il se lit comme un bilan de résultats.',
  },
  {
    emoji: '👥',
    titre: 'Établir un certificat de travail conforme',
    pour: 'Employeurs, DRH, gérants de PME',
    duree: '3 minutes',
    code: 'dsi_certificat_travail',
    etapes: [
      'Sélectionnez le pays d’exécution du contrat : les mentions obligatoires diffèrent d’un code du travail à l’autre.',
      'Saisissez l’identité complète de l’employeur (raison sociale, RCCM, siège) et celle du salarié.',
      'Indiquez les dates d’entrée et de sortie ainsi que le ou les emplois occupés — ce sont les mentions légalement exigées.',
      'Générez, vérifiez la concordance des dates, puis téléchargez et signez.',
    ],
    conseil: 'Le certificat de travail est un document dû au salarié à la fin du contrat, quel qu’en soit le motif de rupture.',
  },
  {
    emoji: '🏠',
    titre: 'Préparer un bail d’habitation solide',
    pour: 'Propriétaires bailleurs, agences immobilières',
    duree: '8 minutes',
    code: 'gloc_bail_residentiel_3ans',
    etapes: [
      'Choisissez le pays : plafonds de caution, durée minimale et préavis sont fixés par la loi locale.',
      'Décrivez précisément le bien : adresse, superficie, nombre de pièces, équipements et annexes.',
      'Fixez le loyer, la périodicité, la date d’échéance et le dépôt de garantie.',
      'Précisez la répartition des charges et des réparations entre bailleur et preneur — c’est la source principale de litiges.',
      'Générez le bail, puis préparez l’état des lieux d’entrée qui lui sera annexé.',
    ],
    conseil: 'Signez toujours un état des lieux contradictoire à l’entrée : sans lui, le logement est présumé remis en bon état.',
  },
  {
    emoji: '🏢',
    titre: 'Créer les statuts de votre SARL (OHADA)',
    pour: 'Entrepreneurs, associés fondateurs',
    duree: '15 minutes',
    code: 'ohada_sarl_statuts',
    etapes: [
      'Réunissez au préalable : dénomination retenue, adresse du siège, identité des associés, montant du capital et répartition des parts.',
      'Rédigez un objet social suffisamment large pour couvrir vos activités futures, sans être vague au point d’être refusé.',
      'Vérifiez que la somme des apports correspond exactement au capital déclaré — c’est le premier point de contrôle du greffe.',
      'Désignez la gérance et précisez l’étendue de ses pouvoirs.',
      'Générez les statuts, puis déposez votre dossier au guichet unique (CEPICI, APIX ou équivalent selon votre pays).',
    ],
    conseil: 'Le niveau Expert cite les articles de l’Acte uniforme OHADA applicables à chaque clause — utile face à un greffe exigeant.',
  },
  {
    emoji: '🚀',
    titre: 'Monter un business plan bancable',
    pour: 'Porteurs de projet cherchant un financement',
    duree: '25 minutes',
    code: 'start_business_plan',
    etapes: [
      'Préparez vos chiffres avant de commencer : prix de vente, coûts unitaires, investissement de départ, montant recherché.',
      'Décrivez votre marché avec des données locales concrètes plutôt que des généralités sur le potentiel africain.',
      'Détaillez votre modèle de revenus et votre stratégie commerciale — comment les premiers clients arrivent, précisément.',
      'Générez le document en niveau Pro ou Expert : il intègre alors des repères de marché de votre secteur et un prévisionnel sur trois exercices.',
      'Relisez la cohérence entre le besoin de financement annoncé et le plan d’investissement détaillé.',
    ],
    conseil: 'Les banques de la région demandent presque toujours un apport personnel de 10 à 30 % : anticipez cette question dans le plan de financement.',
  },
  {
    emoji: '🧾',
    titre: 'Émettre une facture commerciale conforme',
    pour: 'Commerçants, prestataires, entreprises',
    duree: '4 minutes',
    code: 'com_facture_001',
    etapes: [
      'Renseignez vos mentions légales d’émetteur : raison sociale, RCCM, identifiant fiscal, coordonnées bancaires ou Mobile Money.',
      'Détaillez chaque ligne : désignation, quantité, prix unitaire — les totaux se calculent à partir de ces éléments.',
      'Appliquez le taux de TVA de votre pays (18 % en zone UEMOA, 19,25 % au Cameroun) et vérifiez le total TTC.',
      'Précisez les conditions de paiement : délai, pénalités de retard, éventuel escompte.',
      'Générez, puis conservez un exemplaire pour votre comptabilité.',
    ],
    conseil: 'Une facture sans numéro fiscal ni RCCM peut être refusée par le client comme par l’administration fiscale.',
  },
];

export default function TutorielsPage() {
  return (
    <>
      <SiteHeader />

      <section style={{ background: 'linear-gradient(135deg,#0D2B4E,#1565C0)', color: '#fff', padding: '52px 0 44px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ color: '#fff', fontSize: 'clamp(1.6rem,4vw,2.2rem)', marginBottom: 12 }}>Tutoriels</h1>
          <p style={{ opacity: .85, maxWidth: 620, margin: '0 auto', lineHeight: 1.7 }}>
            Des parcours pas à pas pour les documents les plus demandés. Chaque tutoriel vous mène
            directement au modèle correspondant.
          </p>
        </div>
      </section>

      <main className="container" style={{ padding: '44px 20px 60px', maxWidth: 900 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {TUTORIELS.map((t) => (
            <article
              key={t.code}
              style={{
                background: '#fff', border: '1px solid #e0e6ed', borderRadius: 12,
                padding: '24px 26px', boxShadow: 'var(--shadow)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, flexWrap: 'wrap' }}>
                <span style={{ fontSize: '1.9rem', lineHeight: 1 }} aria-hidden="true">{t.emoji}</span>
                <div style={{ flex: 1, minWidth: 240 }}>
                  <h2 style={{ fontSize: '1.15rem', margin: '0 0 6px' }}>{t.titre}</h2>
                  <p style={{ margin: 0, fontSize: '.83rem', color: '#78909C' }}>
                    Pour : {t.pour} · Environ {t.duree}
                  </p>
                </div>
              </div>

              <ol style={{ margin: '18px 0 0', paddingLeft: 22, lineHeight: 1.75, fontSize: '.92rem', color: '#37474F' }}>
                {t.etapes.map((e, i) => (
                  <li key={i} style={{ marginBottom: 9 }}>{e}</li>
                ))}
              </ol>

              <p style={{
                margin: '16px 0 0', padding: '11px 15px', borderRadius: 8,
                background: '#FFF8E1', borderLeft: '3px solid var(--gold)',
                fontSize: '.87rem', color: '#6D4C41', lineHeight: 1.65,
              }}>
                <strong>À retenir :</strong> {t.conseil}
              </p>

              <div style={{ marginTop: 18 }}>
                <Link href={`/documents/${t.code}`} className="btn btn-primary btn-sm">
                  Ouvrir ce modèle →
                </Link>
              </div>
            </article>
          ))}
        </div>

        <section style={{
          marginTop: 40, padding: '26px 24px', borderRadius: 12,
          background: '#f5f7fa', border: '1px solid #e0e6ed', textAlign: 'center',
        }}>
          <h2 style={{ fontSize: '1.1rem', marginBottom: 8 }}>Vous cherchez autre chose ?</h2>
          <p className="text-muted" style={{ marginBottom: 18, fontSize: '.92rem' }}>
            Plus de 12 000 modèles couvrent 19 domaines d’activité. Le catalogue se filtre par
            catégorie puis par sous-catégorie.
          </p>
          <div className="flex" style={{ justifyContent: 'center', flexWrap: 'wrap', gap: 10 }}>
            <Link href="/catalogue" className="btn btn-primary">Parcourir le catalogue</Link>
            <Link href="/guide" className="btn btn-outline">Guide de démarrage</Link>
            <Link href="/faq" className="btn btn-outline">Questions fréquentes</Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
