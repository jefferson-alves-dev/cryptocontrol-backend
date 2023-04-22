import { Decimal } from '@prisma/client/runtime';
import { Wallet } from './Wallet';

export type WalletPortfolio = Wallet & {
  totalSumContributionsWallet: Decimal | number;
  walletProfit: Decimal | number;
  realBalanceWallet: Decimal | number;
};
