import { Decimal } from '@prisma/client/runtime/index.js';
import { TypeContribution } from '../../types/Contribution';
import { TypeWallet } from '../../types/Wallet';

interface tempContribution extends TypeContribution {
  priceDefaultCoinAtTheTimeOfContribution: number;
  priceDefaultCoinRightNow: number;
  profitDefaultCoin: number;
  profitDefaultCoinPercent: number;
}

export default async function updatePricesInContributions(
  wallets: TypeWallet[],
  defaultFiatCoinId?: number,
  priceDefaultFiatCoinId?: number
) {
  wallets.forEach((wallet: TypeWallet) => {
    wallet.Contributions.forEach((contribution: TypeContribution) => {
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
