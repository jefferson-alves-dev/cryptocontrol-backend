import { database } from '../src/database/database.js';

import { cryptocoins, fiatcoins } from './coins.js';

async function insertCryptoCoins() {
  await database.cryptoCoins.createMany({
    data: cryptocoins,
  });
}

async function insertFiatCoins() {
  await database.fiatCoins.createMany({
    data: fiatcoins,
  });
}

insertCryptoCoins()
  .then(async () => {
    console.log('Crypto coins seed has been finished.');
    await database.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await database.$disconnect();
    process.exit(1);
  });

insertFiatCoins()
  .then(async () => {
    console.log('Fiat coins seed has been finished.');
    await database.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await database.$disconnect();
    process.exit(1);
  });
