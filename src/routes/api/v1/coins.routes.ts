import { Router } from 'express';
import coinsController from '../../../controllers/api/v1/coins.controller.js';

const routersCoins = Router();

routersCoins.get('/all', coinsController.getAll);

export default routersCoins;
