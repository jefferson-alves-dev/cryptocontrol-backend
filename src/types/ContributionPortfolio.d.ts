import { Contribution } from './Contribution';

export type ContributionPortfolio = Contribution & {
  cryptoCurrencyPrice: number;
  profit: number;
  profitPercent: number;
  updatedBalance: number;
  profitDefaultCoin: number;
  priceDefaultCoinAtTheTimeOfContribution: number;
  priceDefaultCoinRightNow: number;
  profitDefaultCoinPercent: number;
};
