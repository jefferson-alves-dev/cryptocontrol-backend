import { Request, Response } from 'express';
import coinsModels from '../../../models/cryptoCoins.models.js';

const getAll = async (req: Request, res: Response) => {
  const coins = await coinsModels.getAll();
  return res.status(200).json({ coins });
};

export default { getAll };
