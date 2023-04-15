import { body, param } from 'express-validator';

const contributionBody = [
  body('walletId')
    .escape()
    .isNumeric()
    .withMessage('The expected value is of type number.'),
  body('walletId')
    .escape()
    .not()
    .isEmpty()
    .withMessage("The 'walletId' cannot be empty."),
  body('contributionSymbolIdInCoinMarketCap')
    .escape()
    .not()
    .isEmpty()
    .withMessage("The 'contributionSymbolIdInCoinMarketCap' cannot be empty."),

  body('coinIdInCoinMarketCap')
    .escape()
    .isNumeric()
    .withMessage('The expected value is of type number.'),
  body('coinIdInCoinMarketCap')
    .escape()
    .not()
    .isEmpty()
    .withMessage("The 'coinIdInCoinMarketCap' cannot be empty."),
  body('coinSymbol')
    .escape()
    .not()
    .isEmpty()
    .withMessage("The 'coinSymbol' cannot be empty."),
  body('coinSymbol')
    .escape()
    .not()
    .isNumeric()
    .withMessage('The expected value is of type string.'),
  body('coinName')
    .escape()
    .not()
    .isEmpty()
    .withMessage("The 'coinName' cannot be empty."),
  body('coinPrice')
    .escape()
    .isNumeric()
    .withMessage('The expected value is of type number.'),
  body('coinPrice')
    .escape()
    .not()
    .isEmpty()
    .withMessage("The 'coinPrice' cannot be empty."),
  body('contributionDate')
    .escape()
    .isString()
    .withMessage("The 'contributionDate' has to be of type string."),
  body('contributionDate')
    .escape()
    .not()
    .isEmpty()
    .withMessage("The 'contributionDate' cannot be empty."),
  body('amountContribution')
    .escape()
    .isNumeric()
    .withMessage('The expected value is of type number.'),
  body('amountContribution')
    .escape()
    .not()
    .isEmpty()
    .withMessage("The 'amountContribution' cannot be empty."),
  body('brokerFee')
    .escape()
    .isNumeric()
    .withMessage('The expected value is of type number.'),
  body('brokerFee')
    .escape()
    .not()
    .isEmpty()
    .withMessage("The 'brokerFee' cannot be empty."),
  body('amountCoins')
    .escape()
    .isNumeric()
    .withMessage('The expected value is of type number.'),
  body('amountCoins')
    .escape()
    .not()
    .isEmpty()
    .withMessage("The 'amountCoins' cannot be empty."),
];

const validateId = [
  param('contributionId')
    .escape()
    .isNumeric()
    .withMessage('The expected value is of type number.'),
  param('contributionId')
    .escape()
    .not()
    .isEmpty()
    .withMessage("The 'contributionId' cannot be empty."),
];

export default { contributionBody, validateId };
