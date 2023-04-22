// import axios from 'axios';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import contributionModels from '../../../models/contribution.models.js';
import { coinmarketcapLatestQuoteResponse } from '../../../utils/requests/coinMarketCap.js';
import jwtHandler from '../../../utils/validations/jtw.validations.js';

const create = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ ...errors });
  }
  const decodedToken = await jwtHandler.decodeToken(res.locals.accessToken);
  const userId = decodedToken ? decodedToken.userId : '';

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

  const latestPrices = await coinmarketcapLatestQuoteResponse(
    Number(contributionSymbolIdInCoinMarketCap)
  );

  if (!latestPrices)
    return res.status(500).json({
      error: true,
      timeoutExceeded: true,
      message:
        'There was a server error when capturing the current values of the coins that can be used for the contribution. Try again!',
    });

  try {
    const contribution = await contributionModels.create(
      Number(walletId),
      String(contributionSymbol),
      Number(contributionSymbolIdInCoinMarketCap),
      JSON.stringify(latestPrices),
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

  const userId = res.locals.userId;
  const { contributionId } = req.params;
  const contribution = await contributionModels.getById(
    Number(userId),
    Number(contributionId)
  );
  if (!contribution) return res.status(200).json({ contribution: [] });

  return res.status(200).json({ contribution });
};

const getAll = async (req: Request, res: Response) => {
  const userId = res.locals.userId;
  const contributions = await contributionModels.getAll(Number(userId));
  return res.status(200).json({ contributions });
};

const update = async (req: Request, res: Response) => {
  const userId = res.locals.userId;
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

  const userId = res.locals.userId;
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
