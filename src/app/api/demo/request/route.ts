import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { sendMail } from '@/lib/mailer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as Record<string, unknown>;
    const nom = String(body.nom ?? '').trim();
    const email = String(body.email ?? '').trim().toLowerCase();

    if (!nom || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Nom et email valides requis.' }, { status: 400 });
    }

    const demo = await prisma.demoRequest.create({
      data: {
        nom,
        email,
        telephone: String(body.telephone ?? '').trim() || null,
        entreprise: String(body.entreprise ?? '').trim() || null,
        secteur: String(body.secteur ?? '').trim() || null,
        pays: String(body.pays ?? 'CI').trim(),
        besoins: String(body.besoins ?? '').trim() || null,
        niveauInteret: String(body.niveauInteret ?? 'standard').trim(),
        source: 'site',
        status: 'nouveau',
      },
    });

    // Email de confirmation au prospect
    await sendMail({
      to: email,
      subject: 'Votre demande de démonstration IBIG DocPro — Confirmation',
      html: `
        <h2 style="color:#0D2B4E">Bonjour ${nom},</h2>
        <p>Nous avons bien reçu votre demande de démonstration d'IBIG DocPro.</p>
        <p>Notre équipe vous contactera dans les <strong>24 heures</strong> pour planifier votre session personnalisée.</p>
        <hr style="border:none;border-top:1px solid #eee;margin:20px 0"/>
        <p><strong>Récapitulatif de votre demande :</strong></p>
        <table style="font-size:.9rem;border-collapse:collapse;width:100%">
          <tr><td style="padding:4px 8px;color:#666">Nom</td><td style="padding:4px 8px">${nom}</td></tr>
          <tr><td style="padding:4px 8px;color:#666">Email</td><td style="padding:4px 8px">${email}</td></tr>
          ${demo.entreprise ? `<tr><td style="padding:4px 8px;color:#666">Entreprise</td><td style="padding:4px 8px">${demo.entreprise}</td></tr>` : ''}
          ${demo.pays ? `<tr><td style="padding:4px 8px;color:#666">Pays</td><td style="padding:4px 8px">${demo.pays}</td></tr>` : ''}
          ${demo.secteur ? `<tr><td style="padding:4px 8px;color:#666">Secteur</td><td style="padding:4px 8px">${demo.secteur}</td></tr>` : ''}
        </table>
        <hr style="border:none;border-top:1px solid #eee;margin:20px 0"/>
        <p>En attendant, vous pouvez <a href="https://docpro.ibigsoft.com/catalogue" style="color:#1565C0">explorer notre catalogue de documents</a>.</p>
        <p style="color:#888;font-size:.85rem">— L'équipe IBIG DocPro | docpro@ibigsoft.com | +225 05 55 05 99 01</p>
      `,
    }).catch(() => {});

    // Email de notification à l'admin
    await sendMail({
      to: process.env.ADMIN_EMAIL ?? 'admin@ibigsoft.com',
      subject: `[CRM] Nouvelle demande de démo — ${nom}`,
      html: `
        <h2 style="color:#0D2B4E">Nouvelle demande de démonstration</h2>
        <table style="font-size:.9rem;border-collapse:collapse;width:100%">
          <tr><td style="padding:4px 8px;color:#666;width:140px">Nom</td><td style="padding:4px 8px"><strong>${nom}</strong></td></tr>
          <tr><td style="padding:4px 8px;color:#666">Email</td><td style="padding:4px 8px"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:4px 8px;color:#666">Téléphone</td><td style="padding:4px 8px">${demo.telephone ?? '—'}</td></tr>
          <tr><td style="padding:4px 8px;color:#666">Entreprise</td><td style="padding:4px 8px">${demo.entreprise ?? '—'}</td></tr>
          <tr><td style="padding:4px 8px;color:#666">Secteur</td><td style="padding:4px 8px">${demo.secteur ?? '—'}</td></tr>
          <tr><td style="padding:4px 8px;color:#666">Pays</td><td style="padding:4px 8px">${demo.pays}</td></tr>
          <tr><td style="padding:4px 8px;color:#666">Niveau intérêt</td><td style="padding:4px 8px">${demo.niveauInteret}</td></tr>
          <tr><td style="padding:4px 8px;color:#666">Besoins</td><td style="padding:4px 8px">${demo.besoins ?? '—'}</td></tr>
          <tr><td style="padding:4px 8px;color:#666">Source</td><td style="padding:4px 8px">${demo.source}</td></tr>
        </table>
        <p style="margin-top:20px">
          <a href="https://docpro.ibigsoft.com/admin/crm" style="background:#0D2B4E;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold">
            Voir dans le CRM →
          </a>
        </p>
      `,
    }).catch(() => {});

    return NextResponse.json({ ok: true, id: demo.id });
  } catch (err) {
    console.error('[demo/request]', err);
    return NextResponse.json({ error: 'Erreur interne.' }, { status: 500 });
  }
}
