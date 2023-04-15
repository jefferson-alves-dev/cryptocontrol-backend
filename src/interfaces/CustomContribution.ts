import { Contribution } from './Contribution.interface';

export interface CustomContribution extends Contribution {
  cryptoCurrencyPrice: number;
  profit: number;
  profitPercent: number;
  updatedBalance: number;
}
