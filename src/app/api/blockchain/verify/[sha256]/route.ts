// GET /api/blockchain/verify/[sha256] — Vérification PUBLIQUE d'un certificat
// blockchain par empreinte SHA-256 (CDC §21 couche 3). Aucune donnée personnelle
// n'est exposée : uniquement le statut de certification, le réseau, le txHash
// éventuel et la date d'émission.
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(_req: NextRequest, ctx: { params: Promise<{ sha256: string }> }) {
  const { sha256 } = await ctx.params;
  const hash = sha256.trim().toLowerCase().replace(/^0x/, '');

  if (!/^[0-9a-f]{64}$/.test(hash)) {
    return NextResponse.json(
      { certified: false, error: 'Empreinte SHA-256 invalide (64 caractères hexadécimaux attendus).' },
      { status: 400 },
    );
  }

  const cert = await prisma.blockchainCert.findFirst({
    where: { sha256: hash, status: { in: ['simule', 'ancre'] } },
  });

  if (!cert) {
    return NextResponse.json({ certified: false });
  }

  return NextResponse.json({
    certified: true,
    network: cert.network,
    txHash: cert.txHash,
    createdAt: cert.createdAt,
  });
}
