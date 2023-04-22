import { Decimal } from '@prisma/client/runtime';
import { TypeFiatCoin } from './FiatCoin';
import { TypeUser } from './User';
import { TypeWallet } from './Wallet';

export type TypeWithdrawal = {
  id: number;
  walletId: number;
  withdrawalSymbol: string;
  withdrawalSymbolIdInCoinMarketCap: number;
  coinSymbol: string;
  coinName: string;
  coinPrice: Decimal;
  withdrawalDate: Date;
  amountWithdrawal: Decimal;
  amountCoinsWithdrawal: Decimal;
  createdAt: Date;
  isActive: number;
  userId: number;
  user: TypeUser;
  wallet: TypeWallet[];
  fiatCoin: TypeFiatCoin;
};
