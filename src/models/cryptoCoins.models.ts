import { database } from '../database/database.js';

const getAllCryptoCoins = async () => {
  return await database.cryptoCoins.findMany();
};

const getAllFiatCoins = async () => {
  return await database.fiatCoins.findMany();
};

export default { getAllCryptoCoins, getAllFiatCoins };
