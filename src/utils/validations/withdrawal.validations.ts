import { body, param } from 'express-validator';

const create = [
  body('walletId')
    .escape()
    .isNumeric()
    .withMessage('The expected value is of type number.'),
  body('walletId')
    .escape()
    .not()
    .isEmpty()
    .withMessage("The 'walletId' cannot be empty."),
  body('coinId')
    .escape()
    .isNumeric()
    .withMessage('The expected value is of type number.'),
  body('coinId')
    .escape()
    .not()
    .isEmpty()
    .withMessage("The 'coinId' cannot be empty."),
  body('coinName')
    .escape()
    .not()
    .isEmpty()
    .withMessage("The 'coinName' cannot be empty."),
  body('withdrawalSymbol')
    .escape()
    .not()
    .isEmpty()
    .withMessage("The 'withdrawalSymbol' cannot be empty."),
  body('coinSymbol')
    .escape()
    .not()
    .isEmpty()
    .withMessage("The 'coinSymbol' cannot be empty."),
  body('coinPrice')
    .escape()
    .isNumeric()
    .withMessage('The expected value is of type number.'),
  body('coinPrice')
    .escape()
    .not()
    .isEmpty()
    .withMessage("The 'coinPrice' cannot be empty."),
  body('withdrawalDate')
    .escape()
    .isString()
    .withMessage("The 'withdrawalDate' has to be of type string."),
  body('withdrawalDate')
    .escape()
    .not()
    .isEmpty()
    .withMessage("The 'withdrawalDate' cannot be empty."),
  body('amountWithdrawal')
    .escape()
    .isNumeric()
    .withMessage('The expected value is of type number.'),
  body('amountWithdrawal')
    .escape()
    .not()
    .isEmpty()
    .withMessage("The 'amountWithdrawal' cannot be empty."),
  body('amountCoinsWithdrawal')
    .escape()
    .isNumeric()
    .withMessage('The expected value is of type number.'),
  body('amountCoinsWithdrawal')
    .escape()
    .not()
    .isEmpty()
    .withMessage("The 'amountCoinsWithdrawal' cannot be empty."),
];

const validateId = [
  param('withdrawalId')
    .escape()
    .isNumeric()
    .withMessage('The expected value is of type number.'),
  param('withdrawalId')
    .escape()
    .not()
    .isEmpty()
    .withMessage("The 'withdrawalId' cannot be empty."),
];

export default { create, validateId };
