import { database } from '../database/database.js';

const getAll = async (userId: number) => {
  return await database.withdrawals.findMany({
    where: {
      userId: userId,
      AND: {
        isActive: 1,
      },
    },
  });
};

const getById = async (userId: number, withdrawalId: number) => {
  const userWallet = await database.withdrawals.findFirst({
    where: {
      userId: userId,
      AND: {
        isActive: 1,
      },
    },
    select: {
      id: true,
    },
  });
  if (!userWallet) {
    return null;
  }
  return await database.withdrawals.findFirst({
    where: {
      id: withdrawalId,
      AND: {
        userId: userId,
        isActive: 1,
      },
    },
  });
};

const create = async (
  walletId: number,
  withdrawalSymbol: string,
  withdrawalSymbolIdInCoinMarketCap: number,
  coinIdInCoinMarketCap: number,
  coinSymbol: string,
  coinName: string,
  coinPrice: number,
  withdrawalDate: string,
  amountWithdrawal: number,
  amountCoinsWithdrawal: number,
  userId: number
) => {
  const userWallets = await database.wallets.findFirst({
    where: {
      userId: userId,
      AND: {
        id: walletId,
        isActive: 1,
      },
    },
    select: {
      id: true,
    },
  });
  if (!userWallets) {
    throw new Error('denied');
  }
  return await database.withdrawals.create({
    data: {
      walletId,
      withdrawalSymbol,
      withdrawalSymbolIdInCoinMarketCap,
      coinIdInCoinMarketCap,
      coinSymbol,
      coinName,
      coinPrice,
      withdrawalDate,
      amountWithdrawal,
      amountCoinsWithdrawal,
      userId,
    },
    select: {
      coinName: true,
      coinPrice: true,
      withdrawalDate: true,
      amountWithdrawal: true,
      amountCoinsWithdrawal: true,
    },
  });
};

const update = async (
  withdrawalId: number,
  walletId: number,
  withdrawalSymbolIdInCoinMarketCap: number,
  coinIdInCoinMarketCap: number,
  coinName: string,
  coinPrice: number,
  withdrawalDate: string,
  amountWithdrawal: number,
  amountCoinsWithdrawal: number,
  userId: number
) => {
  const validateUser = await database.withdrawals.findFirst({
    where: {
      id: withdrawalId,
      AND: {
        userId,
        isActive: 1,
        walletId,
      },
    },
  });
  if (!validateUser) return null;
  return await database.withdrawals.update({
    where: {
      id: withdrawalId,
    },
    data: {
      walletId,
      withdrawalSymbolIdInCoinMarketCap,
      coinIdInCoinMarketCap,
      coinName,
      coinPrice,
      withdrawalDate,
      amountWithdrawal,
      amountCoinsWithdrawal,
    },
  });
};

const _delete = async (userId: number, withdrawalId: number) => {
  const validateUser = await database.withdrawals.findFirst({
    where: {
      id: withdrawalId,
      AND: {
        userId,
        isActive: 1,
      },
    },
  });
  if (!validateUser) return null;
  return await database.withdrawals.update({
    where: {
      id: withdrawalId,
    },
    data: {
      isActive: 0,
    },
  });
};

export default { getById, getAll, create, _delete, update };
