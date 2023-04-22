import { TypeContribution } from '../../types/Contribution';
import { TypeWallet } from '../../types/Wallet';

export default function extractIdFiatCoins(
  defaultFiatCoinId: number,
  wallets: TypeWallet[]
): Array<number> {
  const idFiatCoins = new Array();

  wallets.forEach((wallet: TypeWallet) => {
    wallet.Contributions.forEach((contribution: TypeContribution) => {
      const contributionSymbol =
        contribution.contributionSymbolIdInCoinMarketCap;
      idFiatCoins.push(contributionSymbol);
    });
  });
  return idFiatCoins;
}
