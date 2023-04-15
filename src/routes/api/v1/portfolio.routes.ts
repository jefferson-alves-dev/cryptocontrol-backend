import { Router } from 'express';
import portfolioController from '../../../controllers/api/v1/portfolio.controller.js';

const routesPortfolio = Router();

routesPortfolio.get(
  '/portfolio-balance/:defaultFiatCoin',
  portfolioController.portfolioBalance
);

export default routesPortfolio;
