import axios from 'axios';
import { Request, Response } from 'express';
import portfolioModels from '../../../models/portfolio.models.js';
import { TypeCoinCMC } from '../../../types/CoinMarketCap.js';
import { TypeContribution } from '../../../types/Contribution.js';
import { TypeContributionPortfolio } from '../../../types/ContributionPortfolio.js';
import { TypeWallet } from '../../../types/Wallet.js';
import { TypeWalletPortfolio } from '../../../types/WalletPortfolio.js';
import extractCryptoCoinPrice from '../../../utils/extras/extractCryptoCoinPrice.js';
import extractIdCryptoCoins from '../../../utils/extras/extractIdCryptoCoins.js';
import extractIdFiatCoins from '../../../utils/extras/extractIdFiatCoins.js';
import coinConversionUrl from '../../../utils/extras/generateUrlCoinMarketCap.js';
import getAllContributions from '../../../utils/extras/getAllContributions.js';
import updatePricesInContributions from '../../../utils/extras/updatePricesInContributions.js';

const portfolioBalance = async (req: Request, res: Response) => {
  const { defaultFiatCoin } = req.params;

  if (!defaultFiatCoin) {
    return res.status(404).json({
      error: true,
      message: "The parameter 'defaultFiatCoin' cannot be empty.",
    });
  }

  const userId = res.locals.userId;
  const wallets: TypeWallet[] = await portfolioModels.portfolioBalance(
    Number(userId)
  );

  if (wallets.length < 1) {
    return res.status(200).json({ wallets: [] });
  }

  const fiatCoinsId = [
    ...new Set(extractIdFiatCoins(Number(defaultFiatCoin), wallets)),
  ];
  const cryptosCoinsId = [...new Set(extractIdCryptoCoins(wallets))];

  const urlGetFiatCurrencyPrice = coinConversionUrl(
    fiatCoinsId,
    Number(defaultFiatCoin)
  );
  const urlGetCryptoCurrencyPrice = coinConversionUrl(
    cryptosCoinsId,
    Number(defaultFiatCoin)
  );

  const [responseFiatPrices, responseCryptoPrices] = await Promise.all([
    axios.get(urlGetFiatCurrencyPrice),
    axios.get(urlGetCryptoCurrencyPrice),
  ]);

  const fiatPrices: TypeCoinCMC[] = responseFiatPrices.data.data;
  const cryptoPrices: TypeCoinCMC[] = responseCryptoPrices.data.data;

  wallets.forEach((wallet: TypeWallet) => {
    wallet.Contributions.forEach((contribution: TypeContribution) => {
      const coinFiatPrices = contribution.basePricesFiatCoins
        ? JSON.parse(contribution.basePricesFiatCoins)
        : '';
      contribution.priceDefaultCoinAtTheTimeOfContribution =
        coinFiatPrices[String(defaultFiatCoin)];
      delete contribution?.basePricesFiatCoins;
    });
  });

  const [allContributions] = await Promise.all([
    getAllContributions(wallets),
    updatePricesInContributions(
      wallets,
      Number(defaultFiatCoin),
      Number(fiatPrices[0].quotes[0].price)
    ),
  ]);

  wallets.forEach((wallet: TypeWallet) => {
    const walletPortfolio = wallet as TypeWalletPortfolio;

    const { Contributions } = wallet;

    const { totalSumContributions, profit } = Contributions.reduce(
      (accumulatedValues, contribution: TypeContribution) => {
        const contributionPortfolio = contribution as TypeContributionPortfolio;
        const {
          amountContribution,
          brokerFee,
          coinPrice,
          coinIdInCoinMarketCap,
        } = contribution;

        const cryptoCurrencyPrice = extractCryptoCoinPrice(
          cryptoPrices,
          coinIdInCoinMarketCap
        );
        contributionPortfolio.cryptoCurrencyPrice = cryptoCurrencyPrice;

        const contributionProfit =
          (cryptoCurrencyPrice - Number(coinPrice)) *
            (Number(amountContribution) / Number(coinPrice)) -
          Number(brokerFee);

        const profitPercent =
          ((cryptoCurrencyPrice * Number(amountContribution) -
            Number(coinPrice) * Number(amountContribution)) /
            (Number(coinPrice) * Number(amountContribution))) *
            100 +
          contributionPortfolio.profitDefaultCoinPercent;

        const roundedProfitPercent = parseFloat(profitPercent.toFixed(2));

        contributionPortfolio.profit =
          contributionProfit - contributionPortfolio.profitDefaultCoin;
        contributionPortfolio.profitPercent = roundedProfitPercent;
        contributionPortfolio.updatedBalance =
          Number(amountContribution) + contributionProfit;

        return {
          totalSumContributions:
            accumulatedValues.totalSumContributions +
            Number(amountContribution),
          profit: accumulatedValues.profit + contributionProfit,
        };
      },
      { totalSumContributions: 0, profit: 0 }
    );

    walletPortfolio.totalSumContributionsWallet = totalSumContributions;
    walletPortfolio.walletProfit = profit;
    walletPortfolio.realBalanceWallet = totalSumContributions + profit;
  });

  const totalBalance: any = [];

  wallets.forEach((wallet: TypeWallet) => {
    const walletPortfolio = wallet as TypeWalletPortfolio;
    totalBalance.push(walletPortfolio.realBalanceWallet);
  });

  return res.status(200).json({
    wallets,
    totalSumAllContributions: allContributions.reduce(
      (acc, item) => Number(acc) + Number(item)
    ),
    totalBalance: totalBalance.reduce((acc: any, item: any) => acc + item),
  });
};

export default {
  portfolioBalance,
};
