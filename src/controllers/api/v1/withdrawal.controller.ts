import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import withdrawalModels from '../../../models/withdrawal.models.js';
import jwtHandler from '../../../utils/validations/jtw.validations.js';

const create = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ ...errors });
  }
  const { userId }: any = await jwtHandler.decodeToken(res.locals.accessToken);
  const {
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
  } = req.body;
  try {
    const withdrawals = await withdrawalModels.create(
      Number(walletId),
      withdrawalSymbol,
      withdrawalSymbolIdInCoinMarketCap,
      Number(coinIdInCoinMarketCap),
      coinSymbol,
      coinName,
      Number(coinPrice),
      withdrawalDate,
      Number(amountWithdrawal),
      Number(amountCoinsWithdrawal),
      Number(userId)
    );
    return res.status(201).json({ ...withdrawals });
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

const getById = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ ...errors });
  }

  const { userId }: any = await jwtHandler.decodeToken(res.locals.accessToken);
  const { withdrawalId } = req.params;
  const withdrawal = await withdrawalModels.getById(
    Number(userId),
    Number(withdrawalId)
  );
  if (!withdrawal) {
    return res.status(400).json({
      message: 'The informed withdrawal must exist for the informed user.',
    });
  }
  return res.status(200).json({ withdrawal });
};

const getAll = async (req: Request, res: Response) => {
  const { userId }: any = await jwtHandler.decodeToken(res.locals.accessToken);
  const withdrawal = await withdrawalModels.getAll(Number(userId));
  return res.status(200).json({ withdrawal });
};

const update = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ ...errors });
  }
  const { userId }: any = await jwtHandler.decodeToken(res.locals.accessToken);
  const { withdrawalId } = req.params;
  const {
    walletId,
    withdrawalSymbolIdInCoinMarketCap,
    coinIdInCoinMarketCap,
    coinName,
    coinPrice,
    withdrawalDate,
    amountWithdrawal,
    amountCoinsWithdrawal,
  } = req.body;
  try {
    const newData = await withdrawalModels.update(
      Number(withdrawalId),
      Number(withdrawalSymbolIdInCoinMarketCap),
      Number(walletId),
      Number(coinIdInCoinMarketCap),
      String(coinName),
      Number(coinPrice),
      String(withdrawalDate),
      Number(amountWithdrawal),
      Number(amountCoinsWithdrawal),
      Number(userId)
    );
    if (!newData) return res.status(401).end();
    return res.status(200).json({ withdrawal: newData });
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

const _delete = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    return res.status(400).json({ ...errors });
  }

  const { userId }: any = await jwtHandler.decodeToken(res.locals.accessToken);
  const { withdrawalId } = req.params;

  const withdrawal = await withdrawalModels._delete(
    Number(userId),
    Number(withdrawalId)
  );
  if (!withdrawal) {
    return res.status(400).json({
      message: 'The informed withdrawal must exist for the informed user.',
    });
  }
  return res.status(204).end();
};

export default { getAll, getById, create, _delete, update };
