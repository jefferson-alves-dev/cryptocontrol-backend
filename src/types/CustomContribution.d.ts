import { TypeContribution } from './Contribution';

export type TypeCustomContribution = TypeContribution & {
  cryptoCurrencyPrice: number;
  profit: number;
  profitPercent: number;
  updatedBalance: number;
};
