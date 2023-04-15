import { Contribution } from './Contribution.interface';

export interface ContributionPortfolio extends Contribution {
  cryptoCurrencyPrice: number;
  profit: number;
  profitPercent: number;
  updatedBalance: number;
  profitDefaultCoin: number;
  priceDefaultCoinAtTheTimeOfContribution: number;
  priceDefaultCoinRightNow: number;
  profitDefaultCoinPercent: number;
}
