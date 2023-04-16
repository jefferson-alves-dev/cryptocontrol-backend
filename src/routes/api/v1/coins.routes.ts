import { Router } from 'express';
import coinsController from '../../../controllers/api/v1/coins.controller.js';

const routersCoins = Router();

routersCoins.get('/cryptocoins', coinsController.cryptocoins);
routersCoins.get('/fiatcoins', coinsController.fiatcoins);

export default routersCoins;
