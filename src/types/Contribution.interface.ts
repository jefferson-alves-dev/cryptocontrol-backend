import { Decimal } from '@prisma/client/runtime';

export type Contribution = {
  id: number;
  walletId: number;
  contributionSymbol: String;
  contributionSymbolIdInCoinMarketCap: number;
  priceCurrencyUsedForContribution?: number;
  basePricesFiatCoins: string;
  coinIdInCoinMarketCap: number;
  coinSymbol: String;
  coinName: String;
  coinPrice: Decimal | number;
  contributionDate: Date;
  amountContribution: Decimal | number;
  brokerFee: Decimal;
  amountCoins: Decimal;
  createdAt: Date | null;
  isActive: number;
  userId: number;
};
