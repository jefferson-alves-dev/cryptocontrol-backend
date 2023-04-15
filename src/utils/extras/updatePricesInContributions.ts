import { Decimal } from '@prisma/client/runtime/index.js';
import { Contribution } from '../../interfaces/Contribution.interface';
import { Wallet } from '../../interfaces/Wallet.interface';

interface tempContribution extends Contribution {
  priceDefaultCoinAtTheTimeOfContribution: number;
  priceDefaultCoinRightNow: number;
  profitDefaultCoin: number;
  profitDefaultCoinPercent: number;
}

export default async function updatePricesInContributions(
  wallets: Wallet[],
  defaultFiatCoinId?: number,
  priceDefaultFiatCoinId?: number
) {
  wallets.forEach((wallet: Wallet) => {
    wallet.Contributions.forEach((contribution: Contribution) => {
      const tempContribution = contribution as tempContribution;

      contribution.amountContribution =
        tempContribution.priceDefaultCoinAtTheTimeOfContribution *
        Number(contribution.amountContribution);

      contribution.coinPrice =
        tempContribution.priceDefaultCoinAtTheTimeOfContribution *
        Number(contribution.coinPrice);

      contribution.brokerFee = new Decimal(
        tempContribution.priceDefaultCoinAtTheTimeOfContribution *
          Number(contribution.brokerFee)
      );

      if (!priceDefaultFiatCoinId) {
        priceDefaultFiatCoinId = 1;
      }

      tempContribution.priceDefaultCoinRightNow = priceDefaultFiatCoinId;
      tempContribution.profitDefaultCoin =
        tempContribution.priceDefaultCoinRightNow -
        tempContribution.priceDefaultCoinAtTheTimeOfContribution;

      tempContribution.profitDefaultCoinPercent =
        ((tempContribution.priceDefaultCoinRightNow -
          tempContribution.priceDefaultCoinAtTheTimeOfContribution) /
          tempContribution.priceDefaultCoinRightNow) *
        100;
    });
  });
}
