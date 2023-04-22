import { Contribution } from './Contribution';

export type CustomContribution = Contribution & {
  cryptoCurrencyPrice: number;
  profit: number;
  profitPercent: number;
  updatedBalance: number;
};
