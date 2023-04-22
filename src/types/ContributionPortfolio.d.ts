import { TypeContribution } from './Contribution';

export type TypeContributionPortfolio = TypeContribution & {
  cryptoCurrencyPrice: number;
  profit: number;
  profitPercent: number;
  updatedBalance: number;
  profitDefaultCoin: number;
  priceDefaultCoinAtTheTimeOfContribution: number;
  priceDefaultCoinRightNow: number;
  profitDefaultCoinPercent: number;
};
