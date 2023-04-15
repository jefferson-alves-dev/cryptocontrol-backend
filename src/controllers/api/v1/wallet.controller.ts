import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import userService from '../../../services/user.service.js';
import walletService from '../../../services/wallet.service.js';
import jwtHandler from '../../../utils/validations/jtw.validations.js';
// import axios from 'axios';

const create = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ ...errors });
  }
  const { userId }: any = await jwtHandler.decodeToken(res.locals.accessToken);

  const userExists = await userService.getById(Number(userId));
  if (!userExists) {
    return res.status(400).json({
      message:
        'It was not possible to create the wallet, because the user entered does not exist.',
    });
  }

  const { name } = req.body;
  await walletService.create(Number(userId), String(name));
  res.status(201).json({ userId, name });
};

const getAll = async (req: Request, res: Response) => {
  const { userId }: any = await jwtHandler.decodeToken(res.locals.accessToken);
  const wallets = await walletService.getAll(userId);

  // const currentPrice = axios.get('')

  return res.status(200).json(wallets);
};

const getById = async (req: Request, res: Response) => {
  const { walletId }: any = req.params;
  if (!walletId)
    return res.status(400).json({ message: 'Wallet Id is required.' });

  if (typeof Number(walletId) !== 'number' || isNaN(Number(walletId))) {
    return res.status(400).json({ message: 'Wallet Id is not a number.' });
  }

  const { userId }: any = await jwtHandler.decodeToken(res.locals.accessToken);
  const wallet = await walletService.getById(userId, Number(walletId));

  return res.status(200).json(wallet);
};

const deleteWallet = async (req: Request, res: Response) => {
  const { userId }: any = await jwtHandler.decodeToken(res.locals.accessToken);
  const { walletId } = req.params;
  try {
    const queryExecute = await walletService.deleteWallet(
      Number(userId),
      Number(walletId)
    );
    if (!queryExecute) return res.status(401).end();
    return res.status(204).end();
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'denied') {
        return res.status(400).json({
          message: 'The informed wallet must exist for the informed user.',
        });
      }
    }
    return res.status(422).json({ message: 'There was an error.' });
  }
};

const updateName = async (req: Request, res: Response) => {
  const { userId }: any = await jwtHandler.decodeToken(res.locals.accessToken);
  const { walletId } = req.params;
  const { walletName } = req.body;
  if (!walletName) {
    return res
      .status(404)
      .json({ message: 'The wallet name cannot be empty.' });
  }
  try {
    const newNameWallet = await walletService.updateName(
      Number(userId),
      Number(walletId),
      String(walletName)
    );
    if (!newNameWallet) return res.status(401).end();
    return res.status(200).json({ walletName: newNameWallet.name });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'denied') {
        return res.status(400).json({
          message: 'The informed wallet must exist for the informed user.',
        });
      }
    }
    return res.status(422).json({ message: 'There was an error.' });
  }
};

const portfolioBalance = async (req: Request, res: Response) => {
  const { userId }: any = await jwtHandler.decodeToken(res.locals.accessToken);
  const wallets = await walletService.portfolioBalance(userId);

  // const currentPrice = axios.get('')

  return res.status(200).json(wallets);
};

export default {
  create,
  getAll,
  deleteWallet,
  updateName,
  getById,
  portfolioBalance,
};
