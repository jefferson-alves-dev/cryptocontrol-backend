import { Request, Response } from 'express';
import coinsModels from '../../../models/cryptoCoins.models.js';

const cryptocoins = async (req: Request, res: Response) => {
  const coins = await coinsModels.getAllCryptoCoins();
  return res.status(200).json({ coins });
};

const fiatcoins = async (req: Request, res: Response) => {
  const coins = await coinsModels.getAllFiatCoins();
  return res.status(200).json({ coins });
};

export default { cryptocoins, fiatcoins };
