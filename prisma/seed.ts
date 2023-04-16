import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

import cryptocoins from './coins.js';

async function insertCryptoCoins() {
  await prisma.cryptoCoins.createMany({
    data: cryptocoins,
  });
}

insertCryptoCoins()
  .then(async () => {
    console.log('Cryptocoins seed has been finished.');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
