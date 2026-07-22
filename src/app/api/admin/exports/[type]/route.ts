// GET /api/admin/exports/[type]?from=&to= — export CSV (CDC §17.2), admin+, audité.
// Types : commandes | transactions | licences | factures.
// CSV UTF-8 avec BOM (compatible Excel), séparateur « ; », colonnes en français.
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireRole } from '@/lib/auth';
import { audit } from '@/lib/audit';
import { apiError } from '@/app/api/admin/_utils';

export const dynamic = 'force-dynamic';

type Cell = string | number | null | undefined;

function toCsv(headers: string[], rows: Cell[][]): string {
  const esc = (v: Cell) => {
    const s = v == null ? '' : String(v);
    return /[";\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  // BOM UTF-8 pour ouverture correcte des accents dans Excel.
  return '﻿' + [headers, ...rows].map((r) => r.map(esc).join(';')).join('\r\n');
}

function fmtDate(d: Date | null | undefined): string {
  if (!d) return '';
  const dt = new Date(d);
  const p = (n: number) => String(n).padStart(2, '0');
  return `${p(dt.getDate())}/${p(dt.getMonth() + 1)}/${dt.getFullYear()} ${p(dt.getHours())}:${p(dt.getMinutes())}`;
}

/** Filtre de période sur un champ date : from = début de journée, to = fin de journée (inclus). */
function dateRange(from: string | null, to: string | null): { gte?: Date; lte?: Date } | undefined {
  const range: { gte?: Date; lte?: Date } = {};
  if (from) {
    const d = new Date(from);
    if (!isNaN(d.getTime())) { d.setHours(0, 0, 0, 0); range.gte = d; }
  }
  if (to) {
    const d = new Date(to);
    if (!isNaN(d.getTime())) { d.setHours(23, 59, 59, 999); range.lte = d; }
  }
  return range.gte || range.lte ? range : undefined;
}

async function buildExport(type: string, from: string | null, to: string | null) {
  switch (type) {
    case 'commandes': {
      const orders = await prisma.order.findMany({
        where: { createdAt: dateRange(from, to) },
        include: { user: true, plan: true },
        orderBy: { createdAt: 'desc' },
      });
      return {
        headers: ['Numéro', 'Date', 'Client', 'Email', 'Forfait', 'Statut', 'Montant', 'Remise', 'Taxes', 'Total', 'Devise', 'Moyen de paiement', 'Pays de facturation'],
        rows: orders.map((o): Cell[] => [
          o.number, fmtDate(o.createdAt), o.user.name, o.user.email,
          o.plan ? `${o.plan.name} (${o.plan.code})` : 'Document à l’unité',
          o.status, o.amount, o.discount, o.tax, o.total, o.currency,
          o.paymentMethod ?? '', o.billingCountry ?? '',
        ]),
      };
    }
    case 'transactions': {
      const txs = await prisma.transaction.findMany({
        where: { createdAt: dateRange(from, to) },
        include: { user: true, order: true },
        orderBy: { createdAt: 'desc' },
      });
      return {
        headers: ['Référence interne', 'Référence externe', 'Date', 'Client', 'Email', 'Commande', 'Fournisseur', 'Méthode', 'Statut', 'Montant attendu', 'Montant déclaré', 'Montant reçu', 'Devise', 'Frais', 'Payée le', 'Confirmée le'],
        rows: txs.map((t): Cell[] => [
          t.internalRef, t.externalRef ?? '', fmtDate(t.createdAt), t.user.name, t.user.email,
          t.order.number, t.provider, t.method, t.status,
          t.amountExpected, t.amountDeclared ?? '', t.amountReceived ?? '', t.currency, t.fees,
          fmtDate(t.paidAt), fmtDate(t.confirmedAt),
        ]),
      };
    }
    case 'licences': {
      const licenses = await prisma.license.findMany({
        where: { createdAt: dateRange(from, to) },
        include: { user: true, plan: true },
        orderBy: { createdAt: 'desc' },
      });
      return {
        headers: ['Identifiant', 'Client', 'Email', 'Forfait', 'Statut', 'Début', 'Fin', 'Grâce jusqu’au', 'Provisoire jusqu’au', 'Créée le'],
        rows: licenses.map((l): Cell[] => [
          l.id, l.user.name, l.user.email, `${l.plan.name} (${l.plan.code})`, l.status,
          fmtDate(l.startDate), l.endDate ? fmtDate(l.endDate) : 'Perpétuelle',
          fmtDate(l.graceUntil), fmtDate(l.provisionalUntil), fmtDate(l.createdAt),
        ]),
      };
    }
    case 'factures': {
      const invoices = await prisma.invoice.findMany({
        where: { createdAt: dateRange(from, to) },
        include: { user: true, order: true },
        orderBy: { createdAt: 'desc' },
      });
      return {
        headers: ['Numéro', 'Type', 'Date', 'Client', 'Email', 'Commande', 'Montant', 'Remise', 'Taxes', 'Total', 'Devise', 'Statut', 'Période début', 'Période fin'],
        rows: invoices.map((i): Cell[] => [
          i.number, i.type, fmtDate(i.createdAt), i.user.name, i.user.email, i.order.number,
          i.amount, i.discount, i.tax, i.total, i.currency, i.status,
          fmtDate(i.periodStart), fmtDate(i.periodEnd),
        ]),
      };
    }
    default:
      return null;
  }
}

export async function GET(req: Request, { params }: { params: Promise<{ type: string }> }) {
  try {
    const admin = await requireRole('admin');
    const { type } = await params;
    const url = new URL(req.url);
    const from = url.searchParams.get('from');
    const to = url.searchParams.get('to');

    const result = await buildExport(type, from, to);
    if (!result) {
      return NextResponse.json(
        { error: 'Type d’export inconnu (commandes | transactions | licences | factures)' },
        { status: 404 },
      );
    }

    await audit({
      actorId: admin.id,
      action: 'export.csv',
      entityType: 'Export',
      entityId: type,
      after: { from: from ?? null, to: to ?? null, lignes: result.rows.length },
      reason: `Export CSV ${type}`,
    });

    const stamp = new Date().toISOString().slice(0, 10);
    return new NextResponse(toCsv(result.headers, result.rows), {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="export-${type}-${stamp}.csv"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (e) {
    return apiError(e);
  }
}
