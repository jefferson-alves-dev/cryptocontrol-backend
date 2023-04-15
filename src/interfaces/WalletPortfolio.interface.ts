import { Decimal } from '@prisma/client/runtime';
import { Wallet } from './Wallet.interface';

export interface WalletPortfolio extends Wallet {
  totalSumContributionsWallet: Decimal | number;
  walletProfit: Decimal | number;
  realBalanceWallet: Decimal | number;
}
