import { Contribution } from '../../interfaces/Contribution.interface';
import { Wallet } from '../../interfaces/Wallet.interface';

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
