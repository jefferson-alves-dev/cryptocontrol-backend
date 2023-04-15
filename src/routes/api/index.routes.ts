import { Router } from 'express';
import authAuthorizer from '../../middlewares/tokenChecker.middleware.js';
import routersAuth from './v1/auth.routes.js';
import routersCoins from './v1/coins.routes.js';
import routesContribution from './v1/contribution.routes.js';
import routesPortfolio from './v1/portfolio.routes.js';
import routersUser from './v1/user.routes.js';
import routersWallet from './v1/wallet.routes.js';
import routesWithdrawal from './v1/withdrawal.routes.js';

const router = Router();

router.use('/auth', routersAuth);
router.use('/user', routersUser);
router.use('/wallet', authAuthorizer.tokenChecker, routersWallet);
router.use('/contribution', authAuthorizer.tokenChecker, routesContribution);
router.use('/withdrawal', authAuthorizer.tokenChecker, routesWithdrawal);
router.use('/coins', authAuthorizer.tokenChecker, routersCoins);
router.use('/portfolio', authAuthorizer.tokenChecker, routesPortfolio);

export default router;
