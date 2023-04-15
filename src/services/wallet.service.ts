import walletModels from '../models/wallet.models.js';

const getById = async (userId: number, walletId: number) => {
  return await walletModels.getById(Number(userId), Number(walletId));
};

const getAll = async (userId: number) => {
  return await walletModels.getAll(Number(userId));
};

const portfolioBalance = async (userId: number) => {
  return await walletModels.portfolioBalance(Number(userId));
};

const create = async (userId: number, name: string) => {
  return await walletModels.create(Number(userId), name);
};

const deleteWallet = async (userId: number, walletId: number) => {
  return await walletModels.deleteWallet(Number(userId), Number(walletId));
};

const updateName = async (
  userId: number,
  walletId: number,
  walletName: string
) => {
  return await walletModels.updateName(
    Number(userId),
    Number(walletId),
    String(walletName)
  );
};

export default {
  getById,
  create,
  getAll,
  deleteWallet,
  updateName,
  portfolioBalance,
};
