import { Contribution } from '../../types/Contribution';
import { Wallet } from '../../types/Wallet';

export default function extractIdFiatCoins(
  defaultFiatCoinId: number,
  wallets: Wallet[]
): Array<number> {
  const idFiatCoins = new Array();

  wallets.forEach((wallet: Wallet) => {
    wallet.Contributions.forEach((contribution: Contribution) => {
      const contributionSymbol =
        contribution.contributionSymbolIdInCoinMarketCap;
      idFiatCoins.push(contributionSymbol);
    });
  });
  return idFiatCoins;
}
