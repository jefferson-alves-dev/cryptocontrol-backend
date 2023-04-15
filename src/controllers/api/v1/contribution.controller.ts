// import axios from 'axios';
import axios from 'axios';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import contributionModels from '../../../models/contribution.models.js';
import jwtHandler from '../../../utils/validations/jtw.validations.js';

const create = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ ...errors });
  }
  const { userId }: any = await jwtHandler.decodeToken(res.locals.accessToken);
  const {
    walletId,
    contributionSymbol,
    contributionSymbolIdInCoinMarketCap,
    coinIdInCoinMarketCap,
    coinSymbol,
    coinName,
    coinPrice,
    contributionDate,
    amountContribution,
    brokerFee,
    amountCoins,
  } = req.body;

  const responseCurrentCoinbasePrice = await axios.get(
    `https://api.coinmarketcap.com/data-api/v3/cryptocurrency/quote/latest?id=${contributionSymbolIdInCoinMarketCap}&convertId=2781,2782,2783,2784,2785,2786,2787,2788,2789,2790,2791,2792,2793,2794,2795,2796,2797,2798,2799,2800,2801,2802,2803,2804,2805,2806,2807,2808,2809,2810,2811,2812,2823,3554,3544,2821,2817,2824,2819,2813,2820,3538,3566,3530,3540,2814,3573,1,1027,2010,1839,6636,52,1975,2,512,1831,7083,74,9023,9022,5824,6783,11841,11840`
  );
  const data = responseCurrentCoinbasePrice.data;

  const dataObj: any = { data: {} };

  for (const item of data.data) {
    for (const coin of item.quotes) {
      const coinId = coin.name;
      dataObj.data[coinId] = { price: coin.price };
    }
  }
  dataObj.defaultFiatCoin = contributionSymbolIdInCoinMarketCap;

  try {
    const contribution = await contributionModels.create(
      Number(walletId),
      String(contributionSymbol),
      Number(contributionSymbolIdInCoinMarketCap),
      JSON.stringify(dataObj),
      Number(coinIdInCoinMarketCap),
      String(coinSymbol),
      String(coinName),
      Number(coinPrice),
      String(contributionDate),
      Number(amountContribution),
      Number(brokerFee),
      Number(amountCoins),
      Number(userId)
    );
    return res.status(201).json({ ...contribution });
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
  const { contributionId } = req.params;
  const contribution = await contributionModels.getById(
    Number(userId),
    Number(contributionId)
  );
  return res.status(200).json({ contribution });
};

const getAll = async (req: Request, res: Response) => {
  const { userId }: any = await jwtHandler.decodeToken(res.locals.accessToken);
  const contributions = await contributionModels.getAll(Number(userId));
  return res.status(200).json({ contributions });
};

const update = async (req: Request, res: Response) => {
  const { userId }: any = await jwtHandler.decodeToken(res.locals.accessToken);
  const { contributionId } = req.params;
  const {
    walletId,
    coinId,
    coinName,
    coinPrice,
    contributionDate,
    amountContribution,
    brokerFee,
    amountCoins,
  } = req.body;
  try {
    const newData = await contributionModels.update(
      Number(contributionId),
      Number(userId),
      Number(walletId),
      Number(coinId),
      String(coinName),
      Number(coinPrice),
      contributionDate,
      Number(amountContribution),
      Number(brokerFee),
      Number(amountCoins)
    );
    if (!newData) return res.status(401).end();
    return res.status(200).json({ contribution: newData });
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
  if (!errors.isEmpty()) {
    return res.status(400).json({ ...errors });
  }

  const { userId }: any = await jwtHandler.decodeToken(res.locals.accessToken);
  const { contributionId } = req.params;
  const contribution = await contributionModels._delete(
    Number(userId),
    Number(contributionId)
  );
  if (!contribution) {
    return res.status(400).json({
      message: 'The informed contribution must exist for the informed user.',
    });
  }
  return res.status(201).end();
};

export default { getAll, getById, create, _delete, update };
