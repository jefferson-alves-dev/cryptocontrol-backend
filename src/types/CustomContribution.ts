import { Contribution } from './Contribution.interface';

export type CustomContribution = Contribution & {
  cryptoCurrencyPrice: number;
  profit: number;
  profitPercent: number;
  updatedBalance: number;
};
