import { Decimal } from '@prisma/client/runtime';
import { TypeWallet } from './Wallet';

export type TypeWalletPortfolio = TypeWallet & {
  totalSumContributionsWallet: Decimal | number;
  walletProfit: Decimal | number;
  realBalanceWallet: Decimal | number;
};
