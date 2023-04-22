import { Contribution } from '../../types/Contribution';
import { Wallet } from '../../types/Wallet';

export default function extractIdCryptoCoins(wallets: Wallet[]): Array<number> {
  const idCryptoCoins = new Array();

  wallets.forEach((wallet: any) => {
    wallet.Contributions.forEach((contribution: Contribution) => {
      const cryptoId = contribution.coinIdInCoinMarketCap;
      idCryptoCoins.push(cryptoId);
    });
  });

  return idCryptoCoins;
}
