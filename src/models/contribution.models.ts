import { database } from '../database/database.js';

const getAll = async (userId: number) => {
  return await database.contributions.findMany({
    where: {
      userId: userId,
      AND: {
        isActive: 1,
      },
    },
  });
};

const getById = async (userId: number, contributionId: number) => {
  const userWallet = await database.contributions.findFirst({
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
    throw new Error('The informed wallet must exist for the informed user.');
  }
  return await database.contributions.findFirst({
    where: {
      id: contributionId,
      AND: {
        userId: userId,
        isActive: 1,
      },
    },
  });
};

const create = async (
  walletId: number,
  contributionSymbol: string,
  contributionSymbolIdInCoinMarketCap: number,
  basePricesFiatCoins: string,
  coinIdInCoinMarketCap: number,
  coinSymbol: string,
  coinName: string,
  coinPrice: number,
  contributionDate: string,
  amountContribution: number,
  brokerFee: number,
  amountCoins: number,
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
  return await database.contributions.create({
    data: {
      walletId,
      contributionSymbol: contributionSymbol,
      contributionSymbolIdInCoinMarketCap: contributionSymbolIdInCoinMarketCap,
      basePricesFiatCoins: basePricesFiatCoins,
      coinIdInCoinMarketCap,
      coinSymbol,
      coinName,
      coinPrice,
      contributionDate,
      amountContribution,
      brokerFee,
      amountCoins,
      userId,
    },
    select: {
      coinName: true,
      coinPrice: true,
      contributionDate: true,
      amountContribution: true,
      brokerFee: true,
      amountCoins: true,
    },
  });
};

const update = async (
  contributionId: number,
  userId: number,
  walletId: number,
  coinIdInCoinMarketCap: number,
  coinName: string,
  coinPrice: number,
  contributionDate: string,
  amountContribution: number,
  brokerFee: number,
  amountCoins: number
) => {
  const dataWallet = await getById(userId, walletId);
  if (!dataWallet) {
    throw new Error('denied');
  }
  return await database.contributions.update({
    where: {
      id: walletId,
    },
    data: {
      id: contributionId,
      coinIdInCoinMarketCap,
      coinName,
      coinPrice,
      contributionDate,
      amountContribution,
      brokerFee,
      amountCoins,
    },
  });
};

const _delete = async (userId: number, contributionId: number) => {
  const validateUser = await database.contributions.findFirst({
    where: {
      id: contributionId,
      AND: {
        userId: userId,
      },
    },
  });
  if (!validateUser) return null;
  return await database.contributions.update({
    where: {
      id: contributionId,
    },
    data: {
      isActive: 0,
    },
  });
};

export default { getById, getAll, create, _delete, update };
