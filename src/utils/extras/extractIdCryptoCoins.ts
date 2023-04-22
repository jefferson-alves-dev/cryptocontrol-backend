import { TypeContribution } from '../../types/Contribution';
import { TypeWallet } from '../../types/Wallet';

export default function extractIdCryptoCoins(
  wallets: TypeWallet[]
): Array<number> {
  const idCryptoCoins = new Array();

  wallets.forEach((wallet: any) => {
    wallet.Contributions.forEach((contribution: TypeContribution) => {
      const cryptoId = contribution.coinIdInCoinMarketCap;
      idCryptoCoins.push(cryptoId);
    });
  });

  return idCryptoCoins;
}
