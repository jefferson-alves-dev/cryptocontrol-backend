import axios from 'axios';
import { Request, Response } from 'express';
import { CoinCMC } from '../../../interfaces/CoinMarketCap.interface';
import { Contribution } from '../../../interfaces/Contribution.interface';
import { ContributionPortfolio } from '../../../interfaces/ContributionPortfolio.interface';
import { Wallet } from '../../../interfaces/Wallet.interface';
import { WalletPortfolio } from '../../../interfaces/WalletPortfolio.interface';
import portfolioModels from '../../../models/portfolio.models.js';
import getAllContributions from '../../../utils/extras/getAllContributions.js';
import updatePricesInContributions from '../../../utils/extras/updatePricesInContributions.js';
import jwtHandler from '../../../utils/validations/jtw.validations.js';

import extractCryptoCoinPrice from '../../../utils/extras/extractCryptoCoinPrice.js';
import extractIdCryptoCoins from '../../../utils/extras/extractIdCryptoCoins.js';
import extractIdFiatCoins from '../../../utils/extras/extractIdFiatCoins.js';
import coinConversionUrl from '../../../utils/extras/generateUrlCoinMarketCap.js';

const portfolioBalance = async (req: Request, res: Response) => {
  const { defaultFiatCoin } = req.params;
  if (!defaultFiatCoin) {
    return res.status(404).json({
      error: true,
      message: "The parameter 'defaultFiatCoin' cannot be empty.",
    });
  }
  const { userId }: any = await jwtHandler.decodeToken(res.locals.accessToken);
  const wallets: Wallet[] = await portfolioModels.portfolioBalance(
    Number(userId)
  );

  wallets.length < 1 && res.status(200).json({ wallets });

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

  const fiatPrices: CoinCMC[] = responseFiatPrices.data.data;

  const cryptoPrices: CoinCMC[] = responseCryptoPrices.data.data;

  wallets.map((wallet: Wallet) => {
    wallet.Contributions.map((contribution: any) => {
      const coinFiatPrices: any = JSON.parse(contribution.basePricesFiatCoins);
      contribution.priceDefaultCoinAtTheTimeOfContribution =
        coinFiatPrices.data[String(defaultFiatCoin)].price;
      delete contribution.basePricesFiatCoins;
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

  wallets.forEach((wallet: Wallet) => {
    const walletPortfolio = wallet as WalletPortfolio;

    const { Contributions } = wallet;

    const { totalSumContributions, profit } = Contributions.reduce(
      (accumulatedValues, contribution: Contribution) => {
        const contributionPortfolio = contribution as ContributionPortfolio;
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

  wallets.forEach((wallet: Wallet) => {
    const walletPortfolio = wallet as WalletPortfolio;
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
