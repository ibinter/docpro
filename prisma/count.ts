import { PrismaClient } from '@prisma/client';
const p = new PrismaClient();
p.documentTemplate.count().then(n => { console.log('TOTAL: ' + n); p.$disconnect(); });
