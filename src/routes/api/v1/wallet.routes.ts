import { Router } from 'express';
import walletController from '../../../controllers/api/v1/wallet.controller.js';
import authHandler from '../../../middlewares/tokenChecker.middleware.js';
import createWalletValidation from '../../../utils/validations/createWallet.validations.js';

const routersWallet = Router();

routersWallet.post(
  '/create',
  createWalletValidation.createWallet,
  authHandler.tokenChecker,
  walletController.create
);

routersWallet.get('/', authHandler.tokenChecker, walletController.getAll);

routersWallet.get(
  '/:walletId?',
  authHandler.tokenChecker,
  walletController.getById
);
routersWallet.delete(
  '/:walletId',
  authHandler.tokenChecker,
  walletController.deleteWallet
);

routersWallet.patch(
  '/:walletId',
  authHandler.tokenChecker,
  walletController.updateName
);

export default routersWallet;
