import { database } from '../database/database.js';

const getById = async (userId: number, walletId: number) => {
  return await database.wallets.findFirst({
    where: {
      id: walletId,
      AND: {
        userId,
        isActive: 1,
      },
    },
    select: {
      id: true,
      name: true,
      createdAt: true,
      Contributions: {
        where: {
          isActive: 1,
        },
      },
      Withdrawals: {
        where: {
          isActive: 1,
        },
      },
    },
  });
};

const getAll = async (userId: number) => {
  return await database.wallets.findMany({
    where: {
      userId,
      isActive: 1,
    },
    include: {
      Contributions: {
        where: {
          isActive: 1,
        },
      },
      Withdrawals: {
        where: {
          isActive: 1,
        },
      },
    },
    // select: {
    //   id: true,
    //   userId: true,
    //   name: true,
    // },
  });
};

const portfolioBalance = async (userId: number) => {
  return await database.wallets.findMany({
    where: {
      userId,
      isActive: 1,
    },
    include: {
      Contributions: {
        where: {
          isActive: 1,
        },
      },
      Withdrawals: {
        where: {
          isActive: 1,
        },
      },
    },
    // select: {
    //   id: true,
    //   userId: true,
    //   name: true,
    // },
  });
};

const create = async (userId: number, name: string) => {
  return await database.wallets.create({
    data: {
      userId,
      name: name,
    },
  });
};

const deleteWallet = async (userId: number, walletId: number) => {
  const validateUser = await getById(userId, walletId);
  if (!validateUser) {
    throw new Error('denied');
  }
  return await database.wallets.update({
    where: {
      id: walletId,
    },
    data: {
      isActive: 0,
    },
  });
};

const updateName = async (
  userId: number,
  walletId: number,
  walletName: string
) => {
  const dataWallet = await getById(userId, walletId);
  if (!dataWallet) {
    throw new Error('denied');
  }
  return await database.wallets.update({
    where: {
      id: walletId,
    },
    data: {
      name: walletName,
    },
    select: {
      name: true,
    },
  });
};

export default {
  getById,
  create,
  getAll,
  deleteWallet,
  updateName,
  portfolioBalance,
};
