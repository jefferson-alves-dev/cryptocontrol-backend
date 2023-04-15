import { database } from '../database/database.js';

const getAll = async () => {
  return await database.cryptoCoins.findMany();
};

export default { getAll };
