import { CoinCMC } from '../../types/CoinMarketCap';

export default function extractCryptoCoinPrice(
  cryptoPrices: CoinCMC[],
  coinIdInCoinMarketCap: number
) {
  for (const crypto of cryptoPrices) {
    if (crypto.id === coinIdInCoinMarketCap) {
      return crypto.quotes[0].price;
    }
  }
  return 0;
}
