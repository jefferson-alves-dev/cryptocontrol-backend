import { database } from '../database/database.js';

const portfolioBalance = async (userId: number) => {
  return await database.wallets.findMany({
    where: {
      userId,
      isActive: 1,
      Contributions: {
        some: {
          userId,
          isActive: 1,
        },
      },
    },
    select: {
      name: true,
      id: true,

      Contributions: {
        where: {
          userId,
          isActive: 1,
        },
      },
    },
  });
};

export default {
  portfolioBalance,
};
